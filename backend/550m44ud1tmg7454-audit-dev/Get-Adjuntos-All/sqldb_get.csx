using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

// ****************** Inicio: sqldb_get ****************** //
class DataAdjuntos
{
    string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
    
    public async Task<Adjuntos> funGetAdjunto(ILogger log, long Id, string Documento)
    {
        // log.LogInformation(str1);
        // var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);

        //Lista de Objetos
        Adjuntos curobj = new Adjuntos();
        //curobj = new Adjuntos();

        //SQL Objects
        SqlDataReader dataReader;
        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();

                // 1.  create a command object identifying the stored procedure
                SqlCommand cmd = new SqlCommand("auditoria.get_descargar_archivo_bd", conn);

                // 2. set the command object so it knows to execute a stored procedure
                cmd.CommandType = CommandType.StoredProcedure;

                // 3. add parameter to command, which will be passed to the stored procedure
                cmd.Parameters.Add(new SqlParameter("@Id", Id));
                cmd.Parameters.Add(new SqlParameter("@Documento", Documento));

                //Ejecutar Comando
                using (dataReader = await cmd.ExecuteReaderAsync())
                {
                    //Navegar en el Conjunto de Datos Recuperados
                    while (dataReader.Read())
                    {
                        curobj = new Adjuntos();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Adjunto"))) { curobj.Adjunto = (string)(dataReader.GetValue(dataReader.GetOrdinal("Adjunto"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("AdjuntoName"))) { curobj.AdjuntoName = (string)(dataReader.GetValue(dataReader.GetOrdinal("AdjuntoName"))); }

                        curobj.Id = 1;
                    }
                }
                conn.Close();
                return curobj;

            }
        }
        catch (Exception ex)
        {
            curobj = new Adjuntos();
            curobj.Id = 0;
            curobj.Adjunto = System.Convert.ToString(ex.Message);
        }
        return curobj;
    }

}


public class Adjuntos
{
    public long Id { get; set; }
    public string AdjuntoName { get; set; }
    public string Adjunto { get; set; }
}

// ****************** Fin: sqldb_auditorall_get ****************** //
