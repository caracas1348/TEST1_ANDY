#r "Newtonsoft.Json"
#load "../Get-Response/sqldb_response_get.csx"
#load "../Get-Question-Response/sqldb_questionresponse_get.csx"
#load "../Get-Item-Response/sqldb_itemresponse_get.csx"
#load "../Get-Option-Response/sqldb_optionresponse_get.csx"
#load "sqldb_inspection_get.csx"
#load "../Post-Inspection/sqldb_inspection_post.csx"
#load "../Post-Inspection-Status-Log/sqldb_inspectionstatuslog_post.csx"
#load "../Get-Inspection/sqldb_inspection_log_get.csx"

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

public static async Task<IActionResult> Run(HttpRequest req, ILogger log)
{
    log.LogInformation("C# HTTP trigger function processed a request.");

    var requestHeader = req.Headers;
    var vvapikeysecure = Environment.GetEnvironmentVariable("apikey",EnvironmentVariableTarget.Process);
    string vvapiKeyparameter = requestHeader["apiKey"];

    string vvhttpmethod = req.Query["httpmethod"];
    
    log.LogInformation("vvhttpmethod: "+vvhttpmethod);

    long vnid = System.Convert.ToInt64(req.Query["id"]);
    string vvcode = req.Query["code_inspection"];
    long vnform_id = System.Convert.ToInt64(req.Query["form_id"]);
    long vnarea_id = System.Convert.ToInt64(req.Query["area_id"]);
    long vnlocation_id = System.Convert.ToInt64(req.Query["location_id"]);
    int vnfrequency_id = System.Convert.ToInt32(req.Query["frequency_id"]);
    int vnassignment_type_id = System.Convert.ToInt32(req.Query["assignment_type_id"]);
    int vntype = System.Convert.ToInt32(req.Query["type"]);
    int vnstatus_id = System.Convert.ToInt32(req.Query["status_id"]);
    string vvyear = req.Query["year"];
    string vvcreated_by = req.Query["created_by"];
    string vvcreated_date = req.Query["created_date"];
    string vvlast_updated_by = req.Query["last_updated_by"];
    string vvlast_updated_date = req.Query["last_updated_date"];
    long vninspector_id = System.Convert.ToInt64(req.Query["inspector_id"]);
    string vvinspector_id_hash = req.Query["inspector_id_hash"];
    string vvinspection_name = req.Query["inspection_name"];
    string vvcreated_date_end = req.Query["created_date_end"];
    long vnunit_id = System.Convert.ToInt64(req.Query["unit_id"]);

    bool vardatevalidation_correct=true;

    try 
    {
        DateTime vdvalDate = System.DateTime.Now;
        vdvalDate = DateTime.ParseExact(vvcreated_date,"yyyy-MM-dd",CultureInfo.InvariantCulture);
        vdvalDate = DateTime.ParseExact(vvlast_updated_date,"yyyy-MM-dd",CultureInfo.InvariantCulture);
    }
    catch (Exception ex)
    {
        vardatevalidation_correct=false;
    }

    DataAccessInspectionGet vobj_inspectionData = new DataAccessInspectionGet();
    DataAccessResponseGet vobj_sqldataResponse = new DataAccessResponseGet();
    DataAccessInspection vobj_sqldata_inspection = new DataAccessInspection();
    DataAccessInspectionStatusLogPost vobj_sqldata_inspectionstatuslog = new DataAccessInspectionStatusLogPost();
    DataAccessLogsInspectionGet vobj_sqldatalogget = new DataAccessLogsInspectionGet();
    TimeZoneInfo tzi = TimeZoneInfo.FindSystemTimeZoneById("SA Pacific Standard Time"); 

    string jsonrspt = "";

    if (vvapikeysecure != vvapiKeyparameter )
    {
        vvhttpmethod="";
        jsonrspt="{}";
    }

    if (vvhttpmethod == "objectlist")
    {
        List<InspectionGet> lobjs = vobj_inspectionData.funGetInspectionList(log
                                                , vnid
                                                , vvcode
                                                , vnform_id
                                                , vnarea_id
                                                , vnlocation_id
                                                , vnfrequency_id
                                                , vnassignment_type_id
                                                , vntype
                                                , vnstatus_id
                                                , vvyear
                                                , vvcreated_by
                                                , vvcreated_date
                                                , vvlast_updated_by
                                                , vvlast_updated_date
                                                , vninspector_id
                                                , vvinspector_id_hash
                                                , vvinspection_name
                                                , vvcreated_date_end
                                                , vnunit_id
                                                , 1);

        jsonrspt = JsonConvert.SerializeObject(lobjs, Formatting.Indented);
    }

    if (vvhttpmethod == "objectlistapp")
    {
        List<InspectionGet> lobjs = vobj_inspectionData.funGetInspectionList(log
                                                , vnid
                                                , vvcode
                                                , vnform_id
                                                , vnarea_id
                                                , vnlocation_id
                                                , vnfrequency_id
                                                , vnassignment_type_id
                                                , vntype
                                                , vnstatus_id
                                                , vvyear
                                                , vvcreated_by
                                                , vvcreated_date
                                                , vvlast_updated_by
                                                , vvlast_updated_date
                                                , vninspector_id
                                                , vvinspector_id_hash
                                                , vvinspection_name
                                                , vvcreated_date_end
                                                , vnunit_id
                                                , 0);

        //List<InspectionGet> lobj2 = vobj_inspectionData.funGetInspectionList(log, 0, null, 0, 0, 0, 0, 0, 0, 0, null, null, null, null, null, 0, null, null, null, 0);
        listapp listapp = new listapp();
        /*listapp.numias =  lobj2.Count(i => i.FormularioId == 358);
        listapp.numinopinadas =  lobj2.Count(i => i.FormularioId == 359);*/
        listapp.lista = lobjs;

        jsonrspt = JsonConvert.SerializeObject(listapp, Formatting.Indented);
    }

    if (vvhttpmethod == "objectlistapp2")
    {
        List<InspectionGet> lobjs = vobj_inspectionData.funGetInspectionListApp(log
                                                , vnid
                                                , vvcode
                                                , vnform_id
                                                , vnarea_id
                                                , vnlocation_id
                                                , vnfrequency_id
                                                , vnassignment_type_id
                                                , vntype
                                                , vnstatus_id
                                                , vvyear
                                                , vvcreated_by
                                                , vvcreated_date
                                                , vvlast_updated_by
                                                , vvlast_updated_date
                                                , vninspector_id
                                                , vvinspector_id_hash
                                                , vvinspection_name
                                                , vvcreated_date_end
                                                , vnunit_id
                                                , 0
                                                , 0);

        List<InspectionGet> lobjsOtras = vobj_inspectionData.funGetInspectionListApp(log
                                                , vnid
                                                , vvcode
                                                , vnform_id
                                                , vnarea_id
                                                , vnlocation_id
                                                , vnfrequency_id
                                                , vnassignment_type_id
                                                , vntype
                                                , vnstatus_id
                                                , vvyear
                                                , vvinspector_id_hash
                                                , vvcreated_date
                                                , vvlast_updated_by
                                                , vvlast_updated_date
                                                , vninspector_id
                                                , null
                                                , vvinspection_name
                                                , vvcreated_date_end
                                                , vnunit_id
                                                , 0
                                                , 1);

        //List<InspectionGet> lobj2 = vobj_inspectionData.funGetInspectionList(log, 0, null, 0, 0, 0, 0, 0, 0, 0, null, null, null, null, null, 0, null, null, null, 0);
        listapp2 listapp = new listapp2();
        /*listapp.numias =  lobj2.Count(i => i.FormularioId == 358);
        listapp.numinopinadas =  lobj2.Count(i => i.FormularioId == 359);*/
        listapp.lista = lobjs;
        listapp.listaOtras = lobjsOtras;

        jsonrspt = JsonConvert.SerializeObject(listapp, Formatting.Indented);
    }

    if (vvhttpmethod == "object")
    {
        InspectionGet vobjs = vobj_inspectionData.funGetInspection(log, vnid);
        
        if( vobjs.Id > 0 )
        {
            jsonrspt = JsonConvert.SerializeObject(vobjs, Formatting.Indented);
        }
        else 
        {
            jsonrspt="{}"; 
        }
    }

    if(vvhttpmethod == "verifyInspections")
    {
        List<InspectionGet> lobjs = vobj_inspectionData.funGetInspectionList(log, 0, null, 0, 0, 0, 0, 0, 0, 0, null, null, null, null, null, 0, null, null, null, 0 , 1);

            if (lobjs.Count > 0) {

                IEnumerable<InspectionGet> lobjsf = lobjs.Where(i => i.StatusId == 2 || i.StatusId == 6 || i.StatusId == 4);

                DateTime now = TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);
                DateTime yesterday = now.AddDays(-1);
                int weekDayNow = (int)now.DayOfWeek;
                int dayNow = (int)now.Day;
                int monthNow = (int)now.Month;
                
                foreach (var inspection in lobjsf) {

                    List<Response> reslist = vobj_sqldataResponse.funGetResponseList(log,0,null,inspection.Id,0,null,0);
                    
                    log.LogInformation("Inspeccion : "+inspection.Id);

                    if(inspection.FrecuenciaId == 1){
                        log.LogInformation("es frecuencia 1");

                        //if(weekDayNow != 0){
                            if(inspection.StatusId == 2 || inspection.StatusId == 6){
                                log.LogInformation("ESTADO 2 O 6 ");
                                int coincidencia = reslist.Count(r => r.Created_Date.Day == yesterday.Day && r.Created_Date.Month == yesterday.Month && r.Created_Date.Year == yesterday.Year);


                                if(coincidencia == 0){
                                    log.LogInformation("NINGUNA COINCIDENCIA, actualizamos estado ");
                                    long idResponse = funPostChangeStatus( inspection.Id, 5, "sistema", "sistema", log);
                                }                            
                            }else if(inspection.StatusId == 4){

                                log.LogInformation("ESTADO 4 ");
                                LogsInspection lastLog = vobj_sqldatalogget.funGetLogsAsign(log,inspection.Id);

                                long idResponse = funPostChangeStatus( inspection.Id, lastLog.Id, "sistema", "sistema", log);
                            }
                        //}


                    }else if(inspection.FrecuenciaId == 2){
                        log.LogInformation("es frecuencia 2");

                        if(weekDayNow == 0){
                            if(inspection.StatusId == 2 || inspection.StatusId == 6){
                                DateTime weekago = now.AddDays(-6);

                                int coincidencia = reslist.Count(r => r.Created_Date.Date >= weekago.Date && r.Created_Date.Date <= now.Date);


                                if(coincidencia == 0){
                                    log.LogInformation("NINGUNA COINCIDENCIA, actualizamos estado ");
                                    long idResponse = funPostChangeStatus( inspection.Id, 5, "sistema", "sistema", log);
                                }
                            }else if(inspection.StatusId == 4){

                                log.LogInformation("ESTADO 4 ");
                                LogsInspection lastLog = vobj_sqldatalogget.funGetLogsAsign(log,inspection.Id);

                                long idResponse = funPostChangeStatus( inspection.Id, lastLog.IdStatusPrevio, "sistema", "sistema", log);
                            }
                        }

                    }else if(inspection.FrecuenciaId == 3){
                        log.LogInformation("es frecuencia 3");

                        if(dayNow == 1){
                            if(inspection.StatusId == 2 || inspection.StatusId == 6){
                                DateTime monthago = now.AddMonths(-1);

                                int coincidencia = reslist.Count(r => r.Created_Date.Date >= monthago.Date && r.Created_Date.Date < now.Date);


                                if(coincidencia == 0){
                                    log.LogInformation("NINGUNA COINCIDENCIA, actualizamos estado ");
                                    long idResponse = funPostChangeStatus( inspection.Id, 5, "sistema", "sistema", log);
                                }
                            }else if(inspection.StatusId == 4){

                                log.LogInformation("ESTADO 4 ");
                                LogsInspection lastLog = vobj_sqldatalogget.funGetLogsAsign(log,inspection.Id);

                                long idResponse = funPostChangeStatus( inspection.Id, lastLog.IdStatusPrevio, "sistema", "sistema", log);
                            }
                        }
                        
                    }else if(inspection.FrecuenciaId == 4){
                        log.LogInformation("es frecuencia 4");
                        if(dayNow == 1 && (monthNow == 4 || monthNow == 7 || monthNow == 10 || monthNow == 1 )){
                            if(inspection.StatusId == 2 || inspection.StatusId == 6){
                                DateTime threemonthago = now.AddMonths(-3);

                                int coincidencia = reslist.Count(r => r.Created_Date.Date >= threemonthago.Date && r.Created_Date.Date < now.Date);


                                if(coincidencia == 0){
                                    log.LogInformation("NINGUNA COINCIDENCIA, actualizamos estado ");
                                    long idResponse = funPostChangeStatus( inspection.Id, 5, "sistema", "sistema", log);
                                }
                            }else if(inspection.StatusId == 4){

                                log.LogInformation("ESTADO 4 ");
                                LogsInspection lastLog = vobj_sqldatalogget.funGetLogsAsign(log,inspection.Id);

                                long idResponse = funPostChangeStatus( inspection.Id, lastLog.IdStatusPrevio, "sistema", "sistema", log);
                            }
                        }

                    }else if(inspection.FrecuenciaId == 5){
                        log.LogInformation("es frecuencia 5");
                        if(dayNow == 1 && (monthNow == 7 || monthNow == 1 )){
                            if(inspection.StatusId == 2 || inspection.StatusId == 6){
                                DateTime sixmonthago = now.AddMonths(-6);

                                int coincidencia = reslist.Count(r => r.Created_Date.Date >= sixmonthago.Date && r.Created_Date.Date < now.Date);


                                if(coincidencia == 0){
                                    log.LogInformation("NINGUNA COINCIDENCIA, actualizamos estado ");
                                    long idResponse = funPostChangeStatus( inspection.Id, 5, "sistema", "sistema", log);
                                }
                            }else if(inspection.StatusId == 4){

                                log.LogInformation("ESTADO 4 ");
                                LogsInspection lastLog = vobj_sqldatalogget.funGetLogsAsign(log,inspection.Id);

                                long idResponse = funPostChangeStatus( inspection.Id, lastLog.IdStatusPrevio, "sistema", "sistema", log);
                            }
                        }

                    }else if(inspection.FrecuenciaId == 6){
                        log.LogInformation("es frecuencia 6");
                        if(dayNow == 1 &&  monthNow == 1){
                            if(inspection.StatusId == 2 || inspection.StatusId == 6){
                                DateTime yearago = now.AddYears(-1);

                                int coincidencia = reslist.Count(r => r.Created_Date.Date >= yearago.Date && r.Created_Date.Date < now.Date);


                                if(coincidencia == 0){
                                    log.LogInformation("NINGUNA COINCIDENCIA, actualizamos estado ");
                                    long idResponse = funPostChangeStatus( inspection.Id, 5, "sistema", "sistema", log);
                                }
                            }else if(inspection.StatusId == 4){

                                log.LogInformation("ESTADO 4 ");
                                LogsInspection lastLog = vobj_sqldatalogget.funGetLogsAsign(log,inspection.Id);

                                long idResponse = funPostChangeStatus( inspection.Id, lastLog.IdStatusPrevio, "sistema", "sistema", log);
                            }                            
                        }
                    }
                }
            }
    }
    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}

public static long funPostChangeStatus(long iId,int sId, string created, string updated,ILogger log)
{
    TimeZoneInfo tzi = TimeZoneInfo.FindSystemTimeZoneById("SA Pacific Standard Time"); 

    DataAccessInspection vobj_sqldata_inspection = new DataAccessInspection();
    DataAccessInspectionStatusLogPost vobj_sqldata_inspectionstatuslog = new DataAccessInspectionStatusLogPost();

    InspectionStatusLog islObj = new InspectionStatusLog();
    islObj.InspectionId = iId;
    islObj.StatusId = sId;
    islObj.Active = 1;
    islObj.Created_By = created;
    islObj.Created_Date = TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);
    islObj.Last_Updated_By = updated;
    islObj.Last_Updated_Date = TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);

    Task<long> curobjtaskisl = vobj_sqldata_inspectionstatuslog.funPostInspectionStatusLog(log,islObj);
    curobjtaskisl.Wait();


    Inspection iObj = new Inspection();
    iObj.StatusId = sId;
    iObj.Last_Updated_By = updated;
    iObj.Last_Updated_Date = TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);
    iObj = vobj_sqldata_inspection.funPutInspection(log,iId,iObj);
    iObj.Id = iId;


    return iId;
}