var login = function()
{
    //feature
    var init = function()
    {
        //de forma temporal solo para el desarrollo luego eliminar
        $('body').materializeInputs();
        $("#success-rememberPassword").hide();
        $(".form-rememberPassword").show();
        $("#spinner-rememberPassword").hide();

        $('#fm_login').submit(function() {

            //alert("antes del location");
            // location.href = "main.html";// linea de codigo temporal solo para desarollo inicial @andy



            event.preventDefault();
           // var response    = grecaptcha.getResponse();  //-------sin conexion a internet no va a funcionar -- en ese caso comentar//
            var response    = 'pass';//

            //var emergencia = "03AGdBq263MEiFUtHRnhDlZW5z3aTn-g8nBc8bRI_i989iA774YLyoGenGv0eillNKbJsWLqk_ncPrS770Lh4CEBDX3vPWcptnU5EJVUa2y_t5yyQSIa66IR4XciLS8wy8n5xE-HTmBQ4y5HgMXkmcNaIus9Gz3Mh5miWAwPkxmQPVohf8JEHLk-S6gk6TNeJi5kDTlKOv8xMC-lsTjNfFRvZyqe_ovPUJu4UKYB0tKXZsEGXismb7xi-UYOooa_GbJD69FM9h17xBJ8hcWEIsd4lS4Rhh9CUMRoaB27mlUAW97qjfT_rWWoHUirv2sCm0VeXkTxk_JjRMoO2BHjZAkz-GkoE39lCw07zd61Sr1E3ycA8iusf7kHYPDkkrJWjgjNHidFstMGcLZVukcAv9zCiTJKNsu_rawW8xuSCoqLN-uRPXio_uYpg";
            //alert(response);

            var usuario     = $("#tx_login_usuario").val();
            var password    = $("#tx_login_password").val();
            if(usuario.trim().length==0){
                //alert("Debes introducir tu usuario o correo");
                swal("Error", "Debes introducir tu usuario o correo", "error");
                $("#tx_login_user").focus();
                return;
            }
            else if(password.trim().length==0){
                //alert("Debes introducir la clave clave");
                swal("Error", "Debes introducir la clave clave", "error");
                $("#tx_login_password").focus();
                return;
            }
            else if(response.trim().length==0){
                swal("Error", "Debes realizar la autenticación Captcha", "error");
                $(".spinner-grow").hide();
                return;

            }
            else{
                $(".spinner-grow").show();
                var url = apiurlsecurity+"/api/AuthUserSystem?httpmethod=auth&system_code="+constantes.sysCode+"&code="+AuthUserSystem+"";//system_code  system_code
                var headers ={
                    "apikey":constantes.apiKey,
                    "username": usuario,
                    "password": password
                }
                $.ajax({
                    method: "POST",
                    url:  url,
                    headers:headers,
                    crossDomain: true,
                    dataType: "json",
                }).done(function( data)
                {

                    //alert('Despues de esto q pasa');
                    if(data.validatepassword==0)
                    {
                       // swal("Error", "data.messagetext", "error");

                        swal({
                            title: "Error",
                            text: data.messagetext,
                            timer: 5000,
                            type: "error",
                            showConfirmButton: true
                            });
                        //showAlert('danger',data.messagetext,3000);
                        $(".spinner-grow").hide();
                    }
                    else{
                        $(".spinner-grow").hide();
                        setStorage('usuario',data,'json');
                        setCookie("vtas_id"+data.idhash, data.id, 365);
                        setCookie("vtas_type_user"+data.idhash, 'externo', 365);//alert(data.fullusername)
                        sessionStorage.tabVisitasa=data.idhash;
                        setCookie("vtas_id_hash"+data.idhash, data.idhash, 365);
                        setCookie("vtas_person_id"+data.idhash, data.person_id, 365);
                        setCookie("vtas_fullname"+data.idhash, data.fullusername, 365);
                        setCookie("vtas_external_company_id"+data.idhash, data.external_company_id, 365);
                        setCookie("vtas_external_user"+data.idhash,1, 365);
                        setCookie("vtas_perfil"+data.idhash,data.attribute1, 365);
                        setCookie("vtas_internal_useruser"+data.idhash,data.username, 365);
                        setCookie("vtas_health_code_cmp"+data.idhash,data.health_code_cmp, 365);
                        setCookie("vtas_sede"+data.idhash,data.job, 365);
                        setCookie("vtas_job"+data.idhash,data.job, 365);
                        //alert(data.health_code_cmp);
                        console.warn("data,",data)
                        //console.warn('getCookie("vtas_job"+sessionStorage.tabVisitasa)',getCookie("vtas_job"+sessionStorage.tabVisitasa))

                            if(checkDevice()=="Mobile")
                            {
                                location.href = "maindevice.html";
                            }
                            else
                            {


                                //alert('aqui redirecciono')

                                //----------------------------------------------------------------------------------------------------------------- acceso permitido ahora debe solicitar el codigo ----------------
                                //data.results[0].Celular; 985471432
                                // location.href = "main.html";
                                //firebase.auth().signInWithPhoneNumber('+584141894629', window.recaptchaVerifier).then(function(confirmationResult) {
                                //console.log('er telefono es:: +584165825659', );
                                                         
                                                            /*
                                                            firebase.auth().signInWithPhoneNumber('+584165825659', window.recaptchaVerifier).then(
                                                            function(confirmationResult) 
                                                               {
                                                                    window.confirmationResult = confirmationResult;
                                                                    coderesult = confirmationResult;
                                                                    console.log(coderesult);
                                                                     //alert("Se ha enviado un código a su teléfono", 'success', 5000);
                                                                    document.getElementById('bt_valida_tokens_sho').style.background = '#8fbb02';//habilitamos para validar el tokens
                                                                     $("#bt_valida_tokens_sho").attr("disabled", false);
                                                        

                                                                }).catch(function(error) 
                                                                   {
                                                                        alert("Firebase signInWithPhoneNumber: " + error.message, 'danger xxx', 8000);
                                                                   })
                                                            */

                                //----------------------------------------------------------------------------------------------------------------- acceso permitido ahora debe solicitar el codigo ----------------


                                location.href = "main.html";
                            }

                    
                    }
                });
            }
        });


        $('#fm_rememberPassword').submit(function() {
            event.preventDefault();
            var usuario     = $("#tx_usermane_remember").val();
            if(usuario.trim().length==0){
                //alert("Debes introducir tu usuario o correo");
                swal("Error", "Debes introducir tu usuario", "error");
                $("#tx_usermane_remember").focus();
                return;
            }
            else{
                //$(".spinner-grow").show();
                $("#spinner-rememberPassword").show();
                $(".form-rememberPassword").hide();


                var url = apiurlsecurity+"/api/Post-changePassword?code="+PostChangePassword+"&httpmethod=renewpassword&username="+usuario;
                var headers ={
                    "apikey":constantes.apiKey
                }
                $.ajax({
                    method: "POST",
                    url:  url,
                    headers:headers,
                    crossDomain: true,
                    dataType: "json",
                }).done(function( data)
                {
                    $("#tx_usermane_remember").val("");
                    if(data.success==0)
                    {
                        swal({
                            title: "Error",
                            text: "El usuario no éxiste",//data.message,
                            timer: 5000,
                            type: "error",
                            showConfirmButton: true
                        });
                        $(".form-rememberPassword").show();
                        $("#spinner-rememberPassword").hide();
                        $("#fm_rememberPassword").show();
                        //showAlert('danger',data.messagetext,3000);
                        //$(".spinner-grow").hide();
                    }
                    else{
                        /*swal({
                            title: "Éxito",
                            text: data.message,
                            timer: 5000,
                            type: "success",
                            showConfirmButton: true
                        });*/
                       // $(".spinner-grow").hide();
                        //$("#fm_login").show();
                        //$("#fm_rememberPassword").hide();
                        $("#spinner-rememberPassword").hide();
                        $("#success-rememberPassword").show();
                    }
                });
            }
        });

        $("#rememberPassword").click(function(){
            $("#fm_login").hide();
            $("#success-rememberPassword").hide();
            $(".form-rememberPassword").show();
            $("#spinner-rememberPassword").hide();
            $("#fm_rememberPassword").show();

        });

        $("#img_back").click(function(){
            $("#fm_login").show();
            $("#fm_rememberPassword").hide();
        });

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
function setStorage(nombre,data,type) {

    if(type == 'json'){
        localStorage.setItem(nombre,JSON.stringify(data))
    }else if(type == 'text'){
        localStorage.setItem(nombre,data)
    }else{
        console.log('... error al momento de setear el storage')
    }

}

//busca los roles de usuarios
//console.log( sessionStorage.tabVisitasa )
var rolesCheck=[];
var getRolesFuntions=function(type)
{
    console.log("Buscando Roles......")
    if(type)
    {

        rolesCheck.map(item=>{
            if(item)
            $(item).show();
        });

        return;
    }
    var url = apiurlsecurity+"/api/Get-AccessManager-All?code="+GetAccessManagerAll+"&httpmethod=opctionaccesssystem";
                var headers ={

                    "coduser":getCookie("vtas_id"+sessionStorage.tabVisitasa),
                    "typeuser":getCookie("vtas_type_user"+sessionStorage.tabVisitasa),
                    "system_id":constantes.sysCodeId
                }
                $.ajax({
                    method: "POST",
                    url:  url,
                    headers:headers,
                    crossDomain: true,
                    dataType: "json",
                }).done(function( data)
                {

                    $("#garitaHeader").hide();
                    $("#sedeHeader").hide();

                        if(data.length>0)
                        {
                            console.log('checkDevice', checkDevice())
                            //ingreso por smartphone-----------------------------------------------------------------------------------------------
                            if(checkDevice()=="Mobile")
                            {
                                setCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa, data[0].groupall_code, 365);
                                $("#splashLoading").addClass("splashLoadingSegurity");


                                if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_GARITA" || getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_SEGURIDAD" || getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_COVIDSEGURIDAD")
                                {
                                    handlerUrlhtml('contentGlobal','view/covidSecuryMobile.html');
                                    $("#divselectGarita").show();
                                    $("#garitaHeader").show();
                                    $("#sedeHeader").show();

                                    $("#modalSelectSede").modal("show");//seleccionar sede seguridad
                                    getLocationsUsers();//busca sedes user
                                }
                                else if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_MEDICAREA" ||getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_MEDICO" )
                                {
                                    handlerUrlhtml('contentGlobal','view/covidMedicoMobile.html');//------------------bloque codigo-----------------------#@andy------*****hara falta??--------------------------------//
                                      alert("covidMedicoMobile");


                                    console.log("medico mobile")
                                }
                                else
                                {
                                    console.log(getCookie("vtas_type_user"+sessionStorage.tabVisitasa))
                                    if(getCookie("vtas_type_user"+sessionStorage.tabVisitasa)!="externo")
                                    {
                                        setCookie("vtas_id"+sessionStorage.tabVisitasa, "", 0);
                                        setCookie("vtas_type_user"+sessionStorage.tabVisitasa, "", 0);
                                        setCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa, '', 0);
                                        setCookie("vtas_garita"+sessionStorage.tabVisitasa, '', 0);
                                        setCookie("vtas_sede"+sessionStorage.tabVisitasa, '', 0);
                                        destroy_cookies("vtas_id"+sessionStorage.tabVisitasa);
                                        destroy_cookies("vtas_id_hash"+sessionStorage.tabVisitasa);
                                        destroy_cookies("vtas_fullname"+sessionStorage.tabVisitasa);
                                        destroy_cookies("vtas_external_company_id"+sessionStorage.tabVisitasa);
                                        destroy_cookies("vtas_external_user"+sessionStorage.tabVisitasa);
                                        destroy_cookies("vtas_perfil"+sessionStorage.tabVisitasa);
                                        destroy_cookies("vtas_type_user"+sessionStorage.tabVisitasa);
                                        myMSALObj.logout();

                                        return;
                                    }
                                    setCookie("vtas_id"+sessionStorage.tabVisitasa, "", 0);
                                    setCookie("vtas_type_user"+sessionStorage.tabVisitasa, "", 0);
                                    setCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa, '', 0);
                                    destroy_cookies("vtas_id"+sessionStorage.tabVisitasa);
                                    destroy_cookies("vtas_id_hash"+sessionStorage.tabVisitasa);
                                    destroy_cookies("vtas_fullname"+sessionStorage.tabVisitasa);
                                    destroy_cookies("vtas_external_company_id"+sessionStorage.tabVisitasa);
                                    destroy_cookies("vtas_external_user"+sessionStorage.tabVisitasa);
                                    destroy_cookies("vtas_perfil"+sessionStorage.tabVisitasa);
                                    destroy_cookies("vtas_type_user"+sessionStorage.tabVisitasa);

                                    location.href='./';
                                }
                                return;
                            }//fin perfil mobile------------------------------------------------------------------------------------

                            console.warn("data -> ",data)
                            handlerUrlhtml('contentGlobal','view/sho-hce/menu.html');
                            // data.map(item=>{

                            //     // item.urlpath = 'view/sho-hce/menu.html';//codigo forzado por andy-18-08-2021
                            //     // if(item.urlpath)
                            //     // {

                            //     //     handlerUrlhtml('contentGlobal',item.urlpath);
                            //     //     // if(item.urlpath=='view/ssoma/menu.html' || item.urlpath=='view/auditoria/menu.html'  || item.urlpath=='view/sho-hce/menu.html')
                            //     //     // {
                            //     //     //     //alert(item.urlpath);
                            //     //     //     item.urlpath = 'view/sho-hce/menu.html';
                            //     //     //     //alert(item.urlpath);
                            //     //     //     handlerUrlhtml('contentGlobal',item.urlpath)
                            //     //     // }
                            //     //     // else
                            //     //     // {
                            //     //     //     logoutSystem()
                            //     //     // }
                            //     // }
                            //     // else{

                            //     //     $(item.softwarecode).show();

                            //     // }
                            //     // rolesCheck.push(item.softwarecode);
                            // })
                            setCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa, data[0].groupall_code, 365);
                            setCookie("vtas_type_usergroup"+sessionStorage.tabVisitasa, '', 365);
                            setStorage('vtas_rolexternalrol',data[0].groupall_code,'text');
                            console.warn("1-> ",getCookie("vtas_type_user"+sessionStorage.tabVisitasa))
                            if(getCookie("vtas_type_user"+sessionStorage.tabVisitasa)=="externo")//muestra para editar su perfil

                                if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_SEGURIDAD")
                                {
                                    $("#menuAccessProfile").show();
                                }

                                if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_GARITA" || getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_SEGURIDAD" || getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_COVIDSEGURIDAD")
                                {
                                    $("#divselectGarita").show();
                                    $("#garitaHeader").show();
                                    $("#sedeHeader").show();

                                    $("#modalSelectSede").modal("show");//seleccionar sede seguridad

                                }


                                if(getCookie("vtas_type_user"+sessionStorage.tabVisitasa)=="externo")
                                {
                                     //carga anticipada de logo pdf natclar
                                      logoPdf=new Image();
                                    logoPdf.src = "images/logonatclar.png";
                                }
                                else{

                                      logoPdf=new Image();
                                    logoPdf.src = "images/logo.png";
                                }

                        }
                        else//roles por defecto
                        {
                            console.log("Sin funciones asignadas");

                            setCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa,"ROL_REPORTANTE", 365);//si no tiene rol, se le asigna por defecto salva
                            if(getCookie("vtas_type_user"+sessionStorage.tabVisitasa)=="interno")//colaborador
                            {
                                console.log("Rol salva asignado por defecto")
                                handlerUrlhtml('contentGlobal','view/ssoma/menu.html','ssoma');
                                setCookie("vtas_type_usergroup"+sessionStorage.tabVisitasa, 'colaborador', 365);
                                return;
                                        $("#menuAccessPersonCovidListColaborador").show();
                                        $(".keep").show();
                                        //handlerUrlhtml('contentGlobal','view/selectTypeRequest.html');
                                        handlerUrlhtml('contentGlobal','view/covidListColaborador.html');  //------------------bloque codigo-----#@andy------*****hara falta??--------------------------------//
										 alert("covidListColaborador.html");


                                        $("article").css("margin-left","62px!important")
                                        $("#butRequesExam").show();
                                        //$("#menuShowButtonNewVisita").show();
                                        //$("#menuAccessRetorneList").show();


                                        $("#menuAccessProfile").hide();
                                        //$("#modalSelectSede").modal("show");
                            }
                            else if(getCookie("vtas_type_user"+sessionStorage.tabVisitasa)=="externo")//visita
                            {
                                location.href="./";
                                return;
                                handlerUrlhtml('contentGlobal','view/auditoria/menu.html','auditoria');

                                        $("#menuAccessRetorneList").hide();
                                        $("#menuShowButtonNewVisita").hide();
                                        $("#menuAccessRetorneListExt").show();
                                        $("#menuAccessCompanyExt").show();
                                        $("#menuAccessPersonListExt").show();
                                        $("#menuAccessProfile").show();
                                        $("#titleModule").text("Ingresos solicitados");
                                        $("#menuAccessPersonBlackList").hide();
                                        $("#menuAccessPersonCovidList").hide();
                                        $("#menuAccessPersonCovidListColaborador").hide();
                                        $("#menuAccessEventList").hide();

										//------------------bloque codigo-----------------------#@andy------*****hara falta??--------------------------------//
                                        handlerUrlhtml('contentGlobal','view/externalAccessRequestList.html','externalAccessRequestList');


                                        $(".keep").show();
                                        $("article").css("margin-left","62px!important");
                                        setCookie("vtas_type_usergroup"+sessionStorage.tabVisitasa, 'external', 365);

                            }
                            else{
                                location.href="./";
                            }


                        }
                        $(".keep").show();
                        getLocationsUsers();//busca sedes user alet()


                        //console.log(getCookie("vtas_rolexternalrol"))
                });
}

var closeSystem=function()
{


    $('.btdetail').popover('hide');


// ============================================================================================================================================

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

swalWithBootstrapButtons.fire({
  title: '¿Desea salir del sistema?',
  text: "Esta completamente seguro",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Si',
  cancelButtonText: 'No',
  reverseButtons: true
}).then((result) => {
  if (result.isConfirmed) {

console.log(getCookie("vtas_type_user"+sessionStorage.tabVisitasa))
        if(getCookie("vtas_type_user"+sessionStorage.tabVisitasa)!="externo")
        {
            setCookie("vtas_id"+sessionStorage.tabVisitasa, "", 0);
            setCookie("vtas_type_user"+sessionStorage.tabVisitasa, "", 0);
            setCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa, '', 0);
            setCookie("vtas_garita"+sessionStorage.tabVisitasa, '', 0);
            setCookie("vtas_sede"+sessionStorage.tabVisitasa, '', 0);
            destroy_cookies("vtas_id"+sessionStorage.tabVisitasa);
            destroy_cookies("vtas_id_hash"+sessionStorage.tabVisitasa);
            destroy_cookies("vtas_fullname"+sessionStorage.tabVisitasa);
            destroy_cookies("vtas_external_company_id"+sessionStorage.tabVisitasa);
            destroy_cookies("vtas_external_user"+sessionStorage.tabVisitasa);
            destroy_cookies("vtas_perfil"+sessionStorage.tabVisitasa);
            destroy_cookies("vtas_type_user"+sessionStorage.tabVisitasa);
            myMSALObj.logout();

            return;
        }
        setCookie("vtas_id"+sessionStorage.tabVisitasa, "", 0);
        setCookie("vtas_type_user"+sessionStorage.tabVisitasa, "", 0);
        setCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa, '', 0);
        destroy_cookies("vtas_id"+sessionStorage.tabVisitasa);
        destroy_cookies("vtas_id_hash"+sessionStorage.tabVisitasa);
        destroy_cookies("vtas_fullname"+sessionStorage.tabVisitasa);
        destroy_cookies("vtas_external_company_id"+sessionStorage.tabVisitasa);
        destroy_cookies("vtas_external_user"+sessionStorage.tabVisitasa);
        destroy_cookies("vtas_perfil"+sessionStorage.tabVisitasa);
        destroy_cookies("vtas_type_user"+sessionStorage.tabVisitasa);

        location.href='./';






   
  }
})


//=============================================================================================================================================



    // swal({
    //   title: "Salir",
    //   text: "¿Desea salir del sistema?",
    //   type: "info",
    //   showCancelButton: true,
    //   confirmButtonClass: "btn-danger btn-sm btn-rounded rounded",
    //   cancelButtonClass: "btn-success btn-sm btn-rounded rounded",
    //   confirmButtonText: "Salir",
    //   cancelButtonText: "Volver",
    //   closeOnConfirm: true,
    //   showLoaderOnConfirm: false
    // },function(){



    //     console.log(getCookie("vtas_type_user"+sessionStorage.tabVisitasa))
    //     if(getCookie("vtas_type_user"+sessionStorage.tabVisitasa)!="externo")
    //     {
    //         setCookie("vtas_id"+sessionStorage.tabVisitasa, "", 0);
    //         setCookie("vtas_type_user"+sessionStorage.tabVisitasa, "", 0);
    //         setCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa, '', 0);
    //         setCookie("vtas_garita"+sessionStorage.tabVisitasa, '', 0);
    //         setCookie("vtas_sede"+sessionStorage.tabVisitasa, '', 0);
    //         destroy_cookies("vtas_id"+sessionStorage.tabVisitasa);
    //         destroy_cookies("vtas_id_hash"+sessionStorage.tabVisitasa);
    //         destroy_cookies("vtas_fullname"+sessionStorage.tabVisitasa);
    //         destroy_cookies("vtas_external_company_id"+sessionStorage.tabVisitasa);
    //         destroy_cookies("vtas_external_user"+sessionStorage.tabVisitasa);
    //         destroy_cookies("vtas_perfil"+sessionStorage.tabVisitasa);
    //         destroy_cookies("vtas_type_user"+sessionStorage.tabVisitasa);
    //         myMSALObj.logout();

    //         return;
    //     }
    //     setCookie("vtas_id"+sessionStorage.tabVisitasa, "", 0);
    //     setCookie("vtas_type_user"+sessionStorage.tabVisitasa, "", 0);
    //     setCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa, '', 0);
    //     destroy_cookies("vtas_id"+sessionStorage.tabVisitasa);
    //     destroy_cookies("vtas_id_hash"+sessionStorage.tabVisitasa);
    //     destroy_cookies("vtas_fullname"+sessionStorage.tabVisitasa);
    //     destroy_cookies("vtas_external_company_id"+sessionStorage.tabVisitasa);
    //     destroy_cookies("vtas_external_user"+sessionStorage.tabVisitasa);
    //     destroy_cookies("vtas_perfil"+sessionStorage.tabVisitasa);
    //     destroy_cookies("vtas_type_user"+sessionStorage.tabVisitasa);

    //     location.href='./';
    // });

}

function destroy_cookies(name){
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function validateSessions()
{
    //console.log("sessions")
    //console.log(getCookie("vtas_id"))

    if(getCookie("vtas_id"+sessionStorage.tabVisitasa)=="")
    location.href="./";

}

/**
 * [logoutSystem Cerrar sesion automaticamente.]
 * @return {[type]} [description]
 */
var logoutSystem = function ()
{
    swal(
    {
        title: "",
        text: "Su usuario no tiene permiso a este entorno. Comuníquese con el administrador del sistema",
        type: "warning",
        showCancelButton: false,
        confirmButtonClass: "btn-danger btn-sm btn-rounded rounded",
        cancelButtonClass: "btn-success btn-sm btn-rounded rounded",
        confirmButtonText: "Salir",
        cancelButtonText: "Volver",
        closeOnConfirm: true,
        showLoaderOnConfirm: false
        },function(){



        console.log(getCookie("vtas_type_user"+sessionStorage.tabVisitasa))
        if(getCookie("vtas_type_user"+sessionStorage.tabVisitasa)!="externo")
        {
            setCookie("vtas_id"+sessionStorage.tabVisitasa, "", 0);
            setCookie("vtas_type_user"+sessionStorage.tabVisitasa, "", 0);
            setCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa, '', 0);
            setCookie("vtas_garita"+sessionStorage.tabVisitasa, '', 0);
            setCookie("vtas_sede"+sessionStorage.tabVisitasa, '', 0);
            destroy_cookies("vtas_id"+sessionStorage.tabVisitasa);
            destroy_cookies("vtas_id_hash"+sessionStorage.tabVisitasa);
            destroy_cookies("vtas_fullname"+sessionStorage.tabVisitasa);
            destroy_cookies("vtas_external_company_id"+sessionStorage.tabVisitasa);
            destroy_cookies("vtas_external_user"+sessionStorage.tabVisitasa);
            destroy_cookies("vtas_perfil"+sessionStorage.tabVisitasa);
            destroy_cookies("vtas_type_user"+sessionStorage.tabVisitasa);
            myMSALObj.logout();

            return;
        }
        setCookie("vtas_id"+sessionStorage.tabVisitasa, "", 0);
        setCookie("vtas_type_user"+sessionStorage.tabVisitasa, "", 0);
        setCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa, '', 0);
        destroy_cookies("vtas_id"+sessionStorage.tabVisitasa);
        destroy_cookies("vtas_id_hash"+sessionStorage.tabVisitasa);
        destroy_cookies("vtas_fullname"+sessionStorage.tabVisitasa);
        destroy_cookies("vtas_external_company_id"+sessionStorage.tabVisitasa);
        destroy_cookies("vtas_external_user"+sessionStorage.tabVisitasa);
        destroy_cookies("vtas_perfil"+sessionStorage.tabVisitasa);
        destroy_cookies("vtas_type_user"+sessionStorage.tabVisitasa);

        location.href='./';
    });
}





//para validar el tokens
