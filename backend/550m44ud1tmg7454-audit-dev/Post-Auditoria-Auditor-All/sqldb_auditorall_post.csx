using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataAuditorAll
{

    public void funDeletedAuditorAll(ILogger log, AuditoriaAuditorAll curentity)
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




                var query = "DELETE FROM [auditoria].[Auditoria_Auditor] WHERE AuditoriaId = @AuditoriaId";

                log.LogInformation("StrQuery deleted:" + query);

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@AuditoriaId", curentity.AuditoriaId);
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



    public async Task<int> funPostAuditorAll(ILogger log, AuditoriaAuditorAll curentity)
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

                    var textselectpart1 = "INSERT INTO [auditoria].[Auditoria_Auditor] (  ";
                    var textselectpart2 = " output INSERTED.ID VALUES( ";

                    textselectpart1 = textselectpart1 + " Created_By, Created_Date ";
                    textselectpart2 = textselectpart2 + " @Create_By, @Create_Date ";

                    textselectpart1 = textselectpart1 + ",AuditoriaId";
                    textselectpart2 = textselectpart2 + ",@AuditoriaId";
                    textselectpart1 = textselectpart1 + ",AuditorId";
                    textselectpart2 = textselectpart2 + ",@AuditorId";
                    textselectpart1 = textselectpart1 + ",Active";
                    textselectpart2 = textselectpart2 + ",@Active";
                    textselectpart1 = textselectpart1 + ",Tipo";
                    textselectpart2 = textselectpart2 + ",@Tipo";

                    textselectpart1 = textselectpart1 + " ) ";
                    textselectpart2 = textselectpart2 + " ); ";

                    var StrQuery = textselectpart1 + textselectpart2;
                    //End - Manejo de Parametros

                    log.LogInformation("StrQuery:" + StrQuery);

                    //ShipDate < GetDate();

                    using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                    {
                        //cmd.Transaction = transaction;

                        cmd.Parameters.AddWithValue("@AuditoriaId", curentity.AuditoriaId);
                        cmd.Parameters.AddWithValue("@AuditorId", curentity.AuditorId);
                        cmd.Parameters.AddWithValue("@Active", curentity.Active);
                        cmd.Parameters.AddWithValue("@Tipo", curentity.Tipo);
                        cmd.Parameters.AddWithValue("@Create_By", curentity.Create_By);
                        cmd.Parameters.AddWithValue("@Create_Date", curentity.Create_Date);

                        var modified = await cmd.ExecuteScalarAsync();
                        //curentity.id = Convert.ToInt64(modified);
                        newlongid = Convert.ToInt32(modified);
                        log.LogInformation("modified:" + modified);
                    }


                    var sqlUpdate = "UPDATE [auditoria].[Auditoria] SET StatusId = 2 WHERE Id = @Id; "; //" + curentity.AuditoriaId + "

                    using (SqlCommand cmd = new SqlCommand(sqlUpdate, conn))
                    {
                        cmd.Parameters.AddWithValue("@Id", curentity.AuditoriaId);
                        var modified = cmd.ExecuteNonQuery();
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
        return newlongid;
    }



    public auditorall funPutAuditorAll(ILogger log, int curid, auditorall curentity)
    {

        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);

        //Lista de Objetos
        long newlongid;

        auditorall curobj;
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
                var textselectpart1 = "UPDATE auditoria.Auditor SET ";
                var textselectpart2 = " WHERE 1=1 AND Id = @Id  ";
                textselectpart1 = textselectpart1 + " Create_By = @Create_By ";

                if (curentity.Id != 0)
                { textselectpart1 = textselectpart1 + ", Id = @Id "; }
                if (curentity.UserIdhash != null)
                { textselectpart1 = textselectpart1 + ", UserIdhash = @UserIdhash"; }
                if (curentity.Name != null)
                { textselectpart1 = textselectpart1 + ", Name = @Name"; }
                if (curentity.Rol_Code != null)
                { textselectpart1 = textselectpart1 + ", Rol_Code = @Rol_Code"; }
                if (curentity.SedeId != 0)
                { textselectpart1 = textselectpart1 + ", SedeId = @SedeId "; }
                if (curentity.Active != 0)
                { textselectpart1 = textselectpart1 + ", Active = @Active "; }
                if (curentity.EspecialidadId != 0)
                { textselectpart1 = textselectpart1 + ", EspecialidadId = @EspecialidadId "; }
                if (curentity.Cargo != null)
                { textselectpart1 = textselectpart1 + ", Cargo = @Cargo"; }
                textselectpart2 = textselectpart2 + " ; ";

                var StrQuery = textselectpart1 + textselectpart2;
                //End - Manejo de Parametros

                log.LogInformation("StrQuery:" + StrQuery);

                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    cmd.Parameters.AddWithValue("@Id", curid);
                    if (curentity.UserIdhash != null) cmd.Parameters.AddWithValue("@UserIdhash", curentity.UserIdhash);
                    if (curentity.Name != null) cmd.Parameters.AddWithValue("@Name", curentity.Name);
                    if (curentity.Rol_Code != null) cmd.Parameters.AddWithValue("@Rol_Code", curentity.Rol_Code);
                    cmd.Parameters.AddWithValue("@SedeId", curentity.SedeId);
                    cmd.Parameters.AddWithValue("@Active", curentity.Active);
                    cmd.Parameters.AddWithValue("@EspecialidadId", curentity.EspecialidadId);
                    if (curentity.Cargo != null) cmd.Parameters.AddWithValue("@Cargo", curentity.Cargo);
                    cmd.Parameters.AddWithValue("@Create_By", curentity.Create_By);
                    // cmd.Parameters.AddWithValue("@Create_Date", curentity.Create_Date);
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
    }




    public long funDeleteAuditorAll(ILogger log, int curid)
    {

        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);

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
                var textselectpart1 = "UPDATE auditoria.Auditor ";
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
            auditorall curobj = new auditorall();
            curobj.Id = 0;
        }
        return vnupdaterows;
    }
}


public class auditorall
{
    public int Id { get; set; }
    public string UserIdhash { get; set; }
    public string Name { get; set; }
    public string Rol_Code { get; set; }
    public int SedeId { get; set; }
    public int Active { get; set; }
    public int EspecialidadId { get; set; }
    public string Cargo { get; set; }
    public string Create_By { get; set; }
    public DateTime Create_Date { get; set; }
    public string Last_Updated_By { get; set; }
    public DateTime Last_Updated_Date { get; set; }
}


public class AuditoriaAuditorAll
{
    public int      Id                { get; set; }
    public long     AuditoriaId       { get; set; }
    public int      AuditorId         { get; set; }
    public string   Create_By         { get; set; }
    public DateTime Create_Date       { get; set; }
    public int      Active            { get; set; }
    public int      Tipo              { get; set; }
    public string   Name              { get; set; }
    public string   Correo            { get; set; }
    public string   ProgramaAuditoria { get; set; }
    public string   AuditoriaCode     { get; set; }
    public string   TipoAuditoria     { get; set; }
    public string   UnidadNegocio     { get; set; }
    public string   Sede              { get; set; }
    public string   Normas            { get; set; }
    public string   Inicio            { get; set; }
    public string   Fin               { get; set; }
    public string   User              { get; set; }
    public string   Job               { get; set; }
    public string   Email             { get; set; }
}

public class DataEmailNew
{
    public string sendto { get; set; }
    public string from { get; set; }
    public string emailsubject { get; set; }
    public string bodyhtml { get; set; }
}

