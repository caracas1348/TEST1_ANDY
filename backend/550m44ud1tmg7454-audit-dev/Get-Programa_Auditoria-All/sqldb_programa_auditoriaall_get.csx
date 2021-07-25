using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataPrograma_AuditoriaAllGet
{
    public List<programa_auditoriaallget> funGetPrograma_AuditoriaAllList(ILogger log, int vnsearch_type
                                                              , long vnid
                                                              , string vvcode
                                                              , long vnespecialidadid
                                                              , int vnstatusid
                                                              , string vvevaluador_name
                                                              , string vvevaluador_code
                                                              , string vvyear
                                                              , string vvcreated_by
                                                              , string vvcreated_date
                                                              , string vvlast_updated_by
                                                              , string vvlast_updated_date
                                                              , string vnflagcompletada
                                                              , string vvfechadesde
                                                              , string vvfechahasta
                                                              , int vncantidadcorecciones
                                                              )
    {
        // log.LogInformation(str1);
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit",EnvironmentVariableTarget.Process);
        //Lista de Objetos
        List<programa_auditoriaallget> lobjs = new List<programa_auditoriaallget>();
        programa_auditoriaallget curobj;
        string vvcomodin="";
        //SQL Objects
        SqlDataReader dataReader;
        try{
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();
                //Start - Manejo de Parametros
                if(vnsearch_type == 1)
                { vvcomodin= "%";   }
                var textselect = "SELECT PA.Id, PA.Code, PA.EspecialidadId, PA.StatusId, PA.Evaluador_name, PA.Evaluador_code,PA.[Year], PA.Created_Date AS FechaCreacion, ";
                textselect = textselect + "E.Code AS CodeEspecialidad, E.Description AS DescriptionEspecialidad, SPA.Description AS DescriptionStatus, ";
                textselect = textselect + "PA.Created_By, PA.Created_Date, PA.Last_Updated_By, PA.Last_Updated_Date, ";
                textselect = textselect + "(SELECT COUNT(*) FROM [auditoria].[Auditoria] WHERE ProgramaAuditoriaId = PA.Id) AS CantidadAuditorias, PA.Flag_Completada, PA.Cantidad_Correcciones, ";
                textselect = textselect + "(SELECT COUNT(*) FROM [auditoria].[Auditoria] WHERE ProgramaAuditoriaId = PA.Id AND StatusEvaluacionId = 2) AS Correcciones ";
                textselect = textselect + "FROM [auditoria].[Programa_Auditoria] PA ";
                textselect = textselect + "INNER JOIN [auditoria].Especialidad E ON PA.EspecialidadId = E.Id ";
                textselect = textselect + "INNER JOIN [auditoria].Status_Programa_Auditoria SPA ON PA.StatusId = SPA.Id ";
                textselect = textselect + "WHERE (PA.Deleted IS NULL OR PA.Deleted = 0) ";
                if(vnid != 0)
                {textselect = textselect +  String.Format(" AND PA.[Id] = {0}",vnid);}
                if(vvcode != null)
                {textselect = textselect +  String.Format(" AND PA.[Code] like '%{0}%'",vvcode);}
                if(vnespecialidadid != 0)
                {textselect = textselect +  String.Format(" AND PA.[EspecialidadId] = {0}",vnespecialidadid);}
                if(vnstatusid != 0)
                {textselect = textselect +  String.Format(" AND PA.[StatusId] = {0}",vnstatusid);}
                if(vvevaluador_name != null)
                {textselect = textselect +  String.Format(" AND PA.[Evaluador_name] like '{0}'",vvcomodin+vvevaluador_name+vvcomodin);}
                if(vvevaluador_code != null)
                {textselect = textselect +  String.Format(" AND PA.[Evaluador_code] like '{0}'",vvcomodin+vvevaluador_code+vvcomodin);}
                if(vvyear != null)
                {textselect = textselect +  String.Format(" AND PA.[Year] like '{0}'",vvcomodin+vvyear+vvcomodin);}
                if( vvcreated_by != null )
                {textselect = textselect +  String.Format(" AND PA.[Created_By] = '{0}'",vvcreated_by);}
                if(vvcreated_date != null)
                {textselect = textselect +  String.Format(" AND PA.[Created_Date] >= '{0}'",vvcreated_date);}
                if( vvlast_updated_by != null )
                {textselect = textselect +  String.Format(" AND PA.[Last_Updated_By] = '{0}'",vvlast_updated_by);}
                if(vvlast_updated_date != null)
                {textselect = textselect +  String.Format(" AND PA.[Last_Updated_Date] <= '{0}'",vvlast_updated_date);}
                if(vnflagcompletada != null)
                {textselect = textselect +  String.Format(" AND PA.[Flag_Completada] = {0}",vnflagcompletada);}
                if(vncantidadcorecciones != 0)
                {textselect = textselect +  String.Format(" AND PA.[Cantidad_Correcciones] = {0}",vncantidadcorecciones);}
                //if(vvfechadesde != null && vvfechahasta != null)
                //{textselect = textselect +  String.Format(" AND (PA.[Created_Date] >= '{0}' AND PA.[Created_Date] <= '{1}') ",vvfechadesde,vvfechahasta + " 23:59:59.999");}
                if(vvfechadesde != null)
                {textselect = textselect +  String.Format(" AND (PA.[Created_Date] >= '{0}') ",vvfechadesde + " 00:00:00.000");}
                if(vvfechahasta != null)
                {textselect = textselect +  String.Format(" AND (PA.[Created_Date] <= '{0}') ",vvfechahasta + " 23:59:59.999");}
                textselect = textselect + " ORDER BY PA.[Created_Date] DESC";
                var StrQuery =  textselect;
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
                            curobj                                                  = new programa_auditoriaallget();
                            curobj.Id                                               = (long)(dataReader.GetValue(0));
                            if(!dataReader.IsDBNull(1)){ curobj.Code                = (string)(dataReader.GetValue(1));}
                            if(!dataReader.IsDBNull(2)){ curobj.EspecialidadId      = (long)(dataReader.GetValue(2));}
                            if(!dataReader.IsDBNull(3)){ curobj.StatusId            = (int)(dataReader.GetValue(3));}
                            if(!dataReader.IsDBNull(4)){ curobj.Evaluador_name      = (string)(dataReader.GetValue(4));}
                            if(!dataReader.IsDBNull(5)){ curobj.Evaluador_code      = (string)(dataReader.GetValue(5));}
                            if(!dataReader.IsDBNull(6)){ curobj.Year                = (string)(dataReader.GetValue(6));}
                            if(!dataReader.IsDBNull(7)){ curobj.FechaCreacion       = (DateTime)(dataReader.GetValue(7));}
                            if(!dataReader.IsDBNull(8)){ curobj.CodeEspecialidad        = (string)(dataReader.GetValue(8)); }
                            if(!dataReader.IsDBNull(9)){ curobj.DescriptionEspecialidad = (string)(dataReader.GetValue(9));}
                            if(!dataReader.IsDBNull(10)){ curobj.DescriptionStatus      = (string)(dataReader.GetValue(10));}
                            if(!dataReader.IsDBNull(11)){ curobj.Created_By          = (string)(dataReader.GetValue(11)); }
                            if(!dataReader.IsDBNull(12)){ curobj.Created_Date        = (DateTime)(dataReader.GetValue(12));}
                            if(!dataReader.IsDBNull(13)){ curobj.Last_Updated_By     = (string)(dataReader.GetValue(13));}
                            if(!dataReader.IsDBNull(14)){ curobj.Last_Updated_Date   = (DateTime)(dataReader.GetValue(14));}
                            if(!dataReader.IsDBNull(15)){ curobj.CantidadAuditorias  = (int)(dataReader.GetValue(15));}
                            if(!dataReader.IsDBNull(16)){ curobj.Flag_Completada     = (int)(dataReader.GetValue(16));}
                            if(!dataReader.IsDBNull(17)){ curobj.Cantidad_Correcciones  = (int)(dataReader.GetValue(17));}
                            if(!dataReader.IsDBNull(18)){ curobj.Correcciones  = (int)(dataReader.GetValue(18));}

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
            curobj              = new programa_auditoriaallget();
            curobj.Id           = 0;
            curobj.Code         = "nulo";
            curobj.Evaluador_name  = System.Convert.ToString(ex.Message);
            lobjs.Add(curobj);
        }
        return lobjs;
    }


    public programa_auditoriaallget funGetPrograma_AuditoriaAll(ILogger log, int vnsearch_type
                                                              , long vnid
                                                              , string vvname
                                                            )
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit",EnvironmentVariableTarget.Process);
        //Lista de Objetos
        programa_auditoriaallget curobj;
        string vvcomodin="";
        curobj = new programa_auditoriaallget();
        //SQL Objects
        SqlDataReader dataReader;
        try{
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();
                //Start - Manejo de Parametros
                if(vnsearch_type == 1)
                { vvcomodin= "%";   }

                var textselect = "SELECT PA.Id, PA.Code, PA.EspecialidadId, PA.StatusId, PA.Evaluador_name, PA.Evaluador_code,PA.[Year], PA.Created_Date AS FechaCreacion, ";
                textselect = textselect + "E.Code AS CodeEspecialidad, E.Description AS DescriptionEspecialidad, SPA.Description AS DescriptionStatus, ";
                textselect = textselect + "PA.Created_By, PA.Created_Date, PA.Last_Updated_By, PA.Last_Updated_Date, ";
                textselect = textselect + "(SELECT COUNT(*) FROM [auditoria].[Auditoria] WHERE ProgramaAuditoriaId = PA.Id) AS CantidadAuditorias, PA.Flag_Completada, PA.Cantidad_Correcciones, ";
                textselect = textselect + "(SELECT COUNT(*) FROM [auditoria].[Auditoria] WHERE ProgramaAuditoriaId = PA.Id AND StatusEvaluacionId = 2) AS Correcciones ";
                textselect = textselect + "FROM [auditoria].[Programa_Auditoria] PA ";
                textselect = textselect + "INNER JOIN [auditoria].Especialidad E ON PA.EspecialidadId = E.Id ";
                textselect = textselect + "INNER JOIN [auditoria].Status_Programa_Auditoria SPA ON PA.StatusId = SPA.Id ";
                textselect = textselect + "WHERE (PA.Deleted IS NULL OR PA.Deleted = 0) ";
                if(vnid != 0)
                {textselect = textselect +  String.Format(" AND PA.[Id] = {0}",vnid);}

                textselect = textselect + " ORDER BY PA.[Created_By] DESC";

                var StrQuery =  textselect;
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
                            curobj                                                  = new programa_auditoriaallget();
                            curobj.Id                                         = (long)(dataReader.GetValue(0));
                            if(!dataReader.IsDBNull(1)){ curobj.Code                = (string)(dataReader.GetValue(1));}
                            if(!dataReader.IsDBNull(2)){ curobj.EspecialidadId      = (long)(dataReader.GetValue(2));}
                            if(!dataReader.IsDBNull(3)){ curobj.StatusId            = (int)(dataReader.GetValue(3));}
                            if(!dataReader.IsDBNull(4)){ curobj.Evaluador_name      = (string)(dataReader.GetValue(4));}
                            if(!dataReader.IsDBNull(5)){ curobj.Evaluador_code      = (string)(dataReader.GetValue(5));}
                            if(!dataReader.IsDBNull(6)){ curobj.Year                = (string)(dataReader.GetValue(6));}
                            if(!dataReader.IsDBNull(7)){ curobj.FechaCreacion       = (DateTime)(dataReader.GetValue(7));}
                            if(!dataReader.IsDBNull(8)){ curobj.CodeEspecialidad        = (string)(dataReader.GetValue(8)); }
                            if(!dataReader.IsDBNull(9)){ curobj.DescriptionEspecialidad = (string)(dataReader.GetValue(9));}
                            if(!dataReader.IsDBNull(10)){ curobj.DescriptionStatus      = (string)(dataReader.GetValue(10));}
                            if(!dataReader.IsDBNull(11)){ curobj.Created_By          = (string)(dataReader.GetValue(11)); }
                            if(!dataReader.IsDBNull(12)){ curobj.Created_Date        = (DateTime)(dataReader.GetValue(12));}
                            if(!dataReader.IsDBNull(13)){ curobj.Last_Updated_By     = (string)(dataReader.GetValue(13));}
                            if(!dataReader.IsDBNull(14)){ curobj.Last_Updated_Date   = (DateTime)(dataReader.GetValue(14));}
                            if(!dataReader.IsDBNull(15)){ curobj.CantidadAuditorias  = (int)(dataReader.GetValue(15));}
                            if(!dataReader.IsDBNull(16)){ curobj.Flag_Completada     = (int)(dataReader.GetValue(16));}
                            if(!dataReader.IsDBNull(17)){ curobj.Cantidad_Correcciones  = (int)(dataReader.GetValue(17));}
                            if(!dataReader.IsDBNull(18)){ curobj.Correcciones  = (int)(dataReader.GetValue(18));}
                        }
                    }
                }
                conn.Close();
                return curobj;
            }
        }
        catch (Exception ex)
        {
            curobj              = new programa_auditoriaallget();
            curobj. Id          = 0;

        }
        return curobj;
    }
}


public class programa_auditoriaallget
{
    public long Id {get; set;}
    public string Code {get; set;}
    public long EspecialidadId {get; set;}
    public int StatusId {get; set;}
    public string CodeEspecialidad {get; set;}
    public string DescriptionEspecialidad {get; set;}
    public string DescriptionStatus {get; set;}
    public int CantidadAuditorias { get; set; }
    public string Evaluador_name {get; set;}
    public string Evaluador_code {get; set;}
    public string Year {get; set;}
    public int Flag_Completada {get; set;}
    public int Cantidad_Correcciones {get; set;}
    public int Correcciones {get; set;}
    public DateTime Fecha_Desde {get; set;}
    public DateTime Fecha_Hasta {get; set;}
    public DateTime FechaCreacion {get; set;}
    public string Created_By {get; set;}
    public DateTime Created_Date {get; set;}
    public string Last_Updated_By {get; set;}
    public DateTime Last_Updated_Date {get; set;}
}