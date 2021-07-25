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

class DataRequisitosAllGet
{
    
    public List<requisitosallget> funGetRequisitosAllList(ILogger log
                                                                , long vnIdNorma
                                                                , long vnIdUnidadNegocio
                                                                , long vnIdProceso
                                                                , long vnIdUnidadNegocioProceso
                                                                , long vnIdPlan
                                                                )
    {

        //log.LogInformation(str1);
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);

        //Lista de Objetos
        List<requisitosallget> lobjs = new List<requisitosallget>();
        requisitosallget curobj;

        //SQL Objects
        SqlDataReader dataReader;

        try
        {

            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();

                var textselect = "SELECT R.Id, R.[Title], R.Code, R.Description, R.CapituloId, UNP.NormaId, UNP.ProcesoId, UNP.Id AS UnidadNegocioProcesoId ";

                if (vnIdPlan != 0)
                {
                    textselect = textselect + ", PP.AuditorId, PP.Inicio, PP.Hora_Inicio, PP.Hora_Fin,  PP.Hora_Inicio_Real, PP.Hora_Fin_Real, PP.TipoHallazgoId, PP.Hallazgo ";
                    textselect = textselect + ", TH.Description AS Description_Hallazgo, TH.Code AS Code_Hallazgo ";
                    textselect = textselect + ", AU.Name AS Auditor ";
                }


                textselect = textselect + " FROM [auditoria].[Requisitos] R ";
                textselect = textselect + " INNER JOIN [auditoria].UnidadNegocioProceso UNP ON UNP.RequisitoId = R.Id ";

                if (vnIdPlan != 0)
                {
                    textselect = textselect + String.Format(" LEFT JOIN [auditoria].Programacion_Plan PP ON UNP.Id = PP.UnidadNegocioProcesoId AND PP.PlanAuditoriaId = {0}", vnIdPlan);
                    textselect = textselect + " LEFT JOIN [auditoria].Tipo_Hallazgo TH ON TH.Id = PP.TipoHallazgoId ";
                    textselect = textselect + " LEFT JOIN [auditoria].Auditor AU ON PP.AuditorId = AU.Id ";
                }

                textselect = textselect + " WHERE (R.Deleted IS NULL OR R.Deleted = 0) ";

                if (vnIdNorma != 0)
                    textselect = textselect + String.Format(" AND UNP.[NormaId] = {0} ", vnIdNorma);
                if (vnIdUnidadNegocio != 0)
                    textselect = textselect + String.Format(" AND UNP.[UnidadNegocioId] = {0} ", vnIdUnidadNegocio);
                if (vnIdProceso != 0)
                    textselect = textselect + String.Format(" AND UNP.[ProcesoId] = {0} ", vnIdProceso);
                if (vnIdUnidadNegocioProceso != 0)
                    textselect = textselect + String.Format(" AND UNP.[Id] = {0} ", vnIdUnidadNegocioProceso);


                textselect = textselect + String.Format(" ORDER BY R.Code ASC");

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
                            curobj = new requisitosallget();
                            curobj.Id = (long)(dataReader.GetValue(0));
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code"))) { curobj.Code = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Title"))) { curobj.Title = (string)(dataReader.GetValue(dataReader.GetOrdinal("Title"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Description"))) { curobj.Description = (string)(dataReader.GetValue(dataReader.GetOrdinal("Description"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("NormaId"))) { curobj.NormaId = (long)(dataReader.GetValue(dataReader.GetOrdinal("NormaId"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("ProcesoId"))) { curobj.ProcesoId = (long)(dataReader.GetValue(dataReader.GetOrdinal("ProcesoId"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("CapituloId"))) { curobj.CapituloId = (long)(dataReader.GetValue(dataReader.GetOrdinal("CapituloId"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("UnidadNegocioProcesoId"))) { curobj.UnidadNegocioProcesoId = (long)(dataReader.GetValue(dataReader.GetOrdinal("UnidadNegocioProcesoId"))); }


                            if (vnIdPlan != 0)
                            {
                                if (!dataReader.IsDBNull(dataReader.GetOrdinal("TipoHallazgoId"))) { curobj.TipoHallazgoId = (long)(dataReader.GetValue(dataReader.GetOrdinal("TipoHallazgoId"))); }
                                if (!dataReader.IsDBNull(dataReader.GetOrdinal("Hallazgo"))) { curobj.Hallazgo = (string)(dataReader.GetValue(dataReader.GetOrdinal("Hallazgo"))); }
                                if (!dataReader.IsDBNull(10)) { curobj.Hora_Inicio = dataReader.GetTimeSpan(10).ToString(@"hh\:mm"); }
                                if (!dataReader.IsDBNull(11)) { curobj.Hora_Fin = dataReader.GetTimeSpan(11).ToString(@"hh\:mm"); }
                                if (!dataReader.IsDBNull(12)) { curobj.Hora_Inicio_Real = (string)dataReader.GetTimeSpan(12).ToString(@"hh\:mm"); }
                                if (!dataReader.IsDBNull(13)) { curobj.Hora_Fin_Real = (string)dataReader.GetTimeSpan(13).ToString(@"hh\:mm"); }
                                if (!dataReader.IsDBNull(dataReader.GetOrdinal("AuditorId"))) { curobj.AuditorId = (int)(dataReader.GetValue(dataReader.GetOrdinal("AuditorId"))); }
                                if (!dataReader.IsDBNull(dataReader.GetOrdinal("Auditor"))) { curobj.Auditor = (string)(dataReader.GetValue(dataReader.GetOrdinal("Auditor"))); }
                                if (!dataReader.IsDBNull(dataReader.GetOrdinal("Inicio"))) { curobj.Inicio = (DateTime)(dataReader.GetValue(dataReader.GetOrdinal("Inicio"))); }
                                if (!dataReader.IsDBNull(dataReader.GetOrdinal("Description_Hallazgo"))) { curobj.Description_Hallazgo = (string)(dataReader.GetValue(dataReader.GetOrdinal("Description_Hallazgo"))); }
                                if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code_Hallazgo"))) { curobj.Code_Hallazgo = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code_Hallazgo"))); }
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
            curobj = new requisitosallget();
            curobj.Id = 0;
            curobj.Code = "nulo";
            curobj.Description = System.Convert.ToString(ex.Message);
            lobjs.Add(curobj);
        }

        return lobjs;
    }


    /**
     * Devolver el listado de requisitos por proceso, auditoria y auditor logueado desde la app
     */
    public List<requisitosallget> funGetRequisitosAllListApp(ILogger log
                                                               , long vnIdAuditoria
                                                               , long vnIdProceso
                                                               , string vvUserIdHash
                                                               )
    {

        //log.LogInformation(str1);
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
        //Lista de Objetos
        List<requisitosallget> lobjs = new List<requisitosallget>();
        requisitosallget curobj;
        //SQL Objects
        SqlDataReader dataReader;

        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();

                var textselect = " SELECT R.Id, R.Code, R.Description, R.CapituloId, R.Title, R.TipoDocumento, UNP.ProcesoId,  ";
                textselect = textselect + " PP.Id AS ProgramacionPlanId, PP.PlanAuditoriaId, PP.AuditorId, PP.Hora_Inicio,  ";
                textselect = textselect + " PP.Hora_Fin, PP.Hora_Inicio_Real, PP.Hora_Fin_Real, PP.Inicio, PA.AuditoriaId, Au.Name, ";
                textselect = textselect + " PP.TipoHallazgoId, PP.Hallazgo, PP.Id AS ProgramacionPlanId, ";
                textselect = textselect + " (SELECT STUFF((SELECT ', ' + CONVERT(VARCHAR(100), R.Description) FROM [auditoria].Responsable R, [auditoria].Responsable_Proceso RP                         WHERE R.Id = RP.ResponsableId AND RP.ProcesoId = UNP.ProcesoId AND RP.UnidadNegocioId = UNP.UnidadNegocioId AND RP.NormaId = UNP.NormaId FOR xml path('')), 1, 1, '')) AS Responsable ";
                textselect = textselect + " FROM auditoria.Requisitos AS R ";
                textselect = textselect + " INNER JOIN auditoria.UnidadNegocioProceso AS UNP ON R.Id = UNP.RequisitoId ";
                textselect = textselect + " INNER JOIN auditoria.Programacion_Plan AS PP ON UNP.Id = PP.UnidadNegocioProcesoId ";
                textselect = textselect + " INNER JOIN auditoria.Plan_Auditoria AS PA ON PP.PlanAuditoriaId = PA.Id ";
                textselect = textselect + " INNER JOIN auditoria.Auditor AS Au ON PP.AuditorId = Au.Id ";

                textselect = textselect + " WHERE (R.Deleted IS NULL OR R.Deleted = 0) ";
                if (vnIdAuditoria != 0)
                    textselect = textselect + String.Format(" AND PA.AuditoriaId = {0} ", vnIdAuditoria);
                if (vnIdProceso != 0)
                    textselect = textselect + String.Format(" AND UNP.ProcesoId = {0} ", vnIdProceso);
                if (vvUserIdHash != null)
                    textselect = textselect + String.Format(" AND Au.UserIdhash = '{0}' ", vvUserIdHash);

                textselect = textselect + String.Format(" ORDER BY UNP.ProcesoId, R.Code ASC");

                var StrQuery = textselect;
                //End - Manejo de Parametros

                log.LogInformation("StrQuery: " + StrQuery);

                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    //Ejecutar Comando
                    using (dataReader = cmd.ExecuteReader())
                    {
                        //Navegar en el Conjunto de Datos Recuperados
                        while (dataReader.Read())
                        {
                            curobj = new requisitosallget();
                            curobj.Id = (long)(dataReader.GetValue(0));
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code"))) { curobj.Code = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Title"))) { curobj.Title = (string)(dataReader.GetValue(dataReader.GetOrdinal("Title"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Description"))) { curobj.Description = (string)(dataReader.GetValue(dataReader.GetOrdinal("Description"))); }
                            //if (!dataReader.IsDBNull(dataReader.GetOrdinal("NormaId"))) { curobj.NormaId = (long)(dataReader.GetValue(dataReader.GetOrdinal("NormaId"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("ProcesoId"))) { curobj.ProcesoId = (long)(dataReader.GetValue(dataReader.GetOrdinal("ProcesoId"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("CapituloId"))) { curobj.CapituloId = (long)(dataReader.GetValue(dataReader.GetOrdinal("CapituloId"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("ProgramacionPlanId"))) { curobj.ProgramacionPlanId = (long)(dataReader.GetValue(dataReader.GetOrdinal("ProgramacionPlanId"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Inicio"))) { curobj.Inicio = (DateTime)(dataReader.GetValue(dataReader.GetOrdinal("Inicio"))); }
                            if (!dataReader.IsDBNull(10)) { curobj.Hora_Inicio = dataReader.GetTimeSpan(10).ToString(@"hh\:mm"); }
                            if (!dataReader.IsDBNull(11)) { curobj.Hora_Fin = dataReader.GetTimeSpan(11).ToString(@"hh\:mm"); }
                            if (!dataReader.IsDBNull(12)) { curobj.Hora_Inicio_Real = (string)dataReader.GetTimeSpan(12).ToString(@"hh\:mm"); }
                            if (!dataReader.IsDBNull(13)) { curobj.Hora_Fin_Real = (string)dataReader.GetTimeSpan(13).ToString(@"hh\:mm"); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("AuditorId"))) { curobj.AuditorId = (int)(dataReader.GetValue(dataReader.GetOrdinal("AuditorId"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("TipoHallazgoId"))) { curobj.TipoHallazgoId = (long)(dataReader.GetValue(dataReader.GetOrdinal("TipoHallazgoId"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Hallazgo"))) { curobj.Hallazgo = (string)(dataReader.GetValue(dataReader.GetOrdinal("Hallazgo"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Responsable"))) { curobj.Responsable = (string)(dataReader.GetValue(dataReader.GetOrdinal("Responsable"))); }

                            int yearA = curobj.Inicio.Year;
                            int monthA = curobj.Inicio.Month;
                            int dayA = curobj.Inicio.Day;
                            
                            var valor = curobj.Hora_Inicio.Split(':');
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

                            if (!dataReader.IsDBNull(13)) { curobj.Semaforo = 0; }


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
            curobj = new requisitosallget();
            curobj.Id = 0;
            curobj.Code = "nulo";
            curobj.Description = System.Convert.ToString(ex.Message);
            lobjs.Add(curobj);
        }

        return lobjs;
    }




}

public class requisitosallget
{

    public long Id { get; set; }
    public string Description { get; set; }
    public string Title { get; set; }
    public string Code { get; set; }
    public long ProcesoId { get; set; }
    public long CapituloId { get; set; }
    public long NormaId { get; set; }
    public long UnidadNegocioProcesoId { get; set; }
    // Programacion Plan
    public int AuditorId { get; set; }
    public long ProgramacionPlanId { get; set; }
    public DateTime Inicio { get; set; }
    public string Hora_Inicio { get; set; }
    public string Hora_Fin { get; set; }
    public string Hora_Inicio_Real { get; set; }
    public string Hora_Fin_Real { get; set; }
    public string Hallazgo { get; set; }
    public long TipoHallazgoId { get; set; }
    public string Code_Hallazgo { get; set; }
    public string Description_Hallazgo { get; set; }
    public string Responsable { get; set; }
    public int Semaforo { get; set; }
    public string Auditor { get; set; }

}