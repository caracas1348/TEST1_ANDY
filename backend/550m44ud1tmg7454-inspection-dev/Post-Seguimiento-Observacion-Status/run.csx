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

    string jsonrspt = "";

    if (vvapikeysecure != vvapiKeyparameter)
    {
        vvhttpmethod = "";
        jsonrspt = "{}";
    }

    string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
    dynamic body = JsonConvert.DeserializeObject(requestBody);


    SeguimientoDA seguimientoDA = new SeguimientoDA();

    if (vvhttpmethod == "put")
    {
        Seguimiento seguimiento = fnSetObjSeguimiento(body);
        seguimiento.Id = Convert.ToInt32(req.Query["id"]);
        Response response = new Response();

        int rows = await seguimientoDA.fnPutSeguimientoStatus(seguimiento);

        response.status = (rows > 0);
        response.message = (rows > 0 ? "Se actualizó el estado de la observación con éxito" : "Error al actualizar el estado de la observación");
        jsonrspt = JsonConvert.SerializeObject(response, Formatting.Indented);
    }

    return jsonrspt != null
        ? (ActionResult)new OkObjectResult($"{jsonrspt}")
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");

}



static Seguimiento fnSetObjSeguimiento(dynamic body)
{
    Seguimiento obj = new Seguimiento();
    obj.Estado = body?.Estado;
    obj.Updated_By = body?.Updated_By;
    return obj;
}
