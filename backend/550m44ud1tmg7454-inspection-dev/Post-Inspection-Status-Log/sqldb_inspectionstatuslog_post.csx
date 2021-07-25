using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataAccessInspectionStatusLogPost
{
    public async Task<long> funPostInspectionStatusLog(ILogger log, InspectionStatusLog curentity)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);
        long IdStatusPrevio= 0;
        long newlongid;

        InspectionStatusLog curobj;
        curobj = new InspectionStatusLog();
        
        log.LogInformation("Ingreso Metodo:");
        SqlDataReader dataReader;
        

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            log.LogInformation("Ingreso Metodo: antes open");
            conn.Open();

                var textselect = "SELECT L.StatusId FROM ssoma.Inspeccion_Status_Log L WHERE 1=1 AND L.InspectionId =" + curentity.InspectionId.ToString() + " AND L.Active = 1;";
                
                 var StrQuery = textselect;

                log.LogInformation("StrQuery:"+StrQuery);

                  using (SqlCommand cmd = new SqlCommand(StrQuery, conn)) 
                {
                    using (dataReader = cmd.ExecuteReader()) 
                    {
                        while(dataReader.Read())
                        {

                             IdStatusPrevio = (int)(dataReader.GetValue(0));
                           
           

                        }

                        
                    }
                }

            log.LogInformation("Ingreso Metodo: luego de open");

            var sqlDel = "UPDATE ssoma.Inspeccion_Status_Log SET Active = 0 WHERE InspectionId = " + curentity.InspectionId.ToString() + "; ";

            var textselectpart1 = "INSERT INTO ssoma.Inspeccion_Status_Log (  ";
            var textselectpart2 = " output INSERTED.ID VALUES( ";
       
            textselectpart1 = textselectpart1 + " Created_By,Created_Date,Last_Updated_By,Last_Updated_Date";
            textselectpart2 = textselectpart2 + " @created_by,@created_date,@last_updated_by,@last_updated_date";

            if (curentity.InspectionId > 0) {
                textselectpart1 = textselectpart1 + ",InspectionId";
                textselectpart2 = textselectpart2 + ",@inspection_id";
            }
            if (curentity.StatusId > 0) {
                textselectpart1 = textselectpart1 + ",StatusId";
                textselectpart2 = textselectpart2 + ",@status_id";
            }
            if (curentity.InspectorId != null){
                textselectpart1 = textselectpart1 + ",InspectorId";
                textselectpart2 = textselectpart2 + ",@inspector_id";
            }
            if (curentity.Motive != null) {
                textselectpart1 = textselectpart1 + ",Motive";
                textselectpart2 = textselectpart2 + ",@motive";
            }
               if (IdStatusPrevio > 0 ) {
                textselectpart1 = textselectpart1 + ",IdStatusPrevio";
                textselectpart2 = textselectpart2 + ",@IdStatusPrevio";
            }

            textselectpart1 = textselectpart1 + " ) ";
            textselectpart2 = textselectpart2 + " ); ";

            var StrQuery2 = sqlDel + textselectpart1 + textselectpart2;       
            
            log.LogInformation("StrQuery:"+StrQuery2);
            
            using (SqlCommand cmd = new SqlCommand(StrQuery2, conn))
            {
                if (curentity.Created_Date != null) cmd.Parameters.AddWithValue("@created_date", curentity.Created_Date);
                if (curentity.Last_Updated_Date != null) cmd.Parameters.AddWithValue("@last_updated_date", curentity.Last_Updated_Date);
                if (curentity.Created_By != null) cmd.Parameters.AddWithValue("@created_by", curentity.Created_By);
                if (curentity.Last_Updated_By != null) cmd.Parameters.AddWithValue("@last_updated_by", curentity.Last_Updated_By);

                if (curentity.InspectionId != null) cmd.Parameters.AddWithValue("@inspection_id", curentity.InspectionId);
                if (curentity.StatusId > 0) cmd.Parameters.AddWithValue("@status_id",curentity.StatusId);
                if (curentity.InspectorId != null) cmd.Parameters.AddWithValue("@inspector_id", curentity.InspectorId);
                if (curentity.Motive != null) cmd.Parameters.AddWithValue("@motive", curentity.Motive);
                if (IdStatusPrevio > 0) cmd.Parameters.AddWithValue("@IdStatusPrevio",IdStatusPrevio);


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

    public InspectionStatusLog funPutInspectionStatusLog(ILogger log, long curid, InspectionStatusLog curentity)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);

        long newlongid;

        InspectionStatusLog curobj;
        curobj = curentity;

        SqlDataReader dataReader;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            var textselectpart1 = "UPDATE ssoma.Inspeccion_Status_Log SET  ";
            var textselectpart2 = " WHERE 1=1 AND Id = @vncurid ";
       
            textselectpart1 = textselectpart1 + " Last_Updated_By = @last_updated_by,Last_Updated_Date = @last_updated_date";

            if (curentity.InspectionId > 0) {
                textselectpart1 = textselectpart1 + ", InspectionId = @inspection_id";
            }
            if (curentity.StatusId > 0) {
                textselectpart1 = textselectpart1 + ", StatusId = @status_id";
            }
            if (curentity.InspectorId != null) {
                textselectpart1 = textselectpart1 + ", InspectorId = @inspector_id";
            }
            if (curentity.Active != null) {
                textselectpart1 = textselectpart1 + ", Active = @active";
            }

           if (curentity.Motive != null) {
                textselectpart1 = textselectpart1 + ", Motive = @motive";
            }

            textselectpart2 = textselectpart2 + " ; ";

            var StrQuery =  textselectpart1 + textselectpart2;       
            
            log.LogInformation("StrQuery:"+StrQuery);
            
            using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
            {
                cmd.Parameters.AddWithValue("@vncurid", curid);

                if (curentity.Last_Updated_Date != null) cmd.Parameters.AddWithValue("@last_updated_date", curentity.Last_Updated_Date);
                if (curentity.Last_Updated_By != null) cmd.Parameters.AddWithValue("@last_updated_by", curentity.Last_Updated_By);

                if (curentity.InspectionId > 0) cmd.Parameters.AddWithValue("@inspection_id", curentity.InspectionId);
                if (curentity.StatusId > 0) cmd.Parameters.AddWithValue("@status_id",curentity.StatusId);
                if (curentity.InspectorId != null) cmd.Parameters.AddWithValue("@inspector_id", curentity.InspectorId);
                if (curentity.Active != null) cmd.Parameters.AddWithValue("@active", curentity.Active);
                if (curentity.Motive != null) cmd.Parameters.AddWithValue("@motive", curentity.Motive);

                
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
    
    public void funDeleteInspectionStatusLog(ILogger log, long curid)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);

        SqlDataReader dataReader;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            var textselectpart1 = "UPDATE ssoma.Inspeccion SET  ";
            var textselectpart2 = " WHERE 1=1 AND Id = @vncurid ";
       
            textselectpart1 = textselectpart1 + " StatusId = 1 ";      

            var StrQuery =  textselectpart1 + textselectpart2;        
            
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

public class InspectionStatusLog 
{
    public long Id {get;set;}
    public long InspectionId {get;set;}
    public int StatusId {get;set;}
    public string InspectorId {get;set;}
    public int? Active {get;set;}
    public string Motive {get;set;}
    public string Created_By {get;set;}
    public DateTime Created_Date {get;set;}
    public string Last_Updated_By {get;set;}
    public DateTime Last_Updated_Date {get;set;}
}
