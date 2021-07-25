using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;
using System.Diagnostics;

class DataTipo_HallazgosAll
{
    public List<tipo_hallazgosall> funGetTipoHallazgoAllList(ILogger log)
    {
        // log.LogInformation(str1);
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit",EnvironmentVariableTarget.Process);
        //Lista de Objetos
        List<tipo_hallazgosall> lobjs = new List<tipo_hallazgosall>();
        tipo_hallazgosall curobj      = new tipo_hallazgosall();
        //string vvcomodin="";
        //SQL Objects
        SqlDataReader dataReader;
        try{
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();    
                //Start - Manejo de Parametros
                var textselect = "SELECT * FROM auditoria.Tipo_Hallazgo WHERE (Deleted IS NULL OR Deleted = 0) ";
                /*if(vnid != 0)
                {textselect = textselect +  String.Format(" AND [Id] = {0}",vnid);}                
                if(vvcode != null)
                {textselect = textselect +  String.Format(" AND [Code] like '{0}'",vvcomodin+vvcode+vvcomodin);}
                if(vvdescription != null)
                {textselect = textselect +  String.Format(" AND [Description] like '{0}'",vvcomodin+vvdescription+vvcomodin);}
                if(vnactive != 0)
                {textselect = textselect +  String.Format(" AND [Active] = {0}",vnactive);}//*/
                
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
                            curobj                                                  = new tipo_hallazgosall();                    
                            curobj.Id                                               = (long)(dataReader.GetValue(0));
                            if(!dataReader.IsDBNull(1)){ curobj.Description         = (string)(dataReader.GetValue(1));}
                            if(!dataReader.IsDBNull(2)){ curobj.Code                = (string)(dataReader.GetValue(2));}
                            //if(!dataReader.IsDBNull(3)){ curobj.Active              = (int)(dataReader.GetValue(3));}
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
            tipo_hallazgosall curobjEx              = new tipo_hallazgosall();
            curobjEx.Id           = 0;           
            curobjEx.Code         = "nulo";
            curobjEx.Description  = System.Convert.ToString(ex.Message);
            lobjs.Add(curobjEx);
        }
        return lobjs;
    }
}

public class tipo_hallazgosall
{
    public long Id {get; set;}     
    public string Description {get; set;}
    public string Code {get; set;} 
}