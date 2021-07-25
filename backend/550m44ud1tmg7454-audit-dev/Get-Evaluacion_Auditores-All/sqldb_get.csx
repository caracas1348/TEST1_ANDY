using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataEvaluacionAuditoresAll
{
    string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
    
    public async Task<dataAll> funGetEvaluacionAuditoresAllList(ILogger log        
                                                              , long RolId
                                                              , long StatusEvaluacionId
                                                              , string Auditor
                                                              , string FechaInicio
                                                              , string FechaFin
                                                              , int Nota
                                                              )
    {
        //Lista de Objetos
        dataAll dataAll = new dataAll();
        //Listado de Evaluacion de Auditores
        List<evaluacionAuditoresAll> lobjs = new List<evaluacionAuditoresAll>();
        evaluacionAuditoresAll curobj;
        //Listado de Tipos de Auditores para el filtro
        List<tipoAuditor> lobjs2 = new List<tipoAuditor>();
        tipoAuditor curobj2;
        //Listado de StatusEvaluacion de Auditores para el filtro
        List<statusEvaluacionAuditores> lobjs3 = new List<statusEvaluacionAuditores>();
        statusEvaluacionAuditores curobj3;
        //Grupo de Preguntas
        DataGrupoPreguntasAll dataGrupoPreguntasAll = new DataGrupoPreguntasAll();
        List<grupoPreguntas> lobj4 = new List<grupoPreguntas>();
        grupoPreguntas curobj4;
        //Escala de Notas
        List<escalaNotas> lobjs5 = new List<escalaNotas>();
        escalaNotas curobj5;

        //SQL Objects
        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();

                SqlCommand cmd = new SqlCommand("[auditoria].[get_evaluacion_auditores]", conn);
                cmd.Parameters.AddWithValue("@RolId", RolId);
                cmd.Parameters.AddWithValue("@StatusEvaluacionId", StatusEvaluacionId);
                cmd.Parameters.AddWithValue("@Auditor", Auditor);
                cmd.Parameters.AddWithValue("@FechaInicio", FechaInicio);
                cmd.Parameters.AddWithValue("@FechaFin", FechaFin);
                cmd.Parameters.AddWithValue("@EvaluacionAuditoresId", 0);
                cmd.Parameters.AddWithValue("@Nota", Nota);

                cmd.CommandType = CommandType.StoredProcedure;
                //Ejecutar Comando
                using (SqlDataReader dataReader = await cmd.ExecuteReaderAsync())
                {
                    //Navegar en el Conjunto de Datos Recuperados
                    while (dataReader.Read())
                    {
                        curobj = new evaluacionAuditoresAll();

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobj.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("AuditoriaId"))) { curobj.AuditoriaId = (long)(dataReader.GetValue(dataReader.GetOrdinal("AuditoriaId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("AuditorId"))) { curobj.AuditorId = (long)(dataReader.GetValue(dataReader.GetOrdinal("AuditorId"))); }
                        //if (!dataReader.IsDBNull(dataReader.GetOrdinal("HashEvaluacionTokens"))) { curobj.HashEvaluacionTokens = (string)(dataReader.GetValue(dataReader.GetOrdinal("HashEvaluacionTokens"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("StatusEvaluacionId"))) { curobj.StatusEvaluacionId = (long)(dataReader.GetValue(dataReader.GetOrdinal("StatusEvaluacionId"))); }
                        //if (!dataReader.IsDBNull(dataReader.GetOrdinal("EvaluacionDate"))) { curobj.EvaluacionDate = (DateTime)(dataReader.GetValue(dataReader.GetOrdinal("EvaluacionDate"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Comentario"))) { curobj.Comentario = (string)(dataReader.GetValue(dataReader.GetOrdinal("Comentario"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Evaluador"))) { curobj.Evaluador = (string)(dataReader.GetValue(dataReader.GetOrdinal("Evaluador"))); }
                        //if (!dataReader.IsDBNull(dataReader.GetOrdinal("UserIdhash"))) { curobj.UserIdhash = (string)(dataReader.GetValue(dataReader.GetOrdinal("UserIdhash"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Cargo"))) { curobj.Cargo = (string)(dataReader.GetValue(dataReader.GetOrdinal("Cargo"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Correo"))) { curobj.Correo = (string)(dataReader.GetValue(dataReader.GetOrdinal("Correo"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("NecesitaRefuerzo"))) { curobj.NecesitaRefuerzo = (int)(dataReader.GetValue(dataReader.GetOrdinal("NecesitaRefuerzo"))); }
                        //if (!dataReader.IsDBNull(dataReader.GetOrdinal("Create_By"))) { curobj.Create_By = (string)(dataReader.GetValue(dataReader.GetOrdinal("Create_By"))); }
                        //if (!dataReader.IsDBNull(dataReader.GetOrdinal("Create_Date"))) { curobj.Create_Date = (DateTime)(dataReader.GetValue(dataReader.GetOrdinal("Create_Date"))); }
                        //if (!dataReader.IsDBNull(dataReader.GetOrdinal("Last_Updated_By"))) { curobj.Last_Updated_By = (string)(dataReader.GetValue(dataReader.GetOrdinal("Last_Updated_By"))); }
                        //if (!dataReader.IsDBNull(dataReader.GetOrdinal("Last_Updated_Date"))) { curobj.Last_Updated_Date = (DateTime)(dataReader.GetValue(dataReader.GetOrdinal("Last_Updated_Date"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code_Evaluacion"))) { curobj.Code_Evaluacion = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code_Evaluacion"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("NormaId"))) { curobj.NormaId = (long)(dataReader.GetValue(dataReader.GetOrdinal("NormaId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Nombre"))) { curobj.Nombre = (string)(dataReader.GetValue(dataReader.GetOrdinal("Nombre"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Sede"))) { curobj.Sede = (string)(dataReader.GetValue(dataReader.GetOrdinal("Sede"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("UnidadNegocio"))) { curobj.UnidadNegocio = (string)(dataReader.GetValue(dataReader.GetOrdinal("UnidadNegocio"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Rol"))) { curobj.Rol = (string)(dataReader.GetValue(dataReader.GetOrdinal("Rol"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Norma"))) { curobj.Norma = (string)(dataReader.GetValue(dataReader.GetOrdinal("Norma"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("TipoAuditoria"))) { curobj.TipoAuditoria = (string)(dataReader.GetValue(dataReader.GetOrdinal("TipoAuditoria"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("FechaAuditoria"))) { curobj.FechaAuditoria = (string)(dataReader.GetValue(dataReader.GetOrdinal("FechaAuditoria"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("FechaEvaluacion"))) { curobj.FechaEvaluacion = (string)(dataReader.GetValue(dataReader.GetOrdinal("FechaEvaluacion"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("DescriptionEvaluacion"))) { curobj.DescriptionEvaluacion = (string)(dataReader.GetValue(dataReader.GetOrdinal("DescriptionEvaluacion"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Inicio"))) { curobj.Inicio = (DateTime)(dataReader.GetValue(dataReader.GetOrdinal("Inicio"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code"))) { curobj.Code = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("TipoAuditorId"))) { curobj.TipoAuditorId = (int)(dataReader.GetValue(dataReader.GetOrdinal("TipoAuditorId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Nota"))) { curobj.Nota = (int)(dataReader.GetValue(dataReader.GetOrdinal("Nota"))); }

                        //////
                        if (curobj.Nota>0)
                        {
                            using (SqlConnection conn2 = new SqlConnection(vvsqlconnectionString))
                            {
                                conn2.Open();
                                SqlCommand cmd2 = new SqlCommand("[auditoria].[get_evaluacion_auditores_avg]", conn2);
                                cmd2.Parameters.AddWithValue("@AuditoriaId", curobj.AuditoriaId);
                                cmd2.Parameters.AddWithValue("@AuditorId", curobj.AuditorId);
                                cmd2.CommandType = CommandType.StoredProcedure;
                                //Ejecutar Comando
                                using (SqlDataReader dataReader2 = await cmd2.ExecuteReaderAsync())
                                {
                                    
                                    //Navegar en el Conjunto de Datos Recuperados
                                    while (dataReader2.Read())
                                    {
                                        int Total = 0;
                                        int Cantidad = 0;
                                        
                                        if (!dataReader2.IsDBNull(dataReader2.GetOrdinal("Total"))) { Total = (int)(dataReader2.GetValue(dataReader2.GetOrdinal("Total"))); }
                                        if (!dataReader2.IsDBNull(dataReader2.GetOrdinal("Cantidad"))) { Cantidad = (int)(dataReader2.GetValue(dataReader2.GetOrdinal("Cantidad"))); }
                                        curobj.Promedio = (float)Total / Cantidad;
                                    }
                                }
                                if (conn2.State == System.Data.ConnectionState.Open)
                                    conn2.Close();
                            }
                        }
                        //////

                        lobj4 = await dataGrupoPreguntasAll.funGetGrupoPreguntasAllList(log, curobj.Id);

                        curobj.GrupoPreguntas = lobj4;

                        lobjs.Add(curobj);
                    }
                    dataAll.evaluacionAuditoresAll = lobjs;

                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        curobj2 = new tipoAuditor();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobj2.Id = (int)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Description"))) { curobj2.Description = (string)(dataReader.GetValue(dataReader.GetOrdinal("Description"))); }
                        lobjs2.Add(curobj2);
                        
                    }
                    dataAll.tipoAuditorAll = lobjs2;

                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        curobj3 = new statusEvaluacionAuditores();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobj3.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Description"))) { curobj3.Description = (string)(dataReader.GetValue(dataReader.GetOrdinal("Description"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code"))) { curobj3.Code = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code"))); }

                        lobjs3.Add(curobj3);

                    }
                    dataAll.statusEvaluacionAuditoresAll = lobjs3;

                    dataReader.NextResult();
                    while (dataReader.Read())
                    {
                        curobj5 = new escalaNotas();
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobj5.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Description"))) { curobj5.Description = (string)(dataReader.GetValue(dataReader.GetOrdinal("Description"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Valor"))) { curobj5.Valor = (int)(dataReader.GetValue(dataReader.GetOrdinal("Valor"))); }

                        lobjs5.Add(curobj5);

                    }
                    dataAll.escalaNotasAll = lobjs5;
                }
                if (conn.State == System.Data.ConnectionState.Open)
                    conn.Close();
            }
        }
        catch (Exception ex)
        {
            lobjs = new List<evaluacionAuditoresAll>();
            curobj = new evaluacionAuditoresAll();
            curobj.Id = 0;
            curobj.Comentario = System.Convert.ToString(ex.Message);
            lobjs.Add(curobj);
            dataAll.evaluacionAuditoresAll = lobjs;

        }

        return dataAll;
    }

    //Consultar una Evaluacion de Auditor por su Id
    public async Task<evaluacionAuditoresAll> funGetEvaluacionAuditor(ILogger log
                                                             , long EvaluacionAuditoresId
                                                             )
    {
        //Lista de Objetos
        evaluacionAuditoresAll curobj = new evaluacionAuditoresAll();

        //SQL Objects
        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();

                SqlCommand cmd = new SqlCommand("[auditoria].[get_evaluacion_auditores]", conn);
                cmd.Parameters.AddWithValue("@RolId", 0);
                cmd.Parameters.AddWithValue("@StatusEvaluacionId", 0);
                cmd.Parameters.AddWithValue("@Auditor", "");
                cmd.Parameters.AddWithValue("@FechaInicio", "");
                cmd.Parameters.AddWithValue("@FechaFin", "");
                cmd.Parameters.AddWithValue("@EvaluacionAuditoresId", EvaluacionAuditoresId);
                cmd.Parameters.AddWithValue("@Nota", 0);


                cmd.CommandType = CommandType.StoredProcedure;
                //Ejecutar Comando
                using (SqlDataReader dataReader = await cmd.ExecuteReaderAsync())
                {
                    //Navegar en el Conjunto de Datos Recuperados
                    while (dataReader.Read())
                    {
                        curobj = new evaluacionAuditoresAll();

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { curobj.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("AuditoriaId"))) { curobj.AuditoriaId = (long)(dataReader.GetValue(dataReader.GetOrdinal("AuditoriaId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("AuditorId"))) { curobj.AuditorId = (long)(dataReader.GetValue(dataReader.GetOrdinal("AuditorId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("HashEvaluacionTokens"))) { curobj.HashEvaluacionTokens = (string)(dataReader.GetValue(dataReader.GetOrdinal("HashEvaluacionTokens"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("StatusEvaluacionId"))) { curobj.StatusEvaluacionId = (long)(dataReader.GetValue(dataReader.GetOrdinal("StatusEvaluacionId"))); }
                        //if (!dataReader.IsDBNull(dataReader.GetOrdinal("EvaluacionDate"))) { curobj.EvaluacionDate = (DateTime)(dataReader.GetValue(dataReader.GetOrdinal("EvaluacionDate"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Comentario"))) { curobj.Comentario = (string)(dataReader.GetValue(dataReader.GetOrdinal("Comentario"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Evaluador"))) { curobj.Evaluador = (string)(dataReader.GetValue(dataReader.GetOrdinal("Evaluador"))); }
                        //if (!dataReader.IsDBNull(dataReader.GetOrdinal("UserIdhash"))) { curobj.UserIdhash = (string)(dataReader.GetValue(dataReader.GetOrdinal("UserIdhash"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Cargo"))) { curobj.Cargo = (string)(dataReader.GetValue(dataReader.GetOrdinal("Cargo"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Correo"))) { curobj.Correo = (string)(dataReader.GetValue(dataReader.GetOrdinal("Correo"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("NecesitaRefuerzo"))) { curobj.NecesitaRefuerzo = (int)(dataReader.GetValue(dataReader.GetOrdinal("NecesitaRefuerzo"))); }
                        //if (!dataReader.IsDBNull(dataReader.GetOrdinal("Create_By"))) { curobj.Create_By = (string)(dataReader.GetValue(dataReader.GetOrdinal("Create_By"))); }
                        //if (!dataReader.IsDBNull(dataReader.GetOrdinal("Create_Date"))) { curobj.Create_Date = (DateTime)(dataReader.GetValue(dataReader.GetOrdinal("Create_Date"))); }
                        //if (!dataReader.IsDBNull(dataReader.GetOrdinal("Last_Updated_By"))) { curobj.Last_Updated_By = (string)(dataReader.GetValue(dataReader.GetOrdinal("Last_Updated_By"))); }
                        //if (!dataReader.IsDBNull(dataReader.GetOrdinal("Last_Updated_Date"))) { curobj.Last_Updated_Date = (DateTime)(dataReader.GetValue(dataReader.GetOrdinal("Last_Updated_Date"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code_Evaluacion"))) { curobj.Code_Evaluacion = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code_Evaluacion"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("NormaId"))) { curobj.NormaId = (long)(dataReader.GetValue(dataReader.GetOrdinal("NormaId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Nombre"))) { curobj.Nombre = (string)(dataReader.GetValue(dataReader.GetOrdinal("Nombre"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Sede"))) { curobj.Sede = (string)(dataReader.GetValue(dataReader.GetOrdinal("Sede"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("UnidadNegocio"))) { curobj.UnidadNegocio = (string)(dataReader.GetValue(dataReader.GetOrdinal("UnidadNegocio"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Rol"))) { curobj.Rol = (string)(dataReader.GetValue(dataReader.GetOrdinal("Rol"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Norma"))) { curobj.Norma = (string)(dataReader.GetValue(dataReader.GetOrdinal("Norma"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("TipoAuditoria"))) { curobj.TipoAuditoria = (string)(dataReader.GetValue(dataReader.GetOrdinal("TipoAuditoria"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("FechaAuditoria"))) { curobj.FechaAuditoria = (string)(dataReader.GetValue(dataReader.GetOrdinal("FechaAuditoria"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("DescriptionEvaluacion"))) { curobj.DescriptionEvaluacion = (string)(dataReader.GetValue(dataReader.GetOrdinal("DescriptionEvaluacion"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Inicio"))) { curobj.Inicio = (DateTime)(dataReader.GetValue(dataReader.GetOrdinal("Inicio"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code"))) { curobj.Code = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("TipoAuditorId"))) { curobj.TipoAuditorId = (int)(dataReader.GetValue(dataReader.GetOrdinal("TipoAuditorId"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Nota"))) { curobj.Nota = (int)(dataReader.GetValue(dataReader.GetOrdinal("Nota"))); }

                    }
                    
                }
                if (conn.State == System.Data.ConnectionState.Open)
                    conn.Close();

            }
        }
        catch (Exception ex)
        {
            curobj = new evaluacionAuditoresAll();
            curobj.Id = 0;
            curobj.Comentario = System.Convert.ToString(ex.Message);
        }

        return curobj;

    }

}


public class dataAll
{
    public List<evaluacionAuditoresAll> evaluacionAuditoresAll { get; set; }
    public List<tipoAuditor> tipoAuditorAll { get; set; }
    public List<statusEvaluacionAuditores> statusEvaluacionAuditoresAll { get; set; }
    public List<escalaNotas> escalaNotasAll { get; set; }
}
public class dataForm 
{
    public long EvaluacionAuditoresId { get; set; }
    public string HashEvaluacionTokens {get; set;}
    public evaluacionAuditoresAll EvaluacionAuditores { get; set; }
    public List<grupoPreguntas> GrupoPreguntas { get; set; }
    public List<escalaNotas> escalaNotasAll { get; set; }
}

public class evaluacionAuditoresAll
{
    public long Id { get; set; }
    public long AuditoriaId { get; set; }
    public long AuditorId { get; set; }
    public string HashEvaluacionTokens {get; set;}
    public long StatusEvaluacionId { get; set; }
    //public DateTime EvaluacionDate {get; set;}
    public string Comentario { get; set; }
    public string Evaluador { get; set; }
    //public string UserIdhash {get; set;}
    public string Cargo { get; set; }
    public string Correo { get; set; }
    public int NecesitaRefuerzo { get; set; }
    //public string Create_By {get; set;}
    //public DateTime Create_Date {get; set;}
    //public string Last_Updated_By {get; set;}
    //public DateTime Last_Updated_Date {get; set;}
    public string Code_Evaluacion { get; set; }
    public long NormaId { get; set; }
    public string Nombre { get; set; }
    public string Sede { get; set; }
    public string UnidadNegocio { get; set; }
    public string Rol { get; set; }
    public string Norma { get; set; }
    public string TipoAuditoria { get; set; }
    public string FechaAuditoria { get; set; }
    public string FechaEvaluacion { get; set; }
    public string DescriptionEvaluacion { get; set; }
    public DateTime Inicio { get; set; }
    public string Code { get; set; }
    public int TipoAuditorId { get; set; }
    public int Nota { get; set; }
    public float Promedio { get; set; }

    public List<grupoPreguntas> GrupoPreguntas { get; set; }
}

public class tipoAuditor
{
    public int Id { get; set; }
    public string Description { get; set; }
}

public class statusEvaluacionAuditores
{
    public long Id { get; set; }
    public string Description { get; set; }
    public string Code { get; set; }
}


