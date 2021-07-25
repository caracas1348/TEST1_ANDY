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

class PericonDA
{
    public string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);
    //public string vvsqlconnectionString = "Data Source=srv-db-east-us009.database.windows.net;Initial Catalog=db_ssoma_audit_mng_dev;User ID=userdbowner;Password=$P4ssdbowner01#;";

    public async Task<Pericon> fnPostPericon(ILogger log, Pericon entity)
    {
        entity.Id = 0;
        log.LogInformation("en fnPostPericon");
        try{
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("ssoma.sp_post_pericon", conn);
            
            cmd.Parameters.AddWithValue("@IdPericon", entity.IdPericon);
            cmd.Parameters.AddWithValue("@Peligro", entity.Peligro);
            cmd.Parameters.AddWithValue("@Riesgo", entity.Riesgo);
            cmd.Parameters.AddWithValue("@Consecuencia", entity.Consecuencia);
            cmd.Parameters.AddWithValue("@Severidad", entity.Severidad);

            cmd.Parameters.AddWithValue("@Fecha_Creacion", DateTime.Now);
            cmd.Parameters.AddWithValue("@Fecha_Actualizacion", DateTime.Now);
            cmd.Parameters.AddWithValue("@Created_By", entity.Created_By);
            cmd.Parameters.AddWithValue("@Updated_By", entity.Updated_By);
            cmd.Parameters.AddWithValue("@Active", entity.Active);


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
        }
        catch (Exception ex)
        {
            log.LogInformation("CATCH:"+(string)ex.Message );            
        }
        log.LogInformation("entity.Id -> "+entity.Id);

        return entity;
    }

}



public class Pericon
{
    public long Id { get; set; }
    public string Peligro { get; set; }
    public string Riesgo { get; set; }
    public string Consecuencia { get; set; }
    
    public int Severidad { get; set; }
    public int Active { get; set; }
    public string Fecha_Creacion { get; set; }
    public string Created_By { get; set; }
    public string Fecha_Actualizacion { get; set; }
    public string Updated_By { get; set; }

    public long IdPericon { get; set; }

    public bool Editar { get; set; }
    public bool Ver { get; set; }
    public bool Eliminar { get; set; }
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
