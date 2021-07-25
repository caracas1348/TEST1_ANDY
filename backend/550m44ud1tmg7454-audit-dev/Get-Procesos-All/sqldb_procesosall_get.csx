using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;
using System.Diagnostics;

class DataProcesosAllGet
{

    public List<procesososallget> funGetProcesososAllList(ILogger log
                                                                ,long vnIdNorma
                                                                ,long vnIdUnidadNegocio
                                                                )
    {

        //log.LogInformation(str1);
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit",EnvironmentVariableTarget.Process);

        //Lista de Objetos
        List<procesososallget> lobjs = new List<procesososallget>();
        procesososallget curobj;

        //SQL Objects
        SqlDataReader dataReader;

        try{

            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open(); 

                var textselect = "SELECT P.Id, P.Code, P.Description, UNP.NormaId, UNP.UnidadNegocioId, "; //P.Cargo

                textselect = textselect +  " (SELECT STUFF((SELECT ', ' + CONVERT(VARCHAR(100), R.Description) FROM [auditoria].Responsable R, [auditoria].Responsable_Proceso RP WHERE R.Id=RP.ResponsableId AND RP.ProcesoId = P.Id AND RP.UnidadNegocioId = UNP.UnidadNegocioId FOR xml path('')), 1, 1, '')) AS Cargo ";
                textselect = textselect +  " FROM [auditoria].[Procesos] P ";
                textselect = textselect +  " INNER JOIN [auditoria].UnidadNegocioProceso UNP ON UNP.ProcesoId = P.Id ";
                //textselect = textselect +  " WHERE 1";
                textselect = textselect +  " WHERE (P.Deleted IS NULL OR P.Deleted = 0) ";
                if(vnIdNorma != 0)
                    {textselect = textselect +  String.Format(" AND UNP.[NormaId] = {0} ", vnIdNorma);}
                if(vnIdUnidadNegocio != 0)
                    {textselect = textselect +  String.Format(" AND UNP.[UnidadNegocioId] = {0} ", vnIdUnidadNegocio);}
                
                textselect = textselect +  String.Format(" GROUP BY  P.Id, P.Code, P.Description, P.Cargo, UNP.NormaId, UNP.UnidadNegocioId, Cargo ");
                
                textselect = textselect +  String.Format(" ORDER BY P.Description ASC");

                var StrQuery =  textselect;
                //End - Manejo de Parametros
                log.LogInformation("StrQuery: "+StrQuery);

                //ShipDate < GetDate();        
                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {
                     //Ejecutar Comando
                    using (dataReader = cmd.ExecuteReader())  
                    {
                        //Navegar en el Conjunto de Datos Recuperados
                        while (dataReader.Read())  
                        {
                            curobj                                                                                      = new procesososallget();
                            curobj.Id                                                                                   = (long)(dataReader.GetValue(0));
                            if(!dataReader.IsDBNull(dataReader.GetOrdinal("Code"))) { curobj.Code                       = (string)(dataReader.GetValue(dataReader.GetOrdinal("Code")));}
                            if(!dataReader.IsDBNull(dataReader.GetOrdinal("Description"))) { curobj.Description         = (string)(dataReader.GetValue(dataReader.GetOrdinal("Description")));}
                            if(!dataReader.IsDBNull(dataReader.GetOrdinal("Cargo"))) { curobj.Cargo                     = (string)(dataReader.GetValue(dataReader.GetOrdinal("Cargo")));}
                            //if(!dataReader.IsDBNull(dataReader.GetOrdinal("Cargo"))) { curobj.Cargo                     = "Prueba de cargo222";}
                            if(!dataReader.IsDBNull(dataReader.GetOrdinal("NormaId"))) { curobj.NormaId                 = (long)(dataReader.GetValue(dataReader.GetOrdinal("NormaId")));}
                            if(!dataReader.IsDBNull(dataReader.GetOrdinal("UnidadNegocioId"))) { curobj.UnidadNegocioId = (long)(dataReader.GetValue(dataReader.GetOrdinal("UnidadNegocioId")));}
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
            curobj              = new procesososallget();
            curobj.Id           = 0;           
            curobj.Code         = "nulo";
            curobj.Description  = System.Convert.ToString(ex.Message);
            lobjs.Add(curobj);
        }

        return lobjs;
    }

    

    
}

public class procesososallget
{
    
    public long Id {get; set;}
	public string Code {get; set;}
    public string Description {get; set;}                            
    public string Cargo {get; set;}  
    public long NormaId {get; set;}
    public long UnidadNegocioId {get; set;}

}