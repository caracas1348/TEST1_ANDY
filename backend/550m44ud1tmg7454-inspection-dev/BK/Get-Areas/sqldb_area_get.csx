using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataAccessArea
{
    public List<Area> funGetAreaList(ILogger log, int vnid
                                                , string vvdescription
                                                , int vnunidad_negocio_id
                                                , int? vnactive) 
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);

        List<Area> lobjs = new List<Area>();
        Area curobj;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("sp_area_get", conn);

            cmd.CommandType = CommandType.StoredProcedure;

            //cmd.Parameters.Add(new SqlParameter("@CustomerID", custId));

            using (SqlDataReader dataReader = cmd.ExecuteReader())
            {
                while (dataReader.Read())
                {
                    log.LogInformation("Ejecutado y momento de recuperar las variables");
                    curobj = new Area();
                    curobj.Id = (int)(dataReader.GetValue(0));
                    if (!dataReader.IsDBNull(1)) { curobj.Description = (string)(dataReader.GetValue(1)); }
                    if (!dataReader.IsDBNull(2)) { curobj.UnidadNegocioId = (int)(dataReader.GetValue(2)); }
                    if (!dataReader.IsDBNull(3)) { curobj.Active = (int)(dataReader.GetValue(3)); }

                    lobjs.Add(curobj);
                }
            }
        }
        return lobjs;


    }

}

public class Area 
{
    public int Id {get;set;}
    public string Description {get;set;}
    public int UnidadNegocioId {get;set;}
    public int Active {get;set;}
}
