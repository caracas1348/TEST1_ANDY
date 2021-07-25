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

        SqlDataReader dataReader;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            var textselect = "SELECT ";
            textselect = textselect + " a.Id, ";
            textselect = textselect + " a.Description, ";
            textselect = textselect + " a.UnidadNegocioId, ";
            textselect = textselect + " a.Active ";
            //
            textselect = textselect + "FROM ssoma.Area a ";
            textselect = textselect + " WHERE 1=1 ";
            if (vnid != 0) {
                textselect = textselect + String.Format(" AND a.[Id] = {0}",vnid);
            }
            if (vvdescription != null) {
                textselect = textselect + String.Format(" AND a.[Description] = {0}",vvdescription);
            }
            if (vnunidad_negocio_id > 0) {
                textselect = textselect + String.Format(" AND a.[UnidadNegocioId] = {0}",vnunidad_negocio_id);
            }
            if (vnactive > 0) {
                textselect = textselect + String.Format(" AND a.[Active] = {0}",vnactive);
            }

            var StrQuery = textselect;

            log.LogInformation("StrQuery:"+StrQuery);

            using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
            {
                using (dataReader = cmd.ExecuteReader())
                {
                    while (dataReader.Read())
                    {
                        log.LogInformation("Ejecutado y momento de recuperar las variables");
                        curobj = new Area();
                        curobj.Id = (long)(dataReader.GetValue(0));
                        if (!dataReader.IsDBNull(1)){ curobj.Description = (string)(dataReader.GetValue(1)); }
                        if (!dataReader.IsDBNull(2)){ curobj.UnidadNegocioId = (long)(dataReader.GetValue(2)); }
                        if (!dataReader.IsDBNull(3)){ curobj.Active = (int)(dataReader.GetValue(3)); }

                        lobjs.Add(curobj);
                    }
                }
            }
            conn.Close();
            return lobjs;
        }
    }

}

public class Area
{
    public long Id {get;set;}
    public string Description {get;set;}
    public long UnidadNegocioId {get;set;}
    public int Active {get;set;}
}
