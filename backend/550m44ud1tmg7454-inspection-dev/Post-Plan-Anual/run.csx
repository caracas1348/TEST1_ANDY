/****************************************************************************************
* VISUAL SAT - [2021]
* PROYECTO : SIGTASA
* ESQUEMA : SSOMA
* MODULO : GESTIÓN DE PLAN ANUAL
* OPERADORES_________________________________________________________________________
* | # | PROGRAMADOR     |  |      FECHA   |  |   HORA   |           CORREO           |
* | 1 | Andy Vásquez    |  |  28/01/2021  |  | 07:28:50 |    caracas1348@gmail.com   |**
* |___|_________________|__|______________|__|__________|____________________________|
*
* DESCRIPCION: ARCHIVO RUN BACKEND DE FUNCIONALIDAD EN SERVIDOR DE LAS OPCIONES DE INSERTAR EL PLAN ANUAL
*
* ARCHIVOS DE FRONT       ____________________________________
* | # |     MODULO             |  |         NOMBRE            |   
* | 1 |      SSOMA             |  |  gestionPlanAnual.html    |
* |___________________________________________________________|
*
* VERSION: 0.1 Beta
*******************************************************************************************/

#r "Newtonsoft.Json"
#load "sqldb_plan_anual_all_post.csx"
#load "sqdb_get.csx"

using System;
using System.Net;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;
using System.Diagnostics;
using System.Globalization;
using System.Threading.Tasks;
using System.Configuration;
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
using System.Data.SqlClient;
//PARA LAS TRANSACCIONES
//PARA OPERACION CON ARRAYS



public static async Task<IActionResult> Run(HttpRequest req, ILogger log)
{
    log.LogInformation("C# HTTP trigger function processed a request.");

    var requestHeader           = req.Headers; 
    var vvapikeysecure          = Environment.GetEnvironmentVariable("apikey",EnvironmentVariableTarget.Process);
    string vvapiKeyparameter    = requestHeader["apiKey"];
    string vvhttpmethod         = req.Query["httpmethod"];
    int vntipoitem = System.Convert.ToInt32(req.Query["tipoItem"]);
    int vniditem = System.Convert.ToInt32(req.Query["idItem"]);
    string vvcreated_by = req.Query["created_by"];

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
    Console.WriteLine("requestBody:" + requestBody);

    dynamic dataobject = JsonConvert.DeserializeObject(requestBody);

    // Objetos a Utilizar
    DataPlanes_AnualesPostAll vobj_sqldata    = new DataPlanes_AnualesPostAll();
    DataPlanAnualGetAll vobj_getsqldata    = new DataPlanAnualGetAll();
    //DataPlanes_AnualesGetAll vobj_getPlanAnual = new DataPlanes_AnualesGetAll();//no se quien es
    Planes_AnualesPost curobj;
    Planes_AnualesPost resp_curobj;
    //Planes_AnualesGet curobj3 = new Planes_AnualesGet();
    //DataPlanAnual curobj4 = new DataPlanAnual(); //no se quien es

    //Metodo:  listado de evaluacion de auditores
    if (vvhttpmethod == "post")
    {
        Console.WriteLine("vvhttpmethod:" + vvhttpmethod);
        log.LogInformation("En post para regsitrar el hallazgo");
        curobj = funsetObject(log, dataobject, vvhttpmethod);
        log.LogInformation("objeto:  "+curobj.ToString());

        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        try
        {

            log.LogInformation("En try para regsitrar el Plan Anual");
            resp_curobj = await vobj_sqldata.funPostPlanes_Anuales(log, curobj);
                    log.LogInformation("objeto:  "+resp_curobj.Id.ToString());

            if(resp_curobj.Id > 0)
            {
                Objetivo resp_obj;
                if(curobj.Objetivos != null){
                log.LogInformation("En curobj.Id > 0");
                foreach(var obj in curobj.Objetivos )
                {
                    log.LogInformation("hay algo aqiu");

                resp_obj = await vobj_sqldata.funPostObjetivos(log,obj, 0,(long) resp_curobj.Id, (int) 1);
                    if(resp_obj.Id > 0)
                    {
                     if(obj.Actividades != null){
                        Actividad resp_act;
                        foreach (var act in obj.Actividades)
                        {
                            resp_act = await vobj_sqldata.funPostActividad(log,act, resp_obj.Id,(long) resp_curobj.Id);

                            if(resp_act.Id > 0){
                               if(act.Cronogramas != null){

                                Cronograma resp_cro;
                                foreach (var cron in act.Cronogramas)
                                {
                                resp_cro = await vobj_sqldata.funPostCronograma (log,cron,Convert.ToInt32(resp_act.Id));
                                }
                               }
                                if(act.Tareas != null){
  
                                Tarea resp_tarea;
                                foreach (var tarea in act.Tareas)
                                {
                                resp_tarea = await vobj_sqldata.funPostTarea(log,tarea,Convert.ToInt32(resp_act.Id));
                                    
                                }
                                }
                           
                                }
                            }
                     }
                     if(obj.SubObjetivos != null){
                        SubObjetivo resp_Suobj;
                        foreach (var SuObj in obj.SubObjetivos)
                        {
                        resp_Suobj = await vobj_sqldata.funPostSubObjetivos(log,SuObj, resp_obj.Id,(long) resp_curobj.Id, (int) 2);
                            if(resp_Suobj.Id > 0)
                            {
                           if(SuObj.Actividades != null){

                        Actividad resp_SOact;
                        foreach (var Soact in SuObj.Actividades)
                        {
                            resp_SOact = await vobj_sqldata.funPostActividad(log,Soact, resp_Suobj.Id,(long) resp_curobj.Id);

                            if(resp_SOact.Id > 0){
                               if(Soact.Cronogramas != null){

                                Cronograma resp_Socro;
                                foreach (var Socron in Soact.Cronogramas)
                                {
                                resp_Socro = await vobj_sqldata.funPostCronograma (log,Socron, Convert.ToInt32(resp_SOact.Id) );
                                }   
                                }


                               if(Soact.Tareas != null){
                                Tarea resp_Sotarea;
                                foreach (var tarea in Soact.Tareas)
                                {
                                resp_Sotarea = await vobj_sqldata.funPostTarea (log,tarea, Convert.ToInt32(resp_SOact.Id));
                                    
                                }
                               }
                                }
                            }
                          
                        }
                            }
                    
                }
                    }
                }
     

                }
                }

        curobj.Id = resp_curobj.Id;
        curobj.Code = resp_curobj.Code;
                //finalizamos la transaccion
                scope.Complete();
                log.LogInformation("Despues de scope.Complete() para regsitrar el hallazgo " );
                


            }
        }
        catch (Exception ex)
        {
            log.LogInformation("catch::" + ex.Message);
            curobj.Id = 0;
            curobj.Create_By = System.Convert.ToString(ex.Message);
        }
          
        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);  

 
    }

    if (vvhttpmethod == "put")
    { 
        Console.WriteLine("vvhttpmethod:" + vvhttpmethod);
        log.LogInformation("En post para actualizar el hallazgo");
        curobj = funsetObject(log, dataobject, vvhttpmethod);
        log.LogInformation("objeto:  "+curobj.ToString());

        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        try
        {

            log.LogInformation("En try para actualizar el Plan Anual");
              resp_curobj = await vobj_sqldata.funPostPlanes_Anuales(log, curobj);
                    log.LogInformation("objeto:  "+resp_curobj.Id.ToString());

            if(resp_curobj.Id > 0)
            {
                Objetivo resp_obj;
                if(curobj.Objetivos != null){
                log.LogInformation("En curobj.Id > 0");
                foreach(var obj in curobj.Objetivos )
                {
                    log.LogInformation("hay algo aqiu");

                resp_obj = await vobj_sqldata.funPostObjetivos(log,obj, 0,(long) resp_curobj.Id, (int) 1);
                    if(resp_obj.Id > 0)
                    {
                     if(obj.Actividades != null){
                        Actividad resp_act;
                        foreach (var act in obj.Actividades)
                        {
                            resp_act = await vobj_sqldata.funPostActividad(log,act, resp_obj.Id,(long) resp_curobj.Id);

                            if(resp_act.Id > 0){
                               if(act.Cronogramas != null){

                                Cronograma resp_cro;
                                foreach (var cron in act.Cronogramas)
                                {
                                resp_cro = await vobj_sqldata.funPostCronograma (log,cron,Convert.ToInt32(resp_act.Id));
                                }
                               }
                                if(act.Tareas != null){
  
                                Tarea resp_tarea;
                                foreach (var tarea in act.Tareas)
                                {
                                resp_tarea = await vobj_sqldata.funPostTarea(log,tarea,Convert.ToInt32(resp_act.Id));
                                    
                                }
                                }
                           
                                }
                            }
                     }
                     if(obj.SubObjetivos != null){
                        SubObjetivo resp_Suobj;
                        foreach (var SuObj in obj.SubObjetivos)
                        {
                        resp_Suobj = await vobj_sqldata.funPostSubObjetivos(log,SuObj, resp_obj.Id,(long) resp_curobj.Id, (int) 2);
                            if(resp_Suobj.Id > 0)
                            {
                           if(SuObj.Actividades != null){

                        Actividad resp_SOact;
                        foreach (var Soact in SuObj.Actividades)
                        {
                            resp_SOact = await vobj_sqldata.funPostActividad(log,Soact, resp_Suobj.Id,(long) resp_curobj.Id);

                            if(resp_SOact.Id > 0){
                               if(Soact.Cronogramas != null){

                                Cronograma resp_Socro;
                                foreach (var Socron in Soact.Cronogramas)
                                {
                                resp_Socro = await vobj_sqldata.funPostCronograma (log,Socron, Convert.ToInt32(resp_SOact.Id) );
                                }   
                                }


                               if(Soact.Tareas != null){
                                Tarea resp_Sotarea;
                                foreach (var tarea in Soact.Tareas)
                                {
                                resp_Sotarea = await vobj_sqldata.funPostTarea (log,tarea, Convert.ToInt32(resp_SOact.Id));
                                    
                                }
                               }
                                }
                            }
                          
                        }
                            }
                    
                }
                    }
                }
     

                }
                }

        curobj.Id = resp_curobj.Id;
        curobj.Code = dataobject?.Code;
                //finalizamos la transaccion
                scope.Complete();
                log.LogInformation("Despues de scope.Complete() para regsitrar el hallazgo " );
                


            }
        }
        catch (Exception ex)
        {
            log.LogInformation("catch::" + ex.Message);
            curobj.Id = 0;
            curobj.Code = System.Convert.ToString(ex.Message);
        }
          
        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);  
       
    }

    // Adjuntar Evidencias de las Tareas
    if(vvhttpmethod == "AdjuntarEvidencia" )
    {
        AdjuntosTarea objAdjuntos;
        try
        {
            log.LogInformation("En AdjuntarEvidencia y dataobject?.Id: ");
            
            long Id            = (long)dataobject?.Id;
            log.LogInformation("Id: ");
            int Accion         = (int)dataobject?.Accion;
            log.LogInformation("Accion: ");
            string AdjuntoName = (string)dataobject?.AdjuntoName;
            log.LogInformation("AdjuntoName: ");
            string Adjunto     = (string)dataobject?.Adjunto;
            log.LogInformation("Adjunto: ");
            string Created_By  = (string)dataobject?.Created_By;
            log.LogInformation("Cre: ");
            long TareaId       = (long)dataobject?.TareaId;
            log.LogInformation("TareaId: 2");

            log.LogInformation("En AdjuntarEvidencia y AdjuntoName: "+AdjuntoName);

            objAdjuntos = new AdjuntosTarea();
            objAdjuntos = await vobj_sqldata.funAdjuntarEvidenciaTarea(log, Id, TareaId, Accion, AdjuntoName, Adjunto, Created_By);


        }
        catch (Exception ex)
        {
            log.LogInformation("catch::" + ex.Message);
            objAdjuntos         = new AdjuntosTarea();
            objAdjuntos.Id      = 0;
            objAdjuntos.Adjunto = System.Convert.ToString(ex.Message);
        }

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(objAdjuntos, Formatting.Indented);  

    }

        // Adjuntar Evidencias de las TareasEXECUTE
    if(vvhttpmethod == "AdjuntarEvidenciaEXEC" )
    {
        PlanAnualGet objPlanAnualGet;
        AdjuntosTarea objAdjuntos;
        try
        {
            log.LogInformation("En AdjuntarEvidencia y dataobject?.Id: ");
            
            long IdPlan        = (long)dataobject?.IdPlan;
            log.LogInformation("Id: ");            
            long Id            = (long)dataobject?.Id;
            log.LogInformation("Id: ");
            int Accion         = (int)dataobject?.Accion;
            log.LogInformation("Accion: ");
            string AdjuntoName = (string)dataobject?.AdjuntoName;
            log.LogInformation("AdjuntoName: ");
            string Adjunto     = (string)dataobject?.Adjunto;
            log.LogInformation("Adjunto: ");
            string Created_By  = (string)dataobject?.Created_By;
            log.LogInformation("Cre: ");
            long TareaId       = (long)dataobject?.TareaId;
            log.LogInformation("TareaId: 2");

            log.LogInformation("En AdjuntarEvidencia y AdjuntoName: "+AdjuntoName);
            objPlanAnualGet = new PlanAnualGet();
            objAdjuntos = new AdjuntosTarea();
            objAdjuntos = await vobj_sqldata.funAdjuntarEvidenciaTareaExec(log, Id, TareaId, Accion, AdjuntoName, Adjunto, Created_By);
            if(objAdjuntos.Id > 0)
            {           
               objPlanAnualGet = await vobj_getsqldata.funGetPlanAnualAllList(log, IdPlan);
            }

        }
        catch (Exception ex)
        {
            log.LogInformation("catch::" + ex.Message);
           objPlanAnualGet = new PlanAnualGet();
            objPlanAnualGet.Id      = 0;
            objPlanAnualGet.Code = System.Convert.ToString(ex.Message);
        }

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(objPlanAnualGet, Formatting.Indented);  

    }


    if(vvhttpmethod == "PostCC" )
    {
        ControlCambios ControlCambios;
        RespControlCambios curobjCC;

        try
        {
            log.LogInformation("vvhttpmethod " + vvhttpmethod);
            ControlCambios = new ControlCambios();
            ControlCambios = funSetObjectControlCambio(log, dataobject);

            ControlCambios = await vobj_sqldata.funPostControlCambios(log, ControlCambios);
                curobjCC = new RespControlCambios();
            curobjCC.Id = ControlCambios.Id;
            if(ControlCambios.Id > 0)
            {
                curobjCC.ControlCambios = await vobj_sqldata.funGetControlCambios(log,(long) dataobject?.IdActividad);
            }


        }
        catch (Exception ex)
        {
            log.LogInformation("catch::" + ex.Message);
            curobjCC         = new RespControlCambios();
            curobjCC.Id      = 0;
            curobjCC.Nombre = System.Convert.ToString(ex.Message);
        }

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobjCC, Formatting.Indented);  

    }

     if(vvhttpmethod == "PutEstadoTareaVencida" )
    {
        ControlCambios ControlCambios;
        RespControlCambios curobjCC;

        try
        {
            log.LogInformation("vvhttpmethod " + vvhttpmethod);
            ControlCambios = new ControlCambios();

            ControlCambios = await vobj_sqldata.funPutEstadoTarea(log, ControlCambios);
                curobjCC = new RespControlCambios();
            curobjCC.Id = ControlCambios.Id;


        }
        catch (Exception ex)
        {
            log.LogInformation("catch::" + ex.Message);
            curobjCC         = new RespControlCambios();
            curobjCC.Id      = 0;
            curobjCC.Nombre = System.Convert.ToString(ex.Message);
        }

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobjCC, Formatting.Indented);  

    }

    // Adjuntar Evidencias de las Tareas
    log.LogInformation("vvhttpmethod " + vvhttpmethod);
    if(vvhttpmethod == "CorreccionPlanAnual" )
    {
        CorreccionPlanAnual CorreccionPlanAnual;

        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        try
        {    
            log.LogInformation("vvhttpmethod " + vvhttpmethod);
            CorreccionPlanAnual = new CorreccionPlanAnual();
            CorreccionPlanAnual = funsetObjectCorreccion(log, dataobject, vvhttpmethod);

            CorreccionPlanAnual = await vobj_sqldata.funCorreccionPlanAnualPost(log, CorreccionPlanAnual, (string) "Correccion");

            //finalizamos la transaccion
            scope.Complete();
         enviarNotificaciones(log, CorreccionPlanAnual,(int) 1);

        }
        catch (Exception ex)
        {
            log.LogInformation("catch::" + ex.Message);
            CorreccionPlanAnual      = new CorreccionPlanAnual();
            CorreccionPlanAnual.Id   = 0;
            CorreccionPlanAnual.Code = System.Convert.ToString(ex.Message);
        }

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(CorreccionPlanAnual, Formatting.Indented);
    }

        if(vvhttpmethod == "FinalizarPlanAnual" )
    {
        CorreccionPlanAnual CorreccionPlanAnual;
        CorreccionPlanAnual CorreccionPlanAnualSave;

        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        try
        {    
            log.LogInformation("vvhttpmethod " + vvhttpmethod);
            CorreccionPlanAnual = new CorreccionPlanAnual();
            CorreccionPlanAnualSave = new CorreccionPlanAnual();
            CorreccionPlanAnual = funsetObjectCorreccion(log, dataobject, vvhttpmethod);

            CorreccionPlanAnual = await vobj_sqldata.funFinalizarPlanAnual(log, CorreccionPlanAnual);
            CorreccionPlanAnualSave = await vobj_sqldata.funCorreccionPlanAnualPost(log, CorreccionPlanAnual,(string) "Finalizado");

            //finalizamos la transaccion
            scope.Complete();

            enviarNotificaciones(log, CorreccionPlanAnual,(int) 2);

        }
        catch (Exception ex)
        {
            log.LogInformation("catch::" + ex.Message);
            CorreccionPlanAnual      = new CorreccionPlanAnual();
            CorreccionPlanAnual.Id   = 0;
            CorreccionPlanAnual.Code = System.Convert.ToString(ex.Message);
        }

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(CorreccionPlanAnual, Formatting.Indented);
    }

            if(vvhttpmethod == "EjecucionVencida" )
    {
       Ejecucion Ejecucion;

        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        try
        {    
            log.LogInformation("vvhttpmethod " + vvhttpmethod);
            Ejecucion = new Ejecucion();
            Ejecucion = funsetObjectEjecucion(log, dataobject);

            Ejecucion = await vobj_sqldata.funNotificaEjecucionPlanAnual(log, Ejecucion, (string) "Vencida");


            //finalizamos la transaccion
            scope.Complete();

            enviarNotificacionEjecucionVencida(log, Ejecucion,(int) 2);

        }
        catch (Exception ex)
        {
            log.LogInformation("catch::" + ex.Message);
            Ejecucion      = new Ejecucion();
            Ejecucion.Id   = 0;
            Ejecucion.CodePlan = System.Convert.ToString(ex.Message);
        }

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(Ejecucion, Formatting.Indented);
    }

     if(vvhttpmethod == "Ejecucion" )
    {
       Ejecucion Ejecucion;

  
            log.LogInformation("vvhttpmethod " + vvhttpmethod);
            Ejecucion = new Ejecucion();
            Ejecucion = funsetObjectEjecucion(log, dataobject);

           



            enviarNotificacionEjecucion(log, Ejecucion,(int) 2);

          
            Ejecucion.Id   = 1;


        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(Ejecucion, Formatting.Indented);
    }



    if(vvhttpmethod == "Supervision" )
    {
        PlanAnualGet objPlanAnualGet;

       Ejecucion Ejecucion;
       long result = 0;
       long total = 0;

        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        try
        {                

            log.LogInformation("vvhttpmethod " + vvhttpmethod);
            Ejecucion = new Ejecucion();
            Ejecucion = funsetObjectEjecucion(log, dataobject);


    log.LogInformation("################################################################ ANDY ########################################################### RUN .");
            foreach (var Adjunto in Ejecucion.Adjuntos)
                {
                result = await vobj_sqldata.funSupervisorEvidencia(log,Adjunto);
                 total = total + result;                   
                }
            Ejecucion.Id = total;
            //Ejecucion = await vobj_sqldata.funNotificaEjecucionPlanAnual(log, Ejecucion, (string) "Vencida");
            objPlanAnualGet = new PlanAnualGet();
     log.LogInformation("################################################################ ANDY ########################################################### RUN END*** .");


            if(Ejecucion.Id > 0)
            {           
               objPlanAnualGet = await vobj_getsqldata.funGetPlanAnualAllList(log, Ejecucion.IdPlan);
            }
            //finalizamos la transaccion
            scope.Complete();

            //enviarNotificacionSupervision(log, Ejecucion,(int) 2);
         
        }
        catch (Exception ex)
        {
            log.LogInformation("catch::" + ex.Message);
           objPlanAnualGet = new PlanAnualGet();
            objPlanAnualGet.Id      = 0;
            objPlanAnualGet.Code = System.Convert.ToString(ex.Message);
        }
     
        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(objPlanAnualGet, Formatting.Indented);  
    }
            if(vvhttpmethod == "deleteItem" )
    {
        CorreccionPlanAnual CorreccionPlanAnual;
        long rows = 0;
        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        try
        {    
             rows = await  vobj_sqldata.funEliminarItemsPlanAnual(log, vniditem, vntipoitem, vvcreated_by);
             CorreccionPlanAnual      = new CorreccionPlanAnual();
            CorreccionPlanAnual.resul   = rows;

            //finalizamos la transaccion
            scope.Complete();
        }
        catch (Exception ex)
        {
            log.LogInformation("catch::" + ex.Message);
            CorreccionPlanAnual      = new CorreccionPlanAnual();
            CorreccionPlanAnual.resul   = 0;
            CorreccionPlanAnual.Code = System.Convert.ToString(ex.Message);
        }

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(CorreccionPlanAnual, Formatting.Indented);
    }



                if(vvhttpmethod == "UpdateCronograma" )
    {
        List<Cronograma> ListCronoU;
        RespControlCambios curobjCC;

        long rows = 0;
        long Count = 0;
        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        try
        {    
            ListCronoU = new List<Cronograma>();

            ListCronoU = funSetObjectCronogramaControCambio(log, dataobject);
            Cronograma resp_U;
            foreach (var item in ListCronoU)
            { resp_U = new Cronograma();
             resp_U = await vobj_sqldata.funPostCronograma(log,item,Convert.ToInt32( item.ActividadPlanId) );
            if(resp_U.Id > 0){
                Count= Count + 1;
            }
            


            }

            curobjCC         = new RespControlCambios();
            curobjCC.Id      = Count;
            curobjCC.Nombre = "Exito";



            scope.Complete();



        }
        catch (Exception ex)
        {
            log.LogInformation("catch::" + ex.Message);
            log.LogInformation("catch::" + ex.Message);
            curobjCC         = new RespControlCambios();
            curobjCC.Id      = 0;
            curobjCC.Nombre = System.Convert.ToString(ex.Message);
        }

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobjCC, Formatting.Indented);
    }

            log.LogInformation("vvhttpmethod::" + vvhttpmethod);

                if(vvhttpmethod == "postResponsable" )
    {           

        ResponsableActividad ResponsableActividad;
        long rows = 0;
        
        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        try
        {    
                        log.LogInformation("try::" );
             ResponsableActividad      = new ResponsableActividad();

            ResponsableActividad = funsetObjectResponsableActividad(log, dataobject, vvhttpmethod);
            rows = await  vobj_sqldata.funActualizarResponsableActividad(log, ResponsableActividad);
            ResponsableActividad.resul   = rows;

            //finalizamos la transaccion
            scope.Complete();
        }
        catch (Exception ex)
        {
            log.LogInformation("catch::" + ex.Message);
            ResponsableActividad      = new ResponsableActividad();
            ResponsableActividad.resul   = 0;
            ResponsableActividad.Motivo = System.Convert.ToString(ex.Message);
        }

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(ResponsableActividad, Formatting.Indented);
    }
   
    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}


public static List<Cronograma> funSetObjectCronogramaControCambio(ILogger log, dynamic dataobject)
{

             log.LogInformation("LISTA Cronograma");     
            List<Cronograma> ListCronoU =  new List<Cronograma>();
            foreach (var cro in dataobject)
            {
            Cronograma CronoU =  new Cronograma();
             log.LogInformation("Cronograma");     


            CronoU.Id               = cro?.Id;
            CronoU.ActividadPlanId  = cro?.ActividadPlanId;

            
            if(cro?.Fecha_S1_Ini != null){
                            string[] Fecha_S1_Ini  = Convert.ToString(cro?.Fecha_S1_Ini).Split("/");
              CronoU.Fecha_S1_Ini   = Convert.ToDateTime(Fecha_S1_Ini[2].ToString()+"-"+Fecha_S1_Ini[1].ToString()+"-"+Fecha_S1_Ini[0].ToString()+" 00:00:00");                
            }
            if(cro?.Fecha_S1_Fin != null){
                            string[] Fecha_S1_Fin  = Convert.ToString(cro?.Fecha_S1_Fin).Split("/");
              CronoU.Fecha_S1_Fin   = Convert.ToDateTime(Fecha_S1_Fin[2].ToString()+"-"+Fecha_S1_Fin[1].ToString()+"-"+Fecha_S1_Fin[0].ToString()+" 00:00:00");
            }

           if(cro?.Fecha_S2_Fin != null){
          string[] Fecha_S2_Fin  = Convert.ToString(cro?.Fecha_S2_Fin).Split("/");
              CronoU.Fecha_S2_Fin   = Convert.ToDateTime(Fecha_S2_Fin[2].ToString()+"-"+Fecha_S2_Fin[1].ToString()+"-"+Fecha_S2_Fin[0].ToString()+" 00:00:00");
                }
            if(cro?.Fecha_S2_Ini != null ){
          string[] Fecha_S2_Ini  = Convert.ToString(cro?.Fecha_S2_Ini).Split("/");
              CronoU.Fecha_S2_Ini   = Convert.ToDateTime(Fecha_S2_Ini[2].ToString()+"-"+Fecha_S2_Ini[1].ToString()+"-"+Fecha_S2_Ini[0].ToString()+" 00:00:00");
                }

            if(cro?.Fecha_S3_Fin != null ){
               string[] Fecha_S3_Fin  = Convert.ToString(cro?.Fecha_S3_Fin).Split("/");
              CronoU.Fecha_S3_Fin   = Convert.ToDateTime(Fecha_S3_Fin[2].ToString()+"-"+Fecha_S3_Fin[1].ToString()+"-"+Fecha_S3_Fin[0].ToString()+" 00:00:00");
             }
            if( cro?.Fecha_S3_Ini != null ){
               string[] Fecha_S3_Ini  = Convert.ToString(cro?.Fecha_S3_Ini).Split("/");
              CronoU.Fecha_S3_Ini   = Convert.ToDateTime(Fecha_S3_Ini[2].ToString()+"-"+Fecha_S3_Ini[1].ToString()+"-"+Fecha_S3_Ini[0].ToString()+" 00:00:00");
             }

                if(cro?.Fecha_S4_Fin != null ){
         string[] Fecha_S4_Fin  = Convert.ToString(cro?.Fecha_S4_Fin).Split("/");
              CronoU.Fecha_S4_Fin   = Convert.ToDateTime(Fecha_S4_Fin[2].ToString()+"-"+Fecha_S4_Fin[1].ToString()+"-"+Fecha_S4_Fin[0].ToString()+" 00:00:00");
           }
            if(cro?.Fecha_S4_Ini != null ){
           string[] Fecha_S4_Ini  = Convert.ToString(cro?.Fecha_S4_Ini).Split("/");
              CronoU.Fecha_S4_Ini   = Convert.ToDateTime(Fecha_S4_Ini[2].ToString()+"-"+Fecha_S4_Ini[1].ToString()+"-"+Fecha_S4_Ini[0].ToString()+" 00:00:00");
            }


             
               
            CronoU.Mes_Name          =cro?.Mes_Name;
            CronoU.Mes_Num           =cro?.Mes_Num;
            CronoU.S1                =cro?.S1;
            CronoU.S2                =cro?.S2;
            CronoU.S3                =cro?.S3;
            CronoU.S4                =cro?.S4;
            CronoU.Year_Frecuencia   =cro?.Year_Frecuencia;

            ListCronoU.Add(CronoU);

            }
            return ListCronoU;

}


public static ControlCambios funSetObjectControlCambio(ILogger log, dynamic dataobject)
{
    ControlCambios controlCambios = new ControlCambios();
    log.LogInformation("En funSetObjectControlCambio");
    
    bool? vvcb_Cronograma                  = dataobject?.Cronograma;
    controlCambios.Cronograma= vvcb_Cronograma;

    if(dataobject?.IdActividad != null)
    {
        controlCambios.IdActividad = dataobject?.IdActividad;
    }


        if(dataobject?.IdActividad != null)
    {
        controlCambios.IdActividad = dataobject?.IdActividad ;
    }
    if(dataobject?.Nombre != null){
         controlCambios.Nombre = dataobject?.Nombre;
    }
    if(dataobject?.Adjunto != null){
         controlCambios.Adjunto = dataobject?.Adjunto;
    }
    if(dataobject?.Created_by != null){
         controlCambios.Date = dataobject?.Created_by;
    }
     
     
         log.LogInformation("En funSetObjectControlCambio antes del return "+controlCambios.Nombre);

    return controlCambios;
     
}

public static ResponsableActividad funsetObjectResponsableActividad(ILogger log, dynamic dataobject, string vvmethod)
{
    ResponsableActividad ResponsableActividad = new ResponsableActividad();

    log.LogInformation("En funsetObjectResponsableActividad");
    

    if(dataobject?.Actividad_PlanId!=null)
    {   ResponsableActividad.Actividad_PlanId = System.Convert.ToInt32(dataobject?.Actividad_PlanId); }

    if(dataobject?.Motivo!=null)
    {   ResponsableActividad.Motivo = dataobject?.Motivo; }

        if(dataobject?.Old_ResponsableId!=null)
    {   ResponsableActividad.Old_ResponsableId = dataobject?.Old_ResponsableId; }

        if(dataobject?.Old_ResponsableCorreo!=null)
    {   ResponsableActividad.Old_ResponsableCorreo = dataobject?.Old_ResponsableCorreo; }
       
        if(dataobject?.Old_ResponsableCargo!=null)
    {   ResponsableActividad.Old_ResponsableCargo = dataobject?.Old_ResponsableCargo; }
           
        if(dataobject?.Old_ResponsableName!=null)
    {   ResponsableActividad.Old_ResponsableName = dataobject?.Old_ResponsableName; }

        if(dataobject?.New_ResponsableId!=null)
    {   ResponsableActividad.New_ResponsableId = dataobject?.New_ResponsableId; }

        if(dataobject?.New_ResponsableCorreo!=null)
    {   ResponsableActividad.New_ResponsableCorreo = dataobject?.New_ResponsableCorreo; }
       
        if(dataobject?.New_ResponsableCargo!=null)
    {   ResponsableActividad.New_ResponsableCargo = dataobject?.New_ResponsableCargo; }
           
        if(dataobject?.New_ResponsableName!=null)
    {   ResponsableActividad.New_ResponsableName = dataobject?.New_ResponsableName; }


    if(dataobject?.Created_By!=null)
    {   ResponsableActividad.Created_By = dataobject?.Created_By; }

    log.LogInformation("En funsetObjectCorreccion antes del return "+ResponsableActividad.Motivo);

    return ResponsableActividad;
}

public static CorreccionPlanAnual funsetObjectCorreccion(ILogger log, dynamic dataobject, string vvmethod)
{
    CorreccionPlanAnual CorreccionPlanAnual = new CorreccionPlanAnual();

    log.LogInformation("En funsetObjectCorreccion");
    
    if(dataobject?.listadoDestinatarios!=null)
    {   
        List<DestinatariosCorreccion> ListDestinatariosCorreccion = new List<DestinatariosCorreccion>();
        foreach (var item in dataobject?.listadoDestinatarios)
        {
            log.LogInformation("item?.Name ");
            DestinatariosCorreccion DestinatariosCorreccion = new DestinatariosCorreccion();
            DestinatariosCorreccion.Name     = item?.Name; 
            DestinatariosCorreccion.UserHash = item?.UserHash; 
            DestinatariosCorreccion.Correo   = item?.Correo; 
            DestinatariosCorreccion.Cargo    = item?.Cargo; 

            ListDestinatariosCorreccion.Add(DestinatariosCorreccion);
        }
        CorreccionPlanAnual.DestinatariosCorreccion = ListDestinatariosCorreccion;
    }

    if(dataobject?.Id!=null)
    {   CorreccionPlanAnual.Id = dataobject?.Id; }

    if(dataobject?.Code!=null)
    {   CorreccionPlanAnual.Code = dataobject?.Code; }

        if(dataobject?.emailResponsable!=null)
    {   CorreccionPlanAnual.emailResponsable = dataobject?.emailResponsable; }

        if(dataobject?.nameResponsable!=null)
    {   CorreccionPlanAnual.nameResponsable = dataobject?.nameResponsable; }
       
        if(dataobject?.jobResponsable!=null)
    {   CorreccionPlanAnual.jobResponsable = dataobject?.jobResponsable; }
           
        if(dataobject?.ubicacion!=null)
    {   CorreccionPlanAnual.ubicacion = dataobject?.ubicacion; }
      if(dataobject?.tipo!=null)
    {   CorreccionPlanAnual.Tipo = dataobject?.tipo; }

    if(dataobject?.Created_By!=null)
    {   CorreccionPlanAnual.Created_By = dataobject?.Created_By; }

    log.LogInformation("En funsetObjectCorreccion antes del return "+CorreccionPlanAnual.Code);

    return CorreccionPlanAnual;
}

public static Ejecucion funsetObjectEjecucion(ILogger log, dynamic dataobject)
{
    Ejecucion Ejecucion = new Ejecucion();

    log.LogInformation("En funsetObjectCorreccion");
    
    if(dataobject?.Evidencias!=null)
    {   
        List<Evidencia> ListEvidencia = new List<Evidencia>();
        foreach (var item in dataobject?.Evidencias)
        {
            log.LogInformation("item?.Name ");
            Evidencia Evidencias = new Evidencia();
            Evidencias.Name     = item?.Name; 
            Evidencias.Estado = item?.Estado; 
            

            ListEvidencia.Add(Evidencias);
        }
        Ejecucion.Evidencias = ListEvidencia;
    }

        if(dataobject?.Adjuntos!=null)
    {   
        List<UpdateAdjunto> ListAdjunto = new List<UpdateAdjunto>();
        foreach (var item in dataobject?.Adjuntos)
        {
            log.LogInformation("item?.Name ");
            UpdateAdjunto Adjuntos = new UpdateAdjunto();
            Adjuntos.Id     = System.Convert.ToInt64(item?.IdAdjunto); 
            Adjuntos.Motivo     = item?.Motivo; 
            Adjuntos.EstadoAdjuntoId = System.Convert.ToInt64(item?.EstadoAdjuntoId); 
            

            ListAdjunto.Add(Adjuntos);
        }
        Ejecucion.Adjuntos = ListAdjunto;
    }


    if(dataobject?.Id!=null)
    {   Ejecucion.Id = dataobject?.Id; }
        if(dataobject?.IdPlan!=null)
    {   Ejecucion.IdPlan = dataobject?.IdPlan; }
    
    if(dataobject?.IdActividad!=null)
    {   Ejecucion.IdActividad = dataobject?.IdActividad; }
    if(dataobject?.IdTarea!=null)
    {   Ejecucion.IdTarea = dataobject?.IdTarea; }

    if(dataobject?.CodePlan!=null)
    {   Ejecucion.CodePlan = dataobject?.CodePlan; }

        if(dataobject?.emailResponsable!=null)
    {   Ejecucion.emailResponsable = dataobject?.emailResponsable; }

        if(dataobject?.nameResponsable!=null)
    {   Ejecucion.nameResponsable = dataobject?.nameResponsable; }
       
        if(dataobject?.jobResponsable!=null)
    {   Ejecucion.jobResponsable = dataobject?.jobResponsable; }

     if(dataobject?.Tipo!=null)
    {   Ejecucion.Tipo = dataobject?.Tipo; }
           
        if(dataobject?.Ubicacion!=null)
    {   Ejecucion.Ubicacion = dataobject?.Ubicacion; }

        if(dataobject?.Created_By!=null)
    {   Ejecucion.Created_By = dataobject?.Created_By; }
            
            if(dataobject?.EmailNotificado!=null)
    {   Ejecucion.EmailNotificado = dataobject?.EmailNotificado; }


      if(dataobject?.NameActividad!=null)
    {   Ejecucion.NameActividad = dataobject?.NameActividad; }

    if(dataobject?.EstadoActividad!=null)
    {   Ejecucion.EstadoActividad = dataobject?.EstadoActividad; }

    log.LogInformation("En funsetObjectCorreccion antes del return "+Ejecucion.NameActividad);

    return Ejecucion;
}



public static Planes_AnualesPost funsetObject(ILogger log, dynamic dataobject, string vvmethod)
{
    Planes_AnualesPost curobj = new Planes_AnualesPost();
   log.LogInformation("Planes_AnualesPost");    


     if (vvmethod == "post")//INSERTAR
     {
        curobj.Id                       = 0;
        curobj.Create_Date              = dataobject?.Create_Date;
       curobj.Create_By                = dataobject?.Create_By;
     }
     else if(vvmethod == "put")
     {
        curobj.Id                       = dataobject?.Id;
        curobj.Last_Update_By           = dataobject?.Last_Update_By;
        curobj.Last_Update_Date         = dataobject?.Last_Update_Date;
     }

        // long? Estado_PlanId = dataobject?.Estado_PlanId;
        // long? ProgramaId = dataobject?.ProgramaId;
        // long? GerenciaId = dataobject?.GerenciaId;
        // long? SedeId = dataobject?.SedeId;
        // long? GerenciaId = dataobject?.GerenciaId;


        curobj.Email_Supervisor       = dataobject?.Email_Supervisor;
        curobj.Code                   = dataobject?.Code;

        if(dataobject?.Estado_PlanId != null){
        curobj.Estado_PlanId          = System.Convert.ToInt64(dataobject?.Estado_PlanId);
        }else{
            curobj.Estado_PlanId      =   0;
        }
        if(dataobject?.ProgramaId != null){
        curobj.ProgramaId             = System.Convert.ToInt64(dataobject?.ProgramaId);
        }else{
            curobj.ProgramaId      =   0;
        }
        if(dataobject?.GerenciaId != null){
        curobj.GerenciaId             = System.Convert.ToInt64(dataobject?.GerenciaId);
        }else{
            curobj.GerenciaId      =   0;
        }
        if(dataobject?.SedeId != null){
        curobj.SedeId             = System.Convert.ToInt64(dataobject?.SedeId);
        }else{
            curobj.SedeId      =   0;
        }
        if(dataobject?.Year_Plan != null){
        curobj.Year_Plan                = System.Convert.ToInt32(dataobject?.Year_Plan);
        }else{
            curobj.Year_Plan      =   0;
        }
    
        curobj.Suspendido                 = dataobject?.Suspendido;
        curobj.MotivoSuspencion           = dataobject?.MotivoSuspencion;


        curobj.EquipoId                 = dataobject?.EquipoId;
 

           
if(dataobject?.Objetivos.Count > 0){
   log.LogInformation("LISTA Objetivo");     

    List<Objetivo> Listobject = new List<Objetivo>();
    foreach (var obj in dataobject?.Objetivos)
    {
   log.LogInformation(" Objetivo");     
        Objetivo objetivo = new Objetivo();
        if(vvmethod == "put")
        {
        objetivo.Id               = obj?.Id;

        }
        objetivo.Code               = obj?.Code;
        objetivo.Objetivo_Name      = obj?.Objetivo_Name;
        if(obj?.Actividades.Count > 0){
           log.LogInformation("LISTA Actividad");     
        List<Actividad> ListActivity = new List<Actividad>();
        foreach (var ObjAct in obj?.Actividades)
        {
               log.LogInformation("Actividades");     
            Actividad act = new Actividad();
            if(vvmethod == "put")
            {
            act.Id               = ObjAct?.Id;
            }
            act.Peso                   = ObjAct?.Peso;
            act.Actividad_Name         = ObjAct?.Actividad_Name;
            act.ResponsableCargo       = ObjAct?.ResponsableCargo;
            act.ResponsableCorreo      = ObjAct?.ResponsableCorreo;
            act.ResponsableId          = ObjAct?.ResponsableId;
            act.ResponsableName        = ObjAct?.ResponsableName;

        if(ObjAct?.Tareas.Count > 0){
           log.LogInformation("LISTA Tarea");    
            List<Tarea> ListTareas  = new List<Tarea>();
            foreach (var tar in ObjAct?.Tareas)
            {
            log.LogInformation("Tarea");    

            Tarea tarea  = new Tarea();
            if(vvmethod == "put")
            {
            tarea.Id               = tar?.Id;
            }           

            tarea.Color                 = tar?.Color;
            tarea.Estado                = tar?.Estado;
            tarea.Evidencia_Name        = tar?.Evidencia_Name;
            tarea.Fecha_Ejecutada_Fin   = tar?.Fecha_Ejecutada_Ini;
            //tarea.Fecha_Programada_Fin  = tar?.Fecha_Programada_Fin;
           // tarea.Fecha_Programada_Ini  = tar?.Fecha_Programada_Ini;
            tarea.IdEstado              = tar?.IdEstado;
            tarea.ResponsableId         = tar?.ResponsableId;
            tarea.ResponsableName       = tar?.ResponsableName;
            
            if(tar?.Fecha_Programada_Fin != null){
           string[] Fecha_Programada_Fin  = Convert.ToString(tar?.Fecha_Programada_Fin).Split("/");
             tarea.Fecha_Programada_Fin  = Convert.ToDateTime(Fecha_Programada_Fin[2].ToString()+"-"+Fecha_Programada_Fin[1].ToString()+"-"+Fecha_Programada_Fin[0].ToString()+" 00:00:00");
            }

            if(tar?.Fecha_Programada_Ini != null){
           string[] Fecha_Programada_Ini  = Convert.ToString(tar?.Fecha_Programada_Ini).Split("/");
             tarea.Fecha_Programada_Ini  = Convert.ToDateTime(Fecha_Programada_Ini[2].ToString()+"-"+Fecha_Programada_Ini[1].ToString()+"-"+Fecha_Programada_Ini[0].ToString()+" 00:00:00");
            }
            ListTareas.Add(tarea);

            }
            
            act.Tareas     = ListTareas;          
        }
                if(ObjAct?.Cronogramas.Count > 0){
                       log.LogInformation("LISTA Cronograma");     
            List<Cronograma> ListCrono =  new List<Cronograma>();
            foreach (var cro in ObjAct?.Cronogramas)
            {
            Cronograma Crono =  new Cronograma();
             log.LogInformation("Cronograma");     


            if(vvmethod == "put")
            {
            Crono.Id               = cro?.Id;
            Crono.ActividadPlanId  = cro?.ActividadPlanId;

            
            if(cro?.Fecha_S1_Ini != null){
                            string[] Fecha_S1_Ini  = Convert.ToString(cro?.Fecha_S1_Ini).Split("/");
              Crono.Fecha_S1_Ini   = Convert.ToDateTime(Fecha_S1_Ini[2].ToString()+"-"+Fecha_S1_Ini[1].ToString()+"-"+Fecha_S1_Ini[0].ToString()+" 00:00:00");                
            }
            if(cro?.Fecha_S1_Fin != null){
                            string[] Fecha_S1_Fin  = Convert.ToString(cro?.Fecha_S1_Fin).Split("/");
              Crono.Fecha_S1_Fin   = Convert.ToDateTime(Fecha_S1_Fin[2].ToString()+"-"+Fecha_S1_Fin[1].ToString()+"-"+Fecha_S1_Fin[0].ToString()+" 00:00:00");
            }

           if(cro?.Fecha_S2_Fin != null){
          string[] Fecha_S2_Fin  = Convert.ToString(cro?.Fecha_S2_Fin).Split("/");
              Crono.Fecha_S2_Fin   = Convert.ToDateTime(Fecha_S2_Fin[2].ToString()+"-"+Fecha_S2_Fin[1].ToString()+"-"+Fecha_S2_Fin[0].ToString()+" 00:00:00");
                }
            if(cro?.Fecha_S2_Ini != null ){
          string[] Fecha_S2_Ini  = Convert.ToString(cro?.Fecha_S2_Ini).Split("/");
              Crono.Fecha_S2_Ini   = Convert.ToDateTime(Fecha_S2_Ini[2].ToString()+"-"+Fecha_S2_Ini[1].ToString()+"-"+Fecha_S2_Ini[0].ToString()+" 00:00:00");
                }

            if(cro?.Fecha_S3_Fin != null ){
               string[] Fecha_S3_Fin  = Convert.ToString(cro?.Fecha_S3_Fin).Split("/");
              Crono.Fecha_S3_Fin   = Convert.ToDateTime(Fecha_S3_Fin[2].ToString()+"-"+Fecha_S3_Fin[1].ToString()+"-"+Fecha_S3_Fin[0].ToString()+" 00:00:00");
             }
            if( cro?.Fecha_S3_Ini != null ){
               string[] Fecha_S3_Ini  = Convert.ToString(cro?.Fecha_S3_Ini).Split("/");
              Crono.Fecha_S3_Ini   = Convert.ToDateTime(Fecha_S3_Ini[2].ToString()+"-"+Fecha_S3_Ini[1].ToString()+"-"+Fecha_S3_Ini[0].ToString()+" 00:00:00");
             }

                if(cro?.Fecha_S4_Fin != null ){
         string[] Fecha_S4_Fin  = Convert.ToString(cro?.Fecha_S4_Fin).Split("/");
              Crono.Fecha_S4_Fin   = Convert.ToDateTime(Fecha_S4_Fin[2].ToString()+"-"+Fecha_S4_Fin[1].ToString()+"-"+Fecha_S4_Fin[0].ToString()+" 00:00:00");
           }
            if(cro?.Fecha_S4_Ini != null ){
           string[] Fecha_S4_Ini  = Convert.ToString(cro?.Fecha_S4_Ini).Split("/");
              Crono.Fecha_S4_Ini   = Convert.ToDateTime(Fecha_S4_Ini[2].ToString()+"-"+Fecha_S4_Ini[1].ToString()+"-"+Fecha_S4_Ini[0].ToString()+" 00:00:00");
            }

            
            }else if(vvmethod == "post"){
                
            if(cro?.Fecha_S1_Ini != null ){
                            string[] Fecha_S1_Ini  = Convert.ToString(cro?.Fecha_S1_Ini).Split("/");
              Crono.Fecha_S1_Ini   = Convert.ToDateTime(Fecha_S1_Ini[2].ToString()+"-"+Fecha_S1_Ini[1].ToString()+"-"+Fecha_S1_Ini[0].ToString()+" 00:00:00");                
            }
            if(cro?.Fecha_S1_Fin != null ){
                            string[] Fecha_S1_Fin  = Convert.ToString(cro?.Fecha_S1_Fin).Split("/");
              Crono.Fecha_S1_Fin   = Convert.ToDateTime(Fecha_S1_Fin[2].ToString()+"-"+Fecha_S1_Fin[1].ToString()+"-"+Fecha_S1_Fin[0].ToString()+" 00:00:00");
            }

           if(cro?.Fecha_S2_Fin != null ){
          string[] Fecha_S2_Fin  = Convert.ToString(cro?.Fecha_S2_Fin).Split("/");
              Crono.Fecha_S2_Fin   = Convert.ToDateTime(Fecha_S2_Fin[2].ToString()+"-"+Fecha_S2_Fin[1].ToString()+"-"+Fecha_S2_Fin[0].ToString()+" 00:00:00");
                }
            if(cro?.Fecha_S2_Ini != null  ){
          string[] Fecha_S2_Ini  = Convert.ToString(cro?.Fecha_S2_Ini).Split("/");
              Crono.Fecha_S2_Ini   = Convert.ToDateTime(Fecha_S2_Ini[2].ToString()+"-"+Fecha_S2_Ini[1].ToString()+"-"+Fecha_S2_Ini[0].ToString()+" 00:00:00");
                }

            if(cro?.Fecha_S3_Fin != null  ){
               string[] Fecha_S3_Fin  = Convert.ToString(cro?.Fecha_S3_Fin).Split("/");
              Crono.Fecha_S3_Fin   = Convert.ToDateTime(Fecha_S3_Fin[2].ToString()+"-"+Fecha_S3_Fin[1].ToString()+"-"+Fecha_S3_Fin[0].ToString()+" 00:00:00");
             }
            if(cro?.Fecha_S3_Ini != null  ){
               string[] Fecha_S3_Ini  = Convert.ToString(cro?.Fecha_S3_Ini).Split("/");
              Crono.Fecha_S3_Ini   = Convert.ToDateTime(Fecha_S3_Ini[2].ToString()+"-"+Fecha_S3_Ini[1].ToString()+"-"+Fecha_S3_Ini[0].ToString()+" 00:00:00");
             }

                if(cro?.Fecha_S4_Fin != null  ){
         string[] Fecha_S4_Fin  = Convert.ToString(cro?.Fecha_S4_Fin).Split("/");
              Crono.Fecha_S4_Fin   = Convert.ToDateTime(Fecha_S4_Fin[2].ToString()+"-"+Fecha_S4_Fin[1].ToString()+"-"+Fecha_S4_Fin[0].ToString()+" 00:00:00");
           }
            if(cro?.Fecha_S4_Ini != null  ){
           string[] Fecha_S4_Ini  = Convert.ToString(cro?.Fecha_S4_Ini).Split("/");
              Crono.Fecha_S4_Ini   = Convert.ToDateTime(Fecha_S4_Ini[2].ToString()+"-"+Fecha_S4_Ini[1].ToString()+"-"+Fecha_S4_Ini[0].ToString()+" 00:00:00");
            }

            }

             
               
            Crono.Mes_Name          =cro?.Mes_Name;
            Crono.Mes_Num           =cro?.Mes_Num;
            Crono.S1                =cro?.S1;
            Crono.S2                =cro?.S2;
            Crono.S3                =cro?.S3;
            Crono.S4                =cro?.S4;
            Crono.Year_Frecuencia   =cro?.Year_Frecuencia;

            ListCrono.Add(Crono);

            }
            
            act.Cronogramas = ListCrono;
                }
            ListActivity.Add(act);
        }
        objetivo.Actividades    =   ListActivity;
    }
    if(obj?.SubObjetivos.Count > 0){

           log.LogInformation("LISTA SubObjetivo");    

        List<SubObjetivo> ListSubObj = new List<SubObjetivo>();
        foreach (var subObject in obj?.SubObjetivos)
        {
            log.LogInformation("SubObjetivo");    
        SubObjetivo SubObj = new SubObjetivo();
        if(vvmethod == "put")
            {
            SubObj.Id               = subObject?.Id;
            }
                 if (vvmethod == "post")//INSERTAR
     {
        SubObj.Id                       = 0;
     }

            SubObj.SubObjetivo_Name = subObject?.SubObjetivo_Name;
               
                if(subObject?.Actividades.Count > 0){

         //  log.LogInformation("LISTA SubObjetivo Actividad");    
        List<Actividad> ListActivitySub = new List<Actividad>();
        foreach (var SubObjAct in subObject?.Actividades)
        {
              //  log.LogInformation(" SubObjetivo Actividad");    

            Actividad act2 = new Actividad();
            if(vvmethod == "put")
            {
            act2.Id               = SubObjAct?.Id;
            } 
             if(vvmethod == "post")
            {
            act2.Id               = 0;
            } 
            act2.Peso                   = SubObjAct?.Peso;
            act2.Actividad_Name         = SubObjAct?.Actividad_Name;
            act2.ResponsableCargo       = SubObjAct?.ResponsableCargo;
            act2.ResponsableCorreo      = SubObjAct?.ResponsableCorreo;
            act2.ResponsableId          = SubObjAct?.ResponsableId;
            act2.ResponsableName        = SubObjAct?.ResponsableName;
                            
            if(SubObjAct?.Cronogramas.Count > 0){

          // log.LogInformation("LISTA SubObjetivo Cronograma");    
            List<Cronograma> ListCronoSub =  new List<Cronograma>();
            foreach (var cro in SubObjAct?.Cronogramas)
            {
           //  log.LogInformation(" SubObjetivo Cronograma");    
            Cronograma Crono =  new Cronograma();
            
             if(vvmethod == "post")
            {
            Crono.Id               = 0;
            }
            if(vvmethod == "put")
            {
            Crono.Id               = cro?.Id;
            Crono.ActividadPlanId  = cro?.ActividadPlanId;

            
            if(cro?.Fecha_S1_Ini != null){
                            string[] Fecha_S1_Ini  = Convert.ToString(cro?.Fecha_S1_Ini).Split("/");
              Crono.Fecha_S1_Ini   = Convert.ToDateTime(Fecha_S1_Ini[2].ToString()+"-"+Fecha_S1_Ini[1].ToString()+"-"+Fecha_S1_Ini[0].ToString()+" 00:00:00");                
            }
            if(cro?.Fecha_S1_Fin != null){
                            string[] Fecha_S1_Fin  = Convert.ToString(cro?.Fecha_S1_Fin).Split("/");
              Crono.Fecha_S1_Fin   = Convert.ToDateTime(Fecha_S1_Fin[2].ToString()+"-"+Fecha_S1_Fin[1].ToString()+"-"+Fecha_S1_Fin[0].ToString()+" 00:00:00");
            }

           if(cro?.Fecha_S2_Fin != null){
          string[] Fecha_S2_Fin  = Convert.ToString(cro?.Fecha_S2_Fin).Split("/");
              Crono.Fecha_S2_Fin   = Convert.ToDateTime(Fecha_S2_Fin[2].ToString()+"-"+Fecha_S2_Fin[1].ToString()+"-"+Fecha_S2_Fin[0].ToString()+" 00:00:00");
                }
            if(cro?.Fecha_S2_Ini != null ){
          string[] Fecha_S2_Ini  = Convert.ToString(cro?.Fecha_S2_Ini).Split("/");
              Crono.Fecha_S2_Ini   = Convert.ToDateTime(Fecha_S2_Ini[2].ToString()+"-"+Fecha_S2_Ini[1].ToString()+"-"+Fecha_S2_Ini[0].ToString()+" 00:00:00");
                }

            if(cro?.Fecha_S3_Fin != null ){
               string[] Fecha_S3_Fin  = Convert.ToString(cro?.Fecha_S3_Fin).Split("/");
              Crono.Fecha_S3_Fin   = Convert.ToDateTime(Fecha_S3_Fin[2].ToString()+"-"+Fecha_S3_Fin[1].ToString()+"-"+Fecha_S3_Fin[0].ToString()+" 00:00:00");
             }
            if( cro?.Fecha_S3_Ini != null ){
               string[] Fecha_S3_Ini  = Convert.ToString(cro?.Fecha_S3_Ini).Split("/");
              Crono.Fecha_S3_Ini   = Convert.ToDateTime(Fecha_S3_Ini[2].ToString()+"-"+Fecha_S3_Ini[1].ToString()+"-"+Fecha_S3_Ini[0].ToString()+" 00:00:00");
             }

                if(cro?.Fecha_S4_Fin != null ){
         string[] Fecha_S4_Fin  = Convert.ToString(cro?.Fecha_S4_Fin).Split("/");
              Crono.Fecha_S4_Fin   = Convert.ToDateTime(Fecha_S4_Fin[2].ToString()+"-"+Fecha_S4_Fin[1].ToString()+"-"+Fecha_S4_Fin[0].ToString()+" 00:00:00");
           }
            if(cro?.Fecha_S4_Ini != null ){
           string[] Fecha_S4_Ini  = Convert.ToString(cro?.Fecha_S4_Ini).Split("/");
              Crono.Fecha_S4_Ini   = Convert.ToDateTime(Fecha_S4_Ini[2].ToString()+"-"+Fecha_S4_Ini[1].ToString()+"-"+Fecha_S4_Ini[0].ToString()+" 00:00:00");
            }

            
            }else if(vvmethod == "post"){
                
            if( cro?.Fecha_S1_Ini != null){
                            string[] Fecha_S1_Ini  = Convert.ToString(cro?.Fecha_S1_Ini).Split("/");
              Crono.Fecha_S1_Ini   = Convert.ToDateTime(Fecha_S1_Ini[2].ToString()+"-"+Fecha_S1_Ini[1].ToString()+"-"+Fecha_S1_Ini[0].ToString()+" 00:00:00");                
            }
            if( cro?.Fecha_S1_Fin != null){
                            string[] Fecha_S1_Fin  = Convert.ToString(cro?.Fecha_S1_Fin).Split("/");
              Crono.Fecha_S1_Fin   = Convert.ToDateTime(Fecha_S1_Fin[2].ToString()+"-"+Fecha_S1_Fin[1].ToString()+"-"+Fecha_S1_Fin[0].ToString()+" 00:00:00");
            }

           if( cro?.Fecha_S2_Fin != null){
          string[] Fecha_S2_Fin  = Convert.ToString(cro?.Fecha_S2_Fin).Split("/");
              Crono.Fecha_S2_Fin   = Convert.ToDateTime(Fecha_S2_Fin[2].ToString()+"-"+Fecha_S2_Fin[1].ToString()+"-"+Fecha_S2_Fin[0].ToString()+" 00:00:00");
                }
            if( cro?.Fecha_S2_Ini != null ){
          string[] Fecha_S2_Ini  = Convert.ToString(cro?.Fecha_S2_Ini).Split("/");
              Crono.Fecha_S2_Ini   = Convert.ToDateTime(Fecha_S2_Ini[2].ToString()+"-"+Fecha_S2_Ini[1].ToString()+"-"+Fecha_S2_Ini[0].ToString()+" 00:00:00");
                }

            if( cro?.Fecha_S3_Fin != null ){
               string[] Fecha_S3_Fin  = Convert.ToString(cro?.Fecha_S3_Fin).Split("/");
              Crono.Fecha_S3_Fin   = Convert.ToDateTime(Fecha_S3_Fin[2].ToString()+"-"+Fecha_S3_Fin[1].ToString()+"-"+Fecha_S3_Fin[0].ToString()+" 00:00:00");
             }
            if( cro?.Fecha_S3_Ini != null ){
               string[] Fecha_S3_Ini  = Convert.ToString(cro?.Fecha_S3_Ini).Split("/");
              Crono.Fecha_S3_Ini   = Convert.ToDateTime(Fecha_S3_Ini[2].ToString()+"-"+Fecha_S3_Ini[1].ToString()+"-"+Fecha_S3_Ini[0].ToString()+" 00:00:00");
             }

                if( cro?.Fecha_S4_Fin != null ){
         string[] Fecha_S4_Fin  = Convert.ToString(cro?.Fecha_S4_Fin).Split("/");
              Crono.Fecha_S4_Fin   = Convert.ToDateTime(Fecha_S4_Fin[2].ToString()+"-"+Fecha_S4_Fin[1].ToString()+"-"+Fecha_S4_Fin[0].ToString()+" 00:00:00");
           }
            if( cro?.Fecha_S4_Ini != null ){
           string[] Fecha_S4_Ini  = Convert.ToString(cro?.Fecha_S4_Ini).Split("/");
              Crono.Fecha_S4_Ini   = Convert.ToDateTime(Fecha_S4_Ini[2].ToString()+"-"+Fecha_S4_Ini[1].ToString()+"-"+Fecha_S4_Ini[0].ToString()+" 00:00:00");
            }

            }


            Crono.Mes_Name          =cro?.Mes_Name;
            Crono.Mes_Num           =cro?.Mes_Num;
            Crono.S1                =cro?.S1;
            Crono.S2                =cro?.S2;
            Crono.S3                =cro?.S3;
            Crono.S4                =cro?.S4;
            Crono.Year_Frecuencia   =cro?.Year_Frecuencia;

            ListCronoSub.Add(Crono);

            }
        
            act2.Cronogramas = ListCronoSub;
            }
            
         if(SubObjAct?.Tareas.Count > 0){
          // log.LogInformation("LISTA SubObjetivo Tarea");    

            List<Tarea> ListTareasSub  = new List<Tarea>();
            foreach (var tar in SubObjAct?.Tareas)
            {
           //log.LogInformation(" SubObjetivo Tarea");    
            Tarea tarea  = new Tarea();
            if(vvmethod == "put")
            {
            tarea.Id               = tar?.Id;
            } 
            if(vvmethod == "post")
            {
            tarea.Id               = 0;
            } 
            tarea.Color                 = tar?.Color;
            tarea.Estado                = tar?.Estado;
            tarea.Evidencia_Name        = tar?.Evidencia_Name;
            tarea.Fecha_Ejecutada_Fin   = tar?.Fecha_Ejecutada_Ini;
            //tarea.Fecha_Programada_Fin  = tar?.Fecha_Programada_Fin;
            //tarea.Fecha_Programada_Ini  = tar?.Fecha_Programada_Ini;
            tarea.IdEstado              = tar?.IdEstado;
            tarea.ResponsableId         = tar?.ResponsableId;
            tarea.ResponsableName       = tar?.ResponsableName;
            
            if(tar?.Fecha_Programada_Fin != null){
           string[] Fecha_Programada_Fin  = Convert.ToString(tar?.Fecha_Programada_Fin).Split("/");
             tarea.Fecha_Programada_Fin  = Convert.ToDateTime(Fecha_Programada_Fin[2].ToString()+"-"+Fecha_Programada_Fin[1].ToString()+"-"+Fecha_Programada_Fin[0].ToString()+" 00:00:00");
            }

            if(tar?.Fecha_Programada_Ini != null){
           string[] Fecha_Programada_Ini  = Convert.ToString(tar?.Fecha_Programada_Ini).Split("/");
             tarea.Fecha_Programada_Ini  = Convert.ToDateTime(Fecha_Programada_Ini[2].ToString()+"-"+Fecha_Programada_Ini[1].ToString()+"-"+Fecha_Programada_Ini[0].ToString()+" 00:00:00");
            }

            ListTareasSub.Add(tarea);

            }
        
            act2.Tareas     = ListTareasSub;  
         }        
            
            ListActivitySub.Add(act2);
        
        }
        
        SubObj.Actividades    =   ListActivitySub;
                }

            ListSubObj.Add(SubObj);
        }
        
         
         objetivo.SubObjetivos = ListSubObj;
    }


              
        Listobject.Add(objetivo);

    }
   
 
  curobj.Objetivos = Listobject;
}

   // }  
    // if (vvmethod == "put") //MODIFICAR
    // {
    //     /*curobj.Id                  = dataobject?.Id;
    //     curobj.TipoHallazgoId      = dataobject?.TipoHallazgoId;
    //     curobj.AnalisisCausa       = dataobject?.AnalisisCausa;
    //     curobj.Last_Updated_By     = dataobject?.Last_Updated_By;
    //     curobj.Hallazgo            = dataobject?.Hallazgo;
    //     curobj.ResponsableName     = dataobject?.ResponsableName;
    //     curobj.ResponsableCorreo   = dataobject?.ResponsableCorreo;
    //     curobj.ResponsableCargo    = dataobject?.ResponsableCargo;
    //     curobj.ResponsableUserHash = dataobject?.ResponsableUserHash; */   
    // }

    /*if(dataobject?.EnviarCorreo!=null)
    {   curobj.EnviarCorreo = dataobject?.EnviarCorreo; }

    curobj.Cargo = dataobject?.Cargo;
    curobj.Correo = dataobject?.Correo;*/
    
    return curobj;
}

/**
 * Enviar notificaciones ...
 */
public static async void enviarNotificacionEjecucion(ILogger log, Ejecucion Ejecucion, int tipo )
{



    string correos          = "markos.j.gonzalez.m@gmail.com, mgonzalez@visualsat.com, kllancachahua@visualsat.com, tguin@tasa.com.pe, mzevallos@tasa.com.pe, fromero@tasa.com.pe";//orlyvila@visualsat.com,
    DataEmailNew oDataEmail = new DataEmailNew();
    oDataEmail.sendto       = correos;

        // ASUNTO DEL EMAIL
    oDataEmail.emailsubject = "Resultado de evaluación Actividad "+Ejecucion.NameActividad+"-"+Ejecucion.EstadoActividad+" del Plan Anual- "+Ejecucion.CodePlan+"-"+Ejecucion.Ubicacion;


    var bodyEmail = "";
     bodyEmail += "<p><a  href='https://sigtasa.tasa.com.pe/'  target='_blank' title='TasaSsoma'> <img id='logo' alt='tasassoma' src='https://sigtasa.tasa.com.pe/images/logoSIGTASA.png' width ='200px' height ='50px'></a></p>";
     bodyEmail += "<p>Saludos cordiales: </p>";
     bodyEmail += "<br>  ";
     bodyEmail += "<p>Para informarle que la actividad  "+Ejecucion.NameActividad+" se encuentra "+Ejecucion.EstadoActividad+" y contiene las siguientes evidencias con los siguiente resultados:</p>";
     
        foreach (var item in Ejecucion.Evidencias)
        {
                 bodyEmail += "<p>"+item.Name+" - "+ item.Estado+"</p>";
        }     

     bodyEmail += "<br> ";
     bodyEmail += "<p>De encontrase observadas deben ser subsanadas a la brevedad para su validación y aprobación. Se adjunta el acceso al sistema para su atención: </p>";
     bodyEmail += "<p>https://sigtasa.tasa.com.pe/main.html </p>";
     bodyEmail += "<br>  ";
     bodyEmail += "Atte. ";
     bodyEmail += "<br>  ";
     bodyEmail += "<p>"+Ejecucion.nameResponsable+"</p>";
     bodyEmail += "<p>"+Ejecucion.jobResponsable+"</p>";
     bodyEmail += "<p>"+Ejecucion.emailResponsable+"</p>";

     


    oDataEmail.bodyhtml = bodyEmail;

    // ENVIO DEL EMAIL
    //static readonly HttpClient httpclient = new HttpClient();
    HttpClient httpclient = new HttpClient();

    var jsonuser3 = JsonConvert.SerializeObject(oDataEmail);

    var datauser3 = new StringContent(jsonuser3, Encoding.UTF8, "application/json");

    var urlemail3 = "https://7454em4ils3nder-app.azurewebsites.net/api/VisitasaSendEmail?code=LXQwITmvDAAqXTgaDcBAkmbZXBCv5KnS6bY/XszaOjqHus4M3dbDzw==";

    httpclient.DefaultRequestHeaders.Add("apikey", "r$3#23516ewew5");

    log.LogInformation(" Esperamos Respuesta Del Env�o Del Correo.");
    log.LogInformation(" oDataEmail.sendto -> "+oDataEmail.sendto);
    var responseuser3 = await httpclient.PostAsync(urlemail3, datauser3);

    string resultEmail = responseuser3.Content.ReadAsStringAsync().Result;

    //log.LogInformation("jsonuser3 " + jsonuser3);
    log.LogInformation("resultEmail " + resultEmail);

}

public static async void enviarNotificacionEjecucionVencida(ILogger log, Ejecucion Ejecucion, int tipo )
{



    string correos          = "markos.j.gonzalez.m@gmail.com, mgonzalez@visualsat.com, kllancachahua@visualsat.com, tguin@tasa.com.pe, mzevallos@tasa.com.pe, fromero@tasa.com.pe"; //orlyvila@visualsat.com,
    DataEmailNew oDataEmail = new DataEmailNew();
    oDataEmail.sendto       = correos;

        // ASUNTO DEL EMAIL
    oDataEmail.emailsubject = "Solicitud de evaluación Actividad "+Ejecucion.NameActividad+"-"+Ejecucion.EstadoActividad+" del Plan Anual- "+Ejecucion.CodePlan+"-"+Ejecucion.Ubicacion;


    var bodyEmail = "";
     bodyEmail += "<p><a  href='https://sigtasa.tasa.com.pe/'  target='_blank' title='TasaSsoma'> <img id='logo' alt='tasassoma' src='https://sigtasa.tasa.com.pe/images/logoSIGTASA.png' width ='200px' height ='50px'></a></p>";
     bodyEmail += "<p>Saludos cordiales: </p>";
     bodyEmail += "<br>  ";
     bodyEmail += "<p>De acuerdo a lo indcado en el asunto, la actividad  "+Ejecucion.NameActividad+" se encuentra "+Ejecucion.EstadoActividad+" y contiene las siguientes evidencias para su revisión:</p>";
     
        foreach (var item in Ejecucion.Evidencias)
        {
                 bodyEmail += "<p>"+item.Name+" - "+ item.Estado+"</p>";
        }     

     bodyEmail += "<br> ";
     bodyEmail += "<p>Se adjunta el acceso al sistema para su atención: </p>";
     bodyEmail += "<p>https://sigtasa.tasa.com.pe/main.html </p>";
     bodyEmail += "<br>  ";
     bodyEmail += "Atte. ";
     bodyEmail += "<br>  ";
     bodyEmail += "<p>"+Ejecucion.nameResponsable+"</p>";
     bodyEmail += "<p>"+Ejecucion.jobResponsable+"</p>";
     bodyEmail += "<p>"+Ejecucion.emailResponsable+"</p>";

     


    oDataEmail.bodyhtml = bodyEmail;

    // ENVIO DEL EMAIL
    //static readonly HttpClient httpclient = new HttpClient();
    HttpClient httpclient = new HttpClient();

    var jsonuser3 = JsonConvert.SerializeObject(oDataEmail);

    var datauser3 = new StringContent(jsonuser3, Encoding.UTF8, "application/json");

    var urlemail3 = "https://7454em4ils3nder-app.azurewebsites.net/api/VisitasaSendEmail?code=LXQwITmvDAAqXTgaDcBAkmbZXBCv5KnS6bY/XszaOjqHus4M3dbDzw==";

    httpclient.DefaultRequestHeaders.Add("apikey", "r$3#23516ewew5");

    log.LogInformation(" Esperamos Respuesta Del Env�o Del Correo.");
    log.LogInformation(" oDataEmail.sendto -> "+oDataEmail.sendto);
    var responseuser3 = await httpclient.PostAsync(urlemail3, datauser3);

    string resultEmail = responseuser3.Content.ReadAsStringAsync().Result;

    //log.LogInformation("jsonuser3 " + jsonuser3);
    log.LogInformation("resultEmail " + resultEmail);

}
public static async void enviarNotificaciones(ILogger log, CorreccionPlanAnual CorreccionPlanAnual, int tipo )
{



    string correos          = "markos.j.gonzalez.m@gmail.com, mgonzalez@visualsat.com, kllancachahua@visualsat.com, tguin@tasa.com.pe, mzevallos@tasa.com.pe, fromero@tasa.com.pe";//orlyvila@visualsat.com,
    DataEmailNew oDataEmail = new DataEmailNew();
    oDataEmail.sendto       = correos;
    var bodyEmail = "";

        // ASUNTO DEL EMAIL
    if(tipo == 1){
            oDataEmail.emailsubject = "Corrección del Plan Anual - "+CorreccionPlanAnual.ubicacion;
                 bodyEmail += "<p><a  href='https://sigtasa.tasa.com.pe/'  target='_blank' title='TasaSsoma'> <img id='logo' alt='tasassoma' src='https://sigtasa.tasa.com.pe/images/logoSIGTASA.png' width ='200px' height ='50px'></a></p>";
     bodyEmail += "<p>Estimados saludos cordiales: </p>";
     bodyEmail += "<br>  ";
     bodyEmail += "<p>Para comunicarles que se envía el enlace del plan anual de la "+CorreccionPlanAnual.Tipo+" "+CorreccionPlanAnual.ubicacion+" para su atención y cumplimiento en las fecha indicadas para cada actividad. </p>";
     bodyEmail += "<br> ";
     bodyEmail += "<p>https://sigtasa.tasa.com.pe/main.html </p>";
     bodyEmail += "<p>Agradecemos vuestro compromiso y liderazgo para asegurar el desarrollo de las actividades del plan anual. </p>";
     bodyEmail += "<br>  ";
     bodyEmail += "Atte. ";
     bodyEmail += "<br>  ";
    }else{
    oDataEmail.emailsubject = "Ejecución del Plan Anual - "+CorreccionPlanAnual.ubicacion;
         bodyEmail += "<p><a  href='https://sigtasa.tasa.com.pe/'  target='_blank' title='TasaSsoma'> <img id='logo' alt='tasassoma' src='https://sigtasa.tasa.com.pe/images/logoSIGTASA.png' width ='200px' height ='50px'></a></p>";
     bodyEmail += "<p>Estimados saludos cordiales: </p>";
     bodyEmail += "<br>  ";
     bodyEmail += "<p>La presente es para compartirles el enlace del plan anual de la "+CorreccionPlanAnual.Tipo+" "+CorreccionPlanAnual.ubicacion+" para su atención y cumplimiento en las fechas indicadas para cada actividad. </p>";
     bodyEmail += "<br> ";
     bodyEmail += "<p>https://sigtasa.tasa.com.pe/main.html </p>";
     bodyEmail += "<p>Agradecemos vuestro compromiso y liderazgo para asegurar el desarrollo de las actividades del plan anual. </p>";
     bodyEmail += "<br>  ";
     bodyEmail += "Atte. ";
     bodyEmail += "<br>  ";
    }


     bodyEmail += "<p>"+CorreccionPlanAnual.nameResponsable+"</p>";
     bodyEmail += "<p>"+CorreccionPlanAnual.jobResponsable+"</p>";
     bodyEmail += "<p>"+CorreccionPlanAnual.emailResponsable+"</p>";

     


    oDataEmail.bodyhtml = bodyEmail;

    // ENVIO DEL EMAIL
    //static readonly HttpClient httpclient = new HttpClient();
    HttpClient httpclient = new HttpClient();

    var jsonuser3 = JsonConvert.SerializeObject(oDataEmail);

    var datauser3 = new StringContent(jsonuser3, Encoding.UTF8, "application/json");

    var urlemail3 = "https://7454em4ils3nder-app.azurewebsites.net/api/VisitasaSendEmail?code=LXQwITmvDAAqXTgaDcBAkmbZXBCv5KnS6bY/XszaOjqHus4M3dbDzw==";

    httpclient.DefaultRequestHeaders.Add("apikey", "r$3#23516ewew5");

    log.LogInformation(" Esperamos Respuesta Del Env�o Del Correo.");
    log.LogInformation(" oDataEmail.sendto -> "+oDataEmail.sendto);
    var responseuser3 = await httpclient.PostAsync(urlemail3, datauser3);

    string resultEmail = responseuser3.Content.ReadAsStringAsync().Result;

    //log.LogInformation("jsonuser3 " + jsonuser3);
    log.LogInformation("resultEmail " + resultEmail);

}
