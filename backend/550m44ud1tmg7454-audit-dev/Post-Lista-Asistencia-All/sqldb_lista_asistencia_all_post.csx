using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataListaAsistenciaAll
{
	public async Task<long> funPostListaAsistenciaAll(ILogger log, listaasistencia curentity)
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

                var textselectpart1 = " INSERT INTO [auditoria].[Lista_Asistencia] (  ";
                var textselectpart2 = " output INSERTED.Id VALUES( ";

                textselectpart1 += " Created_By,Created_Date";
                textselectpart2 += " @Created_By,@Created_Date";

                if( curentity.AuditoriaID > 0 ){
                    textselectpart1 += " , AuditoriaID ";
                    textselectpart2 += " , @AuditoriaID ";
                }

                if( curentity.Code != null ){
                    textselectpart1 += " , Code ";
                    textselectpart2 += " , @Code ";
                }

                textselectpart1 = textselectpart1 + " ) ";
                textselectpart2 = textselectpart2 + " ); ";

                var StrQuery = textselectpart1 + textselectpart2;

                log.LogInformation("StrQuery:" + StrQuery);

                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                	cmd.Parameters.AddWithValue("@Created_By", curentity.Created_By);
                    cmd.Parameters.AddWithValue("@Created_Date", curentity.Created_Date);
                    
                    if( curentity.AuditoriaID > 0 ){
                        cmd.Parameters.AddWithValue("@AuditoriaID", curentity.AuditoriaID);
                    }

                    if( curentity.Code != null ){
                        cmd.Parameters.AddWithValue("@Code", curentity.Code);
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

    public listaasistencia funPutListaAsistenciaAll(ILogger log, long curid, listaasistencia curentity)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit",EnvironmentVariableTarget.Process);

        long newlongid;

        listaasistencia curobj;
        curobj = curentity;

        SqlDataReader dataReader;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            var textselectpart1 = "UPDATE [auditoria].[Lista_Asistencia] SET  ";
            var textselectpart2 = " WHERE 1=1 AND Id = @vncurid ";
       
            textselectpart1 = textselectpart1 + " Last_Updated_By = @last_updated_by,Last_Updated_Date = @last_updated_date";

            if( curentity.AuditoriaID > 0 ){
                textselectpart1 = textselectpart1 + ", AuditoriaID = @AuditoriaID";
            }

            if( curentity.Code != null ){
                textselectpart1 = textselectpart1 + ", Code = @Code";
            }

            textselectpart2 = textselectpart2 + " ; ";

            var StrQuery =  textselectpart1 + textselectpart2;       
            
            log.LogInformation("StrQuery:"+StrQuery);
            
            using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
            {
                cmd.Parameters.AddWithValue("@vncurid", curid);

                if (curentity.Last_Updated_Date != null) cmd.Parameters.AddWithValue("@last_updated_date", curentity.Last_Updated_Date);
                if (curentity.Last_Updated_By != null) cmd.Parameters.AddWithValue("@last_updated_by", curentity.Last_Updated_By);

                if( curentity.AuditoriaID > 0 ){
                    cmd.Parameters.AddWithValue("@AuditoriaID", curentity.AuditoriaID);
                }

                if( curentity.Code != null ){
                    cmd.Parameters.AddWithValue("@Code", curentity.Code);
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
}

public class listaasistencia
{
    public long Id {get; set;}
    public long AuditoriaID {get; set;}
    public string Code {get; set;}
    public string Created_By {get; set;}
    public DateTime Created_Date {get; set;}
    public string Last_Updated_By {get; set;}
    public DateTime Last_Updated_Date {get; set;}
}