/****************************************************************************************
* VISUAL SAT - [2021]
* PROYECTO : SIGTASA
* ESQUEMA : SSOMA
* MODULO : GESTIÓN DE PLAN ANUAL
* OPERADORES_________________________________________________________________________
* | # | PROGRAMADOR     |  |      FECHA   |  |   HORA   |           CORREO           |
* | 1 | Andy Vásquez    |  |  08/01/2021  |  | 07:28:50 |    caracas1348@gmail.com   |
* | 2 | Jesús Millán    |  |  01/02/2021  |__|__________|   millanjqesus@gmail.com   |
* |___|_________________|__|______________|__|__________|____________________________|
*
* DESCRIPCION: ARCHIVO SQL BACKEND DE FUNCIONALIDAD EN SERVIDOR DE LAS OPCIONES DEL PLAN ANUAL
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

class DataPlanAnualGetAll
{
    string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);

    public async Task<PlanAnualGet> funGetPlanAnualAllList( ILogger log
                                                            , long Id
                                                            )
    {

        //Objeto de PlanAnual
        PlanAnualGet curobj= new PlanAnualGet();;

        //Objeto de los objetivos del PlanAnual
        ObjetivoGet curobj1;

         //Listado de objetos de StatusPlanAnual
        //List<Objetivo> lcurobj1  = new List<Objetivo>();//ya *****************lcursact1


         //Objeto de los objetivos del PlanAnual
        SubObjetivoGet cursobj1;//cursobj1

        ActividadGet cursact1;
         //Listado de objetos de StatusPlanAnual
        //List<SubObjetivo> lcursobj1  = new List<SubObjetivo>();//ya *****************

        TareaGet curstar1;

        CronogramaGet curscron1;

        ResponsableGet cursResp1;
        ResponsableGet cursResp1S;
        ControlCambiosGet cursCC1S;
        ControlCambiosGet cursCC1;

 
        log.LogInformation("en la funcion funGetPlanAnualAllList "+vvsqlconnectionString);
        //SQL Objects
        try
        {
            log.LogInformation("try");
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                log.LogInformation("using");
                conn.Open();
                log.LogInformation("open");

                SqlCommand cmd = new SqlCommand("[ssoma].[sp_plan_anual_object]", conn);//legue hasta aqui andy

                log.LogInformation("SqlCommand");
                cmd.Parameters.AddWithValue("@Id", Id);

                cmd.CommandType = CommandType.StoredProcedure;
                log.LogInformation("CommandType");
                //Ejecutar Comando buscaremos los Planes Anuales registrados
                using (SqlDataReader dataReader = await cmd.ExecuteReaderAsync())
                {
                    //Navegar en el Conjunto de Datos Recuperados
                    while (dataReader.Read())
                    {
                        

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobj.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code"))) { curobj.Code = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Email_Supervisor"))) { curobj.Email_Supervisor = (string)(dataReader.GetValue(dataReader.GetOrdinal("Email_Supervisor"))); }//ya

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("ProgramaId"))) { curobj.ProgramaId = (long)(dataReader.GetValue(dataReader.GetOrdinal("ProgramaId"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Programa"))) { curobj.Programa = (string)(dataReader.GetValue(dataReader.GetOrdinal("Programa"))); }//ya

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("GerenciaId"))) { curobj.GerenciaId = (long)(dataReader.GetValue(dataReader.GetOrdinal("GerenciaId"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Gerencia"))) { curobj.Gerencia = (string)(dataReader.GetValue(dataReader.GetOrdinal("Gerencia"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code_Gerencia"))) { curobj.Code_Gerencia = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code_Gerencia"))); }//ya

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("SedeId"))) { curobj.SedeId = (long)(dataReader.GetValue(dataReader.GetOrdinal("SedeId"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Sede"))) { curobj.Sede = (string)(dataReader.GetValue(dataReader.GetOrdinal("Sede"))); }//ya

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("SedeId"))) { curobj.SedeId = (long)(dataReader.GetValue(dataReader.GetOrdinal("SedeId"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Sede"))) { curobj.Sede = (string)(dataReader.GetValue(dataReader.GetOrdinal("Sede"))); }//ya

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("EquipoId"))) { curobj.EquipoId = (string)(dataReader.GetValue(dataReader.GetOrdinal("EquipoId"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Equipo"))) { curobj.Equipo = (string)(dataReader.GetValue(dataReader.GetOrdinal("Equipo"))); }//ya

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Fecha_Creacion"))) { curobj.Fecha_Creacion = (string)(dataReader.GetValue(dataReader.GetOrdinal("Fecha_Creacion"))); }

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Estado_PlanId"))) { curobj.Estado_PlanId = (long)(dataReader.GetValue(dataReader.GetOrdinal("Estado_PlanId"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Estado_Plan"))) { curobj.Estado_Plan = (string)(dataReader.GetValue(dataReader.GetOrdinal("Estado_Plan"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Color_Plan"))) { curobj.Color_Plan = (string)(dataReader.GetValue(dataReader.GetOrdinal("Color_Plan"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Year_Plan"))) { curobj.Year_Plan = (int)(dataReader.GetValue(dataReader.GetOrdinal("Year_Plan"))); }//ya


                        //log.LogInformation("En while PlanAnualGet Externo = "+curobj.Id);

                        //********************************************objetivos de plan*****************
                        //Listado de objetos de StatusPlanAnual
                        List<ObjetivoGet> lcurobj1  = new List<ObjetivoGet>();//ya *****************

                        using (SqlConnection conn1 = new SqlConnection(vvsqlconnectionString))
                        {
                            log.LogInformation("Objetivos del Plan Anual = "+curobj.Id);
                            conn1.Open();
                            SqlCommand cmd1 = new SqlCommand("ssoma.sp_objetivo_plan_anual", conn1);
                            cmd1.Parameters.AddWithValue("@PlanId", curobj.Id);
                            cmd1.CommandType = CommandType.StoredProcedure;
                            using (SqlDataReader dr = await cmd1.ExecuteReaderAsync())
                            {
                                //Navegar en el Conjunto de Datos Recuperados
                                while (dr.Read())
                                {
                                    curobj1 = new ObjetivoGet();
                                    if (!dr.IsDBNull(dr.GetOrdinal("Id"))) { curobj1.Id = (long)(dr.GetValue(dr.GetOrdinal("Id"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("Tipo"))) { curobj1.Tipo = (int)(dr.GetValue(dr.GetOrdinal("Tipo"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("Objetivo_Name"))) { curobj1.Objetivo_Name = (string)(dr.GetValue(dr.GetOrdinal("Objetivo_Name"))); }
                                    if (!dr.IsDBNull(dr.GetOrdinal("Code"))) { curobj1.Code = (string)(dr.GetValue(dr.GetOrdinal("Code"))); }
                                    //falta num Actividades
                                    //lista de SubObjetivos
                                    //lista de Actividades


                                    //----------------------------------------subobjetivos del plan-------------------------------------------------
                                    //Listado de objetos de StatusPlanAnual
                                    List<SubObjetivoGet> lcursobj1  = new List<SubObjetivoGet>();//ya *****************

                                    //********************************************

                                    using (SqlConnection conn1_1 = new SqlConnection(vvsqlconnectionString))
                                    {
                                        log.LogInformation("SubObjetivos del Objetivo = "+curobj1.Id);
                                        conn1_1.Open();
                                        SqlCommand cmd1_1 = new SqlCommand("ssoma.sp_sub_objetivos_plan_anual", conn1_1);
                                        cmd1_1.Parameters.AddWithValue("@PadreId", curobj1.Id);
                                        cmd1_1.CommandType = CommandType.StoredProcedure;
                                        using (SqlDataReader dr1_1 = await cmd1_1.ExecuteReaderAsync())
                                        {
                                            //Navegar en el Conjunto de Datos Recuperados
                                            while (dr1_1.Read())
                                            {
                                                cursobj1 = new SubObjetivoGet();
                                                if (!dr1_1.IsDBNull(dr1_1.GetOrdinal("Id"))) { cursobj1.Id = (long)(dr1_1.GetValue(dr1_1.GetOrdinal("Id"))); }
                                                if (!dr1_1.IsDBNull(dr1_1.GetOrdinal("Tipo"))) { cursobj1.Tipo = (int)(dr1_1.GetValue(dr1_1.GetOrdinal("Tipo"))); }
                                                if (!dr1_1.IsDBNull(dr1_1.GetOrdinal("SubObjetivo_Name"))) { cursobj1.SubObjetivo_Name = (string)(dr1_1.GetValue(dr1_1.GetOrdinal("SubObjetivo_Name"))); }
                                                if (!dr1_1.IsDBNull(dr1_1.GetOrdinal("Code"))) { cursobj1.Code = (string)(dr1_1.GetValue(dr1_1.GetOrdinal("Code"))); }


                                                //==================================================================   AQUI VA EL BLOQUE DE CODIGO PARA LAS COSAS DE LOS SUBOBJETIVOS ===================================


                                                //--------------------------------------- actividades del plan-------------------------------------------------
                                                //Listado de Actividades de los objetivos PlanAnual
                                                List<ActividadGet> lcursact1S  = new List<ActividadGet>();//ya *****************

                                                //********************************************

                                                using (SqlConnection conn1_2 = new SqlConnection(vvsqlconnectionString))
                                                {
                                                    log.LogInformation("Activiaddes del SubObjetivo = "+cursobj1.Id);
                                                    conn1_2.Open();
                                                    SqlCommand cmd1_2 = new SqlCommand("ssoma.sp_actividades_objetivo_plan_anual", conn1_2);
                                                    cmd1_2.Parameters.AddWithValue("@ObjetivoId", cursobj1.Id);
                                                    cmd1_2.CommandType = CommandType.StoredProcedure;
                                                    using (SqlDataReader dr1_2 = await cmd1_2.ExecuteReaderAsync())
                                                    {
                                                        //Navegar en el Conjunto de Datos Recuperados
                                                        while (dr1_2.Read())
                                                        {
                                                            cursact1 = new ActividadGet();
                                                            if (!dr1_2.IsDBNull(dr1_2.GetOrdinal("Id"))) { cursact1.Id = (long)(dr1_2.GetValue(dr1_2.GetOrdinal("Id")));}
                                                            if (!dr1_2.IsDBNull(dr1_2.GetOrdinal("Actividad_Name"))) { cursact1.Actividad_Name = (string)(dr1_2.GetValue(dr1_2.GetOrdinal("Actividad_Name"))); }

                                                            if (!dr1_2.IsDBNull(dr1_2.GetOrdinal("Objetivo_PlanId"))) { cursact1.Objetivo_PlanId = (long)(dr1_2.GetValue(dr1_2.GetOrdinal("Objetivo_PlanId"))); }
                                                            if (!dr1_2.IsDBNull(dr1_2.GetOrdinal("ResponsableId"))) { cursact1.ResponsableId = (string)(dr1_2.GetValue(dr1_2.GetOrdinal("ResponsableId"))); }
                                                            if (!dr1_2.IsDBNull(dr1_2.GetOrdinal("ResponsableName"))) { cursact1.ResponsableName = (string)(dr1_2.GetValue(dr1_2.GetOrdinal("ResponsableName"))); }

                                                            if (!dr1_2.IsDBNull(dr1_2.GetOrdinal("ResponsableCargo"))) { cursact1.ResponsableCargo = (string)(dr1_2.GetValue(dr1_2.GetOrdinal("ResponsableCargo"))); }
                                                            if (!dr1_2.IsDBNull(dr1_2.GetOrdinal("ResponsableCorreo"))) { cursact1.ResponsableCorreo = (string)(dr1_2.GetValue(dr1_2.GetOrdinal("ResponsableCorreo"))); }

                                                            if (!dr1_2.IsDBNull(dr1_2.GetOrdinal("Code"))) { cursact1.Code = (string)(dr1_2.GetValue(dr1_2.GetOrdinal("Code"))); }
                                                            if (!dr1_2.IsDBNull(dr1_2.GetOrdinal("Peso"))) { cursact1.Peso = (int)(dr1_2.GetValue(dr1_2.GetOrdinal("Peso"))); }

                                                            //falta   Tareas


                                                            //************************************************************* tareas de la actividad ***************************

                                                            //Listado de Tareas de los objetivos PlanAnual
                                                            List<TareaGet> lcurstar1S  = new List<TareaGet>();//ya *****************

                                                            //********************************************

                                                            using (SqlConnection conn1_2_1 = new SqlConnection(vvsqlconnectionString))
                                                            {
                                                                log.LogInformation("Tareas de Activiad ["+cursact1.Id+"]");
                                                                conn1_2_1.Open();
                                                                SqlCommand cmd1_2_1 = new SqlCommand("ssoma.sp_tareas_actividad_objetivo_plan_anual", conn1_2_1);
                                                                cmd1_2_1.Parameters.AddWithValue("@ActividadId", cursact1.Id);
                                                                cmd1_2_1.CommandType = CommandType.StoredProcedure;
                                                                using (SqlDataReader dr1_2_1 = await cmd1_2_1.ExecuteReaderAsync())
                                                                {
                                                                    //Navegar en el Conjunto de Datos Recuperados
                                                                    while (dr1_2_1.Read())
                                                                    {
                                                                        curstar1 = new TareaGet();

                                                                        if (!dr1_2_1.IsDBNull(dr1_2_1.GetOrdinal("Id"))) { curstar1.Id = (long)(dr1_2_1.GetValue(dr1_2_1.GetOrdinal("Id")));}
                                                                        if (!dr1_2_1.IsDBNull(dr1_2_1.GetOrdinal("ActividadId"))) { curstar1.ActividadId = (long)(dr1_2_1.GetValue(dr1_2_1.GetOrdinal("ActividadId")));}
                                                                        if (!dr1_2_1.IsDBNull(dr1_2_1.GetOrdinal("ResponsableId"))) { curstar1.ResponsableId = (string)(dr1_2_1.GetValue(dr1_2_1.GetOrdinal("ResponsableId"))); }
                                                                        if (!dr1_2_1.IsDBNull(dr1_2_1.GetOrdinal("ResponsableName"))) { curstar1.ResponsableName = (string)(dr1_2_1.GetValue(dr1_2_1.GetOrdinal("ResponsableName"))); }
                                                                        if (!dr1_2_1.IsDBNull(dr1_2_1.GetOrdinal("Evidencia_Name"))) { curstar1.Evidencia_Name = (string)(dr1_2_1.GetValue(dr1_2_1.GetOrdinal("Evidencia_Name"))); }




                                                                        if (!dr1_2_1.IsDBNull(dr1_2_1.GetOrdinal("Fecha_Programada_Ini"))) { curstar1.Fecha_Programada_Ini = (string)(dr1_2_1.GetValue(dr1_2_1.GetOrdinal("Fecha_Programada_Ini"))); }
                                                                        if (!dr1_2_1.IsDBNull(dr1_2_1.GetOrdinal("Fecha_Programada_Fin"))) { curstar1.Fecha_Programada_Fin = (string)(dr1_2_1.GetValue(dr1_2_1.GetOrdinal("Fecha_Programada_Fin"))); }

                                                                        if (!dr1_2_1.IsDBNull(dr1_2_1.GetOrdinal("Fecha_Ejecutada_Ini"))) { curstar1.Fecha_Ejecutada_Ini = (string)(dr1_2_1.GetValue(dr1_2_1.GetOrdinal("Fecha_Ejecutada_Ini"))); }
                                                                        if (!dr1_2_1.IsDBNull(dr1_2_1.GetOrdinal("Fecha_Ejecutada_Fin"))) { curstar1.Fecha_Ejecutada_Fin = (string)(dr1_2_1.GetValue(dr1_2_1.GetOrdinal("Fecha_Ejecutada_Fin"))); }
                                                                        if (!dr1_2_1.IsDBNull(dr1_2_1.GetOrdinal("IdEstado"))) { curstar1.IdEstado = (int)(dr1_2_1.GetValue(dr1_2_1.GetOrdinal("IdEstado")));}


                                                                        if (!dr1_2_1.IsDBNull(dr1_2_1.GetOrdinal("Color"))) { curstar1.Color = (string)(dr1_2_1.GetValue(dr1_2_1.GetOrdinal("Color"))); }

                                                                        if (!dr1_2_1.IsDBNull(dr1_2_1.GetOrdinal("Estado"))) { curstar1.Estado = (string)(dr1_2_1.GetValue(dr1_2_1.GetOrdinal("Estado"))); }

                                                                        // Leeremos los adjuntos de la tarea curstar1.Id START
                                                                        using (SqlConnection conn2 = new SqlConnection(vvsqlconnectionString))
                                                                        {
                                                                            conn2.Open();

                                                                            log.LogInformation("Leeremos los adjuntos de la tarea.");

                                                                            SqlCommand cmd2 = new SqlCommand("[ssoma].[get_pa_adjunto_by_tarea_id]", conn2);
                                                                            cmd2.Parameters.AddWithValue("@TareaId", curstar1.Id);
                                                                            cmd2.CommandType = CommandType.StoredProcedure;

                                                                            List<AdjuntosGet> listAdjuntos = new List<AdjuntosGet>();

                                                                            using (SqlDataReader drT = await cmd2.ExecuteReaderAsync())
                                                                            {

                                                                                while (drT.Read())
                                                                                {
                                                                                    AdjuntosGet curobjAdj = new AdjuntosGet();
                                                                                    log.LogInformation("despues de Adjuntos curobjAdj "+curstar1.Id);

                                                                                    if (!drT.IsDBNull(drT.GetOrdinal("Id"))) { curobjAdj.Id = (long)(drT.GetValue(drT.GetOrdinal("Id"))); }
                                                                                    if (!drT.IsDBNull(drT.GetOrdinal("Tarea_planId"))) { curobjAdj.TareaId = (long)(drT.GetValue(drT.GetOrdinal("Tarea_planId"))); }
                                                                                    if (!drT.IsDBNull(drT.GetOrdinal("Nombre_adjunto"))) { curobjAdj.AdjuntoName = (string)(drT.GetValue(drT.GetOrdinal("Nombre_adjunto"))); }
                                                                                    if (!drT.IsDBNull(drT.GetOrdinal("FechaSubida"))) { curobjAdj.FechaSubida = (string)(drT.GetValue(drT.GetOrdinal("FechaSubida"))); }
                                                                                    if (!drT.IsDBNull(drT.GetOrdinal("Fecha_Sub"))) { curobjAdj.Fecha_Sub = (DateTime)(drT.GetValue(drT.GetOrdinal("Fecha_Sub"))); }
                                                                                    if (!drT.IsDBNull(drT.GetOrdinal("EstadoAdjunto"))) { curobjAdj.EstadoAdjunto = (string)(drT.GetValue(drT.GetOrdinal("EstadoAdjunto"))); }
                                                                                    if (!drT.IsDBNull(drT.GetOrdinal("AdjuntoCode"))) { curobjAdj.AdjuntoCode = (string)(drT.GetValue(drT.GetOrdinal("AdjuntoCode"))); }
                                                                                    if (!drT.IsDBNull(drT.GetOrdinal("Motivo"))) { curobjAdj.Motivo = (string)(drT.GetValue(drT.GetOrdinal("Motivo"))); }
                                                                                    if (!drT.IsDBNull(drT.GetOrdinal("Estado_adjuntoId"))) { curobjAdj.EstadoAdjuntoId = (long)(drT.GetValue(drT.GetOrdinal("Estado_adjuntoId"))); }

                                                                                    listAdjuntos.Add(curobjAdj);
                                                                                }

                                                                                curstar1.Adjuntos = listAdjuntos;
                                                                            }

                                                                            if (conn2.State == System.Data.ConnectionState.Open)
                                                                                conn2.Close();
                                                                        }
                                                                        // Leeremos los adjuntos de la tarea curstar1.Id END

                                                                        // LEEREMOS EL HISTORIAL DE DOCUMENTOS RECHAZADOS DE LA TAREA START
                                                                        curstar1.Historial = await funGetHistorialRechazosDocumentos(log, curstar1.Id);
                                                                        // LEEREMOS EL HISTORIAL DE DOCUMENTOS RECHAZADOS DE LA TAREA END


                                                                        funGetPlanAnualAllList2(log, curstar1.Id);

                                                                         //curobj1.Nun_Actividades = 500;
                                                                         log.LogInformation("*** Tarea = "+curstar1.Id);
                                                                         lcurstar1S.Add(curstar1);
                                                                    }
                                                                        if (conn1_2_1.State == System.Data.ConnectionState.Open)
                                                                        conn1_2_1.Close();
                                                                        cursact1.Tareas = lcurstar1S;
                                                                }

                                                            }

                                                            //************************************************************* fin de la tarea de la actividad *******************





                                                            //************************************************************* tareas de la Frecuencia Cronograma ***************************

                                                            //Listado de Tareas de los objetivos PlanAnual
                                                            List<CronogramaGet> lcurscron1S  = new List<CronogramaGet>();//ya *****************

                                                            //********************************************

                                                            using (SqlConnection conn1_2_2 = new SqlConnection(vvsqlconnectionString))
                                                            {
                                                               log.LogInformation("Cronogramas de la Activiad ["+cursact1.Id+"]");
                                                                conn1_2_2.Open();
                                                                SqlCommand cmd1_2_2 = new SqlCommand("ssoma.sp_frecuencia_cronograma_actividad_plan_anual", conn1_2_2);
                                                                cmd1_2_2.Parameters.AddWithValue("@ActividadId", cursact1.Id);
                                                                cmd1_2_2.CommandType = CommandType.StoredProcedure;
                                                                 using (SqlDataReader dr1_2_2 = await cmd1_2_2.ExecuteReaderAsync())
                                                                {

                                                                    //Navegar en el Conjunto de Datos Recuperados
                                                                    while (dr1_2_2.Read())
                                                                    {
                                                                        curscron1 = new CronogramaGet();


                                                                        if (!dr1_2_2.IsDBNull(dr1_2_2.GetOrdinal("Id"))) { curscron1.Id = (long)(dr1_2_2.GetValue(dr1_2_2.GetOrdinal("Id")));}
                                                                        if (!dr1_2_2.IsDBNull(dr1_2_2.GetOrdinal("ActividadPlanId"))) { curscron1.ActividadPlanId = (long)(dr1_2_2.GetValue(dr1_2_2.GetOrdinal("ActividadPlanId")));}

                                                                        if (!dr1_2_2.IsDBNull(dr1_2_2.GetOrdinal("Year_Frecuencia"))) { curscron1.Year_Frecuencia = (int)(dr1_2_2.GetValue(dr1_2_2.GetOrdinal("Year_Frecuencia")));}
                                                                        if (!dr1_2_2.IsDBNull(dr1_2_2.GetOrdinal("Mes_Num"))) { curscron1.Mes_Num = (int)(dr1_2_2.GetValue(dr1_2_2.GetOrdinal("Mes_Num")));}
                                                                        if (!dr1_2_2.IsDBNull(dr1_2_2.GetOrdinal("Mes_Name"))) { curscron1.Mes_Name = (string)(dr1_2_2.GetValue(dr1_2_2.GetOrdinal("Mes_Name"))); }

                                                                        if (!dr1_2_2.IsDBNull(dr1_2_2.GetOrdinal("S1"))) { curscron1.S1 = (string)(dr1_2_2.GetValue(dr1_2_2.GetOrdinal("S1"))); }
                                                                        if (!dr1_2_2.IsDBNull(dr1_2_2.GetOrdinal("S2"))) { curscron1.S2 = (string)(dr1_2_2.GetValue(dr1_2_2.GetOrdinal("S2"))); }
                                                                        if (!dr1_2_2.IsDBNull(dr1_2_2.GetOrdinal("S3"))) { curscron1.S3 = (string)(dr1_2_2.GetValue(dr1_2_2.GetOrdinal("S3"))); }
                                                                        if (!dr1_2_2.IsDBNull(dr1_2_2.GetOrdinal("S4"))) { curscron1.S4 = (string)(dr1_2_2.GetValue(dr1_2_2.GetOrdinal("S4"))); }

                                                                        if (!dr1_2_2.IsDBNull(dr1_2_2.GetOrdinal("Fecha_S1_Ini"))) { curscron1.Fecha_S1_Ini = (string)(dr1_2_2.GetValue(dr1_2_2.GetOrdinal("Fecha_S1_Ini"))); }
                                                                        if (!dr1_2_2.IsDBNull(dr1_2_2.GetOrdinal("Fecha_S1_Fin"))) { curscron1.Fecha_S1_Fin = (string)(dr1_2_2.GetValue(dr1_2_2.GetOrdinal("Fecha_S1_Fin"))); }



                                                                        if (!dr1_2_2.IsDBNull(dr1_2_2.GetOrdinal("Fecha_S2_Ini"))) { curscron1.Fecha_S2_Ini = (string)(dr1_2_2.GetValue(dr1_2_2.GetOrdinal("Fecha_S2_Ini"))); }
                                                                        if (!dr1_2_2.IsDBNull(dr1_2_2.GetOrdinal("Fecha_S2_Fin"))) { curscron1.Fecha_S2_Fin = (string)(dr1_2_2.GetValue(dr1_2_2.GetOrdinal("Fecha_S2_Fin"))); }

                                                                        if (!dr1_2_2.IsDBNull(dr1_2_2.GetOrdinal("Fecha_S3_Ini"))) { curscron1.Fecha_S3_Ini = (string)(dr1_2_2.GetValue(dr1_2_2.GetOrdinal("Fecha_S3_Ini"))); }
                                                                        if (!dr1_2_2.IsDBNull(dr1_2_2.GetOrdinal("Fecha_S3_Fin"))) { curscron1.Fecha_S3_Fin = (string)(dr1_2_2.GetValue(dr1_2_2.GetOrdinal("Fecha_S3_Fin"))); }

                                                                        if (!dr1_2_2.IsDBNull(dr1_2_2.GetOrdinal("Fecha_S4_Ini"))) { curscron1.Fecha_S4_Ini = (string)(dr1_2_2.GetValue(dr1_2_2.GetOrdinal("Fecha_S4_Ini"))); }
                                                                        if (!dr1_2_2.IsDBNull(dr1_2_2.GetOrdinal("Fecha_S4_Fin"))) { curscron1.Fecha_S4_Fin = (string)(dr1_2_2.GetValue(dr1_2_2.GetOrdinal("Fecha_S4_Fin"))); }




                                                                         log.LogInformation("*** Cronograma = "+cursact1.Id);
                                                                         lcurscron1S.Add(curscron1);
                                                                    }

                                                                        if (conn1_2_2.State == System.Data.ConnectionState.Open)
                                                                        conn1_2_2.Close();
                                                                        cursact1.Cronogramas = lcurscron1S;

                                                                }


                                                            }

                                List<ControlCambiosGet> lcursCC1S  = new List<ControlCambiosGet>();//ya *****************

                                //********************************************

                                using (SqlConnection conn1_2_CC = new SqlConnection(vvsqlconnectionString))
                                {
                                   log.LogInformation("ControlCambios de la Activiad ["+cursact1.Id+"]");
                                    conn1_2_CC.Open();
                                    SqlCommand cmd1_2_CC = new SqlCommand("ssoma.sp_list_control_cambios", conn1_2_CC);
                                    cmd1_2_CC.Parameters.AddWithValue("@ActividadId", cursact1.Id);
                                    cmd1_2_CC.CommandType = CommandType.StoredProcedure;
                                     using (SqlDataReader dr1_2_4CC = await cmd1_2_CC.ExecuteReaderAsync())
                                    {

                                        //Navegar en el Conjunto de Datos Recuperados
                                        while (dr1_2_4CC.Read())
                                        {
                                            cursCC1S = new ControlCambiosGet();

                                            if (!dr1_2_4CC.IsDBNull(dr1_2_4CC.GetOrdinal("Id"))) { cursCC1S.Id = (long)(dr1_2_4CC.GetValue(dr1_2_4CC.GetOrdinal("Id")));}
                                            if (!dr1_2_4CC.IsDBNull(dr1_2_4CC.GetOrdinal("Nombre"))) { cursCC1S.Nombre = (string)(dr1_2_4CC.GetValue(dr1_2_4CC.GetOrdinal("Nombre")));}
                                            if (!dr1_2_4CC.IsDBNull(dr1_2_4CC.GetOrdinal("Flag_Adjunto"))) { cursCC1S.Flag_Adjunto = (int)(dr1_2_4CC.GetValue(dr1_2_4CC.GetOrdinal("Flag_Adjunto")));}


                                            if (!dr1_2_4CC.IsDBNull(dr1_2_4CC.GetOrdinal("Date"))) { cursCC1S.Date = (string)(dr1_2_4CC.GetValue(dr1_2_4CC.GetOrdinal("Date")));}
                                           
                                            if (!dr1_2_4CC.IsDBNull(dr1_2_4CC.GetOrdinal("Cronograma"))) { cursCC1S.Cronograma = (bool)(dr1_2_4CC.GetValue(dr1_2_4CC.GetOrdinal("Cronograma")));}



                                             log.LogInformation("*** CONTROL = "+cursact1.Id);
                                             lcursCC1S.Add(cursCC1S);
                                        }

                                            if (conn1_2_CC.State == System.Data.ConnectionState.Open)
                                            conn1_2_CC.Close();
                                            cursact1.ControlCambios = lcursCC1S;

                                    }


                                }


                                List<ResponsableGet> lcursResp1S  = new List<ResponsableGet>();//ya *****************

                                //********************************************

                                using (SqlConnection conn1_2_RS = new SqlConnection(vvsqlconnectionString))
                                {
                                   log.LogInformation("Responsable de la Activiad ["+cursact1.Id+"]");
                                    conn1_2_RS.Open();
                                    SqlCommand cmd1_2_RS = new SqlCommand("ssoma.sp_list_responsable_actividad", conn1_2_RS);
                                    cmd1_2_RS.Parameters.AddWithValue("@ActividadId", cursact1.Id);
                                    cmd1_2_RS.CommandType = CommandType.StoredProcedure;
                                     using (SqlDataReader dr1_2_3S = await cmd1_2_RS.ExecuteReaderAsync())
                                    {

                                        //Navegar en el Conjunto de Datos Recuperados
                                        while (dr1_2_3S.Read())
                                        {
                                            cursResp1S = new ResponsableGet();

                                            if (!dr1_2_3S.IsDBNull(dr1_2_3S.GetOrdinal("Motivo"))) { cursResp1S.Motivo = (string)(dr1_2_3S.GetValue(dr1_2_3S.GetOrdinal("Motivo")));}
                                            if (!dr1_2_3S.IsDBNull(dr1_2_3S.GetOrdinal("Old_ResponsableName"))) { cursResp1S.Old_ResponsableName = (string)(dr1_2_3S.GetValue(dr1_2_3S.GetOrdinal("Old_ResponsableName")));}

                                            if (!dr1_2_3S.IsDBNull(dr1_2_3S.GetOrdinal("New_ResponsableName"))) { cursResp1S.New_ResponsableName = (string)(dr1_2_3S.GetValue(dr1_2_3S.GetOrdinal("New_ResponsableName")));}
                                            if (!dr1_2_3S.IsDBNull(dr1_2_3S.GetOrdinal("Date"))) { cursResp1S.Date = (string)(dr1_2_3S.GetValue(dr1_2_3S.GetOrdinal("Date")));}
                                           


                                             log.LogInformation("*** Cronograma = "+cursact1.Id);
                                             lcursResp1S.Add(cursResp1S);
                                        }

                                            if (conn1_2_RS.State == System.Data.ConnectionState.Open)
                                            conn1_2_RS.Close();
                                            cursact1.Responsable = lcursResp1S;

                                    }


                                }



                                            //************************************************************* tareas de la Frecuencia Cronograma    *******************







                                            //falta   Cronogramas

                                            //curobj1.Nun_Actividades++;

                                             cursobj1.Nun_Actividades++;

                                             log.LogInformation("Actividad = "+cursobj1.Id);
                                             lcursact1S.Add(cursact1);
                                        }
                                            if (conn1_2.State == System.Data.ConnectionState.Open)
                                            conn1_2.Close();
                                            cursobj1.Actividades = lcursact1S;
                                    }

                                }

                                // //********************************************
                                //lobjs.Add(curobj);

                                //----------------------------------------actividades del plan--------------------------------------------------




                                //==================================================================   AQUI VA EL BLOQUE DE CODIGO PARA LAS COSAS DE LOS SUBOBJETIVOS ===================================

                                //falta num Actividades
                                //lista de SubObjetivos
                                //lista de Actividades

                                 log.LogInformation("SubObjetivo = "+cursobj1.Id);
                                 lcursobj1.Add(cursobj1);
                            }
                                if (conn1_1.State == System.Data.ConnectionState.Open)
                                conn1_1.Close();
                                curobj1.SubObjetivos = lcursobj1;
                        }

                    }

                    //********************************************
                    //lobjs.Add(curobj);

                    //----------------------------------------subobjteivos del plan--------------------------------------------------




                    //--------------------------------------- actividades del plan-------------------------------------------------
                    //Listado de Actividades de los objetivos PlanAnual
                    List<ActividadGet> lcursact1  = new List<ActividadGet>();//ya *****************

                    //********************************************

                    using (SqlConnection conn1_2 = new SqlConnection(vvsqlconnectionString))
                    {
                        log.LogInformation("Activiaddes del Objetivo = "+curobj1.Id);
                        conn1_2.Open();
                        SqlCommand cmd1_2 = new SqlCommand("ssoma.sp_actividades_objetivo_plan_anual", conn1_2);
                        cmd1_2.Parameters.AddWithValue("@ObjetivoId", curobj1.Id);
                        cmd1_2.CommandType = CommandType.StoredProcedure;
                        using (SqlDataReader dr1_2 = await cmd1_2.ExecuteReaderAsync())
                        {
                            //Navegar en el Conjunto de Datos Recuperados
                            while (dr1_2.Read())
                            {
                                cursact1 = new ActividadGet();
                                if (!dr1_2.IsDBNull(dr1_2.GetOrdinal("Id"))) { cursact1.Id = (long)(dr1_2.GetValue(dr1_2.GetOrdinal("Id")));}
                                if (!dr1_2.IsDBNull(dr1_2.GetOrdinal("Actividad_Name"))) { cursact1.Actividad_Name = (string)(dr1_2.GetValue(dr1_2.GetOrdinal("Actividad_Name"))); }

                                if (!dr1_2.IsDBNull(dr1_2.GetOrdinal("Objetivo_PlanId"))) { cursact1.Objetivo_PlanId = (long)(dr1_2.GetValue(dr1_2.GetOrdinal("Objetivo_PlanId"))); }
                                if (!dr1_2.IsDBNull(dr1_2.GetOrdinal("ResponsableId"))) { cursact1.ResponsableId = (string)(dr1_2.GetValue(dr1_2.GetOrdinal("ResponsableId"))); }
                                if (!dr1_2.IsDBNull(dr1_2.GetOrdinal("ResponsableName"))) { cursact1.ResponsableName = (string)(dr1_2.GetValue(dr1_2.GetOrdinal("ResponsableName"))); }

                                if (!dr1_2.IsDBNull(dr1_2.GetOrdinal("ResponsableCargo"))) { cursact1.ResponsableCargo = (string)(dr1_2.GetValue(dr1_2.GetOrdinal("ResponsableCargo"))); }
                                if (!dr1_2.IsDBNull(dr1_2.GetOrdinal("ResponsableCorreo"))) { cursact1.ResponsableCorreo = (string)(dr1_2.GetValue(dr1_2.GetOrdinal("ResponsableCorreo"))); }

                                if (!dr1_2.IsDBNull(dr1_2.GetOrdinal("Code"))) { cursact1.Code = (string)(dr1_2.GetValue(dr1_2.GetOrdinal("Code"))); }
                                if (!dr1_2.IsDBNull(dr1_2.GetOrdinal("Peso"))) { cursact1.Peso = (int)(dr1_2.GetValue(dr1_2.GetOrdinal("Peso"))); }

                                //falta   Tareas

                                //************************************************************* tareas de la actividad ***************************

                                //Listado de Tareas de los objetivos PlanAnual
                                List<TareaGet> lcurstar1  = new List<TareaGet>();//ya *****************

                                //********************************************

                                using (SqlConnection conn1_2_1 = new SqlConnection(vvsqlconnectionString))
                                {
                                    log.LogInformation("Tareas de Activiad ["+cursact1.Id+"]");
                                    conn1_2_1.Open();
                                    SqlCommand cmd1_2_1 = new SqlCommand("ssoma.sp_tareas_actividad_objetivo_plan_anual", conn1_2_1);
                                    cmd1_2_1.Parameters.AddWithValue("@ActividadId", cursact1.Id);
                                    cmd1_2_1.CommandType = CommandType.StoredProcedure;
                                    using (SqlDataReader dr1_2_1 = await cmd1_2_1.ExecuteReaderAsync())
                                    {
                                        //Navegar en el Conjunto de Datos Recuperados
                                        while (dr1_2_1.Read())
                                        {
                                            curstar1 = new TareaGet();

                                            if (!dr1_2_1.IsDBNull(dr1_2_1.GetOrdinal("Id"))) { curstar1.Id = (long)(dr1_2_1.GetValue(dr1_2_1.GetOrdinal("Id")));}
                                            if (!dr1_2_1.IsDBNull(dr1_2_1.GetOrdinal("ActividadId"))) { curstar1.ActividadId = (long)(dr1_2_1.GetValue(dr1_2_1.GetOrdinal("ActividadId")));}
                                            if (!dr1_2_1.IsDBNull(dr1_2_1.GetOrdinal("ResponsableId"))) { curstar1.ResponsableId = (string)(dr1_2_1.GetValue(dr1_2_1.GetOrdinal("ResponsableId"))); }
                                            if (!dr1_2_1.IsDBNull(dr1_2_1.GetOrdinal("ResponsableName"))) { curstar1.ResponsableName = (string)(dr1_2_1.GetValue(dr1_2_1.GetOrdinal("ResponsableName"))); }
                                            if (!dr1_2_1.IsDBNull(dr1_2_1.GetOrdinal("Evidencia_Name"))) { curstar1.Evidencia_Name = (string)(dr1_2_1.GetValue(dr1_2_1.GetOrdinal("Evidencia_Name"))); }




                                            if (!dr1_2_1.IsDBNull(dr1_2_1.GetOrdinal("Fecha_Programada_Ini"))) { curstar1.Fecha_Programada_Ini = (string)(dr1_2_1.GetValue(dr1_2_1.GetOrdinal("Fecha_Programada_Ini"))); }
                                            if (!dr1_2_1.IsDBNull(dr1_2_1.GetOrdinal("Fecha_Programada_Fin"))) { curstar1.Fecha_Programada_Fin = (string)(dr1_2_1.GetValue(dr1_2_1.GetOrdinal("Fecha_Programada_Fin"))); }

                                            if (!dr1_2_1.IsDBNull(dr1_2_1.GetOrdinal("Fecha_Ejecutada_Ini"))) { curstar1.Fecha_Ejecutada_Ini = (string)(dr1_2_1.GetValue(dr1_2_1.GetOrdinal("Fecha_Ejecutada_Ini"))); }
                                            if (!dr1_2_1.IsDBNull(dr1_2_1.GetOrdinal("Fecha_Ejecutada_Fin"))) { curstar1.Fecha_Ejecutada_Fin = (string)(dr1_2_1.GetValue(dr1_2_1.GetOrdinal("Fecha_Ejecutada_Fin"))); }
                                            if (!dr1_2_1.IsDBNull(dr1_2_1.GetOrdinal("IdEstado"))) { curstar1.IdEstado = (int)(dr1_2_1.GetValue(dr1_2_1.GetOrdinal("IdEstado")));}


                                            if (!dr1_2_1.IsDBNull(dr1_2_1.GetOrdinal("Color"))) { curstar1.Color = (string)(dr1_2_1.GetValue(dr1_2_1.GetOrdinal("Color"))); }

                                            if (!dr1_2_1.IsDBNull(dr1_2_1.GetOrdinal("Estado"))) { curstar1.Estado = (string)(dr1_2_1.GetValue(dr1_2_1.GetOrdinal("Estado"))); }

                                            // Leeremos los adjuntos de la tarea curstar1.Id START
                                            using (SqlConnection conn2 = new SqlConnection(vvsqlconnectionString))
                                            {
                                                conn2.Open();

                                                log.LogInformation("Leeremos los adjuntos de la tarea.");

                                                SqlCommand cmd2 = new SqlCommand("[ssoma].[get_pa_adjunto_by_tarea_id]", conn2);
                                                cmd2.Parameters.AddWithValue("@TareaId", curstar1.Id);
                                                cmd2.CommandType = CommandType.StoredProcedure;

                                                List<AdjuntosGet> listAdjuntos = new List<AdjuntosGet>();

                                                using (SqlDataReader drT = await cmd2.ExecuteReaderAsync())
                                                {

                                                    while (drT.Read())
                                                    {
                                                        AdjuntosGet curobjAdj = new AdjuntosGet();
                                                        log.LogInformation("despues de Adjuntos curobjAdj "+curstar1.Id);

                                                        if (!drT.IsDBNull(drT.GetOrdinal("Id"))) { curobjAdj.Id = (long)(drT.GetValue(drT.GetOrdinal("Id"))); }
                                                        if (!drT.IsDBNull(drT.GetOrdinal("Tarea_planId"))) { curobjAdj.TareaId = (long)(drT.GetValue(drT.GetOrdinal("Tarea_planId"))); }
                                                        if (!drT.IsDBNull(drT.GetOrdinal("Nombre_adjunto"))) { curobjAdj.AdjuntoName = (string)(drT.GetValue(drT.GetOrdinal("Nombre_adjunto"))); }
                                                        if (!drT.IsDBNull(drT.GetOrdinal("FechaSubida"))) { curobjAdj.FechaSubida = (string)(drT.GetValue(drT.GetOrdinal("FechaSubida"))); }
                                                        if (!drT.IsDBNull(drT.GetOrdinal("Fecha_Sub"))) { curobjAdj.Fecha_Sub = (DateTime)(drT.GetValue(drT.GetOrdinal("Fecha_Sub"))); }
                                                        if (!drT.IsDBNull(drT.GetOrdinal("EstadoAdjunto"))) { curobjAdj.EstadoAdjunto = (string)(drT.GetValue(drT.GetOrdinal("EstadoAdjunto"))); }
                                                        if (!drT.IsDBNull(drT.GetOrdinal("AdjuntoCode"))) { curobjAdj.AdjuntoCode = (string)(drT.GetValue(drT.GetOrdinal("AdjuntoCode"))); }
                                                        if (!drT.IsDBNull(drT.GetOrdinal("Motivo"))) { curobjAdj.Motivo = (string)(drT.GetValue(drT.GetOrdinal("Motivo"))); }
                                                        if (!drT.IsDBNull(drT.GetOrdinal("Estado_adjuntoId"))) { curobjAdj.EstadoAdjuntoId = (long)(drT.GetValue(drT.GetOrdinal("Estado_adjuntoId"))); }

                                                        listAdjuntos.Add(curobjAdj);
                                                    }

                                                    curstar1.Adjuntos = listAdjuntos;
                                                }

                                                if (conn2.State == System.Data.ConnectionState.Open)
                                                    conn2.Close();
                                            }
                                            // Leeremos los adjuntos de la tarea curstar1.Id END

                                            // LEEREMOS EL HISTORIAL DE DOCUMENTOS RECHAZADOS DE LA TAREA START
                                            curstar1.Historial = await funGetHistorialRechazosDocumentos(log, curstar1.Id);
                                            // LEEREMOS EL HISTORIAL DE DOCUMENTOS RECHAZADOS DE LA TAREA END


                                            funGetPlanAnualAllList2(log, curstar1.Id);

                                             //curobj1.Nun_Actividades = 500;
                                             log.LogInformation("OBJ *** Tarea = "+curstar1.Id);
                                             lcurstar1.Add(curstar1);
                                        }
                                            if (conn1_2_1.State == System.Data.ConnectionState.Open)
                                            conn1_2_1.Close();
                                            cursact1.Tareas = lcurstar1;
                                    }

                                }



                                //************************************************************* fin de la tarea de la actividad *******************












                                //************************************************************* tareas de la Frecuencia Cronograma ***************************

                                //Listado de Tareas de los objetivos PlanAnual
                                List<CronogramaGet> lcurscron1  = new List<CronogramaGet>();//ya *****************

                                //********************************************

                                using (SqlConnection conn1_2_2 = new SqlConnection(vvsqlconnectionString))
                                {
                                   log.LogInformation("Cronogramas de la Activiad ["+cursact1.Id+"]");
                                    conn1_2_2.Open();
                                    SqlCommand cmd1_2_2 = new SqlCommand("ssoma.sp_frecuencia_cronograma_actividad_plan_anual", conn1_2_2);
                                    cmd1_2_2.Parameters.AddWithValue("@ActividadId", cursact1.Id);
                                    cmd1_2_2.CommandType = CommandType.StoredProcedure;
                                     using (SqlDataReader dr1_2_2 = await cmd1_2_2.ExecuteReaderAsync())
                                    {

                                        //Navegar en el Conjunto de Datos Recuperados
                                        while (dr1_2_2.Read())
                                        {
                                            curscron1 = new CronogramaGet();


                                            if (!dr1_2_2.IsDBNull(dr1_2_2.GetOrdinal("Id"))) { curscron1.Id = (long)(dr1_2_2.GetValue(dr1_2_2.GetOrdinal("Id")));}
                                            if (!dr1_2_2.IsDBNull(dr1_2_2.GetOrdinal("ActividadPlanId"))) { curscron1.ActividadPlanId = (long)(dr1_2_2.GetValue(dr1_2_2.GetOrdinal("ActividadPlanId")));}

                                            if (!dr1_2_2.IsDBNull(dr1_2_2.GetOrdinal("Year_Frecuencia"))) { curscron1.Year_Frecuencia = (int)(dr1_2_2.GetValue(dr1_2_2.GetOrdinal("Year_Frecuencia")));}
                                            if (!dr1_2_2.IsDBNull(dr1_2_2.GetOrdinal("Mes_Num"))) { curscron1.Mes_Num = (int)(dr1_2_2.GetValue(dr1_2_2.GetOrdinal("Mes_Num")));}
                                            if (!dr1_2_2.IsDBNull(dr1_2_2.GetOrdinal("Mes_Name"))) { curscron1.Mes_Name = (string)(dr1_2_2.GetValue(dr1_2_2.GetOrdinal("Mes_Name"))); }

                                            if (!dr1_2_2.IsDBNull(dr1_2_2.GetOrdinal("S1"))) { curscron1.S1 = (string)(dr1_2_2.GetValue(dr1_2_2.GetOrdinal("S1"))); }
                                            if (!dr1_2_2.IsDBNull(dr1_2_2.GetOrdinal("S2"))) { curscron1.S2 = (string)(dr1_2_2.GetValue(dr1_2_2.GetOrdinal("S2"))); }
                                            if (!dr1_2_2.IsDBNull(dr1_2_2.GetOrdinal("S3"))) { curscron1.S3 = (string)(dr1_2_2.GetValue(dr1_2_2.GetOrdinal("S3"))); }
                                            if (!dr1_2_2.IsDBNull(dr1_2_2.GetOrdinal("S4"))) { curscron1.S4 = (string)(dr1_2_2.GetValue(dr1_2_2.GetOrdinal("S4"))); }

                                            if (!dr1_2_2.IsDBNull(dr1_2_2.GetOrdinal("Fecha_S1_Ini"))) { curscron1.Fecha_S1_Ini = (string)(dr1_2_2.GetValue(dr1_2_2.GetOrdinal("Fecha_S1_Ini"))); }
                                            if (!dr1_2_2.IsDBNull(dr1_2_2.GetOrdinal("Fecha_S1_Fin"))) { curscron1.Fecha_S1_Fin = (string)(dr1_2_2.GetValue(dr1_2_2.GetOrdinal("Fecha_S1_Fin"))); }



                                            if (!dr1_2_2.IsDBNull(dr1_2_2.GetOrdinal("Fecha_S2_Ini"))) { curscron1.Fecha_S2_Ini = (string)(dr1_2_2.GetValue(dr1_2_2.GetOrdinal("Fecha_S2_Ini"))); }
                                            if (!dr1_2_2.IsDBNull(dr1_2_2.GetOrdinal("Fecha_S2_Fin"))) { curscron1.Fecha_S2_Fin = (string)(dr1_2_2.GetValue(dr1_2_2.GetOrdinal("Fecha_S2_Fin"))); }

                                            if (!dr1_2_2.IsDBNull(dr1_2_2.GetOrdinal("Fecha_S3_Ini"))) { curscron1.Fecha_S3_Ini = (string)(dr1_2_2.GetValue(dr1_2_2.GetOrdinal("Fecha_S3_Ini"))); }
                                            if (!dr1_2_2.IsDBNull(dr1_2_2.GetOrdinal("Fecha_S3_Fin"))) { curscron1.Fecha_S3_Fin = (string)(dr1_2_2.GetValue(dr1_2_2.GetOrdinal("Fecha_S3_Fin"))); }

                                            if (!dr1_2_2.IsDBNull(dr1_2_2.GetOrdinal("Fecha_S4_Ini"))) { curscron1.Fecha_S4_Ini = (string)(dr1_2_2.GetValue(dr1_2_2.GetOrdinal("Fecha_S4_Ini"))); }
                                            if (!dr1_2_2.IsDBNull(dr1_2_2.GetOrdinal("Fecha_S4_Fin"))) { curscron1.Fecha_S4_Fin = (string)(dr1_2_2.GetValue(dr1_2_2.GetOrdinal("Fecha_S4_Fin"))); }




                                             log.LogInformation("*** Cronograma = "+cursact1.Id);
                                             lcurscron1.Add(curscron1);
                                        }

                                            if (conn1_2_2.State == System.Data.ConnectionState.Open)
                                            conn1_2_2.Close();
                                            cursact1.Cronogramas = lcurscron1;

                                    }


                                }


                             List<ControlCambiosGet> lcursCC1  = new List<ControlCambiosGet>();//ya *****************

                                //********************************************

                                using (SqlConnection conn1_2_CCO = new SqlConnection(vvsqlconnectionString))
                                {
                                   log.LogInformation("ControlCambios de la Activiad ["+cursact1.Id+"]");
                                    conn1_2_CCO.Open();
                                    SqlCommand cmd1_2_CCO = new SqlCommand("ssoma.sp_list_control_cambios", conn1_2_CCO);
                                    cmd1_2_CCO.Parameters.AddWithValue("@ActividadId", cursact1.Id);
                                    cmd1_2_CCO.CommandType = CommandType.StoredProcedure;
                                     using (SqlDataReader dr1_2_4CCO = await cmd1_2_CCO.ExecuteReaderAsync())
                                    {
                                             log.LogInformation("*** CONSULTA CONTROL = "+cursact1.Id);

                                        //Navegar en el Conjunto de Datos Recuperados
                                        while (dr1_2_4CCO.Read())
                                        {
                                        log.LogInformation("***WHILE CONTROL = "+cursact1.Id);

                                            cursCC1 = new ControlCambiosGet();

                                            if (!dr1_2_4CCO.IsDBNull(dr1_2_4CCO.GetOrdinal("Id"))) { cursCC1.Id = (long)(dr1_2_4CCO.GetValue(dr1_2_4CCO.GetOrdinal("Id")));}
                                            if (!dr1_2_4CCO.IsDBNull(dr1_2_4CCO.GetOrdinal("Nombre"))) { cursCC1.Nombre = (string)(dr1_2_4CCO.GetValue(dr1_2_4CCO.GetOrdinal("Nombre")));}
                                            if (!dr1_2_4CCO.IsDBNull(dr1_2_4CCO.GetOrdinal("Flag_Adjunto"))) { cursCC1.Flag_Adjunto = (int)(dr1_2_4CCO.GetValue(dr1_2_4CCO.GetOrdinal("Flag_Adjunto")));}

                                            cursCC1.Cronograma = (bool)(dr1_2_4CCO.GetValue(dr1_2_4CCO.GetOrdinal("Cronograma")));
                                            if (!dr1_2_4CCO.IsDBNull(dr1_2_4CCO.GetOrdinal("Date"))) { cursCC1.Date = (string)(dr1_2_4CCO.GetValue(dr1_2_4CCO.GetOrdinal("Date")));}
                                           


                                             log.LogInformation("*** CONTROL = "+cursact1.Id);
                                             lcursCC1.Add(cursCC1);
                                        }
                                             log.LogInformation("***ERRRO CONTROL = "+cursact1.Id);

                                            if (conn1_2_CCO.State == System.Data.ConnectionState.Open)
                                            conn1_2_CCO.Close();
                                            cursact1.ControlCambios = lcursCC1;

                                    }


                                }

                                //************************************************************* tareas de la Frecuencia Cronograma    *******************

                                //Listado de Tareas de los objetivos PlanAnual
                                List<ResponsableGet> lcursResp1  = new List<ResponsableGet>();//ya *****************

                                //********************************************

                                using (SqlConnection conn1_2_R = new SqlConnection(vvsqlconnectionString))
                                {
                                   log.LogInformation("Responsable de la Activiad ["+cursact1.Id+"]");
                                    conn1_2_R.Open();
                                    SqlCommand cmd1_2_R = new SqlCommand("ssoma.sp_list_responsable_actividad", conn1_2_R);
                                    cmd1_2_R.Parameters.AddWithValue("@ActividadId", cursact1.Id);
                                    cmd1_2_R.CommandType = CommandType.StoredProcedure;
                                     using (SqlDataReader dr1_2_3 = await cmd1_2_R.ExecuteReaderAsync())
                                    {

                                        //Navegar en el Conjunto de Datos Recuperados
                                        while (dr1_2_3.Read())
                                        {
                                            cursResp1 = new ResponsableGet();

                                            if (!dr1_2_3.IsDBNull(dr1_2_3.GetOrdinal("Motivo"))) { cursResp1.Motivo = (string)(dr1_2_3.GetValue(dr1_2_3.GetOrdinal("Motivo")));}
                                            if (!dr1_2_3.IsDBNull(dr1_2_3.GetOrdinal("Old_ResponsableName"))) { cursResp1.Old_ResponsableName = (string)(dr1_2_3.GetValue(dr1_2_3.GetOrdinal("Old_ResponsableName")));}

                                            if (!dr1_2_3.IsDBNull(dr1_2_3.GetOrdinal("New_ResponsableName"))) { cursResp1.New_ResponsableName = (string)(dr1_2_3.GetValue(dr1_2_3.GetOrdinal("New_ResponsableName")));}
                                            if (!dr1_2_3.IsDBNull(dr1_2_3.GetOrdinal("Date"))) { cursResp1.Date = (string)(dr1_2_3.GetValue(dr1_2_3.GetOrdinal("Date")));}
                                           


                                             log.LogInformation("*** Cronograma = "+cursact1.Id);
                                             lcursResp1.Add(cursResp1);
                                        }

                                            if (conn1_2_R.State == System.Data.ConnectionState.Open)
                                            conn1_2_R.Close();
                                            cursact1.Responsable = lcursResp1;

                                    }


                                }





                                //falta   Cronogramas

                                curobj1.Nun_Actividades++;
                                 log.LogInformation("Actividad = "+cursact1.Id);
                                 lcursact1.Add(cursact1);
                            }
                                if (conn1_2.State == System.Data.ConnectionState.Open)
                                conn1_2.Close();
                                curobj1.Actividades = lcursact1;
                        }

                    }

                    // //********************************************
                    //lobjs.Add(curobj);

                    //----------------------------------------actividades del plan--------------------------------------------------










                    log.LogInformation("Objetivo = "+curobj1.Id);
                    curobj.Num_Objetivos = curobj.Num_Objetivos+1;
                    lcurobj1.Add(curobj1);
                }

                if (conn1.State == System.Data.ConnectionState.Open)
                    conn1.Close();

                curobj.Objetivos = lcurobj1;
                 //lcurobj1 = null;
            }

        }

    //******************************************** fin de objetivos del plan ***************************

    }

    log.LogInformation("DataPlanAnual.PlanAnual");











                











                }

                if (conn.State == System.Data.ConnectionState.Open)
                    conn.Close();
            }
        }
        catch (Exception ex)
        {
            curobj = new PlanAnualGet();
            curobj.Id = 0;
            curobj.Code = System.Convert.ToString(ex.Message);
          

        }

        return curobj;
    }
    public async Task<int> funGetPlanAnualAllList2(ILogger log, long Id)
    {
            log.LogInformation("//==================================   OTRA FUNCION   ==========================================");

            return 0;
    }

    public async Task<List<HistorialGet>> funGetHistorialRechazosDocumentos(ILogger log, long Id)
    {
        List<HistorialGet> listHistorial = new List<HistorialGet>();
        HistorialGet curentity;

        try
        {
            using (SqlConnection conn3 = new SqlConnection(vvsqlconnectionString))
            {
                conn3.Open();

                SqlCommand cmd = new SqlCommand("[ssoma].[get_pa_historial_rechazo_documento]", conn3);

                cmd.Parameters.AddWithValue("@TareaPlanId", Id);

                cmd.CommandType = CommandType.StoredProcedure;

                //Ejecutar Comando buscaremos los hallazgos registrados
                using (SqlDataReader dataReader = await cmd.ExecuteReaderAsync())
                {
                    //Navegar en el Conjunto de Datos Recuperados
                    while (dataReader.Read())
                    {
                        curentity = new HistorialGet();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curentity.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("AdjuntoActividadPlanId"))) { curentity.AdjuntoActividadPlanId = (long)(dataReader.GetValue(dataReader.GetOrdinal("AdjuntoActividadPlanId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("TareaPlanId"))) { curentity.TareaPlanId = (long)(dataReader.GetValue(dataReader.GetOrdinal("TareaPlanId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("AdjuntoNameInicial"))) { curentity.AdjuntoNameInicial = (string)(dataReader.GetValue(dataReader.GetOrdinal("AdjuntoNameInicial"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("AdjuntoNameFinal"))) { curentity.AdjuntoNameFinal = (string)(dataReader.GetValue(dataReader.GetOrdinal("AdjuntoNameFinal"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Motivo"))) { curentity.Motivo = (string)(dataReader.GetValue(dataReader.GetOrdinal("Motivo"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Fecha"))) { curentity.Fecha = (string)(dataReader.GetValue(dataReader.GetOrdinal("Fecha"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("FechaSubido"))) { curentity.FechaSubido = (DateTime)(dataReader.GetValue(dataReader.GetOrdinal("FechaSubido"))); }

                        listHistorial.Add(curentity);

                    }
                }


                if (conn3.State == System.Data.ConnectionState.Open)
                    conn3.Close();

                log.LogInformation("Leeremos el historia de documentos rechazados de la tarea.");
            }
        }
        catch (Exception ex)
        {
            listHistorial    = new List<HistorialGet>();
            curentity        = new HistorialGet();
            curentity.Id     = 0;
            curentity.Motivo = System.Convert.ToString(ex.Message);

            listHistorial.Add(curentity);

            log.LogInformation("Exception "+curentity.Motivo);

        }


        return listHistorial;

        // public class Historial
        // {
        //     public long  { get; set; }
        //     public long  { get; set; }
        //     public long  { get; set; }
        //     public string  { get; set; }
        //     public string  { get; set; }
        //     public string  { get; set; }
        //     public string  { get; set; }
        //     public DateTime  { get; set; }
        // }

    }


}






public class PlanAnualGet
{
    public long Id                              { get; set;}
    public string Code                          { get; set;}
    public string Email_Supervisor              { get; set;}

    public long ProgramaId                      { get; set; }
    public string Programa                      { get; set; }

    public long GerenciaId                      { get; set; }
    public string Gerencia                      { get; set; }
    public string Code_Gerencia                 { get; set; }

    public long SedeId                          { get; set; }
    public string Sede                          { get; set; }

    public string EquipoId                        { get; set; }
    public string Equipo                        { get; set; }

    public string Fecha_Creacion                 {get; set;}

    public long Estado_PlanId                    {get; set;}
    public string Estado_Plan                    {get; set;}
    public string Color_Plan                     {get; set;}
    public int    Year_Plan                      {get; set;}

     public string MotivoSuspencion               {get; set;}
    public int    Suspendido                      {get; set;}

    public long Num_Objetivos                    {get; set;}
    public List<ObjetivoGet> Objetivos              {get; set;}

}




public class ObjetivoGet
{
    public long     Id                     { get; set; }
    public int     Tipo                    { get; set; }
    public string   Objetivo_Name          { get; set; }
    public int      Nun_Actividades        { get; set; }
    public string   Code                   { get; set; }
    public List<SubObjetivoGet> SubObjetivos  { get; set; } //listado  de subobjetiivos del objetivo
    public List<ActividadGet> Actividades     { get; set; } //listado  de actividades del objetivo
}

public class SubObjetivoGet
{
    public long     Id                  { get; set; }
    public int     Tipo                 { get; set; }
    public string   SubObjetivo_Name    { get; set; }
    public int      Nun_Actividades     { get; set; }
    public string   Code                { get; set; }
    public List<ActividadGet> Actividades  { get; set; } //listado  de actividades del objetivo
}




public class ActividadGet
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

    public List<TareaGet> Tareas            { get; set; } //listado  de Tareas del objetivo
    public List<CronogramaGet> Cronogramas  { get; set; } //listado  de Tareas del Cronogramas
    public List<ResponsableGet> Responsable  { get; set; } //listado  de Responsables
    public List<ControlCambiosGet> ControlCambios  { get; set; } //listado  de Responsables
}



public class ResponsableGet
{
    public string Motivo { get; set; }
    public string Old_ResponsableName { get; set;}
    public string New_ResponsableName { get; set;}
    public string Date { get; set; }
}


public class TareaGet
{

    public long     Id                   { get; set; }
    public long     ActividadId          { get; set; }
    public string   ResponsableId        { get; set; }
    public string   ResponsableName      { get; set; }

    public string   Evidencia_Name       { get; set; }

    public string Fecha_Programada_Ini   { get; set; }
    public string Fecha_Programada_Fin   { get; set; }

    public string Fecha_Ejecutada_Ini    { get; set; }
    public string Fecha_Ejecutada_Fin    { get; set; }

    public int     IdEstado             { get; set; }
    public string   Color                { get; set; }
    public string   Estado               { get; set; }
    public List<AdjuntosGet> Adjuntos       { get; set; }
    public List<HistorialGet> Historial     { get; set; }

}

public class AdjuntosGet
{
    public long Id { get; set; }
    public long TareaId { get; set; }
    public long EstadoAdjuntoId { get; set; }
    public string AdjuntoName { get; set; }
    public string Adjunto { get; set; }
    public string FechaSubida { get; set; }
    public DateTime Fecha_Sub { get; set; }
    public string EstadoAdjunto { get; set; }
    public string AdjuntoCode { get; set; }
    public string Motivo { get; set; }
}

public class HistorialGet
{
    public long Id { get; set; }
    public long AdjuntoActividadPlanId { get; set; }
    public long TareaPlanId { get; set; }
    public string AdjuntoNameInicial { get; set; }
    public string AdjuntoNameFinal { get; set; }
    public string Motivo { get; set; }
    public string Fecha { get; set; }
    public DateTime FechaSubido { get; set; }
}

public class CronogramaGet
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

     public string  Fecha_S1_Ini        { get; set; }
     public string  Fecha_S1_Fin        { get; set; }

     public string  Fecha_S2_Ini        { get; set; }
     public string  Fecha_S2_Fin        { get; set; }

     public string  Fecha_S3_Ini        { get; set; }
     public string  Fecha_S3_Fin        { get; set; }

     public string  Fecha_S4_Ini        { get; set; }
     public string  Fecha_S4_Fin        { get; set; }




}



//------------------------ ya andy Estado_Planes ---------------


public class ControlCambiosGet
{
    public long Id { get; set; }
    public long IdActividad { get; set; }
    public bool? Cronograma {get; set;}
    public int Flag_Adjunto { get; set; }

    public string Nombre { get; set; }
    public string Adjunto { get; set; }
    public string Date { get; set; }
}