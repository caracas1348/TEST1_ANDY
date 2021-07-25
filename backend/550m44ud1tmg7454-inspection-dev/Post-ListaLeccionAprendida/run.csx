/****************************************************************************************
* VISUAL SAT - [2021]
* PROYECTO : SIGTASA
* ESQUEMA : SSOMA
* SPRINT  : 4
* MODULO : INCIDENTE ACCIDENTES
* OPERADORES_________________________________________________________________________
* | # | PROGRAMADOR     |  |      FECHA   |  |   HORA   |           CORREO           |
* | 1 | Andy Vásquez    |  |  26/03/2021  |  | 09:00:50 |    caracas1348@gmail.com   | post - run 001
* |___|_________________|__|______________|__|__________|____________________________| put  - run 000
*
* DESCRIPCION: ARCHIVO SQL BACKEND DE FUNCIONALIDAD EN SERVIDOR QUE REGISTRA LAS *ALERTAS* DE
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
            curobj.ComoActuar = System.Convert.ToString(ex.Message);//
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
            curobj.ComoActuar = System.Convert.ToString(ex.Message);//
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

          //-------------------------------------------------------------------------------------------------------------------------------------------
                    curobj.Leccion_AprendidaId  =                   dataobject?.Leccion_AprendidaId;   log.LogInformation("curobj.Id1 = "+curobj.Leccion_AprendidaId);

                    curobj.EnQueFallamos =                           dataobject?.EnQueFallamos;  log.LogInformation("curobj.Id1 = "+curobj.EnQueFallamos);

                    curobj.ComoActuar    =                           dataobject?.ComoActuar;     log.LogInformation("curobj.Id1 = "+curobj.ComoActuar);

                    curobj.Created_By    =                           dataobject?.Created_By;     log.LogInformation("curobj.Id1 = "+curobj.Created_By);

                    curobj.Create_Date   =                           dataobject?.Create_Date;     log.LogInformation("curobj.Id1 = "+curobj.Create_Date);

                    curobj.Active        =                           dataobject?.Active;          log.LogInformation("curobj.Id1 = "+curobj.Active);

 
                      
          //------------------------------------------------------------------------------------------------------------------------------------------


    }//----------------------------------------------------------------------------------

    if (vvmethod == "put")
    {//-----------------------------------------------------------------------------------------------------
        log.LogInformation("en  vvmethod == putxxxx.");
          
          curobj.Id1  =                            dataobject?.Id1; //AccionBD
          curobj.AccionBD  =                       dataobject?.AccionBD;
 
         //-------------------------------------------------------------------------------------------------------------------------------------------
                    curobj.Leccion_AprendidaId  =                   dataobject?.Leccion_AprendidaId;   log.LogInformation("curobj.Id1 = "+curobj.Leccion_AprendidaId);

                    curobj.EnQueFallamos =                           dataobject?.EnQueFallamos;  log.LogInformation("curobj.Id1 = "+curobj.EnQueFallamos);

                    curobj.ComoActuar    =                           dataobject?.ComoActuar;     log.LogInformation("curobj.Id1 = "+curobj.ComoActuar);

                    curobj.Created_By    =                           dataobject?.Created_By;     log.LogInformation("curobj.Id1 = "+curobj.Created_By);

                    curobj.Create_Date   =                           dataobject?.Create_Date;     log.LogInformation("curobj.Id1 = "+curobj.Create_Date);

                    curobj.Active        =                           dataobject?.Active;          log.LogInformation("curobj.Id1 = "+curobj.Active);
          //------------------------------------------------------------------------------------------------------------------------------------------

         
    }//----------------------------------------------------------------------------------
        
   

   
    return curobj;
}

