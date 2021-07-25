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

class MaquinaEquipoDA
{
    public string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);

    public async Task<List<MaquinaEquipo>> fnGetMaquinaEquipoList()
    {
        List<MaquinaEquipo> lobjs = new List<MaquinaEquipo>();
        MaquinaEquipo obj;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();
            SqlCommand cmd = new SqlCommand("ssoma.sp_maquinarias_equipos_list", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                while (dr.Read())
                {
                    obj = new MaquinaEquipo();
                    obj.Id = (long)(dr.GetValue(dr.GetOrdinal("Id")));
                    obj.Description = (string)(dr.GetValue(dr.GetOrdinal("Descripcion")));
                    lobjs.Add(obj);
                }
        }
        return lobjs;
    }

}

public class MaquinaEquipo
{
    public long Id { get; set; }
    public string Description { get; set; }

}
