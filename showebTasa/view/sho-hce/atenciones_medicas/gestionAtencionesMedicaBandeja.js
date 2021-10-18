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
 * DESCRIPCION: ARCHIVO FRONT DE FUNCIONALIDAD EN CLIENTE DE LAS OPCIONES DE LAS ATENCIONES MEDICAS
 * EN EL FRONT END ACCIDENTES- (LISTADO, FILTRADO, VER)
 *
 * ARCHIVOS DE SERVICIOS   _________________________________________
 * | # |     MODULO             |  |         NOMBRE                 |
 * | 1 |   SALUD OCUPACIONAL    |  |     Get-                       |
 * |________________________________________________________________|
 *
 * VERSION: 0.1 Beta
 *******************************************************************************************/










//paObj_ATM





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



function _init_fnSp3SaludOcupacionalEstadoInicial_ATM() { //------------------------------------- ini   _init_fnSp3SaludOcupacionalEstadoInicial() -------------------------------------
  //console.clear();
  //showLoading();


 //alert('arranca aqui o que');
  console.log("Arrancamos ATENCIONES MEDICAS............................ _init_fnSp3SaludOcupacionalEstadoInicial");
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

  cargarAreasSedesGerencia_ATM_();// se llama desde aqui adentro buscadorInterconsultaTransferencia();


  //############################## BLOQUE CODIGO INTEGRACION ANDY 10-09-2021 #####################################

} //------------------------------------- fini   _init_fnSp3SaludOcupacionalEstadoInicial() -------------------------------------













//############################## BLOQUE CODIGO INTEGRACION ANDY 10-09-2021 #####################################

function fnSp3CargaListasHistoriaClinica_Interconsulta_transferencia() { //--------------------------------------------------------------------------------------------------------------  ini ------------------------- fnSp3CargaListasHistoriaClinica_Interconsulta_transferencia

  showLoading();

//alert('es de aqui uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuo')
  //document.getElementById('dat_hc_it_a_busca').value = '2021/12/12';




  $("#" + 'dat_hc_it_a_gerencia').html("Cargando ...");
  $("#" + 'dat_hc_it_a_planta_sede').html("Cargando ...");
  $("#" + 'dat_hc_it_a_area').html("Cargando ...");
  $("#" + 'dat_am_motivo').html("Cargando ...");


  //var url = "https://550m44ud1tmg7454-inspection-dev.azurewebsites.net/api/Get-Incidente-AccidenteWeb?code=GY7/yooa3Zl5sKu7zgakDbaCn4uvOKXjfwe/JkbSuIwDPOs/baiZFQ==&httpmethod=objectlist";
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
          if (n == nk) { //-----------------------------------------------------------------------

            $("#" + 'dat_hc_it_a_area').html(" ");
            $("#" + 'dat_hc_it_a_area').css('font-size', '13px');
            $("#" + 'dat_hc_it_a_area').html("<option selected value='0'>          </option>");
            $("#" + 'dat_int_tran_area').html(" ");
            $("#" + 'dat_int_tran_area').css('font-size', '13px');
            $("#" + 'dat_int_tran_area').html("<option selected value='0'>          </option>");
            
            var tempa = [];
            
            response1.Area.map(function (item) {

               var marca = 0;
                    for(let i = 0; i<tempa.length; i++ )
                        {    if(tempa[i] == item.Description){marca = 1;}            }
                        
                        if(marca == 0)
                          {
                             tempa[tempa.length] = item.Description;
                              $("#" + 'dat_hc_it_a_area').append(`<option value='${item.Id}' title='${item.Description}' style='font-weight: bold;'>${item.Description}</option>`);
                              $("#" + 'dat_int_tran_area').append(`<option value='${item.Id}' title='${item.Description}' style='font-weight: bold;'>${item.Description}</option>`);
                              mk++;

                          }
                      marca = 0;
            

             


             


              if (m == mk) { //--------------------------------------------------------------------------------------------------------------------------------------------


                fnsp3CargarListaMotivos();
                fnSp3CargaFiltroEstadoInicialSaludOcupacional_inc();
                fnSp3CargaFiltroEstadoInicialSaludOcupacional_trans();
                fnSp3CargarHistoriasClinicas();
              } //-----------------------------------------------------------------------------------------------------------------------------------------

              
            });

            //alert('xxxxxxxxxxxxxxx  xxxxxxxxxxxxxxxxxxxxx  cargar listado aqui   xxxxxxxxxxxxxxxxxxxxxx   xxxxxxxxxxxxxxxxxx');

            buscadorInterconsultaTransferencia();

          } //-----------------------------------------------------------------------
        });


      } //----------------------------------------------------------------------------------------------------------

    });
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------


    hideLoading();





  }




  );

} //--------------------------------------------------------------------------------------------------------------  ini ------------------------- fnSp3CargaListasHistoriaClinica_Interconsulta_transferencia


//############################## BLOQUE CODIGO INTEGRACION ANDY 10-09-2021 #####################################





















var ID_SAF = [];

function fnSp3CargaFiltroEstadoInicialSaludOcupacional_inc() { //------------------------------------- ini   fnSp3CargaFiltroEstadoInicialSaludOcupacional() -------------------------------------
  showLoading();

//alert('error');

  //var body = { "AreaId_Empresa_H": 0, "SedeId_Empresa_H": 0 }

  //var url = apiUrlsho+"/api/Get-Incidente-AccidenteWeb?code=GY7/yooa3Zl5sKu7zgakDbaCn4uvOKXjfwe/JkbSuIwDPOs/baiZFQ==&httpmethod=objectlist&IdTipoEvento="+programa+"&IdEmpresa="+gerencia+"&IdSede="+sedepa+"&FechaInicio="+f1+"&FechaFin="+f2+"&IdEmbarcacion="+estadopa
  //var url = apiUrlsho+"/api/hce_Get_009_interconsulta_busqueda?code=mlLAeNuPAvTC057apNoiFLG/H/j36XcKY8vYElXN1st3CaLy2eeQ1A==&Gerencia=0&Planta=0&Area=0&Documento=0&Nombres&Apellidos&CodeInterconsultaTraferencia&FechaDesde&FechaHasta&Buscar";


  //############################## BLOQUE CODIGO INTEGRACION ANDY 10-09-2021 #####################################

  $('#lb_ho_it_interc ').html('Cargando.....')// lo tiene el otro


  var headers = { "apiKey": constantes.apiKey, "Content-Type": "application/json" }
  //alert('api = '+constantes.apiKey);

  var a0 = $('#dat_hc_it_a_id_puesto_trabajo').val();
  var a = parseInt($('#dat_hc_it_a_gerencia').val());//dat_hc_it_a_gerencia
  var b = $('#dat_hc_it_a_planta_sede').val();  //alert(b);
  var c = $('#dat_hc_it_a_area').val();
  var d = $('#dat_hc_it_a_doc').val();
  var e = $('#dat_hc_it_a_nombre').val();
  var f = $('#dat_hc_it_a_apellido').val();
  var g = $('#dat_am_sistemaf').val(); //sistema afectado

  var h = $('#dat_hc_it_a_fe_desde').val(); h = '';
  var i = $('#dat_hc_it_a_fe_hasta').val(); i = '';

  var j = $('#dat_hc_it_a_busca').val();

  var a1 = $('#dat_am_motivo').val();

  if (a1 == null) { a1 = 0; }


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

  //var url = apiUrlsho + "/api/hce_Get_009_interconsulta_busqueda?code=mlLAeNuPAvTC057apNoiFLG/H/j36XcKY8vYElXN1st3CaLy2eeQ1A==&Gerencia=" + a + "&Planta=" + b + "&Area=" + c + "&Documento=" + d + "&Nombres=" + e + "&Apellidos=" + f + "&CodeInterconsultaTraferencia=" + g + "&FechaDesde=" + h + "&FechaHasta=" + i + "&Buscar="+j;
  // var url = apiUrlsho + "/api/hce_Get_017_descanso-medico_busqueda?code=qiLgD8uqGlqrIjk1Y7P1NgNioYJRj/HQvmwq60UFvqerUH4Uz5Nwcw==&IdDescanso=&Gerencia=0&Planta=0&Area=0&Documento=0&Nombres&Apellidos&OrigenDescanso&FechaDesde&FechaHasta&Buscar"

  var url = apiUrlsho + "/api/hce_Get_032_atencion_medica_busqueda?code=3YeDZ7L5GNjUd1dfHSTs//21pT377zQb3EttUswHPjnaSGAa/RmTFA==&Gerencia=" + a + "&Planta=" + b + "&Area=" + c + "&Documento=" + d + "&Nombres=" + e + "&Apellidos=" + f + "&MotivoAtencion=" + a1 + "&SistemaAfectado=" + g + "&FechaDesde=" + h + "&FechaHasta=" + i + "&Buscar=" + j + "&PuestoTrabajo="+a0;

  console.log("*ESTOY MANDANDO A BUSCAR ESTO                   ######################         ############################           ##########################*", url);


  var settings = {
    "url": url,
    "method": "GET",
    "timeout": 0,
    "crossDomain": true,
    "dataType": "json",
    "headers": headers,
    // "data": { "NroDocumento_Trabajador_H": a, "AreaId_Empresa_H": c, "SedeId_Empresa_H": b, "Buscador": d } //JSON.stringify(body)
  };


 D_IT = [];
 SAF = [];
 //ID_SAF = [];
  $.ajax(settings).done(function (response) {
    console.log("**todos interc 269**", response);



    if (response.DiagnosticoCIE10.length > 0) { //---------------------------------------------------------------

      response.DiagnosticoCIE10.map(function (itemx) {
        //D_IT[itemx.InterconsultaId] = D_IT[itemx.InterconsultaId].itemx.Descripcion_TipCie10;

        console.log("diagnostico", itemx.Diagnostico);

        if (itemx.Diagnostico != 'undefined') {
          D_IT[itemx.AtencionMedicaId] = D_IT[itemx.AtencionMedicaId] + "," + itemx.Diagnostico;
          D_IT[itemx.AtencionMedicaId] = D_IT[itemx.AtencionMedicaId].replace('undefined', 'Ninguno');
          SAF[itemx.AtencionMedicaId] = itemx.Descripcion_SistAfect;

         // ID_SAF[itemx.IdSecAfec] = itemx.Descripcion_SistAfect;
          
     
        }


      });
      console.log("302 D_IT[]", D_IT);





    } //---------------------------------------------------------------


   

      response.AtencionMedica.map(function (Item) {
        
         $('#dat_hc_it_a_gerencia').val(Item.GerenciaId_Empresa_H)
          var GerenciaId_Empresa_H = $('#dat_hc_it_a_gerencia option:selected').text();


          $('#dat_hc_it_a_area').val(Item.AreaId_Empresa_H)
          var AreaId_Empresa_H_S = $('#dat_hc_it_a_area option:selected').text();

          $('#dat_hc_it_a_planta_sede').val(Item.AreaId_Empresa_H)
          var SedeId_Empresa_H_S = $('#dat_hc_it_a_planta_sede option:selected').text();


          $('#dat_am_motivo').val(Item.C_MotivoConsulta)
          var C_MotivoConsulta = $('#dat_am_motivo option:selected').text();


          var f1 = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.FechaAtencion);
          var f_ini = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.E_FechaInicio);
          var f_fin = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.E_FechaFin);

          let ds = f1.split('/');
          var im = ds[1];
          var Year = ds[2];

          var im = parseInt(im);
          Mes = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
           

           HTMLEXCEL_AT += `<tr  style="border: 1px !important;color: #000;">
                                                                         

                      

                               <th  style="border: 1px !important; text-align:left; ">${Item.NroDocumento_Trabajador_H != null ? Item.NroDocumento_Trabajador_H : "---"}</td>
                               <th  style="border: 1px !important; text-align:left; ">${Item.Nombres_Trabajador_H != null ? Item.Nombres_Trabajador_H : "---"}</td>
                               <th  style="border: 1px !important; text-align:left; ">${Item.Apellidos_Trabajador_H != null ? Item.Apellidos_Trabajador_H : "---"}</td> 

                               <th  style="border: 1px !important; text-align:left; ">${GerenciaId_Empresa_H != null ? GerenciaId_Empresa_H : "---"}</td>
                               <th  style="border: 1px !important; text-align:left; ">&nbsp;&nbsp;&nbsp;${SedeId_Empresa_H_S != null ? SedeId_Empresa_H_S : "---"}</td>
                               <th  style="border: 1px !important; text-align:left; ">${AreaId_Empresa_H_S != null ? AreaId_Empresa_H_S : "---"}</td>

                               <th  style="border: 1px !important; text-align:left; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${Item.PuestoTrabajo_Empresa_H != null ? Item.PuestoTrabajo_Empresa_H : "---"}</td>
                               <th  style="border: 1px !important; text-align:left; ">&nbsp;&nbsp;&nbsp;${f1 != null ? f1 : "---"}</div></td>
                               <th  style="border: 1px !important; text-align:left; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${Item.Empresa != null ? Item.Empresa : "---"}</td> 



                               <th  style="border: 1px !important; text-align:left; ">${Item.DescripcionMotivoC != null ? Item.DescripcionMotivoC : "---"}</td> 

                               <th  style="border: 1px !important; text-align:left; "> ${SAF[Item.IdAM] != null ? SAF[Item.IdAM] : "---"}</td>  
                               <th  style="border: 1px !important; text-align:left; ">${Item.E_DescansoPorEnfermedad != 1 ? 'No' : "Si"}</td> 

                               <th  style="border: 1px !important; text-align:left; ">${Item.GeneroInterconsulta != 1 ? 'No' : "Si"}</td>  
                               <th  style="border: 1px !important; text-align:left; "> ${Item.GeneroTransferencia != 1 ? 'No' : "Si"}</td>  
                               <th  style="border: 1px !important; text-align:left; ">${D_IT[Item.IdAM] != null ? D_IT[Item.IdAM] : "---"}</td>  






               
                 </tr>
                                                                          `;
        


      });






    if (response.AtencionMedica.length > 0) {
      $('#cant_interc').html('' + response.AtencionMedica.length + ' registros');


      $('#bodyTablaSinAuditorias_int').css('display', 'none');

      $('#pagination-container-EvalAud_int').pagination({
        dataSource: response.AtencionMedica,
        pageSize: 4,
        callback: function (data, pagination) {
          var html = fnSp3ListarTablaGeneralH_int(data);
          $('#body-tabla-list-EvalAud_int').html(html);

          //---------aqui se reinician los valores del buscador 
          $('#dat_hc_it_a_gerencia').val(0);
          $('#dat_hc_it_a_planta_sede').val(0);
          $('#dat_hc_it_a_area').val(0);
          $('#dat_am_motivo').val(0);
          //---------aqui se reinician los valores del buscador 
        }
      })


          $('#dat_hc_it_a_gerencia').val(a);
          $('#dat_hc_it_a_planta_sede').val(b);
          $('#dat_hc_it_a_area').val(c);
          $('#dat_am_motivo').val(a1);

          $('#dat_am_sistemaf').val(g);
          
    } else {
          
        $('#cant_interc').html('' + response.AtencionMedica.length + ' registros');
        $('#body-tabla-list-EvalAud_int').html('');
        $('#pagination-container-EvalAud_int').html('');
      hideLoading();
    }



  });






 let url1 = apiUrlsho + `/api/hce_Get_034_sistema_afectado?code=qxkQ9ZXSLatmcpaCr044BU0xgBGcMRX899c8sjilL/dCTIgHf4HyVg==`;

  let headers1 = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings1 = {
    "url": url1,
    "method": "get",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers1
  };


 $("#" + 'dat_am_sistemaf').html(" ");
 $("#" + 'dat_am_sistemaf').css('font-size', '13px');
 //$("#" + 'dat_am_sistemaf').html("<option selected value='0'>          </option>");
  $.ajax(settings1).done((response) => 
  {

                  response.SistemaAfectado.map(function (itemx) {
                      
                       $("#" + 'dat_am_sistemaf').append(`<option value='${itemx.Id}' title='${itemx.Descripcion}' style='font-weight: bold;'>${itemx.Descripcion}</option>`);
                   
                   });
  
           

  })
 //$("#" + 'dat_am_sistemaf').val(15);









} //------------------------------------- fin   fnSp3CargaFiltroEstadoInicialSaludOcupacional() -------------------------------------



































function fnSp3ListarTablaGeneralH_int(data) { //------------------------------------------------------- ini   fnSp3ListarTablaGeneralH() -----------------------------------

  var html = '';
  var btNew = '';
  var width = 2450; //
  var width1 = 2430; //
  var width1 = 2420; //

  //alert('aqiooooooooooooooooooo 315');
  data.forEach((Item) => {

    paObj_ATM_SHO[Item.IdAM] = new Interconsulta();
    paObj_ATM_SHO[Item.IdAM].cargarData(Item);
    //${Item.CodigoPaciente_H != null ? Item.CodigoPaciente_H : "---"}

    $('#dat_hc_it_a_gerencia').val(Item.GerenciaId_Empresa_H)
    var GerenciaId_Empresa_H = $('#dat_hc_it_a_gerencia option:selected').text();


    $('#dat_hc_it_a_area').val(Item.AreaId_Empresa_H)
    var AreaId_Empresa_H_S = $('#dat_hc_it_a_area option:selected').text();

    $('#dat_hc_it_a_planta_sede').val(Item.AreaId_Empresa_H)
    var SedeId_Empresa_H_S = $('#dat_hc_it_a_planta_sede option:selected').text();


    $('#dat_am_motivo').val(Item.C_MotivoConsulta)
    var C_MotivoConsulta = $('#dat_am_motivo option:selected').text();


    var f1 = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.FechaAtencion);
    var f_ini = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.E_FechaInicio);
    var f_fin = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.E_FechaFin);

    let ds = f1.split('/');
    var im = ds[1];
    var Year = ds[2];

    var im = parseInt(im);
    Mes = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    //alert(Mes[0])

    var menupop = `                   <div class="dropdown">
                                          <button class=" btn-link dropdown textVertical" style='outline:none !important;' id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <label class='textVertical'>...</label>
                                          </button>

                                          
                                            <div class="dropdown-menu">  
                                                  <a class="dropdown-item" onclick="hcSp3VerAtencionMedica(${Item.IdAM}, 2, 1, ${Item.HistoriaClinicaId});"><img src="./images/sho/eyeIcon.svg" alt="" />&nbsp;&nbsp; Ver Registro</a>
                                                   <!-- <a class="dropdown-item" onclick="AprobarDescansoMedico(${Item.IdAM}, ${Item.HistoriaClinicaId})"><img src="./images/sho/confirm2.svg"  style='width:15px; height:18px;' alt="" /> &nbsp;&nbsp; Aprobar</a>  -->
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
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c2TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.Nombres_Trabajador_H != null ? Item.Nombres_Trabajador_H : "---"}</div></td>
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.Apellidos_Trabajador_H != null ? Item.Apellidos_Trabajador_H : "---"}</div></td> 
      
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c4TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${GerenciaId_Empresa_H != null ? GerenciaId_Empresa_H : "---"}</div></td>
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c5TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >&nbsp;&nbsp;&nbsp;${SedeId_Empresa_H_S != null ? SedeId_Empresa_H_S : "---"}</div></td>
                                                                  <td  style = 'width: 220px;'  align="center"><div id="c6TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${AreaId_Empresa_H_S != null ? AreaId_Empresa_H_S : "---"}</div></td>

                                                                  <td  style = 'width: 200px;'  align="center"><div id="c7TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important;' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${Item.PuestoTrabajo_Empresa_H != null ? Item.PuestoTrabajo_Empresa_H : "---"}</div></td>
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c8TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >&nbsp;&nbsp;&nbsp;${f1 != null ? f1 : "---"}</div></td>
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${Item.Empresa != null ? Item.Empresa : "---"}</div></td> 



                                                                  <td  style = 'width: 200px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.DescripcionMotivoC != null ? Item.DescripcionMotivoC : "---"}</div></td> 

                                                                  <td  style = 'width: 200px;'  align="center"><div id="c9TabGenyx" class="text-center lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${SAF[Item.IdAM] != null ? SAF[Item.IdAM] : "---"}</div></td>  
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c9TabGenyx" class="text-center lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.E_DescansoPorEnfermedad != 1 ? 'No' : "Si"}</div></td> 

                                                                  <td  style = 'width: 200px;'  align="center"><div id="c9TabGenyx" class="text-center lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.GeneroInterconsulta != 1 ? 'No' : "Si"}</div></td>  
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c9TabGenyx" class="text-center lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.GeneroTransferencia != 1 ? 'No' : "Si"}</div></td>  
                                                                  <td  style = 'width: 200px;'  align="center"><div id="c1TabGenyx" class="text-center lbCabezaTabla" style = 'color:#1C1C1C  !important; '  ><input type="text" value='${D_IT[Item.IdAM] != null ? D_IT[Item.IdAM] : "---"} ' style='width:180px; background:#f2f2f2; border-color: #f2f2f2 !important;'></div></td>  

                                                                  <td  style = 'width: 10px;'   align="left"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${menupop}</td>  
                                                                  <td  style = 'width: 20px;'   align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >&nbsp;</td>  


                                                        </table>
                                                    </div>
                                  </div>    

                              `;




   



  });







  hideLoading();
  $('#lb_ho_it_interc ').html('Registros sistema SHO');

  // $('#dat_hc_a_area').val(0)
  // $('#dat_hc_a_sede').val(0)



  return html;


}
//------------------------------------- fin   fnSp3ListarTablaGeneralH() -------------------------------------





















































//############################## BLOQUE CODIGO INTEGRACION ANDY 10-09-2021 #####################################

function fnSp3CargaFiltroEstadoInicialSaludOcupacional_trans() { //------------------------------------- ini   fnSp3CargaFiltroEstadoInicialSaludOcupacional_trans() -------------------------------------
  showLoading();
  $('#lb_ho_it_trans ').html('Cargando.....') //asi estaba en el otro


  console.log("248 URL", url);
  var headers = { "apiKey": constantes.apiKey, "Content-Type": "application/json" }
  //alert('api = '+constantes.apiKey);

  var a0 = $('#dat_hc_it_a_id_descanso').val();
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
  var url = apiUrlsho + "/api/hce_Get_043_descanso_medico_SAP_busqueda?code=ibsJRZREbrldRzN91j8YeDXJv0gZU4UOXVCVglZGLS2NSrEjv2jIog==&IdDescanso=&Gerencia=0&Planta=0&Area=0&Documento=0&Nombres&Apellidos&OrigenDescanso&FechaDesde&FechaHasta&Buscar"

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


    /*
     if (response.DiagnosticoCIE10.length > 0) { //---------------------------------------------------------------

       response.DiagnosticoCIE10.map(function(itemx) {
         //D_IT[itemx.InterconsultaId] = D_IT[itemx.InterconsultaId].itemx.Descripcion_TipCie10;

         //D_IT2[itemx.TransferenciaId] = itemx;

         // console.log("diagnostico", itemx.Descripcion_TipCie10);

         // if(itemx.Descripcion_TipCie10 == 'null' || itemx.Descripcion_TipCie10 == null || itemx.Descripcion_TipCie10 == '')
         // {  D_IT2[itemx.TransferenciaId2] = '-----';}
         // else
         // { D_IT2[itemx.TransferenciaId2] = itemx.Descripcion_TipCie10}

       });
       //console.log("596 D_IT[]", D_IT2);


     } //---------------------------------------------------------------
          */

    // response.SignosVitales.map(function(itemx) {

    //   D_IT3[itemx.TransferenciaId] = itemx;


    // });
    // console.log("302 D_IT3[]", D_IT3);








    if (response.DescansoMedicoSAP.length > 0) {
      $('#cant_transf').html('' + response.DescansoMedicoSAP.length + ' registros');



      $('#bodyTablaSinAuditorias_trans').css('display', 'none');

      $('#pagination-container-EvalAud_trans').pagination({
        dataSource: response.DescansoMedicoSAP,
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

    paObj_ATM_SAP[Item.Id] = new DescansoMedico();
    paObj_ATM_SAP[Item.Id].cargarData(Item);


    // var i = paObj_ATM_SAP[Item.Id].a.DiagnosticoCIE10.length;
    // paObj_ATM_SAP[Item.Id].a.DiagnosticoCIE10 = D_IT2[Item.Id];
    //paObj_ATM_SAP[Item.Id].a.SignosVitales = D_IT3[Item.Id];


    console.log("####################################################", Item.Id, "###################################################################")

    //console.log("paObj_ATM_SAP[Item.Id].a.DiagnosticoCIE10 = ", paObj_ATM_SAP[Item.Id].a.DiagnosticoCIE10);
    //console.log("paObj_ATM_SAP[Item.Id].a.SignosVitales = ", paObj_ATM_SAP[Item.Id].a.SignosVitales);

    console.log("####################################################", Item.Id, "#######################################################################")

    // if (paObj_ATM_SAP[Item.Id].a.DiagnosticoCIE10) {
    //   var Diagnostico = paObj_ATM_SAP[Item.Id].a.DiagnosticoCIE10.Descripcion_TipCie10;
    // } else { var Diagnostico = '-----' }



    // $('#dat_hc_it_a_gerencia').val(Item.GerenciaId_Empresa_H)
    // var GerenciaId_Empresa_H = $('#dat_hc_it_a_gerencia option:selected').text();


    // $('#dat_hc_it_a_area').val(Item.AreaId_Empresa_H)
    // var AreaId_Empresa_H_S = $('#dat_hc_it_a_area option:selected').text();

    // $('#dat_hc_it_a_planta_sede').val(Item.SedeId_Empresa_H)
    // var SedeId_Empresa_H_S = $('#dat_hc_it_a_planta_sede option:selected').text();


    // var f1 = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.A_FechaTransferencia);

    $('#dat_hc_it_a_gerencia').val(Item.A_Gerencia)
    var GerenciaId_Empresa_H = $('#dat_hc_it_a_gerencia option:selected').text();


    $('#dat_hc_it_a_area').val(Item.A_Area)
    var AreaId_Empresa_H_S = $('#dat_hc_it_a_area option:selected').text();

    $('#dat_hc_it_a_planta_sede').val(Item.A_Planta)
    var SedeId_Empresa_H_S = $('#dat_hc_it_a_planta_sede option:selected').text();


    var f1 = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.FechaIni);
    var f_ini = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.B_FechaIni);
    var f_fin = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.B_FechaFin);

    let ds = f1.split('/');
    var im = ds[1];
    var Year = ds[2];

    var im = parseInt(im);
    Mes = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    //alert(Mes[0])





    var menupop = `                   <div class="dropdown">
                                                          <button class=" btn-link dropdown textVertical" style='outline:none !important;' id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <label class='textVertical'>...</label>
                                                          </button>

                                                          
                                                             <div class="dropdown-menu">
                                                                  <a class="dropdown-item" onclick="fnSprint3CuadreManual(${Item.IdHC}, ${Item.Id},0);"><img src="./images/sho/cuadre.svg" alt="" />&nbsp;&nbsp; Cuadre Manual</a>
                                                                   <!--  <a class="dropdown-item" onclick="fnSp3VerEditarRegistroTransferencia(${Item.IdHC}, 0,3);"><img src="./images/sho/moreIcon.svg" alt="" />&nbsp;&nbsp; Registro Nueva Transferencia</a>
                                                                  <a class="dropdown-item" onclick="fnSp3VerEditarRegistroTransferencia(${Item.IdHC}, ${Item.Id},1);"><img src="./images/sho/edit.svg" style='width:15px; height:18px;' alt="" /> &nbsp;&nbsp; Editar Transferencia</a> -->
                                                                </div>
                                                          </div>
                                                        </div>
                                                      `;



    html += `
                                
                                 <div class="col-md-12"   style=" width:3650px !important;"   >
                                                                    <div class="header-tabla px-2 py-3 filaBandeja" style=" width:3620px !important; mmargin-rigth:30px !important; " > 

                                                                        <table border="0"  style=" width:3630px !important;  "  >   
                                                                            <tr >
                                                                                    <td  style = 'width: 200px;'  align="center"><div id="c2TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.IdRegistro != null ? Item.IdRegistro : "---"}</div></td>
                                                                                    <td  style = 'width: 200px;'  align="center"><div id="c2TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.Documento != null ? Item.Documento : "---"}</div></td>
                                                                                    <td  style = 'width: 220px;'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.Nombre != null ? Item.Nombre : "---"}</div></td> 
                                                                                    <td  style = 'width: 200px;'  align="center"><div id="c3TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.Apellidos != null ? Item.Apellidos : "---"}</div></td>
                                                                                    <td  style = 'width: 240px;'  align="center"><div id="c4TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.Ocupacion != null ? Item.Ocupacion : "---"}</div></td>
                                                                                    <td  style = 'width: 200px;'  align="center"><div id="c5TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.UnidadOrganizativa != null ? Item.UnidadOrganizativa : "---"}</div></td>

                                                                                     <td  style = 'width: 200px;'  align="center"><div id="c5TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${im != null ? im : "---"}</div></td>
                                                                                     <td  style = 'width: 200px;'  align="center"><div id="c5TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${f_ini != null ? f_ini : "---"}</div></td>
                                                                                     <td  style = 'width: 200px;'  align="center"><div id="c5TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${f_fin != null ? f_fin : "---"}</div></td>
                                                                                     <td  style = 'width: 200px;'  align="center"><div id="c5TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.CantidadDeDias != null ? Item.CantidadDeDias : "---"}</div></td>

                                                                                     <td  style = 'width: 200px;'  align="center"><div id="c5TabGenyx" class="text-center lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.DiasAcumulados != null ? Item.DiasAcumulados : "---"}</div></td>
                                                                                     <td  style = 'width: 200px;'  align="center"><div id="c5TabGenyx" class="text-center lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.AltaMedica == 0 ? 'No' : "Si"}</div></td>
                                                                                     <td  style = 'width: 200px;'  align="center"><div id="c5TabGenyx" class="text-center lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.DescripcionContigencia != null ? Item.DescripcionContigencia : "---"}</div></td>
                                                                                     <td  style = 'width: 200px;'  align="center"><div id="c5TabGenyx" class="text-center lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.ExisteEnSHO == 1 ? 'Si' : "No"}</div></td>


                                                                                  
                                                                                  <td  style = 'width: 10px;'   align="left"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${menupop}</td>  
                                                                                  <td  style = 'width: 20px;'   align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >&nbsp;</td>  

                                                                        </table>
                                                                    </div>
                                                  </div>    

                                              `;



    HTMLEXCEL2 += `<tr  style="border: 1px !important;color: #000;">
                                                                                         

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
  $('#lb_ho_it_trans ').html('Registros SAP')

  // $('#dat_hc_a_area').val(0)
  // $('#dat_hc_a_sede').val(0)



  return html;


}
//------------------------------------- fin   fnSp3ListarTablaGeneralH_trans() -------------------------------------

//############################## BLOQUE CODIGO INTEGRACION ANDY 10-09-2021 #####################################



function fnSp3CargaInicialHC() { //------------------------------------- ini   fnSp3CargaFiltroEstadoInicialSaludOcupacional() -------------------------------------
  showLoading();

  var body = { "AreaId_Empresa_H": 0, "SedeId_Empresa_H": 0 }

  //var url = +"/api/Get-Incidente-AccidenteWeb?code=GY7/yooa3Zl5sKu7zgakDbaCn4uvOKXjfwe/JkbSuIwDPOs/baiZFQ==&httpmethod=objectlist&IdTipoEvento="+programa+"&IdEmpresa="+gerencia+"&IdSede="+sedepa+"&FechaInicio="+f1+"&FechaFin="+f2+"&IdEmbarcacion="+estadopa
  var url = apiUrlsho + "/api/hce_Get_001_historia_clinica?code=5lJWTsRDsoxqo9VoOxIzfQAPyCTxUTqLpvgY5tuHluCZlSodpQ/Y7w==";

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


    }
    else {

      hideLoading();
    }



  });


} //------------------------------------- fin   fnSp3CargaFiltroEstadoInicialSaludOcupacional() -------------------------------------




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



    HTMLEXCEL2 += `<tr  style="border: 1px !important;color: #000;">
                                                                         

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

  // alert('respondo yo o q 1406');
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


  console.log('827 ya cargue................ = ', paObj_ht[istAud]);

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
                      <td>${Item.Descripcion_TipCie10 != null ? Item.Descripcion_TipCie10 : "---"}</td>
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
                      <td>${Item.Descripcion_TipCie10 != null ? Item.Descripcion_TipCie10 : "---"}</td>
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

//alert('es de aqui o')
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




function fnSp3CargaAdjuntosTransferencia(idTransf) { //--------------------------------------------------------------------------------------------------------------  ini ------------------------- fnSp3CargaListasHistoriaClinica_Interconsulta_transferencia

  //forzando los adjuntos
  idTransf = 1;



  showLoading();
  var tabla3;
  var ki = 0;

  // var url = "https://550m44ud1tmg7454-inspection-dev.azurewebsites.net/api/Get-Incidente-AccidenteWeb?code=GY7/yooa3Zl5sKu7zgakDbaCn4uvOKXjfwe/JkbSuIwDPOs/baiZFQ==&httpmethod=objectlist";
  // var url = apiUrlssoma+"/api/hce_Get_011_transferencias_adjunto?code=sRis0xUMFlJMZaBlT/ivHAzwTAjZtvY4ToxBzbY/qhTmFqj6eAV0bA==&IdTransferencias="+idTransf;
  var url = apiUrlsho + "/api/hce_Get_011_transferencias_adjunto?code=sRis0xUMFlJMZaBlT/ivHAzwTAjZtvY4ToxBzbY/qhTmFqj6eAV0bA==&IdTransferencias=1";
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


    if (response1.AdjuntoTransferencia.length > 0) {
      response1.AdjuntoTransferencia.map(function (Item) {
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
 
  if (visible == 0) { fnExcelReportPAHCx(); }
  if (visible == 1) { fnExcelReportPAHC2(); }

}




function fnExcelReportPAHCx() {
//alert('reporte 222222222222888888888888888888888822222222 xxxxxxxxxxxxxx = ');
  var tab_text = `

    <table  cellpadding="0" cellspacing="0" id="sheet0" style="table-layout: fixed;">
        <thead>
            
          <th bgcolor='#223962' style="border: 0px !important; color:#fff; ">Documento</th> 
          <th bgcolor='#223962' style="border: 0px !important; color:#fff; ">Nombres</th>
          <th bgcolor='#223962' style="border: 0px !important; color:#fff; ">Apellidos</th> 
          <th bgcolor='#223962' style="border: 0px !important; color:#fff; ">Gerencia</th>
          <th bgcolor='#223962' style="border: 0px !important; color:#fff; ">Planta</th>
          <th bgcolor='#223962' style="border: 0px !important; color:#fff; ">Área</th>

          <th bgcolor='#223962' style="border: 0px !important; color:#fff; ">Puesto de trabajo</th>
          <th bgcolor='#223962' style="border: 0px !important; color:#fff; ">Fecha de registro</th>
          <th bgcolor='#223962' style="border: 0px !important; color:#fff; ">Empresa</th>  

          <th bgcolor='#223962' style="border: 0px !important; color:#fff; ">Motivo de Atención</th>  
          <th bgcolor='#223962' style="border: 0px !important; color:#fff; ">Sistema Afectado</th>  
          <th bgcolor='#223962' style="border: 0px !important; color:#fff; ">Agregó descanso médico</th>
          <th bgcolor='#223962' style="border: 0px !important; color:#fff; ">Generó interconsulta</th>  
            
          <th bgcolor='#223962' style="border: 0px !important; color:#fff; ">Generó transferencia</th>  
         
          <th bgcolor='#223962' style="border: 0px !important; color:#fff; ">Diagnóstico</th>
        </thead>


    <tbody>
                
     `;


  tab_text = tab_text + HTMLEXCEL_AT;








  tab_text = tab_text + ` </tbody> 
     `;



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
  link.download = 'AtencionesMedicas';
  link.click();
}


function fnExcelReportPAHC2() {
 // alert('reporte 22222222222222222222');
  var tab_text = `

    <table  cellpadding="0" cellspacing="0" id="sheet0" style="table-layout: fixed;">
        <thead>
            
          <th bgcolor='#223962' style="border: 0px !important;">Documento</th> 
          <th bgcolor='#223962' style="border: 0px !important;">Nombres</th>
          <th bgcolor='#223962' style="border: 0px !important;">Apellidos</th> 
          <th bgcolor='#223962' style="border: 0px !important;">Gerencia</th>
          <th bgcolor='#223962' style="border: 0px !important;">Planta</th>
          <th bgcolor='#223962' style="border: 0px !important;">Área</th>

          <th bgcolor='#223962' style="border: 0px !important;">Puesto</th>
          <th bgcolor='#223962' style="border: 0px !important;">Empresa</th>
          <th bgcolor='#223962' style="border: 0px !important;">Código transferencia</th>  

          <th bgcolor='#223962' style="border: 0px !important;">Origen de transferencia</th>  
          <th bgcolor='#223962' style="border: 0px !important;">Código del origen</th>  
          <th bgcolor='#223962' style="border: 0px !important;">Establecimiento</th>
          <th bgcolor='#223962' style="border: 0px !important;">F. Transferencia</th>  
            
          <th bgcolor='#223962' style="border: 0px !important;">Recepción de respuesta</th>  
         
          <th bgcolor='#223962' style="border: 0px !important;">Diagnóstico</th>
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


  tab_text = tab_text + HTMLEXCEL2;








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
  let url = apiUrlsho + `/api/hce_Get_007_interconsulta_adjunto?code=VW1N50nYYj56xAlct5Jbn8Isl6loYB7pCaMEvYb3dB8aPBr/NMcgGg==`;

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
  let url = apiUrlsho + `/api/hce_Get_008_interconsulta_diagnosticoCIE10?code=mPgaeW14i/taia4aCEaauWCIBcSohTnpYgXAi9fY6mHp0OFyqV4rfQ==`;

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
    // console.log(response);
    paObj_hi[idInter].a.DiagnosticoCIE10 = response.DiagnosticoCIE;
  })
}

function cargarDatosInter() {
  let url = apiUrlsho + `/api/hce_Get_005_interconsulta?code=5apeYFqxMjc7U4gRbZFs/mBepNwlDkPcUymNTlP7kzOsv5AN3DYecg==`;

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
    datosInter['TipoCIE10'] = response.TipoCIE10;
    // console.log('cargo datos');
  })
}


// INTERACCIONES CON BOTONES
async function interSp3VerInterconsulta(IdInter, idHistoria) {
  console.log(`Inter ${IdInter}`)
  idInter = IdInter;
  showLoading();
  if (idHistoria) { idHC = idHistoria; }
  // console.log('################################################### OBJETO DE HISTORIA CLINICA ######################################')
  // console.log('################################################### ', paObj_hc[idHC].a,'      ######################################')

  // console.log('################################################### OBJETO DE HISTORIA CLINICA ######################################')





  handlerUrlhtml('contentGlobal', 'view/sho-hce/interconsultas_transferencias/formularioInterconsultasVer.html', 'Registro de interconsulta');
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

      $('#dat_int_empresa_interconsulta_ver').val(e.a.A_Empresa_Inter);
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
            nombre = j.Descripcion;
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
  let url = apiUrlsho + `/api/hce_Get_004_historia_clinica_paciente?code=wWY4/sz0URfHcAw3vKN9zqCqbtu96Y7zMka4N4wG6yhU8H173/bPzg==`;

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

  let url = apiUrlsho + `/api/hce_Get_005_interconsulta?code=5apeYFqxMjc7U4gRbZFs/mBepNwlDkPcUymNTlP7kzOsv5AN3DYecg==`;

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

  let url = apiUrlsho + `/api/hce_Get_006_transferencia?code=bdFhdqqPWPq62GBhPORONSYngrPBCDmZ6QnQdfIid4NdqCddRk7r3Q==`;

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
async function interSp3EditarInterconsulta(IdInter, IdHC) {
  idInter = IdInter;
  idHC = IdHC;
  showLoading();
  handlerUrlhtml('contentGlobal', 'view/sho-hce/interconsultas_transferencias/formularioInterconsultasEditar.html', 'Editar interconsulta');

  await cargarAdjuntosInter();
  await cargarDatosInter();
  await cargarDiagnosticosInter();

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

      sedeAreaGerencia.Area.forEach((e) => {
        if (e.Id == datosPerson.AreaId_Empresa_H) {
          $('#dat_int_area_trabajador_editar').append(`
          <option value="${e.Id}" selected>${e.Description}</option>
        `);
        }
      })

      sedeAreaGerencia.Sedes.forEach((e) => {
        if (e.Id == datosPerson.SedeId_Empresa_H) {
          $('#dat_int_planta_trabajador_editar').append(`
          <option value="${e.Id}" selected>${e.Description}</option>
        `);
        }
      })

      sedeAreaGerencia.Gerencia.forEach((e) => {
        if (e.Id == datosPerson.GerenciaId_Empresa_H) {
          $('#dat_int_gerencia_trabajador_editar').append(`
          <option value="${e.Id}" selected>${e.Description}</option>
        `);
        }
      })

      datosInter.Especialidades.forEach((e) => {
        $('#dat_int_especialidad_interconsulta').append(`
          <option value="${e.Id}" ${(e.Id == datosPerson.A_InterEspecialidad_Inter) ? 'selected' : ''}>${e.Descripcion}</option>
        `)
      })

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



      datosInter.TipoCIE10.forEach((e) => {
        $('#dat_int_cie_diagnostico').append(`
          <option value="${e.Id}"}>${e.Descripcion}</option>
        `)
      })

      datosInter.SistemasAfectados.forEach((e) => {
        $('#dat_int_sistema_diagnostico').append(`
          <option value="${e.Id}"}>${e.Descripcion}</option>
        `)
      })

      datosInter.SeccionAfectada.forEach((e) => {
        $('#dat_int_seccion_diagnostico').append(`
          <option value="${e.Id}"}>${e.Descripcion}</option>
        `)
      })

      interSp3CargarDiagnosticoEditarInterconsulta(datosPerson);
      interSp3CargarAdjuntoInterconsulta(datosPerson, 0);
      interSp3CargarAdjuntoInterconsulta(datosPerson, 1);

    }
  })
  hideLoading();
}

function interSp3CargarDiagnosticoEditarInterconsulta(datosPerson) {
  $('#content_int_diagnostico').html('');

  //alert('esaquiiiiiiiiiiiiiii 2854 atenciones medicas');

  datosPerson.DiagnosticoCIE10.forEach((i) => {
    let cantidad = 0;
    let tipoCie = '';
    let especialidad = '';
    let sistema = '';
    let seccion = '';

    datosInter.TipoCIE10.forEach((j) => {
      if (j.Id == i.CIE10) {
        nombre = j.Descripcion;
        especialidad = j.Especilidades;
         tipoCie = nombre;
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
  data.CIE10 = $('#dat_int_cie_diagnostico').val();
  data.SistemaAfectado = $('#dat_int_sistema_diagnostico').val();
  data.SeccionAfectada = $('#dat_int_seccion_diagnostico').val();
  data.IdHashUser = "IdHashUser";

  let url = apiUrlsho + `/api/hce_Post_011_interconsulta_diagnosticoCIE10?code=4M5YhOGG5A32YYKUNhMfbDdeXxHTOSYe8gcXlxZWTbEl6w/j0iIcdg==&httpmethod=post`;

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

  let url = apiUrlsho + `/api/hce_Post_012_interconsulta_diagnosticoCIE10_eliminadoLogico?code=m6BeAJk6OcXQwOagBE4uP9SjITlOWRkWIykHYMCCkHhQmu2BprkrCA==&httpmethod=post`;

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

    let url = apiUrlsho + `/api/hce_Post_009_interconsulta_adjunto?code=I1RvPusNaaBW/akZHO3zwxK/b9HeMZD7aF6V7WtIZtLzYyU/xawnYQ==&httpmethod=post`;

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


  let url = apiUrlsho + `/api/hce_Post_010_interconsulta_adjunto_eliminadoLogico?code=sZZFKjjXSHZfvFqLy0rgxaLdJ0FPvYxB2m90UVDw69CZcdtdZ5sm2Q==&httpmethod=post`;

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
    await cargarAdjuntosInter();
    interSp3CargarAdjuntoInterconsulta(paObj_hi[idInter].a, id);
  })
}

function interSp3GuardarInterconsulta() {

  let data = {};
  data.IdHC = idHC;
  data.IdInter = idInter;
  data.A_Empresa = $('#dat_int_empresa_interconsulta').val();
  data.A_InterEspecialidad = $('#dat_int_especialidad_interconsulta').val();
  data.A_InterMotivo = $('#dat_int_motivo_interconsulta').val();
  data.A_SeSolicita = $('#dat_int_solicita_interconsulta').val();
  data.A_Otros = $('#dat_int_otros_interconsulta').val();
  data.A_MedicoCargo = $('#dat_int_medico_cargo_interconsulta').val();
  data.A_MedicoCargo = $('#dat_int_solicita_interconsulta').val();
  data.A_CMP = $('#dat_int_cmp_interconsulta').val();
  data.A_IdHashMedico = 'A_IdHashMedico';

  data.B_RecibioRespuesta = $('input:radio[name=recibio_respuesta_int]:checked').val();
  data.B_InstitucionSalud = $('#dat_int_institucion_respuesta').val();
  data.B_FechaRespuesta = $('#dat_int_fecha_respuesta').val();
  data.B_HallazgoEval = $('#dat_int_hallazgos_respuesta').val();
  data.B_ExamenesAuxiliarers = $('#dat_int_examenes_respuesta').val();

  data.C_Recomendaciones = $('#dat_int_recomendaciones_recomendaciones').val();
  data.C_RequiereControles = $('input:radio[name=posteriores_int]:checked').val();
  data.C_ActitupParaLaboral = $('input:radio[name=aptitud_int]:checked').val();
  data.C_FechaProximoControl = $('#dat_int_fecha_proximo_recomendaciones').val();
  data.C_MedicoEvaluador = $('#dat_int_medico_evaluador_recomendaciones').val();
  data.C_IdHashMedico = 'IdHashMedico';
  data.C_CMP = $('#dat_int_cmp_recomendaciones').val();
  data.C_RNE = $('#dat_int_rne_recomendaciones').val();
  data.C_Otros = $('#dat_int_otros_recomendaciones').val();

  data.Tratamiento = $('#dat_int_tratamiento_diagnostico').val();
  data.CodigoOrigen = 'CodigoOrigen';
  data.IdOrigen = 1;
  data.IdTipoOrigen = 1;


  let url = apiUrlsho + `/api/hce_Post_008_interconsulta?code=p6WGKSBcccNRnMdgJ5xr5uWwAn/FAYyhahe4DRpyNTTZevUnTfPL0w==&httpmethod=post`;

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
    console.log(response);
    Swal.fire({
      title: "Se terminó con éxito el registro",
      iconColor: "#8fbb02",
      iconHtml: '<img src="./images/sho/check.svg" width="28px">',
      showConfirmButton: false,
      padding: "3em 3em 6em 3em ",
      timer: 1500,
    }).then(() => {
      handlerUrlhtml('contentGlobal', 'view/sho-hce/interconsultas_transferencias/gestionInterconsultasTransferencia.html', 'Registro de interconsultas y transferencias');
    });
  })
}

function intSp3ConfirmGuardarInterConsulta() {
  if (interSp3ValidarDatos('input_int_sp3').length > 0) {
    return
  }
  let nombres = $("#dat_int_nombres_trabajador_editar").val();
  let apellidos = $("#dat_int_apellidos_trabajador_editar").val();
  Swal.fire({
    title: "Guardar nueva Interconsulta en H.C.",
    html: `
    <p>Está por agregar una nueva intsreconsulta a la historia clínica de</p>
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
      interSp3GuardarInterconsulta();
    }
  });
}

function intSp3CancelarInterConsulta() {
  handlerUrlhtml('contentGlobal', 'view/sho-hce/interconsultas_transferencias/gestionInterconsultasTransferencia.html', 'Registro de interconsultas y transferencias');
}


function dgSp3AdjuntarImagen(img) {
  $('#hc_spin_adjuntar_imagen').show();
  let data = {}

  data.IdHC = idHC;
  data.NombreFoto = `foto_${idHC}_hc`;
  data.FotoPacienteBase64 = img;

  let url = apiUrlsho + `/api/hce_Post_005_historia_clinica_adjuntar_foto?code=s3R5opJMsUPopiAD1YCFEPahBYF0CV3vYou6A5Xz6yqkspClne5jAw==&httpmethod=post`;

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

// function interSp3ImprimirInterconsulta() {
//   //codigo eliminado
//   alert('desde gestion atenciones medicas un llamado vacio')
// }

//******************************************************************************************************************************************























function _init_fnSp3SaludOcupacionalEstadoInicial_ATM_HC() { //------------------------------------- ini   _init_fnSp3SaludOcupacionalEstadoInicial() -------------------------------------
  //console.clear();
  showLoading();
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
  //cargarAreasSedesGerencia_ATM_();

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

    if (response.transferencias.length > 0) {


      $('#bodyTablaSinAuditorias_trans').css('display', 'none');

      $('#pagination-container-EvalAud_trans').pagination({

        dataSource: response.transferencias,
        pageSize: 4,
        callback: function (data, pagination) {
          let obj = [];
          data.forEach((e) => {
            if (e.IdHC == idHC) {
              obj.push(e)
            }
          })
          var html = fnSp3ListarTablaGeneralH_trans_HC(obj);
          $('#body-tabla-list-EvalAud_trans').html(html);
          $('#cant_transf').html(`${obj.length} Registros`);

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









    if (response.Interconsult.length > 0) {

      $('#bodyTablaSinAuditorias_int').css('display', 'none');

      $('#pagination-container-EvalAud_int').pagination({
        dataSource: response.Interconsult,
        pageSize: 4,
        callback: function (data, pagination) {
          let obj = [];
          data.forEach((e) => {
            if (e.IdHC == idHC) {
              obj.push(e)
            }
          })
          var html = fnSp3ListarTablaGeneralH_int_HC(obj);
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

function cargarAreasSedesGerencia_ATM_() {
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
    //alert('dddddddddddddddddddddddddd')
    fnSp3CargaListasHistoriaClinica_Interconsulta_transferencia();
  })
}



function fnSp3CargarHistoriasClinicas() {//------------------------------------------------------------------------------------------------------------
  var body = { "AreaId_Empresa_H": 0, "SedeId_Empresa_H": 0 }

  //var url = +"/api/Get-Incidente-AccidenteWeb?code=GY7/yooa3Zl5sKu7zgakDbaCn4uvOKXjfwe/JkbSuIwDPOs/baiZFQ==&httpmethod=objectlist&IdTipoEvento="+programa+"&IdEmpresa="+gerencia+"&IdSede="+sedepa+"&FechaInicio="+f1+"&FechaFin="+f2+"&IdEmbarcacion="+estadopa
  var url =  apiUrlsho + "/api/hce_Get_001_historia_clinica?code=5lJWTsRDsoxqo9VoOxIzfQAPyCTxUTqLpvgY5tuHluCZlSodpQ/Y7w==";

  console.log("URL", url);
  var headers = { "apiKey": constantes.apiKey, "Content-Type": "application/json" }
  //alert('api = '+constantes.apiKey);

  var a = 0;
  var b = 0;
  var c = 0;
  var d = '';

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



    if (response.HistoriaClin.length > 0) {//---------------------------------------------------------------

      response.HistoriaClin.map(function (itemx) {


        paObj_hc[itemx.IdHC] = new HistoriaClinica();
        paObj_hc[itemx.IdHC].cargarData(itemx);


        paObj_HC[itemx.IdHC] = new HistoriaClinica();
        paObj_HC[itemx.IdHC].cargarData(itemx);
        console.log("***********3811***********todos**", itemx);

      });



    }//---------------------------------------------------------------


  });







}//------------------------------------------------------------------------------------------------------------



function buscadorInterconsultaTransferencia() {//---------------------------------------------------------------------------------------------

//alert('quien me llamo ='+visible);
  //lo primro es ver donde estamos inte o transf
 // if (visible == 0) {
    //alert('estamos en interconsulta');
    fnSp3CargaFiltroEstadoInicialSaludOcupacional_inc();
  // }
  // else {
  //   //alert('estamos en transferencia');
  //   fnSp3CargaFiltroEstadoInicialSaludOcupacional_trans();
  // }


}//---------------------------------------------------------------------------------------------






//######################################################################### BLOQUE CODIGO INTEGRACION ANDY 10-09-2021 ########################################################################


















//###################################################### PARA EL FUNCIONAMIENTO INDEPENDIENTE DESDE DATOS GENERALES ########################################################

function cargarAreasSedesGerencia_ATM_HC() {

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
























function fnSp3CargaFiltroEstadoInicialSaludOcupacional_Bandeja_ATM() { //------------------------------------- ini   fnSp3CargaFiltroEstadoInicialSaludOcupacional() -------------------------------------
  showLoading();

  var url = apiUrlsho + "/api/hce_Get_017_descanso-medico_busqueda?code=qiLgD8uqGlqrIjk1Y7P1NgNioYJRj/HQvmwq60UFvqerUH4Uz5Nwcw==&IdDescanso=&Gerencia=0&Planta=0&Area=0&Documento=0&Nombres&Apellidos&OrigenDescanso&FechaDesde&FechaHasta&Buscar"

  var headers = { "apiKey": constantes.apiKey, "Content-Type": "application/json" }

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

      // response.DiagnosticoCIE10.map(function(itemx) {

      //    D_IT[itemx.DescansoMedicoId] = itemx;

      // });
      // console.log("302 D_IT[]", D_IT);

      D_IT = response.DiagnosticoCIE10;



    } //---------------------------------------------------------------




    //HistoriaClinicaId
    let ttd = 0;
    response.DescansoMedico.map(function (itemx) {

      if (idHC == itemx.HistoriaClinicaId) {
        ttd = ttd + itemx.B_DiasAcumulados;
      }

    });

    $('#cant_acumulados').html('' + ttd + ' días acumulados');






    if (response.DescansoMedico.length > 0) {
      $('#cant_interc').html('' + response.DescansoMedico.length + ' registros');


      $('#bodyTablaSinAuditorias_int').css('display', 'none');

      $('#pagination-container-EvalAud_int').pagination({
        dataSource: response.DescansoMedico,
        pageSize: 2,
        callback: function (data, pagination) {

          //aqui vamos a validar solo los de esta historia clinica no todos ojo
          var html = fnSp3ListarTablaGeneral_BandejaDM(data);
          $('#body-tabla-list-EvalAud_int').html(html);

        }
      })



    } else {

      hideLoading();
    }



  });




} //------------------------------------- fin   fnSp3CargaFiltroEstadoInicialSaludOcupacional() -------------------------------------


function fnSp3ListarTablaGeneral_BandejaDM(data) { //------------------------------------------------------- ini   fnSp3ListarTablaGeneralH() -----------------------------------

  var html = '';
  var btNew = '';
  var width = 2450; //
  var width1 = 2430; //
  var width1 = 2420; //

  //alert('aqiooooooooooooooooooo 315');
  data.forEach((Item) => {

    //alert("idHC("+idHC+") = "+Item.HistoriaClinicaId)
    if (idHC == Item.HistoriaClinicaId) {//######################################################_ if(idHC == itemx.HistoriaClinicaId)_################################################################
      paObj_ATM_SHO[Item.Id] = new DescansoMedico();
      paObj_ATM_SHO[Item.Id].cargarData(Item);

      var f1 = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.A_FechaRegistro);
      var f_ini = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.B_FechaIni);
      var f_fin = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.B_FechaFin);

      let ds = f1.split('/');
      var im = ds[1];
      var Year = ds[2];

      var im = parseInt(im);
      Mes = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
      //alert(Mes[0])

      var menupop = `                   <div class="dropdown">
                                                              <button class=" btn-link dropdown textVertical" style='outline:none !important;' id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                <label class='textVertical'>...</label>
                                                              </button>

                                                              
                                                                <div class="dropdown-menu">  
                                                                      <a class="dropdown-item" onclick="fnVerDescanzoMedico_HC(${Item.Id}, ${idHC})"><img src="./images/sho/eyeIcon.svg" alt="" />&nbsp;&nbsp; Ver Registro</a>
                                                                    </div>
                                                              </div>
                                                            </div>
                                                          `;



      html += `
                                    
                                     <div class="col-md-12"   style=" width:101% !important; /*width:3650px !important;*/"   >
                                                                        <div class="header-tabla px-2 py-3 filaBandeja" style=" width:101% !important; /*width:3620px !important;*/ mmargin-rigth:30px !important; " > 

                                                                            <table border="0"  width="101%"  style=" /*width:3630px !important;*/  "  >   
                                                                                <tr >
                                                                                     
                                                                                      <td  style = 'width: 200px;'  align="center"><div id="c2TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${f_ini != null ? f_ini : "---"}</div></td>
                                                                                      <td  style = 'width: 200px;'  align="center"><div id="c2TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >&nbsp;&nbsp;&nbsp;${f_fin != null ? f_fin : "---"}</div></td>
                                                                                      <td  style = 'width: 200px;'  align="center"><div id="c9TabGenyx" class="text-center lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.B_CantidadDias != null ? Item.B_CantidadDias : "---"}</div></td> 
                                                                                      <td  style = 'width: 200px;'  align="center"><div id="c3TabGenyx" class="text-center lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.B_DiasAcumulados != null ? Item.B_DiasAcumulados : "---"}</div></td>
                                                                                      <td  style = 'width: 200px;'  align="center"><div id="c4TabGenyx" class="text-left  lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${Item.B_EstableceDescanso != 1 ? 'Pendiente por Aprobar' : "Aprobado"}</div></td>
                                                                                     
                                                                                      <td  style = 'width: 2px;'   align="left"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${menupop}</td>  
                                                                                      

                                                                            </table>
                                                                        </div>
                                                      </div>    

                                                  `;
    }//######################################################_ if(idHC == itemx.HistoriaClinicaId)_##############################################################





  });







  hideLoading();
  $('#lb_ho_it_interc ').html('Registros sistema SHO');

  // $('#dat_hc_a_area').val(0)
  // $('#dat_hc_a_sede').val(0)



  return html;


}
//------------------------------------- fin   fnSp3ListarTablaGeneralH() -------------------------------------





function fnVerDescanzoMedico_HC(idDescanso, idClinica, accionExtra) {//-------------------------------------------------------------   fnVerDescanzoMedico_HC($idDescanso, idClinica)  --------------------------------------------------------------

  //cargamos en la vista por el handler el nuevo formulario
  handlerUrlhtml('contentGlobal', 'view/sho-hce/descansos_medicos/Ver_DescansoMedico_HC.html', 'Ver Datos descanso medico ');

  id_ATM = idDescanso;
  idHC = idClinica;

  //alert('linea 4099 el descanzo medico es ='+id_ATM)
  //cargar las listas desplegables
  fnSp3Carga_Listas_Desplegables_ATM();//DENTRO DE ELLA LLAMAMOS A CARGAR LOS DATOS PERSONALES


  //LUEGO CARGAMOS LOS DIAGNOSTICOS CIE10


  //LUEGO LOS ADJUNTOS

}//-------------------------------------------------------------   fnVerDescanzoMedico_HC($idDescanso, idClinica)  --------------------------------------------------------------









function fnNuevoDescanzoMedico_HC() {//-------------------------------------------------------------   fnNuevoDescanzoMedico_HC($idDescanso, idClinica)  --------------------------------------------------------------

  idHC;

  //cargamos en la vista por el handler el nuevo formulario
  handlerUrlhtml('contentGlobal', 'view/sho-hce/descansos_medicos/nuevoDescanzoMedico_HC.html', 'Registro de descanso médico');
  newD = 1;

  //alert('entrando a fnNuevoDescanzoMedico_HC 4126');
  //fnSp3CrearNuevo_ATM_en_Blanco();
  fnSp3Carga_Listas_Desplegables_ATM();

}//-------------------------------------------------------------   fnNuevoDescanzoMedico_HC($idDescanso, idClinica)  --------------------------------------------------------------




function fnCargarDataPersonal_ATM(idClinica, idDescanso) {

  //alert('entrando a cargar los datos');
  //console.clear();
  console.log('######################################################## fnCargarDataPersonal_ATM  #############################################');
  console.log('fnCargarDataPersonal_ATM idclinica = ', idClinica);
  console.log('fnCargarDataPersonal_ATM id descanso = ', idDescanso);

  console.log('paObj_hc = ', paObj_hc[idClinica]);
  console.log('paObj_ATM_SHO = ', paObj_ATM_SHO[idDescanso].a);
  console.log('Diagnosticos = ', D_IT);
  console.log('######################################################## fnCargarDataPersonal_ATM  #############################################');




  $('#dat_des_dni_trabajador_v').val(paObj_hc[idClinica].a.NroDocumento_Trabajador_H);

  $('#dat_des_nombres_trabajador_v').val(paObj_hc[idClinica].a.Nombres_Trabajador_H);

  $('#dat_des_apellidos_trabajador_v').val(paObj_hc[idClinica].a.Apellidos_Trabajador_H);

  var f1 = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(paObj_ATM_SHO[idDescanso].a.A_FechaRegistro);
  $('#dat_des_fr_v').val(f1);

  $('#dat_des_fi_v').val(paObj_ATM_SHO[idDescanso].a.A_IdDescansoMedico);

  $('#dat_des_empresa_v').val(paObj_ATM_SHO[idDescanso].a.A_Empresa);

  $('#dat_des_origen_v').val(paObj_ATM_SHO[idDescanso].a.A_Origen);

  $('#dat_des_id_descanso_med_v').val(paObj_ATM_SHO[idDescanso].a.A_IdDescansoMedico);

  $('#dat_des_gerencia_v').val(paObj_hc[idClinica].a.GerenciaId_Empresa_H);

  $('#dat_des_planta_v').val(paObj_hc[idClinica].a.PlantaId_Empresa_H);

  $('#dat_des_area_v').val(paObj_hc[idClinica].a.AreaId_Empresa_H);

  $('#dat_des_id_atencion_med_v').val(paObj_hc[idClinica].a.PuestoTrabajo_Empresa_H);

  if (paObj_hc[idClinica].a.A_Estado == "Aprobado") {
    $('#dat_des_estado_v').val(1);
  } else { $('#dat_des_estado_v').val(0); }






  //----------------------- por aqui van los adjuntos ----------------------------







  $('#dat_des_personal_salud_v').val(paObj_ATM_SHO[idDescanso].a.B_PersonalSolicitud);
  $('#dat_des_tipo_contingencia_v').val(paObj_ATM_SHO[idDescanso].a.B_TipoContingencia);
  $('#dat_des_descanso_enfermedad_v').val(paObj_ATM_SHO[idDescanso].a.B_DescansoPorEnfermedad);
  $('#dat_des_cmp_v').val(paObj_ATM_SHO[idDescanso].a.B_CMP);
  $('#dat_des_cant_dias_v').val(paObj_ATM_SHO[idDescanso].a.B_CantidadDias);
  $('#dat_des_dias_ac_v').val(paObj_ATM_SHO[idDescanso].a.B_DiasAcumulados);


  var f2 = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(paObj_ATM_SHO[idDescanso].a.B_FechaIni); //alert(f2);
  $('#dat_des_fi_v2').val(f2);

  var f3 = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(paObj_ATM_SHO[idDescanso].a.B_FechaFin)
  $('#dat_des_ff_v').val(f3);



  $('#dat_des_alta_med_v').val(paObj_ATM_SHO[idDescanso].a.B_HuboAltaMedica);
  $('#dat_des_establecimiento_emisión_v').val(paObj_ATM_SHO[idDescanso].a.IdEstEmisDesc);
  $('#dat_des_particular_v').val(paObj_ATM_SHO[idDescanso].a.B_PersonalSolicitud);


  hideLoading();

  interSp3CargarAdjunto_Ver_ATM(idDescanso)

  interSp3CargarAdjunto_Ver_ATM2(idDescanso)

  //alert('haciendo el llmado..........4220.................');
  sp3CargaLosCie10_1_Ver(idDescanso)


}

function fnSp3Carga_Listas_Desplegables_ATM() { //--------------------------------------------------------------------------------------------------------------  ini ------------------------- fnSp3CargaListasHistoriaClinica_Interconsulta_transferencia

  showLoading();


  $("#" + 'dat_hc_it_a_gerencia').html("Cargando ...");
  $("#" + 'dat_des_planta_v').html("Cargando ...");
  $("#" + 'dat_des_area_v').html("Cargando ...");

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
    $("#" + 'dat_des_gerencia_v').html(" ");
    $("#" + 'dat_des_gerencia_v').css('font-size', '13px');
    $("#" + 'dat_des_gerencia_v').html("<option selected value='0'>          </option>");



    response1.Gerencia.map(function (item) {
      $("#" + 'dat_des_gerencia_v').append(`<option value='${item.Id}' title='${item.Description}' style='font-weight: bold;'>${item.Description}</option>`);

      lk++;
      if (l == lk) { //----------------------------------------------------------------------------------------------------------



        //------------------------------------------------------------------------------------------------------------------------------------------------------------
        $("#" + 'dat_des_planta_v').html(" ");
        $("#" + 'dat_des_planta_v').css('font-size', '13px');
        $("#" + 'dat_des_planta_v').html("<option selected value='0'>          </option>");


        response1.Sedes.map(function (item) {
          $("#" + 'dat_des_planta_v').append(`<option value='${item.Id}' title='${item.Description}' style='font-weight: bold;'>${item.Description}</option>`);

          nk++;
          if (n == nk) { //-----------------------------------------------------------------------

            $("#" + 'dat_des_area_v').html(" ");
            $("#" + 'dat_des_area_v').css('font-size', '13px');
            $("#" + 'dat_des_area_v').html("<option selected value='0'>          </option>");


            response1.Area.map(function (item) {
              $("#" + 'dat_des_area_v').append(`<option value='${item.Id}' title='${item.Description}' style='font-weight: bold;'>${item.Description}</option>`);

              mk++;
              if (m == mk) { //--------------------------------------------------------------------------------------------------------------------------------------------
                // fnSp3CargaFiltroEstadoInicialSaludOcupacional_inc();
                // fnSp3CargaFiltroEstadoInicialSaludOcupacional_trans();
                // fnSp3CargarHistoriasClinicas();

                /// alert(' 4308   newd = '+newD);
                if (newD == 0) {

                  fnSp3Carga_Combos_Listas_cie10(idHC, 'dat_des_cie10_v', 'dat_des_sis_afectado_v', 'dat_des_sec_afectada_v')
                }
                else {
                  if (newD == 1) {
                    ///alert('a punto de llamar fnSp3Carga_Combos_Listas_cie10 4308');
                    fnSp3Carga_Combos_Listas_cie10(idHC, 'dat_des_cie10_v', 'dat_des_sis_afectado_v', 'dat_des_sec_afectada_v')
                  }
                }


              } //-----------------------------------------------------------------------------------------------------------------------------------------
            });

          } //-----------------------------------------------------------------------
        });


      } //----------------------------------------------------------------------------------------------------------

    });
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------








  }




  );

} //--------------------------------------------------------------------------------------------------------------  ini ------------------------- fnSp3CargaListasHistoriaClinica_Interconsulta_transferencia





function fnSp3Carga_Combos_Listas_cie10(idHistoriaClinica, id1, id2, id3) {//--------------------------------------------------------------------------------------------------------------
  // alert('dentro de fnSp3Carga_Combos_Listas_cie10');

  showLoading();
  $("#" + id1).html("Cargando...");
  $("#" + id2).html("Cargando...");//sistema afectado
  $("#" + id3).html("Cargando...");//sistema afectado



  // $("#" + 'dat_des_cie10_v_2').html("Cargando...");
  // $("#" + 'dat_int_tran_sist_af_2').html("Cargando...");
  // $("#" + 'dat_int_tran_seccion_af_2').html("Cargando...");



  var url = apiUrlsho + "/api/hce_Get_006_transferencia?code=bdFhdqqPWPq62GBhPORONSYngrPBCDmZ6QnQdfIid4NdqCddRk7r3Q==&IdHC=" + idHistoriaClinica;
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
    console.log("**fnSp3CargaListaFormTransferencia4................**", response1);
    // TipoCIE10
    // SistemasAfectados
    // SeccionAfectada

    if (response1.TipoCIE10.length > 0) {

      $("#" + id1).html(" "); $("#" + id1).css('font-size', '13px'); $("#" + id1).html("<option selected value='0'>          </option>");
      // $("#" + 'dat_des_cie10_v_2').html(" "); $("#" + 'dat_des_cie10_v_2').css('font-size', '13px'); $("#" + 'dat_des_cie10_v_2').html("<option selected value='0'>          </option>");
      for (let i = 0; i < 100; i++) {
        let item = response1.TipoCIE10[i];
        lt1[item.Id] = response1.TipoCIE10[i];

        $("#" + id1).append(`<option value='${item.Id}' title='${item.Especilidades}' style='font-weight: bold;'>${item.Descripcion}</option>`);
        //$("#" + 'dat_des_cie10_v_2').append(`<option value='${item.Id}' title='${item.Especilidades}' style='font-weight: bold;'>${item.Descripcion}</option>`);

      }


      if (response1.SistemasAfectados.length > 0) {
        n = response1.SistemasAfectados.length;
        $("#" + id2).html(" "); $("#" + id2).css('font-size', '13px'); $("#" + id2).html("<option selected value='0'>          </option>");
        //$("#" + 'dat_int_tran_sist_af_2').html(" "); $("#" + 'dat_int_tran_sist_af_2').css('font-size', '13px'); $("#" + 'dat_int_tran_sist_af_2').html("<option selected value='0'>          </option>");
        for (let i = 0; i < n; i++) {
          let item = response1.SistemasAfectados[i];
          lt2[item.Id] = response1.SistemasAfectados[i];

          $("#" + id2).append(`<option value='${item.Id}' title='${item.Especilidades}' style='font-weight: bold;'>${item.Descripcion}</option>`);
          //$("#" + 'dat_int_tran_sist_af_2').append(`<option value='${item.Id}' title='${item.Especilidades}' style='font-weight: bold;'>${item.Descripcion}</option>`);

        }


        if (response1.SeccionAfectada.length > 0) {
          n = response1.SeccionAfectada.length;
          $("#" + id3).html(" "); $("#" + id3).css('font-size', '13px'); $("#" + id3).html("<option selected value='0'>          </option>");
          //$("#" + 'dat_int_tran_seccion_af_2').html(" "); $("#" + 'dat_int_tran_seccion_af_2').css('font-size', '13px'); $("#" + 'dat_int_tran_seccion_af_2').html("<option selected value='0'>          </option>");
          for (let i = 0; i < n; i++) {
            let item = response1.SeccionAfectada[i];
            lt3[item.Id] = response1.SeccionAfectada[i];

            $("#" + id3).append(`<option value='${item.Id}' title='${item.Especilidades}' style='font-weight: bold;'>${item.Descripcion}</option>`);
            //$("#" + 'dat_int_tran_seccion_af_2').append(`<option value='${item.Id}' title='${item.Especilidades}' style='font-weight: bold;'>${item.Descripcion}</option>`);

          }

          //alert(' 4308   newd = '+newD);
          if (newD == 0) {
            fnCargarDataPersonal_ATM(idHC, id_ATM)
          }
          else {
            if (newD == 1)//si se esta creando un nuevo registro que debe hacer busca la data vacía ya que siempre es editar
            {
              fnSp3CrearNuevo_ATM_en_Blanco();
            }
          }

        }


      }

      //if(isNow == 1){fnSp3EditarNuevaTransferencia(istAud);}
    }










    //------------------------------------------------------------------------------------------------------------------------------------------------------------

  });



}//--------------------------------------------------------------------------------------------------------------





function interSp3CargarAdjunto_Ver_ATM(idTransf) {
  //idTransf = 1;
  showLoading();
  $('#lb_ad_transf ').html('Cargando.....')


  showLoading();
  var tabla3;
  var ki = 0;


  var url = apiUrlsho + "/api/hce_Get_015_descanso_medico_adjunto?code=i6xazENYmFYc1heRmEL16CXddl7WG6y3B63xt3/ZkBZnAjfjYJpJJw==&IdDescandoMedico=" + idTransf;
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
    console.log("**interSp3CargarAdjunto_Ver_ATM**", response1);


    if (response1.AdjuntoInterconsult.length > 0) {
      response1.AdjuntoInterconsult.map(function (Item) {
        // alert('entre aqui 1167')
        //console.log("**_________________________________________________paObj_ht[istAud].a.Adjuntos[ki] __**", paObj_ht[istAud].a.Adjuntos);
        paObj_ATM_SHO[idTransf].a.Adjuntos[Item.Id] = Item;
        var f1a = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.CreadoFecha);
        tabla3 += `
                            <tr>
                                <td>${Item.NombreArchivo != null ? Item.NombreArchivo : "---"}</td>
                                <td>${f1a != null ? f1a : "---"}</td>

                                <td>
                                  <button type="button" class="btn btn-link shadow-none float-right">
                                      <img class="inject-svg" src="./images/sho/download.svg" alt="" fill="#8fbb02" width="16px" onclick = 'fnSp3mostrarAdjunto_ATM(1,${Item.Id})' title='Descargar Adjunto' > 
                                  </button>
                                </td>

                             </tr>
                               `;

        ki++;
        //alert("1167-------------"+ki)

      });

      //if(istAud == 0)//-----------------SOLO EN CASO DE EDITAR LOS DATOS

      //if(istAud == 1){sp3CargaLosCie10_1(istAud); sp3CargaLosCie10_2(istAud);}

      if (ki > 0) {
        // $('#lb_diag_3_int').html(""+ki+" registros");
        $('#lb_diag_3_tabla').html(" ");
        $('#lb_diag_3_tabla').html(tabla3);

        $('#table_trans_adjunto_ciex').css('display', 'block');
        $('#lb_diag_3_int').css('display', 'block');
        $('#iconAdjT').css('display', 'block');
        $('#noAdj_Trnas').css('display', 'none');
        $('#noAdj_Trnas').css('visibility', 'hidden');
      }
      else {
        $('#table_trans_adjunto_ciex').css('display', 'none');
        $('#lb_diag_3_int').css('display', 'none');
        $('#iconAdjT').css('display', 'none');
        $('#noAdj_Trnas').css('display', 'block');
        $('#noAdj_Trnas').css('visibility', 'visible');

      }


      // $('#lb_ad_transf ').html('Archivos adjuntados ')
      hideLoading();




    }

    //------------------------------------------------------------------------------------------------------------------------------------------------------------

  });

  // alert("1194-------------"+ki)



}//--------------------------------------------------------------------------------------------------------------  ini ------------------------- fnSp3CargaListasHistoriaClinica_Interconsulta_transferencia

function interSp3CargarAdjunto_Ver_ATM2(idTransf) {
  // idTransf = 1;
  showLoading();
  $('#lb_ad_transf ').html('Cargando.....')


  showLoading();
  var tabla3;
  var ki = 0;


  var url = apiUrlsho + "/api/hce_Get_016_descanso_medico_adjunto_detalles?code=oCoKIX4/1gPQWX1a0/aCCaSenrFTUHbkpWYMAaamJddXbcEy3kgDeA==&IdDescandoMedico=" + idTransf;
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
    console.log("**interSp3CargarAdjunto_Ver_ATM2**", response1);


    if (response1.AdjuntoInterconsult.length > 0) {
      response1.AdjuntoInterconsult.map(function (Item) {
        // alert('entre aqui 1167')
        //console.log("**_________________________________________________paObj_ht[istAud].a.Adjuntos[ki] __**", paObj_ht[istAud].a.Adjuntos);
        paObj_ATM_SHO[idTransf].a.Adjuntos[Item.Id] = Item;
        var f1a = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.CreadoFecha);
        tabla3 += `
                            <tr>
                                <td>${Item.NombreArchivo != null ? Item.NombreArchivo : "---"}</td>
                                <td>${f1a != null ? f1a : "---"}</td>

                                <td>
                                  <button type="button" class="btn btn-link shadow-none float-right">
                                      <img class="inject-svg" src="./images/sho/download.svg" alt="" fill="#8fbb02" width="16px" onclick = 'fnSp3mostrarAdjunto_ATM(1,${Item.Id})' title='Descargar Adjunto' > 
                                  </button>
                                </td>

                             </tr>
                               `;

        ki++;
        //alert("1167-------------"+ki)

      });

      //if(istAud == 0)//-----------------SOLO EN CASO DE EDITAR LOS DATOS

      //if(istAud == 1){sp3CargaLosCie10_1(istAud); sp3CargaLosCie10_2(istAud);}

      if (ki > 0) {
        // $('#lb_diag_3_int').html(""+ki+" registros");
        $('#lb_diag_3_tabla2').html(" ");
        $('#lb_diag_3_tabla2').html(tabla3);

        $('#table_trans_adjunto_ciex2').css('display', 'block');
        $('#lb_diag_3_int2').css('display', 'block');
        $('#iconAdjT2').css('display', 'block');

        // $('#noAdj_Trnas2').css('height', '0px');
        $('#noAdj_Trnas2').css('display', 'none');
        $('#noAdj_Trnas2').css('visibility', 'hidden');
      }
      else {
        $('#table_trans_adjunto_ciex2').css('display', 'none');
        $('#lb_diag_3_int2').css('display', 'none');
        $('#iconAdjT2').css('display', 'none');
        $('#noAdj_Trnas2').css('display', 'block');
        $('#noAdj_Trnas2').css('visibility', 'visible');
      }


      // $('#lb_ad_transf ').html('Archivos adjuntados ')
      hideLoading();




    }

    //------------------------------------------------------------------------------------------------------------------------------------------------------------

  });

  // alert("1194-------------"+ki)



}//--------------------------------------------------------------------------------------------------------------  ini ------------------------- fnSp3CargaListasHistoriaClinica_Interconsulta_transferencia





function sp3CargaLosCie10_1_Ver(IdTransf) {


  //IdTransf = 1; //esta forzado

  var ikk = 0;


  var headers = { "apiKey": constantes.apiKey, "Content-Type": "application/json" }
  showLoading();

  var url = apiUrlsho + "/api/hce_Get_014_descanso_medico_diagnosticoCIE10?code=/J44W6Q4iAAgb6cxLiqZKMLhKa6QAOFNoNsOlVU0KHWXrK3n053ELQ==&IdDescansoMedico=" + IdTransf;
  var tabla;
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

    console.log("** Buscando........................925 cie10...*", response);

    $('#lb_diag_1_tabla').html(" ");
    $('#lb_diag_1_int').html("" + ikk + " registros");
    response.DiagnosticoCIE.map(function (Item) {

      if (Item.DescansoMedicoId > 0) {//----------------------------------------------------------------------------------
        var f1a = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.CreadoFecha);

        // $('#dat_int_tran_cie10').val(Item.CIE10);                        let b = $('#dat_int_tran_cie10 option:selected').text();
        // $('#dat_int_tran_sis_af').val(Item.SistemaAfectado);             let c = $('#dat_int_tran_sis_af option:selected').text();
        // $('#dat_int_tran_seccion_af').val(Item.SeccionAfectada);         let d = $('#dat_int_tran_seccion_af option:selected').text();
        //                                                                  //let e =  $('#dat_int_tran_cie10').attr('title');
        //                                                                  let e = $('#dat_int_tran_cie10 option:selected').attr('title');


        console.log('********************  lt1[' + Item.CIE10 + '] = ', lt1)

        let b = lt1[Item.CIE10].Descripcion;
        console.log('********************  lt1[' + Item.CIE10 + '] = ', lt1[Item.CIE10])

        let c = lt2[Item.SistemaAfectado].Descripcion;
        let d = lt3[Item.SeccionAfectada].Descripcion;
        let e = lt1[Item.CIE10].Especilidades;

        tabla += `
                            <tr>
                              <td>${Item.Diagnostico != null ? Item.Diagnostico : "---"}</td>
                              <td>${b != null ? b : "---"}</td>
                              <td>${f1a != null ? f1a : "---"}</td>
                              <td>${e != null ? e : "---"}</td>
                              <td>${c != null ? c : "---"}</td>
                              <td>${d != null ? d : "---"}</td>
                            </tr>

                       `;

        $('#lb_diag_1_tabla').append(tabla);
        ikk = ikk + 1;
        $('#lb_diag_1_int_t').html("" + ikk + " registros");
        tabla = '';

        $('#dat_des_diagnostico_v').val('');
        $('#dat_des_cie10_v').val(0);
        $('#dat_des_sis_afectado_v').val(0);
        $('#dat_des_sec_afectada_v').val(0);
      }//---------------------------------------------------------------------------------

    });

    hideLoading();
    //$('#lb_bt1').html('Agregar a lista');
    //$('#btn_int_diagnostico_agregar').attr("disabled",false);

  });






  // SVGInject($(".inject-svg"));


}








function fnSp3mostrarAdjunto_ATM(modulo, i) {//--------------------------------------------------------------------------------------------------------


  switch (modulo) {

    // case 0://interconsualta
    //         alert(i);
    // break;


    case 1://transferencia
      console.log('datsos del adjunto', paObj_ATM_SHO[id_ATM].a.Adjuntos);
      //console.log(paObj_ht[istAud].a.Adjuntos[i]);

      url = paObj_ATM_SHO[id_ATM].a.Adjuntos[i].ArchivoBase64;//"data:application/msword;base64," + x[1];
      fetch(url)
        .then(res => res.blob())
        .then(function (blob) {
          downloadBlob(blob, paObj_ATM_SHO[id_ATM].a.Adjuntos[i].NombreArchivo);
        });

      break;

    // case 5://formato exportable

    //       console.log();

    //        url = FORMATO_EXPORTABLE;//"data:application/msword;base64," + x[1];
    //       fetch(url)
    //       .then(res => res.blob())
    //       .then(function(blob) {
    //         downloadBlob(blob, 'FormatoImpresoTransferencia'+paObj_ht[istAud].a.A_CodeTransferencia+'.pdf');
    //       });

    // break;




  }






}//--------------------------------------------------------------------------------------------------------


function downloadBlob(blob, filename) {
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, filename);
  } else {
    var elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }
}



function fnSp3CrearNuevo_ATM_en_Blanco() {//------------------------------------------------------------------------------------------------------------


  var hoy = new Date();
  var mes = hoy.getMonth() + 1;
  var dia = hoy.getDate();
  if (mes < 10) { mes = '0' + mes; }
  if (dia < 10) { dia = '0' + dia; }

  var f1 = hoy.getFullYear() + '-' + mes + '-' + dia;



  $('#dat_des_dni_trabajador_v').val(paObj_hc[idHC].a.NroDocumento_Trabajador_H);

  $('#dat_des_nombres_trabajador_v').val(paObj_hc[idHC].a.Nombres_Trabajador_H);

  $('#dat_des_apellidos_trabajador_v').val(paObj_hc[idHC].a.Apellidos_Trabajador_H);

  //var f1 = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(paObj_ATM_SHO[idDescanso].a.A_FechaRegistro);
  $('#dat_des_fr_v').val(f1);

  $('#dat_des_fi_v').val(f1);

  $('#dat_des_empresa_v').val('');

  $('#dat_des_origen_v').val(0);

  $('#dat_des_id_descanso_med_v').val('');

  $('#dat_des_gerencia_v').val(paObj_hc[idHC].a.GerenciaId_Empresa_H);

  $('#dat_des_planta_v').val(paObj_hc[idHC].a.PlantaId_Empresa_H);

  $('#dat_des_area_v').val(paObj_hc[idHC].a.AreaId_Empresa_H);

  $('#dat_des_id_atencion_med_v').val(paObj_hc[idHC].a.PuestoTrabajo_Empresa_H);//puesto de trabajo

  $('#dat_des_estado_v').val(0);



  $('#dat_des_personal_salud_v').val('');
  $('#dat_des_tipo_contingencia_v').val(0);
  $('#dat_des_descanso_enfermedad_v').val(0);
  $('#dat_des_cmp_v').val('');
  $('#dat_des_cant_dias_v').val(0);
  $('#dat_des_dias_ac_v').val(0);


  //var f2 = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(paObj_ATM_SHO[idDescanso].a.B_FechaIni); //alert(f2);
  $('#dat_des_fi_v2').val(f1);

  //var f3 = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(paObj_ATM_SHO[idDescanso].a.B_FechaFin)
  $('#dat_des_ff_v').val(f1);



  $('#dat_des_alta_med_v').val(0);//hubo alt medica
  $('#dat_des_establecimiento_emisión_v').val(0);
  $('#dat_des_particular_v').val('');



  var body =

  {
    "IdHC": idHC, //Id Historia clinica
    "IdDescM": 0,
    "A_DniTrabajador": $('#dat_des_dni_trabajador_v').val(),
    "A_NombreTrabjador": $('#dat_des_nombres_trabajador_v').val(),
    "A_ApellidosTrabajador": $('#dat_des_apellidos_trabajador_v').val(),
    "A_Empresa": $('#dat_des_empresa_v').val(),
    "A_Origen": $('#dat_des_origen_v').val(),
    "A_IdAtencionMedica": 0,//preguntar como se vincula???

    "A_Gerencia": $('#dat_des_gerencia_v').val(),
    "A_Planta": $('#dat_des_planta_v').val(),
    "A_Area": $('#dat_des_area_v').val(),
    "A_PuestoTrabajo": $('#dat_des_id_atencion_med_v').val(),
    "B_PersonalSolicitud": $('#dat_des_personal_salud_v').val(),
    "B_PersonalIdHash": "",
    "B_TipoContingencia": $('#dat_des_tipo_contingencia_v').val(),
    "B_DescansoPorEnfermedad": $('#dat_des_descanso_enfermedad_v').val(),

    "B_CMP": $('#dat_des_cmp_v').val(),
    "B_CantidadDias": $('#dat_des_cant_dias_v').val(),
    "B_DiasAcumulados": $('#dat_des_dias_ac_v').val(),
    "B_FechaIni": f1,

    "B_FechaFin": f1,
    "B_HuboAltaMedica": $('#dat_des_alta_med_v').val(),
    "B_EstableceDescanso": $('#dat_des_establecimiento_emisión_v').val(),
    "B_Particular": $('#dat_des_particular_v').val()
  }


  // var body = 

  //  {
  //         "IdHC": idHC, //Id Historia clinica
  //         "IdDescM": 0,
  //         "A_DniTrabajador": "",
  //         "A_NombreTrabjador": "",
  //         "A_ApellidosTrabajador": "",
  //         "A_Empresa": "",
  //         "A_Origen": 0,
  //         "A_IdAtencionMedica": 0,

  //           "A_Gerencia": 0,
  //         "A_Planta": 0,
  //         "A_Area": 0,
  //         "A_PuestoTrabajo": "",
  //         "B_PersonalSolicitud": "",
  //         "B_PersonalIdHash": "",
  //         "B_TipoContingencia": 0,
  //         "B_DescansoPorEnfermedad": 0,

  //         "B_CMP": "",
  //         "B_CantidadDias": 0,
  //         "B_DiasAcumulados": 0,
  //         "B_FechaIni": "2021-06-06",

  //         "B_FechaFin": "2021-07-08",
  //         "B_HuboAltaMedica": 1,
  //         "B_EstableceDescanso": 1,
  //         "B_Particular": ""
  // }





  var url = apiUrlsho + "/api/hce_Post_023_descanso_medico?code=ZMMXyYQzh2QaROc92eMe55BMlkkckJVD9r9mxqTmHFpCUXm75EvSsQ==&httpmethod=post";

  console.log('urlr:', url)
  console.log('body new descanso:', body)

  var headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json",
  }

  $.ajax({
    method: 'POST',
    url: url,
    headers: headers,
    data: JSON.stringify(body),
    crossDomain: true,
    dataType: "json",
  }).done(function (data) {

    console.log('después crear', data);
    if (data.Id > 0) {
      //isNow = 0;
      //alert('el registro de la descanso medico tiene el Id = '+data.Id );
      hideLoading();
      paObj_ATM_SAP[data.Id] = new DescansoMedico();
      paObj_ATM_SAP[data.Id].cargarData(data);

      //istAud2 //histria clinica
      id_ATM = data.Id;
      //fnSp3CargaListaFormTransferencia4(data.Id)

      //istAud = data.Id;


    }

  })
    .fail(function (jqXHR, textStatus, errorThrown) {

      alert('Al Crear el registro de Descanso Médicos' + 'Intente Nuevamente');

    })
    .always(function (jqXHR, textStatus, errorThrown) {

    });


}//--------------------------------------------------------------------------------------------------------------




function agregarAdjunto_2_ATM() {

}





function agregarAdjunto_1_ATM(element, id) {
  //$(`#int_spin_guardar_adjunto_${id}`).show();
  //lb_bt_adjuntarEditar
  $('#lb_bt_adjuntarEditar').html(` <div class="spinner-border spinner-border-sm" id="int_spin_guardar_adjunto_0" role="status" style="display: block;">
              <span class="sr-only">Adjuntando..</span>
</div `);

  let file = element.files[0];
  let reader = new FileReader();
  var nameFile = '';
  reader.onloadend = function () {

    nameFile = element.files[0].name;
    let data = {};
    data.IdDescansoMedico = id_ATM;
    data.IdDescMedAdj = 0;
    data.NombreArchivo = element.files[0].name;
    data.IdHashUser = getCookie("vtas_id_hash" + sessionStorage.tabVisitasa);
    data.ArchivoBase64 = reader.result;

    let url = apiUrlsho + `/api/hce_Post_026_descanso_medico_adjunto?code=Yw42GGECBezciqikQakRh/yqFSMnMO7lehs6hIf80A2XzlspDWtkew==&httpmethod=post`;

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
      console.log("Se guardaria el adjunto............", response);

      $(`#int_spin_guardar_adjunto_${id}`).hide();


      nameFile = "Adjuntado: " + response.NombreArchivo;
      $(`#lb_bt_adjuntarEditar`).html(nameFile + ` 
                        <img class="inject-svg" src="./images/sho/upload.svg" fill="#fff" style="width:14px !important" />`);



      //aqui volvemos a car gar desde ajax los adjuntos
    })
  }
  reader.readAsDataURL(file);
}



function agregarAdjunto_2_ATM(element, id) {
  //$(`#int_spin_guardar_adjunto_${id}`).show();
  //lb_bt_adjuntarEditar
  $('#lb_bt_adjuntarEditar2').html(` <div class="spinner-border spinner-border-sm" id="int_spin_guardar_adjunto_0" role="status" style="display: block;">
              <span class="sr-only">Adjuntando..</span>
</div `);

  let file = element.files[0];
  let reader = new FileReader();
  var nameFile = '';
  reader.onloadend = function () {

    nameFile = element.files[0].name;
    let data = {};
    data.IdDescansoMedico = id_ATM;
    data.IdDescMedAdj = 0;
    data.NombreArchivo = element.files[0].name;
    data.IdHashUser = getCookie("vtas_id_hash" + sessionStorage.tabVisitasa);
    data.ArchivoBase64 = reader.result;

    let url = apiUrlsho + `/api/hce_Post_028_descanso_medico_adjunto_detalles?code=YC1grBN6HgHSibcvm3IVlATt8DQ7OKgzfW0iUT07yUaIKVAG97EEMA==&httpmethod=post`;

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
      console.log("Se guardaria el adjunto............", response);

      $(`#int_spin_guardar_adjunto_${id}`).hide();


      nameFile = "Adjuntado: " + response.NombreArchivo;
      $(`#lb_bt_adjuntarEditar2`).html(nameFile + ` 
                        <img class="inject-svg" src="./images/sho/upload.svg" fill="#fff" style="width:14px !important" />`);



      //aqui volvemos a car gar desde ajax los adjuntos
    })
  }
  reader.readAsDataURL(file);
}




function agregarDignosticoCIE10_ATM() {//--------------------------------------------------------------------------------------------------------------



  $('#lb_bt1').html(' Agregando ......');
  $('#btn_int_diagnostico_agregar').attr("disabled", true);

  let a = $('#dat_des_diagnostico_v').val();
  let b = $('#dat_des_cie10_v').val();
  let c = $('#dat_des_sis_afectado_v').val();
  let d = $('#dat_des_sec_afectada_v').val();


  let body = {
    "IdDescansoMedico": id_ATM,
    "TransferenciaId2": 0,

    "Diagnostico": a,
    "CIE10": b,
    "IdHashUser": getCookie("vtas_id_hash" + sessionStorage.tabVisitasa),
    "SistemaAfectado": c,
    "SeccionAfectada": d
  }

  var url = apiUrlsho + "/api/hce_Post_024_descanso_medico_diagnosticoCIE10?code=aN5mlWKDseFSRycTtVpr2bh6tWq4qzDff0qeQvcPmPImyOvd9PcxGA==&httpmethod=post";

  console.log('urlr:', url)

  var headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json",
  }

  $.ajax({
    method: 'POST',
    url: url,
    headers: headers,
    data: JSON.stringify(body),
    crossDomain: true,
    dataType: "json",
  }).done(function (data) {

    console.log('despues crear lista cie10', data);
    if (data.Id > 0) {
      //alert('el reguistro de la descanso medico tiene el Id = '+data.Id );

      sp3CargaLosCie10_1_ATM(id_ATM);

      hideLoading();

    }

  })
    .fail(function (jqXHR, textStatus, errorThrown) {

      ///verModalError('Al Cargar la', 'Intente Nuevamente');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al al cargar, intente nuevamente',
        footer: '<a href="">Why do I have this issue?</a>'
      })

    })
    .always(function (jqXHR, textStatus, errorThrown) {

    });

}//--------------------------------------------------------------------------------------------------------------


function sp3CargaLosCie10_1_ATM(IdTransf) {


  var ikk = 0;


  var headers = { "apiKey": constantes.apiKey, "Content-Type": "application/json" }
  showLoading();

  var url = apiUrlsho + "/api/hce_Get_014_descanso_medico_diagnosticoCIE10?code=/J44W6Q4iAAgb6cxLiqZKMLhKa6QAOFNoNsOlVU0KHWXrK3n053ELQ==&IdDescansoMedico=" + IdTransf;
  var tabla;
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

    console.log("** Buscando........................925 cie10...*", response);

    $('#table_diagn_cie110_1').html(" ");
    $('#lb_diag_1_int_t').html("" + ikk + " registros");
    response.DiagnosticoCIE.map(function (Item) {

      if (Item.DescansoMedicoId > 0) {//----------------------------------------------------------------------------------
        var f1a = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.CreadoFecha);

        $('#dat_des_cie10_v').val(Item.CIE10); let b = $('#dat_des_cie10_v option:selected').text();
        $('#dat_des_sis_afectado_v').val(Item.SistemaAfectado); let c = $('#dat_des_sis_afectado_v option:selected').text();
        $('#dat_des_sec_afectada_v').val(Item.SeccionAfectada); let d = $('#dat_des_sec_afectada_v option:selected').text();
        //let e =  $('#dat_des_cie10_v').attr('title');
        let e = $('#dat_des_cie10_v option:selected').attr('title');

        tabla += `
                            <tr>
                              <td>${Item.Diagnostico != null ? Item.Diagnostico : "---"}</td>
                              <td>${b != null ? b : "---"}</td>
                              <td>${f1a != null ? f1a : "---"}</td>
                              <td>${e != null ? e : "---"}</td>
                              <td>${c != null ? c : "---"}</td>
                              <td>${d != null ? d : "---"}</td>

                              <td>
                                <button type="button" class="btn btn-link shadow-none float-right" onclick = "sp3FnBorrarDiagnosticoTrnasferencia_ATM(${Item.Id})" >
                                  <img class="inject-svg" src="./images/sho/delete.svg" alt=""  fill="#ff3636" width="16px">
                                </button>
                              </td>

                            </tr>

                       `;

        $('#table_diagn_cie110_1').append(tabla);
        ikk = ikk + 1;
        $('#lb_diag_1_int_t').html("" + ikk + " registros");
        tabla = '';

        $('#dat_des_diagnostico_v').val('');
        $('#dat_des_cie10_v').val(0);
        $('#dat_des_sis_afectado_v').val(0);
        $('#dat_des_sec_afectada_v').val(0);
      }//---------------------------------------------------------------------------------

    });

    hideLoading();
    $('#lb_bt1').html('Agregar a lista');
    $('#btn_int_diagnostico_agregar').attr("disabled", false);

  });






  // SVGInject($(".inject-svg"));


}


function sp3FnBorrarDiagnosticoTrnasferencia_ATM(IdDiag) {
  //alert('vamos a eliminar el diagnostico:::' +IdDiag );
  showLoading();
  $('#lb_bt1').html(' Eliminando ......');
  var body = {
    "IdDescansoMedico": id_ATM,
    "IdDiagnosticoCIE10": IdDiag
  }


  //var url = apiUrlssoma+ "/api/Post-LeccionAprendida?code=3SZLZvJm1g4qEdObbrPAWiDaiGa6EFKE9RFyIN1Q5osMz6ozxWX/xQ==&httpmethod=post";
  var url = apiUrlsho + "/api/hce_Post_025_descanso_medico_diagnosticoCIE10_eliminadoLogico?code=5zvYewTmqPmUD4OaV8u9ToJU83SCj9PnyabaoQv1aqHERQoI6AYKUA==&httpmethod=post";

  console.log('urlr:', url)

  var headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json",
  }

  $.ajax({
    method: 'POST',
    url: url,
    headers: headers,
    data: JSON.stringify(body),
    crossDomain: true,
    dataType: "json",
  }).done(function (data) {

    console.log('despues crear', data);
    if (data.Id > 0) {
      //alert('el reguistro de la transferencia tiene el Id = '+data.Id );
      hideLoading();
      $('#lb_bt1').html('Agregar a lista');


      sp3CargaLosCie10_1_ATM(id_ATM);


      //istAud = data.Id;

    }

  })
    .fail(function (jqXHR, textStatus, errorThrown) {

      //verModalError('Al Eliminar el registro de Transferencia', 'Intente Nuevamente');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Al Eliminar el registro de Transferencia, intente nuevamente',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    })
    .always(function (jqXHR, textStatus, errorThrown) {

    });


}











function intSp3ConfirmGuardarDescanzoMedico() {
  let nombres = $("#dat_des_nombres_trabajador_v").val();
  let apellidos = $("#dat_des_apellidos_trabajador_v").val();
  Swal.fire({
    title: "Guardar descanso medico.",
    html: `
    <p>Está por guardar el descanso medico de</p>
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
      fnSp3ModificarNuevaDescansoMedico();
    }
  });
  SVGInject($(".inject-svg"));
}



function fnSp3ModificarNuevaDescansoMedico() {//-------------------------------------------------------------------------------------------------------------------------

  // if(isNow == 1)
  // {
  //   istAudT = istAud;
  // }

  if (newD == 1) {

  }

  //alert("la trasnferencia es la = "+istAud+" y los signos vitales Id = "+IdSV);
  showLoading();

  var f1g = $('#dat_des_fi_v2').val();
  var pru = f1g.split('/');
  var f1g = pru[2] + '-' + pru[1] + '-' + pru[0];
  let jpru = f1g.split('undefined-undefined-'); f1g = jpru[1];

  var f2g = $('#dat_des_ff_v').val();
  var prux = f2g.split('/');
  var f2g = prux[2] + '-' + prux[1] + '-' + prux[0];
  let jpru2 = f2g.split('undefined-undefined-'); f2g = jpru2[1];

  var body = {
    "IdHC": idHC, //Id Historia clinica
    "IdDescM": id_ATM,
    "A_DniTrabajador": $('#dat_des_dni_trabajador_v').val(),
    "A_NombreTrabjador": $('#dat_des_nombres_trabajador_v').val(),
    "A_ApellidosTrabajador": $('#dat_des_apellidos_trabajador_v').val(),
    "A_Empresa": $('#dat_des_empresa_v').val(),
    "A_Origen": $('#dat_des_origen_v').val(),
    "A_IdAtencionMedica": 0,//preguntar como se vincula???

    "A_Gerencia": $('#dat_des_gerencia_v').val(),
    "A_Planta": $('#dat_des_planta_v').val(),
    "A_Area": $('#dat_des_area_v').val(),
    "A_PuestoTrabajo": $('#dat_des_id_atencion_med_v').val(),
    "B_PersonalSolicitud": $('#dat_des_personal_salud_v').val(),
    "B_PersonalIdHash": "",
    "B_TipoContingencia": $('#dat_des_tipo_contingencia_v').val(),
    "B_DescansoPorEnfermedad": $('#dat_des_descanso_enfermedad_v').val(),

    "B_CMP": $('#dat_des_cmp_v').val(),
    "B_CantidadDias": $('#dat_des_cant_dias_v').val(),
    "B_DiasAcumulados": $('#dat_des_dias_ac_v').val(),
    "B_FechaIni": f1g,

    "B_FechaFin": f2g,
    "B_HuboAltaMedica": $('#dat_des_alta_med_v').val(),
    "B_EstableceDescanso": $('#dat_des_establecimiento_emisión_v').val(),
    "B_Particular": $('#dat_des_particular_v').val()
  }

  var url = apiUrlsho + "/api/hce_Post_023_descanso_medico?code=ZMMXyYQzh2QaROc92eMe55BMlkkckJVD9r9mxqTmHFpCUXm75EvSsQ==&httpmethod=post";

  console.log('urlr:', url)
  console.log('body new descanso:', body)

  console.log('urlr:', url)

  var headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json",
  }

  $.ajax({
    method: 'POST',
    url: url,
    headers: headers,
    data: JSON.stringify(body),
    crossDomain: true,
    dataType: "json",
  }).done(function (data) {

    console.log('despues crear', data);
    if (data.Id > 0) {
      //alert('el reguistro de la transferencia tiene el Id = '+data.Id );
      hideLoading();
      Swal.fire({
        title: "Se terminó con éxito el registro",
        iconColor: "#8fbb02",
        iconHtml: '<img src="./images/sho/check.svg" width="28px">',
        showConfirmButton: false,
        padding: "3em 3em 6em 3em ",
        timer: 1500,
      }).then(() => {
        //handlerUrlhtml('contentGlobal', 'view/sho-hce/historia_clinica/gestionHistoriaClinica.html', 'Historia clínica electrónica');
      })

    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Descanso Medico',
        text: 'Error al crear el registro de la Descanso Medico',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    }

  })
    .fail(function (jqXHR, textStatus, errorThrown) {


      Swal.fire({
        icon: 'error',
        title: 'Descanso Medico',
        text: 'Error al crear el registro de la Descanso Medico',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    })
    .always(function (jqXHR, textStatus, errorThrown) {

    });




}//-------------------------------------------------------------------------------------------------------------------------



function hcSp3ConfirmCancelarDescansoMedico() {
  Swal.fire({
    title: "Cancelar los Datos del Descanso Medico",
    html: `
       <p>Está por cancelar los datos del descanso medico</p>
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
      fnCancelarNuevoDscansoMedico();
    }
  });
}//-----------------------------------------------------------------------------------------


function fnCancelarNuevoDscansoMedico() {
  //hay que borrar en la base de datos si un registro nuevo
  idHC; //histria clinica
  id_ATM; //id de la descanso medico
  if (newD == 1) {
    //se debe mandar a aborrar
    // 1 borramos las diagnosticos cie10
    //----------------------------------------------------------------------------------------------------------------------------------------------------
    showLoading();
    var body = {
      "IdHC": idHC,
      "IdDescM": id_ATM
    }




    var url = apiUrlsho + "/api/hce_Post_030_descanso_medico_eliminadoLogico?code=SJylajP1NKUiZTWmwwJe6BLaBixuD/xsbaFSHQ07P9ksOYkfFxxkTw==&httpmethod=post";

    console.log('urlr:', url)

    var headers = {
      "apikey": constantes.apiKey,
      "Content-Type": "application/json",
    }

    $.ajax({
      method: 'POST',
      url: url,
      headers: headers,
      data: JSON.stringify(body),
      crossDomain: true,
      dataType: "json",
    }).done(function (data) {

      console.log('si se borro logocamente', data);
      if (data.Id > 0) {
        hideLoading();
        handlerUrlhtml('contentGlobal', 'view/sho-hce/historia_clinica/gestionHistoriaClinica.html', 'Historia clínica electrónica');
      }

    })
      .fail(function (jqXHR, textStatus, errorThrown) {
        hideLoading();
        handlerUrlhtml('contentGlobal', 'view/sho-hce/historia_clinica/gestionHistoriaClinica.html', 'Historia clínica electrónica');

      })


      .always(function (jqXHR, textStatus, errorThrown) {
        hideLoading();

      });



    //-----------------------------------------------------------------------------------------------------------------------------------------------------

    //esperandooooo por luis mila
  }
  else {
    //nos salimos de una
    handlerUrlhtml('contentGlobal', 'view/sho-hce/historia_clinica/gestionHistoriaClinica.html', 'Historia clínica electrónica');
  }

}







function AprobarDescansoMedico(idDescanso, idHistoriaClinicaX) {//----------------------------------------------------------------------------------------------------------------------


  //alert('aprobar el descanso medico ='+idDescanso);

  //console.clear();

  console.log('################################################################################################', paObj_ATM_SHO[idDescanso])

  if (paObj_ATM_SHO[idDescanso].a.A_Estado == "Pendiente aprobación") {
    Swal.fire({
      title: "Aprobar Descanso Médico",
      html: `
              <p>Está por aprobar el descanso medico  </p>
              <p><b> (${paObj_ATM_SHO[idDescanso].a.A_IdDescansoMedico})</b></p>
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
        AprobarDescansoMedico_BD(idDescanso, idHistoriaClinicaX);
      }
    });
  }
  else {
    if (paObj_ATM_SHO[idDescanso].a.A_Estado == "Aprobado") {
      Swal.fire({
        title: "Este Descanso Medico (" + paObj_ATM_SHO[idDescanso].a.A_IdDescansoMedico + ") <p> ya se encuentra Aprobado <p>",
        icon: 'info',
        /// iconColor: "#ffba00",
        //iconHtml: '<img src="./images/sho/advertencia.svg" width="28px">',
        showConfirmButton: false,
        padding: "3em 3em 6em 3em ",
        timer: 2000,
      }).then(() => {
        //handlerUrlhtml('contentGlobal', 'view/sho-hce/interconsultas_transferencias/gestionInterconsultasTransferencia.html', 'Registro de interconsultas y transferencias');
      });
    }
    //
  }


}//---------------------------------------------------------------------------------------------------------------------





function AprobarDescansoMedico_BD(idDescanso, idHistoriaClinicaX) {//----------------------------------------------------------------------------------------------------------------------
  showLoading();

  var body = {
    "IdHC": idHistoriaClinicaX,
    "IdDescM": idDescanso
  }




  var url = apiUrlsho + "/api/hce_Post_031_descanso_medico_validar?code=JP4xGF2hEPJwTS0JOdae1KDlaIbMM1m34oVavJ5cLWaGTVYMVCPuiQ==&httpmethod=post";

  console.log('urlr:', url)

  var headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json",
  }

  $.ajax({
    method: 'POST',
    url: url,
    headers: headers,
    data: JSON.stringify(body),
    crossDomain: true,
    dataType: "json",
  }).done(function (data) {

    console.log('si se borro logocamente', data);
    if (data.Id > 0) {
      Swal.fire({
        title: "El Descanso Medico (" + paObj_ATM_SHO[idDescanso].a.A_IdDescansoMedico + ") se aprobado correctamente",
        iconColor: "#8fbb02",
        iconHtml: '<img src="./images/sho/check.svg" width="28px">',
        showConfirmButton: false,
        padding: "3em 3em 6em 3em ",
        timer: 3000,
      }).then(() => {

        buscadorInterconsultaTransferencia();
      });
    }

  })
    .fail(function (jqXHR, textStatus, errorThrown) {

      Swal.fire({
        icon: 'error',
        title: 'Descanso Medico',
        text: 'Error al aprobar el  Descanso Medico',
        footer: '<a href="">Why do I have this issue?</a>'
      })

    })


    .always(function (jqXHR, textStatus, errorThrown) {
      hideLoading();

    });



}//---------------------------------------------------------------------------------------------------------------------




function fnSprint3CuadreManual(HistClinica, idSap) {

  //console.log('####################################__5890__############################################################', paObj_ATM_SAP[idSap])
  //alert( '5679 fnSprint3CuadreManual = '+idSap);
  id_ATM_SAP = idSap;
  IdHC = HistClinica;

  handlerUrlhtml('contentGlobal', 'view/sho-hce/descansos_medicos/vincularDM_SAP.html', 'Vincular un DM de SAP');


}









function fnSp3Carga_Listas_Contingencia_SAP() { //--------------------------------------------------------------------------------------------------------------  ini ------------------------- fnSp3CargaListasHistoriaClinica_Interconsulta_transferencia

  showLoading();


  $("#" + 'dat_des_contingenci').html("Cargando ...");

  var url = apiUrlsho + "/api/hce_Get_036_tipo_contingencia?code=qxzLdYMhlxbAmteTiNVtSqqs0VqD1l/53yjs2wAuLJU0PnvfEHFaZA==";
  console.log("132 interc URL", url)
  var headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json",
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

    $("#" + 'dat_des_contingenci').append(`<option value='0' title='' style='font-weight: bold;'></option>`);
    response1.TipoContingencia.map(function (item) {
      $("#" + 'dat_des_contingenci').append(`<option value='${item.Id}' title='${item.Descripcion}' style='font-weight: bold;'>${item.Descripcion}</option>`);

    });
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------

    $('#dat_des_dni_trabajador').val(paObj_ATM_SAP[id_ATM_SAP].a.Documento);
    $('#dat_des_nombres_trabajador').val(paObj_ATM_SAP[id_ATM_SAP].a.Nombre);
    $('#dat_des_apellidos_trabajador').val(paObj_ATM_SAP[id_ATM_SAP].a.Apellidos);
    $('#dat_des_ocupacion').val(paObj_ATM_SAP[id_ATM_SAP].a.Ocupacion);
    $('#dat_des_fi').val(date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(paObj_ATM_SAP[id_ATM_SAP].a.FechaIni));
    $('#dat_des_ff').val(date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(paObj_ATM_SAP[id_ATM_SAP].a.FechaFin));
    $('#dat_des_dias').val(paObj_ATM_SAP[id_ATM_SAP].a.CantidadDeDias);
    $('#dat_des_acumulado').val(paObj_ATM_SAP[id_ATM_SAP].a.DiasAcumulados);
    $('#dat_des_puesto').val(paObj_ATM_SAP[id_ATM_SAP].a.Ocupacion);
    $('#dat_des_contingenci').val(paObj_ATM_SAP[id_ATM_SAP].a.TipoContingencia);


    hideLoading();
  });

} //--------------------------------------------------------------------------------------------------------------  ini ------------------------- fnSp3CargaListasHistoriaClinica_Interconsulta_transferencia




function fnSp3CargaFiltroEstadoInicialSaludOcupacional_Bandeja_ATM_SAP() { //------------------------------------- ini   fnSp3CargaFiltroEstadoInicialSaludOcupacional() -------------------------------------
  showLoading();
  var html = '';
  var k = 0;
  var url = apiUrlsho + "/api/hce_Get_017_descanso-medico_busqueda?code=qiLgD8uqGlqrIjk1Y7P1NgNioYJRj/HQvmwq60UFvqerUH4Uz5Nwcw==&IdDescanso=&Gerencia=0&Planta=0&Area=0&Documento=0&Nombres&Apellidos&OrigenDescanso&FechaDesde&FechaHasta&Buscar"

  var headers = { "apiKey": constantes.apiKey, "Content-Type": "application/json" }

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

      D_IT = response.DiagnosticoCIE10;

      response.DiagnosticoCIE10.map(function (item) {
        D_IT[item.DescansoMedicoId] = item.Diagnostico;

      });




    } //---------------------------------------------------------------


    if (response.DescansoMedico.length > 0) {


      response.DescansoMedico.forEach((Item) => {

        console.log("**er diagnostico------------------------- andy == ", D_IT[Item.Id]);

        paObj_ATM_SHO[Item.Id] = new DescansoMedico();
        paObj_ATM_SHO[Item.Id].cargarData(Item);

        ttemp[ttemp.length] = Item.Id;

        var f1 = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.A_FechaRegistro);
        var f_ini = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.B_FechaIni);
        var f_fin = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.B_FechaFin);


        var rd_bt = '';
        if (Item.ExisteEnSAP == 0) {
          rd_bt = `<img  src="images/sho/confirm3_off.svg" id = "bt_img_${Item.Id}" style = "width: 22px; cursor:pointer; "   alt = "Vincular con este descanso" onclick="fnSp3Vincular_ATM_SAP(${Item.Id},${id_ATM_SAP});" >`;
        }
        else {
          if (Item.ExisteEnSAP == 1) {
            rd_bt = `<img "bt_img_${Item.Id}"  src="images/sho/confirm3_on.svg" style = "width: 22px; cursor:pointer; "   alt = "Descanso Vinculado" >`;
            ult_ATMV = 'bt_img_' + Item.Id;

            Vinculado = Item.Id;
          }
        }

        let ds = f1.split('/');
        var im = ds[1];
        var Year = ds[2];

        var im = parseInt(im);
        Mes = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
        //alert(Mes[0])

        var menupop = `      `;



        html += `
                                <tr>
                                    <td  align="center">${Item.A_IdDescansoMedico != null ? Item.A_IdDescansoMedico : "---"} </td>
                                    <td  align="center" >${Item.A_DniTrabajador != null ? Item.A_DniTrabajador : "---"} </td>
                                    <td  align="center">${f_ini != null ? f_ini : "---"}</td>
                                    <td  align="center">${f_fin != null ? f_fin : "---"}</td>
                                    <td  align="center" >${Item.B_CantidadDias != null ? Item.B_CantidadDias : "---"} </td>
                                    <td  align="center" >${Item.B_TipoContingencia != null ? Item.B_TipoContingencia : "---"}</td>
                                    <td  align="center">${D_IT[Item.Id] != null ? D_IT[Item.Id] : "---"}  </td>
                                    <td>
                                     ${rd_bt}
                                    </td>
                               </tr>

                               `;
        k++;

      });
      $('#bodyTablaSinAuditorias_int').html(html);

      hideLoading();
      $('#lb_num_reg').html(k + ' Registros');






    }
    else {

      hideLoading();
    }



  });




} //------------------------------------- fin   fnSp3CargaFiltroEstadoInicialSaludOcupacional() -------------------------------------





function fnSp3Vincular_ATM_SAP(IdDesc, idSAP) {

  console.clear();

  id_ATM = IdDesc;
  id_ATM_SAP = idSAP;


  ttemp

  for (let i = 0; i < ttemp.length; i++) {

    //console.log("****************************** vamos a vincular DM="+IdDesc+",                    con   SAP = "+idSAP+"            paObj_ATM_SHO = "+ttemp);


    let idd = 'bt_img_' + ttemp[i];
    $('#' + idd).attr('src', 'images/sho/confirm3_off.svg');

  }


  var id = 'bt_img_' + IdDesc;

  $('#' + id).attr('src', 'images/sho/confirm3_on.svg');


  // var id = 'bt_img_'+IdDesc;
  ult_ATMV = id;


}



function desSp3ConfirmGuardarSAP() {
  Swal.fire({
    title: "Guardar registro",
    html: `
      <p>Está por vincular un DM de SAP con DM del sistema SHO</p>   
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

      //---------------------------------------------------------------------------------------------------------------------

      //---------------------------------    Si es diferente desvincular y luego vincular el nuevo -------------------------------------



      //es el valor inicialmente vinculado con el SAP

      if ((Vinculado != id_ATM) && (Vinculado > 0)) {//-----------------------------------------------------------------------------------------------------------------
        // alert("hay que desvincular esto primero id_ATM ="+id_ATM+"              vinculado = "+Vinculado);

        var body = {
          "IdDescMedSHO": Vinculado,
          "IdDescMedSAP": id_ATM_SAP
        }




        var url = apiUrlsho + "/api/hce_Post_049_relacionador_descanso_medico?code=dCo1eKyvQ4yR7tD43l9XbmyaPL4a/dC8fK1unYw5MZTyxaToqECTLA==&httpmethod=post";

        console.log('urlr:', url)

        var headers = {
          "apikey": constantes.apiKey,
          "Content-Type": "application/json",
        }

        $.ajax({
          method: 'POST',
          url: url,
          headers: headers,
          data: JSON.stringify(body),
          crossDomain: true,
          dataType: "json",
        }).done(function (data) {

          console.log('si se borro logocamente', data);
          if (data.Id > 0) {//************************************************************************************************************************************

            var body = {
              "IdDescMedSHO": id_ATM,
              "IdDescMedSAP": id_ATM_SAP
            }




            var url = apiUrlsho + "/api/hce_Post_049_relacionador_descanso_medico?code=dCo1eKyvQ4yR7tD43l9XbmyaPL4a/dC8fK1unYw5MZTyxaToqECTLA==&httpmethod=post";

            console.log('urlr:', url)

            var headers = {
              "apikey": constantes.apiKey,
              "Content-Type": "application/json",
            }

            $.ajax({
              method: 'POST',
              url: url,
              headers: headers,
              data: JSON.stringify(body),
              crossDomain: true,
              dataType: "json",
            }).done(function (data) {

              console.log('si se borro logocamente', data);
              if (data.Id > 0) {
                Swal.fire({
                  title: "Se Vinculo correctamente  descanso medico (" + paObj_ATM_SHO[id_ATM].a.A_IdDescansoMedico + ") con el registro SAP",
                  iconColor: "#8fbb02",
                  iconHtml: '<img src="./images/sho/check.svg" width="28px">',
                  showConfirmButton: false,
                  padding: "3em 3em 6em 3em ",
                  timer: 3000,
                }).then(() => {

                  handlerUrlhtml('contentGlobal', 'view/sho-hce/descansos_medicos/vincularDM_SAP.html', 'Vincular un DM de SAP');
                });
              }

            })
              .fail(function (jqXHR, textStatus, errorThrown) {

                Swal.fire({
                  icon: 'error',
                  title: 'Al vincular el descanso',
                  text: 'Error al aprobar el  Descanso Medico',
                  footer: '<a href="">Why do I have this issue?</a>'
                })

              })


              .always(function (jqXHR, textStatus, errorThrown) {
                hideLoading();

              });
            //alert("hs e puede vincular sin rollo");     //se puede vincular sin rollo




          }//*************************************************************************************************************************************

        })


      }//--------------------------------------------------------------------------------------------------
      else {
        var body = {
          "IdDescMedSHO": id_ATM,
          "IdDescMedSAP": id_ATM_SAP
        }




        var url = apiUrlsho + "/api/hce_Post_049_relacionador_descanso_medico?code=dCo1eKyvQ4yR7tD43l9XbmyaPL4a/dC8fK1unYw5MZTyxaToqECTLA==&httpmethod=post";

        console.log('urlr:', url)

        var headers = {
          "apikey": constantes.apiKey,
          "Content-Type": "application/json",
        }

        $.ajax({
          method: 'POST',
          url: url,
          headers: headers,
          data: JSON.stringify(body),
          crossDomain: true,
          dataType: "json",
        }).done(function (data) {

          console.log('si se borro logocamente', data);
          if (data.Id > 0) {
            Swal.fire({
              title: "Se Vinculo correctamente  descanso medico (" + paObj_ATM_SHO[id_ATM].a.A_IdDescansoMedico + ") con el registro SAP",
              iconColor: "#8fbb02",
              iconHtml: '<img src="./images/sho/check.svg" width="28px">',
              showConfirmButton: false,
              padding: "3em 3em 6em 3em ",
              timer: 3000,
            }).then(() => {

              handlerUrlhtml('contentGlobal', 'view/sho-hce/descansos_medicos/vincularDM_SAP.html', 'Vincular un DM de SAP');
            });
          }

        })
          .fail(function (jqXHR, textStatus, errorThrown) {

            Swal.fire({
              icon: 'error',
              title: 'Al vincular el descanso',
              text: 'Error al aprobar el  Descanso Medico',
              footer: '<a href="">Why do I have this issue?</a>'
            })

          })


          .always(function (jqXHR, textStatus, errorThrown) {
            hideLoading();

          });
        //alert("hs e puede vincular sin rollo");     //se puede vincular sin rollo
      }

      //------------------------------------------------------------------------------------------------------------------------------------







      //---------------------------------------------------------------------------------------------------------------------
    }

  });
  SVGInject($(".inject-svg"));
}






function buscadorVinculados() { //------------------------------------- ini   fnSp3CargaFiltroEstadoInicialSaludOcupacional() -------------------------------------
  showLoading();
  var html = '';

  var patron = $('#dat_des_nro_doc').val();

  var url = apiUrlsho + "/api/hce_Get_017_descanso-medico_busqueda?code=qiLgD8uqGlqrIjk1Y7P1NgNioYJRj/HQvmwq60UFvqerUH4Uz5Nwcw==&IdDescanso=&Gerencia=0&Planta=0&Area=0&Documento=0&Nombres&Apellidos&OrigenDescanso&FechaDesde&FechaHasta&Buscar"

  var headers = { "apiKey": constantes.apiKey, "Content-Type": "application/json" }

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
    console.log("**todos interc =================================== 6253 **", response);



    if (response.DiagnosticoCIE10.length > 0) { //---------------------------------------------------------------

      D_IT = response.DiagnosticoCIE10;

      response.DiagnosticoCIE10.map(function (item) {
        D_IT[item.DescansoMedicoId] = item.Diagnostico;

      });




    } //---------------------------------------------------------------


    if (response.DescansoMedico.length > 0) {

      var k = 0;
      response.DescansoMedico.forEach((Item) => {



        let str = Item.A_DniTrabajador;
        let salida = str.indexOf(patron);
        console.log('****************** comparando  patron =', patron, "*** en esta cadena = ", str, "la salida es = " + salida)

        if (patron == '') { salida = 100; }
        if (salida >= 0) {//#################################################################################################################################################
          k++;
          console.log("**er diagnostico------------------------- andy == ", D_IT[Item.Id]);

          paObj_ATM_SHO[Item.Id] = new DescansoMedico();
          paObj_ATM_SHO[Item.Id].cargarData(Item);

          ttemp[ttemp.length] = Item.Id;

          var f1 = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.A_FechaRegistro);
          var f_ini = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.B_FechaIni);
          var f_fin = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.B_FechaFin);


          var rd_bt = '';
          if (Item.ExisteEnSAP == 0) {
            rd_bt = `<img  src="images/sho/confirm3_off.svg" id = "bt_img_${Item.Id}" style = "width: 22px; cursor:pointer; "   alt = "Vincular con este descanso" onclick="fnSp3Vincular_ATM_SAP(${Item.Id},${id_ATM_SAP});" >`;
          }
          else {
            if (Item.ExisteEnSAP == 1) {
              rd_bt = `<img "bt_img_${Item.Id}"  src="images/sho/confirm3_on.svg" style = "width: 22px; cursor:pointer; "   alt = "Descanso Vinculado" >`;
              ult_ATMV = Item.Id;
              Vinculado = Item.Id;
            }
          }

          let ds = f1.split('/');
          var im = ds[1];
          var Year = ds[2];

          var im = parseInt(im);
          Mes = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
          //alert(Mes[0])

          var menupop = `      `;

          html += `
                                            <tr>
                                                <td  align="center">${Item.A_IdDescansoMedico != null ? Item.A_IdDescansoMedico : "---"} </td>
                                                <td  align="center" >${Item.A_DniTrabajador != null ? Item.A_DniTrabajador : "---"} </td>
                                                <td  align="center">${f_ini != null ? f_ini : "---"}</td>
                                                <td  align="center">${f_fin != null ? f_fin : "---"}</td>
                                                <td  align="center" >${Item.B_CantidadDias != null ? Item.B_CantidadDias : "---"} </td>
                                                <td  align="center" >${Item.B_TipoContingencia != null ? Item.B_TipoContingencia : "---"}</td>
                                                <td  align="center">${D_IT[Item.Id] != null ? D_IT[Item.Id] : "---"}  </td>
                                                <td>
                                                 ${rd_bt}
                                                </td>
                                           </tr>

                                           `;


        }//################################################################################################################################################







      });
      $('#bodyTablaSinAuditorias_int').html(html);

      hideLoading();
      $('#lb_num_reg').html(k + ' Registros');






    }
    else {

      hideLoading();
    }



  });




} //------------------------------------- fin   fnSp3CargaFiltroEstadoInicialSaludOcupacional() -------------------------------------




function hcSp3ConfirmCancelarVinculacion() {
  Swal.fire({
    title: "Cancelar Vinculación DM / SAP",
    html: `
    <p>Está por abandonar las opciones de vinculación </p>
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
      handlerUrlhtml('contentGlobal', 'view/sho-hce/descansos_medicos/gestionDescansoMedicoBandeja.html', 'Registro de Descansos Médicos');
    }
  });
  SVGInject($(".inject-svg"));
}





/*############################################################################################################################################################################################################
############################################################################################################################################################################################################
//                                                                                       ATENCIONES MEDICAS METODOS ASOCIADOS 


############################################################################################################################################################################################################
############################################################################################################################################################################################################*/


function fnsp3CargarListaMotivos() {

  showLoading();

  $("#" + 'dat_am_motivo').html("Cargando ...");


  //var url = "https://550m44ud1tmg7454-inspection-dev.azurewebsites.net/api/Get-Incidente-AccidenteWeb?code=GY7/yooa3Zl5sKu7zgakDbaCn4uvOKXjfwe/JkbSuIwDPOs/baiZFQ==&httpmethod=objectlist";
  var url = apiUrlsho + "/api/hce_Get_033_motivo_atencion?code=fygOdQb397upJyZ4t98BGpLbGy3GftGc50RLnRkdcvBts03XlqdKXA==";
  console.log("132 interc URL", url)
  var headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
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
    console.log("**fnsp3CargarListaMotivos**", response1);

    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    $("#" + 'dat_am_motivo').html(" ");
    $("#" + 'dat_am_motivo').css('font-size', '13px');
    $("#" + 'dat_am_motivo').html("<option selected value='0'>          </option>");




    response1.MotivoAtencion.map(function (item) {
      $("#" + 'dat_am_motivo').append(`<option value='${item.Id}' title='${item.Descripcion}' style='font-weight: bold;'>${item.Descripcion}</option>`);


    });
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------


    hideLoading();





  }




  );



}