using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataAsistentesAll
{
	public async Task<long> funPostAsistentesAll(ILogger log, asistente curentity)
    {
    	var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
        //Lista de Objetos
        long newlongid;
        log.LogInformation("Ingreso Metodo:");
        //SQL Objects
        SqlDataReader dataReader;

        //SqlTransaction transaction;
        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
            	log.LogInformation("Ingreso Metodo: antes open");
                conn.Open();
                log.LogInformation("Ingreso Metodo: luego de open");	

                var textselectpart1 = " INSERT INTO [auditoria].[Asistentes] (  ";
                var textselectpart2 = " output INSERTED.Id VALUES( ";

                textselectpart1 += " Created_By,Created_Date";
                textselectpart2 += " @Created_By,@Created_Date";

                if( curentity.ListaAsistenciaID > 0 ){
                    textselectpart1 += " , ListaAsistenciaID ";
                    textselectpart2 += " , @ListaAsistenciaID ";
                }

                if( curentity.UserIdHash != null ){
                    textselectpart1 += " , UserIdHash ";
                    textselectpart2 += " , @UserIdHash ";
                }

                if( curentity.Nombres != null ){
                    textselectpart1 += " , Nombres ";
                    textselectpart2 += " , @Nombres ";
                }

                if( curentity.Cargo != null ){
                    textselectpart1 += " , Cargo ";
                    textselectpart2 += " , @Cargo ";
                }

                if( curentity.Flag_Asistencia != null ){
                    textselectpart1 += " , Flag_Asistencia ";
                    textselectpart2 += " , @Flag_Asistencia ";
                }

                if( curentity.Hora_Asistencia_Apertura != null ){
                    textselectpart1 += " , Hora_Asistencia_Apertura ";
                    textselectpart2 += " , @Hora_Asistencia_Apertura ";
                }

                if( curentity.Fecha_Asistencia_Apertura != null ){
                    textselectpart1 += " , Fecha_Asistencia_Apertura ";
                    textselectpart2 += " , @Fecha_Asistencia_Apertura ";
                }

                if( curentity.Hora_Asistencia_Cierre != null ){
                    textselectpart1 += " , Hora_Asistencia_Cierre ";
                    textselectpart2 += " , @Hora_Asistencia_Cierre ";
                }

                if( curentity.Fecha_Asistencia_Cierre != null ){
                    textselectpart1 += " , Fecha_Asistencia_Cierre ";
                    textselectpart2 += " , @Fecha_Asistencia_Cierre ";
                }

                textselectpart1 = textselectpart1 + " ) ";
                textselectpart2 = textselectpart2 + " ); ";

                var StrQuery = textselectpart1 + textselectpart2;

                log.LogInformation("StrQuery:" + StrQuery);

                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                	cmd.Parameters.AddWithValue("@Created_By", curentity.Created_By);
                    cmd.Parameters.AddWithValue("@Created_Date", curentity.Created_Date);
                    
                    if( curentity.ListaAsistenciaID > 0 ){
                        cmd.Parameters.AddWithValue("@ListaAsistenciaID", curentity.ListaAsistenciaID);
                    }

                    if( curentity.UserIdHash != null ){
                        cmd.Parameters.AddWithValue("@UserIdHash", curentity.UserIdHash);
                    }

                    if( curentity.Nombres != null ){
                        cmd.Parameters.AddWithValue("@Nombres", curentity.Nombres);
                    }

                    if( curentity.Cargo != null ){
                        cmd.Parameters.AddWithValue("@Cargo", curentity.Cargo);
                    }

                    if( curentity.Flag_Asistencia != null ){
                        cmd.Parameters.AddWithValue("@Flag_Asistencia", curentity.Flag_Asistencia);
                    }

                    if( curentity.Hora_Asistencia_Apertura != null ){
                        cmd.Parameters.AddWithValue("@Hora_Asistencia_Apertura", curentity.Hora_Asistencia_Apertura);
                    }

                    if( curentity.Fecha_Asistencia_Apertura != null ){
                        cmd.Parameters.AddWithValue("@Fecha_Asistencia_Apertura", curentity.Fecha_Asistencia_Apertura);
                    }

                    if( curentity.Hora_Asistencia_Cierre != null ){
                        cmd.Parameters.AddWithValue("@Hora_Asistencia_Cierre", curentity.Hora_Asistencia_Cierre);
                    }

                    if( curentity.Fecha_Asistencia_Cierre != null ){
                        cmd.Parameters.AddWithValue("@Fecha_Asistencia_Cierre", curentity.Fecha_Asistencia_Cierre);
                    }

                    var modified = await cmd.ExecuteScalarAsync();
                    newlongid = Convert.ToInt64(modified);
                    //var modified = cmd.ExecuteNonQuery();
                    //curentity.Id = Convert.ToInt64(modified);
                    log.LogInformation("modified:" + modified);
                }
                
                if (conn.State == System.Data.ConnectionState.Open)
                	conn.Close();

            }
        } 
        catch (Exception ex)
        {
            log.LogInformation("catch::" + ex.Message);
            newlongid = 0;
            //curentity.Persona_Name = "Error";
            //transaction.Rollback();
        }

        return newlongid;
        //return curentity;
    }
    public asistente funPutAsistentesAll(ILogger log, long curid, asistente curentity)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit",EnvironmentVariableTarget.Process);

        long newlongid;

        asistente curobj;
        curobj = curentity;

        SqlDataReader dataReader;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            var textselectpart1 = "UPDATE [auditoria].[Asistentes] SET  ";
            var textselectpart2 = " WHERE 1=1 AND Id = @vncurid ";
       
            textselectpart1 = textselectpart1 + " Last_Updated_By = @last_updated_by,Last_Updated_Date = @Last_Updated_Date";

            if( curentity.ListaAsistenciaID > 0 ){
                textselectpart1 = textselectpart1 + ", ListaAsistenciaID = @ListaAsistenciaID";
            }

            if( curentity.UserIdHash != null ){
                textselectpart1 = textselectpart1 + ", UserIdHash = @UserIdHash";
            }

            if( curentity.Nombres != null ){
                textselectpart1 = textselectpart1 + ", Nombres = @Nombres";
            }

            if( curentity.Cargo != null ){
                textselectpart1 = textselectpart1 + ", Cargo = @Cargo";
            }

            if( curentity.Flag_Asistencia != null ){
                textselectpart1 = textselectpart1 + ", Flag_Asistencia = @Flag_Asistencia";
            }

            if( curentity.Hora_Asistencia_Apertura != null ){
                textselectpart1 = textselectpart1 + ", Hora_Asistencia_Apertura = @Hora_Asistencia_Apertura";
            }

            if( curentity.Fecha_Asistencia_Apertura != null ){
                textselectpart1 = textselectpart1 + ", Fecha_Asistencia_Apertura = @Fecha_Asistencia_Apertura";
            }

            if( curentity.Hora_Asistencia_Cierre != null ){
                textselectpart1 = textselectpart1 + ", Hora_Asistencia_Cierre = @Hora_Asistencia_Cierre";
            }

            if( curentity.Fecha_Asistencia_Cierre != null ){
                textselectpart1 = textselectpart1 + ", Fecha_Asistencia_Cierre = @Fecha_Asistencia_Cierre";
            }

            textselectpart2 = textselectpart2 + " ; ";

            var StrQuery =  textselectpart1 + textselectpart2;       
            
            log.LogInformation("StrQuery:"+StrQuery);
            
            using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
            {
                cmd.Parameters.AddWithValue("@vncurid", curid);

                if (curentity.Last_Updated_Date != null) cmd.Parameters.AddWithValue("@last_updated_date", curentity.Last_Updated_Date);
                if (curentity.Last_Updated_By != null) cmd.Parameters.AddWithValue("@last_updated_by", curentity.Last_Updated_By);

                if( curentity.ListaAsistenciaID > 0 ){
                    cmd.Parameters.AddWithValue("@ListaAsistenciaID", curentity.ListaAsistenciaID);
                }

                if( curentity.UserIdHash != null ){
                    cmd.Parameters.AddWithValue("@UserIdHash", curentity.UserIdHash);
                }

                if( curentity.Nombres != null ){
                    cmd.Parameters.AddWithValue("@Nombres", curentity.Nombres);
                }

                if( curentity.Cargo != null ){
                    cmd.Parameters.AddWithValue("@Cargo", curentity.Cargo);
                }

                if( curentity.Flag_Asistencia != null ){
                    cmd.Parameters.AddWithValue("@Flag_Asistencia", curentity.Flag_Asistencia);
                }

                if( curentity.Hora_Asistencia_Apertura != null ){
                    cmd.Parameters.AddWithValue("@Hora_Asistencia_Apertura", curentity.Hora_Asistencia_Apertura);
                }

                if( curentity.Fecha_Asistencia_Apertura != null ){
                    cmd.Parameters.AddWithValue("@Fecha_Asistencia_Apertura", curentity.Fecha_Asistencia_Apertura);
                }

                if( curentity.Hora_Asistencia_Cierre != null ){
                    cmd.Parameters.AddWithValue("@Hora_Asistencia_Cierre", curentity.Hora_Asistencia_Cierre);
                }

                if( curentity.Fecha_Asistencia_Cierre != null ){
                    cmd.Parameters.AddWithValue("@Fecha_Asistencia_Cierre", curentity.Fecha_Asistencia_Cierre);
                }

                var modified = cmd.ExecuteNonQuery();           
                log.LogInformation("modified:"+modified); 
            }

            if (conn.State == System.Data.ConnectionState.Open) {
                conn.Close();
            }
            return curobj;
        }
        return curobj;
    }

    public long funDeleteAsistentes(ILogger log,long curid, string usuariodelete)
{

     var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit",EnvironmentVariableTarget.Process);
   
     //Lista de Objetos
     long vnupdaterows = 0; 
     DateTime Deleted_Date = DateTime.Now;

 

    
    try{

     using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
     {
        conn.Open();    

       //Start - Manejo de Parametros
       var textselectpart1 = "UPDATE [auditoria].[Asistentes] ";
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
        asistente curobj = new asistente();
        curobj.Id = 0;
    }
    return vnupdaterows;
    }
}

public class asistente
{
    public long Id {get; set;}
    public long ListaAsistenciaID {get; set;}
    public string UserIdHash {get; set;}
    public string Nombres {get; set;}
    public string Cargo {get; set;}
    public int Flag_Asistencia {get; set;}
    public string Hora_Asistencia_Apertura {get; set;}
    public string Fecha_Asistencia_Apertura {get; set;}
    public string Hora_Asistencia_Cierre {get; set;}
    public string Fecha_Asistencia_Cierre {get; set;}
    public string Created_By {get; set;}
    public DateTime Created_Date {get; set;}
    public string Last_Updated_By {get; set;}
    public DateTime Last_Updated_Date {get; set;}
}