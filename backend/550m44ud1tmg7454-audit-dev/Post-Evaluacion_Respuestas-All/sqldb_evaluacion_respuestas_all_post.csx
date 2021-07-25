using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataEvaluacionRespuestasPost
{
    string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
    
    // Guardar los datos de una evaluación de auditores
    public async Task<List<evaluacionRespuestas>> funPostEvaluationResponsesAll(ILogger log, List<evaluacionRespuestas> curentity)
    {
        List<evaluacionRespuestas> lobjs = new List<evaluacionRespuestas>();
        int resultado = 0;
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            // Abrimos la conexion con la DB
            conn.Open();
            try
            {
                foreach (var item in curentity)
                {
                    // 1.  create a command object identifying the stored procedure
                    SqlCommand cmd2 = new SqlCommand("[auditoria].post_evaluacion_respuestas_insert", conn);
                    // 2. set the command object so it knows to execute a stored procedure
                    cmd2.CommandType = CommandType.StoredProcedure;
                    cmd2.Parameters.Clear();

                    cmd2.Parameters.AddWithValue("@ListaEvaluacionId", item.ListaEvaluacionId);
                    cmd2.Parameters.AddWithValue("@PreguntaId", item.PreguntaId);
                    cmd2.Parameters.AddWithValue("@EscalaNotasId", item.EscalaNotasId);
                    cmd2.Parameters.AddWithValue("@Comentario", item.Comentario);


                    SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
                    output_Id.Direction    = ParameterDirection.Output;
                    cmd2.Parameters.Add(output_Id);

                    cmd2.CommandType = CommandType.StoredProcedure;

                    await cmd2.ExecuteNonQueryAsync();

                    if (output_Id.Value != DBNull.Value)
                    {
                        resultado = Convert.ToInt16(output_Id.Value);
                        item.Id   = Convert.ToInt16(output_Id.Value);
                        log.LogInformation("resultado: " + resultado);
                    }

                    lobjs.Add(item);
                }
            }
            catch (Exception ex)
            {
                lobjs                       = new List<evaluacionRespuestas>();
                evaluacionRespuestas curobj = new evaluacionRespuestas();
                log.LogInformation("catch::" + ex.Message);
                curobj.Id = 0;
                lobjs.Add(curobj);
            }
            //cerramos la conexion
            if (conn.State == System.Data.ConnectionState.Open)
                conn.Close();
        }

        return lobjs;
    }

    // Guardar los datos de una evaluación de auditores
    public async Task<int> FunPutNecesitaRefuezo(ILogger log, evaluacionRespuestas curentity)
    {
        int resultado = 0;
        
        long AuditorId   = 0;
        long AuditoriaId = 0;
        float Promedio = 0;
        try
        {
            using (SqlConnection conn2 = new SqlConnection(vvsqlconnectionString))
            {
                conn2.Open();

                SqlCommand cmd = new SqlCommand("[auditoria].[get_evaluacion_auditores]", conn2);
                cmd.Parameters.AddWithValue("@RolId", 0);
                cmd.Parameters.AddWithValue("@StatusEvaluacionId", 0);
                cmd.Parameters.AddWithValue("@Auditor", "");
                cmd.Parameters.AddWithValue("@FechaInicio", "");
                cmd.Parameters.AddWithValue("@FechaFin", "");
                cmd.Parameters.AddWithValue("@EvaluacionAuditoresId", curentity.ListaEvaluacionId);
                cmd.Parameters.AddWithValue("@Nota", 0);


                cmd.CommandType = CommandType.StoredProcedure;
                //Ejecutar Comando
                using (SqlDataReader dataReader = await cmd.ExecuteReaderAsync())
                {
                    //Navegar en el Conjunto de Datos Recuperados
                    while (dataReader.Read())
                    {

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("AuditorId"))) { AuditorId = (long)(dataReader.GetValue(dataReader.GetOrdinal("AuditorId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("AuditoriaId"))) { AuditoriaId = (long)(dataReader.GetValue(dataReader.GetOrdinal("AuditoriaId"))); }

                    }
                }
                if (conn2.State == System.Data.ConnectionState.Open)
                    conn2.Close();
            }

            using (SqlConnection conn3 = new SqlConnection(vvsqlconnectionString))
            {
                conn3.Open();
                SqlCommand cmd3 = new SqlCommand("[auditoria].[get_evaluacion_auditores_avg]", conn3);
                cmd3.Parameters.AddWithValue("@AuditoriaId", AuditoriaId);
                cmd3.Parameters.AddWithValue("@AuditorId", AuditorId);
                cmd3.CommandType = CommandType.StoredProcedure;
                //Ejecutar Comando
                using (SqlDataReader dataReader3 = await cmd3.ExecuteReaderAsync())
                {

                    //Navegar en el Conjunto de Datos Recuperados
                    while (dataReader3.Read())
                    {
                        int Total = 0;
                        int Cantidad = 0;

                        if (!dataReader3.IsDBNull(dataReader3.GetOrdinal("Total"))) { Total = (int)(dataReader3.GetValue(dataReader3.GetOrdinal("Total"))); }
                        if (!dataReader3.IsDBNull(dataReader3.GetOrdinal("Cantidad"))) { Cantidad = (int)(dataReader3.GetValue(dataReader3.GetOrdinal("Cantidad"))); }
                        Promedio = (float)Total / Cantidad;
                    }
                }
                if (conn3.State == System.Data.ConnectionState.Open)
                    conn3.Close();
            }

            using (SqlConnection conn4 = new SqlConnection(vvsqlconnectionString))
            {
                conn4.Open();

                // 1.  create a command object identifying the stored procedure
                SqlCommand cmd4 = new SqlCommand("[auditoria].[put_evaluacion_auditores_reforzar_promedio]", conn4);
                // 2. set the command object so it knows to execute a stored procedure
                cmd4.CommandType = CommandType.StoredProcedure;
                cmd4.Parameters.Clear();

                cmd4.Parameters.AddWithValue("@AuditoriaId", AuditoriaId);
                cmd4.Parameters.AddWithValue("@AuditorId", AuditorId);
                cmd4.Parameters.AddWithValue("@Promedio", Promedio);

                SqlParameter output_Id = new SqlParameter("@rows", SqlDbType.BigInt);
                output_Id.Direction = ParameterDirection.Output;
                cmd4.Parameters.Add(output_Id);

                cmd4.CommandType = CommandType.StoredProcedure;

                await cmd4.ExecuteNonQueryAsync();

                if (output_Id.Value != DBNull.Value)
                {
                    resultado = Convert.ToInt16(output_Id.Value);
                    //item.Id   = Convert.ToInt16(output_Id.Value);
                    log.LogInformation("resultado: " + resultado);
                }

                if (conn4.State == System.Data.ConnectionState.Open)
                    conn4.Close();
            }
        }
        catch (Exception ex)
        {
            log.LogInformation("catch::" + ex.Message);
            resultado = 0;
        }

        return resultado;
    }
}

public class evaluacionRespuestas
{
    public long Id { get; set; }
    public long ListaEvaluacionId { get; set; }
    public long PreguntaId { get; set; }
    public long EscalaNotasId { get; set; }
    public string Comentario { get; set; }
    public int Nota { get; set; }
}