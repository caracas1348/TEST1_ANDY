using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataAccessQuestionResponseGet
{
    public List<QuestionResponse> funGetQuestionResponseList(ILogger log, long vnid
                                                , long vnresponse_id
                                                , long vnquestion_id
                                                , string vvquestion_description) 
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);

        List<QuestionResponse> lobjs = new List<QuestionResponse>();
        QuestionResponse curobj;

        SqlDataReader dataReader;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString)) 
        {
            conn.Open();

            var textselect = "SELECT ";
            textselect = textselect + " q.Id, ";
            textselect = textselect + " q.ResponseId, ";
            textselect = textselect + " q.QuestionId, ";
            textselect = textselect + " q.QuestionDescription, ";

            textselect = textselect + " q.Created_By, ";
            textselect = textselect + " q.Created_Date, ";
            textselect = textselect + " q.Last_Updated_By, ";
            textselect = textselect + " q.Last_Updated_Date ";
            //textselect = textselect + " i.TypeObjectId ";
            //
            textselect = textselect + "FROM ssoma.QuestionResponse q ";
            //textselect = textselect + "LEFT JOIN ssoma.ItemResponse i ON (i.QuestionResponseId = q.Id)";
            textselect = textselect + "WHERE 1=1 ";
            if (vnid != 0) {
                textselect = textselect + String.Format(" AND q.[Id] = {0}",vnid);
            }
            if (vnresponse_id > 0) {
                textselect = textselect + String.Format(" AND q.[ResponseId] = {0} ",vnresponse_id);
            }
            if (vnquestion_id > 0) {
                textselect = textselect + String.Format(" AND q.[QuestionId] = {0}",vnquestion_id);
            }
            if (vvquestion_description != null) {
                textselect = textselect + String.Format(" AND q.[QuestionDescription] = '{0}'",vvquestion_description);
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
                        curobj = new QuestionResponse();
                        curobj.Id = (long)(dataReader.GetValue(0));
                        if (!dataReader.IsDBNull(1)){ curobj.ResponseId = (long)(dataReader.GetValue(1)); }
                        if (!dataReader.IsDBNull(2)){ curobj.QuestionId = (long)(dataReader.GetValue(2)); }
                        if (!dataReader.IsDBNull(3)){ curobj.QuestionDescription = (string)(dataReader.GetValue(3)); }

                        if (!dataReader.IsDBNull(4)){ curobj.Created_By = (string)(dataReader.GetValue(4)); }
                        if (!dataReader.IsDBNull(5)){ curobj.Created_Date = (DateTime)(dataReader.GetValue(5)); }
                        if (!dataReader.IsDBNull(6)){ curobj.Last_Updated_By = (string)(dataReader.GetValue(6)); }
                        if (!dataReader.IsDBNull(7)){ curobj.Last_Updated_Date = (DateTime)(dataReader.GetValue(7)); }
                        //if (!dataReader.IsDBNull(8)){ curobj.TypeObjectId = (int)(dataReader.GetValue(8)); }

                        lobjs.Add(curobj);
                    }
                }
            }
            conn.Close();
            return lobjs;
        }
    }

    public QuestionResponse funGetQuestionResponse(ILogger log, long vnid) 
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);

        QuestionResponse curobj = new QuestionResponse();

        SqlDataReader dataReader;

        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString)) 
            {
                conn.Open();

                var textselect = "SELECT ";
                textselect = textselect + " q.Id, ";
                textselect = textselect + " q.ResponseId, ";
                textselect = textselect + " q.QuestionId, ";
                textselect = textselect + " q.QuestionDescription, ";

                textselect = textselect + " q.Created_By, ";
                textselect = textselect + " q.Created_Date, ";
                textselect = textselect + " q.Last_Updated_By, ";
                textselect = textselect + " q.Last_Updated_Date ";
                //
                textselect = textselect + "FROM ssoma.QuestionResponse q ";
                textselect = textselect + "WHERE 1=1 ";
                
                if (vnid > 0) {
                    textselect = textselect + String.Format(" AND q.[Id] = {0}",vnid);
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
                            if (!dataReader.IsDBNull(1)){ curobj.ResponseId = (long)(dataReader.GetValue(1)); }
                            if (!dataReader.IsDBNull(2)){ curobj.QuestionId = (long)(dataReader.GetValue(2)); }
                            if (!dataReader.IsDBNull(3)){ curobj.QuestionDescription = (string)(dataReader.GetValue(3)); }

                            if (!dataReader.IsDBNull(4)){ curobj.Created_By = (string)(dataReader.GetValue(4)); }
                            if (!dataReader.IsDBNull(5)){ curobj.Created_Date = (DateTime)(dataReader.GetValue(5)); }
                            if (!dataReader.IsDBNull(6)){ curobj.Last_Updated_By = (string)(dataReader.GetValue(6)); }
                            if (!dataReader.IsDBNull(7)){ curobj.Last_Updated_Date = (DateTime)(dataReader.GetValue(7)); }

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


public class QuestionResponse 
{
    public long Id {get;set;}
    public long ResponseId {get;set;}
    public long QuestionId {get;set;}
    public string QuestionDescription {get;set;}
    public string Created_By {get;set;}
    public DateTime Created_Date {get;set;}
    public string Last_Updated_By {get;set;}
    public DateTime Last_Updated_Date {get;set;}
    public int TypeObjectId {get;set;}
    public List<ResponseTypes> response_types {get; set;} 
    public List<ItemResponse> response_item_list {get; set;} 
    public List<Item> items {get; set;} 
}


public class ResponseTypes
{
    public int type_object_id {get; set;}
    public List<ItemResponse> response_item_list {get; set;} 
}

public class Item 
{
    public long id {get; set;}
    public string title {get; set;}
    public bool hasObservation {get; set;}
    public string firstPoint {get; set;}
    public long firstPointId {get; set;}
    public string secondPoint {get; set;}
    public long secondPointId {get; set;}
    public string thirdPoint {get; set;}
    public long thirdPointId {get; set;}
    public string observation {get; set;}
    public long observationId {get; set;}
    public long criticality {get; set;}
    public long indicatorResponseId {get; set;}
    public long firstPointResponseId {get; set;}
    public long secondPointResponseId {get; set;}
    public long thirdPointResponseId {get; set;}
    public long ObservationResponseId {get; set;}
    public long criticalityResponseId {get; set;}
}