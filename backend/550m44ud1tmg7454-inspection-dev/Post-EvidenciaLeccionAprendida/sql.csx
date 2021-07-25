/****************************************************************************************
* VISUAL SAT - [2021]
* PROYECTO : SIGTASA
* ESQUEMA : SSOMA
* SPRINT  : 4
* MODULO : INCIDENTE ACCIDENTES
* OPERADORES_________________________________________________________________________
* | # | PROGRAMADOR     |  |      FECHA   |  |   HORA   |           CORREO           |
* | 1 | Andy Vásquez    |  |  26/03/2021  |  | 09:00:50 |    caracas1348@gmail.com   |
* |___|_________________|__|______________|__|__________|____________________________| 
*
* DESCRIPCION: ARCHIVO SQL BACKEND DE FUNCIONALIDAD EN SERVIDOR QUE REGISTRA LAS *ALERTAS* DE
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

            SqlCommand cmd = new SqlCommand("[ssoma].[b_la_post_fotos_leccion_aprendida]", conn);

           //cmd.Parameters.AddWithValue("@CodeR",   curentity.@CodeR);//IdAccidenteIncidente  RETORNO DE SALIDA
            // cmd.Parameters.AddWithValue("@IdAccidenteIncidente",     curentity.IdAccidenteIncidente);//NombreEvidencia
            // cmd.Parameters.AddWithValue("@NombreEvidencia",          curentity.NombreEvidencia);//NombreEvidencia
            // cmd.Parameters.AddWithValue("@EvidenciaFile",            curentity.EvidenciaFile);//EvidenciaFile
            // cmd.Parameters.AddWithValue("@CreateBy",               curentity.CreateBy);//Created_By   LastUpdateBy
            // cmd.Parameters.AddWithValue("@LastUpdateBy",               curentity.LastUpdateBy);//Created_By   LastUpdateBy
            cmd.Parameters.AddWithValue("@Id1",                                    curentity.Id1);
            cmd.Parameters.AddWithValue("@AccionBD",                               curentity.AccionBD);

               //------------------------------------------------------------------------------------------------------------

                     cmd.Parameters.AddWithValue("@Leccion_AprendidaId",                    curentity.Leccion_AprendidaId);
                     cmd.Parameters.AddWithValue("@NombreEvidencia",                        curentity.NombreEvidencia);
                     cmd.Parameters.AddWithValue("@EvidenciaFile",                           curentity.EvidenciaFile);
                     cmd.Parameters.AddWithValue("@CreateBy",                             curentity.CreateBy);
                     cmd.Parameters.AddWithValue("@CreateDate",                          curentity.CreateDate);
                    // cmd.Parameters.AddWithValue("@Active",                               curentity.Active);


              //------------------------------------------------------------------------------------------------------------



            SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);//parametros de salida
            output_Id.Direction    = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);


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

            SqlCommand cmd = new SqlCommand("[ssoma].[b_la_post_fotos_leccion_aprendida]", conn);

            cmd.Parameters.AddWithValue("@Id1",                                    curentity.Id1);
            cmd.Parameters.AddWithValue("@AccionBD",                               curentity.AccionBD);
            
       //------------------------------------------------------------------------------------------------
                     cmd.Parameters.AddWithValue("@Leccion_AprendidaId",                    curentity.Leccion_AprendidaId);
                     cmd.Parameters.AddWithValue("@NombreEvidencia",                        curentity.NombreEvidencia);
                     cmd.Parameters.AddWithValue("@EvidenciaFile",                           curentity.EvidenciaFile);
                     cmd.Parameters.AddWithValue("@CreateBy",                             curentity.CreateBy);
                     cmd.Parameters.AddWithValue("@CreateDate",                          curentity.CreateDate);

       //------------------------------------------------------------------------------------------------
         




            SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);//parametros de salida
            output_Id.Direction    = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);


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
 
    public long Id1                                  { get; set;}
    public long AccionBD                             { get; set;}

    public long Id                                   { get; set;}
    public int Leccion_AprendidaId                   { get; set;}

    public string NombreEvidencia                    {get;set;}
    public string EvidenciaFile                      {get;set;}

    public string CreateBy                           {get;set;}
    public string CreateDate                      {get;set;}
   // public int Active                              { get; set;}

}
