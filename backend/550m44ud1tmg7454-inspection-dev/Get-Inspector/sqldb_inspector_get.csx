using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataAccessInspector
{
    public List<Inspector> funGetInspectorList(ILogger log, long vnid
                                                , string vvperson_name
                                                , string vvhash_id
                                                , int vnperson_type
                                                , int vnrole
                                                , int vnarea_id
                                                , int vnunit_id
                                                , int vnsede_id
                                                , string vvarea_responsible) 
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);
        var vvsqlconnectionStringSec = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSecurity",EnvironmentVariableTarget.Process);
        
        List<Inspector> lobjs = new List<Inspector>();
        Inspector curobj;

        SqlDataReader dataReader;
        SqlDataReader dataReaderOS;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString)) 
        {
            conn.Open();

            var textselect = "SELECT ";
            textselect = textselect + " i.Id, ";
            textselect = textselect + " i.PersonName, ";
            textselect = textselect + " i.HashId, ";
            textselect = textselect + " i.PersonType, ";
            textselect = textselect + " i.Role, ";
            textselect = textselect + " i.AreaId, ";
            textselect = textselect + " i.Created_By, ";
            textselect = textselect + " i.Created_Date, ";
            textselect = textselect + " i.Last_Updated_By, ";
            textselect = textselect + " i.Last_Updated_Date, ";
            textselect = textselect + " a.Description, ";
            textselect = textselect + " un.Description, ";
            textselect = textselect + " i.SedeId, ";
            textselect = textselect + " s.Description, ";
            textselect = textselect + " i.Job, ";
            textselect = textselect + " i.AreaResponsible, ";
            textselect = textselect + " un.Address, ";
            textselect = textselect + " s.Code, ";
            textselect = textselect + " i.IdentityDocument, ";
            textselect = textselect + " un.Id, ";
            textselect = textselect + " un.Code, ";
            textselect = textselect + " i.Email ";
            //
            textselect = textselect + "FROM ssoma.Inspector i ";
            textselect = textselect + "LEFT JOIN auditoria.Sede s ON (s.Id = i.SedeId) ";
            textselect = textselect + "LEFT JOIN ssoma.Area a ON (i.AreaId = a.Id) ";
            textselect = textselect + "LEFT JOIN auditoria.Unidad_Negocio un ON (a.UnidadNegocioId=un.Id) ";
            textselect = textselect + "WHERE 1=1 AND i.Id NOT IN (35,36,37) ";

            if (vnid != 0) {
                textselect = textselect + String.Format(" AND i.[Id] = {0}",vnid);
            }
            if (vvperson_name != null) {
                textselect = textselect + String.Format(" AND i.[PersonName] like '%{0}%'",vvperson_name);
            }
            if (vvhash_id != null) {
                textselect = textselect + String.Format(" AND i.[HashId] = '{0}'",vvhash_id);
            }
            if (vnperson_type > 0) {
                textselect = textselect + String.Format(" AND i.[PersonType] = {0}",vnperson_type);
            }
            if (vnrole > 0) {
                textselect = textselect + String.Format(" AND i.[Role] = {0}",vnrole);
            }
            if (vnarea_id > 0) {
                textselect = textselect + String.Format(" AND i.[AreaId] = {0}",vnarea_id);
            }
            if (vnsede_id > 0) {
                textselect = textselect + String.Format(" AND i.[SedeId] = {0}",vnsede_id);
            }
            if (vnunit_id > 0) {
                textselect = textselect + String.Format(" AND un.[Id] = {0}",vnunit_id);
            }
            if (vvarea_responsible != null) {
                textselect = textselect + String.Format(" AND i.[AreaResponsible] = '{0}'",vvarea_responsible);
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
                        curobj = new Inspector();
                        curobj.Id = (long)(dataReader.GetValue(0));
                        if (!dataReader.IsDBNull(1)){ curobj.PersonName = (string)(dataReader.GetValue(1)); }
                        if (!dataReader.IsDBNull(2)){ curobj.HashId = (string)(dataReader.GetValue(2)); }
                        if (!dataReader.IsDBNull(3)){ curobj.PersonType = (int)(dataReader.GetValue(3)); }
                        if (!dataReader.IsDBNull(4)){ curobj.Role = (int)(dataReader.GetValue(4)); }
                        if (!dataReader.IsDBNull(5)){ curobj.AreaId = (int)(dataReader.GetValue(5)); }
                        if (!dataReader.IsDBNull(6)){ curobj.Created_By = (string)(dataReader.GetValue(6)); }
                        if (!dataReader.IsDBNull(7)){ curobj.Created_Date = (DateTime)(dataReader.GetValue(7)); }
                        if (!dataReader.IsDBNull(8)){ curobj.Last_Updated_By = (string)(dataReader.GetValue(8)); }
                        if (!dataReader.IsDBNull(9)){ curobj.Last_Updated_Date = (DateTime)(dataReader.GetValue(9)); }
                        if (!dataReader.IsDBNull(10)){ curobj.AreaName = (string)(dataReader.GetValue(10)); }
                        if (!dataReader.IsDBNull(11)){ curobj.UnitName = (string)(dataReader.GetValue(11)); }
                        if (!dataReader.IsDBNull(12)){ curobj.SedeId = (long)(dataReader.GetValue(12)); }
                        if (!dataReader.IsDBNull(13)){ curobj.SedeName = (string)(dataReader.GetValue(13)); }
                        if (!dataReader.IsDBNull(14)){ curobj.Job  = (string)(dataReader.GetValue(14)); }
                        if (!dataReader.IsDBNull(15)){ curobj.AreaResponsible  = (int)(dataReader.GetValue(15)); }
                        if (!dataReader.IsDBNull(16)){ curobj.UnitAddress  = (string)(dataReader.GetValue(16)); }
                        if (!dataReader.IsDBNull(17)){ curobj.SedeCode  = (string)(dataReader.GetValue(17)); }
                        if (!dataReader.IsDBNull(18)){ curobj.IdentityDocument  = (string)(dataReader.GetValue(18)); }
                        if (!dataReader.IsDBNull(19)){ curobj.UnitId  = (long)(dataReader.GetValue(19)); }
                        if (!dataReader.IsDBNull(20)){ curobj.UnitCode  = (string)(dataReader.GetValue(20)); }
                        if (!dataReader.IsDBNull(21)){ curobj.Email  = (string)(dataReader.GetValue(21)); }


                        using (SqlConnection connOS= new SqlConnection(vvsqlconnectionStringSec))
                        {
                        connOS.Open();  
                            var QueryOS = String.Format("SELECT ua.username, pa.firstname ,pa.lastname FROM security.user_all ua LEFT JOIN security.person_all pa ON (ua.person_id = pa.id ) WHERE ua.idhash = '{0}'",(string)(dataReader.GetValue(2)));
                            
                            //log.LogInformation(QueryOS);

                            using (SqlCommand cmdOS = new SqlCommand(QueryOS, connOS))
                            {  
                                //Ejecutar Comando
                                using (dataReaderOS = cmdOS.ExecuteReader())  
                                {   
                                //Navegar en el Conjunto de Datos Recuperados
                                    while (dataReaderOS.Read())  
                                    {   
                                        if(!dataReaderOS.IsDBNull(0)){ curobj.UserName  = (string)(dataReaderOS.GetValue(0)); }
                                        if(!dataReaderOS.IsDBNull(1)){ curobj.pName  = (string)(dataReaderOS.GetValue(1)); }
                                        if(!dataReaderOS.IsDBNull(2)){ curobj.lName  = (string)(dataReaderOS.GetValue(2)); }

                                    }
                                }
                            }

                        connOS.Close();    
                        }


                        lobjs.Add(curobj);
                    }
                }
            }
            conn.Close();
            return lobjs;
        }
    }

    public Inspector funGetInspector(ILogger log, long vnid, string vvhash_id) 
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);

        Inspector curobj = new Inspector();

        SqlDataReader dataReader;

        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString)) 
            {
                conn.Open();

                var textselect = "SELECT ";
                textselect = textselect + " i.Id, ";
                textselect = textselect + " i.PersonName, ";
                textselect = textselect + " i.HashId, ";
                textselect = textselect + " i.PersonType, ";
                textselect = textselect + " i.Role, ";
                textselect = textselect + " i.AreaId, ";

                textselect = textselect + " i.Created_By, ";
                textselect = textselect + " i.Created_Date, ";
                textselect = textselect + " i.Last_Updated_By, ";
                textselect = textselect + " i.Last_Updated_Date, ";
                textselect = textselect + " a.Description, ";
                textselect = textselect + " un.Description ,";
                textselect = textselect + " i.SedeId, ";
                textselect = textselect + " s.Description, ";
                textselect = textselect + " i.Job, ";
                textselect = textselect + " i.AreaResponsible, ";
                textselect = textselect + " un.Address, ";
                textselect = textselect + " s.Code, ";
                textselect = textselect + " i.IdentityDocument, ";
                textselect = textselect + " un.Id, ";
                textselect = textselect + " un.Code, ";
                textselect = textselect + " i.Email ";
                //
                textselect = textselect + "FROM ssoma.Inspector i ";
                textselect = textselect + "LEFT JOIN auditoria.Sede s ON (s.Id = i.SedeId) ";
                textselect = textselect + "LEFT JOIN ssoma.Area a ON (i.AreaId = a.Id) ";
                textselect = textselect + "LEFT JOIN auditoria.Unidad_Negocio un ON (a.UnidadNegocioId=un.Id) ";
                textselect = textselect + "WHERE 1=1 ";
                
                if (vnid > 0) {
                    textselect = textselect + String.Format(" AND i.[Id] = {0}",vnid);
                }

                if (vvhash_id != null) {
                    textselect = textselect + String.Format(" AND i.[HashId] = '{0}'",vvhash_id);
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
                            if (!dataReader.IsDBNull(1)){ curobj.PersonName = (string)(dataReader.GetValue(1)); }
                            if (!dataReader.IsDBNull(2)){ curobj.HashId = (string)(dataReader.GetValue(2)); }
                            if (!dataReader.IsDBNull(3)){ curobj.PersonType = (int)(dataReader.GetValue(3)); }
                            if (!dataReader.IsDBNull(4)){ curobj.Role = (int)(dataReader.GetValue(4)); }
                            if (!dataReader.IsDBNull(5)){ curobj.AreaId = (int)(dataReader.GetValue(5)); }
                            if (!dataReader.IsDBNull(6)){ curobj.Created_By = (string)(dataReader.GetValue(6)); }
                            if (!dataReader.IsDBNull(7)){ curobj.Created_Date = (DateTime)(dataReader.GetValue(7)); }
                            if (!dataReader.IsDBNull(8)){ curobj.Last_Updated_By = (string)(dataReader.GetValue(8)); }
                            if (!dataReader.IsDBNull(9)){ curobj.Last_Updated_Date = (DateTime)(dataReader.GetValue(9)); }
                            if (!dataReader.IsDBNull(10)){ curobj.AreaName = (string)(dataReader.GetValue(10)); }
                            if (!dataReader.IsDBNull(11)){ curobj.UnitName = (string)(dataReader.GetValue(11)); }
                            if (!dataReader.IsDBNull(12)){ curobj.SedeId = (long)(dataReader.GetValue(12)); }
                            if (!dataReader.IsDBNull(13)){ curobj.SedeName = (string)(dataReader.GetValue(13)); }
                            if (!dataReader.IsDBNull(14)){ curobj.Job  = (string)(dataReader.GetValue(14)); }
                            if (!dataReader.IsDBNull(15)){ curobj.AreaResponsible  = (int)(dataReader.GetValue(15)); }
                            if (!dataReader.IsDBNull(16)){ curobj.UnitAddress  = (string)(dataReader.GetValue(16)); }
                            if (!dataReader.IsDBNull(17)){ curobj.SedeCode  = (string)(dataReader.GetValue(17)); }
                            if (!dataReader.IsDBNull(18)){ curobj.IdentityDocument  = (string)(dataReader.GetValue(18)); }
                            if (!dataReader.IsDBNull(19)){ curobj.UnitId  = (long)(dataReader.GetValue(19)); }
                            if (!dataReader.IsDBNull(20)){ curobj.UnitCode  = (string)(dataReader.GetValue(20)); }
                            if (!dataReader.IsDBNull(21)){ curobj.Email  = (string)(dataReader.GetValue(21)); }

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

public class Inspector 
{
    public long Id {get;set;}
    public string PersonName {get;set;}
    public string HashId {get;set;}
    public int PersonType {get;set;}
    public int Role {get;set;}
    public int AreaId {get;set;}
    public long SedeId {get;set;}
    public string SedeCode {get;set;}
    public string AreaName {get;set;}
    public string UnitName {get;set;}
    public string UnitAddress {get;set;}
    public string SedeName {get;set;}
    public string Job {get;set;}
    public int AreaResponsible {get;set;}
    public long UnitId {get;set;}
    public string IdentityDocument {get;set;}
    public string UserName {get;set;}
    public string pName {get;set;}
    public string lName {get;set;}
    public string UnitCode {get;set;}
    public string Created_By {get;set;}
    public DateTime Created_Date {get;set;}
    public string Last_Updated_By {get;set;}
    public DateTime Last_Updated_Date {get;set;}
    public string Email {get;set;}
}
