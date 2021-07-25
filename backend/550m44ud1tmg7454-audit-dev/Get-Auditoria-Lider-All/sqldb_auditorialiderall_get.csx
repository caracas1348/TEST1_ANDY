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

class DataAuditoriaLiderAllGet
{

    public List<auditorialiderallget> funGetAuditoriaLiderAllList(ILogger log
                                                                , string vvid
                                                                , long vnunidadnegocioid
                                                                , long vnsedeid
                                                                , int vnstatusid
                                                                , string vvinicio
                                                                , string vvfin
                                                                , int vntipoauditor
                                                                , int vnListaAsistencia
                                                                )
    {

        //log.LogInformation(str1);
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);

        //Lista de Objetos
        List<auditorialiderallget> lobjs = new List<auditorialiderallget>();
        auditorialiderallget curobj;
        requisitosallget curobjReq;

        // Inicializar Objeto Modelo auditoriaAuditorAll
        DataAuditoriaAuditorAllGet vobj_sqldata_auditores = new DataAuditoriaAuditorAllGet();
        // Inicializar Objeto Modelo DataProcesosAuditoriaAllGet
        DataProcesosAuditoriaAllGet vobj_sqldata_Procesos = new DataProcesosAuditoriaAllGet();
        // id del auditor para el semaforo
        int AuditorId = 0;

        //SQL Objects
        SqlDataReader dataReader;
        SqlDataReader dr;

        try
        {

            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();
                var textselect = "SELECT A.Id, A.[Description], A.Code, A.SedeId, A.TipoId, A.StatusId, A.Inicio, A.Fin, A.Created_By, A.Created_Date, ";
                textselect = textselect + " S.Code AS CodeSede, S.Description AS DescriptionSede, TA.Code AS CodeTipoAuditoria, TA.Description AS DescriptionAuditoria, ";
                textselect = textselect + " SA.Description AS DescriptionStatus, UN.Code AS CodeUnidadNegocio, UN.Id AS UnidadNegocioId, UN.Description AS DescriptionUnidadNegocio, ";
                textselect = textselect + " A.Deleted_By, A.Deleted_Date, A.Deleted, PA.EspecialidadId, SUS.Description_Motivo, [auditoria].Plan_Auditoria.Flag_Finalizado AS Flag_Finalizado_Plan, ";
                textselect = textselect + " [auditoria].Plan_Auditoria.Id AS PlanId, [auditoria].Plan_Auditoria.Created_Date AS Fecha_Creacion_Plan, [auditoria].Plan_Auditoria.Inicio AS Inicio_Plan, [auditoria].Plan_Auditoria.Fin AS Fin_Plan, [auditoria].Plan_Auditoria.Detalle, [auditoria].Plan_Auditoria.Alcance, [auditoria].Plan_Auditoria.Resumen_Auditoria, ";
                textselect = textselect + " AU.Id AS AuditorId, ";
                textselect = textselect + " (SELECT STUFF((SELECT ',' + CONVERT(VARCHAR(10), N.Id) FROM [auditoria].Norma N, [auditoria].Auditoria_Norma AA WHERE AA.AuditoriaId = A.Id AND N.Code = AA.NormaCode FOR xml path('')), 1, 1, '')) AS Id_Normas, ";
                textselect = textselect + " (SELECT STUFF((SELECT ',' + CONVERT(VARCHAR(10), P.Id) FROM [auditoria].Procesos P, [auditoria].UnidadNegocioProceso UNP WHERE P.Id = UNP.ProcesoId AND S.UnidadNegocioId = UNP.UnidadNegocioId GROUP BY P.Id    FOR xml path('')), 1, 1, '')) AS Id_Procesos, ";
                textselect = textselect + " (SELECT STUFF(( SELECT ',' + CONVERT ( VARCHAR( 10 ), NormaCode ) FROM [auditoria].Auditoria_Norma WHERE AuditoriaId = A.Id FOR xml path('')), 1, 1, '')) AS Code_Normas, ";
                textselect = textselect + " (SELECT COUNT(Id) as num FROM Auditoria.ListaEnvio WHERE PlanAuditoriaId=[auditoria].Plan_Auditoria.Id) as numListado, ";
                textselect = textselect + " (SELECT COUNT( DISTINCT unp.ProcesoId) FROM auditoria.UnidadNegocioProceso AS unp INNER JOIN auditoria.Programacion_Plan AS pp ON unp.Id = pp.UnidadNegocioProcesoId AND pp.PlanAuditoriaId = [auditoria].Plan_Auditoria.Id AND pp.AuditorId = AU.Id) AS numProcesos, ";
                textselect = textselect + " (SELECT COUNT(Id) FROM [auditoria].Programacion_Plan pp WHERE pp.PlanAuditoriaId = [auditoria].Plan_Auditoria.Id AND pp.TipoHallazgoId=3) AS Observaciones, ";
                textselect = textselect + " (SELECT COUNT(Id) FROM [auditoria].Programacion_Plan pp WHERE pp.PlanAuditoriaId = [auditoria].Plan_Auditoria.Id AND pp.TipoHallazgoId=4) AS NoConformidadCritica, ";
                textselect = textselect + " (SELECT COUNT(Id) FROM [auditoria].Programacion_Plan pp WHERE pp.PlanAuditoriaId = [auditoria].Plan_Auditoria.Id AND pp.TipoHallazgoId=5) AS NoConformidadMayor, ";
                textselect = textselect + " (SELECT COUNT(Id) FROM [auditoria].Programacion_Plan pp WHERE pp.PlanAuditoriaId = [auditoria].Plan_Auditoria.Id AND pp.TipoHallazgoId=6) AS NoConformidadMenor, ";
                textselect = textselect + " (SELECT COUNT(Id) FROM [auditoria].Programacion_Plan pp WHERE pp.PlanAuditoriaId = [auditoria].Plan_Auditoria.Id AND pp.TipoHallazgoId=7) AS Conformidad, ";
                textselect = textselect + " (SELECT COUNT(Id) FROM [auditoria].Programacion_Plan pp WHERE pp.PlanAuditoriaId = [auditoria].Plan_Auditoria.Id AND pp.TipoHallazgoId=8) AS OportunidadMejora ";

                textselect = textselect + " FROM [auditoria].[Auditoria] A ";
                textselect = textselect + " INNER JOIN [auditoria].Sede S ON S.Id = A.SedeId ";
                textselect = textselect + " INNER JOIN [auditoria].Unidad_Negocio UN ON S.UnidadNegocioId = UN.Id ";
                textselect = textselect + " INNER JOIN [auditoria].Tipo_Auditoria TA ON TA.Id = A.TipoId ";
                textselect = textselect + " INNER JOIN [auditoria].Status_Auditoria SA ON SA.Id = A.StatusId ";
                textselect = textselect + " INNER JOIN [auditoria].Auditoria_Auditor AA ON AA.AuditoriaId = A.Id ";
                textselect = textselect + " INNER JOIN [auditoria].Auditor AU ON AU.Id = AA.AuditorId ";
                textselect = textselect + " LEFT JOIN [auditoria].Programa_Auditoria PA ON PA.Id = A.ProgramaAuditoriaId ";
                textselect = textselect + " LEFT JOIN [auditoria].Plan_Auditoria ON [auditoria].Plan_Auditoria.AuditoriaId = A.Id ";
                textselect = textselect + " LEFT JOIN [auditoria].Suspension SUS ON A.Id = SUS.AuditoriaId ";
                textselect = textselect + " WHERE (A.Deleted IS NULL OR A.Deleted = 0) ";
                //textselect = textselect +  String.Format(" AND AA.[Tipo] = 1 ");
                //textselect = textselect + String.Format(" AND AA.[Tipo] = '{0}' ", vntipoauditor);

                if (vvid != null) // filtrar por UserIdhash del auditor Lider
                { textselect = textselect + String.Format(" AND AU.[UserIdhash] = '{0}' ", vvid); }
                if (vnunidadnegocioid != 0) //filtrar por unidad de negocio
                { textselect = textselect + String.Format(" AND UN.Id = {0} ", vnunidadnegocioid); }
                if (vnsedeid != 0) //filtrar por sede
                { textselect = textselect + String.Format(" AND A.[SedeId] = {0} ", vnsedeid); }
                if (vnstatusid != 0) //filtrar por estado
                { textselect = textselect + String.Format(" AND A.[StatusId] = {0} ", vnstatusid); }
                if (vvinicio != null) // filtrar por fecha inicio
                { textselect = textselect + String.Format(" AND A.[Inicio] >= '{0}' ", vvinicio); }
                //{textselect = textselect +  String.Format(" AND A.[Inicio] like '{0}' ",vvinicio);}
                if (vvfin != null) // filtrar por fecha fin
                { textselect = textselect + String.Format(" AND A.[Inicio] <= '{0}' ", vvfin); }
                if (vntipoauditor == 2) // Auditor
                { textselect = textselect + " AND ([A].StatusId = 5 OR [A].StatusId = 6 OR [A].StatusId = 8)"; }
                // Filtramos para la lista de asistencia
                if (vnListaAsistencia != 0)
                {
                    textselect = textselect + " AND A.StatusId != 7 ";
                    textselect = textselect + " AND A.Id NOT IN (SELECT AuditoriaId FROM[auditoria].Lista_Asistencia) ";
                }

                textselect = textselect + String.Format(" GROUP BY A.Id, A.[Description], A.Code, A.SedeId, A.TipoId, A.StatusId, A.Inicio, A.Fin, A.Created_By, A.Created_Date, ");
                textselect = textselect + String.Format(" S.Code, S.Description, TA.Code, TA.Description, ");
                textselect = textselect + String.Format(" SA.Description, UN.Code, UN.Id, UN.Description, AU.Id, ");
                textselect = textselect + String.Format(" A.Deleted_By, A.Deleted_Date, A.Deleted, PA.EspecialidadId, SUS.Description_Motivo, [auditoria].Plan_Auditoria.Flag_Finalizado,");
                textselect = textselect + String.Format(" [auditoria].Plan_Auditoria.Id, [auditoria].Plan_Auditoria.Detalle, [auditoria].Plan_Auditoria.Alcance, [auditoria].Plan_Auditoria.Resumen_Auditoria, ");
                textselect = textselect + String.Format(" S.UnidadNegocioId, [auditoria].Plan_Auditoria.Created_Date, [auditoria].Plan_Auditoria.Inicio, [auditoria].Plan_Auditoria.Fin ");


                var StrQuery = textselect;
                //End - Manejo de Parametros
                log.LogInformation("StrQuery: " + StrQuery);

                //ShipDate < GetDate();
                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    //Ejecutar Comando
                    using (dataReader = cmd.ExecuteReader())
                    {
                        //Navegar en el Conjunto de Datos Recuperados
                        while (dataReader.Read())
                        {
                            curobj = new auditorialiderallget();
                            //curobj.Id                                                                                     = (long)(dataReader.GetValue(0));dataReader.GetOrdinal("PersonName")
                            curobj.Id = (long)(dataReader.GetValue(0));
                            if (!dataReader.IsDBNull(1)) { curobj.Description = (string)(dataReader.GetValue(1)); }
                            //if(!dataReader.IsDBNull(dataReader.GetOrdinal("Description"))) { curobj.Description               = (string)(dataReader.GetOrdinal("Description"));}
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code"))) { curobj.Code = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("CodeUnidadNegocio"))) { curobj.CodeUnidadNegocio = (string)(dataReader.GetValue(dataReader.GetOrdinal("CodeUnidadNegocio"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("DescriptionSede"))) { curobj.DescriptionSede = (string)(dataReader.GetValue(dataReader.GetOrdinal("DescriptionSede"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("DescriptionAuditoria"))) { curobj.DescriptionAuditoria = (string)(dataReader.GetValue(dataReader.GetOrdinal("DescriptionAuditoria"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("DescriptionUnidadNegocio"))) { curobj.DescriptionUnidadNegocio = (string)(dataReader.GetValue(dataReader.GetOrdinal("DescriptionUnidadNegocio"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code_Normas"))) { curobj.Code_Normas = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code_Normas"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id_Procesos"))) { curobj.Id_Procesos = (string)(dataReader.GetValue(dataReader.GetOrdinal("Id_Procesos"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id_Normas"))) { curobj.Id_Normas = (string)(dataReader.GetValue(dataReader.GetOrdinal("Id_Normas"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Inicio"))) { curobj.Inicio = (DateTime)(dataReader.GetValue(dataReader.GetOrdinal("Inicio"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Fin"))) { curobj.Fin = (DateTime)(dataReader.GetValue(dataReader.GetOrdinal("Fin"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("DescriptionStatus"))) { curobj.DescriptionStatus = (string)(dataReader.GetValue(dataReader.GetOrdinal("DescriptionStatus"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("StatusId"))) { curobj.StatusId = (int)(dataReader.GetValue(dataReader.GetOrdinal("StatusId"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("UnidadNegocioId"))) { curobj.UnidadNegocioId = (long)(dataReader.GetValue(dataReader.GetOrdinal("UnidadNegocioId"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("SedeId"))) { curobj.SedeId = (long)(dataReader.GetValue(dataReader.GetOrdinal("SedeId"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("EspecialidadId"))) { curobj.EspecialidadId = (long)(dataReader.GetValue(dataReader.GetOrdinal("EspecialidadId"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Description_Motivo"))) { curobj.Description_Motivo = (string)(dataReader.GetValue(dataReader.GetOrdinal("Description_Motivo"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Flag_Finalizado_Plan"))) { curobj.Flag_Finalizado_Plan = (int)(dataReader.GetValue(dataReader.GetOrdinal("Flag_Finalizado_Plan"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("PlanId"))) { curobj.PlanId = (long)(dataReader.GetValue(dataReader.GetOrdinal("PlanId"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Detalle"))) { curobj.Detalle = (string)(dataReader.GetValue(dataReader.GetOrdinal("Detalle"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Alcance"))) { curobj.Alcance = (string)(dataReader.GetValue(dataReader.GetOrdinal("Alcance"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Resumen_Auditoria"))) { curobj.Resumen_Auditoria = (string)(dataReader.GetValue(dataReader.GetOrdinal("Resumen_Auditoria"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Fecha_Creacion_Plan"))) { curobj.Fecha_Creacion_Plan = (DateTime)(dataReader.GetValue(dataReader.GetOrdinal("Fecha_Creacion_Plan"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Inicio_Plan"))) { curobj.Inicio_Plan = (DateTime)(dataReader.GetValue(dataReader.GetOrdinal("Inicio_Plan"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Fin_Plan"))) { curobj.Fin_Plan = (DateTime)(dataReader.GetValue(dataReader.GetOrdinal("Fin_Plan"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("numListado"))) { curobj.numListado = (int)(dataReader.GetValue(dataReader.GetOrdinal("numListado"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("numProcesos"))) { curobj.numProcesos = (int)(dataReader.GetValue(dataReader.GetOrdinal("numProcesos"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("AuditorId"))) { AuditorId = (int)(dataReader.GetValue(dataReader.GetOrdinal("AuditorId"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Observaciones"))) { curobj.Observaciones = (int)(dataReader.GetValue(dataReader.GetOrdinal("Observaciones"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("NoConformidadCritica"))) { curobj.NoConformidadCritica = (int)(dataReader.GetValue(dataReader.GetOrdinal("NoConformidadCritica"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("NoConformidadMayor"))) { curobj.NoConformidadMayor = (int)(dataReader.GetValue(dataReader.GetOrdinal("NoConformidadMayor"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("NoConformidadMenor"))) { curobj.NoConformidadMenor = (int)(dataReader.GetValue(dataReader.GetOrdinal("NoConformidadMenor"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Conformidad"))) { curobj.Conformidad = (int)(dataReader.GetValue(dataReader.GetOrdinal("Conformidad"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("OportunidadMejora"))) { curobj.OportunidadMejora = (int)(dataReader.GetValue(dataReader.GetOrdinal("OportunidadMejora"))); }

                            if (vntipoauditor == 1) // Auditor-Lider WEB
                            {
                                curobj.Programacion_Plan = funGetProgramacionAll(log, curobj.PlanId);

                                log.LogInformation("curobj.Id_Normas: " + curobj.Id_Normas);

                                // agregos los auditores
                                curobj.Auditores = vobj_sqldata_auditores.funGetAuditorAll(log
                                                            , curobj.Id
                                                            , curobj.SedeId
                                                            , curobj.EspecialidadId
                                                            , curobj.Id_Normas
                                                            );

                                //Agrego los procesos
                                curobj.Procesos = vobj_sqldata_Procesos.funGetProcesosUnidadNegocioNormaAllList(log
                                                                                                    , curobj.UnidadNegocioId
                                                                                                    , curobj.Id_Normas
                                                                                                    , curobj.PlanId
                                                                                                    );
                                // AGREGO LISTADO DE ARCHIVOS ADJUNTOS
                                curobj.AdjuntosInforme = funGetAdjuntosInformeAllList(log, curobj.Id);

                            }

                            if (vntipoauditor == 2) // Auditor-Lider/Auditor App
                            {
                                using (SqlConnection conn2 = new SqlConnection(vvsqlconnectionString))
                                {
                                    conn2.Open();

                                    textselect = "SELECT TOP 1 PP.Hora_Inicio, PP.Inicio, PP.PlanAuditoriaId, PA.AuditoriaId, PP.Id, PP.Hora_Inicio_Real " +
                                    " FROM auditoria.Programacion_Plan AS PP " +
                                    " INNER JOIN auditoria.Plan_Auditoria AS PA ON PP.PlanAuditoriaId = PA.Id AND PA.AuditoriaId = " + curobj.Id +
                                    " WHERE PP.Hora_Fin_Real IS NULL AND PP.AuditorId = " + AuditorId +
                                    " ORDER BY PP.Inicio ASC, PP.Hora_Inicio";
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

                                                if ( (diasA >= 1) || (diasA == 0 && minutesA > 30))
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

                            }

                            lobjs.Add(curobj);
                        }
                    }
                }

                conn.Close();
                return lobjs;

            }
        }
        catch (Exception ex)
        {
            curobj = new auditorialiderallget();
            curobj.Id = 0;
            curobj.Code = "nulo";
            curobj.Description = System.Convert.ToString(ex.Message);
            lobjs.Add(curobj);
        }

        return lobjs;
    }

    //devolver una auditoria con su plan de auditorias
    public auditorialiderallget funGetAuditoriaLiderAll(ILogger log
                                                                , long vnidauditoria
                                                                )
    {
        //log.LogInformation(str1);
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
        //Objeto
        auditorialiderallget curobj = new auditorialiderallget();
        //auditorialiderallget curobj;
        //SQL Objects
        SqlDataReader dataReader;

        try
        {

            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();
                var textselect = "SELECT A.Id, A.[Description], A.Code, A.Inicio, A.Fin, [auditoria].[Plan_Auditoria].Created_Date AS Fecha_Creacion_Plan, ";
                textselect = textselect + " (SELECT STUFF((SELECT ',' + CONVERT(VARCHAR(10), NormaCode) FROM [auditoria].Auditoria_Norma WHERE AuditoriaId = A.Id FOR xml path('')), 1, 1, '')) AS Code_Normas, ";
                //textselect = textselect +  " (SELECT STUFF((SELECT ',' + CONVERT(VARCHAR(10), Id) FROM [auditoria].Auditoria_Norma WHERE AuditoriaId = A.Id FOR xml path('')), 1, 1, '')) AS Id_Normas, ";
                textselect = textselect + " (SELECT STUFF((SELECT ',' + CONVERT(VARCHAR(10), N.Id) FROM [auditoria].Norma N, [auditoria].Auditoria_Norma AA WHERE AA.AuditoriaId = A.Id AND N.Code = AA.NormaCode FOR xml path('')), 1, 1, '')) AS Id_Normas, ";
                textselect = textselect + " (SELECT STUFF((SELECT ',' + CONVERT(VARCHAR(10), P.Id) FROM [auditoria].Procesos P, [auditoria].UnidadNegocioProceso UNP WHERE P.Id = UNP.ProcesoId AND S.UnidadNegocioId = UNP.UnidadNegocioId GROUP BY P.Id    FOR xml path('')), 1, 1, '')) AS Id_Procesos, ";
                textselect = textselect + " PA.EspecialidadId,  ";
                textselect = textselect + " [auditoria].[Plan_Auditoria].Detalle,  [auditoria].[Plan_Auditoria].Alcance, [auditoria].[Plan_Auditoria].Resumen_Auditoria, ";
                textselect = textselect + " [auditoria].[Plan_Auditoria].Inicio AS Inicio_Plan, [auditoria].[Plan_Auditoria].Fin AS Fin_Plan, ";
                textselect = textselect + " [auditoria].[Plan_Auditoria].Id AS PlanId, ";
                textselect = textselect + " S.Code AS CodeSede, S.Id AS SedeId,  S.UnidadNegocioId AS UnidadNegocioId, S.Description AS DescriptionSede ";
                textselect = textselect + " FROM [auditoria].[Auditoria] A ";
                textselect = textselect + " INNER JOIN [auditoria].Sede S ON S.Id = A.SedeId ";
                textselect = textselect + " INNER JOIN [auditoria].Programa_Auditoria PA ON PA.Id = A.ProgramaAuditoriaId ";
                textselect = textselect + " INNER JOIN [auditoria].[Plan_Auditoria] ON [auditoria].[Plan_Auditoria].AuditoriaId = A.Id ";
                textselect = textselect + " WHERE (A.Deleted IS NULL OR A.Deleted = 0) ";
                //if(vnidauditoria != 0) //filtrar por sede
                { textselect = textselect + String.Format(" AND A.[Id] = {0} ", vnidauditoria); }

                var StrQuery = textselect;

                //ShipDate < GetDate();
                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    //Ejecutar Comando
                    using (dataReader = cmd.ExecuteReader())
                    {
                        //Navegar en el Conjunto de Datos Recuperados
                        while (dataReader.Read())
                        {
                            curobj = new auditorialiderallget();
                            curobj.Id = (long)(dataReader.GetValue(0));
                            //Auditoria
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("DescriptionSede"))) { curobj.DescriptionSede = (string)(dataReader.GetValue(dataReader.GetOrdinal("DescriptionSede"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code_Normas"))) { curobj.Code_Normas = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code_Normas"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id_Normas"))) { curobj.Id_Normas = (string)(dataReader.GetValue(dataReader.GetOrdinal("Id_Normas"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id_Procesos"))) { curobj.Id_Procesos = (string)(dataReader.GetValue(dataReader.GetOrdinal("Id_Procesos"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("SedeId"))) { curobj.SedeId = (long)(dataReader.GetValue(dataReader.GetOrdinal("SedeId"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("UnidadNegocioId"))) { curobj.UnidadNegocioId = (long)(dataReader.GetValue(dataReader.GetOrdinal("UnidadNegocioId"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Inicio"))) { curobj.Inicio = (DateTime)(dataReader.GetValue(dataReader.GetOrdinal("Inicio"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Fin"))) { curobj.Fin = (DateTime)(dataReader.GetValue(dataReader.GetOrdinal("Fin"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Fecha_Creacion_Plan"))) { curobj.Fecha_Creacion_Plan = (DateTime)(dataReader.GetValue(dataReader.GetOrdinal("Fecha_Creacion_Plan"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("EspecialidadId"))) { curobj.EspecialidadId = (long)(dataReader.GetValue(dataReader.GetOrdinal("EspecialidadId"))); }
                            // Plan Auditoria
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("PlanId"))) { curobj.PlanId = (long)(dataReader.GetValue(dataReader.GetOrdinal("PlanId"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Detalle"))) { curobj.Detalle = (string)(dataReader.GetValue(dataReader.GetOrdinal("Detalle"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Alcance"))) { curobj.Alcance = (string)(dataReader.GetValue(dataReader.GetOrdinal("Alcance"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Resumen_Auditoria"))) { curobj.Resumen_Auditoria = (string)(dataReader.GetValue(dataReader.GetOrdinal("Resumen_Auditoria"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Inicio_Plan"))) { curobj.Inicio_Plan = (DateTime)(dataReader.GetValue(dataReader.GetOrdinal("Inicio_Plan"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Fin_Plan"))) { curobj.Fin_Plan = (DateTime)(dataReader.GetValue(dataReader.GetOrdinal("Fin_Plan"))); }
                        }
                    }
                }

                conn.Close();
                log.LogInformation("Antes de agergar el listado de auditores");
                //agrego los auditores
                //curobj.Auditores = funGetAuditoresAll(log, vnid, SedeId, EspecialidadId);
                //curobj.Auditores = funGetAuditorAll(log, vnidauditoria);
                //curobj.Normas = funGetNormasAll(log, curobj.Id_Normas);

                curobj.Programacion_Plan = funGetProgramacionAll(log, curobj.PlanId);
                //retorno los datos de una auditoria
                return curobj;

            }

        }
        catch (Exception ex)
        {
            curobj = new auditorialiderallget();
            curobj.Id = 0;
            curobj.Code = "nulo";
            curobj.Description = System.Convert.ToString(ex.Message);
        }

        return curobj;
    }

    //devolver una auditoria con su plan de auditorias pruebas
    public auditorialiderallget funGetAuditoriaLiderAll2(ILogger log
                                                                , long vnidauditoria
                                                                )
    {
        //log.LogInformation(str1);
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
        //Objeto
        auditorialiderallget curobj = new auditorialiderallget();
        //auditorialiderallget curobj;
        //SQL Objects
        SqlDataReader dataReader;

        try
        {

            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();
                var textselect = "SELECT A.Id, A.[Description], A.Code, A.Inicio, A.Fin, ";
                textselect = textselect + " (SELECT STUFF((SELECT ',' + CONVERT(VARCHAR(10), NormaCode) FROM [auditoria].Auditoria_Norma WHERE AuditoriaId = A.Id FOR xml path('')), 1, 1, '')) AS Code_Normas, ";
                //textselect = textselect +  " (SELECT STUFF((SELECT ',' + CONVERT(VARCHAR(10), Id) FROM [auditoria].Auditoria_Norma WHERE AuditoriaId = A.Id FOR xml path('')), 1, 1, '')) AS Id_Normas, ";
                textselect = textselect + " (SELECT STUFF((SELECT ',' + CONVERT(VARCHAR(10), N.Id) FROM [auditoria].Norma N, [auditoria].Auditoria_Norma AA WHERE AA.AuditoriaId = A.Id AND N.Code = AA.NormaCode FOR xml path('')), 1, 1, '')) AS Id_Normas, ";
                textselect = textselect + " (SELECT STUFF((SELECT ',' + CONVERT(VARCHAR(10), P.Id) FROM [auditoria].Procesos P, [auditoria].UnidadNegocioProceso UNP WHERE P.Id = UNP.ProcesoId AND S.UnidadNegocioId = UNP.UnidadNegocioId GROUP BY P.Id    FOR xml path('')), 1, 1, '')) AS Id_Procesos, ";
                textselect = textselect + " PA.EspecialidadId,  ";
                textselect = textselect + " [auditoria].[Plan_Auditoria].Detalle,  [auditoria].[Plan_Auditoria].Alcance, [auditoria].[Plan_Auditoria].Resumen_Auditoria, ";
                textselect = textselect + " [auditoria].[Plan_Auditoria].Inicio AS Inicio_Plan, [auditoria].[Plan_Auditoria].Fin AS Fin_Plan, ";
                textselect = textselect + " [auditoria].[Plan_Auditoria].Id AS PlanId, ";
                textselect = textselect + " S.Code AS CodeSede, S.Id AS SedeId,  S.UnidadNegocioId AS UnidadNegocioId, S.Description AS DescriptionSede ";
                textselect = textselect + " FROM [auditoria].[Auditoria] A ";
                textselect = textselect + " INNER JOIN [auditoria].Sede S ON S.Id = A.SedeId ";
                textselect = textselect + " INNER JOIN [auditoria].Programa_Auditoria PA ON PA.Id = A.ProgramaAuditoriaId ";
                textselect = textselect + " INNER JOIN [auditoria].[Plan_Auditoria] ON [auditoria].[Plan_Auditoria].AuditoriaId = A.Id ";
                textselect = textselect + " WHERE (A.Deleted IS NULL OR A.Deleted = 0) ";
                //if(vnidauditoria != 0) //filtrar por sede
                { textselect = textselect + String.Format(" AND A.[Id] = {0} ", vnidauditoria); }

                var StrQuery = textselect;

                //ShipDate < GetDate();
                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    //Ejecutar Comando
                    using (dataReader = cmd.ExecuteReader())
                    {
                        //Navegar en el Conjunto de Datos Recuperados
                        while (dataReader.Read())
                        {
                            curobj = new auditorialiderallget();
                            curobj.Id = (long)(dataReader.GetValue(0));
                            //Auditoria
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("DescriptionSede"))) { curobj.DescriptionSede = (string)(dataReader.GetValue(dataReader.GetOrdinal("DescriptionSede"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code_Normas"))) { curobj.Code_Normas = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code_Normas"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id_Normas"))) { curobj.Id_Normas = (string)(dataReader.GetValue(dataReader.GetOrdinal("Id_Normas"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id_Procesos"))) { curobj.Id_Procesos = (string)(dataReader.GetValue(dataReader.GetOrdinal("Id_Procesos"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("SedeId"))) { curobj.SedeId = (long)(dataReader.GetValue(dataReader.GetOrdinal("SedeId"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("UnidadNegocioId"))) { curobj.UnidadNegocioId = (long)(dataReader.GetValue(dataReader.GetOrdinal("UnidadNegocioId"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Inicio"))) { curobj.Inicio = (DateTime)(dataReader.GetValue(dataReader.GetOrdinal("Inicio"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Fin"))) { curobj.Fin = (DateTime)(dataReader.GetValue(dataReader.GetOrdinal("Fin"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("EspecialidadId"))) { curobj.EspecialidadId = (long)(dataReader.GetValue(dataReader.GetOrdinal("EspecialidadId"))); }
                            // Plan Auditoria
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("PlanId"))) { curobj.PlanId = (long)(dataReader.GetValue(dataReader.GetOrdinal("PlanId"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Detalle"))) { curobj.Detalle = (string)(dataReader.GetValue(dataReader.GetOrdinal("Detalle"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Alcance"))) { curobj.Alcance = (string)(dataReader.GetValue(dataReader.GetOrdinal("Alcance"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Resumen_Auditoria"))) { curobj.Resumen_Auditoria = (string)(dataReader.GetValue(dataReader.GetOrdinal("Resumen_Auditoria"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Inicio_Plan"))) { curobj.Inicio_Plan = (DateTime)(dataReader.GetValue(dataReader.GetOrdinal("Inicio_Plan"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Fin_Plan"))) { curobj.Fin_Plan = (DateTime)(dataReader.GetValue(dataReader.GetOrdinal("Fin_Plan"))); }
                        }
                    }
                }

                conn.Close();
                log.LogInformation("Antes de agergar el listado de auditores");
                //agrego los auditores
                //curobj.Auditores = funGetAuditoresAll(log, vnid, SedeId, EspecialidadId);
                //curobj.Auditores = funGetAuditorAll(log, vnidauditoria);
                //curobj.Normas = funGetNormasAll(log, curobj.Id_Normas);

                curobj.Programacion_Plan = funGetProgramacionAll(log, curobj.PlanId);
                //retorno los datos de una auditoria
                return curobj;

            }

        }
        catch (Exception ex)
        {
            curobj = new auditorialiderallget();
            curobj.Id = 0;
            curobj.Code = "nulo";
            curobj.Description = System.Convert.ToString(ex.Message);
        }

        return curobj;
    }

    private List<programacion> funGetProgramacionAll(ILogger log
                                            , long vnPlanId
                                        )
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);

        //auditorialiderallget curobj = new auditorialiderallget();
        programacion curobj = new programacion();
        List<programacion> lobjs = new List<programacion>();

        SqlDataReader dataReader;
        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();
                //Start - Manejo de Parametros
                var textselect = "SELECT  P.Id, P.UnidadNegocioProcesoId, P.Hallazgo, P.TipoHallazgoId ";
                textselect += " , P.AuditorId, P.Inicio, P.Hora_Inicio, P.Hora_Fin ";
                textselect += " FROM [auditoria].Programacion_Plan P WHERE  ";
                textselect += String.Format(" P.[PlanAuditoriaId] = {0} ", vnPlanId);
                textselect += " ORDER BY P.Id ASC";

                var StrQuery = textselect;

                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    //using(dataReader.Read())
                    using (dataReader = cmd.ExecuteReader())
                    {
                        while (dataReader.Read())
                        {
                            curobj = new programacion();
                            curobj.Id = (long)dataReader.GetValue(0);
                            //curobj.Hora_Inicio = dataReader.GetTimeSpan(6).ToString(@"hh\:mm\:ss");
                            curobj.Hora_Inicio = dataReader.GetTimeSpan(6).ToString(@"hh\:mm");
                            curobj.Hora_Fin = dataReader.GetTimeSpan(7).ToString(@"hh\:mm");

                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("UnidadNegocioProcesoId"))) { curobj.UnidadNegocioProcesoId = (long)(dataReader.GetValue(dataReader.GetOrdinal("UnidadNegocioProcesoId"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("TipoHallazgoId"))) { curobj.TipoHallazgoId = (long)(dataReader.GetValue(dataReader.GetOrdinal("TipoHallazgoId"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Hallazgo"))) { curobj.Hallazgo = (string)(dataReader.GetValue(dataReader.GetOrdinal("Hallazgo"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("AuditorId"))) { curobj.AuditorId = (int)(dataReader.GetValue(dataReader.GetOrdinal("AuditorId"))); }
                            //if (!dataReader.IsDBNull(dataReader.GetOrdinal("Hora_Inicio"))) { curobj.Hora_Inicio = (string)(dataReader.GetValue(dataReader.GetOrdinal("Hora_Inicio"))); }
                            //if (!dataReader.IsDBNull(dataReader.GetOrdinal("Hora_Fin"))) { curobj.Hora_Fin = (string)(dataReader.GetValue(dataReader.GetOrdinal("Hora_Fin"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Inicio"))) { curobj.Inicio = (DateTime)(dataReader.GetValue(dataReader.GetOrdinal("Inicio"))); }
                            lobjs.Add(curobj);

                        }
                    }
                }
                conn.Close();
                return lobjs;
            }
        }
        catch (Exception ex)
        {
            //curobj = new auditorialiderallget();
            log.LogInformation("catch::" + ex.Message);
            curobj.Hallazgo = System.Convert.ToString(ex.Message);
            curobj.Id = 0;
            lobjs.Add(curobj);
        }
        return lobjs;


    }

    /**
     * Aqui agregamos el listado de archivos adjuntos del informe de auditoria.
     */
    private List<AdjuntosInforme> funGetAdjuntosInformeAllList(ILogger log, long AuditoriaId)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);

        List<AdjuntosInforme> AdjuntosInforme = new List<AdjuntosInforme>();
        AdjuntosInforme curobj                = new AdjuntosInforme();

        log.LogInformation("en funGetAdjuntosInformeAllList, AuditoriaId -> "+AuditoriaId);
        curobj = new AdjuntosInforme();
        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();
                log.LogInformation("luego del conn.Open() ");

                SqlCommand cmd = new SqlCommand("[auditoria].[get_adjuntos_informe_auditoria_sp2]", conn);

                cmd.Parameters.AddWithValue("@AuditoriaId", AuditoriaId);

                cmd.CommandType = CommandType.StoredProcedure;
                log.LogInformation("antes de dataReader ");
                //Ejecutar Comando buscaremos los hallazgos registrados
                //using (dataReader = cmd.ExecuteReader())
                //using (SqlDataReader dataReader = await cmd.ExecuteReaderAsync())
                using (SqlDataReader dataReader = cmd.ExecuteReader())
                {
                    //Navegar en el Conjunto de Datos Recuperados
                    while (dataReader.Read())
                    {
                        curobj = new AdjuntosInforme();

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobj.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("AuditoriaId"))) { curobj.AuditoriaId = (long)(dataReader.GetValue(dataReader.GetOrdinal("AuditoriaId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("AdjuntoName"))) { curobj.AdjuntoName = (string)(dataReader.GetValue(dataReader.GetOrdinal("AdjuntoName"))); }

                        AdjuntosInforme.Add(curobj);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            AdjuntosInforme     = new List<AdjuntosInforme>();
            curobj              = new AdjuntosInforme();
            curobj.Id           = 0;
            curobj.AdjuntoName  = System.Convert.ToString(ex.Message);
            AdjuntosInforme.Add(curobj);
        }//*/
        //AdjuntosInforme.Add(curobj);

        return AdjuntosInforme;
    }

}

public class auditorialiderallget
{

    public long Id { get; set; }
    public string Description { get; set; }
    public string Code { get; set; }
    public string CodeUnidadNegocio { get; set; }
    public string DescriptionSede { get; set; }
    public string DescriptionStatus { get; set; }
    public string DescriptionAuditoria { get; set; }
    public string DescriptionUnidadNegocio { get; set; }
    public string Description_Motivo { get; set; }
    public long EspecialidadId { get; set; }
    public string Code_Normas { get; set; }
    public string Id_Normas { get; set; }
    public string Id_Procesos { get; set; }
    public long UnidadNegocioId { get; set; }
    public long SedeId { get; set; }
    public int StatusId { get; set; }
    public DateTime Inicio { get; set; }
    public DateTime Fin { get; set; }
    // Plan Auditoria
    public int Observaciones { get; set; }
    public int NoConformidadCritica { get; set; }
    public int NoConformidadMayor { get; set; }
    public int NoConformidadMenor { get; set; }
    public int Conformidad { get; set; }
    public int OportunidadMejora { get; set; }
    public long PlanId { get; set; }
    public int Flag_Finalizado_Plan { get; set; }
    public string Detalle { get; set; }
    public string Alcance { get; set; }
    public string Resumen_Auditoria { get; set; }
    public DateTime Inicio_Plan { get; set; }
    public DateTime Fin_Plan { get; set; }
    public DateTime Fecha_Creacion_Plan { get; set; }
    public int numListado { get; set; }
    public List<programacion> Programacion_Plan { get; set; }
    public List<auditor> Auditores { get; set; }
    public List<procesosAuditoriaAllGet> Procesos { get; set; }
    public List<AdjuntosInforme> AdjuntosInforme { get; set; }
    //Semaforo
    public int Semaforo { get; set; }
    public int numProcesos { get; set; }

}

public class programacion
{
    public long Id { get; set; }
    public long UnidadNegocioProcesoId { get; set; }
    public int AuditorId { get; set; }
    public DateTime Inicio { get; set; }
    public string Hora_Inicio { get; set; }
    public string Hora_Fin { get; set; }
    public string Hallazgo { get; set; }
    public long TipoHallazgoId { get; set; }
    //public int Tipo_Id { get; set; }
    //public string Tipo_Des { get; set; }
    //public DateTime Fin_Plan {get; set;}

}//*/

public class AdjuntosInforme
{
    public long     Id              { get; set; }
    public long     AuditoriaId     { get; set; }
    public string   AdjuntoName     { get; set; }
}