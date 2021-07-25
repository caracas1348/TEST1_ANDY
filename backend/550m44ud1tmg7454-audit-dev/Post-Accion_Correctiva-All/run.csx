#r "Newtonsoft.Json"
#load "sqldb_accioncorrectivaall_post.csx"
//#load "../Get-Hallazgos-All/sqldb_hallazgosall_get.csx"


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

    // Objetos a Utilizar
    AccionCorrectivaPost curobj;
    DataAccionCorrectivaPostAll vobj_sqldata = new DataAccionCorrectivaPostAll();

    IntegrantesAnalisis curobjIA;
    AnalisisProblema curobjAP;

    //Metodo:  listado de evaluacion de auditores
    if (vvhttpmethod == "post")
    {

        log.LogInformation("Post:");
        curobj = funsetObject(log, dataobject, vvhttpmethod);
        log.LogInformation("despues de funsetObject");
        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        try
        {
            if(curobj.Id==0)// Insertamos la Accion Correctiva
            {
                log.LogInformation("Post: vamos a insertar AccionCorrectiva");
                curobj = await vobj_sqldata.funPostAccionCorrectiva(log, curobj);
            }
            else // Modificamos la Accion Correctiva
            {
                int result = 0;
                log.LogInformation("Post: vamos a modificar AccionCorrectiva "+curobj.Id);
                result = await vobj_sqldata.funPutAccionCorrectiva(log, curobj);
                if(result < 1)
                {
                    curobj.Id = 0;
                }
            }

            if(curobj.Id > 0)
            {
                bool resultado = true;
                //// IntegrantesAnalisis start
                foreach (IntegrantesAnalisis item in curobj.IntegrantesAnalisis)
                {
                    curobjIA = new IntegrantesAnalisis();
                    if(item.Id==0) // registramos Integrantes Analisis
                    {
                        log.LogInformation("Post: vamos a insertar IntegrantesAnalisis");
                        curobjIA = await vobj_sqldata.funPostIntegrantesAnalisis(log, item, curobj);

                        if(curobjIA.Id==0)
                        {
                            resultado = false;
                        }
                    }
                    else // Modificamos Integrantes Analisis
                    {
                        int result = 0;
                        log.LogInformation("Post: vamos a modificar el Integrante Analisis "+ item.Id);
                        result = await vobj_sqldata.funPutIntegrantesAnalisis(log, item, curobj);
                        if(result < 1)
                        {
                            resultado = false;
                        }
                    }
                }
                //// IntegrantesAnalisis end

                //// EnvioACR start
                foreach (EnvioACR item in curobj.EnvioACR)
                {
                    EnvioACR curobjEnvio = new EnvioACR();
                    curobjEnvio = await vobj_sqldata.funPostEnvioACR(log, item);

                    if(curobjEnvio.Id==0){ resultado = false; }
                }
                //// EnvioACR end

                //// AnalisisProblema start
                if(curobj.AnalisisProblema!=null)
                {
                    foreach (AnalisisProblema item in curobj.AnalisisProblema)
                    {
                        item.HAAccionCorrectivaId = curobj.Id;
                        curobjAP = new AnalisisProblema();
                        if(item.Id==0) // registramos Integrantes Analisis
                        {
                            log.LogInformation("Post: vamos a insertar AnalisisProblema 1 porque");
                            curobjAP = await vobj_sqldata.funPostAnalisisProblema(log, item);
                        }else{
                            log.LogInformation("Post: vamos a modificar AnalisisProblema 1 porque "+curobjAP.Id);
                            int result = 0;
                            result = await vobj_sqldata.funPutAnalisisProblema(log, item);
                            //si actualizdo igualamos el objeto temporal al item del foreach
                            if(result!=0) curobjAP = item;
                        }
                        if(curobjAP.Id==0) { resultado = false; }

                        ////////////// Analisis medidas cero fallas 1 start
                        log.LogInformation("Post: vamos a Insertar AnalisisMedidasCeroFallas 1 ");
                        if (item.AnalisisMedidasCeroFallas != null)
                        {
                            foreach (long mcfId in item.AnalisisMedidasCeroFallas)
                            {
                                int result = 0;

                                // AccionCorrectivaId, AnalisisProblemaId, MedidasCeroFallasId
                                result = await vobj_sqldata.funPostMedidasCeroFallas(log, curobj.Id, curobjAP.Id, mcfId, curobj.Created_By);

                                if(result==0) resultado = false;
                            }
                        }
                        ////////////// Analisis medidas cero fallas 1 end

                        ////////////// Plan Accion 1 start
                        log.LogInformation("Post: vamos a Insertar Plan Accion 1 ");
                        if (item.PlanAccion != null)
                        {
                            foreach (PlanAccion itemPlanAccion in item.PlanAccion)
                            {
                                int result = 0;
                                PlanAccion curobjPA1 = new PlanAccion();
                                // PlanAccion{}, AccionCorrectivaId, AnalisisProblemaId
                                curobjPA1 = await vobj_sqldata.funPostPlanAccion2(log, itemPlanAccion, curobj.Id, curobjAP.Id, curobj.Created_By);

                                if(curobjPA1.Id==0) resultado = false;
                            }
                        }
                        ////////////// Plan Accion 1 end


                        ///// 2 porque start
                        if(curobjAP.AnalisisProblema2!=null)
                        {
                            foreach (AnalisisProblema item2 in curobjAP.AnalisisProblema2)
                            {
                                item2.HAAccionCorrectivaId = curobj.Id;
                                AnalisisProblema curobjAP2 = new AnalisisProblema();
                                log.LogInformation("Post: vamos a insertar AnalisisProblema 2 porque");
                                item2.HAAnalisisProblemasId = curobjAP.Id;

                                if(item2.Id==0)
                                {
                                    curobjAP2 = await vobj_sqldata.funPostAnalisisProblema(log, item2);
                                    item2.Id = curobjAP2.Id;
                                }
                                else{
                                    log.LogInformation("Post: vamos a modificar AnalisisProblema 2 porque "+item2.Id);
                                    int result = 0;
                                    result = await vobj_sqldata.funPutAnalisisProblema(log, item2);
                                    //si actualizdo igualamos el objeto temporal al item del foreach
                                    if(result!=0) curobjAP2 = item2;
                                }
                                if (curobjAP2.Id == 0) { resultado = false; }

                                ////////////// Analisis medidas cero fallas 2 start
                                log.LogInformation("Post: vamos a Insertar AnalisisMedidasCeroFallas 2 ");
                                if (item2.AnalisisMedidasCeroFallas != null)
                                {
                                    foreach (long mcfId in item2.AnalisisMedidasCeroFallas)
                                    {
                                        int result = 0;
                                        // AccionCorrectivaId, AnalisisProblemaId, MedidasCeroFallasId
                                        result = await vobj_sqldata.funPostMedidasCeroFallas(log, curobj.Id, curobjAP2.Id, mcfId, curobj.Created_By);
                                        if(result==0) resultado = false;
                                    }
                                }
                                ////////////// Analisis medidas cero fallas 2 end

                                ////////////// Plan Accion 2 start
                                log.LogInformation("Post: vamos a Insertar Plan Accion 2 ");
                                if (item2.PlanAccion != null)
                                {
                                    foreach (PlanAccion itemPlanAccion in item2.PlanAccion)
                                    {
                                        int result = 0;
                                        PlanAccion curobjPA2 = new PlanAccion();
                                        // PlanAccion{}, AccionCorrectivaId, AnalisisProblemaId
                                        curobjPA2 = await vobj_sqldata.funPostPlanAccion2(log, itemPlanAccion, curobj.Id, curobjAP2.Id, curobj.Created_By);

                                        if(curobjPA2.Id==0) resultado = false;
                                    }
                                }
                                ////////////// Plan Accion 2 end

                                ///// 3 porque start
                                if(curobjAP2.AnalisisProblema2!=null)
                                {
                                    foreach (AnalisisProblema item3 in curobjAP2.AnalisisProblema2)
                                    {
                                        item3.HAAccionCorrectivaId = curobj.Id;
                                        AnalisisProblema curobjAP3 = new AnalisisProblema();
                                        log.LogInformation("Post: vamos a insertar AnalisisProblema 3 porque");
                                        item3.HAAnalisisProblemasId = curobjAP2.Id;

                                        if(item3.Id==0)
                                        {
                                            curobjAP3 = await vobj_sqldata.funPostAnalisisProblema(log, item3);
                                            item3.Id = curobjAP3.Id;
                                        }
                                        else
                                        {
                                            log.LogInformation("Post: vamos a modificar AnalisisProblema 3 porque "+item3.Id);
                                            int result = 0;
                                            result = await vobj_sqldata.funPutAnalisisProblema(log, item3);
                                            //si actualizdo igualamos el objeto temporal al item del foreach
                                            if(result!=0) curobjAP3 = item3;
                                        }

                                        if (curobjAP3.Id == 0){ resultado = false; }

                                        ////////////// Analisis medidas cero fallas 3 start
                                        log.LogInformation("Post: vamos a Insertar AnalisisMedidasCeroFallas 3 ");
                                        if (item3.AnalisisMedidasCeroFallas != null)
                                        {
                                            foreach (long mcfId in item3.AnalisisMedidasCeroFallas)
                                            {
                                                int result = 0;
                                                // AccionCorrectivaId, AnalisisProblemaId, MedidasCeroFallasId
                                                result = await vobj_sqldata.funPostMedidasCeroFallas(log, curobj.Id, curobjAP3.Id, mcfId, curobj.Created_By);
                                                if(result==0) resultado = false;
                                            }
                                        }
                                        ////////////// Analisis medidas cero fallas 3 end

                                        ////////////// Plan Accion 3 start
                                        log.LogInformation("Post: vamos a Insertar Plan Accion 3 ");
                                        if (item3.PlanAccion != null)
                                        {
                                            foreach (PlanAccion itemPlanAccion in item3.PlanAccion)
                                            {
                                                int result = 0;
                                                PlanAccion curobjPA3 = new PlanAccion();
                                                // PlanAccion{}, AccionCorrectivaId, AnalisisProblemaId
                                                curobjPA3 = await vobj_sqldata.funPostPlanAccion2(log, itemPlanAccion, curobj.Id, curobjAP3.Id, curobj.Created_By);

                                                if(curobjPA3.Id==0) resultado = false;
                                            }
                                        }
                                        ////////////// Plan Accion 3 end

                                        ///// 4 porque start
                                        if(curobjAP3.AnalisisProblema2!=null)
                                        {
                                            foreach (AnalisisProblema item4 in curobjAP3.AnalisisProblema2)
                                            {
                                                item4.HAAccionCorrectivaId = curobj.Id;
                                                AnalisisProblema curobjAP4 = new AnalisisProblema();
                                                log.LogInformation("Post: vamos a insertar AnalisisProblema 4 porque");
                                                item4.HAAnalisisProblemasId = curobjAP3.Id;

                                                if(item4.Id==0)
                                                {
                                                    curobjAP4 = await vobj_sqldata.funPostAnalisisProblema(log, item4);
                                                    item4.Id = curobjAP4.Id;
                                                }
                                                else
                                                {
                                                    log.LogInformation("Post: vamos a modificar AnalisisProblema 4 porque "+ item4.Id);
                                                    int result = 0;
                                                    result = await vobj_sqldata.funPutAnalisisProblema(log, item4);
                                                    //si actualizdo igualamos el objeto temporal al item del foreach
                                                    if(result!=0) curobjAP4 = item4;

                                                }
                                                if (curobjAP4.Id == 0){ resultado = false; }

                                                ////////////// Analisis medidas cero fallas 4 start
                                                log.LogInformation("Post: vamos a Insertar AnalisisMedidasCeroFallas 4 ");
                                                if (item4.AnalisisMedidasCeroFallas != null)
                                                {
                                                    foreach (long mcfId in item4.AnalisisMedidasCeroFallas)
                                                    {
                                                        int result = 0;
                                                        // AccionCorrectivaId, AnalisisProblemaId, MedidasCeroFallasId
                                                        result = await vobj_sqldata.funPostMedidasCeroFallas(log, curobj.Id, curobjAP4.Id, mcfId, curobj.Created_By);
                                                        if(result==0) resultado = false;
                                                    }
                                                }
                                                ////////////// Analisis medidas cero fallas 4 end

                                                ////////////// Plan Accion 4 start
                                                log.LogInformation("Post: vamos a Insertar Plan Accion 4 ");
                                                if (item4.PlanAccion != null)
                                                {
                                                    foreach (PlanAccion itemPlanAccion in item4.PlanAccion)
                                                    {
                                                        int result = 0;
                                                        PlanAccion curobjPA4 = new PlanAccion();
                                                        // PlanAccion{}, AccionCorrectivaId, AnalisisProblemaId
                                                        curobjPA4 = await vobj_sqldata.funPostPlanAccion2(log, itemPlanAccion, curobj.Id, curobjAP4.Id, curobj.Created_By);

                                                        if(curobjPA4.Id==0) resultado = false;
                                                    }
                                                }
                                                ////////////// Plan Accion 4 end

                                                ///// 5 porque start
                                                if(curobjAP4.AnalisisProblema2!=null)
                                                {
                                                    foreach (AnalisisProblema item5 in curobjAP4.AnalisisProblema2)
                                                    {
                                                        item5.HAAccionCorrectivaId = curobj.Id;
                                                        AnalisisProblema curobjAP5 = new AnalisisProblema();
                                                        log.LogInformation("Post: vamos a insertar AnalisisProblema 5 porque");
                                                        item5.HAAnalisisProblemasId = curobjAP4.Id;

                                                        if(item5.Id==0)
                                                        {
                                                            curobjAP5 = await vobj_sqldata.funPostAnalisisProblema(log, item5);
                                                            item5.Id = curobjAP5.Id;
                                                        }
                                                        else{
                                                            log.LogInformation("Post: vamos a modificar AnalisisProblema 5 porque"+item5.Id);
                                                            int result = 0;
                                                            result = await vobj_sqldata.funPutAnalisisProblema(log, item5);
                                                            //si actualizdo igualamos el objeto temporal al item del foreach
                                                            if(result!=0) curobjAP5 = item5;
                                                        }

                                                        if (curobjAP5.Id == 0){ resultado = false; }

                                                        ////////////// Analisis medidas cero fallas 5 start
                                                        log.LogInformation("Post: vamos a Insertar AnalisisMedidasCeroFallas 5 ");
                                                        if (item5.AnalisisMedidasCeroFallas != null)
                                                        {
                                                            foreach (long mcfId in item5.AnalisisMedidasCeroFallas)
                                                            {
                                                                int result = 0;
                                                                // AccionCorrectivaId, AnalisisProblemaId, MedidasCeroFallasId
                                                                result = await vobj_sqldata.funPostMedidasCeroFallas(log, curobj.Id, curobjAP5.Id, mcfId, curobj.Created_By);
                                                                if(result==0) resultado = false;
                                                            }
                                                        }
                                                        ////////////// Analisis medidas cero fallas 5 end

                                                        ////////////// Plan Accion 5 start
                                                        log.LogInformation("Post: vamos a Insertar Plan Accion 5 ");
                                                        if (item5.PlanAccion != null)
                                                        {
                                                            foreach (PlanAccion itemPlanAccion in item5.PlanAccion)
                                                            {
                                                                int result = 0;
                                                                PlanAccion curobjPA5 = new PlanAccion();
                                                                // PlanAccion{}, AccionCorrectivaId, AnalisisProblemaId
                                                                curobjPA5 = await vobj_sqldata.funPostPlanAccion2(log, itemPlanAccion, curobj.Id, curobjAP5.Id, curobj.Created_By);

                                                                if(curobjPA5.Id==0) resultado = false;
                                                            }
                                                        }
                                                        ////////////// Plan Accion 5 end
                                                    }
                                                }
                                                ///// 5 porque end

                                            }
                                        }
                                        ///// 4 porque end

                                    }
                                }
                                ///// 3 porque end

                            }
                        }
                        ///// 2 porque end

                    }
                }
                //// AnalisisProblema end



                if(resultado)
                {
                    //finalizamos la transaccion
                    scope.Complete();
                }
                else // indicamos que hubo algun fallo
                {
                    curobj = new AccionCorrectivaPost();
                    curobj.Id = 0;
                    curobj.Que = "Hubo algun error no se pudo completar el resgistro";
                }
            }
            else
            {
                curobj = new AccionCorrectivaPost();
                curobj.Id = 0;
                curobj.Que = "Hubo algun error no se pudo completar el resgistro";
            }
        }
        catch (Exception ex)
        {
            log.LogInformation("catch::" + ex.Message);
            curobj = new AccionCorrectivaPost();
            curobj.Id = 0;
            curobj.Que = System.Convert.ToString(ex.Message);
        }//*/

        //Enviar Correo de solicitud de evaluacion
        if(curobj.Flag_Completado==1 && curobj.Id !=0 )
        {
            log.LogInformation("Enviar Correo al evaluador curobj.Flag_Completado: "+curobj.HallazgoId);
            string correos = "";
            int i = 0;
            foreach (EnvioACR item in curobj.EnvioACR)
            {
                log.LogInformation("Correo a: "+item.Correo);
                if(i==0){
                    correos = item.Correo;
                }
                else {
                    correos = correos+", "+item.Correo;
                }
                i++;

                log.LogInformation("correos: "+correos);
                // obtenemos los datos del hallazgo
                HallazgosGet curobj3 = new HallazgosGet();
                DataHallazgo curobj4 = new DataHallazgo();
                curobj4 = await vobj_sqldata.funGetHallazgosAllList2(log
                                                                , curobj.HallazgoId
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
                oDataEmailUser3.sendto = item.Correo;//correos;//"jamedi2011@gmail.com";//"millanqjesus@gmail.com"; //curobj.ResponsableCorreo;
                
                //oDataEmailUser3.sendto = "dpajuelo@tasa.com.pe";//"millanqjesus@gmail.com"; //curobj.ResponsableCorreo;

                //oDataEmailUser3.from   = "sigtasa@tasa.com.pe"; //
                // SI environment == dev
                if( environment == "dev")
                {
                    //oDataEmailUser3.sendto = "kllancachahua@visualsat.com, orlyvila@visualsat.com, jmillan@visualsat.com, dpajuelo@tasa.com.pe";
                    //oDataEmailUser3.sendto = "dpajuelo@tasa.com.pe";
                    oDataEmailUser3.sendto = correosDev;
                }

                log.LogInformation("sendto: " + oDataEmailUser3.sendto);

                // ASUNTO DEL EMAIL.
                //Registro de hallazgo <tipo fuente>-<ID HALLAZGO>
                oDataEmailUser3.emailsubject = "Solicitud de Evaluación ACR y PLAN DE ACCIÓN - "+curobj3.Code_Hallazgo+"-"+curobj3.Fuente+"-"+curobj3.Sede;

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
                Bodyuser3 = Bodyuser3 + "<p>En la bandeja Hallazgo se encuentra registrado el Hallazgo de <strong>"+curobj3.Fuente+"-"+curobj3.Code_Hallazgo+"</strong> de la sede <strong>"+curobj3.Sede+"</strong>, en estado <strong>"+curobj3.StatusHallazgo+"</strong> para su atenci&oacute;n con la evaluaci&oacute;n y aprobaci&oacute;n del an&aacute;lisis causa ra&iacute;z y plan de acci&oacute;n formulados.</p>";

                Bodyuser3 = Bodyuser3 + "<p>Adjunto el acceso al sistema para su atenci&oacute;n:</p>";
                Bodyuser3 = Bodyuser3 + "<p><a href='https://sigtasa.tasa.com.pe/'> sigtasa.tasa.com.pe</a></p>";

                Bodyuser3 = Bodyuser3 + "<p><br>Quedo a la espera de sus comentarios.</p>";


                Bodyuser3 = Bodyuser3 + "<p>Atte.</p>";
                Bodyuser3 = Bodyuser3 + "<p>" + curobj3.ResponsableName + "</p>";
                Bodyuser3 = Bodyuser3 + "<p>" + curobj3.ResponsableCargo + "</p>";
                Bodyuser3 = Bodyuser3 + "<p>" + curobj3.ResponsableCorreo + "</p>";

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

        log.LogInformation("***** Antes de devolver resultados: "+curobj.Id);
        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);

    }

    //metodo para EvaluarACR
    if (vvhttpmethod == "EvaluarACR")
    {
        log.LogInformation("vvhttpmethod == EvaluarACR:");
        EvaluarACR EvaluarACR = new EvaluarACR();
        EvaluarACR = funSetObjectEvaluarACR(log, dataobject, vvhttpmethod);

        EvaluarACR = await vobj_sqldata.funEvaluarACR(log, EvaluarACR);

        if(EvaluarACR.FlagAccionACR==2)
        {
            // obtenemos los datos del hallazgo
            HallazgosGet curobj3 = new HallazgosGet();
            DataHallazgo curobj4 = new DataHallazgo();
            curobj4 = await vobj_sqldata.funGetHallazgosAllList2(log
                                                            , EvaluarACR.HallazgoId
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

            log.LogInformation("Code_Hallazgo: "+curobj3.Code_Hallazgo);

            //OBJETO PARA LOS DATOS DEL CORREO
            DataEmailNew oDataEmailUser3 = new DataEmailNew();
            //DESTINATARIOS DEL CORREO
            oDataEmailUser3.sendto = curobj3.ResponsableCorreo;
            
            // SI environment == dev
            if( environment == "dev")
            {
                oDataEmailUser3.sendto = correosDev;
            }            

            log.LogInformation("sendto: " + oDataEmailUser3.sendto);

            // ASUNTO DEL EMAIL.
            //Registro de hallazgo <tipo fuente>-<ID HALLAZGO>
            oDataEmailUser3.emailsubject = "Evaluación ACR y PLAN DE ACCIÓN - "+curobj3.Code_Hallazgo+"-"+curobj3.Fuente+"-"+curobj3.Sede;

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
            Bodyuser3 = Bodyuser3 + "<p>Para informarle que el an&aacute;lisis causa ra&iacute;z y plan de acci&oacute;n formulados del Hallazgo <strong>"+curobj3.Fuente+"-"+curobj3.Code_Hallazgo+"</strong> de la sede <strong>"+curobj3.Sede+"</strong>, se encuentra en estado <strong>"+curobj3.StatusAccionCorrectiva+"</strong> para su atenci&oacute;n desde el momento de recepci&oacute;n del presente correo.</p>";

            Bodyuser3 = Bodyuser3 + "<p>Adjunto el acceso al sistema para su atenci&oacute;n:</p>";
            //Bodyuser3 = Bodyuser3 + "<p><a href='https://sigtasa.tasa.com.pe/'> sigtasa.tasa.com.pe</a></p>";
            Bodyuser3 = Bodyuser3 + "<p><a href='"+urlSistema+"'> "+urlSistema+"</a></p>";

            Bodyuser3 = Bodyuser3 + "<p><br>Quedo a la espera de sus comentarios.</p>";


            Bodyuser3 = Bodyuser3 + "<p>Atte.</p>";
            Bodyuser3 = Bodyuser3 + "<p>" + EvaluarACR.EvaluadorName + "</p>";
            Bodyuser3 = Bodyuser3 + "<p>" + EvaluarACR.EvaluadorCargo + "</p>";
            Bodyuser3 = Bodyuser3 + "<p>" + EvaluarACR.EvaluadorCorreo + "</p>";

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

        log.LogInformation("Ante de devolver resultados: "+EvaluarACR.Id);
        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(EvaluarACR, Formatting.Indented);
    }


    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}

public static EvaluarACR funSetObjectEvaluarACR(ILogger log, dynamic dataobject, string vvmethod)
{
    log.LogInformation("funSetObjectEvaluarACR: "+vvmethod);

    EvaluarACR EvaluarACR = new EvaluarACR();
    if(dataobject?.Id!=null)                          EvaluarACR.Id = dataobject?.Id;
    if(dataobject?.HAAccionCorrectivaId!=null)        EvaluarACR.HAAccionCorrectivaId = dataobject?.HAAccionCorrectivaId;
    if(dataobject?.HallazgoId!=null)                  EvaluarACR.HallazgoId = dataobject?.HallazgoId;
    if(dataobject?.Active!=null)                      EvaluarACR.Active = dataobject?.Active;
    if(dataobject?.Created_By!=null)                  EvaluarACR.Created_By = dataobject?.Created_By;
    if(dataobject?.EvaluadorName!=null)               EvaluarACR.EvaluadorName = dataobject?.EvaluadorName;
    if(dataobject?.EvaluadorUserHash!=null)           EvaluarACR.EvaluadorUserHash = dataobject?.EvaluadorUserHash;
    if(dataobject?.EvaluadorCargo!=null)              EvaluarACR.EvaluadorCargo = dataobject?.EvaluadorCargo;
    if(dataobject?.EvaluadorCorreo!=null)             EvaluarACR.EvaluadorCorreo = dataobject?.EvaluadorCorreo;
    if(dataobject?.FlagAccionACR!=null)               EvaluarACR.FlagAccionACR = dataobject?.FlagAccionACR;
    if(dataobject?.EvaluadorCorreo!=null)             EvaluarACR.EvaluadorCorreo = dataobject?.EvaluadorCorreo;
    if(dataobject?.Observacion!=null)                 EvaluarACR.Observacion = dataobject?.Observacion;
    if(dataobject?.StatusAccionCorrectivaId!=null)    EvaluarACR.StatusEvaluacionAccionCorrectivaId = dataobject?.StatusAccionCorrectivaId;

    log.LogInformation("EvaluarACR.FlagAccionACR: "+EvaluarACR.FlagAccionACR);
    log.LogInformation("EvaluarACR.StatusEvaluacionAccionCorrectivaId: "+EvaluarACR.StatusEvaluacionAccionCorrectivaId);
    //if(dataobject?.StatusAccionCorrectivaId!=null)  EvaluarACR.StatusAccionCorrectivaId = dataobject?.StatusAccionCorrectivaId;
    if(dataobject?.StatusAccionCorrectivaId!=null)      EvaluarACR.StatusAccionCorrectivaId = (EvaluarACR.FlagAccionACR == 1) ? 6 : dataobject?.StatusAccionCorrectivaId;
    log.LogInformation("EvaluarACR.StatusAccionCorrectivaId: "+EvaluarACR.StatusAccionCorrectivaId);

    return EvaluarACR;
}


public static List<long> funsetMCF(ILogger log, dynamic dataobject)
{
    log.LogInformation("En funsetMCF: ");

    List<long> AnalisisMedidasCeroFallas = new List<long>();
    foreach (var item in dataobject)
    {
        Console.WriteLine("item " + item);
        AnalisisMedidasCeroFallas.Add(Convert.ToInt64(item));
    }

    return AnalisisMedidasCeroFallas;
}//*/

public static List<PlanAccion> funsetPlanAccion(ILogger log, dynamic dataobject)
{
    log.LogInformation("En funsetPlanAccion: ");
    // VARIABLE QUE ALMACENA EL ENTORNO DONDE SE EJECUTA (dev - prd)
    string environment = Environment.GetEnvironmentVariable("environment", EnvironmentVariableTarget.Process);
    log.LogInformation("environment -> " + environment);

    List<PlanAccion> ListadoPA = new List<PlanAccion>();

    foreach (var itemPA in dataobject)
    {
        PlanAccion PlanAccion = new PlanAccion();

        PlanAccion.Id               = itemPA.Id;
        PlanAccion.HAPlazoAccionId  = itemPA.HAPlazoAccionId;
        PlanAccion.HATipoAccionId   = itemPA.HATipoAccionId;
        PlanAccion.HAStatusAccionId = itemPA.HAStatusAccionId;
        PlanAccion.Responsable      = itemPA.Responsable;
        PlanAccion.UserHash         = itemPA.UserHash;
        PlanAccion.Cargo            = itemPA.Cargo;
        PlanAccion.Correo           = itemPA.Correo;
        PlanAccion.Fecha            = itemPA.Fecha2;
        PlanAccion.Accion           = itemPA.Accion;

        log.LogInformation("PlanAccion.UserHash" + PlanAccion.UserHash);
        if( environment == "dev" && PlanAccion.UserHash == "7dc7a1dc-0f54-40a5-a474-ce67f539f341")
        {
            PlanAccion.UserHash = "user-keyid-9692";
            PlanAccion.Correo   = "kllancachahua@visualsat.com";
            log.LogInformation("PlanAccion.UserHash" + PlanAccion.UserHash);
        }

        ListadoPA.Add(PlanAccion);
    }
    log.LogInformation("En funsetPlanAccion: Luego del foreach");


    return ListadoPA;
}//*/

public static AccionCorrectivaPost funsetObject(ILogger log, dynamic dataobject, string vvmethod)
{
    log.LogInformation("En funsetObject: ");
    AccionCorrectivaPost curobj       = new AccionCorrectivaPost();
    List<IntegrantesAnalisis> listado = new List<IntegrantesAnalisis>();
    List<PlanAccion> ListadoPA        = new List<PlanAccion>();
    //List<MedidasCeroFallas> listadoMCF      = new List<MedidasCeroFallas>();
    List<EnvioACR> ListadoEnvio       = new List<EnvioACR>();

    List<AnalisisProblema> listadoAnalisis = new List<AnalisisProblema>();
    List<AnalisisProblema> listadoAnalisis2;
    List<AnalisisProblema> listadoAnalisis3;
    List<AnalisisProblema> listadoAnalisis4;
    List<AnalisisProblema> listadoAnalisis5;

    if (vvmethod == "post")
    {
        curobj.Id                      = dataobject?.Id;
        curobj.HallazgoId              = dataobject?.HallazgoId;
        curobj.HACeroPerdidasId        = dataobject?.HACeroPerdidasId;
        curobj.UltimoNivel             = dataobject?.UltimoNivel;
        curobj.CeroPerdidasDescription = dataobject?.CeroPerdidasDescription == null ? "" : dataobject?.CeroPerdidasDescription;
        curobj.Que                     = dataobject?.Que == null ? "" : dataobject?.Que;
        curobj.Donde                   = dataobject?.Donde == null ? "" : dataobject?.Donde;
        curobj.Cuando                  = dataobject?.Cuando == null ? "" : dataobject?.Cuando;
        curobj.Como                    = dataobject?.Como == null ? "" : dataobject?.Como;
        curobj.Cual                    = dataobject?.Cual == null ? "" : dataobject?.Cual;
        curobj.Problema                = dataobject?.Problema == null ? "" : dataobject?.Problema;
        curobj.Requisito               = dataobject?.Requisito == null ? "" : dataobject?.Requisito;
        curobj.Created_By              = dataobject?.Created_By == null ? "" : dataobject?.Created_By;
        curobj.AreaId                  = dataobject?.AreaId;
        curobj.Flag_Definido           = dataobject?.Flag_Definido;
        curobj.Flag_Completado         = dataobject?.Flag_Completado;


        if(dataobject?.IntegrantesAnalisis != null)
        {
            log.LogInformation("Entro if IntegrantesAnalisis");
            foreach (var item in dataobject?.IntegrantesAnalisis)
            {
                log.LogInformation("Entro foreach IntegrantesAnalisis");
                IntegrantesAnalisis IntegrantesAnalisis = new IntegrantesAnalisis();
                log.LogInformation("luego new IntegrantesAnalisis()");
                //log.LogInformation("item[0].UserHash"+item[0].UserHash);
                log.LogInformation("IntegrantesAnalisis.UserHash"+IntegrantesAnalisis.UserHash);
                //log.LogInformation("item.UserHash"+item);

                IntegrantesAnalisis.UserHash = item.UserHash;
                log.LogInformation("IntegrantesAnalisis.UserHash "+IntegrantesAnalisis.UserHash );
                IntegrantesAnalisis.Name     = item.Name;
                log.LogInformation("IntegrantesAnalisis.Name "+IntegrantesAnalisis.Name );
                IntegrantesAnalisis.Email    = item.Email;
                log.LogInformation("IntegrantesAnalisis.Email "+IntegrantesAnalisis.Email );
                IntegrantesAnalisis.Cargo    = item.Cargo;
                log.LogInformation("IntegrantesAnalisis.Cargo "+IntegrantesAnalisis.Cargo );
                IntegrantesAnalisis.Deleted  = item.Deleted;
                log.LogInformation("IntegrantesAnalisis.Deleted "+IntegrantesAnalisis.Deleted );
                IntegrantesAnalisis.Id       = item.Id;
                log.LogInformation("IntegrantesAnalisis.Id "+IntegrantesAnalisis.Id );

                listado.Add(IntegrantesAnalisis);
            }//*/
        }
        curobj.IntegrantesAnalisis = listado;
        log.LogInformation("En funsetObject: IntegrantesAnalisis");

        if(dataobject?.AnalisisProblema != null)
        {
            foreach (var item in dataobject?.AnalisisProblema)
            {
                listadoAnalisis2 = new List<AnalisisProblema>();
                listadoAnalisis3 = new List<AnalisisProblema>();
                listadoAnalisis4 = new List<AnalisisProblema>();
                listadoAnalisis5 = new List<AnalisisProblema>();
                AnalisisProblema AnalisisProblema      = new AnalisisProblema();
                AnalisisProblema.Id                    = item.Id;
                AnalisisProblema.HAAccionCorrectivaId  = item.HAAccionCorrectivaId;
                AnalisisProblema.HAAnalisisProblemasId = item.HAAnalisisProblemasId;
                AnalisisProblema.Pregunta              = item.Pregunta;
                AnalisisProblema.Respuesta             = item.Respuesta;
                AnalisisProblema.Nivel                 = item.Nivel;
                AnalisisProblema.HAColoresAnalisisId   = item.HAColoresAnalisisId;
                AnalisisProblema.Code                  = item.Code;
                AnalisisProblema.Deleted               = item.Deleted;
                AnalisisProblema.Created_By            = curobj.Created_By;


                if(item.AnalisisProblema!=null)
                {
                    foreach (var item2 in item.AnalisisProblema)
                    {
                        AnalisisProblema AnalisisProblema2 = new AnalisisProblema();
                        AnalisisProblema2.Id                    = item2.Id;
                        AnalisisProblema2.HAAccionCorrectivaId  = item2.HAAccionCorrectivaId;
                        AnalisisProblema2.HAAnalisisProblemasId = item2.HAAnalisisProblemasId;
                        AnalisisProblema2.Pregunta              = item2.Pregunta;
                        AnalisisProblema2.Respuesta             = item2.Respuesta;
                        AnalisisProblema2.Nivel                 = item2.Nivel;
                        AnalisisProblema2.HAColoresAnalisisId   = item2.HAColoresAnalisisId;
                        AnalisisProblema2.Code                  = item2.Code;
                        AnalisisProblema2.Deleted               = item2.Deleted;
                        AnalisisProblema2.Created_By            = curobj.Created_By;
                        if(item2.AnalisisProblema!=null)
                        {
                            foreach (var item3 in item2.AnalisisProblema)
                            {
                                AnalisisProblema AnalisisProblema3 = new AnalisisProblema();
                                AnalisisProblema3.Id                    = item3.Id;
                                AnalisisProblema3.HAAccionCorrectivaId  = item3.HAAccionCorrectivaId;
                                AnalisisProblema3.HAAnalisisProblemasId = item3.HAAnalisisProblemasId;
                                AnalisisProblema3.Pregunta              = item3.Pregunta;
                                AnalisisProblema3.Respuesta             = item3.Respuesta;
                                AnalisisProblema3.Nivel                 = item3.Nivel;
                                AnalisisProblema3.HAColoresAnalisisId   = item3.HAColoresAnalisisId;
                                AnalisisProblema3.Code                  = item3.Code;
                                AnalisisProblema3.Deleted               = item3.Deleted;
                                AnalisisProblema3.Created_By            = curobj.Created_By;
                                ////////////////////
                                if(item3.AnalisisProblema!=null)
                                {
                                    foreach (var item4 in item3.AnalisisProblema)
                                    {
                                        AnalisisProblema AnalisisProblema4 = new AnalisisProblema();
                                        AnalisisProblema4.Id                    = item4.Id;
                                        AnalisisProblema4.HAAccionCorrectivaId  = item4.HAAccionCorrectivaId;
                                        AnalisisProblema4.HAAnalisisProblemasId = item4.HAAnalisisProblemasId;
                                        AnalisisProblema4.Pregunta              = item4.Pregunta;
                                        AnalisisProblema4.Respuesta             = item4.Respuesta;
                                        AnalisisProblema4.Nivel                 = item4.Nivel;
                                        AnalisisProblema4.HAColoresAnalisisId   = item4.HAColoresAnalisisId;
                                        AnalisisProblema4.Code                  = item4.Code;
                                        AnalisisProblema4.Deleted               = item4.Deleted;
                                        AnalisisProblema4.Created_By            = curobj.Created_By;
                                        ////////////////////********************
                                        if(item4.AnalisisProblema!=null)
                                        {
                                            foreach (var item5 in item4.AnalisisProblema)
                                            {
                                                AnalisisProblema AnalisisProblema5 = new AnalisisProblema();
                                                AnalisisProblema5.Id                    = item5.Id;
                                                AnalisisProblema5.HAAccionCorrectivaId  = item5.HAAccionCorrectivaId;
                                                AnalisisProblema5.HAAnalisisProblemasId = item5.HAAnalisisProblemasId;
                                                AnalisisProblema5.Pregunta              = item5.Pregunta;
                                                AnalisisProblema5.Respuesta             = item5.Respuesta;
                                                AnalisisProblema5.Nivel                 = item5.Nivel;
                                                AnalisisProblema5.HAColoresAnalisisId   = item5.HAColoresAnalisisId;
                                                AnalisisProblema5.Code                  = item5.Code;
                                                AnalisisProblema5.Deleted               = item5.Deleted;
                                                AnalisisProblema5.Created_By            = curobj.Created_By;

                                                // obtenemos las medidas para cero fallas start
                                                List<long> AnalisisMedidasCeroFallas5 = new List<long>();
                                                if (item5.AnalisisMedidasCeroFallas != null)
                                                {
                                                    AnalisisMedidasCeroFallas5                  = funsetMCF(log, item5.AnalisisMedidasCeroFallas);
                                                    AnalisisProblema5.AnalisisMedidasCeroFallas = AnalisisMedidasCeroFallas5;
                                                }
                                                // obtenemos las medidas para cero fallas end

                                                // obtenemos los planes de acccion start
                                                List<PlanAccion> PlanAccion5 = new List<PlanAccion>();
                                                if (item5.PlanAccion != null)
                                                {
                                                    PlanAccion5                  = funsetPlanAccion(log, item5.PlanAccion);
                                                    AnalisisProblema5.PlanAccion = PlanAccion5;
                                                }
                                                // obtenemos los planes de acccion end


                                                listadoAnalisis5.Add(AnalisisProblema5);
                                            }

                                            //5 porque
                                            AnalisisProblema4.AnalisisProblema2 = listadoAnalisis5;
                                            listadoAnalisis5                    = new List<AnalisisProblema>();
                                        }
                                        ////////////////////********************

                                        // obtenemos las medidas para cero fallas start
                                        List<long> AnalisisMedidasCeroFallas4 = new List<long>();
                                        if (item4.AnalisisMedidasCeroFallas != null)
                                        {
                                            AnalisisMedidasCeroFallas4                  = funsetMCF(log, item4.AnalisisMedidasCeroFallas);
                                            AnalisisProblema4.AnalisisMedidasCeroFallas = AnalisisMedidasCeroFallas4;
                                        }
                                        // obtenemos las medidas para cero fallas end

                                        // obtenemos los planes de acccion start
                                        List<PlanAccion> PlanAccion4 = new List<PlanAccion>();
                                        if (item4.PlanAccion != null)
                                        {
                                            PlanAccion4                  = funsetPlanAccion(log, item4.PlanAccion);
                                            AnalisisProblema4.PlanAccion = PlanAccion4;
                                        }
                                        // obtenemos los planes de acccion end


                                        listadoAnalisis4.Add(AnalisisProblema4);
                                    }

                                    //4 porque
                                    AnalisisProblema3.AnalisisProblema2 = listadoAnalisis4;
                                    listadoAnalisis4                    = new List<AnalisisProblema>();
                                }
                                ////////////////////

                                //List<CeroFallas> listCeroFallas = new List<CeroFallas>();
                                List<long> AnalisisMedidasCeroFallas3 = new List<long>();
                                if (item3.AnalisisMedidasCeroFallas != null)
                                {
                                    AnalisisMedidasCeroFallas3                  = funsetMCF(log, item3.AnalisisMedidasCeroFallas);
                                    AnalisisProblema3.AnalisisMedidasCeroFallas = AnalisisMedidasCeroFallas3;
                                }
                                // obtenemos las medidas para cero fallas end

                                // obtenemos los planes de acccion start
                                List<PlanAccion> PlanAccion3 = new List<PlanAccion>();
                                if (item3.PlanAccion != null)
                                {
                                    PlanAccion3                  = funsetPlanAccion(log, item3.PlanAccion);
                                    AnalisisProblema3.PlanAccion = PlanAccion3;
                                }
                                // obtenemos los planes de acccion end

                                listadoAnalisis3.Add(AnalisisProblema3);
                            }

                            //3 porque
                            AnalisisProblema2.AnalisisProblema2 = listadoAnalisis3;
                            listadoAnalisis3                    = new List<AnalisisProblema>();
                        }

                        //List<CeroFallas> listCeroFallas = new List<CeroFallas>();
                        List<long> AnalisisMedidasCeroFallas2 = new List<long>();
                        if (item2.AnalisisMedidasCeroFallas != null)
                        {
                            AnalisisMedidasCeroFallas2                  = funsetMCF(log, item2.AnalisisMedidasCeroFallas);
                            AnalisisProblema2.AnalisisMedidasCeroFallas = AnalisisMedidasCeroFallas2;
                        }
                        // obtenemos las medidas para cero fallas end

                        // obtenemos los planes de acccion start
                        List<PlanAccion> PlanAccion2 = new List<PlanAccion>();
                        if (item2.PlanAccion != null)
                        {
                            PlanAccion2                  = funsetPlanAccion(log, item2.PlanAccion);
                            AnalisisProblema2.PlanAccion = PlanAccion2;
                        }
                        // obtenemos los planes de acccion end

                        listadoAnalisis2.Add(AnalisisProblema2);
                    }

                    //2do porque
                    AnalisisProblema.AnalisisProblema2 = listadoAnalisis2;
                    listadoAnalisis2                   = new List<AnalisisProblema>();
                }

                // NO ES NECESARIO EL PRIMER PORQUE NUNCA TENDRA MEDIDAS
                // obtenemos las medidas para cero fallas start
                //List<CeroFallas> listCeroFallas = new List<CeroFallas>();
                List<long> AnalisisMedidasCeroFallas = new List<long>();
                if (item.AnalisisMedidasCeroFallas != null)
                {
                    AnalisisMedidasCeroFallas                  = funsetMCF(log, item.AnalisisMedidasCeroFallas);
                    AnalisisProblema.AnalisisMedidasCeroFallas = AnalisisMedidasCeroFallas;
                }
                // obtenemos las medidas para cero fallas end

                // obtenemos los planes de acccion start
                List<PlanAccion> PlanAccion = new List<PlanAccion>();
                if (item.PlanAccion != null)
                {
                    PlanAccion                  = funsetPlanAccion(log, item.PlanAccion);
                    AnalisisProblema.PlanAccion = PlanAccion;
                }
                // obtenemos los planes de acccion end

                // listado general 1er porque
                listadoAnalisis.Add(AnalisisProblema);

            }
        }
        curobj.AnalisisProblema = listadoAnalisis;
        log.LogInformation("En funsetObject: AnalisisProblema...");

        log.LogInformation("antes de if (dataobject?.EnvioACR != null )");
        if(dataobject?.EnvioACR != null)
        {
            log.LogInformation("En if EnvioACR != null ");
            foreach (var item in dataobject?.EnvioACR)
            {
                EnvioACR EnvioACR = new EnvioACR();
                EnvioACR.Id                   = item.Id;
                EnvioACR.HAAccionCorrectivaId = item.HAAccionCorrectivaId;
                EnvioACR.Name                 = item.Name;
                EnvioACR.UserHash             = item.UserHash;
                EnvioACR.Correo               = item.Correo;
                EnvioACR.Cargo                = item.Cargo;
                EnvioACR.Created_By           = item.Created_By;
                EnvioACR.Deleted              = item.Deleted;

                ListadoEnvio.Add(EnvioACR);
            }
        }
        curobj.EnvioACR = ListadoEnvio;
        log.LogInformation("En funsetObject: EnvioACR");

    }

    /*if(dataobject?.EnviarCorreo!=null)
    {   curobj.EnviarCorreo = dataobject?.EnviarCorreo; }//*/
    return curobj;//*/
}
