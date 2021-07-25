using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataGrupoPreguntasAll 
{
    string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
    
    public async Task<List<grupoPreguntas>> funGetGrupoPreguntasAllList(ILogger log, long EvaluacionAuditoresId)
    {
        //Lista de Objetos
        List<grupoPreguntas> lobjs = new List<grupoPreguntas>();
        grupoPreguntas curobj = new grupoPreguntas();
        DataPreguntasEvaluacionAll sql_preguntasEvaluacion = new DataPreguntasEvaluacionAll();
        List<preguntasEvaluacion> lobj2;

        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();

                SqlCommand cmd = new SqlCommand("[auditoria].get_grupo_preguntas", conn);
                //cmd.Parameters.AddWithValue("@ListaEvaluacionId", 0);
                
                cmd.CommandType = CommandType.StoredProcedure;
                //Ejecutar Comando
                using (SqlDataReader dataReader = await cmd.ExecuteReaderAsync())
                {
                    //Navegar en el Conjunto de Datos Recuperados
                    while (dataReader.Read())
                    {
                        curobj = new grupoPreguntas();

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobj.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Description"))) { curobj.Description = (string)(dataReader.GetValue(dataReader.GetOrdinal("Description"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Icono"))) { curobj.Icono = (string)(dataReader.GetValue(dataReader.GetOrdinal("Icono"))); }
                        
                        lobj2 = new List<preguntasEvaluacion>();

                        lobj2 = await sql_preguntasEvaluacion.funGetPreguntasEvaluacionAllList(log, curobj.Id, EvaluacionAuditoresId);

                        curobj.preguntasEvaluacion = lobj2;

                        lobjs.Add(curobj);
                    }
                }

                if (conn.State == System.Data.ConnectionState.Open)
                    conn.Close();
            }
        }
        catch (Exception ex)
        {
            lobjs = new List<grupoPreguntas>();
            curobj = new grupoPreguntas();
            curobj.Id = 0;
            curobj.Description = System.Convert.ToString(ex.Message);
            
            lobjs.Add(curobj);
        }

        return lobjs;

    }

}

public class grupoPreguntas
{
    public long Id { get; set; }
    public string Description { get; set; }
    public string Icono { get; set; }
    public List<preguntasEvaluacion> preguntasEvaluacion { get; set; }
}


