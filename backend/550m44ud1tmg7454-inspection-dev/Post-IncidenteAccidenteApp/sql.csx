/****************************************************************************************
* VISUAL SAT - [2021]
* PROYECTO : SIGTASA
* ESQUEMA : SSOMA
* SPRINT  : 4
* MODULO : GESTIÓN DE PLAN ANUAL
* OPERADORES_________________________________________________________________________
* | # | PROGRAMADOR     |  |      FECHA   |  |   HORA   |           CORREO           |
* | 1 | Andy Vásquez    |  |  15/03/2021  |  | 04:00:50 |    caracas1348@gmail.com   |  run 02
* |___|_________________|__|______________|__|__________|____________________________|
*
* DESCRIPCION: ARCHIVO SQL BACKEND DE FUNCIONALIDAD EN SERVIDOR QUE REGISTRA LOS 
*              LOS INCIDENTES ACCIDENTES DESDE LA APP
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

            SqlCommand cmd = new SqlCommand("[ssoma].[a_post_crear_nuevo_incidente_app]", conn);

           //cmd.Parameters.AddWithValue("@CodeR",   curentity.@CodeR);//IdAccidenteIncidente  RETORNO DE SALIDA
            // cmd.Parameters.AddWithValue("@IdAccidenteIncidente",     curentity.IdAccidenteIncidente);//NombreEvidencia
            // cmd.Parameters.AddWithValue("@NombreEvidencia",          curentity.NombreEvidencia);//NombreEvidencia
            // cmd.Parameters.AddWithValue("@EvidenciaFile",            curentity.EvidenciaFile);//EvidenciaFile
            // cmd.Parameters.AddWithValue("@CreateBy",               curentity.CreateBy);//Created_By   LastUpdateBy
            // cmd.Parameters.AddWithValue("@LastUpdateBy",               curentity.LastUpdateBy);//Created_By   LastUpdateBy
            cmd.Parameters.AddWithValue("@Id1",                                    curentity.Id1);
            cmd.Parameters.AddWithValue("@AccionBD",                               curentity.AccionBD);
            cmd.Parameters.AddWithValue("@Tipo",                                   curentity.Tipo);       
            cmd.Parameters.AddWithValue("@IdTipoEvento",                           curentity.IdTipoEvento);  
            cmd.Parameters.AddWithValue("@Fecha",                                  curentity.Fecha); 
            cmd.Parameters.AddWithValue("@Hora",                                   curentity.Hora); 
            cmd.Parameters.AddWithValue("@HayPersonalAfectado ",                   curentity.HayPersonalAfectado);   
            cmd.Parameters.AddWithValue("@NombreEmpresa",                          curentity.NombreEmpresa); 
            cmd.Parameters.AddWithValue("@IdEmpresa",                              curentity.IdEmpresa); 
            cmd.Parameters.AddWithValue("@DescripcionEvento",                      curentity.DescripcionEvento); 
                
            //     -- primer tipo de accidente 
            cmd.Parameters.AddWithValue("@A_NombrePersonalAccidentado ",           curentity.A_NombrePersonalAccidentado); 
            cmd.Parameters.AddWithValue("@A_IdPersonalAccidentado",                curentity.A_IdPersonalAccidentado); 
            cmd.Parameters.AddWithValue("@A_DniPersonalAccidentado",               curentity.A_DniPersonalAccidentado); 
            cmd.Parameters.AddWithValue("@A_PuestoCargoAccidentado",               curentity.A_PuestoCargoAccidentado); 
            cmd.Parameters.AddWithValue("@A_NombreJefeAccidentado",                curentity.A_NombreJefeAccidentado); 
            cmd.Parameters.AddWithValue("@A_IdJefeAccidentado",                    curentity.A_IdJefeAccidentado); 
                
            //     --segundo tipo de accidente
            cmd.Parameters.AddWithValue("@B_TipoProducto ",                        curentity.B_TipoProducto); 
            cmd.Parameters.AddWithValue("@B_ProductoInvolucrado ",                 curentity.B_ProductoInvolucrado); 
            cmd.Parameters.AddWithValue("@B_Volumen",                              curentity.B_Volumen); 
            cmd.Parameters.AddWithValue("@B_Area ",                                curentity.B_Area); 
            cmd.Parameters.AddWithValue("@B_Fuente",                               curentity.B_Fuente); 
            cmd.Parameters.AddWithValue("@B_NombreJefeInmediato",                  curentity.B_NombreJefeInmediato); 
            cmd.Parameters.AddWithValue("@B_IdJefeInmediato ",                     curentity.B_IdJefeInmediato); 
                
            //         --tercer tipo de incidente
            cmd.Parameters.AddWithValue("@C_NombreContratista ",                   curentity.C_NombreContratista); 
            cmd.Parameters.AddWithValue("@C_Hurt ",                                curentity.C_Hurt); 
                
            cmd.Parameters.AddWithValue("@IdSede ",                                curentity.IdSede); 
            cmd.Parameters.AddWithValue("@IdEmbarcacion ",                         curentity.IdEmbarcacion); 
            cmd.Parameters.AddWithValue("@IdArea ",                                curentity.IdArea); 
            cmd.Parameters.AddWithValue("@IdZona ",                                curentity.IdZona); 
            cmd.Parameters.AddWithValue("@IdEstadoIncidente ",                     curentity.IdEstadoIncidente); 


            cmd.Parameters.AddWithValue("@Adjunto1 ",                              curentity.Adjunto1); 
            cmd.Parameters.AddWithValue("@Adjunto2 ",                              curentity.Adjunto2); 
            cmd.Parameters.AddWithValue("@Adjunto3 ",                              curentity.Adjunto3); 
            cmd.Parameters.AddWithValue("@Adjunto4 ",                              curentity.Adjunto4); 
            cmd.Parameters.AddWithValue("@Adjunto5 ",                              curentity.Adjunto5); 
            cmd.Parameters.AddWithValue("@HallazgoId ",                            curentity.HallazgoId); 




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

            SqlCommand cmd = new SqlCommand("[ssoma].[a_post_crear_nuevo_incidente_app]", conn);

            cmd.Parameters.AddWithValue("@Id1",                                    curentity.Id1);
            cmd.Parameters.AddWithValue("@AccionBD",                               curentity.AccionBD);
            cmd.Parameters.AddWithValue("@Tipo",                                   curentity.Tipo);       
            cmd.Parameters.AddWithValue("@IdTipoEvento",                           curentity.IdTipoEvento);  
            cmd.Parameters.AddWithValue("@Fecha",                                  curentity.Fecha); 
            cmd.Parameters.AddWithValue("@Hora",                                   curentity.Hora); 
            cmd.Parameters.AddWithValue("@HayPersonalAfectado ",                   curentity.HayPersonalAfectado);   
            cmd.Parameters.AddWithValue("@NombreEmpresa",                          curentity.NombreEmpresa); 
            cmd.Parameters.AddWithValue("@IdEmpresa",                              curentity.IdEmpresa); 
            cmd.Parameters.AddWithValue("@DescripcionEvento",                      curentity.DescripcionEvento); 
                
            //     -- primer tipo de accidente 
            cmd.Parameters.AddWithValue("@A_NombrePersonalAccidentado ",           curentity.A_NombrePersonalAccidentado); 
            cmd.Parameters.AddWithValue("@A_IdPersonalAccidentado",                curentity.A_IdPersonalAccidentado); 
            cmd.Parameters.AddWithValue("@A_DniPersonalAccidentado",               curentity.A_DniPersonalAccidentado); 
            cmd.Parameters.AddWithValue("@A_PuestoCargoAccidentado",               curentity.A_PuestoCargoAccidentado); 
            cmd.Parameters.AddWithValue("@A_NombreJefeAccidentado",                curentity.A_NombreJefeAccidentado); 
            cmd.Parameters.AddWithValue("@A_IdJefeAccidentado",                    curentity.A_IdJefeAccidentado); 
                
            //     --segundo tipo de accidente
            cmd.Parameters.AddWithValue("@B_TipoProducto ",                        curentity.B_TipoProducto); 
            cmd.Parameters.AddWithValue("@B_ProductoInvolucrado ",                 curentity.B_ProductoInvolucrado); 
            cmd.Parameters.AddWithValue("@B_Volumen",                              curentity.B_Volumen); 
            cmd.Parameters.AddWithValue("@B_Area ",                                curentity.B_Area); 
            cmd.Parameters.AddWithValue("@B_Fuente",                               curentity.B_Fuente); 
            cmd.Parameters.AddWithValue("@B_NombreJefeInmediato",                  curentity.B_NombreJefeInmediato); 
            cmd.Parameters.AddWithValue("@B_IdJefeInmediato ",                     curentity.B_IdJefeInmediato); 
                
            //         --tercer tipo de incidente
            cmd.Parameters.AddWithValue("@C_NombreContratista ",                   curentity.C_NombreContratista); 
            cmd.Parameters.AddWithValue("@C_Hurt ",                                curentity.C_Hurt); 
                
            cmd.Parameters.AddWithValue("@IdSede ",                                curentity.IdSede); 
            cmd.Parameters.AddWithValue("@IdEmbarcacion ",                         curentity.IdEmbarcacion); 
            cmd.Parameters.AddWithValue("@IdArea ",                                curentity.IdArea); 
            cmd.Parameters.AddWithValue("@IdZona ",                                curentity.IdZona); 
            cmd.Parameters.AddWithValue("@IdEstadoIncidente ",                     curentity.IdEstadoIncidente); 


            cmd.Parameters.AddWithValue("@Adjunto1 ",                              curentity.Adjunto1); 
            cmd.Parameters.AddWithValue("@Adjunto2 ",                              curentity.Adjunto2); 
            cmd.Parameters.AddWithValue("@Adjunto3 ",                              curentity.Adjunto3); 
            cmd.Parameters.AddWithValue("@Adjunto4 ",                              curentity.Adjunto4); 
            cmd.Parameters.AddWithValue("@Adjunto5 ",                              curentity.Adjunto5); 
            cmd.Parameters.AddWithValue("@HallazgoId ",                            curentity.HallazgoId); 




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
    public long Id                             { get; set; }
    public long Id1                            { get; set; }
    public long AccionBD                       { get; set; }
    //public string CodeR                       { get; set; }
    //public long IdAccidenteIncidente     { get; set; }
    //public long HAPlanAccionesId         { get; set; }//@IdAccidenteIncidente
   // public long SEEvidenciasAdjuntosId   { get; set; }// no
   // public long SEStatusEvidenciasId     { get; set; }// no
    //public string NombreEvidencia        { get; set; }//NombreEvidencia
    //public string EvidenciaFile          { get; set; }//EvidenciaFile
    //public string CreateBy             { get; set; }// CreateBy       ---- LastUpdateBy
    //public string LastUpdateBy           { get; set; }// CreateBy       ---- LastUpdateBy
    //public int Deleted                   { get; set; }// no
   // public string DescriptionObservacion { get; set; }// no
    //public int TipoEvaluacion            { get; set; }// no

    // public DateTime EjecucionDate       {get; set;}


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
        public long HallazgoId                       { get; set; }
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