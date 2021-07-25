#r "Newtonsoft.Json"
#load "sqldb_post.csx"

using System;
using System.Globalization;
using System.Net;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System.Configuration;
using System.Collections;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using System.Security.Cryptography;
using System.Text;
//PARA EL ENVIO DEL CORREO
using Microsoft.Azure.WebJobs;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
//PARA EL ENVIO DEL CORREO
//PARA LAS TRANSACCIONES
using System.Transactions;
using System.Data;
//PARA LAS TRANSACCIONES
//PARA OPERACION CON ARRAYS
using System.Linq;
//PARA OPERACION CON ARRAYS



public static async Task<IActionResult> Run(HttpRequest req, ILogger log)
{
    log.LogInformation("La función de activación HTTP de C# procesó una solicitud.");

    var requestHeader           = req.Headers;
    var vvapikeysecure          = Environment.GetEnvironmentVariable("apikey",EnvironmentVariableTarget.Process);
    string vvapiKeyparameter    = requestHeader["apiKey"];
    string vvhttpmethod         = req.Query["httpmethod"];

    string jsonrspt = "";
    //Evaluar Clave API
    if(vvapikeysecure != vvapiKeyparameter )
    {
        vvhttpmethod    = "";
        jsonrspt        = "{}";
    }

    /*START - Parametros de Lectura*/
    //long FuenteId       = req.Query["FuenteId"] == "" ? 0 : System.Convert.ToInt64(req.Query["FuenteId"]);
    string requestBody = await new StreamReader(req.Body).ReadToEndAsync();

    // VARIABLE QUE ALMACENA LA URL A DONDE SE VA A DESCARGAR EL INFORME OP
    string url          = Environment.GetEnvironmentVariable("apiURL", EnvironmentVariableTarget.Process);
    string urlSistema   = Environment.GetEnvironmentVariable("urlSistema", EnvironmentVariableTarget.Process);
    log.LogInformation("urlback -> " + url);
    log.LogInformation("urlSistema -> " + urlSistema);

    // VARIABLE QUE ALMACENA EL ENTORNO DONDE SE EJECUTA (dev - prd)
    string environment = Environment.GetEnvironmentVariable("environment", EnvironmentVariableTarget.Process);
    log.LogInformation("environment -> " + environment);

    // VARIABLE QUE ALMACENA EL ENTORNO DONDE SE EJECUTA (dev - prd)
    string correosDev = Environment.GetEnvironmentVariable("correosDev", EnvironmentVariableTarget.Process);
    log.LogInformation("correosDev -> " + correosDev);

    log.LogInformation("requestBody:" + requestBody);

    dynamic dataobject = JsonConvert.DeserializeObject(requestBody);

    EvidenciaPost curobj;

    ReprogramacionPost curobjReprogramacion;

    DataSeguimientoPost vobj_sqldata = new DataSeguimientoPost();

    //Metodo:  post
    if (vvhttpmethod == "post")
    {
        log.LogInformation("En vvhttpmethod == post.");

        curobj = funsetObjectEvidencia(log, dataobject, vvhttpmethod);

        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        try
        {
            log.LogInformation("En try");
            curobj = await vobj_sqldata.funPostSeguimientoEvidencia(log, curobj);

            if(curobj.Id > 0)
            {
                log.LogInformation("En curobj.Id > 0, curobj.Id -> "+curobj.Id);

                DataNotificacion curentity;
                //DataSeguimientoPost vobj_sqldata = new DataSeguimientoPost();

                curentity = await vobj_sqldata.funGetDataNotificacion( log
                                                                    ,curobj.HAPlanAccionesId
                                                                  );

                //finalizamos la transaccion
                scope.Complete();
                log.LogInformation("Despues de scope.Complete()." );

                notificarEvidencia(log, urlSistema, curentity, 1, environment);

            }
        }
        catch (Exception ex)
        {
            curobj.Id      = 0;
            curobj.Adjunto = System.Convert.ToString(ex.Message);
            log.LogInformation("Catch :: " + ex.Message);
        }

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);

    }

    //Metodo:  put
    if (vvhttpmethod == "put")
    {
        log.LogInformation("En vvhttpmethod == put.");

        curobj = funsetObjectEvidencia(log, dataobject, vvhttpmethod);

        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        try
        {
            int resultado = 0;
            log.LogInformation("En try");
            resultado = await vobj_sqldata.funPutSeguimientoEvidencia(log, curobj);

            if(resultado > 0)
            {
                log.LogInformation("En resultado > 0, resultado -> "+resultado);

                //finalizamos la transaccion
                scope.Complete();
                log.LogInformation("Despues de scope.Complete()." );
            }
            else
            {
                curobj.Id      = 0;
                curobj.Adjunto = "No se Pudo Actualizar el Registro.";
                log.LogInformation("No se Pudo Actualizar el Registro.");
            }
        }
        catch (Exception ex)
        {
            curobj.Id      = 0;
            curobj.Adjunto = System.Convert.ToString(ex.Message);
            log.LogInformation("Catch :: " + ex.Message);
        }

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);

    }

    //Metodo:  EvaluarEvidencia
    if (vvhttpmethod == "EvaluarEvidencia")
    {
        log.LogInformation("En vvhttpmethod == EvaluarEvidencia.");

        curobj = funsetObjectEvidencia(log, dataobject, vvhttpmethod);

        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        try
        {
            log.LogInformation("En try");
            int resultado = 0;

            resultado = await vobj_sqldata.funEvaluarEvidencia(log, curobj);

            if(resultado > 0)
            {
                log.LogInformation("En resultado > 0, resultado -> "+resultado);

                DataNotificacion curentity;

                log.LogInformation("curobj.TipoEvaluacion==2 ");
                //DataSeguimientoPost vobj_sqldata = new DataSeguimientoPost();

                curentity = await vobj_sqldata.funGetDataNotificacion( log
                                                                       ,curobj.HAPlanAccionesId
                                                                     );


                //finalizamos la transaccion
                scope.Complete();
                log.LogInformation("Despues de scope.Complete()." );


                notificarEvidencia(log, urlSistema, curentity, 2, environment);

            }
        }
        catch (Exception ex)
        {
            curobj.Id      = 0;
            curobj.Adjunto = System.Convert.ToString(ex.Message);
            log.LogInformation("Catch :: " + ex.Message);
        }

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);

    }

    //Metodo:  reprogramacionPlan
    if (vvhttpmethod == "reprogramacionPlan")
    {
        log.LogInformation("En vvhttpmethod == reprogramacionPlan.");

        curobjReprogramacion = funsetObjectReprogramacion(log, dataobject, vvhttpmethod);

        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        try
        {
            long resultado = 0;
            log.LogInformation("En try");
            resultado = await vobj_sqldata.funPostReprogramacion(log, curobjReprogramacion);

            if(resultado > 0)
            {
                log.LogInformation("En resultado > 0, resultado -> "+resultado);
                curobjReprogramacion.Id = resultado;
                //finalizamos la transaccion
                scope.Complete();
                log.LogInformation("Despues de scope.Complete()." );
            }
            else
            {
                curobjReprogramacion.Id      = 0;
                curobjReprogramacion.Adjunto = "No se Pudo Guardar la reprogramacion.";
                log.LogInformation("No se Pudo Guardar la reprogramacion.");
            }
        }
        catch (Exception ex)
        {
            curobjReprogramacion.Id      = 0;
            curobjReprogramacion.Adjunto = System.Convert.ToString(ex.Message);
            log.LogInformation("Catch :: " + ex.Message);
        }

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobjReprogramacion, Formatting.Indented);

    }

    //Metodo:  deleteReprogramacion
    if (vvhttpmethod == "deleteReprogramacion")
    {
        log.LogInformation("En vvhttpmethod == deleteReprogramacion.");
        //Conversion de Respuestas a JSON

        DeleteReprogramacion DeleteReprogramacion = new DeleteReprogramacion();
        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        try
        {
            log.LogInformation("En try");
            long resultado = 0;

            if(dataobject?.Id!=null)
                DeleteReprogramacion.Id = dataobject?.Id;

            if(dataobject?.Created_By!=null)
                DeleteReprogramacion.Created_By = dataobject?.Created_By;


            resultado = await vobj_sqldata.funDeleteReprogramacion(log, DeleteReprogramacion);

            if(resultado>0)
            {
                DeleteReprogramacion.Resultado = resultado;
                DeleteReprogramacion.Respuesta = "La reprogramación fue eliminada con éxito.";
                //finalizamos la transaccion
                scope.Complete();
            }
            else
            {
                DeleteReprogramacion.Resultado = 0;
                DeleteReprogramacion.Respuesta = "La reprogramación no pudo ser eliminada.";
            }
        }
        catch (Exception ex)
        {
            DeleteReprogramacion.Resultado = 0;
            DeleteReprogramacion.Respuesta = System.Convert.ToString(ex.Message);
            log.LogInformation("Catch :: " + ex.Message);
        }

        jsonrspt = JsonConvert.SerializeObject(DeleteReprogramacion, Formatting.Indented);
    }

    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}

public static EvidenciaPost funsetObjectEvidencia(ILogger log, dynamic dataobject, string vvmethod)
{
    log.LogInformation("en  funsetObjectEvidencia.");
    EvidenciaPost curobj = new EvidenciaPost();

    if (vvmethod == "post")
    {
        log.LogInformation("en  vvmethod == post.");
        curobj.HAPlanAccionesId = dataobject?.HAPlanAccionesId;
        curobj.Name             = dataobject?.Name;
        curobj.Adjunto          = dataobject?.Adjunto;
        curobj.Created_By       = dataobject?.Created_By;
    }

    if (vvmethod == "put")
    {
        log.LogInformation("en  vvmethod == put.");
        curobj.Id                     = dataobject?.Id;
        curobj.SEEvidenciasAdjuntosId = dataobject?.SEEvidenciasAdjuntosId;
        curobj.Name                   = dataobject?.Name;
        curobj.Adjunto                = dataobject?.Adjunto;
        curobj.Created_By             = dataobject?.Created_By;
        curobj.Deleted                = dataobject?.Deleted;
    }

    if (vvmethod == "EvaluarEvidencia")
    {
        log.LogInformation("en  vvmethod == EvaluarEvidencia.");
        curobj.Id                     = dataobject?.Id;
        curobj.SEEvidenciasAdjuntosId = dataobject?.SEEvidenciasAdjuntosId;
        curobj.Created_By             = dataobject?.Created_By;
        curobj.HAPlanAccionesId       = dataobject?.HAPlanAccionesId;
        curobj.SEStatusEvidenciasId   = dataobject?.SEStatusEvidenciasId;
        curobj.DescriptionObservacion = dataobject?.DescriptionObservacion;
        curobj.TipoEvaluacion         = dataobject?.TipoEvaluacion;
    }

    // if(dataobject?.EnviarCorreo!=null)
    // {   curobj.EnviarCorreo = dataobject?.EnviarCorreo; }

    return curobj;
}

public static ReprogramacionPost funsetObjectReprogramacion(ILogger log, dynamic dataobject, string vvmethod)
{
    log.LogInformation("en  funsetObjectReprogramacion.");
    ReprogramacionPost curobj = new ReprogramacionPost();

    if(dataobject?.Id!=null)
        curobj.Id = dataobject?.Id;

    if(dataobject?.HAPlanAccionesId!=null)
        curobj.HAPlanAccionesId = dataobject?.HAPlanAccionesId;

    if(dataobject?.FechaAnterior!=null)
        curobj.FechaAnterior = dataobject?.FechaAnterior;

    if(dataobject?.FechaNueva!=null)
        curobj.FechaNueva = dataobject?.FechaNueva;

    if(dataobject?.Name!=null)
        curobj.Name = dataobject?.Name;

    if(dataobject?.Adjunto!=null)
        curobj.Adjunto = dataobject?.Adjunto;

    if(dataobject?.Motivo!=null)
        curobj.Motivo = dataobject?.Motivo;

    if(dataobject?.Created_By!=null)
        curobj.Created_By = dataobject?.Created_By;

    log.LogInformation("Antes del return, curobj.HAPlanAccionesId -> " + curobj.HAPlanAccionesId);
    return curobj;

}

/**
 *  Enviar Notificaciones de evaluación y resultado de evaluación.
 *  opc 1 solicitud de evaluación, opc 2 resultado de evaluación.
 */
public static async void notificarEvidencia(ILogger log, string url, DataNotificacion curentity, int opc, string environment)
{
    // VARIABLE QUE ALMACENA EL ENTORNO DONDE SE EJECUTA (dev - prd)
    string correosDev = Environment.GetEnvironmentVariable("correosDev", EnvironmentVariableTarget.Process);
    log.LogInformation("correosDev -> " + correosDev);

    log.LogInformation("en notificarEvidencia.");
    log.LogInformation("environment -> " + environment);
    log.LogInformation("url -> " + url);
    log.LogInformation("curentity.Code_Hallazgo -> " + curentity.Code_Hallazgo);
    log.LogInformation("curentity.Sede -> " + curentity.Sede);
    log.LogInformation("curentity.Item -> " + curentity.Item);
    log.LogInformation("curentity.HallazgoCorreo -> " + curentity.HallazgoCorreo);
    log.LogInformation("curentity.AccionCorreo -> " + curentity.AccionCorreo);

    DataEmailNew oDataEmail = new DataEmailNew();
    string cuerpo           = "";
    string Nombre           = "";
    string Cargo            = "";
    string Correo           = "";
    // correo del responsable del hallazgo
    if(opc==1)
    {
        oDataEmail.sendto       = curentity.HallazgoCorreo;
        oDataEmail.emailsubject = "Solicito evaluación de Acción Correctiva "+curentity.Item+"-"+curentity.Code_Hallazgo+"-"+curentity.Sede;
        cuerpo                  = "Se solicita la verificación y evaluación de las evidencias adjuntas de la acción correctiva "+curentity.Item+" del hallazgo "+ curentity.Code_Hallazgo+" perteneciente a la sede "+ curentity.Sede+", dicha acción correctiva tiene las siguientes evidencias:";

        Nombre                  = curentity.AccionResponsable;
        Cargo                   = curentity.AccionCargo;
        Correo                  = curentity.AccionCorreo;

    }
    // correo del responsable de la accion correctiva
    else
    {
        oDataEmail.sendto       = curentity.AccionCorreo;
        oDataEmail.emailsubject = "Resultado de evaluación de Acción Correctiva "+curentity.Item+"-"+curentity.Code_Hallazgo+"-"+curentity.Sede;
        cuerpo                  = "Para comunicar que la evaluación de las evidencias adjuntas de la acción correctiva "+curentity.Item+" del hallazgo "+ curentity.Code_Hallazgo+" perteneciente a la sede "+ curentity.Sede+", dicha acción correctiva tiene las siguientes evidencias:";
        Nombre                  = curentity.HallazgoResponsable;
        Cargo                   = curentity.HallazgoCargo;
        Correo                  = curentity.HallazgoCorreo;
    }

    log.LogInformation("oDataEmail.sendto -> " + oDataEmail.sendto);

    // SI environment == dev
    if( environment == "dev")
    {
        // oDataEmail.sendto = correosDev;
        // log.LogInformation("oDataEmail.sendto -> " + oDataEmail.sendto);
    }


    oDataEmail.from         = "sigtasa@tasa.com.pe";


    var Bodyuser3 = "<body style='color: #ccc'><table border='0' cellpadding='0' cellspacing='0' style='max-width:100%;width:60%;margin: 0 auto;' id='tablota' ><tbody>";
    Bodyuser3 = Bodyuser3 + "<tr>";
    Bodyuser3 = Bodyuser3 + "<td align='center' valign='top'><table border='0' cellpadding='0' cellspacing='0' style='background-color:#fff;border-bottom:1px solid #ccc;font-family:Arial;font-weight:bold;line-height:100%;vertical-align:middle' width='100%'>";
    Bodyuser3 = Bodyuser3 + "<tbody><tr><td style='padding-bottom: 15px;'><a  href='https://sigtasa.tasa.com.pe/'  target='_blank' title='TasaSsoma'> <img id='logo' alt='tasassoma' src='https://sigtasa.tasa.com.pe/images/logoSIGTASA.png' width ='200px' height ='50px'></a></td></tr></tbody></table>";
    Bodyuser3 = Bodyuser3 + "</td>";
    Bodyuser3 = Bodyuser3 + "</tr>";
    Bodyuser3 = Bodyuser3 + "<tr>";
    Bodyuser3 = Bodyuser3 + "<td align='center'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><td style='background-color:#fff' valign='top'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><td><div style='color:#444 !important;font-family:Arial;font-size:14px;line-height:150%;text-align:left'>";

    Bodyuser3 = Bodyuser3 + "<p>Saludos Cordiales:</p>";

    Bodyuser3 = Bodyuser3 + "<p>"+cuerpo+"</p>";

    int count = 1;
    foreach (var item in curentity.Evidencias)
    {
        log.LogInformation("evidencia ->"+ item.Name+" - "+item.Status);
        Bodyuser3 = Bodyuser3 + "<p>"+item.Name+" - "+item.Status+"</p>";
    }

    Bodyuser3 = Bodyuser3 + "<p>Se envía el acceso al sistema para su atención:</p>";
    Bodyuser3 = Bodyuser3 + "<p> <a href='"+url+"'>"+url+"</a> </p>";


    Bodyuser3 = Bodyuser3 + "<p>Atte.</p>";
    Bodyuser3 = Bodyuser3 + "<p>"+ Nombre + "</p>";
    Bodyuser3 = Bodyuser3 + "<p>"+ Cargo + "</p>";
    Bodyuser3 = Bodyuser3 + "<p>" + Correo + "</p>";
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

    oDataEmail.bodyhtml = Bodyuser3;

    log.LogInformation("oDataEmail.bodyhtml -> " + oDataEmail.bodyhtml);

    //static readonly HttpClient httpclient = new HttpClient();
    HttpClient httpclient = new HttpClient();

    var jsonuser3 = JsonConvert.SerializeObject(oDataEmail);
    var datauser3 = new StringContent(jsonuser3, Encoding.UTF8, "application/json");
    var urlemail3 = "https://7454em4ils3nder-app.azurewebsites.net/api/VisitasaSendEmail?code=LXQwITmvDAAqXTgaDcBAkmbZXBCv5KnS6bY/XszaOjqHus4M3dbDzw==";
    httpclient.DefaultRequestHeaders.Add("apikey", "r$3#23516ewew5");
    var responseuser3 = await httpclient.PostAsync(urlemail3, datauser3);
    string resultEmail = responseuser3.Content.ReadAsStringAsync().Result;

    log.LogInformation("resultEmail: " + resultEmail);

}
