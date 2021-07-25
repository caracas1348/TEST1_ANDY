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
        this.Objetivo_PlanId;
        this.Peso;
        this.ResponsableCargo;
        this.ResponsableCorreo;
        this.ResponsableId;
        this.ResponsableName;
        
}
//.............................................. CLASE classHallazgo ...........................................

 
//this.Actividades = [ ]; //: (2) [{…}, {…}]









var nActs = 0;
var iddd2;
var Actividades = [];//manejarlo mejor con una clase
var istObj;//contiene el id del objetivo actual trabajado
var istSobj;//contiene el id del subobjetivo actual trabajado






function fnSp3agregaActividadObjetivoPlan(ii,idPlan, itemx )
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
             iddd2 = 'itemAct_'+ii+"_"+idPlan




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
              style="height: 36px; width:97%; margin: 8px 0px 8px 8px !important; padding: 0px 0px 0px 0px !important; font-size: 13px !important; font-weight: bold; color:#534b4b; background-color:#F2F2F2 !important;"  id="itemAct${ii}"  >${itemx.Actividad_Name}</textarea>
        </div>
          `;

        var tx_porc =  `
            <div class="form-group col-12 border text-center" style="  height: auto !important; width: 92% !important; !important; border-color:#DEE2E6 !important;  margin:0px 0px 0px !important; padding: 0px 0px !important;"  id = "divitem">
            <input class="text-justify textarea-fecha2 autocompletecollaborator" value='${itemx.Peso} %'
                style="height: 36px; text-align:center; width:70%; margin: 8px 8px 8px 8px !important; padding: 0px 0px 0px 0px !important; font-size: 13px !important; font-weight: bold; color:#534b4b; background-color:#F2F2F2 !important;"  id="itemActxt${ii}"  name = "itemAct"></input>
          </div>
            `;

        var tx_resp =  `
        <div class="form-group col-12 border text-left" style="  height: auto !important; width: 98% !important; !important; border-color:#DEE2E6 !important;  margin:0px 0px 0px !important; padding: 0px 0px 0px 0px !important;"  id = "divTarea">
        <input class="text-justify textarea-fecha2 autocompletecollaborator" value = '${itemx.ResponsableName}' onchange="fnSp3onchangeColor('divf6')"
            style="height: 36px; width:90%; margin: 8px 0px 8px 8px !important; padding: 0px 0px 0px 0px !important; font-size: 13px !important; font-weight: bold; color: #534b4b; background-color:#F2F2F2 !important;"  "></input>
      </div>
            `;


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
                            <td width = "7%" align="center"><div id="c3TabGeny" class="text-left "   style='color:#000;' >${tx_porc}</div></td>
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

                            <td width = "6%" align="center"><div id="c4TabGeny" class="text-center lbCabezaTabla"  >
                                    <button type='button' title='Editar del Plan Anual' onclick="fnSp3EditarActividadPlanAnual(${itemx.Id})"   class='btn-circle btn_read border-0' style='background-color:#58c25d !important;' id='btn_verPlanAnual${itemx.Id}'>
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
            $('#body-tabla-list-EvalAud2').append(html2);
    }//###############################################################################################################################################################################
    else
    {//###############################################################################################################################################################################
        var ty;
        var nActsN
         if(istSobj == null)//es un objetivo
         {
             
             ty = 0;

             nActsN = objNewPA.Objetivos[istObj].Actividades.length; 
             objNewPA.Objetivos[istObj].Actividades[nActsN] = new Actividad();
             objNewPA.Objetivos[istObj].Actividades[nActsN].Id = nActsN;
             iddd2 = 'itemAct_'+ty+"_"+nActsN;
         }
         else
         {//es un subobjetivo
             nActsN = objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades.length;
             objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[nActsN] = new Actividad();
             objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[nActsN].Id = nActsN;
             iddd2 = 'itemAct_'+ty+"_"+nActsN;
         }
         



         

        var html2 = '     ';

         
        if(nActsN == 0)
        {
            $('#body-tabla-list-EvalAud2').html("     "); nObjSub = 1;
        }

      var item = nActsN+1;
      //var itemId = 
      var tx_act =  `
          <div class="form-group col-12 border text-left" style="  height: auto !important; width: 100% !important; !important; border-color:#DEE2E6 !important;  margin:0px 0px 0px !important; padding: 0px 0px !important;"  id = "divitem">
          <textarea onkeyup="registraActividadNueva('itemAct${item}','actividad')" class="text-justify textarea-fecha2 autocompletecollaborator" 
              style="height: 36px; width:97%; margin: 8px 0px 8px 8px !important; padding: 0px 0px 0px 0px !important; font-size: 13px !important; font-weight: bold; color:#534b4b; background-color:#FFF !important;"  id="itemAct${item}"  ></textarea>
        </div>
          `;//background-color:#F2F2F2

        var tx_porc =  `
            <div class="form-group col-12 border text-center" style="  height: auto !important; width: 92% !important; !important; border-color:#DEE2E6 !important;  margin:0px 0px 0px !important; padding: 0px 0px !important;"  id = "divitem">
            <input  onkeyup="registraActividadNueva('itemPeso${item}','peso')" class="text-justify textarea-fecha2 autocompletecollaborator" value=''
                style="height: 36px; text-align:center; width:70%; margin: 8px 8px 8px 8px !important; padding: 0px 0px 0px 0px !important; font-size: 13px !important; font-weight: bold; color:#534b4b; background-color:#FFF !important;"  id="itemPeso${item}" ></input>
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

            html2 += `

            <div id = "${iddd2}"  class="item-tabla p-2" style="z-index: 1;display:relative;  padding: 0px !important; margin: 10px 8px 0px !important; width: 1223px !important;">
            <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                <div class="col-12 text-center" style="font-size: 15px; padding: 4px !important; ">
                    <div class="row">



                    <table width = "100%" border="0">
                        <tr >
                            <td width = "5%" align="center"><div id="c1TabGeny" class="text-left "  style='margin: 0px 0px 0px 18px !important;  font-size: 14px !important; '>${item}</div></td>
                            <td width = "38%" align="center"><div id="c3TabGeny" class="text-left "   style='color:#000;'>${tx_act}</div></td>
                            <td width = "7%" align="center"><div id="c3TabGeny" class="text-left "   style='color:#000;' >${tx_porc}</div></td>
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

                            <td width = "6%" align="center"><div id="c4TabGeny" class="text-center lbCabezaTabla"  >
                                    <button type='button' title='Editar del Plan Anual' onclick="fnSp3EditarActividadPlanAnual(${nActsN})"   class='btn-circle btn_read border-0' style='background-color:#58c25d !important;' id='btn_verPlanAnual${itemx.Id}'>
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



}//------------------------------------- fini   fnSp3agregaObjetivoSubojetivo() -------------------------------------


function registraActividadNueva(idele, tipo)
{

    if(istSobj == null)//es un objetivo
         {
             ty = 0;

             var i = objNewPA.Objetivos[istObj].Actividades.length-1;
             if(tipo == 'actividad')
             {
                objNewPA.Objetivos[istObj].Actividades[i].Actividad_Name = $('#'+idele).val();
                console.log('xtx:[', objNewPA.Objetivos[istObj].Actividades[i].Actividad_Name);
             }
             else
             {
                 if(tipo == 'peso')
                    {
                                    var sn = /^[0-9]+$/;
                                    var ppeso = $('#'+idele).val();
                                    ppeso = parseInt(ppeso);

                                    if($('#'+idele).val().match(sn))
                                    {
                                       if(ppeso > 100){ppeso = 100; $('#'+idele).val('100');}
                                    }
                                    else
                                    {
                                        $('#'+idele).val('');
                                        console.log('HAY LETRAS = '+$('#'+idele).val());
                                    }
                                    objNewPA.Objetivos[istObj].Actividades[i].Peso = ppeso
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
                         objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[i].Peso = $('#'+idele).val();
                         console.log('UUUUUI:[',  objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[i].Peso);
                    }
                }

             
         }

         

}



function fnSp3NuevasActividadesObjetivoPlan(ided,idPadre,tipo)
{//------------------------------------- ini   fnSp3EditarPlanAnual() -------------------------------------
    vw_principal.init();//para reiniciar tokes del buscador de nombres ************ ResponsableName


$("#Sp3VentanActividadPlan").modal("show").addClass("fade");
$("#ResponsableName").val('');
//alert('accPlanAnual = '+accPlanAnual)

       
         if(accPlanAnual == 0)
            {
                if(tipo ==1) //objetivo
                {
                        var nn = ided+1;
                        var title = "Ingresar Actividades - Objetivo "+ nn +": "+ objNewPA.Objetivos[ided].Objetivo_Name+"";
                        $("#lbTitleActividadPlanAnual").html(title);

                        istObj = ided;
                        istSobj = null;
                        //alert(istSobj);
                }
                else 
                if(tipo == 0)//subobjetivo
                {
                        
                        var n1 = idPadre+1;
                        var nn = ided+1; 
                        nn = n1+':'+nn;

                        var title = "Ingresar Actividades - SubObjetivo "+ nn +"  "+ objNewPA.Objetivos[idPadre].SubObjetivos[ided].SubObjetivo_Name+"";
                        $("#lbTitleActividadPlanAnual").html(title);
                        istObj = idPadre;
                        istSobj = ided;
                }
            }
            else
            {

                var title = "Ingresar Actividades - SubObjetivo "+ 1 +" aaaaaaaaaaaaa "+ +"";
                $("#lbTitleActividadPlanAnual").html(title);

            }
            




  //$('#body-tabla-list-EvalAud2').html(" ");
  
  $("#ResponsableName").val('');
getPersonResponsable($("#ResponsableName"),1);


}//------------------------------------- ini   fnSp3EditarPlanAnual() -------------------------------------




function fnSp3CerrarNuevasActividadesPlan()
{//------------------------------------- ini   fnSp3CerrarNuevasTareasActividadesPlan() -------------------------------------

  $("#Sp3VentanActividadPlan").modal("hide").removeClass("fade");

}//------------------------------------- fin   fnSp3CerrarNuevasTareasActividadesPlan() -------------------------------------



function fnSp3EditarActividadPlanAnual(idActividad)
{//------------------------------------- ini   fnSp3agregaCronogramaActividadObjetivoPlan() -------------------------------------

  alert('Editando la Actividad ('+ idActividad +') plan');
}//------------------------------------- ini   fnSp3agregaCronogramaActividadObjetivoPlan() -------------------------------------


function fnSp3EliminarActividadPlanAnual(idTarea)
{//------------------------------------- ini   fnSp3agregaCronogramaActividadObjetivoPlan() -------------------------------------
    $('#'+idTarea).remove();
}//------------------------------------- ini   fnSp3agregaCronogramaActividadObjetivoPlan() -------------------------------------
















//   getPersonResponsablePa(objeto,item,1,istObj, istSobj, nActsN);
var getPersonResponsablePa = function (obj,item,i, nobjj, nsobjj,nactt) 
{
    //console.log('obj=',obj, 'item=',item,'i=',i);
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
                    console.log("tony",data);

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
            console.log('el objteo con Actividad es', objNewPA)

        



           
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
            console.log("---[",filter,"]---");
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
                    console.log("data", data);
                    document.getElementById('loadResp').style.visibility = 'hidden';
                    $("#add_firtnameload_1").hide();
                    var array =[];
                    data =  JSON.parse(data);
                    console.log("tony",data);

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