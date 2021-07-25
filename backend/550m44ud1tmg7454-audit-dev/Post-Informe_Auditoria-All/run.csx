#r "Newtonsoft.Json"
#load "sqldb_informe_auditoria_all_post.csx"
#load "../Get-Auditoria-All/sqldb_auditoriaall_get.csx"
#load "../Post-Auditoria-All/sqldb_auditoriaall_post.csx"
#load "../Get-Hallazgos-All/sqldb_hallazgosall_get.csx"


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
//PARA LAS TRANSACCIONES
using System.Transactions;
using System.Data;
//PARA LAS TRANSACCIONES

//PARA EL ENVIO DEL CORREO
//static readonly HttpClient httpclient = new HttpClient();

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
    string requestBody = await new StreamReader(req.Body).ReadToEndAsync();

    log.LogInformation("requestBody:" + requestBody);

    // VARIABLE QUE ALMACENA EL ENTORNO DONDE SE EJECUTA (dev - prd)
    string environment = Environment.GetEnvironmentVariable("environment", EnvironmentVariableTarget.Process);
    log.LogInformation("environment -> " + environment);
    // VARIABLE QUE ALMACENA LA URL DEL SISTEMA
    string urlSistema = Environment.GetEnvironmentVariable("urlSistema", EnvironmentVariableTarget.Process);
    log.LogInformation("urlSistema -> " + urlSistema);
    // VARIABLE QUE ALMACENA EL ENTORNO DONDE SE EJECUTA (dev - prd)
    string correosDev = Environment.GetEnvironmentVariable("correosDev", EnvironmentVariableTarget.Process);
    log.LogInformation("correosDev -> " + correosDev);

    dynamic dataobject = JsonConvert.DeserializeObject(requestBody);

    DataInformeAuditoriaAll DataInformeAuditoriaAll = new DataInformeAuditoriaAll();
    informeAuditoriaAll curobj = new informeAuditoriaAll();
    List<Adjuntos> objAdjuntos = new List<Adjuntos>();
    // sql audtoria get
    DataAuditoriaAllGet DataAuditoria = new DataAuditoriaAllGet();
    auditoriaallget auditoria = new auditoriaallget();
    // sql auditoria post
    DataAuditoriaAll vobj_sqldata_auditoria_post = new DataAuditoriaAll();

    int newid = 0;
    int curid = 0;

    if (vvhttpmethod == "post")
    {
        curobj = funsetObject(log, dataobject, vvhttpmethod);
        int resultado = 0;
        int StatusId = 9;
        int InformePdfId = 0;
        System.DateTime nuevaFecha = System.DateTime.Now;
        nuevaFecha = nuevaFecha.AddDays(7);//.ToString("dd-MM-YYYY")

        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        try
        {
            curobj = await DataInformeAuditoriaAll.funPostInformeAuditoria(log ,curobj);
            if (curobj.Id > 0)
            {
                //bool exito = await NotificacionPost.fnPostNotificacionDetalles(notificacion, notificacion.Id);
                //if (exito)
                //Obtenemos los datos de la auditoria
                auditoria = DataAuditoria.funGetAuditoriaAll(log, 0
                                                        , curobj.AuditoriaId
                                                        , ""
                                                    );

                // Cambiamos el status de la auditoria a finalizada
                resultado = vobj_sqldata_auditoria_post.funPutEstatusAuditoria(log, curobj.AuditoriaId, StatusId, curobj.Created_By);

                //Si no hubo error
                if (resultado > 0)
                {
                    // Confirmarmos los adjuntos de la auditoria
                    await DataInformeAuditoriaAll.funPostConfirmarAdjuntos(log, curobj.AuditoriaId);
                    // Guardamos el informe de la auditoria
                    InformePdfId = await DataInformeAuditoriaAll.funPostGuardarInformePdf(log, auditoria, curobj);
                }

                // Listado de adjuntos
                objAdjuntos = await DataInformeAuditoriaAll.funGetAdjuntosInforme(log, curobj.AuditoriaId);

                //Si no hubo error
                if (InformePdfId > 0)
                {
                    //PARA ENVIAR EL CORREO ELECTRONICO
                    string correos = "";
                    int i = 0;
                    foreach (PersonasCorreosAll item in curobj.PersonasCorreos)
                    {
                        /*if (i == 0)
                        {
                            correos = System.Convert.ToString(item.Correo);
                        }
                        else
                        {
                            correos += ", " + System.Convert.ToString(item.Correo);
                        }
                        i++;//*/

                        log.LogInformation("correos::" + item.Correo);
                        // SI environment == dev
                        if( environment == "dev")
                        {
                            // item.Correo = " kllancachahua@visualsat.com, orlyvila@visualsat.com, jmillan@visualsat.com";
                            //item.Correo = correosDev;
                        }
                        log.LogInformation("enviar correo a: " + item.Correo);
                        //log.LogInformation("InformePdf: " + curobj.InformePdf);
                        //CONSTRUCCION DEL EMAIL.
                        //OBJETO PARA LOS DATOS DEL CORREO
                        DataEmailNew oDataEmailUser3 = new DataEmailNew();
                        //DESTINATARIOS DEL CORREO
                        oDataEmailUser3.sendto = item.Correo;
                        log.LogInformation("sendto: " + oDataEmailUser3.sendto);
                        oDataEmailUser3.from = "sigtasa@tasa.com.pe"; //

                        // ASUNTO DEL EMAIL.
                        oDataEmailUser3.emailsubject = "Informe de Auditoria "+ auditoria.DescriptionAuditoria+" - "+ auditoria.Code_Normas + " - " + auditoria.DescriptionSede;

                        //CUERPO DEL CORREO
                        var Bodyuser3 = "<body style='color: #ccc'><table border='0' cellpadding='0' cellspacing='0' style='max-width:100%;width:60%;margin: 0 auto;' id='tablota' ><tbody>";
                        Bodyuser3 = Bodyuser3 + "<tr>";
                        Bodyuser3 = Bodyuser3 + "<td align='center' valign='top'><table border='0' cellpadding='0' cellspacing='0' style='background-color:#fff;border-bottom:1px solid #ccc;font-family:Arial;font-weight:bold;line-height:100%;vertical-align:middle' width='100%'>";
                        Bodyuser3 = Bodyuser3 + "<tbody><tr><td style='padding-bottom: 15px;'><a  href='https://sigtasa.tasa.com.pe/'  target='_blank' title='TasaSsoma'> <img id='logo' alt='TasaSsoma' src='https://sigtasa.tasa.com.pe/images/logoSIGTASA.png' width ='200px' height ='50px'></a></td></tr></tbody></table>";
                        Bodyuser3 = Bodyuser3 + "</td>";
                        Bodyuser3 = Bodyuser3 + "</tr>";
                        Bodyuser3 = Bodyuser3 + "<tr>";
                        Bodyuser3 = Bodyuser3 + "<td align='center'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><td style='background-color:#fff' valign='top'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><td><div style='color:#444 !important;font-family:Arial;font-size:14px;line-height:150%;text-align:left'>";
                        Bodyuser3 = Bodyuser3 + "<p>Estimados saludos cordiales,</p>";
                        Bodyuser3 = Bodyuser3 + "<p>Adjunto el informe de auditor&iacute;a <strong>" + auditoria.DescriptionAuditoria +" "+ auditoria.Code_Normas + " para la planta "+ auditoria.DescriptionSede + "</strong>.</p>";
                        Bodyuser3 = Bodyuser3 + "<p><a href='"+urlSistema+"/view/auditoria/DescargarArchivos/index.html?Id=" + InformePdfId + "&Documento=Informe'> Informe Auditor&iacute;a</a></p>";
                        //Bodyuser3 = Bodyuser3 + "<p><a href='https://sigtasa.tasa.com.pe/view/auditoria/DescargarArchivos/index.html?Id=" + InformePdfId + "&Documento=Informe'> Informe Auditor&iacute;a</a></p>";
                        //Bodyuser3 = Bodyuser3 + "<p><a href='http://localhost/Visualsat/tasassoma/view/auditoria/DescargarArchivos/index.html?Id=" + InformePdfId + "&Documento=Informe'> Informe Auditor&iacute;a</a></p>"; https://sigtasa.tasa.com.pe/view/auditoria/DescargarArchivos/index.html?Id=99&Documento=Plan

                        Bodyuser3 = Bodyuser3 + "<p>Y los documentos:  </p>";
                        foreach (var item2 in objAdjuntos)
                        {
                            Bodyuser3 = Bodyuser3 + "<p> <a href='"+urlSistema+"/view/auditoria/DescargarArchivos/index.html?Id=" + item2.Id + "&Documento=Adjunto'> "+item2.AdjuntoName+"</a>  </p>";
                            //Bodyuser3 = Bodyuser3 + "<p> <a href='http://localhost/Visualsat/tasassoma/view/auditoria/DescargarArchivos/index.html?Id=" + item2.Id + "&Documento=Adjunto'> "+item2.AdjuntoName+"</a>  </p>"; https://sigtasa.tasa.com.pe/
                        }

                        Bodyuser3 = Bodyuser3 + "<p>Agradecer&eacute; su apoyo con el an&aacute;lisis de causa y determinaci&oacute;n de la acci&oacute;n correctiva en el formato SAC SAP "+ auditoria.DescriptionSede + " hasta el "+ nuevaFecha.ToString("dd-MM-yyyy") + " para poder subirlos en el team de calidad.</p>";
                        Bodyuser3 = Bodyuser3 + "<p>Tambi&aacute;n adjunto los enlaces de evaluaci&oacute;n sobre el auditor y el desempeño de la auditor&iacute;a.</p>";
                        foreach (var data in item.LinkEvaluacionAuditores)
                        {
                            //Bodyuser3 = Bodyuser3 + "<p> <a href='http://localhost/tasassomaSP2/tasassoma/evaluacionAuditorMail.html?ListadoEvaluacionId=" + data.ListadoEvaluacionId + "&HashEvaluacionTokens="+ data.HashEvaluacionTokens + "'>Enlace Auditor " + data.NameAuditor + "</a> </p>"; https://sigtasa.tasa.com.pe/
                            //Bodyuser3 = Bodyuser3 + "<p> <a href='https://sigtasa.tasa.com.pe/evaluacionAuditorMail.html?ListadoEvaluacionId=" + data.ListadoEvaluacionId + "&HashEvaluacionTokens="+ data.HashEvaluacionTokens + "'>Enlace Auditor " + data.NameAuditor + "</a> </p>";
                            Bodyuser3 = Bodyuser3 + "<p> <a href='"+urlSistema+"/evaluacionAuditorMail.html?ListadoEvaluacionId=" + data.ListadoEvaluacionId + "&HashEvaluacionTokens="+ data.HashEvaluacionTokens + "'>Enlace Auditor " + data.NameAuditor + "</a> </p>";
                        }

                        Bodyuser3 = Bodyuser3 + "<p>Atte.</p>";
                        Bodyuser3 = Bodyuser3 + "<p>"+ curobj.NombreAuditorLider + "</p>";
                        Bodyuser3 = Bodyuser3 + "<p>"+ curobj.CargoAuditorLider  + "</p>";
                        Bodyuser3 = Bodyuser3 + "<p>"+ curobj.CorreoAuditorLider + "</p>";

                        Bodyuser3 = Bodyuser3 + "</div></td></tr></tbody></table></td></tr></tbody></table></td>";
                        Bodyuser3 = Bodyuser3 + "</tr>";
                        Bodyuser3 = Bodyuser3 + "<tr>";
                        Bodyuser3 = Bodyuser3 + "<td align='center' valign='top'><table border='0' cellpadding='0' cellspacing='0' style='border-top:1px solid #ccc;' width='100%'><tbody><tr><td valign='top'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr>";
                        Bodyuser3 = Bodyuser3 + "<td colspan='2' style='padding-top: 30px;border:0;color:#acacac;font-family:Arial;font-size:12px;line-height:125%;text-align:left' valign='middle'>©2021 TASA. Todos los derechos reservados</td></tr></tbody></table></td></tr></tbody></table></td>";
                        Bodyuser3 = Bodyuser3 + "</tr>";
                        Bodyuser3 = Bodyuser3 + "</tbody></table></body>";
                        //////
                        oDataEmailUser3.bodyhtml = Bodyuser3;

                        // ENVIO DEL EMAIL
                        // //PARA EL ENVIO DEL CORREO
                        //static readonly HttpClient httpclient = new HttpClient();
                        HttpClient httpclient = new HttpClient();
                        var jsonuser3 = JsonConvert.SerializeObject(oDataEmailUser3);
                        var datauser3 = new StringContent(jsonuser3, Encoding.UTF8, "application/json");
                        var urlemail3 = "https://7454em4ils3nder-app.azurewebsites.net/api/VisitasaSendEmail?code=LXQwITmvDAAqXTgaDcBAkmbZXBCv5KnS6bY/XszaOjqHus4M3dbDzw==";
                        httpclient.DefaultRequestHeaders.Add("apikey", "r$3#23516ewew5");
                        var responseuser3 = await httpclient.PostAsync(urlemail3, datauser3);
                        string resultEmail = responseuser3.Content.ReadAsStringAsync().Result;

                        //log.LogInformation("Body3: " + Bodyuser3);
                        log.LogInformation("resultEmail: " + resultEmail);
                        //log.LogInformation("correo: " + correos);
                    }

                    //finalizamos la transaccion
                    scope.Complete();
                }
                else
                {
                    curobj.Id = 0;
                }
            }
        }
        catch (Exception ex)
        {
            log.LogInformation("catch::" + ex.Message);
            curobj.Id = 0;
        }

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
    }

    if (vvhttpmethod == "postAdjuntar")
    {
        string AuditoriaId  = dataobject?.AuditoriaId;
        string Adjunto      = dataobject?.Adjunto;
        string AdjuntoName  = dataobject?.AdjuntoName;
        string Created_By   = dataobject?.Created_By;
        int resultado       = 0;

        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        try
        {
            resultado = await DataInformeAuditoriaAll.funPostAdjuntoAuditoria(log, AuditoriaId, AdjuntoName, Adjunto, Created_By);
            //finalizamos la transaccion
            scope.Complete();
        }
        catch (Exception ex)
        {
            log.LogInformation("catch::" + ex.Message);
            resultado = 0;
        }


        jsonrspt = JsonConvert.SerializeObject(resultado, Formatting.Indented);
    }

    if (vvhttpmethod == "deleteAdjunto")
    {
        int AuditoriaId = dataobject?.AuditoriaId;
        int Id = dataobject?.Id;
        int Opc = dataobject?.Opc;
        int resultado = 0;

        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        try
        {
            resultado = await DataInformeAuditoriaAll.funPostDeleteAdjunto(log, Id, AuditoriaId, Opc);
            //finalizamos la transaccion
            scope.Complete();
        }
        catch (Exception ex)
        {
            log.LogInformation("catch::" + ex.Message);
            resultado = 0;
        }

        jsonrspt = JsonConvert.SerializeObject(resultado, Formatting.Indented);

    }

    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}


public static informeAuditoriaAll funsetObject(ILogger log, dynamic dataobject, string vvmethod)
{
    informeAuditoriaAll curobj = new informeAuditoriaAll();
    List<PersonasCorreosAll> listado = new List<PersonasCorreosAll>();

    if (vvmethod == "post")
    {
        //curobj.Id = dataobject?.Id;
        curobj.AuditoriaId = dataobject?.AuditoriaId;
        curobj.InformePdf = dataobject?.InformePdf;
        curobj.Created_By = dataobject?.Created_By;
        curobj.NombreAuditorLider = dataobject?.NombreAuditorLider;
        curobj.CargoAuditorLider = dataobject?.CargoAuditorLider;
        curobj.CorreoAuditorLider = dataobject?.CorreoAuditorLider;

        foreach (var item in dataobject?.Personas)
        {
            PersonasCorreosAll personas = new PersonasCorreosAll();
            personas.UserIdHash = item.UserIdHash;
            personas.Name = item.Name;
            personas.Cargo = item.Cargo;
            personas.Correo = item.Correo;

            listado.Add(personas);
        }//*/
        curobj.PersonasCorreos = listado;
    }

    return curobj;
}
