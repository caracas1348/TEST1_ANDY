/****************************************************************************************
 * VISUAL SAT - [2021]
 * PROYECTO : SIGTASA
 * ESQUEMA : SSOMA
 * SPRINT  : 3
 * MODULO : HISTORIA CLINICA
 * OPERADORES_________________________________________________________________________
 * | # | PROGRAMADOR     |  |      FECHA   |  |   HORA   |           CORREO           |
 * | 2 | Andy Vàsquez    |  |   06/09/2021 |  | 11:16:00 |     caracas1348@gmail.com  |
 * |___|_________________|__|______________|__|__________|____________________________|
 *
 * DESCRIPCION: ARCHIVO DE LAS FUNCIONES PARA CARGAR LAS ATENCIONES MEDICAS EN EL FORMULARIO DE AGREGAR ATENCION
 *
 * ARCHIVOS DE SERVICIOS   _________________________________________
 * | # |     MODULO             |  |         NOMBRE                 |
 * | 1 |   SALUD OCUPACIONAL    |  |                                |
 * |________________________________________________________________|
 *
 *
 * VERSION: 0.1 Beta


 *******************************************************************************************/
//alert(idHC);


//cargarDatosGenerales_IT(idHC);
//_init_fnSp3SaludOcupacionalEstadoInicial_inter_HC2();


function _init_fnSp3SaludOcupacionalEstadoInicial_inter_HC2() { //------------------------------------- ini   _init_fnSp3SaludOcupacionalEstadoInicial() -------------------------------------
  
 

  var hoy = new Date();
  var mes = hoy.getMonth() + 1;
  if (mes < 10) { mes = '0' + mes; }
  var f1 = hoy.getFullYear() + '-' + mes + '-' + hoy.getDate();



  cargarDatosGenerales_IT(idHC);
  fnSp3CargaFiltroEstadoInicialSaludOcupacional_inc_HC2();
  fnSp3CargaFiltroEstadoInicialSaludOcupacional_trans_HC2();
  cargarAreasSedesGerenciaHC();

 // fnSp3CargaFiltroEstadoInicialSaludOcupacional_trans_HC();
  //cargarAreasSedesGerencia();

} //------------------------------------- fini   _init_fnSp3SaludOcupacionalEstadoInicial() -------------------------------------






function fnSp3CargaFiltroEstadoInicialSaludOcupacional_inc_HC2() 
{ //------------------------------------- ini   fnSp3CargaFiltroEstadoInicialSaludOcupacional() -------------------------------------
  showLoading();
 
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


  var url = apiUrlsho + "/api/hce_Get_009_interconsulta_busqueda?code=mlLAeNuPAvTC057apNoiFLG/H/j36XcKY8vYElXN1st3CaLy2eeQ1A==&Gerencia=" + a + "&Planta=" + b + "&Area=" + c + "&Documento=" + d + "&Nombres=" + e + "&Apellidos=" + f + "&CodeInterconsultaTraferencia=" + g + "&FechaDesde=" + h + "&FechaHasta=" + i + "&Buscar="+j;



  console.log("248 URL", url);
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



  $.ajax(settings).done(function(response) 
  {
    console.log("**todos interc 269**", response);



    if (response.DiagnosticoCIE10.length > 0) { //---------------------------------------------------------------

      response.DiagnosticoCIE10.map(function(itemx) {
        //D_IT[itemx.InterconsultaId] = D_IT[itemx.InterconsultaId].itemx.Descripcion_TipCie10;

        console.log("diagnostico", itemx.Descripcion_TipCie10);

        if (itemx.Descripcion_TipCie10 == 'null' || itemx.Descripcion_TipCie10 == null || itemx.Descripcion_TipCie10 == '') { D_IT[itemx.InterconsultaId] = '-----'; } else { D_IT[itemx.InterconsultaId] = itemx.Descripcion_TipCie10 }

      });
      console.log("302 D_IT[]", D_IT);





    } //---------------------------------------------------------------




var intercAM = [];
 if (response.Interconsult.length > 0) 
 {
    var ih = 0;
     response.Interconsult.map(function(itemx) {

         paObj_hi[itemx.IdInter] = new Interconsulta();
         paObj_hi[itemx.IdInter].cargarData(itemx);

//alert("itemx.IdOrigen_Inter = "+itemx.IdOrigen_Inter+"ID_ORIGEN = "+ID_ORIGEN);


//if(ID_ORIGEN == 0 ){ if(IdAM == 0){ID_ORIGEN = 99999;}else{ID_ORIGEN = idAM;}}//codigo raro------------revisar
         if(itemx.IdOrigen_Inter == ID_ORIGEN)
         {   intercAM[ih] = itemx; ih++;}
          
      });

  }

    if (response.Interconsult.length > 0) {

     // $('#bodyTablaSinAuditorias_int_am').css('display', 'none');

      $('#pagination-container-EvalAud_int_am').pagination({
        dataSource: intercAM,
        pageSize: 2,
        callback: function(data, pagination) {
          // let obj = [];
          // data.forEach((e) => {
          //   if (e.IdHC == idHC) {
          //     obj.push(e)
          //   }
          // })
          var html = fnSp3ListarTablaGeneralH_int_HC2(data);

          $('#dat_int_cantidad_am').html(`${intercAM.length} Registros`);
          $('#body-tabla-list-EvalAud_int_am').html(html);//body-tabla-list-EvalAud_int
        }
      })



    } else {

      hideLoading();
    }



  });




} //------------------------------------- fin   fnSp3CargaFiltroEstadoInicialSaludOcupacional() -------------------------------------


function fnSp3ListarTablaGeneralH_int_HC2(data) { //------------------------------------------------------- ini   fnSp3ListarTablaGeneralH() -----------------------------------

  var html = '';
  var btNew = '';
  var width = 2450; //
  var width1 = 2430; //
  var width1 = 2420; //

 // alert('aqiooooooooooooooooooo 315');
  data.forEach((Item) => {

    
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
            <li onclick="/*interSp3VerInterconsulta*/ callaVerInterconsulta_amx(${idHC}, ${Item.IdInter})">
              <img src="./images/sho/eyeIcon.svg"/>
              <span>Ver registro</span>
            </li>


             <li onclick=" callaEditarInterconsulta_amx(${Item.IdInter},${idHC});  ">
              <img src="./images/sho/edit.svg"/>
              <span>Editar</span>
            </li>


          </ul>
        </div>
      </div>
      `;



    html += `
                
                 <div class="col-md-12"   style=" /*width:1250px !important;*/"   >

                                                    <div class="px-2 py-3 filaBandejaAm" style=" width:101% !important; mmargin-rigth:30px !important; " > 

                                                        <table border="0"  width = '102%'  style=" /*width:1240px !important;*/  "  >   
                                                            <tr >
                                                                  <td width = '16%'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.CodigoOrigen_Inter != null ? Item.CodigoOrigen_Inter : "---"}</div></td>  
                                                                  <td width = '16%'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${f1 != null ? f1 : "---"}</div></td>  
                                                                  <td width = '16%'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.Descripcion_InterExpec != null ? Item.Descripcion_InterExpec : "---"}</div></td>  
                                                                  <td width = '16%'  align="center"><div id="c9TabGenyx" class="text-center lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.B_RecibioRespuesta_Inter == 1 ? 'Si' : "No"}</div></td>  
                                                                  <td width = '16%'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >&nbsp;&nbsp;&nbsp;&nbsp;${Item.C_ActitupParaLaboral_Inter == 1 ? 'Apto' : "No Apto"}</div></td>
                                                                  <td width = '16%'  align="center"><div id="c1TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${D_IT[Item.IdInter] != null ? D_IT[Item.IdInter] : "---"} </div></td>  

                                                                  <td   width = '6%'   align="left"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${menupop}</td>  
                                                                  <td   width = '2%'   align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >&nbsp;</td>  

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



function fnSp3CargaFiltroEstadoInicialSaludOcupacional_trans_HC2() 
{ //------------------------------------- ini   fnSp3CargaFiltroEstadoInicialSaludOcupacional() -------------------------------------
  showLoading();
 
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


  var url = apiUrlsho + "/api/hce_Get_010_transferencia_busqueda?code=Ma57zVWN/hVKiVbpbiaBFuwa3iEiVrtFLv6X0qATPa1taStnyUvlPw==&Gerencia=0&Planta=0&Area=0&Documento=0&Nombres&Apellidos&CodeInterconsultaTraferencia&FechaDesde&FechaHasta&Buscar";



  console.log("248 URL", url);
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



  $.ajax(settings).done(function(response) 
  {
    console.log("**todos interc 269**", response);

    

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






    /*if (response.DiagnosticoCIE10.length > 0) { //---------------------------------------------------------------

      response.DiagnosticoCIE10.map(function(itemx) {
        //D_IT[itemx.InterconsultaId] = D_IT[itemx.InterconsultaId].itemx.Descripcion_TipCie10;

        console.log("diagnostico", itemx.Descripcion_TipCie10);

        if (itemx.Descripcion_TipCie10 == 'null' || itemx.Descripcion_TipCie10 == null || itemx.Descripcion_TipCie10 == '') { D_IT[itemx.InterconsultaId] = '-----'; } else { D_IT[itemx.InterconsultaId] = itemx.Descripcion_TipCie10 }

      });
      console.log("302 D_IT[]", D_IT);




var 
    } //---------------------------------------------------------------*/

var tranfAM = [];
 if (response.transferencias.length > 0) 
 {
    var ih = 0;
     response.transferencias.map(function(itemx) {
         if(itemx.IdOrigen == ID_ORIGEN)
         {   tranfAM[ih] = itemx; ih++;}
          
      });
}


    if (response.transferencias.length > 0) {

      //$('#bodyTablaSinAuditorias_int2').css('display', 'none');

      $('#pagination-container-EvalAud_int_am2').pagination({
        dataSource: tranfAM,
        pageSize: 2,
        callback: function(data, pagination) {
          // let obj = [];
          // data.forEach((e) => {
          //   if (e.IdHC == idHC) {
          //     obj.push(e)
          //   }
          // })
          var html = fnSp3ListarTablaGeneralH_trans_HC2(data);
          $('#dat_int_cantidad_am2').html(`${tranfAM.length} Registros`);
          $('#body-tabla-list-EvalAud_int_am2').html(html);//body-tabla-list-EvalAud_int
        }
      })



    } else {

      hideLoading();
    }



  });




} //------------------------------------- fin   fnSp3CargaFiltroEstadoInicialSaludOcupacional() -------------------------------------


function fnSp3ListarTablaGeneralH_trans_HC2(data) { //------------------------------------------------------- ini   fnSp3ListarTablaGeneralH() -----------------------------------

  var html = '';
  var btNew = '';
  var width = 2450; //
  var width1 = 2430; //
  var width1 = 2420; //

 // alert('aqiooooooooooooooooooo 315');
  data.forEach((Item) => {

    // paObj_ht[Item.Id] = new Interconsulta();
    // paObj_ht[Item.Id].cargarData(Item);

                    paObj_ht[Item.Id] = new Transferencia();
                    paObj_ht[Item.Id].cargarData(Item);


                    var i = paObj_ht[Item.Id].a.DiagnosticoCIE10.length;
                    paObj_ht[Item.Id].a.DiagnosticoCIE10 = D_IT2[Item.Id];
                    paObj_ht[Item.Id].a.SignosVitales = D_IT3[Item.Id];



    //${Item.CodigoPaciente_H != null ? Item.CodigoPaciente_H : "---"}

/*

    $('#dat_hc_it_a_gerencia').val(Item.GerenciaId_Empresa_H)
    var GerenciaId_Empresa_H = $('#dat_hc_it_a_gerencia option:selected').text();


    $('#dat_hc_it_a_area').val(Item.AreaId_Empresa_H)
    var AreaId_Empresa_H_S = $('#dat_hc_it_a_area option:selected').text();

    $('#dat_hc_it_a_planta_sede').val(Item.SedeId_Empresa_H)
    var SedeId_Empresa_H_S = $('#dat_hc_it_a_planta_sede option:selected').text();


  
*/


  var f1 = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.A_FechaTransferencia);
  var f2 = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(Item.C_Fecha); 

    var menupop = `                  
      <div class="dropdown float-right dropleft">
        <div class="more-info" id="item_am_diagnostico_2" data-toggle="dropdown">
          <img src="images/iconos/menu_responsive.svg" style="width: 18px; margin-right: 12px" />
        </div>
        <div class="dropdown-menu" aria-labelledby="item_am_diagnostico_1">
          <ul>

            <li onclick="llamadoVerTransferencia_AT(${Item.IdHC}, ${Item.Id},0);">
              <img src="./images/sho/eyeIcon.svg"/>
              <span>Ver registro</span>
            </li>
             <li onclick=" istAud = ${Item.Id}; istAud2 = ${idHC}; llamadoEditarTransferencia_AT(${Item.IdHC}, ${Item.Id},1); ">
              <img src="./images/sho/edit.svg"/>
              <span>Editar</span>
            </li>


          </ul>
        </div>
      </div>
      `;

    html += `
                
                 <div class="col-md-12"   style=" /*width:1250px !important;*/"   >
                                                    <div class="px-2 py-3 filaBandejaAm" style=" width:101% !important; mmargin-rigth:30px !important; " > 

                                                        <table border="0"  width = '102%'  style=" /*width:1240px !important;*/  "  >   
                                                            <tr >
                                                                  <td width = '23%'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.A_CodeTransferencia != null ? Item.A_CodeTransferencia : "---"}</div></td>  
                                                                  <td width = '23%'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${Item.C_Lugar != null ? Item.C_Lugar : "---"}  </div></td>  
                                                                  <td width = '23%'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${f1 != null ? f1 : "---"} </div></td>  
                                                                  <td width = '23%'  align="center"><div id="c9TabGenyx" class="text-center lbCabezaTabla" style = 'color:#1C1C1C  !important;' > &nbsp;&nbsp;&nbsp; ${f2 != null ? f2 : "---"}</div></td>  
                                                                   <!--   <td width = '16%'  align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >&nbsp;&nbsp;&nbsp;&nbsp;${Item.C_ActitupParaLaboral_Inter == 1 ? 'Apto' : "No Apto"}</div></td>
                                                                  <td width = '16%'  align="center"><div id="c1TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  > ${Item.PuestoTrabajo_Empresa_H} </div></td>   -->

                                                                  <td   width = '6%'   align="left"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >${menupop}</td>  
                                                                  <td   width = '2%'   align="center"><div id="c9TabGenyx" class="text-left lbCabezaTabla" style = 'color:#1C1C1C  !important; '  >&nbsp;</td>  

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

