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


    // VARIABLE QUE ALMACENA EL AMBIENTE dev O prd
    string environment = Environment.GetEnvironmentVariable("environment", EnvironmentVariableTarget.Process);
    log.LogInformation("environment -> " + environment);

    // VARIABLE QUE ALMACENA LOS CORREOS A ENVIAR EN DEV
    string correosDev = Environment.GetEnvironmentVariable("correosDev", EnvironmentVariableTarget.Process);
    log.LogInformation( "correosDev -> " + correosDev );

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

    // VARIABLE QUE ALMACENA LA URL A DONDE SE VA A DESCARGAR EL INFORME OP
    string urlsooma = Environment.GetEnvironmentVariable("urlop", EnvironmentVariableTarget.Process);
    log.LogInformation("urlsooma -> " + urlsooma);

    SeguimientoDA seguimientoDA = new SeguimientoDA();
    Seguimiento seguimiento = new Seguimiento();

    if (vvhttpmethod == "post")
    {
        log.LogInformation("vvhttpmethod == post");
        seguimiento = fnSetObjSeguimiento(log, body, vvhttpmethod);

        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            try
            {
                seguimiento = await seguimientoDA.fnPostSeguimiento(log, seguimiento);
                log.LogInformation("inserto en fnPostSeguimiento");
                if (seguimiento.Id > 0)
                {
                    int rows = await seguimientoDA.fnPostReportante(seguimiento.Codigo_Reportante, seguimiento.Nombres_Reportante);
                    log.LogInformation("inserto en fnPostReportante" + rows);
                    if (rows > 0)
                    {
                        bool exito = await seguimientoDA.fnPostSeguimientoCheckList(seguimiento);
                        log.LogInformation("inserto en fnPostSeguimientoCheckList");

                        if (exito)
                        {
                            var adjunto = (seguimiento.Adjunto == null ? "" : seguimiento.Adjunto);

                            if (adjunto == "")
                            {
                                log.LogInformation("adjunto == vacio");
                                scope.Complete();
                            }
                            else
                            {
                                exito = await seguimientoDA.fnPostSeguimientoAdjunto(log, seguimiento.Id, 5, seguimiento.Adjunto, seguimiento.Archivos);
                                log.LogInformation("adjunto != vacio");
                                if (exito){
                                    scope.Complete();
                                    //envioNotificacion(log, seguimiento);
                                }
                            }

                        }
                    }

                }
            }
            catch (Exception ex)
            {
                log.LogInformation("catch::" + ex.Message);
                seguimiento.Id = -1;
            }

        jsonrspt = JsonConvert.SerializeObject(seguimiento, Formatting.Indented);
    }


    if (vvhttpmethod == "put")
    {
        bool exito = false;
        seguimiento = fnSetObjSeguimiento(log, body, vvhttpmethod);
        log.LogInformation("vvhttpmethod == put -> "+seguimiento.Id);
        //seguimiento.Id = Convert.ToInt64(req.Query["id"]);
        log.LogInformation("seguimiento.Criticidad -> "+seguimiento.Criticidad);
        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            try
            {
                await seguimientoDA.fnDeleteSeguimientoAdjunto(seguimiento.Id);
                await seguimientoDA.fnPutSeguimiento(log, seguimiento);
                int rows = await seguimientoDA.fnDeleteSeguimientoChecklist(seguimiento.Id);
                log.LogInformation("fnDeleteSeguimientoChecklist rows -> "+rows);
                // if (rows > 0)
                // {
                    exito = await seguimientoDA.fnPostSeguimientoCheckList(seguimiento);
                    if (exito)
                    {
                        log.LogInformation("fnPostSeguimientoCheckList");
                        var adjunto = (seguimiento.Adjunto == null ? "" : seguimiento.Adjunto);

                        if (adjunto == "")
                        {
                            log.LogInformation("adjunto == vacio");
                            //scope.Complete();
                            //No hacer nada exito se mantiene en true
                        }
                        else
                        {
                            log.LogInformation("seguimiento.Id -> " + seguimiento.Id);
                            foreach (var item in seguimiento.Archivos)
                            {
                                log.LogInformation("en foreach seguimiento.Archivos -> " +  item);
                            }
                            exito = await seguimientoDA.fnPostSeguimientoAdjunto(log, seguimiento.Id, 5, seguimiento.Adjunto, seguimiento.Archivos);
                            log.LogInformation("adjunto != vacio");
                        }

                        if (exito)
                        {
                            long idSE = 0;
                            string tipo = "";
                            if (seguimiento.Sede == null || seguimiento.Sede == 0)
                            {
                                idSE = seguimiento.Embarcacion;
                                tipo = "E";
                            }
                            else
                            {
                                idSE = seguimiento.Sede;
                                tipo = "S";
                            }
                            log.LogInformation("idSE -> "+idSE);
                            log.LogInformation("seguimiento.Area_Id -> "+seguimiento.Area_Id);
                            // agregamos mas correos destino
                            string emails = await seguimientoDA.fnGetCorreos(log, idSE, tipo, seguimiento.Area_Id);
                            //seguimiento.Correos += ", "+emails;
                            seguimiento.Correos += emails;

                            log.LogInformation("seguimiento.Correos -> "+seguimiento.Correos);
                            //rows = await seguimientoDA.fnSeguimientoUpdateInforme(seguimiento);

                            Result result = new Result();

                            result = await seguimientoDA.fnGetSeguimientoObject(log, seguimiento.Id);

                            //completamos la transaccion...
                            scope.Complete();
                            log.LogInformation(" Completamos La Transaccion y Enviamos Las Notificaciones");

                            string notificacion = "Modificacion";

                            enviarNotificaciones(log, seguimiento, result, notificacion, urlsooma);
                            //scope.Complete();

                        }
                    }
                //}

                //int rows = await seguimientoDA.fnPutSeguimiento(seguimiento);

                //if (rows > 0)
                //{
                //    rows = await seguimientoDA.fnDeleteSeguimientoChecklist(seguimiento.Id);
                //    if (rows > 0)
                //    {
                //        bool exito = await seguimientoDA.fnPostSeguimientoCheckList(seguimiento);
                //        if (exito)
                //            scope.Complete();
                //    }
                //}
            }
            catch (Exception ex)
            {
                log.LogInformation("catch::" + ex.Message);
                seguimiento.Id = 0;
            }

        Response response = new Response();
        response.status = exito;
        response.message = (exito ? "Se actualizó la observación con éxito" : "Error al actualizar la observación");

        jsonrspt = JsonConvert.SerializeObject(response, Formatting.Indented);
    }


    if (vvhttpmethod == "delete")
    {
        Response response = new Response();
        long Id = Convert.ToInt64(req.Query["Id"]);
        string Codigo_Reportante = req.Query["Codigo_Reportante"];

        int rows = 0;
        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            try
            {
                rows = await seguimientoDA.fnDeleteSeguimiento(Id);

                if (rows > 0)
                {
                    rows = await seguimientoDA.fnDeleteReportante(Codigo_Reportante);
                    if (rows > 0)
                    {
                        rows = await seguimientoDA.fnDeleteSeguimientoChecklist(Id);
                        if (rows > 0)
                        {
                            await seguimientoDA.fnDeleteSeguimientoAdjunto(Id);
                            scope.Complete();
                        }

                    }
                }
            }
            catch (Exception ex)
            {
                log.LogInformation("catch::" + ex.Message);
                seguimiento.Id = -1;
            }


        response.status = (rows > 0);
        response.message = (rows > 0 ? "Se eliminó la observación con éxito" : "Error al eliminar la observación");
        jsonrspt = JsonConvert.SerializeObject(response, Formatting.Indented);
    }

    if (vvhttpmethod == "postPrueba")
    {
        log.LogInformation(" vvhttpmethod == postPrueba ....");
        seguimiento = fnSetObjSeguimiento(log, body, vvhttpmethod);

        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        try
        {
            seguimiento = await seguimientoDA.fnPostSeguimiento(log, seguimiento);

            if (seguimiento.Id > 0)
            {
                log.LogInformation(" Si inserto en fnPostSeguimiento.");

                int rows = await seguimientoDA.fnPostReportante(seguimiento.Codigo_Reportante, seguimiento.Nombres_Reportante);

                if( rows > 0 )
                {
                    log.LogInformation(" SI inserto en fnPostReportante. " + rows);

                    bool exito = await seguimientoDA.fnPostSeguimientoCheckList(seguimiento);

                    if (exito)
                    {
                        log.LogInformation(" SI inserto en fnPostSeguimientoCheckList.");
                        var adjunto = (seguimiento.Adjunto == null ? "" : seguimiento.Adjunto);
                        if (adjunto == "")
                        {
                            log.LogInformation("adjunto == vacio");
                            //no pasa nada exito sigue en verdadero
                        }
                        else
                        {
                            exito = await seguimientoDA.fnPostSeguimientoAdjunto(log, seguimiento.Id, 5, seguimiento.Adjunto, seguimiento.Archivos);
                            log.LogInformation("adjunto != vacio");
                        }

                        if (exito)
                        {
                            log.LogInformation(" SI inserto en fnPostSeguimientoAdjunto.");

                            log.LogInformation("correos "+seguimiento.Correos);

                            long idSE = 0;
                            string tipo = "";
                            if (seguimiento.Sede == null || seguimiento.Sede == 0)
                            {
                                idSE = seguimiento.Embarcacion;
                                tipo = "E";
                            }
                            else
                            {
                                idSE = seguimiento.Sede;
                                tipo = "S";
                            }

                            //rows = await seguimientoDA.fnSeguimientoUpdateInforme(seguimiento);

                            Result result = new Result();

                            result = await seguimientoDA.fnGetSeguimientoObject(log, seguimiento.Id);

                            log.LogInformation("result.DatosPrincipales.Area_Id -> " + result.DatosPrincipales.Area_Id);
                            // agregamos mas correos destino
                            string emails = await seguimientoDA.fnGetCorreos(log, idSE, tipo, result.DatosPrincipales.Area_Id);
                            //seguimiento.Correos += ", "+emails;
                            seguimiento.Correos += emails;
                            log.LogInformation("seguimiento.Correos -> "+seguimiento.Correos);

                            //completamos la transaccion...
                            scope.Complete();
                            log.LogInformation(" Completamos La Transaccion y Enviamos Las Notificaciones");

                            string notificacion = "Nueva";

                            enviarNotificaciones(log, seguimiento, result, notificacion, urlsooma);
                            //if (rows > 0)
                            //{
                                //log.LogInformation(" SI inserto en fnSeguimientoUpdateInforme.`y completamos transaccion");
                                // SeguimientoDA parametricaDA = new SeguimientoDA();

                                //enviarCorreo(log, seguimientoObs, objs, emails);
                                //scope.Complete();

                            //}
                            // else
                            // {
                            //     log.LogInformation(" NO inserto en fnSeguimientoUpdateInforme.");
                            //     seguimiento.Id      = 0;
                            //     seguimiento.Adjunto = " No inserto en fnSeguimientoUpdateInforme.";
                            // }




                        }
                        else
                        {
                            log.LogInformation(" NO inserto en fnPostSeguimientoAdjunto.");
                            seguimiento.Id      = 0;
                            seguimiento.Adjunto = " No inserto en fnPostSeguimientoAdjunto.";
                        }


                    }
                    else
                    {
                        log.LogInformation(" NO inserto en fnPostSeguimientoCheckList.");
                        seguimiento.Id      = 0;
                        seguimiento.Adjunto = " No inserto en fnPostSeguimiento.";
                    }
                }
                else
                {
                    log.LogInformation(" NO inserto en fnPostReportante.");
                    seguimiento.Id      = 0;
                    seguimiento.Adjunto = " No inserto en fnPostSeguimiento.";
                }


            }
            else
            {
                log.LogInformation(" No inserto en fnPostSeguimiento.");
                seguimiento.Id      = 0;
                seguimiento.Adjunto = " No inserto en fnPostSeguimiento.";
            }
        }
        catch (Exception ex)
        {
            log.LogInformation("catch::" + ex.Message);
            seguimiento.Id      = 0;
            seguimiento.Adjunto = System.Convert.ToString(ex.Message);
        }

        jsonrspt = JsonConvert.SerializeObject(seguimiento, Formatting.Indented);
        log.LogInformation("jsonrspt -> " + jsonrspt);
    }

    if (vvhttpmethod == "postInformePdf")
    {
        log.LogInformation(" vvhttpmethod == postInformePdf ");

        seguimiento = fnSetObjSeguimiento(log, body, vvhttpmethod);

        int rows    = 0;

        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        try
        {
            rows = await seguimientoDA.fnSeguimientoUpdateInforme(seguimiento);
            if(rows>0)
            {
                log.LogInformation("SI guardo en fnSeguimientoUpdateInforme. Completamos la Transaccion");
                scope.Complete();
            }
            else
            {
                log.LogInformation("NO guardo en fnSeguimientoUpdateInforme");

                seguimiento         = new Seguimiento();
                seguimiento.Id      = 0;
                seguimiento.Adjunto = "NO guardo en fnSeguimientoUpdateInforme";
            }
        }
        catch (Exception ex)
        {
            log.LogInformation("catch::" + ex.Message);

            seguimiento         = new Seguimiento();
            seguimiento.Id      = 0;
            seguimiento.Adjunto = System.Convert.ToString(ex.Message);
        }
    }

    if (vvhttpmethod == "getCorreosPrueba")
    {
        long Id     = Convert.ToInt64(req.Query["Id"]);
        string Tipo = req.Query["Tipo"];
        long idArea = Convert.ToInt64(req.Query["Id"]);

        string emails = await seguimientoDA.fnGetCorreos(log, Id, Tipo, idArea);

        jsonrspt = JsonConvert.SerializeObject(emails, Formatting.Indented);

    }
    return jsonrspt != null
        ? (ActionResult)new OkObjectResult($"{jsonrspt}")
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}


// public static void envioNotificacion(ILogger log, Seguimiento Seguimiento)
// {

// }

public static Seguimiento fnSetObjSeguimiento(ILogger log, dynamic body, string vvmethod)
{
    Seguimiento obj = new Seguimiento();
    List<string> Archivos = new List<string>();
    log.LogInformation("en fnSetObjSeguimiento");
    if (vvmethod == "post" || vvmethod == "postPrueba")
    {
        log.LogInformation("en  if (vvmethod == post || vvmethod == postPrueba)");
        ////////////*********************************
        obj.Correos    = "";//body?.Correos;
        obj.Pdf        = body?.Pdf;
        obj.Updated_By = body?.Updated_By;
        ////////////*********************************

        log.LogInformation("en  obj.Tipo_Observacion = body?.Tipo_Observacion;");
        obj.Tipo_Observacion = body?.Tipo_Observacion;

        if(body?.Criticidad!=null)
            obj.Criticidad = body?.Criticidad;

        obj.Sede = body?.Sede;
        obj.Embarcacion = body?.Embarcacion;
        obj.Area = body?.Area;
        obj.Zona = body?.Zona;
        obj.Codigo_Reportante = body?.Codigo_Reportante;
        obj.Nombres_Reportante = body?.Nombres_Reportante;
        obj.Codigo_Reportado = body?.Codigo_Reportado;
        obj.Nombres_Reportado = body?.Nombres_Reportado;
        obj.Estado = body?.Estado;
        obj.Adjunto = body?.Adjunto;

        if(body?.Archivos != null)
        {
            log.LogInformation("body?.Archivos != null -> ");
            foreach (var item in body?.Archivos)
            {
                string Archivo = "";
                Archivo = item;

                Archivos.Add(Archivo);

                log.LogInformation("en  Archivo -> " + Archivo);
            }
        }

        obj.Archivos = Archivos;

        log.LogInformation("en  TimeZoneInfo PeruZona, obj.Criticidad -> " + obj.Criticidad );
        TimeZoneInfo PeruZona = TimeZoneInfo.FindSystemTimeZoneById("SA Pacific Standard Time");
        DateTime horaPeru = TimeZoneInfo.ConvertTime(DateTime.Now, PeruZona);

        //obj.Fecha_Operacion = Convert.ToDateTime(horaPeru.ToShortTimeString());
        obj.Fecha_Operacion = body?.Fecha_Operacion;
        //obj.Hora_Operacion = horaPeru.ToShortTimeString();
        obj.Hora_Operacion = body?.Hora_Operacion;

        List<CheckList> checkList = new List<CheckList>();
        foreach (var item in body?.CheckList)
        {
            CheckList check = new CheckList();
            check.Grupo = item?.Grupo;
            check.Subgrupo = item?.Subgrupo;
            check.Opcion = item?.Opcion;
            check.Respuesta = item?.Respuesta;
            checkList.Add(check);
        }
        obj.CheckList = checkList;
        obj.Created_By = body?.Created_By;
        log.LogInformation("en  obj.Created_By = body?.Created_By;");
    }

    if (vvmethod == "put")
    {
        obj.Adjunto = body?.Adjunto;
        List<CheckList> checkList = new List<CheckList>();

        foreach (var item in body?.CheckList)
        {
            CheckList check = new CheckList();
            check.Grupo = item?.Grupo;
            check.Subgrupo = item?.Subgrupo;
            check.Opcion = item?.Opcion;
            check.Respuesta = item?.Respuesta;
            checkList.Add(check);
        }
        obj.CheckList = checkList;
        obj.Updated_By = body?.Updated_By;
        obj.Fecha_Operacion = body?.Fecha_Operacion;
        obj.Hora_Operacion  = body?.Hora_Operacion;
        obj.Id = body?.Id;
        obj.Sede               = body?.Sede;
        obj.Embarcacion        = body?.Embarcacion;
        obj.Nombres_Reportante = body?.Nombres_Reportante;

        if(body?.Criticidad!=null)
            obj.Criticidad = body?.Criticidad;

        if(body?.Archivos != null)
        {
            log.LogInformation("body?.Archivos != null -> ");
            foreach (var item in body?.Archivos)
            {
                string Archivo = "";
                Archivo = item;

                Archivos.Add(Archivo);

                log.LogInformation("en  Archivo -> " + Archivo);
            }

            obj.Archivos = Archivos;
        }
    }

    // AQUI SOLO GUARDAREMOS EL PDE DEL INFORME EN LA BD
    if (vvmethod == "postInformePdf")
    {
        log.LogInformation("en  postInformePdf");
        obj.Id                 = body?.Id;
        obj.Pdf                = body?.Pdf;
        obj.Updated_By         = body?.Updated_By;
        obj.Sede               = body?.Sede;
        obj.Embarcacion        = body?.Embarcacion;
        obj.Nombres_Reportante = body?.Nombres_Reportante;
    }


    log.LogInformation("antes de return obj;");
    return obj;
}

/**
 * Enviar notificaciones ...
 */
public static async void enviarNotificaciones(ILogger log, Seguimiento obj, Result resul, string notificacion, string urlsooma)
{
    // VARIABLE QUE ALMACENA EL AMBIENTE dev O prd
    string environment = Environment.GetEnvironmentVariable("environment", EnvironmentVariableTarget.Process);
    log.LogInformation("environment -> " + environment);

    // VARIABLE QUE ALMACENA LOS CORREOS A ENVIAR EN DEV
    string correosDev = Environment.GetEnvironmentVariable("correosDev", EnvironmentVariableTarget.Process);
    log.LogInformation( "correosDev -> " + correosDev );

    log.LogInformation("obj.Correos " + obj.Correos);
    //log.LogInformation("Pdf " + obj.Pdf);
    log.LogInformation("urlsooma " + urlsooma);

    Seguimiento ent = resul.DatosPrincipales;
    string tipo = "";

    log.LogInformation("ent.Codigo " + ent.Codigo);
    log.LogInformation("ent.Tipo_Observacion_Des " + ent.Tipo_Observacion_Des);
    log.LogInformation("notificacion " + notificacion);

    //crear y enviar email
    //string correos          = "millanqjesus@gmail.com, jamedi2011@gmail.com, orlyvila@visualsat.com,  kllancachahua@visualsat.com, juchavez@tasa.com.pe, tguin@tasa.com.pe, fromero@tasa.com.pe, mzevallos@tasa.com.pe ";//"orlyvila@visualsat.com, jvillarroel@visualsat.com, jmendoza@visualsat.com, jmillan@visualsat.com";
    //string correos          = "millanqjesus@gmail.com, jamedi2011@gmail.com, orlyvila@visualsat.com,  kllancachahua@visualsat.com, jvillarroel@visualsat.com, jmendoza@visualsat.com, juchavez@tasa.com.pe, tguin@tasa.com.pe, mzevallos@tasa.com.pe";//"orlyvila@visualsat.com, jvillarroel@visualsat.com, jmendoza@visualsat.com, jmillan@visualsat.com";
    string correos          = "esifuentes@tasa.com.pe,jreyesp@tasa.com.pe,walba@tasa.com.pe,flatorre@tasa.com.pe,lmontoya@tasa.com.pe,rcorrea@tasa.com.pe,fberru@tasa.com.pe,mllangato@tasa.com.pe,phuyhua@tasa.com.pe,vramos@tasa.com.pe,mcarrillo@tasa.com.pe,orlyvila@visualsat.com, jamedi2011@gmail.com, juchavez@tasa.com.pe, tguin@tasa.com.pe, fromero@tasa.com.pe, mzevallos@tasa.com.pe";//"orlyvila@visualsat.com,
    DataEmailNew oDataEmail = new DataEmailNew();
    oDataEmail.sendto       = obj.Correos;

    // SI environment == dev estamos en desarrollo
    if( environment == "dev"){ oDataEmail.sendto = correosDev; }

    oDataEmail.from         = "sigtasa@tasa.com.pe";

    // ASUNTO DEL EMAIL
    oDataEmail.emailsubject = "Reporte SALVA";

    var bodyEmail = "";
    // bodyEmail += "<p></p>";
    // bodyEmail += "<p>Estimados,</p>";
    // bodyEmail += "<p></p>";


    if(notificacion=="Nueva")
    {
        //bodyEmail += "<p>Se ha reportado una observaci&oacute;n preventiva - SALVA, con los siguientes datos:</p>";
        tipo = "reportado";
    }
    else
    {
        //bodyEmail += "<p>Se ha modificado una observaci&oacute;n preventiva - SALVA, con los siguientes datos:</p>";
        tipo = "modificado ";
    }

    bodyEmail += "<p></p>";

    bodyEmail += "<table border='0' style='margin: 0 auto;' width='80%' bgcolor='#ffffff' cellspacing='5' cellpadding='5'>";
    bodyEmail += "<tbody>";

    bodyEmail += "<tr>";
    bodyEmail += "<td colspan='3' align='center' height='100'> <img src='https://sigtasa.tasa.com.pe/images/iconos/salva.png' alt='SALVA - OP'> </td>";
    bodyEmail += "</tr>";

    bodyEmail += "<tr>";
    bodyEmail += " <td colspan='3' align='center' height='100'><b>Se ha "+tipo+" una observaci&oacute;n preventiva - SALVA <br> con los siguientes datos:</b></td>";
    bodyEmail += "</tr>";

    bodyEmail += "<tr>";
    bodyEmail += "<td style='border: 1px solid #c8c8c8 !important; padding: 5px !important;' width='49%' align='left' bgcolor='#f3f3f3' height='30'> Nro. Reporte </td>";
    bodyEmail += "<td width='2%'></td>";
    bodyEmail += "<td style='border: 1px solid #c8c8c8 !important; padding: 5px !important;' width='49%' align='left'>"+ ent.Codigo +"</td>";
    bodyEmail += "</tr>";

    bodyEmail += "<tr>";
    bodyEmail += "<td style='border: 1px solid #c8c8c8 !important; padding: 5px !important;' width='49%' align='left' bgcolor='#f3f3f3' height='30'> Tipo de Observaci&oacute;n Preventiva </td>";
    bodyEmail += "<td width='2%'></td>";
    bodyEmail += "<td style='border: 1px solid #c8c8c8 !important; padding: 5px !important;' width='49%' align='left'>"+ ent.Tipo_Observacion_Des +"</td>";
    bodyEmail += "</tr>";

    bodyEmail += "<tr>";
    bodyEmail += "<td style='border: 1px solid #c8c8c8 !important; padding: 5px !important;' width='49%' align='left' bgcolor='#f3f3f3' height='30'> Fecha </td>";
    bodyEmail += "<td width='2%'></td>";
    bodyEmail += "<td style='border: 1px solid #c8c8c8 !important; padding: 5px !important;' width='49%' align='left'>"+ ent.Fecha_Operacion.ToString("yyyy-MM-dd") +"</td>";
    bodyEmail += "</tr>";

    bodyEmail += "<tr>";
    bodyEmail += "<td style='border: 1px solid #c8c8c8 !important; padding: 5px !important;' width='49%' align='left' bgcolor='#f3f3f3' height='30'> Hora </td>";
    bodyEmail += "<td width='2%'></td>";
    bodyEmail += "<td style='border: 1px solid #c8c8c8 !important; padding: 5px !important;' width='49%' align='left'>"+ ent.Hora_Operacion2 +"</td>";
    bodyEmail += "</tr>";

    bodyEmail += "<tr>";
    bodyEmail += "<td style='border: 1px solid #c8c8c8 !important; padding: 5px !important;' width='49%' align='left' bgcolor='#f3f3f3' height='30'> Sede / Embarcaci&oacute;n </td>";
    bodyEmail += "<td width='2%'></td>";
    bodyEmail += "<td style='border: 1px solid #c8c8c8 !important; padding: 5px !important;' width='49%' align='left'>"+ ent.Sede_Des + ent.Embarcacion_Des +"</td>";
    bodyEmail += "</tr>";

    bodyEmail += "<tr>";
    bodyEmail += "<td style='border: 1px solid #c8c8c8 !important; padding: 5px !important;' width='49%' align='left' bgcolor='#f3f3f3' height='30'> &Aacute;rea responsable de la correcci&oacute;n o cierre </td>";
    bodyEmail += "<td width='2%'></td>";
    bodyEmail += "<td style='border: 1px solid #c8c8c8 !important; padding: 5px !important;' width='49%' align='left'>"+ ent.Area_Des +"</td>";
    bodyEmail += "</tr>";

    bodyEmail += "<tr>";
    bodyEmail += "<td style='border: 1px solid #c8c8c8 !important; padding: 5px !important;' width='49%' align='left' bgcolor='#f3f3f3' height='30'> EP </td>";
    bodyEmail += "<td width='2%'></td>";
    bodyEmail += "<td style='border: 1px solid #c8c8c8 !important; padding: 5px !important;' width='49%' align='left'> --- </td>";
    bodyEmail += "</tr>";

    bodyEmail += "<tr>";
    bodyEmail += "<td style='border: 1px solid #c8c8c8 !important; padding: 5px !important;' width='49%' align='left' bgcolor='#f3f3f3' height='30'> Reportante (Nombre y Apellidos) </td>";
    bodyEmail += "<td width='2%'></td>";
    bodyEmail += "<td style='border: 1px solid #c8c8c8 !important; padding: 5px !important;' width='49%' align='left'> " + obj.Nombres_Reportante + " </td>";
    bodyEmail += "</tr>";

    bodyEmail += "<tr>";
    bodyEmail += "<td style='border: 1px solid #c8c8c8 !important; padding: 5px !important;' width='49%' align='left' bgcolor='#f3f3f3' height='30'> Zona / Equipo </td>";
    bodyEmail += "<td width='2%'></td>";
    bodyEmail += "<td style='border: 1px solid #c8c8c8 !important; padding: 5px !important;' width='49%' align='left'> " + ent.Zona_Des + " </td>";
    bodyEmail += "</tr>";

    bodyEmail += "<tr>";
    bodyEmail += "<td style='border: 1px solid #c8c8c8 !important; padding: 5px !important;' width='49%' align='left' bgcolor='#f3f3f3' height='30'> Detalle </td>";
    bodyEmail += "<td width='2%'></td>";
    bodyEmail += "<td style='text-align: center; padding: 5px; border: 1px solid #c8c8c8; font-size: 14px;'>Click aqu&iacute; (<a href='"+urlsooma+"/view/download.html?Id=" + obj.Id + "&Documento=Informe&Proceso=CrearSeguimientoObservacion'>enlace para abrir la OP</a>)</ td>";
    //bodyEmail += "<td style='text-align: center; padding: 5px; border: 1px solid #c8c8c8; font-size: 14px;'>Click aqu&iacute; (<a href='https://sigtasa.tasa.com.pe/view/download.html?Id=" + obj.Id + "&Documento=Informe&Proceso=CrearSeguimientoObservacion'>enlace para abrir la OP</a>)</ td>";
    bodyEmail += "</tr>";

    bodyEmail += "</tbody>";
    bodyEmail += "</table>";


    oDataEmail.bodyhtml = bodyEmail;

    // ENVIO DEL EMAIL
    //static readonly HttpClient httpclient = new HttpClient();
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

