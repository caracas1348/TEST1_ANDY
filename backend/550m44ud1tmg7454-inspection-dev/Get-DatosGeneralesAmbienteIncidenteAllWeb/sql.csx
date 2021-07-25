/****************************************************************************************
* VISUAL SAT - [2021]
* PROYECTO : SIGTASA
* ESQUEMA : SSOMA
* SPRINT  : 4
* MODULO : INCIDENTE ACCIDENTE
* OPERADORES_________________________________________________________________________
* | # | PROGRAMADOR     |  |      FECHA   |  |   HORA   |           CORREO           |
* | 1 | Andy Vásquez    |  |  21/04/2021  |  | 23:30:50 |    caracas1348@gmail.com   |
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
        List<Areas> Areas  = new List<Areas>();//##########################NO POR AHORA**

        //Listado de objetos de Programas
        List<Programas1> Programas1  = new List<Programas1>();//TipoEvento


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

                SqlCommand cmd = new SqlCommand("[ssoma].[a_get_lista_datos_generales_incidente_ambiental]", conn);//legue hasta aqui andy
                                                //a_get_lista_datos_generales_incidente_ambiental

                log.LogInformation("SqlCommand 103 ");
                //cmd.Parameters.AddWithValue("@Id", Id);
                cmd.Parameters.AddWithValue("@IdIncidente", IdTipoEvento);
                //cmd.Parameters.AddWithValue("@AccionBD", IdEmpresa);
                


                cmd.CommandType = CommandType.StoredProcedure;
                log.LogInformation("CommandType 113");
                //Ejecutar Comando buscaremos los Planes Anuales registrados
                using (SqlDataReader dataReader = await cmd.ExecuteReaderAsync())
                {
                    //Navegar en el Conjunto de Datos Recuperados AccidenteProceso
                    while (dataReader.Read())
                    {
                          curobj = new PlanAnualGet();



                           if(!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobj.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }log.LogInformation("Dentro del While (Id) = "+curobj.Id);

                           if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdTipoEvento"))) 
                           { curobj.IdTipoEvento = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdTipoEvento"))); } log.LogInformation("Dentro del While (IdTipoEvento) = "+curobj.IdTipoEvento);


                           if (!dataReader.IsDBNull(dataReader.GetOrdinal("Fecha"))) 
                           { curobj.Fecha = (string)(dataReader.GetValue(dataReader.GetOrdinal("Fecha"))); } log.LogInformation("Dentro del While (Fecha) = "+curobj.Fecha);


                           if (!dataReader.IsDBNull(dataReader.GetOrdinal("Hora"))) 
                           { curobj.Hora = (string)(dataReader.GetValue(dataReader.GetOrdinal("Hora"))); } log.LogInformation("Dentro del While (Hora) = "+curobj.Hora);


                           if (!dataReader.IsDBNull(dataReader.GetOrdinal("ReporteExterno"))) 
                           { curobj.ReporteExterno = (int)(dataReader.GetValue(dataReader.GetOrdinal("ReporteExterno"))); } log.LogInformation("Dentro del While (ReporteExterno) = "+curobj.ReporteExterno);


                           if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdGerencia"))) 
                           { curobj.IdGerencia = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdGerencia"))); } log.LogInformation("Dentro del While (IdGerencia) = "+curobj.IdGerencia);


                           if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdSede"))) 
                           { curobj.IdSede = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdSede"))); } log.LogInformation("Dentro del While (IdSede) = "+curobj.IdSede);


                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdZonaUbicacion"))) 
                           { curobj.IdZonaUbicacion = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdZonaUbicacion"))); } log.LogInformation("Dentro del While (IdZonaUbicacion) = "+curobj.IdZonaUbicacion);


                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("HayPersonalAfectado"))) 
                           { curobj.HayPersonalAfectado = (int)(dataReader.GetValue(dataReader.GetOrdinal("HayPersonalAfectado"))); } log.LogInformation("Dentro del While (HayPersonalAfectado) = "+curobj.HayPersonalAfectado);




                          // if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdEmpresa"))) 
                          //  { curobj.IdEmpresa1 = (string)(dataReader.GetValue(dataReader.GetOrdinal("IdEmpresa1"))); } log.LogInformation("Dentro del While (IdEmpresa1) = "+curobj.IdEmpresa1);





                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("Descripcion"))) 
                           { curobj.Descripcion = (string)(dataReader.GetValue(dataReader.GetOrdinal("Descripcion"))); } log.LogInformation("Dentro del While (Descripcion) = "+curobj.Descripcion);


                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("AcccionesInmediatas"))) 
                           { curobj.AcccionesInmediatas = (string)(dataReader.GetValue(dataReader.GetOrdinal("AcccionesInmediatas"))); } log.LogInformation("Dentro del While (AcccionesInmediatas) = "+curobj.AcccionesInmediatas);


                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdContaminante"))) 
                           { curobj.IdContaminante = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdContaminante"))); } log.LogInformation("Dentro del While (IdContaminante) = "+curobj.IdContaminante);


                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("Volumen"))) 
                           { curobj.Volumen = (int)(dataReader.GetValue(dataReader.GetOrdinal("Volumen"))); } log.LogInformation("Dentro del While (Volumen) = "+curobj.Volumen);


                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("UnidadVolumen"))) 
                           { curobj.UnidadVolumen = (int)(dataReader.GetValue(dataReader.GetOrdinal("UnidadVolumen"))); } log.LogInformation("Dentro del While (UnidadVolumen) = "+curobj.UnidadVolumen);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("AreaImpactada"))) 
                           { curobj.AreaImpactada = (int)(dataReader.GetValue(dataReader.GetOrdinal("AreaImpactada"))); } log.LogInformation("Dentro del While (AreaImpactada) = "+curobj.AreaImpactada);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("IdImpactoAmbiental"))) 
                           { curobj.IdImpactoAmbiental = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdImpactoAmbiental"))); } log.LogInformation("Dentro del While (IdImpactoAmbiental) = "+curobj.IdImpactoAmbiental);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("xIdDescripcionEvento"))) 
                           { curobj.xIdDescripcionEvento = (long)(dataReader.GetValue(dataReader.GetOrdinal("xIdDescripcionEvento"))); } log.LogInformation("Dentro del While (xIdDescripcionEvento) = "+curobj.xIdDescripcionEvento);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("xImpactoAmbiental"))) 
                           { curobj.xImpactoAmbiental = (int)(dataReader.GetValue(dataReader.GetOrdinal("xImpactoAmbiental"))); } log.LogInformation("Dentro del While (xImpactoAmbiental) = "+curobj.xImpactoAmbiental);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("xReaccionPublica"))) 
                           { curobj.xReaccionPublica = (int)(dataReader.GetValue(dataReader.GetOrdinal("xReaccionPublica"))); } log.LogInformation("Dentro del While (xReaccionPublica) = "+curobj.xReaccionPublica);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("xRelacionComunidad"))) 
                           { curobj.xRelacionComunidad = (int)(dataReader.GetValue(dataReader.GetOrdinal("xRelacionComunidad"))); } log.LogInformation("Dentro del While (xRelacionComunidad) = "+curobj.xRelacionComunidad);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("xLegal"))) 
                           { curobj.xLegal = (int)(dataReader.GetValue(dataReader.GetOrdinal("xLegal"))); } log.LogInformation("Dentro del While (xLegal) = "+curobj.xLegal);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("xCalificacion"))) 
                           { curobj.xCalificacion = (int)(dataReader.GetValue(dataReader.GetOrdinal("xCalificacion"))); } log.LogInformation("Dentro del While (xCalificacion) = "+curobj.xCalificacion);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("xNivelSeveridad"))) 
                           { curobj.xNivelSeveridad = (string)(dataReader.GetValue(dataReader.GetOrdinal("xNivelSeveridad"))); } log.LogInformation("Dentro del While (xNivelSeveridad) = "+curobj.xNivelSeveridad);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("xIIAUnidad"))) 
                           { curobj.xIIAUnidad = (int)(dataReader.GetValue(dataReader.GetOrdinal("xIIAUnidad"))); } log.LogInformation("Dentro del While (xIIAUnidad) = "+curobj.xIIAUnidad);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("xIIACorporativo"))) 
                           { curobj.xIIACorporativo = (float)(dataReader.GetValue(dataReader.GetOrdinal("xIIACorporativo"))); } log.LogInformation("Dentro del While (xIIACorporativo) = "+curobj.xIIACorporativo);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("xMetaCorporativa"))) 
                           { curobj.xMetaCorporativa = (float)(dataReader.GetValue(dataReader.GetOrdinal("xMetaCorporativa"))); } log.LogInformation("Dentro del While (xMetaCorporativa) = "+curobj.xMetaCorporativa);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("xIIAUnidadPesca"))) 
                           { curobj.xIIAUnidadPesca = (int)(dataReader.GetValue(dataReader.GetOrdinal("xIIAUnidadPesca"))); } log.LogInformation("Dentro del While (xIIAUnidadPesca) = "+curobj.xIIAUnidadPesca);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("xIIACoporativoPesca"))) 
                           { curobj.xIIACoporativoPesca = (float)(dataReader.GetValue(dataReader.GetOrdinal("xIIACoporativoPesca"))); } log.LogInformation("Dentro del While (xIIACoporativoPesca) = "+curobj.xIIACoporativoPesca);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("xMetaPesac"))) 
                           { curobj.xMetaPesac = (float)(dataReader.GetValue(dataReader.GetOrdinal("xMetaPesac"))); } log.LogInformation("Dentro del While (xMetaPesac) = "+curobj.xMetaPesac);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("xIIAOperaciones"))) 
                           { curobj.xIIAOperaciones = (int)(dataReader.GetValue(dataReader.GetOrdinal("xIIAOperaciones"))); } log.LogInformation("Dentro del While (xIIAOperaciones) = "+curobj.xIIAOperaciones);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("xIIACoporativoOperaciones"))) 
                           { curobj.xIIACoporativoOperaciones = (float)(dataReader.GetValue(dataReader.GetOrdinal("xIIACoporativoOperaciones"))); } log.LogInformation("Dentro del While (xIIACoporativoOperaciones) = "+curobj.xIIACoporativoOperaciones);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("xMetaOperaciones"))) 
                           { curobj.xMetaOperaciones = (float)(dataReader.GetValue(dataReader.GetOrdinal("xMetaOperaciones"))); } log.LogInformation("Dentro del While (xMetaOperaciones) = "+curobj.xMetaOperaciones);

                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("xIIAdminFinanzas"))) 
                           { curobj.xIIAdminFinanzas = (int)(dataReader.GetValue(dataReader.GetOrdinal("xIIAdminFinanzas"))); } log.LogInformation("Dentro del While (xIIAdminFinanzas) = "+curobj.xIIAdminFinanzas);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("xIIACoporAdmiFinanzas"))) 
                           { curobj.xIIACoporAdmiFinanzas = (float)(dataReader.GetValue(dataReader.GetOrdinal("xIIACoporAdmiFinanzas"))); } log.LogInformation("Dentro del While (xIIACoporAdmiFinanzas) = "+curobj.xIIACoporAdmiFinanzas);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("xMetaAdminFinanazas"))) 
                           { curobj.xMetaAdminFinanazas = (int)(dataReader.GetValue(dataReader.GetOrdinal("xMetaAdminFinanazas"))); } log.LogInformation("Dentro del While (xMetaAdminFinanazas) = "+curobj.xMetaAdminFinanazas);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("yNumColaboradores"))) 
                           { curobj.yNumColaboradores = (int)(dataReader.GetValue(dataReader.GetOrdinal("yNumColaboradores"))); } log.LogInformation("Dentro del While (yNumColaboradores) = "+curobj.yNumColaboradores);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("yNumHora"))) 
                           { curobj.yNumHora = (int)(dataReader.GetValue(dataReader.GetOrdinal("yNumHora"))); } log.LogInformation("Dentro del While (yNumHora) = "+curobj.yNumHora);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("yCostoMOS"))) 
                           { curobj.yCostoMOS = (int)(dataReader.GetValue(dataReader.GetOrdinal("yCostoMOS"))); } log.LogInformation("Dentro del While (yCostoMOS) = "+curobj.yCostoMOS);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("yNumColaboradores2"))) 
                           { curobj.yNumColaboradores2 = (int)(dataReader.GetValue(dataReader.GetOrdinal("yNumColaboradores2"))); } log.LogInformation("Dentro del While (yNumColaboradores2) = "+curobj.yNumColaboradores2);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("yNumHora2"))) 
                           { curobj.yNumHora2 = (int)(dataReader.GetValue(dataReader.GetOrdinal("yNumHora2"))); } log.LogInformation("Dentro del While (yNumHora2) = "+curobj.yNumHora2);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("yCostoMOS2"))) 
                           { curobj.yCostoMOS2 = (float)(dataReader.GetValue(dataReader.GetOrdinal("yCostoMOS2"))); } log.LogInformation("Dentro del While (yCostoMOS2) = "+curobj.yCostoMOS2);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("yCantProducto"))) 
                           { curobj.yCantProducto = (int)(dataReader.GetValue(dataReader.GetOrdinal("yCantProducto"))); } log.LogInformation("Dentro del While (yCantProducto) = "+curobj.yCantProducto);
                          

                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("yCostoProductoS"))) 
                           { curobj.yCostoProductoS = (float)(dataReader.GetValue(dataReader.GetOrdinal("yCostoProductoS"))); } log.LogInformation("Dentro del While (yCostoProductoS) = "+curobj.yCostoProductoS);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("yCostoProductoS2"))) 
                           { curobj.yCostoProductoS2 = (float)(dataReader.GetValue(dataReader.GetOrdinal("yCostoProductoS2"))); } log.LogInformation("Dentro del While (yCostoProductoS2) = "+curobj.yCostoProductoS2);

                           

                           if(!dataReader.IsDBNull(dataReader.GetOrdinal("ycostoMateriales"))) 
                           { curobj.ycostoMateriales = (float)(dataReader.GetValue(dataReader.GetOrdinal("ycostoMateriales"))); } log.LogInformation("Dentro del While (ycostoMateriales) = "+curobj.ycostoMateriales);










                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("yCostoServicioS"))) 
                           { curobj.yCostoServicioS = (float)(dataReader.GetValue(dataReader.GetOrdinal("yCostoServicioS"))); } log.LogInformation("Dentro del While (yCostoServicioS) = "+curobj.yCostoServicioS);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("yCostoMultaS"))) 
                           { curobj.yCostoMultaS = (float)(dataReader.GetValue(dataReader.GetOrdinal("yCostoMultaS"))); } log.LogInformation("Dentro del While (yCostoMultaS) = "+curobj.yCostoMultaS);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("yOtroS"))) 
                           { curobj.yOtroS = (float)(dataReader.GetValue(dataReader.GetOrdinal("yOtroS"))); } log.LogInformation("Dentro del While (yOtroS) = "+curobj.yOtroS);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("yCostoTotalS"))) 
                           { curobj.yCostoTotalS = (float)(dataReader.GetValue(dataReader.GetOrdinal("yCostoTotalS"))); } log.LogInformation("Dentro del While (yCostoTotalS) = "+curobj.yCostoTotalS);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("yCostoTotalUSD"))) 
                           { curobj.yCostoTotalUSD = (float)(dataReader.GetValue(dataReader.GetOrdinal("yCostoTotalUSD"))); } log.LogInformation("Dentro del While (yCostoTotalUSD) = "+curobj.yCostoTotalUSD);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("yOefaUit"))) 
                           { curobj.yOefaUit = (int)(dataReader.GetValue(dataReader.GetOrdinal("yOefaUit"))); } log.LogInformation("Dentro del While (yOefaUit) = "+curobj.yOefaUit);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("yOefaS"))) 
                           { curobj.yOefaS = (float)(dataReader.GetValue(dataReader.GetOrdinal("yOefaS"))); } log.LogInformation("Dentro del While (yOefaS) = "+curobj.yOefaS);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("yOefaUSD"))) 
                           { curobj.yOefaUSD = (float)(dataReader.GetValue(dataReader.GetOrdinal("yOefaUSD"))); } log.LogInformation("Dentro del While (yOefaUSD) = "+curobj.yOefaUSD);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("yDicapiUit"))) 
                           { curobj.yDicapiUit = (int)(dataReader.GetValue(dataReader.GetOrdinal("yDicapiUit"))); } log.LogInformation("Dentro del While (yDicapiUit) = "+curobj.yDicapiUit);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("yDicapiS"))) 
                           { curobj.yDicapiS = (float)(dataReader.GetValue(dataReader.GetOrdinal("yDicapiS"))); } log.LogInformation("Dentro del While (yDicapiS) = "+curobj.yDicapiS);


                          if(!dataReader.IsDBNull(dataReader.GetOrdinal("yDicapiUSD"))) 
                           { curobj.yDicapiUSD = (float)(dataReader.GetValue(dataReader.GetOrdinal("yDicapiUSD"))); } log.LogInformation("Dentro del While (yDicapiUSD) = "+curobj.yDicapiUSD);

                           if(!dataReader.IsDBNull(dataReader.GetOrdinal("IdAccidenteIncidente"))) 
                           { curobj.IdAccidenteIncidente = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdAccidenteIncidente"))); } log.LogInformation("Dentro del While (IdAccidenteIncidente) = "+curobj.IdAccidenteIncidente);


                           if(!dataReader.IsDBNull(dataReader.GetOrdinal("TemporadaVeda"))) 
                           { curobj.TemporadaVeda = (long)(dataReader.GetValue(dataReader.GetOrdinal("TemporadaVeda"))); } log.LogInformation("Dentro del While (TemporadaVeda) = "+curobj.TemporadaVeda);



                           if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdEmpresa1"))) 
                          { curobj.IdEmpresa1 = (string)(dataReader.GetValue(dataReader.GetOrdinal("IdEmpresa1"))); } log.LogInformation("Dentro del While (IdEmpresa1) = "+curobj.IdEmpresa1);

                       
                         
                           

                         lobjs.Add(curobj);
                    }

    DataPlanAnual.PlanAnual = lobjs;
    log.LogInformation("DataPlanAnual.PlanAnual");


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
            curobj.Descripcion = System.Convert.ToString(ex.Message);//pendiente con esto
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
}

public class PlanAnualGet   //Accidente-Incidente
{
      
        public long Id                             { get; set; }                            

        public long Id1                            { get; set; }//*
 
        public long AccionBD                       { get; set; }//*

        public long IdTipoEvento                   {get; set;}    //bigint
        public string Fecha                        {get; set;}           // date NULL
        public string Hora                         {get; set;}           // time NULL
        public int ReporteExterno                  {get; set;}           // int NULL
        public long IdGerencia                     {get; set;}           // bigint NULL
        public long IdSede                         {get; set;}           // bigint NULL
        public long IdZonaUbicacion                {get; set;}           // bigint NULL
        public int HayPersonalAfectado             {get; set;}           // int NULL
        public string IdEmpresa1                   {get; set;}           // bigint NULL
        public string Descripcion                  {get; set;}           // varchar(500) NULL
        public string AcccionesInmediatas          {get; set;}           // varchar(350) NULL
        public long IdContaminante                 {get; set;}           // bigint NULL
        public int Volumen                         {get; set;}           // int NULL
        public int UnidadVolumen                   {get; set;}           // int NULL
        public int AreaImpactada                   {get; set;}           // int NULL
        public long IdImpactoAmbiental             {get; set;}           // bigint NULL
        public long xIdDescripcionEvento           {get; set;}           // bigint NULL
        public int xImpactoAmbiental               {get; set;}           // int NULL
        public int xReaccionPublica                {get; set;}           // int NULL
        public int xRelacionComunidad              {get; set;}           // int NULL
        public int xLegal                          {get; set;}           // int NULL
        public int xCalificacion                   {get; set;}           // int NULL
        public string xNivelSeveridad              {get; set;}           // int NULL
        public int xIIAUnidad                      {get; set;}           // int NULL
        public float xIIACorporativo               {get; set;}           // int NULL
        public float xMetaCorporativa              {get; set;}           // int NULL
        public int xIIAUnidadPesca                 {get; set;}           // int NULL
        public float xIIACoporativoPesca           {get; set;}           // int NULL
        public float xMetaPesac                    {get; set;}           // int NULL
        public int xIIAOperaciones                 {get; set;}           // int NULL
        public float xIIACoporativoOperaciones     {get; set;}           // int NULL
        public float xMetaOperaciones              {get; set;}           // int NULL
        public int xIIAdminFinanzas                {get; set;}           // int NULL
        public float xIIACoporAdmiFinanzas         {get; set;}           // int NULL
        public int xMetaAdminFinanazas             {get; set;}           // int NULL
        public int yNumColaboradores               {get; set;}           // int NULL
        public int yNumHora                        {get; set;}           // int NULL
        public int yCostoMOS                       {get; set;}           // int NULL
        public int yNumColaboradores2              {get; set;}           // int NULL
        public int yNumHora2                       {get; set;}           // int NULL
        public float yCostoMOS2                    {get; set;}           // int NULL
        public int yCantProducto                   {get; set;}           // int NULL
        public float yCostoProductoS               {get; set;}           // int NULL
        public float yCostoProductoS2              {get; set;}           // float NULL
        public float ycostoMateriales              {get; set;}           // float NULL//                {get; set;}           // float NULL
        public float yCostoServicioS               {get; set;}           // float NULL
        public float yCostoMultaS                  {get; set;}           // float NULL
        public float yOtroS                        {get; set;}           // float NULL
        public float yCostoTotalS                  {get; set;}           // int NULL
        public float yCostoTotalUSD                {get; set;}           // int NULL
        public int yOefaUit                        {get; set;}           // int NULL
        public float yOefaS                        {get; set;}           // int NULL
        public float yOefaUSD                      {get; set;}          // int NULL
        public int yDicapiUit                      {get; set;}           // int NULL
        public float yDicapiS                      {get; set;}           // int NULL
        public float yDicapiUSD                    {get; set;}           // int NULL
        public long IdAccidenteIncidente           {get; set;}           // int NULL
        public long TemporadaVeda                  {get;set; }  


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
    public long Id {get;set;}
    public string Sede {get;set;}
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
}
//-------------------------- ya andy  Sedes ---------------

//-------------------------- ya andy  Areas ---------------  Areas
public class Areas
{
    public long Id {get;set;}
    public string Area {get;set;}
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



// //-------------------------- ya andy Programas --------------- TipoEvento
// public class Tipo_Lesiones
// {
//     public long Id {get;set;}
//     public string Lesion  {get;set;} //Programa
//     public string Code {get;set;}
//     public int Grupo {get;set;}
// }
// //-------------------------- ya andy Programas ---------------























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