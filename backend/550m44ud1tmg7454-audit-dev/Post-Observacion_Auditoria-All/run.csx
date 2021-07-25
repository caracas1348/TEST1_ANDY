#r "Newtonsoft.Json"
#load "sqldb_observacion_auditoriaall_post.csx"
#load "../Post-Evaluacion_Auditoria_Log-All/sqldb_evaluacion_auditoria_logall_post.csx"
#load "../Post-Auditoria-All/sqldb_auditoriaall_post.csx"
#load "../Post-Programa_Auditoria-All/sqldb_programa_auditoriaall_post.csx"
#load "../Get-Auditoria-All/sqldb_auditoriaall_get.csx"

using System;
using System.Globalization;
using System.Net;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System.Configuration;
using System.Collections;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;

public static async Task<IActionResult> Run(HttpRequest req, ILogger log)
{
    log.LogInformation("C# HTTP trigger function processed a request.");

    var requestHeader = req.Headers;
    var vvapikeysecure = Environment.GetEnvironmentVariable("apikey", EnvironmentVariableTarget.Process);
    string vvapiKeyparameter = requestHeader["apiKey"];

    string jsonrspt = "";
    string name = req.Query["name"];
    string vvhttpmethod = req.Query["httpmethod"];

    //Evaluar Clave API
    if (vvapikeysecure != vvapiKeyparameter)
    {
        vvhttpmethod = "";
        jsonrspt = "{}";
    }

    /*START - Parametros de Lectura*/

    // string apiKey = requestHeader.GetValues("apiKey").First();  

    string requestBody = await new StreamReader(req.Body).ReadToEndAsync();

    log.LogInformation("requestBody:" + requestBody);

    dynamic dataobject = JsonConvert.DeserializeObject(requestBody);

    DataPrograma_AuditoriaAll vobj_sqldata_programa = new DataPrograma_AuditoriaAll();
    programa_auditoriaall objprograma = new programa_auditoriaall();

    DataAuditoriaAllGet vobj_sqldata_auditoria_get = new DataAuditoriaAllGet();

    DataEvaluacion_Auditoria_LogAll vobj_sqldata_ealog = new DataEvaluacion_Auditoria_LogAll();
    evaluacion_auditoria_logall objealog = new evaluacion_auditoria_logall();

    DataAuditoriaAll vobj_sqldata_auditoria = new DataAuditoriaAll();
    auditoriaall obja = new auditoriaall();

    DataObservacion_AuditoriaAll vobj_sqldata = new DataObservacion_AuditoriaAll();
    observacion_auditoriaall curobj = new observacion_auditoriaall();

    int newid = 0;
    int curid = 0;

    //Invocar INSERT
    if (vvhttpmethod == "post")
    {
        curobj = funsetObject(log, dataobject, vvhttpmethod);

        Task<int> curobjtask = vobj_sqldata.funPostObservacion_AuditoriaAll(log, curobj);
        curobjtask.Wait();
        newid = (int)curobjtask.Result;
        curobj.Id = newid;

        objealog.AuditoriaId = dataobject.AuditoriaId;
        objealog.Created_By = dataobject.Created_By;
        objealog.Created_Date = System.DateTime.Now;
        objealog.StatusEvaluacionId = 1;
        Task<int> curobjtaskeal = vobj_sqldata_ealog.funPostEvaluacion_Auditoria_LogAll(log, objealog);
        curobjtaskeal.Wait();

        obja.StatusEvaluacionId = 1;
        obja.Last_Updated_By = dataobject.Created_By;
        obja.Last_Updated_Date = System.DateTime.Now;
        obja = vobj_sqldata_auditoria.funPutAuditoriaAll(log, (long)dataobject.AuditoriaId, obja);

        //buscar auditoria
        auditoriaallget vobjs = vobj_sqldata_auditoria_get.funGetAuditoriaAll(log, 0, (long)dataobject.AuditoriaId, null);


        objprograma.StatusId = 2;
        objprograma.Last_Updated_By = dataobject.Created_By;
        objprograma.Last_Updated_Date = System.DateTime.Now;
        objprograma = vobj_sqldata_programa.funPutPrograma_AuditoriaAll(log, (long)vobjs.ProgramaAuditoriaId, objprograma);

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
    }


    //Invocar PUT
    if (vvhttpmethod == "put")
    {
        log.LogInformation("en put: ");
        /*curid = System.Convert.ToInt32(req.Query["Id"]);
        curobj = funsetObject(log, dataobject, vvhttpmethod);
        curobj = vobj_sqldata.funPutObservacion_AuditoriaAll(log, curid, curobj);
        curobj.Id = curid;

        objealog.AuditoriaId = dataobject.AuditoriaId;
        objealog.Created_By = dataobject.Created_By;
        objealog.Created_Date = System.DateTime.Now;
        objealog.StatusEvaluacionId = 1;
        Task<int> curobjtaskeal = vobj_sqldata_ealog.funPostEvaluacion_Auditoria_LogAll(log, objealog);
        curobjtaskeal.Wait();

        obja.StatusEvaluacionId = 1;
        obja.Last_Updated_By = dataobject.Created_By;
        obja.Last_Updated_Date = System.DateTime.Now;
        obja = vobj_sqldata_auditoria.funPutAuditoriaAll(log, (long)dataobject.AuditoriaId, obja);

        //buscar auditoria
        auditoriaallget vobjs = vobj_sqldata_auditoria_get.funGetAuditoriaAll(log, 0, (long)dataobject.AuditoriaId, null);


        objprograma.StatusId = 3;
        objprograma.Last_Updated_By = dataobject.Created_By;
        objprograma.Last_Updated_Date = System.DateTime.Now;
        objprograma = vobj_sqldata_programa.funPutPrograma_AuditoriaAll(log, (long)vobjs.ProgramaAuditoriaId, objprograma);//*/

        curid                = System.Convert.ToInt32(req.Query["AuditoriaId"]);
        curobj               = funsetObject(log, dataobject, vvhttpmethod);
        Task<int> curobjtask = vobj_sqldata.funPutObservacion_AuditoriaAll(log, curid, curobj);
        curobjtask.Wait();
        newid = (int)curobjtask.Result;
        //newid     = vobj_sqldata.funPutObservacion_AuditoriaAll(log, curid, curobj);
        curobj.Id = curid;
        log.LogInformation("curid: "+curid);
        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
    }

    //Invocar DELETE
    if (vvhttpmethod == "delete")
    {

        curid = System.Convert.ToInt32(req.Query["Id"]);
        long nrorows = vobj_sqldata.funDeleteObservacion_AuditoriaAll(log, curid);

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(nrorows, Formatting.Indented);
    }

    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}






public static observacion_auditoriaall funsetObject(ILogger log, dynamic dataobject, string vvmethod)
{
    // int vnid = 0;
    // if(vvmethod != "post")
    // {
    //     vnid    = dataobject?.Id;
    // }
    string vvobservacion = dataobject?.Observacion;
    long vnauditoriaid = dataobject?.AuditoriaId;
    string vvcreated_by = dataobject?.Created_By;
    int vnactive = dataobject?.Active;
    // string vvlast_updated_by  = dataobject?.last_updated_by; 

    observacion_auditoriaall curobj = new observacion_auditoriaall();
    //curobj.Id           = vnid;
    curobj.Observacion = vvobservacion;
    curobj.AuditoriaId = vnauditoriaid;
    curobj.Active = vnactive;

    if (vvmethod == "post" || vvmethod == "put")
    {
        curobj.Created_By = vvcreated_by;
        curobj.Created_Date = System.DateTime.Now;
    }

    // curobj.Last_Updated_By   = vvlast_updated_by;
    // curobj.Last_Updated_Date = System.DateTime.Now; 

    return curobj;
}

