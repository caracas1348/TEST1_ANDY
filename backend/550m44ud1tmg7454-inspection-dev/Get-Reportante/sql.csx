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

    public async Task<List<Parametrica>> fnGetParametricaList(ILogger log, int TipoObservacion, long Sede, long Embarcacion, string Reportante, string FechaInicio, string FechaFin)
    {
        List<Parametrica> lobjs = new List<Parametrica>();
        Parametrica obj;

        log.LogInformation("En fnGetParametricaList.");

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();
            log.LogInformation("Antes de ssoma.sp_reportante_list.");
            SqlCommand cmd = new SqlCommand("ssoma.sp_reportante_list", conn);

            cmd.Parameters.AddWithValue("@TipoObservacion", TipoObservacion);
            cmd.Parameters.AddWithValue("@Sede", Sede);
            cmd.Parameters.AddWithValue("@Embarcacion", Embarcacion);
            cmd.Parameters.AddWithValue("@Reportante", Reportante);
            cmd.Parameters.AddWithValue("@FechaInicio", FechaInicio);
            cmd.Parameters.AddWithValue("@FechaFin", FechaFin);

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
