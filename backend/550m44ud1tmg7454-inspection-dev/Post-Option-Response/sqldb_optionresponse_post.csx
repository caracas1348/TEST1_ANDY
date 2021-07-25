using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataAccessOptionResponsePost
{
    public async Task<long> funPostOptionResponse(ILogger log, OptionResponse curentity)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);

        long newlongid;

        OptionResponse curobj;
        curobj = new OptionResponse();
        
        log.LogInformation("Ingreso Metodo:");
        SqlDataReader dataReader;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            log.LogInformation("Ingreso Metodo: antes open");
            conn.Open();

            log.LogInformation("Ingreso Metodo: luego de open");

            var textselectpart1 = "INSERT INTO ssoma.OptionResponse(  ";
            var textselectpart2 = " output INSERTED.ID VALUES( ";
       
            textselectpart1 = textselectpart1 + " Created_By,Created_Date,Last_Updated_By,Last_Updated_Date";
            textselectpart2 = textselectpart2 + " @created_by,@created_date,@last_updated_by,@last_updated_date";

            if (curentity.ItemResponseId > 0) {
                textselectpart1 = textselectpart1 + ",ItemResponseId";
                textselectpart2 = textselectpart2 + ",@item_response_id";
            }
            if (curentity.ItemOptionId > 0){
                textselectpart1 = textselectpart1 + ",ItemOptionId";
                textselectpart2 = textselectpart2 + ",@item_option_id";
            }
            if (curentity.OptionDescription != null) {
                textselectpart1 = textselectpart1 + ",OptionDescription";
                textselectpart2 = textselectpart2 + ",@option_description";
            }
            if (curentity.Text != null) {
                textselectpart1 = textselectpart1 + ",Text";
                textselectpart2 = textselectpart2 + ",@text";
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

                if (curentity.ItemResponseId > 0) cmd.Parameters.AddWithValue("@item_response_id", curentity.ItemResponseId);
                if (curentity.ItemOptionId > 0) cmd.Parameters.AddWithValue("@item_option_id",curentity.ItemOptionId);
                if (curentity.OptionDescription != null) cmd.Parameters.AddWithValue("@option_description", curentity.OptionDescription);
                if (curentity.Text != null) cmd.Parameters.AddWithValue("@text", curentity.Text);

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

    public OptionResponse funPutOptionResponse(ILogger log, long curid, OptionResponse curentity)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);

        int newlongid;

        OptionResponse curobj;
        curobj = curentity;

        SqlDataReader dataReader;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            var textselectpart1 = "UPDATE ssoma.OptionResponse SET  ";
            var textselectpart2 = " WHERE 1=1 AND id = @vncurid ";
       
            textselectpart1 = textselectpart1 + " last_updated_by = @last_updated_by,last_updated_date = @last_updated_date";

            if (curentity.ItemResponseId > 0) {
                textselectpart1 = textselectpart1 + ", ItemResponseId = @item_response_id";
            }
            if (curentity.ItemOptionId > 0) {
                textselectpart1 = textselectpart1 + ", ItemOptionId = @item_option_id";
            }
            if (curentity.OptionDescription != null) {
                textselectpart1 = textselectpart1 + ", OptionDescription = @option_description";
            }

            textselectpart2 = textselectpart2 + " ; ";

            var StrQuery =  textselectpart1 + textselectpart2;       
            
            log.LogInformation("StrQuery:"+StrQuery);
            
            using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
            {
                cmd.Parameters.AddWithValue("@vncurid", curid);

                if (curentity.Last_Updated_Date != null) cmd.Parameters.AddWithValue("@last_updated_date", curentity.Last_Updated_Date);
                if (curentity.Last_Updated_By != null) cmd.Parameters.AddWithValue("@last_updated_by", curentity.Last_Updated_By);

                if (curentity.ItemResponseId > 0) cmd.Parameters.AddWithValue("@item_response_id",curentity.ItemResponseId);
                if (curentity.ItemOptionId > 0) cmd.Parameters.AddWithValue("@item_option_id", curentity.ItemOptionId);
                if (curentity.OptionDescription != null) cmd.Parameters.AddWithValue("@option_description", curentity.OptionDescription);

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
    public string Text {get;set;}
}
