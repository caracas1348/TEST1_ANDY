#r "Newtonsoft.Json"
#load "sqldb_tipo_auditoriaall_post.csx"
 
   
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

    DataTipo_AuditoriaAll vobj_sqldata = new DataTipo_AuditoriaAll();
    tipo_auditoriaall curobj = new tipo_auditoriaall();
    long newid =0;
    long curid =0;
    string usuariodelete;
 
   //Invocar INSERT
    if(vvhttpmethod == "post"){
        curobj =  funsetObject( log, dataobject ,vvhttpmethod );   
        
        Task<long> curobjtask = vobj_sqldata.funPostTipo_AuditoriaAll( log , curobj);
        curobjtask.Wait();
        newid = (long)curobjtask.Result;
        curobj.Id = newid;

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
    }
  

    //Invocar PUT
    if(vvhttpmethod == "put"){
        curid= System.Convert.ToInt64(req.Query["Id"]); 
        curobj =  funsetObject( log , dataobject,vvhttpmethod );   
        curobj = vobj_sqldata.funPutTipo_AuditoriaAll( log ,curid, curobj);
        curobj.Id = curid;
        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
    }

    //Invocar DELETE
    if(vvhttpmethod == "delete"){

        curid= System.Convert.ToInt64(req.Query["Id"]);
        usuariodelete = req.Query["Delete_By"];

        long nrorows = vobj_sqldata.funDeleteTipo_AuditoriaAll( log ,curid );

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(nrorows, Formatting.Indented);
    }
  
    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}






public static tipo_auditoriaall funsetObject(ILogger log, dynamic dataobject, string vvmethod)  
{
    // long vnid = 0;
    // if(vvmethod != "post")
    // {
    //     vnid    = dataobject?.Id;
    // }
    string vvcode             = dataobject?.Code;
    string vndescription      = dataobject?.Description;
    int vnactive              = dataobject?.Active;
    // string vvcreated_by       = dataobject?.created_by;
    // string vvlast_updated_by  = dataobject?.last_updated_by; 
                  
    tipo_auditoriaall curobj = new tipo_auditoriaall();
    //curobj.Id           = vnid;
    curobj.Code         = vvcode;
    curobj.Description  = vndescription;                                           
    curobj.Active  = vnactive;                                           

    // if(vvmethod == "post")
    // {
    //     curobj.Created_By        = vvcreated_by;
    //     curobj.Created_Date      = System.DateTime.Now; 
    // }
    
    // curobj.Last_Updated_By   = vvlast_updated_by;
    // curobj.Last_Updated_Date = System.DateTime.Now; 

    return curobj;
}   
