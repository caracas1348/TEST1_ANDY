var jsonExternalCompany =[];
var jsonExternalCompanySelected =[];
var jsonExternalCompanyAuto =[];
var arrayExternalCompanySelected = [];
var positionAddCompany = "";
var hid_row_id_visitaglobal;
var vw_access_request = function(){
    
    var init = function(){
        $("#sel_location").change(function(){            
            var val = $(this).val();
            //alert(val);
            getAreas(val);
        });
        $("#bt_register_visita").click(function(){
            confirmRegister();
        });
        $("#bt_register_visita_aprove").click(function(){
            confirmRegister('aprobar');
        });
        $('#tx_business_provider_flag').bootstrapToggle();
        $('#tx_business_client_flag').bootstrapToggle();     
        //cargamos el formulario para registrar el itineraroi, partisipantes, vehículo y herramientas          
        var form        = 'form_activity_03.html';//formulario
        var idContent   = "body_form_request_register";//lugar de carga
        var url         = 'form/'+form;
        var id          = 'formAccessRequestRegisterAct3';
        handlerUrlhtml(idContent,url,id);
        getCollaborator();
        //-------------------------------------------------------------------------
       //verificamos el el tipo de actividad
        if($("#hid_type_access_request").val()=="1"){
            /*$(".gp_particular").show();            
            $("#sel_visita_particular").change(function(){
                var isParticular    = $(this).val();
                if (isParticular=="1") {
                    $(".no-particular").show();
                }else{
                    $(".no-particular").hide();
                }
            });*/
            //alert("ssss");
            /*$("#chb_Visita_Particular").click(function(){
                var status = this.checked;
                if (status==false) {
                    $(".no-particular").show();
                }else{
                    $(".no-particular").hide();
                }

            })*/
        }
        if($("#hid_type_access_request").val()=="3"){
            $(".gp_proveedor").show();
            $(".gp_visita").show();
        }
        if($("#hid_type_access_request").val()!="3"){
            $(".gp_proveedor").hide();
            $(".gp_visita").show();
            $("#chb_OC_Emergencia").prop( "checked", false );                
            $("#txt_order_compra_id").val("0");
            $("#txt_order_compra_text").val("");
        }
        $('#modalAddCompany').on('shown.bs.modal', function (e) {
            $("#tx_user_responsable").blur(function(){
                var value = $(this).val();
                findUser(value);
            });    
        });

        $("#tx_business_dni").keyup(function(){   
            var val = $(this).val();
            $("#tx_user_pass_1").val(val);
            $("#tx_user_pass_2").val(val);
        });
        
        /*
        $("#sel_request_type").change(function(){
            var form        = $(this).find(':selected').attr('data-form');
            var val         = $(this).val();
            if(val == "3"){
                $(".gp_proveedor").show();
                $(".gp_visita").hide();
            }
            else{
                $(".gp_proveedor").hide();
                $(".gp_visita").show();
                $("#chb_OC_Emergencia").prop( "checked", false );                
                $("#txt_order_compra_id").val("0");
                $("#txt_order_compra_text").val("");
            }
        });*/
        //$('.mdb-select').materialSelect();

        //$('body').materializeInputs();
        //$('body').bootstrapMaterialDesign();
        $("#fm_visita").bootstrapMaterialDesign();

        if(getCookie("vtas_id_hash"+sessionStorage.tabVisitasa).length<15)//si es usuario interno como colaborador
        {
            $("#txt_collaborator").val(toCapitalize(getCookie("vtas_fullname"+sessionStorage.tabVisitasa)))
            $("#txt_collaborator_id").val('7bffd03f-0f6a-4647-8d91-460cf010952c')
        }
        else{//setea los datos del colaborador logueado
            $("#txt_collaborator").val(getCookie("vtas_fullname"+sessionStorage.tabVisitasa))
            $("#txt_collaborator_id").val(getCookie("vtas_id_hash"+sessionStorage.tabVisitasa))
        }
        
       /*  setCookie("vtas_id_hash"+data.idhash, data.idhash, 365);
        setCookie("vtas_person_id"+data.idhash, data.person_id, 365);
        setCookie("vtas_fullname"+data.idhash, data.fullusername, 365); */

    }

    var findUser = function(val){        
        var url = apiurlsecurity+"/api/Get-UserExt-All?code="+GetUserExtAll+"&search_type=1&httpmethod=object&username="+val;                   
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
            var req = data;
            console.log(req.id);
            if(req.id){
                $("#help_user_responsable").text("El nombre de usuario existe, coloque otro usuario");
                $("#tx_user_responsable").val("");
            }
            else{
                $("#help_user_responsable").text("");
            }
        });
    }
    var initForm = function(){
        //alert("ssss");       
        //var id          = 'formAccessRequestRegister';          
        //handlerUrlhtml(idContent,url,id);
        $("#btAccessRetorneList").click(function(){
            handlerUrlhtml('contentGlobal','view/externalAccessRequestList.html','externalAccessRequestList');    
        });
        $("#bt_add_row_participante").click(function(){ 
            //alert("ssss");       
            addRowTableParticipante();
        });

        

        ///onclick="vw_access_request.addVehicle()"

        $("[name='btAddCompany']").click(function(){   
            var id = $(this).attr("id");
            var array =id.split("_");
            positionAddCompany = array[1];
        });
        var flagActualizarSelectCompany = true; 
        getExternalCompany(flagActualizarSelectCompany); 
        //$("#div_important").hide();
        //$(".dv_itinerary").show();
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

       // $(".dv_itinerary").hide();

        var flagActualizarSelectCompany = true; 
        getExternalCompany(flagActualizarSelectCompany); 
        
    }


    var initFormAct3 = function(){
       //alert("form 3");
       $("#fm_itinerary").bootstrapMaterialDesign();
       $("#fm_participante_1").bootstrapMaterialDesign();       
        //$(".dv_itinerary").hide();
        $("#btAccessRetorneList").click(function(){
            handlerUrlhtml('contentGlobal','view/accessRequestList.html','accessRequestList');
            //handlerUrlhtml('contentGlobal','view/externalAccessRequestList.html','externalAccessRequestList');    
        });
        //addRowVehicle
        //$("#div_important").show();
        $("#bt_add_row_tool").click(function(){         
            addRowTableTool();
        });
        $("[name='btAddCompany']").click(function(){   
            var id = $(this).attr("id");
            //alert(id);
            var array =id.split("_");
            positionAddCompany = array[1];
        });

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
            step:30
        });

        $("#tx_time_end").datetimepicker({
            datepicker:false,
            format:'H:i',
            formatTime:'H:i',
            step:30
        });

        $("#bt_add_row_vehicle").click(function(){         
            addRowVehicle();
        });
        //auto complete materiales
        var objTool         = $("#add_goods_tools");
        var objHiddenTool   = $("#add_goods_tools_id"); 
        getMaterialGoodsTools(objTool,objHiddenTool);
        //auto complete email
        var inputEmail = $("#add_correo_1");
        getEmail(inputEmail,1);

        var inputDni = $("#add_dni_1");       
        checkPersonExist(inputDni,1);        
        getDocumento(inputDni,1);
        verifyOisBlacklist(inputDni,1);
        //------------------------------

        var flagActualizarSelectCompany = true; 
        getExternalCompany(flagActualizarSelectCompany); 
        //$('body').materializeInputs();        
        $("#bt_add_row_participante").click(function(){       
            addRowTableParticipante();
        });
        
        /*var inputCompany = $("#sel_company_1");
        autoCompleteCompany(inputCompany,1);*/

        $("#sel_company_1").change(function(){
            // console.log($(this).val(),$(this).select2('data')[0]['text']);
            //console.log($(this).val(),$(this).find(':selected').text());
            jsonExternalCompanySelected=[];
            /*var json = {
                text:$(this).select2('data')[0]['text'],
                val:$(this).val()
            }*/
            /*var emailCompany        = $(this).find(':selected').attr('data-email');
            $("#add_correo_company_1").val(emailCompany);*/

            fnGetUserPersonResponsable($(this).val(),1);
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
            updateSelectExternalCompanyVehicle();
            updateSelectExternalCompanyTool();
            updateListCompanySelect();
        });
        
        $("#add_correo_company_1").blur(function(){
            var email = $(this).val();
            fnAddExternalCompanySelected(email,1);
        });

        

        $("#bt_delete_row_participante").click(function(){      
            //$("#sel_company_1").val("0");
            //$("#sel_company_1").trigger('change');
            $("#add_dni_1").val("");
            $("#add_contacto_nombre_1").val("");
            $("#add_contacto_apellido_1").val("");
            $("#add_correo_1").val("");
            var stop = 0;
            /*if(jsonExternalCompanySelected.length>1){

                jsonExternalCompanySelected=[];
                $("#list_participantes form").each(function(){                                    
                    $(this).find('.external-company').each(function(){    
                        console.log($(this).select2('data')[0]['text']);
                        var json = {
                            text:$(this).select2('data')[0]['text'],
                            val:$(this).val()
                        }
                        $.each(jsonExternalCompanySelected, function(i, v) {
                            console.log(v.val +"==" +json.val);
                            if (v.val == json.val) {
                                stop = 1;
                                return;
                            }
                        });
                        if(stop==0)
                            jsonExternalCompanySelected.push(json);
                    });
                });
                
            }*/
            
            
        });

        if($("#hid_type_access_request").val()=="1"){
            //alert("aquíii");
            $(".gp_particular").show();
            $("#sel_visita_particular").change(function(){
                var isParticular    = $(this).val();
                if (isParticular=="0") {
                    $(".no-particular").show();
                }else{
                    $(".no-particular").hide();
                }
            });
            /*$("#chb_Visita_Particular").click(function(){
                var status = this.checked;
                if (status==false) {
                    $(".no-particular").show();
                }else{
                    $(".no-particular").hide();
                }

            })*/
        }
        if($("#hid_type_access_request").val()=="2"){//contratista
            $("#bt_import_file").show();
        };
        if($("#hid_type_access_request").val()!="2"){//contratista
            $("#bt_import_file").hide();
        };
    }

    var fnAddExternalCompanySelected = function(email,pos){
        arrayExternalCompanySelected[pos-1]="";
        $("#span_email_invitation").html("");
        var stop = 0;
        $.each(arrayExternalCompanySelected, function(i, v) {    
            console.log(i, v);
            if (v == email) {
                stop = 1;
                return;
            }
        });
        if(stop==0){
            arrayExternalCompanySelected[pos-1] = email;
            //arrayExternalCompanySelected.push();
        }
        $("#span_email_invitation").html(arrayExternalCompanySelected.toString());                    
    }

    var fnGetUserPersonResponsable = function(id,pos){       
        var attribute1 =  "4";
        //var url = "https://s3cur17y7454-prd-access-security.azurewebsites.net/api/Get-UserExt-All?code=SasBbPQ8/13Rs8Me4jEgPbna6gFa1T8ycey2HTkgKdFF7kPfIOwSxA==
        var url = apiurlsecurity+"/api/Get-UserExt-All?httpmethod=objectuserperson&attribute1="+attribute1+"&id_external_company="+id+"&code="+GetUserExtAll+"";                   
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
            var email = data.email?data.email:"";
            $("#add_correo_company_"+pos).val(email);
            fnAddExternalCompanySelected(email,pos);
        });
    }


    var getAreas = function(val){
        $("#sel_area").html("");
        $("#sel_area").append("<option value='-1'>Cargando...</option>");
        var url = apiurlaccessrequest+"/api/Get-Area-All?httpmethod=objectlist&id_location="+val+"&code="+GetAreaAll+"";                   
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
            data.map(function(item){
                option="<option value='"+item.id+"'>"+item.name+"</option>";
                obj.append(option);
            });
        });
    }

    var getRequestType = function(){
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
        });
    }

    var getLocations= function(){ 
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
            if(getCookie("vtas_sede"+sessionStorage.tabVisitasa)!=""){

                $("#sel_location").val(getCookie("vtas_sede"+sessionStorage.tabVisitasa));
                getAreas($("#sel_location").val());
            }
            
        });
    }

    var getExternalCompany= function(flag){
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
            console.log(data);
            jsonExternalCompany=[];
            jsonExternalCompanyAuto =[];
            data.map(function(item){
                jsonExternalCompany.push(item); 
                jsonExternalCompanyAuto.push({label:item.name,value:item.name,id:item.id,email:item.email});          
            });
            if(flag){
                updateSelectExternalCompany();
                /*updateSelectExternalCompanyTool();
                updateSelectExternalCompanyVehicle();*/
                updateSelectExternalCompanyPerson();
                /*var inputCompany = $("#sel_company_1");
                autoCompleteCompany(inputCompany,1);*/
            }
        });
    }

    var updateSelectExternalCompany = function(pos){
        var option = "";
        option+="<option value='0'></option>";
        jsonExternalCompany.map(function(item){
            var email = item.email?item.email:"";
            option+="<option data-email='"+email+"' value='"+item.id+"'>"+toCapitalize(item.name)+"</option>";
        });
        $("#list_participantes form").each(function(){                                    
             $(this).find('.external-company').each(function(){    
                 //if(!$(this).val()){
                    //var idinput=$(this).attr("id");
                    if(pos){
                        $("#sel_company_"+pos).html(option); $("#sel_company_"+pos).select2({language: {
                            noResults: function() {
                              return "No hay resultado";        
                            },
                            searching: function() {
                              return "Buscando..";
                            }
                          }}
                          );
                    }
                    else{
                       $(this).html(option);  $(this).select2({language: {
                        noResults: function() {
                          return "No hay resultado";        
                        },
                        searching: function() {
                          return "Buscando..";
                        }
                      }});
                    }
                 //}

             });
        });
    }

    
   

    var confirmRegister = function(action)
    {
        var warning         = 0;
        var message         = "";
        var sede            = $("#sel_location").val();
        var area            = $("#sel_area").val();
        var colaborador     = $("#txt_collaborator_id").val();
        var fecha_inicio    = $("#tx_date_start").val();
        var hora_inicio     = $("#tx_time_start").val();
        var fecha_final     = $("#tx_date_end").val();
        var hora_final      = $("#tx_time_end").val(); 
        var tema            = $("#tx_rejection_reason").val();
        var quantity        = $("#tx_quantity").val();       
        var check_itinerario= 0;
        var i=0;

        var array1 = fecha_inicio.split("/");
        var array2 = fecha_final.split("/");
        var fecha1 = moment(array1[2]+"-"+array1[1]+"-"+array1[0])
        var fecha2 = moment(array2[2]+"-"+array2[1]+"-"+array2[0])    
        var diasDiff =    fecha2.diff(fecha1, 'days')+1;
        var cantDayActive = 0;
        //console.log(arrayExternalCompanySelected);
        //var aaaa = moment(fecha_inicio,'YYYY-MM-DD').diff(fecha_final,'YYYY-MM-DD');
        //console.log(fecha1,fecha2,fecha2.diff(fecha1, 'days'), ' dias de diferencia',aaaa);   
        
        $("#list_participantes form").each(function(){   
           var checkNombre      =false;
           var checkApellido    =false;
           var checkDni         =false;
           var i = 0;
            $(this).find('.form-control').each(function(){                                
                var value = $(this).val(); 
                /*if(i==1 && value.trim().length>0 ){//es nombre
                    checkDni =true;
                }*/
                if(i==4 && value.trim().length>0 ){//es nombre
                    checkNombre =true;
                }
                if(i==5 && value.trim().length>0 ){//es apllido
                    checkApellido = true;
                }
                if(i==6 && (checkNombre || checkApellido) && value.trim().length==0){//correo
                    warning = true;
                    message = "Existe participante sin email. Debes agregarle una dirección de correo";
                }
                i++;
            });
        });


        $("#list_tools form").each(function(){   
            var herramienta     = false;
            var serie           = false;
            var i               = 0;            
            $(this).find('.form-control').each(function(){
                 var value = $(this).val();
                 if(i==2 && value===""){//es nombre
                    warning = true;
                    message = "Debes ingresar el nombre de la herramienta";
                 }
                 i++;
             });
         });


        if($("#ch_itinirary_do").is(':checked')){
            check_itinerario= 1;
            cantDayActive++;
        }
        if($("#ch_itinirary_lu").is(':checked')){
            check_itinerario= 1;
            cantDayActive++;
        }
        if($("#ch_itinirary_ma").is(':checked')){
            check_itinerario= 1;
            cantDayActive++;
        }
        if($("#ch_itinirary_mi").is(':checked')){
            check_itinerario= 1;
            cantDayActive++;
        }
        if($("#ch_itinirary_ju").is(':checked')){
            check_itinerario= 1;
            cantDayActive++;
        }
        if($("#ch_itinirary_vi").is(':checked')){
            check_itinerario= 1;
            cantDayActive++;1
        }
        if($("#ch_itinirary_sa").is(':checked')){
            check_itinerario= 1;
            cantDayActive++;
        }
        if(sede=="0"){
            warning = 1;
            message = "Debes seleccionar la sede";
        }
        else if(area=="0"){
            warning = 1;
            message = "Debes seleccionar el área";
        }
        else if(colaborador==""){
            warning = 1;
            message = "Debes seleccionar el colaborador ";
        }
        else if(tema==""){
            warning = 1;
            message = "Debes seleccionar el motivo del ingreso ";
        }
        else if(fecha_inicio.trim().length==0){
            warning = 1;
            message = "Debes insertar la fecha de inicio";
        }
        else if(hora_inicio.trim().length==0){
            warning = 1;
            message = "Debes insertar la hora de inicio";
        }
        else if(fecha_final.trim().length==0){
            warning = 1;
            message = "Debes insertar la fecha final";
        }
        else if(hora_final.trim().length==0){
            warning = 1;
            message = "Debes insertar la hora final";
        }
        else if(check_itinerario==0){
            warning = 1;
            message = "Debe seleccionar el o los días dentro del rango que requiere el ingreso";
        }
        /*else if(quantity=="" || quantity==0){
            warning = 1;
            message = "Debe ingresar la cantidad de participantes por empresa."
        }*/
        if(validateDateItinerario('tx_date_start','tx_time_start','tx_date_end','tx_time_end')==false)
        return

        
        console.log(cantDayActive +" - "+ diasDiff);
        if(/* cantDayActive<diasDiff ||  */cantDayActive>diasDiff){
            warning = 1;
            message = "La cantidad de días entre la fecha inicio y fin no concide con los días seccionados. Verifique";
        }
        if(warning==1){
            swal("Error",message,"error");//warning
        }

        
        
        else{
            swal({
                title: "Registro de Datos de Ingreso",
                text: "¿Seguro que desea enviar el formulario?",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger btn-sm",
                confirmButtonText: "Si",
                cancelButtonText: "No",
                closeOnConfirm: true,
                showLoaderOnConfirm: true
            },
            function(){
                register(action);            
            });
        }
    }

    var register = function(action)
    {

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

        },800)

            
        
        var body                = {}
        var location            = $("#sel_location").val();//
        var area                = $("#sel_area").val();//
        var dateStart           = moment($("#tx_date_start").val(),"DD-MM-YYYY").format("YYYY-MM-DD");
        var dateEnd             = moment($("#tx_date_end").val(),"DD-MM-YYYY").format("YYYY-MM-DD");//dateStart//por ahora la misma que start
        var timeStart           = moment(dateStart+' '+ $("#tx_time_start").val(),"YYYY-MM-DD hh:mm a").format("YYYY-MM-DD HH:mm");//2020-02-29 11:00
        var timeEnd             = moment(dateEnd+' '+ $("#tx_time_end").val(),"YYYY-MM-DD hh:mm a").format("YYYY-MM-DD HH:mm");//2020-02-29 11:00
        var idOC                = $("#txt_order_compra_id").val();
        var nameOC              = $("#txt_order_compra_text").val();
        var aroc              = $("#txt_aroc").val();       
        var ocEmergencia        = $("#chb_OC_Emergencia").prop("checked");
        
        var frequency           = $("#sel_frequency").val();
        //console.log(dateStart,dateEnd,timeStart,timeEnd);
        var colaborador         = $("#txt_collaborator_id").val();//
        var nameColaborador     = $("#txt_collaborator").val();
        var emailColaborador    = $("#hid_email_colaborador").val();//
        //var materialGoodsTools  = "";//convertir en texto
        var authorizedPersons   = []; //realizar map para agregar los participantes en la colección de objeto
        var authorizedVehicles  = []; //realizar map para agregar los vehicle en la colección de objeto
        var materialGoodsTools  = []; //realizar map para agregar los tool en la colección de objeto
        var rejectionReason     = $("#tx_rejection_reason").val();//
        var anonymousAccessToken= $("#hid_anonymous_access_token").val();
        var createdBy           = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);//$("#hid_name_user").val();//nombre del usuario logueado        
        var requesttype         = $("#hid_type_access_request").val();//$("#sel_request_type").val();        
        var status              = action?3:1;//si el action existe es para aprobar directamente
        var accessTime          = timeStart
        var exitTime            = timeEnd;//2020-02-29 14:00           
        var enableDays          = []; //obtenerlo con moment por la fecha de la visita        
        var enabled_sun_day     = $("#ch_itinirary_do").is(':checked');//activar el día, domingo
        var enabled_mon_day    = $("#ch_itinirary_lu").is(':checked');//activar el día, lunes
        var enabled_wednes_days = $("#ch_itinirary_mi").is(':checked');//activar el día, martes
        var enabled_thurs_day   = $("#ch_itinirary_ju").is(':checked');//activar el día, miercoles
        var enabled_fri_days    = $("#ch_itinirary_vi").is(':checked');//activar el día, jueves
        var enabled_satur_day   = $("#ch_itinirary_sa").is(':checked');//activar el día, viernes
        var enabled_tues_day    = $("#ch_itinirary_ma").is(':checked');//activar el día, s{abado
        var quantity            = $("#tx_quantity").val();  
        //var isParticular = $("#chb_Visita_Particular").prop('checked');
        var isParticular    = false;
        if($("#sel_visita_particular").val()=="1")
            isParticular    = true;
        var perfil = getCookie("vtas_perfil"+sessionStorage.tabVisitasa);
        
        if($("#ch_itinirary_do").is(':checked')){
            enableDays.push(0);
        }
        if($("#ch_itinirary_lu").is(':checked')){
            enableDays.push(1);
        }
        if($("#ch_itinirary_ma").is(':checked')){
            enableDays.push(2);
        }
        if($("#ch_itinirary_mi").is(':checked')){
            enableDays.push(3);
        }
        if($("#ch_itinirary_ju").is(':checked')){
            enableDays.push(4);
        }
        if($("#ch_itinirary_vi").is(':checked')){
            enableDays.push(5);
        }
        if($("#ch_itinirary_sa").is(':checked')){
            enableDays.push(6);
        }
        var enabledDaysTxt = enableDays.toString();
        //return;
        //
        //recorro el formulario de participante
        
        $("#list_participantes form").each(function(){            
           var partipante = {}
           var values = [];
           var name_company = "";
           var i = 0;
            $(this).find('.form-control').each(function(){                
                //var idinput=$(this).attr("id");
                i++;
                if(i==1)
                    name_company = $("#sel_company_"+i+" option:selected").text();
                var value = $(this).val(); 
                values.push(value);
                
            });
            partipante ={
                "external_company":values[0]   
                ,"correo_external_company":values[1]
                ,"name_external_company":name_company
                ,"affidavit":0
                ,"first_name":toCapitalize(values[4])
                ,"last_name":toCapitalize(values[5])
                ,"identity_document":values[3]//values[3]// si es 0 es particular y si no es persona con empresa
                ,"identity_document_type":values[2]
                ,"email":values[6]
                ,"covid_test":values[7]
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
             $(this).find('.form-control').each(function(){
                var value = $(this).val(); 
                values.push(value);
             });
             vehicle ={
                "id_vehicle":"0"
                ,"id_company":values[0]
                ,"driver_driver":toCapitalize(values[1])
                ,"license_plate":values[2]
                ,"driver_brand":values[3]
                ,"driver_model":values[4] 
                ,"driver_license_number":values[5]
                ,"driver_license_category":values[6]              
                ,"attribute1":values[7]?values[7]:""
                ,"attribute2":""
                ,"attribute3":""
                ,"attribute4":""
                ,"attribute5":""
             }
             authorizedVehicles.push(vehicle);
         });

         $("#list_tools form").each(function(){            
            var tools = {}
            var values = [];
             $(this).find('.form-control').each(function(){                
                var idinput = $(this).attr("id");
                var value   = $(this).val(); 
                //console.log(value,idinput);
                values.push(value);
             });
             tools ={                
                "id_company":values[0]                 
                ,"id_material_goods_tool":values[1] 
                ,"text_material_goods_tool":values[2]
                ,"serie_number":values[3]
             }  
             materialGoodsTools.push(tools);
            
         });

        body = {
            "id_area": area,
            "id_external_company":0,//no se está aplicando
            "id_oc" : idOC,
            "name_oc":nameOC,
            "emergency_work": ocEmergencia,
            //"name_collaborator":nameColaborador,
            "id_collaborator": colaborador,
            "material_goods_tools": materialGoodsTools,
            "email_responsible_contact": emailColaborador,
            "data_supervisor_contact": toCapitalize(nameColaborador),
            "authorized_persons": authorizedPersons,
            "authorized_vehicles" :authorizedVehicles,
            "rejection_reason": "",
            "anonymous_access_token": anonymousAccessToken,
            "created_by": createdBy,
            "last_updated_by": createdBy, //
            "status":status,//
            "attribute1": "",//por ahora en blanco
            "attribute2": "",//por ahora en blanco 
            "attribute3": "",//por ahora en blanco 
            "attribute4": "",//por ahora en blanco 
            "attribute5": "",//por ahora en blanco 
            "id_request_type":requesttype,//lo marca como temporal si es 1
            "start_date":dateStart,//
            "start_date_txt":dateStart,//no va
            "end_date":dateEnd,// la misma que la de start
            "access_time":accessTime,
            "exit_time":exitTime,
            "reason":rejectionReason==""?(dateStart+' '+accessTime):rejectionReason,//
            "enabled_days":enabledDaysTxt,
            "enabled_mon_day":enabled_mon_day,
            "enabled_tues_day":enabled_tues_day,
            "enabled_wednes_days":enabled_wednes_days,
            "enabled_thurs_day":enabled_thurs_day,
            "enabled_fri_days":enabled_fri_days,
            "enabled_satur_day":enabled_satur_day,
            "enabled_sun_day":enabled_sun_day,
            "quantity": quantity,
            "isParticular": isParticular,
            "isTemporal": isTemporalRequest,//indica si la visita es temporal o no
            "location":location,
            "user_name_solicitud":getCookie('vtas_fullname'+sessionStorage.tabVisitasa),
            "name_area": $("#sel_area option:selected").text(),
            "name_location": $("#sel_location option:selected").text()
        }
      
        var url = apiurlaccessrequest+"/api/Post-AccessRequestFull-All?code="+PostAccessRequestFullAll+"&httpmethod=post";                   
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
                text: "Proceso realizado con éxito.",
                type: "success",
                timer:2000,
                showCancelButton: false,
                confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
                confirmButtonText: "De acuerdo",
                closeOnConfirm: false
              });
              $("#titleModule").text("Ingresos solicitados"); 
            },500)
                    

            //nos vamos para la lsita
            handlerUrlhtml('contentGlobal','view/accessRequestList.html','accessRequestList',requesttype,1);

           
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            swal("Error!", "Se produjo un problema al momento de registrar el ingreso.", "error");
        });
        //console.log(body);
    }

    var addRowTableParticipante = function(){

       
        var isParticular    = false;
        if($("#sel_visita_particular").val()=="1")
            isParticular    = true;
        
       var showCompany = '';     
       if(isParticular){showCompany = 'style="display: none;"';}


       var i = $("#list_participantes").find("div.bd-callout").length;//numero de filas       
       i++;
       
        var html= `<div class="bd-callout" id="bd-callout_participante_${i}" style="padding: 0.25rem!important;margin-top: 0.25rem!important;margin-left: -1.25rem !important;">
                    <form id="fm_participante_${i}" name="fm_participante_${i}" class="form-row ml-3" style="margin-bottom: 0.125rem!important;">
                        <div class="form-group  col-md-2 col-lg-2 no-particular" ${showCompany}>  
                            <label for="sel_company_${i}" class="bmd-label-static titleInput" >EMPRESA <span class="text-warning">*</span></label>                      
                            <select  name="sel_company_${i}" class="form-control  external-company" id="sel_company_${i}" onChange="validateFieldMinForm()" required>                        
                            </select>
                            <div id="" class="form-text text-muted"><button type="button" style="border-radius: 25px;" class="btn btn-raised btn-sx btn-green-lime btn-rounded " id="btAddCompany_1" name="btAddCompany" onclick="" data-toggle="modal" data-target="#modalAddCompany" >Agregar Empresa</button> </div>
                        </div>

                        <div class="form-group col-md-1 col-lg-1">
                            <label for="add_correo_company_${i}" class="bmd-label-static titleInput">CORREO</label> 
                            <input type="email" class="form-control" id="add_correo_company_${i}" onkeyup="validateFieldMinForm()">     
                            <small id="" class="form-text text-muted">Correo del Responsable</small>                                       
                        </div>

                        <div class="form-group col-md-1 bmd-form-group is-filled">
                            <label for="tx_business_dni" class="bmd-label-static titleInput">TIPO</label>              
                            <select class="form-control" id="sel_identity_document_type_${i}" name="sel_identity_document_type_${i}">
                                <option value="DNI">DNI</option>
                                <option value="CE">CE</option>
                                <option value="PASAPORTE">PASAPORTE</option>
                            </select>
                        </div>
                        <div class="form-group  col-md-1 col-lg-1">  
                            <label for="add_dni_${i}"  class="bmd-label-static titleInput">PARTICIPANTE</label>                      
                            <input type="text" class="form-control" id="add_dni_${i}" onblur="addDriverToVehicle('sel_person_vehicle_${i}')" onkeyup="validateFieldMinForm()">                    
                            <small id="" class="form-text text-muted">Documento</small>
                        </div>
                        <div class="form-group  col-md-2 col-lg-2">  
                            <!--<label for="add_contacto_nombre_${i}"  class="bmd-label-static titleInput">PARTICIPANTE</label> -->
                            <input type="text" class="form-control" id="add_contacto_nombre_${i}" onblur="addDriverToVehicle('sel_person_vehicle_${i}')" onkeyup="validateFieldMinForm()" >                    
                            <small id="" class="form-text text-muted">Nombres</small>
                        </div>
                        <div class="form-group col-md-2 col-lg-2">
                            <input type="text" class="form-control" id="add_contacto_apellido_${i}" onblur="addDriverToVehicle('sel_person_vehicle_${i}')" onkeyup="validateFieldMinForm()">
                            <small id="" class="form-text text-muted">Apellidos</small>
                        </div>
                       
                        <div class="form-group col-md-2 col-lg-2">
                            <label for="add_correo_${i}" class="bmd-label-static titleInput">CORREO</label> 
                            <input type="email" class="form-control" id="add_correo_${i}" onblur="addDriverToVehicle('sel_person_vehicle_${i}')" onkeyup="validateFieldMinForm()">                                           
                            <small id="" class="form-text text-muted">Correo del Participante</small>
                        </div>
                        <input type="hidden" class="form-control" id="add_covid_test_${i}">
                        <!-- <div class="col-md-2 col-lg-2"></div>-->
                        <div class="form-group  col-md-1 col-lg-1 text-center align-middle pt-4 mt-3 mb-3 border-left">
                            <div id="bt_delete_row_participante_${i}" style="cursor: pointer;">
                                <img src="images/iconos/trash.svg" class="" >                    
                                <small id="passwordHelpBlock" class="form-text text-muted">Eliminar</small>
                            </div>
                        </div>                      
                    </form>
                </div>`;
        $("#list_participantes").append(html);
        $("#fm_participante_"+i).bootstrapMaterialDesign();
        updateSelectExternalCompany(i);
        $("#cant_row_persona").html(i);
        $("#bt_delete_row_participante_"+i).click(function(){      
            var id  = 'bd-callout_participante_'+i;
            var obj = $("#"+id);
            removeRowParticipante(obj);
            $("#cant_row_persona").html($("#list_participantes").find("div.bd-callout").length);
        });

        $("[name='btAddCompany']").click(function(){   
            var id = $(this).attr("id");
            //alert(id);
            var array =id.split("_");
            positionAddCompany = array[1];
        });  

        var inputEmail = $("#add_correo_"+i);
        getEmail(inputEmail,i);

        var inputDni = $("#add_dni_"+i);
        getDocumento(inputDni,i);
        checkPersonExist(inputDni,i); 
        verifyOisBlacklist(inputDni,i);
;
       $("#sel_company_"+i).change(function(){
            //$(this).find(':selected').attr('data-email');
            var id = $(this).attr("id");
            var arrayP = id.split("_");
            var pos = arrayP[2];
            /*var emailCompany        = $(this).find(':selected').attr('data-email');
            $("#add_correo_company_"+pos).val(emailCompany);*/
            fnGetUserPersonResponsable($(this).val(),i);
            updateListCompanySelect();
        });

        $("#add_correo_company_"+i).blur(function(){
            var email = $(this).val();
            fnAddExternalCompanySelected(email,i);
        });

        validateFieldMinForm();
    }

    var verifyOisBlacklist = function (inputDni,i){
        inputDni.blur(function(){
            validateFieldMinForm();
            vt_validateSecury(inputDni.val(),'visita','',$("#hid_type_access_request").val(),inputDni,i);
            return
            var vehicles = $(".vehiculo");
            var identity_document = inputDni.val();
           
            if (identity_document != "") {
            var url = apiurlblacklist+"/api/Get-Blacklist-User?code="+getblacklistusercode+"&httpmethod=verifyblacklist&identity_document="+identity_document;                   
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
               
                if (data.vetado == 1) {
                    inputDni.val('');
                     $("#add_contacto_nombre_"+i).val('');
                     $("#add_contacto_apellido_"+i).val('');
                     $("#add_correo_"+i).val('');
                     swal("Acceso Denegado!", "Esta persona se encuentra en Lista Negra.", "error");

                }else{
                    var tipo = $("#hid_type_access_request").val();
                    
                    if (tipo == 2) {//TENÍA DISTINTO A 1
                        var identity_document = inputDni.val().trim();
                        var url = apiurlsecurity+"/api/Get-OIS?code="+GetOIS+"&httpmethod=object&dni="+identity_document.trim();                   
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

                            data =  JSON.parse(data);

                            if (data.code != null) {
                                if (data.enabled_status == false) {
                                    swal("Error!", "Ese usuario no está habilitado en OIS.", "error");
                                    inputDni.val('');
                                     $("#add_contacto_nombre_"+i).val('');
                                     $("#add_contacto_apellido_"+i).val('');
                                     $("#add_correo_"+i).val('');
                                }else{
                                    if (data != null) {
                                        vehicles.append('<option data-nuevo="1" value="'+identity_document+'">'+$("#add_contacto_nombre_"+i).val()+' '+$("#add_contacto_apellido_"+i).val()+'</option>');
                                    }

                                }
                            }else{
                                swal("Acceso Denegado.", "No cuenta con validación OIS", "error");
                                inputDni.val('');
                                 $("#add_contacto_nombre_"+i).val('');
                                 $("#add_contacto_apellido_"+i).val('');
                                 $("#add_correo_"+i).val(''); 
                            }


                        }).fail( function( jqXHR, textStatus, errorThrown ) {

                        });
                    }else{
                      
                        if (data.id > 0) {
                        vehicles.append('<option data-nuevo="1" value="'+identity_document+'">'+$("#add_contacto_nombre_"+i).val()+' '+$("#add_contacto_apellido_"+i).val()+'</option>');
                        }
                    }

                }


            }).fail( function( jqXHR, textStatus, errorThrown ) {

            });
            }


        });
    }
    var addRowTableTool = function(){
       //var isParticular = $("#chb_Visita_Particular").prop('checked');
       var isParticular    = false;
        if($("#sel_visita_particular").val()=="1")
            isParticular    = true;
        
       var showCompany = '';     
       if(isParticular){showCompany = 'style="display: none;"';}


        var i = $("#list_tools").find("div.bd-callout").length;//numero de filas
        i++;
        var html = `<div class="bd-callout" id="bd-callout_tool_${i}" style="padding: 0.25rem!important;margin-top: 0.25rem!important;margin-bottom: 0.25rem!important;margin-left: -1.25rem !important;">
                        <form id="fm_tool_${i}" name="fm_tool_${i}" class="form-row ml-3" style="margin-bottom: 0.125rem!important;">
                            <div class="form-group col-md-2 col-lg-2 no-particular" ${showCompany}>  
                                <label for="sel_company_tool_${i}" class="bmd-label-static titleInput">Empresa <span class="text-warning">*</span></label>                      
                                <select  name="sel_company_tool_${i}" class="form-control  external-company-tool" id="sel_company_tool_${i}" required>                        
                                </select>
                                <small id="" class="form-text text-muted">&nbsp;</small>
                            </div>
                            <div class="form-group col-md-5 col-lg-5">
                                <label for="add_goods_tools" class="bmd-label-static titleInput">Herramienta <span class="text-warning">*</span></label> 
                                <input type="hidden" class="form-control"  id="add_goods_tools_id_${i}" value="0" > 
                                <input type="text" class="form-control" id="add_goods_tools_${i}" >                        
                            </div>
                            <div class="form-group col-md-3 col-lg-3">       
                                <label for="add_serial_number_${i}" class="bmd-label-static titleInput">Número de Serie</label>                 
                                <input type="text" class="form-control" id="add_serial_number_${i}">
                            </div>
                            
                            <div class="form-group col-md-1 col-lg-1">       
                                &nbsp;
                            </div>
                            
                            <div class="form-group  col-md-1 col-lg-1 text-center align-middle pt-4 mt-3 mb-3 border-left">
                                <div id="bt_delete_tool_${i}" style="cursor: pointer;">
                                    <img src="images/iconos/trash.svg" class="" >                    
                                    <small id="passwordHelpBlock" class="form-text text-muted">Eliminar</small>
                                </div>
                            </div>
                        </form>
                    </div>`;
        
         $("#list_tools").append(html);
         $("#fm_tool_"+i).bootstrapMaterialDesign();
         updateSelectExternalCompanyTool(i);
         $("#cant_row_tool").html(i);
         $("#bt_delete_tool_"+i).click(function(){      
            var id  = 'bd-callout_tool_'+i;
            var obj = $("#"+id);
            removeRowTool(obj);
            $("#cant_row_tool").html($("#list_tools").find("div.bd-callout").length);
        });

        //auto complete materiales
        var objTool         = $("#add_goods_tools_"+i);
        var objHiddenTool   = $("#add_goods_tools_id_"+i); 
        getMaterialGoodsTools(objTool,objHiddenTool);
        //------------------------------
        //$('body').materializeInputs();
    }

    var addRowVehicle = function(){    


       //var isParticular = $("#chb_Visita_Particular").prop('checked');
       var isParticular    = false;
        if($("#sel_visita_particular").val()=="1")
            isParticular    = true;
       
        
       var showCompany = '';     
       if(isParticular){showCompany = 'style="display: none;"';}


        var type_request = $("#hid_type_access_request").val();
        var inputtrailer = "";        
        var i = $("#list_vehicles").find("div.bd-callout").length;//numero de filas
        i++;
        if(type_request=="4")  //si es transportista. habilitamos el y trailer
        {
            inputtrailer = `<div class="form-group col-md-1 col-lg-1" >
                                <label for="add_trailer" class="bmd-label-static titleInput">TRAILER <span class="text-warning">*</span></label>
                                <input type="text" class="form-control" id="add_trailer_${i}" value="">  
                            </div>`;
        } 
        else{
            inputtrailer = `<div class=" col-md-1 col-lg-1">
                                &nbsp;
                                <input type="hidden" class="form-control" id="add_trailer_${i}" value=""> 
                            </div>`;
        }
        
        var html = `<div class="bd-callout" id="bd-callout_vehicle_${i}" style="padding: 0.25rem!important;margin-top: 0.25rem!important;margin-left: -1.25rem !important;">
                        <form id="fm_vehicle_${i}" name="fm_vehicle_${i}" class="form-row ml-3" style="margin-bottom: 0.125rem!important;">
                            <div class="form-group col-md-1 col-lg-2 no-particular" ${showCompany}>    
                                <label for="sel_company_vehicle_${i}" class="bmd-label-static titleInput">EMPRESA</label>
                                <select  name="sel_company_vehicle_${i}" class="form-control  external-company-vehicle" id="sel_company_vehicle_${i}" required>                        
                                </select>
                                <small id="" class="form-text text-muted">&nbsp;</small>
                            </div>
                            <div class="form-group col-md-2 col-lg-2">
                                <label for="sel_person_vehicle_${i}" class="bmd-label-static titleInput">CONDUCTOR</label>
                                <select  name="sel_person_vehicle_${i}" class="form-control vehiculo" id="sel_person_vehicle_${i}" required>                        
                                </select>
                            </div> 
                            <div class="form-group col-md-1 col-lg-1">
                                <label for="add_placa_${i}" class="bmd-label-static titleInput">PLACA</label>
                                <input type="text" class="form-control " id="add_placa_${i}" >
                            </div>
                            <div class="form-group col-md-1 col-lg-1">
                                <label for="add_marca" class="bmd-label-static titleInput">MARCA</label>                     
                                <input type="text" class="form-control" id="add_marca_${i}" >                
                            </div>
                            <div class="form-group col-md-2 col-lg-2">
                                <label for="add_modelo_${i}" class="bmd-label-static titleInput">MODELO</label>
                                <input type="text" class="form-control" id="add_modelo_${i}">
                            </div>            
                            <div class="form-group col-md-1 col-lg-1 ">
                                <label for="add_brevete_${i}" class="bmd-label-static titleInput">BREVETE</label>   
                                <input type="text" class="form-control" id="add_brevete_${i}">                            
                            </div>
                            <div class="form-group col-md-1 col-lg-1">
                                <label for="add_categoria_${i}" class="bmd-label-static titleInput">CATEGORÍA</label>  
                                <select id="add_categoria_${i}" mane="add_categoria_${i}" class="form-control">
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                </select>
                            </div>
                            ${inputtrailer}
                            <div class="form-group  col-md-1 col-lg-1 text-center align-middle pt-4 mt-3 mb-3 border-left">
                                <div id="bt_delete_row_vehicle_${i}" style="cursor: pointer;">
                                    <img src="images/iconos/trash.svg" class="" >                    
                                    <small id="passwordHelpBlock" class="form-text text-muted">Eliminar</small>
                                </div>
                            </div>
                        </form>
                    </div>`;
        $("#list_vehicles").append(html);
        $("#fm_vehicle_"+i).bootstrapMaterialDesign();
        updateSelectExternalCompanyVehicle(i);
        $("#cant_row_vehicle").html(i);
        $("#bt_delete_row_vehicle_"+i).click(function(){
            var id  = 'bd-callout_vehicle_'+i;
            var obj = $("#"+id);
            removeRowVehicle(obj);
            $("#cant_row_vehicle").html($("#list_vehicles").find("div.bd-callout").length);
        });

        addDriverToVehicle($("#sel_person_vehicle_"+i));
        $('body').bootstrapMaterialDesign();        
        //addDriverToVehicle();
    }


    

    var removeRowParticipante = function(obj){  
        obj.remove();
        updateListCompanySelect();
        
    }
    removeRowTool = function(obj){
        obj.remove();
    }
    removeRowVehicle = function(obj){
        obj.remove();
    }
   

    var validateformCompanyExternal = function(){
        var ruc                     = $("#tx_ruc").val();
        var name                    = $("#tx_name").val();
        var business_name           = $("#tx_business_name").val();
        /*var business_sector         = $("#tx_business_sector").val();
        var business_pais           = $("#tx_business_pais").val();
        var business_ciudad         = $("#tx_business_ciudad").val();
        var business_street         = $("#tx_business_street").val();
        var business_mobile         = $("#tx_business_mobile").val();
        
        var business_site_web       = $("#tx_business_site_web").val();
        var business_client_flag    = $("#tx_business_client_flag").prop( "checked")?1:0;
        var business_provider_flag  = $("#tx_business_provider_flag").prop("checked")?1:0;
        */
        //datos para el usurio de respojnsable de la compañia
        var business_email          = $("#tx_business_email").val();
        var type                    = $("#sel_external_company_type").val();
        var userResponsable         = $("#tx_user_responsable").val();
        var userPass1               = $("#tx_user_pass_1").val();
        var userPass2               = $("#tx_user_pass_2").val();

        var tx_business_dni               = $("#tx_business_dni").val();
        var tx_business_nombre               = $("#tx_business_nombre").val();
        var tx_business_apelllido               = $("#tx_business_apelllido").val();
        

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
        else if(tx_business_dni.trim().length==0){
            messengerError ="Debes ingresar el dni de usuario responsable";
        }
        else if(tx_business_nombre.trim().length==0){
            messengerError ="Debes ingresar el nombre de usuario responsable";
        }
        else if(tx_business_apelllido.trim().length==0){
            messengerError ="Debes ingresar el apellido usuario responsable";
        }
        else if(business_email.trim().length==0){
            messengerError ="Debe ingresar su email";
        }
        else if(type==0){
            messengerError ="Debe seleccionar el tipo de empresa";
        }
        else if(userPass1.trim().length==0){
            messengerError ="Debes ingresar la clave";
        }
        else if(userPass2.trim().length==0){
            messengerError ="Debes confirmar la clave";
        }
        else if(userPass1 != userPass2){
            messengerError ="las claves no coinciden";
        }
        if(messengerError)
            swal("Error", messengerError, "error");
        else{
            closeModal($('#modalAddCompany'));
            
            
            setTimeout(function(){
                swal({
                    title: "Registro de Empresa",
                    text: "¿Seguro que desea registrar la nueva empresa?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-danger btn-sm",
                    confirmButtonText: "Si",
                    cancelButtonText: "No",                
                    closeOnConfirm: true,
                    closeOnCancel: false,
                    showLoaderOnConfirm: true
                  },function(action){
                    if (action===false) {//register                   
                        swal.close();
                        setTimeout(function(){$("#modalAddCompany").modal("show");},800);
                      } else {//register
                        registerCompanyExternal();                    
                        
                      }
                    //registerCompanyExternal();            
                });
            },800);
        }            
    }
    var registerCompanyExternal = function(){   
        
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

        },800)

        var ruc                     = $("#tx_ruc").val();
        var name                    = toCapitalize($("#tx_name").val());
        var business_name           = toCapitalize($("#tx_business_name").val());
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

        var tx_business_dni         = $("#tx_business_dni").val();
        var tx_business_nombre      = toCapitalize($("#tx_business_nombre").val());
        var tx_business_apelllido   = toCapitalize($("#tx_business_apelllido").val());
        var identity_document_type  = $("#sel_identity_document_type").val(); 
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
            "identity_document_type":identity_document_type,
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
            else
            {
                swal.close();
                //$("#modalAddCompany .close").click();//cerramos modal
                var flagActualizarSelectCompany = true;
                getExternalCompany(flagActualizarSelectCompany);
                setTimeout(function(){
                    swal("Registrada!", "Proceso realizado con éxito.", "success");    
                },600)               
            }
        }).fail( function( jqXHR, textStatus, errorThrown ) {
           // console.log(jqXHR.responseText);
            var req = JSON.parse(jqXHR.responseText);
            var message = "Se produjo un problema al momento de registrar la empresa";
            if(req.message)
                message=req.message;
            swal("Error!", message, "error");
        });
    }

    var checkPersonExist = function(obj, i){        
        obj.blur(function(){
            var warning = false;
            var y       = 1;
            if(obj.val().trim()!=""){
                $("#list_participantes form").each(function(){   
                    var x = 0;                   
                    $(this).find('.form-control').each(function(){                                
                        var value = $(this).val();                                         
                        if(y!=i && x==1 && value.trim()== obj.val()){
                            console.log(value.trim() +"="+obj.val());
                            warning = true;                                
                        }
                        x++;
                    });
                    y++;
                });
                //alert(warning +" 01");
                if (warning) {
                    swal({
                        title: "Error!",
                        text: "El participante ya se encuentra en la lista",
                        type: "error"
                    },function(){
                        $("#add_dni_"+i).val('');            
                    });
                }
            }            
        });
        
    }

    var getDocumento =  function(obj,i){
        //alert("aquí estamos ");
        obj.autocomplete({
            change: function (event, ui) {
                
                if (ui.item === null) {

                }
                $("#add_contacto_nombre_"+i).focus();
            },
            source: function( request, response ) {
                //var filter = $("#txt_collaborator").val();
                var httpmethod    = "objectlist";
                var identity_document = obj.val();
                //console.log(email);
                var searchType      = 1;
                //var id_external_company = getCookie("vtas_external_company_id");
                //var param           = {vvhttpmethod:vvhttpmethod,name:name};
                var headers         = {"apiKey":"r$3#23516ewew5"}
                $.ajax({
                    url: apiurlsecurity+"/api/Get-Person-All?code="+GetPersonAll+"&httpmethod="+httpmethod+"&identity_document="+identity_document+"&search_type="+searchType,
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
                            json.label                  = item.identity_document;
                            json.value                  = item.identity_document;
                            json.id                     = item.id;
                            json.firstname              = item.firstname;
                            json.lastname               = item.lastname;
                            json.identity_document      = item.identity_document;
                            json.id_external_company    = item.id_external_company;
                            json.email                  = item.email?item.email:"";                            
                            array.push(json);
                        });
                    response(array);
                    }                    
                });
            },
            minLength: 3,
            select: function( event, ui ) {                
                $("#add_dni_"+i).val(ui.item.label);
                $("#add_correo_"+i).val(ui.item.email);
                $("#add_contacto_nombre_"+i).val(ui.item.firstname);
                $("#add_contacto_apellido_"+i).val(ui.item.lastname);
                //$("#sel_company_"+i+" option:selected" ).attr("selected", false);
                //$("#sel_company_"+i+" option[value='"+ui.item.id_external_company+"']").attr("selected", true);
                //alert("aquí "+ui.item.id_external_company);
                //$("#sel_company_"+i).val(ui.item.id_external_company).trigger('change');
                $("#add_contacto_nombre_"+i).focus();
                   /* console.log(ui.item.id_external_company);
                    var warning = false;
                    $("#list_participantes form").each(function(){   
                       var x = 0;
                       var y = 1;
                       console.log(y+" - "+i);
                        $(this).find('.form-control').each(function(){                                
                            var value = $(this).val();
                            console.log(value.trim() +"="+ui.item.label);
                            if(y!=i && x==1 && value.trim()== ui.item.label){//es apllido
                                warning = true;                                
                            }
                            x++;
                        });
                        y++;
                    });
                    //alert(warning +" 01");
                    if (warning) {
                        swal({
                            title: "Error!",
                            text: "El participante ya se encuentra en la lista",
                            type: "error"
                          },function(){
                            $("#add_dni_"+i).val('');            
                        });
                    }else{
                     $("#add_correo_"+i).val(ui.item.email);
                     $("#add_contacto_nombre_"+i).val(ui.item.firstname);
                     $("#add_contacto_apellido_"+i).val(ui.item.lastname);
                     $("#sel_company_"+i+" option:selected" ).attr("selected", false);
                     $("#sel_company_"+i+" option[value='"+ui.item.id_external_company+"']").attr("selected", true);
                     //alert("aquí "+ui.item.id_external_company);
                     //$("#sel_company_"+i).val(ui.item.id_external_company).trigger('change');
                    }*/
            },
            open: function() {
                $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
            },
            close: function() {
                $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
                obj.blur();
            }
        });
    }
    var autoCompleteCompany =  function(obj,i){
        //alert("aquí estamos ");
        console.log(jsonExternalCompanyAuto);
        obj.autocomplete({
            source: jsonExternalCompanyAuto,
            change: function (event, ui) {
                //console.log(ui);
                if (ui.item === null) {
                    obj.val("");
                    $("#hid_company_"+i).val("");
                }
            },            
            minLength: 1,
            select: function( event, ui ) {
                //console.log(ui.item);
                //$("#add_correo_"+i).val(ui.item.email);
                obj.val(ui.item.label);
                $("#hid_company_"+i).val(ui.item.id);              
                //$("#sel_company_"+i+" option[value='"+ui.item.id_external_company+"']").attr("selected", true);                    
            },
            open: function() {
                $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
            },
            close: function() {
                $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
                //obj.blur();
            }
        });
    }

    var getEmail =  function(obj,i){
        //alert("aquí estamos ");
        obj.autocomplete({
            change: function (event, ui) {
               
                if (ui.item === null) {

                }
            },
            source: function( request, response ) {
                //var filter = $("#txt_collaborator").val();
                var httpmethod    = "objectlist";
                var email            = obj.val();
               
                var searchType      = 1;
                //var id_external_company = getCookie("vtas_external_company_id");
                //var param           = {vvhttpmethod:vvhttpmethod,name:name};
                var headers         = {"apiKey":"r$3#23516ewew5"}
                $.ajax({
                    url: apiurlsecurity+"/api/Get-Person-All?code="+GetPersonAll+"&httpmethod="+httpmethod+"&email="+email+"&search_type="+searchType,
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
                       var i = 0;
                        $(this).find('.form-control').each(function(){                                
                            var value = $(this).val(); 
                            if(i==4 && value.trim()== ui.item.label){//es apllido
                                warning = true;
                            }
                            i++;
                        });
                    });
                    //alert(warning +" 02");
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
                     $("#add_contacto_nombre_"+i).val(ui.item.firstname);
                     $("#add_contacto_apellido_"+i).val(ui.item.lastname);
                    // $("#sel_company_"+i+" option:selected" ).attr("selected", false);
                     //$("#sel_company_"+i+" option[value='"+ui.item.id_external_company+"']").attr("selected", true);
                    }
            },
            open: function() {
                $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
            },
            close: function() {
                $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
                obj.blur();
            }
        });
    }

    var getCollaborator =  function(){
       
        $("#txt_collaborator").autocomplete({   
            change: function (event, ui) {
                if (ui.item === null) {
                    $("#txt_collaborator_id").val("");
                    $(this).val("");
                }
            }, 
            source: function( request, response ) {
                var filter = $("#txt_collaborator").val();
                ///console.log(filter);
                var param= {filter:filter};
                var headers = {"Authorization":TOKEN_CLIENT,"apiKey":"r$3#23516ewew5"}
                $("#loadCollaborator").show()
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
                    var array =[];
                    data =  JSON.parse(data);
                    data.value.forEach(item => {
                        var json ={}
                        json.label = item.displayName;
                        json.value = item.displayName;
                        json.email = item.userPrincipalName; 
                        json.id     = item.objectId;
                        array.push(json);
                    });
                    //console.log(array);
                    response(array);

                    $("#loadCollaborator").fadeOut()
                }
                });
            },
            minLength: 3,
            select: function( event, ui ) {
                $("#txt_collaborator_id").val(ui.item.id);
                $("#hid_email_colaborador").val(ui.item.email);
                /*console.log( ui.item ?
                "Selected: " + ui.item.label :
                "Nothing selected, input was " + this.value);*/
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
            }
        });
    }
    
    var viewVisita = function(ids){
        
        var id = $("#hid_row_id_visita").val();
        if(ids)
        {
            var id=ids;
            setTimeout(function(){
                $("#hid_row_id_visita").val(id);
            },500)
           
          
        }
        $('.btdetail').popover('hide');
        vw_external_acces_request.viewForm(id);
        
    }

    var confirmVisitaAccess = function(ids){
        
        swal({
            title: "Autorización",
            text: "¿Seguro que desea realizar el registro?",
            type: "info",
            showCancelButton: true,
            confirmButtonClass: "btn-danger btn-sm",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            closeOnConfirm: true,
            showLoaderOnConfirm: true
        },
        function(){
            vw_access_event.processAccess();            
        });
          
    }

    
         

    var getMaterialGoodsTools =  function(obj,objHidden){
        //alert("aquí estamos ");
        obj.autocomplete({
            change: function (event, ui) {
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
            },
            close: function() {
                $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
            }
        });

    }
    var changeImage= function(id,url){
        $("#"+id).attr("src",url);
    }

    var updateSelectExternalCompanyPerson = function(obj){
        var option = "";
        option+="<option value='0'>Seleccionar</option>";
        jsonExternalCompany.map(function(item){
            option+="<option value='"+item.id+"'>"+toCapitalize(item.name)+"</option>";
        });

        $("#sel_company").html(option); 

    }

    var initFormPerson= function(){
        var rol = getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa);

        if (rol != "ROL_ALLTASA") {
            $(".rol_alltasa").hide();
        }

        $("#modalRegisterPerson #bt_register_external_person").show();
        $("#modalRegisterPerson #bt_update_external_person").hide();

        $("#modalRegisterPerson #bt_register_external_person").click(function(){
            validateFormPerson();
        })

        $("#modalRegisterPerson #tx_business_email").blur(function(){
            $("#modalRegisterPerson #tx_user_responsable").val($(this).val());
        })

        $("#modalRegisterPerson #sel_type").change(function(){
            console.log('change')
            if ($(this).val() == 2) {
                $("#modalRegisterPerson #contenedor_sel_company").show();
                $("#modalRegisterPerson #contenedor_cmp").hide();
            }
            else if($(this).val() == 1){
                $("#modalRegisterPerson #contenedor_sel_company").hide();
                $("#modalRegisterPerson #contenedor_cmp").show();
            }
            else{
                $("#modalRegisterPerson #contenedor_sel_company").hide();
                $("#modalRegisterPerson #contenedor_cmp").hide();
            }
        })

       

        $("#modalRegisterPerson #tx_image").change(function(event) {
            console.log('cambio');
            var preView = document.querySelector('#modalRegisterPerson #tx_preview');
            var input = document.querySelector('#modalRegisterPerson #tx_image');
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

    var validateFormPerson= function(){
        var rol = getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa);

        
        var dni                     =   $("#modalRegisterPerson #tx_business_dni").val();
        var nombres                 =   $("#modalRegisterPerson #tx_business_nombre").val();
        var apellidos               =   $("#modalRegisterPerson #tx_business_apelllido").val();
        var userResponsable         =   $("#modalRegisterPerson #tx_user_responsable").val();
        var celular                 =   $("#modalRegisterPerson #tx_business_mobile").val();
        var email                   =   $("#modalRegisterPerson #tx_business_email").val();
        var userPassword            =   $("#modalRegisterPerson #tx_user_pass_1").val();
        var userPassword2           =   $("#modalRegisterPerson #tx_user_pass_2").val();
        var cargo                   =   $("#modalRegisterPerson #tx_job").val();
        var status                  =   $("#modalRegisterPerson #sel_status").val();
        var tipo                    =   $("#modalRegisterPerson #sel_type").val();
        var cmp                    =   $("#modalRegisterPerson #tx_cmp").val();

        var messengerError = "";

        if(dni.trim().length==0){
            messengerError ="Debes ingresar el dni.";
        }        
        if(nombres.trim().length==0){
            messengerError ="Debes ingresar los nombres.";
        }  
        if(apellidos.trim().length==0){
            messengerError ="Debes ingresar los apellidos.";
        }  
        if(userResponsable.trim().length==0){
            messengerError ="Debes ingresar el usuario.";
        }  
        if(celular.trim().length==0){
            messengerError ="Debes ingresar el celular.";
        }  
        if(email.trim().length==0){
            messengerError ="Debes ingresar el email.";
        }  
        if(userPassword.trim().length==0){
            messengerError ="Debes ingresar la contraseña.";
        }  
        if(userPassword2.trim().length==0){
            messengerError ="Debes repetir la contraseña.";
        }  
        if(cargo.trim().length==0){
            messengerError ="Debes ingresar el cargo.";
        }  

        if(userPassword.trim()!=userPassword2.trim()){
            messengerError ="Las contraseñas deben coincidir.";
        } 
        if (status==null) {
            messengerError ="Seleccionar un estado.";
        }
        if (rol == "ROL_ALLTASA") {
            if (tipo==0) {
                messengerError ="Seleccionar un tipo.";
            }
        }

        if(messengerError)
            swal("Error", messengerError, "error");
        else{
            swal({
                title: "Registro Datos de Persona",
                text: "¿Desea registrar los datos de la persona.",
                type: "info",
                showCancelButton: true,
                confirmButtonClass: "btn-danger btn-sm",
                confirmButtonText: "Si",
                cancelButtonText: "No",
                closeOnConfirm: true
              },function(){
                saveFormPerson();
            });
        } 
    }

    var saveFormPerson= function(){
        console.log('enviamos los datos pa guardar')

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

        var rol = getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa);

        if (rol == "ROL_ALLTASA") {
            if ($("#sel_type").val() == 2) {
                var company = $("#modalRegisterPerson #sel_company").val();
            }else{
                var company = 167;//company por defecto
            }
        }else{
            var company = getCookie("vtas_external_company_id"+sessionStorage.tabVisitasa);
        }

        var status                  =   $("#modalRegisterPerson #sel_status").val();
        
        var colaborador = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);

        var dni                     =   $("#modalRegisterPerson #tx_business_dni").val();
        var nombres                 =   $("#modalRegisterPerson #tx_business_nombre").val();
        var apellidos               =   $("#modalRegisterPerson #tx_business_apelllido").val();
        var userResponsable         =   $("#modalRegisterPerson #tx_user_responsable").val();
        var celular                 =   $("#modalRegisterPerson #tx_business_mobile").val();
        var email                   =   $("#modalRegisterPerson #tx_business_email").val();
        var userPassword            =   $("#modalRegisterPerson #tx_user_pass_1").val();
        var userPassword2           =   $("#modalRegisterPerson #tx_user_pass_2").val();
        var cargo                   =   $("#modalRegisterPerson #tx_job").val();
        var cmp                     =   $("#modalRegisterPerson #tx_cmp").val();
        var type                    =   $("#modalRegisterPerson #sel_type").val();
        var medic_flag              = 0;
        if(type == '2'){
            cmp = "";
        }
        if(type == '1'){
            
            medic_flag = 1
        }
            

        var attribute1 = 2;
        var input = document.querySelector('#modalRegisterPerson #tx_image');
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
        var url = apiurlsecurity+"/api/Post-Person-All?code="+PostPersonAllSeg+"&httpmethod=post";                   
        var headers = {
            "apikey":"r$3#23516ewew5"
        }

        setTimeout(function(){
            var body ={
                "mobile":celular,
                "email":email,
                "created_by":colaborador,
                "last_updated_by":colaborador,  
                "id_external_company":company,                
                "attribute1":attribute1,//eliminar luego que se cree la tabla de typo de external company external
                "attribute2":"",//imagen
                "attribute3":"",
                "attribute4":"",
                "attribute5":"",
                "identity_document":dni,
                "firstname":nombres,
                "lastname":apellidos,
                "userResponsible":userResponsable,
                "passResponsible":userPassword,
                "person_picture": image,
                "job": cargo,
                "userAttribute2":status,//imagen
                "cmp":cmp,
                "medic_flag":medic_flag
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
                else{
                    swal.close();
                setTimeout(function(){
                    handlerUrlhtml('contentGlobal','view/externalAccesListPerson.html','externalAccesListPerson'); 
                    swal("Registrado!", "Proceso realizado con éxito.", "success"); 
                    $('.modal-backdrop').remove();   
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
        },1000)
        
    }

    return{
        init:function(){
            init();
            getLocations();
        },
        addParticipante:function(){
            addRowTableParticipante();
        },
        removeParticipante : function(obj){
            removeRowParticipante(obj);
        },
        addVehicle:function(){
           addRowVehicle();
        },
        registerCompany :function(){
            registerCompanyExternal();
        },
        validateFormCompany:function(){
            validateformCompanyExternal();
        },
        
        initForm:function(){           
            initForm();            
        },
        addTool:function(){
            addRowTableTool();
        },
        
        initFormAct2:function(){
            initFormAct2()
        },

        initFormAct3:function(){
            initFormAct3();
        },
        viewVisita:function(ids){
           
            viewVisita(ids);

        },
        changeImage:function (id,url) {
            changeImage(id,url);
        },
        confirmVisitaAccess:function(ids){
           
            confirmVisitaAccess(ids);

        },
        initFormPerson:function(){
            $("#modal_register_person").load('view/externalAccessRequestEditPerson.html', function(){
                initFormPerson(); 
                getExternalCompany(true);               
            });   
        },
        checkPersonExist:function(obj,i){
            checkPersonExist(obj,i);
        },
        updateListCompanySelect:function(){
            updateListCompanySelect();
        },
        updateSelectExternalCompanyVehicle:function(i){
            updateSelectExternalCompanyVehicle(i);
        },
        fnGetUserPersonResponsable:function(val,pos){
            fnGetUserPersonResponsable(val,pos);
        }
    }
}();