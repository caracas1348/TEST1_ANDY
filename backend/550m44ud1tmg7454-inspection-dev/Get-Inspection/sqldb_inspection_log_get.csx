
using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

    class DataAccessLogsInspectionGet {

    public LogsInspection funGetLogsInspection(ILogger log, long vnid) 
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);

        LogsInspection curobj = new LogsInspection();
         SqlDataReader dataReader;
         try{
              using (SqlConnection conn = new SqlConnection(vvsqlconnectionString)) 
            {
                conn.Open();
                var textselect = "SELECT L.StatusId, S.Description, L.IdStatusPrevio FROM ssoma.Inspeccion_Status_Log L INNER JOIN ssoma.Inspeccion_Status S on (L.StatusId=S.Id) WHERE 1=1 ";
                textselect = textselect + String.Format("AND L.InspectionId = {0}",vnid);
                textselect = textselect + "AND L.Active = 1 ORDER BY L.Id";
                
                 var StrQuery = textselect;

                log.LogInformation("StrQuery:"+StrQuery);

                  using (SqlCommand cmd = new SqlCommand(StrQuery, conn)) 
                {
                    using (dataReader = cmd.ExecuteReader()) 
                    {
                        while(dataReader.Read())
                        {

                             curobj.Id = (int)(dataReader.GetValue(0));
                            if (!dataReader.IsDBNull(1)){ curobj.StatusDescription = (string)(dataReader.GetValue(1)); }
                            if (!dataReader.IsDBNull(2)){ curobj.IdStatusPrevio = (int)(dataReader.GetValue(2)); }
           

                        }

                        
                    }
                }
                conn.Close();
            }
             
         }catch(Exception ex){

         }        
         return curobj;



    }

    public LogsInspection funGetLogsAsign(ILogger log, long vnid) 
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);

        LogsInspection curobj = new LogsInspection();
         SqlDataReader dataReader;
         try{
              using (SqlConnection conn = new SqlConnection(vvsqlconnectionString)) 
            {
                conn.Open();
                var textselect = "SELECT TOP(1) L.StatusId, S.Description, L.IdStatusPrevio FROM ssoma.Inspeccion_Status_Log L INNER JOIN ssoma.Inspeccion_Status S on (L.StatusId=S.Id) WHERE 1=1 ";
                textselect = textselect + String.Format(" AND L.InspectionId = {0} ",vnid);
                textselect = textselect + " AND L.StatusId IN (2,6) ORDER BY L.Id DESC";
                
                 var StrQuery = textselect;

                log.LogInformation("StrQuery:"+StrQuery);

                  using (SqlCommand cmd = new SqlCommand(StrQuery, conn)) 
                {
                    using (dataReader = cmd.ExecuteReader()) 
                    {
                        while(dataReader.Read())
                        {

                             curobj.Id = (int)(dataReader.GetValue(0));
                            if (!dataReader.IsDBNull(1)){ curobj.StatusDescription = (string)(dataReader.GetValue(1)); }
                            if (!dataReader.IsDBNull(2)){ curobj.IdStatusPrevio = (int)(dataReader.GetValue(2)); }
           

                        }

                        
                    }
                }
                conn.Close();
            }
             
         }catch(Exception ex){

         }        
         return curobj;



    }

    }

    public class LogsInspection
    {
    public int Id {get;set;}
    public long InspectionId {get;set;}
    public int StatusId {get;set;}
    public string InspectorId {get;set;}
    public string StatusDescription {get;set;}
    public int IdStatusPrevio {get;set;}
    public int? Active {get;set;}
    public string Motive {get;set;}
    public string Created_By {get;set;}
    public DateTime Created_Date {get;set;}
    public string Last_Updated_By {get;set;}
    public DateTime Last_Updated_Date {get;set;}

    }