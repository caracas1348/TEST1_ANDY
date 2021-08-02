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
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Azure.WebJobs;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Transactions;
using System.Data;
using System.Linq;

public static async Task<IActionResult> Run(HttpRequest req, ILogger log)
{
    log.LogInformation("La función de activación HTTP de C# procesó una solicitud.");

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

    
    string requestBody = await new StreamReader(req.Body).ReadToEndAsync();

    log.LogInformation("requestBody:" + requestBody);

    dynamic dataobject = JsonConvert.DeserializeObject(requestBody);

    EvidenciaPost curobj; 
    DataSeguimientoPost vobj_sqldata = new DataSeguimientoPost();   
    if (vvhttpmethod == "post")
    {
        log.LogInformation("En vvhttpmethod == post.");

        curobj = funsetObjectEvidencia(log, dataobject, vvhttpmethod);
        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        try
        {
            log.LogInformation("En try");
            curobj = await vobj_sqldata.funPostSeguimientoEvidencia(log, curobj);
            if(curobj.Id > 0)
            {
                log.LogInformation("En curobj.Id > 0, curobj.Id -> "+curobj.Id);
                scope.Complete();
                log.LogInformation("Despues de scope.Complete()." );
            }
        }
        catch (Exception ex)
        {
            curobj.Id      = 0;//id
            curobj.NombreEvidencia = System.Convert.ToString(ex.Message);
            log.LogInformation("Catch :: " + ex.Message);
        }
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);

    }
    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}


public static EvidenciaPost funsetObjectEvidencia(ILogger log, dynamic dataobject, string vvmethod)
{
    log.LogInformation("en  funsetObjectEvidencia.");
    EvidenciaPost curobj = new EvidenciaPost();

    if (vvmethod == "post")
    {
        log.LogInformation("en  vvmethod == post.");
        curobj.acciones             = dataobject?.acciones;
        curobj.PacientesID          = dataobject?.PacientesID;
        curobj.name_complete        = dataobject?.name_complete;
        curobj.DNI                  = dataobject?.DNI;
        curobj.name_complete_family = dataobject?.name_complete_family;
        curobj.dni_family           = dataobject?.dni_family;
        curobj.phone                = dataobject?.phone;
        curobj.email                = dataobject?.email;
        curobj.address              = dataobject?.address;
        curobj.conditions_health    = dataobject?.conditions_health;                                                         
    }   
    return curobj;
}
