#r "Newtonsoft.Json"
#load "sqldb_auditorall_post.csx"


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

//PARA EL ENVIO DEL CORREO
using Microsoft.Azure.WebJobs;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
//PARA EL ENVIO DEL CORREO

public static async Task<IActionResult> Run(HttpRequest req, ILogger log)
{
    log.LogInformation("C# HTTP trigger function processed a request.");

    var requestHeader = req.Headers;
    var vvapikeysecure = Environment.GetEnvironmentVariable("apikey", EnvironmentVariableTarget.Process);
    string vvapiKeyparameter = requestHeader["apiKey"];

    string jsonrspt = "";
    string name = req.Query["name"];
    string vvhttpmethod = req.Query["httpmethod"];

    // VARIABLE QUE ALMACENA EL ENTORNO DONDE SE EJECUTA (dev - prd)
    string environment = Environment.GetEnvironmentVariable("environment", EnvironmentVariableTarget.Process);
    log.LogInformation("environment -> " + environment);
    // VARIABLE QUE ALMACENA LA URL DEL SISTEMA
    string urlSistema = Environment.GetEnvironmentVariable("urlSistema", EnvironmentVariableTarget.Process);
    log.LogInformation("urlSistema -> " + urlSistema);
    // VARIABLE QUE ALMACENA EL ENTORNO DONDE SE EJECUTA (dev - prd)
    string correosDev = Environment.GetEnvironmentVariable("correosDev", EnvironmentVariableTarget.Process);
    log.LogInformation("correosDev -> " + correosDev);


    //Evaluar Clave API
    if (vvapikeysecure != vvapiKeyparameter)
    {
        vvhttpmethod = "";
        jsonrspt = "{}";
    }

    /*START - Parametros de Lectura*/

    // string apiKey = requestHeader.GetValues("apiKey").First();

    string requestBody = await new StreamReader(req.Body).ReadToEndAsync();

    log.LogInformation("requestBody:" + requestBody);

    dynamic dataobject = JsonConvert.DeserializeObject(requestBody);

    DataAuditorAll vobj_sqldata = new DataAuditorAll();
    List<AuditoriaAuditorAll> lista = new List<AuditoriaAuditorAll>();
    int newid = 0;

    //Invocar INSERT
    if (vvhttpmethod == "post")
    {
        lista = funsetObject(log, dataobject, vvhttpmethod);

        vobj_sqldata.funDeletedAuditorAll(log, lista[0]);

        foreach (AuditoriaAuditorAll item in lista)
        {

            Task<int> curobjtask = vobj_sqldata.funPostAuditorAll(log, item);
            curobjtask.Wait();
            newid = (int)curobjtask.Result;
            item.Id = newid;
        }

        // enviar notificacion por correo
        enviarNotificaciones(log, lista, environment, urlSistema);


        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(lista, Formatting.Indented);
    }


    ////Invocar PUT
    //if (vvhttpmethod == "put")
    //{
    //    curid = System.Convert.ToInt32(req.Query["Id"]);
    //    curobj = funsetObject(log, dataobject, vvhttpmethod);
    //    curobj = vobj_sqldata.funPutAuditorAll(log, curid, curobj);
    //    curobj.Id = curid;
    //    //Conversion de Respuestas a JSON
    //    jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
    //}

    ////Invocar DELETE
    //if (vvhttpmethod == "delete")
    //{

    //    curid = System.Convert.ToInt32(req.Query["Id"]);
    //    long nrorows = vobj_sqldata.funDeleteAuditorAll(log, curid);

    //    //Conversion de Respuestas a JSON
    //    jsonrspt = JsonConvert.SerializeObject(nrorows, Formatting.Indented);
    //}

    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");

}



public static List<AuditoriaAuditorAll> funsetObject(ILogger log, dynamic dataobject, string vvmethod)
{
    List<AuditoriaAuditorAll> lista = new List<AuditoriaAuditorAll>();
    foreach (var item in dataobject)
    {
        long vvAuditoriaId         = item?.AuditoriaId;
        int vvAuditorId            = item?.AuditorId;
        string vvcreate_by         = item?.Create_By;
        int vnactive               = item?.Active;
        int vntipo                 = item?.Tipo;
        string vvName              = item?.Name;
        string vvCorreo            = item?.Correo;
        string vvProgramaAuditoria = item?.ProgramaAuditoria;
        string vvAuditoriaCode     = item?.AuditoriaCode;
        string vvTipoAuditoria     = item?.TipoAuditoria;
        string vvUnidadNegocio     = item?.UnidadNegocio;
        string vvSede              = item?.Sede;
        string vvNormas            = item?.Normas;
        string vvInicio            = item?.Inicio;
        string vvFin               = item?.Fin;
        string vvUser              = item?.User;
        string vvJob               = item?.Job;
        string vvEmail             = item?.Email;

        var curobj               = new AuditoriaAuditorAll();
        curobj.AuditoriaId       = vvAuditoriaId;
        curobj.AuditorId         = vvAuditorId;
        curobj.Active            = vnactive;
        curobj.Tipo              = vntipo;
        curobj.Name              = vvName;
        curobj.Correo            = vvCorreo;
        curobj.ProgramaAuditoria = vvProgramaAuditoria;
        curobj.AuditoriaCode     = vvAuditoriaCode;
        curobj.TipoAuditoria     = vvTipoAuditoria;
        curobj.UnidadNegocio     = vvUnidadNegocio;
        curobj.Sede              = vvSede;
        curobj.Normas            = vvNormas;
        curobj.Inicio            = vvInicio;
        curobj.Fin               = vvFin;
        curobj.User              = vvUser;
        curobj.Job               = vvJob;
        curobj.Email             = vvEmail;

        if (vvmethod == "post" || vvmethod == "put")
        {
            curobj.Create_By   = vvcreate_by;
            curobj.Create_Date = System.DateTime.Now;
        }

        lista.Add(curobj);

        log.LogInformation("curobj.Name: " + curobj.Name);
        log.LogInformation("curobj.Correo: " + curobj.Correo);
    }

    return lista;
}


/**
 * Funcion para enviar las notificaciones cuando se asigna un equipo auditor.
 */
//public static void enviarNotificaciones(ILogger log, List<AuditoriaAuditorAll> Lista, string environment, string urlSistema)
public static async void enviarNotificaciones(ILogger log, List<AuditoriaAuditorAll> Lista, string environment, string urlSistema )
{
    // VARIABLE QUE ALMACENA EL ENTORNO DONDE SE EJECUTA (dev - prd)
    string correosDev = Environment.GetEnvironmentVariable("correosDev", EnvironmentVariableTarget.Process);
    log.LogInformation("correosDev -> " + correosDev);

    log.LogInformation("en enviarNotificaciones. " + urlSistema);
    log.LogInformation("Lista[0].ProgramaAuditoria -> " + Lista[0].ProgramaAuditoria);
    log.LogInformation("Lista[0].AuditoriaCode     -> " + Lista[0].AuditoriaCode);
    log.LogInformation("Lista[0].TipoAuditoria     -> " + Lista[0].TipoAuditoria);
    log.LogInformation("Lista[0].UnidadNegocio     -> " + Lista[0].UnidadNegocio);
    log.LogInformation("Lista[0].Sede              -> " + Lista[0].Sede);
    log.LogInformation("Lista[0].Normas            -> " + Lista[0].Normas);
    log.LogInformation("Lista[0].Inicio            -> " + Lista[0].Inicio);
    log.LogInformation("Lista[0].Fin               -> " + Lista[0].Fin);

    string correos        = "";
    string auditorLider   = "";
    string auditores      = "";
    string observadores   = "";
    int i                 = 0;
    int countLider        = 0;
    int countAuditores    = 0;
    int countObservadores = 0;

    foreach(AuditoriaAuditorAll item in Lista )
    {
        if( item.Tipo == 1 )
        {
            auditorLider = item.Name;
            countLider++;
        }
        if( item.Tipo == 2 )
        {
            if( countAuditores == 0 )
            {
                auditores = item.Name;
            }
            else
            {
                auditores += ", " + item.Name;
            }
            countAuditores++;
        }
        if( item.Tipo == 3 )
        {
            if( countObservadores == 0 )
            {
                observadores = item.Name;
            }
            else
            {
                observadores += ", " + item.Name;
            }
            countObservadores++;
        }
        log.LogInformation("item.Correo -> " + item.Correo);
        // VERIFICAMOS QUE TENGA CORREO
        if(item.Correo != "")
        {
            // SI ES EL PRIMER CORREO DE LA LISTA
            if( i==0 )
            {
                correos = item.Correo;
            }
            else
            {
                correos += ", " + item.Correo;
            }
            i++;
        }
    }

    log.LogInformation("auditorLider: " + auditorLider);
    log.LogInformation("auditores: " + auditores);
    log.LogInformation("observadores: " + observadores);
    log.LogInformation("correos: " + correos);
    // SI environment == dev
    if( environment == "dev")
    {
        //correos = correosDev;
        //correos = "kllancachahua@visualsat.com, orlyvila@visualsat.com";
    }
    log.LogInformation("enviar correo a: " + correos);

    //// crear correo a enviar
    DataEmailNew oDataEmail = new DataEmailNew();
    oDataEmail.sendto       = correos;

    // ASUNTO DEL EMAIL
    oDataEmail.emailsubject = "Asignación de equipo auditor";

    // CUERPO DEL EMAIL
    var bodyEmail = "<p></p>";

    bodyEmail += "<table border='0' style='margin: 0 auto;' width='80%' bgcolor='#ffffff' cellspacing='5' cellpadding='5' >";
    bodyEmail += "<tbody>";

    bodyEmail += "<tr>";
    bodyEmail += "<td colspan='4' style='background-color:#fff;border-bottom:1px solid #ccc;font-family:Arial;font-weight:bold;line-height:100%;vertical-align:middle' width='100%' align='left' height='100'> <img src='https://sigtasa.tasa.com.pe/images/logoSIGTASA.png' width ='200px' height ='50px' alt='SIGTASA'> </td>";
    bodyEmail += "</tr>";

    bodyEmail += "";
    bodyEmail += "<tr><td colspan='4' align='center' height='100'><div style='text-align:left'>";

    bodyEmail += "<p>Estimado saludos cordiales:</p>";
    bodyEmail += "<p>Se le informa que forma parte del equipo auditor de la auditoría: <b>"+ Lista[0].TipoAuditoria +"</b>, código: <b>"+ Lista[0].AuditoriaCode +"</b>, correspondiente a la revisión de las normas: <b>"+ Lista[0].Normas +"</b>, que sera ejecutada en la planta <b>"+ Lista[0].Sede +"</b>, los días <b>"+ Lista[0].Inicio +" al "+ Lista[0].Fin +"</b>.</p>";

    bodyEmail += "</div></td></tr>";

    // AUDITOR LIDER
    bodyEmail += "<tr>";
    //bodyEmail += "<td height='100'><div style='text-align:left'>";
    //bodyEmail += "<p> <b>Auditor Líder:</b> </p></div>";
    bodyEmail += "<td colspan='4' border='1' align='center' height='10'><div style='text-align:left'>";
    bodyEmail += "<p> <b>Auditor Líder:</b> "+ auditorLider +"</p>";
    bodyEmail += "</div></td></tr> ";
    // AUDITORES
    bodyEmail += "<tr>";
    //bodyEmail += "<td style='text-align:left' height='100'><div>";
    //bodyEmail += "<p> <b>Auditores:</b> </p></div>";
    bodyEmail += "<td colspan='4' align='center' height='10'><div style='text-align:left'>";
    bodyEmail += "<p> <b>Auditores:</b> "+ auditores +"</p>";
    bodyEmail += "</div></td></tr> ";
    // OBSERVADORES
    bodyEmail += "<tr>";
    //bodyEmail += "<td align='center' style='text-align:left' height='100'><div >";
    //bodyEmail += "<p> <b>Observadores:</b> </p></div>";
    bodyEmail += "<td colspan='4' align='center' height='10'><div style='text-align:left'>";
    bodyEmail += "<p> <b>Observadores:</b> "+ observadores +"</p>";
    bodyEmail += "</div></td></tr> ";


    bodyEmail += "<tr><td colspan='4' style='text-align:left; valign='middle' height='10'>";

    bodyEmail += "<p>Para su atenci&oacute;n adjunto el acceso al sistema:</p>";
    bodyEmail += "<p><a href='"+urlSistema+"'>"+urlSistema+"</a></p></td></tr>";

    bodyEmail += "<p>Atte.</p>";
    bodyEmail += "<p>" + Lista[0].User + "</p>";
    bodyEmail += "<p>" + Lista[0].Job + "</p>";
    bodyEmail += "<p>" + Lista[0].Email + "</p>";

    bodyEmail += "<tr> <td colspan='4' style='padding-top: 30px; border:0; color:#acacac; font-family:Arial; font-size:12px; line-height:125%; text-align:left' valign='middle'>©2021 TASA. Todos los derechos reservados</td></tr>";

    bodyEmail += "</div></td></tr></tbody></table> ";

    log.LogInformation("bodyEmail: " + bodyEmail);

    oDataEmail.bodyhtml = bodyEmail;

    HttpClient httpclient = new HttpClient();

    var jsonuser3 = JsonConvert.SerializeObject(oDataEmail);

    var datauser3 = new StringContent(jsonuser3, Encoding.UTF8, "application/json");

    var urlemail3 = "https://7454em4ils3nder-app.azurewebsites.net/api/VisitasaSendEmail?code=LXQwITmvDAAqXTgaDcBAkmbZXBCv5KnS6bY/XszaOjqHus4M3dbDzw==";

    httpclient.DefaultRequestHeaders.Add("apikey", "r$3#23516ewew5");

    log.LogInformation(" Esperamos Respuesta Del Envío Del Correo.");
    log.LogInformation(" oDataEmail.sendto -> "+oDataEmail.sendto);
    var responseuser3 = await httpclient.PostAsync(urlemail3, datauser3);

    string resultEmail = responseuser3.Content.ReadAsStringAsync().Result;

    //log.LogInformation("jsonuser3 " + jsonuser3);
    log.LogInformation("resultEmail " + resultEmail);

}
