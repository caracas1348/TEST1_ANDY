#r "Newtonsoft.Json"
#load "sqldb_requisitosall_get.csx"

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

    //----- START - Parametros de Lectura -----
    //int vnsearch_type               = System.Convert.ToInt32(req.Query["search_type"]);
    long vnIdNorma                  = System.Convert.ToInt64(req.Query["NormaId"]); //id Norma
    long vnIdUnidadNegocio          = System.Convert.ToInt64(req.Query["UnidadNegocioId"]); //id Unidad de Negocio
    long vnIdProceso                = System.Convert.ToInt64(req.Query["ProcesoId"]); //id Proceso
    long vnIdUnidadNegocioProceso   = System.Convert.ToInt64(req.Query["UnidadNegocioProcesoId"]); //id UnidadNegocioProceso
    long vnPlanAuditoriaId          = System.Convert.ToInt64(req.Query["PlanAuditoriaId"]); //id Plan Auditoria
    long vnIdAuditoria              = System.Convert.ToInt64(req.Query["AuditoriaId"]); //Id Auditoria
    string vvUserIdHash             = req.Query["UserIdHash"]; // UserIdHash -> Auditor
    //----- END   - Parametros de Lectura -----
    
    DataRequisitosAllGet vobj_sqldata = new DataRequisitosAllGet();

    //Metodo:  list
    if(vvhttpmethod == "objectlist")
    {
    	 List<requisitosallget> lobjs = vobj_sqldata.funGetRequisitosAllList(log
                                                                , vnIdNorma    
                                                                , vnIdUnidadNegocio
                                                                , vnIdProceso
                                                                , vnIdUnidadNegocioProceso
                                                                , vnPlanAuditoriaId
                                                                ) ;
        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(lobjs, Formatting.Indented);
    } // fin if vvhttpmethod

    //Metodo:  list
    if (vvhttpmethod == "objectlistApp")
    {
        List<requisitosallget> lobjs = vobj_sqldata.funGetRequisitosAllListApp(log
                                                               , vnIdAuditoria
                                                               , vnIdProceso
                                                               , vvUserIdHash
                                                               );
        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(lobjs, Formatting.Indented);
    } // fin if vvhttpmethod

    //Metodo:  object
    /*if(vvhttpmethod == "object")
    {
         auditorialiderallget lobjs = vobj_sqldata.funGetAuditoriaLiderAll(log
                                                                , vnidauditoria
                                                                ) ;
        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(lobjs, Formatting.Indented);
    } // fin if vvhttpmethod*/

    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");

}