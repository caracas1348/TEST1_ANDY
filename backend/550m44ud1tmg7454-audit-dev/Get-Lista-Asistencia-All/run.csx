#r "Newtonsoft.Json"
#load "sqldb_lista_asistencia_all_get.csx"
#load "../Get-Asistentes-All/sqldb_asistentes_all_get.csx"

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
 
    long vnid                 = System.Convert.ToInt64(req.Query["Id"]); 
    long vnAuditoriaID        = System.Convert.ToInt64(req.Query["AuditoriaID"]);    
    long vnSedeId             = System.Convert.ToInt64(req.Query["SedeId"]);
    string vvNorma            = req.Query["Norma"];
    string vvUserIdHash       = req.Query["UserIdHash"];
    string vvCreated_Date     = req.Query["Created_Date"];
    string vvCreated_Date_End = req.Query["Created_Date_End"];

    log.LogInformation("vvUserIdHash -> "+vvUserIdHash);
    bool vardatevalidation_correct  = true;

    DataListaAsistenciaAll vobj_sqldata = new DataListaAsistenciaAll();
    DataAsistentesAll vobj_sqldata_asistentes = new DataAsistentesAll();
    string jsonrspt = "";
    //Evaluar Clave API
    if(vvapikeysecure != vvapiKeyparameter )
    {
        vvhttpmethod    = "";
        jsonrspt        = "{}";
    }
    //Metodo:  list
    if(vvhttpmethod == "objectlist")
    {   
        List<listaasistencia> lobjs = vobj_sqldata.funGetListaAsistenciaAllList(log
                                                                , vvUserIdHash
                                                                , vnAuditoriaID
                                                                , vnSedeId
                                                                , vvNorma
                                                                , vvCreated_Date
                                                                , vvCreated_Date_End    
                                                                );
        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(lobjs, Formatting.Indented);
    }

    //Metodo: 1 object
    if(vvhttpmethod == "object")
    {
        listaasistencia vobjs = vobj_sqldata.funGetListaAsistenciaAll(log
                                                        ,1
                                                        ,vnid                                                                                                             
                                                       );

        List<asistente> asistentes = vobj_sqldata_asistentes.funGetAsistentesAllList(log
                                                                , vobjs.Id);

        vobjs.Asistentes = asistentes;

        if( vobjs.Id > 0 )
        {
            //Conversion de Respuestas a JSON
            jsonrspt = JsonConvert.SerializeObject(vobjs, Formatting.Indented);
        }
        else
        { jsonrspt="{}"; }
    }

    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}
