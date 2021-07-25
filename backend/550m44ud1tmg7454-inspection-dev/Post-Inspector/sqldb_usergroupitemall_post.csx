using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataAccessUserGroupItemAll
{
    public async Task<long> funPostUserGroupItemAll(ILogger log, usergroupitemall curentity)
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
            log.LogInformation("Ingreso Metodo: antes open security.user_group_item_all");
            conn.Open();    
            //Start - Manejo de Parametros
            log.LogInformation("Ingreso Metodo: luego de open");
            var textselectpart1     = "INSERT INTO security.user_group_item_all(  ";
            var textselectpart2     = " output INSERTED.ID VALUES( ";
            textselectpart1         = textselectpart1 + " created_by,created_date,last_updated_by,last_updated_date";
            textselectpart2         = textselectpart2 + " @created_by,@created_date,@last_updated_by,@last_updated_date";
            if( curentity.system_id != null && curentity.system_id > 0)
            { 
                textselectpart1     = textselectpart1 + ",system_id";
                textselectpart2     = textselectpart2 + ",@system_id";
            }
            if( curentity.user_group_id != null  && curentity.user_group_id > 0)
            { 
                textselectpart1     = textselectpart1 + ",user_group_id";
                textselectpart2     = textselectpart2 + ",@user_group_id";
            }
            if( curentity.user_id != null  && curentity.user_id > 0)
            { 
                textselectpart1     = textselectpart1 + ",user_id";
                textselectpart2     = textselectpart2 + ",@user_id";
            }
            if( curentity.user_idhash != null)
            { 
                textselectpart1     = textselectpart1 + ",user_idhash";
                textselectpart2     = textselectpart2 + ",@user_idhash";
            }
            if( curentity.status != null  && curentity.status > 0)
            { 
                textselectpart1     = textselectpart1 + ",status";
                textselectpart2     = textselectpart2 + ",@status";
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
                cmd.Parameters.AddWithValue("@system_id", curentity.system_id);            
                if( curentity.user_group_id != null) cmd.Parameters.AddWithValue("@user_group_id", curentity.user_group_id);
                if( curentity.user_id != null) cmd.Parameters.AddWithValue("@user_id", curentity.user_id);
                if( curentity.user_idhash != null) cmd.Parameters.AddWithValue("@user_idhash", curentity.user_idhash);
                if( curentity.status != null) cmd.Parameters.AddWithValue("@status", curentity.status);      
                cmd.Parameters.AddWithValue("@created_by", curentity.created_by);
                cmd.Parameters.AddWithValue("@created_date", curentity.created_date);
                cmd.Parameters.AddWithValue("@last_updated_by", curentity.last_updated_by);
                cmd.Parameters.AddWithValue("@last_updated_date", curentity.last_updated_date);                        
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

    public usergroupitemall funPutUserGroupItemAll(ILogger log,long curid, usergroupitemall curentity )
    {

        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSecurity",EnvironmentVariableTarget.Process);
        log.LogInformation("ID A EDITAR:"+curid);
        //Lista de Objetos
        long newlongid;

        usergroupitemall curobj;
        string vvcomodin="";

        curobj = curentity;

        //SQL Objects
        SqlDataReader dataReader;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();    

            //Start - Manejo de Parametros
                
            var textselectpart1 = "UPDATE security.user_group_item_all SET ";
            var textselectpart2 = " WHERE 1=1 AND id = @vncurid  ";

            textselectpart1 = textselectpart1 + " last_updated_by = @last_updated_by , last_updated_date = @last_updated_date ";      

            if( curentity.user_group_id > 0 )
            { textselectpart1 = textselectpart1 + ", user_group_id = @user_group_id ";   }

            textselectpart2 = textselectpart2 + " ; ";

            var StrQuery =  textselectpart1 + textselectpart2;       
            //End - Manejo de Parametros

            log.LogInformation("StrQuery:"+StrQuery);

            using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
            {  
                   cmd.Parameters.AddWithValue("@vncurid", curid);

                   if( curentity.user_group_id > 0) cmd.Parameters.AddWithValue("@user_group_id", curentity.user_group_id);
            
                   cmd.Parameters.AddWithValue("@last_updated_by", curentity.last_updated_by);
                   cmd.Parameters.AddWithValue("@last_updated_date", curentity.last_updated_date);

                    
                   var modified = cmd.ExecuteNonQuery();           
                   log.LogInformation("modified:"+modified);   
            }

            if (conn.State == System.Data.ConnectionState.Open) 
            conn.Close();    

            return curobj;       
        }

        return curobj;
    }

    public usergroupitemall funGetUserGroupItemAll(ILogger log,long vnid, long vnsystem_id, long vnuser_group_id, long vnuser_id, string vvuser_idhash)
    {

    var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSecurity",EnvironmentVariableTarget.Process);
    
    log.LogInformation("CONSULTA SELECT, USER_ID:"+vnuser_id+" HASH:"+vvuser_idhash);
    //Lista de Objetos
    usergroupitemall curobj;
    string vvcomodin="";

     curobj = new usergroupitemall();

    //SQL Objects
    SqlDataReader dataReader;
    
        try{

            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();    

               //Start - Manejo de Parametros
               
               var textselect = "SELECT * from security.user_group_item_all WHERE 1 = 1 ";
               
               if(vnid > 0)
               {textselect = textselect +  String.Format(" AND [id] = {0}",vnid);}

               if(vnsystem_id > 0)
               {textselect = textselect +  String.Format(" AND [system_id] = {0}",vnsystem_id);}

               if(vnuser_group_id > 0)
               {textselect = textselect +  String.Format(" AND [user_group_id] = {0}",vnuser_group_id);}

               if(vnuser_id > 0)
               {textselect = textselect +  String.Format(" AND [user_id] = {0}",vnuser_id);}

               if(vvuser_idhash != null)
               {textselect = textselect +  String.Format(" AND [user_idhash] = '{0}'",vvuser_idhash);}

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

                                curobj = new usergroupitemall();
                              
                                curobj.id                = (long)(dataReader.GetValue(0));
                                
                                if(!dataReader.IsDBNull(1)){ curobj.system_id = (long)(dataReader.GetValue(1));}       
                                if(!dataReader.IsDBNull(2)){ curobj.user_group_id         = (long)(dataReader.GetValue(2));}
                                if(!dataReader.IsDBNull(3)){ curobj.user_id          = (long)(dataReader.GetValue(3));}
            
                                if(!dataReader.IsDBNull(4)){ curobj.user_idhash = (string)(dataReader.GetValue(4));}
                                if(!dataReader.IsDBNull(5)){ curobj.status          = (int)(dataReader.GetValue(5));}
                                

                            }  
                     }  
                }



               conn.Close();    

               return curobj;
            }
     
        }
        catch (Exception ex)
        {
                            log.LogInformation("EX:"+ex.Message);
                            curobj = new usergroupitemall();
                         
                            curobj.id = 0;
                            
                            curobj.system_id = 0; 
                   
                             

        }
  
        return curobj;
    }

}



public class usergroupitemall
{
    public long id {get; set;} 
    public long system_id {get; set;} 
    public long user_group_id {get; set;} 
    public long user_id {get; set;} 
    public string user_idhash {get; set;} 
    public long status {get; set;}      
    public string created_by {get; set;}
    public DateTime created_date {get; set;}
    public string last_updated_by {get; set;}
    public DateTime last_updated_date {get; set;}
    public string attribute1 {get; set;}
    public string attribute2 {get; set;}
    public string attribute3 {get; set;}
    public string attribute4 {get; set;}
    public string attribute5 {get; set;}
}