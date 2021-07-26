using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataNormaAll
{
   
    public async Task<long> funPostNormaAll(ILogger log, normaall curentity)
    {

        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit",EnvironmentVariableTarget.Process);
   
        //Lista de Objetos
        long newlongid;

        normaall curobj;
        string vvcomodin="";

        curobj = new normaall();
        log.LogInformation("Ingreso Metodo:");
        //SQL Objects
        SqlDataReader dataReader;
    
        try{
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                log.LogInformation("Ingreso Metodo: antes open");
                conn.Open();    

                //Start - Manejo de Parametros

                log.LogInformation("Ingreso Metodo: luego de open");
                
                var textselectpart1 = "INSERT INTO auditoria.Norma (  ";
                var textselectpart2 = " output INSERTED.ID VALUES( ";
                
                // textselectpart1 = textselectpart1 + " Created_By,Created_Date,Last_Updated_By,Last_Updated_Date";
                // textselectpart2 = textselectpart2 + " @Created_By,@Created_Date,@Last_Updated_By,@Last_Updated_Date";

                if( curentity.Id !=0)
                { textselectpart1 = textselectpart1 + ",Id"; 
                    textselectpart2 = textselectpart2 + ",@Id";
                }
                if( curentity.Code != null)
                { textselectpart1 = textselectpart1 + ",Code";
                    textselectpart2 = textselectpart2 + ",@Code";
                }
                if( curentity.Description != null)
                { textselectpart1 = textselectpart1 + ",Description";
                    textselectpart2 = textselectpart2 + ",@Description";
                }
                if( curentity.Active !=0)
                { textselectpart1 = textselectpart1 + ",Active"; 
                    textselectpart2 = textselectpart2 + ",@Active";
                }
                if( curentity.EspecialidadId !=0)
                { textselectpart1 = textselectpart1 + ",EspecialidadId"; 
                    textselectpart2 = textselectpart2 + ",@EspecialidadId";
                }
                textselectpart1 = textselectpart1 + " ) ";
                textselectpart2 = textselectpart2 + " ); ";

                var StrQuery =  textselectpart1 + textselectpart2;       
                //End - Manejo de Parametros

                log.LogInformation("StrQuery:"+StrQuery);

                //ShipDate < GetDate();
            
                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {  
                    if( curentity.Id !=0) cmd.Parameters.AddWithValue("@Id", curentity.Id);
                    if( curentity.Code != null) cmd.Parameters.AddWithValue("@Code", curentity.Code);
                    if( curentity.Description != null ) cmd.Parameters.AddWithValue("@Description", curentity.Description);
                    if( curentity.Active !=0) cmd.Parameters.AddWithValue("@Active", curentity.Active);
                    if( curentity.EspecialidadId !=0) cmd.Parameters.AddWithValue("@EspecialidadId", curentity.EspecialidadId);

                    // cmd.Parameters.AddWithValue("@Created_By", curentity.Created_By);
                    // cmd.Parameters.AddWithValue("@Created_Date", curentity.Created_Date);
                    // cmd.Parameters.AddWithValue("@Last_Updated_By", curentity.Last_Updated_By);
                    // cmd.Parameters.AddWithValue("@Last_Updated_Date", curentity.Last_Updated_Date);
                    //long modified =(long)cmd.ExecuteScalar();
                    var modified = await cmd.ExecuteScalarAsync(); 
                    //curentity.id = Convert.ToInt64(modified);
                    newlongid = Convert.ToInt64(modified);
                    log.LogInformation("modified:"+modified);
                }
                if (conn.State == System.Data.ConnectionState.Open) 
                conn.Close();    

                //  return curobj;
                return newlongid;
            }
 
        }
        catch (Exception ex)
        {
            /*curobj              = new especialidadall();        
            curobj.Id           = 0;
            curobj.Code         = "Null";
            curobj.Description  = System.Convert.ToString(ex.Message);*/
            log.LogInformation("catch::"+ex.Message);
            //System.Convert.ToString(ex.Message);
            newlongid  = -1;
        }
        return newlongid;
    }


    
    public normaall funPutNormaAll(ILogger log,long curid, normaall curentity )
    {

     var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit",EnvironmentVariableTarget.Process);
   
     //Lista de Objetos
     long newlongid;

     normaall curobj;
     string vvcomodin="";
     curobj = curentity;

    //SQL Objects
     SqlDataReader dataReader;
    try{
     using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
     {
        conn.Open();    

       //Start - Manejo de Parametros
       var textselectpart1 = "UPDATE auditoria.Norma SET ";
       var textselectpart2 = " WHERE 1=1 AND Id = @Id  ";
       //textselectpart1 = textselectpart1 + " Last_Updated_By = @Last_Updated_By , Last_Updated_Date = @Last_Updated_Date ";      

       if( curentity.Id != 0)
       { textselectpart1 = textselectpart1 + ", Id = @Id ";  }
       if( curentity.Code != null)
       { textselectpart1 = textselectpart1 + ", Code = @Code";  }
       if( curentity.Description != null )
       { textselectpart1 = textselectpart1 + ", Description = @Description";  }
       if( curentity.Active != 0)
       { textselectpart1 = textselectpart1 + ", Active = @Active ";  }
       if( curentity.EspecialidadId != 0)
       { textselectpart1 = textselectpart1 + ", EspecialidadId = @EspecialidadId ";  }
       textselectpart2 = textselectpart2 + " ; ";

       var StrQuery =  textselectpart1 + textselectpart2;       
       //End - Manejo de Parametros

       log.LogInformation("StrQuery:"+StrQuery);
 
        using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
        {  
               cmd.Parameters.AddWithValue("@Id", curid);

               if( curentity.Code != null) cmd.Parameters.AddWithValue("@Code", curentity.Code);
               if( curentity.Description != null) cmd.Parameters.AddWithValue("@Description", curentity.Description);
               cmd.Parameters.AddWithValue("@Active", curentity.Active);
               cmd.Parameters.AddWithValue("@EspecialidadId", curentity.EspecialidadId);

            //    cmd.Parameters.AddWithValue("@Last_Updated_By", curentity.Last_Updated_By);
            //    cmd.Parameters.AddWithValue("@Last_Updated_Date", curentity.Last_Updated_Date);

               var modified = cmd.ExecuteNonQuery();           
               log.LogInformation("modified:"+modified);    
        }

      if (conn.State == System.Data.ConnectionState.Open) 
       conn.Close();    
       return curobj;       
    }
   }
    catch (Exception ex)
    {
            log.LogInformation("catch:"+ex.Message);
            newlongid  = -1;
    }
    return curobj;
}




public long funDeleteNormaAll(ILogger log,long curid, string usuariodelete)
{

     var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit",EnvironmentVariableTarget.Process);
   
     //Lista de Objetos
     long vnupdaterows = 0; 
     string vvcomodin="";
     DateTime Deleted_Date = DateTime.Now;

 

    //SQL Objects
     SqlDataReader dataReader;
    
    try{

     using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
     {
        conn.Open();    

       //Start - Manejo de Parametros
       var textselectpart1 = "UPDATE auditoria.Norma ";
       textselectpart1 = textselectpart1 + " SET Deleted_By = '" + usuariodelete + "' , Deleted_Date = '" + Deleted_Date.ToString() + "' , Deleted = 1 ";
       var textselectpart2 = " WHERE 1=1 AND id = @vncurid  ";

       var StrQuery =  textselectpart1 + textselectpart2;       
       //End - Manejo de Parametros

       log.LogInformation("StrQuery:"+StrQuery);
 
        using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
        {  
               cmd.Parameters.AddWithValue("@vncurid", curid);

               //cmd.Parameters.AddWithValue("@vvdeletedby", deletedby);
  
               var modified = cmd.ExecuteNonQuery();   
               vnupdaterows = Convert.ToInt64(modified);      
               log.LogInformation("DELETE:"+modified);   
               log.LogInformation("DELETE row:"+vnupdaterows);   
        }


      if (conn.State == System.Data.ConnectionState.Open) 
       conn.Close();    

       return vnupdaterows;
       
    }
 
    }
    catch (Exception ex)
    {
        normaall curobj = new normaall();
        curobj.Id = 0;
    }
    return vnupdaterows;
    }
}


public class normaall
{
    public long Id {get; set;}     
    public string Code {get; set;} 
    public string Description {get; set;}
    public int Active {get; set;} 
    public long EspecialidadId {get; set;}
    public string Created_By {get; set;}
    public DateTime Created_Date {get; set;}
    public string Last_Updated_By {get; set;}
    public DateTime Last_Updated_Date {get; set;}
    public string Deleted_By { get; set; } 
    public DateTime Deleted_Date { get; set; }
    public Boolean Deleted { get; set; }
}