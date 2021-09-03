/****************************************************************************************
 * VISUAL SAT - [2021]
 * PROYECTO : SIGTASA
 * ESQUEMA : SSOMA
 * SPRINT  : 3
 * MODULO : HISTORIA CLINICA
 * OPERADORES_________________________________________________________________________
 * | # | PROGRAMADOR     |  |      FECHA   |  |   HORA   |           CORREO           |
 * | 1 | Andy Vàsquez    |  |   28/08/2021 |  | 10:16:00 |     caracas1348@gmail.com  |
 * |___|_________________|__|______________|__|__________|____________________________|
 *
 * DESCRIPCION: ARCHIVO FRONT DE FUNCIONALIDAD EN CLIENTE DE LAS OPCIONES DE LAS INTERCONSULTAS Y TRASNFERENCIAS
 * EN EL FRONT END ACCIDENTES- (LISTADO, FILTRADO, VER)
 *
 * ARCHIVOS DE SERVICIOS   _________________________________________
 * | # |     MODULO             |  |         NOMBRE                 |
 * | 1 |   SALUD OCUPACIONAL    |  |     Get-                       |
 * |________________________________________________________________|
 *
 * VERSION: 0.1 Beta
 *******************************************************************************************/


function HistoriaClinica() {

  this.a = [];

  HistoriaClinica.prototype.cargarData = function(data) {
    this.a = data;
    // // this.a.II;
    // this.a.II_BD = 0;//estado inicial, se puede ir al servidor a buscar la informacion.
  }

}


//--------------------------VARIABLES GLOBALES------------------------------//
var paObj_hc = [];
var HTMLEXCEL = '';



























function _init_fnSp3SaludOcupacionalEstadoInicial() { //------------------------------------- ini   _init_fnSp3SaludOcupacionalEstadoInicial() -------------------------------------
  console.clear();
  //showLoading();
  console.log("Arrancamos............................ _init_fnSp3SaludOcupacionalEstadoInicial");
  // $('#regresar').css('visibility', 'visible');
  // $('#regresar').css('display', 'block');

  // $('#regresar').show();

  fnSp3CargaListasHistoriaClinica();



} //------------------------------------- fini   _init_fnSp3SaludOcupacionalEstadoInicial() -------------------------------------









function fnSp3CargaFiltroEstadoInicialSaludOcupacional() { //------------------------------------- ini   fnSp3CargaFiltroEstadoInicialSaludOcupacional() -------------------------------------
  showLoading();

  var body = { "AreaId_Empresa_H": 0, "SedeId_Empresa_H": 0 }

  //var url = apiUrlShoHce+"/api/Get-Incidente-AccidenteWeb?code=GY7/yooa3Zl5sKu7zgakDbaCn4uvOKXjfwe/JkbSuIwDPOs/baiZFQ==&httpmethod=objectlist&IdTipoEvento="+programa+"&IdEmpresa="+gerencia+"&IdSede="+sedepa+"&FechaInicio="+f1+"&FechaFin="+f2+"&IdEmbarcacion="+estadopa
  var url = "https://5h0-dev-salud.azurewebsites.net/api/hce_Get_001_historia_clinica?code=5lJWTsRDsoxqo9VoOxIzfQAPyCTxUTqLpvgY5tuHluCZlSodpQ/Y7w==";

  console.log("URL", url);
  var headers = { "apiKey": constantes.apiKey, "Content-Type": "application/json" }
  //alert('api = '+constantes.apiKey);

  var a = $('#dat_hc_a_doc').val();
  var b = $('#dat_hc_a_sede').val();
  var c = $('#dat_hc_a_area').val();
  var d = $('#dat_hc_a_buscar').val();

  var settings = {
    "url": url,
    "method": "GET",
    "timeout": 0,
    "crossDomain": true,
    "dataType": "json",
    "headers": headers,
    "data": { "NroDocumento_Trabajador_H": a, "AreaId_Empresa_H": c, "SedeId_Empresa_H": b, "Buscador": d } //JSON.stringify(body)
  };



  $.ajax(settings).done(function(response) {
    console.log("**todos**", response);

    if (response.HistoriaClin.length > 0) {
      $('#cant_hist_cli').html('' + response.HistoriaClin.length + ' registros');
      $('#bodyTablaSinAuditorias').css('display', 'none');

      $('#pagination-container-EvalAud').pagination({
        dataSource: response.HistoriaClin,
        pageSize: 4,
        callback: function(data, pagination) {
          var html = fnSp3ListarTablaGeneralH(data);
          $('#body-tabla-list-EvalAud').html(html);
          // $("#sp3BtFiltroPlanAnual").html("Buscar")
          // $("#sp3BtFiltroPlanAnual").attr("disabled",false);
          // //debemos colocar los campos con su valores de busqueda si existen
          //     $('#sel_filter_programa_p').val(programa);
          //     $('#sel_filter_gerencia_p').val(gerencia);
          //     $('#sel_filter_sede_p').val(sedepa);
          //     $('#sel_filter_estado_p').val(estadopa);
          //     $('#sp3_txt_fecha_desde_p').val(f11)
          //     $('#sp3_txt_fecha_hasta_p').val(f22)

          $('#dat_hc_a_doc').val(a);
          $('#dat_hc_a_sede').val(b);
          $('#dat_hc_a_area').val(c);
        }
      })



    } else {

      hideLoading();
    }



  });







} //------------------------------------- fin   fnSp3CargaFiltroEstadoInicialSaludOcupacional() -------------------------------------


function fnSp3ListarTablaGeneralH(data) { //------------------------------------------------------- ini   fnSp3ListarTablaGeneralH() -----------------------------------

  var html = '';
  var btNew = '';

  data.forEach((Item) => {

    paObj_hc[Item.IdHC] = new HistoriaClinica();
    paObj_hc[Item.IdHC].cargarData(Item);
    //${Item.CodigoPaciente_H != null ? Item.CodigoPaciente_H : "---"}

    $('#dat_hc_a_area').val(Item.AreaId_Empresa_H)
    var AreaId_Empresa_H_S = $('#dat_hc_a_area option:selected').text();

    $('#dat_hc_a_sede').val(Item.SedeId_Empresa_H)
    var SedeId_Empresa_H_S = $('#dat_hc_a_sede option:selected').text();
    var f1 = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.FechaRegistro_Trabajador_H);

    var menupop = `<div class="dropdown">
                                          <button class=" btn-link dropdown textVertical" style='outline:none !important;' id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <label class='textVertical'>...</label>
                                          </button>

                                          
                                            <div class="dropdown-menu">  
                                                  <a class="dropdown-item" onclick="showNuevaHC()"><img src="./images/sho/eyeIcon.svg" alt="" />&nbsp;&nbsp; Ver H.C.</a>
                                                  <a class="dropdown-item" onclick="divEditaHistoria(${Item.IdHC})"><img src="./images/sho/moreIcon.svg" alt="" /> &nbsp;&nbsp; Nueva atención médica</a>
                                                </div>
                                          </div>
                                        </div>
                                      `;



    html += `

                                   <div class="col-md-12"   style=" width:2450px !important;"   >
                                                    <div class="header-tabla px-2 py-3 filaBandeja" style=" width:2420px !important; mmargin-rigth:30px !important; " > 

                                                        <table border="0"  style=" width:2430px !important;  "  >   <!-- <style=" width:1754px !important; -->
                                                            <tr >
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c1TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.CodigoPaciente_H != null ? Item.CodigoPaciente_H : "---"}</div></td> 
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c2TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.NroDocumento_Trabajador_H != null ? Item.NroDocumento_Trabajador_H : "---"}</div></td>
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.Nombres_Trabajador_H != null ? Item.Nombres_Trabajador_H : "---"}</div></td> 
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c3TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.Apellidos_Trabajador_H != null ? Item.Apellidos_Trabajador_H : "---"}</div></td>
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c4TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${AreaId_Empresa_H_S != null ? AreaId_Empresa_H_S : "---"}</div></td>
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c5TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${SedeId_Empresa_H_S != null ? SedeId_Empresa_H_S : "---"}</div></td>

                                                                  <td  style = 'width: 200px;'  align="center"><div id="c6TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.Telefono_Trabajador_H != null ? Item.Telefono_Trabajador_H : "---"}</div></td>
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c7TabGenyx" class="text-center lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${f1 != null ? f1 : "---"}</div></td>
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c8TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.Diagnostico_AM != null ? Item.Diagnostico_AM : "---"}</div></td>
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.Aptitud_AM != null ? Item.Aptitud_AM : "---"}</div></td>  

                                                                  <td  style = 'width: 200px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.FechaUltimoEMO != null ? Item.FechaUltimoEMO : "---"}</div></td>  
                                                                  <td  style = 'width: 190px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.FechaUltimoVMO != null ? Item.FechaUltimoVMO : "---"}</div></td>  
                                                                  <td  style = 'width: 10px;'   align="left"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${menupop}</td>  
                                                                  <td  style = 'width: 20px;'   align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >&nbsp;</td>  

                                                        </table>
                                                    </div>
                                  </div>    

                              `;


    HTMLEXCEL += `<tr  style="border: 1px !important;color: #000;">
                                                                         <th  style="border: 1px !important;">${Item.CodigoPaciente_H}</th> 
                                                                         <th  style="border: 1px !important;">Documento ${Item.NroDocumento_Trabajador_H}</th>
                                                                         <th  style="border: 1px !important;">Nombres ${Item.Nombres_Trabajador_H}</th> 
                                                                         <th  style="border: 1px !important;">Apellidos ${Item.Apellidos_Trabajador_H}</th>
                                                                         <th  style="border: 1px !important;">Áreas ${AreaId_Empresa_H_S}</th>
                                                                         <th  style="border: 1px !important;">Sede ${SedeId_Empresa_H_S}</th>

                                                                         <th  style="border: 1px !important;">Teléfono ${Item.Telefono_Trabajador_H}</th>
                                                                         <th  style="border: 1px !important;">F.Ultima atención médica ${f1}</th>
                                                                         <th  style="border: 1px !important;">Diagnóstico ${Item.Diagnostico_AM}</th>
                                                                         <th  style="border: 1px !important;">Aptitud ${Item.Aptitud_AM}</th>  

                                                                         <th  style="border: 1px !important;">F.Ultimo EMO ${Item.FechaUltimoEMO}</th>  
                                                                         <th  style="border: 1px !important;">F.Ultimo VMO ${Item.FechaUltimoVMO}</th> 
                                                                        </tr>
                                                                          `;



  });








  hideLoading();
  //console.log(html);

  $('#dat_hc_a_area').val(0)
  $('#dat_hc_a_sede').val(0)



  return html;


}
//------------------------------------- fin   fnSp3ListarTablaGeneralH() -------------------------------------






function fnSp3CargaListasHistoriaClinica() {
  $("#" + 'dat_hc_a_sede').html("Cargando ...");
  $("#" + 'dat_hc_a_area').html("Cargando ...");
  showLoading();

  var url = "https://550m44ud1tmg7454-inspection-dev.azurewebsites.net/api/Get-Incidente-AccidenteWeb?code=GY7/yooa3Zl5sKu7zgakDbaCn4uvOKXjfwe/JkbSuIwDPOs/baiZFQ==&httpmethod=objectlist";

  console.log("URL", url)
  var headers = {
    "apikey": constantes.apiKey
  }

  var settings = {
    "url": url,
    "method": "GET",
    "timeout": 0,
    "crossDomain": true,
    "dataType": "json",
    "headers": headers,
  };

  $.ajax(settings).done(function(response1) {
      console.log("**fnSp3CargaListasHistoriaClinica**", response1);

      //ahora vamos a recibire el servicio

      var n = response1.Sedes.length;
      var nk = 0;
      var m = response1.Sedes.length;
      var mk = 0;

      //------------------------------------------------------------------------------------------------------------------------------------------------------------
      $("#" + 'dat_hc_a_sede').html(" ");
      $("#" + 'dat_la_sede').css('font-size', '13px'); //lecciones aprendidas
      $("#" + 'dat_hc_a_sede').html("<option selected value='0'>          </option>");

      response1.Sedes.map(function(item) {
        $("#" + 'dat_hc_a_sede').append(`<option value='${item.Id}' title='${item.Sede}' style='font-weight: bold;'>${item.Sede}</option>`);
        nk++

        if (n == nk) {
          //--------------------------------------------------------------------------------------------------------------------------------------------------------------
          $("#" + 'dat_hc_a_area').html(" ");
          $("#" + 'sel_filter_estado_p').css('font-size', '13px');
          $("#" + 'dat_hc_a_area').html("<option selected value='0'>          </option>");
          response1.Areas.map(function(item) {
            $("#" + 'dat_hc_a_area').append(`<option value='${item.Id}' title='${item.Area}' >${item.Area}</option>`);
            mk++;

            if (m == mk) {
              hideLoading();
              fnSp3CargaFiltroEstadoInicialSaludOcupacional();
            }
          });
          //--------------------------------------------------------------------------------------------------------------------------------------------------------------
        }



      });
      //--------------------------------------------------------------------------------------------------------------------------------------------------------------






    }




  );

}








function date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(fechaBD) {

  var startDate = moment(fechaBD).format('DD/MM/YYYY'); //dddd
  var year = moment(fechaBD).format('YYYY'); //dddd
  var month = moment(fechaBD).format('MM'); //
  var day = moment(fechaBD).format('DD');
  //var startDate2   = year +"/"+ month +"/"+ day;
  var startDate2 = day + "/" + month + "/" + year

  return startDate2;
}





$(function() {
  // Dropdown toggle
  $(".btn-drop").click(function() {
    $(this).find(".btn-drop-content").slideToggle();
  });
  //-------------------------------------------------------
  $(document).click(function(e) {
    var target = e.target;
    if (!$(target).is(".btn-drop") && !$(target).parents().is(".btn-drop")) {
      $(".btn-drop-content").slideUp();
    }



  });

  $(".hc-more-info").click((e) => {
    const id = e.currentTarget.dataset.rowid;

    const position = $(".hc-more-info")
      .eq(id - 1)
      .position();
    $(".hc-info-content").css("left", `${position.left}px`);
    $(".hc-info-content").css("top", `${position.top}px`);

    $(".hc-info-content").slideToggle();
  });

  $(".oc-more-info").click((e) => {
    const id = e.currentTarget.dataset.rowid;

    const position = $(".oc-more-info")
      .eq(id - 1)
      .position();
    $(".oc-info-content").css("left", `${position.left}px`);
    $(".oc-info-content").css("top", `${position.top}px`);

    $(".oc-info-content").slideToggle();
  });

  $(document).click(function(e) {
    var target = e.target;
    if (!$(target).is(".hc-more-info") && !$(target).parents().is(".hc-more-info")) {
      $(".hc-info-content").slideUp();
    }
    if (!$(target).is(".oc-more-info") && !$(target).parents().is(".oc-more-info")) {
      $(".oc-info-content").slideUp();
    }
  });
});


// ################################################################# FUNCIONES DE CARLOS ##########################################################
function showNuevaHC() { //------------------------ ini showNuevaHC  ------------------------------
  let content = $('#contentGlobal');
  content.html(' ');
  showLoading();
  content.load('./view/sho-hce/historia_clinica/nuevaHistoriaClinica.html');
  hcSp3GuardarHistoriaClinica();
} //------------------------ fin  showNuevaHC  ------------------------------


function exportarExcelBandeja() { //------------------------ ini exportarExcelBandeja  ------------------------------

  //alert('linea 396--> Carlos integrar llamdo de : exportarExcelBandeja()');
  fnExcelReportPAHC();

} //------------------------ fin  exportarExcelBandeja  ------------------------------


function divEditaHistoria(IdHC) { //------------------------ ini divEditaHistoria  ------------------------------

  alert('linea 396--> Carlos integrar llamdo de : divEditaHistoria(' + IdHC + ')');

  //  paObj_hc[Item.IdHC].

  console.log('linea 396--> Carlos integrar llamdo de : divEditaHistoria(', paObj_hc[IdHC].a.Apellidos_Trabajador_H, ')');

} //------------------------ fin  divEditaHistoria  ------------------------------


function fnExcelReportPAHC() {

  var tab_text = `

    <table  cellpadding="0" cellspacing="0" id="sheet0" style="table-layout: fixed;">
        <thead>
            
            <tr style="border: 0px !important;color: #fff;font-weight: bold;">
                 <th bgcolor='#223962' style="border: 0px !important;">Codigo Colaborador</th> 
                 <th bgcolor='#223962' style="border: 0px !important;">Documento</th>
                 <th bgcolor='#223962' style="border: 0px !important;">Nombres</th> 
                 <th bgcolor='#223962' style="border: 0px !important;">Apellidos</th>
                 <th bgcolor='#223962' style="border: 0px !important;">Áreas</th>
                 <th bgcolor='#223962' style="border: 0px !important;">Sede</th>

                 <th bgcolor='#223962' style="border: 0px !important;">Teléfono</th>
                 <th bgcolor='#223962' style="border: 0px !important;">F.Ultima atención médica</th>
                 <th bgcolor='#223962' style="border: 0px !important;">Diagnóstico</th>
                 <th bgcolor='#223962' style="border: 0px !important;">Aptitud</th>  

                 <th bgcolor='#223962' style="border: 0px !important;">F.Ultimo EMO</th>  
                 <th bgcolor='#223962' style="border: 0px !important;">F.Ultimo VMO</th> 
            </tr>
        </thead>


    <tbody>
              <tr  style="border: 1px !important;color: #000;">
                 <th  style="border: 1px !important;">Codigo Colaborador</th> 
                 <th  style="border: 1px !important;">Documento</th>
                 <th  style="border: 1px !important;">Nombres</th> 
                 <th  style="border: 1px !important;">Apellidos</th>
                 <th  style="border: 1px !important;">Áreas</th>
                 <th  style="border: 1px !important;">Sede</th>

                 <th  style="border: 1px !important;">Teléfono</th>
                 <th  style="border: 1px !important;">F.Ultima atención médica</th>
                 <th  style="border: 1px !important;">Diagnóstico</th>
                 <th  style="border: 1px !important;">Aptitud</th>  

                 <th  style="border: 1px !important;">F.Ultimo EMO</th>  
                 <th  style="border: 1px !important;">F.Ultimo VMO</th> 
                </tr>
    </tbody> 
     `;


  tab_text = tab_text + HTMLEXCEL;








  tab_text = tab_text + ` </tbody> 
     `;






  // <tr style="font-weight: bold;">
  //               <th style="border: 1px solid #000;">PESO ACTIVIDAD</th>
  //               <th style="border: 1px solid #000;" colspan="2">ACTIVIDAD / ENTREGABLE</th> 
  //               <th style="border: 1px solid #000;" >MES</th>
  //               <th style="border: 1px solid #000;" colspan="4" >ENE. - </th>

  //             </tr>


  // <colgroup>
  //            <col width="1500" style="vertical-align:middle;" />
  //            <col style="width:200px;" />
  //            <col style="width:20px;" />
  //            <col style="width:20px;" />
  //        </colgroup>

  //--------------------------------------------------------------AQUI VAMOS A GREGAR LAS FILAS DE LOS TOTALES ---------------------------------------------------

  // console.log(tab_text)


  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");

  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer
  {
    txtArea1.document.open("txt/html", "replace");
    txtArea1.document.write(tab_text);
    txtArea1.document.close();
    txtArea1.focus();
    sa = txtArea1.document.execCommand("SaveAs", true, "Say Thanks to Sumit.xls");
  } else //other browser not tested on IE 11
    //     sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));  

    // return (sa);

    var link = document.getElementById('link');

  //alert(link);

  link.href = 'data:application/vnd.ms-excel;base64,' + window.btoa(tab_text);
  link.download = 'Plan Anual - ';
  link.click();
}

// ################################################################# FUNCIONES DE CARLOS ##########################################################

var idSV = 0;
var idHC = 30;
var idA = 0
var confirmGuardado = false;

$(document).click(function(e) {
  var target = e.target;
  if (!$(target).parents().is(".table-box")) {
    $(".more-info-content").slideUp();
  }
  if (!$(target).parents().is("#info_content_table_ant_oc") && $(target).parents().is("#form_dat_ant_oc")) {
    $(`tr[data-idAntOc]`).find('input').attr('readonly', true);
    hcSp3MostrarAntecedentes(3);
  }
});


// FUNCIONALIDADES DEL FORMULARIO
function hcSp3LimpiarDatos() {
  $('#HC_registrar').find('input[type=text]').val(' ');
  $('#HC_registrar').find('input[type=number]').val(0);
  $('#HC_registrar').find('input[type=checkbox]').prop('checked', false);
  $('#HC_registrar').find('select').val(' ');
}

function hcSp3ConfirmGuardarHistoriaClinica() {
  let nombres = $("#nombres").val();
  let apellidos = $("#apellidos").val();
  Swal.fire({
    title: "Guardar nueva H.C.",
    html: `
    <p>Está por guardar la historia clínica de</p>
    <p>${nombres} ${apellidos}</p>
    <p class="mt-5">¿Desea confirmar la acción?</p>`,
    icon: "info",
    showCancelButton: true,
    reverseButtons: true,
    cancelButtonColor: "#ff3636",
    confirmButtonColor: "#8fbb02",
    confirmButtonText: `Confirmar <img onclick="hcSp3GuardarHistoriaClinica(${idHC})" class="inject-svg" src="./images/sho/confirm.svg" alt="" fill="#fff" width="18px">`,
    cancelButtonText: `Cancelar <img class="inject-svg" src="./images/sho/cancelar.svg" alt="" fill="#fff" width="18px">`,
  }).then((result) => {
    if (confirmGuardado) {
      Swal.fire({
        title: "Se terminó con éxito el registro",
        iconColor: "#8fbb02",
        iconHtml: '<img src="./images/sho/check.svg" width="28px">',
        showConfirmButton: false,
        padding: "3em 3em 6em 3em ",
      });
    }
  });
  SVGInject($(".inject-svg"));
}

// objetos del DOM
const $btnToggle = $("#toggle-btn");
const $sidebar = $("#sidebar");
var $tituloMenu = $("#sidebar .titulo").text();
var $labelNav = $(".label-nav span").text();

// Acortando el titulo del menu
var $tituloMenuCorto = $tituloMenu
  .split("vacio")
  .map((e) => e[0])
  .join("");

setMenu();

// Escuchando el evento del click del toggle
$btnToggle.on("click", function() {
  $sidebar.toggleClass("active");
  $("#toggle-btn svg").toggleClass("active");
  $("#page-content-sidebar").toggleClass("active");
  setMenu(); // Seteando el contenido del menu
});

// set menu
function setMenu() {
  if (!$sidebar.attr("class")) {
    $("#sidebar .titulo").text($tituloMenuCorto);
    $(".item-list span").css("display", "none");
  } else {
    $("#sidebar .titulo").text($tituloMenu);
    $(".item-list span").css("display", "flex");
  }
}

function hcSp3DatosFormulario(id) {
  let data = {};

  // EXTRAS
  data.IdHC = id;
  data.PacienteExterno = ($('#dat_hc_externo_trabajador:checked').val()) ? 1 : 0;

  // DATOS DEL TRABAJADO
  data.NroDocumento_Trabajador_H = ($("#dat_hc_dni_trabajador").val()) ? Number($("#dat_hc_dni_trabajador").val()) : 0;
  data.Nombres_Trabajador_H = ($("#dat_hc_nombres_trabajador").val()) ? $("#dat_hc_nombres_trabajador").val() : "vacio";
  data.Apellidos_Trabajador_H = ($("#dat_hc_apellidos_trabajador").val()) ? $("#dat_hc_apellidos_trabajador").val() : "vacio";
  data.FechaRegistro_Trabajador_H = ($("#dat_hc_fecha_trabajador").val()) ? $("#dat_hc_fecha_trabajador").val() : "12/12/2000";
  data.CodigoColaborador_Trabajador_H = ($("#dat_hc_cod_colaborador").val()) ? $("#dat_hc_cod_colaborador").val() : "vacio";
  data.Telefono_Trabajador_H = ($("#dat_hc_telefono_trabajador").val()) ? $("#dat_hc_telefono_trabajador").val() : "vacio";
  data.Direccion_Trabajador_H = ($("#dat_hc_direccion_trabajador").val()) ? $("#dat_hc_direccion_trabajador").val() : "vacio";
  data.Sexo_Trabajador_H = ($("#dat_hc_sexo_trabajador").val()) ? Number($("#dat_hc_sexo_trabajador").val()) : 0;
  data.LugarNacimiento_Trabajador_H = ($("#dat_hc_nacimiento_trabajador").val()) ? $("#dat_hc_nacimiento_trabajador").val() : "vacio";
  data.Edad_Trabajador_H = ($("#dat_hc_edad_trabajador").val()) ? Number($("#dat_hc_edad_trabajador").val()) : 0;

  // DATOS DE LA EMPRESA
  data.GerenciaId_Empresa_H = ($("#dat_hc_gerencia_empresa").val()) ? Number($("#dat_hc_gerencia_empresa").val()) : 0;
  data.PlantaId_Empresa_H = ($("#dat_hc_planta_empresa").val()) ? Number($("#dat_hc_planta_empresa").val()) : 0;
  data.AreaId_Empresa_H = ($("#dat_hc_area_empresa").val()) ? Number($("#dat_hc_area_empresa").val()) : 0;
  data.PuestoTrabajo_Empresa_H = ($("#dat_hc_puesto_trabajo_empresa").val()) ? $("#dat_hc_puesto_trabajo_empresa").val() : "vacio";
  data.JefeInmediato_Empresa_H = ($("#dat_hc_jefe_inmediato_empresa").val()) ? $("#dat_hc_jefe_inmediato_empresa").val() : "vacio";
  data.Celular_Empresa_H = ($("#dat_hc_celular_empresa").val()) ? $("#dat_hc_celular_empresa").val() : "vacio";
  data.Telefono_Empresa_H = ($("#dat_hc_telefono_empresa").val()) ? $("#dat_hc_telefono_empresa").val() : "vacio";
  data.CargoJefe_Empresa_H = ($("#dat_hc_puesto_jefe_empresa").val()) ? $("#dat_hc_puesto_jefe_empresa").val() : "vacio";

  // SIGNOS VITALES
  data.PresionArterial_SV = ($("#dat_hc_presion_arterial_sv").val()) ? Number($("#dat_hc_presion_arterial_sv").val()) : 0;
  data.FrecuenciaCardiaca_SV = ($("#dat_hc_frecuencia_cardiaca_sv").val()) ? Number($("#dat_hc_frecuencia_cardiaca_sv").val()) : 0;
  data.FrecuenciaRespiratoria_SV = ($("#dat_hc_frecuencia_respiratoria_sv").val()) ? Number($("#dat_hc_frecuencia_respiratoria_sv").val()) : 0;
  data.Temperatura_SV = ($("#dat_hc_temperatura_sv").val()) ? Number($("#dat_hc_temperatura_sv").val()) : 0;
  data.PesoKg_SV = ($("#dat_hc_peso_sv").val()) ? Number($("#dat_hc_peso_sv").val()) : 0;
  data.Talla_SV = ($("#dat_hc_talla_sv").val()) ? Number($("#dat_hc_talla_sv").val()) : 0;
  data.Saturacion_SV = ($("#dat_hc_saturacion_sv").val()) ? Number($("#dat_hc_saturacion_sv").val()) : 0;
  data.IndiceMasaCorporal_SV = ($("#dat_hc_masa_corporal_sv").val()) ? Number($("#dat_hc_masa_corporal_sv").val()) : 0;
  data.PerimetroAbdominal_SV = ($("#dat_hc_perimetro_abdominal_sv").val()) ? Number($("#dat_hc_perimetro_abdominal_sv").val()) : 0;

  return data;
}

function hcSp3GuardarHistoriaClinica() {
  // let setId = (id) ? id : '0';
  let data = hcSp3DatosFormulario(idHC);

  data.IdHashPaciente_Trabajador_H = "idHashPacienteForaneo";
  data.IdHashJefeInmediato_Empresa_H = "idHashJufeForaneo";
  data.IdSV = idSV;
  data.SedeId_Empresa_H = 1;
  data.IdHashUser = "IdU1suario3434Logedo";

  // console.log(data);
  let url = `https://5h0-dev-salud.azurewebsites.net/api/hce_Post_001_historia_clinica?code=71nrTHSaZONU4iFaWzPmascw8gsNJDjhX0UMFbcPXY92hEKuTskblQ==&httpmethod=post`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "post",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers,
    "data": JSON.stringify(data)
  };

  $.ajax(settings).done((response) => {
    hideLoading();
    if (idHC != 0) {
      confirmGuardado = true;
    } else {
      confirmGuardado = false;
    }
    idHC = response.Id;
  }).fail((e) => {
    console.log(e);
  })

  console.log(data);

}

function hcSp3DatosAntecedentesGuardar(IdTipA, IdA) {
  let data = {};
  data.IdHC = idHC;
  data.IdA = IdA;
  data.IdTipA = IdTipA;

  if (IdTipA == 3) {
    data.Nombre_A = '';
    data.FechaInicio_A = $(`#fecha_inicio_ant_${IdTipA}`).val();
    data.FechaFin_A = $(`#fecha_fin_ant_${IdTipA}`).val();
    data.Empresa_A = $(`#empresa_ant_${IdTipA}`).val();
    data.ActividadEmpresa_A = $(`#actividad_ant_${IdTipA}`).val();
    data.AreaTrabajo_A = $(`#area_trabajo_ant_${IdTipA}`).val();
    data.Ocupacion_A = $(`#ocupacion_ant_${IdTipA}`).val();
    data.PeligrosAgentesOcupacionales_A = $(`#peligros_ant_${IdTipA}`).val();
    data.UsoEpp_TipoEpp_A = $(`#epp_ant_${IdTipA}`).val();
  } else {
    data.Nombre_A = $(`#nombre_ant_${IdTipA}`).val();
    data.FechaInicio_A = "08/12/2000";
    data.FechaFin_A = "08/12/2000";
    data.Empresa_A = "vacio";
    data.ActividadEmpresa_A = "vacio";
    data.AreaTrabajo_A = "vacio";
    data.Ocupacion_A = "vacio";
    data.PeligrosAgentesOcupacionales_A = "vacio";
    data.UsoEpp_TipoEpp_A = "vacio";
  }

  return data;
}

function hcSp3DatosAntecedentesEditar(IdTipA, IdA) {
  let data = {};
  data.IdHC = idHC;
  data.IdA = IdA;
  data.IdTipA = IdTipA;

  if (IdTipA == 3) {
    data.Nombre_A = '';
    data.FechaInicio_A = $(`#fecha_inicio_ant_${IdTipA}_editar_${IdA}`).val();
    data.FechaFin_A = $(`#fecha_fin_ant_${IdTipA}_editar_${IdA}`).val();
    data.Empresa_A = $(`#empresa_ant_${IdTipA}_editar_${IdA}`).val();
    data.ActividadEmpresa_A = $(`#actividad_ant_${IdTipA}_editar_${IdA}`).val();
    data.AreaTrabajo_A = $(`#area_trabajo_ant_${IdTipA}_editar_${IdA}`).val();
    data.Ocupacion_A = $(`#ocupacion_ant_${IdTipA}_editar_${IdA}`).val();
    data.PeligrosAgentesOcupacionales_A = $(`#peligros_ant_${IdTipA}_editar_${IdA}`).val();
    data.UsoEpp_TipoEpp_A = $(`#epp_ant_${IdTipA}_editar_${IdA}`).val();
  } else {
    data.Nombre_A = $(`#nombre_ant_${IdTipA}_editar_${IdA}`).val();
    data.FechaInicio_A = "08/12/2000";
    data.FechaFin_A = "08/12/2000";
    data.Empresa_A = "vacio";
    data.ActividadEmpresa_A = "vacio";
    data.AreaTrabajo_A = "vacio";
    data.Ocupacion_A = "vacio";
    data.PeligrosAgentesOcupacionales_A = "vacio";
    data.UsoEpp_TipoEpp_A = "vacio";
  }

  return data;
}

function hcSp3GuardarAntecedentes(IdTipA, IdA, edit) {
  let data = {}
  if (edit) {
    data = hcSp3DatosAntecedentesEditar(IdTipA, IdA);
  } else {
    data = hcSp3DatosAntecedentesGuardar(IdTipA, IdA);
  }
  data.IdHashUser = "IdU1suario3434Logedo";

  let url = `https://5h0-dev-salud.azurewebsites.net/api/hce_Post_002_historia_clinica_antecedente?code=22WEj9qoRN1pbIMSrHYvNT2mvgBNzW37S6ESkHcpeF04idG6TMoroA==&httpmethod=post`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "post",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers,
    "data": JSON.stringify(data)
  };

  console.log(data);
  $.ajax(settings).done((response) => {
    console.log(response);
    hcSp3MostrarAntecedentes(IdTipA);
    if ($(`tr[data-idAntOc]`)) {
      $(`tr[data-idAntOc]`).find('input').attr('readonly', true);
    }
  }).fail((e) => {
    console.log(e);
  })
}

function hcSp3MostrarAntecedentes(IdTipA) {
  let alldata = {};

  $(`#btn_agregar_ant_${IdTipA}`).show();

  alldata.IdHC = idHC;

  let url = `https://5h0-dev-salud.azurewebsites.net/api/hce_Get_002_historia_clinica_antecedente?code=BsULi1Y0aoClfhCk3mSUvEsnbFAyVhtkEXaf8L8REAcYUGZLmv5qaw==`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "get",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers,
    "data": alldata
  };

  $.ajax(settings).done((response) => {
    let data = response.HistoriaAntecedentes;

    if (!data) {
      $(`#cant_ant_${IdTipA}_header`).text(`00`);
    } else {
      let cant = 0;
      if (IdTipA == 3) {
        content_Ant = $(`#content_ant_${IdTipA}`);
      } else {
        content_Ant = $(`#content_ant_${IdTipA}`);
      }
      content_Ant.html(' ');
      data.forEach((data) => {
        if (data.IdTipA_A == IdTipA && data.IdTipA_A != 3) {
          let fechaCreacion_A = data.FechaCreacion_A.split('T')[0];
          content_Ant.append(`
          <div class="item-ant row">
            <div class="col-md-9 d-flex">
              <div>
                <b style="color: #254373">Nombre de la alergia: </b>
                <span><input class="input_nombre_ant" type="text" id="nombre_ant_${data.IdTipA_A}_editar_${data.IdA}" value="${data.Nombre_A}" readonly></span>
              </div>
              <div class="ml-3">
                <b style="color: #254373">Creación</b>
                <span><input type="date" value="${fechaCreacion_A}" readonly></span>
              </div>
            </div>
            <div class="col-md-3 d-flex justify-content-end">
              <button type="button" class="btn btn-link shadow-none btn_ant_${data.IdTipA_A}_editar" id="btn_ant_${data.IdTipA_A}_editar_${data.IdA}" onclick="hcSp3EditarAntecedentes(${data.IdA},${data.IdTipA_A})">
                <img class="inject-svg" src="./images/sho/edit.svg" alt="" fill="#4AAC8F" width="16px">
              </button>
              <button type="button" class="btn btn-link shadow-none btn_ant_${data.IdTipA_A}_guardar" id="btn_ant_${data.IdTipA_A}_guardar_${data.IdA}" onclick="hcSp3GuardarAntecedentes(${data.IdTipA_A},${data.IdA},true)" style="display:none">
                <img class="inject-svg" src="./images/sho/confirm.svg" alt="" fill="#4AAC8F" width="16px">
              </button>
              <button type="button" class="btn btn-link shadow-none" onclick="hcSp3EliminarAntecedentes(${data.IdA},${data.IdTipA_A})">
                <img class="inject-svg" src="./images/sho/delete.svg" alt="" fill="#ff3636" width="16px">
              </button>
            </div>
          </div>`);
          cant = cant + 1;
          SVGInject($(".inject-svg"));
        }
        if (data.IdTipA_A == IdTipA && data.IdTipA_A == 3) {
          let fechaInicio_A = data.FechaInicio_A.split('T')[0];
          let fechaFin_A = data.FechaFin_A.split('T')[0];
          content_Ant.append(`
            <tr data-idAntOc="${data.IdA}" class="item_ant_oc">
              <td><input type="date" id="fecha_inicio_ant_3_editar_${data.IdA}" value="${fechaInicio_A}" readonly></td>
              <td><input type="date" id="fecha_fin_ant_3_editar_${data.IdA}" value="${fechaFin_A}" readonly></td>
              <td><input type="text" id="empresa_ant_3_editar_${data.IdA}" value="${data.Empresa_A}" readonly></td>
              <td><input type="text" id="actividad_ant_3_editar_${data.IdA}" value="${data.ActividadEmpresa_A}" readonly></td>
              <td><input type="text" id="area_trabajo_ant_3_editar_${data.IdA}" value="${data.AreaTrabajo_A}" readonly></td>
              <td><input type="text" id="ocupacion_ant_3_editar_${data.IdA}" value="${data.Ocupacion_A}" readonly></td>
              <td><input type="text" id="peligros_ant_3_editar_${data.IdA}" value="${data.PeligrosAgentesOcupacionales_A}" readonly></td>
              <td><input type="text" id="epp_ant_3_editar_${data.IdA}" value="${data.UsoEpp_TipoEpp_A}" readonly></td>
              <td>
                <div class="more-info" id="more_info_table_ant_oc_${data.IdA}" onclick="mostrarMenuTable(${data.IdA})">
                  <img src="images/iconos/menu_responsive.svg" alt="" />
                </div>
              </td>
            </tr>
          `);

          cant = cant + 1;
          SVGInject($(".inject-svg"));
        }
      });
      if (cant < 10) {
        $(`#cant_ant_${IdTipA}_header`).text(`0${cant}`);
      } else {
        $(`#cant_ant_${IdTipA}_header`).text(`${cant}`);
      }
      (IdTipA == 3) ? $(`#cant_ant_${IdTipA}_table`).text(`${cant} Registros`): '';
    }
  }).fail((e) => {
    console.log(e);
  })
}

function hcSp3EditarAntecedentes(id, IdTipA) {
  if (IdTipA == 3) {
    $(`tr[data-idAntOc='${id}']`).find('input').attr('readonly', false);
    $(`tr[data-idAntOc!='${id}']`).find('input').attr('readonly', true);
  } else {
    $(`.input_nombre_ant`).attr('readonly', true);
    $(`.btn_ant_${IdTipA}_editar`).show();
    $(`.btn_ant_${IdTipA}_guardar`).hide();
    if ($(`#nombre_ant_${IdTipA}_editar_${id}`).attr('readonly')) {
      $(`#nombre_ant_${IdTipA}_editar_${id}`).attr('readonly', false);
      $(`#btn_ant_${IdTipA}_editar_${id}`).hide();
      $(`#btn_ant_${IdTipA}_guardar_${id}`).show();
    }
  }
}

function hcSp3EliminarAntecedentes(IdA, IdTipA) {
  let data = {};
  data.IdHashUser = "IdU1suario3434Logedo";
  data.IdHC = idHC;
  data.IdA = IdA;

  let url = `https://5h0-dev-salud.azurewebsites.net/api/hce_Post_003_historia_clinica_antecedente_eliminadoLogico?httpmethod=post&code=cKDa47yEFx1PUE/qoLpV712gYATgZlguESlS0nPoW7hUai/ticzm7A==`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "post",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers,
    "data": JSON.stringify(data)
  };

  $.ajax(settings).done(() => {
    hcSp3MostrarAntecedentes(IdTipA);
  })
}

function mostrarMenuTable(id) {
  let content = $('#info_content_table_ant_oc');
  content.html(`
    <div class="more-info-content">
      <ul>
        <li onclick="hcSp3EditarAntecedentes(${id},3)" id="btn_ant_oc_editar">
          <img class="inject-svg" src="./images/sho/edit.svg" fill="#5daf57" style="width:16px !important" />
          <span>Editar</span>
        </li>
        <li onclick="hcSp3GuardarAntecedentes(3,${id},true)" id="btn_ant_oc_guardar" style="display: none;">
          <img class="inject-svg" src="./images/sho/confirm.svg" fill="#5daf57" style="width:16px !important" />
          <span>Guardar</span>
        </li>
        <li onclick="hcSp3EliminarAntecedentes(${id},3)">
          <img class="inject-svg" src="./images/sho/delete.svg" fill="#ff3636" style="width:16px !important" />
          <span>Eliminar</span>
        </li>
      </ul>
    </div>
  `);
  SVGInject($(".inject-svg"));
  const position = $(`#more_info_table_ant_oc_${id}`).position();
  $(`.more-info-content`).css("left", `${position.left}px`);
  $(`.more-info-content`).css("top", `${position.top}px`);
  $(`.more-info-content`).slideToggle();

  if ($(`tr[data-idAntOc='${id}']`).find('input').attr('readonly')) {
    $(`#info_content_table_ant_oc`).find('#btn_ant_oc_editar').show();
    $(`#info_content_table_ant_oc`).find('#btn_ant_oc_guardar').hide();
  } else {
    $(`#info_content_table_ant_oc`).find('#btn_ant_oc_editar').hide();
    $(`#info_content_table_ant_oc`).find('#btn_ant_oc_guardar').show();
  }
}

SVGInject($(".inject-svg"));