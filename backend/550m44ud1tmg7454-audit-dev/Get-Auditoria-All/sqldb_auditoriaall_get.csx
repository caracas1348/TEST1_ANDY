using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;
using System.Diagnostics;

class DataAuditoriaAllGet
{
    public List<auditoriaallget> funGetAuditoriaAllList(ILogger log, int vnsearch_type
                                                    , long vnid
                                                    , string vvcode
                                                    , string vvdescription
                                                    , long vvsedeid
                                                    , long vvtipoid
                                                    , int vvstatusid
                                                    , string vvinicio
                                                    , string vvfin
                                                    , string vvcreated_by
                                                    , string vvcreated_date
                                                    , string vvlast_updated_by
                                                    , string vvlast_updated_date
                                                    , long vnprogramaauditoriaid
                                                    , int vnstatusevaluacionid
                                                    , string vvfechadesde
                                                    , string vvfechahasta
                                                    , long vvunidadnegocioid
                                                    )
    {
        // log.LogInformation(str1);
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit",EnvironmentVariableTarget.Process);
        //Lista de Objetos
        List<auditoriaallget> lobjs = new List<auditoriaallget>();
        auditoriaallget curobj;
        string vvcomodin="";
        //SQL Objects
        SqlDataReader dataReader;
        try{
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();    
                //Start - Manejo de Parametros
                if(vnsearch_type == 1)
                { vvcomodin= "%";   }                 
                var textselect = "SELECT A.Id, A.[Description], A.Code, A.SedeId, A.TipoId, A.StatusId, A.Inicio, A.Fin, A.Created_By, A.Created_Date, ";
                textselect = textselect +  "A.Last_Updated_By, A.Last_Updated_Date, A.ProgramaAuditoriaId, A.StatusEvaluacionId,";
                textselect = textselect +  "S.Code AS CodeSede, S.Description AS DescriptionSede, TA.Code AS CodeTipoAuditoria, TA.Description AS DescriptionAuditoria, ";
                textselect = textselect +  "SA.Description AS DescriptionStatus, UN.Code AS CodeUnidadNegocio, UN.Id AS UnidadNegocioId, UN.Description AS DescriptionUnidadNegocio, ";
                textselect = textselect +  "SEA.Description AS DescriptionStatusEvaluacion, A.Deleted_By, A.Deleted_Date, A.Deleted, ";
                textselect = textselect +  "(SELECT STUFF((SELECT ',' + CONVERT(VARCHAR(10), NormaCode) FROM [auditoria].Auditoria_Norma WHERE AuditoriaId = A.Id FOR xml path('')), 1, 1, '')) AS Code_Normas, ";
                textselect = textselect +  "A.Created_Date AS FechaCreacion, PA.Cantidad_Correcciones AS CantidadCorrecciones, ";
                textselect = textselect + "(SELECT COUNT(*) FROM [auditoria].[Auditoria_Auditor] WHERE AuditoriaId = A.Id AND Active = 1) AS Cant_Auditores, ";
                textselect = textselect + "(SELECT Observacion FROM [auditoria].[Observacion_Auditoria] WHERE AuditoriaId = A.Id AND Active = 1) AS Observacion ";
                textselect = textselect +  "FROM [auditoria].[Auditoria] A ";
                textselect = textselect +  "INNER JOIN [auditoria].Sede S ON S.Id = A.SedeId ";
                textselect = textselect +  "INNER JOIN [auditoria].Unidad_Negocio UN ON S.UnidadNegocioId = UN.Id ";
                textselect = textselect +  "INNER JOIN [auditoria].Tipo_Auditoria TA ON TA.Id = A.TipoId ";
                textselect = textselect +  "INNER JOIN [auditoria].Status_Auditoria SA ON SA.Id = A.StatusId ";
                textselect = textselect +  "LEFT JOIN [auditoria].Programa_Auditoria PA ON PA.Id = A.ProgramaAuditoriaId ";
                textselect = textselect +  "LEFT JOIN [auditoria].Status_Evaluacion_Auditoria SEA ON SEA.Id = A.StatusEvaluacionId ";
                textselect = textselect +  "WHERE (A.Deleted IS NULL OR A.Deleted = 0) ";
                if(vnid != 0)
                {textselect = textselect +  String.Format(" AND A.[Id] = {0}",vnid);}                
                if(vvcode != null)
                {textselect = textselect +  String.Format(" AND A.[Code] like '{0}'",vvcomodin+vvcode+vvcomodin);}
                if(vvdescription != null)
                {textselect = textselect +  String.Format(" AND A.[Description] like '{0}'",vvcomodin+vvdescription+vvcomodin);}
                if(vvsedeid != 0 && vnprogramaauditoriaid != 0)
                {textselect = textselect +  String.Format(" AND A.[SedeId] = {0} AND A.[ProgramaAuditoriaId] = {1} ",vvsedeid,vnprogramaauditoriaid);} 
                if(vvsedeid != 0)
                {textselect = textselect +  String.Format(" AND A.[SedeId] = {0} ",vvsedeid);} 
                if(vvunidadnegocioid != 0 && vnprogramaauditoriaid != 0)
                {textselect = textselect +  String.Format(" AND UN.Id = {0} AND A.[ProgramaAuditoriaId] = {1} ",vvunidadnegocioid,vnprogramaauditoriaid);}          
                if(vvunidadnegocioid != 0)
                {textselect = textselect +  String.Format(" AND UN.Id = {0} ",vvunidadnegocioid);}        
                if(vvtipoid != 0)
                {textselect = textselect +  String.Format(" AND A.[TipoId] = {0}",vvtipoid);}                
                if(vvstatusid != 0  && vnprogramaauditoriaid != 0)
                {textselect = textselect +  String.Format(" AND A.[StatusId] = {0} AND A.[ProgramaAuditoriaId] = {1} ",vvstatusid,vnprogramaauditoriaid);}
                if(vvstatusid != 0)
                {textselect = textselect +  String.Format(" AND A.[StatusId] = {0} ",vvstatusid);}
                if(vvinicio != null)
                {textselect = textselect +  String.Format(" AND A.[Inicio] like '{0}'",vvinicio);}
                if(vvfin != null)
                {textselect = textselect +  String.Format(" AND A.[Fin] like '{0}'",vvfin);}
                if( vvcreated_by != null )
                {textselect = textselect +  String.Format(" AND A.[Created_By] = '{0}'",vvcreated_by);}                                     
                if(vvcreated_date != null)
                {textselect = textselect +  String.Format(" AND A.[Created_Date] >= '{0}'",vvcreated_date);}
                if( vvlast_updated_by != null )
                {textselect = textselect +  String.Format(" AND A.[Last_Updated_By] = '{0}'",vvlast_updated_by);}
                if(vvlast_updated_date != null)
                {textselect = textselect +  String.Format(" AND A.[Last_Updated_Date] >= '{0}'",vvlast_updated_date);}
                if(vnprogramaauditoriaid != 0)
                {textselect = textselect +  String.Format(" AND A.[ProgramaAuditoriaId] = {0}",vnprogramaauditoriaid);}
                if(vnstatusevaluacionid != 0)
                {textselect = textselect +  String.Format(" AND A.[StatusEvaluacionId] = {0}",vnstatusevaluacionid);}
                if(vvfechadesde != null )
                {textselect = textselect +  String.Format(" AND (Inicio >= '{0}') ",vvfechadesde);}
                if(vvfechahasta != null)
                {textselect = textselect +  String.Format(" AND (Inicio <= '{0}') ",vvfechahasta);}
                /*if(vvfechadesde != null && vvfechahasta != null)
                {textselect = textselect +  String.Format(" AND (Inicio >= '{0}' AND Inicio <= '{1}' OR Fin >= '{0}' AND Fin <= '{1}') ",vvfechadesde,vvfechahasta);}*/
                textselect = textselect +  " ORDER BY A.Id DESC, A.Inicio, A.Fin DESC";

                var StrQuery =  textselect;
                //End - Manejo de Parametros
                log.LogInformation("StrQuery:"+StrQuery);
                //ShipDate < GetDate();        
                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    //Ejecutar Comando
                    using (dataReader = cmd.ExecuteReader())  
                    {   
                        //Navegar en el Conjunto de Datos Recuperados
                        while (dataReader.Read())  
                        {
                            curobj                                                  = new auditoriaallget();                    
                            curobj.Id                                               = (long)(dataReader.GetValue(0));
                            if(!dataReader.IsDBNull(1)){ curobj.Description         = (string)(dataReader.GetValue(1));}
                            if(!dataReader.IsDBNull(2)){ curobj.Code                = (string)(dataReader.GetValue(2));}
                            if(!dataReader.IsDBNull(3)){ curobj.SedeId              = (long)(dataReader.GetValue(3));}
                            if(!dataReader.IsDBNull(4)){ curobj.TipoId              = (long)(dataReader.GetValue(4));}
                            if(!dataReader.IsDBNull(5)){ curobj.StatusId            = (int)(dataReader.GetValue(5));}
                            if(!dataReader.IsDBNull(6)){ curobj.Inicio              = (DateTime)(dataReader.GetValue(6));}
                            if(!dataReader.IsDBNull(7)){ curobj.Fin                 = (DateTime)(dataReader.GetValue(7));}
                            if(!dataReader.IsDBNull(8)){ curobj.Created_By          = (string)(dataReader.GetValue(8)); }
                            if(!dataReader.IsDBNull(9)){ curobj.Created_Date        = (DateTime)(dataReader.GetValue(9));}
                            if(!dataReader.IsDBNull(10)){ curobj.Last_Updated_By     = (string)(dataReader.GetValue(10));}
                            if(!dataReader.IsDBNull(11)){ curobj.Last_Updated_Date   = (DateTime)(dataReader.GetValue(11));}
                            if(!dataReader.IsDBNull(12)){ curobj.ProgramaAuditoriaId = (long)(dataReader.GetValue(12));}
                            if(!dataReader.IsDBNull(13)){ curobj.StatusEvaluacionId  = (int)(dataReader.GetValue(13));}
                            if(!dataReader.IsDBNull(14)){ curobj.CodeSede             = (string)(dataReader.GetValue(14));}
                            if(!dataReader.IsDBNull(15)){ curobj.DescriptionSede      = (string)(dataReader.GetValue(15));}
                            if(!dataReader.IsDBNull(16)){ curobj.CodeTipoAuditoria    = (string)(dataReader.GetValue(16));}
                            if(!dataReader.IsDBNull(17)){ curobj.DescriptionAuditoria = (string)(dataReader.GetValue(17));}
                            if(!dataReader.IsDBNull(18)){ curobj.DescriptionStatus    = (string)(dataReader.GetValue(18));}
                            if(!dataReader.IsDBNull(19)){ curobj.CodeUnidadNegocio    = (string)(dataReader.GetValue(19));}
                            if(!dataReader.IsDBNull(20)){ curobj.UnidadNegocioId      = (long)(dataReader.GetValue(20));}
                            if(!dataReader.IsDBNull(21)){ curobj.DescriptionUnidadNegocio    = (string)(dataReader.GetValue(21));}
                            if(!dataReader.IsDBNull(22)){ curobj.DescriptionStatusEvaluacion = (string)(dataReader.GetValue(22));}
                            if(!dataReader.IsDBNull(26)){ curobj.Code_Normas          = (string)(dataReader.GetValue(26));}
                            if(!dataReader.IsDBNull(27)){ curobj.FechaCreacion        = (DateTime)(dataReader.GetValue(27));}
                            if(!dataReader.IsDBNull(28)){ curobj.CR        = (int)(dataReader.GetValue(28)); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Cant_Auditores"))) { curobj.Cant_Auditores = (int)(dataReader.GetValue(dataReader.GetOrdinal("Cant_Auditores"))); }
                            if(!dataReader.IsDBNull(30)){ curobj.Observacion        = (string)(dataReader.GetValue(30)); }

                            lobjs.Add(curobj);
                        }  
                    }  
                }
                conn.Close();    
                return lobjs;
            }
        }
        catch (Exception ex)
        {
            curobj              = new auditoriaallget();
            curobj.Id           = 0;           
            curobj.Code         = "nulo";
            curobj.Description  = System.Convert.ToString(ex.Message);
            lobjs.Add(curobj);
        }
        return lobjs;
    }

    
    public auditoriaallget funGetAuditoriaAll(ILogger log, int vnsearch_type
                                                              , long vnid
                                                              , string vvname
                                                            )
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit",EnvironmentVariableTarget.Process);
        //Lista de Objetos
        auditoriaallget curobj;
        string vvcomodin="";
        curobj = new auditoriaallget();
        //SQL Objects
        SqlDataReader dataReader;
        try{
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();    
                //Start - Manejo de Parametros
                if(vnsearch_type == 1)
                { vvcomodin= "%";   }                 
                var textselect = "SELECT A.Id, A.[Description], A.Code, A.SedeId, A.TipoId, A.StatusId, A.Inicio, A.Fin, A.Created_By, A.Created_Date, ";
                textselect = textselect +  "A.Last_Updated_By, A.Last_Updated_Date, A.ProgramaAuditoriaId, A.StatusEvaluacionId,";
                textselect = textselect +  "S.Code AS CodeSede, S.Description AS DescriptionSede, TA.Code AS CodeTipoAuditoria, TA.Description AS DescriptionAuditoria, ";
                textselect = textselect +  "SA.Description AS DescriptionStatus, UN.Code AS CodeUnidadNegocio, UN.Id AS UnidadNegocioId, UN.Description AS DescriptionUnidadNegocio, ";
                textselect = textselect +  "SEA.Description AS DescriptionStatusEvaluacion, A.Deleted_By, A.Deleted_Date, A.Deleted, ";
                textselect = textselect +  "(SELECT STUFF((SELECT ',' + CONVERT(VARCHAR(10), NormaCode) FROM [auditoria].Auditoria_Norma WHERE AuditoriaId = A.Id FOR xml path('')), 1, 1, '')) AS Code_Normas, ";
                textselect = textselect +  "A.Created_Date AS FechaCreacion ";
                textselect = textselect +  "FROM [auditoria].[Auditoria] A ";
                textselect = textselect +  "INNER JOIN [auditoria].Sede S ON S.Id = A.SedeId ";
                textselect = textselect +  "INNER JOIN [auditoria].Unidad_Negocio UN ON S.UnidadNegocioId = UN.Id ";
                textselect = textselect +  "INNER JOIN [auditoria].Tipo_Auditoria TA ON TA.Id = A.TipoId ";
                textselect = textselect +  "INNER JOIN [auditoria].Status_Auditoria SA ON SA.Id = A.StatusId ";
                textselect = textselect +  "LEFT JOIN [auditoria].Status_Evaluacion_Auditoria SEA ON SEA.Id = A.StatusEvaluacionId ";
                textselect = textselect +  "WHERE (A.Deleted IS NULL OR A.Deleted = 0) ";
                if(vnid != 0)
                {textselect = textselect +  String.Format(" AND A.[Id] = {0}",vnid);}                

                var StrQuery =  textselect;       
                //End - Manejo de Parametros
                log.LogInformation("StrQuery:"+StrQuery);
                //ShipDate < GetDate();
                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    //Ejecutar Comando
                    using (dataReader = cmd.ExecuteReader())  
                    {   
                        //Navegar en el Conjunto de Datos Recuperados
                        while (dataReader.Read())  
                        {
                            curobj                                                  = new auditoriaallget();                    
                            curobj.Id                                               = (long)(dataReader.GetValue(0));
                            if(!dataReader.IsDBNull(1)){ curobj.Description         = (string)(dataReader.GetValue(1));}
                            if(!dataReader.IsDBNull(2)){ curobj.Code                = (string)(dataReader.GetValue(2));}
                            if(!dataReader.IsDBNull(3)){ curobj.SedeId              = (long)(dataReader.GetValue(3));}
                            if(!dataReader.IsDBNull(4)){ curobj.TipoId              = (long)(dataReader.GetValue(4));}
                            if(!dataReader.IsDBNull(5)){ curobj.StatusId            = (int)(dataReader.GetValue(5));}
                            if(!dataReader.IsDBNull(6)){ curobj.Inicio              = (DateTime)(dataReader.GetValue(6));}
                            if(!dataReader.IsDBNull(7)){ curobj.Fin                 = (DateTime)(dataReader.GetValue(7));}
                            if(!dataReader.IsDBNull(8)){ curobj.Created_By          = (string)(dataReader.GetValue(8)); }
                            if(!dataReader.IsDBNull(9)){ curobj.Created_Date        = (DateTime)(dataReader.GetValue(9));}
                            if(!dataReader.IsDBNull(10)){ curobj.Last_Updated_By     = (string)(dataReader.GetValue(10));}
                            if(!dataReader.IsDBNull(11)){ curobj.Last_Updated_Date   = (DateTime)(dataReader.GetValue(11));}
                            if(!dataReader.IsDBNull(12)){ curobj.ProgramaAuditoriaId = (long)(dataReader.GetValue(12));}
                            if(!dataReader.IsDBNull(13)){ curobj.StatusEvaluacionId  = (int)(dataReader.GetValue(13));}
                            if(!dataReader.IsDBNull(14)){ curobj.CodeSede             = (string)(dataReader.GetValue(14));}
                            if(!dataReader.IsDBNull(15)){ curobj.DescriptionSede      = (string)(dataReader.GetValue(15));}
                            if(!dataReader.IsDBNull(16)){ curobj.CodeTipoAuditoria    = (string)(dataReader.GetValue(16));}
                            if(!dataReader.IsDBNull(17)){ curobj.DescriptionAuditoria = (string)(dataReader.GetValue(17));}
                            if(!dataReader.IsDBNull(18)){ curobj.DescriptionStatus    = (string)(dataReader.GetValue(18));}
                            if(!dataReader.IsDBNull(19)){ curobj.CodeUnidadNegocio    = (string)(dataReader.GetValue(19));}
                            if(!dataReader.IsDBNull(20)){ curobj.UnidadNegocioId      = (long)(dataReader.GetValue(20));}
                            if(!dataReader.IsDBNull(21)){ curobj.DescriptionUnidadNegocio    = (string)(dataReader.GetValue(21));}
                            if(!dataReader.IsDBNull(22)){ curobj.DescriptionStatusEvaluacion = (string)(dataReader.GetValue(22));}
                            if(!dataReader.IsDBNull(26)){ curobj.Code_Normas          = (string)(dataReader.GetValue(26));}
                            if(!dataReader.IsDBNull(27)){ curobj.FechaCreacion        = (DateTime)(dataReader.GetValue(27));}
                        }  
                    }  
                }
                conn.Close();    
                return curobj;
            }
        }
        catch (Exception ex)
        {
            curobj              = new auditoriaallget();                     
            curobj.Id           = 0;
 
        }
        return curobj;
    }
}

public class auditoriaallget
{
    public long Id {get; set;}     
    public string Code {get; set;} 
    public string Description {get; set;}
    public long SedeId {get; set;}     
    public long TipoId {get; set;}     
    public int StatusId {get; set;}     
    public DateTime Inicio {get; set;}
    public DateTime Fin {get; set;}
    public long ProgramaAuditoriaId {get; set;}
    public int StatusEvaluacionId { get; set; }
    public string CodeSede {get; set;}
    public string DescriptionSede {get; set;}
    public string CodeTipoAuditoria {get; set;}
    public string DescriptionAuditoria {get; set;}
    public string DescriptionStatus {get; set;}
    public string CodeUnidadNegocio {get; set;}
    public string DescriptionUnidadNegocio {get; set;}
    public long UnidadNegocioId { get; set; }
    public string DescriptionStatusEvaluacion {get; set;}
    public string Code_Normas {get; set;}
    public DateTime Fecha_Desde {get; set;}
    public DateTime Fecha_Hasta {get; set;}
    public DateTime FechaCreacion {get; set;}
    public string Created_By {get; set;}
    public DateTime Created_Date {get; set;}
    public string Last_Updated_By {get; set;}
    public DateTime Last_Updated_Date {get; set;}
    public string Deleted_By { get; set; } 
    public DateTime Deleted_Date { get; set; }
    public Boolean Deleted { get; set; }
    public int CR { get; set; }
    public int Cant_Auditores { get; set; }
    public string Observacion { get; set; }
}

public class Resp 
{
    public Boolean status {get;set;}
    public string message {get;set;}
}