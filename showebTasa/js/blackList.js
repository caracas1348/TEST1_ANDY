var oTableBlackList;
var searchAct=0;//valida que se haya hecho busqueda
var searchType=0;
var vw_black_list = function(){
    var init = function()
    {
        $("#tx_access_dni").blur(function(event) {
            var val = $("#tx_access_dni").val();
            if(val!=""){
              searchUser($("#tx_access_dni").val());
            }
      
        });

        $(".tx_access_dnis").click(function(event) {
          if($("#tx_access_dni").val()!='') {
            var val = $("#tx_access_dni").val();
            searchUser($("#tx_access_dni").val());
            $("#btnValida").val()
          } else {
            swal("Error!", "Ingrese un DOCUMENTO DE IDENTIDAD o RUC.", "error");
          } 
        });

        $("#tipo_documentolistBlack").change(function(event) {
            if($("#tipo_documentolistBlack").val()=='ruc') {
             // $('#textEmPCam1').addClass("col-md-12");
             // $('#textEmPCam1').removeClass('col-md-6');
              $('#textEmPCam1').hide();
              $('#tx_access_dni').attr("placeholder", "Ingresar Número");
            } else {
              //$('#textEmPCam1').addClass("col-md-6");
              $('#textEmPCam1').show();
              //$('#textEmPCam1').removeClass('col-md-12');
              $('#tx_access_dni').attr("placeholder", "Ingresar Número");
            }
        });
        
      

        $("#tx_access_dni_list").keyup(function(event) {
          oTableBlackList.search($(this).val()).draw();
          if($(this).val()=="")//limpia filtro buscado
          oTableBlackList.search( '' ).columns().search( '' ).draw();
        });

        $("#text_estado_list").change(function(event) {
          oTableBlackList.search($(this).val()).draw();
          if($(this).val()=="")//limpia filtro buscado
          oTableBlackList.search( '' ).columns().search( '' ).draw();
        });

        $("#btnAddBlacklist").click(function(){
          $("#btnValida").show();
          $("#btnNValida").hide();
          $("#tx_access_dni").val('');
          $("#name").removeClass('text-success');
          $("#name").text('Nombre y Apellido');
          $("#name").removeClass('form-control');
          $("#name").attr("contenteditable",false);
          $("#name").unbind( "click" );
          $("#tx_reason").val('');
        })


    }
    var searchUser = function(val)
    {
      if (val.trim().length == 8) {
        searchType = 1;
        
      }else{
        searchType = 2;
        
      }

      $("#btnValida").show();
      $("#btnNValida").hide();
      var pass=0;
      var pos;
      globalBlackLists.map((item,i)=>{

        if((item.identity_document==val))
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
              
              vw_black_list.thumbsUp(globalBlackLists[pos].id,veto_status,globalBlackLists[pos].name,globalBlackLists[pos].name_external_company,globalBlackLists[pos].person_picture,globalBlackLists[pos].reason,globalBlackLists[pos].identity_document );                    
            }
          //registerCompanyExternal();            
      });

      return;
      }
     	if (val.trim() == '') {
    		swal("Error!", "Ingrese un DOCUMENTO DE IDENTIDAD o RUC.", "error");
    	}else{
	    	var name = getCookie('vtas_fullname'+sessionStorage.tabVisitasa);
          if (searchType==1) {
            var url = apiurlsecurity+"/api/Get-Person-All?httpmethod=searchUserPerson&identity_document="+val+"&code="+GetPersonAll+"";                   
          }else{
            var url = apiurlsecurity+"/api/Get-ExternalCompany-All?httpmethod=object&ruc="+val+"&code="+GetExternalCompanyAll+"";
          }
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
              if (searchType == 1) {
                $("#name").text(data.firstname+' '+data.lastname);
              }else{
                $("#name").text(data.name);
              }
              
              $("#name_external_company").text(data.name_external_company?toCapitalize(data.name_external_company):'-');
              $("#img_user_black_list_02").attr("src","images/iconos/user.svg");              
              if(data.person_picture)
                $("#img_user_black_list_02").attr("src",data.person_picture);              
              
	        		$("#data-div").attr('hidden',false);
              $("#send-div").attr('hidden',false);
              $("#tx_reason").val("Ingrese una observación");
              //$("#name").text('Nombre y Apellido');
              $("#name").removeAttr("contenteditable");
              $("#name").removeClass('form-control  text-success  p-0');
              $("#name").unbind( "click" );
	        		//swal("Exito!", "Lista actualizada.", "success");
	        		//vw_black_list.reloadtableBlackList();
	        	}else{
              searchAct=0;
              //$("#tx_access_dni").val("");
              $("#btnValida").hide();
              $("#btnNValida").show();
              $("#name").text('');
              $("#name").removeClass('text-dark');
              $("#name").addClass('form-control text-success p-0');
              $("#name").attr("contenteditable",true);
              $("#name").text('Ingrese Nombre y apellido');
              $("#name").click(function(){
                $("#name").removeClass('text-success');
                $("#name").text('');
                $("#name").addClass('form-control text-dark  p-0');
              });
              //$("#name").focus();
	        		//swal("Error!", "No encontramos registros de ingreso a nuestras Sedes con este Documento de Identidad. Verificar datos!.", "error");
	        	}

	        });
      }
      
    }
   /*  setTimeout(function(){
      $("#modalShowpersonBlack").modal('show')
    },2000) */
   
    var saveBlacklist = function(){

      if ( $('#tipo_documentolistBlack').val() == '') 
      {
    		swal("Error!", "Debe seleccionar tipo de documento", "error");return;
      }
      else{

        if( $('#tipo_documentolistBlack').val() == 'ruc') 
        {

          if ( $('#tx_access_dni').val() == '') 
          {
            swal("Error!", "Debe ingresar Documento o RUC", "error");return;
          }
         
          else if ( $("#tx_reason").val() == '') 
          {
            swal("Error!", "Debe ingresar una observación", "error");return;
          }


        }
        if( $('#tipo_documentolistBlack').val() == 'dni') 
        {

            if ( $('#tx_access_dni').val() == '') 
            {
              swal("Error!", "Debe ingresar Documento o RUC", "error");return;
            }
            else if ( $('#tx_nombre_ListaBlack').val() == '') 
            {
              swal("Error!", "Debe ingresar su nombre", "error");return;
            }
            else if ( $("#tx_reason").val() == '') 
            {
              swal("Error!", "Debe ingresar una observación", "error");return;
            }
          
        }
      }




      



      swal({
        title: "Confirmar",
        text: "¿Desea realizar el registro?.",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn-danger btn-sm",
        confirmButtonText: "Si",
        cancelButtonText: "No",
        closeOnConfirm: true
      },function(){


        var responsible = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
        var dni = $("#tx_access_dni").val();
        var name = $('#tx_nombre_ListaBlack').val();
        var empresa = $('#tx_ocupacion_ListaBlack').val();
        var reason = $("#tx_reason").val();
        var url = apiurlblacklist+"/api/Post-Blacklist-User?httpmethod=saveBlackList&name="+name+"&name_company="+empresa+"&reason="+reason+"&created_by="+responsible+"&responsible="+responsible+"&dni="+dni.trim()+"&code="+postblacklistusercode+"";                   
        console.log(url);
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
            swal("Exito!", "Operación satisfactoria.", "success");
            vw_black_list.reloadtableBlackList();
            $("#modalShowpersonBlack").modal('hide');  
            $("#tx_reason").val('');
            $("#tx_access_dni").val();
            $('#tx_nombre_ListaBlack').val('');
            $('#tx_ocupacion_ListaBlack').val('');


          }else{
            swal("Error!", "No se ha podido actualizar la lista.", "error");
          }

        });

       
    });

           

    }

    var validate = function()
    {
        var val = searchAct;
     
    		var reason = $("#tx_reason").val();
      if (val == 0) 
      {
    		swal("Información", "Por favor completar los datos requeridos", "info");
      } else {

        var name = getCookie('vtas_fullname'+sessionStorage.tabVisitasa);
        var created_by = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
	    	var responsible = getCookie('vtas_id'+sessionStorage.tabVisitasa);

	        var url = apiurlblacklist+"/api/Post-Blacklist-User?httpmethod=searchUser&dni="+val+"&reason="+reason+"&created_by="+created_by+"&responsible="+responsible+"&searchType="+searchType+"&code="+postblacklistusercode+"";                   
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

  var reloadtableBlackList = function(){
    if(oTableBlackList)
      oTableBlackList.ajax.reload();
    else
      tableBlackList();
  }
var globalBlackLists=[];
  var 	tableBlackList = function(){   
  	var now = moment().format('YYYY-MM-DD');

    var url         = apiurlblacklist+"/api/Get-Blacklist-User?httpmethod=objectlist&code="+getblacklistusercode+"";                
                      
    var headers ={
        "apikey":constantes.apiKey
    }

    oTableBlackList = $('#tb_black_list').DataTable({
      ordering  : true,
      info      : false,
      paging:true,
      pageLength: 100,
      searching : true,
      scrollY   : '60vh',
      scrollCollapse: true,
      dom: 'Bfrtip',
      buttons: [{
        extend: 'excelHtml5',
        className:'btn-success font-weight-bold ',              
        text: 'Exportar a Excel',
        //messageTop: 'Exportar a Excel',
        exportOptions: {
          columns: [0,1,2,3,4]
        },
        title: 'Listado de personas',              
        customize: function(xlsx) {
        }
      },
      
      {
        extend: 'print',
        className:'btn-secondary font-weight-bold ',              
        text: 'Imprimir',
        //messageTop: 'Exportar a Excel',
        exportOptions: {
          columns: [0,1,2,3,4]
        },
        title: 'Listado de personas',              
        customize: function(xlsx) {
        }
      }
     //'copyHtml5',
     //'excelHtml5',
     //'csvHtml5',
     //'pdfHtml5' 
    ],
      responsive: true,
      ajax      :{
        type: "POST",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
        dataSrc: function ( req ) {
         
          globalBlackLists=req;
            var data =[];
            var i = 1;
            var e=1;
            var r=1;
            req.map(function(item){
              if(item.veto_status > 0) {
                $("#cantTotalCovid19").text(e++);
              } else {
                $("#cantTotalCovid19_inac").text(r++);
              }
              
  
              var accessTime  = moment(item.created_date).format('LT');
              var week        = moment(item.created_date).format('dddd');//dddd
              var month       = moment(item.created_date).format('MMMM');//
              var day         = moment(item.created_date).format('D'); ;
              var startDate               = week +" "+day +" de "+ month;
              var datec=startDate;
             
              var companys=item.name_external_company?toCapitalize(item.name_external_company):'-';
              
              var img = item.person_picture?item.person_picture:"images/iconos/user.svg";
              var identity_document = (item.ruc===null)?''+item.identity_document.toString():item.ruc;
              var nomApe = (item.ruc===null)?item.name:item.name_external_company;

              var name="'"+toCapitalize(nomApe)+"'";
              var row = {
                  
                  name     : '<span class="">'+toCapitalize(nomApe) +'</span> '
                  ,dni		  : '<span class="">'+ identity_document +'</span> ' //
                  ,company	: '<span class="">'+companys +'</span>' //
                  ,date		  : '<span class="">'+toCapitalize(datec) +'</span> ' //
                  ,action_type      : (item.veto_status == 1)?'<span class="text-danger">Activo</span>' :'<span class="text-success">Inactivo</span>'
                  ,buttons  : (item.veto_status == 1)?'<button type="button" class="btn " onclick="vw_black_list.thumbsUp('+item.id+','+item.veto_status+','+name+',&quot;'+item.name_external_company+'&quot;,&quot;'+img+'&quot;,&quot;'+item.reason+',&quot;,&quot;'+identity_document+'&quot; );"><i class="material-icons btdetail" style="cursor:pointer " >more_vert</i></button>' :'<button type="button" class="btn" onclick="vw_black_list.thumbsUp('+item.id+','+item.veto_status+','+name+',&quot;'+item.name_external_company+'&quot;,&quot;'+img+'&quot;,&quot;'+item.reason+',&quot;,&quot;'+identity_document+'&quot;);"><i class="material-icons btdetail" style="cursor:pointer " >more_vert</i></button>'
                  ,buttons_binnacle  : '<button type="button" class="btn " onclick="vw_black_list.Listbinnacle('+item.id+','+name+','+identity_document+');"><i class="" style="cursor:pointer"><img src="images/iconos/bookBlackList.svg" width="24px"></i>'
                  //,detail           :'<div data-toggle="modal" data-target="#modalShowRequestDetails" ><i class="material-icons btdetail" style="cursor:pointer " >more_vert</i></div>'//'<button type="button" class="btn btn-light btn-circle btdetail" id="'+id+'" ><i class="fa fa-ellipsis-v text-secondary"></i></button>'
              }

              i++;
              data.push(row);
            });
          return data;
        } 
      },
      columns: [
       
        { title:"Documento",data: "dni",width: "20%",align:"left" ,"orderable": false},
        { title:"Nombres y Apellidos",data: "name",width: "30%",align:"left" ,"orderable": true},
        { title:"Empresa",data: "company",width: "25%",align:"left" ,"orderable": false},
        { title:"Fecha de Ingreso",data: "date",width: "45%",align:"left" ,"orderable": false},
        { title:"Estatus",data: "action_type",width: "10%" ,"orderable": false},
        { title:"Bitácora",data: "buttons_binnacle",width: "15%",align:"left","orderable": false},
        { title:"",data: "buttons",width: "15%" ,"orderable": false},
        //{ title:"",data: "detail",width: "15%"},
    ],
    
    initComplete: function(settings, json) {
      //alert("culminó la carga");
      //$('[data-toggle="tooltip"]').tooltip();      
    }
  });
}

  var Listbinnacle = function(id,name,document){

    if(oTableRecent){
      oTableRecent.destroy();
    }

    $('.textName').text(name+' - '+document);
    var param={
      httpmethod:'exceededlist'
    }
    var url=apiurlblacklist+"/api/Get-Blacklist-Log?code="+getblacklistlogcode+"&httpmethod=objectlist&search_type=1&id_blacklist="+id;                
    var headers={
      "apikey":"r$3#23516ewew5"        
    }
  
    oTableRecent=$('#List_table_binnacle').DataTable({
      paging:false,
      ordering:false,
      info:false,
      order: [[ 0, "desc" ]],
      //searching : false,
      scrollY   :'50vh',
      scrollCollapse:true,
      ajax:{
        type:"POST",
        url:url,
        headers:headers,
        crossDomain:true,
        error:function(xhr,error,thrown) {
          console.log(xhr);
          console.log(xhr.status)
          var textError=thrown;
          var status=xhr.status+' - '+xhr.statusText;//500 error servidor

          showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.");
          return;
          hideLoading();
        },
        dataType:"json",
        dataSrc:function(req) {
          arrayGlobalServicesProg=req;
          var i=1;
          var data=[];
          req.map(function(item) {
            var colaboratorId = item.created_by;
            var user = "";
            if(item.last_updated_by!=null){
              colaboratorId = item.last_updated_by
            }
            
            if(colaboratorId!=null  || colaboratorId!=""){
              //buscamos el colaborador por el id
              var resp    = "";
              var filter  = colaboratorId;         
              var param   = {filter:filter};
              var headers = {"Authorization":TOKEN_CLIENT,"apikey":"r$3#23516ewew5"}
              $.ajax({
              url: apiurlsecurity+"/api/Get-Collaborator?code="+GetCollaborator+"&httpmethod=object",
              //dataType: "json",
              method:"post",
              data : JSON.stringify(param),
              processData:false,
              crossDomain: true,
              async: false,
              headers : headers,
              success: function( data ) {
                  var array =[];

                  data =  JSON.parse(data);
                  resp = data;

                 console.log(data);
                 
                  if(Array.isArray(data.value) ) 
                  { 
                      user = data.value[0].displayName;
                  }
                  else{
                    user = colaboratorId;
                  }

                  console.log(colaboratorId,user)
              }
              });
            }

            

  
            /*
            Listbinnacle
            */
            $('.CantExceBlack').text(req.length);

            var estatus=0;
            if(i==1) {
              estatus=1;
            }
            
              var observacion='-';
              if(item.reason)
                observacion=item.reason;

              var accessTime  = moment(item.created_date).format('LT');
              var week        = moment(item.created_date).format('dddd');//dddd
              var month       = moment(item.created_date).format('MMMM');//
              var day         = moment(item.created_date).format('D'); ;
              var startDate               = week +" "+day +" de "+ month;
              var datec=startDate;
             
              var row = {
                Tobservacion:toCapitalize(observacion),
                User:user,
                TstartDate:startDate,
                Testatus:(!item.action_type)?'<span class="text-success">Inactivo</span>' :'<span class="text-danger">Activo</span>',
              } 
              i++;
              data.push(row);
          });
          return data;
        } 
      },
      columns: [        
        {title:"Observación",data:"Tobservacion",width: "40%"},
        {title:"Fecha de Registro",data:"TstartDate",width: "25%"},
        {title:"Usuario",data:"User",width: "25%"},
        {title:"Estatus",data:"Testatus",width: "10%"},
      ],
    });
    $('#Listbinnacle').modal('show');
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
    var thumbsUp = function(id,status,name,company,img,reason,identity_document){
     
    	if (status==1) {
        $("#butEditBlack").text("Retirar de lista")
        var text = "El usuario será restituido.";
        $("#butEditBlack")[0].className="btn btn-green-lime btn-rounded btn-raised";
        
    	}else{
        $("#butEditBlack").text("Agregar a lista")
        $("#butEditBlack")[0].className="btn btn-danger btn-rounded btn-raised";
    		var text = "El usuario será dado de baja.";
      }
      $('#tx_reasonedit').text('');
 
      $('#nameedit').text(name);      
      $('#modalShowpersonBlacke').modal('show');
      $('#dniedit').text(identity_document);
      $('#span_name_company').text("--");
      if(company!=null || company!="" || company!="null")
        $('#span_name_company').text(toCapitalize(company));
      if(img)
        $("#img_user_black_list").attr("src",img);
      nameEdit=name;
      statusEdit=status;
      idEdit=id;
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
		    	var responsible = getCookie('vtas_id_hash'+sessionStorage.tabVisitasa);
		        var url = apiurlblacklist+"/api/Post-Blacklist-User?httpmethod=put&id="+idEdit+"&responsible="+responsible+"&reason="+inputValue+"&code="+postblacklistusercode+"";                   
		        var headers ={
		            "apikey":"r$3#23516ewew5"        
		        }
		        var data = {
              "created_by": getCookie("vtas_id_hash"+sessionStorage.tabVisitasa)
              ,"last_updated_by":getCookie("vtas_id_hash"+sessionStorage.tabVisitasa)
		        	,"veto_status" : statusEdit
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
            tableBlackList();
        },
	    reloadtableBlackList:function(){
	      reloadtableBlackList();
	    },
	    thumbsUp:function(id,status,name,company,img,reason,identity_document){       
	      thumbsUp(id,status,name,company,img,reason,identity_document);
	    },
	    validate:function(){
	    	validate();
      },
      thumbsUpregister:function(){
	    	thumbsUpregister();
      },
      saveBlacklist:function(){
        saveBlacklist();
      },
      Listbinnacle:function(id,name,document){
        Listbinnacle(id,name,document);
      } 
      
    }
}();