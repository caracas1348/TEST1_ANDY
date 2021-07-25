using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataSeguimientoPost
{
    string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);

    public async Task<EvidenciaPost> funPostSeguimientoEvidencia(ILogger log, EvidenciaPost curentity)
    {
        log.LogInformation("En funPostSeguimientoEvidencia." );

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("[auditoria].[post_seguimiento_evidencia]", conn);

            cmd.Parameters.AddWithValue("@HAPlanAccionesId",    curentity.HAPlanAccionesId);
            cmd.Parameters.AddWithValue("@Name",                curentity.Name);
            cmd.Parameters.AddWithValue("@Adjunto",             curentity.Adjunto);
            cmd.Parameters.AddWithValue("@Created_By",          curentity.Created_By);

            SqlParameter output_Id = new SqlParameter("@SEEvidenciasId", SqlDbType.BigInt);
            output_Id.Direction    = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            SqlParameter output_Id2 = new SqlParameter("@SEEvidenciasAdjuntosId", SqlDbType.BigInt);
            output_Id2.Direction     = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id2);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value && output_Id2.Value != DBNull.Value)
            {
                curentity.Id                     = Convert.ToInt64(output_Id.Value);
                curentity.SEEvidenciasAdjuntosId = Convert.ToInt64(output_Id2.Value);
            }

            if (conn.State == System.Data.ConnectionState.Open)
                conn.Close();
        }

        return curentity;
    }


    //
    public async Task<int> funPutSeguimientoEvidencia(ILogger log, EvidenciaPost curentity)
    {
        log.LogInformation("En funPutSeguimientoEvidencia." );
        int resultado = 0;
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("[auditoria].[put_seguimiento_evidencia]", conn);

            cmd.Parameters.AddWithValue("@Id",                      curentity.Id);
            cmd.Parameters.AddWithValue("@SEEvidenciasAdjuntosId",  curentity.SEEvidenciasAdjuntosId);
            cmd.Parameters.AddWithValue("@Deleted",                 curentity.Deleted);
            cmd.Parameters.AddWithValue("@Name",                    curentity.Name);
            cmd.Parameters.AddWithValue("@Adjunto",                 curentity.Adjunto);
            cmd.Parameters.AddWithValue("@Created_By",              curentity.Created_By);

            SqlParameter output_Id = new SqlParameter("@row", SqlDbType.BigInt);
            output_Id.Direction    = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            SqlParameter output_Id2 = new SqlParameter("@rows", SqlDbType.BigInt);
            output_Id2.Direction     = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id2);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value && output_Id2.Value != DBNull.Value)
            {
                resultado = 1;
            }

            if (conn.State == System.Data.ConnectionState.Open)
                conn.Close();
        }

        return resultado;
    }

    /**
     * Evaluar una evidencia
     */
    public async Task<int> funEvaluarEvidencia(ILogger log, EvidenciaPost curentity)
    {
        log.LogInformation("En funEvaluarEvidencia." );

        int resultado = 0;
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("[auditoria].[post_evaluar_evidencia]", conn);

            cmd.Parameters.AddWithValue("@Id",                      curentity.Id);
            cmd.Parameters.AddWithValue("@SEEvidenciasAdjuntosId",  curentity.SEEvidenciasAdjuntosId);
            cmd.Parameters.AddWithValue("@HAPlanAccionesId",        curentity.HAPlanAccionesId);
            cmd.Parameters.AddWithValue("@SEStatusEvidenciasId",    curentity.SEStatusEvidenciasId);
            cmd.Parameters.AddWithValue("@DescriptionObservacion",  curentity.DescriptionObservacion);
            cmd.Parameters.AddWithValue("@TipoEvaluacion",          curentity.TipoEvaluacion);
            cmd.Parameters.AddWithValue("@Created_By",              curentity.Created_By);

            SqlParameter output_Id = new SqlParameter("@row", SqlDbType.BigInt);
            output_Id.Direction    = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value )
            {
                resultado = Convert.ToInt32(output_Id.Value);
            }

            if (conn.State == System.Data.ConnectionState.Open)
                conn.Close();
        }

        log.LogInformation("antes de return resultado -> " + resultado );
        return resultado;
    }

    /**
     * Reprogramar Accion Correctiva
     */
    public async Task<long> funPostReprogramacion(ILogger log, ReprogramacionPost curentity)
    {
        log.LogInformation("En funPostReprogramacion." );

        long resultado = 0;
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("[auditoria].[post_reprogramacion]", conn);

            cmd.Parameters.AddWithValue("@Id",                      curentity.Id);
            cmd.Parameters.AddWithValue("@HAPlanAccionesId",        curentity.HAPlanAccionesId);
            cmd.Parameters.AddWithValue("@Name",                    curentity.Name);
            cmd.Parameters.AddWithValue("@Adjunto",                 curentity.Adjunto);
            cmd.Parameters.AddWithValue("@Motivo",                  curentity.Motivo);
            cmd.Parameters.AddWithValue("@FechaNueva",              curentity.FechaNueva);
            cmd.Parameters.AddWithValue("@FechaAnterior",           curentity.FechaAnterior);
            cmd.Parameters.AddWithValue("@Created_By",              curentity.Created_By);

            SqlParameter output_Id = new SqlParameter("@row", SqlDbType.BigInt);
            output_Id.Direction    = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            SqlParameter output_Id2 = new SqlParameter("@row2", SqlDbType.BigInt);
            output_Id2.Direction    = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id2);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value )
            {
                resultado = Convert.ToInt64(output_Id.Value);
                log.LogInformation("Convert.ToInt64(output_Id.Value) -> " + Convert.ToInt64(output_Id.Value));
                if(output_Id2.Value != DBNull.Value)
                {
                    log.LogInformation("Convert.ToInt64(output_Id2.Value) -> " + Convert.ToInt64(output_Id2.Value));
                }
            }

            if (conn.State == System.Data.ConnectionState.Open)
                conn.Close();
        }

        log.LogInformation("antes de return, resultado -> " + resultado );
        return resultado;
    }


    /**
     * Eliminar Reprogramación de Accion Correctiva
     */
    public async Task<long> funDeleteReprogramacion(ILogger log, DeleteReprogramacion curentity)
    {
        log.LogInformation("En funDeleteReprogramacion. Id -> " + curentity.Id );

        long resultado = 0;
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("[auditoria].[delete_se_reprogramaciones]", conn);

            cmd.Parameters.AddWithValue("@Id",          curentity.Id);
            cmd.Parameters.AddWithValue("@Created_By",  curentity.Created_By);

            SqlParameter output_Id = new SqlParameter("@row", SqlDbType.BigInt);
            output_Id.Direction    = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value )
            {
                resultado = Convert.ToInt64(output_Id.Value);
                log.LogInformation("Convert.ToInt64(output_Id.Value) -> " + Convert.ToInt64(output_Id.Value));
            }

            if (conn.State == System.Data.ConnectionState.Open)
                conn.Close();
        }

        log.LogInformation("antes de return, resultado -> " + resultado );
        return resultado;
    }

    public async Task<DataNotificacion> funGetDataNotificacion( ILogger log
                                                            , long HAPlanAccionesId
                                                            )
    {
        DataNotificacion curobj = new DataNotificacion();
        //Listado de objetos de Evidencias
        List<Evidencias> Evidencias  = new List<Evidencias>();
        log.LogInformation("en la funcion funGetDataNotificacion ");
        //SQL Objects
        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();

                SqlCommand cmd = new SqlCommand("[auditoria].[get_se_data_notificaciones]", conn);

                cmd.Parameters.AddWithValue("@HAPlanAccionesId", HAPlanAccionesId);

                cmd.CommandType = CommandType.StoredProcedure;
                log.LogInformation("antes de dataReader ");

                using (SqlDataReader dataReader = await cmd.ExecuteReaderAsync())
                {
                    //Navegar en el Conjunto de Datos Recuperados
                    while (dataReader.Read())
                    {
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code_Hallazgo"))) { curobj.Code_Hallazgo = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code_Hallazgo"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Sede"))) { curobj.Sede  = (string)(dataReader.GetValue(dataReader.GetOrdinal("Sede"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Item"))) { curobj.Item  = (int)(dataReader.GetValue(dataReader.GetOrdinal("Item"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("HallazgoResponsable"))) { curobj.HallazgoResponsable  = (string)(dataReader.GetValue(dataReader.GetOrdinal("HallazgoResponsable"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("HallazgoCargo"))) { curobj.HallazgoCargo  = (string)(dataReader.GetValue(dataReader.GetOrdinal("HallazgoCargo"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("HallazgoCorreo"))) { curobj.HallazgoCorreo  = (string)(dataReader.GetValue(dataReader.GetOrdinal("HallazgoCorreo"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("AccionResponsable"))) { curobj.AccionResponsable  = (string)(dataReader.GetValue(dataReader.GetOrdinal("AccionResponsable"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("AccionCargo"))) { curobj.AccionCargo  = (string)(dataReader.GetValue(dataReader.GetOrdinal("AccionCargo"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("AccionCorreo"))) { curobj.AccionCorreo  = (string)(dataReader.GetValue(dataReader.GetOrdinal("AccionCorreo"))); }


                    }
                    log.LogInformation("curobj.Code_Hallazgo -> "+curobj.Code_Hallazgo);
                    log.LogInformation("curobj.HallazgoResponsable -> "+curobj.HallazgoResponsable);
                    log.LogInformation("curobj.AccionResponsable -> "+curobj.AccionResponsable);


                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        Evidencias curobjEvidencias = new Evidencias();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Name"))) { curobjEvidencias.Name = (string)(dataReader.GetValue(dataReader.GetOrdinal("Name"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Status"))) { curobjEvidencias.Status = (string)(dataReader.GetValue(dataReader.GetOrdinal("Status"))); }

                        Evidencias.Add(curobjEvidencias);
                        log.LogInformation("curobjEvidencias.Name -> "+curobjEvidencias.Name);
                    }
                    curobj.Evidencias = Evidencias;

                }
            }
        }
        catch (Exception ex)
        {

            curobj                  = new DataNotificacion();
            curobj.Item             = 0;
            curobj.Code_Hallazgo    = System.Convert.ToString(ex.Message);
            log.LogInformation("System.Convert.ToString(ex.Message) -> " + System.Convert.ToString(ex.Message) );
        }

        return curobj;
    }

}

public class EvidenciaPost
{
    public long Id                       { get; set; }
    public long HAPlanAccionesId         { get; set; }
    public long SEEvidenciasAdjuntosId   { get; set; }
    public long SEStatusEvidenciasId     { get; set; }
    public string Name                   { get; set; }
    public string Adjunto                { get; set; }
    public string Created_By             { get; set; }
    public int Deleted                   { get; set; }
    public string DescriptionObservacion { get; set; }
    public int TipoEvaluacion            { get; set; }

    // public DateTime EjecucionDate       {get; set;}
}

public class ReprogramacionPost
{
    public long     Id                     { get; set; }
    public long     HAPlanAccionesId       { get; set; }
    public string   Name                   { get; set; }
    public string   Adjunto                { get; set; }
    public string   Motivo                 { get; set; }
    public string   Created_By             { get; set; }
    public DateTime FechaNueva             { get; set; }
    public DateTime FechaAnterior          { get; set; }
}

public class DeleteReprogramacion
{
    public long   Id            { get; set; }
    public long   Resultado     { get; set; }
    public string Respuesta     { get; set; }
    public string Created_By    { get; set; }
}

public class DataNotificacion
{
    public string   Code_Hallazgo       { get; set; }
    public string   Sede                { get; set; }
    public string   HallazgoResponsable { get; set; }
    public string   HallazgoCargo       { get; set; }
    public string   HallazgoCorreo      { get; set; }
    public string   AccionResponsable   { get; set; }
    public string   AccionCargo         { get; set; }
    public string   AccionCorreo        { get; set; }
    public int      Item                { get; set; }
    public List<Evidencias> Evidencias  { get; set; }

}

public class Evidencias
{
    //public int     Item         { get; set; }
    public string   Name         { get; set; }
    public string   Status       { get; set; }
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