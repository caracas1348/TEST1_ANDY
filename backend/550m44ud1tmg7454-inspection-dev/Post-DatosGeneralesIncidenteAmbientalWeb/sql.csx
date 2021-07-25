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

            SqlCommand cmd = new SqlCommand("[ssoma].[a_post_crear_datos_generales_ambiente_web]", conn);

          
              cmd.Parameters.AddWithValue("@Id1",                                      curentity.Id1);

              cmd.Parameters.AddWithValue("@AccionBD",                                 curentity.AccionBD);

              cmd.Parameters.AddWithValue("@IdTipoEvento",                             curentity.IdTipoEvento);          
              cmd.Parameters.AddWithValue("@Fecha",                                    curentity.Fecha);           
              cmd.Parameters.AddWithValue("@Hora",                                     curentity.Hora);           
              cmd.Parameters.AddWithValue("@ReporteExterno",                           curentity.ReporteExterno);           
              cmd.Parameters.AddWithValue("@IdGerencia",                               curentity.IdGerencia);           
              cmd.Parameters.AddWithValue("@IdSede",                                   curentity.IdSede);           
              cmd.Parameters.AddWithValue("@IdZonaUbicacion",                          curentity.IdZonaUbicacion);           
              cmd.Parameters.AddWithValue("@HayPersonalAfectado",                      curentity.HayPersonalAfectado);           
              cmd.Parameters.AddWithValue("@IdEmpresa",                                curentity.IdEmpresa);           
              cmd.Parameters.AddWithValue("@Descripcion",                              curentity.Descripcion);           
              cmd.Parameters.AddWithValue("@AcccionesInmediatas",                      curentity.AcccionesInmediatas);           
              cmd.Parameters.AddWithValue("@IdContaminante",                           curentity.IdContaminante);           
              cmd.Parameters.AddWithValue("@Volumen",                                  curentity.Volumen);           
              cmd.Parameters.AddWithValue("@UnidadVolumen",                            curentity.UnidadVolumen);           
              cmd.Parameters.AddWithValue("@AreaImpactada",                            curentity.AreaImpactada);           
              cmd.Parameters.AddWithValue("@IdImpactoAmbiental",                       curentity.IdImpactoAmbiental);           

              cmd.Parameters.AddWithValue("@xIdDescripcionEvento",                     curentity.xIdDescripcionEvento);           
              cmd.Parameters.AddWithValue("@xImpactoAmbiental",                        curentity.xImpactoAmbiental);           
              cmd.Parameters.AddWithValue("@xReaccionPublica",                         curentity.xReaccionPublica);           
              cmd.Parameters.AddWithValue("@xRelacionComunidad",                       curentity.xRelacionComunidad);           
              cmd.Parameters.AddWithValue("@xLegal",                                   curentity.xLegal);           
              cmd.Parameters.AddWithValue("@xCalificacion",                            curentity.xCalificacion);           
              cmd.Parameters.AddWithValue("@xNivelSeveridad",                          curentity.xNivelSeveridad);           
              cmd.Parameters.AddWithValue("@xIIAUnidad",                               curentity.xIIAUnidad);           
              cmd.Parameters.AddWithValue("@xIIACorporativo",                          curentity.xIIACorporativo);           
              cmd.Parameters.AddWithValue("@xMetaCorporativa",                         curentity.xMetaCorporativa);           

              cmd.Parameters.AddWithValue("@xIIAUnidadPesca",                          curentity.xIIAUnidadPesca);           
              cmd.Parameters.AddWithValue("@xIIACoporativoPesca",                      curentity.xIIACoporativoPesca);           
              cmd.Parameters.AddWithValue("@xMetaPesac",                               curentity.xMetaPesac);           
              cmd.Parameters.AddWithValue("@xIIAOperaciones",                          curentity.xIIAOperaciones);          
              cmd.Parameters.AddWithValue("@xIIACoporativoOperaciones",                curentity.xIIACoporativoOperaciones);          
              cmd.Parameters.AddWithValue("@xMetaOperaciones",                         curentity.xMetaOperaciones);           
              cmd.Parameters.AddWithValue("@xIIAdminFinanzas",                         curentity.xIIAdminFinanzas);           
              cmd.Parameters.AddWithValue("@xIIACoporAdmiFinanzas",                    curentity.xIIACoporAdmiFinanzas);           
              cmd.Parameters.AddWithValue("@xMetaAdminFinanazas",                      curentity.xMetaAdminFinanazas);           

              cmd.Parameters.AddWithValue("@yNumColaboradores",                        curentity.yNumColaboradores);          
              cmd.Parameters.AddWithValue("@yNumHora ",                                curentity.yNumHora);           
              cmd.Parameters.AddWithValue("@yCostoMOS",                                curentity.yCostoMOS);          
              cmd.Parameters.AddWithValue("@yNumColaboradores2",                       curentity.yNumColaboradores2);           
              cmd.Parameters.AddWithValue("@yNumHora2",                                curentity.yNumHora2);           
              cmd.Parameters.AddWithValue("@yCostoMOS2",                               curentity.yCostoMOS2);           
              cmd.Parameters.AddWithValue("@yCantProducto",                            curentity.yCantProducto);           
              cmd.Parameters.AddWithValue("@yCostoProductoS",                          curentity.yCostoProductoS);           

              cmd.Parameters.AddWithValue("@yCostoProductoS2",                         curentity.yCostoProductoS2); 
              cmd.Parameters.AddWithValue("@ycostoMateriales",                         curentity.ycostoMateriales); 
                        
              cmd.Parameters.AddWithValue("@yCostoServicioS",                          curentity.yCostoServicioS);          
              cmd.Parameters.AddWithValue("@yCostoMultaS",                             curentity.yCostoMultaS);          
              cmd.Parameters.AddWithValue("@yOtroS",                                   curentity.yOtroS);          
              cmd.Parameters.AddWithValue("@yCostoTotalS",                             curentity.yCostoTotalS);           
              cmd.Parameters.AddWithValue("@yCostoTotalUSD",                           curentity.yCostoTotalUSD);           
              cmd.Parameters.AddWithValue("@yOefaUit",                                 curentity.yOefaUit);          
              cmd.Parameters.AddWithValue("@yOefaS",                                   curentity.yOefaS);           
              cmd.Parameters.AddWithValue("@yOefaUSD",                                 curentity.yOefaUSD);          
              cmd.Parameters.AddWithValue("@yDicapiUit",                               curentity.yDicapiUit);           
              cmd.Parameters.AddWithValue("@yDicapiS",                                 curentity.yDicapiS);           
              cmd.Parameters.AddWithValue("@yDicapiUSD",                               curentity.yDicapiUSD); 
              cmd.Parameters.AddWithValue("@IdAccidenteIncidente",                     curentity.IdAccidenteIncidente);  
              cmd.Parameters.AddWithValue("@TemporadaVeda",                            curentity.TemporadaVeda);
              cmd.Parameters.AddWithValue("@Finalizado",                               curentity.Finalizado);                        


          




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

            SqlCommand cmd = new SqlCommand("[ssoma].[a_post_crear_datos_generales_ambiente_web]", conn);//ok debeo modificar

              cmd.Parameters.AddWithValue("@Id1",                                curentity.Id1);

              cmd.Parameters.AddWithValue("@AccionBD",                           curentity.AccionBD);

              cmd.Parameters.AddWithValue("@IdTipoEvento",                             curentity.IdTipoEvento);          
              cmd.Parameters.AddWithValue("@Fecha",                                    curentity.Fecha);           
              cmd.Parameters.AddWithValue("@Hora",                                     curentity.Hora);           
              cmd.Parameters.AddWithValue("@ReporteExterno",                           curentity.ReporteExterno);           
              cmd.Parameters.AddWithValue("@IdGerencia",                               curentity.IdGerencia);           
              cmd.Parameters.AddWithValue("@IdSede",                                   curentity.IdSede);           
              cmd.Parameters.AddWithValue("@IdZonaUbicacion",                          curentity.IdZonaUbicacion);           
              cmd.Parameters.AddWithValue("@HayPersonalAfectado",                      curentity.HayPersonalAfectado);           
              cmd.Parameters.AddWithValue("@IdEmpresa",                                curentity.IdEmpresa);           
              cmd.Parameters.AddWithValue("@Descripcion",                              curentity.Descripcion);           
              cmd.Parameters.AddWithValue("@AcccionesInmediatas",                      curentity.AcccionesInmediatas);           
              cmd.Parameters.AddWithValue("@IdContaminante",                           curentity.IdContaminante);           
              cmd.Parameters.AddWithValue("@Volumen",                                  curentity.Volumen);           
              cmd.Parameters.AddWithValue("@UnidadVolumen",                            curentity.UnidadVolumen);           
              cmd.Parameters.AddWithValue("@AreaImpactada",                            curentity.AreaImpactada);           
              cmd.Parameters.AddWithValue("@IdImpactoAmbiental",                       curentity.IdImpactoAmbiental);           

              cmd.Parameters.AddWithValue("@xIdDescripcionEvento",                     curentity.xIdDescripcionEvento);           
              cmd.Parameters.AddWithValue("@xImpactoAmbiental",                        curentity.xImpactoAmbiental);           
              cmd.Parameters.AddWithValue("@xReaccionPublica",                         curentity.xReaccionPublica);           
              cmd.Parameters.AddWithValue("@xRelacionComunidad",                       curentity.xRelacionComunidad);           
              cmd.Parameters.AddWithValue("@xLegal",                                   curentity.xLegal);           
              cmd.Parameters.AddWithValue("@xCalificacion",                            curentity.xCalificacion);           
              cmd.Parameters.AddWithValue("@xNivelSeveridad",                          curentity.xNivelSeveridad);           
              cmd.Parameters.AddWithValue("@xIIAUnidad",                               curentity.xIIAUnidad);           
              cmd.Parameters.AddWithValue("@xIIACorporativo",                          curentity.xIIACorporativo);           
              cmd.Parameters.AddWithValue("@xMetaCorporativa",                         curentity.xMetaCorporativa);           

              cmd.Parameters.AddWithValue("@xIIAUnidadPesca",                          curentity.xIIAUnidadPesca);           
              cmd.Parameters.AddWithValue("@xIIACoporativoPesca",                      curentity.xIIACoporativoPesca);           
              cmd.Parameters.AddWithValue("@xMetaPesac",                               curentity.xMetaPesac);           
              cmd.Parameters.AddWithValue("@xIIAOperaciones",                          curentity.xIIAOperaciones);          
              cmd.Parameters.AddWithValue("@xIIACoporativoOperaciones",                curentity.xIIACoporativoOperaciones);          
              cmd.Parameters.AddWithValue("@xMetaOperaciones",                         curentity.xMetaOperaciones);           
              cmd.Parameters.AddWithValue("@xIIAdminFinanzas",                         curentity.xIIAdminFinanzas);           
              cmd.Parameters.AddWithValue("@xIIACoporAdmiFinanzas",                    curentity.xIIACoporAdmiFinanzas);           
              cmd.Parameters.AddWithValue("@xMetaAdminFinanazas",                      curentity.xMetaAdminFinanazas);           

              cmd.Parameters.AddWithValue("@yNumColaboradores",                        curentity.yNumColaboradores);          
              cmd.Parameters.AddWithValue("@yNumHora",                                 curentity.yNumHora);           
              cmd.Parameters.AddWithValue("@yCostoMOS",                                curentity.yCostoMOS);          
              cmd.Parameters.AddWithValue("@yNumColaboradores2",                       curentity.yNumColaboradores2);           
              cmd.Parameters.AddWithValue("@yNumHora2",                                curentity.yNumHora2);           
              cmd.Parameters.AddWithValue("@yCostoMOS2",                               curentity.yCostoMOS2);           
              cmd.Parameters.AddWithValue("@yCantProducto",                            curentity.yCantProducto);           
              cmd.Parameters.AddWithValue("@yCostoProductoS",                          curentity.yCostoProductoS);           

              cmd.Parameters.AddWithValue("@yCostoProductoS2",                         curentity.yCostoProductoS2);  
              cmd.Parameters.AddWithValue("@ycostoMateriales",                         curentity.ycostoMateriales);            
              cmd.Parameters.AddWithValue("@yCostoServicioS",                          curentity.yCostoServicioS);          
              cmd.Parameters.AddWithValue("@yCostoMultaS",                             curentity.yCostoMultaS);          
              cmd.Parameters.AddWithValue("@yOtroS",                                   curentity.yOtroS);          
              cmd.Parameters.AddWithValue("@yCostoTotalS",                             curentity.yCostoTotalS);           
              cmd.Parameters.AddWithValue("@yCostoTotalUSD",                           curentity.yCostoTotalUSD);           
              cmd.Parameters.AddWithValue("@yOefaUit",                                 curentity.yOefaUit);          
              cmd.Parameters.AddWithValue("@yOefaS",                                   curentity.yOefaS);           
              cmd.Parameters.AddWithValue("@yOefaUSD",                                 curentity.yOefaUSD);          
              cmd.Parameters.AddWithValue("@yDicapiUit",                               curentity.yDicapiUit);           
              cmd.Parameters.AddWithValue("@yDicapiS",                                 curentity.yDicapiS);           
              cmd.Parameters.AddWithValue("@yDicapiUSD",                               curentity.yDicapiUSD);   
              cmd.Parameters.AddWithValue("@IdAccidenteIncidente",                     curentity.IdAccidenteIncidente); 
              cmd.Parameters.AddWithValue("@TemporadaVeda",                            curentity.TemporadaVeda);  
              cmd.Parameters.AddWithValue("@Finalizado",                               curentity.Finalizado);                        


               //IdAccidenteIncidente


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

/*public long Id                             {get; set;}//*
public long Id1                            {get; set;}//*
public long AccionBD                       {get; set;}//*

public long IdTipoEvento                   {get; set;}    //bigint
public string Fecha                        {get; set;}           // date NULL
public string Hora                         {get; set;}           // time NULL
public int ReporteExterno                  {get; set;}           // int NULL
public long IdGerencia                     {get; set;}           // bigint NULL
public long IdSede                         {get; set;}           // bigint NULL
public long IdZonaUbicacion                {get; set;}           // bigint NULL
public int HayPersonalAfectado             {get; set;}           // int NULL
public long IdEmpresa                      {get; set;}           // bigint NULL
public string Descripcion                  {get; set;}           // varchar(500) NULL
public string AcccionesInmediatas          {get; set;}           // varchar(350) NULL
public long IdContaminante                 {get; set;}           // bigint NULL
public int Volumen                         {get; set;}           // int NULL
public int UnidadVolumen                   {get; set;}           // int NULL
public int AreaImpactada                   {get; set;}           // int NULL
public long IdImpactoAmbiental             {get; set;}           // bigint NULL
public long xIdDescripcionEvento           {get; set;}           // bigint NULL
public int xImpactoAmbiental               {get; set;}           // int NULL
public int xReaccionPublica                {get; set;}           // int NULL
public int xRelacionComunidad              {get; set;}           // int NULL
public int xLegal                          {get; set;}           // int NULL
public int xCalificacion                   {get; set;}           // int NULL
public int xNivelSeveridad                 {get; set;}           // int NULL
public int xIIAUnidad                      {get; set;}           // int NULL
public int xIIACorporativo                 {get; set;}           // int NULL
public int xMetaCorporativa                {get; set;}           // int NULL
public int xIIAUnidadPesca                 {get; set;}           // int NULL
public int xIIACoporativoPesca             {get; set;}           // int NULL
public int xMetaPesac                      {get; set;}           // int NULL
public int xIIAOperaciones                 {get; set;}           // int NULL
public int xIIACoporativoOperaciones       {get; set;}           // int NULL
public int xMetaOperaciones                {get; set;}           // int NULL
public int xIIAdminFinanzas                {get; set;}           // int NULL
public int xIIACoporAdmiFinanzas           {get; set;}           // int NULL
public int xMetaAdminFinanazas             {get; set;}           // int NULL
public int yNumColaboradores               {get; set;}           // int NULL
public int yNumHora                        {get; set;}           // int NULL
public int yCostoMOS                       {get; set;}           // int NULL
public int yNumColaboradores2              {get; set;}           // int NULL
public int yNumHora2                       {get; set;}           // int NULL
public int yCostoMOS2                      {get; set;}           // int NULL
public int yCantProducto                   {get; set;}           // int NULL
public int yCostoProductoS                 {get; set;}           // int NULL
public int yCostoProductoS2                {get; set;}           // int NULL
public int ycostoMateriales                {get; set;}           // int NULL
public int yCostoServicioS                 {get; set;}           // int NULL
public int yCostoMultaS                    {get; set;}           // int NULL
public int yOtroS                          {get; set;}           // int NULL
public int yCostoTotalS                    {get; set;}           // int NULL
public int yCostoTotalUSD                  {get; set;}           // int NULL
public int yOefaUit                        {get; set;}           // int NULL
public int yOefaS                          {get; set;}           // int NULL
public int yOefaUSD                        {get; set;}          // int NULL
public int yDicapiUit                      {get; set;}           // int NULL
public int yDicapiS                        {get; set;}           // int NULL
public int yDicapiUSD                      {get; set;}           // int NULL
public long IdAccidenteIncidente           {get; set;}           // int NULL*/







































  public long Id                             { get; set; }                            
  public long Id1                            { get; set; }//*
  public long AccionBD                       { get; set; }//*

  public long IdTipoEvento                   {get; set;}    //bigint
  public string Fecha                        {get; set;}           // date NULL
  public string Hora                         {get; set;}           // time NULL
  public int ReporteExterno                  {get; set;}           // int NULL
  public long IdGerencia                     {get; set;}           // bigint NULL
  public long IdSede                         {get; set;}           // bigint NULL
  public long IdZonaUbicacion                {get; set;}           // bigint NULL
  public int HayPersonalAfectado             {get; set;}           // int NULL
  public string IdEmpresa                      {get; set;}           // bigint NULL
  public string Descripcion                  {get; set;}           // varchar(500) NULL
  public string AcccionesInmediatas          {get; set;}           // varchar(350) NULL
  public long IdContaminante                 {get; set;}           // bigint NULL
  public int Volumen                         {get; set;}           // int NULL
  public int UnidadVolumen                   {get; set;}           // int NULL
  public int AreaImpactada                   {get; set;}           // int NULL
  public long IdImpactoAmbiental             {get; set;}           // bigint NULL


  public long xIdDescripcionEvento           {get; set;}           // bigint NULL
  public int xImpactoAmbiental               {get; set;}           // int NULL
  public int xReaccionPublica                {get; set;}           // int NULL
  public int xRelacionComunidad              {get; set;}           // int NULL
  public int xLegal                          {get; set;}           // int NULL
  public int xCalificacion                   {get; set;}           // int NULL
  public string xNivelSeveridad              {get; set;}           // int NULL
  public float xIIAUnidad                      {get; set;}           // int NULL
  public float xIIACorporativo               {get; set;}           // int NULL
  public float xMetaCorporativa              {get; set;}           // int NULL
  public float xIIAUnidadPesca                 {get; set;}           // int NULL
  public float xIIACoporativoPesca           {get; set;}           // int NULL
  public float xMetaPesac                    {get; set;}           // int NULL
  public float xIIAOperaciones                 {get; set;}           // int NULL
  public float xIIACoporativoOperaciones     {get; set;}           // int NULL
  public float xMetaOperaciones              {get; set;}           // int NULL
  public float xIIAdminFinanzas                {get; set;}           // int NULL
  public float xIIACoporAdmiFinanzas         {get; set;}           // int NULL
  public float xMetaAdminFinanazas             {get; set;}           // int NULL




  public int yNumColaboradores               {get; set;}           // int NULL
  public int yNumHora                        {get; set;}           // int NULL
  public int yCostoMOS                       {get; set;}           // int NULL
  public int yNumColaboradores2              {get; set;}           // int NULL
  public int yNumHora2                       {get; set;}           // int NULL
  public float yCostoMOS2                    {get; set;}           // int NULL
  public int yCantProducto                   {get; set;}           // int NULL
  public float yCostoProductoS               {get; set;}           // int NULL
  public float yCostoProductoS2              {get; set;}           // float NULL
  public float ycostoMateriales              {get; set;}           // float NULL//                {get; set;}           // float NULL
  public float yCostoServicioS               {get; set;}           // float NULL
  public float yCostoMultaS                  {get; set;}           // float NULL
  public float yOtroS                        {get; set;}           // float NULL
  public float yCostoTotalS                  {get; set;}           // int NULL
  public float yCostoTotalUSD                {get; set;}           // int NULL
  public int yOefaUit                        {get; set;}           // int NULL
  public float yOefaS                        {get; set;}           // int NULL
  public float yOefaUSD                      {get; set;}          // int NULL
  public int yDicapiUit                      {get; set;}           // int NULL
  public float yDicapiS                      {get; set;}           // int NULL
  public float yDicapiUSD                    {get; set;}           // int NULL
  public long IdAccidenteIncidente           {get; set;}           // int NULL
  public long TemporadaVeda                  {get; set;}  //Potencial;*TemporadaVeda
  public int Finalizado                      {get; set;}           // int NULL

}

