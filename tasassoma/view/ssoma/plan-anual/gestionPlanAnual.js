/****************************************************************************************
* VISUAL SAT - [2021]
* PROYECTO : SIGTASA
* ESQUEMA : SSOMA
* MODULO : GESTIÓN DE PLAN ANUAL
* OPERADORES_________________________________________________________________________
* | # | PROGRAMADOR     |  |      FECHA   |  |   HORA   |           CORREO           |
* | 1 | Andy Vásquez    |  |  04/01/2021  |  | 07:28:50 |    caracas1348@gmail.com   |
* | 2 | Jesús Millán    |  |  01/02/2021  |  |__________|   millanjqesus@gmail.com   |
* |___|_________________|__|______________|__|__________|____________________________|
*
* DESCRIPCION: ARCHIVO FRONT DE FUNCIONALIDAD EN CLIENTE DE LAS OPCIONES DEL PLAN ANUAL- (LISTADO, FILTRADO, VER, EDITAR PLAN ANUAL, OBJETIVOS)
*
* ARCHIVOS DE SERVICIOS   ____________________________________
* | # |     MODULO             |  |         NOMBRE            |
* | 1 |      SSOMA             |  |     Get-Plan-Anual        |
* |___________________________________________________________|
*
* VERSION: 0.1 Beta
*******************************************************************************************/


/*------------------------------------------  class PlanAnual ------------------end---------------------------------*/
function PlanAnual()
 {

        this.a = [];

        this.Code;    //: "PASSTTSUP21001"
        this.Code_Gerencia;
        this.Color_Plan;//: "#000000"
        this.Equipo;//: "Equipo1"
        this.EquipoId;//: 1
        this.Estado_Plan;//: "Creado"
        this.Estado_PlanId;//: 1
        this.Fecha_Creacion;//: "01/01/2021"
        this.Gerencia;//: "Gerencia de adminstración y finanzas"
        this.GerenciaId;//: 2
        this.Id;//: 1
        this.Num_Objetivos;//: 5
        this.Objetivos = [];//: (5) [{…}, {…}, {…}, {…}, {…}]
        this.Programa;//: "PASST"
        this.ProgramaId;//: 1
        this.Sede;//: "Callao Norte"
        this.SedeId;//: 1
        this.Year_Plan;
        this.accion; //indica si es un nuevo Plan o es una modificación del Plan
        this.Suspendido;
        this.MotivoSuspencion;


        this.Create_By;
        this.Create_Date;
        this.Last_Update_By;
        this.Last_Update_Date;

       PlanAnual.prototype.cargarData = function (data)
        {

            this.a = data;
        }

    }
//.............................................. CLASE classHallazgo ...........................................

/*------------------------------------------  class PlanAnual ------------------end---------------------------------*/



/*------------------------------------------  class PlanAnual ------------------end---------------------------------*/
function Objetivo()
 {

        this.Code;//: "1"
        this.Id;//: 1
        this.Nun_Actividades;//: 2
        this.Objetivo_Name;   //: "PASSTTSUP21001"
        this.Actividades = [ ]; //: (2) [{…}, {…}]
        this.SubObjetivos = [ ];//: (5) [{…}, {…}, {…}, {…}, {…}]

}
//.............................................. CLASE classHallazgo ...........................................


/*------------------------------------------  class PlanAnual ------------------end---------------------------------*/
function SubObjetivo()
 {

        this.Code;//: "1"
        this.Id;//: 1
        this.Nun_Actividades;//: 2
        this.SubObjetivo_Name;    //: "PASSTTSUP21001"
        this.Actividades = [ ];//: (2) [{…}, {…}]

}
//.............................................. CLASE classHallazgo ...........................................




/*------------------------------------------  class PlanAnual ------------------end---------------------------------*/


//alert('qui estamossssssssssssssssss');
var paObj = new Array();
var istAud = "0";//contiene el datos del Plan auditor que actualmente se esta editando o trabajando
var accPlanAnual = 0; //indica si se va a crear = 0, a mofificar = 1 o a mostrar = 2 el plan
var objetivo; //variable que indica si es un objetivo o subobjetivo lo seleccionado
var objNewPA;//objeto que manejará la concepción de un nuevo plan anual
var objNewPA2;
var selGerencia = [];
var selPrograma = [];
var selSede = [];
var numSobj=0;
var flag_exec = false;
var flag_Supervisor = false;
var check_available = true;
var numPesototal=0;
var TEMP_SUSPENDER = 0;
var PESO_TOTAL = 0; //ANDY 25-06-2021

/*


class ObjetivoSubObjetivo

{
    constructor (objson)
    {
        if(objson == 0)
        {
            this.Tipo = 'SubOjbetivo';
            this.Nun_Actividad = 'SubOjbetivo';
            this.Actividad = 'SubOjbetivo';
            this.Peso = 'SubOjbetivo';
            this.Responsable = 'SubOjbetivo';
            this.Tipo = 'SubOjbetivo';
        }

    }

}


const paObj = new PlanAnual(0);
      console.clear();
     //console.log('parametro de la clase . = ',paObj.IdPlan);
     //console.log('parametro de la clase . = ',paObj.IdPrograma);
     //console.log('parametro de la clase . = ',paObj.IdGerencia);
     //console.log('parametro de la clase . = ',paObj.IdSede);
     //console.log('parametro de la clase . = ',paObj.IdEquipo);
     //console.log('parametro de la clase . = ',paObj.obj.Tipo);



*/

















function _init_fnSp3PlanAnualEstadoInicial()
{//------------------------------------- ini   fnSp3AdministrarHallazgosEstadoInicial() -------------------------------------
    //showLoading();
   //console.log("Arrancamos............................ _init_fnSp3PlanAnualEstadoInicial");
    if(getStorage("vtas_rolexternalrol", "text") == "ROL_OBSERVADORPLANANUAL"){
        $(".btn_edit").css("display",'none')
    }
    if(getStorage("vtas_rolexternalrol", "text") != "ROL_REPSONSABLEPLANANUAL"){
        $(".btn_new_").css("display",'none')
    }

    //responsive
     //fnSp3ResponsiveAdmHallazgos();
     //fnSp3CargarFuncionesAdmHallazgosDinamicasDOM();
     fnSp3CargaFiltroEstadoInicialPlanAnual();


}//------------------------------------- fini   fnSp3AdministrarHallazgosEstadoInicial() -------------------------------------

function _init_fnSp3PlanAnualEstadoEjecutado()
{//------------------------------------- ini   fnSp3AdministrarHallazgosEstadoInicial() -------------------------------------
    //showLoading();
   
    flag_exec = true;
    //console.log("Arrancamos............................ _init_fnSp3PlanAnualEstadoEjecutado");
    if(getStorage("vtas_rolexternalrol", "text") == "ROL_OBSERVADORPLANANUAL"){
        $(".btn_edit").css("display",'none')
    }
    if(getStorage("vtas_rolexternalrol", "text") != "ROL_REPSONSABLEPLANANUAL"){
        $(".btn_new_").css("display",'none')
    }

    //responsive
     //fnSp3ResponsiveAdmHallazgos();
     //fnSp3CargarFuncionesAdmHallazgosDinamicasDOM();
     fnSp3CargaFiltroEstadoExecPlanAnual();


}

var mayorId;
function fnSp3CargaFiltroEstadoInicialPlanAnual()
{//------------------------------------- ini   fnSp3CargaFiltroEstadoInicialPlanAnual() -------------------------------------
   //console.log("Arrancamos............................ fnSp3CargaFiltroEstadoInicialPlanAnual");
    //$('#modalMsgError').modal("show").addClass("fade")

    showLoading();
    guardarEnviar = 0;
    $("#sp3BtFiltroPlanAnual").html("Buscando.....")
    $("#sp3BtFiltroPlanAnual").attr("disabled",true);


     var programa =  $('#sel_filter_programa_p').val();    if(programa == null){programa = 0;}
     var gerencia =  $('#sel_filter_gerencia_p').val();     if(gerencia == null){gerencia = 0;}
     var sedepa =  $('#sel_filter_sede_p').val();    if(sedepa == null){sedepa = 0;}
     var estadopa =  $('#sel_filter_estado_p').val();  if(estadopa == null){estadopa = 0;}
     var anio =  $('#sel_anioeNew').val();  if(anio == null){anio = 0;}


     var f1,f2,f11,f22;

    f11 = $('#sp3_txt_fecha_desde_p').val();
    f22 = $('#sp3_txt_fecha_hasta_p').val();
    if($('#sp3_txt_fecha_desde_p').val() != "")
    {
        if(($('#sp3_txt_fecha_desde_p').val() != '0001-01-01')){
        f1 =  date1_DD_MM_AAAA_to_AAAA_MM_DD_T_HH_MM_S(f11)}else{ f1 = "";}
    }
    else{ f1 = "";}



    if($('#sp3_txt_fecha_hasta_p').val() != ""){
        if(($('#sp3_txt_fecha_hasta_p').val() != '0001-01-01')){
        f2 =  date1_DD_MM_AAAA_to_AAAA_MM_DD_T_HH_MM_S(f22)
        }else{ f2 = "";}
    }
    else{ f2 = "";}

    var url = apiUrlssoma+"/api/Get-Plan-Anual?code=EUBbWsTT1KkzS56X/GBcUAOkoipdX2JpgKRagYT7YDaJ0mLS39daeA==&httpmethod=objectlist&ProgramaId="+programa+"&GerenciaId="+gerencia+"&SedeId="+sedepa+"&FechaInicio="+f1+"&FechaFin="+f2+"&StatusId="+estadopa

   //console.log("URL",url )
    var headers ={
        "apikey":constantes.apiKey
    }

    var settings = {
        "url": url,
        "method": "GET",
        "timeout": 0,
        "crossDomain": true,
        "dataType": "json",
        "headers": headers,
    };





    $.ajax(settings).done(function (response) {
        //console.log("**todos**",response);

        mayorId = 0;






        //------------------------------- CARGAMOS SELECT PROGRAMA ---------------------------------

            $("#"+'sel_filter_programa_p').html(" "); $("#"+'sel_filter_programa_p').css('font-size','13px');
            $("#"+'sel_filter_programa_p').html("<option selected value='0'>          </option>");
            $("#"+'sel_filter_programa_p').html("<option selected value='0'>          </option>");



            $("#"+'sel_programaNew').html(" "); $("#"+'sel_programaNew').css('font-size','13px');
            $("#"+'sel_programaNew').html("<option selected value='0'>          </option>");
            $("#"+'sel_programaNew').html("<option selected value='0'>          </option>");

            console.info("response",response)
            response.Programas.map(function(item)
            {
                // $("#"+'sel_filter_programa_p').append(`<option value='${item.Id}' title='${item.Code}' style='font-weight: bold;'>${item.Programa}</option>`);
                $("#"+'sel_programaNew').append(`<option value='${item.Id}' title='${item.Code}' style='font-weight: bold;'>${item.Programa}</option>`);

            });





        //------------------------------- CARGAMOS SELECT PROGRAMA ---------------------------------



        //------------------------------- CARGAMOS SELECT GERENCIA ---------------------------------

        $("#"+'sel_filter_gerencia_p').html(" "); $("#"+'sel_filter_gerencia_p').css('font-size','13px');
        $("#"+'sel_filter_gerencia_p').html("<option selected value='0'>          </option>");
        $("#"+'sel_filter_gerencia_p').html("<option selected value='0'>          </option>");

        $("#"+'sel_gerenciaNew').html(" "); $("#"+'sel_filter_gerencia_p').css('font-size','13px');
        $("#"+'sel_gerenciaNew').html("<option selected value='0'>          </option>");
        $("#"+'sel_gerenciaNew').html("<option selected value='0'>          </option>");


        response.Gerencias.map(function(item)
        {
            // $("#"+'sel_filter_gerencia_p').append(`<option value='${item.Id}' title='${item.Gerencia}' style='font-weight: bold;'>${item.Gerencia}</option>`);
            $("#"+'sel_gerenciaNew').append(`<option value='${item.Id}' title='${item.Gerencia}' style='font-weight: bold;'>${item.Gerencia}</option>`);
        });
       //------------------------------- CARGAMOS SELECT GERENCIA ---------------------------------


        //------------------------------- CARGAMOS SELECT SEDES ---------------------------------

        $("#"+'sel_filter_sede_p').html(" "); $("#"+'sel_filter_sede_p').css('font-size','13px');
        $("#"+'sel_filter_sede_p').html("<option selected value='0'>          </option>");
        $("#"+'sel_filter_sede_p').html("<option selected value='0'>          </option>");

        $("#"+'sel_sedeNew').html(" "); $("#"+'sel_sedeNew').css('font-size','13px');
        $("#"+'sel_sedeNew').html("<option selected value='0'>          </option>");
        $("#"+'sel_sedeNew').html("<option selected value='0'>          </option>");


        response.Sedes.map(function(item)
        {
            // $("#"+'sel_filter_sede_p').append(`<option value='${item.Id}' title='${item.Sede}' style='font-weight: bold;'>${item.Sede}</option>`);
            $("#"+'sel_sedeNew').append(`<option value='${item.Id}' title='${item.Sede}' style='font-weight: bold;'>${item.Sede}</option>`);
        });
       //------------------------------- CARGAMOS SELECT SEDES ---------------------------------

       //------------------------------- CARGAMOS SELECT ESTADO PLAN ---------------------------------

       $("#"+'sel_filter_estado_p').html(" "); $("#"+'sel_filter_estado_p').css('font-size','13px');
       $("#"+'sel_filter_estado_p').html("<option selected value='0'>          </option>");
       $("#"+'sel_filter_estado_p').html("<option selected value='0'>          </option>");
       response.Estado_Planes.map(function(item)
       {
           $("#"+'sel_filter_estado_p').append(`<option value='${item.Id}' title='${item.Estado}' style='font-weight: bold; color:${item.Color};'>${item.Estado}</option>`);
       });
      //------------------------------- CARGAMOS SELECT ESTADO PLAN ---------------------------------



      var fech =  new Date();
      var anioAc = fech.getFullYear();
      var anioSi = anioAc+1;
      $("#"+'sel_anioeNew').html(" "); $("#"+'sel_anioeNew').css('font-size','13px');
      $("#"+'sel_anioeNew').html("<option selected value='0'>          </option>");

          $("#"+'sel_anioeNew').append(`<option value='${anioAc}' title='${anioAc}' style='font-weight: bold; '>${anioAc}</option>`);
          $("#"+'sel_anioeNew').append(`<option value='${anioSi}' title='${anioSi}' style='font-weight: bold; '>${anioSi}</option>`);

        $("#"+'sel_year_frecuencia').html(" "); $("#"+'sel_year_frecuencia').css('font-size','13px');
        $("#"+'sel_year_frecuencia').html("<option selected value='0'>          </option>");

        $("#"+'sel_year_frecuencia').append(`<option value='${anioAc}' title='${anioAc}' style='font-weight: bold; '>${anioAc}</option>`);
        $("#"+'sel_year_frecuencia').append(`<option value='${anioSi}' title='${anioSi}' style='font-weight: bold; '>${anioSi}</option>`);

     //------------------------------- CARGAMOS SELECT DE LOS AÑOS ---------------------------------






     response.PlanAnual.map(function(item)
       {
        if(item.Id > mayorId) {
           mayorId  = item.Id;}
       });


      $("#cant_adm_plan_anual").html('<b> '+ response.PlanAnual.length+'</b> ');
      objNewPA2 = response.PlanAnual;

      var t = 1;
      if(response.PlanAnual.length > 0)
      {





          //$('#body-tabla-list-EvalAud').html(" ");
          //$('#bodyTablaSinAuditorias').css('display','none');

          $('#bodyTablaSinAuditorias').css('display','none');

          $('#pagination-container-EvalAud').pagination({
              dataSource: response.PlanAnual,
              pageSize: 7,
              callback: function(data, pagination) {
                  var html = fnSp3ListarTablaGeneralH(data);


                  $('#body-tabla-list-EvalAud').html(html);

                  $("#sp3BtFiltroPlanAnual").html("Buscar")
                  $("#sp3BtFiltroPlanAnual").attr("disabled",false);

                  //debemos colocar los campos con su valores de busqueda si existen
                      $('#sel_filter_programa_p').val(programa);
                      $('#sel_filter_gerencia_p').val(gerencia);
                      $('#sel_filter_sede_p').val(sedepa);
                      $('#sel_filter_estado_p').val(estadopa);
                      $('#sp3_txt_fecha_desde_p').val(f11)
                      $('#sp3_txt_fecha_hasta_p').val(f22)



              }
          })
      }
      else
      {
          $('#body-tabla-list-EvalAud').html(" ");
          $('#bodyTablaSinAuditorias').css('display','block');
          $("#sp3BtFiltroPlanAnual").html("Buscar")
          $("#sp3BtFiltroPlanAnual").attr("disabled",false);

          //debemos colocar los campos con su valores de busqueda si existen
          $('#sel_filter_programa_p').val(programa);
          $('#sel_filter_gerencia_p').val(gerencia);

          $('#sel_filter_sede_p').val(sedepa);
          $('#sel_filter_estado_p').val(estadopa);
          $('#sp3_txt_fecha_desde_p').val(f11)
          $('#sp3_txt_fecha_hasta_p').val(f22)



          hideLoading();
      }





    });




    $('#divf1_frecuencia').css('background-color','#EFEFEF');
    $('#sel_year_frecuencia').css('background-color','#EFEFEF');
    $('#sel_year_frecuencia').prop('disabled', true);



}//------------------------------------- fin   fnSp3CargaFiltroEstadoInicialPlanAnual() -------------------------------------

function fnSp3CargaFiltroEstadoExecPlanAnual()
{//------------------------------------- ini   fnSp3CargaFiltroEstadoInicialPlanAnual() -------------------------------------
   //console.log("Arrancamos............................ fnSp3CargaFiltroEstadoInicialPlanAnual");
    //$('#modalMsgError').modal("show").addClass("fade")

    showLoading();
    guardarEnviar = 0;
    $("#sp3BtFiltroPlanAnual").html("Buscando.....")
    $("#sp3BtFiltroPlanAnual").attr("disabled",true);


     var programa =  $('#sel_filter_programa_p').val();    if(programa == null){programa = 0;}
     var gerencia =  $('#sel_filter_gerencia_p').val();     if(gerencia == null){gerencia = 0;}
     var sedepa =  $('#sel_filter_sede_p').val();    if(sedepa == null){sedepa = 0;}
     var estadopa =  $('#sel_filter_estado_p').val();  if(estadopa == null){estadopa = 0;}
     var anio =  $('#sel_anioeNew').val();  if(anio == null){anio = 0;}
     var Responsable =  getCookie("vtas_internal_useruser"+sessionStorage.tabVisitasa);


     var f1,f2,f11,f22;

    f11 = $('#sp3_txt_fecha_desde_p').val();
    f22 = $('#sp3_txt_fecha_hasta_p').val();
    if($('#sp3_txt_fecha_desde_p').val() != "")
    {
        if(($('#sp3_txt_fecha_desde_p').val() != '0001-01-01')){
        f1 =  date1_DD_MM_AAAA_to_AAAA_MM_DD_T_HH_MM_S(f11)}else{ f1 = "";}
    }
    else{ f1 = "";}



    if($('#sp3_txt_fecha_hasta_p').val() != ""){
        if(($('#sp3_txt_fecha_hasta_p').val() != '0001-01-01')){
        f2 =  date1_DD_MM_AAAA_to_AAAA_MM_DD_T_HH_MM_S(f22)
        }else{ f2 = "";}
    }
    else{ f2 = "";}

    var url = apiUrlssoma+"/api/Get-Plan-Anual?code=EUBbWsTT1KkzS56X/GBcUAOkoipdX2JpgKRagYT7YDaJ0mLS39daeA==&httpmethod=objectlistEvaluacion&ProgramaId="+programa+"&GerenciaId="+gerencia+"&SedeId="+sedepa+"&FechaInicio="+f1+"&FechaFin="+f2+"&StatusId="+estadopa+"&Responsable="+Responsable

   console.log("URL",url )
    var headers ={
        "apikey":constantes.apiKey
    }

    var settings = {
        "url": url,
        "method": "GET",
        "timeout": 0,
        "crossDomain": true,
        "dataType": "json",
        "headers": headers,
    };





    $.ajax(settings).done(function (response) {
        console.log("**todos**",response);

        mayorId = 0;






        //------------------------------- CARGAMOS SELECT PROGRAMA ---------------------------------

            $("#"+'sel_filter_programa_p').html(" "); $("#"+'sel_filter_programa_p').css('font-size','13px');
            $("#"+'sel_filter_programa_p').html("<option selected value='0'>          </option>");
            $("#"+'sel_filter_programa_p').html("<option selected value='0'>          </option>");



            $("#"+'sel_programaNew').html(" "); $("#"+'sel_programaNew').css('font-size','13px');
            $("#"+'sel_programaNew').html("<option selected value='0'>          </option>");
            $("#"+'sel_programaNew').html("<option selected value='0'>          </option>");

            console.info("response",response)
            response.Programas.map(function(item)
            {
                // $("#"+'sel_filter_programa_p').append(`<option value='${item.Id}' title='${item.Code}' style='font-weight: bold;'>${item.Programa}</option>`);
                $("#"+'sel_programaNew').append(`<option value='${item.Id}' title='${item.Code}' style='font-weight: bold;'>${item.Programa}</option>`);

            });





        //------------------------------- CARGAMOS SELECT PROGRAMA ---------------------------------



        //------------------------------- CARGAMOS SELECT GERENCIA ---------------------------------

        $("#"+'sel_filter_gerencia_p').html(" "); $("#"+'sel_filter_gerencia_p').css('font-size','13px');
        $("#"+'sel_filter_gerencia_p').html("<option selected value='0'>          </option>");
        $("#"+'sel_filter_gerencia_p').html("<option selected value='0'>          </option>");

        $("#"+'sel_gerenciaNew').html(" "); $("#"+'sel_filter_gerencia_p').css('font-size','13px');
        $("#"+'sel_gerenciaNew').html("<option selected value='0'>          </option>");
        $("#"+'sel_gerenciaNew').html("<option selected value='0'>          </option>");


        response.Gerencias.map(function(item)
        {
            // $("#"+'sel_filter_gerencia_p').append(`<option value='${item.Id}' title='${item.Gerencia}' style='font-weight: bold;'>${item.Gerencia}</option>`);
            $("#"+'sel_gerenciaNew').append(`<option value='${item.Id}' title='${item.Gerencia}' style='font-weight: bold;'>${item.Gerencia}</option>`);
        });
       //------------------------------- CARGAMOS SELECT GERENCIA ---------------------------------


        //------------------------------- CARGAMOS SELECT SEDES ---------------------------------

        $("#"+'sel_filter_sede_p').html(" "); $("#"+'sel_filter_sede_p').css('font-size','13px');
        $("#"+'sel_filter_sede_p').html("<option selected value='0'>          </option>");
        $("#"+'sel_filter_sede_p').html("<option selected value='0'>          </option>");

        $("#"+'sel_sedeNew').html(" "); $("#"+'sel_sedeNew').css('font-size','13px');
        $("#"+'sel_sedeNew').html("<option selected value='0'>          </option>");
        $("#"+'sel_sedeNew').html("<option selected value='0'>          </option>");


        response.Sedes.map(function(item)
        {
            // $("#"+'sel_filter_sede_p').append(`<option value='${item.Id}' title='${item.Sede}' style='font-weight: bold;'>${item.Sede}</option>`);
            $("#"+'sel_sedeNew').append(`<option value='${item.Id}' title='${item.Sede}' style='font-weight: bold;'>${item.Sede}</option>`);
        });
       //------------------------------- CARGAMOS SELECT SEDES ---------------------------------

       //------------------------------- CARGAMOS SELECT ESTADO PLAN ---------------------------------

       $("#"+'sel_filter_estado_p').html(" "); $("#"+'sel_filter_estado_p').css('font-size','13px');
       $("#"+'sel_filter_estado_p').html("<option selected value='0'>          </option>");
       $("#"+'sel_filter_estado_p').html("<option selected value='0'>          </option>");
       response.Estado_Planes.map(function(item)
       {
           $("#"+'sel_filter_estado_p').append(`<option value='${item.Id}' title='${item.Estado}' style='font-weight: bold; color:${item.Color};'>${item.Estado}</option>`);
       });
      //------------------------------- CARGAMOS SELECT ESTADO PLAN ---------------------------------



      var fech =  new Date();
      var anioAc = fech.getFullYear();
      var anioSi = anioAc+1;
      $("#"+'sel_anioeNew').html(" "); $("#"+'sel_anioeNew').css('font-size','13px');
      $("#"+'sel_anioeNew').html("<option selected value='0'>          </option>");

          $("#"+'sel_anioeNew').append(`<option value='${anioAc}' title='${anioAc}' style='font-weight: bold; '>${anioAc}</option>`);
          $("#"+'sel_anioeNew').append(`<option value='${anioSi}' title='${anioSi}' style='font-weight: bold; '>${anioSi}</option>`);

        $("#"+'sel_year_frecuencia').html(" "); $("#"+'sel_year_frecuencia').css('font-size','13px');
        $("#"+'sel_year_frecuencia').html("<option selected value='0'>          </option>");

        $("#"+'sel_year_frecuencia').append(`<option value='${anioAc}' title='${anioAc}' style='font-weight: bold; '>${anioAc}</option>`);
        $("#"+'sel_year_frecuencia').append(`<option value='${anioSi}' title='${anioSi}' style='font-weight: bold; '>${anioSi}</option>`);

     //------------------------------- CARGAMOS SELECT DE LOS AÑOS ---------------------------------






     response.PlanAnual.map(function(item)
       {
        if(item.Id > mayorId) {
           mayorId  = item.Id;}
       });


      $("#cant_adm_plan_anual").html('<b> '+ response.PlanAnual.length+'</b> ');
      objNewPA2 = response.PlanAnual;

      var t = 1;
      if(response.PlanAnual.length > 0)
      {





          //$('#body-tabla-list-EvalAud').html(" ");
          //$('#bodyTablaSinAuditorias').css('display','none');

          $('#bodyTablaSinAuditorias').css('display','none');

          $('#pagination-container-EvalAud').pagination({
              dataSource: response.PlanAnual,
              pageSize: 7,
              callback: function(data, pagination) {
                  var html = fnSp3ListarTablaGeneralHExec(data);


                  $('#body-tabla-list-EvalAud').html(html);

                  $("#sp3BtFiltroPlanAnual").html("Buscar")
                  $("#sp3BtFiltroPlanAnual").attr("disabled",false);

                  //debemos colocar los campos con su valores de busqueda si existen
                      $('#sel_filter_programa_p').val(programa);
                      $('#sel_filter_gerencia_p').val(gerencia);
                      $('#sel_filter_sede_p').val(sedepa);
                      $('#sel_filter_estado_p').val(estadopa);
                      $('#sp3_txt_fecha_desde_p').val(f11)
                      $('#sp3_txt_fecha_hasta_p').val(f22)



              }
          })
      }
      else
      {
          $('#body-tabla-list-EvalAud').html(" ");
          $('#bodyTablaSinAuditorias').css('display','block');
          $("#sp3BtFiltroPlanAnual").html("Buscar")
          $("#sp3BtFiltroPlanAnual").attr("disabled",false);

          //debemos colocar los campos con su valores de busqueda si existen
          $('#sel_filter_programa_p').val(programa);
          $('#sel_filter_gerencia_p').val(gerencia);

          $('#sel_filter_sede_p').val(sedepa);
          $('#sel_filter_estado_p').val(estadopa);
          $('#sp3_txt_fecha_desde_p').val(f11)
          $('#sp3_txt_fecha_hasta_p').val(f22)



          hideLoading();
      }





    });




    $('#divf1_frecuencia').css('background-color','#EFEFEF');
    $('#sel_year_frecuencia').css('background-color','#EFEFEF');
    $('#sel_year_frecuencia').prop('disabled', true);

console.log(paObj)

}//------------------------------------- fin   fnSp3CargaFiltroEstadoInicialPlanAnual() -------------------------------------

function suspenderPlanAnualSsoma()
{
    //alert('suspender::'+istAud);
    
        $('#modalSuspenderPlany').modal('hide').removeClass('fade');
        $('#modalConfirmSuspenderPlany').modal('show').addClass('fade');
        

        
        //$("#btnFinalizPlanA").attr('disabled',false);

       //console.log(paObj)
       //console.log(paObj[pos].a)
       //console.log(objNewPA)
        NumObjectUsing=istAud;
        objNewPA = null;//objeto que manejará la concepción de un nuevo plan anual
        objNewPA = new PlanAnual();
        objNewPA=paObj[istAud].a;
        ObjectUsing=paObj[istAud].a;
        //$("#lbTitleVerPlanAnual").html("Editar del Plan Anual codigo: "+objNewPA.Code);

        if(objNewPA.SedeId > 0){
            fnSp3BloqueaSede(0)
        }else{
            fnSp3BloqueaSede(1)
        }
        if(objNewPA.GerenciaId > 0){
            fnSp3BloqueaGerencia(0);

        }else{
            fnSp3BloqueaGerencia(1);
        }
        fnSp3BloqueaGerencia(1);
        // $('#divfSedeNew').css('background-color','#efefef');
        // $('#sel_sedeNew').css('background-color','#efefef');
        // $('#sel_sedeNew').prop('disabled', true);
       // fnSp3onchangeObjetivoSubojetitivo('si');
        $('#txt_obj_subobj').val('');
        $('#sel_programaNew').val(objNewPA.ProgramaId);
        $('#sel_gerenciaNew').val(objNewPA.GerenciaId); //SedeId    EquipoId
        $('#sel_sedeNew').val(objNewPA.SedeId);

        $('#sel_equipoNew').val(objNewPA.EquipoId);
        $('#sel_anioeNew').val(objNewPA.Year_Plan);
        $('#sel_year_frecuencia').val(objNewPA.Year_Plan);
         numSobj=0;
        if(objNewPA.Objetivos.length>0){
            $("#body-tabla-list-EvalAud1").html("");

            for (let i = 0; i < objNewPA.Objetivos.length; i++) {
               //console.log("ID OBJETIVO:   "+objNewPA.Objetivos[i].Id)
                var id = (objNewPA.Objetivos[i].Id + 1);
                CodePai++;

               //console.log("111 mando a fnSP3ReordenarObjetivoSubojetivo","ID:"+id)
                fnSP3ReordenarObjetivoSubojetivoEditar(1,objNewPA.Objetivos[i].Objetivo_Name,objNewPA.Objetivos[i].Code, undefined, objNewPA.Objetivos[i].Actividades.length, (i+1),i,undefined,istAud )
                if(objNewPA.Objetivos[i].SubObjetivos.length>0){
                    numSobj = numSobj + objNewPA.Objetivos[i].SubObjetivos.length;
                   //console.log(objNewPA.Objetivos[i].SubObjetivos.length)
                    for (let j = 0; j < objNewPA.Objetivos[i].SubObjetivos.length; j++) {
                        if(objNewPA.Objetivos[i].SubObjetivos[j].SubObjetivo_Name != ""){

                            var id_=0;
                         id_ = (objNewPA.Objetivos[i].SubObjetivos[j].Id + 1);
                       //console.log("222 mando a fnSP3ReordenarObjetivoSubojetivo","ID:"+id,"SUBID:"+id_)
                        fnSP3ReordenarObjetivoSubojetivoEditar(1,objNewPA.Objetivos[i].SubObjetivos[j].SubObjetivo_Name,0, (i+1), objNewPA.Objetivos[i].SubObjetivos[j].Actividades.length, (j+1), i, j,istAud)
                    }
                }
            }
            }
        }

        //$('#c1TabGenyCol1').html("Objetivos ( "+objNewPA.Objetivos.length+" )/ Subobjetivos ( "+numSobj+" ) ");

        
    
}

function suspenderPlanAnualSsomaBD()
{
    //alert('suspender::'+istAud);
    
    $("#btn-confirmar-guardar-susp").prop('disabled', true)
    $('#btn-confirmar-guardar-susp').html('<b>Suspend..</b>');
    // YA 1) Crear procedimento almacenado en bd para modificar tabla plan anual si esta suspendido o no
    // YA 2) Crear servicio o ajustar servicio post de plan anual con la opcion suspender
    // YA 3) ajustar los mensajes de abajo con la respuesta del servidor y bloqueo de botones
    //4) ajustar listado de planes anules, bloquear botones de los suspendido y los no suspendidos


         // //Despues de jecutar el servicio
         // $('#modalConfirmSuspenderPlany').modal('hide').removeClass('fade');
         // $('#modalConfirmSuspenderPlanOkY').modal('show').addClass('fade');

   //--------------------------fecha actual ---------------------------------
  var f = new Date(); var d;
  d = f.getFullYear();
  d = d+'-'+(f.getMonth()+1);
  d = d+'-'+f.getDate();
  d = d +' '+ f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()+":"+f.getMilliseconds();
  //--------------------------fecha actual ---------------------------------



  //preparamos la data para el servicio
  objNewPA.Email_Supervisor = getCookie("vtas_internal_useruser"+sessionStorage.tabVisitasa)

  objNewPA.ProgramaId     = $("#sel_programaNew").val();
  objNewPA.GerenciaId     = $("#sel_gerenciaNew").val();
  objNewPA.SedeId     = $("#sel_sedeNew").val();
  objNewPA.EquipoId     = $("#sel_equipoNew").val();
  objNewPA.Year_Plan     = $("#sel_anioeNew").val();
  objNewPA.Estado_PlanId     = 1;

  objNewPA.Suspendido = 1;
  objNewPA.MotivoSuspencion = $("#txt_suspy").val();

     var msj_confirm ="<b> Se Guard&oacute; el Plan Anual con el C&oacute;digo:</b>"
     httpmethod = "put";
     msj_confirm ="<b> Se Modific&oacute; el Plan Anual con el C&oacute;digo:</b>"
     objNewPA.Last_Update_By =  getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
     objNewPA.Last_Update_Date = moment().format('YYYY-MM-DD HH:mm:ss'); 
  
     var url = apiUrlssoma+"/api/Post-Plan-Anual?code=ZnQh7E2Noeiv1emsJPTvXE5l/qClcMIjv3FNePN8XTRfTY5aOqmSAQ==&httpmethod="+httpmethod;
 

 console.log("er andy 34::"+url);
 console.log("er andy 35::"+JSON.stringify(objNewPA));



  var headers ={
    "apikey":constantes.apiKey
    }
    $.ajax({
    method: "POST",
    url:  url,
    data: JSON.stringify(objNewPA),
    headers:headers,
    crossDomain: true,
    dataType: "json",
    })
    .done(function(data)
    {

   //console.log(data)
    if(data.Id>0){
         $('#modalConfirmSuspenderPlany').modal('hide').removeClass('fade');
         $('#modalConfirmSuspenderPlanOkY').modal('show').addClass('fade');
         fnSp3CargaFiltroEstadoInicialPlanAnual();
          fnSP3LimpiarmodalRegistro();  _init_fnSp3PlanAnualEstadoInicial();


           $("#btn-confirmar-guardar-susp").prop('disabled', false)
           $('#btn-confirmar-guardar-susp').html('<b>Confirmar</b>');

          
    }

   
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
        //hideLoading();
       // $('#Sp3VentanaPlanAnualEditView').modal('show').addClass('fade')

    })
   






           
          

}


function cuentaCaracterSusp()
{
    var n = $('#txt_suspy').val().length;
    
    $('#contador2y').html('');
    $('#contador2y').html(n+'/200');
}


function ventanaSuspenderPlany(idAud,val,Description_Motivo){
    //----------------------recibe el id ------------------------
    // 1) ---------------------------- limpiamos el formulario-----------------------------
   // LimpiarVentanaPlanAuditoria();

   //ESTO SE PUEDE DAR EN CUALQUIER MOMENTO Y EN CUALQUIER ESTADO INICIAL ( Asignada, En Atención, Por Ejecutar, Ejecución y Ejecutada.)

    //console.log("729::",paObj[idAud]);//paObj[Item.Id]

       istAud = idAud;
       $('#modalSuspenderPlany').modal('show').addClass('fade');

      

       if(paObj[idAud].a.Suspendido == 1)
       {
        $("#txt_suspy").prop('disabled', true).css('background-color','#efefef').val(paObj[idAud].a.MotivoSuspencion);
        //$('#txt_susp').val(Description_Motivo);
        $(".btn-suspender-plan").prop('disabled', true).css('background-color','##efefef');


        $("#id_audit_tittley").html(' ');
        $("#id_audit_tittley").html('Plan Anual - '+paObj[idAud].a.Code+' - Suspendido');
       }
       else
       {
                 if(paObj[idAud].a.Suspendido == 0)
                   {
                    $("#txt_suspy").prop('disabled', false).css('background-color','#ffffff').val(' ');
                    //$('#txt_susp').val(Description_Motivo);
                    $(".btn-suspender-plan").prop('disabled', false).css('background-color','#ff6767');


                    $("#id_audit_tittley").html(' ');
                    $("#id_audit_tittley").html('Suspender el Plan Anual - '+paObj[idAud].a.Code);
                   }
       }

   
}


function fnSp3ListarTablaGeneralH(data)
{//------------------------------------------------------- ini   fnSp3ListarTablaGeneralH() -----------------------------------
    var html = '';
    var o = 0;
    var primeraCargap =1;

    var indiceGerencia = 0;
    var indicePrograma = 0;
    var indiceSede = 0;
    selGerencia = [];
    selPrograma = [];
    selSede = [];

        data.forEach((Item)=>{
           //console.log(Item)
            if (Item.GerenciaId != 0){
                indiceGerencia = selGerencia.indexOf(Item.GerenciaId)
                if( indiceGerencia < 0 )
                {
                    selGerencia.push(Item.GerenciaId);
                    $("#"+'sel_filter_gerencia_p').append(`<option value='${Item.GerenciaId}' title='${Item.Gerencia}' style='font-weight: bold;'>${Item.Gerencia}</option>`);
                }

            }

            if (Item.SedeId != 0){
                indiceSede = selSede.indexOf(Item.SedeId)
                if( indiceSede < 0 )
                {
                    selSede.push(Item.SedeId);
                    $("#"+'sel_filter_sede_p').append(`<option value='${Item.SedeId}' title='${Item.Sede}' style='font-weight: bold;'>${Item.Sede}</option>`);
                }

            }

            if (Item.ProgramaId != 0){
                indicePrograma = selPrograma.indexOf(Item.ProgramaId)
                if( indicePrograma < 0 )
                {
                    selPrograma.push(Item.ProgramaId);
                    $("#"+'sel_filter_programa_p').append(`<option value='${Item.ProgramaId}' title='${Item.Programa}' style='font-weight: bold;'>${Item.Programa}</option>`);
                }

            }




           paObj[Item.Id] = new PlanAnual();
           paObj[Item.Id].cargarData(Item);


console.log(".."+Item.Equipo+"..")

            console.log("SP3_HALL -->> ",data)
                if(primeraCargap==1)
                {
                    if(getStorage("vtas_rolexternalrol", "text") == "ROL_REPSONSABLEPLANANUAL"){

                        var btEdit = 'style="background-color:#b2b2b2 !important;"';
                    if(Item.Estado_PlanId === 1 || Item.Estado_PlanId === 2){
                        btEdit=`title='Editar del Hallazgo' onclick="accPlanAnual = 1; fnSp3VentanaMostrarPlanAnual(${Item.Id})" style="background-color:#58c25d !important;"} `;
                    }
                        //btVerh=`onclick="accPlanAnual = 1; fnSp3VentanaMostrarPlanAnual(${Item.Id})" style="background-color:#58c25d !important;"} `;
                        btVerh=`title='Ver el Plan Anual'  onclick=" accPlanAnual = 2; fnSp3MostrarModalVerPlanAnual(${Item.Id})"   class='btn-circle btn_read border-0' style='background-color:#34559c !important;'`;
                     //---------------------------------------- andy 23-06-2021 ------------------------------------------------------------------suspender plan
                           //btEdit=`onclick="accPlanAnual = 1; fnSp3VentanaMostrarPlanAnual(${Item.Id})" style="background-color:#58c25d !important;"} `;
                           btSusp=`title='Suspender Plan Anual' onclick="  ventanaSuspenderPlan(${Item.Id},true,'null') " style=" background-color:#b2b2b2 !important;" `;//ff6767 rojo ,   :#b2b2b2 gris

                     //---------------------------------------- andy 23-06-2021 ------------------------------------------------------------------suspender plan

                     if(Item.Suspendido == 1)
                      {
                            
                            btSusp=`title='Ver Motivo de Suspensión' onclick=" ventanaSuspenderPlan(${Item.Id},true,'null') " style=" background-color:#ff6767 !important;" `;//ff6767 rojo ,   :#b2b2b2 gris
                            btEdit=`title='Este Plan Está Suspendido' onclick="" style="background-color:#b2b2b2 !important;"} `;
                            btVerh=`title='Este Plan Está Suspendido' onclick=" "   class='btn-circle btn_read border-0' style='background-color:#b2b2b2 !important;'`;
                      }


                    var btNew  ='';
                    //     if(Item.Id == mayorId){
                    //     btNew = "<div  class='check-blue text-center'>Nuevo</div>";
                    // }

                        html += `

                        <div class="item-tabla p-2" style="z-index: 1;display:relative;" style="width: 1233px !important;">${btNew}
                            <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                                <div class="col-12 text-center" style="font-size: 15px; padding: 4px !important; ">
                                    <div class="row">
                                        <table width = "100%" border="0">
                                        <tr >
                                            <td width = "10%" align="center"><div id="c1TabGeny" class="text-left lbCabezaTabla1" style='margin: 0px 0px 0px 13px !important;'  >${Item.Code}</div></td>
                                            <td width = "10%" ><div id="c2TabGeny" class="text-left lbCabezaTabla1"  style='width: 85%;' >${Item.Programa != null ? Item.Programa : "---"}</div></td>
                                            <td width = "13%" align="center"><div id="c3TabGeny" class="text-left lbCabezaTabla1"  >${Item.Gerencia != null ? Item.Gerencia : "---"}</div></td>
                                            <td width = "10%" align="center"><div id="c4TabGeny" class="text-left lbCabezaTabla1"  >${Item.Sede     != null ? Item.Sede : "---"}</div></td>
                                            <td width = "8%" align="center"><div id="c5TabGeny" class="text-left lbCabezaTabla1"  >${Item.Equipo != "" ? Item.Equipo : "---"}</div></td>

                                            <td width = "8%" align="center"><div id="c6TabGeny" class="text-center lbCabezaTabla1"  >${Item.Objetivos.length}</div></td>
                                            <td width = "8%" align="center"><div id="c7TabGeny" class="text-left   lbCabezaTabla1"  >${Item.Fecha_Creacion}</div></td>
                                            <td width = "8%" align="center"><div id="c8TabGeny" class="text-left   lbCabezaTabla1" style='color: ${Item.Color_Plan}; font-weight: bold; '  >${Item.Estado_Plan}</div></td>




                                            


                                            <td width = "3%" class="btn_edit" align="center"><div id="c12TabGeny" class="text-left lbCabezaTabla1"  >
                                                <button type='button'  ${btEdit} class='btn-circle btn_read border-0'  id='btn_verHallago${Item.Id}'>
                                                    <img src='./images/iconos/edit_1.svg' class='ojo-1'  >
                                                </button>
                                           </td>

                                            <td width = "3%" align="center"><div id="c12TabGeny" class="text-left lbCabezaTabla1"  >
                                                    <button type='button' ${btVerh} id='btn_verHallago${Item.Id}'>
                                                        <img src='./images/iconos/ojo_1.svg' class='ojo-1'  >
                                                    </button>

                                            </td>

                                            <td width = "3%" class="btn_edit" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1"  >

                                               

                                                <button type="button"  onclick="ventanaSuspenderPlany(${Item.Id},true,'null')" class="btn-circle btn_read border-0 " ${btSusp} id='btn_susp${Item.Id}'>
                                                      <img src="./images/iconos/on-off-button.svg" class="ojo-1">
                                                </button>
                                           </td>

                                           <td width = "1%" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1"  >
                                               &nbsp;
                                           </td>


                                        </tr>
                                    </table>


                                    </div>
                                </div>
                            </div>
                        </div>


                            `;
                    }else if(getStorage("vtas_rolexternalrol", "text") == "ROL_OBSERVADORPLANANUAL"){

                        var btEdit = 'style="background-color:#b2b2b2 !important;"';
                    if(Item.Estado_PlanId === 1 || Item.Estado_PlanId === 2){
                        btEdit=`onclick="accPlanAnual = 1; fnSp3VentanaMostrarPlanAnual(${Item.Id})" style="background-color:#58c25d !important;"} `;
                    }
                    var btNew  ='';
                        // if(Item.Id == mayorId){
                        // btNew = "<div  class='check-blue text-center'>Nuevo</div>";}

                        html += `

                        <div class="item-tabla p-2" style="z-index: 1;display:relative;" style="width: 1233px !important;">${btNew}
                            <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                                <div class="col-12 text-center" style="font-size: 15px; padding: 4px !important; ">
                                    <div class="row">
                                        <table width = "100%" border="0">
                                        <tr >
                                            <td width = "10%" align="center"><div id="c1TabGeny" class="text-left lbCabezaTabla1" style='margin: 0px 0px 0px 13px !important;'  >${Item.Code}</div></td>
                                            <td width = "10%" ><div id="c2TabGeny" class="text-left lbCabezaTabla1"  style='width: 85%;' >${Item.Programa != null ? Item.Programa : "---"}</div></td>
                                            <td width = "14%" align="center"><div id="c3TabGeny" class="text-left lbCabezaTabla1"  >${Item.Gerencia != null ? Item.Gerencia : "---"}</div></td>
                                            <td width = "10%" align="center"><div id="c4TabGeny" class="text-left lbCabezaTabla1"  >${Item.Sede     != null ? Item.Sede : "---"}</div></td>
                                            <td width = "8%" align="center"><div id="c5TabGeny" class="text-left lbCabezaTabla1"  >${Item.Equipo != "" ? Item.Equipo : "---"}</div></td>

                                            <td width = "8%" align="center"><div id="c6TabGeny" class="text-center lbCabezaTabla1"  >${Item.Objetivos.length}</div></td>
                                            <td width = "10%" align="center"><div id="c7TabGeny" class="text-left   lbCabezaTabla1"  >${Item.Fecha_Creacion}</div></td>
                                            <td width = "8%" align="center"><div id="c8TabGeny" class="text-left   lbCabezaTabla1" style='color: ${Item.Color_Plan}; font-weight: bold; '  >${Item.Estado_Plan}</div></td>



                                            <td width = "3%" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1"  >
                                                    <button type='button' title='Ver el Plan Anual' onclick="  accPlanAnual = 2; fnSp3MostrarModalVerPlanAnual(${Item.Id})"   class='btn-circle btn_read border-0' style='background-color:#34559c !important;' id='btn_verHallago${Item.Id}'>
                                                        <img src='./images/iconos/ojo_1.svg' class='ojo-1'  >
                                                    </button>

                                            </td>

                                           <td width = "1%" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1"  >
                                               &nbsp;
                                           </td>


                                        </tr>
                                    </table>


                                    </div>
                                </div>
                            </div>
                        </div>


                            `;
                            $(".btn_edit").css("display",'none')

                    }else if(getStorage("vtas_rolexternalrol", "text") == "ROL_EJECUTANTEASIGNADO"){
                        
                        var btEdit = 'style="background-color:#b2b2b2 !important;"';
                        if(Item.Estado_PlanId === 1){
                            btEdit=`onclick="accPlanAnual = 1; fnSp3VentanaMostrarPlanAnual(${Item.Id})" style="background-color:#58c25d !important;"} `;                        }
                        var btNew  ='';
                            // if(Item.Id == mayorId){
                            // btNew = "<div  class='check-blue text-center'>Nuevo</div>";}

                            html += `

                            <div class="item-tabla p-2" style="z-index: 1;display:relative;" style="width: 1233px !important;">${btNew}
                                <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                                    <div class="col-12 text-center" style="font-size: 15px; padding: 4px !important; ">
                                        <div class="row">
                                            <table width = "100%" border="0">
                                            <tr >
                                                <td width = "10%" align="center"><div id="c1TabGeny" class="text-left lbCabezaTabla1" style='margin: 0px 0px 0px 13px !important;'  >${Item.Code}</div></td>
                                                <td width = "10%" ><div id="c2TabGeny" class="text-left lbCabezaTabla1"  style='width: 85%;' >${Item.Programa != null ? Item.Programa : "---"}</div></td>
                                                <td width = "14%" align="center"><div id="c3TabGeny" class="text-left lbCabezaTabla1"  >${Item.Gerencia != null ? Item.Gerencia : "---"}</div></td>
                                                <td width = "10%" align="center"><div id="c4TabGeny" class="text-left lbCabezaTabla1"  >${Item.Sede     != null ? Item.Sede : "---"}</div></td>

                                                <td width = "8%" align="center"><div id="c5TabGeny" class="text-left lbCabezaTabla1"  >${Item.Equipo != "" ? Item.Equipo : "---"}</div></td>
    
                                                <td width = "8%" align="center"><div id="c6TabGeny" class="text-center lbCabezaTabla1"  >${Item.Objetivos.length}</div></td>
                                                <td width = "10%" align="center"><div id="c7TabGeny" class="text-left   lbCabezaTabla1"  >${Item.Fecha_Creacion}</div></td>
                                                <td width = "8%" align="center"><div id="c8TabGeny" class="text-left   lbCabezaTabla1" style='color: ${Item.Color_Plan}; font-weight: bold; '  >${Item.Estado_Plan}</div></td>

                                                <td width = "3%" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1"  >
                                                        <button type='button' title='Ver el Plan Anual' onclick="  accPlanAnual = 2; fnSp3MostrarModalVerPlanAnual(${Item.Id})"   class='btn-circle btn_read border-0' style='background-color:#34559c !important;' id='btn_verHallago${Item.Id}'>
                                                            <img src='./images/iconos/ojo_1.svg' class='ojo-1'  >
                                                        </button>

                                                </td>

                                               <td width = "1%" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1"  >
                                                   &nbsp;
                                               </td>


                                            </tr>
                                        </table>


                                        </div>
                                    </div>
                                </div>
                            </div>


                                `;                    }





           }
        })
    hideLoading();
    //console.log(html);

return html;

}
//------------------------------------- fin   fnSp3ListarTablaGeneralH() -------------------------------------



function fnSp3ListarTablaGeneralHExec(data)
{//------------------------------------------------------- ini   fnSp3ListarTablaGeneralH() -----------------------------------
    var html = '';
    var o = 0;
    var primeraCargap =1;

    var indiceGerencia = 0;
    var indicePrograma = 0;
    var indiceSede = 0;
    selGerencia = [];
    selPrograma = [];
    selSede = [];

    console.log("..1237 DATA:::"+data+"..")

        data.forEach((Item)=>{
           //console.log(Item)
            if (Item.GerenciaId != 0){
                indiceGerencia = selGerencia.indexOf(Item.GerenciaId)
                if( indiceGerencia < 0 )
                {
                    selGerencia.push(Item.GerenciaId);
                    $("#"+'sel_filter_gerencia_p').append(`<option value='${Item.GerenciaId}' title='${Item.Gerencia}' style='font-weight: bold;'>${Item.Gerencia}</option>`);
                }

            }

            if (Item.SedeId != 0){
                indiceSede = selSede.indexOf(Item.SedeId)
                if( indiceSede < 0 )
                {
                    selSede.push(Item.SedeId);
                    $("#"+'sel_filter_sede_p').append(`<option value='${Item.SedeId}' title='${Item.Sede}' style='font-weight: bold;'>${Item.Sede}</option>`);
                }

            }

            if (Item.ProgramaId != 0){
                indicePrograma = selPrograma.indexOf(Item.ProgramaId)
                if( indicePrograma < 0 )
                {
                    selPrograma.push(Item.ProgramaId);
                    $("#"+'sel_filter_programa_p').append(`<option value='${Item.ProgramaId}' title='${Item.Programa}' style='font-weight: bold;'>${Item.Programa}</option>`);
                }

            }




           paObj[Item.Id] = new PlanAnual();
           paObj[Item.Id].cargarData(Item);


//console.log("..1276"+Item.Equipo+"..")

            //console.log("SP3_HALL -->> ",data)
                if(primeraCargap==1)
                {
                    if(getStorage("vtas_rolexternalrol", "text") == "ROL_REPSONSABLEPLANANUAL")
                    {

                        var btEdit = 'style="background-color:#b2b2b2 !important;"';
                        if(Item.Estado_PlanId === 1 || Item.Estado_PlanId === 2)
                          {
                            btEdit=`onclick="accPlanAnual = 1; fnSp3VentanaMostrarPlanAnual(${Item.Id})" style="background-color:#58c25d !important;"} `;
                          }
                         var btNew  ='';
                        // if(Item.Id == mayorId){
                        // btNew = "<div  class='check-blue text-center'>Nuevo</div>";}

                        html += `

                        <div class="item-tabla p-2" style="z-index: 1;display:relative;" style="width: 1233px !important;">${btNew}
                            <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                                <div class="col-12 text-center" style="font-size: 15px; padding: 4px !important; ">
                                    <div class="row">
                                        <table width = "100%" border="0">
                                        <tr >
                                            <td width = "10%" align="center"><div id="c1TabGeny" class="text-left lbCabezaTabla1" style='margin: 0px 0px 0px 13px !important;'  >${Item.Code}</div></td>
                                            <td width = "10%" ><div id="c2TabGeny" class="text-left lbCabezaTabla1"  style='width: 85%;' >${Item.Programa != null ? Item.Programa : "---"}</div></td>
                                            <td width = "14%" align="center"><div id="c3TabGeny" class="text-left lbCabezaTabla1"  >${Item.Gerencia != null ? Item.Gerencia : "---"}</div></td>
                                            <td width = "8%" align="center"><div id="c5TabGeny" class="text-left lbCabezaTabla1"  >${Item.Equipo != "" ? Item.Equipo : "---"}</div></td>

                                            <td width = "8%" align="center"><div id="c6TabGeny" class="text-center lbCabezaTabla1"  >${Item.Objetivos.length}</div></td>
                                            <td width = "10%" align="center"><div id="c7TabGeny" class="text-left   lbCabezaTabla1"  >${Item.Fecha_Creacion}</div></td>
                                            <td width = "8%" align="center"><div id="c8TabGeny" class="text-left   lbCabezaTabla1" style='color: ${Item.Color_Plan}; font-weight: bold; '  >${Item.Estado_Plan}</div></td>





                                            <td width = "3%" class="btn_edit" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1"  >
                                                <button type='button' title='Editar del Hallazgo' ${btEdit} class='btn-circle btn_read border-0'  id='btn_verHallago${Item.Id}'>
                                                    <img src='./images/iconos/edit_1.svg' class='ojo-1'  >
                                                </button>
                                           </td>

                                            <td width = "3%" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1"  >
                                                    <button type='button' title='Ver el Plan Anual' onclick="  accPlanAnual = 2; fnSp3MostrarPlanAnualEjecucion(${Item.Id})"   class='btn-circle btn_read border-0' style='background-color:#34559c !important;' id='btn_verHallago${Item.Id}'>
                                                        <img src='./images/iconos/ojo_1.svg' class='ojo-1'  >
                                                    </button>

                                            </td>



                                           <td width = "1%" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1"  >
                                               &nbsp;
                                           </td>


                                        </tr>
                                    </table>


                                    </div>
                                </div>
                            </div>
                        </div>


                            `;
                    }
                else
                   {//ESTE ES EL OTRO ROL
                        

                        var btEdit = 'style="background-color:#b2b2b2 !important;"';



                    if(Item.Suspendido == 1)
                      {
                              //alert('suspendido');
                      }
                      else
                      {



                        if(Item.Estado_PlanId === 1)
                        {


                            btEdit=`onclick="accPlanAnual = 1; fnSp3VentanaMostrarPlanAnual(${Item.Id})" style="background-color:#58c25d !important;"} `;                        }
                            var btNew  ='';
                            // if(Item.Id == mayorId){
                            // btNew = "<div  class='check-blue text-center'>Nuevo</div>";}
                             console.log("1348::",Item);

                            html += `

                            <div class="item-tabla p-2" style="z-index: 1;display:relative;" style="width: 1233px !important;">${btNew}
                                <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                                    <div class="col-12 text-center" style="font-size: 15px; padding: 4px !important; ">
                                        <div class="row">
                                            <table width = "100%" border="0">
                                            <tr >
                                                <td width = "10%" align="center"><div id="c1TabGeny" class="text-left lbCabezaTabla1" style='margin: 0px 0px 0px 13px !important;'  >${Item.Code}</div></td>
                                                <td width = "10%"><div id="c2TabGeny" class="text-left lbCabezaTabla1"  style='width: 85%;' >${Item.Programa != null ? Item.Programa : "---"}</div></td>
                                                <td width = "14%" align="center"><div id="c3TabGeny" class="text-left lbCabezaTabla1"  >${Item.Gerencia != null ? Item.Gerencia : "---"}</div></td>

                                                <td width = "8%" align="center"><div id="c5TabGeny" class="text-left lbCabezaTabla1"  >${Item.Equipo != "" ? Item.Equipo : "---"}</div></td>
    
                                                <td width = "8%" align="center"><div id="c6TabGeny" class="text-center lbCabezaTabla1"  >${Item.Objetivos.length}</div></td>
                                                <td width = "10%" align="center"><div id="c7TabGeny" class="text-left   lbCabezaTabla1"  >${Item.Fecha_Creacion}</div></td>
                                                <td width = "8%" align="center"><div id="c8TabGeny" class="text-left   lbCabezaTabla1" style='color: ${Item.Color_Plan}; font-weight: bold; '  >${Item.Estado_Plan}</div></td>

                                                <td width = "3%" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1"  >
                                                        <button type='button' title='Ver el Plan Anual EJECUTANTE' onclick="  accPlanAnual = 2; fnSp3MostrarPlanAnualEjecucion(${Item.Id})"   class='btn-circle btn_read border-0' style='background-color:#34559c !important;' id='btn_verHallago${Item.Id}'>
                                                            <img src='./images/iconos/ojo_1.svg' class='ojo-1'  >
                                                        </button>

                                                </td>

                                               <td width = "1%" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1"  >
                                                   &nbsp;
                                               </td>


                                            </tr>
                                        </table>


                                        </div>
                                    </div>
                                </div>
                            </div>


                                `;                   

                       }

                   }
                   }
        })
    hideLoading();
    //console.log(html);

return html;

}
//------------------------------------- fin   fnSp3ListarTablaGeneralH() -------------------------------------



function fnSp3CerrarVentanaMostrarPlanAnual()
{//------------------------------------- ini   fnSp3CerrarVentanaMostrarPlanAnual() -------------------------------------
    // if(accPlanAnual == 0)//verificamos si se va a crear  los nuevo plan
    // {
    //     verModalAdvertencia('Existen Datos Cargados','¿Estás seguro que desea cancelar la Creación de este Plan Anual?')
    //      //$("#Sp3VentanaPlanAnualEditView").modal("hide").removeClass("fade");
    // }
    verModalAdvertencia('Existen Datos Cargados','¿Estás seguro que desea cancelar la Creación de este Plan Anual?')

}//------------------------------------- ini   fnSp3CerrarVentanaMostrarPlanAnual() -------------------------------------

function addActividadObjetivoPlan()
{
    if(accPlanAnual == 0){
        fnSp3agregaActividadObjetivoPlan(-1,0,0)
    }else{
        fnSp3agregaActividadObjetivoPlanEditar(-1,0,0)

    }
}

function fnSp3VentanaMostrarPlanAnual(pos)
{//------------------------------------- ini   fnSp3VentanaMostrarPlanAnual() -------------------------------------
   //console.log("Arrancamos............................ fnSp3VentanaMostrarPlanAnual");
    istAud = pos;
    // accionH = 0;
    // vw_principal.init();
    $("#Sp3VentanaPlanAnualEditView").modal("show").addClass("fade");
    $("#btAgrObjetivo").attr('disabled',false);

    fnSp3onchangeObjetivoSubojetitivo('si');
    if(accPlanAnual == 0)//verificamos si se va a crear  los nuevo plan
    {//-------------------------------------------      * creacion de nuevo plan anual * ------------------------------------------------
        $("#btnFinalizPlanA").attr('disabled',true);
        ObjectUsing=undefined;
        //restablecemos los valore iniciales del formulario
            $("#lbTitleVerPlanAnual").html("Creación del Plan Anual");
            fnSp3onchangeObjetivoSubojetitivo('si');
            $('#txt_obj_subobj').val('');
            $('#sel_programaNew').val(0);
            $('#sel_gerenciaNew').val(0); //SedeId    EquipoId
            $('#sel_sedeNew').val(0);
            $('#sel_equipoNew').val('');
            $('#sel_anioeNew').val(0);

            //vamos a limpiar la tabla
             $('#body-tabla-list-EvalAud1').html(" ");//objetivos
             $('#body-tabla-list-EvalAud2').html("  "); //actividades
             $('#body-tabla-list-EvalAud3').html("  "); //Tarea
             //ahora el cronograma en estado Natural
             cronogramaEstadoNatural();

             objNewPA = null;//objeto que manejará la concepción de un nuevo plan anual
             objNewPA = new PlanAnual();



             $('#divfPlan1').css('background-color','#fff');
             $('#sel_programaNew').css('background-color','#fff');
             $('#sel_programaNew').prop('disabled', false);

             $('#divfanioeNew').css('background-color','#fff');
             $('#sel_anioeNew').css('background-color','#fff');
             $('#sel_anioeNew').prop('disabled', false);
    }//-------------------------------------------      * creacion de nuevo plan anual * ------------------------------------------------
    else

    {
        $("#btnFinalizPlanA").attr('disabled',false);

       //console.log(paObj)
       //console.log(paObj[pos].a)
       //console.log(objNewPA)
        NumObjectUsing=pos;
        objNewPA = null;//objeto que manejará la concepción de un nuevo plan anual
        objNewPA = new PlanAnual();
        objNewPA=paObj[pos].a;
        ObjectUsing=paObj[pos].a;
        $("#lbTitleVerPlanAnual").html("Editar del Plan Anual codigo: "+objNewPA.Code);

        if(objNewPA.SedeId > 0){
            fnSp3BloqueaSede(0)
        }else{
            fnSp3BloqueaSede(1)
        }
        if(objNewPA.GerenciaId > 0){
            fnSp3BloqueaGerencia(0);

        }else{
            fnSp3BloqueaGerencia(1);
        }
        fnSp3BloqueaGerencia(1);
        $('#divfSedeNew').css('background-color','#efefef');
        $('#sel_sedeNew').css('background-color','#efefef');
        $('#sel_sedeNew').prop('disabled', true);
       // fnSp3onchangeObjetivoSubojetitivo('si');
        $('#txt_obj_subobj').val('');
        $('#sel_programaNew').val(objNewPA.ProgramaId);
        $('#sel_gerenciaNew').val(objNewPA.GerenciaId); //SedeId    EquipoId
        $('#sel_sedeNew').val(objNewPA.SedeId);

        $('#sel_equipoNew').val(objNewPA.EquipoId);
        $('#sel_anioeNew').val(objNewPA.Year_Plan);
        $('#sel_year_frecuencia').val(objNewPA.Year_Plan);
         numSobj=0;
        if(objNewPA.Objetivos.length>0){
            $("#body-tabla-list-EvalAud1").html("");

            for (let i = 0; i < objNewPA.Objetivos.length; i++) {
               //console.log("ID OBJETIVO:   "+objNewPA.Objetivos[i].Id)
                var id = (objNewPA.Objetivos[i].Id + 1);
                CodePai++;

               //console.log("111 mando a fnSP3ReordenarObjetivoSubojetivo","ID:"+id)
                fnSP3ReordenarObjetivoSubojetivoEditar(1,objNewPA.Objetivos[i].Objetivo_Name,objNewPA.Objetivos[i].Code, undefined, objNewPA.Objetivos[i].Actividades.length, (i+1),i,undefined,pos )
                if(objNewPA.Objetivos[i].SubObjetivos.length>0){
                    numSobj = numSobj + objNewPA.Objetivos[i].SubObjetivos.length;
                   //console.log(objNewPA.Objetivos[i].SubObjetivos.length)
                    for (let j = 0; j < objNewPA.Objetivos[i].SubObjetivos.length; j++) {
                        if(objNewPA.Objetivos[i].SubObjetivos[j].SubObjetivo_Name != ""){

                            var id_=0;
                         id_ = (objNewPA.Objetivos[i].SubObjetivos[j].Id + 1);
                       //console.log("222 mando a fnSP3ReordenarObjetivoSubojetivo","ID:"+id,"SUBID:"+id_)
                        fnSP3ReordenarObjetivoSubojetivoEditar(1,objNewPA.Objetivos[i].SubObjetivos[j].SubObjetivo_Name,0, (i+1), objNewPA.Objetivos[i].SubObjetivos[j].Actividades.length, (j+1), i, j,pos)
                    }
                }
            }
            }
        }

        //$('#c1TabGenyCol1').html("Objetivos ( "+objNewPA.Objetivos.length+" )/ Subobjetivos ( "+numSobj+" ) ");

        $('#c1TabGenyCol1').html("Objetivos ( "+objNewPA.Objetivos.length+" )");



        $('#divfPlan1').css('background-color','#efefef');
        $('#sel_programaNew').css('background-color','#efefef');
        $('#sel_programaNew').prop('disabled', true);

        $('#divfanioeNew').css('background-color','#efefef');
        $('#sel_anioeNew').css('background-color','#efefef');
        $('#sel_anioeNew').prop('disabled', true);
    }




   //console.log(ObjectUsing)
    if(objNewPA.Estado_PlanId === 2){
        $('.btn_hab_sta').css('background-color','#b2b2b2');
        $('.btn_hab_sta').attr('disabled',true)

    }else{
        $('.btn_hab_sta').attr('disabled',false)

    }

    // $('#txt_objetivo_plan2').prop('disabled', false);

}//----------------------------------------- ini fnSp3VentanaMostrarHallazgo  ---------------------------------

function fnSp3onchangeObjetivoSubojetitivo(si_no)
{//------------------------------------- ini   fnSp3onchangeNecAnalisis() -------------------------------------


    if(si_no == 'si')//si
    {
        $('#rbtn_si').attr('src','./images/iconos/aprobarbien.svg');
        $('#rbtn_no').attr('src','./images/iconos/aprobarvoid.svg');
        objetivo = 1;
    }
    else//no
    {
        if(si_no == 'no')//si
        {

                $('#rbtn_no').attr('src','./images/iconos/aprobarbien.svg');
                $('#rbtn_si').attr('src','./images/iconos/aprobarvoid.svg');
                objetivo = 0;

        }
    }

}//------------------------------------- fini   fnSp3onchangeNecAnalisis() -------------------------------------

var nObjSub = 0;
var Objetivos = [];
var SubObjetivos = [];//manejarlo mejor con una clase

// public class Objetivo
// {
//     public  int ObjetivoId
//     public  string Objetivo
//     public int [50] SubObjetivoId
//     public string[50] SubObjetivo

//     public function agregarObjetivo();
// }


var iddd;
var nObj = 0;
var nSobj = 0;
var CodePai = -1;//mantiene el ultimo padre objetivo creado -1 es que no hay ningun objetivo creado


$('#btn_file_control_cambio').click(function(){
    $('#file_control_cambio').trigger('click');

});

function fnSp3agregaObjetivoSubojetivo(tipo, objjt,Code, CodePadre, nAct, Id)
{//------------------------------------- ini   fnSp3agregaObjetivoSubojetivo() -------------------------------------

    var yeah = $('#sel_anioeNew').val();

    if(parseInt(yeah) != 0 )
    {




        if(Id != 0)
                {//###############################################################################################################################################################################



                      //alert("=============["+$('#txt_obj_subobj').val()+"]==============");
                      var padrex;

                    if(objjt != "")
                    {
                        var nameobj = objjt;
                        var Id2 = '';
                        if(tipo == 1)
                        {console.log('cargar objetivos');}else{if(tipo == 0)console.log('cargar subbjetivos');}

                        var btNew = '';
                        var o = paObj[istAud].a.Objetivos.length;
                        var color = '#000000';
                        if(tipo == 1)
                        {
                            nObj++;
                            objjt = "Objetivo "+Code+" : "+objjt;
                            // Objetivos[Objetivos.length] = $('#txt_obj_subobj').val();
                            // var objjt = "Objetivo "+Objetivos.length+" : "+$('#txt_obj_subobj').val();
                            iddd = 'obj_'+nObj;//+"_"+nSobj;
                            color = '#000000';
                            Id2 = Id;
                            racimoAbre =  ` <div id='racimo_${nObj}'>`;
                            racimoCierra =  ` </div>`;
                            padrex = undefined;
                        }
                        else{
                            if(tipo == 0) //subobjetivos
                            {
                                // SubObjetivos[SubObjetivos.length] = $('#txt_obj_subobj').val();
                                // var objjt = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Subobjetivo "+Objetivos.length+"."+SubObjetivos.length+" : "+$('#txt_obj_subobj').val();
                                // iddd = 'item'+Objetivos.length+"_"+SubObjetivos.length;
                                objjt = "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; SubObjetivo "+Code+"."+CodePadre+" : "+objjt;
                                iddd = 'subobj_'+nObj+"_"+nSobj;
                                color = '#5c5c5c';
                                racimoAbre =  ` `;
                                racimoCierra =  ` `;
                                padrex = nObj;
                                Id2 = Id+'_'+padrex;
                                nSobj++;

                            }
                        }

                    $('#c1TabGenyCol1').html("Objetivos ( "+nObj+" )");/// Subobjetivos ( "+nSobj+" ) ");

                        var html1 = '     ';


                        if(nObjSub == 0)
                        {
                            $('#body-tabla-list-EvalAud1').html("     "); nObjSub = 1;
                        }

                        console.log("..................")

                            html1 += `
                            ${racimoAbre}
                            <div id = '${iddd}'  class="item-tabla p-2" style="z-index: 1;display:relative;  padding: 0px !important; margin: 10px 8px 0px !important; width: 1223px !important;">
                            <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                                <div class="col-12 text-center" style="font-size: 15px; padding: 4px !important; ">
                                    <div class="row">
                                        <table width = "100%" border="0">
                                        <tr >
                                            <td width = "55%" align="center"><div id="c1TabGeny" onclick='fnSp3SeleccionaFilaObjSub("${iddd}",${nObj},${nSobj})' class="text-left lbCabezaTabla1" style='margin: 0px 0px 0px 13px !important; font-size:15px !important; color:${color}'  >
                                            <div id="name_tag_obj_${Id2}">${objjt}</div>
                                            <div id="capa_name_obj_${Id2}"  style="display:none; ">
                                            <input type="text"  id="hdd_name_obj_${Id2}" class="text-justify textarea-fecha2 autocompletecollaborator" style="width: 70% !important;" value="${nameobj}">
                                            <div style="width: 10%; text-align: center;"><button type='button' title='Editar del Plan Anual' onclick="fnSp3EditarObj(${Id},${padrex})"   class='btn-circle btn_read border-0 btn-footer-active' style='background-color:#58c25d !important;' id='btn_verPlanAnual${Id}'>
                                            <img src='./images/iconos/img-check-mark-1.svg' class='ojo-1'  >
                                            </button></div>
                                            <div style="width: 10%; text-align: center;"><button type='button' title='Editar del Plan Anual' onclick="fnSp3NoEditarObj(${Id},${padrex})"   class='btn-circle btn_read border-0' style='background-color:#58c25d !important;' id='btn_verPlanAnual${Id}'>
                                            <img src='./images/iconos/delete.svg' class='ojo-1'  >
                                            </button></div>                                            </div></div></td>
                                            <td width = "14%" align="center"><div id="nAct_${iddd}" class="text-left lbCabezaTabla1" style='margin-left:50px;'  >${nAct}</div></td>


                                            <td width = "10%" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1"  >
                                                <button type='button' title='Actividades del Objetivo' onclick="fnSp3NuevasActividadesObjetivoPlan(${Id},${padrex},${tipo})"   class='btn-circle btn_read border-0' style='background-color:#ffb72b !important;' id='btn_ActividadPlan${Id}'>
                                                    <img src='./images/iconos/folder1.svg' class='ojo-1'  >
                                                </button>

                                            </td>

                                            <td width = "10%" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1"  >
                                                    <button type='button' title='Editar del Plan Anual' onclick="fnSp3EditarPlanAnual(${Id},${padrex})"   class='btn-circle btn_read border-0' style='background-color:#58c25d !important;' id='btn_verPlanAnual${Id}'>
                                                    <img src='./images/iconos/edit_1.svg' class='ojo-1'  >
                                                    </button>

                                            </td>

                                            <td width = "9%" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1"  >
                                                <button type='button' title='Editar del Hallazgo' onmouseup="fnSp3eliminarObjetivoSubojetivo('${iddd}')"   class='btn-circle btn_read border-0' style='background-color:#ff6767 !important;' id='btn_verEliminarPlan${Id}'>
                                                    <img src='./images/iconos/delete.svg' class='ojo-1'  >
                                                </button>
                                        </td>

                                        <td width = "2%" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1"  >
                                                <img src='./images/marca_fila.png' class='ojo-1' style='margin-left:-8px;'   onclick='fnSp3SeleccionaFilaObjSub("${iddd}",${nObj},${nSobj})'>
                                        </td>


                                        </tr>



                                        </table>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        ${racimoCierra}

                            `;

                            if(objetivo == 0)
                            {

                                //alert('MI PADRE ES = #obj_'+nObj )
                                var k = nObj;
                                $('#racimo_'+k).append(html1);
                            }
                            else{
                                if(objetivo == 1) //subobjetivos
                                {
                                    $('#body-tabla-list-EvalAud1').append(html1);
                                }
                            }


                    //$('#body-tabla-list-EvalAud1').append(html1);
                    $('#txt_obj_subobj').val("");



                    }
                }//###############################################################################################################################################################################
                else
                {//###############################################fnSp3agregaObjetivoSubojetivo(tipo, objjt,Code, CodePadre, nAct, Id)#########################################################################################################################






                        var racimoAbre;
                        var racimoCierra;

                        var fecha = new Date();fecha.getFullYear()
                        var p = String();
                         p = p.substr(2,4);

                        var hoy = new Date();

                        if(objNewPA.Id === undefined)
                        {
                            objNewPA.Code =   $("#sel_programaNew option:selected").attr("title")+p+'001'  //: "-PASST-TSUP -21- 001" debe generarse en backend
                            objNewPA.Code_Gerencia  = $('#sel_gerenciaNew').val();//: "GayF"//: "GayF"
                            objNewPA.Color_Plan;//: "#000000"
                            objNewPA.Equipo;//: "Equipo1"
                            objNewPA.EquipoId =  $('#sel_equipoNew').val();
                            //objNewPA.Estado_Plan;//: "Creado"
                            objNewPA.Estado_PlanId = 1;//: 1
                            objNewPA.Fecha_Creacion = hoy.getDate()+'/'+(hoy.getMonth()+1)+'/'+hoy.getFullYear()
                            //objNewPA.Gerencia;//: "Gerencia de adminstración y finanzas"
                            objNewPA.GerenciaId = $('#sel_gerenciaNew').val();
                            objNewPA.Id = 0;//: 1
                            objNewPA.Num_Objetivos;//: 5
                            objNewPA.Objetivos;//: (5) [{…}, {…}, {…}, {…}, {…}]
                            //objNewPA.Programa;//: "PASST"
                            objNewPA.ProgramaId =  $('#sel_programaNew').val();//: 1
                            //objNewPA.Sede;//: "Callao Norte"
                            objNewPA.SedeId =  $('#sel_sedeNew').val();//: 1
                            objNewPA.Year_Plan = $('#sel_anioeNew').val();
                            objNewPA.accion = 'nuevo'; //indica si es un nuevo Plan o es una modificación del Plan

                        }

                        var btNew = '';
                        Id = 0;
                        nAct = 0;

                        var objjt = $('#txt_obj_subobj').val();
                    if(objjt != "")
                    {//***************************************************************************************** */
                        var nameobj = objjt;
                        var Id2 = '';


                      //VAMOS A VALIDAR QUE SIEMPRE QUE EXISTA UN OBJETIVO AL CUAL SE LE VAN A GREGAR SUBOBJETIVOS
                       //alert('en que objetivo vamos a meter subobjetos? = '+idfilaSelecta)
                      //VAMOS A VALIDAR QUE SIEMPRE QUE EXISTA UN OBJETIVO AL CUAL SE LE VAN A GREGAR SUBOBJETIVOS
                      //var filaSelecta = '';
                      //var idfilaSelecta = 0;
                        //var o = paObj[istAud].a.Objetivos.length;
                        var color = '#000000';
                                    if(objetivo === 1)
                                    {

                                        // Objetivos[Objetivos.length] = $('#txt_obj_subobj').val();
                                        // var objjt = "Objetivo "+Objetivos.length+" : "+$('#txt_obj_subobj').val();
                                        //iddd = 'obj_'+nObj+"_"+nSobj;


                                      /* PENDIENTE= Validar con Andy
                                      *  if(idfilaSelecta != -1)
                                      *  {nObj = idfilaSelecta;}else{nObj++;}
                                      * */
                                     nObj++;




                                        //si es un objetivo creamos un objeto o subobjetivo
                                        var iu = objNewPA.Objetivos.length
                                        if(iu<1){
                                            $('#body-tabla-list-EvalAud1').html('');
                                        }

                                        //alert('seleccionado('+CodePai+') ==? '+iu);

                                        objNewPA.Objetivos[iu] = new Objetivo();//this.Objetivo_Name;/
                                        objNewPA.Objetivos[iu].Objetivo_Name = $('#txt_obj_subobj').val();
                                        objNewPA.Objetivos[iu].Id = 0;
                                       // objNewPA.Objetivos[iu].Id = iu;

                                        //console.log('OBJETIVOS**', objNewPA.Objetivos);
                                        Code = iu+1;

                                        //alert(objNewPA.Objetivos.length);
                                        objjt = "Objetivo "+Code+" : "+objjt;

                                        nObj = Code;
                                        iddd = 'obj_'+nObj;
                                        var nObj1 = nObj;
                                        color = '#000000';
                                       // var idu = objNewPA.Objetivos[iu].Id;
                                        var idu = iu;
                                        Id2 = iu;
                                        racimoAbre =  ` <div id='racimo_${nObj}'>`;
                                        racimoCierra =  ` </div>`;
                                        CodePai = nObj;
                                    }
                                    else{

                                        if((objetivo == 0)&&(CodePai == -1)){ verModalError("Por favor Revise","Debe Agregar primero un objetivo al Plan Anual")/*fnSp3onchangeObjetivoSubojetitivo('si');*/ }
                                        if((objetivo == 0)&&(CodePai != -1)) //subobjetivos
                                        {
                                            // SubObjetivos[SubObjetivos.length] = $('#txt_obj_subobj').val();
                                            // var objjt = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Subobjetivo "+Objetivos.length+"."+SubObjetivos.length+" : "+$('#txt_obj_subobj').val();
                                            // iddd = 'item'+Objetivos.length+"_"+SubObjetivos.length;
                                            //objjt = "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; SubObjetivo "+Code+"."+CodePadre+" : "+objjt;
                                            //iddd = 'subobj_'+nObj+"_"+nSobj;
                                            nSobj++;
                                            var kk;
                                            var kk1;
                                            if(idfilaSelecta != -1)
                                                {kk1 = idfilaSelecta;}else{kk1 = objNewPA.Objetivos.length;}


                                            var nObj1 = kk1;//CodePai-1;





                                           var kk = kk1-1;
                                            //var kk = kk1;
                                            var Cood = kk+1;
                                            var nSobj1; //var nns = nSobj-1;
                                            color = '#5c5c5c';
                                           //console.log(kk,objNewPA.Objetivos)

                                            var ju = objNewPA.Objetivos[kk].SubObjetivos.length;//SubObjetivos
                                            nSobj1 = ju+1;
                                            objNewPA.Objetivos[kk].SubObjetivos[ju] = new SubObjetivo();//this.Objetivo_Name;/
                                            objNewPA.Objetivos[kk].SubObjetivos[ju].SubObjetivo_Name = $('#txt_obj_subobj').val();
                                            objNewPA.Objetivos[kk].SubObjetivos[ju].Id = 0;
                                           // objNewPA.Objetivos[kk].SubObjetivos[ju].Id = ju;

                                           //var idu = objNewPA.Objetivos[kk].SubObjetivos[ju].Id;
                                           var idu = ju;
                                           iddd = 'subobj_'+nObj1+"_"+nSobj1;
                                            CodePadre = Cood;


                                            objjt = "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; SubObjetivo "+CodePadre+"."+nSobj1+" : "+objjt;
                                            //iddd = 'item'+Code+"_"+CodePadre;
                                            color = '#5c5c5c';
                                            racimoAbre =  ` `;
                                            racimoCierra =  ` `;
                                            CodePai = nObj;
                                            Id2 = ju+'_'+kk;

                                        }
                                    }

                                    console.log("..................")


                        var html1 = '     ';
                            html1 += `
                                    ${racimoAbre}
                                    <div id = '${iddd}'  class="item-tabla p-2" style="z-index: 1;display:relative;  padding: 0px !important; margin: 10px 8px 0px !important; width: 1223px !important;">
                                    <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                                        <div class="col-12 text-center" style="font-size: 15px; padding: 4px !important; ">
                                            <div class="row">
                                                <table width = "100%" border="0">
                                                <tr >
                                                    <td width = "55%" align="center"><div id="c1TabGeny" onclick='fnSp3SeleccionaFilaObjSub("${iddd}",${nObj1},${nSobj1})' class="text-left lbCabezaTabla1" style='margin: 0px 0px 0px 13px !important; font-size:15px !important; color:${color};'  >
                                                    <div id="name_tag_obj_${Id2}">${objjt}</div>
                                                    <div id="capa_name_obj_${Id2}"  style="display:none; ">
                                                    <input type="text"  id="hdd_name_obj_${Id2}" class="text-justify textarea-fecha2 autocompletecollaborator" style="width: 70% !important;" value="${nameobj}">
                                                    <div style="width: 10%; text-align: center;"><button type='button' title='Editar del Plan Anual' onclick="fnSp3EditarObj(${idu},${kk})"   class='btn-circle btn_read border-0 btn-footer-active' style='background-color:#58c25d !important;' id='btn_verPlanAnual${Id}'>
                                                    <img src='./images/iconos/img-check-mark-1.svg' class='ojo-1'  >
                                                    </button></div>
                                                    <div style="width: 10%; text-align: center;"><button type='button' title='Editar del Plan Anual' onclick="fnSp3NoEditarObj(${idu},${kk})"   class='btn-circle btn_read border-0' style='background-color:#58c25d !important;' id='btn_verPlanAnual${Id}'>
                                                    <img src='./images/iconos/delete.svg' class='ojo-1'  >
                                                    </button></div>                                            </div></div></td>
                                                    <td width = "14%" align="center"><div id="nAct_${iddd}" class="text-left lbCabezaTabla1" style='margin-left:50px;'  >${nAct}</div></td>


                                                    <td width = "10%" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1"  >
                                                        <button type='button' title='Actividades del Objetivo' onclick="fnSp3NuevasActividadesObjetivoPlan(${idu},${kk},${objetivo})"   class='btn-circle btn_read border-0' style='background-color:#ffb72b !important;' id='btn_ActividadPlans${idu}'>
                                                            <img src='./images/iconos/folder1.svg' class='ojo-1'  >
                                                        </button>

                                                    </td>

                                                    <td width = "10%" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1"  >
                                                            <button type='button' title='Editar del Plan Anual' onclick="fnSp3EditarPlanAnual(${idu},${kk})"   class='btn-circle btn_read border-0' style='background-color:#58c25d !important;' id='btn_verPlanAnuals${Id}'>
                                                            <img src='./images/iconos/edit_1.svg' class='ojo-1'  >
                                                            </button>

                                                    </td>

                                                    <td width = "9%" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1"  >
                                                        <button type='button' title='Editar del Hallazgo' onmouseup="fnSp3eliminarObjetivoSubojetivo('${iddd}')"   class='btn-circle btn_read border-0' style='background-color:#ff6767 !important;' id='btn_verEliminarPlans${idu}'>
                                                            <img src='./images/iconos/delete.svg' class='ojo-1'  >
                                                        </button>
                                                </td>

                                                <td width = "2%" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1"  >
                                                <img src='./images/marca_fila.png' style='margin-left:-8px;' class='ojo-1' onclick='fnSp3SeleccionaFilaObjSub("${iddd}",${nObj1},${nSobj1})'  >
                                                </td>


                                                </tr>



                                                </table>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                           ${racimoCierra}
                                    `;

                                   // alert(objetivo);
                                    if(objetivo == 0)//subobjetivos
                                    {



                                        if(idfilaSelecta != -1)
                                                {

                                              //      alert('MI PADRExxx ES = #obj_'+idfilaSelecta )
                                                    var k = idfilaSelecta;
                                                    $('#racimo_'+k).append(html1);
                                                }
                                        else{
                                              //  alert('MI PADRE ES = #obj_'+nObj )
                                                var k = objNewPA.Objetivos.length;
                                                $('#racimo_'+k).append(html1);
                                            }

                                    }
                                    else{
                                        if(objetivo == 1) //objetivos
                                        {
                                            $('#body-tabla-list-EvalAud1').append(html1);
                                        }
                                    }

                                    //$('#body-tabla-list-EvalAud1').append(html1);
                                    $('#txt_obj_subobj').val("");




                         $('#c1TabGenyCol1').html("Objetivos ( "+objNewPA.Objetivos.length+" )");/// Subobjetivos ( "+nSobj+" ) ");


                         //console.log('OBJETIVOS**',kk,'-----------', objNewPA.Objetivos);
                        //console.log('COMO VA EL PLAN**-----------', objNewPA);


                    }//*************************************************************************************************** */

            }//###############################################################################################################################################################################

        }
        else
        {
            verModalError("Por favor Revise","Debe seleccionar el año del Plan Anual");
            //$('#divf1_frecuencia').css('border-color', '#ff6767');
            document.getElementById('divfanioeNew').style.setProperty('border-color', '#ff6767', 'important');
            $('#sel_anioeNew').focus();
        }





}//------------------------------------- fini   fnSp3agregaObjetivoSubojetivo() -------------------------------------


var filaSelecta = '';
var idfilaSelecta = -1;
function fnSp3SeleccionaFilaObjSub(idd, no, nso)
{
    if( filaSelecta === '')
    {
        $('#'+idd).css('border-color','#34559C');
        filaSelecta = idd;
    }
    else
    {
        $('#'+filaSelecta).css('border-color','#c3c3c3');
        $('#'+idd).css('border-color','#34559C');
        filaSelecta = idd;
    }
    //console.clear();
   //console.log('DATOS SELECCIONADOS='+idd+'  ,'+no+',   '+nso);
    idfilaSelecta= no;

}

 function fnSp3eliminarObjetivoSubojetivo(idhh)
{//------------------------------------- ini   fnSp3eliminarObjetivoSubojetivo() -------------------------------------
    swal({
        title: "Eliminar",
        text: "¿Desea eliminar el objetivo?",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn-danger btn-sm btn-rounded rounded",
        cancelButtonClass: "btn-success btn-sm btn-rounded rounded",
        confirmButtonText: "Si",
        cancelButtonText: "No",
        closeOnConfirm: true,
        showLoaderOnConfirm: false
      },function(){

        $('#body-tabla-list-EvalAud1').html('');
        nSobj=0;
    //console.table(objNewPA.Objetivos)
     var check_type = idhh.split("_");
     if(check_type[0]==="obj"){
         var pos = (check_type[1]-1)
         if(objNewPA.Objetivos[pos].Id != 0)
         {
            var checkDel =  fnSP3EliminarItemsPlanAnual(1,objNewPA.Objetivos[pos].Id)
           //console.log(checkDel)
            objNewPA.Objetivos.splice(pos,1)
            $('#racimo_'+check_type[1]).remove();

         }else{
         objNewPA.Objetivos.splice(pos,1)
        $('#racimo_'+check_type[1]).remove();
         }


     }else{
        var posObj = (check_type[1]-1)
        var posSubObj = (check_type[2]-1)
        if(objNewPA.Objetivos[posObj].SubObjetivos[posSubObj].Id != 0)
        {
            var checkDel =  fnSP3EliminarItemsPlanAnual(1,objNewPA.Objetivos[posObj].SubObjetivos[posSubObj].Id)
           //console.log(checkDel)
            objNewPA.Objetivos[posObj].SubObjetivos.splice(posSubObj,1)
            $('#'+idhh).remove();

        }else{
            objNewPA.Objetivos[posObj].SubObjetivos.splice(posSubObj,1)
            $('#'+idhh).remove();

        }


       // nSobj--;
     }


   //console.log(objNewPA.Objetivos)

     //if(check_type[0]==="obj"){
                    var pos = (check_type[1]-1)
                        if(objNewPA.Objetivos.length>0){
                            for (let i = 0; i < objNewPA.Objetivos.length; i++) {
                               // if(i>=pos ){
                              //  objNewPA.Objetivos[i].Id = i ;
                              if(objNewPA.Objetivos[i].Id  < 1 ){
                                objNewPA.Objetivos[i].Id = 0 ;
                              }
                                //   }
                               //console.log("ID OBJETIVO:   "+objNewPA.Objetivos[i].Id)
                                var id = i+1;

                               //console.log("111 mando a fnSP3ReordenarObjetivoSubojetivo","ID:"+id)
                                fnSP3ReordenarObjetivoSubojetivo(1,objNewPA.Objetivos[i].Objetivo_Name,objNewPA.Objetivos[i].Code, undefined, objNewPA.Objetivos[i].Actividades.length, id )
                                if(objNewPA.Objetivos[i].SubObjetivos.length>0){
                                   //console.log(objNewPA.Objetivos[i].SubObjetivos.length)
                                    for (let j = 0; j < objNewPA.Objetivos[i].SubObjetivos.length; j++) {
                                        if(objNewPA.Objetivos[i].SubObjetivos[j].SubObjetivo_Name != ""){
                                     //   if(j>=posSObj){
                                       // objNewPA.Objetivos[i].SubObjetivos[j].Id = j ;
                                        if(objNewPA.Objetivos[i].SubObjetivos[j].Id  < 1 ){
                                            objNewPA.Objetivos[i].SubObjetivos[j].Id = 0 ;
                                          }
                                       //  }
                                            var id_=0;
                                         id_ = (j + 1);
                                       //console.log("222 mando a fnSP3ReordenarObjetivoSubojetivo","ID:"+id,"SUBID:"+id_)
                                        fnSP3ReordenarObjetivoSubojetivo(1,objNewPA.Objetivos[i].SubObjetivos[j].SubObjetivo_Name,0, id, objNewPA.Objetivos[i].SubObjetivos[j].Actividades.length, id_ )
                                    }
                                }
                            }
                            }
                        }
        // }else{
        //     var posObj = (check_type[1]-1)
        //     var posSObj = (check_type[2]-1)
        //    //console.log(objNewPA.Objetivos[posObj].SubObjetivos.length,objNewPA.Objetivos[posObj].SubObjetivos)
        //     if(objNewPA.Objetivos[posObj].SubObjetivos.length>0){
        //         for (let i = 0; i < objNewPA.Objetivos[posObj].SubObjetivos.length; i++) {
        //             if(i>=posSObj){
        //                 objNewPA.Objetivos[posObj].SubObjetivos[i].Id = (objNewPA.Objetivos[posObj].SubObjetivos[i].Id-1) ;
        //             }
        //             var id = (objNewPA.Objetivos[posObj].SubObjetivos[i].Id + 1);
        //            //console.log("333 mando a fnSP3ReordenarObjetivoSubojetivo")
        //             fnSP3ReordenarObjetivoSubojetivo(1,objNewPA.Objetivos[posObj].SubObjetivos[i].SubObjetivo_Name,0, check_type[1], objNewPA.Objetivos[posObj].SubObjetivos[i].Actividades.length, id )
        //         }
        //     }
        // }

     $('#c1TabGenyCol1').html("Objetivos ( "+objNewPA.Objetivos.length+" )");/// Subobjetivos ( "+nSobj+" ) ");
              });




}//------------------------------------- fini   fnSp3eliminarObjetivoSubojetivo() -------------------------------------


 function fnSP3EliminarItemsPlanAnual(tipo, id) {
    var response = 0;
        showLoading();

         var created_by = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);


        url = apiUrlssoma+"/api/Post-Plan-Anual?code=ZnQh7E2Noeiv1emsJPTvXE5l/qClcMIjv3FNePN8XTRfTY5aOqmSAQ==&httpmethod=deleteItem&tipoItem="+tipo+"&idItem="+id+"&created_by="+created_by;

    let headers ={
        "apikey":constantes.apiKey
    }

    $.ajax({
        method: "POST",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    })
    .done(function(data)
    {
        hideLoading();

        console.info("data",data)
        // resultado Exitoso
        if(data.resul>0)
        {
            response =1;
           switch (tipo) {
            case 1:
                $('#text_msj_confirm_exito').html('Se Elimin&oacute; el Objetivo con &Eacute;xito')
                   break;
            case 2:
               $('#text_msj_confirm_exito').html('Se Elimin&oacute; la Actividad con &Eacute;xito')
            break;
            case 3:
                $('#text_msj_confirm_exito').html('Se Elimin&oacute; la Tarea con &Eacute;xito')
            break;
           }

            $('#modalExitoCorreccionPlanAnualSp3').modal('show').addClass('fade')
        }else
        {
        verModalError("Lo Sentimos","No Se Pudo Realizar La Operacion.")

        }
    })
    .fail(function( jqXHR, textStatus, errorThrown )
    {
        console.error("fail",textStatus)
        verModalError("Lo Sentimos","No Se Pudo Realizar La Operacion.")
        return 0;

       })
    .always(function( jqXHR, textStatus, errorThrown )
    {
        console.info("always",textStatus)
        hideLoading();

    });//*/
    return response;
}

function fnSP3ReordenarObjetivoSubojetivo(tipo, objjt,Code, CodePadre, nAct, Id){
//------------------------------------- init   fnSP3ReordenarObjetivoSubojetivo() -------------------------------------

       //console.log("fnSP3ReordenarObjetivoSubojetivo", tipo, objjt,Code, CodePadre, nAct, Id)
          var padrex;
        if(objjt != "")
        {
            var nameobj = objjt;

            var pos_act=(Id-1);
            if(CodePadre === 0 )
            {console.log('cargar objetivos');}else{if(CodePadre > 0)console.log('cargar subbjetivos');}

            var btNew = '';
            var Id2 = '';
            var color = '#000000';
            if( CodePadre === undefined)
            {
                objjt = "Objetivo "+Id+" : "+objjt;
                // Objetivos[Objetivos.length] = $('#txt_obj_subobj').val();
                // var objjt = "Objetivo "+Objetivos.length+" : "+$('#txt_obj_subobj').val();
                // if ( document.getElementById( 'obj_'+Id )) {
                //     iddd = 'obj_'+(Id+1);//+"_"+nSobj;
                //     }else{
                //     iddd = 'obj_'+Id;//+"_"+nSobj;
                //     }
                    iddd = 'obj_'+Id;//+"_"+nSobj;
                    Id2 = Id;
                color = '#000000';
                //nObj++;
                racimoAbre =  ` <div id='racimo_${Id}'>`;
                racimoCierra =  ` </div>`;
                padrex = undefined;
            }
            else{
                if(CodePadre => 0) //subobjetivos
                {
                    // SubObjetivos[SubObjetivos.length] = $('#txt_obj_subobj').val();
                    // var objjt = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Subobjetivo "+Objetivos.length+"."+SubObjetivos.length+" : "+$('#txt_obj_subobj').val();
                    // iddd = 'item'+Objetivos.length+"_"+SubObjetivos.length;
                    padrex = (CodePadre-1);
                    objjt = "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; SubObjetivo "+CodePadre+"."+Id+" : "+objjt;
                    //iddd = 'subobj_'+Id+"_"+nSobj;
                    iddd = 'subobj_'+CodePadre+"_"+Id;
                    color = '#5c5c5c';
                    nSobj++;
                    racimoAbre =  ` `;
                    racimoCierra =  ` `;
                   // padrex = Id;
                   Id2 = Id+'_'+padrex;

                }
            }

         $('#c1TabGenyCol1').html("Objetivos ( "+Id+" )");/// Subobjetivos ( "+nSobj+" ) ");

            var html1 = '     ';

            // if(nObjSub == 0)
            // {
            //     $('#body-tabla-list-EvalAud1').html("     "); nObjSub = 1;
            // }
console.log("..................")


                html1 += `
                ${racimoAbre}
                <div id = '${iddd}'  class="item-tabla p-2" style="z-index: 1;display:relative;  padding: 0px !important; margin: 10px 8px 0px !important; width: 1223px !important;">
                <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                    <div class="col-12 text-center" style="font-size: 15px; padding: 4px !important; ">
                        <div class="row">
                            <table width = "100%" border="0">
                            <tr >
                                <td width = "55%" align="center"><div id="c1TabGeny" onclick='fnSp3SeleccionaFilaObjSub("${iddd}",${Id},${nSobj})' class="text-left lbCabezaTabla1" style='margin: 0px 0px 0px 13px !important; font-size:15px !important; color:${color}'  >
                                <div id="name_tag_obj_${Id2}">${objjt}</div>
                                <div id="capa_name_obj_${Id2}"  style="display:none; ">
                                <input type="text"  id="hdd_name_obj_${Id2}" class="text-justify textarea-fecha2 autocompletecollaborator" style="width: 70% !important;" value="${nameobj}">
                                <div style="width: 10%; text-align: center;"><button type='button' title='Editar del Plan Anual' onclick="fnSp3EditarObj(${Id},${padrex})"   class='btn-circle btn_read border-0 btn-footer-active' style='background-color:#58c25d !important;' id='btn_verPlanAnual${Id}'>
                                <img src='./images/iconos/img-check-mark-1.svg' class='ojo-1'  >
                                </button></div>
                                <div style="width: 10%; text-align: center;"><button type='button' title='Editar del Plan Anual' onclick="fnSp3NoEditarObj(${Id},${padrex})"  class='btn-circle btn_read border-0' style='background-color:#58c25d !important;' id='btn_verPlanAnual${Id}'>
                                <img src='./images/iconos/delete.svg' class='ojo-1'  >
                                </button></div>                                            </div></div></td>
                                <td width = "14%" align="center"><div id="nAct_${iddd}" class="text-left lbCabezaTabla1" style='margin-left:50px;'  >${nAct}</div></td>


                                <td width = "10%" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1"  >
                                    <button type='button' title='Actividades del Objetivo' onclick="fnSp3NuevasActividadesObjetivoPlan(${pos_act},${padrex},${tipo})"   class='btn-circle btn_read border-0' style='background-color:#ffb72b !important;' id='btn_ActividadPlan${Id}'>
                                        <img src='./images/iconos/folder1.svg' class='ojo-1'  >
                                    </button>

                                </td>

                                <td width = "10%" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1"  >
                                        <button type='button' title='Editar del Plan Anual' onclick="fnSp3EditarPlanAnual(${Id},${padrex})"   class='btn-circle btn_read border-0' style='background-color:#58c25d !important;' id='btn_verPlanAnual${Id}'>
                                        <img src='./images/iconos/edit_1.svg' class='ojo-1'  >
                                        </button>

                                </td>

                                <td width = "9%" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1"  >
                                    <button type='button' title='Editar del Hallazgo' onmouseup="fnSp3eliminarObjetivoSubojetivo('${iddd}')"   class='btn-circle btn_read border-0' style='background-color:#ff6767 !important;' id='btn_verEliminarPlan${Id}'>
                                        <img src='./images/iconos/delete.svg' class='ojo-1'  >
                                    </button>
                            </td>

                            <td width = "2%" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1"  >
                                    <img src='./images/marca_fila.png' class='ojo-1' style='margin-left:-8px;'   onclick='fnSp3SeleccionaFilaObjSub("${iddd}",${Id},${nSobj})'>
                            </td>


                            </tr>



                            </table>


                            </div>
                        </div>
                    </div>
                </div>
            ${racimoCierra}

                `;

                if(CodePadre === undefined)
                {
                   //console.log("soy huerfano")
                    $('#body-tabla-list-EvalAud1').append(html1);

                    //alert('MI PADRE ES = #obj_'+nObj )
                }
                else{
                    if(CodePadre >= 0) //subobjetivos
                    {
                        $('#racimo_'+CodePadre).append(html1);
                    }
                }


          //$('#body-tabla-list-EvalAud1').append(html1);
         $('#txt_obj_subobj').val("");



        }

}
//------------------------------------- finit   fnSP3ReordenarObjetivoSubojetivo() -------------------------------------


function fnSp3NoEditarObj (pos,padre)
{
    if(padre === undefined){
         $("#hdd_name_obj_"+pos).val(objNewPA.Objetivos[pos].Objetivo_Name);
        }else{
        $("#hdd_name_obj_"+pos).val(objNewPA.Objetivos[padre].SubObjetivos[pos].SubObjetivo_Name);
        }
        $('#capa_name_obj_'+pos).removeClass("d-flex justify-content-between align-items-center")
        $('#name_tag_obj_'+pos).show()
        $('#capa_name_obj_'+pos).hide()
}


function fnSp3EditarObj (pos,padre)
{
    if(padre === undefined){
       //console.log($("#hdd_name_obj_"+pos).val())
    objNewPA.Objetivos[pos].Objetivo_Name = $("#hdd_name_obj_"+pos).val();
    }else{
    objNewPA.Objetivos[padre].SubObjetivos[pos].SubObjetivo_Name = $("#hdd_name_obj_"+pos+"_"+padre).val();
    }
    $('#capa_name_obj_'+pos+"_"+padre).removeClass("d-flex justify-content-between align-items-center")
    $('#name_tag_obj_'+pos+"_"+padre).show()
    $('#capa_name_obj_'+pos+"_"+padre).hide()

    if(objNewPA.Objetivos.length>0){
        $("#body-tabla-list-EvalAud1").html("");

        for (let i = 0; i < objNewPA.Objetivos.length; i++) {
           //console.log("ID OBJETIVO:   "+objNewPA.Objetivos[i].Id)


            fnSP3ReordenarObjetivoSubojetivoEditar(1,objNewPA.Objetivos[i].Objetivo_Name,objNewPA.Objetivos[i].Code, undefined, objNewPA.Objetivos[i].Actividades.length, i,i,undefined,pos )
            if(objNewPA.Objetivos[i].SubObjetivos.length>0){
               // numSobj = numSobj + objNewPA.Objetivos[i].SubObjetivos.length;
               CodePai++;
               //console.log(objNewPA.Objetivos[i].SubObjetivos.length)
                for (let j = 0; j < objNewPA.Objetivos[i].SubObjetivos.length; j++) {
                    if(objNewPA.Objetivos[i].SubObjetivos[j].SubObjetivo_Name != ""){

                        var id_=0;
                   //console.log("222 mando a fnSP3ReordenarObjetivoSubojetivo","ID:"+i,"SUBID:"+j)
                    fnSP3ReordenarObjetivoSubojetivoEditar(1,objNewPA.Objetivos[i].SubObjetivos[j].SubObjetivo_Name,0, i, objNewPA.Objetivos[i].SubObjetivos[j].Actividades.length, j, i, j,pos)
                }
            }
        }
        }
    }

    $('#c1TabGenyCol1').html("Objetivos ( "+objNewPA.Objetivos.length+" )"); /// Subobjetivos ( "+numSobj+" ) ");

}

function fnSP3ReordenarObjetivoSubojetivoEditar(tipo, objjt,Code, CodePadre, nAct, Id,posobj,possobj,posobject){
    //------------------------------------- init   fnSP3ReordenarObjetivoSubojetivo() -------------------------------------

           //console.log("fnSP3ReordenarObjetivoSubojetivo", tipo, objjt,Code, CodePadre, nAct, Id,posobj,possobj)
              var padrex;

            if(objjt != "")
            {
                var nameobj = objjt;

                var pos_act=posobj;
                if(CodePadre === 0 )
                {console.log('cargar objetivos');}else{if(CodePadre > 0)console.log('cargar subbjetivos');}

                var btNew = '';
                var Id2 = '';
                var color = '#000000';
                if( CodePadre === undefined)
                {
                    objjt = "Objetivo "+(posobj+1)+" : "+objjt;
                    // Objetivos[Objetivos.length] = $('#txt_obj_subobj').val();
                    // var objjt = "Objetivo "+Objetivos.length+" : "+$('#txt_obj_subobj').val();
                    // if ( document.getElementById( 'obj_'+Id )) {
                    //     iddd = 'obj_'+(Id+1);//+"_"+nSobj;
                    //     }else{
                    //     iddd = 'obj_'+Id;//+"_"+nSobj;
                    //     }
                        iddd = 'obj_'+Id;//+"_"+nSobj;
                        Id2 = pos_act;
                    color = '#000000';
                    //nObj++;
                    racimoAbre =  ` <div id='racimo_${Id}'>`;
                    racimoCierra =  ` </div>`;
                    padrex = undefined;
                }
                else{
                    if(CodePadre => 0) //subobjetivos
                    {
                       //console.log(CodePadre)
                        var pos_act=possobj;
                        // SubObjetivos[SubObjetivos.length] = $('#txt_obj_subobj').val();
                        // var objjt = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Subobjetivo "+Objetivos.length+"."+SubObjetivos.length+" : "+$('#txt_obj_subobj').val();
                        // iddd = 'item'+Objetivos.length+"_"+SubObjetivos.length;
                        padrex = posobj;
                        objjt = "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; SubObjetivo "+(posobj+1)+"."+(possobj+1)+" : "+objjt;
                        //iddd = 'subobj_'+Id+"_"+nSobj;
                        iddd = 'subobj_'+CodePadre+"_"+Id;
                        color = '#5c5c5c';
                        nSobj++;
                        racimoAbre =  ` `;
                        racimoCierra =  ` `;
                       // padrex = Id;
                       Id2 = pos_act+'_'+padrex;

                    }
                }

            // $('#c1TabGenyCol1').html("Objetivos ( "+Id+" )/ Subobjetivos ( "+nSobj+" ) ");

                var html1 = '     ';

                // if(nObjSub == 0)
                // {
                //     $('#body-tabla-list-EvalAud1').html("     "); nObjSub = 1;
                // }


                    html1 += `
                    ${racimoAbre}
                    <div id = '${iddd}'  class="item-tabla p-2" style="z-index: 1;display:relative;  padding: 0px !important; margin: 10px 8px 0px !important; width: 1223px !important;">
                    <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                        <div class="col-12 text-center" style="font-size: 15px; padding: 4px !important; ">
                            <div class="row">
                                <table width = "100%" border="0">
                                <tr >
                                    <td width = "55%" align="center"><div id="c1TabGeny" onclick='fnSp3SeleccionaFilaObjSub("${iddd}",${pos_act+1},${Id})' class="text-left lbCabezaTabla1" style='margin: 0px 0px 0px 13px !important; font-size:15px !important; color:${color}'  >
                                    <div id="name_tag_obj_${Id2}">${objjt}</div>
                                   <div id="capa_name_obj_${Id2}"  style="display:none; ">
                                   <input type="text"  id="hdd_name_obj_${Id2}" class="text-justify textarea-fecha2 autocompletecollaborator" style="width: 70% !important;" value="${nameobj}">
                                   <div style="width: 10%; text-align: center;"><button type='button' title='Editar del Plan Anual' onclick="fnSp3EditarObj(${pos_act},${padrex})"   class='btn-circle btn_read border-0 btn-footer-active' style='background-color:#58c25d !important;' id='btn_verPlanAnual${Id}'>
                                   <img src='./images/iconos/img-check-mark-1.svg' class='ojo-1'  >
                                   </button></div>
                                   <div style="width: 10%; text-align: center;"><button type='button' title='Editar del Plan Anual' onclick="fnSp3NoEditarObj(${pos_act},${padrex})"   class='btn-circle btn_read border-0' style='background-color:#58c25d !important;' id='btn_verPlanAnual${Id}'>
                                   <img src='./images/iconos/delete.svg' class='ojo-1'  >
                                   </button></div>
                                            </div></div></td>
                                    <td width = "14%" align="center"><div id="nAct_${iddd}" class="text-left lbCabezaTabla1" style='margin-left:50px;'  >${nAct}</div></td>


                                    <td width = "10%" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1"  >
                                        <button type='button' title='Actividades del Objetivo' onclick="fnSp3NuevasActividadesObjetivoPlanEditar(${pos_act},${padrex},${tipo},${posobject},${Id})"   class='btn-circle btn_read border-0' style='background-color:#ffb72b !important;' id='btn_ActividadPlan${Id}'>
                                            <img src='./images/iconos/folder1.svg' class='ojo-1'  >
                                        </button>

                                    </td>

                                    <td width = "10%" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1"  >
                                            <button type='button' title='Editar del Plan Anual' onclick="fnSp3EditarPlanAnual(${pos_act},${padrex})"   class='btn-circle btn_read border-0 btn_hab_sta' style='background-color:#58c25d !important;' id='btn_verPlanAnual${Id}'>
                                            <img src='./images/iconos/edit_1.svg' class='ojo-1'  >
                                            </button>

                                    </td>

                                    <td width = "9%" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1"  >
                                        <button type='button' title='Editar del Hallazgo' onmouseup="fnSp3eliminarObjetivoSubojetivo('${iddd}')"   class='btn-circle btn_read border-0 btn_hab_sta' style='background-color:#ff6767 !important;' id='btn_verEliminarPlan${Id}'>
                                            <img src='./images/iconos/delete.svg' class='ojo-1'  >
                                        </button>
                                </td>

                                <td width = "2%" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1"  >
                                        <img src='./images/marca_fila.png' class='ojo-1' style='margin-left:-8px;'   onclick='fnSp3SeleccionaFilaObjSub("${iddd}",${pos_act+1},${Id})'>
                                </td>


                                </tr>



                                </table>


                                </div>
                            </div>
                        </div>
                    </div>
                ${racimoCierra}

                    `;

                    if(CodePadre === undefined)
                    {
                       //console.log("soy huerfano")
                        $('#body-tabla-list-EvalAud1').append(html1);

                        //alert('MI PADRE ES = #obj_'+nObj )
                    }
                    else{
                        if(CodePadre >= 0) //subobjetivos
                        {
                           //console.log("soy hijo de "+CodePadre)

                            $('#racimo_'+CodePadre).append(html1);
                        }
                    }


              //$('#body-tabla-list-EvalAud1').append(html1);
             $('#txt_obj_subobj').val("");



            }

    }
    //------------------------------------- finit   fnSP3ReordenarObjetivoSubojetivo() -------------------------------------



function fnSp3ModalVerPlanAnual(idPlanx)
{//------------------------------------- ini   fnSp3ModalVerPlanAnual() -------------------------------------

//alert('vamos a agregar al Plan');

    istAud = idPlanx;
    $("#Sp3VentanaPlanAnualEditView").modal("show").addClass("fade");

    //document.getElementByIdetElementById('Sp3VentanaPlanAnualEditView')




    $("#lbTitleVerPlanAnual").html("Datos del Plan Anual "+paObj[idPlanx].a.Code);

    //cargamos la data del plan anual
    $('#sel_programaNew').val(paObj[idPlanx].a.ProgramaId);
    $('#sel_gerenciaNew').val(paObj[idPlanx].a.GerenciaId); //SedeId    EquipoId
    $('#sel_sedeNew').val(paObj[idPlanx].a.SedeId);
    $('#sel_equipoNew').val(paObj[idPlanx].a.EquipoId);

    //$('#txt_obj_subobj').val('  ');
    fnSp3onchangeObjetivoSubojetitivo('si')

    //vamos a agregar los objetivos y subobjetivos
    if(paObj[idPlanx].a.Objetivos.length > 0)
     {

        var i = 0;
        paObj[idPlanx].a.Objetivos.map(function(item)
        {
            $('#txt_obj_subobj').val(item.Objetivo_Name);
            $('#idNumAct').val(item.Nun_Actividades);
            fnSp3onchangeObjetivoSubojetitivo('si')
            //$('#btAgrObjetivo').trigger('click');
            fnSp3agregaObjetivoSubojetivo(1,item.Objetivo_Name,item.Code, 0, item.Nun_Actividades, item.Id );//fnSp3agregaObjetivoSubojetivo(tipo, obj, nAct, Id)

            i++;
                if(item.Actividades.length > 0)
                    {
                        var j = 0;
                        $('#body-tabla-list-EvalAud2').html(" ");
                        item.Actividades.map(function(item1_1)
                            {
                                //fnSp3agregaObjetivoSubojetivo(0, item1.SubObjetivo_Name, item1.Code, item.Code, item1.Nun_Actividades, item1.Id )
                                //console.log('Actividad_'+item1_1.Id)
                                fnSp3agregaActividadObjetivoPlan(j, item.Code, item1_1);
                                j++;

                                    var k = 0;
                                    //
                                    if(item1_1.Tareas.length > 0)
                                    {//-------------------------------------------------------------------
                                            item1_1.Tareas.map(function(item1_2)
                                            {

                                                   fnSp3agregaTareaActividadObjetivoPlan(k, item1_2);
                                                   k++;

                                            }
                                            );
                                    }//-------------------------------------------------------------------


                                    var u = 0;
                                    //
                                    if(item1_1.Cronogramas.length > 0)
                                    {//-------------------------------------------------------------------
                                            item1_1.Cronogramas.map(function(item1_2)
                                            {

                                                   fnSp3verCronogramaPlan(u, item1_2);
                                                   u++;

                                            }
                                            );
                                    }//-------------------------------------------------------------------

                            });
                    }

                if(item.SubObjetivos.length > 0)
                    {
                           //console.log('Objetivo_'+item.Id) //

                        item.SubObjetivos.map(function(item2)
                        {
                            fnSp3agregaObjetivoSubojetivo(0, item2.SubObjetivo_Name, item2.Code, item.Code, item2.Nun_Actividades, item2.Id )
                        });
                    }
         });

     }



}//------------------------------------- ini   fnSp3ModalVerPlanAnual() -------------------------------------





function fnSp3EditarPlanAnual(ided,CodePadre)
{//------------------------------------- ini   fnSp3EditarPlanAnual() -------------------------------------

   //alert('vamos a editar el plan = '+ided);

   if(CodePadre === undefined){
    $('#name_tag_obj_'+ided).hide()
    $('#capa_name_obj_'+ided).show()
    $('#capa_name_obj_'+ided).addClass("d-flex justify-content-between align-items-center")
   }else{
    $('#name_tag_obj_'+ided+'_'+CodePadre).hide()
    $('#capa_name_obj_'+ided+'_'+CodePadre).show()
    $('#capa_name_obj_'+ided+'_'+CodePadre).addClass("d-flex justify-content-between align-items-center")
   }




}//------------------------------------- ini   fnSp3EditarPlanAnual() -------------------------------------



function fnSp3VerPlanesGerenciaYear()
{
  //voy a crear un plan nuevo para este programa+gerencia+año
   //voy a crear un plan nuevo para este programa+gerencia+año

   var programk = $('#sel_programaNew').val();
   var gerenciak = $('#sel_gerenciaNew').val();
   var sedek = $('#sel_sedeNew').val();
   var anioA = $('#sel_anioeNew').val();
   var anioS = anioA+1;
  //console.log(anioA)
   if(anioA == 0){
    var fecha =  new Date();
     anioA = fecha.getFullYear();
     anioS = anioA+1;
   }


 //console.log("***********",programk,gerenciak,anioA,anioS);


   validaPlan(programk, gerenciak, sedek, anioA)
}


function validaPlan(co_p, co_ger, co_sede, year)
{   var salida = 0;//respuesta de la busqueda
    var nn = objNewPA2.length;
    $('#msg_sel_gerencia').css('visibility','hidden');
    $('#msg_sel_sede').css('visibility','hidden');

    $("#btGuardarPlan").attr("disabled", false)
    $("#btAgrObjetivo").attr("disabled", false)

    //alert(nn);
    //alert(co_ger);
console.log(objNewPA2)
   if(co_ger >0)//vamos a validar gerencia
   {
        objNewPA2.map(function(item)
        {

            //console.log("PLAN = "+item.Code)

           //console.log("if(",item.GerenciaId ,"==", co_ger, "&&", item.Year_Plan, "==", year)
            if(item.GerenciaId == co_ger && item.Year_Plan == year)
            {
                $("#btGuardarPlan").attr("disabled", true)
                $("#btAgrObjetivo").attr("disabled", true)
                $('#msg_sel_gerencia').css('visibility','visible');
                $('#msg_sel_gerencia').html("Esta gerencia ya cuenta con plan anual, Cód:"+item.Code);
                salida = 1;
            }
            // else
            // {    if(salida == 0)
            //      $('#msg_sel_gerencia').css('visibility','hidden');
            // }


        });
        fnSp3BloqueaSede(1)
   }
   else
   {   if(co_ger == 0){ fnSp3BloqueaSede(0);}
       if(co_sede >0)//vamos a validar la sede
       {//--------------------------------------
                objNewPA2.map(function(item)
                {
                   //console.log("if(",item.SedeId ,"==", co_sede, "&&", item.Year_Plan, "==", year)

                    if(item.SedeId == co_sede && item.Year_Plan == year)
                    {
                        $("#btGuardarPlan").attr("disabled", true)
                        $("#btAgrObjetivo").attr("disabled", true)

                        $('#msg_sel_sede').css('visibility','visible');
                        $('#msg_sel_sede').html("Esta sede ya cuenta con plan anual, Cód:"+item.Code);
                        salida = 1;
                    }
                    // else
                    // {   if(salida == 0)
                    //     $('#msg_sel_gerencia').css('visibility','hidden');
                    // }
                });
           fnSp3BloqueaGerencia(1);

       }else{if(co_sede == 0){fnSp3BloqueaGerencia(0);}}
   }

  return salida;

}



function fnSp3BloqueaSede(q)
{//------------------------------------- ini   fnSp3BloqueaSede() -------------------------------------
    if(q ==1)    //inactivar
    {
        $('#divfSedeNew').css('background-color','#efefef');
        $('#sel_sedeNew').css('background-color','#efefef');
        $('#sel_sedeNew').prop('disabled', true);

    }
    else //activar
    {
        if(q ==0)
           {
            $('#divfSedeNew').css('background-color','#ffffff');
            $('#sel_sedeNew').css('background-color','#ffffff');
            $('#sel_sedeNew').prop('disabled', false);
           }
    }

}//------------------------------------- ini   fnSp3BloqueaSede() -------------------------------------

function fnSp3BloqueaGerencia(q)
{//------------------------------------- ini   fnSp3BloqueaSede() -------------------------------------
    if(q ==1)    //inactivar
    {
        $('#divfGerenciaNew').css('background-color','#efefef');
        $('#sel_gerenciaNew').css('background-color','#efefef');
        $('#sel_gerenciaNew').prop('disabled', true);

        $('#divfEquipoNew').css('background-color','#efefef');
        $('#sel_equipoNew').css('background-color','#efefef');
        $('#sel_equipoNew').prop('disabled', true);

    }
    else //activar
    {
        if(q ==0)
           {
            $('#divfGerenciaNew').css('background-color','#ffffff');
            $('#sel_gerenciaNew').css('background-color','#ffffff');
            $('#sel_gerenciaNew').prop('disabled', false);

            $('#divfEquipoNew').css('background-color','#ffffff');
            $('#sel_equipoNew').css('background-color','#ffffff');
            $('#sel_equipoNew').prop('disabled', false);
           }

    }

}//------------------------------------- ini   fnSp3BloqueaSede() -------------------------------------



function fnSp3ajustaFechaPlan(param)
{
    if(param == 'sel_year_frecuencia')
    {
        var c = $('#sel_year_frecuencia').val();
        $('#sel_anioeNew').val(c);
        document.getElementById('divf1_frecuencia').style.setProperty('border-color', '#DEE2E6', 'important');
    }
    else
    {
        if(param == 'sel_anioeNew')
            {
                var c = $('#sel_anioeNew').val();
                $('#sel_year_frecuencia').val(c);
                document.getElementById('divf1_frecuencia').style.setProperty('border-color', '#DEE2E6', 'important');
            }
    }
}




function verModalAdvertencia(subTitulo, msg)
{

  //alert("error");
  $('#subTituloAdv').html(" ")//subTituloAdv
  $('#subTituloAdv').html('<b>'+subTitulo+'</b>'); //cerrarModal

  $('#mensajeAdv').html(" ")//mensajeAdv
  $('#mensajeAdv').html('<p>'+msg+'</p>'); //cerrarModal


  cerrarModal('modal-save');
  $('#modalMsgAdv').css('z-index','9999999');
  $('#modalMsgAdv').modal('show').addClass('fade');



}





function fnSp3GuardarPlan()
{//------------------------------------- ini   fnSp3GuardarPlan() -------------------------------------

   //antes que nada vamos a ver y validar los datos minimos para guardar el plan hermano

   var a = $('#sel_programaNew').val();
   var d = $('#sel_gerenciaNew').val();
   var b = $('#sel_sedeNew').val();
   var c = $('#sel_equipoNew').val();
   var d = $('#sel_anioeNew').val();
   var marca = 0;



    if(a == 0){  document.getElementById('divfPlan1').style.setProperty('border-color', '#ff6767', 'important'); marca = 1;}
    if(b == 0){if(d == 0){ document.getElementById('divfGerenciaNew').style.setProperty('border-color', '#ff6767', 'important'); marca = 1;}}
    if(d == 0){if(b == 0){ document.getElementById('divfSedeNew').style.setProperty('border-color', '#ff6767', 'important'); marca = 1;}}
    if(b == 0){if(d == 0){ document.getElementById('divfEquipoNew').style.setProperty('border-color', '#ff6767', 'important'); marca = 1;}}
    if(a == 0){  document.getElementById('divfanioeNew').style.setProperty('border-color', '#ff6767', 'important');marca = 1; }

    if(marca == 1)
    {
        verModalError('Por favor Revise','Existen Campos Vacios o Incompletos');
    }
    else
    {
        if(marca == 0)
          {
                 $('#Sp3VentanaPlanAnualEditView').modal('hide').removeClass('fade');
                 $('#modalConfirmPlan').modal('show').addClass('fade');
          }
    }


    //$('#Sp3VentanaPlanAnualEditView').modal('hide').removeClass('fade');
    //$('#modalConfirmPlan').modal('show').addClass('fade');






}//------------------------------------- ini   fnSp3GuardarPlan() -------------------------------------

function  fnSp3onchangeColorPlanAnual(id,id2,tipo)
{

    if(tipo == 'select')
    {
        //alert($('#'+id).val())
        if($('#'+id2).val() != 0)
        {
            if(id == 'divfGerenciaNew')
            {
                document.getElementById('divfSedeNew').style.setProperty('border-color', '#DEE2E6', 'important');
            }

            if(id == 'divfSedeNew')
            {
                document.getElementById('divfGerenciaNew').style.setProperty('border-color', '#DEE2E6', 'important');
                document.getElementById('divfEquipoNew').style.setProperty('border-color', '#DEE2E6', 'important');
            }


            document.getElementById(id).style.setProperty('border-color', '#DEE2E6', 'important');
        }
    }

}


function fnSP3LimpiarmodalRegistro(){
    $('#divfSedeNew').css('background-color','#ffffff');
    $('#sel_sedeNew').css('background-color','#ffffff');
    $('#sel_sedeNew').prop('disabled', false);

    $('#divfGerenciaNew').css('background-color','#ffffff');
    $('#sel_gerenciaNew').css('background-color','#ffffff');
    $('#sel_gerenciaNew').prop('disabled', false);

    $('#divfEquipoNew').css('background-color','#ffffff');
    $('#sel_equipoNew').css('background-color','#ffffff');
    $('#sel_equipoNew').prop('disabled', false);
    objNewPA =  [];
   //console.log(objNewPA)
    $("#body-tabla-list-EvalAud1").html("");
    $("#body-tabla-list-EvalAud2").html("");
    $("#body-tabla-list-EvalAud3").html("");

    $("#msg_sel_sede").html("");
    $("#msg_sel_gerencia").html("");
    $("#c1TabGenyCol1").html("Objetivos ( 0 )/ Subobjetivos ( 0 ) ");
    numSobj=0;
    nSobj=0;
    nObj=0;
   

}




function fnSp3GuardarPlanAnualInsertUpdate()
{
        showLoading();
        $('#modalConfirmPlan').modal('hide').removeClass('fade');//cerramos el mensaje de quieres guardar
        $('#Sp3VentanaPlanAnualEditView').modal('hide').removeClass('fade');

   //btGuardarModPlan  //<b>Confirmar</b>
   $('#btGuardarModPlan').html("<b>Guardando...</b>")




   //--------------------------fecha actual ---------------------------------
  var f = new Date(); var d;
  d = f.getFullYear();
  d = d+'-'+(f.getMonth()+1);
  d = d+'-'+f.getDate();
  d = d +' '+ f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()+":"+f.getMilliseconds();
  //--------------------------fecha actual ---------------------------------



  //preparamos la data para el servicio
  objNewPA.Email_Supervisor = getCookie("vtas_internal_useruser"+sessionStorage.tabVisitasa)
//   objNewPA.Create_By = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
//   objNewPA.Create_Date =  moment().format('YYYY-MM-DD HH:mm:ss');    //d;//2021-01-01 15:34:05.000
//   objNewPA.Last_Update_By =  getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
//   objNewPA.Last_Update_Date = moment().format('YYYY-MM-DD HH:mm:ss');  //d;
  objNewPA.ProgramaId     = $("#sel_programaNew").val();
  objNewPA.GerenciaId     = $("#sel_gerenciaNew").val();
  objNewPA.SedeId     = $("#sel_sedeNew").val();
  objNewPA.EquipoId     = $("#sel_equipoNew").val();
  objNewPA.Year_Plan     = $("#sel_anioeNew").val();
  objNewPA.Estado_PlanId     = 1;

  objNewPA.Suspendido = TEMP_SUSPENDER;
  objNewPA.MotivoSuspencion = "";

  var msj_confirm ="<b> Se Guard&oacute; el Plan Anual con el C&oacute;digo:</b>"
 //console.log('VAMOS AGUARDAR ESTE PLAN ################################################')
 //console.log(objNewPA);
 //console.log('VAMOS AGUARDAR ESTE PLAN ################################################')
  var httpmethod = "post";
  if(objNewPA.Id > 0 ){
    httpmethod = "put";
     msj_confirm ="<b> Se Modific&oacute; el Plan Anual con el C&oacute;digo:</b>"
     objNewPA.Last_Update_By =  getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
     objNewPA.Last_Update_Date = moment().format('YYYY-MM-DD HH:mm:ss'); 
  }else{
    objNewPA.Create_By = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
    objNewPA.Create_Date =  moment().format('YYYY-MM-DD HH:mm:ss');    //d;//2021-01-01 15:34:05.000
    objNewPA.Last_Update_By =  getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
    objNewPA.Last_Update_Date = moment().format('YYYY-MM-DD HH:mm:ss'); 
  }
  var url = apiUrlssoma+"/api/Post-Plan-Anual?code=ZnQh7E2Noeiv1emsJPTvXE5l/qClcMIjv3FNePN8XTRfTY5aOqmSAQ==&httpmethod="+httpmethod;
 // var url ="http://localhost:7071/api/Post-PlanAnual?httpmethod="+httpmethod

 console.log("er andy 2936::"+url);

 console.log("er andy 2936::"+JSON.stringify(objNewPA));



  var headers ={
    "apikey":constantes.apiKey
    }
    $.ajax({
    method: "POST",
    url:  url,
    data: JSON.stringify(objNewPA),
    headers:headers,
    crossDomain: true,
    dataType: "json",
    })
    .done(function(data)
    {

   //console.log(data)
    if(data.Id>0){

            $("#cod_halla_gen").html("<b>"+data.Code+"</b>")
            $("#msg_part1_verde").html(msj_confirm)
            $('#modalConfirModalConfirmPlanOk').modal('show').addClass('fade')
            fnSP3LimpiarmodalRegistro();
            //hideLoading();

          
    }else{
        $('#Sp3VentanaPlanAnualEditView').modal('show').addClass('fade')
    //hideLoading(); 
    }
   
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
        //hideLoading();
        $('#Sp3VentanaPlanAnualEditView').modal('show').addClass('fade')

    })
    .always(function( jqXHR, textStatus, errorThrown ) {
        fnCargarReportantes();
        fnCargarGrid();
        hideLoading();

    });














  //llammamos al servicio

  //recibimos la respuesta
      //si todo esta bien MANDAS EL MENSAJE CON EL CODIGO DEL PLA Y RECARGAS LA VARIABLES Y EL LISTADO
      //$('#modalConfirmPlan').modal('hide').removeClass('fade');//cerramos el mensaje de quieres guardar
      //$('#Sp3VentanaPlanAnualEditView').modal('hide').removeClass('fade');




      //$('#btGuardarModPlan').html("<b>Confirmar</b>")




    //var gh = yuo;

      //si no indicas el mensaje de error






}

function fnSp3PlanAnualUpdateFinalizar()
{
        showLoading();
        $('#modalConfirmPlan').modal('hide').removeClass('fade');//cerramos el mensaje de quieres guardar
        $('#Sp3VentanaPlanAnualEditView').modal('hide').removeClass('fade');

   //btGuardarModPlan  //<b>Confirmar</b>
   $('#btGuardarModPlan').html("<b>Guardando...</b>")




   //--------------------------fecha actual ---------------------------------
  var f = new Date(); var d;
  d = f.getFullYear();
  d = d+'-'+(f.getMonth()+1);
  d = d+'-'+f.getDate();
  d = d +' '+ f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()+":"+f.getMilliseconds();
  //--------------------------fecha actual ---------------------------------



  //preparamos la data para el servicio
  objNewPA.Email_Supervisor = getCookie("vtas_internal_useruser"+sessionStorage.tabVisitasa)
  //objNewPA.Create_By = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
 // objNewPA.Create_Date =  moment().format('YYYY-MM-DD HH:mm:ss');    //d;//2021-01-01 15:34:05.000
  objNewPA.Last_Update_By =  getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
  objNewPA.Last_Update_Date = moment().format('YYYY-MM-DD HH:mm:ss');  //d;
  objNewPA.ProgramaId     = $("#sel_programaNew").val();
  objNewPA.GerenciaId     = $("#sel_gerenciaNew").val();
  objNewPA.SedeId     = $("#sel_sedeNew").val();
  objNewPA.EquipoId     = $("#sel_equipoNew").val();
  objNewPA.Year_Plan     = $("#sel_anioeNew").val();
  objNewPA.Estado_PlanId     = 1;

  var msj_confirm ="<b> Se Guard&oacute; el Plan Anual con el C&oacute;digo:</b>"
 //console.log('VAMOS AGUARDAR ESTE PLAN ################################################')
 //console.log(objNewPA);
 //console.log('VAMOS AGUARDAR ESTE PLAN ################################################')
  var httpmethod = "post";
  if(objNewPA.Id > 0 ){
    httpmethod = "put";
     msj_confirm ="<b> Se Modific&oacute; el Plan Anual con el C&oacute;digo:</b>"

  }
  var url = apiUrlssoma+"/api/Post-Plan-Anual?code=ZnQh7E2Noeiv1emsJPTvXE5l/qClcMIjv3FNePN8XTRfTY5aOqmSAQ==&httpmethod="+httpmethod;
 // var url ="http://localhost:7071/api/Post-PlanAnual?httpmethod="+httpmethod
  var headers ={
    "apikey":constantes.apiKey
    }
    $.ajax({
    method: "POST",
    url:  url,
    data: JSON.stringify(objNewPA),
    headers:headers,
    crossDomain: true,
    dataType: "json",
    })
    .done(function(data)
    {

   //console.log(data)
    if(data.Id>0){
        fnSP3LimpiarmodalRegistro();
    }else{
        $('#Sp3VentanaPlanAnualEditView').modal('show').addClass('fade')
    //hideLoading(); 
    }
   
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
        //hideLoading();
        $('#Sp3VentanaPlanAnualEditView').modal('show').addClass('fade')

    })
    .always(function( jqXHR, textStatus, errorThrown ) {
        fnCargarReportantes();
        fnCargarGrid();
        hideLoading();

    });




}


// function fnSp3agregaTareasActividadObjetivoPlan(idActividad)
// {//------------------------------------- ini   fnSp3agregaTareasActividadObjetivoPlan() -------------------------------------
//
//   alert('Agragando las tareas de la Actividad ('+ idActividad +') plan');
// }//------------------------------------- ini   fnSp3agregaTareasActividadObjetivoPlan() -------------------------------------
//
// function fnSp3agregaCronogramaActividadObjetivoPlan(idActividad)
// {//------------------------------------- ini   fnSp3agregaCronogramaActividadObjetivoPlan() -------------------------------------
//   //alert('Agragando el Cronograma de la Actividad ('+ idActividad +') plan');
//   $("#Sp3VentanCronogramaActividadPlan").modal("show").addClass("fade");
// }//------------------------------------- ini   fnSp3agregaCronogramaActividadObjetivoPlan() -------------------------------------
//
//
// function fnSp3EditarActividadPlanAnual(idActividad)
// {//------------------------------------- ini   fnSp3agregaCronogramaActividadObjetivoPlan() -------------------------------------
//   alert('Editando la Actividad ('+ idActividad +') plan');
// }//------------------------------------- ini   fnSp3agregaCronogramaActividadObjetivoPlan() -------------------------------------
//
//
// function fnSp3EliminarActividadPlanAnual(idTarea)
// {//------------------------------------- ini   fnSp3agregaCronogramaActividadObjetivoPlan() -------------------------------------
//     $('#'+idTarea).remove();
// }//------------------------------------- ini   fnSp3agregaCronogramaActividadObjetivoPlan() -------------------------------------
//





/**
 * Funciones relacionadas con ver plan anual
 * [fnSp3MostrarModalVerPlanAnual Levantar Modal Para ver Plan Anual]
 * @param  {[type]} planAnualId [Id del Plan Anual]
 * @return {[type]}             [description]
 * @autor Jesus Millan [06/02/2021]
 */
// agregar linea vacia
var tr = 0;
var tr_e = 0;

var vacio = `
    <tr>
        <td colspan="23">
            <div class="body-tabla-list-EvalAud" id="body-tabla-list-EvalAud1">
                <div id = 'iddd'  class="item-tabla p-2" style="z-index: 1; padding: 0px !important; margin: 10px 0px 0px !important;">
                    <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                        <div class="col-12 text-center altoListado listadoVacio">
                            <div class="row">
                                <table width = "100%" border="0" style="border-color: red;font-size: 0.95rem;">
                                    <tr >
                                        <td width="100%" colspan="23"> </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </td>
    </tr>
`

// contenido de la etiqueta meses
var contenidoEtiquetaMeses = `

    <td width="7%" style="padding-right: 10px;padding-left: 4px;">
        <table width="100%" border="0" style="border-color: green">
            <tbody>
                <tr>
                    <td width="24%" class="text-white tdVerPlan bgBlue">--</td>
                    <!--<td width="1%" style="background-color: #fff !important;">&nbsp;</td>-->

                    <td width="24%" class="text-white tdVerPlan bgBlue">--</td>
                    <!--<td width="1%" style="background-color: #fff !important;">&nbsp;</td>-->

                    <td width="24%" class="text-white tdVerPlan bgBlue">--</td>
                    <!--<td width="1%" style="background-color: #fff !important;">&nbsp;</td>-->

                    <td width="24%" class="text-white tdVerPlan bgBlue">--</td>
                </tr>
                <tr>
                    <td width="20%" class="text-white tdVerPlan bgWhite">sad</td>
                    <!--<td width="1%" style="background-color: #fff !important;">&nbsp;</td>-->

                    <td width="20%" class="text-white tdVerPlan bgGreen">asd</td>
                    <!--<td width="1%" style="background-color: #fff !important;">&nbsp;</td>-->

                    <td width="20%" class="text-white tdVerPlan bgYellow">asd</td>
                    <!--<td width="1%" style="background-color: #fff !important;">&nbsp;</td>-->

                    <td width="20%" class="text-white tdVerPlan bgRed">dsa</td>
                </tr>
            </tbody>
        </table>
    </td>
`

var vacioComplemento = `
    <tr>
        <td colspan="11">
            <div class="body-tabla-list-EvalAud" id="body-tabla-list-EvalAud1">
                <div id = 'iddd'  class="item-tabla p-2" style="z-index: 1; padding: 0px !important; margin: 10px 0px 0px !important;">
                    <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                        <div class="col-12 text-center altoListado listadoVacio">
                            <div class="row">
                                <table width = "100%" border="0" style="border-color: red;font-size: 0.95rem;">
                                    <tr >
                                        <td width="100%" colspan="11"></td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </td>
    </tr>
`

/**
 * [fnSp3MostrarModalVerPlanAnual Mostrar Modal Ver Plan Anual]
 * @param  {[int]} planAnualId [Indice del plan anual en el objeto paObj]
 * @return {[type]}             [description]
 */
var fnSp3MostrarModalVerPlanAnual = function(planAnualId)
{
     numPesototal=0;
    $(".scrollDuo").on("scroll", function() {
        $(".scrollDuo").scrollLeft($(this).scrollLeft());
      });
    // PLAN ANUAL ACTUAL
    istAud = planAnualId;
    // PARA EL INDICADOR DE LAS FILAS
    tr     = 0
    //console.warn(planAnualId)
    //console.table(paObj[planAnualId])
    // array meses del año
    let meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre")
    // saber fecha actual
    let fechaActual = new Date()
    // saber mes actual
    let mes         = fechaActual.getMonth()

    // limpiar select
    $("#selectMesPlanAnual").html('')

    // todos azules
    for (var i = 0; i < 12; i++) {
        $(`#mes_${i}`).css("background-color", '#34559c');
    }

    // llenar select hasta el mes actual
    for (var i = 0; i <= 11; i++) {
        //console.log("i",i,"meses[i]",meses[i])
        $("#selectMesPlanAnual").append(`
            <option value="${i}">${meses[i]}</option>
        `)
    }
    // seleccionar mes actual
    $("#selectMesPlanAnual").val(mes)
    $(`#mes_${mes}`).css("background-color", '#ffb525');

    fnPintarDatosPorMesSp3(planAnualId, mes)

    setTimeout(function(){
        if(getStorage("vtas_rolexternalrol", "text") == "ROL_OBSERVADORPLANANUAL"){

      $('.textoVerDetalleObjetivos').css('display','none');

        }
       if(getStorage("vtas_rolexternalrol", "text") == "ROL_REPSONSABLEPLANANUAL"){ $('#btnExportarPlanAnual').css('display','block');}
        // if(getStorage("vtas_rolexternalrol", "text") != "ROL_OBSERVADORPLANANUAL")
        //    {
        //         $('#btnExportarPlanAnual').css('display','block');
        //    }

},300);


    // MOSTAR MODAL PLAN ANUAL
    $('#modalVerPlanAnualSP3').modal('show').addClass('fade')
}

var fnSp3MostrarPlanAnualEjecucion = function(planAnualId)
{
       //console.log(".....")
       $(".scrollDuo").on("scroll", function() {
        $(".scrollDuo").scrollLeft($(this).scrollLeft());
      });
    // PLAN ANUAL ACTUAL
    istAud = planAnualId;
    // PARA EL INDICADOR DE LAS FILAS
    tr     = 0
    //console.warn(planAnualId)
    //console.table(paObj[planAnualId])
    // array meses del año
    let meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre")
    // saber fecha actual
    let fechaActual = new Date()
    // saber mes actual
    let mes         = fechaActual.getMonth()

    // limpiar select
    $("#selectMesPlanAnual").html('')

    // todos azules
    for (var i = 0; i < 12; i++) {
        $(`#mes_${i}`).css("background-color", '#34559c');
    }

    // llenar select hasta el mes actual
    for (var i = 0; i <= 11; i++) {
        //console.log("i",i,"meses[i]",meses[i])
        $("#selectMesPlanAnual").append(`
            <option value="${i}">${meses[i]}</option>
        `)
    }
    // seleccionar mes actual
    $("#selectMesPlanAnual").val(mes)
    $(`#mes_${mes}`).css("background-color", '#ffb525');

    fnPintarDatosPorMesSp3(planAnualId, mes)

    if(getStorage("vtas_rolexternalrol", "text") != "ROL_OBSERVADORPLANANUAL"){
        $('#btnExportarPlanAnual').css('display','block');
}

    // MOSTAR MODAL PLAN ANUAL
    $('#modalVerPlanAnualSP3').modal('show').addClass('fade')
}

var fnCalcularProcentajesSp3 = function()
{
    //totalAvancePoryecto2
    //totalCumplimiento1
    let total                       = 0
    let avanceProyecto              = 0
    let avanceProyectoXMes          = 0
    let totalProcentajeProyecto     = 0
    let totalProcentajeProyectoXMes = 0
    for (var i = 0; i < 100; i++)
    {
        if($(`#avanceProyecto_${i}`).val()>=0)
        {
            avanceProyecto              += parseInt($(`#avanceProyecto_${i}`).val())
            avanceProyectoXMes          += parseInt($(`#avanceProyectoXMes_${i}`).val())
            totalProcentajeProyecto     += parseInt($(`#totalProcentajeProyecto_${i}`).val())
            totalProcentajeProyectoXMes += parseInt($(`#totalProcentajeProyectoXMes_${i}`).val())
            total++
        }
    }
    //console.warn(total, avanceProyecto, avanceProyectoXMes, totalProcentajeProyecto, totalProcentajeProyectoXMes)

    // calcular porcentaje total avance del proyecto
    avanceProyecto = Math.round( (avanceProyecto) / total )
    if(avanceProyecto < 0 || isNaN(avanceProyecto) )
        avanceProyecto = 0

    // calcular porcentaje total avance del proyecto
    avanceProyectoXMes = Math.round( (avanceProyectoXMes) / total )
    if(avanceProyectoXMes < 0 || isNaN(avanceProyectoXMes) )
        avanceProyectoXMes = 0

    // calcular totalProcentajeProyecto
    totalProcentajeProyecto = Math.round( (totalProcentajeProyecto) / total )
    if(totalProcentajeProyecto < 0 || isNaN(totalProcentajeProyecto) )
        totalProcentajeProyecto = 0

    // calcular totalProcentajeProyectoXMes
    totalProcentajeProyectoXMes = Math.round( (totalProcentajeProyectoXMes) / total )
    if(totalProcentajeProyectoXMes < 0 || isNaN(totalProcentajeProyectoXMes) )
        totalProcentajeProyectoXMes = 0

    //console.warn(total, avanceProyecto, avanceProyectoXMes, totalProcentajeProyecto, totalProcentajeProyectoXMes)


    // avanceProyecto
    $(`#avanceProyecto`).html(`${avanceProyecto} %`)
    // avanceProyectoXMes
    $(`#avanceProyectoXMes`).html(`${avanceProyectoXMes} %`)

    // totalProcentajeProyecto
    $(`#totalProcentajeProyecto`).html(`${totalProcentajeProyecto} %`)

    // totalProcentajeProyectoXMes
    $(`#totalProcentajeProyectoXMes`).html(`${totalProcentajeProyectoXMes} %`)

}

var fnPintarDatosPorMesSp3 = function(planAnualId, mes)
{
    //////////////////////////////////////////////////////////////////////// pasar a funcion
    // contador de semanas con actividades planificadas
    countS = 0
    // LIMPIADOS LOS LISTADOS DE ACTIVIDADES, MESES Y COMPLEMENTOS
    $("#listadoActividades").html('')
    $("#listadoMeses").html('')
    $("#listadoComplemento").html('')
      numPesototal=0;
    // indice para las actividades
    let indiceActividades = 0
    // indice para los subOjetivos
    let indiceSubOjetivos = 0
    // indice para los Tareas
    let indiceTareas = 0
    let hrefDisp='';

    numPesototal = 0;

    if(getStorage("vtas_rolexternalrol", "text") == "ROL_OBSERVADORPLANANUAL"){
        hrefDisp= 'style=display:none;';
          }

    // COLOCAMOS TITULO A LA MODAL
    $("#titleModalVerPlanAnualSP3").html("Ver "+paObj[planAnualId].a.Code);
    // OBTENEMOS LA CANTIDAD DE SUBOBJETIVOS Y ACTIVIDADES
    let numObjetivos    = 0
    let numSubObjetivos = 0
    let numActividades  = 0

    paObj[planAnualId].a.Objetivos.forEach(function(Item)
    {
        //numSubObjetivos += Item.SubObjetivos.length
        numObjetivos++
        //numActividades  += Item.Actividades.length

        // añadimos objetivos a la lista
        $("#listadoActividades").append(`
            <tr>
                <td colspan="2">
                    <div class="body-tabla-list-EvalAud" id="body-tabla-list-EvalAud1">
                        <div id = 'iddd'  class="item-tabla p-2" style="z-index: 1; padding: 0px !important; margin: 10px 0px 0px !important;">
                            <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                                <div class="col-12 text-center altoListado listadoVacio d-flex align-items-center">
                                    <div class="row">

                                        <table width = "100%" border="0" style="border-color: white;font-size: 0.98rem;">
                                            <tr >
                                                <td width = "100%" colspan="3" align="center"><div id="c1TabGeny" class="text-left textoListadosPlanAnual " > Objetivo ${numObjetivos}: ${Item.Objetivo_Name} </div></td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        `)

        // anadimos al listo de meses la linea vacia
        $("#listadoMeses").append(`${vacio}`)
        // anadimos al listodo de complementos
        $("#listadoComplemento").append(`${vacioComplemento}`)

       //  numPesototal=0;
        // contador del indicie de la actividad
        indiceActividades = 0
        Item.Actividades.forEach(function(Item2){
            numActividades ++
            numPesototal= numPesototal+Item2.Peso;
            // agregamos una actividad
            $("#listadoActividades").append(`
                <tr>
                    <td colspan="2">
                        <div class="body-tabla-list-EvalAud" id="body-tabla-list-EvalAud1">
                            <div id = 'iddd'  class="item-tabla p-2" style="z-index: 1; padding: 0px !important; margin: 10px 0px 0px !important;">
                                <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                                    <div class="col-12 text-center altoListado">
                                        <div class="row">
                                            <table width = "100%" border="0" style="border-color: red;font-size: 0.85rem;">
                                                <tr >
                                                    <td width = "10%" align="center"><div id="c1TabGeny" class="text-left textoListadosPlanAnual" > ${Item2.Peso}% </div></td>
                                                    <td width = "70%" align="center"><div id="c1TabGeny" class="text-left textoListadosPlanAnual" > ${Item2.Actividad_Name} </div></td>
                                                    <td width = "20%" ${hrefDisp} align="center"><div id="c1TabGeny" class="text-left textoListadosPlanAnual textoVerDetalleObjetivos" onmouseup="fnSp3VerDetalleActividad(${(numObjetivos-1)},null,${(indiceActividades++)})"> Ver Detalle</div></td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            `)

            // agregamos fila de meses
            fnSp3PintarFrecuencia(Item2, mes)

            // agergamos los complementos
            fnSp3PintarComplementos(
                Item2.ResponsableName
                ,$(`#countTotalTareasProgramadas_${tr}`).val()
                ,$(`#countTotalTareasProgramadasXMes_${tr}`).val()
                ,$(`#countTotalTareasEjecutadas_${tr}`).val()
            )

            tr++
        })

        let countSubObjetivos = 0

        indiceSubObjetivos    = 0

        Item.SubObjetivos.forEach(function(Item2){
            numSubObjetivos++
            countSubObjetivos++
            $("#listadoActividades").append(`
                <tr>
                    <td colspan="2">
                        <div class="body-tabla-list-EvalAud" id="body-tabla-list-EvalAud1">
                            <div id = 'iddd'  class="item-tabla p-2" style="z-index: 1; padding: 0px !important; margin: 10px 0px 0px !important;">
                                <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                                    <div class="col-12 text-center altoListado listadoVacio d-flex align-items-center">
                                        <div class="row">

                                            <table width = "100%" border="0" style="border-color: white;font-size: 0.85rem;">
                                                <tr >
                                                    <td width = "100%" colspan="3" align="center"><div id="c1TabGeny" class="text-left textoListadosPlanAnual" > Sub Objetivo ${numObjetivos}.${countSubObjetivos}: ${Item2.SubObjetivo_Name} </div></td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            `)

            // anadimos al listo de meses la linea vacia
            $("#listadoMeses").append(`${vacio}`)
            // anadimos al listodo de complementos
            $("#listadoComplemento").append(`${vacioComplemento}`)

            // contador del indicie de la actividad
            indiceActividades = 0

            Item2.Actividades.forEach(function(Item3)
            {
                numPesototal= numPesototal+Item3.Peso;

                numActividades ++
                // agregamos actividades
                $("#listadoActividades").append(`
                    <tr>
                        <td colspan="2">
                            <div class="body-tabla-list-EvalAud" id="body-tabla-list-EvalAud1">
                                <div id = 'iddd'  class="item-tabla p-2" style="z-index: 1; padding: 0px !important; margin: 10px 0px 0px !important;">
                                    <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                                        <div class="col-12 text-center altoListado">
                                            <div class="row">
                                                <table width = "100%" border="0" style="border-color: red;font-size: 0.85rem;">
                                                    <tr >
                                                        <td width = "10%" align="center"><div id="c1TabGeny" class="text-left textoListadosPlanAnual" > ${Item3.Peso}% </div></td>
                                                        <td width = "70%" align="center"><div id="c1TabGeny" class="text-left textoListadosPlanAnual" > ${Item3.Actividad_Name} </div></td>
                                                        <td width = "20%" align="center"><div id="c1TabGeny" class="text-left textoListadosPlanAnual textoVerDetalleObjetivos" onmouseup="fnSp3VerDetalleActividad(${(numObjetivos-1)},${indiceSubObjetivos},${(indiceActividades++)})"> Ver Detalle</div></td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                `)

                // agregamos fila de meses
                fnSp3PintarFrecuencia(Item3, mes)

                // agergamos los complementos
                fnSp3PintarComplementos(
                    Item3.ResponsableName
                    ,$(`#countTotalTareasProgramadas_${tr}`).val()
                    ,$(`#countTotalTareasProgramadasXMes_${tr}`).val()
                    ,$(`#countTotalTareasEjecutadas_${tr}`).val()
                )

                tr++

            })


        })
    })

    // COLOCAMOS SUB-TITULO A LA MODAL
    //$("#subTitleModalVerPlanAnualSP3").html(`Objetivos ( ${paObj[planAnualId].a.Num_Objetivos} )/ Subojetivos ( ${numSubObjetivos} )/ Actividades ( ${numActividades} ) `);//*/

     $("#subTitleModalVerPlanAnualSP3").html(`Objetivos ( ${paObj[planAnualId].a.Num_Objetivos} )/ Actividades ( ${numActividades} ) `);//*/

    // colocamos fecha a cumplimentoAlMes
    let year = paObj[planAnualId].a.Year_Plan
    let temp = parseInt(mes)+2
    // si es diciembre aumentamos un año y hacemos el mes enero
    if(temp>12)
    {
        temp = 1
        year += 1
    }
    let m    = (temp<10) ? `0${temp}` : temp

    $("#cumplimentoAlMes").html(`03/${m}/${paObj[planAnualId].a.Year_Plan}`)

    //alert('lo de los pesos 3779'+numPesototal);

   // PESO_TOTAL = 
    $("#numPesoTotalVER").html(numPesototal)
    
    //////////////////////////////////////////////////////////////////////// pasar a funcion*/
}


/**
 * [fnSeleccionarMesSp3 pintar de color diferente el header del mes seleccionar]
 * @param  {[type]} mes [description]
 * @return {[type]}     [description]
 */
var fnSeleccionarMesSp3 = function(mes)
{
    //console.warn("mes",mes.value)
    // para el indicador de las filas...
    tr = 0
    // azul 34559c
    // amarillo ffb525
    // oscuro 50390e
    for (var i = 0; i < 12; i++) {
        $(`#mes_${i}`).css("background-color", '#34559c');
    }

    $(`#mes_${mes.value}`).css("background-color", '#ffb525');

    fnPintarDatosPorMesSp3(istAud, mes.value)
}

/**
 * [fnSp3PintarFrecuencia description]
 * @return {[type]} [description]
 */
var countS = 0
var countTotalTareasProgramadas     = 0
var countTotalTareasProgramadasXMes = 0
var countTotalTareasEjecutadas      = 0
var countTotalTareasEjecutadasXMes  = 0
var indiceTareas = 0
var fnSp3PintarFrecuencia = function(Item2, mes)
{
    let bgEvidencia  = []
    indiceTareas     = 0
    // contador para las tareas programadas
    countTotalTareasProgramadas = 0
    // contador para las tareas programadas hasta el mes seleccionado
    countTotalTareasProgramadasXMes = 0
    // contador para las tareas ejecutadas
    countTotalTareasEjecutadas  = 0
    // contador para las tareas ejecutadas hasta el mes seleccionado
    countTotalTareasEjecutadasXMes  = 0
    //console.warn("fnSp3PintarFrecuencia -> ",Item2,mes)
    $("#listadoMeses").append(`
        <tr>
            <td colspan="23">
                <input type="hidden" id="countTotalTareasProgramadas_${tr}" name="countTotalTareasProgramadas_${tr}" value="0">
                <input type="hidden" id="countTotalTareasProgramadasXMes_${tr}" name="countTotalTareasProgramadasXMes_${tr}" value="0">
                <input type="hidden" id="countTotalTareasEjecutadas_${tr}"  name="countTotalTareasEjecutadas_${tr}"  value="0">
                <div class="body-tabla-list-EvalAud" id="body-tabla-list-EvalAud1">
                    <div id = 'iddd'  class="item-tabla p-2" style="z-index: 1; padding: 0px !important; margin: 10px 3px 0px 3px !important; border: 0px !important;">
                        <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                            <div class="col-12 text-center altoListado d-flex align-items-center"  style="background-color: #fff;">
                                <div class="row">
                                    <table width = "100%" border="0" style="border-color: red; margin: 0px 0px 0px 0px !important;">
                                        <tr id="tr2_${tr}">
    `)
    //  console.info("Item2",Item2)
    //  console.info("Item2.Cronogramas",Item2.Cronogramas)
    //  console.info("Item2.Cronogramas[0]",Item2.Cronogramas[0])
    for (var i = 0; i < 12; i++)
    {
        let bg1 = "bgWhite"
        let bg2 = "bgWhite"
        let bg3 = "bgWhite"
        let bg4 = "bgWhite"
        bgEvidencia.S1 = "bgWhite"
        bgEvidencia.S2 = "bgWhite"
        bgEvidencia.S3 = "bgWhite"
        bgEvidencia.S4 = "bgWhite"
        indiceTareas = 0
        // definimos el color a pintar
        if(Item2.Cronogramas[i]!==undefined)
        {
            // color de fondo para las actividades programdas
            bg1 = ( parseInt(Item2.Cronogramas[i].S1) == 1) ? "bgBlue" :  "bgWhite"
            bg2 = ( parseInt(Item2.Cronogramas[i].S2) == 1) ? "bgBlue" :  "bgWhite"
            bg3 = ( parseInt(Item2.Cronogramas[i].S3) == 1) ? "bgBlue" :  "bgWhite"
            bg4 = ( parseInt(Item2.Cronogramas[i].S4) == 1) ? "bgBlue" :  "bgWhite"


               console.log("3592 i,mes",i,mes)
            // aumentamos el contador de tareas programadas
            countTotalTareasProgramadas = ( parseInt(Item2.Cronogramas[i].S1) == 1) ? countTotalTareasProgramadas+1 :  countTotalTareasProgramadas
            countTotalTareasProgramadas = ( parseInt(Item2.Cronogramas[i].S2) == 1) ? countTotalTareasProgramadas+1 :  countTotalTareasProgramadas
            countTotalTareasProgramadas = ( parseInt(Item2.Cronogramas[i].S3) == 1) ? countTotalTareasProgramadas+1 :  countTotalTareasProgramadas
            countTotalTareasProgramadas = ( parseInt(Item2.Cronogramas[i].S4) == 1) ? countTotalTareasProgramadas+1 :  countTotalTareasProgramadas

            if(i <= mes )
            {
                console.warn("i,mes",i,mes)
                // countTotalTareasProgramadasXMes = ( parseInt(Item2.Cronogramas[i].S1) == 1) ? countTotalTareasProgramadasXMes+1 :  countTotalTareasProgramadasXMes
                // countTotalTareasProgramadasXMes = ( parseInt(Item2.Cronogramas[i].S2) == 1) ? countTotalTareasProgramadasXMes+1 :  countTotalTareasProgramadasXMes
                // countTotalTareasProgramadasXMes = ( parseInt(Item2.Cronogramas[i].S3) == 1) ? countTotalTareasProgramadasXMes+1 :  countTotalTareasProgramadasXMes
                // countTotalTareasProgramadasXMes = ( parseInt(Item2.Cronogramas[i].S4) == 1) ? countTotalTareasProgramadasXMes+1 :  countTotalTareasProgramadasXMes
                // bgEvidencia = fnSp3GetColorTarea(Item2, Item2.Cronogramas[i], mes)
                if( parseInt(Item2.Cronogramas[i].S1) == 1)
                {
                    bgEvidencia.S1 = fnGetColorTareaSp3X(Item2, Item2.Cronogramas[i].S1, mes, countTotalTareasProgramadasXMes)
                    countTotalTareasProgramadasXMes++

                                console.log("mes("+i+") color("+bgEvidencia.S1+", "+bgEvidencia.S1+", "+bgEvidencia.S1+", "+bgEvidencia.S1);
                }
                if( parseInt(Item2.Cronogramas[i].S2) == 1)
                {
                    bgEvidencia.S2 = fnGetColorTareaSp3X(Item2, Item2.Cronogramas[i].S2, mes, countTotalTareasProgramadasXMes)
                    countTotalTareasProgramadasXMes++
                               console.log("mes("+i+") color("+bgEvidencia.S2+", "+bgEvidencia.S2+", "+bgEvidencia.S2+", "+bgEvidencia.S2);
                }
                if( parseInt(Item2.Cronogramas[i].S3) == 1)
                {
                    bgEvidencia.S3 = fnGetColorTareaSp3X(Item2, Item2.Cronogramas[i].S3, mes, countTotalTareasProgramadasXMes)
                    countTotalTareasProgramadasXMes++
                               console.log("mes("+i+") color("+bgEvidencia.S3+", "+bgEvidencia.S3+", "+bgEvidencia.S3+", "+bgEvidencia.S3);
                }
                if( parseInt(Item2.Cronogramas[i].S4) == 1)
                {
                    bgEvidencia.S4 = fnGetColorTareaSp3X(Item2, Item2.Cronogramas[i].S4, mes, countTotalTareasProgramadasXMes)
                    countTotalTareasProgramadasXMes++
                     console.log("mes("+i+") color("+bgEvidencia.S4+", "+bgEvidencia.S4+", "+bgEvidencia.S4+", "+bgEvidencia.S4);
                }
            }
            else
            {
                bgEvidencia.S1 = "bgWhite"
                bgEvidencia.S2 = "bgWhite"
                bgEvidencia.S3 = "bgWhite"
                bgEvidencia.S4 = "bgWhite"
            }

            //console.log("mes("+i+") color("+bgEvidencia.S1+", "+bgEvidencia.S2+", "+bgEvidencia.S3+", "+bgEvidencia.S4);
        }//*/

         
        if(bgEvidencia.S1 == "bgBlue"){bgEvidencia.S1 = "bgBlue2"}
        if(bgEvidencia.S2 == "bgBlue"){bgEvidencia.S2 = "bgBlue2"}
        if(bgEvidencia.S3 == "bgBlue"){bgEvidencia.S3 = "bgBlue2"}
        if(bgEvidencia.S4 == "bgBlue"){bgEvidencia.S4 = "bgBlue2"}

        $(`#tr2_${tr}`).append(`
            <td width="7%" style="padding-right: 10px;padding-left: 4px;">
                <table width="100%" border="0" style="border-color: green">
                    <tbody>
                        <tr>
                            <td width="24%" class="text-white tdVerPlan ${bg1}">--</td>
                            <!--<td width="1%" style="background-color: #fff !important;">&nbsp;</td>-->

                            <td width="24%" class="text-white tdVerPlan ${bg2}">--</td>
                            <!--<td width="1%" style="background-color: #fff !important;">&nbsp;</td>-->

                            <td width="24%" class="text-white tdVerPlan ${bg3}">--</td>
                            <!--<td width="1%" style="background-color: #fff !important;">&nbsp;</td>-->

                            <td width="24%" class="text-white tdVerPlan ${bg4}">--</td>
                        </tr>
                        <tr>
                            <td width="20%" class="text-white tdVerPlan ${bgEvidencia.S1}">sad</td>
                            <!--<td width="1%" style="background-color: #fff !important;">&nbsp;</td>-->

                            <td width="20%" class="text-white tdVerPlan ${bgEvidencia.S2}">asd</td>
                            <!--<td width="1%" style="background-color: #fff !important;">&nbsp;</td>-->

                            <td width="20%" class="text-white tdVerPlan ${bgEvidencia.S3}">asd</td>
                            <!--<td width="1%" style="background-color: #fff !important;">&nbsp;</td>-->

                            <td width="20%" class="text-white tdVerPlan ${bgEvidencia.S4}">dsa</td>
                        </tr>
                    </tbody>
                </table>
            </td>
        `)
        if(i<11){
            $(`#tr2_${tr}`).append(`<td width="1%"></td>`)
        }
    }
    // cerramos la etiqueta
    $("#listadoMeses").append(`
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    `)
    $(`#countTotalTareasProgramadas_${tr}`).val(countTotalTareasProgramadas)
    $(`#countTotalTareasProgramadasXMes_${tr}`).val(countTotalTareasProgramadasXMes)
    $(`#countTotalTareasEjecutadas_${tr}`).val(countTotalTareasEjecutadas)
    //console.warn("countTotalTareasProgramadas -> ",$(`#countTotalTareasProgramadas_${tr}`).val())
}












/**
 * [fnSp3GetColorTarea definir color para el campo de evidencias]
 * @param  {[type]} Item2 [description]
 * @return {[type]}       [description]
 */
//var fnSp3GetColorTarea = function(Item2, Cronograma, Mes)
var fnGetColorTareaSp3 = function(Item2, Cronograma, Mes, IndiceTareas)
{
console.log(Item2, Cronograma, Mes, IndiceTareas)
    let bg2 = "bgWhite"

    return ( parseInt(Cronograma) == 1 ) ? fnGetColorEvidenciaSp3(Item2, IndiceTareas, Mes) : "bgWhite"

    let array = []
    let bg    = []
    //console.info("Cronograma",Cronograma)
    //console.info("Item2.Tareas",Item2.Tareas)
    // contador indice de la tarea.
    //countS = 0

    // array.S1     = (parseInt(Cronograma.S1) == 1 ) ? fnGetColorEvidenciaSp3(Item2,indiceTareas,Mes) :  "bgWhite"
    // indiceTareas = (parseInt(Cronograma.S1) == 1 ) ? indiceTareas+1  :  indiceTareas
    // countS       = (parseInt(Cronograma.S1) == 1 ) ? countS+1  :  countS

    // array.S2     = (parseInt(Cronograma.S2) == 1 ) ? fnGetColorEvidenciaSp3(Item2,indiceTareas,Mes) :  "bgWhite"
    // indiceTareas = (parseInt(Cronograma.S2) == 1 ) ? indiceTareas+1  :  indiceTareas
    // countS       = (parseInt(Cronograma.S2) == 1 ) ? countS+1  :  countS

    // array.S3     = (parseInt(Cronograma.S3) == 1 ) ? fnGetColorEvidenciaSp3(Item2,indiceTareas,Mes) :  "bgWhite"
    // indiceTareas = (parseInt(Cronograma.S3) == 1 ) ? indiceTareas+1  :  indiceTareas
    // countS       = (parseInt(Cronograma.S3) == 1 ) ? countS+1  :  countS

    // array.S4     = (parseInt(Cronograma.S4) == 1 ) ? fnGetColorEvidenciaSp3(Item2,indiceTareas,Mes) :  "bgWhite"
    // indiceTareas = (parseInt(Cronograma.S4) == 1 ) ? indiceTareas+1  :  indiceTareas
    // countS       = (parseInt(Cronograma.S4) == 1 ) ? countS+1  :  countS

    // //bg1 = ( parseInt(Item2.Cronogramas[i].S1) == 1) ? "bgBlue" :  "bgWhite"
    // // bgWhite
    // // bgGreen
    // // bgYellow
    // // bgRed
    // //console.warn("en fnSp3GetColorTarea -> ","array",array,"countS",countS,"bg",bg)

    // return array

}

/**
 * [fnGetColorEvidenciaSp3 validar el color a pintar la evidencia]
 * @param  {[type]} Item  [Actividades]
 * @param  {[type]} count [indice de la tarea]
 * @return {[type]}       [codigo del color a pintar]
 */
var fnGetColorEvidenciaSp3 = function(Item, Count, Mes)
{
    console.warn("*************Item",Item,"Count",Count)
    let bg = "bgWhite"


  
    if(Item.Tareas !== null && Item.Tareas !== undefined && Item.Tareas.length > 0)
    {
        // validamos el IdEstado no se sea null nu undefined
         //alert("3767 Item.Tareas[Count].IdEstado ="+Item.Tareas[Count].IdEstado);

        if(Item.Tareas[Count].IdEstado != undefined)
        {
            if(Item.Tareas[Count].IdEstado==1) // atendido
            {
                //bg = "bgWhite"
                bg = fnVerficarFechaSubidaSp3(Item.Tareas[Count])
            }
            if(Item.Tareas[Count].IdEstado==2 ||Item.Tareas[Count].IdEstado==5) // vencida o rechazada
            {
                bg = "bgRed"

                //alert('vencida o rechazada')
            }
            if(Item.Tareas[Count].IdEstado==4)// aprobada
            {
                bg = "bgGreen"
                //alert('Aprobada')
            }

            // para saber si la tarea ya fue ejecutada (diferente a Pendiente o Vencida)
            console.warn("countTotalTareasEjecutadas",Item.Tareas[Count].IdEstado,countTotalTareasEjecutadas,Item.Tareas[Count])
            //if( Item.Tareas[Count].IdEstado != 2)
            if( Item.Tareas[Count].IdEstado == 4)
            {
                countTotalTareasEjecutadas += 1
            }
        }
    }


    //---------------------------  andy  --------------------------
        //aprobado -- verde
        //Rechazado -- observada -- amarillo
        //pendiente sin-- rojo

    //---------------------------  andy ---------------------------

console.log("*******andy*****3775*****",bg);
    return bg
}




















//--------------------------------------------------------- andy --------------------------------------------------------------
 
var fnGetColorTareaSp3X = function(Item2, Cronograma, Mes, IndiceTareas)
{
console.log("3837::",Item2, Cronograma, Mes, IndiceTareas)
    let bg2 = "bgWhite"

    return ( parseInt(Cronograma) == 1 ) ? fnGetColorEvidenciaSp3X(Item2, IndiceTareas, Mes) : "bgWhite"

}

/**
 * [fnGetColorEvidenciaSp3 validar el color a pintar la evidencia]
 * @param  {[type]} Item  [Actividades]
 * @param  {[type]} count [indice de la tarea]
 * @return {[type]}       [codigo del color a pintar]
 */
var fnGetColorEvidenciaSp3X = function(Item, Count, Mes)
{
    console.warn("*************Item",Item,"Count",Count)
    let bg = "bgWhite"

    if(Item.Tareas !== null && Item.Tareas !== undefined && Item.Tareas.length > 0)
    {
        // validamos el IdEstado no se sea null nu undefined
        if(Item.Tareas[Count].IdEstado != undefined)
        {

           //alert("3837 Tarea"+Item.Tareas[Count].ActividadId+" mes de "+Mes+", color="+Item.Tareas[Count].IdEstado);

           switch (Item.Tareas[Count].IdEstado) 
           {
              
              case 1:
                //day = "Pendiente";
                bg = "bgRed";
                break;
              case 2:
                //day = "Vencido";
                 bg = "bgWhite";
                break;
              case 3:
                //day = "Atendido";
                 bg = "bgBlue";
                break;
              case 4:
                //day = "Aprobado";
                bg = "bgGreen";

                         // para saber si la tarea ya fue ejecutada (diferente a Pendiente o Vencida)
                         console.warn("countTotalTareasEjecutadas",Item.Tareas[Count].IdEstado,countTotalTareasEjecutadas,Item.Tareas[Count])
                         countTotalTareasEjecutadas += 1
                break;
              case 5:
                //day = "Rechazado";
                bg = "bgYellow";
              break;
            
            }
            console.log("3837 Tarea"+Item.Tareas[Count].ActividadId+" mes de "+Mes+", color="+bg);


        }
    }


   
    return bg
}


//--------------------------------------------------------- andy ---------------------------------------------------------------



































/**
 * [fnVerficarFechaSubidaSp3 calcular si fue subida la evidencia fuera de tiempo]
 * @param  {[type]} Tarea [obj de la tarea]
 * @return {[type]}       [color a pintar]
 */
var fnVerficarFechaSubidaSp3 = function(Tarea)
{
    let bg = "bgWhite"

    // validamos que la fecha de ejecucion no sea null vacio o undefined
    if( Tarea.Fecha_Ejecutada_Ini !== null && Tarea.Fecha_Ejecutada_Ini !== "" && Tarea.Fecha_Ejecutada_Ini !== undefined )
    {
        // descomponer la fecha inicio programada
        let temp           = Tarea.Fecha_Programada_Ini.split('/')
        // obtener fecha de inicio
        let fechaInicio    = new Date(temp[2],(temp[1]-1),temp[0])

        // descomponer la fecha final programada
        temp               = Tarea.Fecha_Programada_Fin.split('/')
        // obtener fecha de inicio
        let fechaFinal     = new Date(temp[2],(temp[1]-1),temp[0])

        // descomponer la fecha ejecutada
        temp               = Tarea.Fecha_Ejecutada_Ini.split('/')
        // obtener fecha de ejecucion
        let fechaEjecucion = new Date(temp[2],(temp[1]-1),temp[0])

        // tanto los metodos .getTime() y .valueOf como el operador unitario +
        // devuelven el número de milisegundos desde el 1 de enero de 1970, 00:00 UTC.
        //if(fechaFinal.getTime() >= fechaEjecucion.getTime() )
        //if(fechaFinal.valueOf() <= fechaEjecucion.valueOf() )
        if(+fechaFinal <= +fechaEjecucion )
        {
            bg = "bgYellow"
        }
        else
        {
            bg = "bgWhite"
        }

        // console.warn("..:: fechaInicio              ::.. ",fechaInicio)
        // console.warn("..:: fechaEjecucion           ::.. ",fechaEjecucion)
        // console.warn("..:: fechaFinal               ::.. ",fechaFinal)
        // console.warn("..:: bg                       ::.. ",bg)
        // console.warn("..:: fechaInicio.valueOf()    ::.. ",fechaInicio.valueOf())
        // console.warn("..:: fechaEjecucion.valueOf() ::.. ",fechaEjecucion.valueOf())
        // console.warn("..:: fechaFinal.valueOf()     ::.. ",fechaFinal.valueOf())

    }

    return bg
}


var fnSp3PintarComplementos = function(ResponsableName, TotalTareasProgramadas, TotalTareasProgramadasXMes, TotalTareasEjecutadas)
{
    console.log(ResponsableName, TotalTareasProgramadas, TotalTareasProgramadasXMes, TotalTareasEjecutadas)
    // calcular porcentaje total del proyecto
    // let totalProcentajeProyecto = Math.round( (TotalTareasEjecutadas*100) / TotalTareasProgramadasXMes)
    // if(totalProcentajeProyecto < 0 || isNaN(totalProcentajeProyecto) )
    //     totalProcentajeProyecto = 0
    let totalProcentajeProyecto = (TotalTareasEjecutadas > 0) ? 100 : 0

    // calcular avances del proyecto estimado
  //  let avanceProjecto = Math.round( (TotalTareasProgramadasXMes*100) / TotalTareasProgramadas)
    let avanceProjecto = Math.round( (TotalTareasEjecutadas*100) / TotalTareasProgramadas)
    //console.warn("avanceProjecto",avanceProjecto)
    if(avanceProjecto < 0 || isNaN(avanceProjecto) )
        avanceProjecto = 0

    // calcular avances del proyecto real
    let avanceProjectoXMes = Math.round( (TotalTareasEjecutadas*100) / TotalTareasProgramadas)
    //console.warn("avanceProjectoXMes",avanceProjectoXMes)
    if(avanceProjectoXMes < 0 || isNaN(avanceProjectoXMes) )
        avanceProjectoXMes = 0

    // calcular porcentaje total del proyecto
    let totalProcentajeProyectoXMes = Math.round( (avanceProjectoXMes*100) / avanceProjecto )
    if(totalProcentajeProyectoXMes < 0 || isNaN(totalProcentajeProyectoXMes) )
        totalProcentajeProyectoXMes = 0


    var filaComplementos = `
        <tr>
            <td colspan="11">
                <div class="body-tabla-list-EvalAud" id="body-tabla-list-EvalAud1">
                    <div id = 'iddd'  class="p-2" style="z-index: 1; padding: 0px !important; margin: 10px 3px 0px 3px !important;">
                        <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                            <div class="col-12 text-center altoListado">
                                <div class="row">
                                    <table width = "100%" border="0" style="border-color: red;font-size: 0.95rem;">
                                        <tr >
                                            <td width="15%">
                                                <div id="c1TabGeny" class="text-left textoListadosPlanAnual" > ${toCapitalize(ResponsableName)} </div>
                                            </td>
                                            <td width="2%" class="bgWhite"></td>
                                            <td width="15%">
                                                <div id="c1TabGeny" class="text-center textoListadosPlanAnual" > <span class="pr-4">${TotalTareasProgramadasXMes}</span> <span>${TotalTareasProgramadas}</span>
                                                </div>
                                            </td>
                                            <td width="2%" class="bgWhite"></td>
                                            <td width="15%">
                                                <div id="c1TabGeny" class="text-center textoListadosPlanAnual" >
                                                    <span class="pr-2">${avanceProjecto} %</span>
                                                    <span>${avanceProjectoXMes} %</span>
                                                    <input type="hidden" id="avanceProyectoXMes_${tr}" name="avanceProyectoXMes_${tr}" value="${avanceProjectoXMes}">
                                                    <input type="hidden" id="avanceProyecto_${tr}" name="avanceProyecto_${tr}" value="${avanceProjecto}">
                                                </div>
                                            </td>
                                            <td width="2%" class="bgWhite"></td>
                                            <td width="15%">
                                                <div id="c1TabGeny" class="text-center textoListadosPlanAnual" >
                                                    <span>${TotalTareasEjecutadas}</span>
                                                </div>
                                            </td>
                                            <td width="2%" class="bgWhite"></td>
                                            <td width="15%">
                                                <div id="c1TabGeny" class="text-left textoListadosPlanAnual bgYellow" style="margin: 0px 0px 0px 0px !important;">
                                                    <table width="100%" border="0" style="border-color: green">
                                                        <tbody>
                                                            <tr>
                                                                <td rowspan="2" width="24%" class="bgYellow fontGris text-center" style="height: 2rem;">${totalProcentajeProyectoXMes} %</td>
                                                                <input type="hidden" id="totalProcentajeProyectoXMes_${tr}" name="totalProcentajeProyectoXMes_${tr}" value="${totalProcentajeProyectoXMes}">
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                </div>
                                            </td>
                                            <td width="2%" class="bgWhite"></td>
                                            <td width="15%">
                                                <div id="c1TabGeny" class="text-left textoListadosPlanAnual bgGreen" style="margin: 0px 0px 0px 0px !important;">
                                                    <table width="100%" border="0" style="border-color: green">
                                                        <tbody>
                                                            <tr>
                                                                <td rowspan="2" width="24%" class="bgGreen fontWhite text-center" style="height: 2rem;">${totalProcentajeProyecto} %</td>
                                                                <input type="hidden" id="totalProcentajeProyecto_${tr}" name="totalProcentajeProyecto_${tr}" value="${totalProcentajeProyecto}">
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    `

    // anadimos al listodo de complementos
    $("#listadoComplemento").append(`${filaComplementos}`)


}


var fnSp3PintarComplementosExcel = function(ResponsableName, TotalTareasProgramadas, TotalTareasProgramadasXMes, TotalTareasEjecutadas)
{
    console.log(ResponsableName, TotalTareasProgramadas, TotalTareasProgramadasXMes, TotalTareasEjecutadas)
    // calcular porcentaje total del proyecto
    // let totalProcentajeProyecto = Math.round( (TotalTareasEjecutadas*100) / TotalTareasProgramadasXMes)
    // if(totalProcentajeProyecto < 0 || isNaN(totalProcentajeProyecto) )
    //     totalProcentajeProyecto = 0
    let totalProcentajeProyecto = (TotalTareasEjecutadas > 0) ? 100 : 0

    // calcular avances del proyecto estimado
  //  let avanceProjecto = Math.round( (TotalTareasProgramadasXMes*100) / TotalTareasProgramadas)
    let avanceProjecto = Math.round( (TotalTareasEjecutadas*100) / TotalTareasProgramadas)
    //console.warn("avanceProjecto",avanceProjecto)
    if(avanceProjecto < 0 || isNaN(avanceProjecto) )
        avanceProjecto = 0

    // calcular avances del proyecto real
    let avanceProjectoXMes = Math.round( (TotalTareasEjecutadas*100) / TotalTareasProgramadas)
    //console.warn("avanceProjectoXMes",avanceProjectoXMes)
    if(avanceProjectoXMes < 0 || isNaN(avanceProjectoXMes) )
        avanceProjectoXMes = 0

    // calcular porcentaje total del proyecto
    let totalProcentajeProyectoXMes = Math.round( (avanceProjectoXMes*100) / avanceProjecto )
    if(totalProcentajeProyectoXMes < 0 || isNaN(totalProcentajeProyectoXMes) )
        totalProcentajeProyectoXMes = 0


    var filaComplementos = `
        
            <td colspan="11">
                <div class="body-tabla-list-EvalAud" id="body-tabla-list-EvalAud1">
                    <div id = 'iddd'  class="p-2" style="z-index: 1; padding: 0px !important; margin: 10px 3px 0px 3px !important;">
                        <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                            <div class="col-12 text-center altoListado">
                                <div class="row">
                                    <table width = "100%" border="0" style="border-color: red;font-size: 0.95rem;">
                                        <tr >
                                            <td width="15%">
                                                <div id="c1TabGeny" class="text-left textoListadosPlanAnual" > ${toCapitalize(ResponsableName)} </div>
                                            </td>
                                            <td width="15%">
                                                <div id="c1TabGeny" class="text-center textoListadosPlanAnual" > <span class="pr-4">${TotalTareasProgramadasXMes}</span> <span>${TotalTareasProgramadas}</span>
                                                </div>
                                            </td>
                                            <td width="15%">
                                                <div id="c1TabGeny" class="text-center textoListadosPlanAnual" >
                                                    <span class="pr-2">${avanceProjecto} %</span>
                                                    <span>${avanceProjectoXMes} %</span>
                                                    <input type="hidden" id="avanceProyectoXMes_${tr}" name="avanceProyectoXMes_${tr}" value="${avanceProjectoXMes}">
                                                    <input type="hidden" id="avanceProyecto_${tr}" name="avanceProyecto_${tr}" value="${avanceProjecto}">
                                                </div>
                                            </td>
                                            <td width="15%">
                                                <div id="c1TabGeny" class="text-center textoListadosPlanAnual" >
                                                    <span>${TotalTareasEjecutadas}</span>
                                                </div>
                                            </td>
                                            <td width="15%">
                                                <div id="c1TabGeny" class="text-left textoListadosPlanAnual bgYellow" style="margin: 0px 0px 0px 0px !important;">
                                                    <table width="100%" border="0" style="border-color: green">
                                                        <tbody>
                                                            <tr>
                                                                <td rowspan="2" width="24%" class="bgYellow fontGris text-center" style="height: 2rem;">${totalProcentajeProyectoXMes} %</td>
                                                                <input type="hidden" id="totalProcentajeProyectoXMes_${tr}" name="totalProcentajeProyectoXMes_${tr}" value="${totalProcentajeProyectoXMes}">
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                </div>
                                            </td>
                                            <td width="15%">
                                                <div id="c1TabGeny" class="text-left textoListadosPlanAnual bgGreen" style="margin: 0px 0px 0px 0px !important;">
                                                    <table width="100%" border="0" style="border-color: green">
                                                        <tbody>
                                                            <tr>
                                                                <td rowspan="2" width="24%" class="bgGreen fontWhite text-center" style="height: 2rem;">${totalProcentajeProyecto} </td>
                                                                <input type="hidden" id="totalProcentajeProyecto_${tr}" name="totalProcentajeProyecto_${tr}" value="${totalProcentajeProyecto}">
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
    `

    // anadimos al listodo de complementos
    TOTAL_AVANCE1 = TOTAL_AVANCE1 + avanceProjecto;
    TOTAL_AVANCE2 = TOTAL_AVANCE2 + avanceProjectoXMes
    TOTAL_REPORTE_PROYECTO = TOTAL_REPORTE_PROYECTO + totalProcentajeProyectoXMes;
    return filaComplementos;


}

/**
 * [fnSp3VerDetalleActividad levantar modal para ver las evidencias]
 * @return {[type]} [description]
 * @autor Jesus Millan [07/02/2021]
 */
var fnSp3VerDetalleActividad = function(objetivo, subObjetivo, actividad)
{
    istObj=objetivo;//contiene el id del objetivo actual trabajado
    istSobj=subObjetivo;//contiene el id del subobjetivo actual trabajado
    istAct=actividad;//contiene el id de la Actividad que actualmente se trabaja
    console.warn(objetivo, subObjetivo, actividad)
    console.log(paObj[istAud].a)
    // OCULTAR MODAL PLAN ANUAL
    $('#modalVerPlanAnualSP3').modal('hide').removeClass('fade')

    // LIMPIAMOS LA CAPA DEL LISTADO DE EVIDENCIAS
    $("#listadoEvidenciasTareas").html("")

    // datos de las activdades
    let actividades = []

    // obtener datos de la actividad
    if(subObjetivo === null){
        console.warn("Es Objetivo",paObj[istAud].a.Objetivos[objetivo])
        actividades = paObj[istAud].a.Objetivos[objetivo].Actividades
    }else{
        console.warn("Es SubObjetivo",paObj[istAud].a.Objetivos[objetivo].SubObjetivos[subObjetivo])
        actividades = paObj[istAud].a.Objetivos[objetivo].SubObjetivos[subObjetivo].Actividades
    }

    console.warn("actividades xxx",actividades[actividad])
    // Pintamos el nombre del Responsable
    $("#nameResponsableTarea").html(actividades[actividad].ResponsableName)
    let countTareas = 0
    actividades[actividad].Tareas.forEach(function(Item){
        console.info("Item",Item)

           //----------------------------------------------------------------------- ANDY 26-6-2021 ------------------------------------------------------------------
               //  var datenow=moment().format('YYYY/MM/DD');
               //  date_fin =  paObj[istAud].a.Objetivos[objetivo].Actividades[actividad].Tareas[countTareas].Fecha_Programada_Fin;

               //  console.log("XX::", paObj[istAud].a.Objetivos[objetivo].Actividades[actividad].Tareas[countTareas].Fecha_Programada_Fin);
               //  var spltdate = date_fin.split('/')
               //  date_fin=spltdate[2]+'/'+spltdate[1]+'/'+spltdate[0];
               //  var Monthdate_fin =moment(spltdate[2]+'/'+spltdate[1]+'/'+spltdate[0]).add(1, 'months').format('YYYY/MM/03');
               // //console.log('now: '+datenow, 'date_fin: '+date_fin,  'Monthdate_fin: '+Monthdate_fin)
               //  if(datenow> date_fin)
               //  {

               //     if(datenow > Monthdate_fin){            
               //     console.log("hol")
               //     check_available  = false;//vencida
               //     console.log('estara vencido::',check_available );}
               //  }else{check_available  = true;}
            //----------------------------------------------------------------------- ANDY 26-6-2021 ------------------------------------------------------------------


        if(getStorage("vtas_rolexternalrol", "text") == "ROL_EJECUTANTEASIGNADO")
        {
             //alert('4568 QUE PASO EJECUTANTE');
        $("#listadoEvidenciasTareas").append(`
             <div id="evidencia_${countTareas}" class="item-tabla p-0" style="z-index: 1;display:relative; background-color: white !important;  padding: 0px !important; margin: 10px 0px 0px 0px !important; width: 100% !important;">
                <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                    <div class="col-12 text-center" style="font-size: 15px; padding: 4px !important; ">
                        <div class="row">

                            <table width="100%" border="0" >
                                <tbody>
                                    <tr>

                                        <td width="5%" align="center"><div id="itemTarea_${countTareas}" class="text-left " style="margin: 0px 0px 0px 18px !important; font-size: 14px !important; ">${(countTareas+1)}</div></td>

                                        <td width="35%" align="center" style="border-radius: 4px; border: 1px solid #c8c8c8;"><div id="descriptionTarea_${countTareas}" class="text-left " style="color:#000; margin-left: 10px;">${Item.Evidencia_Name}</div></td>

                                        <td width="18%" align="center"><div id="fechaProg_${countTareas}" class="text-left " style="color:${Item.Color == "#ff6767" ? Item.Color : "#000"}; margin-left: 20px !important;">${Item.Fecha_Programada_Ini} - ${Item.Fecha_Programada_Fin}</div></td>

                                        <td width="16%" align="center"><div id="fechaEjec_${countTareas}" class="text-left " style="color:${Item.Color == "#ff6767" ? Item.Color : "#000"}; margin-left:5px;">${Item.Fecha_Ejecutada_Ini != null ? Item.Fecha_Ejecutada_Ini : "---"} </div></td>

                                        <td width="8%" align="center"><div id="estado1PlanAnual_${countTareas}" class="text-center " style="color:${Item.Color};">${Item.Estado}</div></td>

                                        <td width="8%" align="center"><div id="btnAdjuntar_${countTareas}" class="text-center lbCabezaTabla">
                                            <button type="button" title="Adjuntar Evidencia" onmouseup="fnVerModalAdjuntarDocumentosTareasSp3(${objetivo}, ${subObjetivo}, ${actividad},${countTareas})" class="btn-circle btn_read border-0" style="background-color:#34559c !important;" id="adjuntoTarea_${countTareas}">
                                                <img src="./images/iconos/attach_2.svg" class="">
                                            </button>
                                        </div></td>

                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
             </div>
        `)
    }
        if(getStorage("vtas_rolexternalrol", "text") == "ROL_REPSONSABLEPLANANUAL")
        {

            //alert('4568 QUE PASO RESPONSABLE');

            if(subObjetivo == null)

            {

                 var datenow=moment().format('YYYY/MM/DD');
                date_fin =  paObj[istAud].a.Objetivos[objetivo].Actividades[actividad].Tareas[countTareas].Fecha_Programada_Fin;

                console.log("XX::", paObj[istAud].a.Objetivos[objetivo].Actividades[actividad].Tareas[countTareas].Fecha_Programada_Fin);
                var spltdate = date_fin.split('/')
                date_fin=spltdate[2]+'/'+spltdate[1]+'/'+spltdate[0];
                var Monthdate_fin =moment(spltdate[2]+'/'+spltdate[1]+'/'+spltdate[0]).add(1, 'months').format('YYYY/MM/03');
               //console.log('now: '+datenow, 'date_fin: '+date_fin,  'Monthdate_fin: '+Monthdate_fin)
                if(datenow> date_fin)
                {

                   if(datenow > Monthdate_fin){            
                   console.log("hol")
                   check_available  = false;//vencida
                   console.log('estara vencido::',check_available );}
                }else{check_available  = true;}

            }
            else
            {
                 var datenow=moment().format('YYYY/MM/DD');
                date_fin =  paObj[istAud].a.Objetivos[objetivo].SubObjetivos[subObjetivo].Actividades[actividad].Tareas[countTareas].Fecha_Programada_Fin;

                console.log("XX::", paObj[istAud].a.Objetivos[objetivo].SubObjetivos[subObjetivo].Actividades[actividad].Tareas[countTareas].Fecha_Programada_Fin);
                var spltdate = date_fin.split('/')
                date_fin=spltdate[2]+'/'+spltdate[1]+'/'+spltdate[0];
                var Monthdate_fin =moment(spltdate[2]+'/'+spltdate[1]+'/'+spltdate[0]).add(1, 'months').format('YYYY/MM/03');
               //console.log('now: '+datenow, 'date_fin: '+date_fin,  'Monthdate_fin: '+Monthdate_fin)
                if(datenow> date_fin)
                {

                   if(datenow > Monthdate_fin){            
                   console.log("hol")
                   check_available  = false;//vencida
                   console.log('estara vencido::',check_available );}
                }else{check_available  = true;}
            }

            //----------------------------------------------------------------------- ANDY 26-6-2021 ------------------------------------------------------------------
               
            //----------------------------------------------------------------------- ANDY 26-6-2021 ------------------------------------------------------------------

           
           if(check_available  == true)
           {
             //alert('a tiempo');
               $("#listadoEvidenciasTareas").append(`
            <div id="evidencia_${countTareas}" class="item-tabla p-0" style="z-index: 1;display:relative; background-color: white !important;  padding: 0px !important; margin: 10px 0px 0px 0px !important; width: 100% !important;">
               <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                   <div class="col-12 text-center" style="font-size: 15px; padding: 4px !important; ">
                       <div class="row">
    
                           <table width="100%" border="0" >
                               <tbody>
                                   <tr>
    
                                       <td width="5%" align="center"><div id="itemTarea_${countTareas}" class="text-left " style="margin: 0px 0px 0px 18px !important; font-size: 14px !important; ">${(countTareas+1)}</div></td>
    
                                       <td width="35%" align="center" style="border-radius: 4px; border: 1px solid #c8c8c8;"><div id="descriptionTarea_${countTareas}" class="text-left " style="color:#000; margin-left: 10px;">${Item.Evidencia_Name}</div></td>
    
                                       <td width="18%" align="center"><div id="fechaProg_${countTareas}" class="text-left " style="color:${Item.Color == "#ff6767" ? Item.Color : "#000"}; margin-left: 20px !important;">${Item.Fecha_Programada_Ini} - ${Item.Fecha_Programada_Fin}</div></td>
    
                                       <td width="16%" align="center"><div id="fechaEjec_${countTareas}" class="text-left " style="color:${Item.Color == "#ff6767" ? Item.Color : "#000"}; margin-left:5px;">${Item.Fecha_Ejecutada_Ini != null ? Item.Fecha_Ejecutada_Ini : "---"} </div></td>
    
                                       <td width="8%" align="center"><div id="estado1PlanAnual_${countTareas}" class="text-center " style="color:${Item.Color};">${Item.Estado}</div></td>
    
                                       <td width="8%" align="center"><div id="btnAdjuntar_${countTareas}"  class="text-center lbCabezaTabla">
                                           <button type="button" title="Adjuntar Evidencia" onmouseup="fnVerModalAdjuntarDocumentosTareasSp3(${objetivo}, ${subObjetivo}, ${actividad},${countTareas})" class="btn-circle btn_read border-0" ${Item.IdEstado != 1 ? 'style="background-color:#34559c !important;"' : 'style="background-color:#b2b2b2 !important;" disabled=disabled'} id="adjuntoTarea_${countTareas}">
                                               <img src="./images/iconos/attach_2.svg" class="">
                                           </button>
                                       </div></td>
    
                                   </tr>
                               </tbody>
                           </table>
    
                       </div>
                   </div>
               </div>
            </div>
       `)
           }
           else
           {
                 $("#listadoEvidenciasTareas").append(`
            <div id="evidencia_${countTareas}" class="item-tabla p-0" style="z-index: 1;display:relative; background-color: white !important;  padding: 0px !important; margin: 10px 0px 0px 0px !important; width: 100% !important;">
               <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                   <div class="col-12 text-center" style="font-size: 15px; padding: 4px !important; ">
                       <div class="row">
    
                           <table width="100%" border="0" >
                               <tbody>
                                   <tr>
    
                                       <td width="5%" align="center"><div id="itemTarea_${countTareas}" class="text-left " style="margin: 0px 0px 0px 18px !important; font-size: 14px !important; ">${(countTareas+1)}</div></td>
    
                                       <td width="35%" align="center" style="border-radius: 4px; border: 1px solid #c8c8c8;"><div id="descriptionTarea_${countTareas}" class="text-left " style="color:#000; margin-left: 10px;">${Item.Evidencia_Name}</div></td>
    
                                       <td width="18%" align="center"><div id="fechaProg_${countTareas}" class="text-left " style="color:${Item.Color == "#ff6767" ? Item.Color : "#000"}; margin-left: 20px !important;">${Item.Fecha_Programada_Ini} - ${Item.Fecha_Programada_Fin}</div></td>
    
                                       <td width="16%" align="center"><div id="fechaEjec_${countTareas}" class="text-left " style="color:${Item.Color == "#ff6767" ? Item.Color : "#000"}; margin-left:5px;">${Item.Fecha_Ejecutada_Ini != null ? Item.Fecha_Ejecutada_Ini : "---"} </div></td>
    
                                       <td width="8%" align="center"><div id="estado1PlanAnual_${countTareas}" class="text-center " style="color:${Item.Color};">${Item.Estado}</div></td>
    
                                       <td width="8%" align="center"><div id="btnAdjuntar_${countTareas}"  class="text-center lbCabezaTabla">
                                           <button type="button"  onmouseup="fnVerModalAdjuntarDocumentosTareasSp3(${objetivo}, ${subObjetivo}, ${actividad},${countTareas})" class="btn-circle btn_read border-0" ${Item.IdEstado != 1 ? 'style="background-color:#34559c !important;" title="Adjuntar Evidencia "' : 'style="background-color:#34559c !important;" title="Adjuntar Evidencia Vencida"'} id="adjuntoTarea_${countTareas}">
                                               <img src="./images/iconos/attach_2.svg" class="">
                                           </button>
                                       </div></td>
    
                                   </tr>
                               </tbody>
                           </table>
    
                       </div>
                   </div>
               </div>
            </div>
       `)
           }
            
 }

        countTareas++

    })

    $("#titleModalIngresarTareasActividadSp3").html(`
        Ingresar Tareas de Actividad - ${actividades[actividad].Actividad_Name}
    `)

    // MOSTAR MODAL INGRESAR TAREAS ACTIDIDAD
    $('#modalIngresarTareasActividadSp3').modal('show').addClass('fade')

}


/**
 * [fnVerModalAdjuntarDocumentosTareasSp3 Ver modal Adjuntar Documentos Tareas de Actividad]
 * @param  {[type]} tareasId [Id de la tabla ]
 * @return {[type]}          [description]
 */
var tareaActiva       = 0
var objetivoActiva    = 0
var subObjetivoActiva = 0
var actividadActiva   = 0
var adjuntoActiva     = 0
var accionActiva      = 0
var countAdjuntos     = 0

var fnVerModalAdjuntarDocumentosTareasSp3 = function(objetivo, subObjetivo, actividad, tarea)
{

    if(subObjetivo===null)
    { console.log(paObj[istAud].a.Objetivos[objetivo].Actividades[actividad].Tareas[tarea].IdEstado)
        if(paObj[istAud].a.Objetivos[objetivo].Actividades[actividad].Tareas[tarea].IdEstado == 4)
        {
            $("#agregarEvidencia").css('display','none')
        }else{
            $("#agregarEvidencia").css('display','')

        }
    }else{
        if(paObj[istAud].a.Objetivos[objetivo].SubObjetivos[subObjetivo].Actividades[actividad].Tareas[tarea].IdEstado == 4)
        {
            $("#agregarEvidencia").css('display','none')
        }else{
            $("#agregarEvidencia").css('display','')

        }
    }
    flag_Supervisor = false;
    flag_Rechazado = false;
    $("#agregarEvidencia").css('display','')
    $("#tdcargadoc0").css('display','')
    $("#tdcargadoc1").css('display','')
    $("#tdcargadoc2").css('display','')

    $(".tdSupervisa1").css('display','none')
    $(".tdSupervisa2").css('display','none')
     check_available = true;
    var datenow=moment().format('YYYY/MM/DD');
    var Monthdate_fin ='';
    date_fin='';


    // variables globlales para saber la posicion de cada elemento en el array
    tareaActiva       = tarea
    objetivoActiva    = objetivo
    subObjetivoActiva = subObjetivo
    actividadActiva   = actividad
    countAdjuntos     = 0


     //alert('oculamos el texto ver historial de documentos');
    // oculamos el texto ver historial de documentos
    $("#verHistorialDoc").css("display","none")

    // Colocamos Titulo a la Modal
    $("#lbTitleModalAdjuntarDocumentosTareasSp3").html(`Evidencia de: &nbsp; ${paObj[istAud].a.Objetivos[objetivo].Actividades[actividad].Actividad_Name}`)

    //limpiamos la capa de filas de documentos a adjuntar
    $("#filasAdjuntarDocumentosTareas").html('')
     $("#filasAdjuntarDocumentosTareas").append('<div id="DescargarEvidenciasSp3"style=" display: none;">Aqui es para que descarguemos los archivos</div>')

    if(subObjetivo===null)
    {
        //alert('es un objetivo');
         date_fin = paObj[istAud].a.Objetivos[objetivo].Actividades[actividad].Tareas[tarea].Fecha_Programada_Fin;
         var spltdate = date_fin.split('/')
         date_fin=spltdate[2]+'/'+spltdate[1]+'/'+spltdate[0];
         Monthdate_fin =moment(spltdate[2]+'/'+spltdate[1]+'/'+spltdate[0]).add(1, 'months').format('YYYY/MM/03');
        console.log('now: '+datenow, 'date_fin: '+date_fin,  'Monthdate_fin: '+Monthdate_fin)
        if(datenow> date_fin){

            if(datenow > Monthdate_fin){            
                console.log("hol")

                check_available = false;
            }

        }


        paObj[istAud].a.Objetivos[objetivo].Actividades[actividad].Tareas[tarea].Adjuntos.forEach(function(ItemAdjuntos)
        {
            console.info("ItemAdjuntos",ItemAdjuntos)
            console.log(getStorage("vtas_rolexternalrol", "text"))
            //fnAgregarAdjuntarDocumento(ItemAdjuntos.Id,ItemAdjuntos.AdjuntoName,ItemAdjuntos.EstadoAdjunto,ItemAdjuntos.AdjuntoCode,2,ItemAdjuntos.EstadoAdjuntoId)
                if(getStorage("vtas_rolexternalrol", "text") == "ROL_REPSONSABLEPLANANUAL"){
                    fnAgregarAdjuntarDocumentoSupervisor(ItemAdjuntos.Id,ItemAdjuntos.AdjuntoName,ItemAdjuntos.EstadoAdjunto,ItemAdjuntos.AdjuntoCode,2,ItemAdjuntos.EstadoAdjuntoId)

                }else{
                    fnAgregarAdjuntarDocumento(ItemAdjuntos.Id,ItemAdjuntos.AdjuntoName,ItemAdjuntos.EstadoAdjunto,ItemAdjuntos.AdjuntoCode,2,ItemAdjuntos.EstadoAdjuntoId)
                }

        })


        console.log("ANDY_4430",paObj[istAud].a.Objetivos[objetivo].Actividades[actividad].Tareas[tarea])
        if( paObj[istAud].a.Objetivos[objetivo].Actividades[actividad].Tareas[tarea].Historial.length > 0 )
        {
            // mostramos el texto ver historial de documentos
           // alert('seeeeeeeeeeeeeeeeeeeeeeeeeeee ');
            $("#verHistorialDoc").css("display","block")
        }

    }
    else
    {
        //alert('es un SUBobjetivo');
        date_fin = paObj[istAud].a.Objetivos[objetivo].SubObjetivos[subObjetivo].Actividades[actividad].Tareas[tarea].Fecha_Programada_Fin;
        var spltdate = date_fin.split('/')
        date_fin=spltdate[2]+'/'+spltdate[1]+'/'+spltdate[0];
        Monthdate_fin =moment(spltdate[2]+'/'+spltdate[1]+'/'+spltdate[0]).add(1, 'months').format('YYYY/MM/03');
       //console.log('now: '+datenow, 'date_fin: '+date_fin,  'Monthdate_fin: '+Monthdate_fin)
       if(datenow> date_fin){

           if(datenow > Monthdate_fin){            
console.log("hol")
               check_available = false;
           }

       }




        paObj[istAud].a.Objetivos[objetivo].SubObjetivos[subObjetivo].Actividades[actividad].Tareas[tarea].Adjuntos.forEach(function(ItemAdjuntos)
        {
            console.info("ItemAdjuntos",ItemAdjuntos,)
                if(getStorage("vtas_rolexternalrol", "text") == "ROL_REPSONSABLEPLANANUAL")
                {
                    fnAgregarAdjuntarDocumentoSupervisor(ItemAdjuntos.Id,ItemAdjuntos.AdjuntoName,ItemAdjuntos.EstadoAdjunto,ItemAdjuntos.AdjuntoCode,2,ItemAdjuntos.EstadoAdjuntoId)
                    console.info("4889............ROL_REPSONSABLEPLANANUAL",ItemAdjuntos,)

                }
                else
                {
                    fnAgregarAdjuntarDocumento(ItemAdjuntos.Id,ItemAdjuntos.AdjuntoName,ItemAdjuntos.EstadoAdjunto,ItemAdjuntos.AdjuntoCode,2,ItemAdjuntos.EstadoAdjuntoId)

                     console.info("4896............ NOOO ES ROL_REPSONSABLEPLANANUAL",ItemAdjuntos,) 
                }

        })



        if( paObj[istAud].a.Objetivos[objetivo].SubObjetivos[subObjetivo].Actividades[actividad].Tareas[tarea].Historial.length > 0 )
        {
             // mostramos el texto ver historial de documentos
            $("#verHistorialDoc").css("display","block")
        }

    }

	// ocultar modal previa
	$("#modalIngresarTareasActividadSp3").modal('hide').removeClass('fade')

    if(flag_exec == true)
        {
          if(check_available == true)
            {
                 // levantar modal
                 $("#modalAdjuntarDocumentosTareasSp3").modal('show').addClass('fade')
            }
          else
            {
                 if(getStorage("vtas_rolexternalrol", "text") == "ROL_REPSONSABLEPLANANUAL")
                  {
                    console.log("4768:: ROL_REPSONSABLEPLANANUAL");
                    $("#modalAdjuntarDocumentosTareasSp3").modal('show').addClass('fade')
                  }
                  else
                  {
                    console.log("Vencidas::", paObj[istAud].a)
                   $("#modalConfirmarSolicitudEjecucionVencidaPlanAnualSp3").modal('show').addClass('fade')
                   $('#msj_confirm_fin_corrige_plan2').html("No puede adjuntar <br> evidencias, comunicarse con <br> el Supervisor:<br>"+paObj[istAud].a.Email_Supervisor);
                  }
                 

            }  
       }
  else
       {
        
        $("#modalAdjuntarDocumentosTareasSp3").modal('show').addClass('fade')

       }

	
}

/**
 * [fnAgregarAdjuntarDocumento ]
 * @return {[type]} [description]
 */
var fnAgregarAdjuntarDocumento = function(adjuntoId, adjuntoName, estadoAdjunto, adjuntoCode, accionAdjunto, estadoAdjuntoId)
{
   // $("#agregarEvidencia").css('display','')
    if(subObjetivoActiva===null)
    {
       if(paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].IdEstado == 4)
       {
           $("#agregarEvidencia").css('display','none')
       }else{
           $("#agregarEvidencia").css('display','')

       }
    }
    else
    {
       if(paObj[istAud].a.Objetivos[objetivoActiva].SubObjetivos[subObjetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].IdEstado == 4)
       {
           $("#agregarEvidencia").css('display','none')
       }else{
           $("#agregarEvidencia").css('display','')

       }
           }
    $("#tdcargadoc0").css('display','')
    $("#tdcargadoc1").css('display','')
    $("#tdcargadoc2").css('display','')

    $(".tdSupervisa1").css('display','none')
    $(".tdSupervisa2").css('display','none')
    console.info("tareaActiva "+tareaActiva+", istAud "+istAud+", objetivoActiva "+objetivoActiva+", subObjetivoActiva "+subObjetivoActiva+", actividadActiva "+actividadActiva+", Id "+adjuntoId+", estadoAdjuntoId "+estadoAdjuntoId)

    let btnDisabled            = (estadoAdjuntoId==0||estadoAdjuntoId==3) ? "" : "disabled"
    let btnBackground          = (estadoAdjuntoId==0||estadoAdjuntoId==3) ? "#58c25d" : "#b2b2b2"
    let btnDisabledDescargar   = (estadoAdjuntoId==0) ? "disabled" : ""
    let btnBackgroundDescargar = (estadoAdjuntoId==0) ? "#b2b2b2"  : "#373e68"

    // mostramos el texto ver historial de documentos
    // if(estadoAdjuntoId==3)
    // {
    //     $("#verHistorialDoc").css("display","block")
    // }


    $("#filasAdjuntarDocumentosTareas").append(`
        <div class="body-tabla-list-EvalAud" id="filaAdjuntos_${countAdjuntos}" style="width: 100% !important;" >
            <div id = "docActividads_${countAdjuntos}"  class="item-tabla p-2" style="z-index: 1;display:relative; background-color: white !important;  padding: 0px !important; margin: 10px 0px 0px !important; width: 100% !important;">
                <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                    <div class="col-12 text-center" style="font-size: 15px; padding: 4px !important; ">
                        <div class="row">

                            <table width = "100%" border="0">
                                <tr >
                                    <td width = "50%" align="center"><div id="nombreDocs_${countAdjuntos}" class="text-left "  style='margin: 0px 0px 0px 18px !important; font-size: 14px !important; font-weight: bold !important; '>${adjuntoName}</div></td>

                                    <td width = "20%" align="center"><div id="EstatoAdjunto_${countAdjuntos}" onclick="fnVentanaObservacionx(3,${countAdjuntos});" class="text-center "  style='color:${adjuntoCode};  text-decoration:underline;'>${estadoAdjunto}</div></td>

                                    <td width = "8%" align="center"><div class="text-center lbCabezaTabla"  >
                                        <input type="file" id="adjuntarFile_${countAdjuntos}" onchange="FnAdjuntarDocumentosTareasSp3(${countAdjuntos})" style="display:none; " accept=".pdf,.xls,.xlsx,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"/>
                                            <input type="hidden" id="adjuntoId_${countAdjuntos}" value="${adjuntoId}"/>
                                            <input type="hidden" id="accionAdjunto_${countAdjuntos}" value="${accionAdjunto}"/>
                                        <button type='button' ${btnDisabled} onmouseup="$('#adjuntarFile_${countAdjuntos}').trigger('click');" title='Adjuntar Evidencia' class='btn-circle btn_read border-0' style='background-color:${btnBackground} !important;'  id='adjuntarDocs_${countAdjuntos}'>
                                            <img src='./images/iconos/attach_2.svg' class=''  >
                                        </button>
                                    </td>

                                    <td width = "8%" align="center"><div class="text-center lbCabezaTabla"  >
                                        <button type='button' ${btnDisabledDescargar} title='Descargar Documentos' onclick=""   class='btn-circle btn_read border-0' style='background-color:${btnBackgroundDescargar} !important;' onmouseup="fnDescargarEvidenciaSp3(${adjuntoId})" id='descargarDoc_${countAdjuntos}'>
                                            <img src='./images/iconos/download.svg' class='ojo-1'  >
                                        </button>
                                    </td>
                                </tr>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        <!-- Aqui cierran listados de los item de la tabla Resposable asignado -->
        </div>
    `)
    countAdjuntos++
}

/**
 * [fnAgregarAdjuntarDocumento ]
 * @return {[type]} [description]
 */
 var fnAgregarAdjuntarDocumentoSupervisor = function(adjuntoId, adjuntoName, estadoAdjunto, adjuntoCode, accionAdjunto, estadoAdjuntoId)
 { console.log("ando aqui supervisor")
    flag_Supervisor = true;
    $("#agregarEvidencia").css('display','none')
    $("#tdcargadoc0").css('display','none')
    $("#tdcargadoc1").css('display','none')
    $("#tdcargadoc2").css('display','none')
    var imgAprobada="aprobarvoid";
    var imgRechazada="aprobarvoid";
    $(".tdSupervisa1").css('display','')
    $(".tdSupervisa2").css('display','')

    var tdhidden ='';

    console.info("tareaActiva "+tareaActiva+", istAud "+istAud+", objetivoActiva "+objetivoActiva+", subObjetivoActiva "+subObjetivoActiva+", actividadActiva "+actividadActiva+", Id "+adjuntoId+", estadoAdjuntoId "+estadoAdjuntoId)
 
     let btnDisabled            = (estadoAdjuntoId==0||estadoAdjuntoId==3) ? "" : "disabled"
     let btnBackground          = (estadoAdjuntoId==0||estadoAdjuntoId==3) ? "#58c25d" : "#b2b2b2"
     let btnDisabledDescargar   = (estadoAdjuntoId==0) ? "disabled" : ""
     let btnBackgroundDescargar = (estadoAdjuntoId==0) ? "#b2b2b2"  : "#373e68"
 
     // mostramos el texto ver historial de documentos
     // if(estadoAdjuntoId==3)
     // {
     //     $("#verHistorialDoc").css("display","block")
     // }
     $("#tb_btn_modalAdjuntarDocumentosTareasSp3").css('display','')

     if(estadoAdjuntoId==1)
     {
        tdhidden = "style='display:none;'"
        $(".tdSupervisa1").css('display','none')
        $(".tdSupervisa2").css('display','none')
        
     }

          if(estadoAdjuntoId==3)
     {
        imgRechazada="aprobarbien";
     }

     if(estadoAdjuntoId==4)
     {
        imgAprobada="aprobarbien";
        $("#tb_btn_modalAdjuntarDocumentosTareasSp3").css('display','none')

     }
 
 
     $("#filasAdjuntarDocumentosTareas").append(`
         <div class="body-tabla-list-EvalAud" id="filaAdjuntos_${countAdjuntos}" style="width: 100% !important;" >
             <div id = "docActividads_${countAdjuntos}"  class="item-tabla p-2" style="z-index: 1;display:relative; background-color: white !important;  padding: 0px !important; margin: 10px 0px 0px !important; width: 100% !important;">
                 <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                     <div class="col-12 text-center" style="font-size: 15px; padding: 4px !important; ">
                         <div class="row">
 
                             <table width = "100%" border="0">
                                 <tr >
                                     <td width = "40%" align="center"><div id="nombreDocs_${countAdjuntos}" onmouseup="fnDescargarEvidenciaSp3(${adjuntoId})" class="text-left "  style='margin: 0px 0px 0px 18px !important; font-size: 14px !important; font-weight: bold !important; '>${adjuntoName}</div></td>
 
                                     <td width = "5%" align="center"><div id="EstatoAdjunto_${countAdjuntos}" class="text-center "  style='display:none;color:${adjuntoCode};'>${estadoAdjunto}</div></td>
 

                                     <td width = "8%" align="center" ${tdhidden}><div class="text-center lbCabezaTabla"  >
                                         <input type="file" id="adjuntarFile_${countAdjuntos}" onchange="FnAdjuntarDocumentosTareasSp3(${countAdjuntos})" style="display:none; " accept=".pdf,.xls,.xlsx,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"/>
                                         <input type="hidden" id="estadoAdjuntoId_${countAdjuntos}" value="${estadoAdjuntoId}"/>
                                         <input type="hidden" id="adjuntoId_${countAdjuntos}" value="${adjuntoId}"/>
                                         <input type="hidden" id="accionAdjunto_${countAdjuntos}" value="${accionAdjunto}"/>

                                         <button type='button'  title='Aprobar Evidencia' class=' border-0' onclick="FnCambiarEstadoAdjunto(4,${countAdjuntos});" style='background-color:white !important;'>
                                             <img src='./images/iconos/${imgAprobada}.svg' class=''  id="ImgEstadoAdjuntoAprobado_${countAdjuntos}" >
                                         </button>
                                     </td>
 
                                     <td width = "8%" align="center" ${tdhidden}><div class="text-center lbCabezaTabla"  >
                             

                                   <button type='button'  title='Observar Evidencia' class=' border-0' onclick="FnCambiarEstadoAdjunto(3,${countAdjuntos});" style='background-color:white !important;'>
                                             <img src='./images/iconos/${imgRechazada}.svg' class=''  id="ImgEstadoAdjuntoObservado_${countAdjuntos}" >
                                  </button>


                                     </td>
                                 </tr>
                             </table>
 
                         </div>
                     </div>
                 </div>
             </div>
         <!-- Aqui cierran listados de los item de la tabla Resposable asignado -->
         </div>
     `)
     countAdjuntos++
 }

///var fnVentanaObservacion 

var ESTADO_U = ''; 
var FILA_ADJUNTO ='';
var fnGuardarEnviarObsDocActAndy = function()
{
     if($('#motivoVentanaObservacionSp3_andy').val() == '')
    {
        verModalError2("Por favor Revise","Debe ingresar el motivo de la Observacion o Rechazo");
    }
    else 
    {
        $('#ImgEstadoAdjuntoObservado_'+FILA_ADJUNTO).attr('src','./images/iconos/aprobarbien.svg');
        $('#ImgEstadoAdjuntoAprobado_'+FILA_ADJUNTO).attr('src','./images/iconos/aprobarvoid.svg');
        if(subObjetivoActiva===null)
        {
           console.log( paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Adjuntos[FILA_ADJUNTO])
           paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Adjuntos[FILA_ADJUNTO].EstadoAdjuntoId=ESTADO_U;
           paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Adjuntos[FILA_ADJUNTO].EstadoAdjunto="Rechazado";
           paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Adjuntos[FILA_ADJUNTO].Motivo = $('#motivoVentanaObservacionSp3_andy').val();
        }
        else
        {
           console.log( paObj[istAud].a.Objetivos[objetivoActiva].SubObjetivos[subObjetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Adjuntos[FILA_ADJUNTO])
           paObj[istAud].a.Objetivos[objetivoActiva].SubObjetivos[subObjetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Adjuntos[FILA_ADJUNTO].EstadoAdjuntoId=ESTADO_U;
           paObj[istAud].a.Objetivos[objetivoActiva].SubObjetivos[subObjetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Adjuntos[FILA_ADJUNTO].EstadoAdjunto="Rechazado";
           paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Adjuntos[FILA_ADJUNTO].Motivo = $('#motivoVentanaObservacionSp3_andy').val();
        }
        $('#modalMotivoDocumentosRechazadosSp3_andy').modal('hide').removeClass('fade'); 
        $('#modalAdjuntarDocumentosTareasSp3').modal('hide').removeClass('fade');
        $('#modalIngresarTareasActividadSp3').modal('hide').removeClass('fade');

         console.log("4707-andy::GuardarEnviar::", paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Adjuntos[FILA_ADJUNTO])
    


        fnEnviarEvidenciasSp3();
    }
}
var fnVentanaObservacion = function (a,b)
{//--------------------------------------------andy 21-06-2020------------------------------------------------------
    //alert("a="+a+", b ="+b);
    ESTADO_U = a; 
    FILA_ADJUNTO = b;

var oobjc = paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Adjuntos[b];

    $('#lbTitleModalMotivoDocumentosRechazadosSp3_andy').html("<b>Motivo de Observación - "+oobjc.AdjuntoName+"</b>");
    $('#modalMotivoDocumentosRechazadosSp3_andy').modal("show").addClass("fade");
    if((oobjc.Motivo == null)||(oobjc.Motivo == 'null'))
    {
        $('#motivoVentanaObservacionSp3_andy').val('')
    }else{ 
            //alert('cargamos su valor');
           $('#motivoVentanaObservacionSp3_andy').val(oobjc.Motivo);
        }
     console.log("4681-andy::", paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Adjuntos[b])
    
}//--------------------------------------------andy 21-06-2020------------------------------------------------------




var fnVentanaObservacionx = function (a,b)
{//--------------------------------------------andy 21-06-2020------------------------------------------------------
    //alert("a="+a+", b ="+b);
    ESTADO_U = a; 
    FILA_ADJUNTO = b;
//alert('que pasa aqui');

    var id = 'EstatoAdjunto_'+b;

    if($(`#`+id).html() == "Rechazado")
    {//-----------------------------------------------------------------------------------------------------------------
        var oobjc = paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Adjuntos[b];

        $('#lbTitleModalMotivoDocumentosRechazadosSp3_andy').html("<b>Motivo de Rechazo - "+oobjc.AdjuntoName+"</b>");
           
        
        // $('#modalAdjuntarDocumentosTareasSp3').modal("hide").removeClass("fade");
        // $('#modalAdjuntarDocumentosTareasSp3').modal("show").addClass("fade");

         $('#modalMotivoDocumentosRechazadosSp3_andy').modal("show").addClass("fade");

          $('#modalAdjuntarDocumentosTareasSp3').modal('hide').removeClass('fade');

        if((oobjc.Motivo == null)||(oobjc.Motivo == 'null'))
        {
            $('#motivoVentanaObservacionSp3_andy').val('')
        }else{ 
                
               $('#motivoVentanaObservacionSp3_andy').val(oobjc.Motivo);
            }
         console.log("4681-andy::", paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Adjuntos[b])
    
    }//-----------------------------------------------------------------------------------------------------------------

}//--------------------------------------------andy 21-06-2020------------------------------------------------------









 var FnCambiarEstadoAdjunto = function (Estado,filaAdjunto) {
    //console.log("....D",Estado,filaAdjunto)
    $("#estadoAdjuntoId_"+filaAdjunto).val(Estado)
    if(Estado == 3){
       fnVentanaObservacion(Estado,filaAdjunto)
        /*
        $('#ImgEstadoAdjuntoObservado_'+filaAdjunto).attr('src','./images/iconos/aprobarbien.svg');
        $('#ImgEstadoAdjuntoAprobado_'+filaAdjunto).attr('src','./images/iconos/aprobarvoid.svg');
        if(subObjetivoActiva===null)
        {
           console.log( paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Adjuntos[filaAdjunto])
           paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Adjuntos[filaAdjunto].EstadoAdjuntoId=Estado;
           paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Adjuntos[filaAdjunto].EstadoAdjunto="Rechazado";
            }
        else
        {
           console.log( paObj[istAud].a.Objetivos[objetivoActiva].SubObjetivos[subObjetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Adjuntos[filaAdjunto])
           paObj[istAud].a.Objetivos[objetivoActiva].SubObjetivos[subObjetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Adjuntos[filaAdjunto].EstadoAdjuntoId=Estado;
           paObj[istAud].a.Objetivos[objetivoActiva].SubObjetivos[subObjetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Adjuntos[filaAdjunto].EstadoAdjunto="Rechazado";
               }
               */
    }else{
        $('#ImgEstadoAdjuntoObservado_'+filaAdjunto).attr('src','./images/iconos/aprobarvoid.svg');
        $('#ImgEstadoAdjuntoAprobado_'+filaAdjunto).attr('src','./images/iconos/aprobarbien.svg');
        if(subObjetivoActiva===null)
        {
           console.log( paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Adjuntos[filaAdjunto])
           paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Adjuntos[filaAdjunto].EstadoAdjuntoId=Estado;
           paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Adjuntos[filaAdjunto].EstadoAdjunto="Aprobado";
            }
        else
        {
           console.log( paObj[istAud].a.Objetivos[objetivoActiva].SubObjetivos[subObjetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Adjuntos[filaAdjunto])
           paObj[istAud].a.Objetivos[objetivoActiva].SubObjetivos[subObjetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Adjuntos[filaAdjunto].EstadoAdjuntoId=Estado;
           paObj[istAud].a.Objetivos[objetivoActiva].SubObjetivos[subObjetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Adjuntos[filaAdjunto].EstadoAdjunto="Aprobado";
               }
    }
     

 }

/**
 * [fnVerHistorialDocumentosSp3 Ver el historial de documentos rechazados de la tarea]
 * @return {[type]} [description]
 */
var fnVerHistorialDocumentosSp3 = function()
{
    //alert("istAud "+istAud)
    console.warn(tareaActiva, objetivoActiva, subObjetivoActiva, actividadActiva)
    // ocultar modal adjuntar Documentos
    $('#modalAdjuntarDocumentosTareasSp3').modal('hide').removeClass('fade');

    $("#listadoHistorialDocumentosRechadosSp3").html('')

    // buscamos el historial
    // if(subObjetivoActiva===null)
    // {
    //     alert('entre en 5120')
    //     paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Historial.forEach(function(Item)
    //     {
    //         fnPintarListadoHistorialDocumentosSp3(Item)
    //     })
    //     // Colocamos Titulo a la Modal
    //     $("#lbTitlemodalHistorialDocumentosRechazadosSp3").html(`Historial de Evidencia de: &nbsp; ${paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Actividad_Name}`)
    // }
    // else
    // {
        //paObj[istAud].a.Objetivos[objetivoActiva].SubObjetivos[subObjetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Historial.forEach(function(Item)
         paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Historial.forEach(function(Item)
        {
           //$('#modalHistorialDocumentosRechazadosSp3').modal('show').addClass('fade');
           
            var salid = fnPintarListadoHistorialDocumentosSp3(Item)
            //alert('entre en 5133::'+salid);
        })
        // Colocamos Titulo a la Modal
        //$("#lbTitlemodalHistorialDocumentosRechazadosSp3").html(`Historial de Evidencia de: &nbsp; ${paObj[istAud].a.Objetivos[objetivoActiva].SubObjetivos[subObjetivoActiva].Actividades[actividadActiva].Actividad_Name}`)
        


         $("#lbTitlemodalHistorialDocumentosRechazadosSp3").html(`Historial de Evidencia de: &nbsp; ${paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Actividad_Name}`)
        //alert('entre en 5137')
    // }


    // mostrar modal historial de documentos
    $('#modalHistorialDocumentosRechazadosSp3').modal('show').addClass('fade');
}

















/**
 * [fnPintarListadoHistorialDocumentosSp3 aqui dibujamos el listado del historial de documentos rechazados]
 * @param  {[type]} Item [description]
 * @return {[type]}      [description]
 */
var fnPintarListadoHistorialDocumentosSp3 = function(Item)
{
   console.log("Historial - Item",Item)
   console.log('xxxxxxxxxx ::', paObj[istAud].a);

    if(Item.Fecha==null) Item.Fecha = ""
    if(Item.AdjuntoNameFinal==null) Item.AdjuntoNameFinal = ""

    $("#listadoHistorialDocumentosRechadosSp3").append(`
        <div class="row justify-content-around align-items-center text-center" style=" height: 57px !important; margin-top: 8px !important;">
            <div class="header-tabla px-2 py-3" style="width: 910px !important; border-radius: 4px !important; border: solid 1px #cbcbcb !important; background-color: #f2f2f2 !important; margin-top: 1px !important ">
                <table width="100%" border="0">
                    <tbody><tr>
                            <td width="5%">
                                <div>&nbsp;</div>
                            </td>
                        <td width="25%" align="center"><div id="archInicial" class="text-left lbCabezaTabla" style=" font-size: 14px !important ;  color: #000 !important;"> ${Item.AdjuntoNameInicial} </div></td>

                        <td width="25%" align="center"><div id="archFinal" class="text-left lbCabezaTabla" style=" font-size: 14px !important; color: #000 !important;"> ${Item.AdjuntoNameFinal} </div></td>

                        <td width="25%" align="center"><div id="motivoArch" class="text-left lbCabezaTabla" style=" font-size: 14px !important; color: #000 !important;"><a href="#" onmouseup="fnVerMotivoRechazoDocumentoSp3('${Item.AdjuntoNameInicial}','${Item.Motivo}')" style="color: black !important; text-decoration: underline !important;">Ver Motivo</a></div></td>

                        <td width="20%" align="center"><div id="fechaSubArch" class="text-left lbCabezaTabla pl-3" style=" font-size: 14px !important; color: #000 !important;"> ${Item.Fecha} </div></td>
                    </tr>
                </tbody></table>
            </div>
        </div>
    `)
return 200;
}

/**
 * [fnVerMotivoRechazoDocumentoSp3 Ver motivo del rechazo del documento]
 * @param  {[type]} motivo [motivo porque se rechazo el documento]
 * @return {[type]}        [description]
 */
var fnVerMotivoRechazoDocumentoSp3 = function(titulo, motivo)
{

    // Ocultamos Modal
    $('#modalHistorialDocumentosRechazadosSp3').modal('hide').removeClass('fade');

    // Colocamos titulo a la modal
    $("#lbTitleModalMotivoDocumentosRechazadosSp3").html(`Motivo de Observación - ${titulo}`)

    // Colocamos el motivo de rechazo
    
    if(motivo == null || motivo == "null")
    {
          $("#motivoVentanaObservacionSp3").html(" ")
    }
    else
    {
        $("#motivoVentanaObservacionSp3").html(`${motivo}`)
    }
    

    // Mostramos Modal
    $('#modalMotivoDocumentosRechazadosSp3').modal('show').addClass('fade');
}


/**
 * [FnAdjuntarDocumentosTareasSp3 ADJUNTAREMOS LAS EVIDENCIAS DE LA TAREA]
 * @param {[type]} numAdjunto [contador del adjunto]
 */
function FnAdjuntarDocumentosTareasSp3(numAdjunto)
{ //--------------------------ini--     sp3FnAdjuntarDocumentoInformeAuditoria    ------------------------


//  paObj[istAud].a.Objetivos[objetivoActiva].SubObjetivos[subObjetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Id,
//alert('quien me llama 54 = '+subObjetivoActiva);
    // BLOQUEMAOS EL BOTON ENVIAR
    $("#btnGuardarDocs").attr("disabled",true)
    $("#btnCancelarDoc").attr("disabled",true)
    $("#agregarEvidencia").attr("disabled",true)

        showLoading();

    let fileInput     = document.getElementById('adjuntarFile_'+numAdjunto);
    let filePath      = fileInput.value;
    let IdAdjunto     = document.getElementById('adjuntoId_'+numAdjunto).value;
    let AccionAdjunto = document.getElementById('accionAdjunto_'+numAdjunto).value;

    console.warn("fileInput",fileInput.files[0].size)
    // if (fileInput.files[0].size<=10240000)
    // {

        //let extAdj = sp3FnvalidaExtensionAdjunto(filePath);
        // alert('es un archivos '+extAdj);

        let esc= escape(filePath)
        let name = esc.split("%5C");
        //let filenamme = name[2];
        let filenamme = name[2].replace("%20", "")
        for (let i = 0; i < 15  ;i++) {
            filenamme = filenamme.replace("%20", "")
        }

        filenamme = filenamme.replace("%28", "(")
        filenamme = filenamme.replace("%29", ")")

        // imprimo el nombre
        $(`#nombreDocs_${numAdjunto}`).html(filenamme)
        //$(`#EstatoAdjunto_${numAdjunto}`).html("Pendiente")
        // $('#arc_t').html(name[2]);//para colocar el nombre el aboton pero no hace falta
        console.info("###################### ADJUNTAR COSAS #######################");
        console.info("vas adjuntar a :", name);
        console.info("filenamme :", filenamme);
        console.info("###################### ADJUNTAR COSAS #######################");

        //-------------------ajustamos los metodo para el envio del formulario ---------------------------------
        let adjunto = document.getElementById("adjuntarFile_"+numAdjunto).files[0];
        let base64Adjunto="";
       //console.log("###################### SU BASE 64 ES #######################");
        //console.log("FILEX :",  toBase64SP3(file_trainningSP3));

        toBase64SsomaSp3(adjunto).then(data =>
        {
            base64Adjunto =   getResultSsomaSp3(data);
           //console.log("FILE :", base64Adjunto);
            //sp3FnGuardarAdjunto(ilo-1,filenamme,extAdj,base64Adjunto,data);
            
            var TareaIdd;
            if((subObjetivoActiva == null)||(subObjetivoActiva == 'null'))
                {
                     TareaIdd = paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Id
                }
            else
                {
                    TareaIdd = paObj[istAud].a.Objetivos[objetivoActiva].SubObjetivos[subObjetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Id;
                }


            let body = {
                "IdPlan":       paObj[istAud].a.Id,
                "Id":           parseInt(IdAdjunto),
                "TareaId":      TareaIdd, //paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Id,
                "AdjuntoName":  filenamme,
                "Adjunto":      data,
                "Accion":       parseInt(AccionAdjunto),
                "Created_By":   getCookie("vtas_id_hash"+sessionStorage.tabVisitasa)
            }

            var httpmethod = "";
            if(flag_exec == false){
                httpmethod="AdjuntarEvidencia"
            }else{
                httpmethod="AdjuntarEvidenciaEXEC"

            }
            console.info("body",body)
            var url = apiUrlssoma+"/api/Post-Plan-Anual?code=ZnQh7E2Noeiv1emsJPTvXE5l/qClcMIjv3FNePN8XTRfTY5aOqmSAQ==&httpmethod="+httpmethod;

            console.info("ANDY 5270",url)

              var headers ={
                "apikey":constantes.apiKey
            }

            $.ajax({
                method: "POST",
                url:  url,
                data: JSON.stringify(body),
                headers:headers,
                crossDomain: true,
                dataType: "json",
            })
            .done(function(data)
            {
                hideLoading();

                console.info("data",data)
                 // resultado Exitoso
                if(data.Id>0)
                {//console.log(AccionAdjunto)
                    // pinto el estado
                    if(AccionAdjunto==1)
                    {
                        $(`#EstatoAdjunto_${numAdjunto}`).html("Pendiente")
                        $(`#EstatoAdjunto_${numAdjunto}`).css("color","#000000")
                    }
                    if(AccionAdjunto==2)
                    {
                        $(`#EstatoAdjunto_${numAdjunto}`).html("Atendido")
                        $(`#EstatoAdjunto_${numAdjunto}`).css("color","#05beee")
                    }
                    $(`#adjuntoId_${numAdjunto}`).val(data.Id)
                    $(`#accionAdjunto_${numAdjunto}`).val(2)
                    //$(`#adjuntarDocs_${numAdjunto}`).attr('disabled', true)
                    //$(`#adjuntarDocs_${numAdjunto}`).css("background-color","#b2b2b2")
                    if(flag_exec == true){
                        $("#fechaEjec_"+tareaActiva).html(moment().format("DD/MM/YYYY"))
                        $("#estado1PlanAnual_"+tareaActiva).html("Atendido")
                        $("#estado1PlanAnual_"+tareaActiva).css("color","#05beee")
                        paObj[istAud].a=data;
                    }
                
                }else
                {
                    verModalError("Lo Sentimos","No se Pudo Adjuntar el Documento.")
                }
            })
            .fail(function( jqXHR, textStatus, errorThrown ) {
                console.error("fail ",textStatus,errorThrown)
            })
            .always(function( jqXHR, textStatus, errorThrown ) {
                // DESBLOQUEMAOS EL BOTON ENVIAR
                $("#btnGuardarDocs").attr("disabled",false)
                $("#btnCancelarDoc").attr("disabled",false)
                $("#agregarEvidencia").attr("disabled",false)
                hideLoading();
                console.info("alwais ",textStatus)
                //fnSp3CargaFiltroEstadoInicialPlanAnual()
                //fnCargarReportantes();
                //fnCargarGrid();
            });//*/
        });

    // }else{
    //     alert("El archivo es muy garnde")
    // }


}

/**
 * [fnDescargarEvidencia Descargaremos el archivo cargado como evidencia]
 * @return {[type]} [description]
 */
var fnDescargarEvidenciaSp3 = function(adjuntoId)
{
    // bloquear botones
    $("#btnGuardarDocs").attr("disabled",true)
    $("#btnCancelarDoc").attr("disabled",true)
    $("#agregarEvidencia").attr("disabled",true)
        showLoading();
    //alert("Descargaremos el adjuntoId "+adjuntoId)
    let body = {
        "AdjuntoId": adjuntoId
    }
    //console.info("body",body)
    var url = apiUrlssoma+"/api/Get-Plan-Anual?code=EUBbWsTT1KkzS56X/GBcUAOkoipdX2JpgKRagYT7YDaJ0mLS39daeA==&httpmethod=adjuntoEvidenciaPlan&AdjuntoId="+adjuntoId;

      var headers ={
        "apikey":constantes.apiKey
    }

    $.ajax({
        method: "POST",
        url:  url,
        data: JSON.stringify(body),
        headers:headers,
        crossDomain: true,
        dataType: "json",
    })
    .done(function(data)
    {

        // resultado Exitoso
        if(data.Id>0)
        {
            var x = data.Adjunto.split(',');
            $("#DescargarEvidenciasSp3").html('<a download="'+data.AdjuntoName+'" class="adjunto" href="'+x[0]+','+x[1]+'"><button class="btn btn-success btn-show-alert btn-descargar">Descargar</button></a>')
        }else
        {
            verModalError("Lo Sentimos","No se Pudo Descargar el documento.")
        }
    })
    .fail(function( jqXHR, textStatus, errorThrown )
    {
        console.error("fail",textStatus)
      //  alert("error")
    })
    .always(function( jqXHR, textStatus, errorThrown )
    {
        // Simular click para descargar el archivo
        $('.btn-descargar').trigger('click');
        // activar botones
        $("#btnGuardarDocs").attr("disabled",false)
        $("#btnCancelarDoc").attr("disabled",false)
        $("#agregarEvidencia").attr("disabled",false)
        hideLoading();

    });
}


var funCerrarModalListaCorreo= function()
{
    var ver = $('#CheckProveniente').val();
   //console.log(ver)
    if(ver == 1){
        $('#modalEnviarCorrecionPlanAnualSp3').modal('hide').removeClass('fade');
        $('#Sp3VentanaPlanAnualEditView').modal('show').addClass('fade');
    }else{
        $('#modalEnviarCorrecionPlanAnualSp3').modal('hide').removeClass('fade');
        $('#modalAdjuntarDocumentosTareasSp3').modal('show').addClass('fade');
    }

}



var fnEnviarEvidenciasSp3 = function (tipo)
{

    var flag_ValidoFinalizar = true;
    //console.info(paObj[istAud].a.Objetivos[objetivo].Actividades[actividad].Tareas[tarea])
    //console.info(paObj[istAud].a)
    // actualizamos el token
    vw_principal.init();
    console.log(tipo)
    if(tipo == 1 ){
       // paObj[istAud].a.Objetivos[0].Actividades[0].Tarea[0].Evidencia_Name
        if(paObj[istAud].a.Objetivos.length > 0){
            console.log('Objetivos '+tipo)
            for (let i = 0; i < paObj[istAud].a.Objetivos.length; i++) {
                if(paObj[istAud].a.Objetivos[i].Actividades.length > 0){
                    console.log('Actividades '+tipo)
                        for (let ew = 0; ew < paObj[istAud].a.Objetivos[i].Actividades.length; ew++) {
                            if(paObj[istAud].a.Objetivos[i].Actividades[ew].Tareas.length > 0){
                                console.log('Tarea '+tipo)
            
                                // ocultamos modal adjuntados
                    $('#Sp3VentanaPlanAnualEditView').modal('hide').removeClass('fade');
                    // colocamos titulo a la modal
                    $('#divTituloHistorialAuditoria').html('Enviar Correos - '+paObj[istAud].a.Code);
                    $('#CheckProveniente').val(1)
        
        }else{
                            flag_ValidoFinalizar = false;
                            $("#Sp3VentanaPlanAnualEditView").modal("show").addClass("fade");
                        verModalError("Faltan Datos","No Puedes Finalizar el Plan Anual "+paObj[istAud].a.Code)

                        }                            
                        }

            }else{
                flag_ValidoFinalizar = false;
                $("#Sp3VentanaPlanAnualEditView").modal("show").addClass("fade");
                verModalError("Faltan Datos","No Puedes Finalizar el Plan Anual "+paObj[istAud].a.Code)

            }
            }




        }else{
            flag_ValidoFinalizar = false;
            $("#Sp3VentanaPlanAnualEditView").modal("show").addClass("fade");
            verModalError("Faltan Datos","No Puedes Finalizar el Plan Anual "+paObj[istAud].a.Code)

        }

    }else{
    // ocultamos modal adjuntados
    $('#modalAdjuntarDocumentosTareasSp3').modal('hide').removeClass('fade');

    // colocamos titulo a la modal
    $('#divTituloHistorialAuditoria').html('Enviar Correci&oacute;n - PLAN ANUAL - '+paObj[istAud].a.Code);
    $('#CheckProveniente').val(2)

    }

    // limpiamos listado
    $('#listadoPersonasEnviarCorrecionPlanAnualSp3').html('');
    $('#rowCountPA').html('00');

    if(flag_exec == false){
        if(flag_Supervisor==true){
            confirmSupervisionPa()
        }else{
            if(  flag_ValidoFinalizar == true  ){
                $('#modalEnviarCorrecionPlanAnualSp3').modal('show').addClass('fade')

            }
        }


  // Mostamos modal enviar correccion
    }else{
        //alert('si es aqui 5165');
        //confirmEjecucipnPa();
    }
  

}

/**
 * [fnAgregarRowListaEnvioCorrecionPlanAnualSp3 Agregar filas al listado de personas a enviar correcion Plan Anual]
 * @return {[type]} [description]
 */

var fnAgregarRowListaEnvioCorrecionPlanAnualSp3 = function()
{
    // incrementar contador principal
    let rowCountPA = $('#CountPA').val()
    rowCountPA++
    $('#CountPA').val(rowCountPA)

    $("#listadoPersonasEnviarCorrecionPlanAnualSp3").append(`
        <div class='item-tabla p-2 px-2' style='font-size: 13px; background-color:white !important;border: solid 1px #cbcbcb !important;'>
            <div class='row m-0 justify-content-between align-items-center tbody_trainning'>

                <div class='col-3 text-left form-group'>
                    <label for="Name_${rowCountPA}">
                        <div class="spinner-border spinner-border-sm" role="status" id="spinnerLoadColaborador_${rowCountPA}" style="display:none;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </label>
                    <input type='text' value='' id='Name_${rowCountPA}' name='Name_${rowCountPA}' class='form-control form-control2 bg-white fechasA autocompletecollaborator'>
                    <div class='loader' id='spinnerLoadColaborador_${rowCountPA}' style='display:none'></div>
                    <input type='hidden' id='UserHash_${rowCountPA}' name='UserHash_${rowCountPA}'>
                </div>
                <div class='col-3 text-left form-group'>
                    <label for="Cargo_${rowCountPA}">
                        <div class="spinner-border spinner-border-sm" role="status" id="" style="display:none;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </label>
                    <input type='text' id='Cargo_${rowCountPA}' name='Cargo_${rowCountPA}' aria-describedby='sizing-addon2' class='form-control form-control2 fechasA bg-white' readonly>
                </div>
                <div class='col-4 text-left form-group'>
                    <label for="Correos_${rowCountPA}">
                        <div class="spinner-border spinner-border-sm" role="status" id="" style="display:none;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </label>
                    <input type='text' id='Correos_${rowCountPA}' name='Correos_${rowCountPA}' aria-describedby='sizing-addon2' class='form-control form-control2 fechasA bg-white'>
                </div>

                <div class='col-2 text-left form-group'>
                    <button type='button' id='Eliminar_${rowCountPA}' class='delete btn-circle btn-register border-0' style='background-color: #ff6767'> <img src='./images/iconos/Pathcan.svg' class='edit-1'></button>
                </div>

            </div>
        </div>
    `);

    // tercer parametro (opc) igual a 2 para indicar que es lista de envio ACR
    fnGetPersonCorrecionSp3($("#Name_"+rowCountPA),rowCountPA);

    // Pintar el total de personas a enviar
    let total = $('#listadoPersonasEnviarCorrecionPlanAnualSp3 .item-tabla').length

    total = ( total < 10 ) ? `0${total}` : total
    $('#rowCountPA').html(total);

    // eliminar row
    $('#listadoPersonasEnviarCorrecionPlanAnualSp3').on('click', '.delete', function()
    {
        $(this).parents('.item-tabla').remove();

        total--
        total = ( total < 10 ) ? "0"+total : total

        $('#rowCountPA').html(total)
    });

    console.warn(rowCountPA,total)
}


/**
 * [fnGetPersonCorrecionSp3 buscar persona a enviar correcciones]
 * @type {[type]}
 */
var fnGetPersonCorrecionSp3 = function(obj,i)
{
   //console.log("entro en fnGetPersonCorrecionSp3",obj,i)
    obj.autocomplete({
        change: function (event, ui)
        {
            //alert('entra');
            //alert('Hola');
            //console.log( $("#hid_collaborator_id_"+i).val())
            if (ui.item === null &&  $("#hid_Name_id_1"+i).length>20)
            {

                 $("#hid_collaborator_id_"+i).val("");
                 $(this).val("");
                 $("#add_covid_lastname_"+i).val("");
            }
            else if(ui.item)
            {

                $("#Name_"+i).val(ui.item.firstname).trigger("change");
                $("#add_covid_lastname_"+i).val(ui.item.lastname).trigger("change");
                // $("#add_covid_lastname_"+i).focus();
                // document.getElementById("add_covid_lastname_"+i).focus();
                //  document.getElementById("add_covid_lastname_"+i).focus();
            }

        },

        source: function( request, response )
        {
            var urlx = apiurlsecurity+"/api/Get-Collaborator?code="+GetCollaborator+"&httpmethod=objectlist";
            //console.log("tony",urlx);
            var filter = obj.val();
            ///console.log(filter);
            var param= {filter:filter};
            var headers = {"Authorization":TOKEN_CLIENT,"apiKey":"r$3#23516ewew5"}
            $("#add_firtnameload_1").show();
            $.ajax({
                url: apiurlsecurity+"/api/Get-Collaborator?code="+GetCollaborator+"&httpmethod=objectlist",
                //dataType: "json",
                method:"post",
                data : JSON.stringify(param),
                processData:false,
                crossDomain: true,
                async: true,
                headers : headers,
                success: function( data )
                {
                    $("#add_firtnameload_1").hide();
                    var array =[];
                    data =  JSON.parse(data);

                    data.value.forEach(item =>
                    {
                        var json ={}
                        json.label      = item.displayName;
                        json.value      = item.givenName;
                        json.id         = item.objectId;
                        json.cargo      = item.jobTitle;
                        json.firstname  = item.displayName;//item.givenName+' '+item.surname;
                        json.correo     = item.userPrincipalName;
                        array.push(json);
                    });

                    response(array);
                }
            });
        },
        minLength: 3,
        select: function( event, ui )
        {
            //alert(ui.item.id)//userHas

            setTimeout(function(){

                    $(`#Name_${i}`).val(toCapitalize(ui.item.firstname))
                    $(`#UserHash_${i}`).val(ui.item.id)
                    $(`#Correos_${i}`).val(ui.item.correo)
                    $(`#Cargo_${i}`).val(toCapitalize(ui.item.cargo))
                console.warn(ui.item)
                //$("#Cargo_"+i).val(ui.item.jobTitle);
                //$("#txt_correo_"+i).val(ui.item.userPrincipalName);
            },300);
        },
        open: function() {
            $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
        },
        close: function() {
            $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );

        },
        search: function () {
            $("#spinnerLoadColaborador").show();//showLoading();hideLoading();
            $("#spinnerLoadColaborador_"+i).show(); //para los planes de accion
        },
        response: function () {
            $("#spinnerLoadColaborador").hide();
            $("#spinnerLoadColaborador_"+i).hide(); //para los planes de accion
            // document.getElementById("add_covid_lastname_"+i).focus();
        }
    });
}

/**
 * [fnConfirmarEnviarCorrecionPlanAnualSp3 preguntar si va a enivar la corrección]
 * @return {[type]} [description]
 */
var fnConfirmarEnviarCorrecionPlanAnualSp3 = function()
{
    var CheckProveniente = $('#CheckProveniente').val();
    let resultado = false
    resultado = fnRecorrerListadoEnviarCorreccionPlanAnualSp3()

    if(resultado)
    {
        if(CheckProveniente == 1){
    $('#msj_confirm_fin_corrige_plan').html("Se finalizar&aacute; el Plan Anual y <br>enviar&aacute; correo a las personas <br>seleccionadas")

        }else{
            $('#msj_confirm_fin_corrige_plan').html("Se Guardar&aacute;n los Documentos <br>Cargados a esta Evidencia")
        }
        $('#modalEnviarCorrecionPlanAnualSp3').modal('hide').removeClass('fade')
        $('#modalConfirmarCorrecionPlanAnualSp3').modal('show').addClass('fade')
    }
    else
    {

        if(CheckProveniente == 1){
            verModalError("Faltan Datos","No Puedes Finalizar el Plan Anual "+paObj[istAud].a.Code)

        }else{
            verModalError("Faltan Datos","No Puedes Enviar La Corrección del Plan Anual "+paObj[istAud].a.Code)

        }
    }
    console.warn("resultado ",resultado, )
}

//---------------------------------- start  fnRecorrerListadoEnviarCorreccionPlanAnualSp3() -------------------------------------
var fnRecorrerListadoEnviarCorreccionPlanAnualSp3 = function ()
{
    // check para devolver el resultado
    let result = false
    // cantidad total de filas creadas
    let total = $('#CountPA').val()
    // contador de registros
    let personas = 0
    // contador de registros sin user hash
    let count = 0

    // recorremos el listado de personas
    for (var i = 1; i <= total ; i++)
    {
        // si el campo existe, es decir no fue eliminado
        if($(`#UserHash_${i}`).val()!=undefined)
        {
            personas++
            // si el campo no tiene un UserHash valido
            if($(`#UserHash_${i}`).val()<5 && $(`#Name_${i}`).val()<2) count++
        }
    }

    result = (count==0 && personas > 0) ? true : false

    return result
}
//---------------------------------- end  fnRecorrerListadoEnviarCorreccionPlanAnualSp3() -------------------------------------

var fnNotificarCorrecionPlanAnualSp3 = function()
{
    // OCULTAMOS LA MODAL
    $('#modalConfirmarCorrecionPlanAnualSp3').modal('hide').removeClass('fade')

        showLoading();

    let count                 = $('#listadoPersonasEnviarCorrecionPlanAnualSp3 .item-tabla').length
    let listadoDestinatarios  = []
   //console.log($('#listadoPersonasEnviarCorrecionPlanAnualSp3 .item-tabla').length)

    for (var i = 0; i <= count ; i++)
    {
        // si el campo existe, es decir no fue eliminado
        let obj = []
        if($(`#UserHash_${i}`).val()!=undefined)
        {
            listadoDestinatarios.push({
                "Name"     : $(`#Name_${i}`).val(),
                "UserHash" : $(`#UserHash_${i}`).val(),
                "Cargo"    : $(`#Cargo_${i}`).val(),
                "Correo"   : $(`#Correos_${i}`).val()
            })
        }
    }
    var ubicacion = "";
    var tipo = "";
    if(paObj[istAud].a.Sede != null)
    {
        ubicacion =  paObj[istAud].a.Sede;
        tipo ="Sede";
    }else{
        if(paObj[istAud].a.Gerencia != null)
        {
            ubicacion =  paObj[istAud].a.Gerencia;
            tipo ="Gerencia";

        }
    }

    console.log(paObj[istAud].a)

    let body = {
        "listadoDestinatarios": listadoDestinatarios,
        "Id":                   paObj[istAud].a.Id,
        "Code":                 paObj[istAud].a.Code,
        "ubicacion":            ubicacion,
        "tipo":                 tipo,
        "Created_By":           getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
        "emailResponsable":    getCookie("vtas_internal_useruser"+sessionStorage.tabVisitasa),
        "nameResponsable":    getCookie("vtas_fullname"+sessionStorage.tabVisitasa),
        "jobResponsable":    getCookie("vtas_job"+sessionStorage.tabVisitasa)

    }
    var CheckProveniente = $('#CheckProveniente').val();
    let url = '';
    if(CheckProveniente == 1){
        fnSp3PlanAnualUpdateFinalizar();

        url = apiUrlssoma+"/api/Post-Plan-Anual?code=ZnQh7E2Noeiv1emsJPTvXE5l/qClcMIjv3FNePN8XTRfTY5aOqmSAQ==&httpmethod=FinalizarPlanAnual";
    }else{
        url = apiUrlssoma+"/api/Post-Plan-Anual?code=ZnQh7E2Noeiv1emsJPTvXE5l/qClcMIjv3FNePN8XTRfTY5aOqmSAQ==&httpmethod=CorreccionPlanAnual";
    }

    let headers ={
        "apikey":constantes.apiKey
    }
    $.ajax({
        method: "POST",
        url:  url,
        data: JSON.stringify(body),
        headers:headers,
        crossDomain: true,
        dataType: "json",
    })
    .done(function(data)
    {
        console.info("data",data)
        // resultado Exitoso
        if(data.Id>0)
        {
            if(CheckProveniente == 1){
                $('#text_msj_confirm_exito').html('Se Finaliz&oacute; el Plan Anual con &Eacute;xito')
                $('#text_description_exito').html('Puedes revisar tu bandeja de entrada con los cambios')
                
            }else{
                $('#text_msj_confirm_exito').html('Se Culmino la Correcci&oacute;n del Plan Anual con &Eacute;xito')
                $('#text_description_exito').html('Puedes Regresar A Tu Bandeja de Entrada')

            }
            $('#modalExitoCorreccionPlanAnualSp3').modal('show').addClass('fade')
          //  fnSp3CargaFiltroEstadoInicialPlanAnual()
            _init_fnSp3PlanAnualEstadoInicial()
        }else
        {

            if(CheckProveniente == 1){
                $("#Sp3VentanaPlanAnualEditView").modal("show").addClass("fade");

                verModalError("Lo Sentimos","No Se Pudo Finalizar el Plan Anual")
            }else{
                verModalError("Lo Sentimos","No Se Pudo Realizar La Correccion.")
             }
        }
    })
    .fail(function( jqXHR, textStatus, errorThrown )
    {
        console.error("fail",textStatus)
        if(CheckProveniente == 1){
            $("#Sp3VentanaPlanAnualEditView").modal("show").addClass("fade");
            verModalError("Lo Sentimos","No Se Pudo Finalizar el Plan Anual")
        }else{
            verModalError("Lo Sentimos","No Se Pudo Realizar La Correccion.")
         }    })
    .always(function( jqXHR, textStatus, errorThrown )
    {
        console.info("always",textStatus)
        hideLoading();

    });//*/

}




/**
 * [convertir archivo a base64]
 * @param  {[type]} file [description]
 * @return {[type]}      [description]
 */
var getResultSsomaSp3 = function(data) { var result= data.split(','); return result[1]; }
const toBase64SsomaSp3 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});










TOTAL_PESO = 0;
TOTAL_REPORTE_PROYECTO = 0;
TOTAL_AVANCE1 = 0;
TOTAL_AVANCE2 = 0;

function fnExcelReportPA()
{

TOTAL_PESO = 0;
TOTAL_REPORTE_PROYECTO = 0;
TOTAL_AVANCE1 = 0;
TOTAL_AVANCE2 = 0;

    tr_e=0;
    // var tab_text="<table border='2px'><tr bgcolor='#87AFC6'>";
    // var textRange; var j=0;
    // tab = document.getElementById('ver_PA_xls'); // id of table

    // for(j = 0 ; j < tab.rows.length ; j++) 
    // {     
    //     tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
    //     //tab_text=tab_text+"</tr>";
    // }

    // tab_text=tab_text+"</table>";
    // tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
    // tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
    // tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

    console.log("......@andy...............................................................................................................");
    console.log(paObj[istAud].a)
    console.log("......@andy...............................................................................................................");
    
    var anio= paObj[istAud].a.Year_Plan.toString();
console.log(paObj[istAud].a, anio.substr(2,2))
let fechaActual = new Date()
let bgEvidencia  = []

//let mes         = fechaActual.getMonth()
let mes         = $('#selectMesPlanAnual').val();
console.log(mes)


    var tab_text= `<table  cellpadding="0" cellspacing="0" id="sheet0" style="table-layout: fixed;">
    <colgroup>
    <col width="1500" style="vertical-align:middle;" />
    <col style="width:200px;" />
    <col style="width:20px;" />
    <col style="width:20px;" />
    <col style="width:20px;" />
    <col style="width:20px;" />
    <col style="width:20px;" />
    <col style="width:20px;" />
    <col style="width:20px;" />
    <col style="width:20px;" />
    <col style="width:20px;" />
    <col style="width:20px;" />
    <col style="width:20px;" />
    <col style="width:20px;" />
    <col style="width:20px;" />
    <col style="width:20px;" />
    <col style="width:20px;" />
    <col style="width:20px;" />
    <col style="width:20px;" />
    <col style="width:20px;" />
    <col style="width:20px;" />
    <col style="width:20px;" />
    <col style="width:20px;" />
</colgroup>
    <thead>
    <tr style="font-weight: bold;">
      <th style="border: 1px solid #000;">PESO ACTIVIDAD</th>
      <th style="border: 1px solid #000;" colspan="2">ACTIVIDAD / ENTREGABLE</th> 
      <th style="border: 1px solid #000;" >MES</th>
      <th style="border: 1px solid #000;" colspan="4" >ENE. - ${anio.substr(2,2).toString()}</th>
      <th style="border: 1px solid #000;" colspan="4" >FEB. - ${anio.substr(2,2).toString()}</th>
      <th style="border: 1px solid #000;" colspan="4" >MAR. - ${anio.substr(2,2).toString()}</th>
      <th style="border: 1px solid #000;" colspan="4" >ABR. - ${anio.substr(2,2).toString()}</th>
      <th style="border: 1px solid #000;" colspan="4" >MAY. - ${anio.substr(2,2).toString()}</th>
      <th style="border: 1px solid #000;" colspan="4" >JUN. - ${anio.substr(2,2).toString()}</th>
      <th style="border: 1px solid #000;" colspan="4" >JUL. - ${anio.substr(2,2).toString()}</th>
      <th style="border: 1px solid #000;" colspan="4" >AGO. - ${anio.substr(2,2).toString()}</th>
      <th style="border: 1px solid #000;" colspan="4" >SET. - ${anio.substr(2,2).toString()}</th>
      <th style="border: 1px solid #000;" colspan="4" >OCT. - ${anio.substr(2,2).toString()}</th>
      <th style="border: 1px solid #000;" colspan="4" >NOV. - ${anio.substr(2,2).toString()}</th>
      <th style="border: 1px solid #000;" colspan="4" >DIC. - ${anio.substr(2,2).toString()}</th>
      <th style="border: 1px solid #000;" >RESPONSABLE</th>
      <th style="border: 1px solid #000;" >AVANCE DE LA ETAPA</th>
      <th style="border: 1px solid #000;" >AVANCE DEL PROYECTO</th>
      <th style="border: 1px solid #000;" >CUMPLIMIENTO</th>
      <th style="border: 1px solid #000;" >CUMPLIMIENTO DEL PROYECTO</th>
      <th style="border: 1px solid #000;" >PPTO.<br />US $</th>
      <th ></th>
      <th ></th>
    </tr>
    <tr style="border: 0px !important;color: #fff;font-weight: bold;">
      <th bgcolor='#223962' style="border: 0px !important;"></th>
      <th bgcolor='#223962' style="border: 0px !important;"></th>
      
      <th bgcolor='#223962' style="border: 0px !important;"></th>
      <th bgcolor='#223962' style="border: 0px !important;"></th>
     <th bgcolor='#223962' style="border: 0px !important;"></th>
     <th bgcolor='#223962' style="border: 0px !important;"></th>
     <th bgcolor='#223962' style="border: 0px !important;"></th>
     <th bgcolor='#223962' style="border: 0px !important;"></th>
     <th bgcolor='#223962' style="border: 0px !important;"></th>
     <th bgcolor='#223962' style="border: 0px !important;"></th>
     <th bgcolor='#223962' style="border: 0px !important;"></th>
     <th bgcolor='#223962' style="border: 0px !important;"></th>
     <th bgcolor='#223962' style="border: 0px !important;"></th>
     <th bgcolor='#223962' colspan="45" style="border: 0px !important;">Programa Anual SSOMA</th>
    
    </tr>
    </thead>
    <tbody>`;
var countObj = 1;
    paObj[istAud].a.Objetivos.forEach(function(Item)
    {
        //#F2F2F2/#70AD4
        var rowObj='';
         rowObj=`<tr style="color: #000; font-weight: bold;">
         
         <td bgcolor='#cccccc' colspan="58">Objetivo ${countObj}: ${Item.Objetivo_Name}</td>

       </tr>`

       Item.Actividades.forEach(function(Act) {
           var rowsAct = '';
           rowsAct =`<tr style="color: #000;">
           <td style="border: 1px solid #000;"> ${Act.Peso} %</td>
           <td colspan="2" style="border: 1px solid #000;"> ${Act.Actividad_Name}</td>
           <td style="border: 1px solid #000;">
           <table>
           <tr><td>P</td></tr>
           <tr><td>R</td></tr>
           </table>
           </td>`;

           TOTAL_PESO = TOTAL_PESO+Act.Peso;
           var numMesEx=0;
           countTotalTareasProgramadas     = 0
           countTotalTareasProgramadasXMes = 0
           Act.Cronogramas.forEach(function(fre) {
            var rowsFre = '';
            var rowsFre1 = '';
            var rowsFre2 = '';
            var rowsFre3 = '';
            var rowsFre4 = '';


            countTotalTareasProgramadas = ( parseInt(Act.Cronogramas[numMesEx].S1) == 1) ? countTotalTareasProgramadas+1 :  countTotalTareasProgramadas
            countTotalTareasProgramadas = ( parseInt(Act.Cronogramas[numMesEx].S2) == 1) ? countTotalTareasProgramadas+1 :  countTotalTareasProgramadas
            countTotalTareasProgramadas = ( parseInt(Act.Cronogramas[numMesEx].S3) == 1) ? countTotalTareasProgramadas+1 :  countTotalTareasProgramadas
            countTotalTareasProgramadas = ( parseInt(Act.Cronogramas[numMesEx].S4) == 1) ? countTotalTareasProgramadas+1 :  countTotalTareasProgramadas
            
                  //alert(numMesEx);
                    if(numMesEx <= mes )
                    {   
                        //alert("MES ADENTRO ="+numMesEx)
                        console.warn("i,mes",numMesEx,mes)
                        
                        if( parseInt(Act.Cronogramas[numMesEx].S1) == 1)
                        {
                            bgEvidencia.S1 = fnGetColorTareaSp3X(Act, Act.Cronogramas[numMesEx].S1, mes, countTotalTareasProgramadasXMes)
                            countTotalTareasProgramadasXMes++
                            console.log("ANDY COLOR=",bgEvidencia.S1)
                            switch (bgEvidencia.S1) {
                                case 'bgGreen':
                                     bgEvidencia.S1="bgcolor='#58c25d' style='color:#58c25d;'";

                                     //bgEvidencia.S1="bgcolor='#bf3088' style='color:#bf3088;'";//cambiado por andy aqui verde aprobado

                                    break;
                                    case 'bgRed':
                                        bgEvidencia.S1="bgcolor='#ff6767' style='color:#ff6767;'";
                                        break;
                                default:
                                //alert('here='+bgEvidencia.S1);
                                    //bgEvidencia.S1 = "bgcolor='#ffffff' style='color:#ffffff;'";

                                    
                            
                                    if(bgEvidencia.S1 == 'bgwhite')  {bgEvidencia.S1 = "bgcolor='#ffffff' style='color:#ffffff;'";}
                                    if(bgEvidencia.S1 == 'bgYellow') {bgEvidencia.S1 = "bgcolor='#ffc01d' style='color:#ffc01d;'";}
                                    if(bgEvidencia.S1 == 'bgBlue')   {bgEvidencia.S1 = "bgcolor='#05beee' style='color:#05beee;'";}


                                    break;
                            }
                        }
                        if( parseInt(Act.Cronogramas[numMesEx].S2) == 1)
                        {
                            bgEvidencia.S2 = fnGetColorTareaSp3X(Act, Act.Cronogramas[numMesEx].S2, mes, countTotalTareasProgramadasXMes)
                            countTotalTareasProgramadasXMes++
                            console.log(bgEvidencia.S2)
                            switch (bgEvidencia.S2) {
                                case 'bgGreen':
                                    bgEvidencia.S2="bgcolor='#58c25d' style='color:#58c25d;'";
                                    break;
                                    case 'bgRed':
                                        bgEvidencia.S2="bgcolor='#ff6767' style='color:#ff6767;'";
                                        break;
                                default:
                                    //bgEvidencia.S2 = "bgcolor='#ffffff' style='color:#ffffff;'";

                                    if(bgEvidencia.S2 == 'bgwhite')  {bgEvidencia.S2 = "bgcolor='#ffffff' style='color:#ffffff;'";}
                                    if(bgEvidencia.S2 == 'bgYellow') {bgEvidencia.S2 = "bgcolor='#ffc01d' style='color:#ffc01d;'";}
                                    if(bgEvidencia.S2 == 'bgBlue')   {bgEvidencia.S2 = "bgcolor='#05beee' style='color:#05beee;'";}

                                    break;
                            }
                        
                        }
                        if( parseInt(Act.Cronogramas[numMesEx].S3) == 1)
                        {
                            bgEvidencia.S3 = fnGetColorTareaSp3X(Act, Act.Cronogramas[numMesEx].S3, mes, countTotalTareasProgramadasXMes)
                            countTotalTareasProgramadasXMes++
                            console.log(bgEvidencia.S3)

                            switch (bgEvidencia.S3) {
                                case 'bgGreen':
                                    bgEvidencia.S3="bgcolor='#58c25d' style='color:#58c25d;'";
                                    break;
                                    case 'bgRed':
                                        bgEvidencia.S3="bgcolor='#ff6767' style='color:#ff6767;'";
                                        break;
                                default:
                                   // bgEvidencia.S3 = "bgcolor='#ffffff' style='color:#ffffff;'";
                                    if(bgEvidencia.S3 == 'bgwhite')  {bgEvidencia.S3 = "bgcolor='#ffffff' style='color:#ffffff;'";}
                                    if(bgEvidencia.S3 == 'bgYellow') {bgEvidencia.S3 = "bgcolor='#ffc01d' style='color:#ffc01d;'";}
                                    if(bgEvidencia.S3 == 'bgBlue')   {bgEvidencia.S3 = "bgcolor='#05beee' style='color:#05beee;'";}

                                    break;
                            }
                         }
                        if( parseInt(Act.Cronogramas[numMesEx].S4) == 1)
                        {
                            bgEvidencia.S4 = fnGetColorTareaSp3X(Act, Act.Cronogramas[numMesEx].S4, mes, countTotalTareasProgramadasXMes)
                            countTotalTareasProgramadasXMes++
                            console.log(bgEvidencia.S4)
                            switch (bgEvidencia.S4) {
                                case 'bgGreen':
                                    bgEvidencia.S4="bgcolor='#58c25d' style='color:#58c25d;'";
                                    break;
                                    case 'bgRed':
                                        bgEvidencia.S4="bgcolor='#ff6767' style='color:#ff6767;'";
                                        break;
                                default:
                                    //bgEvidencia.S4 = "bgcolor='#ffffff' style='color:#ffffff;'";

                                    if(bgEvidencia.S4 == 'bgwhite')  {bgEvidencia.S4 = "bgcolor='#ffffff' style='color:#ffffff;'";}
                                    if(bgEvidencia.S4 == 'bgYellow') {bgEvidencia.S4 = "bgcolor='#ffc01d' style='color:#ffc01d;'";}
                                    if(bgEvidencia.S4 == 'bgBlue')   {bgEvidencia.S4 = "bgcolor='#05beee' style='color:#05beee;'";}

                                    break;
                            }
                        }
                    }
                    else
                    {

                        //----------------------------------------------------- ANDY -------09-06-2021-----------------------------------------
                        if( parseInt(Act.Cronogramas[numMesEx].S1) == 1)
                        {
                            bgEvidencia.S1 = fnGetColorTareaSp3X(Act, Act.Cronogramas[numMesEx].S1, mes, countTotalTareasProgramadasXMes)
                            countTotalTareasProgramadasXMes++
                            if(bgEvidencia.S1 == 'bgGreen')  {bgEvidencia.S1 = "bgcolor='#58c25d' style='color:#58c25d;'";}
                            if(bgEvidencia.S1 == 'bgRed')    {bgEvidencia.S1 = "bgcolor='#ff6767' style='color:#ff6767;'";}
                            if(bgEvidencia.S1 == 'bgwhite')  {bgEvidencia.S1 = "bgcolor='#ffffff' style='color:#ffffff;'";}
                            if(bgEvidencia.S1 == 'bgYellow') {bgEvidencia.S1 = "bgcolor='#ffc01d' style='color:#ffc01d;'";}
                            if(bgEvidencia.S1 == 'bgBlue')   {bgEvidencia.S1 = "bgcolor='#05beee' style='color:#05beee;'";}
                        }

                         if( parseInt(Act.Cronogramas[numMesEx].S2) == 1)
                        {
                            bgEvidencia.S2 = fnGetColorTareaSp3X(Act, Act.Cronogramas[numMesEx].S2, mes, countTotalTareasProgramadasXMes)
                            countTotalTareasProgramadasXMes++
                            if(bgEvidencia.S2 == 'bgGreen')  {bgEvidencia.S2 = "bgcolor='#58c25d' style='color:#58c25d;'";}
                            if(bgEvidencia.S2 == 'bgRed')    {bgEvidencia.S2 = "bgcolor='#ff6767' style='color:#ff6767;'";}
                            if(bgEvidencia.S2 == 'bgwhite')  {bgEvidencia.S2 = "bgcolor='#ffffff' style='color:#ffffff;'";}
                            if(bgEvidencia.S2 == 'bgYellow') {bgEvidencia.S2 = "bgcolor='#ffc01d' style='color:#ffc01d;'";}
                            if(bgEvidencia.S2 == 'bgBlue')   {bgEvidencia.S2 = "bgcolor='#05beee' style='color:#05beee;'";}
                        }

                        if( parseInt(Act.Cronogramas[numMesEx].S3) == 1)
                        {
                            bgEvidencia.S3 = fnGetColorTareaSp3X(Act, Act.Cronogramas[numMesEx].S3, mes, countTotalTareasProgramadasXMes)
                            countTotalTareasProgramadasXMes++
                            if(bgEvidencia.S3 == 'bgGreen')  {bgEvidencia.S3 = "bgcolor='#58c25d' style='color:#58c25d;'";}
                            if(bgEvidencia.S3 == 'bgRed')    {bgEvidencia.S3 = "bgcolor='#ff6767' style='color:#ff6767;'";}
                            if(bgEvidencia.S3 == 'bgwhite')  {bgEvidencia.S3 = "bgcolor='#ffffff' style='color:#ffffff;'";}
                            if(bgEvidencia.S3 == 'bgYellow') {bgEvidencia.S3 = "bgcolor='#ffc01d' style='color:#ffc01d;'";}
                            if(bgEvidencia.S3 == 'bgBlue')   {bgEvidencia.S2 = "bgcolor='#05beee' style='color:#05beee;'";}
                        }

                        if( parseInt(Act.Cronogramas[numMesEx].S4) == 1)
                        {
                            bgEvidencia.S4 = fnGetColorTareaSp3X(Act, Act.Cronogramas[numMesEx].S4, mes, countTotalTareasProgramadasXMes)
                            countTotalTareasProgramadasXMes++
                            if(bgEvidencia.S4 == 'bgGreen')  {bgEvidencia.S4 = "bgcolor='#58c25d' style='color:#58c25d;'";}
                            if(bgEvidencia.S4 == 'bgRed')    {bgEvidencia.S4 = "bgcolor='#ff6767' style='color:#ff6767;'";}
                            if(bgEvidencia.S4 == 'bgwhite')  {bgEvidencia.S4 = "bgcolor='#ffffff' style='color:#ffffff;'";}
                            if(bgEvidencia.S4 == 'bgYellow') {bgEvidencia.S4 = "bgcolor='#ffc01d' style='color:#ffc01d;'";}
                            if(bgEvidencia.S4 == 'bgBlue')   {bgEvidencia.S4 = "bgcolor='#05beee' style='color:#05beee;'";}
                        }


                        //----------------------------------------------------- ANDY -------09-06-2021-----------------------------------------


                        // bgEvidencia.S1 = "bgcolor='#FFFFFF' style='color:#FFFFFF;'";//antes de andy 09-06-2021
                        // bgEvidencia.S2 = "bgcolor='#FFFFFF' style='color:#FFFFFF;'";
                        // bgEvidencia.S3 = "bgcolor='#FFFFFF' style='color:#FFFFFF;'";
                        // bgEvidencia.S4 = "bgcolor='#FFFFFF' style='color:#FFFFFF;'";




                    }




               if(fre.Fecha_S1_Ini != null){
                rowsFre1=` <td width="10px"  style="border: 1px solid #000;">
                <table>
                <tr bgcolor='#223962'><td>__</td></tr>
                <tr ${bgEvidencia.S1}><td>__</td></tr>
                </table>
                </td>` 
               }else{
                rowsFre1=` <td width="10px"  style="border: 1px solid #000;">
               <table>
               <tr><td style="color:#ffffff;">__</td></tr>
               <tr><td style="color:#ffffff;">__</td></tr>
               </table>
               </td>`   
               }
               rowsFre=rowsFre+rowsFre1;
               if(fre.Fecha_S2_Ini != null){
                rowsFre2=` <td width="10px" style="border: 1px solid #000;">
                <table>
                <tr bgcolor='#223962'><td>__</td></tr>
                <tr ${bgEvidencia.S2}><td>__</td></tr>
                </table>
                </td>` 
               }else{
                rowsFre2=` <td width="10px" style="border: 1px solid #000;">
               <table>
               <tr><td style="color:#ffffff;">__</td></tr>
               <tr><td style="color:#ffffff;">__</td></tr>
               </table>
               </td>`   
               }
               rowsFre=rowsFre+rowsFre2;

               if(fre.Fecha_S3_Ini != null){
                rowsFre3=` <td width="10px"  style="border: 1px solid #000;">
                <table>
                <tr bgcolor='#223962'><td>__</td></tr>
                <tr ${bgEvidencia.S3}><td>__</td></tr>
                </table>
                </td>` 
               }else{
                rowsFre3=` <td width="10px"  style="border: 1px solid #000;">
               <table>
               <tr><td style="color:#ffffff;">__</td></tr>
               <tr><td style="color:#ffffff;">__</td></tr>
               </table>
               </td>`   
               }
               rowsFre=rowsFre+rowsFre3;

               if(fre.Fecha_S4_Ini != null){
                rowsFre4=` <td  width="10px"  style="border: 1px solid #000;">
                <table>
                <tr bgcolor='#223962'><td>__</td></tr>
                <tr ${bgEvidencia.S4} ><td>__</td></tr>
                </table>
                </td>` 
               }else{
                rowsFre4=` <td width="10px" style="border: 1px solid #000;">
               <table>
               <tr><td style="color:#ffffff;">__</td></tr>
               <tr><td style="color:#ffffff;">__</td></tr>
               </table>
               </td>`   
               }
               rowsFre=rowsFre+rowsFre4;




               rowsAct=rowsAct+rowsFre; 


               numMesEx++;
           })

    rowsAct=rowsAct+fnSp3PintarComplementosExcel( Act.ResponsableName,$(`#countTotalTareasProgramadas_${tr_e}`).val(), $(`#countTotalTareasProgramadasXMes_${tr_e}`).val(),$(`#countTotalTareasEjecutadas_${tr_e}`).val())
        console.log(tr_e)

        tr_e++

           rowsAct=rowsAct+ `</tr>`;

         rowObj=rowObj+rowsAct;     
       })








 // rowsAct =`<tr style="color: #000;">
 //           <td style="border: 1px solid #000;"> ${Act.Peso} %</td>
 //           <td colspan="2" style="border: 1px solid #000;"> ${Act.Actividad_Name}</td>
 //           <td style="border: 1px solid #000;">
 //           <table>
 //           <tr><td>P</td></tr>
 //           <tr><td>R</td></tr>
 //           </table>
 //           </td>`;




tr_e = 0;

       var countSubObj = 1;
       Item.SubObjetivos.forEach(function(ItemS)
    {
        var rowSObj='';
        rowSObj=`<tr style="color: #000; font-weight: italic;">
         <td bgcolor='#cccccc' colspan="58">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    Sub Objetivo ${countObj}.${countSubObj}: ${ItemS.SubObjetivo_Name}</td>

       </tr>`

       ItemS.Actividades.forEach(function(ActS) {
           var rowsActS = '';
           rowsActS =`<tr style="color: #000;">
           <td style="border: 1px solid #000;"> ${ActS.Peso} %</td>
           <td colspan="2" style="border: 1px solid #000;"> ${ActS.Actividad_Name}</td>
           <td style="border: 1px solid #000;">
           <table>
           <tr><td>P</td></tr>
           <tr><td>R</td></tr>
           </table>
           </td>`;
            TOTAL_PESO = TOTAL_PESO+ActS.Peso;
            
                var numMesExS=0;
                countTotalTareasProgramadasS     = 0
                countTotalTareasProgramadasSXMes = 0
                ActS.Cronogramas.forEach(function(fre) {//-----------------ARRANCAMOS CRONOGRAMA
                var rowsFre = '';
                var rowsFre1 = '';
                var rowsFre2 = '';
                var rowsFre3 = '';
                var rowsFre4 = '';

                    countTotalTareasProgramadasS = ( parseInt(ActS.Cronogramas[numMesExS].S1) == 1) ? countTotalTareasProgramadasS+1 :  countTotalTareasProgramadasS
                    countTotalTareasProgramadasS = ( parseInt(ActS.Cronogramas[numMesExS].S2) == 1) ? countTotalTareasProgramadasS+1 :  countTotalTareasProgramadasS
                    countTotalTareasProgramadasS = ( parseInt(ActS.Cronogramas[numMesExS].S3) == 1) ? countTotalTareasProgramadasS+1 :  countTotalTareasProgramadasS
                    countTotalTareasProgramadasS = ( parseInt(ActS.Cronogramas[numMesExS].S4) == 1) ? countTotalTareasProgramadasS+1 :  countTotalTareasProgramadasS
                    
                          //alert(numMesExS);
                            if(numMesExS <= mes )
                            {   
                                //alert("MES ADENTRO ="+numMesExS)
                                console.warn("i,mes",numMesExS,mes)
                                
                                if( parseInt(ActS.Cronogramas[numMesExS].S1) == 1)
                                     {
                                         bgEvidencia.S1 = fnGetColorTareaSp3X(ActS, ActS.Cronogramas[numMesExS].S1, mes, countTotalTareasProgramadasSXMes)
                                         countTotalTareasProgramadasSXMes++
                                         console.log("ANDY COLOR=",bgEvidencia.S1)
                                         switch (bgEvidencia.S1) 
                                          {
                                             case 'bgGreen':
                                                  bgEvidencia.S1="bgcolor='#58c25d' style='color:#58c25d;'";

                                                  //bgEvidencia.S1="bgcolor='#bf3088' style='color:#bf3088;'";//cambiado por andy aqui verde aprobado

                                                 break;
                                                 case 'bgRed':
                                                     bgEvidencia.S1="bgcolor='#ff6767' style='color:#ff6767;'";
                                                     break;
                                                 default:
                                                 //alert('here='+bgEvidencia.S1);
                                                 //bgEvidencia.S1 = "bgcolor='#ffffff' style='color:#ffffff;'";

                                                 
                                         
                                                 if(bgEvidencia.S1 == 'bgwhite')  {bgEvidencia.S1 = "bgcolor='#ffffff' style='color:#ffffff;'";}
                                                 if(bgEvidencia.S1 == 'bgYellow') {bgEvidencia.S1 = "bgcolor='#ffc01d' style='color:#ffc01d;'";}
                                                 if(bgEvidencia.S1 == 'bgBlue')   {bgEvidencia.S1 = "bgcolor='#05beee' style='color:#05beee;'";}


                                                 break;
                                           }
                                     }
                                if( parseInt(ActS.Cronogramas[numMesExS].S2) == 1)
                                {
                                    bgEvidencia.S2 = fnGetColorTareaSp3X(ActS, ActS.Cronogramas[numMesExS].S2, mes, countTotalTareasProgramadasSXMes)
                                    countTotalTareasProgramadasSXMes++
                                    console.log(bgEvidencia.S2)
                                    switch (bgEvidencia.S2) {
                                        case 'bgGreen':
                                            bgEvidencia.S2="bgcolor='#58c25d' style='color:#58c25d;'";
                                            break;
                                            case 'bgRed':
                                                bgEvidencia.S2="bgcolor='#ff6767' style='color:#ff6767;'";
                                                break;
                                        default:
                                            //bgEvidencia.S2 = "bgcolor='#ffffff' style='color:#ffffff;'";

                                            if(bgEvidencia.S2 == 'bgwhite')  {bgEvidencia.S2 = "bgcolor='#ffffff' style='color:#ffffff;'";}
                                            if(bgEvidencia.S2 == 'bgYellow') {bgEvidencia.S2 = "bgcolor='#ffc01d' style='color:#ffc01d;'";}
                                            if(bgEvidencia.S2 == 'bgBlue')   {bgEvidencia.S2 = "bgcolor='#05beee' style='color:#05beee;'";}

                                            break;
                                    }
                                
                                }
                                if( parseInt(ActS.Cronogramas[numMesExS].S3) == 1)
                                {
                                    bgEvidencia.S3 = fnGetColorTareaSp3X(ActS, ActS.Cronogramas[numMesExS].S3, mes, countTotalTareasProgramadasSXMes)
                                    countTotalTareasProgramadasSXMes++
                                    console.log(bgEvidencia.S3)

                                    switch (bgEvidencia.S3) {
                                        case 'bgGreen':
                                            bgEvidencia.S3="bgcolor='#58c25d' style='color:#58c25d;'";
                                            break;
                                            case 'bgRed':
                                                bgEvidencia.S3="bgcolor='#ff6767' style='color:#ff6767;'";
                                                break;
                                        default:
                                           // bgEvidencia.S3 = "bgcolor='#ffffff' style='color:#ffffff;'";
                                            if(bgEvidencia.S3 == 'bgwhite')  {bgEvidencia.S3 = "bgcolor='#ffffff' style='color:#ffffff;'";}
                                            if(bgEvidencia.S3 == 'bgYellow') {bgEvidencia.S3 = "bgcolor='#ffc01d' style='color:#ffc01d;'";}
                                            if(bgEvidencia.S3 == 'bgBlue')   {bgEvidencia.S3 = "bgcolor='#05beee' style='color:#05beee;'";}

                                            break;
                                    }
                                 }
                                if( parseInt(ActS.Cronogramas[numMesExS].S4) == 1)
                                {
                                    bgEvidencia.S4 = fnGetColorTareaSp3X(ActS, ActS.Cronogramas[numMesExS].S4, mes, countTotalTareasProgramadasSXMes)
                                    countTotalTareasProgramadasSXMes++
                                    console.log(bgEvidencia.S4)
                                    switch (bgEvidencia.S4) {
                                        case 'bgGreen':
                                            bgEvidencia.S4="bgcolor='#58c25d' style='color:#58c25d;'";
                                            break;
                                            case 'bgRed':
                                                bgEvidencia.S4="bgcolor='#ff6767' style='color:#ff6767;'";
                                                break;
                                        default:
                                            //bgEvidencia.S4 = "bgcolor='#ffffff' style='color:#ffffff;'";

                                            if(bgEvidencia.S4 == 'bgwhite')  {bgEvidencia.S4 = "bgcolor='#ffffff' style='color:#ffffff;'";}
                                            if(bgEvidencia.S4 == 'bgYellow') {bgEvidencia.S4 = "bgcolor='#ffc01d' style='color:#ffc01d;'";}
                                            if(bgEvidencia.S4 == 'bgBlue')   {bgEvidencia.S4 = "bgcolor='#05beee' style='color:#05beee;'";}

                                            break;
                                    }
                                }
                            }
                            else
                            {

                                //----------------------------------------------------- ANDY -------09-06-2021-----------------------------------------
                                if( parseInt(ActS.Cronogramas[numMesExS].S1) == 1)
                                {
                                    bgEvidencia.S1 = fnGetColorTareaSp3X(ActS, ActS.Cronogramas[numMesExS].S1, mes, countTotalTareasProgramadasSXMes)
                                    countTotalTareasProgramadasSXMes++
                                    if(bgEvidencia.S1 == 'bgGreen')  {bgEvidencia.S1 = "bgcolor='#58c25d' style='color:#58c25d;'";}
                                    if(bgEvidencia.S1 == 'bgRed')    {bgEvidencia.S1 = "bgcolor='#ff6767' style='color:#ff6767;'";}
                                    if(bgEvidencia.S1 == 'bgwhite')  {bgEvidencia.S1 = "bgcolor='#ffffff' style='color:#ffffff;'";}
                                    if(bgEvidencia.S1 == 'bgYellow') {bgEvidencia.S1 = "bgcolor='#ffc01d' style='color:#ffc01d;'";}
                                    if(bgEvidencia.S1 == 'bgBlue')   {bgEvidencia.S1 = "bgcolor='#05beee' style='color:#05beee;'";}
                                }

                                 if( parseInt(ActS.Cronogramas[numMesExS].S2) == 1)
                                {
                                    bgEvidencia.S2 = fnGetColorTareaSp3X(ActS, ActS.Cronogramas[numMesExS].S2, mes, countTotalTareasProgramadasSXMes)
                                    countTotalTareasProgramadasSXMes++
                                    if(bgEvidencia.S2 == 'bgGreen')  {bgEvidencia.S2 = "bgcolor='#58c25d' style='color:#58c25d;'";}
                                    if(bgEvidencia.S2 == 'bgRed')    {bgEvidencia.S2 = "bgcolor='#ff6767' style='color:#ff6767;'";}
                                    if(bgEvidencia.S2 == 'bgwhite')  {bgEvidencia.S2 = "bgcolor='#ffffff' style='color:#ffffff;'";}
                                    if(bgEvidencia.S2 == 'bgYellow') {bgEvidencia.S2 = "bgcolor='#ffc01d' style='color:#ffc01d;'";}
                                    if(bgEvidencia.S2 == 'bgBlue')   {bgEvidencia.S2 = "bgcolor='#05beee' style='color:#05beee;'";}
                                }

                                if( parseInt(ActS.Cronogramas[numMesExS].S3) == 1)
                                {
                                    bgEvidencia.S3 = fnGetColorTareaSp3X(ActS, ActS.Cronogramas[numMesExS].S3, mes, countTotalTareasProgramadasSXMes)
                                    countTotalTareasProgramadasSXMes++
                                    if(bgEvidencia.S3 == 'bgGreen')  {bgEvidencia.S3 = "bgcolor='#58c25d' style='color:#58c25d;'";}
                                    if(bgEvidencia.S3 == 'bgRed')    {bgEvidencia.S3 = "bgcolor='#ff6767' style='color:#ff6767;'";}
                                    if(bgEvidencia.S3 == 'bgwhite')  {bgEvidencia.S3 = "bgcolor='#ffffff' style='color:#ffffff;'";}
                                    if(bgEvidencia.S3 == 'bgYellow') {bgEvidencia.S3 = "bgcolor='#ffc01d' style='color:#ffc01d;'";}
                                    if(bgEvidencia.S3 == 'bgBlue')   {bgEvidencia.S2 = "bgcolor='#05beee' style='color:#05beee;'";}
                                }

                                if( parseInt(ActS.Cronogramas[numMesExS].S4) == 1)
                                {
                                    bgEvidencia.S4 = fnGetColorTareaSp3X(ActS, ActS.Cronogramas[numMesExS].S4, mes, countTotalTareasProgramadasSXMes)
                                    countTotalTareasProgramadasSXMes++
                                    if(bgEvidencia.S4 == 'bgGreen')  {bgEvidencia.S4 = "bgcolor='#58c25d' style='color:#58c25d;'";}
                                    if(bgEvidencia.S4 == 'bgRed')    {bgEvidencia.S4 = "bgcolor='#ff6767' style='color:#ff6767;'";}
                                    if(bgEvidencia.S4 == 'bgwhite')  {bgEvidencia.S4 = "bgcolor='#ffffff' style='color:#ffffff;'";}
                                    if(bgEvidencia.S4 == 'bgYellow') {bgEvidencia.S4 = "bgcolor='#ffc01d' style='color:#ffc01d;'";}
                                    if(bgEvidencia.S4 == 'bgBlue')   {bgEvidencia.S4 = "bgcolor='#05beee' style='color:#05beee;'";}
                                }


                                //----------------------------------------------------- ANDY -------09-06-2021-----------------------------------------


                                // bgEvidencia.S1 = "bgcolor='#FFFFFF' style='color:#FFFFFF;'";//antes de andy 09-06-2021
                                // bgEvidencia.S2 = "bgcolor='#FFFFFF' style='color:#FFFFFF;'";
                                // bgEvidencia.S3 = "bgcolor='#FFFFFF' style='color:#FFFFFF;'";
                                // bgEvidencia.S4 = "bgcolor='#FFFFFF' style='color:#FFFFFF;'";




                    }




               if(fre.Fecha_S1_Ini != null){
                rowsFre1=` <td width="10px"  style="border: 1px solid #000;">
                <table>
                <tr bgcolor='#223962'><td>__</td></tr>
                <tr ${bgEvidencia.S1}><td>__</td></tr>
                </table>
                </td>` 
               }else{
                rowsFre1=` <td width="10px"  style="border: 1px solid #000;">
               <table>
               <tr><td style="color:#ffffff;">__</td></tr>
               <tr><td style="color:#ffffff;">__</td></tr>
               </table>
               </td>`   
               }
               rowsFre=rowsFre+rowsFre1;
               if(fre.Fecha_S2_Ini != null){
                rowsFre2=` <td width="10px" style="border: 1px solid #000;">
                <table>
                <tr bgcolor='#223962'><td>__</td></tr>
                <tr ${bgEvidencia.S2}><td>__</td></tr>
                </table>
                </td>` 
               }else{
                rowsFre2=` <td width="10px" style="border: 1px solid #000;">
               <table>
               <tr><td style="color:#ffffff;">__</td></tr>
               <tr><td style="color:#ffffff;">__</td></tr>
               </table>
               </td>`   
               }
               rowsFre=rowsFre+rowsFre2;

               if(fre.Fecha_S3_Ini != null){
                rowsFre3=` <td width="10px"  style="border: 1px solid #000;">
                <table>
                <tr bgcolor='#223962'><td>__</td></tr>
                <tr ${bgEvidencia.S3}><td>__</td></tr>
                </table>
                </td>` 
               }else{
                rowsFre3=` <td width="10px"  style="border: 1px solid #000;">
               <table>
               <tr><td style="color:#ffffff;">__</td></tr>
               <tr><td style="color:#ffffff;">__</td></tr>
               </table>
               </td>`   
               }
               rowsFre=rowsFre+rowsFre3;

               if(fre.Fecha_S4_Ini != null){
                rowsFre4=` <td  width="10px"  style="border: 1px solid #000;">
                <table>
                <tr bgcolor='#223962'><td>__</td></tr>
                <tr ${bgEvidencia.S4} ><td>__</td></tr>
                </table>
                </td>` 
               }else{
                rowsFre4=` <td width="10px" style="border: 1px solid #000;">
               <table>
               <tr><td style="color:#ffffff;">__</td></tr>
               <tr><td style="color:#ffffff;">__</td></tr>
               </table>
               </td>`   
               }
               rowsFre=rowsFre+rowsFre4;




               rowsActS=rowsActS+rowsFre; 


               numMesExS++;


                })//----------------------------------------------------------CERRAMOS CRONOGRAMA

          
              rowsActS=rowsActS+fnSp3PintarComplementosExcel( ActS.ResponsableName,countTotalTareasProgramadasS,countTotalTareasProgramadasSXMes,$(`#countTotalTareasEjecutadas_${tr_e}`).val())
             console.log(tr_e)

             tr_e++

           rowsActS=rowsActS+ `</tr>`;

        rowSObj=rowSObj+rowsActS;    

           
           
         //   rowsActS=rowsActS+ `</tr>`;
         // rowSObj=rowSObj+rowsActS;     
       })
       

       countSubObj++;
       rowObj=rowObj+rowSObj;
    })
     

    
       countObj++;
        tab_text=tab_text+rowObj;
    })

 //--------------------------------------------------------------AQUI VAMOS A GREGAR LAS FILAS DE LOS TOTALES ---------------------------------------------------
         var rowsActx= ` 
         <tr style="font-weight: bold; color:#fff; height:40px; "  bgcolor='#58C25D '>
              <td style=border:1px solid #000;">${TOTAL_PESO}% &nbsp;</th>
              <td style=border: 1px solid #000;" colspan="51">&nbsp;</td>
           
              <td style=border: 1px solid #000;" >&nbsp;</td>
              <td style=border: 1px solid #000;" >&nbsp;</td>
              <td style=border: 1px solid #000;" >${TOTAL_AVANCE1}% &nbsp;&nbsp; ${TOTAL_AVANCE2}%</td>
              <td style=border: 1px solid #000;" >&nbsp;</td>
              <td style=border: 1px solid #000;" >${TOTAL_REPORTE_PROYECTO} %</td>
              <td style=border: 1px solid #000;" >&nbsp;</td>
              
        </tr>`;
        
          
        tab_text=tab_text+rowsActx;

     //--------------------------------------------------------------AQUI VAMOS A GREGAR LAS FILAS DE LOS TOTALES ---------------------------------------------------

   // console.log(tab_text)


    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE "); 

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
    {
        txtArea1.document.open("txt/html","replace");
        txtArea1.document.write(tab_text);
        txtArea1.document.close();
        txtArea1.focus(); 
        sa=txtArea1.document.execCommand("SaveAs",true,"Say Thanks to Sumit.xls");
    }  
    else                 //other browser not tested on IE 11
    //     sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));  

    // return (sa);

        var link = document.getElementById('link');
    
        //alert(link);

        link.href='data:application/vnd.ms-excel;base64,' + window.btoa(tab_text);
        link.download='Plan Anual - '+paObj[istAud].a.Code;
        link.click();
}



















    var guardarSolicitudEvaluacionVencPA = function() {
        $('#modalConfirmarSolicitudEjecucionVencidaPlanAnualSp3').modal('hide').removeClass('fade');

        console.log(paObj[istAud].a)
        let listadoEvidencias  = [];
        var ubicacion = "";
        var tipo = "";
        if(paObj[istAud].a.Sede != null)
        {
            ubicacion =  paObj[istAud].a.Sede;
            tipo ="Sede";
        }else{
            if(paObj[istAud].a.Gerencia != null)
            {
                ubicacion =  paObj[istAud].a.Gerencia;
                tipo ="Gerencia";
    
            }
        }
        let body = {};
        if(subObjetivoActiva===null)
        {
            paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas.forEach(function(Item){
                listadoEvidencias.push({
                    'Name': Item.Evidencia_Name,
                    'Estado': Item.Estado
                })
            })
            body = {
                        "Evidencias": listadoEvidencias,
                        "IdActividad":          paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].ActividadId,
                        "IdTarea":                 paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Id,
                        "Ubicacion":            ubicacion,
                        "CodePlan":            paObj[istAud].a.Code,
                        "Tipo":                 tipo,
                        "NameActividad":                 paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Evidencia_Name,
                        "EstadoActividad":          paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Estado,
                        "EmailNotificado":            paObj[istAud].a.Email_Supervisor,
                        "Created_By":           getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
                        "emailResponsable":    getCookie("vtas_internal_useruser"+sessionStorage.tabVisitasa),
                        "nameResponsable":    getCookie("vtas_fullname"+sessionStorage.tabVisitasa),
                        "jobResponsable":    getCookie("vtas_job"+sessionStorage.tabVisitasa)
                
                    }       
                 }else{
        
            paObj[istAud].a.Objetivos[objetivoActiva].SubObjetivos[subObjetivoActiva].Actividades[actividadActiva].Tareas.forEach(function(Item){
                listadoEvidencias.push({
                    'Name': Item.Evidencia_Name,
                    'Estado': Item.Estado
                })
            })
            var ubicacion = "";
            var tipo = "";
            if(paObj[istAud].a.Sede != null)
            {
                ubicacion =  paObj[istAud].a.Sede;
                tipo ="Sede";
            }else{
                if(paObj[istAud].a.Gerencia != null)
                {
                    ubicacion =  paObj[istAud].a.Gerencia;
                    tipo ="Gerencia";
        
                }
            }
            body = {
                        "Evidencias": listadoEvidencias,
                        "IdActividad":          paObj[istAud].a.Objetivos[objetivoActiva].SubObjetivos[subObjetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].ActividadId,
                        "IdTarea":                 paObj[istAud].a.Objetivos[objetivoActiva].SubObjetivos[subObjetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Id,
                        "Ubicacion":            ubicacion,
                        "CodePlan":            paObj[istAud].a.Code,
                        "Tipo":                 tipo,
                        "NameActividad":                 paObj[istAud].a.Objetivos[objetivoActiva].SubObjetivos[subObjetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Evidencia_Name,
                        "EstadoActividad":          paObj[istAud].a.Objetivos[objetivoActiva].SubObjetivos[subObjetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Estado,
                        "EmailNotificado":            paObj[istAud].a.Email_Supervisor,
                        "Created_By":           getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
                        "emailResponsable":    getCookie("vtas_internal_useruser"+sessionStorage.tabVisitasa),
                        "nameResponsable":    getCookie("vtas_fullname"+sessionStorage.tabVisitasa),
                        "jobResponsable":    getCookie("vtas_job"+sessionStorage.tabVisitasa)
                
                    }
        }

        let url = apiUrlssoma+"/api/Post-Plan-Anual?code=ZnQh7E2Noeiv1emsJPTvXE5l/qClcMIjv3FNePN8XTRfTY5aOqmSAQ==&httpmethod=EjecucionVencida";

      

        let headers ={
            "apikey":constantes.apiKey
        }
    console.log(body)
        $.ajax({
            method: "POST",
            url:  url,
            data: JSON.stringify(body),
            headers:headers,
            crossDomain: true,
            dataType: "json",
        })
        .done(function(data)
        {
            console.info("data",data)
            // resultado Exitoso
            if(data.Id>0)
            {

                $('#modalExitoEnvioSolicitudPlanAnualSp3').modal('show').addClass('fade')
            }else
            {
    

                    verModalError("Lo Sentimos","No Se Pudo Realizar La Solicitud.")
                 
            }
        })
        .fail(function( jqXHR, textStatus, errorThrown )
        {
            console.error("fail",textStatus)
                verModalError("Lo Sentimos","No Se Pudo Realizar La Solicitud.")
                 })
        .always(function( jqXHR, textStatus, errorThrown )
        {
            console.info("always",textStatus)
            hideLoading();
    
        });
    

        }


        var guardarSupervisionPA = function() {
            $('#modalConfirmarSupervisionPlanAnualSp3').modal('hide').removeClass('fade');
    
            console.log(paObj[istAud].a)
            let listadoEvidencias  = [];
            let listadoAdjuntos  = [];
            var ubicacion = "";
            var tipo = "";
            if(paObj[istAud].a.Sede != null)
            {
                ubicacion =  paObj[istAud].a.Sede;
                tipo ="Sede";
            }else{
                if(paObj[istAud].a.Gerencia != null)
                {
                    ubicacion =  paObj[istAud].a.Gerencia;
                    tipo ="Gerencia";
        
                }
            }
            let body = {};
            if(subObjetivoActiva===null)
            {
                paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas.forEach(function(Item){
                    listadoEvidencias.push({
                        'Name': Item.Evidencia_Name,
                        'Estado': Item.Estado
                    })
                })

                paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Adjuntos.forEach(function(Item){
                   if(Item.EstadoAdjuntoId == 3){
                    listadoAdjuntos.push({
                        'EstadoAdjuntoId': Item.EstadoAdjuntoId,
                        'AdjuntoName': Item.AdjuntoName,
                        'IdAdjunto': Item.Id,
                        'Motivo': Item.Motivo
                    })
                   }else{
                    listadoAdjuntos.push({
                        'EstadoAdjuntoId': Item.EstadoAdjuntoId,
                        'AdjuntoName': Item.AdjuntoName,
                        'IdAdjunto': Item.Id,
                        'Motivo': null
                    })
                   }
                })
                body = {
                    "Adjuntos": listadoAdjuntos,
                    "Evidencias": listadoEvidencias,
                    "IdActividad":          paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].ActividadId,
                            "IdTarea":                 paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Id,
                            "Ubicacion":            ubicacion,
                            "CodePlan":            paObj[istAud].a.Code,
                            "Tipo":                 tipo,
                            "NameActividad":                 paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Evidencia_Name,
                            "EstadoActividad":          paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Estado,
                            "EmailNotificado":            paObj[istAud].a.Email_Supervisor,
                            "Created_By":           getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
                            "emailResponsable":    getCookie("vtas_internal_useruser"+sessionStorage.tabVisitasa),
                            "nameResponsable":    getCookie("vtas_fullname"+sessionStorage.tabVisitasa),
                            "jobResponsable":    getCookie("vtas_job"+sessionStorage.tabVisitasa),
                            "IdPlan":             paObj[istAud].a.Id

                    
                        }       
                     }else{
            
                paObj[istAud].a.Objetivos[objetivoActiva].SubObjetivos[subObjetivoActiva].Actividades[actividadActiva].Tareas.forEach(function(Item){
                    listadoEvidencias.push({
                        'Name': Item.Evidencia_Name,
                        'Estado': Item.Estado
                    })
                })
                paObj[istAud].a.Objetivos[objetivoActiva].SubObjetivos[subObjetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Adjuntos.forEach(function(Item){
                   
                   if(Item.EstadoAdjuntoId == 3){
                    listadoAdjuntos.push({
                        'EstadoAdjuntoId': Item.EstadoAdjuntoId,
                        'AdjuntoName': Item.AdjuntoName,
                        'IdAdjunto': Item.Id,
                        'Motivo': Item.Motivo
                    })
                   }else{
                    listadoAdjuntos.push({
                        'EstadoAdjuntoId': Item.EstadoAdjuntoId,
                        'AdjuntoName': Item.AdjuntoName,
                        'IdAdjunto': Item.Id,
                        'Motivo': null
                    })
                   }

                })
                body = {
                            "Adjuntos": listadoAdjuntos,
                            "Evidencias": listadoEvidencias,
                            "IdActividad":          paObj[istAud].a.Objetivos[objetivoActiva].SubObjetivos[subObjetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].ActividadId,
                            "IdTarea":                 paObj[istAud].a.Objetivos[objetivoActiva].SubObjetivos[subObjetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Id,
                            "Ubicacion":            ubicacion,
                            "CodePlan":            paObj[istAud].a.Code,
                            "Tipo":                 tipo,
                            "NameActividad":                 paObj[istAud].a.Objetivos[objetivoActiva].SubObjetivos[subObjetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Evidencia_Name,
                            "EstadoActividad":          paObj[istAud].a.Objetivos[objetivoActiva].SubObjetivos[subObjetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Estado,
                            "EmailNotificado":            paObj[istAud].a.Email_Supervisor,
                            "Created_By":           getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
                            "emailResponsable":    getCookie("vtas_internal_useruser"+sessionStorage.tabVisitasa),
                            "nameResponsable":    getCookie("vtas_fullname"+sessionStorage.tabVisitasa),
                            "jobResponsable":    getCookie("vtas_job"+sessionStorage.tabVisitasa),
                            "IdPlan":             paObj[istAud].a.Id
                    
                        }
            }
    
            let url = apiUrlssoma+"/api/Post-Plan-Anual?code=ZnQh7E2Noeiv1emsJPTvXE5l/qClcMIjv3FNePN8XTRfTY5aOqmSAQ==&httpmethod=Supervision";
    
            let headers ={
                "apikey":constantes.apiKey
            }
        console.log(body)
            $.ajax({
                method: "POST",
                url:  url,
                data: JSON.stringify(body),
                headers:headers,
                crossDomain: true,
                dataType: "json",
            })
            .done(function(data)
            {
                console.info("data",data)
                // resultado Exitoso
                if(data.Id>0)
                {
                    $('#modalExitoEnvioSolicitudPlanAnualSp3').modal('show').addClass('fade')
                    paObj[istAud].a=data;

                }else
                {
        
    
                        verModalError("Lo Sentimos","No Se Pudo Realizar La Solicitud.")
                     
                }
            })
            .fail(function( jqXHR, textStatus, errorThrown )
            {
                console.error("fail",textStatus)
                    verModalError("Lo Sentimos","No Se Pudo Realizar La Solicitud.")
                     })
            .always(function( jqXHR, textStatus, errorThrown )
            {
                console.info("always",textStatus)
                hideLoading();
        
            });
        
    
            }