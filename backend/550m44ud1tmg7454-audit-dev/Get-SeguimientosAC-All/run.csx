#r "Newtonsoft.Json"
#load "sqldb_seguimientos_get.csx"


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
    log.LogInformation("vvapiKeyparameter -> " + vvapiKeyparameter);
    log.LogInformation("vvhttpmethod -> " + vvhttpmethod);

    string jsonrspt = "";
    //Evaluar Clave API
    if(vvapikeysecure != vvapiKeyparameter )
    {
        log.LogInformation( "vvapikeysecure != vvapiKeyparameter");
        vvhttpmethod    = "";
        jsonrspt        = "{}";
    }

    /*START - Parametros de Lectura*/
    long TipoHallazgoId           = req.Query["TipoHallazgoId"] == "" ? 0 : System.Convert.ToInt64(req.Query["TipoHallazgoId"]);
    long NormaId                  = req.Query["NormaId"] == "" ? 0 : System.Convert.ToInt64(req.Query["NormaId"]);
    long SedeId                   = req.Query["SedeId"] == "" ? 0 : System.Convert.ToInt64(req.Query["SedeId"]);
    long StatusPACId              = req.Query["StatusPACId"] == "" ? 0 : System.Convert.ToInt64(req.Query["StatusPACId"]);
    string FechaInicio            = req.Query["FechaInicio"].ToString();
    string FechaFin               = req.Query["FechaFin"].ToString();
    FechaInicio                   = FechaInicio == "" ? "" : FechaInicio + " 00:00:00";
    FechaFin                      = FechaFin == "" ? "" : FechaFin + " 23:59:59";
    string ResponsableUserHash    = req.Query["ResponsableUserHash"].ToString();
    ResponsableUserHash           = ResponsableUserHash == "" ? "" : ResponsableUserHash;

    // Objetos a Utilizar
    DataSeguimientosGet vobj_sqldata = new DataSeguimientosGet();

    //Metodo:  listado de evaluacion de auditores
    if (vvhttpmethod == "objectlist")
    {
        log.LogInformation("vvhttpmethod = objectlist");
        DataSeguimientos curobj = new DataSeguimientos();
        long Id = 0;
        curobj = await vobj_sqldata.funGetSeguimientosAllList( log
                                                            , Id
                                                            , TipoHallazgoId
                                                            , NormaId
                                                            , SedeId
                                                            , StatusPACId
                                                            , FechaInicio
                                                            , FechaFin
                                                            , ResponsableUserHash
                                                            );

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
    }

    //Metodo:  listado de app de responsable de acciones
    if (vvhttpmethod == "objectlistApp")
    {
    	List<AccionesApp> curobjApp = new List<AccionesApp>();
    	curobjApp = await vobj_sqldata.funGetAccionesAppList( log
                                                            , ResponsableUserHash
                                                            );
    	//Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobjApp, Formatting.Indented);
    }

    //Metodo:  listado de app de responsable de acciones
    if (vvhttpmethod == "getEvidencia")
    {
        log.LogInformation("vvhttpmethod = getEvidencia");

        long Id  = req.Query["Id"] == "" ? 0 : System.Convert.ToInt64(req.Query["Id"]);

        Evidencias evidencia = new Evidencias();

        evidencia = await vobj_sqldata.funGetEvidenciaById(log, Id);

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(evidencia, Formatting.Indented);
    }

    //Metodo: Obtener Adjunto de una reprogramacion por Id
    if (vvhttpmethod == "getAdjuntoReprogramacion")
    {
        log.LogInformation("vvhttpmethod = getAdjuntoReprogramacion");

        long Id  = req.Query["Id"] == "" ? 0 : System.Convert.ToInt64(req.Query["Id"]);

        AdjuntoReprogramacion AdjuntoReprogramacion = new AdjuntoReprogramacion();

        AdjuntoReprogramacion = await vobj_sqldata.funGetAdjuntoReprogramacionByReprogramacionId(log, Id);

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(AdjuntoReprogramacion, Formatting.Indented);
    }

    /**
     * [vvhttpmethod Buscar las acciones vencidas y cambiar el status al PAC en la tabla ]
     * @type {[type]}
     */
    if (vvhttpmethod == "searchExpiredShares")
    {
        log.LogInformation("En vvhttpmethod == searchExpiredShares.");
        List<SeguimientosGet> listObj = new List<SeguimientosGet>();

        listObj = await vobj_sqldata.funGetSeguimientosExpiredAll(log);

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(listObj, Formatting.Indented);
    }


    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}
