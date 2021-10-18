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
 * DESCRIPCION: ARCHIVO DE VARIABLES GLOBALES
 *
 * ARCHIVOS DE SERVICIOS   _________________________________________
 * | # |     MODULO             |  |         NOMBRE                 |
 * | 1 |   SALUD OCUPACIONAL    |  |                                |
 * |________________________________________________________________|
 *
 *
 * VERSION: 0.1 Beta
 *********************************************************************************************************************************************************************************
 * NOTA IMPORTANTE:  EN FECHA  *** 06/09/2021 Andy  **** Vasquez: Procede a realizar un ajuste general  de funcionamiento y orden del modulo de historia clinica para optimizarlo
 *********************************************************************************************************************************************************************************

 *******************************************************************************************/






//############################################################# CONJUNTO E VARIBLES GLOBALES DE SALUD E HIGIENE ####################################################



//-----------   VARIABLES GLOBALES QUE AFECTAN VARIOS MODULOS   -----------------

var ID_ORIGEN = 0; //debe ser el id de una (hc-5, Am-1, otros sprint4)
var ID_TIPO_ORIGEN = 5; // CONTIENE EL CODIGO DE UNA INTERCONSULTA, TRASNFERENCIA, DESCANSO MEDICO

var REG_DESDE = 0; // INCICA SI EL REGISTRO ES DESDE UNA VENTANA EMERGENTE,  0 PARA SU REGISTRO DESDE SU BANDEJA
//1 MODULO DE NUEVA ATENCION MEDICA
//2 MODULO DE ENFERMEADDES CRONICAS
/*
 1 -Atención médica
 2 -VMO
 3 -Enfermedades_ocupacionales
 4 -Enfermedades_crónicas
 5 -Registro_a_Demanda (Bandeja General)
*/



//###########################################################################################################
//------------------------------------------- VARIABLES GLOBALES HISTORIA CLINICA  --------------------------------------------

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
var objTemp = [];

//----------------------------------------------- VARIABLES GLOBALES HISTORIA CLINICA --------------------------------------------
//###########################################################################################################


var mnu = [];
var cachePage = [];
var ddgHtml = "";
var objTemp = [];
var HistoriaClinBD = [];
var HistoriaClinData = [];
var imgPerson = '';





//###########################################################################################################
//------------------------------------------- VARIABLES GLOBALES HISTORIA SUBMODULO BANDEJA INTERCONSULTAS Y TRANSFERENCIAS  --------------------------------------------
//var paObj_hc = [];//objeto de interconsulta

var paObj_hi = []; //objeto de interconsulta ESTE ES TU OBJETO CARLOS
var paObj_ht = []; //objeto de trasnferencia
var istAud = 0;
var istAud2 = 0; //############################## BLOQUE CODIGO INTEGRACION ANDY 10-09-2021 #####################################
var HTMLEXCEL = '';
var HTMLEXCEL_INTERC = '';
var HTMLEXCEL_TRANSF = '';
var HTMLEXCEL2 = '';
var visible = 0; // 0 interconsulta 1 transferencia
var D_IT = []; //Almacena temporalmente el listado de Disgnostico de las interconsultas 
var D_IT2 = []; //Almacena temporalmente el listado de Disgnostico de las transferencias 
var D_IT3 = []; //Almacena temporalmente el listado de Signos Vitales de las transferencias 
var OBJ_I = []; // Objeto inicial de la bandeja

var paObj_HC = []; //############################## BLOQUE CODIGO INTEGRACION ANDY 10-09-2021 #####################################

var intTransAM = 0;//cual de las bandejas esta seleccionada entre interconsulta o transferencia desde el formulario nuevo o editar de atenciones medicas
//por defecto interconsulta 0, 1 transferencia

//------------------------------------------- VARIABLES GLOBALES HISTORIA SUBMODULO BANDEJA INTERCONSULTAS Y TRANSFERENCIA --------------------------------------------
//###########################################################################################################





//###########################################################################################################
//------------------------------------------- VARIABLES GLOBALES HISTORIA SUBMODULO TRANSFERENCIA  --------------------------------------------
//var paObj_HC = [];//objeto para los datos de la hisoria clinica
var istAudT = 0;
var isNow = 1;
var FORMATO_EXPORTABLE;
var lt1 = [];
var lt2 = [];
var lt3 = [];
var IdSV = 0;
var sedeAreaGerencia;


//------------------------------------------- VARIABLES GLOBALES HISTORIA SUBMODULO TRANSFERENCIA --------------------------------------------
//###########################################################################################################






//###########################################################################################################
//------------------------------------------- VARIABLES GLOBALES HISTORIA SUBMODULO DE DESCANSOS MEDICOS  --------------------------------------------
//var paObj_HC = [];//objeto para los datos de la hisoria clinica

var paObj_DM_SHO = []; //objeto para los datos de LOS DESCANSOS MEDICOS
var paObj_DM_SAP = [];
var id_DM = 0;//LO CAMBIA DE DECLARADO A CERO OJO
var id_DM_SAP;
var newD = 0;
var ttemp = []; //mantiene los id del listado de descansos a vincular
var Vinculado = 0;
var ult_DMV = 0; //MATIENE EL Id del ultimo descndo seleccionado
var HTMLEXCEL_DESCANSO_SAP = [];
var HTMLEXCEL_DESCANSO_SHO = [];


//------------------------------------------- VARIABLES GLOBALES HISTORIA SUBMODULO DESCANSOS MEDICOS --------------------------------------------
//###########################################################################################################





//###########################################################################################################
//------------------------------------------- VARIABLES GLOBALES HISTORIA SUBMODULO DE ATENCIONES MEDICAS  --------------------------------------------
//var paObj_HC = [];//objeto para los datos de la hisoria clinica

var paObj_ATM_SHO = []; //objeto para los datos de LOS DESCANSOS MEDICOS
var paObj_ATM_SAP = [];
var id_ATM;
var id_ATM_SAP;
var HTMLEXCEL_AT = '';
//var IdAM;
//var newD = 0;
//var ttemp =  [];//mantiene los id del listado de descansos a vincular
//var Vinculado = 0;
var ult_ATMV = 0; //MATIENE EL Id del ultimo descndo seleccionado
var SAF = []; //SISTEMAS AFECTADOS
var tipoVerAtencion = 1;
var ObjSV_AM;
  
    ObjSV_AM = new SignosVitales_AM();
//------------------------------------------- VARIABLES GLOBALES HISTORIA SUBMODULO ATENCIONES MEDICAS --------------------------------------------
//###########################################################################################################



//--------------------------VARIABLES GLOBALES ENFERMEDADES CRONICAS------------------------------//

var idEC = 0;
var paObj_ec = [];
var pluck_ec = [];
var paObj_detalle = [];
var paObj_detalleDescanso = [];
var paObj_detalleInterconsulta = [];
var paObj_detalleTransferencia = [];
var paObj_ec_hc = [];
var idDetalle = 0;
var controlNavHistoria = true;
var idTemporalEC = 0;
var idTemporalInterconsulta = 0;
var idTemporalTransferencia = 0;
var idTemporalDescanso = 0;
var paObj_ECTemporal = [];
var paObj_DescansoECTemporal = [];
var paObj_InterconsultaECTemporal = [];
var paObj_TransferenciaECTemporal = [];
var ingresoControl = false;
var campoControl = '';


//############################################################# CONJUNTO E VARIBLES GLOBALES DE SALUD E HIGIENE ####################################################


















//###########################################################################################################
//------------------------------------------- CLASES -----------------------------------------------------

function HistoriaClinica() { //-------------------------------------------Class HistoriaClinica()

  this.a = [];

  HistoriaClinica.prototype.cargarData = function (data) {
    this.a = data;
    this.a.Adjuntos = [];
    // // this.a.II;
    // this.a.II_BD = 0;//estado inicial, se puede ir al servidor a buscar la informacion.
  }

} //-------------------------------------------Class HistoriaClinica()


function HistoriaClinicaTranferencia() {

  this.a = [];

  HistoriaClinicaTranferencia.prototype.cargarData = function (data) {
    this.a = data;
    this.a.DiagnosticoCIE10 = [];
    this.a.SignosVitales = [];
    this.a.Adjuntos = [];
    // // this.a.II;

    this.a.BD = 0; //estado inicial, se puede ir al servidor a buscar la informacion.
  }

}



function Transferencia() {

  this.a = [];

  Transferencia.prototype.cargarData = function (data) {
    this.a = data;
    this.a.DiagnosticoCIE10 = [];
    this.a.SignosVitales = [];
    this.a.Adjuntos = [];
    // // this.a.II;

    this.a.BD = 0; //estado inicial, se puede ir al servidor a buscar la informacion.
  }

}




function Interconsulta() {

  this.a = [];

  Interconsulta.prototype.cargarData = function (data) {
    this.a = data;
    this.a.DiagnosticoCIE10 = [];
    this.a.SignosVitales = [];
    this.a.Adjuntos_Inter = [];
    // // this.a.II;

    // this.a.II_BD = 0;//estado inicial, se puede ir al servidor a buscar la informacion.
    this.a.Adjuntos = [];
    this.a.BD = 0; //estado inicial, se puede ir al servidor a buscar la informacion.
  }

}




function AtencionesMedicas() {

  this.a = [];

  AtencionesMedicas.prototype.cargarData = function (data) {
    this.a = data;
    this.a.DiagnosticoCIE10 = [];
    this.a.SignosVitales = [];
    this.a.Adjuntos = [];
    // // this.a.II;

    this.a.BD = 0; //estado inicial, se puede ir al servidor a buscar la informacion.
  }

}




function DescansoMedico() {

  this.a = [];

  DescansoMedico.prototype.cargarData = function (data) {
    this.a = data;
    this.a.DiagnosticoCIE10 = [];
    this.a.Adjuntos = [];
    // // this.a.II;

    this.a.BD = 0; //estado inicial, se puede ir al servidor a buscar la informacion.
  }

}




function EnfermedadesCronicas() { //-------------------------------------------Class EnfermedadesCronicas()

  this.a = [];

  EnfermedadesCronicas.prototype.cargarData = function (data) {
    this.a = data;
  }

} //-------------------------------------------Class EnfermedadesCronicas()


function SignosVitales_AM() {

   this.Id_AM = 0;
   this.Creando_AM = 0;//0 NO   1//SI

  SignosVitales_AM.prototype.cargarData = function () {
    this.pa  = $('#dat_am_presion_arterial_sv').val();
    this.fc  = $('#dat_am_frecuencia_cardiaca_sv').val();
    this.fr  = $('#dat_am_frecuencia_respiratoria_sv').val();
    this.te  = $('#dat_am_temperatura_sv').val();
    this.pe  = $('#dat_am_peso_sv').val();
    this.ta  = $('#dat_am_talla_sv').val();
    this.sa  = $('#dat_am_saturacion_sv').val();
    this.imc = $('#dat_am_masa_corporal_sv').val();
    this.pa  = $('#dat_am_perimetro_abdominal_sv').val();
   console.log('aqui estan los signos vitales', this);
  }



   SignosVitales_AM.prototype.MostrarDataTransferencia = function () {
    $('#dat_int_tran_sv1').val(this.pa);
    $('#dat_int_tran_sv2').val(this.fc);
    $('#dat_int_tran_sv3').val(this.fr);
    $('#dat_int_tran_sv4').val(this.te);
    $('#dat_int_tran_sv5').val(this.pe);
    $('#dat_int_tran_sv6').val(this.ta);
    $('#dat_int_tran_sv7').val(this.sa);
    $('#dat_int_tran_sv8').val(this.imc);
    $('#dat_int_tran_sv9').val(this.pa);

     //alert('aaaaaaaa');
   console.log('signos vitales cargados de Transferencia', this);
  }

}
//------------------------------------------- CLASES -----------------------------------------------------
//###########################################################################################################





function fnNuevaAtencionMedica() { //------------------------------------------------------ hay que ver si es interconsulta o trasnferencia y dependiendo llama al evento -------------------------------------------------------------------


  switch (visible) {

    case 0:

      alert('Interconsulta');

      break;

    case 1:

      //alert('Transferencia = '+idHC);

      fnSp3VerEditarRegistroTransferencia(idHC, 0, 3);

      //(idHistoriaC, idTransferencia, accion

      break;


  }


} //------------------------------------------------------ hay que ver si es interconsulta o trasnferencia y dependiendo llama al evento -------------------------------------------------------------------






















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
 * DESCRIPCION: ARCHIVO DE FUNCIONES GLOBALES O COMUNES DEL MODULO SALUD
 *
 * ARCHIVOS DE SERVICIOS   _________________________________________
 * | # |     MODULO             |  |         NOMBRE                 |
 * | 1 |   SALUD OCUPACIONAL    |  |                                |
 * |________________________________________________________________|
 *
 *
 * VERSION: 0.1 Beta
 *********************************************************************************************************************************************************************************
 * NOTA IMPORTANTE:  EN FECHA  *** 06/09/2021 Andy  **** Vasquez: Procede a realizar un ajuste general  de funcionamiento y orden del modulo de historia clinica para optimizarlo
 *********************************************************************************************************************************************************************************

 *******************************************************************************************/



// //-----------------incorporar en el evento onkeyup="soloNumeros('idtxt')"
//   jQuery("#dat_hc_it_a_doc").on('input', function (evt) 
//   {
//         // Allow only numbers.
//         jQuery(this).val(jQuery(this).val().replace(/[^0-9]/g, ''));
//   });




//------------------------------------------------------------------------------ invierte la fecha que viene de la base de datos-----------------------------

function date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(fechaBD) {

  var startDate = moment(fechaBD).format('DD/MM/YYYY'); //dddd
  var year = moment(fechaBD).format('YYYY'); //dddd
  var month = moment(fechaBD).format('MM'); //
  var day = moment(fechaBD).format('DD');
  //var startDate2   = year +"/"+ month +"/"+ day;
  var startDate2 = day + "/" + month + "/" + year

  return startDate2;
}




function imc(idPeso, IdTalla, IdIMC)
{

   var p = $('#'+idPeso).val();
   var t = $('#'+IdTalla).val();

   var div = t*t;
   var imc = p/div;

   $('#'+IdIMC).val(imc);

}




//----------------------------------------------------------- BUSQUEDA POR DESCRIPCION CIE10 ----------------------------------------------------
function _newDiagnosticoCIE10(IdTxt1, contenedor, listaCIE10, listaCIE10_2)
{
 
    if($('#'+IdTxt1).val().length > 2)
    {
     
     //------------------------------------vamos a buscar el servicio --------------------------------------


     
     console.log('.................... mas de tres caracteres');
        let ptr = $('#'+IdTxt1).val();
    
        let url = apiUrlsho+`/api/hce_Get_021_CIE10_busqueda?code=Kr7q88AoJqtcFZLAx3w8cS7kZ8ezNaxCr/YUbbfUMvEQH1zUvDsxjg==&IdCIE10=&Descripcion=`+ptr;
        
        var html="";
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
           

        console.log('................buscando con el patron = ', ptr);
        $.ajax(settings).done((response) => {

            console.log('Que fue lo que trajoXXXXX = ', response);

          if(response.CEI10.length > 0)
          {  
               var i = 1;
                     response.CEI10.map(function(Item) 
                      {
                         console.log('Que fue lo que trajo V = ', Item.Descripcion);
                          

                          


                          if(i < response.CEI10.length)
                            {  html =  html + ` <a class = 'dropdown-item itemBD'  onclick="  $('#${IdTxt1}').val('${Item.Descripcion}');  $('#${IdTxt1}').prop('title','${Item.Descripcion}');  agregaCIE10('${listaCIE10}', '${listaCIE10_2}', '${Item.Code}','${Item.Id}');  $('#${contenedor}').css('display','none');  "  >${Item.Descripcion}</a>`; }
                           if(i == response.CEI10.length)
                              {  html =  html + ` <a class = 'dropdown-item itemBD' style="border-bottom: 1px solid;"   onclick="  $('#${IdTxt1}').val('${Item.Descripcion}');  $('#${IdTxt1}').prop('title','${Item.Descripcion}');  agregaCIE10('${listaCIE10}','${Item.Code}','${Item.Id}');  $('#${contenedor}').css('display','none');  "  >${Item.Descripcion}</a>`; }
                            // {  html =  html + ` <a class = 'dropdown-item itemBD'  >${Item.Descripcion}</a>`; }
                        
                          i++;
                            
                      });
                       
                       console.log('TODO EL HTML = ', html);


                       $('#'+contenedor).html(html);
                       $('#'+contenedor).css('display','block');
                       $('#'+contenedor).css('z-index', 3000);
          }
          else
          {
                     $('#'+contenedor).html(" ");
                     $('#'+contenedor).css('display','none');
          }
         
        })

  
    }
     else
     {
                     $('#'+contenedor).html(" ");
                     $('#'+contenedor).css('display','none');
     }

}





function agregaCIE10(id,id2,d_cie10,id_Cie10)
  {

    $('#'+id2).val(id_Cie10);
    $('#'+id).val(d_cie10);

  }
//----------------------------------------------------------- BUSQUEDA POR DESCRIPCION CIE10 ----------------------------------------------------





//----------------------------------------------------------- BUSQUEDA POR CODIGO CIE10 ----------------------------------------------------

function _newDiagnosticoCIE102(IdTxt1, contenedor, listaCIE10, listaCIE10_2)
{
 
    if($('#'+IdTxt1).val().length >1)
    {
      // 
     
     //------------------------------------vamos a buscar el servicio --------------------------------------


     
     console.log('.................... mas de tres caracteres');
        let ptr = $('#'+IdTxt1).val();
    
        let url = apiUrlsho+`/api/hce_Get_021_CIE10_busqueda_2?code=du4cYFZ7WFprYBKU0hCISCgM6dy/AnJMzLrfjJtTa0eAZqGFaBwd/w==&IdCIE10&Descripcion=`+ptr;
        
        var html="";
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
           

        console.log('................buscando con el patron = ', ptr);
        $.ajax(settings).done((response) => {

            console.log('Que fue lo que trajoXXXXX = ', response);

          if(response.CEI10.length > 0)
          {  
               var i = 1;
                     response.CEI10.map(function(Item) 
                      {
                         console.log('Que fue lo que trajo V = ', Item.Descripcion);
                          

                          

                          
                          if(i < response.CEI10.length)
                            {  html =  html + ` <a class = 'dropdown-item itemBD'  onclick="  $('#${listaCIE10}').val('${Item.Descripcion}');  $('#${IdTxt1}').prop('title','${Item.Descripcion}');  agregaCIE10_2('${listaCIE10_2}', '${IdTxt1}', '${Item.Code}','${Item.Id}');  $('#${contenedor}').css('display','none');  "  >[ ${Item.Code} ]-- ${Item.Descripcion}</a>`; }
                           if(i == response.CEI10.length)
                            {  html =  html + ` <a class = 'dropdown-item itemBD' style="border-bottom: 1px solid;"  onclick="  $('#${listaCIE10}').val('${Item.Descripcion}');  $('#${IdTxt1}').prop('title','${Item.Descripcion}');  agregaCIE10_2('${listaCIE10_2}', '${IdTxt1}', '${Item.Code}','${Item.Id}');  $('#${contenedor}').css('display','none');  "  >[ ${Item.Code} ]-- ${Item.Descripcion}</a>`; }
                             
                          i++;
                            
                      });    
                       
                       console.log('TODO EL HTML = ', html);


                       $('#'+contenedor).html(html);
                       $('#'+contenedor).css('display','block');
                       $('#'+contenedor).css('z-index', 10001);
          }
          else
          {
                     $('#'+contenedor).html(" ");
                     $('#'+contenedor).css('display','none');
          }
         
        })

  
    }
     else
     {
                     $('#'+contenedor).html(" ");
                     $('#'+contenedor).css('display','none');
     }

}


function agregaCIE10_2(id,id2,d_cie10,id_Cie10)
{



  $('#'+id2).val(d_cie10);
  $('#'+id).val(id_Cie10);

}
//----------------------------------------------------------- BUSQUEDA POR CODIGO CIE10 ----------------------------------------------------





function maximoZindex(from){
  var max = 0;
  from.find(">*").each(function(i, e){
    var z = Number($(e).css("z-index"));
    if(z > max) {
      max = z;
    }
  });
  return max;
}