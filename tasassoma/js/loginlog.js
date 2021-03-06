

//INPORTANTE*******************************************************************:
    /* Se debe habilitar Token id y Access token en Active Directory
    Ademas se agrega el url dese el login de origen del sistema para hacer el match ejem: (https://www.visualsatpe.com/beta/tasassoma/) */

    function loggerCallback(logLevel, message, containsPii) {
        //console.log(message);
     }

    var msalConfig = {
        auth: {
            clientId: 'b155bf87-007f-43ee-bd82-5845a19aee3a', //id cliente
            authority: "https://login.microsoftonline.com/b7e26f48-2292-4a14-a355-1aeb8489ae3d" // directorio
            //redirectUri:"https://www.visualsatpe.com/beta/tasassoma/"
            //https://login.microsoftonline.com/common
        },
        system: {
            logger: new Msal.Logger(
                loggerCallback , {
                    level: Msal.LogLevel.Verbose,
                    piiLoggingEnabled: false,
                    correlationId: '1234'
                }
            )
        },
        cache: {
            cacheLocation: "localStorage",
            storeAuthStateInCookie: true
        }
    };

    var graphConfig = {
        graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
    };

    var requestObj = {
        scopes: [".default"]
    };
    var myMSALObj;
    if(!myMSALObj)
    {
        myMSALObj = new Msal.UserAgentApplication(msalConfig);
        /* console.log("999999")
        console.log(myMSALObj) */
        myMSALObj.handleRedirectCallback(authRedirectCallBack);
    }
         

    function signIn() 
    {
        //console.log("44444")
        myMSALObj.loginPopup(requestObj).then(function (loginResponse) {
           
            acquireTokenPopupAndCallMSGraph();
        }).catch(function (error) {
            console.log(error);
        });
    }
    // cerrar session
    function signOut() {
        myMSALObj.logout();
    }
    function acquireTokenPopupAndCallMSGraph() 
    {

        myMSALObj.acquireTokenSilent(requestObj).then(function (tokenResponse) 
        {
            //console.log("66666666")
            callMSGraph(graphConfig.graphMeEndpoint, tokenResponse.accessToken, graphAPICallback);

        }).catch(function (error) 
        {
            //console.log(error); 
            //console.log(requiresInteraction(error.errorCode))
            if (requiresInteraction(error.errorCode)) 
            {
                myMSALObj.acquireTokenPopup(requestObj).then(function (tokenResponse) {
                    callMSGraph(graphConfig.graphMeEndpoint, tokenResponse.accessToken, graphAPICallback);
                }).catch(function (error) {
                    console.log(error);
                });
            }
        });
    }
    //obtenemos token de cliente/aplicacion
    function callMSGraph(theUrl, accessToken, callback) 
    {
        console.log("token ",accessToken)
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200)
                callback(JSON.parse(this.responseText));
        }
        xmlHttp.open("GET", theUrl, true); // true for asynchronous
        xmlHttp.setRequestHeader('Authorization', 'Bearer '+accessToken );
        xmlHttp.send();
    }

    function graphAPICallback(data) {
        //ocument.getElementById("json").innerHTML = JSON.stringify(data, null, 2);
        //console.log("Se redirecciona a sistema");        
        //console.log(myMSALObj); 
        //console.log(data);
        //alert("aqu??");
        //console.log("55555")              
        if(myMSALObj.account.idToken.oid)
        { 
            //console.log(myMSALObj)
            //console.log(myMSALObj.account)
            //console.log(data)
            setCookie("vtas_id"+myMSALObj.account.idToken.oid, myMSALObj.account.idToken.oid, 365);
            setCookie("vtas_id_hash"+myMSALObj.account.idToken.oid, myMSALObj.account.idToken.oid, 365);
            sessionStorage.tabVisitasa=myMSALObj.account.idToken.oid;
            setCookie("vtas_fullname"+myMSALObj.account.idToken.oid, myMSALObj.account.name, 365);
            setCookie("vtas_external_company_id"+myMSALObj.account.idToken.oid, 0, 365);
            setCookie("vtas_external_user"+myMSALObj.account.idToken.oid,1, 365);
            setCookie("vtas_perfil"+myMSALObj.account.idToken.oid,2, 365);
            setCookie("vtas_type_user"+myMSALObj.account.idToken.oid, 'interno', 365);
            setCookie("vtas_internal_useruser"+myMSALObj.account.idToken.oid,myMSALObj.account.userName, 365);
            
            if(checkDevice()=="Mobile")
            {
                window.location.href = "maindevice.html";
            }
            else{
                window.location.href = "main.html";
            }
            
        }
    }

   function acquireTokenRedirectAndCallMSGraph() 
   {
        myMSALObj.acquireTokenSilent(requestObj).then(function (tokenResponse) {
            
            callMSGraph(graphConfig.graphMeEndpoint, tokenResponse.accessToken, graphAPICallback);
        }).catch(function (error) {
            if (requiresInteraction(error.errorCode)) {
                myMSALObj.acquireTokenRedirect(requestObj);
            }
        });
    }

    function authRedirectCallBack(error, response) 
    {
        if (error){
            console.log(error);
        } else {
            if (response.tokenType === "access_token") {
                console.log(response);
                //alert("response");
                callMSGraph(graphConfig.graphMeEndpoint, response.accessToken, graphAPICallback);
            } else {
                console.log("Tipo de token: " + response.tokenType);
            }
        }
    }

    function requiresInteraction(errorCode) {
        if (!errorCode || !errorCode.length) {
            return false;
        }
        return errorCode === "consent_required" ||
            errorCode === "interaction_required" ||
            errorCode === "login_required";
    }

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var msie11 = ua.indexOf('Trident/');
    var msedge = ua.indexOf('Edge/');
    var isIE = msie > 0 || msie11 > 0;
    var isEdge = msedge > 0;

    var loginType = isIE ? "REDIRECT" : "POPUP";

    if (loginType === 'POPUP') 
    {
        //console.log("11111111111")
        if (myMSALObj.getAccount()) 
        {
            
            acquireTokenPopupAndCallMSGraph();
        }
    }
    else if (loginType === 'REDIRECT') 
    {
        //console.log("22222222222")
        document.getElementById("SignIn").onclick = function () {
            myMSALObj.loginRedirect(requestObj);
        };

        if (myMSALObj.getAccount() && !myMSALObj.isCallback(window.location.hash)) 
        {
           
            acquireTokenRedirectAndCallMSGraph();
           // console.log("33333333")
        }
    } else {
        console.error('Please set a valid login type');
    }


