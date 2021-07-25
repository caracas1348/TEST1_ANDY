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

    if (vvapikeysecure != vvapiKeyparameter)
    {
        vvhttpmethod = "";
        jsonrspt = "{}";
    }

    // filtros
    int TipoObservacion = req.Query["TipoObservacion"] == "" ? 0 : System.Convert.ToInt32(req.Query["TipoObservacion"]);
    long Sede           = req.Query["Sede"] == "" ? 0 : System.Convert.ToInt64(req.Query["Sede"]);
    long Embarcacion    = req.Query["Embarcacion"] == "" ? 0 : System.Convert.ToInt64(req.Query["Embarcacion"]);
    string Reportante   = req.Query["Reportante"].ToString();
    string FechaInicio  = req.Query["FechaInicio"].ToString();
    string FechaFin     = req.Query["FechaFin"].ToString();
    FechaInicio         = FechaInicio == "" ? "" : FechaInicio + " 00:00:00";
    FechaFin            = FechaFin == "" ? "" : FechaFin + " 23:59:59";

    if (vvhttpmethod == "objectlist")
    {
        ParametricaDA parametricaDA = new ParametricaDA();
        List<Parametrica> lobjs = await parametricaDA.fnGetParametricaList(log, TipoObservacion, Sede, Embarcacion, Reportante, FechaInicio, FechaFin);
        jsonrspt = JsonConvert.SerializeObject(lobjs, Formatting.Indented);
    }

    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}