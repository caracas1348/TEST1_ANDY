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

class SeguimientoDA
{
    public string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);
    //public string vvsqlconnectionString = "Data Source=srv-db-east-us009.database.windows.net;Initial Catalog=db_ssoma_audit_mng_dev;User ID=userdbowner;Password=$P4ssdbowner01#;";

    public async Task<List<Seguimiento>> fnGetSeguimientoList(ILogger log
                                                            , string CreatedBy
                                                            , int TipoObservacion
                                                            , long Criticidad_F
                                                            , long Sede
                                                            , long Embarcacion
                                                            , int Estado
                                                            , string Reportante
                                                            , string FechaInicio
                                                            , string FechaFin
                                                            , int PageInicio
                                                            , int PageFin)
    {
        log.LogInformation("en fnGetSeguimientoList.");
        List<Seguimiento> lobjs = new List<Seguimiento>();
        Seguimiento obj;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("ssoma.sp_seguimiento_observacion_list", conn);
            cmd.Parameters.AddWithValue("@CreatedBy", CreatedBy);
            cmd.Parameters.AddWithValue("@TipoObservacion", TipoObservacion);
            cmd.Parameters.AddWithValue("@Criticidad", Criticidad_F);
            cmd.Parameters.AddWithValue("@Sede", Sede);
            cmd.Parameters.AddWithValue("@Embarcacion", Embarcacion);
            cmd.Parameters.AddWithValue("@Estado", Estado);
            cmd.Parameters.AddWithValue("@Reportante", Reportante);
            cmd.Parameters.AddWithValue("@FechaInicio", FechaInicio);
            cmd.Parameters.AddWithValue("@FechaFin", FechaFin);
            cmd.Parameters.AddWithValue("@PageInicio", PageInicio);
            cmd.Parameters.AddWithValue("@PageFin", PageFin);

            cmd.CommandType = CommandType.StoredProcedure;

            using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
            {
                while (dr.Read())
                {
                    obj = new Seguimiento();
                    obj.Registro = (Int64)(dr.GetValue(dr.GetOrdinal("Registro")));
                    obj.Id = (long)(dr.GetValue(dr.GetOrdinal("Id")));
                    obj.Codigo = (string)(dr.GetValue(dr.GetOrdinal("Codigo")));
                    obj.Tipo_Observacion_Id = (int)(dr.GetValue(dr.GetOrdinal("Tipo_Observacion_Id")));
                    obj.Tipo_Observacion_Des = (string)(dr.GetValue(dr.GetOrdinal("Tipo_Observacion_Des")));

                    if (!dr.IsDBNull(dr.GetOrdinal("Criticidad_Id")))
                        obj.Criticidad_Id = (long)(dr.GetValue(dr.GetOrdinal("Criticidad_Id")));
                    
                    if (!dr.IsDBNull(dr.GetOrdinal("Criticidad")))
                        obj.Criticidad = (string)(dr.GetValue(dr.GetOrdinal("Criticidad")));

                    if (!dr.IsDBNull(dr.GetOrdinal("Image")))
                        obj.Image = (string)(dr.GetValue(dr.GetOrdinal("Image")));

                    if (!dr.IsDBNull(dr.GetOrdinal("Sede_Id")))
                    {
                        obj.Sede_Id = (long)(dr.GetValue(dr.GetOrdinal("Sede_Id")));
                        obj.Sede_Des = (string)(dr.GetValue(dr.GetOrdinal("Sede_Des")));
                    }

                    if (!dr.IsDBNull(dr.GetOrdinal("Embarcacion_Id")))
                    {
                        obj.Embarcacion_Id = (long)(dr.GetValue(dr.GetOrdinal("Embarcacion_Id")));
                        obj.Embarcacion_Des = (string)(dr.GetValue(dr.GetOrdinal("Embarcacion_Des")));
                    }

                    obj.Area_Id = (long)(dr.GetValue(dr.GetOrdinal("Area_Id")));
                    obj.Area_Des = (string)(dr.GetValue(dr.GetOrdinal("Area_Des")));
                    obj.Zona_Id = (long)(dr.GetValue(dr.GetOrdinal("Zona_Id")));
                    obj.Zona_Des = (string)(dr.GetValue(dr.GetOrdinal("Zona_Des")));
                    obj.Codigo_Reportante = (string)(dr.GetValue(dr.GetOrdinal("Codigo_Reportante")));
                    obj.Nombres_Reportante = (string)(dr.GetValue(dr.GetOrdinal("Nombres_Reportante")));

                    if (!dr.IsDBNull(dr.GetOrdinal("Codigo_Reportado")))
                    {
                        obj.Codigo_Reportado = (string)(dr.GetValue(dr.GetOrdinal("Codigo_Reportado")));
                        obj.Nombres_Reportado = (string)(dr.GetValue(dr.GetOrdinal("Nombres_Reportado")));
                    }

                    obj.Fecha_Creacion = (string)(dr.GetValue(dr.GetOrdinal("Fecha_Operacion")));
                    obj.Hora_Operacion = (TimeSpan)(dr.GetValue(dr.GetOrdinal("Hora_Operacion")));
                    obj.Estado_Id = (int)(dr.GetValue(dr.GetOrdinal("Estado_Id")));
                    obj.Estado_Des = (string)(dr.GetValue(dr.GetOrdinal("Estado_Des")));


                    obj.Editar = true;
                    obj.Ver = true;
                    obj.Eliminar = true;
                    //switch (obj.Estado_Id)
                    //{
                    //    case 1:
                    //        obj.Editar = true;
                    //        obj.Ver = false;
                    //        obj.Eliminar = true;
                    //        break;

                    //    case 2:
                    //        obj.Editar = false;
                    //        obj.Ver = true;
                    //        obj.Eliminar = false;
                    //        break;
                    //}

                    Result objs   = new Result();
                    objs          = await fnGetSeguimientoObject(log, obj.Id, false);
                    obj.Checklist = objs.Checklist;


                    lobjs.Add(obj);
                }
            }
        }
        return lobjs;
    }


    public async Task<int> fnGetSeguimientoCount(int TipoObservacion
                                                , long Criticidad_F
                                                , long Sede
                                                , long Embarcacion
                                                , int Estado
                                                , string Reportante
                                                , string FechaInicio
                                                , string FechaFin)
    {
        int count = 0;
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("ssoma.sp_seguimiento_observacion_count", conn);
            cmd.Parameters.AddWithValue("@TipoObservacion", TipoObservacion);
            cmd.Parameters.AddWithValue("@Criticidad", Criticidad_F);
            cmd.Parameters.AddWithValue("@Sede", Sede);
            cmd.Parameters.AddWithValue("@Embarcacion", Embarcacion);
            cmd.Parameters.AddWithValue("@Estado", Estado);
            cmd.Parameters.AddWithValue("@Reportante", Reportante);
            cmd.Parameters.AddWithValue("@FechaInicio", FechaInicio);
            cmd.Parameters.AddWithValue("@FechaFin", FechaFin);

            var returnParameter = cmd.Parameters.Add("@Total", SqlDbType.Int);
            returnParameter.Direction = ParameterDirection.ReturnValue;

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();
            count = (int)returnParameter.Value;
        }
        return count;
    }




    public async Task<Result> fnGetSeguimientoObject(ILogger log,  long Id, bool adjunto)
    {
        log.LogInformation("en fnGetSeguimientoObject, adjunto: "+adjunto);
        Result result = new Result();
        List<Checklist> lstChecklist = new List<Checklist>();
        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();

                SqlCommand cmd = new SqlCommand("ssoma.sp_seguimiento_observacion_object", conn);
                cmd.Parameters.AddWithValue("@Id", Id);

                cmd.CommandType = CommandType.StoredProcedure;

                using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                {
                    while (dr.Read())
                    {
                        Seguimiento obj = new Seguimiento();
                        obj.Id = (long)(dr.GetValue(dr.GetOrdinal("Id")));
                        obj.Codigo = (string)(dr.GetValue(dr.GetOrdinal("Codigo")));
                        obj.Tipo_Observacion_Id = (int)(dr.GetValue(dr.GetOrdinal("Tipo_Observacion_Id")));
                        obj.Tipo_Observacion_Des = (string)(dr.GetValue(dr.GetOrdinal("Tipo_Observacion_Des")));
                        if (!dr.IsDBNull(dr.GetOrdinal("Sede_Id")))
                        {
                            obj.Sede_Id = (long)(dr.GetValue(dr.GetOrdinal("Sede_Id")));
                            obj.Sede_Des = (string)(dr.GetValue(dr.GetOrdinal("Sede_Des")));
                            obj.Sede_UnidadNegocioId = (long)(dr.GetValue(dr.GetOrdinal("Sede_UnidadNegocioId")));
                        }
                        else
                        {
                            obj.Sede_UnidadNegocioId = 0;
                        }

                        if (!dr.IsDBNull(dr.GetOrdinal("Embarcacion_Id")))
                        {
                            obj.Embarcacion_Id = (long)(dr.GetValue(dr.GetOrdinal("Embarcacion_Id")));
                            obj.Embarcacion_Des = (string)(dr.GetValue(dr.GetOrdinal("Embarcacion_Des")));
                            obj.Embarcacion_UnidadNegocioId = (long)(dr.GetValue(dr.GetOrdinal("Embarcacion_UnidadNegocioId")));
                            obj.Embarcacion_UnidadNegocioSubId = (long)(dr.GetValue(dr.GetOrdinal("Embarcacion_UnidadNegocioSubId")));
                        }
                        else
                        {
                            obj.Embarcacion_UnidadNegocioId = 0;
                            obj.Embarcacion_UnidadNegocioSubId = 0;
                        }


                        if (!dr.IsDBNull(dr.GetOrdinal("Criticidad_Id")))
                            obj.Criticidad_Id = (long)(dr.GetValue(dr.GetOrdinal("Criticidad_Id")));
                        
                        if (!dr.IsDBNull(dr.GetOrdinal("Criticidad")))
                            obj.Criticidad = (string)(dr.GetValue(dr.GetOrdinal("Criticidad")));

                        if (!dr.IsDBNull(dr.GetOrdinal("Image")))
                            obj.Image = (string)(dr.GetValue(dr.GetOrdinal("Image")));


                        obj.Area_Id = (long)(dr.GetValue(dr.GetOrdinal("Area_Id")));
                        obj.Area_Des = (string)(dr.GetValue(dr.GetOrdinal("Area_Des")));
                        obj.Zona_Id = (long)(dr.GetValue(dr.GetOrdinal("Zona_Id")));
                        obj.Zona_Des = (string)(dr.GetValue(dr.GetOrdinal("Zona_Des")));
                        obj.Codigo_Reportante = (string)(dr.GetValue(dr.GetOrdinal("Codigo_Reportante")));
                        obj.Nombres_Reportante = (string)(dr.GetValue(dr.GetOrdinal("Nombres_Reportante")));
                        if (!dr.IsDBNull(dr.GetOrdinal("Codigo_Reportado")))
                        {
                            obj.Codigo_Reportado = (string)(dr.GetValue(dr.GetOrdinal("Codigo_Reportado")));
                            obj.Nombres_Reportado = (string)(dr.GetValue(dr.GetOrdinal("Nombres_Reportado")));
                        }
                        //z    obj.Fecha_Creacion = (string)(dr.GetValue(dr.GetOrdinal("Fecha_Creacion").ToString()));
                        //obj.Fecha_Creacion = (string)(dr.GetValue(dr.GetOrdinal("Fecha_Creacion")));
                        obj.Estado_Id = (int)(dr.GetValue(dr.GetOrdinal("Estado_Id")));
                        obj.Estado_Des = (string)(dr.GetValue(dr.GetOrdinal("Estado_Des")));
                        obj.Fecha_Operacion = (DateTime)(dr.GetValue(dr.GetOrdinal("Fecha_Operacion")));
                        obj.Hora_Operacion = (TimeSpan)(dr.GetValue(dr.GetOrdinal("Hora_Operacion")));
                        result.DatosPrincipales = obj;

                    }


                    dr.NextResult();
                    while (dr.Read())
                    {
                        Checklist obj = new Checklist();
                        obj.Tipo_Observacion_Id = (int)(dr.GetValue(dr.GetOrdinal("Tipo_Observacion_Id")));
                        obj.Tipo_Observacion_Des = (string)(dr.GetValue(dr.GetOrdinal("Tipo_Observacion_Des")));
                        obj.Grupo_Id = (int)(dr.GetValue(dr.GetOrdinal("Grupo_Id")));
                        obj.Grupo_Cod = (string)(dr.GetValue(dr.GetOrdinal("Grupo_Cod")));
                        obj.Grupo_Des = (string)(dr.GetValue(dr.GetOrdinal("Grupo_Des")));
                        obj.Grupo_Tipo_Id = (int)(dr.GetValue(dr.GetOrdinal("Grupo_Tipo_Id")));
                        obj.Grupo_Tipo_Des = (string)(dr.GetValue(dr.GetOrdinal("Grupo_Tipo_Des")));


                        if (dr.IsDBNull(dr.GetOrdinal("Subgrupo_Id")))
                            obj.Subgrupo_Id = 0;
                        else
                            obj.Subgrupo_Id = (int)(dr.GetValue(dr.GetOrdinal("Subgrupo_Id")));


                        if (dr.IsDBNull(dr.GetOrdinal("Subgrupo_Des")))
                            obj.Subgrupo_Des = "";
                        else
                            obj.Subgrupo_Des = (string)(dr.GetValue(dr.GetOrdinal("Subgrupo_Des")));


                        if (dr.IsDBNull(dr.GetOrdinal("Subgrupo_Icono")))
                            obj.Subgrupo_Icono = "";
                        else
                            obj.Subgrupo_Icono = (string)(dr.GetValue(dr.GetOrdinal("Subgrupo_Icono")));


                        if (dr.IsDBNull(dr.GetOrdinal("Opcion_Id")))
                            obj.Opcion_Id = 0;
                        else
                            obj.Opcion_Id = (int)(dr.GetValue(dr.GetOrdinal("Opcion_Id")));


                        if (dr.IsDBNull(dr.GetOrdinal("Opcion_Des")))
                            obj.Opcion_Des = "";
                        else
                            obj.Opcion_Des = (string)(dr.GetValue(dr.GetOrdinal("Opcion_Des")));


                        if (dr.IsDBNull(dr.GetOrdinal("Opcion_Tipo_Id")))
                            obj.Opcion_Tipo_Id = 0;
                        else
                            obj.Opcion_Tipo_Id = (int)(dr.GetValue(dr.GetOrdinal("Opcion_Tipo_Id")));


                        if (dr.IsDBNull(dr.GetOrdinal("Opcion_Tipo_Des")))
                            obj.Opcion_Tipo_Des = "";
                        else
                            obj.Opcion_Tipo_Des = (string)(dr.GetValue(dr.GetOrdinal("Opcion_Tipo_Des")));


                        if (dr.IsDBNull(dr.GetOrdinal("Grupo_Padre")))
                            obj.Grupo_Padre = 0;
                        else
                            obj.Grupo_Padre = (int)(dr.GetValue(dr.GetOrdinal("Grupo_Padre")));


                        if (dr.IsDBNull(dr.GetOrdinal("Grupo_Padre_Opcion")))
                            obj.Grupo_Padre_Opcion = 0;
                        else
                            obj.Grupo_Padre_Opcion = (int)(dr.GetValue(dr.GetOrdinal("Grupo_Padre_Opcion")));


                        if (dr.IsDBNull(dr.GetOrdinal("Grupo_Observacion")))
                            obj.Grupo_Observacion = 0;
                        else
                            obj.Grupo_Observacion = (int)(dr.GetValue(dr.GetOrdinal("Grupo_Observacion")));


                        if (dr.IsDBNull(dr.GetOrdinal("Subgrupo_Observacion")))
                            obj.Subgrupo_Observacion = 0;
                        else
                            obj.Subgrupo_Observacion = (int)(dr.GetValue(dr.GetOrdinal("Subgrupo_Observacion")));


                        if (dr.IsDBNull(dr.GetOrdinal("Opcion_Observacion")))
                            obj.Opcion_Observacion = 0;
                        else
                            obj.Opcion_Observacion = (int)(dr.GetValue(dr.GetOrdinal("Opcion_Observacion")));


                        if (dr.IsDBNull(dr.GetOrdinal("Respuesta_Observacion")))
                            obj.Respuesta_Observacion = "";
                        else
                            obj.Respuesta_Observacion = (string)(dr.GetValue(dr.GetOrdinal("Respuesta_Observacion")));


                        obj.Ind_Adjunto = (bool)(dr.GetValue(dr.GetOrdinal("Ind_Adjunto")));


                        lstChecklist.Add(obj);
                    }
                    result.Checklist = lstChecklist;


                    List<Archivo> ListArchivos = new List<Archivo>();
                    dr.NextResult();
                    while (dr.Read())
                    {
                        if(adjunto)
                        {
                            log.LogInformation("en if(adjunto)");
                            Archivo obj = new Archivo();
                            obj.Grupo = (int)(dr.GetValue(dr.GetOrdinal("Grupo")));
                            obj.Adjunto = (string)(dr.GetValue(dr.GetOrdinal("Adjunto")));
                            result.Adjunto = obj;
                            ListArchivos.Add(obj);
                        }
                    }
                    result.Archivos = ListArchivos;



                }
            }
        }
        catch (Exception ex)
        {

            Console.WriteLine("fallo");
        }
        return result;

    }


    public async Task<List<Criticidad>> fnGetListCriticidad(ILogger log)
    {
        log.LogInformation("en fnGetListCriticidad.");
        
        List<Criticidad> lCriticidad = new List<Criticidad>();
        Criticidad Criticidad;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("ssoma.sp_seguimiento_observacion_criticidad_list", conn);

            cmd.CommandType = CommandType.StoredProcedure;

            using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
            {
                while (dr.Read())
                {
                    Criticidad = new Criticidad();

                    if (!dr.IsDBNull(dr.GetOrdinal("Id")))
                        Criticidad.Id = (long)(dr.GetValue(dr.GetOrdinal("Id")));

                    if (!dr.IsDBNull(dr.GetOrdinal("Description")))
                        Criticidad.Description = (string)(dr.GetValue(dr.GetOrdinal("Description")));

                    if (!dr.IsDBNull(dr.GetOrdinal("Image")))
                        Criticidad.Image = (string)(dr.GetValue(dr.GetOrdinal("Image")));

                    log.LogInformation("Criticidad.Description -> " + Criticidad.Description);

                    lCriticidad.Add(Criticidad); 
                }

            }
            
            if (conn.State == System.Data.ConnectionState.Open)
                conn.Close();
        }

        return lCriticidad;
    }

}

public class Result
{
    public Seguimiento DatosPrincipales { get; set; }
    public List<Checklist> Checklist { get; set; }
    public Archivo Adjunto { get; set; }
    public List<Archivo> Archivos { get; set; }
}

public class Seguimiento
{
    public Int64 Registro { get; set; }
    public long Id { get; set; }
    public string Codigo { get; set; }
    public int Tipo_Observacion_Id { get; set; }
    public string Tipo_Observacion_Des { get; set; }
    public long Sede_Id { get; set; }
    public string Sede_Des { get; set; }
    public long Criticidad_Id { get; set; }
    public string Criticidad { get; set; }
    public string Image { get; set; }
    public long Sede_UnidadNegocioId { get; set; }
    public long Embarcacion_Id { get; set; }
    public string Embarcacion_Des { get; set; }
    public long Embarcacion_UnidadNegocioId { get; set; }
    public long Embarcacion_UnidadNegocioSubId { get; set; }
    public long Area_Id { get; set; }
    public string Area_Des { get; set; }
    public long Zona_Id { get; set; }
    public string Zona_Des { get; set; }
    public string Codigo_Reportante { get; set; }
    public string Nombres_Reportante { get; set; }
    public string Codigo_Reportado { get; set; }
    public string Nombres_Reportado { get; set; }
    public string Fecha_Creacion { get; set; }
    public int Estado_Id { get; set; }
    public string Estado_Des { get; set; }
    public DateTime Fecha_Operacion { get; set; }
    public TimeSpan Hora_Operacion { get; set; }
    public bool Editar { get; set; }
    public bool Ver { get; set; }
    public bool Eliminar { get; set; }
    public List<Checklist> Checklist { get; set; }
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

public class Criticidad
{
    public long Id              { get; set; }
    public string Description   { get; set; }
    public string Image         { get; set; }
}

