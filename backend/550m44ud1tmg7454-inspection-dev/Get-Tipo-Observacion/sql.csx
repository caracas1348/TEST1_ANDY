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

class TipoObservacionDA
{
    public string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);

    public async Task<List<TipoObservacion>> fnGetTipoObservacionList()
    {
        List<TipoObservacion> lobjs = new List<TipoObservacion>();
        TipoObservacion obj;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();
            SqlCommand cmd = new SqlCommand("ssoma.sp_tipo_observacion_list", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                while (dr.Read())
                {
                    obj = new TipoObservacion();
                    obj.Id = (int)(dr.GetValue(dr.GetOrdinal("Id")));
                    obj.Description = (string)(dr.GetValue(dr.GetOrdinal("Description")));
                    lobjs.Add(obj);
                }
        }
        return lobjs;
    }

}

public class TipoObservacion
{
    public int Id { get; set; }
    public string Description { get; set; }
}
