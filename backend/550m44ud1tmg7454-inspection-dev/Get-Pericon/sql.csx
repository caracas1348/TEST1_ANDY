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

    public async Task<List<Pericon>> fnGetPericonList()
    {
        List<Pericon> lobjs = new List<Pericon>();
        Pericon obj;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();
            SqlCommand cmd = new SqlCommand("ssoma.sp_pericon_list", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                while (dr.Read())
                {
                    obj = new Pericon();
                    obj.Id = (int)(dr.GetValue(dr.GetOrdinal("Id")));
                    obj.Peligro = (string)(dr.GetValue(dr.GetOrdinal("Peligro")));
                    obj.Riesgo = (string)(dr.GetValue(dr.GetOrdinal("Riesgo")));
                    obj.Consecuencia = (string)(dr.GetValue(dr.GetOrdinal("Consecuencia")));
                    obj.Severidad = (int)(dr.GetValue(dr.GetOrdinal("Severidad")));
                    obj.Active = (int)(dr.GetValue(dr.GetOrdinal("Active")));

                    lobjs.Add(obj);
                }
        }
        return lobjs;
    }

}

public class Pericon
{
    public int Id { get; set; }
    public string Peligro { get; set; }
    public string Riesgo { get; set; }
    public string Consecuencia { get; set; }
    public int Severidad { get; set; }
    public int Active { get; set; }

}
