#r "Newtonsoft.Json"
#load "sqldb_lista_envio_all_post.csx"

using System;
using System.Globalization;
using System.Net;
using System.Net.Http;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System.Configuration;
using System.Collections;
using System.Text;
using System.IO;
using System.Transactions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Microsoft.Azure.WebJobs;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

static readonly HttpClient httpclient = new HttpClient();

public static async Task<IActionResult> Run(HttpRequest req, ILogger log)
{
	log.LogInformation("C# HTTP trigger function processed a request. RUN Post-List_Envio-All");

	var requestHeader           = req.Headers;
    var vvapikeysecure          = Environment.GetEnvironmentVariable("apikey",EnvironmentVariableTarget.Process);
    string vvapiKeyparameter    = requestHeader["apiKey"];
    string vvhttpmethod         = req.Query["httpmethod"];

    string jsonrspt     = "";

    //Evaluar Clave API
    if(vvapikeysecure != vvapiKeyparameter )
    {
        vvhttpmethod="";
        jsonrspt="{}";
    }

    /*START - Parametros de Lectura*/
    // VARIABLE QUE ALMACENA LA URL DEL SISTEMA
    string urlSistema   = Environment.GetEnvironmentVariable("urlSistema", EnvironmentVariableTarget.Process);
    log.LogInformation("urlSistema -> " + urlSistema);
    // VARIABLE QUE ALMACENA EL ENTORNO DONDE SE EJECUTA (dev - prd)
    string environment = Environment.GetEnvironmentVariable("environment", EnvironmentVariableTarget.Process);
    log.LogInformation("environment -> " + environment);
    // VARIABLE QUE ALMACENA EL ENTORNO DONDE SE EJECUTA (dev - prd)
    string correosDev = Environment.GetEnvironmentVariable("correosDev", EnvironmentVariableTarget.Process);
    log.LogInformation("correosDev -> " + correosDev);

    string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
    log.LogInformation("requestBody:" + requestBody);
    /*END   - Parametros de Lectura*/
    dynamic dataobject = JsonConvert.DeserializeObject(requestBody);
    string PlanPdf              = dataobject?.PlanPdf;
    string CodeNormas           = dataobject?.CodeNormas;
    string CargoAuditorLider    = dataobject?.CargoAuditorLider;
    string NombreAuditorLider   = dataobject?.NombreAuditorLider;
    string TipoAuditoria        = dataobject?.TipoAuditoria;
    string SedeAuditoria        = dataobject?.SedeAuditoria;
    string FechaInicioE         = dataobject?.FechaInicioE;
    string FechaFinE            = dataobject?.FechaFinE;
    string CorreoAuditorLider   = dataobject?.CorreoAuditorLider;

    log.LogInformation("PlanPdf:" + PlanPdf);
    DataListaEnvioAll vobj_sqldata = new DataListaEnvioAll();
    List<ListaEnvioAll> lista = new List<ListaEnvioAll>();
    long newid = 0;
    long resultado = 0;

    //Invocar INSERT
    if (vvhttpmethod == "post")
    {
        log.LogInformation("Entro a post:");
        // paso los datos recibidos a una lista de objetos
        ListaEnvioAll curobj = new ListaEnvioAll();
        lista = funsetObject(log, dataobject.Personas, vvhttpmethod);
        log.LogInformation("Lista: " + lista);


        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        try
        {
            vobj_sqldata.funDeletedListaEnvioAll(log, lista[0]);
                resultado = await vobj_sqldata.funGuardarPlanAuditoriaPDF(log, PlanPdf, lista[0]);

                string correos = "";
                int i = 0;

                foreach (ListaEnvioAll item in lista)
                {
                    Task<long> curobjtask = vobj_sqldata.funPostListaEnvioAll(log, item, PlanPdf);
                    curobjtask.Wait();
                    newid = (long)curobjtask.Result;
                    item.Id = newid;//*/
                    item.Persona_Cargo = PlanPdf;
                    item.Persona_Name = SedeAuditoria;
                    log.LogInformation("Entro foreach: " + newid);
                    log.LogInformation("Entro foreach: " + item);
                    if (newid > 0)  //Enviamos el PlanPdf
                    {
                        if (i == 0)
                        {
                            correos = System.Convert.ToString(item.Persona_Correo);
                        }
                        else
                        {
                            correos += ", " + System.Convert.ToString(item.Persona_Correo);
                        }
                        i++;
                    }
                }
                log.LogInformation("correos: " + correos);
                // SI environment == dev
                if( environment == "dev")
                {
                    //correos = "millanqjesus@gmail.com";
                    //correos = "kllancachahua@visualsat.com, orlyvila@visualsat.com, jmillan@visualsat.com";
                    //correos = correosDev;
                }
                log.LogInformation("enviar correos a: " + correos);
                log.LogInformation("PlanPdf: " + PlanPdf);
                DataEmailNew oDataEmailUser3 = new DataEmailNew();
                //oDataEmailUser3.sendto = System.Convert.ToString(item.Persona_Correo); //"millanqjesus@gmail.com";//person.email;//
                oDataEmailUser3.sendto = correos;
                oDataEmailUser3.from = "sigtasa@tasa.com.pe"; //
                oDataEmailUser3.emailsubject = "Plan de Auditoria "+ TipoAuditoria+" "+ CodeNormas+" "+ SedeAuditoria;//

                //////////
                var Bodyuser3 = "<body style='color: #ccc'><table border='0' cellpadding='0' cellspacing='0' style='max-width:100%;width:60%;margin: 0 auto;' id='tablota' ><tbody>";
                Bodyuser3 = Bodyuser3 + "<tr>";
                Bodyuser3 = Bodyuser3 + "<td align='center' valign='top'><table border='0' cellpadding='0' cellspacing='0' style='background-color:#fff;border-bottom:1px solid #ccc;font-family:Arial;font-weight:bold;line-height:100%;vertical-align:middle' width='100%'>";
                Bodyuser3 = Bodyuser3 + "<tbody><tr><td style='padding-bottom: 15px;'><a  href='https://sigtasa.tasa.com.pe/'  target='_blank' title='TasaSsoma'> <img id='logo' alt='tasassoma' src='https://sigtasa.tasa.com.pe/images/logoSIGTASA.png' width ='200px' height ='50px'></a></td></tr></tbody></table>";
                Bodyuser3 = Bodyuser3 + "</td>";
                Bodyuser3 = Bodyuser3 + "</tr>";
                Bodyuser3 = Bodyuser3 + "<tr>";
                Bodyuser3 = Bodyuser3 + "<td align='center'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><td style='background-color:#fff' valign='top'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><td><div style='color:#444 !important;font-family:Arial;font-size:14px;line-height:150%;text-align:left'>";
                Bodyuser3 = Bodyuser3 + "<p>Estimados Saludos Cordiales:</p>";
                Bodyuser3 = Bodyuser3 + "<p>Se adjunta el plan de auditor&iacute;a <strong>" + TipoAuditoria + "</strong>.</p><p> correspondiente a la revisi&oacute;n de la(s) norma(s) "+ CodeNormas + ",</p>";
                Bodyuser3 = Bodyuser3 + "<p>para ser aplicado en la planta <strong>" + SedeAuditoria + " </strong></p>";
                Bodyuser3 = Bodyuser3 + "<p>los d&iacute;as </strong>"+ FechaInicioE + "</strong> al "+ FechaFinE + " </p>";
                Bodyuser3 = Bodyuser3 + "<p>Por motivos de aforo se esta agendando en el teams la reuni&oacute;n de apertura y cierre de la presente auditor&iacute;a. </p>";
                Bodyuser3 = Bodyuser3 + "<p>Atte.</p>";
                Bodyuser3 = Bodyuser3 + "<p>"+ NombreAuditorLider + "</p>";
                Bodyuser3 = Bodyuser3 + "<p>"+ CargoAuditorLider + "</p>";
                Bodyuser3 = Bodyuser3 + "<p>" + CorreoAuditorLider + "</p>";
                Bodyuser3 = Bodyuser3 + "<p> <a href='"+urlSistema+"/view/auditoria/DescargarArchivos/index.html?Id=" + lista[0].PlanAuditoriaId + "&Documento=Plan'>Plan Auditoria</a>  </p>";
                //Bodyuser3 = Bodyuser3 + "<p> <a href='https://sigtasa.tasa.com.pe/view/auditoria/DescargarArchivos/index.html?Id=" + lista[0].PlanAuditoriaId + "&Documento=Plan'>Plan Auditoria</a>  </p>";
                //Bodyuser3 = Bodyuser3 + "<p> <a href='http://localhost/Visualsat/tasassoma/view/auditoria/DescargarArchivos/index.html?Id=" + lista[0].PlanAuditoriaId + "&Documento=Plan'>Plan Auditoria</a>  </p>"; https://sigtasa.tasa.com.pe/view/auditoria/DescargarArchivos/index.html?Id=99&Documento=Plan

                Bodyuser3 = Bodyuser3 + "</div></td></tr></tbody></table></td></tr></tbody></table></td>";
                Bodyuser3 = Bodyuser3 + "</tr>";
                Bodyuser3 = Bodyuser3 + "<tr>";
                Bodyuser3 = Bodyuser3 + "<td align='center' valign='top'><table border='0' cellpadding='0' cellspacing='0' style='border-top:1px solid #ccc;' width='100%'><tbody><tr><td valign='top'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr>";
                Bodyuser3 = Bodyuser3 + "<td colspan='2' style='padding-top: 30px;border:0;color:#acacac;font-family:Arial;font-size:12px;line-height:125%;text-align:left' valign='middle'>©2021 TASA. Todos los derechos reservados</td></tr></tbody></table></td></tr></tbody></table></td>";
                Bodyuser3 = Bodyuser3 + "</tr>";
                Bodyuser3 = Bodyuser3 + "</tbody></table></body>";
                //////////

                oDataEmailUser3.bodyhtml = Bodyuser3;
                var jsonuser3 = JsonConvert.SerializeObject(oDataEmailUser3);
                var datauser3 = new StringContent(jsonuser3, Encoding.UTF8, "application/json");
                var urlemail3 = "https://7454em4ils3nder-app.azurewebsites.net/api/VisitasaSendEmail?code=LXQwITmvDAAqXTgaDcBAkmbZXBCv5KnS6bY/XszaOjqHus4M3dbDzw==";
                httpclient.DefaultRequestHeaders.Add("apikey", "r$3#23516ewew5");
                var responseuser3 = await httpclient.PostAsync(urlemail3, datauser3);
                string resultEmail = responseuser3.Content.ReadAsStringAsync().Result;

                log.LogInformation("PlanPdf: " + Bodyuser3);
                log.LogInformation("PlanPdf: " + resultEmail);

                scope.Complete();
        }
        catch (Exception ex)
        {
            log.LogInformation("catch::" + ex.Message);
            lista[0].Id=0;
        }

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(lista, Formatting.Indented);
        //jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
    }

    if (vvhttpmethod == "postPrueba")
    {
        //string Url = vobj_sqldata.funGuardarPdfListaEnvioAll(log, PlanPdf, lista[0]);
        string serverpath = @"https://formatosssoma.blob.core.windows.net/planauditoria/";

        string base64BinaryStr = PlanPdf;
        byte[] bytes = Convert.FromBase64String(base64BinaryStr);

        string filePath = serverpath + "Prueba.pdf";

        if (File.Exists(filePath))
            File.Delete(filePath);

        FileStream stream = new FileStream(filePath, FileMode.CreateNew);
        BinaryWriter writer = new BinaryWriter(stream);
        writer.Write(bytes, 0, bytes.Length);
        writer.Close();
    }

    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}

public static List<ListaEnvioAll> funsetObject(ILogger log, dynamic dataobject, string vvmethod)
{
    List<ListaEnvioAll> lista = new List<ListaEnvioAll>();

    foreach (var item in dataobject)
    {
    	var curobj 			   = new ListaEnvioAll();
    	curobj.Id 		 	   = 0;
    	curobj.UserIdHash 	   = item?.UserIdHash;
    	curobj.Persona_Name    = item?.Persona_Name;
    	curobj.Persona_Cargo   = item?.Persona_Cargo;
    	curobj.Persona_Correo  = item?.Persona_Correo;
    	curobj.PlanAuditoriaId = item?.PlanAuditoriaId;

    	if (vvmethod == "post"){
            curobj.Send_By   = item?.Created_By;
            curobj.Send_Date = System.DateTime.Now;
        }

        lista.Add(curobj);
    }
    return lista;
}