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

 string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);

    public async Task<EvidenciaPost> funPostSeguimientoEvidencia(ILogger log, EvidenciaPost curentity)
    {
        log.LogInformation("En funPostSeguimientoEvidencia." );

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("[ssoma].[post_pacientes]", conn);
            
            cmd.Parameters.AddWithValue("@acciones",              curentity.acciones);
            cmd.Parameters.AddWithValue("@PacientesID",           curentity.PacientesID);
            cmd.Parameters.AddWithValue("@name_complete",         curentity.name_complete);
            cmd.Parameters.AddWithValue("@DNI",                   curentity.DNI);
            cmd.Parameters.AddWithValue("@name_complete_family",  curentity.name_complete_family);
            cmd.Parameters.AddWithValue("@dni_family",            curentity.dni_family);
            cmd.Parameters.AddWithValue("@phone",                 curentity.phone);
            cmd.Parameters.AddWithValue("@email",                 curentity.email);
            cmd.Parameters.AddWithValue("@address",               curentity.address);
            cmd.Parameters.AddWithValue("@conditions_health",     curentity.conditions_health);            

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();
            if (conn.State == System.Data.ConnectionState.Open)
                conn.Close();
        }

        return curentity;
    }

}

public class EvidenciaPost
{
    public long acciones                { get; set; }
    public long PacientesID             { get; set; }    
    public string name_complete         { get; set; }
    public long DNI                     { get; set; }
    public string name_complete_family  { get; set; }
    public long dni_family              { get; set; }
    public string phone                 { get; set; }
    public string email                 { get; set; }
    public string address               { get; set; }
    public string conditions_health     { get; set; }
}