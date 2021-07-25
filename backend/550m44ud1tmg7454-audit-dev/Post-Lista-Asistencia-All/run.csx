#r "Newtonsoft.Json"
#load "sqldb_lista_asistencia_all_post.csx"
#load "../Post-Asistentes-All/sqldb_asistentes_all_post.csx"
#load "../Get-Auditoria-All/sqldb_auditoriaall_get.csx"
 
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
    string usuariodelete;

    string jsonrspt = "";
    string name = req.Query["name"];    
    string vvhttpmethod = req.Query["httpmethod"];
    
    log.LogInformation("httpmethod: "+vvhttpmethod);

    //Evaluar Clave API
    if(vvapikeysecure != vvapiKeyparameter )
    {
        vvhttpmethod="";
        jsonrspt="{}";
    }
 
    /*START - Parametros de Lectura*/
   
    // string apiKey = requestHeader.GetValues("apiKey").First();  
       
    string requestBody = await new StreamReader(req.Body).ReadToEndAsync();

    log.LogInformation("requestBody:"+requestBody);
   
    dynamic dataobject = JsonConvert.DeserializeObject(requestBody);

    DataListaAsistenciaAll vobj_sqldata = new DataListaAsistenciaAll();
    listaasistencia curobj = new listaasistencia();

    DataAsistentesAll vboj_sqldata_asistentes = new DataAsistentesAll();

    DataAuditoriaAllGet vbobj_sqldata_auditoria = new DataAuditoriaAllGet();

    long newid =0;
    long curid =0;
 
   //Invocar INSERT
    if(vvhttpmethod == "post"){

        curobj =  funsetObject( log, dataobject ,vvhttpmethod );   
        Task<long> curobjtask = vobj_sqldata.funPostListaAsistenciaAll( log , curobj);
        curobjtask.Wait();
        newid = (long)curobjtask.Result;
        curobj.Id = newid;


        auditoriaallget aud = vbobj_sqldata_auditoria.funGetAuditoriaAll(log, 1, (long)dataobject.AuditoriaID, null);

        string sede = aud.CodeSede;

        var asistenteslist = dataobject.asistentes;
        if (asistenteslist.Count > 0) {

            foreach (var asistente in asistenteslist) {

                asistente curobjasistente = new asistente();

                asistente.ListaAsistenciaID = newid;
                asistente.Created_By = dataobject.Created_By;
                curobjasistente =  funsetObjectAsistente( log, asistente ,vvhttpmethod ); 
                Task<long> curobjtaska = vboj_sqldata_asistentes.funPostAsistentesAll( log , curobjasistente);
                curobjtaska.Wait();
                long newida = (long)curobjtaska.Result;
                curobjasistente.Id = newida;
            }

        }

        string code = "LT"+sede+newid.ToString().PadLeft(6,'0');
        string year = DateTime.Now.ToString("yy");
        code = sede + newid.ToString().PadLeft(4, '0')+year;
        listaasistencia editCur = new listaasistencia();
        editCur.Code = code;
        editCur.Last_Updated_By   = dataobject.Created_By;
        editCur.Last_Updated_Date = System.DateTime.Now; 
        editCur =    vobj_sqldata.funPutListaAsistenciaAll( log ,newid, editCur);

        curobj.Code = code;
        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
    }
  

    //Invocar PUT
    if(vvhttpmethod == "put"){
        curid= System.Convert.ToInt64(req.Query["Id"]); 
        curobj =    funsetObject( log , dataobject,vvhttpmethod );   
        curobj =    vobj_sqldata.funPutListaAsistenciaAll( log ,curid, curobj);
        curobj.Id = curid;

        var asistenteslist = dataobject.asistentes;
        if (asistenteslist.Count > 0) {

            foreach (var asistente in asistenteslist) {

                asistente curobjasistente = new asistente();

                long asistenteId = asistente.Id; 
                asistente.Last_Updated_By = dataobject.Last_Updated_By;
                curobjasistente =    funsetObjectAsistente( log , asistente, vvhttpmethod );   
                curobjasistente =    vboj_sqldata_asistentes.funPutAsistentesAll( log ,asistenteId ,curobjasistente);
                curobjasistente.Id = asistenteId;
            }

        }
        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
    }

   //Invocar DELETE
    if(vvhttpmethod == "delete"){

        curid = System.Convert.ToInt64(req.Query["Id"]);
        usuariodelete = req.Query["Delete_By"];

        long nrorows = vboj_sqldata_asistentes.funDeleteAsistentes( log ,curid, usuariodelete );

        //Conversion de Respuestas a JSON
        jsonrspt = JsonConvert.SerializeObject(nrorows, Formatting.Indented);
    }
  
    return jsonrspt != null
        ? (ActionResult)new OkObjectResult(jsonrspt)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}






public static listaasistencia funsetObject(ILogger log, dynamic dataobject, string vvmethod)  
{
    long vnAuditoriaID = 0;
    if(dataobject?.AuditoriaID > 0){
        vnAuditoriaID   = dataobject?.AuditoriaID;
    }

    string vvCode        = dataobject?.Code;

    string vvCreated_By  = dataobject?.Created_By;
    string vvLast_Updated_By  = dataobject?.Last_Updated_By; 
                  
    listaasistencia curobj = new listaasistencia();

    curobj.AuditoriaID = vnAuditoriaID;
    curobj.Code        = vvCode;

    if(vvmethod == "post")
    {
        curobj.Created_By        = vvCreated_By;
        curobj.Created_Date      = System.DateTime.Now; 
    }
    if(vvmethod == "put")
    {  
        curobj.Last_Updated_By   = vvLast_Updated_By;
        curobj.Last_Updated_Date = System.DateTime.Now;  
    }
    return curobj;
}   

public static asistente funsetObjectAsistente(ILogger log, dynamic dataobject, string vvmethod)  
{
    long vnListaAsistenciaID = 0;
    if(dataobject?.ListaAsistenciaID > 0){
        vnListaAsistenciaID            = dataobject?.ListaAsistenciaID;
    }
    string vvUserIdHash                 = dataobject?.UserIdHash;
    string vvNombres                    = dataobject?.Nombres;
    string vvCargo                      = dataobject?.Cargo;
    int vnFlag_Asistencia = 0;
    if(dataobject?.Flag_Asistencia>0){
        vnFlag_Asistencia               = dataobject?.Flag_Asistencia;
    }
    string vvHora_Asistencia_Apertura   = dataobject?.Hora_Asistencia_Apertura;
    string vvFecha_Asistencia_Apertura  = dataobject?.Fecha_Asistencia_Apertura;
    string vvHora_Asistencia_Cierre     = dataobject?.Hora_Asistencia_Cierre;
    string vvFecha_Asistencia_Cierre    = dataobject?.Fecha_Asistencia_Cierre;

    string vvCreated_By  = dataobject?.Created_By;
    string vvLast_Updated_By  = dataobject?.Last_Updated_By; 
                  
    asistente curobj = new asistente();

    curobj.ListaAsistenciaID            = vnListaAsistenciaID;
    curobj.UserIdHash                   = vvUserIdHash;
    curobj.Nombres                      = vvNombres;
    curobj.Cargo                        = vvCargo;
    curobj.Flag_Asistencia              = vnFlag_Asistencia;
    curobj.Hora_Asistencia_Apertura     = vvHora_Asistencia_Apertura;
    curobj.Fecha_Asistencia_Apertura    = vvFecha_Asistencia_Apertura;
    curobj.Hora_Asistencia_Cierre       = vvHora_Asistencia_Cierre;
    curobj.Fecha_Asistencia_Cierre      = vvFecha_Asistencia_Cierre;

    if(vvmethod == "post")
    {
        curobj.Created_By        = vvCreated_By;
        curobj.Created_Date      = System.DateTime.Now; 
    }
    if(vvmethod == "put")
    { 
        curobj.Last_Updated_By   = vvLast_Updated_By;
        curobj.Last_Updated_Date = System.DateTime.Now; 
    }

    return curobj;
} 
