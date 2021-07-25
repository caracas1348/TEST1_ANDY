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

class SubprocesoDA
{
    public string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);

    public async Task<List<Subproceso>> fnGetSubProcesoList(long Proceso)
    {
        List<Subproceso> lobjs = new List<Subproceso>();
        Subproceso obj;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();
            SqlCommand cmd = new SqlCommand("ssoma.sp_subproceso_list", conn);
            cmd.Parameters.AddWithValue("@ProcesoId", Proceso);
            cmd.CommandType = CommandType.StoredProcedure;

            using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                while (dr.Read())
                {
                    obj = new Subproceso();
                    obj.Id = (long)(dr.GetValue(dr.GetOrdinal("Id")));
                    obj.Proceso = (long)(dr.GetValue(dr.GetOrdinal("Proceso")));
                    obj.Description = (string)(dr.GetValue(dr.GetOrdinal("Descripcion")));
                    obj.Code = (string)(dr.GetValue(dr.GetOrdinal("Code")));
                    lobjs.Add(obj);
                }
        }
        return lobjs;
    }

}

public class Subproceso
{
    public long Id { get; set; }
    public long Proceso { get; set; }
    public string Description { get; set; }
    public string Code { get; set; }
}
