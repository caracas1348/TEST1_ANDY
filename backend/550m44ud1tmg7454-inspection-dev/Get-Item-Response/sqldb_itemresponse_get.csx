using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataAccessItemResponseGet
{
    public List<ItemResponse> funGetItemResponseList(ILogger log, long vnid
                                                , long vnquestion_response_id
                                                , int vnquestion_item_id
                                                , string vvitem_description
                                                , int vntype_object_id
                                                , string vvjustify) 
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);

        List<ItemResponse> lobjs = new List<ItemResponse>();
        ItemResponse curobj;

        SqlDataReader dataReader;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString)) 
        {
            conn.Open();

            var textselect = "SELECT ";
            textselect = textselect + " i.Id, ";
            textselect = textselect + " i.QuestionResponseId, ";
            textselect = textselect + " i.QuestionItemId, ";
            textselect = textselect + " i.ItemDescription, ";
            textselect = textselect + " i.TypeObjectId, ";
            textselect = textselect + " i.Justify, ";

            textselect = textselect + " i.Created_By, ";
            textselect = textselect + " i.Created_Date, ";
            textselect = textselect + " i.Last_Updated_By, ";
            textselect = textselect + " i.Last_Updated_Date ";
            //
            textselect = textselect + "FROM ssoma.ItemResponse i ";
            textselect = textselect + "WHERE 1=1 ";
            if (vnid != 0) {
                textselect = textselect + String.Format(" AND i.[Id] = {0}",vnid);
            }
            if (vnquestion_response_id > 0) {
                textselect = textselect + String.Format(" AND i.[QuestionResponseId] = {0} ",vnquestion_response_id);
            }
            if (vnquestion_item_id > 0) {
                textselect = textselect + String.Format(" AND i.[QuestionItemId] = {0} ",vnquestion_item_id);
            }
            if (vvitem_description != null) {
                textselect = textselect + String.Format(" AND i.[ItemDescription] = '{0}' ",vvitem_description);
            }
            if (vntype_object_id > 0) {
                textselect = textselect + String.Format(" AND i.[TypeObjectId] = {0} ",vntype_object_id);
            }
            if (vvjustify != null) {
                textselect = textselect + String.Format(" AND i.[Justify] = '{0}' ",vvjustify);
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
                        curobj = new ItemResponse();
                        curobj.Id = (long)(dataReader.GetValue(0));
                        if (!dataReader.IsDBNull(1)){ curobj.QuestionResponseId = (long)(dataReader.GetValue(1)); }
                        if (!dataReader.IsDBNull(2)){ curobj.QuestionItemId = (int)(dataReader.GetValue(2)); }
                        if (!dataReader.IsDBNull(3)){ curobj.ItemDescription = (string)(dataReader.GetValue(3)); }
                        if (!dataReader.IsDBNull(4)){ curobj.TypeObjectId = (int)(dataReader.GetValue(4)); }
                        if (!dataReader.IsDBNull(5)){ curobj.Justify = (string)(dataReader.GetValue(5)); }

                        if (!dataReader.IsDBNull(6)){ curobj.Created_By = (string)(dataReader.GetValue(6)); }
                        if (!dataReader.IsDBNull(7)){ curobj.Created_Date = (DateTime)(dataReader.GetValue(7)); }
                        if (!dataReader.IsDBNull(8)){ curobj.Last_Updated_By = (string)(dataReader.GetValue(8)); }
                        if (!dataReader.IsDBNull(9)){ curobj.Last_Updated_Date = (DateTime)(dataReader.GetValue(9)); }

                        lobjs.Add(curobj);
                    }
                }
            }
            conn.Close();
            return lobjs;
        }
    }

    public ItemResponse funGetItemResponse(ILogger log, long vnid) 
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);

        ItemResponse curobj = new ItemResponse();

        SqlDataReader dataReader;

        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString)) 
            {
                conn.Open();

                var textselect = "SELECT ";
                textselect = textselect + " i.Id, ";
                textselect = textselect + " i.QuestionResponseId, ";
                textselect = textselect + " i.QuestionItemId, ";
                textselect = textselect + " i.ItemDescription, ";
                textselect = textselect + " i.TypeObjectId, ";
                textselect = textselect + " i.Justify, ";

                textselect = textselect + " i.Created_By, ";
                textselect = textselect + " i.Created_Date, ";
                textselect = textselect + " i.Last_Updated_By, ";
                textselect = textselect + " i.Last_Updated_Date ";
                //
                textselect = textselect + "FROM ssoma.ItemResponse i ";
                textselect = textselect + "WHERE 1=1 ";
                
                if (vnid > 0) {
                    textselect = textselect + String.Format(" AND i.[Id] = {0}",vnid);
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
                            if (!dataReader.IsDBNull(1)){ curobj.QuestionResponseId = (long)(dataReader.GetValue(1)); }
                            if (!dataReader.IsDBNull(2)){ curobj.QuestionItemId = (int)(dataReader.GetValue(2)); }
                            if (!dataReader.IsDBNull(3)){ curobj.ItemDescription = (string)(dataReader.GetValue(3)); }
                            if (!dataReader.IsDBNull(4)){ curobj.TypeObjectId = (int)(dataReader.GetValue(4)); }
                            if (!dataReader.IsDBNull(5)){ curobj.Justify = (string)(dataReader.GetValue(5)); }

                            if (!dataReader.IsDBNull(6)){ curobj.Created_By = (string)(dataReader.GetValue(6)); }
                            if (!dataReader.IsDBNull(7)){ curobj.Created_Date = (DateTime)(dataReader.GetValue(7)); }
                            if (!dataReader.IsDBNull(8)){ curobj.Last_Updated_By = (string)(dataReader.GetValue(8)); }
                            if (!dataReader.IsDBNull(9)){ curobj.Last_Updated_Date = (DateTime)(dataReader.GetValue(9)); }

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


public class ItemResponse 
{
    public long Id {get;set;}
    public long QuestionResponseId {get;set;}
    public int QuestionItemId {get;set;}
    public string ItemDescription {get;set;}
    public int TypeObjectId {get;set;}
    public string Justify {get;set;}
    public string Created_By {get;set;}
    public DateTime Created_Date {get;set;}
    public string Last_Updated_By {get;set;}
    public DateTime Last_Updated_Date {get;set;}
    public List<OptionResponse> response_option_list {get; set;} 
}
