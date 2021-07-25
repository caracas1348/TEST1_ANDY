/****************************************************************************************
* VISUAL SAT - [2021]
* PROYECTO : SIGTASA
* ESQUEMA : SSOMA
* MODULO : GESTIÓN DE PLAN ANUAL
* OPERADORES_________________________________________________________________________
* | # | PROGRAMADOR     |  |      FECHA   |  |   HORA   |           CORREO           |
* | 1 | Andy Vásquez    |  |  04/01/2021  |  | 07:28:50 |    caracas1348@gmail.com   |
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



var paObj = new Array();
var istAud = "0";//contiene el datos del Plan auditor que actualmente se esta editando o trabajando
var accPlanAnual = 0; //indica si se va a crear = 0, a mofificar = 1 o a mostrar = 2 el plan
var objetivo; //variable que indica si es un objetivo o subobjetivo lo seleccionado
var objNewPA;//objeto que manejará la concepción de un nuevo plan anual
var objNewPA2;


           
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
      console.log('parametro de la clase . = ',paObj.IdPlan);
      console.log('parametro de la clase . = ',paObj.IdPrograma);
      console.log('parametro de la clase . = ',paObj.IdGerencia);
      console.log('parametro de la clase . = ',paObj.IdSede);
      console.log('parametro de la clase . = ',paObj.IdEquipo);
      console.log('parametro de la clase . = ',paObj.obj.Tipo);



*/

















function _init_fnSp3PlanAnualEstadoInicial()
{//------------------------------------- ini   fnSp3AdministrarHallazgosEstadoInicial() -------------------------------------
    //showLoading();
    console.log("Arrancamos............................ _init_fnSp3PlanAnualEstadoInicial");

    //responsive
     //fnSp3ResponsiveAdmHallazgos();
     //fnSp3CargarFuncionesAdmHallazgosDinamicasDOM();
     fnSp3CargaFiltroEstadoInicialPlanAnual();


}//------------------------------------- fini   fnSp3AdministrarHallazgosEstadoInicial() -------------------------------------




function fnSp3CargaFiltroEstadoInicialPlanAnual()
{//------------------------------------- ini   fnSp3CargaFiltroEstadoInicialPlanAnual() -------------------------------------
    console.log("Arrancamos............................ fnSp3CargaFiltroEstadoInicialPlanAnual");
    //$('#modalMsgError').modal("show").addClass("fade")

    showLoading();
    guardarEnviar = 0;
    $("#sp3BtFiltroPlanAnual").html("Buscando.....")
    $("#sp3BtFiltroPlanAnual").attr("disabled",true);


     var programa =  $('#sel_filter_programa_p').val();    if(programa == null){programa = 0;}
     var gerencia =  $('#sel_filter_gerencia_p').val();     if(gerencia == null){gerencia = 0;}
     var sedepa =  $('#sel_filter_sede_p').val();    if(sedepa == null){sedepa = 0;}
     var estadopa =  $('#sel_filter_estado_p').val();  if(estadopa == null){estadopa = 0;}
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
        //console.log("**todos**",response);

      






        //------------------------------- CARGAMOS SELECT PROGRAMA ---------------------------------

            $("#"+'sel_filter_programa_p').html(" "); $("#"+'sel_filter_programa_p').css('font-size','13px');
            $("#"+'sel_filter_programa_p').html("<option selected value='0'>          </option>");
            $("#"+'sel_filter_programa_p').html("<option selected value='0'>          </option>");



            $("#"+'sel_programaNew').html(" "); $("#"+'sel_programaNew').css('font-size','13px');
            $("#"+'sel_programaNew').html("<option selected value='0'>          </option>");
            $("#"+'sel_programaNew').html("<option selected value='0'>          </option>");


            response.Programas.map(function(item)
            {
                $("#"+'sel_filter_programa_p').append(`<option value='${item.Id}' title='${item.Code}' style='font-weight: bold;'>${item.Programa}</option>`);
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
            $("#"+'sel_filter_gerencia_p').append(`<option value='${item.Id}' title='${item.Gerencia}' style='font-weight: bold;'>${item.Gerencia}</option>`);
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
            $("#"+'sel_filter_sede_p').append(`<option value='${item.Id}' title='${item.Sede}' style='font-weight: bold;'>${item.Sede}</option>`);
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


       //------------------------------- CARGAMOS SELECT EQUIPO PLAN ---------------------------------

       $("#"+'sel_equipoNew').html(" "); $("#"+'sel_equipoNew').css('font-size','13px');
       $("#"+'sel_equipoNew').html("<option selected value='0'>          </option>");
       $("#"+'sel_equipoNew').html("<option selected value='0'>          </option>");
       response.Equipos.map(function(item)
       {
           $("#"+'sel_equipoNew').append(`<option value='${item.Id}' title='${item.Code}' style='font-weight: bold; '>${item.Equipo}</option>`);
       });
      //------------------------------- CARGAMOS SELECT EQUIPO PLAN ---------------------------------

      var fech =  new Date();
      var anioAc = fech.getFullYear();
      var anioSi = anioAc+1;
      $("#"+'sel_anioeNew').html(" "); $("#"+'sel_anioeNew').css('font-size','13px');
      $("#"+'sel_anioeNew').html("<option selected value='0'>          </option>");
     
          $("#"+'sel_anioeNew').append(`<option value='${anioAc}' title='${anioAc}' style='font-weight: bold; '>${anioAc}</option>`);
          $("#"+'sel_anioeNew').append(`<option value='${anioSi}' title='${anioSi}' style='font-weight: bold; '>${anioSi}</option>`);
      
     //------------------------------- CARGAMOS SELECT DE LOS AÑOS ---------------------------------



      
     




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
              pageSize: 4,
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





}//------------------------------------- fin   fnSp3CargaFiltroEstadoInicialPlanAnual() -------------------------------------




function fnSp3ListarTablaGeneralH(data)
{//------------------------------------------------------- ini   fnSp3ListarTablaGeneralH() -----------------------------------
    var html = '';
    var o = 0;
    var primeraCargap =1;

   
        data.forEach((Item)=>{

           paObj[Item.Id] = new PlanAnual();
           paObj[Item.Id].cargarData(Item);


            console.log("SP3_HALL -->> ",data)
                if(primeraCargap==1)
                {
                   

                    var btNew  ='';
                        if(Item.Id == 1){
                        btNew = "<div  class='check-blue text-center'>Nuevo</div>";}

                        html += `

                        <div class="item-tabla p-2" style="z-index: 1;display:relative;" style="width: 1233px !important;">${btNew}
                            <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                                <div class="col-12 text-center" style="font-size: 15px; padding: 4px !important; ">
                                    <div class="row">
                                        <table width = "100%" border="0">
                                        <tr >
                                            <td width = "10%" align="center"><div id="c1TabGeny" class="text-left lbCabezaTabla1" style='margin: 0px 0px 0px 13px !important;'  >${Item.Code}</div></td>
                                            <td width = "10%" align="center"><div id="c1TabGeny" class="text-left lbCabezaTabla1" style='margin: 0px 0px 0px 13px !important;'  >${Item.Code}</div></td>
                                            <td width = "10%" align="center"><div id="c2TabGeny" class="text-left lbCabezaTabla1"  >${Item.Programa != null ? Item.Programa : "---"}</div></td>
                                            <td width = "14%" align="center"><div id="c3TabGeny" class="text-left lbCabezaTabla1"  >${Item.Gerencia != null ? Item.Gerencia : "---"}</div></td>
                                            <td width = "10%" align="center"><div id="c4TabGeny" class="text-left lbCabezaTabla1"  >${Item.Sede != null ? Item.Sede : "---"}</div></td>
                                            <td width = "8%" align="center"><div id="c5TabGeny" class="text-left lbCabezaTabla1"  >${Item.Equipo != null ? Item.Equipo : "---"}</div></td>


                                            <td width = "8%" align="center"><div id="c6TabGeny" class="text-center lbCabezaTabla1"  >${Item.Objetivos.length}</div></td>
                                            <td width = "10%" align="center"><div id="c7TabGeny" class="text-left   lbCabezaTabla1"  >${Item.Fecha_Creacion}</div></td>
                                            <td width = "8%" align="center"><div id="c8TabGeny" class="text-left   lbCabezaTabla1" style='color: ${Item.Color_Plan}; font-weight: bold; '  >${Item.Estado_Plan}</div></td>



                                           

                                            <td width = "3%" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1"  >
                                                <button type='button' title='Editar del Hallazgo' onclick="accPlanAnual = 1; fnSp3ModalMostrarHallazgoEditar(${Item.Id})"   class='btn-circle btn_read border-0' style='background-color:#58c25d !important;' id='btn_verHallago${Item.Id}'>
                                                    <img src='./images/iconos/edit_1.svg' class='ojo-1'  >
                                                </button>
                                           </td>

                                            <td width = "3%" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1"  >
                                                    <button type='button' title='Editar del Hallazgo' onclick="  accPlanAnual = 2; fnSp3ModalVerPlanAnual(${Item.Id})"   class='btn-circle btn_read border-0' style='background-color:#34559c !important;' id='btn_verHallago${Item.Id}'>
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
        })
    hideLoading();
    //console.log(html);

return html;

}
//------------------------------------- fin   fnSp3ListarTablaGeneralH() -------------------------------------




function fnSp3CerrarVentanaMostrarPlanAnual()
{//------------------------------------- ini   fnSp3CerrarVentanaMostrarPlanAnual() -------------------------------------
    $("#Sp3VentanaHallazgoEditView").modal("hide").removeClass("fade");
}//------------------------------------- ini   fnSp3CerrarVentanaMostrarPlanAnual() -------------------------------------


function fnSp3VentanaMostrarPlanAnual()
{//------------------------------------- ini   fnSp3VentanaMostrarPlanAnual() -------------------------------------
    console.log("Arrancamos............................ fnSp3VentanaMostrarPlanAnual");

    // accionH = 0;
    // vw_principal.init();
    $("#Sp3VentanaHallazgoEditView").modal("show").addClass("fade");
    
    

    if(accPlanAnual == 0)//verificamos si se va a crear  los nuevo plan
    {//-------------------------------------------      * creacion de nuevo plan anual * ------------------------------------------------
            //restablecemos los valore iniciales del formulario
            $("#lbTitleVerPlanAnual").html("Creación del Plan Anual");
            fnSp3onchangeObjetivoSubojetitivo('si');
            $('#txt_obj_subobj').val('');
            $('#sel_programaNew').val(0);
            $('#sel_gerenciaNew').val(0); //SedeId    EquipoId
            $('#sel_sedeNew').val(0);
            $('#sel_equipoNew').val(0);
            //vamos a limpiar la tabla
             $('#body-tabla-list-EvalAud1').html(" ");//objetivos
             $('#body-tabla-list-EvalAud2').html("  "); //actividades
             $('#body-tabla-list-EvalAud3').html("  "); //Tarea
             //ahora el cronograma en estado Natural
             cronogramaEstadoNatural();

             objNewPA = null;//objeto que manejará la concepción de un nuevo plan anual
             objNewPA = new PlanAnual();

    }//-------------------------------------------      * creacion de nuevo plan anual * ------------------------------------------------





    

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




function fnSp3agregaObjetivoSubojetivo(tipo, objjt,Code, CodePadre, nAct, Id)
{//------------------------------------- ini   fnSp3agregaObjetivoSubojetivo() -------------------------------------


    



        if(Id != 0)   
                {//###############################################################################################################################################################################


                    
                      //alert("=============["+$('#txt_obj_subobj').val()+"]==============");


                    if(objjt != "")
                    {

                        if(tipo == 1)
                        {console.log('cargar objetivos');}else{if(tipo == 0)console.log('cargar subbjetivos');}

                        var btNew = '';
                        var o = paObj[istAud].a.Objetivos.length;
                        var color = '#000000';
                        if(tipo == 1)
                        {
                            objjt = "Objetivo "+Code+" : "+objjt;
                            // Objetivos[Objetivos.length] = $('#txt_obj_subobj').val();
                            // var objjt = "Objetivo "+Objetivos.length+" : "+$('#txt_obj_subobj').val();
                            iddd = 'obj_'+nObj;//+"_"+nSobj;
                            color = '#000000';
                            nObj++;
                            racimoAbre =  ` <div id='racimo_${nObj}'>`;
                            racimoCierra =  ` </div>`;
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
                                nSobj++;
                                racimoAbre =  ` `;
                                racimoCierra =  ` `;
                            }
                        }

                    $('#c1TabGenyCol1').html("Objetivos ( "+nObj+" )/ Subobjetivos ( "+nSobj+" ) ");

                        var html1 = '     ';

                        if(nObjSub == 0)
                        {
                            $('#body-tabla-list-EvalAud1').html("     "); nObjSub = 1;
                        }


                            html1 += `
                            ${racimoAbre}
                            <div id = '${iddd}'  class="item-tabla p-2" style="z-index: 1;display:relative;  padding: 0px !important; margin: 10px 8px 0px !important; width: 1223px !important;">
                            <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                                <div class="col-12 text-center" style="font-size: 15px; padding: 4px !important; ">
                                    <div class="row">
                                        <table width = "100%" border="0">
                                        <tr >
                                            <td width = "55%" align="center"><div id="c1TabGeny" class="text-left lbCabezaTabla1" style='margin: 0px 0px 0px 13px !important; font-size:15px !important; color:${color}'  >${objjt}</div></td>
                                            <td width = "14%" align="center"><div id="nAct_${iddd}" class="text-left lbCabezaTabla1" style='margin-left:50px;'  >${nAct}</div></td>


                                            <td width = "10%" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1"  >
                                                <button type='button' title='Actividades del Objetivo' onclick="fnSp3NuevasActividadesObjetivoPlan(${Id},0,${tipo})"   class='btn-circle btn_read border-0' style='background-color:#ffb72b !important;' id='btn_ActividadPlan${Id}'>
                                                    <img src='./images/iconos/folder1.svg' class='ojo-1'  >
                                                </button>

                                            </td>

                                            <td width = "10%" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1"  >
                                                    <button type='button' title='Editar del Plan Anual' onclick="fnSp3EditarPlanAnual(${Id})"   class='btn-circle btn_read border-0' style='background-color:#58c25d !important;' id='btn_verPlanAnual${Id}'>
                                                    <img src='./images/iconos/edit_1.svg' class='ojo-1'  >
                                                    </button>

                                            </td>

                                            <td width = "9%" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1"  >
                                                <button type='button' title='Editar del Hallazgo' onclick="fnSp3eliminarObjetivoSubojetivo('${iddd}')"   class='btn-circle btn_read border-0' style='background-color:#ff6767 !important;' id='btn_verEliminarPlan${Id}'>
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


                        // console.log('objNewPA.Code = ', objNewPA.Code);
                        // console.log('objNewPA.Code_Gerencia = ', objNewPA.Code_Gerencia);
                        // console.log('objNewPA.EquipoId = ', objNewPA.EquipoId);
                        // console.log('objNewPA.Estado_PlanId = ', objNewPA.Estado_PlanId);
                        // console.log('objNewPA.Fecha_Creacion = ', objNewPA.Fecha_Creacion);
                        // console.log('objNewPA.GerenciaId = ', objNewPA.GerenciaId);
                        // console.log('objNewPA.ProgramaId = ', objNewPA.ProgramaId);
                        // console.log('objNewPA.SedeId = ', objNewPA.SedeId);
                        // console.log('objNewPA.accion = ', objNewPA.accion);

                       


                        var btNew = ''; 
                        Id = 0;
                        nAct = 0;
                        
                        var objjt = $('#txt_obj_subobj').val();
                    if(objjt != "")
                    {//***************************************************************************************** */
                        
                      //VAMOS A VALIDAR QUE SIEMPRE QUE EXISTA UN OBJETIVO AL CUAL SE LE VAN A GREGAR SUBOBJETIVOS
                       
                      //VAMOS A VALIDAR QUE SIEMPRE QUE EXISTA UN OBJETIVO AL CUAL SE LE VAN A GREGAR SUBOBJETIVOS

                        //var o = paObj[istAud].a.Objetivos.length;
                        var color = '#000000';
                        if(objetivo == 1)
                        {
                           
                            // Objetivos[Objetivos.length] = $('#txt_obj_subobj').val();
                            // var objjt = "Objetivo "+Objetivos.length+" : "+$('#txt_obj_subobj').val();
                            //iddd = 'obj_'+nObj+"_"+nSobj;
                            iddd = 'obj_'+nObj;
                            var nObj1 = nObj;
                            color = '#000000';
                            nObj++;

                            //si es un objetivo creamos un objeto o subobjetivo
                            var iu = objNewPA.Objetivos.length

                            alert('seleccionado('+CodePai+') ==? '+iu);

                              objNewPA.Objetivos[iu] = new Objetivo();//this.Objetivo_Name;/
                              objNewPA.Objetivos[iu].Objetivo_Name = $('#txt_obj_subobj').val();
                              objNewPA.Objetivos[iu].Id = iu;

                              //console.log('OBJETIVOS**', objNewPA.Objetivos);
                              Code = iu+1;

                              //alert(objNewPA.Objetivos.length);
                               objjt = "Objetivo "+Code+" : "+objjt;

                               nObj = Code;
                               var idu = objNewPA.Objetivos[iu].Id;
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
                                var nObj1 = CodePai-1;
                                var nSobj1; varnns
                                iddd = 'subobj_'+nObj1+"_"+nSobj-1;
                                color = '#5c5c5c';
                                nSobj++;

                               
                                 var kk = objNewPA.Objetivos.length-1;
                                 var Cood = kk+1;
                                
                                
                                var ju = objNewPA.Objetivos[kk].SubObjetivos.length;//SubObjetivos
                                 nSobj1 = ju;
                                 objNewPA.Objetivos[kk].SubObjetivos[ju] = new SubObjetivo();//this.Objetivo_Name;/
                                 objNewPA.Objetivos[kk].SubObjetivos[ju].SubObjetivo_Name = $('#txt_obj_subobj').val();
                                 objNewPA.Objetivos[kk].SubObjetivos[ju].Id = ju;

                                 var idu = objNewPA.Objetivos[kk].SubObjetivos[ju].Id;
                                
                                  CodePadre = nSobj+1;

                             
                                  objjt = "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; SubObjetivo "+Cood+"."+CodePadre+" : "+objjt;
                                  //iddd = 'item'+Code+"_"+CodePadre;
                                  color = '#5c5c5c';
                                  racimoAbre =  ` `;
                                  racimoCierra =  ` `;
                                  CodePai = nObj;
                            }
                        }


                        var html1 = '     ';
                            html1 += `
                                    ${racimoAbre}
                                    <div id = '${iddd}'  class="item-tabla p-2" style="z-index: 1;display:relative;  padding: 0px !important; margin: 10px 8px 0px !important; width: 1223px !important;">
                                    <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                                        <div class="col-12 text-center" style="font-size: 15px; padding: 4px !important; ">
                                            <div class="row">
                                                <table width = "100%" border="0">
                                                <tr >
                                                    <td width = "55%" align="center"><div id="c1TabGeny" class="text-left lbCabezaTabla1" style='margin: 0px 0px 0px 13px !important; font-size:15px !important; color:${color};'  >${objjt}</div></td>
                                                    <td width = "14%" align="center"><div id="nAct_${iddd}" class="text-left lbCabezaTabla1" style='margin-left:50px;'  >${nAct}</div></td>


                                                    <td width = "10%" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1"  >
                                                        <button type='button' title='Actividades del Objetivo' onclick="fnSp3NuevasActividadesObjetivoPlan(${idu},${kk},${objetivo})"   class='btn-circle btn_read border-0' style='background-color:#ffb72b !important;' id='btn_ActividadPlans${idu}'>
                                                            <img src='./images/iconos/folder1.svg' class='ojo-1'  >
                                                        </button>

                                                    </td>

                                                    <td width = "10%" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1"  >
                                                            <button type='button' title='Editar del Plan Anual' onclick="fnSp3EditarPlanAnual(${idu})"   class='btn-circle btn_read border-0' style='background-color:#58c25d !important;' id='btn_verPlanAnuals${Id}'>
                                                            <img src='./images/iconos/edit_1.svg' class='ojo-1'  >
                                                            </button>

                                                    </td>

                                                    <td width = "9%" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1"  >
                                                        <button type='button' title='Editar del Hallazgo' onclick="fnSp3eliminarObjetivoSubojetivo('${iddd}')"   class='btn-circle btn_read border-0' style='background-color:#ff6767 !important;' id='btn_verEliminarPlans${idu}'>
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

                                    //alert(objetivo);
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




                         $('#c1TabGenyCol1').html("Objetivos ( "+objNewPA.Objetivos.length+" )/ Subobjetivos ( "+nSobj+" ) ");


                         //console.log('OBJETIVOS**',kk,'-----------', objNewPA.Objetivos);
                         console.log('COMO VA EL PLAN**-----------', objNewPA);


                    }//*************************************************************************************************** */

            }//###############################################################################################################################################################################







}//------------------------------------- fini   fnSp3agregaObjetivoSubojetivo() -------------------------------------


var filaSelecta = '';
function fnSp3SeleccionaFilaObjSub(idd, no, nso)
{
    if( filaSelecta == '')
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
    console.log('DATOS SELECCIONADOS='+idd+'  ,'+no+',   '+nso);
   
}

function fnSp3eliminarObjetivoSubojetivo(idhh)
{//------------------------------------- ini   fnSp3eliminarObjetivoSubojetivo() -------------------------------------

    if(objetivo == 1)
      {Objetivos[iddd] = null; }
   else
      {
            if(objetivo == 0)
            {
                SubObjetivos[iddd] = null;
            }
        }
  //alert(idhh);
  $('#'+idhh).remove();


}//------------------------------------- fini   fnSp3eliminarObjetivoSubojetivo() -------------------------------------




function fnSp3ModalVerPlanAnual(idPlanx)
{//------------------------------------- ini   fnSp3ModalVerPlanAnual() -------------------------------------
    
//alert('vamos a agregar al Plan');

    istAud = idPlanx;
    $("#Sp3VentanaHallazgoEditView").modal("show").addClass("fade");

    //document.getElementByIdetElementById('Sp3VentanaHallazgoEditView')




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





function fnSp3EditarPlanAnual(ided)
{//------------------------------------- ini   fnSp3EditarPlanAnual() -------------------------------------

   alert('vamos a editar el plan = '+ided);

}//------------------------------------- ini   fnSp3EditarPlanAnual() -------------------------------------



function fnSp3VerPlanesGerenciaYear()
{
  //voy a crear un plan nuevo para este programa+gerencia+año
   //voy a crear un plan nuevo para este programa+gerencia+año
                  
   var programk = $('#sel_programaNew').val();
   var gerenciak = $('#sel_gerenciaNew').val();
   var sedek = $('#sel_sedeNew').val();
   var fecha =  new Date();
   var anioA = fecha.getFullYear();
   var anioS = anioA+1;
 
  console.log("***********",programk,gerenciak,anioA,anioS);
 
  
   validaPlan(programk, gerenciak, sedek, anioA)
}


function validaPlan(co_p, co_ger, co_sede, year)
{   var salida = 0;//respuesta de la busqueda
    var nn = objNewPA2.length;
    $('#msg_sel_gerencia').css('visibility','hidden');
    $('#msg_sel_sede').css('visibility','hidden');

   
    
    //alert(nn);
    //alert(co_ger);
    
   if(co_ger >0)//vamos a validar gerencia
   {
        objNewPA2.map(function(item)
        {

            //console.log("PLAN = "+item.Code)

            //console.log("if(",item.GerenciaId ,"==", co_ger, "&&", item.Year_Plan, "==", year)
            if(item.GerenciaId == co_ger && item.Year_Plan == year)
            {
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
                    console.log("if(",item.SedeId ,"==", co_sede, "&&", item.Year_Plan, "==", year)

                    if(item.SedeId == co_sede && item.Year_Plan == year)
                    {
                        
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





























