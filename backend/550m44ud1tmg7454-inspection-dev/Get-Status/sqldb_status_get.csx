using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataStatusAll
{
    public List<statusall> funGetStatusAllList(ILogger log )
    {
        // log.LogInformation(str1);
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);
        //Lista de Objetos
        List<statusall> lobjs = new List<statusall>();
        statusall curobj;
        //SQL Objects
        SqlDataReader dataReader;
        try{
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();    
                //Start - Manejo de Parametros
            
                var textselect = "SELECT * from ssoma.Inspeccion_Status ";
                         
    
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
                            curobj                                                  = new statusall();                    
                            curobj.Id                                               = (int)(dataReader.GetValue(0));
                            if(!dataReader.IsDBNull(1)){ curobj.Description         = (string)(dataReader.GetValue(1));}
                            if(!dataReader.IsDBNull(2)){ curobj.Active          = (int)(dataReader.GetValue(2)); }
                                                                       
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
            curobj              = new statusall();
            curobj.Id           = 0;           
            curobj.Description  = System.Convert.ToString(ex.Message);
            curobj.Active         = 0;
            lobjs.Add(curobj);
        }
        return lobjs;
    }

   
}


public class statusall
{
    public int Id {get; set;}     
    public string Description {get; set;}
    public int Active {get; set;}

}