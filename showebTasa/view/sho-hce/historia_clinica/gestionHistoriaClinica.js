/****************************************************************************************
 * VISUAL SAT - [2021]
 * PROYECTO : SIGTASA
 * ESQUEMA : SSOMA
 * SPRINT  : 3
 * MODULO : HISTORIA CLINICA
 * OPERADORES_________________________________________________________________________
 * | # | PROGRAMADOR     |  |      FECHA   |  |   HORA   |           CORREO           |
 * | 1 | Carlos Rivas    |  |   16/09/2021 |  | 04:28:00 |       crivascyt@gmail.com  |
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



//###########################################################################################################
//------------------------------------------- CLASES -----------------------------------------------------


// function HistoriaClinica() { //-------------------------------------------Class HistoriaClinica()

//   this.a = [];

//   HistoriaClinica.prototype.cargarData = function(data) {
//     this.a = data;
//     // // this.a.II;
//     // this.a.II_BD = 0;//estado inicial, se puede ir al servidor a buscar la informacion.
//   }

// } //-------------------------------------------Class HistoriaClinica()



//------------------------------------------- CLASES -----------------------------------------------------
//###########################################################################################################








/*
//###########################################################################################################
//------------------------------------------- VARIABLES GLOBALES --------------------------------------------

var paObj_hc = []; //objeto que se utilizara y se almacenara toda la informacion de la historia clinica
var DA_TX = []; //DATA DE ATENCIONES MEDICAS ASOCIADAS POR EL ID DE LA HISTORIA CLINICA
var HTMLEXCEL = '';
var idSV = 0;
var idHC = 0;
var estadoHC = 0;
var idA = 0
var menuAnt = 'menu_lateral1'; //contiene los valores del menu anteriormente seleccionado en la historia clinica
var flag_hc = 0; //variable global del contenedor de handler_hc

var mnu = [];
var cachePage = [];
var ddgHtml = "";
var objTemp  = [];

//------------------------------------------- VARIABLES GLOBALES --------------------------------------------
//###########################################################################################################
*/










//#_INI_###########################################################################################################################################################################################
//------------------------------------------- FUNCIONES GENERALES DEL MODULO ------------------------------------  FUNCIONES GENERALES DEL MODULO --------------------------------------------




//#_INI_############################################################################### FUNCIONES :: ANDY VASQUEZ  :: ######################




function verVariablesTemp() {
  console.clear();
  console.log("###################################################################paObj_hc#####################################################################################");
  console.log(paObj_hc);
  console.log("###################################################################paObj_hc#####################################################################################");

  console.log("###################################################################paObj_HC#####################################################################################");
  console.log(paObj_HC);
  console.log("###################################################################paObj_HC#####################################################################################");



}






async function _init_fnSp3SaludOcupacionalEstadoInicial() { //------------------------------------- ini   _init_fnSp3SaludOcupacionalEstadoInicial() -------------------------------------
  showLoading();
  console.log("Arrancamos............................ carga inicial de historia clinica ......._init_fnSp3SaludOcupacionalEstadoInicial.....linea 57");
  await hcSp3CargarGruposSanguineo();
  await fnSp3CargaListasHistoriaClinica();
} //------------------------------------- fini   _init_fnSp3SaludOcupacionalEstadoInicial() -------------------------------------


function sp3HcMenuGenaralIzquierdoEventos(idAccion) { //--------------------------------------------------- acciones y eventos de los menu lateral derecho ----------------------------------


  switch (idAccion) {
    case 1:
      console.log('Entrando a Datos Generales......................');

      if (objTemp.length > 0) {
        paObj_hc = objTemp;
      }

      //_init_fnSp3SaludOcupacionalEstadoInicial();

      console.log('Entrando a Datos Generales......................');
      $('#' + menuAnt).removeClass('active');
      $('#menu_lateral1').addClass('active');
      menuAnt = 'menu_lateral1';
      // handlerUrlhtmlHC("page-content-sidebar", "view/sho-hce/historia_clinica/FormHC_DatosGenerales.html", " Historia Clínicaaa");
      $('#page-content-sidebar').load('view/sho-hce/historia_clinica/FormHC_DatosGenerales.html');
      cargarDatosGenerales(idHC);
      mnu[idAccion] = 1;



      break;

    case 2:
      console.log('Entrando a Datos Generales......................');
      $('#' + menuAnt).removeClass('active');
      $('#menu_lateral2').addClass('active');
      menuAnt = 'menu_lateral2';





      break;

    case 3:
      console.log('Entrando a Datos Generales......................');
      $('#' + menuAnt).removeClass('active');
      $('#menu_lateral3').addClass('active');
      menuAnt = 'menu_lateral3';


      break;

    case 4:
      console.log('Entrando a Datos Generales......................');
      $('#' + menuAnt).removeClass('active');
      $('#menu_lateral4').addClass('active');
      menuAnt = 'menu_lateral4';

      break;

    case 5:
      console.log('Entrando a Datos Generales......................');
      $('#' + menuAnt).removeClass('active');
      $('#menu_lateral5').addClass('active');
      menuAnt = 'menu_lateral5';
      break;

    case 6:

      console.log('Entrando a Datos descansos medicos......................');
      $('#' + menuAnt).removeClass('active');
      $('#menu_lateral6').addClass('active');
      menuAnt = 'menu_lateral6';

      //alert('Entrando a Datos descansos medicos');

      $('#page-content-sidebar').load('view/sho-hce/descansos_medicos/FormHC_DescansoMedico.html');
      $('#page-content-sidebar').css('display', 'block');
      mnu[idAccion] = 1;

      break;


    case 7:
      console.log('Entrando a Enfermedades crónicas......................');
      $('#' + menuAnt).removeClass('active');
      $('#menu_lateral7').addClass('active');
      menuAnt = 'menu_lateral7';

      $('#page-content-sidebar').load('view/sho-hce/enfermedades_cronicas/indexEC.html');
      break;

    case 8:
      console.log('Entrando a Datos Generales......................');
      $('#' + menuAnt).removeClass('active');
      $('#menu_lateral8').addClass('active');
      menuAnt = 'menu_lateral8';
      break;

    case 9:
      console.log('Entrando a Datos Generales......................');
      $('#' + menuAnt).removeClass('active');
      $('#menu_lateral9').addClass('active');
      menuAnt = 'menu_lateral9';
      break;

    case 10:
      console.log('accidentes de trabajo')
      console.log('Entrando a Datos Generales......................');
      $('#' + menuAnt).removeClass('active');
      $('#menu_lateral10').addClass('active');
      menuAnt = 'menu_lateral10';

      $('#page-content-sidebar').load('view/sho-hce/accidente_trabajo/gestionAccidenteTrabajo.html');
      break;

    case 11:
      console.log('Entrando a Datos Generales......................');
      $('#' + menuAnt).removeClass('active');
      $('#menu_lateral11').addClass('active');
      menuAnt = 'menu_lateral11';
      break;

    case 12:
      console.log('Entrando a Datos Generales......................');
      $('#' + menuAnt).removeClass('active');
      $('#menu_lateral12').addClass('active');
      menuAnt = 'menu_lateral12';
      break;

    case 13:
      console.log('Entrando a Datos Generales......................');
      $('#' + menuAnt).removeClass('active');
      $('#menu_lateral13').addClass('active');
      menuAnt = 'menu_lateral13';
      break;

    case 14:
      console.log('Entrando a Datos Generales......................');
      $('#' + menuAnt).removeClass('active');
      $('#menu_lateral14').addClass('active');
      menuAnt = 'menu_lateral14';
      break;

    case 15:
      console.log('Entrando a Datos Generales......................');
      $('#' + menuAnt).removeClass('active');
      $('#menu_lateral15').addClass('active');
      menuAnt = 'menu_lateral15';
      break;

    case 16:
      console.log('Entrando a Datos Generales......................');
      $('#' + menuAnt).removeClass('active');
      $('#menu_lateral16').addClass('active');
      menuAnt = 'menu_lateral16';
      break;


    case 17:
      console.log('Entrando a Interconsulta y transferencias .....................');
      console.log("----------------", idHC, "------------************************---------------------paObj_hc----------", paObj_hc[idHC].a)


      objTemp = paObj_hc;

      $('#' + menuAnt).removeClass('active');
      $('#menu_lateral17').addClass('active');
      menuAnt = 'menu_lateral17';

      $('#page-content-sidebar').load('view/sho-hce/interconsultas_transferencias/FormHC_InterconsultaTransferencia.html');
      //cargarDatosGenerales(idHC);
      $('#page-content-sidebar').css('display', 'block');
      mnu[idAccion] = 1;
      //cargarDatosGenerales_IT(idHC);






      break;

    case 18:
      console.log('Entrando a Datos Generales......................');
      $('#' + menuAnt).removeClass('active');
      $('#menu_lateral18').addClass('active');
      menuAnt = 'menu_lateral18';
      break;



  }




} //--------------------------------------------------- acciones y eventos de los menu lateral derecho ----------------------------------






function fnSp3CargaFiltroEstadoInicialSaludOcupacional() { //------------------------------------- ini   fnSp3CargaFiltroEstadoInicialSaludOcupacional() -------------------------------------
  showLoading();
  var a = $('#dat_hc_a_doc').val();
  var b = $('#dat_hc_a_sede').val();
  var c = $('#dat_hc_a_area').val();
  var d = $('#dat_hc_a_buscar').val();

  var invierte = 0;

  if ((a != '') && (b == 0) && (c == 0) && (d == '')) {
    d = a;
    a = ''
    invierte = 1;
  }

  var url = apiUrlsho+"/api/hce_Get_001_historia_clinica?code=5lJWTsRDsoxqo9VoOxIzfQAPyCTxUTqLpvgY5tuHluCZlSodpQ/Y7w==&NroDocumento_Trabajador_H=" + a + "&AreaId_Empresa_H=" + c + "&SedeId_Empresa_H=" + b + "&Buscador=" + d;

  console.log("326 URL", url);
  var headers = { "apiKey": constantes.apiKey, "Content-Type": "application/json" }
  //alert('api = '+constantes.apiKey);


  if (d != '') { a = '', b = 0, c = 0 }

  var settings = {
    "url": url,
    "method": "GET",
    "timeout": 0,
    "crossDomain": true,
    "dataType": "json",
    "headers": headers
    //,"data": { "NroDocumento_Trabajador_H": a, "AreaId_Empresa_H": c, "SedeId_Empresa_H": c, "Buscador": d } //JSON.stringify(body)
  };



  $.ajax(settings).done(function (response) {
    console.log("**todos**", response);

    // var tabla = [];
    //     tabla[0] = 'NroDocumento_Trabajador_H';

    // var patron = [];
    //     patron[0] = d;


    //let rr = shoBuscadorPrincipal('NroDocumento_Trabajador_H', d, response, HistoriaClinBD, HistoriaClinData);




    if (response.HistoriaClin.length > 0) {//------------------------------------------------    reporte excel  ---------------------------------------------------
      response.HistoriaClin.map(function (Item) {

        $('#dat_hc_a_area').val(Item.AreaId_Empresa_H)
        var AreaId_Empresa_H_S = $('#dat_hc_a_area option:selected').text();

        $('#dat_hc_a_sede').val(Item.SedeId_Empresa_H)
        var SedeId_Empresa_H_S = $('#dat_hc_a_sede option:selected').text();
        var f1 = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.FechaRegistro_Trabajador_H);


        HTMLEXCEL += `     
                           <tr  style="border: 1px !important;color: #000;">
                           <th  style="border: 1px !important;">${Item.CodigoPaciente_H}</th> 
                           <th  style="border: 1px !important;"> ${Item.NroDocumento_Trabajador_H}</th>
                           <th  style="border: 1px !important;"> ${Item.Nombres_Trabajador_H}</th> 
                           <th  style="border: 1px !important;"> ${Item.Apellidos_Trabajador_H}</th>
                           <th  style="border: 1px !important;"> ${AreaId_Empresa_H_S}</th>
                           <th  style="border: 1px !important;"> ${SedeId_Empresa_H_S}</th>

                           <th  style="border: 1px !important;"> ${Item.Telefono_Trabajador_H}</th>
                           <th  style="border: 1px !important;"> ${f1}</th>
                           <th  style="border: 1px !important;"> ${Item.Diagnostico_AM}</th>
                           <th  style="border: 1px !important;"> ${Item.Aptitud_AM}</th>  

                           <th  style="border: 1px !important;"> ${Item.FechaUltimoEMO}</th>  
                           <th  style="border: 1px !important;"> ${Item.FechaUltimoVMO}</th> 
                          </tr>
                            `;

      });


    }//------------------------------------------------    reporte excel  ---------------------------------------------------

    if (response.HistoriaClin.length > 0) {
      $('#cant_hist_cli').html('' + response.HistoriaClin.length + ' registros');
      $('#bodyTablaSinAuditorias').css('display', 'none');

      $('#pagination-container-EvalAud').pagination({
        dataSource: response.HistoriaClin,
        pageSize: 4,
        callback: function (data, pagination) {
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
          $('#dat_hc_a_buscar').val(d);

              if(invierte == 1)
              {
               $('#dat_hc_a_buscar').val('');
               $('#dat_hc_a_doc').val(d);}



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
  var u = 0;
  data.forEach((Item) => {



    //console.log(Item.NroDocumento_Trabajador_H,' coincide = ', HistoriaClinBD[Item.IdHC] );  


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
                                                                                                          <a class="dropdown-item" onclick="amSp3NuevaAtencionMedica(${Item.IdHC},1)"><img src="./images/sho/moreIcon.svg" alt="" /> &nbsp;&nbsp; Nueva atención médica</a>
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


    //   HTMLEXCEL += `                                                                                                               <tr  style="border: 1px !important;color: #000;">
    //                                                                                                                                <th  style="border: 1px !important;">${Item.CodigoPaciente_H}</th> 
    //                                                                                                                                <th  style="border: 1px !important;"> ${Item.NroDocumento_Trabajador_H}</th>
    //                                                                                                                                <th  style="border: 1px !important;"> ${Item.Nombres_Trabajador_H}</th> 
    //                                                                                                                                <th  style="border: 1px !important;"> ${Item.Apellidos_Trabajador_H}</th>
    //                                                                                                                                <th  style="border: 1px !important;"> ${AreaId_Empresa_H_S}</th>
    //                                                                                                                                <th  style="border: 1px !important;"> ${SedeId_Empresa_H_S}</th>

    //                                                                                                                                <th  style="border: 1px !important;"> ${Item.Telefono_Trabajador_H}</th>
    //                                                                                                                                <th  style="border: 1px !important;"> ${f1}</th>
    //                                                                                                                                <th  style="border: 1px !important;"> ${Item.Diagnostico_AM}</th>
    //                                                                                                                                <th  style="border: 1px !important;"> ${Item.Aptitud_AM}</th>  

    //                                                                                                                                <th  style="border: 1px !important;"> ${Item.FechaUltimoEMO}</th>  
    //                                                                                                                                <th  style="border: 1px !important;"> ${Item.FechaUltimoVMO}</th> 
    //                                                                                                                               </tr>
    //                                                                                                                                 `;



  });



  hideLoading();
  //console.log(html);



  $('#dat_hc_a_area').val(0)
  $('#dat_hc_a_sede').val(0)



  return html;


} //------------------------------------------------------- ini   fnSp3ListarTablaGeneralH() --------------------------------


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

  return $.ajax(settings).done(function (response1) {
    console.log("**fnSp3CargaListasHistoriaClinica**", response1);

    sedeAreaGerencia = response1;
    //ahora vamos a recibire el servicio

    var n = response1.Sedes.length;
    var nk = 0;
    var m = response1.Area.length;
    var mk = 0;

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    $("#" + 'dat_hc_a_sede').html(" ");
    $("#" + 'dat_la_sede').css('font-size', '13px'); //lecciones aprendidas
    $("#" + 'dat_hc_a_sede').html("<option selected value='0'>          </option>");

    response1.Sedes.map(function (item) {
      $("#" + 'dat_hc_a_sede').append(`<option value='${item.Id}' title='${item.Description}' style='font-weight: bold;'>${item.Description}</option>`);
      nk++
    });

    if (n == nk) {
      //alert('entre 309 termino sede = '+nk)
      //--------------------------------------------------------------------------------------------------------------------------------------------------------------
      $("#" + 'dat_hc_a_area').html(" ");
      $("#" + 'sel_filter_estado_p').css('font-size', '13px');
      $("#" + 'dat_hc_a_area').html("<option selected value='0'>          </option>");
      var tempa = [];
      response1.Area.map(function (item) {
        //$("#" + 'dat_hc_a_area').append(`<option value='${item.Id}' title='${item.Description}' >${item.Description}</option>`);
        // mk++;

        //********************************************
        var marca = 0;
        for (let i = 0; i < tempa.length; i++) { if (tempa[i] == item.Description) { marca = 1; } }

        if (marca == 0) {
          tempa[tempa.length] = item.Description;
          $("#" + 'dat_hc_a_area').append(`<option value='${item.Id}' title='${item.Description}' >${item.Description}</option>`);
          mk++;

        }
        marca = 0;


        //********************************************
      });
      //alert("tempa.length ="+tempa.length)
      //alert("tempa.length ="+tempa.length)
      // if (tempa.length == mk) {
      // alert('entre 309 termino area = '+mk)
      // hideLoading();
      fnSp3CargaFiltroEstadoInicialSaludOcupacional();
      // }
      //--------------------------------------------------------------------------------------------------------------------------------------------------------------
    }






    //--------------------------------------------------------------------------------------------------------------------------------------------------------------






  }




  );

  // hideLoading();
  // fnSp3CargaFiltroEstadoInicialSaludOcupacional();

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
  link.download = 'Listado_Historias_Clinicas - ';
  link.click();
}


function date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(fechaBD) { //--------------------------------------------------------------------------------

  var startDate = moment(fechaBD).format('DD/MM/YYYY'); //dddd
  var year = moment(fechaBD).format('YYYY'); //dddd
  var month = moment(fechaBD).format('MM'); //
  var day = moment(fechaBD).format('DD');
  //var startDate2   = year +"/"+ month +"/"+ day;
  var startDate2 = day + "/" + month + "/" + year

  return startDate2;
} //--------------------------------------------------------------------------------

function exportarExcelBandeja() { //------------------------ ini exportarExcelBandeja  ------------------------------

  //alert('linea 396--> Carlos integrar llamdo de : exportarExcelBandeja()');
  fnExcelReportPAHC();

} //------------------------ fin  exportarExcelBandeja  ------------------------------

























//#### FUNCIONES :: ANDY VASQUEZ  :: #################################################################################################_FIN_#









//#_INI_############################################################################### FUNCIONES :: CARLOS RIVAS  :: ######################



async function showNuevaHC() { //------------------------ ini showNuevaHC  ------------------------------
  idHC = 0;
  idSV = 0;
  estadoHC = 0;
  handlerUrlhtml('contentGlobal', 'view/sho-hce/historia_clinica/nuevaHistoriaClinica.html', 'Registrar nueva H.C.');
  await hcSp3GuardarHistoriaClinica();
  setTimeout(() => {
    mostrarAreasGerenciaSedes();
    mostrarGrupoSanguineo();
  }, 2000)
} //------------------------ fin  showNuevaHC  ------------------------------




function divEditaHistoria(IdHC) { //------------------------ ini divEditaHistoria  ------------------------------
  idHC = IdHC;
  idSV = paObj_hc[IdHC].a.IdSV;
  estadoHC = 1;
  showLoading();
  handlerUrlhtml('contentGlobal', 'view/sho-hce/historia_clinica/nuevaHistoriaClinica.html', 'Registrar nueva H.C.');
  for (let i = 1; i <= 6; i++) {
    hcSp3MostrarAntecedentes(i)
  }
  setTimeout(() => {
    cargarDatosHistoria(IdHC);
    mostrarGrupoSanguineo();
    hideLoading();
  }, 2000);

} //------------------------ fin  divEditaHistoria  ------------------------------

function cargarDatosHistoria(IdHC) {
  mostrarAreasGerenciaSedes();
  mostrarGrupoSanguineo();
  $("#dat_hc_dni_trabajador").val(paObj_hc[IdHC].a.NroDocumento_Trabajador_H);
  $("#dat_hc_nombres_trabajador").val(paObj_hc[IdHC].a.Nombres_Trabajador_H);
  $("#dat_hc_apellidos_trabajador").val(paObj_hc[IdHC].a.Apellidos_Trabajador_H);
  $("#dat_hc_fecha_trabajador").val(paObj_hc[IdHC].a.FechaRegistro_Trabajador_H.split('T')[0]);
  $("#dat_hc_cod_colaborador").val(paObj_hc[IdHC].a.CodigoColaborador_Trabajador_H);
  $("#dat_hc_telefono_trabajador").val(paObj_hc[IdHC].a.Telefono_Trabajador_H);
  $("#dat_hc_direccion_trabajador").val(paObj_hc[IdHC].a.Direccion_Trabajador_H);
  $("#dat_hc_sexo_trabajador").val(paObj_hc[IdHC].a.Sexo_Trabajador_H);
  $("#dat_hc_nacimiento_trabajador").val(paObj_hc[IdHC].a.LugarNacimiento_Trabajador_H);
  $("#dat_hc_fecha_nacimiento_trabajador").val(paObj_hc[IdHC].a.A_FechaNacimiento.split('T')[0]);
  $("#dat_hc_edad_trabajador").val(paObj_hc[IdHC].a.Edad_Trabajador_H);
  setTimeout(() => {
    $("#dat_hc_grupo_sanguineo_trabajador").val(paObj_hc[IdHC].a.A_GrupoSanguineo);

  }, 500)

  // DATOS DE LA EMPRESA
  $("#dat_hc_puesto_trabajo_empresa").val(paObj_hc[IdHC].a.PuestoTrabajo_Empresa_H);
  $("#dat_hc_empresa_empresa").val(paObj_hc[IdHC].a.Empresa);

  $("#dat_hc_area_empresa").val(paObj_hc[IdHC].a.AreaId_Empresa_H);
  $("#dat_hc_planta_empresa").val(paObj_hc[IdHC].a.SedeId_Empresa_H);
  $("#dat_hc_gerencia_empresa").val(paObj_hc[IdHC].a.GerenciaId_Empresa_H);


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

function mostrarAreasGerenciaSedes() {
  
  tempa = [];
  sedeAreaGerencia.Area.forEach((e) => {
    let content = $('#dat_hc_area_empresa');

                    var marca = 0;
                    for (let i = 0; i < tempa.length; i++) { if (tempa[i] == e.Description) { marca = 1; } }

                    if (marca == 0) 
                    {
                            tempa[tempa.length] = e.Description;
                            content.append(`<option value="${e.Id}">${e.Description}</option>`)

                     

                    }
                    marca = 0;

  })






  sedeAreaGerencia.Sedes.forEach((e) => {
    let content = $('#dat_hc_planta_empresa');
    content.append(`
      <option value="${e.Id}">${e.Description}</option>
    `)
  })

  sedeAreaGerencia.Gerencia.forEach((e) => {
    let content = $('#dat_hc_gerencia_empresa');
    content.append(`
      <option value="${e.Id}">${e.Description}</option>
    `)
  })
}

function mostrarGrupoSanguineo() {
  let content = $('#dat_hc_grupo_sanguineo_trabajador');
  content.html('');

  content.append(`
    <option value=""></option>
  `)
  gruposSanguineos.forEach((e) => {
    content.append(`
      <option value="${e.Id}">${e.Descripcion}</option>
    `)
  })
}
// ################################################################# FUNCIONES DE CARLOS ##########################################################

var sedeAreaGerencia = [];

// function cargarAreasSedesGerencia() {
//   let url = `https://550m44ud1tmg7454-inspection-dev.azurewebsites.net/api/a_get_lista_sedes_areas_gerencia?code=5sz/nIVDXtW7t97kzgfOyzuN4yYq6FEfuJoZSlk3DzGQ9AMLu7k6WQ==&IdSede=0&IdArea=0&IdGerencia=0`;

//   let headers = {
//     "apikey": constantes.apiKey,
//     "Content-Type": "application/json"
//   }

//   let settings = {
//     "url": url,
//     "method": "get",
//     "timeout": 0,
//     "crossDomain": true,
//     "dataType": 'json',
//     "headers": headers
//   };

//   return $.ajax(settings).done((response) => {
//     sedeAreaGerencia = response;
//     // console.log(response);
//   })
// }

// FUNCIONALIDADES DEL FORMULARIO
function hcSp3LimpiarDatos() {

  
  $('#dat_hc_fecha_nacimiento_trabajador').val('');
  $('.input_hc_sp3').find('input[type=text]').val('');
  $('.input_hc_sp3').find('input[type=date]').val('');
  $('.input_hc_sp3').find('input[type=number]').val(0);
  $('.input_hc_sp3').find('input[type=checkbox]').prop('checked', false);
  $('.input_hc_sp3').find('select').val('');

  for (i = 1; i <= 6; i++) {
    if (i == 3) {
      dataItem = $(`#content_ant_${i}`).find('tr');
    } else {
      dataItem = $(`#content_ant_${i}`).find('.item_ant');
    }
    dataItem.each((e) => {
      let data = dataItem.eq(e).data();
      hcSp3EliminarAntecedentes(data.idant, data.idtipa);
    })
  }
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
    confirmButtonText: `Confirmar <img src="./images/sho/confirm.svg">`,
    cancelButtonText: `Cancelar <img src="./images/sho/cancelar.svg">`,
  }).then((result) => {
    if (result.isConfirmed) {
      hcSp3GuardarHistoriaClinica(idHC);
    }
  });
}

function hcSp3ConfirmCancelarHistoriaClinica() {
  Swal.fire({
    title: "Cancelar nueva H.C.",
    html: `
       <p>Está por cancelar la historia clínica de</p>
       <p class="mt-5">¿Desea confirmar la acción?</p>`,
    icon: "info",
    showCancelButton: true,
    reverseButtons: true,
    cancelButtonColor: "#ff3636",
    confirmButtonColor: "#8fbb02",
    confirmButtonText: `Confirmar <img src="./images/sho/confirm.svg">`,
    cancelButtonText: `Cancelar <img src="./images/sho/cancelar.svg">`,
  }).then((result) => {
    if (result.isConfirmed) {
      hcSp3CancelarHistoria();
    }
  });
}

function hcSp3ConfirmLimpiarHistoriaClinica() {
  Swal.fire({
    title: "Limpiar datos ingresados.",
    html: `
       <p>Está por limpiar todos los datos incluyendo:</p>
       <p>La eliminación de antecedentes</p>
       <p class="mt-5">¿Desea confirmar la acción?</p>`,
    icon: "info",
    showCancelButton: true,
    reverseButtons: true,
    cancelButtonColor: "#ff3636",
    confirmButtonColor: "#8fbb02",
    confirmButtonText: `Confirmar <img src="./images/sho/confirm.svg">`,
    cancelButtonText: `Cancelar <img src="./images/sho/cancelar.svg">`,
  }).then((result) => {
    if (result.isConfirmed) {
      hcSp3LimpiarDatos();
      Swal.fire({
        title: "Se han limpiado los datos",
        iconColor: "#8fbb02",
        iconHtml: '<img src="./images/sho/check.svg" width="28px">',
        showConfirmButton: false,
        padding: "3em 3em 6em 3em ",
        timer: 1500,
      })
    }
  });
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
  data.Nombres_Trabajador_H = ($("#dat_hc_nombres_trabajador").val()) ? capitalize($("#dat_hc_nombres_trabajador").val()) : "vacio";
  data.Apellidos_Trabajador_H = ($("#dat_hc_apellidos_trabajador").val()) ? capitalize($("#dat_hc_apellidos_trabajador").val()) : "vacio";
  data.FechaRegistro_Trabajador_H = ($("#dat_hc_fecha_trabajador").val()) ? $("#dat_hc_fecha_trabajador").val() : fecha.toISOString().split('T')[0];
  data.CodigoColaborador_Trabajador_H = ($("#dat_hc_cod_colaborador").val()) ? $("#dat_hc_cod_colaborador").val() : "vacio";
  data.Telefono_Trabajador_H = ($("#dat_hc_telefono_trabajador").val()) ? $("#dat_hc_telefono_trabajador").val() : "vacio";
  data.Direccion_Trabajador_H = ($("#dat_hc_direccion_trabajador").val()) ? capitalize($("#dat_hc_direccion_trabajador").val()) : "vacio";
  data.Sexo_Trabajador_H = ($("#dat_hc_sexo_trabajador").val()) ? Number($("#dat_hc_sexo_trabajador").val()) : 0;
  data.LugarNacimiento_Trabajador_H = ($("#dat_hc_nacimiento_trabajador").val()) ? capitalize($("#dat_hc_nacimiento_trabajador").val()) : "vacio";
  data.Edad_Trabajador_H = ($("#dat_hc_edad_trabajador").val()) ? Number($("#dat_hc_edad_trabajador").val()) : 0;
  data.A_GrupoSanguineo = ($("#dat_hc_grupo_sanguineo_trabajador").val()) ? Number($("#dat_hc_grupo_sanguineo_trabajador").val()) : 0;
  data.A_FechaNacimiento = ($("#dat_hc_fecha_nacimiento_trabajador").val()) ? $("#dat_hc_fecha_nacimiento_trabajador").val() : fecha.toISOString().split('T')[0];

  //fecha ingreso a tasa (no se puede optener)
  data.FechaIngresoTasa_H = '2010-12-1';

  // DATOS DE LA EMPRESA
  data.Empresa = ($("#dat_hc_empresa_empresa").val()) ? $("#dat_hc_empresa_empresa").val() : 'vacio';
  data.GerenciaId_Empresa_H = ($("#dat_hc_gerencia_empresa").val()) ? Number($("#dat_hc_gerencia_empresa").val()) : 0;
  data.PlantaId_Empresa_H = ($("#dat_hc_planta_empresa").val()) ? Number($("#dat_hc_planta_empresa").val()) : 0;
  data.AreaId_Empresa_H = ($("#dat_hc_area_empresa").val()) ? Number($("#dat_hc_area_empresa").val()) : 0;
  data.PuestoTrabajo_Empresa_H = ($("#dat_hc_puesto_trabajo_empresa").val()) ? capitalize($("#dat_hc_puesto_trabajo_empresa").val()) : "vacio";
  data.JefeInmediato_Empresa_H = ($("#dat_hc_jefe_inmediato_empresa").val()) ? capitalize($("#dat_hc_jefe_inmediato_empresa").val()) : "vacio";
  data.Celular_Empresa_H = ($("#dat_hc_celular_empresa").val()) ? $("#dat_hc_celular_empresa").val() : "vacio";
  data.Telefono_Empresa_H = ($("#dat_hc_telefono_empresa").val()) ? $("#dat_hc_telefono_empresa").val() : "vacio";
  data.CargoJefe_Empresa_H = ($("#dat_hc_puesto_jefe_empresa").val()) ? capitalize($("#dat_hc_puesto_jefe_empresa").val()) : "vacio";

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
  data.IdHashUser = getCookie("vtas_id_hash" + sessionStorage.tabVisitasa);

  // console.log(data);
  let url =  apiUrlsho+`/api/hce_Post_001_historia_clinica?code=71nrTHSaZONU4iFaWzPmascw8gsNJDjhX0UMFbcPXY92hEKuTskblQ==&httpmethod=post`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  if (idHC == 0) {
    imgPerson = "data:image/png;base64,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";
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

  $.ajax(settings).done(async (response) => {
    hideLoading();
    if (idHC != 0) {
      if (imgPerson != '') {
        await dgSp3AdjuntarImagen(imgPerson);
        imgPerson = '';
      }

      Swal.fire({
        title: "Se terminó con éxito el registro",
        iconColor: "#8fbb02",
        iconHtml: '<img src="./images/sho/check.svg" width="28px">',
        showConfirmButton: false,
        padding: "3em 3em 6em 3em ",
        timer: 1500,
      }).then(() => {
        handlerUrlhtml('contentGlobal', 'view/sho-hce/historia_clinica/gestionHistoriaClinica.html', 'Historia clínica electrónica');
      })
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
    data.Empresa_A = capitalize($(`#empresa_ant_${IdTipA}`).val());
    data.ActividadEmpresa_A = capitalize($(`#actividad_ant_${IdTipA}`).val());
    data.AreaTrabajo_A = capitalize($(`#area_trabajo_ant_${IdTipA}`).val());
    data.Ocupacion_A = capitalize($(`#ocupacion_ant_${IdTipA}`).val());
    data.PeligrosAgentesOcupacionales_A = capitalize($(`#peligros_ant_${IdTipA}`).val());
    data.UsoEpp_TipoEpp_A = capitalize($(`#epp_ant_${IdTipA}`).val());
  } else {
    data.Nombre_A = capitalize($(`#nombre_ant_${IdTipA}`).val());
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
    data.Empresa_A = capitalize($(`#empresa_ant_${IdTipA}_editar_${IdA}`).val());
    data.ActividadEmpresa_A = capitalize($(`#actividad_ant_${IdTipA}_editar_${IdA}`).val());
    data.AreaTrabajo_A = capitalize($(`#area_trabajo_ant_${IdTipA}_editar_${IdA}`).val());
    data.Ocupacion_A = capitalize($(`#ocupacion_ant_${IdTipA}_editar_${IdA}`).val());
    data.PeligrosAgentesOcupacionales_A = capitalize($(`#peligros_ant_${IdTipA}_editar_${IdA}`).val());
    data.UsoEpp_TipoEpp_A = capitalize($(`#epp_ant_${IdTipA}_editar_${IdA}`).val());
  } else {
    data.Nombre_A = capitalize($(`#nombre_ant_${IdTipA}_editar_${IdA}`).val());
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

  let url =  apiUrlsho+`/api/hce_Post_002_historia_clinica_antecedente?code=22WEj9qoRN1pbIMSrHYvNT2mvgBNzW37S6ESkHcpeF04idG6TMoroA==&httpmethod=post`;

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
    if (IdTipA == 3) {
      $('#fecha_inicio_ant_3').val('');
      $('#fecha_fin_ant_3').val('');
      $('#empresa_ant_3').val('');
      $('#actividad_ant_3').val('');
      $('#area_trabajo_ant_3').val('');
      $('#ocupacion_ant_3').val('');
      $('#peligros_ant_3').val('');
      $('#epp_ant_3').val('');
    }
    $(`#nombre_ant_${IdTipA}`).val('');
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

  let url =  apiUrlsho+`/api/hce_Get_002_historia_clinica_antecedente?code=BsULi1Y0aoClfhCk3mSUvEsnbFAyVhtkEXaf8L8REAcYUGZLmv5qaw==`;

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
                   <b style="color: #254373">Nombre del Antecedente: </b>
                   <span><input class="input_nombre_ant" type="text" id="nombre_ant_${data.IdTipA_A}_editar_${data.IdA}" value="${data.Nombre_A}" readonly></span>
                 </div>
                 <div class="ml-3">
                   <b style="color: #254373">Creación</b>
                   <span><input type="date" value="${fechaCreacion_A}" readonly></span>
                 </div>
               </div>
               <div class="col-md-3 d-flex justify-content-end">
                 <button type="button" class="btn btn-link shadow-none btn_ant_${data.IdTipA_A}_editar" id="btn_ant_${data.IdTipA_A}_editar_${data.IdA}" onclick="hcSp3EditarAntecedentes(${data.IdA},${data.IdTipA_A})">
                   <img src="./images/sho/edit.svg">
                 </button>
                 <button type="button" class="btn btn-link shadow-none btn_ant_${data.IdTipA_A}_guardar" id="btn_ant_${data.IdTipA_A}_guardar_${data.IdA}" onclick="hcSp3GuardarAntecedentes(${data.IdTipA_A},${data.IdA},true)" style="display:none">
                   <img src="./images/sho/confirm2.svg">
                 </button>
                 <button type="button" class="btn btn-link shadow-none" onclick="hcSp3EliminarAntecedentes(${data.IdA},${data.IdTipA_A})">
                   <img src="./images/sho/delete.svg">
                 </button>
               </div>
             </div>`);
          cant = cant + 1;
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
                    <div class="dropdown float-right dropleft" >
                      <div class="more-info" id="item_am_diagnostico_1" data-toggle="dropdown" onclick="accionEditarAntecedente(${data.IdA})">
                        <img src="images/iconos/menu_responsive.svg" alt="" />
                      </div>
                      <div class="dropdown-menu" aria-labelledby="item_am_diagnostico_1">
                        <ul>
                          <li onclick="hcSp3EditarAntecedentes(${data.IdA},3)" id="btn_ant_oc_editar_${data.IdA}">
                            <img src="./images/sho/edit.svg"/>
                            <span>Editar</span>
                          </li>
                          <li onclick="hcSp3GuardarAntecedentes(3,${data.IdA},true)" id="btn_ant_oc_guardar_${data.IdA}" style="display: none;">
                            <img src="./images/sho/confirm2.svg" />
                            <span>Guardar</span>
                          </li>
                          <li onclick="hcSp3EliminarAntecedentes(${data.IdA},3)">
                            <img src="./images/sho/delete.svg" />
                            <span>Eliminar</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                 </td>
               </tr>
             `);

          cant = cant + 1;

        }
      });
      if (cant < 10) {
        $(`#cant_ant_${IdTipA}_header`).text(`0${cant}`);
      } else {
        $(`#cant_ant_${IdTipA}_header`).text(`${cant}`);
      }
      (IdTipA == 3) ? $(`#cant_ant_${IdTipA}_table`).text(`${cant} Registros`) : '';
    }
  }).fail((e) => {
    console.log(e);
  })
}

function hcSp3EditarAntecedentes(id, IdTipA) {
  if (IdTipA == 3) {
    $(`tr[data-idant='${id}']`).find('input').attr('readonly', false);
    $(`tr[data-idant!='${id}']`).find('input').attr('readonly', true);

    if ($(`tr[data-idant='${id}']`).find('input').attr('readonly')) {
      $(`#btn_ant_oc_editar_${id}`).show();
      $(`#btn_ant_oc_guardar_${id}`).hide();
    } else {
      $(`#btn_ant_oc_editar_${id}`).hide();
      $(`#btn_ant_oc_guardar_${id}`).show();
    }

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

  let url =  apiUrlsho+`/api/hce_Post_003_historia_clinica_antecedente_eliminadoLogico?httpmethod=post&code=cKDa47yEFx1PUE/qoLpV712gYATgZlguESlS0nPoW7hUai/ticzm7A==`;

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

function accionEditarAntecedente(id) {
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

    let url =  apiUrlsho+`/api/hce_Post_004_historia_clinica_eliminadoLogico?code=Dz5es97V2LzS94zA/eJQhK33rsYqTk1fRLWDbMTXqFwL3CuTAM/dnQ==&httpmethod=post`;

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




function cargarDatosGenerales_IT(id) { //------------------------------------------------------------------------------------------------------

  $("#datos_generales_content2").html(paObj_hc[idHC].a.dd)




} //-------------------------------------------------------------------------------------------------------


async function cargarDatosGenerales(id) {
  idHC = id;
  showLoading();

  if (actualPageSystemSoma != 'view/sho-hce/historia_clinica/datosGenerales.html') {
    handlerUrlhtml('contentGlobal', 'view/sho-hce/historia_clinica/datosGenerales.html', 'Historia Clínica');
  }

  let url =  apiUrlsho+`/api/hce_Get_003_historia_clinica_datos_generales?code=EGqLSsRdXVPm7TSRIZ6/MGieka3md/u1gwzEwWcGhOjMZqDNK1jjRw==`;

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

  $.ajax(settings).done(async (response) => {
    paObj_hc.HistoriaTipoExamen = response.HistoriaTipoExamen;
    await dgSp3CargarFotoPerfil();
    dgSp3SignosVitales();
    dgSp3DatosTrabajador();
    hideLoading();
    await cargarTiposExamen();
    await dgSp3CargarEvidencia();
    await dgSp3CargarExamenAuxiliar();
    // await dgSp3CargarMotivosAtencion();

    await dgSp3CargarAtencionesMedicas();

    paObj_hc[idHC].a.dd = $('#datos_generales_content').html();
    ddgHtml = $('#datos_generales_content').html();

    // alert(paObj_hc[idHC].a.dd);


    console.log('1549 gestionHistoriaClinicaa.............................. = ', paObj_hc[idHC].a.dd)
    //if(paObj_HC[idHC]){ paObj_HC[idHC].a.dd = $('#datos_generales_content').html();}


    $('#page-content-sidebar').css('display', 'block');
  })
}

function dgSp3DatosTrabajador() {
  let obj = paObj_hc[idHC].a;
  sedeAreaGerencia.Sedes.forEach((e) => {
    if (e.Id == obj.PlantaId_Empresa_H) {
      $('#dat_dg_planta_trabajador').text(e.Description);
    }
  });
  sedeAreaGerencia.Area.forEach((e) => {
    if (e.Id == obj.AreaId_Empresa_H) {
      $('#dat_dg_area_trabajador').text(e.Description);
    }
  });
  sedeAreaGerencia.Gerencia.forEach((e) => {
    if (e.Id == obj.GerenciaId_Empresa_H) {
      $('#dat_dg_gerencia_trabajador').text(e.Description);
    }
  });
  $('#dat_dg_dni_trabajador').text(obj.NroDocumento_Trabajador_H);
  $('#dat_dg_edad_trabajador').text(`${obj.Edad_Trabajador_H} años`);
  $('#dat_dg_nombres').text(obj.Nombres_Trabajador_H);
  $('#dat_dg_apellidos').text(obj.Apellidos_Trabajador_H);
  $('#dat_dg_sexo_trabajador').text((obj.Sexo_Trabajador_H == 1) ? 'Masculino' : 'Femenino');
  $('#dat_dg_puesto_trabajador').text(obj.PuestoTrabajo_Empresa_H);
}

function dgSp3SignosVitales() {
  let obj = paObj_hc[idHC].a;
  $('#dat_dg_presion_arterial_sv').val(obj.PresionArterial_SV);
  $('#dat_dg_frecuencia_cardiaca_sv').val(obj.FrecuenciaCardiaca_SV);
  $('#dat_dg_frecuencia_respiratoria_sv').val(`${obj.FrecuenciaRespiratoria_SV}`);
  $('#dat_dg_temperatura_sv').val(obj.Temperatura_SV);
  $('#dat_dg_peso_sv').val(obj.PesoKg_SV);
  $('#dat_dg_talla_sv').val(obj.Talla_SV);
  $('#dat_dg_saturacion_sv').val(`${obj.Saturacion_SV}`);
  $('#dat_dg_masa_corporal_sv').val(obj.IndiceMasaCorporal_SV);
  
  let calc = (obj.PesoKg_SV/(obj.PesoKg_SV*obj.PesoKg_SV))
  if(obj.IndiceMasaCorporal_SV != calc){obj.IndiceMasaCorporal_SV = calc;}

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

function dgSp3CargarFotoPerfil() {
  let url =  apiUrlsho+`/api/hce_Get_020_datos_generales_foto_hc?code=LFR1oB7IQuhuxYcjZCqc5/x2hCuqqjpgPi/hNafJIhgfQi3lkwoL7Q==`;

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

  return $.ajax(settings).done((response) => {
    let data = response.Foto_HC;
    if (data) {
      paObj_hc[idHC].a.FotoPerfil = data;
      $("#img_file_perfil").attr("src", paObj_hc[idHC].a.FotoPerfil[0].FotoPacienteBase64);
    } else {
      $("#img_file_perfil").attr("src", 'images/sho/profile.png')
    }
  })
}

function dgSp3CargarEvidencia() {
  let url =  apiUrlsho+`/api/hce_Get_019_datos_generales_adjuntos_hc?code=oHdncz7/aqcaQAMzoykwrugu6tss3G4wbtUq425jJLIRFXYWJKGSeg==`;

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

  return $.ajax(settings).done((response) => {
    let data = response.Adjunto_HC;
    paObj_hc[idHC].a.Evidencias = data;
    dgSp3AdjuntoEvidencia(data);
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
}

function dgSp3GuardarEvidencias(element) {
  $('#hc_spin_guardar_evidencia').show();
  let file = element.files[0];
  let reader = new FileReader();
  reader.onloadend = function () {
    $("#dg_hc_file_upload_evidencias").attr("data-file64", reader.result);

    let data = {};
    data.IdHC = idHC;
    data.NombreArchivo = element.files[0].name;
    data.IdHashUser = "UsuarioIdlogeado";
    data.ArchivoBase64 = reader.result;

    let url =  apiUrlsho+`/api/hce_Post_015_historia_clinica_adjuntar_evidencia?code=aYdc1Bw98bAktOuhkUO03iCaSX5BNq09FjisS6Pz72oReIT89Mj8ww==&httpmethod=post`;

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

  let url =  apiUrlsho+`/api/hce_Post_016_historia_clinica_adjuntar_evidencia_eliminadoLogico?code=61dRGYMJRG32n4eNi8IddXIaAJg0JSOIS0NWPkBScHGJpwYdo45Rzg==&httpmethod=post`;

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

  let url =  apiUrlsho+`/api/hce_Post_005_historia_clinica_adjuntar_foto?code=s3R5opJMsUPopiAD1YCFEPahBYF0CV3vYou6A5Xz6yqkspClne5jAw==&httpmethod=post`;

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

  return $.ajax(settings).done((response) => {
    // console.log("response", response);
    $('#hc_spin_adjuntar_imagen').hide();
  })
}

function encodeImgtoBase64(element) {
  var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = function () {
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
  reader.onloadend = function () {
    $("#file_upload").attr("data-file64", reader.result);
  }
  reader.readAsDataURL(file);
}

function dgSp3CargarExamenAuxiliar() {
  let url =  apiUrlsho+`/api/hce_Get_018_datos_generales_examen_auxiliar?code=RhQvGfVVE/keff9xmc1P1jBqKqKriNZfR3iqYZae8H4gglMwTsjkKA==`;

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

  return $.ajax(settings).done((response) => {
    let data = response.Examen_Auxiliar;
    if (data.length > 0) {
      paObj_hc[idHC].a.ExamenAuxiliar = data;
      dgSp3ExamenAuxiliar(data);
    }
  })
}

function dgSp3ExamenAuxiliar(obj) {
  // console.log(obj);
  let tps = paObj_hc.HistoriaTipoExamen;
  let content_Examen = $(`#content_axamen_auxiliar`);
  // console.log(" Examen" + obj)
  content_Examen.html(' ');
  $('#hc_spin_examen').hide();

  // console.log("auxi", obj.length)

  if (obj.length > 0) {
    obj.forEach((e) => {
      let tip_examen = '';
      tps.forEach((i) => {
        if (e.TipoExamenId == i.Id) {
          tip_examen = i.Descripcion;
        }
      })
      content_Examen.append(`
        <tr class="item_ant_oc item_ant_3" data-idexamen="${e.Id}">
          <td><span>${date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(e.FechaExamenes)}</span></td>
          <td><span>${tip_examen}</span></td>
          <td><span>${date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(e.CreadoFecha)}</span></td>
          <td><span>${e.Conclusion}</span></td>
          <td><span>${e.NombreArchivo}</span></td>
          <td>
            <div class="dropdown float-right dropleft">
              <div class="more-info" id="item_am_diagnostico_1" data-toggle="dropdown">
                <img src="images/iconos/menu_responsive.svg" alt="" />
              </div>
              <div class="dropdown-menu" aria-labelledby="item_am_diagnostico_1">
                <ul>
                  <li onclick="dgSp3EditarExamen(${e.Id})" id="btn_examen_editar">
                    <img src="./images/sho/edit.svg" fill="#5daf57" />
                    <span>Editar</span>
                  </li>
                  <li onclick="dgSp3EliminarExamen(${e.Id})">
                    <img src="./images/sho/delete.svg"/>
                    <span>Eliminar</span>
                  </li>
                  <li id="btn_examen_adjuntar">
                    <label for="dg_hc_file_upload_examen_${e.Id}" style="display: contents; cursor: pointer">
                      <img src="./images/sho/upload2.svg" fill="#8fbb02"/>
                      <span>${(!e.ArchivoBase64) ? 'Adjuntar documento' : 'Actualizar documento'}</span>
                    </label>          
                    <input type="file" id="dg_hc_file_upload_examen_${e.Id}" accept="application/pdf, .pdf, .doc, docx, .odf" onchange="dgSp3CargarAdjuntoExamen(this,${e.Id})" style="display: none">
                  </li>
                  <li id="btn_examen_descargar" ${(!e.ArchivoBase64) ? 'style="display:none"' : ''}>                    
                    <a href="${e.ArchivoBase64}" download="${e.NombreArchivo}" style="text-decoration:none; text-decoration: none;color: #000; display: contents;">
                      <img src="./images/sho/download.svg" />
                      <span>Descargar documento</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
          </td>
        </tr>
      `);
    })
  }

  $('#cant_dg_examen').text(`${obj.length} Registros`);
}

function dgSp3CargarAdjuntoExamen(element, id) {
  console.log(id);
  $('#hc_spin_examen').show();
  var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = function () {
    // $("#file_upload").attr("data-file64", reader.result);
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
  console.log(adjunto, idEA);
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
    paObj_hc[idHC].a.ExamenAuxiliar.forEach((e) => {
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
    paObj_hc[idHC].a.ExamenAuxiliar.forEach((e) => {
      if (e.Id == idEA) {
        data.Conclusion = e.Conclusion;
        data.FechaExamenes = e.FechaExamenes;
        data.IdTipEA = e.TipoExamenId;
      }
    })
    data.NombreArchivo = adjunto.NombreArchivo;
    data.ArchivoBase64 = adjunto.ArchivoBase64;
  }

  let url =  apiUrlsho+`/api/hce_Post_006_datos_generales_examen_auxiliar?code=vklT07i33PAWYcDvOeiu987UNJrR3vZgg2pnA7XNyy11QSsHa8QXow==&httpmethod=post`;

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
  let obj = paObj_hc[idHC].a.ExamenAuxiliar;
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

function cargarTiposExamen() {
  let obj = paObj_hc.HistoriaTipoExamen;
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

  let url =  apiUrlsho+`/api/hce_Post_007_datos_generales_examen_auxiliar_eliminadoLogico?code=r9CO3HsDzLXkumLM/NW7miiJOOgmKGRtIiAOBttmQ8osVg7KcGcOtA==&httpmethod=post`;

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


function capitalize(text) {
  return text.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
}

//#### FUNCIONES :: CARLOS RIVAS  :: #################################################################################################_FIN_#






//------------------------------------------- FUNCIONES GENERALES DEL MODULO ------------------------------------  FUNCIONES GENERALES DEL MODULO --------------------------------------------
//#########################################################################################################################################################################################_FIN_##































function handlerUrlhtmlHC(idContent, url, title) {


  var idview;
  //$("#prevSystem").off(); //se elimina evento de arrowback

  $("#" + idContent).html("Cargando .........")


  //valida si esta precargado el div
  cacheHtml.map(item => { //---------------------------------------------------------------------------------  cacheHtml.map(item => 

    if (item.url == url) { //------------------------------------------------------------------

      $("#" + idContent).html(item.html) //pinto en el main.html
      flag_hc = 1;

      // //muestra logo en vez de flecha
      // $("#regresar").hide();
      // $("#textTilteModule").hide();
      // $("#logoCompany").show();


      //------------------------------SPRINT5 @millanqjesus start -------------------------------------
      if (url == "view/sho-hce/historia_clinica/FormHC_DatosGenerales.html") {
        alert('Entrar FormHC_DatosGenerales.html--->HANDLER+FLAG = 0')
        $("#regresar").show();
        $("#textTilteModule").show();
        $("#logoCompany").hide();
        $("#textTilteModule").text(title);

        //backPageSystemSoma = 'view/auditoria/menu.html'; //indica  la pagina(url) a  que se debe regresar
        //actualPageSystemSoma = url;
        $("#" + idContent).css('display', 'block');



        //console.log("divPrecargado")
        //_init_fnSp3AdministrarHallazgosEstadoInicial();
      }
      //------------------------------SPRINT5 @millanqjesus end -------------------------------------




      //se oculta loading
      setTimeout
        (
          function () {
            $("#splashLoading").fadeOut();
          }, 1000
        )

      //getRolesFuntions('showid');
    }

    //showNameVisit(); // mustra nombre de tipo de visita
  });


  if (flag_hc == 0) //si no esta en cache
  {
    $("#splashLoading").show();
    $("#" + idContent).load(url, function (response, status, xhr) {

      if (status == "error") {
        var msg = "Error!, algo ha sucedido: ";
        //$("#" + idContent).html(msg + xhr.status + " " + xhr.statusText);

      }


      if (status = "success") {
        //getRolesFuntions('showid');
        //muestra logo en vez de flecha
        //$("#regresar").hide();
        // $("#textTilteModule").hide();
        // $("#logoCompany").show();

        cacheHtml.push({ url: url, idview: idview, html: response })



        //------------------------------SPRINT5 @millanqjesus start -------------------------------------
        if (url == "view/sho-hce/historia_clinica/FormHC_DatosGenerales.html") /*if(url=="view/auditoria/auditoriaListLiderPlan.html") */ {
          alert('Entrar FormHC_DatosGenerales.html--->HANDLER+FLAG = 1')
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




        //se oculta loading
        setTimeout(function () {
          $("#splashLoading").fadeOut();
        }, 1000)

      }

    });
    //showNameVisit(); // mustra nombre de tipo de visita
  }
}

function hcSp3CargarGruposSanguineo() {
  let url =  apiUrlsho+`/api/hce_Get_022_grupo_sanguineo?code=IhNvDEFrj7QvaNdVB0u1lg32UwyNstFuM75/VlxeAMn2HMJ2SZ9E7g==`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "get",
    "dataType": 'json',
    "headers": headers,
  };

  return $.ajax(settings).done((response) => {
    // console.log("response", response);
    gruposSanguineos = response.GrupoSanguineo;
  })
}


async function amSp3NuevaAtencionMedica(IdHC, id) {
  idHC = IdHC;
  idAM = 0;
  tipoVerAtencion = 1;

  if (id == 1) {
    actualPageSystemSoma = "view/sho-hce/atenciones_medicas/nuevaAtencionMedica.html";
    backPageSystemSoma = "view/sho-hce/historia_clinica/gestionHistoriaClinica.html";
    backTitle = "Historia clínica electrónica";
  }

  if (id == 2) {
    actualPageSystemSoma = "view/sho-hce/atenciones_medicas/nuevaAtencionMedica.html";
    backPageSystemSoma = "view/sho-hce/historia_clinica/datosGenerales.html";
    backTitle = "Historia clínica";
  }

  handlerUrlhtml('contentGlobal', 'view/sho-hce/atenciones_medicas/nuevaAtencionMedica.html', 'Nueva atención médica');
  $("#regresar").show();
  $("#logoCompany1 b").text('Nueva atención médica');
}

function dgSp3CargarAtencionesMedicas() {
  let url =  apiUrlsho+`/api/hce_Get_023_atencion_medica?code=scTtyIt0T0KLzUdeDYPBRyMXavt7tP9YRKgGYUiF9Sw70z7U15Ss6g==`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "get",
    "dataType": 'json',
    "headers": headers,
    "data": { "IdHistoriaClinica": idHC }
  };

  return $.ajax(settings).done((response) => {
    paObj_hc[idHC].a.AtencionMedica = response.AtencionMedica;
    dgSp3MostrarAtencionesMedicas();
    dgSp3MostrarAtencionesMedicasHistorial();
  })
}

function dgSp3MostrarAtencionesMedicas() {
  let content = $('#dg_atenciones_content');
  let data = paObj_hc[idHC].a.AtencionMedica.reverse();
  if (data.length > 4) {
    data = data.slice(data.length - 4)
  }
  content.html('');
  moment.locale('es');
  if (data.length > 0) {
    data.forEach((e) => {
      let fecha = e.FechaAtencion;
      content.append(`
        <div class="col-md-6 col-sm-12 mb-4">
          <div class="card card-border" onclick="hcSp3VerAtencionMedica(${e.IdAM},2)">
            <div class="card-body">
              <span style="color: #01719d;"><b>Motivo:</b> ${e.DescripcionMotivoC}</span>
              <br>
              <span><b>Atendido por:</b> ${e.E_PersonalDeSalud}</span>
              <span class="mt-3" style="color: #d8801f; float: right;">${capitalize(moment(fecha).format('MMM'))} ${moment(fecha).date()}, ${moment(fecha).year()} - ${moment(fecha).format('hh:mm A')}</span>
            </div>
          </div> 
        </div> 
      `)
    })
  }
}

function dgSp3MostrarAtencionesMedicasHistorial() {
  $('#dg_spin_historial').hide();
  let table = $('#table_dg_historial');
  let content = $('#table_content_dg_historial');
  let info = $('#info_table_content_dg_historial');
  let cantidad = $('#dat_dg_cantidad_historial');
  let allData = paObj_hc[idHC].a.AtencionMedica;

  content.html('');

  if (allData.length > 0) {
    table.show();
    cantidad.parent().parent().show();
    cantidad.text(`${allData.length} Registros`);

    $('#dg_pagination_historial').pagination({
      dataSource: allData,
      pageSize: 4,
      callback: function (data, pagination) {
        content.html('');
        // console.log(data)
        data.forEach((e) => {
          content.append(`
            <tr>
              <td><span>${date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(e.FechaAtencion)}</span></td>
              <td><span>${moment(e.FechaAtencion).format('hh:mm A')}</span></td>
              <td><span>${e.DescripcionMotivoC}</span></td>
              <td><span>${e.E_PersonalDeSalud}</span></td>
              <td>
                <button class="btn btn-link shadow-none float-right" onclick="hcSp3VerAtencionMedica(${e.IdAM},1)">
                  <img src="./images/sho/eyeIcon.svg" />
                </button>       
              </td>
            </tr>
          `)
        })
      }
    })
  } else {
    table.hide();
    cantidad.parent().parent().hide();
    info.html(`
      <div class="alert alert-danger mt-4" role="alert">
        No Existen registros
        <span>
          <img src="./images/sho/advertencia.svg" alt="" width="18px">
        </span>
      </div>
    `)
  }
}

function hcSp3VerAtencionMedica(id, tipo, bandeja, IdHC) {
  //tipo : 1 = editable , 2 = no editable
  idAM = id;
  if (IdHC) {
    idHC = IdHC;
  }

  // hc_accion = 1
  if (tipo) {
    tipoVerAtencion = tipo;
  }

  if (bandeja == 1) {
    actualPageSystemSoma = "view/sho-hce/atenciones_medicas/AtencionMedicaVer.html";
    backPageSystemSoma = "view/sho-hce/atenciones_medicas/gestionAtencionesMedicasBandeja.html";
    backTitle = "Atenciones medicas";
  } else {
    actualPageSystemSoma = "view/sho-hce/atenciones_medicas/AtencionMedicaVer.html";
    backPageSystemSoma = "view/sho-hce/historia_clinica/datosGenerales.html";
    backTitle = "Historia clínica";
  }

  $('#am_sp3_atenciones_medicas').remove();
  $('body').append(`
    <script id="am_sp3_atenciones_medicas" src="view/sho-hce/atenciones_medicas/gestionAtencionesMedicas.js"></script>
  `)

  setTimeout(() => {
    _init_amSp3AtencionesMedicas();
  }, 2000)

  if (tipo == 1) {
    handlerUrlhtml('contentGlobal', 'view/sho-hce/atenciones_medicas/nuevaAtencionMedica.html', 'Ver atención médica');
  } else {
    handlerUrlhtml('contentGlobal', 'view/sho-hce/atenciones_medicas/AtencionMedicaVer.html', 'Ver atención médica');
  }

  $("#regresar").show();
  $("#logoCompany1 b").text('Ver atención médica');
}

function hcSp3CalcularEdad() {
  let fA = moment().format('YYYY-MM-DD');
  let fN = moment($('#dat_hc_fecha_nacimiento_trabajador').val()).format('YYYY-MM-DD');
  let a = moment(fA);
  let b = moment(fN);

  var edad = a.diff(b, 'year');
  b.add(edad, 'years');

  $('#dat_hc_edad_trabajador').val(edad);
}

function fnSp3CargaFiltroEstadoInicialSaludOcupacional_DG() { //------------------------------------- ini   fnSp3CargaFiltroEstadoInicialSaludOcupacional() -------------------------------------
  showLoading();

  var body = { "AreaId_Empresa_H": 0, "SedeId_Empresa_H": 0 }

  //var url = +"/api/Get-Incidente-AccidenteWeb?code=GY7/yooa3Zl5sKu7zgakDbaCn4uvOKXjfwe/JkbSuIwDPOs/baiZFQ==&httpmethod=objectlist&IdTipoEvento="+programa+"&IdEmpresa="+gerencia+"&IdSede="+sedepa+"&FechaInicio="+f1+"&FechaFin="+f2+"&IdEmbarcacion="+estadopa
  var url =  apiUrlsho+"/api/hce_Get_001_historia_clinica?code=5lJWTsRDsoxqo9VoOxIzfQAPyCTxUTqLpvgY5tuHluCZlSodpQ/Y7w==";

  console.log("URL", url);
  var headers = { "apiKey": constantes.apiKey, "Content-Type": "application/json" }
  //alert('api = '+constantes.apiKey);

  var a = ''
  var b = 0;
  var c = 0;
  var d = 0;

  var settings = {
    "url": url,
    "method": "GET",
    "timeout": 0,
    "crossDomain": true,
    "dataType": "json",
    "headers": headers,
    "data": { "NroDocumento_Trabajador_H": a, "AreaId_Empresa_H": c, "SedeId_Empresa_H": b, "Buscador": d } //JSON.stringify(body)
  };



  $.ajax(settings).done(function (response) {
    console.log("**todos**", response);

    if (response.HistoriaClin.length > 0) {
      response.HistoriaClin.forEach((Item) => {
        paObj_hc[Item.IdHC] = new HistoriaClinica();

        paObj_hc[Item.IdHC].cargarData(Item);
      });


    } else {

      hideLoading();
    }



  });


} //------------------------------------- fin   fnSp3CargaFiltroEstadoInicialSaludOcupacional() -------------------------------------