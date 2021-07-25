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

class CargoDA
{
    public string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);

    public async Task<List<Cargo>> fnGetCargoList()
    {
        List<Cargo> lobjs = new List<Cargo>();
        Cargo obj;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();
            SqlCommand cmd = new SqlCommand("ssoma.sp_cargo_list", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                while (dr.Read())
                {
                    obj = new Cargo();
                    obj.Id = (int)(dr.GetValue(dr.GetOrdinal("Id")));
                    obj.Description = (string)(dr.GetValue(dr.GetOrdinal("Description")));
                    obj.Sede = (int)(dr.GetValue(dr.GetOrdinal("Sede")));
                    lobjs.Add(obj);
                }
        }
        return lobjs;
    }

}

public class Cargo
{
    public int Id { get; set; }
    public string Description { get; set; }
    public int Sede { get; set; }
}
