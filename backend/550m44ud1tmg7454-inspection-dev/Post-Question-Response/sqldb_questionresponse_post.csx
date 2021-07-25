using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataAccessQuestionResponsePost
{
    public async Task<long> funPostQuestionResponse(ILogger log, QuestionResponse curentity)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);

        long newlongid;

        QuestionResponse curobj;
        curobj = new QuestionResponse();
        
        log.LogInformation("Ingreso Metodo:");
        SqlDataReader dataReader;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            log.LogInformation("Ingreso Metodo: antes open");
            conn.Open();

            log.LogInformation("Ingreso Metodo: luego de open");

            var textselectpart1 = "INSERT INTO ssoma.QuestionResponse(  ";
            var textselectpart2 = " output INSERTED.ID VALUES( ";
       
            textselectpart1 = textselectpart1 + " Created_By,Created_Date,Last_Updated_By,Last_Updated_Date";
            textselectpart2 = textselectpart2 + " @created_by,@created_date,@last_updated_by,@last_updated_date";

            if (curentity.ResponseId > 0) {
                textselectpart1 = textselectpart1 + ",ResponseId";
                textselectpart2 = textselectpart2 + ",@response_id";
            }
            if (curentity.QuestionId > 0){
                textselectpart1 = textselectpart1 + ",QuestionId";
                textselectpart2 = textselectpart2 + ",@question_id";
            }
            if (curentity.QuestionDescription != null) {
                textselectpart1 = textselectpart1 + ",QuestionDescription";
                textselectpart2 = textselectpart2 + ",@question_description";
            }

            textselectpart1 = textselectpart1 + " ) ";
            textselectpart2 = textselectpart2 + " ); ";

            var StrQuery =  textselectpart1 + textselectpart2;       
            
            log.LogInformation("StrQuery:"+StrQuery);
            
            using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
            {
                if (curentity.Created_Date != null) cmd.Parameters.AddWithValue("@created_date", curentity.Created_Date);
                if (curentity.Last_Updated_Date != null) cmd.Parameters.AddWithValue("@last_updated_date", curentity.Last_Updated_Date);
                if (curentity.Created_By != null) cmd.Parameters.AddWithValue("@created_by", curentity.Created_By);
                if (curentity.Last_Updated_By != null) cmd.Parameters.AddWithValue("@last_updated_by", curentity.Last_Updated_By);

                if (curentity.ResponseId > 0) cmd.Parameters.AddWithValue("@response_id", curentity.ResponseId);
                if (curentity.QuestionId > 0) cmd.Parameters.AddWithValue("@question_id",curentity.QuestionId);
                if (curentity.QuestionDescription != null) cmd.Parameters.AddWithValue("@question_description", curentity.QuestionDescription);

                var modified = await cmd.ExecuteScalarAsync(); 
                newlongid = Convert.ToInt64(modified);
                log.LogInformation("modified:"+modified);
            }

            if (conn.State == System.Data.ConnectionState.Open) {
                conn.Close();
            }
            return newlongid;
        }
        return newlongid;
    }

    public QuestionResponse funPutQuestionResponse(ILogger log, long curid, QuestionResponse curentity)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);

        int newlongid;

        QuestionResponse curobj;
        curobj = curentity;

        SqlDataReader dataReader;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            var textselectpart1 = "UPDATE ssoma.QuestionResponse SET  ";
            var textselectpart2 = " WHERE 1=1 AND id = @vncurid ";
       
            textselectpart1 = textselectpart1 + " last_updated_by = @last_updated_by,last_updated_date = @last_updated_date";

            if (curentity.ResponseId > 0) {
                textselectpart1 = textselectpart1 + ", ResponseId = @response_id";
            }
            if (curentity.QuestionId > 0) {
                textselectpart1 = textselectpart1 + ", QuestionId = @question_id";
            }
            if (curentity.QuestionDescription != null) {
                textselectpart1 = textselectpart1 + ", QuestionDescription = @question_description";
            }

            textselectpart2 = textselectpart2 + " ; ";

            var StrQuery =  textselectpart1 + textselectpart2;       
            
            log.LogInformation("StrQuery:"+StrQuery);
            
            using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
            {
                cmd.Parameters.AddWithValue("@vncurid", curid);

                if (curentity.Last_Updated_Date != null) cmd.Parameters.AddWithValue("@last_updated_date", curentity.Last_Updated_Date);
                if (curentity.Last_Updated_By != null) cmd.Parameters.AddWithValue("@last_updated_by", curentity.Last_Updated_By);

                if (curentity.ResponseId > 0) cmd.Parameters.AddWithValue("@response_id",curentity.ResponseId);
                if (curentity.QuestionId > 0) cmd.Parameters.AddWithValue("@question_id", curentity.QuestionId);
                if (curentity.QuestionDescription != null) cmd.Parameters.AddWithValue("@question_description", curentity.QuestionDescription);

                var modified = cmd.ExecuteNonQuery();           
                log.LogInformation("modified:"+modified); 
            }

            if (conn.State == System.Data.ConnectionState.Open) {
                conn.Close();
            }
            return curobj;
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
}
