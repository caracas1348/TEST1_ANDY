/****************************************************************************************
* VISUAL SAT - [2021]
* PROYECTO : SIGTASA
* ESQUEMA : SSOMA
* SPRINT  : 4
* MODULO : GESTIÓN DE PLAN ANUAL
* OPERADORES_________________________________________________________________________
* | # | PROGRAMADOR     |  |      FECHA   |  |   HORA   |           CORREO           |
* | 1 |  zzzz    |  |  14/03/2021  |  | 05:28:50 |    ccccc@gmail.com   |
* |___|_________________|__|______________|__|__________|____________________________|
*
* DESCRIPCION: ARCHIVO SQL BACKEND DE FUNCIONALIDAD EN SERVIDOR  QUE OBTIENE LISTADO DE INCIDENTES CREADOS EN LA APP x1
*
* ARCHIVOS DE FRONT       ____________________________________
* | # |     MODULO             |  |         NOMBRE            |
* | 1 |      SSOMA             |  |  pppppp.html   |
* |___________________________________________________________|
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
    log.LogInformation("C# La función de activación HTTP procesó una solicitud. MILA");

    // obteniendo los datos 

    var requestHeader           = req.Headers; 
    var vvapikeysecure          = Environment.GetEnvironmentVariable("apikey",EnvironmentVariableTarget.Process);
    string vvapiKeyparameter    = requestHeader["apiKey"];
    string vvhttpmethod         = req.Query["httpmethod"];

    log.LogInformation(" * requestHeader: " + requestHeader);
    log.LogInformation(" **   vvapikeysecure: " + vvapikeysecure);
    log.LogInformation(" **   vvapiKeyparameter: " + vvapiKeyparameter);
    log.LogInformation(" **   vvhttpmethod: " + vvhttpmethod);
    log.LogInformation(" **++++   REQ: " + req);
    // string jsonrspt = ""; 
    // //Evaluar Clave API
    // if(vvapikeysecure != vvapiKeyparameter )
    // {
    //     vvhttpmethod    = "";
    //     jsonrspt        = "{}";
    // }


    /*START - Parametros de Lectura*/        
    // long UnidadNegocioId = req.Query["UnidadNegocioId"] == "" ? 0 : System.Convert.ToInt64(req.Query["UnidadNegocioId"]);



    // Objetos a Utilizar "DataPlanAnualGetAll" que esta en el archivo sql.csx
    // DataPlanAnualGetAll vobj_sqldata = new DataPlanAnualGetAll();

    //Metodo:  listado de evaluacion de auditores
    // if (vvhttpmethod == "objectlist")
    // {
    //     DataPlanAnual curobj = new DataPlanAnual();
    //     long Id = 0;
    //     curobj = await vobj_sqldata.funGetPlanAnualAllList( log, UnidadNegocioId);
        
    //     //Conversion de Respuestas a JSON
    //     jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
    // }


    return jsonrspt = true; 
    // != null
    //     ? (ActionResult)new OkObjectResult(jsonrspt)
    //     : new BadRequestObjectResult("Pase un nombre en la cadena de consulta o en el cuerpo de la solicitud");
}



