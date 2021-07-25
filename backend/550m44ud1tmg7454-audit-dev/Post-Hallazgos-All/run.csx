#r "Newtonsoft.Json"
#load "sqldb_hallazgosall_post.csx"
#load "../Get-Hallazgos-All/sqldb_hallazgosall_get.csx"


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
    log.LogInformation("C# HTTP trigger function processed a request.");

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

    // VARIABLE QUE ALMACENA EL ENTORNO DONDE SE EJECUTA (dev - prd)
    string environment = Environment.GetEnvironmentVariable("environment", EnvironmentVariableTarget.Process);
    log.LogInformation("environment -> " + environment);
    // VARIABLE QUE ALMACENA LA URL DEL SISTEMA
    string urlSistema = Environment.GetEnvironmentVariable("urlSistema", EnvironmentVariableTarget.Process);
    log.LogInformation("urlSistema -> " + urlSistema);
    // VARIABLE QUE ALMACENA EL ENTORNO DONDE SE EJECUTA (dev - prd)
    string correosDev = Environment.GetEnvironmentVariable("correosDev", EnvironmentVariableTarget.Process);
    log.LogInformation("correosDev -> " + correosDev);

    /*START - Parametros de Lectura*/
    //long FuenteId       = req.Query["FuenteId"] == "" ? 0 : System.Convert.ToInt64(req.Query["FuenteId"]);
    string requestBody = await new StreamReader(req.Body).ReadToEndAsync();

    log.LogInformation("requestBody:" + requestBody);
    Console.WriteLine("requestBody:" + requestBody);

    dynamic dataobject = JsonConvert.DeserializeObject(requestBody);

    // Objetos a Utilizar
    DataHallazgosPostAll vobj_sqldata    = new DataHallazgosPostAll();
    DataHallazgosGetAll vobj_getHallazgo = new DataHallazgosGetAll();
    HallazgosPost curobj;
    HallazgosGet curobj3 = new HallazgosGet();
    DataHallazgo curobj4 = new DataHallazgo();

    //Metodo:  listado de evaluacion de auditores
    if (vvhttpmethod == "post")
    {
        Console.WriteLine("vvhttpmethod:" + vvhttpmethod);
        log.LogInformation("En post para regsitrar el hallazgo");
        curobj = funsetObject(log, dataobject, vvhttpmethod,environment);
        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        try
        {
            log.LogInformation("En try para regsitrar el hallazgo");
            curobj = await vobj_sqldata.funPostHallazgos(curobj);
            if(curobj.Id > 0)
            {
                log.LogInformation("En curobj.Id > 0");

                //finalizamos la transaccion
                scope.Complete();
                log.LogInformation("Despues de scope.Complete() para regsitrar el hallazgo " );

            }
        }
        catch (Exception ex)
        {
            log.LogInformation("catch::" + ex.Message);
            curobj3.Id = 0;
            curobj3.Code_Hallazgo = System.Convert.ToString(ex.Message);
        }

        curobj4 = await vobj_getHallazgo.funGetHallazgosAllList(log
                                                                    , curobj.Id
                                                                    , 0
                                                                    , 0
                                                                    , 0
                                                                    , 0
                                                                    , 0
                                                                    , 0
                                                                    , ""
                                                                    , ""
                                                                    , ""
                                                                    );
        curobj3 = curobj4.Hallazgos[0];
        log.LogInformation("Despues del funPostHallazgos para regsitrar el hallazgo"+ curobj3.Id + "-"+curobj3.Code_Hallazgo);

        if(curobj.EnviarCorreo==1 && curobj.Id > 0)
        {
            log.LogInformation("if(curobj.EnviarCorreo==1)");
            //OBJETO PARA LOS DATOS DEL CORREO
            DataEmailNew oDataEmailUser3 = new DataEmailNew();
            //DESTINATARIOS DEL CORREO
            // SI environment == dev
            log.LogInformation("enviar correo a: " + curobj.ResponsableCorreo);
            if( environment == "dev")
            {
                // curobj.ResponsableCorreo = "kllancachahua@visualsat.com, orlyvila@visualsat.com, jmillan@visualsat.com";
                // curobj.ResponsableCorreo = correosDev;
                // log.LogInformation("entro en environment == dev, enviar correo a: " + curobj.ResponsableCorreo);
            }
            oDataEmailUser3.sendto = curobj.ResponsableCorreo;

            Console.WriteLine("sendto: " + oDataEmailUser3.sendto);
            log.LogInformation("sendto: " + oDataEmailUser3.sendto);
            // ASUNTO DEL EMAIL.
            //Registro de hallazgo <tipo fuente>-<ID HALLAZGO>
            oDataEmailUser3.emailsubject = "Registro de hallazgo "+curobj3.Fuente+"-"+curobj3.Code_Hallazgo;

            //CUERPO DEL CORREO
            var Bodyuser3 = "<body style='color: #ccc'><table border='0' cellpadding='0' cellspacing='0' style='max-width:100%;width:60%;margin: 0 auto;' id='tablota' ><tbody>";
            Bodyuser3 = Bodyuser3 + "<tr>";
            Bodyuser3 = Bodyuser3 + "<td align='center' valign='top'><table border='0' cellpadding='0' cellspacing='0' style='background-color:#fff;border-bottom:1px solid #ccc;font-family:Arial;font-weight:bold;line-height:100%;vertical-align:middle' width='100%'>";
            Bodyuser3 = Bodyuser3 + "<tbody><tr><td style='padding-bottom: 15px;'><a  href='https://sigtasa.tasa.com.pe/'  target='_blank' title='TasaSsoma'> <img id='logo' alt='TasaSsoma' src='https://sigtasa.tasa.com.pe/images/logoSIGTASA.png' width ='200px' height ='50px'></a></td></tr></tbody></table>";
            Bodyuser3 = Bodyuser3 + "</td>";
            Bodyuser3 = Bodyuser3 + "</tr>";
            Bodyuser3 = Bodyuser3 + "<tr>";
            Bodyuser3 = Bodyuser3 + "<td align='center'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><td style='background-color:#fff' valign='top'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><td><div style='color:#444 !important;font-family:Arial;font-size:14px;line-height:150%;text-align:left'>";
            Bodyuser3 = Bodyuser3 + "<p>Estimado(a), saludos cordiales:</p>";
            Bodyuser3 = Bodyuser3 + "<p>Para informarle que se encuentra registrado y asignado el hallazgo <strong>"+curobj3.Code_Hallazgo+"</strong> para su atenci&oacute;n con la definici&oacute;n y registro del an&aacute;lisis causa ra&iacute;z y determinaci&oacute;n del plan de acci&oacute;n, el mismo que debe ser validado y aprobado para su implementaci&oacute;n, en un plazo no mayor a los 15 d&iacute;as, desde el momento de recepci&oacute;n del presente correo.</p>";

            Bodyuser3 = Bodyuser3 + "<p>Quedo a la espera de sus comentarios.</p>";


            Bodyuser3 = Bodyuser3 + "<p>Atte.</p>";
            Bodyuser3 = Bodyuser3 + "<p>" + curobj.Usuario + "</p>";
            Bodyuser3 = Bodyuser3 + "<p>" + curobj.Cargo + "</p>";
            Bodyuser3 = Bodyuser3 + "<p>" + curobj.Correo + "</p>";

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

            log.LogInformation("correo: " + oDataEmailUser3.sendto);
            log.LogInformation("Asunto: " + oDataEmailUser3.emailsubject);
            log.LogInformation("Body3: " + Bodyuser3);
            log.LogInformation("resultEmail: " + resultEmail);

            if(resultEmail=="ok")
            {
                log.LogInformation("EMAIL ENVIADO: " + resultEmail);
            }
        }
        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj3, Formatting.Indented);

    }

    if (vvhttpmethod == "put")
    {
        Console.WriteLine("vvhttpmethod:" + vvhttpmethod);

        curobj        = funsetObject(log, dataobject, vvhttpmethod,environment);

        int resultado = 0;

        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        try
        {
            resultado     = await vobj_sqldata.funPutHallazgos(curobj);

            log.LogInformation("resultado -> " + resultado);
            log.LogInformation("curobj.Id -> " + curobj.Id);

            if(resultado > 0)
            {
                //finalizamos la transaccion
                scope.Complete();
                log.LogInformation("despues de scope.Complete()");

            }
            else
            {
                curobj.Id = resultado;
                curobj.Code_Hallazgo = "No se pudo modificar ningún registro.";
            }
        }
        catch (Exception ex)
        {
            log.LogInformation("catch::" + ex.Message);
            curobj.Id = 0;
            curobj.Code_Hallazgo = System.Convert.ToString(ex.Message);
        }

            curobj4 = await vobj_getHallazgo.funGetHallazgosAllList(log
                                                                , curobj.Id
                                                                , 0
                                                                , 0
                                                                , 0
                                                                , 0
                                                                , 0
                                                                , 0
                                                                , ""
                                                                , ""
                                                                , ""
                                                                );
            curobj3 = curobj4.Hallazgos[0];
            log.LogInformation("curobj4 -> " + JsonConvert.SerializeObject(curobj4, Formatting.Indented));
            log.LogInformation("curobj4.Hallazgos[0].Fuente -> " + curobj4.Hallazgos[0].Fuente);
            log.LogInformation("curobj3.Fuente -> " + curobj3.Fuente);

            if(curobj.EnviarCorreo==1 && resultado > 0)
            {
                // SI environment == dev
                log.LogInformation("enviar correo a: " + curobj.ResponsableCorreo);
                if( environment == "dev")
                {
                    // curobj.ResponsableCorreo = "kllancachahua@visualsat.com, orlyvila@visualsat.com, jmillan@visualsat.com";
                    // curobj.ResponsableCorreo = correosDev;
                    // log.LogInformation("entro en environment == dev, enviar correo a: " + curobj.ResponsableCorreo);
                }

                //OBJETO PARA LOS DATOS DEL CORREO
                DataEmailNew oDataEmailUser3 = new DataEmailNew();
                //DESTINATARIOS DEL CORREO
                oDataEmailUser3.sendto = curobj.ResponsableCorreo;////"millanqjesus@gmail.com"; //curobj.ResponsableCorreo;
                //oDataEmailUser3.from   = "sigtasa@tasa.com.pe"; //

                Console.WriteLine("sendto: " + oDataEmailUser3.sendto);
                log.LogInformation("sendto: " + oDataEmailUser3.sendto);
                // ASUNTO DEL EMAIL.
                //Registro de hallazgo <tipo fuente>-<ID HALLAZGO>
                oDataEmailUser3.emailsubject = "Registro de hallazgo "+curobj3.Fuente+"-"+curobj3.Code_Hallazgo;

                //CUERPO DEL CORREO
                var Bodyuser3 = "<body style='color: #ccc'><table border='0' cellpadding='0' cellspacing='0' style='max-width:100%;width:60%;margin: 0 auto;' id='tablota' ><tbody>";
                Bodyuser3 = Bodyuser3 + "<tr>";
                Bodyuser3 = Bodyuser3 + "<td align='center' valign='top'><table border='0' cellpadding='0' cellspacing='0' style='background-color:#fff;border-bottom:1px solid #ccc;font-family:Arial;font-weight:bold;line-height:100%;vertical-align:middle' width='100%'>";
                Bodyuser3 = Bodyuser3 + "<tbody><tr><td style='padding-bottom: 15px;'><a  href='https://sigtasa.tasa.com.pe/'  target='_blank' title='TasaSsoma'> <img id='logo' alt='TasaSsoma' src='https://sigtasa.tasa.com.pe/images/logoSIGTASA.png' width ='200px' height ='50px'></a></td></tr></tbody></table>";
                Bodyuser3 = Bodyuser3 + "</td>";
                Bodyuser3 = Bodyuser3 + "</tr>";
                Bodyuser3 = Bodyuser3 + "<tr>";
                Bodyuser3 = Bodyuser3 + "<td align='center'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><td style='background-color:#fff' valign='top'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><td><div style='color:#444 !important;font-family:Arial;font-size:14px;line-height:150%;text-align:left'>";
                Bodyuser3 = Bodyuser3 + "<p>Estimado(a), saludos cordiales:</p>";
                Bodyuser3 = Bodyuser3 + "<p>Para informarle que tiene asignado el hallazgo <strong>"+curobj3.Code_Hallazgo+"</strong> para su atenci&oacute;n con la definici&oacute;n y registro del an&aacute;lisis causa ra&iacute;z y determinaci&oacute;n del plan de acci&oacute;n, el mismo que debe ser validado y aprobado para su implementaci&oacute;n, en un plazo no mayor a los 15 d&iacute;as, desde el momento de recepci&oacute;n del presente correo.</p>";

                Bodyuser3 = Bodyuser3 + "<p>Para su atenci&oacute;n adjunto el acceso al sistema:</p>";
                Bodyuser3 = Bodyuser3 + "<p><a href='"+urlSistema+"'>"+urlSistema+"</a></p>";

                Bodyuser3 = Bodyuser3 + "<p>Quedo a la espera de sus comentarios.</p>";

                Bodyuser3 = Bodyuser3 + "<p>Atte.</p>";
                Bodyuser3 = Bodyuser3 + "<p>" + curobj.Usuario + "</p>";
                Bodyuser3 = Bodyuser3 + "<p>" + curobj.Cargo + "</p>";
                Bodyuser3 = Bodyuser3 + "<p>" + curobj.Correo + "</p>";

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

                log.LogInformation("correo: " + oDataEmailUser3.sendto);
                log.LogInformation("Asunto: " + oDataEmailUser3.emailsubject);
                log.LogInformation("Body3: " + Bodyuser3);
                log.LogInformation("resultEmail: " + resultEmail);

                // if(resultEmail=="ok")
                // {
                    log.LogInformation("EMAIL ENVIADO: " + resultEmail);
                // }
            }



        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);

    }

    // ENVIAR NOTIFICACIONES PARA HALLAZGOS
    if (vvhttpmethod == "NotificarHallazgosPendientes")
    {
        log.LogInformation("en NotificarHallazgosPendientes. ");

        // VARIABLE QUE ALMACENA LOS CORREOS A ENVIAR EN DEV
        // string correosDev = Environment.GetEnvironmentVariable("correosDev", EnvironmentVariableTarget.Process);
        log.LogInformation( "correosDev -> " + correosDev );

        string codigo = "";

        // CONSULTAMOS LOS HALLAZGOS CON STATUS ASIGNADO
        curobj4 = await vobj_getHallazgo.funGetHallazgosAllList(log
                                                            , 0
                                                            , 0
                                                            , 0
                                                            , 0
                                                            , 0
                                                            , 2
                                                            , 0
                                                            , ""
                                                            , ""
                                                            , ""
                                                            );
        foreach (var item in curobj4.Hallazgos)
        {
            if( item.StatusAccionCorrectivaId == 1 || item.StatusAccionCorrectivaId == 3)
            {
                log.LogInformation("Hallazgo  Code_Hallazgo " + item.Code_Hallazgo);
                log.LogInformation("StatusHallazgo " + item.StatusHallazgo);
                log.LogInformation("StatusAccionCorrectiva " + item.StatusAccionCorrectiva);
                log.LogInformation("ResponsableCorreo " + item.ResponsableCorreo);
                log.LogInformation("StatusHallazgoId " + item.StatusHallazgoId);
                log.LogInformation("StatusAccionCorrectivaId " + item.StatusAccionCorrectivaId);

                codigo = item.Code_Hallazgo;

                /// enviar notificacion de hallazgo pendiente
                DataEmailNew oDataEmailUser3 = new DataEmailNew();
                //DESTINATARIOS DEL CORREO
                oDataEmailUser3.sendto = item.ResponsableCorreo;
                // SI environment == dev
                // if( environment == "dev"){ oDataEmailUser3.sendto = correosDev; }

                log.LogInformation("sendto: " + oDataEmailUser3.sendto);

                oDataEmailUser3.emailsubject = "Aviso de hallazgo pendiente "+item.Fuente+"-"+item.Code_Hallazgo;

                //CUERPO DEL CORREO
                var Bodyuser3 = "<body style='color: #ccc'><table border='0' cellpadding='0' cellspacing='0' style='max-width:100%;width:60%;margin: 0 auto;' id='tablota' ><tbody>";
                Bodyuser3 = Bodyuser3 + "<tr>";
                Bodyuser3 = Bodyuser3 + "<td align='center' valign='top'><table border='0' cellpadding='0' cellspacing='0' style='background-color:#fff;border-bottom:1px solid #ccc;font-family:Arial;font-weight:bold;line-height:100%;vertical-align:middle' width='100%'>";

                Bodyuser3 = Bodyuser3 + "<tbody><tr><td style='padding-bottom: 15px;'><a  href='https://sigtasa.tasa.com.pe/'  target='_blank' title='TasaSsoma'> <img id='logo' alt='TasaSsoma' src='https://sigtasa.tasa.com.pe/images/logoSIGTASA.png' width ='200px' height ='50px'></a></td></tr></tbody></table>";
                Bodyuser3 = Bodyuser3 + "</td>";
                Bodyuser3 = Bodyuser3 + "</tr>";
                Bodyuser3 = Bodyuser3 + "<tr>";
                Bodyuser3 = Bodyuser3 + "<td align='center'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><td style='background-color:#fff' valign='top'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><td><div style='color:#444 !important;font-family:Arial;font-size:14px;line-height:150%;text-align:left'>";
                Bodyuser3 = Bodyuser3 + "<p>Estimado(a), saludos cordiales:</p>";
                Bodyuser3 = Bodyuser3 + "<p>Para informarle que tiene pendiente el hallazgo <strong>"+item.Code_Hallazgo+"</strong> para su atenci&oacute;n con la definici&oacute;n y registro del an&aacute;lisis causa ra&iacute;z y determinaci&oacute;n del plan de acci&oacute;n, el mismo que debe ser validado y aprobado para su implementaci&oacute;n.</p>";

                Bodyuser3 = Bodyuser3 + "<p>Adjunto el acceso al sistema para su atenci&oacute;n:</p>";
                Bodyuser3 = Bodyuser3 + "<p><a href='"+ urlSistema +"'> "+ urlSistema +"</a></p>";

                Bodyuser3 = Bodyuser3 + "<p><br>Quedo a la espera de sus comentarios.</p>";


                Bodyuser3 = Bodyuser3 + "<p><br>Atte.</p>";
                Bodyuser3 = Bodyuser3 + "<p>" + item.ReportanteName + "</p>";
                Bodyuser3 = Bodyuser3 + "<p>" + item.ReportanteCargo + "</p>";
                Bodyuser3 = Bodyuser3 + "<p>" + item.ReportanteCorreo + "</p>";

                Bodyuser3 = Bodyuser3 + "</div></td></tr></tbody></table></td></tr></tbody></table></td>";
                Bodyuser3 = Bodyuser3 + "</tr>";
                Bodyuser3 = Bodyuser3 + "<tr>";
                Bodyuser3 = Bodyuser3 + "<td align='center' valign='top'><table border='0' cellpadding='0' cellspacing='0' style='border-top:1px solid #ccc;' width='100%'><tbody><tr><td valign='top'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr>";
                Bodyuser3 = Bodyuser3 + "<td colspan='2' style='padding-top: 30px;border:0;color:#acacac;font-family:Arial;font-size:12px;line-height:125%;text-align:left' valign='middle'>©2021 TASA. Todos los derechos reservados</td></tr></tbody></table></td></tr></tbody></table></td>";
                Bodyuser3 = Bodyuser3 + "</tr>";
                Bodyuser3 = Bodyuser3 + "</tbody></table></body>";

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

                // log.LogInformation("correo: " + oDataEmailUser3.sendto);
                // log.LogInformation("Asunto: " + oDataEmailUser3.emailsubject);
                // log.LogInformation("Body3: " + Bodyuser3);
                log.LogInformation("resultEmail: " + resultEmail);
            }

        }

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(codigo, Formatting.Indented);
    }

    // Enviamos un correo de Hallazgo Vencido...
    if (vvhttpmethod == "EnviarHallazgoVencido")
    {
        log.LogInformation("en vvhttpmethod EnviarHallazgoVencido");
        long Id = dataobject?.Id;
        curobj4 = await vobj_getHallazgo.funGetHallazgosAllList(log
                                                            , Id
                                                            , 0
                                                            , 0
                                                            , 0
                                                            , 0
                                                            , 0
                                                            , 0
                                                            , ""
                                                            , ""
                                                            , ""
                                                            );
        curobj3 = curobj4.Hallazgos[0];
        //OBJETO PARA LOS DATOS DEL CORREO
        DataEmailNew oDataEmailUser3 = new DataEmailNew();
        //DESTINATARIOS DEL CORREO
        oDataEmailUser3.sendto = curobj3.ResponsableCorreo;
        // SI environment == dev
        if( environment == "dev")
        {
            //oDataEmailUser3.sendto = "kllancachahua@visualsat.com, orlyvila@visualsat.com, jmillan@visualsat.com, dpajuelo@tasa.com.pe";
            //oDataEmailUser3.sendto = "dpajuelo@tasa.com.pe";
            //oDataEmailUser3.sendto = correosDev;
        }

        log.LogInformation("sendto: " + oDataEmailUser3.sendto);
        // ASUNTO DEL EMAIL.
        //Registro de hallazgo <tipo fuente>-<ID HALLAZGO>
        oDataEmailUser3.emailsubject = "Aviso de vencimiento de hallazgo "+curobj3.Fuente+"-"+curobj3.Code_Hallazgo;

        //CUERPO DEL CORREO
            var Bodyuser3 = "<body style='color: #ccc'><table border='0' cellpadding='0' cellspacing='0' style='max-width:100%;width:60%;margin: 0 auto;' id='tablota' ><tbody>";
            Bodyuser3 = Bodyuser3 + "<tr>";
            Bodyuser3 = Bodyuser3 + "<td align='center' valign='top'><table border='0' cellpadding='0' cellspacing='0' style='background-color:#fff;border-bottom:1px solid #ccc;font-family:Arial;font-weight:bold;line-height:100%;vertical-align:middle' width='100%'>";

            Bodyuser3 = Bodyuser3 + "<tbody><tr><td style='padding-bottom: 15px;'><a  href='https://sigtasa.tasa.com.pe/'  target='_blank' title='TasaSsoma'> <img id='logo' alt='TasaSsoma' src='https://sigtasa.tasa.com.pe/images/logoSIGTASA.png' width ='200px' height ='50px'></a></td></tr></tbody></table>";
            Bodyuser3 = Bodyuser3 + "</td>";
            Bodyuser3 = Bodyuser3 + "</tr>";
            Bodyuser3 = Bodyuser3 + "<tr>";
            Bodyuser3 = Bodyuser3 + "<td align='center'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><td style='background-color:#fff' valign='top'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><td><div style='color:#444 !important;font-family:Arial;font-size:14px;line-height:150%;text-align:left'>";
            Bodyuser3 = Bodyuser3 + "<p>Estimado(a), saludos cordiales:</p>";
            Bodyuser3 = Bodyuser3 + "<p>Para informarle que tiene vencido el hallazgo <strong>"+curobj3.Code_Hallazgo+"</strong> para su atenci&oacute;n con la definici&oacute;n y registro del an&aacute;lisis causa ra&iacute;z y determinaci&oacute;n del plan de acci&oacute;n, el mismo que debe ser validado y aprobado para su implementaci&oacute;n.</p>";

            Bodyuser3 = Bodyuser3 + "<p>Adjunto el acceso al sistema para su atenci&oacute;n:</p>";
            Bodyuser3 = Bodyuser3 + "<p><a href='https://sigtasa.tasa.com.pe/'> sigtasa.tasa.com.pe</a></p>";

            Bodyuser3 = Bodyuser3 + "<p><br>Quedo a la espera de sus comentarios.</p>";


            Bodyuser3 = Bodyuser3 + "<p><br>Atte.</p>";
            Bodyuser3 = Bodyuser3 + "<p>" + curobj3.ReportanteName + "</p>";
            Bodyuser3 = Bodyuser3 + "<p>" + curobj3.ReportanteCargo + "</p>";
            Bodyuser3 = Bodyuser3 + "<p>" + curobj3.ReportanteCorreo + "</p>";

            Bodyuser3 = Bodyuser3 + "</div></td></tr></tbody></table></td></tr></tbody></table></td>";
            Bodyuser3 = Bodyuser3 + "</tr>";
            Bodyuser3 = Bodyuser3 + "<tr>";
            Bodyuser3 = Bodyuser3 + "<td align='center' valign='top'><table border='0' cellpadding='0' cellspacing='0' style='border-top:1px solid #ccc;' width='100%'><tbody><tr><td valign='top'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr>";
            Bodyuser3 = Bodyuser3 + "<td colspan='2' style='padding-top: 30px;border:0;color:#acacac;font-family:Arial;font-size:12px;line-height:125%;text-align:left' valign='middle'>©2021 TASA. Todos los derechos reservados</td></tr></tbody></table></td></tr></tbody></table></td>";
            Bodyuser3 = Bodyuser3 + "</tr>";
            Bodyuser3 = Bodyuser3 + "</tbody></table></body>";

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

            log.LogInformation("correo: " + oDataEmailUser3.sendto);
            log.LogInformation("Asunto: " + oDataEmailUser3.emailsubject);
            log.LogInformation("Body3: " + Bodyuser3);
            log.LogInformation("resultEmail: " + resultEmail);



        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj3, Formatting.Indented);
    }

    // ENVIAMOS CORREO AUTOMATICO SI EL HALLAZGO ESTA VENCIDO
    if (vvhttpmethod == "VencerHallazgosAuto")
    {
        log.LogInformation("en vvhttpmethod VencerHallazgoAuto");
        int resultado = 0;

        // VARIABLE QUE ALMACENA LOS CORREOS A ENVIAR EN DEV
        // string correosDev = Environment.GetEnvironmentVariable("correosDev", EnvironmentVariableTarget.Process);
        log.LogInformation( "correosDev -> " + correosDev );

        resultado = await vobj_sqldata.funVencerHallazgosBy15Days(log);
        if( resultado > 0 )
        {
            log.LogInformation("Los hallazgos con mas de 15 dias de enviados se cambio el status a vencidos " + resultado);
            curobj4 = await vobj_getHallazgo.funGetHallazgosAllList(log
                                                            , 0
                                                            , 0
                                                            , 0
                                                            , 0
                                                            , 0
                                                            , 4
                                                            , 0
                                                            , ""
                                                            , ""
                                                            , ""
                                                            );
            //curobj3 = curobj4.Hallazgos[0];
            foreach (var item in curobj4.Hallazgos)
            {
                log.LogInformation("Los hallazgos vencidos  Code_Hallazgo " + item.Code_Hallazgo);
                //OBJETO PARA LOS DATOS DEL CORREO
                DataEmailNew oDataEmailUser3 = new DataEmailNew();
                //DESTINATARIOS DEL CORREO
                oDataEmailUser3.sendto = item.ResponsableCorreo;
                // SI environment == dev
                if( environment == "dev")
                {
                    //oDataEmailUser3.sendto = "kllancachahua@visualsat.com, orlyvila@visualsat.com, jmillan@visualsat.com,
                    // oDataEmailUser3.sendto = correosDev;
                }


                log.LogInformation("sendto: " + oDataEmailUser3.sendto);
                // ASUNTO DEL EMAIL.
                //Registro de hallazgo <tipo fuente>-<ID HALLAZGO>
                oDataEmailUser3.emailsubject = "Aviso Vencimiento de Hallazgo "+item.Fuente+"-"+item.Code_Hallazgo;

                //CUERPO DEL CORREO
                var Bodyuser3 = "<body style='color: #ccc'><table border='0' cellpadding='0' cellspacing='0' style='max-width:100%;width:60%;margin: 0 auto;' id='tablota' ><tbody>";
                Bodyuser3 = Bodyuser3 + "<tr>";
                Bodyuser3 = Bodyuser3 + "<td align='center' valign='top'><table border='0' cellpadding='0' cellspacing='0' style='background-color:#fff;border-bottom:1px solid #ccc;font-family:Arial;font-weight:bold;line-height:100%;vertical-align:middle' width='100%'>";

                Bodyuser3 = Bodyuser3 + "<tbody><tr><td style='padding-bottom: 15px;'><a  href='https://sigtasa.tasa.com.pe/'  target='_blank' title='TasaSsoma'> <img id='logo' alt='TasaSsoma' src='https://sigtasa.tasa.com.pe/images/logoSIGTASA.png' width ='200px' height ='50px'></a></td></tr></tbody></table>";
                Bodyuser3 = Bodyuser3 + "</td>";
                Bodyuser3 = Bodyuser3 + "</tr>";
                Bodyuser3 = Bodyuser3 + "<tr>";
                Bodyuser3 = Bodyuser3 + "<td align='center'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><td style='background-color:#fff' valign='top'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><td><div style='color:#444 !important;font-family:Arial;font-size:14px;line-height:150%;text-align:left'>";
                Bodyuser3 = Bodyuser3 + "<p>Estimado(a), saludos cordiales:</p>";
                Bodyuser3 = Bodyuser3 + "<p>Para informarle que tiene vencido el hallazgo <strong>"+item.Code_Hallazgo+"</strong> para su atenci&oacute;n con la definici&oacute;n y registro del an&aacute;lisis causa ra&iacute;z y determinaci&oacute;n del plan de acci&oacute;n, el mismo que debe ser validado y aprobado para su implementaci&oacute;n.</p>";

                Bodyuser3 = Bodyuser3 + "<p>Adjunto el acceso al sistema para su atenci&oacute;n:</p>";
                Bodyuser3 = Bodyuser3 + "<p><a href='"+ urlSistema +"'> "+ urlSistema +"</a></p>";

                Bodyuser3 = Bodyuser3 + "<p><br>Quedo a la espera de sus comentarios.</p>";


                Bodyuser3 = Bodyuser3 + "<p><br>Atte.</p>";
                Bodyuser3 = Bodyuser3 + "<p>" + item.ReportanteName + "</p>";
                Bodyuser3 = Bodyuser3 + "<p>" + item.ReportanteCargo + "</p>";
                Bodyuser3 = Bodyuser3 + "<p>" + item.ReportanteCorreo + "</p>";

                Bodyuser3 = Bodyuser3 + "</div></td></tr></tbody></table></td></tr></tbody></table></td>";
                Bodyuser3 = Bodyuser3 + "</tr>";
                Bodyuser3 = Bodyuser3 + "<tr>";
                Bodyuser3 = Bodyuser3 + "<td align='center' valign='top'><table border='0' cellpadding='0' cellspacing='0' style='border-top:1px solid #ccc;' width='100%'><tbody><tr><td valign='top'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr>";
                Bodyuser3 = Bodyuser3 + "<td colspan='2' style='padding-top: 30px;border:0;color:#acacac;font-family:Arial;font-size:12px;line-height:125%;text-align:left' valign='middle'>©2021 TASA. Todos los derechos reservados</td></tr></tbody></table></td></tr></tbody></table></td>";
                Bodyuser3 = Bodyuser3 + "</tr>";
                Bodyuser3 = Bodyuser3 + "</tbody></table></body>";

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

                log.LogInformation("correo: " + oDataEmailUser3.sendto);
                log.LogInformation("Asunto: " + oDataEmailUser3.emailsubject);
                //log.LogInformation("Body3: " + Bodyuser3);
                log.LogInformation("resultEmail: " + resultEmail);

            }

        }
    }


    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}

public static HallazgosPost funsetObject(ILogger log, dynamic dataobject, string vvmethod, string environment)
{
    HallazgosPost curobj = new HallazgosPost();

    if (vvmethod == "post")
    {
        curobj.Id                  = 0;
        curobj.FuenteId            = dataobject?.FuenteId;
        curobj.TipoHallazgoId      = dataobject?.TipoHallazgoId;
        curobj.NormaId             = dataobject?.NormaId;
        curobj.UnidadNegocioId     = dataobject?.UnidadNegocioId;
        curobj.SedeId              = dataobject?.SedeId;
        curobj.AnalisisCausa       = dataobject?.AnalisisCausa;
        curobj.ResponsableName     = dataobject?.ResponsableName;
        curobj.ResponsableCorreo   = dataobject?.ResponsableCorreo;
        curobj.ResponsableCargo    = dataobject?.ResponsableCargo;
        curobj.ResponsableUserHash = dataobject?.ResponsableUserHash;
        curobj.ReportanteName      = dataobject?.ReportanteName;
        curobj.ReportanteCorreo    = dataobject?.ReportanteCorreo;
        curobj.ReportanteCargo     = dataobject?.ReportanteCargo;
        curobj.ReportanteUserHash  = dataobject?.ReportanteUserHash;
        curobj.Hallazgo            = dataobject?.Hallazgo;
        curobj.Created_By          = dataobject?.Created_By;
    }
    if (vvmethod == "put")
    {
        curobj.Id                  = dataobject?.Id;
        curobj.TipoHallazgoId      = dataobject?.TipoHallazgoId;
        curobj.NormaId             = dataobject?.NormaId;
        curobj.UnidadNegocioId     = dataobject?.UnidadNegocioId;
        curobj.SedeId              = dataobject?.SedeId;
        curobj.AnalisisCausa       = dataobject?.AnalisisCausa;
        curobj.Last_Updated_By     = dataobject?.Last_Updated_By;
        curobj.Hallazgo            = dataobject?.Hallazgo;
        curobj.ResponsableName     = dataobject?.ResponsableName;
        curobj.ResponsableCorreo   = dataobject?.ResponsableCorreo;
        curobj.ResponsableCargo    = dataobject?.ResponsableCargo;
        curobj.ResponsableUserHash = dataobject?.ResponsableUserHash;
    }

    if(dataobject?.EnviarCorreo!=null)
    {   curobj.EnviarCorreo = dataobject?.EnviarCorreo; }

    curobj.Usuario = dataobject?.Usuario;
    curobj.Cargo   = dataobject?.Cargo;
    curobj.Correo  = dataobject?.Correo;

    log.LogInformation("environment" + environment);
    log.LogInformation("curobj.ResponsableUserHash" + curobj.ResponsableUserHash);
    if( environment == "dev" && curobj.ResponsableUserHash == "e93ba9c7-a351-4769-8687-67b6a044904c")
    {
        curobj.ResponsableUserHash = "user-keyid-9368";
        log.LogInformation("curobj.ResponsableUserHash" + curobj.ResponsableUserHash);
    }

    return curobj;
}
