var oTableRiskList;
var searchAct=0;//valida que se haya hecho busqueda
var searchType=0;
var laststate = 0;
var vw_risk_list = function(){
    var init = function()
    {
        $("#tx_access_dni").keypress(function(event) {
          var val = $("#tx_access_dni").val();
        	if(event.keyCode == 13){

            if(val!=""){
              searchUser($("#tx_access_dni").val());
            }
        		

        	}
        });

        $("#tx_access_dni_list").keyup(function(event) {
          oTableRiskList.search($(this).val()).draw();
          if($(this).val()=="")//limpia filtro buscado
          oTableRiskList.search( '' ).columns().search( '' ).draw();
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

        getLocations();

        $("#tx_identity_document").blur(function(){
          var dni = $(this).val();                  
          if(dni.trim().length>0){
           
              getCollaboratorDni(dni,"tx_name");
          }
            
        });
    }
    var searchUser = function(val)
    {
      if (val.trim().length == 8) {
        searchType = 1;
        console.log("buscando dni")
      }else{
        searchType = 2;
        console.log("buscando ruc")
      }

      $("#btnValida").show();
      $("#btnNValida").hide();
      var pass=0;
      var pos;
      globalBlackLists.map((item,i)=>{

        if((item.identity_document==val && searchType ==1) || (item.ruc == val && searchType ==2))
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
	        	console.log(data);
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
   
    var saveRisklist = function(){

            var identity_document = $("#tx_identity_document").val();
            var name = $("#tx_name").val();
            var unidad = $("#tx_unidad").val();

            if (identity_document == "" || name == "" || unidad == 0) {
		        swal({
		          title: "Campos vacios",
		          text: "No se ha ingresado los campos necesarios.",
		          timer: 4000,
		          type: "error",
		          showConfirmButton: true
		          });
		       // swal("Error", "No se ha ingresado observación", "error");
		        
		        return;
            }

            var url = apiurlblacklist+"/api/Post-Risklist-User?code="+postRisklistUsercode+"&httpmethod=post";                   
            console.log(url);
            var headers ={
                "apikey":"r$3#23516ewew5"        
            }
		    var data = {
	              "created_by": getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
	              "last_updated_by":getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
	              "status" : 1,
	              "identity_document" : identity_document,
	              "name" : name,
	              "unidad" : unidad
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
                vw_risk_list.reloadtableRiskList();
                $("#modalShowpersonRisk").modal('hide');

              }else{
                swal("Error!", "No se ha podido actualizar la lista.", "error");
              }

            });

    }

   	var updateRiskList = function(){
            var identity_document = $("#tx_identity_document_e").val();
            var name = $("#tx_name_e").val();
            var unidad = $("#tx_unidad_e").val();
            var status = $("#sel_status_e").val();
            var id = $("#h_id").val();
            var change = 0;

            if (identity_document == "" || name == "" || unidad == "") {
		        swal({
		          title: "Campos vacios",
		          text: "No se ha ingresado los campos necesarios.",
		          timer: 4000,
		          type: "error",
		          showConfirmButton: true
		          });
		       // swal("Error", "No se ha ingresado observación", "error");
		        
		        return;
            }
            if (laststate != status) {
            	console.log('diff');
            	change = 1;
            }

            var url = apiurlblacklist+"/api/Post-Risklist-User?code="+postRisklistUsercode+"&httpmethod=put&id="+id;                   
            console.log(url);
            var headers ={
                "apikey":"r$3#23516ewew5"        
            }
		    var data = {
	              "last_updated_by":getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
	              "status" : status,
	              "identity_document" : identity_document,
	              "name" : name,
	              "unidad" : unidad,
	              "change" : change
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
                vw_risk_list.reloadtableRiskList();
                $("#modalShowpersonRiske").modal('hide');

              }else{
                swal("Error!", "No se ha podido actualizar la lista.", "error");
              }

            });
   	}

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

  var reloadtableRiskList = function(){
    if(oTableRiskList)
      oTableRiskList.ajax.reload();
    else
      tableRiskList();
  }
var globalRiskLists=[];
  var 	tableRiskList = function(){   
  	var now = moment().format('YYYY-MM-DD');

    var url         = apiurlblacklist+"/api/Get-Risklist-User?code="+GetRisklistUsercode+"&httpmethod=objectlist";                
                      
    var headers ={
        "apikey":constantes.apiKey
    }

    oTableRiskList = $('#tb_risk_list').DataTable({
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
          columns: [1,2,3,4,5]
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
          columns: [1,2,3,4,5]
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
         
          $("#cantTotalCovid19").text(req.length)
          globalRiskLists=req;
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
              //var companys=item.name_external_company?toCapitalize(item.name_external_company):'-';
              
              var img = item.person_picture?item.person_picture:"images/iconos/user.svg";

              var row = {
                  icon      : '<img class="rounded-circle" src="'+img+'" height="56">'
                  ,name     : '<span class="">'+toCapitalize(item.name) +'</span> '
                  ,dni		  : '<span class="">'+ item.identity_document +'</span> ' //
                  ,unit	: '<span class="">'+toCapitalize(item.unidad) +'</span>' //
                  ,date		  : '<span class="">'+toCapitalize(datec) +'</span> ' //
                  ,action_type      : (item.status == 1)?'<span class="text-danger">Activo</span>' :'<span class="text-success">Inactivo</span>'
                  ,buttons  : (item.status == 1)?'<button type="button" class="btn " onclick="vw_risk_list.thumbsUp('+item.id+','+item.status+',&quot;'+item.name+'&quot;,&quot;'+item.identity_document+'&quot;,&quot;'+item.unidad+'&quot;);"><i class="material-icons btdetail" style="cursor:pointer " >more_vert</i></button>' :'<button type="button" class="btn" onclick="vw_risk_list.thumbsUp('+item.id+','+item.status+',&quot;'+item.name+'&quot;,&quot;'+item.identity_document+'&quot;,&quot;'+item.unidad+'&quot;);"><i class="material-icons btdetail" style="cursor:pointer " >more_vert</i></button>'
                  //,detail           :'<div data-toggle="modal" data-target="#modalShowRequestDetails" ><i class="material-icons btdetail" style="cursor:pointer " >more_vert</i></div>'//'<button type="button" class="btn btn-light btn-circle btdetail" id="'+id+'" ><i class="fa fa-ellipsis-v text-secondary"></i></button>'
              }

              i++;
              data.push(row);
            });
          return data;
        } 
      },
      columns: [
        //{ title:"" ,data: "icon",width: "2%", targets: 0,align:"left" ,"orderable": false  },
        { title:"Nombres y Apellidos",data: "name",width: "30%",align:"left" ,"orderable": true},
        { title:"Documento o RUC",data: "dni",width: "20%",align:"left" ,"orderable": false},
        { title:"Unidad",data: "unit",width: "25%",align:"left" ,"orderable": false},
        { title:"Fecha de Ingreso",data: "date",width: "45%",align:"left" ,"orderable": false},
        
        { title:"Estatus",data: "action_type",width: "10%" ,"orderable": false},
        { title:"",data: "buttons",width: "15%" ,"orderable": false},
        //{ title:"",data: "detail",width: "15%"},
    ],
    
    initComplete: function(settings, json) {
      //alert("culminó la carga");
      //$('[data-toggle="tooltip"]').tooltip();      
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
            var obj     = $("#tx_unidad");            
            obj.empty();
            obj.append(option);
            data.map(function(item){
                option="<option value='"+item.name+"'>"+item.name+"</option>";
                obj.append(option);
            });
            if(val){
                $("#tx_unidad option[value='"+val+"']").attr("selected", true);            
               // $("#sel_location").val(loc).trigger("change");
            }
            

        });
    }



    var thumbsUp = function(id,status,name,identity_document,unidad){
    	laststate = status;
        $("#tx_identity_document_e").val(identity_document);
        $("#tx_name_e").val(name);
        $("#tx_unidad_e").val(unidad);
        $("#sel_status_e option[value='"+status+"']").attr("selected", true);
        $("#h_id").val(id);

    	$("#modalShowpersonRiske").modal("show");

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
    var getCollaboratorDni = function(dni,id){
      // console.log("Buscando "+val+" en Directorio colaboradores......") 
    var param   = {filter:dni};
    var headers = {"Authorization":TOKEN_CLIENT,"apiKey":"r$3#23516ewew5"}    
    $.ajax({
      url: apiurlsecurity+"/api/Get-Collaborator?code="+GetCollaborator+"&httpmethod=objectdni",
      //dataType: "json",
      method:"post",
      data : JSON.stringify(param),
      processData:false,
      crossDomain: true,
      async: true,
      headers : headers,
      success: function( datacolaborator ) 
      {        
        var datacol=JSON.parse(datacolaborator);
        $("#"+id).val("");
        if(datacol.value.length>0)
        $("#"+id).val(toCapitalize(datacol.value[0]['displayName']));  
        //[0]['displayName']       
      }
    });
  }
    return{
        init:function(){
            //getAreas();
            init();
            tableRiskList();
        },
	    reloadtableRiskList:function(){
	      reloadtableRiskList();
	    },
	    thumbsUp:function(id,status,name,identity_document,unidad){       
	      thumbsUp(id,status,name,identity_document,unidad);
	    },
	    validate:function(){
	    	validate();
		},
		thumbsUpregister:function(){
			thumbsUpregister();
		},
		saveRisklist:function(){
		saveRisklist();
		},
		updateRiskList:function(){
			updateRiskList();
		}
      
       
    }
}();