using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataPlanAnualGetAll
{
    string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);

    public async Task<DataPlanAnual> funGetPlanAnualAllList( ILogger log, long DNI)
    {
        
        DataPlanAnual DataPlanAnual = new DataPlanAnual();     
        List<Pacientes> Pacientes = new List<Pacientes>();
        Pacientes obj;

        log.LogInformation("en la funcion funGetPlanAnualAllList "+vvsqlconnectionString);
        //SQL Objects
        try
        {
            log.LogInformation("try");
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                log.LogInformation("using");
                conn.Open();
                log.LogInformation(" abrimos la conexion a la base de datos");

                SqlCommand cmd = new SqlCommand("[ssoma].[get_pacientes]", conn);

                log.LogInformation("Ejecutamos procedimeinto almacenado");
                cmd.Parameters.AddWithValue("@dni", DNI);
                cmd.CommandType = CommandType.StoredProcedure;
                log.LogInformation("Ejecutamos CommandType");
                using (SqlDataReader dataReader = await cmd.ExecuteReaderAsync())
                {               
                   log.LogInformation("Entramos a ejecutar la consulta using (SqlDataReader dataReader = await cmd.ExecuteReaderAsync())");

                    while (dataReader.Read())
                    {
                        log.LogInformation(" while (dataReader.Read())");
                        obj = new Pacientes();
                        obj.PacientesID = (int)(dr.GetValue(dr.GetOrdinal("PacientesID")));
                        obj.name_complete = (string)(dr.GetValue(dr.GetOrdinal("name_complete")));
                        obj.DNI = (int)(dr.GetValue(dr.GetOrdinal("DNI")));
                        obj.name_complete_family = (string)(dr.GetValue(dr.GetOrdinal("name_complete_family")));
                        obj.dni_family = (int)(dr.GetValue(dr.GetOrdinal("dni_family")));
                        obj.phone = (int)(dr.GetValue(dr.GetOrdinal("phone")));
                        obj.email = (string)(dr.GetValue(dr.GetOrdinal("email")));
                        obj.address = (string)(dr.GetValue(dr.GetOrdinal("address")));
                        obj.conditions_health = (string)(dr.GetValue(dr.GetOrdinal("conditions_health")));
                        Pacientes.Add(obj);
                    }
                    DataPlanAnual.Eventos = Eventos;
                    log.LogInformation("DataPlanAnual.Pacientes");                     
                }

                if (conn.State == System.Data.ConnectionState.Open)
                    conn.Close();
            }
        }
        catch (Exception ex)
        {
            

        }

        return DataPlanAnual;
    }    
}
public class Pacientes
{
    public int PacientesID{get; set;}
    public string name_complete{get; set;}
    public int DNI{get; set;}
    public string name_complete_family{get; set;}
    public int dni_family{get; set;}
    public int phone{get; set;}
    public string email{get; set;}
    public string address{get; set;}
    public string conditions_health{get; set;}
}


