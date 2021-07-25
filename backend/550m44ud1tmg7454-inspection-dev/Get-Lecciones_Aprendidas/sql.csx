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
        List<Imagenes> Imagenes  = new List<Imagenes>();//TipoEvento






        //Listado de objetos de Programas
       // List<Programas1> Programas1  = new List<Programas1>();//TipoEvento

         //Listado de objetos temporasda Veda
       // List<Programas2> Programas2  = new List<Programas2>();//TipoEvento



        //Objeto de PlanAnual
        PlanAnualGet curobj;

       


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

                SqlCommand cmd = new SqlCommand("[ssoma].[b_la_get_leccion_aprendida]", conn);//legue hasta aqui andy

                log.LogInformation("SqlCommand 103 ");
                //cmd.Parameters.AddWithValue("@Id", Id);
                cmd.Parameters.AddWithValue("@IdIncidente", IdTipoEvento);
                // cmd.Parameters.AddWithValue("@IdEmpresa", IdEmpresa);
                // cmd.Parameters.AddWithValue("@IdSede",IdSede);
                // cmd.Parameters.AddWithValue("@FechaInicio", FechaInicio);
                // cmd.Parameters.AddWithValue("@FechaFin", FechaFin);
                // cmd.Parameters.AddWithValue("@IdEmbarcacion", IdEmbarcacion);

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
                         log.LogInformation(" curobj.Id  = "+ curobj.Id );
                         log.LogInformation("IdTipoEvento = "+IdTipoEvento);

                      

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdSede"))) { curobj.IdSede = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdSede"))); }//ya
                        log.LogInformation("curobj.IdSede = "+curobj.IdSede );

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdTipoEvento_"))) { curobj.IdTipoEvento_ = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdTipoEvento_"))); }//ya
                        log.LogInformation("curobj.IdTipoEvento_ = "+curobj.IdTipoEvento_ );

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Fecha"))) { curobj.Fecha = (string)(dataReader.GetValue(dataReader.GetOrdinal("Fecha"))); }//ya
                        log.LogInformation("curobj.Fecha = "+curobj.Fecha );

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("FraseCorta"))) { curobj.FraseCorta = (string)(dataReader.GetValue(dataReader.GetOrdinal("FraseCorta"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Descripcion"))) { curobj.Descripcion = (string)(dataReader.GetValue(dataReader.GetOrdinal("Descripcion"))); }//ya

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Codigo"))) { curobj.Codigo = (string)(dataReader.GetValue(dataReader.GetOrdinal("Codigo"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("TipoDatoGeneral"))) { curobj.TipoDatoGeneral = (int)(dataReader.GetValue(dataReader.GetOrdinal("TipoDatoGeneral"))); }//ya
                        log.LogInformation("curobj.TipoDatoGeneral = "+curobj.TipoDatoGeneral );


                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Potencial"))) { curobj.Potencial = (int)(dataReader.GetValue(dataReader.GetOrdinal("Potencial"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("TipoLesionDanio"))) { curobj.TipoLesionDanio = (string)(dataReader.GetValue(dataReader.GetOrdinal("TipoLesionDanio"))); }//ya
                        log.LogInformation("curobj.TipoLesionDanio = "+curobj.TipoLesionDanio );

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Mortal"))) { curobj.Mortal = (int)(dataReader.GetValue(dataReader.GetOrdinal("Mortal"))); }//ya

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Create_By"))) { curobj.Create_By = (string)(dataReader.GetValue(dataReader.GetOrdinal("Create_By"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Create_Date"))) { curobj.Create_Date = (string)(dataReader.GetValue(dataReader.GetOrdinal("Create_Date"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("B_Contaminante"))) { curobj.B_Contaminante = (long)(dataReader.GetValue(dataReader.GetOrdinal("B_Contaminante"))); }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("B_Impacto_Ambiental"))) { curobj.B_Impacto_Ambiental = (long)(dataReader.GetValue(dataReader.GetOrdinal("B_Impacto_Ambiental"))); }//ya
                        
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdIncidente"))) { curobj.IdIncidente1 = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdIncidente"))); }//ya
                        log.LogInformation("curobj.IdIncidente1 = "+curobj.IdIncidente1 );

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
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdIncidente"))) { curobjP.IdIncidente = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdIncidente"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("EnQueFallamos"))) { curobjP.EnQueFallamos = (string)(dataReader.GetValue(dataReader.GetOrdinal("EnQueFallamos"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("ComoActuar"))) { curobjP.ComoActuar = (string)(dataReader.GetValue(dataReader.GetOrdinal("ComoActuar"))); }


                        Programas.Add(curobjP);
                    }
                    DataPlanAnual.Programas = Programas;
                    log.LogInformation("DataPlanAnual.Programas---TipoEvento");







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
            curobj.Codigo = System.Convert.ToString(ex.Message);//pendiente con esto
            lobjs.Add(curobj);
            DataPlanAnual.PlanAnual = lobjs;

        }

        return DataPlanAnual;
    }
    
    


      public async Task<DataPlanAnual> funGetPlanAnualAllList2( ILogger log , long Id, long IdTipoEvento, long IdEmpresa, long IdSede, string FechaInicio, string FechaFin, long IdEmbarcacion)
    {
        //Lista de Objetos
        DataPlanAnual DataPlanAnual = new DataPlanAnual();//queda igual pero es Accidente Incidente

        //Listado de objetos de Plan Anual
        List<PlanAnualGet> lobjs  = new List<PlanAnualGet>();//ya  /queda igual pero es Accidente Incidente

        //Listado de objetos de Programas
        List<Imagenes> Imagenes  = new List<Imagenes>();//TipoEvento



        //Objeto de PlanAnual
        PlanAnualGet curobj;

       


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

                SqlCommand cmd = new SqlCommand("[ssoma].[b_la_get_foto_leccion_aprendida]", conn);//legue hasta aqui andy

                log.LogInformation("SqlCommand 103 ");
                //cmd.Parameters.AddWithValue("@Id", Id);
                cmd.Parameters.AddWithValue("@IdIncidente", IdTipoEvento);
                // cmd.Parameters.AddWithValue("@IdEmpresa", IdEmpresa);
                // cmd.Parameters.AddWithValue("@IdSede",IdSede);
                // cmd.Parameters.AddWithValue("@FechaInicio", FechaInicio);
                // cmd.Parameters.AddWithValue("@FechaFin", FechaFin);
                // cmd.Parameters.AddWithValue("@IdEmbarcacion", IdEmbarcacion);

                cmd.CommandType = CommandType.StoredProcedure;
                log.LogInformation("CommandType 113");
                //Ejecutar Comando buscaremos los Planes Anuales registrados
                using (SqlDataReader dataReader = await cmd.ExecuteReaderAsync())
                {
                    //Navegar en el Conjunto de Datos Recuperados
                    while (dataReader.Read())
                    {
                       // curobj = new PlanAnualGet();

                        Imagenes curobjP = new Imagenes();
                       
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjP.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                         log.LogInformation(" curobjP.Id  = "+ curobjP.Id );

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Leccion_AprendidaId"))) { curobjP.Leccion_AprendidaId = (long)(dataReader.GetValue(dataReader.GetOrdinal("Leccion_AprendidaId"))); }
                        log.LogInformation(" curobjP.Id  = "+ curobjP.Leccion_AprendidaId );

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("NombreEvidencia"))) { curobjP.NombreEvidencia = (string)(dataReader.GetValue(dataReader.GetOrdinal("NombreEvidencia"))); }


                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("EvidenciaFile"))) { curobjP.EvidenciaFile = (string)(dataReader.GetValue(dataReader.GetOrdinal("EvidenciaFile"))); }




                        Imagenes.Add(curobjP);

                         //lobjs.Add(curobj);
                    }

                    DataPlanAnual.Imagenes = Imagenes;
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
            curobj.Codigo = System.Convert.ToString(ex.Message);//pendiente con esto
            lobjs.Add(curobj);
            DataPlanAnual.PlanAnual = lobjs;

        }

        return DataPlanAnual;
    }







}








public class DataPlanAnual //dejar igual
{
  public List<PlanAnualGet> PlanAnual {get; set;} //Lecciones Aprendidas
  //*********************   COMBOS   *************************
  public List<Programas> Programas {get; set;} //  Lista de Lecciones Aprendidas
  public List<Imagenes>  Imagenes {get; set;} //  Lista de Lecciones Aprendidas

}

public class PlanAnualGet   //Accidente-Incidente
{
    public long Id                                { get; set;}
   
    public long IdIncidente1                        { get; set;}

    public long IdSede                             { get; set;}
    public long IdTipoEvento_                      { get; set;}
    public string Fecha                           { get; set;}
    public string FraseCorta                      { get; set;}
    public string Descripcion                     { get; set;}
    public string Codigo                          { get; set;}
    public int TipoDatoGeneral                    { get; set;}
    public int Potencial                          { get; set;}
    public string TipoLesionDanio                 { get; set;}
    public int Mortal                             { get; set;}
    public string Create_By                       { get; set;}
    public string Create_Date                     { get; set;}
    public long B_Contaminante                     { get; set;}
    public long B_Impacto_Ambiental                { get; set;}


}

//-------------------------- ya andy Programas --------------- TipoEvento
public class Programas
{
    public long Id              {get;set;}
    public long IdIncidente      {get;set;}
    public string EnQueFallamos {get;set;}
    public string ComoActuar    {get;set;}
               
}
//-------------------------- ya andy Programas ---------------





//-------------------------- ya andy Programas --------------- TipoEvento
public class Imagenes
{
    public long Id                       {get;set;}
    public long Leccion_AprendidaId      {get;set;}
    public string NombreEvidencia        {get;set;}
    public string EvidenciaFile          {get;set;}
               
}
//-------------------------- ya andy Programas ---------------

