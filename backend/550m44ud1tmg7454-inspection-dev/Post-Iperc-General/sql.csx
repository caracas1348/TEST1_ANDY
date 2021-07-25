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

    public async Task<IpercGeneral> fnPostIpercGeneral(ILogger log, IpercGeneral entity)
    {
        entity.Id = 0;
        entity.Codigo = "";
        log.LogInformation("en fnPostIpercGeneral");
        try{
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("ssoma.sp_post_iperc_genreal", conn);
            
            cmd.Parameters.AddWithValue("@IdGeneral", entity.IdGeneral);
            cmd.Parameters.AddWithValue("@Gerencia", entity.Gerencia);
            cmd.Parameters.AddWithValue("@Area", entity.Area);
            cmd.Parameters.AddWithValue("@Area_Descripcion", entity.Area_Descripcion);
            cmd.Parameters.AddWithValue("@Puesto_Trabajo", entity.Puesto_Trabajo);
            cmd.Parameters.AddWithValue("@Puesto_Trabajo_Descripcion", entity.Puesto_Trabajo_Descripcion);
            cmd.Parameters.AddWithValue("@Proceso", entity.Proceso);
            cmd.Parameters.AddWithValue("@Subproceso", entity.Subproceso);
            log.LogInformation("en Zona");
            cmd.Parameters.AddWithValue("@Alcance", entity.Alcance);
            cmd.Parameters.AddWithValue("@Nombre_Creador", entity.Nombre_Creador);
            cmd.Parameters.AddWithValue("@Email_Creador", entity.Email_Creador);

            cmd.Parameters.AddWithValue("@Fecha_Creacion", DateTime.Now.AddHours(-5));
            cmd.Parameters.AddWithValue("@Fecha_Actualizacion", DateTime.Now);
            cmd.Parameters.AddWithValue("@Fecha_Vigencia", DateTime.Now.AddHours(-5).AddYears(1));
            cmd.Parameters.AddWithValue("@Estado", entity.Estado);
            cmd.Parameters.AddWithValue("@Created_By", entity.Created_By);
            cmd.Parameters.AddWithValue("@Updated_By", entity.Updated_By);
            cmd.Parameters.AddWithValue("@Active", 1);


            SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
            output_Id.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            SqlParameter output_Cod = new SqlParameter("@NewCod", SqlDbType.NVarChar, 30);
            output_Cod.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Cod);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                entity.Id = Convert.ToInt64(output_Id.Value);
                entity.Codigo = Convert.ToString(output_Cod.Value);

            }
        }
        }
        catch (Exception ex)
        {
            log.LogInformation("CATCH:"+(string)ex.Message );            
        }
        log.LogInformation("entity.Id -> "+entity.Id);
        log.LogInformation("entity.Codigo -> "+entity.Codigo);
        return entity;
    }

    public async Task<IpercActividad> fnPostIpercActividad(ILogger log, IpercActividad entity)
    {
        entity.Id = 0;
        log.LogInformation("en fnPostIpercActividad");
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("ssoma.sp_post_iperc_actividades", conn);

            cmd.Parameters.AddWithValue("@IdActividad", entity.IdActividad);
            cmd.Parameters.AddWithValue("@Iperc", entity.Iperc);
            cmd.Parameters.AddWithValue("@Descripcion", entity.Descripcion);
            cmd.Parameters.AddWithValue("@Active", 1);
            cmd.Parameters.AddWithValue("@Fecha_Creacion", DateTime.Now);
            cmd.Parameters.AddWithValue("@Created_By", entity.Created_By);
            cmd.Parameters.AddWithValue("@Fecha_Actualizacion", DateTime.Now);
            cmd.Parameters.AddWithValue("@Updated_By", entity.Updated_By);

            SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
            output_Id.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                entity.Id = Convert.ToInt64(output_Id.Value);

            }
        }
        log.LogInformation("entity.Id -> "+entity.Id);

        return entity;
    }

    public async Task<IpercDefinicionProblema> fnPostIpercDefinicionProblema(ILogger log, IpercDefinicionProblema entity)
    {
        entity.Id = 0;
        log.LogInformation("en fnPostIpercDefinicionProblema");
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("ssoma.sp_post_iperc_definicion_problema", conn);

            cmd.Parameters.AddWithValue("@IdDefinicion", entity.IdDefinicion);
            cmd.Parameters.AddWithValue("@Iperc", entity.Iperc);
            cmd.Parameters.AddWithValue("@Actividad", entity.Actividad);

            cmd.Parameters.AddWithValue("@TipoActividad", entity.TipoActividad);
            cmd.Parameters.AddWithValue("@Frecuencia", entity.Frecuencia);
            cmd.Parameters.AddWithValue("@Genero", entity.Genero);

            cmd.Parameters.AddWithValue("@Active", 1);
            cmd.Parameters.AddWithValue("@Fecha_Creacion", DateTime.Now);
            cmd.Parameters.AddWithValue("@Created_By", entity.Created_By);
            cmd.Parameters.AddWithValue("@Fecha_Actualizacion", DateTime.Now);
            cmd.Parameters.AddWithValue("@Updated_By", entity.Updated_By);

            SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
            output_Id.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                entity.Id = Convert.ToInt64(output_Id.Value);

            }
        }
        log.LogInformation("entity.Id -> "+entity.Id);

        return entity;
    }

    public async Task<IpercDPMaquinaria> fnPostIpercDPMaquinaria(ILogger log, IpercDPMaquinaria entity)
    {
        entity.Id = 0;
        log.LogInformation("en fnPostIpercDPMaquinaria");
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("ssoma.sp_post_iperc_dp_maquinaria", conn);

            cmd.Parameters.AddWithValue("@IdMaq",entity.IdMaq);

            cmd.Parameters.AddWithValue("@DefinicionProblema", entity.DefinicionProblema);
            cmd.Parameters.AddWithValue("@MaquinariaEquipo", entity.MaquinariaEquipo);
            
            cmd.Parameters.AddWithValue("@Active", entity.Active);
            cmd.Parameters.AddWithValue("@Fecha_Creacion", DateTime.Now);
            cmd.Parameters.AddWithValue("@Created_By", entity.Created_By);

            SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
            output_Id.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                entity.Id = Convert.ToInt64(output_Id.Value);

            }
        }
        log.LogInformation("entity.Id -> "+entity.Id);

        return entity;
    }

    public async Task<IpercEvento> fnPostIpercEvento(ILogger log, IpercEvento entity)
    {
        entity.Id = 0;
        log.LogInformation("en fnPostIpercEvento");
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("ssoma.sp_post_iperc_evento", conn);

            cmd.Parameters.AddWithValue("@IdEvento", entity.IdEvento);
            cmd.Parameters.AddWithValue("@Iperc", entity.Iperc);
            cmd.Parameters.AddWithValue("@Actividad", entity.Actividad);
            cmd.Parameters.AddWithValue("@MaquinariaEquipo", entity.MaquinariaEquipo);
            cmd.Parameters.AddWithValue("@Descripcion", entity.Descripcion);

            cmd.Parameters.AddWithValue("@Active", entity.Active);
            cmd.Parameters.AddWithValue("@Fecha_Creacion", DateTime.Now);
            cmd.Parameters.AddWithValue("@Created_By", entity.Created_By);
            cmd.Parameters.AddWithValue("@Fecha_Actualizacion", DateTime.Now);
            cmd.Parameters.AddWithValue("@Updated_By", entity.Updated_By);

            SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
            output_Id.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                entity.Id = Convert.ToInt64(output_Id.Value);

            }
        }
        log.LogInformation("entity.Id -> "+entity.Id);

        return entity;
    }

    public async Task<IpercPeligro> fnPostIpercPeligro(ILogger log, IpercPeligro entity)
    {
        entity.Id = 0;
        log.LogInformation("en fnPostIpercPeligro");
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("ssoma.sp_post_iperc_peligro", conn);

            cmd.Parameters.AddWithValue("@IdPeligro", entity.IdPeligro);

            cmd.Parameters.AddWithValue("@Iperc", entity.Iperc);
            cmd.Parameters.AddWithValue("@Actividad", entity.Actividad);
            cmd.Parameters.AddWithValue("@Evento", entity.Evento);
            cmd.Parameters.AddWithValue("@MaquinariaEquipo", entity.MaquinariaEquipo);
            cmd.Parameters.AddWithValue("@Peligro", entity.Peligro);

            cmd.Parameters.AddWithValue("@Active", entity.Active);
            cmd.Parameters.AddWithValue("@Fecha_Creacion", DateTime.Now);
            cmd.Parameters.AddWithValue("@Created_By", entity.Created_By);
            cmd.Parameters.AddWithValue("@Fecha_Actualizacion", DateTime.Now);
            cmd.Parameters.AddWithValue("@Updated_By", entity.Updated_By);

            SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
            output_Id.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                entity.Id = Convert.ToInt64(output_Id.Value);

            }
        }
        log.LogInformation("entity.Id -> "+entity.Id);

        return entity;
    }

    public async Task<IpercEvaluacion> fnPostIpercEvaluacion(ILogger log, IpercEvaluacion entity)
    {
        entity.Id = 0;
        log.LogInformation("en fnPostIpercEvaluacion");
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("ssoma.sp_post_iperc_evaluacion", conn);

            cmd.Parameters.AddWithValue("@IdEvaluacion", entity.IdEvaluacion);

            cmd.Parameters.AddWithValue("@Iperc", entity.Iperc);
            cmd.Parameters.AddWithValue("@Actividad", entity.Actividad);
            cmd.Parameters.AddWithValue("@Riesgo", entity.Riesgo);

            cmd.Parameters.AddWithValue("@ControlFisico", entity.ControlFisico);
            cmd.Parameters.AddWithValue("@ControlAdministrativo", entity.ControlAdministrativo);

            cmd.Parameters.AddWithValue("@EPP", entity.Epp);
            cmd.Parameters.AddWithValue("@Probabilidad", entity.Probabilidad);
            cmd.Parameters.AddWithValue("@IndiceSeveridad", entity.IndiceSeveridad);
            cmd.Parameters.AddWithValue("@IndiceRiesgo", entity.IndiceRiesgo);
            cmd.Parameters.AddWithValue("@CatalogoRiesgo", entity.CatalogoRiesgo);
            cmd.Parameters.AddWithValue("@Significancia", entity.Significancia);

            cmd.Parameters.AddWithValue("@Active", entity.Active);
            cmd.Parameters.AddWithValue("@Fecha_Creacion", DateTime.Now);
            cmd.Parameters.AddWithValue("@Created_By", entity.Created_By);
            cmd.Parameters.AddWithValue("@Fecha_Actualizacion", DateTime.Now);
            cmd.Parameters.AddWithValue("@Updated_By", entity.Updated_By);

            SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
            output_Id.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                entity.Id = Convert.ToInt64(output_Id.Value);

            }
        }
        log.LogInformation("entity.Id -> "+entity.Id);

        return entity;
    }

    public async Task<IpercControl> fnPostIpercControl(ILogger log, IpercControl entity)
    {
        entity.Id = 0;
        log.LogInformation("en fnPostIpercControl");
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("ssoma.sp_post_iperc_controles", conn);

            cmd.Parameters.AddWithValue("@IdControl", entity.IdControl);

            cmd.Parameters.AddWithValue("@Iperc", entity.Iperc);
            cmd.Parameters.AddWithValue("@Actividad", entity.Actividad);
            cmd.Parameters.AddWithValue("@Riesgo", entity.Riesgo);

            cmd.Parameters.AddWithValue("@EliminacionRiesgo", entity.EliminacionRiesgo);
            cmd.Parameters.AddWithValue("@Sustitucion", entity.Sustitucion);
            cmd.Parameters.AddWithValue("@ControlIngenieria", entity.ControlIngenieria);
            cmd.Parameters.AddWithValue("@ControlAdministrativo", entity.ControlAdministrativo);

            cmd.Parameters.AddWithValue("@EPP", entity.Epp);
            cmd.Parameters.AddWithValue("@Probabilidad", entity.Probabilidad);
            cmd.Parameters.AddWithValue("@IndiceSeveridad", entity.IndiceSeveridad);
            cmd.Parameters.AddWithValue("@IndiceRiesgo", entity.IndiceRiesgo);
            cmd.Parameters.AddWithValue("@CatalogoRiesgo", entity.CatalogoRiesgo);
            cmd.Parameters.AddWithValue("@Significancia", entity.Significancia);

            cmd.Parameters.AddWithValue("@Active", entity.Active);
            cmd.Parameters.AddWithValue("@Fecha_Creacion", DateTime.Now);
            cmd.Parameters.AddWithValue("@Created_By", entity.Created_By);
            cmd.Parameters.AddWithValue("@Fecha_Actualizacion", DateTime.Now);
            cmd.Parameters.AddWithValue("@Updated_By", entity.Updated_By);

            SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
            output_Id.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                entity.Id = Convert.ToInt64(output_Id.Value);

            }
        }
        log.LogInformation("entity.Id -> "+entity.Id);

        return entity;
    }

    public async Task<IpercEnvio> fnPostIpercEnvio(ILogger log, IpercEnvio entity)
    {
        entity.Id = 0;
        log.LogInformation("en fnPostIpercEnvio");
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("ssoma.sp_post_iperc_envios", conn);

            cmd.Parameters.AddWithValue("@Iperc", entity.Iperc);
            cmd.Parameters.AddWithValue("@Nombres", entity.Nombres);
            cmd.Parameters.AddWithValue("@Cargo", entity.Cargo);
            cmd.Parameters.AddWithValue("@Correo", entity.Correo);

            cmd.Parameters.AddWithValue("@Active", 1);
            cmd.Parameters.AddWithValue("@Fecha_Creacion", DateTime.Now);
            cmd.Parameters.AddWithValue("@Created_By", entity.Created_By);

            SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
            output_Id.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                entity.Id = Convert.ToInt64(output_Id.Value);

            }
        }
        log.LogInformation("entity.Id -> "+entity.Id);

        return entity;
    }
    public async Task<IpercGeneralGet> fnGetIpercGeneralObject(long Id)
    {
        IpercGeneralGet obj = new IpercGeneralGet();

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
                        if (!dr.IsDBNull(dr.GetOrdinal("Puesto_Trabajo_Id")))
                        {
                            obj.Puesto_Trabajo_Id = (string)(dr.GetValue(dr.GetOrdinal("Puesto_Trabajo_Id")));

                            if (!dr.IsDBNull(dr.GetOrdinal("Puesto_Trabajo_Descripcion")))
                            obj.Puesto_Trabajo_Descripcion = (string)(dr.GetValue(dr.GetOrdinal("Puesto_Trabajo_Descripcion")));
                        }

                        obj.Estado_Id = (int)(dr.GetValue(dr.GetOrdinal("Estado_Id")));
                        obj.Estado_Des = (string)(dr.GetValue(dr.GetOrdinal("Estado_Des")));
                        obj.Fecha_Creacion = (string)(dr.GetValue(dr.GetOrdinal("Fecha_Creacion")));
                        

                    }
                }
            }
        }
        catch (Exception ex)
        {

            Console.WriteLine("fallo:" + ex.Message);
        }
        return obj;

    }

    public async Task<IpercObservacion> fnPostIpercObservacion(ILogger log, IpercObservacion entity)
    {
        entity.Id = 0;
        log.LogInformation("en fnPostIpercObservacion");
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("ssoma.sp_post_iperc_observacion", conn);

            cmd.Parameters.AddWithValue("@IdObservacion", entity.IdObservacion);
            cmd.Parameters.AddWithValue("@Iperc", entity.Iperc);
            cmd.Parameters.AddWithValue("@Observacion", entity.Observacion);
            cmd.Parameters.AddWithValue("@Type", entity.Type);
            cmd.Parameters.AddWithValue("@Status", entity.Status);
            cmd.Parameters.AddWithValue("@Active", 1);
            cmd.Parameters.AddWithValue("@Fecha_Creacion", DateTime.Now);
            cmd.Parameters.AddWithValue("@Created_By", entity.Created_By);
            cmd.Parameters.AddWithValue("@Fecha_Actualizacion", DateTime.Now);
            cmd.Parameters.AddWithValue("@Updated_By", entity.Updated_By);

            int IpercStatus = 0;
            if(entity.Status==1){//guardado
                IpercStatus = 5;//en validacion
            }else{//finalizado
                if(entity.Type==1){//validado
                    IpercStatus = 7;//validado
                }else{//observado
                    IpercStatus = 6;//observado
                }
            }

            cmd.Parameters.AddWithValue("@IpercStatus", IpercStatus);

            SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
            output_Id.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                entity.Id = Convert.ToInt64(output_Id.Value);

            }
        }
        log.LogInformation("entity.Id -> "+entity.Id);

        return entity;
    }

    public async Task<IpercResponsable> fnPostIpercResponsable(ILogger log, IpercResponsable entity)
    {
        entity.Id = 0;
        log.LogInformation("en fnPostIpercResponsable");
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("ssoma.sp_post_iperc_responsables", conn);

            cmd.Parameters.AddWithValue("@Iperc", entity.Iperc);
            cmd.Parameters.AddWithValue("@Nombres", entity.Nombres);
            cmd.Parameters.AddWithValue("@Cargo", entity.Cargo);
            cmd.Parameters.AddWithValue("@Correo", entity.Correo);
            cmd.Parameters.AddWithValue("@IdentityDocument", entity.IdentityDocument);
            cmd.Parameters.AddWithValue("@HashId", entity.HashId);
            cmd.Parameters.AddWithValue("@Firma", entity.Firma);
            cmd.Parameters.AddWithValue("@Active", entity.Active);
            cmd.Parameters.AddWithValue("@Main", entity.Main);
            cmd.Parameters.AddWithValue("@IdResponsable", entity.IdResponsable);

            cmd.Parameters.AddWithValue("@Fecha_Creacion", DateTime.Now);
            cmd.Parameters.AddWithValue("@Created_By", entity.Created_By);
            cmd.Parameters.AddWithValue("@Fecha_Actualizacion", DateTime.Now);
            cmd.Parameters.AddWithValue("@Updated_By", entity.Updated_By);

            SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
            output_Id.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                entity.Id = Convert.ToInt64(output_Id.Value);

            }
        }
        log.LogInformation("entity.Id -> "+entity.Id);

        return entity;
    }
}



public class IpercGeneral
{
    public long Id { get; set; }
    public string Codigo { get; set; }

    public long Gerencia { get; set; }
    public string Area { get; set; }
    public string Area_Descripcion { get; set; }
    public string Puesto_Trabajo { get; set; }
    public string Puesto_Trabajo_Descripcion { get; set; }
    public long Proceso { get; set; }
    public long Subproceso { get; set; }
    public long Alcance { get; set; }
    public string Nombre_Creador { get; set; }
    public string Email_Creador { get; set; }

    public int Estado { get; set; }
    public string Fecha_Creacion { get; set; }
    public string Created_By { get; set; }
    public string Fecha_Actualizacion { get; set; }
    public string Updated_By { get; set; }

    public long IdGeneral { get; set; }

    public bool Editar { get; set; }
    public bool Ver { get; set; }
    public bool Eliminar { get; set; }

    public List<IpercActividad> Actividades {get; set; }
}

public class IpercActividad
{
    public long Id { get; set; }
    public long Iperc { get; set; }

    public string Descripcion { get; set; }

    public string Fecha_Creacion { get; set; }
    public string Created_By { get; set; }
    public string Fecha_Actualizacion { get; set; }
    public string Updated_By { get; set; }

    public long IdActividad { get; set; }

    public bool Editar { get; set; }
    public bool Ver { get; set; }
    public bool Eliminar { get; set; }

    public IpercDefinicionProblema Definicion {get;set;}

    public List<IpercDPMaquinaria> MaquinariaEquipo {get;set;}

    public List<IpercEvento> Eventos {get;set;}
}

public class IpercDefinicionProblema
{
    public long Id { get; set; }
    public long Iperc { get; set; }
    public long Actividad { get; set; }

    public int TipoActividad { get; set; }
    public int Frecuencia { get; set; }
    public int Genero { get; set; }

    public long IdDefinicion { get; set; }

    public string Fecha_Creacion { get; set; }
    public string Created_By { get; set; }
    public string Fecha_Actualizacion { get; set; }
    public string Updated_By { get; set; }

    public bool Editar { get; set; }
    public bool Ver { get; set; }
    public bool Eliminar { get; set; }
}

public class IpercDPMaquinaria
{
    public long Id { get; set; }
    public long DefinicionProblema { get; set; }
    public long MaquinariaEquipo { get; set; }

    public long IdMaq { get; set; }

    public string Fecha_Creacion { get; set; }
    public string Created_By { get; set; }
    public string Fecha_Actualizacion { get; set; }
    public string Updated_By { get; set; }

    public int Active { get; set; }
    public bool Editar { get; set; }
    public bool Ver { get; set; }
    public bool Eliminar { get; set; }
}

public class IpercEvento
{
    public long Id { get; set; }
    public long Iperc { get; set; }
    public long Actividad { get; set; }
    public long MaquinariaEquipo { get; set; }

    public string Descripcion { get; set; }

    public long IdEvento { get; set; }

    public int Active { get; set; }
    public string Fecha_Creacion { get; set; }
    public string Created_By { get; set; }
    public string Fecha_Actualizacion { get; set; }
    public string Updated_By { get; set; }

    public bool Editar { get; set; }
    public bool Ver { get; set; }
    public bool Eliminar { get; set; }

    public List<IpercPeligro> Peligros {get;set;}
}

public class IpercPeligro
{
    public long Id { get; set; }
    public long Iperc { get; set; }
    public long Actividad { get; set; }
    public long Evento { get; set; }
    public long MaquinariaEquipo { get; set; }

    public int Peligro { get; set; }

    public long IdPeligro { get; set; }

    public int Active { get; set; }
    public string Fecha_Creacion { get; set; }
    public string Created_By { get; set; }
    public string Fecha_Actualizacion { get; set; }
    public string Updated_By { get; set; }

    public bool Editar { get; set; }
    public bool Ver { get; set; }
    public bool Eliminar { get; set; }

    public List<IpercEvaluacion> Evaluaciones {get;set;}
    public List<IpercControl> Controles {get;set;}
}

public class IpercEvaluacion
{
    public long Id { get; set; }
    public long Iperc { get; set; }
    public long Actividad { get; set; }
    public int Riesgo { get; set; }

    public string ControlFisico { get; set; }
    public string ControlAdministrativo { get; set; }

    public int Epp { get; set; }

    public int Probabilidad { get; set; }
    public int IndiceSeveridad { get; set; }
    public int IndiceRiesgo { get; set; }
    public string CatalogoRiesgo { get; set; }
    public string Significancia { get; set; }

    public long IdEvaluacion { get; set; }

    public int Active { get; set; }
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

    public string EliminacionRiesgo { get; set; }
    public string Sustitucion { get; set; }
    public string ControlIngenieria { get; set; }
    public string ControlAdministrativo { get; set; }

    public int Epp { get; set; }

    public int Probabilidad { get; set; }
    public int IndiceSeveridad { get; set; }
    public int IndiceRiesgo { get; set; }
    public string CatalogoRiesgo { get; set; }
    public string Significancia { get; set; }

    public long IdControl { get; set; }

    public int Active { get; set; }
    public string Fecha_Creacion { get; set; }
    public string Created_By { get; set; }
    public string Fecha_Actualizacion { get; set; }
    public string Updated_By { get; set; }

    public bool Editar { get; set; }
    public bool Ver { get; set; }
    public bool Eliminar { get; set; }
}

public class IpercDataEnvio
{

    public long Iperc { get; set; }
    public string Code { get; set; }
    public List<IpercEnvio> Envios {get;set;}

}

public class IpercEnvio
{
    public long Id { get; set; }
    public long Iperc { get; set; }
    public string Nombres { get; set; }
    public string Cargo { get; set; }
    public string Correo { get; set; }

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

    public int Active { get; set; }

    public long IdObservacion {get; set;}

    public int Type { get; set; }
    public int Status { get; set; }

    public string Fecha_Creacion { get; set; }
    public string Created_By { get; set; }
    public string Fecha_Actualizacion { get; set; }
    public string Updated_By { get; set; }

}

public class Response
{
    public Boolean status { get; set; }
    public string message { get; set; }
}


public class DataEmailNew
{
    public string sendto { get; set; }
    public string from { get; set; }
    public string emailsubject { get; set; }
    public string bodyhtml { get; set; }
    public List<Files> Attachments { get; set; }
}

public class Files
{
    public string base64 { get; set; }
    public string name { get; set; }
}

public class IpercGeneralGet
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

    public string Fecha_Creacion { get; set; }
    public string Fecha_Actualizacion { get; set; }
    public string Fecha_Vigencia { get; set; }

    public DateTime Fecha_Operacion { get; set; }
    public TimeSpan Hora_Operacion { get; set; }

    public bool Editar { get; set; }
    public bool Ver { get; set; }
    public bool Eliminar { get; set; }
}

public class IpercResponsable
{
    public long Id { get; set; }
    public long Iperc { get; set; }
    public string Nombres { get; set; }
    public string Cargo { get; set; }
    public string Correo { get; set; }
    public string IdentityDocument { get; set; }
    public string HashId { get; set; }
    public string Firma { get; set; }
    public int Active { get; set; }
    public int Main { get; set; }

    public long IdResponsable { get; set; }

    public string Fecha_Creacion { get; set; }
    public string Created_By { get; set; }
    public string Fecha_Actualizacion { get; set; }
    public string Updated_By { get; set; }

}