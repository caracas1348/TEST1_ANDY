
using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataAccessUserSystemInformationAll
{
   

   public async Task<long> funPostUserSytemInformationAll(ILogger log, usersysteminformationall curentity
                                                       )
    {

     var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSecurity",EnvironmentVariableTarget.Process);
   
     //Lista de Objetos
     long newlongid;

     usersysteminformationall curobj;
     string vvcomodin="";

     curobj = new usersysteminformationall();
     log.LogInformation("Ingreso Metodo:");
    //SQL Objects
     SqlDataReader dataReader;
    
     //try{

     using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
     {log.LogInformation("Ingreso Metodo: antes open");
        conn.Open();    

       //Start - Manejo de Parametros

     log.LogInformation("Ingreso Metodo: luego de open");
       
       var textselectpart1 = "INSERT INTO security.user_system_information_all(  ";
       var textselectpart2 = " output INSERTED.ID VALUES( ";
       
        textselectpart1 = textselectpart1 + " created_by,created_date,last_updated_by,last_updated_date";
        textselectpart2 = textselectpart2 + " @created_by,@created_date,@last_updated_by,@last_updated_date";

       if( curentity.user_id != null && curentity.user_id > 0 )
       { textselectpart1 = textselectpart1 + ",user_id";
         textselectpart2 = textselectpart2 + ",@user_id";
       }
       if( curentity.userhash_id != null)
       { textselectpart1 = textselectpart1 + ",userhash_id";
         textselectpart2 = textselectpart2 + ",@userhash_id";
       }
       if( curentity.system_id != null && curentity.system_id > 0)
       { textselectpart1 = textselectpart1 + ",system_id";
         textselectpart2 = textselectpart2 + ",@system_id";
       }

       if( curentity.status != null )
       { textselectpart1 = textselectpart1 + ",status";
         textselectpart2 = textselectpart2 + ",@status";
       }
       



   
       
         textselectpart1 = textselectpart1 + " ) ";
         textselectpart2 = textselectpart2 + " ); ";

         log.LogInformation("5555555555555555555555555------------------------");

       var StrQuery =  textselectpart1 + textselectpart2;       
       //End - Manejo de Parametros

       log.LogInformation("StrQuery:"+StrQuery);


       //ShipDate < GetDate();
  
        using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
        {  


               if( curentity.user_id != null && curentity.user_id > 0) cmd.Parameters.AddWithValue("@user_id", curentity.user_id);
               if( curentity.userhash_id != null) cmd.Parameters.AddWithValue("@userhash_id", curentity.userhash_id);    
               if( curentity.system_id != null && curentity.system_id > 0) cmd.Parameters.AddWithValue("@system_id", curentity.system_id);
          
               if( curentity.status != null) cmd.Parameters.AddWithValue("@status", curentity.status);
 
     

               cmd.Parameters.AddWithValue("@created_by", curentity.created_by);
               cmd.Parameters.AddWithValue("@created_date", curentity.created_date);
               cmd.Parameters.AddWithValue("@last_updated_by", curentity.last_updated_by);
               cmd.Parameters.AddWithValue("@last_updated_date", curentity.last_updated_date);
 
   

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
 
   /* }
    catch (Exception ex)
    {
                        curobj = new usersysteminformationall();
                     
                        curobj.id           = 0;
                      
                        curobj.name = "nulo";
                        
               
                        

    }
  */

    return newlongid;

    }



 public usersysteminformationall funPutUserSystemInformationAll(ILogger log,long curid, usersysteminformationall curentity )
    {

     var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSecurity",EnvironmentVariableTarget.Process);
   
     //Lista de Objetos
     long newlongid;

     usersysteminformationall curobj;
     string vvcomodin="";

     curobj = curentity;

    //SQL Objects
     SqlDataReader dataReader;
    
     //try{

     using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
     {
        conn.Open();    

       //Start - Manejo de Parametros
 
            
       var textselectpart1 = "UPDATE security.user_system_information_all SET ";
       var textselectpart2 = " WHERE 1=1 AND id = @vncurid  ";
       
       textselectpart1 = textselectpart1 + " last_updated_by = @last_updated_by , last_updated_date = @last_updated_date ";      

       if( curentity.user_id != null && curentity.user_id > 0 )
       { textselectpart1 = textselectpart1 + ", user_id = @user_id ";   }
       if( curentity.userhash_id != null)
       { textselectpart1 = textselectpart1 + ", userhash_id = @userhash_id";  }
       if( curentity.system_id != null && curentity.system_id > 0)
       { textselectpart1 = textselectpart1 + ", system_id = @system_id";  }

 
       if( curentity.status != null)
       { textselectpart1 = textselectpart1 + ", status = @status";  }

      
         
         textselectpart2 = textselectpart2 + " ; ";

       var StrQuery =  textselectpart1 + textselectpart2;       
       //End - Manejo de Parametros

       log.LogInformation("StrQuery:"+StrQuery);
 
        using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
        {  
               cmd.Parameters.AddWithValue("@vncurid", curid);

               if( curentity.user_id != null && curentity.user_id > 0) cmd.Parameters.AddWithValue("@user_id", curentity.user_id);
               if( curentity.userhash_id != null) cmd.Parameters.AddWithValue("@userhash_id", curentity.userhash_id);
               if( curentity.system_id != null && curentity.system_id > 0) cmd.Parameters.AddWithValue("@system_id", curentity.system_id);
 
               if( curentity.status != null) cmd.Parameters.AddWithValue("@status", curentity.status);
        
               cmd.Parameters.AddWithValue("@last_updated_by", curentity.last_updated_by);
               cmd.Parameters.AddWithValue("@last_updated_date", curentity.last_updated_date);
 
                
               var modified = cmd.ExecuteNonQuery();           
               log.LogInformation("modified:"+modified);   
        }


      if (conn.State == System.Data.ConnectionState.Open) 
       conn.Close();    

       return curobj;       
    }
 
   /* }
    catch (Exception ex)
    {
                      curobj = new usersysteminformationall();
                      
                        curobj.id           = 0;
                        
                        curobj.name = "nulo";
                        
    }
  */

    return curobj;

    }




public long funDeleteUserSystemInformationAll(ILogger log,long curid  )
{

     var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSecurity",EnvironmentVariableTarget.Process);
   
     //Lista de Objetos
     long vnupdaterows = 0; 
     string vvcomodin="";

 

    //SQL Objects
     SqlDataReader dataReader;
    
     //try{

     using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
     {
        conn.Open();    

       //Start - Manejo de Parametros
       var textselectpart1 = "DELETE FROM security.user_system_information_all ";
       var textselectpart2 = " WHERE 1=1 AND id = @vncurid  ";
       
   
       textselectpart2 = textselectpart2 + " ; ";

       var StrQuery =  textselectpart1 + textselectpart2;       
       //End - Manejo de Parametros

       log.LogInformation("StrQuery:"+StrQuery);
 
        using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
        {  
               cmd.Parameters.AddWithValue("@vncurid", curid);
  
               var modified = cmd.ExecuteNonQuery();   
               vnupdaterows = Convert.ToInt64(modified);      
               log.LogInformation("DELETE:"+modified);   
               log.LogInformation("DELETE row:"+vnupdaterows);   
        }
      if (conn.State == System.Data.ConnectionState.Open) 
       conn.Close();    
       return vnupdaterows;
    }
    return vnupdaterows;

    }
}



public class usersysteminformationall
{
    public long id {get; set;}     
    public long user_id {get; set;} 
    public string userhash_id {get; set;} 
    public long system_id {get; set;}     
    public int status {get; set;} 
    public string status_txt {get; set;}     
    public string created_by {get; set;}
    public DateTime created_date {get; set;}
    public string last_updated_by {get; set;}
    public DateTime last_updated_date {get; set;}
}