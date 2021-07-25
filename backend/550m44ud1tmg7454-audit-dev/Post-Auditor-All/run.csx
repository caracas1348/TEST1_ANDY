#r "Newtonsoft.Json"
#load "sqldb_auditorall_post.csx"
#load "sqldb_auditorall_post2.csx"


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

//andy run 45
public static async Task<IActionResult> Run(HttpRequest req, ILogger log)
{
    log.LogInformation("C# HTTP trigger function processed a request.");

    var requestHeader        = req.Headers;
    var vvapikeysecure       = Environment.GetEnvironmentVariable("apikey",EnvironmentVariableTarget.Process);
    string vvapiKeyparameter = requestHeader["apiKey"];

    string jsonrspt     = "";
    string name         = req.Query["name"];
    string vvhttpmethod = req.Query["httpmethod"];



    //Evaluar Clave API
    if (vvapikeysecure != vvapiKeyparameter)
    {
        vvhttpmethod = "";
        jsonrspt     = "{}";
    }

    /*START - Parametros de Lectura*/

    // string apiKey = requestHeader.GetValues("apiKey").First();

    string requestBody = await new StreamReader(req.Body).ReadToEndAsync();

    log.LogInformation("requestBody:" + requestBody);

    dynamic dataobject          = JsonConvert.DeserializeObject(requestBody);

    DataAuditorAll vobj_sqldata = new DataAuditorAll();
    auditor curobj              = new auditor();

    DataAuditorAll2 vobj_sqldata2 = new DataAuditorAll2();
    //auditor curobj2              = new auditor();

    int newid                   = 0;


    //Invocar INSERT
    if (vvhttpmethod == "post")
    {
        curobj = funsetObject(log, dataobject, vvhttpmethod);

        Task<int> curobjtask = vobj_sqldata.funPostAuditorAll(log, curobj);

        curobjtask.Wait();
        newid                = (int)curobjtask.Result;
        curobj.Id            = newid;


        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
    }


    ////Invocar PUT
    if (vvhttpmethod == "put")
    {
        int curid = System.Convert.ToInt32(req.Query["Id"]);
        curobj    = funsetObject(log, dataobject, vvhttpmethod);
        curobj    = vobj_sqldata.funPutAuditorAll(log, curid, curobj);
        curobj.Id = curid;
        //Conversion de Respuestas a JSON
        jsonrspt  = JsonConvert.SerializeObject(curobj, Formatting.Indented);
    }

    ////Invocar DELETE
    //if (vvhttpmethod == "delete")
    //{

    //    curid = System.Convert.ToInt32(req.Query["Id"]);
    //    long nrorows = vobj_sqldata.funDeleteAuditorAll(log, curid);

    //    //Conversion de Respuestas a JSON
    //    jsonrspt = JsonConvert.SerializeObject(nrorows, Formatting.Indented);
    //}





    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");




}







public static auditor funsetObject(ILogger log, dynamic dataobject, string vvmethod)
{
    //log.LogInformation("dataobject?.SedeId: "+dataobject?.SedeId);
    //log.LogInformation("dataobject?.EspecialidadId: "+dataobject?.EspecialidadId);
    string vvuseridhash  = dataobject?.UserIdhash;
    string vvname        = dataobject?.Name;
    string vvCorreo      = dataobject?.Correo;
    string vvrol_code    = dataobject?.Rol_Code;
    int vnsedeid         = ( dataobject?.SedeId != null ) ? dataobject?.SedeId : 0;
    int vnactive         = dataobject?.Active;
    int vnespecialidadid = 0;
    if( dataobject?.EspecialidadId != null ) { vnespecialidadid = dataobject?.EspecialidadId; }
    string vvcargo       = dataobject?.Cargo;
    string vvcreate_by   = dataobject?.Create_By;
    string vvObservacion = dataobject?.Observacion;
    int vnTipo           = dataobject?.Tipo;


    auditor curobj        = new auditor();
    curobj.UserIdhash     = vvuseridhash;
    curobj.Name           = vvname;
    curobj.Correo         = vvCorreo;
    curobj.Rol_Code       = vvrol_code;
    curobj.SedeId         = vnsedeid;
    curobj.Active         = vnactive;
    curobj.EspecialidadId = vnespecialidadid;
    curobj.Cargo          = vvcargo;
    curobj.Observacion    = vvObservacion;
    curobj.Tipo           = vnTipo;

    log.LogInformation("curobj.Correo: " + curobj.Correo);

    if (vvmethod == "post" || vvmethod == "put")
    {
        curobj.Create_By   = vvcreate_by;
        curobj.Create_Date = System.DateTime.Now;
    }

    List<capacitacion> vlcapacitacion = new List<capacitacion>();
    foreach (var item in dataobject?.Capacitacion)
    {
        capacitacion cap = new capacitacion();
        if ( vvmethod == "put")
        {
            cap.Id = item?.Id;
        }
        cap.NormaId      = item?.NormaId;
        cap.TipoCursoId  = item?.TipoCursoId;
        cap.Tipo         = item?.Tipo;
        cap.Fecha_Inicio = item?.Fecha_Inicio;
        cap.Fecha_Final  = item?.Fecha_Final;
        cap.Adjunto      = item?.Adjunto;
        cap.Active       = item?.Active;
        cap.Created_By   = item?.Created_By;
        cap.Created_Date = System.DateTime.Now;
        vlcapacitacion.Add(cap);
    }
    curobj.Capacitacion = vlcapacitacion;


    List<experiencia> vlexperiencia = new List<experiencia>();
    foreach (var item in dataobject?.Experiencia)
    {
        experiencia exp = new experiencia();
         if ( vvmethod == "put")
        {
            exp.Id = item?.Id;
        }
        exp.NormaId      = item?.NormaId;
        exp.RolId        = item?.RolId;
        exp.FechaInicio  = item?.FechaInicio;
        exp.FechaFin     = item?.FechaFin;
        exp.Adjunto      = item?.Adjunto;
        exp.Active       = item?.Active;
        exp.Created_By   = item?.Created_By;
        exp.Created_Date = System.DateTime.Now;
        vlexperiencia.Add(exp);
    }
    curobj.Experiencia = vlexperiencia;

    // curobj.Last_Updated_By   = vvlast_updated_by;
    // curobj.Last_Updated_Date = System.DateTime.Now;

    return curobj;
}



