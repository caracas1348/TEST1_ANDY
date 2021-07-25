using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataPlanAuditoriaAll
{
    
    public async Task<long> funPostPlanAuditoriaAll(ILogger log, PlanAuditoriaAll curentity)
    {

        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
        //Lista de Objetos
        long newlongid;
        long newlongidP = 0;

        PlanAuditoriaAll curobj;
        string vvcomodin = "";

        curobj = new PlanAuditoriaAll();
        log.LogInformation("Ingreso Metodo:");
        //SQL Objects
        SqlDataReader dataReader;

        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                log.LogInformation("Ingreso Metodo: antes open");
                conn.Open();
                log.LogInformation("Ingreso Metodo: luego de open");
                //Elimino Plan Previo Por si acaso
                var deleted = " DELETE FROM [auditoria].Programacion_Plan " +
                    "   WHERE[auditoria].Programacion_Plan.PlanAuditoriaId IN(" +
                    "   SELECT[auditoria].Plan_Auditoria.Id" +
                    "   FROM[auditoria].Plan_Auditoria" +
                    "   WHERE[auditoria].Plan_Auditoria.AuditoriaId = @AuditoriaId); ";

                deleted += " DELETE FROM [auditoria].Plan_Auditoria " +
                    " WHERE AuditoriaId = @AuditoriaId; ";

                var QueryDeleted = deleted;
                log.LogInformation("QueryDeleted:" + QueryDeleted);

                using (SqlCommand cmd = new SqlCommand(QueryDeleted, conn))
                {
                    cmd.Parameters.AddWithValue("@AuditoriaId", curentity.AuditoriaId);

                    var modified = cmd.ExecuteNonQuery();
                    log.LogInformation("modified:" + modified);
                }//*/

                //Insertar
                var textselectpart1 = "INSERT INTO auditoria.Plan_Auditoria (  ";
                var textselectpart2 = " output INSERTED.ID VALUES( ";

                textselectpart1 = textselectpart1 + " Created_By, Created_Date, Last_Updated_By, Last_Updated_Date ";
                textselectpart2 = textselectpart2 + " @Created_By, @Created_Date, @Last_Updated_By, @Last_Updated_Date ";

                /*if( curentity.Id !=0)
                { textselectpart1 = textselectpart1 + " Id"; 
                    textselectpart2 = textselectpart2 + " @Id";
                }//*/
                if (curentity.AuditoriaId != null)
                {
                    textselectpart1 = textselectpart1 + ", AuditoriaId ";
                    textselectpart2 = textselectpart2 + ", @AuditoriaId ";
                }
                if (curentity.Detalle != null)
                {
                    textselectpart1 = textselectpart1 + ", Detalle ";
                    textselectpart2 = textselectpart2 + ", @Detalle ";
                }
                if (curentity.Alcance != null)
                {
                    textselectpart1 = textselectpart1 + ", Alcance ";
                    textselectpart2 = textselectpart2 + ", @Alcance ";
                }
                if (curentity.Inicio != null)
                {
                    textselectpart1 = textselectpart1 + ", Inicio ";
                    textselectpart2 = textselectpart2 + ", @Inicio ";
                }
                if (curentity.Fin != null)
                {
                    textselectpart1 = textselectpart1 + ", Fin ";
                    textselectpart2 = textselectpart2 + ", @Fin ";
                }
                if (curentity.Resumen_Auditoria != null)
                {
                    textselectpart1 = textselectpart1 + ", Resumen_Auditoria ";
                    textselectpart2 = textselectpart2 + ", @Resumen_Auditoria ";
                }
                textselectpart1 = textselectpart1 + ", Flag_Finalizado ";
                textselectpart2 = textselectpart2 + ", 0 ";

                textselectpart1 = textselectpart1 + " ) ";
                textselectpart2 = textselectpart2 + " ); ";

                var StrQuery = textselectpart1 + textselectpart2;
                //End - Manejo de Parametros

                log.LogInformation("StrQuery:" + StrQuery);

                //ShipDate < GetDate();

                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    //if( curentity.Id !=0) cmd.Parameters.AddWithValue("@Id", curentity.Id);
                    if (curentity.AuditoriaId != 0) cmd.Parameters.AddWithValue("@AuditoriaId", curentity.AuditoriaId);
                    if (curentity.Detalle != null) cmd.Parameters.AddWithValue("@Detalle", curentity.Detalle);
                    if (curentity.Alcance != null) cmd.Parameters.AddWithValue("@Alcance", curentity.Alcance);
                    if (curentity.Inicio != null) cmd.Parameters.AddWithValue("@Inicio", curentity.Inicio);
                    if (curentity.Fin != null) cmd.Parameters.AddWithValue("@Fin", curentity.Fin);
                    if (curentity.Resumen_Auditoria != null) cmd.Parameters.AddWithValue("@Resumen_Auditoria", curentity.Resumen_Auditoria);
                    //if( curentity.Flag_Finalizado != null) cmd.Parameters.AddWithValue("@Flag_Finalizado", curentity.Flag_Finalizado);

                    cmd.Parameters.AddWithValue("@Created_By", curentity.Created_By);
                    cmd.Parameters.AddWithValue("@Created_Date", curentity.Created_Date);
                    cmd.Parameters.AddWithValue("@Last_Updated_By", curentity.Last_Updated_By);
                    cmd.Parameters.AddWithValue("@Last_Updated_Date", curentity.Last_Updated_Date);
                    //long modified =(long)cmd.ExecuteScalar();
                    var modified = await cmd.ExecuteScalarAsync();
                    //curentity.id = Convert.ToInt64(modified);
                    newlongid = Convert.ToInt64(modified);
                    //newlongid = Convert.ToInt32(modified);
                    log.LogInformation("modified: " + modified);

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
            newlongid = 0;
        }
        return newlongid;
    }



    public PlanAuditoriaAll funPutPlanAuditoriaAll(ILogger log, long curid, PlanAuditoriaAll curentity)
    {
        log.LogInformation("Ingreso Metodo: put sqldb");
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
        //Lista de Objetos
        long newlongid;

        PlanAuditoriaAll curobj;
        string vvcomodin = "";
        curobj = curentity;

        //SQL Objects
        SqlDataReader dataReader;
        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {

                conn.Open();

                //Start - Manejo de Parametros
                var textselectpart1 = "UPDATE auditoria.Plan_Auditoria SET ";
                var textselectpart2 = " WHERE 1=1 AND Id = @Id  ";
                textselectpart1 = textselectpart1 + " Last_Updated_By = @Last_Updated_By , Last_Updated_Date = @Last_Updated_Date ";

                //if( curentity.Id != 0)
                //{ textselectpart1 = textselectpart1 + ", Id = @Id ";  }
                if (curentity.Detalle != null)
                { textselectpart1 = textselectpart1 + ", Detalle = @Detalle "; }
                if (curentity.Alcance != null)
                { textselectpart1 = textselectpart1 + ", Alcance = @Alcance "; }
                if (curentity.Resumen_Auditoria != null)
                { textselectpart1 = textselectpart1 + ", Resumen_Auditoria = @Resumen_Auditoria "; }
                if (curentity.Flag_Finalizado != 0)
                { textselectpart1 = textselectpart1 + ", Flag_Finalizado = @Flag_Finalizado "; }
                /*
                if( curentity.Inicio != null)
                { textselectpart1 = textselectpart1 + ", Inicio ";
                    textselectpart2 = textselectpart2 + ", @Inicio ";
                }
                if( curentity.Fin != null)
                { textselectpart1 = textselectpart1 + ", Fin ";
                    textselectpart2 = textselectpart2 + ", @Fin ";
                }

                if( curentity.EspecialidadId != 0)
                { textselectpart1 = textselectpart1 + ", EspecialidadId = @EspecialidadId ";  }//*/

                textselectpart2 = textselectpart2 + " ; ";

                var StrQuery = textselectpart1 + textselectpart2;
                //End - Manejo de Parametros

                log.LogInformation("StrQuery:" + StrQuery);

                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    cmd.Parameters.AddWithValue("@Id", curid);

                    if (curentity.Detalle != null) cmd.Parameters.AddWithValue("@Detalle", curentity.Detalle);
                    if (curentity.Alcance != null) cmd.Parameters.AddWithValue("@Alcance", curentity.Alcance);
                    if (curentity.Resumen_Auditoria != null) cmd.Parameters.AddWithValue("@Resumen_Auditoria", curentity.Resumen_Auditoria);
                    if (curentity.Flag_Finalizado != 0) cmd.Parameters.AddWithValue("@Flag_Finalizado", curentity.Flag_Finalizado);

                    cmd.Parameters.AddWithValue("@Last_Updated_By", curentity.Last_Updated_By);
                    cmd.Parameters.AddWithValue("@Last_Updated_Date", curentity.Last_Updated_Date);

                    var modified = cmd.ExecuteNonQuery();
                    log.LogInformation("modified:" + modified);
                }

                if (conn.State == System.Data.ConnectionState.Open)
                    conn.Close();

                return curobj;  //*/     
            }
        }
        catch (Exception ex)
        {
            log.LogInformation("catch:" + ex.Message);
            newlongid = 0;
            curobj.Id = 0;
        }
        return curobj;
    } //*/


    public async Task<long> funPostProgramacionAll(ILogger log, ProgramacionPlanAll curentity)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
        //Lista de Objetos
        long newlongid;
        log.LogInformation("Ingreso Metodo:");
        //SQL Objects
        SqlDataReader dataReader;
        long vnIdProceso = 0;

        //SqlTransaction transaction;
        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                log.LogInformation("Ingreso Metodo: antes open");
                conn.Open();
                log.LogInformation("Ingreso Metodo: luego de open");
                var textselectpart1 = "INSERT INTO [auditoria].[Programacion_Plan] (  ";
                var textselectpart2 = " output INSERTED.ID VALUES( ";

                //textselectpart1 = textselectpart1 + " Created_By, Created_Date, Last_Updated_By, Last_Updated_Date ";
                //textselectpart2 = textselectpart2 + " @Created_By, @Created_Date, @Last_Updated_By, @Last_Updated_Date ";
                textselectpart1 = textselectpart1 + " Created_Date ";
                textselectpart2 = textselectpart2 + " switchoffset (CONVERT(datetimeoffset, GETDATE()), '-05:00') ";
                textselectpart1 = textselectpart1 + ", Last_Updated_Date ";
                textselectpart2 = textselectpart2 + ", switchoffset (CONVERT(datetimeoffset, GETDATE()), '-05:00') ";
                textselectpart1 = textselectpart1 + ", PlanAuditoriaId ";
                textselectpart2 = textselectpart2 + ", @PlanAuditoriaId ";
                textselectpart1 = textselectpart1 + ", UnidadNegocioProcesoId ";
                textselectpart2 = textselectpart2 + ", @UnidadNegocioProcesoId ";
                textselectpart1 = textselectpart1 + ", AuditorId ";
                textselectpart2 = textselectpart2 + ", @AuditorId ";
                textselectpart1 = textselectpart1 + ", Inicio ";
                textselectpart2 = textselectpart2 + ", @Inicio ";
                textselectpart1 = textselectpart1 + ", Hora_Inicio ";
                textselectpart2 = textselectpart2 + ", @Hora_Inicio ";
                textselectpart1 = textselectpart1 + ", Hora_Fin ";
                textselectpart2 = textselectpart2 + ", @Hora_Fin ";
                if (curentity.Hora_Inicio_Real != null)
                { 
                    textselectpart1 = textselectpart1 + ", Hora_Inicio_Real ";
                    textselectpart2 = textselectpart2 + ", @Hora_Inicio_Real ";
                }
                if (curentity.Hora_Fin_Real != null)
                {
                    textselectpart1 = textselectpart1 + ", Hora_Fin_Real ";
                    textselectpart2 = textselectpart2 + ", @Hora_Fin_Real ";
                }
                textselectpart1 = textselectpart1 + ", TipoHallazgoId ";
                textselectpart2 = textselectpart2 + ", @TipoHallazgoId ";
                textselectpart1 = textselectpart1 + ", Hallazgo ";
                textselectpart2 = textselectpart2 + ", @Hallazgo ";
                //textselectpart1 = textselectpart1 + ", ProcesoId ";
                //textselectpart2 = textselectpart2 + ", @ProcesoId ";
                textselectpart1 = textselectpart1 + " ) ";
                textselectpart2 = textselectpart2 + " ); ";

                var StrQuery = textselectpart1 + textselectpart2;
                //End - Manejo de Parametros

               

                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    cmd.Parameters.AddWithValue("@Created_Date", curentity.Created_Date);
                    cmd.Parameters.AddWithValue("@PlanAuditoriaId", curentity.PlanAuditoriaId);
                    cmd.Parameters.AddWithValue("@UnidadNegocioProcesoId", curentity.UnidadNegocioProcesoId);
                    cmd.Parameters.AddWithValue("@AuditorId", curentity.AuditorId);
                    cmd.Parameters.AddWithValue("@Inicio", curentity.Inicio);
                    cmd.Parameters.AddWithValue("@Hora_Inicio", curentity.Hora_Inicio);
                    cmd.Parameters.AddWithValue("@Hora_Fin", curentity.Hora_Fin);
                    if (curentity.Hora_Inicio_Real != null) cmd.Parameters.AddWithValue("@Hora_Inicio_Real", curentity.Hora_Inicio_Real);
                    if (curentity.Hora_Fin_Real != null) cmd.Parameters.AddWithValue("@Hora_Fin_Real", curentity.Hora_Fin_Real);
                    cmd.Parameters.AddWithValue("@TipoHallazgoId", curentity.TipoHallazgoId);
                    cmd.Parameters.AddWithValue("@Hallazgo", curentity.Hallazgo);
                    //cmd.Parameters.AddWithValue("@ProcesoId", vnIdProceso);

                    //var modified = cmd.ExecuteScalarAsync();
                    var modified = await cmd.ExecuteScalarAsync();
                    //curentity.id = Convert.ToInt64(modified);
                    //newlongid = Convert.ToInt32(modified);
                    newlongid = Convert.ToInt64(modified);
                    log.LogInformation("register en Programacion_Plan" + modified);

                }

                if (conn.State == System.Data.ConnectionState.Open)
                    conn.Close();

                return newlongid;
            }
        }
        catch (Exception ex)
        {
            log.LogInformation("catch::" + ex.Message);
            newlongid = 0;
            //transaction.Rollback();
        }
        return newlongid;

    }

    /**
     * REGISTRAMOS EN LA TABA LOG DE PLAN AUDITORIA
     */
    public PlanAuditoriaAll funPutLogPlanAuditoriaLogAll(ILogger log, long curid, PlanAuditoriaAll curentity)
    {
        log.LogInformation("Ingreso Metodo: putlog sqldb");
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);

        PlanAuditoriaAll curobj;
        string vvcomodin = "";
        curobj = curentity;

        //SQL Objects
        SqlDataReader dataReader;
        try
        {

            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {

                conn.Open();

                // Desactivar todos los registros de ese PlanAuditoriaId
                //var sqlDel = "UPDATE [auditoria].[Plan_Auditoria_Log] SET Active = 0 WHERE PlanAuditoriaId = " + curid + "; ";  

                // REGISTRAMOS EN EL LOG START
                var textselectpart1 = "INSERT INTO [auditoria].Plan_Auditoria_Log (  ";
                var textselectpart2 = " OUTPUT INSERTED.Id VALUES( ";
                textselectpart1 = textselectpart1 + " Created_By, Created_Date, Active ";
                textselectpart2 = textselectpart2 + " @Created_By, @Created_Date, @Active ";
                if (curentity.Data_Final != null)
                {
                    textselectpart1 = textselectpart1 + ", Data_Final ";
                    textselectpart2 = textselectpart2 + ", @Data_Final ";
                }
                if (curentity.Data_Inicial != null)
                {
                    textselectpart1 = textselectpart1 + ", Data_Inicial ";
                    textselectpart2 = textselectpart2 + ", @Data_Inicial ";
                }
                if (curentity.Motivo != null)
                {
                    textselectpart1 = textselectpart1 + ", Motivo ";
                    textselectpart2 = textselectpart2 + ", @Motivo ";
                }
                if (curid != 0)
                {
                    textselectpart1 = textselectpart1 + ", PlanAuditoriaId ";
                    textselectpart2 = textselectpart2 + ", @PlanAuditoriaId ";
                }//*/
                textselectpart1 = textselectpart1 + " ) ";
                textselectpart2 = textselectpart2 + " ); ";

                var StrQuery = textselectpart1 + textselectpart2;
                //End - Manejo de Parametros

                log.LogInformation("StrQuery:" + StrQuery);
                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    if (curentity.Data_Final != null) cmd.Parameters.AddWithValue("@Data_Final", curentity.Data_Final);
                    if (curentity.Data_Inicial != null) cmd.Parameters.AddWithValue("@Data_Inicial", curentity.Data_Inicial);
                    if (curentity.Motivo != null) cmd.Parameters.AddWithValue("@Motivo", curentity.Motivo);
                    if (curid != null) cmd.Parameters.AddWithValue("@PlanAuditoriaId", curid);
                    cmd.Parameters.AddWithValue("@Active", 1);
                    //cmd.Parameters.AddWithValue("@Created_By", curentity.Created_By);
                    //cmd.Parameters.AddWithValue("@Created_Date", curentity.Created_Date);
                    cmd.Parameters.AddWithValue("@Created_By", curentity.Last_Updated_By);
                    cmd.Parameters.AddWithValue("@Created_Date", curentity.Last_Updated_Date);

                    /*curobj.Detalle = StrQuery+ " - " + curentity.Created_Date;
                    curobj.Detalle += "id- " +curid+" M- "+curentity.Motivo+" CB- "+curentity.Created_By+" DF- "+curentity.Data_Final;
                    curobj.Detalle += "PAId- " +curid+" DI- "+curentity.Data_Inicial;//*/

                    //var modified = cmd.ExecuteScalarAsync();
                    var modified = cmd.ExecuteNonQuery();
                    //curentity.id = Convert.ToInt64(modified);
                    //int newlongid = Convert.ToInt32(modified);
                    log.LogInformation("modified:" + modified);
                }

                //// Actualizamos las fechas de inicio de los requisitos de programados
                var sqlPP = "UPDATE [auditoria].[Programacion_Plan] SET Inicio = @Inicio WHERE PlanAuditoriaId = " + curid + "; ";
                log.LogInformation("sqlPP:" + sqlPP);
                using (SqlCommand cmd = new SqlCommand(sqlPP, conn))
                {
                    if (curobj.Inicio != null) cmd.Parameters.AddWithValue("@Inicio", curobj.Inicio);
                    //var modified = cmd.ExecuteScalarAsync();
                    var modified = cmd.ExecuteNonQuery();
                    log.LogInformation("modified:" + modified);
                }


                if (conn.State == System.Data.ConnectionState.Open)
                    conn.Close();
                // REGISTRAMOS EN EL LOG END
                return curobj;
            }
        }
        catch (Exception ex)
        {
            ///*curobj              = new especialidadall();        
            curobj.Id = 0;
            //curobj.Code         = "Null";
            curobj.Detalle = ex.Message;
            log.LogInformation("catch::" + ex.Message);
            //System.Convert.ToString(ex.Message);
            //newlongid  = -1;
            return curobj;
        }
    }

    /**
     * Modificamos la fecha de ejecucion y guardamor en la tabla PlanAuditoriaLog
     */
    public PlanAuditoriaAll funPutPlanAuditoriaLogAll(ILogger log, long curid, PlanAuditoriaAll curentity)
    {
        log.LogInformation("Ingreso Metodo: putlog sqldb");
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);

        //Lista de Objetos
        long newlongid;
        log.LogInformation("curentity.Last_Updated_By" + curentity.Last_Updated_By);
        log.LogInformation("curentity.Last_Updated_Date" + curentity.Last_Updated_Date);
        PlanAuditoriaAll curobj;
        string vvcomodin = "";
        curobj = curentity;

        //SQL Objects
        SqlDataReader dataReader;
        try
        {

            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {

                conn.Open();

                //Start - Manejo de Parametros actualizar fechas
                var textselectpart1 = "UPDATE auditoria.Plan_Auditoria SET ";
                var textselectpart2 = " WHERE 1=1 AND Id = @Id  ";
                textselectpart1 = textselectpart1 + " Last_Updated_By = @Last_Updated_By, Last_Updated_Date = @Last_Updated_Date ";
                /*if (curentity.Inicio != null)
                {
                    textselectpart1 = textselectpart1 + ", Inicio = @Inicio ";
                }
                if (curentity.Fin != null)
                {
                    textselectpart1 += ", Fin = @Fin ";
                }//*/
                textselectpart2 += " ; ";

                var StrQuery = textselectpart1 + textselectpart2;
                //End - Manejo de Parametros

                log.LogInformation("StrQuery:" + StrQuery);

                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    cmd.Parameters.AddWithValue("@Id", curid);
                    //if (curentity.Inicio != null) cmd.Parameters.AddWithValue("@Inicio", curentity.Inicio);
                    //if (curentity.Fin != null) cmd.Parameters.AddWithValue("@Fin", curentity.Fin);
                    /*
                    if( curentity.Detalle != null) cmd.Parameters.AddWithValue("@Detalle", curentity.Detalle);
                    if( curentity.Alcance != null) cmd.Parameters.AddWithValue("@Alcance", curentity.Alcance);
                    if( curentity.Resumen_Auditoria != null) cmd.Parameters.AddWithValue("@Resumen_Auditoria", curentity.Resumen_Auditoria);
                    cmd.Parameters.AddWithValue("@Created_Date", curentity.Created_Date);
                    cmd.Parameters.AddWithValue("@Last_Updated_Date", curentity.Last_Updated_Date);//*/
                    //cmd.Parameters.AddWithValue("@Active", curentity.Active);
                    //cmd.Parameters.AddWithValue("@EspecialidadId", curentity.EspecialidadId);

                    cmd.Parameters.AddWithValue("@Last_Updated_By", curentity.Last_Updated_By);
                    cmd.Parameters.AddWithValue("@Last_Updated_Date", curentity.Last_Updated_Date);

                    var modified = cmd.ExecuteNonQuery();
                    log.LogInformation("modified:" + modified);
                }

                StrQuery = "UPDATE auditoria.Auditoria SET Last_Updated_By = @Last_Updated_By, Last_Updated_Date = @Last_Updated_Date, Inicio = @Inicio, Fin = @Fin WHERE Id = @Id;";
                log.LogInformation("StrQuery2:" + StrQuery);
                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    cmd.Parameters.AddWithValue("@Id", curentity.AuditoriaId);
                    if (curentity.Inicio != null) cmd.Parameters.AddWithValue("@Inicio", curentity.Inicio);
                    if (curentity.Fin != null) cmd.Parameters.AddWithValue("@Fin", curentity.Fin);
                    cmd.Parameters.AddWithValue("@Last_Updated_By", curentity.Last_Updated_By);
                    cmd.Parameters.AddWithValue("@Last_Updated_Date", curentity.Last_Updated_Date);

                    log.LogInformation("Last_Updated_By:" + curentity.Last_Updated_By);
                    log.LogInformation("Last_Updated_Date:" + curentity.Last_Updated_Date);
                    log.LogInformation("Fin:" + curentity.Fin);
                    log.LogInformation("Inicio:" + curentity.Inicio);
                    log.LogInformation("Id:" + curentity.AuditoriaId);


                    var modified = cmd.ExecuteNonQuery();
                    log.LogInformation("modified222:" + modified);
                }


                if (conn.State == System.Data.ConnectionState.Open)
                    conn.Close();

                return curobj;  //*/     
            }
        }
        catch (Exception ex)
        {
            log.LogInformation("catch:" + ex.Message);
            newlongid = 0;
            curobj.Id = 0;
        }
        return curobj;
    } //*/

    /**
     * Registramos el inicio de un requisito en la tabla Programacion_Plan
     */
    public ProgramacionPlanAll funIniciarRequisitoProgramacionPlanAll(ILogger log, ProgramacionPlanAll curentity)
    {
        log.LogInformation("Ingreso Metodo: iniciarRequesito");
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
        //Lista de Objetos
        ProgramacionPlanAll curobjProg = new ProgramacionPlanAll();
        curobjProg = curentity;

        SqlDataReader dataReader;
        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();
                //Start - Manejo de Parametros
                var textselectpart1 = "UPDATE auditoria.Programacion_Plan SET ";
                var textselectpart2 = " WHERE 1=1 AND Id = @Id  ";
                textselectpart1 = textselectpart1 + " Last_Updated_By = switchoffset (CONVERT(datetimeoffset, GETDATE()), '-05:00') , Last_Updated_Date = switchoffset (CONVERT(datetimeoffset, GETDATE()), '-05:00') ";

                textselectpart1 = textselectpart1 + ", Hora_Inicio_Real = switchoffset (CONVERT(datetimeoffset, GETDATE()), '-05:00') ";

                textselectpart2 = textselectpart2 + " ; ";

                var StrQuery = textselectpart1 + textselectpart2;

                log.LogInformation("StrQuery:" + StrQuery);

                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    cmd.Parameters.AddWithValue("@Id", curobjProg.Id);
                    //cmd.Parameters.AddWithValue("@Hora_Inicio_Real", curobjProg.Last_Updated_Date);
                    //cmd.Parameters.AddWithValue("@Last_Updated_By", curobjProg.Last_Updated_By);
                    //cmd.Parameters.AddWithValue("@Last_Updated_Date", curobjProg.Last_Updated_Date);

                    var modified = cmd.ExecuteNonQuery();
                    log.LogInformation("modified:" + modified);
                }

                // cambio el estatus de la auditoria a En Ejecucion
                textselectpart1 = " UPDATE auditoria.Auditoria SET [auditoria].StatusId = @StatusId, " +
                    " Last_Updated_By = @Last_Updated_By , Last_Updated_Date = @Last_Updated_Date " +
                    " FROM [auditoria].Plan_Auditoria, [auditoria].Programacion_Plan " +
                    " WHERE Auditoria.Id = [auditoria].Plan_Auditoria.AuditoriaId " +
                    " AND [auditoria].Plan_Auditoria.Id = [auditoria].Programacion_Plan.PlanAuditoriaId " +
                    " AND [auditoria].Programacion_Plan.Id = @Id; ";

                StrQuery = textselectpart1;
                log.LogInformation("StrQuery:" + StrQuery);


                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    cmd.Parameters.AddWithValue("@Id", curobjProg.Id);
                    cmd.Parameters.AddWithValue("@StatusId", 6);
                    cmd.Parameters.AddWithValue("@Last_Updated_By", curobjProg.Last_Updated_By);
                    cmd.Parameters.AddWithValue("@Last_Updated_Date", curobjProg.Last_Updated_Date);

                    var modified = cmd.ExecuteNonQuery();
                    log.LogInformation("modified:" + modified);
                }

            }
        }
        catch (Exception ex)
        {
            log.LogInformation("catch:" + ex.Message);
            curobjProg.Id = 0;
            curobjProg.Hallazgo = "Error al Iniciar Requisito";
        }

        return curobjProg;

    }

    /**
     * Registrados el Hallazdo y su Tipo, esto para finalizar el requisito en la tabla Programacion_Plan
     */
    public ProgramacionPlanAll funFinalizeRequisitoProgramacionPlanAll(ILogger log, ProgramacionPlanAll curentity, long Accion)
    {
        log.LogInformation("Ingreso Metodo: finalizeRequesito");
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);

        //Lista de Objetos
        ProgramacionPlanAll curobjProg = new ProgramacionPlanAll();
        curobjProg = curentity;

        SqlDataReader dataReader;
        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();
                //Start - Manejo de Parametros
                var textselectpart1 = "UPDATE auditoria.Programacion_Plan SET ";
                var textselectpart2 = " WHERE 1=1 AND Id = @Id  ";
                textselectpart1 = textselectpart1 + " Last_Updated_By = @Last_Updated_By, Last_Updated_Date = switchoffset (CONVERT(datetimeoffset, GETDATE()), '-05:00') ";
                if (curobjProg.TipoHallazgoId != 0)
                { textselectpart1 = textselectpart1 + ", TipoHallazgoId = @TipoHallazgoId "; }
                if (curobjProg.Hallazgo != null)
                { textselectpart1 = textselectpart1 + ", Hallazgo = @Hallazgo "; }

                if (Accion == 2)
                { textselectpart1 = textselectpart1 + ", Hora_Fin_Real = switchoffset (CONVERT(datetimeoffset, GETDATE()), '-05:00') "; }

                textselectpart2 = textselectpart2 + " ; ";

                var StrQuery = textselectpart1 + textselectpart2;

                log.LogInformation("StrQuery:" + StrQuery);

                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    cmd.Parameters.AddWithValue("@Id", curobjProg.Id);
                    if (curobjProg.TipoHallazgoId != 0) cmd.Parameters.AddWithValue("@TipoHallazgoId", curobjProg.TipoHallazgoId);
                    if (curobjProg.Hallazgo != null) cmd.Parameters.AddWithValue("@Hallazgo", curobjProg.Hallazgo);
                    //if (Accion == 2) cmd.Parameters.AddWithValue("@Hora_Fin_Real", curobjProg.Last_Updated_Date);
                    cmd.Parameters.AddWithValue("@Last_Updated_By", curobjProg.Last_Updated_By);
                    //cmd.Parameters.AddWithValue("@Last_Updated_Date", curobjProg.Last_Updated_Date);

                    var modified = cmd.ExecuteNonQuery();
                    log.LogInformation("modified:" + modified);
                }
                // cambio el estatus de la auditoria
                /*textselectpart1 = " UPDATE auditoria.Auditoria SET [auditoria].StatusId = @StatusId, " +
                    " Last_Updated_By = @Last_Updated_By , Last_Updated_Date = @Last_Updated_Date " +
                    " FROM [auditoria].Plan_Auditoria, [auditoria].Programacion_Plan " +
                    " WHERE Auditoria.Id = [auditoria].Plan_Auditoria.AuditoriaId " +
                    " AND [auditoria].Plan_Auditoria.Id = [auditoria].Programacion_Plan.PlanAuditoriaId " +
                    " AND [auditoria].Programacion_Plan.Id = @Id; ";

                StrQuery = textselectpart1;
                log.LogInformation("StrQuery:" + StrQuery);

                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    cmd.Parameters.AddWithValue("@Id", curobjProg.Id);
                    cmd.Parameters.AddWithValue("@StatusId", 8);
                    cmd.Parameters.AddWithValue("@Last_Updated_By", curobjProg.Last_Updated_By);
                    cmd.Parameters.AddWithValue("@Last_Updated_Date", curobjProg.Last_Updated_Date);

                    var modified = cmd.ExecuteNonQuery();
                    log.LogInformation("modified:" + modified);
                }//*/

            }
        }
        catch (Exception ex)
        {
            log.LogInformation("catch:" + ex.Message);
            curobjProg.Id = 0;
            curobjProg.Hallazgo = "Error al actualizar";
        }

        return curobjProg;

    }


    public void funDeletedProgramacionAll(ILogger log, long vnPlanAuditoriaId)
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

                var query = "DELETE FROM [auditoria].[Programacion_Plan] WHERE PlanAuditoriaId = @PlanAuditoriaId";
                log.LogInformation("StrQuery deleted:" + query);
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@PlanAuditoriaId", vnPlanAuditoriaId);
                    var modified = cmd.ExecuteNonQuery();
                    newlongid = Convert.ToInt32(modified);
                    log.LogInformation("DELETE:" + newlongid.ToString());
                }

                if (conn.State == System.Data.ConnectionState.Open)
                    conn.Close();
            }

        }
        catch (Exception ex)
        {
            log.LogInformation("catch::" + ex.Message);
            newlongid = 0;
            //transaction.Rollback();
        }
        //return newlongid;
    }

    public long funValidarFechasEjecucionAll(ILogger log, long curid, long sedeId, PlanAuditoriaAll curentity)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);

        //Lista de Objetos
        long total = 0;
        long Id = 0;
        log.LogInformation("Ingreso Metodo:");
        log.LogInformation("curentity:" + curentity);
        //SQL Objects
        SqlDataReader dataReader;
        try
        {

            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {

                conn.Open();

                //Start - Manejo de Parametros actualizar fechas
                string fechaDesde = curentity.Inicio.ToString("yyyy-MM-dd");
                string fechaHasta = curentity.Fin.ToString("yyyy-MM-dd");
                
                
                //var textselectpart1 = "SELECT A.Id AS Id FROM auditoria.Auditoria A WHERE A.SedeId = " + sedeId + " AND StatusId != 7 AND A.Inicio >= '" + fechaDesde + "' AND A.Fin <= '" + fechaHasta + "' AND A.Id != "+ curentity.AuditoriaId +" ;";
                var textselectpart1 = "SELECT A.Id AS Id FROM auditoria.Auditoria A WHERE A.SedeId = " + sedeId + " AND StatusId != 7 "+
                "AND ( (A.Inicio <= '" + fechaDesde + "' AND A.Fin >= '" + fechaHasta + "')  " +
                    " OR ( A.Inicio >= '" + fechaDesde + "' AND A.Fin <= '" + fechaHasta + "')  ) " +
                "AND A.Id != " + curentity.AuditoriaId + " ;";

                var StrQuery = textselectpart1;

                log.LogInformation("StrQuery:" + StrQuery);

                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    using (dataReader = cmd.ExecuteReader())
                    {
                        while (dataReader.Read())
                        {
                            total += 1;
                            Id = (long)(dataReader.GetValue(0));
                        }
                    }
                }

                log.LogInformation("-------Id:" + Id);

                if (conn.State == System.Data.ConnectionState.Open)
                    conn.Close();


            }//*/
        }
        catch (Exception ex)
        {
            log.LogInformation("catch:" + ex.Message);
            Id = -1;
        }

        return Id;

    }

    public int funFinalizarProcesoApp(ILogger log, long curid, long procesoId, long normaId, string Last_Updated_By)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);

        int resp = 0;
        DateTime Last_Updated_Date = DateTime.Now;
        DateTime Inicio;
        string Hora_Inicio;
        //SQL Objects
        SqlDataReader dataReader;

        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();

                var textselectpart1 = " UPDATE [auditoria].[Procesos_Auditoria] SET ";
                var textselectpart2 = " WHERE 1=1 AND AuditoriaId = @AuditoriaId AND ProcesoId = @ProcesoId AND NormaId = @NormaId ";

                textselectpart1 += " Last_Updated_Date = switchoffset (CONVERT(datetimeoffset, GETDATE()), '-05:00') ";
                textselectpart1 += ", Flag_Finalizado = @Flag_Finalizado ";
                textselectpart1 += ", Last_Updated_By = @Last_Updated_By ";

                textselectpart2 = textselectpart2 + " ; ";

                var StrQuery = textselectpart1 + textselectpart2;

                log.LogInformation("StrQuery:" + StrQuery);

                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    cmd.Parameters.AddWithValue("@Flag_Finalizado", 1);
                    cmd.Parameters.AddWithValue("@AuditoriaId", curid);
                    cmd.Parameters.AddWithValue("@ProcesoId", procesoId);
                    cmd.Parameters.AddWithValue("@NormaId", normaId);
                    cmd.Parameters.AddWithValue("@Last_Updated_By", Last_Updated_By);

                    var modified = cmd.ExecuteNonQuery();
                    log.LogInformation("modified:" + modified);
                    resp = 1;
                }

                if (conn.State == System.Data.ConnectionState.Open)
                    conn.Close();

                log.LogInformation("resp:" + resp);

            }
        }
        catch (Exception ex)
        {
            log.LogInformation("catch:" + ex.Message);
            resp = 0;
        }

        return resp;
    }

    public List<ProcesosAuditoriaAll> funGetProcesosAuditoria(ILogger log, long auditoriaId)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit",EnvironmentVariableTarget.Process);
        //Lista de Objetos
        List<ProcesosAuditoriaAll> lobjs = new List<ProcesosAuditoriaAll>();
        ProcesosAuditoriaAll curobj = new ProcesosAuditoriaAll();
        //SQL Objects
        SqlDataReader dataReader;
        try{

            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();    
                //Start - Manejo de Parametros
                var textselect = "SELECT DISTINCT P.Id, P.Description, UNP.NormaId, PA.AuditoriaId ";
                textselect += " FROM auditoria.Procesos AS P ";
                textselect += " INNER JOIN auditoria.UnidadNegocioProceso AS UNP ON P.Id = UNP.ProcesoId ";
                textselect += " INNER JOIN auditoria.Programacion_Plan AS PP ON UNP.Id = PP.UnidadNegocioProcesoId ";
                textselect += " INNER JOIN auditoria.Plan_Auditoria AS PA ON PA.Id = PP.PlanAuditoriaId AND PA.AuditoriaId = "+auditoriaId;
                //End - Manejo de Parametros
                var StrQuery =  textselect;
                log.LogInformation("StrQuery:"+StrQuery);
                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    //Ejecutar Comando
                    using (dataReader = cmd.ExecuteReader())  
                    {
                        //Navegar en el Conjunto de Datos Recuperados
                        while (dataReader.Read())  
                        {
                            curobj = new ProcesosAuditoriaAll();
                            curobj.Id = (long)(dataReader.GetValue(0));
                            curobj.NormaId = (long)(dataReader.GetValue(2));
                            curobj.AuditoriaId = (long)(dataReader.GetValue(3));

                            lobjs.Add(curobj);
                        }
                    }
                }
                conn.Close();
            }

        }
        catch (Exception ex)
        {
            curobj = new ProcesosAuditoriaAll();
            curobj.Id = 0;
            lobjs.Add(curobj);
        }

        //retorno el listado de procesos de esta auditoria
        return lobjs;
    }

    public async Task<long> funPostProcesosAuditoriaAll(ILogger log, ProcesosAuditoriaAll curentity)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
        //Lista de Objetos
        long newlongid;
        log.LogInformation("Ingreso Metodo:");
        //SQL Objects
        SqlDataReader dataReader;
        long vnId = 0;

         try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                log.LogInformation("Ingreso Metodo: antes open");
                conn.Open();
                log.LogInformation("Ingreso Metodo: luego de open");

                var textselectpart1 = "INSERT INTO [auditoria].[Procesos_Auditoria] (  ";
                var textselectpart2 = " output INSERTED.Id VALUES( ";
                textselectpart1 = textselectpart1 + " AuditoriaId ";
                textselectpart2 = textselectpart2 + " @AuditoriaId ";
                textselectpart1 = textselectpart1 + ", ProcesoId ";
                textselectpart2 = textselectpart2 + ", @ProcesoId ";
                textselectpart1 = textselectpart1 + ", NormaId ";
                textselectpart2 = textselectpart2 + ", @NormaId ";
                textselectpart1 = textselectpart1 + ", Flag_Finalizado ";
                textselectpart2 = textselectpart2 + ", @Flag_Finalizado ";
                textselectpart1 = textselectpart1 + ", Created_Date ";
                textselectpart2 = textselectpart2 + ", switchoffset (CONVERT(datetimeoffset, GETDATE()), '-05:00') ";
                textselectpart1 = textselectpart1 + " ) ";
                textselectpart2 = textselectpart2 + " ); ";

                var StrQuery = textselectpart1 + textselectpart2;
                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    cmd.Parameters.AddWithValue("@ProcesoId", curentity.Id);
                    cmd.Parameters.AddWithValue("@AuditoriaId", curentity.AuditoriaId);
                    cmd.Parameters.AddWithValue("@NormaId", curentity.NormaId);
                    cmd.Parameters.AddWithValue("@Flag_Finalizado", 0);

                    var modified = await cmd.ExecuteScalarAsync();
                    
                    newlongid = Convert.ToInt64(modified);
                    log.LogInformation("register en Programacion_Plan" + modified);
                }

                if (conn.State == System.Data.ConnectionState.Open)
                    conn.Close();

            }
        }
        catch (Exception ex)
        {
            log.LogInformation("catch::" + ex.Message);
            newlongid = 0;
            //transaction.Rollback();
        }
        return newlongid;
    }

}

public class PlanAuditoriaAll
{
    public long Id { get; set; }
    public long AuditoriaId { get; set; }
    public string Detalle { get; set; }
    public string Alcance { get; set; }
    public DateTime Inicio { get; set; }
    public DateTime Fin { get; set; }
    public DateTime Created_Date { get; set; }
    public DateTime Last_Updated_Date { get; set; }
    public string Last_Updated_By { get; set; }
    public string Created_By { get; set; }
    public string Resumen_Auditoria { get; set; }
    public int Flag_Finalizado { get; set; }
    // DATOS PARA LA TABLA PLAN-AUDITORIA-LOG
    public string Data_Inicial { get; set; }
    public string Data_Final { get; set; }
    public string Motivo { get; set; }
    //public int Active { get; set; }
}

public class ProgramacionPlanAll
{
    public long Id { get; set; }
    public long UnidadNegocioProcesoId { get; set; }
    public long PlanAuditoriaId { get; set; }
    public int AuditorId { get; set; }
    public DateTime Inicio { get; set; }
    public string Hora_Inicio { get; set; }
    public string Hora_Fin { get; set; }
    public string Hora_Inicio_Real { get; set; }
    public string Hora_Fin_Real { get; set; }
    public long TipoHallazgoId { get; set; }
    public string Hallazgo { get; set; }

    public string Created_By { get; set; }
    public DateTime Created_Date { get; set; }
    public string Last_Updated_By { get; set; }
    public DateTime Last_Updated_Date { get; set; }

}

public class PlanAuditoriaLogAll
{
    public long Id { get; set; }
    public string Data_Inicial { get; set; }
    public string Data_Final { get; set; }
    public string Created_By { get; set; }
    public DateTime Created_Date { get; set; }
    public long PlanAuditoriaId { get; set; }
    public int Active { get; set; }
    public string Motivo { get; set; }
}

public class ProcesosAuditoriaAll
{
    public long Id { get; set; }
    public long NormaId { get; set; }
    public long AuditoriaId { get; set; }
}