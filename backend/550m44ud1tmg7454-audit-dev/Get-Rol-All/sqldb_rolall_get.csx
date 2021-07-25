using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;
using System.Diagnostics;


class DataRolAll
{
    public List<rolAll> funGetRolAllList(ILogger log, int vnactive)
    {
        // log.LogInformation(str1);
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
        //Lista de Objetos
        List<rolAll> lobjs = new List<rolAll>();
        rolAll curobj;
        //SQL Objects
        SqlDataReader dataReader;
        try
        {
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();
                //Start - Manejo de Parametros
                var textselect = "select * from [auditoria].[Tipo_Auditor] ";
                textselect += "WHERE ";
                textselect += String.Format("Active = {0}", vnactive);

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
                            curobj = new rolAll();
                            curobj.Id = (int)(dataReader.GetValue(0));
                            if (!dataReader.IsDBNull(1)) { curobj.Description = (string)(dataReader.GetValue(1)); }

                            lobjs.Add(curobj);
                        }
                    }
                }
                conn.Close();
            }
        }
        catch (Exception ex)
        {
            curobj = new rolAll();
            curobj.Id = 0;
            curobj.Description = System.Convert.ToString(ex.Message);
            lobjs.Add(curobj);
        }
        return lobjs;
    }



}


public class rolAll
{
    public int Id { get; set; }
    public string Description { get; set; }
}


