using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataEscalaNotasAll
{
    string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
    
    public async Task<List<escalaNotas>> funGetEscalaNotasAllList(ILogger log)
    {
        //Lista de Objetos
        List<escalaNotas> lobjs = new List<escalaNotas>();
        escalaNotas curobj;

        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();

                SqlCommand cmd = new SqlCommand("[auditoria].get_escala_notas", conn);
                //cmd.Parameters.AddWithValue("@ListaEvaluacionId", EvaluacionAuditoresId);
                
                cmd.CommandType = CommandType.StoredProcedure;
                //Ejecutar Comando
                using (SqlDataReader dataReader = await cmd.ExecuteReaderAsync())
                {
                    //Navegar en el Conjunto de Datos Recuperados
                    while (dataReader.Read())
                    {
                        curobj = new escalaNotas();

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobj.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Description"))) { curobj.Description = (string)(dataReader.GetValue(dataReader.GetOrdinal("Description"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Valor"))) { curobj.Valor = (int)(dataReader.GetValue(dataReader.GetOrdinal("Valor"))); }
                        
                        lobjs.Add(curobj);
                    }
                }


                if (conn.State == System.Data.ConnectionState.Open)
                    conn.Close();
            }
        }
        catch (Exception ex)
        {
            lobjs = new List<escalaNotas>();
            curobj = new escalaNotas();
            curobj.Id = 0;
            curobj.Description = System.Convert.ToString(ex.Message);

            lobjs.Add(curobj);
        }

        return lobjs;

    }

}

public class escalaNotas
{
    public long Id { get; set; }
    public string Description { get; set; }
    public int Valor { get; set; }
}


