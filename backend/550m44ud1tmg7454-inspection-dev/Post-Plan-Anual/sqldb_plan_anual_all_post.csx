/****************************************************************************************
* VISUAL SAT - [2021]
* PROYECTO : SIGTASA
* ESQUEMA : SSOMA
* MODULO : GESTIÓN DE PLAN ANUAL
* OPERADORES_________________________________________________________________________
* | # | PROGRAMADOR     |  |      FECHA   |  |   HORA   |           CORREO           |
* | 1 | Andy Vásquez    |  |  28/01/2021  |  | 05:28:50 |    caracas1348@gmail.com   |
* |___|_________________|__|______________|__|__________|____________________________|
*
* DESCRIPCION: ARCHIVO SQL BACKEND DE FUNCIONALIDAD EN SERVIDOR DE LAS OPCIONES DEL PLAN ANUAL PARA INSERTAR Y MODIFICAR
*
* ARCHIVOS DE FRONT       ____________________________________
* | # |     MODULO             |  |         NOMBRE            |   
* | 1 |      SSOMA             |  |  gestionPlanAnual.html    |
* |___________________________________________________________|
*
* VERSION: 0.1 Beta
*******************************************************************************************/
using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataPlanes_AnualesPostAll
{

    public async Task<Planes_AnualesPost> funPostPlanes_Anuales(ILogger log,Planes_AnualesPost curentity)
    {
            string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);
                                    log.LogInformation("AQUI ANDO funPostPlanes_Anuales");

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();
                                    log.LogInformation("AQUI ANDO conn.Open()");
                log.LogInformation("AQUI ANDO ID "+System.Convert.ToString(curentity.Id));

            /*if(curentity.EnviarCorreo == 1)
            {
                curentity.StatusHallazgoId = 2;
            }
            else 
            {
                curentity.StatusHallazgoId = 1;   
            }*/

            SqlCommand cmd = new SqlCommand("[ssoma].[post_plan_anual_insert]", conn);
            cmd.Parameters.AddWithValue("@IdPlan", System.Convert.ToString(curentity.Id));
            cmd.Parameters.AddWithValue("@Estado_PlanId", curentity.Estado_PlanId);
            cmd.Parameters.AddWithValue("@ProgramaId", curentity.ProgramaId);
            cmd.Parameters.AddWithValue("@GerenciaId", curentity.GerenciaId);
            cmd.Parameters.AddWithValue("@SedeId", curentity.SedeId);
            cmd.Parameters.AddWithValue("@EquipoId", curentity.EquipoId);
            cmd.Parameters.AddWithValue("@Create_By", curentity.Create_By);
            cmd.Parameters.AddWithValue("@Last_Update_By", curentity.Last_Update_By);
            cmd.Parameters.AddWithValue("@Year_Plan", curentity.Year_Plan);
            cmd.Parameters.AddWithValue("@Email_Supervisor", curentity.Email_Supervisor);
           
            cmd.Parameters.AddWithValue("@Suspendido", curentity.Suspendido);//andy
             log.LogInformation("@Suspendido = "+curentity.Suspendido);
            cmd.Parameters.AddWithValue("@MotivoSuspencion", curentity.MotivoSuspencion);//andy
             log.LogInformation("@MotivoSuspencion = "+curentity.MotivoSuspencion);
            //cmd.Parameters.AddWithValue("@Id", curentity.Id);
            
                                     log.LogInformation("AQUI ANDO PARAMETRS");

            SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
            output_Id.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);
            SqlParameter output_Code = new SqlParameter("@CodeR", SqlDbType.VarChar,30);
            output_Code.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Code);


            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                curentity.Id = Convert.ToInt64(output_Id.Value);
                log.LogInformation("AQUI ANDO ID "+System.Convert.ToString(curentity.Id));
                curentity.Code = Convert.ToString(output_Code.Value);
            log.LogInformation("AQUI ANDO CODE "+System.Convert.ToString(curentity.Code));

            }
         }

        return curentity;
    }

        public async Task<Objetivo> funPostObjetivos(ILogger log,Objetivo curentity,long IdPadre , long IdPlanAnual,int Tipo)
    {
            string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);
                                    log.LogInformation("AQUI ANDO funPostObjetivos");

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            /*if(curentity.EnviarCorreo == 1)
            {
                curentity.StatusHallazgoId = 2;
            }
            else 
            {
                curentity.StatusHallazgoId = 1;   
            }*/

            SqlCommand cmd = new SqlCommand("[ssoma].[post_plan_objetivo_insert]", conn);

            cmd.Parameters.AddWithValue("@IdObj", curentity.Id);
            cmd.Parameters.AddWithValue("@PlanId", IdPlanAnual);
            cmd.Parameters.AddWithValue("@IdPadre", IdPadre);
            cmd.Parameters.AddWithValue("@Description", curentity.Objetivo_Name);
            cmd.Parameters.AddWithValue("@Tipo",Tipo);
            cmd.Parameters.AddWithValue("@Active",1);
            
            //cmd.Parameters.AddWithValue("@Id", curentity.Id);
            
 

            SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
            output_Id.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                curentity.Id = Convert.ToInt64(output_Id.Value);
                 log.LogInformation("AQUI ANDO ID "+System.Convert.ToString(curentity.Id));

            }
        }

        return curentity;
    }

     public async Task<SubObjetivo> funPostSubObjetivos(ILogger log,SubObjetivo curentity,long IdPadre , long IdPlanAnual,int Tipo)
    {
            string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);
                                    log.LogInformation("AQUI ANDO funPostSubObjetivos");

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            /*if(curentity.EnviarCorreo == 1)
            {
                curentity.StatusHallazgoId = 2;
            }
            else 
            {
                curentity.StatusHallazgoId = 1;   
            }*/

            SqlCommand cmd = new SqlCommand("[ssoma].[post_plan_objetivo_insert]", conn);
            cmd.Parameters.AddWithValue("@IdObj", curentity.Id);
            cmd.Parameters.AddWithValue("@PlanId", IdPlanAnual);
            cmd.Parameters.AddWithValue("@IdPadre", IdPadre);
            cmd.Parameters.AddWithValue("@Description", curentity.SubObjetivo_Name);
            cmd.Parameters.AddWithValue("@Tipo",Tipo);
            cmd.Parameters.AddWithValue("@Active",1);

            //cmd.Parameters.AddWithValue("@Id", curentity.Id);
            
 

            SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
            output_Id.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                curentity.Id = Convert.ToInt64(output_Id.Value);
                                log.LogInformation("AQUI ANDO ID "+System.Convert.ToString(curentity.Id));

            }
        }

        return curentity;
    }

            public async Task<Actividad> funPostActividad(ILogger log,Actividad curentity,long IdObject, long PlanId)
    {
            string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);
                                    log.LogInformation("AQUI ANDO funPostActividad");

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            /*if(curentity.EnviarCorreo == 1)
            {
                curentity.StatusHallazgoId = 2;
            }
            else 
            {
                curentity.StatusHallazgoId = 1;   
            }*/

            SqlCommand cmd = new SqlCommand("[ssoma].[sp_post_plan_actividad_insert]", conn);
            cmd.Parameters.AddWithValue("@IdAct", curentity.Id);
            cmd.Parameters.AddWithValue("@Objetivo_PlanId", IdObject);
            cmd.Parameters.AddWithValue("@ResponsableId", curentity.ResponsableId);
            cmd.Parameters.AddWithValue("@ResponsableCargo", curentity.ResponsableCargo);
            cmd.Parameters.AddWithValue("@ResponsableName", curentity.ResponsableName);
            cmd.Parameters.AddWithValue("@ResponsableCorreo", curentity.ResponsableCorreo);
            cmd.Parameters.AddWithValue("@Description", curentity.Actividad_Name);
            cmd.Parameters.AddWithValue("@PlanId", PlanId);
            cmd.Parameters.AddWithValue("@Peso",curentity.Peso);
            cmd.Parameters.AddWithValue("@Active",1);
            
            //cmd.Parameters.AddWithValue("@Id", curentity .Id);
            
 

            SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
            output_Id.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                curentity.Id = Convert.ToInt64(output_Id.Value);
                                log.LogInformation("AQUI ANDO ID "+System.Convert.ToString(curentity.Id));

            }

        }

        return curentity;
    }
     
    public async Task<Cronograma> funPostCronograma(ILogger log,Cronograma curentity,int IdActividad)
    {
            string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);
                                    // log.LogInformation("@ActividadPlanId "+ IdActividad.ToString());
                                    // log.LogInformation("@Year_Frecuencia "+ curentity.Year_Frecuencia.ToString());
                                    // log.LogInformation("@Mes_Num "+ curentity.Mes_Num.ToString());
                                    // log.LogInformation("@Mes_Name "+ curentity.Mes_Name.ToString());
                                    // log.LogInformation("@S1 "+ curentity.S1.ToString());
                                    // log.LogInformation("@S2 "+ curentity.S2.ToString());
                                    // log.LogInformation("@S3 "+ curentity.S3.ToString());
                                    // log.LogInformation("@S4 "+ curentity.S4.ToString());
                                    // log.LogInformation("@Fecha_S1_Ini "+curentity.Fecha_S1_Ini.ToString());
                                    // log.LogInformation("@Fecha_S1_Fin "+curentity.Fecha_S1_Fin.ToString()); 
                                    // log.LogInformation("@Fecha_S2_Ini "+curentity.Fecha_S2_Ini.ToString());
                                    // log.LogInformation("@Fecha_S2_Fin "+curentity.Fecha_S2_Fin.ToString()); 
                                    // log.LogInformation("@Fecha_S3_Ini "+curentity.Fecha_S3_Ini.ToString());
                                    // log.LogInformation("@Fecha_S3_Fin "+curentity.Fecha_S3_Fin.ToString()); 
                                    // log.LogInformation("@Fecha_S4_Ini "+curentity.Fecha_S4_Ini.ToString());
                                    // log.LogInformation("@Fecha_S4_Fin "+curentity.Fecha_S4_Fin.ToString());
                                 







        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            /*if(curentity.EnviarCorreo == 1)
            {
                curentity.StatusHallazgoId = 2;
            }
            else 
            {
                curentity.StatusHallazgoId = 1;   
            }*/

            SqlCommand cmd = new SqlCommand("[ssoma].[sp_post_plan_cronograma_insert]", conn);

            cmd.Parameters.AddWithValue("@IdCrono", curentity.Id);
            cmd.Parameters.AddWithValue("@ActividadPlanId", IdActividad);
            cmd.Parameters.AddWithValue("@Year_Frecuencia", curentity.Year_Frecuencia);
            cmd.Parameters.AddWithValue("@Mes_Num", curentity.Mes_Num);
            cmd.Parameters.AddWithValue("@Mes_Name", curentity.Mes_Name);
            cmd.Parameters.AddWithValue("@S1", curentity.S1);
            cmd.Parameters.AddWithValue("@S2", curentity.S2);
            cmd.Parameters.AddWithValue("@S3", curentity.S3);
            cmd.Parameters.AddWithValue("@S4", curentity.S4);
            
            int comp_Ini1=  DateTime.Compare(curentity.Fecha_S1_Ini, new DateTime(2020, 1, 1, 12, 0, 0));
            if( comp_Ini1 > 0 ){
             cmd.Parameters.AddWithValue("@Fecha_S1_Ini",curentity.Fecha_S1_Ini);
            }else{
            cmd.Parameters.AddWithValue("@Fecha_S1_Ini",null); 
            }
            int comp_Ini2=  DateTime.Compare(curentity.Fecha_S2_Ini, new DateTime(2020, 1, 1, 12, 0, 0));
            if( comp_Ini2 > 0 ){
             cmd.Parameters.AddWithValue("@Fecha_S2_Ini",curentity.Fecha_S2_Ini);
            }else{
            cmd.Parameters.AddWithValue("@Fecha_S2_Ini",null); 
            }
            int comp_Ini3=  DateTime.Compare(curentity.Fecha_S3_Ini, new DateTime(2020, 1, 1, 12, 0, 0));
            if( comp_Ini3 > 0 ){
             cmd.Parameters.AddWithValue("@Fecha_S3_Ini",curentity.Fecha_S3_Ini);
            }else{
            cmd.Parameters.AddWithValue("@Fecha_S3_Ini",null); 
            }
            int comp_Ini4=  DateTime.Compare(curentity.Fecha_S4_Ini, new DateTime(2020, 1, 1, 12, 0, 0));
            if( comp_Ini4 > 0 ){
             cmd.Parameters.AddWithValue("@Fecha_S4_Ini",curentity.Fecha_S4_Ini);
            }else{
            cmd.Parameters.AddWithValue("@Fecha_S4_Ini",null); 
            }

            int comp_Fin1=  DateTime.Compare(curentity.Fecha_S1_Fin, new DateTime(2020, 1, 1, 12, 0, 0));
            if( comp_Fin1 > 0 ){
             cmd.Parameters.AddWithValue("@Fecha_S1_Fin",curentity.Fecha_S1_Fin);
            }else{
            cmd.Parameters.AddWithValue("@Fecha_S1_Fin",null); 
            }
            int comp_Fin2=  DateTime.Compare(curentity.Fecha_S2_Ini, new DateTime(2020, 1, 1, 12, 0, 0));
            if( comp_Fin2 > 0 ){
             cmd.Parameters.AddWithValue("@Fecha_S2_Fin",curentity.Fecha_S2_Fin);
            }else{
            cmd.Parameters.AddWithValue("@Fecha_S2_Fin",null); 
            }
            int comp_Fin3=  DateTime.Compare(curentity.Fecha_S3_Fin, new DateTime(2020, 1, 1, 12, 0, 0));
            if( comp_Fin3 > 0 ){
             cmd.Parameters.AddWithValue("@Fecha_S3_Fin",curentity.Fecha_S3_Fin);
            }else{
            cmd.Parameters.AddWithValue("@Fecha_S3_Fin",null); 
            }
            int comp_Fin4=  DateTime.Compare(curentity.Fecha_S4_Fin, new DateTime(2020, 1, 1, 12, 0, 0));
            if( comp_Fin4 > 0 ){
             cmd.Parameters.AddWithValue("@Fecha_S4_Fin",curentity.Fecha_S4_Fin);
            }else{
            cmd.Parameters.AddWithValue("@Fecha_S4_Fin",null); 
            }

            SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
            output_Id.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                curentity.Id = Convert.ToInt64(output_Id.Value);
                                log.LogInformation("AQUI ANDO ID "+System.Convert.ToString(curentity.Id));

            }
        }

        return curentity;
    }

        public async Task<Tarea> funPostTarea(ILogger log,Tarea curentity,int IdActividad)
    {
            string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);
                                    log.LogInformation("AQUI ANDO funPostTarea");
 log.LogInformation("@ActividadPlanId "+ IdActividad.ToString()); 
 log.LogInformation("@Estado_TareaId "+ curentity.IdEstado.ToString()); 
 log.LogInformation("@Evidencia "+ curentity.Evidencia_Name.ToString()); 
 log.LogInformation("@Fecha_Programada_Ini "+ curentity.Fecha_Programada_Ini.ToString()); 
 log.LogInformation("@Fecha_Programada_Fin "+ curentity.Fecha_Programada_Fin.ToString()); 


        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            /*if(curentity.EnviarCorreo == 1)
            {
                curentity.StatusHallazgoId = 2;
            }
            else 
            {
                curentity.StatusHallazgoId = 1;   
            }*/

            SqlCommand cmd = new SqlCommand("[ssoma].[sp_post_plan_tareas]", conn);

            cmd.Parameters.AddWithValue("@IdTask", curentity.Id);
            cmd.Parameters.AddWithValue("@Actividad_PlanId", IdActividad);
            cmd.Parameters.AddWithValue("@Estado_TareaId", curentity.IdEstado);
            cmd.Parameters.AddWithValue("@Evidencia", curentity.Evidencia_Name);
            cmd.Parameters.AddWithValue("@Fecha_Programada_Ini", curentity.Fecha_Programada_Ini);
            cmd.Parameters.AddWithValue("@Fecha_Programada_Fin", curentity.Fecha_Programada_Fin);
            cmd.Parameters.AddWithValue("@Active", 1);
            
            SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
            output_Id.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                curentity.Id = Convert.ToInt64(output_Id.Value);
                                log.LogInformation("AQUI ANDO ID "+System.Convert.ToString(curentity.Id));

            }
        }

        return curentity;
    }

            public async Task<ControlCambios> funPostControlCambios(ILogger log,ControlCambios curentity)
    {
            string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);



        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            /*if(curentity.EnviarCorreo == 1)
            {
                curentity.StatusHallazgoId = 2;
            }
            else 
            {
                curentity.StatusHallazgoId = 1;   
            }*/

            SqlCommand cmd = new SqlCommand("[ssoma].[insert_control_cambio_pa]", conn);

            cmd.Parameters.AddWithValue("@Nombre", curentity.Nombre);
            cmd.Parameters.AddWithValue("@Actividad_PlanId", curentity.IdActividad);
            cmd.Parameters.AddWithValue("@Cronograma", curentity.Cronograma);
            cmd.Parameters.AddWithValue("@Adjunto", curentity.Adjunto);
            cmd.Parameters.AddWithValue("@Created_by", curentity.Date);
  
            
            SqlParameter output_Id = new SqlParameter("@rows", SqlDbType.BigInt);
            output_Id.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                curentity.Id = Convert.ToInt64(output_Id.Value);
                log.LogInformation("AQUI ANDO ID "+System.Convert.ToString(curentity.Id));

            }
        }

        return curentity;
    }
     
            public async Task<ControlCambios> funPutEstadoTarea(ILogger log,ControlCambios curentity)
    {
            string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);



        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            /*if(curentity.EnviarCorreo == 1)
            {
                curentity.StatusHallazgoId = 2;
            }
            else 
            {
                curentity.StatusHallazgoId = 1;   
            }*/

            SqlCommand cmd = new SqlCommand("[ssoma].[sp_update_status_tareas_plan_anual_vencida]", conn);
 
            
            SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
            output_Id.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                curentity.Id = Convert.ToInt64(output_Id.Value);
                log.LogInformation("AQUI ANDO ID "+System.Convert.ToString(curentity.Id));

            }
        }

        return curentity;
    }
     
     /*
    public async Task<int> funPutPlanes_Anuales(Planes_AnualesPost curentity)
    {
        int resultado = 0;
        
        if(curentity.EnviarCorreo == 1)
        {
            curentity.StatusHallazgoId = 2;
        }
        else
        {
            if(curentity.ResponsableUserHash!="")
                curentity.StatusHallazgoId = 2;
            else
                curentity.StatusHallazgoId = 1;
        }

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("[auditoria].[put_hallazgo]", conn);

            cmd.Parameters.AddWithValue("@Id", curentity.Id);
            cmd.Parameters.AddWithValue("@TipoHallazgoId", curentity.TipoHallazgoId);
            cmd.Parameters.AddWithValue("@AnalisisCausa", curentity.AnalisisCausa);
            cmd.Parameters.AddWithValue("@Hallazgo", curentity.Hallazgo);
            cmd.Parameters.AddWithValue("@StatusHallazgoId", curentity.StatusHallazgoId);
            cmd.Parameters.AddWithValue("@ResponsableName", curentity.ResponsableName);
            cmd.Parameters.AddWithValue("@ResponsableCorreo", curentity.ResponsableCorreo);
            cmd.Parameters.AddWithValue("@ResponsableCargo", curentity.ResponsableCargo);
            cmd.Parameters.AddWithValue("@ResponsableUserHash", curentity.ResponsableUserHash);
            cmd.Parameters.AddWithValue("@Last_Updated_By", curentity.Last_Updated_By);
            
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

        return resultado;
    }*/



    /*
    public async Task<int> funVencerPlanes_AnualesBy15Days(ILogger log)//sera necesaria, evaluar
    {
        int resultado = 0;
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            /*conn.Open();

            SqlCommand cmd = new SqlCommand("[auditoria].[put_hallazgo_vencido_by_15_dias]", conn);

            SqlParameter output_Id = new SqlParameter("@rows", SqlDbType.BigInt);
            output_Id.Direction    = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                resultado = Convert.ToInt32(output_Id.Value);
            }

            if (conn.State == System.Data.ConnectionState.Open)
                conn.Close();

        }

        log.LogInformation("funVencerPlanes_AnualesBy15Days return resultado " + resultado);

        return resultado;
        return 1;
    }

    */

    /**
     * Funcion Para Adjuntar las evidencias de las Tareas
     */
    public async Task<AdjuntosTarea> funAdjuntarEvidenciaTarea(ILogger log, long Id, long TareaId, int Accion, string AdjuntoName, string Adjunto, string Created_By)
    {
        string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);
        log.LogInformation("En funAdjuntarEvidenciaTarea y Accion: "+Accion);

        AdjuntosTarea curentity = new AdjuntosTarea();

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("[ssoma].[post_pa_adjuntar_evidencia]", conn);

            cmd.Parameters.AddWithValue("@Id", Id);
            cmd.Parameters.AddWithValue("@TareaId", TareaId);
            cmd.Parameters.AddWithValue("@Accion", Accion);
            cmd.Parameters.AddWithValue("@AdjuntoName", AdjuntoName);
            cmd.Parameters.AddWithValue("@Adjunto", Adjunto);
            cmd.Parameters.AddWithValue("@Created_By", Created_By);

            SqlParameter output_Id = new SqlParameter("@rows", SqlDbType.BigInt);
            output_Id.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                curentity.Id          = Convert.ToInt64(output_Id.Value);
                curentity.TareaId     = TareaId;
                curentity.AdjuntoName = AdjuntoName;
                curentity.Created_By  = Created_By;
            }


            if (conn.State == System.Data.ConnectionState.Open)
                conn.Close();
        }

        return curentity;

    }



    public async Task<AdjuntosTarea> funAdjuntarEvidenciaTareaExec(ILogger log, long Id, long TareaId, int Accion, string AdjuntoName, string Adjunto, string Created_By)
    {
        string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);
        log.LogInformation("En funAdjuntarEvidenciaTarea y Accion: "+Accion);

        AdjuntosTarea curentity = new AdjuntosTarea();

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("[ssoma].[post_pa_adjuntar_evidencia_exec]", conn);

            cmd.Parameters.AddWithValue("@Id", Id);
            cmd.Parameters.AddWithValue("@TareaId", TareaId);
            cmd.Parameters.AddWithValue("@Accion", Accion);
            cmd.Parameters.AddWithValue("@AdjuntoName", AdjuntoName);
            cmd.Parameters.AddWithValue("@Adjunto", Adjunto);
            cmd.Parameters.AddWithValue("@Created_By", Created_By);

            SqlParameter output_Id = new SqlParameter("@rows", SqlDbType.BigInt);
            output_Id.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                curentity.Id          = Convert.ToInt64(output_Id.Value);
                curentity.TareaId     = TareaId;
                curentity.AdjuntoName = AdjuntoName;
                curentity.Created_By  = Created_By;
            }


            if (conn.State == System.Data.ConnectionState.Open)
                conn.Close();
        }

        return curentity;

    }

    /**
     * Corregir el Plan Anual
     */
    public async Task<CorreccionPlanAnual> funCorreccionPlanAnualPost(ILogger log, CorreccionPlanAnual curentity, string tipo)
    {
        string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);
        log.LogInformation("En funCorreccionPlanAnualPost y vvsqlconnectionString: "+vvsqlconnectionString);

        int resultado = 0;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            foreach (var item in curentity.DestinatariosCorreccion) 
            {
                log.LogInformation("item"+item.Name);

                SqlCommand cmd = new SqlCommand("[ssoma].[post_pa_enviar_correccion]", conn);

                cmd.Parameters.AddWithValue("@PlanAnualId", curentity.Id);
                cmd.Parameters.AddWithValue("@Name", item.Name);
                cmd.Parameters.AddWithValue("@UserHash", item.UserHash);
                cmd.Parameters.AddWithValue("@Cargo", item.Cargo);
                cmd.Parameters.AddWithValue("@Correo", item.Correo);
                cmd.Parameters.AddWithValue("@Created_By", curentity.Created_By);
                cmd.Parameters.AddWithValue("@Tipo", tipo);

                SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
                output_Id.Direction = ParameterDirection.Output;
                cmd.Parameters.Add(output_Id);

                cmd.CommandType = CommandType.StoredProcedure;

                await cmd.ExecuteNonQueryAsync();

                if (output_Id.Value != DBNull.Value)
                {
                    item.Id = Convert.ToInt64(output_Id.Value);
                    log.LogInformation("item.Id "+item.Id);
                }
            }

            if (conn.State == System.Data.ConnectionState.Open)
                conn.Close();
        }

        return curentity;
    }


     /**
     * Finalizar el Plan Anual
     */
    public async Task<CorreccionPlanAnual> funFinalizarPlanAnual(ILogger log, CorreccionPlanAnual curentity)
    {
        string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);



        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();


                SqlCommand cmd = new SqlCommand("[ssoma].[sp_finalizar_plan_anual]", conn);

                cmd.Parameters.AddWithValue("@IdPlan", curentity.Id);
                cmd.Parameters.AddWithValue("@Estado", 3);
                cmd.Parameters.AddWithValue("@iduser", curentity.Created_By);

                SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
                output_Id.Direction = ParameterDirection.Output;
                cmd.Parameters.Add(output_Id);

                cmd.CommandType = CommandType.StoredProcedure;

                await cmd.ExecuteNonQueryAsync();

                if (output_Id.Value != DBNull.Value)
                {
                  curentity.resul = Convert.ToInt64(output_Id.Value);
                    
                }
            

            if (conn.State == System.Data.ConnectionState.Open)
                conn.Close();
        }

        return curentity;
    }

         /**
     * Finalizar el Plan Anual
     */
    public async Task<Ejecucion> funNotificaEjecucionPlanAnual(ILogger log, Ejecucion curentity, string Tipo)
    {
        string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);



        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();


                SqlCommand cmd = new SqlCommand("[ssoma].[sp_notificacion_ejecucion]", conn);

                cmd.Parameters.AddWithValue("@IdActividad", curentity.IdActividad);
                cmd.Parameters.AddWithValue("@IdTarea", curentity.IdTarea);
                cmd.Parameters.AddWithValue("@Created_by", curentity.Created_By);
                cmd.Parameters.AddWithValue("@Tipo", Tipo);
                cmd.Parameters.AddWithValue("@EmailNotificado", curentity.EmailNotificado);

                SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
                output_Id.Direction = ParameterDirection.Output;
                cmd.Parameters.Add(output_Id);

                cmd.CommandType = CommandType.StoredProcedure;

                await cmd.ExecuteNonQueryAsync();

                if (output_Id.Value != DBNull.Value)
                {
                  curentity.Id = Convert.ToInt64(output_Id.Value);
                    
                }
            

            if (conn.State == System.Data.ConnectionState.Open)
                conn.Close();
        }

        return curentity;
    }


    /**
     * Eliminar objetivos, Actividades y Tareas del Plan Anual
     */
    public async Task<long> funEliminarItemsPlanAnual(ILogger log, int Id, int Tipo, string Created_By)
    {
        long rows = 0;
        string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);



        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();


                SqlCommand cmd = new SqlCommand("[ssoma].[sp_delete_obj_act_task]", conn);

                cmd.Parameters.AddWithValue("@Id", Id);
                cmd.Parameters.AddWithValue("@tipo", Tipo);
                cmd.Parameters.AddWithValue("@iduser", Created_By);

                SqlParameter output_Id = new SqlParameter("@result", SqlDbType.BigInt);
                output_Id.Direction = ParameterDirection.Output;
                cmd.Parameters.Add(output_Id);

                cmd.CommandType = CommandType.StoredProcedure;

                await cmd.ExecuteNonQueryAsync();

                if (output_Id.Value != DBNull.Value)
                {
                  rows = Convert.ToInt64(output_Id.Value);
                    
                }
            

            if (conn.State == System.Data.ConnectionState.Open)
                conn.Close();
        }

        return rows;
    }


        /**
     * Modificar Responsable Actividad
     */
    public async Task<long> funActualizarResponsableActividad(ILogger log, ResponsableActividad curentity )
    {
        long rows = 0;
        string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);

                       log.LogInformation("funActualizarResponsableActividad::"+curentity.Actividad_PlanId );
                        log.LogInformation("funActualizarResponsableActividad::"+curentity.Motivo );
                        log.LogInformation("funActualizarResponsableActividad::"+curentity.Created_By );
                        log.LogInformation("funActualizarResponsableActividad::"+curentity.Old_ResponsableId );
                        log.LogInformation("funActualizarResponsableActividad::"+curentity.Old_ResponsableName );
                        log.LogInformation("funActualizarResponsableActividad::"+curentity.Old_ResponsableCargo );
                        log.LogInformation("funActualizarResponsableActividad::"+curentity.Old_ResponsableCorreo );
                        log.LogInformation("funActualizarResponsableActividad::"+curentity.New_ResponsableId );
                        log.LogInformation("funActualizarResponsableActividad::"+curentity.New_ResponsableName );
                        log.LogInformation("funActualizarResponsableActividad::"+curentity.New_ResponsableCargo );
                        log.LogInformation("funActualizarResponsableActividad::"+curentity.New_ResponsableCorreo );

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();


                SqlCommand cmd = new SqlCommand("[ssoma].[sp_cambiar_responsable_actividad_PA]", conn);

                cmd.Parameters.AddWithValue("@Motivo", curentity.Motivo);
                cmd.Parameters.AddWithValue("@Actividad_PlanId", curentity.Actividad_PlanId);
                cmd.Parameters.AddWithValue("@Created_By", curentity.Created_By);
                cmd.Parameters.AddWithValue("@Old_ResponsableId", curentity.Old_ResponsableId);
                cmd.Parameters.AddWithValue("@Old_ResponsableName", curentity.Old_ResponsableName);
                cmd.Parameters.AddWithValue("@Old_ResponsableCargo", curentity.Old_ResponsableCargo);
                cmd.Parameters.AddWithValue("@Old_ResponsableCorreo", curentity.Old_ResponsableCorreo);
                cmd.Parameters.AddWithValue("@New_ResponsableId", curentity.New_ResponsableId);
                cmd.Parameters.AddWithValue("@New_ResponsableName", curentity.New_ResponsableName);
                cmd.Parameters.AddWithValue("@New_ResponsableCargo", curentity.New_ResponsableCargo);
                cmd.Parameters.AddWithValue("@New_ResponsableCorreo", curentity.New_ResponsableCorreo);

                SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
                output_Id.Direction = ParameterDirection.Output;
                cmd.Parameters.Add(output_Id);

                cmd.CommandType = CommandType.StoredProcedure;

                await cmd.ExecuteNonQueryAsync();

                if (output_Id.Value != DBNull.Value)
                {
                  rows = Convert.ToInt64(output_Id.Value);
                    
                }
            

            if (conn.State == System.Data.ConnectionState.Open)
                conn.Close();
        }

        return rows;
    }


        public async Task<List<ControlCambios>> funGetControlCambios(ILogger log, long Id)
    {

                string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);
        List<ControlCambios> listControCambios = new List<ControlCambios>();
        ControlCambios curentity;

        try
        {
            using (SqlConnection conn3 = new SqlConnection(vvsqlconnectionString))
            {
                conn3.Open();

                SqlCommand cmd = new SqlCommand("[ssoma].[sp_list_control_cambios]", conn3);

                cmd.Parameters.AddWithValue("@ActividadId", Id);

                cmd.CommandType = CommandType.StoredProcedure;

                //Ejecutar Comando buscaremos los hallazgos registrados
                using (SqlDataReader dataReader = await cmd.ExecuteReaderAsync())
                {
                    //Navegar en el Conjunto de Datos Recuperados
                    while (dataReader.Read())
                    {
                        curentity = new ControlCambios();

                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("Actividad_PlanId"))) { curentity.IdActividad = (long)(dataReader.GetValue(dataReader.GetOrdinal("Actividad_PlanId")));}
                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curentity.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id")));}
                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("Flag_Adjunto"))) { curentity.Flag_Adjunto = (int)(dataReader.GetValue(dataReader.GetOrdinal("Flag_Adjunto")));}
                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("Nombre"))) { curentity.Nombre = (string)(dataReader.GetValue(dataReader.GetOrdinal("Nombre")));}

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Date"))) { curentity.Date = (string)(dataReader.GetValue(dataReader.GetOrdinal("Date")));}
                                           
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Cronograma"))) { curentity.Cronograma = (bool)(dataReader.GetValue(dataReader.GetOrdinal("Cronograma")));}

                        listControCambios.Add(curentity);

                    }
                }


                if (conn3.State == System.Data.ConnectionState.Open)
                    conn3.Close();

                log.LogInformation("Leeremos el historia de documentos rechazados de la tarea.");
            }
        }
        catch (Exception ex)
        {
            listControCambios    = new List<ControlCambios>();
            curentity        = new ControlCambios();
            curentity.Id     = 0;
            curentity.Nombre = System.Convert.ToString(ex.Message);

            listControCambios.Add(curentity);

            log.LogInformation("Exception "+curentity.Nombre);

        }


        return listControCambios;



    }

    public async Task<long> funSupervisorEvidencia(ILogger log, UpdateAdjunto curentity )
    {
        long rows = 0;
        string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);
;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

             log.LogInformation("##########################funSupervisorEvidencia##################################EstadoAdjuntoId##. = "+curentity.EstadoAdjuntoId);
             log.LogInformation("##########################funSupervisorEvidencia################################Id####. = "+curentity.Id);

                SqlCommand cmd = new SqlCommand("[ssoma].[sp_supervision_evidencia]", conn);

                cmd.Parameters.AddWithValue("@IdAdjunto", curentity.Id);
                cmd.Parameters.AddWithValue("@Motivo", curentity.Motivo);
                cmd.Parameters.AddWithValue("@EstadoAdjuntoId", curentity.EstadoAdjuntoId);
                //cmd.Parameters.AddWithValue("@Tarea_planId", curentity.Tarea_planId);

                // if (!drT.IsDBNull(drT.GetOrdinal("Id"))) { curobjAdj.Id = (long)(drT.GetValue(drT.GetOrdinal("Id"))); }
                // if (!drT.IsDBNull(drT.GetOrdinal("Tarea_planId"))) { curobjAdj.TareaId = (long)(drT.GetValue(drT.GetOrdinal("Tarea_planId"))); }
                // if (!drT.IsDBNull(drT.GetOrdinal("Nombre_adjunto"))) { curobjAdj.AdjuntoName = (string)(drT.GetValue(drT.GetOrdinal("Nombre_adjunto"))); }
                // if (!drT.IsDBNull(drT.GetOrdinal("FechaSubida"))) { curobjAdj.FechaSubida = (string)(drT.GetValue(drT.GetOrdinal("FechaSubida"))); }
                // if (!drT.IsDBNull(drT.GetOrdinal("Fecha_Sub"))) { curobjAdj.Fecha_Sub = (DateTime)(drT.GetValue(drT.GetOrdinal("Fecha_Sub"))); }
                // if (!drT.IsDBNull(drT.GetOrdinal("EstadoAdjunto"))) { curobjAdj.EstadoAdjunto = (string)(drT.GetValue(drT.GetOrdinal("EstadoAdjunto"))); }
                // if (!drT.IsDBNull(drT.GetOrdinal("AdjuntoCode"))) { curobjAdj.AdjuntoCode = (string)(drT.GetValue(drT.GetOrdinal("AdjuntoCode"))); }
                // if (!drT.IsDBNull(drT.GetOrdinal("Motivo"))) { curobjAdj.Motivo = (string)(drT.GetValue(drT.GetOrdinal("Motivo"))); }
                // if (!drT.IsDBNull(drT.GetOrdinal("Estado_adjuntoId"))) { curobjAdj.EstadoAdjuntoId = (long)(drT.GetValue(drT.GetOrdinal("Estado_adjuntoId"))); }


                 SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
            output_Id.Direction = ParameterDirection.Output;
                cmd.Parameters.Add(output_Id);

                cmd.CommandType = CommandType.StoredProcedure;

                await cmd.ExecuteNonQueryAsync();

                if (output_Id.Value != DBNull.Value)
                {
                  rows = Convert.ToInt64(output_Id.Value);
                    
                }
            

            if (conn.State == System.Data.ConnectionState.Open)
                conn.Close();
        }

        return rows;
    }

}



public class Planes_AnualesPost
{
    public long             Id { get; set; }
    public long             Estado_PlanId {get; set;}
    public long             ProgramaId {get; set;}
    public long             GerenciaId {get; set;}
    public long             SedeId {get; set;}
    public string             EquipoId {get; set;}
    public DateTime         Create_Date {get; set;}
    public string           Create_By {get; set;}
    public string           Code {get; set;}
    public string           Email_Supervisor {get; set;}    
    public string           Last_Update_By {get; set;}
    public DateTime         Last_Update_Date {get; set;}
    public int              Year_Plan {get; set;}
    public List<Objetivo>   Objetivos  {get; set;} 
    public string MotivoSuspencion                {get; set;}
    public int    Suspendido                      {get; set;}
}





public class Objetivo 
{
    public long     Id                     { get; set; }
    public int     Tipo                    { get; set; }
    public string   Objetivo_Name          { get; set; }
    public int      Nun_Actividades        { get; set; }
    public string   Code                   { get; set; }
    public List<SubObjetivo> SubObjetivos  { get; set; } //listado  de subobjetiivos del objetivo
    public List<Actividad> Actividades     { get; set; } //listado  de actividades del objetivo
}

public class SubObjetivo 
{
    public long     Id                  { get; set; }
    public int     Tipo                 { get; set; }
    public string   SubObjetivo_Name    { get; set; }
    public int      Nun_Actividades     { get; set; }
    public string   Code                { get; set; }
    public List<Actividad> Actividades  { get; set; } //listado  de actividades del objetivo
}




public class Actividad
{
    public long     Id                   { get; set; }
    public string   Actividad_Name       { get; set; }
    public long     Objetivo_PlanId      { get; set; }
    public string   ResponsableId        { get; set; }
    public string   ResponsableName      { get; set; }
    public string   ResponsableCargo     { get; set; }
    public string   ResponsableCorreo    { get; set; }
    public string   Code                 { get; set; }
    public int      Peso                 { get; set; }

    public List<Tarea> Tareas            { get; set; } //listado  de Tareas del objetivo
    public List<Cronograma> Cronogramas  { get; set; } //listado  de Tareas del Cronogramas
}





public class Tarea
{

    public long     Id                   { get; set; }
    public long     ActividadId          { get; set; }
    public string   ResponsableId        { get; set; }
    public string   ResponsableName      { get; set; }

    public string   Evidencia_Name       { get; set; }

    public DateTime Fecha_Programada_Ini   { get; set; }
    public DateTime Fecha_Programada_Fin   { get; set; }

    public string Fecha_Ejecutada_Ini    { get; set; }
    public string Fecha_Ejecutada_Fin    { get; set; }

    public int     IdEstado             { get; set; }
    public string   Color                { get; set; }
    public string   Estado               { get; set; }

    
}


public class Cronograma
{
   

     public long    Id                  { get; set; } 
     public long    ActividadPlanId     { get; set; } 
     public int     Year_Frecuencia     { get; set; } 
     public int     Mes_Num             { get; set; } 
     public string  Mes_Name            { get; set; } 
     public string  S1                  { get; set; } 
     public string  S2                  { get; set; } 
     public string  S3                  { get; set; } 
     public string  S4                  { get; set; } 

     public DateTime  Fecha_S1_Ini        { get; set; } 
     public DateTime  Fecha_S1_Fin        { get; set; } 

     public DateTime  Fecha_S2_Ini        { get; set; } 
     public DateTime  Fecha_S2_Fin        { get; set; }

     public DateTime  Fecha_S3_Ini        { get; set; } 
     public DateTime  Fecha_S3_Fin        { get; set; }

     public DateTime  Fecha_S4_Ini        { get; set; } 
     public DateTime  Fecha_S4_Fin        { get; set; }
                  

                  

}

public class AdjuntosTarea
{
    public long Id { get; set; }
    public long TareaId { get; set; }
    public string AdjuntoName { get; set; }
    public string Adjunto { get; set; }
    public string Created_By { get; set; }
}

public class CorreccionPlanAnual
{
    public List<DestinatariosCorreccion> DestinatariosCorreccion { get; set; }
    public long Id { get; set; }
    public string Code { get; set; }
    public string Tipo { get; set; }
    public string Created_By { get; set; }
    public long resul { get; set; }
    public string emailResponsable { get; set; }
    public string nameResponsable{ get; set; }
    public string jobResponsable{ get; set; }
    public string ubicacion{ get; set; }
}

public class DestinatariosCorreccion
{
    public long Id { get; set; }
    public string Name { get; set; }
    public string UserHash { get; set; }
    public string Correo { get; set; }
    public string Cargo { get; set; }
}

public class DataEmailNew
{
    public string sendto { get; set; }
    public string from { get; set; }
    public string emailsubject { get; set; }
    public string bodyhtml { get; set; }
}
public class ResponsableActividad
{
    public string Motivo { get; set; }
    public int Actividad_PlanId { get; set; }
    public string Old_ResponsableId { get; set;}
    public string Old_ResponsableName { get; set;}
    public string Old_ResponsableCargo { get; set;}
    public string Old_ResponsableCorreo { get; set;}
    public string New_ResponsableId { get; set;}
    public string New_ResponsableName { get; set;}
    public string New_ResponsableCargo { get; set;}
    public string New_ResponsableCorreo { get; set;}
    public long resul { get; set; }
    public string Created_By { get; set; }

} 

public class ControlCambios
{
    public long Id { get; set; }
    public long IdActividad { get; set; }
    public bool? Cronograma { get; set; }
    public string Nombre { get; set; }
    public string Adjunto { get; set; }
    public string Date { get; set; }
    public int Flag_Adjunto { get; set; }
}

public class RespControlCambios
{
public long Id { get; set; }
public List<ControlCambios> ControlCambios { get; set; }
    public string Nombre { get; set; }

}

public class Ejecucion 
{
    public long IdPlan { get; set; }
    public long Id { get; set; }
    public string CodePlan { get; set; }
    public string Tipo { get; set; }
    public long IdActividad { get; set; }
    public long IdTarea { get; set; }
    public string NameActividad { get; set; }
    public string EstadoActividad { get; set; }
    public string Ubicacion { get; set; }
    public string Created_By { get; set; }
    public string EmailNotificado { get; set; }
    public string emailResponsable { get; set; }
    public string nameResponsable{ get; set; }
    public string jobResponsable{ get; set; }
    public List<Evidencia> Evidencias { get; set; }
    public List<UpdateAdjunto> Adjuntos { get; set; }

}

public class UpdateAdjunto
{
    public long Id { get; set; }
    public string Motivo { get; set; }
    public long EstadoAdjuntoId { get; set; }
    public long Result { get; set; }
}

public class Evidencia
{
    public string Name  { get; set; }
    public string Estado { get; set; }

}