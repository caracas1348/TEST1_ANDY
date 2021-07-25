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

class ChecklistDA
{
    public string vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma", EnvironmentVariableTarget.Process);

    public async Task<Result> fnGetChecklistList()
    {
        Result result = new Result();
        List<Tipo_Observacion> lstTipo_Observacion = new List<Tipo_Observacion>();
        List<Grupo> lstGrupo = new List<Grupo>();
        List<Subgrupo> lstSubgrupo = new List<Subgrupo>();
        List<Checklist> lstChecklist = new List<Checklist>();

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();
            SqlCommand cmd = new SqlCommand("ssoma.sp_checklist_list", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
            {
                while (dr.Read())
                {
                    Tipo_Observacion obj = new Tipo_Observacion();
                    obj.Tipo_Observacion_Id = (int)(dr.GetValue(dr.GetOrdinal("Tipo_Observacion_Id")));
                    obj.Tipo_Observacion_Des = (string)(dr.GetValue(dr.GetOrdinal("Tipo_Observacion_Des")));
                    lstTipo_Observacion.Add(obj);
                }
                result.Tipo_Observacion = lstTipo_Observacion;

                dr.NextResult();
                while (dr.Read())
                {
                    Grupo obj = new Grupo();
                    obj.Grupo_Id = (int)(dr.GetValue(dr.GetOrdinal("Grupo_Id")));
                    obj.Grupo_Des = (string)(dr.GetValue(dr.GetOrdinal("Grupo_Des")));
                    obj.Grupo_Tipo_Id = (int)(dr.GetValue(dr.GetOrdinal("Grupo_Tipo_Id")));
                    obj.Grupo_Tipo_Des = (string)(dr.GetValue(dr.GetOrdinal("Grupo_Tipo_Des")));
                    
                    if (dr.IsDBNull(dr.GetOrdinal("Grupo_Padre")))
                        obj.Grupo_Padre = 0;
                    else
                        obj.Grupo_Padre = (int)(dr.GetValue(dr.GetOrdinal("Grupo_Padre")));


                    if (dr.IsDBNull(dr.GetOrdinal("Grupo_Padre_Opcion")))
                        obj.Grupo_Padre_Opcion = 0;
                    else
                        obj.Grupo_Padre_Opcion = (int)(dr.GetValue(dr.GetOrdinal("Grupo_Padre_Opcion")));


                    obj.Tipo_Observacion = (int)(dr.GetValue(dr.GetOrdinal("Tipo_Observacion")));
                    obj.Ind_Adjunto = (bool)(dr.GetValue(dr.GetOrdinal("Ind_Adjunto")));

                    lstGrupo.Add(obj);
                }
                result.Grupo = lstGrupo;

                dr.NextResult();
                while (dr.Read())
                {
                    Subgrupo obj = new Subgrupo();
                    obj.Grupo_Id = (int)(dr.GetValue(dr.GetOrdinal("Grupo_Id")));
                    obj.Subgrupo_Id = (int)(dr.GetValue(dr.GetOrdinal("Subgrupo_Id")));
                    obj.Subgrupo_Des = (string)(dr.GetValue(dr.GetOrdinal("Subgrupo_Des")));
                    obj.Subgrupo_Icono = (string)(dr.GetValue(dr.GetOrdinal("Subgrupo_Icono")));
                    lstSubgrupo.Add(obj);
                }
                result.Subgrupo = lstSubgrupo;

                dr.NextResult();
                while (dr.Read())
                {
                    Checklist obj = new Checklist();
                    obj.Tipo_Observacion_Id = (int)(dr.GetValue(dr.GetOrdinal("Tipo_Observacion_Id")));
                    obj.Tipo_Observacion_Des = (string)(dr.GetValue(dr.GetOrdinal("Tipo_Observacion_Des")));
                    obj.Grupo_Id = (int)(dr.GetValue(dr.GetOrdinal("Grupo_Id")));
                    obj.Ind_Adjunto = (bool)(dr.GetValue(dr.GetOrdinal("Ind_Adjunto")));
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

                    lstChecklist.Add(obj);
                }
                result.Checklist = lstChecklist;
            }
        }

        return result;
    }

}

public class Result
{
    public List<Tipo_Observacion> Tipo_Observacion { get; set; }
    public List<Grupo> Grupo { get; set; }
    public List<Subgrupo> Subgrupo { get; set; }
    public List<Checklist> Checklist { get; set; }
}

public class Tipo_Observacion
{
    public int Tipo_Observacion_Id { get; set; }
    public string Tipo_Observacion_Des { get; set; }
}

public class Grupo
{
    public int Grupo_Id { get; set; }
    public string Grupo_Des { get; set; }
    public int Grupo_Tipo_Id { get; set; }
    public string Grupo_Tipo_Des { get; set; }
    public int Grupo_Padre { get; set; }
    public int Grupo_Padre_Opcion { get; set; }
    public int Tipo_Observacion { get; set; }
    public bool Ind_Adjunto { get; set; }
    
}

public class Subgrupo
{
    public int Grupo_Id { get; set; }
    public int Subgrupo_Id { get; set; }
    public string Subgrupo_Des { get; set; }
    public string Subgrupo_Icono { get; set; }
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
    public bool Ind_Adjunto { get; set; }
}
