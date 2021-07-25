/****************************************************************************************
* VISUAL SAT - [2021]
* PROYECTO : SIGTASA
* ESQUEMA : SSOMA
* MODULO : GESTIÓN DE PLAN ANUAL.CRONOGRAMA Y TAREAS
* OPERADORES_________________________________________________________________________
* | # | PROGRAMADOR     |  |      FECHA   |  |   HORA   |           CORREO           |
* | 1 | Andy Vásquez    |  |  12/01/2021  |  | 14:13:50 |    caracas1348@gmail.com   |
* |___|_________________|__|______________|__|__________|____________________________|
*
* DESCRIPCION: ARCHIVO FRONT DE FUNCIONALIDAD EN CLIENTE DE LAS OPCIONES DEL CRONOGRAMA DEL PLAN 
*              ANUAL Y SUS TAREAS- (LISTADO, CREAR, MODIFICAR ELIMINAR, VALIDAR)
*
* ARCHIVOS DE SERVICIOS   ____________________________________
* | # |     MODULO             |  |         NOMBRE            |   
* | 1 |      SSOMA             |  |     Get-Plan-Anual        |**PENDIENTE VA A CAMBIAR
* |___________________________________________________________|
*
* VERSION: 0.1 Beta
*******************************************************************************************/

//alert('Cronogramas y Tareas');
function Cronograma()
{
   

     this.Id; 
     this.ActividadPlanId; 
     this.Year_Frecuencia; 
     this.Mes_Num; 
     this.Mes_Name;
     this.S1; 
     this.S2; 
     this.S3; 
     this.S4; 

     this.Fecha_S1_Ini; 
     this.Fecha_S1_Fin; 

     this.Fecha_S2_Ini; 
     this.Fecha_S2_Fin;

     this.Fecha_S3_Ini; 
     this.Fecha_S3_Fin;

     this.Fecha_S4_Ini; 
     this.Fecha_S4_Fin;
                  

            
}

var newCron = 0;// 0 no se a llamado a crear nuevo cronograma en el nuevo plan
               //  1 no se a llamado a crear nuevo cronograma en el nuevo plan

var varMes = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
var isAcct = 0;




function fnSp3CerrarNuevasTareasPlan()
{//------------------------------------- ini   fnSp3CerrarVentanaMostrarPlanAnual() -------------------------------------
    $("#Sp3VentanActividadPlan").modal("hide").removeClass("fade");
}//------------------------------------- ini   fnSp3CerrarVentanaMostrarPlanAnual() -------------------------------------




function fnSp3CerrarNuevasTareasActividadesPlan()
{//------------------------------------- ini   fnSp3CerrarNuevasTareasActividadesPlan() -------------------------------------

  $("#Sp3VentanTareaActividadPlan").modal("hide").removeClass("fade");

}//------------------------------------- fin   fnSp3CerrarNuevasTareasActividadesPlan() -------------------------------------




function fnSp3NuevasTareaActividadesPlan(ided)
{//------------------------------------- ini   fnSp3NuevasTareaActividadesPlan() -------------------------------------

  // alert('vamos a crear las actividades del plan = '+ided);
  $("#Sp3VentanTareaActividadPlan").modal("show").addClass("fade");
  $("#lbTitleTareaActividadPlanAnual").html("Ingresar las *** Tareas de la Actividad 1 *** - Objetivo 1: Optimizar inversiones costos y gastos en SSOMA");


}//------------------------------------- ini   fnSp3NuevasTareaActividadesPlan() -------------------------------------

var nTareas = 0;
var iddd3;
var Tareass = [];//manejarlo mejor con una clase
function fnSp3agregaTareaActividadObjetivoPlan(il, itemx)
{//------------------------------------- ini   fnSp3agregaObjetivoSubojetivo() -------------------------------------

        $('#respTareas').val(itemx.ResponsableName);
         //vamos a meter una fila de prueba
         /* v
         
          itemx.ActividadId: 1
          itemx.Color: "#000000"
          itemx.Estado: "Pendiente"
          itemx.Evidencia_Name: "Visitas de liderazgo del superintendente (IAS, inspecciones, observaciones preventivas"
           itemx.Fecha_Ejecutada_Fin: "22/01/2021"
           itemx.Fecha_Ejecutada_Ini: "22/01/2021"
           itemx.Fecha_Programada_Fin: "29/01/2021"
           itemx.Fecha_Programada_Ini: "25/01/2021"
           itemx.Id: 1
           itemx.IdEstado: 1
           itemx.ResponsableId: "1"
           itemx.ResponsableName: "Andy Vasquez"
         
         */
          var ev = itemx.Evidencia_Name;
          var fe_prog =  itemx.Fecha_Programada_Ini+" - "+itemx.Fecha_Programada_Fin;
          var fe_e = itemx.Fecha_Ejecutada_Ini;
          var estt = itemx.Estado;
          var colorr = itemx.Color;

             Tareass[Tareass.length] = $('#txt_obj_subobj').val();
             //var otarr = "Objetivo "+Objetivos.length+" : "+$('#txt_obj_subobj').val();
             iddd3 = 'itemTar'+Tareass.length+"_"+SubObjetivos.length;




        var tarr = itemx;
        var Id = 25;
        var nAct = 10;
        var html2 = '     ';

        if(nTareas == 0)
        {
            $('#body-tabla-list-EvalAud3').html("     "); nObjSub = 1;
        }

      var item = il+1;
      var tx_act =  `
          <div class="form-group col-12 border text-left" style="  height: auto !important; width: 496px !important; !important; border-color:#DEE2E6 !important;  margin:0px 0px 0px !important; padding: 0px 0px !important;"  id = "divitem">
          <textarea class="text-justify textarea-fecha2 autocompletecollaborator"
              style="height: 36px; width:97%; margin: 8px 0px 8px 8px !important; padding: 0px 0px 0px 0px !important; font-size: 13px !important; font-weight: bold; color:#534b4b; background-color:#F2F2F2 !important;"  id="itemAct"  name = "itemAct">${ev}</textarea>
        </div>
          `;


        var tx_fe_programada =  `

        <input class="text-justify textarea-fecha2 autocompletecollaborator" value = '${fe_prog}'
            style="height: 36px; width:90%; margin: 8px 0px 8px 8px !important; padding: 0px 0px 0px 0px !important; font-size: 13px !important; font-weight: bold; color: #534b4b; background-color:#F2F2F2 !important;"  "></input>

            `;

            var tx_fe_ejecutada =  `

            <input class="text-justify textarea-fecha2 autocompletecollaborator" value = '${fe_e}'
                style="height: 36px; width:90%; margin: 8px 0px 8px 8px !important; padding: 0px 0px 0px 0px !important; font-size: 13px !important; font-weight: bold; color: #534b4b; background-color:#F2F2F2 !important;"  "></input>

                `;



          var tx_estado =  `
            <div class="text-center "
              style="height: 16px; width:80%; margin: 10px 20px 8px 8px !important; padding: 0px 00px 0px 0px !important; font-size: 13px !important; font-weight: bold; color:${colorr}; background-color:#F2F2F2 !important;"  ">

                ${estt}
            </div>

              `;


        var iddthis = "itemTar_"+nTareas;

            html2 += `

            <div id = "${iddthis}"  class="item-tabla p-2" style="z-index: 1;display:relative;  padding: 0px !important; margin: 10px 8px 0px !important; width: 1223px !important;">
            <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                <div class="col-12 text-center" style="font-size: 15px; padding: 4px !important; ">
                    <div class="row">



                    <table width = "100%" border="0">
                        <tr >
                            <td width = "7%" align="center"><div id="c1TabGeny" class="text-left "  style='margin: 0px 0px 0px 18px !important;  font-size: 14px !important; '>${item}</div></td>
                            <td width = "46%" align="center"><div id="c3TabGeny" class="text-left "   style='color:#000;'>${tx_act}</div></td>
                            <td width = "15%" align="center"><div id="c3TabGeny" class="text-left "   style='color:#000;' >${tx_fe_programada}</div></td>
                            <td width = "15%" align="center"><div id="c3TabGeny" class="text-left "  style='color:#000;'>${tx_fe_ejecutada}</div></td>
                            <td width = "8%" align="center"><div id="c3TabGeny" class="text-center "  style='color:#000;'>${tx_estado}</div></td>
                            <td width = "8%" align="center"><div id="c4TabGeny" class="text-center lbCabezaTabla"  >
                                    <button type='button' title='Editar del Hallazgo' onclick="fnSp3EliminarActividadPlanAnual('${iddthis}')"   class='btn-circle btn_read border-0' style='background-color:#ff6767 !important;' id='btn_verEliminarPlan${Id}'>
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


    $('#body-tabla-list-EvalAud3').append(html2);

    nTareas++;



}//------------------------------------- fini   fnSp3agregaObjetivoSubojetivo() -------------------------------------












function sp3FnselecionaSemana(sem, mes)
{
    //alert(sem, mes)
    var bn = 'mes_'+mes+'_S'+sem;    
    $("#"+bn).css('background-color','#05BEEE'); 
    var lb2 = 'lb_S'+sem+'_mes_'+mes;
    $("#"+lb2).css('visibility','visible');
    //alert('me escogiste');
    if(istSobj == null)//es un objetivo
         {
            
            console.log('------------------------------------------------------------------------------------');
            var objCr = objNewPA.Objetivos[istObj].Actividades[isAcct].Cronogramas[mes-1];
            //console.log(objCr.Mes_Name);
            //console.log('------------------------------------------------------------------------------------');
            switch (sem) 
                    {//------------------------------------------------------------
                            case 1://semana1
                                objCr.S1 = 1;
                                objCr.Fecha_S1_Ini = calcula_semana(sem, mes-1,'ini');
                                objCr.Fecha_S1_Fin = calcula_semana(sem, mes-1,'fin');



                                var lb = 'lb_S1_mes_'+objCr.Mes_Num+'_txt';
                                var lb2 = 'lb_S1_mes_'+objCr.Mes_Num;


                                dt = objCr.Fecha_S1_Ini.split('/');
                                var dia= dt[0];
                                var mes= parseInt(dt[1]);
                                var anio= dt[2];

                                diax = diaSemana(dia,mes,anio);

                                dt1 = objCr.Fecha_S1_Fin.split('/');
                                var dia1= dt1[0];
                                var mes1= parseInt(dt1[1]);
                                var anio1= dt1[2];

                                diax1 = diaSemana(dia1,mes1,anio1);


                                $("#"+lb).html('S1:&nbsp;&nbsp;'+diax+'&nbsp;'+dia+'&nbsp;-&nbsp;'+diax1+'&nbsp;'+dia1);
                                $("#"+lb2).css('visibility','visible');

                                
                            break;
                            
                            case 2://semana2
                                objCr.S2 = 1;
                                objCr.Fecha_S2_Ini = calcula_semana(sem, mes-1,'ini');
                                objCr.Fecha_S2_Fin = calcula_semana(sem, mes-1,'fin');

                                var lb = 'lb_S2_mes_'+objCr.Mes_Num+'_txt';
                                var lb2 = 'lb_S2_mes_'+objCr.Mes_Num;


                                dt = objCr.Fecha_S2_Ini.split('/');
                                var dia= dt[0];
                                var mes= parseInt(dt[1]);
                                var anio= dt[2];

                                diax = diaSemana(dia,mes,anio);

                                dt1 = objCr.Fecha_S2_Fin.split('/');
                                var dia1= dt1[0];
                                var mes1= parseInt(dt1[1]);
                                var anio1= dt1[2];

                                diax1 = diaSemana(dia1,mes1,anio1);


                                $("#"+lb).html('S2:&nbsp;&nbsp;'+diax+'&nbsp;'+dia+'&nbsp;-&nbsp;'+diax1+'&nbsp;'+dia1);
                                $("#"+lb2).css('visibility','visible');

                            break;
                            
                            case 3://semana3
                                objCr.S3 = 1;
                                objCr.Fecha_S3_Ini = calcula_semana(sem, mes-1,'ini');
                                objCr.Fecha_S3_Fin = calcula_semana(sem, mes-1,'fin');

                                

                                var lb = 'lb_S3_mes_'+objCr.Mes_Num+'_txt';
                                var lb2 = 'lb_S3_mes_'+objCr.Mes_Num;


                                dt = objCr.Fecha_S3_Ini.split('/');
                                var dia= dt[0];
                                var mes= parseInt(dt[1]);
                                var anio= dt[2];

                                diax = diaSemana(dia,mes,anio);

                                dt1 = objCr.Fecha_S3_Fin.split('/');
                                var dia1= dt1[0];
                                var mes1= parseInt(dt1[1]);
                                var anio1= dt1[2];

                                diax1 = diaSemana(dia1,mes1,anio1);


                                $("#"+lb).html('S3:&nbsp;&nbsp;'+diax+'&nbsp;'+dia+'&nbsp;-&nbsp;'+diax1+'&nbsp;'+dia1);
                                $("#"+lb2).css('visibility','visible');

                            break;
                            
                            case 4: //semana4
                                objCr.S3 = 1;
                                objCr.Fecha_S4_Ini = calcula_semana(sem, mes-1,'ini');
                                objCr.Fecha_S4_Fin = calcula_semana(sem, mes-1,'fin'); 

                                var lb = 'lb_S4_mes_'+objCr.Mes_Num+'_txt';
                                var lb2 = 'lb_S4_mes_'+objCr.Mes_Num;


                                dt = objCr.Fecha_S4_Ini.split('/');
                                var dia= dt[0];
                                var mes= parseInt(dt[1]);
                                var anio= dt[2];

                                diax = diaSemana(dia,mes,anio);

                                dt1 = objCr.Fecha_S4_Fin.split('/');
                                var dia1= dt1[0];
                                var mes1= parseInt(dt1[1]);
                                var anio1= dt1[2];

                                diax1 = diaSemana(dia1,mes1,anio1);


                                $("#"+lb).html('S4:&nbsp;&nbsp;'+diax+'&nbsp;'+dia+'&nbsp;-&nbsp;'+diax1+'&nbsp;'+dia1);
                                $("#"+lb2).css('visibility','visible');


                            break;
                           
                            
                            default:  
                    }//-----------------------------------------------------------
            
                    console.log("viendo =", objNewPA.Objetivos[istObj].Actividades[isAcct]);



            
         }
         else
         {//es un subobjetivo
            





         }

}

function cronogramaEstadoNatural()
{//------------------------------------- ini   cronogramaEstadoNatural() -------------------------------------

  
   for(var i = 1; i<=12 ;i++)
   {
         
    ///var bn = 'mes_'+i+'_S1';    
    //$("#"+bn).css('background-color','#05BEEE'); 
    //$("#"+bn).css('background-color','#ffffff'); 

    var lb = 'lb_S1_mes_'+i+'_txt';
    var lb2 = 'lb_S1_mes_'+i;
    $("#"+lb).html('S1:');
    $("#"+lb2).css('visibility','hiddden');
  

    var lb = 'lb_S2_mes_'+i+'_txt';
    var lb2 = 'lb_S2_mes_'+i;
    $("#"+lb).html('S2:');
    $("#"+lb2).css('visibility','hidden');



    var lb = 'lb_S3_mes_'+i+'_txt';
    var lb2 = 'lb_S3_mes_'+i;
    $("#"+lb).html('S3:');
    $("#"+lb2).css('visibility','hidden');



    var lb = 'lb_S4_mes_'+i+'_txt';
    var lb2 = 'lb_S4_mes_'+i;
    $("#"+lb).html('S4:');
    $("#"+lb2).css('visibility','hidden');


   }


}//------------------------------------- ini   cronogramaEstadoNatural() -------------------------------------




















function fnSp3agregaTareasActividadObjetivoPlan(idActividad)
{//------------------------------------- ini   fnSp3agregaTareasActividadObjetivoPlan() -------------------------------------

  alert('Agragando las tareas de la Actividad ('+ idActividad +') plan');
}//------------------------------------- ini   fnSp3agregaTareasActividadObjetivoPlan() -------------------------------------

function fnSp3agregaCronogramaActividadObjetivoPlan(idActividad)
{//------------------------------------- ini   fnSp3agregaCronogramaActividadObjetivoPlan() -------------------------------------
  isAcct = idActividad;
  $("#Sp3VentanCronogramaActividadPlan").modal("show").addClass("fade");
  $("#lbTitleCronogramaActividadPlanAnual").html("Ingresar Cronogramas de Actividades *** Tareas de la Actividad 1 *** - Objetivo 1: Optimizar inversiones costos y gastos en SSOMA");
  cronogramaEstadoNatural();


  if(newCron == 0)//no esta creado el objeto cronograma
  {

    
        if(istSobj == null)//es un objetivo
        {
            //var m = objNewPA.Objetivos[istObj].Actividades.length; 

            

             for(var i = 0; i<12;i++)
                {//--------------------------------------------------------------------------------------------------------------------

                    objNewPA.Objetivos[istObj].Actividades[idActividad].Cronogramas[i] = new Cronograma;
                    var objCr = objNewPA.Objetivos[istObj].Actividades[idActividad].Cronogramas[i];
                    objCr.Id = idActividad+'_'+i; 
                    objCr.ActividadPlanId = idActividad; 
                    objCr.Year_Frecuencia = $('#sel_year_frecuencia').val();
                    objCr.Mes_Num = i+1; 
                    objCr.Mes_Name = varMes[i];
                    objCr.S1 = 0; 
                    objCr.S2 = 0;  
                    objCr.S3 = 0; 
                    objCr.S4 = 0; 
                
                    objCr.Fecha_S1_Ini = '00/00/0000'; 
                    objCr.Fecha_S1_Fin = '00/00/0000'; 
                
                    objCr.Fecha_S2_Ini = '00/00/0000';  
                    objCr.Fecha_S2_Fin = '00/00/0000'; 
                
                    objCr.Fecha_S3_Ini = '00/00/0000';  
                    objCr.Fecha_S3_Fin = '00/00/0000'; 
                
                    objCr.Fecha_S4_Ini = '00/00/0000'; 
                    objCr.Fecha_S4_Fin = '00/00/0000'; 
                }//--------------------------------------------------------------------------------------------------------------------

            newCron = 1;

            console.log('** se acaba de crear el cronograma **', objNewPA);
        }
        else
        {//es un subobjetivo
            for(var i = 0; i<12;i++)
                {//--------------------------------------------------------------------------------------------------------------------
                    
                    objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[idActividad].Cronogramas[i] = new Cronograma;
                    var objCr = objNewPA.Objetivos[istObj].SubObjetivos[istSobj].Actividades[idActividad].Cronogramas[i];
                    objCr.Id = idActividad+'_'+i; 
                    objCr.ActividadPlanId = idActividad; 
                    objCr.Year_Frecuencia = $('#sel_year_frecuencia').val();
                    objCr.Mes_Num = i+1; 
                    objCr.Mes_Name = varMes[i];
                    objCr.S1 = 0; 
                    objCr.S2 = 0;  
                    objCr.S3 = 0; 
                    objCr.S4 = 0; 
                
                    objCr.Fecha_S1_Ini = '00/00/0000'; 
                    objCr.Fecha_S1_Fin = '00/00/0000'; 
                
                    objCr.Fecha_S2_Ini = '00/00/0000';  
                    objCr.Fecha_S2_Fin = '00/00/0000'; 
                
                    objCr.Fecha_S3_Ini = '00/00/0000';  
                    objCr.Fecha_S3_Fin = '00/00/0000'; 
                
                    objCr.Fecha_S4_Ini = '00/00/0000'; 
                    objCr.Fecha_S4_Fin = '00/00/0000'; 
                }//--------------------------------------------------------------------------------------------------------------------

            newCron = 1;

            console.log('** se acaba de crear el cronograma **', objNewPA);
        }

  }
  else
  {

  }

  
  // nActsN = objNewPA.Objetivos[istObj].Actividades.length; 
// objNewPA.Objetivos[istObj].Actividades[nActsN] = new Actividad();
// objNewPA.Objetivos[istObj].Actividades[nActsN].Id = nActsN;
// iddd2 = 'itemAct_'+ty+"_"+nActsN;


}//------------------------------------- ini   fnSp3agregaCronogramaActividadObjetivoPlan() -------------------------------------




function fnSp3CerrarNuevasCronogramaPlan()
{//------------------------------------- ini   fnSp3CerrarVentanaMostrarPlanAnual() -------------------------------------
    $("#Sp3VentanCronogramaActividadPlan").modal("hide").removeClass("fade");
}//------------------------------------- ini   fnSp3CerrarVentanaMostrarPlanAnual() -------------------------------------


function fnSp3verCronogramaPlan(ij, itemx)
{//------------------------------------- ini   fnSp3CerrarVentanaMostrarPlanAnual() -------------------------------------

//Year_Frecuencia    <option selected value='0'> 2021 </option>
$('#sel_year_frecuencia').html("<option selected value='"+itemx.Year_Frecuencia+"'> "+itemx.Year_Frecuencia+" </option>");
//alert(itemx.S1+'<---->'+itemx.Fecha_S1_Ini);
var  mex = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

if(itemx.S1 == 1) 
{ 
  
    var bn = 'mes_'+itemx.Mes_Num+'_S1';    
    $("#"+bn).css('background-color','#05BEEE'); 

    var lb = 'lb_S1_mes_'+itemx.Mes_Num+'_txt';
    var lb2 = 'lb_S1_mes_'+itemx.Mes_Num;


    dt = itemx.Fecha_S1_Ini.split('/');
    var dia= dt[0];
    var mes= parseInt(dt[1]);
    var anio= dt[2];

    diax = diaSemana(dia,mes,anio);

     dt1 = itemx.Fecha_S1_Fin.split('/');
    var dia1= dt1[0];
    var mes1= parseInt(dt1[1]);
    var anio1= dt1[2];

    diax1 = diaSemana(dia1,mes1,anio1);


    $("#"+lb).html('S1:&nbsp;&nbsp;'+diax+'&nbsp;'+dia+'&nbsp;-&nbsp;'+diax1+'&nbsp;'+dia1);
    $("#"+lb2).css('visibility','visible');

    //alert(itemx.Mes_Name+" = "+itemx.Fecha_S1_Ini+" = "+lb2);

    
}


if(itemx.S2 == 1) 
{ 
    var bn = 'mes_'+itemx.Mes_Num+'_S2';    
    $("#"+bn).css('background-color','#05BEEE'); 

    var lb = 'lb_S2_mes_'+itemx.Mes_Num+'_txt';
    var lb2 = 'lb_S2_mes_'+itemx.Mes_Num;


    dt = itemx.Fecha_S2_Ini.split('/');
    var dia= dt[0];
    var mes= parseInt(dt[1]);
    var anio= dt[2];

    diax = diaSemana(dia,mes,anio);

     dt1 = itemx.Fecha_S2_Fin.split('/');
    var dia1= dt1[0];
    var mes1= parseInt(dt1[1]);
    var anio1= dt1[2];

    diax1 = diaSemana(dia1,mes1,anio1);



    $("#"+lb).html('S2: '+diax+'  '+dia+' - '+diax1+'  '+dia1);
    $("#"+lb2).css('visibility','visible');
}


if(itemx.S3 == 1) 
{ 
    var bn = 'mes_'+itemx.Mes_Num+'_S3';    
    $("#"+bn).css('background-color','#05BEEE'); 

    var lb = 'lb_S3_mes_'+itemx.Mes_Num+'_txt';
    var lb2 = 'lb_S3_mes_'+itemx.Mes_Num;


    dt = itemx.Fecha_S3_Ini.split('/');
    var dia= dt[0];
    var mes= parseInt(dt[1]);
    var anio= dt[2];

    diax = diaSemana(dia,mes,anio);

     dt1 = itemx.Fecha_S3_Fin.split('/');
    var dia1= dt1[0];
    var mes1= parseInt(dt1[1]);
    var anio1= dt1[2];

    diax1 = diaSemana(dia1,mes1,anio1);



    $("#"+lb).html('S3: '+diax+'  '+dia+' - '+diax1+'  '+dia1);
    $("#"+lb2).css('visibility','visible');
}

if(itemx.S4 == 1) 
{ 
    var bn = 'mes_'+itemx.Mes_Num+'_S3';    
    $("#"+bn).css('background-color','#05BEEE'); 

    var lb = 'lb_S4_mes_'+itemx.Mes_Num+'_txt';
    var lb2 = 'lb_S4_mes_'+itemx.Mes_Num;


    dt = itemx.Fecha_S4_Ini.split('/');
    var dia= dt[0];
    var mes= parseInt(dt[1]);
    var anio= dt[2];

    diax = diaSemana(dia,mes,anio);

     dt1 = itemx.Fecha_S4_Fin.split('/');
    var dia1= dt1[0];
    var mes1= parseInt(dt1[1]);
    var anio1= dt1[2];

    diax1 = diaSemana(dia1,mes1,anio1);



    $("#"+lb).html('S3: '+diax+'  '+dia+' - '+diax1+'  '+dia1);
    $("#"+lb2).css('visibility','visible');
}








    /*
    ActividadPlanId: 1
    Fecha_S1_Fin: "09/01/2021"
    Fecha_S1_Ini: "04/01/2021"
    Fecha_S2_Fin: null
    Fecha_S2_Ini: null
    Fecha_S3_Fin: "24/01/2021"
    Fecha_S3_Ini: "18/01/2021"
    Fecha_S4_Fin: null
    Fecha_S4_Ini: null
    Id: 1
    Mes_Name: "Enero"
    Mes_Num: 1
    S1: "1"
    S2: "0"
    S3: "1"
    S4: "0"
    */

}//------------------------------------- ini   fnSp3CerrarVentanaMostrarPlanAnual() -------------------------------------


function diaSemana(dia,mes,anio){
    var dias=["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sab"];
    var dt = new Date(mes+' '+dia+', '+anio+' 12:00:00');
    return dias[dt.getUTCDay()];    
};









function calcula_semana(sem, mes, ini_fin)
{
        var i = mes;
        var date = new Date(), 
        y = date.getFullYear(),
        m = date.getMonth(); 
        var firstDay = new Date(y, i, 1); 
        var lastDay = new Date(y, i + 1, 0);


     console.log('-------------------------------MES(',i+1,')-------------------------------- ');
     var resp = calcula_SEM(firstDay,sem,ini_fin);
     return resp;

}





var SEM1 = [];
var SEM2 = [];
var SEM3 = [];
var SEM4 = [];
function calcula_SEM(fe,sem,ini_fin)
{//-------------------------------------------------------------
     
     /*var dia = parseInt(fe.getDay());// 0Domingo
     var mes = parseInt(fe.getMonth()); mes = mes+1;
     var diaNum = parseInt(fe.getDate());
     var year = parseInt(fe.getFullYear());


     var SEM1i = [];   var SEM1f = [];
     var SEM2i = [];   var SEM2f = [];
     var SEM3i = [];   var SEM3f = [];
     var SEM4i = [];   var SEM4f = [];


     switch (dia) 
     {//------------------------------------------------------------
               case 0://domingo
                  diaNum = diaNum +1;
               break;
               
               
               case 2://Martes
                    diaNum = diaNum +6;
               break;
            
               case 3://miercoles
                    diaNum = diaNum +5;
               break;
            
               case 4: //Jueves
                    diaNum = diaNum +4;
               break;
            
               case 5://Viernes
               		diaNum = diaNum +3;
               break;

               case 6://Sabado
               		diaNum = diaNum +2;
               break;
            
            
               default:  
     }//-----------------------------------------------------------

    

     var diai = diaNum; var diaf = diai+4;
     SEM1i[mes-1] = diai+'/'+mes+'/'+year;
     SEM1f[mes-1] = diaf+'/'+mes+'/'+year;
     //console.log(SEM1[mes-1]);
     diaNum = diaNum +7;


     var diai = diaNum;var diaf = diai+4;
     SEM2i[mes-1] = diai+'/'+mes+'/'+year;
     SEM2f[mes-1] = diaf+'/'+mes+'/'+year;
     diaNum = diaNum +7;


     var diai = diaNum;var diaf = diai+4;
     SEM3i[mes-1] = diai+'/'+mes+'/'+year;
     SEM3f[mes-1] = diaf+'/'+mes+'/'+year;
     diaNum = diaNum +7;


     var diai = diaNum;var diaf = diai+4;
     SEM4i[mes-1] = diai+'/'+mes+'/'+year;
     SEM4f[mes-1] = diaf+'/'+mes+'/'+year;
     diaNum = diaNum +7;
     

     //sem,ini_fin

     switch (sem) 
     {//------------------------------------------------------------
               case 1://ini_fin
                  if(ini_fin = 'ini') { return SEM1i[mes-1];}
                  else if(ini_fin = 'fin') { return SEM1f[mes-1];}
               break;
            
               case 2:
                if(ini_fin = 'ini') { return SEM2i[mes-1];}
                else if(ini_fin = 'fin') { return SEM2f[mes-1];}
               break;
            
               case 3:
                if(ini_fin = 'ini') { return SEM3i[mes-1];}
                else if(ini_fin = 'fin') { return SEM3f[mes-1];}
               break;
            
               case 4:
                if(ini_fin = 'ini') { return SEM4i[mes-1];}
                else if(ini_fin = 'fin') { return SEM4f[mes-1];}
               break;
            
               
               default:  
     }//-----------------------------------------------------------

*/



var dia = parseInt(fe.getDay());// 0Domingo
var mes = parseInt(fe.getMonth()); mes = mes+1;
var diaNum = parseInt(fe.getDate());
var year = parseInt(fe.getFullYear());


// console.log('dia = '+daysIndex[dia]+'');
// console.log('dia_Num = '+diaNum+']');
// console.log('Mes = '+mes+']');


switch (dia) 
{//------------------------------------------------------------
          case 0://domingo
             diaNum = diaNum +1;
          break;
       
          case 2://Martes
               diaNum = diaNum +6;
          break;
       
          case 3://miercoles
               diaNum = diaNum +5;
          break;
       
          case 4: //Jueves
               diaNum = diaNum +4;
          break;
       
          case 5://Viernes
                  diaNum = diaNum +3;
          break;

          case 6://Sabado
                  diaNum = diaNum +2;
          break;
       
       
          default:  
}//-----------------------------------------------------------

var diai = diaNum;var diaf = diai+4;
if(sem == 1){if(ini_fin == 'ini'){var k = diai+'/'+mes+'/'+year; return k;}else{var k = diaf+'/'+mes+'/'+year; return k;}}
//SEM1[mes-1] = ' SEMANA1 DEL MES = '+diai+'/'+mes+'/2021   al  '+diaf+'/'+mes+'/2021';
//console.log(SEM1[mes-1]);
diaNum = diaNum +7;


var diai = diaNum;var diaf = diai+4;
if(sem == 2){if(ini_fin == 'ini'){var k = diai+'/'+mes+'/'+year; return k;}else{var k = diaf+'/'+mes+'/'+year; return k;}}
//SEM1[mes-1] = ' SEMANA2 DEL MES = '+diai+'/'+mes+'/2021   al  '+diaf+'/'+mes+'/2021';
//console.log(SEM1[mes-1]);
diaNum = diaNum +7;


var diai = diaNum;var diaf = diai+4;
if(sem == 3){if(ini_fin == 'ini'){var k = diai+'/'+mes+'/'+year; return k;}else{var k = diaf+'/'+mes+'/'+year; return k;}}
//SEM1[mes-1] = ' SEMANA3 DEL MES = '+diai+'/'+mes+'/2021   al  '+diaf+'/'+mes+'/2021';
//console.log(SEM1[mes-1]);
diaNum = diaNum +7;


var diai = diaNum;var diaf = diai+4;
if(sem == 4){if(ini_fin == 'ini'){var k = diai+'/'+mes+'/'+year; return k;}else{var k = diaf+'/'+mes+'/'+year; return k;}}
//SEM1[mes-1] = ' SEMANA4 DEL MES = '+diai+'/'+mes+'/2021   al  '+diaf+'/'+mes+'/2021';
//console.log(SEM1[mes-1]);
diaNum = diaNum +7;

}//-------------------------------------------------------------
