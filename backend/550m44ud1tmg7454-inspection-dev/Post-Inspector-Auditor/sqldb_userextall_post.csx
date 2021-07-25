using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataAccessUserExtAll
{
    public async Task<long> funPostUserextAll(ILogger log, userextall curentity)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSecurity",EnvironmentVariableTarget.Process);
        //Lista de Objetos
        long newlongid;
        userextall curobj;
        string vvcomodin    = "";
        curobj              = new userextall();
        log.LogInformation("Ingreso Metodo:");
        //SQL Objects
        SqlDataReader dataReader;
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            log.LogInformation("Ingreso Metodo: antes open security.user_all");
            conn.Open();    
            //Start - Manejo de Parametros
            log.LogInformation("Ingreso Metodo: luego de open");
            var textselectpart1     = "INSERT INTO security.user_all(  ";
            var textselectpart2     = " output INSERTED.ID VALUES( ";
            textselectpart1         = textselectpart1 + " created_by,created_date,last_updated_by,last_updated_date,start_date";
            textselectpart2         = textselectpart2 + " @created_by,@created_date,@last_updated_by,@last_updated_date,@start_date";
            if( curentity.username != null)
            { 
                textselectpart1     = textselectpart1 + ",username";
                textselectpart2     = textselectpart2 + ",@username";
            }
            if( curentity.fullusername != null)
            { 
                textselectpart1     = textselectpart1 + ",fullusername";
                textselectpart2     = textselectpart2 + ",@fullusername";
            }
            if( curentity.country != null)
            { 
                textselectpart1     = textselectpart1 + ",country";
                textselectpart2     = textselectpart2 + ",@country";
            }
            if( curentity.city != null)
            { 
                textselectpart1     = textselectpart1 + ",city";
                textselectpart2     = textselectpart2 + ",@city";
            }
            if( curentity.passwordkey != null)
            { 
                textselectpart1     = textselectpart1 + ",passwordkey";
                textselectpart2     = textselectpart2 + ",[security].[fun_gen_user_password]( @passwordkey )";
            }
            if( curentity.person_id != null && curentity.person_id > 0)
            {              
                textselectpart1     = textselectpart1 + ",person_id";
                textselectpart2     = textselectpart2 + ",@person_id";
            }
            if( curentity.external_company_id != null && curentity.external_company_id > 0)
            { 
                textselectpart1     = textselectpart1 + ",external_company_id";
                textselectpart2     = textselectpart2 + ",@external_company_id";
            }
            if( curentity.attribute1 != null)
            { 
                textselectpart1     = textselectpart1 + ",attribute1";
                textselectpart2     = textselectpart2 + ",@attribute1";
            }
            if( curentity.attribute2 != null)
            { 
                textselectpart1     = textselectpart1 + ",attribute2";
                textselectpart2     = textselectpart2 + ",@attribute2";
            }
            if( curentity.attribute3 != null)
            { 
                textselectpart1     = textselectpart1 + ",attribute3";
                textselectpart2     = textselectpart2 + ",@attribute3";
            }
            if( curentity.attribute4 != null)
            { 
                textselectpart1     = textselectpart1 + ",attribute4";
                textselectpart2     = textselectpart2 + ",@attribute4";
            }
            if( curentity.attribute5 != null)
            { 
                textselectpart1     = textselectpart1 + ",attribute5";
                textselectpart2     = textselectpart2 + ",@attribute5";
            }            
            textselectpart1 = textselectpart1 + " ) ";
            textselectpart2 = textselectpart2 + " ); ";
            var StrQuery =  textselectpart1 + textselectpart2;       
            //End - Manejo de Parametros
            log.LogInformation("StrQuery:"+StrQuery);
            //ShipDate < GetDate();        
            using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
            {  
                cmd.Parameters.AddWithValue("@username",curentity.username);            
                if( curentity.fullusername != null) cmd.Parameters.AddWithValue("@fullusername", curentity.fullusername);
                if( curentity.country != null) cmd.Parameters.AddWithValue("@country", curentity.country);
                if( curentity.city != null) cmd.Parameters.AddWithValue("@city", curentity.city);
                log.LogInformation("ID"+curentity.passwordkey);
                if( curentity.passwordkey != null) cmd.Parameters.AddWithValue("@passwordkey", curentity.passwordkey);
                if( curentity.person_id != null && curentity.person_id  > 0) cmd.Parameters.AddWithValue("@person_id", curentity.person_id);
                if( curentity.external_company_id != null  && curentity.external_company_id   > 0) cmd.Parameters.AddWithValue("@external_company_id", curentity.external_company_id);        
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
        return newlongid;
    }

    public userextall funGetUserExtAll(ILogger log, int vnsearch_type, long vnid, long vnid_person, string vvhash, string vvusername)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSecurity",EnvironmentVariableTarget.Process);
        //Lista de Objetos
        userextall curobj;
        string vvcomodin="";
        curobj = new userextall();
        //SQL Objects
        SqlDataReader dataReader;
        try{
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();   
                //Start - Manejo de Parametros
                if(vnsearch_type == 1)
                { vvcomodin= "%";   }                 
                var textselect = "SELECT usa.id,usa.idhash,usa.username ,usa.fullusername,usa.country ,usa.city,usa.passwordkey,usa.person_id,usa.external_company_id ,usa.start_date,usa.finish_date,usa.created_by ";
                textselect = textselect  +",usa.created_date,usa.last_updated_by,usa.last_updated_date,usa.attribute1 ,usa.attribute2,usa.attribute3,usa.attribute4,usa.attribute5,pea.firstname,pea.lastname,pea.email FROM security.user_all AS usa ";                                
                textselect = textselect  +" LEFT JOIN security.person_all as pea on (usa.person_id=pea.id)";
                textselect = textselect  +" WHERE 1 = 1 ";
                
                if(vnid != null && vnid !=0)
                {textselect = textselect +  String.Format(" AND usa.id = {0}",vnid);}
                if(vnid_person != null && vnid_person !=0)
                {textselect = textselect +  String.Format(" AND pea.id like '{0}'",vnid_person);}
                if(vvhash != null)
                {textselect = textselect +  String.Format(" AND usa.idhash like '{0}'",vvhash);}
                if(vvusername != null)
                {textselect = textselect +  String.Format(" AND usa.username = '{0}'",vvusername);}

                textselect = textselect  +" ORDER BY usa.idhash ";

                var StrQuery =  textselect;       
                //End - Manejo de Parametros
                log.LogInformation("StrQuery:"+StrQuery);
                //ShipDate < GetDate();
                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {  

                    //Ejecutar Comando
                    using (dataReader = cmd.ExecuteReader())  
                    {   
                        //curobj = new userextall();
                        //Navegar en el Conjunto de Datos Recuperados
                        while (dataReader.Read())  
                        {                   
                            curobj.id                = (long)(dataReader.GetValue(0));                                                       
                            if(!dataReader.IsDBNull(1)){ curobj.idhash       = (string)(dataReader.GetValue(1));}                                  
                            if(!dataReader.IsDBNull(2)){ curobj.username     = (string)(dataReader.GetValue(2));}                            
                            if(!dataReader.IsDBNull(3)){ curobj.fullusername = (string)(dataReader.GetValue(3));}                                                                    
                            if(!dataReader.IsDBNull(4)){ curobj.country          = (string)(dataReader.GetValue(4));}
                            if(!dataReader.IsDBNull(5)){ curobj.city             = (string)(dataReader.GetValue(5));}                                                  
                            if(!dataReader.IsDBNull(7)){ curobj.person_id           = (long)(dataReader.GetValue(7));}
                            if(!dataReader.IsDBNull(8)){ curobj.external_company_id = (long)(dataReader.GetValue(8));}                                           
                            if(!dataReader.IsDBNull(9)){ curobj.start_date      = (DateTime)(dataReader.GetValue(9)); }                            
                            if(!dataReader.IsDBNull(10)){ curobj.finish_date      = (DateTime)(dataReader.GetValue(10)); } 
                            if(!dataReader.IsDBNull(11)){ curobj.created_by        = (string)(dataReader.GetValue(11)); }
                            if(!dataReader.IsDBNull(12)){ curobj.created_date      = (DateTime)(dataReader.GetValue(12)); }                            
                            if(!dataReader.IsDBNull(13)){ curobj.last_updated_by   = (string)(dataReader.GetValue(13)); }                        
                            if(!dataReader.IsDBNull(14)){ curobj.last_updated_date = (DateTime)(dataReader.GetValue(14)); }
                            if(!dataReader.IsDBNull(15)){ curobj.attribute1 = (string)(dataReader.GetValue(15));}
                            if(!dataReader.IsDBNull(16)){ curobj.attribute2 = (string)(dataReader.GetValue(16));}
                            if(!dataReader.IsDBNull(17)){ curobj.attribute3 = (string)(dataReader.GetValue(17));}
                            if(!dataReader.IsDBNull(18)){ curobj.attribute4 = (string)(dataReader.GetValue(18));}
                            if(!dataReader.IsDBNull(19)){ curobj.attribute5 = (string)(dataReader.GetValue(19));}
                            if(!dataReader.IsDBNull(20)){ curobj.firstname  = (string)(dataReader.GetValue(20));}
                            if(!dataReader.IsDBNull(21)){ curobj.lastname   = (string)(dataReader.GetValue(21));}
                            if(!dataReader.IsDBNull(22)){ curobj.email      = (string)(dataReader.GetValue(22));}
                           
                        }  
                    }  
                }
                conn.Close(); 
               
                return curobj;
            }
        }
        catch (Exception ex)
        {
            curobj      = new userextall();        
            curobj.id   = 0;            
            curobj.idhash = "nulo"; 
        }
        return curobj;
    }

public userextall funPutUserextAll(ILogger log,string curid, userextall curentity )
    {

     var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSecurity",EnvironmentVariableTarget.Process);
    
     //Lista de Objetos
     long newlongid;

     userextall curobj;
     string vvcomodin="";

     curobj = curentity;

    //SQL Objects
     SqlDataReader dataReader;
    
     //try{

     using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
     {
        conn.Open();    

       //Start - Manejo de Parametros
 
            
       var textselectpart1 = "UPDATE security.user_all SET ";
       var textselectpart2 = " WHERE 1=1 AND idhash = @vncurid  ";
       
       textselectpart1 = textselectpart1 + " last_updated_by = @last_updated_by , last_updated_date = @last_updated_date ";      

       if( curentity.username != null)
       { textselectpart1 = textselectpart1 + ", username = @username ";   }
       if( curentity.fullusername != null)
       { textselectpart1 = textselectpart1 + ", fullusername = @fullusername";  }
      if( curentity.country != null)
       { textselectpart1 = textselectpart1 + ", country = @country";  }
       if( curentity.city != null)
       { textselectpart1 = textselectpart1 + ", city = @city"; }

       if( curentity.passwordkey != null && curentity.passwordkey != "")
       { textselectpart1 = textselectpart1 + ", passwordkey = [security].[fun_gen_user_password]( @passwordkey )"; }

       if( curentity.person_id != null &&  curentity.person_id > 0)
       { textselectpart1 = textselectpart1 + ", person_id = @person_id"; }
       if( curentity.external_company_id != null && curentity.external_company_id > 0 )
       { textselectpart1 = textselectpart1 + ", external_company_id = @external_company_id ";  }

       //if( curentity.start_date != null)textselectpart1 = textselectpart1 + ", start_date = @start_date"; 
     



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
       
         
         textselectpart2 = textselectpart2 + " ; ";

       var StrQuery =  textselectpart1 + textselectpart2;       
       //End - Manejo de Parametros

       log.LogInformation("StrQuery:"+StrQuery);
 
        using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
        {  
               cmd.Parameters.AddWithValue("@vncurid", curid);

               if( curentity.username != null) cmd.Parameters.AddWithValue("@username", curentity.username);
               if( curentity.fullusername != null) cmd.Parameters.AddWithValue("@fullusername", curentity.fullusername);
               if( curentity.country != null) cmd.Parameters.AddWithValue("@country", curentity.country);
               if( curentity.city != null) cmd.Parameters.AddWithValue("@city", curentity.city);

               if( curentity.passwordkey != null) cmd.Parameters.AddWithValue("@passwordkey", curentity.passwordkey);
               if( curentity.person_id != null &&  curentity.person_id > 0) cmd.Parameters.AddWithValue("@person_id", curentity.person_id);
               if( curentity.external_company_id != null &&  curentity.external_company_id > 0 ) cmd.Parameters.AddWithValue("@external_company_id", curentity.external_company_id);
                //if( curentity.start_date != null){cmd.Parameters.AddWithValue("@start_date", curentity.start_date);}
              //log.LogInformation("start_date:"+curentity.start_date);
               cmd.Parameters.AddWithValue("@last_updated_by", curentity.last_updated_by);
               cmd.Parameters.AddWithValue("@last_updated_date", curentity.last_updated_date);

               if( curentity.attribute1 != null) cmd.Parameters.AddWithValue("@attribute1", curentity.attribute1);
               if( curentity.attribute2 != null) cmd.Parameters.AddWithValue("@attribute2", curentity.attribute2);
               if( curentity.attribute3 != null) cmd.Parameters.AddWithValue("@attribute3", curentity.attribute3);
               if( curentity.attribute4 != null) cmd.Parameters.AddWithValue("@attribute4", curentity.attribute4);
               if( curentity.attribute5 != null) cmd.Parameters.AddWithValue("@attribute5", curentity.attribute5);
                
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
                      curobj = new userextall();
                      
                        curobj.id           = 0;
                        
                        curobj.username = "nulo";
                        
    }
  */

    return curobj;

    }
}



public class userextall
{
    public long id {get; set;} 
    public string idhash {get; set;} 
    public string username {get; set;} 
    public string fullusername {get; set;} 
    public string country {get; set;} 
    public string city {get; set;} 
    public string passwordkey {get; set;} 
    public long person_id {get; set;} 
    public string person_id_txt {get; set;}        
    public long external_company_id {get; set;} 
    public string external_company_id_txt {get; set;} 
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
    public string firstname {get; set;}
    public string lastname {get; set;}
    public string email {get; set;}
}