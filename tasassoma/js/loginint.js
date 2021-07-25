var login = function(){
    var init = function(){
          $('#fm_login').submit(function() { 
              
            
            event.preventDefault();
            var response    = grecaptcha.getResponse();
            var usuario     = $("#tx_login_usuario").val();
            var password    = $("#tx_login_password").val();             
            if(usuario.trim().length==0){
                alert("Debes introducir tu usuario o correo");
                $("#tx_login_user").focus();
                return;
            }
            else if(password.trim().length==0){
                alert("Debes introducir la clave clave");
                $("#tx_login_password").focus();
                return;
            }
            else if(response.trim().length==0){
                alert("Debes realizar la autenticación Catcha");
                return;
            }
            else{
                $(".spinner-border").show();
                var url = "https://login.microsoftonline.com/b7e26f48-2292-4a14-a355-1aeb8489ae3d/oauth2/v2.0/token";                
               
                $.ajax({                    
                    method: "POST",
                    url:  url,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                      },
                      //headers:{},
                    data: {
                        "client_id": "370d607d-5650-41fb-aa5f-644254136dab",
                        "client_secret": "c1M7qP.s@]s-84BA5bgVG.W1:=h=QVsr",
                        "scope": "https://graph.microsoft.com/.default",
                        "grant_type": "password",
                        "username": "visualsatuser@tasa.com.pe",
                        "password": "mfcvelazVsat12"
                        /* "username": usuario,
                        "password": password */
                      },
                    crossDomain: true,
                    dataType: "json",
                }).done(function( data)
                {
                   // data=JSON.parse(data);
                   console.log(data)
                    if(data.validatepassword==0)
                    {
                        
                        showAlert('danger',data.messagetext,3000);
                    }
                    else{
                        $(".spinner-border").hide();
                        setCookie("vtas_access_token"+sessionStorage.tabVisitasa, data.access_token, 365);
                       
                        
                        location.href = "../view/main.html";
                    }
                    //

                })
                .fail(function( jqXHR, textStatus, errorThrown ) {
                    console.log(jqXHR);
                });
            }
        })
    }
    var recaptcha = function(){        
        alert("grecaptcha is ready!");                  
    }
    return{
        init:function(){
            init();
        },
        catpcha:function(){
            recaptcha();
        }
    }
}();