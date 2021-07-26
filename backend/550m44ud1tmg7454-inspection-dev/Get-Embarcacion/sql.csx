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

class EmbarcacionDA
{
    public string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);

    public async Task<List<Embarcacion>> fnGetEmbarcacionList()
    {
        List<Embarcacion> lobjs = new List<Embarcacion>();
        Embarcacion obj;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();
            SqlCommand cmd = new SqlCommand("ssoma.sp_embarcacion_list", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                while (dr.Read())
                {
                    obj = new Embarcacion();
                    obj.Id = (long)(dr.GetValue(dr.GetOrdinal("Id")));
                    obj.Description = (string)(dr.GetValue(dr.GetOrdinal("Description")));
                    obj.UnidadNegocioId = (long)(dr.GetValue(dr.GetOrdinal("UnidadNegocioId")));
                    obj.UnidadNegocioSubId = (long)(dr.GetValue(dr.GetOrdinal("UnidadNegocioSubId")));
                    obj.id_location_sap = (long)(dr.GetValue(dr.GetOrdinal("id_location_sap")));
                    lobjs.Add(obj);
                }
        }
        return lobjs;
    }

}

public class Embarcacion
{
    public long Id { get; set; }
    public string Description { get; set; }
    public long UnidadNegocioId { get; set; }
    public long UnidadNegocioSubId { get; set; }
    public long id_location_sap { get; set; }
}