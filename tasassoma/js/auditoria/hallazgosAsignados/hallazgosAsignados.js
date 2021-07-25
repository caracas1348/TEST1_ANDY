//clases
//.............................................. CLASE classHallazgoAsignado ...........................................
function classHallazgoAsignado()
{
    this.dataHallazgoAsignado = [];

    classHallazgoAsignado.prototype.cargarDataServicio = function (data)
    {
        this.dataHallazgoAsignado = data;
        //console.log("==*== this.dataHallazgoAsignado[",this.dataHallazgoAsignado.Code_Evaluacion,"] = ",this.dataHallazgoAsignado);
    }
}
//.............................................. CLASE classHallazgoAsignado ...........................................

//funciones
function initHallazgosAsignados()
{//------------------------------------- ini   fnSp3AdministrarHallazgosEstadoInicial() -------------------------------------
    ItemListadoCausas  = 0
    ItemListadoCausas2 = 0
    itemPlanAccion     = 0

    showLoading();
    console.log("Arrancamos............................");
    //responsive
    fnSp4ResponsiveHallazgosAsignados();
    fnSp4CargarFuncionesHallazgosAsignadosDinamicasDOM();
    fnSp4CargarFiltrosHallazgosAsignados();
}

//------------------------------------- start   fnSp4ResponsiveHallazgosAsignados() listado-------------------------------------
function fnSp4ResponsiveHallazgosAsignados()
{
    //console.log("fnSp4ResponsiveHallazgosAsignados............................");
    var f1 = '11px';
    var f2 = '12px';
    var f3 = '14px';

    for(var i = 1; i<13; i++)
    {
        var id = 'c'+i+'TabGeny';//c1TabGeny
        id1    = id;
        id     = "#"+id;


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
                //console.log("$(",id1,").css('font-size',",f1,")");
                //document.getElementById(id1).style.setProperty( 'font-size',f1, 'important' );
            }
        }
    }
}
//------------------------------------- end   fnSp4ResponsiveHallazgosAsignados() listado-------------------------------------

//------------------------------------- start fnSp4CargarFuncionesHallazgosAsignadosDinamicasDOM() -------------------------------------
function  fnSp4CargarFuncionesHallazgosAsignadosDinamicasDOM()
{
    // campo fecha desde
    $("#txt_fecha_desdeHA").datetimepicker({
        timepicker:false,
        format:'d/m/Y'});

    // campo fecha hasta
    $("#txt_fecha_hastaHA").datetimepicker({
        timepicker:false,
        format:'d/m/Y'});
}
//------------------------------------- end  fnSp4CargarFuncionesHallazgosAsignadosDinamicasDOM() -------------------------------------

//------------------------------------- start  fnSp4CargarFiltrosHallazgosAsignados() -------------------------------------
function fnSp4CargarFiltrosHallazgosAsignados()
{
    //console.clear()
    // BLOQUEAMOS EL BOTON DE BUSCAR
    fnSp4DeshabilitarBotonPorId('buscarHallazgosAsignados', 'Buscando.....')
    //$("#buscarHallazgosAsignados").html("Buscando.....")
    //$("#buscarHallazgosAsignados").attr("disabled",true);
    showLoading();

    let fuenteHA  =  $('#sel_filter_fuenteHA').val();           if(fuenteHA == null){fuenteHA = 0;}
    let tipoHA    =  $('#sel_filter_tipo_hallazgosHA').val();   if(tipoHA == null){tipoHA = 0;}
    let normaHA   =  $('#sel_filter_normaHA').val();            if(normaHA == null){normaHA = 0;}
    let estadoACR =  $('#sel_filter_estadoACRHA').val();        if(estadoACR == null){estadoACR = 0;}

    let f1,f2,f11,f22;

    f11 = $('#txt_fecha_desdeHA').val();
    f22 = $('#txt_fecha_hastaHA').val();
    if($('#txt_fecha_desdeHA').val() != ""){f1 =  date1_DD_MM_AAAA_to_AAAA_MM_DD_T_HH_MM_S(f11)}
    else{ f1 = "";}
    if($('#txt_fecha_hastaHA').val() != ""){ f2 =  date1_DD_MM_AAAA_to_AAAA_MM_DD_T_HH_MM_S(f22)}
    else{ f2 = "";}

    let url = apiurlAuditoria+ "/api/Get-Hallazgos-All?code=NKBvao47qcJIg6Qjy/X1fUQLgxp2GarodbvWKcbQcPKbj7g4BhGUxQ==&httpmethod=objectlist&FuenteId="+fuenteHA+"&TipoHallazgoId="+tipoHA+"&NormaId="+normaHA+"&StatusAccionCorrectivaId="+estadoACR+"&FechaInicio="+f1+"&FechaFin="+f2+"&ResponsableUserHash="+getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
    //console.log("URL -> ",url )

    let headers ={
        "apikey":constantes.apiKey
    }

    let settings = {
        "url": url,
        "method": "GET",
        "timeout": 0,
        "crossDomain": true,
        "dataType": "json",
        "headers": headers,
    };

    $.ajax(settings).done(function (response)
    {
        console.log("**todos**",response);

        // LLENAMOS EL SELECT DE FUENTES
        $("#"+'sel_filter_fuenteHA').html(" ");
        $("#"+'sel_filter_fuenteHA').css('font-size','13px');
        $("#"+'sel_filter_fuenteHA').html("<option selected value='0'>          </option>");
        response.Fuentes.map(function(item)
        {
            $("#"+'sel_filter_fuenteHA').append(`<option value='${item.Id}' title='${item.Fuente}' style='font-weight: bold;'>${item.Fuente}</option>`);
        });

        // LLENAMOS EL SELECT DE TIPOS DE HALLAZGOS
        $("#"+'sel_filter_tipo_hallazgosHA').html(" ");
        $("#"+'sel_filter_tipo_hallazgosHA').css('font-size','13px');
        $("#"+'sel_filter_tipo_hallazgosHA').html("<option selected value='0'>          </option>");
        response.TipoHallazgos.map(function(item)
        {
            $("#"+'sel_filter_tipo_hallazgosHA').append(`<option value='${item.Id}'  title='${item.TipoHallazgo}' style='font-weight: bold;'>${item.TipoHallazgo}</option>`);
        });

        // LLENAMOS EL SELECT DE NORMAS
        $("#"+'sel_filter_normaHA').html(" "); $("#"+'sel_filter_normaHA').css('font-size','13px');
        $("#"+'sel_filter_normaHA').html("<option selected value='0'>          </option>");
        response.Normas.map(function(item)
        {
            $("#"+'sel_filter_normaHA').append(`<option value='${item.Id}'  title='${item.Norma}' style='font-weight: bold;'>${item.Norma}</option>`);
        });

        // LLENAMOS EL SELECT DE ESTADOS DE ACR
        $("#"+'sel_filter_estadoACRHA').html(" "); $("#"+'sel_filter_estadoACRHA').css('font-size','13px');
        $("#"+'sel_filter_estadoACRHA').html("<option selected value='0'>          </option>");
        response.StatusAccionCorrectiva.map(function(item)
        {
            $("#"+'sel_filter_estadoACRHA').append(`<option value='${item.Id}'  title='${item.Description}' style='font-weight: bold;'>${item.Description}</option>`);
        });

        // CREAMOS EL OBJETO DE LAS AREAS
        objAreas = new classAreas()
        objAreas.cargarDataAreas(response.Areas)

        // CREAMOS EL OBJETO DE LOS COLORES DEL ANALISIS
        objColoresAnalisis = new classColoresAnalisis()
        objColoresAnalisis.cargarDataColoresAnalisis(response.ColoresAnalisis)

        // CREAMOS EL OBJETO DE PLAZO ACCION
        objPlazoAccion = new classPlazoAccion()
        objPlazoAccion.cargardataPlazoAccion(response.PlazoAccion)

        // CREAMOS EL OBJETO DE TIPO ACCION
        objTipoAccion = new classTipoAccion()
        objTipoAccion.cargardataTipoAccion(response.TipoAccion)

        // CREAMOS EL OBJETO DE STATUS ACCION
        objStatusAccion = new classStatusAccion()
        objStatusAccion.cargardataStatusAccion(response.StatusAccion)


        //console.log("objColoresAnalisis",objColoresAnalisis)
        // OBTENEMOS EL TOTAL DE HALLAZGOS ASIGNADOS
        $("#cant_hallazgos_asignados").html('<b> '+ response.Hallazgos.length+'</b> ');

        // RECORREMOS LA DATA PARA LLENAR EL LISTADO
        if(response.Hallazgos.length > 0)
        {
            ///// START LLENO MI OBJETO DE HALLAZGOS ASIGNADOS
            objHallazgoAsignado = []
            response.Hallazgos.map(function(Item)
            {
                objHallazgoAsignado[Item.Id] = new classHallazgo()
                objHallazgoAsignado[Item.Id].cargarDataServicio(Item)
            })
            ///// END LLENO MI OBJETO DE HALLAZGOS ASIGNADOS

            $('#bodyTablaHallazgosAsignados').html(" ");
            $('#bodyTablaSinHallazgosAsignados').css('display','none');

            $('#pagination-container-HallazgosAsignados').pagination({

                dataSource: response.Hallazgos,
                pageSize: 4,
                callback: function(data, pagination) {
                    let html = fnSp4ListarHallazgosAsignados(data);
                    $('#bodyTablaHallazgosAsignados').html(html);

                }
            })
        }
        else // si no hay registros
        {
            $('#bodyTablaHallazgosAsignados').html(" ");
            $('#bodyTablaSinHallazgosAsignados').css('display','block');
        }

    })
    .fail(function( jqXHR, textStatus, errorThrown)
    {
        console.log( jqXHR, textStatus, errorThrown)
    })
    .always(function( jqXHR, textStatus, errorThrown )
    {
        // ACTIVAMOS EL BOTON DE BUSCAR
        //$("#buscarHallazgosAsignados").html("Buscar")
        //$("#buscarHallazgosAsignados").attr("disabled",false);
        fnSp4HabilitarBotonPorId("buscarHallazgosAsignados","Buscar","")
        $('#sel_filter_fuenteHA').val(fuenteHA);
        $('#sel_filter_tipo_hallazgosHA').val(tipoHA);
        $('#sel_filter_normaHA').val(normaHA);
        $('#sel_filter_estadoACRHA').val(estadoACR);
        $('#txt_fecha_desdeHA').val(f11);
        $('#txt_fecha_hastaHA').val(f22);
        hideLoading();

        /// Cuando venimos de eliminar una tarjeta....
        if(hallazgoActivo>0){
            objAC = new classAccionCorretiva()
            objAC.cargarAccionCorrectiva(objHallazgoAsignado[hallazgoActivo].dataHallazgo)
            // corregir el array de integrantes analisis....
            if(objAC.IntegrantesAnalisis!=null)
            {
                var ia = []
                objAC.IntegrantesAnalisis.forEach(function(item)
                {
                    var a = JSON.parse(item)
                    //var a = item

                    $(".listadoIntegrantesAnalisis").append("<a href='#'><li>"+a.Name+"</li></a>")
                    ia.push(a)
                });

                objAC.IntegrantesAnalisis = ia
            }
            fnPintarAnalisisProblema();

            //console.error("444444 objAC",objAC)
        }//*/
        //console.warn("444444 objHallazgoAsignado",objHallazgoAsignado)

    });

}
//------------------------------------- end  fnSp4CargarFiltrosHallazgosAsignados() -------------------------------------

//------------------------------------- start  fnSp4ListarHallazgosAsignados() -------------------------------------
function fnSp4ListarHallazgosAsignados(data)
{
    let html          = ''
    // AQUI VAMOS A CREAR UN OBJETO PARA CADA HALLAZGO ASIGNADO
    data.forEach((Item)=>
    {
        let backgroundACR = 'background-color:#34559c;'
        let titleACR      = ''
        let disabledACR   = ''
        // para mostrar campos dinamicos bloqueado en la modal de evaluar
        // y activos en esta modulo...
        let ver           = ''

        //objHallazgoAsignado[Item.Id] = new classHallazgo()
        //objHallazgoAsignado[Item.Id].cargarDataServicio(Item)
        console.warn(Item)
        if(Item.AccionCorrectiva.FechaInicioAnalisis==""||Item.AccionCorrectiva.FechaInicioAnalisis==null)
            Item.AccionCorrectiva.FechaInicioAnalisis='---'

        if(Item.AccionCorrectiva.FechaFinAnalisis==""||Item.AccionCorrectiva.FechaFinAnalisis==null)
            Item.AccionCorrectiva.FechaFinAnalisis='---'

        if(Item.StatusAccionCorrectivaId==2)
        {
            disabledACR   = 'disabled readonly'
            backgroundACR = 'background-color: #b2b2b2 !important;'
        }


        titleACR      = 'Atender Hallazgo '+Item.Code_Hallazgo


        html += `
            <div class="item-tabla py-2 px-4" style="z-index: 1;display:relative;">
                <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                    <div class="col-12 text-center" style="font-size: 14px; padding: 4px !important; ">
                        <div class="row">

                            <table width = "100%" border="0">
                                <tr>

                                    <td width = "10%" align="center"><div id="c1TabGeny" class="text-left lbCabezaTabla1"  >${Item.Code_Hallazgo}</div></td>
                                    <td width = "10%" align="center"><div id="c2TabGeny" class="text-left lbCabezaTabla1"  >${Item.Fuente}</div></td>
                                    <td width = "10%" align="center"><div id="c3TabGeny" class="text-left lbCabezaTabla1"  >${Item.TipoHallazgo}</div></td>
                                    <td width = "10%" align="center"><div id="c4TabGeny" class="text-left lbCabezaTabla1"  >${Item.Norma}</div></td>
                                    <td width = "15%" align="center"><div id="c5TabGeny" class="text-left lbCabezaTabla1"  >${Item.ReportanteName}</div></td>
                                    <td width = "8%" align="center"><div id="c6TabGeny" class="text-left lbCabezaTabla1"  >${Item.FechaEjecucion}</div></td>
                                    <td width = "8%" align="center"><div id="c7TabGeny" class="text-left lbCabezaTabla1"  >${Item.AccionCorrectiva.FechaInicioAnalisis}</div></td>
                                    <td width = "8%" align="center"><div id="c7TabGeny" class="text-left lbCabezaTabla1"  >${Item.AccionCorrectiva.FechaFinAnalisis}</div></td>
                                    <td width = "8%" align="center"><div id="c8TabGeny" class="text-left lbCabezaTabla1" style="font-weight: bold; color:${Item.StatusHallazgoCode}";  >${Item.StatusHallazgo}</div></td>
                                    <td width = "8%" align="center"><div id="c9TabGeny" class="text-left lbCabezaTabla1" style="font-weight: bold; color:${Item.StatusAccionCorrectivaCode}";  >${Item.StatusAccionCorrectiva}</div></td>
                                    <td width = "5%" align="center"><div id="c10TabGeny" class="text-center lbCabezaTabla1"  >

                                        <button type='button' onclick="fnSp4VerModalCrearACR(${Item.Id},'${ver}')" class='btn-circle btn_read border-0' ${disabledACR} style='${backgroundACR} cursor:pointer !important;' id='btn_AtenderHallazgo_${Item.Id}' title ='${titleACR}'  >
                                                <img src='./images/iconos/searching1.png'  title ='${titleACR}' style = 'cursor:pointer !important;'>
                                        </button>

                                    </div></td>

                                </tr>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        `
    })

    //console.log("objHallazgoAsignado",objHallazgoAsignado)

    return html
}

//------------------------------------- end  fnSp4ListarHallazgosAsignados() -------------------------------------

//------------------------------------- start  fnSp4BuscarHallazgosAsignados() -------------------------------------
function fnSp4BuscarHallazgosAsignados()
{
    fnSp4CargarFiltrosHallazgosAsignados()
}
//------------------------------------- end  fnSp4BuscarHallazgosAsignados() -------------------------------------

//------------------------------------- start  fnSp4VerModalCrearACR() -------------------------------------
function fnSp4VerModalCrearACR(hallazgoId, ver)
{
    hallazgoActivo = hallazgoId
    verProblemaHA  = false; // bandera para mostrar u ocultar definicion del problema pestaña 3
    count1PorQue   = 0; // contador de cuantos 1er porque has creados

    let totalIntegrantesAnalisis = "00"

    objAC = new classAccionCorretiva()
    objAC.cargarAccionCorrectiva(objHallazgoAsignado[hallazgoActivo].dataHallazgo)

    fnSp4DeshabilitarBotonPorId('btnFinalizarACR','Finalizar',"#858585")
    console.log("objAC",objAC)
    console.info("objHallazgoAsignado[hallazgoActivo].dataHallazgo",objHallazgoAsignado[hallazgoActivo].dataHallazgo)

    //fnSp4DeshabilitarBotonPorId('txt_tema_HA','')

    // SI NO ESTA DEFINIDO EL PROBLEMA BLOQUEADOS STEP 3 Y STEP 4
    if(objAC.Flag_Definido==0)
    {
        fnSp4DeshabilitarBotonPorId("btn_step31","")
        fnSp4DeshabilitarBotonPorId("btn_step41","")
    }
    else
    {
        fnSp4HabilitarBotonPorId("btn_step31","","")
        fnSp4HabilitarBotonPorId("btn_step41","","")
    }

    // COLOCAMOS TITULO A LA MODAL
    $("#titleModalVerACR").html("ACR - "+objHallazgoAsignado[hallazgoActivo].dataHallazgo.Code_Hallazgo)

    // DEFINIMOS EL STEP ACTIVO
    //$('#btn_step11').addClass('btn-primary-check');
    $('#btn_step11').click();

    var allWells = $('.setup-content'); // content div
    var step1    = $('#step-11HA');
    allWells.hide(); // hide all contents by defauld
    step1.show();

    // TOTAL INTEGRANTES ANALISIS
    totalIntegrantesAnalisis = "00"
    if(objAC.IntegrantesAnalisis!=null)
    {
        totalIntegrantesAnalisis = (objAC.IntegrantesAnalisis.length>9)
            ? objAC.IntegrantesAnalisis.length
            : "0"+objAC.IntegrantesAnalisis.length
        //console.warn("integrantes!=null")
    }
    $("#totalIntegrantesAnalisisHA").html(totalIntegrantesAnalisis)

    // LISTADO DE INTEGRANTES DEL ANALISIS
    $(".listadoIntegrantesAnalisis").html("")
    vw_principal.init();

    // el tercer parameto = 0 es para que agregue al listado de integrantes
    fnSp4GetPerson($("#buscardorIntegrantes1"),1,0,0,0,0,0,0,0,0);

    // LISTADO DE INTEGRANTES DEL ANALISIS
    if(objAC.IntegrantesAnalisis!=null)
    {
        var ia = []
        objAC.IntegrantesAnalisis.forEach(function(item)
        {
            var a = JSON.parse(item)
            //var a = item

            $(".listadoIntegrantesAnalisis").append("<a href='#'><li>"+a.Name+"</li></a>")
            ia.push(a)
        });

        objAC.IntegrantesAnalisis = ia
    }

    // TEMA U HALLAZGO
    $("#temaHA").html(objHallazgoAsignado[hallazgoActivo].dataHallazgo.Hallazgo) // PESTAÑA 1
    $("#temaHA2").html(objHallazgoAsignado[hallazgoActivo].dataHallazgo.Hallazgo) // PESTAÑA 2

    // NORMA QUE INCUMPLE
    $("#normaIncumpleHA").html(objHallazgoAsignado[hallazgoActivo].dataHallazgo.Norma)

    // REQUISITO QUE INCUMPLE
    $("#requisitoIncumpleHA").html(objAC.Requisito)

    // FECHA INICIO DE ANALISIS
    $("#fechaInicioAnalisisHA").html(objHallazgoAsignado[hallazgoActivo].dataHallazgo.AccionCorrectiva.FechaInicioAnalisis)

    // FECHA FIN DE ANALISIS
    $("#fechaFinAnalisisHA").html(objHallazgoAsignado[hallazgoActivo].dataHallazgo.AccionCorrectiva.FechaFinAnalisis)

    // CERO PERDIDAS
    $("#radiosCeroPerdidas").html('')
    $("#radiosCeroPerdidas").append(`<div class="group-form group-form--check col-12 col-sm-6 col-md-2 col-lg-2"><input class="mb-2" type="radio" id="cp1" ${ver} onclick="fnSp4DesHabOtraPerdida(1)" name="ceroPerdidas" value="1"><label for="cp1">&nbsp;Cero Defectos</label></div>`)
    $("#radiosCeroPerdidas").append(`<div class="group-form group-form--check col-12 col-sm-6 col-md-2 col-lg-2"><input class="mb-2" type="radio" id="cp2" ${ver} onclick="fnSp4DesHabOtraPerdida(2)" name="ceroPerdidas" value="2"><label for="cp2">&nbsp;Cero Accidentes</label></div>`)
    $("#radiosCeroPerdidas").append(`<div class="group-form group-form--check col-12 col-sm-6 col-md-2 col-lg-2"><input class="mb-2" type="radio" id="cp3" ${ver} onclick="fnSp4DesHabOtraPerdida(3)" name="ceroPerdidas" value="3"><label for="cp3">&nbsp;Cero Averias</label></div>`)
    $("#radiosCeroPerdidas").append(`<div class="group-form group-form--check col-12 col-sm-6 col-md-2 col-lg-2"><input class="mb-2" type="radio" id="cp4" ${ver} onclick="fnSp4HabOtraPerdida(4)" name="ceroPerdidas" value="4"><label for="cp4">&nbsp;Otra Perdida</label></div>`)
    $("#radiosCeroPerdidas").append(`<div class="py-0 px-4 group-form group-form--border col-12 col-sm-6 col-md-4 col-lg-4"><input disabled="disabled" type="text" ${ver} class="btn-formAuditor date-small2 btn-prog form-control2 text-left" id="otraPerdidaHA" onkeyup="fnSp4SaveOtraPerdida()" placeholder="Escribir ¿cuál?"></div>`)

    //console.log("objAC.HACeroPerdidasId",objAC.HACeroPerdidasId)
    //console.log("objHallazgoAsignado[hallazgoActivo].dataHallazgo.AccionCorrectiva.HACeroPerdidasId",objHallazgoAsignado[hallazgoActivo].dataHallazgo.AccionCorrectiva.HACeroPerdidasId)

    if(objAC.HACeroPerdidasId!=0)
    {
        let id = objAC.HACeroPerdidasId
        $("#cp"+id).attr('checked', true);

        //objAC.HACeroPerdidasId = id
        if(id==4) {
            fnSp4HabOtraPerdida(id)
            $("#otraPerdidaHA").val(objAC.CeroPerdidasDescription)
        }
        else
        {
            fnSp4DesHabOtraPerdida(id)
            $("#otraPerdidaHA").val('')
        }
    }

    // REPORTENTE DEL HALLAZGO
    $("#reportanteHA").html(objHallazgoAsignado[hallazgoActivo].dataHallazgo.ReportanteName)

    // FUENTE DEL HALLAZGO
    $("#fuenteHA").html(objHallazgoAsignado[hallazgoActivo].dataHallazgo.Fuente)

    // FECHA EJECUCION
    $("#fechaEjecucionHA").html(objHallazgoAsignado[hallazgoActivo].dataHallazgo.FechaEjecucion)

    // HORA EJECUCION
    $("#horaEjecucionHA").html(objHallazgoAsignado[hallazgoActivo].dataHallazgo.Hora)

    // LLENAMOS EL SELECT DE LAS AREAS
    $("#selectAreasHA").html("")
    $("#selectAreasHA").html("<option value='0'></option>")
    //console.log("objAreas",objAreas)
    objAreas.dataAreas.forEach(function(item)
    {
        if( item.UnidadNegocioId == objHallazgoAsignado[hallazgoActivo].dataHallazgo.UnidadNegocioId)
        {
            if( item.Id == objAC.AreaId)
            {
                $("#selectAreasHA").append(`<option value='${item.Id}' selected title='${item.Description}' style='font-weight: bold;'>${item.Description}</option>`)
            }
            else
            {
                $("#selectAreasHA").append(`<option value='${item.Id}' title='${item.Description}' style='font-weight: bold;'>${item.Description}</option>`)
            }
        }
    })

    /////////////////  START DEFINICION DEL PROBLEMA

    // QUE
    $("#queHA").val(objAC.Que)
    // DONDE
    $("#dondeHA").val(objAC.Donde)
    // CUANDO
    $("#cuandoHA").val(objAC.Cuando)
    // COMO
    $("#comoHA").val(objAC.Como)
    // CUAL
    $("#cualHA").val(objAC.Cual)
    // PROBLEMA
    $("#problemaHA").val(objAC.Problema)

    /////////////////  END DEFINICION DEL PROBLEMA

    // MOSTRAMOS MODAL CREAR ACR
    $('#modalVerACR').modal('show').addClass('fade')

    //crear 1er porque prueba
    if(objAC.AnalisisProblema.length==0)
    {

        //fnSp4Agregar1erPorQue(0,0,0) // 0 porque es nuevo
        //fnSp4AgregarPorque(1,count1,count2,count3,count4,count5,ver)
        fnSp4AgregarPorqueB(1,0,0,0,0,0,ver)

    }

}
//------------------------------------- end  fnSp4VerModalCrearACR() -------------------------------------

////////////////////////////////////////////////////////// PRUEBAS START


//------------------------------------- start  fnPintarAnalisisProblema() -------------------------------------
var fnPintarAnalisisProblema = function(ver)
{
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            $("#td_"+i+"_"+j).html('')
        }
    }

    $("#body5PorQue").html('')
    // 5 2to-porque de 1 1to-porque
    for (var i1 = 0; i1 < 5; i1++)
    {
        $("#body5PorQue").append(`<tr><td rowspan="781" nivel="1" id="1pq_${i1}" ><!--${i1}--></td></tr>`)
        //if(i1==0) fnSp4AgregarPorqueB(1,i1,0,0,0,0,ver)
        // 5 2to-porque de 1 1to-porque
        for (var i2 = 0; i2 < 5; i2++)
        {
            $("#body5PorQue").append(`<tr><td rowspan="156" nivel="2" id="2pq_${i1}${i2}" ><!--${i1}-${i2}--></td></tr>`)
            // 5 3to-porque de 1 2to-porque
            for (var i3 = 0; i3 < 5; i3++)
            {
                $("#body5PorQue").append(`<tr><td rowspan="31" nivel="3" id="3pq_${i1}${i2}${i3}" ><!--${i1}-${i2}-${i3}--></td></tr>`)
                // 5 4to-porque de 1 3to-porque
                for (var i4 = 0; i4 < 5; i4++)
                {
                    $("#body5PorQue").append(`<tr><td rowspan="6" nivel="4" id="4pq_${i1}${i2}${i3}${i4}" ><!--${i1}-${i2}-${i3}-${i4}--></td></tr>`)

                    // 5 5to-porque de 1 4to-porque
                    for (var i5 = 0; i5 < 5; i5++)
                    {
                        $("#body5PorQue").append(`<tr><td rowspan="1" nivel="5" id="5pq_${i1}${i2}${i3}${i4}${i5}" ><!--${i1}-${i2}-${i3}-${i4}-${i5}--></td></tr>`)
                    }
                }
            }

        }
    }
    //////////////////////// pruebas end


    // start 1er porque
    var count1 = 0
    var count2 = 0
    var count3 = 0
    var count4 = 0
    var count5 = 0

    if(objAC.AnalisisProblema.length>0)
    {
        objAC.AnalisisProblema.forEach(function(item1)
        {

            //console.error("********* item1.AnalisisProblema.length",item1.AnalisisProblema.length)
            //console.error("start 1pq", count1, count2, count3, count4, count5)

            //fnSp4CrearPorque(item1,count1,0,0,0,0,ver)
            fnSp4CrearPorqueB(item1,count1,0,0,0,0,ver)

            // start 2do porque
            if(item1.AnalisisProblema.length>0)
            {
                //count2 = 0
                item1.AnalisisProblema.forEach(function(item2)
                {

                    //console.error("********* item2.AnalisisProblema.length",item2.AnalisisProblema.length)
                    //console.error("start 2pq", count1, count2, count3, count4, count5)

                    //fnSp4CrearPorque(item2,count1,count2,0,0,0,ver)
                    fnSp4CrearPorqueB(item2,count1,count2,0,0,0,ver)
                    //count2++//prueba

                    // start 3er porque
                    if(item2.AnalisisProblema.length>0)
                    {
                        //count3 = 0
                        item2.AnalisisProblema.forEach(function(item3)
                        {

                            //console.error("********* item3.AnalisisProblema.length",item3.AnalisisProblema.length)
                            //console.error("start 3pq", count1, count2, count3, count4, count5)

                            //fnSp4CrearPorque(item3,count1,count2,count3,0,0,ver)
                            fnSp4CrearPorqueB(item3,count1,count2,count3,0,0,ver)
                            //count3++
                            // start 4to porque
                            if(item3.AnalisisProblema.length>0)
                            {
                                //count4 = 0
                                item3.AnalisisProblema.forEach(function(item4)
                                {

                                    //console.error("********* item4.AnalisisProblema.length",item4.AnalisisProblema.length)
                                    //console.error("start 4pq", count1, count2, count3, count4, count5)

                                    //fnSp4CrearPorque(item4,count1,count2,count3,count4,0,ver)
                                    fnSp4CrearPorqueB(item4,count1,count2,count3,count4,0,ver)
                                    //count4++
                                    // start 5to porque
                                    if(item4.AnalisisProblema.length>0)
                                    {
                                        //count5 = 0
                                        item4.AnalisisProblema.forEach(function(item5)
                                        {
                                            //console.error("********* item5.AnalisisProblema.length",item5.AnalisisProblema.length)
                                            //console.error("start 5pq", count1, count2, count3, count4, count5)

                                            //fnSp4CrearPorque(item5,count1,count2,count3,count4,count5,ver)
                                            fnSp4CrearPorqueB(item5,count1,count2,count3,count4,count5,ver)
                                            //count5++

                                            count5++
                                        });


                                    }
                                    // end 5to porque

                                    count4++
                                });

                            }
                            // end 4to porque

                            count3++
                            count4=count5=0;
                        });

                    }
                    // end 3er porque

                    count2++
                    count3=count4=count5=0;
                });

            }
            // end 2do porque

            count1++
            count2=count3=count4=count5=0;
            count1PorQue++
        });

    }
    // end 1er porque
}
//------------------------------------- end  fnPintarAnalisisProblema() -------------------------------------

//------------------------------------- end  fnSp4AgregarPorqueB() -------------------------------------
var fnSp4AgregarPorqueB = function(Nivel,pq1,pq2,pq3,pq4,pq5,ver)
{
    let Code  = objColoresAnalisis.dataColoresAnalisis[count1PorQue].Code
    if(count1PorQue<5)
    {
        let btnAgregar = (count1PorQue==0)
            ? `<button class="grid-drop__btn" ${ver} id="newPorQueHA" onmouseup="fnSp4AgregarPorqueB(${count1PorQue},${pq1},${pq2},${pq3},${pq4},${pq5},${ver})">+ Agregar Nuevo</button>`
            : `<button class="grid-drop__btn" ${ver} disabled readonly style="display:none !important;">...</button>`

        let btnAgregarHijo = (Nivel<5)
            ? `<button class="grid-drop__add" onmouseup="fnSp4CrearPorqueHijoB(${Nivel},0,${count1PorQue},${pq2},${pq3},${pq4},${pq5})" style="background-image: url('images/triangulo-btn.svg');">+</button>`
            : `<button class="grid-drop__add" style="background-image: url('images/triangulo-btn.svg2');"></button>`

        let btnEliminar = ( count1PorQue != 0 )
            ? `<a ${ver} onmouseup="fnSp4EliminarPorQue(${Nivel},${count1PorQue},${pq2},${pq3},${pq4},${pq5})" class="fontrem" style="cursor: pointer; color:red; position: absolute; text-decoration: underline; right: 25px; top: 10px;">Eliminar</a>`
            : ``

        let pq1Id = "_"+count1PorQue+"0000"
        let gdId  = `gd${Nivel}_${pq1}${pq2}${pq3}${pq4}${pq5}`
        let pd    = "mr-1"

        let content = `
            <div class="grid-drop__body ${pd} ${gdId} my-3">
                ${btnAgregar}

                 <div class="grid-drop__drap">
                    <div class="grid-drop__contain-main">
                        ${btnAgregarHijo}

                        <div class="grid-drop__note" id="pq${pq1Id}">
                            <button class="grid-drop__tap" style="border-right-color:${Code}"></button>
                            <div class="question d-column-l">
                                <label class="text-gray fontrem" for="">Escribir Pregunta ${btnEliminar} </label>
                                <textarea ${ver} name="pr${pq1Id}" id="pr${pq1Id}" onkeyup="fnSp4SavePregunta(${count1PorQue},0,0,0,0,1,0,this)" rows="2" style="resize: none;" class="question-input" placeholder="..."></textarea>
                            </div>
                            <div class="question d-column-l bt-lightgray">
                                <label for="" class="text-gray fontrem">Escribir Respuesta </label>
                                <textarea ${ver} name="re${pq1Id}" id="re${pq1Id}" onkeyup="fnSp4SaveRespuesta(${count1PorQue},0,0,0,0,1,0,this)" rows="4" style="resize: none;" class="question-input" placeholder="..."></textarea>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        `

        //1pq_
        $(`#${Nivel}pq_${count1PorQue}`).append(`
            ${content}
        `);

        objAC.AnalisisProblema[count1PorQue]                      = new classAnalisisProblema()
        objAC.AnalisisProblema[count1PorQue].Id                   = 0
        objAC.AnalisisProblema[count1PorQue].HAAccionCorrectivaId = objAC.Id
        objAC.AnalisisProblema[count1PorQue].Code                 = objColoresAnalisis.dataColoresAnalisis[count1PorQue].Code
        objAC.AnalisisProblema[count1PorQue].HAColoresAnalisisId  = objColoresAnalisis.dataColoresAnalisis[count1PorQue].Id
        objAC.AnalisisProblema[count1PorQue].Nivel                = Nivel

        count1PorQue++
    }
    else{
        let msj = 'Ya Tienes el Máximo (05) de 1er PorQue Creados.'
        $("#subTituloErrorSp4HA").html('<b> No Puedes Crear Más 1er Porque. </b>')
        $("#mensajeErrorSp4HA").html(`${msj}`)
        $('#modalSp4MsgErrorHA').modal('show').addClass('fade')
    }
}
//------------------------------------- start  fnSp4AgregarPorqueB() -------------------------------------

//------------------------------------- start  fnSp4CrearPorqueB() -------------------------------------
var fnSp4CrearPorqueB = function(AP,pq1,pq2,pq3,pq4,pq5,ver)
{
    ver = $("#ver").val()
    let display = ''

    // DEFINIR ID de tr, td y si va el boton
    let trId       = ""
    let tdId       = ""
    let pq1Id      = ''
    let gdId       = ''
    let pd         = 'mx-1'
    let content    = ""

    let btnAgregar = (AP.Nivel==1 && pq1==0 )
            ? `<button ${ver} class="grid-drop__btn" id="newPorQueHA" onmouseup="fnSp4AgregarPorqueB(${AP.Nivel},${pq1},${pq2},${pq3},${pq4},${pq5},${ver})">+ Agregar Nuevo</button>`
            : `<button class="grid-drop__btn" disabled readonly style="display:none !important;">...</button>`

    let btnAgregarHijo = (AP.Nivel<5)
        ? `<button ${ver} class="grid-drop__add" onmouseup="fnSp4CrearPorqueHijoB(${AP.Nivel},0,${pq1},${pq2},${pq3},${pq4},${pq5})" style="background-image: url('images/triangulo-btn.svg');">+</button>`
        : ``//`<button ${ver} class="grid-drop__add" ></button>`

    let btnEliminar = ( (AP.Nivel==1 && pq1!=0) || (AP.Nivel>1) )
        ? `<a onmouseup="fnSp4EliminarPorQue(${AP.Nivel},${pq1},${pq2},${pq3},${pq4},${pq5})" class="fontrem" style=" cursor: pointer; color:red; position: absolute; text-decoration: underline; right: 25px; top: 10px;">Eliminar</a>`
        : ``
    if(ver=="disabled")
    {
        console.warn("no mostrar eliminar")
        btnEliminar = ""
    }
    //let btnEliminar = `<a onmouseup="fnSp4EliminarPorQue(${AP.Nivel},${pq1},${pq2},${pq3},${pq4},${pq5})" class="fontrem" style="color:red; position: absolute; text-decoration: underline; right: 25px; top: 10px;">Eliminar</a>`

    switch(AP.Nivel)
    {
        //let gdId  = `gd${Nivel}_${pq1}${pq2}${pq3}${pq4}${pq5}`
        case 1:
            tdId  = `${AP.Nivel}pq_${pq1}`
            gdId  = `gd${AP.Nivel}_${pq1}${pq2}${pq3}${pq4}${pq5}`
            pq1Id = "_"+pq1+""+pq2+pq3+pq4+pq5
            pd    = "mr-1"
            break;
        case 2:
            tdId  = `${AP.Nivel}pq_${pq1}${pq2}`
            pq1Id = ""+pq1+"_"+pq2+pq3+pq4+pq5
            pd    = "mx-1"
            break;
        case 3:
            tdId  = `${AP.Nivel}pq_${pq1}${pq2}${pq3}`
            pq1Id = ""+pq1+pq2+"_"+pq3+pq4+pq5
            pd    = "mx-1"
            break;
        case 4:
            tdId  = `${AP.Nivel}pq_${pq1}${pq2}${pq3}${pq4}`
            pq1Id = ""+pq1+pq2+pq3+"_"+pq4+pq5
            pd    = "mx-1"
            break;
        case 5:
            tdId  = `${AP.Nivel}pq_${pq1}${pq2}${pq3}${pq4}${pq5}`
            pq1Id = ""+pq1+pq2+pq3+pq4+"_"+pq5
            pd    = "ml-1"
            break;
    }

    //tdId = "td_"+pq1+"_"+(AP.Nivel-1)
    //console.error("ZZZZZZZZZZZZZ cuando AP.Nivel es: "+AP.Nivel+", trId "+trId+", tdId "+tdId+", AP.Pregunta "+AP.Pregunta+", AP.Respuesta "+AP.Respuesta)
    content = `
        <div class="grid-drop__body ${pd} ${gdId} my-3">
            ${btnAgregar}

            <div class="grid-drop__drap">
                <div class="grid-drop__contain-main">

                        ${btnAgregarHijo}
                    <div class="grid-drop__note" id="pq${pq1Id}">
                        <button class="grid-drop__tap" style="border-right-color:${AP.Code}"></button>
                        <div class="question d-column-l">
                            <label class="text-gray fontrem" for="">Escribir Pregunta ${btnEliminar}</label>
                            <textarea ${ver} name="pr${pq1Id}" id="pr${pq1Id}" onkeyup="fnSp4SavePregunta(${pq1},${pq2},${pq3},${pq4},${pq5},${AP.Nivel},${AP.Id},this)" rows="2" style="resize: none;" class="question-input" placeholder="..."></textarea>
                        </div>
                        <div class="question d-column-l bt-lightgray">
                            <label for="" class="text-gray fontrem">Escribir Respuesta </label>
                            <textarea ${ver} name="re${pq1Id}" id="re${pq1Id}" onkeyup="fnSp4SaveRespuesta(${pq1},${pq2},${pq3},${pq4},${pq5},${AP.Nivel},${AP.Id},this)" rows="4" style="resize: none;" class="question-input" placeholder="..."></textarea>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    `
    console.log("tdId",tdId)
    $("#"+tdId).html(``)
    $("#"+tdId).append(`
        ${content}
    `);
    $("#pr"+pq1Id).val(AP.Pregunta)
    $("#re"+pq1Id).val(AP.Respuesta)

}
//------------------------------------- end  fnSp4CrearPorqueB() -------------------------------------

//------------------------------------- start  fnSp4CrearPorqueHijoB() -------------------------------------
var fnSp4CrearPorqueHijoB = function(Nivel,HAColoresAnalisisId,pq1,pq2,pq3,pq4,pq5)
{

    // DEFINIR ID de tr, td y si va el boton
    let trId       = ""
    let tdId       = ""
    let pq1Id      = ''
    let pd         = 'mx-1'
    let content    = ""
    let Code       = ""
    let gdId       = ''
    // SABER CUANTOS HIJOS TIENE EL PORQUE SELECCIONADO
    let hijos = 0

    switch(Nivel)
    {
        case 1:
            hijos = objAC.AnalisisProblema[pq1].AnalisisProblema.length
            break;
        case 2:
            hijos = objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema.length
            break;
        case 3:
            hijos = objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema.length
            break;
        case 4:
            hijos = objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema.length
            break;
        case 5:
            hijos = objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema[pq5].AnalisisProblema.length
            break;//*/
    }

    if(hijos<5)
    {
        let btnAgregar = '<button class="grid-drop__btn" disabled readonly style="display:none !important;">...</button>'

        switch(Nivel)
        {
            case 1:
                hijos = objAC.AnalisisProblema[pq1].AnalisisProblema.length
                pq2   = hijos
                objAC.AnalisisProblema[pq1].AnalisisProblema[hijos]                       = new classAnalisisProblema()
                objAC.AnalisisProblema[pq1].AnalisisProblema[hijos].Id                    = 0
                objAC.AnalisisProblema[pq1].AnalisisProblema[hijos].HAAnalisisProblemasId = objAC.AnalisisProblema[pq1].Id
                objAC.AnalisisProblema[pq1].AnalisisProblema[hijos].HAAccionCorrectivaId  = objAC.Id
                objAC.AnalisisProblema[pq1].AnalisisProblema[hijos].Code                  = objColoresAnalisis.dataColoresAnalisis[pq1].Code
                objAC.AnalisisProblema[pq1].AnalisisProblema[hijos].HAColoresAnalisisId   = objColoresAnalisis.dataColoresAnalisis[pq1].Id
                objAC.AnalisisProblema[pq1].AnalisisProblema[hijos].Nivel                 = Nivel+1
                //tdId  = "td_"+pq1+"_0"
                pq1Id = ""+pq1+"_"+pq2+pq3+pq4+pq5
                tdId  = `${(Nivel+1)}pq_${pq1}${pq2}`
                gdId  = `gd${Nivel}${pq1}_${pq2}${pq3}${pq4}${pq5}`
                Code  = objColoresAnalisis.dataColoresAnalisis[pq1].Code
                pd    = "mx-1"
                //pq2++
                break;
            case 2:
                hijos = objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema.length
                pq3   = hijos
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[hijos]                       = new classAnalisisProblema()
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[hijos].Id                    = 0
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[hijos].HAAnalisisProblemasId = objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].Id
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[hijos].HAAccionCorrectivaId  = objAC.Id
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[hijos].Code                  = objColoresAnalisis.dataColoresAnalisis[pq1].Code
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[hijos].HAColoresAnalisisId   = objColoresAnalisis.dataColoresAnalisis[pq1].Id
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[hijos].Nivel                 = Nivel+1
                //tdId  = "td_"+pq1+"_1"
                pq1Id = ""+pq1+pq2+"_"+pq3+pq4+pq5
                tdId  = `${(Nivel+1)}pq_${pq1}${pq2}${pq3}`
                gdId  = `gd${Nivel}${pq1}${pq2}_${pq3}${pq4}${pq5}`
                Code  = objColoresAnalisis.dataColoresAnalisis[pq1].Code
                pd    = "mx-1"
                break;
            case 3:
                hijos = objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema.length
                pq4   = hijos
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[hijos]                       = new classAnalisisProblema()
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[hijos].Id                    = 0
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[hijos].HAAnalisisProblemasId = objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].Id
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[hijos].HAAccionCorrectivaId  = objAC.Id
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[hijos].Code                  = objColoresAnalisis.dataColoresAnalisis[pq1].Code
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[hijos].HAColoresAnalisisId   = objColoresAnalisis.dataColoresAnalisis[pq1].Id
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[hijos].Nivel                 = Nivel+1
                //tdId = "td_"+pq1+"_2"
                pq1Id = ""+pq1+pq2+pq3+"_"+pq4+pq5
                tdId  = `${(Nivel+1)}pq_${pq1}${pq2}${pq3}${pq4}`
                gdId  = `gd${Nivel}${pq1}${pq2}${pq3}_${pq4}${pq5}`
                Code  = objColoresAnalisis.dataColoresAnalisis[pq1].Code
                pd    = "mx-1"
                break;
            case 4:
                hijos = objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema.length
                pq5   = hijos
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema[hijos]                       = new classAnalisisProblema()
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema[hijos].Id                    = 0
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema[hijos].HAAnalisisProblemasId = objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].Id
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema[hijos].HAAccionCorrectivaId  = objAC.Id
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema[hijos].Code                  = objColoresAnalisis.dataColoresAnalisis[pq1].Code
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema[hijos].HAColoresAnalisisId   = objColoresAnalisis.dataColoresAnalisis[pq1].Id
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema[hijos].Nivel                 = Nivel+1
                //tdId = "td_"+pq1+"_3"
                pq1Id = ""+pq1+pq2+pq3+pq4+"_"+pq5
                tdId  = `${(Nivel+1)}pq_${pq1}${pq2}${pq3}${pq4}${pq5}`
                gdId  = `gd${Nivel}${pq1}${pq2}${pq3}${pq4}_${pq5}`
                Code  = objColoresAnalisis.dataColoresAnalisis[pq1].Code
                pd    = "ml-1"
                break;
            /*case 5:
                hijos = objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema[pq5].AnalisisProblema.length
                pq6   = hijos
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema[pq5].AnalisisProblema[hijos]                       = new classAnalisisProblema()
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema[pq5].AnalisisProblema[hijos].Id                    = 0
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema[pq5].AnalisisProblema[hijos].HAAnalisisProblemasId = objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].Id
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema[pq5].AnalisisProblema[hijos].HAAccionCorrectivaId  = objAC.Id
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema[pq5].AnalisisProblema[hijos].Code                  = objColoresAnalisis.dataColoresAnalisis[pq1].Code
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema[pq5].AnalisisProblema[hijos].HAColoresAnalisisId   = objColoresAnalisis.dataColoresAnalisis[pq1].Id
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema[pq5].AnalisisProblema[hijos].Nivel                 = Nivel+1
                //tdId = "td_"+pq1+"_4"
                pq1Id = ""+pq1+pq2+pq3+pq4+pq5
                Code  = objColoresAnalisis.dataColoresAnalisis[pq1].Code
                pd    = "ml-1"
                break;//*/
        }

        let btnAgregarHijo = (Nivel<4)
            ? `<button class="grid-drop__add" onmouseup="fnSp4CrearPorqueHijoB(${Nivel+1},0,${pq1},${pq2},${pq3},${pq4},${pq5})" style="background-image: url('images/triangulo-btn.svg');">+</button>`
            : ``//<button class="grid-drop__add" style="background-image: url('images/triangulo-btn.svg2');"></button>`

        //tdId = "td_"+pq1+"_"+(Nivel)
        //console.error("ZZZZZZZZZZZZZ cuando AP.Nivel es: "+AP.Nivel+", trId "+trId+", tdId "+tdId+", AP.Pregunta "+AP.Pregunta+", AP.Respuesta "+AP.Respuesta)
        content = `
            <div class="grid-drop__body ${pd} ${gdId} my-3">
                ${btnAgregar}
                <div class="grid-drop__drap">
                    <div class="grid-drop__contain-main">

                        ${btnAgregarHijo}
                        <div class="grid-drop__note" id="pq${pq1Id}">
                            <button class="grid-drop__tap" style="border-right-color:${Code}"></button>
                            <div class="question d-column-l">
                                <label class="text-gray fontrem" for="">Escribir Pregunta <a ${ver} onmouseup="fnSp4EliminarPorQue(${Nivel+1},${pq1},${pq2},${pq3},${pq4},${pq5})" class="fontrem" style="cursor: pointer; color:red; position: absolute; text-decoration: underline; right: 25px; top: 10px;">Eliminar</a></label>
                                <textarea name="pr${pq1Id}" id="pr${pq1Id}" onkeyup="fnSp4SavePregunta(${pq1},${pq2},${pq3},${pq4},${pq5},${Nivel+1},0,this)" rows="2" style="resize: none;" class="question-input" placeholder="..."></textarea>
                            </div>
                            <div class="question d-column-l bt-lightgray">
                                <label for="" class="text-gray fontrem">Escribir Respuesta</label>
                                <textarea name="re${pq1Id}" id="re${pq1Id}" onkeyup="fnSp4SaveRespuesta(${pq1},${pq2},${pq3},${pq4},${pq5},${Nivel+1},0,this)" rows="4" style="resize: none;" class="question-input" placeholder="..."></textarea>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        `
      //  console.error("crear en td #"+tdId)
      //  console.error("con pd "+pd)
      //  console.error("pq1Id "+pq1Id)
      //  console.error(`fnSp4CrearPorqueHijoB(${Nivel},0,${pq1},${pq2},${pq3},${pq4},${pq5})`)
      //  console.error("objAC ",objAC)
        $("#"+tdId).append(`
            ${content}
        `);//*/

        console.warn("Nivel,HAColoresAnalisisId,pq1,pq2,pq3,pq4,pq5",Nivel,HAColoresAnalisisId,pq1,pq2,pq3,pq4,pq5)

    }else{
        let msj = 'Ya Tienes el Máximo (05) de 1er PorQue Creados.'
        $("#subTituloErrorSp4HA").html('<b> No Puedes Crear Más 1er Porque. </b>')
        $("#mensajeErrorSp4HA").html(`${msj}`)
        $('#modalSp4MsgErrorHA').modal('show').addClass('fade')
    }
}
//------------------------------------- end  fnSp4CrearPorqueHijoB() -------------------------------------
////////////////////////////////////////////////////////// PRUEBAS END


//------------------------------------- start  fnSp4ConfirmarEliminarPorQue() -------------------------------------
//var NivelE = pq1E = pq2E = pq3E = pq4E = pq5E = 0
var fnSp4ConfirmarEliminarPorQue = function(Nivel,pq1,pq2,pq3,pq4,pq5)
{
    // NivelE = Nivel
    // pq1E = pq1
    // pq2E = pq2
    // pq3E = pq3
    // pq4E = pq4
    // pq5E = pq5

    // ocultamos modal ver acr
    $('#modalVerACR').modal('hide').removeClass('fade')
    // Mostramos modal informativa
    $('#modalSp4ConfirmarEliminar5PorQue').modal('show').addClass('fade')

}
//------------------------------------- end  fnSp4ConfirmarEliminarPorQue() -------------------------------------

//------------------------------------- start  fnSp4EliminarPorQue() -------------------------------------
var fnSp4EliminarPorQue = function(Nivel,pq1,pq2,pq3,pq4,pq5)
{
    console.warn("Nivel,pq1,pq2,pq3,pq4,pq5",Nivel,pq1,pq2,pq3,pq4,pq5)
    // si tiene hijos
    let hijos    = -1;
    // si es el ultimo hijo
    let ultimo   = 0;
    // bandera para saber si puede eliminar o no...
    let eliminar = 0
    // id del td a limpiar
    let tdId = ``
    console.log("objAC.AnalisisProblema",objAC.AnalisisProblema)
    console.log("objAC.AnalisisProblema[pq1].Id",objAC.AnalisisProblema[pq1].Id)
    console.log("objAC.AnalisisProblema[pq1].Deleted",objAC.AnalisisProblema[pq1].Deleted)
    switch(Nivel)
    {
            case 1:
                hijos    = objAC.AnalisisProblema[pq1].AnalisisProblema.length
                ultimo   = objAC.AnalisisProblema.length-1 //( (objAC.AnalisisProblema.length-1) === pq1 ) ? 1 : 0
                eliminar = ( ultimo == pq1 ) ? 1 : 0
                tdId     = `#${Nivel}pq_${pq1}`
                //if(hijos===0 && eliminar===1){
                if(hijos===0){
                    count1PorQue--
                    objAC.AnalisisProblema[pq1].Deleted=1

                    if(objAC.AnalisisProblema[pq1].Id==0){
                        objAC.AnalisisProblema.pop()
                    }
                }
                break;
            case 2:
                //calculamos la cantidad de hijos
                hijos    = objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema.length
                // vemos cual es el ultimo hijo
                ultimo   = objAC.AnalisisProblema[pq1].AnalisisProblema.length-1
                // lavidamos si es el ultimo hijo para permitir eliminar
                eliminar = ( ultimo == pq2 ) ? 1 : 0
                // construimos el id a del td a limpiar
                tdId     = `#${Nivel}pq_${pq1}${pq2}`
                // eliminar el ultimo hijo del array
                if(hijos===0){
                    objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].Deleted=1
                    if(objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].Id==0){
                        objAC.AnalisisProblema[pq1].AnalisisProblema.pop()
                    }
                }
                break;
            case 3:
                hijos    = objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema.length
                ultimo   = objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema.length-1
                eliminar = ( ultimo == pq3 ) ? 1 : 0
                tdId     = `#${Nivel}pq_${pq1}${pq2}${pq3}`
                if(hijos===0){
                    objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].Deleted=1
                    if(objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].Id==0){
                        objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema.pop()
                    }
                }
                break;
            case 4:
                hijos    = objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema.length
                ultimo   = objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema.length-1
                eliminar = ( ultimo == pq4 ) ? 1 : 0
                tdId     = `#${Nivel}pq_${pq1}${pq2}${pq3}${pq4}`
                if(hijos===0){
                    objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].Deleted=1
                    if(objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].Id==0){
                        objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema.pop()
                    }
                }
                break;
            case 5:
                hijos    = objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema[pq5].AnalisisProblema.length
                ultimo   = objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema.length-1
                eliminar = ( ultimo == pq5 ) ? 1 : 0
                tdId     = `#${Nivel}pq_${pq1}${pq2}${pq3}${pq4}${pq5}`
                if(hijos===0){
                    objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema[pq5].Deleted=1
                    if(objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema[pq5].Id==0){
                        objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema.pop()
                    }
                }
                break;
            default:
                console.warn("otro nivel...")
                break;
    }
    //if(hijos===0 && eliminar===1)
    if(hijos===0)
    {
        //$(tdId).html('')
        // preguntamos si quiere eliminar la tarjeta
        fnSp4ConfirmarEliminarPorQue(Nivel,pq1,pq2,pq3,pq4,pq5)

    }
    else
    {
        //console.warn("No Puede Eliminar o tiene hijos o no es el ultimo hijo ")
        let msj = ''
        if(hijos>0)
        {
            // ocultamos modal ver acr
            $('#modalVerACR').modal('hide').removeClass('fade')
            // Mostramos modal informativa
            $('#modalSp4NoPuedeEliminar5PorQue').modal('show').addClass('fade')
        }
        /*else{
            msj = "Tiene PorQue Inferiores."//alert("No es el ultimo hijo ",ultimo)

            $("#subTituloErrorSp4HA").html(`No Es Posible Eliminar!!!`)
            $("#mensajeErrorSp4HA").html(msj)
            $('#modalSp4MsgErrorHA').modal('show').addClass('fade')
        }*/
    }

}
//------------------------------------- end  fnSp4EliminarPorQue() -------------------------------------

//------------------------------------- start  fnSp4GuardarEliminarTarjeta()() -------------------------------------
var fnSp4GuardarEliminarTarjeta = function()
{
    // ocultar modal ver acr
    $('#modalVerACR').modal('hide').removeClass('fade')
    showLoading();
    objAC.Created_By = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa)
    console.warn("objAC......",objAC)
    var body    = objAC
    var url     = apiurlAuditoria+"/api/Post-Accion_Correctiva-All?code=QSe534M8BaW1nGRPt9bpR70b8tlRvr23agq21eNK7vSODc1gFnpZuQ==&httpmethod=post";
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
    })
    .done(function (data) {
        console.log("data:",data)
        Id = data.Id
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
        console.warn("fail se ha producido un error...")
    })
    .always(function( jqXHR, textStatus, errorThrown ) {
        console.warn("always ya termino...")
        if(Id>0)
        {
            console.warn("*** objAC",objAC)

            //console.warn("Tarjeta Eliminada",objeto)

            //objeto.pop()
            //console.warn("*** objAC",objAC)
            /*if(opc!=2)
            {
                if(objAC.Flag_Completado==0)
                {
                    // MOSTRAMOS MODAL ALERT SAVE ACR
                    $('#modalShowAlertConfirmarACRSp4').modal('show').addClass('fade')
                }
                else
                {
                    // MOSTRAMOS MODAL DE EXITO AL FINALIZAR ACR
                    $('#modalExitoFinalizarACRSp4').modal('show').addClass('fade')
                }
                //INICIALIZAMOS EL LISTADO
                initHallazgosAsignados()
            }//*/
            //INICIALIZAMOS EL LISTADO
            initHallazgosAsignados()


        }
        else
        {
            //alert("algun error....")
            $("#subTituloErrorSp4HA").html(`Ocurrio Un Error!!!`)
            $("#mensajeErrorSp4HA").html(`No Fue Posible Realizar La Modificación.`)
            $('#modalSp4MsgErrorHA').modal('show').addClass('fade')

        }
        hideLoading();
        $('#modalExitoEliminar5PorQue').modal('show').addClass('fade')
        // mostramos modal ver acr
        //$('#modalVerACR').modal('show').addClass('fade')
    })//*/
}
//------------------------------------- end  fnSp4GuardarEliminarTarjeta()() -------------------------------------


//------------------------------------- start  fnSp4ConsultarSaveACR() -------------------------------------
var fnSp4ConsultarSaveACR = function ()
{
    console.warn("objAC",objAC)
    // OCULTAMOS MODAL CREAR ACR
    $('#modalVerACR').modal('hide').removeClass('fade');
    // MOSTRAMOS MODAL ALERT SAVE ACR
    $('#modalAlertSaveACR').modal('show').addClass('fade')
}
//------------------------------------- end  fnSp4ConsultarSaveACR() -------------------------------------

//------------------------------------- start  fnSp4GuardarACR() -------------------------------------
var fnSp4GuardarACR = function (opc) // opc = 2 cuando elimino , opc = 1 cuando guardo o finalizo
{
    //alert("opc "+opc)
    showLoading();
    // OCULTAMOS MODAL ALERT SAVE ACR
    $('#modalAlertSaveACR').modal('hide').removeClass('fade');
    $('#modalConfirmarEnviarSp4ACR').modal('hide').removeClass('fade');

    let Id = 0;
    let finalizado = 0

    // ASIGNAMOS VALOR A CREATED_BY CON EL USER REGITRADO
    objAC.Created_By = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa)

    var body    = objAC
    var url     = apiurlAuditoria+"/api/Post-Accion_Correctiva-All?code=QSe534M8BaW1nGRPt9bpR70b8tlRvr23agq21eNK7vSODc1gFnpZuQ==&httpmethod=post";
    var headers ={
       "apikey":constantes.apiKey,
       "Content-Type": "application/json",
    }

    // ASIGNAMOS VALOR A FLAG_DEFINIDO
    objAC.Flag_Definido = ( objAC.IntegrantesAnalisis.length > 0 && objAC.HACeroPerdidasId > 0 && objAC.AreaId > 0 && objAC.Que != null && objAC.Que != "" && objAC.Donde != null && objAC.Donde != "" && objAC.Cuando != null && objAC.Cuando != "" && objAC.Como != null && objAC.Como != "" && objAC.Cual != null && objAC.Cual != ""  && objAC.Problema != null && objAC.Problema != "" ) ? 1 : 0

    // ASIGNAMOS VALOR A FLAG_COMPLETADO
    objAC.Flag_Completado = (objAC.EnvioACR.length > 0 ) ? 1 : 0
    finalizado = objAC.Flag_Completado
    console.warn("objAC a guardar",objAC)

    $.ajax({
        method: 'POST',
        url:  url,
        headers:headers,
        data: JSON.stringify(body),
        crossDomain: true,
        dataType: "json",
    })
    .done(function (data) {
        console.log("data:",data)
        Id = data.Id
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
        console.warn("fail se ha producido un error...")
    })
    .always(function( jqXHR, textStatus, errorThrown ) {
        console.warn("always ya termino...")
        if(Id>0)
        {
            if(opc!=2)
            {
                if(objAC.Flag_Completado==0)
                {
                    // MOSTRAMOS MODAL ALERT SAVE ACR
                    $('#modalShowAlertConfirmarACRSp4').modal('show').addClass('fade')
                }
                else
                {
                    // MOSTRAMOS MODAL DE EXITO AL FINALIZAR ACR
                    $('#modalExitoFinalizarACRSp4').modal('show').addClass('fade')
                }
                //INICIALIZAMOS EL LISTADO
                initHallazgosAsignados()
            }
        }
        else
        {
            //alert("algun error....")
            $("#subTituloErrorSp4HA").html(`Ocurrio Un Error!!!`)
            $("#mensajeErrorSp4HA").html(`No Fue Posible Realizar La Modificación.`)
            $('#modalSp4MsgErrorHA').modal('show').addClass('fade')

        }
        hideLoading();
    })//*/

}
//------------------------------------- end  fnSp4GuardarACR() -------------------------------------

//------------------------------------- start  fnSp4ContinuarACR() -------------------------------------
var fnSp4ContinuarACR = function()
{
    fnSp4VerModalCrearACR(hallazgoActivo)
}
//------------------------------------- end  fnSp4ContinuarACR() -------------------------------------


// Variables Globales
var objHallazgoAsignado    = new Array(); // objetos de hallazgos asignados
var objAC                  = new classAccionCorretiva(); // objetos de hallazgos asignados
var objAreas // objetos de las areas
var objColoresAnalisis     = new classColoresAnalisis();// OBJETOS DE LOS COLORES DE ANALISIS
var objPlazoAccion         = new classPlazoAccion() // OBJETO DEL PLAZO DE LA ACCION
var objTipoAccion          = new classTipoAccion() // OBJETO DEL TIPO DE LA ACCION
var objStatusAccion        = new classStatusAccion() // OBJETO DEL STATUS DE LA ACCION
var hallazgoActivo         = 0; // Id del hallazgo selecionado
var verProblemaHA          = false; // bandera para mostrar u ocultar definicion del problema pestaña 3
var count1PorQue           = 0; // contador de cuantos 1er postrque has creados
var count2PorQue           = 0; // contador de cuantos 2do porque has creados
var count3PorQue           = 0; // contador de cuantos 3er porque has creados
var count4PorQue           = 0; // contador de cuantos 4to porque has creados
var count5PorQue           = 0; // contador de cuantos 5to porque has creados
var itemPlanAccion         = 0; // contados de los planes de accion agregados
var causaHAGlobal          = ""; // causa en el listado de planes de acciones
var ItemListadoCausas2     = 0; // para identificar el texta area en el listado de planes de acciones

//------------------------------------- start  fnSp4CrearPorqueHijo() -------------------------------------
var fnSp4CrearPorqueHijo = function(Nivel,HAColoresAnalisisId,pq1,pq2,pq3,pq4,pq5)
{

    // DEFINIR ID de tr, td y si va el boton
    let trId       = ""
    let tdId       = ""
    let pq1Id      = ''
    let pd         = 'mx-1'
    let content    = ""
    let Code       = ""
    // SABER CUANTOS HIJOS TIENE EL PORQUE SELECCIONADO
    let hijos = 0

    switch(Nivel)
    {
        case 1:
            hijos = objAC.AnalisisProblema[pq1].AnalisisProblema.length
            break;
        case 2:
            hijos = objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema.length
            break;
        case 3:
            hijos = objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema.length
            break;
        case 4:
            hijos = objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema.length
            break;
        case 5:
            hijos = objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema[pq5].AnalisisProblema.length
            break;//*/
    }

    if(hijos<5)
    {
        let btnAgregar = '<button class="grid-drop__btn" disabled readonly>...</button>'

        switch(Nivel)
        {
            case 1:
                hijos = objAC.AnalisisProblema[pq1].AnalisisProblema.length
                pq2   = hijos
                objAC.AnalisisProblema[pq1].AnalisisProblema[hijos]                       = new classAnalisisProblema()
                objAC.AnalisisProblema[pq1].AnalisisProblema[hijos].Id                    = 0
                objAC.AnalisisProblema[pq1].AnalisisProblema[hijos].HAAnalisisProblemasId = objAC.AnalisisProblema[pq1].Id
                objAC.AnalisisProblema[pq1].AnalisisProblema[hijos].HAAccionCorrectivaId  = objAC.Id
                objAC.AnalisisProblema[pq1].AnalisisProblema[hijos].Code                  = objColoresAnalisis.dataColoresAnalisis[pq1].Code
                objAC.AnalisisProblema[pq1].AnalisisProblema[hijos].HAColoresAnalisisId   = objColoresAnalisis.dataColoresAnalisis[pq1].Id
                objAC.AnalisisProblema[pq1].AnalisisProblema[hijos].Nivel                 = Nivel+1
                //tdId  = "td_"+pq1+"_0"
                pq1Id = ""+pq1+"_"+pq2+pq3+pq4+pq5
                Code  = objColoresAnalisis.dataColoresAnalisis[pq1].Code
                pd    = "mr-1"
                //pq2++
                break;
            case 2:
                hijos = objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema.length
                pq3   = hijos
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[hijos]                       = new classAnalisisProblema()
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[hijos].Id                    = 0
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[hijos].HAAnalisisProblemasId = objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].Id
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[hijos].HAAccionCorrectivaId  = objAC.Id
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[hijos].Code                  = objColoresAnalisis.dataColoresAnalisis[pq1].Code
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[hijos].HAColoresAnalisisId   = objColoresAnalisis.dataColoresAnalisis[pq1].Id
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[hijos].Nivel                 = Nivel+1
                //tdId  = "td_"+pq1+"_1"
                pq1Id = ""+pq1+pq2+"_"+pq3+pq4+pq5
                Code  = objColoresAnalisis.dataColoresAnalisis[pq1].Code
                pd    = "mx-1"
                break;
            case 3:
                hijos = objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema.length
                pq4   = hijos
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[hijos]                       = new classAnalisisProblema()
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[hijos].Id                    = 0
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[hijos].HAAnalisisProblemasId = objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].Id
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[hijos].HAAccionCorrectivaId  = objAC.Id
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[hijos].Code                  = objColoresAnalisis.dataColoresAnalisis[pq1].Code
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[hijos].HAColoresAnalisisId   = objColoresAnalisis.dataColoresAnalisis[pq1].Id
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[hijos].Nivel                 = Nivel+1
                //tdId = "td_"+pq1+"_2"
                pq1Id = ""+pq1+pq2+pq3+"_"+pq4+pq5
                Code  = objColoresAnalisis.dataColoresAnalisis[pq1].Code
                pd    = "mx-1"
                break;
            case 4:
                hijos = objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema.length
                pq5   = hijos
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema[hijos]                       = new classAnalisisProblema()
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema[hijos].Id                    = 0
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema[hijos].HAAnalisisProblemasId = objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].Id
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema[hijos].HAAccionCorrectivaId  = objAC.Id
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema[hijos].Code                  = objColoresAnalisis.dataColoresAnalisis[pq1].Code
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema[hijos].HAColoresAnalisisId   = objColoresAnalisis.dataColoresAnalisis[pq1].Id
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema[hijos].Nivel                 = Nivel+1
                //tdId = "td_"+pq1+"_3"
                pq1Id = ""+pq1+pq2+pq3+pq4+"_"+pq5
                Code  = objColoresAnalisis.dataColoresAnalisis[pq1].Code
                pd    = "mx-1"
                break;
            case 5:
                hijos = objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema[pq5].AnalisisProblema.length
                pq6   = hijos
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema[pq5].AnalisisProblema[hijos]                       = new classAnalisisProblema()
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema[pq5].AnalisisProblema[hijos].Id                    = 0
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema[pq5].AnalisisProblema[hijos].HAAnalisisProblemasId = objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].Id
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema[pq5].AnalisisProblema[hijos].HAAccionCorrectivaId  = objAC.Id
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema[pq5].AnalisisProblema[hijos].Code                  = objColoresAnalisis.dataColoresAnalisis[pq1].Code
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema[pq5].AnalisisProblema[hijos].HAColoresAnalisisId   = objColoresAnalisis.dataColoresAnalisis[pq1].Id
                objAC.AnalisisProblema[pq1].AnalisisProblema[pq2].AnalisisProblema[pq3].AnalisisProblema[pq4].AnalisisProblema[pq5].AnalisisProblema[hijos].Nivel                 = Nivel+1
                //tdId = "td_"+pq1+"_4"
                pq1Id = ""+pq1+pq2+pq3+pq4+pq5
                Code  = objColoresAnalisis.dataColoresAnalisis[pq1].Code
                pd    = "ml-1"
                break;
        }

        let btnAgregarHijo = (Nivel<5)
            ? `<button class="grid-drop__add" onmouseup="fnSp4CrearPorqueHijo(${Nivel+1},0,${pq1},${pq2},${pq3},${pq4},${pq5})" style="background-image: url('images/triangulo-btn.svg');">+</button>`
            : `<button class="grid-drop__add" style="background-image: url('images/triangulo-btn.svg2');"></button>`

        tdId = "td_"+pq1+"_"+(Nivel)
        //console.error("ZZZZZZZZZZZZZ cuando AP.Nivel es: "+AP.Nivel+", trId "+trId+", tdId "+tdId+", AP.Pregunta "+AP.Pregunta+", AP.Respuesta "+AP.Respuesta)
        content = `
            <div class="grid-drop__body ${pd}">
                ${btnAgregar}

                <div class="grid-drop__drap">
                    <div class="grid-drop__contain-main">

                        ${btnAgregarHijo}
                        <div class="grid-drop__note" id="pq${pq1Id}">
                            <button class="grid-drop__tap" style="border-right-color:${Code}"></button>
                            <div class="question d-column-l">
                                <label class="text-gray" for="">Escribir Pregunta pr${pq1Id}</label>
                                <textarea name="pr${pq1Id}" id="pr${pq1Id}" onkeyup="fnSp4SavePregunta(${pq1},${pq2},${pq3},${pq4},${pq5},${Nivel+1},0,this)" rows="2" style="resize: none;" class="question-input" placeholder="..."></textarea>
                            </div>
                            <div class="question d-column-l bt-lightgray">
                                <label for="" class="text-gray">Escribir Respuesta re${pq1Id}</label>
                                <textarea name="re${pq1Id}" id="re${pq1Id}" onkeyup="fnSp4SaveRespuesta(${pq1},${pq2},${pq3},${pq4},${pq5},${Nivel+1},0,this)" rows="2" style="resize: none;" class="question-input" placeholder="..."></textarea>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        `
      //  console.error("crear en td #"+tdId)
      //  console.error("con pd "+pd)
      //  console.error("pq1Id "+pq1Id)
      //  console.error(`fnSp4CrearPorqueHijo(${Nivel},0,${pq1},${pq2},${pq3},${pq4},${pq5})`)
      //  console.error("objAC ",objAC)
        $("#"+tdId).append(`
            ${content}
        `);//*/


    }else alert("ya tienes 5 hijos no puedes agregar mas")
}
//------------------------------------- end  fnSp4CrearPorqueHijo() -------------------------------------
//
//------------------------------------- start  fnSp4CrearPorque() -------------------------------------
var fnSp4CrearPorque = function(AP,pq1,pq2,pq3,pq4,pq5,ver)
{


    // DEFINIR ID de tr, td y si va el boton
    let trId       = ""
    let tdId       = ""
    let pq1Id      = ''
    let pd         = 'mx-1'
    let content    = ""

    let btnAgregar = (AP.Nivel==1 && pq1==0 )
            ? `<button ${ver} class="grid-drop__btn" id="newPorQueHA" onmouseup="fnSp4AgregarPorque(${AP.Nivel},${pq1},${pq2},${pq3},${pq4},${pq5},${ver})">+ Agregar Nuevo</button>`
            : `<button ${ver} class="grid-drop__btn" disabled readonly>...</button>`

    let btnAgregarHijo = (AP.Nivel<5)
        ? `<button ${ver} class="grid-drop__add" onmouseup="fnSp4CrearPorqueHijo(${AP.Nivel},0,${pq1},${pq2},${pq3},${pq4},${pq5})" style="background-image: url('images/triangulo-btn.svg');">+</button>`
        : `<button ${ver} class="grid-drop__add" ></button>`

    switch(AP.Nivel)
    {
        case 1:
            //tdId  = "td_"+pq1+"_0"
            pq1Id = "_"+pq1+""+pq2+pq3+pq4+pq5
            pd    = "mr-1"
            break;
        case 2:
            //tdId  = "td_"+pq1+"_1"
            pq1Id = ""+pq1+"_"+pq2+pq3+pq4+pq5
            pd    = "mx-1"
            break;
        case 3:
            //tdId = "td_"+pq1+"_2"
            pq1Id = ""+pq1+pq2+"_"+pq3+pq4+pq5
            pd    = "mx-1"
            break;
        case 4:
            //tdId = "td_"+pq1+"_3"
            pq1Id = ""+pq1+pq2+pq3+"_"+pq4+pq5
            pd    = "mx-1"
            break;
        case 5:
            //tdId = "td_"+pq1+"_4"
            pq1Id = ""+pq1+pq2+pq3+pq4+"_"+pq5
            pd    = "ml-1"
            break;
    }

    tdId = "td_"+pq1+"_"+(AP.Nivel-1)
    //console.error("ZZZZZZZZZZZZZ cuando AP.Nivel es: "+AP.Nivel+", trId "+trId+", tdId "+tdId+", AP.Pregunta "+AP.Pregunta+", AP.Respuesta "+AP.Respuesta)
    content = `
        <div class="grid-drop__body ${pd}">
            ${btnAgregar}

            <div class="grid-drop__drap">
                <div class="grid-drop__contain-main">

                        ${btnAgregarHijo}
                    <div class="grid-drop__note" id="pq${pq1Id}">
                        <button class="grid-drop__tap" style="border-right-color:${AP.Code}"></button>
                        <div class="question d-column-l">
                            <label class="text-gray" for="">Escribir Pregunta pr${pq1Id}</label>
                            <textarea ${ver} name="pr${pq1Id}" id="pr${pq1Id}" onkeyup="fnSp4SavePregunta(${pq1},${pq2},${pq3},${pq4},${pq5},${AP.Nivel},${AP.Id},this)" rows="2" style="resize: none;" class="question-input" placeholder="..."></textarea>
                        </div>
                        <div class="question d-column-l bt-lightgray">
                            <label for="" class="text-gray">Escribir Respuesta re${pq1Id}</label>
                            <textarea ${ver} name="re${pq1Id}" id="re${pq1Id}" onkeyup="fnSp4SaveRespuesta(${pq1},${pq2},${pq3},${pq4},${pq5},${AP.Nivel},${AP.Id},this)" rows="2" style="resize: none;" class="question-input" placeholder="..."></textarea>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    `

    $("#"+tdId).append(`
        ${content}
    `);
    $("#pr"+pq1Id).val(AP.Pregunta)
    $("#re"+pq1Id).val(AP.Respuesta)

}
//------------------------------------- end  fnSp4CrearPorque() -------------------------------------

//--------- start  fnSp4SavePregunta(count1PorQue,count2PorQue,count3PorQue,count4PorQue,count5PorQue, Nivel, Id, Pregunta) --------------------
var fnSp4SavePregunta = function(ct1PQ,ct2PQ,ct3PQ,ct4PQ,ct5PQ, Nivel, Id, Pregunta)
{

    switch(Nivel)
    {
        case 1:
            //console.warn("nivel 1 objAC.AnalisisProblema[ct1PQ]",objAC.AnalisisProblema[ct1PQ])
            objAC.AnalisisProblema[ct1PQ].Pregunta = Pregunta.value
            break;
        case 2:
            //console.warn("nivel 2 objAC.AnalisisProblema[ct2PQ]",objAC.AnalisisProblema[ct1PQ].AnalisisProblema)
            objAC.AnalisisProblema[ct1PQ].AnalisisProblema[ct2PQ].Pregunta = Pregunta.value
            break;
        case 3:
            //console.warn("nivel 3 objAC.AnalisisProblema[ct3PQ]",objAC.AnalisisProblema[ct1PQ].AnalisisProblema[ct2PQ].AnalisisProblema)
            objAC.AnalisisProblema[ct1PQ].AnalisisProblema[ct2PQ].AnalisisProblema[ct3PQ].Pregunta = Pregunta.value
            break;
        case 4:
            //console.warn("nivel 4 objAC.AnalisisProblema[ct4PQ]",objAC.AnalisisProblema[ct1PQ].AnalisisProblema[ct2PQ].AnalisisProblema[ct3PQ].AnalisisProblema)
            objAC.AnalisisProblema[ct1PQ].AnalisisProblema[ct2PQ].AnalisisProblema[ct3PQ].AnalisisProblema[ct4PQ].Pregunta = Pregunta.value
            break;
        case 5:
            //console.warn("nivel 5 objAC.AnalisisProblema[ct5PQ]",objAC.AnalisisProblema[ct1PQ].AnalisisProblema[ct2PQ].AnalisisProblema[ct3PQ].AnalisisProblema[ct4PQ].AnalisisProblema)
            objAC.AnalisisProblema[ct1PQ].AnalisisProblema[ct2PQ].AnalisisProblema[ct3PQ].AnalisisProblema[ct4PQ].AnalisisProblema[ct5PQ].Pregunta = Pregunta.value
            break;

        default:
            console.error("otro nivel en fnSp4SavePregunta")
            break;
    }

}
//---------- end  fnSp4SavePregunta(count1PorQue,count2PorQue,count3PorQue,count4PorQue,count5PorQue, Nivel, Id, Pregunta) ------------------

//------------------------------------- start  fnSp4SaveRespuesta(${ct1PQ},${AP.Nivel},${AP.Id}) -------------------------------------
var fnSp4SaveRespuesta = function(ct1PQ,ct2PQ,ct3PQ,ct4PQ,ct5PQ, Nivel, Id, Respuesta)
{

    switch(Nivel)
    {
        case 1:
            //console.warn("nivel 1 objAC.AnalisisProblema[ct1PQ]",objAC.AnalisisProblema[ct1PQ])
            objAC.AnalisisProblema[ct1PQ].Respuesta = Respuesta.value
            break;
        case 2:
            //console.warn("nivel 2 objAC.AnalisisProblema[ct1PQ]",objAC.AnalisisProblema[ct1PQ].AnalisisProblema)
            objAC.AnalisisProblema[ct1PQ].AnalisisProblema[ct2PQ].Respuesta = Respuesta.value
            break;
        case 3:
            //console.warn("nivel 3 objAC.AnalisisProblema[ct3PQ]",objAC.AnalisisProblema[ct1PQ].AnalisisProblema[ct2PQ].AnalisisProblema)
            objAC.AnalisisProblema[ct1PQ].AnalisisProblema[ct2PQ].AnalisisProblema[ct3PQ].Respuesta = Respuesta.value
            break;
        case 4:
            //console.warn("nivel 4 objAC.AnalisisProblema[ct4PQ]",objAC.AnalisisProblema[ct1PQ].AnalisisProblema[ct2PQ].AnalisisProblema[ct3PQ].AnalisisProblema)
            objAC.AnalisisProblema[ct1PQ].AnalisisProblema[ct2PQ].AnalisisProblema[ct3PQ].AnalisisProblema[ct4PQ].Respuesta = Respuesta.value
            break;
        case 5:
            //console.warn("nivel 5 objAC.AnalisisProblema[ct5PQ]",objAC.AnalisisProblema[ct1PQ].AnalisisProblema[ct2PQ].AnalisisProblema[ct3PQ].AnalisisProblema[ct4PQ].AnalisisProblema)
            objAC.AnalisisProblema[ct1PQ].AnalisisProblema[ct2PQ].AnalisisProblema[ct3PQ].AnalisisProblema[ct4PQ].AnalisisProblema[ct5PQ].Respuesta = Respuesta.value
            break;

        default:
            console.error("otro nivel en fnSp4SaveRespuesta")
            break;
    }

}
//------------------------------------- end  fnSp4SaveRespuesta(${ct1PQ},${AP.Nivel},${AP.Id}) -------------------------------------

//------------------------------------- start  fnSp4AgregarPorque() -------------------------------------
var fnSp4AgregarPorque = function(Nivel,pq1,pq2,pq3,pq4,pq5,ver)
{
    if(count1PorQue<5)
    {
        let btnAgregar = (count1PorQue==0)
            ? `<button class="grid-drop__btn" ${ver} id="newPorQueHA" onmouseup="fnSp4AgregarPorque(${Nivel},${pq1},${pq2},${pq3},${pq4},${pq5},${ver})">+ Agregar Nuevo</button>`
            : `<button class="grid-drop__btn" ${ver} disabled readonly>...</button>`

        let btnAgregarHijo = (Nivel<5)
            ? `<button class="grid-drop__add" onmouseup="fnSp4CrearPorqueHijo(${Nivel},0,${count1PorQue},${pq2},${pq3},${pq4},${pq5})" style="background-image: url('images/triangulo-btn.svg');">+</button>`
            : `<button class="grid-drop__add" style="background-image: url('images/triangulo-btn.svg2');"></button>`

        let pq1Id = "_"+count1PorQue+"0000"
        let pd    = "mr-1"
        let Code  = objColoresAnalisis.dataColoresAnalisis[count1PorQue].Code
        // console.log("Code ",Code)

        // console.log("count1PorQue",count1PorQue)
        // console.log("pq1Id",pq1Id)
        //console.log("btnAgregar",btnAgregar)
        content = `
            <div class="grid-drop__body ${pd}">
                ${btnAgregar}

                <div class="grid-drop__drap">
                    <div class="grid-drop__contain-main">

                        ${btnAgregarHijo}
                        <div class="grid-drop__note" id="pq${pq1Id}">
                            <button class="grid-drop__tap" style="border-right-color:${Code}"></button>
                            <div class="question d-column-l">
                                <label class="text-gray" for="">Escribir Pregunta </label>
                                <textarea ${ver} name="pr${pq1Id}" id="pr${pq1Id}" onkeyup="fnSp4SavePregunta(${count1PorQue},0,0,0,0,1,0,this)" rows="2" style="resize: none;" class="question-input" placeholder="..."></textarea>
                            </div>
                            <div class="question d-column-l bt-lightgray">
                                <label for="" class="text-gray">Escribir Respuesta </label>
                                <textarea ${ver} name="re${pq1Id}" id="re${pq1Id}" onkeyup="fnSp4SaveRespuesta(${count1PorQue},0,0,0,0,1,0,this)" rows="2" style="resize: none;" class="question-input" placeholder="..."></textarea>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        `

        $("#td_"+count1PorQue+"_0").append(`
            ${content}
        `);
        $("#pr_"+count1PorQue+"_0000").val("Escriba Aqui la Pregunta")
        $("#re_"+count1PorQue+"_0000").val("Escriba Aqui La Respuesta")

        objAC.AnalisisProblema[count1PorQue]                      = new classAnalisisProblema()
        objAC.AnalisisProblema[count1PorQue].Id                   = 0
        objAC.AnalisisProblema[count1PorQue].HAAccionCorrectivaId = objAC.Id
        objAC.AnalisisProblema[count1PorQue].Code                 = objColoresAnalisis.dataColoresAnalisis[count1PorQue].Code
        objAC.AnalisisProblema[count1PorQue].HAColoresAnalisisId  = objColoresAnalisis.dataColoresAnalisis[count1PorQue].Id
        objAC.AnalisisProblema[count1PorQue].Nivel                = Nivel
        //objAC.AnalisisProblema[count1PorQue].cargarDataAnalisisProblema(objAC)

        //objAC.AnalisisProblema[count1PorQue].Pregunta = "Jesus Maria y Jose"
        //console.error("@@@@@@@@@@@ objAC",objAC)
        count1PorQue++
    }
    else
    {
        //fnSp4DeshabilitarBotonPorId("newPorQueHA","")
        //alert("no puedes crear mas 1er porque")
        let msj = 'Ya Tienes el Máximo (05) de 1er PorQue Creados.'
        $("#subTituloErrorSp4HA").html('<b> No Puedes Crear Más 1er Porque. </b>')
        $("#mensajeErrorSp4HA").html(`${msj}`)
        $('#modalSp4MsgErrorHA').modal('show').addClass('fade')
    }
}
//------------------------------------- end  fnSp4AgregarPorque() -------------------------------------


//------------------------------------- start  fnSp4SaveDefinicionProblema() -------------------------------------
var fnSp4SaveDefinicionProblema = function(opc)
{
    if(opc=="queHA"){ objAC.Que = toCapitalize($("#"+opc).val().trim()) }
    if(opc=="dondeHA"){ objAC.Donde = toCapitalize($("#"+opc).val().trim()) }
    if(opc=="cuandoHA"){ objAC.Cuando = toCapitalize($("#"+opc).val().trim()) }
    if(opc=="comoHA"){ objAC.Como = toCapitalize($("#"+opc).val().trim()) }
    if(opc=="cualHA"){ objAC.Cual = toCapitalize($("#"+opc).val().trim()) }
    if(opc=="problemaHA"){ objAC.Problema = toCapitalize($("#"+opc).val().trim()) }
}
//------------------------------------- end  fnSp4SaveDefinicionProblema() -------------------------------------

//------------------------------------- start  fnSp4DeshabilitarBotonPorId() -------------------------------------
function fnSp4DeshabilitarBotonPorId(Id,texto,backgroundColor)
{
    if(texto!="")$("#"+Id).html(texto)
    $("#"+Id).attr("disabled",true);

    if(backgroundColor!=undefined && backgroundColor!=''){
        $("#"+Id).css('background-color',backgroundColor)
    }
}
//------------------------------------- end  fnSp4DeshabilitarBotonPorId() -------------------------------------

//------------------------------------- start  fnSp4HabilitarBotonPorId() -------------------------------------
function fnSp4HabilitarBotonPorId(Id,texto,backgroundColor)
{
    if(texto!="")$("#"+Id).html(texto)
    $("#"+Id).attr("disabled",false);
    if(backgroundColor!="")$("#"+Id).css('background-color',backgroundColor)
}
//------------------------------------- end  fnSp4HabilitarBotonPorId() -------------------------------------

//------------------------------------- start  fnSp4DesHabOtraPerdida() -------------------------------------
var fnSp4DesHabOtraPerdida = function (HACeroPerdidasId)
{
    $("#otraPerdidaHA").val('').attr("disabled",true);
    objAC.HACeroPerdidasId        = HACeroPerdidasId
    objAC.CeroPerdidasDescription = ''
}
//------------------------------------- end  fnSp4DesHabOtraPerdida() -------------------------------------

//------------------------------------- start  fnSp4HabOtraPerdida() -------------------------------------
var fnSp4HabOtraPerdida = function (HACeroPerdidasId)
{
    $("#otraPerdidaHA").attr("disabled",false);
    objAC.HACeroPerdidasId = HACeroPerdidasId
}
//------------------------------------- end  fnSp4HabOtraPerdida() -------------------------------------

//------------------------------------- start  fnSp4ChangeAreaHA() -------------------------------------
var fnSp4ChangeAreaHA = function ()
{
    objAC.AreaId = $("#selectAreasHA").val()
}
//------------------------------------- end  fnSp4ChangeAreaHA() -------------------------------------

//------------------------------------- start  fnSp4SaveOtraPerdida() -------------------------------------
var fnSp4SaveOtraPerdida = function ()
{
    objAC.CeroPerdidasDescription = $("#otraPerdidaHA").val()
}
//------------------------------------- end  fnSp4SaveOtraPerdida() -------------------------------------

//------------------------------------- start  fnSp4VerOcultarDefinicion() -------------------------------------
var fnSp4VerOcultarDefinicion = function ()
{
    // body...
    if (verProblemaHA)
    {
        verProblemaHA = false
        $("#verOcultarDefinicionHA").html('Ver Definici&oacute;n del problema')
        $("#definicionProblemaHA").html('')
    }
    else
    {
        verProblemaHA = true
        $("#verOcultarDefinicionHA").html('Ocultar Definici&oacute;n del problema')
        $("#definicionProblemaHA").html('<div class="group-form group-form--gray group-form--select col-12 mt-4"><p>'+objAC.Problema+'</p></div>')
    }
}
//------------------------------------- end  fnSp4VerOcultarDefinicion() -------------------------------------


//------------------------------------- start  fnSp4GetPerson() -------------------------------------
var fnSp4GetPerson = function (obj,i,opc,Nivel=0,pq1=0,pq2=0,pq3=0,pq4=0,pq5=0,indice=0)
{
    //console.log("entro en fnSp4GetPerson",obj,i,opc,Nivel,pq1,pq2,pq3,pq4,pq5,indice)
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
                    //console.log("datos",data);

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
            if(opc==0)
            {
                $(".listadoIntegrantesAnalisis").append("<a href='#'><li>"+ui.item.firstname+"</li></a>")
                var json = {}
                json.Id                   = 0
                json.HAAccionCorrectivaId = objAC.Id
                json.Name                 = ui.item.firstname
                json.UserHash             = ui.item.id
                json.Email                = ui.item.correo
                json.Cargo                = ui.item.cargo
                json.Deleted              = 0

                objAC.IntegrantesAnalisis.push(json)
            }
            if(opc==1)
            {
                fnSp4UpdatedPlanAccionResponsable(ui.item.firstname,ui.item.id,ui.item.correo,ui.item.cargo,(indice),Nivel,pq1,pq2,pq3,pq4,pq5)
            }

            setTimeout(function(){
                // alert(ui.item.firstname)
                // alert(ui.item.cargo)//correo
                // alert(ui.item.correo)

                //$("#Name_"+i).val(ui.item.firstname);
                if(opc==0)
                {
                    $("#buscardorIntegrantes1").val('');
                    // TOTAL INTEGRANTES ANALISIS
                    let totalIntegrantesAnalisis = "00"

                    totalIntegrantesAnalisis = (objAC.IntegrantesAnalisis.length>9)
                        ? objAC.IntegrantesAnalisis.length
                        : "0"+objAC.IntegrantesAnalisis.length

                    $("#totalIntegrantesAnalisisHA").html(totalIntegrantesAnalisis)
                }
                if(opc==1)
                {
                    $(`#ResponsableHA_${i}`).val(ui.item.firstname)
                    $(`#UserHashHA_${i}`).val(ui.item.id)
                    //$(`#UserHashHA_${i}`).val(ui.item.correo)
                    //$(`#UserHashHA_${i}`).val(ui.item.cargo)
                    //console.warn("i",i)
                    //console.warn("objAC",objAC)
                 }
                if(opc==2)
                {
                    $(`#Name_${i}`).val(ui.item.firstname)
                    $(`#UserHash_${i}`).val(ui.item.id)
                    $(`#Correo_${i}`).val(ui.item.correo)
                    $(`#Cargo_${i}`).val(ui.item.cargo)
                }

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
//------------------------------------- end  fnSp4GetPerson() -------------------------------------

//------------------------------------- start  fnSp4PintarPlanAccion() -------------------------------------
var fnSp4PintarPlanAccion = function(ver)
{
    //console.warn("click en fnSp4PintarPlanAccion objAC ",objAC)
    $(`#listadoCausasHA`).html('')
    $("#selectCausasHA").html('')
    $("#tablaPlanAccionHA").html('')
    ItemListadoCausas  = 0
    ItemListadoCausas2 = 0
    itemPlanAccion     = 0
    objAC.fnSp4BuscarCausas(ver)
    //console.warn("objAC",objAC)
    //console.warn("ItemListadoCausas2",ItemListadoCausas2)
    if(ItemListadoCausas2>0) {
        //console.warn("Activar Boton Finalizar")
        fnSp4HabilitarBotonPorId("btnFinalizarACR","","#34559c")
    }
}
//------------------------------------- end  fnSp4PintarPlanAccion() -------------------------------------

var ItemListadoCausas = 0
//------------------------------------- start  fnSp4PintarCausas() -------------------------------------
var fnSp4PintarCausas = function(Causa,count1,count2,count3,count4,count5,ver)
{
    ItemListadoCausas++
    console.warn("Pintar causa:/*/* ",Causa,count1,count2,count3,count4,count5)
    $(`#listadoCausasHA`).append(`
        <div class="tablet-option__body row clear--row">
            <div class="col-5 col-sm-5 col-md-5 col-lg-5 left-part">
                <h5 class="number">${ItemListadoCausas}</h5>
                <textarea disabled readonly id="causaHA${ItemListadoCausas}" class="tablet-option__textarea col" rows="2" style="resize: none;"></textarea>
                <input type="hidden" id="pq1_${ItemListadoCausas}" value="${count1}">
                <input type="hidden" id="pq2_${ItemListadoCausas}" value="${count2}">
                <input type="hidden" id="pq3_${ItemListadoCausas}" value="${count3}">
                <input type="hidden" id="pq4_${ItemListadoCausas}" value="${count4}">
                <input type="hidden" id="pq5_${ItemListadoCausas}" value="${count5}">
            </div>
            <div class="col-7 col-sm-7 col-md-7 col-lg-7 tablet-option__contain">
                <div class="tablet-option__box">
                    <input type="checkbox" ${ver} id="medidas${ItemListadoCausas}_1" name="medidas${ItemListadoCausas}[]" onmouseup="fnSp4CheckedMedidas(${ItemListadoCausas}, ${count1}, ${count2}, ${count3}, ${count4}, ${count5}, ${Causa.Nivel}, this)" value="1">
                </div>
                <div class="tablet-option__box">
                    <input type="checkbox" ${ver} id="medidas${ItemListadoCausas}_2" name="medidas${ItemListadoCausas}[]" onmouseup="fnSp4CheckedMedidas(${ItemListadoCausas}, ${count1}, ${count2}, ${count3}, ${count4}, ${count5}, ${Causa.Nivel}, this)" value="2">
                </div>
                <div class="tablet-option__box">
                    <input type="checkbox" ${ver} id="medidas${ItemListadoCausas}_3" name="medidas${ItemListadoCausas}[]" onmouseup="fnSp4CheckedMedidas(${ItemListadoCausas}, ${count1}, ${count2}, ${count3}, ${count4}, ${count5}, ${Causa.Nivel}, this)" value="3">
                </div>
                <div class="tablet-option__box">
                    <input type="checkbox" ${ver} id="medidas${ItemListadoCausas}_4" name="medidas${ItemListadoCausas}[]" onmouseup="fnSp4CheckedMedidas(${ItemListadoCausas}, ${count1}, ${count2}, ${count3}, ${count4}, ${count5}, ${Causa.Nivel}, this)" value="4">
                </div>
                <div class="tablet-option__box">
                    <input type="checkbox" ${ver} id="medidas${ItemListadoCausas}_5" name="medidas${ItemListadoCausas}[]" onmouseup="fnSp4CheckedMedidas(${ItemListadoCausas}, ${count1}, ${count2}, ${count3}, ${count4}, ${count5}, ${Causa.Nivel}, this)" value="5">
                </div>
            </div>
        </div>
    `)

    $(`#causaHA${ItemListadoCausas}`).val(Causa.Respuesta)
    // seleccionamos las medidas cero fallas almacenadas
    Causa.AnalisisMedidasCeroFallas.forEach( function(item)
    {
        //console.warn("item",item,"#medidas"+ItemListadoCausas+"_"+item)
        //$(`#medidas${ItemListadoCausas}_${item}`).attr("checked", "checked");

        $(`#medidas${ItemListadoCausas}_${item}`).prop('checked',true);

    })
    //Agregar la causa al select selectCausasHA
    //$("#selectCausasHA").append(`<option Nivel=${Causa.Nivel} count1="${count1}" count2="${count2}" count3="${count3}" count4="${count4}" count5="${count5}" value='${ItemListadoCausas}'>${Causa.Respuesta}</option>`);
    $("#selectCausasHA").append(`<option Nivel=${Causa.Nivel} count1="${count1}" count2="${count2}" count3="${count3}" count4="${count4}" count5="${count5}" value='${ItemListadoCausas}' causa="${Causa.Respuesta}">Causa N&uacute;mero ${ItemListadoCausas}</option>`);

    //para identificar el textarea en fnSp4AgregarPlanAccion y colocar el valor
    //causaHAGlobal          = Causa.Respuesta


    //console.warn("Causa.PlanAccion.length",Causa.PlanAccion.length)
    Causa.PlanAccion.forEach( function(item)
    {
        //item.Fecha2 =  date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(item.Fecha2)
        //item.Fecha =  fnSp4FormatFecha(item.Fecha2)

        causaHAGlobal = item.Accion

        //// paso el ItemListadoCausas para pintarlas en el listado
        fnSp4AgregarPlanAccion(ItemListadoCausas,item.HAPlazoAccionId,item.HATipoAccionId,item.HAStatusAccionId,item.Fecha,item.Responsable,item.UserHash,Causa.Nivel,count1,count2,count3,count4,count5,item.indice,ver)

    })


}
//------------------------------------- end    fnSp4PintarCausas() -------------------------------------

//------------------------------------- end    fnSp4CheckedMedidas(${ItemListadoCausas},count1,count2,count3,count4,count5) -------------------------------------
var fnSp4CheckedMedidas = function(ItemListadoCausas,count1,count2,count3,count4,count5,Nivel,medida)
{
    //console.warn("fnSp4CheckedMedidas",ItemListadoCausas,count1,count2,count3,count4,count5,Nivel,parseInt(medida.value))

    let indice = 0
    let valor  = 0
    //console.error("ItemListadoCausas,count1,count2,count3,count4,count5,Nivel,medida",ItemListadoCausas,count1,count2,count3,count4,count5,Nivel,medida.value)
    switch(Nivel)
    {
        case 1:
            indice = $.inArray(parseInt(medida.value), objAC.AnalisisProblema[count1].AnalisisMedidasCeroFallas)
            valor  = parseInt(medida.value)
            if( indice >= 0){
                //console.warn("Eliminar")
                objAC.AnalisisProblema[count1].AnalisisMedidasCeroFallas.splice(indice, 1);
            }
            else{
                //console.warn("agregar")
                objAC.AnalisisProblema[count1].AnalisisMedidasCeroFallas.push(valor)
            }
            // console.warn(Nivel,"AnalisisMedidasCeroFallas",objAC.AnalisisProblema[count1].AnalisisMedidasCeroFallas)
            break;

        case 2:
            indice = $.inArray(parseInt(medida.value), objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisMedidasCeroFallas)
            valor  = parseInt(medida.value)
            if (indice >= 0)
                objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisMedidasCeroFallas.splice(indice, 1)
            else
                objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisMedidasCeroFallas.push(valor)

            // console.warn(Nivel,"AnalisisMedidasCeroFallas",objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisMedidasCeroFallas)
            break;

        case 3:
            indice = $.inArray(parseInt(medida.value), objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisMedidasCeroFallas)
            valor  = parseInt(medida.value)
            if (indice >= 0)
                objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisMedidasCeroFallas.splice(indice, 1)
            else
                objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisMedidasCeroFallas.push(valor)

            // console.warn(Nivel,"AnalisisMedidasCeroFallas",objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisMedidasCeroFallas)
            break;
        case 4:
            indice = $.inArray(parseInt(medida.value), objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].AnalisisMedidasCeroFallas)
            valor  = parseInt(medida.value)
            if (indice >= 0)
                objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].AnalisisMedidasCeroFallas.splice(indice, 1)
            else
                objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].AnalisisMedidasCeroFallas.push(valor)

            // console.warn(Nivel,"AnalisisMedidasCeroFallas",objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].AnalisisMedidasCeroFallas)
            break;
        case 5:
            indice = $.inArray(parseInt(medida.value), objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].AnalisisProblema[count5].AnalisisMedidasCeroFallas)
            valor  = parseInt(medida.value)
            if (indice >= 0)
                objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].AnalisisProblema[count5].AnalisisMedidasCeroFallas.splice(indice, 1)
            else
                objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].AnalisisProblema[count5].AnalisisMedidasCeroFallas.push(valor)

            // console.warn(Nivel,"AnalisisMedidasCeroFallas",objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].AnalisisProblema[count5].AnalisisMedidasCeroFallas)
            break;

        default:
            console.error("otro nivel distinto en fnSp4CheckedMedidas ")
    }
    //console.warn("objAC",objAC)

}
//------------------------------------- end    fnSp4CheckedMedidas(${ItemListadoCausas},count1,count2,count3,count4,count5) -------------------------------------

//------------------------------------- start  fnSp4AgregarPlanAccion()() -------------------------------------
// si opc=0 es nuevo
var fnSp4AgregarPlanAccion = function(opc, HAPlazoAccionId=0,HATipoAccionId=0,HAStatusAccionId=0,Fecha="",Responsable="",UserHash="",Nivel=0,count1=0,count2=0,count3=0,count4=0,count5=0,indice=0,ver='')
{
    //let Indice = 0
    ItemListadoCausas2++
    //console.warn("objAC -> ",objAC)
    //$('option:selected', select).attr('description');
    if(opc==0){

        Nivel         = parseInt($(`#selectCausasHA>option:selected`).attr("Nivel"))
        count1        = parseInt($(`#selectCausasHA>option:selected`).attr("count1"))
        count2        = parseInt($(`#selectCausasHA>option:selected`).attr("count2"))
        count3        = parseInt($(`#selectCausasHA>option:selected`).attr("count3"))
        count4        = parseInt($(`#selectCausasHA>option:selected`).attr("count4"))
        count3        = parseInt($(`#selectCausasHA>option:selected`).attr("count3"))
        causaHAGlobal = ""//$(`#selectCausasHA>option:selected`).attr("causa")
        //console.warn("Activar Boton Finalizar")
        fnSp4HabilitarBotonPorId("btnFinalizarACR","","#34559c")
    }

    //alert("nivel -> "+Nivel);
    if(opc==0){
        indice = newPlanAccion(Nivel,count1,count2,count3,count4,count5,ItemListadoCausas2)
        //console.log("objAC ",objAC)
    }

    //console.warn("objAC -> ",objAC,"___indice___",indice)

    let itemCausa = ( opc == 0 ) ? $("#selectCausasHA").val() : opc
    let item      = (++itemPlanAccion<10) ? "0"+itemPlanAccion : itemPlanAccion

    //console.warn("click en fnSp4AgregarPlanAccion() selectCausasHA ", itemCausa)

    $("#tablaPlanAccionHA").append(`
        <div class="tablet-option__body row clear--row">
            <div class="col-4 col-sm-4 col-md-4 col-lg-4 left-part">
                <h5 class="number-2">${item}</h5>
                <h5 class="number-2">${itemCausa}</h5>
                <textarea id="causa2HA_${ItemListadoCausas2}" name="causa2HA_${ItemListadoCausas2}" onkeyup="fnSp4UpdatedAccionSp4(this,${itemPlanAccion},${Nivel},${count1},${count2},${count3},${count4},${count5},${indice})" class="tablet-option__textarea col" ${ver} rows="6" style="resize: none;"></textarea>
            </div>
            <div class="col-12 col-sm-12 col-md-8 col-lg-8 tablet-option__contain">
                <div class="tablet-option__box">
                    <div class="group-form group-form--gray group-form--select w-100">
                        <label for="selectPlazoAccionHA_${itemPlanAccion}">Seleccionar</label>
                        <select ${ver} name="selectPlazoAccionHA_${itemPlanAccion}" id="selectPlazoAccionHA_${itemPlanAccion}" onChange="fnSp4UpdatedPlazoAccion(this,${Nivel},${count1},${count2},${count3},${count4},${count5},${indice})" class="form-control form-control2">
                            <!--option value="0"></option-->
                        </select>
                    </div>
                </div>
                <div class="tablet-option__box">
                    <div class="group-form group-form--gray group-form--select w-100">
                        <label for="selectTipoAccionHA_${itemPlanAccion}">Seleccionar</label>
                        <select ${ver} name="selectTipoAccionHA_${itemPlanAccion}" id="selectTipoAccionHA_${itemPlanAccion}" onChange="fnSp4UpdatedTipoAccion(this,${Nivel},${count1},${count2},${count3},${count4},${count5},${indice})" class="form-control form-control2">
                            <!--option value="0"></option-->
                        </select>
                    </div>
                </div>
                <div class="tablet-option__box">
                    <div class="group-form group-form--gray group-form--select w-100">
                        <label for="ResponsableHA_${itemPlanAccion}">
                            Buscar
                            <div class="spinner-border spinner-border-sm" role="status" id="spinnerLoadColaborador_${itemPlanAccion}" style="display:none;">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </label>
                        <input ${ver} id="ResponsableHA_${itemPlanAccion}" name="ResponsableHA_${itemPlanAccion}" value="${Responsable}" type="text" class="input-white form-control form-control2">
                        <input type="hidden" id="UserHashHA_${itemPlanAccion}" value="${UserHash}">
                    </div>
                </div>
                <div class="tablet-option__box">
                    <div class="group-form group-form--gray group-form--select w-100">
                        <label for="">Seleccionar</label>
                        <div class="input-group">
                            <input ${ver}  type="text" id="fechaPlanHA_${itemPlanAccion}" name="fechaPlanHA_${itemPlanAccion}" class="form-control form-control2 bg-white" readonly onChange="fnSp4UpdatedFechaAccion(${itemPlanAccion},${Nivel},${count1},${count2},${count3},${count4},${count5},${indice})">
                            <span class="input-group-addon" id="sizing-addon2"><img src="./images/iconos/calendario-3.svg" style="cursor: pointer;" onclick="$('#fechaPlanHA_${itemPlanAccion}').val('');"></span>
                            <!--div>
                                <img src="images/iconos/calendario-3.svg"  style="cursor: pointer;" onclick="$('#fechaPlanHA_${itemPlanAccion}').val('');">
                            </div-->
                        </div>
                    </div>
                </div>
                <div class="tablet-option__box">
                    <div class="group-form group-form--gray  w-100"> <!-- group-form--select -->
                        <label for="selectStatusAccionHA_${itemPlanAccion}">Seleccionar</label>
                        <select ${ver} name="selectStatusAccionHA_${itemPlanAccion}" id="selectStatusAccionHA_${itemPlanAccion}" disabled onChange="fnSp4UpdatedStatusAccion(this,${Nivel},${count1},${count2},${count3},${count4},${count5},${indice})" class="form-control form-control2">
                            <!--option value="0"></option-->
                        </select>
                    </div>
                </div>
            </div>

        </div>
    `)

    //vw_principal.init(); var fnSp4GetPerson = function (obj,i,opc=0,Nivel=0,pq1=0,pq2=0,pq3=0,pq4=0,pq5=0)

    fnSp4GetPerson($(`#ResponsableHA_${itemPlanAccion}`),itemPlanAccion,1,Nivel,count1,count2,count3,count4,count5,indice);

    // causaHAGlobal
    // ItemListadoCausasGobal
    // id="Causa2HA_${ItemListadoCausasGobal}"

    $(`#causa2HA_${ItemListadoCausas2}`).val(causaHAGlobal)

    $(`#fechaPlanHA_${itemPlanAccion}`).datetimepicker({
        timepicker:false,
        format:'d/m/Y'});

    //Fecha = date1_DD_MM_AAAA_to_AAAA_MM_DD_T_HH_MM_S(Fecha)
    if(opc!=0){
        $(`#fechaPlanHA_${itemPlanAccion}`).val(Fecha)
    }

    // CARCAR EL SELECT PLAZO ACCION selectPlazoAccionHA_${itemPlanAccion}
    objPlazoAccion.dataPlazoAccion.forEach( function(item)
    {
        //console.warn("item",item)
        (HAPlazoAccionId==item.Id)
            ? $(`#selectPlazoAccionHA_${itemPlanAccion}`).append(`<option value='${item.Id}' selected>${item.Description}</option>`)
            : $(`#selectPlazoAccionHA_${itemPlanAccion}`).append(`<option value='${item.Id}'>${item.Description}</option>`)
    })

    // CARCAR EL SELECT PLAZO ACCION selectPlazoAccionHA_${itemPlanAccion}
    objTipoAccion.dataTipoAccion.forEach( function(item)
    {
        //console.warn("item",item)
        (HATipoAccionId==item.Id)
            ? $(`#selectTipoAccionHA_${itemPlanAccion}`).append(`<option value='${item.Id}' selected>${item.Description}</option>`)
            : $(`#selectTipoAccionHA_${itemPlanAccion}`).append(`<option value='${item.Id}'>${item.Description}</option>`)
    })

    // CARCAR EL SELECT PLAZO ACCION selectPlazoAccionHA_${itemPlanAccion}
    objStatusAccion.dataStatusAccion.forEach( function(item)
    {
        //console.warn("item",item)
        (HAStatusAccionId==item.Id)
            ? $(`#selectStatusAccionHA_${itemPlanAccion}`).append(`<option value='${item.Id}' selected>${item.Description}</option>`)
            : $(`#selectStatusAccionHA_${itemPlanAccion}`).append(`<option value='${item.Id}'>${item.Description}</option>`)
    })

}
//------------------------------------- end  fnSp4AgregarPlanAccion()() -------------------------------------

//------------------------------------- start  fnSp4UpdatedAccionSp4()() -------------------------------------
var fnSp4UpdatedAccionSp4 = function(Accion,itemPlanAccion,Nivel,count1,count2,count3,count4,count5,indice)
{
    console.warn("Accion,itemPlanAccion,Nivel,count1,count2,count3,count4,count5,indice",Accion.value,itemPlanAccion,Nivel,count1,count2,count3,count4,count5,indice)

    switch(Nivel)
    {
        case 1:
            objAC.AnalisisProblema[count1].PlanAccion[indice].Accion = Accion.value
            break;
        case 2:
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].PlanAccion[indice].Accion = Accion.value
            break;
        case 3:
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].PlanAccion[indice].Accion = Accion.value
            break;
        case 4:
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].PlanAccion[indice].Accion = Accion.value
            break;
        case 5:
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].AnalisisProblema[count5].PlanAccion[indice].Accion = Accion.value
            break;

        default:
            console.warn("Otro Nivel fnSp4UpdatedAccionSp4")
            break;

    }

}
//------------------------------------- start  fnSp4UpdatedAccionSp4()() -------------------------------------
//------------------------------------- start  fnSp4UpdatedPlazoAccion()() -------------------------------------
var fnSp4UpdatedPlazoAccion = function(select,Nivel,count1,count2,count3,count4,count5,indice)
{
    let PlazoAccionId = parseInt(select.value)
    // console.warn("en fnSp4UpdatedPlazoAccion -> ",PlazoAccionId,Nivel,count1,count2,count3,count4,count5,indice)
    switch(Nivel)
    {
        case 1:
            objAC.AnalisisProblema[count1].PlanAccion[indice].HAPlazoAccionId = PlazoAccionId
            // console.warn("objAC.AnalisisProblema[count1].PlanAccion[indice] -> ",objAC.AnalisisProblema[count1].PlanAccion[indice])
            break;
        case 2:
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].PlanAccion[indice].HAPlazoAccionId = PlazoAccionId
            // console.warn("objAC.AnalisisProblema[count1].AnalisisProblema[count2].PlanAccion[indice] -> ",objAC.AnalisisProblema[count1].AnalisisProblema[count2].PlanAccion[indice])
            break;
        case 3:
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].PlanAccion[indice].HAPlazoAccionId = PlazoAccionId
            // console.warn("objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].PlanAccion[indice] -> ",objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].PlanAccion[indice])
            break;
        case 4:
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].PlanAccion[indice].HAPlazoAccionId = PlazoAccionId
            // console.warn("objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].PlanAccion[indice] -> ",objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].PlanAccion[indice])
            break;
        case 5:
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].AnalisisProblema[count5].PlanAccion[indice].HAPlazoAccionId = PlazoAccionId
            // console.warn("objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].AnalisisProblema[count5].PlanAccion[indice] -> ",objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].AnalisisProblema[count5].PlanAccion[indice])
            break;

        default:
            console.warn("error otro nivel")
            break;
    }
}
//------------------------------------- end  fnSp4UpdatedPlazoAccion()() -------------------------------------

//------------------------------------- start  fnSp4UpdatedTipoAccion()() -------------------------------------
var fnSp4UpdatedTipoAccion = function(select,Nivel,count1,count2,count3,count4,count5,indice)
{
    let TipoAccionId = parseInt(select.value)
    // console.warn("en fnSp4UpdatedTipoAccion -> ",TipoAccionId,Nivel,count1,count2,count3,count4,count5,indice)
    switch(Nivel)
    {
        case 1:
            objAC.AnalisisProblema[count1].PlanAccion[indice].HATipoAccionId = TipoAccionId
        // console.warn("objAC.AnalisisProblema[count1].PlanAccion[indice] -> ",objAC.AnalisisProblema[count1].PlanAccion[indice])
            break;
        case 2:
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].PlanAccion[indice].HATipoAccionId = TipoAccionId
        // console.warn("objAC.AnalisisProblema[count1].AnalisisProblema[count2].PlanAccion[indice] -> ",objAC.AnalisisProblema[count1].AnalisisProblema[count2].PlanAccion[indice])
            break;
        case 3:
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].PlanAccion[indice].HATipoAccionId = TipoAccionId
        // console.warn("objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].PlanAccion[indice] -> ",objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].PlanAccion[indice])
            break;
        case 4:
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].PlanAccion[indice].HATipoAccionId = TipoAccionId
        // console.warn("objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].PlanAccion[indice] -> ",objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].PlanAccion[indice])
            break;
        case 5:
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].AnalisisProblema[count5].PlanAccion[indice].HATipoAccionId = TipoAccionId
        // console.warn("objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].AnalisisProblema[count5].PlanAccion[indice] -> ",objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].AnalisisProblema[count5].PlanAccion[indice])
            break;

        default:
            console.warn("error otro nivel")
            break;
    }
}
//------------------------------------- end  fnSp4UpdatedTipoAccion()() -------------------------------------

//------------------------------------- start  fnSp4UpdatedStatusAccion()() -------------------------------------
var fnSp4UpdatedStatusAccion = function(select,Nivel,count1,count2,count3,count4,count5,indice)
{
    let StatusAccionId = parseInt(select.value)
    // console.warn("en fnSp4UpdatedStatusAccion -> ",StatusAccionId,Nivel,count1,count2,count3,count4,count5,indice)
    switch(Nivel)
    {
        case 1:
            objAC.AnalisisProblema[count1].PlanAccion[indice].HAStatusAccionId = StatusAccionId
        // console.warn("objAC.AnalisisProblema[count1].PlanAccion[indice] -> ",objAC.AnalisisProblema[count1].PlanAccion[indice])
            break;
        case 2:
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].PlanAccion[indice].HAStatusAccionId = StatusAccionId
            // console.warn("objAC.AnalisisProblema[count1].AnalisisProblema[count2].PlanAccion[indice] -> ",objAC.AnalisisProblema[count1].AnalisisProblema[count2].PlanAccion[indice])
            break;
        case 3:
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].PlanAccion[indice].HAStatusAccionId = StatusAccionId
            // console.warn("objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].PlanAccion[indice] -> ",objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].PlanAccion[indice])
            break;
        case 4:
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].PlanAccion[indice].HAStatusAccionId = StatusAccionId
            // console.warn("objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].PlanAccion[indice] -> ",objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].PlanAccion[indice])
            break;
        case 5:
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].AnalisisProblema[count5].PlanAccion[indice].HAStatusAccionId = StatusAccionId
            // console.warn("objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].AnalisisProblema[count5].PlanAccion[indice] -> ",objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].AnalisisProblema[count5].PlanAccion[indice])
            break;

        default:
            console.warn("error otro nivel")
            break;
    }
}
//------------------------------------- end  fnSp4UpdatedStatusAccion()() -------------------------------------

//------------------------------------- start  fnSp4UpdatedFechaAccion()() -------------------------------------
var fnSp4UpdatedFechaAccion = function(itemPlanAccion,Nivel,count1,count2,count3,count4,count5,indice)
{
    let dateDB = $(`#fechaPlanHA_${itemPlanAccion}`).val()
    let Fecha = fnSp4FormatFechaBD(dateDB)

    // console.warn("en fnSp4UpdatedFechaAccion *** -> ",Fecha,Nivel,count1,count2,count3,count4,count5,indice)
    switch(Nivel)
    {
        case 1:
            objAC.AnalisisProblema[count1].PlanAccion[indice].Fecha2 = Fecha
            // console.warn("objAC.AnalisisProblema[count1].PlanAccion[indice] -> ",objAC.AnalisisProblema[count1].PlanAccion[indice])
            break;
        case 2:
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].PlanAccion[indice].Fecha2 = Fecha
            // console.warn("objAC.AnalisisProblema[count1].AnalisisProblema[count2].PlanAccion[indice] -> ",objAC.AnalisisProblema[count1].AnalisisProblema[count2].PlanAccion[indice])
            break;
        case 3:
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].PlanAccion[indice].Fecha2 = Fecha
            // console.warn("objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].PlanAccion[indice] -> ",objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].PlanAccion[indice])
            break;
        case 4:
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].PlanAccion[indice].Fecha2 = Fecha
            // console.warn("objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].PlanAccion[indice] -> ",objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].PlanAccion[indice])
            break;
        case 5:
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].AnalisisProblema[count5].PlanAccion[indice].Fecha2 = Fecha
            // console.warn("objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].AnalisisProblema[count5].PlanAccion[indice] -> ",objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].AnalisisProblema[count5].PlanAccion[indice])
            break;

        default:
            console.error("error otro nivel en fnSp4UpdatedFechaAccion ")
            break;
    }
}
//------------------------------------- end  fnSp4UpdatedFechaAccion()() -------------------------------------

//------------------------------------- start  fnSp4FinalizarACR()() -------------------------------------
var fnSp4FinalizarACR = function ()
{
    let checked  = true;
    let checked2 = true;
    //para el resgistro de personas a enviar el ACR
    $('#CountHA').val(0)
    // validamos que el listado de causas tenga al menos una medida para cero fallas seleccionada
    // Recorremos las causas
    for (var i = 1;  i <= ItemListadoCausas ; i++)
    {
        // constador para saber la cantidad de medidas seleccionadas por cada causa
        let count = 0
        // Recorremos las 5 medidas
        for (var j = 1;  j <= 5 ; j++)
        {
            // si existe alguna seleccionada aumentamos el contador
            if ($(`#medidas${i}_${j}`).prop('checked')) count++
        }
        // Si no hay medidas seleccionadas hacemos checked false
        if(count==0) checked = false
    }

    // Recorremos el listado de los planes creados
    for (var i = 1;  i <= ItemListadoCausas2 ; i++)
    {
        // Verificamos que el plan tenga responsable y fecha, de no tener ambos hacemos
        // checked2 false para el mensaje de alert
        if( $(`#UserHashHA_${i}`).val().length<25 || ($(`#fechaPlanHA_${i}`).val() == 0 ) )
        {
            console.warn('fecha ->', $(`#fechaPlanHA_${i}`).val())
            console.warn('hash ->', $(`#UserHashHA_${i}`).val())
            checked2 = false
        }
    }

    // verificamos si ambos checked son verdaderos levantamos la modal de buscar personas a enviar ACR para evaluar
    if(checked2 && checked)
    {
        // ocultamos modal
        $('#modalVerACR').modal('hide').removeClass('fade');
        // Colocamos titulo de la modal con el codigo del hallazgo
        $("#tituloModalEnviarSp4ACR").html(`ACR - ${objHallazgoAsignado[objAC.HallazgoId].dataHallazgo.Code_Hallazgo}`)
        //limpiamos contador de personas
        $("#rowCountHA").html('00')
        //limpiamos listado de personas
        $("#listadoPersonasEnviarACRSp4").html('')
        // actualizamos el token
        vw_principal.init();
        // vemos si tiene Envios previos
        console.log("objAC.EnvioACR", objAC.EnvioACR)
        console.log("objAC.EnvioACR.length", objAC.EnvioACR.length)
        if(objAC.EnvioACR.length>0)
        {
            let i = 1;
            objAC.EnvioACR.forEach( function(item)
            {
                console.warn("item",item)
                fnSp4AgregarRowListaEnvioACR()
                $(`#Name_${i}`).val(item.Name)
                $(`#UserHash_${i}`).val(item.UserHash)
                $(`#Correo_${i}`).val(item.Correo)
                $(`#Cargo_${i}`).val(item.Cargo)
                i++
            })
        }

        // mostramos modal
        $('#modalEnviarSp4ACR').modal('show').addClass('fade')
    }
    else
    {
        let msj = ""
        if(!checked && checked2)
        {
            msj = toCapitalize("Hay causas que no tienen medidas para cero fallas seleccionadas")
        }
        else if(checked && !checked2)
        {
            msj = toCapitalize("Hay planes de acción que no tienen responsable o fecha")
        }
        else
        {
            msj = toCapitalize("Hay causas que no tienen medidas para cero fallas seleccionadas y <br> Hay planes de acción que no tienen responsable o fecha")
        }

        //$('#modalAlertSaveACR').modal('hide').removeClass('fade');$('#modalShowAlertConfirmarACRSp4').modal('show').addClass('fade')
        $("#subTituloErrorSp4HA").html('<b> No Puedes Finalizar </b>')
        $("#mensajeErrorSp4HA").html(`${msj}`)
        $('#modalSp4MsgErrorHA').modal('show').addClass('fade')
    }
}

//------------------------------------- end  fnSp4FinalizarACR()() -------------------------------------

//------------------------------------- start  fnSp4AgregarRowListaEnvioACR() -------------------------------------
// FUNCION PARA AGREGAR NUEVAS LISTAS EN ENVIAR
//var rowCountHA = 0
var fnSp4AgregarRowListaEnvioACR = function()
{
    // incrementar contador principal
    let rowCountHA = $('#CountHA').val()
    rowCountHA++
    $('#CountHA').val(rowCountHA)

    //listadoPersonasEnviarACRSp4
    //rowCountHA = $('#listadoPersonasEnviarACRSp4 .item-tabla').length;
    //rowCountHA++
    //console.log("rowCountHA",rowCountHA)
    $("#listadoPersonasEnviarACRSp4").append(`
        <div class='item-tabla p-2 px-2' style='font-size: 13px; background-color:white !important;border: solid 1px #cbcbcb !important;'>
            <div class='row m-0 justify-content-between align-items-center tbody_trainning'>

                <div class='col-3 text-left form-group'>
                    <input type='text' value='' id='Name_${rowCountHA}' name='Name_${rowCountHA}' class='form-control form-control2 bg-white fechasA autocompletecollaborator'>
                    <div class='loader' id='add_firtnameload_1${rowCountHA}' style='display:none'></div>
                    <input type='hidden' id='UserHash_${rowCountHA}' name='UserHash_${rowCountHA}'>
                </div>
                <div class='col-3 text-left form-group'>
                    <input type='text' id='Cargo_${rowCountHA}' name='Cargo_${rowCountHA}' aria-describedby='sizing-addon2' class='form-control form-control2 fechasA bg-white' readonly>
                </div>
                <div class='col-4 text-left form-group'>
                    <input type='text' id='Correo_${rowCountHA}' name='Correo_${rowCountHA}' aria-describedby='sizing-addon2' class='form-control form-control2 fechasA bg-white'>
                </div>

                <div class='col-2 text-left form-group'>
                    <button type='button' id='Eliminar_${rowCountHA}' class='delete btn-circle btn-register border-0' style='background-color: #ff6767'> <img src='./images/iconos/Pathcan.svg' class='edit-1'></button>
                </div>

            </div>
        </div>
    `);


    // tercer parametro (opc) igual a 2 para indicar que es lista de envio ACR
    fnSp4GetPerson($("#Name_"+rowCountHA),rowCountHA,2,0,0,0,0,0,0,0);

    //var total = ( rowCountHA < 10 ) ? "0"+rowCountHA : rowCountHA
    let total = $('#listadoPersonasEnviarACRSp4 .item-tabla').length

    total = ( total < 10 ) ? `0${total}` : total
    $('#rowCountHA').html(total);

    // eliminar row
    $('#listadoPersonasEnviarACRSp4').on('click', '.delete', function()
    {
        $(this).parents('.item-tabla').remove();

        total--
        total = ( total < 10 ) ? "0"+total : total

        $('#rowCountHA').html(total)
    });

}
//------------------------------------- end  fnSp4AgregarRowListaEnvioACR() -------------------------------------

//------------------------------------- start  fnSp4ConfirmarEnviarACR() -------------------------------------
var fnSp4ConfirmarEnviarACR = function()
{
    let resultado = false
    // obtenemos el total de personas a enviar ACR
    if(fnSp4RecorrerListadoEnviarACR(false))
    {
        resultado = fnSp4RecorrerListadoEnviarACR(true)
    }

    if(resultado)
    {
        // ocultamos modal
        $('#modalEnviarSp4ACR').modal('hide').removeClass('fade');
        // mostramos modal
        $('#modalConfirmarEnviarSp4ACR').modal('show').addClass('fade')
    }
    else ///// mostramos la ventana de error
    {
        $("#subTituloErrorSp4HA").html(`No Puedes Enviar el ACR - ${objHallazgoAsignado[objAC.HallazgoId].dataHallazgo.Code_Hallazgo}`)
        $("#mensajeErrorSp4HA").html(`Faltan Datos...`)
        $('#modalSp4MsgErrorHA').modal('show').addClass('fade')
    }
}
//------------------------------------- end  fnSp4ConfirmarEnviarACR() -------------------------------------

//------------------------------------- start  fnSp4RecorrerListadoEnviarACR() -------------------------------------
// guardar me indica si debo agregar el listao al objeto a enviar
var fnSp4RecorrerListadoEnviarACR = function (guardar)
{
    if(guardar) objAC.EnvioACR = []
    // check para devolver el resultado
    let result = false
    // cantidad total de filas creadas
    let total = $('#CountHA').val()
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
            if($(`#UserHash_${i}`).val()<25) count++
            // agrego las personas al objeto
            if(guardar)
            {
                let person = new classEnvioACR()
                person.Id = 0
                person.HAAccionCorrectivaId = objAC.Id
                person.Name                 = $(`#Name_${i}`).val()
                person.UserHash             = $(`#UserHash_${i}`).val()
                person.Correo               = $(`#Correo_${i}`).val()
                person.Cargo                = $(`#Cargo_${i}`).val()
                person.Deleted              = 0
                person.Created_By           = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa)

                objAC.EnvioACR.push(person)
            }//*/
        }
    }

    result = (count==0 && personas > 0) ? true : false

    return result
}
//------------------------------------- end  fnSp4RecorrerListadoEnviarACR() -------------------------------------

//------------------------------------- start  fnSp4FormatFechaBD() -------------------------------------
function fnSp4FormatFechaBD(fecha)
{
    var p = fecha.split("/");
    fecha = p[2]+"-"+p[1]+"-"+p[0];
    return fecha;
}
//------------------------------------- end  fnSp4FormatFechaBD() -------------------------------------

//------------------------------------- start  fnSp4FormatFecha() -------------------------------------
////date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA
function fnSp4FormatFecha(fechaBD)
{

    var startDate   = moment(fechaBD).format('DD/MM/YYYY');//dddd
    var year        = moment(fechaBD).format('YYYY');//dddd
    var month       = moment(fechaBD).format('MM');//
    var day         = moment(fechaBD).format('DD');
    //var startDate2   = year +"/"+ month +"/"+ day;
    var startDate2   = day+"/"+month+"/"+year

    return startDate2;
}
//------------------------------------- end  fnSp4FormatFecha() -------------------------------------