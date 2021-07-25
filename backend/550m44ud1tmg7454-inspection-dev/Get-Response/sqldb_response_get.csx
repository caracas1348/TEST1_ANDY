using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataAccessResponseGet
{
    public List<Response> funGetResponseList(ILogger log, long vnid
                                                , string vvarea_responsible_id
                                                , long vvinspection_id
                                                , long vninspector_id
                                                , string vvinspector_id_hash
                                                , int wSign) 
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);

        List<Response> lobjs = new List<Response>();
        Response curobj;

        SqlDataReader dataReader;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString)) 
        {
            conn.Open();

            var textselect = "SELECT ";
            textselect = textselect + " r.Id, ";
            textselect = textselect + " r.AreaResponsibleId, ";
            textselect = textselect + " r.InspectionId, ";
            textselect = textselect + " r.InspectorId, ";
            textselect = textselect + " r.InspectorIdHash, ";

            textselect = textselect + " r.Created_By, ";
            textselect = textselect + " r.Created_Date, ";
            textselect = textselect + " r.Last_Updated_By, ";
            textselect = textselect + " r.Last_Updated_Date, ";
            textselect = textselect + " ins.PersonName, ";
            textselect = textselect + " s.Description, ";
            textselect = textselect + " a.Description, ";
            textselect = textselect + " un.Description, ";
            textselect = textselect + " r.FlagFinalize, ";
            textselect = textselect + " i.FormularioId, ";
            textselect = textselect + " i.Ep, ";
            textselect = textselect + " ti.Description, ";
            textselect = textselect + " i.Reason, ";
            textselect = textselect + " i.WorkerNum, ";
            textselect = textselect + " r.AreaResponsibleName, ";
            textselect = textselect + " ins.Job as PersonJob, ";
            textselect = textselect + " i.Code, ";
            textselect = textselect + " i.InspectorName as NameInspectorResponsible, ";
            textselect = textselect + " i.InspectorJob ";
            if(wSign==1){
                textselect = textselect + ", i.InspectorSign ";
            }
            //
            textselect = textselect + "FROM ssoma.Response r ";
            textselect = textselect + "LEFT JOIN ssoma.Inspector ins ON (ins.HashId = r.Created_By) ";
            textselect = textselect + "LEFT JOIN ssoma.Inspector res_ae ON (res_ae.HashId = r.AreaResponsibleId) ";
            textselect = textselect + "LEFT JOIN ssoma.Inspeccion i ON (i.Id = r.InspectionId) ";
            textselect = textselect + "LEFT JOIN ssoma.Inspector ins_res ON (ins_res.HashId = i.InspectorIdHash) ";
            textselect = textselect + "LEFT JOIN auditoria.Sede s ON (s.Id = i.SedeId) ";
            textselect = textselect + "LEFT JOIN ssoma.Area a ON (i.AreaId = a.Id) ";
            textselect = textselect + "LEFT JOIN auditoria.Unidad_Negocio un ON (a.UnidadNegocioId=un.Id) ";
            textselect = textselect + "LEFT JOIN ssoma.Tipo_Inspeccion ti  ON (ti.Id=i.TipoId)";
            textselect = textselect + "LEFT JOIN ssoma.Inspector res_ins ON (res_ins.HashId = r.AreaResponsibleId) ";


            textselect = textselect + "WHERE 1=1 ";
            if (vnid != 0) {
                textselect = textselect + String.Format(" AND r.[Id] = {0}",vnid);
            }
            if (vvarea_responsible_id != null) {
                textselect = textselect + String.Format(" AND r.[AreaResponsibleId] = '{0}' ",vvarea_responsible_id);
            }
            if (vvinspection_id > 0) {
                textselect = textselect + String.Format(" AND r.[InspectionId] = {0}",vvinspection_id);
            }
            if (vninspector_id > 0) {
                textselect = textselect + String.Format(" AND r.[InspectorId] = {0}",vninspector_id);
            }
            if (vvinspector_id_hash != null) {
                textselect = textselect + String.Format(" AND r.[InspectorIdHash] = '{0}'",vvinspector_id_hash);
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
                        curobj = new Response();
                        curobj.Id = (long)(dataReader.GetValue(0));
                        if (!dataReader.IsDBNull(1)){ curobj.AreaResponsibleId = (string)(dataReader.GetValue(1)); }
                        if (!dataReader.IsDBNull(2)){ curobj.InspectionId = (long)(dataReader.GetValue(2)); }
                        if (!dataReader.IsDBNull(3)){ curobj.InspectorId = (long)(dataReader.GetValue(3)); }
                        if (!dataReader.IsDBNull(4)){ curobj.InspectorIdHash = (string)(dataReader.GetValue(4)); }

                        if (!dataReader.IsDBNull(5)){ curobj.Created_By = (string)(dataReader.GetValue(5)); }
                        if (!dataReader.IsDBNull(6)){ curobj.Created_Date = (DateTime)(dataReader.GetValue(6)); }
                        if (!dataReader.IsDBNull(7)){ curobj.Last_Updated_By = (string)(dataReader.GetValue(7)); }
                        if (!dataReader.IsDBNull(8)){ curobj.Last_Updated_Date = (DateTime)(dataReader.GetValue(8)); }

                        if (!dataReader.IsDBNull(9)){ curobj.PersonName = (string)(dataReader.GetValue(9)); }
                        if (!dataReader.IsDBNull(10)){ curobj.SedeName = (string)(dataReader.GetValue(10)); }
                        if (!dataReader.IsDBNull(11)){ curobj.AreaName = (string)(dataReader.GetValue(11)); }
                        if (!dataReader.IsDBNull(12)){ curobj.UnitName = (string)(dataReader.GetValue(12)); }
                        if (!dataReader.IsDBNull(13)){ curobj.FlagFinalize = (int)(dataReader.GetValue(13)); }
                        if (!dataReader.IsDBNull(14)){ curobj.FormularioId = (long)(dataReader.GetValue(14)); }
                        if (!dataReader.IsDBNull(15)){ curobj.Ep = (string)(dataReader.GetValue(15));}
                        if (!dataReader.IsDBNull(16)){ curobj.TypeName = (string)(dataReader.GetValue(16)); }
                        if (!dataReader.IsDBNull(17)){ curobj.Reason = (string)(dataReader.GetValue(17)); }
                        if (!dataReader.IsDBNull(18)){ curobj.WorkerNum = (int)(dataReader.GetValue(18)); }
                        if (!dataReader.IsDBNull(19)){ curobj.NameAreaResponsible = (string)(dataReader.GetValue(19)); }
                        if (!dataReader.IsDBNull(20)){ curobj.PersonJob = (string)(dataReader.GetValue(20)); }
                        if (!dataReader.IsDBNull(21)){ curobj.InspectionCode = (string)(dataReader.GetValue(21)); }
                        if (!dataReader.IsDBNull(22)){ curobj.NameInspectorResponsible = (string)(dataReader.GetValue(22)); }
                        if (!dataReader.IsDBNull(23)){ curobj.JobInspectorResponsible = (string)(dataReader.GetValue(23)); }
                        if(wSign==1){
                            if (!dataReader.IsDBNull(23)){ curobj.InspectorSign = (string)(dataReader.GetValue(24)); }
                        }

                        lobjs.Add(curobj);
                    }
                }
            }
            conn.Close();
            return lobjs;
        }
    }

    public Response funGetResponse(ILogger log, long vnid, long vvinspection_id) 
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);

        Response curobj = new Response();

        SqlDataReader dataReader;

        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString)) 
            {
                conn.Open();

                var textselect = "SELECT ";
                textselect = textselect + " r.Id, ";
                textselect = textselect + " r.AreaResponsibleId, ";
                textselect = textselect + " r.InspectionId, ";
                textselect = textselect + " r.InspectorId, ";
                textselect = textselect + " r.InspectorIdHash, ";

                textselect = textselect + " r.Created_By, ";
                textselect = textselect + " r.Created_Date, ";
                textselect = textselect + " r.Last_Updated_By, ";
                textselect = textselect + " r.Last_Updated_Date, ";
                textselect = textselect + " ins.PersonName, ";
                textselect = textselect + " s.Description, ";
                textselect = textselect + " a.Description, ";
                textselect = textselect + " un.Description, ";
                textselect = textselect + " r.FlagFinalize, ";
                textselect = textselect + " i.FormularioId, ";
                textselect = textselect + " r.AreaResponsibleName, ";
                textselect = textselect + " i.Code, ";
                textselect = textselect + " i.WorkerNum, ";
                textselect = textselect + " i.InspectorName, ";
                textselect = textselect + " i.InspectorJob ";
                //
                textselect = textselect + "FROM ssoma.Response r ";
                textselect = textselect + "LEFT JOIN ssoma.Inspector ins ON (ins.HashId = r.inspectorIdHash)";
                textselect = textselect + "LEFT JOIN ssoma.Inspeccion i ON (i.Id = r.InspectionId) ";
                textselect = textselect + "LEFT JOIN auditoria.Sede s ON (s.Id = i.SedeId) ";
                textselect = textselect + "LEFT JOIN ssoma.Area a ON (i.AreaId = a.Id) ";
                textselect = textselect + "LEFT JOIN auditoria.Unidad_Negocio un ON (a.UnidadNegocioId=un.Id) ";
                textselect = textselect + "WHERE 1=1 ";
                
                if (vnid > 0) {
                    textselect = textselect + String.Format(" AND r.[Id] = {0}",vnid);
                }
                if (vvinspection_id > 0) {
                    textselect = textselect + String.Format(" AND r.[InspectionId] = {0}",vvinspection_id);
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
                            if (!dataReader.IsDBNull(1)){ curobj.AreaResponsibleId = (string)(dataReader.GetValue(1)); }
                            if (!dataReader.IsDBNull(2)){ curobj.InspectionId = (long)(dataReader.GetValue(2)); }
                            if (!dataReader.IsDBNull(3)){ curobj.InspectorId = (long)(dataReader.GetValue(3)); }
                            if (!dataReader.IsDBNull(4)){ curobj.InspectorIdHash = (string)(dataReader.GetValue(4)); }
                            

                            if (!dataReader.IsDBNull(5)){ curobj.Created_By = (string)(dataReader.GetValue(5)); }
                            if (!dataReader.IsDBNull(6)){ curobj.Created_Date = (DateTime)(dataReader.GetValue(6)); }
                            if (!dataReader.IsDBNull(7)){ curobj.Last_Updated_By = (string)(dataReader.GetValue(7)); }
                            if (!dataReader.IsDBNull(8)){ curobj.Last_Updated_Date = (DateTime)(dataReader.GetValue(8)); }


                            if (!dataReader.IsDBNull(18)){ curobj.PersonName = (string)(dataReader.GetValue(18)); }
                            if (!dataReader.IsDBNull(10)){ curobj.SedeName = (string)(dataReader.GetValue(10)); }
                            if (!dataReader.IsDBNull(11)){ curobj.AreaName = (string)(dataReader.GetValue(11)); }
                            if (!dataReader.IsDBNull(12)){ curobj.UnitName = (string)(dataReader.GetValue(12)); }
                            if (!dataReader.IsDBNull(13)){ curobj.FlagFinalize = (int)(dataReader.GetValue(13)); }
                            if (!dataReader.IsDBNull(14)){ curobj.FormularioId = (long)(dataReader.GetValue(14)); }
                            if (!dataReader.IsDBNull(15)){ curobj.AreaResponsibleName = (string)(dataReader.GetValue(15)); }//PASAR A PROD
                            if (!dataReader.IsDBNull(16)){ curobj.InspectionCode = (string)(dataReader.GetValue(16)); }
                            if (!dataReader.IsDBNull(17)){ curobj.WorkerNum = (int)(dataReader.GetValue(17)); }

                            if (!dataReader.IsDBNull(18)){ curobj.NameInspectorResponsible = (string)(dataReader.GetValue(18)); }
                            if (!dataReader.IsDBNull(19)){ curobj.JobInspectorResponsible = (string)(dataReader.GetValue(19)); }

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
    public string PersonName {get;set;}
    public string SedeName {get;set;}
    public string AreaName {get;set;}
    public string UnitName {get;set;}
    public int FlagFinalize {get;set;}
    public long FormularioId {get;set;}
    public string Ep {get;set;}
    public string TypeName {get;set;}
    public string Reason {get;set;}
    public int WorkerNum {get;set;}
    public string NameAreaResponsible {get;set;}
    public string NameInspectorResponsible {get;set;}
    public string JobInspectorResponsible {get;set;}
    public string PersonJob {get;set;}
    public string InspectionCode {get;set;}
    public string InspectorSign {get;set;}
    public List<QuestionResponse> response_question_list {get; set;} 
    public List<QuestionResponse> dataAsk {get; set;} 
}
