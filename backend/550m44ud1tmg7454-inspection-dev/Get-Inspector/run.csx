#r "Newtonsoft.Json"
//#load "../Get-Question/sqldb_question_get.csx"
//#load "../Get-Question-Item/sqldb_questionitem_get.csx"
#load "sqldb_inspector_get.csx"


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
    
    long vnid = System.Convert.ToInt64(req.Query["id"]);
    string vvperson_name = req.Query["person_name"];
    string vvhash_id = req.Query["hash_id"];
    int vnperson_type = System.Convert.ToInt32(req.Query["person_type"]);
    int vnrole = System.Convert.ToInt32(req.Query["role"]);
    int vnarea_id = System.Convert.ToInt32(req.Query["area_id"]);
    int vnunit_id = System.Convert.ToInt32(req.Query["unit_id"]);
    int vnsede_id = System.Convert.ToInt32(req.Query["sede_id"]);
    string vvarea_responsible = req.Query["area_responsible"];

    DataAccessInspector vobj_InspectorData = new DataAccessInspector();
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
        List<Inspector> lobjs = vobj_InspectorData.funGetInspectorList(log
                                                                        ,vnid
                                                                        ,vvperson_name
                                                                        ,vvhash_id
                                                                        ,vnperson_type
                                                                        ,vnrole
                                                                        ,vnarea_id
                                                                        ,vnunit_id
                                                                        ,vnsede_id
                                                                        ,vvarea_responsible
                                                                        );

        jsonrspt = JsonConvert.SerializeObject(lobjs, Formatting.Indented);
    }

    if (vvhttpmethod == "object")
    {
        Inspector vobjs = vobj_InspectorData.funGetInspector(log, vnid, vvhash_id);
        
        if( vobjs.Id > 0 )
        {
            jsonrspt = JsonConvert.SerializeObject(vobjs, Formatting.Indented);
        }
        else 
        {
            jsonrspt="{}"; 
        }
    }


    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}