using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;
using System.Transactions;





class DataAuditorAll
{

    public async Task<int> funPostAuditorAll(ILogger log, auditor curentity)
    {

        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
        //var vvsqlconnectionString1 = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSecurity",EnvironmentVariableTarget.Process);


        //Lista de Objetos
        int newlongid = 0;
        int newlongid2 = 0;

        log.LogInformation("Ingreso Metodo:");
        //SQL Objects



        using (TransactionScope scope = new TransactionScope())
        {
            try
            {
                newlongid = DeletedCommand(log, curentity, vvsqlconnectionString);

                newlongid = ExecuteCommandA(log, curentity, vvsqlconnectionString);
                
               
                if (newlongid > 0)
                {
                    bool exito = ExecuteCommandB(log, newlongid, curentity, vvsqlconnectionString);

                    if (exito)
                    {
                        exito = ExecuteCommandC(log, newlongid, curentity, vvsqlconnectionString);

                        if (exito)
                        {
                            scope.Complete();
                        }
                    }
                }

            }
            catch (Exception ex)
            {
                log.LogInformation("catch::" + ex.Message);
                newlongid = -1;
                //scope.Dispose();
            }
        }

        
        return newlongid;
    }



    private static int DeletedCommand(ILogger log, auditor curentity, string vvsqlconnectionString)
    {
        int rowsDeleted = 0;
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            log.LogInformation("Ingreso Metodo: antes open");
            conn.Open();

            var query = "UPDATE auditoria.Auditor SET Active = 0 WHERE Id = @Id";

            log.LogInformation("StrQuery deleted:" + query);

            using (SqlCommand cmd = new SqlCommand(query, conn))
            {
                cmd.Parameters.AddWithValue("@Id", curentity.Id);
                var modified = cmd.ExecuteNonQuery();
                rowsDeleted = Convert.ToInt32(modified);
            }


            query = "UPDATE [auditoria].[Capacitacion] SET Active = 0 WHERE AuditorId = @AuditorId";

            log.LogInformation("StrQuery deleted:" + query);

            using (SqlCommand cmd = new SqlCommand(query, conn))
            {
                cmd.Parameters.AddWithValue("@AuditorId", curentity.Id);
                var modified = cmd.ExecuteNonQuery();
                rowsDeleted = Convert.ToInt32(modified);
            }



            query = "UPDATE [auditoria].[Experiencia] SET Active = 0 WHERE AuditorId = @AuditorId";

            log.LogInformation("StrQuery deleted:" + query);

            using (SqlCommand cmd = new SqlCommand(query, conn))
            {
                cmd.Parameters.AddWithValue("@AuditorId", curentity.Id);
                var modified = cmd.ExecuteNonQuery();
                rowsDeleted = Convert.ToInt32(modified);
            }
        }

        return rowsDeleted;
    }


    private static int ExecuteCommandA(ILogger log, auditor curentity, string vvsqlconnectionString)
    {
        log.LogInformation("curentity.SedeId "+ curentity.SedeId);
        log.LogInformation("curentity.Rol_Code "+ curentity.Rol_Code);
        log.LogInformation("curentity.EspecialidadId "+ curentity.EspecialidadId);
        int newlongid = 0;
        //int NewRol = 0;//andy
        //string idhashh = "";//andy
        // ------- Start - DATOS GENERALES -------- //





        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            log.LogInformation("Ingreso Metodo: antes open");
            conn.Open();


            //Start - Manejo de Parametros

            log.LogInformation("Ingreso Metodo: luego de open");

            var textselectpart1 = "INSERT INTO auditoria.Auditor (  ";
            var textselectpart2 = " output INSERTED.ID VALUES( ";

            textselectpart1 = textselectpart1 + " Create_By, Create_Date ";
            textselectpart2 = textselectpart2 + " @Create_By, @Create_Date ";

            if (curentity.Id != 0)
            {
                textselectpart1 = textselectpart1 + ",Id";
                textselectpart2 = textselectpart2 + ",@Id";
            }
            if (curentity.UserIdhash != null)
            {
                textselectpart1 = textselectpart1 + ",UserIdhash";
                textselectpart2 = textselectpart2 + ",@UserIdhash";
            }
            if (curentity.Name != null)
            {
                textselectpart1 = textselectpart1 + ",Name";
                textselectpart2 = textselectpart2 + ",@Name";
            }
            if (curentity.Rol_Code != null)
            {
                textselectpart1 = textselectpart1 + ",Rol_Code";
                textselectpart2 = textselectpart2 + ",@Rol_Code";
            }
            if (curentity.SedeId != 0)
            {
                textselectpart1 = textselectpart1 + ",SedeId";
                textselectpart2 = textselectpart2 + ",@SedeId";
            }
            if (curentity.Active != 0)
            {
                textselectpart1 = textselectpart1 + ",Active";
                textselectpart2 = textselectpart2 + ",@Active";
            }
            if (curentity.EspecialidadId != 0)
            {
                textselectpart1 = textselectpart1 + ",EspecialidadId";
                textselectpart2 = textselectpart2 + ",@EspecialidadId";
            }
            if (curentity.Cargo != null)
            {
                textselectpart1 = textselectpart1 + ",Cargo";
                textselectpart2 = textselectpart2 + ",@Cargo";
            }
            if (curentity.Tipo != 0)
            {
                textselectpart1 = textselectpart1 + ",Tipo";
                textselectpart2 = textselectpart2 + ",@Tipo";
            }
            if (curentity.Correo != null)
            {
                textselectpart1 = textselectpart1 + ",Correo";
                textselectpart2 = textselectpart2 + ",@Correo";
            }

            textselectpart1 = textselectpart1 + " ) ";
            textselectpart2 = textselectpart2 + " ); ";

            var StrQuery = textselectpart1 + textselectpart2;
            //End - Manejo de Parametros



            log.LogInformation("StrQuery:" + StrQuery);

            //ShipDate < GetDate();

            using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
            {

                if (curentity.Id != 0) cmd.Parameters.AddWithValue("@Id", curentity.Id);
                if (curentity.UserIdhash != null) cmd.Parameters.AddWithValue("@UserIdhash", curentity.UserIdhash);
                if (curentity.Name != null) cmd.Parameters.AddWithValue("@Name", curentity.Name);
                if (curentity.Rol_Code != null) cmd.Parameters.AddWithValue("@Rol_Code", curentity.Rol_Code);
                if (curentity.SedeId != 0) cmd.Parameters.AddWithValue("@SedeId", curentity.SedeId);
                if (curentity.Active != 0) cmd.Parameters.AddWithValue("@Active", curentity.Active);
                if (curentity.EspecialidadId != 0) cmd.Parameters.AddWithValue("@EspecialidadId", curentity.EspecialidadId);
                if (curentity.Cargo != null) cmd.Parameters.AddWithValue("@Cargo", curentity.Cargo);
                if (curentity.Correo != null) cmd.Parameters.AddWithValue("@Correo", curentity.Correo);
                if (curentity.Tipo != 0) cmd.Parameters.AddWithValue("@Tipo", curentity.Tipo);
                cmd.Parameters.AddWithValue("@Create_By", curentity.Create_By);
                cmd.Parameters.AddWithValue("@Create_Date", curentity.Create_Date);

                // cmd.Parameters.AddWithValue("@Last_Updated_By", curentity.Last_Updated_By);
                // cmd.Parameters.AddWithValue("@Last_Updated_Date", curentity.Last_Updated_Date);
                //long modified =(long)cmd.ExecuteScalar();
                var modified = cmd.ExecuteScalar();
                //curentity.id = Convert.ToInt64(modified);
                newlongid = Convert.ToInt32(modified);
                log.LogInformation("modified:" + modified);

                 cmd.Parameters.AddWithValue("@Tipo", curentity.Tipo);

                 // if(curentity.Tipo == 1){NewRol = 41;}//lider
                 // if(curentity.Tipo == 2){NewRol = 46;}//auditor
                 // if(curentity.Tipo == 3){NewRol = 42;}//observador

                 // idhashh = curentity.UserIdhash;
              


            }
        }
        // ------- End - DATOS GENERALES -------- //







   





        return newlongid;
    }








    private static bool ExecuteCommandB(ILogger log, int newlongid, auditor curentity, string vvsqlconnectionString)
    {
        bool exito = true;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            log.LogInformation("Ingreso Metodo: antes open");
            conn.Open();

            foreach (capacitacion item in curentity.Capacitacion)
            {
                if(item.Id == 0)
                {
                // ------- Start - CAPACITACION -------- //
                    log.LogInformation("Ingreso Metodo: luego de open");

                    var StrQuery = "INSERT INTO [auditoria].[Capacitacion] ";
                    StrQuery += "([AuditorId]";
                    StrQuery += ",[NormaId]";
                    StrQuery += ",[TipoCursoId]";
                    StrQuery += ",[Tipo]";
                    StrQuery += ",[Fecha_Inicio]";
                    StrQuery += ",[Fecha_Final]";
                    StrQuery += ",[Adjunto]";
                    StrQuery += ",[Active]";
                    StrQuery += ",[Created_By]";
                    StrQuery += ",[Created_Date]) ";
                    StrQuery += " output INSERTED.ID VALUES ";
                    StrQuery += "(@AuditorId";
                    StrQuery += ",@NormaId";
                    StrQuery += ",@TipoCursoId";
                    StrQuery += ",@Tipo";
                    StrQuery += ",@Fecha_Inicio";
                    StrQuery += ",@Fecha_Final";
                    StrQuery += ",@Adjunto";
                    StrQuery += ",@Active";
                    StrQuery += ",@Created_By";
                    StrQuery += ",@Created_Date);";
                    //End - Manejo de Parametros


                    log.LogInformation("StrQuery:" + StrQuery);
                    int inserted = 0;

                    using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                    {

                        if (newlongid != 0) cmd.Parameters.AddWithValue("@AuditorId", newlongid);
                        if (item.NormaId != 0) cmd.Parameters.AddWithValue("@NormaId", item.NormaId);
                        if (item.TipoCursoId != 0) cmd.Parameters.AddWithValue("@TipoCursoId", item.TipoCursoId);
                        if (item.Tipo != 0) cmd.Parameters.AddWithValue("@Tipo", item.Tipo);
                        cmd.Parameters.AddWithValue("@Fecha_Inicio", item.Fecha_Inicio);
                        cmd.Parameters.AddWithValue("@Fecha_Final", item.Fecha_Final);
                        if (item.Adjunto != null) cmd.Parameters.AddWithValue("@Adjunto", item.Adjunto);
                        cmd.Parameters.AddWithValue("@Active", item.Active);
                        cmd.Parameters.AddWithValue("@Created_By", item.Created_By);
                        cmd.Parameters.AddWithValue("@Created_Date", item.Created_Date);

                        var modified = cmd.ExecuteScalar();
                        inserted = Convert.ToInt32(modified);
                        log.LogInformation("modified:" + modified);
                    }


                    if (inserted == 0)
                    {
                        exito = false;
                        break;
                    }


                    // ------- End - CAPACITACION -------- //
                    //
                }
            }

        }

        return exito;
    }




    private static bool ExecuteCommandC(ILogger log, int newlongid, auditor curentity, string vvsqlconnectionString)
    {
        bool exito = true;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            log.LogInformation("Ingreso Metodo: antes open");
            conn.Open();

            foreach (experiencia item in curentity.Experiencia)
            {
                if(item.Id == 0)
                {
                    // ------- Start - EXPERIENCIA -------- //
                    log.LogInformation("Ingreso Metodo: luego de open");

                    var StrQuery = "INSERT INTO [auditoria].[Experiencia] ";
                    StrQuery += "([AuditorId] ";
                    StrQuery += ",[NormaId] ";
                    StrQuery += ",[RolId] ";
                    StrQuery += ",[FechaInicio] ";
                    StrQuery += ",[FechaFin] ";
                    StrQuery += ",[AuditoriaId] ";
                    StrQuery += ",[EstadoId] ";
                    StrQuery += ",[Comentario] ";
                    StrQuery += ",[Active] ";
                    StrQuery += ",[Created_By] ";
                    StrQuery += ",[Created_Date] ";
                    StrQuery += ",[Adjunto]) ";
                    StrQuery += "output INSERTED.ID VALUES ";
                    StrQuery += "(@AuditorId ";
                    StrQuery += ",@NormaId ";
                    StrQuery += ",@RolId ";
                    StrQuery += ",@FechaInicio ";
                    StrQuery += ",@FechaFin ";
                    StrQuery += ",@AuditoriaId ";
                    StrQuery += ",@EstadoId ";
                    StrQuery += ",@Comentario ";
                    StrQuery += ",@Active ";
                    StrQuery += ",@Created_By ";
                    StrQuery += ",@Created_Date ";
                    StrQuery += ",@Adjunto);";
                    //End - Manejo de Parametros


                    log.LogInformation("StrQuery:" + StrQuery);
                    int inserted = 0;

                    using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                    {

                        if (newlongid != 0) cmd.Parameters.AddWithValue("@AuditorId", newlongid);
                        if (item.NormaId != 0) cmd.Parameters.AddWithValue("@NormaId", item.NormaId);
                        if (item.RolId != 0) cmd.Parameters.AddWithValue("@RolId", item.RolId);
                        cmd.Parameters.AddWithValue("@FechaInicio", item.FechaInicio);
                        cmd.Parameters.AddWithValue("@FechaFin", item.FechaFin);
                        cmd.Parameters.AddWithValue("@AuditoriaId", 0);
                        cmd.Parameters.AddWithValue("@EstadoId", 2);
                        cmd.Parameters.AddWithValue("@Comentario", "");
                        cmd.Parameters.AddWithValue("@Active", item.Active);
                        if (item.Adjunto != null) cmd.Parameters.AddWithValue("@Adjunto", item.Adjunto);
                        cmd.Parameters.AddWithValue("@Created_By", item.Created_By);
                        cmd.Parameters.AddWithValue("@Created_Date", item.Created_Date);

                        var modified = cmd.ExecuteScalar();
                        inserted = Convert.ToInt32(modified);
                        log.LogInformation("modified:" + modified);
                    }


                    if (inserted == 0)
                    {
                        exito = false;
                        break;
                    }
                    // ------- End - EXPERIENCIA -------- //
                }

            }

        }


        return exito;

    }




    public auditor funPutAuditorAll(ILogger log, int curid, auditor curentity)
    {

        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);

        //Lista de Objetos
        long newlongid;

        auditor curobj;
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
                //if (curentity.UserIdhash != null)
                //{ textselectpart1 = textselectpart1 + ", UserIdhash = @UserIdhash"; }
                //if (curentity.Name != null)
                //{ textselectpart1 = textselectpart1 + ", Name = @Name"; }
                if (curentity.Rol_Code != null)
                { textselectpart1 = textselectpart1 + ", Rol_Code = @Rol_Code"; }
                if (curentity.SedeId != 0)
                { textselectpart1 = textselectpart1 + ", SedeId = @SedeId "; }
                if (curentity.Active >= 0)
                { textselectpart1 = textselectpart1 + ", Active = @Active "; }
                if (curentity.EspecialidadId != 0)
                { textselectpart1 = textselectpart1 + ", EspecialidadId = @EspecialidadId "; }
                //if (curentity.Cargo != null)
                //{ textselectpart1 = textselectpart1 + ", Cargo = @Cargo"; }
                if (curentity.Observacion != null)
                { textselectpart1 = textselectpart1 + ", Observacion = @Observacion"; }
                if (curentity.Tipo != 0)
                { textselectpart1 = textselectpart1 + ", Tipo = @Tipo "; }
                if (curentity.Correo != null)
                {
                    textselectpart1 = textselectpart1 + ", Correo = @Correo";
                }
                textselectpart2 = textselectpart2 + " ; ";

                var StrQuery = textselectpart1 + textselectpart2;
                //End - Manejo de Parametros

                log.LogInformation("StrQuery:" + StrQuery);

                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    cmd.Parameters.AddWithValue("@Id", curid);
                    //if (curentity.UserIdhash != null) cmd.Parameters.AddWithValue("@UserIdhash", curentity.UserIdhash);
                    //if (curentity.Name != null) cmd.Parameters.AddWithValue("@Name", curentity.Name);
                    if (curentity.Rol_Code != null) cmd.Parameters.AddWithValue("@Rol_Code", curentity.Rol_Code);
                    if (curentity.Tipo != 0) cmd.Parameters.AddWithValue("@Tipo", curentity.Tipo);
                    cmd.Parameters.AddWithValue("@SedeId", curentity.SedeId);
                    cmd.Parameters.AddWithValue("@Active", curentity.Active);
                    cmd.Parameters.AddWithValue("@EspecialidadId", curentity.EspecialidadId);
                    if (curentity.Correo != null) cmd.Parameters.AddWithValue("@Correo", curentity.Correo);
                    //if (curentity.Cargo != null) cmd.Parameters.AddWithValue("@Cargo", curentity.Cargo);
                    cmd.Parameters.AddWithValue("@Create_By", curentity.Create_By);
                    if (curentity.Observacion != null) cmd.Parameters.AddWithValue("@Observacion", curentity.Observacion);
                    // cmd.Parameters.AddWithValue("@Create_Date", curentity.Create_Date);
                    var modified = cmd.ExecuteNonQuery();
                    log.LogInformation("modified:" + modified);

                    ///////nuevo
                    if (modified == 1)
                    {
                        //var query = "UPDATE [auditoria].[Capacitacion] SET Active = 0 WHERE AuditorId = @AuditorId";
                        //////////////////////
                        /*var query = "DELETE FROM [auditoria].[Capacitacion] WHERE AuditorId = @AuditorId";

                        log.LogInformation("StrQuery deleted:" + query);

                        using (SqlCommand cmd2 = new SqlCommand(query, conn))
                        {
                            cmd2.Parameters.AddWithValue("@AuditorId", curid);
                            modified = cmd2.ExecuteNonQuery();
                            var rowsDeleted = Convert.ToInt32(modified);
                        }



                        //query = "UPDATE [auditoria].[Experiencia] SET Active = 0 WHERE AuditorId = @AuditorId";
                        query = "DELETE FROM [auditoria].[Experiencia] WHERE AuditorId = @AuditorId";

                        log.LogInformation("StrQuery deleted:" + query);

                        using (SqlCommand cmd2 = new SqlCommand(query, conn))
                        {
                            cmd2.Parameters.AddWithValue("@AuditorId", curid);
                            modified = cmd2.ExecuteNonQuery();
                            var rowsDeleted = Convert.ToInt32(modified);
                        }//*/
                        //////////////////////

                        bool exito = ExecuteCommandB(log, curid, curentity, vvsqlconnectionString);

                        exito = ExecuteCommandC(log, curid, curentity, vvsqlconnectionString);
                    }
                    ///////nuevo


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
            auditor curobj = new auditor();
            curobj.Id = 0;
        }
        return vnupdaterows;
    }
}


public class auditor
{
    public int Id { get; set; }
    public string UserIdhash { get; set; }
    public string Name { get; set; }
    public string Rol_Code { get; set; }
    public int SedeId { get; set; }
    public int Active { get; set; }
    public int EspecialidadId { get; set; }
    public string Cargo { get; set; }
    public string Correo { get; set; }
    public string Create_By { get; set; }
    public DateTime Create_Date { get; set; }
    public string Last_Updated_By { get; set; }
    public DateTime Last_Updated_Date { get; set; }
    public int Tipo { get; set; }
    public string Observacion { get; set; }
    public List<capacitacion> Capacitacion { get; set; }
    public List<experiencia> Experiencia { get; set; }
}


public class capacitacion
{
    public int Id { get; set; }
    public int AuditorId { get; set; }
    public int NormaId { get; set; }
    public int TipoCursoId { get; set; }
    public int Tipo { get; set; }
    public DateTime Fecha_Inicio { get; set; }
    public DateTime Fecha_Final { get; set; }
    public string Adjunto { get; set; }
    public int Active { get; set; }
    public string Created_By { get; set; }
    public DateTime Created_Date { get; set; }
    public string Deleted_By { get; set; }
    public DateTime Deleted_Date { get; set; }
}

public class experiencia
{
    public int Id { get; set; }
    public int AuditorId { get; set; }
    public int NormaId { get; set; }
    public int RolId { get; set; }
    public DateTime FechaInicio { get; set; }
    public DateTime FechaFin { get; set; }
    public int AuditoriaId { get; set; }
    public int EstadoId { get; set; }
    public string Comentario { get; set; }
    public int Active { get; set; }
    public string Adjunto { get; set; }
    public string Created_By { get; set; }
    public DateTime Created_Date { get; set; }
    public string Deleted_By { get; set; }
    public DateTime Deleted_Date { get; set; }
}






