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

class AlcanceDA
{
    public string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);

    public async Task<List<Alcance>> fnGetAlcanceList(long UnidadNegocio)
    {
        List<Alcance> lobjs = new List<Alcance>();
        Alcance obj;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();
            SqlCommand cmd = new SqlCommand("ssoma.sp_alcance_list", conn);
            cmd.Parameters.AddWithValue("@Unidad_Negocio", UnidadNegocio);
            cmd.CommandType = CommandType.StoredProcedure;

            using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                while (dr.Read())
                {
                    obj = new Alcance();
                    obj.Id = (long)(dr.GetValue(dr.GetOrdinal("Id")));
                    obj.Unidad_Negocio = (long)(dr.GetValue(dr.GetOrdinal("Unidad_Negocio")));
                    obj.Description = (string)(dr.GetValue(dr.GetOrdinal("Descripcion")));
                    lobjs.Add(obj);
                }
        }
        return lobjs;
    }

}

public class Alcance
{
    public long Id { get; set; }
    public string Description{ get; set; }
    public long Unidad_Negocio { get; set; }
}
