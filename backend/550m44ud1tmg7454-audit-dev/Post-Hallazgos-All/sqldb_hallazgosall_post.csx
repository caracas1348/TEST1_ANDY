using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataHallazgosPostAll
{
    string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);

    public async Task<HallazgosPost> funPostHallazgos(HallazgosPost curentity)
    {
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            if(curentity.EnviarCorreo == 1)
            {
                curentity.StatusHallazgoId = 2;
            }
            else
            {
                curentity.StatusHallazgoId = 1;
            }

            SqlCommand cmd = new SqlCommand("[auditoria].[post_hallazgo_insert]", conn);

            cmd.Parameters.AddWithValue("@FuenteId", curentity.FuenteId);
            cmd.Parameters.AddWithValue("@TipoHallazgoId", curentity.TipoHallazgoId);
            cmd.Parameters.AddWithValue("@StatusHallazgoId", curentity.StatusHallazgoId);
            cmd.Parameters.AddWithValue("@NormaId", curentity.NormaId);
            cmd.Parameters.AddWithValue("@UnidadNegocioId", curentity.UnidadNegocioId);
            cmd.Parameters.AddWithValue("@SedeId", curentity.SedeId);
            cmd.Parameters.AddWithValue("@AnalisisCausa", curentity.AnalisisCausa);
            cmd.Parameters.AddWithValue("@ResponsableName", curentity.ResponsableName);
            cmd.Parameters.AddWithValue("@ResponsableCorreo", curentity.ResponsableCorreo);
            cmd.Parameters.AddWithValue("@ResponsableCargo", curentity.ResponsableCargo);
            cmd.Parameters.AddWithValue("@ResponsableUserHash", curentity.ResponsableUserHash);
            cmd.Parameters.AddWithValue("@ReportanteName", curentity.ReportanteName);
            cmd.Parameters.AddWithValue("@ReportanteCorreo", curentity.ReportanteCorreo);
            cmd.Parameters.AddWithValue("@ReportanteCargo", curentity.ReportanteCargo);
            cmd.Parameters.AddWithValue("@ReportanteUserHash", curentity.ReportanteUserHash);
            cmd.Parameters.AddWithValue("@Hallazgo", curentity.Hallazgo);
            cmd.Parameters.AddWithValue("@Created_By", curentity.Created_By);

            SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
            output_Id.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                curentity.Id = Convert.ToInt64(output_Id.Value);
            }
        }

        return curentity;
    }

    public async Task<int> funPutHallazgos(HallazgosPost curentity)
    {
        int resultado = 0;

        if(curentity.EnviarCorreo == 1)
        {
            curentity.StatusHallazgoId = 2;
        }
        else
        {
            if(curentity.ResponsableUserHash!="")
                curentity.StatusHallazgoId = 2;
            else
                curentity.StatusHallazgoId = 1;
        }

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("[auditoria].[put_hallazgo]", conn);

            cmd.Parameters.AddWithValue("@Id", curentity.Id);
            cmd.Parameters.AddWithValue("@TipoHallazgoId", curentity.TipoHallazgoId);
            cmd.Parameters.AddWithValue("@NormaId", curentity.NormaId);
            cmd.Parameters.AddWithValue("@UnidadNegocioId", curentity.UnidadNegocioId);
            cmd.Parameters.AddWithValue("@SedeId", curentity.SedeId);
            cmd.Parameters.AddWithValue("@AnalisisCausa", curentity.AnalisisCausa);
            cmd.Parameters.AddWithValue("@Hallazgo", curentity.Hallazgo);
            cmd.Parameters.AddWithValue("@StatusHallazgoId", curentity.StatusHallazgoId);
            cmd.Parameters.AddWithValue("@ResponsableName", curentity.ResponsableName);
            cmd.Parameters.AddWithValue("@ResponsableCorreo", curentity.ResponsableCorreo);
            cmd.Parameters.AddWithValue("@ResponsableCargo", curentity.ResponsableCargo);
            cmd.Parameters.AddWithValue("@ResponsableUserHash", curentity.ResponsableUserHash);
            cmd.Parameters.AddWithValue("@Last_Updated_By", curentity.Last_Updated_By);

            SqlParameter output_Id = new SqlParameter("@rows", SqlDbType.BigInt);
            output_Id.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                resultado = Convert.ToInt32(output_Id.Value);
            }
        }

        return resultado;
    }

    public async Task<int> funVencerHallazgosBy15Days(ILogger log)
    {
        int resultado = 0;
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("[auditoria].[put_hallazgo_vencido_by_15_dias]", conn);

            SqlParameter output_Id = new SqlParameter("@rows", SqlDbType.BigInt);
            output_Id.Direction    = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                resultado = Convert.ToInt32(output_Id.Value);
            }

            if (conn.State == System.Data.ConnectionState.Open)
                conn.Close();

        }

        log.LogInformation("funVencerHallazgosBy15Days return resultado " + resultado);

        return resultado;
    }
}

public class HallazgosPost
{
    public long Id { get; set; }
    public string Code_Hallazgo {get; set;}
    public string Fuente {get; set;}
    public string TipoHallazgo {get; set;}
    public string Norma {get; set;}
    public string Sede {get; set;}
    public string FechaEjecucion {get; set;}
    public string FechaRegistro {get; set;}
    public string StatusHallazgo {get; set;}
    public string StatusAccionCorrectiva {get; set;}
    public string UnidadNegocio {get; set;}
    public long NormaId { get; set; }
    public long SedeId { get; set; }
    public long FuenteId { get; set; }
    public long UnidadNegocioId { get; set; }
    public long TipoHallazgoId { get; set; }
    public long ResponsableId { get; set; }
    public long ReportanteId { get; set; }
    public long StatusHallazgoId { get; set; }
    public long StatusAccionCorrectivaId { get; set; }
    public string ResponsableName {get; set;}
    public string ResponsableCorreo {get; set;}
    public string ResponsableCargo {get; set;}
    public string ResponsableUserHash {get; set;}

    public string ReportanteName {get; set;}
    public string ReportanteCorreo {get; set;}
    public string ReportanteCargo {get; set;}
    public string ReportanteUserHash {get; set;}
    public string Hallazgo {get; set;}
    public int Correlativo { get; set; }
    public string CodeHallazgo {get; set;}
    public DateTime EjecucionDate {get; set;}
    public int AnalisisCausa { get; set; }
    public string Created_By {get; set;}
    public string Last_Updated_By {get; set;}
    public int EnviarCorreo { get; set; }
    public string Usuario {get; set;}
    public string Cargo {get; set;}
    public string Correo {get; set;}
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