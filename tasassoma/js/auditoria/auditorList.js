var auditor = [];
var cont_auditor=0;
var JSON_datosAU = [];
var JSON_ROL = [];
var norma = [];
var jsonEspecialidades = [];
var Observador = false;
var Auditor = false;
var AuditorLider = false;
var interpretacion = [];
var jsonNormas_AU =[];
var AuditorInterno = [];
var capacitacionesOBJ = [];
var experienciasOBJ = [];
var Bool_DeleteT = false;
var Bool_DeleteS = false;

let _body = [];

//-----------------------------------------andy 12-05-2021----------------------------------------------------
var aObj = new Array();
var istAudd = 0;
var istRol = '';

function dbAuditor()
 {

        this.a = [];


       dbAuditor.prototype.cargarData = function (data)
        {

            this.a = data;
            // this.a.AdjuntoIncidente = 0;
            // this.a.IdAlerta = 0;
            // this.a.AdjuntoAlerta = 0;
            // this.a.hayEvidenciaBD = 0;
        }

    }
//-----------------------------------------andy 12-05-2021----------------------------------------------------


var vw_auditor_list = function()
{

    let arrayAuditorres = []

    //LISTADO DE AUDITORES
    var AuditorsList = function ()
    {
        cargarSelectsNormas()

        cont_auditor=0;
        var apiKeyx = "r$3#23516ewew5";
        var servicio = '/api/Get-Auditor-All?code=';
        var metodoHttp = "objectlist";
        var metodoAjax =  "GET";
        var url2 = apiurlAuditoria+servicio+GetAuditors+"&httpmethod="+metodoHttp;
        var headers ={
            "apikey":apiKeyx
        }

        $.ajax({
            method: metodoAjax,
            url:  url2,
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function( response)
        {
            console.warn("response -> ",response)
            let aux = 0;
             response.forEach((Item)=>{
                          aObj[Item.Id] = new dbAuditor();//andy 12-05-21
                          aObj[Item.Id].cargarData(Item);
                          // aObj[aux] = new dbAuditor();//andy 12-05-21
                          // aObj[aux].cargarData(Item);
                          // aux++
                    })
             //console.log("** ==== OBJETO aObj -> ", aObj);


            arrayAuditorres = response
            $('#pagination-container').pagination({
                dataSource: response,
                pageSize: 5,
                callback: function(response, pagination) {

                    var html = TemplateListAuditores(response);
                    $('#body-tabla-list').html(html);
                }
            })

            $('.body-tabla').addClass('hidden')
            $('#cantidad').text(response.length)

        })
        .fail(function( jqXHR, textStatus, errorThrown)
        {
            console.log( jqXHR, textStatus, errorThrown)
        })
        .always(function(data , textStatus, jqXHR )
        {
            // alert( "complete" );
            // console.table(arrayAuditorres)
        });


    }
    //LISTADO DE AUDITORES

      function TemplateListAuditores (data){
        console.log(data)
        var html = '';
          var estatus =
        JSON_datosAU=data;
        //JSON_datosAU.sort(sortByProperty('Id')); //sort according to id
        console.log("JSON_datosAU -> ",JSON_datosAU)
          var ii = 0;
          data.forEach((datos) => {



              var estatus = "";
            if (datos.Active == 1){
                 estatus = "Activo";
            }else{
                 estatus = "Inactivo";
            }
            html +=`<div class="tr_auditorList item-tabla py-3 px-2" style="font-size: 14px">
            <div class="row m-0 justify-content-between align-items-center">
                <div class="col-md-2">${datos.Name}</div>
                <div class="col-md-2">${datos.Rol_Code}</div>
                <div class="col-md-2">${Object.keys(datos.Capacitaciones).length}</div>
                <div class="col-md-2">${Object.keys(datos.Experiencia).length}</div>
                <div class="col-md-2">${estatus}</div>
                <div class="col-1 text-center">
                    <button type='button' _id='${datos.Id}'  class='btn-circle btn-register border-0' onclick='vw_auditor_list.AuditorDetalle(${datos.Id},"${datos.UserIdhash}");' style='background-color: #58c25d' id='btn_edit'>
                        <img src="./images/iconos/edit_1.svg" class="edit-1">
                    </button>
                </div>
                <div class="col-1 text-center">
                    <button type='button' _id='${datos.Id}' class='btn-circle btn_read border-0 ' style='background-color: #373e68' id='btn_read' onclick='vw_auditor_list.readAuditor(${datos.Id})' >
                        <img src='./images/iconos/ojo_1.svg' class='ojo-1'>
                    </button>
                </div>

            </div>
        </div>`;

        })
          html += '';
          return html;
    }


    //INICIALIZAR MODAL NUEVO AUDITOR
    var newAuditor = function (){
        $('#txtHeadModalRegisterAuditor').html("Registro de Auditor");
        $('#Cargo_1').css("background-color",'#fff')


        var navListItems = $('div.setup-panel div a button'); // tab nav items
        navListItems.removeClass('btn-primary-check').addClass('btn-default');
        $('#btn_step1').addClass('btn-primary-check');

           var allWells = $('.setup-content'); // content div
            step1 = $('#step-1');
        allWells.hide(); // hide all contents by defauld
        step1.show();
        $('#idAuditor').val('');

        $('#Name_1').attr('readonly', false);
        $('#formAjax').trigger("reset");
        $('#tbody_skill').html('');
        $('#tbody_trainning').html('');
        $("#switch_estatus").prop("checked", true);
        $('.textarea_noActivo').hide();
        $('#modalShowAuditor').modal('show');
        vw_principal.init();
        $('#Create_By').val(getCookie("vtas_id_hash"+sessionStorage.tabVisitasa))
        getPerson($("#Name_1"),1);
    }
    //INICIALIZAR MODAL NUEVO AUDITOR


    var EnviarForm = function () {
        var active="";
        var status="";
        var metodo="";
        var type = "";
        var Observacion="";
        $("#splashLoading").show();
        $("#modalShowAlertConfirm").removeClass("fade").modal("hide");
        var UserIdhash = $('#hid_Name_id_1').val();
        var Name = $('#Name_1').val();
        var Correo = $('#hid_Correo_1').val();
        var Rol_Code = $('input:radio[name=Rol_Code]:checked').val();
        var SedeId = $('#SedeId_').val();
        var EspecialidadId= $('#EspecialidadId').val();
        var Cargo= $('#hid_Cargo_1').val();
        var Create_By= getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
        console.log($('#switch_estatus').val())
        if($('#val_status').val()==1) {
            active = $('#val_status').val();
            status = "Activo";
            Observacion=""
        }else{
            active=$('#val_status').val();
            status="Inactivo"
            Observacion =$('#textarea-formAuditor').val()
        }

        for (h in JSON_ROL){
            if(JSON_ROL[h].Description==$('input:radio[name=Rol_Code]:checked').val()){
                type = JSON_ROL[h].Id;
            }
        }
        //console.log(capacitacionesOBJ)
        //console.log(experienciasOBJ)




        if($('#idAuditor').val()!=""){
            metodo="&httpmethod=put&Id="+$('#idAuditor').val();
            var body ={
                "Id": $('#idAuditor').val(),
                "UserIdhash": UserIdhash,
                "Name":  Name,
                "Correo":  Correo,
                "Rol_Code" : Rol_Code,
                "SedeId" : parseInt(SedeId),
                "Active" : active,
                "Observacion": Observacion,
                "EspecialidadId": parseInt(EspecialidadId),
                "Cargo": Cargo,
                "Tipo": parseInt(type),
                "Create_By": Create_By,
                "Capacitacion": capacitacionesOBJ,
                "Experiencia": experienciasOBJ

            }
        }else{
            metodo="&httpmethod=post";
            var body ={
                "UserIdhash": UserIdhash,
                "Name":  Name,
                "Correo":  Correo,
                "Rol_Code" : Rol_Code,
                "SedeId" : parseInt(SedeId),
                "Active" : 1,
                "EspecialidadId": parseInt(EspecialidadId),
                "Cargo": Cargo,
                "Tipo": parseInt(type),
                "Create_By": Create_By,
                "Capacitacion": capacitacionesOBJ,
                "Experiencia": experienciasOBJ

            }
        }
        console.log(body)

        var servicio   = "/api/Post-Auditor-All?code=";
        var url = apiurlAuditoria+servicio+PostAuditor+metodo;
        var headers ={
            "apikey":constantes.apiKey
        }

        console.warn("Rol_Code -> ",Rol_Code)
        if(UserIdhash != "" && Rol_Code != undefined )
        {

            $.ajax({
                url:  url,
                dataType: "json",
                method:"post",
                data : JSON.stringify(body),
                processData:false,
                crossDomain: true,
                async: true,
                headers : headers,
            })
                .done(function(data)
                {

                    if(data.Id>0)
                    {

                        //aqui llammos a nuestro servicio
                        /*
                          tipo: parseInt(type)
                          idhashh: UserIdhash
                          create_by: Create_By
                          correo: Correo
                          fechaHora:
                          name1: Name
                          dni:''
                        */



                        var f = new Date();
                        var fechax = ""+ f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate()+' '+f.getHours()+':'+f.getMinutes()+':'+f.getSeconds()+"";


                        ingresaAuditorSecurity(parseInt(type), UserIdhash, Create_By, Correo, fechax, Name, 'dni nada');

                        clearForm();
                        searchAuditor();

                    }else{
                        console.log("no guardoo.")
                        swal("Error","Al guardar el auditor contacte a TI.","error")
                        $("#splashLoading").fadeOut();
                        $("#modalShowAuditor").modal("show").addClass("fade");

                    }
                })
                .fail(function( jqXHR, textStatus, errorThrown ) {
                    console.log("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
                    console.log(jqXHR)
                    console.log( textStatus)
                    //console.log(errorThrown)
                    $("#splashLoading").fadeOut();
                    swal("Error","Al guardar el auditor contacte a TI.","error")
                    $("#modalShowAuditor").modal("show").addClass("fade");

                });//*/
        }
        else
        {
            $("#splashLoading").fadeOut();
            swal("Error","Complete todos los campos obligatorios (Nombre y Rol). = ","error")
            $("#modalShowAuditor").modal("show").addClass("fade");
        }


    }


    var ingresaAuditorSecurity = function(tipo, idhashh, create_by, correo, fechaHora, name1, dni)
    {

//var url = apiUrlssoma+"/api/Get-Incidente-AccidenteWeb?code=GY7/yooa3Zl5sKu7zgakDbaCn4uvOKXjfwe/JkbSuIwDPOs/baiZFQ==&httpmethod=objectlist&IdTipoEvento="+programa+"&IdEmpresa="+gerencia+"&IdSede="+sedepa+"&FechaInicio="+f1+"&FechaFin="+f2+"&IdEmbarcacion="+estadopa
var url = apiUrlssoma+"/api/Post-Inspector-Auditor?code=dda7hh5vuPjt6GvdY1ltzYPUcrdrTYtehq2A4Ggx52zlSwmBLtIipQ==&httpmethod=post&tipo="+tipo+"&idhashh="+idhashh+"&create_by="+create_by+"&correo="+correo+"&fechaHora="+fechaHora+"&name1="+name1+"&dni="+ dni;
    //var url = "https://550m44ud1tmg7454-inspection-dev.azurewebsites.net/api/Get-Incidente-AccidenteWeb?code=GY7/yooa3Zl5sKu7zgakDbaCn4uvOKXjfwe/JkbSuIwDPOs/baiZFQ==&httpmethod=objectlist";

    console.log("URL",url )
    var headers ={
        "apikey":constantes.apiKey
    }

    var settings = {
        "url": url,
        "method": "POST",
        "timeout": 0,
        "crossDomain": true,
        "dataType": "json",
        "headers": headers,
    };

console.log('===================================================**====== se guardo, ahora vamos a security  ===============================');

                          console.log('tipo ='+tipo);
                          console.log('idhashh ='+idhashh);
                          console.log('create_by ='+create_by);
                          console.log('correo ='+correo);
                          console.log('fechaHora ='+fechaHora);
                          console.log('name1 ='+name1);
                          console.log('dni ='+dni);
                          console.log('**url ='+url);


console.log('====================================================**===== se guardo, ahora vamos a security  ===============================');




               $.ajax(settings).done(function (response)
                {


                     //console.clear();
                     console.log('************************ YA LOS GUARDO EN SECURITY  ********************');
                 })

    }


    var clearForm=function()
    {
        // ABRIMOS MODAL EXITO EN REGISTRO DE AUDITORIA
        $("#modalShowAlertOk").modal("show").addClass("fade");
        $("#splashLoading").fadeOut();
        $("#Name_1").val("");
        $("#Cargo_1").val("");
        $("#SedeId_").val("");
        $("#EspecialidadId").val("");
        $("#sel_rule_trainning").val("");
        $("#sel_trainnig").val("");
        $("#sel_type").val("");
        $("#txt_date_start").val("");
        $("#txt_date_end").val("");
        $("#file_trainning").val("");
        $("#sel_rule_skill").val("");
        $("#sel_role_skill").val("");
        $("#txt_date_start_skill").val("");
        $("#txt_date_end_skill").val("");
        $("#file_skill").val("");
        $("#tbody_skill").empty();
        $("#tbody_trainning").empty();
         capacitacionesOBJ = [];
         experienciasOBJ = [];
    }

    var getPerson = function (obj,i) {
        obj.autocomplete({
            change: function (event, ui)
            {
                //console.log( $("#hid_collaborator_id_"+i).val())
                if (ui.item === null &&  $("#hid_Name_id_1"+i).length>20)
                {

                    /*  $("#hid_collaborator_id_"+i).val("");
                     $(this).val("");
                     $("#add_covid_lastname_"+i).val(""); */
                }
                else if(ui.item)
                {

                    $("#Name_"+i).val(ui.item.firstname).trigger("change");
                    //$("#add_covid_lastname_"+i).val(ui.item.lastname).trigger("change");
                    //$("#add_covid_lastname_"+i).focus();
                    //document.getElementById("add_covid_lastname_"+i).focus();
                    // document.getElementById("add_covid_lastname_"+i).focus();
                }
                //document.getElementById("add_covid_lastname_"+i).focus();

            },

            source: function( request, response )
            {
                var filter = obj.val();
                ///console.log(filter);
                var param= {filter:filter};
                //console.log("Authorization"+TOKEN_CLIENT+"apiKey:r$3#23516ewew5");
                var headers = {"Authorization":TOKEN_CLIENT,"apiKey":"r$3#23516ewew5"}
                $("#add_firtnameload_1").show();
                //console.log(apiurlsecurity+"/api/Get-Collaborator?code="+GetCollaborator+"&httpmethod=objectlist")

                $.ajax({
                    url: apiurlsecurity+"/api/Get-Collaborator?code="+GetCollaborator+"&httpmethod=objectlist",
                    //dataType: "json",
                    method:"post",
                    data : JSON.stringify(param),
                    processData:false,
                    crossDomain: true,
                    async: true,
                    headers : headers,
                    success: function( data )
                    {
                        //console.log(data)
                        $("#add_firtnameload_1").hide();
                        var array =[];
                        data =  JSON.parse(data);

                        data.value.forEach(item =>
                        {
                            var json ={}
                            json.label      = item.displayName;
                            json.value      = item.givenName;
                            json.id         = item.objectId;
                            json.cargo      = item.jobTitle;
                            json.firstname  = item.displayName;//item.givenName+' '+item.surname;
                            json.correo     = item.userPrincipalName;
                            array.push(json);
                        });

                        response(array);
                    }
                });
            },
            minLength: 3,
            select: function( event, ui )
            {



                //$("#add_covid_dni_"+i).trigger("focusout");
                //console.log(ui.item.label)
                setTimeout(function(){
                    //console.clear();


                    var sal = validaAuditor(ui.item.id, ui.item.firstname);
                    if(sal != -1)
                    {

                     $('#formAjax')[0].reset();
                     $("#switch_estatus").prop("checked", true);

                     console.log("ER ID ES = "+ui.item.id);
                     $("#Name_"+i).val(ui.item.firstname);
                     $("#hid_Name_id_"+i).val(ui.item.id);
                     $("#Cargo_"+i).val(ui.item.cargo);
                     $("#hid_Cargo_"+i).val(ui.item.cargo);
                     $("#hid_Correo_"+i).val(ui.item.correo);
                    }

                },300);




            },
            open: function() {
                $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
            },
            close: function() {
                $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );

            },
            search: function () {
                $("#spinnerLoadColaborador").show();
            },
            response: function () {
                $("#spinnerLoadColaborador").hide();
                // document.getElementById("add_covid_lastname_"+i).focus();
            }
        });
    }

    var start_paginate = function () {
        let options = {
            numberPerPage:6, //Cantidad de datos por pagina
            goBar:true, //Barra donde puedes digitar el numero de la pagina al que quiere ir
            pageCounter:true, //Contador de paginas, en cual estas, de cuantas paginas
        };

        let filterOptions = {
            el:'#searchBox' //Caja de texto para filtrar, puede ser una clase o un ID
        };

        paginate2.init('#body-tabla-list',options,filterOptions);
    }

    var cancelformAuditor=function()
    {
        $('#formAjax')[0].reset();
        $('#modalShowAuditor2').modal('hide');
        $('#modalShowAuditor').modal('hide');
        $('#sel_type_rol').val("");
        $('#tx_name_auditor').val("");
        $('#tbody_trainning').html('');
        $('#tbody_skill').html('');
        $('#idAuditor').val('');
        capacitacionesOBJ = [];
        experienciasOBJ = [];
    }


    var cancelConfirmformAuditor = function()
    {
        $("#modalShowAlertConfirm").removeClass("fade").modal("hide");
        $("#modalShowAuditor").modal("show").addClass("fade");
        $('#modalShowAlertConfirm').modal('hide');
        $('#modalShowAuditor2').modal('hide');

    }
    // DETALLE SOLO LECTURA DEL AUDITOR
    var readAuditor=function(id)
    {
        $("#preloader2").show();
        $("#preloader_txt2").show();

        var cap ="";
        var exp ="";
        // console.log(id);
        var left = "";
        var Right = "";
        var cursoIntNorm = 0;
        var cursoAuditor = 0;
        $('#namePerfil').html("");
        $('#read_rol').html('');
        $('#read_cargo').html('');
        $('#read_sede').html('');
        $('#read_capacitaciones').html('');
        $('#read_experiencia').html('');
        var apiKeyx = "r$3#23516ewew5";
        var servicio = '/api/Get-Auditoria-Auditor-Perfil-All?code=';
        var metodoHttp = "objectlist";
        var metodoAjax =  "GET";
        var url2 = apiurlAuditoria+servicio+GetAuditorDetail+"&httpmethod="+metodoHttp+"&Id="+id+"&Ver=0";
        var headers ={
            "apikey":apiKeyx
        }

              //alert(apiurlAuditoria);
        $.ajax({
            method: metodoAjax,
            url:  url2,
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function( data)
        {
            console.log(data)

            $('#namePerfil').html("Perfil de "+data.Name);
            $('#read_rol').html(data.Rol);
            $('#read_cargo').html(data.Cargo);
            $('#read_sede').html(data.DescriptionSede);
            for (o in data.Capacitaciones ){


                switch (data.Capacitaciones[o].Curso_Des) {
                    case "Interpretación de la Norma":
                        left +="<p >"+data.Capacitaciones[o].Tipo_Des+" - "+data.Capacitaciones[o].Norma_Des+"</p>";
                        cursoIntNorm = cursoIntNorm +1;
                        break;
                    case "Curso de Auditor Interno":
                        Right +="<p>"+data.Capacitaciones[o].Tipo_Des+" - "+data.Capacitaciones[o].Norma_Des+"</p>";
                        cursoAuditor = cursoAuditor +1;
                        break;
                    case "Auditor Interno":
                        Right +="<p>"+data.Capacitaciones[o].Tipo_Des+" - "+data.Capacitaciones[o].Norma_Des+"</p>";
                        cursoAuditor = cursoAuditor +1;
                        break;
                }

            }


            if (left=="" & Right==""){
                cap ="<div class='row p-0'>" +
                    "<div class='col-6'> </div>"+
                    "<div class='col-6'> </div>"+
                    "<div class='col-6'> </div>"+
                    "<div class='col-6'> </div>"+
                    "</div>";
            }else if (left==""){
                cap ="<div class='row p-0'>" +
                    "<div class='col-6'><b> Curso de Auditor Interno ( "+cursoAuditor+" ) </b></div>"+
                    "<div class='col-6'>  </div>"+
                    "<div class='col-6'> "+Right+" </div>"+
                    "<div class='col-6'> </div>"+
                    "</div>";
            }else if(Right==""){
                cap = "<div class='row p-0'>" +
                    "<div class='col-6'><b> Interpretación de la Norma ( "+cursoIntNorm+" ) </b></div>" +
                    "<div class='col-6'>  </div>" +
                    "<div class='col-6'> " + left + " </div>" +
                    "<div class='col-6'>  </div>" +
                    "</div>";
            }
            else {
                cap = "<div class='row p-0'>" +
                    "<div class='col-6'><b> Interpretación de la Norma ( "+cursoIntNorm+" )</b></div>" +
                    "<div class='col-6'> <b>Curso de Auditor Interno ( "+cursoAuditor+" ) </b></div>" +
                    "<div class='col-6'> " + left + " </div>" +
                    "<div class='col-6'> " + Right + " </div>" +
                    "</div>";
            }


            $('#read_capacitaciones').html(cap);
            for (j in data.Experiencia ){
                //var code_norma = data.Experiencia[j].Code_Normas.replace(',',' / ');
                var code_norma = data.Experiencia[j].Code_Normas;
                var fechaI  = data.Experiencia[j].FechaInicio.split("T")
                var fechaF  = data.Experiencia[j].FechaFin.split("T")
                var fecha = moment(fechaI[0]).format('DD/MM/YYYY')+"   -   "+moment(fechaF[0]).format('DD/MM/YYYY');

                exp +="<div class='row p-0'>" +
                    "                                <p >"+(data.Experiencia[j].RolDes?data.Experiencia[j].RolDes:'')+"</p><br>" +
                    "                            </div>"+
                    "<div class='row p-0'>" +
                    "                            <div class='col-3 '>" +
                    "                                <p >"+code_norma+"</p>" +
                    "                            </div>" +
                    "                            <div class='col-5 p-2'>" +
                    "                                <hr>" +
                    "                            </div>" +
                    "                            <div class='col-4 '>" +
                    "                                <p >"+fecha+"</p>" +" <br> "+
                    "                            </div>"+
                    "                            </div>"
                ;
            }
            $('#read_experiencia').html(exp);


        })  .fail(function( jqXHR, textStatus, errorThrown) {

            console.log( jqXHR, textStatus, errorThrown)
        })
            .always(function(data , textStatus, jqXHR ) {
                // alert( "complete" );
                $("#preloader2").hide();
        $("#preloader_txt2").hide();
            });

        $('#modalShowAuditor2').modal('show');
    }
    // DETALLE SOLO LECTURA DEL AUDITOR

    // DETALLE SOLO LECTURA DEL AUDITOR
    var readAuditorAsignacion=function(id)
    {
        $("#preloader2").show();
        $("#preloader_txt2").show();
        var cap ="";
        var exp ="";
        // console.log(id);
        var left = "";
        var Right = "";
        var cursoIntNorm = 0;
        var cursoAuditor = 0;
        $('#read_capacitaciones_2').html('');
        $('#read_experiencia_2').html('');
        $('#namePerfil_2').html("");
        $('#read_rol_2').html('');
        $('#read_cargo_2').html('');
        $('#read_sede_2').html('');
        var apiKeyx = "r$3#23516ewew5";
        var servicio = '/api/Get-Auditoria-Auditor-Perfil-All?code=';
        var metodoHttp = "objectlist";
        var metodoAjax =  "GET";
        var url2 = apiurlAuditoria+servicio+GetAuditorDetail+"&httpmethod="+metodoHttp+"&Id="+id+"&Ver=0";

        var headers ={
            "apikey":apiKeyx
        }

        $.ajax({
            method: metodoAjax,
            url:  url2,
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function( data)
        {
            $('#namePerfil_2').html("Perfil de "+data.Name);
            $('#read_rol_2').html(data.Rol);
            $('#read_cargo_2').html(data.Cargo);
            $('#read_sede_2').html(data.DescriptionSede);

            console.log(data)
            for (o in data.Capacitaciones ){


                switch (data.Capacitaciones[o].Curso_Des) {
                    case "Interpretación de la Norma":
                        left +="<p >"+data.Capacitaciones[o].Norma_Des+"</p>";
                        cursoIntNorm = cursoIntNorm +1;
                        break;
                    case "Curso de Auditor Interno":
                        Right +="<p>"+data.Capacitaciones[o].Norma_Des+"</p>";
                        cursoAuditor = cursoAuditor +1;
                        break;
                }

            }


            if (left=="" & Right==""){
                cap ="<div class='row p-0'>" +
                    "<div class='col-6'> </div>"+
                    "<div class='col-6'> </div>"+
                    "<div class='col-6'> </div>"+
                    "<div class='col-6'> </div>"+
                    "</div>";
            }else if (left==""){
                cap ="<div class='row p-0'>" +
                    "<div class='col-6'> <b>Curso de Auditor Interno ("+cursoAuditor+") </b></div>"+
                    "<div class='col-6'>  </div>"+
                    "<div class='col-6'> "+Right+" </div>"+
                    "<div class='col-6'> </div>"+
                    "</div>";
            }else if(Right==""){
                cap = "<div class='row p-0'>" +
                    "<div class='col-6'> <b>Interpretación de la Norma ("+cursoIntNorm+") </b></div>" +
                    "<div class='col-6'>  </div>" +
                    "<div class='col-6'> " + left + " </div>" +
                    "<div class='col-6'>  </div>" +
                    "</div>";
            }
            else {
                cap = "<div class='row p-0'>" +
                    "<div class='col-6'> <b>Interpretación de la Norma ("+cursoIntNorm+")</b></div>" +
                    "<div class='col-6'> <b>Curso de Auditor Interno ("+cursoAuditor+") </b></div>" +
                    "<div class='col-6'> " + left + " </div>" +
                    "<div class='col-6'> " + Right + " </div>" +
                    "</div>";
            }


            $('#read_capacitaciones_2').html(cap);

            for (j in data.Experiencia ){
                //var code_norma = data.Experiencia[j].Code_Normas.replace(',',' / ');
                var code_norma = data.Experiencia[j].Code_Normas;
                var fechaI  = data.Experiencia[j].FechaInicio.split("T")
                var fechaF  = data.Experiencia[j].FechaFin.split("T")
                var fecha = moment(fechaI[0]).format('DD/MM/YYYY')+" - "+moment(fechaF[0]).format('DD/MM/YYYY');
                exp +="<div class='row p-0'>" +
                    "                                <p >"+data.Experiencia[j].RolDes+"</p><br>" +
                    "                            </div>"+
                    "<div class='row p-0'>" +
                    "                            <div class='col-3 '>" +
                    "                                <p >"+code_norma+"</p>" +
                    "                            </div>" +
                    "                            <div class='col-5 p-2'>" +
                    "                                <hr>" +
                    "                            </div>" +
                    "                            <div class='col-4 pl-3'>" +
                    "                                <p >"+fecha+"</p>" +" <br> "+
                    "                            </div>"+
                    "                            </div>"
                ;
            }
            $('#read_experiencia_2').html(exp);


        })  .fail(function( jqXHR, textStatus, errorThrown) {

            console.log( jqXHR, textStatus, errorThrown)
        })
            .always(function(data , textStatus, jqXHR ) {
                // alert( "complete" );
                $("#preloader2").hide();
        $("#preloader_txt2").hide();
            });

        $('#modalShowAuditor2_2').modal('show');
    }

    // DETALLE DEL AUDITOR MODIFICABLE
    var AuditorDetalle=function(id, UserIdhashx)
    {
        istAudd = id;
        //alert(UserIdhashx);
        $("#preloader").show();
        $("#preloader_txt").show();
        cancelformAuditor();
        var navListItems = $('div.setup-panel div a button'); // tab nav items
        navListItems.removeClass('btn-primary-check').addClass('btn-default');
        $('#btn_step1').addClass('btn-primary-check');
        $("#splashLoading").show();

        var allWells = $('.setup-content'); // content div
        step1 = $('#step-1');
        allWells.hide(); // hide all contents by defauld
        step1.show();

        var apiKeyx = "r$3#23516ewew5";
        var servicio = '/api/Get-Auditoria-Auditor-Perfil-All?code=';
        var metodoHttp = "objectlist";
        var metodoAjax =  "GET";
        var url2 = apiurlAuditoria+servicio+GetAuditorDetail+"&httpmethod="+metodoHttp+"&Id="+id+"&Ver=1";

        //alert(url2);

        var headers ={
            "apikey":apiKeyx
        }

        $.ajax({
            method: metodoAjax,
            url:  url2,
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function( data)
        {

            console.log("(749) Data del auditor a editar:", data)
//Cambio de los Step del formulario y color de los botones
            var navListItems = $('div.setup-panel div a button'), // tab nav items
                allWells = $('.setup-content'), // content div
                allNextBtn = $('.nextBtn'), // next button
                step1 = $('#step-1');
            allWells.hide(); // hide all contents by defauld
            step1.show();

            $('#btn_step1').addClass('btn-primary-check');
            $('#txtHeadModalRegisterAuditor').html("Editar Auditor");
            $('#Name_1').attr('readonly', true);
            $('#Cargo_1').attr('readonly', true);
            $('#Cargo_1').css("background-color",'#e9ecef')
            $('#idAuditor').val(data.Id);
            $('#Name_1').val(data.Name);
            $('#hid_Name_id_1').val(UserIdhashx);//andy 11-05
            $('#Cargo_1').val(data.Cargo);
            $('#SedeId_').val(data.SedeId);
            $('#EspecialidadId').val(data.EspecialidadId);
            $('#val_status').val(data.Active)
            $('#textarea-formAuditor').val(data.Observacion)
            if(data.Active==1){
                $('#customSwitch1').html('Activo');
                $("#switch_estatus").prop("checked", true);
                $('.textarea_noActivo').hide();}
            else {
                $('#customSwitch1').html('Inactivo');
                $("#switch_estatus").prop("checked", false);
                $('.textarea_noActivo').show();
            }

             $('input[name=Rol_Code][value="'+data.Rol+'"]').prop("checked", true);
             istRol = data.Rol;
            $('#textarea-formAuditor').val('');

            for (o in data.Capacitaciones ){
                var fechaI  = data.Capacitaciones[o].Fecha_Inicio.split("T");
                var fechaF  = data.Capacitaciones[o].Fecha_Final.split("T");
                var ArchT ="";
                var doc = "";
                console.log("adjunto",data.Capacitaciones[o].Adjunto.length)

                capacitacionesOBJ.push({
                    "Id": data.Capacitaciones[o].Id,
                    "NormaId": data.Capacitaciones[o].NormaId,
                    "TipoCursoId": data.Capacitaciones[o].TipoCursoId,
                    "Tipo": data.Capacitaciones[o].Tipo,
                    "Fecha_Inicio": data.Capacitaciones[o].Fecha_Inicio,
                    "Fecha_Final": data.Capacitaciones[o].Fecha_Final,
                    "Adjunto": data.Capacitaciones[o].Adjunto,
                    "Active": 1,
                    "Created_By": getCookie("vtas_id_hash"+sessionStorage.tabVisitasa)
                });
                //if(data.Capacitaciones[o].Adjunto!="" || data.Capacitaciones[o].Adjunto!= null || data.Capacitaciones[o].Adjunto!= undefined){
                if(data.Capacitaciones[o].Adjunto > 0){
                    ArchT = data.Capacitaciones[o].Adjunto;

                    $("#tbody_trainning").append("<tr style = 'border: 1px solid #cbcbcb; border-radius: 0.5em; display:block;'>" +

                        "                            <td>&nbsp;&nbsp;" + data.Capacitaciones[o].Norma_Des + "</td>" +
                        "                            <td>" + data.Capacitaciones[o].Curso_Des + "</td>" +
                        "                            <td>" + moment(fechaI[0]).format('DD/MM/YYYY') + "</td>" +
                        "                            <td>" + moment(fechaF[0]).format('DD/MM/YYYY') + "</td>" +
                        "                            <td>" + data.Capacitaciones[o].Tipo_Des + "</td>" +
                        "                            <td class='p-3'>" +
                        "                                <button type='button' value='"+ArchT+"' class='btn-circle readPDF_trainning border-0' onclick='vw_auditor_list.openNewTab_T(this.value);' style='background-color: #58c25d' id='btn_edit'>" +
                        "                                    <img src='./images/iconos/ojo_1.svg' class='edit-1'>" +
                        "                                </button>" +
                        "                            </td>" +
                        "                            <td class='p-3'>" +
                        "                                <button type='button' _Id='"+data.Capacitaciones[o].Id+"' class='btn-circle delete border-0' style='background-color: #ff4d4d' id='btn_read' >" +
                        "                                    <img src='./images/iconos/delete.svg' class='ojo-1'>" +
                        "                                </button>" +
                        "                            </td>" +
                        "                        </tr>");

                }else{
                     ArchT ="";
                     console.log("no adjunto")
                    $("#tbody_trainning").append("<tr  style = 'border: 1px solid #cbcbcb; border-radius: 0.5em; display:block;'>" +

                        "                            <td>&nbsp;&nbsp;" + data.Capacitaciones[o].Norma_Des + "</td>" +
                        "                            <td>" + data.Capacitaciones[o].Curso_Des + "</td>" +
                        "                            <td>" + moment(fechaI[0]).format('DD/MM/YYYY') + "</td>" +
                        "                            <td>" + moment(fechaF[0]).format('DD/MM/YYYY') + "</td>" +
                        "                            <td>" + data.Capacitaciones[o].Tipo_Des + "</td>" +
                        "                            <td class='p-3'>" +
                        "                                <button type='button' disabled class='btn-circle border-0 readPDF_trainning' style='background-color: #c3c3c3' id='btn_edit'>" +
                        "                                    <img src='./images/iconos/ojo_1.svg' class='edit-1 '>" +
                        "                                </button>" +
                        "                            </td>" +
                        "                            <td class='p-3'>" +
                        "                                <button type='button' _Id='"+data.Capacitaciones[o].Id+"' class='btn-circle delete border-0' style='background-color: #ff4d4d' id='btn_read' >" +
                        "                                    <img src='./images/iconos/delete.svg' class='ojo-1'>" +
                        "                                </button>" +
                        "                            </td>" +
                        "                        </tr>");
                }




            }

            for (j in data.Experiencia ){
                // var code_norma = data.Experiencia[j].Code_Normas.replace(',',' / ');
                var code_norma = data.Experiencia[j].Code_Normas;
                var fechaI  = data.Experiencia[j].FechaInicio.split("T")
                var fechaF  = data.Experiencia[j].FechaFin.split("T")
                var x = "";
                experienciasOBJ.push({
                    "Id": data.Experiencia[j].Id,
                    "NormaId": data.Experiencia[j].NormaId,
                    "RolId" : data.Experiencia[j].RolId,
                    "FechaInicio":  data.Experiencia[j].FechaInicio,
                    "FechaFin":data.Experiencia[j].FechaFin,
                    "Adjunto": data.Experiencia[j].Adjunto,
                    "Active":1,
                    "Created_By": getCookie("vtas_id_hash"+sessionStorage.tabVisitasa)});

                switch (data.Experiencia[j].RolDes) {
                    case  "Observador" :
                        x = "<td  >&nbsp;&nbsp;&nbsp;" + 'Si' + "</td>" + "<td >&nbsp;&nbsp;&nbsp;&nbsp;" + '-' + "</td>" + "<td >&nbsp;&nbsp;&nbsp;&nbsp;" + '-' + "</td>";
                        break;
                    case "Auditor Lider" :
                        x = "<td  >&nbsp;&nbsp;&nbsp;" + '-' + "</td>" + "<td >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + 'Si' + "</td>" + "<td >&nbsp;&nbsp;&nbsp;" + '-' + "</td>";
                        break;
                    case "Auditor" :
                        x = "<td  >&nbsp;&nbsp;&nbsp;" + '-' + "</td>" + "<td >&nbsp;&nbsp;&nbsp;" + '-' + "</td>" + "<td >&nbsp;&nbsp;&nbsp;" + 'Si' + "</td>";
                        break;
                }
                var ArchS ="";
                var doc2 = "";
                //if(data.Experiencia[j].Adjunto!="" || data.Experiencia[j].Adjunto!= null || data.Experiencia[j].Adjunto!= undefined){
                if(data.Experiencia[j].Adjunto > 0){
                    ArchS = data.Experiencia[j].Adjunto;
                    $("#tbody_skill").append("<tr  style = 'border: 1px solid #cbcbcb; border-radius: 0.5em; display:block;' >" +
                        "                            <td  >&nbsp;&nbsp;" + code_norma + "</td>" +
                        x +
                        "                            <td  >" + moment(fechaI[0]).format('DD/MM/YYYY') + "</td>" +
                        "                            <td  >" + moment(fechaF[0]).format('DD/MM/YYYY') + "</td>" +
                        "                            <td   class='p-3 '>" +
                        "                    <button type='button'  value='"+ArchS+"' class='btn-circle readPDF_skill border-0' onclick='vw_auditor_list.openNewTab_S(this.value);' style='background-color: #58c25d' id='btn_edit'>" +
                        "                                <img src='./images/iconos/ojo_1.svg' class='edit-1 '>" +
                        "                                </button>" +
                        "                            </td>" +
                        "                            <td  class='p-3 ' >" +
                        "                                <button type='button' _id='"+data.Experiencia[j].Id+"' class='btn-circle delete border-0' style='background-color: #ff4d4d' id='btn_read' >" +
                        "                                    <img src='./images/iconos/delete.svg' class='ojo-1'>" +
                        "                                </button>" +
                        "                            </td>" +
                        "                        </tr>");

                }else{
                    ArchS ="";
                    $("#tbody_skill").append("<tr   style = 'border: 1px solid #cbcbcb; border-radius: 0.5em; display:block;' >" +
                        "                            <td  >&nbsp;&nbsp;" + code_norma + "</td>" +
                        x +
                        "                            <td  >" + moment(fechaI[0]).format('DD/MM/YYYY') + "</td>" +
                        "                            <td  >" + moment(fechaF[0]).format('DD/MM/YYYY') + "</td>" +
                        "                            <td  class='p-3 ' >" +
                        "                    <button type='button'  disabled class='btn-circle readPDF_skill border-0' style='background-color: #c3c3c3' id='btn_edit'>" +
                        "                                <img src='./images/iconos/ojo_1.svg' class='edit-1 '>" +
                        "                                </button>" +
                        "                            </td>" +
                        "                            <td  class='p-3 ' >" +
                        "                                <button type='button' _id='"+data.Experiencia[j].Id+"' class='btn-circle delete border-0' style='background-color: #ff4d4d' id='btn_read' >" +
                        "                                    <img src='./images/iconos/delete.svg' class='ojo-1'>" +
                        "                                </button>" +
                        "                            </td>" +
                        "                        </tr>");
                }


            }
            $("#splashLoading").hide();
        })
            .fail(function( jqXHR, textStatus, errorThrown) {

                console.log( jqXHR, textStatus, errorThrown)
            })
            .always(function(data , textStatus, jqXHR ) {
                // alert( "complete" );
                $("#preloader").hide();
                $("#preloader_txt").hide();

            });

            $('#modalShowAuditor').modal('show');

    }
    var boxSelext = function (){
        cargarSelectsEspecialidades()
        cargarSelectsSedes();
        cargarSelectsCursos();

        var apiKeyx = "r$3#23516ewew5";
        var servicio = '/api/Get-Rol-All?code=';
        var metodoHttp = "objectlist";
        var metodoAjax =  "GET";
        var param = "&Active=1";
        var url2 = apiurlAuditoria+servicio+GetRoleAuditor+"&httpmethod="+metodoHttp+param;

        var headers ={
            "apikey":apiKeyx
        }

        $.ajax({
            method: metodoAjax,
            url:  url2,
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function( data)
        {
            var $select2 = $('#sel_type_rol');
            var txt_role_played = $('#txt_role_played');
            var sel_role_skill = $('#sel_role_skill');

            data.map(function(item)
            {
                JSON_ROL.push(item);
                $select2.append(`<option description='${item.Description}' value='${item.Id}'>${item.Description}</option>`);
                txt_role_played.append(`<option description='${item.Description}' value='${item.Id}'>${item.Description}</option>`);
                sel_role_skill.append(`<option description='${item.Description}' value='${item.Id}'>${item.Description}</option>`);
            });
        })  .fail(function( jqXHR, textStatus, errorThrown) {

            console.log( jqXHR, textStatus, errorThrown)
        })
            .always(function(data , textStatus, jqXHR ) {
                // alert( "complete" );
            });




    }
    // INICIALIZAMOS LOS SELECT DE LAS NORMAS
    var cargarSelectsNormas = function(){
        var servicio = '/api/Get-Norma-All?code=';
        var metodoHttp = "objectlist";
        var metodoAjax =  "GET";
        var url = apiurlAuditoria+servicio+GetNormasAll+"&httpmethod="+metodoHttp;
        var headers ={
            "apikey":constantes.apiKey
        }

        $.ajax({
            method: metodoAjax,
            url:  url,
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function( data)
        {

            data.map(function(item)
            {
                $("#sel_rule_trainning").append(`<option descripcion="${item.Description}" value='${item.Id}'>${item.Description}</option>`);
                $("#sel_rule_audited").append(`<option descripcion="${item.Description}" value='${item.Id}'>${item.Description}</option>`);
                $("#sel_rule_skill").append(`<option descripcion="${item.Description}" value='${item.Id}'>${item.Description}</option>`);
                jsonNormas_AU.push(item);
            });

        }).fail(function( jqXHR, textStatus, errorThrown ) {
            //console.log("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
            //console.log(errorThrown)
            $("#sel_new_normas").hide();
        });
    }
// INICIALIZAMOS EL SELECT DE LAS SEDES
    var cargarSelectsSedes = function(){
        var servicio = '/api/Get-Sede-All?code=';
        var metodoHttp = "objectlist";
        var metodoAjax =  "GET";
        var url = apiurlAuditoria+servicio+GetSedesAll+"&httpmethod="+metodoHttp;
        var headers ={
            "apikey":constantes.apiKey
        }
        $.ajax({
            method: metodoAjax,
            url:  url,
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function( data)
        {

            data.map(function(item)
            {
                $("#SedeId_").append(`<option value='${item.Id}'>${item.Code}</option>`);
                jsonSedes.push(item);
            });

        }).fail(function( jqXHR, textStatus, errorThrown ) {
            //console.log(errorThrown)

        });
    }

    // INICIALIZAMOS EL SELECT DE LAS SEDES
    var cargarSelectsCursos = function(){
        var servicio = '/api/Get-Curso-Tipo-All?code=';
        var metodoHttp = "objectlist&Active=1";
        var metodoAjax =  "GET";
        var url = apiurlAuditoria+servicio+GetCursos+"&httpmethod="+metodoHttp;
        var headers ={
            "apikey":constantes.apiKey
        }
        $.ajax({
            method: metodoAjax,
            url:  url,
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function( data)
        {
            $("#sel_trainnig").html('')
            $("#sel_type").html('')
            $("#sel_trainnig").append(`<option value=''></option>`);
            $("#sel_type").append(`<option value=''></option>`);

            data.map(function(item)
            {

                if (item.Tipo=="curso"){

                    $("#sel_trainnig").append(`<option value='${item.Id}'>${item.Description}</option>`);

                }
                if (item.Tipo=="tipo"){
                    $("#sel_type").append(`<option value='${item.Id}'>${item.Description}</option>`);

                }
            });

        }).fail(function( jqXHR, textStatus, errorThrown ) {
            //console.log(errorThrown)

        });
    }
    // INICIALIZAMOS EL SELECT DE LAS SEDES
    var cargarSelectsEspecialidades = function(){
        var servicio = '/api/Get-Especialidad-All?code=';
        var metodoHttp = "objectlist";
        var metodoAjax =  "GET";
        var url = apiurlAuditoria+servicio+GetAllEspecialidades+"&httpmethod="+metodoHttp;
        var headers ={
            "apikey":constantes.apiKey
        }
        $.ajax({
            method: metodoAjax,
            url:  url,
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function( data)
        {
            $("#sel_EspecialidadId").html('')
            $("#EspecialidadId").html('')
            $("#sel_EspecialidadId").append(`<option value=''>Todas</option>`);
            $("#EspecialidadId").append(`<option value=''></option>`);

            data.map(function(item)
            {
                $("#sel_EspecialidadId").append(`<option value='${item.Id}'>${item.Description}</option>`);
                $("#EspecialidadId").append(`<option value='${item.Id}'>${item.Description}</option>`);
                jsonEspecialidades.push(item);
            });

        }).fail(function( jqXHR, textStatus, errorThrown ) {
            //console.log(errorThrown)

        });
    }
    var normasPorEspecialidades = function (id) {
        //Limpia los Select
        $("#sel_rule_trainning").html('');
        $("#sel_rule_audited").html('');
        $("#sel_rule_skill").html('');
//alert("id estoy cargando listado Norma = "+id);
        //Ingresa una opncion en blanco
        $("#sel_rule_trainning").append("<option value='' disabled selected>Seleccionar</option>");
        $("#sel_rule_audited").append("<option value='' disabled selected>Seleccionar</option>");
        $("#sel_rule_skill").append("<option value='' disabled selected>Seleccionar</option>");

        for(var i = 0; i < jsonNormas_AU.length; i += 1){
            if(jsonNormas_AU[i].EspecialidadId == id){
                $("#sel_rule_trainning").append(`<option descripcion="${jsonNormas_AU[i].Description}"  value='${jsonNormas_AU[i].Id}'>${jsonNormas_AU[i].Description}</option>`);
                $("#sel_rule_audited").append(`<option descripcion="${jsonNormas_AU[i].Description}" value='${jsonNormas_AU[i].Id}'>${jsonNormas_AU[i].Description}</option>`);
                $("#sel_rule_skill").append(`<option descripcion="${jsonNormas_AU[i].Description}" value='${jsonNormas_AU[i].Id}'>${jsonNormas_AU[i].Description}</option>`);

            }
        }

    }
    var comprobarObservador = function (norma,curso) {
        if (norma=="Curso de Auditor Interno" ){
            AuditorInterno.push(curso);
        }else{
            interpretacion.push(curso);
        }
        if (AuditorInterno.length > 0 & interpretacion.length > 0){
            for (var i = 0; i<= AuditorInterno.length; i++){
                for (var j = 0; j<= interpretacion.length; j++){
                    if (interpretacion[i]===AuditorInterno[j]){
                        Observador= true;
                    }else{

                    }

                }
            }
            return Observador;
        }

    }
    var asignarAuditor = function(id){
        //$('#lb_lider').css('font-size','5px')


       // alert(document.getElementById('lb_lider').style.fontSize);
       var stylee = '';
        if (screen.width <= 1150)
        {
            $('#lb_lider').removeClass('Titulo_Rol_Asignacion')
            $('#lb_lider').css('font-size','12px').css('font-weight','bold').css('color','black')
            $('#divCountAuditorLider').css('font-size','12px').css('font-weight','bold').css('color','black')

            $('#lb_auditor').removeClass('Titulo_Rol_Asignacion')
            $('#lb_auditor').css('font-size','12px').css('font-weight','bold').css('color','black')
            $('#divCountAuditor').css('font-size','12px').css('font-weight','bold').css('color','black')

            $('#lb_observador').removeClass('Titulo_Rol_Asignacion')
            $('#lb_observador').css('font-size','12px').css('font-weight','bold').css('color','black')
            $('#divCountObservador').css('font-size','12px').css('font-weight','bold').css('color','black')

            stylee = 'font-size: 8px;';
        }


        //stylee += "text-decoration: underline !important; color: #007bff !important;"

        //$("#sel_AuditorLider").html('');
        //$("#sel_Auditor").html('');
        $("#selectableAL").html('');
        $("#selectableAU").html('');
        $("#selectableOB").html('');
        $("#preloader4").show();
        $("#preloader_txt4").show();
        var cont_Ob = 0;
        var cont_Au = 0;
        var cont_Al = 0;

        id_auditoria = id;
        var ver = document.getElementById("btnVerAuditoria_"+id);
        codeAuditoria = ver.getAttribute("Code");
        var normas = ver.getAttribute("Code_Normas")
        var idespecialidad = ver.getAttribute("idespecialidad")
        var sedeid = ver.getAttribute("sedeid")
        $("#idAuditoria").val(id)
        // TITULO MODAL VER AUDITORIA
        $("#tituloModalAU").html("<b>Asignar Auditores - "+ver.getAttribute("nombreProgramaAuditoria")+" - Auditor&iacute;a "+ver.getAttribute("Code")+"</b>")
        // UNIDAD ORGANIZATIVA
        $("#divTextoUnidadOrganizativaAA").html(ver.getAttribute("DescriptionUnidadNegocio"))//*/
        // TIPO DE AUDITORIA
        $("#divTextoTipoAuditoriaAA").html(ver.getAttribute("DescriptionAuditoria"))
        // SEDE DONDE SE REALIZARA LA AUDITORIA
        $("#divTextoSedeAA").html(ver.getAttribute("DescriptionSede"))
        // CODIGO DE NORMAS
        $("#divTextoNormasAA").html(normas.replace(',',' / '))
        // FECHA INICIO DE LA AUDITORIA
        $("#divFechaInicioCA_AA").html(ver.getAttribute("Inicio"))
        // FECHA FIN DE LA AUDITORIA
        $("#divFechaFinCA_AA").html(ver.getAttribute("Fin"))

        var apiKeyx = "r$3#23516ewew5";
        var servicio = '/api/Get-Auditoria-Auditor-All?code=';
        var metodoHttp = "objectlist";

        var metodoAjax =  "GET";
        var url2 = apiurlAuditoria+servicio+GetAudiitoriaAuditor+"&httpmethod="+metodoHttp+"&Id="+id_auditoria+"&SedeId="+sedeid+"&EspecialidadId="+idespecialidad;
        console.log(url2)
        var headers ={
            "apikey":apiKeyx
        }

        $.ajax({
            method: metodoAjax,
            url:  url2,
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function( data)
        {
            console.log(data)

           for (i in data.Auditores)
           {
                //console.log("i: ",i)
                switch (data.Auditores[i].Tipo_Des) {
                    case 'Auditor Lider':
                        if (data.Auditores[i].Selected!=0){

                            $("#selectableAL").append(`<li name="${data.Auditores[i].Name}" val='${data.Auditores[i].Id}_${data.Auditores[i].Name}' class="ui-widget-content ui-selected fontZiseDinamico">
                            <div style="display: inline-flex; width: 70%; ${stylee}">${toCapitalize(data.Auditores[i].Name)}
                                <input type='hidden' value='${data.Auditores[i].Correo}' id='correo_${data.Auditores[i].Id}'>
                            </div>

                            <div style="display: inline; margin-left: auto;" >
                            <a href="#" style="${stylee} text-decoration: underline !important; color: #007bff !important;" onclick="vw_auditor_list.readAuditorAsignacion(${toCapitalize(data.Auditores[i].Id)});" >ver perfil</a></div>
                            <div class="icon" style="display: inline;margin-left: inherit;"><i class="fa fa-check" aria-hidden="true" style="color: green;"></i></div>
                            </li>`);
                            cont_Al = cont_Al + 1;

                        }
                        else
                        {

                            $("#selectableAL").append(`<li name="${data.Auditores[i].Name}" val='${data.Auditores[i].Id}_${data.Auditores[i].Name}' correo_${data.Auditores[i].Id}='${data.Auditores[i].Correo}' class="ui-widget-content fontZiseDinamico">
                            <div style="display: inline-flex; width: 70%; ${stylee}">
                                ${toCapitalize(data.Auditores[i].Name)}
                                <input type='hidden' value='${data.Auditores[i].Correo}' id='correo_${data.Auditores[i].Id}'>
                            </div>

                            <div style="display: inline; margin-left: auto;" >
                            <a href="#" style="${stylee} text-decoration: underline !important; color: #007bff !important;" onclick="vw_auditor_list.readAuditorAsignacion(${toCapitalize(data.Auditores[i].Id)});" >ver perfil</a></div>
                            <div class="icon" style="display: inline;margin-left: inherit;"></div>
                            </li>`);
                        }
                        break;
                    case 'Auditor':
                        if (data.Auditores[i].Selected!=0)
                        {

                           $("#selectableAU").append(`<li name="${data.Auditores[i].Name}" val='${data.Auditores[i].Id}_${data.Auditores[i].Name}' correo_${data.Auditores[i].Id}='${data.Auditores[i].Correo}' class="ui-widget-content ui-selected fontZiseDinamico">
                            <div style="display: inline-flex; width: 70%; ${stylee}">
                                ${toCapitalize(data.Auditores[i].Name)}
                                <input type='hidden' value='${data.Auditores[i].Correo}' id='correo_${data.Auditores[i].Id}'>
                            </div>

                            <div style="display: inline; margin-left: auto;" >
                            <a href="#" style="${stylee} text-decoration: underline !important; color: #007bff !important;" onclick="vw_auditor_list.readAuditorAsignacion(${toCapitalize(data.Auditores[i].Id)});" >ver perfil</a></div>
                            <div class="icon" style="display: inline;margin-left: inherit;"><i class="fa fa-check" aria-hidden="true" style="color: green;"></i></div>
                            </li>`);
                            cont_Au = cont_Au + 1;
                        }
                        else
                        {

                              $("#selectableAU").append(`<li name="${data.Auditores[i].Name}" val='${data.Auditores[i].Id}_${data.Auditores[i].Name}' correo_${data.Auditores[i].Id}='${data.Auditores[i].Correo}' class="ui-widget-content fontZiseDinamico">
                            <div style="display: inline-flex; width: 70%; ${stylee}">
                                ${toCapitalize(data.Auditores[i].Name)}
                                <input type='hidden' value='${data.Auditores[i].Correo}' id='correo_${data.Auditores[i].Id}'>
                            </div>

                            <div style="display: inline; margin-left: auto;" >
                            <a href="#" style="${stylee} text-decoration: underline !important; color: #007bff !important;" onclick="vw_auditor_list.readAuditorAsignacion(${toCapitalize(data.Auditores[i].Id)});" >ver perfil</a></div>
                            <div class="icon" style="display: inline;margin-left: inherit;"></div>
                            </li>`);
                        }
                        break;
                    case 'Observador':
                        if (data.Auditores[i].Selected!=0)
                        {
                           $("#selectableOB").append(`<li name="${data.Auditores[i].Name}" val='${data.Auditores[i].Id}_${data.Auditores[i].Name}' correo_${data.Auditores[i].Id}='${data.Auditores[i].Correo}' class="ui-widget-content ui-selected fontZiseDinamico">
                            <div style="display: inline-flex; width: 70%; ${stylee}">
                                ${toCapitalize(data.Auditores[i].Name)}
                                <input type='hidden' value='${data.Auditores[i].Correo}' id='correo_${data.Auditores[i].Id}'>
                            </div>

                            <div style="display: inline; margin-left: auto;" >
                            <a href="#" style="${stylee} text-decoration: underline !important; color: #007bff !important;" onclick="vw_auditor_list.readAuditorAsignacion(${toCapitalize(data.Auditores[i].Id)});" >ver perfil</a></div>
                            <div class="icon" style="display: inline;margin-left: inherit;"><i class="fa fa-check" aria-hidden="true" style="color: green;"></i></div>
                            </li>`);
                            cont_Ob = cont_Ob +1;
                        }
                        else
                        {
                              $("#selectableOB").append(`<li name="${data.Auditores[i].Name}" val='${data.Auditores[i].Id}_${data.Auditores[i].Name}' correo_${data.Auditores[i].Id}='${data.Auditores[i].Correo}' class="ui-widget-content fontZiseDinamico">
                            <div style="display: inline-flex; width: 70%; ${stylee}">
                                ${toCapitalize(data.Auditores[i].Name)}
                                <input type='hidden' value='${data.Auditores[i].Correo}' id='correo_${data.Auditores[i].Id}'>
                            </div>

                            <div style="display: inline; margin-left: auto;" >
                            <a href="#" style="${stylee} text-decoration: underline !important; color: #007bff !important;" onclick="vw_auditor_list.readAuditorAsignacion(${toCapitalize(data.Auditores[i].Id)});" >ver perfil</a></div>
                            <div class="icon" style="display: inline;margin-left: inherit;"></div>
                            </li>`);
                        }
                        break;
                }

            }



            $("#divCountAuditor").html(cont_Au)
            $("#divCountAuditorLider").html(cont_Al)
            $("#divCountObservador").html(cont_Ob)

            if( getCookie( "vtas_rolexternalrol" + sessionStorage.tabVisitasa ) == 'ROL_LIDERAUDITORIA')
            {
                $(".confirm2").attr("disabled",true)
            }
            else
            {
                $(".confirm2").attr("disabled",false)
            }

        })  .fail(function( jqXHR, textStatus, errorThrown) {

            console.log( jqXHR, textStatus, errorThrown)
        })
            .always(function(data , textStatus, jqXHR ) {

                // alert( "complete" );
                $("#preloader4").hide();
        $("#preloader_txt4").hide();
            });
        $("#asignarAuditorModal").modal("show").addClass("fade");
    }

    function confirmAsignarAuditor(AL_,AU_,OB_) {
        // OBTENER DATOS DE LA AUDITORIA
        $("#idAuditoria").val()
        let ver = document.getElementById("btnVerAuditoria_"+$("#idAuditoria").val());
        _body = [];
        var AuditoriaId = $("#idAuditoria").val();
        var Active = 1;
        var AL = $("#sel_AuditorLider").val();
        var OB = $("#sel_Observador").val();
        var AU = $("#sel_Auditor").val();

        // console.warn("probando -> ",AL)
        // console.warn("AL_ -> ",AL_)

        $('#divAuditorLiderName').html('')
        $('#divAuditorName').html('')
        $('#divAuditorObservadorName').html('')

        var Create_By = getCookie("vtas_id_hash" + sessionStorage.tabVisitasa);

        //console.log(AL_,AU_,OB_)
        var body = [];
        for (a in AL_)
        {
            piezaAL=AL_[a].split('_');
            $('#divAuditorLiderName').append("<p>"+toCapitalize(piezaAL[1])+"</p>")
            // OBTENEMOS EL CORREO
            let correo = ( $(`#correo_${piezaAL[0]}`).val() == null || parseInt($(`#correo_${piezaAL[0]}`).val()) == 0 || $(`#correo_${piezaAL[0]}`).val() == ""   ) ? "" : $(`#correo_${piezaAL[0]}`).val()
            body.push({
                'ProgramaAuditoria': ver.getAttribute("nombreProgramaAuditoria"),
                'AuditoriaCode': ver.getAttribute("Code"),
                'UnidadNegocio': ver.getAttribute("DescriptionUnidadNegocio"),
                'Sede': ver.getAttribute("DescriptionSede"),
                'TipoAuditoria': ver.getAttribute("DescriptionAuditoria"),
                'Normas': ver.getAttribute("Code_Normas"),
                'Inicio': ver.getAttribute("Inicio"),
                'Fin': ver.getAttribute("Fin"),
                'AuditoriaId': AuditoriaId,
                'AuditorId': piezaAL[0],
                'Tipo': 1,
                'Correo': correo,
                'Name': toCapitalize(piezaAL[1]),
                'Active': Active,
                'Create_By': Create_By,
                "User":      getCookie("vtas_fullname"+sessionStorage.tabVisitasa),
                "Job":       getCookie("vtas_job"+sessionStorage.tabVisitasa),
                "Email":     getCookie("vtas_internal_useruser"+sessionStorage.tabVisitasa)
            })
        }
        for (u in AU_)
        {
            piezaAU=AU_[u].split('_');
            $('#divAuditorName').append("<p>"+toCapitalize(piezaAU[1])+"</p>")
            // OBTENEMOS EL CORREO
            let correo = ( $(`#correo_${piezaAU[0]}`).val() == null || parseInt($(`#correo_${piezaAU[0]}`).val()) == 0 || $(`#correo_${piezaAU[0]}`).val() == ""   ) ? "" : $(`#correo_${piezaAU[0]}`).val()
            body.push({
                'ProgramaAuditoria': ver.getAttribute("nombreProgramaAuditoria"),
                'AuditoriaCode': ver.getAttribute("Code"),
                'UnidadNegocio': ver.getAttribute("DescriptionUnidadNegocio"),
                'Sede': ver.getAttribute("DescriptionSede"),
                'TipoAuditoria': ver.getAttribute("DescriptionAuditoria"),
                'Normas': ver.getAttribute("Code_Normas"),
                'Inicio': ver.getAttribute("Inicio"),
                'Fin': ver.getAttribute("Fin"),
                'AuditoriaId': AuditoriaId,
                'AuditorId': piezaAU[0],
                'Tipo': 2,
                'Correo': correo,
                'Name': toCapitalize(piezaAU[1]),
                'Active': Active,
                'Create_By': Create_By,
                "User":      getCookie("vtas_fullname"+sessionStorage.tabVisitasa),
                "Job":       getCookie("vtas_job"+sessionStorage.tabVisitasa),
                "Email":     getCookie("vtas_internal_useruser"+sessionStorage.tabVisitasa)
            })
        }
        for (o in OB_)
        {
            var piezaOB= OB_[o].split('_');
            $('#divAuditorObservadorName').append("<p>"+toCapitalize(piezaOB[1])+"</p>")
            // OBTENEMOS EL CORREO
            let correo = ( $(`#correo_${piezaOB[0]}`).val() == null || parseInt($(`#correo_${piezaOB[0]}`).val()) == 0 || $(`#correo_${piezaOB[0]}`).val() == ""   ) ? "" : $(`#correo_${piezaOB[0]}`).val()
            body.push({
                'ProgramaAuditoria': ver.getAttribute("nombreProgramaAuditoria"),
                'AuditoriaCode': ver.getAttribute("Code"),
                'UnidadNegocio': ver.getAttribute("DescriptionUnidadNegocio"),
                'Sede': ver.getAttribute("DescriptionSede"),
                'TipoAuditoria': ver.getAttribute("DescriptionAuditoria"),
                'Normas': ver.getAttribute("Code_Normas"),
                'Inicio': ver.getAttribute("Inicio"),
                'Fin': ver.getAttribute("Fin"),
                'AuditoriaId': AuditoriaId,
                'AuditorId': piezaOB[0],
                'Tipo': 3,
                'Correo': correo,
                'Name': toCapitalize(piezaOB[1]),
                'Active': Active,
                'Create_By': Create_By,
                "User":      getCookie("vtas_fullname"+sessionStorage.tabVisitasa),
                "Job":       getCookie("vtas_job"+sessionStorage.tabVisitasa),
                "Email":     getCookie("vtas_internal_useruser"+sessionStorage.tabVisitasa)
            })
        }
        _body = body;
        console.warn("_body",_body)
        $('#value_body').val(body)
        $("#asignarAuditorModal").removeClass("fade").modal("hide");
        $("#modalConfirmarAuditor2_2").modal("show").addClass("fade");

    }

    function sendAsignarAuditor() {
        $('#modalConfirmarAuditor2_2').modal('hide');
        $("#splashLoading").show();

        console.log("_body -> ",_body)

        var AuditoriaId = $("#idAuditoria").val();
        var Active = 1;
        var AL = $("#sel_AuditorLider").val();
        var OB = $("#sel_Observador").val();
        var AU = $("#sel_Auditor").val();

        var Create_By = getCookie("vtas_id_hash" + sessionStorage.tabVisitasa);

        var body = [];
        for (a in AL) {
            piezaAL=AL[a].split('_');
            body.push({
                'AuditoriaId': AuditoriaId,
                'AuditorId': piezaAL[0],
                'Tipo': 1,
                'Active': Active,
                'Create_By': Create_By
            })
        }
        for (u in AU) {
            piezaAU=AU[u].split('_');
            body.push({
                'AuditoriaId': AuditoriaId,
                'AuditorId': piezaAU[0],
                'Tipo': 2,
                'Active': Active,
                'Create_By': Create_By
            })
        }
        for (o in OB) {
            var piezaOB= OB[o].split('_');
            body.push({
                'AuditoriaId': AuditoriaId,
                'AuditorId': piezaOB[0],
                'Tipo': 3,
                'Active': Active,
                'Create_By': Create_By
            })
        }
        //  $("#asignarAuditorModal").removeClass("fade").modal("hide");
        //  $("#modalShowAuditoresSelected").modal("show").addClass("fade");

        var metodo="&httpmethod=post";
        var servicio   = "/api/Post-Auditoria-Auditor-All?code=";
        var url = apiurlAuditoria+servicio+PostAuditoriaAuditorAll+metodo;
        var headers ={
            "apikey":constantes.apiKey
        }
        $.ajax({
            method: "POST",
            url:  url,
            data: JSON.stringify(_body),
            headers:headers,
            crossDomain: true,
            dataType: "json",
        })
            .done(function(data)
            {
                console.log(data)
                if(Array.isArray(data)){
                    console.log(data)

                   //cambiarStatusAuditoria(AuditoriaId)
                    $("#asignarAuditorModal").removeClass("fade").modal("hide");
                    $("#modalShowAsignacionAlertOk").modal("show").addClass("fade");
                    $("#splashLoading").fadeOut();

                }else{
                    console.log("Por favor Verifique los datos ingresados, su conexión a internet y vuelva a intentarlo.")
                    $("#splashLoading").fadeOut();

                }
            })
            .fail(function( jqXHR, textStatus, errorThrown ) {
                console.log("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
                //console.log(errorThrown)
                $("#splashLoading").fadeOut();

            })
            .always(function( jqXHR, textStatus, errorThrown ) {
                vw_auditorias_list.filtroTablaDivsAuditorias()
            });//*/
    }

    function sortByProperty(property){
        return function(a,b){
            if(a[property] > b[property])
                return 1;
            else if(a[property] < b[property])
                return -1;

            return 0;
        }
    }

    function openNewTab_T(ref)
    {
        $("#preloader").show();
        $("#preloader_txt").show();
        if (ref!="" || ref != null || ref != undefined){
            //  window.open("data:application/octet-stream;charset=utf-16le;base64," + ref, "_blank","toolbar=1, scrollbars=1, resizable=1, width=" + 1015 + ", height=" + 800);
            var settings = {
                "url": apiurlAuditoria+"/api/Get-Auditor-PDF?code=beiJVYAeqzVY6U1fG78LflEMZt1IgI9ldBGUOlRBSD0oThoxXf8VvA==&httpmethod=objectlist&Id="+ref+"&Tipo=C",
                "method": "GET",
                "timeout": 0,
                "crossDomain": true,
                "dataType": "json",
                "headers": {
                    "apikey": "r$3#23516ewew5",
                    "Content-Type": "application/json",
                    //"Cookie": "ARRAffinity=cbcbb28fd2b5571d2e51eda0a038519f40946633598d1de8dd8a535c13a84dea"
                },
            };

            // HACEMOS LA SOLICUTID DE LOS DATOS AL SERVIDOR
            $.ajax(settings).done(function (response) {
                //RECORREMOS LA RESPUESTA
                //console.error(response)
                //console.error(response.Adjunto)
                $("#preloader").hide();
                $("#preloader_txt").hide();
                if(response.Adjunto!="" && response.Adjunto != null && response.Adjunto != undefined)
                {
                    console.log("mostrar pdf")
                    var x = response.Adjunto.split(',');
                    console.log(x[1])
                    let pdfWindow = window.open("")
                    pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(x[1]) + "'></iframe>")
                }else{
                    swal("Error","Este Registro no contiene de archivos","error")
                }
            });

        }else{
            swal("Error","Este Registro no contiene de archivos","error")
     $("#preloader").hide();
                $("#preloader_txt").hide();
        }

    }
    function openNewTab_S(ref){
        $("#preloader").show();
        $("#preloader_txt").show();
        if (ref!="" || ref != null || ref != undefined){
             var settings = {
                "url": apiurlAuditoria+"/api/Get-Auditor-PDF?code=beiJVYAeqzVY6U1fG78LflEMZt1IgI9ldBGUOlRBSD0oThoxXf8VvA==&httpmethod=objectlist&Id="+ref+"&Tipo=E",
                "method": "GET",
                "timeout": 0,
                "crossDomain": true,
                "dataType": "json",
                "headers": {
                    "apikey": "r$3#23516ewew5",
                    "Content-Type": "application/json",
                    //"Cookie": "ARRAffinity=cbcbb28fd2b5571d2e51eda0a038519f40946633598d1de8dd8a535c13a84dea"
                },
            };

            // HACEMOS LA SOLICUTID DE LOS DATOS AL SERVIDOR
            $.ajax(settings).done(function (response) {
                 $("#preloader").hide();
                $("#preloader_txt").hide();
                //RECORREMOS LA RESPUESTA
                //console.error(response)
                //console.error(response.Adjunto)
                if(response.Adjunto!="" && response.Adjunto != null && response.Adjunto != undefined)
                {
                    console.log("mostrar pdf")
                    var x = response.Adjunto.split(',');
                    console.log(x[1])
                    let pdfWindow = window.open("")
                    pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(x[1]) + "'></iframe>")
                }else{
                    swal("Error","Este Registro no contiene de archivos","error")
                }
            });
        }else{
            swal("Error","Este Registro no contiene de archivos","error")
            $("#preloader").hide();
            $("#preloader_txt").hide();
        }

    }

    var searchAuditor = function () {
        var Name="";
        var Rol_Code="";
        var Especialidad="";

        var param ="";
        if ($('#tx_name_auditor').val()!=""){
            Name = $('#tx_name_auditor').val();
            param += "&Name="+Name;

        }
        if ($('#sel_type_rol').val()!="" ){
            // var selT = document.getElementById('sel_type_rol');
            // var selectedT = selT.options[selT.selectedIndex];
            // Rol_Code = selectedT.getAttribute('description');
            // param += "&Rol_Code="+Rol_Code;

            Rol_Code = $('#sel_type_rol').val();
            param += "&Tipo="+Rol_Code;
        }
        if ($('#sel_Status').val()!="" ){
            Especialidad= $('#sel_Status').val();
            param += "&Active="+Especialidad;
        }
        var body = {
            Name,
            Rol_Code
        }
        console.log(param)

        $('#body-tabla-list').html('')
        $("#cantidad").html('');

        var apiKeyx = "r$3#23516ewew5";
        var servicio = '/api/Get-Auditor-All?code=';
        var metodoHttp = "objectlist";
        var metodoAjax =  "GET";
        var url2 = apiurlAuditoria+servicio+GetAuditors+"&httpmethod="+metodoHttp+param;
        var headers ={
            "apikey":apiKeyx
        }
        $("#splashLoading").show();

        $.ajax({
            method: metodoAjax,
            url:  url2,
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function( response)
        {
            arrayAuditorres = response
            $('#pagination-container').pagination({
                dataSource: response,
                pageSize: 5,
                callback: function(response, pagination) {
                    var html = TemplateListAuditores(response);
                    $('#body-tabla-list').html(html);
                }
            })
            $('.body-tabla').addClass('hidden')
            $('#cantidad').text(response.length)


            /*    JSON_datosAU=data;
                JSON_datosAU.sort(sortByProperty('Id')); //sort according to id
                $('.body-tabla').hide()
                if(Object.keys(data).length<1){
                    $("#cantidad").html("<b>0</b>");

                }else{
                    $("#cantidad").html("<b>"+Object.keys(data).length+"</b>");
                }

                $("#cantidad").html("<b>"+Object.keys(data).length+"</b>");
                data.map(function (datos) {
                    cont_auditor= cont_auditor + 1;

                    if (datos.Active == 1){
                        var estatus = "Activo";
                    }else{
                        var estatus = "Inactivo";
                    }
                    $('#body-tabla-list').append(`<div class="tr_auditorList item-tabla py-3 px-2" style="font-size: 14px">
                <div class="row m-0 justify-content-between align-items-center">
                    <div class="col-md-2">${datos.Name}</div>
                    <div class="col-md-2">${datos.Rol_Code}</div>
                    <div class="col-md-2">${Object.keys(datos.Capacitaciones).length}</div>
                    <div class="col-md-2">${Object.keys(datos.Experiencia).length}</div>
                    <div class="col-md-2">${estatus}</div>
                    <div class="col-1 text-center">
                        <button type='button' _id='${datos.Id}'  class='btn-circle ' onclick='vw_auditor_list.AuditorDetalle(${datos.Id});' style='background-color: #58c25d' id='btn_edit'>
                            <img src="./images/iconos/edit_1.svg" alt="" class="edit-1">
                        </button>
                    </div>
                    <div class="col-1 text-center">
                        <button type='button' _id='${datos.Id}' class='btn-circle btn_read' style='background-color: #373e68' id='btn_read' onclick='vw_auditor_list.readAuditor(${datos.Id})' >
                            <img src='./images/iconos/ojo_1.svg' class='ojo-1'>
                        </button>
                    </div>

                </div>
            </div>`)


                    if (Object.keys(data).length == cont_auditor){
                        //start_paginate();
                        $('#tbody_auditor').addClass('tbody_auditor');
                    }
                })*/

        })  .fail(function( jqXHR, textStatus, errorThrown) {

            console.log( jqXHR, textStatus, errorThrown)
        })
        .always(function(data , textStatus, jqXHR ) {
            // alert( "complete" );
            // console.table(arrayAuditorres)
            $("#splashLoading").fadeOut();
        });


    }
    var deleteSkill=function(id){

        var apiKeyx = "r$3#23516ewew5";
        var servicio = '/api/Post-Experiencia-All?code=';
        var metodoHttp = "delete&Id=";
        var metodoAjax =  "post";
        var url2 = apiurlAuditoria+servicio+DeleteSkill+"&httpmethod="+metodoHttp+id;
        var headers ={
            "apikey":apiKeyx
        }

        $.ajax({
            method: metodoAjax,
            url:  url2,
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function( data)
        {
            console.log(data)
            vw_auditor_list.searchAuditor();
            return data;

        }).fail(function( jqXHR, textStatus, errorThrown) {

            console.log( jqXHR, textStatus, errorThrown)
        })
    }
    var deleteTrainning=function(id){
        Bool_DeleteT = false;

        var apiKeyx = "r$3#23516ewew5";
        var servicio = '/api/Post-Capacitacion-All?code=';
        var metodoHttp = "delete&Id=";
        var metodoAjax =  "post";
        var url2 = apiurlAuditoria+servicio+DeleteTrainning+"&httpmethod="+metodoHttp+id;
        var headers ={
            "apikey":apiKeyx
        }

        $.ajax({
            method: metodoAjax,
            url:  url2,
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function( data)
        {
            console.log(data)
            if (data==1)
            { console.log(data)
                Bool_DeleteT = true;
                vw_auditor_list.searchAuditor();

            }

        }).fail(function( jqXHR, textStatus, errorThrown) {

            console.log( jqXHR, textStatus, errorThrown)
        })
    }

    var cambiarStatusAuditoria = function (id) {
        var body = {
            "Id":id,
            "StatusId":2
        }
        var metodo="&httpmethod=put&Id="+id;
        var servicio   = "/api/Post-Auditor-All?code=";
        var url = apiurlAuditoria+servicio+PostAuditoriaAll+metodo;
        var headers ={
            "apikey":constantes.apiKey
        }

        $.ajax({
            url:  url,
            dataType: "json",
            method:"post",
            data : JSON.stringify(body),
            processData:false,
            crossDomain: true,
            async: true,
            headers : headers,
        })
            .done(function(data)
            {
                $("#asignarAuditorModal").removeClass("fade").modal("hide");
                $("#modalShowAsignacionAlertOk").modal("show").addClass("fade");

            })
            .fail(function( jqXHR, textStatus, errorThrown ) {
                console.log("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
                console.log(jqXHR)
                console.log( textStatus)
                //console.log(errorThrown)
                $("#splashLoading").fadeOut();
                swal("Error","Verifique su conexion a internet y vuelva a intentarlo","error")

            });

    }


//----------------------------------------   andy 12-05-21 ------------------------------------------



var validaRol = function (Rol){
//alert(Rol);
var id =  $("#hid_Name_id_"+1).val();
var Name =  $("#Name_"+1).val();
validaAuditor(id, Name, Rol);
}




 var validaAuditor = function (id, Name, Rol){

        if($('#idAuditor').val()!="")
          {//---------------------------------------------editar registro----------------------------------------
            //alert("que estas haciendo men = "+istAudd+",              Name= "+Name+",              Rol= "+Rol+",              Id= "+id);
             var esAuditor = 0;
             var esLider = 0;
             var esObservador = 0;
             var iid = 0;
             var msj = '';
                         aObj.forEach((Item)=>{
                                                if((id == Item.a.UserIdhash)&&(Name == Item.a.Name))
                                                {
                                                    console.log(Item.a.UserIdhash,") ++++++++++ existe este señor = ", Item.a.Name, ". con rol =", Item.a.Rol_Code);

                                                     if(Item.a.Rol_Code == 'Auditor'){esAuditor = 1;}
                                                     if(Item.a.Rol_Code == 'Auditor Lider'){esLider = 1;}
                                                     if(Item.a.Rol_Code == 'Observador'){esObservador = 1; }
                                                     //idd = Item.a.Id;

                                                }

                                            });


                           if(esAuditor == 1){msj = msj +''+'<b>Auditor</b>'}
                           if(esLider == 1){msj = msj +', '+'<b>Auditor Lider</b>'}
                           if(esObservador == 1){msj = msj +','+'<b>Observador</b>'}



                         if((esAuditor == 1)&&(esLider == 1)&&(Rol == 'Observador'))
                             {
                               verModalError(Name+"","No puede ser Observador, ya esta registrado como "+msj);
                                $('input[name=Rol_Code][value="'+istRol+'"]').prop("checked", true);

                             }

                        if((esAuditor == 1)&&(Rol == 'Auditor'))
                         {
                            verModalError(Name+"","Ya esta registrado como "+msj);
                             $('input[name=Rol_Code][value="'+istRol+'"]').prop("checked", true);
                         }

                         if((esLider == 1)&&(Rol == 'Auditor Lider'))
                         {
                            verModalError(Name+"","Ya esta registrado como "+msj);
                             $('input[name=Rol_Code][value="'+istRol+'"]').prop("checked", true);
                         }


          }//---------------------------------------------editar registro----------------------------------------
          else
          {//---------------------------------------------nuevo registro----------------------------------------

        var esAuditor = 0;
        var esLider = 0;
        var esObservador = 0;
        var msj = '';


        aObj.forEach((Item)=>{


            if((id == Item.a.UserIdhash)||(Name == Item.a.Name))
            {
                console.log(Item.a.UserIdhash,") existe este coño = ", Item.a.Name, ". con rol =", Item.a.Rol_Code);

                 if(Item.a.Rol_Code == 'Auditor'){esAuditor = 1;}
                 if(Item.a.Rol_Code == 'Auditor Lider'){esLider = 1;}
                 if(Item.a.Rol_Code == 'Observador'){esObservador = 1; }

            }

        });
                 if(esAuditor == 1){msj = msj +''+'<b>Auditor</b>'}
                 if(esLider == 1){msj = msj +', '+'<b>Auditor Lider</b>'}
                 if(esObservador == 1){msj = msj +','+'<b>Observador</b>'}

                 console.log('Auditor =',esAuditor)
                 console.log('Auditor Lider=',esLider)
                 console.log('Observador=',esObservador)

                 if((esAuditor == 1)&&(esLider == 1))
                 {

                     verModalError(Name+""," ya esta registrado como "+msj);
                     $("#Name_"+1).val('');
                     $("#hid_Name_id_"+1).val('');
                     $("#Cargo_"+1).val('');
                     $("#hid_Cargo_"+1).val('');
                     $("#hid_Correo_"+1).val('');
                    return -1;
                 }

                   if(esObservador == 1)
                 {
                    verModalError(Name+"","Ya esta registrado como "+msj);
                     $("#Name_"+1).val('');
                     $("#hid_Name_id_"+1).val('');
                     $("#Cargo_"+1).val('');
                     $("#hid_Cargo_"+1).val('');
                     $("#hid_Correo_"+1).val('');
                    return -1;
                 }

                 if((esAuditor == 1)&&(Rol == 'Auditor'))
                 {
                    verModalError(Name+"","**Ya esta registrado como "+msj);

                     $("#Name_"+1).val('');
                     $("#hid_Name_id_"+1).val('');
                     $("#Cargo_"+1).val('');
                     $("#hid_Cargo_"+1).val('');
                     $("#hid_Correo_"+1).val('');
                    return -1;
                 }

                 if((esLider == 1)&&(Rol == 'Auditor Lider'))
                 {
                    verModalError(Name+"","Ya esta registrado como "+msj);
                     $("#Name_"+1).val('');
                     $("#hid_Name_id_"+1).val('');
                     $("#Cargo_"+1).val('');
                     $("#hid_Cargo_"+1).val('');
                     $("#hid_Correo_"+1).val('');
                    return -1;
                 }



                 if((Rol == 'Observador')&&((esAuditor == 1)||(esLider == 1))&&(id != ""))
                 {
                     verModalError(Name+"","No puede ser Observador, ya esta registrado como "+msj);
                     $("#Name_"+1).val('');
                     $("#hid_Name_id_"+1).val('');
                     $("#Cargo_"+1).val('');
                     $("#hid_Cargo_"+1).val('');
                     $("#hid_Correo_"+1).val('');
                      return -1;
                 }

                  if(((Rol == 'Auditor')||(Rol == 'Auditor Lider'))&&(esObservador == 1))
                 {
                     verModalError(Name+"","No puede tener este Rol, ya esta registrado como Observador");
                     $("#Name_"+1).val('');
                     $("#hid_Name_id_"+1).val('');
                     $("#Cargo_"+1).val('');
                     $("#hid_Cargo_"+1).val('');
                     $("#hid_Correo_"+1).val('');
                      return -1;
                 }

          }//---------------------------------------------nuevo registro----------------------------------------




         // alert("vamos   validar a = "+id);
          //alert("vamos   validar a = "+Name);
         // alert("vamos   validar a = "+Rol);
       //1 vamos a ver si esta en el listado este auditor
       //2 si esta como esta
       //si es lider solo puede ser definido como auditor
       //si es auditor solo como lider
       //si esta en ambos ya no se puede registrar

       //solo como observador si no esta ni como lider ni como auditor




 }//----------------------------------------   andy 12-05-21 ------------------------------------------






    /**
     * [downloadExcel descargaremos un excel con el listado de auditores]
     * @return {[type]} [description]
     */
    var downloadExcel = function()
    {
        // estado del auditor (Activo o Inactivo)
        let estado         = ""
        // cantidad de capacitaciones del auditor
        let capacitaciones = 0
        // cantidad de experiencias del auditor
        let experiencias   = 0
        // console.table(arrayAuditorres)
        let excel = `
            <table border="1" style="color: #000;">
                <thead>
                    <tr>
                        <th bgcolor="#B2B2B2">NOMBRE</th>
                        <th bgcolor="#B2B2B2">CARGO</th>
                        <th bgcolor="#B2B2B2">SISTEMA</th>
                        <th bgcolor="#B2B2B2">SEDE</th>
                        <th bgcolor="#B2B2B2">ROL</th>
                        <th bgcolor="#B2B2B2">ESTADO</th>
                        <th bgcolor="#B2B2B2">CAPACITACIONES</th>
                        <th bgcolor="#B2B2B2">EXPERIENCIAS</th>
                    </tr>
                <thead>
                <tbody id="ListadoDeAuditores">
        `

        // RECORREMOS EL ARRAY CON LOS CHECKLIST
        arrayAuditorres.forEach(function(Item)
        {
            // verificamos el estado del auditor
            estado         = ( Item.Active == 1 ) ? "Activo" : "Inactivo"
            // obtenemos la cantidad de capacitaciones del auditor
            capacitaciones = Item.Capacitaciones.length
            // obtenemos la cantidad de experiencias del auditor
            experiencias = Item.Experiencia.length

            // agregamos una fila
            excel += `
                <tr bgcolor="#fff">
                    <td text-aling="center">${Item.Name}</td>
                    <td text-aling="center">${Item.Cargo}</td>
                    <td text-aling="center">${Item.DescriptionEspecialidad}</td>
                    <td text-aling="center">${Item.CodeEspecialidad}</td>
                    <td text-aling="center">${Item.Rol_Code}</td>
                    <td text-aling="center">${estado}</td>
                    <td text-aling="center">${capacitaciones}</td>
                    <td text-aling="center">${experiencias}</td>
                </tr>
            `
        })

        excel += `</tbody></table>`
        // console.warn("excel->",excel)

        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
        {
            txtArea1.document.open("txt/html","replace");
            txtArea1.document.write(excel);
            txtArea1.document.close();
            txtArea1.focus();
            sa=txtArea1.document.execCommand("SaveAs",true,"Say Thanks to Sumit.xls");
        }
        else                 //other browser not tested on IE 11
        {
            var link = document.getElementById('ListadoDeAuditores');
            link.href='data:application/vnd.ms-excel;base64,' + window.btoa(excel);
            link.download='Listado De Auditores';
            link.click();
            //sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(excel));
        }

    }

    return{
        init:function(){
            boxSelext();

            AuditorsList();

            $("#txt_date_start").datetimepicker({
                timepicker:false,
                format:'d/m/Y',
            });
            $("#txt_date_end").datetimepicker({
                timepicker:false,
                format:'d/m/Y',
                onShow:function( ct ){
                    this.setOptions({
                    minDate:moment($('#txt_date_start').val(),'DD/MM/YYYY').format("YYYY-MM-DD")?moment($('#txt_date_start').val(),'DD/MM/YYYY').format("YYYY-MM-DD"):false
                   })
                  }
            });

            $("#txt_date_start_skill").datetimepicker({
                timepicker:false,
                format:'d/m/Y',
            });
            $("#txt_date_end_skill").datetimepicker({
                timepicker:false,
                format:'d/m/Y',
                onShow:function( ct ){
                    this.setOptions({
                    minDate:moment($('#txt_date_start_skill').val(),'DD/MM/YYYY').format("YYYY-MM-DD")?moment($('#txt_date_start_skill').val(),'DD/MM/YYYY').format("YYYY-MM-DD"):false
                   })
                  }
            });


        }, validaRol:function(rol){
            validaRol(rol);


        }, cancelformAuditor:function(){
            cancelformAuditor();
        }, deleteSkill:function (id) {
            deleteSkill(id)
        }, deleteTrainning:function (id){
            deleteTrainning(id);
        },
        cancelconfirmform:function(){
            cancelConfirmformAuditor()
        },
        readAuditor:function (id) {
            readAuditor(id);
        },
        readAuditorAsignacion:function (id) {
            readAuditorAsignacion(id);
        },
        AuditorsList:function(){
            AuditorsList();
        },
        normasPorEspecialidades:function (id) {
            normasPorEspecialidades(id);
        },
        comprobarObservador:function (tipo,curso) {
            return   comprobarObservador(tipo,curso);
        }, asignarauditor: function (id) {
            asignarAuditor(id);
        }, AuditorDetalle: function (id,UserIdhashx) {
            AuditorDetalle(id, UserIdhashx)
        },
        newAuditor: function () {
            newAuditor();
        },
        getPerson: function (obj,i) {
            getPerson(obj,i)
        },
        EnviarForm: function () {
            EnviarForm();
        },
        searchAuditor : function (){
            searchAuditor();
        },
        sendAsignarAuditor : function () {
            sendAsignarAuditor()
        },
        boxSelext : function () {
            boxSelext();
        },
        confirmAsignarAuditor : function (AL_,AU_,OB_) {
            confirmAsignarAuditor(AL_,AU_,OB_);
        },
        openNewTab_T : function (ref) {
            openNewTab_T(ref);
        },
        openNewTab_S : function (ref) {
            openNewTab_S(ref);
        },
        downloadExcel : function () {
            downloadExcel();
        },




    }
}();
