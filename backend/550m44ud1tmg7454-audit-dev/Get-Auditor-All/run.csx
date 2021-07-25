#r "Newtonsoft.Json"
#load "sqldb_auditorall_get.csx"

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
    int vnid                        = System.Convert.ToInt32(req.Query["Id"]);    
    string vvuseridhash             = req.Query["UserIdhash"];
    string vvname                   = req.Query["Name"];
    string vvrol_code               = req.Query["Rol_Code"];
    int vnsedeid                    = System.Convert.ToInt32(req.Query["SedeId"]);    
    int vnactive                    = System.Convert.ToInt32(req.Query["Active"]);    
    int vnespecialidadid            = System.Convert.ToInt32(req.Query["EspecialidadId"]);    
    string vvcargo                  = req.Query["Cargo"];
    string vvcreate_by              = req.Query["Create_By"];
    int vntipo                      = System.Convert.ToInt32(req.Query["Tipo"]);
    // string vvlast_updated_by        = req.Query["last_updated_by"];
    // string vvcreated_date_ini       = req.Query["created_date_ini"];
    // string vvcreated_date_end       = req.Query["created_date_end"];
    // string vvlast_updated_date_ini  = req.Query["last_updated_date_ini"];
    // string vvlast_updated_date_end  = req.Query["last_updated_date_end"];
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


    DataAuditorAll vobj_sqldata = new DataAuditorAll();
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
        List<auditorall> lobjs = vobj_sqldata.funGetAuditorAllList(log
                                                                ,vnsearch_type
                                                                ,vnid                                                           
                                                                ,vvuseridhash
                                                                ,vvname                                                                
                                                                ,vvrol_code
                                                                ,vnsedeid
                                                                ,vnactive
                                                                ,vnespecialidadid
                                                                ,vvcargo
                                                                ,vntipo
                                                                ,vvcreate_by
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
