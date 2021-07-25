/****************************************************************************************
* VISUAL SAT - [2021]
* PROYECTO : SIGTASA
* ESQUEMA : SSOMA
* SPRINT  : 4
* MODULO : INCIDENTES ACCIDENTES
* OPERADORES_________________________________________________________________________
* | # | PROGRAMADOR     |  |      FECHA   |  |   HORA   |           CORREO           |
* | 1 | Andy Vásquez    |  |  27/03/2021  |  | 22:28:50 |    caracas1348@gmail.com   |
* |___|_________________|__|______________|__|__________|____________________________|
*
* DESCRIPCION: ARCHIVO SQL BACKEND DE FUNCIONALIDAD EN SERVIDOR QUE REGISTRA  EL LISTADO  
*              DE CORREO Y PERSONAS A QUIEN REMITIR LAS ALERTAS
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

    public async Task<EvidenciaPost> funPostSeguimientoEvidencia(ILogger log, EvidenciaPost curentity, listadoDestinatario obj)
    {
        log.LogInformation("En funPostSeguimientoEvidencia." );
        
   
                         using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
                            {
                                conn.Open();

                                SqlCommand cmd = new SqlCommand("[ssoma].[a_post_registrar_lista_envio_alerta_incidente_web]", conn);

                               
                                cmd.Parameters.AddWithValue("@IdAccidenteIncidente",     curentity.IdAccidenteIncidente);

                                cmd.Parameters.AddWithValue("@Name",         obj.Name);
                                cmd.Parameters.AddWithValue("@UserHash",     obj.UserHash);
                                cmd.Parameters.AddWithValue("@Cargo",        obj.Cargo);
                                cmd.Parameters.AddWithValue("@Correo",       obj.Correo);


                                cmd.Parameters.AddWithValue("@Created_By",           curentity.Created_By);
                                cmd.Parameters.AddWithValue("@emailResponsable",     curentity.emailResponsable);
                                cmd.Parameters.AddWithValue("@nameResponsable",      curentity.nameResponsable);
                                cmd.Parameters.AddWithValue("@jobResponsable",       curentity.jobResponsable);
                              

                                SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
                                output_Id.Direction    = ParameterDirection.Output;
                                cmd.Parameters.Add(output_Id);

                             

                                cmd.CommandType = CommandType.StoredProcedure;

                                await cmd.ExecuteNonQueryAsync();

                                if (output_Id.Value != DBNull.Value) //&& output_Id2.Value != DBNull.Value)
                                {
                                    //curentity.Id                     = Convert.ToInt64(output_Id.Value);
                                    obj.Id = Convert.ToInt64(output_Id.Value);
                                }

                                if (conn.State == System.Data.ConnectionState.Open)
                                    conn.Close();
                            }
                          
        
        return curentity;
    }

}

public class EvidenciaPost
{
    public long   Id                                             { get; set; }
    public long   IdAccidenteIncidente                           { get; set; }
    public long   IdAlerta                                       { get; set; }
    public string Code                                           { get; set; }
    public string Created_By                                     { get; set; }
    public string emailResponsable                               { get; set; }
    public string nameResponsable                                { get; set; }
    public string jobResponsable                                 { get; set; }
    public List<listadoDestinatario> listadoDestinatarios        { get; set; }
}


public class listadoDestinatario
{
   public long Id                         { get; set; }
   public string Name                     { get; set; }
   public string UserHash                 { get; set; }
   public string Cargo                    { get; set; }
   public string Correo                   { get; set; }

}


public class DataEmailNew
{
    public string sendto { get; set; }
    public string from { get; set; }
    public string emailsubject { get; set; }
    public string bodyhtml { get; set; }
    public List<Files> Attachments { get; set; }
}

public class Files
{
    public string base64 { get; set; }
    public string name { get; set; }
}