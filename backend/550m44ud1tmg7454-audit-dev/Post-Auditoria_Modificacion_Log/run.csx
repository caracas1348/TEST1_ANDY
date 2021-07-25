#r "Newtonsoft.Json"
#load "sqldb_auditoria_modificacion_logall_post.csx"
 
   
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

    DataAuditoria_Modificacion_LogAll vobj_sqldata = new DataAuditoria_Modificacion_LogAll();
    auditoria_modificacion_logall curobj = new auditoria_modificacion_logall();
    int newid =0;
    int curid =0;
 
   //Invocar INSERT
    if(vvhttpmethod == "post"){
        curobj =  funsetObject( log, dataobject ,vvhttpmethod );   
        
        Task<int> curobjtask = vobj_sqldata.funPostAuditoria_Modificacion_LogAll( log , curobj);
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


public static auditoria_modificacion_logall funsetObject(ILogger log, dynamic dataobject, string vvmethod)  
{
    // int vnid = 0;
    // if(vvmethod != "post")
    // {
    //     vnid    = dataobject?.Id;
    // }
    string vvdata_final       = dataobject?.Data_Final;
    string vvdata_inicial     = dataobject?.Data_Inicial;
    int vntipomodificacionid  = dataobject?.TipoModificacionId;
    long vnauditoriaid        = dataobject?.AuditoriaId;
    string vvcreate_by       = dataobject?.Create_By;
    int vnactive              = dataobject?.Active;
    // string vvlast_updated_by  = dataobject?.last_updated_by; 
                  
    auditoria_modificacion_logall curobj = new auditoria_modificacion_logall();
    //curobj.Id           = vnid;
    curobj.Data_Final  = vvdata_final;
    curobj.Data_Inicial  = vvdata_inicial;
    curobj.TipoModificacionId  = vntipomodificacionid;  
    curobj.AuditoriaId  = vnauditoriaid;  
    curobj.Active  = vnactive;  

    if(vvmethod == "post")
    {
        curobj.Create_By        = vvcreate_by;
        curobj.Create_Date      = System.DateTime.Now; 
    }
    
    // curobj.Last_Updated_By   = vvlast_updated_by;
    // curobj.Last_Updated_Date = System.DateTime.Now; 

    return curobj;
}   
