var array = []
array.Id = 11
array.HallazgoId = 12
var s = new seguimientos()
s.constructor( array )
console.log( "s", s )
s.GetId()

// Array de Objeto de los seguimientos
var objSeguimientos = []
// seguimiento activo
var seguimientoActivo = 0

// PARA ARMACENAR EN BASE64 EL ARCHIVO DE LA EVIDENCIA
let base64_Evidencia = ""
// para saber la el id del plan de accion
let SE_ACCION_ID = 0
// contador de evidencias
let COUNT_EVIDENCIAS = 1

//------------------------------------- START   initSeguimientosSP5() -------------------------------------
var initSeguimientosSP5 = function ()
{
    ItemListadoCausas = 0
    ItemListadoCausas2 = 0
    itemPlanAccion = 0
    console.log( "............................ Arrancamos initSeguimientosSP5 ............................" );
    //responsive
    //fnSp4ResponsiveHallazgosAsignados();
    fnCargarFuncionesSeguimientosDinamicasDOMSP5();
    fnCargarSeguimientosSP5();
}
//------------------------------------- END  initSeguimientosSP5() -------------------------------------

//------------------------------------- start fnCargarFuncionesSeguimientosDinamicasDOMSP5() -------------------------------------
function fnCargarFuncionesSeguimientosDinamicasDOMSP5()
{
    // campo fecha desde
    $( "#txt_fecha_desdeSE" ).datetimepicker(
    {
        timepicker: false,
        format: 'd/m/Y'
    } );

    // campo fecha hasta
    $( "#txt_fecha_hastaSE" ).datetimepicker(
    {
        timepicker: false,
        format: 'd/m/Y'
    } );

    // ejemplo obtener fecha actual
    var fechaMin = new Date();
    // Número de días a agregar
    var dias = 1;
    // setear fecha
    fechaMin.setDate( fechaMin.getDate() - dias );
    // CAMPO NUEVA FECHA REPROGRAMACION EN MODAL REPROGRAMACIONES
    $( "#txtNuevaFechaReprogramacionSp5" ).datetimepicker(
    {
        timepicker: false,
        minDate: new Date(),
        format: 'd/m/Y'
    } );
}
//------------------------------------- end  fnCargarFuncionesSeguimientosDinamicasDOMSP5() -------------------------------------

//------------------------------------- START   fnCargarSeguimientosSP5() -------------------------------------
/**
 * [fnCargarSeguimientosSP5 cargamos los objetos js de Seguimientos, Sedes, Tipos Hallazgos, Normas, StatusPAC]
 * @return {[type]} [description]
 */
var fnCargarSeguimientosSP5 = function ()
{
    // alert("4. SeguimientoActivo -> "+seguimientoActivo)
    showLoading();

    // obtenemos los valores de los filtros
    let tipoHallazgoId = $( '#sel_filter_tipo_hallazgosSE' ).val();
    if ( tipoHallazgoId == null )
    {
        tipoHallazgoId = 0;
    }
    let normaId = $( '#sel_filter_normaSE' ).val();
    if ( normaId == null )
    {
        normaId = 0;
    }
    let statusPACId = $( '#sel_filter_estadoPAC' ).val();
    if ( statusPACId == null )
    {
        statusPACId = 0;
    }
    let sedeId = $( '#sel_filter_sedeSE' ).val();
    if ( sedeId == null )
    {
        sedeId = 0;
    }
    let f1, f2, f11, f22;
    f11 = $( '#txt_fecha_desdeSE' ).val();
    f22 = $( '#txt_fecha_hastaSE' ).val();
    if ( $( '#txt_fecha_desdeSE' ).val() != "" )
    {
        f1 = date1_DD_MM_AAAA_to_AAAA_MM_DD_T_HH_MM_S( f11 )
    }
    else
    {
        f1 = "";
    }
    if ( $( '#txt_fecha_hastaSE' ).val() != "" )
    {
        f2 = date1_DD_MM_AAAA_to_AAAA_MM_DD_T_HH_MM_S( f22 )
    }
    else
    {
        f2 = "";
    }

    //console.log("tipoHallazgoId, normaId ,statusPACId, sedeId, f1, f2 ",tipoHallazgoId, normaId ,statusPACId, sedeId, f1, f2)

    // Definida en hallazgosAsignados.js
    fnSp4DeshabilitarBotonPorId( 'btnBuscarSeguimientos', 'Buscando...', "" )

    // SI EL ROL ES ROL_COORDINADORAUDITORIA MOSTRAMOS TODO. SINO MOSTRAMOS LOS HALLAZGOS ASIGNADOS
    let ResponsableUserHash = ( getCookie( "vtas_rolexternalrol" + sessionStorage.tabVisitasa ) === "ROL_COORDINADORAUDITORIA" || getCookie( "vtas_rolexternalrol" + sessionStorage.tabVisitasa ) === "ROL_EVALUADORLOCAL_AC" ) ? "" : getCookie( "vtas_id_hash" + sessionStorage.tabVisitasa )

    let ResponsableAccionUserHash = ( getCookie( "vtas_rolexternalrol" + sessionStorage.tabVisitasa ) === "ROL_RESPONSABLEEJECUCION_AC") ? getCookie( "vtas_id_hash" + sessionStorage.tabVisitasa ) : ""

    if( ResponsableAccionUserHash !== "" )
    {
        ResponsableUserHash = ""
    }

    let url = apiurlAuditoria + "/api/Get-SeguimientosAC-All?code=" + GetSeguimientosACAll + "&httpmethod=objectlist&ResponsableUserHash=" + ResponsableUserHash + "&ResponsableAccionUserHash=" + ResponsableAccionUserHash + "&TipoHallazgoId=" + tipoHallazgoId + "&NormaId=" + normaId + "&SedeId=" + sedeId + "&StatusPACId=" + statusPACId + "&FechaInicio=" + f1 + "&FechaFin=" + f2;

    console.log("URL -> ",url )

    let headers = {
        "apikey": constantes.apiKey
    }

    let settings = {
        "url": url,
        "method": "GET",
        "timeout": 0,
        "crossDomain": true,
        "dataType": "json",
        "headers": headers,
    };

    $.ajax( settings ).done( function ( response )
        {
            console.warn( "*** todos ***", response );

            // LLENAMOS EL SELECT DE TIPOS DE HALLAZGOS
            $( "#" + 'sel_filter_tipo_hallazgosSE' ).html( " " );
            $( "#" + 'sel_filter_tipo_hallazgosSE' ).css( 'font-size', '13px' );
            $( "#" + 'sel_filter_tipo_hallazgosSE' ).html( "<option selected value='0'>          </option>" );
            response.TipoHallazgos.map( function ( item )
            {
                $( "#" + 'sel_filter_tipo_hallazgosSE' ).append( `<option value='${item.Id}' code='${item.Code}'  title='${item.TipoHallazgo}' style='font-weight: bold;'>${item.TipoHallazgo}</option>` );
            } );

            // LLENAMOS EL SELECT DE NORMAS
            $( "#" + 'sel_filter_normaSE' ).html( " " );
            $( "#" + 'sel_filter_normaSE' ).css( 'font-size', '13px' );
            $( "#" + 'sel_filter_normaSE' ).html( "<option selected value='0'>          </option>" );
            response.Normas.map( function ( item )
            {
                $( "#" + 'sel_filter_normaSE' ).append( `<option value='${item.Id}' description='${item.Description}' title='${item.Norma}' style='font-weight: bold;'>${item.Norma}</option>` );
            } );

            // LLENAMOS EL SELECT DE STATUSPAC
            $( "#" + 'sel_filter_estadoPAC' ).html( " " );
            $( "#" + 'sel_filter_estadoPAC' ).css( 'font-size', '13px' );
            $( "#" + 'sel_filter_estadoPAC' ).html( "<option selected value='0'>          </option>" );
            response.StatusPAC.map( function ( item )
            {
                $( "#" + 'sel_filter_estadoPAC' ).append( `<option value='${item.Id}' title='${item.Description}' style='font-weight: bold;'>${item.Description}</option>` );
            } );

            // LLENAMOS EL SELECT DE SEDES
            $( "#" + 'sel_filter_sedeSE' ).html( " " );
            $( "#" + 'sel_filter_sedeSE' ).css( 'font-size', '13px' );
            $( "#" + 'sel_filter_sedeSE' ).html( "<option selected value='0'>          </option>" );
            response.Sedes.map( function ( item )
            {
                $( "#" + 'sel_filter_sedeSE' ).append( `<option value='${item.Id}' title='${item.Sede}' style='font-weight: bold;'>${item.Sede}</option>` );
            } );

            // OBTENEMOS EL TOTAL DESEGUIMIENTOS
            $( "#cantSeguimientos" ).html( '<b> ' + response.Seguimientos.length + '</b> ' );

            // RECORREMOS LA DATA PARA LLENAR EL LISTADO
            if ( response.Seguimientos.length > 0 )
            {
                ///// START LLENO MI OBJETO DE Seguimientos ASIGNADOS
                objSeguimientos = []
                response.Seguimientos.map( function ( Item )
                {
                    objSeguimientos[ Item.HallazgoId ] = new seguimientos()
                    objSeguimientos[ Item.HallazgoId ].constructor( Item )
                } )
                console.warn( "objSeguimientos", objSeguimientos )
                ///// END LLENO MI OBJETO DE HALLAZGOS ASIGNADOS
                $( '#bodyTablaSeguimientos' ).html( " " );
                $( '#bodyTablaSinSeguimientos' ).css( 'display', 'none' );

                $( '#pagination-container-Seguimientos' ).pagination(
                {

                    dataSource: response.Seguimientos,
                    pageSize: 4,
                    callback: function ( data, pagination )
                    {
                        let html = fnListarSeguimientosSP5( data );
                        $( '#bodyTablaSeguimientos' ).html( html );
                    }
                } )

            }
            else // si no hay seguimientos
            {
                $( '#bodyTablaSeguimientos' ).html( " " );
                $( '#bodyTablaSinSeguimientos' ).css( 'display', 'block' );
            }

            if (SimularfnAgregarEvidenciasDeAccion)
            {
                SimularfnAgregarEvidenciasDeAccion = false
                // alert("simular  "+SimularAccionId  )
                // OCULTAMOS MODAL VER ACR
                $( '#modalDetalleAccionSp5' ).modal( 'hide' ).removeClass( 'fade' )

                // alert("seguimientoActivo -> "+seguimientoActivo)
                seguimiento = new seguimientos()
                seguimiento.constructor( objSeguimientos[ seguimientoActivo ] )

                setTimeout(function(){
                    // alert("antes de fnVerModalEvidenciasAccion")
                    fnVerModalEvidenciasAccion(SimularAccionId)
                },300)

                // MOSTRAMOS MODAL VER ACR
                // $( '#modalDetalleAccionSp5' ).modal( 'show' ).addClass( 'fade' )
            }

        } )
        .fail( function ( jqXHR, textStatus, errorThrown )
        {
            console.error( jqXHR, textStatus, errorThrown )
        } )
        .always( function ( jqXHR, textStatus, errorThrown )
        {
            console.log( "always", jqXHR, textStatus, errorThrown )
            // Definida en hallazgosAsignados.js
            fnSp4HabilitarBotonPorId( "btnBuscarSeguimientos", "Buscar", "" )
            // Colocamos el valor a los filtros
            $( '#sel_filter_tipo_hallazgosSE' ).val( tipoHallazgoId );
            $( '#sel_filter_normaSE' ).val( normaId );
            $( '#sel_filter_estadoPAC' ).val( statusPACId );
            $( '#sel_filter_sedeSE' ).val( sedeId );

            // ocultamos el loading
            hideLoading();

        } );//*/
}
//------------------------------------- END   fnCargarSeguimientosSP5() -------------------------------------


//------------------------------------- START   fnListarSeguimientosSP5() -------------------------------------
/**
 * [fnListarSeguimientosSP5 aqui pintamos el listado de seguimientos...]
 * @return {[type]} [description]
 */
var fnListarSeguimientosSP5 = function ( data )
{
    let html = ''

    // AQUI Crearemos el html para el listado de Seguimientos
    data.forEach( ( Item ) =>
    {
        let porcentajeAvance = fnCalcularPorcentaleAvance( Item )
        let titleVer = 'Ver Seguimiento ' + Item.CodeHallazgo
        let backgroundVer = 'background-color: #254373 !important;'

        let StatusPAC = ( Item.SEStatusPACId == 2 ) ? Item.StatusPAC + " " + Item.Dias + " días" : Item.StatusPAC


        html += `
            <div class="item-tabla py-2 px-4" style="z-index: 1;display:relative;">
                <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                    <div class="col-12 text-center" style="font-size: 13px; padding: 4px !important; ">
                        <div class="row">

                            <table width = "100%" border="0">
                                <tr>

                                    <td width = "15%" align="center"><div id="c1TabGeny" class="text-left lbCabezaTabla1"  >${Item.CodeHallazgo}</div></td>
                                    <td width = "15%" align="center"><div id="c2TabGeny" class="text-left lbCabezaTabla1"  >${Item.TipoHallazgo}</div></td>
                                    <td width = "15%" align="center"><div id="c3TabGeny" class="text-left lbCabezaTabla1"  >${Item.Norma}</div></td>
                                    <td width = "15%" align="center"><div id="c4TabGeny" class="text-left lbCabezaTabla1"  >${Item.Sede}</div></td>
                                    <td width = "15%" align="center"><div id="c5TabGeny" class="text-left lbCabezaTabla1"  >${Item.FechaProximoVencimientoModificada}</div></td>
                                    <td width = "10%" align="center"><div id="c6TabGeny" class="text-left lbCabezaTabla1" style="font-weight: bold; color:${Item.StatusPACCode}"; >${StatusPAC}</div></td>
                                    <td width = "10%" align="center"><div id="c7TabGeny" class="text-left lbCabezaTabla1 px-3">${porcentajeAvance} %</div></td>
                                    <td width = "5%" align="center"><div id="c10TabGeny" class="text-center lbCabezaTabla1"  >
                                        <button type='button' onclick="fnVerSeguimientoSP5(${Item.HallazgoId}, ${porcentajeAvance})" class='btn-circle btn_read border-0'  style='${backgroundVer} cursor:pointer !important;' id='btnVerSeguimiento_${Item.HallazgoId}' hallazgoid='${Item.HallazgoId}'  title ='${titleVer}'  >
                                                <img src='./images/iconos/searching1.png' style = 'cursor:pointer !important;'>
                                        </button>
                                    </div></td>

                                </tr>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        `
    } )

    return html
}
//------------------------------------- END   fnListarSeguimientosSP5() -------------------------------------


//------------------------------------- START  fnCalcularPorcentaleAvance() -------------------------------------
/**
 * [fnCalcularPorcentaleAvance obtenemos el porcentaje del avance del plan]
 * @param  {[object]} Item [Plan de Acciones]
 * @return {[int]}         [porcentaje del avance actual]
 */
var fnCalcularPorcentaleAvance = function ( Item )
{
    let total = Item.Acciones.length
    let finalizadas = 0
    // console.warn( "fnCalcularPorcentaleAvance -> ", Item )
    Item.Acciones.forEach( function ( item )
    {
        if ( item.HAStatusAccionId == 3 )
            finalizadas++
    } )

    let porcentajeAvance = ( finalizadas * 100 ) / total

    porcentajeAvance = Math.round( porcentajeAvance, -2 )

    if ( isNaN( porcentajeAvance ) )
        porcentajeAvance = 0

    return porcentajeAvance
}
//-------------------------------------  END   fnCalcularPorcentaleAvance() -------------------------------------

//
let returnModalVerPAC = function()
{
    $('#modalDetalleAccionSp5').modal('hide').removeClass('fade');
    //alert("seguiminetoActivo " + seguimientoActivo)
    //alert("PorcentajeAvanceActivo " + PorcentajeAvanceActivo)
    //$('#modalVerPACSp5').modal('show').addClass('fade');
    fnVerSeguimientoSP5( seguimientoActivo, PorcentajeAvanceActivo )
}
//

//------------------------------------- END   fnVerSeguimientoSP5(hallazgoId) -------------------------------------
/**
 * [fnVerSeguimientoSP5 Levantar modal para el ver seguimiento]
 * @param  {[type]} hallazgoId [Id en la tabla Hallazgos]
 */
var seguimiento = []
var PorcentajeAvanceActivo = 0
var fnVerSeguimientoSP5 = function ( hallazgoId, PorcentajeAvance )
{
    // obtenemos el vamor del seguimiento activo activo
    seguimientoActivo      = hallazgoId
    PorcentajeAvanceActivo = PorcentajeAvance
    // alert("1. SeguimientoActivo -> "+seguimientoActivo)
    // console.warn("hallazgoId",hallazgoId,objSeguimientos[seguimientoActivo]," -> ",objSeguimientos[seguimientoActivo].GetId())


    seguimiento = new seguimientos()
    seguimiento.constructor( objSeguimientos[ seguimientoActivo ] )
    //console.log("seguimiento -> ",seguimiento)

    // COLOCAR TITULO A LA MODAL
    $( "#titleModalVerPACSp5" ).html( `PAC - ${seguimiento.GetCodeHallazgo()}` )

    // COLOCAR ID HALLAZGO
    $( "#idHallazgoPAC" ).html( `${seguimiento.GetCodeHallazgo()}` )

    // COLOCAR ID HALLAZGO
    $( "#tipoHallazgoPAC" ).html( `${seguimiento.GetTipoHallazgo()}` )

    // COLOCAR NORMA
    $( "#normaPAC" ).html( `${seguimiento.GetNorma()}` )

    // COLOCAR PORCENTAJE
    $( "#porcentajePAC" ).html( `${PorcentajeAvance} %` )

    // COLOCAR SEDE
    $( "#sedePAC" ).html( `${seguimiento.GetSede()}` )

    // AGREGAR ACCIONES
    // console.warn("seguimiento.Acciones -> ",seguimiento.Acciones)
    $( "#listadoAccionesSp3" ).html( '' )
    fnAgregarAccionesPACSp3( seguimiento.Acciones )

    // MOSTRAMOS MODAL VER ACR
    $( '#modalVerPACSp5' ).modal( 'show' ).addClass( 'fade' )
}
//------------------------------------- END   fnVerSeguimientoSP5(hallazgoId) -------------------------------------

//------------------------------------- START  fnVerSeguimientoSP5(hallazgoId) -------------------------------------
var fnAgregarAccionesPACSp3 = function ( Acciones )
{
    Acciones.forEach( function ( item )
    {
         console.warn("item ",item) //fnVerModalEvaluarEvidencia getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_RESPONSABLEASIGNADO_AC")

        let backgroundVer = 'background-color: #254373 !important;'
        let backgroundRep = 'background-color: #61b4f9 !important;'
        let count = ( item.Item < 10 ) ? "0" + item.Item : item.Item
        let titleVer = `Ver Plan de Acción`
        let titleReprogramar = `Reprogramar Plan de Acción`

        let colorAccion = (item.HAStatusAccionId === 3) ? '#99b839' : '#ffb800'

        // CUANDO EL USUARIO NO TIENE EL ROL (ROL_COORDINADORAUDITORIA) NO PUEDE REALIZAR REPROGRAMACIONES
        let disabledBtnRep = ( getCookie( "vtas_rolexternalrol" + sessionStorage.tabVisitasa ) != "ROL_COORDINADORAUDITORIA" && getCookie( "vtas_rolexternalrol" + sessionStorage.tabVisitasa ) != "ROL_RESPONSABLEASIGNADO_AC" ) ? "disabled" : ""
        let backgroundBtnRep = ( getCookie( "vtas_rolexternalrol" + sessionStorage.tabVisitasa ) != "ROL_COORDINADORAUDITORIA" && getCookie( "vtas_rolexternalrol" + sessionStorage.tabVisitasa ) != "ROL_RESPONSABLEASIGNADO_AC" ) ? "background-color: #b2b2b2 !important;" : "background-color: #61b4f9 !important;"
        let cursorBtnRep = ( getCookie( "vtas_rolexternalrol" + sessionStorage.tabVisitasa ) != "ROL_COORDINADORAUDITORIA" && getCookie( "vtas_rolexternalrol" + sessionStorage.tabVisitasa ) != "ROL_RESPONSABLEASIGNADO_AC" ) ? "" : "cursor:pointer !important;"

        $( "#listadoAccionesSp3" ).append( `
            <div class="tablet-option__body row clear--row">
                <div class="col-4 d-flex clear--col align-items-center">
                    <h5 class="number w-1 mb-0">${count}</h5>
                    <p class="w-4 pl-3 pr-1 mb-0" style="font-size:11px;">${item.Respuesta}</p>
                    <p class="w-5 pl-1 mb-0" style="font-size:11px;">${item.Accion}</p>
                </div>
                <div class="col-8 tablet-option__contain clear--col">
                    <div class="content-left tablet-option__flex-column" style="padding-left: 12px;">
                        <p class="text-gray">${item.PlazoAccion}</p>
                    </div>
                    <div class="content-left tablet-option__flex-column">
                        <p class="text-gray">${item.TipoAccion}</p>
                    </div>
                    <div class="content-left tablet-option__flex-column pl-2">
                        <p class="text-gray">${toCapitalize(item.Responsable)}</p>
                    </div>
                    <div class="content-left tablet-option__flex-column pl-2">
                        <p class="text-gray">${item.FechaFormato}</p>
                    </div>
                    <div class="content-left tablet-option__flex-column pl-2">
                        <p style="color: ${colorAccion}">${item.StatusAccion}</p>
                    </div>
                    <div class="content-left tablet-option__flex-column align-items-center">

                        <button type='button' onmouseup="fnVerModalEvidenciasAccion(${item.Id})" class='btn-circle btn_read border-0'  style='${backgroundVer} cursor:pointer !important;' id='btnVerPlanAccion_${item.Id}' HAPlanAccionId='${item.Id}'  title ='${titleVer}'  >
                                <img src='./images/newsistema/iconos/evidence1.svg' style='cursor:pointer !important;'>
                        </button>
                    </div>
                    <div class="content-left tablet-option__flex-column align-items-center">
                        <button ${disabledBtnRep} type='button' onmouseup="fnVerModalReprogramarEvidencia(${item.Id})" class='btn-circle btn_read border-0'  style='${backgroundBtnRep} ${cursorBtnRep}' id='btnReprogramarPlanAccion_${item.Id}' HAPlanAccionId='${item.Id}'  title ='${titleReprogramar}'>
                                <img src='./images/newsistema/iconos/calendar3.png'>
                        </button>
                    </div>
                </div>
            </div>
        ` )
    } )
}
//-------------------------------------  END   fnVerSeguimientoSP5(hallazgoId) -------------------------------------


//modalDetalleAccionSp5
//-------------------------------------  START   fnVerModalEvidenciasAccion() -------------------------------------
/**
 * [fnVerModalEvidenciasAccion Ver modal con el listado de evidencias]
 * @param  {[type]} AccionId [Id del plan de la accion]
 * @return {[type]}          [description]
 */
//seguimientoActivo
var fnVerModalEvidenciasAccion = function ( AccionId )
{
    // alert("AccionId"+AccionId)
    console.warn("ver Evidencia ",AccionId)
    // para tener de manera globar el
    SE_ACCION_ID = AccionId
    let accion = seguimiento.getAccionById( AccionId )
    console.info("accion -> ",accion)
    // OCULTAMOS MODAL VER ACR
    $( '#modalVerPACSp5' ).modal( 'hide' ).removeClass( 'fade' )

    // COLOCAR TITULO A LA MODAL
    $( "#titleModalDetalleAccionSp5" ).html( `PAC - ${seguimiento.GetCodeHallazgo()}` )

    // COLOCAR DESCRIPTION HALLAZGO
    $( "#descriptionHallazgo" ).html( `${seguimiento.GetHallazgo()}` )
    //$("#descriptionHallazgo").val(`${seguimiento.GetHallazgo()}`)

    // COLOCAR DESCRIPTION PROBLEMA
    $( "#descriptionProblema" ).html( `${seguimiento.GetProblema()}` )

    // COLOCAR DESCRIPTION ACCION
    $( "#descriptionAccion" ).html( `${accion.Accion}` )

    // COLOCAR RESPONSABLE ACCION
    $( "#ResponsableAccionesSp5" ).html( `${accion.Responsable}` )

    // AGREGAR LAS EVIDENCIAS
    fnAgregarEvidenciasDeAccion( accion )

    /*
    //let ResponsableUserHash = (getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)==="ROL_COORDINADORAUDITORIA" || getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)==="ROL_EVALUADORLOCAL_AC" ) ? "" : getCookie("vtas_id_hash"+sessionStorage.tabVisitasa)
        //alert("ResponsableUserHash "+ResponsableUserHash+" - "+getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa))
        fnVerSeguimientoSP5
        fnVerModalEvaluarEvidencia

    */
    console.info("rol => ",getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa))
    if( (getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa) === 'ROL_EVALUADORLOCAL_AC') || (accion.HAStatusAccionId === 3) )
    {
        $("#btnAgregarEvidencia").hide()
    }
    else
    {
        $("#btnAgregarEvidencia").show()
    }

    // MOSTRAMOS MODAL DETALLE ACCION CORRECTIVA
    $( '#modalDetalleAccionSp5' ).modal( 'show' ).addClass( 'fade' )
}
//-------------------------------------   END    fnVerModalEvidenciasAccion() -------------------------------------

//-------------------------------------  START   fnAgregarEvidenciasDeAccion() -------------------------------------
var fnAgregarEvidenciasDeAccion = function ( Accion )
{
    console.warn("Accion --> ",Accion)
    // contador de evidencias
    COUNT_EVIDENCIAS = 1
    // alert("2. SeguimientoActivo -> "+seguimientoActivo)
    // limpiar div listadoEvidenciasAccionCorrectiva
    $( "#listadoEvidenciasAccionCorrectiva" ).html( '' )
    Accion.EvidenciasWeb.forEach( function ( item )
    {
        let disabledEditar = 'disabled'
        // console.table( item )
        if( (item.SEStatusEvaluacionLocalId === 2 || item.SEStatusEvaluacionCorporativaId === 2) && ( getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa) !== 'ROL_EVALUADORLOCAL_AC' && getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa) !== 'ROL_COORDINADORAUDITORIA' ) )
        {
            //alert("activar boton ")
            disabledEditar = ''
        }


        $( "#listadoEvidenciasAccionCorrectiva" ).append( `
            <div class="tablet-option__body row clear--row" style="padding: 5px !important; height: 62px !important;">

                <div class="col-4 d-flex">
                    <h5 class="number w-1 mb-0">${COUNT_EVIDENCIAS}</h5>
                    <div class="col group-form--border d-column justify-content-center">
                        <input type="text" disabled readonly class="w-100" placeholder="Evidencia ${COUNT_EVIDENCIAS}">
                    </div>
                </div>

                <div class="col-8 tablet-option__contain clear--col">
                    <div class="tablet-option__box justify-content-start ml-1 pl-2">
                        <p class="text-gray">${Accion.FechaFormato}</p>
                    </div>
                    <div class="tablet-option__box justify-content-start" style="padding-left: 12px;">
                        <p class="text-gray">${item.FechaAtencion}</p>
                    </div>
                    <div class="tablet-option__box justify-content-start pl-2 ml-1" style="padding-left: 15px;">
                        <p style=" color: ${item.StatusEvaluacionLocalCode}">${item.StatusEvaluacionLocal}</p>
                    </div>
                    <div class="tablet-option__box justify-content-start pl-2 ml-1" style="padding-left: 15px;">
                        <p style="color: ${item.StatusEvaluacionCorporativaCode}">${item.StatusEvaluacionCorporativa}</p>
                    </div>
                    <div class="tablet-option__box align-items-center pl-4">
                        <a href="javascript:void(0)" class="tablet-option__btn-view tablet-option__btn-view--active" onmouseup="fnVerModalEvaluarEvidencia(${Accion.Item},${COUNT_EVIDENCIAS},'${item.AdjuntoName}',${item.SEEvidenciasAdjuntosId},${item.Id},${Accion.Id},${item.SEStatusEvaluacionLocalId}, '${item.Detalle}',${item.SEStatusEvaluacionCorporativaId}, '${item.DetalleEvaluacionCorporativa}')">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                                <g clip-path="url(#clip0)">
                                    <path fill="#fff" d="M10.006 17.537c-2.43 0-4.662-.874-6.634-2.598C1.768 13.536.74 11.897.27 11.044c-.362-.656-.359-1.438.009-2.091.478-.851 1.52-2.489 3.126-3.891 1.977-1.726 4.198-2.6 6.602-2.6 2.405 0 4.625.875 6.6 2.602 1.603 1.403 2.642 3.04 3.118 3.892.365.651.368 1.431.009 2.085-.218.396-.581 1.009-1.081 1.687-.256.347-.745.421-1.093.165-.347-.256-.42-.745-.165-1.092.45-.609.775-1.158.97-1.512.098-.179.097-.392-.003-.57-.958-1.713-3.69-5.695-8.355-5.695-4.665 0-7.405 3.982-8.366 5.694-.1.178-.102.392-.003.572.943 1.71 3.646 5.685 8.369 5.685 1.739 0 3.372-.544 4.854-1.616.35-.252.838-.174 1.09.175.253.35.175.838-.175 1.091-1.753 1.269-3.695 1.912-5.77 1.912zM14.609 10c0-2.54-2.068-4.608-4.609-4.608S5.392 7.458 5.392 9.999c0 2.542 2.067 4.609 4.608 4.609 2.541 0 4.609-2.067 4.609-4.609zm-1.563 0c0 1.68-1.366 3.047-3.046 3.047-1.68 0-3.046-1.367-3.046-3.047 0-1.68 1.366-3.046 3.046-3.046 1.68 0 3.046 1.367 3.046 3.046zm-2.17.212c-.599-.04-1.076-.54-1.09-1.14v-.015c-.004-.342-.382-.54-.664-.349-.444.303-.724.828-.68 1.416.06.76.674 1.375 1.435 1.434.587.045 1.113-.235 1.415-.68.192-.281-.007-.66-.348-.663l-.068-.003z"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0">
                                        <path fill="#fff" d="M0 0H20V20H0z"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </a>
                    </div>

                    <div class="tablet-option__box align-items-center pl-4">
                        <input type="file" id="editarEvidencia_${item.Id}" onChange="ModificarEvidenciaArchivo(${item.Id}, ${item.SEEvidenciasAdjuntosId}, ${Accion.Id})" style="display:none"/>
                        <button ${disabledEditar} class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-add m-auto" onClick="$('#editarEvidencia_${item.Id}').trigger('click');">
                            <img src="./images/newsistema/iconos/edit1.svg" alt="" class="w-50">
                        </button>
                    </div>

                </div>

            </div>
        ` )

        COUNT_EVIDENCIAS++

    } )
}
//-------------------------------------   END    fnAgregarEvidenciasDeAccion() -------------------------------------


let ModificarEvidenciaArchivo = function(Id, SEEvidenciasAdjuntosId, AccionId)
{
    // console.warn("Id ",Id,"SEEvidenciasAdjuntosId ",SEEvidenciasAdjuntosId, ", AccionId ",AccionId)

    let fileInput = document.getElementById('editarEvidencia_'+Id);
    let filePath = fileInput.value;
    // console.info("ha ",filePath)
    // INICIO QUITAR VALIDAR PERMITIR SOLO FOTOS
    // let allowedExtensions = /(.jpeg)$/i;

    // if(!allowedExtensions.exec(filePath)){
    //     allowedExtensions = /(.jpg)$/i;

    //     if(!allowedExtensions.exec(filePath)){
    //         allowedExtensions = /(.png)$/i;

    //         if(!allowedExtensions.exec(filePath))
    //         {
    //             // alert('Por favor cargue solo archivos .jpeg, .jpg o .png');
    //             //console.error( "ingrese solo archivos pdf ", fileInput.files[ 0 ].size )
    //             $( "#subTituloErrorSESp5" ).html( '<b> Formato no Válido. </b>' )
    //             $( "#mensajeErrorSESp5" ).html( `Por favor cargue solo archivos .jpeg, .jpg o .png` )
    //             $( '#modalMsgErrorSESp5' ).modal( 'show' ).addClass( 'fade' )
    //             fileInput.value = '';
    //             return false;
    //         }
    //     }
    // }
    // FIN QUITAR VALIDAR PERMITIR SOLO FOTOS

    let esc= escape(filePath)
    let name = esc.split("%5C");

    // console.info("mane => ",name)

    let file_trainning = document.getElementById('editarEvidencia_'+Id).files[0];
    if(file_trainning)
    {
        // DEFINIDA EN js/auditoria/planAuditoria.js
        toBase64SP3(file_trainning).then(
            data => {
                base64_Evidencia = getResult(data);
                //console.error("base64_Evidencia -> ", base64_Evidencia)
                console.error("data -> ", data)
                sp5FnEditarEvidenciaArchivo(Id, SEEvidenciasAdjuntosId, name, data, AccionId);
            }
        );

    }
}

let sp5FnEditarEvidenciaArchivo = function(Id, SEEvidenciasAdjuntosId, name, data, AccionId)
{
    // alert("3. SeguimientoActivo -> "+seguimientoActivo)
    // OCULTAMOS MODAL VER ACR
    $( '#modalDetalleAccionSp5' ).modal( 'hide' ).removeClass( 'fade' )

    showLoading();
    //console.error(name,base64_Evidencia,data)
    let Created_By  = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);

    // console.warn(Id, SEEvidenciasAdjuntosId, name, data)

    var body = {
        "Id":  Id,
        "SEEvidenciasAdjuntosId":  SEEvidenciasAdjuntosId,
        "Created_By":   Created_By,
        "Deleted":   0,
        "Name": name[2],
        "Adjunto": data

    }

    // console.warn(body)

    let url = apiurlAuditoria + "/api/Post-SeguimientoAC-All?code=" + PostSeguimientosACAll + "&httpmethod=put";


    var headers = {
        "apikey": constantes.apiKey,
        "Content-Type": "application/json",
    }


    let settings = {
        "url": url,
        "method": "POST",
        "timeout": 0,
        "crossDomain": true,
        "dataType": "json",
        "headers": headers,
        "data": JSON.stringify( body )
    };

    console.log("URL -> ",url )
    // console.log( "settings -> ", settings )
    $.ajax( settings )
        .done( function ( response )
        {
            console.warn("response -> ",response)
        })
        .fail( function ( jqXHR, textStatus, errorThrown )
        {
            console.error( jqXHR, textStatus, errorThrown )
        } )
        .always( function ( jqXHR, textStatus, errorThrown )
        {
            // console.log("always", jqXHR, textStatus, errorThrown)
            // ocultamos el loading
            //hideLoading();
            //alert("simular click en la accionId "+AccionId)
            SimularfnAgregarEvidenciasDeAccion = true
            SimularAccionId                    = AccionId
            fnCargarSeguimientosSP5()

        } );//*/
}

let SimularfnAgregarEvidenciasDeAccion = false
let SimularAccionId                    = 0



let adjuntarEvidenciaArchivo = function (){
    $('#agregarEvidencia').trigger('click');
}

let seleccionarEvidenciaArchivo = function (){
    var fileInput = document.getElementById('agregarEvidencia');
    var filePath = fileInput.value;
    console.info("ha ",filePath)
    var allowedExtensions = /(.jpeg)$/i;

    /*if(!allowedExtensions.exec(filePath)){
        allowedExtensions = /(.jpg)$/i;

        if(!allowedExtensions.exec(filePath)){
            allowedExtensions = /(.png)$/i;

            if(!allowedExtensions.exec(filePath))
            {
                // alert('Por favor cargue solo archivos .jpeg, .jpg o .png');
                console.error( "ingrese solo archivos pdf ", fileInput.files[ 0 ].size )
                $( "#subTituloErrorSESp5" ).html( '<b> Formato no Válido. </b>' )
                $( "#mensajeErrorSESp5" ).html( `Por favor cargue solo archivos .jpeg, .jpg o .png` )
                $( '#modalMsgErrorSESp5' ).modal( 'show' ).addClass( 'fade' )
                fileInput.value = '';
                return false;
            }
        }
    }//*/
    var esc= escape(filePath)
    var name = esc.split("%5C");

    console.info("mane => ",name)


    var file_trainning = document.getElementById("agregarEvidencia").files[0];
    if(file_trainning)
    {
        // DEFINIDA EN js/auditoria/planAuditoria.js
        toBase64SP3(file_trainning).then(
            data => {
                base64_Evidencia = getResult(data);
                console.error("base64_Evidencia -> ", base64_Evidencia)
                sp5FnGuardarEvidenciaArchivo(name,base64_Evidencia,data);
            }
        );

    }
    // $('#arc_t').html(name[2]);
}

/**
 * [sp5FnGuardarEvidenciaArchivo Agredar una evidencia desde la web]
 * @param  {[type]} name             [nombre del archivo]
 * @param  {[type]} base64_Evidencia [archivo en bae 64 sin data del tipo de archivo]
 * @param  {[type]} data             [archivos en base 64 conmpleto]
 * @return {[type]}                  [description]
 */
let sp5FnGuardarEvidenciaArchivo= function(name,base64_Evidencia,data)
{
    showLoading();
    //console.error(name,base64_Evidencia,data)
    let Created_By  = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);

    //let AuditoriaId = istAud;

    var body = {
        "HAPlanAccionesId":  SE_ACCION_ID,
        "Created_By":   Created_By,
        "Name": name[2],
        "Adjunto": data

    }

    // console.warn("body -> ",body)
    // console.warn("seguimiento -> ",seguimiento)

    let accion = seguimiento.getAccionById( SE_ACCION_ID )
    // console.warn("accion -> ",accion)

    //PostSeguimientosACAll
    let url = apiurlAuditoria + "/api/Post-SeguimientoAC-All?code=" + PostSeguimientosACAll + "&httpmethod=post";


    var headers = {
        "apikey": constantes.apiKey,
        "Content-Type": "application/json",
    }


    let settings = {
        "url": url,
        "method": "POST",
        "timeout": 0,
        "crossDomain": true,
        "dataType": "json",
        "headers": headers,
        "data": JSON.stringify( body )
    };

    // console.log("URL -> ",url )
    // console.log( "settings -> ", settings )
    $.ajax( settings )
        .done( function ( response )
        {
            //console.warn("*** response ***",response);
            if ( response.Id > 0 )
            {
                // PARA obtener el dia actual
                let CurrentDate = new Date()
                let month = (CurrentDate.getMonth() > 9) ? (CurrentDate.getMonth()+1) : '0'+(CurrentDate.getMonth()+1)

                    //CurrentDate.getDate() + '/'
                CurrentDate = (CurrentDate.getDate() > 9) ? CurrentDate.getDate() : '0'+(CurrentDate.getDate()) + '/'
                    + ( (CurrentDate.getMonth() > 9) ? (CurrentDate.getMonth()+1) : '0'+(CurrentDate.getMonth()+1) ) + '/'
                    + CurrentDate.getFullYear()


                $( "#listadoEvidenciasAccionCorrectiva" ).append( `
                    <div class="tablet-option__body row clear--row" style="padding: 5px !important; height: 62px !important;">

                        <div class="col-4 d-flex">
                            <h5 class="number w-1 mb-0">${COUNT_EVIDENCIAS}</h5>
                            <div class="col group-form--border d-column justify-content-center">
                                <input type="text" disabled readonly class="w-100" placeholder="Evidencia ${COUNT_EVIDENCIAS}">
                            </div>
                        </div>

                        <div class="col-8 tablet-option__contain clear--col">
                            <div class="tablet-option__box justify-content-start ml-1 pl-2">
                                <p class="text-gray">${accion.FechaFormato}</p>
                            </div>
                            <div class="tablet-option__box justify-content-start" style="padding-left: 12px;">
                                <p class="text-gray"> ${CurrentDate} </p>
                            </div>
                            <div class="tablet-option__box justify-content-start pl-2 ml-1" style="padding-left: 15px;">
                                <p style=" color: #ffb800"> Pediente</p>
                            </div>
                            <div class="tablet-option__box justify-content-start pl-2 ml-1" style="padding-left: 15px;">
                                <p style="color: #ffb800"> Pediente</p>
                            </div>
                            <div class="tablet-option__box align-items-center pl-4">
                                <a href="javascript:void(0)" class="tablet-option__btn-view tablet-option__btn-view--active" onmouseup="fnVerModalEvaluarEvidencia(${accion.Item},${COUNT_EVIDENCIAS},'${name[2]}', ${response.SEEvidenciasAdjuntosId}, ${response.Id}, ${SE_ACCION_ID}, 1,'',1,'')">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                                        <g clip-path="url(#clip0)">
                                            <path fill="#fff" d="M10.006 17.537c-2.43 0-4.662-.874-6.634-2.598C1.768 13.536.74 11.897.27 11.044c-.362-.656-.359-1.438.009-2.091.478-.851 1.52-2.489 3.126-3.891 1.977-1.726 4.198-2.6 6.602-2.6 2.405 0 4.625.875 6.6 2.602 1.603 1.403 2.642 3.04 3.118 3.892.365.651.368 1.431.009 2.085-.218.396-.581 1.009-1.081 1.687-.256.347-.745.421-1.093.165-.347-.256-.42-.745-.165-1.092.45-.609.775-1.158.97-1.512.098-.179.097-.392-.003-.57-.958-1.713-3.69-5.695-8.355-5.695-4.665 0-7.405 3.982-8.366 5.694-.1.178-.102.392-.003.572.943 1.71 3.646 5.685 8.369 5.685 1.739 0 3.372-.544 4.854-1.616.35-.252.838-.174 1.09.175.253.35.175.838-.175 1.091-1.753 1.269-3.695 1.912-5.77 1.912zM14.609 10c0-2.54-2.068-4.608-4.609-4.608S5.392 7.458 5.392 9.999c0 2.542 2.067 4.609 4.608 4.609 2.541 0 4.609-2.067 4.609-4.609zm-1.563 0c0 1.68-1.366 3.047-3.046 3.047-1.68 0-3.046-1.367-3.046-3.047 0-1.68 1.366-3.046 3.046-3.046 1.68 0 3.046 1.367 3.046 3.046zm-2.17.212c-.599-.04-1.076-.54-1.09-1.14v-.015c-.004-.342-.382-.54-.664-.349-.444.303-.724.828-.68 1.416.06.76.674 1.375 1.435 1.434.587.045 1.113-.235 1.415-.68.192-.281-.007-.66-.348-.663l-.068-.003z"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0">
                                                <path fill="#fff" d="M0 0H20V20H0z"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </a>
                            </div>

                            <div class="tablet-option__box align-items-center pl-4">
                                <input type="file" id="editarEvidencia_${response.Id}" onChange="ModificarEvidenciaArchivo(${response.Id}, ${response.SEEvidenciasAdjuntosId})" style="display:none"/>
                                <button disabled class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-add m-auto" onClick="$('#editarEvidencia_${response.Id}').trigger('click');">
                                    <img src="./images/newsistema/iconos/edit1.svg" alt="" class="w-50">
                                </button>
                            </div>

                        </div>

                    </div>
                ` )

                COUNT_EVIDENCIAS++

                fnCargarSeguimientosSP5()
            }
            else
            {
                alert("Error al guardar la evidencia.")
            }
        } )
        .fail( function ( jqXHR, textStatus, errorThrown )
        {
            console.error( jqXHR, textStatus, errorThrown )
        } )
        .always( function ( jqXHR, textStatus, errorThrown )
        {
            // console.log("always", jqXHR, textStatus, errorThrown)
            // ocultamos el loading
            hideLoading();

        } );//*/


}

//onmouseup="fnVerModalEvaluarEvidencia(${Accion.Item},${COUNT_EVIDENCIAS},'${item.AdjuntoName}',${item.SEEvidenciasAdjuntosId},${item.Id},${Accion.Id},${item.SEStatusEvaluacionLocalId}, '${item.Detalle}',${item.SEStatusEvaluacionCorporativaId}, '${item.DetalleEvaluacionCorporativa}')">

//-------------------------------------  START   fnVerModalEvaluarEvidencia() -------------------------------------
//modalEvaluarEvidenciaSp5
var fnVerModalEvaluarEvidencia = function ( NumAccion, NumEvidencia, AdjuntoName, SEEvidenciasAdjuntosId, Id, HAPlanAccionesId, SEStatusEvaluacionLocalId, Detalle, SEStatusEvaluacionCorporativaId, DetalleEvaluacionCorporativa )
{
    console.log( "**HERE ===>", NumAccion, NumEvidencia, AdjuntoName, SEEvidenciasAdjuntosId, Id, HAPlanAccionesId, SEStatusEvaluacionLocalId, Detalle, SEStatusEvaluacionCorporativaId, DetalleEvaluacionCorporativa )
    /*
    //let ResponsableUserHash = (getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)==="ROL_COORDINADORAUDITORIA" || getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)==="ROL_EVALUADORLOCAL_AC" ) ? "" : getCookie("vtas_id_hash"+sessionStorage.tabVisitasa)
        //alert("ResponsableUserHash "+ResponsableUserHash+" - "+getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa))
        fnVerSeguimientoSP5
        fnVerModalEvaluarEvidencia

    */

    if( SEStatusEvaluacionLocalId === '' )
    {
        //alert("evaluacion local null")
    }

    //alert("evaluar "+Id)
    // console.warn("(NumAccion, NumEvidencia, AdjuntoName, SEEvidenciasAdjuntosId, SEStatusEvaluacionLocalId)",NumAccion, NumEvidencia, AdjuntoName, SEEvidenciasAdjuntosId, SEStatusEvaluacionLocalId, Detalle)
    // OCULTAMOS MODAL
    $( '#modalDetalleAccionSp5' ).modal( 'hide' ).removeClass( 'fade' )

    // LIMPIAMOS RADIOS BUTTONS
    // if ($(`#medidas${i}_${j}`).prop('checked')) count++
    $( `#aprobarEvidenciaSp5` ).prop( 'checked', false );
    $( `#observarEvidenciaSp5` ).prop( 'checked', false );


    // COLOCAMOS TITULO A LA MODAL
    $( "#titleModalEvaluarEvidenciaSp5" ).html( `Acci&oacute;n ${NumAccion} - Evidencia ${NumEvidencia}` )

    // COLOCAMOS NOMBRE ADJUNTO
    $( "#nombreEvidencia" ).html( ` ${AdjuntoName} <a href="#" onmouseup="fnDownloadEvidenciaSp5(${SEEvidenciasAdjuntosId})" >Descargar Documento</a>` )

    // limpiar y bloquear textarea observacionEvidenciaSp5
    fnLimpiarBloquearTextAreaSp5( "aprobar" )

    // objeto a enviar para evaluar evidencias
    bodyEvaluarEvidencias = new classEvaluarEvidencia()
    // id de la accion involucrada
    bodyEvaluarEvidencias.HAPlanAccionesId = HAPlanAccionesId
    // id de la evidencia a evaluar
    bodyEvaluarEvidencias.SEEvidenciasAdjuntosId = SEEvidenciasAdjuntosId
    // id de la evidencia a evaluar
    bodyEvaluarEvidencias.Id = Id
    // tipo de evaluacion 1 local, 2 corporativa
    bodyEvaluarEvidencias.TipoEvaluacion = ( getCookie( "vtas_rolexternalrol" + sessionStorage.tabVisitasa ) === "ROL_COORDINADORAUDITORIA" ) ? 2 : 1

    console.warn( "bodyEvaluarEvidencias -> ", bodyEvaluarEvidencias )

    // bloqueamos todos los radios button y y textarea de la modal
    $( "#aprobarEvidenciaSp5" ).attr( 'disabled', true )
    $( "#observarEvidenciaSp5" ).attr( 'disabled', true )
    $( "#observacionEvidenciaSp5" ).attr( 'disabled', true )
    //$("#btnGuardarEvaluacionSp5").attr('disabled',true)
    $( "#btnGuardarEvaluacionSp5" ).css( "display", "none" )

    // SI ES UN GESTOR DEL HALLAZGO
    if ( getCookie( "vtas_rolexternalrol" + sessionStorage.tabVisitasa ) === "ROL_COORDINADORAUDITORIA" )
    {
        console.warn( "ROL_COORDINADORAUDITORIA " + SEStatusEvaluacionLocalId )
        // si la evaluacion local es aprobada
        if ( SEStatusEvaluacionLocalId == 3 )
        {
            console.warn( "evaluacion local aprobada" )
            // si la evaluacion corporativa es aprobada
            if ( SEStatusEvaluacionCorporativaId == 3 )
            {
                $( `#aprobarEvidenciaSp5` ).prop( 'checked', true )
                $( `#observarEvidenciaSp5` ).prop( 'checked', false )
                console.warn( "evaluacion corporativa aprobada" )
            }
            // si la evaluacion corporativa es observada
            else if ( SEStatusEvaluacionCorporativaId == 2 )
            {
                $( `#aprobarEvidenciaSp5` ).prop( 'checked', false )
                $( `#observarEvidenciaSp5` ).prop( 'checked', true )
                $( "#observacionEvidenciaSp5" ).val( DetalleEvaluacionCorporativa )
                $( "#totalCaracteresObservacionEvidenciaSp5" ).html( `${DetalleEvaluacionCorporativa.length}` )
                console.warn( "evaluacion corporativa observada" )
            }
            // si la observacion corporativa esta pendiente
            else
            {
                console.warn( "evaluacion corporativa pendiente" )
                $( `#aprobarEvidenciaSp5` ).prop( 'checked', false )
                $( `#observarEvidenciaSp5` ).prop( 'checked', false )
                $( "#aprobarEvidenciaSp5" ).attr( 'disabled', false )
                $( "#observarEvidenciaSp5" ).attr( 'disabled', false )
                $( "#btnGuardarEvaluacionSp5" ).css( "display", "block" )
            }
        }
        // si la evalaucion local es observada
        else if ( SEStatusEvaluacionLocalId == 2 )
        {
            console.warn( "evaluacion local observada" )
            $( `#aprobarEvidenciaSp5` ).prop( 'checked', false )
            $( `#observarEvidenciaSp5` ).prop( 'checked', true )
            $( "#observacionEvidenciaSp5" ).val( Detalle )
            $( "#totalCaracteresObservacionEvidenciaSp5" ).html( `${Detalle.length}` )
            //$("#btnGuardarEvaluacionSp5").css("display","none")
        }
        // si la observacion local esta pendiente
        else
        {
            console.warn( "evaluacion local pendiente" )
            $( `#aprobarEvidenciaSp5` ).prop( 'checked', false )
            $( `#observarEvidenciaSp5` ).prop( 'checked', false )
        }
    }

    // SI ES UN EVALUADOR LOCAL
    else if ( getCookie( "vtas_rolexternalrol" + sessionStorage.tabVisitasa ) === "ROL_EVALUADORLOCAL_AC" )
    {

        //alert('entrando aqui en ROL_EVALUADORLOCAL_AC linea 638 == '+SEStatusEvaluacionLocalId); //fnLimpiarBloquearTextAreaSp5( "aprobar" )
        console.warn( "ROL_EVALUADORLOCAL_AC " + SEStatusEvaluacionLocalId )
        // si la evaluacion local es PENDIENTE
        if ( SEStatusEvaluacionLocalId == 1 )
        {
            console.warn( "evaluacion local PENDIENTE" )
            $( `#aprobarEvidenciaSp5` ).prop( 'checked', false )
            $( `#observarEvidenciaSp5` ).prop( 'checked', false )

            $( "#aprobarEvidenciaSp5" ).attr( 'disabled', false )
            $( "#observarEvidenciaSp5" ).attr( 'disabled', false )
            $( "#btnGuardarEvaluacionSp5" ).css( "display", "block" )
        }
        // SI LA EVALUACION LOCAL ES OBSERVADA
        else if ( SEStatusEvaluacionLocalId == 2 )
        {
            console.warn( "evaluacion local OBSERVADA" )
            $( `#aprobarEvidenciaSp5` ).prop( 'checked', false )
            $( `#observarEvidenciaSp5` ).prop( 'checked', true )
            $( "#observacionEvidenciaSp5" ).val( Detalle )
            $( "#totalCaracteresObservacionEvidenciaSp5" ).html( `${Detalle.length}` )
        }
        // SI LA EVALUACION LOCAL ES APROBADA
        else
        {
            console.warn( "evaluacion local APROBADA" )
            // SI LA EVALUACION CORPORATIVA ES APROBADA


            //alert('entrando aqui en ROL_EVALUADORLOCAL_AC linea 667 xxx == '+SEStatusEvaluacionCorporativaId); //fnLimpiarBloquearTextAreaSp5( "aprobar" )

            if ( SEStatusEvaluacionCorporativaId == 1 ) //antes estaba igualada a 3 cambiado por andy 30 mayo 2021
            {
               //alert('entrando aqui en ROL_EVALUADORLOCAL_AC linea 671 yyy == '+SEStatusEvaluacionLocalId); //fnLimpiarBloquearTextAreaSp5( "aprobar" )
                //$( `#aprobarEvidenciaSp5` ).attr('disabled', false );
                console.warn( "EVALUACION CORPORATIVA PENDIENTE" )
                $( `#aprobarEvidenciaSp5` ).prop( 'checked', true )
                $( `#observarEvidenciaSp5` ).prop( 'checked', false )
            }
            // SI LA EVALUACION CORPORATIVA ES OBSERVADA
            else if ( SEStatusEvaluacionCorporativaId == 2 )
            {
                console.warn( "EVALUACION CORPORATIVA OBSERVADA" )
                $( `#aprobarEvidenciaSp5` ).prop( 'checked', false )
                $( `#observarEvidenciaSp5` ).prop( 'checked', true )
                $( "#observacionEvidenciaSp5" ).val( DetalleEvaluacionCorporativa )
                $( "#totalCaracteresObservacionEvidenciaSp5" ).html( `${DetalleEvaluacionCorporativa.length}` )
            }
            // SI LA EVALUACION CORPORATIVA ES PENDIENTE
            else
            {
                console.warn( "EVALUACION CORPORATIVA APROBADA" )
                $( `#aprobarEvidenciaSp5` ).prop( 'checked', true )
                $( `#observarEvidenciaSp5` ).prop( 'checked', false )
            }

        }
    }

    // SI ES UN USUARIO CON EL ROL "ROL_RESPONSABLEASIGNADO"
    else
    {
        if(SEStatusEvaluacionCorporativaId === 1)
        {
            // si la evaluacion local es aprobada
            if ( SEStatusEvaluacionLocalId == 3 )
            {
                console.warn( "evaluacion local aprobada" )
                $( `#aprobarEvidenciaSp5` ).prop( 'checked', true )
                $( `#observarEvidenciaSp5` ).prop( 'checked', false )
            }
            // si la evalaucion local es observada
            else if ( SEStatusEvaluacionLocalId == 2 )
            {
                console.warn( "evaluacion local observada" )
                $( `#aprobarEvidenciaSp5` ).prop( 'checked', false )
                $( `#observarEvidenciaSp5` ).prop( 'checked', true )
                $( "#observacionEvidenciaSp5" ).val( Detalle )
                $( "#totalCaracteresObservacionEvidenciaSp5" ).html( `${Detalle.length}` )
                //$("#btnGuardarEvaluacionSp5").css("display","none")
            }
            // si la observacion local esta pendiente
            else
            {
                console.warn( "evaluacion local pendiente" )
                $( `#aprobarEvidenciaSp5` ).prop( 'checked', false )
                $( `#observarEvidenciaSp5` ).prop( 'checked', false )
            }
        }
        else
        {
            // alert("tiene evaluacion coorporativa")
            // si la evaluacion corporativa es aprobada
            if ( SEStatusEvaluacionCorporativaId == 3 )
            {
                $( `#aprobarEvidenciaSp5` ).prop( 'checked', true )
                $( `#observarEvidenciaSp5` ).prop( 'checked', false )
                console.warn( "evaluacion corporativa aprobada" )
            }
            // si la evaluacion corporativa es observada
            else if ( SEStatusEvaluacionCorporativaId == 2 )
            {
                $( `#aprobarEvidenciaSp5` ).prop( 'checked', false )
                $( `#observarEvidenciaSp5` ).prop( 'checked', true )
                $( "#observacionEvidenciaSp5" ).val( DetalleEvaluacionCorporativa )
                $( "#totalCaracteresObservacionEvidenciaSp5" ).html( `${DetalleEvaluacionCorporativa.length}` )
                console.warn( "evaluacion corporativa observada" )
            }
            // si la observacion corporativa esta pendiente
            else
            {
                console.warn( "evaluacion corporativa pendiente" )
                $( `#aprobarEvidenciaSp5` ).prop( 'checked', false )
                $( `#observarEvidenciaSp5` ).prop( 'checked', false )
                $( "#aprobarEvidenciaSp5" ).attr( 'disabled', false )
                $( "#observarEvidenciaSp5" ).attr( 'disabled', false )
                //$( "#btnGuardarEvaluacionSp5" ).css( "display", "block" )
            }
        }
    }

    // MOSTRAMOS MODAL VER ACR
    $( '#modalEvaluarEvidenciaSp5' ).modal( 'show' ).addClass( 'fade' )

}
//-------------------------------------   END    fnVerModalEvaluarEvidencia() -------------------------------------


//-------------------------------------  START   fnDownloadEvidenciaSp5() -------------------------------------
/**
 * [fnDownloadEvidenciaSp5 descargamos el archivo adjunto.]
 * @param  {[type]} AdjuntoId [Id del adjunto a descargar de la tabla SE_Evidencias_Adjuntos]
 * @return {[type]}           [description]
 */
var fnDownloadEvidenciaSp5 = function ( AdjuntoId )
{
    //console.warn("en fnDownloadEvidenciaSp5 AdjuntoId -> ",AdjuntoId)
    showLoading();

    var url = apiurlAuditoria + "/api/Get-SeguimientosAC-All?code=" + GetSeguimientosACAll + "&httpmethod=getEvidencia&Id=" + AdjuntoId;
    // console.log("URL",url )

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


    $.ajax( settings ).done( function ( response )
        {
            // console.info("response -> ",response)

            $( "#descargarAdjuntoEvidenciaSP5" ).html( `
            <a download="${response.Name}" class="adjunto" href="${response.Adjunto}"><button id="download_" class="btn btn-success btn-show-alert">Descargar</button></a>
        ` )

            $( '#download_' ).trigger( 'click' );
        } )
        .fail( function ( jqXHR, textStatus, errorThrown )
        {
            console.warn( "fail se ha producido un error..." )
        } )
        .always( function ( jqXHR, textStatus, errorThrown )
        {
            // console.info("ha terminado la peticion jqXHR -> ",jqXHR, textStatus, errorThrown)
            hideLoading();
        } )

}
//-------------------------------------   END    fnDownloadEvidenciaSp5() -------------------------------------


//-------------------------------------  START   fnLimpiarBloquearTextAreaSp5() -------------------------------------
/**
 * [fnLimpiarBloquearTextAreaSp5 acciones a realizar al hacer click en aprobar u observar una evidencia]
 * @param  {[type]} Accion [aprobar u observar una accion]
 * @return {[type]}        [description]
 */
var fnLimpiarBloquearTextAreaSp5 = function ( Accion )
{

    if ( Accion == "aprobar" )
    {
        // alert('aprobar = '+Accion);
        $( "#observacionEvidenciaSp5" ).val( '' )
        $( "#observacionEvidenciaSp5" ).attr( 'disabled', true )
        $( "#observacionEvidenciaSp5" ).css( 'background-color', '#efefef' )
        $( "#totalCaracteresObservacionEvidenciaSp5" ).html( `0` )

        $( `#observarEvidenciaSp5` ).attr( 'disabled', false );

        $( `#observarEvidenciaSp5` ).prop( 'checked', false );
    }
    else
    {
        // alert('observar = '+Accion);
        $( "#observacionEvidenciaSp5" ).val( '' )
        $( "#observacionEvidenciaSp5" ).attr( 'disabled', false )
        $( "#observacionEvidenciaSp5" ).css( 'background-color', '#fff' )
        $( "#observacionEvidenciaSp5" ).focus();
        $( `#aprobarEvidenciaSp5` ).prop( 'checked', false );
    }
}
//-------------------------------------   END    fnLimpiarBloquearTextAreaSp5() -------------------------------------


//-------------------------------------  START   fnContarCaracteresSp5() -------------------------------------
/**
 * [fnContarCaracteresTextAreaSp5 permitiremos solo ]
 * @param  {[obj]} textarea  [textarea]
 * @return {[type]}          [description]
 */
var fnContarCaracteresTextAreaSp5 = function ( textarea )
{
    // console.warn("textarea",textarea.value.length)
    if ( textarea.value.length <= 500 )
    {
        $( "#totalCaracteresObservacionEvidenciaSp5" ).html( `${textarea.value.length}` )
    }
    else
    {
        textarea.value = textarea.value.substring( 0, 500 ); //textarea.value.length - 1
        $( "#observacionEvidenciaSp5" ).val( textarea.value )
    }

}
//-------------------------------------   END    fnContarCaracteresSp5() -------------------------------------


//-------------------------------------   END    fnEvaluarEvidenciaSp5() -------------------------------------
var bodyEvaluarEvidencias = new classEvaluarEvidencia()
var fnEvaluarEvidenciaSp5 = function ()
{
    let aprobar     = $( `#aprobarEvidenciaSp5` ).prop( 'checked' )
    let observar    = $( `#observarEvidenciaSp5` ).prop( 'checked' )
    let observacion = $( `#observacionEvidenciaSp5` ).val()

    if ( ( aprobar ) || ( observar && observacion.length >= 5 ) )
    {
        // console.log("enviaremos Evidencia ",aprobar,observar,observacion,observacion.length)


        // AGREGOS ITEMS AL OBJETO A ENVIAR
        bodyEvaluarEvidencias.SEStatusEvidenciasId   = ( aprobar ) ? 3 : 2
        bodyEvaluarEvidencias.DescriptionObservacion = observacion

        // console.warn("bodyEvaluarEvidencias",bodyEvaluarEvidencias)

        // OCULTAMOS MODAL EVALUAR
        $( '#modalEvaluarEvidenciaSp5' ).modal( 'hide' ).removeClass( 'fade' )

        // LEVANTAMOS MODAL CONFIRMAR
        $( '#modalConfirmarEvaluarEvidenciaSp5' ).modal( 'show' ).addClass( 'fade' )
    }
    else
    {
        // console.error("error faltan datos...")
        let msj = ( aprobar == false && observar == false ) ? "Debes aprobar u observar la evidencia." : "Debes ingresar al menos 5 carácteres en la observación."

        $( "#subTituloErrorSESp5" ).html( '<b> No Puedes Evaluar </b>' )
        $( "#mensajeErrorSESp5" ).html( `${msj}` )
        $( '#modalMsgErrorSESp5' ).modal( 'show' ).addClass( 'fade' )
    }

}
//-------------------------------------   END    fnEvaluarEvidenciaSp5() -------------------------------------


//-------------------------------------   END    fnEvaluarEvidenciaSp5() -------------------------------------
/**
 * [fnEnviarEvaluacionEvidenciaSp5 ENVIAMOS LA EVALUACION DE UNA EVIDENCIA]
 * @return {[type]} [description]
 */
var fnEnviarEvaluacionEvidenciaSp5 = function ()
{
    // OCULTAR MODAL
    $( '#modalConfirmarEvaluarEvidenciaSp5' ).modal( 'hide' ).removeClass( 'fade' );

    showLoading();
    //PostSeguimientosACAll
    let url = apiurlAuditoria + "/api/Post-SeguimientoAC-All?code=" + PostSeguimientosACAll + "&httpmethod=EvaluarEvidencia";

    // console.log("URL -> ",url )

    var headers = {
        "apikey": constantes.apiKey,
        "Content-Type": "application/json",
    }


    let settings = {
        "url": url,
        "method": "POST",
        "timeout": 0,
        "crossDomain": true,
        "dataType": "json",
        "headers": headers,
        "data": JSON.stringify( bodyEvaluarEvidencias )
    };

    console.log( "settings -> ", settings )
    $.ajax(
        {
            method: 'POST',
            url: url,
            headers: headers,
            data: JSON.stringify( bodyEvaluarEvidencias ),
            crossDomain: true,
            dataType: "json",
        } )
        .done( function ( response )
        {
            // console.warn("*** response ***",response);
            if ( response.Id > 0 )
            {
                // MOSTRAR MODAL EXITO
                $( '#modalExitoEvaluarEvidenciaSp5' ).modal( 'show' ).addClass( 'fade' );
                fnCargarSeguimientosSP5()
            }
        } )
        .fail( function ( jqXHR, textStatus, errorThrown )
        {
            console.error( jqXHR, textStatus, errorThrown )
        } )
        .always( function ( jqXHR, textStatus, errorThrown )
        {
            // console.log("always", jqXHR, textStatus, errorThrown)
            // ocultamos el loading
            hideLoading();

        } );


}
//-------------------------------------   END    fnEvaluarEvidenciaSp5() -------------------------------------


//-------------------------------------  START   fnVerModalReprogramarEvidencia() -------------------------------------
var objReprogramacion = []
var fnVerModalReprogramarEvidencia = function ( Id )
{
    //alert("Reprogramar "+Id)
    // console.warn("AccionId -> ",Id)
    let accion = seguimiento.getAccionById( Id )
    console.warn( "accion -> ", accion, "seguimiento -> ", seguimiento )

    // inicializamos el objeto de la reprogramacion.
    objReprogramacion = new classReprogramarEvidencia()
    objReprogramacion.HAPlanAccionesId = Id
    objReprogramacion.FechaAnterior = accion.Fecha

    // console.warn("objReprogramacion -> ",objReprogramacion)

    // OCULTAR MODAL VERPAC
    $( '#modalVerPACSp5' ).modal( 'hide' ).removeClass( 'fade' );

    // COLOCAR TITULO A LA MODAL
    $( '#titleModalReprogramacionEvidenciaSp5' ).html( `PAC - ${seguimiento.GetCodeHallazgo()}` )

    // DEFINAR CAUSA
    $( "#causaReprogramacionSp5" ).html( `${accion.Respuesta}` )

    // DEFINAR ACCION
    $( "#accionReprogramacionSp5" ).html( `${accion.Accion}` )

    // DEFINIR FECHA ORIGINAL
    $( "#fechaOriginalSp5" ).html( `${accion.FechaFormato}` )

    // DEFINIR TOTAL DE REPROGRAMACIONES
    let totalReprogramaciones = ( accion.Reprogramaciones.length < 10 ) ?
        `0${accion.Reprogramaciones.length}` :
        accion.Reprogramaciones.length
    $( "#numeroReprogramacionesSp5" ).html( `${totalReprogramaciones}` )

    // pintar reprogramaciones
    fnListarReprogramacionesSp5( accion.Reprogramaciones )

    // LIMPIAR MOTIVO
    $( "#motivoReprogramacionSp5" ).val( '' )
    // LIMPIAR ADJUNTAR ARCHIVOS
    $( "#btnAdjuntarReprogramacionSp5" ).html( 'Adjuntar Documento' )
    // LIMPIAR NUEVA FECHA
    $( "#txtNuevaFechaReprogramacionSp5" ).val( '' )


    // VER MODAL REPROGRAMAR EVIDENCIA
    $( '#modalReprogramacionEvidenciaSp5' ).modal( 'show' ).addClass( 'fade' );

}
//-------------------------------------   END    fnVerModalReprogramarEvidencia() -------------------------------------


//-------------------------------------  START   fnListarReprogramacionesSp5() -------------------------------------
var fnListarReprogramacionesSp5 = function ( Reprogramaciones )
{
    // console.warn("Reprogramaciones -> ",Reprogramaciones)

    // limpiar listo previo de reprogramaciones
    $( "#listadoReprogramacionesSp5" ).html( '' )

    // pintar reprogramaciones
    Reprogramaciones.forEach( function ( item )
    {
        // color de fondo del boton VER
        let backgroundVer = ( item.Name != null ) ?
            'background-color: #34559c !important;' :
            'background-color: #b1b1b1 !important;'

        let disabledVer = ( item.Name != null ) ?
            '' :
            'disabled'

        // Color de fonde del boton Eliminar
        let backgroundEliminar = 'background-color: #ff6767 !important;'

        $( "#listadoReprogramacionesSp5" ).append( `
             <div class="tablet-option__body row clear--row">
                <div class="col-9 clear--col d-flex">
                    <div class="d-flex justify-content-start align-items-center w-1" style="font-size:12px;">
                        <p>${item.FechaCambio}</p>
                    </div>
                    <div class="d-flex justify-content-start align-items-center w-1 ml-3" style="font-size:12px;">
                        <p>${item.FechaAnterior}</p>
                    </div>
                    <div class="d-flex justify-content-start align-items-center w-1 ml-3" style="font-size:12px;">
                        <p>${item.FechaNueva}</p>
                    </div>
                    <div class="d-flex justify-content-start align-items-center col pl-3 ml-1" style="font-size:12px;">
                        <p>${item.Motivo}</p>
                    </div>
                </div>

                <div class="col-3 clear--col d-flex">
                    <div class="tablet-option__box ">
                        <button type='button' ${disabledVer} onmouseup="fnDescargarAdjuntoReprogramacion('${item.Id}')" class='btn-circle btn_read border-0'  style='${backgroundVer} cursor:pointer !important;' id='btnVerAdjuntoReprogramacion_${item.Id}' reprogramacionid='${item.Id}'  title ='Ver Adjunto Reprogramación'  >
                                <img src='./images/newsistema/iconos/ojo1.svg' style = 'cursor:pointer !important;'>
                        </button>
                    </div>
                    <div class="tablet-option__box ">
                        <button type='button' onmouseup="fnDeleteReprogramacion(${item.Id})" class='btn-circle btn_read border-0'  style='${backgroundEliminar} cursor:pointer !important;' id='btnEliminarReprogramacion_${item.Id}' reprogramacionid='${item.Id}'  title ='Eliminar Reprogramación'  >
                                <img src='./images/newsistema/iconos/X.svg' style = 'cursor:pointer !important;'>
                        </button>
                    </div>
                </div>

            </div>
        ` )
    } )
}
//-------------------------------------   END    fnListarReprogramacionesSp5() -------------------------------------


//-------------------------------------  START   fnAdjuntarReprogramacionSp5() -------------------------------------
var fnAdjuntarReprogramacionSp5 = function ()
{
    // console.log("adjuntaremos archivo...")
    $( "#adjuntoReprogramaciosSp5" ).trigger( "click" )
}
//-------------------------------------   END    fnAdjuntarReprogramacionSp5() -------------------------------------


//-------------------------------------  START   fnGuardarAdjuntoReprogramacionSp5() -------------------------------------
var fnGuardarAdjuntoReprogramacionSp5 = function ()
{
    // console.log( "guardaremos archivo en bd..." )
    let base64Adjunto = "";
    let fileInput = document.getElementById( 'adjuntoReprogramaciosSp5' );
    let filePath = fileInput.value;

    // console.warn( "fileInput ", fileInput.files[ 0 ].size )

    // validamos que el peso maximo sean 10 mb
    if ( fileInput.files[ 0 ].size <= MAXIMO_PESO_ARCHIVOS )
    {
        let allowedExtensions = /(.pdf)$/i;
        // validamos que sea solo archivos .pdf
        if ( allowedExtensions.exec( filePath ) )
        {
            let esc = escape( filePath )
            let name = esc.split( "%5C" );
            //let filenamme = name[2];
            let filenamme = name[ 2 ].replace( "%20", "" )
            // eliminar espacios en blanco del nombre del archivo.
            for ( let i = 0; i < 15; i++ )
            {
                filenamme = filenamme.replace( "%20", "" )
            }
            // imprimo el nombre
            $( `#btnAdjuntarReprogramacionSp5` ).html( filenamme )
            // guardo el nombre en el objeto reprogramacion
            objReprogramacion.Name = filenamme

            let adjunto = document.getElementById( "adjuntoReprogramaciosSp5" ).files[ 0 ];

            toBase64SeguimientoSp5( adjunto ).then( data =>
            {
                //base64Adjunto =   getResultSeguimientoSp5(data);
                //console.log("FILE :", data);
                objReprogramacion.Adjunto = data

                console.warn( "body -> ", objReprogramacion )
            } )
        }
        else
        {
            console.error( "ingrese solo archivos pdf ", fileInput.files[ 0 ].size )
            $( "#subTituloErrorSESp5" ).html( '<b> Formato no Válido. </b>' )
            $( "#mensajeErrorSESp5" ).html( `Solo se permiten archivos .pdf` )
            $( '#modalMsgErrorSESp5' ).modal( 'show' ).addClass( 'fade' )
        }


    }
    else
    {
        console.error( "archivo muy grande maximo 10 MB ", fileInput.files[ 0 ].size )
        $( "#subTituloErrorSESp5" ).html( '<b> Archivo muy pesado. </b>' )
        $( "#mensajeErrorSESp5" ).html( `Tamaño máximo permitido 10MB` )
        $( '#modalMsgErrorSESp5' ).modal( 'show' ).addClass( 'fade' )
    }
}
//-------------------------------------   END    fnGuardarAdjuntoReprogramacionSp5() -------------------------------------


//-------------------------------------  START   fnAgregarReprogramacionSp5() -------------------------------------
var fnAgregarReprogramacionSp5 = function ()
{

    objReprogramacion.Motivo = $( "#motivoReprogramacionSp5" ).val()
    //fechaMin.setDate(fechaMin.getDate() - dias);
    objReprogramacion.FechaNueva = $( "#txtNuevaFechaReprogramacionSp5" ).val()
    console.warn( "objReprogramacion.FechaNueva -> ", objReprogramacion.FechaNueva )
    // OBTENER NUEVA FECHA PARA LA REPROGRAMACION
    if ( $( "#txtNuevaFechaReprogramacionSp5" ).val() != '' )
    {
        let day = $( "#txtNuevaFechaReprogramacionSp5" ).val().split( "/" )
        objReprogramacion.FechaNueva = day[ 2 ] + "-" + day[ 1 ] + "-" + day[ 0 ]
    }

    // OBTENER MOTIVO PARA LA REPROGRAMACION
    objReprogramacion.Motivo = $( "#motivoReprogramacionSp5" ).val()

    console.warn( "objReprogramacion -> ", objReprogramacion )

    if ( objReprogramacion.Motivo != "" && objReprogramacion.FechaNueva != "" )
    {
        // OCULTAMOS MODAL REPROGRAMACION
        $( '#modalReprogramacionEvidenciaSp5' ).modal( 'hide' ).removeClass( 'fade' );
        // MOSTRAMOS MODAL CONFIRMAR
        $( '#modalConfirmarReprogramacionSp5' ).modal( 'show' ).addClass( 'fade' );
    }
    else
    {
        $( "#subTituloErrorSESp5" ).html( '<b> Faltan datos. </b>' )
        $( "#mensajeErrorSESp5" ).html( `Debe Ingresar Motivo y Nueva Fecha` )
        $( '#modalMsgErrorSESp5' ).modal( 'show' ).addClass( 'fade' )
    }
}
//-------------------------------------   END    fnAgregarReprogramacionSp5() -------------------------------------


//-------------------------------------  START   fnEnviarReprogramacionSp5() -------------------------------------
var fnEnviarReprogramacionSp5 = function ()
{
    console.warn( "enviar reprogramacion -> ", objReprogramacion )
    // MOSTRAMOS LOADING
    showLoading()
    // OCULTAMOS MODAL CONFIRMAR REPROGRAMACION
    $( '#modalConfirmarReprogramacionSp5' ).modal( 'hide' ).removeClass( 'fade' );

    let url = apiurlAuditoria + "/api/Post-SeguimientoAC-All?code=" + PostSeguimientosACAll + "&httpmethod=reprogramacionPlan";

    console.log( "URL -> ", url )
    console.log( "objReprogramacion -> ", objReprogramacion )

    var headers = {
        "apikey": constantes.apiKey,
        "Content-Type": "application/json",
    }


    let settings = {
        "url": url,
        "method": "POST",
        "timeout": 0,
        "crossDomain": true,
        "dataType": "json",
        "headers": headers,
        "data": JSON.stringify( objReprogramacion )
    };

    $.ajax( settings ).done( function ( response )
        {
            // console.warn("*** response ***",response);
            if ( response.Id > 0 )
            {
                // MOSTRAR MODAL EXITO
                $( '#modalExitoReprogramacionSp5' ).modal( 'show' ).addClass( 'fade' );
                fnCargarSeguimientosSP5()
            }
            else
            {
                alert( "error" )
            }
        } )
        .fail( function ( jqXHR, textStatus, errorThrown )
        {
            console.error( jqXHR, textStatus, errorThrown )
        } )
        .always( function ( jqXHR, textStatus, errorThrown )
        {
            console.log( "always", jqXHR, textStatus, errorThrown )
            // ocultamos el loading
            hideLoading();

        } );


}
//-------------------------------------   END    fnEnviarReprogramacionSp5() -------------------------------------



//-------------------------------------  START   fnDescargarAdjuntoReprogramacion() -------------------------------------
var fnDescargarAdjuntoReprogramacion = function ( Id )
{
    console.warn( "Id -> ", Id )

    showLoading();

    var url = apiurlAuditoria + "/api/Get-SeguimientosAC-All?code=" + GetSeguimientosACAll + "&httpmethod=getAdjuntoReprogramacion&Id=" + Id;
    console.log( "URL", url )

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


    $.ajax( settings ).done( function ( response )
        {
            console.info( "response -> ", response )
            if ( response.Id > 0 )
            {
                console.log( "mostrar pdf" )
                let base64 = response.Adjunto.split( ',' );

                let contentType = "application/pdf",
                    blob = b64toBlob( base64[ 1 ], contentType ),
                    blobUrl = URL.createObjectURL( blob );

                // console.warn("blob -> ",blob)
                // console.warn("blobUrl -> ",blobUrl)

                let pdfWindow = window.open( "pdf" )
                pdfWindow.document.write( "<iframe width='100%' height='100%' src='" + blobUrl + "'></iframe>" )

            }

        } )
        .fail( function ( jqXHR, textStatus, errorThrown )
        {
            console.warn( "fail se ha producido un error..." )
        } )
        .always( function ( jqXHR, textStatus, errorThrown )
        {
            console.info( "ha terminado la peticion jqXHR -> ", jqXHR, textStatus, errorThrown )
            hideLoading();
        } )
}
//-------------------------------------   END    fnDescargarAdjuntoReprogramacion() -------------------------------------

//-------------------------------------   START  fnDeleteReprogramacion() -------------------------------------
let bodyEliminarReprogramacionSp5 = []
var fnDeleteReprogramacion = function ( Id )
{
    //alert("Eliminar Reprogramación "+Id)
    // OCULTAR MODAL
    $( '#modalReprogramacionEvidenciaSp5' ).modal( 'hide' ).removeClass( 'fade' );

    bodyEliminarReprogramacionSp5 = new classEliminarReprogramacion();

    bodyEliminarReprogramacionSp5.Id = Id
    bodyEliminarReprogramacionSp5.Created_By = getCookie( "vtas_id_hash" + sessionStorage.tabVisitasa )

    // MOSTRAR MODAL
    $( '#modalConfirmarEliminarReprogramacionSp5' ).modal( 'show' ).addClass( 'fade' )

}
//-------------------------------------    END   fnDeleteReprogramacion() -------------------------------------


//-------------------------------------   START  fnEnviarEliminarReprogramacionSp5() -------------------------------------
var fnEnviarEliminarReprogramacionSp5 = function ()
{
    // OCULTAR MODAL
    $( '#modalConfirmarEliminarReprogramacionSp5' ).modal( 'hide' ).removeClass( 'fade' );

    showLoading()

    console.warn( "bodyEliminarReprogramacionSp5 -> ", bodyEliminarReprogramacionSp5 )
    //https://550m44ud1tmg7454-audit-dev.azurewebsites.net/api/
    let url = apiurlAuditoria + "/api/Post-SeguimientoAC-All?code=" + PostSeguimientosACAll + "&httpmethod=deleteReprogramacion";

    console.log( "URL -> ", url )

    var headers = {
        "apikey": constantes.apiKey,
        "Content-Type": "application/json",
    }

    let settings = {
        "url": url,
        "method": "POST",
        "timeout": 0,
        "crossDomain": true,
        "dataType": "json",
        "headers": headers,
        "data": JSON.stringify( bodyEliminarReprogramacionSp5 )
    };

    $.ajax( settings ).done( function ( response )
        {
            // console.warn("*** response ***",response);
            if ( response.Resultado > 0 )
            {
                // MOSTRAR MODAL
                $( '#modalExitoEliminarReprogramacionSp5' ).modal( 'show' ).addClass( 'fade' )
                fnCargarSeguimientosSP5()
            }
            else
            {
                alert( "error" )
            }
        } )
        .fail( function ( jqXHR, textStatus, errorThrown )
        {
            console.error( jqXHR, textStatus, errorThrown )
            alert( "error" )
        } )
        .always( function ( jqXHR, textStatus, errorThrown )
        {
            console.log( "always", jqXHR, textStatus, errorThrown )
            // ocultamos el loading
            hideLoading();

        } );

}
//-------------------------------------    END   fnEnviarEliminarReprogramacionSp5() -------------------------------------


//-------------------------------------   START    b64toBlob() -------------------------------------
/**
 * [b64toBlob convertir archivo base64 a blob]
 * @param  {string} b64Data     [cadena base64]
 * @param  {string} contentType [tipo de archivo]
 * @param  {Number} sliceSize   [description]
 * @return {[type]}             [description]
 */
var b64toBlob = function ( b64Data, contentType = "", sliceSize = 512 )
{
    const byteCharacters = atob( b64Data );

    const byteArrays = [];

    for ( let offset = 0; offset < byteCharacters.length; offset += sliceSize )
    {
        const slice = byteCharacters.slice( offset, offset + sliceSize ),
            byteNumbers = new Array( slice.length );
        for ( let i = 0; i < slice.length; i++ )
        {
            byteNumbers[ i ] = slice.charCodeAt( i );
        }
        const byteArray = new Uint8Array( byteNumbers );

        byteArrays.push( byteArray );
    }

    const blob = new Blob( byteArrays,
    {
        type: contentType
    } );
    return blob;
}
//-------------------------------------   END    b64toBlob() -------------------------------------



/**
 * [convertir archivo a base64]
 * @param  {[type]} file [description]
 * @return {[type]}      [description]
 */
var getResultSeguimientoSp5 = function ( data )
{
    var result = data.split( ',' );
    return result[ 1 ];
}
const toBase64SeguimientoSp5 = file => new Promise( ( resolve, reject ) =>
{
    const reader = new FileReader();
    reader.readAsDataURL( file );
    reader.onload = () => resolve( reader.result );
    reader.onerror = error => reject( error );
} );