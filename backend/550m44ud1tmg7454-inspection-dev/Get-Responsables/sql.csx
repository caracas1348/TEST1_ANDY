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

class IpercResponsableDA
{
    public string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);

    public async Task<List<IpercResponsable>> fnGetIpercResponsableList(long Iperc)
    {
        List<IpercResponsable> lobjs = new List<IpercResponsable>();
        IpercResponsable obj;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();
            SqlCommand cmd = new SqlCommand("ssoma.sp_iperc_responsables_list", conn);
            cmd.Parameters.AddWithValue("@Iperc", Iperc);
            cmd.CommandType = CommandType.StoredProcedure;

            using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                while (dr.Read())
                {
                    obj = new IpercResponsable();
                    obj.Id = (int)(dr.GetValue(dr.GetOrdinal("Id")));
                    obj.Iperc = (long)(dr.GetValue(dr.GetOrdinal("IPERC")));
                    obj.Nombres = (string)(dr.GetValue(dr.GetOrdinal("Nombres")));
                    obj.Cargo = (string)(dr.GetValue(dr.GetOrdinal("Cargo")));
                    obj.Correo = (string)(dr.GetValue(dr.GetOrdinal("Correo")));
                    obj.IdentityDocument = (string)(dr.GetValue(dr.GetOrdinal("IdentityDocument")));
                    obj.HashId = (string)(dr.GetValue(dr.GetOrdinal("HashId")));
                    obj.Firma = (string)(dr.GetValue(dr.GetOrdinal("Firma")));
                    obj.Active = (int)(dr.GetValue(dr.GetOrdinal("Active")));
                    obj.Main = (int)(dr.GetValue(dr.GetOrdinal("Main")));

                    lobjs.Add(obj);
                }
        }
        return lobjs;
    }

}

public class IpercResponsable
{
    public int Id { get; set; }
    public long Iperc { get; set; }
    public string Nombres { get; set; }
    public string Cargo { get; set; }
    public string Correo { get; set; }
    public string IdentityDocument { get; set; }
    public string HashId { get; set; }
    public string Firma { get; set; }
    public int Active { get; set; }
    public int Main { get; set; }

    public long IdResponsable { get; set; }

    public string Fecha_Creacion { get; set; }
    public string Created_By { get; set; }
    public string Fecha_Actualizacion { get; set; }
    public string Updated_By { get; set; }

}
