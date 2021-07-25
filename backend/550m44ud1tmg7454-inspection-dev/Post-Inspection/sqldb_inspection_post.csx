using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataAccessInspection
{
    public async Task<long> funPostInspection(ILogger log, Inspection curentity)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);

        long newlongid;

        Inspection curobj;
        curobj = new Inspection();
        
        log.LogInformation("Ingreso Metodo:");
        SqlDataReader dataReader;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            log.LogInformation("Ingreso Metodo: antes open");
            conn.Open();

            log.LogInformation("Ingreso Metodo: luego de open");

            var textselectpart1 = "INSERT INTO ssoma.Inspeccion(  ";
            var textselectpart2 = " output INSERTED.ID VALUES( ";
       
            textselectpart1 = textselectpart1 + " Created_By,Created_Date,Last_Updated_By,Last_Updated_Date";
            textselectpart2 = textselectpart2 + " @created_by,@created_date,@last_updated_by,@last_updated_date";

            if (curentity.Code != null) {
                textselectpart1 = textselectpart1 + ",Code";
                textselectpart2 = textselectpart2 + ",@code";
            }
            if (curentity.FormularioId > 0) {
                textselectpart1 = textselectpart1 + ",FormularioId";
                textselectpart2 = textselectpart2 + ",@form_id";
            }
            if (curentity.AreaId > 0){
                textselectpart1 = textselectpart1 + ",AreaId";
                textselectpart2 = textselectpart2 + ",@area_id";
            }
            if (curentity.SedeId > 0) {
                textselectpart1 = textselectpart1 + ",SedeId";
                textselectpart2 = textselectpart2 + ",@location_id";
            }
            if (curentity.FrecuenciaId > 0) {
                textselectpart1 = textselectpart1 + ",FrecuenciaId";
                textselectpart2 = textselectpart2 + ",@frequency_id";
            }
            if (curentity.AsignacionTipoId > 0) {
                textselectpart1 = textselectpart1 + ",AsignacionTipoId";
                textselectpart2 = textselectpart2 + ",@assignment_type_id";
            }
            if (curentity.TipoId > 0) {
                textselectpart1 = textselectpart1 + ",TipoId";
                textselectpart2 = textselectpart2 + ",@type";
            }
            if (curentity.StatusId > 0) {
                textselectpart1 = textselectpart1 + ",StatusId";
                textselectpart2 = textselectpart2 + ",@status_id";
            }
            if (curentity.Year != null) {
                textselectpart1 = textselectpart1 + ",Year";
                textselectpart2 = textselectpart2 + ",@year";
            }
            if (curentity.Ep != null) {
                textselectpart1 = textselectpart1 + ",Ep";
                textselectpart2 = textselectpart2 + ",@ep";
            }
            if (curentity.Reason != null) {
                textselectpart1 = textselectpart1 + ",Reason";
                textselectpart2 = textselectpart2 + ",@reason";
            }
            if (curentity.Detail != null) {
                textselectpart1 = textselectpart1 + ",Detail";
                textselectpart2 = textselectpart2 + ",@detail";
            }
            if (curentity.InspectorIdHash != null) {
                textselectpart1 = textselectpart1 + ",InspectorIdHash";
                textselectpart2 = textselectpart2 + ",@inspector_id_hash";
            }
            if (curentity.InspectorName != null) {
                textselectpart1 = textselectpart1 + ",InspectorName";
                textselectpart2 = textselectpart2 + ",@inspector_name";
            } 
            if (curentity.InspectorJob != null) {
                textselectpart1 = textselectpart1 + ",InspectorJob";
                textselectpart2 = textselectpart2 + ",@inspector_job";
            } 
            if (curentity.InspectorSign != null) {
                textselectpart1 = textselectpart1 + ",InspectorSign";
                textselectpart2 = textselectpart2 + ",@inspector_sign";
            }    
            if (curentity.WorkerNum > 0) {
                textselectpart1 = textselectpart1 + ",WorkerNum";
                textselectpart2 = textselectpart2 + ",@worker_num";
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

                if (curentity.Code != null) cmd.Parameters.AddWithValue("@code", curentity.Code);
                if (curentity.FormularioId > 0) cmd.Parameters.AddWithValue("@form_id",curentity.FormularioId);
                if (curentity.AreaId > 0) cmd.Parameters.AddWithValue("@area_id", curentity.AreaId);
                if (curentity.SedeId > 0) cmd.Parameters.AddWithValue("@location_id", curentity.SedeId);
                if (curentity.FrecuenciaId > 0) cmd.Parameters.AddWithValue("@frequency_id", curentity.FrecuenciaId);
                if (curentity.AsignacionTipoId > 0) cmd.Parameters.AddWithValue("@assignment_type_id", curentity.AsignacionTipoId);
                if (curentity.TipoId > 0) cmd.Parameters.AddWithValue("@type", curentity.TipoId);
                if (curentity.StatusId > 0) cmd.Parameters.AddWithValue("@status_id", curentity.StatusId);
                if (curentity.Year != null) cmd.Parameters.AddWithValue("@year", curentity.Year);
                if (curentity.Ep != null) cmd.Parameters.AddWithValue("@ep", curentity.Ep);
                if (curentity.Reason != null) cmd.Parameters.AddWithValue("@reason", curentity.Reason);
                if (curentity.Detail != null) cmd.Parameters.AddWithValue("@detail", curentity.Detail);
                if (curentity.InspectorIdHash != null) cmd.Parameters.AddWithValue("@inspector_id_hash", curentity.InspectorIdHash);
                if (curentity.InspectorName != null) cmd.Parameters.AddWithValue("@inspector_name", curentity.InspectorName);
                if (curentity.InspectorJob != null) cmd.Parameters.AddWithValue("@inspector_job", curentity.InspectorJob);
                if (curentity.InspectorSign != null) cmd.Parameters.AddWithValue("@inspector_sign", curentity.InspectorSign);
                if (curentity.WorkerNum != null) cmd.Parameters.AddWithValue("@worker_num", curentity.WorkerNum);

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

    public Inspection funPutInspection(ILogger log, long curid, Inspection curentity)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);

        long newlongid;

        Inspection curobj;
        curobj = curentity;

        SqlDataReader dataReader;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            var textselectpart1 = "UPDATE ssoma.Inspeccion SET  ";
            var textselectpart2 = " WHERE 1=1 AND Id = @vncurid ";
       
            textselectpart1 = textselectpart1 + " Last_Updated_By = @last_updated_by,Last_Updated_Date = @last_updated_date";

            if (curentity.Code != null) {
                textselectpart1 = textselectpart1 + ", Code = @code";
            }
            if (curentity.FormularioId > 0) {
                textselectpart1 = textselectpart1 + ", FormularioId = @form_id";
            }
            if (curentity.AreaId > 0) {
                textselectpart1 = textselectpart1 + ", AreaId = @area_id";
            }
            if (curentity.SedeId > 0) {
                textselectpart1 = textselectpart1 + ", SedeId = @location_id";
            }
            if (curentity.FrecuenciaId > 0) {
                textselectpart1 = textselectpart1 + ", FrecuenciaId = @frequency_id";
            }
            if (curentity.AsignacionTipoId > 0) {
                textselectpart1 = textselectpart1 + ", AsignacionTipoId = @assignment_type_id";
            }
            if (curentity.TipoId > 0) {
                textselectpart1 = textselectpart1 + ", TipoId = @type";
            }
            if (curentity.StatusId > 0) {
                textselectpart1 = textselectpart1 + ", StatusId = @status_id";
            }
            if (curentity.Year != null) {
                textselectpart1 = textselectpart1 + ", Year = @year";
            }
            if (curentity.InspectorId > 0) {
                textselectpart1 = textselectpart1 + ", InspectorId = @inspector_id";
            }
            if (curentity.Ep != null) {
                textselectpart1 = textselectpart1 + ", Ep = @ep";
            }
            if (curentity.Reason != null) {
                textselectpart1 = textselectpart1 + ", Reason = @reason";
            }
            if (curentity.Detail != null) {
                textselectpart1 = textselectpart1 + ", Detail = @detail";
            }
            if (curentity.InspectorIdHash != null) {
                textselectpart1 = textselectpart1 + ", InspectorIdHash = @inspector_id_hash";
            }
            if (curentity.InspectorName != null) {
                textselectpart1 = textselectpart1 + ", InspectorName = @inspector_name";
            }
            if (curentity.InspectorJob != null) {
                textselectpart1 = textselectpart1 + ", InspectorJob = @inspector_job";
            }
            if (curentity.InspectorSign != null) {
                textselectpart1 = textselectpart1 + ", InspectorSign = @inspector_sign";
            }
            if (curentity.WorkerNum > 0) {
                textselectpart1 = textselectpart1 + ", WorkerNum = @worker_num";
            }

            textselectpart2 = textselectpart2 + " ; ";

            var StrQuery =  textselectpart1 + textselectpart2;       
            
            log.LogInformation("StrQuery:"+StrQuery);
            
            using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
            {
                cmd.Parameters.AddWithValue("@vncurid", curid);

                if (curentity.Last_Updated_Date != null) cmd.Parameters.AddWithValue("@last_updated_date", curentity.Last_Updated_Date);
                if (curentity.Last_Updated_By != null) cmd.Parameters.AddWithValue("@last_updated_by", curentity.Last_Updated_By);

                if (curentity.Code != null) cmd.Parameters.AddWithValue("@code", curentity.Code);
                if (curentity.FormularioId > 0) cmd.Parameters.AddWithValue("@form_id",curentity.FormularioId);
                if (curentity.AreaId > 0) cmd.Parameters.AddWithValue("@area_id", curentity.AreaId);
                if (curentity.SedeId > 0) cmd.Parameters.AddWithValue("@location_id", curentity.SedeId);
                if (curentity.FrecuenciaId > 0) cmd.Parameters.AddWithValue("@frequency_id", curentity.FrecuenciaId);
                if (curentity.AsignacionTipoId > 0) cmd.Parameters.AddWithValue("@assignment_type_id", curentity.AsignacionTipoId);
                if (curentity.TipoId > 0) cmd.Parameters.AddWithValue("@type", curentity.TipoId);
                if (curentity.StatusId > 0) cmd.Parameters.AddWithValue("@status_id", curentity.StatusId);
                if (curentity.Year != null) cmd.Parameters.AddWithValue("@year", curentity.Year);
                if (curentity.InspectorId > 0) cmd.Parameters.AddWithValue("@inspector_id", curentity.InspectorId);
                if (curentity.Ep != null) cmd.Parameters.AddWithValue("@ep", curentity.Ep);
                if (curentity.Reason != null) cmd.Parameters.AddWithValue("@reason", curentity.Reason);
                if (curentity.Detail != null) cmd.Parameters.AddWithValue("@detail", curentity.Detail);
                if (curentity.InspectorIdHash != null) cmd.Parameters.AddWithValue("@inspector_id_hash", curentity.InspectorIdHash);
                if (curentity.InspectorName != null) cmd.Parameters.AddWithValue("@inspector_name", curentity.InspectorName);
                if (curentity.InspectorJob != null) cmd.Parameters.AddWithValue("@inspector_job", curentity.InspectorJob);
                if (curentity.InspectorSign != null) cmd.Parameters.AddWithValue("@inspector_sign", curentity.InspectorSign);
                if (curentity.WorkerNum != null) cmd.Parameters.AddWithValue("@worker_num", curentity.WorkerNum);

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
    
    public void funDeleteInspection(ILogger log, long curid)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);

        SqlDataReader dataReader;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            var textselectpart1 = "UPDATE ssoma.Inspeccion SET  ";
            var textselectpart2 = " WHERE 1=1 AND Id = @vncurid ";
       
            textselectpart1 = textselectpart1 + " Active = 0 ";      

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

public class Inspection 
{
    public long Id {get;set;}
    public string Code {get;set;}
    public long FormularioId {get;set;}
    public long AreaId {get;set;}
    public long SedeId {get;set;} 
    public int FrecuenciaId {get;set;} 
    public int AsignacionTipoId {get;set;}
    public int TipoId {get;set;}
    public int StatusId {get;set;}
    public string Year {get;set;}
    public long InspectorId {get;set;}
    public string Ep {get;set;}
    public string Reason {get;set;}
    public string Detail {get;set;}
    public string InspectorIdHash {get;set;}
    public string InspectorName {get;set;}
    public string InspectorJob {get;set;}
    public string InspectorSign {get;set;}
    public int WorkerNum {get;set;}

    public string Created_By {get;set;}
    public DateTime Created_Date {get;set;}
    public string Last_Updated_By {get;set;}
    public DateTime Last_Updated_Date {get;set;}
}

public class Resp 
{
    public Boolean status {get;set;}
    public string message {get;set;}
}