using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;
using System.Diagnostics;

class DataSedeAll
{
    public List<sedeall> funGetSedeAllList(ILogger log, int vnsearch_type
                                                    , long vnid
                                                    , string vvcode
                                                    , string vvdescription
                                                    , long vnunidadnegocioid
                                                    , int vnactive
                                                    // , string vvcreated_by
                                                    // , string vvcreated_date
                                                    // , string vvlast_updated_by
                                                    // , string vvlast_updated_date
                                                    )
    {
        // log.LogInformation(str1);
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit",EnvironmentVariableTarget.Process);
        //Lista de Objetos
        List<sedeall> lobjs = new List<sedeall>();
        sedeall curobj;
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
                var textselect = "SELECT S.Id, S.Description, S.Code, S.UnidadNegocioId, S.Active, ";
                textselect = textselect + "U.Code AS CodeUnidadNegocio, U.Description AS DescriptionUnidadNegocio ";
                textselect = textselect + " FROM auditoria.Sede S ";
                textselect = textselect + " INNER JOIN [auditoria].Unidad_Negocio U ON S.UnidadNegocioId = U.Id ";
                textselect = textselect + " WHERE (S.Deleted IS NULL OR S.Deleted = 0) ";
                if(vnid != 0)
                {textselect = textselect +  String.Format(" AND S.[Id] = {0}",vnid);}                
                if(vvcode != null)
                {textselect = textselect +  String.Format(" AND S.[Code] like '{0}'",vvcomodin+vvcode+vvcomodin);}
                if(vvdescription != null)
                {textselect = textselect +  String.Format(" AND S.[Description] like '{0}'",vvcomodin+vvdescription+vvcomodin);}
                if(vnunidadnegocioid != 0)
                {textselect = textselect +  String.Format(" AND S.[UnidadNegocioId] = {0}",vnunidadnegocioid);}                
                if(vnactive != 0)
                {textselect = textselect +  String.Format(" AND S.[Active] = {0}",vnactive);}
                // if(vvcreated_by != null )
                // {textselect = textselect +  String.Format(" AND [Created_By] = '{0}'",vvcreated_by);}                                     
                // if(vvcreated_date != null)
                // {textselect = textselect +  String.Format(" AND [Created_Date] >= '{0}'",vvcreated_date);}
                // if(vvlast_updated_by != null )
                // {textselect = textselect +  String.Format(" AND [Last_Updated_By] = '{0}'",vvlast_updated_by);}
                // if(vvlast_updated_date != null)
                // {textselect = textselect +  String.Format(" AND [Last_Updated_Date] >= '{0}'",vvlast_updated_date);}
                textselect = textselect + " ORDER BY S.Description ASC";
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
                            curobj                                                       = new sedeall();                    
                            curobj.Id                                                    = (long)(dataReader.GetValue(0));
                            if(!dataReader.IsDBNull(1)){ curobj.Code                     = (string)(dataReader.GetValue(1));}
                            if(!dataReader.IsDBNull(2)){ curobj.Description              = (string)(dataReader.GetValue(2));}
                            if(!dataReader.IsDBNull(3)){ curobj.UnidadNegocioId          = (long)(dataReader.GetValue(3));}
                            if(!dataReader.IsDBNull(4)){ curobj.Active                   = (int)(dataReader.GetValue(4));}
                            if(!dataReader.IsDBNull(5)){ curobj.CodeUnidadNegocio        = (string)(dataReader.GetValue(5));}
                            if(!dataReader.IsDBNull(6)){ curobj.DescriptionUnidadNegocio = (string)(dataReader.GetValue(6));}

                            // if(!dataReader.IsDBNull(4)){ curobj.Created_By          = (string)(dataReader.GetValue(4)); }
                            // if(!dataReader.IsDBNull(5)){ curobj.Created_Date        = (DateTime)(dataReader.GetValue(5));}
                            // if(!dataReader.IsDBNull(6)){ curobj.Last_Updated_By    = (string)(dataReader.GetValue(6));}
                            // if(!dataReader.IsDBNull(7)){ curobj.Last_Updated_Date  = (DateTime)(dataReader.GetValue(7));}                                               
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
            curobj              = new sedeall();
            curobj.Id           = 0;           
            curobj.Code         = "nulo";
            curobj.Description  = System.Convert.ToString(ex.Message);
            lobjs.Add(curobj);
        }
        return lobjs;
    }

    /*
    public garitaall funGetGaritaAll(ILogger log, int vnsearch_type
                                                              , long vnid
                                                              , string vvname
                                                            )
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAccessRequest",EnvironmentVariableTarget.Process);
        //Lista de Objetos
        garitaall curobj;
        string vvcomodin="";
        curobj = new garitaall();
        //SQL Objects
        SqlDataReader dataReader;
        try{
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();    
                //Start - Manejo de Parametros
                if(vnsearch_type == 1)
                { vvcomodin= "%";   }        
                var textselect = "SELECT * from accessrequest.area_all WHERE 1 = 1 ";       
                if(vnid != null)
                {textselect = textselect +  String.Format(" AND [id] = {0}",vnid);}
                if(vvname != null)
                {textselect = textselect +  String.Format(" AND [name] like '{0}'",vvname);}
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
                            curobj                                                  = new garitaall();
                            curobj.id                                               = (long)(dataReader.GetValue(0));
                            curobj.id_location                                      = (long)(dataReader.GetValue(1));
                            if(!dataReader.IsDBNull(2)){ curobj.name                = (string)(dataReader.GetValue(2));}
                            if(!dataReader.IsDBNull(3)){ curobj.description         = (string)(dataReader.GetValue(3));}
                            if(!dataReader.IsDBNull(4)){ curobj.created_by          = (string)(dataReader.GetValue(4)); }
                            if(!dataReader.IsDBNull(5)){ curobj.created_date        = (DateTime)(dataReader.GetValue(5)); }
                            if(!dataReader.IsDBNull(6)){ curobj.last_updated_by     = (string)(dataReader.GetValue(6)); }
                            if(!dataReader.IsDBNull(7)){ curobj.last_updated_date   = (DateTime)(dataReader.GetValue(7)); }
                            if(!dataReader.IsDBNull(8)){ curobj.attribute1          = (string)(dataReader.GetValue(8)); }
                            if(!dataReader.IsDBNull(9)){ curobj.attribute2          = (string)(dataReader.GetValue(9));}
                            if(!dataReader.IsDBNull(10)){ curobj.attribute3         = (string)(dataReader.GetValue(10));}
                            if(!dataReader.IsDBNull(11)){ curobj.attribute4         = (string)(dataReader.GetValue(11));}
                            if(!dataReader.IsDBNull(12)){ curobj.attribute5         = (string)(dataReader.GetValue(12));} 
                            if(!dataReader.IsDBNull(13)){ curobj.attribute5         = (string)(dataReader.GetValue(13));}
                        }  
                    }  
                }
                conn.Close();    
                return curobj;
            }
        }
        catch (Exception ex)
        {
            curobj              = new garitaall();                     
            curobj.id           = 0;
            curobj.id_location  = 0; 
            curobj.name         = "nulo"; 
            curobj.description  = "nulo"; 
        }
        return curobj;
    }*/
}

public class sedeall
{
    public long Id {get; set;}     
    public string Code {get; set;} 
    public string Description {get; set;}
    public long UnidadNegocioId {get; set;}
    public string CodeUnidadNegocio {get; set;}
    public string DescriptionUnidadNegocio {get; set;}
    public int Active {get; set;}     
    public string Created_By {get; set;}
    public DateTime Created_Date {get; set;}
    public string Last_Updated_By {get; set;}
    public DateTime Last_Updated_Date {get; set;}
    public string Deleted_By { get; set; } 
    public DateTime Deleted_Date { get; set; }
    public Boolean Deleted { get; set; }
}