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

class AreaDA
{
    public string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);

    public async Task<List<Area>> fnGetAreaList()
    {
        List<Area> lobjs = new List<Area>();
        Area obj;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();
            SqlCommand cmd = new SqlCommand("ssoma.sp_area_list", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                while (dr.Read())
                {
                    obj = new Area();
                    obj.Id = (long)(dr.GetValue(dr.GetOrdinal("Id")));
                    obj.Description = (string)(dr.GetValue(dr.GetOrdinal("Description")));
                    obj.UnidadNegocioId = (long)(dr.GetValue(dr.GetOrdinal("UnidadNegocioId")));
                    lobjs.Add(obj);
                }
        }
        return lobjs;
    }

}

public class Area
{
    public long Id { get; set; }
    public string Description { get; set; }
    public long UnidadNegocioId { get; set; }
}
