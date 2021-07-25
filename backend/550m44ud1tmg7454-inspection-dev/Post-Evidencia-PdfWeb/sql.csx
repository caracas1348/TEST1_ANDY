/****************************************************************************************
* VISUAL SAT - [2021]
* PROYECTO : SIGTASA
* ESQUEMA : SSOMA
* SPRINT  : 4
* MODULO : GESTIÓN DE PLAN ANUAL
* OPERADORES_________________________________________________________________________
* | # | PROGRAMADOR     |  |      FECHA   |  |   HORA   |           CORREO           |
* | 1 | Andy Vásquez    |  |  15/03/2021  |  | 13:28:50 |    caracas1348@gmail.com   |
* |___|_________________|__|______________|__|__________|____________________________|
*
* DESCRIPCION: ARCHIVO SQL BACKEND DE FUNCIONALIDAD EN SERVIDOR QUE REGISTRA LAS 
*              EVIDENCIAS FOTOGRAFICAS DE LOS INCIDENTES ACCIDENTES APP
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

            SqlCommand cmd = new SqlCommand("[ssoma].[a_post_insert_evidencia_adjunto_web]", conn);

            //cmd.Parameters.AddWithValue("@HAPlanAccionesId",   curentity.@HAPlanAccionesId);//IdAccidenteIncidente
            cmd.Parameters.AddWithValue("@IdAccidenteIncidente",     curentity.IdAccidenteIncidente);//NombreEvidencia
            cmd.Parameters.AddWithValue("@NombreEvidencia",          curentity.NombreEvidencia);//NombreEvidencia
            cmd.Parameters.AddWithValue("@EvidenciaFile",            curentity.EvidenciaFile);//EvidenciaFile
            cmd.Parameters.AddWithValue("@CreateBy",               curentity.CreateBy);//Created_By   LastUpdateBy
            cmd.Parameters.AddWithValue("@LastUpdateBy",               curentity.LastUpdateBy);//Created_By   LastUpdateBy

            SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
            output_Id.Direction    = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            // SqlParameter output_Id2 = new SqlParameter("@SEEvidenciasAdjuntosId", SqlDbType.BigInt);//parametros de salida
            // output_Id2.Direction     = ParameterDirection.Output;
            // cmd.Parameters.Add(output_Id2);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value) //&& output_Id2.Value != DBNull.Value)
            {
                curentity.Id                     = Convert.ToInt64(output_Id.Value);
               // curentity.SEEvidenciasAdjuntosId = Convert.ToInt64(output_Id2.Value);//eso es si quiero devolver los dos
            }

            if (conn.State == System.Data.ConnectionState.Open)
                conn.Close();
        }

        return curentity;
    }

}

public class EvidenciaPost
{
    public long Id                       { get; set; }
    public long IdAccidenteIncidente     { get; set; }
    //public long HAPlanAccionesId         { get; set; }//@IdAccidenteIncidente
   // public long SEEvidenciasAdjuntosId   { get; set; }// no
   // public long SEStatusEvidenciasId     { get; set; }// no
    public string NombreEvidencia        { get; set; }//NombreEvidencia
    public string EvidenciaFile          { get; set; }//EvidenciaFile
    public string CreateBy             { get; set; }// CreateBy       ---- LastUpdateBy
    public string LastUpdateBy           { get; set; }// CreateBy       ---- LastUpdateBy
    //public int Deleted                   { get; set; }// no
   // public string DescriptionObservacion { get; set; }// no
    //public int TipoEvaluacion            { get; set; }// no

    // public DateTime EjecucionDate       {get; set;}
}

