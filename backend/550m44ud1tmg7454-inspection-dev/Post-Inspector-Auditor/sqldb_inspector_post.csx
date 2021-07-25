using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataAccessInspector
{


    public async Task<long> funPostInspector(ILogger log, Inspector curentity)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);

        long newlongid;

        Inspector curobj;
        curobj = new Inspector();
        
        log.LogInformation("Ingreso Metodo:");
        SqlDataReader dataReader;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            log.LogInformation("Ingreso Metodo: antes open");
            conn.Open();

            log.LogInformation("Ingreso Metodo: luego de open");

            var textselectpart1 = "INSERT INTO ssoma.Inspector(  ";
            var textselectpart2 = " output INSERTED.ID VALUES( ";
       
            textselectpart1 = textselectpart1 + " Created_By,Created_Date,Last_Updated_By,Last_Updated_Date";
            textselectpart2 = textselectpart2 + " @created_by,@created_date,@Last_Updated_By,@Last_Updated_Date";
            
            if (curentity.PersonName != null) {
                textselectpart1 = textselectpart1 + ",PersonName";
                textselectpart2 = textselectpart2 + ",@person_name";
            }
            if (curentity.HashId != null) {
                textselectpart1 = textselectpart1 + ",HashId";
                textselectpart2 = textselectpart2 + ",@hash_id";
            }
            if (curentity.PersonType > 0) {
                textselectpart1 = textselectpart1 + ",PersonType";
                textselectpart2 = textselectpart2 + ",@person_type";
            }
            if (curentity.Role > 0){
                textselectpart1 = textselectpart1 + ",Role";
                textselectpart2 = textselectpart2 + ",@role";
            }
            if (curentity.AreaId > 0) {
                textselectpart1 = textselectpart1 + ",areaId";
                textselectpart2 = textselectpart2 + ",@area_id";
            }
            if (curentity.SedeId > 0){
                textselectpart1 = textselectpart1 + ",SedeId";
                textselectpart2 = textselectpart2 + ",@sede_id";
            }
            if (curentity.Job != null){
                textselectpart1 = textselectpart1 + ",Job";
                textselectpart2 = textselectpart2 + ",@job";
            }
            if (curentity.AreaResponsible > 0){
                textselectpart1 = textselectpart1 + ",AreaResponsible";
                textselectpart2 = textselectpart2 + ",@area_responsible";
            }
            if (curentity.IdentityDocument != null){
                textselectpart1 = textselectpart1 + ",IdentityDocument";
                textselectpart2 = textselectpart2 + ",@IdentityDocument";
            }
            if (curentity.Email != null){
                textselectpart1 = textselectpart1 + ",Email";
                textselectpart2 = textselectpart2 + ",@Email";
            }

            textselectpart1 = textselectpart1 + " ) ";
            textselectpart2 = textselectpart2 + " ); ";

            var StrQuery =  textselectpart1 + textselectpart2;       
            
            log.LogInformation("StrQuery:"+StrQuery);
            
            using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
            {
                if (curentity.Created_Date != null) cmd.Parameters.AddWithValue("@created_date", curentity.Created_Date);
                if (curentity.Last_Updated_Date != null) cmd.Parameters.AddWithValue("@Last_Updated_Date", curentity.Last_Updated_Date);
                if (curentity.Created_By != null) cmd.Parameters.AddWithValue("@created_by", curentity.Created_By);
                if (curentity.Last_Updated_By != null) cmd.Parameters.AddWithValue("@Last_Updated_By", curentity.Last_Updated_By);

                if (curentity.PersonName != null) cmd.Parameters.AddWithValue("@person_name", curentity.PersonName);
                if (curentity.HashId != null) cmd.Parameters.AddWithValue("@hash_id", curentity.HashId);
                if (curentity.PersonType > 0) cmd.Parameters.AddWithValue("@person_type", curentity.PersonType);
                if (curentity.Role > 0) cmd.Parameters.AddWithValue("@role",curentity.Role);
                if (curentity.AreaId > 0) cmd.Parameters.AddWithValue("@area_id",curentity.AreaId);
                if (curentity.SedeId > 0) cmd.Parameters.AddWithValue("@sede_id",curentity.SedeId);   
                if (curentity.Job != null) cmd.Parameters.AddWithValue("@job",curentity.Job);
                if (curentity.AreaResponsible > 0) cmd.Parameters.AddWithValue("@area_responsible",curentity.AreaResponsible);               
                if (curentity.IdentityDocument != null) cmd.Parameters.AddWithValue("@IdentityDocument",curentity.IdentityDocument);
                if (curentity.Email != null) cmd.Parameters.AddWithValue("@Email",curentity.Email);

                var modified = await cmd.ExecuteScalarAsync(); 
                newlongid = Convert.ToInt64(modified);
                log.LogInformation("modified:"+modified);
            }

            if (conn.State == System.Data.ConnectionState.Open) {
                conn.Close();
            }
            return newlongid;
        }
        return newlongid;
    }
    public Inspector funPutInspector(ILogger log, long curid, Inspector curentity)
     {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);

        int newlongid;

        Inspector curobj;
        curobj = curentity;

        SqlDataReader dataReader;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();

            var textselectpart1 = "UPDATE ssoma.Inspector SET  ";
            var textselectpart2 = " WHERE 1=1 AND id = @vncurid ";
       
            textselectpart1 = textselectpart1 + " Last_Updated_By = @Last_Updated_By , Last_Updated_Date = @Last_Updated_Date";

            if (curentity.PersonName != null) {
                textselectpart1 = textselectpart1 + ", PersonName = @PersonName";
            }
 
            if (curentity.Role > 0) {
                textselectpart1 = textselectpart1 + ",Role = @Role";     
            }    

            if (curentity.PersonType > 0) {   
                textselectpart1 = textselectpart1 + ",PersonType = @PersonType";
            }

            if (curentity.AreaId > 0) {
                textselectpart1 = textselectpart1 + ",AreaId = @AreaId";
            }
            if (curentity.SedeId > 0) {
                textselectpart1 = textselectpart1 + ",SedeId = @SedeId";
            }

            if (curentity.Job != null) {
                textselectpart1 = textselectpart1 + ",Job = @Job";
            }

            if (curentity.AreaResponsible > 0) {
                textselectpart1 = textselectpart1 + ",AreaResponsible = @AreaResponsible";
            }
            if(curentity.IdentityDocument != null){
                textselectpart1 = textselectpart1 + ",IdentityDocument = @IdentityDocument";

            }
            if(curentity.Email != null){
                textselectpart1 = textselectpart1 + ",Email = @Email";

            }

            textselectpart2 = textselectpart2 + " ; ";

            var StrQuery =  textselectpart1 + textselectpart2;       

            log.LogInformation("StrQuery:"+StrQuery);
            
            using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
            {
                cmd.Parameters.AddWithValue("@vncurid", curid);

                if (curentity.Last_Updated_Date != null) cmd.Parameters.AddWithValue("@Last_Updated_Date", curentity.Last_Updated_Date);

                cmd.Parameters.AddWithValue("@Last_Updated_By", curentity.Last_Updated_By);

                if (curentity.PersonName != null) cmd.Parameters.AddWithValue("@PersonName", curentity.PersonName);
                if (curentity.Role > 0) cmd.Parameters.AddWithValue("@Role", curentity.Role);
                if (curentity.PersonType > 0) cmd.Parameters.AddWithValue("@PersonType", curentity.PersonType);
                if (curentity.AreaId > 0) cmd.Parameters.AddWithValue("@AreaId", curentity.AreaId); 
                if (curentity.SedeId > 0) cmd.Parameters.AddWithValue("@SedeId", curentity.SedeId);
                if (curentity.Job != null) cmd.Parameters.AddWithValue("@Job", curentity.Job);
                if (curentity.AreaResponsible > 0) cmd.Parameters.AddWithValue("@AreaResponsible", curentity.AreaResponsible);
                if (curentity.IdentityDocument != null) cmd.Parameters.AddWithValue("@IdentityDocument", curentity.IdentityDocument);
                if (curentity.Email != null) cmd.Parameters.AddWithValue("@Email",curentity.Email);

                var modified = cmd.ExecuteNonQuery();           
                log.LogInformation("modified:"+modified); 
            }

            if (conn.State == System.Data.ConnectionState.Open) {
                conn.Close();
            }
            return curobj;
        }
        return curobj;
    }
    public int funGetInspectorbyIdHash(ILogger log, string idhash)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);
        SqlDataReader dataReader;
        int response = 0;
        try
        {
            using(SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();

                var textselect = "SELECT COUNT(id) as num FROM ssoma.Inspector i WHERE 1=1 ";
                textselect = textselect + String.Format(" AND i.HashId = '{0}'",idhash);
                   var StrQuery = textselect;

                log.LogInformation("StrQuery:"+StrQuery);

                using (SqlCommand cmd = new SqlCommand(StrQuery, conn)) 
                {
                    using (dataReader = cmd.ExecuteReader()) 
                    {
                        while (dataReader.Read())
                        {
                        response = (int)(dataReader.GetValue(0));
                        }
                    }
                }
                conn.Close();
                return response;
            }
        }
        catch(Exception ex)
        {

        }
        return response;
    }

        public int funGetInspectorbyIdentityDocument(ILogger log, string IdentityDocument)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSsoma",EnvironmentVariableTarget.Process);
        SqlDataReader dataReader;
        int response = 0;
        try
        {
            using(SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();

                var textselect = "SELECT COUNT(id) as num FROM ssoma.Inspector i WHERE 1=1 ";
                textselect = textselect + String.Format(" AND i.IdentityDocument = '{0}'",IdentityDocument);
                   var StrQuery = textselect;

                log.LogInformation("StrQuery:"+StrQuery);

                using (SqlCommand cmd = new SqlCommand(StrQuery, conn)) 
                {
                    using (dataReader = cmd.ExecuteReader()) 
                    {
                        while (dataReader.Read())
                        {
                        response = (int)(dataReader.GetValue(0));
                        }
                    }
                }
                conn.Close();
                return response;
            }
        }
        catch(Exception ex)
        {

        }
        return response;
    }

}

public class Inspector 
{
    public long Id {get;set;}
    public string PersonName {get;set;}
    public string HashId {get;set;}
    public int PersonType {get;set;}
    public int Role {get;set;}
    public int AreaId {get;set;}
    public long SedeId {get;set;}
    public string Job {get;set;}
    public int AreaResponsible {get;set;}
    public string IdentityDocument {get;set;}
    public string Created_By {get;set;}
    public DateTime Created_Date {get;set;}
    public string Last_Updated_By {get;set;}
    public DateTime Last_Updated_Date {get;set;}
    public string Email {get;set;}
}
