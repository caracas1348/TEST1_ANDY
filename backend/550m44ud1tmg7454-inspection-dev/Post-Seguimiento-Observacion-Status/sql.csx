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

class SeguimientoDA
{
    public string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);
    //public string vvsqlconnectionString = "Data Source=srv-db-east-us009.database.windows.net;Initial Catalog=db_ssoma_audit_mng_dev;User ID=userdbowner;Password=$P4ssdbowner01#;";

    public async Task<int> fnPutSeguimientoStatus(Seguimiento entity)
    {
        int rows = 0;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("ssoma.sp_seguimiento_observacion_update_estado", conn);

            cmd.Parameters.AddWithValue("@Id", entity.Id);
            cmd.Parameters.AddWithValue("@Estado", entity.Estado);
            cmd.Parameters.AddWithValue("@Fecha_Actualizacion", DateTime.Now);
            cmd.Parameters.AddWithValue("@Updated_By", entity.Updated_By);

            SqlParameter output_Id = new SqlParameter("@rows", SqlDbType.Int);
            output_Id.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                rows = Convert.ToInt16(output_Id.Value);
            }
        }
        return rows;
    }


}


public class Seguimiento
{
    public int Id { get; set; }
    public int Estado { get; set; }
    public string Updated_By { get; set; }
}

public class Response
{
    public Boolean status { get; set; }
    public string message { get; set; }
}

