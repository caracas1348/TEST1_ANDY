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
    log.LogInformation("C# HTTP trigger function processed a request.");

    var requestHeader = req.Headers;
    var vvapikeysecure = Environment.GetEnvironmentVariable("apikey", EnvironmentVariableTarget.Process);
    //string vvapikeysecure = requestHeader["apiKey"];
    string vvapiKeyparameter = requestHeader["apiKey"];

    string vvhttpmethod = req.Query["httpmethod"];

    // Filtros
    long Id = req.Query["Id"] == "" ? 0 : System.Convert.ToInt64(req.Query["Id"]);

    string jsonrspt = "";

    if (vvapikeysecure != vvapiKeyparameter)
    {
        vvhttpmethod = "";
        jsonrspt = "{}";
    }

    if (vvhttpmethod == "object")
    {
        SeguimientoDA parametricaDA = new SeguimientoDA();
        Archivo objs = await parametricaDA.fnGetSeguimientoInforme(Id);

        jsonrspt = JsonConvert.SerializeObject(objs, Formatting.Indented);
    }

    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}

