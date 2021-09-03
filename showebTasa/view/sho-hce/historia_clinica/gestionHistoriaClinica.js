/****************************************************************************************
 * VISUAL SAT - [2021]
 * PROYECTO : SIGTASA
 * ESQUEMA : SSOMA
 * SPRINT  : 3
 * MODULO : HISTORIA CLINICA
 * OPERADORES_________________________________________________________________________
 * | # | PROGRAMADOR     |  |      FECHA   |  |   HORA   |           CORREO           |
 * | 1 | Carlos Rivas    |  |   26/08/2021 |  | 07:28:50 |       crivascyt@gmail.com  |
 * | 2 | Andy Vàsquez    |  |   18/08/2021 |  | 17:16:00 |     caracas1348@gmail.com  |
 * |___|_________________|__|______________|__|__________|____________________________|
 *
 * DESCRIPCION: ARCHIVO FRONT DE FUNCIONALIDAD EN CLIENTE DE LAS OPCIONES DE LOS INCIDENTES Y
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
var DA_TX = [];//DATA DE ATENCIONES MEDICAS ASOCIADAS POR EL ID DE LA HISTORIA CLINICA
var HTMLEXCEL = '';
var idSV = 0;
// var idHC = 30;
var idHC = 0;
var estadoHC = 0;
var idA = 0








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

  //var url = +"/api/Get-Incidente-AccidenteWeb?code=GY7/yooa3Zl5sKu7zgakDbaCn4uvOKXjfwe/JkbSuIwDPOs/baiZFQ==&httpmethod=objectlist&IdTipoEvento="+programa+"&IdEmpresa="+gerencia+"&IdSede="+sedepa+"&FechaInicio="+f1+"&FechaFin="+f2+"&IdEmbarcacion="+estadopa
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


       // if (response.HistoriaClin.length > 0) 
       //          {//---------------------------------------------------------------
                        
       //                    response.HistoriaAtencionMedica.map(function(itemx) 
       //                              {
                                         
                                          
       //                                    DA_TX[itemx.IdHC] = itemx;
                                       
       //                              });
       //                    console.log("302 D_IT[]",DA_TX );


       //          }//---------------------------------------------------------------






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
                                                  <a class="dropdown-item" onclick="cargarDatosGenerales(${Item.IdHC})"><img src="./images/sho/eyeIcon.svg" alt="" />&nbsp;&nbsp; Ver H.C.</a>
                                                  <a class="dropdown-item" onclick="showNuevaHC()"><img src="./images/sho/moreIcon.svg" alt="" /> &nbsp;&nbsp; Nueva atención médica</a>
                                                </div>
                                          </div>
                                        </div>
                                      `;



    html += `

                                   <div class="col-md-12"   style=" width:2450px !important;"   >
                                                    <div class="header-tabla px-2 py-3 filaBandeja" style=" width:2420px !important; mmargin-rigth:30px !important; " > 

                                                        <table border="0"  style=" width:2430px !important;  "  >   <!-- <style=" width:1754px !important; -->
                                                            <tr >
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c1TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.CodigoColaborador_Trabajador_H != null ? Item.CodigoColaborador_Trabajador_H : "---"}</div></td> 
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c2TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.NroDocumento_Trabajador_H != null ? Item.NroDocumento_Trabajador_H : "---"}</div></td>
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.Nombres_Trabajador_H != null ? Item.Nombres_Trabajador_H : "---"}</div></td> 
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c3TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.Apellidos_Trabajador_H != null ? Item.Apellidos_Trabajador_H : "---"}</div></td>
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c4TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${AreaId_Empresa_H_S != null ? AreaId_Empresa_H_S : "---"}</div></td>
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c5TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${SedeId_Empresa_H_S != null ? SedeId_Empresa_H_S : "---"}</div></td>

                                                                  <td  style = 'width: 200px;'  align="center"><div id="c6TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.Telefono_Trabajador_H != null ? Item.Telefono_Trabajador_H : "---"}</div></td>
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c7TabGenyx" class="text-center lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${f1 != null ? f1 : "---"}</div></td>
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c8TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >&nbsp;&nbsp;&nbsp;${Item.Diagnostico_AM != null ? Item.Diagnostico_AM : "---"}</div></td>
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${Item.Aptitud_AM == 1 ? 'Apto' : "No Apto"}</div></td>  

                                                                  <td  style = 'width: 200px;'  align="center"><div id="c9TabGenyx" class="text-center lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.FechaUltimoEMO != null ? Item.FechaUltimoEMO : "---"}</div></td>  
                                                                  <td  style = 'width: 190px;'  align="center"><div id="c9TabGenyx" class="text-center lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.FechaUltimoVMO != null ? Item.FechaUltimoVMO : "---"}</div></td>  
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

  //var url = "https://550m44ud1tmg7454-inspection-dev.azurewebsites.net/api/Get-Incidente-AccidenteWeb?code=GY7/yooa3Zl5sKu7zgakDbaCn4uvOKXjfwe/JkbSuIwDPOs/baiZFQ==&httpmethod=objectlist";
  var url = apiUrlssoma + "/api/a_get_lista_sedes_areas_gerencia?code=5sz/nIVDXtW7t97kzgfOyzuN4yYq6FEfuJoZSlk3DzGQ9AMLu7k6WQ==&IdSede=0&IdArea=0&IdGerencia=0"
  console.log("URL ssoma", url)
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
      var m = response1.Area.length;
      var mk = 0;

      //------------------------------------------------------------------------------------------------------------------------------------------------------------
      $("#" + 'dat_hc_a_sede').html(" ");
      $("#" + 'dat_la_sede').css('font-size', '13px'); //lecciones aprendidas
      $("#" + 'dat_hc_a_sede').html("<option selected value='0'>          </option>");

      response1.Sedes.map(function(item) {
        $("#" + 'dat_hc_a_sede').append(`<option value='${item.Id}' title='${item.Description}' style='font-weight: bold;'>${item.Description}</option>`);
        nk++

        if (n == nk) {
          //alert('entre 309 termino sede = '+nk)
          //--------------------------------------------------------------------------------------------------------------------------------------------------------------
          $("#" + 'dat_hc_a_area').html(" ");
          $("#" + 'sel_filter_estado_p').css('font-size', '13px');
          $("#" + 'dat_hc_a_area').html("<option selected value='0'>          </option>");
          response1.Area.map(function(item) {
            $("#" + 'dat_hc_a_area').append(`<option value='${item.Id}' title='${item.Description}' >${item.Description}</option>`);
            mk++;

            if (m == mk) {
                //alert('entre 309 termino area = '+mk)
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

  // hideLoading();
  // fnSp3CargaFiltroEstadoInicialSaludOcupacional();

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
  idHC = 0;
  idSV = 0;
  estadoHC = 0;
  handlerUrlhtml('contentGlobal', 'view/sho-hce/historia_clinica/nuevaHistoriaClinica.html', 'Registrar nueva H.C.');
  cargarAreasSedesGerencia();
  hcSp3GuardarHistoriaClinica();
} //------------------------ fin  showNuevaHC  ------------------------------


function exportarExcelBandeja() { //------------------------ ini exportarExcelBandeja  ------------------------------

  //alert('linea 396--> Carlos integrar llamdo de : exportarExcelBandeja()');
  fnExcelReportPAHC();

} //------------------------ fin  exportarExcelBandeja  ------------------------------


function divEditaHistoria(IdHC) { //------------------------ ini divEditaHistoria  ------------------------------
  idHC = IdHC;
  idSV = paObj_hc[IdHC].a.IdSV;
  estadoHC = 1;
  showLoading();
  cargarAreasSedesGerencia();
  for (let i = 1; i <= 6; i++) {
    hcSp3MostrarAntecedentes(i)
  }
  handlerUrlhtml('contentGlobal', 'view/sho-hce/historia_clinica/nuevaHistoriaClinica.html', 'Registrar nueva H.C.');
  setTimeout(() => {
    cargarDatosHistoria(IdHC);
    hideLoading();
  }, 2000);

} //------------------------ fin  divEditaHistoria  ------------------------------

function cargarDatosHistoria(IdHC) {
  $("#dat_hc_dni_trabajador").val(paObj_hc[IdHC].a.NroDocumento_Trabajador_H);
  $("#dat_hc_nombres_trabajador").val(paObj_hc[IdHC].a.Nombres_Trabajador_H);
  $("#dat_hc_apellidos_trabajador").val(paObj_hc[IdHC].a.Apellidos_Trabajador_H);
  $("#dat_hc_fecha_trabajador").val(paObj_hc[IdHC].a.FechaRegistro_Trabajador_H.split('T')[0]);
  $("#dat_hc_cod_colaborador").val(paObj_hc[IdHC].a.CodigoColaborador_Trabajador_H);
  $("#dat_hc_telefono_trabajador").val(paObj_hc[IdHC].a.Telefono_Trabajador_H);
  $("#dat_hc_direccion_trabajador").val(paObj_hc[IdHC].a.Direccion_Trabajador_H);
  $("#dat_hc_sexo_trabajador").val(paObj_hc[IdHC].a.Sexo_Trabajador_H);
  $("#dat_hc_nacimiento_trabajador").val(paObj_hc[IdHC].a.LugarNacimiento_Trabajador_H);
  $("#dat_hc_edad_trabajador").val(paObj_hc[IdHC].a.Edad_Trabajador_H);

  // DATOS DE LA EMPRESA
  $("#dat_hc_puesto_trabajo_empresa").val(paObj_hc[IdHC].a.PuestoTrabajo_Empresa_H);
  $("#dat_hc_jefe_inmediato_empresa").val(paObj_hc[IdHC].a.JefeInmediato_Empresa_H);
  $("#dat_hc_celular_empresa").val(paObj_hc[IdHC].a.Celular_Empresa_H);
  $("#dat_hc_telefono_empresa").val(paObj_hc[IdHC].a.Telefono_Empresa_H);
  $("#dat_hc_puesto_jefe_empresa").val(paObj_hc[IdHC].a.PuestoTrabajo_Empresa_H);

  // SIGNOS VITALES
  $("#dat_hc_presion_arterial_sv").val(paObj_hc[IdHC].a.PresionArterial_SV);
  $("#dat_hc_frecuencia_cardiaca_sv").val(paObj_hc[IdHC].a.FrecuenciaCardiaca_SV);
  $("#dat_hc_frecuencia_respiratoria_sv").val(paObj_hc[IdHC].a.FrecuenciaRespiratoria_SV);
  $("#dat_hc_temperatura_sv").val(paObj_hc[IdHC].a.Temperatura_SV);
  $("#dat_hc_peso_sv").val(paObj_hc[IdHC].a.PesoKg_SV);
  $("#dat_hc_talla_sv").val(paObj_hc[IdHC].a.Talla_SV);
  $("#dat_hc_saturacion_sv").val(paObj_hc[IdHC].a.Saturacion_SV);
  $("#dat_hc_masa_corporal_sv").val(paObj_hc[IdHC].a.IndiceMasaCorporal_SV);
  $("#dat_hc_perimetro_abdominal_sv").val(paObj_hc[IdHC].a.PerimetroAbdominal_SV);
}


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
  $('.input_hc_sp3').find('input[type=text]').val('');
  $('.input_hc_sp3').find('input[type=date]').val('');
  $('.input_hc_sp3').find('input[type=number]').val(0);
  $('.input_hc_sp3').find('input[type=checkbox]').prop('checked', false);
  $('.input_hc_sp3').find('select').val('');
}

function hcSp3ConfirmGuardarHistoriaClinica() {
  if (hcSp3ValidarDatos().length > 0) {
    return;
  }

  let nombres = $("#dat_hc_nombres_trabajador").val();
  let apellidos = $("#dat_hc_apellidos_trabajador").val();
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
    confirmButtonText: `Confirmar <img class="inject-svg" src="./images/sho/confirm.svg" alt="" fill="#fff" width="18px">`,
    cancelButtonText: `Cancelar <img class="inject-svg" src="./images/sho/cancelar.svg" alt="" fill="#fff" width="18px">`,
  }).then((result) => {
    hcSp3GuardarHistoriaClinica(idHC)
    if (result.isConfirmed) {
      Swal.fire({
        title: "Se terminó con éxito el registro",
        iconColor: "#8fbb02",
        iconHtml: '<img src="./images/sho/check.svg" width="28px">',
        showConfirmButton: false,
        padding: "3em 3em 6em 3em ",
        timer: 1500,
      }).then(() => {

      });
    }

  });
  SVGInject($(".inject-svg"));
}


function hcSp3DatosFormulario(id) {
  let data = {};
  let fecha = new Date();
  // EXTRAS

  data.IdHC = id;
  data.IdSV = idSV;

  // console.log(idSV);
  data.PacienteExterno = ($('#dat_hc_externo_trabajador:checked').val()) ? 1 : 0;


  // DATOS DEL TRABAJADO
  data.NroDocumento_Trabajador_H = ($("#dat_hc_dni_trabajador").val()) ? Number($("#dat_hc_dni_trabajador").val()) : 0;
  data.Nombres_Trabajador_H = ($("#dat_hc_nombres_trabajador").val()) ? $("#dat_hc_nombres_trabajador").val() : "vacio";
  data.Apellidos_Trabajador_H = ($("#dat_hc_apellidos_trabajador").val()) ? $("#dat_hc_apellidos_trabajador").val() : "vacio";
  data.FechaRegistro_Trabajador_H = ($("#dat_hc_fecha_trabajador").val()) ? $("#dat_hc_fecha_trabajador").val() : fecha.toISOString().split('T')[0];
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
  let data = hcSp3DatosFormulario(idHC);

  data.IdHashPaciente_Trabajador_H = "idHashPacienteForaneo";
  data.IdHashJefeInmediato_Empresa_H = "idHashJufeForaneo";
  data.SedeId_Empresa_H = ($("#dat_hc_planta_empresa").val()) ? Number($("#dat_hc_planta_empresa").val()) : 0;
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
      handlerUrlhtml('contentGlobal', 'view/sho-hce/historia_clinica/gestionHistoriaClinica.html', 'Historia clínica electrónica');
    }
    idHC = response.Id;
  }).fail((e) => {
    console.log(e);
  })

  // console.log(data);

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

  // console.log(data);
  $.ajax(settings).done((response) => {
    // console.log(response);
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
          <div class="item_ant item_ant_${data.IdTipA_A} row" data-idant="${data.IdA}" data-idtipa="${data.IdTipA_A}">
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
            <tr data-idant="${data.IdA}" data-idtipa="${data.IdTipA_A}" class="item_ant_oc item_ant_3">
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
    $(`tr[data-idant='${id}']`).find('input').attr('readonly', false);
    $(`tr[data-idant!='${id}']`).find('input').attr('readonly', true);
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

  if ($(`tr[data-idant='${id}']`).find('input').attr('readonly')) {
    $(`#info_content_table_ant_oc`).find('#btn_ant_oc_editar').show();
    $(`#info_content_table_ant_oc`).find('#btn_ant_oc_guardar').hide();
  } else {
    $(`#info_content_table_ant_oc`).find('#btn_ant_oc_editar').hide();
    $(`#info_content_table_ant_oc`).find('#btn_ant_oc_guardar').show();
  }
}


function hcSp3ValidarDatos() {
  let error = [];
  let inputs = $('.input_hc_sp3 input');
  let selects = $('.input_hc_sp3 select');

  inputs.each((e) => {
    if (!inputs.eq(e).val()) {
      inputs.eq(e).addClass('is-invalid');
      inputs.eq(e).parent().find('.invalid-feedback').remove();
      inputs.eq(e).parent().append(`<div class="invalid-feedback">Requerido!</div>`)
      error.push(inputs.eq(e).val())
    }
    if (inputs.eq(e).val()) {
      inputs.eq(e).removeClass('is-invalid');
    }
  })

  selects.each((e) => {
    if (!selects.eq(e).val()) {
      selects.eq(e).addClass('is-invalid');
      selects.eq(e).parent().find('.invalid-feedback').remove();
      selects.eq(e).parent().append(`<div class="invalid-feedback">Requerido!</div>`)
      error.push(selects.eq(e).val())
    }
    if (selects.eq(e).val()) {
      selects.eq(e).removeClass('is-invalid');
    }
  })
  // console.log(error);
  return error;
}

function hcSp3CancelarHistoria() {
  if (estadoHC == 0) {
    for (let i = 1; i <= 6; i++) {
      let content = $(`#content_ant_${i}`).find(`.item_ant_${i}`);
      content.each((e) => {
        let idAnt = content.eq(e).data().idant;
        let idTipa = content.eq(e).data().idtipa;
        hcSp3EliminarAntecedentes(idAnt, idTipa);
      })
    }

    let url = `https://5h0-dev-salud.azurewebsites.net/api/hce_Post_004_historia_clinica_eliminadoLogico?code=Dz5es97V2LzS94zA/eJQhK33rsYqTk1fRLWDbMTXqFwL3CuTAM/dnQ==&httpmethod=post`;

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
      "data": JSON.stringify({
        "IdHC": idHC
      })
    };

    $.ajax(settings).done((response) => {
      cargarViewHistoria();
    }).fail((e) => {
      // console.log(e);
    })
  } else {
    cargarViewHistoria();
  }

}

function cargarAreasSedesGerencia() {
  let url = `https://550m44ud1tmg7454-inspection-dev.azurewebsites.net/api/a_get_lista_sedes_areas_gerencia?code=5sz/nIVDXtW7t97kzgfOyzuN4yYq6FEfuJoZSlk3DzGQ9AMLu7k6WQ==&IdSede=0&IdArea=0&IdGerencia=0`;

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
    "headers": headers
  };

  $.ajax(settings).done((response) => {
    paObj_hc.Areas = response.Area;
    paObj_hc.Sedes = response.Sedes;
    paObj_hc.Gerencias = response.Gerencia;

    paObj_hc.Areas.forEach((e) => {
      let content = $('#dat_hc_area_empresa');
      if (idHC != 0) {
        content.append(`
          <option value="${e.Id}" ${(paObj_hc[idHC].a.AreaId_Empresa_H) == e.Id ? 'selected' : ''}>${e.Description}</option>
        `)
      } else {
        content.append(`
          <option value="${e.Id}">${e.Description}</option>
        `)
      }

    })

    paObj_hc.Sedes.forEach((e) => {
      let content = $('#dat_hc_planta_empresa');
      // console.log(e);
      if (idHC != 0) {
        content.append(`
        <option value="${e.Id}" ${(paObj_hc[idHC].a.PlantaId_Empresa_H) == e.Id ? 'selected' : ''}>${e.Description}</option>
      `)
      } else {
        content.append(`
          <option value="${e.Id}">${e.Description}</option>
        `)
      }
    })

    paObj_hc.Gerencias.forEach((e) => {
      let content = $('#dat_hc_gerencia_empresa');
      // console.log(e);

      if (idHC != 0) {
        content.append(`
        <option value="${e.Id}" ${(paObj_hc[idHC].a.GerenciaId_Empresa_H) == e.Id ? 'selected' : ''}>${e.Description}</option>
      `)
      } else {
        content.append(`
          <option value="${e.Id}">${e.Description}</option>
        `)
      }
    })
  }).fail((e) => {
    console.log(e);
  })
}

function cargarDatosGenerales(id) {
  idHC = id;
  showLoading();
  cargarAreasSedesGerencia();
  handlerUrlhtml('contentGlobal', 'view/sho-hce/historia_clinica/datosGenerales.html', 'Historia Clínica');
  let url = `https://5h0-dev-salud.azurewebsites.net/api/hce_Get_003_historia_clinica_datos_generales?code=EGqLSsRdXVPm7TSRIZ6/MGieka3md/u1gwzEwWcGhOjMZqDNK1jjRw==`;

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
    "data": { "IdHC": id }
  };

  $.ajax(settings).done((response) => {
    // console.log(" datos generales", response);
    if (response.HistoriaExamenAuxiliar.length > 0) {
      dgSp3AtencionesMedicas(response.HistoriaAtencionMedica);
      paObj_hc[idHC].HistoriaExamenAuxiliar = response.HistoriaExamenAuxiliar;
      dgSp3ExamenAuxiliar(response.HistoriaExamenAuxiliar, response.HistoriaTipoExamen);
    }

    if (response.HistoriaClin[0].FotoPacienteBase64) {
      $("#img_file_perfil").attr("src", response.HistoriaClin[0].FotoPacienteBase64);
    } else {
      $("#img_file_perfil").attr("src", 'images/sho/profile.png')
    }

    setTimeout(() => {
      cargarTiposExamen(response.HistoriaTipoExamen);
      dgSp3DatosTrabajador(response.HistoriaClin[0]);
      dgSp3SignosVitales(response.HistoriaSignosVitales[0]);
      dgSp3AdjuntoEvidencia(response.HistoriaAdjuntoEvidencia);

      // console.log(response.HistoriaAdjuntoEvidencia[0]);
      hideLoading();
    }, 1200)

  })
}

function dgSp3DatosTrabajador(obj) {
  paObj_hc.Sedes.forEach((e) => {
    if (e.Id == obj.PlantaId_Empresa_H) {
      $('#dat_dg_planta_trabajador').text(e.Description);
    }
  });
  paObj_hc.Areas.forEach((e) => {
    if (e.Id == obj.AreaId_Empresa_H) {
      $('#dat_dg_area_trabajador').text(e.Description);
    }
  });
  paObj_hc.Gerencias.forEach((e) => {
    if (e.Id == obj.GerenciaId_Empresa_H) {
      $('#dat_dg_gerencia_trabajador').text(e.Description);
    }
  });
  $('#dat_dg_dni_trabajador').text(obj.NroDocumento_Trabajador_H);
  $('#dat_dg_edad_trabajador').text(obj.Edad_Trabajador_H);
  $('#dat_dg_nombres').text(obj.Nombres_Trabajador_H);
  $('#dat_dg_apellidos').text(obj.Apellidos_Trabajador_H);
  $('#dat_dg_sexo_trabajador').text((obj.Sexo_Trabajador_H == 1) ? 'Masculino' : 'Femenino');
  $('#dat_dg_puesto_trabajador').text(obj.PuestoTrabajo_Empresa_H);
}

function dgSp3SignosVitales(obj) {
  $('#dat_dg_presion_arterial_sv').val(obj.PresionArterial_SV);
  $('#dat_dg_frecuencia_cardiaca_sv').val(obj.FrecuenciaCardiaca_SV);
  $('#dat_dg_frecuencia_respiratoria_sv').val(`${obj.FrecuenciaRespiratoria_SV} %`);
  $('#dat_dg_temperatura_sv').val(obj.Temperatura_SV);
  $('#dat_dg_peso_sv').val(obj.PesoKg_SV);
  $('#dat_dg_talla_sv').val(obj.Talla_SV);
  $('#dat_dg_saturacion_sv').val(`${obj.Saturacion_SV} %`);
  $('#dat_dg_masa_corporal_sv').val(obj.IndiceMasaCorporal_SV);
  $('#dat_dg_perimetro_abdominal_sv').val(obj.PerimetroAbdominal_SV);
  $('#dat_dg_ultimo_registro_sv').text(date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(obj.FechaRegistro_SV));
}

function dgSp3AtencionesMedicas(obj) {
  // console.log("atenciones", obj)
  let content = $('#content_hc_adjunto_evidencia');
  content.html(' ');
  obj.forEach((e) => {
    content.append(`
      <div class="col-md-6">
        <div class="card card-border">
          <div class="card-body">
            <span style="color: #01719d;"><b>Motivo:</b> Dolor de espalda</span>
            <br>
            <span><b>Atendido por:</b> ${e.AtendidoPor}</span>
            <span class="mt-3" style="color: #d8801f; float: right;">Jun 03, 2021 - 11:07 AM</span>
          </div>
        </div>
      </div>
    `)
  })
}


function dgSp3CargarEvidencia() {
  let url = `https://5h0-dev-salud.azurewebsites.net/api/hce_Get_003_historia_clinica_datos_generales?code=EGqLSsRdXVPm7TSRIZ6/MGieka3md/u1gwzEwWcGhOjMZqDNK1jjRw==`;

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
    "data": { "IdHC": idHC }
  };

  $.ajax(settings).done((response) => {
    dgSp3AdjuntoEvidencia(response.HistoriaAdjuntoEvidencia);
    $('#hc_spin_guardar_evidencia').hide();
  })
}

function dgSp3AdjuntoEvidencia(obj) {
  if (obj.length > 0) {
    $('#dg_hc_adjunto_evidencia_cantidad span').text(`${obj.length} Registros`);
    $('#dg_hc_adjunto_evidencia_cantidad').show();
    $('#dg_hc_adjunto_evidencia_table').show();
    $('#dg_hc_adjunto_evidencia_cantidad').show();
    let content = $('#dg_hc_adjunto_evidencia_content');
    content.html(' ');
    obj.forEach((e) => {
      $(`#hc_spin_borrar_evidencia_${e.Id}`).hide();
      $(`#hc_btn_borrar_evidencia_${e.Id}`).show();
      content.append(`
      <tr>
        <td>${e.NombreArchivo}</td>
        <td>${date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(e.CreadoFecha)}</td>
        <td>
          <button type="button" class="btn btn-link shadow-none float-right" id="hc_spin_borrar_evidencia_${e.Id}" style="display:none">
            <div class="spinner-border text-danger spinner-border-sm" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </button>          
          <button onclick="dgSp3EliminarEvidencia(${e.Id})" id="hc_btn_borrar_evidencia_${e.Id}" type="button" class="btn btn-link shadow-none float-right">
            <img class="inject-svg" src="./images/sho/delete.svg" alt="" fill="#ff3636" width="16px">
          </button>
          <a class="btn btn-link shadow-none float-right" href="${e.ArchivoBase64}" download="${e.NombreArchivo}">
            <img class="inject-svg" src="./images/sho/download.svg" fill="#207345" style="width:16px !important" />
          </a>
        </td>
      </tr>
    `)
    })
  }
  SVGInject($(".inject-svg"));
}

function dgSp3GuardarEvidencias(element) {
  $('#hc_spin_guardar_evidencia').show();
  let file = element.files[0];
  let reader = new FileReader();
  reader.onloadend = function() {
    $("#dg_hc_file_upload_evidencias").attr("data-file64", reader.result);

    let data = {};
    data.IdHC = idHC;
    data.NombreArchivo = element.files[0].name;
    data.IdHashUser = "UsuarioIdlogeado";
    data.ArchivoBase64 = reader.result;

    let url = `https://5h0-dev-salud.azurewebsites.net/api/hce_Post_015_historia_clinica_adjuntar_evidencia?code=aYdc1Bw98bAktOuhkUO03iCaSX5BNq09FjisS6Pz72oReIT89Mj8ww==&httpmethod=post`;

    let headers = {
      "apikey": constantes.apiKey,
      "Content-Type": "application/json"
    }

    let settings = {
      "url": url,
      "method": "post",
      "dataType": 'json',
      "headers": headers,
      "data": JSON.stringify(data)
    };

    $.ajax(settings).done((response) => {
      dgSp3CargarEvidencia();
    })
  }
  reader.readAsDataURL(file);
}

function dgSp3EliminarEvidencia(id) {
  $(`#hc_spin_borrar_evidencia_${id}`).show();
  $(`#hc_btn_borrar_evidencia_${id}`).hide();
  let data = {};

  data.IdHC = idHC;
  data.IdAdjEvid = id; //Id Adjunto evidencia 
  data.IdHashUser = "IdUsuario3434Logedo";

  let url = `https://5h0-dev-salud.azurewebsites.net/api/hce_Post_016_historia_clinica_adjuntar_evidencia_eliminadoLogico?code=61dRGYMJRG32n4eNi8IddXIaAJg0JSOIS0NWPkBScHGJpwYdo45Rzg==&httpmethod=post`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "post",
    "dataType": 'json',
    "headers": headers,
    "data": JSON.stringify(data)
  };

  $.ajax(settings).done((response) => {
    // console.log("response evidencias", response);
    dgSp3CargarEvidencia();
  })
}

function dgSp3AdjuntarImagen(img) {
  $('#hc_spin_adjuntar_imagen').show();
  let data = {}

  data.IdHC = idHC;
  data.NombreFoto = `foto_${idHC}_hc`;
  data.FotoPacienteBase64 = img;

  let url = `https://5h0-dev-salud.azurewebsites.net/api/hce_Post_005_historia_clinica_adjuntar_foto?code=s3R5opJMsUPopiAD1YCFEPahBYF0CV3vYou6A5Xz6yqkspClne5jAw==&httpmethod=post`;

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
    // console.log("response", response);
    $('#hc_spin_adjuntar_imagen').hide();
  })
}


function encodeImgtoBase64(element) {
  var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = function() {
    dgSp3AdjuntarImagen(reader.result);
    setTimeout(() => {
      $("#img_file_perfil").attr("src", reader.result);
    }, 2000);
  }
  reader.readAsDataURL(file);
}

function encodeFiletoBase64(element) {
  var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = function() {
    $("#file_upload").attr("data-file64", reader.result);
  }
  reader.readAsDataURL(file);
}

function dgSp3CargarExamenAuxiliar() {
  let url = `https://5h0-dev-salud.azurewebsites.net/api/hce_Get_003_historia_clinica_datos_generales?code=EGqLSsRdXVPm7TSRIZ6/MGieka3md/u1gwzEwWcGhOjMZqDNK1jjRw==`;

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
    "data": { "IdHC": idHC }
  };

  $.ajax(settings).done((response) => {
    dgSp3ExamenAuxiliar(response.HistoriaExamenAuxiliar, response.HistoriaTipoExamen);
  })
}

function dgSp3ExamenAuxiliar(obj, tps) {
  let content_Examen = $(`#content_axamen_auxiliar`);
  // console.log(" Examen" + obj)
  content_Examen.html(' ');
  $('#hc_spin_examen').hide();

  // console.log("auxi", obj.length)

  if (obj.length > 0) {
    obj.forEach((obje) => {
      let tip_examen = '';
      tps.forEach((objt) => {
        if (obje.TipoExamenId == objt.Id) {
          tip_examen = objt.Descripcion;
        }
      })
      content_Examen.append(`
      <tr class="item_ant_oc item_ant_3" data-idexamen="${obje.Id}">
        <td><span>${date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(obje.FechaExamenes)}</span></td>
        <td><span>${tip_examen}</span></td>
        <td><span>${date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(obje.CreadoFecha)}</span></td>
        <td><span>${obje.Conclusion}</span></td>
        <td><span>${obje.NombreArchivo}</span></td>
        <td>
          <div class="more-info" id="more_info_table_examen_${obje.Id}" onclick="mostrarMenuTableExamen(${obje.Id},'${obje.NombreArchivo}')">
            <img src="images/iconos/menu_responsive.svg" alt="" />
          </div>
        </td>
      </tr>
    `);
    })
  }

  $('#cant_dg_examen').text(`${obj.length} Registros`);
}

function mostrarMenuTableExamen(id, nombre) {
  let content = $('#info_content_table_examen');
  let archivo = '';
  paObj_hc[idHC].HistoriaExamenAuxiliar.forEach((e) => {
    if (e.Id == id) {
      archivo = e.ArchivoBase64;
    }
  })
  content.html(`
    <div class="more-info-content more_info_examen">
      <ul>
        <li onclick="dgSp3EditarExamen(${id})" id="btn_examen_editar">
          <img class="inject-svg" src="./images/sho/edit.svg" fill="#5daf57" style="width:16px !important" />
          <span>Editar</span>
        </li>
        <li onclick="dgSp3EliminarExamen(${id})">
          <img class="inject-svg" src="./images/sho/delete.svg" fill="#ff3636" style="width:16px !important" />
          <span>Eliminar</span>
        </li>
        <li id="btn_examen_adjuntar">
          <label for="dg_hc_file_upload_examen" style="display: contents; cursor: pointer">
            <img class="inject-svg" src="./images/sho/upload.svg" fill="#8fbb02" style="width:16px !important" />
            <span>${(!archivo) ? 'Adjuntar documento' : 'Actualizar documento'}</span>
          </label>          
          <input type="file" id="dg_hc_file_upload_examen" accept="application/pdf, .pdf, .doc, docx, .odf" onchange="dgSp3CargarAdjuntoExamen(this,${id})" style="display: none">
        </li>
        <li id="btn_examen_descargar" ${(!archivo) ? 'style="display:none"' : ''}>
          <a href="${archivo}" download="${nombre}" style="text-decoration:none; text-decoration: none;color: #000; display: contents;">
            <img class="inject-svg" src="./images/sho/download.svg" fill="#207345" style="width:16px !important" />
            <span>Descargar documento</span>
          </a>
        </li>
      </ul>
    </div>
  `);
  SVGInject($(".inject-svg"));
  const position = $(`#more_info_table_examen_${id}`).position();
  $(`.more_info_examen`).css("left", `${position.left}px`);
  $(`.more_info_examen`).css("top", `${position.top}px`);
  $(`.more_info_examen`).slideToggle();

  if ($(`tr[data-idexamen='${id}']`).find('input').attr('readonly')) {
    $(`#info_content_table_examen`).find('#btn_ant_oc_editar').show();
    $(`#info_content_table_examen`).find('#btn_ant_oc_guardar').hide();
  } else {
    $(`#info_content_table_examen`).find('#btn_ant_oc_editar').hide();
    $(`#info_content_table_examen`).find('#btn_ant_oc_guardar').show();
  }
}

function dgSp3CargarAdjuntoExamen(element, id) {
  $('#hc_spin_examen').show();
  var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = function() {
    $("#file_upload").attr("data-file64", reader.result);
    let data = {};
    data.NombreArchivo = element.files[0].name;
    data.ArchivoBase64 = reader.result;
    dgSp3GuardarExamen(id, data);
  }
  reader.readAsDataURL(file);
}

function hcSp3ValidarDatosExamen() {
  let error = [];
  let inputs = $('.input_examen_hc input');
  let selects = $('.input_examen_hc select');
  inputs.each((e) => {
    if (!inputs.eq(e).val()) {
      inputs.eq(e).addClass('is-invalid');
      inputs.eq(e).parent().find('.invalid-feedback').remove();
      inputs.eq(e).parent().append(`<div class="invalid-feedback">Requerido!</div>`)
      error.push(inputs.eq(e).val())
    }
    if (inputs.eq(e).val()) {
      inputs.eq(e).removeClass('is-invalid');
    }
  })

  selects.each((e) => {
    if (!selects.eq(e).val()) {
      selects.eq(e).addClass('is-invalid');
      selects.eq(e).parent().find('.invalid-feedback').remove();
      selects.eq(e).parent().append(`<div class="invalid-feedback">Requerido!</div>`)
      error.push(selects.eq(e).val())
    }
    if (selects.eq(e).val()) {
      selects.eq(e).removeClass('is-invalid');
    }
  })
  return error;
}

function dgSp3GuardarExamen(idEA, adjunto) {

  $('#hc_spin_guardar_examen').show();

  let data = {}

  data.IdHC = idHC;
  data.IdEA = idEA;
  data.IdHashUser = "UsuarioIdlogeado";

  if (idEA == 0) {
    if (hcSp3ValidarDatosExamen().length > 0) {
      return
    }
    data.NombreArchivo = "";
    data.ArchivoBase64 = "";
    data.Conclusion = $('#dat_dg_conclusion_examen').val();
    data.FechaExamenes = $('#dat_dg_fecha_examen').val();
    data.IdTipEA = $('#dat_dg_tipo_examen').val();
  }

  if (idEA > 0 && !adjunto) {
    paObj_hc[idHC].HistoriaExamenAuxiliar.forEach((e) => {
      if (e.Id == idEA) {
        data.NombreArchivo = e.NombreArchivo;
        data.ArchivoBase64 = e.ArchivoBase64;
      }
    })
    data.Conclusion = $('#dat_dg_conclusion_examen').val();
    data.FechaExamenes = $('#dat_dg_fecha_examen').val();
    data.IdTipEA = $('#dat_dg_tipo_examen').val();
  }

  if (idEA > 0 && adjunto) {
    paObj_hc[idHC].HistoriaExamenAuxiliar.forEach((e) => {
      if (e.Id == idEA) {
        data.Conclusion = e.Conclusion;
        data.FechaExamenes = e.FechaExamenes;
        data.IdTipEA = e.TipoExamenId;
      }
    })
    data.NombreArchivo = adjunto.NombreArchivo;
    data.ArchivoBase64 = adjunto.ArchivoBase64;
  }

  let url = `https://5h0-dev-salud.azurewebsites.net/api/hce_Post_006_datos_generales_examen_auxiliar?code=vklT07i33PAWYcDvOeiu987UNJrR3vZgg2pnA7XNyy11QSsHa8QXow==&httpmethod=post`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "post",
    "dataType": 'json',
    "headers": headers,
    "data": JSON.stringify(data)
  };

  $.ajax(settings).done((response) => {
    // console.log("response", response);
    $('#hc_spin_examen').show();
    $('#hc_spin_guardar_examen').hide();
    $('#btn_examen_agregar').show();
    $('#btn_examen_guardar').remove();
    dgSp3CargarExamenAuxiliar()
    $('#dat_dg_fecha_examen').val('');
    $('#dat_dg_tipo_examen').val('');
    $('#dat_dg_conclusion_examen').val('');
  })
}

function dgSp3EditarExamen(id) {
  let obj = paObj_hc[idHC].HistoriaExamenAuxiliar;
  $('#btn_examen_agregar').hide();
  $('#btn_examen_guardar').remove();
  $('#btn_examen_agregar').parent().append(`
    <button class="btn btn-success btn-block btn-lg float-right" id="btn_examen_guardar" style="width:200px;" onclick="dgSp3GuardarExamen(${id})"> 
      <div class="spinner-border spinner-border-sm" id="hc_spin_guardar_examen" role="status" style="display: none;">
        <span class="sr-only">Loading...</span>
      </div>
      Guardar
      <img class="inject-svg" src="./images/sho/confirm.svg" alt="" fill="#fff" width="18px">
    </button>
  `)
  SVGInject($(".inject-svg"));
  obj.forEach((e) => {
    if (e.Id == id) {
      $('#dat_dg_conclusion_examen').val(e.Conclusion);
      $('#dat_dg_fecha_examen').val(e.FechaExamenes.split('T')[0]);
      $('#dat_dg_tipo_examen').val(e.TipoExamenId);
      $('#file_upload').val(e.ArchivoBase64);
      $('#file_upload').attr('data-file64', e.ArchivoBase64);
    }
  })

}

function cargarTiposExamen(obj) {
  let content = $('#dat_dg_tipo_examen');
  content.html(' ');
  content.html('<option value=""></option>');
  obj.forEach((e) => {
    content.append(`
      <option value="${e.Id}">${e.Descripcion}</option>
    `)
  })
}

function dgSp3EliminarExamen(idEA) {
  $('#hc_spin_examen').show();
  let data = {}

  data.IdHC = idHC;
  data.IdEA = idEA;
  data.IdHashUser = "UsuarioIdlogeado";

  // console.log(data);

  let url = `https://5h0-dev-salud.azurewebsites.net/api/hce_Post_007_datos_generales_examen_auxiliar_eliminadoLogico?code=r9CO3HsDzLXkumLM/NW7miiJOOgmKGRtIiAOBttmQ8osVg7KcGcOtA==&httpmethod=post`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "post",
    "dataType": 'json',
    "headers": headers,
    "data": JSON.stringify(data)
  };

  $.ajax(settings).done((response) => {
    // console.log("response", response);
    dgSp3CargarExamenAuxiliar()
  })
}

function cargarViewHistoria() {
  handlerUrlhtml('contentGlobal', 'view/sho-hce/historia_clinica/gestionHistoriaClinica.html', 'Historia Clínica');
}


SVGInject($(".inject-svg"));