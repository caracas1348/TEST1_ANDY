using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;
using System.Diagnostics;

class DataListaAsistenciaAll
{
    public List<listaasistencia> funGetListaAsistenciaAllList(ILogger log
                                                    , string vvUserIdHash
                                                    , long vnAuditoriaID
                                                    , long vnSedeId
                                                    , string vvNorma
                                                    , string vvCreated_Date
                                                    , string vvCreated_Date_End
                                                    )
    {
        log.LogInformation("Entro a la funcion en el modelo lista asistencia all. vvUserIdHash -> " +vvUserIdHash);
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit",EnvironmentVariableTarget.Process);
        //Lista de Objetos
        List<listaasistencia> lobjs = new List<listaasistencia>();
        listaasistencia curobj;
        //SQL Objects
        SqlDataReader dataReader;
        try{
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();    
                //Start - Manejo de Parametros
                var textselect = "SELECT la.Id, la.AuditoriaID, la.Code, la.Created_By, la.Created_Date, s.Description, ";
                textselect = textselect + "(SELECT STUFF((SELECT ',' + CONVERT(VARCHAR(10), NormaCode) FROM [auditoria].Auditoria_Norma WHERE AuditoriaId = a.Id FOR xml path('')), 1, 1, '')) AS Code_Normas ";
                textselect = textselect + " FROM [auditoria].Lista_Asistencia la ";
                textselect = textselect + " LEFT JOIN [auditoria].Auditoria a ON (a.Id = la.AuditoriaID) ";
                textselect = textselect + " LEFT JOIN [auditoria].Sede s ON (s.Id = a.SedeId) ";
                textselect = textselect + " LEFT JOIN [auditoria].Auditoria_Auditor aua ON (a.Id = aua.AuditoriaId AND aua.Tipo=1) ";
                textselect = textselect + " LEFT JOIN [auditoria].Auditor au ON (aua.AuditorId = au.Id) ";
                
                if (vvNorma != null)
                {
                    textselect = textselect + " LEFT JOIN [auditoria].Auditoria_Norma aun ON (aun.AuditoriaId = la.AuditoriaID) ";
                }
                textselect = textselect + " WHERE 1=1 ";
                if (vnAuditoriaID > 0)
                { textselect = textselect + String.Format(" AND la.[AuditoriaID] = {0} ", vnAuditoriaID); }
                if (vvUserIdHash != "") //AND au.UserIdhash = 'user-keyid-4147'
                { textselect = textselect + String.Format(" AND au.UserIdhash = '{0}' ", vvUserIdHash); }
                if (vnSedeId > 0)
                { textselect = textselect + String.Format(" AND a.[SedeId] = {0} ", vnSedeId); }
                if (vvNorma != null)  //aun.[NormaCode] like ('%BASC%')
                { textselect = textselect + String.Format(" AND aun.[NormaCode] LIKE ('%{0}%') ", vvNorma); }
                if (vvCreated_Date != null)
                {
                    textselect = textselect + String.Format(" AND CAST(la.[Created_Date] AS DATE) >= '{0}'", vvCreated_Date);
                }
                if (vvCreated_Date_End != null)
                {
                    textselect = textselect + String.Format(" AND CAST(la.[Created_Date] AS DATE) <= '{0}'", vvCreated_Date_End);
                }  

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
                            curobj                                                  = new listaasistencia();                    
                            curobj.Id                                               = (long)(dataReader.GetValue(0));
                            if(!dataReader.IsDBNull(1)){ curobj.AuditoriaID           = (long)(dataReader.GetValue(1));}
                            if(!dataReader.IsDBNull(2)){ curobj.Code         	= (string)(dataReader.GetValue(2));}
                            if(!dataReader.IsDBNull(3)){ curobj.Created_By        	= (string)(dataReader.GetValue(3));}
                            if(!dataReader.IsDBNull(4)){ curobj.Created_Date        = (DateTime)(dataReader.GetValue(4));}
                            if(!dataReader.IsDBNull(5)){ curobj.SedeDescription       = (string)(dataReader.GetValue(5));}
                            if(!dataReader.IsDBNull(6)){ curobj.CodeNormas      = (string)(dataReader.GetValue(6));}

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
            curobj              = new listaasistencia();
            curobj.Id           = 0;           
            curobj.AuditoriaID  = 0;
            curobj.Code = System.Convert.ToString(ex.Message);
            lobjs.Add(curobj);
        }
        return lobjs;
    }

    public listaasistencia funGetListaAsistenciaAll(ILogger log, int vnsearch_type
                                                              , long vnid
                                                            )
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit",EnvironmentVariableTarget.Process);
        //Lista de Objetos
        listaasistencia curobj;
        string vvcomodin="";
        curobj = new listaasistencia();
        //SQL Objects
        SqlDataReader dataReader;
        try{
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();    
                //Start - Manejo de Parametros
                if(vnsearch_type == 1)
                { vvcomodin= "%";   }                 
                var textselect = "SELECT la.Id, la.AuditoriaID, la.Code, la.Created_By, la.Created_Date, s.Description, ";
                textselect = textselect + "(SELECT STUFF((SELECT ',' + CONVERT(VARCHAR(10), NormaCode) FROM [auditoria].Auditoria_Norma WHERE AuditoriaId = a.Id FOR xml path('')), 1, 1, '')) AS Code_Normas,a.Inicio,a.Fin ";
                textselect = textselect + " FROM [auditoria].Lista_Asistencia la ";
                textselect = textselect + " LEFT JOIN [auditoria].Auditoria a ON (a.Id = la.AuditoriaID) ";
                textselect = textselect + " LEFT JOIN [auditoria].Sede s ON (s.Id = a.SedeId) ";
                textselect = textselect + " WHERE (A.Deleted IS NULL OR A.Deleted = 0) ";
                if(vnid != 0)
                {textselect = textselect +  String.Format(" AND la.[Id] = {0}",vnid);}                

                var StrQuery =  textselect;       
                //End - Manejo de Parametros
                log.LogInformation("StrQuery:"+StrQuery);

                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    //Ejecutar Comando
                    using (dataReader = cmd.ExecuteReader())  
                    {   
                        //Navegar en el Conjunto de Datos Recuperados
                        while (dataReader.Read())  
                        {
                            curobj                                                  = new listaasistencia();                    
                            curobj.Id                                               = (long)(dataReader.GetValue(0));
                            if(!dataReader.IsDBNull(1)){ curobj.AuditoriaID           = (long)(dataReader.GetValue(1));}
                            if(!dataReader.IsDBNull(2)){ curobj.Code         	= (string)(dataReader.GetValue(2));}
                            if(!dataReader.IsDBNull(3)){ curobj.Created_By        	= (string)(dataReader.GetValue(3));}
                            if(!dataReader.IsDBNull(4)){ curobj.Created_Date        = (DateTime)(dataReader.GetValue(4));}
                            if(!dataReader.IsDBNull(5)){ curobj.SedeDescription       = (string)(dataReader.GetValue(5));}
                            if(!dataReader.IsDBNull(6)){ curobj.CodeNormas      = (string)(dataReader.GetValue(6));}
                            if(!dataReader.IsDBNull(7)){ curobj.AuditoriaInicio   = (DateTime)(dataReader.GetValue(7));}
                            if(!dataReader.IsDBNull(8)){ curobj.AuditoriaFin      = (DateTime)(dataReader.GetValue(8));}
                        }  
                    }  
                }
                conn.Close();    
                return curobj;
            }
        }
        catch (Exception ex)
        {
            curobj              = new listaasistencia();                     
            curobj.Id           = 0;
 
        }
        return curobj;
    }

}

public class listaasistencia
{
    public long Id {get; set;}
    public long AuditoriaID {get; set;}
    public string Code {get; set;}
    public string Created_By {get; set;}
    public DateTime Created_Date {get; set;}
    public string SedeDescription {get; set;}
    public string CodeNormas {get; set;}
    public DateTime AuditoriaInicio {get; set;}
    public DateTime AuditoriaFin {get; set;}
    public List<asistente> Asistentes {get;set;}
}