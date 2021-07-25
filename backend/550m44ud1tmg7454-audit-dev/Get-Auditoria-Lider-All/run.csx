#r "Newtonsoft.Json"
#load "sqldb_auditorialiderall_get.csx"
#load "../Get-Auditoria-Auditor-All/sqldb_auditoriaauditorall_get.csx"
#load "../Get-Procesos_Auditoria-All/sqldb_procesos_auditoria_all_get.csx"
#load "../Get-Requisitos-All/sqldb_requisitosall_get.csx"

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
    /*START - Parametros de Lectura*/
    //----- START - Parametros de Lectura -----
    //int vnsearch_type               = System.Convert.ToInt32(req.Query["search_type"]);
    //int vnid                       = System.Convert.ToInt32(req.Query["Id"]); //id auditor lider   
    string vvid = Convert.ToString(req.Query["Id"]); //UserIdHash del auditor logueado en la app
                                                     //string vvcode                   = req.Query["vvcode"];
                                                     //string vvdescription            = req.Query["Description"];
    long vnidauditoria = System.Convert.ToInt64(req.Query["IdAuditoria"]); //id auditoria
    long vnunidadnegocioid = System.Convert.ToInt64(req.Query["UnidadNegocioId"]);
    long vnsedeid = System.Convert.ToInt64(req.Query["SedeId"]);
    int vnstatusid = System.Convert.ToInt32(req.Query["StatusId"]);
    int vntipoauditor = System.Convert.ToInt32(req.Query["TipoAuditor"]); // 1 lider - 2 auditor
    //string vvinicio                 = req.Query["Inicio"];
    string vvinicio = Convert.ToString(req.Query["Inicio"]);
    //string vvfin                    = req.Query["Fin"];
    string vvfin = Convert.ToString(req.Query["Fin"]);
    //cuando es para el select de nueva lista de envio
    int vnListaAsistencia = System.Convert.ToInt32(req.Query["ListaAsistencia"]); 
    //----- END   - Parametros de Lectura -----

    DataAuditoriaLiderAllGet vobj_sqldata = new DataAuditoriaLiderAllGet();


    //Evaluar Clave API
    if (vvapikeysecure != vvapiKeyparameter)
    {
        vvhttpmethod = "";
        jsonrspt = "{}";
    }

    //Metodo:  list
    if (vvhttpmethod == "objectlist")
    {
        List<auditorialiderallget> lobjs = vobj_sqldata.funGetAuditoriaLiderAllList(log
                                                               , vvid
                                                               , vnunidadnegocioid
                                                               , vnsedeid
                                                               , vnstatusid
                                                               , vvinicio
                                                               , vvfin
                                                               , vntipoauditor
                                                               , vnListaAsistencia
                                                               );
        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(lobjs, Formatting.Indented);
    } // fin if vvhttpmethod

    //Metodo:  object
    if (vvhttpmethod == "object")
    {
        auditorialiderallget lobjs = vobj_sqldata.funGetAuditoriaLiderAll(log
                                                               , vnidauditoria
                                                               );
        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(lobjs, Formatting.Indented);
    } // fin if vvhttpmethod

    //Metodo:  object
    if (vvhttpmethod == "object2")
    {
        auditorialiderallget lobjs = vobj_sqldata.funGetAuditoriaLiderAll2(log
                                                               , vnidauditoria
                                                               );
        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(lobjs, Formatting.Indented);
    } // fin if vvhttpmethod

    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");

}