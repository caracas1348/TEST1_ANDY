/****************************************************************************************
* VISUAL SAT - [2021]
* PROYECTO : SIGTASA
* ESQUEMA : SSOMA
* MODULO : GESTIÓN DE PLAN ANUAL.ACTIVIDADES
* OPERADORES_________________________________________________________________________
* | # | PROGRAMADOR     |  |      FECHA   |  |   HORA   |           CORREO           |
* | 1 | Andy Vásquez    |  |  12/01/2021  |  | 14:13:50 |    caracas1348@gmail.com   |
* |___|_________________|__|______________|__|__________|____________________________|
*
* DESCRIPCION: ARCHIVO FRONT DE FUNCIONALIDAD EN CLIENTE DE LAS OPCIONES DE LAS ACTIVIDADES 
*              PLAN ANUAL- (LISTADO, CREAR, MODIFICAR ELIMINAR, VALIDAR)
*
* ARCHIVOS DE SERVICIOS   ____________________________________
* | # |     MODULO             |  |         NOMBRE            |   
* | 1 |      SSOMA             |  |     Get-Plan-Anual        |**PENDIENTE VA A CAMBIAR
* |___________________________________________________________|
*
* VERSION: 0.1 Beta
*******************************************************************************************/

//alert('Actividades');




/*------------------------------------------  class PlanAnual ------------------end---------------------------------*/
function Actividad()
 {
   
        this.Id;//: 1
        this.Actividad_Name;
        this.Code;
        this.Cronogramas = [ ]; 
        this.Tareas = [ ]; 
        this.Objetivo_PlanId;
        this.Peso;
        this.ResponsableCargo;
        this.ResponsableCorreo;
        this.ResponsableId;
        this.ResponsableName;
        
}
//.............................................. CLASE classHallazgo ...........................................


 function Tarea()
 {//__________________________________________________  CLASE Tarea  ____________________________________________

    this.ActividadId;
    this.Id;
    this.Color;
    this.Estado;
    this.IdEstado;
    this.Evidencia_Name;
    this.Fecha_Ejecutada_Fin;
    this.Fecha_Ejecutada_Ini;
    this.Fecha_Programada_Fin;
    this.Fecha_Programada_Ini;
    this.ResponsableId;
    this.ResponsableName;


 }//__________________________________________________  CLASE Tarea  ____________________________________________










var nActs = 0;
var iddd2;
var Actividades = [];//manejarlo mejor con una clase
var istObj;//contiene el id del objetivo actual trabajado
var istSobj;//contiene el id del subobjetivo actual trabajado
var istAct;//contiene el id de la Actividad que actualmente se trabaja
var istTar;//contiene el id de la Tarea que actualmente se trabaja
var ObjectUsing;//contiene el Objeto en Edicion
var NumObjectUsing;//contiene el numero del Objeto en Edicion
let CC_Cronograma = false;
let flag_Rechazado = false;
let base64_CC="";




function fnSp3agregaActividadObjetivoPlan(ii,idPlan, itemx,posobject )
{//------------------------------------- ini   fnSp3agregaObjetivoSubojetivo() -------------------------------------
    
  if(ii != -1)   
    {//###############################################################################################################################################################################

       //alert("ii = "+ii+ " idPlan = "+idPlan+" itemx = "+itemx)
         //vamos a meter una fila de prueba
        itemx.Actividad_Name;//: "Actividad IMportante aaaa"
        //item.Code: "ACT1"
        //item.Cronogramas: (12) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        itemx.Id;//: 1
        itemx.Objetivo_PlanId;//: 1
        itemx.Peso;//: 15
        itemx.ResponsableCargo;//: "Almacenist"
        itemx.ResponsableCorreo;//: "caracas1348@gmail.com"
        itemx.ResponsableId;//: "1"
        itemx.ResponsableName;//: "Andy Vasquez"


           // Actividades[Actividades.length] = $('#txt_obj_subobj').val();
             //var objjt = "Objetivo "+Objetivos.length+" : "+$('#txt_obj_subobj').val();
            // iddd2 = 'itemAct_'+ii+"_"+idPlan
             iddd2 = 'itemAct_'+idPlan+"_"+ii

        //var Id = 25;
        //var nAct = 10;
        var html2 = '     ';

        if(nActs == 0)
        {
            $('#body-tabla-list-EvalAud2').html("     "); nObjSub = 1;
        }

      var item = ii+1;
      var tx_act =  `
          <div class="form-group col-12 border text-left" style="  height: auto !important; width: 100% !important; !important; border-color:#DEE2E6 !important;  margin:0px 0px 0px !important; padding: 0px 0px !important;"  id = "divitem">
          <textarea class="text-justify textarea-fecha2 autocompletecollaborator"
          onBlur="AgregarinformacionObjActividad(1,$(this).val(),${istObj},${istSobj},${ii})" style="height: 36px; width:95%; margin: 8px 0px 8px 8px !important; padding: 0px 0px 0px 0px !important; font-size: 13px !important; font-weight: bold; color:#534b4b; background-color:#F2F2F2 !important;"  id="itemAct${ii}"  >${itemx.Actividad_Name}</textarea>
        </div>
          `;

        var tx_porc =  `
            <div class="d-flex justify-content-center align-items-center form-group col-12 border text-center" style="  height: auto !important; width: 92% !important; !important; border-color:#DEE2E6 !important;  margin:0px 0px 0px !important; padding: 0px 0px !important;"  id = "divitem">
            <input onkeyup="registraActividadNueva('itemPeso${ii}','peso',${ii})" onBlur="AgregarinformacionObjActividad(2,$(this).val(),${istObj},${istSobj} ,${ii},'itemPeso${ii}')" class="text-justify textarea-fecha2 autocompletecollaborator" value='${itemx.Peso}'
                style="height: 36px; text-align:center; width:85%; margin: 4px !important; padding: 0px 0px 0px 0px !important; font-size: 13px !important; font-weight: bold; color:#534b4b; background-color:#F2F2F2 !important;"  id="itemPeso${ii}"  name = "itemPeso${ii}"></input>
                <div class="input-group-append">
                <span class="input-group-text"> %</span>
              </div>
              </div>
              
            `;

        var tx_resp =  `
        <div class="form-group col-12 border text-left" style="  height: auto !important; width: 98% !important; !important; border-color:#DEE2E6 !important;  margin:0px 0px 0px !important; padding: 0px 0px 0px 0px !important;"  id = "divTarea">
        <input id = 'PaResponsableName${ii}' class="text-justify textarea-fecha2 autocompletecollaborator" value = '${itemx.ResponsableName}' onchange="fnSp3onchangeColor('divf6')"
            style="height: 36px; width:90%; margin: 8px 0px 8px 8px !important; padding: 0px 0px 0px 0px !important; font-size: 13px !important; font-weight: bold; color: #534b4b; background-color:#F2F2F2 !important;"  "></input>
      </div>
            `;

            var visible = '';
            if(objNewPA.Estado_PlanId > 1){
             visible = `style="display:none;"` ;
            }
    
        //var iddthis = "itemActs_"+nActs;

            html2 += `

            <div id = "${iddd2}"  class="item-tabla p-2" style="z-index: 1;display:relative;  padding: 0px !important; margin: 10px 8px 0px !important; width: 1223px !important;">
            <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                <div class="col-12 text-center" style="font-size: 15px; padding: 4px !important; ">
                    <div class="row">



                    <table width = "100%" border="0">
                        <tr >
                            <td width = "5%" align="center"><div id="c1TabGeny" class="text-left "  style='margin: 0px 0px 0px 18px !important;  font-size: 14px !important; '>${item}</div></td>
                            <td width = "38%" align="center"><div id="c3TabGeny" class="text-left "   style='color:#000;'>${tx_act}</div></td>
                            <td width = "8%" align="center"><div id="c3TabGeny" class="text-left "   style='color:#000;' >${tx_porc}</div></td>
                            <td width = "25%" align="center"><div id="c3TabGeny" class="text-left "  style='color:#000;'>${tx_resp}</div></td>


                            <td width = "6%" align="center"><div id="c4TabGeny" class="text-center lbCabezaTabla"  >
                                <button type='button' title='Crear Tareas de la Actividad' onclick="fnSp3NuevasTareaActividadesPlan(${itemx.Id})"   class='btn-circle btn_read border-0' style='background-color:#ff9f47 !important;' id='btn_ActividadPlan${itemx.Id}'>
                                    <img src='./images/iconos/test6.svg' class='ojo-1'  >
                                </button>
                            </td>

                            <td width = "6%" align="center"><div id="c4TabGeny" class="text-center lbCabezaTabla"  >
                                <button type='button' title='Crear Cronograma de Actividades' onclick="fnSp3agregaCronogramaActividadObjetivoPlan(${itemx.Id})"   class='btn-circle btn_read border-0' style='background-color:#05beee !important;' id='btn_ActividadPlan${itemx.Id}'>
                                    <img src='./images/iconos/calendar2.svg' class='ojo-1'  >
                                </button>
                            </td>

                            <td width = "6%" align="center"  class="showBtnEdit" style="display: none;"><div id="c4TabGeny" class="text-center lbCabezaTabla"  >
                                    <button type='button' title='Editar Responsable' onclick="fnSp3EditarActividadPlanAnual(${itemx.Id})"   class='btn-circle btn_read border-0' style='background-color:#58c25d !important;' id='btn_verPlanAnual${itemx.Id}'>
                                        <img src='./images/iconos/edit_1.svg' class='ojo-1'  >
                                    </button>
                            </td>

                            <td ${visible} width = "6%" align="center"><div id="c4TabGeny" class="text-center lbCabezaTabla"  >
                                    <button type='button' title='Eliminar Actividad${iddd2}' onclick="fnSp3EliminarActividadPlanAnual('${iddd2}')"   class='btn-circle btn_read border-0' style='background-color:#ff6767 !important;' id='btn_verEliminarPlan${itemx.Id}'>
                                        <img src='./images/iconos/delete.svg' class='ojo-1'  >
                                    </button>
                            </td>

                            <td width = "1%" align="center"><div id="c7TabGeny" class="text-center lbCabezaTabla"  >&nbsp</div></td>


                        </tr>
                    </table>





                        </div>
                    </div>
                </div>
            </div>


            `;
            $('#body-tabla-list-EvalAud2').append(html2);
            getPersonResponsablePa($("#PaResponsableName"+ii),ii,1,istObj, istSobj, ii);

    }//###############################################################################################################################################################################
    else
    {//###############################################################################################################################################################################
        var ty;
        var nActsN
        var trama;
         if(istSobj == null)//es un objetivo
         {
             
             ty = 0;
           //console.log(istObj,objNewPA.Objetivos)
             nActsN = objNewPA.Objetivos[istObj].Actividades.length; 
             objNewPA.Objetivos[istObj].Actividades[nActsN] = new Actividad();
             objNewPA.Objetivos[istObj].Actividades[nActsN].Id = 0;
            // objNewPA.Objetivos[istObj].Actividades[nActsN].Id = nActsN;
            objNewPA.Objetivos[istObj].Actividades[nActsN].Peso = 0;
            objNewPA.Objetivos[istObj].Actividades[nActsN].Actividad_Name = "";
            objNewPA.Objetivos[istObj].Actividades[nActsN].ResponsableName = "";
            
            // iddd2 = 'itemAct_'+ty+"_"+nActsN;
             iddd2 = 'itemAct_'+istObj+"_"+nActsN;
                      //Actualiza el contador de actividades
                     //console.log("#nAct_obj_"+(istObj))
                     $("#nAct_obj_"+(istObj+1)).html(nActsN+1)
                    }
         else
         {//es un subobjetivo
             nActsN = objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades.length;
             objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[nActsN] = new Actividad();
          //   objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[nActsN].Id = nActsN;
             objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[nActsN].Id = 0;
             objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[nActsN].Peso = 0;
             objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[nActsN].Actividad_Name = "0";
             objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[nActsN].ResponsableName = "0";
             //iddd2 = 'itemAct_'+ty+"_"+nActsN;
           //  ResponsableName
             iddd2 = 'itemAct_'+istObj+"_"+istSobj+"_"+nActsN;
                      //Actualiza el contador de actividades
                      $("#nAct_subobj_"+(istObj+1)+"_"+(istSobj+1)).html(nActsN+1)
                    }

                    $("#contadorActList").html(nActsN+1)

         

         

         

        var html2 = '     ';

        
        if(nActsN == 0)
        {
            $('#body-tabla-list-EvalAud2').html("     "); nObjSub = 1;
        }

      var item = nActsN+1;
      //var itemId = 
      var tx_act =  `
          <div class="form-group col-12 border text-left" style="  height: auto !important; width: 100% !important; !important; border-color:#DEE2E6 !important;  margin:0px 0px 0px !important; padding: 0px 0px !important;"  id = "divitem">
          <textarea onkeyup="registraActividadNueva('itemAct${item}','actividad')" class="text-justify textarea-fecha2 autocompletecollaborator" onBlur="AgregarinformacionObjActividad(1,$(this).val(),${istObj},${istSobj} ,${nActsN})"
              style="height: 36px; width:95%; margin: 8px 0px 8px 8px !important; padding: 0px 0px 0px 0px !important; font-size: 13px !important; font-weight: bold; color:#534b4b; background-color:#FFF !important;"  id="itemAct${item}"  ></textarea>
        </div>
          `;//background-color:#F2F2F2

        var tx_porc =  `
            <div class="d-flex justify-content-center align-items-center form-group col-12 border text-center" style="  height: auto !important; width: 92% !important; !import important;  margin:0px 0px 0px !important; padding: 0px 0px !important;"  id = "divitem">
            <input  onkeyup="registraActividadNueva('itemPeso${item}','peso',${nActsN})" onBlur="AgregarinformacionObjActividad(2,$(this).val(),${istObj},${istSobj} ,${nActsN},'itemPeso${item}')" class="text-justify textarea-fecha2 autocompletecollaborator" value=''
                style="height: 36px; text-align:center; width:85%; margin: 4px !important; padding: 0px 0px 0px 0px !important; font-size: 13px !important; font-weight: bold; color:#534b4b; background-color:#FFF !important;"  id="itemPeso${item}" ></input>
                <div class="input-group-append">
                <span class="input-group-text"> %</span>
              </div>
                </div>
            `;

        var tx_resp =  `
        <div class="form-group col-12 border text-left" style="  height: auto !important; width: 98% !important; !important; border-color:#DEE2E6 !important;  margin:0px 0px 0px !important; padding: 0px 0px 0px 0px !important;"  id = "RespAct${item}">
        <input class="text-justify textarea-fecha2 autocompletecollaborator " value = ' '
            style="height: 36px; width:90%; margin: 8px 0px 8px 8px !important; padding: 0px 0px 0px 0px !important; font-size: 13px !important; font-weight: bold; color: #534b4b; background-color:#FFF !important;" 
            title='Teclea 3 letras del nombre y luego seleccione' id="PaResponsableName${item}"  name = "PaResponsableName${item}">
        </input>
            <input type="hidden" value="" id="PaResponsableCargo${item}">
            <input type="hidden" value="" id="PaResponsableCorreo${item}">
            <input type="hidden" value="" id="PaResponsableUserHash${item}">






      </div>
            `;

           
            //getPersonResponsable($("#ResponsableName"),1);
        //var iddthis = "itemActs_"+nActs;
        var visible = '';
        if(objNewPA.Estado_PlanId > 1){
         visible = `style="display:none;"` ;
        }

            html2 += `

            <div id = "${iddd2}"  class="item-tabla p-2" style="z-index: 1;display:relative;  padding: 0px !important; margin: 10px 8px 0px !important; width: 1223px !important;">
            <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                <div class="col-12 text-center" style="font-size: 15px; padding: 4px !important; ">
                    <div class="row">



                    <table width = "100%" border="0">
                        <tr >
                            <td width = "5%" align="center"><div id="c1TabGeny" class="text-left "  style='margin: 0px 0px 0px 18px !important;  font-size: 14px !important; '>${item}</div></td>
                            <td width = "38%" align="center"><div id="c3TabGeny" class="text-left "   style='color:#000;'>${tx_act}</div></td>
                            <td width = "8%" align="center"><div id="c3TabGeny" class="text-left "   style='color:#000;' >${tx_porc}</div></td>
                            <td width = "25%" align="center"><div id="c3TabGeny" class="text-left "  style='color:#000;'>${tx_resp}</div></td>


                            <td width = "6%" align="center"><div id="c4TabGeny" class="text-center lbCabezaTabla"  >
                                <button type='button' title='Crear Tareas de la Actividad' onclick="fnSp3NuevasTareaActividadesPlan(${nActsN})"   class='btn-circle btn_read border-0' style='background-color:#ff9f47 !important;' id='btn_ActividadPlan${itemx.Id}'>
                                    <img src='./images/iconos/test6.svg' class='ojo-1'  >
                                </button>
                            </td>

                            <td width = "6%" align="center"><div id="c4TabGeny" class="text-center lbCabezaTabla"  >
                                <button type='button' title='Crear Cronograma de Actividades' onclick="fnSp3agregaCronogramaActividadObjetivoPlan(${nActsN})"   class='btn-circle btn_read border-0' style='background-color:#05beee !important;' id='btn_ActividadPlan${itemx.Id}'>
                                    <img src='./images/iconos/calendar2.svg' class='ojo-1'  >
                                </button>
                            </td>

                            <td width = "6%" align="center"  class="showBtnEdit" style="display: none;"><div id="c4TabGeny" class="text-center lbCabezaTabla"  >
                                    <button type='button' title='Editar Responsable' onclick="fnSp3EditarActividadPlanAnual(${nActsN})"   class='btn-circle btn_read border-0' style='background-color:#58c25d !important;' id='btn_verPlanAnual${itemx.Id}'>
                                        <img src='./images/iconos/edit_1.svg' class='ojo-1'  >
                                    </button>
                            </td>

                            <td width = "6%" align="center"><div id="c4TabGeny" class="text-center lbCabezaTabla"  >
                                    <button type='button' title='Eliminar Actividad${iddd2}' onclick="fnSp3EliminarActividadPlanAnual('${iddd2}')"   class='btn-circle btn_read border-0' style='background-color:#ff6767 !important;' id='btn_verEliminarPlan${itemx.Id}'>
                                        <img src='./images/iconos/delete.svg' class='ojo-1'  >
                                    </button>
                            </td>

                            <td width = "1%" align="center"><div id="c7TabGeny" class="text-center lbCabezaTabla"  >&nbsp</div></td>


                        </tr>
                    </table>





                        </div>
                    </div>
                </div>
            </div>


            `;

            $('#itemAct'+item).focus();
            $('#itemAct'+item).select();
             
            $('#body-tabla-list-EvalAud2').append(html2);

            getPersonResponsablePa($("#PaResponsableName"+item),item,1,istObj, istSobj, nActsN);
            $("#PaResponsableName"+item).val('');
    }//###############################################################################################################################################################################

    
     

  



    nActs++;

console.log(objNewPA)

if(accPlanAnual == 1)
{
    if(objNewPA.Estado_PlanId === 2){
    $('.showBtnEdit').show();
    $('.noShowBtnEdit').hide();
    $('.disabledBtnEdit').attr('disabled',true);
    $('.disabledBtnEdit').css('background-color','#b2b2b2');
    }else  if(objNewPA.Estado_PlanId === 1){
        $('.showBtnEdit').hide();
        $('.noShowBtnEdit').show();
        }
    
}else{
    $('.showBtnEdit').hide();
    $('.noShowBtnEdit').show();
    

}
}//------------------------------------- fini   fnSp3agregaObjetivoSubojetivo() -------------------------------------


function fnSp3agregaActividadObjetivoPlanEditar(ii,idPlan, itemx,posobject )
{//------------------------------------- ini   fnSp3agregaObjetivoSubojetivo() -------------------------------------
   //console.log(ii,idPlan, itemx,posobject )
  if(ii != -1)   
    {//###############################################################################################################################################################################

       //alert("ii = "+ii+ " idPlan = "+idPlan+" itemx = "+itemx)
         //vamos a meter una fila de prueba
        itemx.Actividad_Name;//: "Actividad IMportante aaaa"
        //item.Code: "ACT1"
        //item.Cronogramas: (12) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        itemx.Id;//: 1
        itemx.Objetivo_PlanId;//: 1
        itemx.Peso;//: 15
        itemx.ResponsableCargo;//: "Almacenist"
        itemx.ResponsableCorreo;//: "caracas1348@gmail.com"
        itemx.ResponsableId;//: "1"
        itemx.ResponsableName;//: "Andy Vasquez"


           // Actividades[Actividades.length] = $('#txt_obj_subobj').val();
             //var objjt = "Objetivo "+Objetivos.length+" : "+$('#txt_obj_subobj').val();
            // iddd2 = 'itemAct_'+ii+"_"+idPlan
             iddd2 = 'itemAct_'+idPlan+"_"+ii

        //var Id = 25;
        //var nAct = 10;
        var html2 = '     ';

        if(nActs == 0)
        {
            $('#body-tabla-list-EvalAud2').html("     "); nObjSub = 1;
        }

      var item = ii+1;
      var tx_act =  `
          <div class="form-group col-12 border text-left" style="  height: auto !important; width: 100% !important; !important; border-color:#DEE2E6 !important;  margin:0px 0px 0px !important; padding: 0px 0px !important;"  id = "divitem">
          <textarea class="text-justify textarea-fecha2 autocompletecollaborator"
          onBlur="AgregarinformacionObjActividad(1,$(this).val(),${istObj},${istSobj},${ii})" style="height: 36px; width:95%; margin: 8px 0px 8px 8px !important; padding: 0px 0px 0px 0px !important; font-size: 13px !important; font-weight: bold; color:#534b4b; background-color:#F2F2F2 !important;"  id="itemAct${ii}"  >${itemx.Actividad_Name}</textarea>
        </div>
          `;

        var tx_porc =  `
            <div class="d-flex justify-content-center align-items-center form-group col-12 border text-center" style="  height: auto !important; width: 92% !important; !important; border-color:#DEE2E6 !important;  margin:0px 0px 0px !important; padding: 0px 0px !important;"  id = "divitem">
            <input onkeyup="registraActividadNueva('itemPeso${ii}','peso',${ii})" onBlur="AgregarinformacionObjActividad(2,$(this).val(),${istObj},${istSobj} ,${ii},'itemPeso${item}')" class="text-justify textarea-fecha2 autocompletecollaborator" value='${itemx.Peso}'
                style="height: 36px; text-align:center; width:85%; margin: 4px !important; padding: 0px 0px 0px 0px !important; font-size: 13px !important; font-weight: bold; color:#534b4b; background-color:#F2F2F2 !important;"  id="itemPeso${ii}"  name = "itemPeso${ii}"></input>
                <div class="input-group-append">
                <span class="input-group-text"> %</span>
              </div>
                </div>
            `;

        var tx_resp =  `
        <div class="form-group col-12 border text-left" style="  height: auto !important; width: 98% !important; !important; border-color:#DEE2E6 !important;  margin:0px 0px 0px !important; padding: 0px 0px 0px 0px !important;"  id = "divTarea">
        <input id = 'PaResponsableName${ii}' class="disabledBtnEditResp text-justify textarea-fecha2 autocompletecollaborator" value = '${itemx.ResponsableName}' onchange="fnSp3onchangeColor('divf6')"
            style="height: 36px; width:90%; margin: 8px 0px 8px 8px !important; padding: 0px 0px 0px 0px !important; font-size: 13px !important; font-weight: bold; color: #534b4b; background-color:#F2F2F2 !important;"  "></input>
      </div>
            `;


        //var iddthis = "itemActs_"+nActs;
        var visible = '';
        if(objNewPA.Estado_PlanId > 1){
         visible = `style="display:none;"` ;
        }

            html2 += `

            <div id = "${iddd2}"  class="item-tabla p-2" style="z-index: 1;display:relative;  padding: 0px !important; margin: 10px 8px 0px !important; width: 1223px !important;">
            <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                <div class="col-12 text-center" style="font-size: 15px; padding: 4px !important; ">
                    <div class="row">



                    <table width = "100%" border="0">
                        <tr >
                            <td width = "5%" align="center"><div id="c1TabGeny" class="text-left "  style='margin: 0px 0px 0px 18px !important;  font-size: 14px !important; '>${item}</div></td>
                            <td width = "38%" align="center"><div id="c3TabGeny" class="text-left "   style='color:#000;'>${tx_act}</div></td>
                            <td width = "8%" align="center"><div id="c3TabGeny" class="text-left "   style='color:#000;' >${tx_porc}</div></td>
                            <td width = "21%" align="center"><div id="c3TabGeny" class="text-left "  style='color:#000;'>${tx_resp}</div></td>


                            <td width = "6%" class="showBtnEdit" style="display: none;" align="center"><div id="c4TabGeny" class="text-center lbCabezaTabla"  >
                                <button type='button' title='Crear Tareas de la Actividad' onclick="mostrarVentanaControlCambios(${ii},${item})"   class='btn-circle btn_read border-0' style='background-color:#05beee !important;' id='btn_ActividadPlan${itemx.Id}'>
                                    <img src='./images/iconos/settings.svg' class='ojo-1'  >
                                </button>
                            </td>

                            <td width = "6%" align="center"><div id="c4TabGeny" class="text-center lbCabezaTabla"  >
                            <button type='button' title='Crear Tareas de la Actividad' onclick="fnSp3NuevasTareaActividadesPlanEditar(${ii})"   class='btn-circle btn_read border-0' style='background-color:#ff9f47 !important;' id='btn_ActividadPlan${itemx.Id}'>
                                <img src='./images/iconos/test6.svg' class='ojo-1'  >
                            </button>
                        </td>

                            <td width = "6%" align="center"><div id="c4TabGeny" class="text-center lbCabezaTabla"  >
                                <button type='button' title='Crear Cronograma de Actividades' onclick="fnSp3agregaCronogramaActividadObjetivoPlanEditar(${ii})"  id="btn_esdirCronograma_${ii}" class='disabledBtnEdit btn-circle btn_read border-0' style='background-color:#05beee !important;' id='btn_ActividadPlan${itemx.Id}'>
                                    <img src='./images/iconos/calendar2.svg' class='ojo-1'  >
                                </button>
                            </td>

                            <td width = "6%" align="center"  class="showBtnEdit" style="display: none;"><div id="c4TabGeny" class="text-center lbCabezaTabla"  >
                                    <button type='button' title='Editar Responsable' onclick="fnSp3EditarActividadPlanAnual(${ii})"   class='btn-circle btn_read border-0' style='background-color:#58c25d !important;' id='btn_verPlanAnual${itemx.Id}'>
                                        <img src='./images/iconos/edit_1.svg' class='ojo-1'  >
                                    </button>
                            </td>

                            <td width = "6%" align="center"><div id="c4TabGeny" class="text-center lbCabezaTabla"  >
                                    <button type='button' title='Eliminar Actividad${iddd2}' onclick="fnSp3EliminarActividadPlanAnualEdit('${iddd2}')"   class='disabledBtnEdit btn-circle btn_read border-0' style='background-color:#ff6767 !important;' id='btn_verEliminarPlan${itemx.Id}'>
                                        <img src='./images/iconos/delete.svg' class='ojo-1'  >
                                    </button>
                            </td>

                            <td width = "1%" align="center"><div id="c7TabGeny" class="text-center lbCabezaTabla"  >&nbsp</div></td>


                        </tr>
                    </table>





                        </div>
                    </div>
                </div>
            </div>


            `;
            $('#body-tabla-list-EvalAud2').append(html2);
            getPersonResponsablePa($("#PaResponsableName"+ii),ii,1,istObj, istSobj, ii);

    }//###############################################################################################################################################################################
    else
    {//###############################################################################################################################################################################
        var ty;
        var nActsN
        var trama;
         if(istSobj == null)//es un objetivo
         {
             
             ty = 0;
           //console.log(istObj,objNewPA.Objetivos)
             nActsN = objNewPA.Objetivos[istObj].Actividades.length; 
             objNewPA.Objetivos[istObj].Actividades[nActsN] = new Actividad();
             objNewPA.Objetivos[istObj].Actividades[nActsN].Id = 0;
             //objNewPA.Objetivos[istObj].Actividades[nActsN].Id = nActsN;
             objNewPA.Objetivos[istObj].Actividades[nActsN].Peso = 0;
             objNewPA.Objetivos[istObj].Actividades[nActsN].Actividad_Name = "";
             objNewPA.Objetivos[istObj].Actividades[nActsN].ResponsableName = "";
            // iddd2 = 'itemAct_'+ty+"_"+nActsN;
             iddd2 = 'itemAct_'+istObj+"_"+nActsN;
                      //Actualiza el contador de actividades
                     //console.log("#nAct_obj_"+(istObj))

         $("#nAct_obj_"+(istObj+1)).html(nActsN+1)
         }
         else
         {//es un subobjetivo
             nActsN = objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades.length;
             objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[nActsN] = new Actividad();
             objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[nActsN].Id = 0;
             //objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[nActsN].Id = nActsN;
             objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[nActsN].Peso = 0;
             objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[nActsN].Actividad_Name = "";
             objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[nActsN].ResponsableName = "";
             //iddd2 = 'itemAct_'+ty+"_"+nActsN;
             iddd2 = 'itemAct_'+istObj+"_"+istSobj+"_"+nActsN;
console.log("#nAct_subobj_"+(istObj+1)+"_"+(istSobj+1))
                      //Actualiza el contador de actividades    
         $("#nAct_subobj_"+(istObj+1)+"_"+(istSobj+1)).html(nActsN+1)
         }

         $("#contadorActList").html(nActsN+1)

         

         

         

        var html2 = '     ';

        
        if(nActsN == 0)
        {
            $('#body-tabla-list-EvalAud2').html("     "); nObjSub = 1;
        }

      var item = nActsN+1;
      //var itemId = 
      var tx_act =  `
          <div class="form-group col-12 border text-left" style="  height: auto !important; width: 100% !important; !important; border-color:#DEE2E6 !important;  margin:0px 0px 0px !important; padding: 0px 0px !important;"  id = "divitem">
          <textarea onkeyup="registraActividadNuevaEditar('itemAct${item}','actividad')" class="text-justify textarea-fecha2 autocompletecollaborator" onBlur="AgregarinformacionObjActividad(1,$(this).val(),${istObj},${istSobj} ,${nActsN})"
              style="height: 36px; width:95%; margin: 8px 0px 8px 8px !important; padding: 0px 0px 0px 0px !important; font-size: 13px !important; font-weight: bold; color:#534b4b; background-color:#FFF !important;"  id="itemAct${item}"  ></textarea>
        </div>
          `;//background-color:#F2F2F2

        var tx_porc =  `
            <div class="d-flex justify-content-center align-items-center form-group col-12 border text-center" style="  height: auto !important; width: 92% !important; !import important;  margin:0px 0px 0px !important; padding: 0px 0px !important;"  id = "divitem">
            <input  onkeyup="registraActividadNuevaEditar('itemPeso${item}','peso',${nActsN})" onBlur="AgregarinformacionObjActividad(2,$(this).val(),${istObj},${istSobj} ,${nActsN},'itemPeso${item}')" class="text-justify textarea-fecha2 autocompletecollaborator" value=''
                style="height: 36px; text-align:center; width:85%; margin: 4px !important; padding: 0px 0px 0px 0px !important; font-size: 13px !important; font-weight: bold; color:#534b4b; background-color:#FFF !important;"  id="itemPeso${item}" ></input>
          
                <div class="input-group-append">
                <span class="input-group-text"> %</span>
              </div>
                    </div>
            `;

        var tx_resp =  `
        <div class="form-group col-12 border text-left" style="  height: auto !important; width: 98% !important; !important; border-color:#DEE2E6 !important;  margin:0px 0px 0px !important; padding: 0px 0px 0px 0px !important;"  id = "RespAct${item}">
        <input class=" disabledBtnEditResp text-justify textarea-fecha2 autocompletecollaborator " value = ' '
            style="height: 36px; width:90%; margin: 8px 0px 8px 8px !important; padding: 0px 0px 0px 0px !important; font-size: 13px !important; font-weight: bold; color: #534b4b; background-color:#FFF !important;" 
            title='Teclea 3 letras del nombre y luego seleccione' id="PaResponsableName${item}"  name = "PaResponsableName${item}">
        </input>
            <input type="hidden" value="" id="PaResponsableCargo${item}">
            <input type="hidden" value="" id="PaResponsableCorreo${item}">
            <input type="hidden" value="" id="PaResponsableUserHash${item}">






      </div>
            `;

           
            //getPersonResponsable($("#ResponsableName"),1);
        //var iddthis = "itemActs_"+nActs;
        var visible = '';
        if(objNewPA.Estado_PlanId > 1){
         visible = `style="display:none;"` ;
        }

            html2 += `

            <div id = "${iddd2}"  class="item-tabla p-2" style="z-index: 1;display:relative;  padding: 0px !important; margin: 10px 8px 0px !important; width: 1223px !important;">
            <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                <div class="col-12 text-center" style="font-size: 15px; padding: 4px !important; ">
                    <div class="row">



                    <table width = "100%" border="0">
                        <tr >
                            <td width = "5%" align="center"><div id="c1TabGeny" class="text-left "  style='margin: 0px 0px 0px 18px !important;  font-size: 14px !important; '>${item}</div></td>
                            <td width = "38%" align="center"><div id="c3TabGeny" class="text-left "   style='color:#000;'>${tx_act}</div></td>
                            <td width = "8%" align="center"><div id="c3TabGeny" class="text-left "   style='color:#000;' >${tx_porc}</div></td>
                            <td width = "21%" align="center"><div id="c3TabGeny" class="text-left "  style='color:#000;'>${tx_resp}</div></td>

                            <td width = "6%" align="center" class="showBtnEdit" style="display: none;"><div id="c4TabGeny" class="text-center lbCabezaTabla"  >
                            <button type='button' title='Crear Tareas de la Actividad' onclick="mostrarVentanaControlCambios(${ii},${item})"   class='btn-circle btn_read border-0' style='background-color:#05beee !important;' id='btn_ActividadPlan${itemx.Id}'>
                                <img src='./images/iconos/settings.svg' class='ojo-1'  >
                            </button>
                        </td>
                            <td width = "6%" align="center"><div id="c4TabGeny" class="text-center lbCabezaTabla"  >
                                <button type='button' title='Crear Tareas de la Actividad' onclick="fnSp3NuevasTareaActividadesPlanEditar(${nActsN})"   class='btn-circle btn_read border-0' style='background-color:#ff9f47 !important;' id='btn_ActividadPlan${itemx.Id}'>
                                    <img src='./images/iconos/test6.svg' class='ojo-1'  >
                                </button>
                            </td>

                            <td width = "6%" align="center"><div id="c4TabGeny" class="text-center lbCabezaTabla"  >
                                <button type='button'  title='Crear Cronograma de Actividades' onclick="fnSp3agregaCronogramaActividadObjetivoPlanEditar(${nActsN})" id="btn_esdirCronograma_${nActsN}"  class='disabledBtnEdit btn-circle btn_read border-0' style='background-color:#05beee !important;' id='btn_ActividadPlan${itemx.Id}'>
                                    <img src='./images/iconos/calendar2.svg' class='ojo-1'  >
                                </button>
                            </td>

                            <td width = "6%" align="center"  class="showBtnEdit" style="display: none;"><div id="c4TabGeny" class="text-center lbCabezaTabla"  >
                                    <button type='button' title='Editar Responsable' onclick="fnSp3EditarActividadPlanAnual(${nActsN})"   class='btn-circle btn_read border-0' style='background-color:#58c25d !important;' id='btn_verPlanAnual${itemx.Id}'>
                                        <img src='./images/iconos/edit_1.svg' class='ojo-1'  >
                                    </button>
                            </td>

                            <td ${visible} width = "6%" align="center"><div id="c4TabGeny" class="text-center lbCabezaTabla"  >
                                    <button type='button' title='Eliminar Actividad${iddd2}' onclick="fnSp3EliminarActividadPlanAnualEdit('${iddd2}')"   class=' disabledBtnEdit btn-circle btn_read border-0' style='background-color:#ff6767 !important;' id='btn_verEliminarPlan${itemx.Id}'>
                                        <img src='./images/iconos/delete.svg' class='ojo-1'  >
                                    </button>
                            </td>

                            <td width = "1%" align="center"><div id="c7TabGeny" class="text-center lbCabezaTabla"  >&nbsp</div></td>


                        </tr>
                    </table>





                        </div>
                    </div>
                </div>
            </div>


            `;

            $('#itemAct'+item).focus();
            $('#itemAct'+item).select();
             
            $('#body-tabla-list-EvalAud2').append(html2);

            getPersonResponsablePa($("#PaResponsableName"+item),item,1,istObj, istSobj, nActsN);
            $("#PaResponsableName"+item).val('');
    }//###############################################################################################################################################################################

    
     

  



    nActs++;

console.log(objNewPA)
if(accPlanAnual == 1)
{
    if(objNewPA.Estado_PlanId === 2){
    $('.showBtnEdit').show();
    $('.noShowBtnEdit').hide();
    $('.disabledBtnEdit').attr('disabled',true);
    $('.disabledBtnEdit').css('background-color','#b2b2b2');
    $('.disabledBtnEditResp').attr('disabled',true);
    $('.disabledBtnEditResp').css('background-color','#f7f7f7');
    }else  if(objNewPA.Estado_PlanId === 1){
        $('.showBtnEdit').hide();
        $('.noShowBtnEdit').show();
        }
    
}else{
    $('.showBtnEdit').hide();
    $('.noShowBtnEdit').show();
    

}

}//------------------------------------- fini   fnSp3agregaObjetivoSubojetivo() -------------------------------------


function AgregarinformacionObjActividad(tipo,value, nobjj, nsobjj,nactt,idinput)
{
   //console.log(tipo,value, nobjj, nsobjj,nactt);
    switch (tipo) {
        case 1:
            if(istSobj == null)//es un objetivo
            {
                objNewPA.Objetivos[nobjj].Actividades[nactt].Actividad_Name = value;
            }
            else
            {//es un subobjetivo
               
                objNewPA.Objetivos[nobjj].SubObjetivos[nsobjj].Actividades[nactt].Actividad_Name = value;
            }
            break;
    
        case 2:
            if(istSobj == null)//es un objetivo
            {
                objNewPA.Objetivos[nobjj].Actividades[nactt].Peso = value;

            }
            else
            {//es un subobjetivo
               
                objNewPA.Objetivos[nobjj].SubObjetivos[nsobjj].Actividades[nactt].Peso = value;

            }
            break;
    }





}


function registraActividadNueva(idele, tipo,pos)
{


    if(istSobj == null)//es un objetivo
         {
             ty = 0;

             var i = objNewPA.Objetivos[istObj].Actividades.length-1;
             if(tipo == 'actividad')
             {
                objNewPA.Objetivos[istObj].Actividades[i].Actividad_Name = $('#'+idele).val();
               //console.log('xtx:[', objNewPA.Objetivos[istObj].Actividades[i].Actividad_Name);
             }
             else
             {
                 if(tipo == 'peso')
                    {
                        var PesoTotal =0;
                        objNewPA.Objetivos[istObj].Actividades[pos].Peso = 0;
                        // for (let index = 0; index < objNewPA.Objetivos[istObj].Actividades.length; index++) {
                        //     if( parseInt(objNewPA.Objetivos[istObj].Actividades[index].Peso) > 0){
                        //         PesoTotal = parseInt(PesoTotal) + parseInt(objNewPA.Objetivos[istObj].Actividades[index].Peso);                    
                        //     }
                        for (let r = 0; r < objNewPA.Objetivos.length; r++) {                       
                        

                            for (let index = 0; index < objNewPA.Objetivos[r].Actividades.length; index++) {
                                if( parseInt(objNewPA.Objetivos[r].Actividades[index].Peso) > 0){
                                    PesoTotal = parseInt(PesoTotal) + parseInt(objNewPA.Objetivos[r].Actividades[index].Peso);                    
                                }
    
                            }
                            console.log(objNewPA.Objetivos[r].SubObjetivos.length)
                            if(objNewPA.Objetivos[r].SubObjetivos.length>0){
                            for (let so = 0; so < objNewPA.Objetivos[r].SubObjetivos.length; so++) {
                                for (let index2 = 0; index2 < objNewPA.Objetivos[r].SubObjetivos[so].Actividades.length; index2++) {
                                    //console.log(PesoTotal)
                                     if( parseInt(objNewPA.Objetivos[r].SubObjetivos[so].Actividades[index2].Peso) > 0){
                                         PesoTotal = parseInt(PesoTotal) + parseInt(objNewPA.Objetivos[r].SubObjetivos[so].Actividades[index2].Peso);                    
                                     }
                                 }
                                
                            }
                        }
                        }
                           //console.log(PesoTotal)

                        
                       //console.log("total=  "+PesoTotal)

                        var restante = 100-(parseInt(PesoTotal));
                                    var sn = /^[0-9]+$/;
                                    var ppeso = $('#'+idele).val();
                                    ppeso = parseInt(ppeso);

                                    if($('#'+idele).val().match(sn))
                                    {
                                        //if(ppeso > 100){ppeso = 100; $('#'+idele).val('100');}
                                        if(ppeso > restante){ppeso = restante; $('#'+idele).val(restante);
                                        $("#addActividadObjetivoPlan").attr('disabled',true);
                                        $("#btAgrObjetivo").attr('disabled',true);}
                                        else{
                                            $("#addActividadObjetivoPlan").attr('disabled',false);
                                            $("#btAgrObjetivo").attr('disabled',false);
                                            }
                                    }
                                    else
                                    {
                                        $('#'+idele).val('');
                                       //console.log('HAY LETRAS = '+$('#'+idele).val());
                                    }
                                  //  objNewPA.Objetivos[istObj].Actividades[i].Peso = ppeso
                                    //console.log('UUUUUU:[', objNewPA.Objetivos[istObj].Actividades[i].Peso);
    
                    }
             }
             
         }
         else
         {//es un subobjetivo
             var i = objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades.length-1;

              if(tipo == 'actividad')
                {
                    objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[i].Actividad_Name = $('#'+idele).val();
                    //console.log('xtx:[',  objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[i].Actividad_Name);
                }
            else
                {
                    if(tipo == 'peso')
                    {
                        var PesoTotal =0;
                        objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[pos].Peso = 0
                        // for (let index = 0; index < objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades.length; index++) {
                        //    //console.log(PesoTotal)
                        //     if( parseInt(objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[index].Peso) > 0){
                        //         PesoTotal = parseInt(PesoTotal) + parseInt(objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[index].Peso);                    
                        //     }
                        // }
                        for (let r = 0; r < objNewPA.Objetivos.length; r++) {                       
                        

                            for (let index = 0; index < objNewPA.Objetivos[r].Actividades.length; index++) {
                                if( parseInt(objNewPA.Objetivos[r].Actividades[index].Peso) > 0){
                                    PesoTotal = parseInt(PesoTotal) + parseInt(objNewPA.Objetivos[r].Actividades[index].Peso);                    
                                }
    
                            }
                            if(objNewPA.Objetivos[r].SubObjetivos.length>0){

                            for (let so = 0; so < objNewPA.Objetivos[r].SubObjetivos.length; so++) {
                                for (let index2 = 0; index2 < objNewPA.Objetivos[r].SubObjetivos[so].Actividades.length; index2++) {
                                    //console.log(PesoTotal)
                                     if( parseInt(objNewPA.Objetivos[r].SubObjetivos[so].Actividades[index2].Peso) > 0){
                                        PesoTotal = parseInt(PesoTotal) + parseInt(objNewPA.Objetivos[r].SubObjetivos[so].Actividades[index2].Peso);                                     }
                                 }
                                
                            }
                        }
                        }
                       //console.log("total  "+PesoTotal)

                        var restante = 100-(parseInt(PesoTotal));
                         //console.log('UUUUUI:[',  objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[i].Peso);



                                   var sn = /^[0-9]+$/;
                                    var ppeso = $('#'+idele).val();
                                    ppeso = parseInt(ppeso);

                                    if($('#'+idele).val().match(sn))
                                    {
                                        //if(ppeso > restante){ppeso = 100; $('#'+idele).val(restante);}
                                        if(ppeso > restante){ppeso = restante; $('#'+idele).val(restante);
                                        $("#addActividadObjetivoPlan").attr('disabled',true);
                                        $("#btAgrObjetivo").attr('disabled',true);}
                                        else{
                                            $("#addActividadObjetivoPlan").attr('disabled',false);
                                            $("#btAgrObjetivo").attr('disabled',false);
                                            }
                                    }
                                    else
                                    {
                                        $('#'+idele).val('');
                                       //console.log('HAY LETRAS = '+$('#'+idele).val());
                                    }
                                    //objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[i].Peso = ppeso


                            


                    }
                }

             
         }

         

}


function registraActividadNuevaEditar(idele, tipo,pos)
{


    if(istSobj == null)//es un objetivo
         {
             ty = 0;

             var i = objNewPA.Objetivos[istObj].Actividades.length-1;
             if(tipo == 'actividad')
             {
                objNewPA.Objetivos[istObj].Actividades[i].Actividad_Name = $('#'+idele).val();
               //console.log('xtx:[', objNewPA.Objetivos[istObj].Actividades[i].Actividad_Name);
             }
             else
             {
                 if(tipo == 'peso')
                    {
                        var PesoTotal =0;
                        objNewPA.Objetivos[istObj].Actividades[pos].Peso = 0;

                        for (let r = 0; r < objNewPA.Objetivos.length; r++) {                       
                        

                        for (let index = 0; index < objNewPA.Objetivos[r].Actividades.length; index++) {
                            if( parseInt(objNewPA.Objetivos[r].Actividades[index].Peso) > 0){
                                PesoTotal = parseInt(PesoTotal) + parseInt(objNewPA.Objetivos[r].Actividades[index].Peso);                    
                            }

                        }
                        if(objNewPA.Objetivos[r].SubObjetivos.length>0){

                        for (let so = 0; so < objNewPA.Objetivos[r].SubObjetivos.length; so++) {
                            for (let index2 = 0; index2 < objNewPA.Objetivos[r].SubObjetivos[so].Actividades.length; index2++) {
                                //console.log(PesoTotal)
                                 if( parseInt(objNewPA.Objetivos[r].SubObjetivos[so].Actividades[index2].Peso) > 0){
                                    PesoTotal = parseInt(PesoTotal) + parseInt(objNewPA.Objetivos[r].SubObjetivos[so].Actividades[index2].Peso);                                 }
                             }
                            
                        }
                    }
                    }





                        var restante = 100-(parseInt(PesoTotal));
                                    var sn = /^[0-9]+$/;
                                    var ppeso = $('#'+idele).val();
                                    ppeso = parseInt(ppeso);

                                    if($('#'+idele).val().match(sn))
                                    {
                                        //if(ppeso > 100){ppeso = 100; $('#'+idele).val('100');}
                                        if(ppeso > restante){ppeso = restante; $('#'+idele).val(restante);
                                        $("#addActividadObjetivoPlan").attr('disabled',true);
                                        $("#btAgrObjetivo").attr('disabled',true);}
                                        else{
                                            $("#addActividadObjetivoPlan").attr('disabled',false);
                                            $("#btAgrObjetivo").attr('disabled',false);
                                            }
                                    }
                                    else
                                    {
                                        $('#'+idele).val('');
                                       //console.log('HAY LETRAS = '+$('#'+idele).val());
                                    }
                                  //  objNewPA.Objetivos[istObj].Actividades[i].Peso = ppeso
                                    //console.log('UUUUUU:[', objNewPA.Objetivos[istObj].Actividades[i].Peso);
                            
                    }
             }
             
         }
         else
         {//es un subobjetivo
             var i = objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades.length-1;

              if(tipo == 'actividad')
                {
                    objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[i].Actividad_Name = $('#'+idele).val();
                    //console.log('xtx:[',  objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[i].Actividad_Name);
                }
            else
                {
                    if(tipo == 'peso')
                    {
                        var PesoTotal =0;
                        objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[pos].Peso = 0
                        // for (let index = 0; index < objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades.length; index++) {
                        //    //console.log(PesoTotal)
                        //     if( parseInt(objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[index].Peso) > 0){
                        //         PesoTotal = parseInt(PesoTotal) + parseInt(objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[index].Peso);                    
                        //     }
                        // }

                        for (let r = 0; r < objNewPA.Objetivos.length; r++) {                       
                        

                            for (let index = 0; index < objNewPA.Objetivos[r].Actividades.length; index++) {
                                if( parseInt(objNewPA.Objetivos[r].Actividades[index].Peso) > 0){
                                    PesoTotal = parseInt(PesoTotal) + parseInt(objNewPA.Objetivos[r].Actividades[index].Peso);                    
                                }
    
                            }
                            if(objNewPA.Objetivos[r].SubObjetivos.length>0){

                            for (let so = 0; so < objNewPA.Objetivos[r].SubObjetivos.length; so++) {
                                for (let index2 = 0; index2 < objNewPA.Objetivos[r].SubObjetivos[so].Actividades.length; index2++) {
                                    //console.log(PesoTotal)
                                     if( parseInt(objNewPA.Objetivos[r].SubObjetivos[so].Actividades[index2].Peso) > 0){
                                        PesoTotal = parseInt(PesoTotal) + parseInt(objNewPA.Objetivos[r].SubObjetivos[so].Actividades[index2].Peso);                                     }
                                 }
                                
                            }
                        }
                    }
    
                       //console.log("total  "+PesoTotal)

                        var restante = 100-(parseInt(PesoTotal));
                         //console.log('UUUUUI:[',  objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[i].Peso);



                                   var sn = /^[0-9]+$/;
                                    var ppeso = $('#'+idele).val();
                                    ppeso = parseInt(ppeso);

                                    if($('#'+idele).val().match(sn))
                                    {
                                        //if(ppeso > restante){ppeso = 100; $('#'+idele).val(restante);}
                                        if(ppeso > restante){ppeso = restante; $('#'+idele).val(restante); 
                                        $("#addActividadObjetivoPlan").attr('disabled',true);
                                        $("#btAgrObjetivo").attr('disabled',true);}
                                        else{
                                            $("#addActividadObjetivoPlan").attr('disabled',false);
                                            $("#btAgrObjetivo").attr('disabled',false);
                                            }
                                    }
                                    else
                                    {
                                        $('#'+idele).val('');
                                       //console.log('HAY LETRAS = '+$('#'+idele).val());
                                    }
                                    //objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[i].Peso = ppeso



                            

                    }
                }

             
         }

         

}


function fnSp3NuevasActividadesObjetivoPlan(ided,idPadre,tipo,posobject)
{//------------------------------------- ini   fnSp3EditarPlanAnual() -------------------------------------
    vw_principal.init();//para reiniciar tokes del buscador de nombres ************ ResponsableName
console.log(ided,idPadre,tipo,posobject)
//$("#Sp3VentanaPlanAnualEditView").modal("show").addClass("fade");
$('#Sp3VentanaPlanAnualEditView').modal('hide').removeClass('fade');
$("#Sp3VentanActividadPlan").modal("show").addClass("fade");
$("#ResponsableName").val('');
//alert('accPlanAnual = '+ided)
//limpiamos la tabla
       console.log(objNewPA.Objetivos[ided])
         if(accPlanAnual == 0)
            {
              //  if(tipo ==1) //objetivo
              if( idPadre === undefined) //objetivo
                {
                        var pos = (ided-1);
                        var nn = ided+1;
                        var title = "Ingresar Actividades - Objetivo "+ nn +": "+ objNewPA.Objetivos[ided].Objetivo_Name+"";
                        //var title = "Ingresar Actividades - Objetivo "+ nn +": "+ objNewPA.Objetivos[pos].Objetivo_Name+"";
                        $("#lbTitleActividadPlanAnual").html(title);
                        $('#body-tabla-list-EvalAud2').html("     "); 
                        istObj = ided;
                        istSobj = null;
                        //alert(istSobj);
                        //vamos a verificar si existen activiaddes para esta Actividad
                        var n = objNewPA.Objetivos[ided].Actividades.length;
                        $("#contadorActList").html(n)
                      //  var n = objNewPA.Objetivos[pos].Actividades.length;
                        for (var i = 0; i<n; i++)
                        {
                            
                            fnSp3agregaActividadObjetivoPlan(i, ided, objNewPA.Objetivos[ided].Actividades[i])
                           // fnSp3agregaActividadObjetivoPlan(i, objNewPA.Objetivos[pos].Code, objNewPA.Objetivos[pos].Actividades[i])
                            // $('#'+'itemAct'+i).css('background-color','#f2f2f2');
                            // $('#'+'itemPeso'+i).css('background-color','#f2f2f2');
                            // $('#'+'PaResponsableName'+i).css('background-color','#f2f2f2');

                            $('#'+'itemAct'+i).css('background-color','#fff');
                            $('#'+'itemPeso'+i).css('background-color','#fff');
                            $('#'+'PaResponsableName'+i).css('background-color','#fff');
                            

                        }
                        
                       

                }
                else 
               // if(tipo == 0)//subobjetivo
               if( idPadre >= 0)
                {
                        //alert('aaaaaaaaaaaaaaaaaaaaaaaaaa un subobjetivo');
                        var n1 = idPadre+1;
                        var nn = ided+1; 
                        nn = n1+'.'+nn;
                       // nn = idPadre+':'+nn;
                   //     var pos = (ided-1);
                   var pos_ord = idPadre+"_"+ided

                  console.log(ided, objNewPA.Objetivos[idPadre].SubObjetivos )

                  istObj = idPadre;
                 // istSobj = ided-1;
                 istSobj = ided;
                        var title = "Ingresar Actividades - SubObjetivo "+ nn +":  "+ objNewPA.Objetivos[idPadre].SubObjetivos[istSobj].SubObjetivo_Name+"";
                     //   var title = "Ingresar Actividades - SubObjetivo "+ nn +"  "+ objNewPA.Objetivos[idPadre].SubObjetivos[pos].SubObjetivo_Name+"";
                        $("#lbTitleActividadPlanAnual").html(title);
                        $('#body-tabla-list-EvalAud2').html("     "); 

                     var n = objNewPA.Objetivos[idPadre].SubObjetivos[istSobj].Actividades.length;
                     $("#contadorActList").html(n)

                        //var n = objNewPA.Objetivos[idPadre].SubObjetivos[pos].Actividades.length;
                        for (var i = 0; i<n; i++)
                        {
                            
                            fnSp3agregaActividadObjetivoPlan(i, pos_ord, objNewPA.Objetivos[idPadre].SubObjetivos[istSobj].Actividades[i])
                           // fnSp3agregaActividadObjetivoPlan(i, objNewPA.Objetivos[idPadre].SubObjetivos[pos].Code, objNewPA.Objetivos[idPadre].SubObjetivos[pos].Actividades[i])
                            // $('#'+'itemAct'+i).css('background-color','#f2f2f2');
                            // $('#'+'itemPeso'+i).css('background-color','#f2f2f2');
                            // $('#'+'PaResponsableName'+i).css('background-color','#f2f2f2');

                            $('#'+'itemAct'+i).css('background-color','#fff');
                            $('#'+'itemPeso'+i).css('background-color','#fff');
                            $('#'+'PaResponsableName'+i).css('background-color','#fff');
                            

                        }
                }
            }
            else
            {
                //console.log(paObj[posobject],ided,idPadre,tipo,posobject)

                              //  if(tipo ==1) //objetivo
              if( idPadre === undefined) //objetivo
              { console.log('....')
                      var pos = (ided-1);
                      var nn = ided+1;
                      var title = "Ingresar Actividades - Objetivo "+ nn +": "+ objNewPA.Objetivos[ided].Objetivo_Name+"";
                      //var title = "Ingresar Actividades - Objetivo "+ nn +": "+ objNewPA.Objetivos[pos].Objetivo_Name+"";
                      $("#lbTitleActividadPlanAnual").html(title);
                      $('#body-tabla-list-EvalAud2').html("     "); 
                      istObj = ided;
                      istSobj = null;
                      //alert(istSobj);
                      
                      //vamos a verificar si existen activiaddes para esta Actividad
                      var n = objNewPA.Objetivos[ided].Actividades.length;
                      $("#contadorActList").html(n)

                    //  var n = objNewPA.Objetivos[pos].Actividades.length;
                      for (var i = 0; i<n; i++)
                      {
                          
                          fnSp3agregaActividadObjetivoPlan(i, ided, objNewPA.Objetivos[ided].Actividades[i],posobject)
                         // fnSp3agregaActividadObjetivoPlan(i, objNewPA.Objetivos[pos].Code, objNewPA.Objetivos[pos].Actividades[i])
                          // $('#'+'itemAct'+i).css('background-color','#f2f2f2');
                          // $('#'+'itemPeso'+i).css('background-color','#f2f2f2');
                          // $('#'+'PaResponsableName'+i).css('background-color','#f2f2f2');

                          $('#'+'itemAct'+i).css('background-color','#fff');
                          $('#'+'itemPeso'+i).css('background-color','#fff');
                          $('#'+'PaResponsableName'+i).css('background-color','#fff');
                          

                      }
                      
                     

              }
              else {

              
             // if(tipo == 0)//subobjetivo
             if( idPadre >= 0)
              {
                      //alert('aaaaaaaaaaaaaaaaaaaaaaaaaa un subobjetivo');
                      var n1 = idPadre+1;
                      var nn = ided+1; 
                      nn = n1+'.'+nn;
                     // nn = idPadre+':'+nn;
                 //     var pos = (ided-1);
                 var pos_ord = idPadre+"_"+ided

                //console.log(ided, objNewPA.Objetivos[idPadre])


                      var title = "Ingresar Actividades - SubObjetivo "+ nn +":  "+ objNewPA.Objetivos[idPadre].SubObjetivos[ided].SubObjetivo_Name+"";
                   //   var title = "Ingresar Actividades - SubObjetivo "+ nn +"  "+ objNewPA.Objetivos[idPadre].SubObjetivos[pos].SubObjetivo_Name+"";
                      $("#lbTitleActividadPlanAnual").html(title);
                      $('#body-tabla-list-EvalAud2').html("     "); 
                      istObj = idPadre;
                      istSobj = ided;

                   var n = objNewPA.Objetivos[idPadre].SubObjetivos[ided].Actividades.length;
                   $("#contadorActList").html(n)

                      //var n = objNewPA.Objetivos[idPadre].SubObjetivos[pos].Actividades.length;
                      for (var i = 0; i<n; i++)
                      {
                          
                          fnSp3agregaActividadObjetivoPlan(i, pos_ord, objNewPA.Objetivos[idPadre].SubObjetivos[ided].Actividades[i])
                         // fnSp3agregaActividadObjetivoPlan(i, objNewPA.Objetivos[idPadre].SubObjetivos[pos].Code, objNewPA.Objetivos[idPadre].SubObjetivos[pos].Actividades[i])
                          // $('#'+'itemAct'+i).css('background-color','#f2f2f2');
                          // $('#'+'itemPeso'+i).css('background-color','#f2f2f2');
                          // $('#'+'PaResponsableName'+i).css('background-color','#f2f2f2');

                          $('#'+'itemAct'+i).css('background-color','#fff');
                          $('#'+'itemPeso'+i).css('background-color','#fff');
                          $('#'+'PaResponsableName'+i).css('background-color','#fff');
                          

                      }
              }
            }
                // var title = "Ingresar Actividades - SubObjetivo "+ 1 +" aaaaaaaaaaaaa "+ +"";
                // $("#lbTitleActividadPlanAnual").html(title);

            }
            




  //$('#body-tabla-list-EvalAud2').html(" ");
  
  $("#ResponsableName").val('');
getPersonResponsable($("#ResponsableName"),1);

if(accPlanAnual == 1)
{
    if(objNewPA.Estado_PlanId === 2){
    $('.showBtnEdit').show();
    $('.noShowBtnEdit').hide();
    $('.disabledBtnEdit').attr('disabled',true);
    $('.disabledBtnEdit').css('background-color','#b2b2b2');
    $('.disabledBtnEditResp').attr('disabled',true);
    $('.disabledBtnEditResp').css('background-color','#f7f7f7');
    }else  if(objNewPA.Estado_PlanId === 1){
        $('.showBtnEdit').hide();
        $('.noShowBtnEdit').show();
        }
    
}else{
    $('.showBtnEdit').hide();
    $('.noShowBtnEdit').show();
    

}
}//------------------------------------- ini   fnSp3EditarPlanAnual() -------------------------------------


function fnSp3NuevasActividadesObjetivoPlanEditar(ided,idPadre,tipo,posobject,Id)
{//------------------------------------- ini   fnSp3EditarPlanAnual() -------------------------------------
    vw_principal.init();//para reiniciar tokes del buscador de nombres ************ ResponsableName

 
//$("#Sp3VentanaPlanAnualEditView").modal("show").addClass("fade");
$('#Sp3VentanaPlanAnualEditView').modal('hide').removeClass('fade');
$("#Sp3VentanActividadPlan").modal("show").addClass("fade");
$("#ResponsableName").val('');
//alert('accPlanAnual = '+ided)
//limpiamos la tabla
      //console.log(accPlanAnual)
         if(accPlanAnual == 0)
            {
              //  if(tipo ==1) //objetivo
              if( idPadre === undefined) //objetivo
                {
                        var pos = (ided-1);
                        var nn = ided+1;
                        var title = "Ingresar Actividades - Objetivo "+ nn +": "+ objNewPA.Objetivos[ided].Objetivo_Name+"";
                        //var title = "Ingresar Actividades - Objetivo "+ nn +": "+ objNewPA.Objetivos[pos].Objetivo_Name+"";
                        $("#lbTitleActividadPlanAnual").html(title);
                        $('#body-tabla-list-EvalAud2').html("     "); 
                        istObj = ided;
                        istSobj = null;
                        //alert(istSobj);
                        
                        //vamos a verificar si existen activiaddes para esta Actividad
                        var n = objNewPA.Objetivos[ided].Actividades.length;
                        $("#contadorActList").html(n)
                      //  var n = objNewPA.Objetivos[pos].Actividades.length;
                        for (var i = 0; i<n; i++)
                        {
                           //console.log(i, ided, objNewPA.Objetivos[ided].Actividades[i])
                            fnSp3agregaActividadObjetivoPlanEditar(i, ided, objNewPA.Objetivos[ided].Actividades[i])
                           // fnSp3agregaActividadObjetivoPlan(i, objNewPA.Objetivos[pos].Code, objNewPA.Objetivos[pos].Actividades[i])
                            // $('#'+'itemAct'+i).css('background-color','#f2f2f2');
                            // $('#'+'itemPeso'+i).css('background-color','#f2f2f2');
                            // $('#'+'PaResponsableName'+i).css('background-color','#f2f2f2');

                            $('#'+'itemAct'+i).css('background-color','#fff');
                            $('#'+'itemPeso'+i).css('background-color','#fff');
                            $('#'+'PaResponsableName'+i).css('background-color','#fff');
                            

                        }
                        
                       

                }
                else 
               // if(tipo == 0)//subobjetivo
               if( idPadre >= 0)
                {
                        //alert('aaaaaaaaaaaaaaaaaaaaaaaaaa un subobjetivo');
                        var n1 = idPadre+1;
                        var nn = ided+1; 
                        nn = n1+'.'+nn;
                       // nn = idPadre+':'+nn;
                   //     var pos = (ided-1);
                   var pos_ord = idPadre+"_"+ided

                  //console.log(ided, objNewPA.Objetivos[idPadre])


                        var title = "Ingresar Actividades - SubObjetivo "+ nn +":  "+ objNewPA.Objetivos[idPadre].SubObjetivos[ided].SubObjetivo_Name+"";
                     //   var title = "Ingresar Actividades - SubObjetivo "+ nn +"  "+ objNewPA.Objetivos[idPadre].SubObjetivos[pos].SubObjetivo_Name+"";
                        $("#lbTitleActividadPlanAnual").html(title);
                        $('#body-tabla-list-EvalAud2').html("     "); 
                        istObj = idPadre;
                        istSobj = ided;

                     var n = objNewPA.Objetivos[idPadre].SubObjetivos[ided].Actividades.length;
                     $("#contadorActList").html(n)

                        //var n = objNewPA.Objetivos[idPadre].SubObjetivos[pos].Actividades.length;
                        for (var i = 0; i<n; i++)
                        {
                            
                            fnSp3agregaActividadObjetivoPlan(i, pos_ord, objNewPA.Objetivos[idPadre].SubObjetivos[ided].Actividades[i])
                           // fnSp3agregaActividadObjetivoPlan(i, objNewPA.Objetivos[idPadre].SubObjetivos[pos].Code, objNewPA.Objetivos[idPadre].SubObjetivos[pos].Actividades[i])
                            // $('#'+'itemAct'+i).css('background-color','#f2f2f2');
                            // $('#'+'itemPeso'+i).css('background-color','#f2f2f2');
                            // $('#'+'PaResponsableName'+i).css('background-color','#f2f2f2');

                            $('#'+'itemAct'+i).css('background-color','#fff');
                            $('#'+'itemPeso'+i).css('background-color','#fff');
                            $('#'+'PaResponsableName'+i).css('background-color','#fff');
                            

                        }
                }
            }
            else
            {
                //console.log(paObj[posobject],ided,idPadre,tipo,posobject)

                              //  if(tipo ==1) //objetivo
              if( idPadre === undefined) //objetivo
              {
                istObj= ided;//contiene el id del objetivo actual trabajado
                istSobj= undefined;//contiene el id del subobjetivo actual trabajado
              
                      var pos = (ided-1);
                      var nn = ided+1;
                      var title = "Ingresar Actividades - Objetivo "+ nn +": "+ objNewPA.Objetivos[ided].Objetivo_Name+"";
                      //var title = "Ingresar Actividades - Objetivo "+ nn +": "+ objNewPA.Objetivos[pos].Objetivo_Name+"";
                      $("#lbTitleActividadPlanAnual").html(title);
                      $('#body-tabla-list-EvalAud2').html("     "); 
                      istObj = ided;
                      istSobj = null;
                      //alert(istSobj);
                      
                      //vamos a verificar si existen activiaddes para esta Actividad
                      var n = objNewPA.Objetivos[ided].Actividades.length;
                      $("#contadorActList").html(n)

                    //  var n = objNewPA.Objetivos[pos].Actividades.length;
                      for (var i = 0; i<n; i++)
                      {
                          
                        fnSp3agregaActividadObjetivoPlanEditar(i, ided, objNewPA.Objetivos[ided].Actividades[i],posobject)
                         // fnSp3agregaActividadObjetivoPlan(i, objNewPA.Objetivos[pos].Code, objNewPA.Objetivos[pos].Actividades[i])
                          // $('#'+'itemAct'+i).css('background-color','#f2f2f2');
                          // $('#'+'itemPeso'+i).css('background-color','#f2f2f2');
                          // $('#'+'PaResponsableName'+i).css('background-color','#f2f2f2');

                          $('#'+'itemAct'+i).css('background-color','#fff');
                          $('#'+'itemPeso'+i).css('background-color','#fff');
                          $('#'+'PaResponsableName'+i).css('background-color','#fff');
                          

                      }
                      
                     

              }
              else 
             // if(tipo == 0)//subobjetivo
             if( idPadre >= 0)
              {
                istObj= idPadre;//contiene el id del objetivo actual trabajado
                istSobj= ided;//contiene el id del subobjetivo actual trabajado
                      //alert('aaaaaaaaaaaaaaaaaaaaaaaaaa un subobjetivo');
                      var n1 = idPadre+1;
                      var nn = ided+1; 
                      nn = n1+'.'+nn;
                     // nn = idPadre+':'+nn;
                 //     var pos = (ided-1);
                 var pos_ord = idPadre+"_"+ided

                //console.log(ided, objNewPA.Objetivos[idPadre])


                      var title = "Ingresar Actividades - SubObjetivo "+ nn +":  "+ objNewPA.Objetivos[idPadre].SubObjetivos[ided].SubObjetivo_Name+"";
                   //   var title = "Ingresar Actividades - SubObjetivo "+ nn +"  "+ objNewPA.Objetivos[idPadre].SubObjetivos[pos].SubObjetivo_Name+"";
                      $("#lbTitleActividadPlanAnual").html(title);
                      $('#body-tabla-list-EvalAud2').html("     "); 
                      istObj = idPadre;
                      istSobj = ided;

                   var n = objNewPA.Objetivos[idPadre].SubObjetivos[ided].Actividades.length;
                   $("#contadorActList").html(n)

                      //var n = objNewPA.Objetivos[idPadre].SubObjetivos[pos].Actividades.length;
                      for (var i = 0; i<n; i++)
                      {
                          
                        fnSp3agregaActividadObjetivoPlanEditar(i, pos_ord, objNewPA.Objetivos[idPadre].SubObjetivos[ided].Actividades[i])
                         // fnSp3agregaActividadObjetivoPlan(i, objNewPA.Objetivos[idPadre].SubObjetivos[pos].Code, objNewPA.Objetivos[idPadre].SubObjetivos[pos].Actividades[i])
                          // $('#'+'itemAct'+i).css('background-color','#f2f2f2');
                          // $('#'+'itemPeso'+i).css('background-color','#f2f2f2');
                          // $('#'+'PaResponsableName'+i).css('background-color','#f2f2f2');

                          $('#'+'itemAct'+i).css('background-color','#fff');
                          $('#'+'itemPeso'+i).css('background-color','#fff');
                          $('#'+'PaResponsableName'+i).css('background-color','#fff');
                          

                      }
              }

              //  var title = "Ingresar Actividades - SubObjetivo "+ 1 +" aaaaaaaaaaaaa "+ +"";
                $("#lbTitleActividadPlanAnual").html(title);

            }
            




  //$('#body-tabla-list-EvalAud2').html(" ");
  
  $("#ResponsableName").val('');
getPersonResponsable($("#ResponsableName"),1);
if(accPlanAnual == 1)
{
    if(objNewPA.Estado_PlanId === 2){
    $('.showBtnEdit').show();
    $('.noShowBtnEdit').hide();
    $('.disabledBtnEdit').attr('disabled',true);
    $('.disabledBtnEdit').css('background-color','#b2b2b2');
    $('.disabledBtnEditResp').attr('disabled',true);
    $('.disabledBtnEditResp').css('background-color','#f7f7f7');
    }else  if(objNewPA.Estado_PlanId === 1){
        $('.showBtnEdit').hide();
        $('.noShowBtnEdit').show();
        }
    
}else{
    $('.showBtnEdit').hide();
    $('.noShowBtnEdit').show();
    

}

}//------------------------------------- ini   fnSp3EditarPlanAnual() -------------------------------------



function fnSp3CerrarNuevasActividadesPlan()
{//------------------------------------- ini   fnSp3CerrarNuevasTareasActividadesPlan() -------------------------------------
console.log(objNewPA.Objetivos[istObj].Actividades)
var flag_filaEmpty = 0;
if(istSobj==null){
    if(objNewPA.Objetivos[istObj].Actividades.length > 0 )
    {
        for (let r = 0; r < objNewPA.Objetivos[istObj].Actividades.length; r++) {
            var check_Peso = objNewPA.Objetivos[istObj].Actividades[r].Peso;
            var check_ActName = objNewPA.Objetivos[istObj].Actividades[r].Actividad_Name;
            var check_RespName = objNewPA.Objetivos[istObj].Actividades[r].ResponsableName;

            if(check_Peso == 0)
            {
                $("#itemPeso"+r).focus();
                r = objNewPA.Objetivos[istObj].Actividades.length;
                flag_filaEmpty = 1;
            }

            if(check_RespName === undefined)
            {
           $("#PaResponsableName"+r).focus();
                r = objNewPA.Objetivos[istObj].Actividades.length;
                flag_filaEmpty = 1;
        }else{
                
                if(check_RespName === "")
                {
                    $("#PaResponsableName"+r).focus();
                    r = objNewPA.Objetivos[istObj].Actividades.length;
                    flag_filaEmpty = 1;
                }
            }

            if(check_ActName === undefined)
            {
                $("#itemAct"+r).focus();
                r = objNewPA.Objetivos[istObj].Actividades.length;
                flag_filaEmpty = 1;
        }else{
                
                if(check_ActName === "")
                {
                    $("#itemAct"+r).focus();
                    r = objNewPA.Objetivos[istObj].Actividades.length;
                    flag_filaEmpty = 1;
                }
            }

            if(flag_filaEmpty == 0){
               //console.log("....")

            if(objNewPA.Objetivos[istObj].Actividades[r].Cronogramas != undefined)
            {
                if(objNewPA.Objetivos[istObj].Actividades[r].Cronogramas.length > 0)
                {
                if(objNewPA.Objetivos[istObj].Actividades[r].Tareas != undefined)
                {
                   //console.log("..SI..",objNewPA.Objetivos[istObj].Actividades[r].Tareas.length)

                  if(objNewPA.Objetivos[istObj].Actividades[r].Tareas.length > 0)
                 {
                   //console.log("..SI..SI..")

                    for (let d = 0; d < objNewPA.Objetivos[istObj].Actividades[r].Tareas.length; d++) {
                       //console.log("..SI..SI..FOR..")

                    //console.log(Object.keys(objNewPA.Objetivos[istObj].Actividades[r].Tareas[d]))
                        var check_inci = objNewPA.Objetivos[istObj].Actividades[r].Tareas[d].Evidencia_Name;
                       //console.log(check_inci)

                        if(check_inci === undefined || check_inci === "")
                        {
                            d = objNewPA.Objetivos[istObj].Actividades[r].Tareas.length;
                            fnSp3NuevasTareaActividadesPlanEditar(d)
                            r = objNewPA.Objetivos[istObj].Actividades.length;
                            flag_filaEmpty=2;

                        }
                        
                    }
                }else{
                    fnSp3NuevasTareaActividadesPlanEditar(r)
                    r = objNewPA.Objetivos[istObj].Actividades.length;
                    flag_filaEmpty=2;
                    
                }
            }   
            } 
        }
    }

        }

    }
}else{
    if(objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades.length > 0 )
{
    for (let r = 0; r < objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades.length; r++) {
        var check_Peso = objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[r].Peso;
        var check_ActName = objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[r].Actividad_Name;
        var check_RespName = objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[r].ResponsableName;

        if(check_Peso == 0)
        {
            $("#itemPeso"+r).focus();
            r = objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades.length;
            flag_filaEmpty = 1;
        }

        if(check_RespName === undefined)
        {
       $("#PaResponsableName"+r).focus();
            r = objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades.length;
            flag_filaEmpty = 1;
    }else{
            
            if(check_RespName === "")
            {
                $("#PaResponsableName"+r).focus();
                r = objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades.length;
                flag_filaEmpty = 1;
            }
        }

        if(check_ActName === undefined)
        {
            $("#itemAct"+r).focus();
            r = objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades.length;
            flag_filaEmpty = 1;
    }else{
            
            if(check_ActName === "")
            {
                $("#itemAct"+r).focus();
                r = objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades.length;
                flag_filaEmpty = 1;
            }
        }

        if(flag_filaEmpty == 0){
           //console.log("....")

        if(objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[r].Cronogramas != undefined)
        {
            if(objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[r].Cronogramas.length > 0)
            {
            if(objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[r].Tareas != undefined)
            {
               //console.log("..SI..",objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[r].Tareas.length)

              if(objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[r].Tareas.length > 0)
             {
               //console.log("..SI..SI..")

                for (let d = 0; d < objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[r].Tareas.length; d++) {
                   //console.log("..SI..SI..FOR..")

                //console.log(Object.keys(objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[r].Tareas[d]))
                    var check_inci = objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[r].Tareas[d].Evidencia_Name;
                   //console.log(check_inci)

                    if(check_inci === undefined || check_inci === "")
                    {
                        d = objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[r].Tareas.length;
                        fnSp3NuevasTareaActividadesPlanEditar(d)
                        r = objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades.length;
                        flag_filaEmpty=2;

                    }
                    
                }
            }else{
                fnSp3NuevasTareaActividadesPlanEditar(r)
                r = objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades.length;
                flag_filaEmpty=2;
                
            }
        }   
        } 
    }
}

    }

}
}
    if(flag_filaEmpty == 0){
        $("#Sp3VentanActividadPlan").modal("hide").removeClass("fade");
        $("#Sp3VentanaPlanAnualEditView").modal("show").addClass("fade");
    }
    else if(flag_filaEmpty == 1){
        verModalError("","No puede dejar actividades vacias")
    }

}//------------------------------------- fin   fnSp3CerrarNuevasTareasActividadesPlan() -------------------------------------



function fnSp3EditarActividadPlanAnual(idActividad)
{//------------------------------------- ini   fnSp3agregaCronogramaActividadObjetivoPlan() -------------------------------------
    vw_principal.init();
    $("#Sp3VentanActividadPlan").modal("hide").removeClass("fade");
    $("#Sp3VentanaCambiarResponsable").modal("show").addClass("fade");

    if(istSobj == null)
    {
          //console.log(objNewPA.Objetivos[istObj].Actividades[idActividad])
           $("#txt_name_Actividad").val(objNewPA.Objetivos[istObj].Actividades[idActividad].Actividad_Name)
           $("#Actividad_PlanId").val(objNewPA.Objetivos[istObj].Actividades[idActividad].Id)

           $("#txt_Old_ResponsableName").val(objNewPA.Objetivos[istObj].Actividades[idActividad].ResponsableName)
           $("#txt_Old_ResponsableId").val(objNewPA.Objetivos[istObj].Actividades[idActividad].ResponsableId)
           $("#txt_Old_ResponsableCorreo").val(objNewPA.Objetivos[istObj].Actividades[idActividad].ResponsableCorreo)
           $("#txt_Old_ResponsableCargo").val(objNewPA.Objetivos[istObj].Actividades[idActividad].ResponsableCargo)

    }else{

       //console.log(objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[idActividad]  )

        $("#txt_name_Actividad").val(objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[idActividad].Actividad_Name)
        $("#Actividad_PlanId").val(objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[idActividad].Id)

        $("#txt_Old_ResponsableName").val(objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[idActividad].ResponsableName)
        $("#txt_Old_ResponsableId").val(objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[idActividad].ResponsableId)
        $("#txt_Old_ResponsableCorreo").val(objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[idActividad].ResponsableCorreo)
        $("#txt_Old_ResponsableCargo").val(objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[idActividad].ResponsableCargo)
    }

    $("#txt_New_ResponsableName").val('')
    istAct = idActividad;
    getNewResponsable($("#txt_New_ResponsableName"),1,1,istObj, istSobj, idActividad);
}//------------------------------------- ini   fnSp3agregaCronogramaActividadObjetivoPlan() -------------------------------------


function fnSp3EliminarActividadPlanAnual(idTarea)
{//------------------------------------- ini   fnSp3agregaCronogramaActividadObjetivoPlan() -------------------------------------
    swal({
        title: "Eliminar",
        text: "¿Desea eliminar la tarea?",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn-danger btn-sm btn-rounded rounded",
        cancelButtonClass: "btn-success btn-sm btn-rounded rounded",
        confirmButtonText: "Si",
        cancelButtonText: "No",
        closeOnConfirm: true,
        showLoaderOnConfirm: false
      },function(){ 
                  
    var check_Act = idTarea.split("_");
   //console.log(check_Act)
        if(check_Act.length === 3){
            objNewPA.Objetivos[check_Act[1]].Actividades.splice(check_Act[2],1)
            $('#'+idTarea).remove();
           //console.log(objNewPA.Objetivos[check_Act[1]].Actividades)
            if(objNewPA.Objetivos[check_Act[1]].Actividades.length>0){
                // for (let i = 0; i < objNewPA.Objetivos[check_Act[1]].Actividades.length; i++) {
                //     objNewPA.Objetivos[check_Act[1]].Actividades[i].Id=i;                            
                // }
                fnSp3ReordenarActividadesObjetivoPlan(check_Act[1],undefined,1)
            }
            $("#nAct_obj_"+(parseInt(check_Act[1])+1)).html(objNewPA.Objetivos[check_Act[1]].Actividades.length)
            $("#contadorActList").html(objNewPA.Objetivos[check_Act[1]].Actividades.length)

        }else{
            objNewPA.Objetivos[check_Act[1]].SubObjetivos[check_Act[2]].Actividades.splice(check_Act[3],1)
            $('#'+idTarea).remove();
            if(objNewPA.Objetivos[check_Act[1]].SubObjetivos[check_Act[2]].Actividades.length>0){
                // for (let i = 0; i < objNewPA.Objetivos[check_Act[1]].SubObjetivos[check_Act[2]].Actividades.length; i++) {
                //     objNewPA.Objetivos[check_Act[1]].SubObjetivos[check_Act[2]].Actividades[i].Id=i;
                // }
                fnSp3ReordenarActividadesObjetivoPlan(check_Act[2],check_Act[1],0)
            }
            $("#nAct_subobj_"+(parseInt(check_Act[1])+1)+"_"+(parseInt(check_Act[2])+1)).html(objNewPA.Objetivos[check_Act[1]].SubObjetivos[check_Act[2]].Actividades.length)
            $("#contadorActList").html(objNewPA.Objetivos[check_Act[1]].SubObjetivos[check_Act[2]].Actividades.length)
        }
  //console.log(objNewPA.Objetivos)
    })
}//------------------------------------- ini   fnSp3agregaCronogramaActividadObjetivoPlan() -------------------------------------


function fnSp3EliminarActividadPlanAnualEdit(idTarea)
{//------------------------------------- ini   fnSp3agregaCronogramaActividadObjetivoPlan() -------------------------------------
    swal({
        title: "Eliminar",
        text: "¿Desea eliminar la actividad?",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn-danger btn-sm btn-rounded rounded",
        cancelButtonClass: "btn-success btn-sm btn-rounded rounded",
        confirmButtonText: "Si",
        cancelButtonText: "No",
        closeOnConfirm: true,
        showLoaderOnConfirm: false
      },function(){ 
                  
    var check_Act = idTarea.split("_");
   console.log(check_Act)
        if(check_Act.length < 4){ 
            if(objNewPA.Objetivos[check_Act[1]].Actividades[check_Act[2]].Id != 0){
                fnSP3EliminarItemsPlanAnual(2,objNewPA.Objetivos[check_Act[1]].Actividades[check_Act[2]].Id)
            }
            objNewPA.Objetivos[check_Act[1]].Actividades.splice(check_Act[2],1)
            $('#'+idTarea).remove();
           //console.log(objNewPA.Objetivos[check_Act[1]].Actividades)
            if(objNewPA.Objetivos[check_Act[1]].Actividades.length>0){

                fnSp3ReordenarActividadesObjetivoPlan(check_Act[1],undefined,1)
            }
            $("#nAct_obj_"+(parseInt(check_Act[1])+1)).html(objNewPA.Objetivos[check_Act[1]].Actividades.length)
            $("#contadorActList").html(objNewPA.Objetivos[check_Act[1]].Actividades.length)

        }else{
            if(objNewPA.Objetivos[check_Act[1]].SubObjetivos[check_Act[2]].Actividades[check_Act[3]].Id != 0){
                fnSP3EliminarItemsPlanAnual(2,objNewPA.Objetivos[check_Act[1]].SubObjetivos[check_Act[2]].Actividades[check_Act[3]].Id)
            }
            objNewPA.Objetivos[check_Act[1]].SubObjetivos[check_Act[2]].Actividades.splice(check_Act[3],1)
            $('#'+idTarea).remove();
            if(objNewPA.Objetivos[check_Act[1]].SubObjetivos[check_Act[2]].Actividades.length>0){
                // for (let i = 0; i < objNewPA.Objetivos[check_Act[1]].SubObjetivos[check_Act[2]].Actividades.length; i++) {
                //     objNewPA.Objetivos[check_Act[1]].SubObjetivos[check_Act[2]].Actividades[i].Id=i;
                // }
                fnSp3ReordenarActividadesObjetivoPlan(check_Act[2],check_Act[1],0)
            }
            $("#nAct_subobj_"+(parseInt(check_Act[1])+1)+"_"+(parseInt(check_Act[2])+1)).html(objNewPA.Objetivos[check_Act[1]].SubObjetivos[check_Act[2]].Actividades.length)
                   $("#contadorActList").html(objNewPA.Objetivos[check_Act[1]].SubObjetivos[check_Act[2]].Actividades.length)
 }
    })
}//------------------------------------- ini   fnSp3agregaCronogramaActividadObjetivoPlan() -------------------------------------



function fnSp3ReordenarActividadesObjetivoPlan(ided,idPadre,tipo)
{//------------------------------------- ini   fnSp3EditarPlanAnual() -------------------------------------
    vw_principal.init();//para reiniciar tokes del buscador de nombres ************ ResponsableName

$("#Sp3VentanActividadPlan").modal("show").addClass("fade");
$("#ResponsableName").val('');
//alert(accPlanAnual+' accPlanAnual = '+ided)
//limpiamos la tabla
       //console.log(ided,idPadre,tipo)
         if(accPlanAnual == 0)
            {
              //  if(tipo ==1) //objetivo
              if( idPadre === undefined) //objetivo
                {
                        var pos = (ided-1);
                        var nn = ided+1; 
                        var title = "Ingresar Actividades - Objetivo "+ nn +": "+ objNewPA.Objetivos[ided].Objetivo_Name+"";
                        //var title = "Ingresar Actividades - Objetivo "+ nn +": "+ objNewPA.Objetivos[pos].Objetivo_Name+"";
                        $("#lbTitleActividadPlanAnual").html(title);
                        $('#body-tabla-list-EvalAud2').html("     "); 
                        istObj = ided;
                        istSobj = null;
                        //alert(istSobj);
                        
                        //vamos a verificar si existen activiaddes para esta Actividad
                        var n = objNewPA.Objetivos[ided].Actividades.length;
                      //  var n = objNewPA.Objetivos[pos].Actividades.length;
                        for (var i = 0; i<n; i++)
                        {
                            
                            fnSp3ReordenarActividadObjetivoPlan( i, ided, objNewPA.Objetivos[ided].Actividades[i])
                           // fnSp3agregaActividadObjetivoPlan(i, objNewPA.Objetivos[pos].Code, objNewPA.Objetivos[pos].Actividades[i])
                            // $('#'+'itemAct'+i).css('background-color','#f2f2f2');
                            // $('#'+'itemPeso'+i).css('background-color','#f2f2f2');
                            // $('#'+'PaResponsableName'+i).css('background-color','#f2f2f2');

                            $('#'+'itemAct'+i).css('background-color','#fff');
                            $('#'+'itemPeso'+i).css('background-color','#fff');
                            $('#'+'PaResponsableName'+i).css('background-color','#fff');
                            

                        }
                        
                       

                }
                else 
               // if(tipo == 0)//subobjetivo
               if( idPadre >= 0)
                {
                        //alert('aaaaaaaaaaaaaaaaaaaaaaaaaa un subobjetivo');
                        var n1 = idPadre+1;
                        var nn = ided+1; 
                        nn = n1+'.'+nn;
                       // nn = idPadre+':'+nn;
                   //     var pos = (ided-1);
                  //console.log(ided, objNewPA.Objetivos[idPadre])
                        var pos_ord = idPadre+"_"+ided

                        var title = "Ingresar Actividades - SubObjetivo "+ nn +":  "+ objNewPA.Objetivos[idPadre].SubObjetivos[ided].SubObjetivo_Name+"";
                     //   var title = "Ingresar Actividades - SubObjetivo "+ nn +"  "+ objNewPA.Objetivos[idPadre].SubObjetivos[pos].SubObjetivo_Name+"";
                        $("#lbTitleActividadPlanAnual").html(title);
                        $('#body-tabla-list-EvalAud2').html("     "); 
                        istObj = idPadre;
                        istSobj = ided;

                     var n = objNewPA.Objetivos[idPadre].SubObjetivos[ided].Actividades.length;
                        //var n = objNewPA.Objetivos[idPadre].SubObjetivos[pos].Actividades.length;
                        for (var i = 0; i<n; i++)
                        {
                            
                            fnSp3ReordenarActividadObjetivoPlan(i, pos_ord, objNewPA.Objetivos[idPadre].SubObjetivos[ided].Actividades[i])
                           // fnSp3agregaActividadObjetivoPlan(i, objNewPA.Objetivos[idPadre].SubObjetivos[pos].Code, objNewPA.Objetivos[idPadre].SubObjetivos[pos].Actividades[i])
                            // $('#'+'itemAct'+i).css('background-color','#f2f2f2');
                            // $('#'+'itemPeso'+i).css('background-color','#f2f2f2');
                            // $('#'+'PaResponsableName'+i).css('background-color','#f2f2f2');

                            $('#'+'itemAct'+i).css('background-color','#fff');
                            $('#'+'itemPeso'+i).css('background-color','#fff');
                            $('#'+'PaResponsableName'+i).css('background-color','#fff');
                            

                        }
                }
            }
            else
            {
                $('#body-tabla-list-EvalAud2').html("     ");
                if( idPadre === undefined) //objetivo
                {
                var n = objNewPA.Objetivos[ided].Actividades.length;

                for (var i = 0; i<n; i++)
                {
                    
                    fnSp3ReordenarActividadObjetivoPlan( i, ided, objNewPA.Objetivos[ided].Actividades[i],idPadre)
                   // fnSp3agregaActividadObjetivoPlan(i, objNewPA.Objetivos[pos].Code, objNewPA.Objetivos[pos].Actividades[i])
                    // $('#'+'itemAct'+i).css('background-color','#f2f2f2');
                    // $('#'+'itemPeso'+i).css('background-color','#f2f2f2');
                    // $('#'+'PaResponsableName'+i).css('background-color','#f2f2f2');

                    $('#'+'itemAct'+i).css('background-color','#fff');
                    $('#'+'itemPeso'+i).css('background-color','#fff');
                    $('#'+'PaResponsableName'+i).css('background-color','#fff');
                    

                }
            }else{
                // if(tipo == 0)//subobjetivo
                if( idPadre >= 0)
                 {
                    var n = objNewPA.Objetivos[idPadre].SubObjetivos[ided].Actividades.length;

                    for (var i = 0; i<n; i++)
                    {
                        
                        fnSp3ReordenarActividadObjetivoPlan( i, idPadre+'_'+ided,objNewPA.Objetivos[idPadre].SubObjetivos[ided].Actividades[i],idPadre)
                       // fnSp3agregaActividadObjetivoPlan(i, objNewPA.Objetivos[pos].Code, objNewPA.Objetivos[pos].Actividades[i])
                        // $('#'+'itemAct'+i).css('background-color','#f2f2f2');
                        // $('#'+'itemPeso'+i).css('background-color','#f2f2f2');
                        // $('#'+'PaResponsableName'+i).css('background-color','#f2f2f2');
    
                        $('#'+'itemAct'+i).css('background-color','#fff');
                        $('#'+'itemPeso'+i).css('background-color','#fff');
                        $('#'+'PaResponsableName'+i).css('background-color','#fff');
                 }
            }

                

                //var title = "Ingresar Actividades - SubObjetivo "+ 1 +" aaaaaaaaaaaaa "+ +"";
                $("#lbTitleActividadPlanAnual").html(title);

            }
        }




  //$('#body-tabla-list-EvalAud2').html(" ");
  
  $("#ResponsableName").val('');
getPersonResponsable($("#ResponsableName"),1);


}//------------------------------------- ini   fnSp3EditarPlanAnual() -------------------------------------


function fnSp3ReordenarActividadObjetivoPlan(ii,idPlan, itemx , padre)
{//------------------------------------- ini   fnSp3agregaObjetivoSubojetivo() -------------------------------------
  console.log(ii,idPlan, itemx , padre)
    if(ii != -1)   
    {//###############################################################################################################################################################################

       //alert("ii = "+ii+ " idPlan = "+idPlan+" itemx = "+itemx)
         //vamos a meter una fila de prueba
        itemx.Actividad_Name;//: "Actividad IMportante aaaa"
        //item.Code: "ACT1"
        //item.Cronogramas: (12) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        itemx.Id;//: 1
        itemx.Objetivo_PlanId;//: 1
        itemx.Peso;//: 15
        itemx.ResponsableCargo;//: "Almacenist"
        itemx.ResponsableCorreo;//: "caracas1348@gmail.com"
        itemx.ResponsableId;//: "1"
        itemx.ResponsableName;//: "Andy Vasquez"


           // Actividades[Actividades.length] = $('#txt_obj_subobj').val();
             //var objjt = "Objetivo "+Objetivos.length+" : "+$('#txt_obj_subobj').val();
             iddd2 = 'itemAct_'+idPlan+"_"+ii

        if(itemx.Actividad_Name === undefined){
            itemx.Actividad_Name="";
        }
        if(itemx.Peso === undefined){
            itemx.Peso="";
        }
        if(itemx.ResponsableName === undefined){
            itemx.ResponsableName="";
        }
        //var Id = 25;
        //var nAct = 10;
        var html2 = '     ';

        if(nActs == 0)
        {
            $('#body-tabla-list-EvalAud2').html("     "); nObjSub = 1;
        }

      var item = ii+1;
      var tx_act =  `
          <div class="form-group col-12 border text-left" style="  height: auto !important; width: 100% !important; !important; border-color:#DEE2E6 !important;  margin:0px 0px 0px !important; padding: 0px 0px !important;"  id = "divitem">
          <textarea class="text-justify textarea-fecha2 autocompletecollaborator" onBlur="AgregarinformacionObjActividad(1,$(this).val(),${istObj},${istSobj},${ii})"
              style="height: 36px; width:95%; margin: 8px 0px 8px 8px !important; padding: 0px 0px 0px 0px !important; font-size: 13px !important; font-weight: bold; color:#534b4b; background-color:#F2F2F2 !important;"  id="itemAct${ii}"  >${itemx.Actividad_Name}</textarea>
        </div>
          `;

        var tx_porc =  `
            <div class="d-flex justify-content-center align-items-center form-group col-12 border text-center" style="  height: auto !important; width: 92% !important; !important; border-color:#DEE2E6 !important;  margin:0px 0px 0px !important; padding: 0px 0px !important;"  id = "divitem">
            <input onkeyup="registraActividadNueva('itemPeso${ii}','peso',${ii})" onBlur="AgregarinformacionObjActividad(2,$(this).val(),${istObj},${istSobj},${ii},'itemPeso${ii}')" class="text-justify textarea-fecha2 autocompletecollaborator" value='${itemx.Peso}'
                style="height: 36px; text-align:center; width:85%; margin: 4px !important; padding: 0px 0px 0px 0px !important; font-size: 13px !important; font-weight: bold; color:#534b4b; background-color:#F2F2F2 !important;"  id="itemPeso${ii}"  name = "itemPeso${ii}"></input>
         
                <div class="input-group-append">
                <span class="input-group-text"> %</span>
              </div>
                     </div>
            `;

        var tx_resp =  `
        <div class="form-group col-12 border text-left" style="  height: auto !important; width: 98% !important; !important; border-color:#DEE2E6 !important;  margin:0px 0px 0px !important; padding: 0px 0px 0px 0px !important;"  id = "divTarea">
        <input id = 'PaResponsableName${ii}' class="text-justify textarea-fecha2 autocompletecollaborator" value = '${itemx.ResponsableName}' onchange="fnSp3onchangeColor('divf6')"
            style="height: 36px; width:90%; margin: 8px 0px 8px 8px !important; padding: 0px 0px 0px 0px !important; font-size: 13px !important; font-weight: bold; color: #534b4b; background-color:#F2F2F2 !important;"  "></input>
      </div>
            `;


        //var iddthis = "itemActs_"+nActs;
        var visible = '';
        if(objNewPA.Estado_PlanId > 1){
         visible = `style="display:none;"` ;
        }

            html2 += `

            <div id = "${iddd2}"  class="item-tabla p-2" style="z-index: 1;display:relative;  padding: 0px !important; margin: 10px 8px 0px !important; width: 1223px !important;">
            <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                <div class="col-12 text-center" style="font-size: 15px; padding: 4px !important; ">
                    <div class="row">



                    <table width = "100%" border="0">
                        <tr >
                            <td width = "5%" align="center"><div id="c1TabGeny" class="text-left "  style='margin: 0px 0px 0px 18px !important;  font-size: 14px !important; '>${item}</div></td>
                            <td width = "38%" align="center"><div id="c3TabGeny" class="text-left "   style='color:#000;'>${tx_act}</div></td>
                            <td width = "8%" align="center"><div id="c3TabGeny" class="text-left "   style='color:#000;' >${tx_porc}</div></td>
                            <td width = "25%" align="center"><div id="c3TabGeny" class="text-left "  style='color:#000;'>${tx_resp}</div></td>


                            <td width = "6%" align="center"><div id="c4TabGeny" class="text-center lbCabezaTabla"  >
                                <button type='button' title='Crear Tareas de la Actividad' onclick="fnSp3NuevasTareaActividadesPlan(${itemx.Id})"   class='btn-circle btn_read border-0' style='background-color:#ff9f47 !important;' id='btn_ActividadPlan${itemx.Id}'>
                                    <img src='./images/iconos/test6.svg' class='ojo-1'  >
                                </button>
                            </td>

                            <td width = "6%" align="center"><div id="c4TabGeny" class="text-center lbCabezaTabla"  >
                                <button type='button' title='Crear Cronograma de Actividades' onclick="fnSp3agregaCronogramaActividadObjetivoPlan(${itemx.Id})"   class='btn-circle btn_read border-0' style='background-color:#05beee !important;' id='btn_ActividadPlan${itemx.Id}'>
                                    <img src='./images/iconos/calendar2.svg' class='ojo-1'  >
                                </button>
                            </td>

                            <td width = "6%" align="center"  class="showBtnEdit" style="display: none;"><div id="c4TabGeny" class="text-center lbCabezaTabla"  >
                                    <button type='button' title='Editar Responsable' onclick="fnSp3EditarActividadPlanAnual(${itemx.Id})"   class='btn-circle btn_read border-0' style='background-color:#58c25d !important;' id='btn_verPlanAnual${itemx.Id}'>
                                        <img src='./images/iconos/edit_1.svg' class='ojo-1'  >
                                    </button>
                            </td>

                            <td ${visible} width = "6%" align="center"><div id="c4TabGeny" class="text-center lbCabezaTabla"  >
                                    <button type='button' title='Eliminar Actividad${iddd2}' onclick="fnSp3EliminarActividadPlanAnualEdit('${iddd2}')"   class='btn-circle btn_read border-0' style='background-color:#ff6767 !important;' id='btn_verEliminarPlan${itemx.Id}'>
                                        <img src='./images/iconos/delete.svg' class='ojo-1'  >
                                    </button>
                            </td>

                            <td width = "1%" align="center"><div id="c7TabGeny" class="text-center lbCabezaTabla"  >&nbsp</div></td>


                        </tr>
                    </table>





                        </div>
                    </div>
                </div>
            </div>


            `;
            $('#body-tabla-list-EvalAud2').append(html2);
    }//###############################################################################################################################################################################

    getPersonResponsablePa($("#PaResponsableName"+ii),ii,1,istObj, istSobj, ii);

console.log(objNewPA.Objetivos)

}//------------------------------------- fini   fnSp3agregaObjetivoSubojetivo() -------------------------------------






function fnSp3MostrarActividadObjetivoPlan(ii,idPlan, itemx )
{//------------------------------------- ini   fnSp3agregaObjetivoSubojetivo() -------------------------------------
    
  if(ii != -1)   
    {//###############################################################################################################################################################################

       //alert("ii = "+ii+ " idPlan = "+idPlan+" itemx = "+itemx)
         //vamos a meter una fila de prueba
        itemx.Actividad_Name;//: "Actividad IMportante aaaa"
        //item.Code: "ACT1"
        //item.Cronogramas: (12) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        itemx.Id;//: 1
        itemx.Objetivo_PlanId;//: 1
        itemx.Peso;//: 15
        itemx.ResponsableCargo;//: "Almacenist"
        itemx.ResponsableCorreo;//: "caracas1348@gmail.com"
        itemx.ResponsableId;//: "1"
        itemx.ResponsableName;//: "Andy Vasquez"


           // Actividades[Actividades.length] = $('#txt_obj_subobj').val();
             //var objjt = "Objetivo "+Objetivos.length+" : "+$('#txt_obj_subobj').val();
             iddd2 = 'itemAct_'+idPlan+"_"+ii

        if(itemx.Actividad_Name === undefined){
            itemx.Actividad_Name="";
        }
        if(itemx.Peso === undefined){
            itemx.Peso="";
        }
        if(itemx.ResponsableName === undefined){
            itemx.ResponsableName="";
        }
        //var Id = 25;
        //var nAct = 10;
        var html2 = '     ';

        if(nActs == 0)
        {
            $('#body-tabla-list-EvalAud2').html("     "); nObjSub = 1;
        }

      var item = ii+1;
      var tx_act =  `
          <div class="form-group col-12 border text-left" style="  height: auto !important; width: 100% !important; !important; border-color:#DEE2E6 !important;  margin:0px 0px 0px !important; padding: 0px 0px !important;"  id = "divitem">
          <textarea class="text-justify textarea-fecha2 autocompletecollaborator" onBlur="AgregarinformacionObjActividad(1,$(this).val(),${istObj},${istSobj},${ii})"
              style="height: 36px; width:95%; margin: 8px 0px 8px 8px !important; padding: 0px 0px 0px 0px !important; font-size: 13px !important; font-weight: bold; color:#534b4b; background-color:#F2F2F2 !important;"  id="itemAct${ii}"  >${itemx.Actividad_Name}</textarea>
        </div>
          `;

        var tx_porc =  `
            <div class="d-flex justify-content-center align-items-center form-group col-12 border text-center" style="  height: auto !important; width: 92% !important; !important; border-color:#DEE2E6 !important;  margin:0px 0px 0px !important; padding: 0px 0px !important;"  id = "divitem">
            <input onkeyup="registraActividadNueva('itemPeso${ii}','peso',${ii})" onBlur="AgregarinformacionObjActividad(2,$(this).val(),${istObj},${istSobj},${ii},'itemPeso${ii}')" class="text-justify textarea-fecha2 autocompletecollaborator" value='${itemx.Peso}'
                style="height: 36px; text-align:center; width:85%; margin: 4px !important; padding: 0px 0px 0px 0px !important; font-size: 13px !important; font-weight: bold; color:#534b4b; background-color:#F2F2F2 !important;"  id="itemPeso${ii}"  name = "itemPeso${ii}"></input>
                <div class="input-group-append">
                <span class="input-group-text"> %</span>
              </div>   
                </div>
            `;

        var tx_resp =  `
        <div class="form-group col-12 border text-left" style="  height: auto !important; width: 98% !important; !important; border-color:#DEE2E6 !important;  margin:0px 0px 0px !important; padding: 0px 0px 0px 0px !important;"  id = "divTarea">
        <input id = 'PaResponsableName${ii}' class="text-justify textarea-fecha2 autocompletecollaborator" value = '${itemx.ResponsableName}' onchange="fnSp3onchangeColor('divf6')"
            style="height: 36px; width:90%; margin: 8px 0px 8px 8px !important; padding: 0px 0px 0px 0px !important; font-size: 13px !important; font-weight: bold; color: #534b4b; background-color:#F2F2F2 !important;"  "></input>
      </div>
            `;


        //var iddthis = "itemActs_"+nActs;
        var visible = '';
        if(objNewPA.Estado_PlanId > 1){
         visible = `style="display:none;"` ;
        }

            html2 += `

            <div id = "${iddd2}"  class="item-tabla p-2" style="z-index: 1;display:relative;  padding: 0px !important; margin: 10px 8px 0px !important; width: 1223px !important;">
            <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                <div class="col-12 text-center" style="font-size: 15px; padding: 4px !important; ">
                    <div class="row">



                    <table width = "100%" border="0">
                        <tr >
                            <td width = "5%" align="center"><div id="c1TabGeny" class="text-left "  style='margin: 0px 0px 0px 18px !important;  font-size: 14px !important; '>${item}</div></td>
                            <td width = "35%" align="center"><div id="c3TabGeny" class="text-left "   style='color:#000;'>${tx_act}</div></td>
                            <td width = "8%" align="center"><div id="c3TabGeny" class="text-left "   style='color:#000;' >${tx_porc}</div></td>
                            <td width = "23%" align="center"><div id="c3TabGeny" class="text-left "  style='color:#000;'>${tx_resp}</div></td>

                            <td width="8%" align="center"><div id="c4TabGeny" class="text-center lbCabezaTabla">
                            <button type="button" title="Crear Tareas de la Actividad" onclick="fnSp3NuevasTareaActividadesPlan(0)" class="btn-circle btn_read border-0" style="background-color: #05beee !important;" id="btn_ActividadPlanundefined">
                                <img src="./images/iconos/test6.svg" class="ojo-1">
                            </button>
                        </div></td>
                            <td width = "6%" align="center"><div id="c4TabGeny" class="text-center lbCabezaTabla"  >
                                <button type='button' title='Crear Tareas de la Actividad' onclick="fnSp3NuevasTareaActividadesPlan(${itemx.Id})"   class='btn-circle btn_read border-0' style='background-color:#ff9f47 !important;' id='btn_ActividadPlan${itemx.Id}'>
                                    <img src='./images/iconos/test6.svg' class='ojo-1'  >
                                </button>
                            </td>

                            <td width = "6%" align="center"><div id="c4TabGeny" class="text-center lbCabezaTabla"  >
                                <button type='button' title='Crear Cronograma de Actividades' onclick="fnSp3agregaCronogramaActividadObjetivoPlan(${itemx.Id})"   class='btn-circle btn_read border-0' style='background-color:#05beee !important;' id='btn_ActividadPlan${itemx.Id}'>
                                    <img src='./images/iconos/calendar2.svg' class='ojo-1'  >
                                </button>
                            </td>

                            <td width = "6%" align="center"  class="showBtnEdit" style="display: none;"><div id="c4TabGeny" class="text-center lbCabezaTabla"  >
                                    <button type='button' title='Editar Responsable' onclick="fnSp3EditarActividadPlanAnual(${itemx.Id})"   class='btn-circle btn_read border-0' style='background-color:#58c25d !important;' id='btn_verPlanAnual${itemx.Id}'>
                                        <img src='./images/iconos/edit_1.svg' class='ojo-1'  >
                                    </button>
                            </td>

                            <td ${visible} width = "6%" align="center"><div id="c4TabGeny" class="text-center lbCabezaTabla"  >
                                    <button type='button' title='Eliminar Actividad${iddd2}' onclick="fnSp3EliminarActividadPlanAnual('${iddd2}')"   class='btn-circle btn_read border-0' style='background-color:#ff6767 !important;' id='btn_verEliminarPlan${itemx.Id}'>
                                        <img src='./images/iconos/delete.svg' class='ojo-1'  >
                                    </button>
                            </td>

                            <td width = "1%" align="center"><div id="c7TabGeny" class="text-center lbCabezaTabla"  >&nbsp</div></td>


                        </tr>
                    </table>





                        </div>
                    </div>
                </div>
            </div>


            `;
            $('#body-tabla-list-EvalAud2').append(html2);
    }//###############################################################################################################################################################################

    ($getPersonResponsablePa("#PaResponsableName"+ii),ii,1,istObj, istSobj, ii);

console.log(objNewPA.Objetivos)

}//------------------------------------- fini   fnSp3agregaObjetivoSubojetivo() -------------------------------------







//   getPersonResponsablePa(objeto,item,1,istObj, istSobj, nActsN);
var getPersonResponsablePa = function (obj,item,i, nobjj, nsobjj,nactt) 
{
    //console.log('obj=',obj, 'item=',item,'i=',i);
    //console.log(obj,item,i, nobjj, nsobjj,nactt) 
    obj.autocomplete({
        change: function (event, ui)
        {
            //alert('entra');
           //alert('Hola');
           //console.log('buscando.............',ui);
           
           
            //console.log( $("#hid_collaborator_id_"+i).val())
            if (ui.item === null &&  $("#hid_Name_id_1"+i).length>20)
            {

                 $("#hid_collaborator_id_"+i).val("");
                 $(this).val("");
                 $("#add_covid_lastname_"+i).val(""); 
            }
            else if(ui.item)
            {

                $("#PaResponsableName"+item).val(ui.item.firstname).trigger("change");
                //$("#add_covid_lastname_"+i).val(ui.item.lastname).trigger("change");
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
                          document.getElementById('loadRespPa').style.visibility = 'visible';
            //console.log("---[",filter);
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
                    document.getElementById('loadRespPa').style.visibility = 'hidden';
                    $("#add_firtnameload_1").hide();
                    var array =[];
                    data =  JSON.parse(data);
                   //console.log("tony",data);

                    data.value.forEach(item =>
                    {
                        var json ={}
                        json.label      = item.displayName;
                        json.value      = item.givenName;
                        json.id         = item.objectId;
                        json.cargo      = item.jobTitle;
                        json.firstname  = item.displayName;
                        json.correo     = item.userPrincipalName;
                        array.push(json);
                    });
                    response(array);

                }
            });
        },
        minLength: 3,
        select: function( event, ui )
        { //alert(ui.item.id)
            $("#PaResponsableUserHash"+item).val(ui.item.id);//PaResponsableCargo
            $("#PaResponsableCargo"+item).val(ui.item.cargo);
            $("#PaResponsableCorreo"+item).val(ui.item.correo);

            if(istSobj == null)//es un objetivo
            {
                
                ty = 0;
   
                
                objNewPA.Objetivos[nobjj].Actividades[nactt].ResponsableId = ui.item.id;
                objNewPA.Objetivos[nobjj].Actividades[nactt].ResponsableName = ui.item.firstname;
                objNewPA.Objetivos[nobjj].Actividades[nactt].ResponsableCargo = ui.item.cargo;
                objNewPA.Objetivos[nobjj].Actividades[nactt].ResponsableCorreo = ui.item.correo;
            }
            else
            {//es un subobjetivo
               
                objNewPA.Objetivos[nobjj].SubObjetivos[nsobjj].Actividades[nactt].ResponsableId = ui.item.id;
                objNewPA.Objetivos[nobjj].SubObjetivos[nsobjj].Actividades[nactt].ResponsableName = ui.item.firstname;
                objNewPA.Objetivos[nobjj].SubObjetivos[nsobjj].Actividades[nactt].ResponsableCargo = ui.item.cargo;
                objNewPA.Objetivos[nobjj].SubObjetivos[nsobjj].Actividades[nactt].ResponsableCorreo = ui.item.correo;
            }
           //console.log('el objteo con Actividad es', objNewPA)

        



           
            setTimeout(function(){
                $("#PaResponsableName"+item).val(ui.item.firstname);
               
            },300);
        },
        open: function() {
            $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
        },
        close: function() {
            $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );

        },
        search: function () {
            $("#spinnerLoadColaborador").show();
        },
        response: function () {
            $("#spinnerLoadColaborador").hide();
            // document.getElementById("add_covid_lastname_"+i).focus();
        }
    });
}





var getNewResponsable = function (obj,item,i, nobjj, nsobjj,nactt) 
{
    //console.log('obj=',obj, 'item=',item,'i=',i);
    //console.log(obj,item,i, nobjj, nsobjj,nactt) 
    obj.autocomplete({
        change: function (event, ui)
        {
            //alert('entra');
           //alert('Hola');
           //console.log('buscando.............',ui);
           
           
            //console.log( $("#hid_collaborator_id_"+i).val())
            if (ui.item === null &&  $("#hid_Name_id_1"+i).length>20)
            {

                 $("#hid_collaborator_id_"+i).val("");
                 $(this).val("");
                 $("#add_covid_lastname_"+i).val(""); 
            }
            else if(ui.item)
            {

                $("#txt_New_ResponsableName").val(ui.item.firstname).trigger("change");
                //$("#add_covid_lastname_"+i).val(ui.item.lastname).trigger("change");
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
                          document.getElementById('loadRespPa').style.visibility = 'visible';
            //console.log("---[",filter);
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
                    document.getElementById('loadRespPa').style.visibility = 'hidden';
                    $("#add_firtnameload_1").hide();
                    var array =[];
                    data =  JSON.parse(data);
                   //console.log("tony",data);

                    data.value.forEach(item =>
                    {
                        var json ={}
                        json.label      = item.displayName;
                        json.value      = item.givenName;
                        json.id         = item.objectId;
                        json.cargo      = item.jobTitle;
                        json.firstname  = item.displayName;
                        json.correo     = item.userPrincipalName;
                        array.push(json);
                    });
                    response(array);

                }
            });
        },
        minLength: 3,
        select: function( event, ui )
        { //alert(ui.item.id)
            $("#txt_New_ResponsableId").val(ui.item.id);//PaResponsableCargo
            $("#txt_New_ResponsableCargo").val(ui.item.cargo);
            $("#txt_New_ResponsableCorreo").val(ui.item.correo);

            // if(istSobj == null)//es un objetivo
            // {
                
            //     ty = 0;
   
                
            //     objNewPA.Objetivos[nobjj].Actividades[nactt].ResponsableId = ui.item.id;
            //     objNewPA.Objetivos[nobjj].Actividades[nactt].ResponsableName = ui.item.firstname;
            //     objNewPA.Objetivos[nobjj].Actividades[nactt].ResponsableCargo = ui.item.cargo;
            //     objNewPA.Objetivos[nobjj].Actividades[nactt].ResponsableCorreo = ui.item.correo;
            // }
            // else
            // {//es un subobjetivo
               
            //     objNewPA.Objetivos[nobjj].SubObjetivos[nsobjj].Actividades[nactt].ResponsableId = ui.item.id;
            //     objNewPA.Objetivos[nobjj].SubObjetivos[nsobjj].Actividades[nactt].ResponsableName = ui.item.firstname;
            //     objNewPA.Objetivos[nobjj].SubObjetivos[nsobjj].Actividades[nactt].ResponsableCargo = ui.item.cargo;
            //     objNewPA.Objetivos[nobjj].SubObjetivos[nsobjj].Actividades[nactt].ResponsableCorreo = ui.item.correo;
            // }
           //console.log('el objteo con Actividad es', objNewPA)

        



           
            setTimeout(function(){
                $("#txt_New_ResponsableName").val(ui.item.firstname);
               
            },300);
        },
        open: function() {
            $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
        },
        close: function() {
            $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );

        },
        search: function () {
            $("#spinnerLoadColaborador").show();
        },
        response: function () {
            $("#spinnerLoadColaborador").hide();
            // document.getElementById("add_covid_lastname_"+i).focus();
        }
    });
}

var confirmarGuardarNuevoResponsable = function () {
   

    $('#Sp3VentanaCambiarResponsable').modal('hide').removeClass('fade');
    var flag_empty = 1;
    var string_info = "";
    if($('#txt_motivo_cambio').val() === "" || $('#txt_motivo_cambio').val() === null)
    {
        flag_empty = 0;
        string_info ="el motivo "
    }

    if($('#txt_New_ResponsableName').val() === "" || $('#txt_New_ResponsableName').val() === null)
    {
        flag_empty = 0;
        if(string_info ===""){
            string_info ="el nuevo responsable "
   
        }else{
            string_info =string_info+"y el nuevo responsable"

        }
    }

    if(flag_empty == 1){
        $('#modalConfirmCambioResponsable').css('z-index','9999999');
        $("#modalConfirmCambioResponsable").modal("show").addClass("fade");
    }else{
        verModalError("Disculpe","Debe registrar "+string_info)
    setTimeout(function(){
        $("#Sp3VentanaCambiarResponsable").modal("show").addClass("fade");
       
    },400);
    }


    
}

var guardarNuevoResponsable = function () {
    showLoading();
    $('#modalConfirmCambioResponsable').modal('hide').removeClass('fade');
    var body ={
        "Motivo": $('#txt_motivo_cambio').val(),
        "Actividad_PlanId":  $('#Actividad_PlanId').val(),
        "Created_By": getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
        "Old_ResponsableId": $('#txt_Old_ResponsableId').val(),
        "Old_ResponsableCorreo": $('#txt_Old_ResponsableCorreo').val(),
        "Old_ResponsableCargo": $('#txt_Old_ResponsableCargo').val(),
        "Old_ResponsableName":  $('#txt_Old_ResponsableName').val(),
        "New_ResponsableId": $('#txt_New_ResponsableId').val(),
        "New_ResponsableCorreo": $('#txt_New_ResponsableCorreo').val(),
        "New_ResponsableCargo": $('#txt_New_ResponsableCargo').val(),
        "New_ResponsableName":  $('#txt_New_ResponsableName').val(),

    }
   //console.log(body)
    
    var url = apiUrlssoma+"/api/Post-Plan-Anual?code=ZnQh7E2Noeiv1emsJPTvXE5l/qClcMIjv3FNePN8XTRfTY5aOqmSAQ==&httpmethod=postResponsable";
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

      //console.log(data)
       if(data.resul>0){
  //console.log(data)
   $('#text_msj_confirm_exito_responsable').html('Se Realiz&oacute; el cambio de Manera Exitosa')
   $('#modalExitoCambioResponsableSp3').modal('show').addClass('fade') 
   $("#PaResponsableName"+istAct).val($('#txt_New_ResponsableName').val());

   if(istSobj == null)//es un objetivo
   {
       
       //ty = 0;
   
       
       objNewPA.Objetivos[nobjj].Actividades[nactt].ResponsableId = ui.item.id;
       objNewPA.Objetivos[nobjj].Actividades[nactt].ResponsableName = ui.item.firstname;
       objNewPA.Objetivos[nobjj].Actividades[nactt].ResponsableCargo = ui.item.cargo;
       objNewPA.Objetivos[nobjj].Actividades[nactt].ResponsableCorreo = ui.item.correo;
   }
   else
   {//es un subobjetivo
      
       objNewPA.Objetivos[nobjj].SubObjetivos[nsobjj].Actividades[nactt].ResponsableId = ui.item.id;
       objNewPA.Objetivos[nobjj].SubObjetivos[nsobjj].Actividades[nactt].ResponsableName = ui.item.firstname;
       objNewPA.Objetivos[nobjj].SubObjetivos[nsobjj].Actividades[nactt].ResponsableCargo = ui.item.cargo;
       objNewPA.Objetivos[nobjj].SubObjetivos[nsobjj].Actividades[nactt].ResponsableCorreo = ui.item.correo;
   }
   
   setTimeout(function(){
    istAct = null;
   
},300);

       }
       })
       .fail(function( jqXHR, textStatus, errorThrown ) {
           hideLoading();
   
       })
       .always(function( jqXHR, textStatus, errorThrown ) {
        hideLoading();

       });
   
}

var  fnSp3CC_Cronograma = function ()
{//------------------------------------- ini   fnSp3onchangeNecAnalisis() -------------------------------------
   //console.log("hola")
   //console.log(CC_Cronograma)

    if(CC_Cronograma == false)//si
    {
        $('#rbtn_no_CC').attr('src','./images/iconos/aprobarbien.svg');
        CC_Cronograma = true
    }
    else//no
    {
        $('#rbtn_no_CC').attr('src','./images/iconos/aprobarvoid.svg');
        CC_Cronograma = false
        
    }
    
   
}


var mostrarHistorialResponsable = function () {
    
    $('#Sp3VentanaHistorialResponsable').modal('show').addClass('fade') 
    $('#divListaHistorialResponsable').html('')
console.log(istAct)

if(istSobj == null)//es un objetivo
{
    $('#lbTitleHistorialResponsable').html('Historial de responsables - '+objNewPA.Objetivos[istObj].Actividades[istAct].Actividad_Name)

   console.log("ENDO 2757::", objNewPA.Objetivos[istObj].Actividades[istAct])

    objNewPA.Objetivos[istObj].Actividades[istAct].Responsable.forEach(function(Item){
        $('#divListaHistorialResponsable').append(
            ` <div class="header-tabla px-2 py-3" style="width: 910px !important; border-radius: 4px !important; border: solid 1px #cbcbcb !important; background-color: #f2f2f2 !important; margin-top: 1px !important ">
            <table width = "100%" border="0">
                <tr >
                        <td width="5%">
                            <div>&nbsp;</div>
                        </td>
                    <td width = "15%" align="center"><div id="archInicial" class="text-left lbCabezaTabla" style=" font-size: 14px !important ;  color: #000 !important;"> ${Item.Old_ResponsableName} </div></td>
                    <td width = "15%" align="center"><div id="archFinal" class="text-left lbCabezaTabla" style=" font-size: 14px !important; color: #000 !important;">${Item.New_ResponsableName}</div></td>
        
                    <td width = "15%" align="center"><div id="motivoArch" onclick="mostrarmotivoCambioResp('${Item.Motivo}','${Item.Date}')" class="text-left lbCabezaTabla" style=" font-size: 14px !important; color: #000 !important;"><a href="#" style="color: black !important; text-decoration: underline !important;">Ver Motivo</a></div></td>
        
                    <td width = "15%" align="center" ><div id="fechaSubArch" class="text-left lbCabezaTabla" style=" font-size: 14px !important; color: #000 !important;"  >${Item.Date}</div></td>
                </tr>
            </table>
        </div>`)
    })

    
}
else
{//es un subobjetivo
   //console.log(objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[istAct].Responsable)
    $('#lbTitleHistorialResponsable').html('Historial de responsables - '+objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[istAct].Actividad_Name)

    objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[istAct].Responsable.forEach(function(Item){
        $('#divListaHistorialResponsable').append(
            ` <div class="header-tabla px-2 py-3" style="width: 910px !important; border-radius: 4px !important; border: solid 1px #cbcbcb !important; background-color: #f2f2f2 !important; margin-top: 1px !important ">
            <table width = "100%" border="0">
                <tr >
                        <td width="5%">
                            <div>&nbsp;</div>
                        </td>
                    <td width = "15%" align="center"><div id="archInicial" class="text-left lbCabezaTabla" style=" font-size: 14px !important ;  color: #000 !important;"> ${Item.Old_ResponsableName} </div></td>
                    <td width = "15%" align="center"><div id="archFinal" class="text-left lbCabezaTabla" style=" font-size: 14px !important; color: #000 !important;">${Item.Old_ResponsableName}</div></td>
        
                    <td width = "15%" align="center"><div id="motivoArch" onclick="mostrarmotivoCambioResp('${Item.Motivo}','${Item.Date}')" class="text-left lbCabezaTabla" style=" font-size: 14px !important; color: #000 !important;"><a href="#" style="color: black !important; text-decoration: underline !important;">Ver Motivo</a></div></td>
        
                    <td width = "15%" align="center" ><div id="fechaSubArch" class="text-left lbCabezaTabla" style=" font-size: 14px !important; color: #000 !important;"  >${Item.Date}</div></td>
                </tr>
            </table>
        </div>`)
    })

}
}


var mostrarmotivoCambioResp = function (motivo,date) {
   //console.log(motivo)
    
    $('#lbTitleMotivoCambioResponsable').html('')
    if(istSobj == null)//es un objetivo
    {
        $('#lbTitleMotivoCambioResponsable').html('Motivo de Cambio del Responsable - '+objNewPA.Objetivos[istObj].Actividades[istAct].Actividad_Name+' - Fecha:'+date)    

    }else{
        $('#lbTitleMotivoCambioResponsable').html('Motivo de Cambio del Responsable - '+objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[istAct].Actividad_Name+' - Fecha:'+date)    

    }

    $('#motivoCambioResponable').html('')
    $('#motivoCambioResponable').html(motivo)
    $('#Sp3VentanaMotivoCambioResponsable').modal('show').addClass('fade') 

}

var mostrarVentanaControlCambios = function (pos,item) {
    $('#listadoMotivosCC').html('')

    istAct = pos;
    if(istSobj == null)//es un objetivo
    {
        $('#txt_title_name_actividad').html(item+': '+objNewPA.Objetivos[istObj].Actividades[istAct].Actividad_Name)    

        objNewPA.Objetivos[istObj].Actividades[istAct].ControlCambios.forEach(function(Item){
            if(Item.Flag_Adjunto > 0){
                $('#listadoMotivosCC').append(
                    ` <div class="header-tabla px-2 py-3" style="width: 1233px !important; border-radius: 4px !important; border: solid 1px #cbcbcb !important; background-color: #fff !important; margin-top: 1px !important ">
                    <table width = "100%" border="0">
                        <tr >
            
                            <td width = "60%" align="center"><div id="archInicial" class="text-left lbCabezaTabla" style=" font-size: 14px !important ;  color: #000 !important;"><b> ${Item.Nombre}</b> </div></td>
                            <td width = "15%" align="center"><div id="archFinal" class="text-left lbCabezaTabla" style=" font-size: 14px !important; color: #000 !important;"><b>${Item.Date}</b></div></td>
                            <td width = "15%" align="center"><div id="archFinal" class="text-left lbCabezaTabla" style=" font-size: 14px !important; color: #000 !important;">${Item.Cronograma == true ? " <img src='./images/iconos/aprobarbien.svg' class='ojo-1'  >" : "<img src='./images/iconos/aprobarvoid.svg' class='ojo-1'  >"}</div></td>
                
                
                            <td width = "6%" align="center" ><div id="fechaSubArch" class="text-left lbCabezaTabla" style=" font-size: 14px !important; color: #000 !important;"  > 
                            <button type='button' title='Ver el Plan Anual' onclick=" fnSp3MostrarMostrarAdjuntoCCPlanAnual(${Item.Id})"   class='btn-circle btn_read border-0' style='background-color:#34559c !important;' id='btn_verAdjuntoCC${Item.Id}'>
                            <img src='./images/iconos/ojo_1.svg' class='ojo-1'  >
                        </button>
                        </div></td>
                        </tr>
                    </table>
                </div>`)
               }else{
            $('#listadoMotivosCC').append(
                ` <div class="header-tabla px-2 py-3" style="width: 1233px !important; border-radius: 4px !important; border: solid 1px #cbcbcb !important; background-color: #fff !important; margin-top: 1px !important ">
                <table width = "100%" border="0">
                    <tr >
        
                        <td width = "60%" align="center"><div id="archInicial" class="text-left lbCabezaTabla" style=" font-size: 14px !important ;  color: #000 !important;"><b> ${Item.Nombre}</b> </div></td>
                        <td width = "15%" align="center"><div id="archFinal" class="text-left lbCabezaTabla" style=" font-size: 14px !important; color: #000 !important;"><b>${Item.Date}</b></div></td>
                        <td width = "15%" align="center"><div id="archFinal" class="text-left lbCabezaTabla" style=" font-size: 14px !important; color: #000 !important;">${Item.Cronograma == true ? " <img src='./images/iconos/aprobarbien.svg' class='ojo-1'  >" : "<img src='./images/iconos/aprobarvoid.svg' class='ojo-1'  >"}</div></td>
            
            
                        <td width = "6%" align="center" ><div id="fechaSubArch" class="text-left lbCabezaTabla" style=" font-size: 14px !important; color: #000 !important;"  > 
                        <button type='button' title='Ver el Plan Anual' onclick=" fnSp3MostrarMostrarAdjuntoCCPlanAnual(${Item.Id})"   class='btn-circle btn_read border-0' disabled='disabled' style='background-color:#f2f2f2 !important;' id='btn_verAdjuntoCC${Item.Id}'>
                        <img src='./images/iconos/ojo_1.svg' class='ojo-1'  >
                    </button>
                    </div></td>
                    </tr>
                </table>
            </div>`)
            }
        
        })
    }else{
        $('#txt_title_name_actividad').html(item+': '+objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[istAct].Actividad_Name)    

        objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[istAct].ControlCambios.forEach(function(Item){
            if(Item.Flag_Adjunto > 0){
                $('#listadoMotivosCC').append(
                    ` <div class="header-tabla px-2 py-3" style="width: 1233px !important; border-radius: 4px !important; border: solid 1px #cbcbcb !important; background-color: #fff !important; margin-top: 1px !important ">
                    <table width = "100%" border="0">
                        <tr >
            
                            <td width = "60%" align="center"><div id="archInicial" class="text-left lbCabezaTabla" style=" font-size: 14px !important ;  color: #000 !important;"><b> ${Item.Nombre}</b> </div></td>
                            <td width = "15%" align="center"><div id="archFinal" class="text-left lbCabezaTabla" style=" font-size: 14px !important; color: #000 !important;"><b>${Item.Date}</b></div></td>
                            <td width = "15%" align="center"><div id="archFinal" class="text-left lbCabezaTabla" style=" font-size: 14px !important; color: #000 !important;">${Item.Cronograma == true ? " <img src='./images/iconos/aprobarbien.svg' class='ojo-1'  >" : "<img src='./images/iconos/aprobarvoid.svg' class='ojo-1'  >"}</div></td>
                
                
                            <td width = "6%" align="center" ><div id="fechaSubArch" class="text-left lbCabezaTabla" style=" font-size: 14px !important; color: #000 !important;"  > 
                            <button type='button' title='Ver el Plan Anual' onclick=" fnSp3MostrarMostrarAdjuntoCCPlanAnual(${Item.Id})"   class='btn-circle btn_read border-0' style='background-color:#34559c !important;' id='btn_verAdjuntoCC${Item.Id}'>
                            <img src='./images/iconos/ojo_1.svg' class='ojo-1'  >
                        </button>
                        </div></td>
                        </tr>
                    </table>
                </div>`)
               }else{
            $('#listadoMotivosCC').append(
                ` <div class="header-tabla px-2 py-3" style="width: 1233px !important; border-radius: 4px !important; border: solid 1px #cbcbcb !important; background-color: #fff !important; margin-top: 1px !important ">
                <table width = "100%" border="0">
                    <tr >
        
                        <td width = "60%" align="center"><div id="archInicial" class="text-left lbCabezaTabla" style=" font-size: 14px !important ;  color: #000 !important;"><b> ${Item.Nombre}</b> </div></td>
                        <td width = "15%" align="center"><div id="archFinal" class="text-left lbCabezaTabla" style=" font-size: 14px !important; color: #000 !important;"><b>${Item.Date}</b></div></td>
                        <td width = "15%" align="center"><div id="archFinal" class="text-left lbCabezaTabla" style=" font-size: 14px !important; color: #000 !important;">${Item.Cronograma == true ? " <img src='./images/iconos/aprobarbien.svg' class='ojo-1'  >" : "<img src='./images/iconos/aprobarvoid.svg' class='ojo-1'  >"}</div></td>
            
            
                        <td width = "6%" align="center" ><div id="fechaSubArch" class="text-left lbCabezaTabla" style=" font-size: 14px !important; color: #000 !important;"  > 
                        <button type='button' title='Ver el Plan Anual' onclick=" fnSp3MostrarMostrarAdjuntoCCPlanAnual(${Item.Id})"   class='btn-circle btn_read border-0' disabled='disabled' style='background-color:#f2f2f2 !important;' id='btn_verAdjuntoCC${Item.Id}'>
                        <img src='./images/iconos/ojo_1.svg' class='ojo-1'  >
                    </button>
                    </div></td>
                    </tr>
                </table>
            </div>`)
            }
        
        })
    }

    
    $('#modalIngresarControlCambiosSp3').modal('show').addClass('fade') 
    $('#Sp3VentanActividadPlan').modal('hide').removeClass('fade'); 

    var max_chars = 50;
    $('#max').html(max_chars);
    $('.textarea_formBody').keyup(function() {
        var chars = $(this).val().length;
        var diff = chars + 0;
        $('#contadorBody').html(diff);

    });



}

var confirmNuevoControlCambio = function () {
   

    var file_control_cambio = document.getElementById("file_control_cambio").files[0];
if(file_control_cambio)
{
    toBase64CC(file_control_cambio?file_control_cambio:'').then(
        data => {
            base64_CC =   data;
console.log(base64_CC)
        }
    );
}
else{
    base64_CC = null

}
      $('#modalIngresarControlCambiosSp3').modal('hide').removeClass('fade'); 
    $('#modalConfirmarCCPlanAnualSp3').modal('show').addClass('fade');
}

var agregarNuevoControlCambio = function () {
    showLoading();
   //console.log($('#txt_motivo_cc').val() )    
    var idActividadCC = 0;
    $('#listadoMotivosCC').html('')
if(istSobj == null)//es un objetivo
{
    idActividadCC = objNewPA.Objetivos[istObj].Actividades[istAct].Id;
}else{
    idActividadCC = objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[istAct].Id;
}






    var body ={
        "IdActividad": idActividadCC,
        "Cronograma": CC_Cronograma,
        "Nombre": $('#txt_motivo_cc').val(),
        "Adjunto": base64_CC,
        "Created_by": getCookie("vtas_id_hash"+sessionStorage.tabVisitasa)

    }
    
    var url = apiUrlssoma+"/api/Post-Plan-Anual?code=ZnQh7E2Noeiv1emsJPTvXE5l/qClcMIjv3FNePN8XTRfTY5aOqmSAQ==&httpmethod=PostCC";
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

       if(data.Id>0){
   $('#modalConfirmarCCPlanAnualSp3').modal('hide').removeClass('fade')
   $('#modalExitoCCPlanAnualSp3').modal('show').addClass('fade');
   $('#txt_motivo_cc').val('')
   $('#contadorBody').html(0);

   data.ControlCambios.forEach(function(Item){
      //console.log(Item)
       if(Item.Flag_Adjunto > 0){
        $('#listadoMotivosCC').append(
            ` <div class="header-tabla px-2 py-3" style="width: 1233px !important; border-radius: 4px !important; border: solid 1px #cbcbcb !important; background-color: #fff !important; margin-top: 1px !important ">
            <table width = "100%" border="0">
                <tr >
    
                    <td width = "60%" align="center"><div id="archInicial" class="text-left lbCabezaTabla" style=" font-size: 14px !important ;  color: #000 !important;"><b> ${Item.Nombre}</b> </div></td>
                    <td width = "15%" align="center"><div id="archFinal" class="text-left lbCabezaTabla" style=" font-size: 14px !important; color: #000 !important;"><b>${Item.Date}</b></div></td>
                    <td width = "15%" align="center"><div id="archFinal" class="text-left lbCabezaTabla" style=" font-size: 14px !important; color: #000 !important;">${Item.Cronograma == true ? " <img src='./images/iconos/aprobarbien.svg' class='ojo-1'  >" : "<img src='./images/iconos/aprobarvoid.svg' class='ojo-1'  >"}</div></td>
        
        
                    <td width = "6%" align="center" ><div id="fechaSubArch" class="text-left lbCabezaTabla" style=" font-size: 14px !important; color: #000 !important;"  > 
                    <button type='button' title='Ver el Plan Anual' onclick=" fnSp3MostrarMostrarAdjuntoCCPlanAnual(${Item.Id})"   class='btn-circle btn_read border-0' style='background-color:#34559c !important;' id='btn_verAdjuntoCC${Item.Id}'>
                    <img src='./images/iconos/ojo_1.svg' class='ojo-1'  >
                </button>
                </div></td>
                </tr>
            </table>
        </div>`)
       }else{
    $('#listadoMotivosCC').append(
        ` <div class="header-tabla px-2 py-3" style="width: 1233px !important; border-radius: 4px !important; border: solid 1px #cbcbcb !important; background-color: #fff !important; margin-top: 1px !important ">
        <table width = "100%" border="0">
            <tr >

                <td width = "60%" align="center"><div id="archInicial" class="text-left lbCabezaTabla" style=" font-size: 14px !important ;  color: #000 !important;"><b> ${Item.Nombre}</b> </div></td>
                <td width = "15%" align="center"><div id="archFinal" class="text-left lbCabezaTabla" style=" font-size: 14px !important; color: #000 !important;"><b>${Item.Date}</b></div></td>
                <td width = "15%" align="center"><div id="archFinal" class="text-left lbCabezaTabla" style=" font-size: 14px !important; color: #000 !important;">${Item.Cronograma == true ? " <img src='./images/iconos/aprobarbien.svg' class='ojo-1'  >" : "<img src='./images/iconos/aprobarvoid.svg' class='ojo-1'  >"}</div></td>
    
    
                <td width = "6%" align="center" ><div id="fechaSubArch" class="text-left lbCabezaTabla" style=" font-size: 14px !important; color: #000 !important;"  > 
                <button type='button' title='Ver el Plan Anual' onclick=" fnSp3MostrarMostrarAdjuntoCCPlanAnual(${Item.Id})"   class='btn-circle btn_read border-0' disabled='disabled' style='background-color:#f2f2f2 !important;' id='btn_verAdjuntoCC${Item.Id}'>
                <img src='./images/iconos/ojo_1.svg' class='ojo-1'  >
            </button>
            </div></td>
            </tr>
        </table>
    </div>`)
    }
})
if(CC_Cronograma == true)
{
$("#btn_esdirCronograma_"+istAct).attr('disabled',false)
$("#btn_esdirCronograma_"+istAct).css('background-color','#ffd439');
}



if(istSobj == null)//es un objetivo
{
    idActividadCC = objNewPA.Objetivos[istObj].Actividades[istAct].ControlCambios = data.ControlCambios;
}else{
    idActividadCC = objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[istAct].ControlCambios = data.ControlCambios;
}

       }
       })
       .fail(function( jqXHR, textStatus, errorThrown ) {
           hideLoading();
   
       })
       .always(function( jqXHR, textStatus, errorThrown ) {

       });

}


const toBase64CC = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});


 var fnSp3MostrarMostrarAdjuntoCCPlanAnual = function (id) {
    //console.log(id)

     showLoading();
 

     
     var url = apiUrlssoma+"/api/Get-Plan-Anual?code=EUBbWsTT1KkzS56X/GBcUAOkoipdX2JpgKRagYT7YDaJ0mLS39daeA==&httpmethod=adjuntoCCPlan&AdjuntoId="+id;

     var headers ={
       "apikey":constantes.apiKey
   }

   $.ajax({
       method: "POST",
       url:  url,
       headers:headers,
       crossDomain: true,
       dataType: "json",
   })
   .done(function(response)
   {
         hideLoading();
 
        if(response.Id>0){
           if(response.Adjunto!="" && response.Adjunto != null && response.Adjunto != undefined)
           {
              //console.log("mostrar pdf") 
               var x = response.Adjunto.split(',');
              //console.log(x[1])
               let pdfWindow = window.open("")
               pdfWindow.document.write("<iframe width='100%' height='100%' src='" + encodeURI(x[0]) + ", " + encodeURI(x[1]) + "'></iframe>")   
           }
        }else{
            swal("Disculpe","Este Registro no contiene de archivos","warning")
        }
        hideLoading();

    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
        hideLoading();

    })
    .always(function( jqXHR, textStatus, errorThrown ) {
        hideLoading();

    });

 }


 var confirmNuevoCronogramaControlCambio = function () {

    $('#Sp3VentanCronogramaActividadPlan').modal('hide').removeClass('fade'); 
    $('#modalConfirmarCronogramaCCPlanAnualSp3').modal('show').addClass('fade');
    


}

var confirmEjecucipnPa = function () {

    $('#modalAdjuntarDocumentosTareasSp3').modal('hide').removeClass('fade'); 
    $('#modalConfirmarEjecucionPlanAnualSp3').modal('show').addClass('fade');
    


}

var confirmSupervisionPa = function () {
flag_Rechazado = false;
var flag_selection = false

    for (let i = 0; i < countAdjuntos; i++) {
       if( $("#estadoAdjuntoId_"+i).val() == 5)
       {
        flag_Rechazado = true;
       }
       if( $("#estadoAdjuntoId_"+i).val() != 1)
       {
        flag_selection = true;
       }
    }

    setTimeout(function(){
        $('#modalAdjuntarDocumentosTareasSp3').modal('hide').removeClass('fade'); 
        if(flag_selection == false){
            verModalError("Error","Debe Seleccionar alguna de las opciones")
            setTimeout(function(){
                $('#modalAdjuntarDocumentosTareasSp3').modal('show').addClass('fade');               
            },400);
        }else{
           if(flag_Rechazado==false){
            $('#modalConfirmarSupervisionPlanAnualSp3').modal('show').addClass('fade');
            if(subObjetivoActiva===null)
        {
        //   console.log( paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Adjuntos[filaAdjunto])
           paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].IdEstado=4
           paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Estado="Aprobado"            }
        else
        {
        //   console.log( paObj[istAud].a.Objetivos[objetivoActiva].SubObjetivos[subObjetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Adjuntos[filaAdjunto])
           paObj[istAud].a.Objetivos[objetivoActiva].SubObjetivos[subObjetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].IdEstado=4
           paObj[istAud].a.Objetivos[objetivoActiva].SubObjetivos[subObjetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Estado="Aprobado"
               }
        }else{
           $('#Sp3VentanaMotivoRechazo').modal('show').addClass('fade');
           if(subObjetivoActiva===null)
           {
              console.log( paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Adjuntos[filaAdjunto])
              paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].IdEstado=5
              paObj[istAud].a.Objetivos[objetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Estado="Rechazado"            }
           else
           {
              console.log( paObj[istAud].a.Objetivos[objetivoActiva].SubObjetivos[subObjetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Adjuntos[filaAdjunto])
              paObj[istAud].a.Objetivos[objetivoActiva].SubObjetivos[subObjetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].IdEstado=5
              paObj[istAud].a.Objetivos[objetivoActiva].SubObjetivos[subObjetivoActiva].Actividades[actividadActiva].Tareas[tareaActiva].Estado="Rechazado"
                  }
        }  
        }
       
    },300);
    
    


}
var Sp3fnGuardarEvidenciasEjecucionPA = function () {

    $('#modalConfirmarEjecucionPlanAnualSp3').modal('hide').removeClass('fade'); 
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

    let url = apiUrlssoma+"/api/Post-Plan-Anual?code=ZnQh7E2Noeiv1emsJPTvXE5l/qClcMIjv3FNePN8XTRfTY5aOqmSAQ==&httpmethod=Ejecucion";

   

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

            setTimeout(function(){
                $('#modalExitoEjecucionPlanAnualSp3').modal('show').addClass('fade');
        
            },300);
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


 var guardarCronogramaCC = function () {
    showLoading();
        var body ={};
        $('#modalConfirmarCronogramaCCPlanAnualSp3').modal('hide').removeClass('fade'); 
        if(istSobj == null)//es un objetivo
        {
            body = objNewPA.Objetivos[istObj].Actividades[isAcct].Cronogramas;
        }else{
            body = objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[istAct].Cronogramas;
        }   
       //console.log(body) 
    var url = apiUrlssoma+"/api/Post-Plan-Anual?code=ZnQh7E2Noeiv1emsJPTvXE5l/qClcMIjv3FNePN8XTRfTY5aOqmSAQ==&httpmethod=UpdateCronograma";
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

       if(data.Id>0){
   
console.log(data)
    $("#modalExitoCronoCCPlanAnualSp3").modal("show").addClass("fade");
    CC_Cronograma = false;
    //$("#btn_esdirCronograma_"+istAct).attr('disabled',true)
//$("#btn_esdirCronograma_"+istAct).css('background-color','#f2f2f2');
       }
       })
       .fail(function( jqXHR, textStatus, errorThrown ) {
           hideLoading();
   
       })
       .always(function( jqXHR, textStatus, errorThrown ) {
        hideLoading();

       });

 }

 var closemodalexitoSupervision = function () {
    $('#modalExitoEnvioSolicitudPlanAnualSp3').modal('hide').removeClass('fade');      
    accPlanAnual = 2; 
    fnSp3MostrarModalVerPlanAnual(istAud);
 }


/*
var getPersonResponsable = function (obj,i) {
    obj.autocomplete({
        change: function (event, ui)
        {
           // alert('entra');
           //alert('Hola');
           //console.log('buscando.............',ui);
           
           
            //console.log( $("#hid_collaborator_id_"+i).val())
            if (ui.item === null &&  $("#hid_Name_id_1"+i).length>20)
            {

                 $("#hid_collaborator_id_"+i).val("");
                 $(this).val("");
                 $("#add_covid_lastname_"+i).val(""); 
            }
            else if(ui.item)
            {

                $("#ResponsableName").val(ui.item.firstname).trigger("change");
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
                          document.getElementById('loadResp').style.visibility = 'visible';
           //console.log("---[",filter,"]---");
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
                   //console.log("data", data);
                    document.getElementById('loadResp').style.visibility = 'hidden';
                    $("#add_firtnameload_1").hide();
                    var array =[];
                    data =  JSON.parse(data);
                   //console.log("tony",data);

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
        { alert(ui.item.id)
            $("#ResponsableUserHash").val(ui.item.id);
            $("#ResponsableCargo").val(ui.item.cargo);
            $("#ResponsableCorreo").val(ui.item.correo);
            
            if(guardarEnviar == 1)
            {
                $('#btGuardarModificar').html("<b>Guardar Enviar</b>");
            }
            else
            {
                $('#btGuardarModificar').html("<b>Guardar</b>");
            }
            //$("#ResponsableUserHash").val(ui.item.correo);

            //$("#add_covid_dni_"+i).trigger("focusout");
            //console.log(ui.item.label)
            setTimeout(function(){
                // alert(ui.item.firstname)
                // alert(ui.item.cargo)//correo
                // alert(ui.item.correo)
                $("#ResponsableName").val(ui.item.firstname);
                //alert($("#ResponsableCorreo").val())


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
            $("#spinnerLoadColaborador").show();
        },
        response: function () {
            $("#spinnerLoadColaborador").hide();
            // document.getElementById("add_covid_lastname_"+i).focus();
        }
    });
}
*/