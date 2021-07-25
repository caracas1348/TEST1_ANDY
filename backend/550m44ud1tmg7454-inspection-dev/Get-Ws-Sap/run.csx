#r "Newtonsoft.Json"

using System;
using System.Globalization;
using System.Net;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System.Configuration;
using System.Collections;
using System.Text;
using System.Net.Http;
using System.Net.Http.Headers; 
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;

static readonly HttpClient client = new HttpClient();
public static async Task<IActionResult> Run(HttpRequest req, ILogger log)
{
    log.LogInformation("C# HTTP trigger function processed a request.");

    var requestHeader = req.Headers;
    var vvapikeysecure = Environment.GetEnvironmentVariable("apikey", EnvironmentVariableTarget.Process);
    string vvapiKeyparameter = requestHeader["apiKey"];

    string vvhttpmethod = req.Query["httpmethod"];
    string jsonrspt = "";
    string  result;

    string sede_code = req.Query["sede_code"];

    if (vvapikeysecure != vvapiKeyparameter)
    {
        vvhttpmethod = "";
        jsonrspt = "{}";
    }

    if (vvhttpmethod == "listsedes")
    {
        resp respuesta = new resp();
        List<sede> sedelist = new List<sede>();

        var url = "https://enlacesap.tasa.com.pe/gwp/opu/odata/sap/ZHR_GW_GOLDEN_BELT_SRV/Fi_Division?token='OwdaDRUyHL1X6RMzcs4jsQteBIkK4m9bfbbLT6vN'&$format=json";
        log.LogInformation(url);        
        //response        = await client.GetAsync(url);
        //client.Timeout = new TimeSpan(0, 0, REQUEST_TIMEOUT_S);
        var byteArray = Encoding.ASCII.GetBytes("USERSIS:25032008");
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(byteArray));
        //client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer",vvauthorization); //
        var response            = await client.GetAsync(url);
        //datacollaborator oDatacollaborator = new datacollaborator();
        //List<datavalue> listdatavalue = new List<datavalue>();
        log.LogInformation(response.ToString());
        //datareturn            = JsonConvert.SerializeObject(json,Formatting.Indented);    
        log.LogInformation(response.StatusCode.ToString()+'-'+HttpStatusCode.OK.ToString());
        if (response.StatusCode == HttpStatusCode.OK) {
            result = response.Content.ReadAsStringAsync().Result;
            dynamic  jsonreq   = JsonConvert.DeserializeObject(result);
            log.LogInformation(result.ToString());

            foreach (var value in jsonreq["d"]["results"]){
                sede sede = new sede();

                sede.codigo = Convert.ToString(value["werks"]);
                sede.descripcion = Convert.ToString(value["txtDescrip"]);

                sedelist.Add(sede);
            }
        }

        jsonrspt = JsonConvert.SerializeObject(sedelist, Formatting.Indented);
    }

    if (vvhttpmethod == "listjobs")
    {
        resp respuesta = new resp();
        List<job> joblist = new List<job>();

        var url = "https://enlacesap.tasa.com.pe/gwp/opu/odata/sap/ZHR_GW_GOLDEN_BELT_SRV/Fi_Funcion?werks='"+sede_code+"'&funcion=''&token='OwdaDRUyHL1X6RMzcs4jsQteBIkK4m9bfbbLT6vN'&$format=json";

        log.LogInformation(url);        
        //response        = await client.GetAsync(url);
        //client.Timeout = new TimeSpan(0, 0, REQUEST_TIMEOUT_S);
        var byteArray = Encoding.ASCII.GetBytes("USERSIS:25032008");
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(byteArray));
        //client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer",vvauthorization); //
        var response            = await client.GetAsync(url);
        //datacollaborator oDatacollaborator = new datacollaborator();
        //List<datavalue> listdatavalue = new List<datavalue>();
        log.LogInformation(response.ToString());
        //datareturn            = JsonConvert.SerializeObject(json,Formatting.Indented);    
        log.LogInformation(response.StatusCode.ToString()+'-'+HttpStatusCode.OK.ToString());
        if (response.StatusCode == HttpStatusCode.OK) {
            result = response.Content.ReadAsStringAsync().Result;
            dynamic  jsonreq   = JsonConvert.DeserializeObject(result);
            log.LogInformation(result.ToString());

            foreach (var value in jsonreq["d"]["results"]){
                job job = new job();

                job.codigo= Convert.ToString(value["Cod_Funcion"]);
                job.sede= Convert.ToString(value["Werks"]);
                job.descripcion= Convert.ToString(value["txtFuncion"]);
                job.codigo_gerencia= Convert.ToString(value["CodGerencia"]);
                job.descripcion_gerencia= Convert.ToString(value["TxtGerencia"]);

                joblist.Add(job);
            }
        }

        jsonrspt = JsonConvert.SerializeObject(joblist, Formatting.Indented);
    }

    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}

public class resp 
{
    public string status {get;set;}
    public string message {get;set;}
}

public class sede 
{
    public string codigo {get;set;}
    public string descripcion {get;set;}
}

public class job
{
    public string codigo {get;set;}
    public string sede {get;set;}
    public string descripcion {get;set;}
    public string codigo_gerencia {get;set;}
    public string descripcion_gerencia {get;set;}
}