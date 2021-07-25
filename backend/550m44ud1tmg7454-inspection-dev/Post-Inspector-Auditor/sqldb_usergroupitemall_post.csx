using System;
using System.Net;
using System.Data;
using System.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;

class DataAccessUserGroupItemAll
{
    public async Task<long> funPostUserGroupItemAll(ILogger log, string tipo ,string idhashh1, string create_by, string correo, string fechaHora, string name, string dni)//(ILogger log, usergroupitemall curentity)
    {

                   



        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSecurity_beta",EnvironmentVariableTarget.Process);
        //Lista de Objetos
        //long newlongid;

        int newlongid = 0;
        int NewRol = 0;//andy
        long tt = 0;//andy
        string idhashh = idhashh1;

        int tipo1 = Int16.Parse(tipo);
        
                  if(tipo1 == 1){NewRol = 41;}//lider
                  if(tipo1 == 2){NewRol = 46;}//auditor
                  if(tipo1 == 3){NewRol = 42;}//observador

                   log.LogInformation("tipo = "+tipo);
                   log.LogInformation("idhashh1 = "+idhashh1);
                   log.LogInformation("create_by = "+create_by);
                   log.LogInformation("correo = "+correo);
                   log.LogInformation("fechaHora = "+fechaHora);
                   log.LogInformation("NewRol = "+NewRol);
                   log.LogInformation("name = "+name);
                   log.LogInformation("dni = "+dni);



        userextall curobj;
        string vvcomodin    = "";
        curobj              = new userextall();
        log.LogInformation("Ingreso Metodo:");
        //SQL Objects
        SqlDataReader dataReader;
        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            
            
            //newlongid = 1;
            log.LogInformation("Ingreso Metodo: antes open security.user_group_item_all");
            conn.Open();    
            //Start - Manejo de Parametros
            log.LogInformation("Ingreso Metodo: luego de open");

           //var textselect = "UPDATE security.user_group_item_all SET status = '1' WHERE user_idhash ='d6a3db18-ef38-485b-a925-41ba628324b9'; ";
           



                    var textselect = "";
                    textselect = textselect + "     SET NOCOUNT ON";
                    textselect = textselect + "     DECLARE @IdHash VARCHAR(max)";
                    textselect = textselect + "     DECLARE @NewRol int";
                    textselect = textselect + "     DECLARE @Rol1 int  ";//--Lider
                    textselect = textselect + "     DECLARE @Rol2 int ";//-- Auditor
                    textselect = textselect + "     DECLARE @Rol3 int ";//-- Observador
                    textselect = textselect + "     DECLARE @HayPerfil int";

                    textselect = textselect + "     SET @IdHash = '"+idhashh+"'";
                    textselect = textselect + "     SET @NewRol ="+NewRol;




                    textselect = textselect + "     SET @HayPerfil = (select count(a.Id) as HayPerfil from[security].user_group_item_all as a where a.user_idhash = @IdHash and  a.user_group_id = 41 )";
                    textselect = textselect + "     IF @HayPerfil > 0  BEGIN  SET @Rol1 = 41 PRINT N'SI EXISTE EL ROL LIDER';END ELSE BEGIN  SET @Rol1 = 0; PRINT N'NO EXISTE EL ROL LIDER'; END";

                    textselect = textselect + "     SET @HayPerfil = (select count(a.Id) as HayPerfil from[security].user_group_item_all as a where a.user_idhash = @IdHash and  a.user_group_id = 46 ) ";
                    textselect = textselect + "     IF @HayPerfil > 0  BEGIN  SET @Rol2 = 46 PRINT N'SI EXISTE EL ROL AUDITOR';END ELSE BEGIN  SET @Rol2 = 0; PRINT N'NO EXISTE EL ROL AUDITOR'; END ";

                    textselect = textselect + "     SET @HayPerfil = (select count(a.Id) as HayPerfil from[security].user_group_item_all as a where a.user_idhash = @IdHash and  a.user_group_id = 42 ) ";
                    textselect = textselect + "     IF @HayPerfil > 0  BEGIN  SET @Rol3 = 42 PRINT N'SI EXISTE EL ROL OBSERVADOR';END ELSE BEGIN  SET @Rol3 = 0; PRINT N'NO EXISTE EL ROL OBSERVADOR'; END ";


                    textselect = textselect + " ";
                    textselect = textselect + "     IF (@Rol1 = 41 AND @Rol2 = 46)AND( @NewRol = 42)";
                    textselect = textselect + "     BEGIN";
                    textselect = textselect + "     PRINT N'1) BORRAR REGISTRO COMO LIDER. 2) BORRAR REGISTRO COMO AUDITOR';";

                    textselect = textselect + " UPDATE[security].[user_group_item_all] SET [status] = 0 , [last_updated_by] = '"+create_by+"', [last_updated_date] = '"+fechaHora+"'  WHERE user_idhash = @IdHash and user_group_id = 41 ";
                    textselect = textselect + " UPDATE[security].[user_group_item_all] SET [status] = 0 , [last_updated_by] = '"+create_by+"', [last_updated_date] = '"+fechaHora+"'  WHERE user_idhash = @IdHash and user_group_id = 46 ";
                    textselect = textselect + " SET @HayPerfil = (select count(a.Id) as HayPerfil from[security].user_group_item_all as a where a.user_idhash = @IdHash and  a.user_group_id = @NewRol AND a.status = 0 )";

                    textselect = textselect + " IF((@Rol3 = 0 and @HayPerfil = 0))";
                    textselect = textselect + " BEGIN";
                    textselect = textselect + " PRINT N'B) INSERTAR EL PERFIL DE OBSERVADOR';";
                    textselect = textselect + "     INSERT INTO[security].[user_group_item_all]";
                    textselect = textselect + "     ([system_id], [user_group_id], [user_id], [user_idhash], [status], [created_by], [created_date], [last_updated_by], ";
                    textselect = textselect + "     [last_updated_date], [attribute1], [attribute2], [attribute3], [attribute4],[attribute5]) ";
                    textselect = textselect + "     VALUES ( 8, 42, NULL, @IdHash, 1, '"+create_by+"', '"+fechaHora+"', NULL, NULL, '"+name+"', '"+dni+"', '"+correo+"', NULL, NULL);";
                    textselect = textselect + " END";

                    textselect = textselect + " IF((@Rol3 = 42 and @HayPerfil = 1))";
                    textselect = textselect + " BEGIN";
                    textselect = textselect + " PRINT N'B) MODIFICAR EL PERFIL DE OBSERVADOR';";
                    textselect = textselect + "     UPDATE[security].[user_group_item_all] SET [status] = 0 , [last_updated_by] = '"+create_by+"', [last_updated_date] = '"+fechaHora+"'  WHERE user_idhash = @IdHash and user_group_id = @NewRol"; 

                    textselect = textselect + " END";

                    textselect = textselect + " END";
                    textselect = textselect + " ";


                    textselect = textselect + ""; 
                    textselect = textselect + "     IF (@Rol1 = 41 AND @Rol2 = 46)AND( @NewRol = 41)";
                    textselect = textselect + "     BEGIN";
                    textselect = textselect + " SET @HayPerfil = (select count(a.Id) as HayPerfil from[security].user_group_item_all as a where a.user_idhash = @IdHash and  a.user_group_id = @NewRol AND a.status = 0 )";

                    textselect = textselect + " IF(@HayPerfil = 1)";
                    textselect = textselect + " BEGIN";
                    textselect = textselect + " PRINT N'B) PONER PERFIL DE LIDER EN UNO';";
                    textselect = textselect + "     UPDATE[security].[user_group_item_all] SET [status] = 0 , [last_updated_by] = '"+create_by+"', [last_updated_date] = '"+fechaHora+"'  WHERE user_idhash = @IdHash and user_group_id = @NewRol ";
                    textselect = textselect + "     UPDATE[security].[user_group_item_all] SET [status] = 0 , [last_updated_by] = '"+create_by+"', [last_updated_date] = '"+fechaHora+"'  WHERE user_idhash = @IdHash and user_group_id = 42 ";

                    textselect = textselect + " END";

                    textselect = textselect + " END";
                    textselect = textselect + " ";

                    textselect = textselect + " ";
                    textselect = textselect + "     IF (@Rol1 = 41 AND @Rol2 = 46)AND( @NewRol = 46)";
                    textselect = textselect + "     BEGIN";
                    textselect = textselect + " SET @HayPerfil = (select count(a.Id) as HayPerfil from[security].user_group_item_all as a where a.user_idhash = @IdHash and  a.user_group_id = @NewRol AND a.status = 0 )";

                    textselect = textselect + " IF(@HayPerfil = 1)";
                    textselect = textselect + " BEGIN";
                    textselect = textselect + " PRINT N'B) PONER PERFIL DE AUDITOR EN UNO';";
                    textselect = textselect + "     UPDATE[security].[user_group_item_all] SET [status] = 0 , [last_updated_by] = '"+create_by+"', [last_updated_date] = '"+fechaHora+"'  WHERE user_idhash = @IdHash and user_group_id = @NewRol ";
                    textselect = textselect + "     UPDATE[security].[user_group_item_all] SET [status] = 0 , [last_updated_by] = '"+create_by+"', [last_updated_date] = '"+fechaHora+"'  WHERE user_idhash = @IdHash and user_group_id = 42 ";

                    textselect = textselect + " END";

                    textselect = textselect + " END";
                    textselect = textselect + "";



                    textselect = textselect + "";

                    textselect = textselect + "     IF (@Rol1 = 0 AND @Rol2 = 0 AND @Rol3 = 42)";
                    textselect = textselect + "     BEGIN ";
                    textselect = textselect + " PRINT N'C) NO HAY PERFIL NI DE LIDER NI DE AUDITOR, SOLO OBSERVADOR';";
                    textselect = textselect + "     SET @HayPerfil = (select count(a.Id) as HayPerfil from[security].user_group_item_all as a where a.user_idhash = @IdHash and  a.user_group_id = @NewRol AND a.status = 0 )";
                    textselect = textselect + "     IF((@Rol3 = 42 and @HayPerfil = 1))";
                    textselect = textselect + "     BEGIN";
                    textselect = textselect + "     PRINT N'B) MODIFICAR EL PERFIL DE OBSERVADOR';";
                    textselect = textselect + "     UPDATE[security].[user_group_item_all] SET [status] = 0 , [last_updated_by] = '"+create_by+"', [last_updated_date] = '"+fechaHora+"'  WHERE user_idhash = @IdHash and user_group_id = @NewRol     ";
                    textselect = textselect + " END";

                    textselect = textselect + " END ";




                    textselect = textselect + " IF (@Rol1 = 0 AND @Rol2 = 0 AND @Rol3 = 42) AND ( @NewRol = 41)";
                    textselect = textselect + "     BEGIN ";
                    textselect = textselect + " PRINT N'C) TIENE PERFIL DE OBSERVADOR Y LO VAMOS A PONER LIDER';";
                    textselect = textselect + " UPDATE[security].[user_group_item_all] SET [status] = 0 , [last_updated_by] = '"+create_by+"', [last_updated_date] = '"+fechaHora+"'  WHERE user_idhash = @IdHash and user_group_id = 42 ";

                    textselect = textselect + " SET @HayPerfil = (select count(a.Id) as HayPerfil from[security].user_group_item_all as a where a.user_idhash = @IdHash and  a.user_group_id = @NewRol AND a.status = 0 )";
                    textselect = textselect + " PRINT N'B) INSERTAR EL PERFIL DE LIDER';";


                    textselect = textselect + " IF((@NewRol = 41 AND  @HayPerfil = 0))";
                    textselect = textselect + " BEGIN";

                    textselect = textselect + "     INSERT INTO[security].[user_group_item_all]";
                    textselect = textselect + "     ([system_id], [user_group_id], [user_id], [user_idhash], [status], [created_by], [created_date], [last_updated_by], ";
                    textselect = textselect + "     [last_updated_date], [attribute1], [attribute2], [attribute3], [attribute4],[attribute5]) ";
                    //textselect = textselect + "     VALUES ( 8, 41, NULL, @IdHash, 1, '"+create_by+"', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);";
                    textselect = textselect + "     VALUES ( 8, 41, NULL, @IdHash, 1, '"+create_by+"', '"+fechaHora+"', NULL, NULL, '"+name+"', '"+dni+"', '"+correo+"', NULL, NULL);";

                    textselect = textselect + "     UPDATE[security].[user_group_item_all] SET [status] = 0 , [last_updated_by] = '"+create_by+"', [last_updated_date] = '"+fechaHora+"'  WHERE user_idhash = @IdHash and user_group_id = 42 ";
                    textselect = textselect + " END";


                    textselect = textselect + " END  ";


                    textselect = textselect + "     IF (@Rol1 = 0 AND @Rol2 = 0 AND @Rol3 = 42) AND ( @NewRol = 46)";
                    textselect = textselect + "     BEGIN ";
                    textselect = textselect + " PRINT N'C) TIENE PERFIL DE OBSERVADOR Y LO VAMOS A PONER AUDITOR';";
                    textselect = textselect + " UPDATE[security].[user_group_item_all] SET [status] = 0 , [last_updated_by] = '"+create_by+"', [last_updated_date] = '"+fechaHora+"'  WHERE user_idhash = @IdHash and user_group_id = 42 ";

                    textselect = textselect + " SET @HayPerfil = (select count(a.Id) as HayPerfil from[security].user_group_item_all as a where a.user_idhash = @IdHash and  a.user_group_id = @NewRol AND a.status = 0 )";
                    textselect = textselect + " PRINT N'B) INSERTAR EL PERFIL DE AUDITOR';";


                    textselect = textselect + " IF((@NewRol = 46 AND  @HayPerfil = 0))";
                    textselect = textselect + " BEGIN";

                    textselect = textselect + "     INSERT INTO[security].[user_group_item_all]";
                    textselect = textselect + "     ([system_id], [user_group_id], [user_id], [user_idhash], [status], [created_by], [created_date], [last_updated_by], ";
                    textselect = textselect + "     [last_updated_date], [attribute1], [attribute2], [attribute3], [attribute4],[attribute5]) ";
                    //textselect = textselect + "     VALUES ( 8, 46, NULL, @IdHash, 1, '"+create_by+"', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);";
                     textselect = textselect + "     VALUES ( 8, 46, NULL, @IdHash, 1, '"+create_by+"', '"+fechaHora+"', NULL, NULL, '"+name+"', '"+dni+"', '"+correo+"', NULL, NULL);";

                    textselect = textselect + "     UPDATE[security].[user_group_item_all] SET [status] = 0 , [last_updated_by] = '"+create_by+"', [last_updated_date] = '"+fechaHora+"'  WHERE user_idhash = @IdHash and user_group_id = 42 ";
                    textselect = textselect + " END";


                    textselect = textselect + " END ";





                    textselect = textselect + " IF (@Rol1 = 41 AND @Rol2 = 0 AND @Rol3 = 0) AND ( @NewRol = 46)";
                    textselect = textselect + "     BEGIN ";
                    textselect = textselect + " PRINT N'C) TIENE PERFIL SOLO DE LIDER Y LO VAMOS A PONER AUDITOR';";
                    textselect = textselect + " SET @HayPerfil = (select count(a.Id) as HayPerfil from[security].user_group_item_all as a where a.user_idhash = @IdHash and  a.user_group_id = @NewRol AND a.status = 0 )";
                    textselect = textselect + " IF((@NewRol = 46 AND  @HayPerfil = 0))";
                    textselect = textselect + " BEGIN";
                    textselect = textselect + "     PRINT N'B) INSERTAR EL PERFIL DE AUDITOR QUE YA ESTA COMO LIDER';";
                    textselect = textselect + "     INSERT INTO[security].[user_group_item_all]";
                    textselect = textselect + "     ([system_id], [user_group_id], [user_id], [user_idhash], [status], [created_by], [created_date], [last_updated_by], ";
                    textselect = textselect + "     [last_updated_date], [attribute1], [attribute2], [attribute3], [attribute4],[attribute5]) ";
                    //textselect = textselect + "     VALUES ( 8, 46, NULL, @IdHash, 1, '"+create_by+"', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);";
                     textselect = textselect + "     VALUES ( 8, 46, NULL, @IdHash, 1, '"+create_by+"', '"+fechaHora+"', NULL, NULL, '"+name+"', '"+dni+"', '"+correo+"', NULL, NULL);";

                    //textselect = textselect + "     --UPDATE[security].[user_group_item_all] SET [status] = 0 , [last_updated_by] = '"+create_by+"', [last_updated_date] = '"+fechaHora+"'  WHERE user_idhash = @IdHash and user_group_id = 42 ";
                    textselect = textselect + " END              ";
                    textselect = textselect + " END ";


                    textselect = textselect + " IF (@Rol1 = 0 AND @Rol2 = 46 AND @Rol3 = 0) AND ( @NewRol = 41)";
                    textselect = textselect + "     BEGIN ";
                    textselect = textselect + " PRINT N'C) TIENE PERFIL SOLO DE AUDITOR Y LO VAMOS A PONER LIDER';";
                    textselect = textselect + " SET @HayPerfil = (select count(a.Id) as HayPerfil from[security].user_group_item_all as a where a.user_idhash = @IdHash and  a.user_group_id = @NewRol AND a.status = 0 )";
                    textselect = textselect + " IF((@NewRol = 41 AND  @HayPerfil = 0))";
                    textselect = textselect + " BEGIN";
                    textselect = textselect + "     PRINT N'B) INSERTAR EL PERFIL DE LIDER QUE YA ESTA COMO AUDITOR';";
                    textselect = textselect + "     INSERT INTO[security].[user_group_item_all]";
                    textselect = textselect + "     ([system_id], [user_group_id], [user_id], [user_idhash], [status], [created_by], [created_date], [last_updated_by], ";
                    textselect = textselect + "     [last_updated_date], [attribute1], [attribute2], [attribute3], [attribute4],[attribute5]) ";
                   // textselect = textselect + "     VALUES ( 8, 41, NULL, @IdHash, 1, '"+create_by+"', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);";
                     textselect = textselect + "     VALUES ( 8, 41, NULL, @IdHash, 1, '"+create_by+"', '"+fechaHora+"', NULL, NULL, '"+name+"', '"+dni+"', '"+correo+"', NULL, NULL);";


                    textselect = textselect + " END              ";
                    textselect = textselect + " END ";



                    textselect = textselect + " IF (@Rol1 = 41 AND @Rol2 = 0 AND @Rol3 = 0) AND ( @NewRol = 42)";
                    textselect = textselect + "     BEGIN ";
                    textselect = textselect + " PRINT N'C) TIENE PERFIL SOLO DE LIDER Y LO VAMOS A PONER OBSERVADOR';";
                    textselect = textselect + " SET @HayPerfil = (select count(a.Id) as HayPerfil from[security].user_group_item_all as a where a.user_idhash = @IdHash and  a.user_group_id = @NewRol AND a.status = 0 )";

                    textselect = textselect + " IF((@NewRol = 42 AND  @HayPerfil = 0))";
                    textselect = textselect + " BEGIN";
                    textselect = textselect + "     PRINT N'B) INSERTAR EL PERFIL DE OBSERVADOR QUE YA ESTA COMO LIDER';";
                    textselect = textselect + "     INSERT INTO[security].[user_group_item_all]";
                    textselect = textselect + "     ([system_id], [user_group_id], [user_id], [user_idhash], [status], [created_by], [created_date], [last_updated_by],";
                    textselect = textselect + "     [last_updated_date], [attribute1], [attribute2], [attribute3], [attribute4],[attribute5]) ";
                    //textselect = textselect + "     VALUES ( 8, 42, NULL, @IdHash, 1, '"+create_by+"', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);";
                     textselect = textselect + "     VALUES ( 8, 42, NULL, @IdHash, 1, '"+create_by+"', '"+fechaHora+"', NULL, NULL, '"+name+"', '"+dni+"', '"+correo+"', NULL, NULL);";


                    textselect = textselect + "     UPDATE[security].[user_group_item_all] SET [status] = 0 , [last_updated_by] = '"+create_by+"', [last_updated_date] = '"+fechaHora+"'  WHERE user_idhash = @IdHash and user_group_id = 41 ";
                    textselect = textselect + " END              ";
                    textselect = textselect + " END ";



                    textselect = textselect + " IF (@Rol1 = 0 AND @Rol2 = 46 AND @Rol3 = 0) AND ( @NewRol = 42)";
                    textselect = textselect + "     BEGIN ";
                    textselect = textselect + " PRINT N'C) TIENE PERFIL SOLO DE AUDITOR Y LO VAMOS A PONER OBSERVADOR';";
                    textselect = textselect + " SET @HayPerfil = (select count(a.Id) as HayPerfil from[security].user_group_item_all as a where a.user_idhash = @IdHash and  a.user_group_id = @NewRol AND a.status = 0 )";

                    textselect = textselect + " IF((@NewRol = 42 AND  @HayPerfil = 0))";
                    textselect = textselect + " BEGIN";
                    textselect = textselect + "     PRINT N'B) INSERTAR EL PERFIL DE OBSERVADOR QUE YA ESTA COMO AUDITOR';";
                    textselect = textselect + "     INSERT INTO[security].[user_group_item_all]";
                    textselect = textselect + "     ([system_id], [user_group_id], [user_id], [user_idhash], [status], [created_by], [created_date], [last_updated_by], ";
                    textselect = textselect + "     [last_updated_date], [attribute1], [attribute2], [attribute3], [attribute4],[attribute5]) ";
                   //textselect = textselect + "     VALUES ( 8, 42, NULL, @IdHash, 1, '"+create_by+"', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);";
                     textselect = textselect + "     VALUES ( 8, 42, NULL, @IdHash, 1, '"+create_by+"', '"+fechaHora+"', NULL, NULL, '"+name+"', '"+dni+"', '"+correo+"', NULL, NULL);";


                    textselect = textselect + "     UPDATE[security].[user_group_item_all] SET [status] = 0 , [last_updated_by] = '"+create_by+"', [last_updated_date] = '"+fechaHora+"'  WHERE user_idhash = @IdHash and user_group_id = 46 ";
                    textselect = textselect + " END              ";
                    textselect = textselect + " END ";


                    textselect = textselect + "";



                    textselect = textselect + "     IF (@Rol1 = 0 AND @Rol2 = 0 AND @Rol3 = 0) AND ( @NewRol = 41)";
                    textselect = textselect + "     BEGIN ";
                    textselect = textselect + "     PRINT N'B) INSERTAR DE LIDER POR PRIMER VEZ';";
                    textselect = textselect + "     INSERT INTO[security].[user_group_item_all]";
                    textselect = textselect + "     ([system_id], [user_group_id], [user_id], [user_idhash], [status], [created_by], [created_date], [last_updated_by], ";
                    textselect = textselect + "     [last_updated_date], [attribute1], [attribute2], [attribute3], [attribute4],[attribute5]) ";
                    //textselect = textselect + "     VALUES ( 8, 41, NULL, @IdHash, 1, '"+create_by+"', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);";
                     textselect = textselect + "     VALUES ( 8, 41, NULL, @IdHash, 1, '"+create_by+"', '"+fechaHora+"', NULL, NULL, '"+name+"', '"+dni+"', '"+correo+"', NULL, NULL);";
                    textselect = textselect + "     END";


                    textselect = textselect + " IF (@Rol1 = 0 AND @Rol2 = 0 AND @Rol3 = 0) AND ( @NewRol = 46)";
                    textselect = textselect + "     BEGIN  ";
                    textselect = textselect + "     PRINT N'B) INSERTAR DE AUDITOR POR PRIMER VEZ';";
                    textselect = textselect + "     INSERT INTO[security].[user_group_item_all]";
                    textselect = textselect + "     ([system_id], [user_group_id], [user_id], [user_idhash], [status], [created_by], [created_date], [last_updated_by], ";
                    textselect = textselect + "     [last_updated_date], [attribute1], [attribute2], [attribute3], [attribute4],[attribute5]) ";
                    //textselect = textselect + "     VALUES ( 8, 46, NULL, @IdHash, 1, '"+create_by+"', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);";
                     textselect = textselect + "     VALUES ( 8, 46, NULL, @IdHash, 1, '"+create_by+"', '"+fechaHora+"', NULL, NULL, '"+name+"', '"+dni+"', '"+correo+"', NULL, NULL);";
                    textselect = textselect + "     END";


                    textselect = textselect + "     IF (@Rol1 = 0 AND @Rol2 = 0 AND @Rol3 = 0) AND ( @NewRol = 42)";
                    textselect = textselect + "     BEGIN ";
                    textselect = textselect + "     PRINT N'B) INSERTAR DE OBSERVDOR POR PRIMER VEZ';";
                    textselect = textselect + "     INSERT INTO[security].[user_group_item_all]";
                    textselect = textselect + "     ([system_id], [user_group_id], [user_id], [user_idhash], [status], [created_by], [created_date], [last_updated_by], ";
                    textselect = textselect + "     [last_updated_date], [attribute1], [attribute2], [attribute3], [attribute4],[attribute5]) ";
                    //textselect = textselect + "     VALUES ( 8, 42, NULL, @IdHash, 1, '"+create_by+"', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);";
                     textselect = textselect + "     VALUES ( 8, 42, NULL, @IdHash, 1, '"+create_by+"', '"+fechaHora+"', NULL, NULL, '"+name+"', '"+dni+"', '"+correo+"', NULL, NULL);";
                    textselect = textselect + "     END";








           var StrQuery =  textselect;       
            //End - Manejo de Parametros
            log.LogInformation("StrQuery:"+StrQuery);
            //ShipDate < GetDate();    
                


            using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
            {  
             
                   var modified = cmd.ExecuteNonQuery();      

                log.LogInformation("modified:"+modified);
            }
          
            




        }

        //return newlongid;

        return 1;
    }

    public usergroupitemall funPutUserGroupItemAll(ILogger log,long curid, usergroupitemall curentity )
    {

        var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSecurity",EnvironmentVariableTarget.Process);
        log.LogInformation("ID A EDITAR:"+curid);
        //Lista de Objetos
        long newlongid;

        usergroupitemall curobj;
        string vvcomodin="";

        curobj = curentity;

        //SQL Objects
        SqlDataReader dataReader;

        using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
        {
            conn.Open();    

            //Start - Manejo de Parametros
                
            var textselectpart1 = "UPDATE security.user_group_item_all SET ";
            var textselectpart2 = " WHERE 1=1 AND id = @vncurid  ";

            textselectpart1 = textselectpart1 + " last_updated_by = @last_updated_by , last_updated_date = @last_updated_date ";      

            if( curentity.user_group_id > 0 )
            { textselectpart1 = textselectpart1 + ", user_group_id = @user_group_id ";   }

            textselectpart2 = textselectpart2 + " ; ";

            var StrQuery =  textselectpart1 + textselectpart2;       
            //End - Manejo de Parametros

            log.LogInformation("StrQuery:"+StrQuery);

            using (SqlCommand cmd = new SqlCommand(StrQuery, conn))
            {  
                   cmd.Parameters.AddWithValue("@vncurid", curid);

                   if( curentity.user_group_id > 0) cmd.Parameters.AddWithValue("@user_group_id", curentity.user_group_id);
            
                   cmd.Parameters.AddWithValue("@last_updated_by", curentity.last_updated_by);
                   cmd.Parameters.AddWithValue("@last_updated_date", curentity.last_updated_date);

                    
                   var modified = cmd.ExecuteNonQuery();           
                   log.LogInformation("modified:"+modified);   
            }

            if (conn.State == System.Data.ConnectionState.Open) 
            conn.Close();    

            return curobj;       
        }

        return curobj;
    }

    public usergroupitemall funGetUserGroupItemAll(ILogger log,long vnid, long vnsystem_id, long vnuser_group_id, long vnuser_id, string vvuser_idhash)
    {

    var vvsqlconnectionString = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_SqlAzureSecurity",EnvironmentVariableTarget.Process);
    
    log.LogInformation("CONSULTA SELECT, USER_ID:"+vnuser_id+" HASH:"+vvuser_idhash);
    //Lista de Objetos
    usergroupitemall curobj;
    string vvcomodin="";

     curobj = new usergroupitemall();

    //SQL Objects
    SqlDataReader dataReader;
    
        try{

            using (SqlConnection conn = new SqlConnection(vvsqlconnectionString))
            {
                conn.Open();    

               //Start - Manejo de Parametros
               
               var textselect = "SELECT * from security.user_group_item_all WHERE 1 = 1 ";
               
               if(vnid > 0)
               {textselect = textselect +  String.Format(" AND [id] = {0}",vnid);}

               if(vnsystem_id > 0)
               {textselect = textselect +  String.Format(" AND [system_id] = {0}",vnsystem_id);}

               if(vnuser_group_id > 0)
               {textselect = textselect +  String.Format(" AND [user_group_id] = {0}",vnuser_group_id);}

               if(vnuser_id > 0)
               {textselect = textselect +  String.Format(" AND [user_id] = {0}",vnuser_id);}

               if(vvuser_idhash != null)
               {textselect = textselect +  String.Format(" AND [user_idhash] = '{0}'",vvuser_idhash);}

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

                                curobj = new usergroupitemall();
                              
                                curobj.id                = (long)(dataReader.GetValue(0));
                                
                                if(!dataReader.IsDBNull(1)){ curobj.system_id = (long)(dataReader.GetValue(1));}       
                                if(!dataReader.IsDBNull(2)){ curobj.user_group_id         = (long)(dataReader.GetValue(2));}
                                if(!dataReader.IsDBNull(3)){ curobj.user_id          = (long)(dataReader.GetValue(3));}
            
                                if(!dataReader.IsDBNull(4)){ curobj.user_idhash = (string)(dataReader.GetValue(4));}
                                if(!dataReader.IsDBNull(5)){ curobj.status          = (int)(dataReader.GetValue(5));}
                                

                            }  
                     }  
                }



               conn.Close();    

               return curobj;
            }
     
        }
        catch (Exception ex)
        {
                            log.LogInformation("EX:"+ex.Message);
                            curobj = new usergroupitemall();
                         
                            curobj.id = 0;
                            
                            curobj.system_id = 0; 
                   
                             

        }
  
        return curobj;
    }

}



public class usergroupitemall
{
    public long id {get; set;} 
    public long system_id {get; set;} 
    public long user_group_id {get; set;} 
    public long user_id {get; set;} 
    public string user_idhash {get; set;} 
    public long status {get; set;}      
    public string created_by {get; set;}
    public DateTime created_date {get; set;}
    public string last_updated_by {get; set;}
    public DateTime last_updated_date {get; set;}
    public string attribute1 {get; set;}
    public string attribute2 {get; set;}
    public string attribute3 {get; set;}
    public string attribute4 {get; set;}
    public string attribute5 {get; set;}
}