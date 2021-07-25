using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataAccionCorrectivaPostAll
{
    string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);

    /**
     * Registramos una accion correctiva para un hallazgo
     */
    public async Task<AccionCorrectivaPost> funPostAccionCorrectiva(    ILogger log
                                                                        ,AccionCorrectivaPost curentity
                                                                    )
    {
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("[auditoria].[post_accion_correctiva_insert]", conn);

            cmd.Parameters.AddWithValue("@HallazgoId", curentity.HallazgoId);
            cmd.Parameters.AddWithValue("@UltimoNivel", curentity.UltimoNivel);
            cmd.Parameters.AddWithValue("@HACeroPerdidasId", curentity.HACeroPerdidasId);
            cmd.Parameters.AddWithValue("@AreaId", curentity.AreaId);
            cmd.Parameters.AddWithValue("@Flag_Definido", curentity.Flag_Definido);
            cmd.Parameters.AddWithValue("@Flag_Completado", curentity.Flag_Completado);
            cmd.Parameters.AddWithValue("@CeroPerdidasDescription", curentity.CeroPerdidasDescription);
            cmd.Parameters.AddWithValue("@Que", curentity.Que);
            cmd.Parameters.AddWithValue("@Donde", curentity.Donde);
            cmd.Parameters.AddWithValue("@Cuando", curentity.Cuando);
            cmd.Parameters.AddWithValue("@Como", curentity.Como);
            cmd.Parameters.AddWithValue("@Cual", curentity.Cual);
            cmd.Parameters.AddWithValue("@Problema", curentity.Problema);
            cmd.Parameters.AddWithValue("@Created_By", curentity.Created_By);

            SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
            output_Id.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                curentity.Id = Convert.ToInt64(output_Id.Value);
            }
        }

        return curentity;
    }

    /**
     * REGSITRAMOS LOS INTEGRANTES DEL ANALISIS DE UNA ACCION CORRECTIVA
     */
    public async Task<IntegrantesAnalisis> funPostIntegrantesAnalisis(ILogger log
                                                        , IntegrantesAnalisis curentity
                                                        , AccionCorrectivaPost curentityAC
                                                        )
    {
        //Lista de Objetos
        long newlongid;
        log.LogInformation("Ingreso Metodo: funPostIntegrantesAnalisis");

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("[auditoria].[post_integrantes_analisis_insert]", conn);

            cmd.Parameters.AddWithValue("@HAAccionCorrectivaId", curentityAC.Id);
            cmd.Parameters.AddWithValue("@UserHash", curentity.UserHash);
            cmd.Parameters.AddWithValue("@Name", curentity.Name);
            cmd.Parameters.AddWithValue("@Email", curentity.Email);
            cmd.Parameters.AddWithValue("@Cargo", curentity.Cargo);
            cmd.Parameters.AddWithValue("@Created_By", curentityAC.Created_By);

            SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
            output_Id.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                curentity.Id = Convert.ToInt64(output_Id.Value);
            }
        }

        return curentity;
    }


    /**
     * MODIFICAMOS LA ACCION CORRECTIVA
     */
    public async Task<int> funPutAccionCorrectiva(ILogger log, AccionCorrectivaPost curentity)
    {
        int resultado = 0;
        log.LogInformation("EN funPutAccionCorrectiva ");
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("[auditoria].[put_accion_correctiva]", conn);

            cmd.Parameters.AddWithValue("@Id", curentity.Id);
            cmd.Parameters.AddWithValue("@HallazgoId", curentity.HallazgoId);
            cmd.Parameters.AddWithValue("@UltimoNivel", curentity.UltimoNivel);
            cmd.Parameters.AddWithValue("@HACeroPerdidasId", curentity.HACeroPerdidasId);
            cmd.Parameters.AddWithValue("@AreaId", curentity.AreaId);
            cmd.Parameters.AddWithValue("@Flag_Definido", curentity.Flag_Definido);
            cmd.Parameters.AddWithValue("@Flag_Completado", curentity.Flag_Completado);
            cmd.Parameters.AddWithValue("@CeroPerdidasDescription", curentity.CeroPerdidasDescription);
            cmd.Parameters.AddWithValue("@Que", curentity.Que);
            cmd.Parameters.AddWithValue("@Donde", curentity.Donde);
            cmd.Parameters.AddWithValue("@Cuando", curentity.Cuando);
            cmd.Parameters.AddWithValue("@Como", curentity.Como);
            cmd.Parameters.AddWithValue("@Cual", curentity.Cual);
            cmd.Parameters.AddWithValue("@Problema", curentity.Problema);
            cmd.Parameters.AddWithValue("@Created_By", curentity.Created_By);
            
            SqlParameter output_Id = new SqlParameter("@rows", SqlDbType.BigInt);
            output_Id.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                resultado = Convert.ToInt32(output_Id.Value);
            }
        }
        log.LogInformation("PUT resultado "+resultado);
        return resultado;
    }


    /**
     * MODIFICAMOS LOS INTEGRANTES DEL ANALISIS
     */
    public async Task<int> funPutIntegrantesAnalisis(ILogger log, IntegrantesAnalisis curentity, AccionCorrectivaPost curentityAC)
    {
        int resultado = 0;
        log.LogInformation("EN funPutIntegrantesAnalisis ");
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("[auditoria].[put_integrantes_analisis]", conn);

            cmd.Parameters.AddWithValue("@Id", curentity.Id);
            cmd.Parameters.AddWithValue("@HAAccionCorrectivaId", curentityAC.Id);
            cmd.Parameters.AddWithValue("@UserHash", curentity.UserHash);
            cmd.Parameters.AddWithValue("@Name", curentity.Name);
            cmd.Parameters.AddWithValue("@Email", curentity.Email);
            cmd.Parameters.AddWithValue("@Cargo", curentity.Cargo);
            cmd.Parameters.AddWithValue("@Created_By", curentityAC.Created_By);
            cmd.Parameters.AddWithValue("@Deleted", curentity.Deleted);
            
            
            SqlParameter output_Id = new SqlParameter("@rows", SqlDbType.BigInt);
            output_Id.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                resultado = Convert.ToInt32(output_Id.Value);
            }
        }

        log.LogInformation("resultado "+resultado);
        return resultado;
    }


    /**
     * REGISTRAMOS EL ANALISIS DEL PROBLEMA (5 PORQUE)
     */
    public async Task<AnalisisProblema> funPostAnalisisProblema(ILogger log
                                                        , AnalisisProblema curentity
                                                        )
    {
        //Lista de Objetos
        log.LogInformation("Ingreso Metodo: funPostAnalisisProblema");

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("[auditoria].[post_analisis_problema_insert]", conn);

            //cmd.Parameters.AddWithValue("@Id", curentity.Id);
            cmd.Parameters.AddWithValue("@HAAccionCorrectivaId", curentity.HAAccionCorrectivaId);
            cmd.Parameters.AddWithValue("@HAAnalisisProblemasId", curentity.HAAnalisisProblemasId);
            cmd.Parameters.AddWithValue("@Pregunta", curentity.Pregunta);
            cmd.Parameters.AddWithValue("@Respuesta", curentity.Respuesta);
            cmd.Parameters.AddWithValue("@Nivel", curentity.Nivel);
            cmd.Parameters.AddWithValue("@HAColoresAnalisisId", curentity.HAColoresAnalisisId);
            //cmd.Parameters.AddWithValue("@Deleted", curentity.Deleted);
            cmd.Parameters.AddWithValue("@Created_By", curentity.Created_By);

            SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
            output_Id.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                curentity.Id = Convert.ToInt64(output_Id.Value);
            }
        }

        return curentity;
    }

    /**
     * MODIFICAMOS EL ANALISIS DEL PROBLEMA (5 PORQUE)
     */
    public async Task<int> funPutAnalisisProblema(ILogger log, AnalisisProblema curentity)
    {
        int resultado = 0;
        log.LogInformation("EN funPutAnalisisProblema "+curentity.Id);
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("[auditoria].[put_analisis_problema]", conn);

            cmd.Parameters.AddWithValue("@Id", curentity.Id);
            cmd.Parameters.AddWithValue("@HAAccionCorrectivaId", curentity.HAAccionCorrectivaId);
            cmd.Parameters.AddWithValue("@HAAnalisisProblemasId", curentity.HAAnalisisProblemasId);
            cmd.Parameters.AddWithValue("@HAColoresAnalisisId", curentity.HAColoresAnalisisId);
            cmd.Parameters.AddWithValue("@Pregunta", curentity.Pregunta);
            cmd.Parameters.AddWithValue("@Respuesta", curentity.Respuesta);
            cmd.Parameters.AddWithValue("@Nivel", curentity.Nivel);
            cmd.Parameters.AddWithValue("@Created_By", curentity.Created_By);
            cmd.Parameters.AddWithValue("@Deleted", curentity.Deleted);
            
            
            SqlParameter output_Id = new SqlParameter("@rows", SqlDbType.BigInt);
            output_Id.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                resultado = Convert.ToInt32(output_Id.Value);
            }
        }

        log.LogInformation("resultado "+resultado);
        return resultado;
    }

    /**
     * REGISTRAMOS LAS MEDIDAS PARA CERO FALLAS (5 PORQUE)
     */
    public async Task<int> funPostMedidasCeroFallas(ILogger log
                                                        , long AccionCorrectivaId
                                                        , long AnalisisProblemaId
                                                        , long mcfId
                                                        , string Created_By
                                                    )
    {
        log.LogInformation("Ingreso Metodo: funPostCeroFallas");
        int resultado = 0;
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("[auditoria].[post_analisis_medidascerofallas]", conn);

            cmd.Parameters.AddWithValue("@HAAccionCorrectivaId", AccionCorrectivaId);
            cmd.Parameters.AddWithValue("@HAAnalisisProblemasId", AnalisisProblemaId);
            cmd.Parameters.AddWithValue("@HAMedidasCeroFallasId", mcfId);
            cmd.Parameters.AddWithValue("@Created_By", Created_By);
            
            
            SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
            output_Id.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                resultado = Convert.ToInt32(output_Id.Value);
            }
        }

        log.LogInformation("resultado "+resultado);
        return resultado;
    }

            public async Task<CeroFallas> funPostCeroFallas(ILogger log
                                                                , CeroFallas curentity
                                                                , AccionCorrectivaPost curentityAC
                                                            )
            {
                //Lista de Objetos
                log.LogInformation("Ingreso Metodo: funPostCeroFallas");

                using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
                {
                    conn.Open();

                    SqlCommand cmd = new SqlCommand("[auditoria].[post_analisis_medidascerofallas]", conn);

                    cmd.Parameters.AddWithValue("@HAAnalisisProblemasId", curentity.HAAnalisisProblemasId);
                    cmd.Parameters.AddWithValue("@HAMedidasCeroFallasId", curentity.HAMedidasCeroFallasId);
                    cmd.Parameters.AddWithValue("@Created_By", curentityAC.Created_By);

                    SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
                    output_Id.Direction = ParameterDirection.Output;
                    cmd.Parameters.Add(output_Id);

                    cmd.CommandType = CommandType.StoredProcedure;

                    await cmd.ExecuteNonQueryAsync();

                    if (output_Id.Value != DBNull.Value)
                    {
                        curentity.Id = Convert.ToInt64(output_Id.Value);
                    }
                }

                return curentity;
            }

            /**
             * MODIFICAMOS LAS MEDIDAS PARA CERO FALLAS (5 PORQUE)
             */
            public async Task<CeroFallas> funPutCeroFallas(ILogger log
                                                                , CeroFallas curentity
                                                                , AccionCorrectivaPost curentityAC
                                                            )
            {
                //Lista de Objetos
                log.LogInformation("Ingreso Metodo: funPutCeroFallas");

                using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
                {
                    conn.Open();

                    SqlCommand cmd = new SqlCommand("[auditoria].[put_analisis_medidascerofallas]", conn);

                    cmd.Parameters.AddWithValue("@Id", curentity.Id);
                    cmd.Parameters.AddWithValue("@HAAnalisisProblemasId", curentity.HAAnalisisProblemasId);
                    cmd.Parameters.AddWithValue("@HAMedidasCeroFallasId", curentity.HAMedidasCeroFallasId);
                    cmd.Parameters.AddWithValue("@Deleted", curentity.Deleted);
                    cmd.Parameters.AddWithValue("@Created_By", curentityAC.Created_By);

                    SqlParameter output_Id = new SqlParameter("@rows", SqlDbType.BigInt);
                    output_Id.Direction = ParameterDirection.Output;
                    cmd.Parameters.Add(output_Id);

                    cmd.CommandType = CommandType.StoredProcedure;

                    await cmd.ExecuteNonQueryAsync();

                    if (output_Id.Value != DBNull.Value)
                    {
                        curentity.Id = Convert.ToInt64(output_Id.Value);
                    }
                }

                return curentity;
            }

    /**
     * REGISTRAMOS LOS PLANES DE ACCION
     */// PlanAccion{}, AccionCorrectivaId, AnalisisProblemaId
    public async Task<PlanAccion> funPostPlanAccion2(ILogger log
                                                   , PlanAccion curentity
                                                   , long AccionCorrectivaId
                                                   , long AnalisisProblemaId
                                                   , string Created_By
                                                    )
    {
        //Lista de Objetos
        log.LogInformation("Ingreso Metodo: funPostPlanAccion");

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("[auditoria].[post_plan_accion_insert]", conn);

            cmd.Parameters.AddWithValue("@HAAccionCorrectivaId", AccionCorrectivaId);
            cmd.Parameters.AddWithValue("@HAAnalisisProblemaId", AnalisisProblemaId);
            cmd.Parameters.AddWithValue("@HAPlazoAccionId", curentity.HAPlazoAccionId);
            cmd.Parameters.AddWithValue("@HATipoAccionId", curentity.HATipoAccionId);
            cmd.Parameters.AddWithValue("@HAStatusAccionId", curentity.HAStatusAccionId);
            cmd.Parameters.AddWithValue("@Responsable", curentity.Responsable);
            cmd.Parameters.AddWithValue("@UserHash", curentity.UserHash);
            cmd.Parameters.AddWithValue("@Cargo", curentity.Cargo);
            cmd.Parameters.AddWithValue("@Correo", curentity.Correo);
            cmd.Parameters.AddWithValue("@Fecha", curentity.Fecha);
            cmd.Parameters.AddWithValue("@Accion", curentity.Accion);
            cmd.Parameters.AddWithValue("@Created_By", Created_By);

            SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
            output_Id.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                curentity.Id = Convert.ToInt64(output_Id.Value);
            }
        }

        return curentity;//*/
    }


    /**
     * VAMOS A REGISTRAR EL ENVIO DEL ACR A EVALUACION
     */
    public async Task<EnvioACR> funPostEnvioACR(ILogger log
                                                , EnvioACR curentity
                                                )
    {
        log.LogInformation("Ingreso Metodo: funPostEnvioACR");

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();
            
            SqlCommand cmd = new SqlCommand("[auditoria].[post_envio_evaluar_acr]", conn);

            cmd.Parameters.AddWithValue("@HAAccionCorrectivaId", curentity.HAAccionCorrectivaId);
            cmd.Parameters.AddWithValue("@Name", curentity.Name);
            cmd.Parameters.AddWithValue("@UserHash", curentity.UserHash);
            cmd.Parameters.AddWithValue("@Correo", curentity.Correo);
            cmd.Parameters.AddWithValue("@Cargo", curentity.Cargo);
            cmd.Parameters.AddWithValue("@Deleted", curentity.Deleted);
            cmd.Parameters.AddWithValue("@Created_By", curentity.Created_By);

            SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
            output_Id.Direction    = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                curentity.Id = Convert.ToInt64(output_Id.Value);
            }

            if (conn.State == System.Data.ConnectionState.Open)
                conn.Close();
            
            log.LogInformation("Despues de cerrar conn");
        }
        
        return curentity;
    }

    /**
     * Evaluar un ACR
     */
    public async Task<EvaluarACR> funEvaluarACR(ILogger log
                                            , EvaluarACR curentity)
    {
        log.LogInformation("en funEvaluarACR");
        EvaluarACR curobj = new EvaluarACR();
        curobj = curentity;
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("[auditoria].[post_evaluar_acr]", conn);

            cmd.Parameters.AddWithValue("@Id", curentity.Id);
            cmd.Parameters.AddWithValue("@HallazgoId", curentity.HallazgoId);
            cmd.Parameters.AddWithValue("@HAAccionCorrectivaId", curentity.HAAccionCorrectivaId);
            cmd.Parameters.AddWithValue("@StatusAccionCorrectivaId", curentity.StatusAccionCorrectivaId);
            cmd.Parameters.AddWithValue("@StatusEvaluacionAccionCorrectivaId", curentity.StatusEvaluacionAccionCorrectivaId);
            cmd.Parameters.AddWithValue("@Active", curentity.Active);
            cmd.Parameters.AddWithValue("@Created_By", curentity.Created_By);
            cmd.Parameters.AddWithValue("@EvaluadorName", curentity.EvaluadorName);
            cmd.Parameters.AddWithValue("@EvaluadorUserHash", curentity.EvaluadorUserHash);
            cmd.Parameters.AddWithValue("@EvaluadorCorreo", curentity.EvaluadorCorreo);
            cmd.Parameters.AddWithValue("@EvaluadorCargo", curentity.EvaluadorCargo);
            cmd.Parameters.AddWithValue("@Observacion", curentity.Observacion);
            cmd.Parameters.AddWithValue("@FlagAccionACR", curentity.FlagAccionACR);

            SqlParameter output_Id = new SqlParameter("@Result", SqlDbType.BigInt);
            output_Id.Direction    = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                curentity.Id = Convert.ToInt64(output_Id.Value);
                if(curobj.Id==0){ curobj.Id = Convert.ToInt64(output_Id.Value);}
            }

            if (conn.State == System.Data.ConnectionState.Open)
                conn.Close();            
        }

        log.LogInformation("curobj.Id "+curobj.Id);

        return curobj;
    }

    public async Task<DataHallazgo> funGetHallazgosAllList2( ILogger log
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
        //Objeto de Hallazgo
        HallazgosGet curobj;
        
        //Console.WriteLine("Prueba a ver si sale en la consola del azure:");
        log.LogInformation("en la funcion funGetHallazgosAllList2 "+Id);
        //SQL Objects
        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                log.LogInformation("ResponsableUserHash "+ResponsableUserHash);
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
                        log.LogInformation("En while hallazgosGet "+curobj.Hora);
                        
                        log.LogInformation("DataHallazgo.Hallazgos "+curobj.Code_Hallazgo);

                        lobjs.Add(curobj);
                    }
                    DataHallazgo.Hallazgos = lobjs;
                
                    
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

        }//*/

        return DataHallazgo;
    }//*/

            /*public async Task<PlanAccion> funPostPlanAccion(ILogger log
                                                           , PlanAccion curentity
                                                           , AccionCorrectivaPost curentityAC
                                                            )
            {
                //Lista de Objetos
                log.LogInformation("Ingreso Metodo: funPostPlanAccion");

                using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
                {
                    conn.Open();

                    SqlCommand cmd = new SqlCommand("[auditoria].[post_plan_accion_insert]", conn);

                    cmd.Parameters.AddWithValue("@HAAccionCorrectivaId", curentityAC.Id);
                    cmd.Parameters.AddWithValue("@HAPlazoAccionId", curentity.HAPlazoAccionId);
                    cmd.Parameters.AddWithValue("@HATipoAccionId", curentity.HATipoAccionId);
                    cmd.Parameters.AddWithValue("@HAStatusAccionId", curentity.HAStatusAccionId);
                    cmd.Parameters.AddWithValue("@Responsable", curentity.Responsable);
                    cmd.Parameters.AddWithValue("@UserHash", curentity.UserHash);
                    cmd.Parameters.AddWithValue("@Cargo", curentity.Cargo);
                    cmd.Parameters.AddWithValue("@Correo", curentity.Correo);
                    cmd.Parameters.AddWithValue("@Fecha", curentity.Fecha);
                    cmd.Parameters.AddWithValue("@Created_By", curentityAC.Created_By);

                    SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
                    output_Id.Direction = ParameterDirection.Output;
                    cmd.Parameters.Add(output_Id);

                    cmd.CommandType = CommandType.StoredProcedure;

                    await cmd.ExecuteNonQueryAsync();

                    if (output_Id.Value != DBNull.Value)
                    {
                        curentity.Id = Convert.ToInt64(output_Id.Value);
                    }
                }

                return curentity;
            }//*/

            /**
             * MOPDIFICAMOS LOS PLANES DE ACCION
             */
            /*public async Task<PlanAccion> funPutPlanAccion(ILogger log
                                                           , PlanAccion curentity
                                                           , AccionCorrectivaPost curentityAC
                                                            )
            {
                //Lista de Objetos
                log.LogInformation("Ingreso Metodo: funPutPlanAccion");

                using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
                {
                    conn.Open();

                    SqlCommand cmd = new SqlCommand("[auditoria].[put_plan_accion]", conn);

                    cmd.Parameters.AddWithValue("@Id", curentity.Id);
                    cmd.Parameters.AddWithValue("@HAAccionCorrectivaId", curentityAC.Id);
                    cmd.Parameters.AddWithValue("@HAPlazoAccionId", curentity.HAPlazoAccionId);
                    cmd.Parameters.AddWithValue("@HATipoAccionId", curentity.HATipoAccionId);
                    cmd.Parameters.AddWithValue("@HAStatusAccionId", curentity.HAStatusAccionId);
                    cmd.Parameters.AddWithValue("@Responsable", curentity.Responsable);
                    cmd.Parameters.AddWithValue("@UserHash", curentity.UserHash);
                    cmd.Parameters.AddWithValue("@Cargo", curentity.Cargo);
                    cmd.Parameters.AddWithValue("@Correo", curentity.Correo);
                    cmd.Parameters.AddWithValue("@Fecha", curentity.Fecha);
                    cmd.Parameters.AddWithValue("@Deleted", curentity.Deleted);
                    cmd.Parameters.AddWithValue("@Created_By", curentityAC.Created_By);

                    SqlParameter output_Id = new SqlParameter("@rows", SqlDbType.BigInt);
                    output_Id.Direction = ParameterDirection.Output;
                    cmd.Parameters.Add(output_Id);

                    cmd.CommandType = CommandType.StoredProcedure;

                    await cmd.ExecuteNonQueryAsync();

                    if (output_Id.Value != DBNull.Value)
                    {
                        curentity.Id = Convert.ToInt64(output_Id.Value);
                    }
                }

                return curentity;
            }//*/


}

public class AccionCorrectivaPost
{
    public long Id { get; set; }
    public long HallazgoId { get; set; }
    public long HACeroPerdidasId { get; set; }
    public int UltimoNivel { get; set; }
    public string CeroPerdidasDescription {get; set;}
    public string Que {get; set;}
    public string Donde {get; set;}
    public string Cuando {get; set;}
    public string Como {get; set;}
    public string Cual {get; set;}
    public string Problema {get; set;}
    public string Requisito {get; set;}
    public string Created_By {get; set;}
    public long AreaId { get; set; }
    public int Flag_Definido { get; set; }
    public int Flag_Completado { get; set; }
    //public bool? Deleted { get; set; }
    //public DateTime FechaInicio {get; set;}
    //public string FechaInicioAnalisis {get; set;}
    //public string AreaDescription {get; set;}
    public List<PlanAccion> PlanAccion {get;set;}
    public List<IntegrantesAnalisis> IntegrantesAnalisis {get;set;}
    public List<AnalisisProblema> AnalisisProblema {get; set;}
    public List<EnvioACR> EnvioACR {get; set;}
}

public class IntegrantesAnalisis
{
    public long Id { get; set; }
    public long HAAccionCorrectivaId { get; set; }
    public string UserHash {get; set;}
    public string Name {get; set;}
    public string Email {get; set;}
    public string Cargo {get; set;}
    public string Created_By {get; set;}
    public int Deleted {get; set;}
}

public class AnalisisProblema
{
    public long Id {get;set;}
    public long HAAccionCorrectivaId {get;set;}
    public long HAAnalisisProblemasId {get;set;}
    public string Pregunta {get; set;}
    public string Respuesta {get; set;}
    public int Nivel {get; set;}
    public long HAColoresAnalisisId {get;set;}
    public string Code {get; set;}
    public int Deleted {get; set;}
    public string Created_By {get; set;}
    public List<long> AnalisisMedidasCeroFallas { get; set; }
    public List<CeroFallas> CeroFallas { get; set; }
    public List<AnalisisProblema> AnalisisProblema2 {get; set;}
    public List<PlanAccion> PlanAccion {get;set;}
}

public class CeroFallas
{
    public long Id {get;set;}
    public long HAMedidasCeroFallasId {get;set;}
    public long HAAnalisisProblemasId {get;set;}
    public int Deleted {get; set;}
}

public class PlanAccion
{
    public long Id {get;set;}
    public long HAPlazoAccionId {get;set;}
    public long HATipoAccionId {get;set;}
    public long HAStatusAccionId {get;set;}
    public int Deleted {get; set;}
    public DateTime Fecha {get; set;}
    public string Responsable {get; set;}
    public string UserHash {get; set;}
    public string Cargo {get; set;}
    public string Correo {get; set;}
    public string Accion {get; set;}
    public int Item {get; set;}
}

public class EnvioACR
{
    public long Id {get;set;}
    public long HAAccionCorrectivaId {get;set;}
    public string Name {get; set;}
    public string UserHash {get; set;}
    public string Correo {get; set;}
    public string Cargo {get; set;}
    public string Created_By {get; set;}
    public int Deleted {get; set;}
} 

public class EvaluarACR
{
    public long Id {get;set;}
    public long HAAccionCorrectivaId {get;set;}
    public long StatusAccionCorrectivaId {get;set;}
    public long HallazgoId {get;set;}
    public int Active {get;set;}
    public string Created_By {get; set;}
    public string EvaluadorCargo {get; set;}
    public string EvaluadorCorreo {get; set;}
    public string EvaluadorName {get; set;}
    public string EvaluadorUserHash {get; set;}
    public int FlagAccionACR {get;set;}
    public string Observacion {get; set;}
    public long StatusEvaluacionAccionCorrectivaId {get;set;}
}

////////////// para la consulta de los datos del hallazgo funGetHallazgosAllList2
public class DataHallazgo 
{
  public List<HallazgosGet> Hallazgos {get; set;}
}//*/

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
    //public AccionCorrectiva AccionCorrectiva {get; set;}
}//*/

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