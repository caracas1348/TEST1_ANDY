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
    string vvapiKeyparameter = requestHeader["apiKey"];

    string vvhttpmethod = req.Query["httpmethod"];
    string jsonrspt = "";

    long Proceso = req.Query["Proceso"] == "" ? 0 : System.Convert.ToInt64(req.Query["Proceso"]);

    if (vvapikeysecure != vvapiKeyparameter)
    {
        vvhttpmethod = "";
        jsonrspt = "{}";
    }

    if (vvhttpmethod == "objectlist")
    {
        SubprocesoDA SubprocesoDA = new SubprocesoDA();
        List<Subproceso> lobjs = await SubprocesoDA.fnGetSubProcesoList(Proceso);
        jsonrspt = JsonConvert.SerializeObject(lobjs, Formatting.Indented);
    }

    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}