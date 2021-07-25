/****************************************************************************************
* VISUAL SAT - [2021]
* PROYECTO : SIGTASA
* ESQUEMA : SSOMA
* SPRINT  : 4
* MODULO : GESTIÓN DE PLAN ANUAL
* OPERADORES_________________________________________________________________________
* | # | PROGRAMADOR     |  |      FECHA   |  |   HORA   |           CORREO           |
* | 1 | Andy Vásquez    |  |  15/03/2021  |  | 04:00:50 |    caracas1348@gmail.com   |
* |___|_________________|__|______________|__|__________|____________________________|
*
* DESCRIPCION: ARCHIVO SQL BACKEND DE FUNCIONALIDAD EN SERVIDOR QUE REGISTRA LOS   xru09
*              LOS INCIDENTES ACCIDENTES DESDE LA APP
*
* ARCHIVOS DE FRONT       ____________________________________
* | # |     MODULO             |  |         NOMBRE            |
* | 1 |      SSOMA             |  |  gestionIncidentes.html   |
* |___________________________________________________________|
*
* VERSION: 0.1 Beta
*******************************************************************************************/


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
            curobj.DescripcionEvento = System.Convert.ToString(ex.Message);//
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
            curobj.DescripcionEvento = System.Convert.ToString(ex.Message);//
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
          curobj.Tipo  =                           dataobject?.Tipo; /*---------------*/ log.LogInformation("curobj.Tipo = "+curobj.Tipo );  
          curobj.IdTipoEvento  =                   dataobject?.IdTipoEvento; /*---------------*/ log.LogInformation("curobj.IdTipoEvento = "+curobj.IdTipoEvento );  
          curobj.Fecha       =                     dataobject?.Fecha; /*---------------*/ log.LogInformation("curobj.Fecha = "+curobj.Fecha );
          curobj.Hora       =                      dataobject?.Hora; /*---------------*/ log.LogInformation("curobj.Hora = "+curobj.Hora );
          curobj.HayPersonalAfectado       =       dataobject?.HayPersonalAfectado; /*---------------*/ log.LogInformation("curobj.HayPersonalAfectado = "+curobj.HayPersonalAfectado );   
          curobj.NombreEmpresa       =             dataobject?.NombreEmpresa; /*---------------*/ log.LogInformation("curobj.NombreEmpresa = "+curobj.NombreEmpresa );
          curobj.IdEmpresa =                       dataobject?.IdEmpresa; /*---------------*/ log.LogInformation("curobj.IdEmpresa = "+curobj.IdEmpresa );
          curobj.DescripcionEvento       =         dataobject?.DescripcionEvento; /*---------------*/ log.LogInformation("curobj.DescripcionEvento = "+curobj.DescripcionEvento );
             
            
            //     -- primer tipo de accidente 
           curobj.A_NombrePersonalAccidentado =    dataobject?.A_NombrePersonalAccidentado; /*---------------*/ log.LogInformation("curobj.Id1 = "+curobj.Id1 );
           curobj.A_IdPersonalAccidentado     =    dataobject?.A_IdPersonalAccidentado; /*---------------*/ log.LogInformation("curobj.Id1 = "+curobj.Id1 ); 
           curobj.A_DniPersonalAccidentado    =    dataobject?.A_DniPersonalAccidentado; /*---------------*/ log.LogInformation("curobj.Id1 = "+curobj.Id1 ); 
           curobj.A_PuestoCargoAccidentado    =    dataobject?.A_PuestoCargoAccidentado; /*---------------*/ log.LogInformation("curobj.Id1 = "+curobj.Id1 );
           curobj.A_NombreJefeAccidentado     =    dataobject?.A_NombreJefeAccidentado; /*---------------*/ log.LogInformation("curobj.Id1 = "+curobj.Id1 );
           curobj.A_IdJefeAccidentado         =    dataobject?.A_IdJefeAccidentado; /*---------------*/ log.LogInformation("curobj.Id1 = "+curobj.Id1 );
                
            //     --segundo tipo de accidente
           curobj.B_TipoProducto       =           dataobject?.B_TipoProducto; /*---------------*/ log.LogInformation("curobj.Id1 = "+curobj.Id1 ); 
           curobj.B_ProductoInvolucrado       =    dataobject?.B_ProductoInvolucrado; /*---------------*/ log.LogInformation("curobj.Id1 = "+curobj.Id1 ); 
           curobj.B_Volumen       =                dataobject?.B_Volumen; /*---------------*/ log.LogInformation("curobj.Id1 = "+curobj.Id1 );
           curobj.B_Area       =                   dataobject?.B_Area; /*---------------*/ log.LogInformation("curobj.Id1 = "+curobj.Id1 ); 
           curobj.B_Fuente       =                 dataobject?.B_Fuente; /*---------------*/ log.LogInformation("curobj.Id1 = "+curobj.Id1 );
           curobj.B_NombreJefeInmediato       =    dataobject?.B_NombreJefeInmediato; /*---------------*/ log.LogInformation("curobj.Id1 = "+curobj.Id1 ); 
           curobj.B_IdJefeInmediato       =        dataobject?.B_IdJefeInmediato; /*---------------*/ log.LogInformation("curobj.Id1 = "+curobj.Id1 );
                
            //         --tercer tipo de incidente
           curobj.C_NombreContratista       =      dataobject?.C_NombreContratista; /*---------------*/ log.LogInformation("curobj.Id1 = "+curobj.Id1 );
           curobj.C_Hurt       =                   dataobject?.C_Hurt; /*---------------*/ log.LogInformation("curobj.Id1 = "+curobj.Id1 );
                
           curobj.IdSede       =                   dataobject?.IdSede; /*---------------*/ log.LogInformation("curobj.Id1 = "+curobj.Id1 );
           curobj.IdEmbarcacion       =            dataobject?.IdEmbarcacion; /*---------------*/ log.LogInformation("curobj.Id1 = "+curobj.Id1 );
           curobj.IdArea       =                   dataobject?.IdArea; /*---------------*/ log.LogInformation("curobj.Id1 = "+curobj.Id1 );
           curobj.IdZona       =                   dataobject?.IdZona; /*---------------*/ log.LogInformation("curobj.Id1 = "+curobj.Id1 );
           curobj.IdEstadoIncidente =              dataobject?.IdEstadoIncidente; /*---------------*/ log.LogInformation("curobj.Id1 = "+curobj.Id1 );


           curobj.Adjunto1       =                 dataobject?.Adjunto1; /*---------------*/ log.LogInformation("curobj.Id1 = "+curobj.Id1 );
           curobj.Adjunto2       =                 dataobject?.Adjunto2; /*---------------*/ log.LogInformation("curobj.Id1 = "+curobj.Id1 );
           curobj.Adjunto3       =                 dataobject?.Adjunto3; /*---------------*/ log.LogInformation("curobj.Id1 = "+curobj.Id1 );
           curobj.Adjunto4       =                 dataobject?.Adjunto4; /*---------------*/ log.LogInformation("curobj.Id1 = "+curobj.Id1 );
           curobj.Adjunto5       =                 dataobject?.Adjunto5; /*---------------*/ log.LogInformation("curobj.Id1 = "+curobj.Id1 );
           curobj.HallazgoId     =                 dataobject?.HallazgoId;
           

    }//----------------------------------------------------------------------------------

    if (vvmethod == "put")
    {//-----------------------------------------------------------------------------------------------------
        log.LogInformation("en  vvmethod == putxxxx.");
          
          curobj.Id1  =                            dataobject?.Id1; //AccionBD
          curobj.AccionBD  =                       dataobject?.AccionBD;
          curobj.Tipo  =                           dataobject?.Tipo;      
          curobj.IdTipoEvento  =                   dataobject?.IdTipoEvento;  
          curobj.Fecha       =                     dataobject?.Fecha;
          curobj.Hora       =                      dataobject?.Hora;
          curobj.HayPersonalAfectado       =       dataobject?.HayPersonalAfectado;   
          curobj.NombreEmpresa       =             dataobject?.NombreEmpresa;
          curobj.IdEmpresa =                       dataobject?.IdEmpresa;
          curobj.DescripcionEvento       =         dataobject?.DescripcionEvento;
                
            //     -- primer tipo de accidente 
           curobj.A_NombrePersonalAccidentado =    dataobject?.A_NombrePersonalAccidentado;
           curobj.A_IdPersonalAccidentado     =    dataobject?.A_IdPersonalAccidentado; 
           curobj.A_DniPersonalAccidentado    =    dataobject?.A_DniPersonalAccidentado; 
           curobj.A_PuestoCargoAccidentado    =    dataobject?.A_PuestoCargoAccidentado;
           curobj.A_NombreJefeAccidentado     =    dataobject?.A_NombreJefeAccidentado;
           curobj.A_IdJefeAccidentado         =    dataobject?.A_IdJefeAccidentado;
                
            //     --segundo tipo de accidente
           curobj.B_TipoProducto       =           dataobject?.B_TipoProducto; 
           curobj.B_ProductoInvolucrado       =    dataobject?.B_ProductoInvolucrado; 
           curobj.B_Volumen       =                dataobject?.B_Volumen;
           curobj.B_Area       =                   dataobject?.B_Area; 
           curobj.B_Fuente       =                 dataobject?.B_Fuente;
           curobj.B_NombreJefeInmediato       =    dataobject?.B_NombreJefeInmediato; 
           curobj.B_IdJefeInmediato       =        dataobject?.B_IdJefeInmediato;
                
            //         --tercer tipo de incidente
           curobj.C_NombreContratista       =      dataobject?.C_NombreContratista;
           curobj.C_Hurt       =                   dataobject?.C_Hurt;
                
           curobj.IdSede       =                   dataobject?.IdSede;
           curobj.IdEmbarcacion       =            dataobject?.IdEmbarcacion;
           curobj.IdArea       =                   dataobject?.IdArea;
           curobj.IdZona       =                   dataobject?.IdZona;
           curobj.IdEstadoIncidente =              dataobject?.IdEstadoIncidente;


           curobj.Adjunto1       =                 dataobject?.Adjunto1;
           curobj.Adjunto2       =                 dataobject?.Adjunto2;
           curobj.Adjunto3       =                 dataobject?.Adjunto3;
           curobj.Adjunto4       =                 dataobject?.Adjunto4;
           curobj.Adjunto5       =                 dataobject?.Adjunto5;
           curobj.HallazgoId     =                 dataobject?.HallazgoId;

          log.LogInformation("saliendo de puuuuuuuuuuutttttttttiiiing");
    }//----------------------------------------------------------------------------------
        
   

   
    return curobj;
}

