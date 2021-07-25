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
    log.LogInformation("Vencimiento automatico de los hallazgos pasados 15 dias...");
    log.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}");
    //var url                     = "https://550m44ud1tmg7454-audit-dev.azurewebsites.net/api/Post-Hallazgos-All?code=CVNpmUeJgbarMkxynabne1CGLBm0gXH9mrEV6a2vuc2BvQgc4hDvbg==&httpmethod=VencerHallazgosAuto";

    // VARIABLE QUE ALMACENA LA URL DEL BACK
    string apiURL = Environment.GetEnvironmentVariable("apiURL", EnvironmentVariableTarget.Process);

    httpclient.DefaultRequestHeaders.Add("apiKey", "r$3#23516ewew5");

    var url      = apiURL + "/api/Post-Hallazgos-All?code=CVNpmUeJgbarMkxynabne1CGLBm0gXH9mrEV6a2vuc2BvQgc4hDvbg==&httpmethod=VencerHallazgosAuto";
    log.LogInformation( "url -> " + url );

    var response = await httpclient.GetAsync(url);
    log.LogInformation("response -> " + response);

    /**
     * Aqui buscamos los planes de acciones correctivas vencidos para modificar el statusPAC
     * @type {String}
     */
    var url2      = apiURL + "/api/Get-SeguimientosAC-All?code=hMnenbGS3bKHTujp8F99a4M2XJDtTd0pim987p02bpwnbNUlbYk/aw==&httpmethod=searchExpiredShares";
    log.LogInformation( "url2 -> " + url2 );
    // var url2   = "https://550m44ud1tmg7454-audit-dev.azurewebsites.net/api/Get-SeguimientosAC-All?code=hMnenbGS3bKHTujp8F99a4M2XJDtTd0pim987p02bpwnbNUlbYk/aw==&httpmethod=searchExpiredShares";

    // log.LogInformation("url2 -> " + url2);
    // //httpclient.DefaultRequestHeaders.Add("apiKey", "r$3#23516ewew5");
    var response2 = await httpclient.GetAsync(url2);
    log.LogInformation("response2 -> " + response2); //*/

    //NotificarHallazgosPendientes
    /**
     * Aqui buscamos LOS HALLAGOS EN ATENCION PARA ENVIAR NOTIFICACION
     * @type {String}
     */
    var url3      = apiURL + "/api/Post-Hallazgos-All?code=CVNpmUeJgbarMkxynabne1CGLBm0gXH9mrEV6a2vuc2BvQgc4hDvbg==&httpmethod=NotificarHallazgosPendientes";
    log.LogInformation( "url3 -> " + url3 );

    var response3 = await httpclient.GetAsync(url3);
    log.LogInformation("response3 -> " + response3); //*/

    log.LogInformation( "Final...");
}