using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;
using System.Diagnostics;

class DataPlanAuditoriaLogAll
{
    public List<planAuditoriaLogAll> funGetPlanAuditoriaLogAllList(ILogger log, long vnPlanAuditoriaId)
    {
        // log.LogInformation(str1);
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit",EnvironmentVariableTarget.Process);
        //Lista de Objetos
        List<planAuditoriaLogAll> lobjs = new List<planAuditoriaLogAll>();
        planAuditoriaLogAll curobj      = new planAuditoriaLogAll();
        //string vvcomodin="";
        //SQL Objects
        SqlDataReader dataReader;
        try{
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();    
                //Start - Manejo de Parametros
                var textselect = "SELECT * FROM [auditoria].Plan_Auditoria_Log PAL WHERE 1=1 ";
                if(vnPlanAuditoriaId != 0)
                {textselect = textselect +  String.Format(" AND PAL.[PlanAuditoriaId] = {0} ", vnPlanAuditoriaId);}                
                /*if(vvcode != null)
                {textselect = textselect +  String.Format(" AND [Code] like '{0}'",vvcomodin+vvcode+vvcomodin);}
                if(vvdescription != null)
                {textselect = textselect +  String.Format(" AND [Description] like '{0}'",vvcomodin+vvdescription+vvcomodin);}
                if(vnactive != 0)
                {textselect = textselect +  String.Format(" AND [Active] = {0}",vnactive);}//*/
                textselect += " ORDER BY Id DESC";
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
                            curobj                                               = new planAuditoriaLogAll();                    
                            curobj.Id                                            = (long)(dataReader.GetValue(0));
                            if(!dataReader.IsDBNull(1)){ curobj.Data_Final       = (string)(dataReader.GetValue(1));}
                            if(!dataReader.IsDBNull(2)){ curobj.Data_Inicial     = (string)(dataReader.GetValue(2));}
                            if(!dataReader.IsDBNull(4)){ curobj.Created_Date     = (DateTime)(dataReader.GetValue(4));}
                            if(!dataReader.IsDBNull(5)){ curobj.PlanAuditoriaId  = (long)(dataReader.GetValue(5));}
                            if(!dataReader.IsDBNull(7)){ curobj.Motivo           = (string)(dataReader.GetValue(7));}
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
            planAuditoriaLogAll curobjEx  = new planAuditoriaLogAll();
            curobjEx.Id           = 0;           
            curobjEx.Motivo       = System.Convert.ToString(ex.Message);
            lobjs.Add(curobjEx);
        }
        return lobjs;
    }
}

public class planAuditoriaLogAll
{
    public long Id {get; set;}     
    public long PlanAuditoriaId {get; set;}     
    public string Data_Final {get; set;}
    public string Data_Inicial {get; set;}
    public string Motivo {get; set;} 
    public DateTime Created_Date {get; set;}
}