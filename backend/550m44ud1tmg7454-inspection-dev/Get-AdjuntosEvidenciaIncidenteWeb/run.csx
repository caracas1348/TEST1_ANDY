/****************************************************************************************
* VISUAL SAT - [2021]
* PROYECTO : SIGTASA
* ESQUEMA : SSOMA
* SPRINT  : 4
* MODULO : INCIDENTE ACCIDENTE
* OPERADORES_________________________________________________________________________
* | # | PROGRAMADOR     |  |      FECHA   |  |   HORA   |           CORREO           |
* | 1 | Andy Vásquez    |  |  27/03/2021  |  | 12:30:50 |    caracas1348@gmail.com   |
* |___|_________________|__|______________|__|__________|____________________________|
*
* DESCRIPCION: ARCHIVO RUN BACKEND DE FUNCIONALIDAD EN SERVIDOR DEL LISTADO E INFORMACION --run 02  31_03
*              LOS INCIDENTES ACCIDENTES DESDE LA WEB
*
* ARCHIVOS DE FRONT       _____________________________________________
* | # |     MODULO             |  |         NOMBRE                    |
* | 1 |      SSOMA             |  |  gestionAccidenteIncidente.html   |
* |___________________________________________________________________|
*
* VERSION: 0.1 Beta
*******************************************************************************************/

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
    log.LogInformation("C# La función de activación HTTP procesó una solicitud.");

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
    long IdTipoEvento         = req.Query["IdTipoEvento"] == "" ? 0 : System.Convert.ToInt64(req.Query["IdTipoEvento"]);//@Id1
    long IdEmpresa            = req.Query["IdEmpresa"] == "" ? 0 : System.Convert.ToInt64(req.Query["IdEmpresa"]); //@AccionBD


    long IdSede                = req.Query["IdSede"] == "" ? 0 : System.Convert.ToInt64(req.Query["IdSede"]);//-----------*** NO
    string FechaInicio         = req.Query["FechaInicio"].ToString();
    string FechaFin            = req.Query["FechaFin"].ToString();
    long IdEmbarcacion         = req.Query["IdEmbarcacion"] == "" ? 0 : System.Convert.ToInt64(req.Query["IdEmbarcacion"]);//-----------*** NO

                














     /*START - Parametros de Lectura*/        
    // long IdTipoEvento            = req.Query["IdTipoEvento"] == "" ? 0 : System.Convert.ToInt64(req.Query["IdTipoEvento"]);
    // long IdEmpresa            = req.Query["IdEmpresa"] == "" ? 0 : System.Convert.ToInt64(req.Query["IdEmpresa"]);
    // long IdSede                = req.Query["IdSede"] == "" ? 0 : System.Convert.ToInt64(req.Query["IdSede"]);
    // string FechaInicio         = req.Query["FechaInicio"].ToString();
    // string FechaFin            = req.Query["FechaFin"].ToString();
    // string Responsable         = req.Query["Responsable"].ToString();//---------- NO POR AHORA
    // long IdEmbarcacion              = req.Query["IdEmbarcacion"] == "" ? 0 : System.Convert.ToInt64(req.Query["IdEmbarcacion"]);


    FechaInicio                = FechaInicio == "" ? "" : FechaInicio + " 00:00:00";//-----------*** NO
    FechaFin                   = FechaFin == "" ? "" : FechaFin + " 23:59:59";//-----------*** NO
                        

    // Objetos a Utilizar
    DataPlanAnualGetAll vobj_sqldata = new DataPlanAnualGetAll();

    //Metodo:  listado de evaluacion de auditores
    if (vvhttpmethod == "objectlist")
    {
        DataPlanAnual curobj = new DataPlanAnual();
        long Id = 0;
        curobj = await vobj_sqldata.funGetPlanAnualAllList( log
                                                            , Id
                                                            , IdTipoEvento   //Tipo Evento
                                                            , IdEmpresa   //IdEmpresa
                                                            , IdSede       // Sede
                                                            , FechaInicio  //Fecha desde
                                                            , FechaFin     //Fecha Hasta
                                                            , IdEmbarcacion   //Embarcacion
                                                            );
        
        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
    }

 

    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Pase un nombre en la cadena de consulta o en el cuerpo de la solicitud");
}
