using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;
using System.Diagnostics;


class Datadoc
{
    public doc funGetDocExperiencia(ILogger log, long Id)
    {
        // log.LogInformation(str1);
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
        //Lista de Objetos
 doc curobj;
                curobj = new doc();

                //SQL Objects
                SqlDataReader dataReader;
                try
                {
                    using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
                    {
                        conn.Open();
                        //Start - Manejo de Parametros
                        var textselect = "select Id, Adjunto from [auditoria].[Experiencia] ";
                        textselect += "WHERE ";
                        textselect += String.Format("Id = {0}", Id);

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
                                    curobj = new doc();
                                    curobj.Id = (int)(dataReader.GetValue(0));
                                    if (!dataReader.IsDBNull(1)) { curobj.Adjunto = (string)(dataReader.GetValue(1)); }

                                }
                            }
                        }
                        conn.Close();
                        return curobj;

                    }
                }
                catch (Exception ex)
                {
                    curobj = new doc();
                    curobj.Id = 0;
                    curobj.Adjunto = System.Convert.ToString(ex.Message);
                }
                return curobj;
    }

    public doc funGetDocCapacitacion(ILogger log, long Id)
    {
        // log.LogInformation(str1);
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
        //Lista de Objetos
     doc curobj;
                curobj = new doc();

                //SQL Objects
                SqlDataReader dataReader;
                try
                {
                    using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
                    {
                        conn.Open();
                        //Start - Manejo de Parametros
                        var textselect = "select Id, Adjunto from [auditoria].[Capacitacion] ";
                        textselect += "WHERE ";
                        textselect += String.Format("Id = {0}", Id);

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
                                    curobj = new doc();
                                    curobj.Id = (int)(dataReader.GetValue(0));
                                    if (!dataReader.IsDBNull(1)) { curobj.Adjunto = (string)(dataReader.GetValue(1)); }

                                }
                            }
                        }
                        conn.Close();
                        return curobj;

                    }
                }
                catch (Exception ex)
                {
                    curobj = new doc();
                    curobj.Id = 0;
                    curobj.Adjunto = System.Convert.ToString(ex.Message);
                }
                return curobj;
            }

}


        public class doc
        {
            public int Id { get; set; }
            public string Adjunto { get; set; }
        }



