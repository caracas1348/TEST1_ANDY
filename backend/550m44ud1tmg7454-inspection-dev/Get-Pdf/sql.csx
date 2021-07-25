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

class SeguimientoDA
{
    public string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);
    //public string vvsqlconnectionString = "Data Source=srv-db-east-us009.database.windows.net;Initial Catalog=db_ssoma_audit_mng_dev;User ID=userdbowner;Password=$P4ssdbowner01#;";

    public async Task<Archivo> fnGetSeguimientoInforme(long Id)
    {
        Archivo obj = new Archivo();
        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();

                SqlCommand cmd = new SqlCommand("ssoma.get_seguimiento_observacion_informe", conn);
                cmd.Parameters.AddWithValue("@Id", Id);

                cmd.CommandType = CommandType.StoredProcedure;

                using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                {
                    while (dr.Read())
                    {
                        obj.Id = Id;
                        obj.Informe = (string)(dr.GetValue(dr.GetOrdinal("Informe")));
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("fallo");
        }
        return obj;

    }

}

public class Archivo
{
    public long Id { get; set; }
    public string Informe { get; set; }
}

