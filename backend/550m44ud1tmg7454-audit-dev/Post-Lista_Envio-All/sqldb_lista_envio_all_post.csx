using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataListaEnvioAll
{
    
    public void funDeletedListaEnvioAll(ILogger log, ListaEnvioAll curentity)
    {

        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);

        //Lista de Objetos
        int newlongid;

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
                //transaction = conn.BeginTransaction("InsertTransaction");

                //Start - Manejo de Parametros

                log.LogInformation("Ingreso Metodo: luego de open");




                var query = "DELETE FROM [auditoria].[ListaEnvio] WHERE PlanAuditoriaId = @PlanAuditoriaId";

                log.LogInformation("StrQuery deleted:" + query);

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@PlanAuditoriaId", curentity.PlanAuditoriaId);
                    var modified = cmd.ExecuteNonQuery();
                    newlongid = Convert.ToInt32(modified);
                    log.LogInformation("DELETE:" + newlongid.ToString());
                }


                if (conn.State == System.Data.ConnectionState.Open)
                    conn.Close();

            }

            //transaction.Commit();


        }
        catch (Exception ex)
        {
            log.LogInformation("catch::" + ex.Message);
            newlongid = -1;
            //transaction.Rollback();
        }
    }

    public async Task<long> funPostListaEnvioAll(ILogger log, ListaEnvioAll curentity, string PlanPdf)
    //public ListaEnvioAll funPostListaEnvioAll(ILogger log, ListaEnvioAll curentity)
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

                var textselectpart1 = " INSERT INTO [auditoria].[ListaEnvio] (  ";
                var textselectpart2 = " output INSERTED.Id VALUES( ";

                textselectpart1 += " Send_By, Send_Date ";
                textselectpart2 += " @Send_By, @Send_Date ";
                textselectpart1 += " , UserIdHash ";
                textselectpart2 += " , @UserIdHash ";
                textselectpart1 += " , PlanAuditoriaId ";
                textselectpart2 += " , @PlanAuditoriaId ";
                textselectpart1 += " , Persona_Name ";
                textselectpart2 += " , @Persona_Name ";
                textselectpart1 += " , Persona_Cargo ";
                textselectpart2 += " , @Persona_Cargo ";
                textselectpart1 += " , Persona_Correo ";
                textselectpart2 += " , @Persona_Correo ";
                //textselectpart1 += " , Url ";
                //textselectpart2 += " , @Url ";

                textselectpart1 = textselectpart1 + " ) ";
                textselectpart2 = textselectpart2 + " ); ";

                var StrQuery = textselectpart1 + textselectpart2;

                log.LogInformation("StrQuery:" + StrQuery);
                log.LogInformation("curentity:" + curentity);

                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    cmd.Parameters.AddWithValue("@UserIdHash", curentity.UserIdHash);
                    cmd.Parameters.AddWithValue("@Send_By", curentity.Send_By);
                    cmd.Parameters.AddWithValue("@Send_Date", curentity.Send_Date);
                    cmd.Parameters.AddWithValue("@PlanAuditoriaId", curentity.PlanAuditoriaId);
                    cmd.Parameters.AddWithValue("@Persona_Name", curentity.Persona_Name);
                    cmd.Parameters.AddWithValue("@Persona_Cargo", curentity.Persona_Cargo);
                    cmd.Parameters.AddWithValue("@Persona_Correo", curentity.Persona_Correo);
                    //cmd.Parameters.AddWithValue("@Url", Url);

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

    public async Task<long> funGuardarPlanAuditoriaPDF(ILogger log, string PlanPdf, ListaEnvioAll curentity)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
        log.LogInformation("Ingreso funGuardarPlanAuditoriaPDF:" + PlanPdf);

        int resultado = 0;
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            // Abrimos la conexion con la DB
            conn.Open();

            try
            {
                // 1.  create a command object identifying the stored procedure
                SqlCommand cmd2 = new SqlCommand("auditoria.post_adjuntar_plan_auditoria_insert", conn);
                // 2. set the command object so it knows to execute a stored procedure
                cmd2.CommandType = CommandType.StoredProcedure;
                cmd2.Parameters.Clear();

                cmd2.Parameters.AddWithValue("@PlanAuditoriaId", curentity.PlanAuditoriaId);
                cmd2.Parameters.AddWithValue("@Adjunto", PlanPdf);
                cmd2.Parameters.AddWithValue("@AdjuntoName", "Plan-Auditoria"+ curentity.PlanAuditoriaId + ".pdf");

                cmd2.Parameters.AddWithValue("@Created_By", curentity.Send_By);

                SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
                output_Id.Direction = ParameterDirection.Output;
                cmd2.Parameters.Add(output_Id);

                cmd2.CommandType =  CommandType.StoredProcedure;

                await cmd2.ExecuteNonQueryAsync();

                if (output_Id.Value != DBNull.Value)
                {
                    resultado = Convert.ToInt16(output_Id.Value);
                    log.LogInformation("resultado: " + resultado);
                }
            }
            catch (Exception ex)
            {
                log.LogInformation("catch::" + ex.Message);
                resultado = 0;
            }
            //cerramos la conexion
            if (conn.State == System.Data.ConnectionState.Open)
                conn.Close();
        }
        return resultado;
    }

    public string funGuardarPdfListaEnvioAll(ILogger log, string PlanPdf, ListaEnvioAll curentity)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
        
        log.LogInformation("Ingreso funGuardarPdfListaEnvioAll:" +PlanPdf);
        //SQL Objects
        SqlDataReader dataReader;
        string Name = "";
        string Url = "formatos/pdf/plan_auditoria/Libro1.pdf";
        log.LogInformation("Url:" +Url);
        //SqlTransaction transaction;
        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {

                log.LogInformation("Ingreso Metodo: antes open");
                conn.Open();

                var textselect = " SELECT A.Id, A.Description, A.Code, A.ProgramaAuditoriaId ";
                textselect += " FROM auditoria.Auditoria AS A INNER JOIN auditoria.Plan_Auditoria AS PA ON PA.AuditoriaId = A.Id AND PA.Id= "+curentity.PlanAuditoriaId;
                
                var StrQuery = textselect;

                log.LogInformation("StrQuery " + StrQuery);
                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    //ejecutar conmando
                    using (dataReader = cmd.ExecuteReader())
                    {
                        //Recorrer el conjunto de datos recuperados
                        while (dataReader.Read())
                        {
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code"))) { Name = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code"))); }
                        }
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Name = "ErrorPDF";
        }


        Name += String.Format("-{0}-", curentity.PlanAuditoriaId);
        Name += DateTime.Now.ToString("yyyy-MM-dd");

        log.LogInformation("Name:" + Name);

        return Url;
    }

}

public class ListaEnvioAll
{
    public long Id { get; set; }
    public string UserIdHash { get; set; }
    public string Send_By { get; set; }
    public DateTime Send_Date { get; set; }
    public int Deleted { get; set; }
    public string Persona_Name { get; set; }
    public string Persona_Cargo { get; set; }
    public string Persona_Correo { get; set; }
    public long PlanAuditoriaId { get; set; }
    public string Url { get; set; }
}
public class DataEmailNew
{
    public string sendto { get; set; }
    public string from { get; set; }
    public string emailsubject { get; set; }
    public string bodyhtml { get; set; }
    public List<Files> Attachments { get; set; }
}

public class Files
{
    public string base64 { get; set; }
    public string name { get; set; }
}