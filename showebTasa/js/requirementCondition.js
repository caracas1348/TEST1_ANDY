var oTableRequirementCondition;
var searchAct=0;//valida que se haya hecho busqueda
var vw_requirement_condition = function(){
    var init = function()
    {
     
     
    }
    var searchUser = function(val)
    {

      var pass=0;
      var pos;
      globalBlackLists.map((item,i)=>{
        if(item.identity_document==val)
        {
         // swal("Registro existente!", "Este documento de identidad ya ha sido ingresado a lista negra!.", "info");
          pass=1;
          pos=i;
        }
      })
      if(pass==1)
      {

        swal({
          title: "Registro existente!",
          text: "¿Desea ir al registro o realizar una nueva búsqueda?",
          type: "info",
          showCancelButton: true,
          confirmButtonClass: " btn-green-lime btn-sm btn-rounded btn-raised",
          confirmButtonText: "Ir a registro",
          cancelButtonText: "Buscar de nuevo",                
          closeOnConfirm: true,
          closeOnCancel: false,
          showLoaderOnConfirm: true
        },function(action){
          if (action===false) {//register                   
              swal.close();
                $("#tx_access_dni").val("");
                $("#tx_access_dni").focus();
            } else {//register
              $("#modalShowpersonBlack").modal('hide')
              var veto_status = 0;
              if(globalBlackLists[pos].veto_status)
                veto_status = 1
              
              vw_black_list.thumbsUp(globalBlackLists[pos].id,veto_status,globalBlackLists[pos].name,globalBlackLists[pos].name_external_company,globalBlackLists[pos].person_picture,globalBlackLists[pos].reason );                    
            }
          //registerCompanyExternal();            
      });

        return;
      }

    	if (val.trim() == '') {
    		swal("Error!", "Ingrese un DOCUMENTO DE IDENTIDAD.", "error");
    	}else{
	    	var name = getCookie('vtas_fullname'+sessionStorage.tabVisitasa);
	        var url = apiurlsecurity+"/api/Get-Person-All?httpmethod=searchUserPerson&identity_document="+val+"&code="+GetPersonAll+"";                   
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
	        	
            if (data.id) 
            {
              searchAct=val;
              $("#name").text(data.firstname+' '+data.lastname);
              $("#name_external_company").text(data.name_external_company?toCapitalize(data.name_external_company):'-');
              $("#img_user_black_list_02").attr("src","images/iconos/user.svg");              
              if(data.person_picture)
                $("#img_user_black_list_02").attr("src",data.person_picture);              
              
	        		$("#data-div").attr('hidden',false);
              $("#send-div").attr('hidden',false);
              $("#tx_reason").val("Ingrese una observación");
              
	        		//swal("Exito!", "Lista actualizada.", "success");
	        		//vw_black_list.reloadtableBlackList();
	        	}else{
              searchAct=0;
              $("#tx_access_dni").val("");
	        		swal("Error!", "No encontramos registros de ingreso a nuestras Sedes con este Documento de Identidad. Verificar datos!.", "error");
	        	}

	        });
      }
      
    }
   /*  setTimeout(function(){
      $("#modalShowpersonBlack").modal('show')
    },2000) */
   
   

    var validate = function()
    {
    		var val = searchAct;
    		var reason = $("#tx_reason").val();
      if (val == 0) 
      {
    		swal("Error!", "No se ha realizado una búsqueda exitosa con el documento de identidad", "error");
      }
      else if ( reason == 'Ingrese una observación') 
      {
    		swal("Error!", "Debe ingresar una observación", "error");
      }
      else
      {
	    	var name = getCookie('vtas_fullname'+sessionStorage.tabVisitasa);
        var responsible = getCookie('vtas_id'+sessionStorage.tabVisitasa);
        var created_by = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
	        var url = apiurlblacklist+"/api/Post-Blacklist-User?httpmethod=searchUser&dni="+val+"&reason="+reason+"&created_by="+created_by+"&responsible="+responsible+"&code="+postblacklistusercode+"";                   
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
	        	if (data.blacklist_id) {
              swal("Exito!", "Se ha realizado el ingreso satisfactoriamente", "success");
              searchAct=0;
              vw_black_list.reloadtableBlackList();
              $("#tx_access_dni").val("");
              $("#modalShowpersonBlack").modal('hide')
	        	}else{
	        		swal("Error!", "No se ha podido actualizar la lista.", "error");
	        	}

	        });
    	}
    }

  var initRequerimentConditionRegister = function(){
    $("#bt_saveRequirementCondition").show();
    $("#bt_updateRequirementCondition").hide();
    $("#sel_type").val('');
    $("#tx_name").val('');
    $("#tx_description").val('');
    $("#h_id").val(0);
    $('#modalRegisterRequerimentCondition').modal('show');
    getLocations();
    getAreas(0,0);
    $("#sel_location").change(function(){
        var val = $(this).val();
        //alert(val);
        getAreas(val,0);
    });

    $("#bt_saveRequirementCondition").click(function(){
      validateRegister(1);
    });

    $("#tx_documento").change(function(){
        const file = document.getElementById('tx_documento').files[0];
        const reader = new FileReader();
        var base64 = "";

        reader.addEventListener("load", function () {
          // convert image file to base64 string
          $("#base64").val(reader.result);
        }, false);

        if (file) {
          reader.readAsDataURL(file);
        }      
    })
    $("#sel_type").change(function(){
      var val = $(this).val();
      if (val == 1) {
        $("#col_documento").show();
      }else{
        $("#col_documento").hide();
      }
    })
  }

    var validateRegister = function(id){
        var warning         = 0;
        var message         ="";
        var area            = $("#sel_area").val();
        var tipo            = $("#sel_type").val();
        var nombre          = $("#tx_name").val();
        var descripcion     = $("#tx_description").val();

        var i=0;

        if(tipo==""){
            warning = 1;
            message = "Debes seleccionar el tipo";
        }
        else if(area=="0"){
            warning = 1;
            message = "Debes seleccionar el área";
        }
        else if(nombre==""){
            warning = 1;
            message = "Debe asignar un nombre ";
        }
        else if(descripcion==""){
            warning = 1;
            message = "Debe asignar una descripción";
        }

        if(warning==1){
            swal("Error",message,"error");//warning
        }                
        else{
          if (id==1) {
            swal({
                title: "Registro de prohibiciones y condiciones",
                //text: "¿Seguro que desea enviar el formulario?",
                text: "¿Estás seguro?",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger btn-sm",
                confirmButtonText: "Si",
                cancelButtonText: "No",
                closeOnConfirm: true,
                showLoaderOnConfirm: true
            },
            function(){
                registerRequirementProhibition();            
            });
          }else{
            swal({
                title: "Actualización de prohibiciones y condiciones",
                //text: "¿Seguro que desea enviar el formulario?",
                text: "¿Estás seguro?",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger btn-sm",
                confirmButtonText: "Si",
                cancelButtonText: "No",
                closeOnConfirm: true,
                showLoaderOnConfirm: true
            },
            function(){
                updateRequerimentCondition();            
            });
          }

        }
}

  var registerRequirementProhibition = function (){

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

        var area            = $("#sel_area").val();
        var tipo            = $("#sel_type").val();
        var nombre          = $("#tx_name").val();
        var descripcion     = $("#tx_description").val();
        var idhash          = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
        var base64          = $("#base64").val();
        //const preview = document.querySelector('img');
        var Body = {
          "area_id"     : area,
          "type"        : tipo,
          "name"        : nombre,
          "description" : descripcion,
          "created_by"  : idhash,
          "last_updated_by"  : idhash,
          "document"    : base64
        }
        console.log(Body);
        var url = apiurlaccessrequest+"/api/Post-RequirementsProhibitions-All?code="+PostRequirementsProhibitionsAll+"&httpmethod=post&search_type==1";                   
        var headers ={
            "apikey":"r$3#23516ewew5"        
        }
        $.ajax({                    
            method: "POST",
            url:  url,
            data : JSON.stringify(Body),
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function( data)
        {
            //console.log(data);
            swal.close();
            setTimeout(function(){
                swal("Registrado!", "Proceso realizado con éxito.", "success");
                $("#modalRegisterRequerimentCondition").modal('hide');
                reloadtableRequirementCondition();
                //$("#titleModule").text("Ingresos solicitados");  
                //$('.modal-backdrop').remove();
            },500)
                    
            //nos vamos para la lsita
            //handlerUrlhtml('contentGlobal','view/accessRequestList.html','accessRequestList',requesttype);
           
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            swal("Error!", "Se produjo un problema al momento de registrar el ingreso.", "error");
            $('.modal-backdrop').remove();
        });

  }

    var getLocations= function(id_location){ 
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
                option="<option value='"+item.id+"'>"+item.name+"</option>";
                obj.append(option);
            });

            obj.val(id_location);
        });
    }

  var getAreas = function(location_id,area_id){

      $("#sel_area").html("");
      $("#sel_area").append("<option value='-1'>Cargando...</option>");
      var condition = "";
      if (location_id>0) {
        condition = "&id_location="+location_id;
      }
      var url = apiurlaccessrequest+"/api/Get-Area-All?httpmethod=objectlist"+condition+"&code="+GetAreaAll+"";                   
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
          option="<option value='0'>Seleccione</option>";
          obj.append(option);
          data.map(function(item){
              option="<option value='"+item.id+"'>"+item.name+"</option>";
              obj.append(option);
          });

          if(area_id>0){
            $("#sel_area").val(area_id);
          }
      });
  }
  var reloadtableRequirementCondition= function(){
    if(oTableRequirementCondition)
      oTableRequirementCondition.ajax.reload();
    else
      tableRequirementCondition();
  }
var globalBlackLists=[];
  var 	tableRequirementCondition = function(){   
  	var now = moment().format('YYYY-MM-DD');

    var url         = apiurlaccessrequest+"/api/Get-RequirementsProhibitions-All?code="+GetRequirementsProhibitionsAll+"&httpmethod=objectlist";                
                      
    var headers ={
        "apikey":constantes.apiKey
    }

    oTableRequirementCondition = $('#tb_requirements_conditions').DataTable({
      ordering  : false,
      info      : false,
      paging:false,
      searching : true,
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
          //console.log(req);
          globalBlackLists=req;
            var data =[];
            var i = 1;
            req.map(function(item){
  
              var accessTime  = moment(item.created_date).format('LT');
              var week        = moment(item.created_date).format('dddd');//dddd
              var month       = moment(item.created_date).format('MMMM');//
              var day         = moment(item.created_date).format('D'); ;
              var startDate               = week +" "+day +" de "+ month;
              var datec=startDate;
              //console.log(item.name_external_company,item.person_picture);
              var companys=item.name_external_company?toCapitalize(item.name_external_company):'-';
              var name="'"+toCapitalize(item.name)+"'";
              var img = item.person_picture?item.person_picture:"images/iconos/user.svg";
              var row = {
                  //icon      : '<div  class="card border-0 h-0  m-0 bg-muted p-0"  style="cursor:pointer;box-shadow:0 0px 0px 0 rgba(0, 0, 0, 0.0), 0 0px 0px 0px rgba(0, 0, 0, 0), 0 0px 0px 0 rgba(0, 0, 0, 0)!important;"><div class="row"><div class="col-md-1 mt-0"> <img class="rounded-circle" src="'+img+'" height="56"></div> <div class="col-md-11 ">   <div class="card-body p-0 "><span class="card-title h4 text-uppercase hoverItem"></span> </div> </div></div> </div>' //
                  name     : '<div  class="card border-0 h-0  m-0 bg-muted p-0"  style="cursor:pointer;box-shadow:0 0px 0px 0 rgba(0, 0, 0, 0.0), 0 0px 0px 0px rgba(0, 0, 0, 0), 0 0px 0px 0 rgba(0, 0, 0, 0)!important;"><div class="row"><div class="col-md-1 mt-0"> </div> <div class="col-md-11 "> <div class="card-body p-0 "><span class="card-title h5  ">'+toCapitalize(item.name) +'</span> </div> </div></div> </div>'
                  ,location     : '<div  class="card border-0 h-0  m-0 bg-muted p-0"  style="cursor:pointer;box-shadow:0 0px 0px 0 rgba(0, 0, 0, 0.0), 0 0px 0px 0px rgba(0, 0, 0, 0), 0 0px 0px 0 rgba(0, 0, 0, 0)!important;"><div class="row"><div class="col-md-1 mt-0"> </div> <div class="col-md-11 "> <div class="card-body p-0 "><span class="card-title h5  ">'+toCapitalize(item.location) +'</span> </div> </div></div> </div>' //
                  ,area		  : '<div  class="card border-0 h-0  m-0 bg-muted p-0"  style="cursor:pointer;box-shadow:0 0px 0px 0 rgba(0, 0, 0, 0.0), 0 0px 0px 0px rgba(0, 0, 0, 0), 0 0px 0px 0 rgba(0, 0, 0, 0)!important;"><div class="row"><div class="col-md-1 mt-0"> </div> <div class="col-md-11 "> <div class="card-body p-0 "><span class="card-title h5  ">'+toCapitalize(item.area) +'</span> </div> </div></div> </div>' //
                  ,description	: '<div  class="card border-0 h-0  m-0 bg-muted p-0"  style="cursor:pointer;box-shadow:0 0px 0px 0 rgba(0, 0, 0, 0.0), 0 0px 0px 0px rgba(0, 0, 0, 0), 0 0px 0px 0 rgba(0, 0, 0, 0)!important;"><div class="row"><div class="col-md-1 mt-0"> </div> <div class="col-md-11 "> <div class="card-body p-0 "><span class="card-title h5  ">'+toCapitalize(item.description) +'</span> </div> </div></div> </div>' //
                  //,date		  : '<div  class="card border-0 h-0  m-0 bg-muted p-0"  style="cursor:pointer;box-shadow:0 0px 0px 0 rgba(0, 0, 0, 0.0), 0 0px 0px 0px rgba(0, 0, 0, 0), 0 0px 0px 0 rgba(0, 0, 0, 0)!important;"><div class="row"><div class="col-md-1 mt-0"> </div> <div class="col-md-11 "> <div class="card-body p-0 "><span class="card-title h5  ">'+toCapitalize(datec) +'</span> </div> </div></div> </div>' //
                  ,type      : (item.type == 1)?'<h5 class="">Requerimiento</h5>' :'<h5 class="">Prohibicion</h5>'
                  ,buttons  : '<button type="button" class="btn " onclick="vw_requirement_condition.initEditRequerimentCondition('+item.id+','+item.area_id+','+item.type+',&quot;'+item.name+'&quot;,&quot;'+item.description+'&quot;,'+item.location_id+' );"><i class="material-icons btdetail" style="cursor:pointer " >more_vert</i></button>'
                  //,detail           :'<div data-toggle="modal" data-target="#modalShowRequestDetails" ><i class="material-icons btdetail" style="cursor:pointer " >more_vert</i></div>'//'<button type="button" class="btn btn-light btn-circle btdetail" id="'+id+'" ><i class="fa fa-ellipsis-v text-secondary"></i></button>'
              }

              i++;
              data.push(row);
            });
          return data;
        } 
      },
      columns: [
        //{ title:"" ,data: "icon",width: "2%", targets: 0,align:"left"  },
        { title:"Tipo",data: "type",width: "30%",align:"left"},
        { title:"Nombre",data: "name",width: "20%",align:"left"},
        { title:"Sede",data: "location",width: "20%",align:"left"},
        { title:"Area",data: "area",width: "25%",align:"left"},
        { title:"Descripción",data: "description",width: "45%",align:"left"},
        
        //{ title:"Estatus",data: "action_type",width: "10%"},
        { title:"",data: "buttons",width: "15%"},
        //{ title:"",data: "detail",width: "15%"},
    ],
    
    initComplete: function(settings, json) {
      //alert("culminó la carga");
      //$('[data-toggle="tooltip"]').tooltip();      
    }
  });
}
    var register = function(){
        var body                = {}
        var location            = $("#sel_location").val();//
        var area                = $("#sel_area").val();//
        var dateStart           = moment($("#tx_date_start").val(),"DD-MM-YYYY").format("YYYY-MM-DD")
        var dateEnd             = dateStart//por ahora la misma que start
        var timeStart           = moment(dateStart+' '+ $("#tx_time_start").val(),"YYYY-MM-DD hh:mm a").format("YYYY-MM-DD HH:mm");//2020-02-29 11:00
        var timeEnd             = moment(dateStart+' '+ $("#tx_time_end").val(),"YYYY-MM-DD hh:mm a").format("YYYY-MM-DD HH:mm");//2020-02-29 11:00

        //console.log(dateStart,dateEnd,timeStart,timeEnd);
        var colaborador         = $("#sel_organizer").val();//
        var nameColaborador     = "";
        var emailColaborador    = $("#hid_email_colaborador").val();//
        var materialGoodsTools  = "";//convertir en texto        
        var authorizedPersons   = []; //realizar map para agregar los participantes en la colección de objeto
        var authorizedVehicles  = []; //realizar map para agregar los participantes en la colección de objeto
        var rejectionReason     = $("#tx_rejection_reason").val();//
        var anonymousAccessToken= $("#hid_anonymous_access_token").val();
        var createdBy           = "Ernesto rivas";//$("#hid_name_user").val();//nombre del usuario logueado
        var status              = 1;
        var accessTime          = timeStart
        var exitTime            = timeEnd;//2020-02-29 14:00
        var enableDays          = "4"; //obtenerlo con moment por la fecha de la visita
        var enabled_mon_day     = false;//activar el día, domingo
        var enabled_tues_day    = false;//activar el día, lunes
        var enabled_wednes_days = false;//activar el día, martes
        var enabled_thurs_day   = false;//activar el día, miercoles
        var enabled_fri_days    = false;//activar el día, jueves
        var enabled_satur_day   = false;//activar el día, viernes
        var enabled_sun_day     = false;//activar el día, s{abado
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
            partipante ={
                "external_company":values[0]                
                ,"affidavit":0                
                ,"first_name":values[1]
                ,"last_name":values[2]
                ,"identity_document":values[3]
                ,"email":values[4]
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
                 //var idinput=$(this).attr("id");
                var value = $(this).val(); 
                values.push(value);
             });
             vehicle ={
                "id_vehicle":"0"
                ,"license_plate":values[0]
                ,"driver_brand":values[1]
                ,"driver_model":values[2] 
                ,"driver_license_number":values[3]
                ,"driver_license_category":values[4]
                ,"attribute1":""
                ,"attribute2":""
                ,"attribute3":""
                ,"attribute4":""
                ,"attribute5":""
             }  
             authorizedVehicles.push(vehicle);
         });
        


       
    }
var idEdit;
var statusEdit;
var nameEdit;
    var initEditRequerimentCondition = function(id,area_id,type,name,description,location_id){

        $("#bt_saveRequirementCondition").hide();
        $("#bt_updateRequirementCondition").show();
        $('#modalRegisterRequerimentCondition').modal('show');
        getLocations(location_id);
        getAreas(0,area_id);
        $("#bt_updateRequirementCondition").click(function(){
          validateRegister(2);
        });
        $("#sel_type").val(type);
        $("#tx_name").val(name);
        $("#tx_description").val(description);
        $("#h_id").val(id);
        $("#sel_location").change(function(){
            var val = $(this).val();
            //alert(val);
            getAreas(val,0);
        });
      $("#tx_documento").change(function(){
          const file = document.getElementById('tx_documento').files[0];
          const reader = new FileReader();
          var base64 = "";

          reader.addEventListener("load", function () {
            // convert image file to base64 string
            $("#base64").val(reader.result);
          }, false);

          if (file) {
            reader.readAsDataURL(file);
          }      
      })
      $("#sel_type").change(function(){
        var val = $(this).val();
        if (val == 1) {
          $("#col_documento").show();
        }else{
          $("#col_documento").hide();
        }
      })
      if (type==1) {$("#col_documento").show();}else{$("#col_documento").hide();}
    }

    var updateRequerimentCondition = function(){
        //swal.close();

            swal({
                title: "Procesando...",
                text: "Por favor espere.",
                //timer: 3000,
                type: "info",
                showConfirmButton: false
                });



        var area            = $("#sel_area").val();
        var tipo            = $("#sel_type").val();
        var nombre          = $("#tx_name").val();
        var descripcion     = $("#tx_description").val();
        var idhash          = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
        var id              = $("#h_id").val();
        var base64          = $("#base64").val();

        var Body = {
          "area_id"     : area,
          "type"        : tipo,
          "name"        : nombre,
          "description" : descripcion,
          "created_by"  : idhash,
          "last_updated_by"  : idhash,
          "document"    : base64
        }
        console.log(Body);
        var url = apiurlaccessrequest+"/api/Post-RequirementsProhibitions-All?code="+PostRequirementsProhibitionsAll+"&httpmethod=put&id="+id;                   
        var headers ={
            "apikey":"r$3#23516ewew5"        
        }
        $.ajax({                    
            method: "POST",
            url:  url,
            data : JSON.stringify(Body),
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function( data)
        {
            //console.log(data);
            //swal.close();
                console.log('lala');
                swal("Actualizado!", "Proceso realizado con éxito.", "success");
                $("#modalRegisterRequerimentCondition").modal('hide');
                reloadtableRequirementCondition();
                //tableRequirementCondition();
                //$("#titleModule").text("Ingresos solicitados");  
                //$('.modal-backdrop').remove();

            //nos vamos para la lsita
            //handlerUrlhtml('contentGlobal','view/accessRequestList.html','accessRequestList',requesttype);
           
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            swal("Error!", "Se produjo un problema al momento de registrar el ingreso.", "error");
            $('.modal-backdrop').remove();
        });
    }

    var thumbsUpregister = function(){
      var inputValue=$('#tx_reasonedit').val();
      $('#modalShowpersonBlacke').modal('show');
      $('#nameedit').text(name);
      if(statusEdit==0){
        statusEdit=1;        
      }        
      else if(statusEdit==1){
        statusEdit=0;       
      }
      console.log(nameEdit,statusEdit,idEdit,inputValue)
      if(inputValue=="")
      {
        swal({
          title: "Campos vacios",
          text: "No se ha ingresado observación.",
          timer: 4000,
          type: "error",
          showConfirmButton: true
          });
       // swal("Error", "No se ha ingresado observación", "error");
        $('#tx_reasonedit').focus();
        return;
      }
  
		    	var name = getCookie('vtas_fullname'+sessionStorage.tabVisitasa);
		    	var responsible = getCookie('vtas_id'+sessionStorage.tabVisitasa);
		        var url = apiurlblacklist+"/api/Post-Blacklist-User?httpmethod=put&id="+idEdit+"&responsible="+responsible+"&reason="+inputValue+"&code="+postblacklistusercode+"";                   
		        var headers ={
		            "apikey":"r$3#23516ewew5"        
		        }
		        var data = {
		        	"created_by" : nameEdit,
		        	"veto_status" : statusEdit
		        }
		        
		        $.ajax({                    
		            method: "POST",
		            url:  url,
		            data: JSON.stringify(data),
		            headers:headers,
		            crossDomain: true,
		            dataType: "json",
		        }).done(function(data)
		        {
		        	if (data.id) {
		        		swal("Exito!", "Operación satisfactoria.", "success");
                vw_black_list.reloadtableBlackList();
                $('#modalShowpersonBlacke').modal('hide');
		        	}else{
		        		swal("Error!", "No se ha podido actualizar la lista.", "error");
		        	}

		        });
          
    }

    return{
        init:function(){
            //getAreas();
            init();
            tableRequirementCondition();
        },
	    reloadtableRequirementCondition:function(){
	      reloadtableRequirementCondition();
	    },
	    initEditRequerimentCondition:function(id,area_id,type,name,description,location_id){       
	      initEditRequerimentCondition(id,area_id,type,name,description,location_id);
	    },
	    validate:function(){
	    	validate();
      },
      thumbsUpregister:function(){
	    	thumbsUpregister();
      },
      initRequerimentConditionRegister:function(){
        initRequerimentConditionRegister();
      }
      
       
    }
}();