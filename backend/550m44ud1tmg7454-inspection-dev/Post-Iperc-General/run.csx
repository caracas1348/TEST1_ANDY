#r "Newtonsoft.Json"
#load "sql.csx"


using System;
using System.Globalization;
using System.Net;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Transactions;
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
    var vvapikeysecure = Environment.GetEnvironmentVariable("apikey", EnvironmentVariableTarget.Process);
    //string vvapikeysecure = requestHeader["apiKey"];
    string vvapiKeyparameter = requestHeader["apiKey"];

    string vvhttpmethod = req.Query["httpmethod"];

    long Id = req.Query["Id"] == "" ? 0 : System.Convert.ToInt64(req.Query["Id"]);

    string jsonrspt = "";

    if (vvapikeysecure != vvapiKeyparameter)
    {
        vvhttpmethod = "";
        jsonrspt = "{}";
    }

    string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
    dynamic body = JsonConvert.DeserializeObject(requestBody);


    IpercGeneralDA IpercGeneralDA = new IpercGeneralDA();
    IpercGeneral IpercGeneral = new IpercGeneral();
    IpercGeneralGet IpercGeneralGet = new IpercGeneralGet();
    IpercDataEnvio IpercDataEnvio = new IpercDataEnvio();
    IpercObservacion IpercObservacion = new IpercObservacion();

    if (vvhttpmethod == "post")
    {
        log.LogInformation("vvhttpmethod == post");
        IpercGeneral = fnSetObjIpercGeneral(log, body, vvhttpmethod);

        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            try
            {
                IpercGeneral = await IpercGeneralDA.fnPostIpercGeneral(log, IpercGeneral);
                log.LogInformation("inserto en fnPostIpercGeneral");
                if (IpercGeneral.Id > 0)
                {
                    IpercActividad IpercActividad;
                    IpercDefinicionProblema IpercDefinicionProblema;
                    if(IpercGeneral.Actividades != null){
                        foreach(var actividad in IpercGeneral.Actividades )
                        {
                            actividad.Iperc = IpercGeneral.Id;
                            IpercActividad = await IpercGeneralDA.fnPostIpercActividad(log, actividad);

                            actividad.Definicion.Iperc = IpercGeneral.Id;
                            actividad.Definicion.Actividad = IpercActividad.Id;

                            IpercDefinicionProblema = await IpercGeneralDA.fnPostIpercDefinicionProblema(log, actividad.Definicion);

                            //MAQUINARIA
                            IpercDPMaquinaria IpercDPMaquinaria;

                            if(actividad.MaquinariaEquipo != null){
                                foreach(var maquina in actividad.MaquinariaEquipo){

                                    maquina.DefinicionProblema = IpercDefinicionProblema.Id;

                                    IpercDPMaquinaria = await IpercGeneralDA.fnPostIpercDPMaquinaria(log, maquina);
                                }
                            }

                            //EVENTOS

                            IpercEvento IpercEvento;

                            if(actividad.Eventos != null){
                                foreach(var evento in actividad.Eventos){

                                    evento.Iperc = IpercGeneral.Id ;
                                    evento.Actividad = IpercActividad.Id;

                                    IpercEvento = await IpercGeneralDA.fnPostIpercEvento(log, evento);

                                    //PELIGROS

                                    IpercPeligro IpercPeligro;

                                    if(evento.Peligros != null){
                                        foreach(var peligro in evento.Peligros){

                                            peligro.Iperc = IpercGeneral.Id ;
                                            peligro.Actividad = IpercActividad.Id;
                                            peligro.Evento = IpercEvento.Id;

                                            IpercPeligro = await IpercGeneralDA.fnPostIpercPeligro(log, peligro);

                                            //EVALUACIONES
                                            IpercEvaluacion IpercEvaluacion;

                                            if(peligro.Evaluaciones != null){
                                                foreach(var eval in peligro.Evaluaciones){

                                                    eval.Iperc = IpercGeneral.Id ;
                                                    eval.Actividad = IpercActividad.Id;
                                                    eval.Riesgo = (int)IpercPeligro.Id;//DEFINIR

                                                    IpercEvaluacion = await IpercGeneralDA.fnPostIpercEvaluacion(log, eval);

                                                }
                                            }
                                            //CONTROLES
                                            IpercControl IpercControl;

                                            if(peligro.Controles != null){
                                                foreach(var control in peligro.Controles){

                                                    control.Iperc = IpercGeneral.Id ;
                                                    control.Actividad = IpercActividad.Id;
                                                    control.Riesgo = (int)IpercPeligro.Id;//DEFINIR

                                                    IpercControl = await IpercGeneralDA.fnPostIpercControl(log, control);

                                                }
                                            }
                                        }
                                    }
                                    
                                }
                            }

                        }
                    }

                }
                scope.Complete();
            }
            catch (Exception ex)
            {
                log.LogInformation("catch::" + ex.Message);
                IpercGeneral.Id = -1;
            }

        jsonrspt = JsonConvert.SerializeObject(IpercGeneral, Formatting.Indented);
    }

    if (vvhttpmethod == "postSend")
    {
        log.LogInformation("vvhttpmethod == post");
        IpercDataEnvio = fnSetObjIpercEnvio(log, body, vvhttpmethod);

        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            try
            {

                IpercGeneralGet = await IpercGeneralDA.fnGetIpercGeneralObject(IpercDataEnvio.Iperc);
                
                IpercEnvio IpercEnvio;
                if(IpercDataEnvio.Envios != null){
                    foreach(var envio in IpercDataEnvio.Envios )
                    {
                        envio.Iperc = IpercDataEnvio.Iperc;
                        IpercEnvio = await IpercGeneralDA.fnPostIpercEnvio(log, envio);

                        if(IpercEnvio.Id>0){
                            log.LogInformation("se registro, a enviar mesaje");

                            string correos          = envio.Correo;//"dariepmio@gmail.com";//"orlyvila@visualsat.com, jvillarroel@visualsat.com, jmendoza@visualsat.com, jmillan@visualsat.com";
                            DataEmailNew oDataEmail = new DataEmailNew();
                            oDataEmail.sendto       = correos;//"jmillan@visualsat.com, millanqjesus@gmail.com";//correos;
                            oDataEmail.from         = "sigtasa@tasa.com.pe";

                            // ASUNTO DEL EMAIL
                            oDataEmail.emailsubject = "Pendiente evaluación matriz IPERC "+IpercGeneralGet.Codigo+" ";

                            var bodyEmail = "";
                        
                           //andy
                            bodyEmail += "<img style='-webkit-user-select: none;margin: auto;background-color:WHITE' src='https://sigtasa.tasa.com.pe/images/logoSIGTASA.png'>";
                           
                           //andy
                            bodyEmail += "<hr size='1' style='border-color:#cbcbcb;' >";

                            bodyEmail += "<p>Estimado(a), saludos cordiales:</p>";

                            bodyEmail += "<p>En la bandeja Evaluar IPERC se encuentra registrada la matriz "+IpercGeneralGet.Codigo+", sede "+IpercGeneralGet.Area_Des+" para el puesto  "+IpercGeneralGet.Puesto_Trabajo_Descripcion+"  , que se encuentra en estado "+IpercGeneralGet.Estado_Des+" para su atención y/o aprobación de la presente matriz.</p>";
                            
                           //bodyEmail += "<p>Se envía el acceso al sistema para su atención:</p>";

                            //andy
                            bodyEmail += "<p>Se envía el acceso al sistema para su atención:<a href='https://www.visualsatpe.com/beta/tasassoma/' target='_blank' data-saferedirecturl='v'>SIGTASA</a></p>";

                            bodyEmail += "<p>Atte.</p>";

                            bodyEmail += "<p>Usuario validador.</p>";

                            bodyEmail += "<p>Cargo.</p>";

                            bodyEmail += "<p>Correo.</p>";

                            oDataEmail.bodyhtml = bodyEmail;

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
                    }
                }

                scope.Complete();
            }
            catch (Exception ex)
            {
                log.LogInformation("catch::" + ex.Message);
                IpercDataEnvio.Iperc = -1;
            }

        jsonrspt = JsonConvert.SerializeObject(IpercDataEnvio, Formatting.Indented);
    }

    if (vvhttpmethod == "postObservation")
    {
        log.LogInformation("vvhttpmethod == postObservation");
        IpercObservacion = fnSetObjIpercObservacion(log, body, vvhttpmethod);

        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            try
            {

                IpercObservacion = await IpercGeneralDA.fnPostIpercObservacion(log,IpercObservacion);

                if(IpercObservacion.Status==2){
                    //consultamos iperc
                    IpercGeneralGet = await IpercGeneralDA.fnGetIpercGeneralObject(IpercObservacion.Iperc);
                    //enviamos correo
                    if(IpercGeneralGet.Id>0){
                        log.LogInformation("se obtuvo datos, a enviar mesaje");

                        string correos          = "dariepmio@gmail.com,kllancachahua@visualsat.com";//"orlyvila@visualsat.com, jvillarroel@visualsat.com, jmendoza@visualsat.com, jmillan@visualsat.com";
                        DataEmailNew oDataEmail = new DataEmailNew();
                        oDataEmail.sendto       = correos;//"jmillan@visualsat.com, millanqjesus@gmail.com";//correos;
                        oDataEmail.from         = "sigtasa@tasa.com.pe";

                        // ASUNTO DEL EMAIL
                        oDataEmail.emailsubject = "Matriz IPERC "+IpercGeneralGet.Estado_Des+" - "+IpercGeneralGet.Codigo+" ";

                        var bodyEmail = "";

                        //andy
                        bodyEmail += "<img style='-webkit-user-select: none;margin: auto;background-color:WHITE' src='https://sigtasa.tasa.com.pe/images/logoSIGTASA.png'>";
                           
                           //andy
                        bodyEmail += "<hr size='1' style='border-color:#cbcbcb;' >";

                        bodyEmail += "<p>Estimado(a), saludos cordiales:</p>";

                        bodyEmail += "<p>En su bandeja de Gestión de IPERC se encuentra registrada la matriz "+IpercGeneralGet.Codigo+", en estado "+IpercGeneralGet.Estado_Des+" para su atención.</p>";
                        
                        //bodyEmail += "<p>Se envía el acceso al sistema para su atención:</p>";
                         //andy
                        bodyEmail += "<p>Se envía el acceso al sistema para su atención:<a href='https://www.visualsatpe.com/beta/tasassoma/' target='_blank' data-saferedirecturl='v'>SIGTASA</a></p>";

                        //bodyEmail += "<p>Se envía el acceso al sistema para su atención:</p>";

                        bodyEmail += "<p>Atte.</p>";

                        bodyEmail += "<p>Usuario validador.</p>";

                        bodyEmail += "<p>Cargo.</p>";

                        bodyEmail += "<p>Correo.</p>";

                        oDataEmail.bodyhtml = bodyEmail;

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
                }

                scope.Complete();
            }
            catch (Exception ex)
            {
                log.LogInformation("catch::" + ex.Message);
                IpercObservacion.Iperc = -1;
            }

        jsonrspt = JsonConvert.SerializeObject(IpercObservacion, Formatting.Indented);
    }

    if (vvhttpmethod == "postResponsables")
    {
        log.LogInformation("vvhttpmethod == postResponsables");
        List<IpercResponsable> lista_responsables = fnSetObjIpercResponsables(log, body, vvhttpmethod);
        IpercResponsable IpercResponsable = new IpercResponsable();
        using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            try
            {
                
                
                if(lista_responsables != null){
                    foreach(var responsable in lista_responsables )
                    {

                        IpercResponsable = await IpercGeneralDA.fnPostIpercResponsable(log, responsable);

                    }
                }

                scope.Complete();
            }
            catch (Exception ex)
            {
                log.LogInformation("catch::" + ex.Message);
                IpercResponsable.Iperc = -1;
            }

        jsonrspt = JsonConvert.SerializeObject(IpercResponsable, Formatting.Indented);
    }

    return jsonrspt != null
        ? (ActionResult)new OkObjectResult($"{jsonrspt}")
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}


// public static void envioNotificacion(ILogger log, IpercGeneral IpercGeneral)
// {

// }

public static IpercGeneral fnSetObjIpercGeneral(ILogger log, dynamic body, string vvmethod)
{
    IpercGeneral obj = new IpercGeneral();
    log.LogInformation("en fnSetObjIpercGeneral");
    if (vvmethod == "post")
    {
        log.LogInformation("en  if (vvmethod == post || vvmethod == postPrueba)");
        
        obj.Updated_By = body?.Updated_By;
        

        log.LogInformation("en  obj.Tipo_Observacion = body?.Tipo_Observacion;");
        obj.Gerencia = body?.Gerencia;
        obj.Area = body?.Area;
        obj.Area_Descripcion = body?.AreaDescripcion;
        obj.Puesto_Trabajo = body?.PuestoTrabajo;
        obj.Puesto_Trabajo_Descripcion = body?.PuestoTrabajoDescripcion;
        obj.Proceso = body?.Proceso;
        obj.Subproceso = body?.Subproceso;
        obj.Alcance = body?.Alcance;
        obj.Estado = body?.Estado;
        obj.IdGeneral = body?.IdGeneral;
        obj.Nombre_Creador = body?.NameUser;
        obj.Email_Creador = body?.EmailUser;

        log.LogInformation("en  TimeZoneInfo PeruZona");
        TimeZoneInfo PeruZona = TimeZoneInfo.FindSystemTimeZoneById("SA Pacific Standard Time");
        DateTime horaPeru = TimeZoneInfo.ConvertTime(DateTime.Now, PeruZona);

        obj.Created_By = body?.Created_By;

        if(body?.Actividades.Count > 0){

            List<IpercActividad> Listactivities = new List<IpercActividad>();
            log.LogInformation("recorreo actividades");

            foreach (var activity in body?.Actividades)
            {
                log.LogInformation("seteo actividad");
                IpercActividad objActivity = new IpercActividad();
                objActivity.IdActividad = activity?.Id;
                objActivity.Descripcion      = activity?.descripcion;
                objActivity.Created_By = body?.Created_By;
                objActivity.Updated_By = body?.Updated_By;

                IpercDefinicionProblema objDefinicion = new IpercDefinicionProblema();
                log.LogInformation("seteo definicion");
                objDefinicion.IdDefinicion = (long)activity.IdDefinicion;
                objDefinicion.TipoActividad = (int)activity.type_activity;
                objDefinicion.Frecuencia = (int)activity.frequency;
                objDefinicion.Genero = (int)activity.genre;
                objDefinicion.Created_By = body?.Created_By;
                objDefinicion.Updated_By = body?.Updated_By;
                objActivity.Definicion = objDefinicion;

                if(activity.tools.Count>0){
                    List<IpercDPMaquinaria> ListaMaquinas = new List<IpercDPMaquinaria>();

                    foreach(var maquina in activity.tools)
                    {
                        log.LogInformation("seteo maquinaria");
                        IpercDPMaquinaria objMaquina = new IpercDPMaquinaria();

                        objMaquina.MaquinariaEquipo = maquina.id;
                        objMaquina.IdMaq = maquina.Id;
                        objMaquina.Active = maquina.Active;
                        objMaquina.Created_By = body?.Created_By;
                        objMaquina.Updated_By = body?.Updated_By;

                        ListaMaquinas.Add(objMaquina);
                    }
                    
                    objActivity.MaquinariaEquipo = ListaMaquinas;
                }

                if(activity.events.Count>0){
                    List<IpercEvento> ListaEventos = new List<IpercEvento>();

                    foreach(var evento in activity.events)
                    {
                        log.LogInformation("seteo evento");
                        IpercEvento objEvento = new IpercEvento();

                        objEvento.IdEvento = evento.Id;

                        objEvento.Active = evento.active;

                        long mqeq = 0;
                        if(evento.maqid!=0){
                            log.LogInformation("entro if maqid!='' ");
                            mqeq=Convert.ToInt64(evento.maqid);
                            log.LogInformation("seteo maqid");
                        }
                        log.LogInformation("salgo");
                        objEvento.MaquinariaEquipo = mqeq;
                        objEvento.Descripcion = evento.description;
                        objEvento.Created_By = body?.Created_By;
                        objEvento.Updated_By = body?.Updated_By;

                        if(evento.dangers.Count>0){

                            List<IpercPeligro> ListaPeligros = new List<IpercPeligro>();

                            foreach(var peligro in evento.dangers)
                            {
                                log.LogInformation("seteo peligro");
                                IpercPeligro objPeligro = new IpercPeligro();

                                objPeligro.IdPeligro = peligro.Id;
                                objPeligro.Active = peligro.Active;

                                objPeligro.Peligro = peligro.dangerId;
                                objPeligro.Created_By = body?.Created_By;
                                objPeligro.Updated_By = body?.Updated_By;

                                if(peligro.evals.Count>0){
                                    List<IpercEvaluacion> ListEvaluacion = new List<IpercEvaluacion>();

                                    foreach(var eval in peligro.evals)
                                    {
                                        log.LogInformation("seteo evaluacion");
                                        IpercEvaluacion objEval = new IpercEvaluacion();

                                        objEval.IdEvaluacion = eval.Id;
                                        objEval.Active = eval.Active;

                                        objEval.ControlFisico = eval.control_fisico;
                                        objEval.ControlAdministrativo = eval.control_administrativo;
                                        
                                        objEval.Epp = (int)eval.epp;
                                        log.LogInformation("seteo Epp");
                                        objEval.Probabilidad = (int)eval.probabilidad;
                                        log.LogInformation("seteo Probabilidad");
                                        objEval.IndiceSeveridad = (int)eval.indice_severidad;
                                        log.LogInformation("seteo IndiceSeveridad");
                                        objEval.IndiceRiesgo = (int)eval.indice_riesgo;
                                        log.LogInformation("seteo IndiceRiesgo");
                                        objEval.CatalogoRiesgo = eval.catalogo_riesgo;
                                        objEval.Significancia = eval.significancia;
                                        objEval.Created_By = body?.Created_By;
                                        objEval.Updated_By = body?.Updated_By;

                                        ListEvaluacion.Add(objEval);
                                    }
                                    objPeligro.Evaluaciones = ListEvaluacion;
                                }

                                if(peligro.controls.Count>0){
                                    List<IpercControl> ListControl = new List<IpercControl>();

                                    foreach(var control in peligro.controls)
                                    {
                                        log.LogInformation("seteo control");
                                        IpercControl objControl = new IpercControl();

                                        objControl.IdControl = control.Id;
                                        objControl.Active = control.Active;

                                        objControl.EliminacionRiesgo = control.eliminacion_riesgo;
                                        objControl.Sustitucion = control.situacion;
                                        objControl.ControlIngenieria = control.control_ingenieria;
                                        objControl.ControlAdministrativo = control.control_administrativo;

                                        objControl.Epp = (int)control.epp;
                                        objControl.Probabilidad = (int)control.probabilidad;
                                        objControl.IndiceSeveridad = (int)control.indice_severidad;
                                        objControl.IndiceRiesgo = (int)control.indice_riesgo;
                                        objControl.CatalogoRiesgo = control.catalogo_riesgo;
                                        objControl.Significancia = control.significancia;

                                        objControl.Created_By = body?.Created_By;
                                        objControl.Updated_By = body?.Updated_By;

                                        ListControl.Add(objControl);
                                    }
                                    objPeligro.Controles = ListControl;
                                }

                                ListaPeligros.Add(objPeligro);
                            }

                            objEvento.Peligros = ListaPeligros;
                        }

                        ListaEventos.Add(objEvento);
                    }

                    objActivity.Eventos = ListaEventos;

                }

                Listactivities.Add(objActivity);
            }

            obj.Actividades = Listactivities;
        }

        log.LogInformation("en  obj.Created_By = body?.Created_By;");
    }

    log.LogInformation("return obj");


    return obj;
}

public static IpercDataEnvio fnSetObjIpercEnvio(ILogger log, dynamic body, string vvmethod)
{
    IpercDataEnvio obj = new IpercDataEnvio();
    log.LogInformation("en fnSetObjIpercDataEnvio");
    if (vvmethod == "postSend")
    {   

        log.LogInformation("en  obj.Tipo_Observacion = body?.Tipo_Observacion;");
        obj.Iperc = body?.Iperc;
        obj.Code = body?.Code;
        log.LogInformation("en  TimeZoneInfo PeruZona");
        TimeZoneInfo PeruZona = TimeZoneInfo.FindSystemTimeZoneById("SA Pacific Standard Time");
        DateTime horaPeru = TimeZoneInfo.ConvertTime(DateTime.Now, PeruZona);

        if(body?.Personas.Count > 0){

            List<IpercEnvio> Listaenvio = new List<IpercEnvio>();
            log.LogInformation("recorreo personas");

            foreach (var persona in body?.Personas)
            {
                log.LogInformation("seteo objEnvio");
                IpercEnvio objEnvio = new IpercEnvio();
                objEnvio.Nombres      = persona?.Nombres;
                objEnvio.Cargo      = persona?.Cargo;
                objEnvio.Correo      = persona?.Correo;
                objEnvio.Created_By = body?.Created_By;
                objEnvio.Updated_By = body?.Updated_By;

                Listaenvio.Add(objEnvio);
            }

            obj.Envios = Listaenvio;
        }

        log.LogInformation("en  obj.Created_By = body?.Created_By;");
    }

    log.LogInformation("return obj");


    return obj;
}

public static IpercObservacion fnSetObjIpercObservacion(ILogger log, dynamic body, string vvmethod)
{
    IpercObservacion obj = new IpercObservacion();
    log.LogInformation("en IpercObservacion");
    if (vvmethod == "postObservation")
    {   

        obj.Iperc = body?.Iperc;
        obj.Observacion = body?.Observacion;
        obj.IdObservacion = body?.IdObservacion;
        if(body?.Validado=="true"){
            obj.Type = 1;
        }else if(body?.Observado=="true"){
            obj.Type = 2;
        }
        obj.Status = body?.Status;
        obj.Created_By = body?.Created_By;
        obj.Updated_By = body?.Updated_By;

        log.LogInformation("en  TimeZoneInfo PeruZona");
        TimeZoneInfo PeruZona = TimeZoneInfo.FindSystemTimeZoneById("SA Pacific Standard Time");
        DateTime horaPeru = TimeZoneInfo.ConvertTime(DateTime.Now, PeruZona);


        log.LogInformation("en  obj.Created_By = body?.Created_By;");
    }

    log.LogInformation("return obj");


    return obj;
}

public static List<IpercResponsable> fnSetObjIpercResponsables(ILogger log, dynamic body, string vvmethod)
{
    List<IpercResponsable> objlist = new List<IpercResponsable>();
    log.LogInformation("en fnSetObjIpercDataEnvio");
    if (vvmethod == "postResponsables")
    {   
        log.LogInformation("en  TimeZoneInfo PeruZona");
        TimeZoneInfo PeruZona = TimeZoneInfo.FindSystemTimeZoneById("SA Pacific Standard Time");
        DateTime horaPeru = TimeZoneInfo.ConvertTime(DateTime.Now, PeruZona);

        if(body?.Personas.Count > 0){

            foreach (var persona in body?.Personas)
            {
                log.LogInformation("seteo objEnvio");
                IpercResponsable objResponsable = new IpercResponsable();
                objResponsable.Iperc      = body?.Iperc;
                objResponsable.Nombres      = persona?.Nombres;
                objResponsable.Cargo      = persona?.Cargo;
                objResponsable.Correo      = persona?.Correo;
                objResponsable.IdentityDocument      = persona?.IdentityDocument;
                objResponsable.HashId      = persona?.HashId;
                objResponsable.Firma      = persona?.Firma;
                objResponsable.Active      = persona?.Active;
                objResponsable.Main      = persona?.Main;
                objResponsable.IdResponsable      = persona?.IdResponsable;

                objResponsable.Created_By = body?.Created_By;
                objResponsable.Updated_By = body?.Updated_By;

                objlist.Add(objResponsable);
            }

        }

        log.LogInformation("en  obj.Created_By = body?.Created_By;");
    }

    log.LogInformation("return obj");


    return objlist;
}