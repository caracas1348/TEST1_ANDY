/****************************************************************************************
* VISUAL SAT - [2021]
* PROYECTO : SIGTASA
* ESQUEMA : SSOMA
* SPRINT  : 4
* MODULO : INCIDENTE ACCIDENTE
* OPERADORES_________________________________________________________________________
* | # | PROGRAMADOR     |  |      FECHA   |  |   HORA   |           CORREO           |
* | 1 | Andy Vásquez    |  |  13/06/2021  |  | 10:30:50 |    caracas1348@gmail.com   |
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

                SqlCommand cmd = new SqlCommand("[ssoma].[a_get_lista_datos_generales_material]", conn);//legue hasta aqui andy

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



                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobj.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); } 
                          log.LogInformation("Dentro del While (Id) = "+curobj.Id);
                      
                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("AccidenteProceso"))) { curobj.AccidenteProceso = (int)(dataReader.GetValue(dataReader.GetOrdinal("AccidenteProceso"))); }  
                          log.LogInformation("Dentro del While (AccidenteProceso) = "+curobj.AccidenteProceso);

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("CodTrabjador"))) { curobj.CodTrabjador = (string)(dataReader.GetValue(dataReader.GetOrdinal("CodTrabjador"))); }//ya  //CodTrabjador
                          log.LogInformation("Dentro del While (CodTrabjador) = "+curobj.CodTrabjador);


                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("DNIAccidentado"))) { curobj.DNIAccidentado = (string)(dataReader.GetValue(dataReader.GetOrdinal("DNIAccidentado"))); }//ya  //DNIAccidentado
                          log.LogInformation("Dentro del While (DNIAccidentado) = "+curobj.DNIAccidentado);


                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("Descanso_estado"))) { curobj.Descanso_estado = (int)(dataReader.GetValue(dataReader.GetOrdinal("Descanso_estado"))); }//ya  //Descanso_estado
                           log.LogInformation("Dentro del While (Descanso_estado) = "+curobj.Descanso_estado);


                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("Descripcion"))) { curobj.Descripcion = (string)(dataReader.GetValue(dataReader.GetOrdinal("Descripcion"))); }//ya  //Descripcion

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("Dias_Descanza"))) { curobj.Dias_Descanza = (int)(dataReader.GetValue(dataReader.GetOrdinal("Dias_Descanza"))); }//ya  //Dias_Descanza

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("EdadAccidentado"))) { curobj.EdadAccidentado = (int)(dataReader.GetValue(dataReader.GetOrdinal("EdadAccidentado"))); }//ya  //EdadAccidentado

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("Expiencia_Month"))) { curobj.Expiencia_Month = (int)(dataReader.GetValue(dataReader.GetOrdinal("Expiencia_Month"))); }//ya  //Expiencia_Month

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("Expiencia_Yaer"))) { curobj.Expiencia_Yaer = (int)(dataReader.GetValue(dataReader.GetOrdinal("Expiencia_Yaer"))); }//ya  //Expiencia_Yaer

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("Fecha"))) { curobj.Fecha = (string)(dataReader.GetValue(dataReader.GetOrdinal("Fecha"))); }//ya  //Fecha

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("FechaInvestigacionFin"))) { curobj.FechaInvestigacionFin = (string)(dataReader.GetValue(dataReader.GetOrdinal("FechaInvestigacionFin"))); }

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("FechaInvestigacionIni"))) { curobj.FechaInvestigacionIni = (string)(dataReader.GetValue(dataReader.GetOrdinal("FechaInvestigacionIni"))); }

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("HayPersonalAfectado"))) { curobj.HayPersonalAfectado = (int)(dataReader.GetValue(dataReader.GetOrdinal("HayPersonalAfectado"))); }

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("HechoAtiempo"))) { curobj.HechoAtiempo = (string)(dataReader.GetValue(dataReader.GetOrdinal("HechoAtiempo"))); }//ya  //HechoAtiempo

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("Hora"))) { curobj.Hora = (string)(dataReader.GetValue(dataReader.GetOrdinal("Hora"))); }//ya  //Hora

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdAccidenteIncidente"))) { curobj.IdAccidenteIncidente = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdAccidenteIncidente"))); }//ya   // dataobject?.IdAccidenteIncidente

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdAreaAccidente"))) { curobj.IdAreaAccidente = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdAreaAccidente"))); }//ya  //IdAreaAccidente

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdAreaRespInvestigar"))) { curobj.IdAreaRespInvestigar = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdAreaRespInvestigar"))); }//ya   // dataobject?.IdAreaRespInvestigar

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdAsesorInvestigacion"))) { curobj.IdAsesorInvestigacion = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdAsesorInvestigacion"))); }//ya   // dataobject?.IdAsesorInvestigacion

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdCondicionEP"))) { curobj.IdCondicionEP = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdCondicionEP"))); }//ya  //IdCondicionEP

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdEmbarcacion"))) { curobj.IdEmbarcacion = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdEmbarcacion"))); }//ya  //IdEmbarcacion

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdEmpresaCompany"))) { curobj.IdEmpresaCompany = (string)(dataReader.GetValue(dataReader.GetOrdinal("IdEmpresaCompany"))); }//ya  //IdEmpresaCompany
                          log.LogInformation("Dentro del While (IdEmpresaCompany) = "+curobj.IdEmpresaCompany);



                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdGerencia"))) { curobj.IdGerencia = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdGerencia"))); }//ya  //IdGerencia
                           log.LogInformation("Dentro del While (IdGerencia) = "+curobj.IdGerencia);








                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdPersonalAccidentado"))) { curobj.IdPersonalAccidentado = (string)(dataReader.GetValue(dataReader.GetOrdinal("IdPersonalAccidentado"))); }//ya   // dataobject?.IdPersonalAccidentado

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdProbRecurrencia"))) { curobj.IdProbRecurrencia = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdProbRecurrencia"))); }//ya   // dataobject?.IdProbRecurrencia

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdProcesoOperacion"))) { curobj.IdProcesoOperacion = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdProcesoOperacion"))); }//ya   // dataobject?.IdProcesoOperacion

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdRegion"))) { curobj.IdRegion = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdRegion"))); }//ya  //IdRegion

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdRespInvestigar"))) { curobj.IdRespInvestigar = (string)(dataReader.GetValue(dataReader.GetOrdinal("IdRespInvestigar"))); }//ya  //IdRespInvestigar

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdSeCargaAccidente"))) { curobj.IdSeCargaAccidente = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdSeCargaAccidente"))); }//ya   // dataobject?.IdSeCargaAccidente

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdSede"))) { curobj.IdSede = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdSede"))); }//ya  //IdSede

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdSubProceso"))) { curobj.IdSubProceso = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdSubProceso"))); }//ya  //IdSubProceso

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdTipoEvento"))) { curobj.IdTipoEvento = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdTipoEvento"))); }//ya  //IdTipoEvento

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdZonaAccidente"))) { curobj.IdZonaAccidente = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdZonaAccidente"))); }//ya  //IdZonaAccidente

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("InformeInvestigacion"))) { curobj.InformeInvestigacion = (long)(dataReader.GetValue(dataReader.GetOrdinal("InformeInvestigacion"))); }//ya   // dataobject?.InformeInvestigacion

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("LesionDannio"))) { curobj.LesionDannio = (string)(dataReader.GetValue(dataReader.GetOrdinal("LesionDannio"))); }//ya  //LesionDannio

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("LugarEspTarea"))) { curobj.LugarEspTarea = (long)(dataReader.GetValue(dataReader.GetOrdinal("LugarEspTarea"))); }//ya  //LugarEspTarea

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("NombrePersonalAccidentado"))) { curobj.NombrePersonalAccidentado = (string)(dataReader.GetValue(dataReader.GetOrdinal("NombrePersonalAccidentado"))); }//ya //*

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("NombreRespInvestigar"))) { curobj.NombreRespInvestigar = (string)(dataReader.GetValue(dataReader.GetOrdinal("NombreRespInvestigar"))); }//ya   // dataobject?.NombreRespInvestigar

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("ParteCuerpoLesionada"))) { curobj.ParteCuerpoLesionada = (long)(dataReader.GetValue(dataReader.GetOrdinal("ParteCuerpoLesionada"))); }//ya   // dataobject?.ParteCuerpoLesionada

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("Potencial"))) { curobj.Potencial = (long)(dataReader.GetValue(dataReader.GetOrdinal("Potencial"))); }//ya  //Potencial

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("Puerto_Arrivo"))) { curobj.Puerto_Arrivo = (string)(dataReader.GetValue(dataReader.GetOrdinal("Puerto_Arrivo"))); }//ya  //Puerto_Arrivo

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("PuestoCargoAccidentado"))) { curobj.PuestoCargoAccidentado = (string)(dataReader.GetValue(dataReader.GetOrdinal("PuestoCargoAccidentado"))); }//ya   // dataobject?.PuestoCargoAccidentado

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("PuestoCargoAccidentado2"))) { curobj.PuestoCargoAccidentado2 = (string)(dataReader.GetValue(dataReader.GetOrdinal("PuestoCargoAccidentado2"))); }//ya   // dataobject?.PuestoCargoAccidentado2

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("TiempoTranscurrido"))) { curobj.TiempoTranscurrido = (int)(dataReader.GetValue(dataReader.GetOrdinal("TiempoTranscurrido"))); }//ya   // dataobject?.TiempoTranscurrido

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("fecha_Descanso_Fin"))) { curobj.fecha_Descanso_Fin = (string)(dataReader.GetValue(dataReader.GetOrdinal("fecha_Descanso_Fin"))); }//ya   // dataobject?.fecha_Descanso_Fin;

                          if (!dataReader.IsDBNull(dataReader.GetOrdinal("fecha_Descanso_Ini"))) { curobj.fecha_Descanso_Ini = (string)(dataReader.GetValue(dataReader.GetOrdinal("fecha_Descanso_Ini"))); }//ya   // dataobject?.fecha_Descanso_Ini;


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
      
       public long Id                               { get; set; }                            

       public long Id1                              { get; set; }//*
 
       public long AccionBD                         { get; set; }//*




      public int AccidenteProceso                  { get; set; }  //AccidenteProceso

      public string CodTrabjador                   { get; set; }  //CodTrabjador;*

      public string DNIAccidentado                 { get; set; }  //DNIAccidentado;*

      public int Descanso_estado                   { get; set; }  //Descanso_estado;*

      public string Descripcion                    { get; set; }  //Descripcion;*

      public int Dias_Descanza                     { get; set; }  //Dias_Descanza;*

      public int EdadAccidentado                   { get; set; }  //EdadAccidentado;*

      public int Expiencia_Month                   { get; set; }  //Expiencia_Month;*

      public int Expiencia_Yaer                    { get; set; }  //Expiencia_Yaer;*

      public string Fecha                          { get; set; }  //Fecha;*

      public string FechaInvestigacionFin          { get; set; }   // dataobject?.FechaInvestigacionFin;*

      public string FechaInvestigacionIni          { get; set; }   // dataobject?.FechaInvestigacionIni;*

      public int  HayPersonalAfectado              { get; set; }   // dataobject?.HayPersonalAfectado;*

      public string HechoAtiempo                   { get; set; }  //HechoAtiempo;*

      public string Hora                           { get; set; }  //Hora;*

      public long IdAccidenteIncidente             { get; set; }   // dataobject?.IdAccidenteIncidente;*

      public long IdAreaAccidente                  { get; set; }  //IdAreaAccidente;*

      public long IdAreaRespInvestigar             { get; set; }   // dataobject?.IdAreaRespInvestigar;*

      public long IdAsesorInvestigacion            { get; set; }   // dataobject?.IdAsesorInvestigacion;*

      public long IdCondicionEP                    { get; set; }  //IdCondicionEP;*

      public long IdEmbarcacion                    { get; set; }  //IdEmbarcacion;*

      public string IdEmpresaCompany               { get; set; }  //IdEmpresaCompany;*

      public long IdGerencia                       { get; set; }  //IdGerencia;*

      public string IdPersonalAccidentado          { get; set; }   // dataobject?.IdPersonalAccidentado;*

      public long IdProbRecurrencia                { get; set; }   // dataobject?.IdProbRecurrencia;*

      public long IdProcesoOperacion               { get; set; }   // dataobject?.IdProcesoOperacion;*

      public long IdRegion                         { get; set; }  //IdRegion;*

      public string IdRespInvestigar               { get; set; }  //IdRespInvestigar;*

      public long IdSeCargaAccidente               { get; set; }   // dataobject?.IdSeCargaAccidente;*

      public long IdSede                           { get; set; }  //IdSede;*

      public long IdSubProceso                     { get; set; }  //IdSubProceso;*

      public long IdTipoEvento                     { get; set; }  //IdTipoEvento;*

      public long IdZonaAccidente                  { get; set; }  //IdZonaAccidente;*

      public long InformeInvestigacion             { get; set; }   // dataobject?.InformeInvestigacion;*

      public string LesionDannio                     { get; set; }  //LesionDannio;*

      public long LugarEspTarea                    { get; set; }  //LugarEspTarea;*

      public string NombrePersonalAccidentado      { get; set; } //*

      public string NombreRespInvestigar           { get; set; }   // dataobject?.NombreRespInvestigar;*

      public long ParteCuerpoLesionada             { get; set; }   // dataobject?.ParteCuerpoLesionada;*

      public long Potencial                        { get; set; }  //Potencial;*

      public string Puerto_Arrivo                  { get; set; }  //Puerto_Arrivo;*

      public string PuestoCargoAccidentado         { get; set; }   // dataobject?.PuestoCargoAccidentado;*

      public string PuestoCargoAccidentado2        { get; set; }   // dataobject?.PuestoCargoAccidentado2;*

      public int TiempoTranscurrido                { get; set; }   // dataobject?.TiempoTranscurrido;*

      public string fecha_Descanso_Fin             { get; set; }   // dataobject?.fecha_Descanso_Fin;

      public string fecha_Descanso_Ini             { get; set; }   // dataobject?.fecha_Descanso_Ini;



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