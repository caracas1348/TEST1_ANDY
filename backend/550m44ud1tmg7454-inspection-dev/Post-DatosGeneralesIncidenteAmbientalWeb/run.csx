/****************************************************************************************
* VISUAL SAT - [2021]
* PROYECTO : SIGTASA
* ESQUEMA : SSOMA
* SPRINT  : 4
* MODULO : INCIDENTE ACCIDENTES
* OPERADORES_________________________________________________________________________
* | # | PROGRAMADOR     |  |      FECHA   |  |   HORA   |           CORREO           |
* | 1 | Andy Vásquez    |  |  11/04/2021  |  | 09:00:50 |    caracas1348@gmail.com   | post - run 016
* |___|_________________|__|______________|__|__________|____________________________| put  - run 006
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

        
          curobj.IdTipoEvento                    =                       dataobject?.IdTipoEvento;    log.LogInformation("curobj.IdTipoEvento = "+curobj.IdTipoEvento );         
          curobj.Fecha                           =                       dataobject?.Fecha;    log.LogInformation("curobj.Fecha = "+curobj.Fecha );           
          curobj.Hora                            =                       dataobject?.Hora;    log.LogInformation("curobj.Hora = "+curobj.Hora );           
          curobj.ReporteExterno                  =                       dataobject?.ReporteExterno;    log.LogInformation("curobj.ReporteExterno = "+curobj.ReporteExterno );           
          curobj.IdGerencia                      =                       dataobject?.IdGerencia;    log.LogInformation("curobj.IdGerencia = "+curobj.IdGerencia );        

          curobj.IdSede                          =                       dataobject?.IdSede;    log.LogInformation("curobj.IdSede = "+curobj.IdSede );           
          curobj.IdZonaUbicacion                 =                       dataobject?.IdZonaUbicacion;    log.LogInformation("curobj.IdZonaUbicacion = "+curobj.IdZonaUbicacion );           
          curobj.HayPersonalAfectado             =                       dataobject?.HayPersonalAfectado;    log.LogInformation("curobj.HayPersonalAfectado = "+curobj.HayPersonalAfectado );           
          curobj.IdEmpresa                       =                       dataobject?.IdEmpresa;    log.LogInformation("curobj.IdEmpresa = "+curobj.IdEmpresa );           
          curobj.Descripcion                     =                       dataobject?.Descripcion;    log.LogInformation("curobj.Descripcion = "+curobj.Descripcion );           
          curobj.AcccionesInmediatas             =                       dataobject?.AcccionesInmediatas;    log.LogInformation("curobj.AcccionesInmediatas = "+curobj.AcccionesInmediatas );           
          curobj.IdContaminante                  =                       dataobject?.IdContaminante;    log.LogInformation("curobj.IdContaminante = "+curobj.IdContaminante );           
          curobj.Volumen                         =                       dataobject?.Volumen;    log.LogInformation("curobj.Volumen = "+curobj.Volumen );           
          curobj.UnidadVolumen                   =                       dataobject?.UnidadVolumen;    log.LogInformation("curobj.UnidadVolumen = "+curobj.UnidadVolumen );           

          

          curobj.IdImpactoAmbiental              =                       dataobject?.IdImpactoAmbiental;    log.LogInformation("curobj.IdImpactoAmbiental = "+curobj.IdImpactoAmbiental );           


            

          curobj.xIdDescripcionEvento            =                       dataobject?.xIdDescripcionEvento;    log.LogInformation("curobj.xIdDescripcionEvento = "+curobj.xIdDescripcionEvento );           
          curobj.xImpactoAmbiental               =                       dataobject?.xImpactoAmbiental;    log.LogInformation("curobj.xImpactoAmbiental = "+curobj.xImpactoAmbiental );           
          curobj.xReaccionPublica                =                       dataobject?.xReaccionPublica;    log.LogInformation("curobj.xReaccionPublica = "+curobj.xReaccionPublica );           
          curobj.xRelacionComunidad              =                       dataobject?.xRelacionComunidad;    log.LogInformation("curobj.xRelacionComunidad = "+curobj.xRelacionComunidad );           
          curobj.xLegal                          =                       dataobject?.xLegal;               log.LogInformation("curobj.xLegal = "+curobj.xLegal );           
          curobj.xCalificacion                   =                       dataobject?.xCalificacion;    log.LogInformation("curobj.xCalificacion = "+curobj.xCalificacion );           
          curobj.xNivelSeveridad                 =                       dataobject?.xNivelSeveridad;    log.LogInformation("curobj.xNivelSeveridad = "+curobj.xNivelSeveridad );           
          curobj.xIIAUnidad                      =                       dataobject?.xIIAUnidad;    log.LogInformation("curobj.xIIAUnidad = "+curobj.xIIAUnidad );           
          curobj.xIIACorporativo                 =                       dataobject?.xIIACorporativo;    log.LogInformation("curobj.xIIACorporativo = "+curobj.xIIACorporativo );           
          curobj.xMetaCorporativa                =                       dataobject?.xMetaCorporativa;    log.LogInformation("curobj.xMetaCorporativa = "+curobj.xMetaCorporativa );           

          curobj.xIIAUnidadPesca                 =                       dataobject?.xIIAUnidadPesca;    log.LogInformation("curobj.xIIAUnidadPesca = "+curobj.xIIAUnidadPesca );           
          curobj.xIIACoporativoPesca             =                       dataobject?.xIIACoporativoPesca;    log.LogInformation("curobj.xIIACoporativoPesca = "+curobj.xIIACoporativoPesca );           
          curobj.xMetaPesac                      =                       dataobject?.xMetaPesac;    log.LogInformation("curobj.xMetaPesac = "+curobj.xMetaPesac );           
          curobj.xIIAOperaciones                 =                       dataobject?.xIIAOperaciones;    log.LogInformation("curobj.xIIAOperaciones = "+curobj.xIIAOperaciones );          
          curobj.xIIACoporativoOperaciones       =                       dataobject?.xIIACoporativoOperaciones;    log.LogInformation("curobj.xIIACoporativoOperaciones = "+curobj.xIIACoporativoOperaciones );          
          curobj.xMetaOperaciones                =                       dataobject?.xMetaOperaciones;    log.LogInformation("curobj.xMetaOperaciones = "+curobj.xMetaOperaciones );           
          curobj.xIIAdminFinanzas                =                       dataobject?.xIIAdminFinanzas;    log.LogInformation("curobj.xIIAdminFinanzas = "+curobj.xIIAdminFinanzas );           
          curobj.xIIACoporAdmiFinanzas           =                       dataobject?.xIIACoporAdmiFinanzas;    log.LogInformation("curobj.xIIACoporAdmiFinanzas = "+curobj.xIIACoporAdmiFinanzas );           
          curobj.xMetaAdminFinanazas             =                       dataobject?.xMetaAdminFinanazas;    log.LogInformation("curobj.xMetaAdminFinanazas = "+curobj.xMetaAdminFinanazas );           

          curobj.yNumColaboradores               =                       dataobject?.yNumColaboradores;    log.LogInformation("curobj.yNumColaboradores = "+curobj.yNumColaboradores );          
          curobj.yNumHora                        =                       dataobject?.yNumHora;    log.LogInformation("curobj.yNumHora = "+curobj.yNumHora );           
          curobj.yCostoMOS                       =                       dataobject?.yCostoMOS;    log.LogInformation("curobj.yCostoMOS = "+curobj.yCostoMOS );          
          curobj.yNumColaboradores2              =                       dataobject?.yNumColaboradores2;    log.LogInformation("curobj.yNumColaboradores2= "+curobj.yNumColaboradores2);           
          curobj.yNumHora2                       =                       dataobject?.yNumHora2;    log.LogInformation("curobj.yNumHora2= "+curobj.yNumHora2);           
          curobj.yCostoMOS2                      =                       dataobject?.yCostoMOS2;    log.LogInformation("curobj.yCostoMOS2 = "+curobj.yCostoMOS2 );           
          curobj.yCantProducto                   =                       dataobject?.yCantProducto;    log.LogInformation("curobj.yCantProducto = "+curobj.yCantProducto );           
          curobj.yCostoProductoS                 =                       dataobject?.yCostoProductoS;    log.LogInformation("curobj.yCostoProductoS = "+curobj.yCostoProductoS );           

          curobj.yCostoProductoS2                =                       dataobject?.yCostoProductoS2;    log.LogInformation("curobj.yCostoProductoS2 = "+curobj.yCostoProductoS2 );
          curobj.ycostoMateriales                =                       dataobject?.ycostoMateriales;    log.LogInformation("curobj.ycostoMateriales = "+curobj.ycostoMateriales );     
                
          curobj.yCostoServicioS                 =                       dataobject?.yCostoServicioS;    log.LogInformation("curobj.yCostoServicioS = "+curobj.yCostoServicioS );          
          curobj.yCostoMultaS                    =                       dataobject?.yCostoMultaS;    log.LogInformation("curobj.yCostoMultaS = "+curobj.yCostoMultaS );          
          curobj.yOtroS                          =                       dataobject?.yOtroS;    log.LogInformation("curobj.yOtroS= "+curobj.yOtroS);          
          curobj.yCostoTotalS                    =                       dataobject?.yCostoTotalS;    log.LogInformation("curobj.yCostoTotalS = "+curobj.yCostoTotalS );           
          curobj.yCostoTotalUSD                  =                       dataobject?.yCostoTotalUSD;    log.LogInformation("curobj.yCostoTotalUSD = "+curobj.yCostoTotalUSD );           
          curobj.yOefaUit                        =                       dataobject?.yOefaUit;    log.LogInformation("curobj.yOefaUit = "+curobj.yOefaUit );          
          curobj.yOefaS                          =                       dataobject?.yOefaS;    log.LogInformation("curobj.yOefaS = "+curobj.yOefaS );           
          curobj.yOefaUSD                        =                       dataobject?.yOefaUSD;    log.LogInformation("curobj.yOefaUSD = "+curobj.yOefaUSD );          
          curobj.yDicapiUit                      =                       dataobject?.yDicapiUit;    log.LogInformation("curobj.yDicapiUit = "+curobj.yDicapiUit );           
          curobj.yDicapiS                        =                       dataobject?.yDicapiS;    log.LogInformation("curobj.yDicapiS = "+curobj.yDicapiS );           
          curobj.yDicapiUSD                      =                       dataobject?.yDicapiUSD;    log.LogInformation("curobj.yDicapiUSD = "+curobj.yDicapiUSD );  
          curobj.IdAccidenteIncidente            =                       dataobject?.IdAccidenteIncidente;    log.LogInformation("curobj.IdAccidenteIncidente = "+curobj.IdAccidenteIncidente );
          curobj.Finalizado                      =                       dataobject?.Finalizado;    log.LogInformation("curobj.Finalizado = "+curobj.Finalizado );

          curobj.AreaImpactada                   =                       dataobject?.AreaImpactada;    log.LogInformation("Dando peo curobj.AreaImpactada = "+curobj.AreaImpactada);
          curobj.TemporadaVeda                   =                       dataobject?.TemporadaVeda;    log.LogInformation("curobj.TemporadaVeda = "+curobj.TemporadaVeda );


    }//----------------------------------------------------------------------------------

    if (vvmethod == "put")
    {//-----------------------------------------------------------------------------------------------------
        log.LogInformation("en  vvmethod == putxxxx.");
          
          curobj.Id1  =                            dataobject?.Id1; //AccionBD

          curobj.AccionBD  =                       dataobject?.AccionBD;
          
             curobj.IdTipoEvento                    =                       dataobject?.IdTipoEvento;    log.LogInformation("curobj.IdTipoEvento = "+curobj.IdTipoEvento );         
          curobj.Fecha                           =                       dataobject?.Fecha;    log.LogInformation("curobj.Fecha = "+curobj.Fecha );           
          curobj.Hora                            =                       dataobject?.Hora;    log.LogInformation("curobj.Hora = "+curobj.Hora );           
          curobj.ReporteExterno                  =                       dataobject?.ReporteExterno;    log.LogInformation("curobj.ReporteExterno = "+curobj.ReporteExterno );           
          curobj.IdGerencia                      =                       dataobject?.IdGerencia;    log.LogInformation("curobj.IdGerencia = "+curobj.IdGerencia );        

          curobj.IdSede                          =                       dataobject?.IdSede;    log.LogInformation("curobj.IdSede = "+curobj.IdSede );           
          curobj.IdZonaUbicacion                 =                       dataobject?.IdZonaUbicacion;    log.LogInformation("curobj.IdZonaUbicacion = "+curobj.IdZonaUbicacion );           
          curobj.HayPersonalAfectado             =                       dataobject?.HayPersonalAfectado;    log.LogInformation("curobj.HayPersonalAfectado = "+curobj.HayPersonalAfectado );           
          curobj.IdEmpresa                       =                       dataobject?.IdEmpresa;    log.LogInformation("curobj.IdEmpresa = "+curobj.IdEmpresa );           
          curobj.Descripcion                     =                       dataobject?.Descripcion;    log.LogInformation("curobj.Descripcion = "+curobj.Descripcion );           
          curobj.AcccionesInmediatas             =                       dataobject?.AcccionesInmediatas;    log.LogInformation("curobj.AcccionesInmediatas = "+curobj.AcccionesInmediatas );           
          curobj.IdContaminante                  =                       dataobject?.IdContaminante;    log.LogInformation("curobj.IdContaminante = "+curobj.IdContaminante );           
          curobj.Volumen                         =                       dataobject?.Volumen;    log.LogInformation("curobj.Volumen = "+curobj.Volumen );           
          curobj.UnidadVolumen                   =                       dataobject?.UnidadVolumen;    log.LogInformation("curobj.UnidadVolumen = "+curobj.UnidadVolumen );           

          

          curobj.IdImpactoAmbiental              =                       dataobject?.IdImpactoAmbiental;    log.LogInformation("curobj.IdImpactoAmbiental = "+curobj.IdImpactoAmbiental );           


            

          curobj.xIdDescripcionEvento            =                       dataobject?.xIdDescripcionEvento;    log.LogInformation("curobj.xIdDescripcionEvento = "+curobj.xIdDescripcionEvento );           
          curobj.xImpactoAmbiental               =                       dataobject?.xImpactoAmbiental;    log.LogInformation("curobj.xImpactoAmbiental = "+curobj.xImpactoAmbiental );           
          curobj.xReaccionPublica                =                       dataobject?.xReaccionPublica;    log.LogInformation("curobj.xReaccionPublica = "+curobj.xReaccionPublica );           
          curobj.xRelacionComunidad              =                       dataobject?.xRelacionComunidad;    log.LogInformation("curobj.xRelacionComunidad = "+curobj.xRelacionComunidad );           
          curobj.xLegal                          =                       dataobject?.xLegal;               log.LogInformation("curobj.xLegal = "+curobj.xLegal );           
          curobj.xCalificacion                   =                       dataobject?.xCalificacion;    log.LogInformation("curobj.xCalificacion = "+curobj.xCalificacion );           
          curobj.xNivelSeveridad                 =                       dataobject?.xNivelSeveridad;    log.LogInformation("curobj.xNivelSeveridad = "+curobj.xNivelSeveridad );           
          curobj.xIIAUnidad                      =                       dataobject?.xIIAUnidad;    log.LogInformation("curobj.xIIAUnidad = "+curobj.xIIAUnidad );           
          curobj.xIIACorporativo                 =                       dataobject?.xIIACorporativo;    log.LogInformation("curobj.xIIACorporativo = "+curobj.xIIACorporativo );           
          curobj.xMetaCorporativa                =                       dataobject?.xMetaCorporativa;    log.LogInformation("curobj.xMetaCorporativa = "+curobj.xMetaCorporativa );           

          curobj.xIIAUnidadPesca                 =                       dataobject?.xIIAUnidadPesca;    log.LogInformation("curobj.xIIAUnidadPesca = "+curobj.xIIAUnidadPesca );           
          curobj.xIIACoporativoPesca             =                       dataobject?.xIIACoporativoPesca;    log.LogInformation("curobj.xIIACoporativoPesca = "+curobj.xIIACoporativoPesca );           
          curobj.xMetaPesac                      =                       dataobject?.xMetaPesac;    log.LogInformation("curobj.xMetaPesac = "+curobj.xMetaPesac );           
          curobj.xIIAOperaciones                 =                       dataobject?.xIIAOperaciones;    log.LogInformation("curobj.xIIAOperaciones = "+curobj.xIIAOperaciones );          
          curobj.xIIACoporativoOperaciones       =                       dataobject?.xIIACoporativoOperaciones;    log.LogInformation("curobj.xIIACoporativoOperaciones = "+curobj.xIIACoporativoOperaciones );          
          curobj.xMetaOperaciones                =                       dataobject?.xMetaOperaciones;    log.LogInformation("curobj.xMetaOperaciones = "+curobj.xMetaOperaciones );           
          curobj.xIIAdminFinanzas                =                       dataobject?.xIIAdminFinanzas;    log.LogInformation("curobj.xIIAdminFinanzas = "+curobj.xIIAdminFinanzas );           
          curobj.xIIACoporAdmiFinanzas           =                       dataobject?.xIIACoporAdmiFinanzas;    log.LogInformation("curobj.xIIACoporAdmiFinanzas = "+curobj.xIIACoporAdmiFinanzas );           
          curobj.xMetaAdminFinanazas             =                       dataobject?.xMetaAdminFinanazas;    log.LogInformation("curobj.xMetaAdminFinanazas = "+curobj.xMetaAdminFinanazas );           

          curobj.yNumColaboradores               =                       dataobject?.yNumColaboradores;    log.LogInformation("curobj.yNumColaboradores = "+curobj.yNumColaboradores );          
          curobj.yNumHora                        =                       dataobject?.yNumHora;    log.LogInformation("curobj.yNumHora = "+curobj.yNumHora );           
          curobj.yCostoMOS                       =                       dataobject?.yCostoMOS;    log.LogInformation("curobj.yCostoMOS = "+curobj.yCostoMOS );          
          curobj.yNumColaboradores2              =                       dataobject?.yNumColaboradores2;    log.LogInformation("curobj.yNumColaboradores2= "+curobj.yNumColaboradores2);           
          curobj.yNumHora2                       =                       dataobject?.yNumHora2;    log.LogInformation("curobj.yNumHora2= "+curobj.yNumHora2);           
          curobj.yCostoMOS2                      =                       dataobject?.yCostoMOS2;    log.LogInformation("curobj.yCostoMOS2 = "+curobj.yCostoMOS2 );           
          curobj.yCantProducto                   =                       dataobject?.yCantProducto;    log.LogInformation("curobj.yCantProducto = "+curobj.yCantProducto );           
          curobj.yCostoProductoS                 =                       dataobject?.yCostoProductoS;    log.LogInformation("curobj.yCostoProductoS = "+curobj.yCostoProductoS );           

          curobj.yCostoProductoS2                =                       dataobject?.yCostoProductoS2;    log.LogInformation("curobj.yCostoProductoS2 = "+curobj.yCostoProductoS2 );
          curobj.ycostoMateriales                =                       dataobject?.ycostoMateriales;    log.LogInformation("curobj.ycostoMateriales = "+curobj.ycostoMateriales );     
                
          curobj.yCostoServicioS                 =                       dataobject?.yCostoServicioS;    log.LogInformation("curobj.yCostoServicioS = "+curobj.yCostoServicioS );          
          curobj.yCostoMultaS                    =                       dataobject?.yCostoMultaS;    log.LogInformation("curobj.yCostoMultaS = "+curobj.yCostoMultaS );          
          curobj.yOtroS                          =                       dataobject?.yOtroS;    log.LogInformation("curobj.yOtroS= "+curobj.yOtroS);          
          curobj.yCostoTotalS                    =                       dataobject?.yCostoTotalS;    log.LogInformation("curobj.yCostoTotalS = "+curobj.yCostoTotalS );           
          curobj.yCostoTotalUSD                  =                       dataobject?.yCostoTotalUSD;    log.LogInformation("curobj.yCostoTotalUSD = "+curobj.yCostoTotalUSD );           
          curobj.yOefaUit                        =                       dataobject?.yOefaUit;    log.LogInformation("curobj.yOefaUit = "+curobj.yOefaUit );          
          curobj.yOefaS                          =                       dataobject?.yOefaS;    log.LogInformation("curobj.yOefaS = "+curobj.yOefaS );           
          curobj.yOefaUSD                        =                       dataobject?.yOefaUSD;    log.LogInformation("curobj.yOefaUSD = "+curobj.yOefaUSD );          
          curobj.yDicapiUit                      =                       dataobject?.yDicapiUit;    log.LogInformation("curobj.yDicapiUit = "+curobj.yDicapiUit );           
          curobj.yDicapiS                        =                       dataobject?.yDicapiS;    log.LogInformation("curobj.yDicapiS = "+curobj.yDicapiS );           
          curobj.yDicapiUSD                      =                       dataobject?.yDicapiUSD;    log.LogInformation("curobj.yDicapiUSD = "+curobj.yDicapiUSD );  
          curobj.IdAccidenteIncidente            =                       dataobject?.IdAccidenteIncidente;    log.LogInformation("curobj.IdAccidenteIncidente = "+curobj.IdAccidenteIncidente );
          curobj.Finalizado                      =                       dataobject?.Finalizado;    log.LogInformation("curobj.Finalizado = "+curobj.Finalizado );

          curobj.AreaImpactada                   =                       dataobject?.AreaImpactada;    log.LogInformation("Dando peo curobj.AreaImpactada = "+curobj.AreaImpactada);
          curobj.TemporadaVeda                   =                       dataobject?.TemporadaVeda;    log.LogInformation("curobj.TemporadaVeda = "+curobj.TemporadaVeda );

          // curobj.IdTipoEvento                    =                       dataobject?.IdTipoEvento;          
          // curobj.Fecha                           =                       dataobject?.Fecha;           
          // curobj.Hora                            =                       dataobject?.Hora;           
          // curobj.ReporteExterno                  =                       dataobject?.ReporteExterno;           
          // curobj.IdGerencia                      =                       dataobject?.IdGerencia;           
          // curobj.IdSede                          =                       dataobject?.IdSede;           
          // curobj.IdZonaUbicacion                 =                       dataobject?.IdZonaUbicacion;           
          // curobj.HayPersonalAfectado             =                       dataobject?.HayPersonalAfectado;           
          // curobj.IdEmpresa                       =                       dataobject?.IdEmpresa;           
          // curobj.Descripcion                     =                       dataobject?.Descripcion;           
          // curobj.AcccionesInmediatas             =                       dataobject?.AcccionesInmediatas;           
          // curobj.IdContaminante                  =                       dataobject?.IdContaminante;           
          // curobj.Volumen                         =                       dataobject?.Volumen;           
          // curobj.UnidadVolumen                   =                       dataobject?.UnidadVolumen;           
          // curobj.AreaImpactada                   =                       dataobject?.AreaImpactada;           
          // curobj.IdImpactoAmbiental              =                       dataobject?.IdImpactoAmbiental;           

          // curobj.xIdDescripcionEvento            =                       dataobject?.xIdDescripcionEvento;           
          // curobj.xImpactoAmbiental               =                       dataobject?.xImpactoAmbiental;           
          // curobj.xReaccionPublica                =                       dataobject?.xReaccionPublica;           
          // curobj.xRelacionComunidad              =                       dataobject?.xRelacionComunidad;           
          // curobj.xLegal                          =                       dataobject?.xLegal;           
          // curobj.xCalificacion                   =                       dataobject?.xCalificacion;           
          // curobj.xNivelSeveridad                 =                       dataobject?.xNivelSeveridad;           
          // curobj.xIIAUnidad                      =                       dataobject?.xIIAUnidad;           
          // curobj.xIIACorporativo                 =                       dataobject?.xIIACorporativo;           
          // curobj.xMetaCorporativa                =                       dataobject?.xMetaCorporativa;           

          // curobj.xIIAUnidadPesca                 =                       dataobject?.xIIAUnidadPesca;           
          // curobj.xIIACoporativoPesca             =                       dataobject?.xIIACoporativoPesca;           
          // curobj.xMetaPesac                      =                       dataobject?.xMetaPesac;           
          // curobj.xIIAOperaciones                 =                       dataobject?.xIIAOperaciones;          
          // curobj.xIIACoporativoOperaciones       =                       dataobject?.xIIACoporativoOperaciones;          
          // curobj.xMetaOperaciones                =                       dataobject?.xMetaOperaciones;           
          // curobj.xIIAdminFinanzas                =                       dataobject?.xIIAdminFinanzas;           
          // curobj.xIIACoporAdmiFinanzas           =                       dataobject?.xIIACoporAdmiFinanzas;           
          // curobj.xMetaAdminFinanazas             =                       dataobject?.xMetaAdminFinanazas;           

          // curobj.yNumColaboradores               =                       dataobject?.yNumColaboradores;          
          // curobj.yNumHora                        =                       dataobject?.yNumHora;           
          // curobj.yCostoMOS                       =                       dataobject?.yCostoMOS;          
          // curobj.yNumColaboradores2              =                       dataobject?.yNumColaboradores2;           
          // curobj.yNumHora2                       =                       dataobject?.yNumHora2;           
          // curobj.yCostoMOS2                      =                       dataobject?.yCostoMOS2;           
          // curobj.yCantProducto                   =                       dataobject?.yCantProducto;           
          // curobj.yCostoProductoS                 =                       dataobject?.yCostoProductoS;           

          // curobj.yCostoProductoS2                =                       dataobject?.yCostoProductoS2; 
          // curobj.ycostoMateriales                =                       dataobject?.ycostoMateriales; 

                  
          // curobj.yCostoServicioS                 =                       dataobject?.yCostoServicioS;          
          // curobj.yCostoMultaS                    =                       dataobject?.yCostoMultaS;          
          // curobj.yOtroS                          =                       dataobject?.yOtroS;          
          // curobj.yCostoTotalS                    =                       dataobject?.yCostoTotalS;           
          // curobj.yCostoTotalUSD                  =                       dataobject?.yCostoTotalUSD;           
          // curobj.yOefaUit                        =                       dataobject?.yOefaUit;          
          // curobj.yOefaS                          =                       dataobject?.yOefaS;           
          // curobj.yOefaUSD                        =                       dataobject?.yOefaUSD;          
          // curobj.yDicapiUit                      =                       dataobject?.yDicapiUit;           
          // curobj.yDicapiS                        =                       dataobject?.yDicapiS;           
          // curobj.yDicapiUSD                      =                       dataobject?.yDicapiUSD;
          // curobj.IdAccidenteIncidente            =                       dataobject?.IdAccidenteIncidente;    
          // curobj.Finalizado                      =                       dataobject?.Finalizado;
          // curobj.TemporadaVeda                   =                       dataobject?.TemporadaVeda;   

          log.LogInformation("saliendo de puuuuuuuuuuutttttttttiiiing");
    }//----------------------------------------------------------------------------------
        
   

   
    return curobj;
}