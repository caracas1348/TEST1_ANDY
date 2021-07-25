/****************************************************************************************
* VISUAL SAT - [2021]
* PROYECTO : SIGTASA
* ESQUEMA : SSOMA
* SPRINT  : 4
* MODULO : GESTIÓN DE PLAN ANUAL
* OPERADORES_________________________________________________________________________
* | # | PROGRAMADOR     |  |      FECHA   |  |   HORA   |           CORREO           |
* | 1 | Andy Vásquez    |  |  16/03/2021  |  | 17:30:50 |    caracas1348@gmail.com   |
* |___|_________________|__|______________|__|__________|____________________________|
*
* DESCRIPCION: ARCHIVO SQL BACKEND DE FUNCIONALIDAD EN SERVIDOR DEL LISTADO E INFORMACION
*              LOS INCIDENTES ACCIDENTES DESDE LA WEB
*
* ARCHIVOS DE FRONT       _____________________________________________
* | # |     MODULO             |  |         NOMBRE                    |
* | 1 |      SSOMA             |  |  gestionAccidenteIncidente.html   |
* |___________________________________________________________________|
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

class DataPlanAnualGetAll //Accidente-Incidente
{
    string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);

    public async Task<DataPlanAnual> funGetPlanAnualAllList( ILogger log , long Id, long IdTipoEvento, long IdEmpresa, long IdSede, string FechaInicio, string FechaFin, long IdEmbarcacion)
    {
        //Lista de Objetos
        DataPlanAnual DataPlanAnual = new DataPlanAnual();//queda igual pero es Accidente Incidente

        //Listado de objetos de Plan Anual
        List<PlanAnualGet> lobjs  = new List<PlanAnualGet>();//ya  /queda igual pero es Accidente Incidente

        //Listado de objetos de Programas
        List<Programas> Programas  = new List<Programas>();//TipoEvento

        //Listado de objetos de Gerencias
        List<Gerencias> Gerencias  = new List<Gerencias>();//Empresas

        //Listado de objetos de Sedes
        List<Sedes> Sedes  = new List<Sedes>();//Sede

        //Listado de objetos de StatusPlanAnual
        List<Estado_Planes> Estado_Planes  = new List<Estado_Planes>();//Embarcacion

         //Listado de objetos de StatusPlanAnual
        List<Zonas> Zonas  = new List<Zonas>();//##########################NO POR AHORA**

         //Listado de objetos de StatusPlanAnual
        List<Areas> Areas  = new List<Areas>();//##########################NO POR AHORA** Potencial_Incidente



          //Listado de objetos de Potencial_Incidente
           List<Potencial_Incidentes> Potencial_Incidentes  = new List<Potencial_Incidentes>();
           List<Condicion_Embarcacion> Condicion_Embarcacion = new List<Condicion_Embarcacion>();

           List<Proceso> Proceso = new List<Proceso>();
           List<Subproceso> Subproceso = new List<Subproceso>();


           List<Ocurrencia_Incidente> Ocurrencia_Incidente = new List<Ocurrencia_Incidente>();
           List<Lugar> Lugar = new  List<Lugar>();
           List<Dannio_Lesion> Dannio_Lesion = new  List<Dannio_Lesion>();
           List<Parte_Cuerpo_Lesion> Parte_Cuerpo_Lesion = new List<Parte_Cuerpo_Lesion>();
           List<Asesor> Asesor = new List<Asesor>();
           List<Gerencia1> Gerencia1 = new List<Gerencia1>();
           List<Region> Region = new List<Region>();


           List<Impacto_Ambiental> Impacto_Ambiental = new List<Impacto_Ambiental>();
           List<Contaminante> Contaminante = new List<Contaminante>();
           List<Descripcion_Evento_Ambiental> Descripcion_Evento_Ambiental = new List<Descripcion_Evento_Ambiental>();
           List<Carga_Accidente> Carga_Accidente = new List<Carga_Accidente>();

           





        //Listado de objetos de Programas
        List<Programas1> Programas1  = new List<Programas1>();//TipoEvento

         //Listado de objetos temporasda Veda
        List<Programas2> Programas2  = new List<Programas2>();//TipoEvento



        //Objeto de PlanAnual
        PlanAnualGet curobj;

        //Objeto de los objetivos del PlanAnual
        Objetivo curobj1;//##########################NO POR AHORA**

         //Listado de objetos de StatusPlanAnual
        //List<Objetivo> lcurobj1  = new List<Objetivo>();//ya *****************lcursact1


         //Objeto de los objetivos del PlanAnual
        SubObjetivo cursobj1;//cursobj1//##########################NO POR AHORA**

        Actividad cursact1;//##########################NO POR AHORA**
         //Listado de objetos de StatusPlanAnual
        //List<SubObjetivo> lcursobj1  = new List<SubObjetivo>();//ya *****************

        Tarea curstar1;//##########################NO POR AHORA**

        Cronograma curscron1;//##########################NO POR AHORA**

        Responsable cursResp1;//##########################NO POR AHORA**
        Responsable cursResp1S;//##########################NO POR AHORA**
        ControlCambios cursCC1S;//##########################NO POR AHORA**
        ControlCambios cursCC1;//##########################NO POR AHORA**


        log.LogInformation("en la funcion funGetPlanAnualAllList "+vvsqlconnectionString);
        //SQL Objects
        try
        {
            log.LogInformation("trying");
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                log.LogInformation("using 97");
                conn.Open();
                log.LogInformation("open 98");

                SqlCommand cmd = new SqlCommand("[ssoma].[a_get_listado_incidente_web]", conn);//legue hasta aqui andy

                log.LogInformation("SqlCommand 103 ");
                cmd.Parameters.AddWithValue("@Id", Id);
                cmd.Parameters.AddWithValue("@IdTipoEvento", IdTipoEvento);
                cmd.Parameters.AddWithValue("@IdEmpresa", IdEmpresa);
                cmd.Parameters.AddWithValue("@IdSede",IdSede);
                cmd.Parameters.AddWithValue("@FechaInicio", FechaInicio);
                cmd.Parameters.AddWithValue("@FechaFin", FechaFin);
                cmd.Parameters.AddWithValue("@IdEmbarcacion", IdEmbarcacion);

                cmd.CommandType = CommandType.StoredProcedure;
                log.LogInformation("CommandType 113");
                //Ejecutar Comando buscaremos los Planes Anuales registrados
                using (SqlDataReader dataReader = await cmd.ExecuteReaderAsync())
                {
                    //Navegar en el Conjunto de Datos Recuperados
                    while (dataReader.Read())
                    {
                        curobj = new PlanAnualGet();

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobj.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code"))) { curobj.Code = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code"))); }//ya


        //log.LogInformation("Id = "+curobj.Id); log.LogInformation("Code = "+curobj.Code);

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdTipoEvento"))) { curobj.IdTipoEvento = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdTipoEvento"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Tipo_Evento"))) { curobj.Tipo_Evento = (string)(dataReader.GetValue(dataReader.GetOrdinal("Tipo_Evento"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("GrupoEvento"))) { curobj.GrupoEvento = (int)(dataReader.GetValue(dataReader.GetOrdinal("GrupoEvento"))); }//ya

        //log.LogInformation("IdTipoEvento = "+curobj.IdTipoEvento); log.LogInformation("Tipo_Evento = "+curobj.Tipo_Evento); log.LogInformation("GrupoEvento = "+curobj.GrupoEvento);

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdEmpresa"))) { curobj.IdEmpresa = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdEmpresa"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("NombreEmpresa"))) { curobj.NombreEmpresa = (string)(dataReader.GetValue(dataReader.GetOrdinal("NombreEmpresa"))); }//ya
                        //if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code_Gerencia"))) { curobj.Code_Gerencia = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code_Gerencia"))); }//ya
        //log.LogInformation("IdEmpresa = "+curobj.IdEmpresa); log.LogInformation("NombreEmpresa = "+curobj.NombreEmpresa);

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdSede"))) { curobj.IdSede = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdSede"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Sede"))) { curobj.Sede = (string)(dataReader.GetValue(dataReader.GetOrdinal("Sede"))); }//ya
         //log.LogInformation("IdSede = "+curobj.IdSede); log.LogInformation("Sede = "+curobj.Sede);
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdEmbarcacion"))) { curobj.IdEmbarcacion = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdEmbarcacion"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Embarcacion"))) { curobj.Embarcacion = (string)(dataReader.GetValue(dataReader.GetOrdinal("Embarcacion"))); }//ya
        //log.LogInformation("IdEmbarcacion = "+curobj.IdEmbarcacion); log.LogInformation("Embarcacion = "+curobj.Embarcacion);

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdZona"))) { curobj.IdZona = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdZona"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Zona"))) { curobj.Zona = (string)(dataReader.GetValue(dataReader.GetOrdinal("Zona"))); }//ya
        //log.LogInformation("IdZona = "+curobj.IdZona); log.LogInformation("Zona = "+curobj.Zona);

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Fecha"))) { curobj.Fecha = (string)(dataReader.GetValue(dataReader.GetOrdinal("Fecha"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Hora"))) { curobj.Hora = (string)(dataReader.GetValue(dataReader.GetOrdinal("Hora"))); }
        //log.LogInformation("Fecha = "+curobj.Fecha);

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdEstadoIncidente"))) { curobj.IdEstadoIncidente = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdEstadoIncidente"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Estado_Incidente"))) { curobj.Estado_Incidente = (string)(dataReader.GetValue(dataReader.GetOrdinal("Estado_Incidente"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Color"))) { curobj.Color = (string)(dataReader.GetValue(dataReader.GetOrdinal("Color"))); }//ya
        //log.LogInformation("IdEstadoIncidente = "+curobj.IdEstadoIncidente); log.LogInformation("Estado_Incidente = "+curobj.Estado_Incidente); log.LogInformation("Color = "+curobj.Color);

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("HayPersonalAfectado"))) { curobj.HayPersonalAfectado = (int)(dataReader.GetValue(dataReader.GetOrdinal("HayPersonalAfectado"))); }//ya
        //log.LogInformation("HayPersonalAfectado = "+curobj.HayPersonalAfectado);
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdArea"))) { curobj.IdArea = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdArea"))); }//YA
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("DescripcionEvento"))) { curobj.DescripcionEvento = (string)(dataReader.GetValue(dataReader.GetOrdinal("DescripcionEvento"))); }//ya
        //log.LogInformation("IdArea = "+curobj.IdArea);log.LogInformation("DescripcionEvento = "+curobj.DescripcionEvento);

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("A_NombrePersonalAccidentado"))) { curobj.A_NombrePersonalAccidentado = (string)(dataReader.GetValue(dataReader.GetOrdinal("A_NombrePersonalAccidentado"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("A_DniPersonalAccidentado"))) { curobj.A_DniPersonalAccidentado = (string)(dataReader.GetValue(dataReader.GetOrdinal("A_DniPersonalAccidentado"))); }//ya
         //log.LogInformation("A_NombrePersonalAccidentado = "+curobj.A_NombrePersonalAccidentado);log.LogInformation("A_DniPersonalAccidentado = "+curobj.A_DniPersonalAccidentado);

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("A_IdPersonalAccidentado"))) { curobj.A_IdPersonalAccidentado = (string)(dataReader.GetValue(dataReader.GetOrdinal("A_IdPersonalAccidentado"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("A_PuestoCargoAccidentado"))) { curobj.A_PuestoCargoAccidentado = (string)(dataReader.GetValue(dataReader.GetOrdinal("A_PuestoCargoAccidentado"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("A_NombreJefeAccidentado"))) { curobj.A_NombreJefeAccidentado = (string)(dataReader.GetValue(dataReader.GetOrdinal("A_NombreJefeAccidentado"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("A_IdJefeAccidentado"))) { curobj.A_IdJefeAccidentado = (string)(dataReader.GetValue(dataReader.GetOrdinal("A_IdJefeAccidentado"))); }//ya
//log.LogInformation("A_IdPersonalAccidentado = "+curobj.A_IdPersonalAccidentado); log.LogInformation("A_PuestoCargoAccidentado = "+curobj.A_PuestoCargoAccidentado); log.LogInformation("A_NombreJefeAccidentado = "+curobj.A_NombreJefeAccidentado); log.LogInformation("A_IdJefeAccidentado = "+curobj.A_IdJefeAccidentado);

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("B_TipoProducto"))) { curobj.B_TipoProducto = (string)(dataReader.GetValue(dataReader.GetOrdinal("B_TipoProducto"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("B_ProductoInvolucrado"))) { curobj.B_ProductoInvolucrado = (string)(dataReader.GetValue(dataReader.GetOrdinal("B_ProductoInvolucrado"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("B_Volumen"))) { curobj.B_Volumen = (string)(dataReader.GetValue(dataReader.GetOrdinal("B_Volumen"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("B_Area"))) { curobj.B_Area = (string)(dataReader.GetValue(dataReader.GetOrdinal("B_Area"))); }//ya
//log.LogInformation("B_TipoProducto = "+curobj.B_TipoProducto);    log.LogInformation("B_ProductoInvolucrado = "+curobj.B_ProductoInvolucrado);    log.LogInformation("B_Volumen = "+curobj.B_Volumen);    log.LogInformation("B_Area = "+curobj.B_Area);

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("B_Fuente"))) { curobj.B_Fuente = (string)(dataReader.GetValue(dataReader.GetOrdinal("B_Fuente"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("B_NombreJefeInmediato"))) { curobj.B_NombreJefeInmediato = (string)(dataReader.GetValue(dataReader.GetOrdinal("B_NombreJefeInmediato"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("B_IdJefeInmediato"))) { curobj.B_IdJefeInmediato = (string)(dataReader.GetValue(dataReader.GetOrdinal("B_IdJefeInmediato"))); }//ya

 //log.LogInformation("B_Fuente = "+curobj.B_Fuente);   log.LogInformation("B_NombreJefeInmediato = "+curobj.B_NombreJefeInmediato);   log.LogInformation("B_IdJefeInmediato = "+curobj.B_IdJefeInmediato);


                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("C_Hurt"))) { curobj.C_Hurt = (string)(dataReader.GetValue(dataReader.GetOrdinal("C_Hurt"))); }//ya

 //log.LogInformation("C_Hurt = "+curobj.C_Hurt);



                        //-------------------------------------------------- forma temporal de traer y almacenar los adjuntos --------------------------------------
                        // if (!dataReader.IsDBNull(dataReader.GetOrdinal("Adjunto1"))) { curobj.Adjunto1 = (string)(dataReader.GetValue(dataReader.GetOrdinal("Adjunto1"))); }//ya
                        // if (!dataReader.IsDBNull(dataReader.GetOrdinal("Adjunto2"))) { curobj.Adjunto2 = (string)(dataReader.GetValue(dataReader.GetOrdinal("Adjunto2"))); }//ya
                        // if (!dataReader.IsDBNull(dataReader.GetOrdinal("Adjunto3"))) { curobj.Adjunto3 = (string)(dataReader.GetValue(dataReader.GetOrdinal("Adjunto3"))); }//ya
                        // if (!dataReader.IsDBNull(dataReader.GetOrdinal("Adjunto4"))) { curobj.Adjunto4 = (string)(dataReader.GetValue(dataReader.GetOrdinal("Adjunto4"))); }//ya
                        // if (!dataReader.IsDBNull(dataReader.GetOrdinal("Adjunto5"))) { curobj.Adjunto5 = (string)(dataReader.GetValue(dataReader.GetOrdinal("Adjunto5"))); }//ya

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("xDescripcion"))) { curobj.xDescripcion = (string)(dataReader.GetValue(dataReader.GetOrdinal("xDescripcion"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("xIdTipoEventoLesion"))) { curobj.xIdTipoEventoLesion = (long)(dataReader.GetValue(dataReader.GetOrdinal("xIdTipoEventoLesion"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("xIdTipoEventoLesion2"))) { curobj.xIdTipoEventoLesion2 = (long)(dataReader.GetValue(dataReader.GetOrdinal("xIdTipoEventoLesion2"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("xIdTipoEventoLesion3"))) { curobj.xIdTipoEventoLesion3 = (long)(dataReader.GetValue(dataReader.GetOrdinal("xIdTipoEventoLesion3"))); }//ya

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("xIdPlanta"))) { curobj.xIdPlanta = (long)(dataReader.GetValue(dataReader.GetOrdinal("xIdPlanta"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("xPlanta"))) { curobj.xPlanta = (string)(dataReader.GetValue(dataReader.GetOrdinal("xPlanta"))); }//ya

                        log.LogInformation("//------------------------ ALERTA ------- ALERTA -----------------------------------------------------------//");

                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("yIdAlerta"))) { curobj.yIdAlerta = (long)(dataReader.GetValue(dataReader.GetOrdinal("yIdAlerta"))); }//ya
                         log.LogInformation("curobj.yIdAlerta = "+curobj.yIdAlerta);

                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("yDetalle"))) { curobj.yDetalle = (string)(dataReader.GetValue(dataReader.GetOrdinal("yDetalle"))); }//ya
                         log.LogInformation("curobj.yDetalle = "+curobj.yDetalle);

                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("yIdSede"))) { curobj.yIdSede = (long)(dataReader.GetValue(dataReader.GetOrdinal("yIdSede"))); }//ya
                          log.LogInformation("curobj.yIdSede = "+curobj.yIdSede);

                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("yIdZona"))) { curobj.yIdZona = (long)(dataReader.GetValue(dataReader.GetOrdinal("yIdZona"))); }//ya
                         log.LogInformation("curobj.yIdZona = "+curobj.yIdZona);

                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("yIdTipoEvento"))) { curobj.yIdTipoEvento = (long)(dataReader.GetValue(dataReader.GetOrdinal("yIdTipoEvento"))); }//ya
                         log.LogInformation("curobj.yIdTipoEvento = "+curobj.yIdTipoEvento);


                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("yFecha"))) { curobj.yFecha = (string)(dataReader.GetValue(dataReader.GetOrdinal("yFecha"))); }//ya
                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("yHora"))) { curobj.yHora = (string)(dataReader.GetValue(dataReader.GetOrdinal("yHora"))); }//ya
                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("yDiagnostico"))) { curobj.yDiagnostico = (string)(dataReader.GetValue(dataReader.GetOrdinal("yDiagnostico"))); }//ya
                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("yDescripcion"))) { curobj.yDescripcion = (string)(dataReader.GetValue(dataReader.GetOrdinal("yDescripcion"))); }//ya
                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("yCompromiso"))) { curobj.yCompromiso = (string)(dataReader.GetValue(dataReader.GetOrdinal("yCompromiso"))); }//ya
                        // if (!dataReader.IsDBNull(dataReader.GetOrdinal("yAdjunto1"))) { curobj.yAdjunto1 = (string)(dataReader.GetValue(dataReader.GetOrdinal("yAdjunto1"))); }//ya
                        // if (!dataReader.IsDBNull(dataReader.GetOrdinal("yAdjunto2"))) { curobj.yAdjunto2 = (string)(dataReader.GetValue(dataReader.GetOrdinal("yAdjunto2"))); }//ya
                        // if (!dataReader.IsDBNull(dataReader.GetOrdinal("yPdf"))) { curobj.yPdf = (string)(dataReader.GetValue(dataReader.GetOrdinal("yPdf"))); }//ya


                       if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdHallazgo"))) { curobj.IdHallazgo = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdHallazgo"))); }//ya
                       if (!dataReader.IsDBNull(dataReader.GetOrdinal("InformeInvestigacion"))) { curobj.InformeInvestigacion = (long)(dataReader.GetValue(dataReader.GetOrdinal("InformeInvestigacion"))); }//ya
                       if (!dataReader.IsDBNull(dataReader.GetOrdinal("InformeInvestigacion3"))) { curobj.InformeInvestigacion3 = (long)(dataReader.GetValue(dataReader.GetOrdinal("InformeInvestigacion3"))); }//ya

                       if (!dataReader.IsDBNull(dataReader.GetOrdinal("Dannio"))) { curobj.Dannio = (string)(dataReader.GetValue(dataReader.GetOrdinal("Dannio"))); }//ya
                       if (!dataReader.IsDBNull(dataReader.GetOrdinal("Lesion"))) { curobj.Lesion = (string)(dataReader.GetValue(dataReader.GetOrdinal("Lesion"))); }//ya

                  
                       if (!dataReader.IsDBNull(dataReader.GetOrdinal("Contaminantes"))) { curobj.Contaminantes = (string)(dataReader.GetValue(dataReader.GetOrdinal("Contaminantes"))); }//ya
                       if (!dataReader.IsDBNull(dataReader.GetOrdinal("ContaminanteId"))) { curobj.ContaminanteId = (long)(dataReader.GetValue(dataReader.GetOrdinal("ContaminanteId"))); }//ya

                       
                       if (!dataReader.IsDBNull(dataReader.GetOrdinal("Volumen"))) { curobj.Volumen = (int)(dataReader.GetValue(dataReader.GetOrdinal("Volumen"))); }//ya
                       if (!dataReader.IsDBNull(dataReader.GetOrdinal("Unidad"))) { curobj.Unidad = (int)(dataReader.GetValue(dataReader.GetOrdinal("Unidad"))); }//ya
                       if (!dataReader.IsDBNull(dataReader.GetOrdinal("AreaImpactada"))) { curobj.AreaImpactada = (int)(dataReader.GetValue(dataReader.GetOrdinal("AreaImpactada"))); }//ya

                       if (!dataReader.IsDBNull(dataReader.GetOrdinal("ImpactoAmbiental"))) { curobj.ImpactoAmbiental = (string)(dataReader.GetValue(dataReader.GetOrdinal("ImpactoAmbiental"))); }//ya
                       if (!dataReader.IsDBNull(dataReader.GetOrdinal("ImpactoAmbientalId"))) { curobj.ImpactoAmbientalId = (long)(dataReader.GetValue(dataReader.GetOrdinal("ImpactoAmbientalId"))); }//ya
                       

                       if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdDatosGenerales"))) { curobj.IdDatosGenerales = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdDatosGenerales"))); }//ya
                       if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdDatosGenerales2"))) { curobj.IdDatosGenerales2 = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdDatosGenerales2"))); }//ya
                       if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdDatosGenerales3"))) { curobj.IdDatosGenerales3 = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdDatosGenerales3"))); }//ya


                       if (!dataReader.IsDBNull(dataReader.GetOrdinal("FinalizadoSSO"))) { curobj.FinalizadoSSO = (int)(dataReader.GetValue(dataReader.GetOrdinal("FinalizadoSSO"))); }//ya
                       if (!dataReader.IsDBNull(dataReader.GetOrdinal("FinalizadoA"))) { curobj.FinalizadoA = (int)(dataReader.GetValue(dataReader.GetOrdinal("FinalizadoA"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("FinalizadoMat"))) { curobj.FinalizadoMat = (int)(dataReader.GetValue(dataReader.GetOrdinal("FinalizadoMat"))); }//ya

                       if (!dataReader.IsDBNull(dataReader.GetOrdinal("ClasificacionSSO"))) { curobj.ClasificacionSSO = (string)(dataReader.GetValue(dataReader.GetOrdinal("ClasificacionSSO"))); }//ya
                       if (!dataReader.IsDBNull(dataReader.GetOrdinal("ClasificacionA"))) { curobj.ClasificacionA = (string)(dataReader.GetValue(dataReader.GetOrdinal("ClasificacionA"))); }//ya
                       if (!dataReader.IsDBNull(dataReader.GetOrdinal("ClasificacionMat"))) { curobj.ClasificacionMat = (string)(dataReader.GetValue(dataReader.GetOrdinal("ClasificacionMat"))); }//ya
                       
                       if (!dataReader.IsDBNull(dataReader.GetOrdinal("Potencial"))) { curobj.Potencial = (long)(dataReader.GetValue(dataReader.GetOrdinal("Potencial"))); }//ya





 //log.LogInformation("Adjunto1 = "+curobj.Adjunto1);  log.LogInformation("Adjunto2 = "+curobj.Adjunto2); log.LogInformation("Adjunto3= "+curobj.Adjunto3);
//log.LogInformation("Adjunto4 = "+curobj.Adjunto4);  log.LogInformation("Adjunto5 = "+curobj.Adjunto5);

                        //HayPersonalAfectado
                        //if (!dataReader.IsDBNull(dataReader.GetOrdinal("Year_Plan"))) { curobj.Year_Plan = (int)(dataReader.GetValue(dataReader.GetOrdinal("Year_Plan"))); }//ya

                           //####################################################################################################################################################
                                            // //Listado de objetos de StatusPlanAnual
                                            // List<Objetivo> lcurobj1  = new List<Objetivo>();//ya *****************
                                            // using (SqlConnection conn1 = new SqlConnection(vvsqlconnectionString))
                                            // {
                                            //     log.LogInformation("using");
                                            //     conn1.Open();
                                            //     log.LogInformation("open 2");

                                            //     SqlCommand cmd1 = new SqlCommand("[ssoma].[a_get_evidencia_incidente_foto_all]", conn1);
                                            //     cmd1.Parameters.AddWithValue("@IdIncidente", curobj.Id);
                                            //     cmd1.CommandType = CommandType.StoredProcedure;
                                            //     using (SqlDataReader dr = await cmd1.ExecuteReaderAsync())
                                            //         {
                                            //             //log.LogInformation("SqlDataReader dr -------------------xxxx)");
                                            //             while (dr.Read())
                                            //             {
                                            //                 curobj1 = new Objetivo();

                                            //                 if (!dr.IsDBNull(dr.GetOrdinal("Id"))) { curobj1.Id = (long)(dr.GetValue(dr.GetOrdinal("Id"))); }
                                            //                 if (!dr.IsDBNull(dr.GetOrdinal("Nombre_Foto"))) { curobj1.Nombre_Foto = (string)(dr.GetValue(dr.GetOrdinal("Nombre_Foto"))); }
                                            //                 if (!dr.IsDBNull(dr.GetOrdinal("EvidenciaFile"))) { curobj1.EvidenciaFile = (string)(dr.GetValue(dr.GetOrdinal("EvidenciaFile"))); }

                                            //                 // log.LogInformation("=================================== Id"+curobj1.Id);
                                            //                 // log.LogInformation("=================================== Id"+curobj1.Nombre_Foto);
                                            //                 // log.LogInformation("=================================== Id"+curobj1.EvidenciaFile);
                                            //                 lcurobj1.Add(curobj1);
                                            //             }

                                            //         }

                                            //     //conn1.Close();

                                            // }


                           //####################################################################################################################################################

                         //curobj.Evidencias = lcurobj1;
                         //curobj.Evidencias = lcurobj1;



                         lobjs.Add(curobj);
                    }

    DataPlanAnual.PlanAnual = lobjs;
    log.LogInformation("DataPlanAnual.PlanAnual");



                     //--------------------------------------------YA Programas -------------------
                    dataReader.NextResult();

                    while (dataReader.Read())
                    {
                        Programas curobjP = new Programas();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjP.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Evento"))) { curobjP.Evento = (string)(dataReader.GetValue(dataReader.GetOrdinal("Evento"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code"))) { curobjP.Code = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Grupo"))) { curobjP.Grupo = (int)(dataReader.GetValue(dataReader.GetOrdinal("Grupo"))); }


                        Programas.Add(curobjP);
                    }
                    DataPlanAnual.Programas = Programas;
                    log.LogInformation("DataPlanAnual.Programas---TipoEvento");

                    //--------------------------------------------YA Programas--TipoEvento -------------------


                    dataReader.NextResult();

                    while (dataReader.Read())
                    {
                        Gerencias curobjG = new Gerencias();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjG.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Empresa"))) { curobjG.Empresa = (string)(dataReader.GetValue(dataReader.GetOrdinal("Empresa"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("RucEmpresa"))) { curobjG.RucEmpresa = (string)(dataReader.GetValue(dataReader.GetOrdinal("RucEmpresa"))); }

                        Gerencias.Add(curobjG);
                    }
                    DataPlanAnual.Gerencias = Gerencias;
                    log.LogInformation("DataPlanAnual.Gerencias--Empresas");

                    //--------------------------------------------YA Gerencias --Empresas-------------------




                    //--------------------------------------------YA Sedes -------------------
                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        Sedes curobjS = new Sedes();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjS.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("UnidadNegocioId"))) { curobjS.UnidadNegocioId = (long)(dataReader.GetValue(dataReader.GetOrdinal("UnidadNegocioId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Sede"))) { curobjS.Sede = (string)(dataReader.GetValue(dataReader.GetOrdinal("Sede"))); }

                        Sedes.Add(curobjS);
                    }
                    DataPlanAnual.Sedes = Sedes;
                    log.LogInformation("DataPlanAnual.Sedes");
                     //--------------------------------------------YA Sedes -------------------




                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        Estado_Planes curobjEPL = new Estado_Planes();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjEPL.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Embarcacion"))) { curobjEPL.Embarcacion = (string)(dataReader.GetValue(dataReader.GetOrdinal("Embarcacion"))); }
                        //if (!dataReader.IsDBNull(dataReader.GetOrdinal("Color"))) { curobjEPL.Color = (string)(dataReader.GetValue(dataReader.GetOrdinal("Color"))); }

                        Estado_Planes.Add(curobjEPL);
                    }
                    DataPlanAnual.Estado_Planes = Estado_Planes;
                    log.LogInformation("DataPlanAnual.Estado_Planes---Embarcacion");
                     //--------------------------------------------YA Estado_Planes --Embarcacion -------------------



                    //--------------------------------------------YA Areas -------------------
                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        Areas curobjA = new Areas();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjA.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Area"))) { curobjA.Area = (string)(dataReader.GetValue(dataReader.GetOrdinal("Area"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("UnidadNegocioId"))) { curobjA.UnidadNegocioId = (long)(dataReader.GetValue(dataReader.GetOrdinal("UnidadNegocioId"))); }

                        Areas.Add(curobjA);
                    }
                    DataPlanAnual.Areas = Areas;
                    log.LogInformation("DataPlanAnual.Areas");
                     //--------------------------------------------YA Zonas -------------------



                    //--------------------------------------------YA Zonas -------------------
                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        Zonas curobjZ = new Zonas();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjZ.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Zona"))) { curobjZ.Zona = (string)(dataReader.GetValue(dataReader.GetOrdinal("Zona"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("UnidadNegocioId"))) { curobjZ.UnidadNegocioId = (long)(dataReader.GetValue(dataReader.GetOrdinal("UnidadNegocioId"))); }



                        Zonas.Add(curobjZ);
                    }
                    DataPlanAnual.Zonas = Zonas;
                    log.LogInformation("DataPlanAnual.Zona");
                     //--------------------------------------------YA Zonas -------------------



                       //--------------------------------------------YA Programas -------------------
                    dataReader.NextResult();

                    while (dataReader.Read())
                    {
                        Programas1 curobjP1 = new Programas1();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjP1.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Lesion"))) { curobjP1.Evento = (string)(dataReader.GetValue(dataReader.GetOrdinal("Lesion"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code"))) { curobjP1.Code = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Grupo"))) { curobjP1.Grupo = (int)(dataReader.GetValue(dataReader.GetOrdinal("Grupo"))); }


                        Programas1.Add(curobjP1);
                    }
                    DataPlanAnual.Programas1 = Programas1;
                    log.LogInformation("DataPlanAnual.Programas1---TipoEvento");

                    //--------------------------------------------YA Programas--TipoEvento -------------------



                     //--------------------------------------------YA Potencial_Incidentes -------------------
                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        Potencial_Incidentes curobjPI = new Potencial_Incidentes();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjPI.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Potencial"))) { curobjPI.Potencial = (string)(dataReader.GetValue(dataReader.GetOrdinal("Potencial"))); }

                        Potencial_Incidentes.Add(curobjPI);
                    }
                    DataPlanAnual.Potencial_Incidentes = Potencial_Incidentes;
                    log.LogInformation("DataPlanAnual.Potencial_Incidente");
                     //--------------------------------------------YA Potencial_Incidentes -------------------






















                    //--------------------------------------------YA Condicion_Embarcacion -------------------
                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        Condicion_Embarcacion curobjCEB = new Condicion_Embarcacion();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjCEB.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Condicion"))) { curobjCEB.Condicion = (string)(dataReader.GetValue(dataReader.GetOrdinal("Condicion"))); }

                        Condicion_Embarcacion.Add(curobjCEB);
                    }
                    DataPlanAnual.Condicion_Embarcacion = Condicion_Embarcacion;
                    log.LogInformation("DataPlanAnual.Condicion_Embarcacion");
                     //--------------------------------------------YA Condicion_Embarcacion -------------------



                     //--------------------------------------------YA Proceso -------------------
                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        Proceso curobjCProc = new Proceso();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjCProc.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Proceso"))) { curobjCProc.Proceso1 = (string)(dataReader.GetValue(dataReader.GetOrdinal("Proceso"))); }

                        Proceso.Add(curobjCProc);
                    }
                    DataPlanAnual.Proceso = Proceso;
                    log.LogInformation("DataPlanAnual.Proceso");
                     //--------------------------------------------YA Proceso -------------------



                     //--------------------------------------------YA Subproceso -------------------
                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        Subproceso curobjCSProc = new Subproceso();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjCSProc.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Subproceso"))) { curobjCSProc.Subproceso1 = (string)(dataReader.GetValue(dataReader.GetOrdinal("Subproceso"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("ProcesoId"))) { curobjCSProc.ProcesoId = (long)(dataReader.GetValue(dataReader.GetOrdinal("ProcesoId"))); }

                        Subproceso.Add(curobjCSProc);
                    }
                    DataPlanAnual.Subproceso = Subproceso;
                    log.LogInformation("DataPlanAnual.Subproceso");
                     //--------------------------------------------YA Subproceso -------------------














                     //--------------------------------------------YA Ocurrencia_Incidente -------------------
                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        Ocurrencia_Incidente curobjCOI = new Ocurrencia_Incidente();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjCOI.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Ocurrencia"))) { curobjCOI.Ocurrencia = (string)(dataReader.GetValue(dataReader.GetOrdinal("Ocurrencia"))); }

                        Ocurrencia_Incidente.Add(curobjCOI);
                    }
                    DataPlanAnual.Ocurrencia_Incidente = Ocurrencia_Incidente;
                    log.LogInformation("DataPlanAnual.Ocurrencia_Incidente");
                     //--------------------------------------------YA Ocurrencia_Incidente -------------------


                      //--------------------------------------------YA Lugar -------------------
                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        Lugar curobjCLug = new Lugar();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjCLug.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Lugar"))) { curobjCLug.Lugar1 = (string)(dataReader.GetValue(dataReader.GetOrdinal("Lugar"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("ZonaId"))) { curobjCLug.ZonaId = (long)(dataReader.GetValue(dataReader.GetOrdinal("ZonaId"))); }

                        Lugar.Add(curobjCLug);
                    }
                    DataPlanAnual.Lugar = Lugar;
                    log.LogInformation("DataPlanAnual.Lugar");
                     //--------------------------------------------YA Lugar -------------------




                    //--------------------------------------------YA Dannio_Lesion -------------------
                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        Dannio_Lesion curobjCDLS = new Dannio_Lesion();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjCDLS.Id = (int)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Dannio_Lesion"))) { curobjCDLS.Dannio_Lesion1 = (string)(dataReader.GetValue(dataReader.GetOrdinal("Dannio_Lesion"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Tipo_LesionId"))) { curobjCDLS.Tipo_LesionId = (long)(dataReader.GetValue(dataReader.GetOrdinal("Tipo_LesionId"))); }

                        Dannio_Lesion.Add(curobjCDLS);
                    }
                    DataPlanAnual.Dannio_Lesion = Dannio_Lesion;
                    log.LogInformation("DataPlanAnual.Dannio_Lesion");
                     //--------------------------------------------YA Dannio_Lesion -------------------



                     //--------------------------------------------YA Parte_Cuerpo_Lesion -------------------
                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        Parte_Cuerpo_Lesion curobjCPCL = new Parte_Cuerpo_Lesion();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjCPCL.Id = (int)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Parte_Cuerpo"))) { curobjCPCL.Parte_Cuerpo = (string)(dataReader.GetValue(dataReader.GetOrdinal("Parte_Cuerpo"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Dannio_LesionId"))) { curobjCPCL.Dannio_LesionId = (long)(dataReader.GetValue(dataReader.GetOrdinal("Dannio_LesionId"))); }

                        Parte_Cuerpo_Lesion.Add(curobjCPCL);
                    }
                    DataPlanAnual.Parte_Cuerpo_Lesion = Parte_Cuerpo_Lesion;
                    log.LogInformation("DataPlanAnual.Parte_Cuerpo_Lesion");
                     //--------------------------------------------YA Parte_Cuerpo_Lesion -------------------



                 //--------------------------------------------YA Asesor -------------------
                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        Asesor curobjCAss = new Asesor();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjCAss.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Asesor"))) { curobjCAss.Asesor1 = (string)(dataReader.GetValue(dataReader.GetOrdinal("Asesor"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Especialidad"))) { curobjCAss.Especialidad = (string)(dataReader.GetValue(dataReader.GetOrdinal("Especialidad"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("EmpresaId"))) { curobjCAss.EmpresaId = (long)(dataReader.GetValue(dataReader.GetOrdinal("EmpresaId"))); }

                        Asesor.Add(curobjCAss);
                    }
                    DataPlanAnual.Asesor = Asesor;
                    log.LogInformation("DataPlanAnual.Asesor");
                     //--------------------------------------------YA Asesor -------------------


                     //--------------------------------------------YA Gerencia1 -------------------
                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        Gerencia1 curobjCG1 = new Gerencia1();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjCG1.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Gerencia"))) { curobjCG1.Gerencia = (string)(dataReader.GetValue(dataReader.GetOrdinal("Gerencia"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code"))) { curobjCG1.Code = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code"))); }

                        Gerencia1.Add(curobjCG1);
                    }
                    DataPlanAnual.Gerencia1 = Gerencia1;
                    log.LogInformation("DataPlanAnual.Gerencia1");
                     //--------------------------------------------YA Gerencia1 -------------------



                      //--------------------------------------------YA Region -------------------
                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        Region curobjCG1 = new Region();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjCG1.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Region"))) { curobjCG1.Region1 = (string)(dataReader.GetValue(dataReader.GetOrdinal("Region"))); }

                        Region.Add(curobjCG1);
                    }
                    DataPlanAnual.Region = Region;
                    log.LogInformation("DataPlanAnual.Region");
                     //--------------------------------------------YA Region -------------------






                      //--------------------------------------------YA Impacto_Ambiental -------------------
                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        Impacto_Ambiental curobjCiiA = new Impacto_Ambiental();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjCiiA.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Impacto"))) { curobjCiiA.Impacto = (string)(dataReader.GetValue(dataReader.GetOrdinal("Impacto"))); }

                        Impacto_Ambiental.Add(curobjCiiA);
                    }
                    DataPlanAnual.Impacto_Ambiental = Impacto_Ambiental;
                    log.LogInformation("DataPlanAnual.Impacto_Ambiental");
                     //--------------------------------------------YA Impacto_Ambiental -------------------


                      //--------------------------------------------YA Contaminante -------------------
                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        Contaminante curobjCCont = new Contaminante();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjCCont.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Contaminante"))) { curobjCCont.Contaminante1 = (string)(dataReader.GetValue(dataReader.GetOrdinal("Contaminante"))); }

                        Contaminante.Add(curobjCCont);
                    }
                    DataPlanAnual.Contaminante = Contaminante;
                    log.LogInformation("DataPlanAnual.Contaminante");
                     //--------------------------------------------YA Contaminante -------------------

                    


                      //--------------------------------------------YA Descripcion_Evento_Ambiental -------------------
                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        Descripcion_Evento_Ambiental curobjCDEA = new Descripcion_Evento_Ambiental();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjCDEA.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Descripcion"))) { curobjCDEA.Descripcion = (string)(dataReader.GetValue(dataReader.GetOrdinal("Descripcion"))); }

                        Descripcion_Evento_Ambiental.Add(curobjCDEA);
                    }
                    DataPlanAnual.Descripcion_Evento_Ambiental = Descripcion_Evento_Ambiental;
                    log.LogInformation("DataPlanAnual.Descripcion_Evento_Ambiental");
                     //--------------------------------------------YA Impacto_Ambiental -------------------


                      //--------------------------------------------YA Descripcion_Evento_Ambiental -------------------
                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        Carga_Accidente curobjCDEA1 = new Carga_Accidente();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjCDEA1.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Carga"))) { curobjCDEA1.Carga = (string)(dataReader.GetValue(dataReader.GetOrdinal("Carga"))); }

                        Carga_Accidente.Add(curobjCDEA1);
                    }
                    DataPlanAnual.Carga_Accidente = Carga_Accidente;
                    log.LogInformation("DataPlanAnual.Carga_Accidente");
                     //--------------------------------------------YA Impacto_Ambiental -------------------


                  
                     //--------------------------------------------YA final -------------------
                    dataReader.NextResult();

                    while (dataReader.Read())
                    {
                        Programas2 curobjP1k = new Programas2();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjP1k.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Temporada"))) { curobjP1k.Temporada = (string)(dataReader.GetValue(dataReader.GetOrdinal("Temporada"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code"))) { curobjP1k.Code = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Grupo"))) { curobjP1k.Grupo = (int)(dataReader.GetValue(dataReader.GetOrdinal("Grupo"))); }


                        Programas2.Add(curobjP1k);
                    }
                    DataPlanAnual.Programas2 = Programas2;
                    log.LogInformation("DataPlanAnual.Programas2---Veda temporada");

                    //--------------------------------------------YA Final- -------------------















                }

                if (conn.State == System.Data.ConnectionState.Open)
                    conn.Close();
            }
        }
        catch (Exception ex)
        {
            lobjs  = new List<PlanAnualGet>();
            curobj = new PlanAnualGet();
            curobj.Id = 0;
            curobj.Code = System.Convert.ToString(ex.Message);//pendiente con esto
            lobjs.Add(curobj);
            DataPlanAnual.PlanAnual = lobjs;

        }

        return DataPlanAnual;
    }




}








public class DataPlanAnual //dejar igual
{
  public List<PlanAnualGet> PlanAnual {get; set;} //Accidente-Incidente
  //*********************   COMBOS   *************************
  public List<Programas> Programas {get; set;} //  TipoEvento
  public List<Programas1> Programas1 {get; set;} //  TipoLesion
  public List<Programas2> Programas2 {get; set;} //  TipoLesion
  public List<Gerencias> Gerencias {get; set;} //  Empresas
  public List<Sedes> Sedes {get; set;}         //  Sede
  public List<Estado_Planes> Estado_Planes {get; set;} //Embarcacion
  public List<Zonas> Zonas {get; set;}
  public List<Areas> Areas {get; set;}
  public List<Potencial_Incidentes> Potencial_Incidentes {get; set;} //-------- NO POR AHORA -------

  public List<Condicion_Embarcacion> Condicion_Embarcacion {get; set;}
  public List<Proceso> Proceso                             {get; set;}
  public List<Subproceso> Subproceso                       {get; set;}

  public List<Ocurrencia_Incidente> Ocurrencia_Incidente {get; set;}
  public List<Lugar> Lugar {get; set;}
  public List<Dannio_Lesion> Dannio_Lesion {get; set;}
  public List<Parte_Cuerpo_Lesion> Parte_Cuerpo_Lesion {get; set;}
  public List<Asesor> Asesor {get; set;}
  public List<Gerencia1> Gerencia1 {get; set;}
  public List<Region> Region {get; set;}


  public List<Impacto_Ambiental> Impacto_Ambiental {get; set;}
  public List<Contaminante> Contaminante {get; set;}
  public List<Descripcion_Evento_Ambiental> Descripcion_Evento_Ambiental {get; set;}
  public List<Carga_Accidente> Carga_Accidente {get; set;}







  //public List<Tipo_Lesiones> Tipo_Lesiones {get; set;} //  TipoEvento

}

public class PlanAnualGet   //Accidente-Incidente
{
    public long Id                                { get; set;}
    public string Code                            { get; set;}

    public long IdTipoEvento                      { get; set; }
    public string Tipo_Evento                     { get; set; } //Tipo_Evento
    public int GrupoEvento                        { get; set; } //Tipo_Evento

    public long IdEmpresa                         { get; set; }
    public string NombreEmpresa                   { get; set; } //NombreEmpresa


    public long IdSede                            { get; set; }
    public string Sede                            { get; set; }

    public long IdZona                            { get; set; }
    public string Zona                            { get; set; }

    public long IdEmbarcacion                     { get; set; }//IdEmbarcacion
    public string Embarcacion                     { get; set; }//Embarcacion

    public string Fecha                           {get; set;} //Fecha
    public string Hora                            {get; set;} //Hora

    public long IdEstadoIncidente                 {get; set;}//IdEstadoIncidente
    public string Estado_Incidente                {get; set;}//Estado_Incidente
    public string Color                           {get; set;}//Color

    public int HayPersonalAfectado {get;set;} // 0 tasa 1 tercero
    public long IdArea {get;set;}
    public string Area {get;set;}
    public string DescripcionEvento {get;set;}


    public string A_NombrePersonalAccidentado {get;set;}
    public string A_DniPersonalAccidentado {get;set;}
    public string A_IdPersonalAccidentado {get;set;}
    public string A_PuestoCargoAccidentado {get;set;}
    public string A_NombreJefeAccidentado {get;set;}
    public string A_IdJefeAccidentado {get;set;}


        // tipo de accidente ambiental
    public string B_TipoProducto {get;set;}
    public string B_ProductoInvolucrado {get;set;}
    public string B_Volumen {get;set;}
    public string B_Area {get;set;}
    public string B_Fuente {get;set;}
    public string B_NombreJefeInmediato {get;set;}
    public string B_IdJefeInmediato {get;set;}

    //Daños materiales
    public string C_Hurt {get;set;} //daño


    //public List<Objetivo> Evidencias                {get; set;} //fotos

    // public string   Adjunto1                     { get; set; }
    // public string   Adjunto2                     { get; set; }
    // public string   Adjunto3                     { get; set; }
    // public string   Adjunto4                     { get; set; }
    // public string   Adjunto5                     { get; set; }


    //Datos Generales de la Investigación
    public string xDescripcion                     { get; set; } //Tipo_Evento
    public long xIdTipoEventoLesion                { get; set; } //Tipo_Evento
    public long xIdTipoEventoLesion2               { get; set; } //Tipo_Evento
    public long xIdTipoEventoLesion3               { get; set; } //Tipo_Evento
    public long xIdPlanta                          { get; set; } //Tipo_Evento
    public string xPlanta                          { get; set; } //Tipo_Evento





    //------------------------------- Datos de ,la Alerta de este incidente ------------------------------------------
    public long yIdAlerta                          { get; set; } // -- si es 0 no se le ha creado alerta,>0 si existe y se muestran estos datos
    public string yDetalle                         { get; set; }
    public long yIdSede                             { get; set; }
    public long yIdZona                             { get; set; }
    public long yIdTipoEvento                       { get; set; }
    public string yFecha                           { get; set; }
    public string yHora                            { get; set; }
    public string yDiagnostico                     { get; set; }
    public string yDescripcion                     { get; set; }
    public string yCompromiso                      { get; set; }
    //public string yAdjunto1                        { get; set; }
    //public string yAdjunto2                        { get; set; }
    //public string yPdf                             { get; set; }
    //------------------------------- Datos de ,la Alerta de este incidente ------------------------------------------


    public long  IdHallazgo                         { get; set; }
    public long InformeInvestigacion                { get; set; }
    public long InformeInvestigacion3                { get; set; }

    public string Dannio                            { get; set; }
    public string Lesion                            { get; set; }

    
    public string Contaminantes                     { get; set; }
    public long   ContaminanteId                    { get; set; }//*************


    public int    Volumen                           { get; set; }
    public int    Unidad                            { get; set; }
    public int    AreaImpactada                     { get; set; }

    public string ImpactoAmbiental                  { get; set; }
    public long ImpactoAmbientalId                { get; set; }//*********************


    public long   IdDatosGenerales                  { get; set; }
    public long   IdDatosGenerales2                 { get; set; }
    public long   IdDatosGenerales3                 { get; set; }



    public int    FinalizadoSSO                     { get; set; }
    public int    FinalizadoA                       { get; set; }
    public int    FinalizadoMat                      { get; set; }

    public string    ClasificacionSSO                  { get; set; }
    public string    ClasificacionA                    { get; set; }
    public string    ClasificacionMat                    { get; set; }
    public long      Potencial                       { get; set; }

}



public class Objetivo    // ----- Es Evidencia
{
    public long     Id                     { get; set; }
    public string   Nombre_Foto            { get; set; }
    public string   EvidenciaFile          { get; set; }
}





















// public class Objetivo    // -----Por ahora no
// {
//     public long     Id                     { get; set; }
//     public int     Tipo                    { get; set; }
//     public string   Objetivo_Name          { get; set; }
//     public int      Nun_Actividades        { get; set; }
//     public string   Code                   { get; set; }
//     public List<SubObjetivo> SubObjetivos  { get; set; } //listado  de subobjetiivos del objetivo
//     public List<Actividad> Actividades     { get; set; } //listado  de actividades del objetivo
// }

public class SubObjetivo  // Por ahora no
{
    public long     Id                  { get; set; }
    public int     Tipo                 { get; set; }
    public string   SubObjetivo_Name    { get; set; }
    public int      Nun_Actividades     { get; set; }
    public string   Code                { get; set; }
    public List<Actividad> Actividades  { get; set; } //listado  de actividades del objetivo
}




public class Actividad  // Por ahora no
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
    public List<Responsable> Responsable  { get; set; } //listado  de Responsables
    public List<ControlCambios> ControlCambios  { get; set; } //listado  de Responsables
}



public class Responsable   // Por ahora no
{
    public string Motivo { get; set; }
    public string Old_ResponsableName { get; set;}
    public string New_ResponsableName { get; set;}
    public string Date { get; set; }
}


public class Tarea      // Por ahora no
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
    public List<Adjuntos> Adjuntos       { get; set; }
    public List<Historial> Historial     { get; set; }

}

public class Adjuntos   // Por ahora no
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

public class Historial     // Por ahora no
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

public class Cronograma    // Por ahora no
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





















//-------------------------- ya andy Programas --------------- TipoEvento
public class Programas
{
    public long Id {get;set;}
    public string Evento  {get;set;} //Programa
    public string Code {get;set;}
    public int Grupo {get;set;}
}
//-------------------------- ya andy Programas ---------------

//-------------------------- ya andy  Gerencias ---------------  Empresas
public class Gerencias
{
    public long Id {get;set;}
    public string Empresa  {get;set;} //Gerencia
    public string RucEmpresa  {get;set;}
}
//-------------------------- ya andy Gerencias  ---------------


//-------------------------- ya andy  Sedes ---------------  Sede
public class Sedes
{
    public long Id              {get;set;}
    public long UnidadNegocioId {get;set;}
    public string Sede          {get;set;}
}
//-------------------------- ya andy  Sedes ---------------


//-------------------------- ya andy Estado_Planes ---------------  Embarcacion
public class Estado_Planes
{
    public long Id {get;set;}
    public string Embarcacion  {get;set;} //Estado
    //public string Color {get;set;}
}
//-------------------------- ya andy Estado_Planes ---------------


//-------------------------- ya andy  Zonas ---------------  Zona
public class Zonas
{
    public long Id {get;set;}
    public string Zona {get;set;}
    public long UnidadNegocioId {get;set;}
}
//-------------------------- ya andy  Sedes ---------------

//-------------------------- ya andy  Areas ---------------  Areas
public class Areas
{
    public long Id {get;set;}
    public string Area {get;set;}
    public long UnidadNegocioId {get;set;}
}
//-------------------------- ya andy  Areas ---------------


//-------------------------- ya andy Programas --------------- TipoEvento
public class Programas1
{
    public long Id {get;set;}
    public string Evento  {get;set;} //Programa
    public string Code {get;set;}
    public int Grupo {get;set;}
}
//-------------------------- ya andy Programas ---------------

//-------------------------- ya andy Veda --------------- Veda
public class Programas2
{
    public long Id {get;set;}
    public string Temporada  {get;set;} //Programa
    public string Code {get;set;}
    public int Grupo {get;set;}
}
//-------------------------- ya andy Veda ---------------


//-------------------------- ya andy Estado_Planes --------------- //-------- NO POR AHORA -------
public class Equipos
{
    public long Id {get;set;}
    public string Equipo {get;set;}
    public string Code {get;set;}
}
//-------------------------- ya andy Estado_Planes ---------------


public class ControlCambios //--------------------   //-------- NO POR AHORA -------
{
    public long Id { get; set; }
    public long IdActividad { get; set; }
    public bool? Cronograma {get; set;}
    public int Flag_Adjunto { get; set; }

    public string Nombre { get; set; }
    public string Adjunto { get; set; }
    public string Date { get; set; }
}

// ----------------------- ##############################  08 ABRIL CASA  ###############################################################

public class Potencial_Incidentes
{
    public long Id {get;set;}
    public string Potencial {get;set;}
}


public class Condicion_Embarcacion
{
    public long Id {get;set;}
    public string Condicion {get;set;}
}


public class Proceso
{
    public long Id {get;set;}
    public string Proceso1 {get;set;}
}

public class Subproceso
{
      public long Id {get;set;}
      public string Subproceso1 {get;set;}
      public long ProcesoId {get;set;}
}










public class Ocurrencia_Incidente
{
    public long Id {get;set;}
    public string Ocurrencia {get;set;}
}

public class Lugar
{
    public long Id {get;set;}
    public string Lugar1 {get;set;}
    public long ZonaId {get;set;}
}

public class Dannio_Lesion
{
    public int Id {get;set;}
    public string Dannio_Lesion1 {get;set;}
    public long Tipo_LesionId {get;set;}
}

public class Parte_Cuerpo_Lesion
{
    public int Id {get;set;}
    public string Parte_Cuerpo {get;set;}
    public long Dannio_LesionId {get;set;}
}

public class Asesor
{
    public long Id {get;set;}
    public string Asesor1 {get;set;}
    public string Especialidad {get;set;}
    public long EmpresaId {get;set;}
}


public class Gerencia1
{
    public long Id {get;set;}
    public string Gerencia {get;set;}
    public string Code {get;set;}
}

public class Region
{
    public long Id {get;set;}
    public string Region1 {get;set;}
}


public class Impacto_Ambiental
{
    public long Id {get;set;}
    public string Impacto {get;set;}
}

public class Contaminante
{
    public long Id {get;set;}
    public string Contaminante1 {get;set;}
}

public class Descripcion_Evento_Ambiental
{
    public long Id {get;set;}
    public string Descripcion {get;set;}
}

public class Carga_Accidente
{
    public long Id {get;set;}
    public string Carga {get;set;}
}


