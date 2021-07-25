using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataAuditorAll
{
    public long funDeleteAll(ILogger log, int curid)
    {

        //var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
        var vvsqlconnectionString = "Data Source=srv-db-east-us009.database.windows.net;Initial Catalog=db_ssoma_audit_mng_dev;User ID=userdbowner;Password=$P4ssdbowner01#;";

        //Lista de Objetos
        long vnupdaterows = 0;
        DateTime Deleted_Date = DateTime.Now;

        //SQL Objects

        try
        {

            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();

                //Start - Manejo de Parametros
                var StrQuery = "UPDATE [auditoria].[Capacitacion] ";
                StrQuery += " SET Active = 0 ";
                StrQuery += " WHERE id = @vncurid  ";

                //End - Manejo de Parametros

                log.LogInformation("StrQuery:" + StrQuery);

                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    cmd.Parameters.AddWithValue("@vncurid", curid);

                    //cmd.Parameters.AddWithValue("@vvdeletedby", deletedby);

                    var modified = cmd.ExecuteNonQuery();
                    vnupdaterows = Convert.ToInt64(modified);
                    log.LogInformation("DELETE:" + modified);
                    log.LogInformation("DELETE row:" + vnupdaterows);
                }


                if (conn.State == System.Data.ConnectionState.Open)
                    conn.Close();

                return vnupdaterows;

            }

        }
        catch (Exception ex)
        {
            vnupdaterows = 0;
        }
        return vnupdaterows;
    }
}

