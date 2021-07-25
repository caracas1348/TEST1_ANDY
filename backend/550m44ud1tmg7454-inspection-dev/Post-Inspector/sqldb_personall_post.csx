
using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataAccessPersonAll
{
   

   public async Task<long> funPostPersonAll(ILogger log, personall curentity
                                                       )
    {

     var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSecurity",EnvironmentVariableTarget.Process);
   
     //Lista de Objetos
     long newlongid;

     personall curobj;
     string vvcomodin="";

     curobj = new personall();
     log.LogInformation("Ingreso Metodo:");
    //SQL Objects
     SqlDataReader dataReader;
    
     //try{

     using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
     {log.LogInformation("Ingreso Metodo: antes open");
        conn.Open();    

       //Start - Manejo de Parametros

     log.LogInformation("Ingreso Metodo: luego de open");
       
       var textselectpart1 = "INSERT INTO security.person_all(  ";
       var textselectpart2 = " output INSERTED.ID VALUES( ";
       
        textselectpart1 = textselectpart1 + " created_by,created_date,last_updated_by,last_updated_date,start_date";
        textselectpart2 = textselectpart2 + " @created_by,@created_date,@last_updated_by,@last_updated_date,@start_date";

       if( curentity.identity_document != null)
       { textselectpart1 = textselectpart1 + ",identity_document";
         textselectpart2 = textselectpart2 + ",@identity_document";
       }
       if( curentity.firstname != null)
       { textselectpart1 = textselectpart1 + ",firstname";
         textselectpart2 = textselectpart2 + ",@firstname";
       }
       if( curentity.lastname != null)
       { textselectpart1 = textselectpart1 + ",lastname";
         textselectpart2 = textselectpart2 + ",@lastname";
       }

       if( curentity.identity_document_type != null)
       { textselectpart1 = textselectpart1 + ",identity_document_type";
         textselectpart2 = textselectpart2 + ",@identity_document_type";
       }
       if( curentity.country != null)
       { textselectpart1 = textselectpart1 + ",country";
         textselectpart2 = textselectpart2 + ",@country";
       }
       if( curentity.city != null)
       { textselectpart1 = textselectpart1 + ",city";
         textselectpart2 = textselectpart2 + ",@city";
       }
       if( curentity.department != null)
       { textselectpart1 = textselectpart1 + ",department";
         textselectpart2 = textselectpart2 + ",@department";
       }
       if( curentity.job != null)
       { textselectpart1 = textselectpart1 + ",job";
         textselectpart2 = textselectpart2 + ",@job";
       }
       if( curentity.office != null)
       { textselectpart1 = textselectpart1 + ",office";
         textselectpart2 = textselectpart2 + ",@office";
       }       
       if( curentity.street_address != null)
       { textselectpart1 = textselectpart1 + ",street_address";
         textselectpart2 = textselectpart2 + ",@street_address";
       }
       if( curentity.mobile != null)
       { textselectpart1 = textselectpart1 + ",mobile";
         textselectpart2 = textselectpart2 + ",@mobile";
       }  
       if( curentity.email != null)
       { textselectpart1 = textselectpart1 + ",email";
         textselectpart2 = textselectpart2 + ",@email";
       }  

       if( curentity.id_external_company != null && curentity.id_external_company > 0)
       { textselectpart1 = textselectpart1 + ",id_external_company";
         textselectpart2 = textselectpart2 + ",@id_external_company";
       }   
 
 



       if( curentity.attribute1 != null)
       { textselectpart1 = textselectpart1 + ",attribute1";
         textselectpart2 = textselectpart2 + ",@attribute1";
       }
       if( curentity.attribute2 != null)
       { textselectpart1 = textselectpart1 + ",attribute2";
         textselectpart2 = textselectpart2 + ",@attribute2";
       }
       if( curentity.attribute3 != null)
       { textselectpart1 = textselectpart1 + ",attribute3";
         textselectpart2 = textselectpart2 + ",@attribute3";
       }
       if( curentity.attribute4 != null)
       { textselectpart1 = textselectpart1 + ",attribute4";
         textselectpart2 = textselectpart2 + ",@attribute4";
       }
       if( curentity.attribute5 != null)
       { textselectpart1 = textselectpart1 + ",attribute5";
         textselectpart2 = textselectpart2 + ",@attribute5";
       }
       
         textselectpart1 = textselectpart1 + " ) ";
         textselectpart2 = textselectpart2 + " ); ";

       var StrQuery =  textselectpart1 + textselectpart2;       
       //End - Manejo de Parametros

       log.LogInformation("StrQuery:"+StrQuery);


       //ShipDate < GetDate();
  
        using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
        {  


               if( curentity.identity_document != null) cmd.Parameters.AddWithValue("@identity_document", curentity.identity_document);
               if( curentity.firstname != null) cmd.Parameters.AddWithValue("@firstname", curentity.firstname);
               if( curentity.lastname != null) cmd.Parameters.AddWithValue("@lastname", curentity.lastname);

               if( curentity.identity_document_type != null) cmd.Parameters.AddWithValue("@identity_document_type", curentity.identity_document_type);
               if( curentity.country != null) cmd.Parameters.AddWithValue("@country", curentity.country);
               if( curentity.city != null) cmd.Parameters.AddWithValue("@city", curentity.city);
               if( curentity.department != null) cmd.Parameters.AddWithValue("@department", curentity.department);
               if( curentity.job != null) cmd.Parameters.AddWithValue("@job", curentity.job);
               if( curentity.office != null) cmd.Parameters.AddWithValue("@office", curentity.office);
               if( curentity.street_address != null) cmd.Parameters.AddWithValue("@street_address", curentity.street_address);
               if( curentity.mobile != null) cmd.Parameters.AddWithValue("@mobile", curentity.mobile);
               if( curentity.email != null) cmd.Parameters.AddWithValue("@email", curentity.email);
               if( curentity.id_external_company != null && curentity.id_external_company > 0) cmd.Parameters.AddWithValue("@id_external_company", curentity.id_external_company);

               cmd.Parameters.AddWithValue("@created_by", curentity.created_by);
               cmd.Parameters.AddWithValue("@created_date", curentity.created_date);
               cmd.Parameters.AddWithValue("@last_updated_by", curentity.last_updated_by);
               cmd.Parameters.AddWithValue("@last_updated_date", curentity.last_updated_date);
               
               cmd.Parameters.AddWithValue("@start_date", curentity.start_date);


              

               if( curentity.attribute1 != null) cmd.Parameters.AddWithValue("@attribute1", curentity.attribute1);
               if( curentity.attribute2 != null) cmd.Parameters.AddWithValue("@attribute2", curentity.attribute2);
               if( curentity.attribute3 != null) cmd.Parameters.AddWithValue("@attribute3", curentity.attribute3);
               if( curentity.attribute4 != null) cmd.Parameters.AddWithValue("@attribute4", curentity.attribute4);
               if( curentity.attribute5 != null) cmd.Parameters.AddWithValue("@attribute5", curentity.attribute5);
   

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
                        curobj = new personall();
                     
                        curobj.id           = 0;
                      
                        curobj.identity_document = "nulo";
                        
               
                        

    }
  */

    return newlongid;

    }



 public personall funPutPersonAll(ILogger log,long curid, personall curentity )
    {

     var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSecurity",EnvironmentVariableTarget.Process);
   
     //Lista de Objetos
     long newlongid;

     personall curobj;
     string vvcomodin="";

     curobj = curentity;

    //SQL Objects
     SqlDataReader dataReader;
    
     //try{

     using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
     {
        conn.Open();    

       //Start - Manejo de Parametros
 
            
       var textselectpart1 = "UPDATE security.person_all SET ";
       var textselectpart2 = " WHERE 1=1 AND id = @vncurid  ";
       
       textselectpart1 = textselectpart1 + " last_updated_by = @last_updated_by , last_updated_date = @last_updated_date ";      

       if( curentity.identity_document != null)
       { textselectpart1 = textselectpart1 + ", identity_document = @identity_document ";   }
       if( curentity.firstname != null)
       { textselectpart1 = textselectpart1 + ", firstname = @firstname";  }
       if( curentity.lastname != null)
       { textselectpart1 = textselectpart1 + ", lastname = @lastname";  }

       if( curentity.identity_document_type != null)
       { textselectpart1 = textselectpart1 + ", identity_document_type = @identity_document_type"; }
       if( curentity.country != null)
       { textselectpart1 = textselectpart1 + ", country = @country";  }
       if( curentity.city != null)
       { textselectpart1 = textselectpart1 + ", city = @city"; }
       if( curentity.department != null)
       { textselectpart1 = textselectpart1 + ", department = @department"; }
       if( curentity.job != null)
       { textselectpart1 = textselectpart1 + ",job = @job ";  }
       if( curentity.office != null)
       { textselectpart1 = textselectpart1 + ",office = @office "; }       
       if( curentity.street_address != null)
       { textselectpart1 = textselectpart1 + ",street_address = @street_address "; }
       if( curentity.mobile != null)
       { textselectpart1 = textselectpart1 + ",mobile = @mobile"; }  
       if( curentity.email != null)
       { textselectpart1 = textselectpart1 + ",email = @email"; }  
       if( curentity.id_external_company != null && curentity.id_external_company>0)
       { textselectpart1 = textselectpart1 + ",id_external_company = @id_external_company"; }  


       if( curentity.attribute1 != null)
       { textselectpart1 = textselectpart1 + ",attribute1 = @attribute1 "; }
       if( curentity.attribute2 != null)
       { textselectpart1 = textselectpart1 + ",attribute2 = @attribute2 "; }
       if( curentity.attribute3 != null)
       { textselectpart1 = textselectpart1 + ",attribute3 = @attribute3 "; }
       if( curentity.attribute4 != null)
       { textselectpart1 = textselectpart1 + ",attribute4 = @attribute4 "; }
       if( curentity.attribute5 != null)
       { textselectpart1 = textselectpart1 + ",attribute5 = @attribute5 "; }
       if( curentity.person_picture != null && curentity.person_picture != "")
       { textselectpart1 = textselectpart1 + ",person_picture = @person_picture "; }       
         
         textselectpart2 = textselectpart2 + " ; ";

       var StrQuery =  textselectpart1 + textselectpart2;       
       //End - Manejo de Parametros

       log.LogInformation("StrQuery:"+StrQuery);
 
        using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
        {  
               cmd.Parameters.AddWithValue("@vncurid", curid);

               if( curentity.identity_document != null) cmd.Parameters.AddWithValue("@identity_document", curentity.identity_document);
               if( curentity.firstname != null) cmd.Parameters.AddWithValue("@firstname", curentity.firstname);
               if( curentity.lastname != null) cmd.Parameters.AddWithValue("@lastname", curentity.lastname);

               if( curentity.identity_document_type != null) cmd.Parameters.AddWithValue("@identity_document_type", curentity.identity_document_type);
               if( curentity.country != null) cmd.Parameters.AddWithValue("@country", curentity.country);
               if( curentity.city != null) cmd.Parameters.AddWithValue("@city", curentity.city);
               if( curentity.department != null) cmd.Parameters.AddWithValue("@department", curentity.department);
               if( curentity.job != null) cmd.Parameters.AddWithValue("@job", curentity.job);
               if( curentity.office != null) cmd.Parameters.AddWithValue("@office", curentity.office);
               if( curentity.street_address != null) cmd.Parameters.AddWithValue("@street_address", curentity.street_address);
               if( curentity.mobile != null) cmd.Parameters.AddWithValue("@mobile", curentity.mobile);
               if( curentity.email != null) cmd.Parameters.AddWithValue("@email", curentity.email);
               if( curentity.id_external_company != null && curentity.id_external_company>0 ) cmd.Parameters.AddWithValue("@id_external_company", curentity.id_external_company);
 

               cmd.Parameters.AddWithValue("@last_updated_by", curentity.last_updated_by);
               cmd.Parameters.AddWithValue("@last_updated_date", curentity.last_updated_date);

               if( curentity.attribute1 != null) cmd.Parameters.AddWithValue("@attribute1", curentity.attribute1);
               if( curentity.attribute2 != null) cmd.Parameters.AddWithValue("@attribute2", curentity.attribute2);
               if( curentity.attribute3 != null) cmd.Parameters.AddWithValue("@attribute3", curentity.attribute3);
               if( curentity.attribute4 != null) cmd.Parameters.AddWithValue("@attribute4", curentity.attribute4);
               if( curentity.attribute5 != null) cmd.Parameters.AddWithValue("@attribute5", curentity.attribute5);
               if( curentity.person_picture != null) cmd.Parameters.AddWithValue("@person_picture", curentity.person_picture);
                
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
                      curobj = new personall();
                      
                        curobj.id           = 0;
                        
                        curobj.identity_document = "nulo";
                        
    }
  */

    return curobj;

    }




public long funDeletePersonAll(ILogger log,long curid  )
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
       var textselectpart1 = "DELETE FROM security.person_all ";
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
 
   /* }
    catch (Exception ex)
    {
                        curobj = new personall();
                     
                        curobj.id                = 0;
                        
                        curobj.identity_document             = "nulo";
                       
               
                         

    }
  */

    return vnupdaterows;

    }

/*
  public long funDeleteAllPersonAll(ILogger log  )
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
       var textselectpart1 = "DELETE FROM security.person_all ";
       var textselectpart2 = " WHERE id > 15";
       
       textselectpart2 = textselectpart2 + " ; ";

       var StrQuery =  textselectpart1 + textselectpart2;       
       //End - Manejo de Parametros

       log.LogInformation("StrQuery:"+StrQuery);
 
        using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
        {  
               
  
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
  }*/

    public personall funGetPersonAll(ILogger log, int vnsearch_type,string vvemail,string vvidentity_document)
    {

     var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSecurity",EnvironmentVariableTarget.Process);
   
     //Lista de Objetos
     personall curobj;
     string vvcomodin="";

     curobj = new personall();

    //SQL Objects
     SqlDataReader dataReader;
    
     try{

     using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
     {
        conn.Open();    

       //Start - Manejo de Parametros

       if(vnsearch_type == 1)
       { vvcomodin= "%";   } 
       
       var textselect = "SELECT * from security.person_all WHERE 1 = 1 ";
       
       /*if(vnid != null && vnid != 0)
       {textselect = textselect +  String.Format(" AND [id] = {0}",vnid);}*/
       if(vvidentity_document != null)
       {textselect = textselect +  String.Format(" AND [identity_document] like '{0}'",vvidentity_document);}

       if(vvemail != null)
       {textselect = textselect +  String.Format(" AND [email] like '{0}'",vvemail);}
      /*if(vnidcommpany != null && vnidcommpany != 0)
      {textselect = textselect +  String.Format(" AND [id_external_company] like {0}",vnidcommpany);}*/

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

                        curobj = new personall();
                      
                        curobj.id                = (long)(dataReader.GetValue(0));
                        
                        if(!dataReader.IsDBNull(1)){ curobj.identity_document = (string)(dataReader.GetValue(1));}       
                        if(!dataReader.IsDBNull(2)){ curobj.firstname         = (string)(dataReader.GetValue(2));}
                        if(!dataReader.IsDBNull(3)){ curobj.lastname          = (string)(dataReader.GetValue(3));}
             
                        if(!dataReader.IsDBNull(4)){ curobj.identity_document_type = (string)(dataReader.GetValue(4));}
                        if(!dataReader.IsDBNull(5)){ curobj.country          = (string)(dataReader.GetValue(5));}
                        if(!dataReader.IsDBNull(6)){ curobj.city             = (string)(dataReader.GetValue(6));}
                        if(!dataReader.IsDBNull(7)){ curobj.department       = (string)(dataReader.GetValue(7));}
                        if(!dataReader.IsDBNull(8)){ curobj.job              = (string)(dataReader.GetValue(8));}
                        if(!dataReader.IsDBNull(9)){ curobj.office           = (string)(dataReader.GetValue(9));}
                        if(!dataReader.IsDBNull(10)){ curobj.street_address   = (string)(dataReader.GetValue(10));}
                        if(!dataReader.IsDBNull(11)){ curobj.mobile           = (string)(dataReader.GetValue(11));}
                        if(!dataReader.IsDBNull(12)){ curobj.email           = (string)(dataReader.GetValue(12));}

                        if(!dataReader.IsDBNull(13)){ curobj.id_external_company  = (long)(dataReader.GetValue(13));}

                        if(!dataReader.IsDBNull(14)){ curobj.start_date      = (DateTime)(dataReader.GetValue(14)); }
                        if(!dataReader.IsDBNull(15)){ curobj.finish_date      = (DateTime)(dataReader.GetValue(15)); }
   
                        if(!dataReader.IsDBNull(16)){ curobj.created_by        = (string)(dataReader.GetValue(16)); }
                        if(!dataReader.IsDBNull(17)){ curobj.created_date      = (DateTime)(dataReader.GetValue(17)); }
                        if(!dataReader.IsDBNull(18)){ curobj.last_updated_by   = (string)(dataReader.GetValue(18)); }
                        if(!dataReader.IsDBNull(19)){ curobj.last_updated_date = (DateTime)(dataReader.GetValue(19)); }

                        if(!dataReader.IsDBNull(20)){ curobj.attribute1 = (string)(dataReader.GetValue(20));}
                        if(!dataReader.IsDBNull(21)){ curobj.attribute2 = (string)(dataReader.GetValue(21));}
                        if(!dataReader.IsDBNull(22)){ curobj.attribute3 = (string)(dataReader.GetValue(22));}
                        if(!dataReader.IsDBNull(23)){ curobj.attribute4 = (string)(dataReader.GetValue(23));}
                        if(!dataReader.IsDBNull(24)){ curobj.attribute5 = (string)(dataReader.GetValue(24));}      
     
                        

                    }  
             }  
        }



       conn.Close();    

       return curobj;
    }
 
    }
    catch (Exception ex)
    {
                        curobj = new personall();
                     
                        curobj.id                  = 0;
                        
                        curobj.identity_document = "nulo"; 
               
                         

    }
  

    return curobj;

    }

}



public class personall
{
       public long id {get; set;} 
        
       public string identity_document {get; set;} 
       public string firstname {get; set;} 
       public string lastname {get; set;} 

       public string identity_document_type {get; set;} 
       public string country {get; set;} 
       public string city {get; set;} 
       public string department {get; set;} 
       public string job {get; set;} 
       public string office {get; set;} 
       public string street_address {get; set;} 
       public string mobile {get; set;} 
       public string email {get; set;} 

       public long id_external_company {get; set;} 

       public DateTime start_date {get; set;}
       public DateTime finish_date {get; set;}       


       public string created_by {get; set;}
       public DateTime created_date {get; set;}
       public string last_updated_by {get; set;}
       public DateTime last_updated_date {get; set;}
       public string attribute1 {get; set;}
       public string attribute2 {get; set;}
       public string attribute3 {get; set;}
       public string attribute4 {get; set;}
       public string attribute5 {get; set;}
       public string person_picture {get; set;}
}