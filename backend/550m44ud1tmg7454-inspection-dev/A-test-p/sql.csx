/****************************************************************************************
* VISUAL SAT - [2021]
* PROYECTO : SIGTASA
* ESQUEMA : SSOMA
* SPRINT  : 4
* MODULO : GESTIÓN DE PLAN ANUAL
* OPERADORES_________________________________________________________________________
* | # | PROGRAMADOR     |  |      FECHA   |  |   HORA   |           CORREO           |
* | 1 | mmmmmmmmmmmm    |  |  16/03/2021  |  | 17:30:50 |    lllllllllll@gmail.com   |
* |___|_________________|__|______________|__|__________|____________________________|
*
* DESCRIPCION: ARCHIVO SQL BACKEND DE FUNCIONALIDAD EN SERVIDOR DEL LISTADO E INFORMACION
*              LOS INCIDENTES ACCIDENTES DESDE LA WEB
*
* ARCHIVOS DE FRONT       _____________________________________________
* | # |     MODULO             |  |         NOMBRE                    |
* | 1 |      SSOMA             |  |  ttttttttttt.html   |
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

// DataPlanAnualGetAll
// DataPlanAnual
// funGetPlanAnualAllList

class DataPlanAnualGetAll //Accidente-Incidente
{
    string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);

    // public async Task<DataPlanAnual> funGetPlanAnualAllList( ILogger log , long Id, long IdTipoEvento, long IdEmpresa, long IdSede, string FechaInicio, string FechaFin, long IdEmbarcacion)
    public async Task<DataPlanAnual> funGetPlanAnualAllList( ILogger log )
    {
        //Lista de Objetos
        DataPlanAnual DataPlanAnual = new DataPlanAnual();//queda igual pero es Accidente Incidente

        //Listado de objetos de Plan Anual
        List<PlanAnualGet> lobjs  = new List<PlanAnualGet>();//ya  /queda igual pero es Accidente Incidente
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
// p1
                SqlCommand cmd = new SqlCommand("[ssoma].[a_get_test]", conn);//legue hasta aqui andy

                log.LogInformation("SqlCommand 103 mila ");
                // cmd.Parameters.AddWithValue("@Id", Id);
                // cmd.Parameters.AddWithValue("@IdTipoEvento", IdTipoEvento);
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
    // p2                
                    //Navegar en el Conjunto de Datos Recuperados
                    while (dataReader.Read())
                    {
                        curobj = new PlanAnualGet();

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { 
                             curobj.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); 
                             }//ya
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code"))) {
                             curobj.Code = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code"))); 
                             }//ya


        //log.LogInformation("Id = "+curobj.Id); log.LogInformation("Code = "+curobj.Code);

        //                 if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdTipoEvento"))) { 
        //                     curobj.IdTipoEvento = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdTipoEvento"))); 
        //                     }//ya
        //                 if (!dataReader.IsDBNull(dataReader.GetOrdinal("Tipo_Evento"))) { 
        //                     curobj.Tipo_Evento = (string)(dataReader.GetValue(dataReader.GetOrdinal("Tipo_Evento")));
        //                      }//ya
        //                 if (!dataReader.IsDBNull(dataReader.GetOrdinal("GrupoEvento"))) { 
        //                     curobj.GrupoEvento = (int)(dataReader.GetValue(dataReader.GetOrdinal("GrupoEvento"))); 
        //                     }//ya

        // //log.LogInformation("IdTipoEvento = "+curobj.IdTipoEvento); log.LogInformation("Tipo_Evento = "+curobj.Tipo_Evento); log.LogInformation("GrupoEvento = "+curobj.GrupoEvento);

        //                 if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdEmpresa"))) { 
        //                     curobj.IdEmpresa = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdEmpresa"))); 
        //                     }//ya
        //                 if (!dataReader.IsDBNull(dataReader.GetOrdinal("NombreEmpresa"))) {
        //                      curobj.NombreEmpresa = (string)(dataReader.GetValue(dataReader.GetOrdinal("NombreEmpresa"))); 
        //                      }//ya
        //                 //if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code_Gerencia"))) { curobj.Code_Gerencia = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code_Gerencia"))); }//ya
        // //log.LogInformation("IdEmpresa = "+curobj.IdEmpresa); log.LogInformation("NombreEmpresa = "+curobj.NombreEmpresa);

        //                 if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdSede"))) { 
        //                     curobj.IdSede = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdSede"))); 
        //                     }//ya
        //                 if (!dataReader.IsDBNull(dataReader.GetOrdinal("Sede"))) { 
        //                     curobj.Sede = (string)(dataReader.GetValue(dataReader.GetOrdinal("Sede"))); 
        //                     }//ya
        //  //log.LogInformation("IdSede = "+curobj.IdSede); log.LogInformation("Sede = "+curobj.Sede);
        //                 if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdEmbarcacion"))) {
        //                      curobj.IdEmbarcacion = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdEmbarcacion"))); 
        //                      }//ya
        //                 if (!dataReader.IsDBNull(dataReader.GetOrdinal("Embarcacion"))) {
        //                     curobj.Embarcacion = (string)(dataReader.GetValue(dataReader.GetOrdinal("Embarcacion"))); 
        //                     }//ya
        // //log.LogInformation("IdEmbarcacion = "+curobj.IdEmbarcacion); log.LogInformation("Embarcacion = "+curobj.Embarcacion);

        //                 if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdZona"))) {
        //                      curobj.IdZona = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdZona"))); 
        //                      }//ya
        //                 if (!dataReader.IsDBNull(dataReader.GetOrdinal("Zona"))) {
        //                      curobj.Zona = (string)(dataReader.GetValue(dataReader.GetOrdinal("Zona"))); 
        //                      }//ya
        // //log.LogInformation("IdZona = "+curobj.IdZona); log.LogInformation("Zona = "+curobj.Zona);

        //                 if (!dataReader.IsDBNull(dataReader.GetOrdinal("Fecha"))) { 
        //                     curobj.Fecha = (string)(dataReader.GetValue(dataReader.GetOrdinal("Fecha"))); 
        //                     }
        //                 if (!dataReader.IsDBNull(dataReader.GetOrdinal("Hora"))) { 
        //                     curobj.Hora = (string)(dataReader.GetValue(dataReader.GetOrdinal("Hora"))); 
        //                 }
        // //log.LogInformation("Fecha = "+curobj.Fecha);

        //                 if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdEstadoIncidente"))) { 
        //                     curobj.IdEstadoIncidente = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdEstadoIncidente"))); 
        //                     }//ya
        //                 if (!dataReader.IsDBNull(dataReader.GetOrdinal("Estado_Incidente"))) {
        //                     curobj.Estado_Incidente = (string)(dataReader.GetValue(dataReader.GetOrdinal("Estado_Incidente"))); 
        //                     }//ya
        //                 if (!dataReader.IsDBNull(dataReader.GetOrdinal("Color"))) { 
        //                     curobj.Color = (string)(dataReader.GetValue(dataReader.GetOrdinal("Color"))); 
        //                     }//ya
        // //log.LogInformation("IdEstadoIncidente = "+curobj.IdEstadoIncidente); log.LogInformation("Estado_Incidente = "+curobj.Estado_Incidente); log.LogInformation("Color = "+curobj.Color);

        //                 if (!dataReader.IsDBNull(dataReader.GetOrdinal("HayPersonalAfectado"))) { 
        //                     curobj.HayPersonalAfectado = (int)(dataReader.GetValue(dataReader.GetOrdinal("HayPersonalAfectado"))); 
        //                     }//ya
        // //log.LogInformation("HayPersonalAfectado = "+curobj.HayPersonalAfectado);
        //                 if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdArea"))) { 
        //                     curobj.IdArea = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdArea"))); 
        //                     }//YA
        //                 if (!dataReader.IsDBNull(dataReader.GetOrdinal("DescripcionEvento"))) { 
        //                     curobj.DescripcionEvento = (string)(dataReader.GetValue(dataReader.GetOrdinal("DescripcionEvento"))); 
        //                     }//ya
        // //log.LogInformation("IdArea = "+curobj.IdArea);log.LogInformation("DescripcionEvento = "+curobj.DescripcionEvento);

        //                 if (!dataReader.IsDBNull(dataReader.GetOrdinal("A_NombrePersonalAccidentado"))) { 
        //                     curobj.A_NombrePersonalAccidentado = (string)(dataReader.GetValue(dataReader.GetOrdinal("A_NombrePersonalAccidentado"))); 
        //                     }//ya
        //                 if (!dataReader.IsDBNull(dataReader.GetOrdinal("A_DniPersonalAccidentado"))) { 
        //                     curobj.A_DniPersonalAccidentado = (string)(dataReader.GetValue(dataReader.GetOrdinal("A_DniPersonalAccidentado"))); 
        //                     }//ya
        //  //log.LogInformation("A_NombrePersonalAccidentado = "+curobj.A_NombrePersonalAccidentado);log.LogInformation("A_DniPersonalAccidentado = "+curobj.A_DniPersonalAccidentado);

        //                 if (!dataReader.IsDBNull(dataReader.GetOrdinal("A_IdPersonalAccidentado"))) { 
        //                     curobj.A_IdPersonalAccidentado = (string)(dataReader.GetValue(dataReader.GetOrdinal("A_IdPersonalAccidentado"))); 
        //                     }//ya
        //                 if (!dataReader.IsDBNull(dataReader.GetOrdinal("A_PuestoCargoAccidentado"))) { 
        //                     curobj.A_PuestoCargoAccidentado = (string)(dataReader.GetValue(dataReader.GetOrdinal("A_PuestoCargoAccidentado"))); 
        //                     }//ya
        //                 if (!dataReader.IsDBNull(dataReader.GetOrdinal("A_NombreJefeAccidentado"))) { 
        //                     curobj.A_NombreJefeAccidentado = (string)(dataReader.GetValue(dataReader.GetOrdinal("A_NombreJefeAccidentado"))); 
        //                     }//ya
        //                 if (!dataReader.IsDBNull(dataReader.GetOrdinal("A_IdJefeAccidentado"))) {
        //                     curobj.A_IdJefeAccidentado = (string)(dataReader.GetValue(dataReader.GetOrdinal("A_IdJefeAccidentado"))); 
        //                     }//ya

                         lobjs.Add(curobj);
                    }

    DataPlanAnual.PlanAnual = lobjs;
    log.LogInformation("DataPlanAnual.PlanAnual");



                     //--------------------------------------------YA Programas -------------------
                    // dataReader.NextResult();

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


//dejar igual
public class DataPlanAnual 
{
  public List<PlanAnualGet> PlanAnual {get; set;} //Accidente-Incidente
 
}

//Accidente-Incidente
public class PlanAnualGet   {
    public long Id                                { get; set;}
    public string Code                            { get; set;}

    // public long IdTipoEvento                      { get; set; }
    // public string Tipo_Evento                     { get; set; } //Tipo_Evento
    // public int GrupoEvento                        { get; set; } //Tipo_Evento

    // public long IdEmpresa                         { get; set; }
    // public string NombreEmpresa                   { get; set; } //NombreEmpresa


    // public long IdSede                            { get; set; }
    // public string Sede                            { get; set; }

    // public long IdZona                            { get; set; }
    // public string Zona                            { get; set; }

    // public long IdEmbarcacion                     { get; set; }//IdEmbarcacion
    // public string Embarcacion                     { get; set; }//Embarcacion

    // public string Fecha                           {get; set;} //Fecha
    // public string Hora                            {get; set;} //Hora

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

    // //Datos Generales de la Investigación
    // public string xDescripcion                     { get; set; } //Tipo_Evento
    // public long xIdTipoEventoLesion                { get; set; } //Tipo_Evento
    // public long xIdTipoEventoLesion2               { get; set; } //Tipo_Evento
    // public long xIdTipoEventoLesion3               { get; set; } //Tipo_Evento
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
    // //------------------------------- Datos de ,la Alerta de este incidente ------------------------------------------

    // public long  IdHallazgo                         { get; set; }
    // public long InformeInvestigacion                { get; set; }
    // public long InformeInvestigacion3                { get; set; }

    // public string Dannio                            { get; set; }
    // public string Lesion                            { get; set; }

    
    // public string Contaminantes                     { get; set; }
    // public long   ContaminanteId                    { get; set; }//*************


    // public int    Volumen                           { get; set; }
    // public int    Unidad                            { get; set; }
    // public int    AreaImpactada                     { get; set; }

    // public string ImpactoAmbiental                  { get; set; }
    // public long ImpactoAmbientalId                { get; set; }//*********************


    // public long   IdDatosGenerales                  { get; set; }
    // public long   IdDatosGenerales2                 { get; set; }
    // public long   IdDatosGenerales3                 { get; set; }

    // public int    FinalizadoSSO                     { get; set; }
    // public int    FinalizadoA                       { get; set; }
    // public int    FinalizadoMat                      { get; set; }

    // public string    ClasificacionSSO                  { get; set; }
    // public string    ClasificacionA                    { get; set; }
    // public string    ClasificacionMat                    { get; set; }
    // public long      Potencial                       { get; set; }

}


