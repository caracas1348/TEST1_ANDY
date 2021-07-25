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

class SendMailDA
{
    public string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);
    //public string vvsqlconnectionString = "Data Source=srv-db-east-us009.database.windows.net;Initial Catalog=db_ssoma_audit_mng_dev;User ID=userdbowner;Password=$P4ssdbowner01#;";


    public async Task<int> fnSeguimientoUpdateInforme(SeguimientoObs entity)
    {
        int rows = 0;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("ssoma.sp_seguimiento_observacion_update_informe", conn);

            cmd.Parameters.AddWithValue("@Id", entity.Id);
            cmd.Parameters.AddWithValue("@Informe", entity.Pdf);
            cmd.Parameters.AddWithValue("@Fecha_Actualizacion", DateTime.Now);
            cmd.Parameters.AddWithValue("@Updated_By", entity.Updated_By);

            SqlParameter outPutVal = new SqlParameter("@rows", SqlDbType.Int);
            outPutVal.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(outPutVal);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (outPutVal.Value != DBNull.Value) rows = Convert.ToInt16(outPutVal.Value);
        }
        return rows;
    }




    

    public async Task<string> fnGetCorreos(long idSE, string tipo)
    {
        string lstEmail = "";
        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();

                SqlCommand cmd = new SqlCommand("ssoma.sp_correo_list", conn);
                cmd.Parameters.AddWithValue("@Sede", idSE);
                cmd.Parameters.AddWithValue("@Tipo", tipo);

                cmd.CommandType = CommandType.StoredProcedure;

                using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                {
                    while (dr.Read())
                    {
                        Email obj = new Email();
                        obj.Correo = (string)(dr.GetValue(dr.GetOrdinal("Correo")));
                        lstEmail += obj.Correo + ", ";
                    }
                }
            }
        }
        catch (Exception ex)
        {

            Console.WriteLine("fallo");
        }
        return lstEmail;
    }








}


public class SeguimientoObs
{
    public int Tipo_Observacion { get; set; }
    public long Sede { get; set; }
    public long Embarcacion { get; set; }
    public long Area { get; set; }
    public long Zona { get; set; }
    public string Codigo_Reportante { get; set; }
    public string Nombres_Reportante { get; set; }
    public string Codigo_Reportado { get; set; }
    public string Nombres_Reportado { get; set; }
    public int Estado { get; set; }
    public string Created_By { get; set; }
    public string Updated_By { get; set; }
    public long Id { get; set; }
    public string Pdf { get; set; }
    public string Codigo { get; set; }
    public string Adjunto { get; set; }
    public DateTime Fecha_Operacion { get; set; }
    public string Hora_Operacion { get; set; }
    public string Correos { get; set; }
}


public class Response
{
    public Boolean status { get; set; }
    public string message { get; set; }
}


public class Email
{
    public string Correo { get; set; }
}
