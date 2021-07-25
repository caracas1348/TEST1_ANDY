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
    long Gerencia = req.Query["Gerencia"] == "" ? 0 : System.Convert.ToInt64(req.Query["Gerencia"]);
    string Area = req.Query["Area"];
    long PuestoTrabajo = req.Query["PuestoTrabajo"] == "" ? 0 : System.Convert.ToInt64(req.Query["PuestoTrabajo"]);
    long Proceso = req.Query["Proceso"] == "" ? 0 : System.Convert.ToInt64(req.Query["Proceso"]);
    long Subproceso = req.Query["Subproceso"] == "" ? 0 : System.Convert.ToInt64(req.Query["Subproceso"]);
    long Alcance = req.Query["Alcance"] == "" ? 0 : System.Convert.ToInt64(req.Query["Alcance"]);
    int Estado = req.Query["Estado"] == "" ? 0 : System.Convert.ToInt32(req.Query["Estado"]);

    string FechaInicio = req.Query["FechaInicio"].ToString();
    string FechaFin = req.Query["FechaFin"].ToString();
    FechaInicio = FechaInicio == "" ? "" : FechaInicio + " 00:00:00";
    FechaFin = FechaFin == "" ? "" : FechaFin + " 23:59:59";

    int PageInicio = System.Convert.ToInt32(req.Query["PageInicio"]);
    int PageFin = System.Convert.ToInt32(req.Query["PageFin"]);
    log.LogInformation("FechaInicio: "+FechaInicio);
    log.LogInformation("FechaFin: "+FechaFin);
    string jsonrspt = "";

    if (vvapikeysecure != vvapiKeyparameter)
    {
        vvhttpmethod = "";
        jsonrspt = "{}";
    }

    if (vvhttpmethod == "objectlist")
    {
        IpercGeneralDA IpercGeneralDA = new IpercGeneralDA();
        List<IpercGeneral> lobjs = await IpercGeneralDA.fnGetIpercGeneralList(Gerencia
                                                                        , Area
                                                                        , PuestoTrabajo
                                                                        , Proceso
                                                                        , Subproceso
                                                                        , Alcance
                                                                        , Estado
                                                                        , PageInicio
                                                                        , PageFin);

        int total = lobjs.Count();

        Response response = new Response();
        response.Data = lobjs;
        response.Total = total;
        jsonrspt = JsonConvert.SerializeObject(response, Formatting.Indented);
    }
    if (vvhttpmethod == "object")
    {
        IpercGeneralDA IpercGeneralDA = new IpercGeneralDA();
        Result objs = await IpercGeneralDA.fnGetIpercGeneralObject(log,Id);

        jsonrspt = JsonConvert.SerializeObject(objs, Formatting.Indented);
    }

    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}

public class Response
{
    public List<IpercGeneral> Data { get; set; }
    public int Total { get; set; }
}
