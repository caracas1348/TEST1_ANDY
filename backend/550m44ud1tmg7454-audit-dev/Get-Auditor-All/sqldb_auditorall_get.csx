using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataAuditorAll
{
    public List<auditorall> funGetAuditorAllList(ILogger log, int vnsearch_type
                                                              , int vnid
                                                              , string vvuseridhash
                                                              , string vvname
                                                              , string vvrol_code
                                                              , int vnsedeid
                                                              , int vnactive
                                                              , int vnespecialidadid
                                                              , string vvcargo
                                                              , int vntipo
                                                              , string vvcreate_by
                                                              )
    {
        // log.LogInformation(str1);
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit",EnvironmentVariableTarget.Process);
        //Lista de Objetos
        List<auditorall> lobjs = new List<auditorall>();
        auditorall curobj;
        string vvcomodin="%";
        string vvcreate_date = DateTime.Now.ToString();
        //SQL Objects
        SqlDataReader dataReader;
        try{
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();
                //Start - Manejo de Parametros
                if(vnsearch_type == 1)
                { vvcomodin= "%";   }
                var textselect = "SELECT A.*, S.Code AS CodeSede, S.Description AS DescriptionSede, ";
                textselect = textselect + "E.Code AS CodeEspecialidad, E.Description AS DescriptionEspecialidad, T.Description AS Tipo_Auditor ";
                textselect = textselect + "FROM [auditoria].[Auditor] A ";
                textselect = textselect + "LEFT JOIN [auditoria].Sede S ON A.SedeId = S.Id ";
                textselect = textselect + "INNER JOIN [auditoria].[Tipo_Auditor] T ON T.Id = A.Tipo ";
                textselect = textselect + "LEFT JOIN [auditoria].Especialidad E ON A.EspecialidadId = E.Id ";
                textselect = textselect + "";
                textselect = textselect + "WHERE 1 = 1 ";
                if(vnid != 0)
                {textselect = textselect +  String.Format(" AND A.[Id] = {0}",vnid);}
                if(vvuseridhash != null)
                {textselect = textselect +  String.Format(" AND A.[UserIdhash] like '{0}'",vvcomodin+vvuseridhash+vvcomodin);}
                if(vvname != null)
                {textselect = textselect +  String.Format(" AND A.[Name] like '{0}'",vvcomodin+vvname+vvcomodin);}
                if(vvrol_code != null)
                {textselect = textselect +  String.Format(" AND A.[Rol_Code] like '{0}'",vvcomodin+vvrol_code+vvcomodin);}
                if(vnsedeid != 0)
                {textselect = textselect +  String.Format(" AND A.[SedeId] = {0}",vnsedeid);}
                if(vnactive != 0)
                {
                    if(vnactive==2)
                    {
                       vnactive=0;
                    }
                    textselect = textselect +  String.Format(" AND A.[Active] = {0}",vnactive);}
                if(vnespecialidadid != 0)
                {textselect = textselect +  String.Format(" AND A.[EspecialidadId] = {0}",vnespecialidadid);}
                if(vvcargo != null)
                {textselect = textselect +  String.Format(" AND A.[Cargo] like '{0}'",vvcomodin+vvcargo+vvcomodin);}
                if(vntipo != 0)
                {textselect = textselect +  String.Format(" AND A.[Tipo] = {0}",vntipo);}
                // if(vvcreated_date_end != null)
                // {textselect = textselect +  String.Format(" AND [Created_Date] <= '{0}'",vvcreated_date_end);}
                // if(vvlast_updated_date_ini != null)
                // {textselect = textselect +  String.Format(" AND [Last_Updated_Date] >= '{0}'",vvlast_updated_date_ini);}
                // if(vvlast_updated_date_end != null)
                // {textselect = textselect +  String.Format(" AND [Last_Updated_Date] <= '{0}'",vvlast_updated_date_end);}
                var StrQuery =  textselect + " Order by A.Name;";
                //End - Manejo de Parametros
                log.LogInformation("StrQuery:"+StrQuery);
                //ShipDate < GetDate();
                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    //Ejecutar Comando
                    using (dataReader = cmd.ExecuteReader())
                    {
                        //Navegar en el Conjunto de Datos Recuperados
                        while (dataReader.Read())
                        {
                            curobj                                                       = new auditorall();
                            curobj.Id                                                    = (int)(dataReader.GetValue(0));
                            if(!dataReader.IsDBNull(1)){ curobj.UserIdhash               = (string)(dataReader.GetValue(1));}
                            if(!dataReader.IsDBNull(2)){ curobj.Name                     = (string)(dataReader.GetValue(2));}
                            if(!dataReader.IsDBNull(3)){ curobj.Rol_Code                 = (string)(dataReader.GetValue(3));}
                            if(!dataReader.IsDBNull(4)){ curobj.SedeId                   = (int)(dataReader.GetValue(4));}
                            //curobj.SedeId                                              = (int)(dataReader.GetValue(4));
                            curobj.Active                                                = (int)(dataReader.GetValue(5));
                            //curobj.EspecialidadId                                      = (int)(dataReader.GetValue(6));
                            if(!dataReader.IsDBNull(6)){ curobj.EspecialidadId           = (int)(dataReader.GetValue(6));}
                            if(!dataReader.IsDBNull(7)){ curobj.Cargo                    = (string)(dataReader.GetValue(7));}
                            if(!dataReader.IsDBNull(11)){ curobj.CodeSede                = (string)(dataReader.GetValue(11));}
                            if(!dataReader.IsDBNull(12)){ curobj.DescriptionSede         = (string)(dataReader.GetValue(12));}
                            if(!dataReader.IsDBNull(13)){ curobj.CodeEspecialidad        = (string)(dataReader.GetValue(13));}
                            if(!dataReader.IsDBNull(14)){ curobj.DescriptionEspecialidad = (string)(dataReader.GetValue(14));}

                            //if(!dataReader.IsDBNull(8)){ curobj.Create_By    = (string)(dataReader.GetValue(8)); }
                            lobjs.Add(curobj);
                        }
                    }
                }
                conn.Close();


                foreach (var item in lobjs)
                {
                    item.Capacitaciones = funGetCapacitacionesAll(log, item.Id);
                    item.Experiencia = funGetExperienciaAll(log, item.Id);
                }

                return lobjs;
            }
        }
        catch (Exception ex)
        {
            curobj              = new auditorall();
            curobj.Id           = 0;
            curobj.Name         = System.Convert.ToString(ex.Message);
            lobjs.Add(curobj);
        }
        return lobjs;
    }








    private List<capacitacion> funGetCapacitacionesAll(ILogger log
                                            , int vnid
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
                textselect += "a.Fecha_Final ";
                //textselect += "ISNULL(a.Adjunto, '') as Adjunto ";
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
                            //if (!dataReader.IsDBNull(dataReader.GetOrdinal("Adjunto"))) { curobj.Adjunto = (string)(dataReader.GetValue(dataReader.GetOrdinal("Adjunto"))); }
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
                textselect += "a.FechaFin ";
                //textselect += "ISNULL(a.Adjunto, '') as Adjunto ";
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
                            //if (!dataReader.IsDBNull(dataReader.GetOrdinal("Adjunto"))) { curobj.Adjunto = (string)(dataReader.GetValue(dataReader.GetOrdinal("Adjunto"))); }
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


public class auditorall
{
    public int Id {get; set;}
    public string UserIdhash {get; set;}
    public string Name {get; set;}
    public string Rol_Code {get; set;}
    public int SedeId {get; set;}
    public string CodeSede {get; set;}
    public string DescriptionSede {get; set;}
    public int Active {get; set;}
    public int EspecialidadId {get; set;}
    public string CodeEspecialidad {get; set;}
    public string DescriptionEspecialidad {get; set;}
    public string Cargo {get; set;}
    public string Create_By {get; set;}
    public DateTime Create_Date {get; set;}
    public string Last_Updated_By {get; set;}
    public DateTime Last_Updated_Date {get; set; }
    public List<capacitacion> Capacitaciones { get; set; }
    public List<experiencia> Experiencia { get; set; }
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
}

public class experiencia
{
    public int Id { get; set; }
    public int RolId { get; set; }
    public string RolDes { get; set; }
    public int NormaId { get; set; }
    public string Code_Normas { get; set; }
    //public string Adjunto { get; set; }
    public DateTime FechaInicio { get; set; }
    public DateTime FechaFin { get; set; }
}


