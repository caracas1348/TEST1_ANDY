#r "Newtonsoft.Json"
#load "sqldb_procesosall_get.csx"

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

    //----- START - Parametros de Lectura -----
    //int vnsearch_type               = System.Convert.ToInt32(req.Query["search_type"]);
    long vnIdNorma                     = System.Convert.ToInt64(req.Query["NormaId"]); //id auditor lider   
    long vnIdUnidadNegocio             = System.Convert.ToInt64(req.Query["UnidadNegocioId"]); //id auditoria
    //----- END   - Parametros de Lectura -----
    
    DataProcesosAllGet vobj_sqldata = new DataProcesosAllGet();
    string jsonrspt = "";
    //Evaluar Clave API
    if(vvapikeysecure != vvapiKeyparameter )
    {
        vvhttpmethod    = "";
        jsonrspt        = "{}";
    }

    //Metodo:  list
    if(vvhttpmethod == "objectlist")
    {
    	 List<procesososallget> lobjs = vobj_sqldata.funGetProcesososAllList(log
                                                                , vnIdNorma    
                                                                , vnIdUnidadNegocio
                                                                ) ;
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