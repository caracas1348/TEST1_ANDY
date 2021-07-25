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

class HistorialModificacionDA
{
    public string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);

    public async Task<List<HistorialModificacion>> fnGetHistorialModificacionList(long Iperc)
    {
        List<HistorialModificacion> lobjs = new List<HistorialModificacion>();
        HistorialModificacion obj;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();
            SqlCommand cmd = new SqlCommand("ssoma.sp_historial_modificaciones_lista", conn);
            cmd.Parameters.AddWithValue("@Iperc", Iperc);
            cmd.CommandType = CommandType.StoredProcedure;

            using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                while (dr.Read())
                {
                    obj = new HistorialModificacion();
                    obj.Id = (int)(dr.GetValue(dr.GetOrdinal("Id")));
                    obj.Iperc = (long)(dr.GetValue(dr.GetOrdinal("IPERC")));

                    if (!dr.IsDBNull(dr.GetOrdinal("Ubicacion")))
                    obj.Ubicacion = (string)(dr.GetValue(dr.GetOrdinal("Ubicacion")));

                    if (!dr.IsDBNull(dr.GetOrdinal("Campo")))
                    obj.Campo = (string)(dr.GetValue(dr.GetOrdinal("Campo")));

                    if (!dr.IsDBNull(dr.GetOrdinal("Tipo")))
                    obj.Tipo = (int)(dr.GetValue(dr.GetOrdinal("Tipo")));

                    if (!dr.IsDBNull(dr.GetOrdinal("Dato_Inicial")))
                    obj.Dato_Inicial = (string)(dr.GetValue(dr.GetOrdinal("Dato_Inicial")));

                    if (!dr.IsDBNull(dr.GetOrdinal("Dato_Actual")))
                    obj.Dato_Actual = (string)(dr.GetValue(dr.GetOrdinal("Dato_Actual")));

                    if (!dr.IsDBNull(dr.GetOrdinal("Fecha_Creacion")))
                    obj.Fecha_Creacion = (string)(dr.GetValue(dr.GetOrdinal("Fecha_Creacion")));

                    if (!dr.IsDBNull(dr.GetOrdinal("Created_By")))
                    obj.Created_By = (string)(dr.GetValue(dr.GetOrdinal("Created_By")));

                    if (!dr.IsDBNull(dr.GetOrdinal("Nombre_Usuario")))
                    obj.Nombre_Usuario = (string)(dr.GetValue(dr.GetOrdinal("Nombre_Usuario")));

                    lobjs.Add(obj);
                }
        }
        return lobjs;
    }

}

public class HistorialModificacion
{
    public int Id { get; set; }
    public long Iperc { get; set; }
    public string Ubicacion { get; set; }
    public string Campo { get; set; }
    public int Tipo { get; set; }
    public string Dato_Inicial { get; set; }
    public string Dato_Actual { get; set; }
    public string Fecha_Creacion { get; set; }
    public string Created_By { get; set; }
    public string Nombre_Usuario { get; set; }
}
