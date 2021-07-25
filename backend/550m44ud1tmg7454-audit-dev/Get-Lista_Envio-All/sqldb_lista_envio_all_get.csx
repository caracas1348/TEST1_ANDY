using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;
using System.Diagnostics;

class DataListaEnvioAll
{
    public List<listaenvioall> funGetListaEnvioAllList(ILogger log
                                                    , long vnIdPlanAuditoria
                                                    )
    {
        log.LogInformation("Entro a la funcion en el modelo");
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit",EnvironmentVariableTarget.Process);
        //Lista de Objetos
        List<listaenvioall> lobjs = new List<listaenvioall>();
        listaenvioall curobj;
        //SQL Objects
        SqlDataReader dataReader;
        try{
        log.LogInformation("Entro al try "+vnIdPlanAuditoria);
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();    
                //Start - Manejo de Parametros
                var textselect = "SELECT LE.Id, LE.UserIdHash, LE.Send_By, LE.Send_Date, LE.Persona_Name, LE.Persona_Cargo, LE.Persona_Correo, LE.PlanAuditoriaId ";
                textselect = textselect + " FROM [auditoria].ListaEnvio LE ";
                textselect = textselect + " WHERE  (LE.Deleted IS NULL OR LE.Deleted = 0) ";
                if(vnIdPlanAuditoria != 0)
                {textselect = textselect +  String.Format(" AND LE.[PlanAuditoriaId] = {0} ",vnIdPlanAuditoria);}                
                
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
                            curobj                                                  = new listaenvioall();                    
                            curobj.Id                                               = (long)(dataReader.GetValue(0));
                            if(!dataReader.IsDBNull(1)){ curobj.UserIdHash          = (string)(dataReader.GetValue(1));}
                            if(!dataReader.IsDBNull(2)){ curobj.Send_By         	= (string)(dataReader.GetValue(2));}
                            if(!dataReader.IsDBNull(3)){ curobj.Send_Date        	= (DateTime)(dataReader.GetValue(3));}
                            if(!dataReader.IsDBNull(4)){ curobj.Persona_Name        = (string)(dataReader.GetValue(4));}
                            if(!dataReader.IsDBNull(5)){ curobj.Persona_Cargo       = (string)(dataReader.GetValue(5));}
                            if(!dataReader.IsDBNull(6)){ curobj.Persona_Correo      = (string)(dataReader.GetValue(6));}
                            if(!dataReader.IsDBNull(7)){ curobj.PlanAuditoriaId     = (long)(dataReader.GetValue(7));}
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
            curobj              = new listaenvioall();
            curobj.Id           = 0;           
            curobj.Send_By      = "nulo";
            curobj.Persona_Name = System.Convert.ToString(ex.Message);
            lobjs.Add(curobj);
        }
        return lobjs;
    }
}

public class listaenvioall
{
    public long Id {get; set;}
    public string UserIdHash {get; set;}
    public string Send_By {get; set;}
    public DateTime Send_Date {get; set;}
    public int Deleted { get; set; }
    public string Persona_Name {get; set;}
    public string Persona_Cargo {get; set;}
    public string Persona_Correo {get; set;}
    public long PlanAuditoriaId {get; set;}
}