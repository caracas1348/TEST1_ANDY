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
    long Id             = req.Query["Id"] == "" ? 0 : System.Convert.ToInt64(req.Query["Id"]);
    int TipoObservacion = req.Query["TipoObservacion"] == "" ? 0 : System.Convert.ToInt32(req.Query["TipoObservacion"]);
    long Criticidad_F   = req.Query["Criticidad"] == "" ? 0 : System.Convert.ToInt64(req.Query["Criticidad"]);
    long Sede           = req.Query["Sede"] == "" ? 0 : System.Convert.ToInt64(req.Query["Sede"]);
    long Embarcacion    = req.Query["Embarcacion"] == "" ? 0 : System.Convert.ToInt64(req.Query["Embarcacion"]);
    int Estado          = req.Query["Estado"] == "" ? 0 : System.Convert.ToInt32(req.Query["Estado"]);
    string Reportante   = req.Query["Reportante"].ToString();
    string CreatedBy    = req.Query["Created_By"].ToString();
    string FechaInicio  = req.Query["FechaInicio"].ToString();
    string FechaFin     = req.Query["FechaFin"].ToString();
    FechaInicio         = FechaInicio == "" ? "" : FechaInicio + " 00:00:00";
    FechaFin            = FechaFin == "" ? "" : FechaFin + " 23:59:59";

    int PageInicio = System.Convert.ToInt32(req.Query["PageInicio"]);
    int PageFin = System.Convert.ToInt32(req.Query["PageFin"]);
    log.LogInformation("FechaInicio: "+FechaInicio);
    log.LogInformation("FechaFin: "+FechaFin);
    log.LogInformation("Criticidad_F: "+Criticidad_F);
    string jsonrspt = "";

    if (vvapikeysecure != vvapiKeyparameter)
    {
        vvhttpmethod = "";
        jsonrspt = "{}";
    }

    if (vvhttpmethod == "objectlist")
    {
        SeguimientoDA parametricaDA = new SeguimientoDA();
        List<Seguimiento> lobjs = await parametricaDA.fnGetSeguimientoList(log
                                                                        , CreatedBy
                                                                        , TipoObservacion
                                                                        , Criticidad_F
                                                                        , Sede
                                                                        , Embarcacion
                                                                        , Estado
                                                                        , Reportante
                                                                        , FechaInicio
                                                                        , FechaFin
                                                                        , PageInicio
                                                                        , PageFin);

        int total = await parametricaDA.fnGetSeguimientoCount(TipoObservacion
                                                            , Criticidad_F
                                                            , Sede
                                                            , Embarcacion
                                                            , Estado
                                                            , Reportante
                                                            , FechaInicio
                                                            , FechaFin);

        List<Criticidad> Criticidad = await parametricaDA.fnGetListCriticidad(log);


        Response response   = new Response();
        response.Data       = lobjs;
        response.Total      = total;
        response.Criticidad = Criticidad;
        jsonrspt            = JsonConvert.SerializeObject(response, Formatting.Indented);
    }
    if (vvhttpmethod == "object")
    {
        SeguimientoDA parametricaDA = new SeguimientoDA();
        bool adjunto = true;
        Result objs = await parametricaDA.fnGetSeguimientoObject(log, Id, adjunto);

        jsonrspt = JsonConvert.SerializeObject(objs, Formatting.Indented);
    }

    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}

public class Response
{
    public List<Seguimiento> Data { get; set; }
    public int Total { get; set; }
    public List<Criticidad> Criticidad { get; set; }
}
