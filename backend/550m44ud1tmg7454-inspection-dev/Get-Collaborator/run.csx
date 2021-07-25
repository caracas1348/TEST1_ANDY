#r "Newtonsoft.Json"

using System; 
using System.Globalization;
using System.Net;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Configuration;
using System.Collections;
using System.Text;
using System.Net.Http;
using System.Net.Http.Headers; 
using Microsoft.AspNetCore.Mvc;  
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;

static readonly HttpClient client = new HttpClient();
public static async Task<IActionResult> Run(HttpRequest req, ILogger log)
{
    log.LogInformation("C# HTTP trigger function processed a request.");
    
    var requestHeader           = req.Headers; 
    string vvauthorization      = requestHeader["Authorization"];

    var vvapikeysecure          = Environment.GetEnvironmentVariable("apikey",EnvironmentVariableTarget.Process);
    string vvapiKeyparameter    = requestHeader["apiKey"];
    string vvhttpmethod         = req.Query["httpmethod"];
    string requestBody          = await new StreamReader(req.Body).ReadToEndAsync();
    dynamic data                = JsonConvert.DeserializeObject(requestBody);
    string filter               = data.filter;
    string display_name         = data.display_name;
    string sap_id               = data.sap_id;
    string dni                  = data.dni;
    string plant_code           = data.unidad;
    //log.LogInformation(filter);
    string  result;
    string datareturn="{}";

    //Evaluar Clave API
    
    //Metodo:  list
    if(vvhttpmethod == "objectlist")
    {        

        //https://graph.windows.net/b7e26f48-2292-4a14-a355-1aeb8489ae3d/users?api-version=1.6&$filter=(mailNickname eq 'cmendoza')    
        //name = name ?? data?.name;
        //var json="{}";
        //string result       = "";
        //var url             = "https://graph.windows.net/b7e26f48-2292-4a14-a355-1aeb8489ae3d/users?api-version=1.6&$filter=startswith(displayName, 'proveedor') or startswith(userPrincipalName, 'proveedor')&$select=userPrincipalName,displayName,objectId,mobile,mailNickname,department,companyName,jobTitle,givenName,surname,extension_f356ba22a23b4c2fb35162e63d13246c_userDocumentNumber"; 
        /*var parameters      = new Dictionary<string, string> { { "client_id", oAuthtoken.client_id }, { "client_secret", oAuthtoken.client_secret },{ "scope", oAuthtoken.scope }, { "grant_type", oAuthtoken.grant_type } };
        var encodedContent  = new FormUrlEncodedContent (parameters);

        var response = await client.PostAsync (url, encodedContent).ConfigureAwait (false);
        if (response.StatusCode == HttpStatusCode.OK) {
            oRequestclientcredentials = new requestclientcredentials();
            result          = response.Content.ReadAsStringAsync().Result;
            dynamic  jsonreq   = JsonConvert.DeserializeObject(result);
            oRequestclientcredentials.token_type = jsonreq.token_type;
            oRequestclientcredentials.expires_in = jsonreq.expires_in;
            oRequestclientcredentials.ext_expires_in = jsonreq.ext_expires_in;
            oRequestclientcredentials.expires_on = jsonreq.expires_on;
            oRequestclientcredentials.not_before = jsonreq.not_before;
            oRequestclientcredentials.resource = jsonreq.resource;
            oRequestclientcredentials.access_token = jsonreq.access_token;
            var datareturn            = JsonConvert.SerializeObject(oRequestclientcredentials,Formatting.Indented);  
            return datareturn != null
                ? (ActionResult)new OkObjectResult(datareturn)
                : new BadRequestObjectResult("Please pass a name on the query string or in the request body"); 
        }
        else{
            log.LogInformation("Error");
            result = "{}";
            return result != null
                ? (ActionResult)new OkObjectResult(result)
                : new BadRequestObjectResult("Please pass a name on the query string or in the request body"); 
        }*/
        //var datajson        = new StringContent(json, Encoding.UTF8, "application/x-www-form-urlencoded");
        
        //dynamic dataReq;
        //log.LogInformation(vvauthorization);
        var url             = "https://graph.windows.net/b7e26f48-2292-4a14-a355-1aeb8489ae3d/users?api-version=1.6&$filter=startswith(displayName, '"+filter+"') or startswith(userPrincipalName, '"+filter+"')&$select=userPrincipalName,displayName,objectId,mobile,mailNickname,department,companyName,jobTitle,givenName,surname,extension_f356ba22a23b4c2fb35162e63d13246c_userDocumentNumber,extension_f356ba22a23b4c2fb35162e63d13246c_userEndDate,extension_f356ba22a23b4c2fb35162e63d13246c_userSAPR3Id";        
        log.LogInformation(url);
        

        //var response = await client.PostAsync(new Uri(url), content);

        //client.DefaultRequestHeaders.Add("Authorization", vvauthorization);
        
        //client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Token", vvauthorization);
        //response        = await client.GetAsync(url);
        //client.Timeout = new TimeSpan(0, 0, REQUEST_TIMEOUT_S);
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer",vvauthorization); //
        var response            = await client.GetAsync(url);
        datacollaborator oDatacollaborator = new datacollaborator();
        List<datavalue> listdatavalue = new List<datavalue>();
        
        //datareturn            = JsonConvert.SerializeObject(json,Formatting.Indented);    
        log.LogInformation(response.StatusCode.ToString()+'-'+HttpStatusCode.OK.ToString());
        if (response.StatusCode == HttpStatusCode.OK) {
            result        = response.Content.ReadAsStringAsync().Result;
            dynamic  jsonreq   = JsonConvert.DeserializeObject(result);
            oDatacollaborator.odatametadata = jsonreq["odata.metadata"];
            foreach (var value in jsonreq["value"]){
                datavalue oDatavalue        = new datavalue();
                oDatavalue.odatatype        = Convert.ToString(value["odata.type"]);
                oDatavalue.userPrincipalName= Convert.ToString(value["userPrincipalName"]);
                oDatavalue.displayName      = Convert.ToString(value["displayName"]);
                oDatavalue.objectId         = Convert.ToString(value["objectId"]);
                oDatavalue.mobile           = Convert.ToString(value["mobile"]);
                oDatavalue.mailNickname     = Convert.ToString(value["mailNickname"]);
                oDatavalue.department       = Convert.ToString(value["department"]);
                oDatavalue.companyName      = Convert.ToString(value["companyName"]);
                oDatavalue.jobTitle         = Convert.ToString(value["jobTitle"]);
                oDatavalue.givenName        = Convert.ToString(value["givenName"]);
                oDatavalue.surname          = Convert.ToString(value["surname"]);
                oDatavalue.userSAPR3Id      = Convert.ToString(value["extension_f356ba22a23b4c2fb35162e63d13246c_userSAPR3Id"]);
                DateTime userEndDate0        = System.DateTime.Now;                
                if(value["extension_f356ba22a23b4c2fb35162e63d13246c_userEndDate"]!=null){
                    userEndDate0 = DateTime.ParseExact(value["extension_f356ba22a23b4c2fb35162e63d13246c_userEndDate"], "yyyy-MM-ddTHH:mm:ssZ", CultureInfo.InvariantCulture);           
                    oDatavalue.userEndDate      = userEndDate0;
                }
                if(value["extension_f356ba22a23b4c2fb35162e63d13246c_userDocumentNumber"]!=null || value["extension_f356ba22a23b4c2fb35162e63d13246c_userDocumentNumber"]=="" ){
                    oDatavalue.identity_document = Convert.ToString(value["extension_f356ba22a23b4c2fb35162e63d13246c_userDocumentNumber"]);
                }
                else
                    oDatavalue.identity_document = "";
                //
                listdatavalue.Add(oDatavalue);
            }
            oDatacollaborator.value = listdatavalue;
            ///log.LogInformation(response.StatusCode.ToString()+'-'+HttpStatusCode.OK.ToString());
            datareturn    = JsonConvert.SerializeObject(oDatacollaborator,Formatting.Indented);
        }
    }

    if(vvhttpmethod == "object")
    {
        log.LogInformation("object");
        log.LogInformation(vvauthorization);
        var url             = "https://graph.windows.net/b7e26f48-2292-4a14-a355-1aeb8489ae3d/users?api-version=1.6&$filter=(objectId eq '"+filter+"')&$select=userPrincipalName,displayName,objectId,mobile,mailNickname,department,companyName,jobTitle,givenName,surname,extension_f356ba22a23b4c2fb35162e63d13246c_userDocumentNumber,extension_f356ba22a23b4c2fb35162e63d13246c_userEndDate, extension_f356ba22a23b4c2fb35162e63d13246c_userSAPR3Id";
        log.LogInformation(url);        
        //response        = await client.GetAsync(url);
        //client.Timeout = new TimeSpan(0, 0, REQUEST_TIMEOUT_S);
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer",vvauthorization); //
        var response            = await client.GetAsync(url);
        datacollaborator oDatacollaborator = new datacollaborator();
        List<datavalue> listdatavalue = new List<datavalue>();
        
        //datareturn            = JsonConvert.SerializeObject(json,Formatting.Indented);    
        log.LogInformation(response.StatusCode.ToString()+'-'+HttpStatusCode.OK.ToString());
        if (response.StatusCode == HttpStatusCode.OK) {
            result        = response.Content.ReadAsStringAsync().Result;
            dynamic  jsonreq   = JsonConvert.DeserializeObject(result);
            oDatacollaborator.odatametadata = jsonreq["odata.metadata"];
            foreach (var value in jsonreq["value"]){
                datavalue oDatavalue        = new datavalue();
                oDatavalue.odatatype        = Convert.ToString(value["odata.type"]);
                oDatavalue.userPrincipalName= Convert.ToString(value["userPrincipalName"]);
                oDatavalue.displayName      = Convert.ToString(value["displayName"]);
                oDatavalue.objectId         = Convert.ToString(value["objectId"]);
                oDatavalue.mobile           = Convert.ToString(value["mobile"]);
                oDatavalue.mailNickname     = Convert.ToString(value["mailNickname"]);
                oDatavalue.department       = Convert.ToString(value["department"]);
                oDatavalue.companyName      = Convert.ToString(value["companyName"]);
                oDatavalue.jobTitle         = Convert.ToString(value["jobTitle"]);
                oDatavalue.givenName        = Convert.ToString(value["givenName"]);
                oDatavalue.surname          = Convert.ToString(value["surname"]);
                oDatavalue.userSAPR3Id      = Convert.ToString(value["extension_f356ba22a23b4c2fb35162e63d13246c_userSAPR3Id"]);
                DateTime userEndDate1        = System.DateTime.Now;                
                if(value["extension_f356ba22a23b4c2fb35162e63d13246c_userEndDate"]!=null){
                    userEndDate1 = DateTime.ParseExact(value["extension_f356ba22a23b4c2fb35162e63d13246c_userEndDate"], "yyyy-MM-ddTHH:mm:ssZ", CultureInfo.InvariantCulture);           
                    oDatavalue.userEndDate      = userEndDate1;
                }

                if(value["extension_f356ba22a23b4c2fb35162e63d13246c_userDocumentNumber"]!=null || value["extension_f356ba22a23b4c2fb35162e63d13246c_userDocumentNumber"]=="" ){
                    oDatavalue.identity_document = Convert.ToString(value["extension_f356ba22a23b4c2fb35162e63d13246c_userDocumentNumber"]);
                }
                else
                    oDatavalue.identity_document = "";
                listdatavalue.Add(oDatavalue);
            }
            oDatacollaborator.value = listdatavalue;
            ///log.LogInformation(response.StatusCode.ToString()+'-'+HttpStatusCode.OK.ToString());
            datareturn    = JsonConvert.SerializeObject(oDatacollaborator,Formatting.Indented);
        }
    }


    
    if(vvhttpmethod == "objectdni")
    {
        log.LogInformation("object");
        log.LogInformation(vvauthorization);
        var url             = "https://graph.windows.net/b7e26f48-2292-4a14-a355-1aeb8489ae3d/users?api-version=1.6&$filter=(extension_f356ba22a23b4c2fb35162e63d13246c_userDocumentNumber eq '"+filter+"')&$select=userPrincipalName,displayName,objectId,mobile,mailNickname,department,companyName,jobTitle,givenName,surname,extension_f356ba22a23b4c2fb35162e63d13246c_userDocumentNumber,extension_f356ba22a23b4c2fb35162e63d13246c_userEndDate,extension_f356ba22a23b4c2fb35162e63d13246c_userSAPR3Id,extension_f356ba22a23b4c2fb35162e63d13246c_plantCode,extension_f356ba22a23b4c2fb35162e63d13246c_plantDescription,PhysicalDeliveryOfficeNam,extension_f356ba22a23b4c2fb35162e63d13246c_userUOCode,extension_f356ba22a23b4c2fb35162e63d13246c_userUODescription,extension_f356ba22a23b4c2fb35162e63d13246c_userAreaFuncCode,extension_f356ba22a23b4c2fb35162e63d13246c_userCompanyType";
        log.LogInformation(url);        
        //response        = await client.GetAsync(url);
        //client.Timeout = new TimeSpan(0, 0, REQUEST_TIMEOUT_S);
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer",vvauthorization); //
        var response            = await client.GetAsync(url);
        datacollaborator oDatacollaborator = new datacollaborator();
        List<datavalue> listdatavalue = new List<datavalue>();
        
        //datareturn            = JsonConvert.SerializeObject(json,Formatting.Indented);    
        log.LogInformation(response.StatusCode.ToString()+'-'+HttpStatusCode.OK.ToString());
        if (response.StatusCode == HttpStatusCode.OK) {
            result        = response.Content.ReadAsStringAsync().Result;
            dynamic  jsonreq   = JsonConvert.DeserializeObject(result);
            oDatacollaborator.odatametadata = jsonreq["odata.metadata"];
            foreach (var value in jsonreq["value"]){
                datavalue oDatavalue        = new datavalue();
                oDatavalue.odatatype        = Convert.ToString(value["odata.type"]);
                oDatavalue.userPrincipalName= Convert.ToString(value["userPrincipalName"]);
                oDatavalue.displayName      = Convert.ToString(value["displayName"]);
                oDatavalue.objectId         = Convert.ToString(value["objectId"]);
                oDatavalue.mobile           = Convert.ToString(value["mobile"]);
                oDatavalue.mailNickname     = Convert.ToString(value["mailNickname"]);
                oDatavalue.department       = Convert.ToString(value["department"]);
                oDatavalue.companyName      = Convert.ToString(value["companyName"]);
                oDatavalue.jobTitle         = Convert.ToString(value["jobTitle"]);
                oDatavalue.givenName        = Convert.ToString(value["givenName"]);
                oDatavalue.surname          = Convert.ToString(value["surname"]);
                oDatavalue.userSAPR3Id      = Convert.ToString(value["extension_f356ba22a23b4c2fb35162e63d13246c_userSAPR3Id"]);
                oDatavalue.plantCode        = Convert.ToString(value["extension_f356ba22a23b4c2fb35162e63d13246c_plantCode"]);
                oDatavalue.plantDescription = Convert.ToString(value["extension_f356ba22a23b4c2fb35162e63d13246c_plantDescription"]);
                oDatavalue.deliveryOfficeNam = Convert.ToString(value["PhysicalDeliveryOfficeNam"]);
                oDatavalue.userUOCode        = Convert.ToString(value["extension_f356ba22a23b4c2fb35162e63d13246c_userUOCode"]);//(Codigo unidad operativa)
                oDatavalue.userUODescription = Convert.ToString(value["extension_f356ba22a23b4c2fb35162e63d13246c_userUODescription"]);// (Descripcion Unidad Operativa)
                oDatavalue.userAreaFuncCode  = Convert.ToString(value["extension_f356ba22a23b4c2fb35162e63d13246c_userAreaFuncCode"]);// (Codigo Area Funcional)
                oDatavalue.userCompanyType   = Convert.ToString(value["extension_f356ba22a23b4c2fb35162e63d13246c_userCompanyType"]);// (Tipo de empleado)

                DateTime userEndDate        = System.DateTime.Now;                
                if(value["extension_f356ba22a23b4c2fb35162e63d13246c_userEndDate"]!=null && value["extension_f356ba22a23b4c2fb35162e63d13246c_userEndDate"]!="2700-01-01T00:00:00Z" && value["extension_f356ba22a23b4c2fb35162e63d13246c_userEndDate"]!="0001-01-01T00:00:00Z"){
                    userEndDate = DateTime.ParseExact(value["extension_f356ba22a23b4c2fb35162e63d13246c_userEndDate"], "yyyy-MM-ddTHH:mm:ssZ", CultureInfo.InvariantCulture);           
                    oDatavalue.userEndDate      = userEndDate;
                }
                if(value["extension_f356ba22a23b4c2fb35162e63d13246c_userDocumentNumber"]!=null || value["extension_f356ba22a23b4c2fb35162e63d13246c_userDocumentNumber"]=="" ){
                    oDatavalue.identity_document = Convert.ToString(value["extension_f356ba22a23b4c2fb35162e63d13246c_userDocumentNumber"]);
                }
                
                else
                    oDatavalue.identity_document = "";
                listdatavalue.Add(oDatavalue);
            }
            oDatacollaborator.value = listdatavalue;
            ///log.LogInformation(response.StatusCode.ToString()+'-'+HttpStatusCode.OK.ToString());
            datareturn    = JsonConvert.SerializeObject(oDatacollaborator,Formatting.Indented);
        }
    }

    if(vvhttpmethod == "objectall")
    {

        log.LogInformation("objectall");
        log.LogInformation(vvauthorization);

        string nfilter = "";

        if(display_name!=null){
            nfilter = "startswith(displayName, '"+display_name+"') or startswith(userPrincipalName, '"+display_name+"')";
        }
        if(dni!=null){
            nfilter = "(extension_f356ba22a23b4c2fb35162e63d13246c_userDocumentNumber eq '"+dni+"')";
        }
        if(sap_id!=null){
            nfilter = "(extension_f356ba22a23b4c2fb35162e63d13246c_userSAPR3Id eq '"+sap_id+"')";
        }
        if(plant_code!=null){
            nfilter = "(extension_f356ba22a23b4c2fb35162e63d13246c_plantCode eq '"+plant_code+"')";
        }

        log.LogInformation(nfilter);

        var url             = "https://graph.windows.net/b7e26f48-2292-4a14-a355-1aeb8489ae3d/users?api-version=1.6&$filter="+nfilter+"&$select=userPrincipalName,displayName,objectId,mobile,mailNickname,department,companyName,jobTitle,givenName,surname,extension_f356ba22a23b4c2fb35162e63d13246c_userDocumentNumber,extension_f356ba22a23b4c2fb35162e63d13246c_userEndDate,extension_f356ba22a23b4c2fb35162e63d13246c_userSAPR3Id,extension_f356ba22a23b4c2fb35162e63d13246c_plantCode,extension_f356ba22a23b4c2fb35162e63d13246c_plantDescription,PhysicalDeliveryOfficeNam,extension_f356ba22a23b4c2fb35162e63d13246c_userUOCode,extension_f356ba22a23b4c2fb35162e63d13246c_userUODescription,extension_f356ba22a23b4c2fb35162e63d13246c_userAreaFuncCode,extension_f356ba22a23b4c2fb35162e63d13246c_userCompanyType";
        log.LogInformation(url);        
        //response        = await client.GetAsync(url);
        //client.Timeout = new TimeSpan(0, 0, REQUEST_TIMEOUT_S);
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer",vvauthorization); //
        var response            = await client.GetAsync(url);
        datacollaborator oDatacollaborator = new datacollaborator();
        List<datavalue> listdatavalue = new List<datavalue>();
        
        //datareturn            = JsonConvert.SerializeObject(json,Formatting.Indented);    
        log.LogInformation(response.StatusCode.ToString()+'-'+HttpStatusCode.OK.ToString());
        if (response.StatusCode == HttpStatusCode.OK) {
            result        = response.Content.ReadAsStringAsync().Result;
            dynamic  jsonreq   = JsonConvert.DeserializeObject(result);
            oDatacollaborator.odatametadata = jsonreq["odata.metadata"];
            foreach (var value in jsonreq["value"]){
                datavalue oDatavalue        = new datavalue();
                oDatavalue.odatatype        = Convert.ToString(value["odata.type"]);
                oDatavalue.userPrincipalName= Convert.ToString(value["userPrincipalName"]);
                oDatavalue.displayName      = Convert.ToString(value["displayName"]);
                oDatavalue.objectId         = Convert.ToString(value["objectId"]);
                oDatavalue.mobile           = Convert.ToString(value["mobile"]);
                oDatavalue.mailNickname     = Convert.ToString(value["mailNickname"]);
                oDatavalue.department       = Convert.ToString(value["department"]);
                oDatavalue.companyName      = Convert.ToString(value["companyName"]);
                oDatavalue.jobTitle         = Convert.ToString(value["jobTitle"]);
                oDatavalue.givenName        = Convert.ToString(value["givenName"]);
                oDatavalue.surname          = Convert.ToString(value["surname"]);
                oDatavalue.userSAPR3Id      = Convert.ToString(value["extension_f356ba22a23b4c2fb35162e63d13246c_userSAPR3Id"]);
                oDatavalue.plantCode        = Convert.ToString(value["extension_f356ba22a23b4c2fb35162e63d13246c_plantCode"]);
                oDatavalue.plantDescription = Convert.ToString(value["extension_f356ba22a23b4c2fb35162e63d13246c_plantDescription"]);
                oDatavalue.deliveryOfficeNam = Convert.ToString(value["PhysicalDeliveryOfficeNam"]);
                oDatavalue.userUOCode        = Convert.ToString(value["extension_f356ba22a23b4c2fb35162e63d13246c_userUOCode"]);//(Codigo unidad operativa)
                oDatavalue.userUODescription = Convert.ToString(value["extension_f356ba22a23b4c2fb35162e63d13246c_userUODescription"]);// (Descripcion Unidad Operativa)
                oDatavalue.userAreaFuncCode  = Convert.ToString(value["extension_f356ba22a23b4c2fb35162e63d13246c_userAreaFuncCode"]);// (Codigo Area Funcional)
                oDatavalue.userCompanyType   = Convert.ToString(value["extension_f356ba22a23b4c2fb35162e63d13246c_userCompanyType"]);// (Tipo de empleado)

                /*DateTime userEndDate        = System.DateTime.Now;                
                if(value["extension_f356ba22a23b4c2fb35162e63d13246c_userEndDate"]!=null && value["extension_f356ba22a23b4c2fb35162e63d13246c_userEndDate"]!="2700-01-01T00:00:00Z" && value["extension_f356ba22a23b4c2fb35162e63d13246c_userEndDate"]!="0001-01-01T00:00:00Z"){
                    userEndDate = DateTime.ParseExact(value["extension_f356ba22a23b4c2fb35162e63d13246c_userEndDate"], "yyyy-MM-ddTHH:mm:ssZ", CultureInfo.InvariantCulture);           
                    oDatavalue.userEndDate      = userEndDate;
                }*/
                if(value["extension_f356ba22a23b4c2fb35162e63d13246c_userDocumentNumber"]!=null || value["extension_f356ba22a23b4c2fb35162e63d13246c_userDocumentNumber"]=="" ){
                    oDatavalue.identity_document = Convert.ToString(value["extension_f356ba22a23b4c2fb35162e63d13246c_userDocumentNumber"]);
                }
                
                else
                    oDatavalue.identity_document = "";
                listdatavalue.Add(oDatavalue);
            }
            oDatacollaborator.value = listdatavalue;
            ///log.LogInformation(response.StatusCode.ToString()+'-'+HttpStatusCode.OK.ToString());
            datareturn    = JsonConvert.SerializeObject(oDatacollaborator,Formatting.Indented);
        }
    }

    /*    
    if(vvhttpmethod == "objectemail")
    {
        log.LogInformation("object");
        log.LogInformation(vvauthorization);

        var url             = "https://graph.windows.net/b7e26f48-2292-4a14-a355-1aeb8489ae3d/users?api-version=1.6&$filter=(userPrincipalName eq '"+filter+"')&$select=userPrincipalName,displayName,objectId,mobile,mailNickname,department,companyName,jobTitle,givenName,surname,extension_f356ba22a23b4c2fb35162e63d13246c_userDocumentNumber,extension_f356ba22a23b4c2fb35162e63d13246c_userEndDate";        
        log.LogInformation(url);        
        //response        = await client.GetAsync(url);
        //client.Timeout = new TimeSpan(0, 0, REQUEST_TIMEOUT_S);
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer",vvauthorization); //
        var response            = await client.GetAsync(url);
        datacollaborator oDatacollaborator = new datacollaborator();
        List<datavalue> listdatavalue = new List<datavalue>();
        
        //datareturn            = JsonConvert.SerializeObject(json,Formatting.Indented);    
        log.LogInformation(response.StatusCode.ToString()+'-'+HttpStatusCode.OK.ToString());
        if (response.StatusCode == HttpStatusCode.OK) {
            result        = response.Content.ReadAsStringAsync().Result;
            dynamic  jsonreq   = JsonConvert.DeserializeObject(result);
            oDatacollaborator.odatametadata = jsonreq["odata.metadata"];
            foreach (var value in jsonreq["value"]){
                datavalue oDatavalue        = new datavalue();
                oDatavalue.odatatype        = Convert.ToString(value["odata.type"]);
                oDatavalue.userPrincipalName= Convert.ToString(value["userPrincipalName"]);
                oDatavalue.displayName      = Convert.ToString(value["displayName"]);
                oDatavalue.objectId         = Convert.ToString(value["objectId"]);
                oDatavalue.mobile           = Convert.ToString(value["mobile"]);
                oDatavalue.mailNickname     = Convert.ToString(value["mailNickname"]);
                oDatavalue.department       = Convert.ToString(value["department"]);
                oDatavalue.companyName      = Convert.ToString(value["companyName"]);
                oDatavalue.jobTitle         = Convert.ToString(value["jobTitle"]);
                oDatavalue.givenName        = Convert.ToString(value["givenName"]);
                oDatavalue.surname          = Convert.ToString(value["surname"]);
                
                DateTime userEndDate1        = System.DateTime.Now;                
                if(value["extension_f356ba22a23b4c2fb35162e63d13246c_userEndDate"]!=null){
                    userEndDate1 = DateTime.ParseExact(value["extension_f356ba22a23b4c2fb35162e63d13246c_userEndDate"], "yyyy-MM-ddTHH:mm:ssZ", CultureInfo.InvariantCulture);           
                    oDatavalue.userEndDate      = userEndDate1;
                }

                if(value["extension_f356ba22a23b4c2fb35162e63d13246c_userDocumentNumber"]!=null || value["extension_f356ba22a23b4c2fb35162e63d13246c_userDocumentNumber"]=="" ){
                    oDatavalue.identity_document = Convert.ToString(value["extension_f356ba22a23b4c2fb35162e63d13246c_userDocumentNumber"]);
                }
                else
                    oDatavalue.identity_document = "";
                listdatavalue.Add(oDatavalue);
            }
            oDatacollaborator.value = listdatavalue;
            ///log.LogInformation(response.StatusCode.ToString()+'-'+HttpStatusCode.OK.ToString());
            datareturn    = JsonConvert.SerializeObject(oDatacollaborator,Formatting.Indented);
        }
    }*/


    return datareturn != null
        ? (ActionResult)new OkObjectResult(datareturn)
        : new BadRequestObjectResult("Please pass a name on the query string or in the request body"); 

    // 
}

public class datacollaborator{
    public string odatametadata {get;set;}
    public List<datavalue> value {get;set;}
}

public class datavalue{
    public string odatatype {get;set;}
    public string userPrincipalName {get;set;}
    public string displayName {get;set;}
    public string objectId {get;set;}
    public string mobile {get;set;}
    public string mailNickname {get;set;}
    public string department {get;set;}
    public string companyName {get;set;}
    public string jobTitle {get;set;}
    public string givenName {get;set;}
    public string surname {get;set;}
    public string identity_document {get;set;}
    public DateTime? userEndDate {get;set;}
    public string userSAPR3Id {get;set;}
    public string plantCode        {get;set;}
    public string plantDescription {get;set;}
    public string deliveryOfficeNam {get;set;}
    public string userUOCode {get;set;}
    public string userUODescription {get;set;}   
    public string userAreaFuncCode {get;set;}
    public string userCompanyType {get;set;}
}