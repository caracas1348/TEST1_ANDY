/****************************************************************************************
* VISUAL SAT - [2021]
* PROYECTO : SIGTASA
* ESQUEMA : SSOMA
* SPRINT  : 4
* MODULO : INCIDENTE ACCIDENTE
* OPERADORES_________________________________________________________________________
* | # | PROGRAMADOR     |  |      FECHA   |  |   HORA   |           CORREO           |
* | 1 | Andy Vásquez    |  |  27/03/2021  |  | 12:30:50 |    caracas1348@gmail.com   |
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

                SqlCommand cmd = new SqlCommand("[ssoma].[a_get_pdf_correo_alerta_web]", conn);//legue hasta aqui andy

                log.LogInformation("SqlCommand 103 ");
                //cmd.Parameters.AddWithValue("@Id", Id);
                cmd.Parameters.AddWithValue("@Id1", IdTipoEvento);
                cmd.Parameters.AddWithValue("@AccionBD", IdEmpresa);
               

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
                      

                        //-------------------------------------------------- forma temporal de traer y almacenar los adjuntos --------------------------------------
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Adjunto1"))) { curobj.Adjunto1 = (string)(dataReader.GetValue(dataReader.GetOrdinal("Adjunto1"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Adjunto2"))) { curobj.Adjunto2 = (string)(dataReader.GetValue(dataReader.GetOrdinal("Adjunto2"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Adjunto3"))) { curobj.Adjunto3 = (string)(dataReader.GetValue(dataReader.GetOrdinal("Adjunto3"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Adjunto4"))) { curobj.Adjunto4 = (string)(dataReader.GetValue(dataReader.GetOrdinal("Adjunto4"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Adjunto5"))) { curobj.Adjunto5 = (string)(dataReader.GetValue(dataReader.GetOrdinal("Adjunto5"))); }//ya

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
            curobj.Adjunto1 = System.Convert.ToString(ex.Message);//pendiente con esto
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
    public long Id                                { get; set;}
    //public string Code                            { get; set;}

    //public long IdTipoEvento                      { get; set; }
    // public string Tipo_Evento                     { get; set; } //Tipo_Evento
    // public int GrupoEvento                        { get; set; } //Tipo_Evento

    //public long IdEmpresa                         { get; set; }
    // public string NombreEmpresa                   { get; set; } //NombreEmpresa
   

    // public long IdSede                            { get; set; }
    // public string Sede                            { get; set; }

    // public long IdZona                            { get; set; }
    // public string Zona                            { get; set; }

    // public long IdEmbarcacion                    { get; set; }//IdEmbarcacion
    // public string Embarcacion                     { get; set; }//Embarcacion

    // public string Fecha                           {get; set;} //Fecha
    // public string Hora                           {get; set;} //Hora

    // public long IdEstadoIncidente                 {get; set;}//IdEstadoIncidente
    // public string Estado_Incidente                {get; set;}//Estado_Incidente
    // public string Color                           {get; set;}//Color
    
    // public int HayPersonalAfectado {get;set;} // 0 tasa 1 tercero
    // public long IdArea {get;set;}
    // public string Area {get;set;}
    // public string DescripcionEvento {get;set;}


    // public string A_NombrePersonalAccidentado {get;set;}
    // public string A_DniPersonalAccidentado {get;set;}
    // public string A_IdPersonalAccidentado {get;set;}
    // public string A_PuestoCargoAccidentado {get;set;}
    // public string A_NombreJefeAccidentado {get;set;}
    // public string A_IdJefeAccidentado {get;set;}


    //     // tipo de accidente ambiental
    // public string B_TipoProducto {get;set;}
    // public string B_ProductoInvolucrado {get;set;}
    // public string B_Volumen {get;set;}
    // public string B_Area {get;set;}
    // public string B_Fuente {get;set;}
    // public string B_NombreJefeInmediato {get;set;}
    // public string B_IdJefeInmediato {get;set;}
                         
    // //Daños materiales
    // public string C_Hurt {get;set;} //daño

    
    // //public List<Objetivo> Evidencias                {get; set;} //fotos

    public string   Adjunto1                     { get; set; }
    public string   Adjunto2                     { get; set; }
    public string   Adjunto3                     { get; set; }
    public string   Adjunto4                     { get; set; }
    public string   Adjunto5                     { get; set; }


    // //Datos Generales de la Investigación
    // public string xDescripcion                     { get; set; } //Tipo_Evento
    // public long xIdTipoEventoLesion                { get; set; } //Tipo_Evento
    // public long xIdPlanta                          { get; set; } //Tipo_Evento
    // public string xPlanta                          { get; set; } //Tipo_Evento





    // //------------------------------- Datos de ,la Alerta de este incidente ------------------------------------------
    // public long yIdAlerta                          { get; set; } // -- si es 0 no se le ha creado alerta,>0 si existe y se muestran estos datos
    // public string yDetalle                         { get; set; }
    // public long yIdSede                             { get; set; }
    // public long yIdZona                             { get; set; }
    // public long yIdTipoEvento                       { get; set; }
    // public string yFecha                           { get; set; }
    // public string yHora                            { get; set; }
    // public string yDiagnostico                     { get; set; }
    // public string yDescripcion                     { get; set; }
    // public string yCompromiso                      { get; set; }
    // public string yAdjunto1                        { get; set; }
    // public string yAdjunto2                        { get; set; }
    // public string yPdf                             { get; set; }
    // //------------------------------- Datos de ,la Alerta de este incidente ------------------------------------------



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