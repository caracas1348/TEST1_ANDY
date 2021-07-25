/****************************************************************************************
* VISUAL SAT - [2021]
* PROYECTO : SIGTASA
* ESQUEMA : SSOMA
* SPRINT  : 4
* MODULO : INCIDENTE ACCIDENTES
* OPERADORES_________________________________________________________________________
* | # | PROGRAMADOR     |  |      FECHA   |  |   HORA   |           CORREO           |
* | 1 | Andy Vásquez    |  |  11/04/2021  |  | 09:00:50 |    caracas1348@gmail.com   | post - run 015
* |___|_________________|__|______________|__|__________|____________________________| put  - run 004
*
* DESCRIPCION: ARCHIVO SQL BACKEND DE FUNCIONALIDAD EN SERVIDOR QUE REGISTRA LOS DATOS GENERALES
*              LOS INCIDENTES ACCIDENTES DESDE LA WEB
*
* ARCHIVOS DE FRONT       ____________________________________
* | # |     MODULO             |  |         NOMBRE            |
* | 1 |      SSOMA             |  |  gestionIncidentes.html   |
* |___________________________________________________________|
*
* VERSION: 0.1 Beta
*******************************************************************************************/
//run 121

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
            log.LogInformation("En try");
            curobj = await vobj_sqldata.funPostSeguimientoEvidencia(log, curobj);

            if(curobj.Id > 0)
            {
                log.LogInformation("En curobj.Id > 0, curobj.Id -> "+curobj.Id);

                //finalizamos la transaccion
                scope.Complete();
                log.LogInformation("Despues de scope.Complete()." );
            }
        }
        catch (Exception ex)
        {
            curobj.Id      = 0;//id
            curobj.Descripcion = System.Convert.ToString(ex.Message);//
            log.LogInformation("Catch :: " + ex.Message);//EvidenciaFile
        }

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);

    }

  //-----------------------------------------put--------------put-------------------------------------------
      //Metodo:  post
    if (vvhttpmethod == "put")
    {
        log.LogInformation("En vvhttpmethod == put.");

        curobj = funsetObjectEvidencia(log, dataobject, vvhttpmethod);//llamado al metodo ojo

        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        try
        {
            log.LogInformation("En try");
            curobj = await vobj_sqldata.funPutSeguimientoEvidencia(log, curobj);

            //if(curobj.Id > 0)// quiere decir que guardo bien
            //{
                log.LogInformation("En curobj.Id > 0, curobj.Id -> "+curobj.Id);

                //finalizamos la transaccion
                scope.Complete();
                log.LogInformation("Despues de scope.Complete()." );
            //}
        }
        catch (Exception ex)
        {
            curobj.Id      = 0;//id
            curobj.Descripcion = System.Convert.ToString(ex.Message);//
            log.LogInformation("Catch :: " + ex.Message);//EvidenciaFile
        }

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);

    }
  //-----------------------------------------put--------------put------------------------------------------



    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}


public static EvidenciaPost funsetObjectEvidencia(ILogger log, dynamic dataobject, string vvmethod)
{
    log.LogInformation("en  funsetObjectEvidencia.");
    EvidenciaPost curobj = new EvidenciaPost();

    if (vvmethod == "post")
    {//-----------------------------------------------------------------------------------------------------
        log.LogInformation("en  vvmethod == post.......................");
          curobj.Id1  =                            dataobject?.Id1; /*AccionBD*/ log.LogInformation("curobj.Id1 = "+curobj.Id1 ); 
          curobj.AccionBD  =                       dataobject?.AccionBD; /*---------------*/ log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

        
          curobj.AccidenteProceso       =                       dataobject?.AccidenteProceso;    log.LogInformation("curobj.AccidenteProceso = "+curobj.AccidenteProceso); 

          curobj.CodTrabjador           =                       dataobject?.CodTrabjador;    log.LogInformation("curobj.CodTrabjador = "+curobj.CodTrabjador );

          curobj.DNIAccidentado         =                       dataobject?.DNIAccidentado;    log.LogInformation("curobj.DNIAccidentado = "+curobj.DNIAccidentado );

          curobj.Descanso_estado        =                       dataobject?.Descanso_estado;    log.LogInformation("**curobj.Descanso_estado = "+curobj.Descanso_estado );

          curobj.Descripcion            =                       dataobject?.Descripcion;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.Dias_Descanza          =                       dataobject?.Dias_Descanza;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.EdadAccidentado        =                       dataobject?.EdadAccidentado;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.Expiencia_Month        =                       dataobject?.Expiencia_Month;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.Expiencia_Yaer         =                       dataobject?.Expiencia_Yaer;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.Fecha                  =                       dataobject?.Fecha;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.FechaInvestigacionFin  =                       dataobject?.FechaInvestigacionFin;    log.LogInformation("curobj.FechaInvestigacionFin = "+curobj.FechaInvestigacionFin );

          curobj.FechaInvestigacionIni  =                       dataobject?.FechaInvestigacionIni;    log.LogInformation("curobj.FechaInvestigacionIni = "+curobj.FechaInvestigacionIni );

          curobj.HayPersonalAfectado    =                       dataobject?.HayPersonalAfectado;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.HechoAtiempo           =                       dataobject?.HechoAtiempo;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.Hora                   =                       dataobject?.Hora;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.IdAccidenteIncidente   =                       dataobject?.IdAccidenteIncidente;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.IdAreaAccidente        =                       dataobject?.IdAreaAccidente;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.IdAreaRespInvestigar   =                       dataobject?.IdAreaRespInvestigar;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.IdAsesorInvestigacion  =                       dataobject?.IdAsesorInvestigacion;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.IdCondicionEP          =                       dataobject?.IdCondicionEP;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.IdEmbarcacion          =                       dataobject?.IdEmbarcacion;    log.LogInformation("curobj.IdEmbarcacion = "+curobj.IdEmbarcacion );

          curobj.IdEmpresaCompany       =                       dataobject?.IdEmpresaCompany;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.IdGerencia             =                       dataobject?.IdGerencia;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.IdPersonalAccidentado  =                       dataobject?.IdPersonalAccidentado;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.IdProbRecurrencia      =                       dataobject?.IdProbRecurrencia;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.IdProcesoOperacion     =                       dataobject?.IdProcesoOperacion;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.IdRegion               =                       dataobject?.IdRegion;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.IdRespInvestigar       =                       dataobject?.IdRespInvestigar;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.IdSeCargaAccidente     =                       dataobject?.IdSeCargaAccidente;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.IdSede                 =                       dataobject?.IdSede;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.IdSubProceso           =                       dataobject?.IdSubProceso;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.IdTipoEvento           =                       dataobject?.IdTipoEvento;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.IdZonaAccidente        =                       dataobject?.IdZonaAccidente;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.InformeInvestigacion   =                       dataobject?.InformeInvestigacion;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.LesionDannio           =                       dataobject?.LesionDannio;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.LugarEspTarea          =                       dataobject?.LugarEspTarea;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.NombrePersonalAccidentado  =                   dataobject?.NombrePersonalAccidentado;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.NombreRespInvestigar   =                       dataobject?.NombreRespInvestigar;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.ParteCuerpoLesionada   =                       dataobject?.ParteCuerpoLesionada;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.Potencial              =                       dataobject?.Potencial;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.Puerto_Arrivo          =                       dataobject?.Puerto_Arrivo;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.PuestoCargoAccidentado =                       dataobject?.PuestoCargoAccidentado;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.PuestoCargoAccidentado2=                       dataobject?.PuestoCargoAccidentado2;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.TiempoTranscurrido     =                       dataobject?.TiempoTranscurrido;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.fecha_Descanso_Fin     =                       dataobject?.fecha_Descanso_Fin;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.fecha_Descanso_Ini     =                       dataobject?.fecha_Descanso_Ini;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.Finalizado             =                       dataobject?.Finalizado;            log.LogInformation("curobj.Finalizado = "+curobj.Finalizado );

          curobj.TemporadaVeda          =                       dataobject?.TemporadaVeda;         log.LogInformation("curobj.TemporadaVeda = "+curobj.TemporadaVeda );
          
          log.LogInformation("saliendo de postttttttttttttttttttt");

    }//----------------------------------------------------------------------------------

    if (vvmethod == "put")
    {//-----------------------------------------------------------------------------------------------------
        log.LogInformation("en  vvmethod == putxxxx.");
          
         curobj.Id1  =                            dataobject?.Id1; //AccionBD

         curobj.AccionBD  =                       dataobject?.AccionBD;

         curobj.AccidenteProceso       =                       dataobject?.AccidenteProceso;    log.LogInformation("curobj.AccidenteProceso = "+curobj.AccidenteProceso); 

          curobj.CodTrabjador           =                       dataobject?.CodTrabjador;    log.LogInformation("curobj.CodTrabjador = "+curobj.CodTrabjador );

          curobj.DNIAccidentado         =                       dataobject?.DNIAccidentado;    log.LogInformation("curobj.DNIAccidentado = "+curobj.DNIAccidentado );

          curobj.Descanso_estado        =                       dataobject?.Descanso_estado;    log.LogInformation("**curobj.Descanso_estado = "+curobj.Descanso_estado );

          curobj.Descripcion            =                       dataobject?.Descripcion;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.Dias_Descanza          =                       dataobject?.Dias_Descanza;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.EdadAccidentado        =                       dataobject?.EdadAccidentado;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.Expiencia_Month        =                       dataobject?.Expiencia_Month;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.Expiencia_Yaer         =                       dataobject?.Expiencia_Yaer;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.Fecha                  =                       dataobject?.Fecha;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.FechaInvestigacionFin  =                       dataobject?.FechaInvestigacionFin;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.FechaInvestigacionIni  =                       dataobject?.FechaInvestigacionIni;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.HayPersonalAfectado    =                       dataobject?.HayPersonalAfectado;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.HechoAtiempo           =                       dataobject?.HechoAtiempo;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.Hora                   =                       dataobject?.Hora;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.IdAccidenteIncidente   =                       dataobject?.IdAccidenteIncidente;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.IdAreaAccidente        =                       dataobject?.IdAreaAccidente;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.IdAreaRespInvestigar   =                       dataobject?.IdAreaRespInvestigar;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.IdAsesorInvestigacion  =                       dataobject?.IdAsesorInvestigacion;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.IdCondicionEP          =                       dataobject?.IdCondicionEP;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.IdEmbarcacion          =                       dataobject?.IdEmbarcacion;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.IdEmpresaCompany       =                       dataobject?.IdEmpresaCompany;    log.LogInformation("curobj.IdEmpresaCompany = "+curobj.IdEmpresaCompany );

          curobj.IdGerencia             =                       dataobject?.IdGerencia;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.IdPersonalAccidentado  =                       dataobject?.IdPersonalAccidentado;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.IdProbRecurrencia      =                       dataobject?.IdProbRecurrencia;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.IdProcesoOperacion     =                       dataobject?.IdProcesoOperacion;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.IdRegion               =                       dataobject?.IdRegion;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.IdRespInvestigar       =                       dataobject?.IdRespInvestigar;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.IdSeCargaAccidente     =                       dataobject?.IdSeCargaAccidente;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.IdSede                 =                       dataobject?.IdSede;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.IdSubProceso           =                       dataobject?.IdSubProceso;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.IdTipoEvento           =                       dataobject?.IdTipoEvento;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.IdZonaAccidente        =                       dataobject?.IdZonaAccidente;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.InformeInvestigacion   =                       dataobject?.InformeInvestigacion;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.LesionDannio           =                       dataobject?.LesionDannio;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.LugarEspTarea          =                       dataobject?.LugarEspTarea;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.NombrePersonalAccidentado  =                   dataobject?.NombrePersonalAccidentado;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.NombreRespInvestigar   =                       dataobject?.NombreRespInvestigar;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.ParteCuerpoLesionada   =                       dataobject?.ParteCuerpoLesionada;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.Potencial              =                       dataobject?.Potencial;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.Puerto_Arrivo          =                       dataobject?.Puerto_Arrivo;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.PuestoCargoAccidentado =                       dataobject?.PuestoCargoAccidentado;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.PuestoCargoAccidentado2=                       dataobject?.PuestoCargoAccidentado2;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.TiempoTranscurrido     =                       dataobject?.TiempoTranscurrido;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.fecha_Descanso_Fin     =                       dataobject?.fecha_Descanso_Fin;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.fecha_Descanso_Ini     =                       dataobject?.fecha_Descanso_Ini;    log.LogInformation("curobj.AccionBD = "+curobj.AccionBD );

          curobj.Finalizado             =                       dataobject?.Finalizado;            log.LogInformation("curobj.Finalizado = "+curobj.Finalizado );

          curobj.TemporadaVeda          =                       dataobject?.TemporadaVeda;         log.LogInformation("curobj.TemporadaVeda = "+curobj.TemporadaVeda );

          log.LogInformation("saliendo de puuuuuuuuuuutttttttttiiiing");
    }//----------------------------------------------------------------------------------
        
   

   
    return curobj;
}