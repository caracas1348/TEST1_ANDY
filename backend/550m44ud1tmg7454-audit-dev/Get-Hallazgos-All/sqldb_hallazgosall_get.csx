using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataHallazgosGetAll
{
    string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);

    public async Task<DataHallazgo> funGetHallazgosAllList( ILogger log
                                                            , long Id
                                                            , long FuenteId
                                                            , long TipoHallazgoId
                                                            , long NormaId
                                                            , long SedeId
                                                            , long StatusId
                                                            , long StatusAccionCorrectivaId
                                                            , string FechaInicio
                                                            , string FechaFin
                                                            , string ResponsableUserHash
                                                            )
    {
        //Lista de Objetos
        DataHallazgo DataHallazgo = new DataHallazgo();
        //Listado de objetos de Hallazgos
        List<HallazgosGet> lobjs  = new List<HallazgosGet>();
        //Listado de objetos de Fuentes
        List<Fuentes> Fuentes  = new List<Fuentes>();
        //Listado de objetos de TipoHallazgos
        List<TipoHallazgos> TipoHallazgos  = new List<TipoHallazgos>();
        //Listado de objetos de Normas
        List<Normas> Normas  = new List<Normas>();
        //Listado de objetos de UnidadNegocio
        List<UnidadNegocio> UnidadNegocio  = new List<UnidadNegocio>();
        //Listado de objetos de Sedes
        List<Sedes> Sedes  = new List<Sedes>();
        //Listado de objetos de StatusHallazgos
        List<StatusHallazgos> StatusHallazgos  = new List<StatusHallazgos>();
        //Listado de objetos de Areas
        List<Areas> Areas  = new List<Areas>();
        //Objeto de Hallazgo
        HallazgosGet curobj;
        //Objeto de AccionCorrectiva
        AccionCorrectiva curobjAC;
        //Listado de objetos de AnalisisProblema
        List<AnalisisProblema> AnalisisProblema  = new List<AnalisisProblema>();
        //Objeto de AnalisisProblema
        AnalisisProblema curobjAP;
        //Listado de objetos de PlanAccion
        List<PlanAccion> PlanAccion = new List<PlanAccion>();
        //Objeto de PlanAccion
        PlanAccion curobjPA;
        //Listado de objetos de IntegrantesAnalisis
        List<IntegrantesAnalisis> IntegrantesAnalisis = new List<IntegrantesAnalisis>();
        //Objeto de IntegrantesAnalisis
        IntegrantesAnalisis curobjIA;
        //Listado de objetos de StatusAccionCorrectiva
        List<StatusAccionCorrectiva> StatusAccionCorrectiva = new List<StatusAccionCorrectiva>();
        //Listado de objetos de ColoresAnalisis
        List<ColoresAnalisis> ColoresAnalisis = new List<ColoresAnalisis>();
        //Listado de objetos de AnalisisMedidasCeroFallas
        List<AnalisisMedidasCeroFallas> AnalisisMedidasCeroFallas = new List<AnalisisMedidasCeroFallas>();
        //Listado de objetos de PlazoAccion
        List<PlazoAccion> PlazoAccion = new List<PlazoAccion>();
        //Listado de objetos de TipoAccion
        List<TipoAccion> TipoAccion = new List<TipoAccion>();
        //Listado de objetos de StatusAccion
        List<StatusAccion> StatusAccion = new List<StatusAccion>();
        //Listado de objetos de EnvioACR
        List<EnvioACR> EnvioACR = new List<EnvioACR>();
        //Console.WriteLine("Prueba a ver si sale en la consola del azure:");
        log.LogInformation("en la funcion funGetHallazgosAllList -> "+ Id);
        //SQL Objects
        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                log.LogInformation("ResponsableUserHash "+ResponsableUserHash);
                log.LogInformation("Id "+Id);
                conn.Open();

                SqlCommand cmd = new SqlCommand("[auditoria].[get_hallazgos]", conn);

                cmd.Parameters.AddWithValue("@Id", Id);
                cmd.Parameters.AddWithValue("@FuenteId", FuenteId);
                cmd.Parameters.AddWithValue("@TipoHallazgoId", TipoHallazgoId);
                cmd.Parameters.AddWithValue("@NormaId", NormaId);
                cmd.Parameters.AddWithValue("@SedeId", SedeId);
                cmd.Parameters.AddWithValue("@StatusId", StatusId);
                cmd.Parameters.AddWithValue("@StatusAccionCorrectivaId", StatusAccionCorrectivaId);
                cmd.Parameters.AddWithValue("@FechaInicio", FechaInicio);
                cmd.Parameters.AddWithValue("@FechaFin", FechaFin);
                cmd.Parameters.AddWithValue("@ResponsableUserHash", ResponsableUserHash);

                cmd.CommandType = CommandType.StoredProcedure;
                log.LogInformation("antes de dataReader ");
                //Ejecutar Comando buscaremos los hallazgos registrados
                using (SqlDataReader dataReader = await cmd.ExecuteReaderAsync())
                {
                    //Navegar en el Conjunto de Datos Recuperados
                    while (dataReader.Read())
                    {
                        curobj = new HallazgosGet();
                        log.LogInformation("despues de HallazgosGet ");
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobj.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("ProgramacionPlanId"))) { curobj.ProgramacionPlanId = (long)(dataReader.GetValue(dataReader.GetOrdinal("ProgramacionPlanId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("RequisitoId"))) { curobj.RequisitoId = (long)(dataReader.GetValue(dataReader.GetOrdinal("RequisitoId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Requisito"))) { curobj.Requisito = (string)(dataReader.GetValue(dataReader.GetOrdinal("Requisito"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code_Hallazgo"))) { curobj.Code_Hallazgo = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code_Hallazgo"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Hora"))) { curobj.Hora = (string)(dataReader.GetValue(dataReader.GetOrdinal("Hora"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Fuente"))) { curobj.Fuente = (string)(dataReader.GetValue(dataReader.GetOrdinal("Fuente"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("TipoHallazgo"))) { curobj.TipoHallazgo = (string)(dataReader.GetValue(dataReader.GetOrdinal("TipoHallazgo"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Norma"))) { curobj.Norma = (string)(dataReader.GetValue(dataReader.GetOrdinal("Norma"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Sede"))) { curobj.Sede = (string)(dataReader.GetValue(dataReader.GetOrdinal("Sede"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("FechaEjecucion"))) { curobj.FechaEjecucion = (string)(dataReader.GetValue(dataReader.GetOrdinal("FechaEjecucion"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("FechaRegistro"))) { curobj.FechaRegistro = (string)(dataReader.GetValue(dataReader.GetOrdinal("FechaRegistro"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("FechaEnvio"))) { curobj.FechaEnvio = (string)(dataReader.GetValue(dataReader.GetOrdinal("FechaEnvio"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("StatusHallazgo"))) { curobj.StatusHallazgo = (string)(dataReader.GetValue(dataReader.GetOrdinal("StatusHallazgo"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("StatusHallazgoCode"))) { curobj.StatusHallazgoCode = (string)(dataReader.GetValue(dataReader.GetOrdinal("StatusHallazgoCode"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("StatusAccionCorrectiva"))) { curobj.StatusAccionCorrectiva = (string)(dataReader.GetValue(dataReader.GetOrdinal("StatusAccionCorrectiva"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("StatusAccionCorrectivaCode"))) { curobj.StatusAccionCorrectivaCode = (string)(dataReader.GetValue(dataReader.GetOrdinal("StatusAccionCorrectivaCode"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("UnidadNegocio"))) { curobj.UnidadNegocio = (string)(dataReader.GetValue(dataReader.GetOrdinal("UnidadNegocio"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("FuenteId"))) { curobj.FuenteId = (long)(dataReader.GetValue(dataReader.GetOrdinal("FuenteId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("TipoHallazgoId"))) { curobj.TipoHallazgoId = (long)(dataReader.GetValue(dataReader.GetOrdinal("TipoHallazgoId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Hallazgo"))) { curobj.Hallazgo = (string)(dataReader.GetValue(dataReader.GetOrdinal("Hallazgo"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("ResponsableId"))) { curobj.ResponsableId = (long)(dataReader.GetValue(dataReader.GetOrdinal("ResponsableId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("ResponsableName"))) { curobj.ResponsableName = (string)(dataReader.GetValue(dataReader.GetOrdinal("ResponsableName"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("ResponsableCorreo"))) { curobj.ResponsableCorreo = (string)(dataReader.GetValue(dataReader.GetOrdinal("ResponsableCorreo"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("ReportanteId"))) { curobj.ReportanteId = (long)(dataReader.GetValue(dataReader.GetOrdinal("ReportanteId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("ReportanteName"))) { curobj.ReportanteName = (string)(dataReader.GetValue(dataReader.GetOrdinal("ReportanteName"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("AnalisisCausa"))) { curobj.AnalisisCausa = (int)(dataReader.GetValue(dataReader.GetOrdinal("AnalisisCausa"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("StatusHallazgoId"))) { curobj.StatusHallazgoId = (long)(dataReader.GetValue(dataReader.GetOrdinal("StatusHallazgoId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("StatusAccionCorrectivaId"))) { curobj.StatusAccionCorrectivaId = (long)(dataReader.GetValue(dataReader.GetOrdinal("StatusAccionCorrectivaId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("StatusEvaluacionAccionCorrectivaId"))) { curobj.StatusEvaluacionAccionCorrectivaId = (long)(dataReader.GetValue(dataReader.GetOrdinal("StatusEvaluacionAccionCorrectivaId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("NormaId"))) { curobj.NormaId = (long)(dataReader.GetValue(dataReader.GetOrdinal("NormaId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Correlativo"))) { curobj.Correlativo = (int)(dataReader.GetValue(dataReader.GetOrdinal("Correlativo"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("SedeId"))) { curobj.SedeId = (long)(dataReader.GetValue(dataReader.GetOrdinal("SedeId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("UnidadNegocioId"))) { curobj.UnidadNegocioId = (long)(dataReader.GetValue(dataReader.GetOrdinal("UnidadNegocioId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("ResponsableCargo"))) { curobj.ResponsableCargo = (string)(dataReader.GetValue(dataReader.GetOrdinal("ResponsableCargo"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("ResponsableCorreo"))) { curobj.ResponsableCorreo = (string)(dataReader.GetValue(dataReader.GetOrdinal("ResponsableCorreo"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("ReportanteCargo"))) { curobj.ReportanteCargo = (string)(dataReader.GetValue(dataReader.GetOrdinal("ReportanteCargo"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("ReportanteCorreo"))) { curobj.ReportanteCorreo = (string)(dataReader.GetValue(dataReader.GetOrdinal("ReportanteCorreo"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("ResponsableUserHash"))) { curobj.ResponsableUserHash = (string)(dataReader.GetValue(dataReader.GetOrdinal("ResponsableUserHash"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("ReportanteUserHash"))) { curobj.ReportanteUserHash = (string)(dataReader.GetValue(dataReader.GetOrdinal("ReportanteUserHash"))); }
                        log.LogInformation("curobj.Fuente "+curobj.Fuente);
                        log.LogInformation("curobj.Code_Hallazgo "+curobj.Code_Hallazgo);
                        //aqui procedemos a buscar la accion correctiva guardada
                        using (SqlConnection conn2 = new SqlConnection(vvsqlconnectionString))
                        {
                            conn2.Open();

                            log.LogInformation("[auditoria].[get_accion_correctiva] ");
                            SqlCommand cmd2 = new SqlCommand("[auditoria].[get_accion_correctiva]", conn2);
                            //cmd2.Parameters.Clear();
                            cmd2.Parameters.AddWithValue("@HallazgoId", curobj.Id);
                            cmd2.CommandType = CommandType.StoredProcedure;
                            using (SqlDataReader dr = await cmd2.ExecuteReaderAsync())
                            {
                                curobjAC = new AccionCorrectiva();
                                //Navegar en el Conjunto de Datos Recuperados
                                while (dr.Read())
                                {

                                    if (!dr.IsDBNull(dr.GetOrdinal("Id"))) { curobjAC.Id = (long)(dr.GetValue(dr.GetOrdinal("Id"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("HallazgoId"))) { curobjAC.HallazgoId = (long)(dr.GetValue(dr.GetOrdinal("HallazgoId"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("HACeroPerdidasId"))) { curobjAC.HACeroPerdidasId = (long)(dr.GetValue(dr.GetOrdinal("HACeroPerdidasId"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("CeroPerdidas"))) { curobjAC.CeroPerdidas = (string)(dr.GetValue(dr.GetOrdinal("CeroPerdidas"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("CeroPerdidasDescription"))) { curobjAC.CeroPerdidasDescription = (string)(dr.GetValue(dr.GetOrdinal("CeroPerdidasDescription"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("UltimoNivel"))) { curobjAC.UltimoNivel = (int)(dr.GetValue(dr.GetOrdinal("UltimoNivel"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("Que"))) { curobjAC.Que = (string)(dr.GetValue(dr.GetOrdinal("Que"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("Donde"))) { curobjAC.Donde = (string)(dr.GetValue(dr.GetOrdinal("Donde"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("Cuando"))) { curobjAC.Cuando = (string)(dr.GetValue(dr.GetOrdinal("Cuando"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("Como"))) { curobjAC.Como = (string)(dr.GetValue(dr.GetOrdinal("Como"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("Cual"))) { curobjAC.Cual = (string)(dr.GetValue(dr.GetOrdinal("Cual"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("Problema"))) { curobjAC.Problema = (string)(dr.GetValue(dr.GetOrdinal("Problema"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("AreaId"))) { curobjAC.AreaId = (long)(dr.GetValue(dr.GetOrdinal("AreaId"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("Flag_Definido"))) { curobjAC.Flag_Definido = (int)(dr.GetValue(dr.GetOrdinal("Flag_Definido"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("Flag_Completado"))) { curobjAC.Flag_Completado = (int)(dr.GetValue(dr.GetOrdinal("Flag_Completado"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("Deleted"))) { curobjAC.Deleted = (bool)(dr.GetValue(dr.GetOrdinal("Deleted"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("FechaInicioAnalisis"))) { curobjAC.FechaInicioAnalisis = (string)(dr.GetValue(dr.GetOrdinal("FechaInicioAnalisis"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("FechaFinAnalisis"))) { curobjAC.FechaFinAnalisis = (string)(dr.GetValue(dr.GetOrdinal("FechaFinAnalisis"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("AreaDescription"))) { curobjAC.AreaDescription = (string)(dr.GetValue(dr.GetOrdinal("AreaDescription"))); }

                                    //aqui procedemos a buscar los 5 porque (Analisis Problema)
                                    using (SqlConnection conn3 = new SqlConnection(vvsqlconnectionString))
                                    {
                                        conn3.Open();

                                        SqlCommand cmd3 = new SqlCommand("[auditoria].[get_analisis_problema]", conn3);
                                        log.LogInformation("[auditoria].[get_analisis_problema] ");
                                        //cmd3.Parameters.Clear();
                                        cmd3.Parameters.AddWithValue("@AccionCorrectivaId", curobjAC.Id);
                                        log.LogInformation("[curobjAC.Id] "+curobjAC.Id);
                                        cmd3.CommandType = CommandType.StoredProcedure;
                                        using (SqlDataReader dr2 = await cmd3.ExecuteReaderAsync())
                                        {
                                            AnalisisProblema = new List<AnalisisProblema>();
                                            log.LogInformation("new List<AnalisisProblema> ");
                                            //Navegar en el Conjunto de Datos Recuperados
                                            while (dr2.Read())
                                            {
                                                log.LogInformation("dentro while dr2");
                                                curobjAP = new AnalisisProblema();
                                                if (!dr2.IsDBNull(dr2.GetOrdinal("Id"))) { curobjAP.Id = (long)(dr2.GetValue(dr2.GetOrdinal("Id"))); }
                                                if (!dr2.IsDBNull(dr2.GetOrdinal("HAAccionCorrectivaId"))) { curobjAP.HAAccionCorrectivaId = (long)(dr2.GetValue(dr2.GetOrdinal("HAAccionCorrectivaId"))); }
                                                if (!dr2.IsDBNull(dr2.GetOrdinal("HAAnalisisProblemasId"))) { curobjAP.HAAnalisisProblemasId = (long)(dr2.GetValue(dr2.GetOrdinal("HAAnalisisProblemasId"))); }
                                                if (!dr2.IsDBNull(dr2.GetOrdinal("Pregunta"))) { curobjAP.Pregunta = (string)(dr2.GetValue(dr2.GetOrdinal("Pregunta"))); }
                                                if (!dr2.IsDBNull(dr2.GetOrdinal("Respuesta"))) { curobjAP.Respuesta = (string)(dr2.GetValue(dr2.GetOrdinal("Respuesta"))); }
                                                if (!dr2.IsDBNull(dr2.GetOrdinal("Nivel"))) { curobjAP.Nivel = (int)(dr2.GetValue(dr2.GetOrdinal("Nivel"))); }
                                                if (!dr2.IsDBNull(dr2.GetOrdinal("HAColoresAnalisisId"))) { curobjAP.HAColoresAnalisisId = (long)(dr2.GetValue(dr2.GetOrdinal("HAColoresAnalisisId"))); }
                                                if (!dr2.IsDBNull(dr2.GetOrdinal("Code"))) { curobjAP.Code = (string)(dr2.GetValue(dr2.GetOrdinal("Code"))); }
                                                //if (!dr2.IsDBNull(dr2.GetOrdinal("Deleted"))) { curobjAP.Deleted = (bool)(dr2.GetValue(dr.GetOrdinal("Deleted"))); }

                                                log.LogInformation("[curobjAP.Id] "+curobjAP.Id);
                                                AnalisisProblema.Add(curobjAP);
                                            }
                                            log.LogInformation("Despues del while dr2 ");
                                            curobjAC.AnalisisProblema = AnalisisProblema;

                                            //buscamos los integrante del analisis
                                            dr2.NextResult();
                                            IntegrantesAnalisis = new List<IntegrantesAnalisis>();
                                            while (dr2.Read())
                                            {
                                                curobjIA = new IntegrantesAnalisis();
                                                if (!dr2.IsDBNull(dr2.GetOrdinal("Id"))) { curobjIA.Id = (long)(dr2.GetValue(dr2.GetOrdinal("Id"))); }
                                                if (!dr2.IsDBNull(dr2.GetOrdinal("HAAccionCorrectivaId"))) { curobjIA.HAAccionCorrectivaId = (long)(dr2.GetValue(dr2.GetOrdinal("HAAccionCorrectivaId"))); }
                                                if (!dr2.IsDBNull(dr2.GetOrdinal("UserHash"))) { curobjIA.UserHash = (string)(dr2.GetValue(dr2.GetOrdinal("UserHash"))); }
                                                if (!dr2.IsDBNull(dr2.GetOrdinal("Name"))) { curobjIA.Name = (string)(dr2.GetValue(dr2.GetOrdinal("Name"))); }
                                                if (!dr2.IsDBNull(dr2.GetOrdinal("Email"))) { curobjIA.Email = (string)(dr2.GetValue(dr2.GetOrdinal("Email"))); }
                                                if (!dr2.IsDBNull(dr2.GetOrdinal("Cargo"))) { curobjIA.Cargo = (string)(dr2.GetValue(dr2.GetOrdinal("Cargo"))); }

                                                IntegrantesAnalisis.Add(curobjIA);
                                            }
                                            curobjAC.IntegrantesAnalisis = IntegrantesAnalisis;
                                            log.LogInformation("curobjAC.IntegrantesAnalisis");

                                            //buscamos las personas que se le envio el ACR para la evaluacion
                                            dr2.NextResult();
                                            EnvioACR = new List<EnvioACR>();
                                            while (dr2.Read())
                                            {
                                                EnvioACR curobjEnvio = new EnvioACR();
                                                if (!dr2.IsDBNull(dr2.GetOrdinal("Id"))) { curobjEnvio.Id = (long)(dr2.GetValue(dr2.GetOrdinal("Id"))); }
                                                if (!dr2.IsDBNull(dr2.GetOrdinal("HAAccionCorrectivaId"))) { curobjEnvio.HAAccionCorrectivaId = (long)(dr2.GetValue(dr2.GetOrdinal("HAAccionCorrectivaId"))); }
                                                if (!dr2.IsDBNull(dr2.GetOrdinal("UserHash"))) { curobjEnvio.UserHash = (string)(dr2.GetValue(dr2.GetOrdinal("UserHash"))); }
                                                if (!dr2.IsDBNull(dr2.GetOrdinal("Name"))) { curobjEnvio.Name = (string)(dr2.GetValue(dr2.GetOrdinal("Name"))); }
                                                if (!dr2.IsDBNull(dr2.GetOrdinal("Correo"))) { curobjEnvio.Correo = (string)(dr2.GetValue(dr2.GetOrdinal("Correo"))); }
                                                if (!dr2.IsDBNull(dr2.GetOrdinal("Cargo"))) { curobjEnvio.Cargo = (string)(dr2.GetValue(dr2.GetOrdinal("Cargo"))); }
                                                if (!dr2.IsDBNull(dr2.GetOrdinal("Deleted"))) { curobjEnvio.Deleted = (bool)(dr2.GetValue(dr2.GetOrdinal("Deleted"))); }

                                                EnvioACR.Add(curobjEnvio);
                                            }
                                            curobjAC.EnvioACR = EnvioACR;
                                            log.LogInformation("curobjAC.EnvioACR");

                                            //buscamos las personas que se le envio el ACR para la evaluacion
                                            dr2.NextResult();
                                            List<EvaluarACR> EvaluarACR = new List<EvaluarACR>();
                                            while (dr2.Read())
                                            {
                                                EvaluarACR curobjEvaluarACR = new EvaluarACR();
                                                if (!dr2.IsDBNull(dr2.GetOrdinal("Id"))) { curobjEvaluarACR.Id = (long)(dr2.GetValue(dr2.GetOrdinal("Id"))); }
                                                if (!dr2.IsDBNull(dr2.GetOrdinal("HAAccionCorrectivaId"))) { curobjEvaluarACR.HAAccionCorrectivaId = (long)(dr2.GetValue(dr2.GetOrdinal("HAAccionCorrectivaId"))); }
                                                if (!dr2.IsDBNull(dr2.GetOrdinal("StatusAccionCorrectivaId"))) { curobjEvaluarACR.StatusAccionCorrectivaId = (long)(dr2.GetValue(dr2.GetOrdinal("StatusAccionCorrectivaId"))); }
                                                if (!dr2.IsDBNull(dr2.GetOrdinal("Active"))) { curobjEvaluarACR.Active = (int)(dr2.GetValue(dr2.GetOrdinal("Active"))); }
                                                if (!dr2.IsDBNull(dr2.GetOrdinal("Observacion"))) { curobjEvaluarACR.Observacion = (string)(dr2.GetValue(dr2.GetOrdinal("Observacion"))); }
                                                if (!dr2.IsDBNull(dr2.GetOrdinal("FechaEvaluacion"))) { curobjEvaluarACR.FechaEvaluacion = (string)(dr2.GetValue(dr2.GetOrdinal("FechaEvaluacion"))); }
                                                if (!dr2.IsDBNull(dr2.GetOrdinal("EvaluadorUserHash"))) { curobjEvaluarACR.EvaluadorUserHash = (string)(dr2.GetValue(dr2.GetOrdinal("EvaluadorUserHash"))); }
                                                if (!dr2.IsDBNull(dr2.GetOrdinal("EvaluadorName"))) { curobjEvaluarACR.EvaluadorName = (string)(dr2.GetValue(dr2.GetOrdinal("EvaluadorName"))); }
                                                if (!dr2.IsDBNull(dr2.GetOrdinal("EvaluadorCorreo"))) { curobjEvaluarACR.EvaluadorCorreo = (string)(dr2.GetValue(dr2.GetOrdinal("EvaluadorCorreo"))); }
                                                if (!dr2.IsDBNull(dr2.GetOrdinal("EvaluadorCargo"))) { curobjEvaluarACR.EvaluadorCargo = (string)(dr2.GetValue(dr2.GetOrdinal("EvaluadorCargo"))); }

                                                EvaluarACR.Add(curobjEvaluarACR);
                                            }
                                            curobjAC.EvaluarACR = EvaluarACR;
                                            log.LogInformation("curobjAC.EvaluarACR");

                                        }


                                        if (conn3.State == System.Data.ConnectionState.Open)
                                            conn3.Close();
                                        log.LogInformation("Despues de cerrar conn3 ");

                                    }


                                    //aqui procedemos a buscar el Plan Accion
                                    using (SqlConnection conn4 = new SqlConnection(vvsqlconnectionString))
                                    {
                                        conn4.Open();

                                        SqlCommand cmd4 = new SqlCommand("[auditoria].[get_plan_accion]", conn4);
                                        //cmd4.Parameters.Clear();
                                        cmd4.Parameters.AddWithValue("@AccionCorrectivaId", curobjAC.Id);

                                        cmd4.CommandType = CommandType.StoredProcedure;
                                        using (SqlDataReader dr4 = await cmd4.ExecuteReaderAsync())
                                        {
                                            PlanAccion = new List<PlanAccion>();
                                            //Navegar en el Conjunto de Datos Recuperados
                                            while (dr4.Read())
                                            {
                                                curobjPA = new PlanAccion();
                                                if (!dr4.IsDBNull(dr4.GetOrdinal("Id"))) { curobjPA.Id = (long)(dr4.GetValue(dr4.GetOrdinal("Id"))); }
                                                if (!dr4.IsDBNull(dr4.GetOrdinal("HAAnalisisProblemaId"))) { curobjPA.HAAnalisisProblemaId = (long)(dr4.GetValue(dr4.GetOrdinal("HAAnalisisProblemaId"))); }
                                                if (!dr4.IsDBNull(dr4.GetOrdinal("HAAccionCorrectivaId"))) { curobjPA.HAAccionCorrectivaId = (long)(dr4.GetValue(dr4.GetOrdinal("HAAccionCorrectivaId"))); }
                                                if (!dr4.IsDBNull(dr4.GetOrdinal("HAAccionesId"))) { curobjPA.HAAccionesId = (long)(dr4.GetValue(dr4.GetOrdinal("HAAccionesId"))); }
                                                if (!dr4.IsDBNull(dr4.GetOrdinal("HAPlazoAccionId"))) { curobjPA.HAPlazoAccionId = (long)(dr4.GetValue(dr4.GetOrdinal("HAPlazoAccionId"))); }
                                                if (!dr4.IsDBNull(dr4.GetOrdinal("HATipoAccionId"))) { curobjPA.HATipoAccionId = (long)(dr4.GetValue(dr4.GetOrdinal("HATipoAccionId"))); }
                                                if (!dr4.IsDBNull(dr4.GetOrdinal("HAStatusAccionId"))) { curobjPA.HAStatusAccionId = (long)(dr4.GetValue(dr4.GetOrdinal("HAStatusAccionId"))); }
                                                if (!dr4.IsDBNull(dr4.GetOrdinal("Fecha"))) { curobjPA.Fecha = (string)(dr4.GetValue(dr4.GetOrdinal("Fecha"))); }
                                                if (!dr4.IsDBNull(dr4.GetOrdinal("Fecha2"))) { curobjPA.Fecha2 = (DateTime)(dr4.GetValue(dr4.GetOrdinal("Fecha2"))); }
                                                if (!dr4.IsDBNull(dr4.GetOrdinal("Responsable"))) { curobjPA.Responsable = (string)(dr4.GetValue(dr4.GetOrdinal("Responsable"))); }
                                                if (!dr4.IsDBNull(dr4.GetOrdinal("UserHash"))) { curobjPA.UserHash = (string)(dr4.GetValue(dr4.GetOrdinal("UserHash"))); }
                                                if (!dr4.IsDBNull(dr4.GetOrdinal("Cargo"))) { curobjPA.Cargo = (string)(dr4.GetValue(dr4.GetOrdinal("Cargo"))); }
                                                if (!dr4.IsDBNull(dr4.GetOrdinal("Correo"))) { curobjPA.Correo = (string)(dr4.GetValue(dr4.GetOrdinal("Correo"))); }
                                                if (!dr4.IsDBNull(dr4.GetOrdinal("Accion"))) { curobjPA.Accion = (string)(dr4.GetValue(dr4.GetOrdinal("Accion"))); }

                                                PlanAccion.Add(curobjPA);
                                            }
                                            curobjAC.PlanAccion = PlanAccion;
                                        }


                                        if (conn4.State == System.Data.ConnectionState.Open)
                                            conn4.Close();

                                    }

                                    //aqui procedemos a buscar AnalisisMedidasCeroFallas
                                    log.LogInformation("[AnalisisMedidasCeroFallas start]");
                                    using (SqlConnection conn5 = new SqlConnection(vvsqlconnectionString))
                                    {
                                        conn5.Open();

                                        SqlCommand cmd5 = new SqlCommand("[auditoria].[get_analisis_medidas_cero_fallas]", conn5);
                                        //cmd5.Parameters.Clear();
                                        log.LogInformation("[curobjAC.Id] "+curobjAC.Id);
                                        cmd5.Parameters.AddWithValue("@AccionCorrectivaId", curobjAC.Id);

                                        cmd5.CommandType = CommandType.StoredProcedure;
                                        using (SqlDataReader dr5 = await cmd5.ExecuteReaderAsync())
                                        {
                                            AnalisisMedidasCeroFallas = new List<AnalisisMedidasCeroFallas>();
                                            //Navegar en el Conjunto de Datos Recuperados
                                            while (dr5.Read())
                                            {
                                                AnalisisMedidasCeroFallas curobjAMCF = new AnalisisMedidasCeroFallas();
                                                if (!dr5.IsDBNull(dr5.GetOrdinal("Id"))) { curobjAMCF.Id = (long)(dr5.GetValue(dr5.GetOrdinal("Id"))); }
                                                if (!dr5.IsDBNull(dr5.GetOrdinal("HAAnalisisProblemasId"))) { curobjAMCF.HAAnalisisProblemasId = (long)(dr5.GetValue(dr5.GetOrdinal("HAAnalisisProblemasId"))); }
                                                if (!dr5.IsDBNull(dr5.GetOrdinal("HAMedidasCeroFallasId"))) { curobjAMCF.HAMedidasCeroFallasId = (long)(dr5.GetValue(dr5.GetOrdinal("HAMedidasCeroFallasId"))); }
                                                if (!dr5.IsDBNull(dr5.GetOrdinal("HAAccionCorrectivaId"))) { curobjAMCF.HAAccionCorrectivaId = (long)(dr5.GetValue(dr5.GetOrdinal("HAAccionCorrectivaId"))); }

                                                AnalisisMedidasCeroFallas.Add(curobjAMCF);
                                            }
                                            curobjAC.AnalisisMedidasCeroFallas = AnalisisMedidasCeroFallas;
                                        }


                                        if (conn5.State == System.Data.ConnectionState.Open)
                                            conn5.Close();

                                    }
                                    log.LogInformation("[AnalisisMedidasCeroFallas end]");
                                    /////////////////////nuevo


                                }


                                if (conn2.State == System.Data.ConnectionState.Open)
                                    conn2.Close();
                            }
                            curobj.AccionCorrectiva = curobjAC;
                            log.LogInformation("AccionCorrectiva ");

                        }

                        lobjs.Add(curobj);

                    }
                    DataHallazgo.Hallazgos = lobjs;
                    log.LogInformation("DataHallazgo.Hallazgos");

                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        Fuentes curobjF = new Fuentes();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjF.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Fuente"))) { curobjF.Fuente = (string)(dataReader.GetValue(dataReader.GetOrdinal("Fuente"))); }

                        Fuentes.Add(curobjF);
                    }
                    DataHallazgo.Fuentes = Fuentes;
                    log.LogInformation("DataHallazgo.Fuentes");

                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        TipoHallazgos curobjTH = new TipoHallazgos();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjTH.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("TipoHallazgo"))) { curobjTH.TipoHallazgo = (string)(dataReader.GetValue(dataReader.GetOrdinal("TipoHallazgo"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code"))) { curobjTH.Code = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code"))); }

                        TipoHallazgos.Add(curobjTH);
                    }
                    DataHallazgo.TipoHallazgos = TipoHallazgos;
                    log.LogInformation("DataHallazgo.TipoHallazgos");

                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        Normas curobjN = new Normas();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjN.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Norma"))) { curobjN.Norma = (string)(dataReader.GetValue(dataReader.GetOrdinal("Norma"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Description"))) { curobjN.Description = (string)(dataReader.GetValue(dataReader.GetOrdinal("Description"))); }

                        Normas.Add(curobjN);
                    }
                    DataHallazgo.Normas = Normas;
                    log.LogInformation("DataHallazgo.Normas");

                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        UnidadNegocio curobjUN = new UnidadNegocio();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjUN.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("UnidadNegocio"))) { curobjUN.UnidadNegocioDescription = (string)(dataReader.GetValue(dataReader.GetOrdinal("UnidadNegocio"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code"))) { curobjUN.Code = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Address"))) { curobjUN.Address = (string)(dataReader.GetValue(dataReader.GetOrdinal("Address"))); }

                        UnidadNegocio.Add(curobjUN);
                    }
                    DataHallazgo.UnidadNegocio = UnidadNegocio;
                    log.LogInformation("DataHallazgo.UnidadNegocio");

                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        Sedes curobjS = new Sedes();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjS.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Sede"))) { curobjS.Sede = (string)(dataReader.GetValue(dataReader.GetOrdinal("Sede"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code"))) { curobjS.Code = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("UnidadNegocioId"))) { curobjS.UnidadNegocioId = (long)(dataReader.GetValue(dataReader.GetOrdinal("UnidadNegocioId"))); }

                        Sedes.Add(curobjS);
                    }
                    DataHallazgo.Sedes = Sedes;
                    log.LogInformation("DataHallazgo.Sedes");

                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        StatusHallazgos curobjSH = new StatusHallazgos();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjSH.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Description"))) { curobjSH.Description = (string)(dataReader.GetValue(dataReader.GetOrdinal("Description"))); }

                        StatusHallazgos.Add(curobjSH);
                    }
                    DataHallazgo.StatusHallazgos = StatusHallazgos;
                    log.LogInformation("DataHallazgo.StatusHallazgos");

                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        Areas curobjArea = new Areas();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjArea.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Description"))) { curobjArea.Description = (string)(dataReader.GetValue(dataReader.GetOrdinal("Description"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("UnidadNegocioId"))) { curobjArea.UnidadNegocioId = (long)(dataReader.GetValue(dataReader.GetOrdinal("UnidadNegocioId"))); }

                        Areas.Add(curobjArea);
                    }
                    DataHallazgo.Areas = Areas;
                    log.LogInformation("DataHallazgo.Areas");

                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        StatusAccionCorrectiva curobjSAC = new StatusAccionCorrectiva();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjSAC.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Description"))) { curobjSAC.Description = (string)(dataReader.GetValue(dataReader.GetOrdinal("Description"))); }

                        StatusAccionCorrectiva.Add(curobjSAC);
                    }
                    DataHallazgo.StatusAccionCorrectiva = StatusAccionCorrectiva;
                    log.LogInformation("DataHallazgo.StatusAccionCorrectiva");

                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        ColoresAnalisis curobjCA = new ColoresAnalisis();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjCA.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code"))) { curobjCA.Code = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code"))); }

                        ColoresAnalisis.Add(curobjCA);
                    }
                    DataHallazgo.ColoresAnalisis = ColoresAnalisis;
                    log.LogInformation("DataHallazgo.ColoresAnalisis");

                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        PlazoAccion curobjPlA = new PlazoAccion();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjPlA.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Description"))) { curobjPlA.Description = (string)(dataReader.GetValue(dataReader.GetOrdinal("Description"))); }

                        PlazoAccion.Add(curobjPlA);
                    }
                    DataHallazgo.PlazoAccion = PlazoAccion;
                    log.LogInformation("DataHallazgo.PlazoAccion");

                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        TipoAccion curobjTA = new TipoAccion();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjTA.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Description"))) { curobjTA.Description = (string)(dataReader.GetValue(dataReader.GetOrdinal("Description"))); }

                        TipoAccion.Add(curobjTA);
                    }
                    DataHallazgo.TipoAccion = TipoAccion;
                    log.LogInformation("DataHallazgo.TipoAccion");

                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        StatusAccion curobjSA = new StatusAccion();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjSA.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Description"))) { curobjSA.Description = (string)(dataReader.GetValue(dataReader.GetOrdinal("Description"))); }

                        StatusAccion.Add(curobjSA);
                    }
                    DataHallazgo.StatusAccion = StatusAccion;
                    log.LogInformation("DataHallazgo.StatusAccion");


                }

                if (conn.State == System.Data.ConnectionState.Open)
                    conn.Close();
            }
        }
        catch (Exception ex)
        {
            lobjs  = new List<HallazgosGet>();
            curobj = new HallazgosGet();
            curobj.Id = 0;
            curobj.Hallazgo = System.Convert.ToString(ex.Message);
            lobjs.Add(curobj);
            DataHallazgo.Hallazgos = lobjs;

        }

        return DataHallazgo;
    }
}

public class DataHallazgo
{
  public List<HallazgosGet> Hallazgos {get; set;}
  public List<Fuentes> Fuentes {get; set;}
  public List<TipoHallazgos> TipoHallazgos {get; set;}
  public List<Normas> Normas {get; set;}
  public List<UnidadNegocio> UnidadNegocio {get; set;}
  public List<Sedes> Sedes {get; set;}
  public List<StatusHallazgos> StatusHallazgos {get; set;}
  public List<Areas> Areas {get; set;}
  public List<StatusAccionCorrectiva> StatusAccionCorrectiva {get; set;}
  public List<ColoresAnalisis> ColoresAnalisis {get; set;}
  public List<PlazoAccion> PlazoAccion {get; set;}
  public List<TipoAccion> TipoAccion {get; set;}
  public List<StatusAccion> StatusAccion {get; set;}
}

public class HallazgosGet
{
    public long Id { get; set; }
    public long ProgramacionPlanId { get; set; }
    public long RequisitoId { get; set; }
    public string Requisito {get; set;}
    public string Code_Hallazgo {get; set;}
    public string Fuente {get; set;}
    public string TipoHallazgo {get; set;}
    public string Norma {get; set;}
    public string Sede {get; set;}
    public string FechaEjecucion {get; set;}
    public string FechaRegistro {get; set;}
    public string FechaEnvio {get; set;}
    public string StatusHallazgo {get; set;}
    public string StatusHallazgoCode {get; set;}
    public string StatusAccionCorrectiva {get; set;}
    public string StatusAccionCorrectivaCode {get; set;}
    public string UnidadNegocio {get; set;}
    public long NormaId { get; set; }
    public long SedeId { get; set; }
    public long FuenteId { get; set; }
    public long UnidadNegocioId { get; set; }
    public long TipoHallazgoId { get; set; }
    public long ResponsableId { get; set; }
    public long ReportanteId { get; set; }
    public long StatusHallazgoId { get; set; }
    public long StatusAccionCorrectivaId { get; set; }
    public long StatusEvaluacionAccionCorrectivaId {get;set;}
    public string ResponsableName {get; set;}
    public string ResponsableCargo {get; set;}
    public string ResponsableCorreo {get; set;}
    public string ResponsableUserHash {get; set;}
    public string ReportanteName {get; set;}
    public string ReportanteCargo {get; set;}
    public string ReportanteUserHash {get; set;}
    public string ReportanteCorreo {get; set;}
    public string Hallazgo {get; set;}
    public int Correlativo { get; set; }
    public string CodeHallazgo {get; set;}
    public string Hora {get; set;}
    public DateTime EjecucionDate {get; set;}
    public int AnalisisCausa { get; set; }
    public AccionCorrectiva AccionCorrectiva {get; set;}
}

public class AccionCorrectiva
{
    public long Id { get; set; }
    public long HallazgoId { get; set; }
    public long HACeroPerdidasId { get; set; }
    public string CeroPerdidas {get; set;}
    public string CeroPerdidasDescription {get; set;}
    public int UltimoNivel { get; set; }
    public string Que {get; set;}
    public string Donde {get; set;}
    public string Cuando {get; set;}
    public string Como {get; set;}
    public string Cual {get; set;}
    public string Problema {get; set;}
    public long AreaId { get; set; }
    public int Flag_Definido { get; set; }
    public int Flag_Completado { get; set; }
    public bool? Deleted { get; set; }
    public DateTime FechaInicio {get; set;}
    public string FechaInicioAnalisis {get; set;}
    public string FechaFinAnalisis {get; set;}
    public string AreaDescription {get; set;}
    public List<AnalisisProblema> AnalisisProblema {get; set;}
    public List<PlanAccion> PlanAccion {get;set;}
    public List<IntegrantesAnalisis> IntegrantesAnalisis {get;set;}
    public List<AnalisisMedidasCeroFallas> AnalisisMedidasCeroFallas {get;set;}
    public List<EnvioACR> EnvioACR {get;set;}
    public List<EvaluarACR> EvaluarACR {get;set;}
}

public class AnalisisMedidasCeroFallas
{
    public long Id { get; set; }
    public long HAMedidasCeroFallasId { get; set; }
    public long HAAnalisisProblemasId { get; set; }
    public long HAAccionCorrectivaId { get; set; }
}

public class IntegrantesAnalisis
{
    public long Id { get; set; }
    public long HAAccionCorrectivaId { get; set; }
    public string UserHash {get; set;}
    public string Name {get; set;}
    public string Email {get; set;}
    public string Cargo {get; set;}
}

public class AnalisisProblema
{
    public long Id { get; set; }
    public long HAAccionCorrectivaId { get; set; }
    public long HAAnalisisProblemasId { get; set; }
    public string Pregunta {get; set;}
    public string Respuesta {get; set;}
    public int Nivel {get; set;}
    public long HAColoresAnalisisId { get; set; }
    public string Code {get; set;}
    public bool? Deleted { get; set; }
}

public class PlanAccion
{
    public long Id { get; set; }
    public long HAAccionCorrectivaId { get; set; }
    public long HAAnalisisProblemaId { get; set; }
    public long HAPlazoAccionId { get; set; }
    public long HATipoAccionId { get; set; }
    public long HAStatusAccionId { get; set; }
    public string Fecha { get; set; }
    public DateTime Fecha2 { get; set; }
    public string Responsable { get; set; }
    public string UserHash { get; set; }
    public string Cargo { get; set; }
    public string Correo { get; set; }
    public string Accion { get; set; }
    public long HAAccionesId { get; set; }
}

public class Fuentes
{
    public long Id {get;set;}
    public string Fuente {get;set;}
}

public class TipoHallazgos
{
    public long Id {get;set;}
    public string TipoHallazgo {get;set;}
    public string Code {get;set;}
}

public class Normas
{
    public long Id {get;set;}
    public string Norma {get;set;}
    public string Description {get;set;}
}

public class UnidadNegocio
{
    public long Id {get;set;}
    public string UnidadNegocioDescription {get;set;}
    public string Code {get;set;}
    public string Address {get;set;}
}

public class Sedes
{
    public long Id {get;set;}
    public string Sede {get;set;}
    public string Code {get;set;}
    public long UnidadNegocioId {get;set;}
}

public class StatusHallazgos
{
    public long Id {get;set;}
    public string Description {get;set;}
}

public class Areas
{
    public long Id {get;set;}
    public string Description {get;set;}
    public long UnidadNegocioId {get;set;}
}

public class StatusAccionCorrectiva
{
    public long Id {get;set;}
    public string Description {get;set;}
}

public class ColoresAnalisis
{
    public long Id {get;set;}
    public string Code {get;set;}
}

public class PlazoAccion
{
    public long Id {get;set;}
    public string Description {get;set;}
}

public class TipoAccion
{
    public long Id {get;set;}
    public string Description {get;set;}
}

public class StatusAccion
{
    public long Id {get;set;}
    public string Description {get;set;}
}

public class EnvioACR
{
    public long Id {get;set;}
    public long HAAccionCorrectivaId {get;set;}
    public string Name {get; set;}
    public string UserHash {get; set;}
    public string Correo {get; set;}
    public string Cargo {get; set;}
    public bool? Deleted {get; set;}
}

public class EvaluarACR
{
    public long Id {get;set;}
    public long HAAccionCorrectivaId {get;set;}
    public long StatusAccionCorrectivaId {get;set;}
    public long HallazgoId {get;set;}
    public int Active {get;set;}
    public string EvaluadorCargo {get; set;}
    public string EvaluadorCorreo {get; set;}
    public string EvaluadorName {get; set;}
    public string EvaluadorUserHash {get; set;}
    public string Observacion {get; set;}
    public string FechaEvaluacion {get; set;}
}