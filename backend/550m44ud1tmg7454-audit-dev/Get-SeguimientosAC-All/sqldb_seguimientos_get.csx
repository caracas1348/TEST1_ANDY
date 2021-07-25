using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataSeguimientosGet
{
    string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);

    public async Task<DataSeguimientos> funGetSeguimientosAllList( ILogger log
                                                            , long Id
                                                            , long TipoHallazgoId
                                                            , long NormaId
                                                            , long SedeId
                                                            , long StatusPACId
                                                            , string FechaInicio
                                                            , string FechaFin
                                                            , string ResponsableUserHash
                                                            )
    {
        //Lista de Objetos
        DataSeguimientos DataSeguimientos = new DataSeguimientos();
        //Listado de objetos de Hallazgos
        List<SeguimientosGet> lobjs  = new List<SeguimientosGet>();
        //Listado de objetos de TipoHallazgos
        List<TipoHallazgos> TipoHallazgos  = new List<TipoHallazgos>();
        //Listado de objetos de Normas
        List<Normas> Normas  = new List<Normas>();
        //Listado de objetos de Sedes
        List<Sedes> Sedes  = new List<Sedes>();
        //Listado de objetos de StatusPAC
        List<StatusPAC> StatusPAC  = new List<StatusPAC>();
        //Listado de objetos de Acciones
        List<Acciones> Acciones  = new List<Acciones>();
        //Listado de objetos de EvidenciasWeb
        List<EvidenciasWeb> EvidenciasWeb  = new List<EvidenciasWeb>();
        //Listado de objetos de Reprogramaciones
        List<Reprogramaciones> Reprogramaciones  = new List<Reprogramaciones>();
        //Objeto de Seguimientos
        SeguimientosGet curobj;
        //Console.WriteLine("Prueba a ver si sale en la consola del azure:");
        log.LogInformation("en la funcion funGetSeguimientosAllList ");
        //SQL Objects
        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                log.LogInformation("ResponsableUserHash "+ResponsableUserHash);
                conn.Open();

                SqlCommand cmd = new SqlCommand("[auditoria].[get_seguimientos]", conn);

                cmd.Parameters.AddWithValue("@Id", Id);
                cmd.Parameters.AddWithValue("@TipoHallazgoId", TipoHallazgoId);
                cmd.Parameters.AddWithValue("@NormaId", NormaId);
                cmd.Parameters.AddWithValue("@SedeId", SedeId);
                cmd.Parameters.AddWithValue("@StatusPACId", StatusPACId);
                cmd.Parameters.AddWithValue("@ResponsableUserHash", ResponsableUserHash);
                cmd.Parameters.AddWithValue("@FechaInicio", FechaInicio);
                cmd.Parameters.AddWithValue("@FechaFin", FechaFin);

                cmd.CommandType = CommandType.StoredProcedure;
                log.LogInformation("antes de dataReader ");
                //Ejecutar Comando buscaremos los hallazgos registrados
                using (SqlDataReader dataReader = await cmd.ExecuteReaderAsync())
                {
                    //Navegar en el Conjunto de Datos Recuperados
                    while (dataReader.Read())
                    {
                        curobj = new SeguimientosGet();
                        log.LogInformation("despues de curobj = new SeguimientosGet() ");
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("HallazgoId"))) { curobj.HallazgoId                                               = (long)(dataReader.GetValue(dataReader.GetOrdinal("HallazgoId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code_Hallazgo"))) { curobj.CodeHallazgo                                          = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code_Hallazgo"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("TipoHallazgo"))) { curobj.TipoHallazgo                                           = (string)(dataReader.GetValue(dataReader.GetOrdinal("TipoHallazgo"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Norma"))) { curobj.Norma                                                         = (string)(dataReader.GetValue(dataReader.GetOrdinal("Norma"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Sede"))) { curobj.Sede                                                           = (string)(dataReader.GetValue(dataReader.GetOrdinal("Sede"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("FechaProximoVencimiento"))) { curobj.FechaProximoVencimiento                     = (DateTime)(dataReader.GetValue(dataReader.GetOrdinal("FechaProximoVencimiento"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("FechaProximoVencimientoModificada"))) { curobj.FechaProximoVencimientoModificada = (string)(dataReader.GetValue(dataReader.GetOrdinal("FechaProximoVencimientoModificada"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("StatusPAC"))) { curobj.StatusPAC                                                 = (string)(dataReader.GetValue(dataReader.GetOrdinal("StatusPAC"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Dias"))) { curobj.Dias                                                           = (int)(dataReader.GetValue(dataReader.GetOrdinal("Dias"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("TipoHallazgoId"))) { curobj.TipoHallazgoId                                       = (long)(dataReader.GetValue(dataReader.GetOrdinal("TipoHallazgoId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("NormaId"))) { curobj.NormaId                                                     = (long)(dataReader.GetValue(dataReader.GetOrdinal("NormaId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("AccionCorrectivaId"))) { curobj.AccionCorrectivaId                               = (long)(dataReader.GetValue(dataReader.GetOrdinal("AccionCorrectivaId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("SedeId"))) { curobj.SedeId                                                       = (long)(dataReader.GetValue(dataReader.GetOrdinal("SedeId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("SEStatusPACId"))) { curobj.SEStatusPACId                                         = (long)(dataReader.GetValue(dataReader.GetOrdinal("SEStatusPACId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Hallazgo"))) { curobj.Hallazgo                                                   = (string)(dataReader.GetValue(dataReader.GetOrdinal("Hallazgo"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Problema"))) { curobj.Problema                                                   = (string)(dataReader.GetValue(dataReader.GetOrdinal("Problema"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("StatusPACCode"))) { curobj.StatusPACCode                                         = (string)(dataReader.GetValue(dataReader.GetOrdinal("StatusPACCode"))); }

                        //aqui procedemos a buscar los planes acciones a ejecutar
                        using (SqlConnection conn2 = new SqlConnection(vvsqlconnectionString))
                        {
                            conn2.Open();

                            log.LogInformation("[auditoria].[get_pac] "+curobj.AccionCorrectivaId);
                            SqlCommand cmd2 = new SqlCommand("[auditoria].[get_pac]", conn2);
                            //cmd2.Parameters.Clear();
                            cmd2.Parameters.AddWithValue("@AccionCorrectivaId", curobj.AccionCorrectivaId);
                            cmd2.CommandType = CommandType.StoredProcedure;
                            using (SqlDataReader dr = await cmd2.ExecuteReaderAsync())
                            {
                                Acciones  = new List<Acciones>();
                                //Navegar en el Conjunto de Datos Recuperados
                                while (dr.Read())
                                {

                                    Acciones curobjAcc = new Acciones();
                                    if (!dr.IsDBNull(dr.GetOrdinal("Id"))) { curobjAcc.Id = (long)(dr.GetValue(dr.GetOrdinal("Id"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("HAAnalisisProblemaId"))) { curobjAcc.HAAnalisisProblemaId = (long)(dr.GetValue(dr.GetOrdinal("HAAnalisisProblemaId"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("HAPlazoAccionId"))) { curobjAcc.HAPlazoAccionId = (long)(dr.GetValue(dr.GetOrdinal("HAPlazoAccionId"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("HATipoAccionId"))) { curobjAcc.HATipoAccionId = (long)(dr.GetValue(dr.GetOrdinal("HATipoAccionId"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("HAStatusAccionId"))) { curobjAcc.HAStatusAccionId = (long)(dr.GetValue(dr.GetOrdinal("HAStatusAccionId"))); }


                                    if (!dr.IsDBNull(dr.GetOrdinal("PlazoAccion"))) { curobjAcc.PlazoAccion = (string)(dr.GetValue(dr.GetOrdinal("PlazoAccion"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("TipoAccion"))) { curobjAcc.TipoAccion = (string)(dr.GetValue(dr.GetOrdinal("TipoAccion"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("StatusAccion"))) { curobjAcc.StatusAccion = (string)(dr.GetValue(dr.GetOrdinal("StatusAccion"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("FechaFormato"))) { curobjAcc.FechaFormato = (string)(dr.GetValue(dr.GetOrdinal("FechaFormato"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("Responsable"))) { curobjAcc.Responsable = (string)(dr.GetValue(dr.GetOrdinal("Responsable"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("UserHash"))) { curobjAcc.UserHash = (string)(dr.GetValue(dr.GetOrdinal("UserHash"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("Cargo"))) { curobjAcc.Cargo = (string)(dr.GetValue(dr.GetOrdinal("Cargo"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("Correo"))) { curobjAcc.Correo = (string)(dr.GetValue(dr.GetOrdinal("Correo"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("Accion"))) { curobjAcc.Accion = (string)(dr.GetValue(dr.GetOrdinal("Accion"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("Respuesta"))) { curobjAcc.Respuesta = (string)(dr.GetValue(dr.GetOrdinal("Respuesta"))); }

                                    if (!dr.IsDBNull(dr.GetOrdinal("Item"))) { curobjAcc.Item = (int)(dr.GetValue(dr.GetOrdinal("Item"))); }

                                    if (!dr.IsDBNull(dr.GetOrdinal("Fecha"))) { curobjAcc.Fecha = (DateTime)(dr.GetValue(dr.GetOrdinal("Fecha"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("Created_Date"))) { curobjAcc.Created_Date = (DateTime)(dr.GetValue(dr.GetOrdinal("Created_Date"))); }

                                    ////////////////////////////////////// EvidenciasWeb  = new List<EvidenciasWeb>();
                                    //aqui procedemos a buscar los planes acciones a ejecutar
                                    using (SqlConnection conn3 = new SqlConnection(vvsqlconnectionString))
                                    {
                                        conn3.Open();

                                        log.LogInformation("[auditoria].[get_evidencias_pac] "+curobjAcc.Id);
                                        SqlCommand cmd3 = new SqlCommand("[auditoria].[get_evidencias_pac]", conn3);
                                        //cmd3.Parameters.Clear();
                                        cmd3.Parameters.AddWithValue("@PlanAccionesId", curobjAcc.Id);
                                        cmd3.CommandType = CommandType.StoredProcedure;
                                        using (SqlDataReader dr3 = await cmd3.ExecuteReaderAsync())
                                        {
                                            EvidenciasWeb  = new List<EvidenciasWeb>();
                                            //Navegar en el Conjunto de Datos Recuperados
                                            while (dr3.Read())
                                            {

                                                EvidenciasWeb curobjEvidenciasWeb = new EvidenciasWeb();

                                                if (!dr3.IsDBNull(dr3.GetOrdinal("Id"))) { curobjEvidenciasWeb.Id = (long)(dr3.GetValue(dr3.GetOrdinal("Id"))); }
                                                log.LogInformation("curobjEvidenciasWeb.Id "+curobjEvidenciasWeb.Id);
                                                if (!dr3.IsDBNull(dr3.GetOrdinal("HAPlanAccionesId"))) { curobjEvidenciasWeb.HAPlanAccionesId = (long)(dr3.GetValue(dr3.GetOrdinal("HAPlanAccionesId"))); }
                                                log.LogInformation("curobjEvidenciasWeb.HAPlanAccionesId "+curobjEvidenciasWeb.HAPlanAccionesId);
                                                if (!dr3.IsDBNull(dr3.GetOrdinal("SEStatusEvidenciasId"))) { curobjEvidenciasWeb.SEStatusEvidenciasId = (long)(dr3.GetValue(dr3.GetOrdinal("SEStatusEvidenciasId"))); }
                                                log.LogInformation("curobjEvidenciasWeb.SEStatusEvidenciasId "+curobjEvidenciasWeb.SEStatusEvidenciasId);
                                                if (!dr3.IsDBNull(dr3.GetOrdinal("SEStatusEvaluacionLocalId"))) { curobjEvidenciasWeb.SEStatusEvaluacionLocalId = (long)(dr3.GetValue(dr3.GetOrdinal("SEStatusEvaluacionLocalId"))); }
                                                if (!dr3.IsDBNull(dr3.GetOrdinal("SEStatusEvaluacionCorporativaId"))) { curobjEvidenciasWeb.SEStatusEvaluacionCorporativaId = (long)(dr3.GetValue(dr3.GetOrdinal("SEStatusEvaluacionCorporativaId"))); }
                                                if (!dr3.IsDBNull(dr3.GetOrdinal("SEEvidenciasAdjuntosId"))) { curobjEvidenciasWeb.SEEvidenciasAdjuntosId = (long)(dr3.GetValue(dr3.GetOrdinal("SEEvidenciasAdjuntosId"))); }
                                                if (!dr3.IsDBNull(dr3.GetOrdinal("StatusEvidencia"))) { curobjEvidenciasWeb.StatusEvidencia = (string)(dr3.GetValue(dr3.GetOrdinal("StatusEvidencia"))); }
                                                if (!dr3.IsDBNull(dr3.GetOrdinal("StatusEvidenciaCode"))) { curobjEvidenciasWeb.StatusEvidenciaCode = (string)(dr3.GetValue(dr3.GetOrdinal("StatusEvidenciaCode"))); }
                                                if (!dr3.IsDBNull(dr3.GetOrdinal("StatusEvaluacionLocal"))) { curobjEvidenciasWeb.StatusEvaluacionLocal = (string)(dr3.GetValue(dr3.GetOrdinal("StatusEvaluacionLocal"))); }
                                                log.LogInformation("curobjEvidenciasWeb.StatusEvaluacionLocal "+curobjEvidenciasWeb.StatusEvaluacionLocal);
                                                if (!dr3.IsDBNull(dr3.GetOrdinal("StatusEvaluacionLocalCode"))) { curobjEvidenciasWeb.StatusEvaluacionLocalCode = (string)(dr3.GetValue(dr3.GetOrdinal("StatusEvaluacionLocalCode"))); }
                                                if (!dr3.IsDBNull(dr3.GetOrdinal("StatusEvaluacionCorporativa"))) { curobjEvidenciasWeb.StatusEvaluacionCorporativa = (string)(dr3.GetValue(dr3.GetOrdinal("StatusEvaluacionCorporativa"))); }
                                                if (!dr3.IsDBNull(dr3.GetOrdinal("StatusEvaluacionCorporativaCode"))) { curobjEvidenciasWeb.StatusEvaluacionCorporativaCode = (string)(dr3.GetValue(dr3.GetOrdinal("StatusEvaluacionCorporativaCode"))); }
                                                if (!dr3.IsDBNull(dr3.GetOrdinal("FechaAtencion"))) { curobjEvidenciasWeb.FechaAtencion = (string)(dr3.GetValue(dr3.GetOrdinal("FechaAtencion"))); }
                                                if (!dr3.IsDBNull(dr3.GetOrdinal("AdjuntoName"))) { curobjEvidenciasWeb.AdjuntoName = (string)(dr3.GetValue(dr3.GetOrdinal("AdjuntoName"))); }
                                                if (!dr3.IsDBNull(dr3.GetOrdinal("Detalle"))) { curobjEvidenciasWeb.Detalle = (string)(dr3.GetValue(dr3.GetOrdinal("Detalle"))); }
                                                if (!dr3.IsDBNull(dr3.GetOrdinal("DetalleEvaluacionCorporativa"))) { curobjEvidenciasWeb.DetalleEvaluacionCorporativa = (string)(dr3.GetValue(dr3.GetOrdinal("DetalleEvaluacionCorporativa"))); }
                                                if (!dr3.IsDBNull(dr3.GetOrdinal("Created_Date"))) { curobjEvidenciasWeb.Created_Date = (DateTime)(dr3.GetValue(dr3.GetOrdinal("Created_Date"))); }
                                                log.LogInformation("curobjEvidenciasWeb.Created_Date "+curobjEvidenciasWeb.Created_Date);

                                                EvidenciasWeb.Add(curobjEvidenciasWeb);
                                            }
                                        }
                                        curobjAcc.EvidenciasWeb = EvidenciasWeb;

                                        if (conn3.State == System.Data.ConnectionState.Open)
                                            conn3.Close();
                                    }
                                    ////////////////////////////////////// EvidenciasWeb  = new List<EvidenciasWeb>();

                                    ////////////////////////////////// REPROGRAMACIONES ///////////////////////////////
                                    using (SqlConnection conn4 = new SqlConnection(vvsqlconnectionString))
                                    {
                                        conn4.Open();

                                        log.LogInformation("[auditoria].[get_se_reprogramaciones] "+curobjAcc.Id);
                                        SqlCommand cmd4 = new SqlCommand("[auditoria].[get_se_reprogramaciones]", conn4);

                                        cmd4.Parameters.AddWithValue("@HAPlanAccionesId", curobjAcc.Id);
                                        cmd4.CommandType = CommandType.StoredProcedure;
                                        using (SqlDataReader dr4 = await cmd4.ExecuteReaderAsync())
                                        {
                                            Reprogramaciones  = new List<Reprogramaciones>();
                                            //Navegar en el Conjunto de Datos Recuperados
                                            while (dr4.Read())
                                            {

                                                Reprogramaciones curobjReprogramaciones = new Reprogramaciones();

                                                if (!dr4.IsDBNull(dr4.GetOrdinal("Id"))) { curobjReprogramaciones.Id = (long)(dr4.GetValue(dr4.GetOrdinal("Id"))); }
                                                if (!dr4.IsDBNull(dr4.GetOrdinal("HAPlanAccionesId"))) { curobjReprogramaciones.HAPlanAccionesId = (long)(dr4.GetValue(dr4.GetOrdinal("HAPlanAccionesId"))); }
                                                if (!dr4.IsDBNull(dr4.GetOrdinal("Motivo"))) { curobjReprogramaciones.Motivo = (string)(dr4.GetValue(dr4.GetOrdinal("Motivo"))); }
                                                if (!dr4.IsDBNull(dr4.GetOrdinal("FechaNueva"))) { curobjReprogramaciones.FechaNueva = (string)(dr4.GetValue(dr4.GetOrdinal("FechaNueva"))); }
                                                if (!dr4.IsDBNull(dr4.GetOrdinal("FechaAnterior"))) { curobjReprogramaciones.FechaAnterior = (string)(dr4.GetValue(dr4.GetOrdinal("FechaAnterior"))); }
                                                if (!dr4.IsDBNull(dr4.GetOrdinal("FechaCambio"))) { curobjReprogramaciones.FechaCambio = (string)(dr4.GetValue(dr4.GetOrdinal("FechaCambio"))); }
                                                if (!dr4.IsDBNull(dr4.GetOrdinal("Name"))) { curobjReprogramaciones.Name = (string)(dr4.GetValue(dr4.GetOrdinal("Name"))); }

                                                Reprogramaciones.Add(curobjReprogramaciones);
                                            }

                                            curobjAcc.Reprogramaciones = Reprogramaciones;

                                            if (conn4.State == System.Data.ConnectionState.Open)
                                                conn4.Close();

                                        }
                                    }
                                    ////////////////////////////////// REPROGRAMACIONES ///////////////////////////////

                                    Acciones.Add(curobjAcc);

                                }


                                if (conn2.State == System.Data.ConnectionState.Open)
                                    conn2.Close();
                            }
                            curobj.Acciones = Acciones;
                            log.LogInformation("curobj.Acciones");

                        }

                        lobjs.Add(curobj);

                    }
                    DataSeguimientos.Seguimientos = lobjs;
                    log.LogInformation("DataSeguimientos.Seguimientos");

                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        TipoHallazgos curobjTH = new TipoHallazgos();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjTH.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("TipoHallazgo"))) { curobjTH.TipoHallazgo = (string)(dataReader.GetValue(dataReader.GetOrdinal("TipoHallazgo"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code"))) { curobjTH.Code = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code"))); }

                        TipoHallazgos.Add(curobjTH);
                    }
                    DataSeguimientos.TipoHallazgos = TipoHallazgos;
                    log.LogInformation("DataSeguimientos.TipoHallazgos");

                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        Normas curobjN = new Normas();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjN.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Norma"))) { curobjN.Norma = (string)(dataReader.GetValue(dataReader.GetOrdinal("Norma"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Description"))) { curobjN.Description = (string)(dataReader.GetValue(dataReader.GetOrdinal("Description"))); }

                        Normas.Add(curobjN);
                    }
                    DataSeguimientos.Normas = Normas;
                    log.LogInformation("DataSeguimientos.Normas");

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
                    DataSeguimientos.Sedes = Sedes;
                    log.LogInformation("DataSeguimientos.Sedes");


                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        StatusPAC curobjSPAC = new StatusPAC();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjSPAC.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Description"))) { curobjSPAC.Description = (string)(dataReader.GetValue(dataReader.GetOrdinal("Description"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code"))) { curobjSPAC.Code = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code"))); }

                        StatusPAC.Add(curobjSPAC);
                    }
                    DataSeguimientos.StatusPAC = StatusPAC;
                    log.LogInformation("DataSeguimientos.StatusPAC");


                }

                if (conn.State == System.Data.ConnectionState.Open)
                    conn.Close();
            }
        }
        catch (Exception ex)
        {
            lobjs             = new List<SeguimientosGet>();
            curobj            = new SeguimientosGet();
            curobj.HallazgoId = 0;
            curobj.Hallazgo   = System.Convert.ToString(ex.Message);
            lobjs.Add(curobj);
            DataSeguimientos.Seguimientos = lobjs;

        }

        return DataSeguimientos;
    }

    //AccionesApp
    public async Task<List<AccionesApp>> funGetAccionesAppList( ILogger log
                                                            , string ResponsableUserHash
                                                            )
    {
    	log.LogInformation("en la funcion funGetAccionesAppList ");
    	// Listado de objetos de Acciones
        List<AccionesApp> lobjs  = new List<AccionesApp>();
        // objeto de Acciones
        AccionesApp curobj;
        // Listado de Evidencias
        List<Evidencias> Evidencias = new List<Evidencias>();
        // Objeto de Evidencias
        Evidencias objEvidencias;

        //SQL Objects
        try
        {
        	using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                log.LogInformation("ResponsableUserHash "+ResponsableUserHash);
                conn.Open();

                SqlCommand cmd = new SqlCommand("[auditoria].[get_app_acciones_asignadas]", conn);

				cmd.Parameters.AddWithValue("@ResponsableUserHash", ResponsableUserHash);

				cmd.CommandType = CommandType.StoredProcedure;
                log.LogInformation("antes de dataReader ");
                //Ejecutar Comando buscaremos los hallazgos registrados
                using (SqlDataReader dataReader = await cmd.ExecuteReaderAsync())
                {
                    //Navegar en el Conjunto de Datos Recuperados
                    while (dataReader.Read())
                    {
                        curobj = new AccionesApp();
                        log.LogInformation("despues de curobj = new AccionesApp() ");
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobj.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Item"))) { curobj.Item = (int)(dataReader.GetValue(dataReader.GetOrdinal("Item"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("NormaCode"))) { curobj.NormaCode = (string)(dataReader.GetValue(dataReader.GetOrdinal("NormaCode"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("TipoHallazgoCode"))) { curobj.TipoHallazgoCode = (string)(dataReader.GetValue(dataReader.GetOrdinal("TipoHallazgoCode"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code_Hallazgo"))) { curobj.Code_Hallazgo = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code_Hallazgo"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("StatusAccion"))) { curobj.StatusAccion = (string)(dataReader.GetValue(dataReader.GetOrdinal("StatusAccion"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("HAAnalisisProblemaId"))) { curobj.HAAnalisisProblemaId = (long)(dataReader.GetValue(dataReader.GetOrdinal("HAAnalisisProblemaId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("HAPlazoAccionId"))) { curobj.HAPlazoAccionId = (long)(dataReader.GetValue(dataReader.GetOrdinal("HAPlazoAccionId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("HATipoAccionId"))) { curobj.HATipoAccionId = (long)(dataReader.GetValue(dataReader.GetOrdinal("HATipoAccionId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("HAStatusAccionId"))) { curobj.HAStatusAccionId = (long)(dataReader.GetValue(dataReader.GetOrdinal("HAStatusAccionId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Fecha"))) { curobj.Fecha = (DateTime)(dataReader.GetValue(dataReader.GetOrdinal("Fecha"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("FechaF"))) { curobj.FechaF = (string)(dataReader.GetValue(dataReader.GetOrdinal("FechaF"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Responsable"))) { curobj.Responsable = (string)(dataReader.GetValue(dataReader.GetOrdinal("Responsable"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("UserHash"))) { curobj.UserHash = (string)(dataReader.GetValue(dataReader.GetOrdinal("UserHash"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("HAAccionCorrectivaId"))) { curobj.HAAccionCorrectivaId = (long)(dataReader.GetValue(dataReader.GetOrdinal("HAAccionCorrectivaId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Accion"))) { curobj.Accion = (string)(dataReader.GetValue(dataReader.GetOrdinal("Accion"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("HallazgoId"))) { curobj.HallazgoId = (long)(dataReader.GetValue(dataReader.GetOrdinal("HallazgoId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Problema"))) { curobj.Problema = (string)(dataReader.GetValue(dataReader.GetOrdinal("Problema"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("AreaId"))) { curobj.AreaId = (long)(dataReader.GetValue(dataReader.GetOrdinal("AreaId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("TipoHallazgoId"))) { curobj.TipoHallazgoId = (long)(dataReader.GetValue(dataReader.GetOrdinal("TipoHallazgoId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("NormaId"))) { curobj.NormaId = (long)(dataReader.GetValue(dataReader.GetOrdinal("NormaId"))); }

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Norma"))) { curobj.Norma = (string)(dataReader.GetValue(dataReader.GetOrdinal("Norma"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("TipoHallazgo"))) { curobj.TipoHallazgo = (string)(dataReader.GetValue(dataReader.GetOrdinal("TipoHallazgo"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Hallazgo"))) { curobj.Hallazgo = (string)(dataReader.GetValue(dataReader.GetOrdinal("Hallazgo"))); }

                        using (SqlConnection conn2 = new SqlConnection(vvsqlconnectionString))
                        {
                            conn2.Open();
                            log.LogInformation("[auditoria].[get_adjuntos_evidencias_list] ");

                            Evidencias = new List<Evidencias>();

                            SqlCommand cmd2 = new SqlCommand("[auditoria].[get_adjuntos_evidencias_list]", conn2);
                            //cmd2.Parameters.Clear();
                            cmd2.Parameters.AddWithValue("@HAPlanAccionesId", curobj.Id);
                            cmd2.CommandType = CommandType.StoredProcedure;

                            using (SqlDataReader dr = await cmd2.ExecuteReaderAsync())
                            {
                                //Navegar en el Conjunto de Datos Recuperados
                                while (dr.Read())
                                {
                                    objEvidencias = new Evidencias();
                                    if (!dr.IsDBNull(dr.GetOrdinal("Id"))) { objEvidencias.Id                                     = (long)(dr.GetValue(dr.GetOrdinal("Id"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("SEEvidenciasId"))) { objEvidencias.SEEvidenciasId             = (long)(dr.GetValue(dr.GetOrdinal("SEEvidenciasId"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("Name"))) { objEvidencias.Name                                 = (string)(dr.GetValue(dr.GetOrdinal("Name"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("HAPlanAccionesId"))) { objEvidencias.HAPlanAccionesId         = (long)(dr.GetValue(dr.GetOrdinal("HAPlanAccionesId"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("StatusEvidencia"))) { objEvidencias.StatusEvidencia           = (string)(dr.GetValue(dr.GetOrdinal("StatusEvidencia"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("StatusEvidenciaColor"))) { objEvidencias.StatusEvidenciaColor = (string)(dr.GetValue(dr.GetOrdinal("StatusEvidenciaColor"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("FechaSubido"))) { objEvidencias.FechaSubido                   = (string)(dr.GetValue(dr.GetOrdinal("FechaSubido"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("Detalle"))) { objEvidencias.Detalle                           = (string)(dr.GetValue(dr.GetOrdinal("Detalle"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("StatusEvidenciaId"))) { objEvidencias.StatusEvidenciaId       = (long)(dr.GetValue(dr.GetOrdinal("StatusEvidenciaId"))); }

                                    log.LogInformation("[objEvidencias.Id] "+objEvidencias.Id);
                                    Evidencias.Add(objEvidencias);
                                }

                                curobj.Evidencias = Evidencias;

                            }

                            if (conn2.State == System.Data.ConnectionState.Open)
                                conn2.Close();
                        }


                        lobjs.Add(curobj);

                    }
                    log.LogInformation("lobjs.Add(curobj);");
				}


                if (conn.State == System.Data.ConnectionState.Open)
                	conn.Close();
            }
		}
        catch (Exception ex)
        {
            lobjs           = new List<AccionesApp>();
            curobj          = new AccionesApp();
            curobj.Id 		= 0;
            curobj.Accion   = System.Convert.ToString(ex.Message);
            lobjs.Add(curobj);

        }

        return lobjs;
    }

    // get Evidencia
    public async Task<Evidencias> funGetEvidenciaById(ILogger log, long Id)
    {
        log.LogInformation("en funGetEvidenciaById "+ Id);

        // objeto de evidencias
        Evidencias Evidencias = new Evidencias();

        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {

                conn.Open();

                SqlCommand cmd = new SqlCommand("[auditoria].[get_adjuntos_evidencias]", conn);

                cmd.Parameters.AddWithValue("@Id", Id);

                cmd.CommandType = CommandType.StoredProcedure;
                log.LogInformation("antes de dataReader ");
                //Ejecutar Comando buscaremos los hallazgos registrados
                using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                {
                    //Navegar en el Conjunto de Datos Recuperados
                    while (dr.Read())
                    {
                        if (!dr.IsDBNull(dr.GetOrdinal("Id"))) { Evidencias.Id                         = (long)(dr.GetValue(dr.GetOrdinal("Id"))); }
                        if (!dr.IsDBNull(dr.GetOrdinal("SEEvidenciasId"))) { Evidencias.SEEvidenciasId = (long)(dr.GetValue(dr.GetOrdinal("SEEvidenciasId"))); }
                        if (!dr.IsDBNull(dr.GetOrdinal("Name"))) { Evidencias.Name                     = (string)(dr.GetValue(dr.GetOrdinal("Name"))); }
                        if (!dr.IsDBNull(dr.GetOrdinal("Adjunto"))) { Evidencias.Adjunto               = (string)(dr.GetValue(dr.GetOrdinal("Adjunto"))); }
                    }
                }

                if (conn.State == System.Data.ConnectionState.Open)
                    conn.Close();
            }
        }
        catch (Exception ex)
        {
            log.LogInformation("catch (Exception ex) " + System.Convert.ToString(ex.Message));
            Evidencias = new Evidencias();
            Evidencias.Id = 0;
            Evidencias.Adjunto = System.Convert.ToString(ex.Message);
        }

        return Evidencias;
    }

    // get Adjunto Reprogramacion por Id de la Reprogramacion funGetAdjuntoReprogramacionByReprogramacionId
    public async Task<AdjuntoReprogramacion> funGetAdjuntoReprogramacionByReprogramacionId(ILogger log, long Id)
    {
        log.LogInformation("en funGetAdjuntoReprogramacionByReprogramacionId "+ Id);

        // objeto de evidencias
        AdjuntoReprogramacion AdjuntoReprogramacion = new AdjuntoReprogramacion();

        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();

                SqlCommand cmd = new SqlCommand("[auditoria].[get_se_adjunto_reprogramacion]", conn);

                cmd.Parameters.AddWithValue("@SEReprogramacionesId", Id);

                cmd.CommandType = CommandType.StoredProcedure;

                log.LogInformation("antes de dataReader ");
                //Ejecutar Comando buscaremos los hallazgos registrados
                using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                {
                    //Navegar en el Conjunto de Datos Recuperados
                    while (dr.Read())
                    {
                        if (!dr.IsDBNull(dr.GetOrdinal("Id"))) { AdjuntoReprogramacion.Id                         = (long)(dr.GetValue(dr.GetOrdinal("Id"))); }
                        if (!dr.IsDBNull(dr.GetOrdinal("SEReprogramacionesId"))) { AdjuntoReprogramacion.SEReprogramacionesId = (long)(dr.GetValue(dr.GetOrdinal("SEReprogramacionesId"))); }
                        if (!dr.IsDBNull(dr.GetOrdinal("Name"))) { AdjuntoReprogramacion.Name                     = (string)(dr.GetValue(dr.GetOrdinal("Name"))); }
                        if (!dr.IsDBNull(dr.GetOrdinal("Adjunto"))) { AdjuntoReprogramacion.Adjunto               = (string)(dr.GetValue(dr.GetOrdinal("Adjunto"))); }
                    }
                }

                if (conn.State == System.Data.ConnectionState.Open)
                    conn.Close();
            }
        }
        catch (Exception ex)
        {
            log.LogInformation("catch (Exception ex) " + System.Convert.ToString(ex.Message));
            AdjuntoReprogramacion = new AdjuntoReprogramacion();
            AdjuntoReprogramacion.Id = 0;
            AdjuntoReprogramacion.Adjunto = System.Convert.ToString(ex.Message);
        }

        return AdjuntoReprogramacion;
    }

    /**
     * buscar los las acciones vencidas para cambiar el statusPACId en la tabla HA_ACCIONES_CORRECTIVAS
     */
    public async Task<List<SeguimientosGet>> funGetSeguimientosExpiredAll(ILogger log)
    {
        log.LogInformation("en funGetSeguimientosExpiredAll ");

        // LISTADO DE SEGUIMIENTOS
        List<SeguimientosGet> lobjs = new List<SeguimientosGet>();
        SeguimientosGet curobj        = new SeguimientosGet();

        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                log.LogInformation("en using (SqlConnection conn = new SqlConnection(vvsqlconnectionString)) ");
                conn.Open();

                SqlCommand cmd = new SqlCommand("[auditoria].[get_se_verificar_seguimientos]", conn);

                cmd.CommandType = CommandType.StoredProcedure;
                log.LogInformation("antes de dataReader ");
                //Ejecutar Comando buscaremos los hallazgos registrados
                using (SqlDataReader dataReader = await cmd.ExecuteReaderAsync())
                {
                    //Navegar en el Conjunto de Datos Recuperados
                    while (dataReader.Read())
                    {
                        curobj = new SeguimientosGet();
                        log.LogInformation("despues de curobj = new SeguimientosGet() ");

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("AccionCorrectivaId"))) { curobj.AccionCorrectivaId = (long)(dataReader.GetValue(dataReader.GetOrdinal("AccionCorrectivaId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Dias"))) { curobj.Dias                             = (int)(dataReader.GetValue(dataReader.GetOrdinal("Dias"))); }

                        log.LogInformation("curobj.AccionCorrectivaId -> "+curobj.AccionCorrectivaId);
                        log.LogInformation("curobj.Dias -> "+curobj.Dias);

                        if(curobj.Dias > 0)
                        {
                            log.LogInformation("if(curobj.Dias > 0) es porque tiene una accion venciada por "+curobj.Dias+" Dias");
                            using (SqlConnection conn2 = new SqlConnection(vvsqlconnectionString))
                            {
                                conn2.Open();

                                SqlCommand cmd2 = new SqlCommand("[auditoria].[put_se_vencer_statuspac]", conn2);

                                cmd2.Parameters.AddWithValue("@AccionCorrectivaId",  curobj.AccionCorrectivaId);
                                cmd2.Parameters.AddWithValue("@Dias",                curobj.Dias);

                                SqlParameter output_Id = new SqlParameter("@row", SqlDbType.BigInt);
                                output_Id.Direction    = ParameterDirection.Output;
                                cmd2.Parameters.Add(output_Id);

                                cmd2.CommandType = CommandType.StoredProcedure;

                                await cmd2.ExecuteNonQueryAsync();

                                if (output_Id.Value != DBNull.Value)
                                {
                                    //curentity.Id                     = Convert.ToInt64(output_Id.Value);
                                    log.LogInformation("Convert.ToInt64(output_Id.Value) -> "+ Convert.ToInt64(output_Id.Value) );
                                }

                            }

                        }

                        lobjs.Add(curobj);

                    }
                }


                if (conn.State == System.Data.ConnectionState.Open)
                {
                    conn.Close();
                }
            }
        }
        catch (Exception ex)
        {
            log.LogInformation("catch (Exception ex) " + System.Convert.ToString(ex.Message));
            lobjs                     = new List<SeguimientosGet>();
            curobj                    = new SeguimientosGet();
            curobj.AccionCorrectivaId = 0;
            curobj.Problema           = System.Convert.ToString(ex.Message);

            lobjs.Add(curobj);
        }

        return lobjs;

    }

}

public class DataSeguimientos
{
  public List<SeguimientosGet> Seguimientos {get; set;}
  public List<TipoHallazgos> TipoHallazgos {get; set;}
  public List<Normas> Normas {get; set;}
  public List<Sedes> Sedes {get; set;}
  public List<StatusPAC> StatusPAC {get; set;}
}

public class SeguimientosGet
{
    public string CodeHallazgo                      {get; set;}
    public string TipoHallazgo                      {get; set;}
    public string Norma                             {get; set;}
    public string Sede                              {get; set;}
    public DateTime FechaProximoVencimiento         {get; set;}
    public string FechaProximoVencimientoModificada {get; set;}
    public string StatusPAC                         {get; set;}

    public long HallazgoId                          { get; set; }
    public long TipoHallazgoId                      { get; set; }
    public long AccionCorrectivaId                  { get; set; }
    public long NormaId                             { get; set; }
    public long SedeId                              { get; set; }
    public long SEStatusPACId                       { get; set; }

    public int Dias                                { get; set; }

    public string Hallazgo                          { get; set; }
    public string Problema                          { get; set; }
    public string StatusPACCode                     { get; set; }
    public List<Acciones> Acciones                  { get; set; }
}

public class Acciones
{
    public long Id                           { get; set; }
    public long HAAnalisisProblemaId         { get; set; }
    public long HAPlazoAccionId              { get; set; }
    public long HATipoAccionId               { get; set; }
    public long HAStatusAccionId             { get; set; }
    public string PlazoAccion                { get; set; }
    public string TipoAccion                 { get; set; }
    public string StatusAccion               { get; set; }
    public DateTime Fecha                    { get; set; }
    public string FechaFormato               { get; set; }
    public string Responsable                { get; set; }
    public string UserHash                   { get; set; }
    public string Cargo                      { get; set; }
    public string Correo                     { get; set; }
    public string Accion                     { get; set; }
    public string Respuesta                  { get; set; }
    public int Item                          { get; set; }
    public DateTime Created_Date             { get; set; }
    public List<EvidenciasWeb> EvidenciasWeb { get; set; }
    public List<Reprogramaciones> Reprogramaciones { get; set; }
}

public class EvidenciasWeb
{
    public long Id                                            { get; set; }
    public long HAPlanAccionesId                              { get; set; }
    public long SEStatusEvidenciasId                          { get; set; }
    public long SEStatusEvaluacionLocalId                     { get; set; }
    public long SEStatusEvaluacionCorporativaId               { get; set; }
    public long SEEvidenciasAdjuntosId                        { get; set; }
    public string StatusEvidencia                             { get; set; }
    public string StatusEvidenciaCode                         { get; set; }
    public string StatusEvaluacionLocal                       { get; set; }
    public string StatusEvaluacionLocalCode                   { get; set; }
    public string StatusEvaluacionCorporativa                 { get; set; }
    public string StatusEvaluacionCorporativaCode             { get; set; }
    public string FechaAtencion                               { get; set; }
    public string AdjuntoName                                 { get; set; }
    public string Detalle                                     { get; set; }
    public string DetalleEvaluacionCorporativa                { get; set; }
    public DateTime Created_Date                              { get; set; }
}

public class Reprogramaciones
{
    public long Id                  { get; set; }
    public long HAPlanAccionesId    { get; set; }
    public string Motivo            { get; set; }
    public string FechaNueva        { get; set; }
    public string FechaAnterior     { get; set; }
    public string FechaCambio       { get; set; }
    public string Name              { get; set; }
}

public class AdjuntoReprogramacion
{
    public long   Id                    { get; set; }
    public long   SEReprogramacionesId  { get; set; }
    public string Name                  { get; set; }
    public string Adjunto               { get; set; }
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

public class Sedes
{
    public long Id {get;set;}
    public string Sede {get;set;}
    public string Code {get;set;}
    public long UnidadNegocioId {get;set;}
}

public class StatusPAC
{
    public long Id {get;set;}
    public string Description {get;set;}
    public string Code {get;set;}
}

public class AccionesApp
{
	public long Id                     {get;set;}
	public int Item                    {get;set;}
	public string NormaCode            {get;set;}
	public string TipoHallazgoCode     {get;set;}
	public string Code_Hallazgo        {get;set;}
	public string StatusAccion         {get;set;}
	public long HAAnalisisProblemaId   {get;set;}
	public long HAPlazoAccionId        {get;set;}
	public long HATipoAccionId         {get;set;}
	public long HAStatusAccionId       {get;set;}
	public string FechaF               {get;set;}
	public DateTime Fecha              {get;set;}
	public string Responsable          {get;set;}
	public string UserHash             {get;set;}
	public long HAAccionCorrectivaId   {get;set;}
	public string Accion               {get;set;}
	public long HallazgoId             {get;set;}
	public string Problema             {get;set;}
	public long AreaId                 {get;set;}
	public long TipoHallazgoId         {get;set;}
	public long NormaId                {get;set;}
	public string Norma                {get;set;}
    public string TipoHallazgo         {get;set;}
    public string Hallazgo             {get;set;}
    public List<Evidencias> Evidencias {get;set;}
}

public class Evidencias
{
  public long Id                        { get; set; }
  public long SEEvidenciasId            { get; set; }
  public string Name                    { get; set; }
  public string Adjunto                 { get; set; }
  public long HAPlanAccionesId          { get; set; }
  public string StatusEvidencia         { get; set; }
  public string StatusEvidenciaColor    { get; set; }
  public string Detalle                 { get; set; }
  public string FechaSubido             { get; set; }
  public long StatusEvidenciaId         { get; set; }
}
