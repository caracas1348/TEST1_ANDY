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

class ProcesoDA
{
    public string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);

    public async Task<List<Proceso>> fnGetProcesoList()
    {
        List<Proceso> lobjs = new List<Proceso>();
        Proceso obj;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();
            SqlCommand cmd = new SqlCommand("ssoma.sp_proceso_list", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                while (dr.Read())
                {
                    obj = new Proceso();
                    obj.Id = (long)(dr.GetValue(dr.GetOrdinal("Id")));
                    obj.Description = (string)(dr.GetValue(dr.GetOrdinal("Description")));
                    obj.Code = (string)(dr.GetValue(dr.GetOrdinal("Code")));
                    lobjs.Add(obj);
                }
        }
        return lobjs;
    }

}

public class Proceso
{
    public long Id { get; set; }
    public string Description { get; set; }
    public string Code { get; set; }
}
