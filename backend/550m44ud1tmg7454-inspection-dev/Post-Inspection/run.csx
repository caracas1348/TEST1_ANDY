#r "Newtonsoft.Json"
#load "sqldb_inspection_post.csx"
#load "sqldb_sedeall_get.csx"
#load "../Post-Inspection-Status-Log/sqldb_inspectionstatuslog_post.csx"
#load "../Post-Response/sqldb_response_post.csx"
#load "../Post-Question-Response/sqldb_questionresponse_post.csx"
#load "../Post-Item-Response/sqldb_itemresponse_post.csx"
#load "../Post-Option-Response/sqldb_optionresponse_post.csx"
#load "../Get-Inspection/sqldb_inspection_get.csx"
#load "../Get-Inspection/sqldb_inspection_log_get.csx"
#load "../Post-Response/sqldb_inspection_post.csx"

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

    if (vvapikeysecure != vvapiKeyparameter )
    {
        vvhttpmethod="";
        jsonrspt="{}";
    }

    string requestBody = await new StreamReader(req.Body).ReadToEndAsync();

    log.LogInformation("requestBody:"+requestBody);

    dynamic dataobject = JsonConvert.DeserializeObject(requestBody);

    DataAccessInspection vobj_sqldata_inspection = new DataAccessInspection();
    DataAccessInspectionStatusLogPost vobj_sqldata_inspectionstatuslog = new DataAccessInspectionStatusLogPost();
    DataAccessResponsePost vobj_sqldata_response_post = new DataAccessResponsePost();
    DataAccessQuestionResponsePost vobj_sqldata_question_response = new DataAccessQuestionResponsePost();
    DataAccessItemResponsePost vobj_sqldata_item_response = new DataAccessItemResponsePost();
    DataAccessInspectionGet vobj_sqldata_inspection_get = new DataAccessInspectionGet();
    DataAccessOptionResponsePost vobj_sqldata_option_response = new DataAccessOptionResponsePost();
    DataAccessLogsInspectionGet vobj_sqldata_getinspectionstatuslog = new DataAccessLogsInspectionGet();
    DataAccessPutStatusInspection vobj_sql_data_put_status_inspection = new DataAccessPutStatusInspection();
    DataSedeAll vobj_sqldata_sede = new DataSedeAll();
    //DataAccessQuestion vobj_sqldata_question = new DataAccessQuestion();
    //DataAccessQuestionItem vobj_sqldata_questionitem = new DataAccessQuestionItem();
    Inspection curobj = new Inspection();
    InspectionStatusLog curisl = new InspectionStatusLog();
    LogsInspection curnisl = new LogsInspection();

    Resp respuesta = new Resp();
    long newIdInspection = 0;
    long newIdResponse = 0;
    long newIdQuestion = 0;
    long newIdQuestionItem = 0;
    long curid =0;

    TimeZoneInfo tzi = TimeZoneInfo.FindSystemTimeZoneById("SA Pacific Standard Time");

    if(vvhttpmethod == "post")
    {

        log.LogInformation("En vvhttpmethod == post ");
        List<sedeall> lsedes  = vobj_sqldata_sede.funGetSedeAllList(log, 0, (long)dataobject.location_id, null, null, 0, 1);

        string codesede = lsedes.First().Description;
        int statusinsp = 3;
        log.LogInformation("En vvhttpmethod == post " + statusinsp);
        curobj =  funsetObjectInspection(log,dataobject,vvhttpmethod);
        Task<long> curobjtaskform = vobj_sqldata_inspection.funPostInspection(log,curobj);
        curobjtaskform.Wait();
        newIdInspection = (long)curobjtaskform.Result;
        curobj.Id = newIdInspection;
        log.LogInformation("id de la inspeccion:" + newIdInspection);

        dataobject.inspection_id = newIdInspection;
        curisl = funsetObjectInspectionStatusLog(log,dataobject,vvhttpmethod);
        Task<long> curobjtaskisl = vobj_sqldata_inspectionstatuslog.funPostInspectionStatusLog(log,curisl);
        curobjtaskisl.Wait();

        if(dataobject.form_id == 358){
            log.LogInformation("dataobject.form_id == 358");
            if(dataobject.Flag_finalize > 0)
            {
                statusinsp = 4;

            }
            var curobjinsp = vobj_sql_data_put_status_inspection.funPutStatusInspection(log, newIdInspection, statusinsp, "" ,(string)dataobject.last_updated_by );

            var responseList = dataobject.response_list;

            if (responseList.Count > 0) {
                foreach (var response in responseList) {
                    Response robj = new Response();
                    log.LogInformation("id de la inspeccion :"+newIdInspection);
                    response.InspectionId = newIdInspection;
                    response.Created_By = dataobject.created_by;
                    response.Last_Updated_By = dataobject.last_updated_by;

                    robj = funsetObjectResponse(log, response, vvhttpmethod);
                    Task<long> curobjtaskresponse = vobj_sqldata_response_post.funPostResponse(log, robj);
                    curobjtaskresponse.Wait();
                    newIdResponse = (long)curobjtaskresponse.Result;

                    var responseQuestionList = response.response_question_list;
                    if(responseQuestionList.Count > 0){
                        foreach (var question in responseQuestionList) {
                            QuestionResponse qrobj = new QuestionResponse();
                            log.LogInformation("id de la inspeccion :"+newIdResponse);
                            question.ResponseId = newIdResponse;
                            question.Created_By = dataobject.created_by;
                            question.Last_Updated_By = dataobject.last_updated_by;

                            qrobj = funsetObjectQuestionResponse(log, question, vvhttpmethod);
                            Task<long> curobjtaskQresponse = vobj_sqldata_question_response.funPostQuestionResponse(log, qrobj);
                            curobjtaskQresponse.Wait();
                            newIdQuestion = (long)curobjtaskQresponse.Result;

                            var responseItemList = question.response_item_list;
                            if(responseItemList.Count > 0){
                                foreach (var item in responseItemList) {
                                    ItemResponse irobj = new ItemResponse();
                                    log.LogInformation("id de la inspeccion :"+newIdQuestion);
                                    item.QuestionResponseId = newIdQuestion;
                                    item.Created_By = dataobject.created_by;
                                    item.Last_Updated_By = dataobject.last_updated_by;

                                    irobj = funsetObjectItemResponse(log, item, vvhttpmethod);
                                    Task<long> curobjtaskIresponse = vobj_sqldata_item_response.funPostItemResponse(log, irobj);
                                    curobjtaskIresponse.Wait();
                                    newIdQuestionItem = (long)curobjtaskIresponse.Result;


                                }
                            }
                        }
                    }
                }
            }
        }else if(dataobject.form_id == 359){
            log.LogInformation("dataobject.form_id == 359");

            if(dataobject.Flag_finalize > 0)
            {
                statusinsp = 4;

            }
            var curobjinsp = vobj_sql_data_put_status_inspection.funPutStatusInspection(log, newIdInspection, statusinsp,"" ,(string)dataobject.last_updated_by );

            Response robj = new Response();
            log.LogInformation("id de la inspeccion :"+newIdInspection);
            dataobject.InspectionId = newIdInspection;
            dataobject.Created_By = dataobject.created_by;
            dataobject.InspectorIdHash = dataobject.inspector_id_hash;
            robj = funsetObjectResponse(log, dataobject, vvhttpmethod);
            Task<long> curobjtaskresponse = vobj_sqldata_response_post.funPostResponse(log, robj);
            curobjtaskresponse.Wait();
            newIdResponse = (long)curobjtaskresponse.Result;

            log.LogInformation("newIdResponse :"+newIdResponse);
            var questionlist = dataobject.dataAsk;
            log.LogInformation("questionlist :");
            if (questionlist.Count > 0) {

                log.LogInformation("if (questionlist.Count > 0) :");
                foreach (var question in questionlist) {
                    log.LogInformation("foreach (var question in questionlist) :");
                    //question
                    long IdQR1 = funpostQuestionIAS(newIdResponse,(long)question.QuestionId,(string)question.QuestionDescription,(string)dataobject.Created_By,(string)dataobject.Last_Updated_By,log);

                    if(IdQR1>0){
                        log.LogInformation(" if(IdQR1>0) :");
                        var itemList = question.items;
                        if (itemList.Count > 0) {

                            foreach (var item in itemList) {
                                //--------------------------------//
                                //item criticidad 2
                                long IdIR1 = funposrtItemIAS(IdQR1,(int)item.id,(string)item.title,6,null,(string)dataobject.Created_By,(string)dataobject.Last_Updated_By,log);

                                //opciones item criticidad 2
                                long IdOR1 = funposrtOptionIAS(IdIR1,(int)item.firstPointId,"0.33",(string)item.firstPoint, (string)dataobject.Created_By, (string)dataobject.Last_Updated_By,log);
                                long IdOR2 = funposrtOptionIAS(IdIR1,(int)item.secondPointId,"1",(string)item.secondPoint, (string)dataobject.Created_By, (string)dataobject.Last_Updated_By,log);
                                long IdOR3 = funposrtOptionIAS(IdIR1,(int)item.thirdPointId,"3",(string)item.thirdPoint, (string)dataobject.Created_By, (string)dataobject.Last_Updated_By,log);
                                //itemobservaciones
                                long IdIR2 = funposrtItemIAS(IdQR1,(int)item.observationId,"Observation",4,(string)item.observation,(string)dataobject.Created_By,(string)dataobject.Last_Updated_By,log);
                                //item criticidad
                                long IdIR3 = funposrtItemIAS(IdQR1,(int)item.criticality,null,6,null,(string)dataobject.Created_By,(string)dataobject.Last_Updated_By,log);
                                //-------------------------------//
                            }
                        }

                    }
                    //fin question
                }


            }

        }
        log.LogInformation("antes de if(dataobject.form_id!=358 && dataobject.form_id!=359)");
        if(dataobject.form_id!=358 && dataobject.form_id!=359){
            Inspection curUp = new Inspection();
            curUp.Code = codesede+newIdInspection;
            curUp.Last_Updated_By  = dataobject.last_updated_by;
            curUp.Last_Updated_Date= TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);;
            curUp = vobj_sqldata_inspection.funPutInspection(log,newIdInspection,curUp);
            curobj.Code = curUp.Code;
        }else{
            Inspection curUp = new Inspection();

            if(dataobject.form_id==358){//inopinadas
                curUp.Code = codesede+"F16"+newIdInspection;
            }else{//ias
                curUp.Code = codesede+"F49"+newIdInspection;
            }
            curUp.Last_Updated_By  = dataobject.last_updated_by;
            curUp.Last_Updated_Date= TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);;
            curUp = vobj_sqldata_inspection.funPutInspection(log,newIdInspection,curUp);
            curobj.Code = curUp.Code;
        }


        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
    }


    //Invocar PUT
    if(vvhttpmethod == "put")
    {
        curid= System.Convert.ToInt64(req.Query["id"]);

        if(curid==0){
            curid = System.Convert.ToInt64(dataobject.id);
        }

        log.LogInformation("curid :"+curid);

        InspectionGet oldobj = vobj_sqldata_inspection_get.funGetInspection(log, curid);

            int statusinsp = 3;

            if(dataobject.form_id == 358 || dataobject.form_id == 359){
                if(dataobject.Flag_finalize > 0)
                {
                    statusinsp = 4;
                    dataobject.status_id = 4;

                }else{
                    statusinsp = 3;
                    dataobject.status_id = 3;
                }
            }

            if(dataobject.status_id == 0){

                curnisl = vobj_sqldata_getinspectionstatuslog.funGetLogsInspection(log,curid);

                dataobject.status_id = curnisl.IdStatusPrevio;

                dataobject.inspection_id = curid;
                curisl = funsetObjectInspectionStatusLog(log,dataobject,"post");
                Task<long> curobjtaskisl = vobj_sqldata_inspectionstatuslog.funPostInspectionStatusLog(log,curisl);
                curobjtaskisl.Wait();


            }else if(dataobject.status_id != oldobj.StatusId){

                dataobject.inspection_id = curid;
                dataobject.inspector_id = dataobject?.inspector_id_hash;
                curisl = funsetObjectInspectionStatusLog(log,dataobject,"post");
                Task<long> curobjtaskisl = vobj_sqldata_inspectionstatuslog.funPostInspectionStatusLog(log,curisl);
                curobjtaskisl.Wait();

            }

            if(dataobject.form_id == 358){

                //var curobjinsp = vobj_sql_data_put_status_inspection.funPutStatusInspection(log, curid, statusinsp, "" ,(string)dataobject.last_updated_by );

                var responseList = dataobject.response_list;

                if (responseList.Count > 0) {
                    foreach (var response in responseList) {
                        Response robj = new Response();

                        response.Created_By = dataobject.created_by;
                        response.Last_Updated_By = dataobject.last_updated_by;

                        robj =  funsetObjectResponse(log,response,vvhttpmethod );
                        robj = vobj_sqldata_response_post.funPutResponse(log,(long)response.Id,robj);
                        robj.Id = curid;

                        var responseQuestionList = response.response_question_list;
                        if(responseQuestionList.Count > 0){
                            foreach (var question in responseQuestionList) {
                                QuestionResponse qrobj = new QuestionResponse();

                                question.Created_By = dataobject.created_by;
                                question.Last_Updated_By = dataobject.last_updated_by;

                                qrobj =  funsetObjectQuestionResponse(log,question,vvhttpmethod );
                                qrobj = vobj_sqldata_question_response.funPutQuestionResponse(log,(long)question.Id,qrobj);
                                qrobj.Id = question.Id;

                                var responseItemList = question.response_item_list;
                                if(responseItemList.Count > 0){
                                    foreach (var item in responseItemList) {
                                        ItemResponse irobj = new ItemResponse();

                                        item.Created_By = dataobject.created_by;
                                        item.Last_Updated_By = dataobject.last_updated_by;

                                        irobj =  funsetObjectItemResponse(log,item,vvhttpmethod );
                                        irobj = vobj_sqldata_item_response.funPutItemResponse(log,(long)item.Id,irobj);
                                        irobj.Id = item.Id;

                                    }
                                }
                            }
                        }
                    }
                }
            }else if(dataobject.form_id == 359){

                //var curobjinsp = vobj_sql_data_put_status_inspection.funPutStatusInspection(log, curid, statusinsp, "" ,(string)dataobject.last_updated_by );

                Response robj = new Response();

                dataobject.Created_By = dataobject.created_by;
                dataobject.Last_Updated_By = dataobject.last_updated_by;

                robj =  funsetObjectResponse(log,dataobject,vvhttpmethod );
                robj = vobj_sqldata_response_post.funPutResponse(log,(long)dataobject.ResponseId,robj);
                robj.Id = curid;

                var questionlist = dataobject.dataAsk;
                if (questionlist.Count > 0) {

                    foreach (var question in questionlist) {
                        //question
                        //long IdQR1 = funpostQuestionIAS(newIdResponse,(long)question.QuestionId,(string)question.QuestionDescription,(string)dataobject.Created_By,(string)dataobject.Last_Updated_By,log);
                        QuestionResponse qrobj = new QuestionResponse();

                        question.Created_By = dataobject.created_by;
                        question.Last_Updated_By = dataobject.last_updated_by;

                        qrobj =  funsetObjectQuestionResponse(log,question,vvhttpmethod );
                        qrobj = vobj_sqldata_question_response.funPutQuestionResponse(log,(long)question.Id,qrobj);
                        qrobj.Id = question.Id;

                        if(qrobj.Id>0){
                            var itemList = question.items;
                            if (itemList.Count > 0) {

                                foreach (var item in itemList) {
                                    //--------------------------------//
                                    //item criticidad 2
                                    //long IdIR1 = funposrtItemIAS(IdQR1,(int)item.id,(string)item.title,6,null,(string)dataobject.Created_By,(string)dataobject.Last_Updated_By,log);
                                    /*ItemResponse irobj = new ItemResponse();
                                    irobj.Last_Updated_By = dataobject.last_updated_by;
                                    irobj.Justify = item.justify;
                                    irobj.Created_Date = TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);
                                    irobj.Last_Updated_Date = TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);
                                    irobj = vobj_sqldata_item_response.funPutItemResponse(log,item.Id,irobj);
                                    irobj.Id = item.Id;*/

                                    //opciones item criticidad 2
                                    //long IdOR1 = funposrtOptionIAS(IdIR1,(int)item.firstPointId,"0.33",(string)item.firstPoint, (string)dataobject.Created_By, (string)dataobject.Last_Updated_By,log);
                                    OptionResponse orf = new OptionResponse();
                                    orf.Last_Updated_By = dataobject.last_updated_by;
                                    orf.Text = item.firstPoint;
                                    orf.Last_Updated_Date = TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);
                                    orf = vobj_sqldata_option_response.funPutOptionResponse(log,(long)item.firstPointResponseId,orf);
                                    orf.Id = item.firstPointResponseId;

                                    //long IdOR2 = funposrtOptionIAS(IdIR1,(int)item.secondPointId,"1",(string)item.firstPoint, (string)dataobject.Created_By, (string)dataobject.Last_Updated_By,log);
                                    OptionResponse ors = new OptionResponse();
                                    ors.Last_Updated_By = dataobject.last_updated_by;
                                    ors.Text = item.secondPoint;
                                    ors.Last_Updated_Date = TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);
                                    ors = vobj_sqldata_option_response.funPutOptionResponse(log,(long)item.secondPointResponseId,ors);
                                    ors.Id = item.secondPointResponseId;

                                    //long IdOR3 = funposrtOptionIAS(IdIR1,(int)item.thirdPointId,"3",(string)item.firstPoint, (string)dataobject.Created_By, (string)dataobject.Last_Updated_By,log);
                                    OptionResponse ort = new OptionResponse();
                                    ort.Last_Updated_By = dataobject.last_updated_by;
                                    ort.Text = item.thirdPoint;
                                    ort.Last_Updated_Date = TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);
                                    ort = vobj_sqldata_option_response.funPutOptionResponse(log,(long)item.thirdPointResponseId,ort);
                                    ort.Id = item.thirdPointResponseId;

                                    //itemobservaciones
                                    //long IdIR2 = funposrtItemIAS(IdQR1,(int)item.observationId,"Observation",4,(string)item.observation,(string)dataobject.Created_By,(string)dataobject.Last_Updated_By,log);
                                    ItemResponse irobs = new ItemResponse();
                                    irobs.Last_Updated_By = dataobject.last_updated_by;
                                    irobs.Justify = item.justify;
                                    irobs.Last_Updated_Date = TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);
                                    irobs = vobj_sqldata_item_response.funPutItemResponse(log,(long)item.ObservationResponseId,irobs);
                                    irobs.Id = item.ObservationResponseId;

                                    //item criticidad
                                    //long IdIR3 = funposrtItemIAS(IdQR1,(int)item.criticality,null,6,null,(string)dataobject.Created_By,(string)dataobject.Last_Updated_By,log);
                                    ItemResponse ircri = new ItemResponse();
                                    ircri.Last_Updated_By = dataobject.last_updated_by;
                                    ircri.QuestionItemId = item.criticality;
                                    ircri.Last_Updated_Date = TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);
                                    ircri = vobj_sqldata_item_response.funPutItemResponse(log,(long)item.criticalityResponseId,ircri);
                                    ircri.Id = item.criticalityResponseId;
                                    //-------------------------------//
                                }
                            }

                        }
                        //fin question
                    }


                }

            }


        dataobject.inspector_id = 0;
        curobj =  funsetObjectInspection(log,dataobject,vvhttpmethod );
        curobj = vobj_sqldata_inspection.funPutInspection(log,curid,curobj);
        curobj.Id = curid;

        if(dataobject.status_id==2){
            //SE ASIGNÓ INSPECTOR - ENVIO CORREO AL EMAIL DE INSPECTOR ASIGNADO DESDE EL FRONT -> dataobject.email

            Inspector oInspector = vobj_sqldata_inspection_get.funGetInspector(log, (string)dataobject.created_by);

            DataEmailNew oDataEmailUser3 = new DataEmailNew();
            //oDataEmailUser3.sendto = System.Convert.ToString(item.Persona_Correo); //"millanqjesus@gmail.com";//person.email;//
            oDataEmailUser3.sendto = (string)dataobject.email+",kllancachahua@visualsat.com";
            oDataEmailUser3.from = "sigtasa@tasa.com.pe"; //
            oDataEmailUser3.emailsubject = "Alerta de Inspección "+ oldobj.Code; 
            
            //////////
            var Bodyuser3 = "<body style='color: #ccc'><table border='0' cellpadding='0' cellspacing='0' style='max-width:100%;width:60%;margin: 0 auto;' id='tablota' ><tbody>";
            Bodyuser3 = Bodyuser3 + "<tr>";
            Bodyuser3 = Bodyuser3 + "<td align='center' valign='top'><table border='0' cellpadding='0' cellspacing='0' style='background-color:#fff;border-bottom:1px solid #ccc;font-family:Arial;font-weight:bold;line-height:100%;vertical-align:middle' width='100%'>";
            Bodyuser3 = Bodyuser3 + "<tbody><tr><td style='padding-bottom: 15px;'><a  href='https://sigtasa.tasa.com.pe/'  target='_blank' title='TasaSsoma'> <img id='logo' alt='tasassoma' src='https://sigtasa.tasa.com.pe/images/logoSIGTASA.png' width ='200px' height ='50px'></a></td></tr></tbody></table>";
            Bodyuser3 = Bodyuser3 + "</td>";
            Bodyuser3 = Bodyuser3 + "</tr>";
            Bodyuser3 = Bodyuser3 + "<tr>";
            Bodyuser3 = Bodyuser3 + "<td align='center'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><td style='background-color:#fff' valign='top'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><td><div style='color:#444 !important;font-family:Arial;font-size:14px;line-height:150%;text-align:left'>";
            Bodyuser3 = Bodyuser3 + "<p><strong>Estimado(a),</strong></p>";
            Bodyuser3 = Bodyuser3 + "<p>Para informarle que tiene una inspección asignada con código <strong>" + oldobj.Code + "</strong>. </p>";
            Bodyuser3 = Bodyuser3 + "<p>Para realizar la atención debe ingresar al app SIGTASA con sus credenciales: </p>";
            Bodyuser3 = Bodyuser3 + "<p> <a href='https://play.google.com/store/apps/details?id=com.tasassoma' target='_blank'> sigtasa </a></p>";
            Bodyuser3 = Bodyuser3 + "<p>La inspección asignada es de frecuencia: " + oldobj.FrequencyName + "</p>";
            Bodyuser3 = Bodyuser3 + "<p>Saludos cordiales</p>";
            Bodyuser3 = Bodyuser3 + "<p>Atte.</p>";
            Bodyuser3 = Bodyuser3 + "<p style='color:#254373;'>"+ oInspector.PersonName  + "</p>";
            Bodyuser3 = Bodyuser3 + "<p style='color:#254373;'>"+ oInspector.Email   + "</p>";
            //Bodyuser3 = Bodyuser3 + "<p>"+ curobj.emailResponsable + "</p>";
            //Bodyuser3 = Bodyuser3 + "<p> <a href='http://localhost/A_MARZO_2021/tasassoma/reporteIncidenteMail.html?IdIcidenteAlerta=" + curobj.IdAlerta + "' target='_blank'> ReporteIncidente"+curobj.Code+".pdf</a></p>";
            //Bodyuser3 = Bodyuser3 + "<p> <a href='https://sigtasa.tasa.com.pe/reporteIncidenteMail.html?IdIcidenteAlerta=" + lista[0].PlanAuditoriaId + "&Documento=Plan'>Plan Auditoria</a>  </p>";
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
        }

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
    }


    //Invocar DELETE
    if(vvhttpmethod == "delete")
    {
        curid= System.Convert.ToInt64(req.Query["id"]);
        vobj_sqldata_inspection.funDeleteInspection(log,curid);
        respuesta.status = true;
        jsonrspt = JsonConvert.SerializeObject(respuesta, Formatting.Indented);
    }

    if(vvhttpmethod == "assignNotification"){

        List<InspectionGet> oInsList = new List<InspectionGet>();

        oInsList = vobj_sqldata_inspection_get.funGetInspectionList( log, 0, null, 0, 0, 0, 0, 0, 0, 2, null, null, null, null, null, 0, null, null, null, 0, 0);

        foreach (var inspection in oInsList) {

            string FrequencyName = " No Programado ";

            if(inspection.FrequencyName!=null){
                FrequencyName = inspection.FrequencyName;
            }

            Inspector oInspector = vobj_sqldata_inspection_get.funGetInspector(log, inspection.Created_By);

            DataEmailNew oDataEmailUser3 = new DataEmailNew();
            //oDataEmailUser3.sendto = System.Convert.ToString(item.Persona_Correo); //"millanqjesus@gmail.com";//person.email;// 
            oDataEmailUser3.sendto = "kllancachahua@visualsat.com,dariepmio@gmail.com,"+(string)oInspector.Email;
            oDataEmailUser3.from = "sigtasa@tasa.com.pe"; //
            oDataEmailUser3.emailsubject = "Alerta de Inspección "+ inspection.Code; 
            
            //////////
            var Bodyuser3 = "<body style='color: #ccc'><table border='0' cellpadding='0' cellspacing='0' style='max-width:100%;width:60%;margin: 0 auto;' id='tablota' ><tbody>";
            Bodyuser3 = Bodyuser3 + "<tr>";
            Bodyuser3 = Bodyuser3 + "<td align='center' valign='top'><table border='0' cellpadding='0' cellspacing='0' style='background-color:#fff;border-bottom:1px solid #ccc;font-family:Arial;font-weight:bold;line-height:100%;vertical-align:middle' width='100%'>";
            Bodyuser3 = Bodyuser3 + "<tbody><tr><td style='padding-bottom: 15px;'><a  href='https://sigtasa.tasa.com.pe/'  target='_blank' title='TasaSsoma'> <img id='logo' alt='tasassoma' src='https://sigtasa.tasa.com.pe/images/logoSIGTASA.png' width ='200px' height ='50px'></a></td></tr></tbody></table>";
            Bodyuser3 = Bodyuser3 + "</td>";
            Bodyuser3 = Bodyuser3 + "</tr>";
            Bodyuser3 = Bodyuser3 + "<tr>";
            Bodyuser3 = Bodyuser3 + "<td align='center'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><td style='background-color:#fff' valign='top'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><td><div style='color:#444 !important;font-family:Arial;font-size:14px;line-height:150%;text-align:left'>";
            Bodyuser3 = Bodyuser3 + "<p><strong>Estimado(a),</strong></p>";
            Bodyuser3 = Bodyuser3 + "<p>Para informarle que tiene una inspección asignada con código <strong>" + inspection.Code + "</strong>. </p>";
            Bodyuser3 = Bodyuser3 + "<p>Para realizar la atención debe ingresar al app SIGTASA con sus credenciales: </p>";
            Bodyuser3 = Bodyuser3 + "<p> <a href='https://play.google.com/store/apps/details?id=com.tasassoma' target='_blank'> sigtasa </a></p>";
            Bodyuser3 = Bodyuser3 + "<p>La inspección asignada es de frecuencia: " + FrequencyName + "</p>";
            Bodyuser3 = Bodyuser3 + "<p>Saludos cordiales</p>";
            Bodyuser3 = Bodyuser3 + "<p>Atte.</p>";
            Bodyuser3 = Bodyuser3 + "<p style='color:#254373;'>"+ oInspector.PersonName  + "</p>";
            Bodyuser3 = Bodyuser3 + "<p style='color:#254373;'>"+ oInspector.Email   + "</p>";
            //Bodyuser3 = Bodyuser3 + "<p>"+ curobj.emailResponsable + "</p>";
            //Bodyuser3 = Bodyuser3 + "<p> <a href='http://localhost/A_MARZO_2021/tasassoma/reporteIncidenteMail.html?IdIcidenteAlerta=" + curobj.IdAlerta + "' target='_blank'> ReporteIncidente"+curobj.Code+".pdf</a></p>";
            //Bodyuser3 = Bodyuser3 + "<p> <a href='https://sigtasa.tasa.com.pe/reporteIncidenteMail.html?IdIcidenteAlerta=" + lista[0].PlanAuditoriaId + "&Documento=Plan'>Plan Auditoria</a>  </p>";
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

        }

    }

    return jsonrspt != null
        ? (ActionResult)new OkObjectResult($"{jsonrspt}")
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}

public static Inspection funsetObjectInspection(ILogger log, dynamic dataobject, string vvmethod)
{
    TimeZoneInfo tzi = TimeZoneInfo.FindSystemTimeZoneById("SA Pacific Standard Time");
    log.LogInformation("en funsetObjectInspection");
    string vvcreated_by = dataobject?.created_by;
    string vvlast_updated_by = dataobject?.last_updated_by;
    log.LogInformation("vvcreated_by -> "+vvcreated_by);

    string vvcode = dataobject?.code;

    log.LogInformation("vvcode -> "+vvcode);
    long vnform_id = 0;
    if (dataobject.form_id>0) {
        vnform_id = dataobject.form_id;
    }

    long vnarea_id = 0;
    if (dataobject.area_id > 0) {
        vnarea_id = dataobject.area_id;
    }

    long vnlocation_id = 0;
    if (dataobject.location_id>0) {
        vnlocation_id = dataobject.location_id;
    }

    int vnfrequency_id = 0;
    if (dataobject.frequency_id>0) {
        vnfrequency_id = dataobject.frequency_id;
    }

    int vnassignment_type_id = 0;
    if (dataobject.assignment_type_id>0) {
        vnassignment_type_id = dataobject.assignment_type_id;
    }

    int vntype = 0;
    if (dataobject.type>0) {
        vntype = dataobject.type;
    }

    int vnstatus_id = 0;
    if (dataobject.status_id>0) {
        vnstatus_id = dataobject.status_id;
    }

    long vninspector_id = 0;
    if (dataobject.inspector_id > 0) {
        vninspector_id = dataobject.inspector_id;
    }

    int vnworker_num = 0;
    if(dataobject.worker_num>0){
        vnworker_num = dataobject.worker_num;
    }

    string vvyear = dataobject?.year;
    string vvep = dataobject?.ep;
    string vvreason = dataobject?.reason;
    string vvdetail = dataobject?.detail;
    string vvinspector_id_hash = dataobject?.inspector_id_hash;
    string vvinspector_name = dataobject?.inspector_name;
    string vvinspector_job = dataobject?.inspector_job;
    string vvinspector_sign = dataobject?.inspector_sign;

    Inspection curobj = new Inspection();

    curobj.Code = vvcode;
    curobj.FormularioId = vnform_id;
    curobj.AreaId = vnarea_id;
    curobj.SedeId = vnlocation_id;
    curobj.FrecuenciaId = vnfrequency_id;
    curobj.AsignacionTipoId = vnassignment_type_id;
    curobj.TipoId = vntype;
    curobj.StatusId = vnstatus_id;
    curobj.Year = vvyear;
    curobj.InspectorId = vninspector_id;
    curobj.Ep = vvep;
    curobj.Reason = vvreason;
    curobj.Detail = vvdetail;
    curobj.InspectorIdHash = vvinspector_id_hash;
    curobj.InspectorName = vvinspector_name;
    curobj.InspectorJob = vvinspector_job;
    curobj.InspectorSign = vvinspector_sign;
    curobj.WorkerNum = vnworker_num;

    if (vvmethod == "post")
    {
        curobj.Created_By = vvcreated_by;
        curobj.Created_Date = TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);
    }

    curobj.Last_Updated_By  = vvlast_updated_by;
    curobj.Last_Updated_Date= TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);


    return curobj;
}

public static InspectionStatusLog funsetObjectInspectionStatusLog(ILogger log, dynamic dataobject, string vvmethod)
{
    TimeZoneInfo tzi = TimeZoneInfo.FindSystemTimeZoneById("SA Pacific Standard Time");

    string vvcreated_by = dataobject?.created_by;
    string vvlast_updated_by = dataobject?.last_updated_by;



    long vninspection_id = 0;
    if (dataobject.inspection_id>0) {
        vninspection_id = dataobject.inspection_id;
    }

    int vnstatus_id = 0;
    if (dataobject.status_id>0) {
        vnstatus_id = dataobject.status_id;
    }

    string vninspector_id = dataobject?.inspector_id;
    log.LogInformation("vninspector_id -> "+vninspector_id);


    int? vnactive = null;
    if(dataobject?.active!=null){
        vnactive = dataobject?.active;
    }


    string vvmotive = dataobject?.motive;


    InspectionStatusLog curobj = new InspectionStatusLog();

    curobj.InspectionId = vninspection_id;
    curobj.StatusId = vnstatus_id;
    curobj.InspectorId = vninspector_id;
    curobj.Active = vnactive;
    curobj.Motive = vvmotive;


    if (vvmethod == "post")
    {
        curobj.Created_By = vvcreated_by;
        curobj.Created_Date = TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);;
    }

    curobj.Last_Updated_By  = vvlast_updated_by;
    curobj.Last_Updated_Date= TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);;


    return curobj;
}

public static Response funsetObjectResponse(ILogger log, dynamic dataobject, string vvmethod)
{
    TimeZoneInfo tzi = TimeZoneInfo.FindSystemTimeZoneById("SA Pacific Standard Time");

    string vvcreated_by = dataobject?.Created_By;
    string vvlast_updated_by = dataobject?.Last_Updated_By;

    string vvarea_responsible_id = dataobject.AreaResponsibleId;
    string vvarea_responsible_name = dataobject.AreaResponsibleName;


    long vninspection_id = 0;
    if (dataobject.InspectionId > 0) {
        vninspection_id = dataobject.InspectionId;
    }

    long vninspector_id = 0;
    if (dataobject.InspectorId>0) {
        vninspector_id = dataobject.InspectorId;
    }

    string vvinspector_id_hash = dataobject?.InspectorIdHash;

    Response curobj = new Response();

    curobj.AreaResponsibleId = vvarea_responsible_id;
    curobj.AreaResponsibleName = vvarea_responsible_name;
    curobj.InspectionId = vninspection_id;
    curobj.InspectorId = vninspector_id;
    curobj.InspectorIdHash = vvinspector_id_hash;

    if (vvmethod == "post")
    {
        curobj.Created_By = vvcreated_by;
        curobj.Created_Date = TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);;
    }

    curobj.Last_Updated_By  = vvlast_updated_by;
    log.LogInformation("curobj.Last_Updated_By"+curobj.Last_Updated_By);
    curobj.Last_Updated_Date= TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);;


    return curobj;
}

public static QuestionResponse funsetObjectQuestionResponse(ILogger log, dynamic dataobject, string vvmethod)
{
    TimeZoneInfo tzi = TimeZoneInfo.FindSystemTimeZoneById("SA Pacific Standard Time");

    string vvcreated_by = dataobject?.Created_By;
    string vvlast_updated_by = dataobject?.Last_Updated_By;

    long vnresponse_id = 0;
    if (dataobject.ResponseId>0) {
        vnresponse_id = dataobject.ResponseId;
    }

    long vnquestion_id = 0;
    if (dataobject.QuestionId > 0) {
        vnquestion_id = dataobject.QuestionId;
    }

    string vvquestion_description = dataobject?.QuestionDescription;

    QuestionResponse curobj = new QuestionResponse();

    curobj.ResponseId = vnresponse_id;
    curobj.QuestionId = vnquestion_id;
    curobj.QuestionDescription = vvquestion_description;

    if (vvmethod == "post")
    {
        curobj.Created_By = vvcreated_by;
        curobj.Created_Date = TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);;
    }

    curobj.Last_Updated_By  = vvlast_updated_by;
    curobj.Last_Updated_Date= TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);;


    return curobj;
}

public static ItemResponse funsetObjectItemResponse(ILogger log, dynamic dataobject, string vvmethod)
{
    TimeZoneInfo tzi = TimeZoneInfo.FindSystemTimeZoneById("SA Pacific Standard Time");

    string vvcreated_by = dataobject?.Created_By;
    string vvlast_updated_by = dataobject?.Last_Updated_By;

    long vnquestion_response_id = 0;
    if (dataobject.QuestionResponseId>0) {
        vnquestion_response_id = dataobject.QuestionResponseId;
    }

    int vnquestion_item_id = 0;
    if (dataobject.QuestionItemId > 0) {
        vnquestion_item_id = dataobject.QuestionItemId;
    }

    int vntype_object_id = 0;
    if (dataobject.TypeObjectId>0) {
        vntype_object_id = dataobject.TypeObjectId;
    }

    string vvitem_description = dataobject?.ItemDescription;
    string vvjustify = dataobject?.Justify;

    ItemResponse curobj = new ItemResponse();

    curobj.QuestionResponseId = vnquestion_response_id;
    curobj.QuestionItemId = vnquestion_item_id;
    curobj.ItemDescription = vvitem_description;
    curobj.TypeObjectId = vntype_object_id;
    curobj.Justify = vvjustify;


    if (vvmethod == "post")
    {
        curobj.Created_By = vvcreated_by;
        curobj.Created_Date = TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);;
    }

    curobj.Last_Updated_By  = vvlast_updated_by;
    curobj.Last_Updated_Date= TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);;


    return curobj;
}

public static long funpostQuestionIAS(long rId,long qId,string title, string created, string updated,ILogger log)
{
    TimeZoneInfo tzi = TimeZoneInfo.FindSystemTimeZoneById("SA Pacific Standard Time");

    DataAccessQuestionResponsePost vobj_sqldata_question_response = new DataAccessQuestionResponsePost();

    QuestionResponse objQR = new QuestionResponse();
    objQR.ResponseId = rId;
    objQR.QuestionId = qId;
    objQR.QuestionDescription = title;
    objQR.Created_By = created;
    objQR.Created_Date = TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);;
    objQR.Last_Updated_By  = updated;
    objQR.Last_Updated_Date= TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);;
    Task<long> taskQR = vobj_sqldata_question_response.funPostQuestionResponse(log, objQR);
    taskQR.Wait();
    long IdQR = (long)taskQR.Result;

    log.LogInformation("IdQR -> "+IdQR);
    return IdQR;
}

public static long funposrtItemIAS(long qrId,int qiId,string title,int type,string justify, string created, string updated,ILogger log)
{
    TimeZoneInfo tzi = TimeZoneInfo.FindSystemTimeZoneById("SA Pacific Standard Time");

    DataAccessItemResponsePost vobj_sqldata_item_response = new DataAccessItemResponsePost();

    ItemResponse curobj = new ItemResponse();
    curobj.QuestionResponseId = qrId;
    curobj.QuestionItemId = qiId;
    curobj.ItemDescription = title;
    curobj.TypeObjectId = type;
    curobj.Justify = justify;
    curobj.Created_By = created;
    curobj.Created_Date = TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);
    curobj.Last_Updated_By  = updated;
    curobj.Last_Updated_Date= TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);
    Task<long> curobjtaskIresponse = vobj_sqldata_item_response.funPostItemResponse(log, curobj);
    curobjtaskIresponse.Wait();
    long IdIR = (long)curobjtaskIresponse.Result;

    return IdIR;
}


public static long funposrtOptionIAS(long irId,int ioId,string title,string text, string created, string updated,ILogger log)
{
    TimeZoneInfo tzi = TimeZoneInfo.FindSystemTimeZoneById("SA Pacific Standard Time");

    DataAccessOptionResponsePost vobj_sqldata_option_response = new DataAccessOptionResponsePost();

    OptionResponse curobj = new OptionResponse();
    curobj.ItemResponseId = irId;
    curobj.ItemOptionId = ioId;
    curobj.OptionDescription = title;
    curobj.Text = text;
    curobj.Created_By = created;
    curobj.Created_Date = TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);
    curobj.Last_Updated_By  = updated;
    curobj.Last_Updated_Date= TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);
    Task<long> curobjtaskOresponse = vobj_sqldata_option_response.funPostOptionResponse(log, curobj);
    curobjtaskOresponse.Wait();
    long IdIR = (long)curobjtaskOresponse.Result;

    return IdIR;
}

public class DataEmailNew
{
    public string sendto { get; set; }
    public string from { get; set; }
    public string emailsubject { get; set; }
    public string bodyhtml { get; set; }
    public List<Files> Attachments { get; set; }
}

public class Files
{
    public string base64 { get; set; }
    public string name { get; set; }
}