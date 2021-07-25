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

class ParametricaDA
{
    public string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);

    public async Task<List<Parametrica>> fnGetParametricaList()
    {
        List<Parametrica> lobjs = new List<Parametrica>();
        Parametrica obj;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();
            SqlCommand cmd = new SqlCommand("ssoma.sp_parametrica_list", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                while (dr.Read())
                {
                    obj = new Parametrica();
                    obj.Id = (string)(dr.GetValue(dr.GetOrdinal("Id")));
                    obj.Description = (string)(dr.GetValue(dr.GetOrdinal("Description")));
                    obj.Tipo = (string)(dr.GetValue(dr.GetOrdinal("Tipo")));
                    lobjs.Add(obj);
                }
        }
        return lobjs;
    }

}

public class Parametrica
{
    public string Id { get; set; }
    public string Description { get; set; }
    public string Tipo { get; set; }
}
