using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataAccessOptionResponseGet
{
    public List<OptionResponse> funGetOptionResponseList(ILogger log, long vnid
                                                , long vnitem_response_id
                                                , int vnitem_option_id
                                                , string vvoption_description) 
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);

        List<OptionResponse> lobjs = new List<OptionResponse>();
        OptionResponse curobj;

        SqlDataReader dataReader;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString)) 
        {
            conn.Open();

            var textselect = "SELECT ";
            textselect = textselect + " o.Id, ";
            textselect = textselect + " o.ItemResponseId, ";
            textselect = textselect + " o.ItemOptionId, ";
            textselect = textselect + " o.OptionDescription, ";

            textselect = textselect + " o.Created_By, ";
            textselect = textselect + " o.Created_Date, ";
            textselect = textselect + " o.Last_Updated_By, ";
            textselect = textselect + " o.Last_Updated_Date, ";
            textselect = textselect + " o.Text ";
            //
            textselect = textselect + "FROM ssoma.OptionResponse o ";
            textselect = textselect + "WHERE 1=1 ";
            if (vnid != 0) {
                textselect = textselect + String.Format(" AND o.[Id] = {0}",vnid);
            }
            if (vnitem_response_id > 0) {
                textselect = textselect + String.Format(" AND o.[ItemResponseId] = {0} ",vnitem_response_id);
            }
            if (vnitem_option_id > 0) {
                textselect = textselect + String.Format(" AND o.[ItemOptionId] = {0} ",vnitem_option_id);
            }
            if (vvoption_description != null) {
                textselect = textselect + String.Format(" AND o.[OptionDescription] = '{0}' ",vvoption_description);
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
                        curobj = new OptionResponse();
                        curobj.Id = (long)(dataReader.GetValue(0));
                        if (!dataReader.IsDBNull(1)){ curobj.ItemResponseId = (long)(dataReader.GetValue(1)); }
                        if (!dataReader.IsDBNull(2)){ curobj.ItemOptionId = (int)(dataReader.GetValue(2)); }
                        if (!dataReader.IsDBNull(3)){ curobj.OptionDescription = (string)(dataReader.GetValue(3)); }

                        if (!dataReader.IsDBNull(4)){ curobj.Created_By = (string)(dataReader.GetValue(4)); }
                        if (!dataReader.IsDBNull(5)){ curobj.Created_Date = (DateTime)(dataReader.GetValue(5)); }
                        if (!dataReader.IsDBNull(6)){ curobj.Last_Updated_By = (string)(dataReader.GetValue(6)); }
                        if (!dataReader.IsDBNull(7)){ curobj.Last_Updated_Date = (DateTime)(dataReader.GetValue(7)); }
                        if (!dataReader.IsDBNull(8)){ curobj.Text = (string)(dataReader.GetValue(8)); }

                        lobjs.Add(curobj);
                    }
                }
            }
            conn.Close();
            return lobjs;
        }
    }

    public OptionResponse funGetOptionResponse(ILogger log, long vnid) 
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);

        OptionResponse curobj = new OptionResponse();

        SqlDataReader dataReader;

        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString)) 
            {
                conn.Open();

                var textselect = "SELECT ";
                textselect = textselect + " o.Id, ";
                textselect = textselect + " o.ItemResponseId, ";
                textselect = textselect + " o.ItemOptionId, ";
                textselect = textselect + " o.OptionDescription, ";

                textselect = textselect + " o.Created_By, ";
                textselect = textselect + " o.Created_Date, ";
                textselect = textselect + " o.Last_Updated_By, ";
                textselect = textselect + " o.Last_Updated_Date, ";
                textselect = textselect + " o.Text ";
                //
                textselect = textselect + "FROM ssoma.OptionResponse o ";
                textselect = textselect + "WHERE 1=1 ";
                
                if (vnid > 0) {
                    textselect = textselect + String.Format(" AND o.[Id] = {0}",vnid);
                }

                var StrQuery = textselect;

                log.LogInformation("StrQuery:"+StrQuery);

                using (SqlCommand cmd = new SqlCommand(StrQuery, conn)) 
                {
                    using (dataReader = cmd.ExecuteReader()) 
                    {
                        while (dataReader.Read())
                        {
                            
                            curobj.Id = (long)(dataReader.GetValue(0));
                            if (!dataReader.IsDBNull(1)){ curobj.ItemResponseId = (long)(dataReader.GetValue(1)); }
                            if (!dataReader.IsDBNull(2)){ curobj.ItemOptionId = (int)(dataReader.GetValue(2)); }
                            if (!dataReader.IsDBNull(3)){ curobj.OptionDescription = (string)(dataReader.GetValue(3)); }

                            if (!dataReader.IsDBNull(4)){ curobj.Created_By = (string)(dataReader.GetValue(4)); }
                            if (!dataReader.IsDBNull(5)){ curobj.Created_Date = (DateTime)(dataReader.GetValue(5)); }
                            if (!dataReader.IsDBNull(6)){ curobj.Last_Updated_By = (string)(dataReader.GetValue(6)); }
                            if (!dataReader.IsDBNull(7)){ curobj.Last_Updated_Date = (DateTime)(dataReader.GetValue(7)); }
                            if (!dataReader.IsDBNull(8)){ curobj.Text = (string)(dataReader.GetValue(8)); }

                        }
                    }
                }
                conn.Close();
                //return curobj;
            }
        }
        catch (Exception ex)
        {

        }

        return curobj;
    }
}


public class OptionResponse 
{
    public long Id {get;set;}
    public long ItemResponseId {get;set;}
    public int ItemOptionId {get;set;}
    public string OptionDescription {get;set;}
    public string Created_By {get;set;}
    public DateTime Created_Date {get;set;}
    public string Last_Updated_By {get;set;}
    public DateTime Last_Updated_Date {get;set;}
    public string Text {get; set;}
}
