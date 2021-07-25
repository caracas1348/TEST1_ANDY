using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

class DataInformeAuditoriaAll
{
    
    public async Task<informeAuditoriaAll> funPostInformeAuditoria(ILogger log, informeAuditoriaAll curentity)
    {

        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit",EnvironmentVariableTarget.Process);

        // id del nuevo registro
        int newlongid = 0;
        int count     = 0;
        int i         = 0;
        Console.WriteLine("Ingreso Metodo I: "+i);

        // objetos
        informeAuditoriaAll informeAuditoriaAll = new informeAuditoriaAll();
        List<AuditoriaAuditor> AuditoriaAuditor = new List<AuditoriaAuditor>();
        List<HallazgosGet> HallazgosGet         = new List<HallazgosGet>();
        //SQL Objects
        SqlDataReader dataReader;

        curentity.Id        = 0;
        informeAuditoriaAll = curentity;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            // 1.  create a command object identifying the stored procedure
            SqlCommand cmd = new SqlCommand("auditoria.get_auditoria_auditor", conn);

            // 2. set the command object so it knows to execute a stored procedure
            cmd.CommandType = CommandType.StoredProcedure;

            // 3. add parameter to command, which will be passed to the stored procedure
            cmd.Parameters.Add(new SqlParameter("@AuditoriaId", curentity.AuditoriaId));

            //Ejecutar Comando
            using (dataReader = await cmd.ExecuteReaderAsync())
            {
                //Navegar en el Conjunto de Datos Recuperados
                while (dataReader.Read())
                {
                    AuditoriaAuditor curbobj_ = new AuditoriaAuditor();
                    if (!dataReader.IsDBNull(dataReader.GetOrdinal("AuditorId"))) { curbobj_.AuditorId = (int)(dataReader.GetValue(dataReader.GetOrdinal("AuditorId"))); }
                    if (!dataReader.IsDBNull(dataReader.GetOrdinal("NormaId"))) { curbobj_.NormaId     = (long)(dataReader.GetValue(dataReader.GetOrdinal("NormaId"))); }
                    if (!dataReader.IsDBNull(dataReader.GetOrdinal("Name"))) { curbobj_.NameAuditor    = (string)(dataReader.GetValue(dataReader.GetOrdinal("Name"))); }
                    if (!dataReader.IsDBNull(dataReader.GetOrdinal("Tipo"))) { curbobj_.Tipo           = (int)(dataReader.GetValue(dataReader.GetOrdinal("Tipo"))); }
                    if (!dataReader.IsDBNull(dataReader.GetOrdinal("Cargo"))) { curbobj_.Cargo         = (string)(dataReader.GetValue(dataReader.GetOrdinal("Cargo"))); }

                    AuditoriaAuditor.Add(curbobj_);
                }
                log.LogInformation("los hallazgos encontrados");
                //los hallazgos encontrados
                dataReader.NextResult();
                while (dataReader.Read())
                {
                    HallazgosGet curbobj_ = new HallazgosGet();
                    if (!dataReader.IsDBNull(dataReader.GetOrdinal("TipoHallazgoId"))) { curbobj_.TipoHallazgoId         = (long)(dataReader.GetValue(dataReader.GetOrdinal("TipoHallazgoId"))); }
                    if (!dataReader.IsDBNull(dataReader.GetOrdinal("ProgramacionPlanId"))) { curbobj_.ProgramacionPlanId = (long)(dataReader.GetValue(dataReader.GetOrdinal("ProgramacionPlanId"))); }
                    if (!dataReader.IsDBNull(dataReader.GetOrdinal("RequisitoId"))) { curbobj_.RequisitoId               = (long)(dataReader.GetValue(dataReader.GetOrdinal("RequisitoId"))); }
                    if (!dataReader.IsDBNull(dataReader.GetOrdinal("Requisito"))) { curbobj_.Requisito                     = (string)(dataReader.GetValue(dataReader.GetOrdinal("Requisito"))); }
                    if (!dataReader.IsDBNull(dataReader.GetOrdinal("SedeId"))) { curbobj_.SedeId                         = (long)(dataReader.GetValue(dataReader.GetOrdinal("SedeId"))); }
                    if (!dataReader.IsDBNull(dataReader.GetOrdinal("NormaId"))) { curbobj_.NormaId                       = (long)(dataReader.GetValue(dataReader.GetOrdinal("NormaId"))); }
                    if (!dataReader.IsDBNull(dataReader.GetOrdinal("FuenteId"))) { curbobj_.FuenteId                     = (long)(dataReader.GetValue(dataReader.GetOrdinal("FuenteId"))); }
                    if (!dataReader.IsDBNull(dataReader.GetOrdinal("UnidadNegocioId"))) { curbobj_.UnidadNegocioId       = (long)(dataReader.GetValue(dataReader.GetOrdinal("UnidadNegocioId"))); }
                    if (!dataReader.IsDBNull(dataReader.GetOrdinal("Hallazgo"))) { curbobj_.Hallazgo                     = (string)(dataReader.GetValue(dataReader.GetOrdinal("Hallazgo"))); }
                    if (!dataReader.IsDBNull(dataReader.GetOrdinal("EjecucionDate"))) { curbobj_.EjecucionDate           = (DateTime)(dataReader.GetValue(dataReader.GetOrdinal("EjecucionDate"))); }
                    if (!dataReader.IsDBNull(dataReader.GetOrdinal("ReportanteName"))) { curbobj_.ReportanteName         = (string)(dataReader.GetValue(dataReader.GetOrdinal("ReportanteName"))); }
                    if (!dataReader.IsDBNull(dataReader.GetOrdinal("ReportanteCargo"))) { curbobj_.ReportanteCargo       = (string)(dataReader.GetValue(dataReader.GetOrdinal("ReportanteCargo"))); }
                    if (!dataReader.IsDBNull(dataReader.GetOrdinal("ReportanteUserHash"))) { curbobj_.ReportanteUserHash = (string)(dataReader.GetValue(dataReader.GetOrdinal("ReportanteUserHash"))); }
                    if (!dataReader.IsDBNull(dataReader.GetOrdinal("Responsable"))) { curbobj_.ResponsableCargo          = (string)(dataReader.GetValue(dataReader.GetOrdinal("Responsable"))); }
                    if (!dataReader.IsDBNull(dataReader.GetOrdinal("Proceso"))) { curbobj_.ResponsableName               = (string)(dataReader.GetValue(dataReader.GetOrdinal("Proceso"))); }
                    log.LogInformation("curbobj_.RequisitoId"+curbobj_.RequisitoId);
                    HallazgosGet.Add(curbobj_);
                }
            }

            //Guardamos en la tabla Hallazgos 
            List<HallazgosGet> HallazgosGet2 = new List<HallazgosGet>();
            foreach (var item in HallazgosGet)
            {
                // 1.  create a command object identifying the stored procedure
                SqlCommand cmd2 = new SqlCommand("[auditoria].post_hallazgos_insert_auto", conn);
                // 2. set the command object so it knows to execute a stored procedure
                cmd2.CommandType = CommandType.StoredProcedure;
                cmd2.Parameters.Clear();

                cmd2.Parameters.AddWithValue("@TipoHallazgoId", item.TipoHallazgoId);
                cmd2.Parameters.AddWithValue("@ProgramacionPlanId", item.ProgramacionPlanId);
                cmd2.Parameters.AddWithValue("@RequisitoId", item.RequisitoId);
                cmd2.Parameters.AddWithValue("@Requisito", item.Requisito);
                cmd2.Parameters.AddWithValue("@SedeId", item.SedeId);
                cmd2.Parameters.AddWithValue("@ReportanteName", item.ReportanteName);
                cmd2.Parameters.AddWithValue("@ReportanteCargo", item.ReportanteCargo);
                cmd2.Parameters.AddWithValue("@ReportanteUserHash", item.ReportanteUserHash);
                cmd2.Parameters.AddWithValue("@ReportanteCorreo", curentity.CorreoAuditorLider);
                cmd2.Parameters.AddWithValue("@ResponsableName", item.ResponsableCargo);
                cmd2.Parameters.AddWithValue("@ResponsableCargo", "");
                cmd2.Parameters.AddWithValue("@ResponsableUserHash", "");
                cmd2.Parameters.AddWithValue("@ResponsableCorreo", "");
                cmd2.Parameters.AddWithValue("@NormaId", item.NormaId);
                cmd2.Parameters.AddWithValue("@Hallazgo", item.Hallazgo);
                cmd2.Parameters.AddWithValue("@EjecucionDate", item.EjecucionDate);
                cmd2.Parameters.AddWithValue("@FuenteId", item.FuenteId);
                cmd2.Parameters.AddWithValue("@UnidadNegocioId", item.UnidadNegocioId);
                cmd2.Parameters.AddWithValue("@AuditoriaId", curentity.AuditoriaId);
                cmd2.Parameters.AddWithValue("@Created_By", curentity.Created_By);

                log.LogInformation("@RequisitoId "+item.RequisitoId);

                SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
                output_Id.Direction    = ParameterDirection.Output;
                cmd2.Parameters.Add(output_Id);

                cmd2.CommandType = CommandType.StoredProcedure;

                await cmd2.ExecuteNonQueryAsync();

                if (output_Id.Value != DBNull.Value)
                {
                    item.Id = Convert.ToInt16(output_Id.Value);
                    Console.WriteLine("item.Id: " + item.Id);
                    HallazgosGet2.Add(item);
                }
            }
            HallazgosGet = HallazgosGet2;

            //Guardarmos en Listado_Evaluacion_Auditores
            foreach (var data in curentity.PersonasCorreos)
            {
                //List<PersonasCorreosAll> PersonasCorreosAll2 = new List<PersonasCorreosAll>();
                List<LinkEvaluacionAuditores> LinkEvaluacionAuditores = new List<LinkEvaluacionAuditores>();
                
                foreach (var item in AuditoriaAuditor)
                {

                    string hash="";
                    CodigoHash CodigoHash = new CodigoHash();
                    // CREAR CODIGO HASH PARA LA EVALUACION DE AUDITORES
                    CodigoHash = await funGenerarHashEvaluacionAuditor(log, count);
                    count++;

                    log.LogInformation("CodigoHash: " + CodigoHash.Hash+ ", count: "+count);

                    // 1.  create a command object identifying the stored procedure
                    SqlCommand cmd2 = new SqlCommand("auditoria.post_evaluacion_auditores_insert", conn);
                    // 2. set the command object so it knows to execute a stored procedure
                    cmd2.CommandType = CommandType.StoredProcedure;
                    cmd2.Parameters.Clear();

                    cmd2.Parameters.AddWithValue("@AuditoriaId", curentity.AuditoriaId);
                    cmd2.Parameters.AddWithValue("@AuditorId", item.AuditorId);
                    cmd2.Parameters.AddWithValue("@HashEvaluacionTokens", CodigoHash.Hash);
                    cmd2.Parameters.AddWithValue("@NormaId", item.NormaId);

                    cmd2.Parameters.AddWithValue("@UserIdHash", data.UserIdHash);
                    cmd2.Parameters.AddWithValue("@Nombre", data.Name);
                    cmd2.Parameters.AddWithValue("@Cargo", data.Cargo);
                    cmd2.Parameters.AddWithValue("@Correo", data.Correo);
                    cmd2.Parameters.AddWithValue("@Created_By", curentity.Created_By);
                    cmd2.Parameters.AddWithValue("@NombreAuditorLider", curentity.NombreAuditorLider);
                    cmd2.Parameters.AddWithValue("@CargoAuditorLider", curentity.CargoAuditorLider);
                    cmd2.Parameters.AddWithValue("@CorreoAuditorLider", curentity.CorreoAuditorLider);

                    SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
                    output_Id.Direction = ParameterDirection.Output;
                    cmd2.Parameters.Add(output_Id);

                    cmd2.CommandType = CommandType.StoredProcedure;

                    await cmd2.ExecuteNonQueryAsync();

                    if (output_Id.Value != DBNull.Value)
                    {
                        curentity.Id = Convert.ToInt16(output_Id.Value);
                        informeAuditoriaAll.Id = Convert.ToInt16(output_Id.Value);
                        log.LogInformation("curentity.Id: " + curentity.Id);
                        Console.WriteLine("informeAuditoriaAll.Id: " + informeAuditoriaAll.Id);
                    }
                    LinkEvaluacionAuditores curobjLinkEvaluacionAuditores = new LinkEvaluacionAuditores();
                    curobjLinkEvaluacionAuditores.ListadoEvaluacionId = curentity.Id;
                    curobjLinkEvaluacionAuditores.HashEvaluacionTokens = CodigoHash.Hash;
                    curobjLinkEvaluacionAuditores.NameAuditor = item.NameAuditor;
                    LinkEvaluacionAuditores.Add(curobjLinkEvaluacionAuditores);
                }
                informeAuditoriaAll.PersonasCorreos[i].LinkEvaluacionAuditores = LinkEvaluacionAuditores;
                i++;
            }
        }

        return informeAuditoriaAll;
    }//*/

    //Generar Codigo Hash para la evaluacion del auditor
    public async Task<CodigoHash> funGenerarHashEvaluacionAuditor(ILogger log, int count)
    {
        System.DateTime horaActual = System.DateTime.Now;
        byte[] hashValue;
        //string messageString = String.Format("'{0}'-'{1}'-'{2}'", curentity.AuditoriaId, item.AuditorId, item.NormaId);
        string messageString = String.Format("'{0}'-'{1}'", horaActual, count);
        string hash = "";
        //Create a new instance of the UnicodeEncoding class to
        //convert the string into an array of Unicode bytes.
        UnicodeEncoding ue = new UnicodeEncoding();

        //Convert the string into an array of bytes.
        byte[] messageBytes = ue.GetBytes(messageString);

        //Create a new instance of the SHA256 class to create
        //the hash value.
        SHA256 shHash = SHA256.Create();

        //Create the hash value from the array of bytes.
        hashValue = shHash.ComputeHash(messageBytes);

        //Display the hash value to the console.
        foreach (byte b in hashValue)
        {
            //Console.Write("{0} ", b);
            hash += b;
        }

        CodigoHash objHash = new CodigoHash();
        objHash.Hash = hash;

        return objHash;
    }

    // Adjuntar un archivo
    public async Task<int> funPostAdjuntoAuditoria(ILogger log,
                                                    string AuditoriaId,
                                                    string AdjuntoName,
                                                    string Adjunto,
                                                    string Created_By
                                                    )
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit",EnvironmentVariableTarget.Process);

        int resultado = 0;
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            // Abrimos la conexion con la DB
            conn.Open();

            try
            {
                // 1.  create a command object identifying the stored procedure
                SqlCommand cmd2 = new SqlCommand("auditoria.post_adjuntar_archivos_insert", conn);
                // 2. set the command object so it knows to execute a stored procedure
                cmd2.CommandType = CommandType.StoredProcedure;
                cmd2.Parameters.Clear();

                cmd2.Parameters.AddWithValue("@AuditoriaId", AuditoriaId);
                cmd2.Parameters.AddWithValue("@AdjuntoName", AdjuntoName);
                cmd2.Parameters.AddWithValue("@Adjunto", Adjunto);

                cmd2.Parameters.AddWithValue("@Created_By", Created_By);

                SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
                output_Id.Direction = ParameterDirection.Output;
                cmd2.Parameters.Add(output_Id);

                cmd2.CommandType = CommandType.StoredProcedure;

                await cmd2.ExecuteNonQueryAsync();

                if (output_Id.Value != DBNull.Value)
                {
                    resultado = Convert.ToInt16(output_Id.Value);
                    log.LogInformation("resultado: " + resultado);
                }

            }
            catch (Exception ex)
            {
                log.LogInformation("catch::" + ex.Message);
                resultado = 0;
            }
            //cerramos la conexion
            if (conn.State == System.Data.ConnectionState.Open)
                conn.Close();
            
        }

        return resultado;

    }

    // Guardar Informe PDF 
    public async Task<int> funPostGuardarInformePdf(ILogger log
                                                    , auditoriaallget auditoria
                                                    , informeAuditoriaAll curobj
                                                    )
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);

        int resultado = 0;
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            // Abrimos la conexion con la DB
            conn.Open();
            string InformeName = String.Format("InformeAuditoria-{0}.pdf", auditoria.Code);
            try
            {
                // 1.  create a command object identifying the stored procedure
                SqlCommand cmd2 = new SqlCommand("auditoria.post_adjuntar_informepdf_insert", conn);
                // 2. set the command object so it knows to execute a stored procedure
                cmd2.CommandType = CommandType.StoredProcedure;
                cmd2.Parameters.Clear();

                cmd2.Parameters.AddWithValue("@AuditoriaId", auditoria.Id);
                cmd2.Parameters.AddWithValue("@AdjuntoName", InformeName);
                cmd2.Parameters.AddWithValue("@Informe", curobj.InformePdf);
                cmd2.Parameters.AddWithValue("@Created_By", curobj.Created_By);

                SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
                output_Id.Direction = ParameterDirection.Output;
                cmd2.Parameters.Add(output_Id);

                cmd2.CommandType = CommandType.StoredProcedure;

                await cmd2.ExecuteNonQueryAsync();

                if (output_Id.Value != DBNull.Value)
                {
                    resultado = Convert.ToInt16(output_Id.Value);
                    log.LogInformation("resultado: " + resultado);
                }

            }
            catch (Exception ex)
            {
                log.LogInformation("catch::" + ex.Message);
                resultado = 0;
            }
            //cerramos la conexion
            if (conn.State == System.Data.ConnectionState.Open)
                conn.Close();
        }

        return resultado;
    }

    // Elimnar Adjuntos a un informe de Auditoria
    public async Task<int> funPostDeleteAdjunto(ILogger log
                                                ,int Id
                                                ,int AuditoriaId
                                                ,int Opc
                                                ) 
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);

        int resultado = 0;
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            // Abrimos la conexion con la DB
            conn.Open();

            try
            {
                // 1.  create a command object identifying the stored procedure
                // Eliminar Adjunto Opc = 1 y Id del adjunto
                // Eliminar Temporales Opc = 2 y AuditoriaId
                SqlCommand cmd2 = new SqlCommand("auditoria.post_adjuntar_archivos_deleted", conn);
                // 2. set the command object so it knows to execute a stored procedure
                cmd2.CommandType = CommandType.StoredProcedure;
                cmd2.Parameters.Clear();

                cmd2.Parameters.AddWithValue("@Id", Id);
                cmd2.Parameters.AddWithValue("@AuditoriaId", AuditoriaId);
                cmd2.Parameters.AddWithValue("@Opc", Opc);

                SqlParameter output_Id = new SqlParameter("@rows", SqlDbType.BigInt);
                output_Id.Direction = ParameterDirection.Output;
                cmd2.Parameters.Add(output_Id);

                cmd2.CommandType = CommandType.StoredProcedure;

                await cmd2.ExecuteNonQueryAsync();

                if (output_Id.Value != DBNull.Value)
                {
                    resultado = Convert.ToInt16(output_Id.Value);
                    log.LogInformation("resultado: " + resultado);
                }

            }
            catch (Exception ex)
            {
                log.LogInformation("catch::" + ex.Message);
                resultado = 0;
            }
            //cerramos la conexion
            if (conn.State == System.Data.ConnectionState.Open)
                conn.Close();

        }

        return resultado;
    }

    // Confirmar Adjuntos de un informe de Auditoria
    public async Task<int> funPostConfirmarAdjuntos(ILogger log
                                                , long AuditoriaId
                                                )
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);

        int resultado = 0;
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            // Abrimos la conexion con la DB
            conn.Open();

            try
            {
                // 1.  create a command object identifying the stored procedure
                // Eliminar Adjunto Opc = 1 y Id del adjunto
                // Eliminar Temporales Opc = 2 y AuditoriaId
                SqlCommand cmd2 = new SqlCommand("auditoria.post_adjuntar_archivos_confirmar", conn);
                // 2. set the command object so it knows to execute a stored procedure
                cmd2.CommandType = CommandType.StoredProcedure;
                cmd2.Parameters.Clear();

                cmd2.Parameters.AddWithValue("@AuditoriaId", AuditoriaId);

                SqlParameter output_Id = new SqlParameter("@rows", SqlDbType.BigInt);
                output_Id.Direction = ParameterDirection.Output;
                cmd2.Parameters.Add(output_Id);

                cmd2.CommandType = CommandType.StoredProcedure;

                await cmd2.ExecuteNonQueryAsync();

                if (output_Id.Value != DBNull.Value)
                {
                    resultado = Convert.ToInt16(output_Id.Value);
                    log.LogInformation("resultado: " + resultado);
                }

            }
            catch (Exception ex)
            {
                log.LogInformation("catch::" + ex.Message);
                resultado = 0;
            }
            //cerramos la conexion
            if (conn.State == System.Data.ConnectionState.Open)
                conn.Close();

        }

        return resultado;
    }

    // obtener adjuntos por AuditoriaId
    public async Task<List<Adjuntos>> funGetAdjuntosInforme(ILogger log
                                              , long AuditoriaId
                                             )
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
        List<Adjuntos> objAdjuntos = new List<Adjuntos>();
        Adjuntos objAdj = new Adjuntos();
        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();

                SqlCommand cmd = new SqlCommand("auditoria.get_adjuntar_archivos_list", conn);
                cmd.Parameters.AddWithValue("@AuditoriaId", AuditoriaId);

                cmd.CommandType = CommandType.StoredProcedure;

                //Ejecutar Comando
                using (SqlDataReader dataReader = await cmd.ExecuteReaderAsync())
                {
                    //Navegar en el Conjunto de Datos Recuperados
                    while (dataReader.Read())
                    {
                        objAdj = new Adjuntos();

                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("Id"))) { objAdj.Id = (long)(dataReader.GetValue(dataReader.GetOrdinal("Id"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("AdjuntoName"))) { objAdj.AdjuntoName = (string)(dataReader.GetValue(dataReader.GetOrdinal("AdjuntoName"))); }
                        if (!dataReader.IsDBNull(dataReader.GetOrdinal("AuditoriaId"))) { objAdj.AuditoriaId = (long)(dataReader.GetValue(dataReader.GetOrdinal("AuditoriaId"))); }

                        objAdjuntos.Add(objAdj);

                    }
                }
                conn.Close();
            }
        }
        catch (Exception ex)
        {
            objAdj = new Adjuntos();
            objAdj.Id = 0;
            objAdj.AdjuntoName = "Error en la consulta.";
            objAdjuntos.Add(objAdj);
        }

        return objAdjuntos;
    }


}

public class informeAuditoriaAll
{
    public long Id {get; set;}
    public long AuditoriaId { get; set; }
    public string InformePdf { get; set; }
    public string Created_By { get; set; }
    public string NombreAuditorLider { get; set; }
    public string CargoAuditorLider { get; set; }
    public string CorreoAuditorLider { get; set; }
    public List<PersonasCorreosAll> PersonasCorreos { get; set; }
}

public class PersonasCorreosAll
{
    public string UserIdHash { get; set; }
    public string Name { get; set; }
    public string Cargo { get; set; }
    public string Correo { get; set; }
    public List<LinkEvaluacionAuditores> LinkEvaluacionAuditores { get; set; }
}

public class LinkEvaluacionAuditores
{
    public long ListadoEvaluacionId { get; set; }
    public string HashEvaluacionTokens {get; set;}
    public string NameAuditor {get; set;}
}

public class AuditoriaAuditor
{
    public int AuditorId { get; set; }
    public long NormaId { get; set; }
    public string NameAuditor {get; set;}
    public int Tipo { get; set; }
    public string Cargo {get; set;}
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

public class CodigoHash
{
    public string Hash { get; set; }
}

public class Adjuntos 
{
    public long Id { get; set; }
    public string AdjuntoName { get; set; }
    public long AuditoriaId { get; set; }
}