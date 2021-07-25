using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Threading.Tasks;
using System.Dynamic;
using System.Linq;

class IpercGeneralDA
{
    public string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);
    //public string vvsqlconnectionString = "Data Source=srv-db-east-us009.database.windows.net;Initial Catalog=db_ssoma_audit_mng_dev;User ID=userdbowner;Password=$P4ssdbowner01#;";

    public async Task<List<IpercGeneral>> fnGetIpercGeneralList(long Gerencia
                                                            , string Area
                                                            , long PuestoTrabajo
                                                            , long Proceso
                                                            , long Subproceso
                                                            , long Alcance
                                                            , int Estado
                                                            , int PageInicio
                                                            , int PageFin)
    {
        List<IpercGeneral> lobjs = new List<IpercGeneral>();
        IpercGeneral obj;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("ssoma.sp_iperc_general_list", conn);
            cmd.Parameters.AddWithValue("@Gerencia", Gerencia);
            cmd.Parameters.AddWithValue("@Area", Area);
            cmd.Parameters.AddWithValue("@Proceso", Proceso);
            cmd.Parameters.AddWithValue("@Subproceso", Subproceso);
            cmd.Parameters.AddWithValue("@Alcance", Alcance);
            cmd.Parameters.AddWithValue("@Estado", Estado);
            //cmd.Parameters.AddWithValue("@FechaFin", FechaFin);
            cmd.Parameters.AddWithValue("@PageInicio", PageInicio);
            cmd.Parameters.AddWithValue("@PageFin", PageFin);

            cmd.CommandType = CommandType.StoredProcedure;

            using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                while (dr.Read())
                {
                    obj = new IpercGeneral();
                    obj.Registro = (Int64)(dr.GetValue(dr.GetOrdinal("Registro")));
                    obj.Id = (long)(dr.GetValue(dr.GetOrdinal("Id")));
                    obj.Codigo = (string)(dr.GetValue(dr.GetOrdinal("Codigo")));

                    obj.Gerencia_Id = (long)(dr.GetValue(dr.GetOrdinal("Gerencia_Id")));
                    obj.Gerencia_Des = (string)(dr.GetValue(dr.GetOrdinal("Gerencia_Des")));

                    obj.Area_Id = (string)(dr.GetValue(dr.GetOrdinal("Area_Id")));
                    obj.Area_Des = (string)(dr.GetValue(dr.GetOrdinal("Area_Des")));

                    if (!dr.IsDBNull(dr.GetOrdinal("Puesto_Trabajo_Id")))
                    obj.Puesto_Trabajo_Id = (string)(dr.GetValue(dr.GetOrdinal("Puesto_Trabajo_Id")));

                    if (!dr.IsDBNull(dr.GetOrdinal("Puesto_Trabajo_Descripcion")))
                    obj.Puesto_Trabajo_Descripcion = (string)(dr.GetValue(dr.GetOrdinal("Puesto_Trabajo_Descripcion")));

                    obj.Proceso_Id = (long)(dr.GetValue(dr.GetOrdinal("Proceso_Id")));
                    obj.Proceso_Des = (string)(dr.GetValue(dr.GetOrdinal("Proceso_Des")));

                    obj.Subproceso_Id = (long)(dr.GetValue(dr.GetOrdinal("Subproceso_Id")));
                    obj.Subproceso_Des = (string)(dr.GetValue(dr.GetOrdinal("Subproceso_Des")));

                    obj.Zona_Id = (long)(dr.GetValue(dr.GetOrdinal("Alcance_Id")));
                    obj.Zona_Des = (string)(dr.GetValue(dr.GetOrdinal("Alcance_Des")));

                    obj.Estado_Id = (int)(dr.GetValue(dr.GetOrdinal("Estado_Id")));
                    obj.Estado_Des = (string)(dr.GetValue(dr.GetOrdinal("Estado_Des")));

                    
                    obj.Fecha_Creacion = (string)(dr.GetValue(dr.GetOrdinal("Fecha_Creacion")));

                    if (!dr.IsDBNull(dr.GetOrdinal("Fecha_Actualizacion")))
                    obj.Fecha_Actualizacion = (string)(dr.GetValue(dr.GetOrdinal("Fecha_Actualizacion")));

                    if (!dr.IsDBNull(dr.GetOrdinal("Fecha_Vigencia")))
                    obj.Fecha_Vigencia = (string)(dr.GetValue(dr.GetOrdinal("Fecha_Vigencia")));


                    obj.Editar = true;
                    obj.Ver = true;
                    obj.Eliminar = true;
                    obj.Evaluar = true;
                    switch (obj.Estado_Id)
                    {
                        case 3://en desarrollo
                            obj.Editar = true;
                            obj.Ver = true;
                            obj.Evaluar = false;
                            obj.Responsable = true;
                            break;
                        case 4://por validar
                            obj.Editar = false;
                            obj.Ver = true;
                            obj.Evaluar = true;
                            obj.Responsable = false;
                            break;
                        case 5://en validacion
                            obj.Editar = false;
                            obj.Ver = true;
                            obj.Evaluar = true;
                            obj.Responsable = false;
                            break;
                        case 6://observado
                            obj.Editar = true;
                            obj.Ver = true;
                            obj.Evaluar = true;
                            obj.Responsable = false;
                            break;
                        case 7://validado
                            obj.Editar = true;
                            obj.Ver = true;
                            obj.Evaluar = true;
                            obj.Responsable = false;
                            break;
                    }

                    lobjs.Add(obj);
                }
        }
        return lobjs;
    }


    public async Task<Result> fnGetIpercGeneralObject(ILogger log ,long Id)
    {
        Result result = new Result();
        List<IpercActividad> listActividades = new List<IpercActividad>();
        List<IpercDPMaquinaria> listMaquinaria = new List<IpercDPMaquinaria>();
        List<IpercEvento> listEventos = new List<IpercEvento>();
        List<IpercPeligro> listPeligros = new List<IpercPeligro>();
        List<IpercEvaluacion> listEvaluaciones = new List<IpercEvaluacion>();
        List<IpercControl> listControles = new List<IpercControl>();
        List<IpercResponsable> ListResponsables = new List<IpercResponsable>();

        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();

                SqlCommand cmd = new SqlCommand("ssoma.sp_iperc_general_object", conn);
                cmd.Parameters.AddWithValue("@Id", Id);

                cmd.CommandType = CommandType.StoredProcedure;

                using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                {
                    while (dr.Read())
                    {
                        IpercGeneral obj = new IpercGeneral();
                        obj.Id = (long)(dr.GetValue(dr.GetOrdinal("Id")));
                        obj.Codigo = (string)(dr.GetValue(dr.GetOrdinal("Codigo")));

                        if (!dr.IsDBNull(dr.GetOrdinal("Gerencia_Id")))
                        {
                            obj.Gerencia_Id = (long)(dr.GetValue(dr.GetOrdinal("Gerencia_Id")));
                            obj.Gerencia_Des = (string)(dr.GetValue(dr.GetOrdinal("Gerencia_Des")));
                        }
                        if (!dr.IsDBNull(dr.GetOrdinal("Area_Id")))
                        {
                            obj.Area_Id = (string)(dr.GetValue(dr.GetOrdinal("Area_Id")));
                            obj.Area_Des = (string)(dr.GetValue(dr.GetOrdinal("Area_Des")));
                        }
                        if (!dr.IsDBNull(dr.GetOrdinal("Proceso_Id")))
                        {
                            obj.Proceso_Id = (long)(dr.GetValue(dr.GetOrdinal("Proceso_Id")));
                            obj.Proceso_Des = (string)(dr.GetValue(dr.GetOrdinal("Proceso_Des")));
                        }
                        if (!dr.IsDBNull(dr.GetOrdinal("Subproceso_Id")))
                        {
                            obj.Subproceso_Id = (long)(dr.GetValue(dr.GetOrdinal("Subproceso_Id")));
                            obj.Subproceso_Des = (string)(dr.GetValue(dr.GetOrdinal("Subproceso_Des")));
                        }
                        if (!dr.IsDBNull(dr.GetOrdinal("Alcance_Id")))
                        {
                            obj.Alcance_Id = (long)(dr.GetValue(dr.GetOrdinal("Alcance_Id")));
                            obj.Alcance_Des = (string)(dr.GetValue(dr.GetOrdinal("Alcance_Des")));
                        }

                        if (!dr.IsDBNull(dr.GetOrdinal("Nombre_Creador")))
                        {
                            obj.Nombre_Creador = (string)(dr.GetValue(dr.GetOrdinal("Nombre_Creador")));
                        }
                        
                        if (!dr.IsDBNull(dr.GetOrdinal("Email_Creador")))
                        {
                            obj.Email_Creador = (string)(dr.GetValue(dr.GetOrdinal("Email_Creador")));
                        }

                        if (!dr.IsDBNull(dr.GetOrdinal("Puesto_Trabajo_Id")))
                        {
                            obj.Puesto_Trabajo_Id = (string)(dr.GetValue(dr.GetOrdinal("Puesto_Trabajo_Id")));

                            if (!dr.IsDBNull(dr.GetOrdinal("Puesto_Trabajo_Descripcion")))
                            obj.Puesto_Trabajo_Descripcion = (string)(dr.GetValue(dr.GetOrdinal("Puesto_Trabajo_Descripcion")));
                        }

                        obj.Active = (int)(dr.GetValue(dr.GetOrdinal("Active")));

                        obj.Estado_Id = (int)(dr.GetValue(dr.GetOrdinal("Estado_Id")));
                        obj.Estado_Des = (string)(dr.GetValue(dr.GetOrdinal("Estado_Des")));
                        obj.Fecha_Creacion = (string)(dr.GetValue(dr.GetOrdinal("Fecha_Creacion")));
                        result.DatosPrincipales = obj;

                    }

                    dr.NextResult();
                    while (dr.Read())
                    {
                        IpercActividad objAct = new IpercActividad();
                        objAct.Id = (long)(dr.GetValue(dr.GetOrdinal("Id")));
                        objAct.Iperc = (long)(dr.GetValue(dr.GetOrdinal("IPERC")));
                        objAct.descripcion = (string)(dr.GetValue(dr.GetOrdinal("Descripcion")));
                        objAct.active = (int)(dr.GetValue(dr.GetOrdinal("Active")));

                        listActividades.Add(objAct);
                    }

                    dr.NextResult();
                    while (dr.Read())
                    {
                        foreach(var actividad in  listActividades){
                            if( (long)(dr.GetValue(dr.GetOrdinal("Actividad"))) == actividad.Id  ){
                                
                                actividad.IdDefinicion = (long)(dr.GetValue(dr.GetOrdinal("Id")));
                                actividad.type_activity = (int)(dr.GetValue(dr.GetOrdinal("TipoActividad")));
                                actividad.frequency = (int)(dr.GetValue(dr.GetOrdinal("Frecuencia")));
                                actividad.genre = (int)(dr.GetValue(dr.GetOrdinal("Genero")));

                            }
                        }
                    }

                    dr.NextResult();
                    while (dr.Read())
                    {
                        IpercDPMaquinaria IpercDPMaquinaria = new IpercDPMaquinaria();
                        IpercDPMaquinaria.Id = (long)(dr.GetValue(dr.GetOrdinal("Id")));
                        IpercDPMaquinaria.DefinicionProblema = (long)(dr.GetValue(dr.GetOrdinal("DefinicionProblema")));
                        IpercDPMaquinaria.id = (long)(dr.GetValue(dr.GetOrdinal("MaquinariaEquipo")));
                        IpercDPMaquinaria.description = (string)(dr.GetValue(dr.GetOrdinal("Descripcion")));
                        IpercDPMaquinaria.Active = (int)(dr.GetValue(dr.GetOrdinal("Active")));
                        listMaquinaria.Add(IpercDPMaquinaria);
                    }


                    foreach(var actividad in  listActividades){
                        List<IpercDPMaquinaria> listMaqAct = new List<IpercDPMaquinaria>();
                        log.LogInformation("recorre actividad ");
                        foreach(var maq in  listMaquinaria){
                            if( maq.DefinicionProblema == actividad.IdDefinicion  ){
                                log.LogInformation("coincidencia");
                                
                                listMaqAct.Add(maq);
                            }
                        }
                        actividad.tools = listMaqAct;
                    }


                    dr.NextResult();
                    while (dr.Read())
                    {
                        IpercEvento IpercEvento = new IpercEvento();
                        IpercEvento.Id = (long)(dr.GetValue(dr.GetOrdinal("Id")));
                        IpercEvento.Actividad = (long)(dr.GetValue(dr.GetOrdinal("Actividad")));
                        IpercEvento.maqid = (long)(dr.GetValue(dr.GetOrdinal("MaquinariaEquipo")));
                        IpercEvento.Iperc = (long)(dr.GetValue(dr.GetOrdinal("IPERC")));
                        IpercEvento.description = (string)(dr.GetValue(dr.GetOrdinal("Descripcion")));
                        IpercEvento.active = (int)(dr.GetValue(dr.GetOrdinal("Active")));
                        listEventos.Add(IpercEvento);
                    }


                    foreach(var actividad in  listActividades){
                        List<IpercEvento> listEvAct = new List<IpercEvento>();
                        log.LogInformation("recorre actividad ");
                        foreach(var evento in  listEventos){
                            if( evento.Actividad == actividad.Id  ){
                                log.LogInformation("coincidencia");
                                
                                listEvAct.Add(evento);
                            }
                        }
                        actividad.events = listEvAct;
                    }


                    dr.NextResult();
                    while (dr.Read())
                    {
                        IpercPeligro IpercPeligro = new IpercPeligro();
                        IpercPeligro.Id = (long)(dr.GetValue(dr.GetOrdinal("Id")));
                        IpercPeligro.Actividad = (long)(dr.GetValue(dr.GetOrdinal("Actividad")));
                        IpercPeligro.MaquinariaEquipo = (long)(dr.GetValue(dr.GetOrdinal("MaquinariaEquipo")));
                        IpercPeligro.Evento = (long)(dr.GetValue(dr.GetOrdinal("Evento")));
                        IpercPeligro.Iperc = (long)(dr.GetValue(dr.GetOrdinal("IPERC")));
                        IpercPeligro.dangerId = (int)(dr.GetValue(dr.GetOrdinal("Peligro")));
                        IpercPeligro.Active = (int)(dr.GetValue(dr.GetOrdinal("Active")));

                        listPeligros.Add(IpercPeligro);
                    }

                    foreach(var actividad in  listActividades){
                        foreach(var evento in  actividad.events){
                            List<IpercPeligro> listDangEv = new List<IpercPeligro>();

                            foreach(var peligro in listPeligros){
                                if(peligro.Evento == evento.Id){
                                    listDangEv.Add(peligro);
                                }
                            }
                            evento.dangers = listDangEv;
                        }
                    }

                    dr.NextResult();
                    while (dr.Read())
                    {
                        IpercEvaluacion IpercEvaluacion = new IpercEvaluacion();
                        IpercEvaluacion.Id = (long)(dr.GetValue(dr.GetOrdinal("Id")));
                        IpercEvaluacion.Iperc = (long)(dr.GetValue(dr.GetOrdinal("IPERC")));
                        IpercEvaluacion.Actividad = (long)(dr.GetValue(dr.GetOrdinal("Actividad")));
                        IpercEvaluacion.Riesgo = (int)(dr.GetValue(dr.GetOrdinal("Riesgo")));

                        IpercEvaluacion.control_fisico = (string)(dr.GetValue(dr.GetOrdinal("ControlFisico")));
                        IpercEvaluacion.control_administrativo = (string)(dr.GetValue(dr.GetOrdinal("ControlAdministrativo")));
                        
                        IpercEvaluacion.epp = (int)(dr.GetValue(dr.GetOrdinal("Epp")));
                        IpercEvaluacion.probabilidad = (int)(dr.GetValue(dr.GetOrdinal("Probabilidad")));
                        IpercEvaluacion.indice_severidad = (int)(dr.GetValue(dr.GetOrdinal("IndiceSeveridad")));
                        IpercEvaluacion.indice_riesgo = (int)(dr.GetValue(dr.GetOrdinal("IndiceRiesgo")));

                        IpercEvaluacion.catalogo_riesgo = (string)(dr.GetValue(dr.GetOrdinal("CatalogoRiesgo")));
                        IpercEvaluacion.significancia = (string)(dr.GetValue(dr.GetOrdinal("Significancia")));

                        IpercEvaluacion.Active = (int)(dr.GetValue(dr.GetOrdinal("Active")));

                        listEvaluaciones.Add(IpercEvaluacion);
                    }

                    foreach(var actividad in  listActividades){
                        foreach(var evento in  actividad.events){
                            foreach(var peligro in evento.dangers){
                                List<IpercEvaluacion> listEvalDan = new List<IpercEvaluacion>();
                                foreach(var evaluacion in listEvaluaciones){
                                    if(evaluacion.Riesgo == peligro.Id){
                                        listEvalDan.Add(evaluacion);
                                    }
                                }
                                peligro.evals = listEvalDan;
                            }
                        }
                    }

                    dr.NextResult();
                    while (dr.Read())
                    {
                        IpercControl IpercControl = new IpercControl();
                        IpercControl.Id = (long)(dr.GetValue(dr.GetOrdinal("Id")));
                        IpercControl.Iperc = (long)(dr.GetValue(dr.GetOrdinal("IPERC")));
                        IpercControl.Actividad = (long)(dr.GetValue(dr.GetOrdinal("Actividad")));
                        IpercControl.Riesgo = (int)(dr.GetValue(dr.GetOrdinal("Riesgo")));

                        IpercControl.eliminacion_riesgo = (string)(dr.GetValue(dr.GetOrdinal("EliminacionRiesgo")));
                        IpercControl.situacion = (string)(dr.GetValue(dr.GetOrdinal("Sustitucion")));
                        IpercControl.control_ingenieria = (string)(dr.GetValue(dr.GetOrdinal("ControlIngenieria")));
                        IpercControl.control_administrativo = (string)(dr.GetValue(dr.GetOrdinal("ControlAdministrativo")));
                        
                        IpercControl.epp = (int)(dr.GetValue(dr.GetOrdinal("Epp")));
                        IpercControl.probabilidad = (int)(dr.GetValue(dr.GetOrdinal("Probabilidad")));
                        IpercControl.indice_severidad = (int)(dr.GetValue(dr.GetOrdinal("IndiceSeveridad")));
                        IpercControl.indice_riesgo = (int)(dr.GetValue(dr.GetOrdinal("IndiceRiesgo")));

                        IpercControl.catalogo_riesgo = (string)(dr.GetValue(dr.GetOrdinal("CatalogoRiesgo")));
                        IpercControl.significancia = (string)(dr.GetValue(dr.GetOrdinal("Significancia")));

                        IpercControl.Active = (int)(dr.GetValue(dr.GetOrdinal("Active")));

                        listControles.Add(IpercControl);
                    }

                    foreach(var actividad in  listActividades){
                        foreach(var evento in  actividad.events){
                            foreach(var peligro in evento.dangers){
                                List<IpercControl> listContEva = new List<IpercControl>();
                                foreach(var control in listControles){
                                    if(control.Riesgo == peligro.Id){
                                        listContEva.Add(control);
                                    }
                                }
                                peligro.controls = listContEva;
                            }
                        }
                    }

                    result.DatosPrincipales.Actividades = listActividades;

                    IpercObservacion IpercObservacion = new IpercObservacion();

                    dr.NextResult();
                    while (dr.Read())
                    {
                        
                        IpercObservacion.Id = (long)(dr.GetValue(dr.GetOrdinal("Id")));
                        IpercObservacion.Iperc = (long)(dr.GetValue(dr.GetOrdinal("IPERC")));
                        IpercObservacion.Observacion = (string)(dr.GetValue(dr.GetOrdinal("Observacion")));
                        int type = (int)(dr.GetValue(dr.GetOrdinal("Type")));

                        if(type==1){
                            IpercObservacion.Validado = true;
                        }
                        if(type==2){
                            IpercObservacion.Observado = true;
                        }

                    }

                    result.Observacion = IpercObservacion;

                    

                    dr.NextResult();
                    while (dr.Read())
                    {
                        log.LogInformation("recorriendo responsable: ");

                        IpercResponsable IpercResponsable = new IpercResponsable();

                        IpercResponsable.Id = (int)(dr.GetValue(dr.GetOrdinal("Id")));
                        IpercResponsable.Iperc = (long)(dr.GetValue(dr.GetOrdinal("IPERC")));
                        IpercResponsable.Nombres = (string)(dr.GetValue(dr.GetOrdinal("Nombres")));
                        IpercResponsable.Cargo = (string)(dr.GetValue(dr.GetOrdinal("Cargo")));
                        IpercResponsable.Correo = (string)(dr.GetValue(dr.GetOrdinal("Correo")));
                        IpercResponsable.Main = (int)(dr.GetValue(dr.GetOrdinal("Main")));
                        IpercResponsable.Firma = (string)(dr.GetValue(dr.GetOrdinal("Firma")));

                        log.LogInformation("recorriendo responsable: 2");
                        ListResponsables.Add(IpercResponsable);
                    }

                    
                    
                    result.DatosPrincipales.Responables = ListResponsables;
                }
            }
        }
        catch (Exception ex)
        {

            Console.WriteLine("fallo" + ex.Message);
        }
        return result;

    }

}

public class Result
{
    public IpercGeneral DatosPrincipales { get; set; }
    public IpercObservacion Observacion { get; set; }
}

public class IpercGeneral
{
    public Int64 Registro { get; set; }
    public long Id { get; set; }
    public string Codigo { get; set; }
    public long Gerencia_Id { get; set; }
    public string Gerencia_Des { get; set; }
    public string Area_Id { get; set; }
    public string Area_Des { get; set; }
    public string Puesto_Trabajo_Id { get; set; }
    public string Puesto_Trabajo_Descripcion { get; set; }
    public long Proceso_Id { get; set; }
    public string Proceso_Des { get; set; }
    public long Subproceso_Id { get; set; }
    public string Subproceso_Des { get; set; }
    public long Zona_Id { get; set; }
    public string Zona_Des { get; set; }
    public long Estado_Id { get; set; }
    public string Estado_Des { get; set; }
    public long Alcance_Id { get; set; }
    public string Alcance_Des { get; set; }
    public int Active {get;set;}

    public string Nombre_Creador { get; set; }
    public string Email_Creador { get; set; }

    public string Fecha_Creacion { get; set; }
    public string Fecha_Actualizacion { get; set; }
    public string Fecha_Vigencia { get; set; }

    public DateTime Fecha_Operacion { get; set; }
    public TimeSpan Hora_Operacion { get; set; }

    public bool Editar { get; set; }
    public bool Ver { get; set; }
    public bool Evaluar { get; set; }
    public bool Responsable { get; set; }
    public bool Eliminar { get; set; }

    public List<IpercActividad> Actividades {get; set; }
    public List<IpercResponsable> Responables { get; set; }

}

public class IpercActividad
{
    public long Id { get; set; }
    public long Iperc { get; set; }

    public string descripcion { get; set; }

    public string Fecha_Creacion { get; set; }
    public string Created_By { get; set; }
    public string Fecha_Actualizacion { get; set; }
    public string Updated_By { get; set; }

    public long IdDefinicion { get; set; }
    public int type_activity { get; set; }
    public int frequency { get; set; }
    public int genre { get; set; }

    public int active {get;set;}

    public bool Editar { get; set; }
    public bool Ver { get; set; }
    public bool Eliminar { get; set; }

    //public IpercDefinicionProblema Definicion {get;set;}

    public List<IpercDPMaquinaria> tools {get;set;}

    public List<IpercEvento> events {get;set;}
}

public class IpercDPMaquinaria
{
    public long Id { get; set; }
    public long DefinicionProblema { get; set; }
    public long id { get; set; }
    public string description { get; set; }
    public int Active {get;set;}

    public string Fecha_Creacion { get; set; }
    public string Created_By { get; set; }
    public string Fecha_Actualizacion { get; set; }
    public string Updated_By { get; set; }

    public bool Editar { get; set; }
    public bool Ver { get; set; }
    public bool Eliminar { get; set; }
}

public class IpercEvento
{
    public long Id { get; set; }
    public long Iperc { get; set; }
    public long Actividad { get; set; }
    public long maqid { get; set; }

    public string description { get; set; }

    public int active {get;set;}

    public string Fecha_Creacion { get; set; }
    public string Created_By { get; set; }
    public string Fecha_Actualizacion { get; set; }
    public string Updated_By { get; set; }

    public bool Editar { get; set; }
    public bool Ver { get; set; }
    public bool Eliminar { get; set; }

    public List<IpercPeligro> dangers {get;set;}
}

public class IpercPeligro
{
    public long Id { get; set; }
    public long Iperc { get; set; }
    public long Actividad { get; set; }
    public long Evento { get; set; }
    public long MaquinariaEquipo { get; set; }

    public int dangerId { get; set; }

    public int Active {get;set;}

    public string Fecha_Creacion { get; set; }
    public string Created_By { get; set; }
    public string Fecha_Actualizacion { get; set; }
    public string Updated_By { get; set; }

    public bool Editar { get; set; }
    public bool Ver { get; set; }
    public bool Eliminar { get; set; }

    public List<IpercEvaluacion> evals {get;set;}
    public List<IpercControl> controls {get;set;}
}

public class IpercEvaluacion
{
    public long Id { get; set; }
    public long Iperc { get; set; }
    public long Actividad { get; set; }
    public int Riesgo { get; set; }

    public string control_fisico { get; set; }
    public string control_administrativo { get; set; }

    public int epp { get; set; }

    public int probabilidad { get; set; }
    public int indice_severidad { get; set; }
    public int indice_riesgo { get; set; }
    public string catalogo_riesgo { get; set; }
    public string significancia { get; set; }

    public int Active {get;set;}

    public string Fecha_Creacion { get; set; }
    public string Created_By { get; set; }
    public string Fecha_Actualizacion { get; set; }
    public string Updated_By { get; set; }

    public bool Editar { get; set; }
    public bool Ver { get; set; }
    public bool Eliminar { get; set; }
}

public class IpercControl
{
    public long Id { get; set; }
    public long Iperc { get; set; }
    public long Actividad { get; set; }
    public int Riesgo { get; set; }

    public string eliminacion_riesgo { get; set; }
    public string situacion { get; set; }
    public string control_ingenieria { get; set; }
    public string control_administrativo { get; set; }

    public int epp { get; set; }

    public int probabilidad { get; set; }
    public int indice_severidad { get; set; }
    public int indice_riesgo { get; set; }
    public string catalogo_riesgo { get; set; }
    public string significancia { get; set; }

    public int Active {get;set;}

    public string Fecha_Creacion { get; set; }
    public string Created_By { get; set; }
    public string Fecha_Actualizacion { get; set; }
    public string Updated_By { get; set; }

    public bool Editar { get; set; }
    public bool Ver { get; set; }
    public bool Eliminar { get; set; }
}

public class IpercObservacion
{
    public long Id { get; set; }
    public long Iperc { get; set; }
    public string Observacion { get; set; }
    public bool Validado { get; set; }
    public bool Observado { get; set; }

    public int Active { get; set; }

    public string Fecha_Creacion { get; set; }
    public string Created_By { get; set; }
    public string Fecha_Actualizacion { get; set; }
    public string Updated_By { get; set; }
}

public class IpercResponsable
{
    public int Id { get; set; }
    public long Iperc { get; set; }
    public string Nombres { get; set; }
    public string Cargo { get; set; }
    public string Correo { get; set; }

    public int Main { get; set; }

    public string Firma { get; set; }

}

public class Checklist
{
    public int Tipo_Observacion_Id { get; set; }
    public string Tipo_Observacion_Des { get; set; }
    public int Grupo_Id { get; set; }
    public string Grupo_Cod { get; set; }
    public string Grupo_Des { get; set; }
    public int Grupo_Tipo_Id { get; set; }
    public string Grupo_Tipo_Des { get; set; }
    public int Subgrupo_Id { get; set; }
    public string Subgrupo_Des { get; set; }
    public string Subgrupo_Icono { get; set; }
    public int Opcion_Id { get; set; }
    public string Opcion_Des { get; set; }
    public int Opcion_Tipo_Id { get; set; }
    public string Opcion_Tipo_Des { get; set; }
    public int Grupo_Padre { get; set; }
    public int Grupo_Padre_Opcion { get; set; }
    public int Grupo_Observacion { get; set; }
    public int Subgrupo_Observacion { get; set; }
    public int Opcion_Observacion { get; set; }
    public string Respuesta_Observacion { get; set; }
    public bool Ind_Adjunto { get; set; }
}

public class Archivo
{
    public int Grupo { get; set; }
    public string Adjunto { get; set; }
}

