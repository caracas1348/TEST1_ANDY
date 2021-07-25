using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataAuditoriaAll
{
 //   var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);

    public String funPostAuditoriaAll(ILogger log, auditoriaall curentity)
    {

        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);

        //Lista de Objetos
        long newlongid;

        auditoriaall curobj;
        string vvcomodin = "";

        curobj = new auditoriaall();
        log.LogInformation("Ingreso Metodo:");
        //SQL Objects
        SqlDataReader dataReader;

        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {

                log.LogInformation("Ingreso Metodo: antes open");
                conn.Open();

                //Start - Manejo de Parametros

                log.LogInformation("Ingreso Metodo: luego de open");

                int respuestaVerifica = 0;
                string fechaDesde = curentity.Inicio.ToString("yyyy-MM-dd");
                string fechaHasta = curentity.Fin.ToString("yyyy-MM-dd");

                // Verifico que Fechas no se crucen
                //string sqlVerificar = "SELECT COUNT(*) AS CantidadCoincidencias FROM [auditoria].[Auditoria] A ";
                //sqlVerificar = sqlVerificar + "WHERE ProgramaAuditoriaId = " + curentity.ProgramaAuditoriaId.ToString() + " " ;
                //sqlVerificar = sqlVerificar + "AND SedeId = " + curentity.SedeId + " " ;
                //sqlVerificar = sqlVerificar + "AND (SELECT STUFF((SELECT ',' + CONVERT(VARCHAR(10), NormaCode) FROM [auditoria].Auditoria_Norma WHERE AuditoriaId = A.Id FOR xml path('')), 1, 1, '')) = '" + curentity.Code_Normas + "' " ;
                //sqlVerificar = sqlVerificar + "AND ((Inicio = '" + fechaDesde + "' OR Fin = '" + fechaHasta + "' OR Inicio = '" + fechaHasta + "' OR Fin = '" + fechaDesde + "') ";
                //sqlVerificar = sqlVerificar + "OR (Inicio < '" + fechaDesde + "' AND Fin > '" + fechaDesde + "') ";
                //sqlVerificar = sqlVerificar + "OR (Inicio < '" + fechaHasta + "' AND Fin > '" + fechaHasta + "') ";
                //sqlVerificar = sqlVerificar + "OR (Inicio > '" + fechaDesde + "' AND Fin < '" + fechaHasta + "') ";
                //sqlVerificar = sqlVerificar + "OR (Inicio > '" + fechaDesde + "' AND Inicio < '" + fechaHasta + "' AND Fin > '" + fechaHasta + "') ";
                //sqlVerificar = sqlVerificar + "OR (Inicio < '" + fechaDesde + "' AND Fin > '" + fechaDesde + "' AND Fin <'" + fechaHasta + "')) ";
                //log.LogInformation("sqlVerificar: " + sqlVerificar);

                //using (SqlCommand cmdVerificar = new SqlCommand(sqlVerificar, conn))
                //{
                //    var modified = await cmdVerificar.ExecuteScalarAsync();
                //    respuestaVerifica = Convert.ToInt32(modified);
                //    log.LogInformation("respuestaVerifica: " + respuestaVerifica.ToString());
                //    log.LogInformation("modified: " + modified.ToString());
                //    log.LogInformation("Fecha Inicio: " + curentity.Inicio.ToString());
                //    log.LogInformation("Fecha Fin: " + curentity.Fin.ToString());                }
                //if (respuestaVerifica != 0) 
                //{
                //    return -1;
                //}


                // Verifico que Fechas no se crucen
                string sqlVerificar = "SELECT A.Id, A.Code, s.Description as Sede, e.Description as Especialidad FROM [auditoria].[Auditoria] A ";
                sqlVerificar = sqlVerificar + "inner join [auditoria].[Sede] s ON s.Id = A.SedeId ";
                sqlVerificar = sqlVerificar + "inner join [auditoria].[Programa_Auditoria] p ON p.Id = A.ProgramaAuditoriaId ";
                sqlVerificar = sqlVerificar + "inner join [auditoria].[Especialidad] e ON e.Id = p.EspecialidadId ";
                //sqlVerificar = sqlVerificar + "WHERE A.ProgramaAuditoriaId = " + curentity.ProgramaAuditoriaId.ToString() + " ";
                sqlVerificar = sqlVerificar + "WHERE A.SedeId = " + curentity.SedeId.ToString() + " ";
                sqlVerificar = sqlVerificar + "AND ((A.Inicio = '" + fechaDesde + "' OR A.Fin = '" + fechaHasta + "' OR A.Inicio = '" + fechaHasta + "' OR A.Fin = '" + fechaDesde + "') ";
                sqlVerificar = sqlVerificar + "OR (A.Inicio < '" + fechaDesde + "' AND A.Fin > '" + fechaDesde + "') ";
                sqlVerificar = sqlVerificar + "OR (A.Inicio < '" + fechaHasta + "' AND A.Fin > '" + fechaHasta + "') ";
                sqlVerificar = sqlVerificar + "OR (A.Inicio > '" + fechaDesde + "' AND A.Fin < '" + fechaHasta + "') ";
                sqlVerificar = sqlVerificar + "OR (A.Inicio > '" + fechaDesde + "' AND A.Inicio < '" + fechaHasta + "' AND A.Fin > '" + fechaHasta + "') ";
                sqlVerificar = sqlVerificar + "OR (A.Inicio < '" + fechaDesde + "' AND A.Fin > '" + fechaDesde + "' AND A.Fin <'" + fechaHasta + "')) ";
                log.LogInformation("sqlVerificar: " + sqlVerificar);

                using (SqlCommand cmdVerificar = new SqlCommand(sqlVerificar, conn))
                {
                    //Ejecutar Comando
                    using (dataReader = cmdVerificar.ExecuteReader())
                    {
                        //Navegar en el Conjunto de Datos Recuperados
                        while (dataReader.Read())
                        {
                            curobj.Id = (long)(dataReader.GetValue(0));
                            if (!dataReader.IsDBNull(1)) { curobj.Code = (string)(dataReader.GetValue(1)); }
                            if (!dataReader.IsDBNull(2)) { curobj.DescriptionSede = (string)(dataReader.GetValue(2)); }
                            if (!dataReader.IsDBNull(3)) { curobj.DescriptionUnidadNegocio = (string)(dataReader.GetValue(3)); }
                            respuestaVerifica = 1;
                        }
                    }

                    log.LogInformation("respuestaVerifica: " + respuestaVerifica.ToString());
                    log.LogInformation("Fecha Inicio: " + curentity.Inicio.ToString());
                    log.LogInformation("Fecha Fin: " + curentity.Fin.ToString());
                }
                /*if (respuestaVerifica != 0)
                {
                    return "La Auditoría " + curobj.Code + " de la sede " + curobj.DescriptionSede + " (Especialidad " + curobj.DescriptionUnidadNegocio + ") se encuentra dentro de éste rango de fechas.";
                }//*/





                var textselectpart1 = "INSERT INTO auditoria.Auditoria (  ";
                var textselectpart2 = " output INSERTED.ID VALUES( ";

                textselectpart1 = textselectpart1 + " Created_By, Created_Date, Last_Updated_By, Last_Updated_Date";
                textselectpart2 = textselectpart2 + " @Created_By, @Created_Date, @Last_Updated_By, @Last_Updated_Date";

                if (curentity.Id != 0)
                {
                    textselectpart1 = textselectpart1 + ",Id";
                    textselectpart2 = textselectpart2 + ",@Id";
                }
                if (curentity.Code != null)
                {
                    textselectpart1 = textselectpart1 + ",Code";
                    textselectpart2 = textselectpart2 + ",@Code";
                }
                if (curentity.Description != null)
                {
                    textselectpart1 = textselectpart1 + ",Description";
                    textselectpart2 = textselectpart2 + ",@Description";
                }
                if (curentity.SedeId != 0)
                {
                    textselectpart1 = textselectpart1 + ",SedeId";
                    textselectpart2 = textselectpart2 + ",@SedeId";
                }
                if (curentity.TipoId != 0)
                {
                    textselectpart1 = textselectpart1 + ",TipoId";
                    textselectpart2 = textselectpart2 + ",@TipoId";
                }
                if (curentity.StatusId != 0)
                {
                    textselectpart1 = textselectpart1 + ",StatusId";
                    textselectpart2 = textselectpart2 + ",@StatusId";
                }
                if (curentity.Inicio != null)
                {
                    textselectpart1 = textselectpart1 + ",Inicio";
                    textselectpart2 = textselectpart2 + ",@Inicio";
                }
                if (curentity.Fin != null)
                {
                    textselectpart1 = textselectpart1 + ",Fin";
                    textselectpart2 = textselectpart2 + ",@Fin";
                }
                if (curentity.ProgramaAuditoriaId != 0)
                {
                    textselectpart1 = textselectpart1 + ",ProgramaAuditoriaId";
                    textselectpart2 = textselectpart2 + ",@ProgramaAuditoriaId";
                }
                if (curentity.StatusEvaluacionId != 0)
                {
                    textselectpart1 = textselectpart1 + ",StatusEvaluacionId";
                    textselectpart2 = textselectpart2 + ",@StatusEvaluacionId";
                }
                textselectpart1 = textselectpart1 + " ) ";
                textselectpart2 = textselectpart2 + " ); ";

                var StrQuery = textselectpart1 + textselectpart2;
                //End - Manejo de Parametros



                log.LogInformation("StrQuery:" + StrQuery);

                //ShipDate < GetDate();

                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    if (curentity.Id != 0) cmd.Parameters.AddWithValue("@Id", curentity.Id);
                    if (curentity.Code != null) cmd.Parameters.AddWithValue("@Code", curentity.Code);
                    if (curentity.Description != null) cmd.Parameters.AddWithValue("@Description", curentity.Description);
                    if (curentity.SedeId != 0) cmd.Parameters.AddWithValue("@SedeId", curentity.SedeId);
                    if (curentity.TipoId != 0) cmd.Parameters.AddWithValue("@TipoId", curentity.TipoId);
                    if (curentity.StatusId != 0) cmd.Parameters.AddWithValue("@StatusId", curentity.StatusId);
                    if (curentity.Inicio != null) cmd.Parameters.AddWithValue("@Inicio", curentity.Inicio);
                    if (curentity.Fin != null) cmd.Parameters.AddWithValue("@Fin", curentity.Fin);
                    cmd.Parameters.AddWithValue("@Created_By", curentity.Created_By);
                    cmd.Parameters.AddWithValue("@Created_Date", curentity.Created_Date);
                    cmd.Parameters.AddWithValue("@Last_Updated_By", curentity.Last_Updated_By);
                    cmd.Parameters.AddWithValue("@Last_Updated_Date", curentity.Last_Updated_Date);
                    if (curentity.ProgramaAuditoriaId != 0) cmd.Parameters.AddWithValue("@ProgramaAuditoriaId", curentity.ProgramaAuditoriaId);
                    if (curentity.StatusEvaluacionId != 0) cmd.Parameters.AddWithValue("@StatusEvaluacionId", curentity.StatusEvaluacionId);
                    //if( curentity.Code_Normas != null ) cmd.Parameters.AddWithValue("@Code_Normas", curentity.Code_Normas);

                    //long modified =(long)cmd.ExecuteScalar();
                    var modified = cmd.ExecuteScalar();
                    //curentity.id = Convert.ToInt64(modified);
                    newlongid = Convert.ToInt64(modified);
                    log.LogInformation("modified:" + modified);

                    // Se agregan las NOrmas por Auditoria
                    if (newlongid != 0)
                    {
                        string strNormaQuery = "";
                        string CodigoNormas = curentity.Code_Normas;
                        var Normas = CodigoNormas.Split(',');
                        foreach (var item in Normas)
                        {
                            strNormaQuery = strNormaQuery + "INSERT INTO auditoria.Auditoria_Norma (AuditoriaId,NormaCode) VALUES (" + newlongid.ToString() + ", '" + item + "');";
                        }
                        if (!string.IsNullOrEmpty(strNormaQuery))
                        {
                            using (SqlCommand cmdNormas = new SqlCommand(strNormaQuery, conn))
                            {
                                var modifiedNormas = cmdNormas.ExecuteScalar();
                            }
                        }
                        log.LogInformation("strNormaQuery:" + strNormaQuery);
                    }
                }
                if (conn.State == System.Data.ConnectionState.Open)
                    conn.Close();

                //  return curobj;
                return newlongid.ToString();
            }

        }
        catch (Exception ex)
        {
            /*curobj              = new especialidadall();        
            curobj.Id           = 0;
            curobj.Code         = "Null";
            curobj.Description  = System.Convert.ToString(ex.Message);*/
            log.LogInformation("catch::" + ex.Message);
            //System.Convert.ToString(ex.Message);
            newlongid = -1;
        }
        return newlongid.ToString();
    }



    public auditoriaall funPutAuditoriaAll(ILogger log, long curid, auditoriaall curentity)
    {

        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
        log.LogInformation("AUDITORIA :" + curid);
        //Lista de Objetos
        long newlongid;
        DateTime Last_Update_Date = DateTime.Now;

        auditoriaall curobj;
        string vvcomodin = "";
        curobj = curentity;

        //SQL Objects
        SqlDataReader dataReader;
        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();

                // Verifico que Fechas no se crucen
                //if(curentity.Inicio!=DateTime.MinValue && curentity.Fin!=DateTime.MinValue){
                //    int respuestaVerifica = 0;
                //    string fechaDesde = curentity.Inicio.ToString("yyyy-MM-dd");
                //    string fechaHasta = curentity.Fin.ToString("yyyy-MM-dd");
                //    string sqlVerificar = "SELECT COUNT(*) AS CantidadCoincidencias FROM [auditoria].[Auditoria] ";
                //    sqlVerificar = sqlVerificar + "WHERE ProgramaAuditoriaId = " + curentity.ProgramaAuditoriaId.ToString() + " AND [Id] <> " + curid.ToString() + " ";
                //    sqlVerificar = sqlVerificar + "AND ((Inicio = '" + fechaDesde + "' OR Fin = '" + fechaHasta + "' OR Inicio = '" + fechaHasta + "' OR Fin = '" + fechaDesde + "') ";
                //    sqlVerificar = sqlVerificar + "OR (Inicio < '" + fechaDesde + "' AND Fin > '" + fechaDesde + "') ";
                //    sqlVerificar = sqlVerificar + "OR (Inicio < '" + fechaHasta + "' AND Fin > '" + fechaHasta + "') ";
                //    sqlVerificar = sqlVerificar + "OR (Inicio > '" + fechaDesde + "' AND Fin < '" + fechaHasta + "') ";
                //    sqlVerificar = sqlVerificar + "OR (Inicio > '" + fechaDesde + "' AND Inicio < '" + fechaHasta + "' AND Fin > '" + fechaHasta + "') ";
                //    sqlVerificar = sqlVerificar + "OR (Inicio < '" + fechaDesde + "' AND Fin > '" + fechaDesde + "' AND Fin <'" + fechaHasta + "')) ";
                //    log.LogInformation("sqlVerificar: " + sqlVerificar);

                //    using (SqlCommand cmdVerificar = new SqlCommand(sqlVerificar, conn))
                //    {
                //        var modified = cmdVerificar.ExecuteScalar();
                //        respuestaVerifica = Convert.ToInt32(modified);
                //        log.LogInformation("respuestaVerifica: " + respuestaVerifica.ToString());
                //        log.LogInformation("modified: " + modified.ToString());
                //        log.LogInformation("Fecha Inicio: " + curentity.Inicio.ToString());
                //        log.LogInformation("Fecha Fin: " + curentity.Fin.ToString());
                //    }
                //    if (respuestaVerifica != 0) 
                //    {
                //        curobj.Code = "-1";
                //        curobj.Description = "Se ha ingresado fechas que se cruzan";
                //        return curobj;
                //    }  
                //}




                // Verifico que Fechas no se crucen
                /*if (curentity.Inicio != DateTime.MinValue && curentity.Fin != DateTime.MinValue)
                {
                    int respuestaVerifica = 0;
                    string fechaDesde = curentity.Inicio.ToString("yyyy-MM-dd");
                    string fechaHasta = curentity.Fin.ToString("yyyy-MM-dd");
                    string sqlVerificar = "SELECT A.Id, A.Code, s.Description as Sede, e.Description as Especialidad FROM [auditoria].[Auditoria] A ";
                    sqlVerificar = sqlVerificar + "inner join [auditoria].[Sede] s ON s.Id = A.SedeId ";
                    sqlVerificar = sqlVerificar + "inner join [auditoria].[Programa_Auditoria] p ON p.Id = A.ProgramaAuditoriaId ";
                    sqlVerificar = sqlVerificar + "inner join [auditoria].[Especialidad] e ON e.Id = p.EspecialidadId ";
                    //sqlVerificar = sqlVerificar + "WHERE A.ProgramaAuditoriaId = " + curentity.ProgramaAuditoriaId.ToString() + " AND A.[Id] <> " + curid.ToString() + " ";
                    sqlVerificar = sqlVerificar + "WHERE A.SedeId = " + curentity.SedeId.ToString() + " ";
                    sqlVerificar = sqlVerificar + "AND ((A.Inicio = '" + fechaDesde + "' OR A.Fin = '" + fechaHasta + "' OR A.Inicio = '" + fechaHasta + "' OR A.Fin = '" + fechaDesde + "') ";
                    sqlVerificar = sqlVerificar + "OR (A.Inicio < '" + fechaDesde + "' AND A.Fin > '" + fechaDesde + "') ";
                    sqlVerificar = sqlVerificar + "OR (A.Inicio < '" + fechaHasta + "' AND A.Fin > '" + fechaHasta + "') ";
                    sqlVerificar = sqlVerificar + "OR (A.Inicio > '" + fechaDesde + "' AND A.Fin < '" + fechaHasta + "') ";
                    sqlVerificar = sqlVerificar + "OR (A.Inicio > '" + fechaDesde + "' AND A.Inicio < '" + fechaHasta + "' AND A.Fin > '" + fechaHasta + "') ";
                    sqlVerificar = sqlVerificar + "OR (A.Inicio < '" + fechaDesde + "' AND A.Fin > '" + fechaDesde + "' AND A.Fin <'" + fechaHasta + "')) ";
                    log.LogInformation("sqlVerificar: " + sqlVerificar);

                    using (SqlCommand cmdVerificar = new SqlCommand(sqlVerificar, conn))
                    {
                        //Ejecutar Comando
                        using (dataReader = cmdVerificar.ExecuteReader())
                        {
                            //Navegar en el Conjunto de Datos Recuperados
                            while (dataReader.Read())
                            {
                                curobj.Id = (long)(dataReader.GetValue(0));
                                if (!dataReader.IsDBNull(1)) { curobj.Code = (string)(dataReader.GetValue(1)); }
                                if (!dataReader.IsDBNull(2)) { curobj.DescriptionSede = (string)(dataReader.GetValue(2)); }
                                if (!dataReader.IsDBNull(3)) { curobj.DescriptionUnidadNegocio = (string)(dataReader.GetValue(3)); }
                                respuestaVerifica = 1;
                            }
                        }

                        log.LogInformation("respuestaVerifica: " + respuestaVerifica.ToString());
                        log.LogInformation("Fecha Inicio: " + curentity.Inicio.ToString());
                        log.LogInformation("Fecha Fin: " + curentity.Fin.ToString());
                    }
                    if (respuestaVerifica != 0) //como es un update 
                    {
                        curobj.Description = "La Auditoría " + curobj.Code + " de la sede " + curobj.DescriptionSede + " (Especialidad " + curobj.DescriptionUnidadNegocio + ") se encuentra dentro de éste rango de fechas.";
                        curobj.Code = "-1";
                        return curobj;
                    }
                }//*/




                //Start - Manejo de Parametros
                var textselectpart1 = "UPDATE auditoria.Auditoria SET ";
                var textselectpart2 = " WHERE 1=1 AND Id = @Id  ";
                textselectpart1 = textselectpart1 + " Last_Updated_By = @Last_Updated_By , Last_Updated_Date = '" + Last_Update_Date.ToString() + "' ";

                if (curentity.Id != 0)
                { textselectpart1 = textselectpart1 + ", Id = @Id "; }
                if (curentity.Code != null)
                { textselectpart1 = textselectpart1 + ", Code = @Code"; }
                if (curentity.Description != null)
                { textselectpart1 = textselectpart1 + ", Description = @Description"; }
                if (curentity.SedeId != 0)
                { textselectpart1 = textselectpart1 + ", SedeId = @SedeId "; }
                if (curentity.TipoId != 0)
                { textselectpart1 = textselectpart1 + ", TipoId = @TipoId "; }
                if (curentity.StatusId != 0)
                { textselectpart1 = textselectpart1 + ", StatusId = @StatusId "; }
                if (curentity.Inicio != DateTime.MinValue)
                { textselectpart1 = textselectpart1 + ", Inicio = @Inicio"; }
                if (curentity.Fin != DateTime.MinValue)
                { textselectpart1 = textselectpart1 + ", Fin = @Fin"; }
                if (curentity.ProgramaAuditoriaId != 0)
                { textselectpart1 = textselectpart1 + ", ProgramaAuditoriaId = @ProgramaAuditoriaId "; }
                if (curentity.StatusEvaluacionId != 0)
                { textselectpart1 = textselectpart1 + ", StatusEvaluacionId = @StatusEvaluacionId "; }

                textselectpart2 = textselectpart2 + " ; ";

                var StrQuery = textselectpart1 + textselectpart2;
                //End - Manejo de Parametros

                // Se agregan las NOrmas por Auditoria
                if (curentity.Code_Normas != null)
                {
                    string strNormaQuery = "DELETE FROM auditoria.Auditoria_Norma WHERE AuditoriaId = " + curid.ToString() + ";";
                    using (SqlCommand cmdNormas = new SqlCommand(strNormaQuery, conn))
                    {
                        var modifiedNormas = cmdNormas.ExecuteNonQuery();
                    }
                    log.LogInformation("strNormaQuery:" + strNormaQuery);
                    string strNuevasNormaQuery = "";
                    string CodigoNormas = curentity.Code_Normas;
                    var Normas = CodigoNormas.Split(',');
                    foreach (var item in Normas)
                    {
                        strNuevasNormaQuery = strNuevasNormaQuery + "INSERT INTO auditoria.Auditoria_Norma (AuditoriaId,NormaCode) VALUES (" + curid.ToString() + ", '" + item + "');";
                    }
                    if (!string.IsNullOrEmpty(strNuevasNormaQuery))
                    {
                        StrQuery = StrQuery + strNuevasNormaQuery;
                    }
                }

                log.LogInformation("StrQuery:" + StrQuery);

                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    cmd.Parameters.AddWithValue("@Id", curid);

                    if (curentity.Code != null) cmd.Parameters.AddWithValue("@Code", curentity.Code);
                    if (curentity.Description != null) cmd.Parameters.AddWithValue("@Description", curentity.Description);
                    if (curentity.SedeId != 0) cmd.Parameters.AddWithValue("@SedeId", curentity.SedeId);
                    if (curentity.TipoId != 0) cmd.Parameters.AddWithValue("@TipoId", curentity.TipoId);
                    if (curentity.StatusId != 0) cmd.Parameters.AddWithValue("@StatusId", curentity.StatusId);
                    if (curentity.Inicio != DateTime.MinValue) cmd.Parameters.AddWithValue("@Inicio", curentity.Inicio);
                    if (curentity.Fin != DateTime.MinValue) cmd.Parameters.AddWithValue("@Fin", curentity.Fin);
                    cmd.Parameters.AddWithValue("@Last_Updated_By", curentity.Last_Updated_By);
                    cmd.Parameters.AddWithValue("@Last_Updated_Date", curentity.Last_Updated_Date);
                    if (curentity.ProgramaAuditoriaId != 0) cmd.Parameters.AddWithValue("@ProgramaAuditoriaId", curentity.ProgramaAuditoriaId);
                    if (curentity.StatusEvaluacionId != 0) cmd.Parameters.AddWithValue("@StatusEvaluacionId", curentity.StatusEvaluacionId);
                    if (curentity.Code_Normas != null) cmd.Parameters.AddWithValue("@Code_Normas", curentity.Code_Normas);

                    var modified = cmd.ExecuteNonQuery();
                    log.LogInformation("modified:" + modified);
                }

                //StrQuery = "UPDATE auditoria.Programa_Auditoria SET StatusId = @StatusId WHERE 1=1 AND Id = @Id; ";
                log.LogInformation("curentity.StatusEvaluacionId:" + curentity.StatusEvaluacionId);
                //if (curentity.StatusEvaluacionId == 1 || curentity.StatusEvaluacionId == 3)
                if (curentity.StatusEvaluacionId == 1 )
                {
                    StrQuery = "UPDATE auditoria.Programa_Auditoria SET StatusId = 2 WHERE 1=1 AND Id = " + curentity.ProgramaAuditoriaId + "; ";
                    log.LogInformation("StrQuery:" + StrQuery);
                    using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                    {
                        //cmd.Parameters.AddWithValue("@Id", curentity.ProgramaAuditoriaId);
                        //cmd.Parameters.AddWithValue("@StatusId", 2);
                        var modified = cmd.ExecuteNonQuery();
                        log.LogInformation("modified:" + modified);
                    }
                }//*/
                //curobj.DescriptionSede = "UPDATE auditoria.Programa_Auditoria SET StatusId = 2 WHERE 1=1 AND Id = "+curentity.ProgramaAuditoriaId+"; ";

                if (conn.State == System.Data.ConnectionState.Open)
                    conn.Close();
                return curobj;
            }
        }
        catch (Exception ex)
        {
            log.LogInformation("catch:" + ex.Message);
            newlongid = -1;
        }
        return curobj;
    }


    /**
     * Suspender una auditoria 
     */
    public long funSuspenderAuditoriaAll(ILogger log, long curid, string Motivo, string Created_By)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
        DateTime Created_Date = DateTime.Now;
        long status = 0;

        //SQL Objects
        SqlDataReader dataReader;

        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();
                //Start - Manejo de Parametros
                var StrQuery = "UPDATE auditoria.Auditoria SET StatusId = 7 WHERE Id = @Id";

                log.LogInformation("StrQuery:" + StrQuery);

                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    cmd.Parameters.AddWithValue("@Id", curid);

                    var modified = cmd.ExecuteNonQuery();
                    log.LogInformation("Suspender:" + modified);

                }

                var textselectpart1 = " INSERT INTO [auditoria].[Suspension] (  ";
                var textselectpart2 = " output INSERTED.Id VALUES( ";
                textselectpart1 += " AuditoriaId, Description_Motivo, Created_By, Created_Date ) ";
                textselectpart2 += " @AuditoriaId, @Description_Motivo, @Created_By, @Created_Date ); ";

                var SuspQuery = textselectpart1 + textselectpart2;

                log.LogInformation("SuspQuery:" + SuspQuery);

                using (SqlCommand cmd = new SqlCommand(SuspQuery, conn))
                {
                    cmd.Parameters.AddWithValue("@AuditoriaId", curid);
                    cmd.Parameters.AddWithValue("@Description_Motivo", Motivo);
                    cmd.Parameters.AddWithValue("@Created_By", Created_By);
                    cmd.Parameters.AddWithValue("@Created_Date", Created_Date);

                    var modified = cmd.ExecuteNonQuery();
                    log.LogInformation("Suspender:" + modified);

                }

                if (conn.State == System.Data.ConnectionState.Open)
                    conn.Close();

                status = 1;
            }

        }
        catch (Exception ex)
        {
            //auditoriaall curobj = new auditoriaall();
            status = 0;
        }//*/
        return status;

    }


    public long funDeleteAuditoriaAll(ILogger log, long curid, string usuariodelete)
    {

        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);

        //Lista de Objetos
        long vnupdaterows = 0;
        string vvcomodin = "";
        DateTime Deleted_Date = DateTime.Now;


        //SQL Objects
        SqlDataReader dataReader;

        try
        {

            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();

                //Start - Manejo de Parametros
                var textselectpart1 = "UPDATE auditoria.Auditoria ";
                textselectpart1 = textselectpart1 + " SET Deleted_By = '" + usuariodelete + "' , Deleted_Date = '" + Deleted_Date.ToString() + "' , Deleted = 1 ";
                var textselectpart2 = " WHERE 1=1 AND id = @vncurid  ";

                var StrQuery = textselectpart1 + textselectpart2;
                //End - Manejo de Parametros

                log.LogInformation("StrQuery:" + StrQuery);

                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    cmd.Parameters.AddWithValue("@vncurid", curid);

                    //cmd.Parameters.AddWithValue("@vvdeletedby", deletedby);

                    var modified = cmd.ExecuteNonQuery();
                    vnupdaterows = Convert.ToInt64(modified);
                    log.LogInformation("DELETE:" + modified);
                    log.LogInformation("DELETE row:" + vnupdaterows);
                }


                if (conn.State == System.Data.ConnectionState.Open)
                    conn.Close();

                return vnupdaterows;

            }

        }
        catch (Exception ex)
        {
            auditoriaall curobj = new auditoriaall();
            curobj.Id = 0;
        }
        return vnupdaterows;
    }

    public int funPutEstatusAuditoria(ILogger log, long curid, int StatusId, string Last_Updated_By)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
        
        int resp = 0;
        DateTime Last_Updated_Date = DateTime.Now;

        try
        {

            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();

                //Start - Manejo de Parametros
                var StrQuery = "UPDATE auditoria.Auditoria SET StatusID = @StatusId, Last_Updated_Date = switchoffset (CONVERT(datetimeoffset, GETDATE()), '-05:00'), Last_Updated_By = @Last_Updated_By ";
                StrQuery += " WHERE 1=1 AND Id = @vncurid  ";

                log.LogInformation("StrQuery:" + StrQuery);

                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {

                    cmd.Parameters.AddWithValue("@vncurid", curid);
                    cmd.Parameters.AddWithValue("@StatusId", StatusId);
                    //cmd.Parameters.AddWithValue("@Last_Updated_Date", Last_Updated_Date);
                    cmd.Parameters.AddWithValue("@Last_Updated_By", Last_Updated_By);

                    var modified = cmd.ExecuteNonQuery();
                    log.LogInformation("Update StatusId:" + modified);
                }

                if (conn.State == System.Data.ConnectionState.Open)
                    conn.Close();

                resp = 1;
            }
        }
        catch (Exception ex)
        {
            log.LogInformation("catch:" + ex.Message);
        }
        return resp;

    }

    public long funValidarFechasCoincidentesAll(ILogger log, long curid, auditoriaall curentity)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);

        //Lista de Objetos
        long total = 0;
        long Id = 0;
        log.LogInformation("Ingreso Metodo:");
        log.LogInformation("curentity:" + curentity.SedeId);
        //SQL Objects
        SqlDataReader dataReader;
        try
        {

            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {

                conn.Open();

                //Start - Manejo de Parametros actualizar fechas
                string fechaDesde = curentity.Inicio.ToString("yyyy-MM-dd");
                string fechaHasta = curentity.Fin.ToString("yyyy-MM-dd");
                //var textselectpart1 = "SELECT A.Id AS Id FROM auditoria.Auditoria A WHERE A.SedeId = 12 AND StatusId != 7 AND A.Inicio > '2020-11-25' AND A.Fin < '2020-12-28'";
                var textselectpart1 = "SELECT A.Id AS Id FROM auditoria.Auditoria A WHERE A.SedeId = " + curentity.SedeId + " AND StatusId != 7 "+
                    "AND ( (A.Inicio <= '" + fechaDesde + "' AND A.Fin >= '" + fechaHasta + "')  "+
                        " OR ( A.Inicio >= '" + fechaDesde + "' AND A.Fin <= '" + fechaHasta + "')  ) " +
                    "AND A.Id != " + curid + " ;";
                //AND A.Id != 206
                var StrQuery = textselectpart1;

                log.LogInformation("StrQuery:" + StrQuery);

                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                    using (dataReader = cmd.ExecuteReader())
                    {
                        while (dataReader.Read())
                        {
                            total += 1;
                            Id = (long)(dataReader.GetValue(0));
                        }
                    }
                }

                log.LogInformation("-------Id:" + Id);

                if (conn.State == System.Data.ConnectionState.Open)
                    conn.Close();


            }//*/
        }
        catch (Exception ex)
        {
            log.LogInformation("catch:" + ex.Message);
            Id = -1;
        }

        return Id;

    }

}


public class auditoriaall
{
    public long Id { get; set; }
    public string Code { get; set; }
    public string Description { get; set; }
    public long SedeId { get; set; }
    public long TipoId { get; set; }
    public int StatusId { get; set; }
    public DateTime Inicio { get; set; }
    public DateTime Fin { get; set; }
    public long ProgramaAuditoriaId { get; set; }
    public int StatusEvaluacionId { get; set; }
    public string CodeSede { get; set; }
    public string DescriptionSede { get; set; }
    public string CodeTipoAuditoria { get; set; }
    public string DescriptionAuditoria { get; set; }
    public string DescriptionStatus { get; set; }
    public string CodeUnidadNegocio { get; set; }
    public string DescriptionUnidadNegocio { get; set; }
    public string DescriptionStatusEvaluacion { get; set; }
    public string Code_Normas { get; set; }
    public string Created_By { get; set; }
    public DateTime Created_Date { get; set; }
    public string Last_Updated_By { get; set; }
    public DateTime Last_Updated_Date { get; set; }
    public string Deleted_By { get; set; }
    public DateTime Deleted_Date { get; set; }
    public Boolean Deleted { get; set; }
}