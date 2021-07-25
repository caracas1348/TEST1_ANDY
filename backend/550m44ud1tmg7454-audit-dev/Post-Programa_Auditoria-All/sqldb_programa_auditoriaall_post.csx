using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataPrograma_AuditoriaAll
{
   
    public async Task<long> funPostPrograma_AuditoriaAll(ILogger log, programa_auditoriaall curentity)
    {
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit",EnvironmentVariableTarget.Process);
   
        //Lista de Objetos
        long newlongid;

        programa_auditoriaall curobj;
        string vvcomodin="";

        curobj = new programa_auditoriaall();
        log.LogInformation("Ingreso Metodo:");
        //SQL Objects
        SqlDataReader dataReader;
    
        try{
            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                log.LogInformation("Ingreso Metodo: antes open");
                conn.Open();    

                //Start - Manejo de Parametros

                log.LogInformation("Ingreso Metodo: luego de open");
                
                var textselectpart1 = "INSERT INTO auditoria.Programa_Auditoria (  ";
                var textselectpart2 = " output INSERTED.ID VALUES( ";
                
                textselectpart1 = textselectpart1 + " Created_By, Created_Date, Last_Updated_By, Last_Updated_Date";
                textselectpart2 = textselectpart2 + " @Created_By, @Created_Date, @Last_Updated_By, @Last_Updated_Date";

                if( curentity.Id !=0)
                { textselectpart1 = textselectpart1 + ",Id"; 
                    textselectpart2 = textselectpart2 + ",@Id";
                }
                if( curentity.Code != null)
                { textselectpart1 = textselectpart1 + ",Code";
                    textselectpart2 = textselectpart2 + ",@Code";
                }
                if( curentity.EspecialidadId !=0)
                { textselectpart1 = textselectpart1 + ",EspecialidadId"; 
                    textselectpart2 = textselectpart2 + ",@EspecialidadId";
                }
                if( curentity.StatusId !=0)
                { textselectpart1 = textselectpart1 + ",StatusId"; 
                    textselectpart2 = textselectpart2 + ",@StatusId";
                }
                if( curentity.Evaluador_name != null)
                { textselectpart1 = textselectpart1 + ",Evaluador_name";
                    textselectpart2 = textselectpart2 + ",@Evaluador_name";
                }
                if( curentity.Evaluador_code != null)
                { textselectpart1 = textselectpart1 + ",Evaluador_code";
                    textselectpart2 = textselectpart2 + ",@Evaluador_code";
                }
                if( curentity.Year != null)
                { textselectpart1 = textselectpart1 + ",Year";
                    textselectpart2 = textselectpart2 + ",@Year";
                }
                if( curentity.Flag_Completada !=0)
                { textselectpart1 = textselectpart1 + ",Flag_Completada"; 
                    textselectpart2 = textselectpart2 + ",@Flag_Completada";
                }

                textselectpart1 = textselectpart1 + " ) ";
                textselectpart2 = textselectpart2 + " ); ";

                var StrQuery =  textselectpart1 + textselectpart2;       
                //End - Manejo de Parametros

                log.LogInformation("StrQuery:"+StrQuery);

                //ShipDate < GetDate();
            
                using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
                {  
                    if( curentity.Id !=0) cmd.Parameters.AddWithValue("@Id", curentity.Id);
                    if( curentity.Code != null) cmd.Parameters.AddWithValue("@Code", curentity.Code);
                    if( curentity.EspecialidadId !=0) cmd.Parameters.AddWithValue("@EspecialidadId", curentity.EspecialidadId);
                    if( curentity.StatusId !=0) cmd.Parameters.AddWithValue("@StatusId", curentity.StatusId);
                    if( curentity.Evaluador_name != null ) cmd.Parameters.AddWithValue("@Evaluador_name", curentity.Evaluador_name);
                    if( curentity.Evaluador_code != null ) cmd.Parameters.AddWithValue("@Evaluador_code", curentity.Evaluador_code);
                    if( curentity.Year != null ) cmd.Parameters.AddWithValue("@Year", curentity.Year);
                    if( curentity.StatusId !=0) cmd.Parameters.AddWithValue("@Flag_Completada", curentity.Flag_Completada);
                    cmd.Parameters.AddWithValue("@Created_By", curentity.Created_By);
                    cmd.Parameters.AddWithValue("@Created_Date", curentity.Created_Date);
                    cmd.Parameters.AddWithValue("@Last_Updated_By", curentity.Last_Updated_By);
                    cmd.Parameters.AddWithValue("@Last_Updated_Date", curentity.Last_Updated_Date);
                    //long modified =(long)cmd.ExecuteScalar();
                    var modified = await cmd.ExecuteScalarAsync(); 
                    //curentity.id = Convert.ToInt64(modified);
                    newlongid = Convert.ToInt64(modified);
                    log.LogInformation("modified:"+modified);
                }
                if (conn.State == System.Data.ConnectionState.Open) 
                conn.Close();    

                //  return curobj;
                return newlongid;
            }
 
        }
        catch (Exception ex)
        {
            /*curobj              = new especialidadall();        
            curobj.Id           = 0;
            curobj.Code         = "Null";
            curobj.Description  = System.Convert.ToString(ex.Message);*/
            log.LogInformation("catch::"+ex.Message);
            //System.Convert.ToString(ex.Message);
            newlongid  = 0;
        }
        return newlongid;
    }


    
    public programa_auditoriaall funPutPrograma_AuditoriaAll(ILogger log,long curid, programa_auditoriaall curentity )
    {

     var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit",EnvironmentVariableTarget.Process);
   
     //Lista de Objetos
     long newlongid;

     programa_auditoriaall curobj;
     string vvcomodin="";
     curobj = curentity;

    //SQL Objects
     SqlDataReader dataReader;
    try{
     using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
     {
        conn.Open();    

       //Start - Manejo de Parametros
       var textselectpart1 = "UPDATE auditoria.Programa_Auditoria SET ";
       var textselectpart2 = " WHERE 1=1 AND Id = @Id  ";
       textselectpart1 = textselectpart1 + " Last_Updated_By = @Last_Updated_By , Last_Updated_Date = switchoffset (CONVERT(datetimeoffset, GETDATE()), '-05:00') ";

        if( curentity.Id != 0)
        { textselectpart1 = textselectpart1 + ", Id = @Id ";  }
        if( curentity.Code != null)
        { textselectpart1 = textselectpart1 + ", Code = @Code";  }
        if( curentity.EspecialidadId != 0)
        { textselectpart1 = textselectpart1 + ", EspecialidadId = @EspecialidadId ";  }
        if( curentity.StatusId != 0)
        { textselectpart1 = textselectpart1 + ", StatusId = @StatusId ";  }
        if(curentity.Evaluador_name != null)//curentity.Evaluador_name
        { textselectpart1 = textselectpart1 + ", Evaluador_name = @Evaluador_name";  }
        if( curentity.Evaluador_code != null )
        { textselectpart1 = textselectpart1 + ", Evaluador_code = @Evaluador_code";  }
        if( curentity.Year != null )
        { textselectpart1 = textselectpart1 + ", Year = @Year";  }
        if( curentity.Flag_Completada != null)
        { textselectpart1 = textselectpart1 + ", Flag_Completada = @Flag_Completada ";  }
        if( curentity.Cantidad_Correcciones != 0)
        { textselectpart1 = textselectpart1 + ", Cantidad_Correcciones = @Cantidad_Correcciones ";  }
        if (curentity.StatusId == 5)
        { textselectpart1 = textselectpart1 + ", Fecha_Aprobacion = switchoffset (CONVERT(datetimeoffset, GETDATE()), '-05:00') "; }

        textselectpart2 = textselectpart2 + " ; ";

       var StrQuery =  textselectpart1 + textselectpart2;       
       //End - Manejo de Parametros

       log.LogInformation("StrQuery:"+StrQuery);
 
        using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
        {  
               cmd.Parameters.AddWithValue("@Id", curid);
               if( curentity.Code != null) cmd.Parameters.AddWithValue("@Code", curentity.Code);
               if( curentity.EspecialidadId != 0) cmd.Parameters.AddWithValue("@EspecialidadId", curentity.EspecialidadId);
               if( curentity.StatusId != 0) cmd.Parameters.AddWithValue("@StatusId", curentity.StatusId);
               if( curentity.Evaluador_name != null) cmd.Parameters.AddWithValue("@Evaluador_name", curentity.Evaluador_name);//curentity.Evaluador_name
               if( curentity.Evaluador_code != null) cmd.Parameters.AddWithValue("@Evaluador_code", curentity.Evaluador_code);
               if( curentity.Year != null) cmd.Parameters.AddWithValue("@Year", curentity.Year);
               if( curentity.Flag_Completada != null) cmd.Parameters.AddWithValue("@Flag_Completada", curentity.Flag_Completada);
               if( curentity.Cantidad_Correcciones != 0) cmd.Parameters.AddWithValue("@Cantidad_Correcciones", curentity.Cantidad_Correcciones);
               cmd.Parameters.AddWithValue("@Last_Updated_By", curentity.Last_Updated_By);
               //cmd.Parameters.AddWithValue("@Last_Updated_Date", curentity.Last_Updated_Date);

               var modified = cmd.ExecuteNonQuery();           
               log.LogInformation("modified:"+modified);    
        }

        if (conn.State == System.Data.ConnectionState.Open) {
            conn.Close();    
        }
        curobj.Id = curid;
       return curobj;       
    }
   }
    catch (Exception ex)
    {
            log.LogInformation("catch:"+ex.Message);
            newlongid  = -1;
    }
    return curobj;
}






public long funDeletePrograma_AuditoriaAll(ILogger log, long curid, string usuariodelete)
{

    var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit",EnvironmentVariableTarget.Process);

    //Lista de Objetos
    long vnupdaterows = 0; 
    string vvcomodin="";
    DateTime Deleted_Date = DateTime.Now;

 

    //SQL Objects
    SqlDataReader dataReader;
    
    try{

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
        conn.Open();    

        //Start - Manejo de Parametros
        var textselectpart1 = "UPDATE auditoria.Programa_Auditoria ";
        textselectpart1 = textselectpart1 + " SET Deleted_By = '" + usuariodelete + "' , Deleted_Date = '" + Deleted_Date.ToString() + "' , Deleted = 1 ";
        var textselectpart2 = " WHERE 1=1 AND id = @vncurid  ";

        var StrQuery =  textselectpart1 + textselectpart2;       
        //End - Manejo de Parametros

        log.LogInformation("StrQuery:"+StrQuery);

        using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
        {  
                cmd.Parameters.AddWithValue("@vncurid", curid);

                //cmd.Parameters.AddWithValue("@vvdeletedby", deletedby);

                var modified = cmd.ExecuteNonQuery();   
                vnupdaterows = Convert.ToInt64(modified);      
                log.LogInformation("DELETE:"+modified);   
                log.LogInformation("DELETE row:"+vnupdaterows);   
        }
      if (conn.State == System.Data.ConnectionState.Open) 
       conn.Close();    

       return vnupdaterows;
    }
    }
    catch (Exception ex)
    {
        programa_auditoriaall curobj = new programa_auditoriaall();
        curobj.Id = 0;
    }
    return vnupdaterows;
    }
}


public class programa_auditoriaall
{
    public long Id {get; set;}     
    public string Code {get; set;} 
    public long EspecialidadId {get; set;}     
    public int StatusId {get; set;}
    public string CodeEspecialidad {get; set;}
    public string DescriptionEspecialidad {get; set;}
    public string DescriptionStatus {get; set;}
    public int CantidadAuditorias { get; set; }
    public string Evaluador_name {get; set;} 
    public string Evaluador_code {get; set;} 
    public string Year {get; set;}
    public int? Flag_Completada {get; set;}
    public int Cantidad_Correcciones {get; set;}
    public DateTime FechaCreacion {get; set;}
    public string Created_By {get; set;}
    public DateTime Created_Date {get; set;}
    public string Last_Updated_By {get; set;}
    public DateTime Last_Updated_Date {get; set;}    
}

public class DataEmailNew
{
    public string sendto { get; set; }
    public string from { get; set; }
    public string emailsubject { get; set; }    
    public string bodyhtml { get; set; }
    public List<Files> Attachments {get; set;}  
}

public class Files 
{
    public string file {get;set;}
}