using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;
using System.Diagnostics;

class DataAsistentesAll
{
    public List<asistente> funGetAsistentesAllList(ILogger log
                                                    , long vnListaAsistenciaID
                                                    )
    {
        log.LogInformation("Entro a la funcion en el modelo lista asistencia all");
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit",EnvironmentVariableTarget.Process);
        //Lista de Objetos
        List<asistente> lobjs = new List<asistente>();
        asistente curobj;
        //SQL Objects
        SqlDataReader dataReader;
        try{
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();    
                //Start - Manejo de Parametros
                var textselect = "SELECT a.Id, a.ListaAsistenciaID, a.UserIdHash, a.Nombres, a.Cargo, a.Flag_Asistencia, CONVERT(VARCHAR, a.Hora_Asistencia_Apertura, 108) , CONVERT(VARCHAR, a.Fecha_Asistencia_Apertura, 103), CONVERT(VARCHAR, a.Hora_Asistencia_Cierre, 108), CONVERT(VARCHAR, a.Fecha_Asistencia_Cierre, 103), a.Created_By, a.Created_Date, a.Last_Updated_By, a.Last_Updated_Date ";
                textselect = textselect + " FROM [auditoria].Asistentes a ";
                textselect = textselect + " WHERE 1=1 ";
                if(vnListaAsistenciaID > 0)
                {textselect = textselect +  String.Format(" AND a.[ListaAsistenciaID] = {0} ",vnListaAsistenciaID);}                 

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
                            curobj                                                  = new asistente();                    
                            curobj.Id                                               = (long)(dataReader.GetValue(0));
                            if(!dataReader.IsDBNull(1)){ curobj.ListaAsistenciaID           = (long)(dataReader.GetValue(1));}
                            if(!dataReader.IsDBNull(2)){ curobj.UserIdHash         	= (string)(dataReader.GetValue(2));}
                            if(!dataReader.IsDBNull(3)){ curobj.Nombres        	= (string)(dataReader.GetValue(3));}
                            if(!dataReader.IsDBNull(4)){ curobj.Cargo        = (string)(dataReader.GetValue(4));}
                            if(!dataReader.IsDBNull(5)){ curobj.Flag_Asistencia       = (int)(dataReader.GetValue(5));}
                            if(!dataReader.IsDBNull(6)){ curobj.Hora_Asistencia_Apertura      = (string)(dataReader.GetValue(6));}
                            if(!dataReader.IsDBNull(7)){ curobj.Fecha_Asistencia_Apertura           = (string)(dataReader.GetValue(7));}
                            if(!dataReader.IsDBNull(8)){ curobj.Hora_Asistencia_Cierre         	= (string)(dataReader.GetValue(8));}
                            if(!dataReader.IsDBNull(9)){ curobj.Fecha_Asistencia_Cierre        	= (string)(dataReader.GetValue(9));}
                            if(!dataReader.IsDBNull(10)){ curobj.Created_By        = (string)(dataReader.GetValue(10));}
                            if(!dataReader.IsDBNull(11)){ curobj.Created_Date       = (DateTime)(dataReader.GetValue(11));}
                            if(!dataReader.IsDBNull(12)){ curobj.Last_Updated_By      = (string)(dataReader.GetValue(12));}
                            if(!dataReader.IsDBNull(13)){ curobj.Last_Updated_Date      = (DateTime)(dataReader.GetValue(13));}

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
            curobj              = new asistente();
            curobj.Id           = 0;           
            curobj.ListaAsistenciaID  = 0;
            curobj.UserIdHash = System.Convert.ToString(ex.Message);
            lobjs.Add(curobj);
        }
        return lobjs;
    }

}

public class asistente
{
    public long Id {get; set;}
    public long ListaAsistenciaID {get; set;}
    public string UserIdHash {get; set;}
    public string Nombres {get; set;}
    public string Cargo {get; set;}
    public int Flag_Asistencia {get; set;}
    public string Hora_Asistencia_Apertura {get; set;}
    public string Fecha_Asistencia_Apertura {get; set;}
    public string Hora_Asistencia_Cierre {get; set;}
    public string Fecha_Asistencia_Cierre {get; set;}
    public string Created_By {get; set;}
    public DateTime Created_Date {get; set;}
    public string Last_Updated_By {get; set;}
    public DateTime Last_Updated_Date {get; set;}
}