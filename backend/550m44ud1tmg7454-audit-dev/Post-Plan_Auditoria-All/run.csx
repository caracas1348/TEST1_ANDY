#r "Newtonsoft.Json"
#load "sqldb_planauditoriaall_post.csx"
#load "../Get-Auditoria-All/sqldb_auditoriaall_get.csx"
#load "../Post-Auditoria-All/sqldb_auditoriaall_post.csx"
 
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
   
    var requestHeader           = req.Headers; 
    var vvapikeysecure          = Environment.GetEnvironmentVariable("apikey",EnvironmentVariableTarget.Process);
    string vvapiKeyparameter    = requestHeader["apiKey"];
    string vvhttpmethod         = req.Query["httpmethod"];

    string jsonrspt     = "";
    string name = req.Query["name"];
    //long vnAuditoriaId  = System.Convert.ToInt64(req.Query["AuditoriaId"]);
    //string vvDetalle    =  Convert.ToString(req.Query["Detalle"]); //objetivo
 
    //Evaluar Clave API
    if(vvapikeysecure != vvapiKeyparameter )
    {
        vvhttpmethod="";
        jsonrspt="{}";
    }
 
    /*START - Parametros de Lectura*/
    /*START - Parametros de Lectura*/

    // string apiKey = requestHeader.GetValues("apiKey").First();  
    long vnAccion = System.Convert.ToInt64(req.Query["Accion"]);
    string requestBody = await new StreamReader(req.Body).ReadToEndAsync();

    log.LogInformation("requestBody:" + requestBody);

    dynamic dataobject = JsonConvert.DeserializeObject(requestBody);

    DataPlanAuditoriaAll vobj_sqldata = new DataPlanAuditoriaAll();
    PlanAuditoriaAll curobj = new PlanAuditoriaAll();
    ProgramacionPlanAll curobjProg = new ProgramacionPlanAll();
    List<ProgramacionPlanAll> lista = new List<ProgramacionPlanAll>();

    DataAuditoriaAll vobj_sqldata_auditoria_post = new DataAuditoriaAll();

    DataAuditoriaAllGet vobj_sqldata_auditoria_get = new DataAuditoriaAllGet();
    auditoriaallget curobjAud = new auditoriaallget();

    List<ProcesosAuditoriaAll> procesos = new List<ProcesosAuditoriaAll>();

    long newid = 0;
    long curid = 0;
    long sedeId = 0;
    long procesoId = 0;
    long normaId = 0;

    //Invocar INSERT
    if (vvhttpmethod == "post")
    {
        int StatusId = 4;
        int resp = 0;

        log.LogInformation("Entro a post:");
        curobj = funsetObject(log, dataobject, vvhttpmethod);

        Task<long> curobjtask = vobj_sqldata.funPostPlanAuditoriaAll(log, curobj);
        curobjtask.Wait();
        newid = (long)curobjtask.Result;
        curobj.Id = newid;

        //curobjAud vobj_sqldata_auditoria_post
        resp = vobj_sqldata_auditoria_post.funPutEstatusAuditoria(log, curobj.AuditoriaId, StatusId, curobj.Last_Updated_By);

        lista = funsetObjectProgramacion(log, dataobject.Programacion, curobj.Id, vvhttpmethod);

        foreach (ProgramacionPlanAll item in lista)
        {

            Task<long> curobjtask2 = vobj_sqldata.funPostProgramacionAll(log, item);
            curobjtask2.Wait();
            newid = (long)curobjtask2.Result;
            item.Id = newid;

            log.LogInformation("foreach item.Id:" + item.Id);

        }//*/

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
    }


    //Invocar PUT
    if (vvhttpmethod == "put")
    {
        //para cambiar el estatus de la auditoria
        int StatusId = 5;
        int resp = 0;
        log.LogInformation("Entro a put: ");
        curid = System.Convert.ToInt64(req.Query["Id"]);
        curobj = funsetObject(log, dataobject, vvhttpmethod);
        curobj = vobj_sqldata.funPutPlanAuditoriaAll(log, curid, curobj);
        curobj.Id = curid;
        log.LogInformation("curobj.Flag_Finalizado: " + curobj.Flag_Finalizado);

        lista = funsetObjectProgramacion(log, dataobject.Programacion, curobj.Id, vvhttpmethod);
        
        vobj_sqldata.funDeletedProgramacionAll(log, curobj.Id);

        foreach (ProgramacionPlanAll item in lista)
        {
            Task<long> curobjtask2 = vobj_sqldata.funPostProgramacionAll(log, item);
            curobjtask2.Wait();
            newid = (long)curobjtask2.Result;
            item.Id = newid;
            log.LogInformation("foreach item.Id:" + item.Id);

        }//*/

        if (curobj.Flag_Finalizado == 1)
        {
            //obtengo los procesos registrados en esta auditoria
            procesos = vobj_sqldata.funGetProcesosAuditoria(log, curobj.AuditoriaId);

            foreach (ProcesosAuditoriaAll item in procesos)
            {
                Task<long> curobjtask2 = vobj_sqldata.funPostProcesosAuditoriaAll(log, item);
                curobjtask2.Wait();
                newid = (long)curobjtask2.Result;
                item.Id = newid;
                log.LogInformation("foreach item.Id:" + item.Id);

            }//*/

            resp = vobj_sqldata_auditoria_post.funPutEstatusAuditoria(log, curobj.AuditoriaId, StatusId, curobj.Last_Updated_By);
        }

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
    }//*/

    //Invocar PUTLOG
    if (vvhttpmethod == "putlog")
    {
        log.LogInformation("Entro a putlog2: ");
        long validar = 0;
        string vvname = "";
        int vnsearch_type = 0;
        curid = System.Convert.ToInt64(req.Query["Id"]);
        sedeId = System.Convert.ToInt64(req.Query["SedeId"]);
        curobj = funsetObject(log, dataobject, vvhttpmethod);
        validar = vobj_sqldata.funValidarFechasEjecucionAll(log, curid, sedeId, curobj);

        //si chocan las fechas
        if (validar > 0)
        {
            curobjAud = vobj_sqldata_auditoria_get.funGetAuditoriaAll(log
                                                        , vnsearch_type
                                                        , validar
                                                        , vvname
                                                       );
            curobjAud.Id = 0;
            curobjAud.Description = "La Auditoria " + curobjAud.Code + " de la sede " + curobjAud.DescriptionSede + " (especialidad " + curobjAud.Description + ") se encuentra dentro de este rango de fechas. ";

            jsonrspt = JsonConvert.SerializeObject(curobjAud, Formatting.Indented);
        }
        else
        {
            curobj = vobj_sqldata.funPutPlanAuditoriaLogAll(log, curid, curobj);
            log.LogInformation("curobj.Id" + curobj.Id);
            if (curobj.Id!=0) 
            {
                curobj = vobj_sqldata.funPutLogPlanAuditoriaLogAll(log, curid, curobj);
                curobj.Id = curid;
            }
            //log.LogInformation(curobj);
            //Conversion de Respuestas a JSON
            jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
        }
    }//*/

    //Invocar finalizeRequesito
    if (vvhttpmethod == "finalizeRequesito")
    {
        log.LogInformation("Entro a finalizeRequesito: ");
        curid = System.Convert.ToInt64(req.Query["ProgramacionPlanId"]);
        // Inicializo el Objeto
        curobjProg = funsetObjectProgramacionPlan(log, dataobject, vvhttpmethod);
        //Llamo a la funcion
        curobjProg = vobj_sqldata.funFinalizeRequisitoProgramacionPlanAll(log, curobjProg, vnAccion);

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobjProg, Formatting.Indented);
    }

    //Invocar iniciarRequesito
    if (vvhttpmethod == "iniciarRequesito")
    {
        log.LogInformation("Entro a iniciarRequesito: ");

        curid = System.Convert.ToInt64(req.Query["ProgramacionPlanId"]);

        // Inicializo el Objeto
        curobjProg = funsetObjectProgramacionPlan(log, dataobject, vvhttpmethod);
        //Llamo a la funcion
        curobjProg = vobj_sqldata.funIniciarRequisitoProgramacionPlanAll(log, curobjProg);


        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobjProg, Formatting.Indented);
    }

    //Invocar FinalizarProceso
    if (vvhttpmethod == "finalizarProceso")
    {
        log.LogInformation("Entro a finalizarProceso: ");

        curid = System.Convert.ToInt64(req.Query["AuditoriaId"]);
        procesoId = System.Convert.ToInt64(req.Query["ProcesoId"]);
        normaId = System.Convert.ToInt64(req.Query["NormaId"]);
        int resultado = 0;
        // Inicializo el Objeto
        //curobj = funsetObject(log, dataobject, vvhttpmethod);
        //Llamo a la funcion
        resultado = vobj_sqldata.funFinalizarProcesoApp(log, curid, procesoId, normaId, (string)dataobject?.Last_Updated_By);


        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(resultado, Formatting.Indented);
    }

    //Invocar DELETE
    /*if(vvhttpmethod == "delete"){

        curid= System.Convert.ToInt64(req.Query["id"]); 
        long nrorows = vobj_sqldata.funDeleteNormaAll( log ,curid );

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(nrorows, Formatting.Indented);
    }//*/

    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
    
}



public static ProgramacionPlanAll funsetObjectProgramacionPlan(ILogger log, dynamic dataobject, string vvmethod)
{
    ProgramacionPlanAll curobjProg = new ProgramacionPlanAll();
    curobjProg.Id                  = dataobject?.ProgramacionPlanId;
    if(vvmethod != "iniciarRequesito")
    {
        curobjProg.TipoHallazgoId      = dataobject?.TipoHallazgoId;
        curobjProg.Hallazgo            = dataobject?.Hallazgo;
    }
    curobjProg.Last_Updated_By     = dataobject?.Last_Updated_By;
    curobjProg.Last_Updated_Date   = System.DateTime.Now;

    return curobjProg;

}//*/


public static PlanAuditoriaAll funsetObject(ILogger log, dynamic dataobject, string vvmethod)
{
    long vnid = 0;
    if(vvmethod != "post")
    {
        vnid    = dataobject?.Id;
    }
    long vnAuditoriaId        = dataobject?.AuditoriaId;
    string vvDetalle          = dataobject?.Detalle;
    string vvAlcance          = dataobject?.Alcance;
    string vvInicio           = dataobject?.Inicio;
    string vvFin              = dataobject?.Fin;//*/
    string vvCreated_By       = dataobject?.Created_By;
    string vvLast_Updated_By  = dataobject?.Last_Updated_By; 
    string vvResumen_Auditoria  = dataobject?.Resumen_Auditoria; 
    string vvData_Inicial       = dataobject?.Data_Inicial; 
    string vvData_Final         = dataobject?.Data_Final; 
    string vvMotivo             = dataobject?.Motivo; 
    //var vvProgramacion  = dataobject?.Programacion; 
    int vnFlag_Finalizado = 0;
    if (vvmethod != "putlog")
    {
        vnFlag_Finalizado = dataobject?.Flag_Finalizado;
    }

    //int vnactive              = dataobject?.Active;
                  
    PlanAuditoriaAll curobj = new PlanAuditoriaAll();
    curobj.Id           = vnid;
    curobj.AuditoriaId  = vnAuditoriaId;
    curobj.Detalle      = vvDetalle;  
    curobj.Alcance      = vvAlcance;
    curobj.Resumen_Auditoria = vvResumen_Auditoria;  
    curobj.Data_Inicial      = vvData_Inicial;  
    curobj.Data_Final        = vvData_Final;  
    curobj.Motivo            = vvMotivo;  
    //curobj.Programacion  = vvProgramacion;
    curobj.Flag_Finalizado = vnFlag_Finalizado;
    
    if (!string.IsNullOrEmpty(vvInicio)) 
    {
        curobj.Inicio = System.Convert.ToDateTime(vvInicio);
        //curobj.Inicio = vvInicio;
    }
    if (!string.IsNullOrEmpty(vvFin)) 
    {
        curobj.Fin = System.Convert.ToDateTime(vvFin);
        //curobj.Fin = vvFin;
    }//*/

    if(vvmethod == "post" || vvmethod == "putlog" || vvmethod == "putlog2")
    {
        curobj.Created_By        = vvCreated_By;
        curobj.Created_Date      = System.DateTime.Now; 
    }
    
     curobj.Last_Updated_By   = vvLast_Updated_By;
     curobj.Last_Updated_Date = System.DateTime.Now; //*/

    return curobj;
}   

public static List<ProgramacionPlanAll> funsetObjectProgramacion(ILogger log, dynamic dataobject, long PlanAuditoriaId, string vvmethod)  
{
    //long vnid = 0;
    List<ProgramacionPlanAll> lista = new List<ProgramacionPlanAll>();
    foreach (var item in dataobject)
    {
        long vnId                     = 0;
        long vnPlanAuditoriaId        = PlanAuditoriaId;
        long vnUnidadNegocioProcesoId = item?.UnidadNegocioProcesoId;
        int vnAuditorId               = item?.AuditorId;
        DateTime vvInicio             = item?.Inicio;
        string vvHora_Inicio          = item?.Hora_Inicio;
        string vvHora_Fin             = item?.Hora_Fin;
        string vvHora_Inicio_Real     = item?.Hora_Inicio_Real;
        string vvHora_Fin_Real        = item?.Hora_Fin_Real;
        long vnTipoHallazgoId         = item?.TipoHallazgoId;
        string vvHallazgo             = item?.Hallazgo;

        //DateTime vvCreated_Date        = item?.Created_Date;
        //DateTime vvLast_Updated_Date  = item?.Last_Updated_Date    


        var curobj = new ProgramacionPlanAll();
        curobj.Id                     = vnId;
        curobj.PlanAuditoriaId        = vnPlanAuditoriaId;
        curobj.UnidadNegocioProcesoId = vnUnidadNegocioProcesoId;
        curobj.AuditorId              = vnAuditorId;
        curobj.Inicio                 = vvInicio;
        curobj.Hora_Inicio            = vvHora_Inicio;
        curobj.Hora_Fin               = vvHora_Fin;
        curobj.Hora_Inicio_Real       = vvHora_Inicio_Real;
        curobj.Hora_Fin_Real          = vvHora_Fin_Real;
        curobj.TipoHallazgoId         = vnTipoHallazgoId;
        curobj.Hallazgo               = vvHallazgo;

        if (vvmethod == "post" || vvmethod == "put")
        {
            //curobj.Create_By = vvcreate_by;
            curobj.Created_Date = System.DateTime.Now;
        }
        lista.Add(curobj);
    }
    
    return lista;

}//*/
