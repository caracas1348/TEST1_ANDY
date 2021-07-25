using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataAccessItemResponsePost
{
    public async Task<long> funPostItemResponse(ILogger log, ItemResponse curentity)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);

        long newlongid;

        ItemResponse curobj;
        curobj = new ItemResponse();
        
        log.LogInformation("Ingreso Metodo:");
        SqlDataReader dataReader;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            log.LogInformation("Ingreso Metodo: antes open");
            conn.Open();

            log.LogInformation("Ingreso Metodo: luego de open");

            var textselectpart1 = "INSERT INTO ssoma.ItemResponse(  ";
            var textselectpart2 = " output INSERTED.ID VALUES( ";
       
            textselectpart1 = textselectpart1 + " Created_By,Created_Date,Last_Updated_By,Last_Updated_Date";
            textselectpart2 = textselectpart2 + " @created_by,@created_date,@last_updated_by,@last_updated_date";

            if (curentity.QuestionResponseId > 0) {
                textselectpart1 = textselectpart1 + ",QuestionResponseId";
                textselectpart2 = textselectpart2 + ",@question_response_id";
            }
            if (curentity.QuestionItemId > 0){
                textselectpart1 = textselectpart1 + ",QuestionItemId";
                textselectpart2 = textselectpart2 + ",@question_item_id";
            }
            if (curentity.ItemDescription != null) {
                textselectpart1 = textselectpart1 + ",ItemDescription";
                textselectpart2 = textselectpart2 + ",@item_description";
            }
            if (curentity.TypeObjectId > 0){
                textselectpart1 = textselectpart1 + ",TypeObjectId";
                textselectpart2 = textselectpart2 + ",@type_object_id";
            }
            if (curentity.Justify != null) {
                textselectpart1 = textselectpart1 + ",Justify";
                textselectpart2 = textselectpart2 + ",@justify";
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

                if (curentity.QuestionResponseId > 0) cmd.Parameters.AddWithValue("@question_response_id", curentity.QuestionResponseId);
                if (curentity.QuestionItemId > 0) cmd.Parameters.AddWithValue("@question_item_id",curentity.QuestionItemId);
                if (curentity.ItemDescription != null) cmd.Parameters.AddWithValue("@item_description", curentity.ItemDescription);
                if (curentity.TypeObjectId > 0) cmd.Parameters.AddWithValue("@type_object_id",curentity.TypeObjectId);
                if (curentity.Justify != null) cmd.Parameters.AddWithValue("@justify", curentity.Justify);

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

    public ItemResponse funPutItemResponse(ILogger log, long curid, ItemResponse curentity)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);

        int newlongid;

        ItemResponse curobj;
        curobj = curentity;

        SqlDataReader dataReader;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            var textselectpart1 = "UPDATE ssoma.ItemResponse SET  ";
            var textselectpart2 = " WHERE 1=1 AND id = @vncurid ";
       
            textselectpart1 = textselectpart1 + " last_updated_by = @last_updated_by,last_updated_date = @last_updated_date";

            if (curentity.QuestionResponseId > 0) {
                textselectpart1 = textselectpart1 + ", QuestionResponseId = @question_response_id";
            }
            if (curentity.QuestionItemId > 0) {
                textselectpart1 = textselectpart1 + ", QuestionItemId = @question_item_id";
            }
            if (curentity.ItemDescription != null) {
                textselectpart1 = textselectpart1 + ", ItemDescription = @item_description";
            }
            if (curentity.TypeObjectId > 0) {
                textselectpart1 = textselectpart1 + ", TypeObjectId = @type_object_id";
            }
            if (curentity.Justify != null) {
                textselectpart1 = textselectpart1 + ", Justify = @justify";
            }

            textselectpart2 = textselectpart2 + " ; ";

            var StrQuery =  textselectpart1 + textselectpart2;       
            
            log.LogInformation("StrQuery:"+StrQuery);
            
            using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
            {
                cmd.Parameters.AddWithValue("@vncurid", curid);

                if (curentity.Last_Updated_Date != null) cmd.Parameters.AddWithValue("@last_updated_date", curentity.Last_Updated_Date);
                if (curentity.Last_Updated_By != null) cmd.Parameters.AddWithValue("@last_updated_by", curentity.Last_Updated_By);

                if (curentity.QuestionResponseId > 0) cmd.Parameters.AddWithValue("@question_response_id",curentity.QuestionResponseId);
                if (curentity.QuestionItemId > 0) cmd.Parameters.AddWithValue("@question_item_id", curentity.QuestionItemId);
                if (curentity.ItemDescription != null) cmd.Parameters.AddWithValue("@item_description", curentity.ItemDescription);
                if (curentity.TypeObjectId > 0) cmd.Parameters.AddWithValue("@type_object_id", curentity.TypeObjectId);
                if (curentity.Justify != null) cmd.Parameters.AddWithValue("@justify", curentity.Justify);

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
}
