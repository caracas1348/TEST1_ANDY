/* globals Chart:false, feather:false */
/*variable globales*/
var oTableParticipante;
var oTableVehiculo;
var oTableVisita;
var TOKEN_CLIENT="";
var TYPE_ACCESS_REQUEST = 1;
var SelectIniMenu = 0; // 0 menu principal, 1000 auditoria, 2000 ssoma
var menuc = ''; //variable que almacena las opciones de menu segun el perfil de acceso
var UsuarioHallazgoIncidente = 0; //variable global que indica si se veran los 5 por que desde incidente accidente

/*---------------------------Varibale globales para los DataPicker de Auditoria y SSOMA ---------------       */
jQuery.datetimepicker.setLocale('es');

/*---------------------------Varibale globales para los DataPicker de Auditoria y SSOMA ---------------       */




//Se actualiza hora y minutos del sistema
setInterval(function(){dinamicReloj();},60000);
var dinamicReloj = function ()
{
  var momentoActual = new Date();
  momentoActual =  moment(momentoActual).format("HH:mm");
  $("#timeSystem").text(momentoActual);
}
//se actualiza dia
setInterval(function(){dinamicDate();},3600000);
var dinamicDate = function (){
  $("#dateSystem").text(toCapitalize(moment().format('ddd D [de] MMM YYYY'))+',');
}


$("#sesUserName").text(toCapitalize(getCookie("vtas_fullname"+sessionStorage.tabVisitasa)));
moment.locale('es');

if(getCookie("vtas_fullname"+sessionStorage.tabVisitasa).length > 20)
{
  $("#sesUserName").css('font-size', 11)
}

var momentoActual = new Date();
  momentoActual =  moment(momentoActual).format("HH:mm");
  $("#timeSystem").text(momentoActual);
  $("#dateSystem").text(toCapitalize(moment().format('ddd D [de] MMM YYYY'))+',');

//activa los tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})



//----------
var vw_principal = function(){

  var init = function()
  {
    var param = {
      "client_id": "370d607d-5650-41fb-aa5f-644254136dab",
      "client_secret": "c1M7qP.s@]s-84BA5bgVG.W1:=h=QVsr",
      "scope": "https://graph.microsoft.com/.default",
      "grant_type": "client_credentials"
    }
    $.ajax({
        data: JSON.stringify(param),
        type: "post",
        async: true,
        processData:false,
        crossDomain : true,
        contentType : "application/json;charset=UTF-8",
        dataType: "json",
        url: apiurlsecurity+"/api/AuthClientCredentials?code="+AuthClientCredentials+""
    })
    .done(function( data, textStatus, jqXHR )
    {
        TOKEN_CLIENT = data.access_token;
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
        console.log();
    });







    $("#menuAccessRetorneListExt").click(function(){

      //$("#menuAccessRetorneList").popover('hide');
      $(this).tooltip('hide')
      //$('[rel="tooltip"]').tooltip('hide');
      handlerUrlhtml('contentGlobal','view/externalAccessRequestList.html','externalAccessRequestList');
    });

    $("#menuShowButtonNewVisita").click(function(){
      $(this).tooltip('hide')
      //handlerUrlhtml('contentGlobal','view/accessRequestRegister.html','accessRequestRegister');
      handlerUrlhtml('contentGlobal','view/auditoria/auditorList.html','Lista de Auditores');
      //$('body').materializeInputs();
    })
    $("#menuAccessRetorneListExt").click(function(){

      //$("#menuAccessRetorneList").popover('hide');
      $(this).tooltip('hide')
      //$('[rel="tooltip"]').tooltip('hide');
      handlerUrlhtml('contentGlobal','view/externalAccessRequestList.html','externalAccessRequestList');
    });



    //alert("aqui vamos a inicializar el formulario principal");
    // aqui vamos inicializar el formulario principal



      // colocamos la imagen del menu principal para el adminstrador
           //handlerUrlhtml('contentGlobal','menu.html','selectTypeRequest');
      //si es funcionario auditoria lo mandamos directo
            //if (usuario == auditoria)


            // else{     }
      // si es usuario sso lo mandamos directo


    $("#menuAccessRetorneListExt").click(function(){

      //$("#menuAccessRetorneList").popover('hide');
      $(this).tooltip('hide')
      //$('[rel="tooltip"]').tooltip('hide');
      handlerUrlhtml('contentGlobal','view/externalAccessRequestList.html','externalAccessRequestList');
    });
    $("#menuAccessRetorneList").click(function(){
      $(this).tooltip('hide')
      handlerUrlhtml('contentGlobal','view/accessRequestList.html','accessRequestList');
    });


    $("#menuShowButtonNewVisita").click(function(){
      alert("......");
    //  $(this).tooltip('hide')
      //handlerUrlhtml('contentGlobal','view/accessRequestRegister.html','accessRequestRegister');
      handlerUrlhtml('contentGlobal','view/auditoria/auditorList.html','Lista de Auditores');
      //$('body').materializeInputs();
      /*$(this).tooltip('hide');
      //handlerUrlhtml('contentGlobal','view/accessRequestRegister.html','accessRequestRegister');
      handlerUrlhtml('contentGlobal','view/selectTypeRequest.html','selectTypeRequest');
      //$('body').materializeInputs();  */
    })

    $("#menuAccessAproveCovidListColaborador").click(function(){
      $(this).tooltip('hide');
      //handlerUrlhtml('contentGlobal','view/accessRequestRegister.html','accessRequestRegister');
      //handlerUrlhtml('contentGlobal','view/selectTypeRequest.html','selectTypeRequest');
      handlerUrlhtml('contentGlobal','view/covidListColaboradorAprove.html','covidListColaboradorAprove');
      //$('body').materializeInputs();
    });
    $("#menuAccessPersonCovidListColaborador").click(function(){
      $(this).tooltip('hide');
      //handlerUrlhtml('contentGlobal','view/accessRequestRegister.html','accessRequestRegister');
      //handlerUrlhtml('contentGlobal','view/selectTypeRequest.html','selectTypeRequest');
      handlerUrlhtml('contentGlobal','view/covidListColaborador.html','covidListColaborador');
      //$('body').materializeInputs();
    });
    $("#menuAccessRRHH").click(function(){
      $(this).tooltip('hide');
      handlerUrlhtml('contentGlobal','view/rrhhListColaborator.html','rrhhListColaborator');
    });
    $("#menuAccessTemporal").click(function(){
      $(this).tooltip('hide');
      handlerUrlhtml('contentGlobal','view/tempListColaborador.html','tempListColaborator');
    });

    $("#menuAccessPersonCovidList").click(function(){
      $(this).tooltip('hide');
      //handlerUrlhtml('contentGlobal','view/accessRequestRegister.html','accessRequestRegister');
      //handlerUrlhtml('contentGlobal','view/selectTypeRequest.html','selectTypeRequest');
      handlerUrlhtml('contentGlobal','view/covidList.html','covidList');
      //$('body').materializeInputs();
    });

    $("#menuAccessRequirementsProhibitions").click(function(){
      $(this).tooltip('hide');
      handlerUrlhtml('contentGlobal','view/requirementCondition.html','requirementConditionList');

    });


    $("#menuAccessCompanyExt").click(function(){
      $(this).tooltip('hide')
      handlerUrlhtml('contentGlobal','view/externalAccesEditCompany.html','externalAccesEditCompany');
    });
    $("#menuAccessPersonListExt").click(function(){
      $(this).tooltip('hide')
      handlerUrlhtml('contentGlobal','view/externalAccesListPerson.html','externalAccesListPerson');
    });
    $("#menuAccessPersonBlackList").click(function(){
      $(this).tooltip('hide')
      handlerUrlhtml('contentGlobal','view/blackList.html','blackList');
    });
    $("#menuAccessPersonRiskList").click(function(){
      $(this).tooltip('hide')
      handlerUrlhtml('contentGlobal','view/riskList.html','risklist');
    });
    $("#menuSecurityaccess").click(function(){
      $(this).tooltip('hide')
      handlerUrlhtml('contentGlobal','view/securityagent.html','securityagent');
    });
    $("#menuAccessToPlat").click(function(){
      $(this).tooltip('hide')
      handlerUrlhtml('contentGlobal','view/accessToPlant.html','menuAccessToPlat');
    });

    $("#menuValidationEventList").click(function(){
      $(this).tooltip('hide');
      handlerUrlhtml('contentGlobal','view/validateAccessEvent.html','accessIngresosEventList');
    });
    $("#menuAccessEventList").click(function(){
      $(this).tooltip('hide');
      handlerUrlhtml('contentGlobal','view/accessEventList.html','accessEventList');
    });

    $("#menuAccessProfile").click(function(){
      $(this).tooltip('hide');

      handlerUrlhtml('contentGlobal','view/externalAccessRequestEditPerson.html','editProfile');
    })

  }

  var initList = function(){
    //-------------@andy----------------------


         switch (SelectIniMenu) {
          case 1000:
             //---------------------------------------------------------------------CASO MENU.HTML-------------------------
                  handlerUrlhtml('contentGlobal','view/auditoria/menu.html','externalAccessRequestList');
           break;
             //---------------------------------------------------------------------CASO MENU.HTML-------------------------

          case 2000:
              //---------------------------------------------------------------------CASO MENU.HTML-------------------------
            handlerUrlhtml('contentGlobal','view/ssoma/menu.html','externalAccessRequestList');

          break;
              //---------------------------------------------------------------------CASO MENU.HTML-------------------------



            //---------------------------------------------------------------------  DEFAULT  -------------------------
          default:
           //---------------------------------------------------------------------  DEFAULT  -------------------------
        }


   //-------------@andy----------------------





    moment.locale('es');
    $("#btShowButtonNewVisita").click(function(){
      //handlerUrlhtml('contentGlobal','view/accessRequestRegister.html','accessRequestRegister');
      handlerUrlhtml('contentGlobal','view/selectTypeRequest.html','selectTypeRequest');
      //$('body').materializeInputs();
    });

    $('#btn_group_status .btn').on('click', function(event) {
      var val = $(this).find('input').val();
      tableListVisitas(val);
    });

    $('label[name="lab_type_request"]').on('click', function(event) {
      var id = $(this).attr("id");
      var array =id.split("_");
      var val = array[1];
      TYPE_ACCESS_REQUEST = val;
      tableListVisitas();
    });

    $('#txt_search_visita').on( 'keyup', function () {
      oTableVisita.search($(this).val()).draw();
      if($(this).val()=="")//limpia filtro buscado
            oTableVisita.search( '' ).columns().search( '' ).draw();
    });

    //$('#example tbody').on( 'click', 'button', function () {
    $('#tb_list_visita').on('click', function(e){
      var id = parseInt(e.target.id);

      var status = $(e.target).data('status');

      /* if($('.btdetail').length > 1)
        $('.btdetail').popover('hide');  */

        /* $(e.target).popover('toggle');
        $("#hid_row_id_visita").val(id); */

       /*  $(".btdetail").on('shown.bs.popover', function () {
          if(status==1){//no se puede aprobar 1->pendiente por datos
            $(".btAprobar").hide();
            $(".btRechazar").hide();
            $(".btCancelar").show();
            $(".btFinalizar").hide();
          }

          if(status==2){//2->pendiente por aprobar
            $(".btAprobar").show();
            $(".btRechazar").show();
            $(".btCancelar").show();
            $(".btFinalizar").hide();
          }

          if(status==3 ){//3->programada,
            $(".btAprobar").hide();
            $(".btRechazar").hide();
            $(".btCancelar").show();
            $(".btFinalizar").hide();
          }

          if(status==4){//4->en proceso
            $(".btAprobar").hide();
            $(".btRechazar").hide();
            $(".btCancelar").show();
            $(".btFinalizar").show();
          }


          if(status==5 || status==6 || status==7){//5->RECHAZADO, 6->cancelado, 7->FINALIZADA
            $(".btAprobar").hide();
            $(".btRechazar").hide();
            $(".btCancelar").hide();
            $(".btFinalizar").hide();
          }

          $('.btdetail').popover('update')
        });  */
    });
  }

  //****************************************************************************** */

  //*************************************************************************** */

  var confirmApproveVisita =  function(){

    $('.btdetail').popover('hide');
    swal({
      title: "¿Deseas aprobar el ingreso ?",
      text: "Una vez aprobado, se le notificará a los participantes",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-warning btn-sm btn-rounded",
      cancelButtonClass: "btn-danger btn-sm btn-rounded",
      confirmButtonText: "Aprobar",
      cancelButtonText: "cancelar",
      closeOnConfirm: false,
      showLoaderOnConfirm: true
    },function(){
      approveVista();
    });
  }

  var approveVista = function(){


    var id          = $("#hid_row_id_visita").val();
    var httpmethod  = 'approve';
    var url         = apiurlaccessrequest+"/api/Post-ApproveAccessRequest-All?code="+PostApproveAccessRequestAll+"&idaccessrequest="+id+"&httpmethod="+httpmethod+"&system_code="+constantes.sysCode;
    var headers ={
      "apikey":constantes.apiKey
    }
    $.ajax({
        method: "POST",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function(data){
      jsonVisita = {"data":data}
      tableListVisitas();
      swal("Aprobada", "Proceso realizado con éxito.", "success");
      $("#modalShowRequestDetails").modal('hide');
    })
    .fail( function( jqXHR, textStatus, errorThrown ) {
      swal("Error!", "Se produjo un problema al momento de registrar", "error");
  });
  }


  var confirmCancelVisita =  function(){
    $('.btdetail').popover('hide');
    swal({
      title: "¿Deseas cancelar el ingreso?",
      text: "Una vez cancelado, se le notificará a los participantes.",
      type: "error",
      //type: "input",
      showCancelButton: true,
      confirmButtonClass: "btn-warning btn-sm btn-rounded",
      cancelButtonClass: "btn-danger btn-sm btn-rounded",
      confirmButtonText: "Cancelar",
      cancelButtonText: "No",
      closeOnConfirm: false,
      showLoaderOnConfirm: true
    },function(){

      cancelVisita();
    });
  }

  var cancelVisita = function(){
    var colaborador = getCookie("vtas_fullname"+sessionStorage.tabVisitasa);
    var id = $("#hid_row_id_visita").val();
    var httpmethod  = 'cancel';
    var url         = apiurlaccessrequest+"/api/Post-CancelAccessRequest?code="+PostCancelAccessRequest+"&idaccessrequest="+id+"&httpmethod="+httpmethod+"&system_code="+constantes.sysCode+"&colaborador="+colaborador;
    var headers ={
      "apikey":constantes.apiKey
    }
    $.ajax({
        method: "POST",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function(data){
      jsonVisita = {"data":data}
      tableListVisitas();

            swal.close();
            setTimeout(function(){
              swal({
                title: "Cancelada",
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

      $("#modalShowRequestDetails").modal('hide');
    }).fail( function( jqXHR, textStatus, errorThrown ) {
      swal("Error!", "Se produjo un problema al momento de registrar", "error");
  });;
  }


  var confirmFinalizeVisita =  function(){
    $('.btdetail').popover('hide');
    swal({
      title: "¿Deseas finalizar la visita?",
      text: "Una vez finalizado, se le notificará a la garita de seguridad.",
      type: "error",
      //type: "input",
      showCancelButton: true,
      confirmButtonClass: "btn-warning btn-sm btn-rounded",
      cancelButtonClass: "btn-danger btn-sm btn-rounded",
      confirmButtonText: "Finalizar",
      cancelButtonText: "No",
      closeOnConfirm: false,
      showLoaderOnConfirm: true
    },function(){

      finalizeVisita();
    });
  }

  var finalizeVisita = function(){
    var id = $("#hid_row_id_visita").val();
    var httpmethod  = 'finalize';
    var url         = apiurlaccessrequest+"/api/Post-FinalizeAccessRequest-All?code="+PostFinalizeAccessRequestAll+"&idaccessrequest="+id+"&httpmethod="+httpmethod+"&system_code="+constantes.sysCode;
    var headers ={
      "apikey":constantes.apiKey
    }
    $.ajax({
        method: "POST",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function(data){
      jsonVisita = {"data":data}
      tableListVisitas();


      swal.close();
            setTimeout(function(){
              swal({
                title: "Finalizada",
                text: "Proceso realizado con éxito.",
                type: "success",
                timer:2000,
                showCancelButton: false,
                confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
                confirmButtonText: "De acuerdo",
                closeOnConfirm: false
              });

            },500)

            $("#modalShowRequestDetails").modal('hide');
    })
    .fail( function( jqXHR, textStatus, errorThrown ) {
      swal("Error!", "Se produjo un problema al momento de registrar", "error");
  });
  }

  var confirmDenyVisita =  function(){
    $('.btdetail').popover('hide');
    $("#modalShowRequestDetails").modal('hide');


    swal({
      title: "Rechazar ingreso",
      text: "¿Desea rechazar el ingreso?",
      //type: "info",
      type: "input",
      showCancelButton: true,
      confirmButtonClass: "btn-warning btn-sm btn-rounded",
      cancelButtonClass: "btn-danger btn-sm btn-rounded",
      confirmButtonText: "Rechazar",
      cancelButtonText: "Cancelar",
      closeOnConfirm: false
    }
    ,function(value)
    {
      if(value.length==0)
      return;
      denyVisita(value);

    });
  }

  var denyVisita = function(razon){

    var colaborador = getCookie("vtas_fullname"+sessionStorage.tabVisitasa);
    var id = $("#hid_row_id_visita").val();
    var httpmethod  = 'deny';
    var url         = apiurlaccessrequest+"/api/Post-DenyAccessRequest?code="+PostDenyAccessRequest+"&idaccessrequest="+id+"&httpmethod="+httpmethod+"&system_code="+constantes.sysCode+"&razon="+razon+"&colaborador="+colaborador;
    var headers ={
      "apikey":constantes.apiKey
    }
    $.ajax({
        method: "POST",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function(data){
      jsonVisita = {"data":data}
      tableListVisitas();
      swal("Rechazada!", "Proceso realizado con éxito.", "success");
      $("#modalShowRequestDetails").modal('hide');
    })
    .fail( function( jqXHR, textStatus, errorThrown ) {
      swal("Error!", "Se produjo un problema al momento de registrar", "error");
  });;
  }


  var approveVisita = function(){
    var id = $("#hid_row_id_visita").val();
    var httpmethod  = 'approve';
    var url         = apiurlaccessrequest+"/api/Post-ApproveAccessRequest-All?code="+PostApproveAccessRequestAll+"&idaccessrequest="+id+"&httpmethod="+httpmethod+"&system_code="+constantes.sysCode;
    var headers ={
      "apikey":constantes.apiKey
    }
    $.ajax({
        method: "POST",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function(data){
      jsonVisita = {"data":data}
      tableListVisitas();
      swal("Aprobado!", "Proceso realizado con éxito.", "success");
      $("#modalShowRequestDetails").modal('hide');
    })
    .fail( function( jqXHR, textStatus, errorThrown ) {
      swal("Error!", "Se produjo un problema al momento de registrar", "error");
  });;
  }

  var initRegister = function(){

    /*alert("chb_status_list");
    $("#bt_add_row_vehiculo").click(function(){
      addRowTableVehiculo();
    });*/

  }
/*
  var loadjsonVisita = function(){
    var search_type = '1';
    var httpmethod  = 'objectlist';
    var url         = apiurlaccessrequest+"/api/Get-AccessRequestFull-All?code="+GetAccessRequestFullAll+"&search_type="+search_type+"&httpmethod="+httpmethod+"&system_code="+constantes.sysCode;
    var headers ={
        "apikey":constantes.apiKey
    }
    $.ajax({
        method: "POST",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function(data){
      jsonVisita = {"data":data}
      tableListVisitas();
    });
  }*/

  var reloadtableListVisita = function(){
    if(oTableVisita)
      oTableVisita.ajax.reload();
    else
      tableListVisitas();
  }

  var tableListVisitas = function(status){


    if(oTableVisita){
      oTableVisita.clear().draw();
      oTableVisita.destroy();
    }
    var startDate="";
    var endDate="";
    //verificamos el check activo
    if(!status)
      status      = $('input:radio[name=chb_status_list]:checked').val();


    var created_by = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
    var search_type = '1';
    var httpmethod  = 'objectlist';
    var url         = apiurlaccessrequest+"/api/Get-AccessRequestFull-All?code="+GetAccessRequestFullAll+"&search_type="+search_type+"&httpmethod="+httpmethod+"&system_code="+constantes.sysCode+"&id_status="+status+"&id_request_type="+TYPE_ACCESS_REQUEST+"&created_by="+created_by;
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
            req.map(function(item){
              $("#cant_transportista").html(item.quantityrequest.cant_transportista);
              $("#cant_contratista").html(item.quantityrequest.cant_contratista);
              $("#cant_proveedor").html(item.quantityrequest.cant_proveedor);
              $("#cant_visitante").html(item.quantityrequest.cant_visitante);
              $("#badgelistpenDatos").text(item.cant_status.cant_PendientePorDatos);
              $("#badgelistpenApro").text(item.cant_status.cant_PendientePorAprobacion);
              $("#badgelistpenProg").text(item.cant_status.cant_Programado);
              $("#badgelistpenProc").text(item.cant_status.cant_Progreso);
              $("#badgelistpenRecha").text(item.cant_status.cant_Rechazado);
              $("#badgelistpenAll").text(parseInt(item.cant_status.cant_Progreso)+parseInt(item.cant_status.cant_Programado)+parseInt(item.cant_status.cant_PendientePorAprobacion)+parseInt(item.cant_status.cant_PendientePorDatos)+parseInt(item.cant_status.cant_Rechazado));

              var id          = item.id;
              var accessTime  = moment(item.access_time).format('LT');
              var week        = moment(item.start_date).format('ddd');//dddd
              var month       = moment(item.start_date).format('MMMM');//
              var day         = moment(item.start_date).format('D');
              startDate   = week +" "+day +" de "+ month;

              var exitTime  = moment(item.exit_time).format('LT');
              var endweek     = moment(item.end_date).format('ddd');//dddd
              var endmonth    = moment(item.end_date).format('MMMM');//
              var endday      = moment(item.end_date).format('D');
              endDate     = endweek +" "+endday +" de "+ endmonth;


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
              if(item.status_id == 5){// rechazado
                statusColor ="text-danger";
              }

              var imgAutorizerPerson      = "";
              var authorizerPersons       = item.authorized_person?item.authorized_person:[];
              var externalcompany       = item.externalcompany?item.externalcompany:[];
              var lengthAuthorizerPerson  = authorizerPersons.length;
              var cant= lengthAuthorizerPerson;
              var iconPerson ='';
              var companyname=item.authorized_person?item.authorized_person[0].name_external_company:"-";
              var reason=item.status_id==5?item.rejection_reason:'';
              if(cant<=9 && cant>0)
                cant='0'+cant;
                //console.log(cant);
              if(lengthAuthorizerPerson>0){
                var nameParticiántes   = [];

                var i = 0;
                authorizerPersons.forEach(element => {
                  i++;
                  //console.log(i);
                  iconPerson+='<img class="m-1" src="images/iconos/persons.svg">';
                  nameParticiántes.push(toCapitalize(" "+element.first_mane+" "+element.last_name));
                });




                imgAutorizerPerson = '<div class="card border-0 h-0  m-0 bg-muted" style="box-shadow:0 0px 0px 0 rgba(0, 0, 0, 0.0), 0 0px 0px 0px rgba(0, 0, 0, 0), 0 0px 0px 0 rgba(0, 0, 0, 0)!important;">';
                imgAutorizerPerson+='<div class="card-body p-1"><div class="row col"><h4 class="border border-top-0 border-bottom-0 border-left-0">'+cant+'</h4><span class="card-title">';
                imgAutorizerPerson+=iconPerson;
                imgAutorizerPerson+='</span></div><span class="card-subtitle mb-2 text-muted d-inline-block text-truncate " style="max-width: 250px;">'+nameParticiántes.toString()+'</span> </div>'; //
                imgAutorizerPerson+='</div>';

              }
              var nameCompany=[];
              if(externalcompany.length>0){
                var nameParticiántes   = [];

                //console.log(externalcompany)

                var i = 0;
                externalcompany.forEach(element => {
                  i++;
                  //console.log(i);
                  nameCompany.push(toCapitalize(" "+element.business_name));
                });




               /*  imgAutorizerPerson = '<div class="card border-0 h-0  m-0 bg-muted" style="box-shadow:0 0px 0px 0 rgba(0, 0, 0, 0.0), 0 0px 0px 0px rgba(0, 0, 0, 0), 0 0px 0px 0 rgba(0, 0, 0, 0)!important;">';
                imgAutorizerPerson+='<div class="card-body p-1"><div class="row col"><h4 class="border border-top-0 border-bottom-0 border-left-0">'+cant+'</h4><span class="card-title">';
                imgAutorizerPerson+=iconPerson;
                imgAutorizerPerson+='</span></div><span class="card-subtitle mb-2 text-muted d-inline-block text-truncate " style="max-width: 250px;">'+nameParticiántes.toString()+'</span> </div>'; //
                imgAutorizerPerson+='</div>'; */

              }


              //se valida dias activos para ingreso
              var colL='badge-secondary';
              var colM='badge-secondary';
              var colMi='badge-secondary';
              var colJ='badge-secondary';
              var colV='badge-secondary';
              var colS='badge-secondary';
              var colD='badge-secondary';
              if(item.enabled_mon_day){colL='badge-success';}
              if(item.enabled_tues_day){colM='badge-success';}
              if(item.enabled_wednes_days){colMi='badge-success';}
              if(item.enabled_thurs_day){colJ='badge-success';}
              if(item.enabled_fri_days){colV='badge-success';}
              if(item.enabled_satur_day){colS='badge-success';}
              if(item.enabled_sun_day){colD='badge-success';}


              var row = {
                  number            : i//<img src="images/iconos/motivo.svg"></div>
                  ,startDate        : `<div  class="card border-0 h-0  m-0 bg-muted h6" style="width: auto; box-shadow:0 0px 0px 0 rgba(0, 0, 0, 0.0), 0 0px 0px 0px rgba(0, 0, 0, 0), 0 0px 0px 0 rgba(0, 0, 0, 0)!important;">
                                       <div class="card-body p-0"><span class="text-dark">Inicio: </span><span class="card-subtitle mb-2 text-success text-help font-weight-bold text-capitalize  "> ${startDate}</span><br>
                                       <span class="text-dark">Fin: </span><span class="card-subtitle mb-2 text-muted text-help font-weight-bold text-capitalize ">${endDate}</span> </div> </div>`

                  ,endDate          : `<div  class="card border-0 h-0  m-0 bg-muted h6" style="width: auto; box-shadow:0 0px 0px 0 rgba(0, 0, 0, 0.0), 0 0px 0px 0px rgba(0, 0, 0, 0), 0 0px 0px 0 rgba(0, 0, 0, 0)!important;">
                                      <div class="card-body p-0"><span class="text-dark">Ingreso: </span><span class="card-subtitle mb-2 text-success text-help font-weight-bold text-capitalize ">${accessTime}</span><br>
                                      <span class="text-dark">Salida: </span><span class="card-subtitle mb-2 text-muted text-help font-weight-bold text-capitalize ">${exitTime}</span><br>
                                      </div> </div>
                                      <span class="badge ${colL} h6" style="font-size:10px !important;height:16px !important;width:16px !important;">L</span>
                                      <span class="badge ${colM} h6" style="font-size:10px !important;height:16px !important;width:16px !important;">M</span>
                                      <span class="badge ${colMi} h6" style="font-size:10px !important;height:16px !important;width:16px !important;">M</span>
                                      <span class="badge ${colJ} h6" style="font-size:10px !important;height:16px !important;width:16px !important;">J</span>
                                      <span class="badge ${colV} h6" style="font-size:10px !important;height:16px !important;width:16px !important;">V</span>
                                      <span class="badge ${colS} h6" style="font-size:10px !important;height:16px !important;width:16px !important;">S</span>
                                      <span class="badge ${colD} h6" style="font-size:10px !important;height:16px !important;width:16px !important;">D</span>`
                                       //item.end_date
                  ,reason           : '<div data-toggle="modal" data-target="#modalShowRequestDetails" onclick="vw_access_request.viewVisita('+id+')" class="card border-0 h-0  m-0 bg-muted " style="cursor:pointer;box-shadow:0 0px 0px 0 rgba(0, 0, 0, 0.0), 0 0px 0px 0px rgba(0, 0, 0, 0), 0 0px 0px 0 rgba(0, 0, 0, 0)!important;"><div class="row" style="margin-left:-10px; margin-right:-10px;"> <div class="col-md-12"> <div class="card-body p-0 "><span class="card-title h6  hoverItem">'+toCapitalize(item.reason) +'</span><br><span class="card-subtitle mb-2 text-muted ">'+item.location_name+' - '+item.area_name+'</span> </div> </div></div> </div>' //
                  ,photoCollaborator: '<img src="images/1-thumb.png" alt="..." class="img-thumbnail rounded-circle" >'
                  ,collaboratorName : '<div class="media-body ml-3"><h6 class="mb-1 font-weight-semi-bold"><a class="text-dark " href="#">'+item.data_supervisor_contact+'</a></h6><p class="font-weight-semi-bold mb-0 text-500">'+item.email_responsible_contact+'</p></div>'
                  ,status           : '<i class="fa fa-circle '+statusColor+'"></i><label style="margin-left:15px" class="text-capitalize">'+item.status_name+'</label><br><small class="text-help text-warning pl-0 text-capitalize">'+reason+'</small>'
                  ,empresa           : '<div class="card border-0 h-0  m-0 bg-muted " style="cursor:pointer;box-shadow:0 0px 0px 0 rgba(0, 0, 0, 0.0), 0 0px 0px 0px rgba(0, 0, 0, 0), 0 0px 0px 0 rgba(0, 0, 0, 0)!important;"><div class="row"><div class="col-md-1 mt-0"> </div> <div class="col-md-11 "> <div class="card-body p-0 "><span class="card-title h6">'+nameCompany?toCapitalize(nameCompany.toString()):'-' +'</span> </div> </div></div> </div>' //
                  ,participant      : imgAutorizerPerson
                  ,detail           :'<div data-toggle="modal" data-target="#modalShowRequestDetails" onclick="vw_access_request.viewVisita('+id+')"><i class="material-icons btdetail" style="cursor:pointer " >more_vert</i></div>'//'<button type="button" class="btn btn-light btn-circle btdetail" id="'+id+'" ><i class="fa fa-ellipsis-v text-secondary"></i></button>'
                  ,createdDate      : item.created_date
                  //,detail           :'<i class="material-icons btdetail" style="cursor:pointer" id="'+id+'" data-status ="'+item.status_id+'">more_vert</i>'//'<button type="button" class="btn btn-light btn-circle btdetail" id="'+id+'" ><i class="fa fa-ellipsis-v text-secondary"></i></button>'
              }
              i++;
              data.push(row);
            });
          return data;
        }
      },
      columns: [
        //{ title:"#" ,data: "number",width: "2%", targets: 0 },
        { title:"Inicio y FIn",data: "startDate",align: "left", width: "18%"},
        { title:"Ingreso y Salida",data:"endDate",align: "left", width: "14%"},
        { title:"Motivo",data: "reason",align: "left" , width: "30%"},
        //{ title:" ",data: "photoCollaborator",width: "10%"},
        //{ title:"Colaborador", data:"collaboratorName",width: "25%"},
        { title:"Estatus",data: "status",align: "left", width: "20%"},
        { title:"Empresa",data: "empresa",align: "left", width: "15%"},
        { title:"Participantes",data: "participant",align: "left"},
        { title:"",data: "detail" , width: "1%"}
      ],createdRow: function( row, data, dataIndex){

          var fecha1 = moment(data.createdDate).add('hours',-5);
          var fecha2 =  moment();
          var duration = fecha2.diff(fecha1,'s');
          //var hours = duration.asSeconds();
          if (duration<=30) {
            //console.log(row);
            $(row).css("background","bisque");
            $(row).find('div').css("background","bisque");
          }
          //console.log( 'ahora:'+fecha2+" -  registro:"+fecha1+" diferencia:"+duration+" nombre:"+data.reason);

          //$(row).css("background":" rgba(0, 128, 0, 0.25)");
    },
    initComplete: function(settings, json) {
      //alert("culminó la carga");
      //$('[data-toggle="tooltip"]').tooltip();
    }
    });
  }

  var tableParticipante = function(){
    oTableParticipante = $('#tb_participante').DataTable({
        paging:   false,
        ordering: false,
        info:     false,
        searching:false,
        scrollY:'25vh',
        scrollCollapse: true
    });
  }

  var tableVehiculo = function(){
    oTableVehiculo = $('#tb_vehiculo').DataTable({
        paging:   false,
        ordering: false,
        info:     false,
        searching:false,
        scrollY:'25vh',
        scrollCollapse: true

    });
  }



  var addRowTableVehicle = function(){

    var i = $("#list_vehicle").find("div.bd-callout").length;//numero de filas
    i++;
    var html = ` `;
    $("#list_vehicle").append(html);
    $("#bt_delete_row_participante_"+i).click(function(){
      var id  = 'bd-callout_vehicle_'+i;
      var obj = $("#"+id);
      removeRowVehiclee(obj);
    });
  }

  var addRowTableVehiculo = function(){

    //obtemos información de la tabla
    var info      = oTableVehiculo.page.info();
    //-------
    //numero de filas
    var nro       = parseInt(info.recordsTotal)+1;
    //-------
    //obtenemos valores del formulario
    var placa     = $("#add_placa").val();
    var marca     = $("#add_marca").val();
    var modelo    = $("#add_modelo").val();
    var brevete   = $("#add_brevete").val();
    var categoria = $("#add_categoria").val();
    //----------
    //agregamos la fila
    oTableVehiculo.row.add([nro,placa,marca,modelo,brevete,categoria]).draw(true);
    //----------
  }

  var selectTypeRequest = function(val){

    $("#hid_type_access_request").val(val);
    handlerUrlhtml('contentGlobal','view/accessRequestRegister.html','accessRequestRegister');

    //alert($("#hid_type_access_request").val());
  }

  return{
    initList:function(tab,status){

      initList();
      if(tab)
      TYPE_ACCESS_REQUEST = tab;

      if(status)
      selectedFilterStatus(status)

      tableListVisitas(status);
      //oadjsonVisita();
    },

    initRegister:function(){
      initRegister();
    },
    reloadListVisita:function(){
      reloadtableListVisita();
    },
    confirmApproveVisita:function(){
      confirmApproveVisita();
    },
    confirmCancelVisita:function(){
      confirmCancelVisita();
    },

    confirmFinalizeVisita:function(){
      confirmFinalizeVisita();
    },

    confirmDenyVisita:function(){
      confirmDenyVisita();
    },
    selectTypeRequest: function(val){
      selectTypeRequest(val);
    },
    init: function(){
      init();
    },
    actEditVisita: function(){
      actEditVisita();
    }


  }
}();
var actEditVisita =  function(){
  $("#modal_show_request_details").css({"pointer-events":"all"});
  $("#bt_edit1_visita").hide();
  $("#bt_edit2_visita").fadeIn();
 }
var autoCompleteDate=function(id,idpaste)
{
  if(idpaste=='tx_time_end'){//hora d
    if($("#"+idpaste).val().trim().length==0){
      $("#"+idpaste).val($("#"+id).val());
    }
  }
  else{
    $("#"+idpaste).val($("#"+id).val());
  }
}
var calculateDayCheck=function(ids)
{
  var fecha=$("#"+ids).val().split('/');
  fecha=fecha[2]+'-'+fecha[1]+'-'+fecha[0];

  var numDay=new Date(fecha).getUTCDay();

  $("#ch_itinirary_lu").prop('checked', false);
  $("#ch_itinirary_ma").prop('checked', false);
  $("#ch_itinirary_mi").prop('checked', false);
  $("#ch_itinirary_ju").prop('checked', false);
  $("#ch_itinirary_vi").prop('checked', false);
  $("#ch_itinirary_sa").prop('checked', false);
  $("#ch_itinirary_do").prop('checked', false);
  setActiveCheck(null,'inactivar');



  if(numDay==1)
  {
    $("#ch_itinirary_lu").prop('checked', true);
    setActiveCheck('label_ch_itinirary_lu')
  }
  if(numDay==2)
  {
    $("#ch_itinirary_ma").prop('checked', true);
    setActiveCheck('label_sch_itinirary_ma')
  }
  if(numDay==3)
  {
    $("#ch_itinirary_mi").prop('checked', true);
    setActiveCheck('label_ch_itinirary_mi')
  }
  if(numDay==4)
  {
    $("#ch_itinirary_ju").prop('checked', true);
    setActiveCheck('label_ch_itinirary_ju')
  }
  if(numDay==5)
  {
    $("#ch_itinirary_vi").prop('checked', true);
    setActiveCheck('label_ch_itinirary_vi')
  }
  if(numDay==6)
  {
    $("#ch_itinirary_sa").prop('checked', true);
    setActiveCheck('label_ch_itinirary_sa')
  }
  if(numDay==0)
  {
    $("#ch_itinirary_do").prop('checked', true);
    setActiveCheck('label_ch_itinirary_do')
  }
}



var selectedTextType=function(val){
  $("#listType1")[0].className="text-muted text-decoration-none title-1";
  $("#listType2")[0].className="text-muted text-decoration-none title-1";
  $("#listType3")[0].className="text-muted text-decoration-none title-1";
  $("#listType4")[0].className="text-muted text-decoration-none title-1";
  if(val==3)
    $("#listType2")[0].className="title-1selected";
  else if(val==2)
    $("#listType3")[0].className="title-1selected";
  else
    $("#listType"+val)[0].className="title-1selected";
}




var statusmed=0;
var selectedFilterStatus=function(val){

  //$("#divfieldreposo").hide();


 // $("#divfieldreposo_history").hide();
  $("#sel_extend_reposo_history").val(0);


  if($("#label_status_list_1")[0])
  $("#label_status_list_1")[0].className="btn  tabInactive";
  if($("#label_status_list_2")[0])
  $("#label_status_list_2")[0].className="btn  tabInactive";
  if($("#label_status_list_3")[0])
  $("#label_status_list_3")[0].className="btn  tabInactive";
  if($("#label_status_list_4")[0])
  $("#label_status_list_4")[0].className="btn  tabInactive";
  if($("#label_status_list_4")[0])
  $("#label_status_list_5")[0].className="btn  tabInactive";
  if($("#label_status_list_6")[0])
  $("#label_status_list_6")[0].className="btn  tabInactive";
  if($("#label_status_list_7")[0])
  $("#label_status_list_7")[0].className="btn  tabInactive";
  if($("#label_status_list_8")[0])
  $("#label_status_list_8")[0].className="btn  tabInactive";
  if($("#label_altamedica_88")[0])
  $("#label_altamedica_88")[0].className="btn  tabInactive";
  if($("#label_altamedica_88_nop")[0])
  $("#label_altamedica_88_nop")[0].className="btn  tabInactive";
  if($("#label_altamedica_88_historial")[0])
  $("#label_altamedica_88_historial")[0].className="btn  tabInactive";
  if($("#label_status_list_9")[0])
  $("#label_status_list_9")[0].className="btn  tabInactive";
  if($("#label_status_list_10")[0])
  $("#label_status_list_10")[0].className="btn  tabInactive";
  if($("#label_status_list_9_history")[0])
  $("#label_status_list_9_history")[0].className="btn  tabInactive";
  if($("#label_status_list_10_history")[0])
  $("#label_status_list_10_history")[0].className="btn  tabInactive";

    if(val==1)
      $("#label_status_list_1")[0].className="btn tabInactive statusPperDatos text-white";
    else if(val==2)
      $("#label_status_list_2")[0].className="btn tabInactive statusPperAprove text-white";
    else if(val==3)
      $("#label_status_list_3")[0].className="btn tabInactive statusPperProg text-white";
    else if(val==4)
     $("#label_status_list_4")[0].className="btn tabInactive statusPperCourse text-white";
    else if(val==5)
     $("#label_status_list_5")[0].className="btn tabInactive bg-danger text-white";
    else if(val==5)
      $("#label_status_list_6")[0].className="btn tabInactive active";
      else if(val==7)
      {
      $("#label_status_list_7")[0].className="btn tabInactive statusPperCourse text-white";
      statusmed=0;
      $("#col_observacion_vetado").hide();

      }
      else if(val==8)
      {
        $("#label_status_list_8")[0].className="btn tabInactive bg-danger text-white";
        statusmed=1;
        $("#col_observacion_vetado").show();
        // $("#divfieldreposo").show();
        //-------------------------------------------------------------------------------------------------
        // verificamos si está vetado o está pendiente por alta para mostrar el select de días de extension de repos
        var covid_test          = $("#hid_covid_test_ext").val();
        var last_veto_status    = $("#hid_last_veto_status_ext").val();
        //alert(covid_test+" "+last_veto_status);
        $("#divfielExtensionReposo").hide();
        $("#divfielExtensionReposoHistory").hide();
        $("#txr_divfielExtensionReposo").hide();
        if(last_veto_status==1 ||covid_test ==8){ //vetado o Por alta médica
          if($('#modalRegisterCovidTestNewForm').is(':visible')){//programado
            $("#divfielExtensionReposo").show();
          }
          if($('#modalRegisterBlackCovidTest').is(':visible')){//no programado
            $("#txr_divfielExtensionReposo").show();
          }
          if($('#modalViewBlackCovidTest').is(':visible')){//editar
            $("#divfielExtensionReposoHistory").show();
          }
        }
        //-------------------------------------------------------------------------------------------------
      }
      else if(val==88)
      {

        $("#label_altamedica_88")[0].className="btn tabInactive statusPperProg text-white";
        statusmed=88;

      }

      else if(val==888)
      {
        $("#label_altamedica_88_nop")[0].className="btn tabInactive statusPperProg text-white";
        statusmed=88;

      }
      else if(val==8888)
      {
        $("#label_altamedica_88_historial")[0].className="btn tabInactive statusPperProg text-white";
        statusmed=88;

      }
      else if(val==9)
      {
      $("#label_status_list_9")[0].className="btn tabInactive statusPperCourse text-white";
      statusmed=0;
      $("#col_observacion_vetadonp").hide();
      }
      else if(val==10)
      {
      $("#label_status_list_10")[0].className="btn tabInactive bg-danger text-white";
      statusmed=1;
      $("#col_observacion_vetadonp").show();
      }

      else if(val==11)
      {
      $("#label_status_list_9_history")[0].className="btn tabInactive statusPperCourse text-white";
      statusmed=0;
      }
      else if(val==12)
      {
      $("#label_status_list_10_history")[0].className="btn tabInactive bg-danger text-white";
        statusmed=1;
        //$("#divfieldreposo_history").show();

        // verificamos si está vetado o está pendiente por alta para mostrar el select de días de extension de repos
        var covid_test          = $("#hid_covid_test_ext").val();
        var last_veto_status    = $("#hid_last_veto_status_ext").val();
        //alert(covid_test+" "+last_veto_status);
        $("#divfielExtensionReposo").hide();
        $("#divfielExtensionReposoHistory").hide();
        $("#txr_divfielExtensionReposo").hide();
        if(last_veto_status==1 ||covid_test ==8){ //vetado o Por alta médica
          if($('#modalRegisterCovidTestNewForm').is(':visible')){//programado
            $("#divfielExtensionReposo").show();
          }
          if($('#modalRegisterBlackCovidTest').is(':visible')){//no programado
            $("#txr_divfielExtensionReposo").show();
          }
          if($('#modalViewBlackCovidTest').is(':visible')){//editar
            $("#divfielExtensionReposoHistory").show();
          }
        }
      }
}
function getBase64Image(img) {
  var canvas = document.createElement("canvas");

  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");

  ctx.drawImage(img, 0, 0);

  var dataURL = canvas.toDataURL("image/jpeg");

  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

 }
var exportPdfAlta=function()
{
  var date_init = $("#tx_date_init_pdf").val();
  var date_end  = $("#tx_date_end_pdf").val();
  var cmp =  getCookie("vtas_health_code_cmp"+sessionStorage.tabVisitasa);
  //alert(cmp);

  var momentoActual = new Date();
  momentoActual = "Lima, "+moment(momentoActual).format('D [de] MMMM [del] YYYY');

  var momentoActual1 = new Date();
  momentoActual1 =  moment(momentoActual1).format("DD/MM/YYYY");

    var doc = new jsPDF();

    doc.setFont("courier");
    doc.setFontType("normal");
    //doc.setFont("helvetica");
    //doc.setFontType("bold");
    doc.setFont("times");
    doc.setFontSize(11);
   // doc.setFontType("italic");
    //(left,top)
    var doc = new jsPDF('p','mm','letter');


    doc.setFontSize(14);
    doc.setTextColor(89,90,97);
    if(logoPdf)
    doc.addImage(logoPdf,'PNG',80,10,50,30);// EJE X,Y,WIDTH,HEIGHT
    doc.setFontType("bold");
    doc.text(82, 60, 'Constancia de Alta',{maxWidth: 200,align: "center"});
    doc.setFontType("normal");
    //doc.text( 10,10,'Lorem ipsum dolor sit amet, consetetur abore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', {maxWidth: 185, align: "justify"});
    //doc.text('Lorem ipsum dolor sit amet, consetetur abore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet', 10, 90,{maxWidth: 185, align: 'center'});
    //doc.save("justify.pdf");
    //----------------AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    //doc.text(20, 90, `                                               `);

    var pageStart = 40;
    var step      = 10;
    var line      = 90;
    var marginX   = 20;
    var text      = "";

    var date14 = moment(lastattentiondate).add(14,"day").format('DD/MM/YYYY');

    text+=`Por la presente se deja constancia que, ${$('#tx_nomape').val()} `;
    text+=`identificado con Documento de Identidad: ${$('#tx_docum').val()} realizó aislamiento social, obteniendo `;
    text+=`resultado positivo en la prueba serológica luego de haber pasado perfil `;
    text+=`COVID-19 en nuestra institución. Este periodo está comprendido entre el `;
    text+=`${date_init} al ${date_end}, quien ha evolucionado favorablemente.`;
    //text+=`la presente a solicitud del interesado para los fines que crea convenientes. `;

    var splitTitle = doc.splitTextToSize(text, 183);
    for (var i = 0; i < splitTitle.length; i++) {
      doc.text(splitTitle[i], marginX, line,{maxWidth: 183,align: "justify"});
      if (line >= 275) {
        doc.addPage();
        line = pageStart;
        }
      line += step;
    }
    doc.text(20, line, `Se expide la presente a solicitud del interesado para los fines que crea `);
    doc.text(20, line+10, `convenientes.`);
    doc.text(140, line+40, `${toCapitalize(momentoActual)}`,{align: "right"});

    doc.setFontSize(10);
    if(imgSignatureglobalper)
    doc.addImage(imgSignatureglobalper,'PNG',80,line+45,50,30);// EJE X,Y,WIDTH,HEIGHT
    var text1 = "CMP:"+cmp;
    var text2 = "cargo";
    var text3 = "S.G. Natclar S.A.C";

    var textWidth1   = doc.getStringUnitWidth(text1) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    var textOffset1  = (doc.internal.pageSize.width - textWidth1) / 2;
    doc.text(textOffset1, line+80, text1);

    var textWidth2   = doc.getStringUnitWidth(text2) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    var textOffset2  = (doc.internal.pageSize.width - textWidth2) / 2;
    doc.text(textOffset2, line+85, text2);

    var textWidth3   = doc.getStringUnitWidth(text3) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    var textOffset3  = (doc.internal.pageSize.width - textWidth3) / 2;
    doc.text(textOffset3, line+90, text3);

    doc.save('documento.pdf');
    $("#modalSelectDateAltaMedica").modal("hide");
}

var exportPdfAltaNop=function()
{
  var date_init = $("#tx_date_init_pdf").val();
  var date_end  = $("#tx_date_end_pdf").val();
  var cmp =  getCookie("vtas_health_code_cmp"+sessionStorage.tabVisitasa);

 var momentoActual = new Date();
  momentoActual = "Lima, "+moment(momentoActual).format('D [de] MMMM [del] YYYY');

  var momentoActual1 = new Date();
  momentoActual1 =  moment(momentoActual1).format("DD/MM/YYYY");

    var doc = new jsPDF();

    doc.setFont("courier");
    doc.setFontType("normal");
    //doc.setFont("helvetica");
    //doc.setFontType("bold");
    doc.setFont("times");
    doc.setFontSize(11);
    // doc.setFontType("italic");
    //(left,top)
    var doc = new jsPDF('p','mm','letter');

    doc.setFontSize(14);
    doc.setTextColor(89,90,97);
    doc.addImage(logoPdf,'PNG',80,10,50,30);// EJE X,Y,WIDTH,HEIGHT
    doc.setFontType("bold");
    doc.text(82, 60, 'Constancia de Alta',{maxWidth: 200,align: "center"});
    doc.setFontType("normal");
    //doc.text( 10,10,'Lorem ipsum dolor sit amet, consetetur abore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', {maxWidth: 185, align: "justify"});
    //doc.text('Lorem ipsum dolor sit amet, consetetur abore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet', 10, 90,{maxWidth: 185, align: 'center'});
    //doc.save("justify.pdf");
    //----------------AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    //doc.text(20, 90, `                                               `);

    var pageStart = 40;
    var step      = 10;
    var line      = 90;
    var marginX   = 20;
    var text      = "";

    var date14 = moment(lastattentiondate).add(14,"day").format('DD/MM/YYYY');
    text+=`Por la presente se deja constancia que, ${$('#txr_nomape').val()} `;
    text+=`identificado con Documento de Identidad: ${$('#txr_docum').val()} realizó aislamiento social, obteniendo `;
    text+=`resultado positivo en la prueba serológica luego de haber pasado perfil `;
    text+=`COVID-19 en nuestra institución. Este periodo está comprendido entre el `;
    text+=`${date_init} al ${date_end}, quien ha evolucionado favorablemente.`;
    //text+=` `;

    var splitTitle = doc.splitTextToSize(text, 183);
    for (var i = 0; i < splitTitle.length; i++) {
      doc.text(splitTitle[i], marginX, line,{maxWidth: 183,align: "justify"});
      if (line >= 275) {
        doc.addPage();
        line = pageStart;
        }
      line += step;
    }
    doc.text(20, line, `Se expide la presente a solicitud del interesado para los fines que crea `);
    doc.text(20, line+10, `convenientes.`);
    doc.text(140, line+40, `${toCapitalize(momentoActual)}`,{align: "right"});

    doc.setFontSize(10);
    console.log(imgSignatureglobalper)
    if(imgSignatureglobalper)
    doc.addImage(imgSignatureglobalper,'PNG',80,line+45,50,30);// EJE X,Y,WIDTH,HEIGHT
    var text1 = "CMP:"+cmp;
    var text2 = "cargo";
    var text3 = "S.G. Natclar S.A.C";

    var textWidth1   = doc.getStringUnitWidth(text1) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    var textOffset1  = (doc.internal.pageSize.width - textWidth1) / 2;
    doc.text(textOffset1, line+80, text1);

    var textWidth2   = doc.getStringUnitWidth(text2) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    var textOffset2  = (doc.internal.pageSize.width - textWidth2) / 2;
    doc.text(textOffset2, line+85, text2);

    var textWidth3   = doc.getStringUnitWidth(text3) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    var textOffset3  = (doc.internal.pageSize.width - textWidth3) / 2;
    doc.text(textOffset3, line+90, text3);

    doc.save('documento.pdf');
    $("#modalSelectDateAltaMedica").modal("hide");
}

var exportPdfAltaHistorial=function()
{
  var date_init = $("#tx_date_init_pdf").val();
  var date_end  = $("#tx_date_end_pdf").val();
  var cmp =  getCookie("vtas_health_code_cmp"+sessionStorage.tabVisitasa);

  var momentoActual = new Date();
  momentoActual = "Lima, "+moment(momentoActual).format('D [de] MMMM [del] YYYY');

  var momentoActual1 = new Date();
  momentoActual1 =  moment(momentoActual1).format("DD/MM/YYYY");

    var doc = new jsPDF();

    doc.setFont("courier");
    doc.setFontType("normal");
    //doc.setFont("helvetica");
    //doc.setFontType("bold");
    doc.setFont("times");
    doc.setFontSize(11);
   // doc.setFontType("italic");
    //(left,top)
    var doc = new jsPDF('p','mm','letter');


    doc.setFontSize(14);
    doc.setTextColor(89,90,97);
    doc.addImage(logoPdf,'PNG',80,10,50,30);// EJE X,Y,WIDTH,HEIGHT
    doc.setFontType("bold");
    doc.text(82, 60, 'Constancia de Alta',{maxWidth: 200,align: "center"});
    doc.setFontType("normal");
    //doc.text( 10,10,'Lorem ipsum dolor sit amet, consetetur abore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', {maxWidth: 185, align: "justify"});
    //doc.text('Lorem ipsum dolor sit amet, consetetur abore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet', 10, 90,{maxWidth: 185, align: 'center'});
    //doc.save("justify.pdf");
    //----------------AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    //doc.text(20, 90, `                                               `);

    var pageStart = 40;
    var step      = 10;
    var line      = 90;
    var marginX   = 20;
    var text      = "";

    var date14 = moment(lastattentiondate).add(14,"day").format('DD/MM/YYYY');

    text+=`Por la presente se deja constancia que, ${$('#txr_nomape_history').val()} `;
    text+=`identificado con Documento de Identidad: ${$('#txr_docum_history').val()} realizó aislamiento social, obteniendo `;
    text+=`resultado positivo en la prueba serológica luego de haber pasado perfil `;
    text+=`COVID-19 en nuestra institución. Este periodo está comprendido entre el `;
    text+=`${date_init} al ${date_end}, quien ha evolucionado favorablemente.`;
    //text+=`la presente a solicitud del interesado para los fines que crea conveniente. `;
    var splitTitle = doc.splitTextToSize(text, 183);
    for (var i = 0; i < splitTitle.length; i++) {
      doc.text(splitTitle[i], marginX, line,{maxWidth: 183,align: "justify"});
      if (line >= 275) {
        doc.addPage();
        line = pageStart;
        }
      line += step;
    }
    doc.text(20, line, `Se expide la presente a solicitud del interesado para los fines que crea `);
    doc.text(20, line+10, `convenientes.`);
    doc.text(140, line+40, `${toCapitalize(momentoActual)}`,{align: "right"});

    doc.setFontSize(10);
    console.log(imgSignatureglobalper)
    if(imgSignatureglobalper)
    doc.addImage(imgSignatureglobalper,'PNG',80,line+45,50,30);// EJE X,Y,WIDTH,HEIGHT
    var text1 = "CMP:"+cmp;
    var text2 = "cargo";
    var text3 = "S.G. Natclar S.A.C";

    var textWidth1   = doc.getStringUnitWidth(text1) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    var textOffset1  = (doc.internal.pageSize.width - textWidth1) / 2;
    doc.text(textOffset1, line+80, text1);

    var textWidth2   = doc.getStringUnitWidth(text2) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    var textOffset2  = (doc.internal.pageSize.width - textWidth2) / 2;
    doc.text(textOffset2, line+85, text2);

    var textWidth3   = doc.getStringUnitWidth(text3) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    var textOffset3  = (doc.internal.pageSize.width - textWidth3) / 2;
    doc.text(textOffset3, line+90, text3);
    doc.save('documento.pdf');
    $("#modalSelectDateAltaMedica").modal("hide");
}

var exportPdfAltaBottonHistorial=function(document,nombre,attention_date,date_end_alatmedica_pdf,date_ini_alatmedica_pdf,health_code_cmp)
{
  var momentoActual = new Date();
  momentoActual = "Lima, "+moment(momentoActual).format('D [de] MMMM [del] YYYY');

  var momentoActual1 = new Date();
  momentoActual1 =  moment(momentoActual1).format("DD/MM/YYYY");
  console.log(date_ini_alatmedica_pdf,date_end_alatmedica_pdf,health_code_cmp);
  var date_init = date_ini_alatmedica_pdf!=null && date_ini_alatmedica_pdf!='null'?date_ini_alatmedica_pdf:new Date();
  var date_end  = date_end_alatmedica_pdf!=null && date_end_alatmedica_pdf!='null' ?date_end_alatmedica_pdf:new Date();
  health_code_cmp = health_code_cmp!=null && health_code_cmp!='null'?health_code_cmp:"";
  date_init =  moment(date_init).format("DD/MM/YYYY");
  date_end  =  moment(date_end).format("DD/MM/YYYY");
    var doc = new jsPDF();

    doc.setFont("courier");
    doc.setFontType("normal");
    //doc.setFont("helvetica");
    //doc.setFontType("bold");
    doc.setFont("times");
    doc.setFontSize(11);
   // doc.setFontType("italic");
    //(left,top)
    var doc = new jsPDF('p','mm','letter');


    doc.setFontSize(14);
    doc.setTextColor(89,90,97);
    doc.addImage(logoPdf,'PNG',80,10,50,30);// EJE X,Y,WIDTH,HEIGHT
    doc.setFontType("bold");
    doc.text(82, 60, 'Constancia de Alta',{maxWidth: 200,align: "center"});
    doc.setFontType("normal");
    //doc.text( 10,10,'Lorem ipsum dolor sit amet, consetetur abore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', {maxWidth: 185, align: "justify"});
    //doc.text('Lorem ipsum dolor sit amet, consetetur abore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet', 10, 90,{maxWidth: 185, align: 'center'});
    //doc.save("justify.pdf");
    //----------------AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    //doc.text(20, 90, `                                               `);

    var pageStart = 40;
    var step      = 10;
    var line      = 90;
    var marginX   = 20;
    var text      = "";

    var date14 = moment(attention_date).add(14,"day").format('DD/MM/YYYY');


    text+=`Por la presente se deja constancia que, ${nombre} `;
    text+=`identificado con Documento de Identidad: ${document} realizó aislamiento social, obteniendo `;
    text+=`resultado positivo en la prueba serológica luego de haber pasado perfil `;
    text+=`COVID-19 en nuestra institución. Este periodo está comprendido entre el `;
    text+=`${date_init} al ${date_end}, quien ha evolucionado favorablemente.`;

    var splitTitle = doc.splitTextToSize(text, 183);
    for (var i = 0; i < splitTitle.length; i++) {
      doc.text(splitTitle[i], marginX, line,{maxWidth: 183,align: "justify"});
      if (line >= 275) {
        doc.addPage();
        line = pageStart;
        }
      line += step;
    }
    doc.text(20, line, `Se expide la presente a solicitud del interesado para los fines que crea `);
    doc.text(20, line+10, `conveniente.`);
    doc.text(140, line+40, `${toCapitalize(momentoActual)}`,{align: "right"});

    doc.setFontSize(10);
    console.log(imgSignatureglobalper)
    if(imgSignatureglobalper)
    doc.addImage(imgSignatureglobalper,'PNG',80,line+45,50,30);// EJE X,Y,WIDTH,HEIGHT
    var text1 = "CMP:"+health_code_cmp;
    var text2 = "cargo";
    var text3 = "S.G. Natclar S.A.C";

    var textWidth1   = doc.getStringUnitWidth(text1) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    var textOffset1  = (doc.internal.pageSize.width - textWidth1) / 2;
    doc.text(textOffset1, line+80, text1);

    var textWidth2   = doc.getStringUnitWidth(text2) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    var textOffset2  = (doc.internal.pageSize.width - textWidth2) / 2;
    doc.text(textOffset2, line+85, text2);

    var textWidth3   = doc.getStringUnitWidth(text3) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    var textOffset3  = (doc.internal.pageSize.width - textWidth3) / 2;
    doc.text(textOffset3, line+90, text3);

    doc.save('documento.pdf');
}

var setTitleModule=function(title)
{

  $("#titleModule").text(title);
}

var accceptLocations=function()
{

  var flag=0;
  var validatefield="";



      if($("#listSedeSelectedUSer").val()==0)
      {flag=1;     validatefield= "Debe ingresar "+"Sede";       }
      else if($("#listGaritaSelectedUSer").val()==0 && (getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_GARITA" || getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_SEGURIDAD" || getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_COVIDSEGURIDAD"))
      {flag=1;     validatefield= "Debe ingresar "+"Garita";       }
      else if($("#documentSecuryin").val()=="" && (getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_GARITA" || getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_SEGURIDAD" || getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_COVIDSEGURIDAD"))
      {flag=1;     validatefield= "Debe ingresar "+"Documento";       }


      if(flag==1)
      {
        swal({
          title: "Campos vacios",
          text: validatefield,
          timer: 4000,
          type: "error",
          showConfirmButton: true
          });
        return;
      }

         var data = {

          user_id: getCookie("vtas_id_hash"+sessionStorage.tabVisitasa)
          ,sede:$("#listSedeSelectedUSer").val()
          ,garita:$("#listGaritaSelectedUSer").val()
          ,document:$("#documentSecuryin").val()
        }


              var option ="setlocations";
             showLoading();
/*
             swal({
              title: "Procesando...",
              text: "Por favor espere.",
              //timer: 3000,
              type: "info",
              showConfirmButton: false
              }); */

                var url = apiurlaccessrequest+"/api/Post-Locations-All?code="+PostLocationsAll+"&httpmethod="+option;
                var headers ={
                    "apikey":"r$3#23516ewew5"
                }
                $.ajax({
                    method: "POST",
                    url:  url,
                    headers:headers,
                    data : JSON.stringify(data),
                    crossDomain: true,
                    dataType: "json",
                }).done(function( data)
                {
                  hideLoading();

                  swal.close();



                        $("#modalSelectSede").modal("hide");

                        setCookie("vtas_garita"+sessionStorage.tabVisitasa, $("#listGaritaSelectedUSer").val(), 365);
                        setCookie("vtas_sede"+sessionStorage.tabVisitasa, $("#listSedeSelectedUSer").val(), 365);
                        setCookie("vtas_sedecomp"+sessionStorage.tabVisitasa, $("#listSedeSelectedUSer").val()+'-'+$("#listSedeSelectedUSer  option:selected").text(), 365);

                       /*  if($("#sel_sede")[0])
                        $("#sel_sede").val(getCookie("vtas_sedecomp")); */



                }).fail( function( jqXHR, textStatus, errorThrown ) {
                  hideLoading();
                  swal({
                    title: "Error",
                    text: "Ha ocurrido un error.",
                    type: "error",
                    timer:3000,
                    showCancelButton: false,
                    confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
                    confirmButtonText: "De acuerdo",
                    closeOnConfirm: true
                  });

                });

}


setInterval(() => {

  var param = {
    "client_id": "370d607d-5650-41fb-aa5f-644254136dab",
    "client_secret": "c1M7qP.s@]s-84BA5bgVG.W1:=h=QVsr",
    "scope": "https://graph.microsoft.com/.default",
    "grant_type": "client_credentials"
  }
  $.ajax({
      data: JSON.stringify(param),
      type: "post",
      async: true,
      processData:false,
      crossDomain : true,
      contentType : "application/json;charset=UTF-8",
      dataType: "json",
      url: apiurlsecurity+"/api/AuthClientCredentials?code="+AuthClientCredentials+""
  })
  .done(function( data, textStatus, jqXHR )
  {
      TOKEN_CLIENT = data.access_token;
  })
  .fail(function( jqXHR, textStatus, errorThrown ) {
      console.log();
  });

}, 600000);

function showNotification(message)
{
  $("#alerNotifications").fadeIn();
$("#messageNotifications").text(message)
  setTimeout(function(){

    $("#alerNotifications").fadeOut()
  },4000)
}


function vistaAuditor(bb){
      //handlerUrlhtml('contentGlobal','view/accessRequestRegister.html','accessRequestRegister');
      id_auditoria = bb;
      handlerUrlhtml('contentGlobal','view/auditoria/auditorList.html','Lista de Auditores');

      //$('body').materializeInputs();
}

function vistaAuditorias(a,b,c){


  //handlerUrlhtml('contentGlobal','view/accessRequestRegister.html','accessRequestRegister');
  //alert("a=" +a+ ", b=" + b + ", c ="+ c );
  id_programa_auditoria = a;
  id_codigo_especialidad_programa = c;//jesus pasalo
  nombre_programa_auditoria = b;
  handlerUrlhtml('contentGlobal','view/auditoria/auditoriaList.html','Ingreso de Auditorías - '+nombre_programa_auditoria);
  //$('body').materializeInputs();
}

function vistaEvaluarAuditorias(a,b,c){

  id_programa_auditoria = a;
  id_codigo_especialidad_programa = c;//jesus pasalo
  nombre_programa_auditoria = b;
  handlerUrlhtml('contentGlobal','view/auditoria/auditoriasListEvaluacion.html','Ingreso de Auditorías - '+nombre_programa_auditoria);
  //$('body').materializeInputs();
}

function  fnSp3AdministrarHallazgos()
{

  $('#modalShowpersonBlack').modal('hide');
  handlerUrlhtml('contentGlobal','view/auditoria/AdministrarHallazgos.html',' Hallazgos ');
}

function fnSp3EvaluacionAuditores()
{

  $('#modalShowpersonBlack').modal('hide');
  handlerUrlhtml('contentGlobal','view/auditoria/evaluarAuditor.html',' Evaluación de Auditores ');
}


function programaAuditoria()
{
  //handlerUrlhtml('contentGlobal','view/menu/externalAccessRequestList.html','externalAccessRequestList');
  //$('#modalShowpersonBlack').modal('hide');
  //$("body").removeClass('modal-open');
  $('#modalShowpersonBlack').modal('hide');
  handlerUrlhtml('contentGlobal','view/auditoria/registrarProgramaAuditoria.dev.html','Programa de Auditoría');
}

function evaluaProgramaAuditoria()
{
  //handlerUrlhtml('contentGlobal','view/menu/externalAccessRequestList.html','externalAccessRequestList');
  //$('#modalShowpersonBlack').modal('hide');
  //$("body").removeClass('modal-open');
  $('#modalShowpersonBlack').modal('hide');



  handlerUrlhtml('contentGlobal','view/auditoria/evaluacionProgramaAuditoria.html','Evaluar Programa de Auditoría');
}



function seguimientoAuditoria()
{
  //handlerUrlhtml('contentGlobal','view/menu/externalAccessRequestList.html','externalAccessRequestList');
  //$('#modalShowpersonBlack').modal('hide');
  //$("body").removeClass('modal-open');
  $('#modalShowpersonBlack').modal('hide');
  handlerUrlhtml('contentGlobal','view/auditoria/seguimientoAuditoria.html','Programa de Auditoría');
}











function closexMenuResponsableAuditoria()
{
  var divx = document.getElementById("emergenteDivMenuResponsableAuditorias");
      divx.style.zIndex = "0";
      divx.style.visibility = "hidden";
}


function showxMenuResponsableAuditoria()
{
    var divx = document.getElementById("emergenteDivMenuResponsableAuditorias");
    divx.style.zIndex = "10000";
    divx.style.visibility='visible';
}

function closexMenuGestAudi()
{
  var divx = document.getElementById("emergenteDivMenu");
      divx.style.zIndex = "0";
      divx.style.visibility = "hidden";
}
function showxMenuGestAudi()
{
  //alert(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa));
  let esLider = getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa);

  //console.log("############################### menu plan de auditoria ####################################",esLider,'##############')

      if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa) == 'ROL_LIDERAUDITORIA')
      {

        showxMenuAuditorLider();
        //alert("tratamos de centrar el menu ");


      }
      else
      {

        var divx = document.getElementById("emergenteDivMenu");
        divx.style.zIndex = "10000";
        divx.style.visibility='visible';
        if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa) == 'ROL_COORDINADORAUDITORIA')
        {
          
            $("#divModuloIndicadores").css("display", "block")
            $("#divModuloAuditorLider").css("display", "block")
            $("#divModuloListadoAsistentes").css("display", "block")
        }
      }



}

function setStorage(nombre,data,type) {

  if(type == 'json'){
    localStorage.setItem(nombre,JSON.stringify(data))
  }else if(type == 'text'){
    localStorage.setItem(nombre,data)
  }else{
    console.log('... error al momento de setear el storage')
  }

}

///////////////// @jesus
function closexMenuAuditorLider()
{
  var divx = document.getElementById("emergenteDivMenuAuditorLider");
      divx.style.zIndex = "0";
      divx.style.visibility = "hidden";
}
function showxMenuAuditorLider()
{
  var divx = document.getElementById("emergenteDivMenuAuditorLider");
  divx.style.zIndex = "10000";
  divx.style.visibility='visible';
  divx.style.display = 'block';
}

function listadoAsistentes()
{
  //handlerUrlhtml('contentGlobal','view/menu/externalAccessRequestList.html','externalAccessRequestList');
  //$('#modalShowpersonBlack').modal('hide');
  //$("body").removeClass('modal-open');
  $('#modalShowpersonBlack').modal('hide');
  handlerUrlhtml('contentGlobal','view/auditoria/listadoAsistentes.html','Listado de Asistentes');
}

function listadoAuditoriaLider()
{
  //handlerUrlhtml('contentGlobal','view/menu/externalAccessRequestList.html','externalAccessRequestList');
  //$('#modalShowpersonBlack').modal('hide');
  //$("body").removeClass('modal-open');
  $('#modalShowpersonBlack').modal('hide');
  handlerUrlhtml('contentGlobal','view/auditoria/auditoriaListLiderPlan.html','Auditoría de Lider');
}
///////////////// @jesus


//------------------------------SPRINT3 @caracas1348 andy -------------------------------------
function closexMenuConfiguraciones()
{

  var divx = document.getElementById("emergenteDivMenu1");
      divx.style.zIndex = "0";
      divx.style.visibility = "hidden";
}
function showxMenuConfiguraciones()
{

  // var divx = document.getElementById("emergenteDivMenuConfiguraciones");

  // alert(divx);
  // divx.style.zIndex = "10001";
  // divx.style.visibility='visible';
  // divx.style.display = 'block';
  /* vistaAuditor();*/

  var divx = document.getElementById("emergenteDivMenu1");
  divx.style.zIndex = "10000";
  divx.style.visibility='visible';
}




function closexMenuAccionesCorrectivas()
{

  var divx = document.getElementById("emergenteDivMenu2");
      divx.style.zIndex = "0";
      divx.style.visibility = "hidden";
}
function showxMenuAccionesCorrectivas()
{

  // var divx = document.getElementById("emergenteDivMenuConfiguraciones");

  // alert(divx);
  // divx.style.zIndex = "10001";
  // divx.style.visibility='visible';
  // divx.style.display = 'block';
  /* vistaAuditor();*/

  var divx = document.getElementById("emergenteDivMenu2");
  divx.style.zIndex = "10000";
  divx.style.visibility='visible';
}


//------------------------------SPRINT3 @caracas1348 andy -------------------------------------


//------------------------------SPRINT4 @millanqjesus start -------------------------------------

// Mostramos la modal para el Resposable de hallazgos asignados
function showxMenuRolResponsableAsignado()
{
    //$('#emergenteDivMenuRolResponsableAsignado').modal('show').addClass('fade');
    var divx = document.getElementById("emergenteDivMenuRolResponsableAsignado");
    divx.style.zIndex = "10000";
    divx.style.visibility='visible';
}

// Ocultamos la modal para el Resposable de hallazgos asignados
function closexMenuRolResponsableAsignado()
{
    //$("#emergenteDivMenuRolResponsableAsignado").removeClass("fade").modal("hide");
    var divx = document.getElementById("emergenteDivMenuRolResponsableAsignado");
    divx.style.zIndex = "0";
    divx.style.visibility = "hidden";
}

// Redirecionamos a Hallazgos Asignados
function fnSp4AtencionHallazgos()
{
    //cerramos modal de menu
    closexMenuRolResponsableAsignado();

    //console.log("vtas_sede:",getCookie("vtas_sede"+sessionStorage.tabVisitasa))
    // Redirecionamos a la pagina de Atencion de Hallazgos Asignados
    handlerUrlhtml('contentGlobal','view/auditoria/hallazgosAsignados/hallazgosAsignados.html','Hallazgos Asignados');
}

// Redirecionamos a Seguimiento de Acciones Correctivas
function fnSp4SeguimientoAccionesCorrectivas()
{
    //cerramos modal de menu
    closexMenuRolResponsableAsignado();
    // Redirecionamos a la pagina de Seguimiento de Acciones Correctivas
    handlerUrlhtml('contentGlobal','view/auditoria/seguimientoAC/seguimientoAC.html',' Seguimiento de Acciones Correctivas ');
}
//------------------------------SPRINT4 @millanqjesus end -------------------------------------


//------------------------------SPRINT5 @millanqjesus START -------------------------------------
// Mostramos la modal para el EVALUADOR LOCAL DE LAS ACCIONES CORRECTIVAS (PARA EL ROL: ROL_EVALUADORLOCAL_AC)
function showxMenuRolEvaluadorLocalAC()
{
    //$('#emergenteDivMenuRolEvaluadorLocalAC').modal('show').addClass('fade');
    var divx = document.getElementById("emergenteDivMenuRolEvaluadorLocalAC");
    divx.style.zIndex = "10000";
    divx.style.visibility='visible';
}

// Ocultamos la modal para el Resposable de hallazgos asignados
function closexMenuRolEvaluadorLocalAC()
{
    //$("#emergenteDivMenuRolEvaluadorLocalAC").modal("hide").removeClass("fade");
    let divx = document.getElementById("emergenteDivMenuRolEvaluadorLocalAC");
    divx.style.zIndex = "0";
    divx.style.visibility = "hidden";
}


function showxMenuRolResponsableAsignadoAC()
{
    //alert("aqui vamos en showxMenuRolResponsableAsignadoAC ")
    //$('#emergenteDivMenuRolResponsableAsignadoAC').modal('show').addClass('fade')
    let divx = document.getElementById("emergenteDivMenuRolResponsableAsignadoAC");
    //var divx = document.getElementById("emergenteDivMenu");
    divx.style.zIndex = "10000";
    divx.style.visibility='visible';
    divx.style.display = 'block';
}

function closexMenuRolResponsableAsignadoAC()
{
    let divx = document.getElementById("emergenteDivMenuRolResponsableAsignadoAC");
    divx.style.zIndex = "0";
    divx.style.visibility = "hidden";
}
//------------------------------SPRINT5 @millanqjesus END -------------------------------------



//------------------------------SPRINT6 @millanqjesus START -------------------------------------
/**
 * [openIndicadores ABRIR PESTAÑA EN EL NAVEGADOR CON EL INFORME DE INDICADORES EN POWERBI]
 * @param  {[type]} url [URL DEL INFORME A MOSTRAR]
 * @return {[type]}     [description]
 */
var openIndicadores = function(url)
{
    // Abrir nuevo tab
    let win = window.open(url, '_blank');
    // Cambiar el foco al nuevo tab (punto opcional)
    win.focus();
}
//------------------------------SPRINT6 @millanqjesus END -------------------------------------




function showMenuValidateIperc()
{
  let profile = getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa);
  var divx = document.getElementById("emergenteDivMenuValidadorIperc");
  if(profile=="ROL_VALIDADORIPERC"){
    $("#titleEvaluar").text("Evaluar IPERC")
  }else{
    $("#titleEvaluar").text("Gestion IPERC")
  }
  divx.style.zIndex = "10000";
  divx.style.visibility='visible';
  divx.style.display = 'block';
}

function closexMenuValidateIperc()
{
  var divx = document.getElementById("emergenteDivMenuValidadorIperc");
      divx.style.zIndex = "0";
      divx.style.visibility = "hidden";
}

/**
 * [showxMenuObservacionesPreventivas MOSTRAR LA MODAL PARA LAS OPCIONES DE OBSERVACIONES PREVENTIVAS
 * PARA LOS ROLES ROL_RESPONSABLEEJECUCIONAC Y ROL_LIDERAUDITORIA]
 * @return {[type]} [description]
 */
function showxMenuObservacionesPreventivas()
{
    var divx              = document.getElementById("emergenteDivMenuObservacionesPreventivas");
    divx.style.zIndex     = "10000";
    divx.style.visibility ='visible';
    divx.style.display    = 'block';
    //alert("mostrar emergenteDivMenuObservacionesPreventivas")
}

/**
 * [closexMenuObservacionesPreventivas OCULTAR LA MODAL PARA LAS OPCIONES DE OBSERVACIONES PREVENTIVAS
 * PARA LOS ROLES ROL_RESPONSABLEEJECUCIONAC Y ROL_LIDERAUDITORIA]
 * @return {[type]} [description]
 */
function closexMenuObservacionesPreventivas()
{

    var divx              = document.getElementById("emergenteDivMenuObservacionesPreventivas");
    divx.style.zIndex     = "0";
    divx.style.visibility = "hidden";
    divx.style.display    = 'none';
}


function getStorage(nombre,type) {
  let storage = '';
  if(type == 'json'){
    storage = JSON.parse(localStorage.getItem(nombre))
  }else if(type == 'text'){
    storage = localStorage.getItem(nombre)
  }else{
    storage = 'Error, no has enviado bien el tipo';
  }
  return storage;
}

function cerrarModal(id){
  $(`#${id}`).removeClass('modal_confirmacion__active')
}

