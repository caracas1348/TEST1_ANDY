var oTableRecent;
var oTableRecentveh;
var oTableExxe;
var oTableVisita;
var arrayrequestDNI=new Array;
var refresRecient;
var initlist=0;
var noprogramado = false;
var daylimitVeto=14;
var tableTemp;
var plateglobal="";
var dataOIS={};
var datacol;//array para respuesta colaborador directorio
 var  checkRegister = 0;
/*var hora    = momentoActual.getHours();
var minuto  = momentoActual.getMinutes();
var segundo = momentoActual.getSeconds();
var horaImprimible = hora + " : " + minuto;*/
var TYPE_ACCESS_REQUEST = 1;
var jsonTimeLimit   = [];
var exceededPerson  = [];
var cantExecedido   = 0;
var vw_access_event = function(){
    var init = function(){     
      $('#ListtTemporales').on('shown.bs.modal', function (e) {        
        tableTemp.columns.adjust().draw();
       })
       $('#ListtVehiclesrecent').on('shown.bs.modal', function (e) {        
        oTableRecentveh.columns.adjust().draw();
       })
      $("#btnNoprogramado").click(function(){
        
        noprogramado=true;
      });
      $("#btnGubernamental").click(function(){
        noprogramado=true;
      });      
      $("#statusAlcohol").change(function(){
        if ($(this).val() == 1) {
            $(".witness").show();
        }else{
            $(".witness").hide();
        }
      });
       // console.log($('.dropify'));
      if($('.dropify'))
        $('.dropify').dropify();
        // Translated
        /*$('.dropify-fr').dropify({
            messages: {
                default: 'Glissez-déposez un fichier ici ou cliquez',
                replace: 'Glissez-déposez un fichier ou cliquez pour remplacer',
                remove: 'Supprimer',
                error: 'Désolé, le fichier trop volumineux'
            }
        });*/
        // Used events
        var drEvent = $('#input-file-events').dropify();
        drEvent.on('dropify.beforeClear', function(event, element) {
            return confirm("Do you really want to delete \"" + element.file.name + "\" ?");
        });
        drEvent.on('dropify.afterClear', function(event, element) {
            alert('File deleted');
        });
        drEvent.on('dropify.errors', function(event, element) {
            console.log('Has Errors');
        });
        /*var drDestroy = $('#input-file-to-destroy').dropify();
        drDestroy = drDestroy.data('dropify')*/
        /*$('#toggleDropify').on('click', function(e) {
            e.preventDefault();
            if (drDestroy.isDropified()) {
                drDestroy.destroy();
            } else {
                drDestroy.init();
            }
        });*/


      TYPE_ACCESS_REQUEST  = 1;
        $("#tx_access_dni").keypress(function(event) {
          //console.log(event.keyCode);
         
        	if(event.keyCode == 13){
           
            //validatedni($("#tx_access_dni").val())
        		validate($("#tx_access_dni").val());
        	}
        });
        $("#tx_access_name").keypress(function(event) {
        	//console.log(event.keyCode);
        	if(event.keyCode == 13){
            validateName($("#tx_access_name").val());
            
        	}
        });

       
        

        $("#tx_dni_vehicle").keypress(function(event) {
               
          if(event.keyCode == 13){
            if($("#tx_dni_vehicle").val()!="")
            searchVehicle($("#tx_dni_vehicle").val());
          }
        });

        $('label[name="lab_type_request-access"]').on('click', function(event) {       
          var id = $(this).attr("id");
          var array =id.split("_");
          var val = array[1];
          TYPE_ACCESS_REQUEST = val;  
          //alert(TYPE_ACCESS_REQUEST);    
          //tableListRecent();
        });
              
        $("#input-file-vehicle_1").change(function(){
          getBaseUrl("input-file-vehicle_1","base64-vehicle_1");
        });
        $("#input-file-vehicle_2").change(function(){
          getBaseUrl("input-file-vehicle_2","base64-vehicle_2");
        });
        $("#input-file-vehicle_3").change(function(){
          getBaseUrl("input-file-vehicle_3", "base64-vehicle_3");
        });
        $("#input-file-vehicle_4").change(function(){
          getBaseUrl("input-file-vehicle_4","base64-vehicle_4");
        });
        $("#input-file-vehicle_5").change(function(){
          getBaseUrl("input-file-vehicle_5","base64-vehicle_5");
        });
        setInterval(function(){mueveReloj();},1000);
        //refresRecient=setInterval(function(){tableListRecent();},60000);
        //tableListRecent();
        getCollaboratorEmail();

        $("#sendEmailForm").click(function(){          
          console.log('send');
          var email = $("#tx_collaborator_email_form").val();
          var name = $("#tx_collaborator_name").val();
          var message = $("#tx_message").val();
          var sede = $("#sedeHeader").text();
          console.log(message);

          if (email != '' && email != null && name != '' && name != null) {
            setTimeout(function()
            {
                swal({
                    title: "Procesando...",
                    text: "Por favor espere.",
                    //timer: 3000,
                    type: "info",
                    showConfirmButton: false
                    });
                    sendEmailForm(email,name,message,sede);
            },800);
            
          }else{
            swal("Error!", "Debe ingresar un colaborador.", "error");
          }
          
        });
        $("#cancelEmailForm").click(function(){

        });
        
        $('#modalShowRequestNP').on('shown.bs.modal	', function (e) {
          $("#sel_company_1").change(function(){
            //alert($(this).val());
            jsonExternalCompanySelected=[];
            vw_access_request.updateListCompanySelect();
            //alert($(this).val());
            vw_access_request.fnGetUserPersonResponsable($(this).val(),1);
          });
        })
      
        $("#btnAddTool").click(function(){
          var tool_name = $("#tx_add_tool_name").val();
          var tool_serial_number = $("#tx_add_tool_serial_number").val();

          if (tool_name.trim().length>0 && tool_serial_number.trim().length>0) {
            $("#listTools").append('<tr><td>'+tool_name+'</td><td>'+tool_serial_number+'</td><td><input type="checkbox"  id="chk_tool" name="chk_tool" checked></td><td hidden>0</td></tr>');
            var tot = $("#listTools tr").length;
            $("#totTools").html(tot);
          }else{
            swal("Error!", "Debe rellenar el nombre y el numero de serie de la herramienta.", "error");
          }

        })

        $("#butEditBlack").click(function(){
          setTimeout(function(){tableListRecent(),2000});
        });


        $("#tx_collaborator_name_autoriza").autocomplete({   
          change: function (event, ui) {
              if (ui.item === null) {
                  $("#tx_collaborator_name_autoriza").val("");
                  $(this).val("");
              }
          }, 
          source: function( request, response ) {
              var filter = $("#tx_collaborator_name_autoriza").val();
              ///console.log(filter);
              var param= {filter:filter};
              var headers = {"Authorization":TOKEN_CLIENT,"apiKey":"r$3#23516ewew5"}
              $.ajax({
              //url: apiurlsecurity+"/api/Get-Collaborator?code="+GetCollaborator+"&httpmethod=objectlistsuperintendente",
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
                  //console.log(data);
                  data.value.forEach(item => {
                      var json ={}
                      json.label = item.displayName;
                      json.value = item.displayName;
                      json.mail = item.userPrincipalName;
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
              $("#tx_collaborator_email_form_autoriza").val(ui.item.mail);
              $("#tx_collaborator_name_autoriza").val(ui.item.value);
              $("#tx_collaborator_idhash_autoriza").val(ui.item.id);
              
          },
          open: function() {
              $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
              $(".ui-autocomplete").css({'z-index':'10100'});
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
        //obtenemos los limityes de tiempo
        getTimeLimit();
        //--------------------------------
    }

    var initValidate = function(){
        
        $('#txt_search_visita').on( 'keyup', function () {      
            oTableVisita.search($(this).val()).draw();
            if($(this).val()=="")//limpia filtro buscado
            oTableVisita.search( '' ).columns().search( '' ).draw();
        });
        /**/
        setInterval(function(){mueveReloj();},1000);  

       
    }
    var mueveReloj = function (){
        
      /*     
      hora    = momentoActual.getHours()
      minuto  = momentoActual.getMinutes()
      segundo = momentoActual.getSeconds()
      horaImprimible = hora + " : " + minuto;*/
      var momentoActual = new Date();
      momentoActual =  moment(momentoActual).format("HH:mm");
      $("#span_reloj").text(momentoActual);
    }

  var searchVehicle = function(val){
    var name = getCookie('vtas_fullname'+sessionStorage.tabVisitasa);
    var dni = $("#tx_dni_vehicle").val();
    var url = apiurlaccessrequest+"/api/Get-Vehicle-All?code="+GetVehicleAll+"&httpmethod=getVehicleByDocument&identity_document="+dni;                   
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
      $("#tx_driver_license_number").val(data.driver_license_number); 
      $("#tx_driver_license_category").val(data.driver_license_category); 
      $("#tx_brand").val(data.brand); 
      $("#tx_model").val(data.model); 

    });

      
  }

    var sendEmailForm = function(email,name,message,sede) {
        console.log(email,name,message);

        //var colaborador = $("#tx_collaborator_name").val();
        var url = apiurlaccessregistries+"/api/Post-AccessEvent-All?code="+PostAccessEventAll+"&httpmethod=sendMailForm&email="+email+"&name="+name+"&message="+message+"&sede="+sede;                   
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
            setTimeout(function(){
                swal("Enviado!", "Proceso realizado con éxito.", "success");  
                //$("#titleModule").text("Ingresos solicitados");  
                $("#tx_collaborator_email_form").val('');
                $("#tx_collaborator_name").val('');
                $("#tx_message").val('');
                $('.modal-backdrop').remove();
            },600);
        });
    }

    var  secondsToHms = function(seconds) {
      if (!seconds) return '';
     
      let duration = seconds;
      let hours = duration / 3600;
      duration = duration % (3600);
     
      let min = parseInt(duration / 60);
      duration = duration % (60);
     
      let sec = parseInt(duration);
     
      if (sec < 10) {
        sec = `0${sec}`;
      }
      if (min < 10) {
        min = `0${min}`;
      }
      if (parseInt(hours, 10) > 0) {
        // return `${parseInt(hours, 10)}h ${min}m ${sec}s`
        return `${parseInt(hours, 10)}:${min}:${sec}`
      }
      else if (min == 0) {
        return `${sec}s`
      }
      else {
        return `${min}m ${sec}s`
      }
    }

    var reloadAccessRequestList = function(){
      if(oTableVisita)
        oTableVisita.ajax.reload();
      else
        initAccessRequestList();
    }
    var jsonLocation=[];
    var getLocationss= function()
    { 
      
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
        jsonLocation=[];
        data.map(function(item){
          jsonLocation.push(item);               
        });  
         
        selectLocation("sel_sede");
       
      });
      //console.log(jsonLocation)
  }

  var getTimeLimit = function()
  {
    var url = apiurlaccessregistries+"/api/Get-AccessEvent-All?httpmethod=objectlisttimelimit&code="+GetTimiLimit+"";     
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
      jsonTimeLimit=data;
     // console.log(jsonTimeLimit);
      /*data.map(function(item){
        jsonTimeLimit.push(item);               
      });*/
    });
  }
  
  var selectLocation = function(id)
  {
    var option = "";    
   var obj=$("#"+id)[0]
        option+="<option value='0'>Todos</option>";
     
    jsonLocation.map(function(item){

        option+="<option value='"+item.id+"'>"+item.name+"</option>";
    });
    $(obj).html(option);

    if(getCookie("vtas_sede"+sessionStorage.tabVisitasa)!="")
    $(obj).val(getCookie("vtas_sede"+sessionStorage.tabVisitasa))

    initAccessRequestList();

  }
  
  var getExternalCompanyy= function(){
    //alert("aquí estamos");
    
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
        jsonExternalCompany=[];
        data.map(function(item){
            jsonExternalCompany.push(item); 
            
            var option = "";
            option+="<option value='0'>Todas</option>";
            jsonExternalCompany.map(function(item){
                option+="<option value='"+item.name+"'>"+toCapitalize(item.name)+"</option>";
            });
            $("#sel_company").html(option);

        });
        
    });
}



    var initAccessRequestList = function(status){
      updateTable(0);
      $("#txt_search_visita").off();
      $('#txt_search_visita').on( 'keyup', function (event) 
      {   
           
        oTableVisita.search($(this).val()).draw();
        if($(this).val()=="")//limpia filtro buscado
        oTableVisita.search( '' ).columns().search( '' ).draw();
        
        if(event.which==13)
        {
          var enter = 1;
          updateTable(enter);
          
        }

      });
     //alert("sssssssssssss");    
    }



    var updateTable= function(enter=0){

    if(refresRecient)//limpia el timer
    {
        clearInterval(refresRecient);
    }

      if(oTableVisita){
        oTableVisita.clear().draw();
        oTableVisita.destroy();
      }
      //verificamos el check activo
      if(!status)
        status      = $('input:radio[name=chb_status_list]:checked').val();
      var search_type = '1';
      var httpmethod  = 'objectlistreport';
      var search  = $("#txt_search_visita").val().trim().length==0?"":"&search="+$("#txt_search_visita").val();
      var param = "&id_location="+$("#sel_sede").val()+"&company="+$("#sel_company").val()+"&area="+$("#sel_area").val()+"&tipoingreso="+$("#sel_type").val()+"&date_time_ini="+$("#tx_date_initi").val()+"&date_time_end="+$("#tx_date_endi").val()+"&id_request_type="+TYPE_ACCESS_REQUEST+"&group=-1&status_id=0"+search+"&type_access="+$("#sel_type_access").val();
      /*if(enter==1)
        param = "&id_request_type="+TYPE_ACCESS_REQUEST+"&group=-1&search="+$('#txt_search_visita').val();
      */
      var url         = apiurlaccessregistries+"/api/Get-AccessEvent-All?code="+Getaccesseventallcode+"&search_type="+search_type+"&httpmethod="+httpmethod+param;
      var headers = {
          "apikey":constantes.apiKey
      }
      oTableVisita = $('#tb_list_visita').DataTable({      
        ordering  : false,
        info      : false,
        paging:false,
        searching : true,
        scrollY   : '60vh',
        scrollCollapse: true,
        responsive: true,
        dom: 'Bfrtip',
        buttons: [{
          extend: 'excelHtml5',
          className:'btn-success font-weight-bold ',              
          text: 'Exportar a Excel',
          //messageTop: 'Exportar a Excel',
          exportOptions: {
            columns: [0,1,2,3,4,5,6,7,8,9]
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
            columns: [0,1,2,3,4,5,6,7,8,9]
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
        error: function (xhr, error, thrown) {
  
          console.log(xhr);
          console.log(xhr.status)
          var textError=thrown;
          var status=xhr.status+' - '+xhr.statusText;//500 error servidor
          showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
          
          return;
  
  
          //console.log( xhr, error, thrown );
          hideLoading();
      },
        drawCallback: function () {           
        },
        ajax      :{
          type: "POST",
          url:  url,
          headers:headers,
          crossDomain: true,
          dataType: "json",
          dataSrc: function ( req ) 
          {
            
              var data =[];
              var i = 1;
              //console.log(req);
              arrayGlobalServicesProg=req;
              //console.log(req.length);
              var totalExcedido = 0;
              var cantInPlata = 0;
  
              $("#cantTotal").text(req.length);
              req.map(function(item){

                var id          = item.id;
                var nowdate     = moment();
                var access      = moment(item.access_time);
                var accessTime  = moment(item.date_time).format('LT');
                var exit        = moment(item.exit_time);
                var exitTime    = moment(item.exit_time).format('LT');
                var week        = moment(item.date_time).format('ddd');//dddd
                var month       = moment(item.date_time).format('MMM');//
                var day         = moment(item.date_time).format('D'); ;
                var startDate   = week +" "+day +" de "+ month;
                var diffMinutes = exit.diff(access, 'seconds');//minutes
                var diffMinutesExces = nowdate.diff(exit, 'seconds');
                
                var type_access ="Normal";
                  if(item.attribute3=="Excepcional")
                    type_access ="Excepcional";
                  else  if(item.attribute3=="Temporal")
                    type_access ="Temporal";
                  else  if(item.attribute3=="Vencido")
                    type_access ="Vencido";

                var vPicture = "images/iconos/user.svg";
                if (item.person_picture != null) {
                  vPicture = item.person_picture;
                }
                var buttonDet = '';
                
                if(type_access.trim()=="Excepcional"){
                  buttonDet = '<button type="button" class="btn " onclick="vw_access_event.showDetail(&quot;'+item.exceptional_observation+'&quot;,&quot;'+item.exceptional_responsible_name+'&quot;)"><i class="material-icons btdetail" style="cursor:pointer ">more_vert</i></button>';
                }
                
                //vw_black_list.thumbsUp(12010,true,'',"design soft","images/iconos/user.svg","null,","5654645" );
                
                var h = diffMinutes / 60 | 0;
                var m = diffMinutes % 60 | 0;
                var diffTime = secondsToHms(diffMinutes);//moment.utc().hours(h).minutes(m).format("hh:mm");
               
                var statusColor="";
                var statusColorTime="text-green-lime";
                if(item.id_status == 1){// pendiente por datos                
                  statusColor ="statusPperDatostx";
                }
                if(item.id_status == 2){// pendiente por aprobar                
                  statusColor ="statusPperAprovetx";
                }
                if(item.id_status == 3){// Programada (aprobadas)
                  statusColor ="statusPperProgtx";
                }
                if(item.id_status == 4){// en proceso            
                  statusColor ="statusPperCoursetx";
                }
                if(item.id_status == 5){// rechazado            
                  statusColor ="text-danger";
                }
                
                
  
                var nomVisitante = 'SIN INGRESOS';
                if(item.person_name!=null){nomVisitante = item.person_name}
                var imgAutorizerPerson      = "";
                var imgAutorizerPerson2     = "";
                
                var authorizerPersons       = item.authorized_person?item.authorized_person:[];
                var lengthAuthorizerPerson  = authorizerPersons.length;
                var cant= lengthAuthorizerPerson;
                var iconPerson ='';
                var reason=item.id_status==5?item.rejection_reason:'';
                var cantPersonExceso = 0;
                if(cant<=9 && cant>0)
                  cant='0'+cant;

                if(lengthAuthorizerPerson>0){
                  var nameParticiántes   = [];              
                  var i = 0;
                  authorizerPersons.forEach(element => {
                    i++;
                    //console.log(i);
                    iconPerson+='<img class="m-1" src="images/iconos/persons.svg">';
                    nameParticiántes.push(toCapitalize(" "+element.first_mane));
                    if(element.action_type==true && item.id_status == 7 && diffMinutesExces>item.time_exceeded){
                      cantPersonExceso++;
                      totalExcedido++;
                    }
  
                    if(element.action_type==true && element.attribute1=="1"){
                      cantInPlata++;
                    }
                  });
                  //alert(secondsToHms(diffMinutesExces));
                  if(item.id_status == 7 && cantPersonExceso>0){//finalizado
                    statusColorTime = "text-danger"
                    statusColor = "text-danger"
                    diffTime = secondsToHms(diffMinutesExces-item.time_exceeded);
                  }
  
                  if(item.id_status == 7 && cantPersonExceso==0){//finalizado
                    statusColorTime = "text-warning-bst"
                    statusColor = "text-danger"
                    diffTime = secondsToHms(item.time_exceeded);
                  }
  
                  imgAutorizerPerson = '<div class="card border-0 h-0  m-0 bg-muted" style="box-shadow:0 0px 0px 0 rgba(0, 0, 0, 0.0), 0 0px 0px 0px rgba(0, 0, 0, 0), 0 0px 0px 0 rgba(0, 0, 0, 0)!important;">';
                  imgAutorizerPerson+='<div class="card-body p-1"><div class="row col"><h4 class="border border-top-0 border-bottom-0 border-left-0">'+cant+'</h4><span class="card-title">';                
                  imgAutorizerPerson+=iconPerson; 
                  imgAutorizerPerson+='</span></div><span class="card-subtitle mb-2 text-muted d-inline-block text-truncate " style="max-width: 250px;">'+nameParticiántes.toString()+'</span> </div>'; //
                  imgAutorizerPerson+='</div>';
                  imgAutorizerPerson2 = '<div > '+ nameParticiántes.toString()+'</div>';
  
                  
                }
                var action_type  = "Ingreso";
                if(item.action_type==false){
                    action_type  = "Salida";
                }
                if(item.id==0)
                {
                  action_type="Sin ingresar";
                }
                var identity_document = "";
                var name_company = "";
                if(item.authorized_person.length>0){
                  identity_document = item.authorized_person[0].identity_document;
                  name_company = item.authorized_person[0].name_company;
                }
                var row = {
                    number            :i//<img src="images/iconos/motivo.svg"></div>
                    ,document         :identity_document
                    ,participant      :imgAutorizerPerson2
                    ,type             :item.is_collaborator?'Colaborador':'Contratista'
                    ,area             :item.name_area
                    ,sede             :item.name_location
                    ,type_access      :type_access
                    ,company          :name_company
                    ,accion		        :item.action_type?`<div class="text-success">${action_type}</div>`:`<div class="text-danger">${action_type}</div>` 
                    ,acces_date       :accessTime//item.date_time.replace('T',' ')
                    ,acces_dates      :startDate //item.date_time.replace('T',' ')
                    ,temperature      :item.temperature?item.temperature:''// `<div ><input style="border:1px solid #999; padding:5px; border-radius:10px; width:80px"  step="0.1"  type="number" min="32" max="43"  maxlength="5" onkeyup="validarMoneda(this.id)" id="span_temperatures" value="${item.temperature?item.temperature:''}" ></div>`
                    ,button           :buttonDet
   }
                i++;
                data.push(row);
                //return
              });
             // $("#span_en_planta").html(cantInPlata);
             // $("#span_excedido").html(totalExcedido);
            return data;
          } 
        },
        columns: [
          { title:"Documento",data: "document",align: "left"},
          { title:"Nombre y Apellido",data: "participant",align: "left"},
          { title:"Tipo de Ingreso",data: "type",align: "left"},
          { title:"Área",data: "area",align: "left"},//
          { title:"Sede",data: "sede",align: "left"},//
          { title:"Empresa",data: "company",align: "left"},//
          { title:"Acción",data: "accion",align: "left"},
          { title:"Tipo",data: "type_access",align: "left"},          
          { title:"Hora de Registro",data: "acces_date",align: "left"},//startDate
          { title:"Fecha de Registro",data: "acces_dates",align: "left"},//startDate
          { title:"Temperatura",data: "temperature",align: "center"},
          { title:"",data: "button",align: "center"},
          
        
        ],
      initComplete: function(settings, json) {
        //alert("culminó la carga");
        //$('[data-toggle="tooltip"]').tooltip();      
      }
      });
    }

    var validateName = function (val)
    {
      $("#splashLoading").show();
            var name = val;
            var url = apiurlblacklist+"/api/Get-Blacklist-User?code="+getblacklistusercode+"&httpmethod=verifyblacklistName&name="+name;                   
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
              //console.log(data)  ;      
              //alert("aquí");
                if (data.vetado == 1) {
                     $("#add_contacto_nombre_1").val('');
                     $("#add_contacto_apellido_1").val('');
                     $("#add_correo_1").val('');
                    swal("Acceso Denegado!", data.message, "error");
                }
                else{
                  //buscamos persona de alto riesgo
                  var match = "FULLNAME";
                  var dataRiesgo = getObjectByValue(PERSONAL_RESTRINGIDO,match,name);                  
                  if(dataRiesgo.length>0){
                    $("#add_contacto_nombre_1").val('');
                    $("#add_contacto_apellido_1").val('');
                    $("#add_correo_1").val('');
                    swal("Acceso Denegado!","Usuario en Grupo de Riesgo", "error");
                  }
                  else if(data.vetado == 0 && data.error==false){
                    //getAccessData(val,1);
                    swal("Acceso permitido!",data.message, "success");
                  }
                  else{
                    swal("Acceso Denegado!","Sin acceso", "error");
                  }
                  
                }
                setTimeout(function(){
                    $("#splashLoading").fadeOut();
                },500);
            }).fail( function( jqXHR, textStatus, errorThrown ) {
              setTimeout(function(){
                $("#splashLoading").fadeOut();
              },500);
            });
    }

    var checkRiskList = function(dni){
      //alert(dni);
      var url         = apiurlblacklist+"/api/Get-Risklist-User?code="+GetRisklistUsercode+"&httpmethod=verifyRiskList&identity_document="+dni;              
      var headers ={
          "apikey":"r$3#23516ewew5"        
      }
      var resp ;
      var riesgo = [];
      $.ajax({                    
          method: "POST",
          url:  url,
          async:false,
          headers:headers,
          crossDomain: true,
          dataType: "json",
      }).done(function(data)
      {
        //1-> está activo en lista de riesgo
        //2-> está inactivo en lista de riesgo
        //null-> no está registtrado en la lista de riesgo
        if(data.status==1){
          riesgo.push({
            status:1,
            name:data.name
          });
        }
       

      });      
      return riesgo;
    }

    var checkDataOIS= function(dni){


      var url         = apiurlsecurity+"/api/Get-OIS?code="+GetOIS+"&httpmethod=object&dni="+dni.trim();             
      var headers ={
          "apikey":"r$3#23516ewew5"        
      }
      var ois = [];
      $.ajax({                    
          method: "POST",
          url:  url,
          async:false,
          headers:headers,
          crossDomain: true,
          dataType: "json",
      }).done(function(data)
      {

        ois=data;
       

      });      
      return ois;
    }

    var validatedni = function (val)
    {
      
      vt_validateSecury(val,'security');
      return
      //identificar si es colaborador-----------------------------------------
      $("#sendIngresoExcepcional").off();
      $("#btnAutorizar").off();
     var colaboratorinterno=0;
       
             // console.log("Buscando "+val+" en Directorio colaboradores......") 
              var param= {filter:val};
              var headers = {"Authorization":TOKEN_CLIENT,"apiKey":"r$3#23516ewew5"}
              $("#add_covid_firtnameload_1").show();
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
                 
                datacol=JSON.parse(datacolaborator);
                  //console.log(data,data.value.length)
                  if(datacol.value && datacol.value.length>0)
                  {
                       console.log("Colaborador Identificado")
                       colaboratorinterno=1;
                       
                  }
                  else{
                      console.log("Colaborador no Identificado");

                      dataOIS=checkDataOIS(val);
                  }
                  
                  //inicio de validacione*****************************************************************************

                    var now=new Date();

                      var nowdesde=`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} 00:00`;
                      var nowhasta=`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} 23:59`;
                      var textBotton="";
                    showLoading();
                    var ImageButtons =`
                    <input type="file" id="photo" accept="image/*" hidden>
                    <input type="text" id="base64" hidden>
                    <button type="button" id="btnShowCamera"  class="btn btn-green-lime btn-raised btn-rounded " style="padding: 0rem 1rem!important; text-transform:lowercase!important; height: 24px; top:-25px" title="Tomar Foto"   onclick="">
                        <img  src="images/iconos/capture.svg" class="rounded-circle img-fluid" style="height:25px; width: 15px;">
                    </button>
                    <button type="button" id="btnInputFile"   class="btn btn-info btn-raised btn-rounded " style="padding: 0rem 1rem!important; text-transform:lowercase!important;height: 24px; top:-25px" title="Buscar en disco"   onclick="">
                        <img  src="images/iconos/file.svg" class="rounded-circle img-fluid" style="height:25px; width: 15px;">
                    </button>
                    <button type="button" id="btnUpdateImage" class="btn btn-green-lime btn-raised btn-rounded " style="padding: 0rem 1rem!important; text-transform:lowercase!important;height: 24px;display:none; top:-25px" title="Guardar"   onclick="">
                        <img  src="images/iconos/save.svg" class="rounded-circle img-fluid" style="height:25px; width: 15px;"
                    ></button>
                `;
            var identity_document = val.trim();
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
             // console.log(data)
              //console.log(data.id)
             var  classBotton ='btn-green-lime';;
              var match = "DNI";
              //var dataRiesgo = getObjectByValue(PERSONAL_RESTRINGIDO,match,identity_document);
              var riesgo = checkRiskList(identity_document);

              if(data.entry_datetime)//se valida ingreso temporal---------------------------------------------------------------------------------------------
              {

                console.log("Validando Ingreso temporal...")

                if(data.id_location_temp==getCookie("vtas_sede"+sessionStorage.tabVisitasa)  && data.status_request==1 && (new Date(data.entry_datetime.split('T')[0]+' 23:59')>new Date(nowdesde)&&new Date(data.entry_datetime.split('T')[0]+' 23:59')<=new Date(nowhasta)) )//validacion de dia de la cita)
                {
                    console.log("Ingresando como Temporal")
                   
                                          var img ="images/iconos/usersecu.svg";
                                            if(data.picture){
                                              img = data.picture;
                                            }

                                              var classBotton ='btn-green-lime';
                                              var colreMessage="bg-warning";
                                              var check_in = 0;
                                              if(data.check_in==0){
                                              check_in = 1;
                                                var textMessage="Ingreso Autorizado";
                                                textBotton = '<span style="text-transform: uppercase;">A</span>utorizar ingreso';
                                                var typeIngres ='Ingreso Temporal<br>No puede permanecer más de dos horas en la Sede.';
                                                var colreMessage="bg-success";
                                              }
                                                                    
                                              if(data.check_in==1){
                                                textMessage="Salida";
                                                textBotton = '<span style="text-transform: uppercase;">R</span>egistrar salida';
                                                var typeIngres ='';
                                                var colreMessage="bg-success";
                                              }
                                                
                                              
                                              data.collaborator = '';

                                              $("#textNotificationAccess").text(textMessage)
                                              $("#barNotificationAccess")[0].className="card-header text-white "+colreMessage;

                                              $("#showAccessDataCard").empty();
                                              $("#showAccessDataCard").html(`
                                                                        <div class="row p-2" ><div class="col-md-12" style="text-align:center!important;"><span class="messagegarita" style="border-bottom: 0px!important;">${typeIngres}</span></div></div>
                                                                      
                                                                        
                                                                        <div class="row">
                                                                        <div class="col-md-12 pb-0" style="text-align: center!important;">
                                                                        <img id="img_visitante" src="${img}" alt="" class="rounded-circle img-fluid" style="height: 16vh; width: 16vh;">
                                                                          <br>
                                                                          ${ImageButtons}
                                                                        </div>
                                                              <div class="col-md-12" style="text-align: center!important;margin-top: 2;"><h5 id="span_name_visitante" translate="no">${toCapitalize(data.fullname)}</h5></div>
                                                              <div class="col-md-12" style="text-align: center!important;"><h6 class="text-muted " id="span_number_document" >Documento: ${data.identity_document}</h6></div>
                                                              
                                                                        <div class="col-12" style="text-align: center!important;"><hr>
                                                                          <div class="row">
                                                                              <div class="col-6 text-left pl-4">Empresa:</div>
                                                                              <div class="col-6">${data.name_company!=undefined?data.name_company:'--'}</div>
                                                                          </div>
                                                                        </div>

                                                                        <div class="col-12" style="text-align: center!important;"><hr>
                                                                          <div class="row">
                                                                            <div class="col-6 text-left pl-4">Último Tamizaje realizado:</div>
                                                                            <div class="col-6">${data.attention_date!=undefined?formatDateTime(data.attention_date,2,true):'--'}</div>
                                                                          </div>
                                                                        </div>

                                                                        <div class="col-12" style="text-align: center!important;"><hr>
                                                                          <div class="row">
                                                                            <div class="col-6 text-left pl-4">Persona que autoriza:</div>
                                                                            <div class="col-6" id="span_name_organizer">${data.responsible_name!=undefined?toCapitalize(data.responsible_name):'--'}</div>
                                                                          </div>
                                                                        </div>

                                                                        <div class="col-12" style="text-align: center!important;"><hr>
                                                                          <div class="row">
                                                                            <div class="col-6 text-left pl-4" id="span_departament">Área</div>
                                                                            <div class="col-6">${(data.area)?data.area:"--"}</div>
                                                                          </div>
                                                                        </div>

                                                                        <div class="col-12" style="text-align: center!important;"><hr>
                                                                        <div class="row">
                                                                          <div class="col-6 text-left pl-4" >Temperatura</div>
                                                                          <div class="col-6"><input style="border:1px solid #999; padding:5px; border-radius:10px; width:80px"  step="0.1"  type="number" min="32" max="43"  maxlength="4" onkeyup="validarMoneda(this.id)" id="span_temperatures" ></div>
                                                                        </div>
                                                                      </div>

                                                                      
                                                                </div>   

                                                              <div class="text-center" id="footer_action">
                                                              <input type="hidden" id="hid_location" name="hid_location" value="${data.id_location}">
                                                              <input type="hidden" id="hid_id_blacklist" name="hid_id_blacklist" value="${data.id}">
                                                              <input type="hidden" id="hid_area_name" name="hid_area_name" value="${data.area}">
                                                              <input type="hidden" id="hid_action_type" name="hid_action_type" value="${data.action_type}">
                                                              <input type="hidden" id="hid_identity_document" name="hid_identity_document" value="${data.identity_document}">
                                                              
                                                              <button type="button" id="btnAutorizarTemp"  class="btn ${classBotton} btn-raised btn-rounded mt-2"  style="padding: 0rem 1rem!important; text-transform:lowercase!important;  height: 30px;" >${textBotton}</button>
                                                              </div>`);

                                                              $("#btnAutorizarTemp").click(function(){
                                                                //onclick="vw_access_event.saveCheckInCovid19Seg(${data.id},${check_in},'Temporal')"
                                                                $("#tx_collaborator_name_autoriza").val(data.responsible_name);
                                                                $("#tx_collaborator_email_form_autoriza").val(data.responsible_email); 
                                                                
                                                                var check_in = data.check_in==0?1:0;
                                                                saveCheckInCovid19Seg(data.id,check_in,'Temporal');
                                                               });
                                                              hideLoading();
                                                              return;
                }
                else if( data.check_in==1 && data.list_type==0 && data.status_request==0)
                {
                  console.log("Saliendo como Temporal")
                   
                  var img ="images/iconos/usersecu.svg";
                    if(data.picture){
                      img = data.picture;
                    }

                      var classBotton ='btn-green-lime';
                      var colreMessage="bg-warning";
                      var check_in = 0;
                      if(data.check_in==0){
                      check_in = 1;
                        var textMessage="Ingreso Autorizado";
                        textBotton = '<span style="text-transform: uppercase;">A</span>utorizar ingreso';
                        var typeIngres ='Ingreso Temporal<br>No puede permanecer más de dos horas en la Sede.';
                        var colreMessage="bg-success";
                      }
                                            
                      if(data.check_in==1){
                        textMessage="Salida";
                        textBotton = '<span style="text-transform: uppercase;">R</span>egistrar salida';
                        var typeIngres ='';
                        var colreMessage="bg-success";
                      }
                        
                      
                      data.collaborator = '';

                      $("#textNotificationAccess").text(textMessage)
                      $("#barNotificationAccess")[0].className="card-header text-white "+colreMessage;

                      $("#showAccessDataCard").empty();
                      $("#showAccessDataCard").html(`
                                                <div class="row p-2" ><div class="col-md-12" style="text-align:center!important;"><span class="messagegarita" style="border-bottom: 0px!important;">${typeIngres}</span></div></div>
                                              
                                                
                                                <div class="row">
                                                <div class="col-md-12 pb-0" style="text-align: center!important;">
                                                <img id="img_visitante" src="${img}" alt="" class="rounded-circle img-fluid" style="height: 16vh; width: 16vh;">
                                                  <br>
                                                  ${ImageButtons}
                                                </div>
                                      <div class="col-md-12" style="text-align: center!important;margin-top: 2;"><h5 id="span_name_visitante" translate="no">${toCapitalize(data.fullname)}</h5></div>
                                      <div class="col-md-12" style="text-align: center!important;"><h6 class="text-muted " id="span_number_document" >Documento: ${data.identity_document}</h6></div>
                                      
                                                <div class="col-12" style="text-align: center!important;"><hr>
                                                  <div class="row">
                                                      <div class="col-6 text-left pl-4">Empresa:</div>
                                                      <div class="col-6">${data.name_company!=undefined?data.name_company:'--'}</div>
                                                  </div>
                                                </div>

                                                <div class="col-12" style="text-align: center!important;"><hr>
                                                  <div class="row">
                                                    <div class="col-6 text-left pl-4">Último Tamizaje realizado:</div>
                                                    <div class="col-6">${data.attention_date!=undefined?formatDateTime(data.attention_date,2,true):'--'}</div>
                                                  </div>
                                                </div>

                                                <div class="col-12" style="text-align: center!important;"><hr>
                                                  <div class="row">
                                                    <div class="col-6 text-left pl-4">Persona que autoriza:</div>
                                                    <div class="col-6" id="span_name_organizer">${data.responsible_name!=undefined?toCapitalize(data.responsible_name):'--'}</div>
                                                  </div>
                                                </div>

                                                <div class="col-12" style="text-align: center!important;"><hr>
                                                  <div class="row">
                                                    <div class="col-6 text-left pl-4" id="span_departament">Área</div>
                                                    <div class="col-6">${(data.area)?data.area:"--"}</div>
                                                  </div>
                                                </div>

                                                <div class="col-12" style="text-align: center!important;"><hr>
                                                <div class="row">
                                                  <div class="col-6 text-left pl-4" >Temperatura</div>
                                                  <div class="col-6"><input style="border:1px solid #999; padding:5px; border-radius:10px; width:80px"  step="0.1"  type="number" min="32" max="43"  maxlength="4" onkeyup="validarMoneda(this.id)" id="span_temperatures" ></div>
                                                </div>
                                              </div>

                                              
                                        </div>   

                                      <div class="text-center" id="footer_action">
                                      <input type="hidden" id="hid_location" name="hid_location" value="${data.id_location}">
                                      <input type="hidden" id="hid_id_blacklist" name="hid_id_blacklist" value="${data.id}">
                                      <input type="hidden" id="hid_area_name" name="hid_area_name" value="${data.area}">
                                      <input type="hidden" id="hid_action_type" name="hid_action_type" value="${data.action_type}">
                                      <input type="hidden" id="hid_identity_document" name="hid_identity_document" value="${data.identity_document}">
                                      
                                      <button type="button" id="btnAutorizarTemp"  class="btn ${classBotton} btn-raised btn-rounded mt-2"  style="padding: 0rem 1rem!important; text-transform:lowercase!important;  height: 30px;" >${textBotton}</button>
                                      </div>`);

                                      $("#btnAutorizarTemp").click(function(){
                                        //onclick="vw_access_event.saveCheckInCovid19Seg(${data.id},${check_in},'Temporal')"
                                        var check_in = data.check_in==0?1:0;
                                        saveCheckInCovid19Seg(data.id,check_in,'Temporal');
                                       });
                                      hideLoading();
                                      return;
                }

                //---------------------sin ingreso temporal autorizado
                if(data.list_type==0)
                {
                hideLoading();
                  $("#add_contacto_nombre_1").val('');
                     $("#add_contacto_apellido_1").val('');
                     $("#add_correo_1").val('');
                     //swal("Acceso Denegado!", data.message, "error");
                    var img ="images/iconos/usersecu.svg";
                    if(data.picture){
                      img = data.picture;
                      //ImageButtons = '';
                    }

                     var colreMessage="bg-danger";
                    
                       

                        $("#textNotificationAccess").text("Acceso Denegado")
                        $("#barNotificationAccess")[0].className="card-header text-white "+colreMessage;
                        $("#showAccessDataCard").empty();
                        $("#showAccessDataCard").html(`

                        <div class="row" ><h6 class="col-md-12" style="text-align:center!important;"><span class="messagegarita" style="border-bottom: 0px!important;"></span></h6></div>
                                                                                
                                                   
                                                   <div class="row">
                                                   <div class="col-md-12" style="text-align: center!important;">
                                                   <img id="img_visitante" src="${img}" alt="" class="rounded-circle img-fluid" style="height: 16vh; width: 16vh;">
                                                   <br>
                                                    ${ImageButtons}
                                                   </div>
                                                    <div class="col-md-12" style="text-align: center!important;margin-top: 10;"><h4 id="span_name_visitante" translate="no">${toCapitalize(data.fullname)}</h4></div>
                                                    <div class="col-md-12" style="text-align: center!important;"><h6 class="text-muted " id="span_number_document" >Documento:${data.identity_document}</h6></div>
                                                              <div class="col-12" style="text-align: center!important;"><hr>
                                                              <div class="row">
                                                                  <div class="col-6 text-left pl-4">Empresa:</div>
                                                                  <div class="col-6">${data.name_company!=undefined?data.name_company:'--'}</div>
                                                              </div>
                                                            </div>

                                                            <div class="col-12" style="text-align: center!important;"><hr>
                                                              <div class="row">
                                                                <div class="col-6 text-left pl-4">Último Tamizaje realizado:</div>
                                                                <div class="col-6">${data.attention_date?formatDateTime(data.attention_date,2,true):'--'}</div>
                                                              </div>
                                                            </div>

                                                            <div class="col-12" style="text-align: center!important;"><hr>
                                                              <div class="row">
                                                                <div class="col-6 text-left pl-4">Persona que autoriza:</div>
                                                                <div class="col-6" id="span_name_organizer">${data.responsible_name!=undefined?data.responsible_name:'--'}</div>
                                                              </div>
                                                            </div>

                                                            <div class="col-12" style="text-align: center!important;"><hr>
                                                              <div class="row">
                                                                <div class="col-6 text-left pl-4" id="span_departament">Área</div>
                                                                <div class="col-6">${(data.area)?data.area:"--"}</div>
                                                              </div>
                                                            </div>

                                                            
                                                    </div>
                                                    <input type="hidden" id="hid_location" name="hid_location" value="${getCookie("vtas_sede"+sessionStorage.tabVisitasa)}">
                                                    <input type="hidden" id="hid_id_blacklist" name="hid_id_blacklist" value="${data.id}">
                                                    <input type="hidden" id="hid_area_name" name="hid_area_name" value="${data.area}">
                                                    <input type="hidden" id="hid_action_type" name="hid_action_type" value="${data.action_type}">
                                                    <input type="hidden" id="hid_identity_document" name="hid_identity_document" value="${data.identity_document}">
                                                    <div class="text-center">
                                                    <button type="button" id="btnAutorizar"  class="btn ${classBotton} btn-raised btn-rounded mt-2"  style="padding: 0rem 1rem!important; text-transform:!important;  height: 30px;" >${data.check_in==0?"Ingreso Excepcional":"Registrar Salida"}</button>
                     
                     </div>`);
                     $("#sendIngresoExcepcional").click(function(){
                      var check_in = data.check_in==0?1:0;
                      
                      

                      saveCheckInCovid19Seg(data.id,check_in,'Excepcional');
                      setTimeout(function(){
                        $("#sendIngresoExcepcional").show();
                      },4000);

                     });
                     
                     $("#btnAutorizar").click(function(){
                      var check_in = data.check_in==0?1:0;
                      if(check_in==1)
                        $("#modalIngresoExcepcional").modal("show");
                      else 
                      {
                        

                      saveCheckInCovid19Seg(data.id,check_in,'');
                      setTimeout(function(){
                        $("#sendIngresoExcepcional").show();
                        
                      },4000);
                       
                      }
                     });
                     //persona quien autoriza
                     //mensaj
                     /*
                      Si la da click a ese boton le va a aparecer la siguiente informacion: Debe validar la autorización de este ingreso obligatoriamente.  Persona que autoriza: _______ . Cancelar Validar
                     */
                     initInputPhoto(data.id,1,data.identity_document,data.list_type);
                    return;
                    }

              }

              if(data.id!=0 || riesgo.length>0 || dataOIS.dni)
              {
              console.log("Verificando personas en lista negra y tamizaje (1)")

              var diaspass=11;//para dias limite para pasar
              if(data.attention_date)//se calcula tiempo de la ultima fecha de tamizaje------------------------------------------------------------------------
              {

                    var date=new Date();
                    var dateBdd = moment(data.attention_date).add(-5,"hours").format('YYYY-MM-DD HH:mm:ss');                             
                    var time1   = moment(dateBdd,"YYYY-MM-DD HH:mm:ss");
                    var time2   = moment(date,"YYYY-MM-DD HH:mm:ss");
                    var ms      = time1.diff(time2);
                    diaspass = Math.abs(moment.duration(ms).asDays());
                    //var hours = moment.duration(ms).asHours();
                    //console.log("Dias: "+diaspass);
              }
              var diascita=0;
              if(data.date_covid_test)
              {
                var date=new Date();
                var dateBdd = moment(data.date_covid_test).add(-5,"hours").format('YYYY-MM-DD HH:mm:ss');                             
                var time1   = moment(dateBdd,"YYYY-MM-DD HH:mm:ss");
                var time2   = moment(date,"YYYY-MM-DD HH:mm:ss");
                var ms      = time1.diff(time2);
                diascita = Math.abs(moment.duration(ms).asDays());
              }
              //console.log(diascita)


              //validacion si estoy pendiente por aprobar pero no tengo tamizaje previo, no pasa---------------------------------------------------------------
              var name="";
              var flagt=0;
                if (data.vetado == 1)//vetados tanto en lista negra como por lista negra-------------------------------------------
                {
                   if(data.list_type==1)//si esta en lista negra
                   {
                      var textMessage="Acceso Denegado";
                      var detallest="Persona en Lista Negra"
                   }
                   else
                   {
                      var textMessage="Acceso Denegado";
                      var detallest="Persona no habilitada por Tamizaje"
                   }
                   flagt=1;
                   name=data.fullname!=undefined?toCapitalize(data.fullname):'--';
                }
               
                else if(riesgo.length>0)
                {
                  flagt=1;
                  var textMessage="Acceso Denegado";
                  var detallest="Persona en Lista de Riesgo"
                  //console.log(riesgo)
                  name=riesgo[0].name?toCapitalize(riesgo[0].name):'';
                }
               
                else if(data.covid_test==3)//tamizaje vencido------------------------------------------------------------------------
                {
                  if(diaspass>10)
                  {
                    flagt=0;
                    var textMessage="Ingreso Autorizado";
                    var detallest="Su Tamizaje ha vencido"
                    name=data.fullname!=undefined?toCapitalize(data.fullname):'--';
                  }
                }
                else if(data.covid_test==5 && !data.attention_date)//tamizaje cancelado------------------------------------------------------------------------
                {
                  flagt=1;
                  var textMessage="Acceso Denegado";
                  var detallest="Debe solicitar Cita de Tamizaje para poder ingresar"
                  name=data.fullname!=undefined?toCapitalize(data.fullname):'--';
                }
                else if(data.covid_test==5 && data.attention_date)//tamizaje cancelado------------------------------------------------------------------------
                {
                  if(diaspass>10)
                  {
                    flagt=1;
                    var textMessage="Acceso Denegado";
                    var detallest="Debe solicitar Cita de Tamizaje para poder ingresar"
                    name=data.fullname!=undefined?toCapitalize(data.fullname):'--';
                  }
                }
                else if(data.covid_test==4 && !data.attention_date)//tamizaje no aporbado sin tamizaje previo-------------------------
                {
                  flagt=1;
                  var textMessage="Acceso Denegado";
                  var detallest="Su Solicitud de Tamizaje no se ha Aprobado"
                  name=data.fullname!=undefined?toCapitalize(data.fullname):'--';
                }
                else if(data.covid_test==4 && data.attention_date)//tamizaje no aporbado con tamizaje previo-------------------------
                {

                  if(diaspass>10)
                  {
                    flagt=1;
                    var textMessage="Acceso Denegado";
                    var detallest="Su Solicitud de Tamizaje no se ha Aprobado";
                    name=data.fullname!=undefined?toCapitalize(data.fullname):'--';
                  }
                }
                else if(data.attention_date && data.covid_test!=1)//tamizaje no aporbado con tamizaje previo y que no este aprobado-------------------------
                {

                  if(diaspass>10)
                  {
                    flagt=0;
                    var textMessage="Ingreso Autorizado";
                    var detallest="Deberá pasar por tópico antes del ingreso a Planta. Retener fotocheck y devolver al finalizar Tamizaje.";

                    var colreMessage="bg-orange";
                    var typeIngres="Deberá pasar por tópico antes del ingreso a Planta. Retener fotocheck y devolver al finalizar Tamizaje.";

                    name=data.fullname!=undefined?toCapitalize(data.fullname):'--';
                  }
                }

                if(data.covid_test==1)//si se ha aprobado tamizaje pero no se realiza en 10 dias, no pasa
                {

                  if(diaspass>10)
                  {
                    flagt=0;
                    var textMessage="Ingreso Autorizado";
                    var detallest="Tamizaje Vencido";
                    name=data.fullname!=undefined?toCapitalize(data.fullname):'--';
                  }

                  if(diascita<4)//si su cita se le pidio y esta en rango de 1 a 3 dias
                  {
                    flagt=0;
                   
                  }

                  
                }

                //se valida vetado con mas de 14 dias
                if (data.vetado == 1)
                {
                  if(diaspass>daylimitVeto || data.covid_test==8)
                  {
                    flagt=0;
                  }

                }

                if(data.covid_test==7 || data.covid_test==88  )//ingreso indefinido------------------------------------------------------------------------
                {
                 
                    flagt=0;
                    var textMessage="Ingreso Autorizado";
                    var detallest=""
                    name=data.fullname!=undefined?toCapitalize(data.fullname):'--';

                    if (data.vetado == 1)//vetados tanto en lista negra como por lista negra-------------------------------------------
                    {
                       if(data.list_type==1)//si esta en lista negra
                       {
                          var textMessage="Acceso Denegado";
                          var detallest="Persona en Lista Negra"
                          flagt=1;
                       }
                      
                    }
                    if(riesgo.length>0)
                    {
                      flagt=1;
                      var textMessage="Acceso Denegado";
                      var detallest="Persona en Lista de Riesgo"
                      //console.log(dataRiesgo)
                      name=riesgo[0].name?toCapitalize(riesgo[0].name):'';
                    }
                 
                }



                if(riesgo.length>0)//personas de risgo no entran de ninguna manera
                {
                  flagt=1;
                  var textMessage="Acceso Denegado";
                  var detallest="Persona en Lista de Riesgo"
                  //console.log(riesgo)
                  name=riesgo[0].name?toCapitalize(riesgo[0].name):'';
                }

                //se valida que persona de riesgo no pasa
                if(flagt==1)//no ingresa
                {
                  hideLoading();
                  $("#add_contacto_nombre_1").val('');
                     $("#add_contacto_apellido_1").val('');
                     $("#add_correo_1").val('');
                     //swal("Acceso Denegado!", data.message, "error");
                    var img ="images/iconos/usersecu.svg";
                    if(data.picture){
                      img = data.picture;
                      //ImageButtons = '';
                    }

                     var colreMessage="bg-danger";
                    
                       

                        $("#textNotificationAccess").text(textMessage!=undefined?textMessage:'')
                        $("#barNotificationAccess")[0].className="card-header text-white "+colreMessage;
                        $("#showAccessDataCard").empty();
                        $("#showAccessDataCard").html(`

                        <div class="row" ><h6 class="col-md-12" style="text-align:center!important;"><span class="messagegarita" style="border-bottom: 0px!important;">${detallest}</span></h6></div>
                                                                                
                                                   
                                                   <div class="row">
                                                   <div class="col-md-12" style="text-align: center!important;">
                                                   <img id="img_visitante" src="${img}" alt="" class="rounded-circle img-fluid" style="height: 16vh; width: 16vh;">
                                                   <br>
                                                    ${ImageButtons}
                                                   </div>
                                                    <div class="col-md-12" style="text-align: center!important;margin-top: 10;"><h4 id="span_name_visitante" translate="no">${name}</h4></div>
                                                    <div class="col-md-12" style="text-align: center!important;"><h6 class="text-muted " id="span_number_document" >Documento: ${data.identity_document!=undefined?data.identity_document:identity_document}</h6></div>
                                                              <div class="col-12" style="text-align: center!important;"><hr>
                                                              <div class="row">
                                                                  <div class="col-6 text-left pl-4">Empresa:</div>
                                                                  <div class="col-6">${data.name_company!=undefined?data.name_company:'--'}</div>
                                                              </div>
                                                            </div>

                                                            <div class="col-12" style="text-align: center!important;"><hr>
                                                              <div class="row">
                                                                <div class="col-6 text-left pl-4">Último Tamizaje realizado:</div>
                                                                <div class="col-6">${data.attention_date?formatDateTime(data.attention_date,2,true):'--'}</div>
                                                              </div>
                                                            </div>

                                                            <div class="col-12" style="text-align: center!important;"><hr>
                                                              <div class="row">
                                                                <div class="col-6 text-left pl-4">Persona que autoriza:</div>
                                                                <div class="col-6" id="span_name_organizer">${data.collaborator!=undefined?data.collaborator:'--'}</div>
                                                              </div>
                                                            </div>

                                                            <div class="col-12" style="text-align: center!important;"><hr>
                                                              <div class="row">
                                                                <div class="col-6 text-left pl-4" id="span_departament">Área</div>
                                                                <div class="col-6">${(data.area)?data.area:"--"}</div>
                                                              </div>
                                                            </div>

                                                            
                                                    </div>
                                                    <input type="hidden" id="hid_location" name="hid_location" value="${getCookie("vtas_sede"+sessionStorage.tabVisitasa)}">
                                                    <input type="hidden" id="hid_id_blacklist" name="hid_id_blacklist" value="${data.id}">
                                                    <input type="hidden" id="hid_area_name" name="hid_area_name" value="${data.area}">
                                                    <input type="hidden" id="hid_action_type" name="hid_action_type" value="${data.action_type}">
                                                    <input type="hidden" id="hid_identity_document" name="hid_identity_document" value="${data.identity_document}">
                                                    <div class="text-center">
                                                    <button type="button" id="btnAutorizar"  class="btn ${classBotton} btn-raised btn-rounded mt-2"  style="padding: 0rem 1rem!important; text-transform:!important;  height: 30px;" >${data.check_in==0?"Ingreso Excepcional":"Registrar Salida"}</button>
                     
                     </div>`);
                     $("#sendIngresoExcepcional").click(function(){
                      var check_in = data.check_in==0?1:0;
                      
                      saveCheckInCovid19Seg(data.id,check_in,'Excepcional');
                      setTimeout(function(){
                        $("#sendIngresoExcepcional").show();
                      },4000);
                     });
                     
                     $("#btnAutorizar").click(function(){
                      var check_in = data.check_in==0?1:0;
                      if(check_in==1)
                        $("#modalIngresoExcepcional").modal("show");
                      else 
                        {
                          

                          saveCheckInCovid19Seg(data.id,check_in,'');
                          setTimeout(function(){
                            $("#sendIngresoExcepcional").show();
                          },4000);
                        }
                     });
                     //persona quien autoriza
                     //mensaj
                     /*
                      Si la da click a ese boton le va a aparecer la siguiente informacion: Debe validar la autorización de este ingreso obligatoriamente.  Persona que autoriza: _______ . Cancelar Validar
                     */
                     initInputPhoto(data.id,1,data.identity_document,data.list_type);
                    return;

                }


              //verificacion ois-------------------------------------------------------------
             
              if(!data.is_collaborator && data.check_in==0 && colaboratorinterno==0)//si no es colaborador y va entrando
              {
                hideLoading();
                console.log("Validando contratistas....")
                var flag=0;
                            
                             
                              var resp = dataOIS;       
                              if(resp.dni)
                              {
                               

                                if(resp.enabled_status)///habilitado
                                {
                                  console.log("OIS Autorizado");
                                }
                                
                                else
                                {//no habilitado

                                  var textError="Falta OIS: ";
                                  if(!resp.sctr_status){textError=textError+" .SCTR"}
                                  //if(!resp.emo_status){textError=textError+" .EMO"}
                                  if(!resp.codanexo1_status){textError=textError+" .Anexo1"}
                                  if(!resp.codanexo2_status){textError=textError+" .Anexo2"}
                                  if(!resp.dj_status){textError=textError+" .DJ"}

                                  console.log("No autorizado OIS: "+textError)
                                  flag=1;
                                 
                                }

                                if(data.id==0 && resp.dni)
                                {
                                  console.log("Esta en  OIS pero no tiene tamizaje"+textError)
                                  flag=1;
                                  var textError="Esta persona no tiene Solicitud de Tamizaje";
                                }
                              }
                              else
                              {
                                if(identity_document!="001654671" && identity_document!="001654672" && identity_document!="001444147" && identity_document!="003353989" )//documento sde prueba visualsat
                                {
                                  console.log("No autorizado OIS");
                                  flag=1
                                  var textError=identity_document+", No Registrado en OIS.";
                                }
                              }
                                    if(flag==1)//si se detecta que no est autorizado en ois
                                    {


                                                    var textMessage=textError ;
                                                    var colreMessage="bg-danger";
                                                   
                                                    $("#textNotificationAccess").text("Acceso Denegado")
                                                    $("#barNotificationAccess")[0].className="card-header text-white "+colreMessage;
                                                    $("#hid_identity_document").val(resp.dni)


                                                  

                                                    $("#showAccessDataCard").empty();
                                                    $("#showAccessDataCard").html(`
                                                                                  <div class="row" ><h6 class="col-md-12" style="text-align:center!important;"><span class="messagegarita" style="border-bottom: 0px!important;">${textMessage}</span></h6></div>
                                                                                
                                                                                  
                                                                                  <div class="row">
                                                                                  <div class="col-md-12" style="text-align: center!important;">
                                                                                  <img id="img_visitante" src="${resp.picture?data.picture:"images/iconos/usersecu.svg"}" alt="" class="rounded-circle img-fluid" style="height: 16vh; width: 16vh;">
                                                                                  <br>
                                                                                  ${ImageButtons}
                                                                                  </div>
                                                    <div class="col-md-12" style="text-align: center!important;margin-top: 10;"><h4 id="span_name_visitante" translate="no">${resp.fullname!=undefined?toCapitalize(resp.fullname):'--'}</h4></div>
                                                    <div class="col-md-12" style="text-align: center!important;"><h6 class="text-muted " id="span_number_document" >Documento: ${resp.dni!=undefined?resp.dni:$("#tx_access_dni").val()}</h6></div><div class="col-12 p-2" style="text-align: center!important;"><hr>
                                                    
                                                    <div class="col-12" style="text-align: center!important;">
                                                    <div class="row">
                                                      <div class="col-6 text-left pl-4">Empresa:</div>
                                                      <div class="col-6">${resp.company_name!=undefined?resp.company_name:'--'}</div>
                                                    </div>
                                                  </div>
                                                  <div class="col-12" style="text-align: center!important;"><hr>
                                                    <div class="row">
                                                      <div class="col-6 text-left text-left pl-4">Último Tamizaje realizado:</div>
                                                      <div class="col-6"></div>
                                                    </div>
                                                  </div>
                                                  <div class="col-12" style="text-align: center!important;"><hr>
                                                    <div class="row">
                                                      <div class="col-6 text-left text-left pl-4">Persona que autoriza:</div>
                                                      <div class="col-6" span_name_organizer>${resp.collaborator!=undefined?resp.collaborator:'--'}</div>
                                                    </div>
                                                  </div>
                                                  <div class="col-12" style="text-align: center!important;"><hr>
                                                    <div class="row">
                                                      <div class="col-6 text-left text-left pl-4" span_departament>Área</div>
                                                      <div class="col-6">${resp.area?resp.area:''}</div>
                                                    </div>
                                                  </div>
                                                
                                                    <div class="text-center">
                                                      <input type="hidden" id="hid_location" name="hid_location" value="${getCookie("vtas_sede"+sessionStorage.tabVisitasa)}">
                                                      <input type="hidden" id="hid_id_blacklist" name="hid_id_blacklist" value="${data.id}">
                                                      <input type="hidden" id="hid_area_name" name="hid_area_name" value="${data.area}">
                                                      <input type="hidden" id="hid_action_type" name="hid_action_type" value="${data.action_type}">
                                                      <input type="hidden" id="hid_identity_document" name="hid_identity_document" value="${resp.dni}">
                                                      <div class="text-center">
                                                      <button type="button" id="btnAutorizar"  class="btn ${classBotton} btn-raised btn-rounded mt-2"  style="padding: 0rem 1rem!important; text-transform:!important;  height: 30px;" >${data.check_in==0?"Ingreso Excepcional":"Registrar Salida"}</button>
                                                    
                                                    </div>`);
                                                   
                                                   
                                                        $("#btnAutorizar").click(function(){
                                                          $("#modalIngresoExcepcional").modal("show");
                                                        });

                                                        $("#sendIngresoExcepcional").click(function(){
                                                          var check_in = data.check_in==0?1:0;
                                                          
                                                          saveCheckInCovid19Seg(data.id,check_in,'Excepcional');
                                                          setTimeout(function(){
                                                            $("#sendIngresoExcepcional").show();
                                                          },4000);
                                                        });
                                                    
                                                    //initInputPhoto(resp.id,1,resp.identity_document,resp.list_type);
                                                    return
                                    }
                                    else
                                    {
                                      console.log("Es contratista pero paso prueba ois---------------");
                                      //valida pendientes por alta---------------------------------------------------------

                                        if (data.covid_test==8 || (diaspass>daylimitVeto && data.covid_test!=7 && data.vetado == 1))//habilitado indefinido
                                        {
                                          console.log("Autorizado contratista para alta medica")
                                          var img ="images/iconos/usersecu.svg";
                                            if(data.picture){
                                              img = data.picture;
                                            }

                                              var classBotton ='btn-green-lime';
                                              var colreMessage="bg-warning";
                                              var check_in = 0;
                                             var  typeIngres="";
                                              if(data.check_in==0){
                                              check_in = 1;
                                                var textMessage="Ingreso Autorizado";
                                                textBotton = '<span style="text-transform: uppercase;">A</span>utorizar ingreso';
                                                var typeIngres ='Debe dirigirse al Tópico para el Alta Médica';
                                                var colreMessage="bg-warning";
                                              }
                                                                    
                                              if(data.check_in==1){
                                                textMessage="Salida";
                                                textBotton = '<span style="text-transform: uppercase;">R</span>egistrar salida';
                                                var typeIngres ='';
                                                var colreMessage="bg-success";
                                              }

                                              //si esta vencido cambia el color
                                              if(data.attention_date && (diaspass>10 || data.covid_test==3))
                                              {
                                                var colreMessage="bg-orange";
                                                var typeIngres="Deberá pasar por tópico antes del ingreso a Planta. Retener fotocheck y devolver al finalizar Tamizaje.";
                                              }
                                                
                                              
                                              data.collaborator = '';

                                              $("#textNotificationAccess").text(textMessage)
                                              $("#barNotificationAccess")[0].className="card-header text-dark "+colreMessage;

                                              $("#showAccessDataCard").empty();
                                              $("#showAccessDataCard").html(`
                                                                        <div class="row p-2" ><div class="col-md-12" style="text-align:center!important;"><span class="messagegarita" style="border-bottom: 0px!important;">${typeIngres}</span></div></div>
                                                                      
                                                                        
                                                                        <div class="row">
                                                                        <div class="col-md-12 pb-0" style="text-align: center!important;">
                                                                        <img id="img_visitante" src="${img}" alt="" class="rounded-circle img-fluid" style="height: 16vh; width: 16vh;">
                                                                          <br>
                                                                          ${ImageButtons}
                                                                        </div>
                                                              <div class="col-md-12" style="text-align: center!important;margin-top: 2;"><h5 id="span_name_visitante" translate="no">${toCapitalize(data.fullname)}</h5></div>
                                                              <div class="col-md-12" style="text-align: center!important;"><h6 class="text-muted " id="span_number_document" >Documento: ${data.identity_document}</h6></div>
                                                              
                                                                        <div class="col-12" style="text-align: center!important;"><hr>
                                                                          <div class="row">
                                                                              <div class="col-6 text-left pl-4">Empresa:</div>
                                                                              <div class="col-6">${data.name_company!=undefined?data.name_company:'--'}</div>
                                                                          </div>
                                                                        </div>

                                                                        <div class="col-12" style="text-align: center!important;"><hr>
                                                                          <div class="row">
                                                                            <div class="col-6 text-left pl-4">Último Tamizaje realizado:</div>
                                                                            <div class="col-6">${data.attention_date!=undefined?formatDateTime(data.attention_date,2,true):'--'}</div>
                                                                          </div>
                                                                        </div>

                                                                        <div class="col-12" style="text-align: center!important;"><hr>
                                                                          <div class="row">
                                                                            <div class="col-6 text-left pl-4">Persona que autoriza:</div>
                                                                            <div class="col-6" id="span_name_organizer">${data.collaborator!=undefined?data.collaborator:'--'}</div>
                                                                          </div>
                                                                        </div>

                                                                        <div class="col-12" style="text-align: center!important;"><hr>
                                                                          <div class="row">
                                                                            <div class="col-6 text-left pl-4" id="span_departament">Área</div>
                                                                            <div class="col-6">${(data.area)?data.area:"--"}</div>
                                                                          </div>
                                                                        </div>

                                                                        <div class="col-12" style="text-align: center!important;"><hr>
                                                                        <div class="row">
                                                                          <div class="col-6 text-left pl-4" >Temperatura</div>
                                                                          <div class="col-6"><input style="border:1px solid #999; padding:5px; border-radius:10px; width:80px"  step="0.1"  type="number" min="32" max="43"  maxlength="4" onkeyup="validarMoneda(this.id)" id="span_temperatures" ></div>
                                                                        </div>
                                                                      </div>

                                                                      
                                                                </div>   

                                                              <div class="text-center" id="footer_action">
                                                              <input type="hidden" id="hid_location" name="hid_location" value="${data.id_location}">
                                                              <input type="hidden" id="hid_id_blacklist" name="hid_id_blacklist" value="${data.id}">
                                                              <input type="hidden" id="hid_area_name" name="hid_area_name" value="${data.area}">
                                                              <input type="hidden" id="hid_action_type" name="hid_action_type" value="${data.action_type}">
                                                              <input type="hidden" id="hid_identity_document" name="hid_identity_document" value="${data.identity_document}">
                                                              
                                                              <button type="button" id="btnTools" class="btn ${classBotton} btn-raised btn-rounded mt-2" style="padding: 0rem 1rem!important; text-transform:lowercase!important;  height: 30px;" onclick="$('#modalToolList').modal()"><span style="text-transform: uppercase;">H</span>erramientas</button>
                                                              <!--<button type="button" id="btnVerDatos" class="btn btn-primary btn-rounded btn-raised mt-2" style="padding: 0rem 1rem!important; text-transform:lowercase!important;  height: 30px;"><span style="text-transform: uppercase;">V</span>er datos de solicitud</button>-->
                                                              <button type="button" id="btnAutorizar" onclick="vw_access_event.saveCheckInCovid19Seg(${data.id},${check_in})" class="btn ${classBotton} btn-raised btn-rounded mt-2"  style="padding: 0rem 1rem!important; text-transform:lowercase!important;  height: 30px;" >${textBotton}</button>
                                                              </div>`);
                                                            //initInputPhoto(data.id,1,data.identity_document,data.list_type);
                                                            return
                                        }
                                      //-----------------------------------------------------------------------------------


                   var img ="images/iconos/usersecu.svg";
                    if(data.picture){
                      img = data.picture;
                     // ImageButtons = '';
                    }

                      
                      classBotton ='btn-green-lime';
                      var colreMessage="bg-success";
                      var check_in = 0;

                      var typeIngres = data.message;
                      data.collaborator = '';


                      if(data.check_in==0){
                       check_in = 1;
                        var textMessage="Ingreso Autorizado";
                        textBotton = '<span style="text-transform: uppercase;">A</span>utorizar ingreso';
                      }
                                            
                      if(data.check_in==1){
                        textMessage="Salida";
                        textBotton = '<span style="text-transform: uppercase;">R</span>egistrar salida';
                        typeIngres="";
                      }
                        
                      if(data.attention_date && (diaspass>10 || data.covid_test==3))
                            {
                              var colreMessage="bg-orange";
                               var typeIngres="Deberá pasar por tópico antes del ingreso a Planta. Retener fotocheck y devolver al finalizar Tamizaje.";
                            }

                      $("#textNotificationAccess").text(textMessage)
                      $("#barNotificationAccess")[0].className="card-header text-white "+colreMessage;

                      //console.log(data.covid_test,data.check_in,new Date(data.date_covid_test.split('T')[0]+' 23:59'),new Date(nowdesde),new Date(data.date_covid_test.split('T')[0]+' 23:59'),new Date(nowhasta))
                      if(data.covid_test==1 && data.check_in==0 && (new Date(data.date_covid_test.split('T')[0]+' 23:59')>new Date(nowdesde)&&new Date(data.date_covid_test.split('T')[0]+' 23:59')<=new Date(nowhasta)) )//validacion de dia de la cita
                      {
                        console.log("PErsona en cita del dia")
                        var textMessage="Ingreso Autorizado";
                        var detallest=""
                            notification = '<div><i class="fa fa-circle text-success" style="height: 30px important!;"></i><label style="margin-left:15px">Acceso Autorizado.  El usuario debe dirigirse al área medica a realizar Tamizaje</label></div>';
                            //$("#barNotificationAccess").css({background:'#ffc42c'});
                            var colreMessage="bg-yellow"; 
                            typeIngres  ="Debe dirigirse al área médica a realizar Tamizaje";

                            if(data.attention_date && (diaspass>10 || data.covid_test==3))
                            {
                              var colreMessage="bg-orange";
                               var typeIngres="Deberá pasar por tópico antes del ingreso a Planta. Retener fotocheck y devolver al finalizar Tamizaje.";
                            }

                            $("#textNotificationAccess").text(textMessage)
                      $("#barNotificationAccess")[0].className="card-header text-dark "+colreMessage;
                      } 
                      
                      if(data.covid_test==7 || data.covid_test==88 )//ingreso indefinido
                      {
                        console.log("Ingreso indefinido")
                        
                        var textMessage="Ingreso Autorizado";
                        var detallest=""
                            notification = '<div><i class="fa fa-circle text-success" style="height: 30px important!;"></i><label style="margin-left:15px">Acceso Autorizado.  El usuario debe dirigirse al área medica a realizar Tamizaje</label></div>';
                            //$("#barNotificationAccess").css({background:'#ffc42c'});
                            var colreMessage="bg-success"; 
                            typeIngres  ="Habilitado Indefinido";

                            $("#textNotificationAccess").text(textMessage)
                           $("#barNotificationAccess")[0].className="card-header text-white "+colreMessage;
                      } 

                    //direction = `onclick="$('#modalInsertAlcoholemia').modal()"`;
                     //}
                     
                      
                      $("#showAccessDataCard").empty();
                      $("#showAccessDataCard").html(`
                                                <div class="row p-2" ><div class="col-md-12" style="text-align:center!important;"><span class=""  style="border-bottom: 0px!important;">${typeIngres}</span></div></div>
                                              
                                                
                                                <div class="row">
                                                <div class="col-md-12 pb-0" style="text-align: center!important;">
                                                <img id="img_visitante" src="${img}" alt="" class="rounded-circle img-fluid" style="height: 16vh; width: 16vh;">
                                                  <br>
                                                  ${ImageButtons}
                                                </div>
                                      <div class="col-md-12" style="text-align: center!important;margin-top: 2;"><h5 id="span_name_visitante" translate="no">${toCapitalize(data.fullname)}</h5></div>
                                      <div class="col-md-12" style="text-align: center!important;"><h6 class="text-muted " id="span_number_document" >Documento: ${data.identity_document}</h6></div>
                                      
                                                <div class="col-12" style="text-align: center!important;"><hr>
                                                  <div class="row">
                                                      <div class="col-6 text-left pl-4">Empresa:</div>
                                                      <div class="col-6">${data.name_company!=undefined?data.name_company:'--'}</div>
                                                  </div>
                                                </div>

                                                <div class="col-12" style="text-align: center!important;"><hr>
                                                  <div class="row">
                                                    <div class="col-6 text-left pl-4">Último Tamizaje realizado:</div>
                                                    <div class="col-6">${data.attention_date!=undefined?formatDateTime(data.attention_date,2,true):'--'}</div>
                                                  </div>
                                                </div>

                                                <div class="col-12" style="text-align: center!important;"><hr>
                                                  <div class="row">
                                                    <div class="col-6 text-left pl-4">Persona que autoriza:</div>
                                                    <div class="col-6" id="span_name_organizer">${data.collaborator!=undefined?data.collaborator:'--'}</div>
                                                  </div>
                                                </div>

                                                <div class="col-12" style="text-align: center!important;"><hr>
                                                  <div class="row">
                                                    <div class="col-6 text-left pl-4" id="span_departament">Área</div>
                                                    <div class="col-6">${(data.area)?data.area:"--"}</div>
                                                  </div>
                                                </div>

                                                <div class="col-12" style="text-align: center!important;"><hr>
                                                <div class="row">
                                                  <div class="col-6 text-left pl-4" >Temperatura</div>
                                                  <div class="col-6"><input style="border:1px solid #999; padding:5px; border-radius:10px; width:80px"  step="0.1"  type="number" min="32" max="43"  maxlength="4" onkeyup="validarMoneda(this.id)" id="span_temperatures" ></div>
                                                </div>
                                              </div>

                                               
                                        </div>   

                                      <div class="text-center" id="footer_action">
                                      <input type="hidden" id="hid_location" name="hid_location" value="${data.id_location}">
                                      <input type="hidden" id="hid_id_blacklist" name="hid_id_blacklist" value="${data.id}">
                                      <input type="hidden" id="hid_area_name" name="hid_area_name" value="${data.area}">
                                      <input type="hidden" id="hid_action_type" name="hid_action_type" value="${data.action_type}">
                                      <input type="hidden" id="hid_identity_document" name="hid_identity_document" value="${data.identity_document}">
                                      
                                      <button type="button" id="btnTools" class="btn ${classBotton} btn-raised btn-rounded mt-2" style="padding: 0rem 1rem!important; text-transform:lowercase!important;  height: 30px;" onclick="$('#modalToolList').modal()"><span style="text-transform: uppercase;">H</span>erramientas</button>
                                      <!--<button type="button" id="btnVerDatos" class="btn btn-primary btn-rounded btn-raised mt-2" style="padding: 0rem 1rem!important; text-transform:lowercase!important;  height: 30px;"><span style="text-transform: uppercase;">V</span>er datos de solicitud</button>-->
                                      <button type="button" id="btnAutorizar" onclick="vw_access_event.saveCheckInCovid19Seg(${data.id},${check_in})" class="btn ${classBotton} btn-raised btn-rounded mt-2"  style="padding: 0rem 1rem!important; text-transform:lowercase!important;  height: 30px;" >${textBotton}</button>
                                      </div>`);
                      initInputPhoto(data.id,1,data.identity_document,data.list_type);


                                    }
                                    
                           
                }
              else
              {
              
                if (data.covid_test==8 || (diaspass>daylimitVeto && data.covid_test!=7 && data.vetado == 1))//pendiente para alta medica
                {
                   console.log("Autorizado para alta medica")
                   var img ="images/iconos/usersecu.svg";
                    if(data.picture){
                      img = data.picture;
                    }

                      var classBotton ='btn-green-lime';
                      var colreMessage="bg-warning";
                      var check_in = 0;
                      if(data.check_in==0){
                       check_in = 1;
                        var textMessage="Ingreso Autorizado";
                        textBotton = '<span style="text-transform: uppercase;">A</span>utorizar ingreso';
                        var typeIngres ='Debe dirigirse al Tópico para el Alta Médica';
                        var colreMessage="bg-warning";
                      }
                                            
                      if(data.check_in==1){
                        textMessage="Salida";
                        textBotton = '<span style="text-transform: uppercase;">R</span>egistrar salida';
                        var typeIngres ='';
                        var colreMessage="bg-success";
                      }
                        
                      
                      data.collaborator = '';

                      $("#textNotificationAccess").text(textMessage)
                      $("#barNotificationAccess")[0].className="card-header text-dark "+colreMessage;

                      $("#showAccessDataCard").empty();
                      $("#showAccessDataCard").html(`
                                                <div class="row p-2" ><div class="col-md-12" style="text-align:center!important;"><span class="messagegarita" style="border-bottom: 0px!important;">${typeIngres}</span></div></div>
                                              
                                                
                                                <div class="row">
                                                <div class="col-md-12 pb-0" style="text-align: center!important;">
                                                <img id="img_visitante" src="${img}" alt="" class="rounded-circle img-fluid" style="height: 16vh; width: 16vh;">
                                                  <br>
                                                  ${ImageButtons}
                                                </div>
                                      <div class="col-md-12" style="text-align: center!important;margin-top: 2;"><h5 id="span_name_visitante" translate="no">${toCapitalize(data.fullname)}</h5></div>
                                      <div class="col-md-12" style="text-align: center!important;"><h6 class="text-muted " id="span_number_document" >Documento: ${data.identity_document}</h6></div>
                                      
                                                <div class="col-12" style="text-align: center!important;"><hr>
                                                  <div class="row">
                                                      <div class="col-6 text-left pl-4">Empresa:</div>
                                                      <div class="col-6">${data.name_company!=undefined?data.name_company:'--'}</div>
                                                  </div>
                                                </div>

                                                <div class="col-12" style="text-align: center!important;"><hr>
                                                  <div class="row">
                                                    <div class="col-6 text-left pl-4">Último Tamizaje realizado:</div>
                                                    <div class="col-6">${data.attention_date!=undefined?formatDateTime(data.attention_date,2,true):'--'}</div>
                                                  </div>
                                                </div>

                                                <div class="col-12" style="text-align: center!important;"><hr>
                                                  <div class="row">
                                                    <div class="col-6 text-left pl-4">Persona que autoriza:</div>
                                                    <div class="col-6" id="span_name_organizer">${data.collaborator!=undefined?data.collaborator:'--'}</div>
                                                  </div>
                                                </div>

                                                <div class="col-12" style="text-align: center!important;"><hr>
                                                  <div class="row">
                                                    <div class="col-6 text-left pl-4" id="span_departament">Área</div>
                                                    <div class="col-6">${(data.area)?data.area:"--"}</div>
                                                  </div>
                                                </div>

                                                <div class="col-12" style="text-align: center!important;"><hr>
                                                <div class="row">
                                                  <div class="col-6 text-left pl-4" >Temperatura</div>
                                                  <div class="col-6"><input style="border:1px solid #999; padding:5px; border-radius:10px; width:80px"  step="0.1"  type="number" min="32" max="43"  maxlength="4" onkeyup="validarMoneda(this.id)" id="span_temperatures" ></div>
                                                </div>
                                              </div>

                                               
                                        </div>   

                                      <div class="text-center" id="footer_action">
                                      <input type="hidden" id="hid_location" name="hid_location" value="${data.id_location}">
                                      <input type="hidden" id="hid_id_blacklist" name="hid_id_blacklist" value="${data.id}">
                                      <input type="hidden" id="hid_area_name" name="hid_area_name" value="${data.area}">
                                      <input type="hidden" id="hid_action_type" name="hid_action_type" value="${data.action_type}">
                                      <input type="hidden" id="hid_identity_document" name="hid_identity_document" value="${data.identity_document}">
                                      
                                      <button type="button" id="btnTools" class="btn ${classBotton} btn-raised btn-rounded mt-2" style="padding: 0rem 1rem!important; text-transform:lowercase!important;  height: 30px;" onclick="$('#modalToolList').modal()"><span style="text-transform: uppercase;">H</span>erramientas</button>
                                      <!--<button type="button" id="btnVerDatos" class="btn btn-primary btn-rounded btn-raised mt-2" style="padding: 0rem 1rem!important; text-transform:lowercase!important;  height: 30px;"><span style="text-transform: uppercase;">V</span>er datos de solicitud</button>-->
                                      <button type="button" id="btnAutorizar" onclick="vw_access_event.saveCheckInCovid19Seg(${data.id},${check_in})" class="btn ${classBotton} btn-raised btn-rounded mt-2"  style="padding: 0rem 1rem!important; text-transform:lowercase!important;  height: 30px;" >${textBotton}</button>
                                      </div>`);
                                     initInputPhoto(data.id,1,data.identity_document,data.list_type);
                }
                else if ((data.vetado == 1 && diaspass<=daylimitVeto && data.covid_test!=7)/* ||(data.vetado == 1 && data.covid_test!=8) */)
                {
                   console.log("Vetado")
                }
                else
                {
                  
                 if((data.vetado == 0 && data.error==false && data.check_covid== true)||(data.vetado == 1 && diaspass>daylimitVeto)||(data.vetado == 1 && data.covid_test==8) ||(data.covid_test==7))
                  {                    
                
                    var img ="images/iconos/usersecu.svg";
                    if(data.picture){
                      img = data.picture;
                     // ImageButtons = '';
                    }

                      var classBotton ='btn-green-lime';
                      var colreMessage="bg-success";
                      var check_in = 0;

                      var typeIngres = "";
                      data.collaborator = '';

                      if(data.check_in==0){
                       check_in = 1;
                        var textMessage="Ingreso Autorizado";
                        textBotton = '<span style="text-transform: uppercase;">A</span>utorizar ingreso';
                      }
                                            
                      if(data.check_in==1){
                        textMessage="Salida";
                        textBotton = '<span style="text-transform: uppercase;">R</span>egistrar salida';
                        typeIngres="";
                      }
                        
                      if(data.attention_date && (diaspass>10 || data.covid_test==3))
                            {
                              var colreMessage="bg-orange";
                               var typeIngres="Deberá pasar por tópico antes del ingreso a Planta. Retener fotocheck y devolver al finalizar Tamizaje.";
                            }

                      $("#textNotificationAccess").text(textMessage)
                      $("#barNotificationAccess")[0].className="card-header text-white "+colreMessage;

                      //console.log(data.covid_test,data.check_in,new Date(data.date_covid_test.split('T')[0]+' 23:59'),new Date(nowdesde),new Date(data.date_covid_test.split('T')[0]+' 23:59'),new Date(nowhasta))
                      if(data.covid_test==1 && data.check_in==0 && (new Date(data.date_covid_test.split('T')[0]+' 23:59')>new Date(nowdesde)&&new Date(data.date_covid_test.split('T')[0]+' 23:59')<=new Date(nowhasta)) )//validacion de dia de la cita
                      {
                        console.log("PErsona en cita del dia")
                        var textMessage="Ingreso Autorizado";
                        var detallest=""
                            notification = '<div><i class="fa fa-circle text-success" style="height: 30px important!;"></i><label style="margin-left:15px">Acceso Autorizado.  El usuario debe dirigirse al área medica a realizar Tamizaje</label></div>';
                            //$("#barNotificationAccess").css({background:'#ffc42c'});
                            var colreMessage="bg-yellow"; 
                            typeIngres  ="Debe dirigirse al área médica a realizar Tamizaje";


                            if(data.attention_date && (diaspass>10 || data.covid_test==3))
                            {
                              var colreMessage="bg-orange";
                               var typeIngres="Deberá pasar por tópico antes del ingreso a Planta. Retener fotocheck y devolver al finalizar Tamizaje.";
                            }

                      $("#textNotificationAccess").text(textMessage)
                      $("#barNotificationAccess")[0].className="card-header text-dark "+colreMessage;
                      } 

                      if(data.covid_test==7 || data.covid_test==88 )//ingreso indefinido
                      {
                        console.log("Ingreso indefinido")
                        
                        var textMessage="Ingreso Autorizado";
                        var detallest=""
                            notification = '<div><i class="fa fa-circle text-success" style="height: 30px important!;"></i><label style="margin-left:15px">Acceso Autorizado.  El usuario debe dirigirse al área medica a realizar Tamizaje</label></div>';
                            //$("#barNotificationAccess").css({background:'#ffc42c'});
                            var colreMessage="bg-success"; 
                            typeIngres  ="Habilitado Indefinido";

                            $("#textNotificationAccess").text(textMessage)
                           $("#barNotificationAccess")[0].className="card-header text-white "+colreMessage;
                      } 

                    //direction = `onclick="$('#modalInsertAlcoholemia').modal()"`;
                     //}
                     
                      
                      $("#showAccessDataCard").empty();
                      $("#showAccessDataCard").html(`
                                                <div class="row p-2" ><div class="col-md-12" style="text-align:center!important;"><span class="text-dark" style="border-bottom: 0px!important;">${typeIngres}</span></div></div>
                                              
                                                
                                                <div class="row">
                                                <div class="col-md-12 pb-0" style="text-align: center!important;">
                                                <img id="img_visitante" src="${img}" alt="" class="rounded-circle img-fluid" style="height: 16vh; width: 16vh;">
                                                  <br>
                                                  ${ImageButtons}
                                                </div>
                                      <div class="col-md-12" style="text-align: center!important;margin-top: 2;"><h5 id="span_name_visitante" translate="no">${toCapitalize(data.fullname)}</h5></div>
                                      <div class="col-md-12" style="text-align: center!important;"><h6 class="text-muted " id="span_number_document" >Documento: ${data.identity_document}</h6></div>
                                      
                                                <div class="col-12" style="text-align: center!important;"><hr>
                                                  <div class="row">
                                                      <div class="col-6 text-left pl-4">Empresa:</div>
                                                      <div class="col-6">${data.name_company!=undefined?data.name_company:'--'}</div>
                                                  </div>
                                                </div>

                                                <div class="col-12" style="text-align: center!important;"><hr>
                                                  <div class="row">
                                                    <div class="col-6 text-left pl-4">Último Tamizaje realizado:</div>
                                                    <div class="col-6">${data.attention_date!=undefined?formatDateTime(data.attention_date,2,true):'--'}</div>
                                                  </div>
                                                </div>

                                                <div class="col-12" style="text-align: center!important;"><hr>
                                                  <div class="row">
                                                    <div class="col-6 text-left pl-4">Persona que autoriza:</div>
                                                    <div class="col-6" id="span_name_organizer">${data.collaborator!=undefined?data.collaborator:'--'}</div>
                                                  </div>
                                                </div>

                                                <div class="col-12" style="text-align: center!important;"><hr>
                                                  <div class="row">
                                                    <div class="col-6 text-left pl-4" id="span_departament">Área</div>
                                                    <div class="col-6">${(data.area)?data.area:"--"}</div>
                                                  </div>
                                                </div>

                                                <div class="col-12" style="text-align: center!important;"><hr>
                                                <div class="row">
                                                  <div class="col-6 text-left pl-4" >Temperatura</div>
                                                  <div class="col-6"><input style="border:1px solid #999; padding:5px; border-radius:10px; width:80px"  step="0.1"  type="number" min="32" max="43"  maxlength="4" onkeyup="validarMoneda(this.id)" id="span_temperatures" ></div>
                                                </div>
                                              </div>

                                               
                                        </div>   

                                      <div class="text-center" id="footer_action">
                                      <input type="hidden" id="hid_location" name="hid_location" value="${data.id_location}">
                                      <input type="hidden" id="hid_id_blacklist" name="hid_id_blacklist" value="${data.id}">
                                      <input type="hidden" id="hid_area_name" name="hid_area_name" value="${data.area}">
                                      <input type="hidden" id="hid_action_type" name="hid_action_type" value="${data.action_type}">
                                      <input type="hidden" id="hid_identity_document" name="hid_identity_document" value="${data.identity_document}">
                                      
                                      <button type="button" id="btnTools" class="btn ${classBotton} btn-raised btn-rounded mt-2" style="padding: 0rem 1rem!important; text-transform:lowercase!important;  height: 30px;" onclick="$('#modalToolList').modal()"><span style="text-transform: uppercase;">H</span>erramientas</button>
                                      <!--<button type="button" id="btnVerDatos" class="btn btn-primary btn-rounded btn-raised mt-2" style="padding: 0rem 1rem!important; text-transform:lowercase!important;  height: 30px;"><span style="text-transform: uppercase;">V</span>er datos de solicitud</button>-->
                                      <button type="button" id="btnAutorizar" onclick="vw_access_event.saveCheckInCovid19Seg(${data.id},${check_in})" class="btn ${classBotton} btn-raised btn-rounded mt-2"  style="padding: 0rem 1rem!important; text-transform:lowercase!important;  height: 30px;" >${textBotton}</button>
                                      </div>`);
                      initInputPhoto(data.id,1,data.identity_document,data.list_type);
                  }
                  else
                  {
                    getAccessData(val,1);

                  }

                }
              }
                setTimeout(function(){
                  hideLoading();
                },500);

                $("#btnAutorizar").focus();
              }
              else{

                console.log("Verificando persona que no tiene tamizaje ni esta en lista negra");
                getAccessData(val,1);
              }
            
            }).fail( function( jqXHR, textStatus, errorThrown ) {
              setTimeout(function(){
                hideLoading();
              },500);
            });
                  //*********************************************************************************************** */





              }
              });

      //----------------------------------------------------------------------


      
    }

    var saveCheckInCovid19 = function(id){      
      var url = apiurlblacklist+"/api/Post-Blacklist-User?code="+postblacklistusercode+"&httpmethod=checkincovid&id="+id;                   
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
        swal("Operación exitosa", "Proceso realizado con exito", "success");
      });
    }

    var adddnirequest = function()
    {

      if(parseInt($('#span_en_planta').text())<=0)
      {
        swal({
          title: "Personas en Sede",
          text: "No existen personas registrados en sede",
          timer: 4000,
          type: "error",
          showConfirmButton: true
          });
        return;
      }

      arrayrequestDNI=[]; 
      $('input[name^="requestDNI"]').each(function() {
        if($(this).val()!=""){
          arrayrequestDNI.push($(this).val());
        }
      });
  
      var messengerError = "";
      if(arrayrequestDNI.length > 0) {
          for(var i=0;i<=arrayrequestDNI.length;i++) {
          if(arrayrequestDNI[i]!=undefined) {
            var cantidad=arrayrequestDNI[i];
            if(cantidad.length > 7) {
              cadenaDNI=1;
            } else{
              cadenaDNI=0;
            }
            if(cadenaDNI==0){
              messengerError ="El Documento debe tener por lo menos (09) dígitos";
            }
          }
        }
      } else {
        messengerError ="Debes ingresar por lo menos un DNI";
      }
      
      if(messengerError)
          swal("Error", messengerError, "error");
      else{
        closeModal($('#requestDNI'));
               
        var resto=parseInt($('#span_en_planta').text())-arrayrequestDNI.length
        setTimeout(function() {
          swal({
            title: "Registro de Salidas",
            text: "¿Está seguro que desea registrar la salida de "+resto+" personas de esta Sede?",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger btn-sm",
            confirmButtonText: "Si",
            cancelButtonText: "No",                
            closeOnConfirm: true,
            closeOnCancel: false,
            showLoaderOnConfirm: true
          },function(action) {
            if (action===false) {                   
              swal.close();
              setTimeout(function(){$("#requestDNI").modal("hide");},800);
            } else {

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

              },400)

              var body ={
                "documents":arrayrequestDNI,
                "created_by":getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
                "last_updated_by":getCookie("vtas_id_hash"+sessionStorage.tabVisitasa)
              }
              var headers ={
                "apikey":"r$3#23516ewew5"        
              }
              var url = apiurlaccessregistries+"/api/Post-AccessEvent-All?code="+PostAccessEventAll+"&httpmethod=removeDocuments&id_location="+getCookie("vtas_sede"+sessionStorage.tabVisitasa); ;                   
              $.ajax({                    
                method: "POST",
                url:  url,
                data: JSON.stringify(body),
                headers:headers,
                crossDomain: true,
                dataType: "json",
              }).done(function(data) {
                if(data) {
                  if(data.status==true) {
                    swal.close();
                    setTimeout(function(){
                      swal("Exito!",data.message, "success");
                      $('#requestDNI').modal('hide');

                        $(".requestDNI").val("");
                        $(".dinact").empty();
                    },500)

                        if(oTableRecent)
                        oTableRecent.ajax.reload();
                  }else{
                    swal("Error!", "No se ha podido actualizar la lista.", "error");
                  }
                } else {
                  swal("Error!", "No se ha podido actualizar la lista.", "error");
                } 
              }).fail( function( jqXHR, textStatus, errorThrown ) {
                swal.close();
                setTimeout(function(){
                  showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
                },300)
              });
            }        
          });
        },800);
      }
    }

    var ListtimeExceeded = function(show){

      
      if(getCookie("vtas_sede"+sessionStorage.tabVisitasa)=="")
      return

      if(oTableExxe){
        oTableExxe.destroy();
      }
      var param={
        httpmethod:'exceededlist'
      }
      var url=apiurlaccessregistries+"/api/Get-AccessEvent-All?code="+Getaccesseventallcode+"&httpmethod=exceededlist&id_location="+getCookie("vtas_sede"+sessionStorage.tabVisitasa);                
      var headers={
        "apikey":"r$3#23516ewew5"        
      }
     
      oTableExxe=$('#tb_list_time_exceededs').DataTable({
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
           // console.log(xhr);
           // console.log(xhr.status)
            var textError=thrown;
            var status=xhr.status+' - '+xhr.statusText;//500 error servidor
  
            showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
            return;
            hideLoading();
          },
          dataType:"json",
          dataSrc:function(req) {
           //console.log(req);
           var nowdate     = moment();
            arrayGlobalServicesProg=req;
            var i=1;
            var data=[];
           var cant = req.length+cantExecedido;
           //console.log(cant);
            if(req)
            {
              //console.log(req.length)
              $("#span_excedido").text(cant)
            }
            if(cant > 9) {
              $('.CantExce').text(cant);
            } else {
              $('.CantExce').text('0'+cant);
            }

            req.map(function(item) 
            {              
                var fullname='-';
                if(item.fullname)
                  fullname=item.fullname;

                var name_company='-'
                if(item.name_company)
                  name_company=item.name_company;

                var area='-'
                if(item.name_area)
                  area=item.name_area;  

                
                var time_exceeded='-'
                if(item.time_exceeded) {
                  //Convertir a minutos
                  var minute=parseFloat(item.time_exceeded / 60000); 
                  var hour=parseFloat(minute / 60);
                  time_exceeded=minutos_a_horas(minute); 
                }
                var row = {
                  Documento: item.identity_document,
                  FullName:toCapitalize(fullname),
                  NameCompany:toCapitalize(name_company),
                  AreaC:toCapitalize(area), 
                  PermanenceC:'-',
                  TimeExceed:time_exceeded,
                  Responsable:'-'
                } 
                i++;
                data.push(row);
            });
            
            
            

            exceededPerson.map(function(item) 
            {
              //debugger;
             // console.log(item);
                var fullname='-';
                if(item.authorized_person[0].first_mane)
                  fullname=item.authorized_person[0].first_mane;

                var name_company='-'
                if(item.authorized_person[0].name_company)
                  name_company=item.authorized_person[0].name_company;

                var area='-'
                if(item.name_area)
                  area=item.name_area;  

                var inPlate  = moment(item.date_time);
                var diffMinutesExces = nowdate.diff(inPlate, 'minutes');
                
                var resultado = jsonTimeLimit.find( timeLimit => timeLimit.type_visita === item.type_visita);
                //console.log(diffMinutesExces,resultado.max_time);
                item.time_exceeded = diffMinutesExces-resultado.max_time;
                //if(diffMinutesExces > resultado.max_time)

                //console.log(diffMinutesExces2);
                var time_exceeded='-'
                if(item.time_exceeded) {
                  //Convertir a minutos
                  var minute=item.time_exceeded;
                  var hour=parseFloat(minute / 60);
                  time_exceeded=minutos_a_horas(minute); 
                }
                var row = {
                  Documento: item.authorized_person[0].identity_document,
                  FullName:toCapitalize(fullname),
                  NameCompany:toCapitalize(name_company),
                  AreaC:toCapitalize(area), 
                  PermanenceC:minutos_a_horas(diffMinutesExces),
                  TimeExceed:time_exceeded,
                  Responsable:'-'
                } 
                i++;
                data.push(row);
            });
            return data;
          } 
        },
        columns: [,        
          {title:"Documento",data:"Documento"},
          {title:"Nombre y apellido",data:"FullName"},
          {title:"Empresa",data:"NameCompany"},
          {title:"Área",data:"AreaC"},
          {title:"Permanencia",data:"PermanenceC"},
          {title:"Tiempo excedido",data:"TimeExceed"},
          {title:"Responsable",data:"Responsable"},
        ],
        initComplete: function(settings, json) {
          //alert("culminó la carga");
          //$('[data-toggle="tooltip"]').tooltip();      
        }
      });
      if(show!=1)
      $('#ListtimeExceededs').modal('show');
  }

   
    var saveCheckInCovid19Seg = function(id,enter,excepcional='')
    { 
      //alert("saveCheckInCovid19Seg");
      //console.log(checkRegister,id,enter,excepcional,$("#hid_identity_document").val());
      if(checkRegister==0){
        checkRegister = 1;
        setTimeout(function(){checkRegister = 0},5000);
          
      $("#btnAutorizar").prop('disabled',true);

     

      if(excepcional=="Excepcional" && enter==1)
      {
        if($("#hid_identity_document").val()=='undefined' || $("#tx_collaborator_name_autoriza").val()=="" || $("#tx_message_autoriza").val()=="")
        {
          swal({
            title: "Campos vacios",
            text: "Por favor verifique.",
            timer: 4000,
            type: "error",
            showConfirmButton: true
            });
            $("#sendIngresoExcepcional").show();
            $("#btnAutorizar").prop('disabled',false);
          return;
        }
      }
      $("#modalIngresoExcepcional").modal("hide");
      showLoading();
      var location              = getCookie("vtas_sede"+sessionStorage.tabVisitasa);//$("#hid_location").val();
      var garita                = getCookie("vtas_garita"+sessionStorage.tabVisitasa);//""//cookie 
      var identity_document     = $("#hid_identity_document").val();
      var area                  = $("#hid_area_name").val();
      var collaborator_autoriza = $("#tx_collaborator_name_autoriza").val();
      var tx_message_autoriza   = messageSecury+'<br> Observación: '+$("#tx_message_autoriza").val();
      var collaborator_autoriza_idhash=$("#tx_collaborator_idhash_autoriza").val(); 
      var collaborator_email    = $("#tx_collaborator_email_form_autoriza").val(); 
      //var nombre_persona        = $("#span_name_visitante").text();
      var nombre_persona        = $("#hid_name_person").val(); 
      var razon_acceso_denegado = $(".messagegarita").text();   
      var location_nade         = $("#listSedeSelectedUSer option:selected").text();
      var created_by            = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
      var action                = enter;
      var temperature           = $("#span_temperatures").val()==""?'0':$("#span_temperatures").val();      
      var is_collaborator       = $("#hid_is_collaborator_aforo").val();//
      //alert(is_collaborator);

      
      if(temperature==undefined)
        temperature = 0;
      var param         = "&id="+id+"&tx_message_autoriza="+tx_message_autoriza+"&enter="+enter+"&collaborator_autoriza_idhash="+collaborator_autoriza_idhash+"&temperature="+temperature+"&location="+location+"&area="+area+"&action="+action+"&created_by="+created_by+"&identity_document="+identity_document+"&attribute3="+excepcional+"&id_garita="+garita+"&collaborator_name="+collaborator_autoriza+"&collaborator_email="+collaborator_email+"&nombre_persona="+nombre_persona+"&razon_acceso_denegado="+razon_acceso_denegado+"&location_nade="+location_nade+"&is_collaborator="+is_collaborator;
      var url = apiurlblacklist+"/api/Post-Blacklist-User?code="+postblacklistusercode+"&httpmethod=checkincovidseguridad"+param;
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
        checkRegister = 0;
        $("#hid_identity_document").val("");
        $("#hid_area_name").val("");
        $("#tx_collaborator_name_autoriza").val("");
        $("#tx_collaborator_email_form_autoriza").val(""); 
        swal({
          title: "Registrado",
          text:'Proceso realizado con éxito',
          type: "success",
          timer:2000,
          showCancelButton: false,
          confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
          confirmButtonText: "De acuerdo",
          closeOnConfirm: false
        }); 
        $("#sendIngresoExcepcional").show();
        $("#footer_action").html("");
        hideLoading()
        if(oTableRecent)
        oTableRecent.ajax.reload();
        $("#tx_collaborator_name_autoriza").val("");
        $("#tx_collaborator_email_form_autoriza").val("");            
        //----------------------------------------------------limpiar form
        $("#barNotificationAccess")[0].className="card-header text-white bg-white";
                      $("#showAccessDataCard").html(`

                    
                      <div class="row">
                          
                      <div class="col-md-12" style="text-align: center!important;">
                        <img id="img_visitante" src="images/iconos/usersecu.svg" alt="" class="rounded-circle img-fluid" style="height: 16vh; width: 16vh;">
                    </div>                        
                      <div class="col-md-12" style="text-align: center!important;margin-top: 10;"><h3 id="span_name_visitante" class="text-light" style="color:rgb(228, 228, 228) !important">Nombre</h3></div>
                      <div class="col-md-12" style="text-align: center!important;"><h6  id="span_number_document" class="text-light" style="color:rgb(228, 228, 228) !important" >Documento de identidad</h6></div>
                      
                      <div class="col-12" style="text-align: center!important;"><hr>
                        <div class="row">
                          <div class="col-6 text-left pl-4">Empresa:</div>
                          <div class="col-6"></div>
                        </div>
                      </div>
                      <div class="col-12" style="text-align: center!important;"><hr>
                        <div class="row">
                          <div class="col-6 text-left pl-4">Último Tamizaje realizado:</div>
                          <div class="col-6"></div>
                        </div>
                      </div>
                      <div class="col-12" style="text-align: center!important;"><hr>
                        <div class="row">
                          <div class="col-6 text-left pl-4">Persona que autoriza:</div>
                          <div class="col-6"></div>
                        </div>
                      </div>
                      <div class="col-12" style="text-align: center!important;"><hr>
                        <div class="row">
                          <div class="col-6 text-left  pl-4">Área:</div>
                          <div class="col-6"></div>
                        </div>
                      </div>
                    

                      </div>
                                  <div class="text-center">
                                </div>`);
                                $("#tx_access_dni").val("");
                                $("#tx_access_dni").focus();
                      //----------------------------------------------------

                    });
      }
    }
    
    var validateplate = function(val){
      showLoading();
      vt_validateSecury(val,'security','vehicle');
      return;
      getAccessData(val,0);
      setTimeout(function(){
        hideLoading();
      },500);
    }


    var validate = function(val){     
      //return;
      if(val)
      {
    	if (val.trim() == '') {

        swal({
          title: "Campo Vacío",
          text:'Debe ingresar para realizar la búsqueda',
          type: "error",
          timer:3000,
          showCancelButton: false,
          confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
          confirmButtonText: "De acuerdo",
          closeOnConfirm: false
        }); 

    	
    	}else{
          var type = checkFotmatFind(val);//0-> buscamos placa 1-> Buscamos dni
          if(type==1)///buscamos la placa
          {
            validateplate(val);
          }
          else if(type==2){
            validatedni(val);
          }  
          else
          {
            swal({
              title: "Inválido",
              text:'Debe ingresar un formato documento o placa válido.',
              type: "error",
              timer:3000,
              showCancelButton: false,
              confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
              confirmButtonText: "De acuerdo",
              closeOnConfirm: false
            }); 
          }                  
      }
    }
    }
  var getAccessData = function(val,search=1)
  {

    //aquí mensaje de confimación
    var httpmethod = 'searchUserConfirm';
    if(search==0)
      httpmethod = 'searchVehicleConfirm';
  
    var name = getCookie('vtas_fullname'+sessionStorage.tabVisitasa);
    var created_by = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
  
    var ImageButtons =`
     <input type="file" id="photo" accept="image/*" hidden>
     <input type="text" id="base64" hidden>
     <button type="button" id="btnShowCamera"  class="btn btn-green-lime btn-raised btn-rounded " style="padding: 0rem 1rem!important; text-transform:lowercase!important; height: 24px; top:-25px" title="Tomar Foto"   onclick="">
         <img  src="images/iconos/capture.svg" class="rounded-circle img-fluid" style="height:25px; width: 15px;">
     </button>
     <button type="button" id="btnInputFile"   class="btn btn-info btn-raised btn-rounded " style="padding: 0rem 1rem!important; text-transform:lowercase!important;height: 24px; top:-25px" title="Buscar en disco"   onclick="">
         <img  src="images/iconos/file.svg" class="rounded-circle img-fluid" style="height:25px; width: 15px;">
     </button>
     <button type="button" id="btnUpdateImage" class="btn btn-green-lime btn-raised btn-rounded " style="padding: 0rem 1rem!important; text-transform:lowercase!important;height: 24px;display:none; top:-25px" title="Guardar"   onclick="">
         <img  src="images/iconos/save.svg" class="rounded-circle img-fluid" style="height:25px; width: 15px;"
     ></button>
`;
    
    var url = apiurlaccessregistries+"/api/Get-AccessEvent-All?httpmethod="+httpmethod+"&dni="+val+"&id_location=2&created_by="+created_by+"&code="+Getaccesseventallcode+"";                   
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
hideLoading()
;      console.log("datos de visita agendada")
      
      //se valida si no tiene nada agendado, no entra-------------------------------------------------------------------------------------------------
      if(!data.access)
      {
        console.log("Sin registros en agenda de visitas")
        if(data.picture){
          var img = data.picture;
          //ImageButtons = '';
        }
        
        var colreMessage="bg-danger";
        var textMessage="Acceso Denegado";
        var messag="No se Encontraron Registros"
        var but="";
        if(data.identity_document)
        {
          var messag="No cuenta con Ingreso Autorizado"
          var but=`<button type="button" id="btnAutorizar"  class="btn ${classBotton} btn-raised btn-rounded mt-2"  style="padding: 0rem 1rem!important; text-transform:!important;  height: 30px;" >${data.check_in==0?"Ingreso Excepcional":"Salida"}</button>`
        }
        else
        ImageButtons = '';
                                      $("#textNotificationAccess").text(textMessage!=undefined?textMessage:'')
                                      $("#barNotificationAccess")[0].className="card-header text-white "+colreMessage;


                                      $("#showAccessDataCard").empty();
                                      $("#showAccessDataCard").html(`
                                      <div class="row" ><h6 class="col-md-12" style="text-align:center!important;"><span class="messagegarita" style="border-bottom: 0px!important;">${messag}</span></h6></div>
                                     
                                      
                                      <div class="row">
                                      <div class="col-md-12" style="text-align: center!important;">
                                      <img id="img_visitante" src="${img!=undefined?img:"images/iconos/usersecu.svg"}" alt="" class="rounded-circle img-fluid" style="height: 16vh; width: 16vh;">
                                      <br>
                                      ${ImageButtons}
                                      </div>
                                        <div class="col-md-12" style="text-align: center!important;margin-top: 10;"><h4 id="span_name_visitante">${data.fullname!=undefined?data.fullname:'--'}</h4></div>
                                        <div class="col-md-12" style="text-align: center!important;"><h6 class="text-muted " id="span_number_document" >Documento: ${data.identity_document!=undefined?data.identity_document:$("#tx_access_dni").val()}</h6></div><div class="col-12 p-2" style="text-align: center!important;"><hr>
       
                                        <div class="col-12" style="text-align: center!important;">
                                        <div class="row">
                                            <div class="col-6 text-left pl-4">Empresa:</div>
                                            <div class="col-6">${data.name_company!=undefined?data.name_company:'--'}</div>
                                        </div>
                                      </div>

                                      <div class="col-12" style="text-align: center!important;"><hr>
                                        <div class="row">
                                          <div class="col-6 text-left pl-4">Último Tamizaje realizado:</div>
                                          <div class="col-6">--</div>
                                        </div>
                                      </div>

                                      <div class="col-12" style="text-align: center!important;"><hr>
                                        <div class="row">
                                          <div class="col-6 text-left pl-4">Persona que autoriza:</div>
                                          <div class="col-6" id="span_name_organizer">${data.collaborator!=undefined?data.collaborator:'--'}</div>
                                        </div>
                                      </div>

                                      <div class="col-12" style="text-align: center!important;"><hr>
                                        <div class="row">
                                          <div class="col-6 text-left pl-4">Área</div>
                                          <div class="col-6">${(data.area)?data.area:"--"}</div>
                                        </div>
                                      </div>

        <div class="text-center">
        <input type="hidden" id="hid_location" name="hid_location" value="${getCookie("vtas_sede"+sessionStorage.tabVisitasa)}">
        <input type="hidden" id="hid_id_blacklist" name="hid_id_blacklist" value="${data.id}">
        <input type="hidden" id="hid_area_name" name="hid_area_name" value="${data.area}">
        <input type="hidden" id="hid_action_type" name="hid_action_type" value="${data.action_type}">
        <input type="hidden" id="hid_identity_document" name="hid_identity_document" value="${data.identity_document}">
        <div class="text-center">
        ${but}
        
        </div>`);
        $("#sendIngresoExcepcional").click(function(){
          var check_in = data.check_in==0?1:0;
          
          saveCheckInCovid19Seg(data.id,check_in,'Excepcional');
          setTimeout(function(){
            $("#sendIngresoExcepcional").show();
          },4000);
        });
       
       $("#btnAutorizar").click(function(){
        var check_in = data.check_in==0?1:0;
        if(check_in==1)
          $("#modalIngresoExcepcional").modal("show");
        else 
          {
            

            saveCheckInCovid19Seg(data.id,check_in,'');
            setTimeout(function(){
              $("#sendIngresoExcepcional").show();
            },4000);
          }
       });

        getCollaboratordni(datacol)//busca en directorio de colaborador
        return
      }
      else//personas con registros agendados---------------------------------------------------------------------------------------------------
      {
  
      if(data.id_request_type==5)//persona gubernamental, pasa directo------------------------------------------------------------------------------------------------------------------
      {

        $("#img_visitante_r").attr("src",data.picture);
        $("#span_name_visitante_r").text(data.fullname);
        $("#span_number_document_r").text("Documento: "+data.identity_document);
        $("#hid_id_location_access").val(data.id_location);

        console.log("Persona de gubernamental ingresando...")

        var img ="images/iconos/usersecu.svg";
                    if(data.picture){
                      img = data.picture;
                     // ImageButtons = '';
                    }
                    
                      //if(!data.action_type || data.action_type==false){
                      
                      classBotton ='btn-green-lime';
                      var colreMessage="bg-success";
                      var check_in = 0;
                      if(!data.action_type){
                       check_in = 1;
                        var textMessage="Ingreso Autorizado";
                        textBotton = '<span style="text-transform: uppercase;">A</span>utorizar ingreso';
                        var direction = `onclick="vw_access_event.processAccess(1)"`;
                      }
                                            
                      if(data.action_type)
                      {
                        textMessage="Salida";
                        textBotton = '<span style="text-transform: uppercase;">R</span>egistrar salida';
                        var direction = `onclick="vw_access_event.processAccess(0)"`;
                      }
                        
                      var typeIngres = data.name_request_type;
                      data.collaborator = '';
                      

                                                $("#textNotificationAccess").text(textMessage)
                                                $("#barNotificationAccess")[0].className="card-header text-white "+colreMessage;
                                                
                                                $("#showAccessDataCard").empty();
                                                $("#showAccessDataCard").html(`
                                                <div class="row" ><h6 class="col-md-12" style="text-align:center!important;"><span class="messagegarita" style="border-bottom: 0px!important;">${typeIngres}</span></h6></div>
                                              
                                                
                                                <div class="row">
                                                <div class="col-md-12" style="text-align: center!important;">
                                                <img id="img_visitante" src="${img}" alt="" class="rounded-circle img-fluid" style="height: 16vh; width: 16vh;">
                                                  <br>
                                                  ${ImageButtons}
                                                </div>
                                                <div class="col-md-12" style="text-align: center!important;margin-top: 10;"><h4 id="span_name_visitante">${toCapitalize(data.fullname)}</h4></div>
                                                <div class="col-md-12" style="text-align: center!important;"><h6 class="text-muted " id="span_number_document" >Documento: ${data.identity_document}</h6></div>
                                      
                                                <div class="col-12" style="text-align: center!important;"><hr>
                                                  <div class="row">
                                                      <div class="col-6 text-left pl-4">Empresa:</div>
                                                      <div class="col-6">${data.name_company!=undefined?data.name_company:'--'}</div>
                                                  </div>
                                                </div>

                                                <div class="col-12" style="text-align: center!important;"><hr>
                                                  <div class="row">
                                                    <div class="col-6 text-left pl-4">Último Tamizaje realizado:</div>
                                                    <div class="col-6">${data.attention_date!=undefined?formatDateTime(data.attention_date,2,true):'--'}</div>
                                                  </div>
                                                </div>

                                                <div class="col-12" style="text-align: center!important;"><hr>
                                                  <div class="row">
                                                    <div class="col-6 text-left pl-4">Persona que autoriza:</div>
                                                    <div class="col-6" >${data.collaborator!=undefined?data.collaborator:'--'}</div>
                                                  </div>
                                                </div>

                                                <div class="col-12" style="text-align: center!important;"><hr>
                                                  <div class="row">
                                                    <div class="col-6 text-left pl-4" id="span_departament">Área</div>
                                                    <div class="col-6">${(data.area)?data.area:"--"}</div>
                                                  </div>
                                                </div>

                                                <div class="col-12" style="text-align: center!important;"><hr>
                                                <div class="row">
                                                  <div class="col-6 text-left pl-4" >Temperatura</div>
                                                  <div class="col-6"><input style="border:1px solid #999; padding:5px; border-radius:10px; width:80px"  step="0.1"  type="number" min="32" max="43"  maxlength="5" onkeyup="validarMoneda(this.id)" id="span_temperatures" ></div>
                                                </div>
                                              </div>

                                               
                                        </div>   

                                      <div class="text-center" id="footer_action">
                                      <input type="hidden" id="hid_location" name="hid_location" value="${data.id_location}">
                                      <input type="hidden" id="hid_id_blacklist" name="hid_id_blacklist" value="${data.id}">
                                      <input type="hidden" id="hid_area_name" name="hid_area_name" value="${data.area}">
                                      <input type="hidden" id="hid_action_type" name="hid_action_type" value="${data.action_type}">
                                      <input type="hidden" id="hid_identity_document" name="hid_identity_document" value="${data.identity_document}">
                                      
                                      <button type="button" id="btnTools" class="btn ${classBotton} btn-raised btn-rounded mt-2" style="padding: 0rem 1rem!important; text-transform:lowercase!important;  height: 30px;" onclick="$('#modalToolList').modal()"><span style="text-transform: uppercase;">H</span>erramientas</button>
                                      <!--<button type="button" id="btnVerDatos" class="btn btn-primary btn-rounded btn-raised mt-2" style="padding: 0rem 1rem!important; text-transform:lowercase!important;  height: 30px;"><span style="text-transform: uppercase;">V</span>er datos de solicitud</button>-->
                                      <button type="button" id="btnAutorizar" ${direction} class="btn ${classBotton} btn-raised btn-rounded mt-2"  style="padding: 0rem 1rem!important; text-transform:lowercase!important;  height: 30px;" >${textBotton}</button>
                                      </div>`);
                     // initInputPhoto(data.id,1,data.identity_document,data.list_type);

                      //initToolsList(data.action_type,data.material_goods_tool);
                      initInputPhoto(data.person_id,2,data.identity_document);
          
                      $("#h_car").val(data.company_access_request);
        return;
      }
      
     
      //console.log(data);
      if(search==1)
      {//searchUserConfirm

        console.log("Entrando persona de ingresos programados transportista,contratistas, proveedores")

        if (data.id_request_type == 4) //valida si es transportista
        {

          console.log("Verificando visita agendada proveedores y normales....................")
          var textBotton = '<span style="text-transform: uppercase;">R</span>egistrar salida';
          var classBotton ='btn-danger';
          // var direction = `onclick="vw_access_request.confirmVisitaAccess(0)"`;
          var direction = `onclick="vw_access_event.processAccess(0)"`; 
          if (data.access) 
          {
            var colreMessage="bg-success";
            var textMessage="Salida";

            var img ="images/iconos/usersecu.svg";
            if(data.picture){
              img = data.picture;
              //ImageButtons = '';
            }
            
            if(!data.action_type || data.action_type==false)
            {
              textBotton = '<span style="text-transform: uppercase;">A</span>utorizar ingreso';
              classBotton ='btn-green-lime';

              var colreMessage="bg-success";
              var textMessage="Ingreso Autorizado";
              //direction = `onclick="$('#modalInsertAlcoholemia').modal()"`;
            }

            $("#textNotificationAccess").text(textMessage!=undefined?textMessage:'')
            $("#barNotificationAccess")[0].className="card-header text-white "+colreMessage;


            $("#showAccessDataCard").empty();
            $("#showAccessDataCard").html(`
                                         
                                          <div class="row">
                                          <div class="col-md-12" style="text-align: center!important;">
                                          <img id="img_visitante" src="${img}" alt="" class="rounded-circle img-fluid" style="height: 16vh; width: 16vh;">
                                          <br>
                                            ${ImageButtons}
                                          </div>
            <div class="col-md-12" style="text-align: center!important;margin-top: 10;"><h4 id="span_name_visitante">${data.fullname}</h4></div>
            <div class="col-md-12" style="text-align: center!important;"><h6 class="text-muted " id="span_number_document" >Documento: ${data.identity_document}</h6></div>


            
                                                          <div class="col-12" style="text-align: center!important;"><hr>
                                                          <div class="row">
                                                              <div class="col-6 text-left pl-4">Empresa:</div>
                                                              <div class="col-6">${data.name_company!=undefined?data.name_company:'--'}</div>
                                                          </div>
                                                        </div>

                                                        <div class="col-12" style="text-align: center!important;"><hr>
                                                          <div class="row">
                                                            <div class="col-6 text-left pl-4">Último Tamizaje realizado:</div>
                                                            <div class="col-6"></div>
                                                          </div>
                                                        </div>

                                                        <div class="col-12" style="text-align: center!important;"><hr>
                                                          <div class="row">
                                                            <div class="col-6 text-left pl-4">Persona que autoriza:</div>
                                                            <div class="col-6" id="span_name_organizer">${data.collaborator!=undefined?data.collaborator:'--'}</div>
                                                          </div>
                                                        </div>

                                                        <div class="col-12" style="text-align: center!important;"><hr>
                                                          <div class="row">
                                                            <div class="col-6 text-left pl-4">Área</div>
                                                            <div class="col-6">${(data.area)?data.area:"--"}</div>
                                                          </div>
                                                        </div>

                                                       

           
            <div class="col text-center">

                <button type="button" id="btnTools" class="btn btn-green-lime btn-raised btn-rounded mt-2" style="padding: 0rem 1rem!important; text-transform:lowercase!important;  height: 30px;" onclick="$('#modalToolList').modal()"><span style="text-transform: uppercase;">H</span>erramientas</button>
                <!--<button type="button" id="btnVerDatos" class="btn btn-primary btn-rounded btn-raised mt-2" style="padding: 0rem 1rem!important; text-transform:lowercase!important;  height: 30px;"><span style="text-transform: uppercase;">V</span>er datos de solicitud</button>-->
                <button type="button" id="btnAutorizar" class="btn ${classBotton} btn-raised btn-rounded mt-2"  style="padding: 0rem 1rem!important; text-transform:lowercase!important;  height: 30px;" ${direction} >${textBotton}</button>
            
            </div>`);         
            
            

              initToolsList(data.action_type,data.material_goods_tool);
            initInputPhoto(data.person_id,2,data.identity_document);

            $("#h_car").val(data.company_access_request);

          }else{
            var colreMessage="bg-danger";
            var textMessage="Acceso Denegado";
            if(data.picture){
              var img = data.picture;
              ImageButtons = '';
            }

            if (!data.fullname) {
              ImageButtons = '';
            }

            $("#textNotificationAccess").text(textMessage!=undefined?textMessage:'')
            $("#barNotificationAccess")[0].className="card-header text-white "+colreMessage;

            $("#showAccessDataCard").empty();
            $("#showAccessDataCard").html(`
                                          <div class="row" ><h6 class="col-md-12" style="text-align:center!important;"><span class="titleMain messagegarita" style="border-bottom: 0px!important;">No cuenta con Ingreso Autorizado</span></h6></div>
                                         
                                          
                                          <div class="row">
                                          <div class="col-md-12" style="text-align: center!important;">
                                          <img id="img_visitante" src="${img!=undefined?img:"images/iconos/usersecu.svg"}" alt="" class="rounded-circle img-fluid" style="height: 16vh; width: 16vh;">
                                          <br>
                                            ${ImageButtons}
                                          </div>
                                          <div class="col-md-12" style="text-align: center!important;margin-top: 10;"><h4 id="span_name_visitante">${data.fullname!=undefined?data.fullname:'--'}</h4></div>
                                          <div class="col-md-12" style="text-align: center!important;"><h6 class="text-muted " id="span_number_document" >Documento: ${data.identity_document!=undefined?data.identity_document:$("#tx_access_dni").val()}</h6></div> <div class="col-12 p-2" style="text-align: center!important;">
                                          
                                          <div class="col-12" style="text-align: center!important;"><hr>
                                          <div class="row">
                                              <div class="col-6 text-left pl-4">Empresa:</div>
                                              <div class="col-6">${data.name_company!=undefined?data.name_company:'--'}</div>
                                          </div>
                                        </div>

                                        <div class="col-12" style="text-align: center!important;"><hr>
                                          <div class="row">
                                            <div class="col-6 text-left pl-4">Último Tamizaje realizado:</div>
                                            <div class="col-6"></div>
                                          </div>
                                        </div>

                                        <div class="col-12" style="text-align: center!important;"><hr>
                                          <div class="row">
                                            <div class="col-6 text-left pl-4">Persona que autoriza:</div>
                                            <div class="col-6" id="span_name_organizer">${data.collaborator!=undefined?data.collaborator:'--'}</div>
                                          </div>
                                        </div>

                                        <div class="col-12" style="text-align: center!important;"><hr>
                                          <div class="row">
                                            <div class="col-6 text-left pl-4">Área</div>
                                            <div class="col-6">${(data.area)?data.area:"--"}</div>
                                          </div>
                                        </div>

            <div class="text-center">
            
            <button type="button" id="btnAutorizar"  class="btn ${classBotton} btn-raised btn-rounded mt-2"  style="padding: 0rem 1rem!important; text-transform:!important;  height: 30px;" >Ingreso Excepcional</button>
            </div>`);
           initToolsList(data.action_type,data.material_goods_tool);
            initInputPhoto(data.person_id,2,data.identity_document);
          }


        }
        else{
          
        //mostrar mensaje de personas que no tienen tamizaje y en esta epoca se debe tener----------------------------------------------------------------------------

                                        $("#add_contacto_nombre_1").val('');
                                        $("#add_contacto_apellido_1").val('');
                                        $("#add_correo_1").val('');
   
                                      var img ="images/iconos/usersecu.svg";
                                      if(data.picture){
                                        img = data.picture;
                                        
                                      }

                                      var colreMessage="bg-danger";
                                      var textMessage="Acceso Denegado";

                                      $("#textNotificationAccess").text(textMessage!=undefined?textMessage:'')
                                      $("#barNotificationAccess")[0].className="card-header text-white "+colreMessage;
                                      $("#showAccessDataCard").empty();
                                      $("#showAccessDataCard").html(`
                                      <div class="row" ><h6 class="col-md-12" style="text-align:center!important;"><span class="messagegarita" style="border-bottom: 0px!important;">Se Debe Solicitar Realizar Tamizaje</span></h6></div>
                                      <div class="row">
                                      <div class="col-md-12" style="text-align: center!important;">
                                      <img id="img_visitante" src="${img}" alt="" class="rounded-circle img-fluid" style="height: 16vh; width: 16vh;">
                                      <br>
                                       ${ImageButtons}
                                      </div>
                                        <div class="col-md-12" style="text-align: center!important;margin-top: 10;"><h4 id="span_name_visitante">${data.fullname!=undefined?data.fullname:'--'}</h4></div>
                                        <div class="col-md-12" style="text-align: center!important;"><h6 class="text-muted " id="span_number_document" >Documento: ${data.identity_document!=undefined?data.identity_document:identity_document}</h6></div>
                                                <div class="col-12" style="text-align: center!important;"><hr>
                                                <div class="row">
                                                    <div class="col-6 text-left pl-4">Empresa:</div>
                                                    <div class="col-6">${data.name_company!=undefined?data.name_company:'--'}</div>
                                                </div>
                                              </div>

                                              <div class="col-12" style="text-align: center!important;"><hr>
                                                <div class="row">
                                                  <div class="col-6 text-left pl-4">Último Tamizaje realizado:</div>
                                                  <div class="col-6"></div>
                                                </div>
                                              </div>

                                              <div class="col-12" style="text-align: center!important;"><hr>
                                                <div class="row">
                                                  <div class="col-6 text-left pl-4">Persona que autoriza:</div>
                                                  <div class="col-6" id="span_name_organizer">${data.collaborator!=undefined?data.collaborator:'--'}</div>
                                                </div>
                                              </div>

                                              <div class="col-12" style="text-align: center!important;"><hr>
                                                <div class="row">
                                                  <div class="col-6 text-left pl-4" id="span_departament">Área</div>
                                                  <div class="col-6">${(data.area)?data.area:"--"}</div>
                                                </div>
                                              </div>
                                        </div>
                                        <div class="text-center">
                                        <input type="hidden" id="hid_location" name="hid_location" value="${getCookie("vtas_sede"+sessionStorage.tabVisitasa)}">
                                        <input type="hidden" id="hid_id_blacklist" name="hid_id_blacklist" value="${data.id}">
                                        <input type="hidden" id="hid_area_name" name="hid_area_name" value="${data.area}">
                                        <input type="hidden" id="hid_action_type" name="hid_action_type" value="${data.action_type}">
                                        <input type="hidden" id="hid_identity_document" name="hid_identity_document" value="${data.identity_document}">
                                        <div class="text-center">
                                        <button type="button" id="btnAutorizar"  class="btn ${classBotton} btn-raised btn-rounded mt-2"  style="padding: 0rem 1rem!important; text-transform:!important;  height: 30px;" >${data.check_in==0?"Ingreso Excepcional":"Registrar Salida"}</button>
                                        </div>`);
                                        $("#sendIngresoExcepcional").click(function(){
                                          var check_in = data.check_in==0?1:0;
                                          
                                          saveCheckInCovid19Seg(data.id,check_in,'Excepcional');
                                          setTimeout(function(){
                                            $("#sendIngresoExcepcional").show();
                                          },4000);
                                        });
                                       
                                       $("#btnAutorizar").click(function(){
                                        var check_in = data.check_in==0?1:0;
                                        if(check_in==1)
                                          $("#modalIngresoExcepcional").modal("show");
                                        else 
                                          {
                                            

                                            saveCheckInCovid19Seg(data.id,check_in,'');
                                            setTimeout(function(){
                                              $("#sendIngresoExcepcional").show();
                                            },4000);
                                          }
                                       });
                                        initInputPhoto(data.id,1,data.identity_document,data.list_type);
                                        return;
          }
        //fin de personas, deben tener tamizajes-----------------------------------------------------------------------------------

        var typeIngres=data.name_request_type;
        if (data.id_request_type == 2) //valida si es contratista para buscar ois
        {
          console.log("Verificando contratista para visita agendada....................")
          var identity_document = val;
          var dataOis=dataOIS;
              console.log(dataOis)
              if (dataOis.code != null)//si ois trae datos------------------------------------------------------- 
              {
                  if (dataOis.enabled_status == false) 
                  {
                    var colreMessage="bg-danger";

                    var textError="Falta OIS: ";
                    if(!dataOis.sctr_status){textError=textError+" .SCTR"}
                    if(!dataOis.emo_status){textError=textError+" .EMO"}
                    if(!dataOis.codanexo1_status){textError=textError+" .Anexo1"}
                    if(!dataOis.codanexo2_status){textError=textError+" .Anexo2"}
                    if(!dataOis.dj_status){textError=textError+" .DJ"}

                    var textMessage=textError ;
                    
                    if(data.picture){
                      ImageButtons = '';
                    }

                    $("#textNotificationAccess").text(textMessage!=undefined?textMessage:'')
                    $("#barNotificationAccess")[0].className="card-header text-white "+colreMessage;


                    $("#showAccessDataCard").empty();
                    $("#showAccessDataCard").html(`
                                                  <div class="row" ><h6 class="col-md-12" style="text-align:center!important;"><span class="messagegarita" style="border-bottom: 0px!important;">${typeIngres!=undefined?typeIngres:''}</span></h6></div>
                                                 
                                                  
                                                  <div class="row">
                                                  <div class="col-md-12" style="text-align: center!important;">
                                                  <img id="img_visitante" src="${data.picture?data.picture:"images/iconos/usersecu.svg"}" alt="" class="rounded-circle img-fluid" style="height: 16vh; width: 16vh;">
                                                  <br>
                                                  ${ImageButtons}
                                                  </div>
                    <div class="col-md-12" style="text-align: center!important;margin-top: 10;"><h4 id="span_name_visitante">${data.fullname!=undefined?data.fullname:'--'}</h4></div>
                    <div class="col-md-12" style="text-align: center!important;"><h6 class="text-muted " id="span_number_document" >Documento: ${data.identity_document!=undefined?data.identity_document:$("#tx_access_dni").val()}</h6></div><div class="col-12 p-2" style="text-align: center!important;"><hr>
                    <div class="row">
                      <div class="col-6 text-left pl-4">Empresa:</div>
                      <div class="col-6"></div>
                    </div>
                  </div>
                  <div class="col-12" style="text-align: center!important;"><hr>
                    <div class="row">
                      <div class="col-6 text-left text-left pl-4">Último Tamizaje realizado:</div>
                      <div class="col-6"></div>
                    </div>
                  </div>
                  <div class="col-12" style="text-align: center!important;"><hr>
                    <div class="row">
                      <div class="col-6 text-left text-left pl-4">Persona que autoriza:</div>
                      <div class="col-6" span_name_organizer>${data.collaborator!=undefined?data.collaborator:'--'}</div>
                    </div>
                  </div>
                  <div class="col-12" style="text-align: center!important;"><hr>
                    <div class="row">
                      <div class="col-6 text-left text-left pl-4" span_departament>${(data.area)?"Área: "+data.area:"--"}</div>
                      <div class="col-6"></div>
                    </div>
                  </div>
                 
                    <div class="text-center">
                    <button type="button" id="btnAutorizar"  class="btn ${classBotton} btn-raised btn-rounded mt-2"  style="padding: 0rem 1rem!important; text-transform:!important;  height: 30px;" >Ingreso Excepcional</button>
                    
                    </div>`);
                    initToolsList(data.action_type,data.material_goods_tool);
                    initInputPhoto(data.person_id,2,data.identity_document);
                  }
                  else
                  {
                    if (data.access) 
                    {
                      var colreMessage="bg-success";
                      var textMessage="Acceso autorizado";
                      var direction = `onclick="vw_access_event.processAccess(1)"`; 
                      var img ="images/iconos/usersecu.svg";
                      if(data.picture){
                        img = data.picture;
                        ImageButtons = '';
                      }

                      $("#textNotificationAccess").text(textMessage!=undefined?textMessage:'')
                      $("#barNotificationAccess")[0].className="card-header text-white "+colreMessage;

                      $("#showAccessDataCard").empty();
                      $("#showAccessDataCard").html(`
                     
                                          <div class="row" ><h6 class="col-md-12" style="text-align:center!important;"><span class="messagegarita" style="border-bottom: 0px!important;">${typeIngres}</span></h6></div><div class="row"><div class="col-md-12" style="text-align: center!important;">
                                          <img id="img_visitante" src="${img}" alt="" class="rounded-circle img-fluid" style="height: 16vh; width: 16vh;">
                                          <br>
                                                  ${ImageButtons}
                                          </div>

                                          
                      <div class="col-md-12" style="text-align: center!important;margin-top: 10;"><h4 id="span_name_visitante">${data.fullname}</h4></div>
                      <div class="col-md-12" style="text-align: center!important;"><h6 class="text-muted " id="span_number_document" >Documento: ${data.identity_document}</h6></div><div class="col-12 p-2" style="text-align: center!important;"><hr>
                      <div class="row">
                        <div class="col-6 text-left pl-4">Empresa:</div>
                        <div class="col-6"></div>
                      </div>
                    </div>
                    <div class="col-12" style="text-align: center!important;"><hr>
                      <div class="row">
                        <div class="col-6 text-left text-left pl-4">Último Tamizaje realizado:</div>
                        <div class="col-6"></div>
                      </div>
                    </div>
                    <div class="col-12" style="text-align: center!important;"><hr>
                      <div class="row">
                        <div class="col-6 text-left text-left pl-4">Persona que autoriza:</div>
                        <div class="col-6" span_name_organizer>${data.collaborator!=undefined?data.collaborator:'--'}</div>
                      </div>
                    </div>
                    <div class="col-12" style="text-align: center!important;"><hr>
                      <div class="row">
                        <div class="col-6 text-left text-left pl-4" span_departament>${(data.area)?"Área: "+data.area:"--"}</div>
                        <div class="col-6"></div>
                      </div>
                    </div>
                   
                      <div class="text-center">

                      <button type="button" id="btnTools" class="btn btn-green-lime btn-raised btn-rounded mt-2" style="padding: 0rem 1rem!important; text-transform:lowercase!important;  height: 30px;" onclick="$('#modalToolList').modal()"><span style="text-transform: uppercase;">H</span>erramientas</button>

                      <button type="button" id="btnAutorizar" class="btn btn-green-lime btn-raised btn-rounded mt-2"  style="padding: 0rem 1rem!important; text-transform:lowercase!important;  height: 30px;"  ${direction}"><span style="text-transform: uppercase;">A</span>utorizar ingreso</button>
                      </div>`);
                      initToolsList(data.action_type,data.material_goods_tool);
                      initInputPhoto(data.person_id,2,data.identity_document);
                    }
                    else
                    {

                      if(data.picture){
                        var img = data.picture;
                        ImageButtons = '';
                      }

                      var colreMessage="bg-danger";
                      var textMessage="No cuenta con Ingreso Autorizado";

                      $("#textNotificationAccess").text(textMessage!=undefined?textMessage:'')
                      $("#barNotificationAccess")[0].className="card-header text-white "+colreMessage;

          
                      $("#showAccessDataCard").empty();
                      $("#showAccessDataCard").html(`
                                                    <div class="row" ><h6 class="col-md-12" style="text-align:center!important;"><span class="messagegarita" style="border-bottom: 0px!important;">${typeIngres!=undefined?typeIngres:''}</span></h6></div>
                                                   
                                                    
                                                    <div class="row">
                                                    <div class="col-md-12" style="text-align: center!important;">
                                                    <img id="img_visitante" src="${img!=undefined?img:"images/iconos/usersecu.svg"}" alt="" class="rounded-circle img-fluid" style="height: 16vh; width: 16vh;">
                                                    <br>
                                                    ${ImageButtons}
                                                    </div>
                      <div class="col-md-12" style="text-align: center!important;margin-top: 10;"><h4 id="span_name_visitante">${data.fullname!=undefined?data.fullname:'--'}</h4></div>
                      <div class="col-md-12" style="text-align: center!important;"><h6 class="text-muted " id="span_number_document" >Documento: ${data.identity_document!=undefined?data.identity_document:$("#tx_access_dni").val()}</h6></div><div class="col-12 p-2" style="text-align: center!important;"><hr>
                     
                                                      <div class="col-12" style="text-align: center!important;"><hr>
                                                      <div class="row">
                                                          <div class="col-6 text-left pl-4">Empresa:</div>
                                                          <div class="col-6">${data.name_company!=undefined?data.name_company:'--'}</div>
                                                      </div>
                                                    </div>

                                                    <div class="col-12" style="text-align: center!important;"><hr>
                                                      <div class="row">
                                                        <div class="col-6 text-left pl-4">Último Tamizaje realizado:</div>
                                                        <div class="col-6"></div>
                                                      </div>
                                                    </div>

                                                    <div class="col-12" style="text-align: center!important;"><hr>
                                                      <div class="row">
                                                        <div class="col-6 text-left pl-4">Persona que autoriza:</div>
                                                        <div class="col-6" id="span_name_organizer">${data.collaborator!=undefined?data.collaborator:'--'}</div>
                                                      </div>
                                                    </div>

                                                    <div class="col-12" style="text-align: center!important;"><hr>
                                                      <div class="row">
                                                        <div class="col-6 text-left pl-4">Área</div>
                                                        <div class="col-6">${(data.area)?data.area:"--"}</div>
                                                      </div>
                                                    </div>

                      <div class="text-center">
                      <button type="button" id="btnAutorizar"  class="btn ${classBotton} btn-raised btn-rounded mt-2"  style="padding: 0rem 1rem!important; text-transform:!important;  height: 30px;" >Ingreso Excepcional</button>
                      
                      </div>`);
                      initToolsList(data.action_type,data.material_goods_tool);
                      initInputPhoto(data.person_id,2,data.identity_document);
                    }
                  }
              }
              else//no esta registrado en ois
              {

                var colreMessage="bg-danger";
                var textMessage="No Registrado en OIS" ;
                
                if (data.picture) {ImageButtons = '';}
                
                $("#textNotificationAccess").text(textMessage!=undefined?textMessage:'')
                $("#barNotificationAccess")[0].className="card-header text-white "+colreMessage;

                $("#showAccessDataCard").empty();
                $("#showAccessDataCard").html(`
                                              <div class="row" ><h6 class="col-md-12" style="text-align:center!important;"><span class="messagegarita" style="border-bottom: 0px!important;">${typeIngres!=undefined?typeIngres:''}</span></h6></div>
                                             
                                              
                                              <div class="row">
                                              <div class="col-md-12" style="text-align: center!important;">
                                              <img id="img_visitante" src="${data.picture?data.picture:"images/iconos/usersecu.svg"}" alt="" class="rounded-circle img-fluid" style="height: 16vh; width: 16vh;">

                                              <br>
                                              ${ImageButtons}

                                              </div>

                                              
                <div class="col-md-12" style="text-align: center!important;margin-top: 10;"><h4 id="span_name_visitante">${data.fullname!=undefined?data.fullname:'--'}</h4></div>
                <div class="col-md-12" style="text-align: center!important;"><h6 class="text-muted " id="span_number_document" >Documento: ${data.identity_document!=undefined?data.identity_document:$("#tx_access_dni").val()}</h6></div>

               
                                                        <div class="col-12" style="text-align: center!important;"><hr>
                                                        <div class="row">
                                                            <div class="col-6 text-left pl-4">Empresa:</div>
                                                            <div class="col-6">${data.name_company!=undefined?data.name_company:'--'}</div>
                                                        </div>
                                                      </div>

                                                      <div class="col-12" style="text-align: center!important;"><hr>
                                                        <div class="row">
                                                          <div class="col-6 text-left pl-4">Último Tamizaje realizado:</div>
                                                          <div class="col-6"></div>
                                                        </div>
                                                      </div>

                                                      <div class="col-12" style="text-align: center!important;"><hr>
                                                        <div class="row">
                                                          <div class="col-6 text-left pl-4">Persona que autoriza:</div>
                                                          <div class="col-6" id="span_name_organizer">${data.collaborator!=undefined?data.collaborator:'--'}</div>
                                                        </div>
                                                      </div>

                                                      <div class="col-12" style="text-align: center!important;"><hr>
                                                        <div class="row">
                                                          <div class="col-6 text-left pl-4">Área</div>
                                                          <div class="col-6">${(data.area)?data.area:"--"}</div>
                                                        </div>
                                                      </div>

                  <div class="text-center">
                  <button type="button" id="btnAutorizar"  class="btn ${classBotton} btn-raised btn-rounded mt-2"  style="padding: 0rem 1rem!important; text-transform:!important;  height: 30px;" >Ingreso Excepcional</button>
                
                </div>`);
                initToolsList(data.action_type,data.material_goods_tool);
                initInputPhoto(data.person_id,2,data.identity_document);
              }


         
        }
        else//cuando no es cintratista-----------------------------------------------------------------------------------------------------------------------
        {
            
        }
        
      }
      else if(search==0)//se busca vehiculo------------------------------------------------------------------------------------------------------
      {//vehicle
        $("#dataReqAccessVehicule").val("");
        //console.log(data);
        var textBotton = '<span style="text-transform: uppercase;">C</span>amión cisterna';
        var classBotton ='btn-green-lime';
          if (data.id_vehicle) {

            var colreMessage="bg-success";
            var textMessage="Acceso autorizado";

            var img ="images/iconos/vehiclesecu.svg"; 
           
            $("#dataReqAccessVehicule").val(JSON.stringify(data)); 
            $("#showAccessDataCard").empty();
            $("#showAccessDataCard").html(`<div class="row ${colreMessage} text-white" style="border-radius:5px; height:40px; top:-30px important! " >
            <h6 class="col-md-12 pt-2" style="text-align:center!important;">
            <span class="pt-2 messagegarita" style="border-bottom: 0px!important;">${textMessage!=undefined?textMessage:''}</span>
            </h6>
            </div>
            <hr>
            <div class="row" ><h6 class="col-md-12" style="text-align:center!important;"><span class="titleMain" style="border-bottom: 0px!important;"></span></h6></div>
            <div class="row"><div class="col-md-12" style="text-align: center!important;"><img id="img_visitante" src="${img}" alt="" class="rounded-circle img-fluid" style="height: 16vh; width: 16vh;"></div>
            <div class="col-md-12" style="text-align: center!important;margin-top: 10;"><h4 id="span_name_visitante">Placa: ${data.license_plate}</h4></div>
            </div>
            <div class="text-center">
            <button type="button" id="btnAutorizarVehiculoParticular" class="btn btn-primary btn-rounded btn-raised mt-2" style="padding: 0rem 1rem!important; text-transform:lowercase!important;  height: 30px;" onclick="vw_access_event.confirmVisitaAccessVehicle()"><span style="text-transform: uppercase;">V</span>ehículo particular</button>
            <button type="button" id="btnAutorizar" class="btn ${classBotton} btn-raised btn-rounded mt-2"  style="padding: 0rem 1rem!important; text-transform:lowercase!important;  height: 30px;"  onclick="vw_access_event.confirmVisitaAccessVehicleCisterna()"  >${textBotton}</button>
            </div>`);
            /*<div class="col-md-12" style="text-align: center!important;margin-top: 10;"><h6 id="span_name_visitante">Marca: ${data.brand}</h6></div>
            <div class="col-md-12" style="text-align: center!important;margin-top: 10;"><h6 id="span_name_visitante">Modelo: ${data.model}</h6></div>
            <div class="col-md-12" style="text-align: center!important;"><h6 class="text-muted " id="span_number_document" >Chofer : ${data.driver_name} </h6></div>
            <div class="col-md-12" style="text-align: center!important;">Visita a :<small class="text-help text-muted border-bottom h6" id="span_name_organizer">${data.data_supervisor_contact}</small></div>
            <div class="col-md-12" style="text-align: center!important;"><small class="text-help text-muted h6 " id="span_departament"></small></div>*/ 
          }else{

            var colreMessage="bg-danger";
            var textMessage="Vehículo no Autorizado";


            $("#textNotificationAccess").text(textMessage!=undefined?textMessage:'')
            $("#barNotificationAccess")[0].className="card-header text-white "+colreMessage;

            $("#showAccessDataCard").empty();
            $("#showAccessDataCard").html(`
                                          <div class="row" ><h6 class="col-md-12" style="text-align:center!important;"><span class="titleMain messagegarita" style="border-bottom: 0px!important;"></span></h6></div>
            <div class="row"><div class="col-md-12" style="text-align: center!important;"><img id="img_visitante" src="${img?img:"images/iconos/vehiclesecu.svg"}" alt="" class="rounded-circle img-fluid" style="height: 16vh; width: 16vh;"></div>
            <div class="col-md-12" style="text-align: center!important;margin-top: 10;"><h4 id="span_name_visitante">Placa: ${data.license_plate!=undefined?data.license_plate:$("#tx_access_dni").val()}</h4></div>
            </div>
            <div class="text-center">
            
            </div>`);

            
          }
      }
    }//fin de persona que si tienen registros
    });

    $("#btnAutorizar").focus();
  }
  var processAccess = function(type,typeEnter='')
  {
      //alert("processAccess");
      $("#btnAutorizar").prop('disabled',true);
      var car = $("#h_car").val();
      var observation = $("#tx_observation").val();
      var authorizedTools   = [];
      var tool = {};
      $("#listTools tr").each(function (index) {
        var name_tool = $(this).children('td').eq('0').text();
        var serial_tool = $(this).children('td').eq('1').text();
        if (type == 1) {
          var check = $(this).children('td').eq('2').find('#chk_tool').prop("checked");
        }else{
          var check = !$(this).children('td').eq('2').find('#chk_tool').prop("checked");
        }
        
        var id_tool = $(this).children('td').eq('3').text();

        tool ={
            "id_access_request_good_tool":id_tool,
            "name":name_tool,
            "serie_number":serial_tool,
            "authorized":check
        }

        authorizedTools.push(tool);
        console.log(name_tool+' '+serial_tool+' '+check+' '+id_tool);
      })
   
    var name = getCookie('vtas_fullname'+sessionStorage.tabVisitasa);
    var created_by = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
    var dni = $("#tx_access_dni").val();
    var alcoholStatus = $("#statusAlcohol").val();
    var witnessName = $("#witnessName").val();
    var witnessDocument = $("#witnessDocument").val();
    var location = getCookie("vtas_sede"+sessionStorage.tabVisitasa);//$("#hid_id_location_access").val();
    var temperature = $("#temperature").val();

    var body = {
      "created_by":getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
      "id_company_access_request":car,
      "authorized_tools":authorizedTools,
      "observation":observation,
      "typeEnter":typeEnter
    }
    //console.log(body);
    //alert("ernesto 1");
    var url = apiurlaccessregistries+"/api/Get-AccessEvent-All?httpmethod=searchUser&dni="+dni+"&id_location="+location+"&created_by="+created_by+"&witness_name="+witnessName+"&witness_id_document="+witnessDocument+"&accept_result="+alcoholStatus+"&temperature="+temperature+"&code="+Getaccesseventallcode+"";                   
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
      //console.log(data);
      if (data.access) 
      {
        var img ="images/iconos/usersecu.svg";
        if(data.picture){
          img = data.picture;
        }
       /*  swal({
            title: null,
            text: `<div class="row"><h6 class="col-md-12" style="text-align:center!important;"><span class="titleMain text-decoration-none">Visitante</span></h6></div><div class="row">          
                  <div class="col-md-12" style="text-align: center!important;"><img src="${img}" alt="" class="rounded-circle img-fluid"></div>
                  <div class="col-md-12" style="text-align: center!important;"><h5>${data.fullname}</h5></div>
                  <div class="col-md-12" style="text-align: center!important;"><h6 class="text-muted ">DNI:${data.identity_document}</h6></div>
                  <div class="col-md-12" style="text-align: center!important;"><small class="text-help text-muted h6 border-bottom">Visita a: ${data.collaborator}</small></div>
                  <div class="col-md-12" style="text-align: center!important;"><small class="text-help text-muted h6">${data.area} </small></div>
                </div>`,
            html: true,
        },
        function(){
          swal.close();
          $("#modalShowRequestDetails").modal('hide');
          $("#btnVerDatos").remove();
          $("#btnAutorizar").remove();
        }); */
        $("#modalInsertAlcoholemia").modal('hide');
        $("#statusAlcohol").val(0);
        $("#witnessDocument").val('');
        $("#witnessName").val('');
        $("#modalShowRequestDetails").modal('hide');
        $("#btnVerDatos").remove();
        $("#btnAutorizar").remove();
        swal.close();
        setTimeout(function()
        {
          swal({
            title: "Registrado",
            text:'Proceso realizado con éxito',
            type: "success",
            timer:2000,
            showCancelButton: false,
            confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
            confirmButtonText: "De acuerdo",
            closeOnConfirm: false
          }); 
            $("#titleModule").text("Ingresos solicitados");  
        },400)

        if(oTableRecent)
        oTableRecent.ajax.reload();

        $("#img_visitante").attr("src",img);
        $("#span_name_visitante").html(data.fullname);
        //alert(data.id_location);      
        $("#span_number_document").html(data.identity_document);
        $("#span_name_organizer").html("<div class='h5'>"+data.collaborator+"<div>");
        if(!data.job)
          data.area = "--";
        $("#span_departament").html(data.area); 

        $("#modalToolList").modal('hide');
        $("#tx_add_tool_name").val('');
        $("#tx_add_tool_serial_number").val('');
       // validatedni($("#tx_access_dni").val());


        //----------------------------------------------------limpiar form
        $("#barNotificationAccess")[0].className="card-header text-white bg-white";
                      $("#showAccessDataCard").html(`

                    
                      <div class="row">
                          
                      <div class="col-md-12" style="text-align: center!important;">
                        <img id="img_visitante" src="images/iconos/usersecu.svg" alt="" class="rounded-circle img-fluid" style="height: 16vh; width: 16vh;">
                    </div>                        
                      <div class="col-md-12" style="text-align: center!important;margin-top: 10;"><h3 id="span_name_visitante" class="text-light" style="color:rgb(228, 228, 228) !important">Nombre</h3></div>
                      <div class="col-md-12" style="text-align: center!important;"><h6  id="span_number_document" class="text-light" style="color:rgb(228, 228, 228) !important" >Documento de identidad</h6></div>
                      
                      <div class="col-12" style="text-align: center!important;"><hr>
                        <div class="row">
                          <div class="col-6 text-left pl-4">Empresa:</div>
                          <div class="col-6"></div>
                        </div>
                      </div>
                      <div class="col-12" style="text-align: center!important;"><hr>
                        <div class="row">
                          <div class="col-6 text-left pl-4">Último Tamizaje realizado:</div>
                          <div class="col-6"></div>
                        </div>
                      </div>
                      <div class="col-12" style="text-align: center!important;"><hr>
                        <div class="row">
                          <div class="col-6 text-left pl-4">Persona que autoriza:</div>
                          <div class="col-6"></div>
                        </div>
                      </div>
                      <div class="col-12" style="text-align: center!important;"><hr>
                        <div class="row">
                          <div class="col-6 text-left  pl-4">Área:</div>
                          <div class="col-6"></div>
                        </div>
                      </div>
                    

                      </div>
                                  <div class="text-center">
                                </div>`);
                                $("#tx_access_dni").val("");
                                $("#tx_access_dni").focus();
                      //----------------------------------------------------

        
      }
      else
      {
        swal("Error!", "No autorizado.", "error");
      }
    });
  }
  var getPersonBlackList = function()//busca solo en covid
  {      
   
    var httpmethod  = "objectlistmin";
    var url         = apiurlblacklist+"/api/Get-Blacklist-User?code="+getblacklistusercode+"&httpmethod="+httpmethod;              
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
       // console.log(data)
      var jsonPersonBlaclist1=[];
      data.map(function(item)
      {
        var json ={}
       
      
        json.label      = item.name;//campo de busqueda
        json.value      = item.identity_document;//campo que se coloca
        json.id         = item.id;
        json.firstname  = item.name;;
        json.id_company = item.id_company;
        json.identity_document = item.identity_document;
        //console.log(json)
        jsonPersonBlaclist1.push(json);   

      });
     
      $("#tx_access_dni").autocomplete({          
       
        source: jsonPersonBlaclist1,      
        minLength: 3,
        select: function( event, ui ) {

          setTimeout(function(){
            $("#tx_access_dni").val(ui.item.identity_document);
            validate(ui.item.identity_document);
            //$("#tx_access_dni").focus();
          },300);
          
        },
        
      });
    });
  }
  var initToolsList = function(action_type,material_goods_tool){
            if(!action_type || action_type==false){
                $(".toolIn").show();
                $(".toolOut").hide();
                $("#btnAutorizarIn").show();
                $("#btnAutorizarOut").hide();
            }else{
                $(".toolIn").hide();
                $(".toolOut").show();
                $("#btnAutorizarIn").hide();
                $("#btnAutorizarOut").show();
            }

            $("#listTools").empty();
            var count = 0;

            if(material_goods_tool)
            {
            if (material_goods_tool.length>0) 
            {
              material_goods_tool.map(function(item){
                var checked = "";
                
                if (item.authorized == 1) {
                  checked = "checked disabled";
                }

                if(!action_type || action_type==false){

                  $("#listTools").append('<tr><td>'+item.name+'</td><td>'+item.serie_number+'</td><td><input type="checkbox" id="chk_tool" name="chk_tool" '+checked+'></td><td hidden>'+item.id+'</td></tr>');
                  $("#totTools").html(material_goods_tool.length);

                }else{

                  if (item.authorized == 1) {

                    $("#listTools").append('<tr><td>'+item.name+'</td><td>'+item.serie_number+'</td><td><input type="checkbox" id="chk_tool" name="chk_tool"></td><td hidden>'+item.id+'</td></tr>');
                    count++;
                  }
                  $("#totTools").html(count);

                }
              

              })              
            }
          }

  }

  var initInputPhoto = function(person_id,type,identity_document,list_type){
            var inputPhoto = document.querySelector('#photo');
            var preview = document.querySelector('#img_visitante');
            var base = $("#base64");
            $("#btnInputFile").click(function(){
              console.log('click');
              inputPhoto.click();
            });
            $("#photo").change(function(){
              if (inputPhoto.files[0]) {

                  var datafile = inputPhoto.files[0];
                  //console.log(datafile);
                  if (datafile.size > 1000000) {
                      swal("Error", "El tamaño de la imagen es superior a 1Mb.", "error");
                      inputPhoto.value = null;
                  }else{
                      let fileReader = new FileReader();
                      fileReader.name = datafile.name;
                      fileReader.readAsDataURL(datafile);
                              
                      fileReader.onload = function(e) {

                          preview.src = fileReader.result;
                          base.val(fileReader.result);
                          $("#btnUpdateImage").show();
                      }
                  }
              }
            
            })

            const constraints = {
              video: {
              width: 800, height: 600
              }
            };

            const video = document.getElementById('video');
            const errorMsgElement = document.querySelector('span#errorMsg');
            const snap = document.getElementById("snap");
            const canvas = document.querySelector("canvas");
            async function initCamera() 
            {
              try {
              console.log(navigator.mediaDevices.enumerateDevices());
              const stream = await navigator.mediaDevices.getUserMedia(constraints);

              handleSuccess(stream);
              } catch (e) {
              swal({
                  title: "No cuenta con cámara para tomar una foto.",
                  type: "error"
                },function(){
                  $("#modalCamera").modal('hide');
                })
              }
            }
            function handleSuccess(stream) {
              window.stream = stream;
              video.srcObject = stream;
            }
            $("#btnShowCamera").click(function(){
              
              $("#modalCamera").modal();
              initCamera();
            })
            $('#modalCamera').on('hide.bs.modal', function (e) {
              //console.log(stream)
              if(typeof stream !== 'undefined')
              {
                setTimeout(function(){
                  stream.getTracks().forEach(function(track) {
                    track.stop();
                  });
                },2000);
              }
              
            })

            var context = canvas.getContext('2d');
            snap.addEventListener("click",function()
            {
              if(stream)
              {
                context.drawImage(video,0,0,640,480);
                var dataURL = canvas.toDataURL();
                preview.src = dataURL;
                base.val(dataURL);
                stream.getTracks();
                $("#btnUpdateImage").show();
                $("#modalCamera").modal("hide");

                  setTimeout(function(){
                    stream.getTracks().forEach(function(track) {
                      track.stop();
                    });
                  },2000);

              }

            })

            $("#btnUpdateImage").click(function(){

              swal({
                  title: "Actualización de foto",
                  text: "¿Desea actualizar la foto?.",
                  type: "info",
                  showCancelButton: true,
                  confirmButtonClass: "btn-danger btn-sm",
                  confirmButtonText: "Si",
                  cancelButtonText: "No",
                  closeOnConfirm: true
                },function(){

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
                                    
                  var hashId = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
                  if (type==1) {
                    var url = apiurlblacklist+"/api/Post-Blacklist-User?code="+postblacklistusercode+"&httpmethod=uploadpicture&id="+person_id;
                    var body ={
                        "picture":$("#base64").val(),
                        "last_updated_by":hashId,
                        "created_by":hashId,
                        "type":type,
                        "identity_document":identity_document                        
                    }
                  }else{
                    var url = 'https://s3cur17y7454-prd-access-security.azurewebsites.net/api/Post-Person-All?code="+PostPersonAllSeg+"&httpmethod=changeImage&id='+person_id;
                    var body ={
                        "person_picture":$("#base64").val(),
                        "last_updated_by":hashId
                    }
                  }

                  var headers = {
                      "apikey":"r$3#23516ewew5"
                  }

                  $.ajax({
                      method: "POST",
                      url:  url,
                      data : JSON.stringify(body),
                      headers:headers,
                      crossDomain: true,
                      dataType: "json",
                  }).done(function( dataimg)
                  {
                      //var message = "Se produjo un problema al momento de registrar la empresa";
                      if(dataimg.message){
                          message=dataimg.message;
                          swal("Error!", message, "error");
                      }
                      else{
                        swal.close();
                        swal({
                          title: "Actualizado",
                          text: "Proceso realizado con éxito.",
                          type: "success",
                          timer:2000,
                          showCancelButton: false,
                          confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
                          confirmButtonText: "De acuerdo",
                          closeOnConfirm: false
                        });

                          validate(identity_document);  
                   
                      }
                  }).fail( function( jqXHR, textStatus, errorThrown ) {
                    showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
                    console.log(errorThrown)
                  });
              });

            });
  }
  var reloadtableListRecent = function(){

  }

  var tableListRecent = function()
  {
    
    initlist++;
    console.log("iniciando recientes")
    if(refresRecient)//limpia el timer
    {
        clearInterval(refresRecient);
    }
    if(oTableRecent){
      oTableRecent.destroy();
    }
    var now = moment().format('YYYY-MM-DD');
    var location    = $("#hid_sede").val();
    //alert(location);
    //+"&id_location="+location
    var url         = apiurlaccessregistries+"/api/Get-AccessEvent-All?code="+Getaccesseventallcode+"&httpmethod=objectlist&id_request_type="+TYPE_ACCESS_REQUEST+"&id_location="+location;
    var headers ={
      "apikey":constantes.apiKey
    }
    oTableRecent = $('#tb_list_recientes').DataTable({
      paging    : false,
      ordering  : false,
      info      : false,
      searching : true,
      scrollY   : '50vh',
      scrollCollapse: true,
      ajax      :{
        type: "POST",
        url:  url,
        headers:headers,
        crossDomain: true,
        error: function (xhr, error, thrown) {

         // console.log(xhr);
         // console.log(xhr.status)
          var textError=thrown;
          var status=xhr.status+' - '+xhr.statusText;//500 error servidor

          if(refresRecient)
          {
            
            clearInterval(refresRecient);
            refresRecient=setInterval(function(){ oTableRecent.ajax.reload();;},600000);
            ListtimeExceeded(1)
          }
          else
          refresRecient=setInterval(function(){ oTableRecent.ajax.reload();},600000);
          showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.");
          return;

          hideLoading();
      },
        dataType: "json",
        dataSrc: function ( req ) 
        {
          exceededPerson =[];
          cantExecedido = 0;          
          console.log("Refresh Person Recientes");
          tableListRecentVehicle();
          arrayGlobalServicesProg=req;
          var cant_visitante = 0;
          var cant_proveedor = 0;
          var cant_contratista = 0;
          var cant_transportista = 0;  
          var cants_colaborador = 0; 
          var cants_cliente = 0;       
          var cant_finalizado = 0;
          var cant_en_planta = 0;
          var data  = [];
          var catnTemp=0;
          var datatemporales  = [];
          var i     = 1;
          var nowdate     = moment();
          var cantPersonExceso = 0;
            req.map(function(item)
            {
              if(item.person_name)
              {
                //conteo de personas en sede------------------------------------------------------
                if(item.is_collaborator && item.action_type )
                {
                  cants_colaborador++;
                }
                else if((item.action_type &&  !item.is_collaborator && item.id_request_type==null) || (item.action_type &&  item.id_request_type=="2"))//se cuenta contratista(tamizaje || visita programada)
                {
                  cant_contratista++;
                }
                else if( item.action_type &&  item.id_request_type=="1")//se cuenta visita
                {
                  cant_visitante++;
                }
                else if(item.action_type &&  item.id_request_type=="3")//se cuenta proveedor
                {
                  cant_proveedor++;
                }
                else if(item.action_type &&  item.id_request_type=="4")//se cuenta transportista
                {
                  cant_transportista++;
                }
                else if(item.action_type &&  item.id_request_type=="7")//se cuenta clientes
                {
                  cants_cliente++;
                }
             
            
           
            var action_type  = "Ingreso";
            if(item.action_type==false){
                action_type  = "Salida";
            }
            var checkTimeLimit = 0;
            var x = 0;
            
            if(item.action_type==true && item.attribute1=="1")
            {
                var exit        = moment(item.exit_time);
                var diffMinutesExces = nowdate.diff(exit, 'seconds');
                //console.log(diffMinutesExces,exit);
                if(item.id_status == 7 && diffMinutesExces>item.time_exceeded){//excedido en visita programada
                  cantPersonExceso++;
                }
                //console.log(item.action_type,item.attribute1);
                cant_en_planta++;
                //-----------------------------------------

                var inPlate  = moment(item.date_time);
                var diffMinutesExces2 = nowdate.diff(inPlate, 'minutes');
                //console.log(diffMinutesExces2);
                jsonTimeLimit.map(itemtl=>{
                  x++;
                  //verificamos que exista el tipo de visita para tomar el tiempo de pertenecia en la planta
                  if(item.type_visita==itemtl.type_visita){
                    checkTimeLimit = 1;
                    
                    //chequeamos el tiempo
                    if(diffMinutesExces2 > itemtl.max_time){// si existe los agregamos en la tabla de excedido
                      cantExecedido++;
                      console.log("Entró no 99");
                      exceededPerson.push(item);
                    }
                    //
                  }
                  if(jsonTimeLimit.length==x && checkTimeLimit==0)//no entró a ninguna, se busca el tiempo de pertenecia por default  
                  {
                    var resultado = jsonTimeLimit.find( timeLimit => timeLimit.type_visita === 99 );
                    if(diffMinutesExces2 > resultado.max_time){
                      cantExecedido++;
                      //console.log("Entró 99");
                      item.type_visita = 99;//default
                      exceededPerson.push(item);
                    }
                  }
                });
                console.log
            }
              var now   = moment();
              var b     = moment().add(1, 'seconds');
              var time  = moment(item.date_time);                            
              var diff  = now.diff(time, 'seconds');              
              var durationPlata = secondsToHms(diff);
              //console.log(durationPlata);
              var accessTime  = moment(item.date_time).format("HH:mm");
              var duration    = durationPlata;
              var week        = moment(item.date_time).format('ddd');//dddd
              var month       = moment(item.date_time).format('MMMM');//
              var day         = moment(item.date_time).format('D'); ;
              var startDate               = week +" "+day +" de "+ month;
              var img = item.person_picture?item.person_picture:"images/iconos/user.svg";
              
            var condicion=item.attribute3?`<small class="text-help" style="font-size:10px">( ${item.attribute3} )</small>`:'';
            
            

              var row = {
                  number            : i
                  ,accion		:item.action_type?`<div class="text-success textDatatable"  >${action_type}</div>${condicion}`:`<div class="text-danger  textDatatable">${action_type}</div>${condicion}` 
                  ,acces_date       : '<div class="font-weight-bold text-primary h4" id="times_'+item.id+'" >'+accessTime+'<br><small class="text-dark text-help" style="font-size:10px">'+startDate+'</small></div> ' 
                  ,person_name		: '<div class="row"> <div class="col-3 textDatatable"> <img class="rounded-circle" src="'+img+'" width="40" height="40"></div><div class="col-9 pt-2 textDatatable" > '+toCapitalize(item.person_name)+'</div> </div>'
                  ,empresa		:item.authorized_person?`<div class="textDatatable" >${toCapitalize(item.authorized_person[0].name_company)}</div>`:"" 
                  ,area		:`<div class="textDatatable" >${toCapitalize(item.name_area)}</div>` 
                  ,organizador		:`<div class="textDatatable" >${toCapitalize(item.data_supervisor_contact?item.data_supervisor_contact:'')}</div>` //
                }


                //calcular permanencia
                var nowtime = new Date();
                var dateBdd = moment(item.date_time).format('YYYY-MM-DD HH:mm:ss');                             
                    var time1   = moment(dateBdd,"YYYY-MM-DD HH:mm:ss");
                    var time2   = moment(nowtime,"YYYY-MM-DD HH:mm:ss");
                    var ms      = time2.diff(time1);
                    var minutes = moment.duration(ms).asMinutes();

                var rowtemporales = {
                   nombre		:item.person_name 
                  ,documento       :item.authorized_person[0].identity_document
                  ,entrada		: '<div class="font-weight-bold text-primary h4" id="times_'+item.id+'" >'+accessTime+'<br><small class="text-dark text-help" style="font-size:10px">'+startDate+'</small></div> ' 
                  ,permanencia		:parseInt(minutes)+' Min.'
                  ,limite		:(item.time_limit?item.time_limit:'0')+' Min.'
                  ,responsable		:toCapitalize(item.responsible_name)
                }
              
              i++;
              data.push(row);
              ///se valida que esten dentro
              if(item.action_type && item.responsible_name && item.attribute3=='Temporal')
              {
                datatemporales.push(rowtemporales);
                catnTemp++;
              }
              $('.CantTemp').text(catnTemp);
              $('#span_temporales').text(catnTemp);
              
            }
            });

            $("#cant_visitante").text(cant_visitante);
            $("#cant_proveedor").text(cant_proveedor);
            $("#cant_contratista").text(cant_contratista);
            $("#cant_transportista").text(cant_transportista);
            $("#cant_transportista").text(cant_transportista);
            $("#cant_colaborador").text(cants_colaborador);
            $("#cant_clientes").text(cants_cliente);
            cantPersonExceso = cantExecedido+cantPersonExceso;
            if(cantPersonExceso>9)
              $("#span_excedido").text("0"+cantPersonExceso);
            else
              $("#span_excedido").text(cantPersonExceso);

            if(refresRecient)
            {
              clearInterval(refresRecient);
              refresRecient=setInterval(function(){ oTableRecent.ajax.reload();},600000);
              ListtimeExceeded(1)
            }
            else
            refresRecient=setInterval(function(){ oTableRecent.ajax.reload();},600000);

            $("#span_en_planta").html(cant_en_planta);

            
            //set table temporales
            if(tableTemp){
              tableTemp.destroy();
            }
             tableTemp=$('#tb_list_Temporales').DataTable( {
              ordering  : false,
                  info      : false,
                  paging:false,
                  searching : true,
                  scrollY   : '60vh',
                  scrollCollapse: false,
                  responsive: false,
                  dom: 'Bfrtip',
                  buttons: [{
                    extend: 'excelHtml5',
                    className:'btn-success font-weight-bold ',              
                    text: 'Exportar a Excel',
                    //messageTop: 'Exportar a Excel',
                    exportOptions: {
                      columns: [0,1,2,3,4,5]
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
                      columns: [0,1,2,3,4,5]
                    },
                    title: 'Listado de personas',              
                    customize: function(xlsx) {
                    }
                  }
                ],
              data: datatemporales,
              columns: [
                  { title: "Entrada",data: "entrada" },
                  { title: "Nombres y Apellidos",data: "nombre" },
                  { title: "Documento",data: "documento" },
                  { title: "Permanencia",data: "permanencia" },
                  { title: "Limite",data: "limite" },
                  { title: "Responsable" ,data: "responsable"}
              ]
          } );
         

            //fin tabla temporales
          return data;

        } 
      },
      columns: [
        //{ title:"" ,data: "number",width: "2%", targets: 0 },        
        { title:"Hora de Registro",data: "acces_date",align: "left"  },
        { title:"Acción",data: "accion",align: "left" },
        { title:"Nombre",data: "person_name",align: "left", width:'25%'  },
        { title:"Empresa",data: "empresa",align: "left" , width:'20%' },
        { title:"Área",data: "area",align: "left" },
        { title:"Organizador",data: "organizador",align: "left" },
        //{ title:"",data: "time",width: "30%"}
    ],
    initComplete: function(settings, json) {
    
    }
  });
}

var initRegres=600000;
setInterval(function(){
  initRegres=initRegres-1000;

  //console.log(moment.duration(initRegres).asSeconds())
  $("#timeRegresi").text(formatDateTime((moment.duration(initRegres).asSeconds()),10,false))
},1000)

setInterval(function(){
  timerInServiceEstadoProg()
},1000)
var timerCourseSeg=0;
var arrayGlobalServicesProg=[];
function timerInServiceEstadoProg()
{

//access_time
//exit_time
  //time_exceeded
   var cant=0;
   var cantr=0;
    arrayGlobalServicesProg.map(item=>{

      if( $("#timesdet_"+item.id)[0])
{
        var date=new Date();
        //se calcula hora consumiento
        var dateBdd = moment(item.exit_time).format('YYYY-MM-DD HH:mm:ss');                             
                    var time1   = moment(dateBdd,"YYYY-MM-DD HH:mm:ss");
                    var time2   = moment(date,"YYYY-MM-DD HH:mm:ss");
                    var ms      = time1.diff(time2);
                    var seconds = moment.duration(ms).asSeconds();
                   // var hours = moment.duration(ms).asHours();
                   // var minutes = moment.duration(ms).asMinutes();
        //Se calcula hora total
        var dateBdd1 = moment(item.access_time).format('YYYY-MM-DD HH:mm:ss');                             
                    var time11   = moment(dateBdd1,"YYYY-MM-DD HH:mm:ss");
                    var dateBdd11 = moment(item.exit_time).format('YYYY-MM-DD HH:mm:ss');
                    var time22   = moment(dateBdd11,"YYYY-MM-DD HH:mm:ss");
                    var ms1      = time22.diff(time11);
                    var seconds1 = moment.duration(ms1).asSeconds();
                   // var hours1 = moment.duration(ms1).asHours();
                   // var minutes1 = moment.duration(ms1).asMinutes();
                  
                    //console.log(seconds1,seconds)
                    var horaresto=seconds1-(seconds1-seconds);
                   var horarestoex=0;
                    if(horaresto>=0)
                    {
                    $("#timesdet_"+item.id).text(formatDateTime((horaresto),10,false))
                    $("#timesdet_"+item.id)[0].className="card-title h5 text-primary font-weight-bold";
                    }
                    else{//minutos retrasados
                      $("#timesdet_"+item.id).text(formatDateTime((Math.abs(horaresto)),10,false))
                      $("#timesdet_"+item.id)[0].className="card-title h5 text-danger font-weight-bold";
                      if(Math.abs(horaresto)>=item.time_exceeded)
                      {
                        var horaresto=(seconds1+item.time_exceeded)-(seconds1-seconds);
                        $("#timesdet_"+item.id).text(formatDateTime((Math.abs(horaresto)),10,false))
                        $("#timesdet_"+item.id)[0].className="card-title h5 text-warning font-weight-bold";
                      }
                    }

                    if(!item.action_type)
                    {
                      var accessTime  = moment(item.date_time).format('LT');
                      $("#timesdet_"+item.id).text('00:00:00')
                      $("#timesdet_"+item.id)[0].className="card-title h5 text-light font-weight-bold";
                    }
 
                   /* $("#"+"timeIntervalestPRog_"+item.Id).css({color:'#4CAF50'})
                    $("#"+"timeIntervalestPRog_"+item.Id).text(seconds<0?'Retrasado':formatDateTime(seconds<=0?1:seconds,10,false));
                   
                     if(hours>=0 && hours<=2){
                        $("#"+"timeIntervalestPRog_"+item.Id).css({color:'#FDD835'})
                        $("#"+"timeIntervalestPRog_"+item.Id).text(formatDateTime(Math.abs(seconds),10,false));
                        cant++;
                    }
                    else if(seconds<0){
                        $("#"+"timeIntervalestPRog_"+item.Id).css({color:'##e53935'})
                        $("#"+"timeIntervalestPRog_"+item.Id).text('-'+formatDateTime(Math.abs(seconds),10,false));
                        cantr++;
                    } */
                   
                   // $("#"+"timeIntervalestPRog_"+item.Id).text(seconds);

                    //$("#"+"TimeServiceTotal_"+item.Id).text(formatDateTime(item.TimeTotal+seconds,10,false));
                  }
    });
  
}

var  secondsToHms = function(seconds) {
  if (!seconds) return '';
 
  let duration = seconds;
  let hours = duration / 3600;
  duration = duration % (3600);
 
  let min = parseInt(duration / 60);
  duration = duration % (60);
 
  let sec = parseInt(duration);
 
  if (sec < 10) {
    sec = `0${sec}`;
  }
  if (min < 10) {
    min = `0${min}`;
  }
  if (parseInt(hours, 10) > 0) {
    // return `${parseInt(hours, 10)}h ${min}m ${sec}s`
    return `${parseInt(hours, 10)}:${min}`;
  }
  else if (min == 0) {
    //${sec}
    return `00:00`;
  }
  else {
    //`${min}:${sec}`
    return `00:${min}`;
  }
}


    var initFormRequest = function(id){
      if (id==1) //no pprogramada----------------------------------------------------
      {
        $(".gp_no_programada").hide();
        $("#lab_colaborador").html(`ORGANIZADOR <span class="text-warning">*</span>`);
        $("#lab_empresa").html(`EMPRESA <span class="text-warning">*</span>`);
        getExternalCompany(true,""); 
        $("#relojContadorVisita").hide();
        //alert("dssss "+getCookie("vtas_sede"));
        if(getCookie("vtas_sede"+sessionStorage.tabVisitasa)!=""){
          $("#sel_location").val(getCookie("vtas_sede"+sessionStorage.tabVisitasa));
          getAreas(getCookie("vtas_sede"+sessionStorage.tabVisitasa));  
        }
        
        /*if($("#sel_location").val()!='0'){
          //buscamos el area. 
          $("#sel_location").val()
        }*/
        typeSecuryRequest='NOPROGRAMADA';
        
      }
      else//gubernamental-----------------------------------------------------------
      {
        $(".gp_no_programada").hide();
        $("#lab_colaborador").html(`RESPONSABLE <span class="text-warning">*</span>`);
        $("#lab_empresa").html(`ORGANISMO <span class="text-warning">*</span>`); 
        $("#btAddCompany_1").css("display","none"); 
        getExternalCompany(true,"GUBERNAMENTAL"); 
        initRegres=600000;
        $("#relojContadorVisita").show();
        typeSecuryRequest='GUBERNAMENTAL';
      }

      $("#bt_register_visita").click(function(){
        //noprogramado=true;
          confirmRegister(id);
      });

      
     

      
      //#modalShowRequestNP

      $("#fm_itinerary").bootstrapMaterialDesign();
      $("#fm_participante_1").bootstrapMaterialDesign();    

      $("#sel_location").change(function(){            
          var val = $(this).val();
          getAreas(val);
      });

      $("#sel_request_type").change(function()
      {
        if($(this).val()=="3")
        {
            $(".gp_proveedor").show();
            $(".gp_visita").show();
        }
        if($(this).val()!="3"){
            $(".gp_proveedor").hide();
            $(".gp_visita").show();
            $("#chb_OC_Emergencia").prop( "checked", false );                
            $("#txt_order_compra_id").val("0");
            $("#txt_order_compra_text").val("");
        }
      });

      getCollaborator();

      $("#bt_add_row_participante").click(function(){ 
          //alert("ssss");       
          addRowTableParticipante(id);
      });

       //alert("form 3");
   
        //$(".dv_itinerary").hide();
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
           // minDateTime: 0
        });

        $("#bt_add_row_vehicle").click(function(){         
            addRowVehicle();
        });
        //auto complete materiales
        var objTool         = $("#add_goods_tools");
        var objHiddenTool   = $("#add_goods_tools_id"); 
        getMaterialGoodsTools(objTool,objHiddenTool);
        //------------------------------
        var flagActualizarSelectCompany = true; 
        //getExternalCompany(flagActualizarSelectCompany,"GUBERNAMENTAL"); 
        //$('body').materializeInputs(); 
        var inputEmail = $("#add_correo_1");
        getEmail(inputEmail,1);

        var input = $("#add_dni_1");
        getPerson(input,1);

    }

    var getExternalCompany= function(flag,attribute5){
        //alert("aquí estamos");
        
        var url = apiurlsecurity+"/api/Get-ExternalCompany-All?code="+GetExternalCompanyAll+"&httpmethod=objectlist&attribute5="+attribute5;              
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
            if(flag){
                updateSelectExternalCompany();
                //updateSelectExternalCompanyTool();
                //updateSelectExternalCompanyVehicle();
            }
        });
    }
    
  /*
    var updateSelectExternalCompany = function(pos){
        var option = "";
        option+="<option value='0'></option>";
        jsonExternalCompany.map(function(item){
            option+="<option value='"+item.id+"'>"+toCapitalize(item.name)+"</option>";
        });
        $("#list_participantes form").each(function(){  
                                              
             $(this).find('.external-company').each(function(){    
                 //if(!$(this).val()){
                    //var idinput=$(this).attr("id");
                    if(pos)
                        $("#sel_company_"+pos).html(option); 
                    else
                        $(this).html(option); 
                 //}
             });
        });
    }*/

    var updateSelectExternalCompany = function(pos){
     
      var option = "";
      option+="<option value='0'></option>";
      jsonExternalCompany.map(function(item){
          option+="<option value='"+item.id+"'>"+toCapitalize(item.name)+"</option>";
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
                          },                          
                        },dropdownParent: $("#modalShowRequestNP")}
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
                    },dropdownParent: $("#modalShowRequestNP")});
                  }
               //}
           });
      });
    }
    
    /* var updateSelectExternalCompanyTool = function(pos){
        var option = "<option value='0'></option>";       
       
        jsonExternalCompany.map(function(item){
            option+="<option value='"+item.id+"'>"+toCapitalize(item.name)+"</option>";
        });
        $("#list_tools form").each(function(){                                    
             $(this).find('.external-company-tool').each(function(){    
                 //if(!$(this).val()){
                 //   var idinput=$(this).attr("id");
                 if(pos)
                    $("#sel_company_tool_"+pos).html(option); 
                 else
                    $(this).html(option); 
                 //}
             });
        });
    } */
    /*
    var updateSelectExternalCompanyVehicle = function(pos){
        var option = "<option value='0'></option>";
        jsonExternalCompanySelected.map(function(item){
            //option+="<option value='"+item.id+"'>"+toCapitalize(item.name)+"</option>";
            
        });
        $("#list_vehicles form").each(function(){                                    
             $(this).find('.external-company-vehicle').each(function(){    
                 //if(!$(this).val()){
                    //var idinput=$(this).attr("id");
                    if(pos)
                        $("#sel_company_vehicle_"+pos).html(option);
                    else
                        $(this).html(option); 
                 //}
             });
        });
    }*/
    /* var updateSelectExternalCompanyVehicle = function(pos){
        console.log("aqui access")
      var option = "<option value='0'></option>";
      jsonExternalCompanySelected.map(function(item){
          option+="<option value='"+item.val+"'>"+toCapitalize(item.text)+"</option>";
      });
      $("#list_vehicles form").each(function(){                                    
           $(this).find('.external-company-vehicle').each(function(){    
               //if(!$(this).val()){
                  //var idinput=$(this).attr("id");
                  if(pos){
                      $("#sel_company_vehicle_"+pos).html(option);
                      $("#sel_company_vehicle_"+pos).select2({language: {
                          noResults: function() {
                            return "No hay resultado";        
                          },
                          searching: function() {
                            return "Buscando..";
                          }
                        },dropdownParent: $("#modalShowRequestNP")});
                  }
                  else{
                      $(this).html(option); 
                      $(this).select2({language: {
                          noResults: function() {
                            return "No hay resultado";        
                          },
                          searching: function() {
                            return "Buscando..";
                          }
                        },dropdownParent: $("#modalShowRequestNP")});
                  }                        
               //}
           });
      });
  } */

    var confirmRegister = function(id){
        var warning         = 0;
        var message         ="";
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

        //var aaaa = moment(fecha_inicio,'YYYY-MM-DD').diff(fecha_final,'YYYY-MM-DD');
        //console.log(fecha1,fecha2,fecha2.diff(fecha1, 'days'), ' dias de diferencia',aaaa);   
        
        $("#list_participantes form").each(function(){   
           var checkNombre      =false;
           var checkApellido    =false;
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
                    checkApellido = true;
                }
                if(i==3 && (checkNombre==false || checkApellido==false || value.trim().length==0)){//correo
                    warning = true;
                    message = "Debes agregar datos de los participantes.";
                }
                i++;
            });
        });

        if (id == 1) {
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

          if(fecha_inicio.trim().length==0){
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
          //alert(noprogramado);
          if(noprogramado == false && validateDateItinerario('tx_date_start','tx_time_start','tx_date_end','tx_time_end')==false)
          return

          //alert(cantDayActive +" - "+ diasDiff);
          if( noprogramado == false && (cantDayActive<diasDiff || cantDayActive>diasDiff)){
              warning = 1;
              message = "La cantidad de días entre la fecha inicio y fin no concide con los días seccionados. Verifique";
          }
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

        if(warning==1){
            swal("Error",message,"error");//warning
        }                
        else{
            swal({
                title: "Registro de Datos de Ingreso",
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
                register(id);            
            });
        }
    }

    var register = function(id)
    {
        if (id==1) {
          var status = 2;
        }else{  
          var status = 3;
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

        },800)


        var body                = {}
        var location            = $("#sel_location").val();//
        var area                = $("#sel_area").val();//

        if (id==1) {
          var dateStart           = moment($("#tx_date_start").val(),"DD-MM-YYYY").format("YYYY-MM-DD");
          var dateEnd             = moment($("#tx_date_end").val(),"DD-MM-YYYY").format("YYYY-MM-DD");//dateStart//por ahora la misma que start
          var timeStart           = moment(dateStart+' '+ $("#tx_time_start").val(),"YYYY-MM-DD hh:mm a").format("YYYY-MM-DD HH:mm");//2020-02-29 11:00
          var timeEnd             = moment(dateEnd+' '+ $("#tx_time_end").val(),"YYYY-MM-DD hh:mm a").format("YYYY-MM-DD HH:mm");//2020-02-29 11:00
        }else{  
          var now = moment();
          console.log(now.format("YYYY-MM-DD"));
          var dateStart           = now.format("YYYY-MM-DD");
          var dateEnd             = now.format("YYYY-MM-DD");//dateStart//por ahora la misma que start
          var timeStart           = now.format("YYYY-MM-DD HH:mm");//2020-02-29 11:00
          var timeEnd             = now.format("YYYY-MM-DD 23:59");//2020-02-29 11:00
        }
        
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

        if (id==1) {
          var requesttype         =1;//no programada, siempre sera visita  $("#sel_request_type").val();//$("#sel_request_type").val(); 
        }else{  
          var requesttype         = 5;//tipo gubernamental
        }       
               
        var status              = status;
        var accessTime          = timeStart
        var exitTime            = timeEnd;//2020-02-29 14:00           
        var enableDays          = []; //obtenerlo con moment por la fecha de la visita        
        var enabled_sun_day     = $("#ch_itinirary_do").is(':checked');//activar el día, domingo
        var enabled_mon_day    = $("#ch_itinirary_lu").is(':checked');//activar el día, lunes
        var enabled_wednes_days = $("#ch_itinirary_mi").is(':checked');//activar el día, martes
        var enabled_thurs_day   = $("#ch_itinirary_ju").is(':checked');//activar el día, miercoles
        var enabled_fri_days    = $("#ch_itinirary_vi").is(':checked');//activar el día, jueves
        var enabled_satur_day   = $("#ch_itinirary_sa").is(':checked');//activar el día, viernes
        var enabled_tues_day     = $("#ch_itinirary_ma").is(':checked');//activar el día, s{abado

        if ($("#tx_quantity").val() == "" || $("#tx_quantity").val() == 0) {
          var quantity            = 0; 
        }else{
          var quantity            = $("#tx_quantity").val(); 
        }
         
        
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
           var name_company = "";
           var values = [];
           var i=0;
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
                ,"name_external_company":name_company              
                ,"affidavit":0                
                ,"first_name":toCapitalize(values[4])
                ,"last_name":toCapitalize(values[5])
                ,"identity_document":values[3]
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
        //console.log(authorizedPersons.length)

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
             console.log("tools  :"+JSON.stringify(tools));
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
            "id_request_type":requesttype,
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
            "quantity": quantity
        }
        //console.log(body);
        var url = apiurlaccessrequest+"/api/Post-AccessRequestFull-All?code="+PostAccessRequestFullAll+"&httpmethod=postSecurity";                   
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
            //console.log(data);
            swal.close();
            setTimeout(function(){
                swal("Registrado!", "Proceso realizado con éxito.", "success");
                $("#modalShowRequestNP").modal('hide')  
                //$("#titleModule").text("Ingresos solicitados");  
                //$('.modal-backdrop').remove();
            },500)
                    
            //nos vamos para la lsita
            //handlerUrlhtml('contentGlobal','view/accessRequestList.html','accessRequestList',requesttype);
           
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            swal("Error!", "Se produjo un problema al momento de registrar el ingreso.", "error");
            $('.modal-backdrop').remove();
        });
        //console.log(body);
    }


    var addRowTableParticipante = function(id){
        if (id == 1) {
          var selectName = "EMPRESA";
        }else{
          var selectName = "ORGANISMO";
        }
       var i = $("#list_participantes").find("div.bd-callout-no").length;//numero de filas       
       i++;
      
        var html= `<div class="bd-callout-no" id="bd-callout_participante_${i}" style="padding: 0.25rem!important;margin-top: 0.25rem!important;">
                    <form id="fm_participante_${i}" name="fm_participante_${i}" class="form-row ml-1" style="margin-bottom: 0.125rem!important;">
                        <div class="form-group  col-md-2 col-lg-2">  
                            <label for="sel_company_${i}" class="bmd-label-static titleInput" >${selectName} <span class="text-warning">*</span></label>                      
                            <select  name="sel_company_${i}" class="form-control  external-company" id="sel_company_${i}" required onchange="validateFieldMinForm()">                        
                            </select>
                            <small id="" class="form-text text-muted"><button type="button" style="border-radius: 25px;" class="btn btn-raised btn-sx btn-green-lime btn-rounded " id="btAddCompany_1" name="btAddCompany" onclick="" data-toggle="modal" data-target="#modalAddCompany" >Agregar Empresa</button> </small>
                        </div>

                        <div class="form-group col-md-1 col-lg-1">
                            <label for="add_correo_company_${i}" class="bmd-label-static titleInput">CORREO</label> 
                            <input type="email" class="form-control" id="add_correo_company_${i}" onkeyup="validateFieldMinForm()">     
                            <small id="" class="form-text text-muted">Correo del Responsable</small>                                       
                        </div>

                        <div class="form-group col-md-1 bmd-form-group is-filled">
                            <label for="tx_business_dni_${i}" class="bmd-label-static titleInput">TIPO<span class="text-warning">*</span></label>              
                            <select class="form-control" id="sel_identity_document_type_${i}" name="sel_identity_document_type_${i}">
                                <option value="DNI">DNI</option>
                                <option value="CE">CE</option>
                                <option value="PASAPORTE">PASAPORTE</option>
                            </select>
                        </div>

                        <div class="form-group col-md-1 bmd-form-group">
                            <label for="add_dni_${i}" class="bmd-label-static titleInput">DOCUMENTO<span class="text-warning">*</span></label>   
                            <input type="text" class="form-control ui-autocomplete-input" maxlength="10" id="add_dni_${i}" onblur="addDriverToVehicle('sel_person_vehicle_${i}')" autocomplete="off" onkeyup="validateFieldMinForm()">
                        </div>

                        <div class="form-group  col-md-2 col-lg-2">  
                            <label for="add_contacto_nombre_${i}"  class="bmd-label-static titleInput">PARTICIPANTE</label>                      
                            <input type="text" class="form-control" id="add_contacto_nombre_${i}" onblur="addDriverToVehicle('sel_person_vehicle_${i}')" onkeyup="validateFieldMinForm()">                    
                            <small id="" class="form-text text-muted">Nombres</small>
                        </div>
                        <div class="form-group col-md-2 col-lg-2">
                            <input type="text" class="form-control" id="add_contacto_apellido_${i}" onblur="addDriverToVehicle('sel_person_vehicle_${i}')" onkeyup="validateFieldMinForm()" >
                            <small id="" class="form-text text-muted">Apellidos</small>
                        </div>
                        
                        <div class="form-group col-md-2 col-lg-2">
                            <label for="add_correo_${i}" class="bmd-label-static titleInput">CORREO</label> 
                            <input type="email" class="form-control" id="add_correo_${i}" onkeyup="validateFieldMinForm()" onblur="addDriverToVehicle('sel_person_vehicle_${i}')">                                           
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
            $("#cant_row_persona").html($("#list_participantes").find("div.bd-callout-no").length);
        });

        $("[name='btAddCompany']").click(function(){   
            var id = $(this).attr("id");
            //alert(id);
            var array =id.split("_");
            positionAddCompany = array[1];
        });       
       
        var inputEmail = $("#add_correo_"+i);
        getEmail(inputEmail,i); 
        var input = $("#add_dni_"+i);
        getPerson(input,i);
        vw_access_request.checkPersonExist(input,i); 
        $("#sel_company_"+i).change(function(){          
          vw_access_request.updateListCompanySelect();
          vw_access_request.fnGetUserPersonResponsable($(this).val(),i);
        });
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
      });
    }
    var addRowTableTool = function(){
        var i = $("#list_tools").find("div.bd-callout").length;//numero de filas
        i++;
        var html = `<div class="bd-callout" id="bd-callout_tool_${i}" style="padding: 0.25rem!important;margin-top: 0.25rem!important;margin-bottom: 0.25rem!important;margin-left: -1.25rem !important;">
                        <form id="fm_tool_${i}" name="fm_tool_${i}" class="form-row ml-3" style="margin-bottom: 0.125rem!important;">
                            <div class="form-group col-md-2 col-lg-2">  
                                <label for="sel_company_tool_${i}" class="bmd-label-static titleInput">Empresa <span class="text-warning">*</span></label>                      
                                <select  name="sel_company_tool_${i}" class="form-control  external-company-tool" id="sel_company_tool_${i}" required>                        
                                </select>
                                <small id="" class="form-text text-muted"><button type="button" style="border-radius: 25px;" class="btn btn-raised btn-sx btn-green-lime btn-rounded " id="btAddCompany_1" name="btAddCompany" onclick="" data-toggle="modal" data-target="#modalAddCompany" >Agregar Empresa</button> </small>
                            </div>
                            <div class="form-group col-md-5 col-lg-5">   
                                <label for="add_goods_tools" class="bmd-label-static titleInput">Herramienta <span class="text-warning">*</span></label> 
                                <input type="hidden" class="form-control" id="add_goods_tools_id_${i}" value="0" > 
                                <input type="text" class="form-control " id="add_goods_tools_${i}" >                        
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
        var i = $("#list_vehicles").find("div.bd-callout").length;//numero de filas
        i++;
        var type_request = $("#sel_request_type").val();
        if(type_request=="4")  //si es transportista. habilitamos el y trailer
        {
            inputtrailer = `<div class="form-group col-md-1 col-lg-1" >
                                <label for="add_trailer" class="bmd-label-static titleInput">TRAILER </label>
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
                            <div class="form-group col-md-2 col-lg-2">    
                                <label for="sel_company_vehicle_${i}" class="bmd-label-static titleInput">EMPRESA</label>
                                <select  name="sel_company_vehicle_${i}" class="form-control  external-company-vehicle" id="sel_company_vehicle_${i}" required>                        
                                </select>
                                <small id="" class="form-text text-muted"><button type="button" style="border-radius: 25px;" class="btn btn-raised btn-sx btn-green-lime btn-rounded " id="btAddCompany_1" name="btAddCompany" onclick="" data-toggle="modal" data-target="#modalAddCompany" >Agregar Empresa</button> </small>
                            </div>
                            <div class="form-group col-md-2 col-lg-2">
                                <label for="sel_person_vehicle_${i}" class="bmd-label-static titleInput">CONDUCTOR</label>
                                <select  name="sel_person_vehicle_${i}" class="form-control" id="sel_person_vehicle_${i}" required>                        
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
        vw_access_request.updateListCompanySelect();
        $("#list_participantes form").each(function(){                                    
          $(this).find('.external-company').each(function(){ 
            $(this).select2({language: {
              noResults: function() {
                return "No hay resultado";
              },
              searching: function() {
                return "Buscando..";
              }
            },dropdownParent: $("#modalShowRequestNP")});
          })
        })
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

        var tx_business_dni         = $("#tx_business_dni").val();
        var tx_business_nombre      = $("#tx_business_nombre").val();
        var tx_business_apelllido   = $("#tx_business_apelllido").val();
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
                getExternalCompany(flagActualizarSelectCompany,"GUBERNAMENTAL");
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

    var getEmail =  function(obj,i){
        var perfil = getCookie("vtas_perfil"+sessionStorage.tabVisitasa);
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
                console.log(email);
                var searchType      = 1;

                var id_external_company = getCookie("vtas_external_company_id"+sessionStorage.tabVisitasa);

                //var param           = {vvhttpmethod:vvhttpmethod,name:name};
                var headers         = {"apiKey":"r$3#23516ewew5"}

                var url = apiurlsecurity+"/api/Get-Person-All?code="+GetPersonAll+"&httpmethod="+httpmethod+"&email="+email+"&search_type="+searchType;


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
                        json.email = item.email;
                        array.push(json);
                    });
                    response(array);
                    }                    
                });
            },
            minLength: 3,
            select: function( event, ui ) {
                   
                    var warning = false;
                    $("#list_participantes form").each(function(){   
                       var checkDocument     =false;
                       var checkEmail    =false;
                      
                       var j = 0;
                       var i = 0;
                        $(this).find('.form-control').each(function(){                                                          
                            var value = $(this).val(); 
                           
                            if(i==2 && value.trim()== ui.item.identity_document){//es nombre
                               // warning =true;
                            }
                            if(i==5 && value.trim()== ui.item.label){//es apllido
                               // warning = true;
                            }
                            i++;
                        });
                        console.log(j);
                    });

                    if (warning) {
                      console.log(warning)
                        swal({
                            title: "Error!",
                            text: "El participante ya se encuentra en la lista",
                            type: "error"
                          },function(){
                            $("#add_correo_"+i).val('');            
                        });
                          
                    }else{
                     $("#add_correo_"+i).val(ui.item.email);
                     $("#add_dni_"+i).val(ui.item.identity_document);
                     $("#add_contacto_nombre_"+i).val(ui.item.firstname);
                     $("#add_contacto_apellido_"+i).val(ui.item.lastname);
                     $("#sel_identity_document_type_"+i+" option:selected" ).attr("selected", false);
                     $("#sel_identity_document_type_"+i+" option[value='"+ui.item.identity_document_type+"']").attr("selected", true);
                     //$("#sel_company_"+i+" option:selected" ).attr("selected", false);
                     //$("#sel_company_"+i+" option[value='"+ui.item.id_external_company+"']").attr("selected", true);
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

    var getPerson =  function(obj,i){
        //alert("aquí estamos ");
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
                    
                     $("#add_correo_"+i).val(ui.item.email);
                     $("#add_dni_"+i).val(ui.item.identity_document);
                     $("#add_contacto_nombre_"+i).focus();
                     $("#add_contacto_nombre_"+i).val(ui.item.firstname);
                     $("#add_contacto_apellido_"+i).val(ui.item.lastname);
                     $("#sel_identity_document_type_"+i+" option:selected" ).attr("selected", false);
                     $("#sel_identity_document_type_"+i+" option[value='"+ui.item.identity_document_type+"']").attr("selected", true);
                     //$("#sel_company_"+i+" option:selected" ).attr("selected", false);
                     //$("#sel_company_"+i+" option[value='"+ui.item.id_external_company+"']").attr("selected", true);

                     setTimeout(function(){
                      validateFieldMinForm()
                     },300)
                    
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
                $("#txt_collaborator_id").val(ui.item.id);
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
                $("#spinnerLoadColaborador").show();
            },
            response: function () {
                $("#spinnerLoadColaborador").hide();
            }
        });
    }
    var getCollaboratordni =  function(data)
    { 

      
     var   classBotton ='btn-green-lime';

     if(data)
     {

                  if(data.value && data.value.length>0)
                  {
                    console.log("Buscando colaboradores en directorio......")
                        var colreMessage="bg-danger";
                        var textMessage="Acceso Denegado";
                
                                                      $("#textNotificationAccess").text(textMessage!=undefined?textMessage:'')
                                                      $("#barNotificationAccess")[0].className="card-header text-white "+colreMessage;
                
                
                                                      $("#showAccessDataCard").empty();
                                                      $("#showAccessDataCard").html(`
                                                      <div class="row" ><h6 class="col-md-12" style="text-align:center!important;"><span class="messagegarita" style="border-bottom: 0px!important;">No cuenta con Ingreso Autorizado</span></h6></div>
                                                    
                                                      
                                                      <div class="row">
                                                      <div class="col-md-12" style="text-align: center!important;">
                                                      <img id="img_visitante" src="images/iconos/usersecu.svg" alt="" class="rounded-circle img-fluid" style="height: 16vh; width: 16vh;">
                                                      <br>
                                                      
                                                      </div>
                                                        <div class="col-md-12" style="text-align: center!important;margin-top: 10;"><h4 id="span_name_visitante">${data.value[0].displayName!=undefined?toCapitalize(data.value[0].displayName):'--'}</h4></div>
                                                        <div class="col-md-12" style="text-align: center!important;"><h6 class="text-muted " id="span_number_document" >Documento: ${data.value[0].identity_document?data.value[0].identity_document:'--'}</h6></div><div class="col-12 p-2" style="text-align: center!important;"><hr>
                      
                                                        <div class="col-12" style="text-align: center!important;">
                                                        <div class="row">
                                                            <div class="col-6 text-left pl-4">Empresa:</div>
                                                            <div class="col-6">${data.value[0].companyName?data.value[0].companyName:'--'}</div>
                                                        </div>
                                                      </div>
                
                                                      <div class="col-12" style="text-align: center!important;"><hr>
                                                        <div class="row">
                                                          <div class="col-6 text-left pl-4">Último Tamizaje realizado:</div>
                                                          <div class="col-6"></div>
                                                        </div>
                                                      </div>
                
                                                      <div class="col-12" style="text-align: center!important;"><hr>
                                                        <div class="row">
                                                          <div class="col-4 text-left pl-4">Cargo:</div>
                                                          <div class="col-8" id="span_name_organizer">${data.value[0].jobTitle?toCapitalize(data.value[0].jobTitle):''}</div>
                                                        </div>
                                                      </div>
                
                
                        <div class="text-center pt-2">
                        
                        <input type="hidden" id="hid_location" name="hid_location" value="${getCookie("vtas_sede"+sessionStorage.tabVisitasa)}">
                        <input type="hidden" id="hid_id_blacklist" name="hid_id_blacklist" value="${data.id}">
                        <input type="hidden" id="hid_area_name" name="hid_area_name" value="${data.area}">
                        <input type="hidden" id="hid_action_type" name="hid_action_type" value="${data.action_type}">
                        <input type="hidden" id="hid_identity_document" name="hid_identity_document" value="${data.value[0].identity_document?data.value[0].identity_document:0}">
                        <div class="text-center">
                        <button type="button" id="btnAutorizar"  class="btn ${classBotton} btn-raised btn-rounded mt-2"  style="padding: 0rem 1rem!important; text-transform:!important;  height: 30px;" >${data.check_in==0?"Ingreso Excepcional":"Registrar Salida"}</button>
                        
                        </div>`);

                      $("#sendIngresoExcepcional").click(function(){
                        var check_in = data.check_in==0?1:0;
                        
                        
                        saveCheckInCovid19Seg(data.id,check_in,'Excepcional');
                        setTimeout(function(){
                          $("#sendIngresoExcepcional").show();
                        },4000);
                      });
                     
                     $("#btnAutorizar").click(function(){
                      var check_in = data.check_in==0?1:0;
                      if(check_in==1)
                        $("#modalIngresoExcepcional").modal("show");
                      else 
                       {
                        

                        saveCheckInCovid19Seg(data.id,check_in,'');
                        setTimeout(function(){
                          $("#sendIngresoExcepcional").show();
                        },4000);
                       }
                     });
                       
                }
              }
                return   
      }    
    
    var getCollaboratorEmail =  function()
    {
        $("#tx_collaborator_name").autocomplete({   
            change: function (event, ui) {
                if (ui.item === null) {
                    $("#tx_collaborator_name").val("");
                    $(this).val("");
                }
            }, 
            source: function( request, response ) {
                var filter = $("#tx_collaborator_name").val();
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
                    //console.log(data);
                    data.value.forEach(item => {
                        var json ={}
                        json.label = item.displayName;
                        json.value = item.displayName;
                        json.mail = item.userPrincipalName;
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
                $("#tx_collaborator_email_form").val(ui.item.mail);
                $("#tx_collaborator_name").val(ui.item.value);
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
                $("#spinnerLoadColaborador").show();
            },
            response: function () {
                $("#spinnerLoadColaborador").hide();
            }
        });
    }

    /*var getCollaboratorEmailExcepcional =  function()
    {
        $("#tx_collaborator_name_autoriza").autocomplete({   
            change: function (event, ui) {
                if (ui.item === null) {
                    $("#tx_collaborator_name_autoriza").val("");
                    $(this).val("");
                }
            }, 
            source: function( request, response ) {
                var filter = $("#tx_collaborator_name_autoriza").val();
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
                    //console.log(data);
                    data.value.forEach(item => {
                        var json ={}
                        json.label = item.displayName;
                        json.value = item.displayName;
                        json.mail = item.userPrincipalName;
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
                $("#tx_collaborator_email_form_autoriza").val(ui.item.mail);
                $("#tx_collaborator_name_autoriza").val(ui.item.value);
            },
            open: function() {
                $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
                $(".ui-autocomplete").css({'z-index':'10100'});
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
    }*/

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
            option="<option value='0'>Seleccione</option>";
            obj.append(option);
            data.map(function(item){
                option="<option value='"+item.id+"'>"+item.name+"</option>";
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
                option="<option value='"+item.id+"'>"+item.name+"</option>";
                obj.append(option);
            });

            if(getCookie("vtas_sede"+sessionStorage.tabVisitasa)!=""){
              //alert("err "+getCookie("vtas_sede"));
              $("#sel_location").val(getCookie("vtas_sede"+sessionStorage.tabVisitasa));
              getAreas(getCookie("vtas_sede"+sessionStorage.tabVisitasa));
            }
            

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

    var getObjectByValue = function (array, key, value) {
      return array.filter(function (object) {
          return object[key] === value;
      });
    }
    
    var confirmVisitaAccessVehicle = function(){
      var data  = $("#dataReqAccessVehicule").val();
      data      = JSON.parse(data);
      $("#hid_type_vehicle").val("1");
      $("#span_place_access").html(data.license_plate);
      $("#span_brand_access").html(data.brand);
      $("#span_model_access").html(data.model);
      $("#span_driver_access").html(data.driver_name);
      $("#span_dni_driver_access").html(data.driver_dni);      
      $("#span_to_visita").html(data.data_supervisor_contact);
      $("#span_license_number").html(data.driver_license_number);      
      $("#span_license_category").html(data.driver_license_category);
      $("#tx_observations").html(data.attribute5);
      
      $("#modalShowAccessVehicle").modal("show");
      var textButton ="&nbsp; &nbsp; Confirmar acceso &nbsp; &nbsp;";           
      if(data.action_type == 1){
        textButton = "&nbsp;&nbsp;Confirmar salida &nbsp;&nbsp;";
      }
      $("#bt_confirm_access").html(textButton);
    }
  
    var confirmVisitaAccessVehicleCisterna = function(){
      var data  = $("#dataReqAccessVehicule").val();
      $("#hid_type_vehicle").val("2");
      data      = JSON.parse(data);
      console.log(data);
      $("#span_place_access_cis").html(data.license_plate);
      $("#span_place_plataforma_access_cis").html(data.license_plate);
      
      $("#span_brand_access_cis").html(data.brand);
      $("#span_model_access_cis").html(data.model);
      $("#span_driver_access_cis").html(data.driver_name);
      $("#span_dni_driver_access_cis").html(data.driver_dni);      
      $("#span_to_visita_cis").html(data.data_supervisor_contact);
      $("#span_license_number_cis").html(data.driver_license_number);      
      $("#span_license_category_cis").html(data.driver_license_category);
      $("#modalShowAccessVehicleCisterna").modal("show");
      var textButton ="&nbsp; &nbsp; Confirmar acceso &nbsp; &nbsp;";           
      if(data.action_type == 1){
        textButton = "&nbsp;&nbsp;Confirmar salida &nbsp;&nbsp;";
      }
      $("#bt_confirm_access_cis").html(textButton);
    }
  



    var  getBaseUrl = function(id,idBase)  {
      var file = document.getElementById(id)['files'][0];
      var reader = new FileReader();
      var baseString;
      reader.onloadend = function () {
          baseString = reader.result;
          $('#'+idBase).val(baseString);
      };
      reader.readAsDataURL(file);
  }


    var validateAccessVehicle =  function(type)
    {  
      var data  = $("#dataReqAccessVehicule").val();
      if(data=="")
      {
        var message = "¿Seguro que desea registrar el ingreso del vehículo?";
      }
      else{
        data      = JSON.parse(data);
      
        var message = "¿Seguro que desea registrar el ingreso del vehículo?";
        if(data.action_type == 1){
          message = "¿Seguro que desea registrar la salida del vehículo?";
        }  
      }
         
      swal({
        title: "Chequeo de Vehículo",
        text: message,
        type: "info",
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
            registerAccessVehicle(type);            
          }     
      });      
    }

    var registerAccessVehicle = function(type){
      setTimeout(function()
        {
          swal({
            title: "Procesando...",
            text: "Por favor espere.",
            //timer: 3000,
            type: "info",
            showConfirmButton: false
          });
        },800);
      var jsonAccessVehicle = {}
      var data  = $("#dataReqAccessVehicule").val();
      
      if(data!="")
      data      = JSON.parse(data);
      else{
        
        data={
          "id": 0,
          "id_access": 0,
          "created_by": "user-keyid-5",
          "created_date": "2020-07-13T18:00:05.517",
          "last_updated_by": "user-keyid-5",
          "last_updated_date": "2020-07-13T18:00:05.517",
          "attribute1": null,
          "attribute2": null,
          "attribute3": type,
          "attribute4": null,
          "attribute5": "",
          "id_person": 0,
          "person_name": null,
          "data_supervisor_contact": "Alex Acero Acuña",
          "exceedCant": 0,
          "start_date": "0001-01-01T00:00:00",
          "end_date": "0001-01-01T00:00:00",
          "access_time": "0001-01-01T00:00:00",
          "exit_time": "0001-01-01T00:00:00",
          "cant_status": null,
          "time_exceeded": 0,
          "id_vehicle": 0,
          "license_plate": plateglobal,
          "brand": "",
          "model": "",
          "name_area": "Logística",
          "location": "",
          "driver_name": null,
          "driver_dni": null,
          "driver_license_number": "",
          "driver_license_category": "A",
          "in_date": "2020-07-17T17:01:58.453",
          "action_type": 0,
          "location_id": getCookie("vtas_sede"+sessionStorage.tabVisitasa)
        }
       
      } 
      var action  = 0;
      if(!data.action_type || data.action_type ==0)
        action = 1;
      jsonAccessVehicle.id_access             = data.id_access;
      jsonAccessVehicle.id_person             = data.id_person;
      jsonAccessVehicle.id_person             = data.id_person;
      jsonAccessVehicle.id_location             = getCookie("vtas_sede"+sessionStorage.tabVisitasa);
      jsonAccessVehicle.name_location             = $("#sedeHeader").text();
      jsonAccessVehicle.name_garita             = $("#garitaHeader").text();
      jsonAccessVehicle.id_garita             = getCookie("vtas_garita"+sessionStorage.tabVisitasa);
      jsonAccessVehicle.id_security_inspector = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
      jsonAccessVehicle.vehicle_plate         = data.license_plate;
      jsonAccessVehicle.vehicle_type          = $("#hid_type_vehicle").val();//particular
      jsonAccessVehicle.info_transport        = "";
      jsonAccessVehicle.info_heavy_vehicle    = "";
      jsonAccessVehicle.info_light_vehicle    = "";
      jsonAccessVehicle.observations          = "";
      jsonAccessVehicle.created_by            = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
      //jsonAccessVehicle.created_date          = data.created_date;
      jsonAccessVehicle.last_updated_by       = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
      //jsonAccessVehicle.last_updated_date     = data.last_updated_date;
      jsonAccessVehicle.attribute1            = "";
      jsonAccessVehicle.attribute2            = "";
      jsonAccessVehicle.attribute3            = type;
      jsonAccessVehicle.attribute4            = "";
      jsonAccessVehicle.attribute5            = $("#tx_observations").val(); 
      jsonAccessVehicle.action_type           = action; //ingresó
      jsonAccessVehicle.active                = true;

      jsonAccessVehicle.base_photo_1          = $("#base64-vehicle_1").val();
      jsonAccessVehicle.base_photo_2          = $("#base64-vehicle_2").val();
      jsonAccessVehicle.base_photo_3          = $("#base64-vehicle_3").val();
      jsonAccessVehicle.base_photo_4          = $("#base64-vehicle_4").val();
      jsonAccessVehicle.base_photo_5          = $("#base64-vehicle_5").val();



      
      //alert(action);
      var url = apiurlaccessregistries+"/api/Post-Vehicle-All?code="+PostVehicleAllreg+"&httpmethod=post";                   
      var headers ={
          "apikey":"r$3#23516ewew5"        
      }
      $.ajax({                    
          method: "POST",
          url:  url,
          data : JSON.stringify(jsonAccessVehicle),
          headers:headers,
          crossDomain: true,
          dataType: "json",
      }).done(function( data)
      {
          //console.log(data);
          swal.close();
          setTimeout(function(){

            swal({
              title: "Registrado",
              text:'Proceso realizado con éxito.',
              type: "success",
              timer:2000,
              showCancelButton: false,
              confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
              confirmButtonText: "De acuerdo",
              closeOnConfirm: false
            }); 

            oTableRecent.ajax.reload();
              $("#modalShowRequestNP").modal('hide');  
              $("#btnAutorizarVehiculoParticular").remove();
              $("#btnAutorizar").remove();

              plateglobal="";

              //----------------------------------------------------limpiar form
        $("#barNotificationAccess")[0].className="card-header text-white bg-white";
        $("#showAccessDataCard").html(`

      
        <div class="row">
            
        <div class="col-md-12" style="text-align: center!important;">
          <img id="img_visitante" src="images/iconos/usersecu.svg" alt="" class="rounded-circle img-fluid" style="height: 16vh; width: 16vh;">
      </div>                        
        <div class="col-md-12" style="text-align: center!important;margin-top: 10;"><h3 id="span_name_visitante" class="text-light" style="color:rgb(228, 228, 228) !important">Nombre</h3></div>
        <div class="col-md-12" style="text-align: center!important;"><h6  id="span_number_document" class="text-light" style="color:rgb(228, 228, 228) !important" >Documento de identidad</h6></div>
        
        <div class="col-12" style="text-align: center!important;"><hr>
          <div class="row">
            <div class="col-6 text-left pl-4">Empresa:</div>
            <div class="col-6"></div>
          </div>
        </div>
        <div class="col-12" style="text-align: center!important;"><hr>
          <div class="row">
            <div class="col-6 text-left pl-4">Último Tamizaje realizado:</div>
            <div class="col-6"></div>
          </div>
        </div>
        <div class="col-12" style="text-align: center!important;"><hr>
          <div class="row">
            <div class="col-6 text-left pl-4">Persona que autoriza:</div>
            <div class="col-6"></div>
          </div>
        </div>
        <div class="col-12" style="text-align: center!important;"><hr>
          <div class="row">
            <div class="col-6 text-left  pl-4">Área:</div>
            <div class="col-6"></div>
          </div>
        </div>
      

        </div>
                    <div class="text-center">
                  </div>`);
                  $("#tx_access_dni").val("");
                  $("#tx_access_dni").focus();
        //----------------------------------------------------
        
          },500);                 
         
      }).fail( function( jqXHR, textStatus, errorThrown ) {
        
        setTimeout(function(){
          showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
          swal.close();
        },300)
      });
    }

    var authorizeTools = function(type){
      console.log('authorizeTools');
      var car = $("#h_car").val();
      var observation = $("#tx_observation").val();
      var authorizedTools   = [];
      var tool = {};
      $("#listTools tr").each(function (index) {
        var name_tool = $(this).children('td').eq('0').text();
        var serial_tool = $(this).children('td').eq('1').text();
        if (type == 1) {
          var check = $(this).children('td').eq('2').find('#chk_tool').prop("checked");
        }else{
          var check = !$(this).children('td').eq('2').find('#chk_tool').prop("checked");
        }
        
        var id_tool = $(this).children('td').eq('3').text();

        tool ={
            "id_access_request_good_tool":id_tool,
            "name":name_tool,
            "serie_number":serial_tool,
            "authorized":check
        }

        authorizedTools.push(tool);
        console.log(name_tool+' '+serial_tool+' '+check+' '+id_tool);
      })

      var body = {
        "created_by":getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
        "id_company_access_request":car,
        "authorized_tools":authorizedTools,
        "observation":observation
      }
      var headers ={
        "apikey":"r$3#23516ewew5"        
      }
        $.ajax({
            method: "POST",
            url:  apiurlaccessregistries+"/api/Post-AccessEvent-All?code="+PostAccessEventAll+"&httpmethod=authorizeTools",
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
                $("#modalToolList").modal('hide');
                setTimeout(function(){
                    swal("Registrada!", "Proceso realizado con éxito.", "success");    
                    $("#tx_add_tool_name").val('');
                    $("#tx_add_tool_serial_number").val('');
                    validatedni($("#tx_access_dni").val());
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
      //console.log(body);
    }
    var showDetail = function(observation,exceptional_responsible_name){
      //alert(exceptional_responsible_name);
      $("#modalDetailExceptional").modal("show");
      $("#span_exceptional_observation").html(observation);
      $("#span_responsable_name").html(exceptional_responsible_name);      
    }

    //vehicles functions*************************************************************************************************************
    var initAccessRequestListveh = function(status){
      updateTableveh(0);
      $("#txt_search_visita").off();
      $('#txt_search_visita').on( 'keyup', function (event) 
      {      
        oTableVisita.search($(this).val()).draw();
        if($(this).val()=="")//limpia filtro buscado
        oTableVisita.search( '' ).columns().search( '' ).draw();
        if(event.which==13)
        {
          var enter = 1;
          updateTableveh(enter);
        }
      });
     //alert("sssssssssssss");    
    }

    var updateTableveh= function(enter=0){

      if(refresRecient)//limpia el timer
      {
          clearInterval(refresRecient);
      }
  
        if(oTableVisita){
          oTableVisita.clear().draw();
          oTableVisita.destroy();
        }
        //verificamos el check activo
        if(!status)
          status      = $('input:radio[name=chb_status_list]:checked').val();
        var search_type = '1';
        var httpmethod  = 'objectlist';
        var search  = $("#txt_search_visita").val().trim().length==0?"":"&search="+$("#txt_search_visita").val();
        var param = "&id_location="+$("#sel_sede").val()+"&company="+$("#sel_company").val()+"&area="+$("#sel_area").val()+"&tipoingreso="+$("#sel_type").val()+"&date_time_ini="+$("#tx_date_initi").val()+"&date_time_end="+$("#tx_date_endi").val()+"&id_request_type="+TYPE_ACCESS_REQUEST+"&group=-1&status_id=0"+search+"&type_access="+$("#sel_type_access").val();
        if(enter==1)
          param = "&id_request_type="+TYPE_ACCESS_REQUEST+"&group=-1&search="+$('#txt_search_visita').val();
        

      
        var url         = apiurlaccessregistries+"/api/Get-AccessVehicle-All?code="+GetAccessVehicleAll+"&httpmethod="+httpmethod+param;
        var headers = {
            "apikey":constantes.apiKey
        }
        oTableVisita = $('#tb_list_visita').DataTable({      
          ordering  : false,
          info      : false,
          paging:false,
          searching : true,
          scrollY   : '60vh',
          scrollCollapse: true,
          responsive: true,
          dom: 'Bfrtip',
          buttons: [{
            extend: 'excelHtml5',
            className:'btn-success font-weight-bold ',              
            text: 'Exportar a Excel',
            //messageTop: 'Exportar a Excel',
            exportOptions: {
              columns: [0,1,2,3,4,5,6,7]
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
              columns: [0,1,2,3,4,5,6,7]
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
          error: function (xhr, error, thrown) {
    
            console.log(xhr);
            console.log(xhr.status)
            var textError=thrown;
            var status=xhr.status+' - '+xhr.statusText;//500 error servidor
            showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
            
            return;
    
    
            //console.log( xhr, error, thrown );
            hideLoading();
        },
          drawCallback: function () {           
          },
          ajax      :{
            type: "POST",
            url:  url,
            headers:headers,
            crossDomain: true,
            dataType: "json",
            dataSrc: function ( req ) 
            {
              
                var data =[];
                var i = 1;
                //console.log(req);
                arrayGlobalServicesProg=req;
                //console.log(req.length);
                var totalExcedido = 0;
                var cantInPlata = 0;
    
                $("#cantTotal").text(req.length);
                req.map(function(item){
  
                  var id          = item.id;
                  var nowdate     = moment();
                  var access      = moment(item.created_date);
                  var accessTime  = moment(item.created_date).format('LT');
                  var exit        = moment(item.exit_time);
                  var exitTime    = moment(item.exit_time).format('LT');
                  var week        = moment(item.created_date).format('ddd');//dddd
                  var month       = moment(item.created_date).format('MMM');//
                  var day         = moment(item.created_date).format('D'); ;
                  var startDate   = week +" "+day +" de "+ month;
                  var diffMinutes = exit.diff(access, 'seconds');//minutes
                  var diffMinutesExces = nowdate.diff(exit, 'seconds');
                  
                  var type_access ="Normal";
                  if(item.attribute3=="Excepcional")
                    type_access ="Excepcional";
                  else  if(item.attribute3=="Temporal")
                    type_access ="Temporal";
                  else  if(item.attribute3=="Vencido")
                    type_access ="Vencido";
                  


  
                  var vPicture = "images/iconos/user.svg";
                  if (item.person_picture != null) {
                    vPicture = item.person_picture;
                  }
                  var buttonDet = '';
                  
                  if(type_access.trim()=="Excepcional"){                    
                    buttonDet = '<button type="button" class="btn " onclick="vw_access_event.showDetail(&quot;'+item.exceptional_observation+'&quot;)"><i class="material-icons btdetail" style="cursor:pointer ">more_vert</i></button>';
                  }
                  
                  //vw_black_list.thumbsUp(12010,true,'',"design soft","images/iconos/user.svg","null,","5654645" );
                  
                  var h = diffMinutes / 60 | 0;
                  var m = diffMinutes % 60 | 0;
                  var diffTime = secondsToHms(diffMinutes);//moment.utc().hours(h).minutes(m).format("hh:mm");
                 
                  var statusColor="";
                  var statusColorTime="text-green-lime";
                  if(item.id_status == 1){// pendiente por datos                
                    statusColor ="statusPperDatostx";
                  }
                  if(item.id_status == 2){// pendiente por aprobar                
                    statusColor ="statusPperAprovetx";
                  }
                  if(item.id_status == 3){// Programada (aprobadas)
                    statusColor ="statusPperProgtx";
                  }
                  if(item.id_status == 4){// en proceso            
                    statusColor ="statusPperCoursetx";
                  }
                  if(item.id_status == 5){// rechazado            
                    statusColor ="text-danger";
                  }
                  
                  
    
                  var nomVisitante = 'SIN INGRESOS';
                  if(item.person_name!=null){nomVisitante = item.person_name}
                  var imgAutorizerPerson      = "";
                  var imgAutorizerPerson2     = "";
                  
                  var authorizerPersons       = item.authorized_person?item.authorized_person:[];
                  var lengthAuthorizerPerson  = authorizerPersons.length;
                  var cant= lengthAuthorizerPerson;
                  if(cant<=9 && cant>0)
                    cant='0'+cant;
  
                  
                  var action_type  = "Ingreso";
                  if(item.action_type==false){
                      action_type  = "Salida";
                  }
                  
                  var buttonDet = '';
                
               
                  buttonDet = '<button type="button" class="btn " onclick="vw_access_event.showPhotoVehicle('+item.id+')"><i class="material-icons btdetail" style="cursor:pointer ">more_vert</i></button>';
               
                  var row = {
                      number            :i//<img src="images/iconos/motivo.svg"></div>
                      ,document         :item.driver_identity_document
                      ,participant      :item.driver_name
                      ,placa             :item.vehicle_plate
                      ,sede             :item.sede_name
                      ,company          :item.company_name
                      ,accion		        :item.action_type?`<div class="text-success">${action_type}</div>`:`<div class="text-danger">${action_type}</div>` 
                     
                      ,acces_dates      :startDate //item.date_time.replace('T',' ')
                      ,acces_date       :accessTime//item.date_time.replace('T',' ')
                      ,button           :buttonDet
     }
                  i++;
                  data.push(row);
                  //return
                });
               // $("#span_en_planta").html(cantInPlata);
               // $("#span_excedido").html(totalExcedido);
              return data;
            } 
          },
          columns: [
            { title:"Placa",data: "placa",align: "left"},
            { title:"Conductor",data: "participant",align: "left"},
            { title:"Documento",data: "document",align: "left"},
            { title:"Sede",data: "sede",align: "left"},//
            { title:"Empresa",data: "company",align: "left"},//
            { title:"Acción",data: "accion",align: "left"},     
            { title:"Fecha de Registro",data: "acces_dates",align: "left"},//startDate
            { title:"Hora de Registro",data: "acces_date",align: "left"},//startDate
            { title:"Fotos",data: "button",align: "center"},
            
          
          ],
        initComplete: function(settings, json) {
          //alert("culminó la carga");
          //$('[data-toggle="tooltip"]').tooltip();      
        }
        });
      }
      var getLocationssveh= function()
    { 
      
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
        jsonLocation=[];
        data.map(function(item){
          jsonLocation.push(item);               
        });  
         
        selectLocationveh("sel_sede");
       
      });
      //console.log(jsonLocation)
  }
  var selectLocationveh = function(id)
  {
    var option = "";    
   var obj=$("#"+id)[0]
        option+="<option value='0'>Todos</option>";
     
    jsonLocation.map(function(item){

        option+="<option value='"+item.id+"'>"+item.name+"</option>";
    });
    $(obj).html(option);

    if(getCookie("vtas_sede"+sessionStorage.tabVisitasa)!="")
    $(obj).val(getCookie("vtas_sede"+sessionStorage.tabVisitasa))

    initAccessRequestListveh();

  }
  var initValidateveh = function(){
        
    $('#txt_search_visita').on( 'keyup', function () {      
        oTableVisita.search($(this).val()).draw();
        if($(this).val()=="")//limpia filtro buscado
        oTableVisita.search( '' ).columns().search( '' ).draw();
    });
    /**/
    setInterval(function(){mueveReloj();},1000);  

   
}

  var tableListRecentVehicle = function()
    {
    
      initlist++;
      console.log("Refresh Vehicle Recientes")
    
      if(oTableRecentveh){
        oTableRecentveh.destroy();
      }
      var now = moment().format('YYYY-MM-DD');
      var location    = $("#hid_sede").val();
      //alert(location);
      //+"&id_location="+location
      var url         = apiurlaccessregistries+"/api/Get-AccessVehicle-All?code="+GetAccessVehicleAll+"&httpmethod=objectlistrecent&id_location="+location;
      var headers ={
        "apikey":constantes.apiKey
      }
      oTableRecentveh = $('#tb_list_recentveh').DataTable({
        paging    : false,
        ordering  : false,
        info      : false,
        searching : true,
        scrollY   : '50vh',
        scrollCollapse: true,
        ajax      :{
          type: "POST",
          url:  url,
          headers:headers,
          crossDomain: true,
          error: function (xhr, error, thrown) {
            showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.");
            return;
            hideLoading();
        },
          dataType: "json",
          dataSrc: function ( req ) 
          {
            $("#veh_en_planta").text(0)
            $(".Cantveh").text(0)
          
            var cant_contratista = 0;
            var cants_colaborador = 0;        
            var cant_en_planta = 0;
            var data  = [];
            var catnTemp=0;
            var datatemporales  = [];
            var i     = 1;
            var nowdate     = moment();
            var cantPersonExceso = 0;
              req.map(function(item)
              {
              
                if(item.action_type==true)
                {
                    var exit        = moment(item.exit_time);
                    var diffMinutesExces = nowdate.diff(exit, 'seconds');
                    if(item.id_status == 7 && diffMinutesExces>item.time_exceeded){
                      cantPersonExceso++;
                    }
                    //console.log(item.action_type,item.attribute1);
                    cant_en_planta++;

                    $("#veh_en_planta").text(cant_en_planta)
                    $(".Cantveh").text(cant_en_planta)
                
                var now   = moment();
                var b     = moment().add(1, 'seconds');
                var time  = moment(item.date_time);                            
                var diff  = now.diff(time, 'seconds');              
                var durationPlata = secondsToHms(diff);
                //console.log(durationPlata);
                var accessTime  = moment(item.created_date).format("HH:mm");
                var week        = moment(item.date_time).format('ddd');//dddd
                var month       = moment(item.date_time).format('MMMM');//
                var day         = moment(item.date_time).format('D'); ;

                var row = {
                    number            : i
                    ,acces_date       : '<div class="font-weight-bold text-primary h4">'+accessTime+'</div> ' 
                    ,person_name		: '<div>  '+item.driver_name?toCapitalize(item.driver_name):'-'+'</div> '
                    ,empresa		:`<div  >${item.company_name?toCapitalize(item.company_name):'-'}</div>`
                    ,placa		:`<div  >${item.vehicle_plate}</div>` 
                  }
                  //calcular permanencia
                  var nowtime = new Date();
                  var dateBdd = moment(item.date_time).format('YYYY-MM-DD HH:mm:ss');                             
                      var time1   = moment(dateBdd,"YYYY-MM-DD HH:mm:ss");
                      var time2   = moment(nowtime,"YYYY-MM-DD HH:mm:ss");
                      var ms      = time2.diff(time1);
                      var minutes = moment.duration(ms).asMinutes();

                i++;
                data.push(row);
                ///se valida que esten dentro
                }
              });

            return data;

          } 
        },
        columns: [
          //{ title:"" ,data: "number",width: "2%", targets: 0 },        
          { title:"Hora de Registro",data: "acces_date",align: "left"  },
          { title:"Placa",data: "placa",align: "left" },
          { title:"Conductor",data: "person_name",align: "left", width:'25%'  },
          { title:"Empresa",data: "empresa",align: "left" , width:'20%' },
          //{ title:"",data: "time",width: "30%"}
      ],
      initComplete: function(settings, json) {
        //alert("culminó la carga");
        //$('[data-toggle="tooltip"]').tooltip();      
      }
    });
  }
  var showPhotoVehicle = function(id){

    var url         = apiurlaccessregistries+"/api/Get-AccessVehicle-All?code="+GetAccessVehicleAll+"&httpmethod=object&id="+id;                   
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
         
        if(data.base_photo_1) 
          $("#image-vehicle_1").attr("src",data.base_photo_1);
        if(data.base_photo_2)  
          $("#image-vehicle_2").attr("src",data.base_photo_2);
        if(data.base_photo_3)  
          $("#image-vehicle_3").attr("src",data.base_photo_3);
        if(data.base_photo_4)  
          $("#image-vehicle_4").attr("src",data.base_photo_4);
        if(data.base_photo_5)         
          $("#image-vehicle_5").attr("src",data.base_photo_5);
        $("#modalShowPhoto").modal("show");
      });
    
  }

    return{
      init:function(){
            //getAreas();
            init();
            if(initlist>0)
            {
            tableListRecent();

           
            }
            ListtimeExceeded(1);
            getPersonBlackList();
           
      },
      reloadListRecent:function(){
	      reloadtableListRecent();
      },
      saveCheckInCovid19Seg:function(id,enter,excepcional){
        saveCheckInCovid19Seg(id,enter,excepcional);
      },
      initFormRequest:function(id)
      {
        
        $("#modalShowRequestNPBody").load('view/accessRequestSecurity.html', function(){
            //alert("modalShowRequestNPBody");
            //$.when(getAreas()).then(getLocations()).then(getRequestType()).then(initForm(id_request));
            //$("#lateralContent").removeClass('lateralContent');
           
          
            $("#body_form_request_register").load('form/form_activity_03_security.html', function()
            {
                $.when(/*getAreas(),*/getLocations(),getRequestType()).done(initFormRequest(id)); 
                if($("#tx_date_start")[0]){$("#tx_date_start").val(moment().format('DD/MM/YYYY'))}
                if($("#tx_date_end")[0]){$("#tx_date_end").val(moment().format('DD/MM/YYYY'))}  
                if($("#tx_time_start")[0]){$("#tx_time_start").val(moment().format('HH:MM'))}
                if($("#tx_time_end")[0]){$("#tx_time_end").val(moment().add(3,'hours').format('HH:MM'))} 
                
                var numDay=new Date().getUTCDay()-1;

                $("#ch_itinirary_lu").prop('checked', false); 
                $("#ch_itinirary_ma").prop('checked', false);
                $("#ch_itinirary_mi").prop('checked', false); 
                $("#ch_itinirary_ju").prop('checked', false); 
                $("#ch_itinirary_vi").prop('checked', false);
                $("#ch_itinirary_sa").prop('checked', false);
                $("#ch_itinirary_do").prop('checked', false); 

                

                if(numDay==1)
                {
                  $("#ch_itinirary_lu").prop('checked', true); 
                }
                if(numDay==2)
                {
                  $("#ch_itinirary_ma").prop('checked', true); 
                }
                if(numDay==3)
                {
                  $("#ch_itinirary_mi").prop('checked', true); 
                }
                if(numDay==4)
                {
                  $("#ch_itinirary_ju").prop('checked', true); 
                }
                if(numDay==5)
                {
                  $("#ch_itinirary_vi").prop('checked', true); 
                }
                if(numDay==6)
                {
                  $("#ch_itinirary_sa").prop('checked', true); 
                }
                if(numDay==0)
                {
                  $("#ch_itinirary_do").prop('checked', true); 
                }

            });
        });
      },
      initAccessRequestList:function(tab,enter)
      {
        
        
        $('label[name="lab_type_request-access"]').on('click', function(event) {       
          var id = $(this).attr("id");
          var array =id.split("_");
          var val = array[1];
          TYPE_ACCESS_REQUEST = val;  
          //alert(TYPE_ACCESS_REQUEST);    
          //initAccessRequestList();
        });
        $('#btn_group_status .btn').on('click', function(event) {     
          var val = $(this).find('input').val();
          initAccessRequestList(val);
        });

        initValidate();

        /*if(tab)
        TYPE_ACCESS_REQUEST = tab;*/

        initAccessRequestList(null,enter);
        //setInterval(function(){initAccessRequestList();},180000);
       /*  if(oTableVisita)
        oTableVisita.ajax.reload();
                         */
       
        
      },
      initAccessRequestListveh:function(tab,enter)
      {
        
        
        $('label[name="lab_type_request-access"]').on('click', function(event) {       
          var id = $(this).attr("id");
          var array =id.split("_");
          var val = array[1];
          TYPE_ACCESS_REQUEST = val;  
          //alert(TYPE_ACCESS_REQUEST);    
          //initAccessRequestList();
        });
        $('#btn_group_status .btn').on('click', function(event) {     
          var val = $(this).find('input').val();
          initAccessRequestListveh(val);
        });

        initValidateveh();

        /*if(tab)
        TYPE_ACCESS_REQUEST = tab;*/

        initAccessRequestListveh(null,enter);
        //setInterval(function(){initAccessRequestList();},180000);
       /*  if(oTableVisita)
        oTableVisita.ajax.reload();
                         */
       
        
      },
      processAccess:function(type,typeEnter){
        processAccess(type,typeEnter);
      },
      confirmVisitaAccessVehicle:function(data){
        confirmVisitaAccessVehicle(data);
      },
      validateAccessVehicle:function(type){
        validateAccessVehicle(type);
      },
      confirmVisitaAccessVehicleCisterna:function(){
        confirmVisitaAccessVehicleCisterna();
      },
      authorizeTools:function(){
        authorizeTools(1);
      },
      authorizeToolsOut:function(){
        authorizeTools(0);
      },
      adddnirequest:function(){
        adddnirequest();
      },
      ListtimeExceeded:function(){
        ListtimeExceeded();
      } ,
      tableListRecent:function(){
        tableListRecent();
      },
      getLocationss:function(){
        getLocationss();
      },
      getLocationssveh:function(){
        getLocationssveh();
      },
      initInputPhoto :function(person_id,type,identity_document,list_type){
        initInputPhoto(person_id,type,identity_document,list_type);
      },
      getExternalCompanyy:function(){
        getExternalCompanyy();
      },
     showDetail:function(obs,responsible_name){
        showDetail(obs,responsible_name);
      },
      showPhotoVehicle:function(id){
        showPhotoVehicle(id);
      }
    }
}();

    var selectedFilterStatusAccessEvent=function(val){


      $("#label_status_list_3")[0].className="btn  tabInactive";
      $("#label_status_list_4")[0].className="btn  tabInactive";
      $("#label_status_list_6")[0].className="btn  tabInactive";
      $("#label_status_list_7")[0].className="btn  tabInactive";

        if(val==3)
          $("#label_status_list_3")[0].className="btn tabInactive statusPperProg text-white";
        else if(val==4)
         $("#label_status_list_4")[0].className="btn tabInactive statusPperCourse text-white";
        else if(val==6)
         $("#label_status_list_6")[0].className="btn tabInactive bg-danger text-white";
        else if(val==7)
          $("#label_status_list_7")[0].className="btn tabInactive active";
       
    }


