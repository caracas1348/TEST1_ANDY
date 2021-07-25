#r "Newtonsoft.Json"
#load "sql.csx"


using System;
using System.Globalization;
using System.Net;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Transactions;
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
    var vvapikeysecure = Environment.GetEnvironmentVariable("apikey", EnvironmentVariableTarget.Process);
    //string vvapikeysecure = requestHeader["apiKey"];
    string vvapiKeyparameter = requestHeader["apiKey"];

    string vvhttpmethod = req.Query["httpmethod"];

    long Id = req.Query["Id"] == "" ? 0 : System.Convert.ToInt64(req.Query["Id"]);

    string jsonrspt = "";

    if (vvapikeysecure != vvapiKeyparameter)
    {
        vvhttpmethod = "";
        jsonrspt = "{}";
    }

    string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
    dynamic body = JsonConvert.DeserializeObject(requestBody);


    PericonDA PericonDA = new PericonDA();
    Pericon Pericon = new Pericon();

    if (vvhttpmethod == "post")
    {
        log.LogInformation("vvhttpmethod == post");
        Pericon = fnSetObjPericon(log, body, vvhttpmethod);

        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            try
            {
                Pericon = await PericonDA.fnPostPericon(log, Pericon);
                log.LogInformation("inserto en fnPostPericon");

                scope.Complete();
            }
            catch (Exception ex)
            {
                log.LogInformation("catch::" + ex.Message);
                Pericon.Id = -1;
            }

        jsonrspt = JsonConvert.SerializeObject(Pericon, Formatting.Indented);
    }

    return jsonrspt != null
        ? (ActionResult)new OkObjectResult($"{jsonrspt}")
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}


// public static void envioNotificacion(ILogger log, Pericon Pericon)
// {

// }

public static Pericon fnSetObjPericon(ILogger log, dynamic body, string vvmethod)
{
    Pericon obj = new Pericon();
    log.LogInformation("en fnSetObjIpercGeneral");
    if (vvmethod == "post")
    {
        log.LogInformation("en  if (vvmethod == post || vvmethod == postPrueba)");

        obj.Peligro = body?.Peligro;
        obj.Riesgo = body?.Riesgo;
        obj.Consecuencia = body?.Consecuencia;
        obj.Severidad = body?.Severidad;

        obj.Active = body?.Active;

        obj.IdPericon = body?.IdPericon;

        log.LogInformation("en  TimeZoneInfo PeruZona");
        TimeZoneInfo PeruZona = TimeZoneInfo.FindSystemTimeZoneById("SA Pacific Standard Time");
        DateTime horaPeru = TimeZoneInfo.ConvertTime(DateTime.Now, PeruZona);

        obj.Created_By = body?.Created_By;
        obj.Updated_By = body?.Updated_By;

        log.LogInformation("en  obj.Created_By = body?.Created_By;");
    }

    log.LogInformation("return obj");


    return obj;
}


