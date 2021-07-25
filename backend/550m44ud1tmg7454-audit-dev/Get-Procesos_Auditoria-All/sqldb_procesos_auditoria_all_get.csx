using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;
using System.Diagnostics;

class DataProcesosAuditoriaAllGet
{
    /**
     * retorno el listado de procesos a ser auditados por auditoria
     */
    public List<procesosAuditoriaAllGet> funGetProcesosAuditoriaAllList(ILogger log
                                                                            , long vnIdAuditoria
                                                                            , string vvIdNorma
                                                                            )
    {
        log.LogInformation("En el modelo DataProcesosAuditoriaAllGet");
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
        //Lista de objetos
        List<procesosAuditoriaAllGet> lobjs = new List<procesosAuditoriaAllGet>();
        procesosAuditoriaAllGet curobj = new procesosAuditoriaAllGet();
        //SQL Objects
        SqlDataReader dataReader;

        log.LogInformation("try");
        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();

                string IdNormas = vvIdNorma;
                var Normas = IdNormas.Split(',');
                //recorrer las normas
                foreach (var item in Normas)
                {
                    var textselect = " SELECT P.Id, P.Code, P.Description, P.Cargo, PA.AuditoriaId AS AuditoriaId, "; //, PA.AuditoriaId
                    textselect += " UNP.Id AS UnidadNegocioProcesoId, UNP.NormaId, UNP.UnidadNegocioId, ";
                    textselect += " (SELECT count(Id) FROM [auditoria].UnidadNegocioProceso WHERE ProcesoId = P.Id ) AS NumRequisitos, ";
                    textselect += " (SELECT count(Id) FROM auditoria.UnidadNegocioProceso WHERE ProcesoId = [P].Id AND Id = UNP.Id AND Id = PP.UnidadNegocioProcesoId AND PP.TipoHallazgoId IS NOT NULL ) AS NumRequisitosListos ";
                    textselect += " FROM [auditoria].[Procesos] P ";
                    textselect += " INNER JOIN [auditoria].[UnidadNegocioProceso] UNP ON UNP.ProcesoId = P.Id ";
                    textselect += " INNER JOIN [auditoria].[Programacion_Plan] PP ON UNP.Id = PP.UnidadNegocioProcesoId ";
                    textselect += " INNER JOIN [auditoria].[Plan_Auditoria] PA ON PP.PlanAuditoriaId = PA.Id ";
                    textselect += " INNER JOIN [auditoria].[Auditoria] A ON PA.AuditoriaId = A.Id ";
                    textselect += " WHERE (P.Deleted IS NULL OR P.Deleted = 0) ";
                    if (vnIdAuditoria != 0)
                    { textselect += String.Format(" AND A.[Id] = {0} ", vnIdAuditoria); }
                    textselect += String.Format(" AND UNP.[NormaId] = {0} ", item);

                    textselect += " GROUP BY P.Id, P.Code, P.Description, P.Cargo, PA.AuditoriaId, UNP.Id, UNP.NormaId, UNP.UnidadNegocioId, PP.UnidadNegocioProcesoId, PP.TipoHallazgoId ";
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
                                curobj = new procesosAuditoriaAllGet();
                                curobj.Id = (long)(dataReader.GetValue(0));
                                if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code"))) { curobj.Code = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code"))); }
                                if (!dataReader.IsDBNull(dataReader.GetOrdinal("Description"))) { curobj.Description = (string)(dataReader.GetValue(dataReader.GetOrdinal("Description"))); }
                                if (!dataReader.IsDBNull(dataReader.GetOrdinal("Cargo"))) { curobj.Cargo = (string)(dataReader.GetValue(dataReader.GetOrdinal("Cargo"))); }
                                if (!dataReader.IsDBNull(dataReader.GetOrdinal("AuditoriaId"))) { curobj.AuditoriaId = (long)(dataReader.GetValue(dataReader.GetOrdinal("AuditoriaId"))); }
                                if (!dataReader.IsDBNull(dataReader.GetOrdinal("UnidadNegocioProcesoId"))) { curobj.UnidadNegocioProcesoId = (long)(dataReader.GetValue(dataReader.GetOrdinal("UnidadNegocioProcesoId"))); }
                                if (!dataReader.IsDBNull(dataReader.GetOrdinal("NormaId"))) { curobj.NormaId = (long)(dataReader.GetValue(dataReader.GetOrdinal("NormaId"))); }
                                if (!dataReader.IsDBNull(dataReader.GetOrdinal("UnidadNegocioId"))) { curobj.UnidadNegocioId = (long)(dataReader.GetValue(dataReader.GetOrdinal("UnidadNegocioId"))); }
                                if (!dataReader.IsDBNull(dataReader.GetOrdinal("NumRequisitos"))) { curobj.NumRequisitos = (int)(dataReader.GetValue(dataReader.GetOrdinal("NumRequisitos"))); }
                                if (!dataReader.IsDBNull(dataReader.GetOrdinal("NumRequisitosListos"))) { curobj.NumRequisitosListos = (int)(dataReader.GetValue(dataReader.GetOrdinal("NumRequisitosListos"))); }

                                lobjs.Add(curobj);
                            }
                        }
                    }
                }//*/

                conn.Close();
                //return lobjs;
            }
        }
        catch (Exception ex)
        {
            curobj.Id = 0;
            curobj.Code = "nulo";
            curobj.Description = System.Convert.ToString(ex.Message);

            lobjs.Add(curobj);
        }

        return lobjs;
    }

    /**
     * retorno el listado de procesos a ser auditados por auditoria y por userIdHash del Auditor logeado
     */
    public List<procesosAuditoriaAllGet> funGetProcesosAuditoriaAllListApp(ILogger log
                                                                            , long vnIdAuditoria
                                                                            , string vvUserIdHash
                                                                            )
    {
        log.LogInformation("En el modelo DataProcesosAuditoriaAllGet");
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
        //Lista de objetos
        List<procesosAuditoriaAllGet> lobjs = new List<procesosAuditoriaAllGet>();
        procesosAuditoriaAllGet curobj = new procesosAuditoriaAllGet();
        requisitosallget curobjReq = new requisitosallget();
        // id del auditor para el semaforo
        int AuditorId = 0;
        //SQL Objects
        SqlDataReader dataReader;
        SqlDataReader dr;

        log.LogInformation("try");
        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();

                var textselect = " SELECT P.Id, P.Code, P.Description, P.Cargo, PA.AuditoriaId AS AuditoriaId "; //, PA.AuditoriaId
                textselect += ", UNP.NormaId, UNP.UnidadNegocioId, Au.Id AS AuditorId ";
                textselect += ", ProAud.Flag_Finalizado ";

                textselect += ", ( SELECT COUNT ( UNPr.Id ) FROM [auditoria].UnidadNegocioProceso UNPr, [auditoria].Programacion_Plan pp WHERE UNPr.Id = pp.UnidadNegocioProcesoId AND P.Id= UNPr.ProcesoId AND UNPr.UnidadNegocioId = UNP.UnidadNegocioId AND UNPr.UnidadNegocioId=UNP.UnidadNegocioId AND UNPr.NormaId=UNP.NormaId AND pp.AuditorId = Au.Id   AND PA.Id=pp.PlanAuditoriaId ) AS NumRequisitos  ";
                textselect += ",  ( SELECT COUNT ( UNPr.Id ) FROM [auditoria].UnidadNegocioProceso UNPr, [auditoria].Programacion_Plan pp WHERE UNPr.Id = pp.UnidadNegocioProcesoId AND P.Id= UNPr.ProcesoId AND UNPr.UnidadNegocioId = UNP.UnidadNegocioId AND UNPr.UnidadNegocioId=UNP.UnidadNegocioId AND UNPr.NormaId=UNP.NormaId AND pp.AuditorId = Au.Id  AND PA.Id=pp.PlanAuditoriaId  AND PP.Hora_Inicio_Real IS NOT NULL AND PP.Hora_Fin_Real IS NOT NULL ) AS NumRequisitosListos";

                textselect += " FROM [auditoria].[Procesos] P ";
                textselect += " INNER JOIN [auditoria].[UnidadNegocioProceso] UNP ON UNP.ProcesoId = P.Id ";
                textselect += " INNER JOIN [auditoria].[Programacion_Plan] PP ON UNP.Id = PP.UnidadNegocioProcesoId ";
                textselect += " INNER JOIN [auditoria].[Plan_Auditoria] PA ON PP.PlanAuditoriaId = PA.Id ";
                textselect += " INNER JOIN [auditoria].[Auditoria] A ON PA.AuditoriaId = A.Id ";
                textselect += " INNER JOIN [auditoria].[Auditor] Au ON PP.AuditorId = Au.Id ";
                textselect += " LEFT JOIN [auditoria].[Procesos_Auditoria] ProAud ON P.Id = ProAud.ProcesoId AND UNP.NormaId = ProAud.NormaId AND A.Id = ProAud.AuditoriaId ";
                textselect += " WHERE (P.Deleted IS NULL OR P.Deleted = 0) ";

                if (vnIdAuditoria != 0)
                { textselect += String.Format(" AND A.[Id] = {0} ", vnIdAuditoria); }
                if (vvUserIdHash != "")
                { textselect += String.Format(" AND Au.[UserIdHash] = '{0}' ", vvUserIdHash); }

                textselect += " GROUP BY P.Id, P.Code, P.Description, P.Cargo, PA.AuditoriaId, UNP.NormaId, UNP.UnidadNegocioId, PA.Id, Au.Id, ProAud.Flag_Finalizado ";
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
                            curobj = new procesosAuditoriaAllGet();
                            curobj.Id = (long)(dataReader.GetValue(0));
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code"))) { curobj.Code = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Description"))) { curobj.Description = (string)(dataReader.GetValue(dataReader.GetOrdinal("Description"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Cargo"))) { curobj.Cargo = (string)(dataReader.GetValue(dataReader.GetOrdinal("Cargo"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("AuditoriaId"))) { curobj.AuditoriaId = (long)(dataReader.GetValue(dataReader.GetOrdinal("AuditoriaId"))); }
                            //if (!dataReader.IsDBNull(dataReader.GetOrdinal("UnidadNegocioProcesoId"))) { curobj.UnidadNegocioProcesoId = (long)(dataReader.GetValue(dataReader.GetOrdinal("UnidadNegocioProcesoId"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("NormaId"))) { curobj.NormaId = (long)(dataReader.GetValue(dataReader.GetOrdinal("NormaId"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("UnidadNegocioId"))) { curobj.UnidadNegocioId = (long)(dataReader.GetValue(dataReader.GetOrdinal("UnidadNegocioId"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("NumRequisitos"))) { curobj.NumRequisitos = (int)(dataReader.GetValue(dataReader.GetOrdinal("NumRequisitos"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("NumRequisitosListos"))) { curobj.NumRequisitosListos = (int)(dataReader.GetValue(dataReader.GetOrdinal("NumRequisitosListos"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("AuditorId"))) { AuditorId = (int)(dataReader.GetValue(dataReader.GetOrdinal("AuditorId"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Flag_Finalizado"))) { curobj.Flag_Finalizado = (int)(dataReader.GetValue(dataReader.GetOrdinal("Flag_Finalizado"))); }

                            using (SqlConnection conn2 = new SqlConnection(vvsqlconnectionString))
                            {
                                conn2.Open();

                                textselect = "SELECT TOP 1 PP.Hora_Inicio, PP.Inicio, PP.PlanAuditoriaId, PA.AuditoriaId, PP.Id, PP.Hora_Inicio_Real " +
                                " FROM auditoria.Programacion_Plan AS PP " +
                                " INNER JOIN auditoria.Plan_Auditoria AS PA ON PP.PlanAuditoriaId = PA.Id AND PA.AuditoriaId = " + vnIdAuditoria +
                                " INNER JOIN auditoria.UnidadNegocioProceso AS UNP ON PP.UnidadNegocioProcesoId = UNP.Id AND UNP.ProcesoId = "+ curobj.Id + " AND UNP.NormaId = "+ curobj.NormaId +
                                " WHERE PP.Hora_Fin_Real IS NULL AND PP.AuditorId = " + AuditorId +
                                " ORDER BY PP.Inicio ASC, PP.Hora_Inicio ";

                                log.LogInformation("textselect" + textselect);

                                using (SqlCommand cmd2 = new SqlCommand(textselect, conn2))
                                {
                                    //Ejecutar Comando
                                    using (dr = cmd2.ExecuteReader())
                                    {
                                        //Navegar en el Conjunto de Datos Recuperados
                                        while (dr.Read())
                                        {
                                            curobjReq = new requisitosallget();
                                            if (!dr.IsDBNull(0)) { curobjReq.Hora_Inicio = dr.GetTimeSpan(0).ToString(@"hh\:mm"); }
                                            curobjReq.Inicio = (DateTime)(dr.GetValue(1));
                                            int yearA = curobjReq.Inicio.Year;
                                            int monthA = curobjReq.Inicio.Month;
                                            int dayA = curobjReq.Inicio.Day;
                                            curobjReq.Hora_Inicio = dr.GetTimeSpan(0).ToString(@"hh\:mm");
                                            var valor = curobjReq.Hora_Inicio.Split(':');
                                            int hourA = Convert.ToInt32(valor[0]);
                                            int minuteA = Convert.ToInt32(valor[1]);
                                            System.DateTime horaEvaluarA = new System.DateTime(yearA, monthA, dayA, hourA, minuteA, 00);
                                            System.DateTime horaActualA = System.DateTime.Now;
                                            Int32 diasA = (Int32)(horaEvaluarA.Subtract(horaActualA)).TotalDays;
                                            Int32 minutesA = (Int32)(horaEvaluarA.Subtract(horaActualA)).TotalMinutes;
                                            // igulamos a la hora de Peru
                                            minutesA += 300;

                                            if ((diasA >= 1) || (diasA == 0 && minutesA > 30))
                                            {
                                                // Acá tu código
                                                log.LogInformation("A tiempo Semaforo Verde");
                                                curobj.Semaforo = 1;
                                            }
                                            else if (diasA == 0 && minutesA > 0 && minutesA < 30)
                                            {
                                                log.LogInformation("menos de media hora amarillo");
                                                curobj.Semaforo = 2;
                                            }
                                            else
                                            {
                                                log.LogInformation("retardado Semaforo Rojo");
                                                curobj.Semaforo = 3;
                                            }

                                        }
                                    }
                                }
                                conn2.Close();
                            }

                            lobjs.Add(curobj);
                        }
                    }
                }
                //}//*/

                conn.Close();
                //return lobjs;
            }
        }
        catch (Exception ex)
        {
            curobj.Id = 0;
            curobj.Code = "nulo";
            curobj.Description = System.Convert.ToString(ex.Message);

            lobjs.Add(curobj);
        }

        return lobjs;
    }

    public List<procesosAuditoriaAllGet> funGetProcesosUnidadNegocioNormaAllList(ILogger log
                                                                            , long vnIdUnidadNegocio
                                                                            , string vvIdNorma
                                                                            , long vnIdPlan
                                                                            )
    {
        log.LogInformation("En el modelo DataProcesosAuditoriaAllGet");
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
        //Lista de objetos
        List<procesosAuditoriaAllGet> lobjs = new List<procesosAuditoriaAllGet>();
        procesosAuditoriaAllGet curobj = new procesosAuditoriaAllGet();
        // Inicializar Objeto Modelo DataRequisitosAllGet
        DataRequisitosAllGet vobj_sqldata_Requisitos = new DataRequisitosAllGet();
        //SQL Objects
        SqlDataReader dataReader;

        log.LogInformation("try");
        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();

                string IdNormas = vvIdNorma;
                var Normas = IdNormas.Split(',');
                long normaId = 0;
                //recorrer las normas
               foreach (var item in Normas)
               {
                    /*var textselect = " SELECT DISTINCT P.Id, P.Code, P.Description, "; //P.Cargo,
                    textselect += " UNP.NormaId, ";
                    textselect += " (   SELECT STUFF((SELECT ', ' + CONVERT(VARCHAR(100), R.Description) " +
                        " FROM[auditoria].Responsable r, [auditoria].Responsable_Proceso rp " +
                        " WHERE r.Id = rp.ResponsableId AND rp.UnidadNegocioId = "+ vnIdUnidadNegocio + " AND rp.NormaId = "+ item + " AND rp.ProcesoId = P.Id " +
                        " FOR xml path('')), 1, 1, '')) AS Cargo, ";
                    textselect += " (SELECT max(pp.id) FROM [auditoria].Programacion_Plan pp, [auditoria].UnidadNegocioProceso unp WHERE pp.UnidadNegocioProcesoId = unp.Id AND unp.ProcesoId = P.Id AND pp.PlanAuditoriaId= " + vnIdPlan + " ) AS Selected ";
                    textselect += " FROM auditoria.Procesos AS P ";
                    textselect += "  ";
                    //textselect += " INNER JOIN    [auditoria].UnidadNegocioProceso AS UNP ON P.Id = UNP.ProcesoId AND UNP.NormaId = "+ item+ " AND UNP.UnidadNegocioId = "+ vnIdUnidadNegocio;
                    //textselect += " AND UNP.Id = (select max(unp.Id) from [auditoria].UnidadNegocioProceso unp WHERE unp.ProcesoId=P.Id AND unp.UnidadNegocioId = " + vnIdUnidadNegocio + " AND unp.NormaId = " + item + " ) ";
                    //

                    textselect += " ORDER BY NormaId, Id";//*/
                    var textselect = " SELECT DISTINCT P.Id, P.Code, P.Description, ";
                    textselect += "     ( SELECT STUFF((SELECT ', ' + CONVERT(VARCHAR(100), R.Description) ";
                    textselect += "     FROM [auditoria].Responsable r, [auditoria].Responsable_Proceso rp ";
                    textselect += "     WHERE r.Id=rp.ResponsableId AND rp.UnidadNegocioId = " + vnIdUnidadNegocio + " AND rp.NormaId = " + item + " AND rp.ProcesoId = P.Id";
                    textselect += "     FOR xml path('')), 1, 1, '')) AS Cargo, ";
                    textselect += " UNP.NormaId, ";
                    textselect += "     (SELECT count(pp.id) FROM [auditoria].Programacion_Plan pp ";
                    textselect += "     WHERE pp.UnidadNegocioProcesoId = UNP.Id ";
                    textselect += "     AND pp.PlanAuditoriaId= " + vnIdPlan + " ) AS Selected ";
                    textselect += " FROM auditoria.Procesos AS P ";
                    textselect += " INNER JOIN  [auditoria].UnidadNegocioProceso AS UNP ON P.Id = UNP.ProcesoId ";
                    textselect += " AND UNP.NormaId = " + item + " ";
                    textselect += " AND UNP.UnidadNegocioId = " + vnIdUnidadNegocio + " ";
                    textselect += " ORDER BY NormaId, P.Description ";
                    textselect += " ";

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
                                curobj = new procesosAuditoriaAllGet();
                                curobj.Id = (long)(dataReader.GetValue(0));
                                if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code"))) { curobj.Code = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code"))); }
                                if (!dataReader.IsDBNull(dataReader.GetOrdinal("Description"))) { curobj.Description = (string)(dataReader.GetValue(dataReader.GetOrdinal("Description"))); }
                                if (!dataReader.IsDBNull(dataReader.GetOrdinal("Cargo"))) { curobj.Cargo = (string)(dataReader.GetValue(dataReader.GetOrdinal("Cargo"))); }
                                if (!dataReader.IsDBNull(dataReader.GetOrdinal("NormaId"))) { curobj.NormaId = (long)(dataReader.GetValue(dataReader.GetOrdinal("NormaId"))); }
                                //if (!dataReader.IsDBNull(dataReader.GetOrdinal("UnidadNegocioId"))) { curobj.UnidadNegocioId = (long)(dataReader.GetValue(dataReader.GetOrdinal("UnidadNegocioId"))); }
                                if (!dataReader.IsDBNull(dataReader.GetOrdinal("Selected"))) { curobj.Selected = (int)(dataReader.GetValue(dataReader.GetOrdinal("Selected"))); }

                                curobj.Requisitos = vobj_sqldata_Requisitos.funGetRequisitosAllList(log
                                                                , System.Convert.ToInt32(item)
                                                                , vnIdUnidadNegocio
                                                                , curobj.Id
                                                                , 0
                                                                , vnIdPlan
                                                                );
                                lobjs.Add(curobj);
                            }
                        }
                    }
               }//*/ fin foreach

                conn.Close();
                //return lobjs;
            }
        }
        catch (Exception ex)
        {
            curobj.Id = 0;
            curobj.Code = "nulo";
            curobj.Description = System.Convert.ToString(ex.Message);

            lobjs.Add(curobj);
        }

        return lobjs;
    }
}

public class procesosAuditoriaAllGet
{
    public long Id { get; set; }
    public string Code { get; set; }
    public string Description { get; set; }
    public string Cargo { get; set; }

    public long AuditoriaId { get; set; }
    public int NumRequisitos { get; set; }
    public int NumRequisitosListos { get; set; }
    public long UnidadNegocioProcesoId { get; set; }
    public long NormaId { get; set; }
    public int Selected { get; set; }
    public long UnidadNegocioId { get; set; }
    public List<requisitosallget> Requisitos { get; set; }
    //Semaforo
    public int Semaforo { get; set; }
    public int Flag_Finalizado { get; set; }
}