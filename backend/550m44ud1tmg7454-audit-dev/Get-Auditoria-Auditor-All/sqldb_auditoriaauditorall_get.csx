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

    public auditoriaauditorallget funGetAuditoriaAuditorAll(ILogger log
                                                    , long vnid
                                                    , long SedeId
                                                    , long EspecialidadId
                                                    )
    {
        // log.LogInformation(str1);
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
        //Lista de Objetos
        auditoriaauditorallget curobj = new auditoriaauditorallget();

        //SQL Objects
        SqlDataReader dataReader;
        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();
                //Start - Manejo de Parametros
                var textselect = "SELECT A.Id, ";
                textselect += "A.[Description], ";
                textselect += "UN.Id AS UnidadNegocioId, ";
                textselect += "UN.Description AS DescriptionUnidadNegocio, ";
                textselect += "S.Code AS CodeSede, ";
                textselect += "S.Description AS DescriptionSede, ";
                textselect += "TA.Code AS CodeTipoAuditoria, ";
                textselect += "TA.Description AS DescriptionAuditoria, ";
                textselect += "(SELECT STUFF((SELECT ',' + CONVERT(VARCHAR(10), NormaCode) FROM [auditoria].Auditoria_Norma WHERE AuditoriaId = A.Id FOR xml path('')), 1, 1, '')) AS Code_Normas, ";
                textselect += "(SELECT STUFF(( SELECT ',' + CONVERT ( VARCHAR ( 10 ), N.Id ) FROM [auditoria].Auditoria_Norma AN INNER JOIN [Auditoria].Norma N ON AN.NormaCode = N.Code WHERE AN.AuditoriaId = A.Id FOR xml path ( '' ) ),1,1,'' ) ) AS Id_Normas, ";
                textselect += "A.Inicio, ";
                textselect += "A.Fin ";
                textselect += "FROM [auditoria].[Auditoria] A ";
                textselect += "INNER JOIN [auditoria].Sede S ON S.Id = A.SedeId ";
                textselect += "INNER JOIN [auditoria].Unidad_Negocio UN ON S.UnidadNegocioId = UN.Id ";
                textselect += "INNER JOIN [auditoria].Tipo_Auditoria TA ON TA.Id = A.TipoId ";
                textselect += "INNER JOIN [auditoria].Status_Auditoria SA ON SA.Id = A.StatusId ";
                textselect += "LEFT JOIN [auditoria].Status_Evaluacion_Auditoria SEA ON SEA.Id = A.StatusEvaluacionId ";
                textselect += "WHERE (A.Deleted IS NULL OR A.Deleted = 0) ";
                textselect += String.Format("AND A.[Id] = {0}", vnid);

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
                            curobj = new auditoriaauditorallget();
                            curobj.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id")));
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Description"))) { curobj.Description = (string)(dataReader.GetValue(dataReader.GetOrdinal("Description"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("UnidadNegocioId"))) { curobj.UnidadNegocioId = (long)(dataReader.GetValue(dataReader.GetOrdinal("UnidadNegocioId"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("DescriptionUnidadNegocio"))) { curobj.DescriptionUnidadNegocio = (string)(dataReader.GetValue(dataReader.GetOrdinal("DescriptionUnidadNegocio"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("CodeSede"))) { curobj.CodeSede = (string)(dataReader.GetValue(dataReader.GetOrdinal("CodeSede"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("DescriptionSede"))) { curobj.DescriptionSede = (string)(dataReader.GetValue(dataReader.GetOrdinal("DescriptionSede"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("CodeTipoAuditoria"))) { curobj.CodeTipoAuditoria = (string)(dataReader.GetValue(dataReader.GetOrdinal("CodeTipoAuditoria"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("DescriptionAuditoria"))) { curobj.DescriptionAuditoria = (string)(dataReader.GetValue(dataReader.GetOrdinal("DescriptionAuditoria"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Code_Normas"))) { curobj.Code_Normas = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code_Normas"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id_Normas"))) { curobj.Id_Normas = (string)(dataReader.GetValue(dataReader.GetOrdinal("Id_Normas"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Inicio"))) { curobj.Inicio = (DateTime)(dataReader.GetValue(dataReader.GetOrdinal("Inicio"))); }
                            if (!dataReader.IsDBNull(dataReader.GetOrdinal("Fin"))) { curobj.Fin = (DateTime)(dataReader.GetValue(dataReader.GetOrdinal("Fin"))); }
                        }

                    }
                }
                conn.Close();

                curobj.Auditores = funGetAuditorAll(log, vnid, SedeId, EspecialidadId, curobj.Id_Normas);
                return curobj;
            }
        }
        catch (Exception ex)
        {
            curobj = new auditoriaauditorallget();
            curobj.Id = 0;
            curobj.Code = "nulo";
            curobj.Description = System.Convert.ToString(ex.Message);
        }
        return curobj;
    }


    public List<auditor> funGetAuditorAll(ILogger log
                                            , long vnid
                                            , long SedeId
                                            , long EspecialidadId
                                            , string Id_Normas
                                        )
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
        //Lista de Objetos
        auditor curobj;
        List<auditor> lobjs = new List<auditor>();

        log.LogInformation("Id_Normas: " + Id_Normas);
        var Normas = Id_Normas.Split(',');

        //SQL Objects
        SqlDataReader dataReader;
        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();

                //foreach (var item in Normas)
                //{
                    //log.LogInformation("item: " + item);
                    //Start - Manejo de Parametros
                    var textselect = "SELECT DISTINCT a.Id, ";
                    textselect += "a.Name, a.Cargo, ISNULL(a.Correo, 0) as Correo, ";
                    textselect += "a.Tipo as Tipo_Id, ";
                    textselect += "b.Description as Tipo_Des, ";
                    textselect += "ISNULL(c.Id, 0) as Selected ";
                    textselect += "from [auditoria].[Auditor] a ";
                    textselect += "inner join [auditoria].[Tipo_Auditor] b on b.Id = a.Tipo ";
                    /////////
                    //textselect += String.Format("INNER JOIN auditoria.Capacitacion AS Ca ON a.Id = Ca.AuditorId AND Ca.NormaId IN ( {0} )", Id_Normas);
                    textselect += " INNER JOIN auditoria.Capacitacion AS Ca ON a.Id = Ca.AuditorId ";
                    textselect += " left JOIN [auditoria].Experiencia AS Ex ON [a].Id = [Ex].AuditorId AND [a].Tipo = [Ex].RolId ";
                    ////////
                    textselect += "left join [auditoria].[Auditoria_Auditor] c on c.AuditorId = a.Id ";
                    textselect += String.Format("AND c.AuditoriaId = {0}", vnid);
                    textselect += " where a.Active = 1 ";
                    ///////////
                    textselect += String.Format(" AND ( (Ca.NormaId IN ( {0} ) AND a.Tipo IN (1,2) AND [Ex].AuditorId IS NOT NULL ) OR (Ca.NormaId IN ( {0} ) AND a.Tipo IN (3) ) )", Id_Normas);
                    ///////////
                    //textselect += String.Format("AND A.[SedeId] = {0}", SedeId);
                    //textselect += String.Format("AND A.[EspecialidadId] = {0}", EspecialidadId);
                    textselect += " order by a.Tipo, a.Name";

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
                                curobj = new auditor();
                                curobj.Id = (int)(dataReader.GetValue(0));
                                if (!dataReader.IsDBNull(dataReader.GetOrdinal("Name"))) { curobj.Name = (string)(dataReader.GetValue(dataReader.GetOrdinal("Name"))); }
                                if (!dataReader.IsDBNull(dataReader.GetOrdinal("Cargo"))) { curobj.Cargo = (string)(dataReader.GetValue(dataReader.GetOrdinal("Cargo"))); }
                                if (!dataReader.IsDBNull(dataReader.GetOrdinal("Correo"))) { curobj.Correo = (string)(dataReader.GetValue(dataReader.GetOrdinal("Correo"))); }
                                if (!dataReader.IsDBNull(dataReader.GetOrdinal("Tipo_Id"))) { curobj.Tipo_Id = (int)(dataReader.GetValue(dataReader.GetOrdinal("Tipo_Id"))); }
                                if (!dataReader.IsDBNull(dataReader.GetOrdinal("Tipo_Des"))) { curobj.Tipo_Des = (string)(dataReader.GetValue(dataReader.GetOrdinal("Tipo_Des"))); }
                                if (!dataReader.IsDBNull(dataReader.GetOrdinal("Selected"))) { curobj.Selected = (int)(dataReader.GetValue(dataReader.GetOrdinal("Selected"))); }
                                lobjs.Add(curobj);
                                log.LogInformation("curobj.Name: " + curobj.Name);
                                log.LogInformation("curobj.Tipo_Des: " + curobj.Tipo_Des);
                            }
                        }
                    }
                //} // fin foreach


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

public class auditoriaauditorallget
{
    public long Id { get; set; }
    public string Code { get; set; }
    public string Description { get; set; }
    public long UnidadNegocioId { get; set; }
    public string DescriptionUnidadNegocio { get; set; }
    public string CodeSede { get; set; }
    public string DescriptionSede { get; set; }
    public string CodeTipoAuditoria { get; set; }
    public string DescriptionAuditoria { get; set; }
    public string Code_Normas { get; set; }
    public string Id_Normas { get; set; }
    public DateTime Inicio { get; set; }
    public DateTime Fin { get; set; }
    public List<auditor> Auditores { get; set; }
}

public class auditor
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Cargo { get; set; }
    public string Correo { get; set; }
    public int Tipo_Id { get; set; }
    public string Tipo_Des { get; set; }
    public int Selected { get; set; }
}

