using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;
using System.Transactions;





class DataAuditorAll2
{

    public async Task<int> funPostAuditorAll2(ILogger log, auditor curentity)
    {
          log.LogInformation("------------ Ingreso Metodo2 -----------------**:");
        //var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureAudit", EnvironmentVariableTarget.Process);
        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSecurity_beta",EnvironmentVariableTarget.Process);


        //Lista de Objetos
        int newlongid = 0;

        
        //SQL Objects


         log.LogInformation("------------TransactionScope scope = new TransactionScope()----------------**:");
        using (TransactionScope scope = new TransactionScope())
        {
            try
            {
                //newlongid = DeletedCommand(log, curentity, vvsqlconnectionString);

                newlongid = ExecuteCommandA2(log, curentity, vvsqlconnectionString);

            }
            catch (Exception ex)
            {
                log.LogInformation("catch::" + ex.Message);
                newlongid = -1;
                //scope.Dispose();
            }
        }


        return newlongid;
    }



    private static int ExecuteCommandA2(ILogger log, auditor curentity, string vvsqlconnectionString)
    {
        log.LogInformation("curentity.SedeId "+ curentity.SedeId);
        log.LogInformation("curentity.Rol_Code "+ curentity.Rol_Code);
        log.LogInformation("curentity.EspecialidadId "+ curentity.EspecialidadId);
        int newlongid = 0;
        int NewRol = 0;//andy
        long tt = 0;//andy
        string idhashh = curentity.UserIdhash;
        
                 if(curentity.Tipo == 1){NewRol = 41;}//lider
                 if(curentity.Tipo == 2){NewRol = 46;}//auditor
                 if(curentity.Tipo == 3){NewRol = 42;}//observador

        SqlDataReader dataReader;







        using (SqlConnection con1 = new SqlConnection(vvsqlconnectionString))
         {
                con1.Open();
                var textselect = "SELECT id FROM [security].[user_group_item_all] WHERE user_idhash = 'd6a3db18-ef38-485b-a925-41ba628324b9' ";

                







                //var textselect = "UPDATE security.user_group_item_all SET status = '9' WHERE user_idhash ='d6a3db18-ef38-485b-a925-41ba628324b9'; ";
                //UPDATE [security].[user_group_item_all] SET [status] = 0 WHERE user_idhash = @IdHash and user_group_id = 42
                var StrQuery =  textselect;  
                log.LogInformation("StrQuery:"+StrQuery);

            using (SqlCommand cmd = new SqlCommand(StrQuery, con1))
            {

                var modified = cmd.ExecuteNonQuery();      

                //log.LogInformation("SE MODIFICO = "+modified);

                using (dataReader = cmd.ExecuteReader())
                {
                    while (dataReader.Read())
                    {
                        log.LogInformation("Ejecutado y momento de recuperar las variables");
                       
                        tt = (long)(dataReader.GetValue(0));
                       log.LogInformation("xxxxx = "+tt);
                    }
                }
            }

        }
                /*
               //---------------------AGREGADO POR ANDY VASQUEZ 26 DE MAYO DE 2021---------------------------
     
                          using (SqlConnection con1 = new SqlConnection(vvsqlconnectionString))
                           {
                              log.LogInformation("Ingreso Metodo: antes open = NewRol = "+NewRol);
                              log.LogInformation("Ingreso Metodo: antes open = HASH = "+idhashh);//
                              log.LogInformation("Ingreso Metodo: antes open = BD = "+vvsqlconnectionString);


                              con1.Open();

                              
                                                                   
                              SqlCommand cmd1 = new SqlCommand("[security].[temp_valida_surity_tasa_auditor]", con1);   //temp_valida_surity_tasa_auditor         //temp_valida_surity_tasa_auditor
                              if (idhashh != null) {cmd1.Parameters.AddWithValue("@IdHash", idhashh);
                                                    cmd1.Parameters.AddWithValue("@NewRol", NewRol);


                                   //cmd1.ExecuteNonQueryAsync();

                                   cmd1.CommandType = CommandType.StoredProcedure;

                                  // await cmd1.ExecuteNonQueryAsync();
                                   cmd1.ExecuteNonQuery();
                                   log.LogInformation("##########################################################################################################################");
                                                log.LogInformation("andy 298: Abriendo conexión para invocar procedimento almacenado");
                                   log.LogInformation("##########################################################################################################################");

                                  
                                
                                   log.LogInformation("cerramos la conexion 162");
                                   if (con1.State == System.Data.ConnectionState.Open)
                                   con1.Close();
                                   log.LogInformation("listo cerarda 165");
                            
                           }
                        

               //---------------------AGREGADO POR ANDY VASQUEZ 26 DE MAYO DE 2021---------------------------
               */


        return newlongid;
    }


  }
//}
  








