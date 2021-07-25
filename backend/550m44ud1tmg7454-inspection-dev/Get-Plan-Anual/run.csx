/****************************************************************************************
* VISUAL SAT - [2021]
* PROYECTO : SIGTASA
* ESQUEMA : SSOMA
* MODULO : GESTIÓN DE PLAN ANUAL
* OPERADORES_________________________________________________________________________
* | # | PROGRAMADOR     |  |      FECHA   |  |   HORA   |           CORREO           |
* | 1 | Andy Vásquez    |  |  08/01/2021  |  | 07:28:50 |    caracas1348@gmail.com   |**
* |___|_________________|__|______________|__|__________|____________________________|
*
* DESCRIPCION: ARCHIVO RUN BACKEND DE FUNCIONALIDAD EN SERVIDOR DE LAS OPCIONES DEL PLAN ANUAL
*
* ARCHIVOS DE FRONT       ____________________________________
* | # |     MODULO             |  |         NOMBRE            |   
* | 1 |      SSOMA             |  |  gestionPlanAnual.html    |
* |___________________________________________________________|
*
* VERSION: 0.1 Beta
*******************************************************************************************/

#r "Newtonsoft.Json"
#load "sql.csx"


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
    log.LogInformation("C# La función de activación HTTP procesó una solicitud.");

    var requestHeader           = req.Headers; 
    var vvapikeysecure          = Environment.GetEnvironmentVariable("apikey",EnvironmentVariableTarget.Process);
    string vvapiKeyparameter    = requestHeader["apiKey"];
    string vvhttpmethod         = req.Query["httpmethod"];

    string jsonrspt = "";
    //Evaluar Clave API
    if(vvapikeysecure != vvapiKeyparameter )
    {
        vvhttpmethod    = "";
        jsonrspt        = "{}";
    }

    /*START - Parametros de Lectura*/        
    long ProgramaId            = req.Query["ProgramaId"] == "" ? 0 : System.Convert.ToInt64(req.Query["ProgramaId"]);
    long GerenciaId            = req.Query["GerenciaId"] == "" ? 0 : System.Convert.ToInt64(req.Query["GerenciaId"]);
    long SedeId                = req.Query["SedeId"] == "" ? 0 : System.Convert.ToInt64(req.Query["SedeId"]);
    string FechaInicio         = req.Query["FechaInicio"].ToString();
    string FechaFin            = req.Query["FechaFin"].ToString();
    string Responsable         = req.Query["Responsable"].ToString();
    long StatusId              = req.Query["StatusId"] == "" ? 0 : System.Convert.ToInt64(req.Query["StatusId"]);
                             //long NormaId               = req.Query["NormaId"] == "" ? 0 : System.Convert.ToInt64(req.Query["NormaId"]);
    FechaInicio                = FechaInicio == "" ? "" : FechaInicio + " 00:00:00";
    FechaFin                   = FechaFin == "" ? "" : FechaFin + " 23:59:59";
                            //string ResponsableUserHash = req.Query["ResponsableUserHash"].ToString();
                            //ResponsableUserHash        = ResponsableUserHash == "" ? "" : ResponsableUserHash;

    // Objetos a Utilizar
    DataPlanAnualGetAll vobj_sqldata = new DataPlanAnualGetAll();

    //Metodo:  listado de evaluacion de auditores
    if (vvhttpmethod == "objectlist")
    {
        DataPlanAnual curobj = new DataPlanAnual();
        long Id = 0;
        curobj = await vobj_sqldata.funGetPlanAnualAllList( log
                                                            , Id
                                                            , ProgramaId
                                                            , GerenciaId
                                                            , SedeId
                                                            , FechaInicio
                                                            , FechaFin
                                                            , StatusId
                                                            );
        
        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
    }

        //Metodo:  listado de evaluacion de auditores
    if (vvhttpmethod == "objectlistEvaluacion")
    {
        DataPlanAnual curobj = new DataPlanAnual();
        long Id = 0;
        curobj = await vobj_sqldata.funGetPlanAnualExecList( log
                                                            , Id
                                                            , ProgramaId
                                                            , GerenciaId
                                                            , SedeId
                                                            , FechaInicio
                                                            , FechaFin
                                                            , StatusId
                                                            , Responsable
                                                            );
        
        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
    }

    //Metodo:  listado de evaluacion de auditores
    if (vvhttpmethod == "adjuntoEvidenciaPlan")
    {
        log.LogInformation("adjuntoEvidenciaPlan");
        long AdjuntoId = req.Query["AdjuntoId"] == "" ? 0 : System.Convert.ToInt64(req.Query["AdjuntoId"]);
        log.LogInformation("AdjuntoId "+AdjuntoId);
        Adjuntos Adjunto = new Adjuntos();

        Adjunto = await vobj_sqldata.funGetAdjuntoEvidenciaPlan( log, AdjuntoId);

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(Adjunto, Formatting.Indented);
    }

        if (vvhttpmethod == "adjuntoCCPlan")
    {
        log.LogInformation("adjuntoCCPlan");
        long AdjuntoId = req.Query["AdjuntoId"] == "" ? 0 : System.Convert.ToInt64(req.Query["AdjuntoId"]);
        log.LogInformation("AdjuntoId "+AdjuntoId);
        Adjuntos Adjunto = new Adjuntos();

        Adjunto = await vobj_sqldata.funGetAdjuntoControlCambiosPlan( log, AdjuntoId);

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(Adjunto, Formatting.Indented);
    }

    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Pase un nombre en la cadena de consulta o en el cuerpo de la solicitud");
}
