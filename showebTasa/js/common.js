//CONSTANTES----------------------------------

var constantes = {

  apiKey: 'r$3#23516ewew5',
  sysCode: 'syssho',
  sysCodeId: 14,
  temperatureMax: 37.6

}
var flagModuleMedicoActive = 0;
var initListCovid = 0;
var logoPdf;
var typeSecuryRequest = ''; //indica si l avisita es gubernametal, no programada o normal
var isTemporalRequest = 0; //indica si una visita es temporal o no
var backPageSystemSoma; //indica  la pagina(url) a  que se debe regresar
var actualPageSystemSoma; //indica  la pagina en la que se encuentra actualmente
var backTitle = ''; //indica el titulo de la pagina a la que se retona, si no tienen dejar en blanco
$("#regresar").click(function() { atrasBack(); });

$(document).ready(function() {

  var x = 1;
  var maxField = 100;
  var addButton = $('.add_button');
  var wrapper = $('.field_wrapper');
  var fieldHTML = '<div><table width="100%"><tr><td class="border-0"><img src="images/iconos/business.svg" height="24"></td><td class="border-0"><input type="number" name="field_name[]" class="form-control" placeholder="Nro. de documento" name="requestDNI[]"/></td><td class="border-0"><a href="javascript:void(0);" class="remove_button" title="Eliminar registro"><img src="images/iconos/trash.svg"  height="24"></a></td></tr></table></div>'; //New input field html


  $(addButton).click(function() {
    if (x < maxField) {
      x++;

      $(wrapper).append(fieldHTML)
      $('.cantDNI').text(' (' + x + ') ');
    }
  });

  $(wrapper).on('click', '.remove_button', function(e) {
    e.preventDefault();

    $(this).closest('div').remove();
    x--;
    $('.cantDNI').text(' (' + x + ') ');
  });

});
//--------------------------------------------
function showAlert(color, text, Delay) {

  $(".alert").show();
  $(".alert").text(text);

  $(".alert").removeClass("alert-danger");
  $(".alert").removeClass("alert-warning");
  $(".alert").removeClass("alert-success");

  if (color == "danger")
    $(".alert").addClass("alert-danger");
  if (color == "warning")
    $(".alert").addClass("alert-warning");
  if (color == "success")
    $(".alert").addClass("alert-success");

  setTimeout(function() {
    $(".alert").fadeOut();
  }, Delay)

  $(".spinner-border").hide();


}

function closeModal(obj) {
  obj.modal('hide');
  //hide the modal
  $('body').removeClass('modal-open');
  //modal-open class is added on body so it has to be removed
  $('.modal-backdrop').remove();
  //need to remove div with modal-backdrop class
  $('body').click();
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function showNameVisit() {
  if (!$("#titleVisit")[0])
    return


  if ($("#hid_type_access_request").val() == 1) {
    $("#titleVisit").text("Completa datos de Visita")
  }
  if ($("#hid_type_access_request").val() == 3) {
    $("#titleVisit").text("Completa datos de Proveedor")
  }
  if ($("#hid_type_access_request").val() == 2) {
    $("#titleVisit").text("Completa datos de Contratista")
  }
  if ($("#hid_type_access_request").val() == 4) {
    $("#titleVisit").text("Completa datos de Transportista")
  }
  if ($("#hid_type_access_request").val() == 7) {
    $("#titleVisit").text("Completa datos de cliente")
  }
}
var validateDateItinerario = function(date1, time1, date2, time2) {
  var fe1;
  var fe2;

  if ($("#" + date1).val() != "" && $("#" + time1).val() != "" && $("#" + date2).val() != "" && $("#" + time2).val() != "") {
    var fecha1 = $("#" + date1).val().split('/');
    fe1 = fecha1[2] + '-' + fecha1[1] + '-' + fecha1[0] + ' ' + $("#" + time1).val();
    fe2 = fecha1[2] + '-' + fecha1[1] + '-' + fecha1[0] + ' ' + $("#" + time2).val();;
    fecha1 = fecha1[2] + '-' + fecha1[1] + '-' + fecha1[0] + ' ' + $("#" + time1).val();
    var fecha2 = $("#" + date2).val().split('/');
    fecha2 = fecha2[2] + '-' + fecha2[1] + '-' + fecha2[0] + ' ' + $("#" + time2).val();

    /*
      var dateonly1 = fecha1[2]+'-'+fecha1[1]+'-'+fecha1[0];
      var dateonly2 = fecha2[2]+'-'+fecha2[1]+'-'+fecha2[0];
      var timeonly1 =  $("#"+time1).val();
      var timeonly2 =  $("#"+time2).val();*/

    var fecha11 = fecha1;
    var fecha22 = fecha2;
    fecha1 = new Date(fecha1);
    fecha2 = new Date(fecha2);
    fechanow = new Date();

    if (fecha1 > fecha2) //fecha inicial no puede ser mayor
    {
      swal("Error", "La fecha y hora de inicio no puede ser mayor a la fecha y hora de culminación", "error"); //warning
      return false;
    } else if ((fecha1 == fecha2) || (fecha11 == fecha22)) {
      swal("Error", "Las fechas y horas no puede ser iguales, verifique las horas de entrada y salida", "error"); //warning
      return false;
    } else if (fecha1 < fechanow) {
      swal("Error", "La hora de inicio no puede ser menor a la hora actual", "error"); //warning
      return false;
    } else if (fecha2 < fechanow) {
      swal("Error", "La hora de culminación no puede ser menor a la hora actual", "error"); //warning
      return false;
    }
  }

  //se calcula si es temporal, solo contra la hora de inicio y hora final, pero con la misma fecha en caso de que sea recurrente
  //console.log(fe1,fe2)
  var time1 = moment(fe1, "YYYY-MM-DD HH:mm:ss");
  var time2 = moment(fe2, "YYYY-MM-DD HH:mm:ss");
  var ms = time2.diff(time1);
  var hours = moment.duration(ms).asHours();
  //console.log(hours,isTemporalRequest)
  if (hours > 2)
    isTemporalRequest = 0;
  else
    isTemporalRequest = 1;

  //console.log("Temporal:",hours,isTemporalRequest)


}

var enabledDaySel = function(date1, time1, date2, time2) {

  if ($("#" + date1).val() != "" && $("#" + date2).val() != "") {

    if ($("#" + date1).val() == $("#" + date2).val()) {
      $("#ch_itinirary_do").prop("disabled", true)
      $("#ch_itinirary_lu").prop("disabled", true)
      $("#ch_itinirary_ma").prop("disabled", true)
      $("#ch_itinirary_mi").prop("disabled", true)
      $("#ch_itinirary_ju").prop("disabled", true)
      $("#ch_itinirary_vi").prop("disabled", true)
      $("#ch_itinirary_sa").prop("disabled", true)


      calculateDayCheck('tx_date_start');
    } else {


      $("#ch_itinirary_do").prop("disabled", false)
      $("#ch_itinirary_lu").prop("disabled", false)
      $("#ch_itinirary_ma").prop("disabled", false)
      $("#ch_itinirary_mi").prop("disabled", false)
      $("#ch_itinirary_ju").prop("disabled", false)
      $("#ch_itinirary_vi").prop("disabled", false)
      $("#ch_itinirary_sa").prop("disabled", false)



      var fecha1 = $("#" + date1).val().split('/');
      fecha1 = fecha1[2] + '-' + fecha1[1] + '-' + fecha1[0] + ' ' + $("#" + time1).val();

      var fecha2 = $("#" + date2).val().split('/');
      fecha2 = fecha2[2] + '-' + fecha2[1] + '-' + fecha2[0] + ' ' + $("#" + time2).val();

      var fecha11 = fecha1;
      var fecha22 = fecha2;
      fecha1 = new Date(fecha1);
      fecha2 = new Date(fecha2);
      fechanow = new Date();
    }
  }


  if ($("#accessDay")[0]) //validacion de frecuencia para itinerario
  {

    if ($("#" + date1).val() != $("#" + date2).val()) {
      $("#accessDay").fadeIn();
    } else {
      $("#accessDay").hide();
    }

  }



}
var setActiveCheck = function(id, action) {
  if (id) {
    if ($("#" + id)[0].className == "btn tabInactive checkboxInac mr-3") {
      $("#" + id)[0].className = "btn tabInactive checkboxAct mr-3";

    } else {
      $("#" + id)[0].className = "btn tabInactive checkboxInac mr-3";

    }
  }

  if (action == 'activar') //habilita todos
  {
    $("#label_ch_itinirary_lu")[0].className = "btn tabInactive checkboxAct mr-3";
    $("#label_ch_itinirary_ma")[0].className = "btn tabInactive checkboxAct mr-3";
    $("#label_ch_itinirary_mi")[0].className = "btn tabInactive checkboxAct mr-3";
    $("#label_ch_itinirary_ju")[0].className = "btn tabInactive checkboxAct mr-3";
    $("#label_ch_itinirary_vi")[0].className = "btn tabInactive checkboxAct mr-3";
    $("#label_ch_itinirary_sa")[0].className = "btn tabInactive checkboxAct mr-3";
    $("#label_ch_itinirary_do")[0].className = "btn tabInactive checkboxAct mr-3";
  }
  if (action == 'inactivar') //habilita todos
  {
    $("#label_ch_itinirary_lu")[0].className = "btn tabInactive checkboxInac mr-3";
    $("#label_ch_itinirary_ma")[0].className = "btn tabInactive checkboxInac mr-3";
    $("#label_ch_itinirary_mi")[0].className = "btn tabInactive checkboxInac mr-3";
    $("#label_ch_itinirary_ju")[0].className = "btn tabInactive checkboxInac mr-3";
    $("#label_ch_itinirary_vi")[0].className = "btn tabInactive checkboxInac mr-3";
    $("#label_ch_itinirary_sa")[0].className = "btn tabInactive checkboxInac mr-3";
    $("#label_ch_itinirary_do")[0].className = "btn tabInactive checkboxInac mr-3";
  }

}
var authorizedPersons = [];
var validateFieldMinForm = function() {
  authorizedPersons = []
  console.log("check form")

  //var isParticular = $("#chb_Visita_Particular").prop('checked');
  var isParticular = false;
  if ($("#sel_visita_particular").val() == "1")
    isParticular = true;
  var warning = 0;
  var sede = $("#sel_location").val();
  var area = $("#sel_area").val();
  var colaborador = $("#txt_collaborator").val();
  var fecha_inicio = $("#tx_date_start").val();
  var hora_inicio = $("#tx_time_start").val();
  var fecha_final = $("#tx_date_end").val();
  var hora_final = $("#tx_time_end").val();
  var motivo = $("#tx_rejection_reason").val();
  if (typeSecuryRequest != "") {
    $("#bt_register_visita_disabled").show()
    $("#bt_register_visita").hide()
  }




  $("#div_register_visita_aprove").hide();
  var check_itinerario = 0;

  //se valida bloque 1------------------------------------------------------------------------------
  if (sede == "0") {
    if ($("#blockitinerario")[0]) {

      $("#blockitinerario")[0].className = "media mb-2 p-3 titleFormSecond";
      $("#headerButtom").hide();

    }

    warning = 1;
    return;
  }
  if (area == "0") {
    if ($("#blockitinerario")[0]) {

      $("#blockitinerario")[0].className = "media mb-2 p-3 titleFormSecond";
      $("#headerButtom").hide();

    }
    warning = 1;
    return;
  }
  if (colaborador == "") {
    if ($("#blockitinerario")[0]) {

      $("#blockitinerario")[0].className = "media mb-2 p-3 titleFormSecond";
      $("#headerButtom").hide();

    }
    warning = 1;
    return;
  }
  if (motivo == "") {
    if ($("#blockitinerario")[0]) {

      $("#blockitinerario")[0].className = "media mb-2 p-3 titleFormSecond";
      $("#headerButtom").hide();

    }
    warning = 1;
    return;
  }
  if ($("#blockitinerario")[0]) {
    $("#blockitinerario")[0].className = "media mb-2 p-3 titleFormSecondAct";
  }
  //se valida bloque 2---------------------------------------------------------------------------------
  if (fecha_inicio.trim().length == 0) {
    if ($("#blockperson")[0]) {

      $("#blockperson")[0].className = "media mb-2 p-2 titleFormSecond";
      $("#headerButtom").hide();

    }
    warning = 1;
    return;
  }
  if (hora_inicio.trim().length == 0) {
    if ($("#blockperson")[0]) {

      $("#blockperson")[0].className = "media mb-2 p-2 titleFormSecond";
      $("#headerButtom").hide();

    }
    warning = 1;
    return;
  }
  if (fecha_final.trim().length == 0) {
    if ($("#blockperson")[0]) {

      $("#blockperson")[0].className = "media mb-2 p-2 titleFormSecond";
      $("#headerButtom").hide();

    }
    warning = 1;
    return;
  }
  if (hora_final.trim().length == 0) {
    if ($("#blockperson")[0]) {

      $("#blockperson")[0].className = "media mb-2 p-2 titleFormSecond";
      $("#headerButtom").hide();

    }
    warning = 1;
    return;
  }
  if ($("#blockperson")[0]) {
    $("#blockperson")[0].className = "media mb-2 p-2 titleFormSecondAct";
  }

  //se valida bloque 3--------------------------------------------------------------------------------
  $("#list_participantes form").each(function() {
    var partipante = {}
    var values = [];
    $(this).find('.form-control').each(function() {
      //var idinput=$(this).attr("id");
      var value = $(this).val();
      values.push(value);
    });

    partipante = {
      "external_company": values[0],
      "affidavit": 0,
      "first_name": toCapitalize(values[3]),
      "last_name": toCapitalize(values[4]),
      "identity_document": values[2],
      "email": values[5],
      "attribute1": "",
      "attribute2": "",
      "attribute3": "",
      "attribute4": "",
      "attribute5": ""
    }
    authorizedPersons.push(partipante);
  });

  authorizedPersons.map(item => {

    if (typeSecuryRequest == "") //sino es gubernamental ni no programada
    {
      if (item.external_company == "0") {
        if (item.identity_document == "" /* || item.first_name=="" || item.last_name=="" */ ) {
          warning = 1;
          $("#headerButtom").hide();

          return
        }
      } else {
        //solo se envia codigo de empresa
      }
      if (item.email != "" && item.identity_document != "" && item.first_name != "" && item.last_name != "") {
        $("#div_register_visita_aprove").fadeIn();
      }

    } else if (typeSecuryRequest == "GUBERNAMENTAL") {

      if (item.external_company == "0" || item.identity_document == "" || item.first_name == "" || item.last_name == "") {
        warning = 1;
        $("#headerButtom").hide();

        return
      }


    } else if (typeSecuryRequest == "NOPROGRAMADA") {

      if (item.identity_document == "" || item.first_name == "" || item.last_name == "") {
        warning = 1;
        $("#headerButtom").hide();

        return
      }


    }

  });

  if (warning == 1)
    return

  if ($("#blocktools")[0])
    $("#blocktools")[0].className = "media mb-2 p-2 titleFormSecondAct";
  if ($("#blockvehicle")[0])
    $("#blockvehicle")[0].className = "media mb-2 p-2 titleFormSecondAct";
  if ($("#headerButtom")[0])
    $("#headerButtom").fadeIn();






  //getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_SEGURIDAD" || getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_GARITA"

  if (typeSecuryRequest != "") {
    $("#bt_register_visita_disabled").hide()
    $("#bt_register_visita").show()
  }
}

var cacheHtml = [];
var cacheHtmlact = [];


//function handlerUrlhtml(idContent,url,idview,tab,statusfilter)

function atrasBack() /*esta funcion debe ejecutarse en el evento onclick del  <div id="regresar"*/ { //-----ini-------------------- se encargara de enviar desde la pagina actual a la anterior ruta de navegacion -----@andy-------------

  //inicialmente necesita la pagina en la que se encuentra el usuario
  //la almacenaremos en una variable global actualPageSystemSoma.
  //seguidamente la página donde a donde debe regresar backPageSystemSoma,
  //al entrar en handlerUrlhtml colocamos la paguina actual como la pagina a donde nos debemos devolver backPageSystemSoma = actualPageSystemSoma
  // y la ruta enviada como pagiana actual actualPageSystemSoma = url;
  //backPageSystemSoma;
  //actualPageSystemSoma;

  //alert("paginaActual = "+actualPageSystemSoma);
  //alert("Nos vamos a = "+backPageSystemSoma);

  console.log("####################### COMMON.JS atrasBack ##########################");
  console.log("paginaActual = " + actualPageSystemSoma);
  console.log("Nos vamos a = " + backPageSystemSoma);
  console.log("####################### COMMON.JS atrasBack ##########################");



  handlerUrlhtml('contentGlobal', backPageSystemSoma);
  if (backTitle != '') {
    $("#logoCompany1").html("<b style='width: 340px !important;'>" + backTitle + "</b>");
  }
  //textTilteModule

} //-----fin-------------------- se encargara de enviar desde la pagina actual a la anterior ruta de navegacion -------@andy-----------



function handlerUrlhtml(idContent, url, title) {

  //alert("544 handeler a = "+idContent+", b ="+url);
  //alert(url);
  var idview;
  $("#prevSystem").off(); //se elimina evento de arrowback
  //se valida arrow back
  //console.log(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa),url,title)
  let storage = getStorage("vtas_rolexternalrol", "text");
  //console.log(storage)
  if (getCookie("vtas_rolexternalrol" + sessionStorage.tabVisitasa) != "ROL_MASTERSSOMAAUDITORIA") {
    $("#prevSystem").hide();
    $("#textTilteModule").hide();
    $("#logoCompany").show();
  }

  //-------------------
  $('.modal-backdrop').remove();
  flagModuleMedicoActive = 0;
  $("#" + idContent).html(".....")
  var flag = 0;

  //valida si esta precargado el div
  cacheHtml.map(item => {


    if (item.url == url) {




      $("#" + idContent).html(item.html) //pinto en el main.html
      flag = 1;

      //muestra logo en vez de flecha
      $("#regresar").hide();
      $("#textTilteModule").hide();
      $("#logoCompany").show();



      if (url == "view/auditoria/menu.html") {

        //alert(url);
        //location.href = "main.html";

      }

      //------------------------------SPRINT5 @millanqjesus start -------------------------------------
      if (url == "view/auditoria/seguimientoAC/seguimientoAC.html") /*if(url=="view/auditoria/auditoriaListLiderPlan.html") */ {
        //alert('Entrar fnSp3AdministrarHallazgos--->HANDLER+FLAG = 0')
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();
        $("#textTilteModule").text(title);

        backPageSystemSoma = 'view/auditoria/menu.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;
        //console.log("divPrecargado")
        //_init_fnSp3AdministrarHallazgosEstadoInicial();
      }
      //------------------------------SPRINT5 @millanqjesus end -------------------------------------

      //------------------------------SPRINT4 @millanqjesus start -------------------------------------
      if (url == "view/auditoria/hallazgosAsignados/hallazgosAsignados.html") /*if(url=="view/auditoria/auditoriaListLiderPlan.html") */ {
        //alert('Entrar fnSp3AdministrarHallazgos--->HANDLER+FLAG = 0')
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();
        $("#textTilteModule").text(title);

        backPageSystemSoma = 'view/auditoria/menu.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;
        console.log("divPrecargado")
        //_init_fnSp3AdministrarHallazgosEstadoInicial();
      }
      //------------------------------SPRINT4 @millanqjesus end -------------------------------------

      if (url == "view/auditoria/evaluarAuditor.html") {
        //alert('Entrar fnSp3AdministrarHallazgos--->HANDLER+FLAG != 0')
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();
        $("#textTilteModule").text(title);

        backPageSystemSoma = 'view/auditoria/menu.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;

        //vw_auditorias_list_plan.init();
      }

      if (url == "view/auditoria/AdministrarHallazgos.html") /*if(url=="view/auditoria/auditoriaListLiderPlan.html") */ {
        //alert('Entrar fnSp3AdministrarHallazgos--->HANDLER+FLAG != 0')
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();
        $("#textTilteModule").text(title);

        backPageSystemSoma = 'view/auditoria/menu.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;

        //vw_auditorias_list_plan.init();
      }

      if (url == "view/auditoria/auditoriaListLiderPlan.html") /*if(url=="view/auditoria/auditoriaListLiderPlan.html") */ {
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();
        $("#textTilteModule").text(title);

        backPageSystemSoma = 'view/auditoria/menu.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;

        // $("#regresar").click(function(){
        //     handlerUrlhtml('contentGlobal','view/auditoria/auditProgramList.html','Programa de Auditorías');
        //   });

        //vw_auditorias_list.init();
        vw_auditorias_list_plan.init();
      }

      if (url == "view/auditoria/listadoAsistentes.html") {
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();
        $("#textTilteModule").text(title);

        backPageSystemSoma = 'view/auditoria/listadoAsistentes.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;

        // $("#regresar").click(function(){
        //     handlerUrlhtml('contentGlobal','view/auditoria/auditProgramList.html','Programa de Auditorías');
        //   });

        //vw_auditorias_list.init();
        vw_listado_asistentes.init();
      }

      if (url == "view/auditoria/auditorList.html") {

        vw_auditor_list.init();

        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();
        $("#textTilteModule").text(title);



        backPageSystemSoma = 'view/auditoria/menu.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;


        // $("#regresar").click(function(){
        //     handlerUrlhtml('contentGlobal','view/auditoria/menu.html');
        //   });

      }
      if (url == "view/auditoria/auditoriaList.html") {
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();
        $("#textTilteModule").text(title);

        backPageSystemSoma = 'view/auditoria/registrarProgramaAuditoria.dev.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;

        // $("#regresar").click(function(){
        //     handlerUrlhtml('contentGlobal','view/auditoria/auditProgramList.html','Programa de Auditorías');
        //   });

        vw_auditorias_list.init();
      }
      if (url == "view/auditoria/auditoriasListEvaluacion.html") {
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();
        $("#textTilteModule").text(title);

        backPageSystemSoma = 'view/auditoria/evaluacionProgramaAuditoria.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;

        vw_evaluar_auditorias_list.init();
      }
      if (url == "view/auditoria/registrarProgramaAuditoria.dev.html") {
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();
        $("#textTilteModule").text('Programa de Auditoría');

        backPageSystemSoma = 'view/auditoria/menu.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;

        // $("#regresar").click(function(){
        //     handlerUrlhtml('contentGlobal','view/auditoria/menu.html');
        // });

        vw_secury_agent.init();
      }

      if (url == "view/auditoria/evaluacionProgramaAuditoria.html") {

        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();
        $("#textTilteModule").text(title);


        backPageSystemSoma = 'view/auditoria/menu.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;
        vw_secury_agentE.init();
      }


      if (url == "view/auditoria/auditProgramList.html") {
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();
        $("#textTilteModule").text(title);

        backPageSystemSoma = 'view/auditoria/menu.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;

        // $("#regresar").click(function(){
        //     handlerUrlhtml('contentGlobal','view/auditoria/menu.html');
        //   });

      }

      if (url == "view/ssoma/configuracion-de-inspecciones/creacion-inspeccion.html") {
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();
        $("#textTilteModule").text(title);

        backPageSystemSoma = 'view/somma/menu.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;

      }

      if (url == "view/ssoma/configuracion-de-inspecciones/edit-inspeccion.html") {
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();
        $("#textTilteModule").text(title);

        backPageSystemSoma = 'view/ssoma/configuracion-de-inspecciones/index.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;

      }

      if (url == "view/ssoma/configuracion-de-inspecciones/index.html") {
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();
        $("#textTilteModule").text(title);

        backPageSystemSoma = 'view/ssoma/menu.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;
        QuiestionListArray = []

      }

      if (url == "view/ssoma/configuracion-de-inspecciones/creacion-inspeccion.html") {
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();
        $("#textTilteModule").text(title);
        QuiestionListArray = []
        backPageSystemSoma = 'view/ssoma/configuracion-de-inspecciones/index.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;

      }

      if (url == "view/ssoma/programar-inspeccion/index.html") {
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();
        $("#textTilteModule").text(title);

        backPageSystemSoma = 'view/ssoma/menu.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;

      }
      if (url == "view/ssoma/inspector/index.html") {
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();
        $("#textTilteModule").text(title);

        backPageSystemSoma = 'view/ssoma/menu.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;

      }

      if (url == "view/ssoma/seguimiento-de-inspeccion/index.html") {
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();
        $("#textTilteModule").text(title);

        backPageSystemSoma = 'view/ssoma/menu.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;

      }


      if (url == "view/ssoma/programar-inspeccion/inspeccion.html") {
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();
        $("#textTilteModule").text(title);

        backPageSystemSoma = 'view/ssoma/menu.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;

      }


      // Seguimiento de Observación preventiva
      if (url == "view/ssoma/Seguimiento-Observaciones-Preventivas/index.html") {
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();
        $("#textTilteModule").text(title);

        backPageSystemSoma = 'view/ssoma/menu.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;
      }


      // IPERC
      if (url == "view/ssoma/IPERC/index.html" || url == "view/ssoma/plan-anual/gestionPlanAnual.html" || url == "view/ssoma/plan-anual/EjecucionPlanAnual.html") {
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();
        $("#textTilteModule").text(title);

        backPageSystemSoma = 'view/ssoma/menu.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;
      }

      if (url == "view/ssoma/incidente-accidente/gestionAccidenteIncidente.html") //view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {
        // alert(title+'iiiiiii00000000000000000000');
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();
        $("#textTilteModule").text(title);

        backPageSystemSoma = 'view/ssoma/menu.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;
      }



      if (url == "view/sho-hce/menu.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {
        //alert(title+'iiiiiii00000000000000000000');
        $("#regresar").hide();
        $("#textTilteModule").show();
        $("#logoCompany").hide();
        $("#logoCompany1").html("SALUD E HIGIENE <a style='color:#ffffff !important; font-size: 19px !important;' >OCUPACIONAL</a>");
        backPageSystemSoma = 'view/sho-hce/menu.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;
        backTitle = '';
      }

      if (url == "view/sho-hce/historia_clinica/gestionHistoriaClinica.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {
        // alert(title+'iiiiiii00000000000000000000-879');
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b>" + title + "</b>");
        backPageSystemSoma = 'view/sho-hce/menu.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;
      }

      if (url == "view/sho-hce/historia_clinica/nuevaHistoriaClinica.html") {
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b>" + title + "</b>");
        backPageSystemSoma = 'view/sho-hce/historia_clinica/gestionHistoriaClinica.html';
        actualPageSystemSoma = url;
      }

      if (url == "view/sho-hce/historia_clinica/datosGenerales.html") {
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();
        $("#logoCompany1").html("<b style='width: 340px !important;'>" + title + "</b>");
        backPageSystemSoma = 'view/sho-hce/historia_clinica/gestionHistoriaClinica.html';
        actualPageSystemSoma = url;
        backTitle = "Historia clínica electrónica";
      }

      if (url == "view/sho-hce/interconsultas_transferencias/gestionInterconsultasTransferencia.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {
        // alert(title+'iiiiiii00000000000000000000-879');
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;' >" + title + "</b>");
        backPageSystemSoma = 'view/sho-hce/menu.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;
      }

      if (url == "view/sho-hce/interconsultas_transferencias/formularioTransferenciasVer.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {
        //alert(title+'= -905 = '+url);
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;'>" + title + "</b>");
        backPageSystemSoma = 'view/sho-hce/interconsultas_transferencias/gestionInterconsultasTransferencia.html';
        actualPageSystemSoma = url;

        backTitle = "Registro de interconsultas y transferencias";
      }

      if (url == "view/sho-hce/interconsultas_transferencias/formularioTransferenciaEditar.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {

        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;'>" + title + "</b>");
        backPageSystemSoma = 'view/sho-hce/interconsultas_transferencias/gestionInterconsultasTransferencia.html';
        actualPageSystemSoma = url;
        backTitle = "Registro de interconsultas y transferencias";
      }

      if (url == "view/sho-hce/interconsultas_transferencias/datosInterconsultasTransferencias.html") {
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;'>" + title + "</b>");
        backPageSystemSoma = 'view/sho-hce/historia_clinica/datosGenerales.html';
        actualPageSystemSoma = url;
      }

      if (url == "view/sho-hce/interconsultas_transferencias/formularioInterconsultasEditar.html") {
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;'>" + title + "</b>");
        backPageSystemSoma = 'view/sho-hce/interconsultas_transferencias/gestionInterconsultasTransferencia.html';
        actualPageSystemSoma = url;
        backTitle = "Registro de interconsultas y transferencias";
      }

      if (url == "view/sho-hce/interconsultas_transferencias/formularioInterconsultasVer.html") {
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;'>" + title + "</b>");
        backPageSystemSoma = 'view/sho-hce/interconsultas_transferencias/gestionInterconsultasTransferencia.html';
        actualPageSystemSoma = url;
        backTitle = "Registro de interconsultas y transferencias";
      }

      if (url == "view/sho-hce/interconsultas_transferencias/formularioInterconsultasEditar.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {

        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;'>" + title + "</b>");
        backPageSystemSoma = 'view/sho-hce/interconsultas_transferencias/gestionInterconsultasTransferencia.html';
        actualPageSystemSoma = url;
        backTitle = "Registro de interconsultas y transferencias";
      }

      if (url == "view/sho-hce/interconsultas_transferencias/formularioInterconsultasVer.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {

        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;'>" + title + "</b>");
        backPageSystemSoma = 'view/sho-hce/interconsultas_transferencias/gestionInterconsultasTransferencia.html';
        actualPageSystemSoma = url;
        backTitle = "Registro de interconsultas y transferencias";
      }
















       if (url == "view/sho-hce/atenciones_medicas/gestionAtencionesMedicasBandeja.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {
        // alert(title+'iiiiiii00000000000000000000-879');
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;' >" + title + "</b>");
        backPageSystemSoma = 'view/sho-hce/menu.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;
      }

      
    if (url == "view/sho-hce/descansos_medicos/gestionDescansoMedicoBandeja.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {
         //alert(title+'iiiiiii00000000000000000000-1047');
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;' >" + title + "</b>");
        backPageSystemSoma = 'view/sho-hce/menu.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;
      }

       if (url == "view/sho-hce/descansos_medicos/Ver_DescansoMedico_HC.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {
        // alert(title+'iiiiiii00000000000000000000-879');
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;' >" + title + "</b>");
        backPageSystemSoma = 'view/sho-hce/descansos_medicos/gestionDescansoMedicoBandeja.html'; 
        actualPageSystemSoma = url;
         backTitle = "Registro de Descansos Médicos";
      }

        if (url == "view/sho-hce/descansos_medicos/gestionHistoriaClinica.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {
        // alert(title+'iiiiiii00000000000000000000-879');
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;' >" + title + "</b>");
        backPageSystemSoma = 'view/sho-hce/historia_clinica/gestionHistoriaClinica.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;
      }

      if (url == "view/sho-hce/descansos_medicos/vincularDM_SAP.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {
        // alert(title+'iiiiiii00000000000000000000-879');
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;' >" + title + "</b>");
        backPageSystemSoma = 'view/sho-hce/descansos_medicos/gestionDescansoMedicoBandeja.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;
        backTitle = "Registro de Descansos Médicos";
      }

      if (url == "view/sho-hce/enfermedades_cronicas/gestionDescanso.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {
        // alert(title+'iiiiiii00000000000000000000-879');
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;' >" + title + "</b>");
        backPageSystemSoma = 'view/sho-hce/enfermedades_cronicas/gestionEnfermedadCronica.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;
      }

      if (url == "view/sho-hce/enfermedades_cronicas/gestionInterconsulta.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {
        // alert(title+'iiiiiii00000000000000000000-879');
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;' >" + title + "</b>");
        backPageSystemSoma = 'view/sho-hce/enfermedades_cronicas/gestionEnfermedadCronica.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;
      }

      if (url == "view/sho-hce/enfermedades_cronicas/gestionTransferencia.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {
        // alert(title+'iiiiiii00000000000000000000-879');
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;' >" + title + "</b>");
        backPageSystemSoma = 'view/sho-hce/enfermedades_cronicas/gestionEnfermedadCronica.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;
      }

      if (url == "view/sho-hce/enfermedades_cronicas/gestionEnfermedadCronica.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {
        // alert(title+'iiiiiii00000000000000000000-879');
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;' >" + title + "</b>");
        actualPageSystemSoma = url;
        backPageSystemSoma = 'view/sho-hce/historia_clinica/datosGenerales.html';
        backTitle = "Historia Clínica";
      }

      if (url == "view/sho-hce/enfermedades_cronicas/indexEC.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {
        // alert(title+'iiiiiii00000000000000000000-879');
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;' >" + title + "</b>");
        backPageSystemSoma = 'view/sho-hce/menu.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;
        backTitle = "Registro de Enfermedades Crónicas";
      }


      if (url == "view/sho-hce/enfermedades_cronicas/buscarEnfermedadCronica.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {
        // alert(title+'iiiiiii00000000000000000000-879');
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;' >" + title + "</b>");
        backPageSystemSoma = 'view/sho-hce/menu.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;
        backTitle = "Buscar Registro de Enfermedades Crónicas";
        
      }


      if (url == "view/sho-hce/enfermedades_cronicas/detalleEnfermedadCronica.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {
        // alert(title+'iiiiiii00000000000000000000-879');
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;' >" + title + "</b>");
        backPageSystemSoma = 'view/sho-hce/enfermedades_cronicas/buscarEnfermedadCronica.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;
      }

      if (url == "view/sho-hce/enfermedades_cronicas/verDescanso.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {
        // alert(title+'iiiiiii00000000000000000000-879');
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;' >" + title + "</b>");
        backPageSystemSoma = 'view/sho-hce/enfermedades_cronicas/detalleEnfermedadCronica.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;
        backTitle = "Detalle del registro enfermedades crónicas";
      }

      if (url == "view/sho-hce/enfermedades_cronicas/verTransferencia.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {
        // alert(title+'iiiiiii00000000000000000000-879');
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;' >" + title + "</b>");
        backPageSystemSoma = 'view/sho-hce/enfermedades_cronicas/detalleEnfermedadCronica.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;
        backTitle = "Detalle del registro enfermedades crónicas";
      }

      if (url == "view/sho-hce/enfermedades_cronicas/verInterconsulta.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {
        // alert(title+'iiiiiii00000000000000000000-879');
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;' >" + title + "</b>");
        actualPageSystemSoma = url;

        if(controlNavHistoria)
        {

          backPageSystemSoma = 'view/sho-hce/historia_clinica/datosGenerales.html';
          backTitle = "Historia Clínica";

        }
        else
        {

          backPageSystemSoma = 'view/sho-hce/enfermedades_cronicas/detalleEnfermedadCronica.html';
          backTitle = "Detalle del registro enfermedades crónicas";

        }

      }

      if (url == "view/sho-hce/enfermedades_cronicas/editarEnfermedadCronica.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {
        // alert(title+'iiiiiii00000000000000000000-879');
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;' >" + title + "</b>");
        actualPageSystemSoma = url;
        backPageSystemSoma = 'view/sho-hce/historia_clinica/datosGenerales.html';
        backTitle = "Historia Clínica";

      }





      // if (url == "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html") //view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      // {
      //     // alert(title+'iiiiiii00000000000000000000');
      //     $("#regresar").show();
      //     $("#textTilteModule").show();
      //     $("#logoCompany").hide();
      //     $("#textTilteModule").text(title);

      //     backPageSystemSoma = 'view/sho-hce/menu.html'; //indica  la pagina(url) a  que se debe regresar
      //     actualPageSystemSoma = url;
      // }



      //se oculta loading
      setTimeout(function() {
        $("#splashLoading").fadeOut();
      }, 1000)

      getRolesFuntions('showid');
    }

    showNameVisit(); // mustra nombre de tipo de visita
  });
  if (flag == 0) //si no esta en cache
  {
    $("#splashLoading").show();
    $("#" + idContent).load(url, function(response, status, xhr) {
      if (status == "error") {
        var msg = "Error!, algo ha sucedido: ";
        $("#" + idContent).html(msg + xhr.status + " " + xhr.statusText);

      }
      if (status = "success") {
        getRolesFuntions('showid');
        //muestra logo en vez de flecha
        //$("#regresar").hide();
        $("#textTilteModule").hide();
        $("#logoCompany").show();

        cacheHtml.push({ url: url, idview: idview, html: response })

        //------------------------------SPRINT5 @millanqjesus start -------------------------------------
        if (url == "view/auditoria/seguimientoAC/seguimientoAC.html") /*if(url=="view/auditoria/auditoriaListLiderPlan.html") */ {
          //alert('Entrar fnSp3AdministrarHallazgos--->HANDLER+FLAG = 0')
          $("#regresar").show();
          $("#textTilteModule").show();
          $("#logoCompany").hide();
          $("#textTilteModule").text(title);

          backPageSystemSoma = 'view/auditoria/menu.html'; //indica  la pagina(url) a  que se debe regresar
          actualPageSystemSoma = url;
          //console.log("divPrecargado")
          //_init_fnSp3AdministrarHallazgosEstadoInicial();
        }
        //------------------------------SPRINT5 @millanqjesus end -------------------------------------

        //------------------------------SPRINT4 @millanqjesus start -------------------------------------
        if (url == "view/auditoria/hallazgosAsignados/hallazgosAsignados.html") /*if(url=="view/auditoria/auditoriaListLiderPlan.html") */ {
          //alert('Entrar fnSp3AdministrarHallazgos--->HANDLER+FLAG = 0')
          $("#regresar").show();
          $("#textTilteModule").show();
          $("#logoCompany").hide();
          $("#textTilteModule").text(title);

          backPageSystemSoma = 'view/auditoria/menu.html'; //indica  la pagina(url) a  que se debe regresar
          actualPageSystemSoma = url;

          initHallazgosAsignados();
        }
        //------------------------------SPRINT4 @millanqjesus end -------------------------------------

        if (url == "view/auditoria/evaluarAuditor.html") /*if(url=="view/auditoria/auditoriaListLiderPlan.html") */ {
          //alert('Entrar fnSp3AdministrarHallazgos--->HANDLER+FLAG = 0')
          $("#regresar").show();
          $("#textTilteModule").show();
          $("#logoCompany").hide();
          $("#textTilteModule").text(title);

          backPageSystemSoma = 'view/auditoria/menu.html'; //indica  la pagina(url) a  que se debe regresar
          actualPageSystemSoma = url;
          _init_fnSp3EvaluarAuditorEstadoInicial();

          //vw_auditorias_list_plan.init();
        }
        if (url == "view/auditoria/AdministrarHallazgos.html") /*if(url=="view/auditoria/auditoriaListLiderPlan.html") */ {
          //alert('Entrar fnSp3AdministrarHallazgos--->HANDLER+FLAG = 0')
          $("#regresar").show();
          $("#textTilteModule").show();
          $("#logoCompany").hide();
          $("#textTilteModule").text(title);

          backPageSystemSoma = 'view/auditoria/menu.html'; //indica  la pagina(url) a  que se debe regresar
          actualPageSystemSoma = url;

          _init_fnSp3AdministrarHallazgosEstadoInicial();
        }
        if (url == "view/auditoria/auditoriaListLiderPlan.html") /*if(url=="view/auditoria/auditoriaListLiderPlan.html")*/ {

          $("#regresar").show();
          $("#textTilteModule").show();
          $("#logoCompany").hide();
          $("#textTilteModule").text(title);

          backPageSystemSoma = 'view/auditoria/menu.html'; //indica  la pagina(url) a  que se debe regresar
          actualPageSystemSoma = url;

          // $("#regresar").click(function(){
          //     handlerUrlhtml('contentGlobal','view/auditoria/auditProgramList.html','Programa de Auditorías');
          //   });

          //vw_auditorias_list.init();
          vw_auditorias_list_plan.init();
        }

        if (url == "view/auditoria/listadoAsistentes.html") {
          vw_listado_asistentes.init();
          $("#regresar").show();
          $("#textTilteModule").show();
          $("#logoCompany").hide();
          $("#textTilteModule").text(title);

          backPageSystemSoma = 'view/auditoria/menu.html'; //indica  la pagina(url) a  que se debe regresar
          actualPageSystemSoma = url;

          // $("#regresar").click(function(){
          //     handlerUrlhtml('contentGlobal','view/auditoria/menu.html');
          //   });
        }

        if (url == "view/auditoria/auditorList.html") {
          vw_auditor_list.init();
          $("#regresar").show();
          $("#textTilteModule").show();
          $("#logoCompany").hide();
          $("#textTilteModule").text(title);

          backPageSystemSoma = 'view/auditoria/menu.html'; //indica  la pagina(url) a  que se debe regresar
          actualPageSystemSoma = url;

          // $("#regresar").click(function(){
          //     handlerUrlhtml('contentGlobal','view/auditoria/menu.html');
          //   });
        }
        if (url == "view/auditoria/auditoriaList.html") {
          $("#regresar").show();
          $("#textTilteModule").show();
          $("#logoCompany").hide();
          $("#textTilteModule").text(title);

          backPageSystemSoma = 'view/auditoria/registrarProgramaAuditoria.dev.html'; //indica  la pagina(url) a  que se debe regresar
          actualPageSystemSoma = url;

          // $("#regresar").click(function(){
          //     handlerUrlhtml('contentGlobal','view/auditoria/auditProgramList.html','Programa de Auditorías');
          //   });

          vw_auditorias_list.init();
        }
        if (url == "view/auditoria/auditoriasListEvaluacion.html") {
          $("#regresar").show();
          $("#textTilteModule").show();
          $("#logoCompany").hide();
          $("#textTilteModule").text(title);

          backPageSystemSoma = 'view/auditoria/evaluacionProgramaAuditoria.html'; //indica  la pagina(url) a  que se debe regresar
          actualPageSystemSoma = url;

          vw_evaluar_auditorias_list.init();
        }
        if (url == "view/auditoria/registrarProgramaAuditoria.dev.html") {
          $("#regresar").show();
          $("#textTilteModule").show();
          $("#logoCompany").hide();
          $("#textTilteModule").text(title);
          backPageSystemSoma = 'view/auditoria/menu.html'; //indica  la pagina(url) a  que se debe regresar
          actualPageSystemSoma = url;
          // $("#regresar").click(function(){
          //     handlerUrlhtml('contentGlobal','view/auditoria/menu.html');
          //   });
          vw_secury_agent.init();
        }

        if (url == "view/auditoria/evaluacionProgramaAuditoria.html") {

          $("#regresar").show();
          $("#textTilteModule").show();
          $("#logoCompany").hide();
          $("#textTilteModule").text(title);

          backPageSystemSoma = 'view/auditoria/menu.html'; //indica  la pagina(url) a  que se debe regresar
          actualPageSystemSoma = url;
          vw_secury_agentE.init();
        }

        if (url == "view/ssoma/configuracion-de-inspecciones/index.html") {
          $("#regresar").show();
          $("#textTilteModule").show();
          $("#logoCompany").hide();
          $("#textTilteModule").text(title);

          backPageSystemSoma = 'view/ssoma/menu.html'; //indica  la pagina(url) a  que se debe regresar
          actualPageSystemSoma = url;

        }

        if (url == "view/ssoma/configuracion-de-inspecciones/creacion-inspeccion.html") {
          $("#regresar").show();
          $("#textTilteModule").show();
          $("#logoCompany").hide();
          $("#textTilteModule").text(title);

          backPageSystemSoma = 'view/ssoma/configuracion-de-inspecciones/index.html'; //indica  la pagina(url) a  que se debe regresar
          actualPageSystemSoma = url;

        }

        if (url == "view/ssoma/configuracion-de-inspecciones/edit-inspeccion.html") {
          $("#regresar").show();
          $("#textTilteModule").show();
          $("#logoCompany").hide();
          $("#textTilteModule").text(title);

          backPageSystemSoma = 'view/ssoma/configuracion-de-inspecciones/index.html'; //indica  la pagina(url) a  que se debe regresar
          actualPageSystemSoma = url;

        }

        if (url == "view/ssoma/programar-inspeccion/index.html") {
          $("#regresar").show();
          $("#textTilteModule").show();
          $("#logoCompany").hide();
          $("#textTilteModule").text(title);

          backPageSystemSoma = 'view/ssoma/menu.html'; //indica  la pagina(url) a  que se debe regresar
          actualPageSystemSoma = url;

        }
        if (url == "view/ssoma/inspector/index.html") {
          $("#regresar").show();
          $("#textTilteModule").show();
          $("#logoCompany").hide();
          $("#textTilteModule").text(title);

          backPageSystemSoma = 'view/ssoma/menu.html'; //indica  la pagina(url) a  que se debe regresar
          actualPageSystemSoma = url;

        }

        if (url == "view/ssoma/seguimiento-de-inspeccion/index.html") {
          $("#regresar").show();
          $("#textTilteModule").show();
          $("#logoCompany").hide();
          $("#textTilteModule").text(title);

          backPageSystemSoma = 'view/ssoma/menu.html'; //indica  la pagina(url) a  que se debe regresar
          actualPageSystemSoma = url;

        }

        if (url == "view/ssoma/programar-inspeccion/inspeccion.html") {
          //alert('es here'+title);
          $("#regresar").show();
          $("#textTilteModule").show();
          $("#logoCompany").hide();
          $("#textTilteModule").text(title);

          backPageSystemSoma = 'view/ssoma/menu.html'; //indica  la pagina(url) a  que se debe regresar
          actualPageSystemSoma = url;

        }




        // Seguimiento de Observación preventiva
        if (url == "view/ssoma/Seguimiento-Observaciones-Preventivas/index.html") {
          $("#regresar").show();
          $("#textTilteModule").show();
          $("#logoCompany").hide();
          $("#textTilteModule").text(title);

          backPageSystemSoma = 'view/ssoma/menu.html'; //indica  la pagina(url) a  que se debe regresar
          actualPageSystemSoma = url;
        }

        // IPERC
        if (url == "view/ssoma/IPERC/index.html") {
          $("#regresar").show();
          $("#textTilteModule").show();
          $("#logoCompany").hide();
          $("#textTilteModule").text(title);

          backPageSystemSoma = 'view/ssoma/menu.html'; //indica  la pagina(url) a  que se debe regresar
          actualPageSystemSoma = url;
        }

        if (url == "view/ssoma/PERICON/index.html") {
          $("#regresar").show();
          $("#textTilteModule").show();
          $("#logoCompany").hide();
          $("#textTilteModule").text(title);

          backPageSystemSoma = 'view/ssoma/menu.html'; //indica  la pagina(url) a  que se debe regresar
          actualPageSystemSoma = url;
        }

        if (url == "view/ssoma/plan-anual/gestionPlanAnual.html") //@caracas1348 andy SP3 SSOMA 2021
        {
          // alert(title+'iiiiiiiiiiiiiiiii');
          $("#regresar").show();
          $("#textTilteModule").show();
          $("#logoCompany").hide();
          $("#textTilteModule").text(title);

          backPageSystemSoma = 'view/ssoma/menu.html';
          actualPageSystemSoma = url;
        }

        if (url == "view/ssoma/incidente-accidente/gestionAccidenteIncidente.html") //view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
        {
          //alert(title+'iiiiiiiiiiiiiiiiioooooooooooo');
          $("#regresar").show();
          $("#textTilteModule").show();
          $("#logoCompany").hide();
          $("#textTilteModule").text(title);

          backPageSystemSoma = 'view/ssoma/menu.html'; //indica  la pagina(url) a  que se debe regresar
          actualPageSystemSoma = url;
        }


        if (url == "view/sho-hce/menu.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
        {
          //alert(title+'iiiiiii00000000000000000000');
          $("#regresar").hide();
          $("#textTilteModule").show();
          $("#logoCompany").hide();
          //$("#textTilteModule").text(title);
          $("#logoCompany1").html("SALUD E HIGIENE <a style='color:#ffffff !important; font-size: 19px !important;' >OCUPACIONAL</a>");
          backPageSystemSoma = 'view/sho-hce/menu.html'; //indica  la pagina(url) a  que se debe regresar
          actualPageSystemSoma = url;
          backTitle = '';
        }

        if (url == "view/sho-hce/historia_clinica/gestionHistoriaClinica.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
        {
          //alert(title+'iiiiiii00000000000000000000-1233');
          $("#regresar").show();
          $("#textTilteModule").show();
          $("#logoCompany").hide();
          $("#logoCompany1").html("<b>" + title + "</b>");
          backPageSystemSoma = 'view/sho-hce/menu.html'; //indica  la pagina(url) a  que se debe regresar
          actualPageSystemSoma = url;
        }

        if (url == "view/sho-hce/historia_clinica/nuevaHistoriaClinica.html") {
          $("#regresar").show();
          $("#textTilteModule").show();
          $("#logoCompany").hide();
          $("#logoCompany1").html("<b style='width: 340px !important;'>" + title + "</b>");
          backPageSystemSoma = 'view/sho-hce/historia_clinica/gestionHistoriaClinica.html';
          actualPageSystemSoma = url;
          backTitle = "Historia clínica electrónica";
        }

        if (url == "view/sho-hce/historia_clinica/datosGenerales.html") {
          $("#regresar").show();
          $("#textTilteModule").show();
          $("#logoCompany").hide();
          $("#logoCompany1").html("<b style='width: 340px !important;'>" + title + "</b>");
          backPageSystemSoma = 'view/sho-hce/historia_clinica/gestionHistoriaClinica.html';
          actualPageSystemSoma = url;
          backTitle = "Historia clínica electrónica";
        }

        if (url == "view/sho-hce/interconsultas_transferencias/gestionInterconsultasTransferencia.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
        {
          // alert(title+'iiiiiii00000000000000000000-879');
          $("#regresar").show();
          $("#textTilteModule").show();
          $("#logoCompany").hide();

          $("#logoCompany1").html("<b style='width: 340px !important;'>" + title + "</b>");
          backPageSystemSoma = 'view/sho-hce/menu.html'; //indica  la pagina(url) a  que se debe regresar
          actualPageSystemSoma = url;

        }


        if (url == "view/sho-hce/interconsultas_transferencias/formularioTransferenciasVer.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
        {
          // alert(title+'= -879 = '+url);



          $("#regresar").show();
          $("#textTilteModule").show();
          $("#logoCompany").hide();

          $("#logoCompany1").html("<b style='width: 340px !important;'>" + title + "</b>");
          backPageSystemSoma = 'view/sho-hce/interconsultas_transferencias/gestionInterconsultasTransferencia.html';
          actualPageSystemSoma = url;
          backTitle = "Registro de interconsultas y transferencias";
        }

        if (url == "view/sho-hce/interconsultas_transferencias/formularioTransferenciaEditar.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
        {

          $("#regresar").show();
          $("#textTilteModule").show();
          $("#logoCompany").hide();

          $("#logoCompany1").html("<b style='width: 340px !important;'>" + title + "</b>");
          backPageSystemSoma = 'view/sho-hce/interconsultas_transferencias/gestionInterconsultasTransferencia.html';
          actualPageSystemSoma = url;
          backTitle = "Registro de interconsultas y transferencias";
        }

        if (url == "view/sho-hce/interconsultas_transferencias/formularioInterconsultasEditar.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
        {

          $("#regresar").show();
          $("#textTilteModule").show();
          $("#logoCompany").hide();

          $("#logoCompany1").html("<b style='width: 340px !important;'>" + title + "</b>");
          backPageSystemSoma = 'view/sho-hce/interconsultas_transferencias/gestionInterconsultasTransferencia.html';
          actualPageSystemSoma = url;
          backTitle = "Registro de interconsultas y transferencias";
        }

        if (url == "view/sho-hce/interconsultas_transferencias/formularioInterconsultasVer.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
        {

          $("#regresar").show();
          $("#textTilteModule").show();
          $("#logoCompany").hide();

          $("#logoCompany1").html("<b style='width: 340px !important;'>" + title + "</b>");
          backPageSystemSoma = 'view/sho-hce/interconsultas_transferencias/gestionInterconsultasTransferencia.html';
          actualPageSystemSoma = url;
          backTitle = "Registro de interconsultas y transferencias";
        }

        if (url == "view/sho-hce/interconsultas_transferencias/datosInterconsultasTransferencias.html") {
          $("#regresar").show();
          $("#textTilteModule").show();
          $("#logoCompany").hide();

          $("#logoCompany1").html("<b style='width: 340px !important;'>" + title + "</b>");
          backPageSystemSoma = 'view/sho-hce/historia_clinica/datosGenerales.html';
          actualPageSystemSoma = url;
        }



      if (url == "view/sho-hce/atenciones_medicas/gestionAtencionesMedicasBandeja.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
        {
          // alert(title+'iiiiiii00000000000000000000-879');
          $("#regresar").show();
          $("#textTilteModule").show();
          $("#logoCompany").hide();

          $("#logoCompany1").html("<b style='width: 340px !important;' >" + title + "</b>");
          backPageSystemSoma = 'view/sho-hce/menu.html'; //indica  la pagina(url) a  que se debe regresar
          actualPageSystemSoma = url;
        }

        
      if (url == "view/sho-hce/descansos_medicos/gestionDescansoMedicoBandeja.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
        {
           //alert(title+'iiiiiii00000000000000000000-879');
          $("#regresar").show();
          $("#textTilteModule").show();
          $("#logoCompany").hide();

          $("#logoCompany1").html("<b style='width: 340px !important;' >" + title + "</b>");
          backPageSystemSoma = 'view/sho-hce/menu.html'; //indica  la pagina(url) a  que se debe regresar
          actualPageSystemSoma = url;
        }

      if (url == "view/sho-hce/descansos_medicos/Ver_DescansoMedico_HC.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {
        // alert(title+'iiiiiii00000000000000000000-879');
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;' >" + title + "</b>");
        //backPageSystemSoma = 'view/sho-hce/historia_clinica/gestionHistoriaClinica.html'; //indica  la pagina(url) a  que se debe regresar
         backPageSystemSoma = 'view/sho-hce/descansos_medicos/gestionDescansoMedicoBandeja.html'; 
        actualPageSystemSoma = url;

         backTitle = "Registro de Descansos Médicos";
      }

      if (url == "view/sho-hce/descansos_medicos/nuevoDescanzoMedico_HC.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {
        // alert(title+'iiiiiii00000000000000000000-879');
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;' >" + title + "</b>");
        backPageSystemSoma = 'view/sho-hce/historia_clinica/gestionHistoriaClinica.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;
      }

      if (url == "view/sho-hce/descansos_medicos/vincularDM_SAP.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {
        // alert(title+'iiiiiii00000000000000000000-879');
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;' >" + title + "</b>");
        backPageSystemSoma = 'view/sho-hce/descansos_medicos/gestionDescansoMedicoBandeja.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;
        backTitle = "Registro de Descansos Médicos";
      }

      if (url == "view/sho-hce/enfermedades_cronicas/gestionDescanso.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {
        // alert(title+'iiiiiii00000000000000000000-879');
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;' >" + title + "</b>");
        backPageSystemSoma = 'view/sho-hce/enfermedades_cronicas/gestionEnfermedadCronica.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;
      }

      if (url == "view/sho-hce/enfermedades_cronicas/gestionInterconsulta.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {
        // alert(title+'iiiiiii00000000000000000000-879');
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;' >" + title + "</b>");
        backPageSystemSoma = 'view/sho-hce/enfermedades_cronicas/gestionEnfermedadCronica.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;
      }

      if (url == "view/sho-hce/enfermedades_cronicas/gestionTransferencia.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {
        // alert(title+'iiiiiii00000000000000000000-879');
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;' >" + title + "</b>");
        backPageSystemSoma = 'view/sho-hce/enfermedades_cronicas/gestionEnfermedadCronica.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;
      }

      if (url == "view/sho-hce/enfermedades_cronicas/gestionEnfermedadCronica.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {
        // alert(title+'iiiiiii00000000000000000000-879');
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;' >" + title + "</b>");
        actualPageSystemSoma = url;
        backPageSystemSoma = 'view/sho-hce/historia_clinica/datosGenerales.html';
        backTitle = "Historia Clínica";
      }

      if (url == "view/sho-hce/enfermedades_cronicas/indexEC.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {
        // alert(title+'iiiiiii00000000000000000000-879');
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;' >" + title + "</b>");
        backPageSystemSoma = 'view/sho-hce/menu.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;
        backTitle = "Registro de Enfermedades Crónicas";
      }

      if(url == "view/sho-hce/accidente_trabajo/nuevoAccidenteTrabajo.html") {
        
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;' >" + title + "</b>");
        backPageSystemSoma = "view/sho-hce/accidente_trabajo/gestionAccidenteTrabajo.html";
        actualPageSystemSoma = url
        backTitle = "Historia clínica electrónica";
      } 
        
      if (url == "view/sho-hce/enfermedades_cronicas/buscarEnfermedadCronica.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {
        // alert(title+'iiiiiii00000000000000000000-879');
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;' >" + title + "</b>");
        backPageSystemSoma = 'view/sho-hce/menu.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;
        backTitle = "Buscar Registro de Enfermedades Crónicas";
        
      }

      if (url == "view/sho-hce/enfermedades_cronicas/detalleEnfermedadCronica.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {
        // alert(title+'iiiiiii00000000000000000000-879');
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;' >" + title + "</b>");
        backPageSystemSoma = 'view/sho-hce/enfermedades_cronicas/buscarEnfermedadCronica.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;
      }

      if (url == "view/sho-hce/enfermedades_cronicas/verDescanso.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {
        // alert(title+'iiiiiii00000000000000000000-879');
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;' >" + title + "</b>");
        backPageSystemSoma = 'view/sho-hce/enfermedades_cronicas/detalleEnfermedadCronica.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;
        backTitle = "Detalle del registro enfermedades crónicas";
      }

      if (url == "view/sho-hce/enfermedades_cronicas/verTransferencia.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {
        // alert(title+'iiiiiii00000000000000000000-879');
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;' >" + title + "</b>");
        backPageSystemSoma = 'view/sho-hce/enfermedades_cronicas/detalleEnfermedadCronica.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;
        backTitle = "Detalle del registro enfermedades crónicas";
      }

      if (url == "view/sho-hce/enfermedades_cronicas/verInterconsulta.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {
        // alert(title+'iiiiiii00000000000000000000-879');
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b style='width: 340px !important;' >" + title + "</b>");
        actualPageSystemSoma = url;

        if(controlNavHistoria)
        {

          backPageSystemSoma = 'view/sho-hce/historia_clinica/datosGenerales.html';
          backTitle = "Historia Clínica";

        }
        else
        {

          backPageSystemSoma = 'view/sho-hce/enfermedades_cronicas/detalleEnfermedadCronica.html';
          backTitle = "Detalle del registro enfermedades crónicas";

        }

      }


      if (url == "view/sho-hce/enfermedades_cronicas/editarEnfermedadCronica.html") // "view/sho-hce/salud_ocupacional/gestionSaludOcupacional.html"               view/ssoma/incidente-accidente/gestionAccidenteIncidente.html
      {
        // alert(title+'iiiiiii00000000000000000000-879');
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();
        
        $("#logoCompany1").html("<b style='width: 340px !important;' >" + title + "</b>");
        actualPageSystemSoma = url;
        backPageSystemSoma = 'view/sho-hce/historia_clinica/datosGenerales.html';
        backTitle = "Historia Clínica";

      }
            
      if( url == "view/sho-hce/accidente_trabajo/gestionAccidenteTrabajoPrincipal.html"){
        
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();

        $("#logoCompany1").html("<b>" + title + "</b>");
        backPageSystemSoma = 'view/sho-hce/menu.html'; //indica  la pagina(url) a  que se debe regresar
        actualPageSystemSoma = url;

      }





        //se oculta loading
        setTimeout(function() {
          $("#splashLoading").fadeOut();
        }, 1000)

      }

    });
    showNameVisit(); // mustra nombre de tipo de visita
  }
}

function toCapitalize(str) {
  if (!isNaN(str))
    return str;

  if (str) {
    str = trimString(str);
    return str
      .toLowerCase()
      .split(' ')
      .map(function(word) {

        if (word[0])
          return (word[0].toUpperCase() + word.substr(1) == 'undefined' ? '' : word[0].toUpperCase() + word.substr(1));
        else
          return (word[0] + word.substr(1) == 'undefined' ? '' : word[0] + word.substr(1));
      })
      .join(' ');
  }
  return '-';
}

function trimString(string) {

  if (!isNaN(string))
    return string;

  return string.replace(/^\s*|\s*$/g, '');
}

function validaSoloLetras(id) {
  if ($("#" + id).val().match(/[^a-z\áéíóúÁÉÍÓÚñ ]/)) {
    $("#" + id).val($("#" + id).val().replace(/[^a-z\áéíóúÁÉÍÓÚñ ]/gi, ""))
  }
}
//#########################################Funcion encargada de validar que solo se introduzcan numeros
function validaSoloNumeros(id) //leandro
{

  if ($("#" + id).val().match(/[^0-9\ ]/)) {
    $("#" + id).val($("#" + id).val().replace(/[^0-9\ ]/gi, ""))
  }
}
//#########################################Funcion encargada de validar que solo se introduzcan numeros
function validaFecha(id) //leandro
{

  if ($("#" + id).val().match(/[^0-9\- ]/)) {
    $("#" + id).val() = $("#" + id).val().replace(/[^0-9\- ]/gi, "")
  }
}
//#########################################Funcion encargada de validar  numeros de telefonos(permite numeros guion y parentesis)
function validarTelefono(id) //leandro
{
  if ($("#" + id).val().match(/[^0-9()\ -]/)) {
    $("#" + id).val() = $("#" + id).val().replace(/[^0-9()\- ]/gi, "")
  }
}
//#########################################Funcion encargada de validar  numeros de telefonos(permite numeros guion y parentesis)
function validaPlaca(id) //leandro
{
  if ($("#" + id).val().match(/[^a-z1234567890\- ]/)) {
    $("#" + id).val() = $("#" + id).val().replace(/[^a-z1234567890\- ]/gi, "")
  }
}
//#########################################Funcion encargada de validar  numeros de telefonos(permite numeros guion y parentesis)
function validarMoneda(id) //leandro
{

  if ($("#" + id).val().match(/[^0-9()\. ]/)) {
    $("#" + id).val() = $("#" + id).val().replace(/[^0-9()\. ]/gi, "")
  }


}

function validarPeso(id) //leandro
{
  if (xGetElementById(id).value.match(/[^0-9()\ ,]/)) {
    xGetElementById(id).value = xGetElementById(id).value.replace(/[^0-9()\, ]/gi, "")
  }
}



function tiene_numeros(texto) {
  var numeros = "0123456789";
  for (i = 0; i < texto.length; i++) {
    if (numeros.indexOf(texto.charAt(i), 0) != -1) {
      return 1;
    }
  }
  return 0;
}

function checkFotmatFind(text) {

  const patronPlaca = /^[A-Z0-9]{6}$/;
  var numeric = /^[0-9]+$/;
  const regexnex1 = /^\*\d{4}$/g;
  const regexnex2 = /^\d{3}\*\d{4}$/g;
  const regexnex3 = /^\d{15,16}$/g;
  const regexcam = /^\*{2}$/g;
  const regexphone = /^\d{7,9}$/g;
  const regexnex11 = /^[tT]\d{4,5}$/g;
  const regexnex111 = /^[Ss]\d{1,10}$/g;
  const regexnex1111 = /^[Ss]\w{1}$/g;


  //console.log(tx)
  if (text != "") {
    if (patronPlaca.exec(text.toUpperCase())) //placa
    {
      return 1;
    }
    if (numeric.exec(text)) //document
    {
      return 2;
    }

  }

  return 0;

}


//Funcion para saber si la contraseña es correcta
function checkSoloNumero(value) {
  // Caracteres permitidos
  var caracteres = /^[0-9]+$/;
  var valido = caracteres.test(value);
  if (!valido) {
    return 0;
  }
  return 1;
}

function checkDocumentValidate(idtype, idfield) {

  if ($("#" + idtype).val() == 'dni') {
    if ($("#" + idfield).val().length != 8) {
      return 0;
    }

  }
  if ($("#" + idtype).val() == 'ruc') {
    if ($("#" + idfield).val().length != 11) {
      return 0;
    }
  }
  if ($("#" + idtype).val() == 'pa') {
    if ($("#" + idfield).val().length != 9) {
      return 0;
    }
  }
  if ($("#" + idtype).val() == 'ce') {
    if ($("#" + idfield).val().length != 9) {
      return 0;
    }
  }
  return 1;
}

function showLoading() {

  $(window).resize(function() {
    $('#spinnerLoading').css({
      position: 'absolute',
      //zIndex:'9999',
      left: ($(window).width() - $('#spinnerLoading').outerWidth()) / 2,
      top: ($(window).height() - $('#spinnerLoading').outerHeight()) / 2
    });
    $('#spinnerLoading').css('z-index', 9999);
    $('#spinnerLoading').css('position', 'absolute');

  });

  $(window).resize();
  $(function() {
    //$( "#divLAstPositions" ).draggable();
  });

  $("#spinnerLoading").fadeIn()
}

function hideLoading() {
  $("#spinnerLoading").fadeOut()
}

function selectAreaUser(idLocation) {
  return
  $("#listGaritaSelectedUSer").empty();
  $("#listGaritaSelectedUSer").text("Cargando...");
  $("#listGaritaSelectedUSerload").show();
  var name_area = $("#listSedeSelectedUSer  option:selected").text();
  //var cod_area  = $("#listSedeSelectedUSer").val();
  $("#sedeHeader").text(name_area);
  $("#hid_sede").val(idLocation);
  if (idLocation != 0 && getCookie("vtas_rolexternalrol" + sessionStorage.tabVisitasa) == "ROL_SEGURIDAD") {
    setTimeout(function() { vw_access_event.reloadListRecent(); }, 1000);
  }

  var url = apiurlaccessrequest + "/api/Get-Garita-All?httpmethod=objectlist&code=" + GetGaritaAll + "&id_location=" + idLocation;
  var headers = {
    "apikey": "r$3#23516ewew5"
  }
  $.ajax({
    method: "POST",
    url: url,
    headers: headers,
    crossDomain: true,
    dataType: "json",
  }).done(function(data) {
    $("#listGaritaSelectedUSer").append("<option value='0'>Seleccionar</option>");
    //jsonLocation=[];
    //console.log(data)
    if (data.length == 1) //si es unica garita, la seleccion
    {
      $("#listGaritaSelectedUSer").empty();
      $("#listGaritaSelectedUSer").append(`<option value='${data[0].id}'>${data[0].name}</option>`);

      //var name_area = $("#listGaritaSelectedUSer  option:selected").text();
      $("#garitaHeader").text(data[0].name);

      if (getCookie("vtas_garita" + sessionStorage.tabVisitasa) && getCookie("vtas_garita" + sessionStorage.tabVisitasa) != "") {
        $("#listGaritaSelectedUSer").val(getCookie("vtas_garita" + sessionStorage.tabVisitasa))
        selectGarUser();
      }
      $("#listGaritaSelectedUSerload").hide();
      return;
    }

    data.map(function(item) {
      $("#listGaritaSelectedUSer").append(`<option value='${item.id}'>${item.name}</option>`);

      //jsonLocation.push(item);

    });

    if (getCookie("vtas_garita" + sessionStorage.tabVisitasa) && getCookie("vtas_garita" + sessionStorage.tabVisitasa) != "") {

      $("#listGaritaSelectedUSer").val(getCookie("vtas_garita" + sessionStorage.tabVisitasa))
      selectGarUser();
    }
    $("#listGaritaSelectedUSerload").hide();
  }).fail(function(jqXHR, textStatus, errorThrown) {

    //showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
    console.log(errorThrown)
    $("#listGaritaSelectedUSerload").hide();
  });;

}

function selectGarUser(idGar) {
  var name_area = $("#listGaritaSelectedUSer  option:selected").text();
  $("#garitaHeader").text(name_area);
}

var getLocationsUsers = function() {
  $("#listSedeSelectedUSer").empty();
  $("#listSedeSelectedUSer").text("Cargando...");
  $("#listSedeSelectedUSerload").show();
  jsonLocation = [];

  var url = apiurlaccessrequest + "/api/Get-Locations-All?httpmethod=objectlist&code=" + GetLocationsAll + "";
  var headers = {
    "apikey": "r$3#23516ewew5"
  }
  $.ajax({
    method: "POST",
    url: url,
    headers: headers,
    crossDomain: true,
    dataType: "json",
  }).done(function(data) {
    $("#listSedeSelectedUSer").append("<option value='0'>Sin Sede</option>");
    data.map(function(item) {
      if (item.flag_sede == 1)
        $("#listSedeSelectedUSer").append(`<option value='${item.id}'>${item.name}</option>`);

      jsonLocation.push(item);

    });



    if (getCookie("vtas_sede" + sessionStorage.tabVisitasa) && getCookie("vtas_sede" + sessionStorage.tabVisitasa) != "") {
      $("#listSedeSelectedUSer").val(getCookie("vtas_sede" + sessionStorage.tabVisitasa))
      selectAreaUser(getCookie("vtas_sede" + sessionStorage.tabVisitasa))
    }

    $("#listSedeSelectedUSerload").hide();
  }).fail(function(jqXHR, textStatus, errorThrown) {

    showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
    console.log(errorThrown)
    $("#listSedeSelectedUSerload").hide();
  });
}

function checkDevice() {

  var isMobile = {
    mobilecheck: function() {
      return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|silk/i.test(navigator.userAgent || navigator.vendor || window.opera) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((navigator.userAgent || navigator.vendor || window.opera).substr(0, 4)))
    }
  }

  if (isMobile.mobilecheck()) {
    return ("Mobile")
  } else {
    return ("Desktop")
  }
}

function validateDateRequest(value, leng) {

  const regdate = /^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/g; //dd/mm/yyyy
  const regdate2 = /^(?:0?[1-9]|1[1-2])([\-/.])(3[01]|[12][0-9]|0?[1-9])\1\d{4}$/g; //mm/dd/yyyy
  const regdate3 = /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/g; //dd/mm/yyyy
  const regexnex2 = /^\d{3}\*\d{4}$/g;
  const regexnex3 = /^\d{15,16}$/g;
  const regexcam = /^\*{2}$/g;
  const regexphone = /^\d{7,9}$/g;
  const regexnex11 = /^[tT]\d{4,5}$/g;
  const regexnex111 = /^[Ss]\d{1,10}$/g;
  const regexnex1111 = /^[Ss]\w{1}$/g;


  if (regdate.exec(value)) //dd/mm/yyyy
  {
    return (value);
  } else if (regdate2.exec(value)) //mm/dd/yyyy
  {

    return ('');
  } else if (regdate3.exec(value)) //dd/mm/yyyy
  {
    return ('');
  } else {
    return ('');
  }


}

function showOriginCall(value) {
  var origenInicial = $("#txOrigenRequest").val();
  if (value == "sereno") {
    $("#txOrigenRequest").val(1);
    tipoLlamada = 1;

  } else {
    var tx = $('#txPhoneRequest').val();

    const regexnex1 = /^\*\d{4}$/g;
    const regexnex2 = /^\d{3}\*\d{4}$/g;
    const regexnex3 = /^\d{15,16}$/g;
    const regexcam = /^\*{2}$/g;
    const regexphone = /^\d{7,9}$/g;
    const regexnex11 = /^[tT]\d{4,5}$/g;
    const regexnex111 = /^[Ss]\d{1,10}$/g;
    const regexnex1111 = /^[Ss]\w{1}$/g;


    //console.log(tx)
    if (tx != "") {
      if (regexcam.exec(tx)) {
        $("#txOrigenRequest").val(2);
        tipoLlamada = 2;
      } else if (regexnex1.exec(tx) || regexnex11.exec(tx) || regexnex111.exec(tx) || tx == "S" || tx == "s") {

        $("#txOrigenRequest").val(1);
        tipoLlamada = 1;
      } else if (regexnex2.exec(tx)) {

        $("#txOrigenRequest").val(1);
        tipoLlamada = 1;
      } else if (regexnex3.exec(tx)) {

        $("#txOrigenRequest").val(1);
        tipoLlamada = 1;
      } else if (regexphone.exec(tx)) {
        $("#txOrigenRequest").val(3);
        tipoLlamada = 3;
      } else {
        tipoLlamada = null;
        $('#txFirstNameRequest').val("");
        $('#txPhoneRequest').val("");
        $("#txOrigenRequest").val("");
        $('#txPhoneRequest').focus();
      }

      if (origenInicial == 6) {
        $("#txOrigenRequest").val(6);
      }
    }


  }

}

function minutos_a_horas(min) {
  var hrs = Math.floor(min / 60);
  min = parseInt(min % 60);
  if (min < 10) min = "0" + min;
  return hrs + "h " + min + "m";
}

document.onkeydown = enterFocus;

function enterFocus(evt) {

  if (evt.which == 13) {

    if ($('#documentSecuryin').is(":focus")) {
      accceptLocations();
      vw_access_event.tableListRecent();
      return;
    }
    if ($('#tx_finded').is(":focus")) {
      vw_covid_list.getDocument()

      return;
    }



  }

}

function formatDateTime(fecha, format, timezone, time) {
  if (format == 1)
    format = 'DD/MM h:mm:ss a';
  if (format == 13)
    format = 'DD/MM h:mm a';
  if (format == 2)
    format = 'DD/MM/YYYY h:mm:ss a';
  if (format == 3)
    format = 'DD-MM-YYYY h:mm:ss a';
  if (format == 17)
    format = 'YYYY-MM-DD HH:MM';
  if (format == 4)
    format = 'h:mm:ss a';
  if (format == 5)
    format = 'DD/MM';
  if (format == 6)
    format = 'DD-MM';
  if (format == 7)
    format = 'DD MMM, h:mm:ss a';
  if (format == 14)
    format = 'dddd, DD [de] MMMM';
  if (format == 8)
    format = 'h:mm a';
  if (format == 15)
    format = 'HH:mm';
  if (format == 16)
    format = 'DD/MM/YYYY';
  if (format == 9) {
    fecha = moment(fecha, "DD-MM-YYYY h:mm A").format("YYYY-MM-DD HH:mm");
    return fecha;
  }
  if (format == 12) {
    fecha = moment(fecha, "DD-MM-YYYY HH:mm").format("YYYY-MM-DD HH:mm");
    return fecha;
  }
  if (format == 10) {
    fecha = moment('2000-01-01 00:00:00').add(moment.duration(fecha * 1000)).format('HH:mm:ss');
    return fecha;
  }
  if (format == 11) {
    fecha = moment('2000-01-01 00:00:00').add(moment.duration(fecha * 1000)).format('H [Hr] mm [Min]');
    return fecha;
  }

  if (fecha == "" || !fecha)
    return '-';
  fecha = fecha.substring(0, 19)
  const fotmatT = /^\d{4}-\d{2}-\d{2}T\w{2}:\w{2}:\w{2}/g;
  const fotmatSpace = /^\d{4}-\d{2}-\d{2} \w{2}:\w{2}:\w{2}/g;

  if (fotmatT.exec(fecha)) {
    //console.log("T")
    fecha = fecha.split('T');
  } else if (fotmatSpace.exec(fecha)) {
    //console.log("Space")
    fecha = fecha.split(' ');
  } else { //segundos


  }


  //var fecha='2012/08/21 16:15:19'
  //console.log(fecha)

  fecha1 = fecha[0].split('-');
  fecha2 = fecha1[0] + '/' + fecha1[1] + '/' + fecha1[2] + ' ' + fecha[1];



  var timeZone = (new Date().getTimezoneOffset() / 60) * (-1);
  var timezonemin = new Date().getTimezoneOffset();

  //alert(timeZone)


  if (timezone)
    var sumtimezonemin = timeZone * 1000 * 60 * 60; //convierto a mili segundos la zona horaria
  else
    var sumtimezonemin = 0; //convierto a mili segundos la zona horaria

  var aja = new Date(fecha2);

  dia = aja.getDate();
  mes = aja.getMonth() + 1;
  anio = aja.getYear();
  var timmili = aja.getTime();
  //alert(aja)
  var aja1 = new Date(timmili + (sumtimezonemin));

  dia = aja1.getDate();
  mes = aja1.getMonth();
  anio = aja1.getFullYear();
  h = aja1.getHours();
  m = aja1.getMinutes();
  s = aja1.getSeconds();


  if (mes == 0) { mes = '01'; } else if (mes == 1) { mes = '02'; } else if (mes == 2) { mes = '03'; } else if (mes == 3) { mes = '04'; } else if (mes == 4) { mes = '05'; } else if (mes == 5) { mes = '06'; } else if (mes == 6) { mes = '07'; } else if (mes == 7) { mes = '08'; } else if (mes == 8) { mes = '09'; } else if (mes == 9) { mes = '10'; } else if (mes == 10) { mes = '11'; } else if (mes == 11) { mes = '12'; }

  if (dia == 1) { dia = '01'; } else if (dia == 2) { dia = '02'; } else if (dia == 3) { dia = '03'; } else if (dia == 4) { dia = '04'; } else if (dia == 5) { dia = '05'; } else if (dia == 6) { dia = '06'; } else if (dia == 7) { dia = '07'; } else if (dia == 8) { dia = '08'; } else if (dia == 9) { dia = '09'; }

  if (h == 1) { h = '01'; } else if (h == 2) { h = '02'; } else if (h == 3) { h = '03'; } else if (h == 4) { h = '04'; } else if (h == 5) { h = '05'; } else if (h == 6) { h = '06'; } else if (h == 7) { h = '07'; } else if (h == 8) { h = '08'; } else if (h == 9) { h = '09'; } else if (h == 0) { h = '00'; }

  if (m == 1) { m = '01'; } else if (m == 2) { m = '02'; } else if (m == 3) { m = '03'; } else if (m == 4) { m = '04'; } else if (m == 5) { m = '05'; } else if (m == 6) { m = '06'; } else if (m == 7) { m = '07'; } else if (m == 8) { m = '08'; } else if (m == 9) { m = '09'; } else if (m == 0) { m = '00'; }

  if (s == 1) { s = '01'; } else if (s == 2) { s = '02'; } else if (s == 3) { s = '03'; } else if (s == 4) { s = '04'; } else if (s == 5) { s = '05'; } else if (s == 6) { s = '06'; } else if (s == 7) { s = '07'; } else if (s == 8) { s = '08'; } else if (s == 9) { s = '09'; } else if (s == 0) { s = '00'; }


  if (time) {

    return (moment(anio + '-' + mes + '-' + dia + ' ' + h + ':' + m + ':' + s).locale('es').format(format));
  } else
    return (moment(anio + '-' + mes + '-' + dia + ' ' + h + ':' + m + ':' + s).locale('es').format(format));


}

var updateSelectExternalCompanyVehicle = function(pos) {
  //
  // alert($('#modalShowRequestDetails').is(':visible') +" "+$('#modalShowRequestNP').is(':visible'));

  var option = "<option value='0'></option>";
  jsonExternalCompanySelected.map(function(item) {
    option += "<option value='" + item.val + "'>" + toCapitalize(item.text) + "</option>";
  });
  $("#list_vehicles form").each(function() {
    $(this).find('.external-company-vehicle').each(function() {

      //if(!$(this).val()){
      //var idinput=$(this).attr("id");
      if (pos) {
        $("#sel_company_vehicle_" + pos).html(option);

        if ($("#relojContadorVisita")[0]) {
          //alert("relojContadorVisita");
          $("#sel_company_vehicle_" + pos).select2({
            language: {
              noResults: function() {
                return "No hay resultado";
              },
              searching: function() {
                return "Buscando..";
              }
            },
            dropdownParent: $("#modalShowRequestNP")
          });
        }
        if ($('#modalShowRequestDetails').is(':visible')) //$("#modalShowRequestDetails")[0] -- $('#modalShowRequestDetails').is(':visible')
        {
          //alert("modalShowRequestDetails");
          $("#sel_company_vehicle_" + pos).select2({
            language: {
              noResults: function() {
                return "No hay resultado";
              },
              searching: function() {
                return "Buscando..";
              }
            },
            dropdownParent: $("#modalShowRequestDetails")
          });
        } else if ($('#modalShowRequestNP').is(':visible')) //$("#modalShowRequestDetails")[0] -- $('#modalShowRequestDetails').is(':visible')
        {
          //alert("modalShowRequestNP");
          $("#sel_company_vehicle_" + pos).select2({
            language: {
              noResults: function() {
                return "No hay resultado";
              },
              searching: function() {
                return "Buscando..";
              }
            },
            dropdownParent: $("#modalShowRequestNP")
          });
        } else {
          //alert("else");
          $("#sel_company_vehicle_" + pos).select2({
            language: {
              noResults: function() {
                return "No hay resultado";
              },
              searching: function() {
                return "Buscando..";
              }
            }
          });
        }
      } else {
        $(this).html(option);

        if ($("#relojContadorVisita")[0]) {
          //alert("relojContadorVisita 2")
          $(this).select2({
            language: {
              noResults: function() {
                return "No hay resultado";
              },
              searching: function() {
                return "Buscando..";
              }
            },
            dropdownParent: $("#modalShowRequestNP")
          });
        }

        if ($('#modalShowRequestDetails').is(':visible')) //else if($("#modalShowRequestDetails")[0])
        {
          //alert("modalShowRequestDetails 2")
          $(this).select2({
            language: {
              noResults: function() {
                return "No hay resultado";
              },
              searching: function() {
                return "Buscando..";
              }
            },
            dropdownParent: $("#modalShowRequestDetails")
          });
        } else if ($('#modalShowRequestNP').is(':visible')) //$("#modalShowRequestDetails")[0] -- $('#modalShowRequestDetails').is(':visible')
        {
          //alert("modalShowRequestNP 2")
          $("#sel_company_vehicle_" + pos).select2({
            language: {
              noResults: function() {
                return "No hay resultado";
              },
              searching: function() {
                return "Buscando..";
              }
            },
            dropdownParent: $("#modalShowRequestNP")
          });
        } else {
          //alert("else 2")
          $(this).select2({
            language: {
              noResults: function() {
                return "No hay resultado";
              },
              searching: function() {
                return "Buscando..";
              }
            }
          });
        }
      }
      //}
    });
  });
}
var updateListCompanySelect = function() {
  var stop = 0;
  jsonExternalCompanySelected = [];
  $("#list_participantes form").each(function() {
    $(this).find('.external-company').each(function() {

      var json = {
        text: $(this).select2('data')[0]['text'],
        val: $(this).val()
      }
      $.each(jsonExternalCompanySelected, function(i, v) {
        console.log(v.val + "==" + json.val);
        if (v.val == json.val) {
          stop = 1;
          return;
        }
      });
      if (stop == 0)
        jsonExternalCompanySelected.push(json);
      stop = 0;
    });
  });
  updateSelectExternalCompanyVehicle();
  updateSelectExternalCompanyTool();
}
var updateSelectExternalCompanyTool = function(pos) {
  var option = "<option value='0'></option>";
  jsonExternalCompanySelected.map(function(item) {
    option += "<option value='" + item.val + "'>" + toCapitalize(item.text) + "</option>";
  });
  var parent = '';
  if ($("#modalShowRequestDetails")[0])
    var parent = `dropdownParent: $("#modalShowRequestDetails")`

  $("#list_tools form").each(function() {
    $(this).find('.external-company-tool').each(function() {
      if (pos) {
        $("#sel_company_tool_" + pos).html(option);
        if ($('#modalShowRequestDetails').is(':visible')) //if($("#modalShowRequestDetails")[0])
        {
          $("#sel_company_tool_" + pos).select2({
            language: {
              noResults: function() {
                return "No hay resultado";
              },
              searching: function() {
                return "Buscando..";
              }
            },
            dropdownParent: $("#modalShowRequestDetails")
          });
        } else {
          $("#sel_company_tool_" + pos).select2({
            language: {
              noResults: function() {
                return "No hay resultado";
              },
              searching: function() {
                return "Buscando..";
              }
            }
          });
        }
      } else {
        $(this).html(option);
        if ($('#modalShowRequestDetails').is(':visible')) //if($("#modalShowRequestDetails")[0])
        {
          $(this).select2({
            language: {
              noResults: function() {
                return "No hay resultado";
              },
              searching: function() {
                return "Buscando..";
              }
            },
            dropdownParent: $("#modalShowRequestDetails")
          });
        } else {
          $(this).select2({
            language: {
              noResults: function() {
                return "No hay resultado";
              },
              searching: function() {
                return "Buscando..";
              }
            }
          });
        }
      }
      //}
    });
  });
}

var addDriverToVehicle = function(obj) {
  var drivers = [];
  $("#list_participantes form").each(function() {

    var values = [];
    $(this).find('.form-control').each(function() {
      var value = $(this).val();
      values.push(value);
    });
    drivers.push(values);
  });

  $("#list_vehicles form").each(function() {

    var cont = 0;
    $(this).find('.form-control').each(function() {
      cont++; //para tomar el objeto de la lista de conductores

      if (cont == 2) {
        var obj = $(this);
        obj.empty();
        //se cargan en los select los driver disponibles de la lista
        drivers.map(values => {
          if (values[3] != '' || values[3] != null) //si es correo es diferente de vacio se agregan los contactos---- Ahora es por dni
          {
            obj.append('<option data-nuevo="1" value="' + values[3] + '">' + values[4] + ' ' + values[5] + '</option>');
          } else {
            obj.find("option[value='" + values[5] + "']").prop('hidden', false);
          }

        })
      }

    });

  });
}