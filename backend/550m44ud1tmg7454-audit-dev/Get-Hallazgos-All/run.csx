#r "Newtonsoft.Json"
#load "sqldb_hallazgosall_get.csx"


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

    string jsonrspt = "";
    //Evaluar Clave API
    if(vvapikeysecure != vvapiKeyparameter )
    {
        vvhttpmethod    = "";
        jsonrspt        = "{}";
    }

    /*START - Parametros de Lectura*/        
    long FuenteId                 = req.Query["FuenteId"] == "" ? 0 : System.Convert.ToInt64(req.Query["FuenteId"]);
    long TipoHallazgoId           = req.Query["TipoHallazgoId"] == "" ? 0 : System.Convert.ToInt64(req.Query["TipoHallazgoId"]);
    long NormaId                  = req.Query["NormaId"] == "" ? 0 : System.Convert.ToInt64(req.Query["NormaId"]);
    long SedeId                   = req.Query["SedeId"] == "" ? 0 : System.Convert.ToInt64(req.Query["SedeId"]);
    long StatusId                 = req.Query["StatusId"] == "" ? 0 : System.Convert.ToInt64(req.Query["StatusId"]);
    long StatusAccionCorrectivaId = req.Query["StatusAccionCorrectivaId"] == "" ? 0 : System.Convert.ToInt64(req.Query["StatusAccionCorrectivaId"]);
    string FechaInicio            = req.Query["FechaInicio"].ToString();
    string FechaFin               = req.Query["FechaFin"].ToString();
    FechaInicio                   = FechaInicio == "" ? "" : FechaInicio + " 00:00:00";
    FechaFin                      = FechaFin == "" ? "" : FechaFin + " 23:59:59";
    string ResponsableUserHash    = req.Query["ResponsableUserHash"].ToString();
    ResponsableUserHash           = ResponsableUserHash == "" ? "" : ResponsableUserHash;

    // Objetos a Utilizar
    DataHallazgosGetAll vobj_sqldata = new DataHallazgosGetAll();

    //Metodo:  listado de evaluacion de auditores
    if (vvhttpmethod == "objectlist")
    {
        DataHallazgo curobj = new DataHallazgo();
        long Id = 0;
        curobj = await vobj_sqldata.funGetHallazgosAllList( log
                                                            , Id
                                                            , FuenteId
                                                            , TipoHallazgoId
                                                            , NormaId
                                                            , SedeId
                                                            , StatusId
                                                            , StatusAccionCorrectivaId
                                                            , FechaInicio
                                                            , FechaFin
                                                            , ResponsableUserHash
                                                            );
        
        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
    }


    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}
