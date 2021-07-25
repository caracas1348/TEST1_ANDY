using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataObservacion_AuditoriaAll
{

    public async Task<int> funPostObservacion_AuditoriaAll(ILogger log, observacion_auditoriaall curentity)
    {

        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);

        //Lista de Objetos
        int newlongid;

        observacion_auditoriaall curobj;
        string vvcomodin = "";

        curobj = new observacion_auditoriaall();
        log.LogInformation("Ingreso Metodo:");
        //SQL Objects
        SqlDataReader dataReader;

        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                log.LogInformation("Ingreso Metodo: antes open");
                conn.Open();

                //Start - Manejo de Parametros

                log.LogInformation("Ingreso Metodo: luego de open");

                var sqlDel = "UPDATE auditoria.Observacion_Auditoria SET Active = 0 WHERE AuditoriaId = " + curentity.AuditoriaId.ToString() + "; ";

                var textselectpart1 = "INSERT INTO auditoria.Observacion_Auditoria (  ";
                var textselectpart2 = " output INSERTED.ID VALUES( ";

                textselectpart1 = textselectpart1 + " Created_By,Created_Date";
                textselectpart2 = textselectpart2 + " @Created_By,@Created_Date";

                if (curentity.Id != 0)
                {
                    textselectpart1 = textselectpart1 + ",Id";
                    textselectpart2 = textselectpart2 + ",@Id";
                }
                if (curentity.Observacion != null)
                {
                    textselectpart1 = textselectpart1 + ",Observacion";
                    textselectpart2 = textselectpart2 + ",@Observacion";
                }
                if (curentity.AuditoriaId != 0)
                {
                    textselectpart1 = textselectpart1 + ",AuditoriaId";
                    textselectpart2 = textselectpart2 + ",@AuditoriaId";
                }
                if (curentity.Active != 0)
                {
                    textselectpart1 = textselectpart1 + ",Active";
                    textselectpart2 = textselectpart2 + ",@Active";
                }
                textselectpart1 = textselectpart1 + " ) ";
                textselectpart2 = textselectpart2 + " ); ";

                var StrQuery = sqlDel + textselectpart1 + textselectpart2;
                //End - Manejo de Parametros

                log.LogInformation("StrQuery:" + StrQuery);

                //ShipDate < GetDate();

                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    if (curentity.Id != 0) cmd.Parameters.AddWithValue("@Id", curentity.Id);
                    if (curentity.Observacion != null) cmd.Parameters.AddWithValue("@Observacion", curentity.Observacion);
                    if (curentity.AuditoriaId != 0) cmd.Parameters.AddWithValue("@AuditoriaId", curentity.AuditoriaId);
                    if (curentity.Active != 0) cmd.Parameters.AddWithValue("@Active", curentity.Active);
                    cmd.Parameters.AddWithValue("@Created_By", curentity.Created_By);
                    cmd.Parameters.AddWithValue("@Created_Date", curentity.Created_Date);

                    // cmd.Parameters.AddWithValue("@Last_Updated_By", curentity.Last_Updated_By);
                    // cmd.Parameters.AddWithValue("@Last_Updated_Date", curentity.Last_Updated_Date);
                    //long modified =(long)cmd.ExecuteScalar();
                    var modified = await cmd.ExecuteScalarAsync();
                    //curentity.id = Convert.ToInt64(modified);
                    newlongid = Convert.ToInt32(modified);
                    log.LogInformation("modified:" + modified);
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
            log.LogInformation("catch::" + ex.Message);
            //System.Convert.ToString(ex.Message);
            newlongid = -1;
        }
        return newlongid;
    }



    /*public observacion_auditoriaall funPutObservacion_AuditoriaAll(ILogger log, long curid, observacion_auditoriaall curentity)
    {

        var vvsqlconnectionString = "Data Source=srv-db-east-us009.database.windows.net;Initial Catalog=db_ssoma_audit_mng_dev;User ID=userdbowner;Password=$P4ssdbowner01#;";

        //Lista de Objetos
        long newlongid;

        observacion_auditoriaall curobj;
        string vvcomodin = "";
        curobj = curentity;
        //string Last_Updated_Date = DateTime.Now.ToString("yyyy-MM-dd");

        //SQL Objects
        SqlDataReader dataReader;
        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();

                //Start - Manejo de Parametros
                var textselectpart1 = "UPDATE auditoria.Observacion_Auditoria SET ";
                var textselectpart2 = " WHERE 1=1 AND Id = @Id  ";
                textselectpart1 = textselectpart1 + " Created_By = @Created_By , Created_Date = @Created_Date ";

                if (curentity.Id != 0)
                { textselectpart1 = textselectpart1 + ", Id = @Id "; }
                if (curentity.Observacion != null)
                { textselectpart1 = textselectpart1 + ", Observacion = @Observacion"; }
                if (curentity.AuditoriaId != 0)
                { textselectpart1 = textselectpart1 + ", AuditoriaId = @AuditoriaId "; }
                if (curentity.Active != 0)
                { textselectpart1 = textselectpart1 + ", Active = @Active "; }

                textselectpart2 = textselectpart2 + " ; ";

                var StrQuery = textselectpart1 + textselectpart2;
                //End - Manejo de Parametros

                log.LogInformation("StrQuery:" + StrQuery);

                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    cmd.Parameters.AddWithValue("@Id", curid);
                    if (curentity.Observacion != null) cmd.Parameters.AddWithValue("@Observacion", curentity.Observacion);
                    cmd.Parameters.AddWithValue("@AuditoriaId", curentity.AuditoriaId);
                    cmd.Parameters.AddWithValue("@Active", curentity.Active);
                    cmd.Parameters.AddWithValue("@Created_By", curentity.Created_By);
                    cmd.Parameters.AddWithValue("@Created_Date", curentity.Created_Date);

                    var modified = cmd.ExecuteNonQuery();
                    log.LogInformation("modified:" + modified);
                }

                if (conn.State == System.Data.ConnectionState.Open)
                    conn.Close();
                return curobj;
            }
        }
        catch (Exception ex)
        {
            log.LogInformation("catch:" + ex.Message);
            newlongid = -1;
        }
        return curobj;
    }//*/

    // MODIFICAR UNA OBSERVACION DE UNA EVALUACION DE AUDITORIA
    public async Task<int> funPutObservacion_AuditoriaAll(ILogger log, long curid, observacion_auditoriaall curentity)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
        log.LogInformation("Ingreso Metodo: funPutObservacion_AuditoriaAll");
        
        int resultado = 0;
        
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("[auditoria].[put_observacion_evaluacion_auditoria]", conn);

            cmd.Parameters.AddWithValue("@AuditoriaId", curentity.AuditoriaId);
            cmd.Parameters.AddWithValue("@Observacion", curentity.Observacion);

            SqlParameter output_Id = new SqlParameter("@rows", SqlDbType.BigInt);
            output_Id.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                resultado = Convert.ToInt32(output_Id.Value);
            }
            
            if (conn.State == System.Data.ConnectionState.Open)
                conn.Close();
        }
        log.LogInformation("resultado: "+resultado);

        return resultado;
    }


    public long funDeleteObservacion_AuditoriaAll(ILogger log, long curid)
    {

        var vvsqlconnectionString = "Data Source=srv-db-east-us009.database.windows.net;Initial Catalog=db_ssoma_audit_mng_dev;User ID=userdbowner;Password=$P4ssdbowner01#;";

        //Lista de Objetos
        long vnupdaterows = 0;
        string vvcomodin = "";
        DateTime Deleted_Date = DateTime.Now;

        //SQL Objects
        SqlDataReader dataReader;

        try
        {

            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();

                //Start - Manejo de Parametros
                var textselectpart1 = "UPDATE auditoria.Observacion_Auditoria ";
                textselectpart1 = textselectpart1 + " SET Active = 0 ";
                var textselectpart2 = " WHERE 1=1 AND id = @vncurid  ";

                var StrQuery = textselectpart1 + textselectpart2;
                //End - Manejo de Parametros

                log.LogInformation("StrQuery:" + StrQuery);

                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    cmd.Parameters.AddWithValue("@vncurid", curid);

                    //cmd.Parameters.AddWithValue("@vvdeletedby", deletedby);

                    var modified = cmd.ExecuteNonQuery();
                    vnupdaterows = Convert.ToInt64(modified);
                    log.LogInformation("DELETE:" + modified);
                    log.LogInformation("DELETE row:" + vnupdaterows);
                }


                if (conn.State == System.Data.ConnectionState.Open)
                    conn.Close();

                return vnupdaterows;

            }

        }
        catch (Exception ex)
        {
            observacion_auditoriaall curobj = new observacion_auditoriaall();
            curobj.Id = 0;
        }
        return vnupdaterows;
    }
}




public class observacion_auditoriaall
{
    public int Id {get; set;}     
    public string Observacion {get; set;}
    public int Active {get; set;} 
    public long AuditoriaId {get; set;}
    public string Created_By {get; set;}
    public DateTime Created_Date {get; set;}
    public string Last_Updated_By {get; set;}
    public DateTime Last_Updated_Date {get; set;}
    public string Deleted_By { get; set; } 
    public DateTime Deleted_Date { get; set; }
    public Boolean Deleted { get; set; }
    public long ProgramaAuditoriaId {get; set;}
}