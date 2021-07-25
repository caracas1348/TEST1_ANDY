#r "Newtonsoft.Json"
#load "sqldb_get.csx"

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
    // ****************** Inicio: run ****************** //
    log.LogInformation("C# HTTP trigger function processed a request.");

    var requestHeader           = req.Headers; 

    // Azure
    var vvapikeysecure          = Environment.GetEnvironmentVariable("apikey",EnvironmentVariableTarget.Process);


    string vvapiKeyparameter    = requestHeader["apiKey"];
    string vvhttpmethod         = req.Query["httpmethod"];

    string jsonrspt = "";
    //Evaluar Clave API
    if (vvapikeysecure != vvapiKeyparameter)
    {
        vvhttpmethod = "";
        jsonrspt = "{}";
    }


    /*START - Parametros de Lectura*/
    long vnid = System.Convert.ToInt64(req.Query["Id"]);
    string vvdocumento = req.Query["Documento"];
    DataAdjuntos vobj_sqldata = new DataAdjuntos();
    
    //Metodo:  list
    if (vvhttpmethod == "object")
    {

        Adjuntos lobjs = new Adjuntos();
        lobjs = await vobj_sqldata.funGetAdjunto(log, vnid, vvdocumento);

        jsonrspt = JsonConvert.SerializeObject(lobjs, Formatting.Indented);
    }


    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");

    // ****************** Fin: run ****************** //
}
