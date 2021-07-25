/****************************************************************************************
* VISUAL SAT - [2021]
* PROYECTO : SIGTASA
* ESQUEMA : SSOMA
* SPRINT  : 4
* MODULO : INCIDENTE ACCIDENTES
* OPERADORES_________________________________________________________________________
* | # | PROGRAMADOR     |  |      FECHA   |  |   HORA   |           CORREO           |
* | 1 | Andy Vásquez    |  |  11/04/2021  |  | 09:00:50 |    caracas1348@gmail.com   | post - run 001
* |___|_________________|__|______________|__|__________|____________________________| put  - run 002
*
* DESCRIPCION: ARCHIVO SQL BACKEND DE FUNCIONALIDAD EN SERVIDOR QUE REGISTRA LOS DATOS GENERALES
*              LOS INCIDENTES ACCIDENTES DESDE LA WEB
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

class DataSeguimientoPost
{

 string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);

    public async Task<EvidenciaPost> funPostSeguimientoEvidencia(ILogger log, EvidenciaPost curentity)
    {
        log.LogInformation("En funPostSeguimientoEvidencia." );

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("[ssoma].[a_post_crear_datos_generales_web]", conn);

           //cmd.Parameters.AddWithValue("@CodeR",   curentity.@CodeR);//IdAccidenteIncidente  RETORNO DE SALIDA
            // cmd.Parameters.AddWithValue("@IdAccidenteIncidente",     curentity.IdAccidenteIncidente);//NombreEvidencia
            // cmd.Parameters.AddWithValue("@NombreEvidencia",          curentity.NombreEvidencia);//NombreEvidencia
            // cmd.Parameters.AddWithValue("@EvidenciaFile",            curentity.EvidenciaFile);//EvidenciaFile
            // cmd.Parameters.AddWithValue("@CreateBy",               curentity.CreateBy);//Created_By   LastUpdateBy
            // cmd.Parameters.AddWithValue("@LastUpdateBy",               curentity.LastUpdateBy);//Created_By   LastUpdateBy
              cmd.Parameters.AddWithValue("@Id1",                                    curentity.Id1);
              cmd.Parameters.AddWithValue("@AccionBD",                               curentity.AccionBD);

              cmd.Parameters.AddWithValue("@AccidenteProceso",                   curentity.AccidenteProceso);                         

              cmd.Parameters.AddWithValue("@CodTrabjador",                       curentity.CodTrabjador);                         

              cmd.Parameters.AddWithValue("@DNIAccidentado",                     curentity.DNIAccidentado);                         

              cmd.Parameters.AddWithValue("@Descanso_estado",                    curentity.Descanso_estado);                         

              cmd.Parameters.AddWithValue("@Descripcion",                        curentity.Descripcion);                         

              cmd.Parameters.AddWithValue("@Dias_Descanza",                      curentity.Dias_Descanza);                        

              cmd.Parameters.AddWithValue("@EdadAccidentado",                    curentity.EdadAccidentado);                         

              cmd.Parameters.AddWithValue("@Expiencia_Month",                    curentity.Expiencia_Month);                         

              cmd.Parameters.AddWithValue("@Expiencia_Yaer",                     curentity.Expiencia_Yaer);                         

              cmd.Parameters.AddWithValue("@Fecha",                              curentity.Fecha);                         

              cmd.Parameters.AddWithValue("@FechaInvestigacionFin",              curentity.FechaInvestigacionFin);                          

              cmd.Parameters.AddWithValue("@FechaInvestigacionIni",              curentity.FechaInvestigacionIni);                          

              cmd.Parameters.AddWithValue("@HayPersonalAfectado",                curentity.HayPersonalAfectado);                         

              cmd.Parameters.AddWithValue("@HechoAtiempo",                       curentity.HechoAtiempo);                         

              cmd.Parameters.AddWithValue("@Hora",                               curentity.Hora);                         

              cmd.Parameters.AddWithValue("@IdAccidenteIncidente",               curentity.IdAccidenteIncidente);                          

              cmd.Parameters.AddWithValue("@IdAreaAccidente",                    curentity.IdAreaAccidente);                         

              cmd.Parameters.AddWithValue("@IdAreaRespInvestigar",               curentity.IdAreaRespInvestigar);                          

              cmd.Parameters.AddWithValue("@IdAsesorInvestigacion",              curentity.IdAsesorInvestigacion);                          

              cmd.Parameters.AddWithValue("@IdCondicionEP",                      curentity.IdCondicionEP);                         

              cmd.Parameters.AddWithValue("@IdEmbarcacion",                      curentity.IdEmbarcacion);                        

              cmd.Parameters.AddWithValue("@IdEmpresaCompany",                   curentity.IdEmpresaCompany);                       

              cmd.Parameters.AddWithValue("@IdGerencia",                         curentity.IdGerencia);                        

              cmd.Parameters.AddWithValue("@IdPersonalAccidentado",              curentity.IdPersonalAccidentado);                          

              cmd.Parameters.AddWithValue("@IdProbRecurrencia",                  curentity.IdProbRecurrencia);                          

              cmd.Parameters.AddWithValue("@IdProcesoOperacion",                 curentity.IdProcesoOperacion);                          

              cmd.Parameters.AddWithValue("@IdRegion",                           curentity.IdRegion);                         

              cmd.Parameters.AddWithValue("@IdRespInvestigar",                   curentity.IdRespInvestigar);                         

              cmd.Parameters.AddWithValue("@IdSeCargaAccidente",                 curentity.IdSeCargaAccidente);                          

              cmd.Parameters.AddWithValue("@IdSede",                             curentity.IdSede);                         

              cmd.Parameters.AddWithValue("@IdSubProceso",                       curentity.IdSubProceso);                         

              cmd.Parameters.AddWithValue("@IdTipoEvento",                       curentity.IdTipoEvento);                         

              cmd.Parameters.AddWithValue("@IdZonaAccidente",                    curentity.IdZonaAccidente);                         

              cmd.Parameters.AddWithValue("@InformeInvestigacion",               curentity.InformeInvestigacion);                          

              cmd.Parameters.AddWithValue("@LesionDannio",                       curentity.LesionDannio);                         

              cmd.Parameters.AddWithValue("@LugarEspTarea",                      curentity.LugarEspTarea);                         

              cmd.Parameters.AddWithValue("@NombrePersonalAccidentado",          curentity.NombrePersonalAccidentado);                       

              cmd.Parameters.AddWithValue("@NombreRespInvestigar",               curentity.NombreRespInvestigar);                          

              cmd.Parameters.AddWithValue("@ParteCuerpoLesionada",               curentity.ParteCuerpoLesionada);                         

              cmd.Parameters.AddWithValue("@Potencial",                          curentity.Potencial);                        

              cmd.Parameters.AddWithValue("@Puerto_Arrivo",                      curentity.Puerto_Arrivo);                         

              cmd.Parameters.AddWithValue("@PuestoCargoAccidentado",             curentity.PuestoCargoAccidentado);                          

              cmd.Parameters.AddWithValue("@PuestoCargoAccidentado2",            curentity.PuestoCargoAccidentado2);                          

              cmd.Parameters.AddWithValue("@TiempoTranscurrido",                 curentity.TiempoTranscurrido);                       

              cmd.Parameters.AddWithValue("@fecha_Descanso_Fin",                 curentity.fecha_Descanso_Fin);                          

              cmd.Parameters.AddWithValue("@fecha_Descanso_Ini",                 curentity.fecha_Descanso_Ini);  

              cmd.Parameters.AddWithValue("@TemporadaVeda",                      curentity.TemporadaVeda);                       

              cmd.Parameters.AddWithValue("@Finalizado",                         curentity.Finalizado);  
          




            SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);//parametros de salida
            output_Id.Direction    = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            // SqlParameter output_Id2 = new SqlParameter("@CodeR", SqlDbType.BigInt);//parametros de salida
            // output_Id2.Direction     = ParameterDirection.Output;
            // cmd.Parameters.Add(output_Id2);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value) //&& output_Id2.Value != DBNull.Value)
            {
                curentity.Id                     = Convert.ToInt64(output_Id.Value);
                //curentity.CodeR = Convert.ToInt64(output_Id2.Value);//eso es si quiero devolver los dos
            }

            if (conn.State == System.Data.ConnectionState.Open)
                conn.Close();
        }

        return curentity;
    }

//----------------------------------------------------PUT-------------------------------------------------------------------------
 public async Task<EvidenciaPost> funPutSeguimientoEvidencia(ILogger log, EvidenciaPost curentity)
    {
        log.LogInformation("En funPuuuuuuuustSeguimientoEvidencia = "+ curentity.Id1);

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("[ssoma].[a_post_crear_datos_generales_web]", conn);//ok debeo modificar

              cmd.Parameters.AddWithValue("@Id1",                                curentity.Id1);

              cmd.Parameters.AddWithValue("@AccionBD",                           curentity.AccionBD);

              cmd.Parameters.AddWithValue("@AccidenteProceso",                   curentity.AccidenteProceso);                         

              cmd.Parameters.AddWithValue("@CodTrabjador",                       curentity.CodTrabjador);                         

              cmd.Parameters.AddWithValue("@DNIAccidentado",                     curentity.DNIAccidentado);                         

              cmd.Parameters.AddWithValue("@Descanso_estado",                    curentity.Descanso_estado);                         

              cmd.Parameters.AddWithValue("@Descripcion",                        curentity.Descripcion);                         

              cmd.Parameters.AddWithValue("@Dias_Descanza",                      curentity.Dias_Descanza);                        

              cmd.Parameters.AddWithValue("@EdadAccidentado",                    curentity.EdadAccidentado);                         

              cmd.Parameters.AddWithValue("@Expiencia_Month",                    curentity.Expiencia_Month);                         

              cmd.Parameters.AddWithValue("@Expiencia_Yaer",                     curentity.Expiencia_Yaer);                         

              cmd.Parameters.AddWithValue("@Fecha",                              curentity.Fecha);                         

              cmd.Parameters.AddWithValue("@FechaInvestigacionFin",              curentity.FechaInvestigacionFin);                          

              cmd.Parameters.AddWithValue("@FechaInvestigacionIni",              curentity.FechaInvestigacionIni);                          

              cmd.Parameters.AddWithValue("@HayPersonalAfectado",                curentity.HayPersonalAfectado);                         

              cmd.Parameters.AddWithValue("@HechoAtiempo",                       curentity.HechoAtiempo);                         

              cmd.Parameters.AddWithValue("@Hora",                               curentity.Hora);                         

              cmd.Parameters.AddWithValue("@IdAccidenteIncidente",               curentity.IdAccidenteIncidente);                          

              cmd.Parameters.AddWithValue("@IdAreaAccidente",                    curentity.IdAreaAccidente);                         

              cmd.Parameters.AddWithValue("@IdAreaRespInvestigar",               curentity.IdAreaRespInvestigar);                          

              cmd.Parameters.AddWithValue("@IdAsesorInvestigacion",              curentity.IdAsesorInvestigacion);                          

              cmd.Parameters.AddWithValue("@IdCondicionEP",                      curentity.IdCondicionEP);                         

              cmd.Parameters.AddWithValue("@IdEmbarcacion",                      curentity.IdEmbarcacion);                        

              cmd.Parameters.AddWithValue("@IdEmpresaCompany",                   curentity.IdEmpresaCompany);                       

              cmd.Parameters.AddWithValue("@IdGerencia",                         curentity.IdGerencia);                        

              cmd.Parameters.AddWithValue("@IdPersonalAccidentado",              curentity.IdPersonalAccidentado);                          

              cmd.Parameters.AddWithValue("@IdProbRecurrencia",                  curentity.IdProbRecurrencia);                          

              cmd.Parameters.AddWithValue("@IdProcesoOperacion",                 curentity.IdProcesoOperacion);                          

              cmd.Parameters.AddWithValue("@IdRegion",                           curentity.IdRegion);                         

              cmd.Parameters.AddWithValue("@IdRespInvestigar",                   curentity.IdRespInvestigar);                         

              cmd.Parameters.AddWithValue("@IdSeCargaAccidente",                 curentity.IdSeCargaAccidente);                          

              cmd.Parameters.AddWithValue("@IdSede",                             curentity.IdSede);                         

              cmd.Parameters.AddWithValue("@IdSubProceso",                       curentity.IdSubProceso);                         

              cmd.Parameters.AddWithValue("@IdTipoEvento",                       curentity.IdTipoEvento);                         

              cmd.Parameters.AddWithValue("@IdZonaAccidente",                    curentity.IdZonaAccidente);                         

              cmd.Parameters.AddWithValue("@InformeInvestigacion",               curentity.InformeInvestigacion);                          

              cmd.Parameters.AddWithValue("@LesionDannio",                       curentity.LesionDannio);                         

              cmd.Parameters.AddWithValue("@LugarEspTarea",                      curentity.LugarEspTarea);                         

              cmd.Parameters.AddWithValue("@NombrePersonalAccidentado",          curentity.NombrePersonalAccidentado);                       

              cmd.Parameters.AddWithValue("@NombreRespInvestigar",               curentity.NombreRespInvestigar);                          

              cmd.Parameters.AddWithValue("@ParteCuerpoLesionada",               curentity.ParteCuerpoLesionada);                         

              cmd.Parameters.AddWithValue("@Potencial",                          curentity.Potencial);                        

              cmd.Parameters.AddWithValue("@Puerto_Arrivo",                      curentity.Puerto_Arrivo);                         

              cmd.Parameters.AddWithValue("@PuestoCargoAccidentado",             curentity.PuestoCargoAccidentado);                          

              cmd.Parameters.AddWithValue("@PuestoCargoAccidentado2",            curentity.PuestoCargoAccidentado2);                          

              cmd.Parameters.AddWithValue("@TiempoTranscurrido",                 curentity.TiempoTranscurrido);                       

              cmd.Parameters.AddWithValue("@fecha_Descanso_Fin",                 curentity.fecha_Descanso_Fin);                          

              cmd.Parameters.AddWithValue("@fecha_Descanso_Ini",                 curentity.fecha_Descanso_Ini); 

              cmd.Parameters.AddWithValue("@TemporadaVeda",                      curentity.TemporadaVeda);

              cmd.Parameters.AddWithValue("@Finalizado",                         curentity.Finalizado);                         





            SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);//parametros de salida
            output_Id.Direction    = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            // SqlParameter output_Id2 = new SqlParameter("@CodeR", SqlDbType.BigInt);//parametros de salida
            // output_Id2.Direction     = ParameterDirection.Output;
            // cmd.Parameters.Add(output_Id2);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value) //&& output_Id2.Value != DBNull.Value)
            {
                curentity.Id                     = Convert.ToInt64(output_Id.Value);
                //curentity.CodeR = Convert.ToInt64(output_Id2.Value);//eso es si quiero devolver los dos
            }

            if (conn.State == System.Data.ConnectionState.Open)
                conn.Close();
        }

        return curentity;
    }
//----------------------------------------------------PUT------------------------------------------------------------------------

}


 
public class EvidenciaPost
{
      public long Id                               { get; set; }//*

      public long Id1                              { get; set; }//*

      public long AccionBD                         { get; set; }//*
 
      public string AccidenteProceso               { get; set; }  //AccidenteProceso;*

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

      public int Finalizado                        { get; set; }   // dataobject?.Finalizado;

      public long TemporadaVeda                    { get; set; }  //Potencial;*TemporadaVeda


     /*
        public int Tipo                              { get; set; } // si es accidente o insidete
        public long IdTipoEvento                     { get; set; }
        public string Fecha                          { get; set; }
        public string Hora                           { get; set; }
        public int HayPersonalAfectado               { get; set; }
        public string NombreEmpresa                  { get; set; }
        public int IdEmpresa                         { get; set; }
        public string DescripcionEvento              { get; set; }
            
            // primer tipo de accidente 
        public string A_NombrePersonalAccidentado    { get; set; }
        public string A_IdPersonalAccidentado        { get; set; }
        public string A_DniPersonalAccidentado       { get; set; }
        public string A_PuestoCargoAccidentado       { get; set; }
        public string A_NombreJefeAccidentado        { get; set; }
        public string A_IdJefeAccidentado            { get; set; }
            
            //segundo tipo de accidente
        public string B_TipoProducto                 { get; set; }
        public string B_ProductoInvolucrado          { get; set; }
        public string B_Volumen                      { get; set; }
        public string B_Area                         { get; set; }
        public string B_Fuente                       { get; set; }
        public string B_NombreJefeInmediato          { get; set; }
        public string B_IdJefeInmediato              { get; set; }
                //tercer tipo de incidente
        public string C_NombreContratista            { get; set; }
        public string C_Hurt                         { get; set; }
            
        public int IdSede                            { get; set; }
        public int IdEmbarcacion                     { get; set; }
        public int IdArea                            { get; set; }
        public int IdZona                            { get; set; }
        public int IdEstadoIncidente                 { get; set; }
       // public List<Objetivo>   Objetivos            {get; set;} 

        //---------------implementacion lineal --------------------
        public string Adjunto1                       { get; set; } 
        public string Adjunto2                       { get; set; } 
        public string Adjunto3                       { get; set; } 
        public string Adjunto4                       { get; set; } 
        public string Adjunto5                       { get; set; } 
        public long HallazgoId                       { get; set; }*/
}


// public async Task<Objetivo> funPostObjetivos(ILogger log,Objetivo curentity,long IdPadre , long IdPlanAnual,int Tipo)
//     {
//             string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);
//                                     log.LogInformation("AQUI ANDO funPostObjetivos");

//         using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
//         {
//             conn.Open();

//             /*if(curentity.EnviarCorreo == 1)
//             {
//                 curentity.StatusHallazgoId = 2;
//             }
//             else 
//             {
//                 curentity.StatusHallazgoId = 1;   
//             }*/

//             SqlCommand cmd = new SqlCommand("[ssoma].[post_plan_objetivo_insert]", conn);

//             cmd.Parameters.AddWithValue("@IdObj", curentity.Id);
//             cmd.Parameters.AddWithValue("@PlanId", IdPlanAnual);
//             cmd.Parameters.AddWithValue("@IdPadre", IdPadre);
//             cmd.Parameters.AddWithValue("@Description", curentity.Objetivo_Name);
//             cmd.Parameters.AddWithValue("@Tipo",Tipo);
//             cmd.Parameters.AddWithValue("@Active",1);
            
//             //cmd.Parameters.AddWithValue("@Id", curentity.Id);
            
 

//             SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
//             output_Id.Direction = ParameterDirection.Output;
//             cmd.Parameters.Add(output_Id);

//             cmd.CommandType = CommandType.StoredProcedure;

//             await cmd.ExecuteNonQueryAsync();

//             if (output_Id.Value != DBNull.Value)
//             {
//                 curentity.Id = Convert.ToInt64(output_Id.Value);
//                  log.LogInformation("AQUI ANDO ID "+System.Convert.ToString(curentity.Id));

//             }
//         }

//         return curentity;
//     }



// public class Objetivo
// {
//     public long   Id                       { get; set; }
//     public long   IdAccidenteIncidente     { get; set; }
//     public string NombreEvidencia          { get; set; }//NombreEvidencia
//     public string EvidenciaFile            { get; set; }//EvidenciaFile
//     public string CreateBy                 { get; set; }// CreateBy       ---- LastUpdateBy
//     public string LastUpdateBy             { get; set; }// Create
// }