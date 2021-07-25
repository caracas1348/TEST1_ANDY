/****************************************************************************************
* VISUAL SAT - [2021]
* PROYECTO : SIGTASA
* ESQUEMA : SSOMA
* SPRINT  : 4
* MODULO : INCIDENTES ACCIDENTES
* OPERADORES_________________________________________________________________________
* | # | PROGRAMADOR     |  |      FECHA   |  |   HORA   |           CORREO           |
* | 1 | Andy Vásquez    |  |  27/03/2021  |  | 22:28:50 |    caracas1348@gmail.com   |
* |___|_________________|__|______________|__|__________|____________________________|
*
* DESCRIPCION: ARCHIVO SQL BACKEND DE FUNCIONALIDAD EN SERVIDOR QUE REGISTRA  EL LISTADO  
*              DE CORREO Y PERSONAS A QUIEN REMITIR LAS ALERTAS
*
* ARCHIVOS DE FRONT       ____________________________________
* | # |     MODULO             |  |         NOMBRE            |
* | 1 |      SSOMA             |  |  gestionIncidentes.html   |                       RUN 33 
* |___________________________________________________________|
*
* VERSION: 0.1 Beta
*******************************************************************************************/

//run 56
#r "Newtonsoft.Json"
#load "sql.csx"

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

static readonly HttpClient httpclient = new HttpClient();

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

    log.LogInformation("requestBody:" + requestBody);

    dynamic dataobject = JsonConvert.DeserializeObject(requestBody);

    EvidenciaPost curobj; //ojo clase

    //ReprogramacionPost curobjReprogramacion; //ojo clase

    DataSeguimientoPost vobj_sqldata = new DataSeguimientoPost();//ojo clase

   // log.LogInformation("..................otro paso linea 84:" + dataobject);

    //Metodo:  post
    if (vvhttpmethod == "post")
    {
        log.LogInformation("En vvhttpmethod == post.");

        curobj = funsetObjectEvidencia(log, dataobject, vvhttpmethod);//llamado al metodo ojo

        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        try
        {
           

            if(curobj.listadoDestinatarios.Count > 0)
            {
                log.LogInformation("imprimierndo lista BD------------------");     

                int n = 0;
                string correos = "";
                   foreach (var obj in curobj.listadoDestinatarios)
                  {//-------------------------------------------------------------------------------------------------------
                      
                        // log.LogInformation("Name = "+obj.Name); 
                        // log.LogInformation("UserHash = "+obj.UserHash); 
                        // log.LogInformation("Cargo = "+obj.Cargo); 
                        // log.LogInformation("Correo = "+obj.Correo); 
                        log.LogInformation("En try");
                        curobj = await vobj_sqldata.funPostSeguimientoEvidencia(log, curobj, obj);
                        if(obj.Id > 0)
                            {

                                log.LogInformation("En obj.Id > 0, obj.Id -> "+obj.Id);
                                log.LogInformation("Despues de scope.Complete()." );
                                if (n == 0)
                                {
                                    correos = System.Convert.ToString(obj.Correo);
                                }
                                else
                                {
                                    correos += ", " + System.Convert.ToString(obj.Correo);
                                }

                                n++;
                            }
                   }//--------foreach ---------------------------------------------------------------------------------------

                if(n > 0) 
                {
                    curobj.Id = 1;
                     //.....................debemos llamar la funcion que envia el correo
                       log.LogInformation("lista de envio = "+correos);
                        DataEmailNew oDataEmailUser3 = new DataEmailNew();
                        //oDataEmailUser3.sendto = System.Convert.ToString(item.Persona_Correo); //"millanqjesus@gmail.com";//person.email;//
                        oDataEmailUser3.sendto = correos;
                        oDataEmailUser3.from = "sigtasa@tasa.com.pe"; //
                        oDataEmailUser3.emailsubject = "Alerta de Incidente Accidente "+ curobj.Code; //Deberia ser el código ---OJO---
                        
                        //////////
                        var Bodyuser3 = "<body style='color: #ccc'><table border='0' cellpadding='0' cellspacing='0' style='max-width:100%;width:60%;margin: 0 auto;' id='tablota' ><tbody>";
                        Bodyuser3 = Bodyuser3 + "<tr>";
                        Bodyuser3 = Bodyuser3 + "<td align='center' valign='top'><table border='0' cellpadding='0' cellspacing='0' style='background-color:#fff;border-bottom:1px solid #ccc;font-family:Arial;font-weight:bold;line-height:100%;vertical-align:middle' width='100%'>";
                        Bodyuser3 = Bodyuser3 + "<tbody><tr><td style='padding-bottom: 15px;'><a  href='https://sigtasa.tasa.com.pe/'  target='_blank' title='TasaSsoma'> <img id='logo' alt='tasassoma' src='https://sigtasa.tasa.com.pe/images/logoSIGTASA.png' ></a></td></tr></tbody></table>";
                        Bodyuser3 = Bodyuser3 + "</td>";
                        Bodyuser3 = Bodyuser3 + "</tr>";
                        Bodyuser3 = Bodyuser3 + "<tr>";
                        Bodyuser3 = Bodyuser3 + "<td align='center'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><td style='background-color:#fff' valign='top'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><td><div style='color:#444 !important;font-family:Arial;font-size:14px;line-height:150%;text-align:left'>";
                        Bodyuser3 = Bodyuser3 + "<p>Estimado, Saludo Cordial:</p>";
                        Bodyuser3 = Bodyuser3 + "<p>Se adjunta el informe de Alerta  <strong>" + curobj.Code + "</strong> correspondiente a un Incidente/Accidente Generado, para su revisión.</p>";
                        Bodyuser3 = Bodyuser3 + "<p>Sin mas a que hacer referencia, me despido </p>";
                        Bodyuser3 = Bodyuser3 + "<p>Atte.</p>";
                        Bodyuser3 = Bodyuser3 + "<p style='color:#254373;'>"+ curobj.nameResponsable  + "</p>";
                        Bodyuser3 = Bodyuser3 + "<p style='color:#254373;'>"+ curobj.jobResponsable   + "</p>";
                        Bodyuser3 = Bodyuser3 + "<p>"+ curobj.emailResponsable + "</p>";
                       // Bodyuser3 = Bodyuser3 + "<p> <a href='http://localhost/A_MARZO_2021/tasassoma/reporteIncidenteMail.html?IdIcidenteAlerta=" + curobj.IdAlerta + "' target='_blank'> ReporteIncidente"+curobj.Code+".pdf</a></p>";
                        Bodyuser3 = Bodyuser3 + "<p> <a href='https://www.visualsatpe.com/beta/tasassoma/reporteIncidenteMail.html?IdIcidenteAlerta=" + curobj.IdAlerta + "' target='_blank'> ReporteIncidente"+curobj.Code+".pdf</a></p>";
                        //<a href='http://localhost/visualsat/2021/tasassoma/reporteIncidenteMail.html?IdIcidenteAlerta=56' target='_blank'>ReporteIncidente000725.pdf</a>
                        
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

                        log.LogInformation("AlertaPdf: " + Bodyuser3);
                        log.LogInformation("AlertaPdf: " + resultEmail);

                     //.....................debemos llamar la funcion que envia el correo
                    scope.Complete();
                }
                

                
                  
            }













            //log.LogInformation("En try");
            //curobj = await vobj_sqldata.funPostSeguimientoEvidencia(log, curobj);
            // if(curobj.Id > 0)
            // {
            //     log.LogInformation("En curobj.Id > 0, curobj.Id -> "+curobj.Id);

            //     //finalizamos la transaccion
            //     scope.Complete();
            //     log.LogInformation("Despues de scope.Complete()." );
            // }
        }
        catch (Exception ex)
        {
            curobj.Id      = 0;//id
            curobj.emailResponsable = System.Convert.ToString(ex.Message);//
            log.LogInformation("Catch :: " + ex.Message);//EvidenciaFile
        }

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);

    }


    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}


public static EvidenciaPost funsetObjectEvidencia(ILogger log, dynamic dataobject, string vvmethod)
{
    log.LogInformation("en  funsetObjectEvidencia.*********** entrando...");
    EvidenciaPost curobj = new EvidenciaPost();

    if (vvmethod == "post")
    {
        log.LogInformation("en  vvmethod == post.");
        curobj.IdAccidenteIncidente = dataobject?.IdAccidenteIncidente;//IdAccidenteIncidente

        curobj.IdAccidenteIncidente = dataobject?.IdAccidenteIncidente;
        curobj.IdAlerta             = dataobject?.IdAlerta;
        curobj.Code                 = dataobject?.Code;
        curobj.Created_By           = dataobject?.Created_By;
        curobj.emailResponsable     = dataobject?.emailResponsable;
        curobj.nameResponsable      = dataobject?.nameResponsable;
        curobj.jobResponsable       = dataobject?.jobResponsable;//OBJETO, LISTA DE CORREOS
        //curobj.listadoDestinatarios = dataobject?.listadoDestinatarios;
        
        log.LogInformation("en  funsetObjectEvidencia.*********** despues de leer parametros = "+curobj.emailResponsable);


        if(dataobject?.listadoDestinatarios.Count > 0)
            {
                log.LogInformation("LISTA ENVIO MAIL------------------");     

                List<listadoDestinatario> ListCorreo = new List<listadoDestinatario>();
                foreach (var obj in dataobject?.listadoDestinatarios)
                  {
                      listadoDestinatario lista = new listadoDestinatario();
                      lista.Name                = obj?.Name;
                      lista.UserHash            = obj?.UserHash;
                      lista.Cargo               = obj?.Cargo;
                      lista.Correo              = obj?.Correo;
                      lista.Id                  = 0;
                      ListCorreo.Add(lista);
                  }
                curobj.listadoDestinatarios = ListCorreo;
                  
            }
         
    }

   
    return curobj;
}

