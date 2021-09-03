var jsonExternalCompany =[];
var positionAddCompany = "";
var myDropzone;
var vw_external_acces_request = function(){
    var init = function(){
        $("#sel_location").change(function(){
            var val = $(this).val();
            //getAreas(val);
        });
        $("#tx_date_start").datetimepicker({
            format: 'DD/MM/YYYY',
            locale: 'es'
        });
        $("#tx_time_start").datetimepicker({
            datepicker:false,
            format:'H:i',
            formatTime:'H:i',
            step:30
        });
        $("#tx_time_end").datetimepicker({
            datepicker:false,
            format:'H:i',
            formatTime:'H:i',
            step:30
        });

        $("#bt_register_visita").click(function(){
            confirmRegister();
        });
        $('#tx_business_provider_flag').bootstrapToggle();
        $('#tx_business_client_flag').bootstrapToggle();       
        
        $("#sel_request_type").change(function(){
            var form        = $(this).find(':selected').attr('data-form');
            var val         = $(this).val();
            var idContent   = "body_form_request_register";
            var url         = 'form/'+form+'.html';
            var id          = 'formAccessRequestRegister';
            if(form == "form_activity_02")//
            {
                id = 'formAccessRequestRegisterAct2';
            }
            if(form == "form_activity_03"){
                id = 'formAccessRequestRegisterAct3';
            }
            handlerUrlhtml(idContent,url,id);
            //cargamnos el formulario
            //$('body').bootstrapMaterialDesign();
            $('body').bootstrapMaterialDesign({});
        });
        
    }

  var initEditCompany = function(){
    var search_type = '1';
    var httpmethod = 'object';
    var company = getCookie('vtas_external_company_id'+sessionStorage.tabVisitasa);
    var url = 'https://s3cur17y7454-prd-access-security.azurewebsites.net/api/Get-ExternalCompany-All?code="+GetExternalCompanyAll+"&search_type='+search_type+'&httpmethod='+httpmethod+'&id='+company;
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
            $("#tx_ruc").val(data.ruc);
            $("#tx_name").val(data.name);
            $("#tx_business_name").val(data.business_name);
            $("#tx_business_sector").val(data.business_sector);
            $("#tx_business_pais").val(data.country);
            $("#tx_business_ciudad").val(data.city);
            $("#tx_business_street").val(data.street_address);
            $("#tx_business_site_web").val(data.website);
            $("#sel_external_company_type").val(data.attribute1);
            $("#tx_business_dni").val(data.identity_document);
            $("#tx_business_nombre").val(data.firstname);
            $("#tx_business_apelllido").val(data.lastname);
            $("#tx_user_responsable").val(data.username);
            $("#tx_business_mobile").val(data.mobile);
            $("#tx_business_email").val(data.email);
            console.log(data);

        });
        $("#bt_update_external_company").click(function(){         
            validateUpdateExternalCompany();
        });
        
  }

    var validateUpdateExternalCompany = function(){

      
        var ruc                     = $("#tx_ruc").val();
        var name                    = $("#tx_name").val();
        var business_name           = $("#tx_business_name").val();
        var userResponsable         = $("#tx_user_responsable").val();

        var messengerError = "";
        if(ruc.trim().length==0){
            messengerError ="Debes ingresar el RUC";
        }
        else if(name.trim().length==0){
            messengerError ="Debes ingresar el nombre";
        }
        else if(business_name.trim().length==0){
            messengerError ="Debes ingresar el nombre comercial";
        }
        else if(userResponsable.trim().length==0){
            messengerError ="Debes ingresar el usuario responsable";
        }

        if(messengerError)
            swal("Error", messengerError, "error");
        else{
            swal({
                title: "Actualización Datos de Empresa",
                text: "¿Desea actualizar los datos de la empresa.",
                type: "info",
                showCancelButton: true,
                confirmButtonClass: "btn-danger btn-sm",
                confirmButtonText: "Si",
                cancelButtonText: "No",
                closeOnConfirm: true
              },function(){
                updateExternalCompany();
            });
        }            
    }

  var updateExternalCompany = function(){

    swal.close();
    setTimeout(function()
    {
        swal({
            title: "Procesando...",
            text: "Por favor espere.",
            //timer: 3000,
            type: "info",
            showConfirmButton: false
            });

    },500)
        var company = getCookie('vtas_external_company_id'+sessionStorage.tabVisitasa);

        var ruc                     = $("#tx_ruc").val();
        var name                    = $("#tx_name").val();
        var business_name           = $("#tx_business_name").val();
        var business_sector         = $("#tx_business_sector").val();
        var business_pais           = $("#tx_business_pais").val();
        var business_ciudad         = $("#tx_business_ciudad").val();
        var business_street         = $("#tx_business_street").val();
        var business_mobile         = $("#tx_business_mobile").val();
        var business_email          = $("#tx_business_email").val();
        var business_site_web       = $("#tx_business_site_web").val();
        var business_client_flag    = $("#tx_business_client_flag").prop( "checked")?1:0;
        var business_provider_flag  = $("#tx_business_provider_flag").prop("checked")?1:0;
        var type                    = $("#sel_external_company_type").val();
        var tx_business_dni         = $("#tx_business_dni").val();
        var tx_business_nombre      = $("#tx_business_nombre").val();
        var tx_business_apelllido   = $("#tx_business_apelllido").val();
        //datos para el usurio de respojnsable de la compañia
        var userResponsable         = $("#tx_user_responsable").val();
        var userPass1               = $("#tx_user_pass_1").val();
        var userPass2               = $("#tx_user_pass_2").val();
        //---------------------------------------------------
        var url = apiurlsecurity+"/api/Post-ExternalCompany-All?code="+PostExternalCompanyAllSeg+"&httpmethod=put&id="+company;                   
        var headers = {
            "apikey":"r$3#23516ewew5"
        }
        var body ={
            "ruc": ruc,
            "name":name,
            "business_name":business_name,
            "business_sector":business_sector,
            "country":business_pais,
            "city":business_ciudad,
            "street_address":business_street,
            "mobile":business_mobile,
            "email":business_email,
            "website":business_site_web,
            "status":1,
            "client_flag":business_client_flag,
            "supplier_flag":business_provider_flag,
            "created_by":getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
            "last_updated_by":getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),                       
            "attribute1":type,//eliminar luego que se cree la tabla de typo de external company external
            "attribute2":"",
            "attribute3":"",
            "attribute4":"",
            "attribute5":"",
            "tx_business_dni":tx_business_dni,
            "tx_business_nombre":tx_business_nombre,
            "tx_business_apelllido":tx_business_apelllido,
            "userResponsible":userResponsable,
            "passResponsible":userPass1
        }
        $.ajax({
            method: "POST",
            url:  url,
            data : JSON.stringify(body),
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function( data)
        {
            
            //var message = "Se produjo un problema al momento de registrar la empresa";
            if(data.message){
                message=data.message;
                swal("Error!", message, "error");
            }
            else{
                swal.close();
            setTimeout(function(){
                swal("Registrado!", "Proceso realizado con éxito.", "success");    
            },600)               
            }
            //console.log(data);
            //swal("Registrado!", "Proceso realizado con éxito.", "success");
            //vw_principal.reloadListVisita();
            //nos vamos para la lsita
            //handlerUrlhtml('contentGlobal','view/accessRequestList.html','accessRequestList');
        }).fail( function( jqXHR, textStatus, errorThrown ) {
           // console.log(jqXHR.responseText);
            var req = JSON.parse(jqXHR.responseText);
            var message = "Se produjo un problema al momento de registrar la empresa";
            if(req.message)
                message=req.message;
            swal("Error!", message, "error");
        });
  }

  var initListPerson = function(){
    

    $("#tx_access_dni_list").keyup(function(event) {
      oTableVisita.search($(this).val()).draw();
      //console.log($(this).val())
      if($(this).val()=="")//limpia filtro buscado
      oTableVisita.search( '' ).columns().search( '' ).draw();
    });


    var search_type = '1';
    var httpmethod  = 'objectlist';
    var perfil = getCookie("vtas_perfil"+sessionStorage.tabVisitasa);
    if (getCookie("vtas_type_usergroup"+sessionStorage.tabVisitasa)!="external") 
    {
        var company = "";//COMPANY POR DEFECTO PARA LO DE LOS MEDICOS-->167
    }
    else
    {
        var company = "&id_external_company="+getCookie('vtas_external_company_id'+sessionStorage.tabVisitasa);  
    }
    var url         = apiurlsecurity+"/api/Get-Person-All?code="+GetPersonAll+"&search_type="+search_type+"&httpmethod="+httpmethod+""+company;                
    var headers ={
        "apikey":constantes.apiKey
    }
    if(oTableVisita){
        oTableVisita.clear().draw();
        oTableVisita.destroy();
      }

    oTableVisita = $('#tb_external_list_person').DataTable({
        paging    : true,
        ordering  : false,
        info      : false,
        pageLength: 100,
        language:{"sProcessing":     "Procesando...",
                "sLengthMenu":     "Mostrar _MENU_ registros",
                "sZeroRecords":    `<div style=''>Sin  Resultados</div>`,//Validar el documento de identidad. No se encontraron resultados. Sin solicitud de Tamizaje
                "sEmptyTable":     `No se Encontraron Registros<br><br>`
                                    ,
                "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
                "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix":    "",
                "sSearch":         "Buscar:",
                "sUrl":            "",
                "sInfoThousands":  ",",
                "sLoadingRecords": "Cargando...",
                "oPaginate": {
                    "sFirst":    "Primero",
                    "sLast":     "Último",
                    "sNext":     "Siguiente",
                    "sPrevious": "Anterior"
                },
                "oAria": {
                    "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                },
                "buttons": {
                    "copy": "Copiar",
                    "colvis": "Visibilidad"
                }},
        //searching : false,
        scrollY   : '60vh',
        scrollCollapse: true,
        responsive: true,
        ajax      :{
            type: "POST",
            url:  url,
            headers:headers,
            crossDomain: true,
            dataType: "json",
            dataSrc: function ( req ) {
          
                var data =[];
                var i = 1;
               
                req.map(function(item){

                   
                    var accessTime  = moment(item.access_time).format('LT');
                    var week        = moment(item.start_date).format('dddd');//dddd
                    var month       = moment(item.start_date).format('MMMM');//
                    var day         = moment(item.start_date).format('D'); ;
                    var startDate   = week +" "+day +" de "+ month;              
                    //var imgAutorizerPerson      = "";
                    //var authorizerPersons       = item.authorized_person?item.authorized_person:[];
                    //var lengthAuthorizerPerson  = authorizerPersons.length;

                    var butcss="btn-green-lime";
                    var responsable=``;
                    if(item.attribute1_user=="4"){//responsable
                        responsable=`<i class="fa fa-check-circle text-success" style="font-size:20px"></i>`;
                    }
                    
                    var row = {
                        number            : i//<img src="images/iconos/motivo.svg"></div>
                        ,company            : toCapitalize(item.name_external_company)
                        ,identity_document  : item.identity_document 
                        ,firstname          : toCapitalize(item.firstname)
                        ,lastname           : toCapitalize(item.lastname) //
                        ,email: item.email
                        ,responsable        : responsable
                        ,detail           : '<button type="button"  class="btn '+butcss+'  btn-rounded btn-raised" data-toggle="modal" data-target="#modalShowPersonDetails" title="Editar información" onclick="vw_external_acces_request.initEditPerson('+item.id+');">Editar</button>'//'<button type="button" class="btn btn-light btn-circle btdetail" id="'+id+'" ><i class="fa fa-ellipsis-v text-secondary"></i></button>'

                    }
                    
                    i++;
                    data.push(row);
                    });
                return data;
            } 
        },
        columns: [
            //{ title:"#" ,data: "number",width: "2%", targets: 0 },
            { title:"Empresa",data: "company",width: "20%", align: "left"},
            { title:"Documento",data: "identity_document",width: "20%", align: "left"},
            { title:"Nombre",data: "firstname",width: "35%", align: "left"},
            //{ title:" ",data: "photoCollaborator",width: "10%"},       
            //{ title:"Colaborador", data:"collaboratorName",width: "25%"}, 
            { title:"Apellidos",data: "lastname",width: "25%", align: "left"},
            { title:"Correo",data: "email",width: "20%", align: "left"},
            { title:"Responsable", data:"responsable",width: "25%"}, 
            { title:"Opciones",data: "detail",width: "3%", align: "left"}
        ],
        /*
        columns: [
            { title:"#" ,data: "number",width: "2%", targets: 0 },
            { title:"Hora",data: "startDate",width: "8%"},
            { title:"Motivo",data: "reason",width: "27%"},
            { title:" ",data: "photoCollaborator",width: "10%"},       
            { title:"Colaborador", data:"collaboratorName",width: "25%"}, 
            { title:"Estatus",data: "status",width: "10%", textAlign: "center"},
            { title:"Participante",data: "participant",width: "25%"},
            { title:"",data: "detail",width: "3%"}
        ],*/
        initComplete: function(settings, json) {
        //alert("culminó la carga");
        //$('[data-toggle="tooltip"]').tooltip();      
        }
    });
  }

  var initEditPerson = function(id_person,id_user,own){
    console.log('editar');
    var rol = getCookie('vtas_rolexternalrol'+sessionStorage.tabVisitasa);
    var selector = "";
    if (rol=='ROL_ALLTASA') {
        if (own==1) {
            selector = "";
        }else{
            selector = "#modalShowPersonDetails ";
        }
       
        $(""+selector+"#sel_type").change(function(){
            console.log('change')
            if ($(this).val() == 2) {
                $(""+selector+"#contenedor_sel_company").show();
                $("#modalRegisterPerson #contenedor_cmp").hide();
            }
            else if($(this).val() == 1){
                $(""+selector+"#contenedor_sel_company").hide();
                $(""+selector+"#contenedor_cmp").show();
            }
            else{
                $(""+selector+"#contenedor_sel_company").hide();
                $(""+selector+"#contenedor_cmp").hide();
            }

        })
    }else{
        $(".rol_alltasa").hide();
    }
    $(""+selector+"#bt_register_external_person").hide();
    $(""+selector+"#bt_update_external_person").show();

    $(""+selector+"#tx_business_email").blur(function(){
        $(""+selector+"#tx_user_responsable").val($(this).val());
    })

    var search_type = '1';
    var httpmethod  = 'object';
    var url         = apiurlsecurity+"/api/Get-Person-All?code="+GetPersonAll+"&search_type="+search_type+"&httpmethod="+httpmethod+"&id="+id_person+"&user_id="+id_user;                
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
            console.log(data);
            $(""+selector+"#sel_external_company_type").val(data.attribute1);
            $(""+selector+"#tx_business_dni").val(data.identity_document);
            $(""+selector+"#tx_business_nombre").val(data.firstname);
            $(""+selector+"#tx_business_apelllido").val(data.lastname);
            $(""+selector+"#tx_user_responsable").val(data.username);
            $(""+selector+"#tx_business_mobile").val(data.mobile);
            $(""+selector+"#tx_business_email").val(data.email);
            $(""+selector+"#tx_hidden_person_id").val(data.id);
            $(""+selector+"#tx_hidden_attribute1").val(data.attribute1);
            $(""+selector+"#tx_job").val(data.job);
            $(""+selector+"#tx_cmp").val(data.health_code_cmp);
            
            $(""+selector+"#tx_created").val(data.created_by);
            $(""+selector+"#tx_created_date").val(data.created_date);
            $(""+selector+"#tx_updated_date").val(data.last_updated_date);
            $(""+selector+"#tx_updated").val(data.last_updated_by);
            
            if (data.person_picture != null) {
                $(""+selector+"#tx_preview").attr("hidden",false);
                $(""+selector+"#tx_preview").attr("src",data.person_picture);
            }
            if (data.id_external_company==167) {
                $(''+selector+'#sel_type').val(1).trigger("change");

            }else{
                $(''+selector+'#sel_type').val(2).trigger("change");
            }

            var rol = getCookie('vtas_rolexternalrol'+sessionStorage.tabVisitasa);
            
            if(rol=="ROL_MEDICAREA" ||rol=="ROL_MEDICO"){
                $("#contenedor_cmp").show();
            }
            $(""+selector+"#sel_status").val(data.userStatus);
            updateSelectExternalCompanyPerson(data.id_external_company);
        });
        $(""+selector+"#bt_update_external_person").click(function(){         
            validateUpdateExternalPerson();
        });

        $(""+selector+"#tx_image").change(function(event) {
            console.log('cambio');
            var preView = document.querySelector(''+selector+'#tx_preview');
            var input = document.querySelector(''+selector+'#tx_image');
            var image = "";
            if (input.files[0]) {

                var datafile = input.files[0];
                console.log(datafile);
                if (datafile.size > 1000000) {
                    swal("Error", "El tamaño de la imagen es superior a 1Mb.", "error");
                    input.value = null;
                }else{
                    let fileReader = new FileReader();
                    fileReader.name = datafile.name;
                    fileReader.readAsDataURL(datafile);
                            
                    fileReader.onload = function(e) {

                        preView.src = fileReader.result;
                        preView.removeAttribute("hidden");
                        console.log(fileReader.result);
                    }
                }

            }
            
        });
  }

var fnGetDataUser = function(idHash,obj){
    var param       = "&idhash="+idHash;
    var httpmethod  = 'objectlist';
    //var url         = apiurlsecurity+"/api/Get-Person-All?code="+GetPersonAll+"&search_type="+search_type+"&httpmethod="+httpmethod+""+company;                
    var url         = apiurlsecurity+"/api/Get-Person-All?code="+GetPersonAll+"&search_type="+search_type+"&httpmethod="+httpmethod+"&id="+id_person+"&user_id="+id_user;                
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
        
    });

  }
  var validateUpdateExternalPerson = function(){
  
      
        var userResponsable         = $("#modalShowPersonDetails #tx_user_responsable").val();

        var messengerError = "";
        if(userResponsable){
            if(userResponsable.trim().length==0){
                messengerError ="Debes ingresar el usuario responsable";
            }
        }
        

        if(messengerError)
            swal("Error", messengerError, "error");
        else{
            swal({
                title: "Actualización Datos de Persona",
                text: "¿Desea actualizar los datos de la persona.",
                type: "info",
                showCancelButton: true,
                confirmButtonClass: "btn-danger btn-sm",
                confirmButtonText: "Si",
                cancelButtonText: "No",
                closeOnConfirm: true
              },function(){
                updateExternalPerson();
            });
        }            
    }

  var updateExternalPerson = function(){
    var rol = getCookie('vtas_rolexternalrol'+sessionStorage.tabVisitasa);
    var selector = "";
    if (rol=='ROL_ALLTASA') {
        selector = "#modalShowPersonDetails "
    }

    swal.close();
    setTimeout(function()
    {
        swal({
            title: "Procesando...",
            text: "Por favor espere.",
            //timer: 3000,
            type: "info",
            showConfirmButton: false
            });

    },500)
        var company = $(""+selector+"#sel_company").val();

        var person_id               = $(""+selector+"#tx_hidden_person_id").val();
        var business_mobile         = $(""+selector+"#tx_business_mobile").val();
        var business_email          = $(""+selector+"#tx_business_email").val();
        var tx_business_dni         = $(""+selector+"#tx_business_dni").val();
        var tx_business_nombre      = $(""+selector+"#tx_business_nombre").val();
        var tx_business_apelllido   = $(""+selector+"#tx_business_apelllido").val();
        var tx_job = $(""+selector+"#tx_job").val();
        //datos para el usurio de respojnsable de la compañia
        var userResponsable         = $(""+selector+"#tx_user_responsable").val();
        var userPass1               = $(""+selector+"#tx_user_pass_1").val();
        var userPass2               = $(""+selector+"#tx_user_pass_2").val();
        var tx_attribute1 = $(""+selector+"#tx_hidden_attribute1").val();
        var status                  = $(""+selector+"#sel_status").val();
        var input = document.querySelector(''+selector+'#tx_image');
        var tx_cmp = $(""+selector+"#tx_cmp").val();
        var image = "";
        if (input.files[0]) {

                    var datafile = input.files[0];
                    console.log(datafile);
                    let fileReader = new FileReader();
                    fileReader.name = datafile.name;
                    fileReader.readAsDataURL(datafile);
                    
                    fileReader.onload = function(e) {

                        image = fileReader.result;
                        console.log(fileReader.result);
                    }

        }

        //---------------------------------------------------
        var url = apiurlsecurity+"/api/Post-Person-All?code="+PostPersonAllSeg+"&httpmethod=put&id="+person_id;                   
        var headers = {
            "apikey":"r$3#23516ewew5"
        }

        setTimeout(function(){
            var body ={
                "mobile":business_mobile,
                "email":business_email,
                "created_by":getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
                "last_updated_by":getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),                       
                "attribute1":tx_attribute1,//eliminar luego que se cree la tabla de typo de external company external
                "attribute2":"",//imagen
                "attribute3":"",
                "attribute4":"",
                "attribute5":"",
                "identity_document":tx_business_dni,
                "firstname":toCapitalize(tx_business_nombre),
                "lastname":toCapitalize(tx_business_apelllido),
                "userResponsible":userResponsable,
                "passResponsible":userPass1,
                "person_picture": image,
                "job": tx_job,
                "userAttribute2": status,
                "cmp":tx_cmp
            }
            console.log(body);
            $.ajax({
                method: "POST",
                url:  url,
                data : JSON.stringify(body),
                headers:headers,
                crossDomain: true,
                dataType: "json",
            }).done(function( data)
            {
                //var message = "Se produjo un problema al momento de registrar la empresa";
                if(data.message){
                    message=data.message;
                    swal("Error!", message, "error");
                }
                else
                {
                    swal.close();
                setTimeout(function(){
                    swal("Registrado!", "Proceso realizado con éxito.", "success");    
                },600) 
                initListPerson(); 
                $("#modalShowPersonDetails").modal("hide")

                }
                //console.log(data);
                //swal("Registrado!", "Proceso realizado con éxito.", "success");
                //vw_principal.reloadListVisita();
                //nos vamos para la lsita
                //handlerUrlhtml('contentGlobal','view/accessRequestList.html','accessRequestList');
            }).fail( function( jqXHR, textStatus, errorThrown ) {
               // console.log(jqXHR.responseText);
                var req = JSON.parse(jqXHR.responseText);
                var message = "Se produjo un problema al momento de registrar la empresa";
                if(req.message)
                    message=req.message;
                swal("Error!", message, "error");
            });
        },1000)
        

  }

  var tableListExternalVisitas = function(){   
    var search_type = '1';
    var httpmethod  = 'objectlist';
    var idperson  = getCookie("vtas_person_id"+sessionStorage.tabVisitasa);
    var perfil      = getCookie("vtas_perfil"+sessionStorage.tabVisitasa); 
    var company = getCookie('vtas_external_company_id'+sessionStorage.tabVisitasa);
    var url         = apiurlaccessrequest+"/api/Get-AccessRequestFull-All?code="+GetAccessRequestFullAll+"&search_type="+search_type+"&httpmethod="+httpmethod+"&system_code="+constantes.sysCode+"&id_external_company="+company+"&id_status=99&id_person="+idperson+"&perfil="+perfil;                
    var headers ={
        "apikey":constantes.apiKey
    }
    

    oTableVisita = $('#tb_external_list_visita').DataTable({
        paging    : false,
        ordering  : false,
        info      : false,
        //searching : false,
        scrollY   : '60vh',
        scrollCollapse: true,
        responsive: true,
        ajax      :{
            type: "POST",
            url:  url,
            headers:headers,
            crossDomain: true,
            dataType: "json",
            dataSrc: function ( req ) {
            
                var data =[];
                var i = 1;
               
                req.map(function(item)
                {
                    if(item.status_id!=7)
                    {
                    console.log(item.status_id);

                    var accessTime  = moment(item.access_time).format('LT');
                    var week        = moment(item.start_date).format('dddd');//dddd
                    var month       = moment(item.start_date).format('MMMM');//
                    var day         = moment(item.start_date).format('D'); ;
                    var startDate   = week +" "+day +" de "+ month;              
                    //var imgAutorizerPerson      = "";
                    //var authorizerPersons       = item.authorized_person?item.authorized_person:[];
                    //var lengthAuthorizerPerson  = authorizerPersons.length;
                    var statusColor="";
                    if(item.status_id == 1){// pendiente por datos                
                        statusColor ="statusPperDatostx";
                    }
                    if(item.status_id == 2){// pendiente por aprobar                
                        statusColor ="statusPperAprovetx";
                    }
                    if(item.status_id == 3){// Programada (aprobadas)
                        statusColor ="statusPperProgtx";
                    }
                    if(item.status_id == 4){// en proceso            
                        statusColor ="statusPperCoursetx";
                    }

                    var imgAutorizerPerson      = "";
                    var authorizerPersons       = item.authorized_person?item.authorized_person:[];
                    var lengthAuthorizerPerson  = authorizerPersons.length;
                    var cant= lengthAuthorizerPerson;
                    var iconPerson ='';

                    var reason=item.status_id==5?item.rejection_reason:'';
                    //console.log(reason)
                    if(cant<=9 && cant>0)
                        cant='0'+cant;
                        //console.log(cant);
                    if(lengthAuthorizerPerson>0)
                    {
                        var nameParticiántes   = [];                    
                        var i = 0;
                        authorizerPersons.forEach(element => {
                            i++;
                            iconPerson+='<img class="m-1" src="images/iconos/persons.svg">';
                            nameParticiántes.push(toCapitalize(element.first_mane+" "+element.last_name+" "));
                        });
                        imgAutorizerPerson = '<div class="card border-0 h-0  m-0 bg-muted" style="box-shadow:0 0px 0px 0 rgba(0, 0, 0, 0.0), 0 0px 0px 0px rgba(0, 0, 0, 0), 0 0px 0px 0 rgba(0, 0, 0, 0)!important;">';
                        imgAutorizerPerson+='<div class="card-body p-1"><div class="row col"><h4 class="border border-top-0 border-bottom-0 border-left-0">'+cant+'</h4><span class="card-title">';                
                        imgAutorizerPerson+=iconPerson; 
                        imgAutorizerPerson+='</span></div><span class="card-subtitle mb-2 text-muted d-inline-block text-truncate " style="max-width: 250px;">'+nameParticiántes.toString()+'</span> </div>'; //
                        imgAutorizerPerson+='</div>';
                    }
                    var butcss="btn-green-lime";
                    var buttxt="COMPLETAR DATOS";
                    if(item.status_id==2 || item.status_id==3)
                    {
                    var butcss="btn-primary";
                    var buttxt="DATOS COMPLETADOS";
                    }
                    var row = {
                        number            : i//<img src="images/iconos/motivo.svg"></div>
                        ,startDate        : '<div class="card border-0 h-0  m-0 bg-muted" style="width: auto; box-shadow:0 0px 0px 0 rgba(0, 0, 0, 0.0), 0 0px 0px 0px rgba(0, 0, 0, 0), 0 0px 0px 0 rgba(0, 0, 0, 0)!important;"><div class="card-body p-1"><span class="card-title h2 text-green-lime font-weight-bold">'+accessTime+'</span><br><span class="card-subtitle mb-2 text-muted font-weight-bold text-capitalize h6">'+startDate+'</span> </div> </div>' 
                        ,endDate          : item.end_date
                        ,reason           : '<div class="card border-0 h-0  m-0 bg-muted" style="width: auto; box-shadow:0 0px 0px 0 rgba(0, 0, 0, 0.0), 0 0px 0px 0px rgba(0, 0, 0, 0), 0 0px 0px 0 rgba(0, 0, 0, 0)!important;"><div class="row"><div class="col-md-1 mt-3"> <img src="images/iconos/motivo.svg"></div> <div class="col-md-11"> <div class="card-body p-1"><span class="card-title h4 text-uppercase">'+item.reason +'</span><br><span class="card-subtitle mb-2 text-muted">'+item.location_name+' - '+item.area_name+'</span> </div> </div></div> </div>' //
                        ,photoCollaborator: '<img src="images/1-thumb.png" alt="..." class="img-thumbnail rounded-circle" >'
                        ,collaboratorName : '<div class="media-body ml-3"><h6 class="mb-1 font-weight-semi-bold"><a class="text-dark " href="#">'+item.data_supervisor_contact+'</a></h6><p class="font-weight-semi-bold mb-0 text-500">'+item.email_responsible_contact+'</p></div>'
                        ,status           : '<i class="fa fa-circle '+statusColor+'"></i><label style="margin-left:15px">'+item.status_name+'</label><br><small class="text-help text-warning pl-0 text-capitalize">'+reason+'</small>'
                        ,participant      : imgAutorizerPerson
                        ,detail           :item.status_id!=4? '<button type="button" class="btn '+butcss+'  btn-rounded btn-raised" title="Editar información" onclick="vw_external_acces_request.initForm('+item.id+');">'+buttxt+'</button>':''//'<button type="button" class="btn btn-light btn-circle btdetail" id="'+id+'" ><i class="fa fa-ellipsis-v text-secondary"></i></button>'
                    }
                    /*
                    var row = {
                        number            : i
                        ,startDate        : '<div class="card border-0 h-0  m-0 bg-muted" style="width: 10rem;"><div class="card-body p-1"><span class="card-title h1">'+accessTime+'</span><br><span class="card-subtitle mb-2 text-muted">'+startDate+'</span> </div> </div>' 
                        ,endDate          : item.end_date
                        ,reason           : item.reason
                        ,photoCollaborator: '<img src="images/1-thumb.png" alt="..." class="img-thumbnail rounded-circle" >'
                        ,collaboratorName : '<div class="media-body ml-3"><h6 class="mb-1 font-weight-semi-bold"><a class="text-dark " href="#">'+item.data_supervisor_contact+'</a></h6><p class="font-weight-semi-bold mb-0 text-500">'+item.email_responsible_contact+'</p></div>'
                        ,status           : (item.status_id == 1)?'<i class="fa fa-circle text-danger"  title="'+item.status_name+'"></i>':'<i class="fa fa-circle text-warning" title="'+item.status_name+'"></i>'
                        ,participant      : imgAutorizerPerson
                        ,detail           :'<button type="button" class="btn btn-light btn-circle" title="Editar información" onclick="vw_external_acces_request.initForm('+item.id+');"><i class="fa fa-pencil-alt text-secondary"></i></button>'
                    }*/
                    i++;
                    data.push(row);

                }
                    });
                return data;
            } 
        },
        columns: [
            //{ title:"#" ,data: "number",width: "2%", targets: 0 },
            { title:"Hora - Fecha",data: "startDate",width: "20%", align: "left"},
            { title:"Motivo",data: "reason",width: "35%",align: "left"},
            //{ title:" ",data: "photoCollaborator",width: "10%"},       
            //{ title:"Colaborador", data:"collaboratorName",width: "25%"}, 
            { title:"Estatus",data: "status",width: "25%",align: "left"},
            { title:"Participantes",data: "participant",width: "20%",align: "left"},
            { title:"",data: "detail",width: "3%",align: "left"}
        ],
        /*
        columns: [
            { title:"#" ,data: "number",width: "2%", targets: 0 },
            { title:"Hora",data: "startDate",width: "8%"},
            { title:"Motivo",data: "reason",width: "27%"},
            { title:" ",data: "photoCollaborator",width: "10%"},       
            { title:"Colaborador", data:"collaboratorName",width: "25%"}, 
            { title:"Estatus",data: "status",width: "10%", textAlign: "center"},
            { title:"Participante",data: "participant",width: "25%"},
            { title:"",data: "detail",width: "3%"}
        ],*/
        initComplete: function(settings, json) {
        //alert("culminó la carga");
        //$('[data-toggle="tooltip"]').tooltip();      
        }
    });
  }

    var initForm = function(id_request){
        //getAreas();getLocations();getRequestType();
        
        vw_external_acces_request.initFormAct3(id_request);
    }

    var initFormAct2 = function(){
        $("#btRetorneList").click(function(){
            handlerUrlhtml('contentGlobal','view/accessRequestList.html','accessRequestList');     
        });
        $("#bt_add_row_participante").click(function(){        
            addRowTableParticipante();
        });

        $("#div_important").show();
        $("#bt_add_row_tool").click(function(){         
            addRowTableTool();
        });
        $("[name='btAddCompany2']").click(function(){   
            var id = $(this).attr("id");
            //alert(id);
            var array =id.split("_");
            positionAddCompany = array[1];
        });

        //$(".dv_itinerary").hide();

        var flagActualizarSelectCompany = true; 
        getExternalCompany(flagActualizarSelectCompany); 
        
    }


    var initFormAct3 = function(id_request)
    {
        
        $("#tx_date_start").datetimepicker({
            timepicker:false,
            format:'d/m/Y',
            minDate: 0
        });
        
        $("#tx_date_end").datetimepicker({
            timepicker:false,
            format:'d/m/Y',
            minDate: 0
        });
        
        $("#tx_time_start").datetimepicker({
            datepicker:false,
            format:'H:i',
            formatTime:'H:i',
            step:5
        });
        
        $("#tx_time_end").datetimepicker({
            datepicker:false,
            format:'H:i',
            formatTime:'H:i',
            step:5
        });
        
        var perfil = getCookie("vtas_perfil"+sessionStorage.tabVisitasa);
        var status = 0;

        if (perfil == 4) {
            var extCompany = getCookie("vtas_external_company_id"+sessionStorage.tabVisitasa);
        }else{
            var extCompany = 0;
        }
        
        //alert("sssssssss");
        var search_type = '1';
        var httpmethod  = 'object';
        var url = apiurlaccessrequest+"/api/Get-AccessRequestFull-All?code="+GetAccessRequestFullAll+"&search_type="+search_type+"&httpmethod="+httpmethod+"&system_code="+constantes.sysCode+"&id="+id_request+"&id_external_company="+extCompany;                
        
        var headers ={
            "apikey":"r$3#23516ewew5"        
        }
        $.ajax({                    
            method: "POST",
            url:  url,
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function(data)
        {

           // console.log(data);
            var id_request = data.id;

            status = data.status_id;

            getAreas(data.id_area);
            getRequestType(data.id_request_type);
            
            $("#hid_type_access_request").val(data.id_request_type)
            if(data.id_request_type == 3){
                $(".gp_proveedor").show();
                $(".gp_visita").hide();
                $("#txt_order_compra_text").val(data.cod_oc);
                $("#txt_order_compra_id").val(data.id_oc);
                $("#txt_aroc").val(data.id_access_request_oc);
            }else{
                $(".gp_proveedor").hide();
                $(".gp_visita").show();
            }
            $("#tx_rejection_reason").val(data.reason);
            $("#tx_quantity").val(data.quantity);
            $("#fm_itinerary #tx_date_start").val(moment(data.start_date).format("DD-MM-YYYY"));
            
            $("#fm_itinerary #tx_date_end").val(moment(data.end_date).format("DD-MM-YYYY"));
            $("#fm_itinerary #tx_time_start").val(moment(data.access_time).format("HH:mm"));
            $("#fm_itinerary #tx_time_end").val(moment(data.exit_time).format("HH:mm"));

            if (data.enabled_sun_day) {$("#ch_itinirary_do").prop("checked", true);setActiveCheck('label_ch_itinirary_do')}
            if (data.enabled_mon_day) {$("#ch_itinirary_lu").prop("checked", true);setActiveCheck('label_ch_itinirary_lu')}
            if (data.enabled_tues_day) {$("#ch_itinirary_ma").prop("checked", true);setActiveCheck('label_ch_itinirary_ma')}
            if (data.enabled_wednes_days) {$("#ch_itinirary_mi").prop("checked", true);setActiveCheck('label_ch_itinirary_mi')}
            if (data.enabled_thurs_day) {$("#ch_itinirary_ju").prop("checked", true);setActiveCheck('label_ch_itinirary_ju')}
            if (data.enabled_fri_days) {$("#ch_itinirary_vi").prop("checked", true);setActiveCheck('label_ch_itinirary_vi')} 
            if (data.enabled_satur_day) {$("#ch_itinirary_sa").prop("checked", true);setActiveCheck('label_ch_itinirary_sa')}

         
            if (perfil == 2) {
                  if(status==1){//no se puede aprobar 1->pendiente por datos
                    $("#modal_show_request_details_footer").append(`<div class="col-sm-6 form-group text-center">
                    <button type="button" class="btn btn-sm btn-blue  btn-raised btn-rounded" onclick="vw_principal.actEditVisita()" style="border-radius: 25px;" id="bt_edit1_visita"> &nbsp; &nbsp; Editar &nbsp; &nbsp;<img height="auto" width="30px" src="images/iconos/iconEdit.svg" > &nbsp; &nbsp;</button>
                    <button type="button" class="btn btn-sm btn-blue  btn-raised btn-rounded" style="border-radius: 25px; display:none" id="bt_edit2_visita"> &nbsp; &nbsp; Guardar &nbsp; &nbsp;<img height="auto" width="30px" src="images/iconos/confirm.svg" > &nbsp; &nbsp;</button>
                    </div>`);
                    $("#modal_show_request_details_footer").append('<div class="col-sm-6 form-group text-center"><button type="button" class="btn btn-sm btn-red  btn-raised btn-rounded" onclick="vw_principal.confirmCancelVisita()" style="border-radius: 25px;"> &nbsp; &nbsp; Cancelar &nbsp; &nbsp;<img height="auto" width="30px" src="images/iconos/cancelar.svg"> &nbsp; &nbsp;</button></div>');
                    
                  }
          
                  if(status==2){//2->pendiente por aprobar
                    $("#modal_show_request_details_footer").append(`<div class="col-sm-3 form-group text-center">
                    <button type="button" class="btn btn-sm btn-blue  btn-raised btn-rounded" onclick="vw_principal.actEditVisita()" style="border-radius: 25px;" id="bt_edit1_visita"> &nbsp; &nbsp; Editar &nbsp; &nbsp;<img height="auto" width="30px" src="images/iconos/iconEdit.svg" > &nbsp; &nbsp;</button>
                    <button type="button" class="btn btn-sm btn-blue  btn-raised btn-rounded" style="border-radius: 25px; display:none" id="bt_edit2_visita"> &nbsp; &nbsp; Guardar &nbsp; &nbsp;<img height="auto" width="30px" src="images/iconos/confirm.svg" > &nbsp; &nbsp;</button>
                    </div>`);
                    $("#modal_show_request_details_footer").append('<div class="col-sm-3 form-group text-center"><button type="button" class="btn btn-sm btn-green  btn-raised btn-rounded" onclick="vw_principal.confirmApproveVisita()" style="border-radius: 25px;"> &nbsp; &nbsp; Aprobar &nbsp; &nbsp;<img height="auto" width="30px" src="images/iconos/aprobar.svg"> &nbsp; &nbsp;</button></div>');
                    $("#modal_show_request_details_footer").append('<div class="col-sm-3 form-group text-center"><button type="button" class="btn btn-sm btn-orange  btn-raised btn-rounded" onclick="vw_principal.confirmDenyVisita()" style="border-radius: 25px;"> &nbsp; &nbsp; Rechazar &nbsp; &nbsp;<img height="auto" width="30px" src="images/iconos/rechazar.svg"> &nbsp; &nbsp;</button></div>');
                    $("#modal_show_request_details_footer").append('<div class="col-sm-3 form-group text-center"><button type="button" class="btn btn-sm btn-red  btn-raised btn-rounded" onclick="vw_principal.confirmCancelVisita()" style="border-radius: 25px;"> &nbsp; &nbsp; Cancelar &nbsp; &nbsp;<img height="auto" width="30px" src="images/iconos/cancelar.svg"> &nbsp; &nbsp;</button></div>');
                  }
                  
                  if(status==3 ){//3->programada,
                    $("#modal_show_request_details_footer").append(`<div class="col-sm-6 form-group text-center">
                    <button type="button" class="btn btn-sm btn-blue  btn-raised btn-rounded" onclick="vw_principal.actEditVisita()" style="border-radius: 25px;" id="bt_edit1_visita"> &nbsp; &nbsp; Editar &nbsp; &nbsp;<img height="auto" width="30px" src="images/iconos/iconEdit.svg" > &nbsp; &nbsp;</button>
                    <button type="button" class="btn btn-sm btn-blue  btn-raised btn-rounded" style="border-radius: 25px; display:none" id="bt_edit2_visita"> &nbsp; &nbsp; Guardar &nbsp; &nbsp;<img height="auto" width="30px" src="images/iconos/confirm.svg" > &nbsp; &nbsp;</button>
                    </div>`);
                    $("#modal_show_request_details_footer").append('<div class="col-sm-6 form-group text-center"><button type="button" class="btn btn-sm btn-red  btn-raised btn-rounded" onclick="vw_principal.confirmCancelVisita()" style="border-radius: 25px;"> &nbsp; &nbsp; Cancelar &nbsp; &nbsp;<img height="auto" width="30px" src="images/iconos/cancelar.svg"> &nbsp; &nbsp;</button></div>');
                    //$("#modal_show_request_details_footer").append('<div class="col-sm-6 form-group text-center"><button type="button" class="btn btn-sm btn-red  btn-raised btn-rounded" onclick="" style="border-radius: 25px;"> &nbsp; &nbsp; Finalizar &nbsp; &nbsp;<img height="auto" width="30px" src="images/iconos/cancelar.svg"> &nbsp; &nbsp;</button></div>');
                    
                }

                  if(status==4){//4->en proceso
                    
                    //$("#modal_show_request_details_footer").append('<div class="col-sm-6 form-group text-center"><button type="button" class="btn btn-sm btn-red  btn-raised btn-rounded" onclick="vw_principal.confirmCancelVisita()" style="border-radius: 25px;"> &nbsp; &nbsp; Cancelar &nbsp; &nbsp;<img height="auto" width="30px" src="images/iconos/cancelar.svg"> &nbsp; &nbsp;</button></div>');
                    $("#modal_show_request_details_footer").append(`
                    <div class="col-sm-6 form-group text-center"><button type="button" class="btn btn-sm btn-blue  btn-raised btn-rounded" onclick="vw_principal.actEditVisita()" style="border-radius: 25px;" id="bt_edit1_visita"> &nbsp; &nbsp; Editar &nbsp; &nbsp;<img height="auto" width="30px" src="images/iconos/iconEdit.svg" > &nbsp; &nbsp;</button>
                    <button type="button" class="btn btn-sm btn-blue  btn-raised btn-rounded" style="border-radius: 25px; display:none" id="bt_edit2_visita"> &nbsp; &nbsp; Guardar &nbsp; &nbsp;<img height="auto" width="30px" src="images/iconos/confirm.svg" > &nbsp; &nbsp;</button></div>
                    <div class="col-sm-6 form-group text-center"><button type="button" class="btn btn-sm btn-red  btn-raised btn-rounded" onclick="vw_principal.confirmFinalizeVisita()" style="border-radius: 25px;"> &nbsp; &nbsp; Finalizar &nbsp; &nbsp;<img height="auto" width="30px" src="images/iconos/cancelar.svg"> &nbsp; &nbsp;</button></div>`);
                  }
            }else if(perfil == 1){
                $("#modal_show_request_details_footer").append('<div id="confirmAccess" class="col-sm-4 form-group text-center"><button type="button" class="btn btn-sm btn-green  btn-raised btn-rounded" onclick="vw_access_event.processAccess()" style="border-radius: 25px;"> &nbsp; &nbsp; Confirmar &nbsp; &nbsp;<img height="auto" width="30px" src="images/iconos/aprobar.svg"> &nbsp; &nbsp;</button></div>');
            }
            //se agrega editar en seguridad
            if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_SEGURIDAD" ||getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_GARITA")//si es perfil de seguridad, puede editar visita
            {
                $("#modal_show_request_details_footerv").append(`<div class="col-sm-12 form-group text-center">
               
                <button type="button" class="btn btn-sm btn-blue  btn-raised btn-rounded" style="border-radius: 25px; display:" id="bt_edit2_visita"> &nbsp; &nbsp; Editar &nbsp; &nbsp;<img height="auto" width="30px" src="images/iconos/confirm.svg" > &nbsp; &nbsp;</button>
                </div>`);
               
            }

            $("#bt_register_visita").click(function(){
                confirmRegister(id_request);
            });

            $("#bt_edit2_visita").click(function(){
                confirmRegister(id_request);
            });

            
            
            getCollaborator(data.id_collaborator);


            $('#fm_itinerary').bootstrapMaterialDesign();
            $("#fm_visita").bootstrapMaterialDesign();

        }).then(function (data) {
 
            console.log("Carga de Detalle de visita")

            var flagActualizarSelectCompany = true; 
            getExternalCompany(flagActualizarSelectCompany,data);

           
            

            if (data.request_files != null) {
                if (perfil == 2 || perfil == 1) {
                    var remove = false;

                } else{var remove = true;}

                myDropzone = new Dropzone("div#list_documents", { 
                    url: "/file/post",
                    autoProcessQueue: false,
                    addRemoveLinks: remove,
                    
                    init:  function() {
                        thisDropzone = this;
                        $("#cant_row_doc").html(this.files.length); 
                        data.request_files.map(function(element,index){
                            var mockFile = { name: element.name, isMock: true,size : 1300, serverImgUrl : element.base_file, car: element.id_company_access_request };
                             
                            // base64 encoded data doesn't contain commas    
                            let base64ContentArray = element.base_file.split(",")     
                            let mimeType = base64ContentArray[0].match(/[^:\s*]\w+\/[\w-+\d.]+(?=[;| ])/)[0]

                            let imagen = element.base_file;
                            
                            if (mimeType == 'application/pdf') {
                                imagen = 'images/pdf.png'
                            }

                            thisDropzone.files[index] = mockFile;
                            thisDropzone.options.addedfile.call(thisDropzone, mockFile);
                            thisDropzone.options.thumbnail.call(thisDropzone, mockFile, imagen);
                               mockFile.previewElement.classList.add('dz-success');
                               mockFile.previewElement.classList.add('dz-complete');
                            var a = document.createElement('a');
                            a.setAttribute('href',element.base_file);
                            a.download = element.name;
                            a.innerHTML = "download";
                            a.setAttribute('class', 'dz-open');
                            mockFile.previewTemplate.appendChild(a);



                        });
                        this.on("addedfile", function (file) { 

                              $("#cant_row_doc").html(this.files.length);
                        }); 
                         this.on("removedfile", function (file) { 
                            console.log('removido');
                              $("#cant_row_doc").html(this.files.length); 
                         }); 
                    }
                });

            }else{
                myDropzone = new Dropzone("div#list_documents", { 
                    url: "/file/post",
                    autoProcessQueue: false,
                    addRemoveLinks: true
                });
            }
 
        });
       
        $("#btRetorneList").click(function(){
            handlerUrlhtml('contentGlobal','view/externalAccessRequestList.html','externalAccessRequestList');       
        });
        $("#bt_add_row_participante").click(function(){  
            addRowTableParticipante();
        });

        $("#div_important").show();
        $("#bt_add_row_tool").click(function(){         
            addRowTableTool();
        });
        
        $("#bt_add_row_vehicle").click(function(){    
            var type = $("#sel_request_type").val();
            addRowVehicle(null,type);
        });
        
        $("[name='btAddCompany']").click(function(){   
            var id = $(this).attr("id");
            //alert(id);
            var array =id.split("_");
            positionAddCompany = array[1];
        });
        
        $("#tx_date_start_oc").datetimepicker({
            format: 'DD/MM/YYYY',
            locale: 'es'
        });

        $("#tx_date_end_oc").datetimepicker({
            format: 'DD/MM/YYYY',
            locale: 'es'
        });

        $("#tx_time_start_oc").datetimepicker({
            datepicker:false,
            format:'H:i',
            formatTime:'H:i',
            step:5
        });
        $("#tx_time_end_oc").datetimepicker({
            datepicker:false,
            format:'H:i',
            formatTime:'H:i',
            step:5
        });   

        
        var input         = $("#add_goods_tools");
        var hidden   = $("#add_goods_tools_id");

        getMaterialGoodsTools(input,hidden);

        

        $("#fm_itinerary").bootstrapMaterialDesign();

        
        
        if (perfil != 4) {
            
            if($("#modal_show_request_details_footer")[0])
            $("#modal_show_request_details_footer").empty();

            if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_SEGURIDAD" && getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_GARITA")//si es perfil de seguridad, puede editar visita
            {
            
                if(status==4 || perfil == 1){//4->en proceso
                //$("#modal_show_request_details button").remove();
                }
            }
            getCollaboratorEdit();
        }else{

            $(".cabecera").attr("disabled",true);
        }      

        
        
    }

    var getCollaborator = function(colaboratorId){
                var resp = "";
                var filter = colaboratorId;
           
                var param= {filter:filter};
                var headers = {"Authorization":TOKEN_CLIENT,"apikey":"r$3#23516ewew5"}
                $.ajax({
                url: apiurlsecurity+"/api/Get-Collaborator?code="+GetCollaborator+"&httpmethod=object",
                //dataType: "json",
                method:"post",
                data : JSON.stringify(param),
                processData:false,
                crossDomain: true,
                async: true,
                headers : headers,
                success: function( data ) {
                    var array =[];

                    data =  JSON.parse(data);
                    resp = data;

                   
                   
                    if(Array.isArray(data.value) ) 
                    { 
                        $("#text_sel_organizer").val(data.value[0].displayName);
                        $("#hid_email_organizer").val(data.value[0].userPrincipalName);
                        $("#sel_organizer").val(colaboratorId);
                    }
                }
                });

    }

    var getCollaboratorEdit =  function(){
        $("#text_sel_organizer").autocomplete({   
            change: function (event, ui) {
                if (ui.item === null) {
                    $("#sel_organizer").val("");
                    $(this).val("");
                }
            }, 
            source: function( request, response ) {
                var filter = $("#text_sel_organizer").val();
                ///console.log(filter);
                var param= {filter:filter};
                var headers = {"Authorization":TOKEN_CLIENT,"apiKey":"r$3#23516ewew5"}
                $.ajax({
                url: apiurlsecurity+"/api/Get-Collaborator?code="+GetCollaborator+"&httpmethod=objectlist",
                //dataType: "json",
                method:"post",
                data : JSON.stringify(param),
                processData:false,
                crossDomain: true,
                async: true,
                headers : headers,
                success: function( data ) {
                    var array =[];
                    data =  JSON.parse(data);
                    data.value.forEach(item => {
                        var json ={}
                        json.label = item.displayName;
                        json.value = item.displayName;
                        json.email = item.userPrincipalName;
                        json.id = item.objectId
                        array.push(json);
                    });
                    //console.log(array);
                    response(array);
                }
                });
            },
            minLength: 3,
            select: function( event, ui ) {
                $("#sel_organizer").val(ui.item.id);
                $("#hid_email_organizer").val(ui.item.email);
                $("#text_sel_organizer").val(ui.item.label);
                /*console.log( ui.item ?
                "Selected: " + ui.item.label :
                "Nothing selected, input was " + this.value);*/
            },
            open: function() {
                $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
                $(".ui-autocomplete").css({'z-index':'10100'});
            },
            close: function() {
                $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
            },
            search: function () {
                //$("#spinnerLoadColaborador").show();
            },
            response: function () {
                //$("#spinnerLoadColaborador").hide();
            }
        });
    }

    var getAreas = function(val=0){
        $("#sel_area").html("");
        $("#sel_area").append("<option value='-1'>Cargando...</option>");
        var url = apiurlaccessrequest+"/api/Get-Area-All?httpmethod=objectlist&code="+GetAreaAll+"&id="+val;                   
        var headers ={
            "apikey":"r$3#23516ewew5"
        }
        $.ajax({                    
            method: "POST",
            url:  url,
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function( data)
        {
            var option ;
            var obj     = $("#sel_area");obj.empty();
            option="<option value='-1'>Seleccione</option>";
            obj.append(option);
            var i = 0;
            
            data.map(function(item){
                i++;
                option="<option data-location='"+item.id_location+"' value='"+item.id+"'>"+item.name+"</option>";
                obj.append(option);
                if(data.length==i){
                    if(val){
                        $("#sel_area option[value='"+val+"']").attr("selected", true);
                        //$("#sel_area").val(data.id_area).trigger("change");
                        var loc = $("#sel_area").find(':selected').data('location');
                        getLocations(loc);
                    }
                }
            });
           

        });
    }

    var getRequestType = function(val=null){
        var url = apiurlaccessrequest+"/api/Get-RequestType-All?code="+GetRequestTypeAll+"&httpmethod=objectlist";                  
        var headers ={
            "apikey":"r$3#23516ewew5"        
        }
        $.ajax({                    
            method: "POST",
            url:  url,
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function( data)
        {            
            var option ;
            var obj     = $("#sel_request_type");
            option="<option data-form='0' value='0'>Seleccione</option>";
            obj.empty();
            obj.append(option);       
            //console.log(JSON.stringify(data));
            data.map(function(item){                
                option="<option data-form='"+item.form_to_display+"' value='"+item.id+"'>"+item.name+"</option>";
                obj.append(option);
            });
            if(val){
                //$("#sel_request_type").val(data.id_request_type);
                $("#sel_request_type option[value='"+val+"']").attr("selected", true);
                //$("#sel_request_type").val(data.id_request_type).trigger("change");
            }
        });
    }

    var getLocations= function(val=null){ 
        
        $("#sel_location").append("<option value='-1'>Cargando...</option>");
        var url = apiurlaccessrequest+"/api/Get-Locations-All?httpmethod=objectlist&code="+GetLocationsAll+"";                   
        var headers ={
            "apikey":"r$3#23516ewew5"        
        }
        $.ajax({                    
            method: "POST",
            url:  url,
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function( data)
        {
            var option = "<option value='0'>Seleccione</option>";
            var obj     = $("#sel_location");            
            obj.empty();
            obj.append(option);
            data.map(function(item){
                if(item.flag_sede==true){
                    option="<option value='"+item.id+"'>"+item.name+"</option>";
                    obj.append(option);
                }               
            });
            if(val){
                $("#sel_location option[value='"+val+"']").attr("selected", true);            
               // $("#sel_location").val(loc).trigger("change");
            }
            

        });
    }

    var getEmail =  function(obj,i){
        var perfil = getCookie("vtas_perfil"+sessionStorage.tabVisitasa);
        //alert("aquí estamos ");
        var forms = $("#list_participantes form");
        var index = forms.index(obj.parents('form'));
        obj.autocomplete({
            change: function (event, ui) {
                console.log(ui);
                if (ui.item === null) {

                }
            },
            source: function( request, response ) {
                //var filter = $("#txt_collaborator").val();
                var httpmethod    = "objectlist";
                var email            = obj.val();
                console.log(email);
                var searchType      = 1;

                var id_external_company = getCookie("vtas_external_company_id"+sessionStorage.tabVisitasa);

                //var param           = {vvhttpmethod:vvhttpmethod,name:name};
                var headers         = {"apiKey":"r$3#23516ewew5"}

                if (perfil == 4) {
                var url = apiurlsecurity+"/api/Get-Person-All?code="+GetPersonAll+"&httpmethod="+httpmethod+"&email="+email+"&id_external_company="+id_external_company+"&search_type="+searchType;
                }else{
                var url = apiurlsecurity+"/api/Get-Person-All?code="+GetPersonAll+"&httpmethod="+httpmethod+"&email="+email+"&search_type="+searchType;
                }

                $.ajax({
                    url: url,
                    dataType: "json",
                    method:"post",
                    //data : JSON.stringify(param),
                    processData:false,
                    crossDomain:true,
                    async: true,
                    headers : headers,
                    success: function( data ) {
                        var array = [];
                        //data =  JSON.parse(data);
                        data.forEach(item => {
                        var json ={}
                        json.label  = item.email;
                        json.value  = item.email;
                        json.id     = item.id;
                        json.firstname     = item.firstname;
                        json.lastname     = item.lastname;
                        json.identity_document     = item.identity_document;
                        json.id_external_company     = item.id_external_company;
                        json.identity_document_type     = item.identity_document_type;
                        array.push(json);
                    });
                    response(array);
                    }                    
                });
            },
            minLength: 3,
            select: function( event, ui ) {
                    console.log(ui.item.id_external_company);
                    var warning = false;
                    $("#list_participantes form").each(function(){ 
                       var currentIndex = forms.index($(this));   
                       console.log('index actual'+currentIndex);  
                       var checkDocument     =false;
                       var checkEmail    =false;

                       if (index!=currentIndex) {
                           var i = 0;
                            $(this).find('.form-control').each(function(){                                
                                var value = $(this).val(); 
                                if(i==2 && value.trim()== ui.item.identity_document && ui.item.identity_document!=""){//es nombre
                                    checkDocument =true;
                                }
                                if(i==5 && value.trim()== ui.item.label){//es apllido
                                    checkEmail = true;
                                }
                                if(i==6 && (checkEmail || checkDocument)){//correo
                                    warning = true;
                                }
                                i++;
                            });
                       }

                    });

                    if (warning) {
                        swal({
                            title: "Error!",
                            text: "El participante ya se encuentra en la lista",
                            type: "error"
                          },function(){
                            $("#add_correo_"+i).val('');            
                        });
                    }else{
                     $("#add_correo_"+i).val(ui.item.label);
                     $("#add_dni_"+i).val(ui.item.identity_document).trigger( "blur" );
                     $("#add_contacto_nombre_"+i).val(ui.item.firstname);
                     $("#add_contacto_apellido_"+i).val(ui.item.lastname);
                     $("#sel_identity_document_type_"+i+" option:selected" ).attr("selected", false);
                     $("#sel_identity_document_type_"+i+" option[value='"+ui.item.identity_document_type+"']").attr("selected", true);
                     $("#sel_company_"+i+" option:selected" ).attr("selected", false);
                     $("#sel_company_"+i+" option[value='"+ui.item.id_external_company+"']").attr("selected", true);
                    }

            },
            open: function() {
                $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
                $(".ui-autocomplete").css({'z-index':'10100'});
            },
            close: function() {
                $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
                obj.blur();
            }
        });
    }

    var getMaterialGoodsTools =  function(obj,objHidden){

        //alert("aquí estamos ");
        obj.autocomplete({
            change: function (event, ui) {
                console.log(ui);
                if (ui.item === null) {
                    //$(this).val('');
                    objHidden.val('0');//asignamos 0 al id de la herramienta
                }
            },
            source: function( request, response ) {
                //var filter = $("#txt_collaborator").val();
                var httpmethod    = "objectlist";
                var name            = obj.val();
                var searchType      = 1;
                //var param           = {vvhttpmethod:vvhttpmethod,name:name};
                var headers         = {"apiKey":"r$3#23516ewew5"}
                $.ajax({
                    url: apiurlaccessrequest+"/api/Get-MaterialGoodsTools-All?code="+GetMaterialGoodsToolsAll+"&httpmethod="+httpmethod+"&name="+name+"&search_type="+searchType,
                    dataType: "json",
                    method:"post",
                    //data : JSON.stringify(param),
                    processData:false,
                    crossDomain:true,
                    async: true,
                    headers : headers,
                    success: function( data ) {
                        var array = [];
                        //data =  JSON.parse(data);
                        data.forEach(item => {
                        var json ={}
                        json.label  = item.name;
                        json.value  = item.name;
                        json.id     = item.id;
                        array.push(json);
                    });
                    response(array);
                    }                    
                });
            },
            minLength: 3,
            select: function( event, ui ) {
                objHidden.val(ui.item.id);        
            },
            open: function() {
                $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
                $(".ui-autocomplete").css({'z-index':'10100'});
            },
            close: function() {
                $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
            }
        });
    }
    var getPerson =  function(obj,i){
        //alert("aquí estamos ");
        var forms = $("#list_participantes form");
        var index = forms.index(obj.parents('form'));
        
        obj.autocomplete({
            change: function (event, ui) {
                console.log(ui);
                if (ui.item === null) {

                }
            },
            source: function( request, response ) {
                //var filter = $("#txt_collaborator").val();
                var httpmethod    = "objectlist";
                var identity_document            = obj.val();
                var searchType      = 1;
                var rol = getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa);
                if (rol == "ROL_ALLTASA") {
                    var id_external_company = 0;
                }else{
                    var id_external_company = getCookie("vtas_external_company_id"+sessionStorage.tabVisitasa);
                }
                //var param           = {vvhttpmethod:vvhttpmethod,name:name};
                var headers         = {"apiKey":"r$3#23516ewew5"}
                $.ajax({
                    url: apiurlsecurity+"/api/Get-Person-All?code="+GetPersonAll+"&httpmethod="+httpmethod+"&identity_document="+identity_document+"&id_external_company="+id_external_company+"&search_type="+searchType,
                    dataType: "json",
                    method:"post",
                    //data : JSON.stringify(param),
                    processData:false,
                    crossDomain:true,
                    async: true,
                    headers : headers,
                    success: function( data ) {
                        var array = [];
                        //data =  JSON.parse(data);
                        data.forEach(item => {
                        var json ={}
                        json.label  = item.identity_document;
                        json.value  = item.identity_document;
                        json.id     = item.id;
                        json.firstname     = item.firstname;
                        json.lastname     = item.lastname;
                        json.email     = item.email;
                        array.push(json);
                    });
                    response(array);
                    }                    
                });
            },
            minLength: 3,
            select: function( event, ui ) {
                    console.log(ui);
                    var warning = false;
                    $("#list_participantes form").each(function(){
                       var currentIndex = forms.index($(this));   
                       console.log('index actual'+currentIndex);

                       if (index!=currentIndex) {
                           var checkDocument     =false;
                           var checkEmail    =false;
                           var i = 0;
                            $(this).find('.form-control').each(function(){                                
                                var value = $(this).val(); 
                                if(i==2 && value.trim()== ui.item.label && ui.item.label != null){//es nombre
                                    checkDocument =true;
                                }
                                if(i==5 && value.trim()== ui.item.email){//es apllido
                                    checkEmail = true;
                                }
                                if(i==6 && (checkDocument || checkEmail)){//correo
                                    warning = true;
                                }
                                i++;
                            });
                       }

                    });
                    if (warning) {
                        swal({
                            title: "Error!",
                            text: "El participante ya se encuentra en la lista",
                            type: "error"
                          },function(){
                            $("#add_dni_"+i).val('');            
                        });
                    }else{
                     $("#add_contacto_nombre_"+i).val(ui.item.firstname);
                     $("#add_contacto_apellido_"+i).val(ui.item.lastname);
                     $("#add_correo_"+i).val(ui.item.email);
                     $("#add_personid_"+i).val(ui.item.id);
                    }


                     
            },
            open: function() {
                $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
                $(".ui-autocomplete").css({'z-index':'10100'});
            },
            close: function() {
                $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
                obj.blur();
            }
        });
    }

    var getPlates =  function(obj,i){

        //alert("aquí estamos ");
        obj.autocomplete({
            change: function (event, ui) {
                console.log(ui);
                if (ui.item === null) {
                    //$(this).val('');
                    //bjHidden.val('0');//asignamos 0 al id del vehiculo
                }
            },
            source: function( request, response ) {
                //var filter = $("#txt_collaborator").val();
                var httpmethod    = "objectlist";
                var license_plate            = obj.val();
                var searchType      = 1;
                //var param           = {vvhttpmethod:vvhttpmethod,name:name};
                var headers         = {"apiKey":"r$3#23516ewew5"}
                $.ajax({
                    url: apiurlaccessrequest+"/api/Get-Vehicle-All?code="+GetVehicleAll+"&httpmethod="+httpmethod+"&license_plate="+license_plate+"&search_type="+searchType,
                    dataType: "json",
                    method:"post",
                    //data : JSON.stringify(param),
                    processData:false,
                    crossDomain:true,
                    async: true,
                    headers : headers,
                    success: function( data ) {
                        var array = [];
                        //data =  JSON.parse(data);
                        data.forEach(item => {
                        var json ={}
                        json.label  = item.license_plate;
                        json.value  = item.license_plate;
                        json.brand  = item.brand;
                        json.model  = item.model;
                        json.trailer  = item.attribute1;
                        json.id     = item.id;
                        array.push(json);
                    });
                    response(array);
                    }                    
                });
            },
            minLength: 3,
            select: function( event, ui ) {
                obj.val(ui.item.license_plate); 
                $("#add_marca_"+i).val(ui.item.brand);
                $("#add_modelo_"+i).val(ui.item.model);   
                $("#add_trailer_"+i).val(ui.item.trailer);     
            },
            open: function() {
                $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
            },
            close: function() {
                $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
            }
        });
    }

    var getPeople =  function(obj,id_person){
        
        //alert(id_person);
                var httpmethod    = "objectlist";
                var searchType      = 1;
                //var param           = {vvhttpmethod:vvhttpmethod,name:name};
                var headers         = {"apiKey":"r$3#23516ewew5"}
                var perfil = getCookie("vtas_perfil"+sessionStorage.tabVisitasa);
                var id_external_company = getCookie("vtas_external_company_id"+sessionStorage.tabVisitasa);

                var url = apiurlsecurity+"/api/Get-Person-All?code="+GetPersonAll+"&httpmethod="+httpmethod+"&search_type="+searchType;

                $.ajax({
                    url: url,
                    dataType: "json",
                    method:"post",
                    //data : JSON.stringify(param),
                    processData:false,
                    crossDomain:true,
                    async: true,
                    headers : headers,
                    success: function( data ) {
                        //console.log(data);
                        var array = [];
                        //data =  JSON.parse(data);
                        obj.append("<option value=''>Seleccione...</option>");
                        data.forEach(item => {
                            obj.append("<option data-nuevo='0' value='"+item.id+"' hidden>"+item.firstname+" "+item.lastname+"</option>");
                        });


                        $("#list_participantes form").each(function(){            
                           var partipante = {}
                           var values = [];
                            $(this).find('.form-control').each(function(){                
                                //var idinput=$(this).attr("id");
                                var value = $(this).val(); 
                                values.push(value);
                            });

                            if(values[6]==0){
                                obj.append('<option data-nuevo="1" value="'+values[2]+'">'+values[3]+' '+values[4]+'</option>');
                            }else{
                                obj.find("option[value='"+values[6]+"']").prop('hidden',false);
                            }
                            

                        });

                        obj.val(id_person);
                    }                    
                });

    }
    var getExternalCompany= function(flag,dataRequest){
        var perfil = getCookie("vtas_perfil"+sessionStorage.tabVisitasa);
        var url = apiurlsecurity+"/api/Get-ExternalCompany-All?code="+GetExternalCompanyAll+"&httpmethod=objectlist";              
        var headers ={
            "apikey":"r$3#23516ewew5"        
        }
        $.ajax({                    
            method: "POST",
            url:  url,
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function(data)
        {
            jsonExternalCompany=[];
            data.map(function(item){
                jsonExternalCompany.push(item);               
            });

        }).then(function(data){

           
            if (perfil == 2) {
                if (dataRequest.companies != null) 
                {
                    dataRequest.companies.map(function(element, index) {
                        if (element.persons == 0) {
                            addRowTableCompany(element);
                        }
                        
                    })
                }              
            }


            if (dataRequest.authorized_person != null) 
            {
                dataRequest.authorized_person.map(function(element, index) {
                    
                       addRowTableParticipante(element);

                }) 
            }
            else
            {
                if (perfil==4) {
                    addRowTableParticipante();
                }
            }

            if (dataRequest.authorized_vehicle != null) {
                dataRequest.authorized_vehicle.map(function(element, index) {
                        
                       addRowVehicle(element,dataRequest.id_request_type);

                })
            }

            if (dataRequest.authorized_tools != null) {
                dataRequest.authorized_tools.map(function(element, index) {

                       addRowTableTool(element);

                })
            }

        });
    }

    var updateSelectExternalCompany = function(i,id){
        var option = "";       
        jsonExternalCompany.map(function(item){
            option+="<option value='"+item.id+"'>"+toCapitalize(item.name)+"</option>";
        });

        $("#sel_company_"+i).html(option); $("#sel_company_"+i).select2({language: {
            noResults: function() {
              return "No hay resultado";        
            },
            searching: function() {
              return "Buscando..";
            },                          
          }, dropdownParent: $("#modalShowRequestDetails") }
        );

        $("#sel_company_"+i).val(id); // Select the option with a value of '1'
        $("#sel_company_"+i).trigger('change');

    }

    var updateSelectExternalCompanyPerson = function(id){

        var option = "<option value='0'>Seleccionar</option>";       
        jsonExternalCompany.map(function(item){
            option+="<option value='"+item.id+"'>"+toCapitalize(item.name)+"</option>";
        });
        $("#sel_company").html(option);
        //$("#sel_company_"+i).val(id);
        $("#sel_company option[value='"+id+"']").attr("selected", true);
        /*$("#list_participantes form").each(function(){                                    
             $(this).find('.external-company').each(function(){    
                 if(!$(this).val()){
                    var idinput=$(this).attr("id");
                    $(this).html(option); 
                 }
             });
        });*/
    }

    var confirmRegister = function(id_request){

        var warning         = 0;
        var message         ="";
        var perfil         = getCookie('vtas_perfil'+sessionStorage.tabVisitasa);
        //se valida si se ingreso participantes
        var ext = getCookie('vtas_external_company_id'+sessionStorage.tabVisitasa);
        var authorizedPersons=[];
        $("#list_participantes form").each(function(){            
            var partipante = {}
            var values = [];
             $(this).find('.form-control').each(function(){                
                 //var idinput=$(this).attr("id");
                 var value = $(this).val(); 
                 values.push(value);
             });

             partipante ={
                 "external_company":ext              
                 ,"affidavit":0                
                 ,"first_name":values[3]
                 ,"last_name":values[4]
                 ,"identity_document":values[2]
                 ,"email":values[5]
                 ,"attribute1":""
                 ,"attribute2":""
                 ,"attribute3":""
                 ,"attribute4":""
                 ,"attribute5":""
             }
             authorizedPersons.push(partipante);
         });
        if (perfil == 4) {
            console.log('');
         if(authorizedPersons.length==0)
         {
            //swal.close();
            swal("Error!", "Debe ingresar al menos un participante.", "info");
            swal.close();
            return;
         }        
        }

        if (perfil == 4) {
            $("#list_participantes form").each(function(){   
               var checkNombre      =false;
               var checkApellidos    =false;
               var checkCorreo    =false;
               var i = 0;
                $(this).find('.form-control').each(function(){                
                    //var idinput=$(this).attr("id");
                    var value = $(this).val(); 
                    //
                    console.log();
                    if(i==1 && value.trim().length>0 ){//es nombre
                        checkNombre =true;
                    }
                    if(i==2 && value.trim().length>0 ){//es apllido
                        checkApellidos = true;
                    }
                    if(i==3 && value.trim().length>0 ){//es apllido
                        checkCorreo = true;
                    }
                    if(i==4 && (checkNombre == false || checkApellidos == false || checkCorreo == false)){//correo
                        warning = 1;
                        message = "Datos de Participantes incompletos.";
                    }
                    i++;
                });
            });
        }

        $("#list_tools form").each(function(){   
           var checkNombre      =false;
           var checkSerie    =false;
           var i = 0;
            $(this).find('.form-control').each(function(){                
                //var idinput=$(this).attr("id");
                var value = $(this).val(); 
                //
                //console.log();
                if(i==1 && value.trim().length>0 ){//es nombre
                    checkNombre =true;
                }
                if(i==2 && value.trim().length>0 ){//es apllido
                    checkSerie = true;
                }
                if(i==3 && (checkNombre == false || checkSerie == false)){//correo
                    warning = 1;
                    message = "Datos de Herramientas incompletos.";
                }
                i++;
            });
        });

        $("#list_vehicles form").each(function(){   
           var checkConductor      =false;
           var checkPlaca   =false;
           var checkMarca   =false;
           var checkModelo   =false;
           var checkBrevete   =false;
           var checkCategoria   =false;
           var i = 0;
            $(this).find('.form-control').each(function(){                
                //var idinput=$(this).attr("id");
                var value = $(this).val(); 
                //
               
                if(i==0 && value.trim().length>0 ){//es nombre
                    checkConductor =true;
                }
                if(i==1 && value.trim().length>0 ){//es nombre
                    checkPlaca =true;
                }
                if(i==2 && value.trim().length>0 ){//es apllido
                    checkMarca = true;
                }
                if(i==3 && value.trim().length>0 ){//es apllido
                    checkModelo = true;
                }
                if(i==4 && value.trim().length>0 ){//es apllido
                    checkBrevete = true;
                }
                if(i==5 && value.trim().length>0 ){//es apllido
                    checkCategoria = true;
                }
                if(i==6 && (checkConductor == false || checkPlaca == false || checkMarca == false || checkModelo == false || checkBrevete == false || checkCategoria == false)){//correo
                    warning = 1;
                    message = "Datos de Vehiculo incompletos.";
                }
                i++;
            });
        });

        if(warning==1){

            swal("Error",message,"error");//warning
        }else{
            
            swal({
                title: "Registro de Datos de Ingreso",
                text: "¿Seguro que desea enviar el formulario?",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger btn-sm",
                confirmButtonText: "Si",
                cancelButtonText: "No",
                closeOnConfirm: true
            },
            function(){
                register(id_request);            
            });
        }

    }

    var register = function(id_request){              
        
        var perfil         = getCookie('vtas_perfil'+sessionStorage.tabVisitasa);
       
        if (perfil == 4) {
            var ext = getCookie("vtas_external_company_id"+sessionStorage.tabVisitasa);
        }else{
            var ext = 0;
        }


    	var now         = moment().format('YYYY-MM-DD HH:mm');
    	var loggedName  = getCookie('vtas_fullname'+sessionStorage.tabVisitasa);
        var body                = {}
        var id_request = id_request;
        var location            = $("#sel_location").val();//
        var area                = $("#sel_area").val();//
        var dateStart           = moment($("#tx_date_start").val(),"DD-MM-YYYY").format("YYYY-MM-DD");
        var dateEnd             = moment($("#tx_date_end").val(),"DD-MM-YYYY").format("YYYY-MM-DD")// dateStart//por ahora la misma que start
        var timeStart           = moment(dateStart+' '+ $("#tx_time_start").val(),"YYYY-MM-DD hh:mm a").format("YYYY-MM-DD HH:mm");//2020-02-29 11:00
        var timeEnd             = moment(dateEnd+' '+ $("#tx_time_end").val(),"YYYY-MM-DD hh:mm a").format("YYYY-MM-DD HH:mm");//2020-02-29 11:00
        var frequency           = $("#sel_frequency").val();
        //console.log(dateStart,dateEnd,timeStart,timeEnd);
        var colaborador         = $("#sel_organizer").val();//
        var nameColaborador     = $("#text_sel_organizer").val();;
        var emailColaborador    = $("#hid_email_colaborador").val();//
        //var materialGoodsTools  = "";//convertir en texto        
        var authorizedPersons   = []; //realizar map para agregar los participantes en la colección de objeto
        var authorizedVehicles  = []; //realizar map para agregar los participantes en la colección de objeto
        var materialGoodsTools  = []; //realizar map para agregar los tool en la colección de objeto
        var requestFiles = [];
        var rejectionReason     = $("#tx_rejection_reason").val();//
        var anonymousAccessToken= $("#hid_anonymous_access_token").val();
        var createdBy           = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);//loggedName;//$("#hid_name_user").val();//nombre del usuario logueado
        if (perfil == 4) {
            var status              = 2;
        }else{
            var status              = 0;
        }
        var accessTime          = timeStart
        var exitTime            = timeEnd;//2020-02-29 14:00
        var enableDays          = "4"; //obtenerlo con moment por la fecha de la visita
        var enabled_sun_day     = $("#ch_itinirary_do").is(':checked');//activar el día, domingo
        var enabled_mon_day    = $("#ch_itinirary_lu").is(':checked');//activar el día, lunes
        var enabled_wednes_days = $("#ch_itinirary_mi").is(':checked');//activar el día, martes
        var enabled_thurs_day   = $("#ch_itinirary_ju").is(':checked');//activar el día, miercoles
        var enabled_fri_days    = $("#ch_itinirary_vi").is(':checked');//activar el día, jueves
        var enabled_satur_day   = $("#ch_itinirary_sa").is(':checked');//activar el día, viernes
        var enabled_tues_day     = $("#ch_itinirary_ma").is(':checked');//activar el día, s{abado
        var cod_oc = $("#txt_order_compra_text").val();
        var id_oc = $("#txt_order_compra_id").val();
        var id_access_request_oc = $("#txt_aroc").val();
        var requestType = $("#sel_request_type").val();
        var quantity        = 0;//$("#tx_quantity").val(); 

        //return;
        //
        //recorro el formulario de participante
        var i=0;


        $("#list_participantes form").each(function(){            
           var partipante = {}
           var values = [];
            $(this).find('.form-control').each(function(){                
                //var idinput=$(this).attr("id");
                var value = $(this).val(); 
                values.push(value);
            });

            /*if (values[0]==null || values[0]=='') {
                swal("Error!", "Debe rellenar los datos de los participantes.", "error").then(function() {return false; });

            }*/
            var extfrpar = 0;
            
            if (perfil == 4) {
                if (values[7]==0) {extfrpar = ext}else{extfrpar = values[7]};
            }else{
                if (values[7]==0) {extfrpar = values[0]}else{extfrpar = values[7]};
            }

            partipante ={
                "external_company":extfrpar            
                ,"affidavit":0                
                ,"first_name":toCapitalize(values[3])
                ,"last_name":toCapitalize(values[4])
                ,"identity_document":values[2]
                ,"identity_document_type":values[1]
                ,"email":values[5]
                ,"attribute1":""
                ,"attribute2":""
                ,"attribute3":""
                ,"attribute4":""
                ,"attribute5":""
            }
            authorizedPersons.push(partipante);
        });

        $("#list_vehicles form").each(function(){                     
            var vehicle = {}
            var values = [];
            var nuevo = 0;
             $(this).find('.form-control').each(function(index){                
                 //var idinput=$(this).attr("id");
                 if(index == 0){
                    nuevo = $(this).find(':selected').data('nuevo');
                 }
                var value = $(this).val(); 
                values.push(value);
             });
             
             var attribute5 = "";
             var attribute4 = "";
             //console.log('nuevo:'+nuevo);

             var person = values[1];
             //console.log(values);
             //debugger;
             if(nuevo == 1){attribute5 = 1;attribute4 = values[1];person = 0;}
             vehicle ={
                "id_vehicle":0
                ,"id_person":person
                ,"license_plate":values[2]
                ,"driver_brand":values[3]
                ,"driver_model":values[4] 
                ,"driver_license_number":values[5]
                ,"driver_license_category":values[6]
                ,"attribute1":values[8]
                ,"attribute2":""
                ,"attribute3":""
                ,"attribute4":attribute4
                ,"attribute5":attribute5
                ,"id_company_access_request":values[7]
             }   
             authorizedVehicles.push(vehicle);
         });

         $("#list_tools form").each(function(){   
                  
            var tools = {};
            var values = [];
            
             $(this).find('.form-control').each(function(){                
                 //var idinput=$(this).attr("id");
                var value = $(this).val(); 
                values.push(value);
             });
             tools ={                
                "id_company_access_request":values[4]             
                ,"id_material_goods_tool":values[1] 
                ,"text_material_goods_tool":values[2]
                ,"serie_number":values[3]
             }  
             materialGoodsTools.push(tools);
         });

         
        var files = myDropzone.files;
        if(files.length>0)
        {
            console.log("entro")
                let content;
                var file = {};
                for (i in files) 
                {

                    if(files[i].isMock){
                        file ={
                            "name":files[i].name,
                            "base_file":files[i].serverImgUrl,
                            "id_company_access_request":files[i].car
                        }  
                        console.log(file);
                        requestFiles.push(file);
                    }else{
                        
                        

                    var datafile = files[i];
                    let fileReader = new FileReader();
                    fileReader.name = files[i].name;
                    fileReader.readAsDataURL(datafile);
                    
                        fileReader.onload = function(e) {

                            content = fileReader.result;

                            file ={
                                "name":fileReader.name,
                                "base_file":content,
                                "id_company_access_request":0
                            }  
                        
                            requestFiles.push(file);
                        }

                    }

                   if(i==files.length-1)
                   {                    
                    body = {
                        "id_area": area,
                        "id_external_company":ext,
                        "emergency_work": true,//fijo por ahora
                        "id_collaborator": colaborador,
                        "material_goods_tools": materialGoodsTools,
                        "email_responsible_contact": emailColaborador,//
                        "data_supervisor_contact": nameColaborador,//
                        "authorized_persons": authorizedPersons,
                        "authorized_vehicles" :authorizedVehicles,
                        "rejection_reason": "",
                        "quantity":quantity,
                        "anonymous_access_token": anonymousAccessToken,//
                        "created_by": createdBy,   // 
                        "last_updated_by": createdBy, //
                        "status":status,//
                        "attribute1": "",//por ahora en blanco
                        "attribute2": "",//por ahora en blanco 
                        "attribute3": "",//por ahora en blanco 
                        "attribute4": "",//por ahora en blanco 
                        "attribute5": "",//por ahora en blanco 
                        "start_date":dateStart,//
                        "start_date_txt":dateStart,//no va
                        "end_date":dateEnd,// la misma que la de start
                        "access_time":accessTime,
                        "exit_time":exitTime,
                        "reason":rejectionReason,//
                        "enabled_days":enableDays,
                        "enabled_mon_day":enabled_mon_day,
                        "enabled_tues_day":enabled_tues_day,
                        "enabled_wednes_days":enabled_wednes_days,
                        "enabled_thurs_day":enabled_thurs_day,
                        "enabled_fri_days":enabled_fri_days,
                        "enabled_satur_day":enabled_satur_day,
                        "enabled_sun_day":enabled_sun_day,
                        "id_request_type":requestType,
                        "request_files": requestFiles,
                        "cod_oc": cod_oc,
                        "id_oc": id_oc,
                        "id_access_request_oc": id_access_request_oc
                        
                    }
                    
                    
                    swal.close();
                    setTimeout(function()
                    {
                        swal({
                            title: "Procesando...",
                            text: "Por favor espere.",
                            //timer: 3000,
                            type: "info",
                            showConfirmButton: false
                            });
            
                    },600);
            
                    window.setTimeout(function(){
                        var url = apiurlaccessrequest+"/api/Post-AccessRequestFull-All?code="+PostAccessRequestFullAll+"&httpmethod=put&id="+id_request;                   
                        var headers ={
                            "apikey":"r$3#23516ewew5"        
                        }
                        console.log(body);
                        $.ajax({                    
                            method: "POST",
                            url:  url,
                            data : JSON.stringify(body),
                            headers:headers,
                            crossDomain: true,
                            dataType: "json",
                        }).done(function( data)
                        {
                            swal.close();
                            setTimeout(function(){
                                   swal({
                                    title: "Registrado",
                                    text: "Proceso realizado con éxito",
                                    type: "success",
                                    timer:2000,
                                    showCancelButton: false,
                                    confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
                                    confirmButtonText: "De acuerdo",
                                    closeOnConfirm: false
                                  });
                                  $('.modal-backdrop').remove();
                                
                            },600)

                            //si es seguridad, se queda en pantalla
                            if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_SEGURIDAD" || getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_GARITA")//si es perfil de seguridad, puede editar visita
                            {
                                $("#modalShowRequestDetails").modal('hide')
                                return
                            }
                            //nos vamos para la lsita si es colaborador
                            if (perfil != 4) {
                                handlerUrlhtml('contentGlobal','view/accessRequestList.html','accessRequestList');
                            }else{
                                handlerUrlhtml('contentGlobal','view/externalAccessRequestList.html','externalAccessRequestList');
                            }
                        }).fail( function( jqXHR, textStatus, errorThrown ) {
                            swal("Error!", "Se produjo un problema al momento de registrar la visita.", "error");
                        });
                    },1000);
                   }
                }
        }
        else{//si no se adjunta imagen


            body = {
                "id_area": area,
                "id_external_company":ext,
                "emergency_work": true,//fijo por ahora
                "id_collaborator": colaborador,
                "material_goods_tools": materialGoodsTools,
                "email_responsible_contact": emailColaborador,//
                "name_colaborador":nameColaborador,
                "data_supervisor_contact": nameColaborador,//
                "authorized_persons": authorizedPersons,
                "authorized_vehicles" :authorizedVehicles,
                "rejection_reason": "",
                "quantity":quantity,
                "anonymous_access_token": anonymousAccessToken,//
                "created_by": createdBy,   // 
                "last_updated_by": createdBy, //
                "status":status,//
                "attribute1": "",//por ahora en blanco
                "attribute2": "",//por ahora en blanco 
                "attribute3": "",//por ahora en blanco 
                "attribute4": "",//por ahora en blanco 
                "attribute5": "",//por ahora en blanco 
                "start_date":dateStart,//
                "start_date_txt":dateStart,//no va
                "end_date":dateEnd,// la misma que la de start
                "access_time":accessTime,
                "exit_time":exitTime,
                "reason":rejectionReason,//
                "enabled_days":enableDays,
                "enabled_mon_day":enabled_mon_day,
                "enabled_tues_day":enabled_tues_day,
                "enabled_wednes_days":enabled_wednes_days,
                "enabled_thurs_day":enabled_thurs_day,
                "enabled_fri_days":enabled_fri_days,
                "enabled_satur_day":enabled_satur_day,
                "enabled_sun_day":enabled_sun_day,
                "id_request_type":requestType,
                "request_files": requestFiles,
                "cod_oc": cod_oc,
                "id_oc": id_oc,
                "id_access_request_oc": id_access_request_oc
            }
            
            
            swal.close();
            setTimeout(function()
            {
                swal({
                    title: "Procesando...",
                    text: "Por favor espere.",
                    //timer: 3000,
                    type: "info",
                    showConfirmButton: false
                    });
    
            },600);
    
           // window.setTimeout(function(){
                var url = apiurlaccessrequest+"/api/Post-AccessRequestFull-All?code="+PostAccessRequestFullAll+"&httpmethod=put&id="+id_request;                   
                var headers ={
                    "apikey":"r$3#23516ewew5"        
                }
                
                $.ajax({
                    method: "POST",
                    url:  url,
                    data : JSON.stringify(body),
                    headers:headers,
                    crossDomain: true,
                    dataType: "json",
                }).done(function( data)
                {
                    swal.close();
                    setTimeout(function(){

                        swal({
                            title: "Registrado",
                            text: "Proceso realizado con éxito",
                            type: "success",
                            timer:2000,
                            showCancelButton: false,
                            confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
                            confirmButtonText: "De acuerdo",
                            closeOnConfirm: false
                          });
                          $('.modal-backdrop').remove();
                        
                    },600)
                    if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_SEGURIDAD" || getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_GARITA")//si es perfil de seguridad, puede editar visita
                            {
                                $("#modalShowRequestDetails").modal('hide')
                                return
                            }
                    //nos vamos para la lsita
                        if (perfil != 4) {
                            handlerUrlhtml('contentGlobal','view/accessRequestList.html','accessRequestList');
                        }else{
                            handlerUrlhtml('contentGlobal','view/externalAccessRequestList.html','externalAccessRequestList');
                        }
                    
                }).fail( function( jqXHR, textStatus, errorThrown ) {
                    swal("Error!", "Se produjo un problema al momento de registrar la visita.", "error");
                });
            //},4000);

        }


        

    }

    var addRowTableParticipante = function(data){
        
        var perfil = getCookie("vtas_perfil"+sessionStorage.tabVisitasa);
        var quantity = $("#tx_quantity").val();
        var dis = "";
        var i = $("#list_participantes").find("div.bd-callout").length;//numero de filas
        i++;        
        if (perfil == 4) {
            dis = 'disabled="disabled"';
            if(i > quantity && quantity!="" && quantity!='0'){swal("Error!", "Ya ha alcanzado la cantidad maxima de participantes para esta visita.", "error");return false;}

        }
        var deleteButton = "";
        if (quantity!="" && perfil == 4 || perfil == 2) {
            var deleteButton = `<div id="bt_delete_row_participante_${i}" style="cursor: pointer;" class="delete">
                                    <img src="images/iconos/trash.svg" class="" >                    
                                    <small id="passwordHelpBlock" class="form-text text-muted">Eliminar</small>
                                </div>`;
        }
        
        if (data!=null) {
            
            var html= `<div class="bd-callout" id="bd-callout_participante_${i}" style="padding: 0.25rem!important;margin-top: 0.25rem!important;margin-left: -1.25rem !important;">
                        <form id="fm_participante_${i}" name="fm_participante_${i}" class="form-row ml-3" style="margin-bottom: 0.125rem!important;"> 
                        <div class="form-group  col-md-2 col-lg-2" style="display:">  
                            <label for="sel_company_${i}" class="bmd-label-static titleInput" >EMPRESA <span class="text-warning">*</span></label>                      
                            <select style="background:#fff !important; border-bottom: 1px solid #ccc"  name="sel_company_${i}" class="form-control  external-company" id="sel_company_${i}" disabled="disabled" required>                        
                            </select>
                        </div>     
                            <div class="form-group col-md-1">
                                <label for="tx_business_dni" class="bmd-label-static titleInput">TIPO<span class="text-warning">*</span></label>              
                                <select class="form-control" id="sel_identity_document_type_${i}" name="sel_identity_document_type_${i}">
                                    <option value="DNI">DNI</option>
                                    <option value="CE">CE</option>
                                    <option value="PASAPORTE">PASAPORTE</option>
                                </select>
                            </div>

                            <div class="form-group col-md-2">
                                <label for="add_dni_${i}" class="bmd-label-static titleInput">DOCUMENTO<span class="text-warning">*</span></label>   
                                <input type="text" class="form-control" maxlength="10" id="add_dni_${i}" value="${data.identity_document}" onblur="addDriverToVehicle('sel_person_vehicle_${i}')">                                        
                            </div>  

                            <div class="form-group  col-md-2 col-lg-2">  
                                <label for="add_contacto_nombre_${i}"  class="bmd-label-static titleInput">PARTICIPANTE<span class="text-warning">*</span></label>                      
                                <input type="text" class="form-control" id="add_contacto_nombre_${i}" value="${data.first_mane}"  onblur="addDriverToVehicle('sel_person_vehicle_${i}')">                    
                                <small id="" class="form-text text-muted">Nombres</small>
                            </div>

                            <div class="form-group col-md-2 col-lg-2">
                                <input type="text" class="form-control" id="add_contacto_apellido_${i}" value="${data.last_name}" onblur="addDriverToVehicle('sel_person_vehicle_${i}')">
                                <small id="" class="form-text text-muted">Apellidos</small>
                            </div>

                            <div class="form-group col-md-2 col-lg-2">
                                <label for="add_correo_${i}" class="bmd-label-static titleInput">CORREO<span class="text-warning">*</span></label> 
                                <input type="email" class="form-control" id="add_correo_${i}" value="${data.email}"  onblur="addDriverToVehicle('sel_person_vehicle_${i}')">                                           
                            </div>
                            
                            <div class="form-group col-md-2 col-lg-2" hidden>
                                <input type="text" id="add_personid_${i}" class="form-control"  value="${data.id_person}" >
                                <input type="text"  class="form-control"  value="${data.external_company}" >                                            
                            </div>
                            <input type="hidden" class="form-control" id="add_covid_test_${i}">

                            <div class="form-group  col-md-1 col-lg-1 text-center align-middle pt-4 mt-3 mb-3 border-left">`
                                +deleteButton+
                            `</div> 

                        </form>
                    </div>`;  
                
        }else{
        var html = ` <div class="bd-callout" id="bd-callout_participante_${i}" style="padding: 0.25rem!important;margin-top: 0.25rem!important;margin-left: -1.25rem !important;">
                      <form id="fm_participante_${i}" name="fm_participante_${i}" class="form-row ml-3" style="margin-bottom: 0.125rem!important;">
                        <div class="form-group  col-md-2 col-lg-2" style="display:">  
                            <label for="sel_company_${i}" class="bmd-label-static titleInput" >EMPRESA <span class="text-warning">*</span></label>                      
                            <select style="background:#fff !important; border-bottom: 1px solid #ccc"  name="sel_company_${i}" class="form-control  external-company" id="sel_company_${i}" ${dis} required>                        
                            </select>
                        </div>  
                        <div class="form-group col-md-1">
                            <label for="tx_business_dni" class="bmd-label-static titleInput">TIPO<span class="text-warning">*</span></label>              
                            <select class="form-control" id="sel_identity_document_type_${i}" name="sel_identity_document_type_${i}">
                                <option value="DNI">DNI</option>
                                <option value="CE">CE</option>
                                <option value="PASAPORTE">PASAPORTE</option>
                            </select>
                        </div>
                        <div class="form-group col-md-2 ">
                            <label for="add_dni_${i}" class="bmd-label-static titleInput">DOCUMENTO<span class="text-warning">*</span></label>   
                            <input type="text" class="form-control" maxlength="10"  id="add_dni_${i}" onblur="addDriverToVehicle('sel_person_vehicle_${i}')">
                        </div>
                        <div class="form-group  col-md-2 col-lg-2">  
                            <label for="add_contacto_nombre_${i}"  class="bmd-label-static titleInput">PARTICIPANTE<span class="text-warning">*</span></label>                      
                            <input type="text" class="form-control" id="add_contacto_nombre_${i}" onblur="addDriverToVehicle('sel_person_vehicle_${i}')">                    
                            <small  class="form-text text-muted">Nombres</small>
                        </div>
                        <div class="form-group col-md-2 col-lg-2">
                            <input type="text" class="form-control" id="add_contacto_apellido_${i}" onblur="addDriverToVehicle('sel_person_vehicle_${i}')">
                            <small  class="form-text text-muted">Apellidos</small>
                        </div>

                        <div class="form-group col-md-2 col-lg-2">
                            <label for="add_correo_${i}" class="bmd-label-static titleInput">CORREO<span class="text-warning">*</span></label>
                            <input type="email" class="form-control" id="add_correo_${i}" onblur="addDriverToVehicle('sel_person_vehicle_${i}')">                            
                        </div>
                        <div class="form-group col-md-1" hidden>
                                <input type="text" id="add_personid_${i}" class="form-control"  value="0" >  
                                <input type="text"  class="form-control"  value="0" >                                         
                        </div> 
                        <input type="hidden" class="form-control" id="add_covid_test_${i}">                       
                        <div class="form-group  col-md-1 col-lg-1 text-center align-middle pt-4 mt-3 mb-3 border-left">
                            <div id="bt_delete_row_participante_${i}" style="cursor: pointer;" class="delete">
                                <img src="images/iconos/trash.svg" class="" >                    
                                <small id="passwordHelpBlock" class="form-text text-muted">Eliminar</small>
                            </div>
                        </div>
                      </form>
                    </div>`;
        }        

        $("#list_participantes").append(html);            
        $("#fm_participante_"+i).bootstrapMaterialDesign();  

        if (perfil == 4) {
            var idext = getCookie("vtas_external_company_id"+sessionStorage.tabVisitasa);
        }else{
            var idext = 0;
        }
        

        if(data!=null && data.external_company!=null){
            idext = data.external_company;
        }
        
        updateSelectExternalCompany(i,idext);
        //alert(jsonExternalCompanySelected.length);
        if(jsonExternalCompanySelected.length==0)
            updateListCompanySelect();
        $("#sel_company_"+i).change(function(){
            jsonExternalCompanySelected=[];
            var stop = 0;
            $("#list_participantes form").each(function(){                                    
                $(this).find('.external-company').each(function(){    
                   
                    var json = {
                        text:$(this).select2('data')[0]['text'],
                        val:$(this).val()
                    }
                    $.each(jsonExternalCompanySelected, function(i, v) {
                       
                        if (v.val == json.val) {
                            stop = 1;
                            return;
                        }
                    });
                    if(stop==0)
                        jsonExternalCompanySelected.push(json);
                });
           });
            updateSelectExternalCompanyVehicle(i);
            updateSelectExternalCompanyTool();
            updateListCompanySelect();
        });


        $("#bt_delete_row_participante_"+i).click(function(){      
            var id  = 'bd-callout_participante_'+i;
            var obj = $("#"+id);
            removeRowParticipante(obj);
        });    
        $("[name='btAddCompany']").click(function(){   
            var id = $(this).attr("id");
            var array =id.split("_");
            positionAddCompany = array[1];
        }); 
         
        if(data!=null && data.identity_document_type!=null){
            $("#sel_identity_document_type_"+i).val(data.identity_document_type).trigger("change");
        }

        $("#cant_row_persona").html(i);

        var input = $("#add_dni_"+i);
        getPerson(input,i);

        var inputEmail = $("#add_correo_"+i);
        getEmail(inputEmail,i);

        input.blur(function(){

            validateFieldMinForm();
            vt_validateSecury( input.val(),'visita','',$("#hid_type_access_request").val(),input,i);
           
        });

    }
         
    var addRowTableCompany = function(data){
       
        var perfil = getCookie("vtas_perfil"+sessionStorage.tabVisitasa);
        var quantity = $("#tx_quantity").val();
        var dis = "";
        var i = $("#list_participantes").find("div.bd-callout").length;//numero de filas
        i++;        
        if (perfil == 4) {
            dis = 'disabled="disabled"';
            if(i > quantity && quantity!="" && quantity!='0'){swal("Error!", "Ya ha alcanzado la cantidad maxima de participantes para esta visita.", "error");return false;}

        }
        var deleteButton = "";
        if (quantity!="" && perfil == 4 || perfil == 2) {
            var deleteButton = `<div id="bt_delete_row_participante_${i}" style="cursor: pointer;" class="delete">
                                    <img src="images/iconos/trash.svg" class="" >                    
                                    <small id="passwordHelpBlock" class="form-text text-muted">Eliminar</small>
                                </div>`;
        }
        
        var html = ` <div class="bd-callout" id="bd-callout_participante_${i}" style="padding: 0.25rem!important;margin-top: 0.25rem!important;margin-left: -1.25rem !important;">
                      <form id="fm_participante_${i}" name="fm_participante_${i}" class="form-row ml-3" style="margin-bottom: 0.125rem!important;">
                        
                       <div class="form-group  col-md-2 col-lg-2" style="display:">  
                            <label for="sel_company_${i}" class="bmd-label-static titleInput" >EMPRESA <span class="text-warning">*</span></label>                      
                            <select style="background:#fff !important; border-bottom: 1px solid #ccc"  name="sel_company_${i}" class="form-control  external-company" id="sel_company_${i}" ${dis} required>                        
                            </select>
                        </div> 

                        <div class="form-group col-md-1">
                            <label for="tx_business_dni" class="bmd-label-static titleInput">TIPO<span class="text-warning">*</span></label>              
                            <select class="form-control" id="sel_identity_document_type_${i}" name="sel_identity_document_type_${i}">
                                <option value="DNI">DNI</option>
                                <option value="CE">CE</option>
                                <option value="PASAPORTE">PASAPORTE</option>
                            </select>
                        </div>
                        <div class="form-group col-md-2 ">
                            <label for="add_dni_${i}" class="bmd-label-static titleInput">DOCUMENTO<span class="text-warning">*</span></label>   
                            <input type="text" class="form-control" maxlength="10"  id="add_dni_${i}">
                        </div>
                        <div class="form-group  col-md-2 col-lg-2">  
                            <label for="add_contacto_nombre_${i}"  class="bmd-label-static titleInput">PARTICIPANTE<span class="text-warning">*</span></label>                      
                            <input type="text" class="form-control" id="add_contacto_nombre_${i}" >                    
                            <small  class="form-text text-muted">Nombres</small>
                        </div>
                        <div class="form-group col-md-2 col-lg-2">
                            <input type="text" class="form-control" id="add_contacto_apellido_${i}" >
                            <small  class="form-text text-muted">Apellidos</small>
                        </div>

                        <div class="form-group col-md-2 col-lg-2">
                            <label for="add_correo_${i}" class="bmd-label-static titleInput">CORREO<span class="text-warning">*</span></label>
                            <input type="email" class="form-control" id="add_correo_${i}">                            
                        </div>
                        <div class="form-group col-md-1" hidden>
                                <input type="email" class="form-control"  value="" >  
                                <input type="text" class="form-control"  value="0" >                                         
                        </div>                        
                        <div class="form-group  col-md-1 col-lg-1 text-center align-middle pt-4 mt-3 mb-3 border-left">
                            <div id="bt_delete_row_participante_${i}" style="cursor: pointer;" class="delete">
                                <img src="images/iconos/trash.svg" class="" >                    
                                <small id="passwordHelpBlock" class="form-text text-muted">Eliminar</small>
                            </div>
                        </div>
                      </form>
                    </div>`;


        $("#list_participantes").append(html);            
        $("#fm_participante_"+i).bootstrapMaterialDesign();  

        if (perfil == 4) {
            var idext = getCookie("vtas_external_company_id"+sessionStorage.tabVisitasa);
        }else{
            var idext = 0;
        }
        

        if(data!=null && data.id_external_company!=null){
            idext = data.id_external_company;
        }
        updateSelectExternalCompany(i,idext);

       


        $("#bt_delete_row_participante_"+i).click(function(){      
            var id  = 'bd-callout_participante_'+i;
            var obj = $("#"+id);
            removeRowParticipante(obj);
        });    
        $("[name='btAddCompany']").click(function(){   
            var id = $(this).attr("id");
            var array =id.split("_");
            positionAddCompany = array[1];
        }); 

        var input = $("#add_dni_"+i);
        getPerson(input,i);

        var inputEmail = $("#add_correo_"+i);
        getEmail(inputEmail,i);

        input.blur(function()
        {
            
            validateFieldMinForm();
            vt_validateSecury( input.val(),'visita','',$("#hid_type_access_request").val(),input,i);
        
        });

    }
    
    var addRowVehicle = function(data=null,type_request=null){
        //var type_request = $("#sel_request_type").val();
        var inputtrailer = "";
       // console.log(data);
        var i = $("#list_vehicles").find("div.bd-callout").length;//numero de filas
        i++;
        var perfil = getCookie("vtas_perfil"+sessionStorage.tabVisitasa);
        var deleteButton = "";
        if (perfil == 4 || perfil == 2) {
            var deleteButton = `<div id="bt_delete_row_vehicle_${i}" style="cursor: pointer;" class="delete">
                                    <img src="images/iconos/trash.svg" class="" >                    
                                    <small id="passwordHelpBlock" class="form-text text-muted">Eliminar</small>
                                </div>`;
        }
        if(type_request=="4")  //si es transportista. habilitamos el y trailer
        {
            if (data!=null) {
                inputtrailer = `<div class="form-group col-md-1 col-lg-1" >
                                    <label for="add_trailer" class="bmd-label-static titleInput">TRAILER <span class="text-warning">*</span></label>
                                    <input type="text" class="form-control" id="add_trailer_${i}" value="${data.trailer}">  
                                </div>`;
            }
            else{
                inputtrailer = `<div class="form-group col-md-1 col-lg-1" >
                                    <label for="add_trailer" class="bmd-label-static titleInput">TRAILER <span class="text-warning">*</span></label>
                                    <input type="text" class="form-control" id="add_trailer_${i}" value="">  
                                </div>`;
            }
        } 
        else{
            inputtrailer = `<div class=" col-md-1 col-lg-1">
                                &nbsp;
                                <input type="hidden" class="form-control" id="add_trailer_${i}" value=""> 
                            </div>`;
        }

        if (data!=null) {
        var html =  `<div class="bd-callout" id="bd-callout_vehicle_${i}" style="padding: 0.25rem!important;margin-top: 0.25rem!important;important;margin-left: -1.25rem !important;">
                        <form id="fm_vehicle_1" name="fm_vehicle_${i}" class="form-row ml-3" style="margin-bottom: 0.125rem!important;">
                        
                        <div class="form-group  col-md-2 col-lg-2" style="display:">  
                                <label for="sel_company_vehicle_${i}" class="bmd-label-static titleInput" >EMPRESA <span class="text-warning">*</span></label>                      
                                <select style="background:#fff !important; border-bottom: 1px solid #ccc"  name="sel_company_vehicle_${i}" class="form-control  external-company-vehicle" id="sel_company_vehicle_${i}" disabled="disabled"  required>                        
                                </select>
                        </div>      
                        <div class="form-group col-md-2 col-lg-2">
                                <label for="add_person" class="bmd-label-static titleInput" >CONDUCTOR <span class="text-warning">*</span></label>
                                <select id="add_person_${i}" mane="add_person_${i}" class="form-control">
                                </select>
                            </div>
                            <div class="form-group col-md-1 col-lg-1">
                                <label for="add_placa" class="bmd-label-static titleInput">PLACA <span class="text-warning">*</span></label>
                                <input type="text" class="form-control " id="add_placa_${i}" value="${data.license_plate}">                            
                            </div>
                            <div class="form-group col-md-1 col-lg-1">      
                                <label for="add_marca" class="bmd-label-static titleInput" >MARCA <span class="text-warning">*</span></label>                  
                                <input type="text" class="form-control" id="add_marca_${i}" value="${data.brand}">                            
                            </div>
                            <div class="form-group col-md-2 col-lg-2">
                                <label for="add_modelo" class="bmd-label-static titleInput">MODELO <span class="text-warning">*</span></label>
                                <input type="text" class="form-control" id="add_modelo_${i}" value="${data.model}">                            
                            </div>
                            <div class="form-group col-md-1 col-lg-1 ">
                                <label for="add_brevete" class="bmd-label-static titleInput">BREVETE <span class="text-warning">*</span></label>  
                                <input type="text" class="form-control" maxlength="15"  id="add_brevete_${i}" value="${data.driver_license_number}">                                                 
                            </div>
                            <div class="form-group col-md-1 col-lg-1">
                                <label for="add_categoria" class="bmd-label-static titleInput">CATEGORÍA <span class="text-warning">*</span></label>
                                <select id="add_categoria_${i}" mane="add_categoria_${i}" class="form-control">
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                </select> 
                                
                            </div>
                            <div hidden><input type="text" class="form-control"  value="${data.id_company_access_request}" ></div>
                            ${inputtrailer}
                            <div class="form-group  col-md-1 col-lg-1 text-center align-middle pt-4 mt-3 mb-3 border-left">`
                                +deleteButton+
                            `</div> 
                        </form>
                    </div>`;
        }else{
        var html = `<div class="bd-callout" id="bd-callout_vehicle_${i}" style="padding: 0.25rem!important;margin-top: 0.25rem!important;margin-left: -1.25rem !important;">
                        <form id="fm_vehicle_${i}" name="fm_vehicle_${i}" class="form-row ml-3" class="form-row" style="margin-bottom: 0.125rem!important;">
                            
                            <div class="form-group  col-md-2 col-lg-2" style="display:">  
                                    <label for="sel_company_vehicle_${i}" class="bmd-label-static titleInput" >EMPRESA <span class="text-warning">*</span></label>                      
                                    <select style="background:#fff !important; border-bottom: 1px solid #ccc"  name="sel_company_vehicle_${i}" class="form-control  external-company-vehicle" id="sel_company_vehicle_${i}"  required>                        
                                    </select>
                            </div>
                            <div class="form-group col-md-2 col-lg-2">
                                <label for="add_person" class="bmd-label-static titleInput">CONDUCTOR<span class="text-warning">*</span></label>
                                <select id="add_person_${i}" mane="add_person_${i}" class="form-control">
                                </select>                            
                            </div>
                            <div class="form-group col-md-1 col-lg-1">
                                <label for="add_placa" class="bmd-label-static titleInput">PLACA<span class="text-warning">*</span></label>
                                <input type="text" class="form-control " id="add_placa_${i}" >
                            </div>
                            <div class="form-group col-md-1 col-lg-1">                     
                                <label for="add_marca" class="bmd-label-static titleInput">MARCA<span class="text-warning">*</span></label>   
                                <input type="text" class="form-control" id="add_marca_${i}" >
                            </div>
                            <div class="form-group col-md-2 col-lg-2">
                                <label for="add_modelo" class="bmd-label-static titleInput">MODELO<span class="text-warning">*</span></label>
                                <input type="text" class="form-control" id="add_modelo_${i}" >
                            </div>
                            <div class="form-group col-md-1 col-lg-1 ">
                                <label for="add_brevete" class="bmd-label-static titleInput">BREVETE<span class="text-warning">*</span></label>
                                <input type="text" class="form-control" maxlength="15"  id="add_brevete_${i}" >                                                   
                            </div>
                            <div class="form-group col-md-1 col-lg-1">
                                <label for="add_categoria" class="bmd-label-static titleInput">CATEGORÍA<span class="text-warning">*</span></label>
                                <select id="add_categoria_${i}" mane="add_categoria_${i}" class="form-control">
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                </select>                                                     
                            </div>
                            <div hidden><input type="text" class="form-control"  value="0" ></div>
                            ${inputtrailer}
                            <div class="form-group  col-md-1 col-lg-1 text-center align-middle pt-4 mt-3 mb-3 border-left">
                                <div id="bt_delete_row_vehicle_${i}" style="cursor: pointer;" class="delete">
                                    <img src="images/iconos/trash.svg" class="" >                    
                                    <small id="passwordHelpBlock" class="form-text text-muted">Eliminar</small>
                                </div>
                            </div>
                        </form>
                    </div>`;
        }

         $("#list_vehicles").append(html);
         
         $("#fm_vehicle_"+i).bootstrapMaterialDesign();
          
         

         updateSelectExternalCompanyVehicle(i);

        if(data)
        {
         $("#sel_company_vehicle_"+i).val(data.id_external_company); 
            $("#sel_company_vehicle_"+i).trigger('change');
        }
         

         $("#bt_delete_row_vehicle_"+i).click(function(){      
            var id  = 'bd-callout_vehicle_'+i;
            var obj = $("#"+id);
            removeRowVehicle(obj);
        });

        if(data){
        $("#add_categoria_"+i).val(data.driver_license_category);}

         var obj = $("#add_person_"+i+"");
         var id_person = "";
         if (data!=null) {
            id_person = data.id_person;
         }
         //debugger;
         console.log(data);
         getPeople(obj,id_person);

         $("#cant_row_vehicle").html(i);

        var input = $("#add_placa_"+i);
        getPlates(input,i);

     }

    var addRowTableTool = function(data){
        var i = $("#list_tools").find("div.bd-callout").length;//numero de filas
        i++;
        var perfil = getCookie("vtas_perfil"+sessionStorage.tabVisitasa);
        var deleteButton = "";
        if (perfil == 4 || perfil == 2) {
            var deleteButton = `<div id="bt_delete_tool_${i}" style="cursor: pointer;" class="delete">
                                    <img src="images/iconos/trash.svg" class="" >                    
                                    <small id="passwordHelpBlock" class="form-text text-muted">Eliminar</small>
                                </div>`;
        }

        if (data!=null) {

            var html = `<div class="bd-callout" id="bd-callout_tool_${i}" style="padding: 0.25rem!important;margin-top: 0.25rem!important;margin-left: -1.25rem !important;">
                        <form id="fm_tool_${i}" name="fm_tool_${i}" class="form-row ml-3" style="margin-bottom: 0.125rem!important;">                            
                            
                            <div class="form-group col-md-2 col-lg-2 no-particular" >  
                                <label for="sel_company_tool_${i}" class="bmd-label-static titleInput">Empresa <span class="text-warning">*</span></label>                      
                                <select  name="sel_company_tool_${i}" class="form-control external-company-tool" id="sel_company_tool_${i}" disabled="disabled" required>                        
                                </select>
                                <small id="" class="form-text text-muted">&nbsp;</small>
                            </div>
                            <div class="form-group col-md-4 col-lg-2">
                                <label for="add_goods_tools" class="bmd-label-static titleInput">HERRAMIENTA<span class="text-warning">*</span></label> 
                                <input type="hidden" class="form-control" id="add_goods_tools_id_${i}" value="${data.tool_id}" > 
                                <input type="text" class="form-control " id="add_goods_tools_${i}" value="${data.name}" >                        
                            </div>
                            
                            <div class="form-group col-md-2 col-lg-2">
                                <label for="add_serial_number_${i}" class="bmd-label-static titleInput">NÚMERO DE SERIE<span class="text-warning">*</span></label>                 
                                <input type="text" class="form-control" id="add_serial_number_${i}" value="${data.serie_number}">
                            </div>
                            <div hidden><input type="text" class="form-control"  value="${data.id_company_access_request}" ></div>
                            <div class="form-group col-md-3 col-lg-3">       
                                &nbsp;
                            </div>
                            <div class="form-group  col-md-1 col-lg-1 text-center align-middle pt-4 mt-3 mb-3 border-left">`
                                +deleteButton+
                            `</div>
                        </form>
                    </div>`;
        }else{
        var html = `<div class="bd-callout" id="bd-callout_tool_${i}" style="padding: 0.25rem!important;margin-top: 0.25rem!important;margin-left: -1.25rem !important;">
                        <form id="fm_tool_${i}" name="fm_tool_${i}" class="form-row ml-3" style="margin-bottom: 0.125rem!important;"> 
                            <div class="form-group col-md-2 col-lg-2 no-particular" >  
                                <label for="sel_company_tool_${i}" class="bmd-label-static titleInput">Empresa <span class="text-warning">*</span></label>                      
                                <select  name="sel_company_tool_${i}" class="form-control external-company-tool" id="sel_company_tool_${i}" required>                        
                                </select>
                                <small id="" class="form-text text-muted">&nbsp;</small>
                            </div>                           
                            <div class="form-group col-md-4 col-lg-4">   
                                <label for="add_goods_tools" class="bmd-label-static titleInput">HERRAMIENTA <span class="text-warning">*</span></label> 
                                <input type="hidden" class="form-control" id="add_goods_tools_id_${i}" value="0" > 
                                <input type="text" class="form-control " id="add_goods_tools_${i}" >                        
                            </div>
                            <div class="form-group col-md-2 col-lg-2">       
                                <label for="add_serial_number_${i}" class="bmd-label-static titleInput">NÚMERO DE SERIE</label>                 
                                <input type="text" class="form-control" id="add_serial_number_${i}">
                            </div>
                            <div hidden><input type="text" class="form-control"  value="0" ></div>
                            <div class="form-group col-md-3 col-lg-3">       
                                &nbsp;
                            </div>
                            <div class="form-group  col-md-1 col-lg-1 text-center align-middle pt-4 mt-3 mb-3 border-left">
                                <div id="bt_delete_tool_${i}" style="cursor: pointer;" class="delete">
                                    <img src="images/iconos/trash.svg" class="" >                    
                                    <small id="passwordHelpBlock" class="form-text text-muted">Eliminar</small>
                                </div>
                            </div>
                        </form>
                    </div>`;
        }

         $("#list_tools").append(html);
         $("#fm_tool_"+i).bootstrapMaterialDesign();
         $("#bt_delete_tool_"+i).click(function(){      
            var id  = 'bd-callout_tool_'+i;
            var obj = $("#"+id);
            removeRowTool(obj);
        });
        var input         = $("#add_goods_tools_"+i);
        var hidden   = $("#add_goods_tools_id_"+i); 
        getMaterialGoodsTools(input,hidden);
        updateSelectExternalCompanyTool(i);

        if(data)
        {
        $("#sel_company_tool_"+i).val(data.id_external_company); 
        $("#sel_company_tool_"+i).trigger('change');
        }

            $("#cant_row_tool").html(i);

     }


    var removeRowParticipante = function(obj){  
        obj.remove();
        var i = $("#list_participantes").find("div.bd-callout").length;
        $("#cant_row_persona").html(i);
    }

    var removeRowTool = function(obj){
        obj.remove();
        var i = $("#list_tools").find("div.bd-callout").length;
        $("#cant_row_tool").html("");
        $("#cant_row_tool").html(i);
    }

    var removeRowVehicle = function(obj){
        obj.remove();
        var i = $("#list_vehicles").find("div.bd-callout").length;
        $("#cant_row_vehicle").html("");
        $("#cant_row_vehicle").html(i);
    }

    var validateformCompanyExternal = function(){

      
        var ruc                     = $("#tx_ruc").val();
        var name                    = $("#tx_name").val();
        var business_name           = $("#tx_business_name").val();
        var userResponsable         = $("#tx_user_responsable").val();
        var userPass1               = $("#tx_user_pass_1").val();
        var userPass2               = $("#tx_user_pass_2").val();
        var messengerError = "";
        if(ruc.trim().length==0){
            messengerError ="Debes ingresar el RUC";
        }
        else if(name.trim().length==0){
            messengerError ="Debes ingresar el nombre";
        }
        else if(business_name.trim().length==0){
            messengerError ="Debes ingresar el nombre comercial";
        }
        else if(userResponsable.trim().length==0){
            messengerError ="Debes ingresar el usuario responsable";
        }
        else if(userPass1.trim().length==0){
            messengerError ="Debes la clave del usuario responsable";
        }
        else if(userPass2.trim().length==0){
            messengerError ="Debes confirmar la clave del usuario responsable";
        }
        else if(userPass1 != userPass2){
            messengerError ="la clave no coinsiden";
        }
        if(messengerError)
            swal("Error", messengerError, "error");
        else{
            swal({
                title: "¿Estás Seguro?",
                text: "Estás apunto de registrar una nueva empresa",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger btn-sm",
                confirmButtonText: "Si",
                cancelButtonText: "No",
                closeOnConfirm: true
              },function(){
                registerCompanyExternal();            
            });
        }            
    }
    var registerCompanyExternal = function(){
        swal(positionAddCompany);
        //return;
        var ruc                     = $("#tx_ruc").val();
        var name                    = $("#tx_name").val();
        var business_name           = $("#tx_business_name").val();
        var business_sector         = $("#tx_business_sector").val();
        var business_pais           = $("#tx_business_pais").val();
        var business_ciudad         = $("#tx_business_ciudad").val();
        var business_street         = $("#tx_business_street").val();
        var business_mobile         = $("#tx_business_mobile").val();
        var business_email          = $("#tx_business_email").val();
        var business_site_web       = $("#tx_business_site_web").val();
        var business_client_flag    = $("#tx_business_client_flag").prop( "checked")?1:0;
        var business_provider_flag  = $("#tx_business_provider_flag").prop("checked")?1:0;
        var type                    = $("#sel_external_company_type").val();
        //datos para el usurio de respojnsable de la compañia
        var userResponsable         = $("#tx_user_responsable").val();
        var userPass1               = $("#tx_user_pass_1").val();
        var userPass2               = $("#tx_user_pass_2").val();
        //---------------------------------------------------
        var url = apiurlsecurity+"/api/Post-ExternalCompany-All?code="+PostExternalCompanyAllSeg+"&httpmethod=post";                   
        var headers = {
            "apikey":"r$3#23516ewew5"
        }
        var body ={
            "ruc": ruc,
            "name":name,
            "business_name":business_name,
            "business_sector":business_sector,
            "country":business_pais,
            "city":business_ciudad,
            "street_address":business_street,
            "mobile":business_mobile,
            "email":business_email,
            "website":business_site_web,
            "status":1,
            "client_flag":business_client_flag,
            "supplier_flag":business_provider_flag,
            "created_by":getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
            "last_updated_by":getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),                       
            "attribute1":type,//eliminar luego que se cree la tabla de typo de external company external
            "attribute2":"",
            "attribute3":"",
            "attribute4":"",
            "attribute5":"",
            "userResponsible":userResponsable,
            "passResponsible":userPass1
        }
        $.ajax({
            method: "POST",
            url:  url,
            data : JSON.stringify(body),
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function( data)
        {
            
            //var message = "Se produjo un problema al momento de registrar la empresa";
            if(data.message){
                message=data.message;
                swal("Error!", message, "error");
            }
            else{
                //$("#modalAddCompany .close").click();//cerramos modal
                var flagActualizarSelectCompany = true;
                getExternalCompany(flagActualizarSelectCompany);
                //setTimeout(function(){ swal("empresa registrada con éxito"); }, 1500);                
            }
            //console.log(data);
            //swal("Registrado!", "Proceso realizado con éxito.", "success");
            //vw_principal.reloadListVisita();
            //nos vamos para la lsita
            //handlerUrlhtml('contentGlobal','view/accessRequestList.html','accessRequestList');
        }).fail( function( jqXHR, textStatus, errorThrown ) {
           // console.log(jqXHR.responseText);
            var req = JSON.parse(jqXHR.responseText);
            var message = "Se produjo un problema al momento de registrar la empresa";
            if(req.message)
                message=req.message;
            swal("Error!", message, "error");
        });
    }
    return{
        init:function(){
            //getAreas();
            init();
            getLocations();
            getRequestType();
        },
        initList:function(){
        	moment.locale('es');
            //getAreas();
			tableListExternalVisitas();
        },
        initListCovid:function(){
        	moment.locale('es');
            //getAreas();
			tableListExternalVisitas();
        },
        addParticipante:function(data){
            addRowTableParticipante(data);
        },
        removeParticipante : function(obj){
            removeRowParticipante(obj);
        },
        addVehicle:function(data){
            addRowVehicle(data);
        },
        registerCompany :function(){
            registerCompanyExternal();
        },
        validateFormCompany:function(){
            validateformCompanyExternal();
        },
        
        initForm:function(id_request){ 
           
            $("#contentGlobal").load('view/externalAccessRequestEdit.html', function(){
                //$.when(getAreas()).then(getLocations()).then(getRequestType()).then(initForm(id_request));
                //$.when(getAreas(),getLocations(),getRequestType()).then(function(a,b,c){alert("ee");initForm(id_request)});
                initForm(id_request);

            });
        },
        addTool:function(){
            addRowTableTool();
        },
        
        initFormAct2:function(){
            initFormAct2()
        },

        initFormAct3:function(id_request){
            $("#body_form_request_register").load('form/form_activity_03_edit.html', function(){
                initFormAct3(id_request);                
            });
        },
        viewForm:function(id_request){
            $("#modal_show_request_details").load('view/externalAccessRequestEdit.html', function(){
                //$.when(getAreas()).then(getLocations()).then(getRequestType()).then(initForm(id_request));
                $("#lateralContent").removeClass('lateralContent');
                initForm(id_request);
            });
        },
        initEditCompany:function(){
            initEditCompany()
        },
        initListPerson: function(){

            initListPerson();
            getExternalCompany(true); 
        },
        initEditPerson: function(id_person){
            $("#modal_show_person_details").load('view/externalAccessRequestEditPerson.html', function(){
                initEditPerson(id_person,0,0);               
            });   
        },
        initProfile: function(){
                var id_user = getCookie("vtas_id"+sessionStorage.tabVisitasa);
                initEditPerson(0,id_user,1);                  
        }
    }
}();