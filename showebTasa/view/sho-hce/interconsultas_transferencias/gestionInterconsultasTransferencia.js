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







//--------------------------VARIABLES GLOBALES------------------------------//
//var paObj_hc = [];//objeto de interconsulta

// function Transferencia() {

//   this.a = [];

//   Transferencia.prototype.cargarData = function(data) {
//     this.a = data;
//     this.a.DiagnosticoCIE10 = [];
//     this.a.SignosVitales = [];
//     this.a.Adjuntos = [];
//     // // this.a.II;

//     // this.a.II_BD = 0;//estado inicial, se puede ir al servidor a buscar la informacion.
//   }

// }


// //############################## BLOQUE CODIGO INTEGRACION ANDY 10-09-2021 #####################################


//                function HistoriaClinicaTranferencia()
//                {

//                  this.a = [];

//                  HistoriaClinicaTranferencia.prototype.cargarData = function(data) {
//                    this.a = data;
//                    this.a.DiagnosticoCIE10 = [];
//                    this.a.SignosVitales = [];
//                    this.a.Adjuntos = [];
//                    // // this.a.II;

//                    this.a.BD = 0;//estado inicial, se puede ir al servidor a buscar la informacion.
//                  }

//                }

//############################## BLOQUE CODIGO INTEGRACION ANDY 10-09-2021 #####################################




//--------------------------VARIABLES GLOBALES------------------------------//

/*
var paObj_hc = [];//objeto de interconsulta

var paObj_hi = []; //objeto de interconsulta ESTE ES TU OBJETO CARLOS
var paObj_ht = []; //objeto de trasnferencia
var istAud;
var istAud2;//############################## BLOQUE CODIGO INTEGRACION ANDY 10-09-2021 #####################################
var HTMLEXCEL = '';
var HTMLEXCEL2 = '';
var visible = 0; // 0 interconsulta 1 transferencia
var D_IT = []; //Almacena temporalmente el listado de Disgnostico de las interconsultas 
var D_IT2 = []; //Almacena temporalmente el listado de Disgnostico de las transferencias 
var D_IT3 = []; //Almacena temporalmente el listado de Signos Vitales de las transferencias 
var OBJ_I = []; // Objeto inicial de la bandeja

var paObj_HC = []; //############################## BLOQUE CODIGO INTEGRACION ANDY 10-09-2021 #####################################

*/

















//################################################################################################# INTERCONSULTAS Y TRASNFERENCIAS ###############################################################################

function fnSp3verLista(modulo) { //------------------------------------------------- ini fnSp3verLista(modulo) ----------------------------------------------------

  switch (modulo) {
    case 'int':

      //alert('Interconsulta');
      //ponemos transferencia en gris
      $('#lb_ho_it_trans').removeClass('lb_ho_it_interc').addClass('lb_ho_it_interc_off');
      $('#barra_ho_int_tr').removeClass('barra_int_tr').addClass('barra_int_tr_off');

      $('#lb_ho_it_interc').removeClass('lb_ho_it_interc_off').addClass('lb_ho_it_interc');
      $('#barra_ho_it_interc').removeClass('barra_int_tr_off').addClass('barra_int_tr');

      $('#contieneInterc').css('display', 'block');
      $('#contieneTransf').css('display', 'none');

      $('#cant_interc').css('display', 'block');
      $('#cant_transf').css('display', 'none');

      visible = 0;



      break;

    case 'trans':

      // alert('Transferencia');

      $('#lb_ho_it_interc ').removeClass('lb_ho_it_interc').addClass('lb_ho_it_interc_off');
      $('#barra_ho_it_interc ').removeClass('barra_int_tr').addClass('barra_int_tr_off');

      $('#lb_ho_it_trans').removeClass('lb_ho_it_interc_off').addClass('lb_ho_it_interc');
      $('#barra_ho_int_tr').removeClass('barra_int_tr_off').addClass('barra_int_tr');

      $('#contieneInterc').css('display', 'none');
      $('#contieneTransf').css('display', 'block');

      $('#cant_transf').css('display', 'block');
      $('#cant_interc').css('display', 'none');

      visible = 1;



      break;


  }

} //------------------------------------------------- ini fnSp3verLista(modulo) ----------------------------------------------------



function _init_fnSp3SaludOcupacionalEstadoInicial_inter() { //------------------------------------- ini   _init_fnSp3SaludOcupacionalEstadoInicial() -------------------------------------
  //console.clear();
  //showLoading();
  console.log("Arrancamos interconsultas y transferencias............................ _init_fnSp3SaludOcupacionalEstadoInicial");
  // $('#regresar').css('visibility', 'visible');
  // $('#regresar').css('display', 'block');

  // $('#regresar').show();
  fnSp3verLista('int');

  var hoy = new Date();
  var mes = hoy.getMonth() + 1;
  if (mes < 10) { mes = '0' + mes; }
  var f1 = hoy.getFullYear() + '-' + mes + '-' + hoy.getDate();

  // document.getElementById("dat_hc_it_a_fe_desde").value = f1; //"2014-02-09";
  // document.getElementById("dat_hc_it_a_fe_hasta").value = f1; //"2014-02-09";


  //############################## BLOQUE CODIGO INTEGRACION ANDY 10-09-2021 #####################################

  document.getElementById("dat_hc_it_a_fe_desde").value = '2021-01-01';//f1; //"2014-02-09";
  document.getElementById("dat_hc_it_a_fe_hasta").value = '2021-12-31'; //f1; //"2014-02-09";

  //############################## BLOQUE CODIGO INTEGRACION ANDY 10-09-2021 #####################################







  //fnSp3CargaFiltroEstadoInicialSaludOcupacional_inc();
  //fnSp3CargaListasHistoriaClinica_Interconsulta_transferencia();

  //############################## BLOQUE CODIGO INTEGRACION ANDY 10-09-2021 #####################################

  cargarAreasSedesGerencia();//

  //############################## BLOQUE CODIGO INTEGRACION ANDY 10-09-2021 #####################################

} //------------------------------------- fini   _init_fnSp3SaludOcupacionalEstadoInicial() -------------------------------------



















/*
function fnSp3CargaListasHistoriaClinica_Interconsulta_transferencia() { //--------------------------------------------------------------------------------------------------------------  ini ------------------------- fnSp3CargaListasHistoriaClinica_Interconsulta_transferencia

  showLoading();


  //document.getElementById('dat_hc_it_a_busca').value = '2021/12/12';




  $("#" + 'dat_hc_it_a_gerencia').html("Cargando ...");
  $("#" + 'dat_hc_it_a_planta_sede').html("Cargando ...");
  $("#" + 'dat_hc_it_a_area').html("Cargando ...");


  var url = "apiUrlssoma/api/Get-Incidente-AccidenteWeb?code=GY7/yooa3Zl5sKu7zgakDbaCn4uvOKXjfwe/JkbSuIwDPOs/baiZFQ==&httpmethod=objectlist";
  var url = apiUrlssoma + "/api/a_get_lista_sedes_areas_gerencia?code=5sz/nIVDXtW7t97kzgfOyzuN4yYq6FEfuJoZSlk3DzGQ9AMLu7k6WQ==&IdSede=0&IdArea=0&IdGerencia=0";
  console.log("132 interc URL", url)
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
      console.log("**fnSp3CargaListasHistoriaClinica_Interconsulta_transferencia**", response1);

      OBJ_I = response1;

      sedeAreaGerencia = response1;

      //ahora vamos a recibire el servicio

      var l = response1.Gerencia.length;
      var lk = 0;


      var n = response1.Sedes.length;
      var nk = 0;

      var m = response1.Area.length;
      var mk = 0;

      //------------------------------------------------------------------------------------------------------------------------------------------------------------
      $("#" + 'dat_hc_it_a_gerencia').html(" ");
      $("#" + 'dat_hc_it_a_gerencia').css('font-size', '13px');
      $("#" + 'dat_hc_it_a_gerencia').html("<option selected value='0'>          </option>");
      $("#" + 'dat_int_tran_gerencia').html(" ");
      $("#" + 'dat_int_tran_gerencia').css('font-size', '13px');
      $("#" + 'dat_int_tran_gerencia').html("<option selected value='0'>          </option>");



      response1.Gerencia.map(function(item) {
        $("#" + 'dat_hc_it_a_gerencia').append(`<option value='${item.Id}' title='${item.Description}' style='font-weight: bold;'>${item.Description}</option>`);
        $("#" + 'dat_int_tran_gerencia').append(`<option value='${item.Id}' title='${item.Description}' style='font-weight: bold;'>${item.Description}</option>`);
        lk++;
        if (l == lk) { //----------------------------------------------------------------------------------------------------------



          //------------------------------------------------------------------------------------------------------------------------------------------------------------
          $("#" + 'dat_hc_it_a_planta_sede').html(" ");
          $("#" + 'dat_hc_it_a_planta_sede').css('font-size', '13px');
          $("#" + 'dat_hc_it_a_planta_sede').html("<option selected value='0'>          </option>");
          $("#" + 'dat_int_tran_planta').html(" ");
          $("#" + 'dat_int_tran_planta').css('font-size', '13px');
          $("#" + 'dat_int_tran_planta').html("<option selected value='0'>          </option>");

          response1.Sedes.map(function(item) {
            $("#" + 'dat_hc_it_a_planta_sede').append(`<option value='${item.Id}' title='${item.Description}' style='font-weight: bold;'>${item.Description}</option>`);
            $("#" + 'dat_hc_it_a_planta_sede').append(`<option value='${item.Id}' title='${item.Description}' style='font-weight: bold;'>${item.Description}</option>`);
            nk++;
            if (n == nk) { //-----------------------------------------------------------------------

              $("#" + 'dat_hc_it_a_area').html(" ");
              $("#" + 'dat_hc_it_a_area').css('font-size', '13px');
              $("#" + 'dat_hc_it_a_area').html("<option selected value='0'>          </option>");
              $("#" + 'dat_int_tran_area').html(" ");
              $("#" + 'dat_int_tran_area').css('font-size', '13px');
              $("#" + 'dat_int_tran_area').html("<option selected value='0'>          </option>");

              response1.Area.map(function(item) {
                $("#" + 'dat_hc_it_a_area').append(`<option value='${item.Id}' title='${item.Description}' style='font-weight: bold;'>${item.Description}</option>`);
                $("#" + 'dat_int_tran_area').append(`<option value='${item.Id}' title='${item.Description}' style='font-weight: bold;'>${item.Description}</option>`);
                mk++;
                if (m == mk) { //--------------------------------------------------------------------------------------------------------------------------------------------
                  fnSp3CargaFiltroEstadoInicialSaludOcupacional_inc();
                  fnSp3CargaFiltroEstadoInicialSaludOcupacional_trans();
                } //-----------------------------------------------------------------------------------------------------------------------------------------
              });

            } //-----------------------------------------------------------------------
          });


        } //----------------------------------------------------------------------------------------------------------

      });
      //--------------------------------------------------------------------------------------------------------------------------------------------------------------


      hideLoading();





    }




  );

} //--------------------------------------------------------------------------------------------------------------  ini ------------------------- fnSp3CargaListasHistoriaClinica_Interconsulta_transferencia
*/
//SUSTITUIDA


//############################## BLOQUE CODIGO INTEGRACION ANDY 10-09-2021 #####################################

function fnSp3CargaListasHistoriaClinica_Interconsulta_transferencia() { //--------------------------------------------------------------------------------------------------------------  ini ------------------------- fnSp3CargaListasHistoriaClinica_Interconsulta_transferencia

  showLoading();


  //document.getElementById('dat_hc_it_a_busca').value = '2021/12/12';




  $("#" + 'dat_hc_it_a_gerencia').html("Cargando ...");
  $("#" + 'dat_hc_it_a_planta_sede').html("Cargando ...");
  $("#" + 'dat_hc_it_a_area').html("Cargando ...");


  //var url = "apiUrlssoma/api/Get-Incidente-AccidenteWeb?code=GY7/yooa3Zl5sKu7zgakDbaCn4uvOKXjfwe/JkbSuIwDPOs/baiZFQ==&httpmethod=objectlist";
  var url = apiUrlssoma + "/api/a_get_lista_sedes_areas_gerencia?code=5sz/nIVDXtW7t97kzgfOyzuN4yYq6FEfuJoZSlk3DzGQ9AMLu7k6WQ==&IdSede=0&IdArea=0&IdGerencia=0";
  console.log("132 interc URL", url)
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

  $.ajax(settings).done(function (response1) {
    console.log("**fnSp3CargaListasHistoriaClinica_Interconsulta_transferencia**", response1);

    OBJ_I = response1;

    //ahora vamos a recibire el servicio

    var l = response1.Gerencia.length;
    var lk = 0;


    var n = response1.Sedes.length;
    var nk = 0;

    var m = response1.Area.length;
    var mk = 0;

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    $("#" + 'dat_hc_it_a_gerencia').html(" ");
    $("#" + 'dat_hc_it_a_gerencia').css('font-size', '13px');
    $("#" + 'dat_hc_it_a_gerencia').html("<option selected value='0'>          </option>");
    $("#" + 'dat_int_tran_gerencia').html(" ");
    $("#" + 'dat_int_tran_gerencia').css('font-size', '13px');
    $("#" + 'dat_int_tran_gerencia').html("<option selected value='0'>          </option>");



    response1.Gerencia.map(function (item) {
      $("#" + 'dat_hc_it_a_gerencia').append(`<option value='${item.Id}' title='${item.Description}' style='font-weight: bold;'>${item.Description}</option>`);
      $("#" + 'dat_int_tran_gerencia').append(`<option value='${item.Id}' title='${item.Description}' style='font-weight: bold;'>${item.Description}</option>`);
      lk++;
      });
      if (l == lk) { //----------------------------------------------------------------------------------------------------------



        //------------------------------------------------------------------------------------------------------------------------------------------------------------
        $("#" + 'dat_hc_it_a_planta_sede').html(" ");
        $("#" + 'dat_hc_it_a_planta_sede').css('font-size', '13px');
        $("#" + 'dat_hc_it_a_planta_sede').html("<option selected value='0'>          </option>");
        $("#" + 'dat_int_tran_planta').html(" ");
        $("#" + 'dat_int_tran_planta').css('font-size', '13px');
        $("#" + 'dat_int_tran_planta').html("<option selected value='0'>          </option>");

        response1.Sedes.map(function (item) {
          $("#" + 'dat_hc_it_a_planta_sede').append(`<option value='${item.Id}' title='${item.Description}' style='font-weight: bold;'>${item.Description}</option>`);
          //$("#" + 'dat_hc_it_a_planta_sede').append(`<option value='${item.Id}' title='${item.Description}' style='font-weight: bold;'>${item.Description}</option>`);
          nk++;
          });
          if (n == nk) 
          { //-----------------------------------------------------------------------

                  $("#" + 'dat_hc_it_a_area').html(" ");
                  $("#" + 'dat_hc_it_a_area').css('font-size', '13px');
                  $("#" + 'dat_hc_it_a_area').html("<option selected value='0'>          </option>");
                  $("#" + 'dat_int_tran_area').html(" ");
                  $("#" + 'dat_int_tran_area').css('font-size', '13px');
                  $("#" + 'dat_int_tran_area').html("<option selected value='0'>          </option>");


                  tempa = [];

                  response1.Area.map(function (item) {

                    //********************************************


                    var marca = 0;
                    for (let i = 0; i < tempa.length; i++) { if (tempa[i] == item.Description) { marca = 1; } }

                    if (marca == 0) {
                      tempa[tempa.length] = item.Description;
                      $("#" + 'dat_hc_it_a_area').append(`<option value='${item.Id}' title='${item.Description}' style='font-weight: bold;'>${item.Description}</option>`);
                      $("#" + 'dat_int_tran_area').append(`<option value='${item.Id}' title='${item.Description}' style='font-weight: bold;'>${item.Description}</option>`);
                      mk++;

                    }
                    marca = 0;
                   });

                  //********************************************





                  if (tempa.length == mk) 
                  { //--------------------------------------------------------------------------------------------------------------------------------------------
                    fnSp3CargaFiltroEstadoInicialSaludOcupacional_inc();
                    fnSp3CargaFiltroEstadoInicialSaludOcupacional_trans();
                    fnSp3CargarHistoriasClinicas();
                  } //-----------------------------------------------------------------------------------------------------------------------------------------
                

          } //-----------------------------------------------------------------------
        


      } //----------------------------------------------------------------------------------------------------------

    
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------


    hideLoading();





  }




  );

} //--------------------------------------------------------------------------------------------------------------  ini ------------------------- fnSp3CargaListasHistoriaClinica_Interconsulta_transferencia


//############################## BLOQUE CODIGO INTEGRACION ANDY 10-09-2021 #####################################





















function fnSp3CargaFiltroEstadoInicialSaludOcupacional_inc() { //------------------------------------- ini   fnSp3CargaFiltroEstadoInicialSaludOcupacional() -------------------------------------
  showLoading();

  //var body = { "AreaId_Empresa_H": 0, "SedeId_Empresa_H": 0 }

  //var url = apiUrlsho+"/api/Get-Incidente-AccidenteWeb?code=GY7/yooa3Zl5sKu7zgakDbaCn4uvOKXjfwe/JkbSuIwDPOs/baiZFQ==&httpmethod=objectlist&IdTipoEvento="+programa+"&IdEmpresa="+gerencia+"&IdSede="+sedepa+"&FechaInicio="+f1+"&FechaFin="+f2+"&IdEmbarcacion="+estadopa
  //var url = apiUrlsho+"/api/hce_Get_009_interconsulta_busqueda?code=mlLAeNuPAvTC057apNoiFLG/H/j36XcKY8vYElXN1st3CaLy2eeQ1A==&Gerencia=0&Planta=0&Area=0&Documento=0&Nombres&Apellidos&CodeInterconsultaTraferencia&FechaDesde&FechaHasta&Buscar";


  //############################## BLOQUE CODIGO INTEGRACION ANDY 10-09-2021 #####################################

  $('#lb_ho_it_interc ').html('Cargando.....')// lo tiene el otro


  var headers = { "apiKey": constantes.apiKey, "Content-Type": "application/json" }
  //alert('api = '+constantes.apiKey);

  var a = parseInt($('#dat_hc_it_a_gerencia').val());//dat_hc_it_a_gerencia
  var b = $('#dat_hc_it_a_planta_sede').val();
  var c = $('#dat_hc_it_a_area').val();
  var d = $('#dat_hc_it_a_doc').val();
  var e = $('#dat_hc_it_a_nombre').val();
  var f = $('#dat_hc_it_a_apellido').val();
  var g = $('#dat_hc_it_a_cod_interc').val();
  var h = $('#dat_hc_it_a_fe_desde').val();
  var i = $('#dat_hc_it_a_fe_hasta').val();
  var j = $('#dat_hc_it_a_busca').val();


  //############################## BLOQUE CODIGO INTEGRACION ANDY 10-09-2021 #####################################


  /*
    console.log("248 URL", url);
    var headers = { "apiKey": constantes.apiKey, "Content-Type": "application/json" }
    //alert('api = '+constantes.apiKey);
  
    var a = 0; // $('#dat_hc_it_a_gerencia').val(0);
    var b = 0; //$('#dat_hc_it_a_planta_sede').val(0);
    var c = 0; //$('#dat_hc_it_a_area').val(0);
    var d = 0; //$('#dat_hc_it_a_doc').val(0);
    var e = $('#dat_hc_it_a_nombre').val();
    var f = $('#dat_hc_it_a_apellido').val();
    var g = $('#dat_hc_it_a_cod_interc').val();
    var h = $('#dat_hc_it_a_fe_desde').val();
    var i = $('#dat_hc_it_a_fe_hasta').val();
    var j = $('#dat_hc_it_a_busca').val();
  
    //"+a+"
  */

  var url = apiUrlsho + "/api/hce_Get_009_interconsulta_busqueda?code=mlLAeNuPAvTC057apNoiFLG/H/j36XcKY8vYElXN1st3CaLy2eeQ1A==&Gerencia=" + a + "&Planta=" + b + "&Area=" + c + "&Documento=" + d + "&Nombres=" + e + "&Apellidos=" + f + "&CodeInterconsultaTraferencia=" + g + "&FechaDesde=" + h + "&FechaHasta=" + i + "&Buscar=" + j;



  var settings = {
    "url": url,
    "method": "GET",
    "timeout": 0,
    "crossDomain": true,
    "dataType": "json",
    "headers": headers,
    // "data": { "NroDocumento_Trabajador_H": a, "AreaId_Empresa_H": c, "SedeId_Empresa_H": b, "Buscador": d } //JSON.stringify(body)
  };



  $.ajax(settings).done(function (response) {
    console.log("**todos interc 269**", response);



    if (response.DiagnosticoCIE10.length > 0) { //---------------------------------------------------------------

      response.DiagnosticoCIE10.map(function (itemx) {
        //D_IT[itemx.InterconsultaId] = D_IT[itemx.InterconsultaId].itemx.Descripcion_TipCie10;

        console.log("diagnostico", itemx.Descripcion_TipCie10);

        if (itemx.Descripcion_TipCie10 == 'null' || itemx.Descripcion_TipCie10 == null || itemx.Descripcion_TipCie10 == '') { D_IT[itemx.InterconsultaId] = '-----'; } else { D_IT[itemx.InterconsultaId] = itemx.Descripcion_TipCie10 }

      });
      console.log("302 D_IT[]", D_IT);





    } //---------------------------------------------------------------

    HTMLEXCEL_INTERC = '';

     response.Interconsult.map(function (Item) 
     {
        $('#dat_hc_it_a_gerencia').val(Item.GerenciaId_Empresa_H)
        var GerenciaId_Empresa_H = $('#dat_hc_it_a_gerencia option:selected').text();


          $('#dat_hc_it_a_area').val(Item.AreaId_Empresa_H)
          var AreaId_Empresa_H_S = $('#dat_hc_it_a_area option:selected').text();

          $('#dat_hc_it_a_planta_sede').val(Item.SedeId_Empresa_H)
          var SedeId_Empresa_H_S = $('#dat_hc_it_a_planta_sede option:selected').text();


          var f1 = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.A_FechaInterconsulta);
           HTMLEXCEL_INTERC += `<tr  style="border: 1px !important;color: #000;">
                                                                         

                          <th  style="border: 1px !important;">${Item.NroDocumento_Trabajador_H}</th> 
                          <th  style="border: 1px !important;">${Item.Nombres_Trabajador_H}</th>
                          <th  style="border: 1px !important;">${Item.Apellidos_Trabajador_H}</th> 
                          <th  style="border: 1px !important;">${GerenciaId_Empresa_H}</th>
                          <th  style="border: 1px !important;">${SedeId_Empresa_H_S}</th>
                          <th  style="border: 1px !important;">${AreaId_Empresa_H_S}</th>
                          <th  style="border: 1px !important;">${Item.PuestoTrabajo_Empresa_H}</th>
                          <th  style="border: 1px !important;">${Item.A_Empresa_Inter}</th>
                          <th  style="border: 1px !important;">${Item.A_CodeInterconsulta_Inter}</th>  
                          <th  style="border: 1px !important;"> ${Item.Descripcion_TipOrigen}</th>  
                          <th  style="border: 1px !important;">${Item.CodigoOrigen_Inter}</th>  
                          <th  style="border: 1px !important;"> ${Item.A_FechaInterconsulta}</th>
                          <th  style="border: 1px !important;"> ${f1}</th>   
                          <th  style="border: 1px !important;"> ${Item.B_RecibioRespuesta_Inter == 1 ? 'Si' : "No"}</th>  
                          <th  style="border: 1px !important;">${D_IT[Item.IdInter]}</th>  
               
                 </tr>
                                                                          `;
      

      });
      





    if (response.Interconsult.length > 0) {
      $('#cant_interc').html('' + response.Interconsult.length + ' registros');


      $('#bodyTablaSinAuditorias_int').css('display', 'none');

      $('#pagination-container-EvalAud_int').pagination({
        dataSource: response.Interconsult,
        pageSize: 4,
        callback: function (data, pagination) {
          var html = fnSp3ListarTablaGeneralH_int(data);
          $('#body-tabla-list-EvalAud_int').html(html);

          //---------aqui se reinician los valores del buscador 
          $('#dat_hc_it_a_gerencia').val(0);
          $('#dat_hc_it_a_planta_sede').val(0);
          $('#dat_hc_it_a_area').val(0);
          //---------aqui se reinician los valores del buscador 
        }
      })
      
        $('#dat_hc_it_a_gerencia').val(a);//dat_hc_it_a_gerencia
        $('#dat_hc_it_a_planta_sede').val(b);
        $('#dat_hc_it_a_area').val(c);
        $('#dat_hc_it_a_doc').val(d);
        $('#dat_hc_it_a_nombre').val(e);
        $('#dat_hc_it_a_apellido').val(f);
        $('#dat_hc_it_a_cod_interc').val(g);
        $('#dat_hc_it_a_fe_desde').val(h);
        $('#dat_hc_it_a_fe_hasta').val(i);
        $('#dat_hc_it_a_busca').val(j);


    } else {
      //alert('aqui estoy');
      $('#cant_interc').html('' + response.Interconsult.length + ' registros'); 
      $('#body-tabla-list-EvalAud_int').html('');
      $('#lb_ho_it_interc ').html('Interconsulta');

      $('#pagination-container-EvalAud_int').html('')
      HTMLEXCEL_INTERC = '';
      hideLoading();
      
    }



  });




} //------------------------------------- fin   fnSp3CargaFiltroEstadoInicialSaludOcupacional() -------------------------------------


function fnSp3ListarTablaGeneralH_int(data) { //------------------------------------------------------- ini   fnSp3ListarTablaGeneralH() -----------------------------------

  var html = '';
  var btNew = '';
  var width = 2450; //
  var width1 = 2430; //
  var width1 = 2420; //

  //alert('aqiooooooooooooooooooo 315');
  data.forEach((Item) => {

    paObj_hi[Item.IdInter] = new Interconsulta();
    paObj_hi[Item.IdInter].cargarData(Item);
    //${Item.CodigoPaciente_H != null ? Item.CodigoPaciente_H : "---"}

    $('#dat_hc_it_a_gerencia').val(Item.GerenciaId_Empresa_H)
    var GerenciaId_Empresa_H = $('#dat_hc_it_a_gerencia option:selected').text();


    $('#dat_hc_it_a_area').val(Item.AreaId_Empresa_H)
    var AreaId_Empresa_H_S = $('#dat_hc_it_a_area option:selected').text();

    $('#dat_hc_it_a_planta_sede').val(Item.SedeId_Empresa_H)
    var SedeId_Empresa_H_S = $('#dat_hc_it_a_planta_sede option:selected').text();


    var f1 = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.A_FechaInterconsulta);

    var menupop = `                   <div class="dropdown">
                                          <button class=" btn-link dropdown textVertical" style='outline:none !important;' id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <label class='textVertical'>...</label>
                                          </button>

                                          
                                            <div class="dropdown-menu"> 
                                                  <a class="dropdown-item" onclick="interSp3VerInterconsulta(${Item.IdInter}, ${Item.IdHC})"><img src="./images/sho/eyeIcon.svg" alt="" />&nbsp;&nbsp; Ver Registro Interconsulta</a>
                                                  <a class="dropdown-item" onclick="interSp3EditarInterconsulta(${Item.IdInter}, ${Item.IdHC})"><img src="./images/sho/edit.svg"  style='width:15px; height:18px;' alt="" /> &nbsp;&nbsp; Editar Interconsulta</a> 
                                                </div>
                                          </div>
                                        </div>
                                      `;



    html += `
                
                 <div class="col-md-12"   style=" width:3250px !important;"   >
                                                    <div class="header-tabla px-2 py-3 filaBandeja" style=" width:3220px !important; mmargin-rigth:30px !important; " > 

                                                        <table border="0"  style=" width:3230px !important;  "  >   
                                                            <tr >
                                                                 
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c2TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.NroDocumento_Trabajador_H != null ? Item.NroDocumento_Trabajador_H : "---"}</div></td>
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.Nombres_Trabajador_H != null ? Item.Nombres_Trabajador_H : "---"}</div></td> 
                                                                  <td  style = 'width: 190px;'  align="center"><div id="c3TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.Apellidos_Trabajador_H != null ? Item.Apellidos_Trabajador_H : "---"}</div></td>
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c4TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${GerenciaId_Empresa_H != null ? GerenciaId_Empresa_H : "---"}</div></td>
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c5TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${SedeId_Empresa_H_S != null ? SedeId_Empresa_H_S : "---"}</div></td>

                                                                  <td  style = 'width: 200px;'  align="center"><div id="c6TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${AreaId_Empresa_H_S != null ? AreaId_Empresa_H_S : "---"}</div></td>
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c7TabGenyx" class="text-center lbCabezaTabla" style = 'color:#1C1C1C  !important;' >${Item.PuestoTrabajo_Empresa_H != null ? Item.PuestoTrabajo_Empresa_H : "---"}</div></td>
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c8TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.A_Empresa_Inter != null ? Item.A_Empresa_Inter : "---"}</div></td>
                                                                

                                                                  <td  style = 'width: 200px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.A_CodeInterconsulta_Inter != null ? Item.A_CodeInterconsulta_Inter : "---"}</div></td>  
                                                                  <td  style = 'width: 190px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.Descripcion_TipOrigen != null ? Item.Descripcion_TipOrigen : "---"}</div></td> 

                                                                  <td  style = 'width: 190px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.CodigoOrigen_Inter != null ? Item.CodigoOrigen_Inter : "---"}</div></td>  
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${f1 != null ? f1 : "---"}</div></td>  
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.Descripcion_InterExpec != null ? Item.Descripcion_InterExpec : "---"}</div></td>  
                                                                  <td  style = 'width: 190px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.B_RecibioRespuesta_Inter == 1 ? 'Si' : "No"}</div></td>  
                                                                  <td  style = 'width: 190px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.C_ActitupParaLaboral_Inter == 1 ? 'Apto' : "No Apto"}</div></td>
                                                                  <td  style = 'width: 180px;'  align="center"><div id="c1TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${D_IT[Item.IdInter] != null ? D_IT[Item.IdInter] : "---"} </div></td>  

                                                                  <td  style = 'width: 10px;'   align="left"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${menupop}</td>  
                                                                  <td  style = 'width: 20px;'   align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >&nbsp;</td>  

                                                        </table>
                                                    </div>
                                  </div>    

                              `;




   



  });








  hideLoading();
  $('#lb_ho_it_interc ').html('Interconsulta');

  // $('#dat_hc_a_area').val(0)
  // $('#dat_hc_a_sede').val(0)



  return html;


}
//------------------------------------- fin   fnSp3ListarTablaGeneralH() -------------------------------------























































/*
function fnSp3CargaFiltroEstadoInicialSaludOcupacional_trans() { //------------------------------------- ini   fnSp3CargaFiltroEstadoInicialSaludOcupacional_trans() -------------------------------------
  showLoading();

  //var body = { "AreaId_Empresa_H": 0, "SedeId_Empresa_H": 0 }

  //var url = apiUrlsho+"/api/Get-Incidente-AccidenteWeb?code=GY7/yooa3Zl5sKu7zgakDbaCn4uvOKXjfwe/JkbSuIwDPOs/baiZFQ==&httpmethod=objectlist&IdTipoEvento="+programa+"&IdEmpresa="+gerencia+"&IdSede="+sedepa+"&FechaInicio="+f1+"&FechaFin="+f2+"&IdEmbarcacion="+estadopa
  //var url = apiUrlsho+"/api/hce_Get_009_interconsulta_busqueda?code=mlLAeNuPAvTC057apNoiFLG/H/j36XcKY8vYElXN1st3CaLy2eeQ1A==&Gerencia=0&Planta=0&Area=0&Documento=0&Nombres&Apellidos&CodeInterconsultaTraferencia&FechaDesde&FechaHasta&Buscar";



  console.log("248 URL", url);
  var headers = { "apiKey": constantes.apiKey, "Content-Type": "application/json" }
  //alert('api = '+constantes.apiKey);

  var a = 0; // $('#dat_hc_it_a_gerencia').val(0);
  var b = 0; //$('#dat_hc_it_a_planta_sede').val(0);
  var c = 0; //$('#dat_hc_it_a_area').val(0);
  var d = 0; //$('#dat_hc_it_a_doc').val(0);
  var e = $('#dat_hc_it_a_nombre').val();
  var f = $('#dat_hc_it_a_apellido').val();
  var g = $('#dat_hc_it_a_cod_interc').val();
  var h = $('#dat_hc_it_a_fe_desde').val();
  var i = $('#dat_hc_it_a_fe_hasta').val();
  var j = $('#dat_hc_it_a_busca').val();

  //"+a+"


  //var url = apiUrlsho+"/api/hce_Get_009_interconsulta_busqueda?code=mlLAeNuPAvTC057apNoiFLG/H/j36XcKY8vYElXN1st3CaLy2eeQ1A==&Gerencia= "+a+"&Planta="+b+"&Area="+c+"&Documento= "+d+"&Nombres=&Apellidos&CodeInterconsultaTraferencia&FechaDesde&FechaHasta&Buscar";

  //var url = apiUrlsho+"/api/hce_Get_010_transferencia_busqueda?code=Ma57zVWN/hVKiVbpbiaBFuwa3iEiVrtFLv6X0qATPa1taStnyUvlPw==&Gerencia= "+a+"&Planta="+b+"&Area="+c+"&Documento= "+d+"&Nombres&Apellidos&CodeInterconsultaTraferencia&FechaDesde&FechaHasta&Buscar"

  var url = apiUrlsho + "/api/hce_Get_010_transferencia_busqueda?code=Ma57zVWN/hVKiVbpbiaBFuwa3iEiVrtFLv6X0qATPa1taStnyUvlPw==&Gerencia=0&Planta=0&Area=0&Documento=0&Nombres&Apellidos&CodeInterconsultaTraferencia&FechaDesde&FechaHasta&Buscar";

  var settings = {
    "url": url,
    "method": "GET",
    "timeout": 0,
    "crossDomain": true,
    "dataType": "json",
    "headers": headers,
    // "data": { "NroDocumento_Trabajador_H": a, "AreaId_Empresa_H": c, "SedeId_Empresa_H": b, "Buscador": d } //JSON.stringify(body)
  };



  $.ajax(settings).done(function(response) {
    console.log("**todos trasnferencia 574**", response);



    if (response.DiagnosticoCIE10.length > 0) { //---------------------------------------------------------------

      response.DiagnosticoCIE10.map(function(itemx) {
        //D_IT[itemx.InterconsultaId] = D_IT[itemx.InterconsultaId].itemx.Descripcion_TipCie10;

        D_IT2[itemx.TransferenciaId] = itemx;

        // console.log("diagnostico", itemx.Descripcion_TipCie10);

        // if(itemx.Descripcion_TipCie10 == 'null' || itemx.Descripcion_TipCie10 == null || itemx.Descripcion_TipCie10 == '')
        // {  D_IT2[itemx.TransferenciaId2] = '-----';}
        // else
        // { D_IT2[itemx.TransferenciaId2] = itemx.Descripcion_TipCie10}

      });
      console.log("596 D_IT[]", D_IT2);


    } //---------------------------------------------------------------


    response.SignosVitales.map(function(itemx) {

      D_IT3[itemx.TransferenciaId] = itemx;


    });
    console.log("302 D_IT3[]", D_IT3);








    if (response.transferencias.length > 0) {
      $('#cant_transf').html('' + response.transferencias.length + ' registros');


      $('#bodyTablaSinAuditorias_trans').css('display', 'none');

      $('#pagination-container-EvalAud_trans').pagination({
        dataSource: response.transferencias,
        pageSize: 4,
        callback: function(data, pagination) {
          var html = fnSp3ListarTablaGeneralH_trans(data);
          $('#body-tabla-list-EvalAud_trans').html(html);

          //---------aqui se reinician los valores del buscador 
          $('#dat_hc_it_a_gerencia').val(0);
          $('#dat_hc_it_a_planta_sede').val(0);
          $('#dat_hc_it_a_area').val(0);
          //---------aqui se reinician los valores del buscador 
        }
      })



    } else {

      hideLoading();
    }



  });

} //------------------------------------- fin   fnSp3CargaFiltroEstadoInicialSaludOcupacional_trans() -------------------------------------
*/ //sustituido

//############################## BLOQUE CODIGO INTEGRACION ANDY 10-09-2021 #####################################

function fnSp3CargaFiltroEstadoInicialSaludOcupacional_trans() { //------------------------------------- ini   fnSp3CargaFiltroEstadoInicialSaludOcupacional_trans() -------------------------------------
  showLoading();
  $('#lb_ho_it_trans ').html('Cargando.....') //asi estaba en el otro

//alert('es aquiiiiiiiiiiii')
  console.log("248 URL", url);
  var headers = { "apiKey": constantes.apiKey, "Content-Type": "application/json" }
  //alert('api = '+constantes.apiKey);


  var a = parseInt($('#dat_hc_it_a_gerencia').val());//dat_hc_it_a_gerencia
  var b = $('#dat_hc_it_a_planta_sede').val();
  var c = $('#dat_hc_it_a_area').val();
  var d = $('#dat_hc_it_a_doc').val();
  var e = $('#dat_hc_it_a_nombre').val();
  var f = $('#dat_hc_it_a_apellido').val();
  var g = $('#dat_hc_it_a_cod_interc').val();
  var h = $('#dat_hc_it_a_fe_desde').val(); h = '';//error de servicio se debe arreglar
  var i = $('#dat_hc_it_a_fe_hasta').val(); i = '';//error de servicio se debe arreglar
  var j = $('#dat_hc_it_a_busca').val();

  //"+a+"


  //var url = apiUrlsho+"/api/hce_Get_009_interconsulta_busqueda?code=mlLAeNuPAvTC057apNoiFLG/H/j36XcKY8vYElXN1st3CaLy2eeQ1A==&Gerencia= "+a+"&Planta="+b+"&Area="+c+"&Documento= "+d+"&Nombres=&Apellidos&CodeInterconsultaTraferencia&FechaDesde&FechaHasta&Buscar";

  //var url = apiUrlsho+"/api/hce_Get_010_transferencia_busqueda?code=Ma57zVWN/hVKiVbpbiaBFuwa3iEiVrtFLv6X0qATPa1taStnyUvlPw==&Gerencia= "+a+"&Planta="+b+"&Area="+c+"&Documento= "+d+"&Nombres&Apellidos&CodeInterconsultaTraferencia&FechaDesde&FechaHasta&Buscar"

  var url = apiUrlsho + "/api/hce_Get_010_transferencia_busqueda?code=Ma57zVWN/hVKiVbpbiaBFuwa3iEiVrtFLv6X0qATPa1taStnyUvlPw==&Gerencia=" + a + "&Planta=" + b + "&Area=" + c + "&Documento=" + d + "&Nombres=" + e + "&Apellidos=" + f + "&CodeInterconsultaTraferencia=" + g + "&FechaDesde=" + h + "&FechaHasta=" + i + "&Buscar=" + j;

  console.log('urlyyyyyyyyyy:::::', url);

  var settings = {
    "url": url,
    "method": "GET",
    "timeout": 0,
    "crossDomain": true,
    "dataType": "json",
    "headers": headers,
    // "data": { "NroDocumento_Trabajador_H": a, "AreaId_Empresa_H": c, "SedeId_Empresa_H": b, "Buscador": d } //JSON.stringify(body)
  };



  $.ajax(settings).done(function (response) {
    console.log("**todos trasnferencia 574**", response);



    if (response.DiagnosticoCIE10.length > 0) { //---------------------------------------------------------------

      response.DiagnosticoCIE10.map(function (itemx) {
        //D_IT[itemx.InterconsultaId] = D_IT[itemx.InterconsultaId].itemx.Descripcion_TipCie10;

        D_IT2[itemx.TransferenciaId] = itemx;

        // console.log("diagnostico", itemx.Descripcion_TipCie10);

        // if(itemx.Descripcion_TipCie10 == 'null' || itemx.Descripcion_TipCie10 == null || itemx.Descripcion_TipCie10 == '')
        // {  D_IT2[itemx.TransferenciaId2] = '-----';}
        // else
        // { D_IT2[itemx.TransferenciaId2] = itemx.Descripcion_TipCie10}

      });
      console.log("596 D_IT[]", D_IT2);


    } //---------------------------------------------------------------


    response.SignosVitales.map(function (itemx) {

      D_IT3[itemx.TransferenciaId] = itemx;


    });
    console.log("302 D_IT3[]", D_IT3);


   





HTMLEXCEL_TRANSF = '';

    response.transferencias.map(function (Item) 
    {

       // if (paObj_ht[Item.Id].a.DiagnosticoCIE10) {
       //  var Diagnostico = paObj_ht[Item.Id].a.DiagnosticoCIE10.Descripcion_TipCie10;
       //       } else { var Diagnostico = '-----' }



    $('#dat_hc_it_a_gerencia').val(Item.GerenciaId_Empresa_H)
    var GerenciaId_Empresa_H = $('#dat_hc_it_a_gerencia option:selected').text();


    $('#dat_hc_it_a_area').val(Item.AreaId_Empresa_H)
    var AreaId_Empresa_H_S = $('#dat_hc_it_a_area option:selected').text();

    $('#dat_hc_it_a_planta_sede').val(Item.SedeId_Empresa_H)
    var SedeId_Empresa_H_S = $('#dat_hc_it_a_planta_sede option:selected').text();


    var f1 = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.A_FechaTransferencia);


                             HTMLEXCEL_TRANSF += `<tr  style="border: 1px !important;color: #000;">
                                                                                         

                                          <th  style="border: 1px !important;">${Item.NroDocumento_Trabajador_H}</th> 
                                          <th  style="border: 1px !important;">${Item.Nombres_Trabajador_H}</th>
                                          <th  style="border: 1px !important;">${Item.Apellidos_Trabajador_H}</th> 
                                          <th  style="border: 1px !important;">${GerenciaId_Empresa_H}</th>
                                          <th  style="border: 1px !important;">${SedeId_Empresa_H_S}</th>
                                          <th  style="border: 1px !important;">${AreaId_Empresa_H_S}</th>
                                          <th  style="border: 1px !important;">${Item.PuestoTrabajo_Empresa_H}</th>
                                          <th  style="border: 1px !important;">${Item.A_Empresa_Inter}</th>
                                          <th  style="border: 1px !important;">${Item.A_CodeTransferencia}</th>  
                                          <th  style="border: 1px !important;"> ${Item.Descripcion_TipOrigen}</th>  
                                          <th  style="border: 1px !important;">${Item.CodigoOrigen}</th>  
                                          <th  style="border: 1px !important;"> ${Item.A_FechaInterconsulta}</th>
                                          <th  style="border: 1px !important;"> ${f1}</th>   
                                          <th  style="border: 1px !important;"> ${Item.B_RecibioRespuesta_Inter == 1 ? 'Si' : "No"}</th>  
                                          <th  style="border: 1px !important;">${D_IT[Item.IdInter]}</th>  
                               
                                 </tr>
                                                                                          `;





    });






    if (response.transferencias.length > 0) {
      $('#cant_transf').html('' + response.transferencias.length + ' registros');



      $('#bodyTablaSinAuditorias_trans').css('display', 'none');

      $('#pagination-container-EvalAud_trans').pagination({
        dataSource: response.transferencias,
        pageSize: 4,
        callback: function (data, pagination) {
          var html = fnSp3ListarTablaGeneralH_trans(data);
          $('#body-tabla-list-EvalAud_trans').html(html);

          //---------aqui se reinician los valores del buscador 
          $('#dat_hc_it_a_gerencia').val(0);
          $('#dat_hc_it_a_planta_sede').val(0);
          $('#dat_hc_it_a_area').val(0);
          //---------aqui se reinician los valores del buscador 
        }
      })



    } else {
      $('#lb_ho_it_trans ').html('Transferencia');
      $('#cant_transf').html('' + response.transferencias.length + ' registros');
      $('#body-tabla-list-EvalAud_trans').html("");
       $('#pagination-container-EvalAud_trans').html("");
      hideLoading();
    }



  });




} //------------------------------------- fin   fnSp3CargaFiltroEstadoInicialSaludOcupacional_trans() -------------------------------------




function fnSp3ListarTablaGeneralH_trans(data) { //------------------------------------------------------- ini   fnSp3ListarTablaGeneralH_trans() -----------------------------------

  var html = '';
  var btNew = '';
  var width = 2450; //
  var width1 = 2430; //
  var width1 = 2420; //

  //alert('aqiooooooooooooooooooo 315');
  data.forEach((Item) => {

    paObj_ht[Item.Id] = new Transferencia();
    paObj_ht[Item.Id].cargarData(Item);


    var i = paObj_ht[Item.Id].a.DiagnosticoCIE10.length;
    paObj_ht[Item.Id].a.DiagnosticoCIE10 = D_IT2[Item.Id];
    paObj_ht[Item.Id].a.SignosVitales = D_IT3[Item.Id];


    console.log("####################################################", Item.Id, "###################################################################")

    console.log("paObj_ht[Item.Id].a.DiagnosticoCIE10 = ", paObj_ht[Item.Id].a.DiagnosticoCIE10);
    console.log("paObj_ht[Item.Id].a.SignosVitales = ", paObj_ht[Item.Id].a.SignosVitales);

    console.log("####################################################", Item.Id, "#######################################################################")

    if (paObj_ht[Item.Id].a.DiagnosticoCIE10) {
      var Diagnostico = paObj_ht[Item.Id].a.DiagnosticoCIE10.Descripcion_TipCie10;
    } else { var Diagnostico = '-----' }



    $('#dat_hc_it_a_gerencia').val(Item.GerenciaId_Empresa_H)
    var GerenciaId_Empresa_H = $('#dat_hc_it_a_gerencia option:selected').text();


    $('#dat_hc_it_a_area').val(Item.AreaId_Empresa_H)
    var AreaId_Empresa_H_S = $('#dat_hc_it_a_area option:selected').text();

    $('#dat_hc_it_a_planta_sede').val(Item.SedeId_Empresa_H)
    var SedeId_Empresa_H_S = $('#dat_hc_it_a_planta_sede option:selected').text();


    var f1 = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.A_FechaTransferencia);

    var menupop = `                   <div class="dropdown">
                                                          <button class=" btn-link dropdown textVertical" style='outline:none !important;' id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <label class='textVertical'>...</label>
                                                          </button>

                                                          
                                                             <div class="dropdown-menu">
                                                                  <a class="dropdown-item" onclick="fnSp3VerEditarRegistroTransferencia(${Item.IdHC}, ${Item.Id},0);"><img src="./images/sho/eyeIcon.svg" alt="" />&nbsp;&nbsp; Ver Registro Transferencia</a>
                                                                  <a class="dropdown-item" onclick="fnSp3VerEditarRegistroTransferencia(${Item.IdHC}, 0,3);"><img src="./images/sho/moreIcon.svg" alt="" />&nbsp;&nbsp; Registro Nueva Transferencia</a>
                                                                  <a class="dropdown-item" onclick="fnSp3VerEditarRegistroTransferencia(${Item.IdHC}, ${Item.Id},1);"><img src="./images/sho/edit.svg" style='width:15px; height:18px;' alt="" /> &nbsp;&nbsp; Editar Transferencia</a>
                                                                </div>
                                                          </div>
                                                        </div>
                                                      `;



    html += `
                                
                                 <div class="col-md-12"   style=" width:3050px !important;"   >
                                                                    <div class="header-tabla px-2 py-3 filaBandeja" style=" width:3020px !important; mmargin-rigth:30px !important; " > 

                                                                        <table border="0"  style=" width:3030px !important;  "  >   
                                                                            <tr >
                                                                                 
                                                                                  <td  style = 'width: 200px;'  align="center"><div id="c2TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.NroDocumento_Trabajador_H != null ? Item.NroDocumento_Trabajador_H : "---"}</div></td>
                                                                                  <td  style = 'width: 200px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.Nombres_Trabajador_H != null ? Item.Nombres_Trabajador_H : "---"}</div></td> 
                                                                                  <td  style = 'width: 190px;'  align="center"><div id="c3TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.Apellidos_Trabajador_H != null ? Item.Apellidos_Trabajador_H : "---"}</div></td>
                                                                                  <td  style = 'width: 200px;'  align="center"><div id="c4TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${GerenciaId_Empresa_H != null ? GerenciaId_Empresa_H : "---"}</div></td>
                                                                                  <td  style = 'width: 200px;'  align="center"><div id="c5TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${SedeId_Empresa_H_S != null ? SedeId_Empresa_H_S : "---"}</div></td>

                                                                                  <td  style = 'width: 200px;'  align="center"><div id="c6TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${AreaId_Empresa_H_S != null ? AreaId_Empresa_H_S : "---"}</div></td>
                                                                                  <td  style = 'width: 200px;'  align="center"><div id="c7TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important;'   >${Item.PuestoTrabajo_Empresa_H != null ? Item.PuestoTrabajo_Empresa_H : "---"}</div></td>
                                                                                  <td  style = 'width: 200px;'  align="center"><div id="c8TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important;'   >${Item.A_Empresa != null ? Item.A_Empresa : "---"}</div></td>
                                                                                

                                                                                  <td  style = 'width: 200px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.A_CodeTransferencia != null ? Item.A_CodeTransferencia : "---"}</div></td>  
                                                                                  <td  style = 'width: 190px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.Descripcion_TipOrigen != null ? Item.Descripcion_TipOrigen : "---"}</div></td> 

                                                                                  <td  style = 'width: 190px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.CodigoOrigen != null ? Item.CodigoOrigen : "---"}</div></td>  
                                                                                  <td  style = 'width: 200px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >&nbsp;&nbsp;&nbsp; ${Item.C_Lugar != null ? Item.C_Lugar : "---"}</div></td>  
                                                                                  <td  style = 'width: 200px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >&nbsp;&nbsp; ${f1 != null ? f1 : "---"}</div></td>  
                                                                                  <td  style = 'width: 190px;'  align="center"><div id="c9TabGenyx" class="text-center lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.B_RecibioRespuesta_Inter == 1 ? 'Si' : "No"}</div></td>  
                                                                                   <!-- <td  style = 'width: 190px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.C_ActitupParaLaboral_Inter == 1 ? 'Apto' : "No Apto"}</div></td>  -->
                                                                                  <td  style = 'width: 180px;'  align="center"><div id="c1TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Diagnostico != null ? Diagnostico : "---"} </div></td>  

                                                                                  <td  style = 'width: 10px;'   align="left"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${menupop}</td>  
                                                                                  <td  style = 'width: 20px;'   align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >&nbsp;</td>  

                                                                        </table>
                                                                    </div>
                                                  </div>    

                                              `;



    



  });








  hideLoading();
  $('#lb_ho_it_trans ').html('Transferencia')

  // $('#dat_hc_a_area').val(0)
  // $('#dat_hc_a_sede').val(0)



  return html;


}
//------------------------------------- fin   fnSp3ListarTablaGeneralH_trans() -------------------------------------

//############################## BLOQUE CODIGO INTEGRACION ANDY 10-09-2021 #####################################







/*
function fnSp3ListarTablaGeneralH_trans(data) { //------------------------------------------------------- ini   fnSp3ListarTablaGeneralH_trans() -----------------------------------

  var html = '';
  var btNew = '';
  var width = 2450; //
  var width1 = 2430; //
  var width1 = 2420; //

  //alert('aqiooooooooooooooooooo 315');
  data.forEach((Item) => {

    paObj_ht[Item.Id] = new Transferencia();
    paObj_ht[Item.Id].cargarData(Item);


    var i = paObj_ht[Item.Id].a.DiagnosticoCIE10.length;
    paObj_ht[Item.Id].a.DiagnosticoCIE10 = D_IT2[Item.Id];
    paObj_ht[Item.Id].a.SignosVitales = D_IT3[Item.Id];


    console.log("####################################################", Item.Id, "###################################################################")

    console.log("paObj_ht[Item.Id].a.DiagnosticoCIE10 = ", paObj_ht[Item.Id].a.DiagnosticoCIE10);
    console.log("paObj_ht[Item.Id].a.SignosVitales = ", paObj_ht[Item.Id].a.SignosVitales);

    console.log("####################################################", Item.Id, "#######################################################################")

    if (paObj_ht[Item.Id].a.DiagnosticoCIE10) {
      var Diagnostico = paObj_ht[Item.Id].a.DiagnosticoCIE10.Descripcion_TipCie10;
    } else { var Diagnostico = '-----' }



    $('#dat_hc_it_a_gerencia').val(Item.GerenciaId_Empresa_H)
    var GerenciaId_Empresa_H = $('#dat_hc_it_a_gerencia option:selected').text();


    $('#dat_hc_it_a_area').val(Item.AreaId_Empresa_H)
    var AreaId_Empresa_H_S = $('#dat_hc_it_a_area option:selected').text();

    $('#dat_hc_it_a_planta_sede').val(Item.SedeId_Empresa_H)
    var SedeId_Empresa_H_S = $('#dat_hc_it_a_planta_sede option:selected').text();


    var f1 = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.A_FechaTransferencia);

    var menupop = `                   <div class="dropdown">
                                          <button class=" btn-link dropdown textVertical" style='outline:none !important;' id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <label class='textVertical'>...</label>
                                          </button>

                                          
                                            <div class="dropdown-menu">  
                                                  <a class="dropdown-item" onclick="fnSp3VerEditarRegistroTransferencia(${Item.IdHC}, ${Item.Id},0);"><img src="./images/sho/eyeIcon.svg" alt="" />&nbsp;&nbsp; Ver Registro Transferencia</a>
                                                  <a class="dropdown-item" onclick="fnSp3VerEditarRegistroTransferencia(${Item.IdHC}, ${Item.Id},1);"><img src="./images/sho/edit.svg" style='width:15px; height:18px;' alt="" /> &nbsp;&nbsp; Editar Transferencia</a>
                                                </div>
                                          </div>
                                        </div>
                                      `;



    html += `
                
                 <div class="col-md-12"   style=" width:3050px !important;"   >
                                                    <div class="header-tabla px-2 py-3 filaBandeja" style=" width:3020px !important; mmargin-rigth:30px !important; " > 

                                                        <table border="0"  style=" width:3030px !important;  "  >   
                                                            <tr >
                                                                 
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c2TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.NroDocumento_Trabajador_H != null ? Item.NroDocumento_Trabajador_H : "---"}</div></td>
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.Nombres_Trabajador_H != null ? Item.Nombres_Trabajador_H : "---"}</div></td> 
                                                                  <td  style = 'width: 190px;'  align="center"><div id="c3TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.Apellidos_Trabajador_H != null ? Item.Apellidos_Trabajador_H : "---"}</div></td>
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c4TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${GerenciaId_Empresa_H != null ? GerenciaId_Empresa_H : "---"}</div></td>
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c5TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${SedeId_Empresa_H_S != null ? SedeId_Empresa_H_S : "---"}</div></td>

                                                                  <td  style = 'width: 200px;'  align="center"><div id="c6TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${AreaId_Empresa_H_S != null ? AreaId_Empresa_H_S : "---"}</div></td>
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c7TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important;'   >${Item.PuestoTrabajo_Empresa_H != null ? Item.PuestoTrabajo_Empresa_H : "---"}</div></td>
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c8TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important;'   >${Item.A_Empresa != null ? Item.A_Empresa : "---"}</div></td>
                                                                

                                                                  <td  style = 'width: 200px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.A_CodeTransferencia != null ? Item.A_CodeTransferencia : "---"}</div></td>  
                                                                  <td  style = 'width: 190px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.Descripcion_TipOrigen != null ? Item.Descripcion_TipOrigen : "---"}</div></td> 

                                                                  <td  style = 'width: 190px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.CodigoOrigen != null ? Item.CodigoOrigen : "---"}</div></td>  
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >&nbsp;&nbsp;&nbsp; ${Item.C_Lugar != null ? Item.C_Lugar : "---"}</div></td>  
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >&nbsp;&nbsp; ${f1 != null ? f1 : "---"}</div></td>  
                                                                  <td  style = 'width: 190px;'  align="center"><div id="c9TabGenyx" class="text-center lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.B_RecibioRespuesta_Inter == 1 ? 'Si' : "No"}</div></td>  
                                                                   <!-- <td  style = 'width: 190px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.C_ActitupParaLaboral_Inter == 1 ? 'Apto' : "No Apto"}</div></td>  -->
                                                                  <td  style = 'width: 180px;'  align="center"><div id="c1TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Diagnostico != null ? Diagnostico : "---"} </div></td>  

                                                                  <td  style = 'width: 10px;'   align="left"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${menupop}</td>  
                                                                  <td  style = 'width: 20px;'   align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >&nbsp;</td>  

                                                        </table>
                                                    </div>
                                  </div>    

                              `;



    HTMLEXCEL_TRANSF += `<tr  style="border: 1px !important;color: #000;">
                                                                         

                          <th  style="border: 1px !important;">${Item.NroDocumento_Trabajador_H}</th> 
                          <th  style="border: 1px !important;">${Item.Nombres_Trabajador_H}</th>
                          <th  style="border: 1px !important;">${Item.Apellidos_Trabajador_H}</th> 
                          <th  style="border: 1px !important;">${GerenciaId_Empresa_H}</th>
                          <th  style="border: 1px !important;">${SedeId_Empresa_H_S}</th>
                          <th  style="border: 1px !important;">${AreaId_Empresa_H_S}</th>
                          <th  style="border: 1px !important;">${Item.PuestoTrabajo_Empresa_H}</th>
                          <th  style="border: 1px !important;">${Item.A_Empresa_Inter}</th>
                          <th  style="border: 1px !important;">${Item.A_CodeInterconsulta_Inter}</th>  
                          <th  style="border: 1px !important;"> ${Item.Descripcion_TipOrigen}</th>  
                          <th  style="border: 1px !important;">${Item.CodigoOrigen_Inter}</th>  
                          <th  style="border: 1px !important;"> ${Item.A_FechaInterconsulta}</th>
                          <th  style="border: 1px !important;"> ${f1}</th>   
                          <th  style="border: 1px !important;"> ${Item.B_RecibioRespuesta_Inter == 1 ? 'Si' : "No"}</th>  
                          <th  style="border: 1px !important;">${D_IT[Item.IdInter]}</th>  
               
                 </tr>
                                                                          `;



  });








  hideLoading();
  //console.log(html);

  // $('#dat_hc_a_area').val(0)
  // $('#dat_hc_a_sede').val(0)



  return html;


}
//------------------------------------- fin   fnSp3ListarTablaGeneralH_trans() -------------------------------------


*/ //sustituida









function fnSp3VerEditarRegistroTransferencia(idHistoriaC, idTransferencia, accion) { //------------------------------------- ini   fnSp3VerEditarRegistroTransferencia() ------------------------------------- accion 0-ver, accion 1-editar

  //alert('respondo yo o q 1406');
  istAud = idTransferencia;

  console.log(" 787 *************************** idHistoriaC = ", idHistoriaC);
  console.log(" 788 *************************** idTransferencia = ", idTransferencia);
  console.log(" 789 *************************** accion = ", accion);

  console.log(" 791 *************************** DATOS INTERCONSULTA = ", paObj_ht[idTransferencia]);

  if (accion == 0) {
    handlerUrlhtml('contentGlobal', 'view/sho-hce/interconsultas_transferencias/formularioTransferenciasVer_HC.html', 'Ver Datos de la Transferencia ');

  }
  else {
    if (accion == 1) {
      handlerUrlhtml('contentGlobal', 'view/sho-hce/interconsultas_transferencias/formularioTransferenciaEditar.html', 'Modificar Datos de la Transferencia ');

    }
  }






} //------------------------------------- fin   fnSp3VerEditarRegistroTransferencia() -------------------------------------



function fnSp3VerTransferenciaFormulario() { //------------------------------------- ini   fnSp3VerEditarRegistroTransferencia() ------------------------------------- accion 0-ver, accion 1-editar

alert('es aquiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii andy')
  console.log('1436 ya cargue................ = ', paObj_ht[istAud]);

  $('#dat_int_tran_codigo').val(paObj_ht[istAud].a.NroDocumento_Trabajador_H);
  $('#dat_int_tran_nombre').val(paObj_ht[istAud].a.Nombres_Trabajador_H);
  $('#dat_int_tran_apellido').val(paObj_ht[istAud].a.Apellidos_Trabajador_H);
  $('#dat_int_tran_edad').val(paObj_ht[istAud].a.Edad_Trabajador_H);

  $('#dat_int_tran_gerencia').val(paObj_ht[istAud].a.GerenciaId_Empresa_H);
  $('#dat_int_tran_planta').val(paObj_ht[istAud].a.PlantaId_Empresa_H);
  $('#dat_int_tran_area').val(paObj_ht[istAud].a.AreaId_Empresa_H);
  $('#dat_int_tran_puesto').val(paObj_ht[istAud].a.PuestoTrabajo_Empresa_H);




  $('#dat_int_tran_empresa').val(paObj_ht[istAud].a.A_Empresa);

  var f1 = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(paObj_ht[istAud].a.A_FechaTransferencia);
  var pr = f1.split('/');
  var f1 = pr[2] + '-' + pr[1] + '-' + pr[0];
  //f1 = f1.replace('/', '-');  f1 = f1.replace('/', '-');
  // alert(f1);

  $('#dat_int_tran_fe_transferencia').val(f1);
  $('#dat_int_tran_direcciont').val(paObj_ht[istAud].a.A_DireccionTrabajador);
  $('#dat_int_tran_telefono').val(paObj_ht[istAud].a.A_Telefono);
  $('#dat_int_tran_anamesis').val(paObj_ht[istAud].a.A_Anamnesis);

  $('#dat_int_tran_sv1').val(paObj_ht[istAud].a.SignosVitales.PresionArterial_SV);
  $('#dat_int_tran_sv2').val(paObj_ht[istAud].a.SignosVitales.FrecuenciaCardiaca_SV);
  $('#dat_int_tran_sv3').val(paObj_ht[istAud].a.SignosVitales.FrecuenciaRespiratoria_SV);
  $('#dat_int_tran_sv4').val(paObj_ht[istAud].a.SignosVitales.Temperatura_SV);
  $('#dat_int_tran_sv5').val(paObj_ht[istAud].a.SignosVitales.PesoKg_SV);
  $('#dat_int_tran_sv6').val(paObj_ht[istAud].a.SignosVitales.Talla_SV);
  $('#dat_int_tran_sv7').val(paObj_ht[istAud].a.SignosVitales.Saturacion_SV);
  $('#dat_int_tran_sv8').val(paObj_ht[istAud].a.SignosVitales.IndiceMasaCorporal_SV);
  $('#dat_int_tran_sv9').val(paObj_ht[istAud].a.SignosVitales.PerimetroAbdominal_SV);

  // buscamos los cieDiagnostico1

  console.log("DISGNOSTICOS  1 = ", paObj_ht[istAud].a.DiagnosticoCIE10);

  var k = 0;
  var tabla;


  D_IT2.map(function (Item) {
    if ((Item.TransferenciaId > 0) && (Item.TransferenciaId == istAud)) {
      console.log("DISGNOSTICOS coincide*** 1 = ", Item);
      var f1a = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.CreadoFecha);

      tabla += `
                      <tr>
                      <td>${Item.Diagnostico != null ? Item.Diagnostico : "---"}</td>
                      <td>${Item.Code_TipCie10 != null ? Item.Code_TipCie10 : "---"}</td>
                      <td>${f1a != null ? f1a : "---"}</td>
                      <td>${Item.Especilidades_TipCie10 != null ? Item.Especilidades_TipCie10 : "---"}</td>
                      <td>${Item.Descripcion_SistAfect != null ? Item.Descripcion_SistAfect : "---"}</td>
                      <td>${Item.Descripcion_SecAfec != null ? Item.Descripcion_SecAfec : "---"}</td>
                    </tr>


                          `;
      k++;
    }
  });

  $('#lb_diag_1_int').html("" + k + " registros");

  $('#lb_diag_1_tabla').html(" ");
  $('#lb_diag_1_tabla').html(tabla);




  var tabla2;
  var k = 0;

  D_IT2.map(function (Item) {
    if ((Item.TransferenciaId2 > 0) && (Item.TransferenciaId2 == istAud)) {
      console.log("DISGNOSTICOS coincide*** 2 = ", Item);
      var f1a = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.CreadoFecha);

      tabla2 += `
                      <tr>
                      <td>${Item.Diagnostico != null ? Item.Diagnostico : "---"}</td>
                      <td>${Item.Code_TipCie10 != null ? Item.Code_TipCie10 : "---"}</td>
                      <td>${f1a != null ? f1a : "---"}</td>
                      <td>${Item.Especilidades_TipCie10 != null ? Item.Especilidades_TipCie10 : "---"}</td>
                      <td>${Item.Descripcion_SistAfect != null ? Item.Descripcion_SistAfect : "---"}</td>
                      <td>${Item.Descripcion_SecAfec != null ? Item.Descripcion_SecAfec : "---"}</td>
                    </tr>


                          `;
      k++;
    }
  });

  $('#lb_diag_2_int').html("" + k + " registros");

  $('#lb_diag_2_tabla').html(" ");
  $('#lb_diag_2_tabla').html(tabla2);

  fnSp3CargaAdjuntosTransferencia(istAud);




  // <tbody id="lb_diag_1_tabla">
  //       <tr>
  //         <td>Diagnóstico 1</td>
  //         <td>Tipo 1</td>
  //         <td>27/08/2021</td>
  //         <td>Especialidad 1</td>
  //         <td>Sistema 1</td>
  //         <td>Sección 1</td>
  //       </tr>










  //TransferenciaId
  //  A_Anamnesis: null
  //  A_CodeTransferencia: "Tr0003"
  //  A_DireccionTrabajador: null
  //  A_Empresa: null
  //  A_FechaTransferencia: "2021-08-19T00:00:00"
  //  A_Telefono: null
  //  Apellidos_Trabajador_H: "vacio"
  //  AreaId_Empresa_H: 0
  //  B_HoraAtencionDSO: "16:21:28"
  //  B_HoraEvaluacion: "00:00:00"
  //  B_MotivoTrasferencia: null
  //  B_Tratamiento: null
  //  C_Fecha: "2021-08-17T16:24:06"
  //  C_IdHashRecibido: null
  //  C_Lugar: null
  //  C_RecibidoPor: null
  //  C_Tratamiento: null
  //  CodigoHistoria: "H00002"
  //  CodigoOrigen: null
  //  Descripcion_TipOrigen: "Enfermedades ocupacionales"
  //  Edad_Trabajador_H: 0
  //  GerenciaId_Empresa_H: 0
  //  HistoriaClinicaId: 2
  //  Id: 3
  //  IdHC: 2
  //  IdOrigen: 1
  //  IdTipOrigen: 3
  //  IdTipoOrigen: 1
  //  Nombres_Trabajador_H: "vacio"
  //  NroDocumento_Trabajador_H: 25255225
  //  PlantaId_Empresa_H: 0
  //  PuestoTrabajo_Empresa_H: "vacio"
  //  SedeId_Empresa_H: 1



} //------------------------------------- fin   fnSp3VerEditarRegistroTransferencia() -------------------------------------




function fnSp3CargaListadosTrnasferencia2() { //--------------------------------------------------------------------------------------------------------------  ini ------------------------- fnSp3CargaListasHistoriaClinica_Interconsulta_transferencia

  showLoading();


  //document.getElementById('dat_hc_it_a_busca').value = '2021/12/1
  $("#" + 'dat_int_tran_gerencia').html("Cargando ...");
  $("#" + 'dat_int_tran_planta').html("Cargando ...");
  $("#" + 'dat_int_tran_area').html("Cargando ...");

  var l = OBJ_I.Gerencia.length;
  var lk = 0;


  var n = OBJ_I.Sedes.length;
  var nk = 0;

  var m = OBJ_I.Area.length;
  var mk = 0;

  //------------------------------------------------------------------------------------------------------------------------------------------------------------
  // $("#" + 'dat_hc_it_a_gerencia').html(" ");   $("#" + 'dat_hc_it_a_gerencia').css('font-size', '13px'); $("#" + 'dat_hc_it_a_gerencia').html("<option selected value='0'>          </option>");
  $("#" + 'dat_int_tran_gerencia').html(" ");
  $("#" + 'dat_int_tran_gerencia').html("<option selected value='0'>          </option>");



  OBJ_I.Gerencia.map(function (item) {
    // $("#" + 'dat_hc_it_a_gerencia').append(`<option value='${item.Id}' title='${item.Description}' style='font-weight: bold;'>${item.Description}</option>`);
    $("#" + 'dat_int_tran_gerencia').append(`<option value='${item.Id}' title='${item.Description}' style='font-weight: bold;'>${item.Description}</option>`);
    lk++;
    if (l == lk) { //----------------------------------------------------------------------------------------------------------



      //------------------------------------------------------------------------------------------------------------------------------------------------------------
      // $("#" + 'dat_hc_it_a_planta_sede').html(" "); $("#" + 'dat_hc_it_a_planta_sede').css('font-size', '13px');  $("#" + 'dat_hc_it_a_planta_sede').html("<option selected value='0'>          </option>");
      $("#" + 'dat_int_tran_planta').html(" ");
      $("#" + 'dat_int_tran_planta').html("<option selected value='0'>          </option>");

      OBJ_I.Sedes.map(function (item) {
        //$("#" + 'dat_hc_it_a_planta_sede').append(`<option value='${item.Id}' title='${item.Description}' style='font-weight: bold;'>${item.Description}</option>`);
        $("#" + 'dat_int_tran_planta').append(`<option value='${item.Id}' title='${item.Description}' style='font-weight: bold;'>${item.Description}</option>`);
        nk++;
        if (n == nk) { //-----------------------------------------------------------------------

          // $("#" + 'dat_hc_it_a_area').html(" "); $("#" + 'dat_hc_it_a_area').css('font-size', '13px'); $("#" + 'dat_hc_it_a_area').html("<option selected value='0'>          </option>");
          $("#" + 'dat_int_tran_area').html(" ");
          $("#" + 'dat_int_tran_area').html("<option selected value='0'>          </option>");

          OBJ_I.Area.map(function (item) {
            //$("#" + 'dat_hc_it_a_area').append(`<option value='${item.Id}' title='${item.Description}' style='font-weight: bold;'>${item.Description}</option>`);
            $("#" + 'dat_int_tran_area').append(`<option value='${item.Id}' title='${item.Description}' style='font-weight: bold;'>${item.Description}</option>`);
            mk++;
            if (m == mk) { //--------------------------------------------------------------------------------------------------------------------------------------------
              fnSp3VerTransferenciaFormulario();
            } //-----------------------------------------------------------------------------------------------------------------------------------------
          });

        } //-----------------------------------------------------------------------
      });


    } //----------------------------------------------------------------------------------------------------------

  });
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------


  hideLoading();








} //



/*
function fnSp3CargaAdjuntosTransferencia(idTransf) { //--------------------------------------------------------------------------------------------------------------  ini ------------------------- fnSp3CargaListasHistoriaClinica_Interconsulta_transferencia

  //forzando los adjuntos
  idTransf = 1;



  showLoading();
  var tabla3;
  var ki = 0;

  // var url = "apiUrlssoma/api/Get-Incidente-AccidenteWeb?code=GY7/yooa3Zl5sKu7zgakDbaCn4uvOKXjfwe/JkbSuIwDPOs/baiZFQ==&httpmethod=objectlist";
  // var url = apiUrlssoma+"/api/hce_Get_011_transferencias_adjunto?code=sRis0xUMFlJMZaBlT/ivHAzwTAjZtvY4ToxBzbY/qhTmFqj6eAV0bA==&IdTransferencias="+idTransf;
  var url = "https://5h0-dev-salud.azurewebsites.net/api/hce_Get_011_transferencias_adjunto?code=sRis0xUMFlJMZaBlT/ivHAzwTAjZtvY4ToxBzbY/qhTmFqj6eAV0bA==&IdTransferencias=1";
  console.log("132 interc URL", url)


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
    console.log("**fnSp3CargaListasHistoriaClinica_Interconsulta_transferencia**", response1);


    if (response1.AdjuntoTransferencia.length > 0) {
      response1.AdjuntoTransferencia.map(function(Item) {
        //alert('entre aqui 1167')

        var f1a = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.CreadoFecha);
        tabla3 += `
                        <tr>
                            <td>${Item.NombreArchivo != null ? Item.NombreArchivo : "---"}</td>
                            <td>${f1a != null ? f1a : "---"}</td>
                            <td>
                              <button type="button" class="btn btn-link shadow-none float-right">
                                <img class="inject-svg" src="./images/sho/download.svg" alt="" fill="#8fbb02" width="16px">
                              </button>
                            </td>
                         </tr>
                           `;

        ki++;
        alert("1167-------------" + ki)

      });


      if (ki > 0) {
        $('#lb_diag_3_int').html("" + ki + " registros");
        $('#lb_diag_3_tabla').html(" ");
        $('#lb_diag_3_tabla').html(tabla3);

        $('#table_trans_adjunto_ciex').css('display', 'block');
        $('#lb_diag_3_int').css('display', 'block');
        $('#iconAdjT').css('display', 'block');
        $('#noAdj_Trnas').css('display', 'none');
      } else {
        $('#table_trans_adjunto_ciex').css('display', 'none');
        $('#lb_diag_3_int').css('display', 'none');
        $('#iconAdjT').css('display', 'none');
        $('#noAdj_Trnas').css('display', 'block');

      }

      hideLoading();




    }

    //------------------------------------------------------------------------------------------------------------------------------------------------------------

  });

  // alert("1194-------------"+ki)



} //--------------------------------------------------------------------------------------------------------------  ini ------------------------- fnSp3CargaListasHistoriaClinica_Interconsulta_transferencia

*/







//################################################################################################# INTERCONSULTAS Y TRASNFERENCIAS ###############################################################################











// function fnSp3CargaFiltroEstadoInicialSaludOcupacional_trans() 
// { //------------------------------------- ini   fnSp3CargaFiltroEstadoInicialSaludOcupacional() -------------------------------------
//   showLoading();

//   var body = { "AreaId_Empresa_H": 0, "SedeId_Empresa_H": 0 }

//   //var url = apiUrlShoHce+"/api/Get-Incidente-AccidenteWeb?code=GY7/yooa3Zl5sKu7zgakDbaCn4uvOKXjfwe/JkbSuIwDPOs/baiZFQ==&httpmethod=objectlist&IdTipoEvento="+programa+"&IdEmpresa="+gerencia+"&IdSede="+sedepa+"&FechaInicio="+f1+"&FechaFin="+f2+"&IdEmbarcacion="+estadopa
//   var url = "https://5h0-dev-salud.azurewebsites.net/api/hce_Get_001_historia_clinica?code=5lJWTsRDsoxqo9VoOxIzfQAPyCTxUTqLpvgY5tuHluCZlSodpQ/Y7w==";

//   console.log("URL", url);
//   var headers = { "apiKey": constantes.apiKey, "Content-Type": "application/json" }
//   //alert('api = '+constantes.apiKey);

//   var a = $('#dat_hc_a_doc').val();
//   var b = $('#dat_hc_a_sede').val();
//   var c = $('#dat_hc_a_area').val();
//   var d = $('#dat_hc_a_buscar').val();

//   var settings = {
//     "url": url,
//     "method": "GET",
//     "timeout": 0,
//     "crossDomain": true,
//     "dataType": "json",
//     "headers": headers,
//     "data": { "NroDocumento_Trabajador_H": a, "AreaId_Empresa_H": c, "SedeId_Empresa_H": b, "Buscador": d } //JSON.stringify(body)
//   };



//   $.ajax(settings).done(function(response) {
//     console.log("**todos transfrencia**", response);

//     if (response.HistoriaClin.length > 0) {
//       $('#cant_hist_cli').html('' + response.HistoriaClin.length + ' registros');
//       $('#bodyTablaSinAuditorias').css('display', 'none');

//       $('#pagination-container-EvalAud').pagination({
//         dataSource: response.HistoriaClin,
//         pageSize: 4,
//         callback: function(data, pagination) {
//           var html = fnSp3ListarTablaGeneralH_trans(data);
//           $('#body-tabla-list-EvalAud').html(html);
//           // $("#sp3BtFiltroPlanAnual").html("Buscar")
//           // $("#sp3BtFiltroPlanAnual").attr("disabled",false);
//           // //debemos colocar los campos con su valores de busqueda si existen
//           //     $('#sel_filter_programa_p').val(programa);
//           //     $('#sel_filter_gerencia_p').val(gerencia);
//           //     $('#sel_filter_sede_p').val(sedepa);
//           //     $('#sel_filter_estado_p').val(estadopa);
//           //     $('#sp3_txt_fecha_desde_p').val(f11)
//           //     $('#sp3_txt_fecha_hasta_p').val(f22)

//           $('#dat_hc_a_doc').val(a);
//           $('#dat_hc_a_sede').val(b);
//           $('#dat_hc_a_area').val(c);
//         }
//       })



//     } else {

//       hideLoading();
//     }



//   });







// } //------------------------------------- fin   fnSp3CargaFiltroEstadoInicialSaludOcupacional() -------------------------------------


// function fnSp3ListarTablaGeneralH_trans(data) { //------------------------------------------------------- ini   fnSp3ListarTablaGeneralH() -----------------------------------

//   var html = '';
//   var btNew = '';

//   data.forEach((Item) => {

//     paObj_ht[Item.IdHC] = new HistoriaClinica();//objeto de historia clinica

//     paObj_ht[Item.IdHC].cargarData(Item);
//     //${Item.CodigoPaciente_H != null ? Item.CodigoPaciente_H : "---"}

//     $('#dat_hc_a_area').val(Item.AreaId_Empresa_H)
//     var AreaId_Empresa_H_S = $('#dat_hc_a_area option:selected').text();

//     $('#dat_hc_a_sede').val(Item.SedeId_Empresa_H)
//     var SedeId_Empresa_H_S = $('#dat_hc_a_sede option:selected').text();
//     var f1 = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.FechaRegistro_Trabajador_H);

//     var menupop = `<div class="dropdown">
//                                           <button class=" btn-link dropdown textVertical" style='outline:none !important;' id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                                             <label class='textVertical'>...</label>
//                                           </button>


//                                             <div class="dropdown-menu">  
//                                                   <a class="dropdown-item" onclick="showNuevaHC()"><img src="./images/sho/eyeIcon.svg" alt="" />&nbsp;&nbsp; Ver H.C.</a>
//                                                   <a class="dropdown-item" onclick="divEditaHistoria(${Item.IdHC})"><img src="./images/sho/moreIcon.svg" alt="" /> &nbsp;&nbsp; Nueva atención médica</a>
//                                                 </div>
//                                           </div>
//                                         </div>
//                                       `;



//     html += `

//                                    <div class="col-md-12"   style=" width:2450px !important;"   >
//                                                     <div class="header-tabla px-2 py-3 filaBandeja" style=" width:2420px !important; mmargin-rigth:30px !important; " > 

//                                                         <table border="0"  style=" width:2430px !important;  "  >   <!-- <style=" width:1754px !important; -->
//                                                             <tr >
//                                                                   <td  style = 'width: 200px;'  align="center"><div id="c1TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.CodigoPaciente_H != null ? Item.CodigoPaciente_H : "---"}</div></td> 
//                                                                   <td  style = 'width: 200px;'  align="center"><div id="c2TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.NroDocumento_Trabajador_H != null ? Item.NroDocumento_Trabajador_H : "---"}</div></td>
//                                                                   <td  style = 'width: 200px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.Nombres_Trabajador_H != null ? Item.Nombres_Trabajador_H : "---"}</div></td> 
//                                                                   <td  style = 'width: 200px;'  align="center"><div id="c3TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.Apellidos_Trabajador_H != null ? Item.Apellidos_Trabajador_H : "---"}</div></td>
//                                                                   <td  style = 'width: 200px;'  align="center"><div id="c4TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${AreaId_Empresa_H_S != null ? AreaId_Empresa_H_S : "---"}</div></td>
//                                                                   <td  style = 'width: 200px;'  align="center"><div id="c5TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${SedeId_Empresa_H_S != null ? SedeId_Empresa_H_S : "---"}</div></td>

//                                                                   <td  style = 'width: 200px;'  align="center"><div id="c6TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.Telefono_Trabajador_H != null ? Item.Telefono_Trabajador_H : "---"}</div></td>
//                                                                   <td  style = 'width: 200px;'  align="center"><div id="c7TabGenyx" class="text-center lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${f1 != null ? f1 : "---"}</div></td>
//                                                                   <td  style = 'width: 200px;'  align="center"><div id="c8TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.Diagnostico_AM != null ? Item.Diagnostico_AM : "---"}</div></td>
//                                                                   <td  style = 'width: 200px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.Aptitud_AM != null ? Item.Aptitud_AM : "---"}</div></td>  

//                                                                   <td  style = 'width: 200px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.FechaUltimoEMO != null ? Item.FechaUltimoEMO : "---"}</div></td>  
//                                                                   <td  style = 'width: 190px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.FechaUltimoVMO != null ? Item.FechaUltimoVMO : "---"}</div></td>  
//                                                                   <td  style = 'width: 10px;'   align="left"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${menupop}</td>  
//                                                                   <td  style = 'width: 20px;'   align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >&nbsp;</td>  

//                                                         </table>
//                                                     </div>
//                                   </div>    

//                               `;


//     HTMLEXCEL += `<tr  style="border: 1px !important;color: #000;">
//                                                                          <th  style="border: 1px !important;">${Item.CodigoPaciente_H}</th> 
//                                                                          <th  style="border: 1px !important;">Documento ${Item.NroDocumento_Trabajador_H}</th>
//                                                                          <th  style="border: 1px !important;">Nombres ${Item.Nombres_Trabajador_H}</th> 
//                                                                          <th  style="border: 1px !important;">Apellidos ${Item.Apellidos_Trabajador_H}</th>
//                                                                          <th  style="border: 1px !important;">Áreas ${AreaId_Empresa_H_S}</th>
//                                                                          <th  style="border: 1px !important;">Sede ${SedeId_Empresa_H_S}</th>

//                                                                          <th  style="border: 1px !important;">Teléfono ${Item.Telefono_Trabajador_H}</th>
//                                                                          <th  style="border: 1px !important;">F.Ultima atención médica ${f1}</th>
//                                                                          <th  style="border: 1px !important;">Diagnóstico ${Item.Diagnostico_AM}</th>
//                                                                          <th  style="border: 1px !important;">Aptitud ${Item.Aptitud_AM}</th>  

//                                                                          <th  style="border: 1px !important;">F.Ultimo EMO ${Item.FechaUltimoEMO}</th>  
//                                                                          <th  style="border: 1px !important;">F.Ultimo VMO ${Item.FechaUltimoVMO}</th> 
//                                                                         </tr>
//                                                                           `;



//   });








//   hideLoading();
//   //console.log(html);

//   $('#dat_hc_a_area').val(0)
//   $('#dat_hc_a_sede').val(0)



//   return html;


// }
// //------------------------------------- fin   fnSp3ListarTablaGeneralH() -------------------------------------














function date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(fechaBD) {

  var startDate = moment(fechaBD).format('DD/MM/YYYY'); //dddd
  var year = moment(fechaBD).format('YYYY'); //dddd
  var month = moment(fechaBD).format('MM'); //
  var day = moment(fechaBD).format('DD');
  //var startDate2   = year +"/"+ month +"/"+ day;
  var startDate2 = day + "/" + month + "/" + year

  return startDate2;
}





$(function () {
  // Dropdown toggle
  $(".btn-drop").click(function () {
    $(this).find(".btn-drop-content").slideToggle();
  });
  //-------------------------------------------------------
  $(document).click(function (e) {
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

  $(document).click(function (e) {
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

function imprimeExcel() {

  if (visible == 0) { fnExcelReportPAHC(); }
  if (visible == 1) { fnExcelReportPAHC2(); }

}




function fnExcelReportPAHC() {

  var tab_text = `

    <table  cellpadding="0" cellspacing="0" id="sheet0" style="table-layout: fixed;">
        <thead style='color:#ffffff;'>
            
          <th bgcolor='#223962' style="border: 0px !important; color:#ffffff;">Documento</th> 
          <th bgcolor='#223962' style="border: 0px !important; color:#ffffff;">Nombres</th>
          <th bgcolor='#223962' style="border: 0px !important; color:#ffffff; ">Apellidos</th> 
          <th bgcolor='#223962' style="border: 0px !important; color:#ffffff;">Gerencia</th>
          <th bgcolor='#223962' style="border: 0px !important; color:#ffffff;">Planta</th>
          <th bgcolor='#223962' style="border: 0px !important; color:#ffffff;">Área</th>

          <th bgcolor='#223962' style="border: 0px !important; color:#ffffff;">Puesto</th>
          <th bgcolor='#223962' style="border: 0px !important; color:#ffffff;">Empresa</th>
          <th bgcolor='#223962' style="border: 0px !important; color:#ffffff;">Código transferencia</th>  

          <th bgcolor='#223962' style="border: 0px !important; color:#ffffff;">Origen de transferencia</th>  
          <th bgcolor='#223962' style="border: 0px !important; color:#ffffff;">Código del origen</th>  
          <th bgcolor='#223962' style="border: 0px !important; color:#ffffff;">Establecimiento</th>
          <th bgcolor='#223962' style="border: 0px !important; color:#ffffff;">F. Transferencia</th>  
            
          <th bgcolor='#223962' style="border: 0px !important; color:#ffffff;">Recepción de respuesta</th>  
         
          <th bgcolor='#223962' style="border: 0px !important; color:#ffffff;">Diagnóstico</th>
        </thead>


    <tbody>
                
    </tbody> 
     `;


  tab_text = tab_text + HTMLEXCEL_INTERC;








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
  link.download = 'ReporteInterconsultas';
  link.click();
}


function fnExcelReportPAHC2() {
  //alert('reporte 22222222222222222222');
  var tab_text = `

    <table  cellpadding="0" cellspacing="0" id="sheet0" style="table-layout: fixed;">
        <thead>
            
          <th bgcolor='#223962' style="border: 0px !important; color:#ffffff;">Documento</th> 
          <th bgcolor='#223962' style="border: 0px !important; color:#ffffff;">Nombres</th>
          <th bgcolor='#223962' style="border: 0px !important; color:#ffffff;">Apellidos</th> 
          <th bgcolor='#223962' style="border: 0px !important; color:#ffffff;">Gerencia</th>
          <th bgcolor='#223962' style="border: 0px !important; color:#ffffff;">Planta</th>
          <th bgcolor='#223962' style="border: 0px !important; color:#ffffff;">Área</th>

          <th bgcolor='#223962' style="border: 0px !important; color:#ffffff;">Puesto</th>
          <th bgcolor='#223962' style="border: 0px !important; color:#ffffff;">Empresa</th>
          <th bgcolor='#223962' style="border: 0px !important; color:#ffffff;">Código transferencia</th>  

          <th bgcolor='#223962' style="border: 0px !important; color:#ffffff;">Origen de transferencia</th>  
          <th bgcolor='#223962' style="border: 0px !important; color:#ffffff;">Código del origen</th>  
          <th bgcolor='#223962' style="border: 0px !important; color:#ffffff;">Establecimiento</th>
          <th bgcolor='#223962' style="border: 0px !important; color:#ffffff;">F. Transferencia</th>  
            
          <th bgcolor='#223962' style="border: 0px !important; color:#ffffff;">Recepción de respuesta</th>  
         
          <th bgcolor='#223962' style="border: 0px !important; color:#ffffff;">Diagnóstico</th>
        </thead>


    <tbody>
                 <tr  style="border: 1px !important;color: #000;">
                          <th  style="border: 1px !important;">Documento</th> 
                          <th  style="border: 1px !important;">Nombres</th>
                          <th  style="border: 1px !important;">Apellidos</th> 
                          <th  style="border: 1px !important;">Gerencia</th>
                          <th  style="border: 1px !important;">Planta</th>
                          <th  style="border: 1px !important;">Área</th>

                          <th  style="border: 1px !important;">Puesto</th>
                          <th  style="border: 1px !important;">Empresa</th>
                          <th  style="border: 1px !important;">Código transferencia</th>  

                          <th  style="border: 1px !important;">Origen de transferencia</th>  
                          <th  style="border: 1px !important;">Código del origen</th>  
                          <th  style="border: 1px !important;">Establecimiento</th>
                          <th  style="border: 1px !important;">F. Transferencia</th>  
                            
                          <th  style="border: 1px !important;">Recepción de respuesta</th>  
                         
                          <th  style="border: 1px !important;">Diagnóstico</th>  
                </tr>
    </tbody> 
     `;


  tab_text = tab_text + HTMLEXCEL_TRANSF;








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
  link.download = 'ReporteTransferencias';
  link.click();
}


































// ################################################################# FUNCIONES DE CARLOS ##########################################################

// var sedeAreaGerencia = [];
var datosInter = [];
var datosInterTotal = [];

function hcSp3ConfirmCancelarInterConsulta() {
  Swal.fire({
    title: "Cancelar interconsulta",
    html: `
    <p>Está por cancelar la interconsulta</p>
    <p class="mt-5">¿Desea confirmar la acción?</p>`,
    icon: "info",
    showCancelButton: true,
    reverseButtons: true,
    cancelButtonColor: "#ff3636",
    confirmButtonColor: "#8fbb02",
    confirmButtonText: `Confirmar <img class="inject-svg" src="./images/sho/confirm.svg" alt="" fill="#fff" width="18px">`,
    cancelButtonText: `Cancelar <img class="inject-svg" src="./images/sho/cancelar.svg" alt="" fill="#fff" width="18px">`,
  }).then((result) => {
    if (result.isConfirmed) {
      intSp3CancelarInterConsulta()
    }
  });
  SVGInject($(".inject-svg"));
}

// CARGAR DATOS PETICIONES
function cargarAdjuntosInter() {
  showLoading();
  let url = apiUrlsho+`/api/hce_Get_007_interconsulta_adjunto?code=VW1N50nYYj56xAlct5Jbn8Isl6loYB7pCaMEvYb3dB8aPBr/NMcgGg==`;

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
    "data": { "InterConsultaId": idInter }
  };

  return $.ajax(settings).done((response) => {
    paObj_hi[idInter].a.Adjuntos_Inter = response.AdjuntoInterconsult;
  })
}

function cargarDiagnosticosInter() {
  let url = apiUrlsho+`/api/hce_Get_008_interconsulta_diagnosticoCIE10?code=mPgaeW14i/taia4aCEaauWCIBcSohTnpYgXAi9fY6mHp0OFyqV4rfQ==`;

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
    "data": { "InterConsultaId": idInter }
  };

  return $.ajax(settings).done((response) => {
    //console.clear();
     console.log("es aquiiiiiiiiiiiiiiiiiiiiiiiiiiii toño",response);
    paObj_hi[idInter].a.DiagnosticoCIE10 = response.DiagnosticoCIE;
  })
}

function cargarDatosInter() {
  let url = apiUrlsho+`/api/hce_Get_005_interconsulta?code=5apeYFqxMjc7U4gRbZFs/mBepNwlDkPcUymNTlP7kzOsv5AN3DYecg==`;

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
  };

  return $.ajax(settings).done((response) => {
    datosInter['Especialidades'] = response.IntercExpecialidad;
    datosInter['SeccionAfectada'] = response.SeccionAfectada;
    datosInter['SistemasAfectados'] = response.SistemasAfectados;
    datosInter['TipoOrigen'] = response.TipoOrigen;
    let cie10 = response.TipoCIE10.slice(0, 100);
    datosInter['TipoCIE10'] = cie10;
    // console.log('cargo datos');
  })
}


// INTERACCIONES CON BOTONES
async function interSp3VerInterconsulta(IdInter, IdHC) {
  console.log(`Inter ${IdInter}`)
  idInter = IdInter;
  showLoading();
  if (IdHC) { idHC = IdHC; }
  // console.log('################################################### OBJETO DE HISTORIA CLINICA ######################################')
  // console.log('################################################### ', paObj_hc[idHC].a,'      ######################################')

  // console.log('################################################### OBJETO DE HISTORIA CLINICA ######################################')




  // alert('es desde aqui.................REG_DESDE = '+);

  if (REG_DESDE == 0) {
    handlerUrlhtml('contentGlobal', 'view/sho-hce/interconsultas_transferencias/formularioInterconsultasVer.html', 'Registro de interconsulta');
  }

  if (REG_DESDE == 1) {
    // handlerUrlhtml('contentGlobal', 'view/sho-hce/interconsultas_transferencias/formularioInterconsultasVer.html', 'Registro de interconsulta');
    var url = "view/sho-hce/interconsultas_transferencias/formularioInterconsultasVer.html";
    $('#page-content-sidebar2').load(url);
    $('#modalAlertaIncidentePDF').modal('show').addClass('fade');
  }




  await cargarAdjuntosInter();
  await cargarDatosInter();
  await cargarDiagnosticosInter();

  paObj_hi.forEach((e) => {
    console.log(e.a);
    if (e.a.IdInter == IdInter) {
      sedeAreaGerencia.Area.forEach((i) => {
        if (i.Id == e.a.AreaId_Empresa_H) {
          $('#dat_int_area_trabajador_ver').append(`
          <option value="${i.Id}" selected>${i.Description}</option>
        `);
        }
      })

      sedeAreaGerencia.Sedes.forEach((i) => {
        if (i.Id == e.a.SedeId_Empresa_H) {
          $('#dat_int_planta_trabajador_ver').append(`
          <option value="${i.Id}" selected>${i.Description}</option>
        `);
        }
      })

      sedeAreaGerencia.Gerencia.forEach((i) => {
        if (i.Id == e.a.GerenciaId_Empresa_H) {
          $('#dat_int_gerencia_trabajador_ver').append(`
          <option value="${i.Id}" selected>${i.Description}</option>
        `);
        }
      })

      $('#dat_int_dni_trabajador_ver').val(e.a.NroDocumento_Trabajador_H);
      $('#dat_int_nombres_trabajador_ver').val(e.a.Nombres_Trabajador_H);
      $('#dat_int_apellidos_trabajador_ver').val(e.a.Apellidos_Trabajador_H);
      $('#dat_int_edad_trabajador_ver').val(e.a.Edad_Trabajador_H);
      $('#dat_int_puesto_trabajo_trabajador_ver').val(e.a.PuestoTrabajo_Empresa_H);

      $('#dat_int_empresa_interconsulta').val(e.a.A_Empresa_Inter);
      $('#dat_int_fecha_interconsulta').val(e.a.A_FechaInterconsulta.split('T')[0]);
      $('#dat_int_motivo_interconsulta').val(e.a.A_InterMotivo_Inter);
      $('#dat_int_solicita_interconsulta').val(e.a.A_SeSolicita_Inter);
      $('#dat_int_otros_interconsulta').val(e.a.A_Otros_Inter);
      $('#dat_int_medico_cargo_interconsulta').val(e.a.A_MedicoCargo_Inter);
      $('#dat_int_cmp_interconsulta').val(e.a.A_CMP_Inter);

      $('#dat_int_institucion_respuesta').val(e.a.B_InstitucionSalud_Inter);
      $('#dat_int_fecha_respuesta').val(e.a.B_FechaRespuesta_Inter.split('T')[0]);
      $('#dat_int_hallazgos_respuesta').val(e.a.B_HallazgoEval_Inter);
      $('#dat_int_examenes_respuesta').val(e.a.B_ExamenesAuxiliarers_Inter);

      $('#dat_int_recomendaciones_recomendaciones').val(e.a.C_Recomendaciones_Inter);
      $('#dat_int_fecha_proximo_recomendaciones').val(e.a.C_FechaProximoControl_Inter.split('T')[0]);
      $('#dat_int_medico_evaluador_recomendaciones').val(e.a.C_MedicoEvaluador_Inter);
      $('#dat_int_cmp_recomendaciones').val(e.a.C_CMP_Inter);
      $('#dat_int_rne_recomendaciones').val(e.a.C_RNE_Inter);
      $('#dat_int_otros_recomendaciones').val(e.a.C_Otros_Inter);
      $('#dat_int_tratamiento_diagnostico').val(e.a.Tratamiento);

      if (e.a.B_RecibioRespuesta_Inter == 1) {
        $('#dat_int_recibio_respuesta_si').attr('checked', true);
      } else {
        $('#dat_int_recibio_respuesta_no').attr('checked', true);
      }

      if (e.a.C_RequiereControles_Inter == 1) {
        $('#dat_int_controles_recomendaciones_si').attr('checked', true);
      } else {
        $('#dat_int_controles_recomendaciones_no').attr('checked', true);
      }

      if (e.a.C_ActitupParaLaboral_Inter == 1) {
        $('#dat_int_aptitud_recomendaciones_si').attr('checked', true);
      } else {
        $('#dat_int_aptitud_recomendaciones_no').attr('checked', true);
      }

      for (var i = 0; i <= 1; i++) {
        let arrayAdjunto = [];
        let cantidad = 0;
        let content = $(`#content_int_adjunto_interconsulta_${i}`);
        // console.log(e.a.Adjuntos_Inter);
        e.a.Adjuntos_Inter.forEach((e) => {
          if (e.parteFormulario == i) {
            arrayAdjunto.push(e);
          }
        })
        if (arrayAdjunto.length > 0) {
          arrayAdjunto.forEach((e) => {
            content.append(`
            <tr>
              <td>${e.NombreArchivo}</td>
              <td>${date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(e.CreadoFecha)}</td>
              <td>${e.NombreArchivo}</td>
              <td>
                <a type="button" class="btn btn-link shadow-none float-right" href="${e.ArchivoBase64}" download="${e.NombreArchivo}">
                  <img class="inject-svg" src="./images/sho/ojo.svg" alt="" fill="#01719d" width="18px">
                </a>
              </td>
            </tr>
          `)
            cantidad++;
          })
        } else {
          $(`#table_int_adjunto_interconsulta_${i}`).hide();
          $(`#table_int_adjunto_interconsulta_${i}`).parent().append(`
          <div class="alert alert-danger mt-4" role="alert" id="no_adjunto_${i}">
            No hay archivos adjuntos
            <span>
              <img class="inject-svg" src="./images/sho/advertencia.svg" alt="" width="18px">
            </span>
          </div>
        `);
        }
        $(`#dat_int_cantidad_adjunto_${i}`).text(`${cantidad} Registros`);
        SVGInject($(".inject-svg"));
      }

      datosInter.Especialidades.forEach((i) => {
        if (i.Id == e.a.A_InterEspecialidad_Inter) {
          $('#dat_int_especialidad_interconsulta').append(`
            <option value="${i.Id}" selected>${i.Descripcion}</option>
          `);
        }
      })

      e.a.DiagnosticoCIE10.forEach((i) => {
        let nombre = '';
        let especialidad = '';
        let sistema = '';
        let seccion = '';

        datosInter.TipoCIE10.forEach((j) => {
          if (j.Id == i.CIE10) {
            nombre = j.Code;
            especialidad = j.Especilidades;
          }
        })

        datosInter.SistemasAfectados.forEach((j) => {
          if (j.Id == i.SistemaAfectado) {
            sistema = j.Descripcion;
          }
        })

        datosInter.SeccionAfectada.forEach((j) => {
          if (j.Id == i.SeccionAfectada) {
            seccion = j.Descripcion;
          }
        })

        $('#content_int_diagnostico').append(`
          <tr>
            <td>${i.Diagnostico}</td>
            <td>${nombre}</td>
            <td>${date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(i.CreadoFecha)}</td>
            <td>${especialidad}</td>
            <td>${sistema}</td>
            <td>${seccion}</td>
          </tr>
          `)

        SVGInject($(".inject-svg"));
      })
    }

  })
  hideLoading();
}




























function cargarDatosPersonales() {
  let url = apiUrlsho+`/api/hce_Get_004_historia_clinica_paciente?code=wWY4/sz0URfHcAw3vKN9zqCqbtu96Y7zMka4N4wG6yhU8H173/bPzg==`;

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
    datosPerson = response.HistoriaClin[0];
    let data = response.HistoriaClin[0];
    $('#dat_int_nombres').text(data.Nombres_Trabajador_H);
    $('#dat_int_apellidos').text(data.Apellidos_Trabajador_H);
    $('#dat_int_dni_trabajador').text(data.NroDocumento_Trabajador_H);
    $('#dat_int_sexo_trabajador').text((data.NroDocumento_Trabajador_H == 0) ? 'Femenino' : 'Masculino');
    $('#dat_int_edad_trabajador').text(data.Edad_Trabajador_H);
    $('#dat_int_puesto_trabajador').text(data.PuestoTrabajo_Empresa_H);
    if (data.FotoPacienteBase64) {
      $('#img_file_perfil').attr('src', data.FotoPacienteBase64);
    } else {
      $('#img_file_perfil').attr('src', './images/sho/profile.png');
    }


    sedeAreaGerencia.Area.forEach((e) => {
      if (e.Id == data.AreaId_Empresa_H) {
        $('#dat_int_area_trabajador').text(e.Description);
      }
    })

    sedeAreaGerencia.Sedes.forEach((e) => {
      if (e.Id == data.SedeId_Empresa_H) {
        $('#dat_int_planta_trabajador').text(e.Description);
      }
    })

    sedeAreaGerencia.Gerencia.forEach((e) => {
      if (e.Id == data.GerenciaId_Empresa_H) {
        $('#dat_int_gerencia_trabajador').text(e.Description);
      }
    })
  })
}

function interSp3cargarDatosInterconsulta() {

  let url = apiUrlsho+`/api/hce_Get_005_interconsulta?code=5apeYFqxMjc7U4gRbZFs/mBepNwlDkPcUymNTlP7kzOsv5AN3DYecg==`;

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
    datosInterTotal = response;
    interSp3MostrarDatosInterconsulta();
    hideLoading();
  })
}

function interSp3MostrarDatosInterconsulta() {
  let data = datosInterTotal.Interconsult;
  let tipoOrigenArray = datosInterTotal.TipoOrigen;
  let tipoOrigen = '';
  let tipoEspecialidadArray = datosInterTotal.IntercExpecialidad;
  let tipoEspecialidad = '';
  let content = $('#content_inter_datos_table');

  if (data.length > 0) {

    data.forEach((e) => {
      tipoOrigenArray.forEach((i) => {
        if (i.Id == e.IdTipoOrigen) {
          tipoOrigen = i.Descripcion;
        }
      })
      tipoEspecialidadArray.forEach((i) => {
        if (i.Id == e.A_InterEspecialidad_Inter) {
          tipoEspecialidad = i.Descripcion;
        }
      })
      content.append(`
        <tr>
          <td>${e.A_CodeInterconsulta}</td>
          <td>${tipoOrigen}</td>
          <td>${e.CodigoOrigen}</td>
          <td>${date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(e.A_FechaInterconsulta)}</td>
          <td>${tipoEspecialidad}</td>
          <td>${(e.B_RecibioRespuesta == 1) ? 'Recibido' : 'No recibido'}</td>
          <td>${(e.C_ActitupParaLaboral) ? 'Acto' : 'No acto'}</td>
          <td>
            <div class="more-info" id="more_info_table_interconsulta_${e.Id}" onclick="mostrarMenuTableInterconsulta(${e.Id})">
              <img src="images/iconos/menu_responsive.svg" alt="" />
            </div>
          </td>
        </tr>
      `)
    })
  } else {
    content.append(`
        <tr>
          <td colspan="8">Sin datos</td>
        </tr>
      `)
  }
  $('#dat_int_cantidad').text(`${data.length} Registros`);
}

function interSp3cargarDatosTransferencia() {

  let url = apiUrlsho+`/api/hce_Get_006_transferencia?code=bdFhdqqPWPq62GBhPORONSYngrPBCDmZ6QnQdfIid4NdqCddRk7r3Q==`;

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

    datosTrans = response;

    let data = response.transferencias;
    let tipoOrigenArray = response.TipoOrigen;
    let tipoOrigen = '';
    let tipoEspecialidadArray = response.IntercExpecialidad;
    let tipoEspecialidad = '';
    let content = $('#content_trans_datos_table');

    if (data.length > 0) {
      $('#dat_int_cantidad').text(`${data.length} Registros`);

      data.forEach((e) => {
        tipoOrigenArray.forEach((i) => {
          if (i.Id == e.IdTipoOrigen) {
            tipoOrigen = i.Descripcion;
          }
        })
        tipoEspecialidadArray.forEach((i) => {
          if (i.Id == e.A_InterEspecialidad) {
            tipoEspecialidad = i.Descripcion;
          }
        })
        content.append(`
        <tr>
          <td>${e.A_CodeInterconsulta}</td>
          <td>${tipoOrigen}</td>
          <td>${e.CodigoOrigen}</td>
          <td>${date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(e.A_FechaInterconsulta)}</td>
          <td>${tipoEspecialidad}</td>
          <td>${(e.B_RecibioRespuesta == 1) ? 'Recibido' : 'No recibido'}</td>
          <td>${(e.C_ActitupParaLaboral) ? 'Acto' : 'No acto'}</td>
          <td>
            <div class="more-info" id="more_info_table_trans_${e.Id}" onclick="mostrarMenuTableTransferencia(${e.Id})">
              <img src="images/iconos/menu_responsive.svg" alt="" />
            </div>
          </td>
        </tr>
      `)
      })
    } else {
      content.append(`
        <tr>
          <td colspan="8">Sin datos</td>
        </tr>
      `)
    }
    console.log(response)
  })
}

function mostrarMenuTableInterconsulta(id) {
  let content = $('#info_content_table_interconsulta');
  content.html(`
    <div class="more-info-content">
      <ul>
        <li onclick="interSp3VerInterconsulta(${id})" id="btn_ant_oc_editar">
          <img class="inject-svg" src="./images/sho/ojo.svg" fill="#01719d" style="width:16px !important" />
          <span>Ver registro</span>
        </li>
      </ul>
    </div>
  `);
  SVGInject($(".inject-svg"));
  const position = $(`#more_info_table_interconsulta_${id}`).position();
  $(`.more-info-content`).css("left", `${position.left}px`);
  $(`.more-info-content`).css("top", `${position.top}px`);
  $(`.more-info-content`).slideToggle();
}

function mostrarMenuTableTransferencia(id) {
  let content = $('#info_content_table_trans');
  content.html(`
    <div class="more-info-content">
      <ul>
        <li onclick="hcSp3EditarAntecedentes(${id},3)" id="btn_ant_oc_editar">
          <img class="inject-svg" src="./images/sho/ojo.svg" fill="#01719d" style="width:16px !important" />
          <span>Ver registro</span>
        </li>
      </ul>
    </div>
  `);
  SVGInject($(".inject-svg"));
  const position = $(`#more_info_table_trans_${id}`).position();
  $(`.more-info-content`).css("left", `${position.left}px`);
  $(`.more-info-content`).css("top", `${position.top}px`);
  $(`.more-info-content`).slideToggle();
}

// Editar interconsulta
function mostrarAreasGerenciaSedesInt_AM() {
  sedeAreaGerencia.Area.forEach((e) => {
    let content = $('#dat_int_area_trabajador_editar');
    content.append(`
      <option value="${e.Id}">${e.Description}</option>
    `)
  })

  sedeAreaGerencia.Sedes.forEach((e) => {
    let content = $('#dat_int_planta_trabajador_editar');
    content.append(`
      <option value="${e.Id}">${e.Description}</option>
    `)
  })

  sedeAreaGerencia.Gerencia.forEach((e) => {
    let content = $('#dat_int_gerencia_trabajador_editar');
    content.append(`
      <option value="${e.Id}">${e.Description}</option>
    `)
  })

  datosInter.Especialidades.forEach((e) => {
    $('#dat_int_especialidad_interconsulta').append(`
      <option value="${e.Id}">${e.Descripcion}</option>
    `)
  })

  datosInter.TipoCIE10.forEach((e) => {
    $('#dat_int_cie_diagnostico').append(`
      <option value="${e.Id}">${e.Descripcion}</option>
    `)
  })

  datosInter.SistemasAfectados.forEach((e) => {
    $('#dat_int_sistema_diagnostico').append(`
      <option value="${e.Id}">${e.Descripcion}</option>
    `)
  })

$('#dat_int_sistema_diagnostico').val(15)


  datosInter.SeccionAfectada.forEach((e) => {
    $('#dat_int_seccion_diagnostico').append(`
      <option value="${e.Id}">${e.Descripcion}</option>
    `)
  })

  $('#dat_int_seccion_diagnostico').val(11)
}

async function interSp3CargarDatosPersona() {
  await cargarDatosInter();
  mostrarAreasGerenciaSedesInt_AM();
  let datosPerson = paObj_hc[idHC].a;
  let fecha = new Date;
  $('#dat_int_dni_trabajador_editar').val(datosPerson.NroDocumento_Trabajador_H);
  $('#dat_int_nombres_trabajador_editar').val(datosPerson.Nombres_Trabajador_H);
  $('#dat_int_apellidos_trabajador_editar').val(datosPerson.Apellidos_Trabajador_H);
  $('#dat_int_edad_trabajador_editar').val(datosPerson.Edad_Trabajador_H);
  $('#dat_int_puesto_trabajo_trabajador_editar').val(datosPerson.PuestoTrabajo_Empresa_H);
  $('#dat_int_fecha_interconsulta').val(fecha.toISOString().split('T')[0]);
  $('#dat_int_area_trabajador_editar').val(datosPerson.AreaId_Empresa_H);
  $('#dat_int_planta_trabajador_editar').val(datosPerson.SedeId_Empresa_H);
  $('#dat_int_gerencia_trabajador_editar').val(datosPerson.GerenciaId_Empresa_H);
}


async function interSp3EditarInterconsulta(IdInter, IdHC) {
  idInter = IdInter;
  idHC = IdHC;
  showLoading();

  //alert('oooooooooooooooo aqui')
  if (REG_DESDE == 0) {
    handlerUrlhtml('contentGlobal', 'view/sho-hce/interconsultas_transferencias/formularioInterconsultasEditar.html', 'Editar interconsulta');
  }

  if (REG_DESDE == 1) {
    //handlerUrlhtml('contentGlobal', 'view/sho-hce/interconsultas_transferencias/formularioInterconsultasEditar.html', 'Editar interconsulta');

    var url = "view/sho-hce/interconsultas_transferencias/formularioInterconsultasEditar.html"

    $('#page-content-sidebar2').load(url);
    $('#modalAlertaIncidentePDF').modal('show').addClass('fade');

  }

  setTimeout(() => {
    $('#btn_imprimir_interconsulta').show();
  }, 2000)

  await cargarAdjuntosInter();
  await cargarDatosInter();
  await cargarDiagnosticosInter();
  mostrarAreasGerenciaSedesInt_AM();

  paObj_hi.forEach((e) => {
    let datosPerson = e.a;
    if (datosPerson.IdInter == IdInter) {

      let fecha = new Date;
      $('#dat_int_dni_trabajador_editar').val(datosPerson.NroDocumento_Trabajador_H);
      $('#dat_int_nombres_trabajador_editar').val(datosPerson.Nombres_Trabajador_H);
      $('#dat_int_apellidos_trabajador_editar').val(datosPerson.Apellidos_Trabajador_H);
      $('#dat_int_edad_trabajador_editar').val(datosPerson.Edad_Trabajador_H);
      $('#dat_int_puesto_trabajo_trabajador_editar').val(datosPerson.PuestoTrabajo_Empresa_H);
      $('#dat_int_fecha_interconsulta').val(fecha.toISOString().split('T')[0]);
      $('#dat_int_area_trabajador_editar').val(datosPerson.AreaId_Empresa_H);
      $('#dat_int_planta_trabajador_editar').val(datosPerson.SedeId_Empresa_H);
      $('#dat_int_gerencia_trabajador_editar').val(datosPerson.GerenciaId_Empresa_H);
      $('#dat_int_especialidad_interconsulta').val(datosPerson.A_InterEspecialidad_Inter);

      $('#dat_int_empresa_interconsulta').val(datosPerson.A_Empresa_Inter);
      $('#dat_int_motivo_interconsulta').val(datosPerson.A_InterMotivo_Inter);
      $('#dat_int_solicita_interconsulta').val(datosPerson.A_SeSolicita_Inter);
      $('#dat_int_otros_interconsulta').val(datosPerson.A_Otros_Inter);
      $('#dat_int_medico_cargo_interconsulta').val(datosPerson.A_MedicoCargo_Inter);
      $('#dat_int_cmp_interconsulta').val(datosPerson.A_CMP_Inter);

      if (datosPerson.B_RecibioRespuesta_Inter == 1) {
        $('#dat_int_recibio_respuesta_si').attr('checked', true)
      }

      if (datosPerson.B_RecibioRespuesta_Inter == 0) {
        $('#dat_int_recibio_respuesta_no').attr('checked', true)
      }

      $('#dat_int_institucion_respuesta').val(datosPerson.B_InstitucionSalud_Inter);
      $('#dat_int_fecha_respuesta').val(datosPerson.B_FechaRespuesta_Inter.split('T')[0]);
      $('#dat_int_hallazgos_respuesta').val(datosPerson.B_HallazgoEval_Inter);
      $('#dat_int_examenes_respuesta').val(datosPerson.B_ExamenesAuxiliarers_Inter);

      $('#dat_int_recomendaciones_recomendaciones').val(datosPerson.C_Recomendaciones_Inter);
      $('#dat_int_recomendaciones_recomendaciones').val(datosPerson.C_Recomendaciones_Inter);

      if (datosPerson.C_RequiereControles_Inter == 1) {
        $('#dat_int_controles_recomendaciones_si').attr('checked', true)
      }

      if (datosPerson.C_RequiereControles_Inter == 0) {
        $('#dat_int_controles_recomendaciones_no').attr('checked', true)
      }

      if (datosPerson.C_ActitupParaLaboral_Inter == 1) {
        $('#dat_int_aptitud_recomendaciones_si').attr('checked', true)
      }

      if (datosPerson.C_ActitupParaLaboral_Inter == 0) {
        $('#dat_int_aptitud_recomendaciones_no').attr('checked', true)
      }

      $('#dat_int_fecha_proximo_recomendaciones').val(datosPerson.C_FechaProximoControl_Inter.split('T')[0]);
      $('#dat_int_medico_evaluador_recomendaciones').val(datosPerson.C_MedicoEvaluador_Inter);
      $('#dat_int_cmp_recomendaciones').val(datosPerson.C_CMP_Inter);
      $('#dat_int_rne_recomendaciones').val(datosPerson.C_RNE_Inter);
      $('#dat_int_otros_recomendaciones').val(datosPerson.C_Otros_Inter);
      $('#dat_int_tratamiento_diagnostico').val(datosPerson.Tratamiento);

      interSp3CargarDiagnosticoEditarInterconsulta(datosPerson);
      interSp3CargarAdjuntoInterconsulta(datosPerson, 0);
      interSp3CargarAdjuntoInterconsulta(datosPerson, 1);

    }
  })
  hideLoading();
}

function interSp3CargarDiagnosticoEditarInterconsulta(datosPerson) {
  $('#content_int_diagnostico').html('');
  //alert('esaquiiiiiiiiiiiiiii 3177 interc ttransfs');
  console.log('que tiene el objeto', datosPerson.DiagnosticoCIE10);
   var cantidad = 0;
  datosPerson.DiagnosticoCIE10.forEach((i) => {
   
    let tipoCie = '';
    let especialidad = '';
    let sistema = '';
    let seccion = '';




         //nombre = j.Descripcion;
         especialidad = i.Especilidades;
         tipoCie = i.Code;
         sistema = i.SistemaAfectado_D;
         seccion = i.SeccionAfectada_D;
    // datosInter.TipoCIE10.forEach((j) => {
    //   if (j.Id == i.CIE10) {
    //     nombre = j.Descripcion;
    //     especialidad = j.Especilidades;
    //     tipoCie = nombre;
    //   }
    // })

    // datosInter.SistemasAfectados.forEach((j) => {
    //   if (j.Id == i.SistemaAfectado) {
    //     sistema = j.Descripcion;
    //   }
    // })

    // datosInter.SeccionAfectada.forEach((j) => {
    //   if (j.Id == i.SeccionAfectada) {
    //     seccion = j.Descripcion;
    //   }
    // })



    $('#select2-dat_int_cie_diagnostico-container').html('');//revisar pendiente

    $('#content_int_diagnostico').append(`
      <tr>
        <td>${i.Diagnostico}</td>
        <td>${tipoCie}</td>
        <td>${date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(i.CreadoFecha)}</td>
        <td>${especialidad}</td>
        <td>${sistema}</td>
        <td>${seccion}</td>
        <td>
          <button type="button" class="btn btn-link shadow-none float-right" id="spin_borrar_diagnostico_${i.Id}" style="display:none">
            <div class="spinner-border text-danger spinner-border-sm" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </button> 
          <button type="button" class="btn btn-link shadow-none float-right" id="btn_borrar_diagnostico_${i.Id}" onclick="interSp3EliminarDiagnosticoEditarInterconsulta(${idInter}, ${i.Id})">
            <img class="inject-svg" src="./images/sho/delete.svg" alt="" fill="#ff3636" width="16px">
          </button>
        </td>
      </tr>
    `)
    SVGInject($(".inject-svg"));
    cantidad++;

    $('#dat_int_cantidad_diagnostico').text(`${cantidad} Registros`);
  })
}

function interSp3GuardarDiagnosticoEditarInterconsulta() {
  // valido los datos del formulario de diagnostico
  if (interSp3ValidarDatos('input_int_sp3_diagnostico').length > 0) {
    return;
  }

  let data = {};
  data.InterConsultaId = idInter;
  data.Diagnostico = $('#dat_int_diagnostico_diagnostico').val();
  data.CIE10 = $('#dat_am_cie_diagnostico1').val();
  data.SistemaAfectado = $('#dat_int_sistema_diagnostico').val();
  data.SeccionAfectada = $('#dat_int_seccion_diagnostico').val();
  data.IdHashUser = getCookie("vtas_id_hash" + sessionStorage.tabVisitasa);

  let url = apiUrlsho+`/api/hce_Post_011_interconsulta_diagnosticoCIE10?code=4M5YhOGG5A32YYKUNhMfbDdeXxHTOSYe8gcXlxZWTbEl6w/j0iIcdg==&httpmethod=post`;

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

  $.ajax(settings).done(async (response) => {
    $('#int_spin_diagnostico').show();
    $('#dat_int_diagnostico_diagnostico').val('');
    $('#dat_int_cie_diagnostico').val('');
    $('#dat_int_sistema_diagnostico').val(15);
    $('#dat_int_seccion_diagnostico').val(11);
    await cargarDiagnosticosInter()
    interSp3CargarDiagnosticoEditarInterconsulta(paObj_hi[idInter].a);
    $('#int_spin_diagnostico').hide();
    // console.log(response);
    hideLoading();
  })
}

function interSp3EliminarDiagnosticoEditarInterconsulta(IdInter, IdDiag) {
  // console.log(IdDiag)
  $(`#spin_borrar_diagnostico_${IdDiag}`).show();
  $(`#btn_borrar_diagnostico_${IdDiag}`).hide();

  let data = {};

  data.InterConsultaId = IdInter;
  data.IdDiagnosticoCIE10 = IdDiag;

  let url = apiUrlsho+`/api/hce_Post_012_interconsulta_diagnosticoCIE10_eliminadoLogico?code=m6BeAJk6OcXQwOagBE4uP9SjITlOWRkWIykHYMCCkHhQmu2BprkrCA==&httpmethod=post`;

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

  $.ajax(settings).done(async (response) => {
    await cargarDiagnosticosInter()
    interSp3CargarDiagnosticoEditarInterconsulta(paObj_hi[idInter].a);
    // console.log(response);
    hideLoading();
  })
}

// CARGAR DATOS A LA VISTA
function interSp3CargarAdjuntoInterconsulta(datosPerson, id) {
  showLoading();
  // console.log(datosPerson);
  let content = $(`#content_int_adjunto_interconsulta_${id}`);
  content.html(' ');

  $(`#table_int_adjunto_interconsulta_${id}`).show();
  $(`#no_adjunto_${id}`).remove();

  let cantidad = 0;
  let arrayAdjunto = [];
  datosPerson.Adjuntos_Inter.forEach((e) => {
    if (e.parteFormulario == id) {
      arrayAdjunto.push(e);
    }
  })

  if (arrayAdjunto.length > 0) {
    arrayAdjunto.forEach((e) => {
      content.append(`
        <tr>
          <td>${e.NombreArchivo}</td>
          <td>${date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(e.CreadoFecha)}</td>
          <td>
            <button type="button" class="btn btn-link shadow-none float-right" id="spin_borrar_adjunto_${e.Id}_${id}" style="display:none">
              <div class="spinner-border text-danger spinner-border-sm" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </button>
            <button type="button" class="btn btn-link shadow-none float-right" id="btn_borrar_adjunto_${e.Id}_${id}" onclick="interSp3EliminarAdjuntoInterconsulta(${e.Id}, ${id})">
              <img class="inject-svg" src="./images/sho/delete.svg" alt="" fill="#ff3636" width="16px">
            </button>
            <a href="${e.ArchivoBase64}" download="${e.NombreArchivo}" class="btn btn-link shadow-none float-right">
              <img class="inject-svg" src="./images/sho/download.svg" alt="" fill="#8fbb02" width="16px">
            </a>
          </td>
        </tr>
        `)
      cantidad++;
    })
  } else {
    $(`#table_int_adjunto_interconsulta_${id}`).hide();
    $(`#table_int_adjunto_interconsulta_${id}`).parent().append(`
      <div class="alert alert-danger mt-4" role="alert" id="no_adjunto_${id}">
        No hay archivos adjuntos
        <span>
          <img class="inject-svg" src="./images/sho/advertencia.svg" alt="" width="18px">
        </span>
      </div>
    `);
  }
  $(`#dat_int_cantidad_adjunto_${id}`).text(`${cantidad} Registros`);
  SVGInject($(".inject-svg"));
}

function interSp3GuardarAdjuntoInterconsulta(element, id) {
  $(`#int_spin_guardar_adjunto_${id}`).show();
  let file = element.files[0];
  let reader = new FileReader();
  reader.onloadend = function () {
    let data = {};
    data.InterConsultaId = idInter;
    data.IdInterAdj = 0;
    data.NombreArchivo = element.files[0].name;
    data.IdHashUser = "IdHashUser";
    data.parteFormulario = id;
    data.ArchivoBase64 = reader.result;

    let url = apiUrlsho+`/api/hce_Post_009_interconsulta_adjunto?code=I1RvPusNaaBW/akZHO3zwxK/b9HeMZD7aF6V7WtIZtLzYyU/xawnYQ==&httpmethod=post`;

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

    $.ajax(settings).done(async (response) => {
      console.log(response);
      await cargarAdjuntosInter();
      interSp3CargarAdjuntoInterconsulta(paObj_hi[idInter].a, id);
      $(`#int_spin_guardar_adjunto_${id}`).hide();
    })
  }
  reader.readAsDataURL(file);
}

function interSp3EliminarAdjuntoInterconsulta(element, id) {
  $(`#spin_borrar_adjunto_${element}_${id}`).show();
  $(`#btn_borrar_adjunto_${element}_${id}`).hide();
  let data = {};
  data.InterConsultaId = idInter;
  data.IdInterAdj = element;
  data.IdHashUser = "IdHashUser";


  let url = apiUrlsho+`/api/hce_Post_010_interconsulta_adjunto_eliminadoLogico?code=sZZFKjjXSHZfvFqLy0rgxaLdJ0FPvYxB2m90UVDw69CZcdtdZ5sm2Q==&httpmethod=post`;

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

  $.ajax(settings).done(async (response) => {
    showLoading();
    await cargarAdjuntosInter();
    interSp3CargarAdjuntoInterconsulta(paObj_hi[idInter].a, id);
  })
}

function interSp3GuardarInterconsulta(id) {
  let data = {};
  let interNew = 0;

  if (id) {
    data.IdInter = id;
  } else {
    data.IdInter = 0;
    interNew = 1;
  }

  data.IdHC = idHC;
  data.A_Empresa = ($('#dat_int_empresa_interconsulta').val()) ? $('#dat_int_empresa_interconsulta').val() : 'vacio';
  data.A_InterEspecialidad = ($('#dat_int_especialidad_interconsulta').val()) ? $('#dat_int_especialidad_interconsulta').val() : 0;
  data.A_InterMotivo = ($('#dat_int_motivo_interconsulta').val()) ? $('#dat_int_motivo_interconsulta').val() : 'vacio';
  data.A_SeSolicita = ($('#dat_int_solicita_interconsulta').val()) ? $('#dat_int_solicita_interconsulta').val() : 'vacio';
  data.A_Otros = ($('#dat_int_otros_interconsulta').val()) ? $('#dat_int_otros_interconsulta').val() : 'vacio';
  data.A_MedicoCargo = ($('#dat_int_medico_cargo_interconsulta').val()) ? $('#dat_int_medico_cargo_interconsulta').val() : 'vacio';
  data.A_CMP = ($('#dat_int_cmp_interconsulta').val()) ? $('#dat_int_cmp_interconsulta').val() : 'vacio';
  data.A_IdHashMedico = 'A_IdHashMedico';

  data.B_RecibioRespuesta = ($('input:radio[name=recibio_respuesta_int]:checked').val()) ? $('input:radio[name=recibio_respuesta_int]:checked').val() : 0;
  data.B_InstitucionSalud = ($('#dat_int_institucion_respuesta').val()) ? $('#dat_int_institucion_respuesta').val() : 'vacio';
  data.B_FechaRespuesta = ($('#dat_int_fecha_respuesta').val()) ? $('#dat_int_fecha_respuesta').val() : '2000-01-01';
  data.B_HallazgoEval = ($('#dat_int_hallazgos_respuesta').val()) ? $('#dat_int_hallazgos_respuesta').val() : 'vacio';
  data.B_ExamenesAuxiliarers = ($('#dat_int_examenes_respuesta').val()) ? $('#dat_int_examenes_respuesta').val() : 'vacio';

  data.C_Recomendaciones = ($('#dat_int_recomendaciones_recomendaciones').val()) ? $('#dat_int_recomendaciones_recomendaciones').val() : 'vacio';
  data.C_RequiereControles = ($('input:radio[name=posteriores_int]:checked').val()) ? $('input:radio[name=posteriores_int]:checked').val() : 0;
  data.C_ActitupParaLaboral = ($('input:radio[name=aptitud_int]:checked').val()) ? $('input:radio[name=aptitud_int]:checked').val() : 0;
  data.C_FechaProximoControl = ($('#dat_int_fecha_proximo_recomendaciones').val()) ? $('#dat_int_fecha_proximo_recomendaciones').val() : '2000-01-01';
  data.C_MedicoEvaluador = ($('#dat_int_medico_evaluador_recomendaciones').val()) ? $('#dat_int_medico_evaluador_recomendaciones').val() : 'vacio';
  data.C_IdHashMedico = 'IdHashMedico';
  data.C_CMP = ($('#dat_int_cmp_recomendaciones').val()) ? $('#dat_int_cmp_recomendaciones').val() : 'vacio';
  data.C_RNE = ($('#dat_int_rne_recomendaciones').val()) ? $('#dat_int_rne_recomendaciones').val() : 'vacio';
  data.C_Otros = ($('#dat_int_otros_recomendaciones').val()) ? $('#dat_int_otros_recomendaciones').val() : 'vacio';

  data.Tratamiento = ($('#dat_int_tratamiento_diagnostico').val()) ? $('#dat_int_tratamiento_diagnostico').val() : 'vacio';
  data.CodigoOrigen = '0000-IC-' + idHC;
  data.IdOrigen = ID_ORIGEN;
  data.IdTipoOrigen = ID_TIPO_ORIGEN;


  let url = apiUrlsho+`/api/hce_Post_008_interconsulta?code=p6WGKSBcccNRnMdgJ5xr5uWwAn/FAYyhahe4DRpyNTTZevUnTfPL0w==&httpmethod=post`;

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
    console.log("Eaqui la interconsulta", response);
    if (idInter != 0) {
      Swal.fire({
        title: "Se terminó con éxito el registro",
        iconColor: "#8fbb02",
        iconHtml: '<img src="./images/sho/check.svg" width="28px">',
        showConfirmButton: false,
        padding: "3em 3em 6em 3em ",
        timer: 1500,
      }).then(() => {

        if (REG_DESDE == 0) {
          handlerUrlhtml('contentGlobal', 'view/sho-hce/interconsultas_transferencias/gestionInterconsultasTransferencia.html', 'Registro de interconsultas y transferencias');
        }
        if (REG_DESDE == 1) {
          $('#modalAlertaIncidentePDF').modal('hide').removeClass('fade');
          fnSp3CargaFiltroEstadoInicialSaludOcupacional_inc_HC2();
        }
      });
    }
    idInter = response.Id;
    if (interNew == 1) {
      paObj_hi[idInter] = new Interconsulta();
    }
  })
}

function intSp3ConfirmGuardarInterConsulta() {



  if (interSp3ValidarDatos('input_int_sp3').length > 0) {
    return
  }


  let nombres = $("#dat_int_nombres_trabajador_editar").val();
  let apellidos = $("#dat_int_apellidos_trabajador_editar").val();
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
    if (result.isConfirmed) {
      interSp3GuardarInterconsulta(idInter);
    }
  });
}

function intSp3CancelarInterConsulta() {
  if (REG_DESDE == 0) {
    handlerUrlhtml('contentGlobal', 'view/sho-hce/interconsultas_transferencias/gestionInterconsultasTransferencia.html', 'Registro de interconsultas y transferencias');
  }
  if (REG_DESDE == 1) {
    $('#modalAlertaIncidentePDF').modal('hide').removeClass('fade');
    fnSp3CargaFiltroEstadoInicialSaludOcupacional_inc_HC2();
  }
}


function dgSp3AdjuntarImagen(img) {
  $('#hc_spin_adjuntar_imagen').show();
  let data = {}

  data.IdHC = idHC;
  data.NombreFoto = `foto_${idHC}_hc`;
  data.FotoPacienteBase64 = img;

  let url = apiUrlsho+`/api/hce_Post_005_historia_clinica_adjuntar_foto?code=s3R5opJMsUPopiAD1YCFEPahBYF0CV3vYou6A5Xz6yqkspClne5jAw==&httpmethod=post`;

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

function interSp3ImprimirInterconsulta() {
  if (interSp3ValidarDatos('input_int_sp3').length > 0) {
    return;
  }

  let data_hc = paObj_hc[idHC].a;
  let data_inter = paObj_hi[idInter].a;
  // debugger
  let empresa = $('#dat_int_empresa_interconsulta').val().toString();
  let fecha = moment($('#dat_int_fecha_interconsulta').val()).format("DD/MM/YYYY");
  let area_trabajo = data_inter.PuestoTrabajo_Empresa_H.toString();
  let nombres = data_hc.Nombres_Trabajador_H.toString();
  let apellidos = data_hc.Apellidos_Trabajador_H.toString();
  let dni = data_hc.NroDocumento_Trabajador_H.toString();
  let sexo = (data_hc.Sexo_Trabajador_H == 1) ? 'Masculino' : 'Femenino';
  let edad = data_hc.Edad_Trabajador_H.toString();

  let especialidad = ' ';
  datosInter.Especialidades.forEach((e) => {
    if (e.Id == $('#dat_int_especialidad_interconsulta').val()) {
      especialidad = e.Descripcion.toString();
    }
  })
  console.log(especialidad)

  let motivo = $('#dat_int_motivo_interconsulta').val();
  let solicita = $('#dat_int_solicita_interconsulta').val();
  let otros_a = $('#dat_int_otros_interconsulta').val();
  let medico = $('#dat_int_medico_cargo_interconsulta').val();
  let cmp_a = $('#dat_int_cmp_interconsulta').val();

  let institucion = $('#dat_int_institucion_respuesta').val();

  let fecha_interconsulta = moment($('#dat_int_fecha_respuesta').val());
  let dia_a = moment(fecha_interconsulta).format("DD");
  let mes_a = moment(fecha_interconsulta).format("MM");
  let ano_a = moment(fecha_interconsulta).format("YYYY");

  let hallazgo = $('#dat_int_hallazgos_respuesta').val();
  let examenes = $('#dat_int_examenes_respuesta').val();

  let Diagnosticos = (data_inter.DiagnosticoCIE10) ? data_inter.DiagnosticoCIE10 : [];
  console.log(Diagnosticos);

  let tratamiento = $('#dat_int_tratamiento_diagnostico').val();
  let recomendaciones = $('#dat_int_recomendaciones_recomendaciones').val();

  let fecha_proximo = $('#dat_int_fecha_proximo_recomendaciones').val();
  let dia_b = moment(fecha_proximo).format("DD");
  let mes_b = moment(fecha_proximo).format("MM");
  let ano_b = moment(fecha_proximo).format("YYYY");

  let cmp_b = $('#dat_int_cmp_recomendaciones').val();
  let rne_b = $('#dat_int_rne_recomendaciones').val();
  let otros_b = $('#dat_int_otros_recomendaciones').val();

  let controles_posteriores = $('input:radio[name=posteriores_int]:checked').val();
  let aptitud_labor = $('input:radio[name=aptitud_int]:checked').val();

  let doc = new jsPDF();
  doc.setFontSize(14);
  //ttitulo 1
  doc.text("FORMATO DE INTERCONSULTA", 105, 24, "center");
  doc.setLineWidth(0.1);

  //primer cuadro
  doc.rect(12, 26, 185, 25);
  doc.setFontSize(9);
  //empresa
  doc.text("Empresa:", 15, 31);
  doc.text(empresa, 36, 31);
  doc.rect(34, 27, 90, 5);

  //fecha
  doc.text("Fecha:", 130, 31);
  doc.text(fecha, 147, 31);
  doc.rect(145, 27, 51, 5);

  //area
  doc.text("Área de trabajo donde postula:", 15, 37);
  doc.text(area_trabajo, 67, 37);
  doc.rect(65, 33, 131, 5);

  doc.text("Apellidos y Nombres:", 15, 43);
  doc.text(`${nombres} ${apellidos}`, 52, 43);
  doc.rect(50, 39, 146, 5);

  doc.text("DNI/CE:", 15, 49);
  doc.text(dni, 32, 49);
  doc.rect(30, 45, 40, 5);

  doc.text("Sexo:", 85, 49);
  doc.text(sexo, 97, 49);
  doc.rect(95, 45, 40, 5);

  doc.text("Edad:", 155, 49);
  doc.text(edad, 168, 49);
  doc.rect(166, 45, 30, 5);

  //segundo cuadro
  doc.rect(12, 53, 185, 41);

  doc.text("Interconsulta a la especialidad de:", 15, 58);
  doc.text(especialidad, 77, 58);
  doc.rect(75, 54, 121, 5);

  doc.text("Motivo de Interconsulta:", 15, 68);
  doc.text(motivo, 77, 64);
  doc.rect(75, 60, 121, 15);

  doc.text("Se solicita:", 15, 80);
  doc.text(solicita, 77, 80);
  doc.rect(75, 76, 121, 5);

  doc.text("Otros:", 15, 86);
  doc.text(otros_a, 77, 86);
  doc.rect(75, 82, 121, 5);

  doc.text("Médico:", 15, 92);
  doc.text(medico, 77, 92);
  doc.rect(75, 88, 60, 5);

  doc.text("C.M.P.:", 145, 92);
  doc.text(cmp_a, 162, 92);
  doc.rect(160, 88, 36, 5);

  //tercer cuadro
  doc.rect(12, 96, 185, 18);
  doc.text("Firma y sello del Médico", 45, 112);

  doc.line(115, 96, 115, 114);
  doc.text("Firma del Paciente", 140, 112);

  doc.setFontSize(12);
  doc.text("RESPUESTA A INTERCONSULTA", 105, 119, "center");

  doc.setFontSize(9);
  doc.text("Institución de Salud:", 15, 125);
  doc.text(institucion, 55, 125);
  doc.rect(53, 121, 87, 5);

  doc.text("Fecha: ", 142, 125);

  doc.text(dia_a, 156, 125);
  doc.line(153, 126, 163, 126);
  doc.line(164, 126, 166, 121);

  doc.text(mes_a, 172, 125);
  doc.line(169, 126, 179, 126);
  doc.line(180, 126, 182, 121);

  doc.text(ano_a, 186, 125);
  doc.line(185, 126, 195, 126);

  doc.text("Hallazgos de Evaluación:", 15, 131);
  doc.text(hallazgo, 55, 131);
  doc.rect(53, 127, 144, 5);

  doc.text("Examenes Auxiliares:", 15, 137);
  doc.text(examenes, 55, 137);
  doc.rect(53, 133, 144, 5);

  doc.text("DIAGNÓSTICO:", 60, 143);

  let espacio_diagnostico = 149;
  Diagnosticos.forEach((e) => {
    doc.text(e.Diagnostico.toString(), 15, espacio_diagnostico);
    datosInter.TipoCIE10.forEach((i) => {
      if (i.Id == e.CIE10) {
        doc.text(i.Descripcion.toString(), 142, espacio_diagnostico);
      }
    })
    espacio_diagnostico = espacio_diagnostico + 5;
  });

  doc.text("CIE10:", 165, 143);
  //cuadro
  doc.rect(12, 139, 185, 92);

  doc.line(12, 145, 197, 145);
  doc.line(12, 150, 197, 150);
  doc.line(12, 155, 197, 155);
  doc.line(12, 160, 197, 160);
  doc.line(12, 165, 197, 165);
  doc.line(12, 170, 197, 170);
  doc.line(140, 139, 140, 170);

  doc.text("TRATAMIENTO", 105, 174, "center");
  doc.text(tratamiento, 15, 179);
  doc.line(12, 175, 197, 175);
  doc.line(12, 194, 197, 194);

  doc.text("RECOMENDACIONES", 105, 198, "center");
  doc.text(recomendaciones, 15, 203);
  // doc.text("Recomendaciones", 15, 208);
  doc.line(12, 199, 197, 199);
  doc.line(12, 204, 197, 204);
  doc.line(12, 209, 197, 209);
  doc.line(12, 214, 197, 214);
  doc.line(12, 219, 197, 219);

  doc.text("¿Requiere de controles posteriores?", 15, 223);

  if (controles_posteriores == 1) {
    doc.text("X", 75, 223);
  } else {
    doc.text("X", 90, 223);
  }

  doc.line(12, 225, 197, 225);
  doc.text("SI", 70, 223);
  doc.rect(74, 220, 5, 4);

  doc.text("NO", 83, 223);
  doc.rect(89, 220, 5, 4);

  doc.text("Fecha para Proximo Control: ", 111, 223);
  doc.text(dia_b, 156, 223);
  doc.line(153, 224, 163, 224);
  doc.line(164, 224, 166, 220);

  doc.text(mes_b, 172, 223);
  doc.line(169, 224, 179, 224);
  doc.line(180, 224, 182, 220);

  doc.text(ano_b, 186, 223);
  doc.line(185, 224, 195, 224);

  doc.text("Aptitud para laborar en Ocupación y Aptitud indicada (Sólo para Médicos)", 15, 229);

  if (aptitud_labor == 1) {
    doc.text("X", 146, 229);
  } else {
    doc.text("X", 167, 229);
  }

  doc.text("SI", 140, 229);
  doc.rect(145, 226, 5, 4);

  doc.text("NO", 160, 229);
  doc.rect(166, 226, 5, 4);

  doc.rect(12, 233, 185, 22);

  doc.line(12, 238, 197, 238);
  doc.line(63, 238, 63, 255);
  doc.line(116, 233, 116, 255);

  doc.line(143, 233, 143, 255);

  doc.line(170, 233, 170, 255);

  doc.text("MÉDICO / EVALUADOR", 50, 237);
  doc.text("C.M.P", 124, 237);
  doc.text(cmp_b, 118, 246);

  doc.text("R.N.E", 152, 237);
  doc.text(rne_b, 146, 246);

  doc.text("OTROS", 178, 237);
  doc.text(otros_b, 172, 246);


  doc.text("Estimado colega", 15, 242);
  doc.text("solicitamos registre", 15, 247);
  doc.text("su C.M.P y R.N.E", 15, 252);
  doc.text("Firma y sello del Médico", 72, 253);

  doc.setFontSize(7);
  doc.text("*A nuestros clientes, verificar el llenado completo de esta ficha para su validez", 15, 259);
  doc.save(`interconsulta_${nombres}_${apellidos}_${moment().format("DD_MM_YYY")}.pdf`);
}

function interSp3ValidarDatos(idClass) {
  let error = [];
  let inputs = $(`.${idClass}`);

  inputs.each((e) => {
    if (!inputs.eq(e).val()) {
      inputs.eq(e).addClass('is-invalid');
      error.push(inputs.eq(e).val())
    }
    if (inputs.eq(e).val()) {
      inputs.eq(e).removeClass('is-invalid');
    }
  })

  if (error.length > 0) {
    inputs.focus();
  }
  // console.log(error);
  return error;
}

//******************************************************************************************************************************************























function _init_fnSp3SaludOcupacionalEstadoInicial_inter_HC() { //------------------------------------- ini   _init_fnSp3SaludOcupacionalEstadoInicial() -------------------------------------
  //console.clear();
  //showLoading();
  console.log("Arrancamos interconsultas y transferencias............................ _init_fnSp3SaludOcupacionalEstadoInicial");
  // $('#regresar').css('visibility', 'visible');
  // $('#regresar').css('display', 'block');

  // $('#regresar').show();
  fnSp3verLista('int');

  var hoy = new Date();
  var mes = hoy.getMonth() + 1;
  if (mes < 10) { mes = '0' + mes; }
  var f1 = hoy.getFullYear() + '-' + mes + '-' + hoy.getDate();


  document.getElementById("dat_hc_it_a_fe_desde").value = '2021-01-01';//f1; //"2014-02-09";
  document.getElementById("dat_hc_it_a_fe_hasta").value = '2021-12-31'; //f1; //"2014-02-09";






  //alert('arrancamos desde historia clinica...............xxxxxxxxxxxxxxxxxx.....');



  fnSp3CargaFiltroEstadoInicialSaludOcupacional_inc_HC();

  fnSp3CargaFiltroEstadoInicialSaludOcupacional_trans_HC();
  //cargarAreasSedesGerencia();

} //------------------------------------- fini   _init_fnSp3SaludOcupacionalEstadoInicial() -------------------------------------




function fnSp3CargaFiltroEstadoInicialSaludOcupacional_trans_HC() { //------------------------------------- ini   fnSp3CargaFiltroEstadoInicialSaludOcupacional_trans() -------------------------------------
  showLoading();

  //var body = { "AreaId_Empresa_H": 0, "SedeId_Empresa_H": 0 }

  //var url = apiUrlsho+"/api/Get-Incidente-AccidenteWeb?code=GY7/yooa3Zl5sKu7zgakDbaCn4uvOKXjfwe/JkbSuIwDPOs/baiZFQ==&httpmethod=objectlist&IdTipoEvento="+programa+"&IdEmpresa="+gerencia+"&IdSede="+sedepa+"&FechaInicio="+f1+"&FechaFin="+f2+"&IdEmbarcacion="+estadopa
  //var url = apiUrlsho+"/api/hce_Get_009_interconsulta_busqueda?code=mlLAeNuPAvTC057apNoiFLG/H/j36XcKY8vYElXN1st3CaLy2eeQ1A==&Gerencia=0&Planta=0&Area=0&Documento=0&Nombres&Apellidos&CodeInterconsultaTraferencia&FechaDesde&FechaHasta&Buscar";


  var a = 0;
  var b = 0;
  var c = 0;
  var d = '';
  var e = '';
  var f = '';
  var g = '';
  var h = '';
  var i = '';
  var j = '';

  var url = apiUrlsho + "/api/hce_Get_010_transferencia_busqueda?code=Ma57zVWN/hVKiVbpbiaBFuwa3iEiVrtFLv6X0qATPa1taStnyUvlPw==&Gerencia=" + a + "&Planta=" + b + "&Area=" + c + "&Documento=" + d + "&Nombres=" + e + "&Apellidos=" + f + "&CodeInterconsultaTraferencia=" + g + "&FechaDesde=" + h + "&FechaHasta=" + i + "&Buscar=" + j;

  console.log("248 URL", url);
  var headers = { "apiKey": constantes.apiKey, "Content-Type": "application/json" }
  //alert('api = '+constantes.apiKey);

  // var a = 0; // $('#dat_hc_it_a_gerencia').val(0);
  // var b = 0; //$('#dat_hc_it_a_planta_sede').val(0);
  // var c = 0; //$('#dat_hc_it_a_area').val(0);
  // var d = 0; //$('#dat_hc_it_a_doc').val(0);
  // var e = $('#dat_hc_it_a_nombre').val();
  // var f = $('#dat_hc_it_a_apellido').val();
  // var g = $('#dat_hc_it_a_cod_interc').val();
  // var h = $('#dat_hc_it_a_fe_desde').val();
  // var i = $('#dat_hc_it_a_fe_hasta').val();
  // var j = $('#dat_hc_it_a_busca').val();


  //"+a+"

  //var url = apiUrlsho+"/api/hce_Get_009_interconsulta_busqueda?code=mlLAeNuPAvTC057apNoiFLG/H/j36XcKY8vYElXN1st3CaLy2eeQ1A==&Gerencia= "+a+"&Planta="+b+"&Area="+c+"&Documento= "+d+"&Nombres=&Apellidos&CodeInterconsultaTraferencia&FechaDesde&FechaHasta&Buscar";

  //var url = apiUrlsho+"/api/hce_Get_010_transferencia_busqueda?code=Ma57zVWN/hVKiVbpbiaBFuwa3iEiVrtFLv6X0qATPa1taStnyUvlPw==&Gerencia= "+a+"&Planta="+b+"&Area="+c+"&Documento= "+d+"&Nombres&Apellidos&CodeInterconsultaTraferencia&FechaDesde&FechaHasta&Buscar"

  var url = apiUrlsho + "/api/hce_Get_010_transferencia_busqueda?code=Ma57zVWN/hVKiVbpbiaBFuwa3iEiVrtFLv6X0qATPa1taStnyUvlPw==&Gerencia=0&Planta=0&Area=0&Documento=0&Nombres&Apellidos&CodeInterconsultaTraferencia&FechaDesde&FechaHasta&Buscar";

  var settings = {
    "url": url,
    "method": "GET",
    "timeout": 0,
    "crossDomain": true,
    "dataType": "json",
    "headers": headers,
    // "data": { "NroDocumento_Trabajador_H": a, "AreaId_Empresa_H": c, "SedeId_Empresa_H": b, "Buscador": d } //JSON.stringify(body)
  };



  $.ajax(settings).done(function (response) {
    console.log("**todos trasnferencia 574**", response);



    if (response.DiagnosticoCIE10.length > 0) { //---------------------------------------------------------------

      response.DiagnosticoCIE10.map(function (itemx) {
        //D_IT[itemx.InterconsultaId] = D_IT[itemx.InterconsultaId].itemx.Descripcion_TipCie10;

        D_IT2[itemx.TransferenciaId] = itemx;

        // console.log("diagnostico", itemx.Descripcion_TipCie10);

        // if(itemx.Descripcion_TipCie10 == 'null' || itemx.Descripcion_TipCie10 == null || itemx.Descripcion_TipCie10 == '')
        // {  D_IT2[itemx.TransferenciaId2] = '-----';}
        // else
        // { D_IT2[itemx.TransferenciaId2] = itemx.Descripcion_TipCie10}

      });
      console.log("596 D_IT[]", D_IT2);


    } //---------------------------------------------------------------


    response.SignosVitales.map(function (itemx) {

      D_IT3[itemx.TransferenciaId] = itemx;


    });
    console.log("302 D_IT3[]", D_IT3);


    
     var obj = [];
     var ik = 0;

     response.transferencias.map(function (itemx) {

       
            if (itemx.IdHC == idHC) 
            {
                obj[ik] = itemx;
                ik++;
            }


    });


















    if (response.transferencias.length > 0) {


      $('#bodyTablaSinAuditorias_trans').css('display', 'none');

      $('#pagination-container-EvalAud_trans').pagination({

        dataSource: obj,
        pageSize: 4,
        callback: function (data, pagination) {
          var html = fnSp3ListarTablaGeneralH_trans_HC(data);
          $('#body-tabla-list-EvalAud_trans').html(html);
          $('#cant_transf').html(`${data.length} Registros`);

          //---------aqui se reinician los valores del buscador 
          $('#dat_hc_it_a_gerencia').val(0);
          $('#dat_hc_it_a_planta_sede').val(0);
          $('#dat_hc_it_a_area').val(0);
          //---------aqui se reinician los valores del buscador 
        }
      })



    } else {

      hideLoading();
    }



  });




} //------------------------------------- fin   fnSp3CargaFiltroEstadoInicialSaludOcupacional_trans() -------------------------------------


function fnSp3ListarTablaGeneralH_trans_HC(data) { //------------------------------------------------------- ini   fnSp3ListarTablaGeneralH_trans() -----------------------------------

  var html = '';
  var btNew = '';
  var width = 2450; //
  var width1 = 2430; //
  var width1 = 2420; //

  //alert('aqiooooooooooooooooooo 315');
  data.forEach((Item) => {

    paObj_ht[Item.Id] = new Transferencia();
    paObj_ht[Item.Id].cargarData(Item);


    var i = paObj_ht[Item.Id].a.DiagnosticoCIE10.length;
    paObj_ht[Item.Id].a.DiagnosticoCIE10 = D_IT2[Item.Id];
    paObj_ht[Item.Id].a.SignosVitales = D_IT3[Item.Id];


    console.log("####################################################", Item.Id, "###################################################################")

    console.log("paObj_ht[Item.Id].a.DiagnosticoCIE10 = ", paObj_ht[Item.Id].a.DiagnosticoCIE10);
    console.log("paObj_ht[Item.Id].a.SignosVitales = ", paObj_ht[Item.Id].a.SignosVitales);

    console.log("####################################################", Item.Id, "#######################################################################")

    if (paObj_ht[Item.Id].a.DiagnosticoCIE10) {
      var Diagnostico = paObj_ht[Item.Id].a.DiagnosticoCIE10.Descripcion_TipCie10;
    } else { var Diagnostico = '-----' }



    $('#dat_hc_it_a_gerencia').val(Item.GerenciaId_Empresa_H)
    var GerenciaId_Empresa_H = $('#dat_hc_it_a_gerencia option:selected').text();


    $('#dat_hc_it_a_area').val(Item.AreaId_Empresa_H)
    var AreaId_Empresa_H_S = $('#dat_hc_it_a_area option:selected').text();

    $('#dat_hc_it_a_planta_sede').val(Item.SedeId_Empresa_H)
    var SedeId_Empresa_H_S = $('#dat_hc_it_a_planta_sede option:selected').text();


    var f1 = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.A_FechaTransferencia);

    var menupop = `
      <div class="dropdown float-right dropleft">
        <div class="more-info" id="item_am_diagnostico_1" data-toggle="dropdown">
          <img src="images/iconos/menu_responsive.svg" style="width: 18px; margin-right: 12px" />
        </div>
        <div class="dropdown-menu" aria-labelledby="item_am_diagnostico_1">
          <ul>
            <li onclick="fnSp3VerEditarRegistroTransferencia(${Item.IdHC}, ${Item.Id},0)">
              <img src="./images/sho/eyeIcon.svg"/>
              <span>Ver registro</span>
            </li>
          </ul>
        </div>
      </div>
      `;

    html += `
                
                 <div class="col-md-12"   style=" width:1250px !important;"   >
                                                    <div class="header-tabla px-2 py-3 filaBandeja" style=" width:1220px !important; mmargin-rigth:30px !important; " > 

                                                        <table border="0"  style=" width:1230px !important;  "  >   
                                                            <tr >
                                                                 
                                                                 

                                                                  <td  style = 'width: 240px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.A_CodeTransferencia != null ? Item.A_CodeTransferencia : "---"}</div></td>  
                                                                  <td  style = 'width: 240px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.Descripcion_TipOrigen != null ? Item.Descripcion_TipOrigen : "---"}</div></td> 

                                                                  <td  style = 'width: 240px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.CodigoOrigen != null ? Item.CodigoOrigen : "---"}</div></td>  
                                                                  <td  style = 'width: 240px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >&nbsp;&nbsp;&nbsp; ${Item.C_Lugar != null ? Item.C_Lugar : "---"}</div></td>  
                                                                  <td  style = 'width: 240px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >&nbsp;&nbsp; ${f1 != null ? f1 : "---"}</div></td>  
                                                                  
                                                      

                                                                  <td  style = 'width: 10px;'   align="left"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${menupop}</td>  
                                                                  <td  style = 'width: 20px;'   align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >&nbsp;</td>  

                                                        </table>
                                                    </div>
                                  </div>    

                              `;




  });








  hideLoading();
  //console.log(html);

  // $('#dat_hc_a_area').val(0)
  // $('#dat_hc_a_sede').val(0)



  return html;


}
//------------------------------------- fin   fnSp3ListarTablaGeneralH_trans() -------------------------------------





function fnSp3CargaFiltroEstadoInicialSaludOcupacional_inc_HC() { //------------------------------------- ini   fnSp3CargaFiltroEstadoInicialSaludOcupacional() -------------------------------------
  showLoading();

  //var body = { "AreaId_Empresa_H": 0, "SedeId_Empresa_H": 0 }

  //var url = apiUrlsho+"/api/Get-Incidente-AccidenteWeb?code=GY7/yooa3Zl5sKu7zgakDbaCn4uvOKXjfwe/JkbSuIwDPOs/baiZFQ==&httpmethod=objectlist&IdTipoEvento="+programa+"&IdEmpresa="+gerencia+"&IdSede="+sedepa+"&FechaInicio="+f1+"&FechaFin="+f2+"&IdEmbarcacion="+estadopa
  //var url = apiUrlsho+"/api/hce_Get_009_interconsulta_busqueda?code=mlLAeNuPAvTC057apNoiFLG/H/j36XcKY8vYElXN1st3CaLy2eeQ1A==&Gerencia=0&Planta=0&Area=0&Documento=0&Nombres&Apellidos&CodeInterconsultaTraferencia&FechaDesde&FechaHasta&Buscar";

  var a = 0;
  var b = 0;
  var c = 0;
  var d = '';
  var e = '';
  var f = '';
  var g = '';
  var h = '';
  var i = '';
  var j = '';


  var url = apiUrlsho + "/api/hce_Get_009_interconsulta_busqueda?code=mlLAeNuPAvTC057apNoiFLG/H/j36XcKY8vYElXN1st3CaLy2eeQ1A==&Gerencia=" + a + "&Planta=" + b + "&Area=" + c + "&Documento=" + d + "&Nombres=" + e + "&Apellidos=" + f + "&CodeInterconsultaTraferencia=" + g + "&FechaDesde=" + h + "&FechaHasta=" + i + "&Buscar=" + j;



  console.log("248 URL", url);
  var headers = { "apiKey": constantes.apiKey, "Content-Type": "application/json" }
  //alert('api = '+constantes.apiKey);

  // var a = 0; // $('#dat_hc_it_a_gerencia').val(0);
  // var b = 0; //$('#dat_hc_it_a_planta_sede').val(0);
  // var c = 0; //$('#dat_hc_it_a_area').val(0);
  // var d = 0; //$('#dat_hc_it_a_doc').val(0);
  // var e = $('#dat_hc_it_a_nombre').val();
  // var f = $('#dat_hc_it_a_apellido').val();
  // var g = $('#dat_hc_it_a_cod_interc').val();
  // var h = $('#dat_hc_it_a_fe_desde').val();
  // var i = $('#dat_hc_it_a_fe_hasta').val();
  // var j = $('#dat_hc_it_a_busca').val();

  // //"+a+"

  var a = parseInt($('#dat_hc_it_a_gerencia').val());//dat_hc_it_a_gerencia
  var b = $('#dat_hc_it_a_planta_sede').val();
  var c = $('#dat_hc_it_a_area').val();
  var d = $('#dat_hc_it_a_doc').val();
  var e = $('#dat_hc_it_a_nombre').val();
  var f = $('#dat_hc_it_a_apellido').val();
  var g = $('#dat_hc_it_a_cod_interc').val();
  var h = $('#dat_hc_it_a_fe_desde').val(); h = '';//error de servicio se debe arreglar
  var i = $('#dat_hc_it_a_fe_hasta').val(); i = '';//error de servicio se debe arreglar
  var j = $('#dat_hc_it_a_busca').val();

  //var url = apiUrlsho + "/api/hce_Get_010_transferencia_busqueda?code=Ma57zVWN/hVKiVbpbiaBFuwa3iEiVrtFLv6X0qATPa1taStnyUvlPw==&Gerencia=" + a + "&Planta=" + b + "&Area=" + c + "&Documento=" + d + "&Nombres=" + e + "&Apellidos=" + f + "&CodeInterconsultaTraferencia=" + g + "&FechaDesde=" + h + "&FechaHasta=" + i + "&Buscar="+j;







  var settings = {
    "url": url,
    "method": "GET",
    "timeout": 0,
    "crossDomain": true,
    "dataType": "json",
    "headers": headers,
    // "data": { "NroDocumento_Trabajador_H": a, "AreaId_Empresa_H": c, "SedeId_Empresa_H": b, "Buscador": d } //JSON.stringify(body)
  };



  $.ajax(settings).done(function (response) {
    console.log("**todos interc 269**", response);



    if (response.DiagnosticoCIE10.length > 0) { //---------------------------------------------------------------

      response.DiagnosticoCIE10.map(function (itemx) {
        //D_IT[itemx.InterconsultaId] = D_IT[itemx.InterconsultaId].itemx.Descripcion_TipCie10;

        console.log("diagnostico", itemx.Descripcion_TipCie10);

        if (itemx.Descripcion_TipCie10 == 'null' || itemx.Descripcion_TipCie10 == null || itemx.Descripcion_TipCie10 == '') { D_IT[itemx.InterconsultaId] = '-----'; } else { D_IT[itemx.InterconsultaId] = itemx.Descripcion_TipCie10 }

      });
      console.log("302 D_IT[]", D_IT);





    } //---------------------------------------------------------------



    
    var ik = 0;
    var obj = [];
     response.Interconsult.map(function (itemx) {
         if (itemx.IdHC == idHC) 
           {

              obj[ik] = itemx;
              ik++;
           }
        
      });

      

    if (obj.length > 0) {

      $('#bodyTablaSinAuditorias_int').css('display', 'none');

      $('#pagination-container-EvalAud_int').pagination({
        dataSource: obj,
        pageSize: 4,
        callback: function (data, pagination) {
          var html = fnSp3ListarTablaGeneralH_int_HC(data);
          $('#cant_interc').html(`${obj.length} Registros`);
          $('#body-tabla-list-EvalAud_int').html(html);

          //---------aqui se reinician los valores del buscador 
          $('#dat_hc_it_a_gerencia').val(0);
          $('#dat_hc_it_a_planta_sede').val(0);
          $('#dat_hc_it_a_area').val(0);
          //---------aqui se reinician los valores del buscador 
        }
      })



    } else {

      hideLoading();
    }



  });




} //------------------------------------- fin   fnSp3CargaFiltroEstadoInicialSaludOcupacional() -------------------------------------


function fnSp3ListarTablaGeneralH_int_HC(data) { //------------------------------------------------------- ini   fnSp3ListarTablaGeneralH() -----------------------------------

  var html = '';
  var btNew = '';
  var width = 2450; //
  var width1 = 2430; //
  var width1 = 2420; //

  // alert('aqiooooooooooooooooooo 315');
  data.forEach((Item) => {

    paObj_hi[Item.IdInter] = new Interconsulta();
    paObj_hi[Item.IdInter].cargarData(Item);
    //${Item.CodigoPaciente_H != null ? Item.CodigoPaciente_H : "---"}

    $('#dat_hc_it_a_gerencia').val(Item.GerenciaId_Empresa_H)
    var GerenciaId_Empresa_H = $('#dat_hc_it_a_gerencia option:selected').text();


    $('#dat_hc_it_a_area').val(Item.AreaId_Empresa_H)
    var AreaId_Empresa_H_S = $('#dat_hc_it_a_area option:selected').text();

    $('#dat_hc_it_a_planta_sede').val(Item.SedeId_Empresa_H)
    var SedeId_Empresa_H_S = $('#dat_hc_it_a_planta_sede option:selected').text();


    var f1 = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.A_FechaInterconsulta);

    var menupop = `                  
      <div class="dropdown float-right dropleft">
        <div class="more-info" id="item_am_diagnostico_1" data-toggle="dropdown">
          <img src="images/iconos/menu_responsive.svg" style="width: 18px; margin-right: 12px" />
        </div>
        <div class="dropdown-menu" aria-labelledby="item_am_diagnostico_1">
          <ul>
            <li onclick="interSp3VerInterconsulta(${Item.IdInter})">
              <img src="./images/sho/eyeIcon.svg"/>
              <span>Ver registro</span>
            </li>
          </ul>
        </div>
      </div>
      `;

    html += `
                
                 <div class="col-md-12"   style=" width:1250px !important;"   >
                                                    <div class="header-tabla px-2 py-3 filaBandeja" style=" width:1220px !important; mmargin-rigth:30px !important; " > 

                                                        <table border="0"  style=" width:1240px !important;  "  >   
                                                            <tr >
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.CodigoOrigen_Inter != null ? Item.CodigoOrigen_Inter : "---"}</div></td>  
                                                                  <td  style = 'width: 210px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${f1 != null ? f1 : "---"}</div></td>  
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.Descripcion_InterExpec != null ? Item.Descripcion_InterExpec : "---"}</div></td>  
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c9TabGenyx" class="text-center lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.B_RecibioRespuesta_Inter == 1 ? 'Si' : "No"}</div></td>  
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >&nbsp;&nbsp;&nbsp;&nbsp;${Item.C_ActitupParaLaboral_Inter == 1 ? 'Apto' : "No Apto"}</div></td>
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c1TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${D_IT[Item.IdInter] != null ? D_IT[Item.IdInter] : "---"} </div></td>  

                                                                  <td  style = 'width: 10px;'   align="left"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${menupop}</td>  
                                                                  <td  style = 'width: 20px;'   align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >&nbsp;</td>  

                                                        </table>
                                                    </div>
                                  </div>    

                              `;




  });








  hideLoading();
  //console.log(html);

  // $('#dat_hc_a_area').val(0)
  // $('#dat_hc_a_sede').val(0)



  return html;


}

//------------------------------------- fin   fnSp3ListarTablaGeneralH() -------------------------------------




















//######################################################################### BLOQUE CODIGO INTEGRACION ANDY 10-09-2021 ########################################################################

function cargarAreasSedesGerencia() {
  let url = apiUrlssoma+`/api/a_get_lista_sedes_areas_gerencia?code=5sz/nIVDXtW7t97kzgfOyzuN4yYq6FEfuJoZSlk3DzGQ9AMLu7k6WQ==&IdSede=0&IdArea=0&IdGerencia=0`;

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
    sedeAreaGerencia = response;
    fnSp3CargaListasHistoriaClinica_Interconsulta_transferencia();
  })
}



function fnSp3CargarHistoriasClinicas() {//------------------------------------------------------------------------------------------------------------
  var headers = { "apiKey": constantes.apiKey, "Content-Type": "application/json" }
  showLoading();
  console.log("** Buscando...........................*");
  var url = apiUrlsho + "/api/hce_Get_001_historia_clinica?code=5lJWTsRDsoxqo9VoOxIzfQAPyCTxUTqLpvgY5tuHluCZlSodpQ/Y7w==&AreaId_Empresa_H=0&SedeId_Empresa_H=0&NroDocumento_Trabajador_H=0&Buscador=";

  var settings = {
    "url": url,
    "method": "GET",
    "timeout": 0,
    "crossDomain": true,
    "dataType": "json",
    "headers": headers,
    // "data": { "NroDocumento_Trabajador_H": a, "AreaId_Empresa_H": c, "SedeId_Empresa_H": b, "Buscador": d } //JSON.stringify(body)
  };

  $.ajax(settings).done(function (response) {

    response.HistoriaClin.map(function (itemx) {

      // D_IT3[itemx.TransferenciaId] = itemx;
      paObj_HC[itemx.IdHC] = new HistoriaClinicaTranferencia();
      paObj_HC[itemx.IdHC].cargarData(itemx);

      paObj_hc[itemx.IdHC] = new HistoriaClinicaTranferencia();
      paObj_hc[itemx.IdHC].cargarData(itemx);

    });

    hideLoading();





  });

}//------------------------------------------------------------------------------------------------------------



function buscadorInterconsultaTransferencia() {//---------------------------------------------------------------------------------------------

  //lo primro es ver donde estamos inte o transf
  if (visible == 0) {
    //alert('estamos en interconsulta');
    fnSp3CargaFiltroEstadoInicialSaludOcupacional_inc();
  }
  else {
    //alert('estamos en transferencia');
    fnSp3CargaFiltroEstadoInicialSaludOcupacional_trans();
  }


}//---------------------------------------------------------------------------------------------






//######################################################################### BLOQUE CODIGO INTEGRACION ANDY 10-09-2021 ########################################################################


















//###################################################### PARA EL FUNCIONAMIENTO INDEPENDIENTE DESDE DATOS GENERALES ########################################################

function cargarAreasSedesGerenciaHC() {

  //alert('desde historia clinica');
  let url = apiUrlssoma+`/api/a_get_lista_sedes_areas_gerencia?code=5sz/nIVDXtW7t97kzgfOyzuN4yYq6FEfuJoZSlk3DzGQ9AMLu7k6WQ==&IdSede=0&IdArea=0&IdGerencia=0`;

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
    sedeAreaGerencia = response;
    fnSp3CargaListasHistoriaClinica_Interconsulta_transferencia_HC();
  })
}



function fnSp3CargaListasHistoriaClinica_Interconsulta_transferencia_HC() { //--------------------------------------------------------------------------------------------------------------  ini ------------------------- fnSp3CargaListasHistoriaClinica_Interconsulta_transferencia

  var url = apiUrlssoma + "/api/a_get_lista_sedes_areas_gerencia?code=5sz/nIVDXtW7t97kzgfOyzuN4yYq6FEfuJoZSlk3DzGQ9AMLu7k6WQ==&IdSede=0&IdArea=0&IdGerencia=0";
  console.log("132 interc URL", url)
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

  $.ajax(settings).done(function (response1) {
    console.log("**fnSp3CargaListasHistoriaClinica_Interconsulta_transferencia**", response1);

    OBJ_I = response1;




  });



} //--------------------------------------------------------------------------------------------------------------  ini ------------------------- fnSp3CargaListasHistoriaClinica_Interconsulta_transferencia









