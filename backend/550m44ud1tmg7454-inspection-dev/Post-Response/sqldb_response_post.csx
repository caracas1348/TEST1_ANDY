using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataAccessResponsePost
{
    public async Task<long> funPostResponse(ILogger log, Response curentity)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);

        long newlongid;

        Response curobj;
        curobj = new Response();
        
        log.LogInformation("Ingreso Metodo:");
        SqlDataReader dataReader;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            log.LogInformation("Ingreso Metodo: antes open");
            conn.Open();

            log.LogInformation("Ingreso Metodo: luego de open");

            var textselectpart1 = "INSERT INTO ssoma.Response(  ";
            var textselectpart2 = " output INSERTED.ID VALUES( ";
       
            textselectpart1 = textselectpart1 + " Created_By,Created_Date,Last_Updated_By,Last_Updated_Date";
            textselectpart2 = textselectpart2 + " @created_by,@created_date,@last_updated_by,@last_updated_date";

            if (curentity.AreaResponsibleId != null) {
                textselectpart1 = textselectpart1 + ",AreaResponsibleId";
                textselectpart2 = textselectpart2 + ",@area_responsible_id";
            }
            if (curentity.AreaResponsibleName != null) {
                textselectpart1 = textselectpart1 + ",AreaResponsibleName";
                textselectpart2 = textselectpart2 + ",@area_responsible_name";
            }
            if (curentity.InspectionId > 0){
                textselectpart1 = textselectpart1 + ",InspectionId";
                textselectpart2 = textselectpart2 + ",@inspection_id";
            }
            if (curentity.InspectorId > 0) {
                textselectpart1 = textselectpart1 + ",InspectorId";
                textselectpart2 = textselectpart2 + ",@inspector_id";
            }
            if (curentity.InspectorIdHash != null){
                textselectpart1 = textselectpart1 + ",InspectorIdHash";
                textselectpart2 = textselectpart2 + ",@inspector_id_hash";       
            }
            if(curentity.FlagFinalize >0){
                textselectpart1 = textselectpart1 + ",FlagFinalize";
                textselectpart2 = textselectpart2 + ",@flag_finalize";    
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

                if (curentity.AreaResponsibleId != null) cmd.Parameters.AddWithValue("@area_responsible_id", curentity.AreaResponsibleId);
                if (curentity.AreaResponsibleName != null) cmd.Parameters.AddWithValue("@area_responsible_name", curentity.AreaResponsibleName);
                if (curentity.InspectionId > 0) cmd.Parameters.AddWithValue("@inspection_id",curentity.InspectionId);
                if (curentity.InspectorId > 0) cmd.Parameters.AddWithValue("@inspector_id", curentity.InspectorId);
                if (curentity.InspectorIdHash != null) cmd.Parameters.AddWithValue("@inspector_id_hash", curentity.InspectorIdHash);
                if (curentity.FlagFinalize > 0) cmd.Parameters.AddWithValue("@flag_finalize", curentity.FlagFinalize);

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

    public Response funPutResponse(ILogger log, long curid, Response curentity)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);

        int newlongid;

        Response curobj;
        curobj = curentity;

        SqlDataReader dataReader;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            var textselectpart1 = "UPDATE ssoma.Response SET  ";
            var textselectpart2 = " WHERE 1=1 AND id = @vncurid ";
       
            textselectpart1 = textselectpart1 + " last_updated_by = @last_updated_by,last_updated_date = @last_updated_date";

            if (curentity.AreaResponsibleId != null) {
                textselectpart1 = textselectpart1 + ", AreaResponsibleId = @area_responsible_id";
            }
            if (curentity.AreaResponsibleName != null) {
                textselectpart1 = textselectpart1 + ", AreaResponsibleName = @area_responsible_name";
            }
            if (curentity.InspectionId > 0) {
                textselectpart1 = textselectpart1 + ", InspectionId = @inspection_id";
            }
            if (curentity.InspectorId > 0) {
                textselectpart1 = textselectpart1 + ", InspectorId = @inspector_id";
            }
            if (curentity.InspectorIdHash != null) {
                textselectpart1 = textselectpart1 + ", InspectorIdHash = @inspector_id_hash";
            }
            if(curentity.FlagFinalize > 0){
                textselectpart1 = textselectpart1 + ", FlagFinalize = @flag_finalize";   
            }

            textselectpart2 = textselectpart2 + " ; ";

            var StrQuery =  textselectpart1 + textselectpart2;       
            
            log.LogInformation("StrQuery:"+StrQuery);
            
            using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
            {
                cmd.Parameters.AddWithValue("@vncurid", curid);

                if (curentity.Last_Updated_Date != null) cmd.Parameters.AddWithValue("@last_updated_date", curentity.Last_Updated_Date);
                if (curentity.Last_Updated_By != null) cmd.Parameters.AddWithValue("@last_updated_by", curentity.Last_Updated_By);

                if (curentity.AreaResponsibleId != null) cmd.Parameters.AddWithValue("@area_responsible_id", curentity.AreaResponsibleId);
                if (curentity.AreaResponsibleName != null) cmd.Parameters.AddWithValue("@area_responsible_name", curentity.AreaResponsibleName);
                if (curentity.InspectionId > 0) cmd.Parameters.AddWithValue("@inspection_id",curentity.InspectionId);
                if (curentity.InspectorId > 0) cmd.Parameters.AddWithValue("@inspector_id", curentity.InspectorId);
                if (curentity.InspectorIdHash != null) cmd.Parameters.AddWithValue("@inspector_id_hash", curentity.InspectorIdHash);
                if (curentity.FlagFinalize > 0) cmd.Parameters.AddWithValue("@flag_finalize", curentity.FlagFinalize);

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

    public void funDeleteQuestions(ILogger log, long curid)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);

        SqlDataReader dataReader;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            //var textdelete = "DELETE ir FROM ssoma.ItemResponse ir LEFT JOIN ssoma.QuestionResponse qr ON ir.QuestionResponseId=qr.Id WHERE qr.ResponseId = "+curid.ToString()+" ;";


            var textselectpart1 = "DELETE FROM ssoma.QuestionResponse ";
            textselectpart1 = textselectpart1 + " WHERE 1=1 AND ResponseId = @vncurid ";      

            var StrQuery =  textselectpart1;        
            
            log.LogInformation("StrQuery:"+StrQuery);
            
            using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
            {
                cmd.Parameters.AddWithValue("@vncurid", curid);
                
                var modified = cmd.ExecuteNonQuery();           
                log.LogInformation("deleted:"+modified); 
            }

            if (conn.State == System.Data.ConnectionState.Open) {
                conn.Close();
            }
        }
    }
}

public class Response 
{
    public long Id {get;set;}
    public string AreaResponsibleId {get;set;}
    public string AreaResponsibleName {get;set;}
    public long InspectionId {get;set;}
    public long InspectorId {get;set;}
    public string Created_By {get;set;}
    public DateTime Created_Date {get;set;}
    public string Last_Updated_By {get;set;}
    public DateTime Last_Updated_Date {get;set;}
    public string InspectorIdHash {get;set;}
    public int FlagFinalize {get;set;}
}

/*public class Resp 
{
    public Boolean status {get;set;}
    public string message {get;set;}
}*/