using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Threading.Tasks;
using System.Dynamic;
using System.Linq;

class SeguimientoDA
{
    public string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);
    //public string vvsqlconnectionString = "Data Source=srv-db-east-us009.database.windows.net;Initial Catalog=db_ssoma_audit_mng_dev;User ID=userdbowner;Password=$P4ssdbowner01#;";

    public async Task<Seguimiento> fnPostSeguimiento(ILogger log, Seguimiento entity)
    {
        entity.Id = 0;
        entity.Codigo = "";
        log.LogInformation("en fnPostSeguimiento, entity.Criticidad -> ",entity.Criticidad);
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("ssoma.sp_seguimiento_observacion_insert", conn);

            cmd.Parameters.AddWithValue("@Tipo_Observacion", entity.Tipo_Observacion);
            cmd.Parameters.AddWithValue("@Criticidad", entity.Criticidad);
            cmd.Parameters.AddWithValue("@Sede", entity.Sede);
            cmd.Parameters.AddWithValue("@Embarcacion", entity.Embarcacion);
            cmd.Parameters.AddWithValue("@Area", entity.Area);
            cmd.Parameters.AddWithValue("@Zona", entity.Zona);
            log.LogInformation("en Zona");
            cmd.Parameters.AddWithValue("@Codigo_Reportante", entity.Codigo_Reportante);
            cmd.Parameters.AddWithValue("@Nombres_Reportante", entity.Nombres_Reportante);
            cmd.Parameters.AddWithValue("@Codigo_Reportado", entity.Codigo_Reportado);
            cmd.Parameters.AddWithValue("@Nombres_Reportado", entity.Nombres_Reportado);
            log.LogInformation("en Fecha_Creacion"+DateTime.Now);
            cmd.Parameters.AddWithValue("@Fecha_Creacion", DateTime.Now);
            cmd.Parameters.AddWithValue("@Estado", entity.Estado);
            cmd.Parameters.AddWithValue("@Created_By", entity.Created_By);
            cmd.Parameters.AddWithValue("@Active", 1);
            log.LogInformation("en Fecha_Operacion"+entity.Fecha_Operacion);
            cmd.Parameters.AddWithValue("@Fecha_Operacion", entity.Fecha_Operacion);
            log.LogInformation("en Hora_Operacion"+entity.Hora_Operacion);
            cmd.Parameters.AddWithValue("@Hora_Operacion", entity.Hora_Operacion);

            SqlParameter output_Id = new SqlParameter("@Id", SqlDbType.BigInt);
            output_Id.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            SqlParameter output_Cod = new SqlParameter("@NewCod", SqlDbType.NVarChar, 30);
            output_Cod.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Cod);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                entity.Id = Convert.ToInt64(output_Id.Value);
                entity.Codigo = Convert.ToString(output_Cod.Value);

            }
        }
        log.LogInformation("entity.Id -> "+entity.Id);
        log.LogInformation("entity.Codigo -> "+entity.Codigo);
        return entity;
    }


    public async Task<int> fnPostReportante(string codigo, string nombres)
    {
        int rows = 0;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();
            SqlCommand cmd = new SqlCommand("ssoma.sp_reportante_insert", conn);

            cmd.Parameters.AddWithValue("@Codigo", codigo);
            cmd.Parameters.AddWithValue("@Nombres", nombres);

            SqlParameter outPutVal = new SqlParameter("@rows", SqlDbType.Int);
            outPutVal.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(outPutVal);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (outPutVal.Value != DBNull.Value) rows = Convert.ToInt16(outPutVal.Value);
        }
        return rows;
    }



    public async Task<bool> fnPostSeguimientoCheckList(Seguimiento entity)
    {
        bool exito = true;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            foreach (CheckList item in entity.CheckList)
            {
                long newId = 0;
                using (SqlCommand cmd = new SqlCommand("ssoma.sp_seguimiento_observacion_checklist_insert", conn))
                {
                    cmd.Parameters.AddWithValue("@Seguimiento", entity.Id);
                    cmd.Parameters.AddWithValue("@Grupo", item.Grupo);
                    cmd.Parameters.AddWithValue("@Subgrupo", item.Subgrupo);
                    cmd.Parameters.AddWithValue("@Opcion", item.Opcion);
                    cmd.Parameters.AddWithValue("@Respuesta", item.Respuesta);
                    cmd.Parameters.AddWithValue("@Active", 1);

                    SqlParameter outPutVal = new SqlParameter("@Id", SqlDbType.BigInt);
                    outPutVal.Direction = ParameterDirection.Output;
                    cmd.Parameters.Add(outPutVal);

                    cmd.CommandType = CommandType.StoredProcedure;

                    await cmd.ExecuteNonQueryAsync();

                    if (outPutVal.Value != DBNull.Value) newId = Convert.ToInt64(outPutVal.Value);
                    item.Id = newId;
                }

                if (newId == 0)
                {
                    exito = false;
                    break;
                }
            }
        }

        return exito;
    }


    public async Task<bool> fnPostSeguimientoAdjunto(ILogger log, long id, int grupo, string adjunto, List<string> Archivos)
    {
        log.LogInformation("en fnPostSeguimientoAdjunto");
        log.LogInformation("id -> ",id);
        log.LogInformation("grupo -> ",grupo);
        // log.LogInformation("Archivos[0] -> ",Archivos[0]);
        // log.LogInformation("Archivos[1] -> ",Archivos[1]);
        bool exito = true;
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            long newId = 0;
            foreach (var item in Archivos)
            {
                if(item != "")
                {
                    log.LogInformation("en if(item != vacio ");
                    using (SqlCommand cmd = new SqlCommand("ssoma.sp_seguimiento_observacion_adjunto_insert", conn))
                    {
                        log.LogInformation("System.Convert.ToString(item) -> " + System.Convert.ToString(item));
                        log.LogInformation("id -> " + id);
                        log.LogInformation("grupo -> " + grupo);
                        cmd.Parameters.AddWithValue("@Seguimiento", id);
                        cmd.Parameters.AddWithValue("@Grupo", grupo);
                        cmd.Parameters.AddWithValue("@Adjunto", System.Convert.ToString(item));
                        //cmd.Parameters.AddWithValue("@Adjunto", adjunto);
                        cmd.Parameters.AddWithValue("@Active", 1);

                        SqlParameter outPutVal = new SqlParameter("@Id", SqlDbType.BigInt);
                        outPutVal.Direction = ParameterDirection.Output;
                        cmd.Parameters.Add(outPutVal);

                        cmd.CommandType = CommandType.StoredProcedure;

                        await cmd.ExecuteNonQueryAsync();

                        if (outPutVal.Value != DBNull.Value) newId = Convert.ToInt64(outPutVal.Value);

                        log.LogInformation("newId -> " + newId);
                    }
                }
            }
            if (newId == 0)
            {
                exito = false;
            }
        }

        return exito;
    }


    public async Task<int> fnDeleteSeguimiento(long Id)
    {
        int rows = 0;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("ssoma.sp_seguimiento_observacion_delete", conn);

            cmd.Parameters.AddWithValue("@Id", Id);
            cmd.Parameters.AddWithValue("@Active", 0);

            SqlParameter outPutVal = new SqlParameter("@rows", SqlDbType.Int);
            outPutVal.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(outPutVal);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (outPutVal.Value != DBNull.Value) rows = Convert.ToInt16(outPutVal.Value);
        }
        return rows;
    }



    public async Task<int> fnDeleteReportante(string codigo)
    {
        int rows = 0;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();
            SqlCommand cmd = new SqlCommand("ssoma.sp_reportante_delete", conn);

            cmd.Parameters.AddWithValue("@Codigo", codigo);
            cmd.Parameters.AddWithValue("@Active", 0);

            SqlParameter outPutVal = new SqlParameter("@rows", SqlDbType.Int);
            outPutVal.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(outPutVal);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (outPutVal.Value != DBNull.Value) rows = Convert.ToInt16(outPutVal.Value);
        }
        return rows;
    }




    public async Task<int> fnPutSeguimiento(ILogger log, Seguimiento entity)
    {
        int rows = 0;
        log.LogInformation("en fnPutSeguimiento");
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("ssoma.sp_seguimiento_observacion_update", conn);

            cmd.Parameters.AddWithValue("@Id", entity.Id);
            cmd.Parameters.AddWithValue("@Criticidad", entity.Criticidad);
            //cmd.Parameters.AddWithValue("@Tipo_Observacion", entity.Tipo_Observacion);
            // cmd.Parameters.AddWithValue("@Sede", entity.Sede);
            // cmd.Parameters.AddWithValue("@Embarcacion", entity.Embarcacion);
            // cmd.Parameters.AddWithValue("@Area", entity.Area);
            // cmd.Parameters.AddWithValue("@Zona", entity.Zona);
            // cmd.Parameters.AddWithValue("@Codigo_Reportante", entity.Codigo_Reportante);
            // cmd.Parameters.AddWithValue("@Nombres_Reportante", entity.Nombres_Reportante);
            // cmd.Parameters.AddWithValue("@Codigo_Reportado", entity.Codigo_Reportado);
            // cmd.Parameters.AddWithValue("@Nombres_Reportado", entity.Nombres_Reportado);
            cmd.Parameters.AddWithValue("@Fecha_Operacion", entity.Fecha_Operacion);
            cmd.Parameters.AddWithValue("@Hora_Operacion", entity.Hora_Operacion);
            cmd.Parameters.AddWithValue("@Updated_By", entity.Updated_By);

            SqlParameter output_Id = new SqlParameter("@rows", SqlDbType.Int);
            output_Id.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(output_Id);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (output_Id.Value != DBNull.Value)
            {
                rows = Convert.ToInt32(output_Id.Value);
            }
        }
        log.LogInformation("return rows -> "+ rows);
        return rows;
    }

    public async Task<int> fnDeleteSeguimientoChecklist(long Id)
    {
        int rows = 0;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("ssoma.sp_seguimiento_observacion_checklist_delete", conn);

            cmd.Parameters.AddWithValue("@Seguimiento", Id);
            cmd.Parameters.AddWithValue("@Active", 0);

            SqlParameter outPutVal = new SqlParameter("@rows", SqlDbType.Int);
            outPutVal.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(outPutVal);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (outPutVal.Value != DBNull.Value) rows = Convert.ToInt16(outPutVal.Value);
        }
        return rows;
    }

    public async Task<int> fnDeleteSeguimientoAdjunto(long Id)
    {
        int rows = 0;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("ssoma.sp_seguimiento_observacion_adjunto_delete", conn);

            cmd.Parameters.AddWithValue("@Seguimiento", Id);
            cmd.Parameters.AddWithValue("@Active", 0);

            SqlParameter outPutVal = new SqlParameter("@rows", SqlDbType.Int);
            outPutVal.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(outPutVal);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (outPutVal.Value != DBNull.Value) rows = Convert.ToInt16(outPutVal.Value);
        }
        return rows;
    }

    /////////////////////////****************************************
    public async Task<string> fnGetCorreos(ILogger log, long idSE, string tipo, long idArea)
    {
        log.LogInformation(":::::: en fnGetCorreos , idArea ::" + idArea);
        string lstEmail = "";
        string email = "";
        int i=0;
        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();

                SqlCommand cmd = new SqlCommand("ssoma.sp_correo_list", conn);
                cmd.Parameters.AddWithValue("@Sede", idSE);
                cmd.Parameters.AddWithValue("@Tipo", tipo);
                cmd.Parameters.AddWithValue("@Area", idArea);

                cmd.CommandType = CommandType.StoredProcedure;

                using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                {
                    while (dr.Read())
                    {
                        if(i==0)
                        {
                            lstEmail = (string)(dr.GetValue(dr.GetOrdinal("Correo")));
                        }
                        else
                        {
                            email = (string)(dr.GetValue(dr.GetOrdinal("Correo")));
                            lstEmail = System.Convert.ToString(lstEmail)+", "+System.Convert.ToString(email);
                        }
                        i++;
                    }
                }
            }
        }
        catch (Exception ex)
        {
            log.LogInformation("catch::" + ex.Message);
            Console.WriteLine("fallo");
        }
        return lstEmail;
    }

    public async Task<int> fnSeguimientoUpdateInforme(Seguimiento entity)
    {
        int rows = 0;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("ssoma.sp_seguimiento_observacion_update_informe", conn);

            cmd.Parameters.AddWithValue("@Id", entity.Id);
            cmd.Parameters.AddWithValue("@Informe", entity.Pdf);
            cmd.Parameters.AddWithValue("@Fecha_Actualizacion", DateTime.Now);
            cmd.Parameters.AddWithValue("@Updated_By", entity.Updated_By);

            SqlParameter outPutVal = new SqlParameter("@rows", SqlDbType.Int);
            outPutVal.Direction = ParameterDirection.Output;
            cmd.Parameters.Add(outPutVal);

            cmd.CommandType = CommandType.StoredProcedure;

            await cmd.ExecuteNonQueryAsync();

            if (outPutVal.Value != DBNull.Value) rows = Convert.ToInt16(outPutVal.Value);
        }
        return rows;
    }

    public async Task<Result> fnGetSeguimientoObject(ILogger log, long Id)
    {
        log.LogInformation("en fnGetSeguimientoObject "+Id);
        Result result = new Result();
        List<Checklist> lstChecklist = new List<Checklist>();
        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();

                SqlCommand cmd = new SqlCommand("ssoma.sp_seguimiento_observacion_object", conn);
                cmd.Parameters.AddWithValue("@Id", Id);

                cmd.CommandType = CommandType.StoredProcedure;

                using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                {
                    while (dr.Read())
                    {
                        Seguimiento obj = new Seguimiento();
                        obj.Id = (long)(dr.GetValue(dr.GetOrdinal("Id")));
                        obj.Codigo = (string)(dr.GetValue(dr.GetOrdinal("Codigo")));
                        obj.Tipo_Observacion_Id = (int)(dr.GetValue(dr.GetOrdinal("Tipo_Observacion_Id")));
                        obj.Tipo_Observacion_Des = (string)(dr.GetValue(dr.GetOrdinal("Tipo_Observacion_Des")));
                        if (!dr.IsDBNull(dr.GetOrdinal("Sede_Id")))
                        {
                            obj.Sede_Id = (long)(dr.GetValue(dr.GetOrdinal("Sede_Id")));
                            obj.Sede_Des = (string)(dr.GetValue(dr.GetOrdinal("Sede_Des")));
                            obj.Sede_UnidadNegocioId = (long)(dr.GetValue(dr.GetOrdinal("Sede_UnidadNegocioId")));
                        }
                        else
                        {
                            obj.Sede_UnidadNegocioId = 0;
                        }
                        log.LogInformation("en obj.Sede_Id -> "+obj.Sede_Id);

                        if (!dr.IsDBNull(dr.GetOrdinal("Embarcacion_Id")))
                        {
                            obj.Embarcacion_Id = (long)(dr.GetValue(dr.GetOrdinal("Embarcacion_Id")));
                            obj.Embarcacion_Des = (string)(dr.GetValue(dr.GetOrdinal("Embarcacion_Des")));
                            obj.Embarcacion_UnidadNegocioId = (long)(dr.GetValue(dr.GetOrdinal("Embarcacion_UnidadNegocioId")));
                            obj.Embarcacion_UnidadNegocioSubId = (long)(dr.GetValue(dr.GetOrdinal("Embarcacion_UnidadNegocioSubId")));
                        }
                        else
                        {
                            obj.Embarcacion_UnidadNegocioId = 0;
                            obj.Embarcacion_UnidadNegocioSubId = 0;
                        }
                        log.LogInformation("en obj.Embarcacion_Id -> "+obj.Embarcacion_Id);

                        obj.Area_Id = (long)(dr.GetValue(dr.GetOrdinal("Area_Id")));
                        obj.Area_Des = (string)(dr.GetValue(dr.GetOrdinal("Area_Des")));
                        obj.Zona_Id = (long)(dr.GetValue(dr.GetOrdinal("Zona_Id")));
                        obj.Zona_Des = (string)(dr.GetValue(dr.GetOrdinal("Zona_Des")));
                        obj.Codigo_Reportante = (string)(dr.GetValue(dr.GetOrdinal("Codigo_Reportante")));
                        obj.Nombres_Reportante = (string)(dr.GetValue(dr.GetOrdinal("Nombres_Reportante")));
                        if (!dr.IsDBNull(dr.GetOrdinal("Codigo_Reportado")))
                        {
                            obj.Codigo_Reportado = (string)(dr.GetValue(dr.GetOrdinal("Codigo_Reportado")));
                            obj.Nombres_Reportado = (string)(dr.GetValue(dr.GetOrdinal("Nombres_Reportado")));
                        }
                        //z    obj.Fecha_Creacion = (string)(dr.GetValue(dr.GetOrdinal("Fecha_Creacion").ToString()));
                        //obj.Fecha_Creacion = (string)(dr.GetValue(dr.GetOrdinal("Fecha_Creacion")));
                        obj.Estado_Id = (int)(dr.GetValue(dr.GetOrdinal("Estado_Id")));
                        obj.Estado_Des = (string)(dr.GetValue(dr.GetOrdinal("Estado_Des")));
                        obj.Fecha_Operacion = (DateTime)(dr.GetValue(dr.GetOrdinal("Fecha_Operacion")));
                        obj.Hora_Operacion2 = (TimeSpan)(dr.GetValue(dr.GetOrdinal("Hora_Operacion")));
                        result.DatosPrincipales = obj;

                        log.LogInformation("en obj.Area_Id -> "+obj.Area_Id);

                    }


                    dr.NextResult();
                    while (dr.Read())
                    {
                        Checklist obj = new Checklist();
                        obj.Tipo_Observacion_Id = (int)(dr.GetValue(dr.GetOrdinal("Tipo_Observacion_Id")));
                        obj.Tipo_Observacion_Des = (string)(dr.GetValue(dr.GetOrdinal("Tipo_Observacion_Des")));
                        obj.Grupo_Id = (int)(dr.GetValue(dr.GetOrdinal("Grupo_Id")));
                        obj.Grupo_Cod = (string)(dr.GetValue(dr.GetOrdinal("Grupo_Cod")));
                        obj.Grupo_Des = (string)(dr.GetValue(dr.GetOrdinal("Grupo_Des")));
                        obj.Grupo_Tipo_Id = (int)(dr.GetValue(dr.GetOrdinal("Grupo_Tipo_Id")));
                        obj.Grupo_Tipo_Des = (string)(dr.GetValue(dr.GetOrdinal("Grupo_Tipo_Des")));


                        if (dr.IsDBNull(dr.GetOrdinal("Subgrupo_Id")))
                            obj.Subgrupo_Id = 0;
                        else
                            obj.Subgrupo_Id = (int)(dr.GetValue(dr.GetOrdinal("Subgrupo_Id")));


                        if (dr.IsDBNull(dr.GetOrdinal("Subgrupo_Des")))
                            obj.Subgrupo_Des = "";
                        else
                            obj.Subgrupo_Des = (string)(dr.GetValue(dr.GetOrdinal("Subgrupo_Des")));


                        if (dr.IsDBNull(dr.GetOrdinal("Subgrupo_Icono")))
                            obj.Subgrupo_Icono = "";
                        else
                            obj.Subgrupo_Icono = (string)(dr.GetValue(dr.GetOrdinal("Subgrupo_Icono")));


                        if (dr.IsDBNull(dr.GetOrdinal("Opcion_Id")))
                            obj.Opcion_Id = 0;
                        else
                            obj.Opcion_Id = (int)(dr.GetValue(dr.GetOrdinal("Opcion_Id")));


                        if (dr.IsDBNull(dr.GetOrdinal("Opcion_Des")))
                            obj.Opcion_Des = "";
                        else
                            obj.Opcion_Des = (string)(dr.GetValue(dr.GetOrdinal("Opcion_Des")));


                        if (dr.IsDBNull(dr.GetOrdinal("Opcion_Tipo_Id")))
                            obj.Opcion_Tipo_Id = 0;
                        else
                            obj.Opcion_Tipo_Id = (int)(dr.GetValue(dr.GetOrdinal("Opcion_Tipo_Id")));


                        if (dr.IsDBNull(dr.GetOrdinal("Opcion_Tipo_Des")))
                            obj.Opcion_Tipo_Des = "";
                        else
                            obj.Opcion_Tipo_Des = (string)(dr.GetValue(dr.GetOrdinal("Opcion_Tipo_Des")));


                        if (dr.IsDBNull(dr.GetOrdinal("Grupo_Padre")))
                            obj.Grupo_Padre = 0;
                        else
                            obj.Grupo_Padre = (int)(dr.GetValue(dr.GetOrdinal("Grupo_Padre")));


                        if (dr.IsDBNull(dr.GetOrdinal("Grupo_Padre_Opcion")))
                            obj.Grupo_Padre_Opcion = 0;
                        else
                            obj.Grupo_Padre_Opcion = (int)(dr.GetValue(dr.GetOrdinal("Grupo_Padre_Opcion")));


                        if (dr.IsDBNull(dr.GetOrdinal("Grupo_Observacion")))
                            obj.Grupo_Observacion = 0;
                        else
                            obj.Grupo_Observacion = (int)(dr.GetValue(dr.GetOrdinal("Grupo_Observacion")));


                        if (dr.IsDBNull(dr.GetOrdinal("Subgrupo_Observacion")))
                            obj.Subgrupo_Observacion = 0;
                        else
                            obj.Subgrupo_Observacion = (int)(dr.GetValue(dr.GetOrdinal("Subgrupo_Observacion")));


                        if (dr.IsDBNull(dr.GetOrdinal("Opcion_Observacion")))
                            obj.Opcion_Observacion = 0;
                        else
                            obj.Opcion_Observacion = (int)(dr.GetValue(dr.GetOrdinal("Opcion_Observacion")));


                        if (dr.IsDBNull(dr.GetOrdinal("Respuesta_Observacion")))
                            obj.Respuesta_Observacion = "";
                        else
                            obj.Respuesta_Observacion = (string)(dr.GetValue(dr.GetOrdinal("Respuesta_Observacion")));


                        obj.Ind_Adjunto = (bool)(dr.GetValue(dr.GetOrdinal("Ind_Adjunto")));


                        lstChecklist.Add(obj);
                    }
                    result.Checklist = lstChecklist;



                    dr.NextResult();
                    while (dr.Read())
                    {
                        Archivo obj = new Archivo();
                        obj.Grupo = (int)(dr.GetValue(dr.GetOrdinal("Grupo")));
                        obj.Adjunto = (string)(dr.GetValue(dr.GetOrdinal("Adjunto")));
                        result.Adjunto = obj;
                    }



                }
            }
        }
        catch (Exception ex)
        {
            //log.LogInformation("en Exception ex -> "+System.Convert.ToString(ex));
            Console.WriteLine("fallo");
        }
        return result;

    }
    /////////////////////////****************************************


}



public class Seguimiento
{
    public int Tipo_Observacion { get; set; }
    public long Criticidad { get; set; }
    public long Sede { get; set; }
    public long Embarcacion { get; set; }
    public long Area { get; set; }
    public long Zona { get; set; }
    public string Codigo_Reportante { get; set; }
    public string Nombres_Reportante { get; set; }
    public string Codigo_Reportado { get; set; }
    public string Nombres_Reportado { get; set; }
    public int Estado { get; set; }
    public string Created_By { get; set; }
    public string Updated_By { get; set; }
    public long Id { get; set; }
    public string Codigo { get; set; }
    public string Adjunto { get; set; }
    public List<string> Archivos { get; set; }
    public List<CheckList> CheckList { get; set; }
    public DateTime Fecha_Operacion { get; set; }
    public string Hora_Operacion { get; set; }

    /////////////////////////////*******************************
    public string Correos { get; set; }
    public string Pdf { get; set; }

    public Int64 Registro { get; set; }
    public int Tipo_Observacion_Id { get; set; }
    public string Tipo_Observacion_Des { get; set; }
    public long Sede_Id { get; set; }
    public string Sede_Des { get; set; }
    public long Sede_UnidadNegocioId { get; set; }
    public long Embarcacion_Id { get; set; }
    public string Embarcacion_Des { get; set; }
    public long Embarcacion_UnidadNegocioId { get; set; }
    public long Embarcacion_UnidadNegocioSubId { get; set; }
    public long Area_Id { get; set; }
    public string Area_Des { get; set; }
    public long Zona_Id { get; set; }
    public string Zona_Des { get; set; }
    public string Fecha_Creacion { get; set; }
    public int Estado_Id { get; set; }
    public string Estado_Des { get; set; }
    public TimeSpan Hora_Operacion2 { get; set; }
    public bool Editar { get; set; }
    public bool Ver { get; set; }
    public bool Eliminar { get; set; }
    /////////////////////////////*******************************
}

public class CheckList
{
    public long Seguimiento { get; set; }
    public int Grupo { get; set; }
    public int Subgrupo { get; set; }
    public int Opcion { get; set; }
    public string Respuesta { get; set; }
    public long Id { get; set; }
}

public class Response
{
    public Boolean status { get; set; }
    public string message { get; set; }
}

public class Result
{
    public Seguimiento DatosPrincipales { get; set; }
    public List<Checklist> Checklist { get; set; }
    public Archivo Adjunto { get; set; }
}

public class Checklist
{
    public int Tipo_Observacion_Id { get; set; }
    public string Tipo_Observacion_Des { get; set; }
    public int Grupo_Id { get; set; }
    public string Grupo_Cod { get; set; }
    public string Grupo_Des { get; set; }
    public int Grupo_Tipo_Id { get; set; }
    public string Grupo_Tipo_Des { get; set; }
    public int Subgrupo_Id { get; set; }
    public string Subgrupo_Des { get; set; }
    public string Subgrupo_Icono { get; set; }
    public int Opcion_Id { get; set; }
    public string Opcion_Des { get; set; }
    public int Opcion_Tipo_Id { get; set; }
    public string Opcion_Tipo_Des { get; set; }
    public int Grupo_Padre { get; set; }
    public int Grupo_Padre_Opcion { get; set; }
    public int Grupo_Observacion { get; set; }
    public int Subgrupo_Observacion { get; set; }
    public int Opcion_Observacion { get; set; }
    public string Respuesta_Observacion { get; set; }
    public bool Ind_Adjunto { get; set; }
}

public class Archivo
{
    public int Grupo { get; set; }
    public string Adjunto { get; set; }
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
