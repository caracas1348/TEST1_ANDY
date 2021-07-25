using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataPreguntasEvaluacionAll
{
    string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
    
    public async Task<List<preguntasEvaluacion>> funGetPreguntasEvaluacionAllList(ILogger log, long GrupoPreguntaId, long EvaluacionAuditoresId)
    {
        //Lista de Objetos
        List<preguntasEvaluacion> lobjs = new List<preguntasEvaluacion>();
        preguntasEvaluacion curobj      = new preguntasEvaluacion();

        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();

                SqlCommand cmd = new SqlCommand("[auditoria].get_preguntas_evaluacion_auditores", conn);
                cmd.Parameters.AddWithValue("@ListaEvaluacionId", EvaluacionAuditoresId);
                cmd.Parameters.AddWithValue("@GrupoPreguntaId", GrupoPreguntaId);

                cmd.CommandType = CommandType.StoredProcedure;
                //Ejecutar Comando
                using (SqlDataReader dataReader = await cmd.ExecuteReaderAsync())
                {
                    //Navegar en el Conjunto de Datos Recuperados
                    while (dataReader.Read())
                    {
                        curobj = new preguntasEvaluacion();

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobj.Id                           = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Description"))) { curobj.Description         = (string)(dataReader.GetValue(dataReader.GetOrdinal("Description"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Item"))) { curobj.Item                       = (string)(dataReader.GetValue(dataReader.GetOrdinal("Item"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Nota"))) { curobj.Nota                       = (int)(dataReader.GetValue(dataReader.GetOrdinal("Nota"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("DescriptionNota"))) { curobj.DescriptionNota = (string)(dataReader.GetValue(dataReader.GetOrdinal("DescriptionNota"))); }


                        lobjs.Add(curobj);
                    }
                }




                if (conn.State == System.Data.ConnectionState.Open)
                    conn.Close();
            }
        }
        catch (Exception ex)
        {
            lobjs              = new List<preguntasEvaluacion>();
            curobj             = new preguntasEvaluacion();
            curobj.Id          = 0;
            curobj.Description = System.Convert.ToString(ex.Message);

            lobjs.Add(curobj);
        }

        return lobjs;

    }

}

public class preguntasEvaluacion
{
    public long Id { get; set; }
    public string Description { get; set; }
    public string Item { get; set; }
    public int Nota { get; set; }
    public string DescriptionNota { get; set; }
}


