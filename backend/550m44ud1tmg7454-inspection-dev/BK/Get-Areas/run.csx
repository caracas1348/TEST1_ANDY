#r "Newtonsoft.Json"
//#load "../Get-Question/sqldb_question_get.csx"
//#load "../Get-Question-Item/sqldb_questionitem_get.csx"
#load "sqldb_area_get.csx"


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
    var vvapikeysecure = Environment.GetEnvironmentVariable("apikey",EnvironmentVariableTarget.Process);
    string vvapiKeyparameter = requestHeader["apiKey"];

    string vvhttpmethod = req.Query["httpmethod"];
    
    int vnid = System.Convert.ToInt32(req.Query["id"]);
    string vvdescription = req.Query["description"];
    int vnunidad_negocio_id = System.Convert.ToInt32(req.Query["unidad_negocio_id"]);
    int vnactive = System.Convert.ToInt32(req.Query["active"]);


    DataAccessArea vobj_areaData = new DataAccessArea();
    //DataAccessQuestion vobj_sqldataQuestion = new DataAccessQuestion();
    //DataAccessQuestionItem vobj_sqldataQuestionI = new DataAccessQuestionItem();

    string jsonrspt = "";

    if (vvapikeysecure != vvapiKeyparameter )
    {
        vvhttpmethod="";
        jsonrspt="{}";
    }

    if (vvhttpmethod == "objectlist")
    {
        List<Area> lobjs = vobj_areaData.funGetAreaList(log
                                                , vnid
                                                , vvdescription
                                                , vnunidad_negocio_id
                                                , vnactive
                                                );

        jsonrspt = JsonConvert.SerializeObject(lobjs, Formatting.Indented);
    }

    /*if (vvhttpmethod == "object")
    {
        Area vobjs = vobj_inspectionData.funGetInspection(log, vnid);
        
        if( vobjs.Id > 0 )
        {
            jsonrspt = JsonConvert.SerializeObject(vobjs, Formatting.Indented);
        }
        else 
        {
            jsonrspt="{}"; 
        }
    }*/


    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}