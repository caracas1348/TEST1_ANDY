#r "Newtonsoft.Json"
#load "sqldb_post.csx"


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
    string vvhttpmethod = req.Query["httpmethod"];



    //Evaluar Clave API
    if (vvapikeysecure != vvapiKeyparameter)
    {
        vvhttpmethod = "";
        jsonrspt = "{}";
    }

    /*START - Parametros de Lectura*/
    DataAuditorAll vobj_sqldata = new DataAuditorAll();
    int curid = 0;

    //Invocar INSERT

    //Invocar DELETE
    if (vvhttpmethod == "delete")
    {

        curid = System.Convert.ToInt32(req.Query["Id"]);
        long nrorows = vobj_sqldata.funDeleteAll(log, curid);

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(nrorows, Formatting.Indented);
    }

    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");


}




