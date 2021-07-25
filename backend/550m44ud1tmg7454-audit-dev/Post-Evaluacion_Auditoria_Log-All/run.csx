#r "Newtonsoft.Json"
#load "sqldb_evaluacion_auditoria_logall_post.csx"
 
   
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

    string jsonrspt = "";
    string name = req.Query["name"];    
    string vvhttpmethod = req.Query["httpmethod"];
 
 //Evaluar Clave API
  if(vvapikeysecure != vvapiKeyparameter )
  {
    vvhttpmethod="";
    jsonrspt="{}";
  }
 
  /*START - Parametros de Lectura*/
   
   // string apiKey = requestHeader.GetValues("apiKey").First();  
       
    string requestBody = await new StreamReader(req.Body).ReadToEndAsync();

   log.LogInformation("requestBody:"+requestBody);
   
    dynamic dataobject = JsonConvert.DeserializeObject(requestBody);

    DataEvaluacion_Auditoria_LogAll vobj_sqldata = new DataEvaluacion_Auditoria_LogAll();
    evaluacion_auditoria_logall curobj = new evaluacion_auditoria_logall();
    int newid =0;
    int curid =0;
 
   //Invocar INSERT
    if(vvhttpmethod == "post"){
        curobj =  funsetObject( log, dataobject ,vvhttpmethod );   
        
        Task<int> curobjtask = vobj_sqldata.funPostEvaluacion_Auditoria_LogAll( log , curobj);
        curobjtask.Wait();
        newid = (int)curobjtask.Result;
        curobj.Id = newid;

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
    }
    /*
    //Invocar PUT
    if(vvhttpmethod == "put"){
        curid  = System.Convert.ToInt32(req.Query["Id"]); 
        curobj =  funsetObject( log , dataobject,vvhttpmethod );   
        curobj = vobj_sqldata.funPutAuditoria_Modificacion_LogAll( log ,curid, curobj);
        curobj.Id = curid;
        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
    }

    //Invocar DELETE
    if(vvhttpmethod == "delete"){

        curid = System.Convert.ToInt32(req.Query["Id"]); 
        long nrorows = vobj_sqldata.funDeleteAuditoria_Modificacion_LogAll( log ,curid );

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(nrorows, Formatting.Indented);
    }
    */
    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}


public static evaluacion_auditoria_logall funsetObject(ILogger log, dynamic dataobject, string vvmethod)  
{
    // int vnid = 0;
    // if(vvmethod != "post")
    // {
    //     vnid    = dataobject?.Id;
    // }
    int vnstatusevaluacionnid  = dataobject?.StatusEvaluacionId;
    int vnauditoriaid        = dataobject?.AuditoriaId;
    string vvcreated_by       = dataobject?.Created_By;
    int vnactive              = dataobject?.Active;
    // string vvlast_updated_by  = dataobject?.last_updated_by; 
                  
    evaluacion_auditoria_logall curobj = new evaluacion_auditoria_logall();
    //curobj.Id           = vnid;
    curobj.StatusEvaluacionId  = vnstatusevaluacionnid;  
    curobj.AuditoriaId  = vnauditoriaid;  
    curobj.Active  = vnactive;  

    if(vvmethod == "post")
    {
        curobj.Created_By        = vvcreated_by;
        curobj.Created_Date      = System.DateTime.Now; 
    }
    
    // curobj.Last_Updated_By   = vvlast_updated_by;
    // curobj.Last_Updated_Date = System.DateTime.Now; 

    return curobj;
}   
