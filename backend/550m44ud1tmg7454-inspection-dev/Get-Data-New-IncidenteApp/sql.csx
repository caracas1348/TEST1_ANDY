/****************************************************************************************
* VISUAL SAT - [2021]
* PROYECTO : SIGTASA
* ESQUEMA : SSOMA
* SPRINT  : 4
* MODULO : GESTIÓN DE PLAN ANUAL
* OPERADORES_________________________________________________________________________
* | # | PROGRAMADOR     |  |      FECHA   |  |   HORA   |           CORREO           |
* | 1 | Andy Vásquez    |  |  14/03/2021  |  | 05:28:50 |    caracas1348@gmail.com   |
* |___|_________________|__|______________|__|__________|____________________________|
*
* DESCRIPCION: ARCHIVO SQL BACKEND DE FUNCIONALIDAD EN SERVIDOR DE LA DATA INICIAL PARA LOS INCIDENTES ACCIDENTES APP
*
* ARCHIVOS DE FRONT       ____________________________________
* | # |     MODULO             |  |         NOMBRE            |
* | 1 |      SSOMA             |  |  gestionIncidentes.html   |
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

    public async Task<DataPlanAnual> funGetPlanAnualAllList( ILogger log, long UnidadNegocioId)
    {
        
        DataPlanAnual DataPlanAnual = new DataPlanAnual();//ya

        //Listado de objetos de Plan Anual
        //List<PlanAnualGet> lobjs  = new List<PlanAnualGet>();//ya


        //Listado de objetos de Programas
        List<Eventos> Eventos  = new List<Eventos>();// Evento
        
        //Listado de objetos de Sedes
        List<Sedes> Sedes  = new List<Sedes>();


        //Listado de objetos de Gerencias
        List<Embarcaciones> Embarcaciones  = new List<Embarcaciones>();//Embarcacion

        
        //Listado de objetos de StatusPlanAnual
        List<Areas> Areas  = new List<Areas>();//Area

         //Listado de objetos de StatusPlanAnual
        List<Zonas> Zonas  = new List<Zonas>();//Zona


        log.LogInformation("en la funcion funGetPlanAnualAllList "+vvsqlconnectionString);
        //SQL Objects
        try
        {
            log.LogInformation("try");
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                log.LogInformation("using");
                conn.Open();// abrimos la conexion a la base de datos
                log.LogInformation(" abrimos la conexion a la base de datos");

                SqlCommand cmd = new SqlCommand("[ssoma].[a_get_data_nuevo_incidente_app]", conn);//Nombre del procedimeinto almacenado

                log.LogInformation("Ejecutamos procedimeinto almacenado");
               // cmd.Parameters.AddWithValue("@Id", Id);
                cmd.Parameters.AddWithValue("@UnidadNegocioId", UnidadNegocioId);

                cmd.CommandType = CommandType.StoredProcedure;
                log.LogInformation("Ejecutamos CommandType");
                //Ejecutar Comando buscaremos los Planes Anuales registrados
                using (SqlDataReader dataReader = await cmd.ExecuteReaderAsync())
                {
               
                   log.LogInformation("Entramos a ejecutar la consulta using (SqlDataReader dataReader = await cmd.ExecuteReaderAsync())");

                    while (dataReader.Read())//Evento
                    {
                        log.LogInformation(" while (dataReader.Read())//Evento ");
                        Eventos curobjP = new Eventos();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjP.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Evento"))) { curobjP.Evento = (string)(dataReader.GetValue(dataReader.GetOrdinal("Evento"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code"))) { curobjP.Code = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code"))); }

                        Eventos.Add(curobjP);
                    }
                    DataPlanAnual.Eventos = Eventos;
                    log.LogInformation("DataPlanAnual.Eventos");

                    //--------------------------------------------YA Eventos -------------------


                   //--------------------------------------------YA Sedes -------------------
                    dataReader.NextResult();
                    while (dataReader.Read())//Embarcacion
                    {
                        Sedes curobjS = new Sedes();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjS.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Sede"))) { curobjS.Sede = (string)(dataReader.GetValue(dataReader.GetOrdinal("Sede"))); }

                        Sedes.Add(curobjS);
                    }
                    DataPlanAnual.Sedes = Sedes;
                    log.LogInformation("DataPlanAnual.Sedes");
                     //--------------------------------------------YA Sedes -------------------




                     //--------------------------------------------YA  -------------------
                    dataReader.NextResult();

                    while (dataReader.Read())//Sede
                    {
                        Embarcaciones curobjG = new Embarcaciones();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjG.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Embarcacion"))) { curobjG.Embarcacion = (string)(dataReader.GetValue(dataReader.GetOrdinal("Embarcacion"))); }

                        Embarcaciones.Add(curobjG);
                    }
                    DataPlanAnual.Embarcaciones = Embarcaciones;
                    log.LogInformation("DataPlanAnual.Embarcaciones");

                    //--------------------------------------------YA Gerencias -------------------




                 

                      //--------------------------------------------YA Areas -------------------
                    dataReader.NextResult();
                    while (dataReader.Read())//Area
                    {
                        Areas curobjEPL = new Areas();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjEPL.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Area"))) { curobjEPL.Area = (string)(dataReader.GetValue(dataReader.GetOrdinal("Area"))); }
                        

                        Areas.Add(curobjEPL);
                    }
                    DataPlanAnual.Areas = Areas;
                    log.LogInformation("DataPlanAnual.Areas");
                     //--------------------------------------------YA Areas -------------------




                    //--------------------------------------------YA Zonas -------------------
                    dataReader.NextResult();
                    while (dataReader.Read())//Zona
                    {
                        Zonas curobjEq = new Zonas();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjEq.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Zona"))) { curobjEq.Zona = (string)(dataReader.GetValue(dataReader.GetOrdinal("Zona"))); }
                       

                        Zonas.Add(curobjEq);
                    }
                    DataPlanAnual.Zonas = Zonas;
                    log.LogInformation("DataPlanAnual.Zonas");
                     //--------------------------------------------YA Zonas -------------------










                }

                if (conn.State == System.Data.ConnectionState.Open)
                    conn.Close();
            }
        }
        catch (Exception ex)
        {
            //lobjs  = new List<PlanAnualGet>();
            //curobj = new PlanAnualGet();
            //curobj.Id = 0;
            //curobj.Code = System.Convert.ToString(ex.Message);
            //lobjs.Add(curobj);
           // DataPlanAnual.PlanAnual = lobjs;

        }

        return DataPlanAnual;
    }




    //==================================OTRA FUNCION ==========================================

  



    
}








public class DataPlanAnual
{
  //public List<PlanAnualGet> PlanAnual {get; set;}
  public List<Eventos> Eventos {get; set;}
  public List<Sedes> Sedes {get; set;}
  public List<Embarcaciones> Embarcaciones {get; set;}
  public List<Areas> Areas {get; set;}
  public List<Zonas> Zonas {get; set;}

}



//-------------------------- ya andy Eventos ---------------
public class Eventos
{
    public long Id {get;set;}
    public string Evento {get;set;}
    public string Code {get;set;}
}
//-------------------------- ya andy Eventos ---------------


//-------------------------- ya andy  Sedes ---------------
public class Sedes
{
    public long Id {get;set;}
    public string Sede {get;set;}
}
//-------------------------- ya andy  Sedes ---------------




//-------------------------- ya andy  Embarcaciones ---------------
public class Embarcaciones
{
    public long Id {get;set;}
    public string Embarcacion {get;set;}
}
//-------------------------- ya andy Embarcaciones  ---------------



//-------------------------- ya andy  Areas ---------------
public class Areas
{
    public long Id {get;set;}
    public string Area {get;set;}
}
//-------------------------- ya andy Areas  ---------------


//-------------------------- ya andy  Zonas ---------------
public class Zonas
{
    public long Id {get;set;}
    public string Zona {get;set;}
}
//-------------------------- ya andy Zonas  ---------------



