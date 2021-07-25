//sprint 3
//variables globales

var objAuditors = new Array();
var istAud = "1";//contiene el datos delñ auditor que actualmente se esta editando o trabajando
var NOTA_MINIMA = 30;


//clases
 //.............................................. CLASE classEvalAud ...........................................
 function classEvalAud()
 {
   
       this.dataAuditor = [];
        // AuditorId: 85
        // AuditoriaId: 335
        // Cargo: "Programador"
        // Code: "#ffb800"
        // Code_Evaluacion: "I| D0160"
        // Comentario: null
        // Correo: "jam_millan@hotmail.com"
        // DescriptionEvaluacion: "Pendiente"
        // Evaluador: "Tony Gonzalez"
        // FechaAuditoria: "15/11/2020"
        // GrupoPreguntas: (3) [{…}, {…}, {…}]
        // Id: 598
        // Inicio: "2020-11-15T00:00:00"
        // NecesitaRefuerzo: 0
        // Nombre: "Paredes Chauca Cindy Yuliana"
        // Norma: "BASC"
        // NormaId: 3
        // Nota: 0
        // Rol: "Auditor"
        // Sede: "Astillero (Chimbote)"
        // StatusEvaluacionId: 2
        // TipoAuditorId: 2
        // TipoAuditoria: "Interna"
             
 
       classEvalAud.prototype.cargarDataServicio = function (data)
        {

            this.dataAuditor = data;
            //console.log("==*== this.dataAuditor[",this.dataAuditor.Code_Evaluacion,"] = ",this.dataAuditor);
        }
        // classEvalAud.prototype.ver = function ()
        // {
        //     //console.log("==*== this.dataAuditor[",this.dataAuditor.Code_Evaluacion,"] = ",this.dataAuditor);
        // }
    }
//.............................................. CLASE classEvalAud ...........................................






function _init_fnSp3EvaluarAuditorEstadoInicial()
{//------------------------------------- ini   fnSp3EvaluarAuditorEstadoInicial() -------------------------------------
    //showLoading();
    console.log("Arrancamos............................");
    //responsive
    fnSp3ResponsiveEvalAud();
    fnSp3CargarFuncionesDinamicasDOM();
    fnSp3CargaFiltroEstadoInicial();



    //hideLoading();

}//------------------------------------- fini   fnSp3EvaluarAuditorEstadoInicial() -------------------------------------






































function fnSp3CargarFuncionesDinamicasDOM()
{//------------------------------------- ini   fnSp3CargarFuncionesDinamicasDOM() -------------------------------------
    
    //*.......................................... */
    $("#sp3_txt_fecha_desde").datetimepicker({
        timepicker:false,
        format:'d/m/Y'});
    //*.......................................... */

    //*.......................................... */
    $("#sp3_txt_fecha_hasta").datetimepicker({
        timepicker:false,
        format:'d/m/Y'});
    //*.......................................... */



}//------------------------------------- fini   fnSp3CargarFuncionesDinamicasDOM() -------------------------------------








function fnSp3CargaFiltroEstadoInicial()
{//------------------------------------- ini   fnSp3CargaFiltroEstadoInicial() -------------------------------------
//*alert('si esd aqui');
    showLoading();
    //$('#bodyTablaSinAuditorias').css('display','block');
    $("#sp3BtFiltroAud").html("Buscando.....")
    $("#sp3BtFiltroAud").attr("disabled",true);

    var ba  =  $('#sp3_txt_auditor_filtro').val()
    var rol =  $('#sp3_sel_rol_filtro').val();  if(rol == null){rol = ""}
    var f1,f2,f11,f22;
        f11 = $('#sp3_txt_fecha_desde').val();
        f22 = $('#sp3_txt_fecha_hasta').val();
        
    if($('#sp3_txt_fecha_desde').val() != ""){var f1 =  date1_DD_MM_AAAA_to_AAAA_MM_DD_T_HH_MM_S(f11)} 
    else{var f1 = "";}
    if($('#sp3_txt_fecha_desde').val() != ""){var f2 =  date1_DD_MM_AAAA_to_AAAA_MM_DD_T_HH_MM_S(f22)}
    else{var f2 = "";}

    var esttus =   $('#sp3_sel_estado_filtro').val();  if(esttus == null){esttus = ""}
    var Notta  =   $('#sp3_sel_nota_filtro').val();    if(Notta == null){Notta = ""}
   
    https://550m44ud1tmg7454-audit-dev.azurewebsites.net/api/Get-Evaluacion_Auditores-All?code=EUnorEI6paUzxOdpVKKAGDjhb4p4wEZ3R6NTWKDoOdVrk0Y0S/ZOkg==&httpmethod=objectlist&RolId=&StatusEvaluacionId=&FechaInicio=&FechaFin=&Auditor=&Nota=52
    var url = apiurlAuditoria+"/api/Get-Evaluacion_Auditores-All?code=EUnorEI6paUzxOdpVKKAGDjhb4p4wEZ3R6NTWKDoOdVrk0Y0S/ZOkg==&httpmethod=objectlist&RolId="+rol+"&StatusEvaluacionId="+esttus+"&FechaInicio="+f1+"&FechaFin="+f2+"&Auditor="+ba+"&Nota="+Notta;
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
           
            console.log(response);
            $("#"+'sp3_sel_rol_filtro').html(" ");
            $("#"+'sp3_sel_rol_filtro').html("<option selected value=''>          </option>");
            response.tipoAuditorAll.map(function(item)
            {
                $("#"+'sp3_sel_rol_filtro').append(`<option value='${item.Id}' style='font-weight: bold;'>${item.Description}</option>`);
    
            });

            $("#"+'sp3_sel_estado_filtro').html(" ");
            $("#"+'sp3_sel_estado_filtro').html("<option selected value=''>          </option>");
            response.statusEvaluacionAuditoresAll.map(function(item)
            {
                $("#"+'sp3_sel_estado_filtro').append(`<option value='${item.Id}' style='font-weight: bold;'>${item.Description}</option>`);
    
            });

            $("#"+'sp3_sel_nota_filtro').html(" ");
            $("#"+'sp3_sel_nota_filtro').html("<option selected value='' style='font-weight: bold;' >          </option>");
            var i= 0;
            for(i =1; i< 56; i++)
            {
                var num = 0;
                var color;
                if(i<10){ num = "0"+ i;}else{num = i;}
                if(i<30){ color= 'red' }else{color='green'}
                $("#"+'sp3_sel_nota_filtro').append(`<option style='color:${color}; font-weight: bold;' value='${num}'>${num}</option>`);
                num = '';
    
            }


            //litsdao inicial
            // response.tipoAuditorAll.map(function(item)
            // {
            //     //$("#"+'sp3_sel_rol_filtro').html(" ");
            //     $("#"+'sp3_sel_rol_filtro').append(`<option value='${item.Id}'>${item.Description}</option>`);
    
            // });

            $("#cantEvaluaciones").html('<b> '+ response.evaluacionAuditoresAll.length+'</b> ');

            $('#body-tabla-list-EvalAud').html(" ");
            $('#pagination-container-EvalAud').html(" ");
            
            var t = 1;
            if(response.evaluacionAuditoresAll.length > 0)
            {
                var pk = response.evaluacionAuditoresAll.Id;
                //arrObjEval[pk] = new Object();
                //arrObjEval[pk] = response.evaluacionAuditoresAll;

                //console.log("******* arrObjEval[",pk,"] = ","arrObjEval[pk]",response.evaluacionAuditoresAll);


                response.evaluacionAuditoresAll.map(function(item)
                {
                    //console.log("==== arrObjEval[",item.Code_Evaluacion,"] = ","arrObjEval[pk]",item);
                    objAuditors[item.Id] = new classEvalAud();
                    objAuditors[item.Id].cargarDataServicio(item);

                        //console.log("#-------------------------- listado (",t,")--------------------------------")
                        $('#body-tabla-list-EvalAud').html(" ");
                        $('#bodyTablaSinAuditorias').css('display','none');
                        t++;
                    
                        $('#pagination-container-EvalAud').pagination({
                            dataSource: response.evaluacionAuditoresAll,
                            pageSize: 4,
                            callback: function(data, pagination) {
                                var html = fnSp3ListarTablaGeneral(data);
                                $('#body-tabla-list-EvalAud').html(html);
            
                                $("#sp3BtFiltroAud").html("Buscar")
                                $("#sp3BtFiltroAud").attr("disabled",false);

                                //---------------------------------------**-----------------------------------------//

                                          $('#sp3_txt_auditor_filtro').val(ba)
                                          $('#sp3_sel_rol_filtro').val(rol);
                                          
                                          $('#sp3_txt_fecha_desde').val(f11);
                                          $('#sp3_txt_fecha_hasta').val(f22);

                                          $('#sp3_sel_estado_filtro').val(esttus);
                                          $('#sp3_sel_nota_filtro').val(Notta);

                                //---------------------------------------**-----------------------------------------//
                               

                            }
                        })
                        
                           
                });
            }
            else
            {
              //alert('no encontro nada xxxx');
                $('#body-tabla-list-EvalAud').html(" ");
                $('#bodyTablaSinAuditorias').css('display','block');
                $("#sp3BtFiltroAud").html("Buscar")
                $("#sp3BtFiltroAud").attr("disabled",false);
                $('#sp3_txt_auditor_filtro').val(ba)
                $('#sp3_sel_rol_filtro').val(rol);
                
                $('#sp3_txt_fecha_desde').val(f11);
                $('#sp3_txt_fecha_hasta').val(f22);

                $('#sp3_sel_estado_filtro').val(esttus);
                $('#sp3_sel_nota_filtro').val(Notta);
                hideLoading();
            }
            


        });

    
    
}//------------------------------------- fin   fnSp3CargaFiltroEstadoInicial() -------------------------------------



//------------------------------------- ini   fnSp3ListarTablaGeneral() -------------------------------------
function fnSp3ListarTablaGeneral(data)
{
    var html = '';
    var o = 0;
    var primeraCargap =1;
    
    console.log("SP3_DATA -->> ",data)

    
    //aqui vamos a crear un objeto plan para cada auditoria


        data.forEach((Item)=>{
            
        
                if(primeraCargap==1)
                {   

                                    var habplan         = 'background-color: #b2b2b2;';//#ff6767
                                    var habver          = 'background-color: #b2b2b2;';//34559c
                                    var habEnviar       = 'background-color: #b2b2b2;';//05beee
                                    var disabled        = '';
                                    var disabledSusp    = '';
                                    var disabledver     = 'disabled readonly';
                                    var disabledEnviar  = 'disabled readonly';
                                    var classdis        = 'background-color: #ff6767';
                                    var ver             = false;
                                    var verModal        = "";

                                if ( Item.NecesitaRefuerzo == 1) {
                                      // alert(Item.Code_Evaluacion);
                                    //disabled        = 'disabled readonly';
                                    habplan         = 'background-color:#ff6767 !important;';
                                    disabledver     = '';
                                // habver          = 'background-color: #ff6767; !important';
                                    verModal        = 'onclick="fnSp3NecesitaRefuerzo('+Item.Id+')"';
                                    disabledEnviar  = '';
                                    //habEnviar       = 'background-color: #05beee; !important';
                                }

                                //if(.StatusEvaluacionId)


                                var verModal1 = '';
                                // if ( Item.StatusEvaluacionId == 2) // if ( Item.StatusEvaluacionId == 4) {
                                // {
                                //     //disabled        = 'disabled readonly';
                                //     //habplan         = 'background-color:#ff6767 !important;';
                                //     disabledver     = '';
                                //     //habver          = 'background-color: #34559c; !important';
                                //     //verModal1        = 'onclick="fnSp3VentanaEvaluacion('+Item.Id+')"';
                                //     disabledEnviar  = '';
                                //     //habEnviar       = 'background-color: #05beee; !important';
                                // }

                                

                                
                                if ( Item.StatusEvaluacionId == 3) {
                                    //disabled        = 'disabled readonly';
                                    //habplan         = 'background-color:#ff6767 !important;';
                                    disabledver     = '';
                                    habEnviar          = 'background-color: #05beee; !important';
                                    verModal1        = 'onclick="fnSp3ReenviarEvaluacion('+Item.Id+')"';
                                    disabledEnviar  = '';
                                    //habEnviar       = 'background-color: #05beee; !important';
                                }

                                if ( Item.StatusEvaluacionId == 4) // if ( Item.StatusEvaluacionId == 4) {
                                {
                                    //disabled        = 'disabled readonly';
                                    //habplan         = 'background-color:#ff6767 !important;';
                                    disabledver     = '';
                                    habver          = 'background-color: #34559c; !important';
                                    verModal1        = 'onclick="fnSp3VentanaEvaluacion('+Item.Id+')"';
                                    disabledEnviar  = '';
                                    //habEnviar       = 'background-color: #05beee; !important';
                                }

                    var btNew  ='';   
                                // let iidPlan = parseInt(Item.PlanId);
                                
                                // if((iidPlan == MayorPlan)&&(iidPlan >0))
                                // {
                                // // si es un comentario btNew = "<div  class='check-blue text-center'>Nuevo</div>"; //btNew ="";//momentaneamente suspendido por jaqueline
                                //     var btNew = " ";
                                // }else{var btNew = " ";}

                                var color;
                                if((Item.Promedio <= NOTA_MINIMA)&&( Item.StatusEvaluacionId == 4)){ color= 'red' }
                                else
                                if((Item.Promedio > NOTA_MINIMA)&&( Item.StatusEvaluacionId == 4)){color='green'}else{color='black'}

                                var color1;
                                if((Item.Nota <= NOTA_MINIMA)&&( Item.StatusEvaluacionId == 4)){ color1= 'red' }
                                else
                                if((Item.Nota > NOTA_MINIMA)&&( Item.StatusEvaluacionId == 4)){color1='green'}else{color1='black'}

                                var promR = Math.round(Item.Promedio)

                        html += `
                            
                            <div class="item-tabla p-2" style="z-index: 1;display:relative;">${btNew}
                                <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                                <div class="col-10 text-center" style="font-size: 14px">
                                    <div class="row">
                                        <div id="c1TabGenx"  title="ID Evaluacion"     class="col-1 text-left"  style="font-size: 14px;">${Item.Code_Evaluacion}</div>
                                        <div id="c2TabGenx"  title="Auditor"    class="col-2 text-left"  style="font-size: 14px;">${Item.Nombre}</div>
                                        <div id="c3TabGenx"  title="Sede"    class="col-1 text-left"  style="font-size: 14px;">${Item.Sede}</div>
                                        <div id="c4TabGenx"  title="Rol"    class="col-1 text-left"  style="font-size: 14px;">${Item.Rol}</div>
                                        <div id="c5TabGenx"  title="Norma"    class="col-1 text-left"  style="font-size: 14px;">${Item.Norma}</div>
                                        <div id="c6TabGenx"  title="Tipo Auditoría"    class="col-1 text-left"  style="font-size: 14px;">${Item.TipoAuditoria}</div>
                                        <div id="c7TabGenx"  title="Fecha Auditoría"    class="col-1 text-left"  style="font-size: 14px;">${Item.FechaAuditoria}</div>
                                        <div id="c8TabGenx"  title="Evaluador"    class="col-1 text-left"  style="font-size: 14px;">${Item.Evaluador}</div>
                                        <div id="c9TabGenx"  title="Estado Evaluación"    class="col-1 text-left"  style="font-size: 14px; color:${Item.Code}">${Item.DescriptionEvaluacion}</div>
                                        <div id="c10TabGenx" title="Nota"   class="col-1 text-left"  style="font-size: 14px; color:${color1} !important;">${Item.Nota}</div>
                                        <div id="c11TabGenx" title="Promedio General"   class="col-1 text-left"  style="font-size: 14px; color:${color} !important; ">${promR}</div>
                                    </div>
                                </div>  
                                <div class="col-2 text-center" style="font-size: 14px">
                                    <div class="row">
                                    <table border='0' width='100%'>
                                        <tr>
                                                <td width='33%' >
                                                    <div id="c12TabGenx" class=" text-center"  style="font-size: 14px; color:#FFF;">
                                                    
                                                    <button type='button' ${verModal} ${disabledver}  class='btn-circle btn_read border-0' style='${habplan}; cursor:pointer;' id='btn_read'>
                                                        <img src='./images/iconos/reforzar.svg' class='ojo-1'>
                                                    </button>
                                                    
                                                </div>
                                            </td>

                                            <td width='34%' >
                                                    <div id="c13TabGenx"    class=" text-center"  style="font-size: 14px; color:#FFF;">
                                                        <div id="c12TabGenx" class=" text-center"  style="font-size: 14px; color:#FFF;">
                                                        
                                                        <button type='button' ${verModal1} ${disabledver}  class='btn-circle btn_read border-0' style='${habver}; cursor:pointer;' id='btn_read'>
                                                            <img src='./images/iconos/ojo_1.svg' class='ojo-1'>
                                                        </button>                                            
                                                    </div>
                                            </td>

                                            <td width='33%' >
                                            <div class="col-3 text-left">
                                                <button type='button' ${verModal1} ${disabledver} onclick="" class='btn-circle btn_read border-0'  ${disabledEnviar} style='${habEnviar}; cursor:pointer;' id='btn_send' >

                                                    <img src='./images/iconos/Frame6.svg' class='ojo-1'>
                                                </button>
                                            </div>
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
//html += '';//hideLoading();
return html;

}
//------------------------------------- fin   fnSp3ListarTablaGeneral() -------------------------------------




function fnSp3NecesitaRefuerzo(idAudd)
{
  console.log("fnSp3NecesitaRefuerzo(",idAudd,")")
}























function fnSp3CargaSelect(idSelect, url, StringFiltro, comporta)
{//------------------------------------- ini   fnSp3CargaSelect() -------------------------------------
    // $("#"+idSelect).css('font-size','13px');
    // $("#"+idSelect).html("<option selected value=''>  Cargando ...  </option>");

    // var headers ={
    //     "apikey":constantes.apiKey        
    // }

    // var settings = {
    //     "url": url,
    //     "method": "GET",
    //     "timeout": 0,
    //     "crossDomain": true,
    //     "dataType": "json",
    //     "headers": headers,
    // };

    // $.ajax(settings).done(function (response) {
       
    //     $("#"+idSelect).html("<option selected value=''>          </option>");
    //     response.map(function(item)
    //     {
    //         if(comporta == 0)$("#"+idSelect).append(`<option value='${item.Id}'>${item.Nombre}</option>`);
    //        // if(comporta == 1)$("#"+idSelect).append(`<option value='${item.Id}'>${item.Description}</option>`);

    //     });
    // });
}//------------------------------------- fin   fnSp3CargaSelect() -------------------------------------



function fnSp3FiltroBuscarSearch()
{//------------------------------------- ini   fnSp3FiltroBuscarSearch() -------------------------------------
    fnSp3CargaFiltroEstadoInicial();
}//------------------------------------- fin   fnSp3FiltroBuscarSearch() -------------------------------------


function fnSp3ResponsiveEvalAud()
{//------------------------------------- ini   fnSp3ResponsiveEvalAud() -------------------------------------
  var f1 = '10px';
  var f2 = '12px';
  var f3 = '14px';

    for(var i = 1; i<15; i++)
    {
      var id = 'c'+i+'TabGenx';//c1TabGenx
      id = "#"+id;
  
      if (screen.width < 1024) 
      {
          //if(i == 12)$(id).html('Susp.');
          $(id).css('font-size',f1)
      }
      else
          {
           if (screen.width <= 1280) 
             {
              //if(i == 12)$(id).html('Suspender');
              $(id).css('font-size',f2)
             }
            else 
             {
              
               $(id).css('font-size',f3)
              
              
  
             }
          }
    }
 

}//------------------------------------- fini   fnSp3ResponsiveEvalAud() -------------------------------------



function fnSp3VentanaEvaluacion(idEvaluacion)
{//------------------------------------- ini   fnSp3VentanaEvaluacion() -------------------------------------
   //alert('a mostrar la ventana de valuacion = '+idEvaluacion);
   istAud = idEvaluacion;
   $("#Sp3VentanaEvaluacionPreview").modal("show").addClass("fade");
   console.log("==*== this.dataAuditor[",idEvaluacion,"] = ",  objAuditors[istAud].dataAuditor)

   
   $('#lbTitleVerPdfx').html("Evaluación ("+  objAuditors[istAud].dataAuditor.Code_Evaluacion +") del Desempeño del Auditor Interno");

   $('#divPreviewEval').html(" ");
   var htmlE;

   var planta = objAuditors[istAud].dataAuditor.Sede;
   var datE = objAuditors[istAud].dataAuditor.Evaluador+'  '+objAuditors[istAud].dataAuditor.Cargo;
   var audiName = objAuditors[istAud].dataAuditor.Nombre;
   var fe = objAuditors[istAud].dataAuditor.FechaEvaluacion;//FechaEvaluacion
   var fa = objAuditors[istAud].dataAuditor.FechaAuditoria;
   var ta = objAuditors[istAud].dataAuditor.TipoAuditoria;
   var commt = objAuditors[istAud].dataAuditor.Comentario;
   var totalNota = 0;
   htmlE = `<table  border="0" style = " margin-left: auto; margin-right: auto; width:620px !important;">
                                <tr>
                                  <td colspan="3">
                                  <table width="100%" border="0">
                                    <tr>
                                        <td width="99%">
                                          <label for="objetivo" style="color: black;" class="lbEvalAud_02">
                                            <b>Datos</b></label>
                                        </td>
                                        <td width="1%"><img src="./images/iconos/menu.svg"></td>
                                    </tr>
                                  </table>
                                  </td>
                                </tr>
                                <tr>
                                    <td colspan="3">&nbsp;</td>
                                </tr>
                                <tr>
                                  <td colspan="3">
                                  <table width="100%" border="0">
                                    <tr>
                                        <td>
                                            <label for="objetivo"  class=" lbEvalAud_01">
                                            <b>Opciones de Respuesta:  Excelente 5/  Muy Bueno 4/  Bueno 3/  Regular 2/  No Satisfecho 1</b>
                                            </label>
                                        </td>
                                    
                                    </tr>
                                  </table>
                                  
                                  </td>
                                </tr>
                                <tr>
                                  <td colspan="3">&nbsp;</td>
                                </tr>
                                <tr>
                                  <td colspan="3">&nbsp;</td>
                                </tr>
                                <tr>
                                  <td width="48%">
                                    <div class="form-group col-12 border text-left" style="height: 68px; /*background-color:cyan;*/ margin:0px 0px 6px !important; padding: 10px 0px !important;"  id = "div_txt_objetivo_plan">
                                        <label for="objetivo" class="label label-caja"  >Planta</label>
                                        <input class="text-justify textarea-fecha2" value = "${planta}" style="height: 22px; font-size: 14.1; font-weight: bold;    id="txt_planta"  name = "txt_planta" readonly>
                                    </div>
                                  </td>
                                  <td width="4%"></td>
                                  <td width="48%">
                                      <div class="form-group col-12 border text-left" style="height: 68px; /*background-color:cyan;*/ margin:0px 0px 6px !important; padding: 10px 0px !important;"  id = "div_txt_objetivo_plan">
                                        <label for="objetivo" class="label label-caja"  >Nombre y Cargo del Evaluador</label>
                                        <input class="text-justify textarea-fecha2" value = "${datE}" style="height: 22px; font-size: 14.1; font-weight: bold;"  id="txt_dato_eval"  name = "txt_dato_eval"  readonly>
                                    </div>
                                 </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div style='height: 10px; background-color:#fff;' >&nbsp;</div>
                                    <div class="form-group col-12 border text-left" style="height: 68px; /*background-color:cyan;*/ margin:0px 0px 6px !important; padding: 10px 0px !important;"  id = "div_txt_objetivo_plan">
                                        <label for="objetivo" class="label label-caja"  >Nombre del Auditor</label>
                                        <input class="text-justify textarea-fecha2" value = "${audiName}" style="height: 22px; font-size: 14.1; font-weight: bold;"  id="txt_name_auditor"  name = "txt_name_auditor"  readonly>
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>
                                    <div style='height: 10px; background-color:#fff;' >&nbsp;</div>
                                      <div class="form-group col-12 border text-left" style="height: 68px; /*background-color:cyan;*/ margin:0px 0px 6px !important; padding: 10px 0px !important;"  id = "div_txt_objetivo_plan">
                                        <label for="objetivo" class="label label-caja"  >Fecha de Evaluación</label>
                                        <input class="text-justify textarea-fecha2" value = "${fe}" style="height: 22px; font-size: 14.1; font-weight: bold;"  id="txt_fecha_eval"  name = "txt_fecha_eval"  readonly>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div style='height: 10px; background-color:#fff;' >&nbsp;</div>
                                      <div class="form-group col-12 border text-left" style="height: 68px; /*background-color:cyan;*/ margin:0px 0px 6px !important; padding: 10px 0px !important;"  id = "div_txt_objetivo_plan">
                                        <label for="objetivo" class="label label-caja"  >Fecha Auditoría</label>
                                        <input class="text-justify textarea-fecha2"  value = "${fa}" style="height: 22px; font-size: 14.1; font-weight: bold;"  id="txt_fecha_aud"  name = "txt_fecha_aud"  readonly>
                                    </div>
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>
                                    <div style='height: 10px; background-color:#fff;' >&nbsp;</div>
                                       <div class="form-group col-12 border text-left" style="height: 68px; /*background-color:cyan;*/ margin:0px 0px 6px !important; padding: 10px 0px !important;"  id = "div_txt_objetivo_plan">
                                        <label for="objetivo" class="label label-caja"  >Tipo de Auditoría</label>
                                        <input class="text-justify textarea-fecha2" value = "${ta}" style="height: 22px; font-size: 14.1; font-weight: bold;"  id="txt_tipo_aud"  name = "txt_objetivo_plan"  readonly>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td colspan="3">&nbsp;</td>
                                </tr>
                                <tr>
                                  <td colspan="3">
                                      <div  class = "lbEvalAud_03" >
                                          Le corresponde a cada pregunta. Solo es necesario realizar una evaluación por auditor/ Planta auditada
                                      </div>
                                 </td>
                                </tr>
                              </table> 
                                  
                              <br />
                              <br />
                              
   

   `;



                            //ahora vamos a recorrecorer las preguntas por tipo
                            
                             objAuditors[istAud].dataAuditor.GrupoPreguntas.map(function(item)
                             {
                               console.log("##############################################################################")
                               console.log("--------------",item.Id)
                               console.log("--------------",item.Description)
                               console.log("--------------",item.Icono)
                               console.log("##############################################################################")   
                               htmlE =  htmlE + `
                               <table  border="0" style = " margin-left: auto; margin-right: auto; width:620px !important;">
                                     <tr>
                                          <td colspan="3" width="100%" >
                                                 <table width="100%" border="0" align='center'>
                                                  <td width="99%"><label style = 'font-size: 18px !important;'><b>${item.Description}</b></label></td>
                                                  <td width="1%" style="text-align: center;"><img src="./images/iconos/${item.Icono}"></td>
                                                 </table>
                                          </td>
                                     </tr>
                                     <tr>
                                         <td colspan="3" >&nbsp;</td>
                                     </tr>   `;
                                        var iitem = item;
                                            iitem.preguntasEvaluacion.map(function(item)
                                            {
                                              console.log("==============================================================================")
                                              console.log("--------------",item.Id)
                                              console.log("--------------",item.Description)
                                              console.log("--------------",item.Item)
                                              console.log("--------------",item.Nota)
                                              console.log("--------------",item.DescriptionNota)
                                              console.log("===============================================================================")     
                                            
                                              totalNota = totalNota + item.Nota;
                                              htmlE =  htmlE + `
                                                   
                                                    <tr>
                                                    <td width="4%"  ><label style="color:#34559c; font-size: 16px;"><b>${item.Item}.</b></label></td>
                                                    <td width="95%" >${item.Description}</td>
                                                    <td width="1%" >
                                                            <div class="form-group col-12 border text-center" style="height: 36px; width: 54px; margin:0px 0px 0px !important; padding: 0px 0px !important;"  id = "div_txt_objetivo_plan">
                                                                <select  id="nota1" style="font-size:13px; border: white; " >
                                                                <option value="${item.Nota}">${item.Nota}</option>
                                                                
                                                                </select>
                                                            </div>
                                                    
                                                    </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="3" >&nbsp;</td>
                                                    </tr>
                                                `;

                                           });

                                 htmlE =  htmlE + ` </table>  <br /><br />`;

                            });
        htmlE =  htmlE + ` 
        <table  border="0" style = " margin-left: auto; margin-right: auto; width:620px !important;" >
        <tr>
          
          <td width="96%"><label><b>Comentarios o sugerencias adicionales</b></label></td>
          <td width="4%" style="text-align: center;"><img src="./images/iconos/conversat1.svg" alt="" /></td>
        </tr>

        <tr>
          <td colspan="2" >&nbsp;</td>
        </tr>

        <tr>
          
          <td colspan="2">

              <div class="form-group col-12 border text-left" style="height: 208px; background-color:#fff; margin:0px 0px 6px !important; padding: 10px 0px !important;"  id = "div_txt_objetivo_plan">
                  <label for="objetivo" class="label label-caja"  >.</label>
                  <textarea class="text-justify textarea-fecha2" style="height: 170px;"   id="txt_comentario"  name = "txt_comentario">${commt}</textarea>
              </div>

          </td>
        </tr>

        <tr>
          <td colspan="2" >&nbsp;</td>
        </tr>

        <tr>
          
          <td colspan="2" >
              <div class="btn-save-auditor2"  id="btnGenerarInforme" style="  padding: 10px 10px;  background:#58c25d; font-size: 15px; color: #fff;  width:100%;" >
                  
                  <table width="100%" border="0" style="top: 10px;">
                      <tr>
                      <td width="1%">&nbsp;</td>
                      <td width="4%"><label style='color: #fff;'>Total</label></td>
                      <td width="92%">&nbsp;</td>
                      <td width="3%"><label style='color: #fff;'>${totalNota}</label></td>
                      </tr>
                  </table>
              </div>
         </td>
        </tr>
      </table>
        `;

        totalNota = 0;
   $('#divPreviewEval').html(htmlE);
}//------------------------------------- ini   fnSp3VentanaEvaluacion() -------------------------------------


function fnSp3ReenviarEvaluacion(idEval)
{//------------------------------------- ini   fnSp3ReenviarEvaluacion() -------------------------------------
    istAud = idEval;
    
    $("#modalConfirmReenviarCorreo").modal("show").addClass("fade");
    var mailTo = objAuditors[istAud].dataAuditor.Evaluador;
    $("#lbSendMail").html("<b>"+mailTo+"</b>")
    $("#btnValidaReeCorr").html("<b>Confirmar</b>")
    $("#btnValidaReeCorr").attr("disabled",false);
   // $("#modalShowAlertConfirmReenviarEvalOk").modal("show").addClass("fade");


}//------------------------------------- fini   fnSp3ReenviarEvaluacion() -------------------------------------


function fnSp3ConfirmReenviarEvaluacion()
{//------------------------------------- ini   fnSp3ReenviarEvaluacion() -------------------------------------
    istAud;
    showLoading();
    
    $("#btnValidaReeCorr").html("<b>Reenviando..</b>")
    $("#btnValidaReeCorr").attr("disabled",true);
    
  
    var body = {
        "Id":  objAuditors[istAud].dataAuditor.Id,
        "Correo":'ces.andy.vasquez4@gmail.com', //objAuditors[istAud].dataAuditor.Correo,
        "Last_Updated_By":  getCookie("vtas_id_hash"+sessionStorage.tabVisitasa)
    }
    
    var url = apiurlAuditoria+"/api/Post-Evaluacion_Auditores-All?code=Tvmg0dzxRDFkxaNgZ/xqwow9fxFXepWtBgkfIEEpeSYirRox6gBX/g==&httpmethod=sendEvaluation";
    var headers ={
       "apikey":constantes.apiKey,
       "Content-Type": "application/json",
    }

    $.ajax({
        method: 'POST',
        url:  url,
        headers:headers,
        data: JSON.stringify(body),
        crossDomain: true,
        dataType: "json",
    }).done(function (data) {

        console.log(data);
        if(data.Id > 0)
        {
            hideLoading();
            fnReEnviarEvaluacionOk()

        }
        
        //fnEnviarInformeAuditoriaOk()

    })
    .fail(function( jqXHR, textStatus, errorThrown ) {

        verModalError('Al reenviar la Evaluación', 'Intente Nuevamente');
    })  
    .always(function( jqXHR, textStatus, errorThrown ) {
        
    });


}//------------------------------------- fini   fnSp3ReenviarEvaluacion() -------------------------------------

function fnReEnviarEvaluacionOk()
{//------------------------------------- fini   fnReEnviarEvaluacionOk() -------------------------------------
    $('#modalConfirmReenviarCorreo').modal('hide').removeClass('fade');

    $("#modalShowAlertConfirmReenviarEvalOk").modal("show").addClass("fade");
}//------------------------------------- fini   fnReEnviarEvaluacionOk() -------------------------------------













