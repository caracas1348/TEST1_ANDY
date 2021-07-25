using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataEvaluacionAuditoresPostAll
{
    string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
    
    public async Task<int> funPostUpdatedHashCodeEvaluationAll(ILogger log, evaluacionAuditoresPostAll curentity, CodigoHash CodigoHash)
    {
        int resultado = 0;
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            // Abrimos la conexion con la DB
            conn.Open();
            try
            {
                // 1.  create a command object identifying the stored procedure
                SqlCommand cmd2 = new SqlCommand("[auditoria].post_updated_hash_code_evaluation", conn);
                // 2. set the command object so it knows to execute a stored procedure
                cmd2.CommandType = CommandType.StoredProcedure;
                cmd2.Parameters.Clear();

                cmd2.Parameters.AddWithValue("@Id", curentity.Id);
                cmd2.Parameters.AddWithValue("@HashEvaluacionTokens", CodigoHash.Hash);
                

                SqlParameter output_Id = new SqlParameter("@rows", SqlDbType.BigInt);
                output_Id.Direction = ParameterDirection.Output;
                cmd2.Parameters.Add(output_Id);

                cmd2.CommandType = CommandType.StoredProcedure;

                await cmd2.ExecuteNonQueryAsync();

                if (output_Id.Value != DBNull.Value)
                {
                    resultado = Convert.ToInt16(output_Id.Value);
                    log.LogInformation("resultado: " + resultado);
                }
            }
            catch (Exception ex)
            {
                log.LogInformation("catch::" + ex.Message);
                resultado = 0;
            }
            //cerramos la conexion
            if (conn.State == System.Data.ConnectionState.Open)
                conn.Close();
        }

        return resultado;
    }

    // Obtener Data para el reenvio de la encuesta de evaluacion
    public async Task<reenvioEvaluacion> funGetDataReenvioEvaluacion(evaluacionAuditoresPostAll curentity)
    {
        reenvioEvaluacion curobj = new reenvioEvaluacion();

        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                //Abrimos la conexion a la DB
                conn.Open();

                SqlCommand cmd = new SqlCommand("[auditoria].[get_evaluacion_auditores_data_reenvio]", conn);
                cmd.Parameters.AddWithValue("@ListaEvaluacionId", curentity.Id);

                cmd.CommandType = CommandType.StoredProcedure;
                //Ejecutar Comando
                using (SqlDataReader dataReader = await cmd.ExecuteReaderAsync())
                {
                    //Navegar en el Conjunto de Datos Recuperados
                    while (dataReader.Read())
                    {

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("AuditoriaId"))) { curobj.AuditoriaId = (long)(dataReader.GetValue(dataReader.GetOrdinal("AuditoriaId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Auditor"))) { curobj.Auditor = (string)(dataReader.GetValue(dataReader.GetOrdinal("Auditor"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("TipoAuditoria"))) { curobj.TipoAuditoria = (string)(dataReader.GetValue(dataReader.GetOrdinal("TipoAuditoria"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Norma"))) { curobj.Norma = (string)(dataReader.GetValue(dataReader.GetOrdinal("Norma"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Sede"))) { curobj.Sede = (string)(dataReader.GetValue(dataReader.GetOrdinal("Sede"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("CorreoAuditorLider"))) { curobj.CorreoAuditorLider = (string)(dataReader.GetValue(dataReader.GetOrdinal("CorreoAuditorLider"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("NombreAuditorLider"))) { curobj.NombreAuditorLider = (string)(dataReader.GetValue(dataReader.GetOrdinal("NombreAuditorLider"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("CargoAuditorLider"))) { curobj.CargoAuditorLider = (string)(dataReader.GetValue(dataReader.GetOrdinal("CargoAuditorLider"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("HashEvaluacionTokens"))) { curobj.HashEvaluacionTokens = (string)(dataReader.GetValue(dataReader.GetOrdinal("HashEvaluacionTokens"))); }
                    }
                }
                //cerramos la conexion a la DB
                if (conn.State == System.Data.ConnectionState.Open)
                    conn.Close();
            }
        }
        catch (Exception ex)
        {
            curobj = new reenvioEvaluacion();
            curobj.AuditoriaId = 0;
            curobj.Auditor = System.Convert.ToString(ex.Message);
        }

        return curobj;
    }

    // obtener el estatus de la evaluacion de un auditor
    public async Task<long> GetFunStatusEvaluacion(long ListaEvaluacionId)
    {
        long result = 0;
        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();

                SqlCommand cmd = new SqlCommand("[auditoria].[get_evaluacion_auditores_status]", conn);
                cmd.Parameters.AddWithValue("@ListaEvaluacionId", ListaEvaluacionId);

                cmd.CommandType = CommandType.StoredProcedure;
                //Ejecutar Comando
                using (SqlDataReader dataReader = await cmd.ExecuteReaderAsync())
                {
                    //Navegar en el Conjunto de Datos Recuperados
                    while (dataReader.Read())
                    {
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("StatusEvaluacionId"))) { result = (long)(dataReader.GetValue(dataReader.GetOrdinal("StatusEvaluacionId"))); }
                    }
                }
                if (conn.State == System.Data.ConnectionState.Open)
                    conn.Close();
            }
        }
        catch (Exception ex)
        {
            result = 0;
        }
        
        return result;
    }

}


public class evaluacionAuditoresPostAll
{
    public long Id { get; set; }
    public long StatusEvaluacionId { get; set; }
    public string Correo { get; set; }
    public string Last_Updated_By { get; set; }
    public string CorreoAuditorLider { get; set; }
}

public class reenvioEvaluacion
{
    public long AuditoriaId { get; set; }
    public string Auditor { get; set; }
    public string TipoAuditoria { get; set; }
    public string Norma { get; set; }
    public string Sede { get; set; }
    public string CorreoAuditorLider { get; set; }
    public string NombreAuditorLider { get; set; }
    public string CargoAuditorLider { get; set; }
    public string HashEvaluacionTokens { get; set; }
}