using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;
using System.Diagnostics;



class DataCursoTipoAll
{
    public List<DataAll> funGetAllList(ILogger log, int vnactive)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
        //Lista de Objetos
        List<DataAll> lobjs = new List<DataAll>();
        DataAll curobj;
        //SQL Objects
        SqlDataReader dataReader;
        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();
                //Start - Manejo de Parametros
                var textselect = "select Id, Description, 'curso' as tipo from [auditoria].[Tipo_Curso_Capacitacion] ";
                textselect += String.Format("WHERE Active = {0}", vnactive);
                textselect += " union all ";
                textselect += "select Id, Description, 'tipo' as tipo from [auditoria].[Tipo_Capacitacion] ";
                textselect += String.Format("WHERE Active = {0};", vnactive);

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
                            curobj = new DataAll();
                            curobj.Id = (int)(dataReader.GetValue(0));
                            if (!dataReader.IsDBNull(1)) { curobj.Description = (string)(dataReader.GetValue(1)); }
                            if (!dataReader.IsDBNull(2)) { curobj.Tipo = (string)(dataReader.GetValue(2)); }

                            lobjs.Add(curobj);
                        }
                    }
                }
                conn.Close();
            }
        }
        catch (Exception ex)
        {
            curobj = new DataAll();
            curobj.Id = 0;
            curobj.Description = System.Convert.ToString(ex.Message);
            lobjs.Add(curobj);
        }
        return lobjs;
    }



}


public class DataAll
{
    public int Id { get; set; }
    public string Description { get; set; }
    public string Tipo { get; set; }
}



