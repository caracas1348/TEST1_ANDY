#r "Newtonsoft.Json"
#load "sqldb_get.csx"
#load "../Get-Grupo_Preguntas-All/sqldb_get.csx"
#load "../Get-Preguntas_Evaluacion-All/sqldb_get.csx"
#load "../Get-Escala_Notas-All/sqldb_get.csx"

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
    long RolId              = req.Query["RolId"] == "" ? 0 : System.Convert.ToInt64(req.Query["RolId"]);
    long StatusEvaluacionId = req.Query["StatusEvaluacionId"] == "" ? 0 : System.Convert.ToInt64(req.Query["StatusEvaluacionId"]);
    string Auditor          = req.Query["Auditor"].ToString();
    string FechaInicio      = req.Query["FechaInicio"].ToString();
    string FechaFin         = req.Query["FechaFin"].ToString();
    FechaInicio             = FechaInicio == "" ? "" : FechaInicio + " 00:00:00";
    FechaFin                = FechaFin == "" ? "" : FechaFin + " 23:59:59";
    int Nota                = req.Query["Nota"] == "" ? 0 : System.Convert.ToInt32(req.Query["Nota"]);

    // Objetos a Utilizar
    DataEvaluacionAuditoresAll vobj_sqldata = new DataEvaluacionAuditoresAll();

    //Metodo:  listado de evaluacion de auditores
    if (vvhttpmethod == "objectlist")
    {
        dataAll curobj = new dataAll();

        curobj = await vobj_sqldata.funGetEvaluacionAuditoresAllList(log
                                                            , RolId
                                                            , StatusEvaluacionId
                                                            , Auditor
                                                            , FechaInicio
                                                            , FechaFin
                                                            , Nota
                                                            );
        
        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
    }

    //Metodo:  listado de evaluacion de auditores
    if (vvhttpmethod == "formEvaluation")
    {
        long EvaluacionAuditoresId  = req.Query["EvaluacionAuditoresId"] == "" ? 0 : System.Convert.ToInt64(req.Query["EvaluacionAuditoresId"]);
        string HashEvaluacionTokens = req.Query["HashEvaluacionTokens"].ToString();
        // Objetos a Utilizar dataForm
        dataForm curobj = new dataForm();
        DataGrupoPreguntasAll vobj_sqldata_grupo_preguntas_get = new DataGrupoPreguntasAll();
        List<grupoPreguntas> lobjs = new List<grupoPreguntas>();
        DataEscalaNotasAll vobj_sqldata_escala_notas_get = new DataEscalaNotasAll();
        List<escalaNotas> lobjs2 = new List<escalaNotas>();
        evaluacionAuditoresAll curobj2;

        lobjs = await vobj_sqldata_grupo_preguntas_get.funGetGrupoPreguntasAllList(log, 0);
        lobjs2 = await vobj_sqldata_escala_notas_get.funGetEscalaNotasAllList(log);

        curobj2 = await vobj_sqldata.funGetEvaluacionAuditor(log, EvaluacionAuditoresId);

        if (curobj2.HashEvaluacionTokens == HashEvaluacionTokens && curobj2.StatusEvaluacionId == 2)
        {
            log.LogInformation("Los HashEvaluacionTokens Son iguales...");
            curobj.EvaluacionAuditoresId = EvaluacionAuditoresId;
            curobj.HashEvaluacionTokens  = HashEvaluacionTokens;
            curobj.GrupoPreguntas        = lobjs;
            curobj.escalaNotasAll        = lobjs2;
            curobj.EvaluacionAuditores   = curobj2;
        }
        else 
        {
            if (curobj2.StatusEvaluacionId == 3) { curobj.HashEvaluacionTokens = "Evaluacion Vencida"; }
            else if (curobj2.StatusEvaluacionId == 4) { curobj.HashEvaluacionTokens = "Evaluacion Respondida"; }
            else { curobj.HashEvaluacionTokens = "Los HashEvaluacionTokens Son Diferentes"; }
        }

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
    }


    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}
