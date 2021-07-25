#r "Newtonsoft.Json"
#load "sqldb_programa_auditoriaall_post.csx"
#load "../Get-Auditoria-All/sqldb_auditoriaall_get.csx"
#load "../Get-Programa_Auditoria-All/sqldb_programa_auditoriaall_get.csx"

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
using System.Data;

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

    // VARIABLE QUE ALMACENA LA URL DEL SISTEMA
    string urlSistema   = Environment.GetEnvironmentVariable("urlSistema", EnvironmentVariableTarget.Process);
    log.LogInformation("urlSistema -> " + urlSistema);
    // VARIABLE QUE ALMACENA EL ENTORNO DONDE SE EJECUTA (dev - prd)
    string environment = Environment.GetEnvironmentVariable("environment", EnvironmentVariableTarget.Process);
    log.LogInformation("environment -> " + environment);
    // VARIABLE QUE ALMACENA EL ENTORNO DONDE SE EJECUTA (dev - prd)
    string correosDev = Environment.GetEnvironmentVariable("correosDev", EnvironmentVariableTarget.Process);
    log.LogInformation("correosDev -> " + correosDev);

    /*START - Parametros de Lectura*/

    // string apiKey = requestHeader.GetValues("apiKey").First();


    try
    {
        string requestBody = await new StreamReader(req.Body).ReadToEndAsync();

        log.LogInformation("requestBody:" + requestBody);

        dynamic dataobject = JsonConvert.DeserializeObject(requestBody);

        DataAuditoriaAllGet vobj_sqldata_auditoria = new DataAuditoriaAllGet();

        DataPrograma_AuditoriaAllGet vobj_sqldata_auditoria_get = new DataPrograma_AuditoriaAllGet();

        DataPrograma_AuditoriaAll vobj_sqldata = new DataPrograma_AuditoriaAll();
        programa_auditoriaall curobj = new programa_auditoriaall();
        Resp respuesta = new Resp();
        long newid = 0;
        long curid = 0;
        string usuariodelete;

        //Invocar INSERT
        if (vvhttpmethod == "post")
        {
            curobj = funsetObject(log, dataobject, vvhttpmethod);

            Task<long> curobjtask = vobj_sqldata.funPostPrograma_AuditoriaAll(log, curobj);
            curobjtask.Wait();
            newid = (long)curobjtask.Result;
            curobj.Id = newid;

            //Conversion de Respuestas a JSON
            jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
        }


        //Invocar PUT
        if (vvhttpmethod == "put")
        {
            curid = dataobject.Id;
            curobj = funsetObject(log, dataobject, vvhttpmethod);
            curobj = vobj_sqldata.funPutPrograma_AuditoriaAll(log, curid, curobj);
            curobj.Id = curid;
            //Conversion de Respuestas a JSON
            jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
        }

        //Invocar DELETE
        if (vvhttpmethod == "delete")
        {

            curid = dataobject.Id;
            usuariodelete = dataobject.Delete_By;

            long nrorows = vobj_sqldata.funDeletePrograma_AuditoriaAll(log, curid, usuariodelete);

            //Conversion de Respuestas a JSON
            jsonrspt = JsonConvert.SerializeObject(nrorows, Formatting.Indented);
        }

        if (vvhttpmethod == "finalize")
        {

            curid = dataobject.Id;
            int flag_evaluador = dataobject.Flag_Evaluador;

            List<auditoriaallget> lobjs = vobj_sqldata_auditoria.funGetAuditoriaAllList(log, 0, 0, null, null, 0, 0, 0, null, null, null, null, null, null, curid, 0, null, null, 0);

            programa_auditoriaallget objprograma = vobj_sqldata_auditoria_get.funGetPrograma_AuditoriaAll(log, 0, lobjs.First().ProgramaAuditoriaId, null);

            /// datos para los correos
            string usuario      = "";
            string cargo        = "";
            string correo       = "";
            string destinatario = "";

            if(objprograma.CodeEspecialidad == "CALIDAD") //CALIDAD
            {
                Console.WriteLine("Especialidad: CALIDAD");
                if (flag_evaluador == 1) //es el evaluador
                {
                    usuario      = "Laura Ponte";
                    cargo        = "Jefe Central de Sistemas de Calidad";
                    correo       = "lponte@tasa.com.pe";
                    destinatario = "samoreno@tasa.com.pe";
                }
                else //es el cordinador
                {
                    usuario      = "Sayda Moreno";
                    cargo        = "Analista de Sistema Calidad";
                    correo       = "samoreno@tasa.com.pe";
                    destinatario = "lponte@tasa.com.pe";
                }
            }
            if(objprograma.CodeEspecialidad == "SEGURIDAD") //SEGURIDAD
            {
                Console.WriteLine("Especialidad: SEGURIDAD");
                if (flag_evaluador == 1) //es el evaluador
                {
                    usuario = " Germán Arce Pacheco";
                    cargo   = "Jefe de Seguridad F&iacute;sica";
                    correo  = "garce@tasa.com.pe";
                    destinatario = "lreyes@tasa.com.pe";
                }
                else //es el cordinador
                {
                    usuario = "Laura Reyes Paiva";
                    cargo   = "Coordinador de Seguridad F&iacute;sica";
                    correo  = "lreyes@tasa.com.pe";
                    destinatario = "garce@tasa.com.pe";
                }
            }
            if(objprograma.CodeEspecialidad == "SSOMA") //SSOMA
            {
                Console.WriteLine("Especialidad: SSOMA");
                if (flag_evaluador == 1) //es el evaluador
                {
                    usuario = "Juan Chávez / Miguel Zevallos / Franklin Romero Merino ";
                    cargo   = "Jefe regional SSOMA (Norte) / Jefe regional SSOMA (Sur) / Jefe de Gestión Ambiental";
                    correo  = "juchavez@tasa.com.pe / mzevallos@tasa.com.pe / fromero@tasa.com.pe";
                    destinatario = "juchavez@tasa.com.pe, mzevallos@tasa.com.pe, dpajuelo@tasa.com.pe, fromero@tasa.com.pe";
                }
                else //es el cordinador
                {
                    usuario = "Juan Chávez / Miguel Zevallos / Dennis Pajuelo ";
                    cargo   = "Jefe regional SSOMA (Norte) / Jefe regional SSOMA (Sur) / Coordinador de Cumplimiento Ambiental";
                    correo  = "juchavez@tasa.com.pe / mzevallos@tasa.com.pe / dpajuelo@tasa.com.pe";
                    destinatario = "juchavez@tasa.com.pe, mzevallos@tasa.com.pe, fromero@tasa.com.pe";
                }
            }

            Console.WriteLine("usuario: "       + usuario);
            Console.WriteLine("cargo: "         + cargo);
            Console.WriteLine("correo: "        + correo);
            Console.WriteLine("destinatario: "  + destinatario);
            log.LogInformation("C# destinatario " + destinatario);



            int cant_auditorias = lobjs.Count;

            if (flag_evaluador == 1)
            {
                //es un evaluador
                if (lobjs.Count(a => a.StatusEvaluacionId == 2) >= 1 || lobjs.Count(a => a.StatusEvaluacionId == null) > 0 || lobjs.Count(a => a.StatusEvaluacionId == 0) > 0)
                {
                    respuesta.status = false;
                    respuesta.message = "Tienes Observaciones por Observar o Aprobar";
                }
                else if (lobjs.Count(a => a.StatusEvaluacionId == 3) == cant_auditorias)
                {
                    log.LogInformation("caso todas aprobadas:");
                    dataobject.StatusId = 5;
                    dataobject.Flag_Completada = 0;
                    curobj = funsetObject(log, dataobject, "put");
                    curobj = vobj_sqldata.funPutPrograma_AuditoriaAll(log, curid, curobj);

                    if (curobj.Id > 0)
                    {
                        respuesta.status = true;
                        respuesta.message = "Actualizado Devuelto Aprobado";
                    }
                    else
                    {
                        respuesta.status = false;
                        respuesta.message = "Error consulte con el administrador del sistema.";
                    }


                }
                else if (lobjs.Count(a => a.StatusEvaluacionId == 1) > 0)
                {
                    log.LogInformation("caso alguna observada:");
                    dataobject.StatusId = 3;
                    dataobject.Flag_Completada = 0;
                    //dataobject.CantidadCorrecciones += 1;
                    curobj = funsetObject(log, dataobject, "put");
                    curobj = vobj_sqldata.funPutPrograma_AuditoriaAll(log, curid, curobj);

                    respuesta.status = true;
                    respuesta.message = "Actualizado Enviado con observaciones";


                }

                if(respuesta.status)
                {
                    //obtener data del programa actualizada
                    objprograma = vobj_sqldata_auditoria_get.funGetPrograma_AuditoriaAll(log, 0, lobjs.First().ProgramaAuditoriaId, null);
                    //envia mensaje  responsable corporativo indicando que tiene 3 días para su correción.
                    //Enviar correo al coordinador indicandole que el programa de auditoria tiene auditorias con observaciones.
                    System.DateTime nuevaFecha = System.DateTime.Now;
                    nuevaFecha = nuevaFecha.AddDays(3);//nuevaFecha.ToString("dd-MM-YYYY")
                    //CONSTRUCCION DEL EMAIL.
                    //OBJETO PARA LOS DATOS DEL CORREO
                    DataEmailNew oDataEmailUser3 = new DataEmailNew();

                    //  SI ESTAMOS EN DEV (BETA)
                    if( environment == "dev")
                    {
                        //destinatario = correosDev;
                    }
                    //DESTINATARIOS DEL CORREO
                    oDataEmailUser3.sendto = destinatario;//"millanqjesus@gmail.com";
                    oDataEmailUser3.from   = "sigtasa@tasa.com.pe"; //

                    Console.WriteLine("sendto: " + oDataEmailUser3.sendto);
                    log.LogInformation("sendto: " + oDataEmailUser3.sendto);
                    // ASUNTO DEL EMAIL.
                    oDataEmailUser3.emailsubject = "Programa de Auditoría " +objprograma.DescriptionStatus+ "-"+objprograma.Code+"-"+objprograma.DescriptionEspecialidad;

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
                    Bodyuser3 = Bodyuser3 + "<p>En la bandeja Programa de Auditor&iacute;a se encuentra registrado el plan <strong>" + objprograma.Code + "</strong>. en estado " + objprograma.DescriptionStatus + " para su atenci&oacute;n.</p>";
                    Bodyuser3 = Bodyuser3 + "<p>Adicionalmente recordarle, que de encontrarse observado el programada, tiene un plazo m&aacute;ximo de 3 d&iacute;as calendario desde la fecha de recepci&oacute;n del presente correo, para subsanar las observaciones indicadas.</p>";


                    Bodyuser3 = Bodyuser3 + "<p>Atte.</p>";
                    Bodyuser3 = Bodyuser3 + "<p>" + usuario + "</p>";
                    Bodyuser3 = Bodyuser3 + "<p>" + cargo + "</p>";
                    Bodyuser3 = Bodyuser3 + "<p>" + correo + "</p>";

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

                }
            }
            else
            {
                //es el otro
                //verificamos si tiene corregidas
                //if (lobjs.Count(a => a.StatusEvaluacionId == 2 && a.StatusId != 3) > 0  && lobjs.Count(a => a.StatusEvaluacionId == 1) == 0)
                if (lobjs.Count(a => a.StatusEvaluacionId == 2 || a.StatusEvaluacionId == 3) == cant_auditorias)
                {
                    log.LogInformation("caso 1: verificaciones que solo hay aprobadas y corregidas");
                    int cant = objprograma.Cantidad_Correcciones + 1;

                    //cambiamos estadod e programa a corregido y agregamos cantidad de correcciones
                    dataobject.CantidadCorrecciones = cant;
                    //dataobject.CantidadCorrecciones += 1;
                    dataobject.StatusId = 4;
                    dataobject.Flag_Completada = 1;
                    curobj = funsetObject(log, dataobject, "put");
                    curobj = vobj_sqldata.funPutPrograma_AuditoriaAll(log, curid, curobj);

                    respuesta.status = true;
                    respuesta.message = "Actualizado Enviado a evaluacion";
                }
                //else if (lobjs.Count(a => a.StatusEvaluacionId != 1 && a.StatusId == 3) > 0)
                else if (lobjs.Count(a => a.StatusEvaluacionId == 1) > 0)
                {
                    log.LogInformation("caso 2: si tienes auditorias observadas");
                    // Reprogramadas
                    //int cant = objprograma.Cantidad_Correcciones + 1;

                    //cambiamos estadod e programa a corregido y agregamos cantidad de correcciones
                    //dataobject.CantidadCorrecciones = cant;
                    //dataobject.StatusId = 4;
                    //dataobject.Flag_Completada = 1;
                    //curobj = funsetObject(log, dataobject, "put");
                    //curobj = vobj_sqldata.funPutPrograma_AuditoriaAll(log, curid, curobj);
                    respuesta.status = false;
                    respuesta.message = "Tienes Observaciones por corregir";

                }
                else if (lobjs.Count(a => a.StatusEvaluacionId == null) > 0 || lobjs.Count(a => a.StatusEvaluacionId == 0) > 0)
                {
                    log.LogInformation("caso 3: pasa porprimera vez a evaluacion");
                    dataobject.Flag_Completada = 1;
                    dataobject.StatusId = 1;
                    curobj = funsetObject(log, dataobject, "put");
                    curobj = vobj_sqldata.funPutPrograma_AuditoriaAll(log, curid, curobj);

                    respuesta.status = true;
                    respuesta.message = "Actualizado Enviado a evaluacion";

                }

                if(respuesta.status)
                {
                    //obtener data del programa actualizada
                    objprograma = vobj_sqldata_auditoria_get.funGetPrograma_AuditoriaAll(log, 0, lobjs.First().ProgramaAuditoriaId, null);
                    System.DateTime nuevaFecha = System.DateTime.Now;
                    nuevaFecha = nuevaFecha.AddDays(7);//nuevaFecha.ToString("dd-MM-YYYY")
                    //CONSTRUCCION DEL EMAIL.
                    //OBJETO PARA LOS DATOS DEL CORREO
                    DataEmailNew oDataEmailUser3 = new DataEmailNew();

                    //  SI ESTAMOS EN DEV (BETA)
                    if( environment == "dev")
                    {
                        //destinatario = correosDev;
                    }

                    //DESTINATARIOS DEL CORREO
                    oDataEmailUser3.sendto = destinatario;//"millanqjesus@gmail.com";
                    oDataEmailUser3.from   = "sigtasa@tasa.com.pe"; //

                    Console.WriteLine("sendto: " + oDataEmailUser3.sendto);
                    log.LogInformation("sendto: " + oDataEmailUser3.sendto);
                    // ASUNTO DEL EMAIL.
                    oDataEmailUser3.emailsubject = "Programa de Auditoría Pendiente de evaluación de " + objprograma.Code + "-"+objprograma.DescriptionEspecialidad;

                    //CUERPO DEL CORREO
                    var Bodyuser3 = "<body style='color: #ccc'><table border='0' cellpadding='0' cellspacing='0' style='max-width:100%;width:60%;margin: 0 auto;' id='tablota' ><tbody>";
                    Bodyuser3 = Bodyuser3 + "<tr>";
                    Bodyuser3 = Bodyuser3 + "<td align='center' valign='top'><table border='0' cellpadding='0' cellspacing='0' style='background-color:#fff;border-bottom:1px solid #ccc;font-family:Arial;font-weight:bold;line-height:100%;vertical-align:middle' width='100%'>";
                    Bodyuser3 = Bodyuser3 + "<tbody><tr><td style='padding-bottom: 15px;'><a  href='https://sigtasa.tasa.com.pe/'  target='_blank' title='TasaSsoma'> <img id='logo' alt='TasaSsoma' src='https://sigtasa.tasa.com.pe/images/logoSIGTASA.png' width ='200px' height ='50px'></a></td></tr></tbody></table>";
                    Bodyuser3 = Bodyuser3 + "</td>";
                    Bodyuser3 = Bodyuser3 + "</tr>";
                    Bodyuser3 = Bodyuser3 + "<tr>";
                    Bodyuser3 = Bodyuser3 + "<td align='center'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><td style='background-color:#fff' valign='top'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><td><div style='color:#444 !important;font-family:Arial;font-size:14px;line-height:150%;text-align:left'>";
                    Bodyuser3 = Bodyuser3 + "<p>Estimado(a), saludos cordiales,</p>";
                    Bodyuser3 = Bodyuser3 + "<p>En la bandeja Evaluar Programa de Auditor&iacute;a se encuentra registrado el plan <strong>" + objprograma.Code + "</strong>. en estado " + objprograma.DescriptionStatus + " para su atenci&oacute;n.</p>";
                    Bodyuser3 = Bodyuser3 + "<p>Adicionalmente recordarle, que la evaluaci&oacute;n debe ser atendida en un plazo m&aacute;ximo de 7 d&iacute;as calendario desde la fecha de recepci&oacute;n del presente correo.</p>";


                    Bodyuser3 = Bodyuser3 + "<p>Atte.</p>";
                    Bodyuser3 = Bodyuser3 + "<p>"+ usuario + "</p>";
                    Bodyuser3 = Bodyuser3 + "<p>"+ cargo  + "</p>";
                    Bodyuser3 = Bodyuser3 + "<p>"+ correo + "</p>";

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
                }
            }

            //respuesta.status = true;
            //respuesta.message = "Actualizado";

            jsonrspt = JsonConvert.SerializeObject(respuesta, Formatting.Indented);
        }

        if (vvhttpmethod == "save")
        {

            curid = dataobject.Id;

            List<auditoriaallget> lobjs = vobj_sqldata_auditoria.funGetAuditoriaAllList(log, 0, 0, null, null, 0, 0, 0, null, null, null, null, null, null, curid, 0, null, null, 0);

            //programa_auditoriaallget objprograma = vobj_sqldata_auditoria_get.funGetPrograma_AuditoriaAll(log, 0, lobjs.First().ProgramaAuditoriaId, null);

            int cant_auditorias = lobjs.Count;

            //verificamos si esta todo corregido
            if (lobjs.Count(a => a.StatusEvaluacionId == 2) == cant_auditorias)
            {


                //int cant = objprograma.Cantidad_Correcciones + 1;

                //cambiamos estadod e programa a corregido
                //dataobject.CantidadCorrecciones = cant;
                dataobject.StatusId = 4;
                curobj = funsetObject(log, dataobject, vvhttpmethod);
                curobj = vobj_sqldata.funPutPrograma_AuditoriaAll(log, curid, curobj);

                respuesta.status = true;
                respuesta.message = "Actualizado estado corregida";

            }
            else if ((lobjs.Count(a => a.StatusEvaluacionId == 2) < cant_auditorias) && (lobjs.Count(a => a.StatusEvaluacionId == 2) > 0))
            {

                dataobject.StatusId = 2;
                curobj = funsetObject(log, dataobject, vvhttpmethod);
                curobj = vobj_sqldata.funPutPrograma_AuditoriaAll(log, curid, curobj);

                respuesta.status = true;
                respuesta.message = "Actualizado estado en revision";

            }


            jsonrspt = JsonConvert.SerializeObject(respuesta, Formatting.Indented);
        }

        return jsonrspt != null
            ? (ActionResult)new OkObjectResult(jsonrspt)
            : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
    }
    catch (Exception ex)
    {
        jsonrspt = JsonConvert.SerializeObject(ex.ToString(), Formatting.Indented);

        return (ActionResult)new OkObjectResult(jsonrspt);
    }

}






public static programa_auditoriaall funsetObject(ILogger log, dynamic dataobject, string vvmethod)
{
    // long vnid = 0;
    // if(vvmethod != "post")
    // {
    //     vnid    = dataobject?.Id;
    // }

    string vvcode             = dataobject?.Code;
    long vnespecialidadid     = 0;
    if(dataobject.EspecialidadId>0){
        vnespecialidadid  = dataobject?.EspecialidadId;
    }

    int vnstatusid = 0;
    if(dataobject?.StatusId>0){
        vnstatusid  = dataobject?.StatusId;
    }

    string vvevaluador_name   = dataobject?.Evaluador_name;
    string vvevaluador_code   = dataobject?.Evaluador_code;
    string vvyear             = dataobject?.Year;

    int? vvflagcompletada = null;
    if(dataobject?.Flag_Completada!=null){
        vvflagcompletada = dataobject?.Flag_Completada;
    }

    int vncantidadcorrecciones = 0;
    if(dataobject.CantidadCorrecciones>0){
        vncantidadcorrecciones  = dataobject?.CantidadCorrecciones;
    }


    string vvcreated_by       = dataobject?.Created_By;
    string vvlast_updated_by  = dataobject?.Last_Updated_By;

    programa_auditoriaall curobj = new programa_auditoriaall();
    //curobj.Id              = vnid;
    curobj.Code            = vvcode;
    curobj.EspecialidadId  = vnespecialidadid;
    curobj.StatusId        = vnstatusid;
    curobj.Evaluador_name  = vvevaluador_name;
    curobj.Evaluador_code  = vvevaluador_code;
    curobj.Year            = vvyear;
    curobj.Flag_Completada = vvflagcompletada;
    curobj.Cantidad_Correcciones = vncantidadcorrecciones;

    if(vvmethod == "post")
    {
        curobj.Created_By        = vvcreated_by;
        curobj.Created_Date      = System.DateTime.Now;
    }

    curobj.Last_Updated_By   = vvlast_updated_by;
    curobj.Last_Updated_Date = System.DateTime.Now;


    return curobj;
}

/*public static int funSendEmailToEvaluator(ILogger log, programa_auditoriaallget curobj)
{
    int result = 0;
    System.DateTime nuevaFecha = System.DateTime.Now;
    nuevaFecha = nuevaFecha.AddDays(7);//nuevaFecha.ToString("dd-MM-YYYY")
    //CONSTRUCCION DEL EMAIL.
    //OBJETO PARA LOS DATOS DEL CORREO
    DataEmailNew oDataEmailUser3 = new DataEmailNew();
    //DESTINATARIOS DEL CORREO
    oDataEmailUser3.sendto = "millanqjesus@gmail.com";
    Console.WriteLine("sendto: " + oDataEmailUser3.sendto);
    oDataEmailUser3.from = "sigtasa@tasa.com.pe"; //

    // ASUNTO DEL EMAIL.
    oDataEmailUser3.emailsubject = "Envio de Programa de Auditoria para su evaluación";

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
    Bodyuser3 = Bodyuser3 + "<p>El presente tiene la finaliadad informarle que se le envio el programa de auditorias  <strong>" +curobj.Code+ "</strong>. para su evaluaci&oacute;n hasta la fecha "+nuevaFecha.ToString("dd-MM-YYYY")+"</p>";


    Bodyuser3 = Bodyuser3 + "<p>Atte.</p>";
    //Bodyuser3 = Bodyuser3 + "<p>"+ curobj.NombreAuditorLider + "</p>";
    //Bodyuser3 = Bodyuser3 + "<p>"+ curobj.CargoAuditorLider  + "</p>";
    //Bodyuser3 = Bodyuser3 + "<p>"+ curobj.CorreoAuditorLider + "</p>";

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

    return result;
}//*/
