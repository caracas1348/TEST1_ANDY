#r "Newtonsoft.Json"
#load "sqldb_personall_post.csx"
#load "sqldb_userextall_post.csx"
#load "sqldb_usergroupitemall_post.csx"
#load "sqldb_usersysteminformationall_post.csx"
#load "sqldb_inspector_post.csx"

using System;
using System.Globalization;
using System.Net;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System.Configuration;
using System.Collections;
using System.Text;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;

public static async Task<IActionResult> Run(HttpRequest req, ILogger log)
{
     log.LogInformation("C# HTTP trigger function processed a request.");

    var requestHeader = req.Headers;
    var vvapikeysecure = Environment.GetEnvironmentVariable("apikey",EnvironmentVariableTarget.Process);
    string vvapiKeyparameter = requestHeader["apiKey"];

    string jsonrspt = "";
    string name = req.Query["name"];
    string vvhttpmethod = req.Query["httpmethod"];
    int vnsearch_typeperson                     = 1;//parametro de busqueda de persona
    Account oAccount =  new Account();

  //Evaluar Clave API
  if(vvapikeysecure != vvapiKeyparameter )
  {
    vvhttpmethod="";
    jsonrspt="{}";
  }

  /*START - Parametros de Lectura*/

    string requestBody = await new StreamReader(req.Body).ReadToEndAsync();

   log.LogInformation("requestBody:"+requestBody);

    dynamic dataobject = JsonConvert.DeserializeObject(requestBody);

    DataAccessInspector vobj_sqldata_inspector = new DataAccessInspector();
    Inspector objInspector = new Inspector();

    DataAccessPersonAll vobj_sqldata = new DataAccessPersonAll();
    personall curobj = new personall();

    long newid =0;
    long curid =0;
    long newUserId =0;
    long newUserGroupId =0;
    //Invocar INSERT
    if(vvhttpmethod == "post")
    {

        if((int)dataobject.person_type == 2)
        {
            log.LogInformation("ES EXTERNO");
            personall reqPerson = vobj_sqldata.funGetPersonAll(log,vnsearch_typeperson ,null ,(string)dataobject.identity_document);

            if((long)reqPerson.id > 0)
            {
                log.LogInformation("SE ENCUENTRA REGISTRADO");
                string identity_document = Convert.ToString(dataobject.identity_document);

                int check = vobj_sqldata_inspector.funGetInspectorbyIdentityDocument(log,identity_document);
                log.LogInformation("check -> "+check);
                log.LogInformation("identity_document -> "+identity_document);
                if(check > 0)
                {
                    oAccount.error      = 1;
                    oAccount.message    = "El documento de identidad ya se encuentra registrado.";
                    jsonrspt = JsonConvert.SerializeObject(oAccount, Formatting.Indented);
                }
                else
                {

                    DataAccessUserExtAll vobj_sqlUserExt = new DataAccessUserExtAll();

                    log.LogInformation("reqPerson.id -> "+reqPerson.id);
                    userextall vobjUserExt = vobj_sqlUserExt.funGetUserExtAll(log,1,0,(long)reqPerson.id,null,null) ;
                    log.LogInformation("vobjUserExt.id -> "+vobjUserExt.id);
                    if(vobjUserExt.id > 0)
                    {

                        DataAccessUserSystemInformationAll vobj_sqldata7    = new DataAccessUserSystemInformationAll();

                        usersysteminformationall oUsersysteminformationall = new usersysteminformationall();

                        oUsersysteminformationall.user_id       = vobjUserExt.id;
                        oUsersysteminformationall.userhash_id   = Convert.ToString(vobjUserExt.idhash);
                        oUsersysteminformationall.system_id     = 8;
                        oUsersysteminformationall.status        = 1;
                        oUsersysteminformationall.status_txt     = "1";
                        oUsersysteminformationall.created_by    = dataobject.created_by;
                        oUsersysteminformationall.last_updated_by = dataobject.created_by;
                        oUsersysteminformationall =  funsetusersysteminformationall( log, oUsersysteminformationall ,vvhttpmethod );
                        Task<long> curobjusi        = vobj_sqldata7.funPostUserSytemInformationAll( log , oUsersysteminformationall);
                        curobjusi.Wait();



                        DataAccessUserGroupItemAll vobj_sqlUserGroup = new DataAccessUserGroupItemAll();

                        usergroupitemall oUserGroup = new usergroupitemall();

                        oUserGroup.system_id        = 8;
                        oUserGroup.user_group_id    = (long)dataobject.person_rol;
                        oUserGroup.user_id          = vobjUserExt.id;
                        oUserGroup.user_idhash      = vobjUserExt.idhash;
                        oUserGroup.status           = 1;
                        oUserGroup.created_by       = dataobject.created_by;
                        oUserGroup.last_updated_by  = dataobject.last_updated_by;
                        oUserGroup                  = funsetUserGroupItemAll(log,oUserGroup,vvhttpmethod);
                        Task<long> curobjtaskUserGroup = vobj_sqlUserGroup.funPostUserGroupItemAll(log,oUserGroup);
                        curobjtaskUserGroup.Wait();
                        newUserGroupId = (long)curobjtaskUserGroup.Result;
                        oUserGroup.id = newUserGroupId;


                        //registramos en inspectores
                        dataobject.firstname = dataobject.firstname + " " + dataobject.lastname;
                        dataobject.hash_id = Convert.ToString(vobjUserExt.idhash);
                        objInspector = funsetinspector(log,dataobject,vvhttpmethod);
                        Task<long> curobjtaskinspector = vobj_sqldata_inspector.funPostInspector( log , objInspector);
                        curobjtaskinspector.Wait();

                        oAccount.error      = 0;
                        oAccount.message    = "Registro exitoso.";
                        jsonrspt = JsonConvert.SerializeObject(oAccount, Formatting.Indented);
                    }
                    else
                    {
                        log.LogInformation("else de -> vobjUserExt.id > 0");
                        log.LogInformation("reqPerson.id -> "+reqPerson.id);
                        log.LogInformation("reqPerson.id_external_company -> "+reqPerson.id_external_company);
                        //USUARIO YA REGISTRADO
                        // oAccount.error      = 1;
                        // oAccount.message    = "Imposible registrar. Contacte al administrador del sistema";
                        // jsonrspt = JsonConvert.SerializeObject(oAccount, Formatting.Indented);
                        ////////////////////////////
                        //DataAccessUserExtAll vobj_sqlUserExt = new DataAccessUserExtAll();
                        //creamos instancia al objeto usuario
                        userextall oUserEst             = new userextall();
                        //--------------------
                        //oUserEst.id_person         = (long)curobjtaskPerson.Result;
                        //CREAMOS EL USUARIO A ESA PERSONA
                        oUserEst.username                = dataobject.userResponsible;
                        oUserEst.fullusername            = dataobject.firstname+" "+dataobject.lastname;//person.first_name +" "+ person.last_name;
                        oUserEst.passwordkey             = dataobject.passResponsible;
                        oUserEst.person_id_txt           = Convert.ToString(reqPerson.id);
                        oUserEst.created_by              = dataobject.created_by;
                        oUserEst.last_updated_by         = dataobject.last_updated_by;
                        //oUserEst.attribute1             = dataobject.attribute1;
                        oUserEst.attribute2              = dataobject.userAttribute2;
                        oUserEst.external_company_id_txt = Convert.ToString(reqPerson.id_external_company);
                        oUserEst                         = funsetUserExtAll(log,oUserEst,vvhttpmethod);

                        Task<long> curobjtaskUser        = vobj_sqlUserExt.funPostUserextAll(log,oUserEst);

                        curobjtaskUser.Wait();
                        newUserId   = (long)curobjtaskUser.Result;
                        oUserEst.id = newUserId;

                        log.LogInformation("oUserEst.id -> "+oUserEst.id);
                        if(oUserEst.id > 0)
                        {

                            vobjUserExt = vobj_sqlUserExt.funGetUserExtAll(log,1,oUserEst.id,0,null,null) ;

                            DataAccessUserSystemInformationAll vobj_sqldata7   = new DataAccessUserSystemInformationAll();

                            usersysteminformationall oUsersysteminformationall = new usersysteminformationall();

                            log.LogInformation("vobjUserExt.id -> "+vobjUserExt.id);
                            log.LogInformation("vobjUserExt.idhash -> "+vobjUserExt.idhash);

                            oUsersysteminformationall.user_id         = vobjUserExt.id;
                            oUsersysteminformationall.userhash_id     = Convert.ToString(vobjUserExt.idhash);
                            oUsersysteminformationall.system_id       = 8;
                            oUsersysteminformationall.status          = 1;
                            oUsersysteminformationall.status_txt      = "1";
                            oUsersysteminformationall.created_by      = dataobject.created_by;
                            oUsersysteminformationall.last_updated_by = dataobject.created_by;
                            oUsersysteminformationall                 =  funsetusersysteminformationall( log, oUsersysteminformationall ,vvhttpmethod );
                            Task<long> curobjusi                      = vobj_sqldata7.funPostUserSytemInformationAll( log , oUsersysteminformationall);
                            curobjusi.Wait();

                            DataAccessUserGroupItemAll vobj_sqlUserGroup = new DataAccessUserGroupItemAll();

                            usergroupitemall oUserGroup = new usergroupitemall();

                            oUserGroup.system_id        = 8;
                            oUserGroup.user_group_id    = (long)dataobject.person_rol;
                            oUserGroup.user_id          = oUserEst.id;
                            oUserGroup.user_idhash      = vobjUserExt.idhash;
                            oUserGroup.status           = 1;
                            oUserGroup.created_by       = dataobject.created_by;
                            oUserGroup.last_updated_by  = dataobject.last_updated_by;
                            oUserGroup                  = funsetUserGroupItemAll(log,oUserGroup,vvhttpmethod);
                            Task<long> curobjtaskUserGroup = vobj_sqlUserGroup.funPostUserGroupItemAll(log,oUserGroup);
                            curobjtaskUserGroup.Wait();
                            newUserGroupId = (long)curobjtaskUserGroup.Result;
                            oUserGroup.id = newUserGroupId;

                            log.LogInformation("oUserGroup.id -> "+oUserGroup.id);

                            //registramos en inspectores
                            dataobject.firstname = dataobject.firstname + " " + dataobject.lastname;
                            dataobject.hash_id = Convert.ToString(vobjUserExt.idhash);
                            objInspector = funsetinspector(log,dataobject,vvhttpmethod);
                            Task<long> curobjtaskinspector = vobj_sqldata_inspector.funPostInspector( log , objInspector);
                            curobjtaskinspector.Wait();

                            // registro exitoso
                            oAccount.error      = 0;
                            oAccount.message    = "Registro exitoso.";
                            log.LogInformation("oAccount.error -> "+oAccount.error);
                            log.LogInformation("oAccount.message -> "+oAccount.message);
                            //Conversion de Respuestas a JSON
                            jsonrspt = JsonConvert.SerializeObject(oAccount, Formatting.Indented);

                        }
                        ////////////////////////////*/
                    }

                }


            }
            else
            {
                DataAccessUserExtAll vobj_sqlUserExt1 = new DataAccessUserExtAll();
                userextall validateusername = vobj_sqlUserExt1.funGetUserExtAll(log,1,0,0,null,(string)dataobject?.userResponsible) ;

                if(validateusername.id>0)
                {
                    //USUARIO YA REGISTRADO
                    oAccount.error      = 1;
                    oAccount.message    = "El usuario ya se encuentra registrado.";
                    jsonrspt = JsonConvert.SerializeObject(oAccount, Formatting.Indented);
                }
                else
                {
                    log.LogInformation("NO SE ENCUENTRA REGISTRADO");
                    //NO SE ENCUENTRA REGISTRADO
                    curobj =  funsetObject( log, dataobject ,vvhttpmethod );
                    Task<long> curobjtask = vobj_sqldata.funPostPersonAll( log , curobj);
                    curobjtask.Wait();
                    newid = (long)curobjtask.Result;
                    curobj.id = newid;

                    if(curobj.id > 0)
                    {
                        DataAccessUserExtAll vobj_sqlUserExt = new DataAccessUserExtAll();
                        //creamos instancia al objeto usuario
                        userextall oUserEst             = new userextall();
                        //--------------------
                        //oUserEst.id_person         = (long)curobjtaskPerson.Result;
                        //CREAMOS EL USUARIO A ESA PERSONA
                        oUserEst.username               = dataobject.userResponsible;
                        oUserEst.fullusername           = dataobject.firstname+" "+dataobject.lastname;//person.first_name +" "+ person.last_name;
                        oUserEst.passwordkey            = dataobject.passResponsible;
                        oUserEst.person_id_txt          = Convert.ToString(curobj.id);
                        oUserEst.created_by             = dataobject.created_by;
                        oUserEst.last_updated_by        = dataobject.last_updated_by;
                        oUserEst.attribute1             = dataobject.attribute1;
                        oUserEst.attribute2             = dataobject.userAttribute2;
                        oUserEst.external_company_id_txt = Convert.ToString(curobj.id_external_company);
                        oUserEst                    = funsetUserExtAll(log,oUserEst,vvhttpmethod);
                        Task<long> curobjtaskUser = vobj_sqlUserExt.funPostUserextAll(log,oUserEst);
                        curobjtaskUser.Wait();
                        newUserId = (long)curobjtaskUser.Result;
                        oUserEst.id = newUserId;

                        if(oUserEst.id > 0)
                        {

                            userextall vobjUserExt = vobj_sqlUserExt.funGetUserExtAll(log,1,oUserEst.id,0,null,null) ;

                            DataAccessUserSystemInformationAll vobj_sqldata7    = new DataAccessUserSystemInformationAll();

                            usersysteminformationall oUsersysteminformationall = new usersysteminformationall();

                            oUsersysteminformationall.user_id       = vobjUserExt.id;
                            oUsersysteminformationall.userhash_id   = Convert.ToString(vobjUserExt.idhash);
                            oUsersysteminformationall.system_id     = 8;
                            oUsersysteminformationall.status        = 1;
                            oUsersysteminformationall.status_txt     = "1";
                            oUsersysteminformationall.created_by    = dataobject.created_by;
                            oUsersysteminformationall.last_updated_by = dataobject.created_by;
                            oUsersysteminformationall =  funsetusersysteminformationall( log, oUsersysteminformationall ,vvhttpmethod );
                            Task<long> curobjusi        = vobj_sqldata7.funPostUserSytemInformationAll( log , oUsersysteminformationall);
                            curobjusi.Wait();

                            DataAccessUserGroupItemAll vobj_sqlUserGroup = new DataAccessUserGroupItemAll();

                            usergroupitemall oUserGroup = new usergroupitemall();

                            oUserGroup.system_id        = 8;
                            oUserGroup.user_group_id    = (long)dataobject.person_rol;
                            oUserGroup.user_id          = oUserEst.id;
                            oUserGroup.user_idhash      = vobjUserExt.idhash;
                            oUserGroup.status           = 1;
                            oUserGroup.created_by       = dataobject.created_by;
                            oUserGroup.last_updated_by  = dataobject.last_updated_by;
                            oUserGroup                  = funsetUserGroupItemAll(log,oUserGroup,vvhttpmethod);
                            Task<long> curobjtaskUserGroup = vobj_sqlUserGroup.funPostUserGroupItemAll(log,oUserGroup);
                            curobjtaskUserGroup.Wait();
                            newUserGroupId = (long)curobjtaskUserGroup.Result;
                            oUserGroup.id = newUserGroupId;

                            //registramos en inspectores
                            dataobject.firstname = dataobject.firstname + " " + dataobject.lastname;
                            dataobject.hash_id = Convert.ToString(vobjUserExt.idhash);
                            objInspector = funsetinspector(log,dataobject,vvhttpmethod);
                            Task<long> curobjtaskinspector = vobj_sqldata_inspector.funPostInspector( log , objInspector);
                            curobjtaskinspector.Wait();

                        }
                    }

                    oAccount.error      = 0;
                    oAccount.message    = "Registro exitoso.";
                    //Conversion de Respuestas a JSON
                    jsonrspt = JsonConvert.SerializeObject(oAccount, Formatting.Indented);
                }

            }


        }
        else if((int)dataobject.person_type == 1)
        {

            log.LogInformation("ES COLABORADOR");
            DataAccessUserGroupItemAll vobj_sqlUserGroup = new DataAccessUserGroupItemAll();

            usergroupitemall oUserGroup = new usergroupitemall();

            oUserGroup.system_id        = 8;
            oUserGroup.user_group_id    = (long)dataobject.person_rol;
            //oUserGroup.user_id          = oUserEst.id;
            oUserGroup.user_idhash      = dataobject.idhash;
            oUserGroup.status           = 1;
            oUserGroup.created_by       = dataobject.created_by;
            oUserGroup.last_updated_by  = dataobject.last_updated_by;

            string hash = Convert.ToString(dataobject.idhash);

            int check = vobj_sqldata_inspector.funGetInspectorbyIdHash(log,hash);

            if(check > 0)
            {
                oAccount.error      = 1;
                oAccount.message    = "Ya se encuentra registrado.";
                jsonrspt = JsonConvert.SerializeObject(oAccount, Formatting.Indented);
            }
            else
            {

                oUserGroup                  = funsetUserGroupItemAll(log,oUserGroup,vvhttpmethod);
                Task<long> curobjtaskUserGroup = vobj_sqlUserGroup.funPostUserGroupItemAll(log,oUserGroup);
                curobjtaskUserGroup.Wait();
                newUserGroupId = (long)curobjtaskUserGroup.Result;
                oUserGroup.id = newUserGroupId;

                //registramos en inspectores
                dataobject.hash_id = dataobject.idhash;
                objInspector = funsetinspector(log,dataobject,vvhttpmethod);
                Task<long> curobjtaskinspector = vobj_sqldata_inspector.funPostInspector( log , objInspector);
                curobjtaskinspector.Wait();

                oAccount.error      = 0;
                oAccount.message    = "Registro Exitoso.";
                jsonrspt = JsonConvert.SerializeObject(oAccount, Formatting.Indented);
            }
        }

    }


  //Invocar PUT
  if(vvhttpmethod == "put"){

        userextall oUserEst = new userextall();
        DataAccessUserExtAll vobj_sqlUserExt = new DataAccessUserExtAll();

        string fullname = dataobject.firstname+" "+dataobject.lastname;

        userextall vobjUserExt = vobj_sqlUserExt.funGetUserExtAll(log,1,0,0,(string)dataobject.idhash,null) ;
        long pId =  vobjUserExt.person_id;

        curobj.job = dataobject.job;
        curobj.firstname = dataobject.firstname;
        curobj.lastname = dataobject.lastname;
        curobj.last_updated_by   = dataobject.last_updated_by;
        curobj.last_updated_date = System.DateTime.Now;
        curobj = vobj_sqldata.funPutPersonAll(log,pId,curobj);

        oUserEst.username               = dataobject.userResponsible;
        oUserEst.fullusername           = fullname;
        if(dataobject.passResponsible != "" && dataobject.passResponsible != null ){
          oUserEst.passwordkey            = dataobject.passResponsible;
        }
        oUserEst.last_updated_by        = dataobject.last_updated_by;
        oUserEst.attribute1             = dataobject.userAttribute1;
        oUserEst.attribute2             = dataobject.userAttribute2;
        oUserEst.attribute3             = dataobject.userAttribute3;
        oUserEst.attribute4             = dataobject.userAttribute4;
        oUserEst.attribute5             = dataobject.userAttribute5;
        oUserEst = funsetUserExtAll(log,oUserEst,vvhttpmethod);
        oUserEst   = vobj_sqlUserExt.funPutUserextAll(log,(string)dataobject.idhash,oUserEst);

        curid= System.Convert.ToInt32(req.Query["id"]);
        dataobject.firstname = fullname;
        objInspector =  funsetinspector(log,dataobject,vvhttpmethod );
        objInspector = vobj_sqldata_inspector.funPutInspector(log,curid,objInspector);
        objInspector.Id = curid;

        oAccount.error      = 0;
        oAccount.message    = "Registro exitoso.";
        jsonrspt = JsonConvert.SerializeObject(oAccount, Formatting.Indented);

  }

   if(vvhttpmethod == "changeImage"){

    curid= System.Convert.ToInt64(req.Query["id"]);
    curobj =  funsetObject( log , dataobject,vvhttpmethod );
    curobj = vobj_sqldata.funPutPersonAll( log ,curid, curobj);
    curobj.id = curid;
    //Conversion de Respuestas a JSON
    jsonrspt = JsonConvert.SerializeObject(curobj, Formatting.Indented);
   }

    //Invocar DELETE
   if(vvhttpmethod == "delete"){

   curid= System.Convert.ToInt64(req.Query["id"]);
   long nrorows = vobj_sqldata.funDeletePersonAll( log ,curid );

    //Conversion de Respuestas a JSON
    jsonrspt = JsonConvert.SerializeObject(nrorows, Formatting.Indented);
   }

  /*
  if(vvhttpmethod == "deleteall"){


   long nrorows = vobj_sqldata.funDeleteAllPersonAll( log );

    //Conversion de Respuestas a JSON
    jsonrspt = JsonConvert.SerializeObject(nrorows, Formatting.Indented);
   }
   */




    return jsonrspt != null
        ? (ActionResult)new OkObjectResult( jsonrspt )
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
}






public static personall funsetObject(ILogger log, dynamic dataobject, string vvmethod)
{


             string vvidentity_document   = dataobject?.identity_document;
             string vvfirstname   = dataobject?.firstname;
             string vvlastname   = dataobject?.lastname;


             string vvidentity_document_type   = dataobject?.identity_document_type;
             string vvcountry   = dataobject?.country;
             string vvcity   = dataobject?.city;
             string vvdepartment   = dataobject?.department;
             string vvjob   = dataobject?.job;
             string vvoffice   = dataobject?.office;
             string vvstreet_address   = dataobject?.street_address;
             string vvmobile   = dataobject?.mobile;
             string vvemail   = dataobject?.email;

             string vvid_external_company   = dataobject?.id_external_company;





             string vvcreated_by   = dataobject?.created_by;
             string vvlast_updated_by   = dataobject?.last_updated_by;

             string vvattribute1 = dataobject?.attribute1;
             string vvattribute2 = dataobject?.attribute2;
             string vvattribute3 = dataobject?.attribute3;
             string vvattribute4 = dataobject?.attribute4;
             string vvattribute5 = dataobject?.attribute5;
             string vvperson_picture = dataobject?.person_picture;



                        personall curobj = new personall();

                        curobj.identity_document  = vvidentity_document;
                        curobj.firstname     = vvfirstname;
                        curobj.lastname     = vvlastname;

                        curobj.identity_document_type  = vvidentity_document_type;
                        curobj.country  = vvcountry;
                        curobj.city  = vvcity;
                        curobj.department  = vvdepartment;
                        curobj.job  = vvjob;
                        curobj.office  = vvoffice;
                        curobj.street_address  = vvstreet_address;
                        curobj.mobile  = vvmobile;
                        curobj.email  = vvemail;

                        if(vvid_external_company != null)
                        {
                          curobj.id_external_company  = System.Convert.ToInt64(vvid_external_company);
                        }



     //  public DateTime finish_date {get; set;}






                       if(vvmethod == "post")
                       {
                        curobj.created_by        = vvcreated_by;
                        curobj.created_date      = System.DateTime.Now;
                        curobj.start_date       = System.DateTime.Now;

                       }

                        curobj.last_updated_by   = vvlast_updated_by;
                        curobj.last_updated_date = System.DateTime.Now;

                         curobj.attribute1 = vvattribute1;
                         curobj.attribute2 = vvattribute2;
                         curobj.attribute3 = vvattribute3;
                         curobj.attribute4 = vvattribute4;
                         curobj.attribute5 = vvattribute5;
                         curobj.person_picture = vvperson_picture;



  return curobj;
}

public static userextall funsetUserExtAll(ILogger log, dynamic dataobject, string vvmethod)
{
    string vvusername           = dataobject?.username;
    string vvfullusername       = dataobject?.fullusername;
    string vvcountry            = dataobject?.country;
    string vvcity               = dataobject?.city;
    string vvpasswordkey        = dataobject?.passwordkey;
    string vvperson_id_txt      = dataobject?.person_id_txt;
    string vvexternal_company_id_txt   = dataobject?.external_company_id_txt;

    long vnperson_id            = 0 ;
    long vnexternal_company_id  =  0;
    if(vvperson_id_txt == null){vnperson_id =  0;}
    else{vnperson_id = Convert.ToInt64(vvperson_id_txt);}
    if(vvexternal_company_id_txt == null){vnexternal_company_id = 0;}
    else{vnexternal_company_id = Convert.ToInt64(vvexternal_company_id_txt);}
    string vvcreated_by         = dataobject?.created_by;
    string vvlast_updated_by    = dataobject?.last_updated_by;
    string vvattribute1         = dataobject?.attribute1;
    string vvattribute2         = dataobject?.attribute2;
    string vvattribute3         = dataobject?.attribute3;
    string vvattribute4         = dataobject?.attribute4;
    string vvattribute5         = dataobject?.attribute5;
    userextall curobj           = new userextall();
    curobj.username             = vvusername;
    curobj.fullusername         = vvfullusername;
    curobj.country              = vvcountry;
    curobj.city                 = vvcity;
    curobj.passwordkey          = vvpasswordkey;
    curobj.external_company_id  = vnexternal_company_id;
    curobj.person_id            = vnperson_id;

    if(vvmethod == "post"){
        curobj.created_by   = vvcreated_by;
        curobj.created_date = System.DateTime.Now;
        curobj.start_date   = System.DateTime.Now;
    }
    curobj.last_updated_by      = vvlast_updated_by;
    curobj.last_updated_date    = System.DateTime.Now;
    curobj.attribute1           = vvattribute1;
    curobj.attribute2           = vvattribute2;
    curobj.attribute3           = vvattribute3;
    curobj.attribute4           = vvattribute4;
    curobj.attribute5           = vvattribute5;
    return curobj;
}

public static usergroupitemall funsetUserGroupItemAll(ILogger log, dynamic dataobject, string vvmethod)
{
    long vnsystem_id            = dataobject?.system_id;
    long vnuser_group_id        = dataobject?.user_group_id;
    long vnuser_id              = dataobject?.user_id;
    string vvuser_idhash        = dataobject?.user_idhash;
    long vnstatus               = dataobject?.status;
    string vvcreated_by         = dataobject?.created_by;
    string vvlast_updated_by    = dataobject?.last_updated_by;
    string vvattribute1         = dataobject?.attribute1;
    string vvattribute2         = dataobject?.attribute2;
    string vvattribute3         = dataobject?.attribute3;
    string vvattribute4         = dataobject?.attribute4;
    string vvattribute5         = dataobject?.attribute5;

    usergroupitemall curobj     = new usergroupitemall();

    curobj.system_id            = vnsystem_id;
    curobj.user_group_id        = vnuser_group_id;
    curobj.user_id              = vnuser_id;
    curobj.user_idhash          = vvuser_idhash;
    curobj.status               = vnstatus;

    if(vvmethod == "post"){
        curobj.created_by   = vvcreated_by;
        curobj.created_date = System.DateTime.Now;
    }
    curobj.last_updated_by      = vvlast_updated_by;
    curobj.last_updated_date    = System.DateTime.Now;
    curobj.attribute1           = vvattribute1;
    curobj.attribute2           = vvattribute2;
    curobj.attribute3           = vvattribute3;
    curobj.attribute4           = vvattribute4;
    curobj.attribute5           = vvattribute5;
    return curobj;
}

public static usersysteminformationall funsetusersysteminformationall(ILogger log, dynamic dataobject, string vvmethod)
{
    long vnuser_id          = dataobject?.user_id;
    string vvuserhash_id    = dataobject?.userhash_id;
    long vnsystem_id        = dataobject?.system_id;
    string vvstatus_txt     = dataobject?.status_txt;
    int vnstatus            = 0;
    if(vvstatus_txt == null){vnstatus = 0;}else{vnstatus = System.Convert.ToInt32(vvstatus_txt);}
    string vvcreated_by     = dataobject?.created_by;
    string vvlast_updated_by   = dataobject?.last_updated_by;
    usersysteminformationall curobj = new usersysteminformationall();
    curobj.user_id          = vnuser_id;
    curobj.userhash_id      = vvuserhash_id;
    curobj.system_id        = vnsystem_id;
    curobj.status           = vnstatus;
    if(vvmethod == "post" || vvmethod == "put" || vvmethod == "postSecurity"){
        curobj.created_by   = vvcreated_by;
        curobj.created_date = System.DateTime.Now;
    }
    curobj.last_updated_by   = vvlast_updated_by;
    curobj.last_updated_date = System.DateTime.Now;
    return curobj;
}

public static Inspector funsetinspector(ILogger log, dynamic dataobject, string vvmethod)
{
      TimeZoneInfo tzi = TimeZoneInfo.FindSystemTimeZoneById("SA Pacific Standard Time");

    string vvperson_name   = dataobject?.firstname;
    string vvhash_id    = dataobject?.hash_id;
    string vvjob    = dataobject?.job;
    string vvidentitydocument    = dataobject?.identity_document;
    string vvemail = dataobject?.email;
    int vnperson_type = 0;
    if (dataobject.person_type>0) {
        vnperson_type = dataobject.person_type;
    }
    int vnrole = 0;
    if (dataobject.person_rol>0) {
        vnrole = dataobject.person_rol;
    }
    int vnarea_id = 0;
    if (dataobject.area_id>0) {
        vnarea_id = dataobject.area_id;
    }
    long vnsede_id = 0;
    if (dataobject.sede_id>0) {
        vnsede_id = dataobject.sede_id;
    }
    int vnarea_responsible = 0;
    if (dataobject.area_responsible>0){
      vnarea_responsible = dataobject.area_responsible;
    }

    string vvcreated_by     = dataobject?.created_by;
    string vvlast_updated_by   = dataobject?.last_updated_by;

    Inspector curobj = new Inspector();
    curobj.PersonName          = vvperson_name;
    curobj.HashId      = vvhash_id;
    curobj.PersonType        = vnperson_type;
    curobj.Role           = vnrole;
    curobj.AreaId        = vnarea_id;
    curobj.SedeId           = vnsede_id;
    curobj.Job        =  vvjob;
    curobj.AreaResponsible =  vnarea_responsible;
    curobj.IdentityDocument =  vvidentitydocument;
    curobj.Email =  vvemail;
    if(vvmethod == "post"){
        curobj.Created_By   = vvcreated_by;
        curobj.Created_Date = System.DateTime.Now;
    }
    curobj.Last_Updated_By   = vvlast_updated_by;
    curobj.Last_Updated_Date = TimeZoneInfo.ConvertTime(System.DateTime.Now, tzi);

    return curobj;
}

public class Account
{
    public int error { get; set; }
    public string message { get; set; }
}