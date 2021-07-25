//#load "sqldb_notification_time_exceeded.csx"
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
//---------------------------------------------------
//static readonly HttpClient httpclient = new HttpClient();
//---------------------------------------------------
public static async void Run(TimerInfo daemon, ILogger log)
{
    HttpClient httpclient = new HttpClient();
    //DataTimeExceeded vobj_notification = new DataTimeExceeded();    
    log.LogInformation("Mi primer demonio cada 2 segundos");
    log.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}");
    var url                     = "https://550m44ud1tmg7454-inspection-dev.azurewebsites.net/api/Get-Inspection?httpmethod=verifyInspections&code=mT6CeeQ41ShdqLdZ3amPjgnfwiyWx6HVkU3k7UoEIrvEw8wehPIdHw==";
    //var url                     = "https://v1s17454-prd-access-registries-mger-dev.azurewebsites.net/api/Get-AccessEvent-All?code=L/ddK4bVoSKxjnfgSC2WWszy99PRNXQaAsS/9vjjuyCZ72x2fZICZQ==&httpmethod=objectlisttimelimit";    
    httpclient.DefaultRequestHeaders.Add("apikey", "r$3#23516ewew5");                      
    var response            = await httpclient.GetAsync(url);

    var url2                     = Environment.GetEnvironmentVariable("apiURL",EnvironmentVariableTarget.Process)+"/api/Post-Plan-Anual?httpmethod=PutEstadoTareaVencida&code=mT6CeeQ41ShdqLdZ3amPjgnfwiyWx6HVkU3k7UoEIrvEw8wehPIdHw==";
   // var url2                     = "https://550m44ud1tmg7454-inspection-dev.azurewebsites.net/api/Post-Plan-Anual?httpmethod=PutEstadoTareaVencida&code=mT6CeeQ41ShdqLdZ3amPjgnfwiyWx6HVkU3k7UoEIrvEw8wehPIdHw==";
    //var url                     = "https://v1s17454-prd-access-registries-mger-dev.azurewebsites.net/api/Get-AccessEvent-All?code=L/ddK4bVoSKxjnfgSC2WWszy99PRNXQaAsS/9vjjuyCZ72x2fZICZQ==&httpmethod=objectlisttimelimit";    
    var response2            = await httpclient.GetAsync(url2);
}