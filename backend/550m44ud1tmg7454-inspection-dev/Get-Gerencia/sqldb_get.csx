using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataGerencia
{
    public async Task<List<Gerencia>> funGetGerenciaList(ILogger log)  
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);

        List<Gerencia> lobjs = new List<Gerencia>();
        Gerencia obj;

       using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            SqlCommand cmd = new SqlCommand("ssoma.sp_gerencia_list", conn);


            cmd.CommandType = CommandType.StoredProcedure;

            using (SqlDataReader dr = await cmd.ExecuteReaderAsync())
                while (dr.Read())
                {
                    obj = new Gerencia();
                    obj.Id = (long)(dr.GetValue(dr.GetOrdinal("Id")));
                    obj.Description = (string)(dr.GetValue(dr.GetOrdinal("Description")));    
                    obj.CodeSap = (string)(dr.GetValue(dr.GetOrdinal("CodeSap")));               

                    lobjs.Add(obj);
                }
        }
        return lobjs;
    }

}

public class Gerencia 
{
    public long Id {get;set;}
    public string Description {get;set;}
    public string CodeSap {get;set;}

}
