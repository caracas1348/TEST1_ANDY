var oTableBlackList;
var searchAct=0;//valida que se haya hecho busqueda
var searchType=0;
var EditIdAgent=0;
//alert("arrancando RegistrarAuditoria");
var vw_secury_agent = function(){
    var init = function()
    {
      getLocations();
      getExternalCompany();
       
       //alert("entrando al objeto js de registrar programa");

         $("#tx_access_dni_list").keyup(function(event) 
         {
          oTableBlackList.search($(this).val()).draw();
          if($(this).val()=="")//limpia filtro buscado
          oTableBlackList.search( '' ).columns().search( '' ).draw();
        });

        
        $("#sel_sede_filter").change(function(event) 
        {
         
          console.log(oTableBlackList.search($("#sel_sede_filter  option:selected").text()!="Todas"?$("#sel_sede_filter  option:selected").text():'').draw().context[0].aiDisplay)
          console.log(oTableBlackList.search($("#sel_sede_filter  option:selected").text()!="Todas"?$("#sel_sede_filter  option:selected").text():'').draw().context[0].aoData)
          oTableBlackList.search($("#sel_sede_filter  option:selected").text()!="Todas"?$("#sel_sede_filter  option:selected").text():'').draw();
          
          if($(this).val()=="" || $("#sel_sede_filter  option:selected").text()=="Todas")//limpia filtro buscado
          oTableBlackList.search( '' ).columns().search( '' ).draw();
        });

        $("#text_estado_list").change(function(event) {
          
          oTableBlackList.search($("#text_estado_list  option:selected").text()!="Todos"?$("#text_estado_list  option:selected").text():'').draw();
          if($(this).val()=="" || $("#text_estado_list  option:selected").text()=="Todos")//limpia filtro buscado
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
              
              vw_secury_agent.thumbsUp(globalBlackLists[pos].id,veto_status,globalBlackLists[pos].name,globalBlackLists[pos].name_external_company,globalBlackLists[pos].person_picture,globalBlackLists[pos].reason,globalBlackLists[pos].identity_document );                    
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
	        		//vw_secury_agent.reloadtableBlackList();
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
   
    function getGarita(idLocation)
    {
       return
        $("#sel_garita").empty();
        $("#sel_garita").text("Cargando...");
  
        var url = apiurlaccessrequest+"/api/Get-Garita-All?httpmethod=objectlist&code="+GetGaritaAll+"&id_location="+idLocation;                        
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
          $("#sel_garita").append("<option value='0'>Seleccionar</option>");
          var jsonLocation=[];

          data.map(function(item)
          {
              $("#sel_garita").append(`<option value='${item.id}'>${item.name}</option>`);
           
            jsonLocation.push(item); 
      
          });  

          if(id_garita_golbal!=0)
            $('#sel_garita').val(id_garita_golbal);
        }).fail(function( jqXHR, textStatus, errorThrown ) {
              
            showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
            console.log(errorThrown)
            $("#sel_garita").hide(); 
       });;
        
    }
    var register = function()
    {
        var val = 1;
     

        if ( $('#tipo_documentolistBlack').val() == "") 
        val=0;
        if ( $('#tx_access_dni').val() == "") 
        val=0;
        if(checkDocumentValidate('tipo_documentolistBlack','tx_access_dni')==0)
        {
          swal("Información", "Longitud de documento inválido", "error");
          return
        }
        if ( $('#tx_nombre_ListaBlack').val() == "") 
        val=0;
        if ( $('#sel_sede').val() == 0) 
        val=0;
        if ( $('#tx_company_ListaBlack').val() == "") 
        val=0;




        // ##################################### forzandolo a que no guarde hasta que me entreguen el servicio 
             val = 3;
                var d = new Date();
                var idEspecialidad = $('#sel_sede  option:selected').text()+d.getFullYear();
         if (val == 3) //$("#select1 option:selected").text();
          {
              cancelform();
              vw_secury_agent.reloadtableBlackList();
             swal("Se creó la programación de auditorías con éxito", "El código de la programación es: ( "+idEspecialidad +" )", "success");

             
             

          } 
     // ##################################### forzandolo a que no guarde hasta que me entreguen el servicio 
      

      if (val == 0) 
      {
    		swal("Información", "Por favor completar los datos requeridos", "info");
      } 
      else 
      {

        var name = getCookie('vtas_fullname'+sessionStorage.tabVisitasa);
        var created_by = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
	    	var responsible = getCookie('vtas_id'+sessionStorage.tabVisitasa);
       // https://v1s17454-prd-access-registries-mger-dev.azurewebsites.net/api/Post-SegurityAgent-All?code=iib5ELlz46AZ0jPyUTWaFjWhW/B3ygUjwqw7Jzs6/vQbpkXQ912xnw==

        var body ={ //************************************************************************  parametros a base de datos *****************
                   type_document:$('#tipo_documentolistBlack').val() // id de -Especialidad
                  ,identity_document:$('#tx_access_dni').val()// cargariamos la fecha actual para registrar -FechaCreacion
                  ,name: $('#tx_nombre_ListaBlack').val()// si es insert: id evaluador = null                    uptade:leer id evaluador del listado
                  ,phone: $('#tx_phone_ListaBlack').val()
                  ,id_company:companyId?companyId:0
                  ,name_company:$('#tx_company_ListaBlack').val()// fecha de Evaluacion   si es insert fecha= null si es     update fecha hoy
                  ,id_location:$('#sel_sede').val()// numero de Correccion en 0  cuando es insert x+1 si es update
                  ,name_location: $("#sel_sede  option:selected").text()
                  ,status:1
                  ,id_garita:$('#sel_garita').val()
                  ,created_by:created_by           //bitacora de quien hace el registo  este seria el creador
                  ,last_updated_by:created_by      //bitacora de quien hace el registo  este seria el evaluador      
                  ,attribute1:0
                  ,attribute2:0
                  ,attribute3:0
                  ,attribute4:0
                  ,attribute5:0
           }


          if(EditIdAgent==0)//aca se registra nuevo
          var url = apiurlaccessregistries+"/api/Post-SegurityAgent-All?httpmethod=post&code="+PostSegurityAgentAll+"";  //Insertar
          else 
          var url = apiurlaccessregistries+"/api/Post-SegurityAgent-All?httpmethod=put&code="+PostSegurityAgentAll+"&id="+EditIdAgent; //modificar

	        var headers ={
	            "apikey":"r$3#23516ewew5"        
	        }
	        $.ajax({                    
	            method: "POST",
              url:  url,
              data: JSON.stringify(body),
	            headers:headers,
	            crossDomain: true,
	            dataType: "json",
	        }).done(function(data)
	        {
            //alert("Culminó");
            console.log(data)
            if (data.id) 
            {
              swal({
                title: "Éxito",
                text: "Se ha realizado el registro satisfactoriamente",
                type: "success",
                timer:2000,
                showCancelButton: false,
                confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
                confirmButtonText: "De acuerdo",
                closeOnConfirm: false
              });
              
              cancelform();
              vw_secury_agent.reloadtableBlackList();
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

    var url = apiurlaccessregistries+"/api/Get-SecurityAgent-All?httpmethod=objectlist&code="+GetSecurityAgentAll+"";                 
                      
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
        // extend: 'excelHtml5',
        // className:'btn-success font-weight-bold ',              
        // text: 'Exportar a Excel',
        // //messageTop: 'Exportar a Excel',
        // exportOptions: {
        //   columns: [1,2,3,4,5]
        // },
        // title: 'Listado de personas',              
        // customize: function(xlsx) {
        // }
      },
      
      {
        // extend: 'print',
        // className:'btn-secondary font-weight-bold ',              
        // text: 'Imprimir',
        // //messageTop: 'Exportar a Excel',
        // exportOptions: {
        //   columns: [1,2,3,4,5]
        // },
        // title: 'Listado de personas',              
        // customize: function(xlsx) {
        // }
      }
     //'copyHtml5',
     //'excelHtml5',
     //'csvHtml5',
     //'pdfHtml5' 
    ],
      responsive: true,
      language:{"sProcessing":     "Procesando...",
                "sLengthMenu":     "Mostrar _MENU_ registros",
                "sZeroRecords":    `No se Encontraron Registros`,//Validar el documento de identidad. No se encontraron resultados. Sin solicitud de Tamizaje
                "sEmptyTable":     `No se Encontraron Registros`,
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
      ajax      :{
        type: "POST",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
        
        error: function (xhr, error, thrown) {

          var textError=thrown;
          var status=xhr.status+' - '+xhr.statusText;//500 error servidor

          showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
          return;
      },
        dataSrc: function ( req ) {
         
          globalBlackLists=req;
            var data =[];
            var i = 1;
            var e=1;
            var r=1;
            req.map(function(item,i){
              if(item.status == 1) {
                $("#cantTotalCovid19").text(e++);
              } else {
                $("#cantTotalCovid19_inac").text(r++);
              }

              var week        = moment(item.created_date).format('dddd');//dddd
              var month       = moment(item.created_date).format('MMMM');//
              var day         = moment(item.created_date).format('D'); ;
              var startDate               = week +" "+day +" de "+ month;
              var datec=startDate;
             
              var row = {
                   name     : '<span class="">'+toCapitalize(item.name) +'</span> '//
                  ,dni		  : '<span class="">'+ item.identity_document +'</span> ' //2
                  ,sede	: '<span class="">'+toCapitalize(item.name_location) +'</span>' //3
                  ,company	: '<span class="">'+toCapitalize(item.name_company) +'</span>' //4
                  ,date		  : '<span class="">'+toCapitalize(datec) +'</span> ' //5
                  ,action_type      : (item.status == 1)?'<span class="text-success">Activo</span>' :'<span class="text-danger">Inactivo</span>'//6
                  ,edit  :'<img height="24" style="cursor:pointer" src="images/iconos/edit.svg" onclick="vw_secury_agent.showDetail('+i+');">'//7
                  ,delete  : '<button type="button" class="btn btn-green-lime  btn-raised " style="background-color:#d2d97b; width: 119px; height: 34px; font-size: 11.9px; letter-spacing: 0.12px; line-height: 1.64; color: #565933; " onclick="vistaAuditorias('+item.id+');" > Ingresar Auditoria </button">'//8onclick="vw_secury_agent.deleted('+item.id+');"
                  }

              i++;
              data.push(row);
            });
          return data;
        } 
      },
      columns: [
       
        { title:"ID Programa",data: "dni",align:"left" ,"orderable": false},//1
        { title:"Especialidad",data: "sede",width: "15%",align:"left" ,"orderable": true},//2
        { title:"Fecha de Creacion",data: "date", width: "15%", align:"left" ,"orderable": false},//3
        { title:"Nro Correcciones",data: "dni",width: "8%",align:"left" ,"orderable": false},//4
        { title:"Evaluador",data: "name",width: "15%",align:"left" ,"orderable": false},//1
        { title:"Fecha de Evaluacion",data: "date",  width: "15%",align:"left" ,"orderable": false},//3
        { title:"Estado",data: "dni", width: "5%" ,"orderable": false},//6
        { title:"----------",data: "delete",width: "10%" ,"orderable": false},//7
    ],
    
    initComplete: function(settings, json) {
     
    }
  });
}
var companyId;
var id_garita_golbal = 0;
var showDetail=function(pos)
{
  EditIdAgent=globalBlackLists[pos].id;
  console.log(globalBlackLists[pos])
  $('#modalShowpersonBlack').modal('show');
  $('#tipo_documentolistBlack').val(globalBlackLists[pos].type_document);
  $('#tx_nombre_ListaBlack').val(globalBlackLists[pos].name);
  $('#tx_company_ListaBlack').val(globalBlackLists[pos].name_company);
  $('#tx_phone_ListaBlack').val(globalBlackLists[pos].phone);
  $('#tx_access_dni').val(globalBlackLists[pos].identity_document);
  $('#sel_sede').val(globalBlackLists[pos].id_location).trigger("change");
  //$('#sel_garita').val(globalBlackLists[pos].id_garita);
  id_garita_golbal = globalBlackLists[pos].id_garita;
  companyId=globalBlackLists[pos].id_company;
}
var cancelform=function()
{
  EditIdAgent=0;
  id_garita_golbal = 0;
  $('#modalShowpersonBlack').modal('hide');
  $('#tipo_documentolistBlack').val("")
  $('#tx_nombre_ListaBlack').val("")
  $('#tx_company_ListaBlack').val("")
  $('#tx_phone_ListaBlack').val("")
  $('#tx_access_dni').val("")
  $('#sel_sede').val(0)
  companyId=null;
}
var deleted=function(id)
{
  //console.log(id)

  swal({
    title: "Inactivar",
    text: "¿Desea inactivar la persona seleccionada?",
    type: "info",
    showCancelButton: true,
    confirmButtonClass: " btn-green-lime btn-sm btn-rounded btn-raised",
    confirmButtonText: "Si",
    cancelButtonText: "No",                
    closeOnConfirm: true,
    closeOnCancel: false,
    showLoaderOnConfirm: true
  },function(action)
  {
    if (action===false) 
    {//                   
        swal.close();
        EditIdAgent=0; 
      } 
      else 
      {//eliminar
        EditIdAgent=id;
        console.log("Ir a eliminar "+id);

        var url = apiurlaccessregistries+"/api/Post-SegurityAgent-All?httpmethod=delete&code="+PostSegurityAgentAll+"&id="+EditIdAgent;                 
        var headers ={
            "apikey":"r$3#23516ewew5"        
        }
        $.ajax({                    
            method: "POST",
            url:  url,
            //data: JSON.stringify(body),
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function(data)
        {
          console.log(data);
          if (data) 
          {
            swal({
              title: "Éxito",
              text: "Se ha inactivado el registro satisfactoriamente",
              type: "success",
              timer:2000,
              showCancelButton: false,
              confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
              confirmButtonText: "De acuerdo",
              closeOnConfirm: false
            });            
            cancelform();
            vw_secury_agent.reloadtableBlackList();
          }else{
            swal("Error!", "No se ha podido actualizar la lista.", "error");
          }

        });

      }
    //registerCompanyExternal();            
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
  var getExternalCompany = function(){      
    var url = apiurlsecurity+"/api/Get-ExternalCompany-All?code="+GetExternalCompanyAll+"&httpmethod=objectlist&attribute5=";              
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
        var jsonExternalCompany=[];
        data.map(function(item){
          if(item.id!=167 && item.id!=166 && item.attribute4=="OIS")
            jsonExternalCompany.push(item);               
        });

        var list=[];
        jsonExternalCompany.map(function(item){
          list.push({label:toCapitalize(item.name),value:toCapitalize(item.name),id:item.id})
      });
     // list.push({label:'Tasa',value:'Tasa',id:0})
        $("#tx_company_ListaBlack").autocomplete({
         
          source: list//listado para autocompletar
          ,
          //minLength: 3,//minimo de letras a buscar coincidencias
          select: function( event, ui ) 
          {
            //$("#sel_cod_company_"+leng).val(ui.item.id);
            //getCollaborator($("#add_covid_firtname_"+leng),leng);
           
            companyId=ui.item.id;
          }
    
          
      });

    });
}


  var getLocations= function()
  { 
    $("#sel_sede").append("<option value='-1'>Cargando...</option>");
    $("#sel_sede_filter").append("<option value='-1'>Cargando...</option>");
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
      var option = "";
      option+="<option value='0'>Seleccione</option>";

      var option1 = "";
      option1+="<option value='0'>Todas</option>";
      data.map(function(item){

        option+="<option value='"+item.id+"'>"+item.name+"</option>";
        option1+="<option value='"+item.id+"'>"+item.name+"</option>";

      });  
      $("#sel_sede").html(option);
      $("#sel_sede_filter").html(option1);

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
                vw_secury_agent.reloadtableBlackList();
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
	    register:function(){
	    	register();
      },
      showDetail:function(id){
	    	showDetail(id);
      },
      cancelform:function(){
	    	cancelform();
      },
      getGarita:function(idLocation){
	    	getGarita(idLocation);
      },
      deleted:function(id){
	    	deleted(id);
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