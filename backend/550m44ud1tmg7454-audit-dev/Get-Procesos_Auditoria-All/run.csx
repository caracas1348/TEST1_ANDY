#r "Newtonsoft.Json"
#load "sqldb_procesos_auditoria_all_get.csx"
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

public static async Task<IActionResult> Run (HttpRequest req, ILogger log)
{
	log.LogInformation("C# HTTP trigger function processed a request. procesos-auditoria");

	var requestHeader    		= req.Headers;
	log.LogInformation("requestHeader");
	var vvapiKeysecure   		= Environment.GetEnvironmentVariable("apikey", EnvironmentVariableTarget.Process);
	log.LogInformation("vvapiKeysecure");
	string vvapiKeyparameter	= requestHeader["apiKey"];
	string vvhttpmethod			= req.Query["httpmethod"];

    string jsonrspt = "";

    //Evaluar Clave API
    if (vvapiKeysecure != vvapiKeyparameter)
    {
        vvhttpmethod = "";
        jsonrspt = "{}";
    }

    //----- START - Parametros de Lectura -----
    log.LogInformation("Parametros de lectura");
    //----- START - Parametros de Lectura -----
    long vnIdAuditoria  = System.Convert.ToInt64(req.Query["AuditoriaId"]); // Id de la auditoria
    string vvIdNorma    = req.Query["NormaId"]; // Id norma 
    string vvUserIdHash = req.Query["UserIdHash"]; // UserIdHash ->Auditor
                                             //----- END   - Parametros de Lectura -----

    log.LogInformation("vobj_sqldata");
    DataProcesosAuditoriaAllGet vobj_sqldata = new DataProcesosAuditoriaAllGet();

    //Metodo: objectlist [listar los procesos registrados en el plan de auditoria por id de la auditoria]
    if (vvhttpmethod == "objectlist")
    {
        log.LogInformation("objectlist");
        List<procesosAuditoriaAllGet> lobjs = vobj_sqldata.funGetProcesosAuditoriaAllList(log, vnIdAuditoria, vvIdNorma);

        //conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(lobjs, Formatting.Indented);
        //
    }//end if objectlist

    //Metodo: objectlist [listar los procesos registrados en el plan de auditoria por id de la auditoria]
    if (vvhttpmethod == "objectlistApp")
    {
        log.LogInformation("objectlist");
        List<procesosAuditoriaAllGet> lobjs = vobj_sqldata.funGetProcesosAuditoriaAllListApp(log, vnIdAuditoria, vvUserIdHash);

        //conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(lobjs, Formatting.Indented);
        //
    }//end if objectlist

    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
   


}