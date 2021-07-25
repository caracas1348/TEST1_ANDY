#r "Newtonsoft.Json"
#load "sqldb_auditoriaall_post.csx"
#load "../Post-Evaluacion_Auditoria_Log-All/sqldb_evaluacion_auditoria_logall_post.csx"
#load "../Get-Auditoria-All/sqldb_auditoriaall_get.csx"
#load "../Post-Auditoria_Modificacion_Log/sqldb_auditoria_modificacion_logall_post.csx"

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

    // string apiKey = requestHeader.GetValues("apiKey").First();

    string requestBody = await new StreamReader(req.Body).ReadToEndAsync();

    log.LogInformation("requestBody:" + requestBody);

    dynamic dataobject = JsonConvert.DeserializeObject(requestBody);

    DataAuditoria_Modificacion_LogAll vobj_sqldata_aml = new DataAuditoria_Modificacion_LogAll();

    DataAuditoriaAllGet vobj_sqldata_auditoria_get = new DataAuditoriaAllGet();

    DataEvaluacion_Auditoria_LogAll vobj_sqldata_ealog = new DataEvaluacion_Auditoria_LogAll();
    evaluacion_auditoria_logall objealog = new evaluacion_auditoria_logall();

    DataAuditoriaAll vobj_sqldata = new DataAuditoriaAll();
    auditoriaall curobj = new auditoriaall();

    long newid = 0;
    long curid = 0;
    string usuariodelete;

    //Invocar INSERT
    if (vvhttpmethod == "post")
    {
        curobj = funsetObject(log, dataobject, vvhttpmethod);

        //Task<long> curobjtask = vobj_sqldata.funPostAuditoriaAll( log , curobj);
        //curobjtask.Wait();
        //newid = (long)curobjtask.Result;

        //if (newid == -1)
        //{
        //    curobj.Code = "404";
        //    curobj.Description = "Ya existe una auditoría en ese rango de fechas.";
        //}
        //else
        //{
        //    curobj.Id = newid;
        //}

        String curobjtask = vobj_sqldata.funPostAuditoriaAll(log, curobj);

        try
        {
            newid = Convert.ToInt64(curobjtask);
            curobj.Id = newid;
        }
        catch (Exception)
        {
            curobj.Id = -1;
            curobj.Code = "404";
            curobj.Description = curobjtask;
        }


        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
    }


    //Invocar PUT
    if (vvhttpmethod == "put")
    {

        //buscamos antiguo
        auditoriaallget oldobj = vobj_sqldata_auditoria_get.funGetAuditoriaAll(log, 0, (long)dataobject.Id, null);

        //editamos
        curid = dataobject.Id;
        curobj = funsetObject(log, dataobject, vvhttpmethod);

        if ( oldobj.StatusEvaluacionId == 1 && curobj.StatusEvaluacionId != 3 )
        {
            curobj.StatusEvaluacionId = 2;
        }


        curobj.SedeId = oldobj.SedeId;
        long validar = 0;
        validar = vobj_sqldata.funValidarFechasCoincidentesAll(log, curid, curobj);


        //si chocan las fechas
        if (validar > 0)
        {
            oldobj = vobj_sqldata_auditoria_get.funGetAuditoriaAll(log
                                                        , 0
                                                        , validar
                                                        , ""
                                                       );
            curobj.Id = 0;
            curobj.Description = "La Auditoria " + oldobj.Code + " de la sede " + oldobj.DescriptionSede + " (especialidad " + oldobj.Description + ") se encuentra dentro de este rango de fechas. ";

            jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
        }
        else
        {

            curobj = vobj_sqldata.funPutAuditoriaAll(log, curid, curobj);

            if (curobj.Code != "-1")
            {
                curobj.Id = curid;


                //buscamos nuevo
                auditoriaallget newobj = vobj_sqldata_auditoria_get.funGetAuditoriaAll(log, 0, (long)dataobject.Id, null);

                //comparo rango de fechas
                if (oldobj.Inicio != newobj.Inicio || oldobj.Fin != newobj.Fin)
                {
                    log.LogInformation("ACTUALIZA FECHAS:");

                    auditoria_modificacion_logall objaml1 = new auditoria_modificacion_logall();

                    string fInicio = oldobj.Inicio.ToString("dd/M/yyyy");
                    string fFin = oldobj.Fin.ToString("dd/M/yyyy");

                    string ffInicio = newobj.Inicio.ToString("dd/M/yyyy");
                    string ffFin = newobj.Fin.ToString("dd/M/yyyy");

                    objaml1.Data_Inicial = fInicio + " al " + fFin;
                    objaml1.Data_Final = ffInicio + " al " + ffFin;
                    objaml1.TipoModificacionId = 1;
                    objaml1.AuditoriaId = curid;
                    objaml1.Create_By = dataobject.Last_Updated_By;
                    objaml1.Create_Date = System.DateTime.Now;
                    Task<int> curobjtaskaml1 = vobj_sqldata_aml.funPostAuditoria_Modificacion_LogAll(log, objaml1);
                    curobjtaskaml1.Wait();

                }

                //comparo unidad
                if (oldobj.UnidadNegocioId != newobj.UnidadNegocioId)
                {
                    log.LogInformation("ACTUALIZA UNIDAD:");

                    auditoria_modificacion_logall objaml2 = new auditoria_modificacion_logall();

                    objaml2.Data_Inicial = oldobj.DescriptionUnidadNegocio;
                    objaml2.Data_Final = newobj.DescriptionUnidadNegocio;
                    objaml2.TipoModificacionId = 2;
                    objaml2.AuditoriaId = curid;
                    objaml2.Create_By = dataobject.Last_Updated_By;
                    objaml2.Create_Date = System.DateTime.Now;
                    Task<int> curobjtaskaml2 = vobj_sqldata_aml.funPostAuditoria_Modificacion_LogAll(log, objaml2);
                    curobjtaskaml2.Wait();

                }

                //comparo tipo
                if (oldobj.TipoId != newobj.TipoId)
                {
                    log.LogInformation("ACTUALIZA TIPO:");

                    auditoria_modificacion_logall objaml3 = new auditoria_modificacion_logall();

                    objaml3.Data_Inicial = oldobj.DescriptionAuditoria;
                    objaml3.Data_Final = newobj.DescriptionAuditoria;
                    objaml3.TipoModificacionId = 3;
                    objaml3.AuditoriaId = curid;
                    objaml3.Create_By = dataobject.Last_Updated_By;
                    objaml3.Create_Date = System.DateTime.Now;
                    Task<int> curobjtaskaml3 = vobj_sqldata_aml.funPostAuditoria_Modificacion_LogAll(log, objaml3);
                    curobjtaskaml3.Wait();

                }

                //comparo norma
                if (oldobj.Code_Normas != newobj.Code_Normas)
                {
                    log.LogInformation("ACTUALIZA NORMA:");

                    auditoria_modificacion_logall objaml4 = new auditoria_modificacion_logall();

                    objaml4.Data_Inicial = oldobj.Code_Normas;
                    objaml4.Data_Final = newobj.Code_Normas;
                    objaml4.TipoModificacionId = 4;
                    objaml4.AuditoriaId = curid;
                    objaml4.Create_By = dataobject.Last_Updated_By;
                    objaml4.Create_Date = System.DateTime.Now;
                    Task<int> curobjtaskaml4 = vobj_sqldata_aml.funPostAuditoria_Modificacion_LogAll(log, objaml4);
                    curobjtaskaml4.Wait();
                }

                //comparo sede
                if (oldobj.SedeId != newobj.SedeId)
                {
                    log.LogInformation("ACTUALIZA SEDE:");

                    auditoria_modificacion_logall objaml5 = new auditoria_modificacion_logall();

                    objaml5.Data_Inicial = oldobj.DescriptionSede;
                    objaml5.Data_Final = newobj.DescriptionSede;
                    objaml5.TipoModificacionId = 5;
                    objaml5.AuditoriaId = curid;
                    objaml5.Create_By = dataobject.Last_Updated_By;
                    objaml5.Create_Date = System.DateTime.Now;
                    Task<int> curobjtaskaml5 = vobj_sqldata_aml.funPostAuditoria_Modificacion_LogAll(log, objaml5);
                    curobjtaskaml5.Wait();

                }


                //guardamos log por el cambio de estado
                if (oldobj.StatusEvaluacionId != newobj.StatusEvaluacionId)
                {
                    log.LogInformation("ACTUALIZA STATUS EVALUACION:");
                    objealog.AuditoriaId = System.Convert.ToInt32(curid);
                    objealog.Created_By = dataobject.Last_Updated_By;
                    objealog.Created_Date = System.DateTime.Now;
                    objealog.StatusEvaluacionId = newobj.StatusEvaluacionId;
                    Task<int> curobjtaskeal = vobj_sqldata_ealog.funPostEvaluacion_Auditoria_LogAll(log, objealog);
                    curobjtaskeal.Wait();
                }

            }
        }

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
    }

    //Invocar DELETE
    if (vvhttpmethod == "delete")
    {

        curid = dataobject.Id;
        usuariodelete = dataobject.Delete_By;

        long nrorows = vobj_sqldata.funDeleteAuditoriaAll(log, curid, usuariodelete);

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(nrorows, Formatting.Indented);
    }

    //Invocar SUSPENDER
    if (vvhttpmethod == "suspender")
    {

        curid = dataobject.Id;

        long status = vobj_sqldata.funSuspenderAuditoriaAll(log, curid, (string)dataobject.Motivo, (string)dataobject.Created_By);

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(status, Formatting.Indented);
    }

    //Invocar Cambiar Status
    if (vvhttpmethod == "putStatusId")
    {

        curid                   = System.Convert.ToInt64(req.Query["Id"]);
        int StatusId            = dataobject.StatusId;
        string Last_Updated_by  = dataobject.Last_Updated_By;
        int resp = vobj_sqldata.funPutEstatusAuditoria(log, curid, StatusId, Last_Updated_by);

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(resp, Formatting.Indented);
    }

    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");

}






public static auditoriaall funsetObject(ILogger log, dynamic dataobject, string vvmethod)
{
    // long vnid = 0;
    // if(vvmethod != "post")
    // {
    //     vnid    = dataobject?.Id;
    // }

    string vvcode              = dataobject?.Code;
    string vndescription       = dataobject?.Description;

    long vnsedeid = 0;
    if(dataobject.SedeId>0){
        vnsedeid              = dataobject?.SedeId;
    }
    long vntipoid = 0;
    if(dataobject.TipoId>0){
        vntipoid              = dataobject?.TipoId;
    }
    int vnstatusid = 0;
    if(dataobject.StatusId>0){
        vnstatusid              = dataobject?.StatusId;
    }
    long vnprogramaauditoriaid = 0;
    if(dataobject.ProgramaAuditoriaId>0){
        vnprogramaauditoriaid = dataobject?.ProgramaAuditoriaId;
    }
    int vnstatusevaluacionid = 0;
    if(dataobject.StatusEvaluacionId>0){
        vnstatusevaluacionid  = dataobject?.StatusEvaluacionId;
    }
    string vvinicio            = dataobject?.Inicio;
    string vvfin               = dataobject?.Fin;
    string vvcreated_by        = dataobject?.Created_By;
    string vvlast_updated_by   = dataobject?.Last_Updated_By;
    string vvcodenormas        = dataobject?.Code_Normas;

    auditoriaall curobj = new auditoriaall();
    //curobj.Id           = vnid;
    curobj.Code         = vvcode;
    curobj.Description  = vndescription;
    curobj.SedeId       = vnsedeid;
    curobj.TipoId       = vntipoid;
    curobj.StatusId     = vnstatusid;
    if (!string.IsNullOrEmpty(vvinicio))
    {
        curobj.Inicio = System.Convert.ToDateTime(vvinicio);
    }
    if (!string.IsNullOrEmpty(vvfin))
    {
        curobj.Fin = System.Convert.ToDateTime(vvfin);
    }
    curobj.ProgramaAuditoriaId =  System.Convert.ToInt64(vnprogramaauditoriaid);
    curobj.StatusEvaluacionId  =  System.Convert.ToInt32(vnstatusevaluacionid);
    curobj.Code_Normas         = vvcodenormas;

    if(vvmethod == "post")
    {
        curobj.Created_By        = vvcreated_by;
        curobj.Created_Date      = System.DateTime.Now;
    }

    curobj.Last_Updated_By   = vvlast_updated_by;
    curobj.Last_Updated_Date = System.DateTime.Now;

    return curobj;
}

