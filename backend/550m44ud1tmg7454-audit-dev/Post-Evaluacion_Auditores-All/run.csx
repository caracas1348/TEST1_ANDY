#r "Newtonsoft.Json"
#load "sqldb_evaluacion_auditores_all_post.csx"
#load "../Post-Informe_Auditoria-All/sqldb_informe_auditoria_all_post.csx"
#load "../Get-Auditoria-All/sqldb_auditoriaall_get.csx"
#load "../Post-Evaluacion_Respuestas-All/sqldb_evaluacion_respuestas_all_post.csx"
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

//PARA EL ENVIO DEL CORREO
static readonly HttpClient httpclient = new HttpClient();

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

    dynamic dataobject = JsonConvert.DeserializeObject(requestBody);

    //Lista de Objetos
    evaluacionAuditoresPostAll curobj = new evaluacionAuditoresPostAll();
    DataEvaluacionAuditoresPostAll evaluacion_auditores_post = new DataEvaluacionAuditoresPostAll();

    DataInformeAuditoriaAll DataInformeAuditoriaAll = new DataInformeAuditoriaAll();


    //Invocar INSERT
    if (vvhttpmethod == "sendEvaluation")
    {
        int resultado = 0;
        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        try
        {
            curobj = funsetObject(log, dataobject, vvhttpmethod);

            CodigoHash CodigoHash = new CodigoHash();
            CodigoHash = await DataInformeAuditoriaAll.funGenerarHashEvaluacionAuditor(log, 1);
            
            resultado = await evaluacion_auditores_post.funPostUpdatedHashCodeEvaluationAll(log, curobj, CodigoHash);

            if (resultado > 0)
            {
                reenvioEvaluacion reenvioEvaluacion = new reenvioEvaluacion();
                reenvioEvaluacion = await evaluacion_auditores_post.funGetDataReenvioEvaluacion(curobj);
            
                curobj.StatusEvaluacionId = 2;
                //objeto para los datos del email.
                DataEmailNew oDataEmailUser3 = new DataEmailNew();
                //destinatarios del correo.
                oDataEmailUser3.sendto = curobj.Correo;
                log.LogInformation("sendto: " + oDataEmailUser3.sendto);
                oDataEmailUser3.from = "sigtasa@tasa.com.pe"; //

                //ASUNTO: Encuesta de Evaluación del Auditor-Auditoria <interna, externa,legal>-<norma 1, norma2>-<nom_sede>
                oDataEmailUser3.emailsubject = "Encuesta de Evaluación del Auditor-Auditoría " + reenvioEvaluacion.TipoAuditoria + "-" + reenvioEvaluacion.Norma + "-" + reenvioEvaluacion.Sede;

                //Cuerpo del Correo
                var Bodyuser3 = "<body style='color: #ccc'><table border='0' cellpadding='0' cellspacing='0' style='max-width:100%;width:60%;margin: 0 auto;' id='tablota' ><tbody>";
                Bodyuser3 = Bodyuser3 + "<tr>";
                Bodyuser3 = Bodyuser3 + "<td align='center' valign='top'><table border='0' cellpadding='0' cellspacing='0' style='background-color:#fff;border-bottom:1px solid #ccc;font-family:Arial;font-weight:bold;line-height:100%;vertical-align:middle' width='100%'>";
                Bodyuser3 = Bodyuser3 + "<tbody><tr><td style='padding-bottom: 15px;'><a  href='https://sigtasa.tasa.com.pe/'  target='_blank' title='TasaSsoma'> <img id='logo' alt='TasaSsoma' src='https://sigtasa.tasa.com.pe/images/logoSIGTASA.png' width ='200px' height ='50px'></a></td></tr></tbody></table>";
                Bodyuser3 = Bodyuser3 + "</td>";
                Bodyuser3 = Bodyuser3 + "</tr>";
                Bodyuser3 = Bodyuser3 + "<tr>";
                Bodyuser3 = Bodyuser3 + "<td align='center'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><td style='background-color:#fff' valign='top'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><td><div style='color:#444 !important;font-family:Arial;font-size:14px;line-height:150%;text-align:left'>";
                Bodyuser3 = Bodyuser3 + "<p>Adjunto el enlace de evaluaci&oacute;n sobre el auditor y el desempeño de la autor&iacute;a. <strong></strong>.</p>";
                Bodyuser3 = Bodyuser3 + "<p> <a href='https://www.visualsatpe.com/beta/tasassoma/evaluacionAuditorMail.html?ListadoEvaluacionId=" + curobj.Id + "&HashEvaluacionTokens=" + reenvioEvaluacion.HashEvaluacionTokens + "'><strong>Enlace " + reenvioEvaluacion.Auditor + "</strong></a> </p>";
                //Bodyuser3 = Bodyuser3 + "<p> <a href='http://localhost/tasassomaSP2/tasassoma/evaluacionAuditorMail.html?ListadoEvaluacionId=" + curobj.Id + "&HashEvaluacionTokens=" + reenvioEvaluacion.HashEvaluacionTokens + "'><strong>Enlace " + reenvioEvaluacion.Auditor + "</strong></a> </p>";

                Bodyuser3 = Bodyuser3 + "<p>Atte.</p>";
                Bodyuser3 = Bodyuser3 + "<p>" + reenvioEvaluacion.NombreAuditorLider + "</p>";
                Bodyuser3 = Bodyuser3 + "<p>" + reenvioEvaluacion.CargoAuditorLider + "</p>";
                Bodyuser3 = Bodyuser3 + "<p>" + reenvioEvaluacion.CorreoAuditorLider + "</p>";
                
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
                var jsonuser3 = JsonConvert.SerializeObject(oDataEmailUser3);
                var datauser3 = new StringContent(jsonuser3, Encoding.UTF8, "application/json");
                var urlemail3 = "https://7454em4ils3nder-app.azurewebsites.net/api/VisitasaSendEmail?code=LXQwITmvDAAqXTgaDcBAkmbZXBCv5KnS6bY/XszaOjqHus4M3dbDzw==";
                httpclient.DefaultRequestHeaders.Add("apikey", "r$3#23516ewew5");
                var responseuser3 = await httpclient.PostAsync(urlemail3, datauser3);
                string resultEmail = responseuser3.Content.ReadAsStringAsync().Result;

                //finalizamos la transaccion
                scope.Complete();
            }

        }
        catch (Exception ex)
        {
            log.LogInformation("catch::" + ex.Message);
            curobj.Id = 0;
            curobj.Correo = System.Convert.ToString(ex.Message);
        }

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
    }

    if (vvhttpmethod == "postEvaluation")
    {
        //Lista de Objetos
        DataEvaluacionRespuestasPost evaluacion_respuestas_post = new DataEvaluacionRespuestasPost();
        List<evaluacionRespuestas> lobjs                        = new List<evaluacionRespuestas>();
        evaluacionRespuestas curobj2                            = new evaluacionRespuestas();
        long result = 0;
        int refuerzo = 0;
        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        try
        {
            
            lobjs = funsetObjectEvaluacionRespuestas(log, dataobject.Notas, vvhttpmethod);
            
            result = await evaluacion_auditores_post.GetFunStatusEvaluacion(lobjs[0].ListaEvaluacionId);

            if(result==2)
            {

                lobjs = await evaluacion_respuestas_post.funPostEvaluationResponsesAll(log, lobjs);

                if (lobjs.Count(a => a.Id == 0) == 0)
                {
                    refuerzo = await evaluacion_respuestas_post.FunPutNecesitaRefuezo(log, lobjs[0]);
                    if (refuerzo > 0)
                    {
                        //finalizamos la transaccion
                        scope.Complete();
                    }
                    else
                    {
                        lobjs = new List<evaluacionRespuestas>();
                        curobj2 = new evaluacionRespuestas();
                        curobj2.Id = 0;
                        lobjs.Add(curobj2);
                    }
                }
                else
                {
                    lobjs      = new List<evaluacionRespuestas>();
                    curobj2    = new evaluacionRespuestas();
                    curobj2.Id = 0;
                    lobjs.Add(curobj2);

                }//*/
            }
            else
            {
                lobjs      = new List<evaluacionRespuestas>();
                curobj2    = new evaluacionRespuestas();
                curobj2.Id = 0;
                lobjs.Add(curobj2);
            }

        }
        catch (Exception ex)
        {
            log.LogInformation("catch::" + ex.Message);
            lobjs      = new List<evaluacionRespuestas>();
            curobj2    = new evaluacionRespuestas();
            curobj2.Id = 0;
            lobjs.Add(curobj2);
        }//*/
        
        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(lobjs, Formatting.Indented);

    }

    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
} 

public static evaluacionAuditoresPostAll funsetObject(ILogger log, dynamic dataobject, string vvmethod)
{
    evaluacionAuditoresPostAll curobj = new evaluacionAuditoresPostAll();
    if (vvmethod == "sendEvaluation")
    {
        curobj.Id                 = dataobject?.Id;
        curobj.Correo             = dataobject?.Correo;
        curobj.Last_Updated_By    = dataobject?.Last_Updated_By;
        curobj.CorreoAuditorLider = dataobject?.CorreoAuditorLider;
    }
    
    return curobj;
}

public static List<evaluacionRespuestas> funsetObjectEvaluacionRespuestas(ILogger log, dynamic dataobject, string vvmethod)
{
    List< evaluacionRespuestas> lobjs = new List<evaluacionRespuestas>();
    evaluacionRespuestas curobj;

    if (vvmethod == "postEvaluation")
    {
        foreach (var item in dataobject)
        {
            curobj = new evaluacionRespuestas();

            curobj.Id                = 0;
            curobj.ListaEvaluacionId = item?.ListaEvaluacionId;
            curobj.PreguntaId        = item?.PreguntaId;
            curobj.EscalaNotasId     = item?.EscalaNotasId;
            curobj.Comentario        = item?.Comentario;
            curobj.Nota        		 = item?.Nota;

            lobjs.Add(curobj);
        }
    }

    return lobjs;
}
