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
// run 30
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
    long DNI = req.Query["DNI"] == "" ? 0 : System.Convert.ToInt64(req.Query["DNI"]);//obtener DNI    
    // Objetos a Utilizar
    DataPlanAnualGetAll vobj_sqldata = new DataPlanAnualGetAll();
    //Metodo:  listado de evaluacion de auditores
    if (vvhttpmethod == "objectlist")
    {
        DataPlanAnual curobj = new DataPlanAnual();        
        curobj = await vobj_sqldata.funGetPlanAnualAllList(log, DNI);
        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
    }
    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Pase un nombre en la cadena de consulta o en el cuerpo de la solicitud");
}
