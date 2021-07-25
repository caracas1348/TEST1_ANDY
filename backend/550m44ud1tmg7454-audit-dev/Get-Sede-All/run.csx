#r "Newtonsoft.Json"
#load "sqldb_sedeall_get.csx"

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

    /*START - Parametros de Lectura*/   
    int vnsearch_type               = System.Convert.ToInt32(req.Query["search_type"]);
    long vnid                       = System.Convert.ToInt64(req.Query["Id"]);    
    string vvcode                   = req.Query["vvcode"];
    string vvdescription            = req.Query["Description"];
    long vnunidadnegocioid          = System.Convert.ToInt64(req.Query["UnidadNegocioId"]);    
    int vnactive                    = System.Convert.ToInt32(req.Query["Active"]);
    // string vvcreated_by             = req.Query["Created_By"];
    // string vvcreated_date           = req.Query["Created_Date"];
    // string vvlast_updated_by        = req.Query["Last_Updated_By"];
    // string vvlast_updated_date      = req.Query["Last_Updated_Date"];

    bool vardatevalidation_correct  = true;
    
    // try{
    //     DateTime vdvalDate = System.DateTime.Now;
    //     vdvalDate = DateTime.ParseExact(vvcreated_date_ini,"yyyy-MM-dd",CultureInfo.InvariantCulture);
    //     vdvalDate = DateTime.ParseExact(vvcreated_date_end,"yyyy-MM-dd",CultureInfo.InvariantCulture);
    // }
    // catch(Exception ex)
    // {
    //     vardatevalidation_correct=false;
    // }
   
     /*END - Parametros de Lectura*/


    DataSedeAll vobj_sqldata = new DataSedeAll();
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
        List<sedeall> lobjs = vobj_sqldata.funGetSedeAllList(log
                                                                , vnsearch_type
                                                                , vnid    
                                                                , vvcode
                                                                , vvdescription
                                                                , vnunidadnegocioid
                                                                , vnactive
                                                                // , vvcreated_by
                                                                // , vvcreated_date
                                                                // , vvlast_updated_by
                                                                // , vvlast_updated_date
                                                                ) ;
        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(lobjs, Formatting.Indented);
    }

    //Metodo: 1 object
    /*if(vvhttpmethod == "object")
    {
        garitaall vobjs = vobj_sqldata.funGetGaritaAll(log
                                                        ,vnsearch_type
                                                        ,vnid                                                        
                                                        ,vvname                                                      
                                                       );
        if( vobjs.id > 0 )
        {
            //Conversion de Respuestas a JSON
            jsonrspt = JsonConvert.SerializeObject(vobjs, Formatting.Indented);
        }
        else
        { jsonrspt="{}"; }
    }*/

    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}
