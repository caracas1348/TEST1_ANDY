using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;
using System.Diagnostics;

class DataAuditoriaAuditorAllGet
{
    public datosgenerales funGetDatosGeneralesAll(ILogger log
                                                    , long vnid
                                                    , int vnver
                                                    )
    {
        // log.LogInformation(str1);
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
        //Lista de Objetos
        datosgenerales curobj = new datosgenerales();

        //SQL Objects
        SqlDataReader dataReader;
        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();
                //Start - Manejo de Parametros
                var textselect = "SELECT A.Id, ";
                textselect += "A.Name, ";
                textselect += "b.Description as Rol, ";
                textselect += "A.Cargo, ";
                textselect += "S.Id AS SedeId, ";
                textselect += "S.Code AS CodeSede, ";
                textselect += "S.Description AS DescriptionSede, ";
                textselect += "E.Id as EspecialidadId, ";
                textselect += "E.Code AS CodeEspecialidad, ";
                textselect += "E.Description AS DescriptionEspecialidad, ";
                textselect += "A.Active ";
                textselect += "FROM [auditoria].[Auditor] A ";
                textselect += "LEFT JOIN [auditoria].Sede S ON A.SedeId = S.Id ";
                textselect += "LEFT JOIN [auditoria].Especialidad E ON A.EspecialidadId = E.Id ";
                textselect += "INNER JOIN [auditoria].[Tipo_Auditor] b on b.Id = A.Tipo ";
                textselect += "WHERE ";
                textselect += String.Format(" A.[Id] = {0}", vnid);

                var StrQuery = textselect;
                //End - Manejo de Parametros
                log.LogInformation("StrQuery:" + StrQuery);
                //ShipDate < GetDate();
                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    //Ejecutar Comando
                    using (dataReader = cmd.ExecuteReader())
                    {
                        //Navegar en el Conjunto de Datos Recuperados
                        while (dataReader.Read())
                        {
                            curobj = new datosgenerales();
                            curobj.Id = (int)(dataReader.GetValue(dataReader.GetOrdinal("Id")));
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Name"))) { curobj.Name = (string)(dataReader.GetValue(dataReader.GetOrdinal("Name"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Rol"))) { curobj.Rol = (string)(dataReader.GetValue(dataReader.GetOrdinal("Rol"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Cargo"))) { curobj.Cargo = (string)(dataReader.GetValue(dataReader.GetOrdinal("Cargo"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("SedeId"))) { curobj.SedeId = (long)(dataReader.GetValue(dataReader.GetOrdinal("SedeId"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("CodeSede"))) { curobj.CodeSede = (string)(dataReader.GetValue(dataReader.GetOrdinal("CodeSede"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("DescriptionSede"))) { curobj.DescriptionSede = (string)(dataReader.GetValue(dataReader.GetOrdinal("DescriptionSede"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("EspecialidadId"))) { curobj.EspecialidadId = (int)(dataReader.GetValue(dataReader.GetOrdinal("EspecialidadId"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("CodeEspecialidad"))) { curobj.CodeEspecialidad = (string)(dataReader.GetValue(dataReader.GetOrdinal("CodeEspecialidad"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("DescriptionEspecialidad"))) { curobj.DescriptionEspecialidad = (string)(dataReader.GetValue(dataReader.GetOrdinal("DescriptionEspecialidad"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Active"))) { curobj.Active = (int)(dataReader.GetValue(dataReader.GetOrdinal("Active"))); }
                            //andy 11-05-21
                            //if (!dataReader.IsDBNull(dataReader.GetOrdinal("UserIdHash"))) { curobj.UserIdHash = (string)(dataReader.GetValue(dataReader.GetOrdinal("UserIdHash"))); }
                        }
                    }
                }
                conn.Close();

                curobj.Capacitaciones = funGetCapacitacionesAll(log, vnid, vnver);
                curobj.Experiencia = funGetExperienciaAll(log, vnid, vnver);
                return curobj;
            }
        }
        catch (Exception ex)
        {
            curobj = new datosgenerales();
            curobj.Id = 0;
            curobj.Code = "nulo";
            curobj.Description = System.Convert.ToString(ex.Message);
        }
        return curobj;
    }


    private List<capacitacion> funGetCapacitacionesAll(ILogger log
                                            , long vnid
                                            , int vnver
                                        )
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
        //Lista de Objetos
        capacitacion curobj;
        List<capacitacion> lobjs = new List<capacitacion>();

        //SQL Objects
        SqlDataReader dataReader;
        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();
                //Start - Manejo de Parametros
                var textselect = "select a.Id, ";
                textselect += "a.NormaId, ";
                textselect += "b.Description as Norma_Des, ";
                textselect += "a.TipoCursoId, ";
                textselect += "c.Description as Curso_Des, ";
                textselect += "a.Tipo, ";
                textselect += "d.Description as Tipo_Des, ";
                textselect += "a.Fecha_Inicio, ";
                textselect += "a.Fecha_Final, ";
                if(vnver==1)
                    {
                        textselect += "a.Fecha_Final, ";
                        textselect += "ISNULL(a.Adjunto, '') as Adjunto ";}
                else{textselect += "a.Fecha_Final ";}
                textselect += "from [auditoria].[Capacitacion] a ";
                textselect += "inner join [auditoria].[Norma] b on b.Id = a.NormaId ";
                textselect += "inner join [auditoria].[Tipo_Curso_Capacitacion] c on c.Id = a.TipoCursoId ";
                textselect += "inner join [auditoria].[Tipo_Capacitacion] d on d.Id = a.Tipo ";
                textselect += "where a.Active = 1 ";
                textselect += String.Format("AND a.AuditorId = {0}", vnid);

                var StrQuery = textselect;
                //End - Manejo de Parametros
                log.LogInformation("StrQuery:" + StrQuery);
                //ShipDate < GetDate();
                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    //Ejecutar Comando
                    using (dataReader = cmd.ExecuteReader())
                    {
                        //Navegar en el Conjunto de Datos Recuperados
                        while (dataReader.Read())
                        {
                            curobj = new capacitacion();
                            curobj.Id = (int)(dataReader.GetValue(0));
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("NormaId"))) { curobj.NormaId = (int)(dataReader.GetValue(dataReader.GetOrdinal("NormaId"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Norma_Des"))) { curobj.Norma_Des = (string)(dataReader.GetValue(dataReader.GetOrdinal("Norma_Des"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("TipoCursoId"))) { curobj.TipoCursoId = (int)(dataReader.GetValue(dataReader.GetOrdinal("TipoCursoId"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Curso_Des"))) { curobj.Curso_Des = (string)(dataReader.GetValue(dataReader.GetOrdinal("Curso_Des"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Tipo"))) { curobj.Tipo = (int)(dataReader.GetValue(dataReader.GetOrdinal("Tipo"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Tipo_Des"))) { curobj.Tipo_Des = (string)(dataReader.GetValue(dataReader.GetOrdinal("Tipo_Des"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Fecha_Inicio"))) { curobj.Fecha_Inicio = (DateTime)(dataReader.GetValue(dataReader.GetOrdinal("Fecha_Inicio"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Fecha_Final"))) { curobj.Fecha_Final = (DateTime)(dataReader.GetValue(dataReader.GetOrdinal("Fecha_Final"))); }
                            if(vnver==1)
                                {
                                        var ad = "";
                                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Adjunto"))) { curobj.Adjunto = (int)(dataReader.GetValue(0)); }
                                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Adjunto"))) { ad = (string)(dataReader.GetValue(dataReader.GetOrdinal("Adjunto"))); }
                                        if (ad == "")
                                            curobj.Adjunto = 0;
                                        if (ad != "")
                                            curobj.Adjunto = (int)(dataReader.GetValue(0));
                                }
                            lobjs.Add(curobj);
                        }
                    }
                }
                conn.Close();
                return lobjs;
            }
        }
        catch (Exception ex)
        {
        }
        return lobjs;
    }

    private List<experiencia> funGetExperienciaAll(ILogger log
                                            , long vnid
                                            ,int vnver
                                        )
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
        //Lista de Objetos
        experiencia curobj;
        List<experiencia> lobjs = new List<experiencia>();

        //SQL Objects
        SqlDataReader dataReader;
        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();
                //Start - Manejo de Parametros
                var textselect = "select a.Id, ";
                textselect += "a.RolId, ";
                textselect += "b.Description as RolDes, ";
                textselect += "a.NormaId, ";
                textselect += "c.Code as Code_Normas, ";
                textselect += "a.FechaInicio, ";
                textselect += "a.FechaFin, ";
                if(vnver==1)
                    {
                      textselect += "a.FechaFin, ";
                      textselect += "ISNULL(a.Adjunto, '') as Adjunto ";
                      }else{
                       textselect += "a.FechaFin ";
                      }
                textselect += "from [auditoria].[Experiencia] a ";
                textselect += "inner join [auditoria].[Tipo_Auditor] b on b.Id = a.RolId ";
                textselect += "inner join [auditoria].[Norma] c on c.Id = a.NormaId ";
                textselect += "where a.Active = 1 ";
                textselect += String.Format("AND a.AuditorId = {0}", vnid);

                var StrQuery = textselect;
                //End - Manejo de Parametros
                log.LogInformation("StrQuery:" + StrQuery);
                //ShipDate < GetDate();
                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    //Ejecutar Comando
                    using (dataReader = cmd.ExecuteReader())
                    {
                        //Navegar en el Conjunto de Datos Recuperados
                        while (dataReader.Read())
                        {
                            curobj = new experiencia();
                            curobj.Id = (int)(dataReader.GetValue(0));
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("RolId"))) { curobj.RolId = (int)(dataReader.GetValue(dataReader.GetOrdinal("RolId"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("RolDes"))) { curobj.RolDes = (string)(dataReader.GetValue(dataReader.GetOrdinal("RolDes"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("NormaId"))) { curobj.NormaId = (int)(dataReader.GetValue(dataReader.GetOrdinal("NormaId"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code_Normas"))) { curobj.Code_Normas = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code_Normas"))); }
                            if(vnver==1)
                                {
                                        var ad = "";
                                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Adjunto"))) { curobj.Adjunto = (int)(dataReader.GetValue(0)); }
                                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Adjunto"))) { ad = (string)(dataReader.GetValue(dataReader.GetOrdinal("Adjunto"))); }
                                        if (ad == "")
                                            curobj.Adjunto = 0;
                                        if (ad != "")
                                            curobj.Adjunto = (int)(dataReader.GetValue(0));
                                }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("FechaInicio"))) { curobj.FechaInicio = (DateTime)(dataReader.GetValue(dataReader.GetOrdinal("FechaInicio"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("FechaFin"))) { curobj.FechaFin = (DateTime)(dataReader.GetValue(dataReader.GetOrdinal("FechaFin"))); }
                            lobjs.Add(curobj);
                        }
                    }
                }
                conn.Close();
                return lobjs;
            }
        }
        catch (Exception ex)
        {
        }
        return lobjs;
    }


}

public class datosgenerales
{
    public int Id { get; set; }
    public string Code { get; set; }
    public string Description { get; set; }
    public string Name { get; set; }
    public string Rol { get; set; }
    public string Cargo { get; set; }
    public long SedeId { get; set; }
    public string CodeSede { get; set; }
    public string DescriptionSede { get; set; }
    public int EspecialidadId { get; set; }
    public string CodeEspecialidad { get; set; }
    public string DescriptionEspecialidad { get; set; }
    public int Active { get; set; }
    public List<capacitacion> Capacitaciones { get; set; }
    public List<experiencia> Experiencia { get; set; }

    //public string UserIdhash { get; set; }//andy 11-05-2020
}

public class capacitacion
{
    public int Id { get; set; }
    public int NormaId { get; set; }
    public string Norma_Des { get; set; }
    public int TipoCursoId { get; set; }
    public string Curso_Des { get; set; }
    public int Tipo { get; set; }
    public string Tipo_Des { get; set; }
    public DateTime Fecha_Inicio { get; set; }
    public DateTime Fecha_Final { get; set; }
    //public string Adjunto { get; set; }
    public int Adjunto { get; set; }
}

public class experiencia
{
    public int Id { get; set; }
    public int RolId { get; set; }
    public string RolDes { get; set; }
    public int NormaId { get; set; }
    public string Code_Normas { get; set; }
   //public string Adjunto { get; set; }
    public int Adjunto { get; set; }
    public DateTime FechaInicio { get; set; }
    public DateTime FechaFin { get; set; }
}


