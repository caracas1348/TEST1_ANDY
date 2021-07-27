/****************************************************************************************
* VISUAL SAT - [2021]
* PROYECTO : SIGTASA
* ESQUEMA : SSOMA
* SPRINT  : 4
* MODULO : GESTIÓN DE PLAN ANUAL
* OPERADORES_________________________________________________________________________
* | # | PROGRAMADOR     |  |      FECHA   |  |   HORA   |           CORREO           |
* | 1 | ssssss    |  |  14/03/2021  |  | 09:28:50 |    dddddd@gmail.com   |
* |___|_________________|__|______________|__|__________|____________________________|
*
* DESCRIPCION: ARCHIVO SQL BACKEND DE FUNCIONALIDAD EN SERVIDOR QUE OBTIENE EL LISTADO DE INCIDENTES CREADOS EN LA APP
*
* ARCHIVOS DE FRONT       ____________________________________
* | # |     MODULO             |  |         NOMBRE            |
* | 1 |  ssss           |  |  sssss   |
* |___________________________________________________________|
*
* VERSION: 0.1 Beta
*******************************************************************************************/

// using System;
// using System.Net;
// using System.Data;
// using System.Data.SqlClient;
// using System.Collections;
// using System.Collections.Generic;
// using System.Collections.ObjectModel;
// using System.Dynamic;
// using System.Linq;

// class DataPlanAnualGetAll       
// {
//     string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);

//     public async Task<DataPlanAnual> funGetPlanAnualAllList( ILogger log, long UnidadNegocioId)
//     {
        
//         DataPlanAnual DataPlanAnual = new DataPlanAnual();//ya

//         //Listado de objetos de Plan Anual
//         //List<PlanAnualGet> lobjs  = new List<PlanAnualGet>();//ya


//         //Listado de objetos de Programas
//         List<Eventos> Eventos  = new List<Eventos>();// Incidentes

//          //Objeto de los objetivos del PlanAnual
//         Objetivo curobj1;//##########################NO POR AHORA**
        
//         // //Listado de objetos de Sedes
//         // List<Sedes> Sedes  = new List<Sedes>();


//         // //Listado de objetos de Gerencias
//         // List<Embarcaciones> Embarcaciones  = new List<Embarcaciones>();//Embarcacion

        
//         // //Listado de objetos de StatusPlanAnual
//         // List<Areas> Areas  = new List<Areas>();//Area

//         //  //Listado de objetos de StatusPlanAnual
//         // List<Zonas> Zonas  = new List<Zonas>();//Zona


//         log.LogInformation("en la funcion funGetPlanAnualAllList "+vvsqlconnectionString);
//         //SQL Objects
//         try
//         {
//             log.LogInformation("try");
//             using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
//             {
//                 log.LogInformation("using");
//                 conn.Open();// abrimos la conexion a la base de datos
//                 log.LogInformation(" abrimos la conexion a la base de datos");

//                 SqlCommand cmd = new SqlCommand("[ssoma].[a_get_listado_incidente_app]", conn);//Nombre del procedimeinto almacenado

//                 log.LogInformation("Ejecutamos procedimeinto almacenado");
//                // cmd.Parameters.AddWithValue("@Id", Id);
//                 cmd.Parameters.AddWithValue("@UnidadNegocioId", UnidadNegocioId);

//                 cmd.CommandType = CommandType.StoredProcedure;
//                 log.LogInformation("Ejecutamos CommandType");
//                 //Ejecutar Comando buscaremos los Planes Anuales registrados
//                 using (SqlDataReader dataReader = await cmd.ExecuteReaderAsync())
//                 {
               
//                    log.LogInformation("Entramos a ejecutar la consulta using (SqlDataReader dataReader = await cmd.ExecuteReaderAsync())");

//                     while (dataReader.Read())//Evento
//                     {
//                         log.LogInformation(" while (dataReader.Read())//Evento ");
//                         Eventos curobjP = new Eventos();

//                         log.LogInformation("Eventos curobjP = new Eventos();");

//                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjP.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
//                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code"))) { curobjP.Code = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code"))); }
                         
//                           log.LogInformation("Cargo los Datos");
                        
//                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdTipoEvento"))) { curobjP.IdTipoEvento = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdTipoEvento"))); }//

//                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("Tipo_Evento"))) { curobjP.Tipo_Evento = (string)(dataReader.GetValue(dataReader.GetOrdinal("Tipo_Evento"))); }//

//                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdSede"))) { curobjP.IdSede = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdSede"))); }//

//                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("Sede"))) { curobjP.Sede = (string)(dataReader.GetValue(dataReader.GetOrdinal("Sede"))); }//

//                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdZona"))) { curobjP.IdZona = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdZona"))); }//

//                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("Zona"))) { curobjP.Zona = (string)(dataReader.GetValue(dataReader.GetOrdinal("Zona"))); }//

//                          log.LogInformation("Cargo los Datos 2....");

//                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("Fecha"))) { curobjP.Fecha = (string)(dataReader.GetValue(dataReader.GetOrdinal("Fecha"))); }//*
//                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("Hora"))) { curobjP.Hora = (string)(dataReader.GetValue(dataReader.GetOrdinal("Hora"))); }//*



//                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdEstadoIncidente"))) { curobjP.IdEstadoIncidente = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdEstadoIncidente"))); }//
//                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("Estado_Incidente"))) { curobjP.Estado_Incidente = (string)(dataReader.GetValue(dataReader.GetOrdinal("Estado_Incidente"))); }//


//                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("Color"))) { curobjP.Color = (string)(dataReader.GetValue(dataReader.GetOrdinal("Color"))); }//



//                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("HayPersonalAfectado"))) { curobjP.HayPersonalAfectado = (int)(dataReader.GetValue(dataReader.GetOrdinal("HayPersonalAfectado")));}//**
                        
//                         log.LogInformation("Cargo los Datos 3....");

//                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdEmbarcacion"))) { curobjP.IdEmbarcacion = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdEmbarcacion"))); }//
//                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("Embarcacion"))) { curobjP.Embarcacion = (string)(dataReader.GetValue(dataReader.GetOrdinal("Embarcacion"))); }//

//                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdArea"))) { curobjP.IdArea = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdArea"))); }//
//                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("Area"))) { curobjP.Area = (string)(dataReader.GetValue(dataReader.GetOrdinal("Area"))); }//
                        
//                          log.LogInformation("Cargo los Datos 4....");

//                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("NombreEmpresa"))) { curobjP.NombreEmpresa = (string)(dataReader.GetValue(dataReader.GetOrdinal("NombreEmpresa"))); }//
//                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("DescripcionEvento"))) { curobjP.DescripcionEvento = (string)(dataReader.GetValue(dataReader.GetOrdinal("DescripcionEvento"))); }//

//                         // if (!dataReader.IsDBNull(dataReader.GetOrdinal("IdFoto"))) { curobjP.IdFoto = (long)(dataReader.GetValue(dataReader.GetOrdinal("IdFoto"))); }//
//                         // if (!dataReader.IsDBNull(dataReader.GetOrdinal("Nombre_Foto"))) { curobjP.Nombre_Foto = (string)(dataReader.GetValue(dataReader.GetOrdinal("Nombre_Foto"))); }//
//                         // if (!dataReader.IsDBNull(dataReader.GetOrdinal("Evidencia_Foto"))) { curobjP.Evidencia_Foto = (string)(dataReader.GetValue(dataReader.GetOrdinal("Evidencia_Foto"))); }//
                        
//                          log.LogInformation("Cargo los Datos 5....");

//                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("A_NombrePersonalAccidentado"))) { curobjP.A_NombrePersonalAccidentado = (string)(dataReader.GetValue(dataReader.GetOrdinal("A_NombrePersonalAccidentado"))); }//
//                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("A_DniPersonalAccidentado"))) { curobjP.A_DniPersonalAccidentado = (string)(dataReader.GetValue(dataReader.GetOrdinal("A_DniPersonalAccidentado"))); }//ya
//                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("A_IdPersonalAccidentado"))) { curobjP.A_IdPersonalAccidentado = (string)(dataReader.GetValue(dataReader.GetOrdinal("A_IdPersonalAccidentado"))); }//
//                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("A_PuestoCargoAccidentado"))) { curobjP.A_PuestoCargoAccidentado = (string)(dataReader.GetValue(dataReader.GetOrdinal("A_PuestoCargoAccidentado"))); }//
//                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("A_NombreJefeAccidentado"))) { curobjP.A_NombreJefeAccidentado = (string)(dataReader.GetValue(dataReader.GetOrdinal("A_NombreJefeAccidentado"))); }//
//                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("A_IdJefeAccidentado"))) { curobjP.A_IdJefeAccidentado = (string)(dataReader.GetValue(dataReader.GetOrdinal("A_IdJefeAccidentado"))); }///
                         
//                           log.LogInformation("Cargo los Datos 6....");


//                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("B_TipoProducto"))) { curobjP.B_TipoProducto = (string)(dataReader.GetValue(dataReader.GetOrdinal("B_TipoProducto"))); }//
//                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("B_ProductoInvolucrado"))) { curobjP.B_ProductoInvolucrado = (string)(dataReader.GetValue(dataReader.GetOrdinal("B_ProductoInvolucrado"))); }
//                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("B_Volumen"))) { curobjP.B_Volumen = (string)(dataReader.GetValue(dataReader.GetOrdinal("B_Volumen"))); }
//                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("B_Area"))) { curobjP.B_Area = (string)(dataReader.GetValue(dataReader.GetOrdinal("B_Area"))); }
//                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("B_Fuente"))) { curobjP.B_Fuente = (string)(dataReader.GetValue(dataReader.GetOrdinal("B_Fuente"))); }
//                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("B_NombreJefeInmediato"))) { curobjP.B_NombreJefeInmediato = (string)(dataReader.GetValue(dataReader.GetOrdinal("B_NombreJefeInmediato"))); }

//                            log.LogInformation("Cargo los Datos 7....");

//                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("B_IdJefeInmediato"))) { curobjP.B_IdJefeInmediato = (string)(dataReader.GetValue(dataReader.GetOrdinal("B_IdJefeInmediato"))); }
//                         if (!dataReader.IsDBNull(dataReader.GetOrdinal("C_Hurt"))) { curobjP.C_Hurt = (string)(dataReader.GetValue(dataReader.GetOrdinal("C_Hurt"))); }
                        
//                          log.LogInformation("Cargo los Datos   8.................");


//                          //####################################################################################################################################################
//                                             //Listado de objetos de StatusPlanAnual
//                                             List<Objetivo> lcurobj1  = new List<Objetivo>();//ya *****************

//                                             /*
//                                             using (SqlConnection conn1 = new SqlConnection(vvsqlconnectionString))
//                                             {
//                                                 log.LogInformation("using");
//                                                 conn1.Open();       
//                                                 log.LogInformation("open 2");
                                                
//                                                 SqlCommand cmd1 = new SqlCommand("[ssoma].[a_get_evidencia_incidente_foto_all]", conn1);
//                                                 cmd1.Parameters.AddWithValue("@IdIncidente", curobjP.Id);
//                                                 cmd1.CommandType = CommandType.StoredProcedure;
//                                                 using (SqlDataReader dr = await cmd1.ExecuteReaderAsync())
//                                                     {
//                                                         log.LogInformation("SqlDataReader dr -------------------xxxx)");
//                                                         while (dr.Read())
//                                                         {
//                                                             curobj1 = new Objetivo();
                                                            
//                                                             if (!dr.IsDBNull(dr.GetOrdinal("Id"))) { curobj1.Id = (long)(dr.GetValue(dr.GetOrdinal("Id"))); }
//                                                             if (!dr.IsDBNull(dr.GetOrdinal("Nombre_Foto"))) { curobj1.Nombre_Foto = (string)(dr.GetValue(dr.GetOrdinal("Nombre_Foto"))); }
//                                                             if (!dr.IsDBNull(dr.GetOrdinal("EvidenciaFile"))) { curobj1.EvidenciaFile = (string)(dr.GetValue(dr.GetOrdinal("EvidenciaFile"))); }

//                                                              //log.LogInformation("=================================== Id"+curobj1.Id);
//                                                              //log.LogInformation("=================================== Id"+curobj1.Nombre_Foto);
//                                                              //log.LogInformation("=================================== Id"+curobj1.EvidenciaFile);
//                                                              lcurobj1.Add(curobj1);  
//                                                         }
                                                   
//                                                     }

//                                                 //conn1.Close();

//                                             }
//                                              */

//                            //####################################################################################################################################################
                         





//                         curobjP.Evidencias = lcurobj1; 



//                         Eventos.Add(curobjP);
//                         log.LogInformation("Eventos.Add(curobjP);");
//                     }
//                     DataPlanAnual.Eventos = Eventos;
//                     log.LogInformation("DataPlanAnual.Eventos");

//                     //--------------------------------------------YA Eventos -------------------


//                 //    //--------------------------------------------YA Sedes -------------------
//                 //     dataReader.NextResult();
//                 //     while (dataReader.Read())//Embarcacion
//                 //     {
//                 //         Sedes curobjS = new Sedes();
//                 //         if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjS.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
//                 //         if (!dataReader.IsDBNull(dataReader.GetOrdinal("Sede"))) { curobjS.Sede = (string)(dataReader.GetValue(dataReader.GetOrdinal("Sede"))); }

//                 //         Sedes.Add(curobjS);
//                 //     }
//                 //     DataPlanAnual.Sedes = Sedes;
//                 //     log.LogInformation("DataPlanAnual.Sedes");
//                 //      //--------------------------------------------YA Sedes -------------------




//                 //      //--------------------------------------------YA  -------------------
//                 //     dataReader.NextResult();

//                 //     while (dataReader.Read())//Sede
//                 //     {
//                 //         Embarcaciones curobjG = new Embarcaciones();
//                 //         if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjG.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
//                 //         if (!dataReader.IsDBNull(dataReader.GetOrdinal("Embarcacion"))) { curobjG.Embarcacion = (string)(dataReader.GetValue(dataReader.GetOrdinal("Embarcacion"))); }

//                 //         Embarcaciones.Add(curobjG);
//                 //     }
//                 //     DataPlanAnual.Embarcaciones = Embarcaciones;
//                 //     log.LogInformation("DataPlanAnual.Embarcaciones");

//                 //     //--------------------------------------------YA Gerencias -------------------




                 

//                 //       //--------------------------------------------YA Areas -------------------
//                 //     dataReader.NextResult();
//                 //     while (dataReader.Read())//Area
//                 //     {
//                 //         Areas curobjEPL = new Areas();
//                 //         if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjEPL.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
//                 //         if (!dataReader.IsDBNull(dataReader.GetOrdinal("Area"))) { curobjEPL.Area = (string)(dataReader.GetValue(dataReader.GetOrdinal("Area"))); }
                        

//                 //         Areas.Add(curobjEPL);
//                 //     }
//                 //     DataPlanAnual.Areas = Areas;
//                 //     log.LogInformation("DataPlanAnual.Areas");
//                 //      //--------------------------------------------YA Areas -------------------




//                 //     //--------------------------------------------YA Zonas -------------------
//                 //     dataReader.NextResult();
//                 //     while (dataReader.Read())//Zona
//                 //     {
//                 //         Zonas curobjEq = new Zonas();
//                 //         if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobjEq.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
//                 //         if (!dataReader.IsDBNull(dataReader.GetOrdinal("Zona"))) { curobjEq.Zona = (string)(dataReader.GetValue(dataReader.GetOrdinal("Zona"))); }
                       

//                 //         Zonas.Add(curobjEq);
//                 //     }
//                 //     DataPlanAnual.Zonas = Zonas;
//                 //     log.LogInformation("DataPlanAnual.Zonas");
//                 //      //--------------------------------------------YA Zonas -------------------










//                 }

//                 if (conn.State == System.Data.ConnectionState.Open)
//                     conn.Close();
//             }
//         }
//         catch (Exception ex)
//         {
//             //lobjs  = new List<PlanAnualGet>();
//             //curobj = new PlanAnualGet();
//             //curobj.Id = 0;
//             //curobj.Code = System.Convert.ToString(ex.Message);
//             //lobjs.Add(curobj);
//            //DataPlanAnual.PlanAnual = System.Convert.ToString(ex.Message);

//         }

//         return DataPlanAnual;
//     }




//     //==================================OTRA FUNCION ==========================================

  



    
// }








// public class DataPlanAnual
// {
//   //public List<PlanAnualGet> PlanAnual {get; set;}
//   public List<Eventos> Eventos {get; set;}
// //   public List<Sedes> Sedes {get; set;}
// //   public List<Embarcaciones> Embarcaciones {get; set;}
// //   public List<Areas> Areas {get; set;}
// //   public List<Zonas> Zonas {get; set;}

// }



// //-------------------------- ya andy Eventos ---------------
// public class Eventos
// {
//     public long Id {get;set;}
//     public string Code {get;set;}
// 	public long IdTipoEvento {get;set;}
// 	public string Tipo_Evento {get;set;}
// 	public long IdSede {get;set;}
// 	public string Sede {get;set;}
// 	public long IdZona {get;set;}
// 	public string Zona {get;set;}
//     public string Fecha {get;set;}
//     public string Hora {get;set;}
// 	public long IdEstadoIncidente {get;set;}
// 	public string Estado_Incidente {get;set;}
// 	public string Color {get;set;}
//     public int HayPersonalAfectado {get;set;} // 0 tasa 1 tercero
// 	public long IdEmbarcacion {get;set;}
// 	public string Embarcacion {get;set;}
// 	public long IdArea {get;set;}
// 	public string Area {get;set;}
// 	public string NombreEmpresa {get;set;}
// 	public string DescripcionEvento {get;set;}
							
// 	// // fotos de evidencia
// 	// public long IdFoto {get;set;}
// 	// public string Nombre_Foto {get;set;}
// 	// public string Evidencia_Foto {get;set;} 
							
// 	public string A_NombrePersonalAccidentado {get;set;}
//     public string A_DniPersonalAccidentado {get;set;}
// 	public string A_IdPersonalAccidentado {get;set;}
// 	public string A_PuestoCargoAccidentado {get;set;}
// 	public string A_NombreJefeAccidentado {get;set;}
// 	public string A_IdJefeAccidentado {get;set;}
						   
							 
// 	// tipo de accidente ambiental
// 	public string B_TipoProducto {get;set;}
// 	public string B_ProductoInvolucrado {get;set;}
// 	public string B_Volumen {get;set;}
// 	public string B_Area {get;set;}
// 	public string B_Fuente {get;set;}
// 	public string B_NombreJefeInmediato {get;set;}
// 	public string B_IdJefeInmediato {get;set;}
						 
// 	//Daños materiales
// 	public string C_Hurt {get;set;} //daño

//     public List<Objetivo> Evidencias                {get; set;} //fotos
    
// }
// //-------------------------- ya andy Eventos ---------------

// public class Objetivo    // -----Por ahora no
// {
//     public long     Id                     { get; set; }
//     public string   Nombre_Foto            { get; set; }
//     public string   EvidenciaFile          { get; set; }
// }


// // //-------------------------- ya andy  Sedes ---------------
// // public class Sedes
// // {
// //     public long Id {get;set;}
// //     public string Sede {get;set;}
// // }
// // //-------------------------- ya andy  Sedes ---------------




// // //-------------------------- ya andy  Embarcaciones ---------------
// // public class Embarcaciones
// // {
// //     public long Id {get;set;}
// //     public string Embarcacion {get;set;}
// // }
// // //-------------------------- ya andy Embarcaciones  ---------------



// // //-------------------------- ya andy  Areas ---------------
// // public class Areas
// // {
// //     public long Id {get;set;}
// //     public string Area {get;set;}
// // }
// // //-------------------------- ya andy Areas  ---------------


// // //-------------------------- ya andy  Zonas ---------------
// // public class Zonas
// // {
// //     public long Id {get;set;}
// //     public string Zona {get;set;}
// // }
// // //-------------------------- ya andy Zonas  ---------------



