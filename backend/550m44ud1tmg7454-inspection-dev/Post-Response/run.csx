#r "Newtonsoft.Json"
#load "sqldb_response_post.csx"
#load "sqldb_inspection_post.csx"
#load "../Post-Question-Response/sqldb_questionresponse_post.csx"
#load "../Post-Item-Response/sqldb_itemresponse_post.csx"
#load "../Post-Option-Response/sqldb_optionresponse_post.csx"
#load "../Get-Inspection/sqldb_inspection_get.csx"

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

    DataAccessResponsePost vobj_sqldata_response = new DataAccessResponsePost();
    DataAccessQuestionResponsePost vobj_sqldata_question_response = new DataAccessQuestionResponsePost();
    DataAccessItemResponsePost vobj_sqldata_item_response = new DataAccessItemResponsePost();
    DataAccessOptionResponsePost vobj_sqldata_option_response = new DataAccessOptionResponsePost();
    DataAccessPutStatusInspection vobj_sql_data_put_status_inspection = new DataAccessPutStatusInspection();
    DataAccessInspectionGet vobj_sqldata_inspection_get = new DataAccessInspectionGet();

    Response curobj = new Response();
    
    //Resp respuesta = new Resp();
    long newIdResponse = 0;
    int newIdISL = 0;
    long newIdQuestion = 0;
    long newIdQuestionItem = 0;
    long curid =0; 
    int statusinsp = 3;

    TimeZoneInfo tzi = TimeZoneInfo.FindSystemTimeZoneById("SA Pacific Standard Time"); 
 
    if(vvhttpmethod == "post")
    {
        if(dataobject.response_id>0){
            //borramos todo y guardams de nuevo u.u
            vobj_sqldata_response.funDeleteQuestions(log,(long)dataobject.response_id);
            newIdResponse = (long)dataobject.response_id;
            Response editresponse = new Response();
            editresponse.Last_Updated_By = dataobject.created_by;
            editresponse.Last_Updated_Date = TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);
            editresponse.FlagFinalize = dataobject.flag_finalize;
            editresponse = vobj_sqldata_response.funPutResponse(log,(long)dataobject.response_id, editresponse);

        }else{
            //registramos nueva respuesta 
            curobj =  funsetObjectResponse(log,dataobject,vvhttpmethod);   
            Task<long> curobjtaskresponse = vobj_sqldata_response.funPostResponse(log,curobj);
            curobjtaskresponse.Wait();
            newIdResponse = (long)curobjtaskresponse.Result;
            curobj.Id = newIdResponse;
            log.LogInformation("id de la inspeccion:" + newIdResponse);

        }

        if(dataobject.flag_finalize > 0)
        {
            statusinsp = 4;
        }
        
        var curobjinsp = vobj_sql_data_put_status_inspection.funPutStatusInspection(log, (long)dataobject.inspection_id, statusinsp, curobj.InspectorIdHash ,(string)dataobject.last_updated_by );

        var responseQuestionList = dataobject.response_question_list;
        if(responseQuestionList.Count > 0){
            foreach (var question in responseQuestionList) {
                QuestionResponse qrobj = new QuestionResponse();
                log.LogInformation("id de la inspeccion :"+newIdResponse);
                question.response_id = newIdResponse;
                question.created_by = dataobject.created_by;
                question.last_updated_by = dataobject.last_updated_by;  

                qrobj = funsetObjectQuestionResponse(log, question, vvhttpmethod);
                Task<long> curobjtaskQresponse = vobj_sqldata_question_response.funPostQuestionResponse(log, qrobj);  
                curobjtaskQresponse.Wait();
                newIdQuestion = (long)curobjtaskQresponse.Result;    

                var responseItemList = question.response_item_list;
                if(responseItemList.Count > 0){
                    foreach (var item in responseItemList) {
                        ItemResponse irobj = new ItemResponse();
                        log.LogInformation("id de la inspeccion :"+newIdQuestion);
                        item.question_response_id = newIdQuestion;
                        item.created_by = dataobject.created_by;
                        item.last_updated_by = dataobject.last_updated_by; 

                        irobj = funsetObjectItemResponse(log, item, vvhttpmethod);
                        Task<long> curobjtaskIresponse = vobj_sqldata_item_response.funPostItemResponse(log, irobj);
                        curobjtaskIresponse.Wait();
                        newIdQuestionItem = (long)curobjtaskIresponse.Result;

                        if(item.response_option_list!=null){
                            var responseOptionList = item.response_option_list;
                            if(responseOptionList.Count > 0){
                                foreach (var option in responseOptionList)
                                {
                                    OptionResponse orobj = new OptionResponse();
                                    option.item_response_id = newIdQuestionItem;
                                    option.created_by = dataobject.created_by;
                                    option.last_updated_by = dataobject.last_updated_by; 

                                    orobj = funsetObjectOptionResponse(log, option, vvhttpmethod);
                                    Task<long> curobjtaskOresponse = vobj_sqldata_option_response.funPostOptionResponse(log, orobj);
                                    curobjtaskOresponse.Wait();
                                    
                                }
                                
                            }                            
                        }


                    }
                }
            }
        }

        //VERIFICAMOS PARA ENVIAR CORREO
        if(dataobject.flag_finalize > 0)
        {
            InspectionGet oInspection = vobj_sqldata_inspection_get.funGetInspection(log, (long)dataobject.inspection_id);

            Inspector oInspector = vobj_sqldata_inspection_get.funGetInspector(log, oInspection.Created_By);

            DataEmailNew oDataEmailUser3 = new DataEmailNew();
            //oDataEmailUser3.sendto = System.Convert.ToString(item.Persona_Correo); //"millanqjesus@gmail.com";//person.email;//
            oDataEmailUser3.sendto = oInspector.Email+",kllancachahua@visualsat.com";
            oDataEmailUser3.from = "sigtasa@tasa.com.pe"; //
            oDataEmailUser3.emailsubject = "Alerta de Inspección "+ oInspection.Code; 
            
            //////////
            var Bodyuser3 = "<body style='color: #ccc'><table border='0' cellpadding='0' cellspacing='0' style='max-width:100%;width:60%;margin: 0 auto;' id='tablota' ><tbody>";
            Bodyuser3 = Bodyuser3 + "<tr>";
            Bodyuser3 = Bodyuser3 + "<td align='center' valign='top'><table border='0' cellpadding='0' cellspacing='0' style='background-color:#fff;border-bottom:1px solid #ccc;font-family:Arial;font-weight:bold;line-height:100%;vertical-align:middle' width='100%'>";
            Bodyuser3 = Bodyuser3 + "<tbody><tr><td style='padding-bottom: 15px;'><a  href='https://sigtasa.tasa.com.pe/'  target='_blank' title='TasaSsoma'> <img id='logo' alt='tasassoma' src='https://sigtasa.tasa.com.pe/images/logoSIGTASA.png' width ='200px' height ='50px'></a></td></tr></tbody></table>";
            Bodyuser3 = Bodyuser3 + "</td>";
            Bodyuser3 = Bodyuser3 + "</tr>";
            Bodyuser3 = Bodyuser3 + "<tr>";
            Bodyuser3 = Bodyuser3 + "<td align='center'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><td style='background-color:#fff' valign='top'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><td><div style='color:#444 !important;font-family:Arial;font-size:14px;line-height:150%;text-align:left'>";
            Bodyuser3 = Bodyuser3 + "<p>Estimado(a), saludos cordiales.</p>";
            Bodyuser3 = Bodyuser3 + "<p>Para informarle que la inspección con código <strong>" + oInspection.Code + "</strong> se encuentra en estado " + oInspection.StatusName + " para su revisión. </p>";
            Bodyuser3 = Bodyuser3 + "<p>Adjunto el acceso al sistema para su revisión</p>";
            Bodyuser3 = Bodyuser3 + "<p> <a href='https://sigtasa.tasa.com.pe/' target='_blank'> sigtasa.tasa.com.pe </a></p>";
            Bodyuser3 = Bodyuser3 + "<p>Quedo a la espera de sus comentarios.</p>";
            Bodyuser3 = Bodyuser3 + "<p>Atte.</p>";
            Bodyuser3 = Bodyuser3 + "<p style='color:#254373;'>"+ oInspection.InspectorName  + "</p>";
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
    

    //Invocar PUT
    /*if(vvhttpmethod == "put")
    {
        curid= System.Convert.ToInt32(req.Query["id"]); 
        curobj =  funsetObjectInspection(log,dataobject,vvhttpmethod );   
        curobj = vobj_sqldata_inspection.funPutInspection(log,curid,curobj);
        curobj.Id = curid;
        

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
    }*/

    
    //Invocar DELETE
    /*if(vvhttpmethod == "delete")
    {
        curid= System.Convert.ToInt64(req.Query["id"]);  
        vobj_sqldata_inspection.funDeleteInspection(log,curid);
        respuesta.status = true;
        jsonrspt = JsonConvert.SerializeObject(respuesta, Formatting.Indented);
    }*/

    return jsonrspt != null
        ? (ActionResult)new OkObjectResult($"{jsonrspt}")
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}

public static Response funsetObjectResponse(ILogger log, dynamic dataobject, string vvmethod)
{             
    TimeZoneInfo tzi = TimeZoneInfo.FindSystemTimeZoneById("SA Pacific Standard Time"); 

    string vvcreated_by = dataobject?.created_by;
    string vvlast_updated_by = dataobject?.last_updated_by;  

    string vvarea_responsible_id = dataobject.area_responsible_id; 
    string vvarea_responsible_name = dataobject.area_responsible_name; 
    string vvinspector_id_hash = dataobject.inspector_id_hash;


    long vninspection_id = 0;
    if (dataobject.inspection_id > 0) {
        vninspection_id = dataobject.inspection_id;
    }

    long vninspector_id = 0;
    if (dataobject.inspector_id>0) {
        vninspector_id = dataobject.inspector_id; 
    } 

    int vnflag_finalize = 0;
    if(dataobject.flag_finalize>0){
        vnflag_finalize = dataobject.flag_finalize;
    }

    Response curobj = new Response();

    curobj.AreaResponsibleId = vvarea_responsible_id;
    curobj.AreaResponsibleName = vvarea_responsible_name;
    curobj.InspectionId = vninspection_id;
    curobj.InspectorId = vninspector_id; 
    curobj.InspectorIdHash = vvinspector_id_hash;
    curobj.FlagFinalize = vnflag_finalize;
    if (vvmethod == "post")
    {
        curobj.Created_By = vvcreated_by;
        curobj.Created_Date = TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);;
    }

    curobj.Last_Updated_By  = vvlast_updated_by;
    curobj.Last_Updated_Date= TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);;  


    return curobj;
}

public static QuestionResponse funsetObjectQuestionResponse(ILogger log, dynamic dataobject, string vvmethod)
{             
    TimeZoneInfo tzi = TimeZoneInfo.FindSystemTimeZoneById("SA Pacific Standard Time"); 

    string vvcreated_by = dataobject?.created_by;
    string vvlast_updated_by = dataobject?.last_updated_by;  

    long vnresponse_id = 0;
    if (dataobject.response_id>0) {
        vnresponse_id = dataobject.response_id; 
    } 

    long vnquestion_id = 0;
    if (dataobject.question_id > 0) {
        vnquestion_id = dataobject.question_id;
    }

    string vvquestion_description = dataobject?.question_description; 

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

    string vvcreated_by = dataobject?.created_by;
    string vvlast_updated_by = dataobject?.last_updated_by;  

    long vnquestion_response_id = 0;
    if (dataobject.question_response_id>0) {
        vnquestion_response_id = dataobject.question_response_id; 
    } 

    int vnquestion_item_id = 0;
    if (dataobject.question_item_id > 0) {
        vnquestion_item_id = dataobject.question_item_id;
    }

    int vntype_object_id = 0;
    if (dataobject.type_object_id>0) {
        vntype_object_id = dataobject.type_object_id; 
    } 

    string vvitem_description = dataobject?.item_description;
    string vvjustify = dataobject?.justify; 

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

public static OptionResponse funsetObjectOptionResponse(ILogger log, dynamic dataobject, string vvmethod)
{             
    TimeZoneInfo tzi = TimeZoneInfo.FindSystemTimeZoneById("SA Pacific Standard Time"); 

    string vvcreated_by = dataobject?.created_by;
    string vvlast_updated_by = dataobject?.last_updated_by;  

    long vnitem_response_id = 0;
    if (dataobject.item_response_id>0) {
        vnitem_response_id = dataobject.item_response_id; 
    } 

    int vnitem_option_id = 0;
    if (dataobject.item_option_id > 0) {
        vnitem_option_id = dataobject.item_option_id;
    }

    string vvoption_description = dataobject?.option_description;
    string vvtext = dataobject?.text;

    OptionResponse curobj = new OptionResponse();

    curobj.ItemResponseId = vnitem_response_id;
    curobj.ItemOptionId = vnitem_option_id;
    curobj.OptionDescription = vvoption_description; 
    curobj.Text = vvtext;

    if (vvmethod == "post")
    {
        curobj.Created_By = vvcreated_by;
        curobj.Created_Date = TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);;
    }

    curobj.Last_Updated_By  = vvlast_updated_by;
    curobj.Last_Updated_Date= TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);;  


    return curobj;
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