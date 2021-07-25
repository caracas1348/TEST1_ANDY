#r "Newtonsoft.Json"
#load "sqldb_inspectionstatuslog_post.csx"
//#load "../Post-Question/sqldb_question.csx"
//#load "../Post-Question-Item/sqldb_questionitem_post.csx"

   
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

    if (vvapikeysecure != vvapiKeyparameter )
    {
        vvhttpmethod="";
        jsonrspt="{}";
    }

    string requestBody = await new StreamReader(req.Body).ReadToEndAsync();

    log.LogInformation("requestBody:"+requestBody);
   
    dynamic dataobject = JsonConvert.DeserializeObject(requestBody);

    DataAccessInspectionStatusLogPost vobj_sqldata_inspectionstatuslog = new DataAccessInspectionStatusLogPost();
    //DataAccessQuestion vobj_sqldata_question = new DataAccessQuestion();
    //DataAccessQuestionItem vobj_sqldata_questionitem = new DataAccessQuestionItem();
    InspectionStatusLog curobj = new InspectionStatusLog();

    long newIdInspectionStatusLog = 0;
    long curid =0; 

    TimeZoneInfo tzi = TimeZoneInfo.FindSystemTimeZoneById("SA Pacific Standard Time"); 
 
    if(vvhttpmethod == "post")
    {
        curobj =  funsetObjectInspectionStatusLog(log,dataobject,vvhttpmethod);   
        Task<long> curobjtaskstatuslog = vobj_sqldata_inspectionstatuslog.funPostInspectionStatusLog(log,curobj);
        curobjtaskstatuslog.Wait();
        newIdInspectionStatusLog = (long)curobjtaskstatuslog.Result;
        curobj.Id = newIdInspectionStatusLog;
        log.LogInformation("id de la inspeccion:" + newIdInspectionStatusLog);

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
    }
    

    //Invocar PUT
    if(vvhttpmethod == "put")
    {
        curid= System.Convert.ToInt64(req.Query["id"]); 
        curobj =  funsetObjectInspectionStatusLog(log,dataobject,vvhttpmethod );   
        curobj = vobj_sqldata_inspectionstatuslog.funPutInspectionStatusLog(log,curid,curobj);
        curobj.Id = curid;

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
    }

    
    //Invocar DELETE
    if(vvhttpmethod == "delete")
    {
        curid= System.Convert.ToInt64(req.Query["id"]);  
        vobj_sqldata_inspectionstatuslog.funDeleteInspectionStatusLog(log,curid);
        
        jsonrspt = JsonConvert.SerializeObject("{status:true}", Formatting.Indented);
    }

    return jsonrspt != null
        ? (ActionResult)new OkObjectResult($"{jsonrspt}")
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}

public static InspectionStatusLog funsetObjectInspectionStatusLog(ILogger log, dynamic dataobject, string vvmethod)
{             
    TimeZoneInfo tzi = TimeZoneInfo.FindSystemTimeZoneById("SA Pacific Standard Time"); 

    string vvcreated_by = dataobject?.created_by;
    string vvlast_updated_by = dataobject?.last_updated_by;  

    

    long vninspection_id = 0;
    if (dataobject.inspection_id>0) {
        vninspection_id = dataobject.inspection_id; 
    } 

    int vnstatus_id = 0;
    if (dataobject.status_id>0) {
        vnstatus_id = dataobject.status_id; 
    } 

    string vninspector_id = dataobject?.inspector_id;


    int? vnactive = null;
    if(dataobject?.active!=null){
        vnactive = dataobject?.active;
    }


    string vvmotive = dataobject?.motive;


    InspectionStatusLog curobj = new InspectionStatusLog();

    curobj.InspectionId = vninspection_id;
    curobj.StatusId = vnstatus_id;
    curobj.InspectorId = vninspector_id; 
    curobj.Active = vnactive; 
    curobj.Motive = vvmotive; 


    if (vvmethod == "post")
    {
        curobj.Created_By = vvcreated_by;
        curobj.Created_Date = TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);;
    }

    curobj.Last_Updated_By  = vvlast_updated_by;
    curobj.Last_Updated_Date= TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);;  


    return curobj;
}

