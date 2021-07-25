#r "Newtonsoft.Json"
#load "sqldb_programa_auditoriaall_post.csx"
#load "../Get-Auditoria-All/sqldb_auditoriaall_get.csx"
#load "../Get-Programa_Auditoria-All/sqldb_programa_auditoriaall_get.csx"

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

    DataAuditoriaAllGet vobj_sqldata_auditoria = new DataAuditoriaAllGet();

    DataPrograma_AuditoriaAllGet vobj_sqldata_auditoria_get = new DataPrograma_AuditoriaAllGet();

    DataPrograma_AuditoriaAll vobj_sqldata = new DataPrograma_AuditoriaAll();
    programa_auditoriaall curobj = new programa_auditoriaall();
    Resp respuesta = new Resp();
    long newid = 0;
    long curid = 0;
    string usuariodelete;


    //Invocar INSERT
    if (vvhttpmethod == "post")
    {
        curobj = funsetObject(log, dataobject, vvhttpmethod);

        Task<long> curobjtask = vobj_sqldata.funPostPrograma_AuditoriaAll(log, curobj);
        curobjtask.Wait();
        newid = (long)curobjtask.Result;
        curobj.Id = newid;

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
    }


    //Invocar PUT
    if (vvhttpmethod == "put")
    {
        curid = dataobject.Id;
        curobj = funsetObject(log, dataobject, vvhttpmethod);
        curobj = vobj_sqldata.funPutPrograma_AuditoriaAll(log, curid, curobj);
        curobj.Id = curid;
        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
    }

    //Invocar DELETE
    if (vvhttpmethod == "delete")
    {

        curid = dataobject.Id;
        usuariodelete = dataobject.Delete_By;

        long nrorows = vobj_sqldata.funDeletePrograma_AuditoriaAll(log, curid, usuariodelete);

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(nrorows, Formatting.Indented);
    }













    if (vvhttpmethod == "finalize")
    {

        curid = dataobject.Id;
        int flag_evaluador = dataobject.Flag_Evaluador;

        List<auditoriaallget> lobjs = vobj_sqldata_auditoria.funGetAuditoriaAllList(log, 0, 0, null, null, 0, 0, 0, null, null, null, null, null, null, curid, 0, null, null, 0);

        programa_auditoriaallget objprograma = vobj_sqldata_auditoria_get.funGetPrograma_AuditoriaAll(log, 0, lobjs.First().ProgramaAuditoriaId, null);

        /*DataEmailNew oDataEmail = new DataEmailNew();
        var url = "https://7454em4ils3nder-app.azurewebsites.net/api/VisitasaSendEmail?code=LXQwITmvDAAqXTgaDcBAkmbZXBCv5KnS6bY/XszaOjqHus4M3dbDzw==";   
        var json            = JsonConvert.SerializeObject(oDataEmail);
        var data            = new StringContent(json, Encoding.UTF8, "application/json");*/

        int cant_auditorias = lobjs.Count;

        if (flag_evaluador == 1)
        {
            //es un evaluador
            if (lobjs.Count(a => a.StatusEvaluacionId == 3) == cant_auditorias)
            {
                log.LogInformation("caso todas aprobadas:");
                dataobject.StatusId = 5;
                dataobject.Flag_Completada = 0;
                curobj = funsetObject(log, dataobject, "put");
                curobj = vobj_sqldata.funPutPrograma_AuditoriaAll(log, curid, curobj);

                //envia mensaje  responsable corporativo indicando que tiene 3 días para su correción o aprobación.

            }
            else if (lobjs.Count(a => a.StatusEvaluacionId == 1) > 0)
            {
                log.LogInformation("caso alguna observada:");
                dataobject.StatusId = 3;
                dataobject.Flag_Completada = 0;
                curobj = funsetObject(log, dataobject, "put");
                curobj = vobj_sqldata.funPutPrograma_AuditoriaAll(log, curid, curobj);

                //envia mensaje  responsable corporativo indicando que tiene 3 días para su correción o aprobación.       
            }
        }
        else
        {
            //es el otro 
            //verificamos si tiene corregidas
            if (lobjs.Count(a => a.StatusEvaluacionId == 2 && a.StatusId != 3) > 0)
            {
                log.LogInformation("caso 1:");
                int cant = objprograma.Cantidad_Correcciones + 1;

                //cambiamos estadod e programa a corregido y agregamos cantidad de correcciones
                dataobject.CantidadCorrecciones = cant;
                dataobject.StatusId = 4;
                dataobject.Flag_Completada = 0;
                curobj = funsetObject(log, dataobject, "put");
                curobj = vobj_sqldata.funPutPrograma_AuditoriaAll(log, curid, curobj);

            }
            else if (lobjs.Count(a => a.StatusEvaluacionId != 1 && a.StatusId == 3) > 0)
            {
                log.LogInformation("caso 2:");
                // Reprogramadas
                int cant = objprograma.Cantidad_Correcciones + 1;

                //cambiamos estadod e programa a corregido y agregamos cantidad de correcciones
                dataobject.CantidadCorrecciones = cant;
                dataobject.StatusId = 4;
                dataobject.Flag_Completada = 1;
                curobj = funsetObject(log, dataobject, "put");
                curobj = vobj_sqldata.funPutPrograma_AuditoriaAll(log, curid, curobj);

            }
            else if (lobjs.Count(a => a.StatusEvaluacionId == null) > 0 || lobjs.Count(a => a.StatusEvaluacionId == 0) > 0)
            {
                log.LogInformation("caso 3:");
                dataobject.Flag_Completada = 1;
                curobj = funsetObject(log, dataobject, "put");
                curobj = vobj_sqldata.funPutPrograma_AuditoriaAll(log, curid, curobj);

                //envia mensaje responsable corporativo que tiene 7 días máximos  para evaluar el programa

            }
        }


        respuesta.status = true;
        respuesta.message = "Actualizado";
        jsonrspt = JsonConvert.SerializeObject(respuesta, Formatting.Indented);
    }










    if (vvhttpmethod == "save")
    {

        curid = dataobject.Id;

        List<auditoriaallget> lobjs = vobj_sqldata_auditoria.funGetAuditoriaAllList(log, 0, 0, null, null, 0, 0, 0, null, null, null, null, null, null, curid, 0, null, null, 0);

        //programa_auditoriaallget objprograma = vobj_sqldata_auditoria_get.funGetPrograma_AuditoriaAll(log, 0, lobjs.First().ProgramaAuditoriaId, null);

        int cant_auditorias = lobjs.Count;

        //verificamos si esta todo corregido
        if (lobjs.Count(a => a.StatusEvaluacionId == 2) == cant_auditorias)
        {


            //int cant = objprograma.Cantidad_Correcciones + 1;

            //cambiamos estadod e programa a corregido
            //dataobject.CantidadCorrecciones = cant;
            dataobject.StatusId = 4;
            curobj = funsetObject(log, dataobject, vvhttpmethod);
            curobj = vobj_sqldata.funPutPrograma_AuditoriaAll(log, curid, curobj);

            respuesta.status = true;
            respuesta.message = "Actualizado estado corregida";

        }
        else if ((lobjs.Count(a => a.StatusEvaluacionId == 2) < cant_auditorias) && (lobjs.Count(a => a.StatusEvaluacionId == 2) > 0))
        {

            dataobject.StatusId = 2;
            curobj = funsetObject(log, dataobject, vvhttpmethod);
            curobj = vobj_sqldata.funPutPrograma_AuditoriaAll(log, curid, curobj);

            respuesta.status = true;
            respuesta.message = "Actualizado estado en revision";

        }


        jsonrspt = JsonConvert.SerializeObject(respuesta, Formatting.Indented);
    }



    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");



}






public static programa_auditoriaall funsetObject(ILogger log, dynamic dataobject, string vvmethod)
{
    // long vnid = 0;
    // if(vvmethod != "post")
    // {
    //     vnid    = dataobject?.Id;
    // }

    string vvcode = dataobject?.Code;
    long vnespecialidadid = 0;
    if (dataobject.EspecialidadId > 0)
    {
        vnespecialidadid = dataobject?.EspecialidadId;
    }

    int vnstatusid = 0;
    if (dataobject?.StatusId > 0)
    {
        vnstatusid = dataobject?.StatusId;
    }

    string vvevaluador_name = dataobject?.Evaluador_name;
    string vvevaluador_code = dataobject?.Evaluador_code;
    string vvyear = dataobject?.Year;

    int? vvflagcompletada = null;
    if (dataobject?.Flag_Completada != null)
    {
        vvflagcompletada = dataobject?.Flag_Completada;
    }

    int vncantidadcorrecciones = 0;
    if (dataobject.CantidadCorrecciones > 0)
    {
        vncantidadcorrecciones = dataobject?.CantidadCorrecciones;
    }


    string vvcreated_by = dataobject?.Created_By;
    string vvlast_updated_by = dataobject?.Last_Updated_By;

    programa_auditoriaall curobj = new programa_auditoriaall();
    //curobj.Id              = vnid;
    curobj.Code = vvcode;
    curobj.EspecialidadId = vnespecialidadid;
    curobj.StatusId = vnstatusid;
    curobj.Evaluador_name = vvevaluador_name;
    curobj.Evaluador_code = vvevaluador_code;
    curobj.Year = vvyear;
    curobj.Flag_Completada = vvflagcompletada;
    curobj.Cantidad_Correcciones = vncantidadcorrecciones;

    if (vvmethod == "post")
    {
        curobj.Created_By = vvcreated_by;
        curobj.Created_Date = System.DateTime.Now;
    }

    curobj.Last_Updated_By = vvlast_updated_by;
    curobj.Last_Updated_Date = System.DateTime.Now;


    return curobj;
}
