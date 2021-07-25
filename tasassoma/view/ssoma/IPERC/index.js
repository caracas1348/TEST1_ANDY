//let FormArray_op = [];
//let IdInspeccionEdit_op = "";
//let TitleInspeccionEdit_op = "";
//let fechaInicio = '';
//let fechaFin = '';
//let Checklist_op = [];
//let Grupo_op = [];
//let Subgrupo_op = [];
let ipercSelected = {};
let accion = "";
let visualizacion = "";
let subprocesos = [];
let pericon = [];
let maquinasEquipos = [];
//let areas = [];
//let zonas = [];
//let base64_trainning="";
//let adjuntoBD = {};
let MayorIPERC = 0;
let dataAllIPERC = [];
//let id_location_sap_selected = 0;

let activities_array = [];
let gerencia_array = [];
let puestos_array = [];
let array_envio = [];
let observacionactual = 0;
let curEmail = "";
let curStatus = 0;
let epp_array = [];

let indexEventEdit = 0; 
let componentEventEdit = "";

let indexEvalEdit = 0; 
let indexEvalEventEdit = 0; 
let indexEvalDangerEdit = 0; 
let componentEvalEdit = "";

let indexControlEdit = 0; 
let indexControlEventEdit = 0; 
let indexControlDangerEdit = 0; 
let componentControlEdit = "";

var cbo_gerencia = null;
var cbo_area_iperc = null;
var cbo_puesto_trabajo = null;
var cbo_proceso = null;
var cbo_subproceso = null;
var cbo_alcance = null;
var cbo_actividad = null;
var cbo_actividad_2 = null;
var cbo_tipoactividad = null;
var cbo_frecuencia = null;
var cbo_genero = null;
let cbo_maq_equip = null;
let cbo_evento = null;
let cbo_peligro = null;
let cbo_riesgo = null;
let cbo_riesgo_2 = null;
var cbo_probabilidad = null;
var cbo_probabilidad_2 = null;
var cbo_epp = null;
var cbo_epp_2 = null;
// Cargar Filtros
function fnCargarFiltrosIPERC() {
    //fnCargarReportantes();
    
    //fnLlenarCombosFiltros('Selec-TipoObservacion-Filtro', '/api/Get-Tipo-Observacion?code=7lkZkvN9Q3JdTbNhUrbtk4wfOpZ9JQQTLqKtTgcqSd48wyTlns8mug==&httpmethod=objectlist');

    //fnLlenarCombosFiltros('Selec-Sede-Filtro', '/api/Get-Sede?code=d0eEG9qHF01JbC9oaU0iajLG4DPLmVRDxO0E42JEuTsiwd7klp0tkw==&httpmethod=objectlist');

    //fnLlenarCombosFiltros('Selec-Embarcacion-Filtro', '/api/Get-Embarcacion?code=aUy0KagXZ3EaaNkPH8kHoZgeibTvhykOFvVqMp9OSmRFnBtGGlmY4Q==&httpmethod=objectlist');
    getToken();
    initIPERC();
}

/*function fnCargarReportantes()
{
    $('#Selec-Reportante-Filtro').html('');
    $('#Selec-Reportante-Filtro').append(`<option value="" selected>Todos</option>`)

    var apiKeyx = "r$3#23516ewew5";
    var metodoAjax =  "GET";
    var url2 = apiUrlssoma+"/api/Get-Reportante?code=8zqFXo16PvhLBx7wa3R9yGPlvaOPeGjIfgPzaR7qEaVEYu8ysPkbcQ==&httpmethod=objectlist";

    var headers = {
        "apikey":apiKeyx
    }

    $.ajax({
        method: metodoAjax,
        url:  url2,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function( data)
    {

        var report = $('#Selec-Reportante-Filtro');

        data.map(function(item)
        {
            report.append(`<option value="${item.Id}">${item.Description}</option>`);
        });
    })  .fail(function( jqXHR, textStatus, errorThrown) {

    })
        .always(function(data , textStatus, jqXHR ) {
            // alert( "complete" );
        });


}*/

/*function fnLlenarCombosFiltros(combo, url) {
    $.ajax({
        method: "GET",
        url: `${apiUrlssoma}${url}`,
        headers:{ "apikey":constantes.apiKey },
        crossDomain: true,
        dataType: "json",
    }).done(function (response) {
        $('#'+combo).html('');
        $('#'+combo).append(`<option value="0" selected>Todos</option>`);
        response.forEach((Item) => {
            description = toCapitalize(Item.Description);
            $('#'+combo).append(`<option value="${Item.Id}">${description}</option>`);
        });
    });
}*/

function alertfinalizarIPERC(){

    if(cbo_gerencia.value=="0" || cbo_area_iperc.value=="0" || cbo_proceso.value =="0" || cbo_alcance.value == "" ){
        $("#modal-mantenimiento-observacion").removeClass("fade").modal('hide');
        $("#modalAviso").modal("show").addClass("fade");
        $("#titleMessageAviso").text("Aviso");
        $("#messageAviso").text("Datos incompletos");
        return;
    }
    if(activities_array==""){
        $("#modal-mantenimiento-observacion").removeClass("fade").modal('hide');
        $("#modalAviso").modal("show").addClass("fade");
        $("#titleMessageAviso").text("Aviso");
        $("#messageAviso").text("Debe ingresarse al menos una actividad.");
        return;
    }else{
        let vacios = 0;
        activities_array.map(function(Actividad){
            if(Actividad.active==1){
                if(Actividad.descripcion.trim() == ""){
                    vacios++;
                }                
            }

        })

        if(vacios>0){
            $("#modal-mantenimiento-observacion").removeClass("fade").modal('hide');
            $("#modalAviso").modal("show").addClass("fade");
            $("#titleMessageAviso").text("Aviso");
            $("#messageAviso").text("No puede ingresar una actividad vacia.");
            return;
        }
    }

    $("#modal-mantenimiento-observacion").removeClass("fade").modal("hide");
    $("#modalShowAlertConfirm").modal("show").addClass("fade");
    $("#titleConfirm").html('Se finalizará la creación del IPERC');
    
    accion = "finalizar";
}

function buscarSubprocesos(proceso,subproceso=0){
    console.log('busca subprocesos',proceso,subproceso)
    $('#ul-Subproceso').html('');
    $('#ul-Subproceso').append(`<li class="mdc-list-item mdc-list-item--selected" data-value="0" aria-selected="true" ">
                        <span class="mdc-list-item__ripple"></span>
                    </li>`);

    subprocesos.map(function(Item){
        if (Item.Proceso == proceso)
        {
            description = toCapitalize(Item.Description)
            $(`#ul-Subproceso`).append(`<li class="mdc-list-item" data-value="${Item.Id}" tabindex="-1"">
                                    <span class="mdc-list-item__ripple"></span>
                                    <span class="mdc-list-item__text">${description}</span>
                                </li>`);
        }
    });
    if(cbo_subproceso!=null){
        cbo_subproceso.destroy();
    }
    cbo_subproceso = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-subproceso'));
    if(subproceso>0){
        cbo_subproceso.value = subproceso.toString();  
    }

}

function buscarPuestoTrabajo(sede,puesto=null){
    console.log('busca puestotrabajo',sede,puesto)


    $('.cbo-gerencia').addClass('mdc-select');

    $('#ul-Puesto').html('');
    $('#ul-Puesto').append(`<li class="mdc-list-item mdc-list-item--selected" data-value="0" aria-selected="true" ">
                        <span class="mdc-list-item__ripple"></span>
                    </li>`);

    $.ajax({
        method: "GET",
        url: `${apiUrlssoma}/api/Get-Ws-Sap?code=nqjY35FLaXuzvRfAzbgUT4qYN9DeYR7fU2afqcEWUk8V05zKkeEEiA==&httpmethod=listjobs&sede_code=${sede}`,
        headers:{ "apikey":constantes.apiKey },
        crossDomain: true,
        dataType: "json",
    }).done(function (response) {
        puestos_array = response;
        response.forEach((Item) => {
            description = toCapitalize(Item.descripcion)
            //onclick="fnValidaEmbarcacion(${Item.Id}, ${Item.UnidadNegocioId}, ${Item.UnidadNegocioSubId}, ${Item.id_location_sap})"
            $(`#ul-Puesto`).append(`<li class="mdc-list-item" data-value="${Item.codigo}" tabindex="-1" >
                                    <span class="mdc-list-item__ripple"></span>
                                    <span class="mdc-list-item__text">${description}</span>
                                </li>`);

            //$("#Selec-Area-Filtro").append(`<option value="${Item.codigo}" >${description}</option>`);
        });
        if(cbo_puesto_trabajo!=null){
            cbo_puesto_trabajo.destroy();
        }
        cbo_puesto_trabajo = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-puesto'));
        cbo_puesto_trabajo.listen('MDCSelect:change', () => {
            if(visualizacion==''){
                let curPuesto = puestos_array.filter(m=>m.codigo==cbo_puesto_trabajo.value);
                console.log(curPuesto)
                let curGerencia = gerencia_array.filter(m=>m.CodeSap==curPuesto[0].codigo_gerencia);
                console.log(curGerencia)
                if(curGerencia.length>0){
                    cbo_gerencia.value = curGerencia[0].Id.toString();
                }else{
                    cbo_gerencia.value = "";
                }
            }
        });
        if(puesto!=null){
            cbo_puesto_trabajo.value = puesto.toString();  
        }
    });
$('.cbo-gerencia').addClass('mdc-select--disabled');
}

// Cargar Grid ajax
function fnCargarGridIPERC() {
    console.log('fnCargarGridIPERC');
    $('#body-tabla-list').html('');
    $('#body-tabla-loader').removeClass('d-none');
    
    let profile = getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa);

    $("#tbIPERC").empty();

    if(profile=="ROL_VALIDADORIPERC"){
        $("#tbIPERC").append(`<div class="col-md-3 text-center row">  
                                    <div class="col-md-3">ID IPERC</div>
                                    <div class="col-md-6">Puesto de Trabajo</div>
                                    <div class="col-md-3">Gerencia</div>
                                </div>

                                <div class="col-md-4 text-center row">
                                    <div class="col-md-4">Sede</div>
                                    <div class="col-md-3">Área</div>
                                    <div class="col-md-5">Proceso</div>
                                </div>

                                <div class="col-md-3 text-center row">
                                    <div class="col-md-4">Fecha Última Actualización</div>
                                    <div class="col-md-4">Vigencia de Actualización</div>
                                    <div class="col-md-4">Estado</div>
                                </div>
                                <div class="col-md-2 text-center row">  
                                    <div class="col-md-4">Evaluar</div>
                                    <div class="col-md-4">Ver</div>
                                    <div class="col-md-4">Historial</div>
                                </div>`);
    }else if(profile=="ROL_VISUALIZADORIPERC"){
        $("#tbIPERC").append(`<div class="col-md-3 text-center row">  
                                    <div class="col-md-4">ID IPERC</div>
                                    <div class="col-md-5">Puesto de Trabajo</div>
                                    <div class="col-md-3">Gerencia</div>
                                </div>

                                <div class="col-md-5 text-center row">
                                    <div class="col-md-4">Sede</div>
                                    <div class="col-md-3">Área</div>
                                    <div class="col-md-5">Proceso</div>
                                </div>

                                <div class="col-md-3 text-center row">
                                    <div class="col-md-4">Fecha Última Actualización</div>
                                    <div class="col-md-4">Vigencia de Actualización</div>
                                    <div class="col-md-4">Estado</div>
                                </div>
                                <div class="col-md-1 text-center row">  
                                    <div class="col-md-12">Ver</div>
                                </div>`);
    }else{
        $("#tbIPERC").append(`<div class="col-md-3 text-center row">  
                                    <div class="col-md-3">ID IPERC</div>
                                    <div class="col-md-6">Puesto de Trabajo</div>
                                    <div class="col-md-3">Gerencia</div>
                                </div>

                                <div class="col-md-3 text-center row">
                                    <div class="col-md-5">Área</div>
                                    <div class="col-md-7">Proceso</div>
                                </div>

                                <div class="col-md-3 text-center row">
                                    <div class="col-md-4">Fecha Última Actualización</div>
                                    <div class="col-md-4">Vigencia de Actualización</div>
                                    <div class="col-md-4">Estado</div>
                                </div>
                                <div class="col-md-3 text-center row">  
                                    <div class="col-md-2">Editar</div>
                                    <div class="col-md-2">Ver</div>
                                    <div class="col-md-5">Responsables</div>
                                    <div class="col-md-3">Historial</div>
                                </div>`);
    }

    let Selec_PuestoTrabajo_Filtro = $("#Selec-PuestoTrabajo-Filtro").val();
    let Selec_Gerencia_Filtro = $("#Selec-Gerencia-Filtro").val();
    let Selec_Area_Filtro = $("#Selec-Area-Filtro").val();
    let Selec_Proceso_Filtro = $("#Selec-Proceso-Filtro").val();
    let Selec_Estado_Filtro = $("#Selec-Estado-Filtro").val();
    console.log("valor area"+Selec_Area_Filtro)
    let filtros = '';
    //filtros += `&TipoObservacion=${Selec_PuestoTrabajo_Filtro}`
    filtros += `&Gerencia=${Selec_Gerencia_Filtro}`
    filtros += `&Area=${Selec_Area_Filtro!=""&&Selec_Area_Filtro!="0"?Selec_Area_Filtro:null}`
    filtros += `&Proceso=${Selec_Proceso_Filtro}`
    filtros += `&Alcance=0`
    filtros += `&Subproceso=0`

    if(profile=="ROL_VISUALIZADORIPERC"){
        filtros += `&Estado=7`
    }else{
        filtros += `&Estado=${Selec_Estado_Filtro}`
    }

    // if (Rango_Fechas_Filtro == undefined || Rango_Fechas_Filtro == '')
    // {
    //     filtros += `&FechaInicio=`
    //     filtros += `&FechaFin=`
    // }
    // else{
    //     splitFecha = Rango_Fechas_Filtro.split('-');
    //     let FechaInicio = splitFecha[0].trim().split('/');
    //     let FechaFin = splitFecha[1].trim().split('/');
    //     filtros += `&FechaInicio=${FechaInicio[2]}${FechaInicio[1]}${FechaInicio[0]}`
    //     filtros += `&FechaFin=${FechaFin[2]}${FechaFin[1]}${FechaFin[0]}`
    // }
    
    filtros += `&PageInicio=1&PageFin=100000`

    // '&TipoObservacion=1&FechaInicio=20201022&FechaFin=20201024'
    let headers;
    let url = `${apiUrlssoma}/api/Get-Iperc-General?code=ii4cICd6hzmjyrVKEJlDIh3VtnKT3GvkuwPCEgmzcgS79pIwA/sBZQ==&httpmethod=objectlist${filtros}`

    headers = {
        "apikey":constantes.apiKey,
    }

    //findChecklist();

    $.ajax({
        method: "GET",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function (response) {
    
        dataAllIPERC = response.Data;
        

        dataAllIPERC.forEach((Item)=>{
            var idObs = parseInt(Item.Id);
            if(idObs > MayorIPERC)
            {
                MayorIPERC = idObs;
            }
        });

        $('#pagination-container').pagination({
            dataSource: dataAllIPERC,
            pageSize: 8,
            callback: function(data, pagination) {
                var html = fnTempleteGridIPERC(data);
                $('#body-tabla-list').html(html);
            }
        });

        $('#cantidad').text(response.Total)


        // if (response.Total == 0)
        // {
        //     let storage = getStorage("vtas_rolexternalrol", "text");
        
        //     if(storage == 'ROL_REPORTANTE') {
        //         $('#cantidad').removeClass('d-none');
        //         $('#tbReportante').removeClass('d-none');
        //         $('#tbReportanteLider').addClass('d-none');
        //     }
        //     else if(storage == 'ROL_REPORTANTELIDER') {
        //         $('#cantidad').removeClass('d-none');
        //         $('#tbReportante').addClass('d-none');
        //         $('#tbReportanteLider').removeClass('d-none');
        //     }
        //     else
        //     {
        //         $('#cantidad').addClass('d-none');
        //         $('#tbReportante').addClass('d-none');
        //     }
        // }


        $('#body-tabla-loader').addClass('d-none');

        if (dataAllIPERC.length == 0)
        {
            $('#body-tabla-Vacio').removeClass('d-none');
        }
        else{
            $('#body-tabla-Vacio').addClass('d-none');
        }
        
    });

};

// Dibujar plantilla html del grid
function fnTempleteGridIPERC(data) {
    var html = '';
    let type = '- -';
    let estado = ''
    let colorLetra = ''
    let btnEditar = ''
    let style = ''
    
    let editar = ''
    let ver = ''
    let eliminar = ''

    data.forEach((Item) => {
        let fecha = moment(`${Item.created_date}`).format("DD/MM/YYYY");
        if(Item.type_id == 0){
            type = 'Programado';
        }
        if(Item.flag_confirm == 1){
            estado = 'Finalizado'
            colorLetra = "textoCorregidaCA"
            btnEditar = 'disabled'
            style = 'style="background-color: #c3c3c3 !important"';
        }else{
            estado = 'Guardado'
            colorLetra = "textoAprobadaCA"
            btnEditar = ''
            style = '';
        } 

        let editar = Item.Editar ? '' : 'disabled';
        let ver = Item.Ver ? '' : 'disabled';
        let evaluar = Item.Evaluar ? '' : 'disabled';
        let responsable = Item.Responsable ? '' : 'disabled';
        let eliminar = Item.Eliminar ? '' : 'disabled';

        var btNew = "";
        let idObs = parseInt(Item.Id);
        if( idObs == MayorIPERC && idObs > 0)
        {
            btNew = "<div  class='check-blue text-center'>Nuevo</div>"
        }
        else
        {
            btNew = "";
        }

        
        let storage = getStorage("vtas_rolexternalrol", "text");


        $('#cantidad').removeClass('d-none');
        
        let profile = getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa);

        if(profile=="ROL_VALIDADORIPERC"){
            html += `<div class="item-tabla p-2" style="font-size: 15px; display:relative;">
                        <div class="row m-0 justify-content-between align-items-center">
                        
                            <div class="col-md-3 text-center row">  
                                <div class="col-md-3">${Item.Codigo}</div>
                                <div class="col-md-6">${toCapitalize(Item.Puesto_Trabajo_Descripcion)}</div>
                                <div class="col-md-3">${ Item.Gerencia_Des==0 ? '-' : Item.Gerencia_Des }</div>
                            </div>
                            <div class="col-md-4 text-center row">  
                                <div class="col-md-4">${Item.Area_Des==0 ? '-' : toCapitalize(Item.Area_Des) }</div>
                                <div class="col-md-3">${Item.Area_Des==0 ? '-' : toCapitalize(Item.Area_Des) }</div>
                                <div class="col-md-5">${toCapitalize(Item.Proceso_Des)}</div>
                            </div>
                            
                            <div class="col-md-3 text-center row">  
                                <div class="col-md-4">${Item.Fecha_Creacion}</div>
                                <div class="col-md-4">${Item.Fecha_Vigencia?Item.Fecha_Vigencia:'--'}</div>
                                <div class="col-md-4">${toCapitalize(Item.Estado_Des)}</div>
                            </div>
                            
                            <div class="col-md-2 text-center row">
                                <div class="col-md-4">
                                    <button ${evaluar} onclick="onOpenModalIPERC(${Item.Id}, 'Evaluar', false)" class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-add m-auto bmd-btn-fab-sm__xs" style="min-width: 35px !important;min-height: 35px !important;${Item.Evaluar?'':'background-color: #9c9c9c !important;'}" >
                                        <img src="./images/newsistema/iconos/edit1.svg" alt="" class="w-50">
                                    </button>
                                </div>
                                <div class="col-md-4">
                                    <button ${ver} onclick="onOpenModalIPERC(${Item.Id}, 'Ver', true)" class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-ojo m-auto bmd-btn-fab-sm__xs" style="min-width: 35px !important;min-height: 35px !important;${Item.Ver?'':'background-color: #9c9c9c !important;'}" >
                                        <img src="./images/newsistema/iconos/ojo1.svg" alt="" class="w-50">
                                    </button>
                                </div>
                                <div class="col-md-4">
                                    <button ${eliminar} class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-history2 m-auto bmd-btn-fab-sm__xs" onclick="modalHistorialModificacion(${Item.Id}, '${Item.Codigo}')" style="min-width: 35px !important;min-height: 35px !important;${Item.Eliminar?'':'background-color: #9c9c9c !important;'}" >
                                        <img src="./images/newsistema/iconos/historyiperc.svg" alt="" class="w-50">
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>`;
        }else if(profile=="ROL_VISUALIZADORIPERC"){
            html += `<div class="item-tabla p-2" style="font-size: 15px; display:relative;">
                        <div class="row m-0 justify-content-between align-items-center">
                        
                            <div class="col-md-3 text-center row">  
                                <div class="col-md-4">${Item.Codigo}</div>
                                <div class="col-md-5">${toCapitalize(Item.Puesto_Trabajo_Descripcion)}</div>
                                <div class="col-md-3">${ Item.Gerencia_Des==0 ? '-' : Item.Gerencia_Des }</div>
                            </div>
                            <div class="col-md-5 text-center row">  
                                <div class="col-md-4">${Item.Area_Des==0 ? '-' : toCapitalize(Item.Area_Des) }</div>
                                <div class="col-md-3">${Item.Area_Des==0 ? '-' : toCapitalize(Item.Area_Des) }</div>
                                <div class="col-md-5">${toCapitalize(Item.Proceso_Des)}</div>
                            </div>
                            
                            <div class="col-md-3 text-center row">  
                                <div class="col-md-4">${Item.Fecha_Creacion}</div>
                                <div class="col-md-4">${Item.Fecha_Vigencia?Item.Fecha_Vigencia:'--'}</div>
                                <div class="col-md-4">${toCapitalize(Item.Estado_Des)}</div>
                            </div>
                            
                            <div class="col-md-1 text-center row">
                                <div class="col-md-12">
                                    <button ${ver} onclick="onOpenModalIPERC(${Item.Id}, 'Ver', true)" class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-ojo m-auto bmd-btn-fab-sm__xs" style="min-width: 35px !important;min-height: 35px !important;${Item.Ver?'':'background-color: #9c9c9c !important;'}">
                                        <img src="./images/newsistema/iconos/ojo1.svg" alt="" class="w-50">
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>`;
        }else{

            html += `<div class="item-tabla p-2" style="font-size: 15px; display:relative;">
                        <div class="row m-0 justify-content-between align-items-center">
                        
                            <div class="col-md-3 text-center row">  
                                <div class="col-md-3">${Item.Codigo}</div>
                                <div class="col-md-6">${toCapitalize(Item.Puesto_Trabajo_Descripcion)}</div>
                                <div class="col-md-3">${ Item.Gerencia_Des==0 ? '-' : Item.Gerencia_Des }</div>
                            </div>
                            <div class="col-md-3 text-center row">  
                                <div class="col-md-5">${Item.Area_Des==0 ? '-' : toCapitalize(Item.Area_Des) }</div>
                                <div class="col-md-7">${toCapitalize(Item.Proceso_Des)}</div>
                            </div>
                            
                            <div class="col-md-3 text-center row">  
                                <div class="col-md-4">${Item.Fecha_Creacion}</div>
                                <div class="col-md-4">${Item.Fecha_Vigencia?Item.Fecha_Vigencia:'--'}</div>
                                <div class="col-md-4">${toCapitalize(Item.Estado_Des)}</div>
                            </div>
                            
                            <div class="col-md-3 text-center row">
                                <div class="col-md-2">
                                    <button ${editar} onclick="onOpenModalIPERC(${Item.Id}, 'Editar', false)" class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-add m-auto bmd-btn-fab-sm__xs" style="min-width: 35px !important;min-height: 35px !important;${Item.Editar?'':'background-color: #9c9c9c !important;'}">
                                        <img src="./images/newsistema/iconos/edit1.svg" alt="" class="w-50">
                                    </button>
                                </div>
                                <div class="col-md-2">
                                    <button ${ver} onclick="onOpenModalIPERC(${Item.Id}, 'Ver', true)" class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-ojo m-auto bmd-btn-fab-sm__xs" style="min-width: 35px !important;min-height: 35px !important;${Item.Ver?'':'background-color: #9c9c9c !important;'}">
                                        <img src="./images/newsistema/iconos/ojo1.svg" alt="" class="w-50">
                                    </button>
                                </div>
                                <div class="col-md-5">
                                    <button ${responsable} class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-responsible2 m-auto bmd-btn-fab-sm__xs" onclick="openModalResponsables(${Item.Id})" style="min-width: 35px !important;min-height: 35px !important;${Item.Responsable?'':'background-color: #9c9c9c !important;'}">
                                        <img src="./images/iconos/user1.svg" alt="" class="w-50">
                                    </button>
                                </div>
                                <div class="col-md-3">
                                    <button ${eliminar} class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-history2 m-auto bmd-btn-fab-sm__xs" onclick="modalHistorialModificacion(${Item.Id}, '${Item.Codigo}')" style="min-width: 35px !important;min-height: 35px !important;">
                                        <img src="./images/newsistema/iconos/historyiperc.svg" alt="" class="w-50">
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>`;

        }

    })
    // <div class="col-md-4">
    //     <button ${ver} class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-ojo m-auto bmd-btn-fab-sm__xs" onclick="modalVisualizarInspeccionForm(${Item.id},'${Item.title}')">
    //         <img src="./images/newsistema/iconos/ojo1.svg" alt="" class="w-50">
    //     </button>
    // </div>
    html += '';
    return html;
}

/*function evSelectSedeFiltroChange() {
    $('#Selec-Embarcacion-Filtro').val(0)
    $('#Selec-Embarcacion-Filtro').prop('disabled', $('#Selec-Sede-Filtro').val() != 0);
}*/

/*function evSelectEmbarcacionFiltroChange() {
    $('#Selec-Sede-Filtro').val(0)
    $('#Selec-Sede-Filtro').prop('disabled', $('#Selec-Embarcacion-Filtro').val() != 0);
}*/
function clearModalIPERC(){

    $("#body-activities-list").empty();
    $("#body-events-list").empty();
    $("#body-peligros-list").empty();
    $("#body-riskeval-list").empty();
    $("#body-controls-list").empty();
}

function closeModalIPERC(){
    $('#modal-mantenimiento-observacion').modal('hide');
    clearModalIPERC();
}
//function onOpenModalObservacion(PersonType,PersonName,Role,AreaId,SedeId,UnitId,AreaResponsible,UserName,pName,lName,Id,Hash,IdentityDocument,Job){
function onOpenModalIPERC(Id, title, readOnly){

    $('#btn-iperc-excel').css('visibility', 'hidden');//andy 8/6/2021 ss-403
    accion = '';
    let profile = getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa);

    clearModalIPERC();
    curStatus==0;
    observacionactual = 0;
    visualizacion = title;
    if (readOnly)
    {
        $('#btn_create_auditor').addClass('d-none');
        $('#btn-fin').addClass('d-none');
        $('#btn-pdf').removeClass('d-none');
    }
    else{
        $('#btn_create_auditor').removeClass('d-none');
        $('#btn-fin').addClass('d-none');
        $('#btn-pdf').addClass('d-none');
        $('#textoBotonGuardar').html('Guardar');
    }

    if(title=="Evaluar"){
        $('#btn-cancelar2').addClass('d-none');
        $('#btn_eval_iperc').removeClass('d-none');
        $('#btn-iperc-pdf').addClass('d-none');

        $('#btn-iperc-excel').addClass('d-none');
        $("#textEvalButton").text("Evaluar")
        $(".evaluador").removeClass('d-none')

        $("#lbl_des_act").removeClass('col-md-10');
        $("#lbl_des_act").addClass('col-md-8');

        $("#lbl_maq_event").removeClass('col-md-3');
        $("#lbl_maq_event").addClass('col-md-2');
        $("#lbl_des_event").removeClass('col-md-4');
        $("#lbl_des_event").addClass('col-md-2');

        $("#lbl_event_dang").removeClass('col-md-3');
        $("#lbl_event_dang").addClass('col-md-2');
        $("#lbl_danger_dang").removeClass('col-md-3');
        $("#lbl_danger_dang").addClass('col-md-2');
        $("#lbl_risk_dang").removeClass('col-md-1');
        $("#lbl_risk_dang").addClass('col-md-2');

        $("#lbl_eval_epp").removeClass('col-md-2');
        $("#lbl_eval_epp").addClass('col-md-1');

        $("#lbl_admin_control").removeClass('col-md-2');
        $("#lbl_admin_control").addClass('col-md-1');
    }else if(title=="Editar"){
        accion = "editar";
        $('#btn_eval_iperc').removeClass('d-none');
        $('#btn-cancelar2').removeClass('d-none');
        $("#btn_create_auditor").removeClass('d-none');
        $('#btn-iperc-pdf').addClass('d-none');

        $('#btn-iperc-excel').addClass('d-none');
        $("#textEvalButton").text("Ver Observación")
        
        $(".evaluador").addClass('d-none')

        $("#lbl_des_act").removeClass('col-md-10');
        $("#lbl_des_act").addClass('col-md-8');

        $("#lbl_maq_event").removeClass('col-md-3');
        $("#lbl_maq_event").addClass('col-md-2');
        $("#lbl_des_event").removeClass('col-md-4');
        $("#lbl_des_event").addClass('col-md-2');

        $("#lbl_event_dang").removeClass('col-md-3');
        $("#lbl_event_dang").addClass('col-md-2');
        $("#lbl_danger_dang").removeClass('col-md-3');
        $("#lbl_danger_dang").addClass('col-md-2');
        $("#lbl_risk_dang").removeClass('col-md-1');
        $("#lbl_risk_dang").addClass('col-md-2');

        $("#lbl_eval_epp").removeClass('col-md-2');
        $("#lbl_eval_epp").addClass('col-md-1');

        $("#lbl_admin_control").removeClass('col-md-2');
        $("#lbl_admin_control").addClass('col-md-1');

    }else if(title=="Ver"){

        $('#btn_eval_iperc').addClass('d-none');
        $('#btn-cancelar2').addClass('d-none');
        $("#btn_create_auditor").addClass('d-none');
        

        if(profile=="ROL_RESPONSABLEIPERC"){
            $('#btn-iperc-pdf').removeClass('d-none');
            $('#btn-iperc-excel').removeClass('d-none');
        }else if(profile=="ROL_VALIDADORIPERC"){
            $('#btn-iperc-pdf').removeClass('d-none');
            $('#btn-iperc-excel').removeClass('d-none');  
        }else{
            $('#btn-iperc-pdf').removeClass('d-none');
            $('#btn-iperc-excel').addClass('d-none'); 
        }
        
        
        $("#lbl_des_act").removeClass('col-md-8');
        $("#lbl_des_act").addClass('col-md-10');

        $("#lbl_maq_event").removeClass('col-md-2');
        $("#lbl_maq_event").addClass('col-md-3');
        $("#lbl_des_event").removeClass('col-md-3');
        $("#lbl_des_event").addClass('col-md-4');

        $("#lbl_event_dang").removeClass('col-md-2');
        $("#lbl_event_dang").addClass('col-md-3');
        $("#lbl_danger_dang").removeClass('col-md-2');
        $("#lbl_danger_dang").addClass('col-md-3');
        $("#lbl_risk_dang").removeClass('col-md-2');
        $("#lbl_risk_dang").addClass('col-md-1');

        $("#lbl_eval_epp").removeClass('col-md-1');
        $("#lbl_eval_epp").addClass('col-md-2');

        $("#lbl_admin_control").removeClass('col-md-1');
        $("#lbl_admin_control").addClass('col-md-2');

        $("#btn_step4").attr('disabled',false);
        $("#btn_step5").attr('disabled',false);
        $("#btn_step6").attr('disabled',false);
    }

    $("#titleConfirm").html("Se modificará el IPERC");

    $("#bodyCrear").addClass("d-none");
    $("#bodyActualizar").removeClass("d-none");

    $("#titleMessage").html("Se guardó la modificación con éxito");



    $('#btn-fin').attr('disabled',false);

    $('#modal-mantenimiento-observacion').modal('show');
    
    var navListItems = $('div.setup-panel div a button'); // tab nav items
    navListItems.removeClass('btn-primary-check').addClass('btn-default');
    $('#btn_step1').addClass('btn-primary-check');
        var HH ="";
        var MM = "";
        var SS ="";
        var TT ="";
       var allWells = $('.setup-content'); // content div
        step1 = $('#step-1');
    allWells.hide(); // hide all contents by defauld
    step1.show();

    var apiKeyx = "r$3#23516ewew5";
    var metodoAjax =  "GET";
    var url =apiUrlssoma+"/api/Get-Iperc-General?code=ii4cICd6hzmjyrVKEJlDIh3VtnKT3GvkuwPCEgmzcgS79pIwA/sBZQ==&httpmethod=object&Id="+Id;
    var headers ={
        "apikey":apiKeyx
    }

    $.ajax({
        method: metodoAjax,
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function( response)
    {
        console.log("RESPUESTA DE GET:",response);
        ipercSelected = response;

        activities_array = response.DatosPrincipales.Actividades;
        
        curStatus = response.DatosPrincipales.Estado_Id;
        //datos observacion
        if(response.Observacion.Id>0){
            console.log('tiene observacion')
            observacionactual = response.Observacion.Id;
            //alert('hereeeeeeeeeee')
            $("#evaluacionDescription").val(response.Observacion.Observacion);
            $("#cb_observado").prop('checked',response.Observacion.Observado);
            $("#cb_validado").prop('checked',response.Observacion.Validado);

            
            if(response.Observacion.Validado){
                $("#evaluacionDescription").prop('disabled',true);                
            }else{
                $("#evaluacionDescription").prop('disabled',false);
            }


            if(title=="Editar"){
                $('#btn_eval_iperc').removeClass('d-none');
            }

        }
        else
        {
            $("#evaluacionDescription").val(' ');
            $("#cb_observado").prop('checked',false);
            $("#cb_validado").prop('checked',false);
            
        }


        $('#txtHeadModalMantenimiento').html(title + " IPERC - " + response.DatosPrincipales.Codigo);
        $('input[name=Tipo_Observacion]').attr('disabled','disabled');

        $('#formIpercId').val(Id);
        $('#formCodigo').val(response.DatosPrincipales.Codigo);
        $('#codeIpercEval').text(response.DatosPrincipales.Codigo);
        $('#hiddenIpercIdEvaluacion').val(Id);
        $('#hiddenIpercCodeEvaluacion').val(response.DatosPrincipales.Codigo);
        var fechaActual = moment(response.DatosPrincipales.Fecha_Creacion,'DD/MM/YYYY').format('DD/MM/YYYY');
        moment.locale('en');
        var horaActual = moment(response.DatosPrincipales.Fecha_Creacion).format('LTS');
        
        let fecha_operacion = mdc.textField.MDCTextField.attachTo(document.querySelector('.fecha-operacion'));

            /*let cbo_gerencia = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-gerencia'));
            let cbo_area_iperc = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-area'));
            let cbo_proceso = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-proceso'));
            let cbo_subproceso = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-subproceso'));
            let cbo_alcance = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-alcance'));*/

            
            //  $('.codigo-reportante').css('background-color','#c3c3c3');
            $('.reportante').css('background-color','#c3c3c3');
            //   $('.codigo-reportado').css('background-color','#c3c3c3');
            $('.reportado').css('background-color','#c3c3c3');
            $('.fecha-operacion').css('background-color','#c3c3c3');
            $('.hora-operacion').css('background-color','#c3c3c3');
            $('.cbo-sede').css('background-color','#c3c3c3');
            $('.cbo-embarcacion').css('background-color','#c3c3c3');
            $('.cbo-area').css('background-color','#c3c3c3');
            $('.cbo-zona').css('background-color','#c3c3c3');

            fecha_operacion.value = fechaActual;
            cbo_gerencia.value = response.DatosPrincipales.Gerencia_Id.toString();
            cbo_area_iperc.value = response.DatosPrincipales.Area_Id.toString();
            cbo_proceso.value = response.DatosPrincipales.Proceso_Id.toString();
            cbo_alcance.value = response.DatosPrincipales.Alcance_Id.toString();
            fnSubProceso(response.DatosPrincipales.Proceso_Id,response.DatosPrincipales.Subproceso_Id);
            buscarPuestoTrabajo(response.DatosPrincipales.Area_Id,response.DatosPrincipales.Puesto_Trabajo_Id);
            //cbo_subproceso.value = response.DatosPrincipales.Subproceso_Id.toString();

            //let reportante = mdc.textField.MDCTextField.attachTo(document.querySelector('.reportante'));
            let descripcion_evento = mdc.textField.MDCTextField.attachTo(document.querySelector('.descripcion-evento'));
            let actividad_label_1 = mdc.textField.MDCTextField.attachTo(document.querySelector('.actividad-label-1'));
            let actividad_label_2 = mdc.textField.MDCTextField.attachTo(document.querySelector('.actividad-label-2'));
            let actividad_label_3 = mdc.textField.MDCTextField.attachTo(document.querySelector('.actividad-label-3'));

            /*let cbo_probabilidad = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-probabilidad'));
            let cbo_probabilidad_2 = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-probabilidad-2'));
            let cbo_epp = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-epp'));
            let cbo_epp_2 = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-epp-2'));*/
        
            let indice_severidad = mdc.textField.MDCTextField.attachTo(document.querySelector('.indice-severidad'));
            let indice_riesgo = mdc.textField.MDCTextField.attachTo(document.querySelector('.indice-riesgo'));
            let indice_severidad_2 = mdc.textField.MDCTextField.attachTo(document.querySelector('.indice-severidad-2'));
            let indice_riesgo_2 = mdc.textField.MDCTextField.attachTo(document.querySelector('.indice-riesgo-2'));
        
            let control_fisico = mdc.textField.MDCTextField.attachTo(document.querySelector('.control-fisico'));
            let control_administrativo = mdc.textField.MDCTextField.attachTo(document.querySelector('.control-administrativo'));
            let eliminacion_riesgo = mdc.textField.MDCTextField.attachTo(document.querySelector('.eliminacion-riesgo'));
            let sustitucion = mdc.textField.MDCTextField.attachTo(document.querySelector('.sustitucion'));
            let control_ingenieria = mdc.textField.MDCTextField.attachTo(document.querySelector('.control-ingenieria'));
            let control_administrativo_2 = mdc.textField.MDCTextField.attachTo(document.querySelector('.control-administrativo-2'));
        
            $('.control-fisico').css('background-color','#fff');
            $('.control-administrativo').css('background-color','#fff');
            $('.eliminacion-riesgo').css('background-color','#fff');
            $('.sustitucion').css('background-color','#fff');
            $('.control-ingenieria').css('background-color','#fff');
            $('.control-administrativo-2').css('background-color','#fff');
        
            indice_severidad.value=' ';
            indice_riesgo.value=' ';
            indice_severidad_2.value=' ';
            indice_riesgo_2.value=' ';
        
            control_fisico.value=' ';
            control_administrativo.value=' ';
            eliminacion_riesgo.value=' ';
            sustitucion.value=' ';
            control_ingenieria.value=' ';
            control_administrativo_2.value=' ';
        
            cbo_epp.value = '0';
            cbo_epp_2.value = '0';
        
            /*let cbo_actividad = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-actividad'));
            let cbo_actividad_2 = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-actividad-2'));
            let cbo_tipoactividad = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-tipoactividad'));
            let cbo_frecuencia = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-frecuencia'));
            let cbo_genero = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-genero'));*/


            muestraActividad();
            muestraEvento();
            muestraEvaluacion();
            muestraControl();

            if(title=="Ver"){

                $('.cbo-gerencia').addClass('mdc-select--disabled');
                $('.cbo-area').addClass('mdc-select--disabled');
                $('.cbo-proceso').addClass('mdc-select--disabled');
                $('.cbo-subproceso').addClass('mdc-select--disabled');
                $('.cbo-alcance').addClass('mdc-select--disabled');
                $('.cbo-puesto').addClass('mdc-select--disabled');
                $('.fecha-operacion').addClass('mdc-select--disabled');

                $('.readonly').hide();
                
            }else{
                $('.cbo-gerencia').removeClass('mdc-select--disabled');
                $('.cbo-area').removeClass('mdc-select--disabled');
                $('.cbo-proceso').removeClass('mdc-select--disabled');
                $('.cbo-subproceso').removeClass('mdc-select--disabled');
                $('.cbo-alcance').removeClass('mdc-select--disabled');
                $('.cbo-puesto').removeClass('mdc-select--disabled');
                $('.fecha-operacion').removeClass('mdc-select--disabled');

                $('.readonly').show();
            }
            //muestraPeligro();
            /*if (response.DatosPrincipales.Sede_Id == 0)
            {
                buscarZonas(response.DatosPrincipales.Embarcacion_UnidadNegocioId, response.DatosPrincipales.Embarcacion_UnidadNegocioSubId, response.DatosPrincipales.Zona_Id);
            }
            else
            {
                buscarAreas(response.DatosPrincipales.Sede_Id, response.DatosPrincipales.Sede_UnidadNegocioId, response.DatosPrincipales.Area_Id);
                buscarZonas(response.DatosPrincipales.Sede_UnidadNegocioId, 0, response.DatosPrincipales.Area_Id);
            }*/


            //codigo_reportante.value = response.DatosPrincipales.Codigo_Reportante;
            //reportante.value = response.DatosPrincipales.Nombres_Reportante;
            //codigo_reportado.value = response.DatosPrincipales.Codigo_Reportado;
            //reportado.value = response.DatosPrincipales.Nombres_Reportado;

            //$('#Codigo_Reportante').val(response.DatosPrincipales.Codigo_Reportante);
            //$('#Codigo_Reportado').val(response.DatosPrincipales.Codigo_Reportado);


            /*var hora_op=response.DatosPrincipales.Hora_Operacion.split(':');
            MM=hora_op[1];
            SS=hora_op[2]
            if(hora_op[0]>12){
                HH = hora_op[0]-12;
                TT="PM";
            }else if(hora_op[0]==0){
                HH = 12;
                TT="AM";
            }else if(hora_op[0]==12){
                HH = hora_op[0];
                TT="PM";
            }else{
                HH = hora_op[0];
                TT="AM";
            }
            hora_operacion.value = HH+':'+MM+':'+SS+' '+TT;*/

            //$('.mdc-select__ripple').css('background-color','#c3c3c3');
            //$('.cbo-sede').addClass('mdc-select--disabled')
            //$('.cbo-embarcacion').addClass('mdc-select--disabled')
            //$('.cbo-area').addClass('mdc-select--disabled')
            //$('.cbo-zona').addClass('mdc-select--disabled')
            //$('input[name=Nombres_Reportado]').addClass('mdc-select--disabled')

            //$('.mdc-select__selected-text').addClass('mdc-select--outlined')

            //adjuntoBD = response.Adjunto;
            //combo_box_1(readOnly);
            //selcomportamiento();
            //showsSelectOption(response.Checklist, readOnly)

            $('#btn-iperc-excel').css('visibility', 'visible');//andy 8/6/2021 ss-403
    })







}
function reseteaNumeracion(list){

    list.each(function( index ) {
        console.log(index)
        $(this).find('.num').eq(0).text(index+1);
    });

}

function muestraActividad(){
    $("#body-activities-Vacio").addClass("d-none");

    activities_array.forEach((Item,index) => {
        if(visualizacion!="Ver"){
            $("#body-activities-list").append(`<div class="row m-0 " style="border: solid 1px #c8c8c8;border-radius: 4.4px;max-height: 100px;margin-top: 10px !important;">
                                                <div class="col-md-1 text-center" style="display: flex;">
                                                <div class="col-md-12 num" style="display: flex;align-items: center;justify-content: center;">
                                                ${index+1}
                                                </div>
                                                </div>
                                                <div class="col-md-9 text-center">
                                                <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;">
                                                <textarea style="width: 100%;height: 70px;border-color: #c8c8c8;border-radius: 4.4px;padding: 14px;" onkeyup="changeActivitieDes(${index},${index+1},this.value)" >${Item.descripcion}</textarea>
                                                </div>
                                                </div>
                                                <div class="col-md-1 text-center">
                                                </div>
                                                <div class="col-md-1 text-center" style="display: flex;">
                                                    <button  class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-trash2 m-auto bmd-btn-fab-sm__xs" onclick="removeActividad(this,${index})">
                                                        <img src="./images/newsistema/iconos/trash2.svg" alt="" class="w-50">
                                                    </button>
                                                </div>
                                            </div>`);    
        }else{
            $("#body-activities-list").append(`<div class="row m-0 " style="border: solid 1px #c8c8c8;border-radius: 4.4px;max-height: 100px;margin-top: 10px !important;">
                                                <div class="col-md-1 text-center" style="display: flex;">
                                                <div class="col-md-12 num" style="display: flex;align-items: center;justify-content: center;">
                                                ${index+1}
                                                </div>
                                                </div>
                                                <div class="col-md-10 text-center">
                                                <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;">
                                                <textarea style="width: 100%;height: 70px;border-color: #c8c8c8;border-radius: 4.4px;padding: 14px;" onkeyup="changeActivitieDes(${index},${index+1},this.value)">${Item.descripcion}</textarea>
                                                </div>
                                                </div>
                                                <div class="col-md-1 text-center">
                                                </div>
                                            </div>`);
        }

    })

}

function muestraEvento(){
    
    activities_array.forEach((Item,index) => {
        Item.events.forEach((Evento,ei) => {
            var maq_data = maquinasEquipos.filter(m=>m.Id==Evento.maqid);
            var maq_des = "-";
            if(maq_data!=""){
                maq_des = maq_data[0].Description;
            }
            if(visualizacion!="Ver"){
                var length = $("#body-events-list .row").length+1;
                $("#body-events-list").append(`<div class="row m-0 " style="border: solid 1px #c8c8c8;border-radius: 4.4px;min-height: 100px;margin-top: 10px !important;">
                                                <div class="col-md-1 text-center d-flex">
                                                    <div class="col-md-12 num" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                        ${length}
                                                    </div>
                                                </div>
                                                <div class="col-md-4 text-center d-flex">
                                                    <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                        ${Item.descripcion}
                                                    </div>
                                                </div>

                                                <div class="col-md-2 text-center d-flex">
                                                    <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                        ${maq_des}
                                                    </div>
                                                </div>

                                                <div class="col-md-3 text-center d-flex">
                                                    <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                        ${Evento.description}
                                                    </div>
                                                </div>

                                                <div class="col-md-1 text-center" style="display: flex;">
                                                    <button type="button" class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-add m-auto bmd-btn-fab-sm__xs" onclick="editEvent(this,${ei},${index})">
                                                        <img src="./images/newsistema/iconos/edit1.svg" alt="" class="w-50">
                                                    </button>
                                                </div>

                                                <div class="col-md-1 text-center" style="display: flex;">
                                                    <button  class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-trash2 m-auto bmd-btn-fab-sm__xs" onclick="removeEvent(this,${ei},${index})">
                                                        <img src="./images/newsistema/iconos/trash2.svg" alt="" class="w-50">
                                                    </button>
                                                </div>
                                            </div>`);
            }else{
                var length = $("#body-events-list .row").length+1;
                $("#body-events-list").append(`<div class="row m-0 " style="border: solid 1px #c8c8c8;border-radius: 4.4px;min-height: 100px;margin-top: 10px !important;">
                                                <div class="col-md-1 text-center d-flex">
                                                    <div class="col-md-12 num" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                        ${length}
                                                    </div>
                                                </div>
                                                <div class="col-md-4 text-center d-flex">
                                                    <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                        ${Item.descripcion}
                                                    </div>
                                                </div>

                                                <div class="col-md-3 text-center d-flex">
                                                    <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                        ${maq_des}
                                                    </div>
                                                </div>

                                                <div class="col-md-4 text-center d-flex">
                                                    <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                        ${Evento.description}
                                                    </div>
                                                </div>
                                            </div>`);
            }

        })
    })

}

function muestraPeligro(){
    //let cbo_actividad_2 = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-actividad-2'));
    //let cbo_evento = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-evento'));
    //let cbo_peligro = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-peligro'));

    
    var cant = 1;
    $("#body-peligros-list").empty();
    activities_array.forEach((Item,index) => {
        Item.events.forEach((Evento,ei) => {
            var maq_data = maquinasEquipos.filter(m=>m.Id==Evento.maqid);
            var maq_des = "-";
            if(maq_data!=""){
                maq_des = maq_data[0].Description;
            }
            Evento.dangers.forEach((Peligro,pi) => {
                var pericon_data = pericon.filter(per=>per.Id == Peligro.dangerId);
                if(visualizacion=="Ver"){
                    $("#body-peligros-list").append(`<div class="row m-0 " style="border: solid 1px #c8c8c8;border-radius: 4.4px;min-height: 100px;margin-top: 10px !important;">
                                                        <div class="col-md-1 text-center d-flex">
                                                            <div class="col-md-12 num" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                                ${cant}
                                                            </div>
                                                        </div>

                                                        <div class="col-md-3 text-center d-flex">
                                                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                                ${Evento.description}
                                                            </div>
                                                        </div>

                                                        <div class="col-md-2 text-center d-flex">
                                                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                                ${maq_des}
                                                            </div>
                                                        </div>

                                                        <div class="col-md-3 text-center" style="display: flex;">
                                                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                                ${pericon_data[0].Peligro}
                                                            </div>
                                                        </div>

                                                        <div class="col-md-1 text-center" style="display: flex;">
                                                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                                ${pericon_data[0].Riesgo}
                                                            </div>
                                                        </div>

                                                        <div class="col-md-2 text-center" style="display: flex;">
                                                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                                ${pericon_data[0].Consecuencia}
                                                            </div>
                                                        </div>

                                                    </div>`);
                }else{
                    $("#body-peligros-list").append(`<div class="row m-0 " style="border: solid 1px #c8c8c8;border-radius: 4.4px;min-height: 100px;margin-top: 10px !important;">
                        <div class="col-md-1 text-center d-flex">
                            <div class="col-md-12 num" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                ${cant}
                            </div>
                        </div>

                        <div class="col-md-2 text-center d-flex">
                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                ${Evento.description}
                            </div>
                        </div>

                        <div class="col-md-2 text-center d-flex">
                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                ${maq_des}
                            </div>
                        </div>

                        <div class="col-md-2 text-center" style="display: flex;">
                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                ${pericon_data[0].Peligro}
                            </div>
                        </div>

                        <div class="col-md-2 text-center" style="display: flex;">
                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                ${pericon_data[0].Riesgo}
                            </div>
                        </div>

                        <div class="col-md-2 text-center" style="display: flex;">
                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                ${pericon_data[0].Consecuencia}
                            </div>
                        </div>

                        <div class="col-md-1 text-center" style="display: flex;">
                            <button  class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-trash2 m-auto bmd-btn-fab-sm__xs" onclick="removePeligro(this,${ei},${index},${pi})">
                                <img src="./images/newsistema/iconos/trash2.svg" alt="" class="w-50">
                            </button>
                        </div>

                    </div>`);
                }
                cant++;
            })
        })
    })

}

function muestraEvaluacion(){

    var cant = 1;
    activities_array.forEach((Item,index) => {
        Item.events.forEach((Evento,ei) => {
            Evento.dangers.forEach((Peligro,pi) => {
                var pericon_data = pericon.filter(per=>per.Id == Peligro.Iperc);
                Peligro.evals.forEach((Evaluacion,evi) => {
                    
                    var epp_data = epp_array.filter(epp=>epp.Id == Evaluacion.epp);
                    let catalogo_riesgo = "";   
                    let color_catalogo = "";
                    let significancia = "";
                    let color_significancia = "";

                    if(Evaluacion.indice_riesgo>=1&&Evaluacion.indice_riesgo<=2){
                        catalogo_riesgo = "Aceptable";
                        color_catalogo = "#D9E2C0";
                        significancia = "No significativo";
                        color_significancia = "#4EAC5B";
                    }else if(Evaluacion.indice_riesgo>=3&&Evaluacion.indice_riesgo<=4){
                        catalogo_riesgo = "Tolerable";
                        color_catalogo = "#4EAC5B";
                        significancia = "No significativo";
                        color_significancia = "#4EAC5B";
                    }else if(Evaluacion.indice_riesgo>=6&&Evaluacion.indice_riesgo<=9){
                        catalogo_riesgo = "Importante";
                        color_catalogo = "#F6C142";
                        significancia = "Significativo";
                        color_significancia = "#EB3223";
                    }else if(Evaluacion.indice_riesgo>=12&&Evaluacion.indice_riesgo<=16){
                        catalogo_riesgo = "Intolerable";
                        color_catalogo = "#EB3223";
                        significancia = "Significativo";
                        color_significancia = "#EB3223";
                    }
                    if(visualizacion=="Ver"){
                    $("#body-riskeval-list").append(`<div class="row m-0 " style="border: solid 1px #c8c8c8;border-radius: 4.4px;min-height: 100px;margin-top: 10px !important;">
                                                                            
                                                        <div class="col-md-1 text-center d-flex">
                                                            <div class="col-md-12 num" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                                ${cant}
                                                            </div>
                                                        </div>

                                                        <div class="col-md-1 text-center d-flex">
                                                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                                ${pericon_data[0].Riesgo}
                                                            </div>
                                                        </div>

                                                        <div class="col-md-1 text-center d-flex">
                                                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                                ${Evaluacion.control_fisico?Evaluacion.control_fisico:"-"}
                                                            </div>
                                                        </div>

                                                        <div class="col-md-2 text-center" style="display: flex;">
                                                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                                ${Evaluacion.control_administrativo?Evaluacion.control_administrativo:"-"}
                                                            </div>
                                                        </div>

                                                        <div class="col-md-2 text-center" style="display: flex;">
                                                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                                ${Evaluacion.epp?epp_data[0].Description:"-"}
                                                            </div>
                                                        </div>

                                                        <div class="col-md-1 text-center" style="display: flex;">
                                                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                                ${Evaluacion.probabilidad}
                                                            </div>
                                                        </div>

                                                        <div class="col-md-1 text-center" style="display: flex;">
                                                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                                ${Evaluacion.indice_severidad}
                                                            </div>
                                                        </div>

                                                        <div class="col-md-1 text-center" style="display: flex;">
                                                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                                ${Evaluacion.indice_riesgo}
                                                            </div>
                                                        </div>

                                                        <div class="col-md-1 text-center" style="display: flex;">
                                                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;color:${color_catalogo};">
                                                                ${Evaluacion.catalogo_riesgo}
                                                            </div>
                                                        </div>

                                                        <div class="col-md-1 text-center" style="display: flex;">
                                                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;color:${color_significancia};">
                                                                ${Evaluacion.significancia}
                                                            </div>
                                                        </div>

                                                    </div>`);
                    }else{
                        $("#body-riskeval-list").append(`<div class="row m-0 " style="border: solid 1px #c8c8c8;border-radius: 4.4px;min-height: 100px;margin-top: 10px !important;">
                                                                            
                        <div class="col-md-1 text-center d-flex">
                            <div class="col-md-12 num" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                ${cant}
                            </div>
                        </div>

                        <div class="col-md-1 text-center d-flex">
                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                ${pericon_data[0].Riesgo}
                            </div>
                        </div>

                        <div class="col-md-1 text-center d-flex">
                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                ${Evaluacion.control_fisico?Evaluacion.control_fisico:"-"}
                            </div>
                        </div>

                        <div class="col-md-2 text-center" style="display: flex;">
                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                ${Evaluacion.control_administrativo?Evaluacion.control_administrativo:"-"}
                            </div>
                        </div>

                        <div class="col-md-1 text-center" style="display: flex;">
                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                ${Evaluacion.epp?epp_data[0].Description:"-"}
                            </div>
                        </div>

                        <div class="col-md-1 text-center" style="display: flex;">
                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                ${Evaluacion.probabilidad}
                            </div>
                        </div>

                        <div class="col-md-1 text-center" style="display: flex;">
                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                ${Evaluacion.indice_severidad}
                            </div>
                        </div>

                        <div class="col-md-1 text-center" style="display: flex;">
                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                ${Evaluacion.indice_riesgo}
                            </div>
                        </div>

                        <div class="col-md-1 text-center" style="display: flex;">
                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;color:${color_catalogo};">
                                ${Evaluacion.catalogo_riesgo}
                            </div>
                        </div>

                        <div class="col-md-1 text-center" style="display: flex;">
                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;color:${color_significancia};">
                                ${Evaluacion.significancia}
                            </div>
                        </div>

                        <div class="col-md-1 text-center" style="display: flex;">
                            <button type="button" class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-add m-auto bmd-btn-fab-sm__xs" onclick="editRiskEval(this,${ei},${index},${pi},${evi})">
                                <img src="./images/newsistema/iconos/edit1.svg" alt="" class="w-50">
                            </button>
                            <button  class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-trash2 m-auto bmd-btn-fab-sm__xs" onclick="removeRiskEval(this,${ei},${index},${pi},${evi})">
                                <img src="./images/newsistema/iconos/trash2.svg" alt="" class="w-50">
                            </button>
                        </div>
                    </div>`);
                    }

                    cant++;
                })
            })
        })
    })


}

function muestraControl(){

    activities_array.forEach((Item,index) => {
        Item.events.forEach((Evento,ei) => {
            Evento.dangers.forEach((Peligro,pi) => {
                Peligro.controls.forEach((Control,eco) => {

                    var epp_data = epp_array.filter(epp=>epp.Id == Control.epp);

                    let catalogo_riesgo = "";
                    let color_catalogo = "";
                    let significancia = "";
                    let color_significancia = "";

                    if(Control.indice_riesgo>=1&&Control.indice_riesgo<=2){
                        catalogo_riesgo = "Aceptable";
                        color_catalogo = "#D9E2C0";
                        significancia = "No significativo";
                        color_significancia = "#4EAC5B";
                    }else if(Control.indice_riesgo>=3&&Control.indice_riesgo<=4){
                        catalogo_riesgo = "Tolerable";
                        color_catalogo = "#4EAC5B";
                        significancia = "No significativo";
                        color_significancia = "#4EAC5B";
                    }else if(Control.indice_riesgo>=6&&Control.indice_riesgo<=9){
                        catalogo_riesgo = "Importante";
                        color_catalogo = "#F6C142";
                        significancia = "Significativo";
                        color_significancia = "#EB3223";
                    }else if(Control.indice_riesgo>=12&&Control.indice_riesgo<=16){
                        catalogo_riesgo = "Intolerable";
                        color_catalogo = "#EB3223";
                        significancia = "Significativo";
                        color_significancia = "#EB3223";
                    }

                    var cant = $("#body-controls-list .row").length;
                    if(visualizacion=="Ver"){
                    $("#body-controls-list").append(`<div class="row m-0 " style="border: solid 1px #c8c8c8;border-radius: 4.4px;min-height: 100px;margin-top: 10px !important;">
                                        
                                        <div class="col-md-1 text-center d-flex">
                                            <div class="col-md-12 num" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${cant+1}
                                            </div>
                                        </div>

                                        <div class="col-md-1 text-center d-flex">
                                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${Control.eliminacion_riesgo?Control.eliminacion_riesgo:"-"}
                                            </div>
                                        </div>

                                        <div class="col-md-1 text-center d-flex">
                                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${Control.situacion?Control.situacion:"-"}
                                            </div>
                                        </div>

                                        <div class="col-md-1 text-center d-flex">
                                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${Control.control_ingenieria?Control.control_ingenieria:"-"}
                                            </div>
                                        </div>

                                        <div class="col-md-2 text-center" style="display: flex;">
                                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${Control.control_administrativo?Control.control_administrativo:"-"}
                                            </div>
                                        </div>

                                        <div class="col-md-1 text-center" style="display: flex;">
                                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${Control.epp?epp_data[0].Description:"-"}
                                            </div>
                                        </div>

                                        <div class="col-md-1 text-center" style="display: flex;">
                                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${Control.probabilidad}
                                            </div>
                                        </div>

                                        <div class="col-md-1 text-center" style="display: flex;">
                                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${Control.indice_severidad}
                                            </div>
                                        </div>

                                        <div class="col-md-1 text-center" style="display: flex;">
                                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${Control.indice_riesgo}
                                            </div>
                                        </div>

                                        <div class="col-md-1 text-center" style="display: flex;">
                                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;color:${color_catalogo}";>
                                                ${Control.catalogo_riesgo}
                                            </div>
                                        </div>

                                        <div class="col-md-1 text-center" style="display: flex;">
                                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;color:${color_significancia}";>
                                                ${Control.significancia}
                                            </div>
                                        </div>

                                    </div>`);  
                    }else{
                        $("#body-controls-list").append(`<div class="row m-0 " style="border: solid 1px #c8c8c8;border-radius: 4.4px;min-height: 100px;margin-top: 10px !important;">
                                        
                        <div class="col-md-1 text-center d-flex">
                            <div class="col-md-12 num" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                ${cant+1}
                            </div>
                        </div>

                        <div class="col-md-1 text-center d-flex">
                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                ${Control.eliminacion_riesgo?Control.eliminacion_riesgo:"-"}
                            </div>
                        </div>

                        <div class="col-md-1 text-center d-flex">
                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                ${Control.situacion?Control.situacion:"-"}
                            </div>
                        </div>

                        <div class="col-md-1 text-center d-flex">
                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                ${Control.control_ingenieria?Control.control_ingenieria:"-"}
                            </div>
                        </div>

                        <div class="col-md-1 text-center" style="display: flex;">
                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                ${Control.control_administrativo?Control.control_administrativo:"-"}
                            </div>
                        </div>

                        <div class="col-md-1 text-center" style="display: flex;">
                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                ${Control.epp?epp_data[0].Description:"-"}
                            </div>
                        </div>

                        <div class="col-md-1 text-center" style="display: flex;">
                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                ${Control.probabilidad}
                            </div>
                        </div>

                        <div class="col-md-1 text-center" style="display: flex;">
                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                ${Control.indice_severidad}
                            </div>
                        </div>

                        <div class="col-md-1 text-center" style="display: flex;">
                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                ${Control.indice_riesgo}
                            </div>
                        </div>

                        <div class="col-md-1 text-center" style="display: flex;">
                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;color:${color_catalogo}";>
                                ${Control.catalogo_riesgo}
                            </div>
                        </div>

                        <div class="col-md-1 text-center" style="display: flex;">
                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;color:${color_significancia}";>
                                ${Control.significancia}
                            </div>
                        </div>

                        <div class="col-md-1 text-center" style="display: flex;">
                            <button type="button" class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-add m-auto bmd-btn-fab-sm__xs" onclick="editControl(this,${ei},${index},${pi},${eco})">
                                <img src="./images/newsistema/iconos/edit1.svg" alt="" class="w-50">
                            </button>
                            <button  class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-trash2 m-auto bmd-btn-fab-sm__xs" onclick="removeControl(this,${ei},${index},${pi},${eco})">
                                <img src="./images/newsistema/iconos/trash2.svg" alt="" class="w-50">
                            </button>
                        </div>
                    </div>`);  
                    }                 
                })
            })
        })
    })


}

function fnAbrirModalNIPERC(){
    curStatus==0;
    activities_array = [];
    ipercSelected = {};
    accion = '';
    visualizacion='';
    $('#formIpercId').val('0');
    $('#formCodigo').val('');
    $('#codeIpercEval').text('');
    $('#hiddenIpercIdEvaluacion').val('');
    $('#hiddenIpercCodeEvaluacion').val('');
    $("#btn_step4").attr('disabled',true);
    $("#btn_step5").attr('disabled',true);
    $("#btn_step6").attr('disabled',true);
    console.log('fnAbrirModalNIPERC')
    // $('#modal-mantenimiento-observacion').addClass('modal_confirmacion__Active');
    //base64_trainning="";
    
    $('.cbo-gerencia').removeClass('mdc-select--disabled');
    $('.cbo-area').removeClass('mdc-select--disabled');
    $('.cbo-proceso').removeClass('mdc-select--disabled');
    $('.cbo-subproceso').removeClass('mdc-select--disabled');
    $('.cbo-alcance').removeClass('mdc-select--disabled');
    $('.cbo-puesto').removeClass('mdc-select--disabled');
    $('.fecha-operacion').removeClass('mdc-select--disabled');

    $('.readonly').show();

    $("#lbl_des_act").removeClass('col-md-10');
    $("#lbl_des_act").addClass('col-md-8');

    $("#lbl_maq_event").removeClass('col-md-3');
    $("#lbl_maq_event").addClass('col-md-2');
    $("#lbl_des_event").removeClass('col-md-4');
    $("#lbl_des_event").addClass('col-md-2');

    $("#lbl_event_dang").removeClass('col-md-3');
    $("#lbl_event_dang").addClass('col-md-2');
    $("#lbl_danger_dang").removeClass('col-md-3');
    $("#lbl_danger_dang").addClass('col-md-2');
    $("#lbl_risk_dang").removeClass('col-md-1');
    $("#lbl_risk_dang").addClass('col-md-2');

    $("#lbl_eval_epp").removeClass('col-md-2');
    $("#lbl_eval_epp").addClass('col-md-1');

    $("#lbl_admin_control").removeClass('col-md-2');
    $("#lbl_admin_control").addClass('col-md-1');
    
    $('#btn_create_auditor').removeClass('d-none');
    $('#btn-cancelar2').removeClass('d-none');

    $('#btn_eval_iperc').addClass('d-none');
    $('#btn-iperc-pdf').addClass('d-none');
    $('#btn-iperc-excel').addClass('d-none');

    $('#textoBotonGuardar').html('Guardar');

    $('#formObservacionId').val('');
    $('.cbo-sede').removeClass('mdc-select--disabled')
    //$('.cbo-embarcacion').removeClass('mdc-select--disabled')
    $('.cbo-area').removeClass('mdc-select--disabled')
    //$('.cbo-zona').removeClass('mdc-select--disabled')
    //$('input[name=Nombres_Reportado]').removeClass('mdc-select--disabled')

    $('.mdc-select__selected-text').removeClass('mdc-select--outlined')
    $('#txtHeadModalMantenimiento').html("Nuevo IPERC");
   // $('.codigo-reportante').css('background-color','#fff');
    //$('.reportante').css('background-color','#fff');
    //$('.codigo-reportado').css('background-color','#fff');
    $('.reportado').css('background-color','#fff');
    $('.fecha-operacion').css('background-color','#fff');
    $(".descripcion-evento").css('background-color','#fff');
    $('.hora-operacion').css('background-color','#fff');
    $('.cbo-sede').css('background-color','#fff');
    $('.cbo-embarcacion').css('background-color','#fff');
    $('.cbo-area').css('background-color','#fff');
    $('.cbo-zona').css('background-color','#fff');
    //$('input[name=Tipo_Observacion]').attr('disabled',false);
    //$('input[name=Nombres_Reportante]').attr('disabled',false);
    //$('input[name=Nombres_Reportado]').attr('disabled',false);
    $('#btn-fin').attr('disabled','disabled');

    var navListItems = $('div.setup-panel div a button'); // tab nav items
    navListItems.removeClass('btn-primary-check').addClass('btn-default');
    $('#btn_step1').addClass('btn-primary-check');

       var allWells = $('.setup-content'); // content div
        step1 = $('#step-1');
    allWells.hide(); // hide all contents by defauld
    step1.show();
    

    $('#Name_1').attr('readonly', false);
    $('#formAjax').trigger("reset");
    $('#tbody_skill').html('');
    $('#tbody_trainning').html('');
    $("#switch_estatus").prop("checked", true);
    $('.textarea_noActivo').hide();
    $("#body-activities-Vacio").removeClass("d-none");
    $('#modal-mantenimiento-observacion').modal('show');
    vw_principal.init();
    $('#Create_By').val(getCookie("vtas_id_hash"+sessionStorage.tabVisitasa))
    //getPerson1($("#Nombres_Reportante"));
    //getPerson2($("#Nombres_Reportado"));

    
    var fecha = new Date() - 1;
    var fechaActual = moment(fecha).format('DD/MM/YYYY');
    moment.locale('en');
    var horaActual = moment().format('LTS');
   // let codigo_reportante = mdc.textField.MDCTextField.attachTo(document.querySelector('.codigo-reportante'));
    //let reportante = mdc.textField.MDCTextField.attachTo(document.querySelector('.reportante'));
    let fecha_operacion = mdc.textField.MDCTextField.attachTo(document.querySelector('.fecha-operacion'));
    let descripcion_evento = mdc.textField.MDCTextField.attachTo(document.querySelector('.descripcion-evento'));
    let actividad_label_1 = mdc.textField.MDCTextField.attachTo(document.querySelector('.actividad-label-1'));
    let actividad_label_2 = mdc.textField.MDCTextField.attachTo(document.querySelector('.actividad-label-2'));
    let actividad_label_3 = mdc.textField.MDCTextField.attachTo(document.querySelector('.actividad-label-3'));
    
    
    //let cbo_gerencia = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-gerencia'));
    //let cbo_area_iperc = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-area'));
    //let cbo_proceso = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-proceso'));
    //let cbo_alcance = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-alcance'));
    /*let cbo_probabilidad = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-probabilidad'));
    let cbo_probabilidad_2 = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-probabilidad-2'));
    let cbo_epp = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-epp'));
    let cbo_epp_2 = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-epp-2'));*/

    let indice_severidad = mdc.textField.MDCTextField.attachTo(document.querySelector('.indice-severidad'));
    let indice_riesgo = mdc.textField.MDCTextField.attachTo(document.querySelector('.indice-riesgo'));
    let indice_severidad_2 = mdc.textField.MDCTextField.attachTo(document.querySelector('.indice-severidad-2'));
    let indice_riesgo_2 = mdc.textField.MDCTextField.attachTo(document.querySelector('.indice-riesgo-2'));

    let control_fisico = mdc.textField.MDCTextField.attachTo(document.querySelector('.control-fisico'));
    let control_administrativo = mdc.textField.MDCTextField.attachTo(document.querySelector('.control-administrativo'));
    let eliminacion_riesgo = mdc.textField.MDCTextField.attachTo(document.querySelector('.eliminacion-riesgo'));
    let sustitucion = mdc.textField.MDCTextField.attachTo(document.querySelector('.sustitucion'));
    let control_ingenieria = mdc.textField.MDCTextField.attachTo(document.querySelector('.control-ingenieria'));
    let control_administrativo_2 = mdc.textField.MDCTextField.attachTo(document.querySelector('.control-administrativo-2'));

    $('.control-fisico').css('background-color','#fff');
    $('.control-administrativo').css('background-color','#fff');
    $('.eliminacion-riesgo').css('background-color','#fff');
    $('.sustitucion').css('background-color','#fff');
    $('.control-ingenieria').css('background-color','#fff');
    $('.control-administrativo-2').css('background-color','#fff');

    indice_severidad.value=' ';
    indice_riesgo.value=' ';
    indice_severidad_2.value=' ';
    indice_riesgo_2.value=' ';

    control_fisico.value=' ';
    control_administrativo.value=' ';
    eliminacion_riesgo.value=' ';
    sustitucion.value=' ';
    control_ingenieria.value=' ';
    control_administrativo_2.value=' ';

    cbo_gerencia.selectedIndex = 0;
    cbo_gerencia.value = '0';
    
    cbo_area_iperc.selectedIndex = 0;
    cbo_area_iperc.value = '0';

    cbo_proceso.selectedIndex = 0;
    cbo_proceso.value = '0';
    cbo_alcance.selectedIndex =0;
    cbo_alcance.value = '0';
    cbo_epp.value = '0';
    cbo_epp_2.value = '0';

    actividad_label_1.value=' ';
    actividad_label_2.value=' ';
    actividad_label_3.value=' ';

    //let cbo_actividad = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-actividad')); //COMBOACTIVIDAD
    //let cbo_actividad_2 = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-actividad-2'));
    //let cbo_tipoactividad = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-tipoactividad'));
    //let cbo_frecuencia = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-frecuencia'));
    //let cbo_genero = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-genero'));

    $("#ul-Actividad").empty();
    $("#ul-Actividad-2").empty();
    //codigo_reportante.value = '';
    //reportante.value = '';
    //$('#ul-Area').html('');

    //$('#Codigo_Reportante').val('');
    //$('#Nombres_Reportante').val('');

    console.log(fechaActual)
    fecha_operacion.value = fechaActual;
    

    $('.mdc-select__ripple').css('background-color','#fff');

    $('.cbo-gerencia').addClass('mdc-select--disabled');
}


function getPersonEnvio(obj,num) {
    obj.autocomplete({
        change: function (event, ui)
        {
            if (ui.item === null &&  $("#hid_Name_id_1").length>20)
            {

                /*  $("#hid_collaborator_id_"+i).val("");
                 $(this).val("");
                 $("#add_covid_lastname_"+i).val(""); */
            }
            else if(ui.item)
            {

                $("#Nombres_Reportante").val(toCapitalize(ui.item.firstname)).trigger("change");
                //$("#add_covid_lastname_"+i).val(ui.item.lastname).trigger("change");
                //$("#add_covid_lastname_"+i).focus();
                //document.getElementById("add_covid_lastname_"+i).focus();
                // document.getElementById("add_covid_lastname_"+i).focus();
            }
            //document.getElementById("add_covid_lastname_"+i).focus();

        },

        source: function( request, response )
        {
            var filter = obj.val();
            
            var param= {filter:filter};
            var headers = {"Authorization":TOKEN_CLIENT,"apiKey":"r$3#23516ewew5"}

   
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
                        json.label      = toCapitalize(item.displayName);
                        json.value      = toCapitalize(item.givenName);
                        json.id         = item.objectId;
                        json.cargo      = toCapitalize(item.jobTitle);
                        json.firstname  = toCapitalize(item.displayName);//item.givenName+' '+item.surname;
                        json.email      = item.userPrincipalName;
                        json.dni        = item.identity_document;
                        array.push(json);
                    });

                    response(array);
                }
            });
        },
        minLength: 3,
        select: function( event, ui )
        {

            $(`#CorreoEnvio${num}`).val(ui.item.email);
            $(`#HashEnvio${num}`).val(ui.item.id);
            $(`#DocumentoEnvio${num}`).val(ui.item.dni);
            $(`#CargoEnvio${num}`).val(ui.item.cargo);


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

function getToken() {
    var param = {
        "client_id": "370d607d-5650-41fb-aa5f-644254136dab",
        "client_secret": "c1M7qP.s@]s-84BA5bgVG.W1:=h=QVsr",
        "scope": "https://graph.microsoft.com/.default",
        "grant_type": "client_credentials"
      }
      $.ajax({
          data: JSON.stringify(param),
          type: "post",
          async: true,
          processData:false,
          crossDomain : true,
          contentType : "application/json;charset=UTF-8",
          dataType: "json",
          url: apiurlsecurity+"/api/AuthClientCredentials?code="+AuthClientCredentials+""
      })
      .done(function( data, textStatus, jqXHR ) 
      {
          TOKEN_CLIENT = data.access_token; 

            
          var param= {filter:getCookie("vtas_id_hash" + sessionStorage.tabVisitasa)};
          var headers = {"Authorization":TOKEN_CLIENT,"apiKey":"r$3#23516ewew5"}

 
          $.ajax({
              url: apiurlsecurity+"/api/Get-Collaborator?code="+GetCollaborator+"&httpmethod=object",
              //dataType: "json",
              method:"post",
              data : JSON.stringify(param),
              processData:false,
              crossDomain: true,
              async: true,
              headers : headers,

          }).done(function( data, textStatus, jqXHR ) 
          {
                data =  JSON.parse(data);

                curEmail = data.value[0].userPrincipalName;

          })


      })
      .fail(function( jqXHR, textStatus, errorThrown ) {
          console.log();
      });
}

function fnCerrarModalIPERC(){
    $('#modal-mantenimiento-observacion').modal('hide');
        $('#formAjax')[0].reset();
        $('#contenido-detalle_2').html('');
        $('#contenido-detalle_3').html('');

}

function agregarActividad(){
    $("#body-activities-Vacio").addClass("d-none");
    var cant = $("#body-activities-list .row").length;
    var index = activities_array.length;
    $("#body-activities-list").append(`<div class="row m-0 " style="border: solid 1px #c8c8c8;border-radius: 4.4px;max-height: 100px;margin-top: 10px !important;">
                                        <div class="col-md-1 text-center" style="display: flex;">
                                        <div class="col-md-12 num" style="display: flex;align-items: center;justify-content: center;">
                                        ${cant+1}
                                        </div>
                                        </div>
                                        <div class="col-md-9 text-center">
                                        <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;">
                                        <textarea style="width: 100%;height: 70px;border-color: #c8c8c8;border-radius: 4.4px;padding: 14px;" onkeyup="changeActivitieDes(${index},${cant+1},this.value)" ></textarea>
                                        </div>
                                        </div>
                                        <div class="col-md-1 text-center">
                                        </div>
                                        <div class="col-md-1 text-center" style="display: flex;">
                                            <button  class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-trash2 m-auto bmd-btn-fab-sm__xs" onclick="removeActividad(this,${index})">
                                                <img src="./images/newsistema/iconos/trash2.svg" alt="" class="w-50">
                                            </button>
                                        </div>
                                    </div>`);

    activities_array.push({num:cant+1,descripcion:'',IdDefinicion:0,type_activity:0,frequency:0,genre:0,tools:[],events:[],dangers:[],evals:[],controls:[],active:1,Id:0})
}

function changeActivitieDes(pos,num,value){
    console.log(pos,num,value)
    activities_array[pos].descripcion = value;

}

function chargeActivitiesList(type){
    console.log('chargeActivitiesList')
    var val = "";
    var val2 = "";
    $("#ul-Actividad").empty();
    $("#ul-Actividad-2").empty();

    activities_array.forEach((Item,index) => {
        if(Item.active==1){
            $(`#ul-Actividad`).append(`<li class="mdc-list-item" data-value="${index}" tabindex="-1">
                <span class="mdc-list-item__ripple"></span>
                <span class="mdc-list-item__text">${Item.descripcion}</span>
            </li>`);
            $(`#ul-Actividad-2`).append(`<li class="mdc-list-item" data-value="${index}" tabindex="-1" onclick="selectActivity2(${index})">
                <span class="mdc-list-item__ripple"></span>
                <span class="mdc-list-item__text">${Item.descripcion}</span>
            </li>`);
        }

    })

    if(cbo_actividad!=null){
        val = cbo_actividad.value;
        cbo_actividad.destroy();
        cbo_actividad = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-actividad'));
    }else{
        cbo_actividad = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-actividad'));
        cbo_actividad.listen('MDCSelect:change', () => {
            selectActivity(cbo_actividad.value);
            console.log(`changed to ${cbo_actividad.value}`);
        });
    }

    if(cbo_actividad_2!=null){
        val2 = cbo_actividad_2.value;
        cbo_actividad_2.destroy();
        cbo_actividad_2 = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-actividad-2'));
    }else{
        cbo_actividad_2 = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-actividad-2'));
        cbo_actividad_2.listen('MDCSelect:change', () => {
            selectActivity2(cbo_actividad_2.value);
            console.log(`changed to ${cbo_actividad_2.value}`);
        });
    }

    if(type==0){
        cbo_actividad.value = "0";
        //cbo_actividad_2.value = "0";
    }else if(type==1){
        if(val2!=""){
            cbo_actividad.value = val2.toString();
        }else{
            cbo_actividad.value = "0";
        }
        //cbo_actividad_2.value = val.toString();
    }else if(type==2){
        if(val!=""){
            cbo_actividad.value = val.toString();
        }else{
            cbo_actividad.value = "0";
        }
        //cbo_actividad_2.value = val2.toString();
    }

}
function selectTypeActivity(id){
    console.log('selectTypeActivity',id);
    //let cbo_actividad = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-actividad'));

    activities_array[cbo_actividad.value].type_activity = id;

    var completo = validaContenidoActividad(cbo_actividad.value)
    if(completo == 1){
        dehabilitaControlesEvento(false);      
    }else{
        dehabilitaControlesEvento(true);
    }
}
function selectFrequency(id){
    //let cbo_actividad = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-actividad'));

    activities_array[cbo_actividad.value].frequency = id;

    var completo = validaContenidoActividad(cbo_actividad.value)
    if(completo == 1){
        dehabilitaControlesEvento(false);      
    }else{
        dehabilitaControlesEvento(true);
    }
}
function selectGenre(id){
    //let cbo_actividad = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-actividad'));

    activities_array[cbo_actividad.value].genre = id;

    var completo = validaContenidoActividad(cbo_actividad.value)
    if(completo == 1){
        dehabilitaControlesEvento(false);      
    }else{
        dehabilitaControlesEvento(true);
    }
}
function selectTool(e,id,description){

    //let cbo_actividad = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-actividad'));
    //check_2
    if($("#tool-"+id).hasClass('tool-selected')){
        console.log("esta seleccionado")
        $('#check_'+id).css('visibility', 'hidden');
        //alert("esta seleccionado");
        $("#tool-"+id).removeClass('tool-selected');

        var seleccionados = activities_array[cbo_actividad.value].tools.filter(tool => tool.id == id);
        seleccionados[0].Active = 0;

        var nTool = parseInt($("#tools-count").text())-1;
        if(nTool<10){
            $("#tools-count").text('0'+nTool);
        }else{
            $("#tools-count").text(nTool);
        }
    }else{

        //alert("NO esta seleccionado");
        $('#check_'+id).css('visibility', 'visible');
        console.log("no esta seleccionado")
        $("#tool-"+id).addClass('tool-selected');

        var seleccionados = activities_array[cbo_actividad.value].tools.filter(tool => tool.id == id);

        if(seleccionados.length>0){
            seleccionados[0].Active = 1;
        }else{
            activities_array[cbo_actividad.value].tools.push({id:id,description:description,Id:0,Active:1});
        }
        
    
        var nTool = parseInt($("#tools-count").text())+1;
        if(nTool<10){
            $("#tools-count").text('0'+nTool);
        }else{
            $("#tools-count").text(nTool);
        }
    }
}

function selectActivity(index){
    console.log('selectActivity',index);
    $("#maquina-equipo-list .tools").removeClass("tool-selected");
    /*let cbo_tipoactividad = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-tipoactividad'));
    let cbo_frecuencia = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-frecuencia'));
    let cbo_genero = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-genero'));*/
    //let cbo_actividad_2 = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-actividad-2'));

    let cant_tools = activities_array[index].tools.length;
    
    if(cant_tools>0){
        activities_array[index].tools.forEach((Item,it) => {
            if(Item.Active==1){
                $("#tool-"+Item.id).addClass("tool-selected");
            }
        }) 
    }

    cbo_tipoactividad.value = activities_array[index].type_activity.toString();
    cbo_frecuencia.value = activities_array[index].frequency.toString();
    cbo_genero.value = activities_array[index].genre.toString();
    cbo_actividad_2.value = index.toString();
    
    selectActivity2(index)

}
function selectActivity2(index){

    

    var completo = validaContenidoActividad(index)
    if(visualizacion!="Ver"){
    validaEventosActividad(index);
    }
    if(completo == 1){
        dehabilitaControlesEvento(false);

        $("#ul-Maq-Equip").empty();

        activities_array[index].tools.forEach((Item,it) => {
            if(Item.Active == 1){
                $(`#ul-Maq-Equip`).append(`<li class="mdc-list-item" data-value="${Item.id}" tabindex="-1"">
                    <span class="mdc-list-item__ripple"></span>
                    <span class="mdc-list-item__text">${Item.description}</span>
                </li>`);            
            }

        }) 

        if(cbo_maq_equip!=null){
            cbo_maq_equip.destroy();
            cbo_maq_equip = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-maq-equip'));
        }else{
            cbo_maq_equip = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-maq-equip'));
            cbo_maq_equip.listen('MDCSelect:change', () => {
                //selectActivity(cbo_maq_equip.value);
                console.log(`changed to ${cbo_maq_equip.value}`);
            });
        }

        chargeEvents(index);        
    }else{
        dehabilitaControlesEvento(true);
    }
    if(visualizacion!="Ver"){
        validaEventosActividad(index);
        validaPeligrosActividad(index); 
    }
    
    clearEvent();
}
function validaContenidoActividad(index){

    if(activities_array[index].type_activity == 0 || activities_array[index].frequency == 0 || activities_array[index].genre == 0){
        return 0;
    }

    return 1;
}
function validaEventosActividad(index){
    let cantEvents = activities_array[index].events.length;
    if(cantEvents==0){
        $("#btn_step4").attr('disabled',true);
    }else{
        $("#btn_step4").attr('disabled',false);
    }
}
function validaPeligrosSeleccionados(index,indexe,peligro){
    var existe = 0;

    activities_array[index].events[indexe].dangers.forEach((Danger,di) => {
        if(Danger.dangerId == peligro){
            existe = 1;
        }
    })

    return existe;
}
function validaPeligrosActividad(index){
    let cantDangers = 0;

    activities_array[index].events.forEach((Event,ai) => {

        if(Event.dangers.length>0){
            cantDangers = cantDangers + Event.dangers.length;
        }

    }) 

    if(cantDangers==0){
        $("#btn_step5").attr('disabled',true);
        $("#btn_step6").attr('disabled',true);
    }else{
        $("#btn_step5").attr('disabled',false);
        $("#btn_step6").attr('disabled',false);
    }
}
function dehabilitaControlesEvento(status){
    
    $("#txt_descripcion_evento").attr('disabled',status);
}
function habilitaAddEvent(){
    console.log("habilitaaddevent")
    if($("#txt_descripcion_evento").val().length>0){
        console.log("mayor a cero")
        $("#btn_add_event").attr('disabled',false);
    }else{
        console.log("no")
        $("#btn_add_event").attr('disabled',true);
    }
}
function selectRisk(severidad){
    console.log("selectRisk",severidad)
    $("#txt_indice_severidad").val(severidad);
}
function selectRisk2(severidad){
    console.log("selectRisk2",severidad)
    $("#txt_indice_severidad_2").val(severidad);
}
function selectRiskKey(event,severidad){
    console.log("selectRisk",severidad)
    if(event.key === 'Enter') {
        $("#txt_indice_severidad").val(severidad);
    }
}
function selectRiskKey2(event,severidad){
    console.log("selectRisk2",severidad)
    if(event.key === 'Enter') {
        $("#txt_indice_severidad_2").val(severidad);
    }
}

function selectProbability(probability){
    console.log("probabilidad",probability)

    let severidad = $("#txt_indice_severidad").val();

    let riesgo = parseInt(severidad)*parseInt(probability);

    $("#txt_indice_riesgo").val(riesgo);
}

function selectProbability2(probability){
    console.log("probabilidad 2",probability)

    let severidad = $("#txt_indice_severidad_2").val();

    let riesgo = parseInt(severidad)*parseInt(probability);

    $("#txt_indice_riesgo_2").val(riesgo);
}

function chargeEvents(index){
    console.log('chargeEvents',index);
    //let cbo_actividad_2 = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-actividad-2'));

    let actividad_label_1 = mdc.textField.MDCTextField.attachTo(document.querySelector('.actividad-label-1'));
    let actividad_label_2 = mdc.textField.MDCTextField.attachTo(document.querySelector('.actividad-label-2'));
    let actividad_label_3 = mdc.textField.MDCTextField.attachTo(document.querySelector('.actividad-label-3'));
    console.log("texto activity 2",cbo_actividad_2.selectedText.textContent);
    actividad_label_1.value = cbo_actividad_2.selectedText.textContent;
    actividad_label_2.value = cbo_actividad_2.selectedText.textContent;
    actividad_label_3.value = cbo_actividad_2.selectedText.textContent;

    $("#ul-Evento").empty();

    activities_array[index].events.forEach((Item,ei) => {
        if(Item.active==1){
            $(`#ul-Evento`).append(`<li class="mdc-list-item" data-value="${ei}" tabindex="-1"">
                <span class="mdc-list-item__ripple"></span>
                <span class="mdc-list-item__text">${Item.description}</span>
            </li>`);            
        }

    }) 

    if(cbo_evento!=null){
        cbo_evento.destroy();
        cbo_evento = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-evento'));
    }else{
        cbo_evento = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-evento'));
        cbo_evento.listen('MDCSelect:change', () => {
            //selectActivity(cbo_evento.value);
            console.log(`changed to ${cbo_evento.value}`);
        });
    }
}

function chargeRisks(index){
    console.log('chargeEvents',index);
    //let cbo_actividad_2 = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-actividad-2'));

    let actividad_label_1 = mdc.textField.MDCTextField.attachTo(document.querySelector('.actividad-label-1'));
    let actividad_label_2 = mdc.textField.MDCTextField.attachTo(document.querySelector('.actividad-label-2'));
    let actividad_label_3 = mdc.textField.MDCTextField.attachTo(document.querySelector('.actividad-label-3'));
    console.log("texto activity 2",cbo_actividad_2.selectedText.textContent);
    actividad_label_1.value = cbo_actividad_2.selectedText.textContent;
    actividad_label_2.value = cbo_actividad_2.selectedText.textContent;
    actividad_label_3.value = cbo_actividad_2.selectedText.textContent;

    //let cbo_riesgo = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-riesgo'));
    //let cbo_riesgo_2 = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-riesgo-2'));

    $("#ul-Riesgo").empty();
    $("#ul-Riesgo-2").empty();

    activities_array[index].events.forEach((Event,Ev) => {

        Event.dangers.forEach((Danger,Da) => {
            
            if(Danger.Active==1){
                let curDanger = pericon.filter(per=>per.Id== Danger.dangerId);
                $(`#ul-Riesgo`).append(`<li class="mdc-list-item" data-value="${Ev}-${Da}" tabindex="-1" onclick="selectRisk(${curDanger[0].Severidad})" onkeydown="selectRiskKey(this,${curDanger[0].Severidad})">
                                            <span class="mdc-list-item__ripple"></span>
                                            <span class="mdc-list-item__text">${curDanger[0].Riesgo}</span>
                                        </li>`);

                $(`#ul-Riesgo-2`).append(`<li class="mdc-list-item" data-value="${Ev}-${Da}" tabindex="-1" onclick="selectRisk2(${curDanger[0].Severidad})" onkeydown="selectRiskKey2(this,${curDanger[0].Severidad})">
                                        <span class="mdc-list-item__ripple"></span>
                                        <span class="mdc-list-item__text">${curDanger[0].Riesgo}</span>
                                    </li>`);
            }

        })

    })   

    if(cbo_riesgo!=null){
        cbo_riesgo.destroy();
        cbo_riesgo = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-riesgo'));
    }else{
        cbo_riesgo = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-riesgo'));
        /*cbo_riesgo.listen('MDCSelect:change', () => {
            //selectActivity(cbo_riesgo.value);
            console.log(`changed to ${cbo_riesgo.value}`);
        });*/
    }
    if(cbo_riesgo_2!=null){
        cbo_riesgo_2.destroy();
        cbo_riesgo_2 = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-riesgo-2'));
    }else{
        cbo_riesgo_2 = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-riesgo-2'));
        /*cbo_riesgo_2.listen('MDCSelect:change', () => {
            //selectActivity(cbo_riesgo_2.value);
            console.log(`changed to ${cbo_riesgo_2.value}`);
        });*/
    }
    

}

function addEvent(){

    let cbo_maq_equip = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-maq-equip'));
    //let cbo_actividad_2 = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-actividad-2'));
    let evento_descripcion = $("#txt_descripcion_evento").val();

    var index = activities_array[cbo_actividad_2.value].events.length;
    var length = $("#body-events-list .row").length + 1 ;
    $("#body-events-list").append(`<div class="row m-0 " style="border: solid 1px #c8c8c8;border-radius: 4.4px;min-height: 100px;margin-top: 10px !important;">

                                        <div class="col-md-1 text-center d-flex">
                                            <div class="col-md-12 num" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${length}
                                            </div>
                                        </div>
                                        <div class="col-md-4 text-center d-flex">
                                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${cbo_actividad_2.selectedText.textContent}
                                            </div>
                                        </div>

                                        <div class="col-md-2 text-center d-flex">
                                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${cbo_maq_equip.selectedText.textContent}
                                            </div>
                                        </div>

                                        <div class="col-md-3 text-center d-flex">
                                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${evento_descripcion}
                                            </div>
                                        </div>

                                        <div class="col-md-1 text-center" style="display: flex;">
                                            <button type="button" class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-add m-auto bmd-btn-fab-sm__xs" onclick="editEvent(this,${index},${cbo_actividad_2.value})">
                                                <img src="./images/newsistema/iconos/edit1.svg" alt="" class="w-50">
                                            </button>
                                        </div>

                                        <div class="col-md-1 text-center" style="display: flex;">
                                            <button  class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-trash2 m-auto bmd-btn-fab-sm__xs" onclick="removeEvent(this,${index},${cbo_actividad_2.value})">
                                                <img src="./images/newsistema/iconos/trash2.svg" alt="" class="w-50">
                                            </button>
                                        </div>
                                    </div>`);
    let cbmaqeq=0;
    if(cbo_maq_equip.value!=""){
        cbmaqeq = parseInt(cbo_maq_equip.value);
    }
    activities_array[cbo_actividad_2.value].events.push({maqid:cbmaqeq,description:evento_descripcion,dangers:[],active:1,Id:0});
    validaEventosActividad(cbo_actividad_2.value)
    clearEvent();
}

function addDangers(){

    //let cbo_actividad_2 = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-actividad-2'));
    //let cbo_evento = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-evento'));
    //let cbo_peligro = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-peligro'));

    var pericon_data = pericon.filter(per=>per.Id == cbo_peligro.value);

    var maq =  activities_array[cbo_actividad_2.value].events[cbo_evento.value].maqid;

    var existepeligro = validaPeligrosSeleccionados(cbo_actividad_2.value,cbo_evento.value,cbo_peligro.value);

    if(existepeligro==1){
        $("#modal-mantenimiento-observacion").removeClass("fade").modal('hide');
        $("#modalAviso").modal("show").addClass("fade");
        $("#titleMessageAviso").text("Aviso");
        $("#messageAviso").text("El peligro ya ha sido seleccionado para el evento indicado.");
        return;
    }

    var maq_data = maquinasEquipos.filter(m=>m.Id==maq);
    var maq_des = "-";
    if(maq_data!=""){
        maq_des = maq_data[0].Description;
    }
    var cant = $("#body-peligros-list .row").length;

    $("#body-peligros-list").append(`<div class="row m-0 " style="border: solid 1px #c8c8c8;border-radius: 4.4px;min-height: 100px;margin-top: 10px !important;">
                                        <div class="col-md-1 text-center d-flex">
                                            <div class="col-md-12 num" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${cant+1}
                                            </div>
                                        </div>

                                        <div class="col-md-2 text-center d-flex">
                                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${cbo_evento.selectedText.textContent}
                                            </div>
                                        </div>

                                        <div class="col-md-2 text-center d-flex">
                                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${maq_des}
                                            </div>
                                        </div>

                                        <div class="col-md-2 text-center" style="display: flex;">
                                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${pericon_data[0].Peligro}
                                            </div>
                                        </div>

                                        <div class="col-md-2 text-center" style="display: flex;">
                                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${pericon_data[0].Riesgo}
                                            </div>
                                        </div>

                                        <div class="col-md-2 text-center" style="display: flex;">
                                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${pericon_data[0].Consecuencia}
                                            </div>
                                        </div>

                                        <div class="col-md-1 text-center" style="display: flex;">
                                            <button  class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-trash2 m-auto bmd-btn-fab-sm__xs" onclick="removePeligro(this,${cbo_evento.value},${cbo_actividad_2.value},${cant})">
                                                <img src="./images/newsistema/iconos/trash2.svg" alt="" class="w-50">
                                            </button>
                                        </div>
                                    </div>`);

    activities_array[cbo_actividad_2.value].events[cbo_evento.value].dangers.push({dangerId:cbo_peligro.value,evals:[],controls:[],Active:1,Id:0});
    validaPeligrosActividad(cbo_actividad_2.value);

    clearDanger();
}

function clearDanger(){
    cbo_peligro.selectedIndex = "";
    cbo_evento.selectedIndex = "";
}

function removePeligro(component,indexEvent,indexAct,index){
    //let cbo_actividad_2 = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-actividad-2'));
    $(component).parent('div').parent('div').remove();
    activities_array[indexAct].events[indexEvent].dangers[index].Active=0;
    reseteaNumeracion($("#body-peligros-list .row"));
}

function addRiskEval(){

    //let cbo_riesgo = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-riesgo'));
    //dividimos el valor indice lista evento - indice lista peligro en evento
    var risk_values = cbo_riesgo.value.split("-");

    //let cbo_probabilidad = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-probabilidad'));

    if(cbo_riesgo.value == "" || cbo_probabilidad.value == ""){
        $("#modal-mantenimiento-observacion").removeClass("fade").modal('hide');
        $("#modalAviso").modal("show").addClass("fade");
        $("#titleMessageAviso").text("Aviso");
        $("#messageAviso").text("Debe seleccionar un riesgo y una probabilidad.");
        return;
    }

    //let cbo_actividad_2 = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-actividad-2'));

    let danger_id = activities_array[cbo_actividad_2.value].events[risk_values[0]].dangers[risk_values[1]].dangerId;

    var pericon_data = pericon.filter(per=>per.Id == danger_id);

    let control_fisico = $("#txt_control_fisico").val();

    let control_administrativo = $("#txt_control_administrativo").val();

    //let cbo_epp = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-epp'));

    

    let indice_severidad = $("#txt_indice_severidad").val();

    let indice_riesgo = $("#txt_indice_riesgo").val();

    let catalogo_riesgo = "";
    let color_catalogo = "";
    let significancia = "";
    let color_significancia = "";

    if(indice_riesgo>=1&&indice_riesgo<=2){
        catalogo_riesgo = "Aceptable";
        color_catalogo = "#D9E2C0";
        significancia = "No significativo";
        color_significancia = "#4EAC5B";
    }else if(indice_riesgo>=3&&indice_riesgo<=4){
        catalogo_riesgo = "Tolerable";
        color_catalogo = "#4EAC5B";
        significancia = "No significativo";
        color_significancia = "#4EAC5B";
    }else if(indice_riesgo>=6&&indice_riesgo<=9){
        catalogo_riesgo = "Importante";
        color_catalogo = "#F6C142";
        significancia = "Significativo";
        color_significancia = "#EB3223";
    }else if(indice_riesgo>=12&&indice_riesgo<=16){
        catalogo_riesgo = "Intolerable";
        color_catalogo = "#EB3223";
        significancia = "Significativo";
        color_significancia = "#EB3223";
    }

    var cant = $("#body-riskeval-list .row").length;

    $("#body-riskeval-list").append(`<div class="row m-0 " style="border: solid 1px #c8c8c8;border-radius: 4.4px;min-height: 100px;margin-top: 10px !important;">
                                        
                                        <div class="col-md-1 text-center d-flex">
                                            <div class="col-md-12 num" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${cant+1}
                                            </div>
                                        </div>

                                        <div class="col-md-1 text-center d-flex">
                                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${pericon_data[0].Riesgo}
                                            </div>
                                        </div>

                                        <div class="col-md-1 text-center d-flex">
                                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${control_fisico?control_fisico:"-"}
                                            </div>
                                        </div>

                                        <div class="col-md-2 text-center" style="display: flex;">
                                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${control_administrativo?control_administrativo:"-"}
                                            </div>
                                        </div>

                                        <div class="col-md-1 text-center" style="display: flex;">
                                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${cbo_epp.value!="0"?cbo_epp.selectedText.textContent:"-"}
                                            </div>
                                        </div>

                                        <div class="col-md-1 text-center" style="display: flex;">
                                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${cbo_probabilidad.value}
                                            </div>
                                        </div>

                                        <div class="col-md-1 text-center" style="display: flex;">
                                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${indice_severidad}
                                            </div>
                                        </div>

                                        <div class="col-md-1 text-center" style="display: flex;">
                                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${indice_riesgo}
                                            </div>
                                        </div>

                                        <div class="col-md-1 text-center" style="display: flex;">
                                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;color:${color_catalogo};">
                                                ${catalogo_riesgo}
                                            </div>
                                        </div>

                                        <div class="col-md-1 text-center" style="display: flex;">
                                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;color:${color_significancia};">
                                                ${significancia}
                                            </div>
                                        </div>

                                        <div class="col-md-1 text-center" style="display: flex;">
                                            <button type="button" class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-add m-auto bmd-btn-fab-sm__xs" onclick="editRiskEval(this,${risk_values[0]},${cbo_actividad_2.value},${risk_values[1]},${cant})">
                                                <img src="./images/newsistema/iconos/edit1.svg" alt="" class="w-50">
                                            </button>
                                            <button  class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-trash2 m-auto bmd-btn-fab-sm__xs" onclick="removeRiskEval(this,${risk_values[0]},${cbo_actividad_2.value},${risk_values[1]},${cant})">
                                                <img src="./images/newsistema/iconos/trash2.svg" alt="" class="w-50">
                                            </button>
                                        </div>

                                    </div>`);


    activities_array[cbo_actividad_2.value].events[risk_values[0]].dangers[risk_values[1]].evals.push({control_fisico:control_fisico,control_administrativo:control_administrativo,epp:cbo_epp.value,probabilidad:cbo_probabilidad.value,indice_severidad:indice_severidad,indice_riesgo:indice_riesgo,catalogo_riesgo:catalogo_riesgo,significancia:significancia,Active:1,Id:0})
    
    clearEval();
}
function clearEval(){
    cbo_riesgo.selectedIndex = "";
    //let cbo_probabilidad = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-probabilidad'));
    cbo_probabilidad.selectedIndex = "";
    $("#txt_indice_severidad").val("");
    $("#txt_indice_riesgo").val("");
    $("#txt_control_fisico").val("");
    $("#txt_control_administrativo").val("");

    componentEvalEdit = "";
    indexEvalEdit = "";
    indexEvalEventEdit = "";
    indexEvalDangerEdit = "";

    //let cbo_epp = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-epp'));
    cbo_epp.selectedIndex = "";

    $("#btn_edit_eval").addClass('d-none');
    $("#btn_cancel_edit_eval").addClass('d-none');
    $("#btn_add_eval").removeClass('d-none');
}
function removeRiskEval(component,indexEvent,indexAct,indexDanger,index){
    $(component).parent('div').parent('div').remove();
    activities_array[indexAct].events[indexEvent].dangers[indexDanger].evals[index].Active=0;
    reseteaNumeracion($("#body-riskeval-list .row"));
}
function updateRiskEval(){

    var risk_values = cbo_riesgo.value.split("-");

    if(cbo_riesgo.value == "" || cbo_probabilidad.value == ""){
        $("#modal-mantenimiento-observacion").removeClass("fade").modal('hide');
        $("#modalAviso").modal("show").addClass("fade");
        $("#titleMessageAviso").text("Aviso");
        $("#messageAviso").text("Debe seleccionar un riesgo y una probabilidad.");
        return;
    }

    //let cbo_actividad_2 = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-actividad-2'));

    let danger_id = activities_array[cbo_actividad_2.value].events[risk_values[0]].dangers[risk_values[1]].dangerId;

    var pericon_data = pericon.filter(per=>per.Id == danger_id);

    let control_fisico = $("#txt_control_fisico").val();

    let control_administrativo = $("#txt_control_administrativo").val();   

    let indice_severidad = $("#txt_indice_severidad").val();

    let indice_riesgo = $("#txt_indice_riesgo").val();

    let catalogo_riesgo = "";
    let color_catalogo = "";
    let significancia = "";
    let color_significancia = "";

    if(indice_riesgo>=1&&indice_riesgo<=2){
        catalogo_riesgo = "Aceptable";
        color_catalogo = "#D9E2C0";
        significancia = "No significativo";
        color_significancia = "#4EAC5B";
    }else if(indice_riesgo>=3&&indice_riesgo<=4){
        catalogo_riesgo = "Tolerable";
        color_catalogo = "#4EAC5B";
        significancia = "No significativo";
        color_significancia = "#4EAC5B";
    }else if(indice_riesgo>=6&&indice_riesgo<=9){
        catalogo_riesgo = "Importante";
        color_catalogo = "#F6C142";
        significancia = "Significativo";
        color_significancia = "#EB3223";
    }else if(indice_riesgo>=12&&indice_riesgo<=16){
        catalogo_riesgo = "Intolerable";
        color_catalogo = "#EB3223";
        significancia = "Significativo";
        color_significancia = "#EB3223";
    }

    $(componentEvalEdit).parent('div').parent('div').find('.field').eq(0).text(pericon_data.Riesgo)
    $(componentEvalEdit).parent('div').parent('div').find('.field').eq(1).text(control_fisico)
    $(componentEvalEdit).parent('div').parent('div').find('.field').eq(2).text(control_administrativo)
    $(componentEvalEdit).parent('div').parent('div').find('.field').eq(3).text(cbo_epp.value!="0"?cbo_epp.selectedText.textContent:"-")
    $(componentEvalEdit).parent('div').parent('div').find('.field').eq(4).text(cbo_probabilidad.value)
    $(componentEvalEdit).parent('div').parent('div').find('.field').eq(5).text(indice_severidad)
    $(componentEvalEdit).parent('div').parent('div').find('.field').eq(6).text(indice_riesgo)
    $(componentEvalEdit).parent('div').parent('div').find('.field').eq(7).text(catalogo_riesgo)
    $(componentEvalEdit).parent('div').parent('div').find('.field').eq(8).text(significancia)

    //push({maqid:cbo_maq_equip.value,description:evento_descripcion,dangers:[],active:1,Id:0})
    activities_array[cbo_actividad_2.value].events[indexEvalEventEdit].dangers[indexEvalDangerEdit].evals[indexEvalEdit].Riesgo = danger_id;
    activities_array[cbo_actividad_2.value].events[indexEvalEventEdit].dangers[indexEvalDangerEdit].evals[indexEvalEdit].indice_severidad = indice_severidad;
    activities_array[cbo_actividad_2.value].events[indexEvalEventEdit].dangers[indexEvalDangerEdit].evals[indexEvalEdit].indice_riesgo = indice_riesgo;
    activities_array[cbo_actividad_2.value].events[indexEvalEventEdit].dangers[indexEvalDangerEdit].evals[indexEvalEdit].probabilidad = cbo_probabilidad.value;
    activities_array[cbo_actividad_2.value].events[indexEvalEventEdit].dangers[indexEvalDangerEdit].evals[indexEvalEdit].epp = cbo_epp.value;
    activities_array[cbo_actividad_2.value].events[indexEvalEventEdit].dangers[indexEvalDangerEdit].evals[indexEvalEdit].control_fisico = control_fisico;
    activities_array[cbo_actividad_2.value].events[indexEvalEventEdit].dangers[indexEvalDangerEdit].evals[indexEvalEdit].control_administrativo = control_administrativo;
    activities_array[cbo_actividad_2.value].events[indexEvalEventEdit].dangers[indexEvalDangerEdit].evals[indexEvalEdit].catalogo_riesgo = catalogo_riesgo;
    activities_array[cbo_actividad_2.value].events[indexEvalEventEdit].dangers[indexEvalDangerEdit].evals[indexEvalEdit].significancia = significancia;

    clearEval();
}
function editRiskEval(component,indexEvent,indexAct,indexDanger,index){
    console.log(component,indexEvent,indexAct,indexDanger,index)
    
    //let cbo_actividad_2 = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-actividad-2'));
    console.log(indexAct)
    cbo_actividad.value = indexAct.toString();

    componentEvalEdit = component;
    indexEvalEdit = index;
    indexEvalEventEdit = indexEvent;
    indexEvalDangerEdit = indexDanger;

    let indice_severidad =  mdc.textField.MDCTextField.attachTo(document.querySelector('.indice-severidad'));
    indice_severidad.value = activities_array[indexAct].events[indexEvent].dangers[indexDanger].evals[index].indice_severidad.toString();

    let indice_riesgo =  mdc.textField.MDCTextField.attachTo(document.querySelector('.indice-riesgo'));
    indice_riesgo.value = activities_array[indexAct].events[indexEvent].dangers[indexDanger].evals[index].indice_riesgo.toString();


    cbo_riesgo.value = indexEvent+"-"+indexDanger;

    cbo_probabilidad.value = activities_array[indexAct].events[indexEvent].dangers[indexDanger].evals[index].probabilidad.toString();
    cbo_epp.value = activities_array[indexAct].events[indexEvent].dangers[indexDanger].evals[index].epp.toString();
    
    let control_fisico =  mdc.textField.MDCTextField.attachTo(document.querySelector('.control-fisico'));
    control_fisico.value = activities_array[indexAct].events[indexEvent].dangers[indexDanger].evals[index].control_fisico.toString();

    let control_administrativo =  mdc.textField.MDCTextField.attachTo(document.querySelector('.control-administrativo'));
    control_administrativo.value = activities_array[indexAct].events[indexEvent].dangers[indexDanger].evals[index].control_administrativo.toString();

    $("#btn_edit_eval").removeClass('d-none');
    $("#btn_cancel_edit_eval").removeClass('d-none');
    $("#btn_add_eval").addClass('d-none');
}
function validaObligatoriosEvaluacion(){

}
function addControl(){

    //let cbo_riesgo = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-riesgo-2'));
    //dividimos el valor indice lista evento - indice lista peligro en evento
    var risk_values = cbo_riesgo_2.value.split("-");

    //let cbo_actividad_2 = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-actividad-2'));

    //let danger_id = activities_array[cbo_actividad_2.value].events[risk_values[0]].dangers[risk_values[1]].dangerId;

    //var pericon_data = pericon.filter(per=>per.Id == danger_id);

    let eliminacion_riesgo = $("#txt_eliminacion_riesgo").val();

    let situacion = $("#txt_sustitucion").val();

    let control_ingenieria = $("#txt_control_ingenieria").val();

    let control_administrativo = $("#txt_control_administrativo_2").val();


    //let cbo_epp = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-epp-2'));

    //let cbo_probabilidad = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-probabilidad-2'));

    let indice_severidad = $("#txt_indice_severidad_2").val();

    let indice_riesgo = $("#txt_indice_riesgo_2").val();

    let catalogo_riesgo = "";
    let color_catalogo = "";
    let significancia = "";
    let color_significancia = "";

    if(indice_riesgo>=1&&indice_riesgo<=2){
        catalogo_riesgo = "Aceptable";
        color_catalogo = "#D9E2C0";
        significancia = "No significativo";
        color_significancia = "#4EAC5B";
    }else if(indice_riesgo>=3&&indice_riesgo<=4){
        catalogo_riesgo = "Tolerable";
        color_catalogo = "#4EAC5B";
        significancia = "No significativo";
        color_significancia = "#4EAC5B";
    }else if(indice_riesgo>=6&&indice_riesgo<=9){
        catalogo_riesgo = "Importante";
        color_catalogo = "#F6C142";
        significancia = "Significativo";
        color_significancia = "#EB3223";
    }else if(indice_riesgo>=12&&indice_riesgo<=16){
        catalogo_riesgo = "Intolerable";
        color_catalogo = "#EB3223";
        significancia = "Significativo";
        color_significancia = "#EB3223";
    }

    var cant = $("#body-controls-list .row").length;

    $("#body-controls-list").append(`<div class="row m-0 " style="border: solid 1px #c8c8c8;border-radius: 4.4px;min-height: 100px;margin-top: 10px !important;">
                                        
                                        <div class="col-md-1 text-center d-flex">
                                            <div class="col-md-12 num" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${cant+1}
                                            </div>
                                        </div>

                                        <div class="col-md-1 text-center d-flex">
                                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${eliminacion_riesgo?eliminacion_riesgo:"-"}
                                            </div>
                                        </div>

                                        <div class="col-md-1 text-center d-flex">
                                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${situacion?situacion:"-"}
                                            </div>
                                        </div>

                                        <div class="col-md-1 text-center d-flex">
                                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${control_ingenieria?control_ingenieria:"-"}
                                            </div>
                                        </div>

                                        <div class="col-md-1 text-center" style="display: flex;">
                                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${control_administrativo?control_administrativo:"-"}
                                            </div>
                                        </div>

                                        <div class="col-md-1 text-center" style="display: flex;">
                                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${cbo_epp_2.value!="0"?cbo_epp_2.selectedText.textContent:"-"}
                                            </div>
                                        </div>

                                        <div class="col-md-1 text-center" style="display: flex;">
                                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${cbo_probabilidad_2.value}
                                            </div>
                                        </div>

                                        <div class="col-md-1 text-center" style="display: flex;">
                                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${indice_severidad}
                                            </div>
                                        </div>

                                        <div class="col-md-1 text-center" style="display: flex;">
                                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;">
                                                ${indice_riesgo}
                                            </div>
                                        </div>

                                        <div class="col-md-1 text-center" style="display: flex;">
                                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;color:${color_catalogo}";>
                                                ${catalogo_riesgo}
                                            </div>
                                        </div>

                                        <div class="col-md-1 text-center" style="display: flex;">
                                            <div class="col-md-12 field" style="padding-top: 6px;padding-bottom: 6px;display: flex;justify-content: center;align-items: center;color:${color_significancia}";>
                                                ${significancia}
                                            </div>
                                        </div>

                                        <div class="col-md-1 text-center" style="display: flex;">
                                            <button type="button" class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-add m-auto bmd-btn-fab-sm__xs" onclick="editControl(this,${risk_values[0]},${cbo_actividad_2.value},${risk_values[1]},${cant})">
                                                <img src="./images/newsistema/iconos/edit1.svg" alt="" class="w-50">
                                            </button>
                                            <button  class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-trash2 m-auto bmd-btn-fab-sm__xs" onclick="removeControl(this,${risk_values[0]},${cbo_actividad_2.value},${risk_values[1]},${cant})">
                                                <img src="./images/newsistema/iconos/trash2.svg" alt="" class="w-50">
                                            </button>
                                        </div>
                                    </div>`);


    activities_array[cbo_actividad_2.value].events[risk_values[0]].dangers[risk_values[1]].controls.push({eliminacion_riesgo:eliminacion_riesgo,situacion:situacion,control_ingenieria:control_ingenieria,control_administrativo:control_administrativo,epp:cbo_epp_2.value,probabilidad:cbo_probabilidad_2.value,indice_severidad:indice_severidad,indice_riesgo:indice_riesgo,catalogo_riesgo:catalogo_riesgo,significancia:significancia,Active:1,Id:0})
    clearControl()
}
function clearControl(){
    cbo_riesgo_2.selectedIndex = "";
    
    cbo_probabilidad_2.selectedIndex = "";
    $("#txt_eliminacion_riesgo").val("");

    $("#txt_sustitucion").val("");

    $("#txt_control_ingenieria").val("");

    $("#txt_control_administrativo_2").val("");

    $("#txt_indice_severidad_2").val("");

    $("#txt_indice_riesgo_2").val("");

    cbo_epp_2.selectedIndex = "";

    componentControlEdit = "";
    indexControlEventEdit = "";
    indexControlDangerEdit = "";
    indexControlEdit = "";

    $("#btn_edit_control").addClass('d-none');
    $("#btn_cancel_edit_control").addClass('d-none');
    $("#btn_add_control").removeClass('d-none');

}
function removeControl(component,indexEvent,indexAct,indexDanger,index){
    $(component).parent('div').parent('div').remove();
    activities_array[indexAct].events[indexEvent].dangers[indexDanger].controls[index].Active=0;
    reseteaNumeracion($("#body-controls-list .row"));
}
function updateControl(){

    var risk_values = cbo_riesgo_2.value.split("-");

    if(cbo_riesgo_2.value == "" || cbo_probabilidad_2.value == ""){
        $("#modal-mantenimiento-observacion").removeClass("fade").modal('hide');
        $("#modalAviso").modal("show").addClass("fade");
        $("#titleMessageAviso").text("Aviso");
        $("#messageAviso").text("Debe seleccionar un riesgo y una probabilidad.");
        return;
    }

    let danger_id = activities_array[cbo_actividad_2.value].events[risk_values[0]].dangers[risk_values[1]].Riesgo;

    let eliminacion_riesgo = $("#txt_eliminacion_riesgo").val();

    let situacion = $("#txt_sustitucion").val();

    let control_ingenieria = $("#txt_control_ingenieria").val();

    let control_administrativo = $("#txt_control_administrativo_2").val(); 

    let indice_severidad = $("#txt_indice_severidad_2").val();

    let indice_riesgo = $("#txt_indice_riesgo_2").val();

    let catalogo_riesgo = "";
    let color_catalogo = "";
    let significancia = "";
    let color_significancia = "";

    if(indice_riesgo>=1&&indice_riesgo<=2){
        catalogo_riesgo = "Aceptable";
        color_catalogo = "#D9E2C0";
        significancia = "No significativo";
        color_significancia = "#4EAC5B";
    }else if(indice_riesgo>=3&&indice_riesgo<=4){
        catalogo_riesgo = "Tolerable";
        color_catalogo = "#4EAC5B";
        significancia = "No significativo";
        color_significancia = "#4EAC5B";
    }else if(indice_riesgo>=6&&indice_riesgo<=9){
        catalogo_riesgo = "Importante";
        color_catalogo = "#F6C142";
        significancia = "Significativo";
        color_significancia = "#EB3223";
    }else if(indice_riesgo>=12&&indice_riesgo<=16){
        catalogo_riesgo = "Intolerable";
        color_catalogo = "#EB3223";
        significancia = "Significativo";
        color_significancia = "#EB3223";
    }

    $(componentControlEdit).parent('div').parent('div').find('.field').eq(0).text(eliminacion_riesgo)
    $(componentControlEdit).parent('div').parent('div').find('.field').eq(1).text(situacion)
    $(componentControlEdit).parent('div').parent('div').find('.field').eq(2).text(control_ingenieria)
    $(componentControlEdit).parent('div').parent('div').find('.field').eq(3).text(control_administrativo)
    $(componentControlEdit).parent('div').parent('div').find('.field').eq(4).text(cbo_epp_2.value!="0"?cbo_epp_2.selectedText.textContent:"-")
    $(componentControlEdit).parent('div').parent('div').find('.field').eq(5).text(cbo_probabilidad_2.value)
    $(componentControlEdit).parent('div').parent('div').find('.field').eq(6).text(indice_severidad)
    $(componentControlEdit).parent('div').parent('div').find('.field').eq(7).text(indice_riesgo)
    $(componentControlEdit).parent('div').parent('div').find('.field').eq(8).text(catalogo_riesgo)
    $(componentControlEdit).parent('div').parent('div').find('.field').eq(9).text(significancia)
    

    //push({maqid:cbo_maq_equip.value,description:evento_descripcion,dangers:[],active:1,Id:0})
    activities_array[cbo_actividad_2.value].events[indexControlEventEdit].dangers[indexControlDangerEdit].controls[indexControlEdit].Riesgo = danger_id;
    activities_array[cbo_actividad_2.value].events[indexControlEventEdit].dangers[indexControlDangerEdit].controls[indexControlEdit].indice_severidad = indice_severidad;
    activities_array[cbo_actividad_2.value].events[indexControlEventEdit].dangers[indexControlDangerEdit].controls[indexControlEdit].indice_riesgo = indice_riesgo;
    activities_array[cbo_actividad_2.value].events[indexControlEventEdit].dangers[indexControlDangerEdit].controls[indexControlEdit].probabilidad = cbo_probabilidad_2.value;
    activities_array[cbo_actividad_2.value].events[indexControlEventEdit].dangers[indexControlDangerEdit].controls[indexControlEdit].epp = cbo_epp_2.value;
    activities_array[cbo_actividad_2.value].events[indexControlEventEdit].dangers[indexControlDangerEdit].controls[indexControlEdit].eliminacion_riesgo = eliminacion_riesgo;
    activities_array[cbo_actividad_2.value].events[indexControlEventEdit].dangers[indexControlDangerEdit].controls[indexControlEdit].situacion = situacion;
    activities_array[cbo_actividad_2.value].events[indexControlEventEdit].dangers[indexControlDangerEdit].controls[indexControlEdit].control_ingenieria = control_ingenieria;
    activities_array[cbo_actividad_2.value].events[indexControlEventEdit].dangers[indexControlDangerEdit].controls[indexControlEdit].control_administrativo = control_administrativo;
    activities_array[cbo_actividad_2.value].events[indexControlEventEdit].dangers[indexControlDangerEdit].controls[indexControlEdit].catalogo_riesgo = catalogo_riesgo;
    activities_array[cbo_actividad_2.value].events[indexControlEventEdit].dangers[indexControlDangerEdit].controls[indexControlEdit].significancia = significancia;

    clearControl();
}
function editControl(component,indexEvent,indexAct,indexDanger,index){
    console.log(component,indexEvent,indexAct,indexDanger,index)
    
    //let cbo_actividad_2 = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-actividad-2'));
    console.log(indexAct)
    cbo_actividad.value = indexAct.toString();

    componentControlEdit = component;
    indexControlEdit = index;
    indexControlEventEdit = indexEvent;
    indexControlDangerEdit = indexDanger;

    let indice_severidad =  mdc.textField.MDCTextField.attachTo(document.querySelector('.indice-severidad-2'));
    indice_severidad.value = activities_array[indexAct].events[indexEvent].dangers[indexDanger].controls[index].indice_severidad.toString();

    let indice_riesgo =  mdc.textField.MDCTextField.attachTo(document.querySelector('.indice-riesgo-2'));
    indice_riesgo.value = activities_array[indexAct].events[indexEvent].dangers[indexDanger].controls[index].indice_riesgo.toString();


    cbo_riesgo_2.value = indexEvent+"-"+indexDanger;

    cbo_probabilidad_2.value = activities_array[indexAct].events[indexEvent].dangers[indexDanger].controls[index].probabilidad.toString();
    cbo_epp_2.value = activities_array[indexAct].events[indexEvent].dangers[indexDanger].controls[index].epp.toString();

    let eliminacion_riesgo =  mdc.textField.MDCTextField.attachTo(document.querySelector('.eliminacion-riesgo'));
    eliminacion_riesgo.value = activities_array[indexAct].events[indexEvent].dangers[indexDanger].controls[index].eliminacion_riesgo.toString();

    let sustitucion =  mdc.textField.MDCTextField.attachTo(document.querySelector('.sustitucion'));
    sustitucion.value = activities_array[indexAct].events[indexEvent].dangers[indexDanger].controls[index].situacion.toString();

    let control_ingenieria =  mdc.textField.MDCTextField.attachTo(document.querySelector('.control-ingenieria'));
    control_ingenieria.value = activities_array[indexAct].events[indexEvent].dangers[indexDanger].controls[index].control_ingenieria.toString();

    let control_administrativo =  mdc.textField.MDCTextField.attachTo(document.querySelector('.control-administrativo-2'));
    control_administrativo.value = activities_array[indexAct].events[indexEvent].dangers[indexDanger].controls[index].control_administrativo.toString();

    $("#btn_edit_control").removeClass('d-none');
    $("#btn_cancel_edit_control").removeClass('d-none');
    $("#btn_add_control").addClass('d-none');
}
function addPersonEnvio(){
    $("#body-envio-vacio").addClass("d-none");
    var cant = $("#body-envio-list .row").length;
    var catArray = array_envio.length;
    $("#body-envio-list").append(`<div class="row m-0 " style="border: solid 1px #c8c8c8;border-radius: 4.4px;max-height: 50px;margin-top: 10px !important;min-height: 50px;">
                                        <div class="col-md-3 text-center" style="display: flex;align-items: center;">
                                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;">
                                                <input type="text" id="NombreEnvio${cant}" class="input-send" style="width: 100%;border-color:#cbcbcb" />
                                            </div>
                                        </div>
                                        <div class="col-md-3 text-center" style="display: flex;align-items: center;">
                                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;">
                                                <input type="text" id="CargoEnvio${cant}" class="input-send" style="width: 100%;border-color:#cbcbcb" />
                                            </div>
                                        </div>
                                        <div class="col-md-4 text-center" style="display: flex;align-items: center;">
                                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;">
                                                <input type="text" id="CorreoEnvio${cant}" class="input-send" style="width: 100%;border-color:#cbcbcb" />
                                            </div>
                                        </div>
                                        <input type="hidden" id="DocumentEnvio${cant}" class="input-send" style="width: 100%;border-color:#cbcbcb" />
                                        <input type="hidden" id="HashEnvio${cant}" class="input-send" style="width: 100%;border-color:#cbcbcb" />
                                        <div class="col-md-2 text-center" style="display: flex;">
                                            <button  class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-trash2 m-auto bmd-btn-fab-sm__xs" onclick="removePersonEnvio(this)">
                                                <img src="./images/newsistema/iconos/trash2.svg" alt="" class="w-50">
                                            </button>
                                        </div>
                                    </div>`);

                                    var obj = $(`#NombreEnvio${cant}`);
    getPersonEnvio(obj,cant);

    var count = parseInt($("#countEnvio").text());
    count++;

    if(count<10){
        $("#countEnvio").text("0"+count);
    }else{
        $("#countEnvio").text(count);
    }

}
function removePersonEnvio(component){
    console.log(component);
    $(component).parent('div').parent('div').remove();

    var count = parseInt($("#countEnvio").text());
    count--;

    if(count<10){
        $("#countEnvio").text("0"+count);
    }else{
        $("#countEnvio").text(count);
    }
}   

function editActividad(component,index){

    $(component).parent('div').parent('div').find('textarea').eq(0).attr('disabled',false);
    $(component).parent('div').parent('div').find('textarea').eq(0).focus();
    $(component).attr('disabled',true);

}

function removeActividad(component,index){
    $(component).parent('div').parent('div').remove();
    activities_array[index].active = 0;
    chargeActivitiesList(0);
    reseteaNumeracion($("#body-activities-list .row"));
}
function clearEvent(){
    //let cbo_maq_equip = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-maq-equip'));
    //let cbo_actividad_2 = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-actividad-2'));
    if(cbo_maq_equip!=null){
        cbo_maq_equip.value = 0;
    }
    //cbo_actividad_2.value = 0;
    $("#txt_descripcion_evento").val('');
    componentEventEdit = "";
    indexEventEdit = 0;
    $("#btn_edit_event").addClass('d-none');
    $("#btn_cancel_edit_event").addClass('d-none');
    $("#btn_add_event").removeClass('d-none');
}
function updateEvent(){
    //let cbo_maq_equip = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-maq-equip'));
    //let cbo_actividad_2 = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-actividad-2'));
    let evento_descripcion = $("#txt_descripcion_evento").val();
    console.log('texto',evento_descripcion);
    $(componentEventEdit).parent('div').parent('div').find('.field').eq(0).text(cbo_actividad_2.selectedText.textContent)
    $(componentEventEdit).parent('div').parent('div').find('.field').eq(1).text(cbo_maq_equip.selectedText.textContent)
    $(componentEventEdit).parent('div').parent('div').find('.field').eq(2).text(evento_descripcion)

    //push({maqid:cbo_maq_equip.value,description:evento_descripcion,dangers:[],active:1,Id:0})
    activities_array[cbo_actividad_2.value].events[indexEventEdit].description = evento_descripcion;
    activities_array[cbo_actividad_2.value].events[indexEventEdit].maqid = parseInt(cbo_maq_equip.value);

    clearEvent();
}
function editEvent(component,index,indexAct){
    console.log(component,index,indexAct)
    
    //let cbo_actividad_2 = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-actividad-2'));
    console.log(indexAct)
    cbo_actividad_2.value = indexAct.toString();

    componentEventEdit = component;
    indexEventEdit = index;

    let descripcion_evento =  mdc.textField.MDCTextField.attachTo(document.querySelector('.descripcion-evento'));
    descripcion_evento.value = activities_array[indexAct].events[index].description.toString();

    //selectActivity2(indexAct);

    //let cbo_maq_equip = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-maq-equip'));

    cbo_maq_equip.value = activities_array[indexAct].events[index].maqid.toString();

    $("#btn_edit_event").removeClass('d-none');
    $("#btn_cancel_edit_event").removeClass('d-none');
    $("#btn_add_event").addClass('d-none');
}

function removeEvent(component,index,indexAct){
    //let cbo_actividad_2 = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-actividad-2'));
    $(component).parent('div').parent('div').remove();
    activities_array[indexAct].events[index].active=0;
    reseteaNumeracion($("#body-events-list .row"));
}

function initIPERC(){
    let profile = getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa);

    if(profile=="ROL_VALIDADORIPERC"||profile=="ROL_VISUALIZADORIPERC"){
        $("#columnButtonNewIperc").hide();
        $(".filtro-sede").show();
    }

    if(profile=="ROL_VISUALIZADORIPERC"){
        $(".filtro-estado").hide();
        $('.logoCompany').text(' Matrices IPERC');
    }

    let nombre_responsable =  mdc.textField.MDCTextField.attachTo(document.querySelector('.nombre_responsable'));
    let cargo_responsable =  mdc.textField.MDCTextField.attachTo(document.querySelector('.cargo_responsable'));
    let firma_responsable =  mdc.textField.MDCTextField.attachTo(document.querySelector('.firma_responsable'));

    cbo_tipoactividad = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-tipoactividad'));
    cbo_frecuencia = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-frecuencia'));
    cbo_genero = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-genero'));
    cbo_probabilidad = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-probabilidad'));
    cbo_probabilidad_2 = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-probabilidad-2'));
    

    nombre_responsable.value = " ";
    cargo_responsable.value = " ";
    firma_responsable.value = " ";
    getPersonResponsablePrincipal($("#txt_nombre_responsable"))

    //COMBO GERENCIA
    $('#ul-Gerencia').html('');
    $('#ul-Gerencia').append(`<li class="mdc-list-item mdc-list-item--selected" data-value="0" tabindex="0" aria-selected="true" >
                            <span class="mdc-list-item__ripple"></span>
                        </li>`);
    $("#Selec-Gerencia-Filtro").html('');
    $("#Selec-Gerencia-Filtro").html('<option value="0" >Todos</option>');

    $.ajax({
        method: "GET",
        url: `${apiUrlssoma}/api/Get-Gerencia?code=Gn6dalFvw0r97NCfw137x8ufx3h3aGri72Q1MR2ryKpaWRe3NFJnXg==&httpmethod=objectlist`,
        headers:{ "apikey":constantes.apiKey },
        crossDomain: true,
        dataType: "json",
    }).done(function (response) {
        gerencia_array = response;
        response.forEach((Item) => {
            description = toCapitalize(Item.Description)
            $('#ul-Gerencia').append(`<li class="mdc-list-item" data-value="${Item.Id}" tabindex="-1">
                                    <span class="mdc-list-item__ripple"></span>
                                    <span class="mdc-list-item__text">${description}</span>
                                </li>`);

            $("#Selec-Gerencia-Filtro").append(`<option value="${Item.Id}" >${description}</option>`);
        });
        cbo_gerencia = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-gerencia'));
        cbo_gerencia.listen('MDCSelect:change', () => {
            console.log(`changed to ${cbo_gerencia.value}`);
        });
    });
    

    //COMBO SEDES /api/Get-Sede?code=d0eEG9qHF01JbC9oaU0iajLG4DPLmVRDxO0E42JEuTsiwd7klp0tkw==&httpmethod=objectlist
    $("#Selec-Sede-Filtro").html('');
    $("#Selec-Sede-Filtro").html('<option value="0" >Todas</option>');
    $.ajax({
        method: "GET",
        url: `${apiUrlssoma}/api/Get-Sede?code=d0eEG9qHF01JbC9oaU0iajLG4DPLmVRDxO0E42JEuTsiwd7klp0tkw==&httpmethod=objectlist`,
        headers:{ "apikey":constantes.apiKey },
        crossDomain: true,
        dataType: "json",
    }).done(function (response) {
        response.forEach((Item) => {
            description = toCapitalize(Item.Description)
            //onclick="fnValidaEmbarcacion(${Item.Id}, ${Item.UnidadNegocioId}, ${Item.UnidadNegocioSubId}, ${Item.id_location_sap})"

            $("#Selec-Sede-Filtro").append(`<option value="${Item.Id}" >${description}</option>`);
        });
    });

    //COMBO AREAS
    $('#ul-Area').html('');
    $('#ul-Area').append(`<li class="mdc-list-item mdc-list-item--selected" data-value="0" aria-selected="true" >
                                    <span class="mdc-list-item__ripple"></span>
                                </li>`);
    $("#Selec-Area-Filtro").html('');
    $("#Selec-Area-Filtro").html('<option value="" >Todos</option>');
    $.ajax({
        method: "GET",
        url: `${apiUrlssoma}/api/Get-Ws-Sap?code=nqjY35FLaXuzvRfAzbgUT4qYN9DeYR7fU2afqcEWUk8V05zKkeEEiA==&httpmethod=listsedes`,
        headers:{ "apikey":constantes.apiKey },
        crossDomain: true,
        dataType: "json",
    }).done(function (response) {
        response.forEach((Item) => {
            description = toCapitalize(Item.descripcion)
            //onclick="fnValidaEmbarcacion(${Item.Id}, ${Item.UnidadNegocioId}, ${Item.UnidadNegocioSubId}, ${Item.id_location_sap})"
            $(`#ul-Area`).append(`<li class="mdc-list-item" data-value="${Item.codigo}" tabindex="-1" >
                                    <span class="mdc-list-item__ripple"></span>
                                    <span class="mdc-list-item__text">${description}</span>
                                </li>`);

            $("#Selec-Area-Filtro").append(`<option value="${Item.codigo}" >${description}</option>`);
        });
        cbo_area_iperc = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-area'));
        cbo_area_iperc.listen('MDCSelect:change', () => {
            buscarPuestoTrabajo(cbo_area_iperc.value)
            console.log(`changed to ${cbo_area_iperc.value}`);
        });
        
    });

    //COMBO PUESTO DE TRABAJO

    //COMBO PROCESO

    $('#ul-Proceso').html('');
    $('#ul-Proceso').append(`<li class="mdc-list-item mdc-list-item--selected" data-value="0" aria-selected="true" >
                                    <span class="mdc-list-item__ripple"></span>
                                </li>`);

    $('#Selec-Proceso-Filtro').html('');
    $('#Selec-Proceso-Filtro').html('<option value="0" >Todos</option>');
    $.ajax({
        method: "GET",
        url: `${apiUrlssoma}/api/Get-Proceso?code=bixwE9gujSzsBsy7rulIqrf7u7GavP4RJp3qhqx5G/t6DmyhVp4Ivg==&httpmethod=objectlist`,
        headers:{ "apikey":constantes.apiKey },
        crossDomain: true,
        dataType: "json",
    }).done(function (response) {
        response.forEach((Item) => {
            description = toCapitalize(Item.Description)
            //onclick="fnValidaEmbarcacion(${Item.Id}, ${Item.UnidadNegocioId}, ${Item.UnidadNegocioSubId}, ${Item.id_location_sap})"
            $(`#ul-Proceso`).append(`<li class="mdc-list-item" data-value="${Item.Id}" tabindex="-1">
                                    <span class="mdc-list-item__ripple"></span>
                                    <span class="mdc-list-item__text">${description}</span>
                                </li>`);

            $('#Selec-Proceso-Filtro').append(`<option value="${Item.Id}" >${description}</option>`);
        });
        cbo_proceso = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-proceso'));
        cbo_proceso.listen('MDCSelect:change', () => {
            fnSubProceso(cbo_proceso.value)
            console.log(`changed to ${cbo_proceso.value}`);
        });
    });

    //COMBO SUB PROCESO

    $.ajax({
        method: "GET",
        url: `${apiUrlssoma}/api/Get-Sub-Proceso?code=331L5RtwOH/6noPve9W6BeHb4O87VdtaQYLlBULO0ONXkEPnx1kppQ==&httpmethod=objectlist`,
        headers:{ "apikey":constantes.apiKey },
        crossDomain: true,
        dataType: "json",
    }).done(function (response) {
        subprocesos = response;
    });

    //COMBO MAQUINAS
    $.ajax({
        method: "GET",
        url: `${apiUrlssoma}/api/Get-Maquina-Equipo?code=W3Symb6NnfXi23yRX9fJiYquTBnjsSopVDg0W/VuvUrdZCJ5lFZKYA==&httpmethod=objectlist`,
        headers:{ "apikey":constantes.apiKey },
        crossDomain: true,
        dataType: "json",
    }).done(function (response) {
        maquinasEquipos = response;
        $("#maquina-equipo-list").empty();
        response.forEach((Item) => {
            $("#maquina-equipo-list").append(`<div class="col-md-12 tools" id="tool-${Item.Id}" onclick="selectTool(event,${Item.Id},'${Item.Description}')">
                                                    <div class="col-md-11">
                                                        ${Item.Description}
                                                    </div>
                                                    <div class="col-md-1">
                                                        <img id='check_${Item.Id}' style = 'fill: blue; width:16px; height:16px;  visibility:hidden;' src="images/iconos/check-solid2.svg">
                                                    </div>
                                                </div>`);
        })
        console.log("maquinas equipos",response)
    });
    
    //COMBO PELIGROS
    $.ajax({
        method: "GET",
        url: `${apiUrlssoma}/api/Get-Pericon?code=lIH/2G37q/SBQ/8q0NdycE86fpO3YAlN7VgCzwvDAOrLpxtEpzRlSw==&httpmethod=objectlist`,
        headers:{ "apikey":constantes.apiKey },
        crossDomain: true,
        dataType: "json",
    }).done(function (response) {
        pericon = response;
        
        $("#ul-Peligro").empty();
        response.forEach((Item) => {
            $(`#ul-Peligro`).append(`<li class="mdc-list-item" data-value="${Item.Id}" tabindex="-1">
                                    <span class="mdc-list-item__ripple"></span>
                                    <span class="mdc-list-item__text">${Item.Peligro}</span>
                                </li>`);
        })
        cbo_peligro = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-peligro'));
    });

    //COMBO ALCANCE

    $('#ul-Alcance').html('');
    $('#ul-Alcance').append(`<li class="mdc-list-item mdc-list-item--selected" data-value="0" aria-selected="true" >
                                    <span class="mdc-list-item__ripple"></span>
                                </li>`);
    $.ajax({
        method: "GET",
        url: `${apiUrlssoma}/api/Get-Alcance?code=fNuLOdLtKL9YMEXfKds0F5tT6ptstDqy1Mcfiq5aH8SSDnyEjwI4lQ==&httpmethod=objectlist&UnidadNegocio=0`,
        headers:{ "apikey":constantes.apiKey },
        crossDomain: true,
        dataType: "json",
    }).done(function (response) {
        
        $("#ul-Alcance").empty();
        response.forEach((Item) => {
            $(`#ul-Alcance`).append(`<li class="mdc-list-item" data-value="${Item.Id}" tabindex="-1">
                                    <span class="mdc-list-item__ripple"></span>
                                    <span class="mdc-list-item__text">${Item.Description}</span>
                                </li>`);
        })
        cbo_alcance = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-alcance'));
    });

    //COMBO EPP
    $.ajax({
        method: "GET",
        url: `${apiUrlssoma}/api/Get-Epp?code=1VTP9Yw5E7uGS7HDjFd2HHnJhFzhxRMxRm78FQNj4i05aKzMDdiNEg==&httpmethod=objectlist`,
        headers:{ "apikey":constantes.apiKey },
        crossDomain: true,
        dataType: "json",
    }).done(function (response) {
        
        epp_array=response;

        response.forEach((Item) => {
            $(`#ul-Epp`).append(`<li class="mdc-list-item" data-value="${Item.Id}" tabindex="-1">
                                    <span class="mdc-list-item__ripple"></span>
                                    <span class="mdc-list-item__text">${Item.Description}</span>
                                </li>`);
        })
        response.forEach((Item) => {
            $(`#ul-Epp-2`).append(`<li class="mdc-list-item" data-value="${Item.Id}" tabindex="-1">
                                    <span class="mdc-list-item__ripple"></span>
                                    <span class="mdc-list-item__text">${Item.Description}</span>
                                </li>`);
        })

        cbo_epp = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-epp'));
        cbo_epp_2 = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-epp-2'));
    });


    $('#btn_step2').click(function(){
        console.log('click2')
        chargeActivitiesList(1);
    });
    $('#btn_step3').click(function(){
        console.log('click3')
        chargeActivitiesList(2);
    });
    $('#btn_step4').click(function(){
        //let cbo_actividad_2_s4 = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-actividad-2'));
        if(visualizacion!="Ver"){
            if(cbo_actividad_2.value==""){
                console.log("esta vacio")
                $("#modal-mantenimiento-observacion").removeClass("fade").modal('hide');
                $("#modalAviso").modal("show").addClass("fade");
                $("#titleMessageAviso").text("Aviso");
                $("#messageAviso").text("Debe seleccionar una actividad en la pestaña Eventos");
            }

            chargeEvents(cbo_actividad_2.value);
        }

        if($("#formIpercId").val()!=""&&$("#formIpercId").val()!=null){
            muestraPeligro();
        }
    });
    $('#btn_step5').click(function(){
        //let cbo_actividad_2 = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-actividad-2'));
        if(visualizacion!="Ver"){
            if(cbo_actividad_2.value==""){
                console.log("esta vacio")
                $("#modal-mantenimiento-observacion").modal('hide');
                $("#modalAviso").modal("show");
                $("#titleMessageAviso").text("Aviso");
                $("#messageAviso").text("Debe seleccionar una actividad en la pestaña Eventos");
            }
            chargeRisks(cbo_actividad_2.value);
        }
        
    });
    $('#btn_step6').click(function(){
        //let cbo_actividad_2_s4 = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-actividad-2'));
        if(visualizacion!="Ver"){
            if(cbo_actividad_2.value==""){
                console.log("esta vacio")
                $("#modal-mantenimiento-observacion").removeClass("fade").modal('hide');
                $("#modalAviso").modal("show").addClass("fade");
                $("#titleMessageAviso").text("Aviso");
                $("#messageAviso").text("Debe seleccionar una actividad en la pestaña Eventos");
            }
            chargeRisks(cbo_actividad_2.value);
        }
    });

}

function fnSubProceso(proceso,subproceso=0) {
    console.log('se recibio proceso:',proceso,subproceso)
    if (proceso != 0)
    {
        $('.cbo-subproceso').removeClass('mdc-select--disabled')
    }
    else{
        
    }

    buscarSubprocesos(proceso,subproceso);

}

function guardarIPERC()
{    

    let fecha_operacion = mdc.textField.MDCTextField.attachTo(document.querySelector('.fecha-operacion'));

    if(cbo_gerencia.value=="0" || cbo_area_iperc.value=="0" || cbo_proceso.value =="0" || cbo_alcance.value == "" ){
        $("#modal-mantenimiento-observacion").removeClass("fade").modal('hide');
        $("#modalAviso").modal("show").addClass("fade");
        $("#titleMessageAviso").text("Aviso");
        $("#messageAviso").text("Datos incompletos");
        return;
    }
    if(activities_array==""){
        $("#modal-mantenimiento-observacion").removeClass("fade").modal('hide');
        $("#modalAviso").modal("show").addClass("fade");
        $("#titleMessageAviso").text("Aviso");
        $("#messageAviso").text("Debe ingresarse al menos una actividad.");
        return;
    }else{
        let vacios = 0;
        activities_array.map(function(Actividad){
            if(Actividad.active==1){
                if(Actividad.descripcion.trim() == ""){
                    vacios++;
                }                
            }

        })

        if(vacios>0){
            $("#modal-mantenimiento-observacion").removeClass("fade").modal('hide');
            $("#modalAviso").modal("show").addClass("fade");
            $("#titleMessageAviso").text("Aviso");
            $("#messageAviso").text("No puede ingresar una actividad vacia.");
            return;
        }
    }

    if(accion=="editar"){
        $("#titleConfirm").html("Se guardarán los cambios del IPERC");
    }else{
        $("#titleConfirm").html("Se guardará la creación del IPERC");
    }
    
    $("#bodyCrear").removeClass("d-none");
    $("#bodyActualizar").addClass("d-none");
    $("#titleMessage").html("Se finalizó la observación preventiva con éxito");

    $("#modal-mantenimiento-observacion").removeClass("fade").modal("hide");
    $("#modalShowAlertConfirm").modal("show").addClass("fade");
    accion = "guardar";
}

function cancelConfirmIPERC()
{
    $("#modalShowAlertConfirm").removeClass("fade").modal("hide");
    $("#modal-mantenimiento-observacion").modal("show").addClass("fade");
    $('#modalShowAlertConfirm').modal('hide');
    //  $('.codigo-reportante').css('background-color','#fff');
    $('.cbo-puesto').css('background-color','#fff');
    // $('.codigo-reportado').css('background-color','#fff');
    $('.reportado').css('background-color','#fff');
    $('.fecha-operacion').css('background-color','#fff');
    $('.hora-operacion').css('background-color','#fff');
    $('.cbo-sede').css('background-color','#fff');
    $('.cbo-embarcacion').css('background-color','#fff');
    $('.cbo-area').css('background-color','#fff');
    $('.cbo-zona').css('background-color','#fff');

}

function aceptarConfirmIPERC(){
    $('#btnValida').prop("disabled", true);
    if (accion == "guardar"||accion == "editar")
        enviarIPERC();
    else
        finalizarIPERC();
}


function enviarIPERC(){
    $('#codeObservacion').html('');
    $("#preloader").show();
    var formdata = $('#formAjax').serializeArray();
    var data = {};
    var CheckList = []
  
    let fecha_operacion = mdc.textField.MDCTextField.attachTo(document.querySelector('.fecha-operacion'));
    /*let cbo_gerencia = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-gerencia'));
    let cbo_area_iperc = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-area'));
    let cbo_proceso = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-proceso'));
    let cbo_subproceso = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-subproceso'));
    let cbo_alcance = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-alcance'));*/

    let statusn = 3;

    if(curStatus==6||curStatus==4||curStatus==5||curStatus==8){
        statusn = curStatus;
    }else if(curStatus==7){
        statusn = 8;
    }

    data = {
        Gerencia:cbo_gerencia.value,
        Area:cbo_area_iperc.value,
        AreaDescripcion:cbo_area_iperc.selectedText.textContent,
        Proceso:cbo_proceso.value,
        Subproceso:cbo_subproceso.value,
        Alcance:cbo_alcance.value,
        PuestoTrabajo:cbo_puesto_trabajo.value,
        PuestoTrabajoDescripcion:cbo_puesto_trabajo.selectedText.textContent,
        Estado:statusn,
        IdGeneral:$('#formIpercId').val(),
        Created_By:getCookie("vtas_id_hash" + sessionStorage.tabVisitasa),
        Updated_By:getCookie("vtas_id_hash" + sessionStorage.tabVisitasa),
        NameUser:getCookie("vtas_fullname" + sessionStorage.tabVisitasa),
        EmailUser:curEmail,
        Actividades:activities_array
    }

    var url =apiUrlssoma+"/api/Post-Iperc-General?code=cti4n5i1zUujS3a0Ke6yZYUal4BMBaCePP2lkQCPFrOAkB6nmMAiNQ==&httpmethod=post";
    var headers ={
        "apikey":constantes.apiKey
    }
    $.ajax({
        method: "POST",
        url:  url,
        data: JSON.stringify(data),
        headers:headers,
        crossDomain: true,
        dataType: "json",
    })
        .done(function(data)
        {
            
            $('#btnValida').prop("disabled", false);
            if(data.Id>0 || data.status== true){
                $("#preloader").fadeOut();
                $("#modal-mantenimiento-observacion").removeClass("fade").modal("hide");
                $("#modalShowAlertConfirm").removeClass("fade").modal("hide");
                console.log("correcto");

            }else{
                $("#preloader").fadeOut();

            }
        })
        .fail(function( jqXHR, textStatus, errorThrown ) {
            $("#preloader").fadeOut();

        })
        .always(function( jqXHR, textStatus, errorThrown ) {
            //fnCargarReportantes();
            fnCargarGridIPERC();
        });
}

function finalizarIPERC(){
    $('#codeObservacion').html('');
    $("#preloader").show();
    var formdata = $('#formAjax').serializeArray();
    var data = {};
    var CheckList = []
  
    let fecha_operacion = mdc.textField.MDCTextField.attachTo(document.querySelector('.fecha-operacion'));

    let statusn = 4;

    if(curStatus==6||curStatus==4||curStatus==5||curStatus==8){
        statusn = curStatus;
    }else if(curStatus==7){
        statusn = 4;
    }

    data = {
        Gerencia:cbo_gerencia.value,
        Area:cbo_area_iperc.value,
        AreaDescripcion:cbo_area_iperc.selectedText.textContent,
        Proceso:cbo_proceso.value,
        Subproceso:cbo_subproceso.value,
        Alcance:cbo_alcance.value,
        PuestoTrabajo:cbo_puesto_trabajo.value,
        PuestoTrabajoDescripcion:cbo_puesto_trabajo.selectedText.textContent,
        Estado:statusn,
        IdGeneral:$('#formIpercId').val(),
        Created_By:getCookie("vtas_id_hash" + sessionStorage.tabVisitasa),
        Updated_By:getCookie("vtas_id_hash" + sessionStorage.tabVisitasa),
        NameUser:getCookie("vtas_fullname" + sessionStorage.tabVisitasa),
        EmailUser:curEmail,
        Actividades:activities_array
    }

    var url =apiUrlssoma+"/api/Post-Iperc-General?code=cti4n5i1zUujS3a0Ke6yZYUal4BMBaCePP2lkQCPFrOAkB6nmMAiNQ==&httpmethod=post";
    var headers ={
        "apikey":constantes.apiKey
    }
    $.ajax({
        method: "POST",
        url:  url,
        data: JSON.stringify(data),
        headers:headers,
        crossDomain: true,
        dataType: "json",
    })
        .done(function(data)
        {
            
            $('#btnValida').prop("disabled", false);
            if(data.Id>0 || data.status== true){
                $("#preloader").fadeOut();
                $("#modal-mantenimiento-observacion").removeClass("fade").modal("hide");
                $("#modalShowAlertConfirm").removeClass("fade").modal("hide");
                $("#modal-envio-iperc").modal("show");
                $("#hiddenIpercIdEnvio").val(data.Id);
                $("#hiddenIpercCodeEnvio").val(data.Codigo);
                console.log("correcto");

            }else{
                $("#preloader").fadeOut();

            }
        })
        .fail(function( jqXHR, textStatus, errorThrown ) {
            $("#preloader").fadeOut();

        })
        .always(function( jqXHR, textStatus, errorThrown ) {
            //fnCargarReportantes();
            fnCargarGridIPERC();
        });
}

function sendEmail(){
    console.log('sendEmail');
    $("#preloader").show();
    var Personas   = [];

    $("#body-envio-list .row").each(function(){ 
        
        var persona = {
            Nombres:$(this).find('input').eq(0).val(),
            Cargo:$(this).find('input').eq(1).val(),
            Correo:$(this).find('input').eq(2).val(),
            IdentityDocument:$(this).find('input').eq(3).val(),
            HashId:$(this).find('input').eq(4).val()

        } 
        Personas.push(persona);
        console.log(persona);
    })

    var data = {
        Iperc:$("#hiddenIpercIdEnvio").val(),
        Code:$("#hiddenIpercCodeEnvio").val(),
        Personas:Personas,
        Created_By:getCookie("vtas_id_hash" + sessionStorage.tabVisitasa),
        Updated_By:getCookie("vtas_id_hash" + sessionStorage.tabVisitasa)
    }

    console.log(data);

    var url =apiUrlssoma+"/api/Post-Iperc-General?code=cti4n5i1zUujS3a0Ke6yZYUal4BMBaCePP2lkQCPFrOAkB6nmMAiNQ==&httpmethod=postSend";
    var headers ={
        "apikey":constantes.apiKey
    }
    $.ajax({
        method: "POST",
        url:  url,
        data: JSON.stringify(data),
        headers:headers,
        crossDomain: true,
        dataType: "json",
    })
    .done(function(data)
    {
        
        $('#btnValida').prop("disabled", false);
        if(data.Iperc>0){
            $("#preloader").fadeOut();
            $("#bodyActualizar").hide();
            $("#bodyCrear").show();
            $("#modal-mantenimiento-observacion").removeClass("fade").modal("hide");
            $("#modalShowAlertConfirm").removeClass("fade").modal("hide");
            $("#modal-envio-iperc").modal("hide");  
            $("#modalShowAlertOk").modal("show");
            $("#titleMessage").text("Se realizó el envío del IPERC con éxito");
            $("#codeIPERC").text($("#hiddenIpercCodeEnvio").val());
            console.log("correcto");

        }else{
            $("#preloader").fadeOut();

        }
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
        $("#preloader").fadeOut();

    })
    .always(function( jqXHR, textStatus, errorThrown ) {
        //fnCargarReportantes();
        fnCargarGridIPERC();
    });
}

function evalueIPERC(){
    $("#modal-mantenimiento-observacion").removeClass("fade").modal("hide");
    $("#modal-eval-iperc").modal("show");
}
function closeModalEvaluacion(){
    $("#modal-mantenimiento-observacion").removeClass("fade").modal("show");
    $("#modal-eval-iperc").modal("hide");
}

function selectCheck(check){
    if(check==1){
        $("#cb_observado").prop('checked', false);
        $("#evaluacionDescription").prop('disabled',true);
    }else{
        $("#cb_validado").prop('checked', false);
        $("#evaluacionDescription").prop('disabled',false);
    }
}

function guardarEvaluacionIperc(status){

    $("#preloader").show();

    var data = {
        Validado:$("#cb_validado").is(":checked"),
        Observado:$("#cb_observado").is(":checked"),
        IdObservacion:observacionactual,
        Iperc:$("#hiddenIpercIdEvaluacion").val(),
        Observacion:$("#evaluacionDescription").val(),
        Created_By:getCookie("vtas_id_hash" + sessionStorage.tabVisitasa),
        Updated_By:getCookie("vtas_id_hash" + sessionStorage.tabVisitasa),
        Status:status
    }

    console.log(data);

    var url =apiUrlssoma+"/api/Post-Iperc-General?code=cti4n5i1zUujS3a0Ke6yZYUal4BMBaCePP2lkQCPFrOAkB6nmMAiNQ==&httpmethod=postObservation";
    var headers ={
        "apikey":constantes.apiKey
    }
    $.ajax({
        method: "POST",
        url:  url,
        data: JSON.stringify(data),
        headers:headers,
        crossDomain: true,
        dataType: "json",
    })
    .done(function(data)
    {
        $("#preloader").fadeOut();
        $("#modal-mantenimiento-observacion").removeClass("fade").modal("hide");
        $("#modal-eval-iperc").modal("hide");

    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
        $("#preloader").fadeOut();

    })
    .always(function( jqXHR, textStatus, errorThrown ) {
        //fnCargarReportantes();
        fnCargarGridIPERC();
    });

}

function modalHistorialModificacion(Id,Codigo) {

    $("#cod-ipers-historial").text(Codigo);


    let headers;
    let url = `${apiUrlssoma}/api/Get-Iperc-Historial-Modificacion?code=zcMWhXwGz0Xh7N/SrfHR8ibeaCMQz7vA3qpo4fNa0f8rH5HPrA1k0A==&httpmethod=objectlist&Iperc=${Id}`

    headers = {
        "apikey":constantes.apiKey,
    }

    //findChecklist();

    $.ajax({
        method: "GET",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function (response) {
    

        console.log(response);

        $("#body-historial-modificacion-list").empty();
        $('#body-historial-modificacion-loader').addClass('d-none');

        let html="";

        if (response.length == 0)
        {
            $('#body-historial-modificacion-vacio').removeClass('d-none');
        }
        else{
            
            response.forEach((Item) => {

                let TipoModificacion="-";

                if(Item.Tipo==1){
                    TipoModificacion = "Modificado";
                }else if(Item.Tipo==2){
                    TipoModificacion = "Agregado";
                }else if(Item.Tipo==3){
                    TipoModificacion = "Eliminado"
                }

                html += `<div class="item-tabla p-2" style="font-size: 14px; display:relative;">
                    <div class="row m-0 justify-content-between align-items-center">
                    
                        <div class="col-md-2 text-center row" style="word-break: break-word;">  
                            ${toCapitalize(Item.Ubicacion)}
                        </div>
                        <div class="col-md-1 text-center row" style="word-break: break-word;">  
                            ${toCapitalize(Item.Campo)}
                        </div>
                        <div class="col-md-1 text-center row" style="word-break: break-word;">  
                            ${toCapitalize(TipoModificacion)}
                        </div>
                        <div class="col-md-3 text-center row" style="word-break: break-word;">  
                            ${Item.Dato_Inicial?toCapitalize(Item.Dato_Inicial):'--'}
                        </div>
                        <div class="col-md-3 text-center row" style="word-break: break-word;">  
                            ${Item.Dato_Actual?toCapitalize(Item.Dato_Actual):'--'}
                        </div>
                        <div class="col-md-1 text-center row" style="word-break: break-word;">  
                            ${toCapitalize(Item.Fecha_Creacion)}
                        </div>
                        <div class="col-md-1 text-center row" style="word-break: break-word;">  
                            ${toCapitalize(Item.Nombre_Usuario)}
                        </div>
                    </div>
                </div>`;
            })
            $("#body-historial-modificacion-list").append(html);
            $('#body-historial-modificacion-vacio').addClass('d-none');
        }
        
    });


    $("#modal-historial-modificacion-iperc").modal("show");

}

function closeModalHistorialModificacion(){
    $("#modal-historial-modificacion-iperc").modal("hide");
}

function openModalResponsables(IdIperc){
    $("#hiddenIpercIdResponsable").val(IdIperc);
    

    let headers;
    let url = `${apiUrlssoma}/api/Get-Responsables?code=/GnfU8UQqHuuEimdDVnP9bP0agJr0hJU5btZDQ0DOGwOLRmwnjyyGQ==&httpmethod=objectlist&Iperc=${IdIperc}`

    headers = {
        "apikey":constantes.apiKey,
    }

    //findChecklist();

    $.ajax({
        method: "GET",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function (response) {
    

        console.log(response);

        $("#body-responsable-list").empty();
        $('#body-responsable-loader').addClass('d-none');

        let html="";

        if (response.length == 0)
        {
            $('#body-responsable-vacio').removeClass('d-none');
        }
        else{
            
            let responsablePrincipal = response.filter(responsable => responsable.Main == 1);

            $("#txt_id_responsable").val(responsablePrincipal[0].Id);
            $("#txt_documento_responsable").val(responsablePrincipal[0].IdentityDocument);
            $("#txt_hash_responsable").val(responsablePrincipal[0].HashId);
            $("#txt_correo_responsable").val(responsablePrincipal[0].Correo);
            $("#txt_nombre_responsable").val(responsablePrincipal[0].Nombres);
            $("#txt_cargo_responsable").val(responsablePrincipal[0].Cargo);
            $("#txt_firma_responsable").val(responsablePrincipal[0].Firma);

            let responsablesSecundarios = response.filter(responsable => responsable.Main == 0);
            responsablesSecundarios.forEach((Item,Index) => {

                html += `<div class="row m-0 " style="border: solid 1px #c8c8c8;border-radius: 4.4px;max-height: 50px;margin-top: 10px !important;min-height: 50px;">
                            <input type="hidden" id="IdResponsable${Index}" class="input-send" style="width: 100%;border-color:#cbcbcb" value="0" />
                            <div class="col-md-4 text-center" style="display: flex;align-items: center;">
                                <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;">
                                    <input type="text" id="NombreResponsable${Index}" class="input-send" style="width: 100%;border-color:#cbcbcb" value="${Item.Nombres}" />
                                </div>
                            </div>
                            <div class="col-md-3 text-center" style="display: flex;align-items: center;">
                                <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;">
                                    <input type="text" id="CargoResponsable${Index}" class="input-send" style="width: 100%;border-color:#cbcbcb" value="${Item.Cargo}"  />
                                </div>
                            </div>
                            <div class="col-md-3 text-center" style="display: flex;align-items: center;">
                                <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;">
                                    <input type="text" id="FirmaResponsable${Index}" class="input-send" style="width: 100%;border-color:#cbcbcb"  value="${Item.Firma}" />
                                </div>
                            </div>
                            <input type="hidden" id="DocumentResponsable${Index}" class="input-send" style="width: 100%;border-color:#cbcbcb"  value="${Item.IdentityDocument}" />
                            <input type="hidden" id="HashResponsable${Index}" class="input-send" style="width: 100%;border-color:#cbcbcb"  value="${Item.HashId}" />
                            <input type="hidden" id="CorreoResponsable${Index}" class="input-send" style="width: 100%;border-color:#cbcbcb"  value="${Item.Correo}" />
                            <input type="hidden" id="Activo${Index}"  value="${Item.Active}" class="input-send" style="width: 100%;border-color:#cbcbcb" />
                            <div class="col-md-2 text-center" style="display: flex;">
                                <button  class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-trash2 m-auto bmd-btn-fab-sm__xs" onclick="removePersonResponsable(this,${Index})">
                                    <img src="./images/newsistema/iconos/trash2.svg" alt="" class="w-50">
                                </button>
                            </div>
                        </div>`;
            })
            $("#body-responsable-list").append(html);
            $('#body-responsable-vacio').addClass('d-none');

            responsablesSecundarios.forEach((Item,Index) => {
                getPersonResponsables($(`#NombreResponsable${Index}`),Index);
            })

            let totalsec = responsablesSecundarios.length;
            if(totalsec<10){
                $("#countResponsables").text("0"+totalsec);
            }else{
                $("#countResponsables").text(totalsec);
            }
        }
        
        $("#modal-responsables-iperc").modal("show");
    });
}
function closeModalResponsables(){
    $("#modal-responsables-iperc").modal("hide");
    limpiarResponsables();
}
function openModalConfirmResponsables(){
    $("#titleConfirmResponsables").text("Se registrará la lista de responsables.")
    $("#modalCofirmResponsables").modal("show");
    $("#modal-responsables-iperc").modal("hide");
}
function closeModalConfirmResponsables(){
    $("#modalCofirmResponsables").modal("hide");
    $("#modal-responsables-iperc").modal("show");
}
function guardarResponsables(){
    console.log('sendEmail');
    $("#preloader").show();
    var Personas   = [];

    var persona = {
        IdResponsable:$("#txt_id_responsable").val(),
        Nombres:$("#txt_nombre_responsable").val(),
        Cargo:$("#txt_cargo_responsable").val(),
        Firma:" ",
        Correo:$("#txt_correo_responsable").val(),
        IdentityDocument:$("#txt_documento_responsable").val(),
        HashId:$("#txt_hash_responsable").val(),
        Main:1,
        Active:1

    } 
    Personas.push(persona);

    $("#body-responsable-list .row").each(function(){ 
        
        var persona = {
            IdResponsable:$(this).find('input').eq(0).val(),
            Nombres:$(this).find('input').eq(1).val(),
            Cargo:$(this).find('input').eq(2).val(),
            Firma:" ",
            Correo:$(this).find('input').eq(6).val(),
            IdentityDocument:$(this).find('input').eq(4).val(),
            HashId:$(this).find('input').eq(5).val(),
            Main:0,
            Active:$(this).find('input').eq(7).val()

        } 
        Personas.push(persona);
        console.log(persona);
    })

    var data = {
        Iperc:$("#hiddenIpercIdResponsable").val(),
        Personas:Personas,
        Created_By:getCookie("vtas_id_hash" + sessionStorage.tabVisitasa),
        Updated_By:getCookie("vtas_id_hash" + sessionStorage.tabVisitasa)
    }

    console.log(data);

    var url =apiUrlssoma+"/api/Post-Iperc-General?code=cti4n5i1zUujS3a0Ke6yZYUal4BMBaCePP2lkQCPFrOAkB6nmMAiNQ==&httpmethod=postResponsables";
    var headers ={
        "apikey":constantes.apiKey
    }
    $.ajax({
        method: "POST",
        url:  url,
        data: JSON.stringify(data),
        headers:headers,
        crossDomain: true,
        dataType: "json",
    })
    .done(function(data)
    {
        
        $('#btnValida').prop("disabled", false);
        if(data.Id>0){
            $("#preloader").fadeOut();
            $("#modalCofirmResponsables").modal("hide");

            console.log("correcto");
            limpiarResponsables();
        }else{
            $("#preloader").fadeOut();

        }
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
        $("#preloader").fadeOut();

    })
    .always(function( jqXHR, textStatus, errorThrown ) {
        //fnCargarReportantes();
        fnCargarGridIPERC();
    });
}
function addPersonResponsable(){
    $("#body-responsable-vacio").addClass("d-none");
    var cant = $("#body-responsable-list .row").length;
    var catArray = array_envio.length;
    $("#body-responsable-list").append(`<div class="row m-0 " style="border: solid 1px #c8c8c8;border-radius: 4.4px;max-height: 50px;margin-top: 10px !important;min-height: 50px;">
                                        <input type="hidden" id="IdResponsable${cant}" class="input-send" style="width: 100%;border-color:#cbcbcb" value="0" />
                                        <div class="col-md-4 text-center" style="display: flex;align-items: center;">
                                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;">
                                                <input type="text" id="NombreResponsable${cant}" class="input-send" style="width: 100%;border-color:#cbcbcb" />
                                            </div>
                                        </div>
                                        <div class="col-md-3 text-center" style="display: flex;align-items: center;">
                                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;">
                                                <input type="text" id="CargoResponsable${cant}" class="input-send" style="width: 100%;border-color:#cbcbcb" />
                                            </div>
                                        </div>
                                        <div class="col-md-3 text-center" style="display: flex;align-items: center;">
                                            <div class="col-md-12" style="padding-top: 6px;padding-bottom: 6px;">
                                                <input type="text" id="FirmaResponsable${cant}" class="input-send" style="width: 100%;border-color:#cbcbcb" />
                                            </div>
                                        </div>
                                        <input type="hidden" id="DocumentResponsable${cant}" class="input-send" style="width: 100%;border-color:#cbcbcb" />
                                        <input type="hidden" id="HashResponsable${cant}" class="input-send" style="width: 100%;border-color:#cbcbcb" />
                                        <input type="hidden" id="CorreoResponsable${cant}" class="input-send" style="width: 100%;border-color:#cbcbcb" />
                                        <input type="hidden" id="Activo${cant}" value="1" class="input-send" style="width: 100%;border-color:#cbcbcb" />
                                        <div class="col-md-2 text-center" style="display: flex;">
                                            <button  class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-trash2 m-auto bmd-btn-fab-sm__xs" onclick="removePersonResponsable(this,${cant})">
                                                <img src="./images/newsistema/iconos/trash2.svg" alt="" class="w-50">
                                            </button>
                                        </div>
                                    </div>`);

                                    var obj = $(`#NombreResponsable${cant}`);
    getPersonResponsables(obj,cant);

    var count = parseInt($("#countResponsables").text());
    count++;

    if(count<10){
        $("#countResponsables").text("0"+count);
    }else{
        $("#countResponsables").text(count);
    }

}
function removePersonResponsable(component,num){
    console.log(component);
    $(component).parent('div').parent('div').addClass('d-none');

    $(component).parent('div').parent('div').find('input').eq(7).val("0")

    var count = parseInt($("#countResponsables").text());
    count--;

    if(count<10){
        $("#countResponsables").text("0"+count);
    }else{
        $("#countResponsables").text(count);
    }
} 
function getPersonResponsables(obj,num) {
    obj.autocomplete({
        change: function (event, ui)
        {
            if (ui.item === null &&  $("#hid_Name_id_1").length>20)
            {

            }
            else if(ui.item)
            {

                $("#Nombres_Reportante").val(toCapitalize(ui.item.firstname)).trigger("change");

            }

        },

        source: function( request, response )
        {
            var filter = obj.val();
            
            var param= {filter:filter};
            var headers = {"Authorization":TOKEN_CLIENT,"apiKey":"r$3#23516ewew5"}

   
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
                        json.label      = toCapitalize(item.displayName);
                        json.value      = toCapitalize(item.displayName);
                        json.id         = item.objectId;
                        json.cargo      = toCapitalize(item.jobTitle);
                        json.firstname  = toCapitalize(item.displayName);//item.givenName+' '+item.surname;
                        json.email      = item.userPrincipalName;
                        json.dni        = item.identity_document;
                        array.push(json);
                    });

                    response(array);
                }
            });
        },
        minLength: 3,
        select: function( event, ui )
        {

            $(`#NombreResponsable${num}`).val(ui.item.label);
            $(`#CargoResponsable${num}`).val(ui.item.cargo);
            $(`#DocumentoEnvio${num}`).val(ui.item.dni);
            $(`#HashEnvio${num}`).val(ui.item.id);
            $(`#CorreoResponsable${num}`).val(ui.item.email);
            
            


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

function getPersonResponsablePrincipal(obj) {
    obj.autocomplete({
        change: function (event, ui)
        {
            if (ui.item === null &&  $("#hid_Name_id_1").length>20)
            {

            }
            else if(ui.item)
            {

                $("#Nombres_Reportante").val(toCapitalize(ui.item.firstname)).trigger("change");

            }

        },

        source: function( request, response )
        {
            var filter = obj.val();
            
            var param= {filter:filter};
            var headers = {"Authorization":TOKEN_CLIENT,"apiKey":"r$3#23516ewew5"}

   
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
                        json.label      = toCapitalize(item.displayName);
                        json.value      = toCapitalize(item.displayName);
                        json.id         = item.objectId;
                        json.cargo      = toCapitalize(item.jobTitle);
                        json.firstname  = toCapitalize(item.displayName);//item.givenName+' '+item.surname;
                        json.email      = item.userPrincipalName;
                        json.dni        = item.identity_document;
                        array.push(json);
                    });

                    response(array);
                }
            });
        },
        minLength: 3,
        select: function( event, ui )
        {

            $(`#txt_nombre_responsable`).val(ui.item.label);
            $(`#txt_cargo_responsable`).val(ui.item.cargo);
            $(`#txt_documento_responsable`).val(ui.item.dni);
            $(`#txt_hash_responsable`).val(ui.item.id);
            $(`#txt_correo_responsable`).val(ui.item.email);


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

function limpiarResponsables(){
    $("#txt_id_responsable").val(0);
    $("#txt_documento_responsable").val("");
    $("#txt_hash_responsable").val("");
    $("#txt_correo_responsable").val("");
    $("#txt_nombre_responsable").val("");
    $("#txt_cargo_responsable").val("");
    $("#txt_firma_responsable").val("");
    $("#hiddenIpercIdResponsable").val("");
    $("#body-responsable-list").empty();
    $("#countResponsables").text("00");
}

function descargarIPERC(idAud)
{//vamos a programarlo directo sin datos primeramente para diseñarlo 
    var auditor = 1;
    var xRecAuditor= 9;
    var xtxtAuditor= 12;
    var yRecAuditor= 183;
    var ytxtAuditor= 191;
    var Observador = 1; 
    var xRecObservador= 9;
    var xtxtObservador= 12;
    var yRecObservador= 0;
    var ytxtObservador= 0;
    var ytituloObservador = 0;
    var resto = 0;
    var Responsable="";
    var anio = (new Date).getFullYear();
    var countItem = 1;

    

    var doc = new jsPDF("l","mm",[1836.85,2635]);

    //var doc = new jsPDF("p","mm",'letter');
    //[595.28,930]);

    var img_log = new Image();
    img_log.src = './images/Logo_tasa_pdf.png';



    var img_letras = new Image();
    img_letras.src = './images/img_letras.png';


    //------------------------------------------------------------------    encabezado documento    -------------------------------------------------
    
    var img_header = new Image();
    img_header.src = './images/img_header.png';
    img_header.onload = function () {
        doc.addImage(img_header, 'PNG', 0, 0, 930, 21);
        doc.setTextColor(255,255,255);
        doc.setFontSize(12)
        doc.setFontType('bolditalic')
        doc.text(820, 10, 'Tecnológica de Alimentos S.A. Empresa Pesquera');
        doc.text(890, 12, '_____________');
    }
    


    var img_logo_header = new Image();
    img_logo_header.src = './images/img_logo_header.png';
    img_logo_header.onload = function () {
        doc.addImage(img_logo_header, 'PNG', 6, 5, 23, 8)
    }

    /*var img_sup = new Image();
    img_sup.src = './images/img_superior_pdf.png';
    img_sup.onload = function () {
        doc.addImage(img_sup, 'PNG', 0, 22, 210, 128)
    }

    var img_inf = new Image();
    img_inf.src = './images/img_inferior_pdf.png';
    img_inf.onload = function () {
        doc.addImage(img_inf, 'PNG', 0, 186, 210, 110)
    }*/

//------------------------------------------------------------------    encabezado documento    -------------------------------------------------
    doc.setFontSize(10)
    doc.setFontType('bold')
    doc.setTextColor(0,0,0); 
    doc.text(9, 34, 'Matriz de Identificación de Peligros, Evaluación de Riesgos y Controles');
    doc.setTextColor(200,200,200); 
    //doc.text(44, 32, '___________________________________________________________________________');
    var img_menu = new Image();
    img_menu.src = './images/img_menu.png';
    img_menu.onload = function () {
        doc.addImage(img_menu, 'PNG', 915, 30, 5, 5)
    }
    


    var img_calendar_gray = new Image();
    img_calendar_gray.src = './images/img_calendar_gray.png';

    var img_goal = new Image();
    img_goal.src = './images/img_goal.png';

    var img_calendar_check = new Image();
    img_calendar_check.src = './images/img_calendar_check.png';

    var img_calendar_blue = new Image();
    img_calendar_blue.src = './images/img_calendar_blue.png';

    //------------------------------      Inicio Gerencia      ---------------------------------   
    var img_user_grey = new Image();
    img_user_grey.src = './images/img_user_gray.png';

    doc.setFontType('normal')
    img_user_grey.onload = function () {
        doc.addImage(img_user_grey, 'PNG', 9, 48, 4, 4)
    }
    doc.setTextColor(52,85,156); 
    doc.text(15, 52, 'Gerencia');
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255, 255, 255);
    doc.rect(9, 56, 85, 14);//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(''+ipercSelected.DatosPrincipales.Gerencia_Des,19, 64);

    //------------------------------      Fin Gerencia      ----------------------------------

    //------------------------------      Inicio Area      ---------------------------------   
    var img_gps = new Image();
    img_gps.src = './images/img_gps.png';

    doc.setFontType('normal')
    img_gps.onload = function () {
        doc.addImage(img_gps, 'PNG', 104, 48, 4, 4)
    }
    doc.setTextColor(52,85,156); 
    doc.text(110, 52, 'Área/ Planta/ Embarcación');
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255, 255, 255);
    doc.rect(104, 56, 85, 14);//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(''+ipercSelected.DatosPrincipales.Area_Des,114, 64);

    //------------------------------      Fin Area      ----------------------------------

    //------------------------------      Inicio Puesto Trabajo      ---------------------------------   
    var img_user_grey_2 = new Image();
    img_user_grey_2.src = './images/img_user_gray.png';

    doc.setFontType('normal')
    img_user_grey_2.onload = function () {
        doc.addImage(img_user_grey_2, 'PNG', 199, 48, 4, 4)
    }

    doc.setTextColor(52,85,156); 
    doc.text(205, 52, 'Puesto de Trabajo');
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255, 255, 255);
    doc.rect(199, 56, 105, 14);//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(''+ipercSelected.DatosPrincipales.Puesto_Trabajo_Descripcion,205, 64);

    //------------------------------      Fin Puesto Trabajo      ----------------------------------

    //------------------------------      Inicio Proceso      ---------------------------------   
    var img_proceso = new Image();
    img_proceso.src = './images/img-proceso-subproceso.png';

    doc.setFontType('normal')
    img_proceso.onload = function () {
        doc.addImage(img_proceso, 'PNG', 314, 48, 4, 4)
    }

    doc.setTextColor(52,85,156); 
    doc.text(320, 52, 'Proceso');
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255, 255, 255);
    doc.rect(314, 56, 85, 14);//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(''+ipercSelected.DatosPrincipales.Proceso_Des,324, 64);

    //------------------------------      Fin Proceso      ----------------------------------

    //------------------------------      Inicio Sub Proceso      ---------------------------------   
    var img_subproceso = new Image();
    img_subproceso.src = './images/img-proceso-subproceso.png';

    doc.setFontType('normal')
    img_subproceso.onload = function () {
        doc.addImage(img_subproceso, 'PNG', 409, 48, 4, 4)
    }

    doc.setTextColor(52,85,156); 
    doc.text(415, 52, 'Sub-Proceso');
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255, 255, 255);
    doc.rect(409, 56, 150, 14);//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(''+ipercSelected.DatosPrincipales.Subproceso_Des,420, 64);

    //------------------------------      Fin Sub Proceso      ----------------------------------

    //------------------------------      Inicio Alcance      ---------------------------------   
    var img_alcance = new Image();
    img_alcance.src = './images/img_alcance.png';

    doc.setFontType('normal')
    img_alcance.onload = function () {
        doc.addImage(img_alcance, 'PNG', 569, 48, 4, 4)
    }

    doc.setTextColor(52,85,156); 
    doc.text(575, 52, 'Alcance');
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255, 255, 255);
    doc.rect(569, 56, 100, 14);//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(''+ipercSelected.DatosPrincipales.Subproceso_Des,600, 64);

    //------------------------------      Fin Alcance      ----------------------------------

    //------------------------------      Inicio Fecha Revision      ---------------------------------   
    var img_calendar_gray = new Image();
    img_calendar_gray.src = './images/img_calendar_gray.png';

    doc.setFontType('normal')
    img_calendar_gray.onload = function () {
        doc.addImage(img_calendar_gray, 'PNG', 679, 48, 4, 4)
    }

    doc.setTextColor(52,85,156); 
    doc.text(685, 52, 'Fecha de revisión/ Actualización');
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255, 255, 255);
    doc.rect(679, 56, 85, 14);//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(''+ipercSelected.DatosPrincipales.Fecha_Creacion,700, 64);

    //------------------------------      Fin Fecha Revision      ----------------------------------

    //------------------------------      CABECERA TABLA       -------------------------------------


    doc.setFontType('normal')
    doc.setFontSize(8)
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255,179,109);
    doc.rect(9, 80, 10, 26, "FD");//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(11, 95, 'Item');

    doc.setFontType('normal')
    doc.setFontSize(8)
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255,179,109);
    doc.rect(21, 80, 170, 12, "FD");//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(42, 87, 'Descripción del Proceso, Actividades, Personal expuesto al Peligro, Máquinas y Equipos');

    doc.setFontType('normal')
    doc.setFontSize(8)
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255,179,109);
    doc.rect(21, 94, 26, 12, "FD");//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(27, 101, 'Actividad');//x,y

    doc.setFontType('normal')
    doc.setFontSize(8)
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255,179,109);
    doc.rect(49, 94, 32, 12, "FD");//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(53, 99, 'Tipo de Actividad');//x,y
    doc.text(50, 104, '(Rutinaria/No Rutinaria)');//x,y

    doc.setFontType('normal')
    doc.setFontSize(8)
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255,179,109);
    doc.rect(83, 94, 26, 12, "FD");//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(89, 101, 'Frecuencia');//x,y

    doc.setFontType('normal')
    doc.setFontSize(8)
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255,179,109);
    doc.rect(111, 94, 24, 12, "FD");//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(118, 101, 'Género');//x,y

    doc.setFontType('normal')
    doc.setFontSize(8)
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255,179,109);
    doc.rect(137, 94, 26, 12, "FD");//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(143, 99, 'Máquinas y');//x,y
    doc.text(145, 104, 'Equipos');//x,y

    doc.setFontType('normal')
    doc.setFontSize(8)
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255,179,109);
    doc.rect(165, 94, 26, 12, "FD");//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(171, 99, 'Descripción');//x,y
    doc.text(172, 104, 'del Evento');//x,y

    doc.setFontType('normal')
    doc.setFontSize(8)
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255,179,109);
    doc.rect(193, 80, 35, 26, "FD");//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(205, 93, 'Peligro');

    doc.setFontType('normal')
    doc.setFontSize(8)
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255,179,109);
    doc.rect(230, 80, 35, 26, "FD");//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(242, 93, 'Riesgo');

    doc.setFontType('normal')
    doc.setFontSize(8)
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255,179,109);
    doc.rect(267, 80, 35, 26, "FD");//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(272, 93, 'Lesion/ Enfermedad/');
    doc.text(279, 97, 'Sensibilidad');

    doc.setFontType('normal')
    doc.setFontSize(8)
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255,190,190);
    doc.rect(304, 80, 160, 12, "FD");//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(366, 87, 'Controles Existentes');

    doc.setFontType('normal')
    doc.setFontSize(8)
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255,190,190);
    doc.rect(304, 94, 55, 12, "FD");//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(324, 101, 'Control Físico');//x,y

    doc.setFontType('normal')
    doc.setFontSize(8)
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255,190,190);
    doc.rect(361, 94, 55, 12, "FD");//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(376, 99, 'Control Administrativo');//x,y
    doc.text(378, 103, 'Capacitación');//x,y

    doc.setFontType('normal')
    doc.setFontSize(8)
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255,190,190);
    doc.rect(418, 94, 46, 12, "FD");//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(440, 101, 'EPP');//x,y

    doc.setFontType('normal')
    doc.setFontSize(8)
    doc.setDrawColor(200,200,200);
    doc.setFillColor(5,190,238);
    doc.rect(466, 80, 76, 12, "FD");//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(492, 87, 'Nivel de Riesgo Actual');

    doc.setFontType('normal')
    doc.setFontSize(8)
    doc.setDrawColor(200,200,200);
    doc.setFillColor(5,190,238);
    doc.rect(466, 94, 24, 12, "FD");//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(472, 99, 'Índice de');//x,y
    doc.text(470, 103, 'Probabilidad');//x,y

    doc.setFontType('normal')
    doc.setFontSize(8)
    doc.setDrawColor(200,200,200);
    doc.setFillColor(5,190,238);
    doc.rect(492, 94, 24, 12, "FD");//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(498, 99, 'Índice de');//x,y
    doc.text(496, 103, 'Severidad');//x,y

    doc.setFontType('normal')
    doc.setFontSize(8)
    doc.setDrawColor(200,200,200);
    doc.setFillColor(5,190,238);
    doc.rect(518, 94, 24, 12, "FD");//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(524, 99, 'Índice de');//x,y
    doc.text(526, 103, 'Riesgo');//x,y

    doc.setFontType('normal')
    doc.setFontSize(8)
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255,198,52);
    doc.rect(544, 80, 30, 26, "FD");//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(550, 92, 'Categoría del');
    doc.text(554, 96, 'Riesgo');

    doc.setFontType('normal')
    doc.setFontSize(8)
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255,198,52);
    doc.rect(576, 80, 30, 26, "FD");//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(581, 93, 'Significancia');

    doc.setFontType('normal')
    doc.setFontSize(8)
    doc.setDrawColor(200,200,200);
    doc.setFillColor(197,207,85);
    doc.rect(608, 80, 170, 12, "FD");//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(648, 87, 'Medidas de Control Faltantes y Propuestas para reducir Nivel de Riesgo');

    doc.setFontType('normal')
    doc.setFontSize(8)
    doc.setDrawColor(200,200,200);
    doc.setFillColor(197,207,85);
    doc.rect(608, 94, 30, 12, "FD");//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(613, 99, 'Eliminación del');
    doc.text(618, 103, 'Riesgo');
    
    doc.setFontType('normal')
    doc.setFontSize(8)
    doc.setDrawColor(200,200,200);
    doc.setFillColor(197,207,85);
    doc.rect(640, 94, 30, 12, "FD");//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(650, 101, 'Situación');

    doc.setFontType('normal')
    doc.setFontSize(8)
    doc.setDrawColor(200,200,200);
    doc.setFillColor(197,207,85);
    doc.rect(672, 94, 30, 12, "FD");//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(680, 99, 'Control de');
    doc.text(680, 103, 'Ingeniería');

    doc.setFontType('normal')
    doc.setFontSize(8)
    doc.setDrawColor(200,200,200);
    doc.setFillColor(197,207,85);
    doc.rect(704, 94, 42, 12, "FD");//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(712, 99, 'Control Administrativo');
    doc.text(709, 103, '(Documentos,Capacitación)');

    doc.setFontType('normal')
    doc.setFontSize(8)
    doc.setDrawColor(200,200,200);
    doc.setFillColor(197,207,85);
    doc.rect(748, 94, 30, 12, "FD");//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(760, 101, 'EPP');

    doc.setFontType('normal')
    doc.setFontSize(8)
    doc.setDrawColor(200,200,200);
    doc.setFillColor(52,85,156);
    doc.rect(780, 80, 76, 12, "FD");//(x1,y1,w,h)
    doc.setTextColor(245,245,245); 
    doc.text(786, 87, 'Nivel del Riesgo con Aplicacion de Controles');

    doc.setFontType('normal')
    doc.setFontSize(8)
    doc.setDrawColor(200,200,200);
    doc.setFillColor(52,85,156);
    doc.rect(780, 94, 24, 12, "FD");//(x1,y1,w,h)
    doc.setTextColor(245,245,245); 
    doc.text(786, 99, 'Índice de');//x,y
    doc.text(784, 103, 'Probabilidad');//x,y

    doc.setFontType('normal')
    doc.setFontSize(8)
    doc.setDrawColor(200,200,200);
    doc.setFillColor(52,85,156);
    doc.rect(806, 94, 24, 12, "FD");//(x1,y1,w,h)
    doc.setTextColor(245,245,245); 
    doc.text(812, 99, 'Índice de');//x,y
    doc.text(811, 103, 'Severidad');//x,y

    doc.setFontType('normal')
    doc.setFontSize(8)
    doc.setDrawColor(200,200,200);
    doc.setFillColor(52,85,156);
    doc.rect(832, 94, 24, 12, "FD");//(x1,y1,w,h)
    doc.setTextColor(245,245,245); 
    doc.text(838, 99, 'Índice de');//x,y
    doc.text(840, 103, 'Riesgo');//x,y

    doc.setFontType('normal')
    doc.setFontSize(8)
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255,198,52);
    doc.rect(858, 80, 30, 26, "FD");//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(864, 92, 'Categoría del');
    doc.text(868, 96, 'Riesgo');

    doc.setFontType('normal')
    doc.setFontSize(8)
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255,198,52);
    doc.rect(890, 80, 30, 26, "FD");//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 
    doc.text(896, 93, 'Significancia');
    //------------------------------      FIN CABECERA TABLA       ---------------------------------

    let posStartTable = 108;
    //-------------------  RECORREMOS EL IPERC SELECCIONADO PARA DIBUJAR LA TABLAZA :V --------------
    ipercSelected.DatosPrincipales.Actividades.map(function(Actividad){
        console.log("actividad ---")

        let hightActivity = 0;

        let startActivity = posStartTable;

        let toolString = "--";

        Actividad.events.map(function(Event)
        {

            let heightEvent = 0;
            let startEvent = posStartTable;

            if(Event.dangers.length==0){

                 //console.log("estoy entrando aquiiiiiiiiiiiiiiiiiiii ---")
                //-----------------------------   PINTAMOS ITEM  ---------------------
                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(9, posStartTable, 10, 26, "FD");//(x1,y1,w,h)
                doc.setFontType('normal')
                doc.setFontSize(8)
                doc.setTextColor(0,0,0); 
                doc.text(countItem+'', 14, posStartTable+13, {align:'justify',maxWidth:10});
                //-----------------------------    PINTAMOS PELIGRO VACIO  ------------------------------

                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(193, posStartTable, 35, 26, "FD");//(x1,y1,w,h)
            
                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(230, posStartTable, 35, 26, "FD");//(x1,y1,w,h)
            
                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(267, posStartTable, 35, 26, "FD");//(x1,y1,w,h)

                //-----------------------------     PINTAMOS EVALUACION    ------------------------------
                
                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(304, posStartTable, 55, 26, "FD");//(x1,y1,w,h)

                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(361, posStartTable, 55, 26, "FD");//(x1,y1,w,h)

                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(418, posStartTable, 46, 26, "FD");//(x1,y1,w,h)

                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(466, posStartTable, 24, 26, "FD");//(x1,y1,w,h)

                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(492, posStartTable, 24, 26, "FD");//(x1,y1,w,h)

                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(518, posStartTable, 24, 26, "FD");//(x1,y1,w,h)

                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(544, posStartTable, 30, 26, "FD");//(x1,y1,w,h)

                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(576, posStartTable, 30, 26, "FD");//(x1,y1,w,h)

                //-----------------------------   PINTAMOS CONTROL    ------------------------------

                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(608, posStartTable, 30, 26, "FD");//(x1,y1,w,h)

                
                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(640, posStartTable, 30, 26, "FD");//(x1,y1,w,h)

            
                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(672, posStartTable, 30, 26, "FD");//(x1,y1,w,h)

            
                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(704, posStartTable, 42, 26, "FD");//(x1,y1,w,h)

            
                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(748, posStartTable, 30, 26, "FD");//(x1,y1,w,h)ç


                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(780, posStartTable, 24, 26, "FD");//(x1,y1,w,h)

            
                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(806, posStartTable, 24, 26, "FD");//(x1,y1,w,h)

            
                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(832, posStartTable, 24, 26, "FD");//(x1,y1,w,h)

            
                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(858, posStartTable, 30, 26, "FD");//(x1,y1,w,h)

            
                
                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(890, posStartTable, 30, 26, "FD");//(x1,y1,w,h)


                posStartTable = posStartTable+28;
                heightEvent = heightEvent +28;
                countItem++;
            }

            Event.dangers.map(function(Peligro){
                let curPer = pericon.filter(per => per.Id == Peligro.dangerId);

                //item countItem
                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(9, posStartTable, 10, 26, "FD");//(x1,y1,w,h)
                doc.setFontType('normal')
                doc.setFontSize(8)
                doc.setTextColor(0,0,0); 
                doc.text(countItem+'', 14, posStartTable+13, {align:'justify',maxWidth:10});


                doc.setFontType('normal')
                if(curPer[0].Peligro.length>125){
                    console.log('peligro mayor a 125 caracteres')
                    doc.setFontSize(6)
                }else{
                    doc.setFontSize(8)
                }
                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(193, posStartTable, 35, 26, "FD");//(x1,y1,w,h)
                doc.setTextColor(0,0,0); 
                doc.text(curPer[0].Peligro+' ', 197, posStartTable+5, {align:'justify',maxWidth:27});
            
                doc.setFontType('normal')
                if(curPer[0].Riesgo.length>125){
                    console.log('riesgo mayor a 125 caracteres')
                    doc.setFontSize(6)
                }else{
                    doc.setFontSize(8)
                }
                
                 if(curPer[0].Riesgo.length>260){//------------------agregado por andy 19-05-2021
                    console.log('riesgo mayor a 250 caracteres')
                    doc.setFontSize(5)
                }




                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(230, posStartTable, 35, 26, "FD");//(x1,y1,w,h)
                doc.setTextColor(0,0,0); 
                doc.text(curPer[0].Riesgo+'  ', 231, posStartTable+3, {maxWidth:32,align:'justify'});
            
                doc.setFontType('normal')
                if(curPer[0].Consecuencia.length>125){
                    console.log('consecuencia mayor a 125 caracteres')
                    doc.setFontSize(6)
                }else{
                    doc.setFontSize(8)
                }
                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(267, posStartTable, 35, 26, "FD");//(x1,y1,w,h)
                doc.setTextColor(0,0,0); 
                doc.text(curPer[0].Consecuencia+' ', 271, posStartTable+5, {maxWidth:27,align:'justify'});


                //-----------------------------     PINTAMOS EVALUACION    ------------------------------
                
                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(304, posStartTable, 55, 26, "FD");//(x1,y1,w,h)

                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(361, posStartTable, 55, 26, "FD");//(x1,y1,w,h)

                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(418, posStartTable, 46, 26, "FD");//(x1,y1,w,h)

                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(466, posStartTable, 24, 26, "FD");//(x1,y1,w,h)

                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(492, posStartTable, 24, 26, "FD");//(x1,y1,w,h)

                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(518, posStartTable, 24, 26, "FD");//(x1,y1,w,h)

                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(544, posStartTable, 30, 26, "FD");//(x1,y1,w,h)

                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(576, posStartTable, 30, 26, "FD");//(x1,y1,w,h)


                if(Peligro.evals.length>0){

                    let Evaluacion = Peligro.evals[0];

                    doc.setFontType('normal')
                    doc.setFontSize(8)
                    doc.setTextColor(0,0,0); 
                    doc.text(Evaluacion.control_fisico+' ', 307, posStartTable+5, {maxWidth:49,align:'justify'});//x,y
                
    
                    doc.setFontType('normal')
                    doc.setFontSize(8)
                    doc.setTextColor(0,0,0); 
                    doc.text(Evaluacion.control_administrativo+' ',364, posStartTable+5, {maxWidth:49,align:'justify'});//x,y
                
    
                    doc.setFontType('normal')
                    doc.setFontSize(8)
                    doc.setTextColor(0,0,0); 
                    doc.text(Evaluacion.epp+' ',421, posStartTable+5, {maxWidth:40,align:'justify'});//x,y

                    doc.setFontType('normal')
                    doc.setFontSize(8)
                    doc.setTextColor(0,0,0); 
                    doc.text(Evaluacion.probabilidad+' ',477, posStartTable+13);//x,y

                    doc.setFontType('normal')
                    doc.setFontSize(8)
                    doc.setTextColor(0,0,0); 
                    doc.text(Evaluacion.indice_severidad+' ',503, posStartTable+13);//x,y

                    doc.setFontType('normal')
                    doc.setFontSize(8)
                    doc.setTextColor(0,0,0); 
                    doc.text(Evaluacion.indice_riesgo+' ',529, posStartTable+13);//x,y
                    
                    if(Evaluacion.catalogo_riesgo=="Aceptable"){
                        doc.setFillColor(197,207,85);
                    }else if(Evaluacion.catalogo_riesgo=="Tolerable"){
                        doc.setFillColor(88,194,93);
                    }else if(Evaluacion.catalogo_riesgo=="Importante"){
                        doc.setFillColor(255,198,52);
                    }else if(Evaluacion.catalogo_riesgo=="Intolerable"){
                        doc.setFillColor(255,190,190);
                    }
                    doc.setDrawColor(200,200,200);
                    doc.rect(544, posStartTable, 30, 26, "FD");//(x1,y1,w,h)
                    doc.setFontType('normal')
                    doc.setFontSize(8)
                    doc.setTextColor(0,0,0); 
                    doc.text(Evaluacion.catalogo_riesgo+' ',550, posStartTable+13);


                    if(Evaluacion.indice_riesgo >= 1 && Evaluacion.indice_riesgo <= 4){
                        doc.setTextColor(88,194,93);
                    }else{
                        doc.setTextColor(255,190,190);
                    }

                    doc.setFontType('normal')
                    doc.setFontSize(8)
                     
                    doc.text(Evaluacion.significancia+' ',582, posStartTable+13);

                }

                //-----------------------------  FIN PINTAMOS EVALUACION    ------------------------------

                //-----------------------------   PINTAMOS CONTROL    ------------------------------

                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(608, posStartTable, 30, 26, "FD");//(x1,y1,w,h)

                
                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(640, posStartTable, 30, 26, "FD");//(x1,y1,w,h)

            
                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(672, posStartTable, 30, 26, "FD");//(x1,y1,w,h)

            
                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(704, posStartTable, 42, 26, "FD");//(x1,y1,w,h)

            
                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(748, posStartTable, 30, 26, "FD");//(x1,y1,w,h)ç


                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(780, posStartTable, 24, 26, "FD");//(x1,y1,w,h)

            
                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(806, posStartTable, 24, 26, "FD");//(x1,y1,w,h)

            
                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(832, posStartTable, 24, 26, "FD");//(x1,y1,w,h)

            
                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(858, posStartTable, 30, 26, "FD");//(x1,y1,w,h)

            
                
                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(890, posStartTable, 30, 26, "FD");//(x1,y1,w,h)


                if(Peligro.controls.length>0){

                    let curPeligro = Peligro.controls[0];

                    doc.setFontType('normal')
                    doc.setFontSize(8)
                    doc.setTextColor(0,0,0); 
                    doc.text(curPeligro.eliminacion_riesgo+' ',611, posStartTable+5, {maxWidth:24,align:'justify'});

                    doc.setFontType('normal')
                    doc.setFontSize(8)
                    doc.setTextColor(0,0,0); 
                    doc.text(curPeligro.situacion+' ',643, posStartTable+5, {maxWidth:24,align:'justify'});

                    doc.setFontType('normal')
                    doc.setFontSize(8)
                    doc.setTextColor(0,0,0); 
                    doc.text(curPeligro.control_ingenieria+' ',675, posStartTable+5, {maxWidth:24,align:'justify'});

                    doc.setFontType('normal')
                    doc.setFontSize(8)
                    doc.setTextColor(0,0,0); 
                    doc.text(curPeligro.control_administrativo+' ',707, posStartTable+5, {maxWidth:36,align:'justify'});

                    doc.setFontType('normal')
                    doc.setFontSize(8)
                    doc.setTextColor(0,0,0); 
                    doc.text(curPeligro.epp+' ', 751, posStartTable+5, {maxWidth:24,align:'justify'});

                    doc.setFontType('normal')
                    doc.setFontSize(8)
                    doc.setTextColor(245,245,245); 
                    doc.text(curPeligro.probabilidad+' ', 782, posStartTable+13);//x,y

                    doc.setFontType('normal')
                    doc.setFontSize(8)
                    doc.setTextColor(245,245,245); 
                    doc.text(curPeligro.indice_severidad+' ', 817, posStartTable+13);//x,y

                    doc.setFontType('normal')
                    doc.setFontSize(8)
                    doc.setTextColor(245,245,245); 
                    doc.text(curPeligro.indice_riesgo+' ', 843, posStartTable+13);//x,y

                    doc.setFontType('normal')
                    doc.setFontSize(8)
                    doc.setTextColor(0,0,0); 
                    doc.text(curPeligro.catalogo_riesgo+' ', 864, posStartTable+13);

                    doc.setFontType('normal')
                    doc.setFontSize(8)
                    doc.setTextColor(0,0,0); 
                    doc.text(curPeligro.significancia+' ', 896, posStartTable+13);

                }
                //-----------------------------  FIN PINTAMOS CONTROL    ------------------------------

                posStartTable = posStartTable+28;
                heightEvent = heightEvent +28;
                countItem++;
            })

            let posYtext = startEvent + (heightEvent/2);
            let posYrect = heightEvent-2;
            doc.setFontType('normal')
            doc.setFontSize(8)
            doc.setDrawColor(200,200,200);
           // doc.setDrawColor(223,1,58);

            doc.setFillColor(255,255,255);
            doc.rect(165, startEvent, 26, posYrect, "FD");//(x1,y1,w,h)
            doc.setTextColor(0,0,0); 
            doc.text(167,posYtext-10 ,Event.description+' ', {maxWidth:22,align:'justify'} );//x,y  ///aaaaaaaaaaaaaaaa Descripcion del evento

            hightActivity = hightActivity + heightEvent;

            //console.clear();
            console.log("la cantidad de eventos son =", countItem);
        })

         
        let posYtextAct = startActivity+ (hightActivity/2);
        let posYrectAct = hightActivity-2;
        let type = '';
        let frequency = '';
        let genre = '';

   //--------------------------agregado por andy 19-05-2021 para arreglar el reporte ----------------------- 
        let xc = 0; 

        if(countItem <= 2){xc = 5;}
        if(countItem > 2) {xc = 20;}
   //--------------------------agregado por andy 19-05-2021 para arreglar el reporte ----------------------- 
        doc.setFontType('normal')
        doc.setFontSize(8)
        //doc.setDrawColor(223,1,58);
        doc.setDrawColor(200,200,200);
        doc.setFillColor(255,255,255);
        doc.rect(21, startActivity, 26, posYrectAct, "FD");//(x1,y1,w,h)
        doc.setTextColor(0,0,0); 
        doc.text(23, posYtextAct-xc, Actividad.descripcion+' ', {maxWidth:22,align:'justify'} );//x,y    //CUANDO HAY 2 DEBE SER -20 actividad xxxx

        if(Actividad.type_activity==1){
            type = "Rutinaria";
        }else{
            type = "No Rutinaria";
        }

        doc.setFontType('normal')
        doc.setFontSize(8)
        doc.setDrawColor(200,200,200);
        doc.setFillColor(255,255,255);
        doc.rect(49, startActivity, 32, posYrectAct, "FD");//(x1,y1,w,h)
        doc.setTextColor(0,0,0); 
        doc.text(51, posYtextAct, type+' ',{align:'justify',maxWidth:28});//x,y

        if(Actividad.frequency==1){
            frequency = "Al menos 1 vez a la semana";
        }else if(Actividad.frequency==2){
            frequency = "Al menos 1 vez al mes";
        }else if(Actividad.frequency==3){
            frequency = "1 vez al mes";
        }else if(Actividad.frequency==4){
            frequency = "Por lo menos 1 vez al año";
        }else if(Actividad.frequency==5){
            frequency = "Esporádico";
        }else if(Actividad.frequency==6){
            frequency = "Permanente";
        }

        doc.setFontType('normal')
        doc.setFontSize(8)
        doc.setDrawColor(200,200,200);
        doc.setFillColor(255,255,255);
        doc.rect(83, startActivity, 26, posYrectAct, "FD");//(x1,y1,w,h)
        doc.setTextColor(0,0,0); 
        doc.text(85, posYtextAct, frequency+' ', {maxWidth:22,align:'justify'} );//x,y

        if(Actividad.genre==1){
            genre = "Masculino";
        }else{
            genre = "Femenino";
        }

        doc.setFontType('normal')
        doc.setFontSize(8)
        doc.setDrawColor(200,200,200);
        doc.setFillColor(255,255,255);
        doc.rect(111, startActivity, 24, posYrectAct, "FD");//(x1,y1,w,h)
        doc.setTextColor(0,0,0); 
        doc.text(113, posYtextAct, genre+' ', {maxWidth:20,align:'justify'} );//x,y

        if(Actividad.tools.length>0){
            toolString = "";
        }
        Actividad.tools.map(function(Tool){
            toolString = toolString +  ""+Tool.description;
        })
        toolString.slice(1);

        doc.setFontType('normal')
        doc.setFontSize(8)
        doc.setDrawColor(200,200,200);
        doc.setFillColor(255,255,255);
        doc.rect(137, startActivity, 26, posYrectAct, "FD");//(x1,y1,w,h)
        doc.setTextColor(0,0,0);     
        doc.text(139, posYtextAct-9, toolString+'', {maxWidth:22,align:'justify'});//x,y


    });

    let startResponsable = posStartTable + 20;
    let startIcon = posStartTable + 16;
    //------------------------------      Inicio Responsable matriz iperc      ---------------------------------   
        var img_user_grey = new Image();
        img_user_grey.src = './images/img_user_gray.png';

        doc.setFontType('normal')
        img_user_grey.onload = function () {
            doc.addImage(img_user_grey, 'PNG', 9, startIcon, 4, 4)
        }
        doc.setTextColor(52,85,156); 
        doc.text(15, startResponsable, 'Responsable de Matriz IPERC');
        doc.setDrawColor(200,200,200);
        doc.setFillColor(255, 255, 255);
        startResponsable = startResponsable +4;
        doc.rect(9, startResponsable, 85, 14);//(x1,y1,w,h)
        doc.setTextColor(0,0,0); 
        let startResNombre = startResponsable + 7;
        doc.text(''+ipercSelected.DatosPrincipales.Nombre_Creador,19, startResNombre);
    //------------------------------      Fin responsable matriz iperc      ----------------------------------

    let startParticipantes = startResponsable + 34;
    let startIconParticipantes = startResponsable + 30;

    var img_user_grey = new Image();
    img_user_grey.src = './images/img_user_gray.png';

    doc.setFontType('normal')
    img_user_grey.onload = function () {
        doc.addImage(img_user_grey, 'PNG', 9, startIconParticipantes, 4, 4)
    }
    doc.setTextColor(52,85,156); 
    doc.text(15, startParticipantes, 'Participantes en la Identificación de Peligros Evaluación de Riesgos y Controles');

    startParticipantes = startParticipantes +4;
    doc.setDrawColor(200,200,200);
    doc.setFillColor(52,85,156);
    doc.rect(9, startParticipantes, 180, 14,"FD");//(x1,y1,w,h)
    doc.setTextColor(0,0,0); 

    doc.setTextColor(245,245,245); 
    doc.text(15, startParticipantes+7, 'Nombres');

    doc.setTextColor(245,245,245); 
    doc.text(70, startParticipantes+7, 'Cargo');

    doc.setTextColor(245,245,245); 
    doc.text(150, startParticipantes+7, 'Correo');

    startParticipantes = startParticipantes + 16;

    ipercSelected.DatosPrincipales.Responables.map(function(Responsable){

        doc.setDrawColor(200,200,200);
        doc.setFillColor(255,255,255);
        doc.rect(9, startParticipantes, 180, 14,"FD");//(x1,y1,w,h)

        doc.setTextColor(0,0,0); 
        doc.text(15, startParticipantes+7, Responsable.Nombres+' ');
    
        doc.setTextColor(0,0,0); 
        doc.text(70, startParticipantes+7, Responsable.Cargo+' ');
    
        doc.setTextColor(0,0,0); 
        doc.text(150, startParticipantes+7, Responsable.Correo+' ');

        startParticipantes = startParticipantes + 16;
    })

    //spacing(10)
    setTimeout(function(){ 
        doc.save('Matriz IPERC '+ipercSelected.DatosPrincipales.Codigo+'.pdf');
     }, 3000);
 
}

function exportarIPERC(){
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
    /*var anio= paObj[istAud].a.Year_Plan.toString();
    console.log(paObj[istAud].a, anio.substr(2,2))
    let fechaActual = new Date()

    let mes         = fechaActual.getMonth()*/

    var tab_text= `
    
    <table  cellpadding="0" cellspacing="0" id="sheet0" style="border-collapse: collapse;font-size:12px">
        <tr>
            <td colspan="28" style="border: 0px !important;"></td>
        </tr>
        <tr style="height:20px;">
            <td colspan="3" style="border: 0px !important;">
            </td>
            <td colspan="3" style="border: 0px !important;font-weight: bold;text-align:center;vertical-align: middle;font-size:11px"><p style="width:50%">Tecnológica de alimentos S.A. <br /> Empresa Pesquera <br /> 20100971772</p></td>
        </tr>
        <tr>
            <td style="border: 0px !important;"></td>
            <td colspan="16" style="border: 0px !important;font-weight: bold">MATRIZ DE IDENTIFICACION DE PELIGROS, EVALUACION DE RIESGOS Y CONTROLES</td>
            <td colspan="10" style="border: 0px !important;font-weight: bold">MATRIZ DE IDENTIFICACION DE PELIGROS Y EVALUACIÓN DE RIESGOS Y CONTROLES (IPERC)</td>
        </tr>
        <tr>
        </tr>
        <tr>
            <td style="border: 0px !important;"></td>
            <td style="font-weight: bold;border-bottom: 2px dotted black;">GERENCIA:</td>
            <td style="font-weight: bold;border-bottom: 2px dotted black;"></td>
            <td style="font-weight: bold;border-bottom: 2px dotted black;color: #001AC3">${ipercSelected.DatosPrincipales.Gerencia_Des}</td>
        </tr>
        <tr>
        </tr>
        <tr>
            <td style="border: 0px !important;"></td>
            <td colspan="4" style="font-weight: bold;border-bottom: 2px dotted black;">ÁREA / PLANTA / EMBARCACIÓN :</td>
            <td colspan="3" style="font-weight: bold;border-bottom: 2px dotted black;color: #001AC3">${ipercSelected.DatosPrincipales.Area_Des}</td>
            <td  style="font-weight: bold;border-bottom: 2px dotted black;">PUESTO DE TRABAJO :</td>
            <td colspan="8" style="font-weight: bold;border-bottom: 2px dotted black;color: #001AC3">${ipercSelected.DatosPrincipales.Puesto_Trabajo_Descripcion}</td>
            <td colspan="4" style="font-weight: bold;border-bottom: 2px dotted black">FECHA DE REVISIÓN / ACTUALIZACIÓN:</td>
            <td colspan="4" style="font-weight: bold;border-bottom: 2px dotted black;color: #001AC3">${ipercSelected.DatosPrincipales.Fecha_Creacion}</td>
        </tr>
        <tr>
        </tr>
        <tr>
            <td style="border: 0px !important;"></td>
            <td colspan="2" style="font-weight: bold;border-bottom: 2px dotted black;">PROCESO :</td>
            <td colspan="2" style="font-weight: bold;border-bottom: 2px dotted black;color: #001AC3">${ipercSelected.DatosPrincipales.Proceso_Des}</td>
            <td colspan="2" style="font-weight: bold;border-bottom: 2px dotted black;">SUB-PROCESO :</td>
            <td colspan="6" style="font-weight: bold;border-bottom: 2px dotted black;color: #001AC3">${ipercSelected.DatosPrincipales.Subproceso_Des}</td>
        </tr>
        <tr>
        </tr>
    </table>
    
    <table  cellpadding="0" cellspacing="0" id="sheet0" style="border-collapse: collapse;">
        <tr style="font-weight: bold;text-align:center;vertical-align: middle;">
            <td rowspan = "2" style="border: 2px solid #000;" bgcolor='#F1C096' >Item</td>
            <td colspan = "6" style="border: 2px solid #000;" bgcolor='#F1C096' >Descripción del Proceso, Actividades, Personal expuesto al Peligro, Máquinas y Equipos</td>
            
            <td rowspan = "2" style="border: 2px solid #000;" bgcolor='#F1C096' >Peligro</td>
            <td rowspan = "2" style="border: 2px solid #000;" bgcolor='#F1C096' >Riesgo</td>
            <td rowspan = "2" style="border: 2px solid #000;" bgcolor='#F1C096' >Lesión / Enfermedad / Sensibilidad</td>

            <td colspan = "4" style="border: 2px solid #000;" bgcolor='#D09996' >Controles Existentes</td>

            <td colspan = "3" style="border: 2px solid #000;" bgcolor='#9AB3D4' >NIVEL DE RIESGO ACTUAL</td>

            <td rowspan = "2" style="border: 2px solid #000;" bgcolor='#FFFD54' >CATEGORÍA DEL RIESGO</td>
            <td rowspan = "2" style="border: 2px solid #000;" bgcolor='#FFFD54' >SIGNIFICANCIA</td>
            
            <td colspan = "6" style="border: 2px solid #000;" bgcolor='#C8D6A1' >Medidas de Control Faltantes y Propuestas para reducir Nivel de Riesgo</td>

            <td colspan = "3" style="border: 2px solid #000;" bgcolor='#BFBFBF' >NIVEL DEL RIESGO CON APLICACIÓN DE CONTROLES</td>

            <td rowspan = "2" style="border: 2px solid #000;" bgcolor='#FFFD54' >CATEGORÍA DEL RIESGO</td>
            <td rowspan = "2" style="border: 2px solid #000;" bgcolor='#FFFD54' >SIGNIFICANCIA</td>

        </tr>
        <tr style="font-weight: bold;text-align:center;vertical-align: middle;">
            <td style="border: 2px solid #000;" bgcolor='#F1C096' >Actividad</td>
            <td style="border: 2px solid #000;" bgcolor='#F1C096' >Tipo de Actividad (Rutinaria/ No rutinaria)</td>
            <td style="border: 2px solid #000;" bgcolor='#F1C096' >Frecuencia</td>
            <td style="border: 2px solid #000;" bgcolor='#F1C096' >Género</td>
            <td style="border: 2px solid #000;" bgcolor='#F1C096' >Máquinas y Equipos</td>
            <td style="border: 2px solid #000;" bgcolor='#F1C096' >Descripción del Evento</td>

            <td colspan = "2" style="border: 2px solid #000;" bgcolor='#D09996' >Control Físico</td>
            <td style="border: 2px solid #000;" bgcolor='#D09996' >Control Administrativo Capacitación</td>
            <td style="border: 2px solid #000;" bgcolor='#D09996' >EPP</td>

            <td style="border: 2px solid #000;" bgcolor='#9AB3D4' >Índice de Probabilidad</td>
            <td style="border: 2px solid #000;" bgcolor='#9AB3D4' >Índice de Severidad</td>
            <td style="border: 2px solid #000;" bgcolor='#9AB3D4' >Índice de Riesgo</td>

            <td style="border: 2px solid #000;" bgcolor='#C8D6A1' >Eliminación del Riesgo</td>
            <td style="border: 2px solid #000;" bgcolor='#C8D6A1' >Sustitución</td>
            <td style="border: 2px solid #000;" bgcolor='#C8D6A1' >Control de Ingeniería</td>
            <td colspan = "2" style="border: 2px solid #000;" bgcolor='#C8D6A1' >Control Administrativo (documentos, capacitación)</td>
            <td style="border: 2px solid #000;" bgcolor='#C8D6A1' >EPP</td>

            <td style="border: 2px solid #000;" bgcolor='#BFBFBF' >Índice de Probabilidad</td>
            <td style="border: 2px solid #000;" bgcolor='#BFBFBF' >Índice de Severidad</td>
            <td style="border: 2px solid #000;" bgcolor='#BFBFBF' >Índice de Riesgo</td>

        </tr>`;
        let count = 1;
        ipercSelected.DatosPrincipales.Actividades.map(function(Actividad){
            let cant_dangers = 0;
            Actividad.events.map(function(Event){
                cant_dangers = cant_dangers + Event.dangers.length;
            })
            console.log(cant_dangers)
            
            let type = "";
            let frequency = "";
            let genre = "";

            if(Actividad.type_activity == 1){ 
                type = "Rutinaria";
            }else{
                type = "No Rutinaria";
            }
    

            if(Actividad.frequency == 1){ 
                frequency = "Al menos 1 vez a la semana";
            }else if(Actividad.frequency==2){
                frequency = "Al menos 1 vez al mes";
            }else if(Actividad.frequency==3){
                frequency = "1 vez al mes";
            }else if(Actividad.frequency==4){
                frequency = "Por lo menos 1 vez al año";
            }else if(Actividad.frequency==5){
                frequency = "Esporádico";
            }else if(Actividad.frequency==6){
                frequency = "Permanente";
            }

            if(Actividad.genre == 1){
                genre = "Masculino";
            }else{
                genre = "Femenino";
            }


            let td_activity = `<tr style="text-align:center;vertical-align: middle;">
                                    <td style="border: 2px solid #000;" >${count}</td>
                                    <td rowspan="${cant_dangers}" style="border: 2px solid #000;" >${Actividad.descripcion}</td>
                                    <td rowspan="${cant_dangers}" style="border: 2px solid #000;" >${type}</td>
                                    <td rowspan="${cant_dangers}" style="border: 2px solid #000;" >${frequency}</td>
                                    <td rowspan="${cant_dangers}" style="border: 2px solid #000;" >${genre}</td>
                                    <td rowspan="${cant_dangers}" style="border: 2px solid #000;" >Maquina</td>
                                `;
        
            Actividad.events.map(function(Event,indexevent){

                let cant_dangers_event = 0;
                cant_dangers_event = cant_dangers_event + Event.dangers.length;

                console.log(cant_dangers_event);

                let td_event = ` <td rowspan="${cant_dangers_event}" style="border: 2px solid #000;" >${Event.description}</td> `;

                Event.dangers.map(function(Peligro,indexpeligro){
                    let curPer = pericon.filter(per => per.Id == Peligro.dangerId);
                    
                    if(indexevent== 0 && indexpeligro == 0){
                        tab_text = tab_text + td_activity;
                        count++
                    }else{
                        tab_text = tab_text + `<tr style="text-align:center;vertical-align: middle;"><td style="border: 2px solid #000;" >${count}</td>`;
                        count++;
                    }

                    if(indexpeligro == 0){
                        tab_text = tab_text + td_event;
                    }
                
                    tab_text = tab_text + ` 
                    
                        <td style="border: 2px solid #000;" bgcolor='#BFBFBF' >${curPer[0].Peligro}</td>
                        <td style="border: 2px solid #000;" bgcolor='#BFBFBF' >${curPer[0].Riesgo}</td>
                        <td style="border: 2px solid #000;" bgcolor='#BFBFBF' >${curPer[0].Consecuencia}</td>`;
                        if(Peligro.evals.length>0){
                    
                            let Evaluacion = Peligro.evals[0];
                            let colorCatalogo = "";
                            if(Evaluacion.catalogo_riesgo=="Aceptable"){
                                colorCatalogo = "#D9E2C0";
                            }else if(Evaluacion.catalogo_riesgo=="Tolerable"){
                                colorCatalogo = "#4EAC5B";
                            }else if(Evaluacion.catalogo_riesgo=="Importante"){
                                colorCatalogo = "#F6C142";
                            }else if(Evaluacion.catalogo_riesgo=="Intolerable"){
                                colorCatalogo = "#EB3223";
                            }

                            let colorSignificancia = "";
                            if(Evaluacion.indice_riesgo >= 1 && Evaluacion.indice_riesgo <= 4){
                                colorSignificancia = "#4EAC5B";
                            }else{
                                colorSignificancia = "#EB3223";
                            }

                            tab_text = tab_text + `<td colspan = "2" style="border: 2px solid #000;"  >${Evaluacion.control_fisico}</td>
                            <td style="border: 2px solid #000;"  >${Evaluacion.control_administrativo}</td>
                            <td style="border: 2px solid #000;"  >${Evaluacion.epp}</td>
                            <td style="border: 2px solid #000;"  >${Evaluacion.probabilidad}</td>
                            <td style="border: 2px solid #000;"  >${Evaluacion.indice_severidad}</td>
                            <td style="border: 2px solid #000;"  >${Evaluacion.indice_riesgo}</td>
                            <td style="border: 2px solid #000;" bgcolor='${colorCatalogo}' >${Evaluacion.catalogo_riesgo}</td>
                            <td style="border: 2px solid #000;color: ${colorSignificancia}" >${Evaluacion.significancia}</td>`;

                        }else{
                            tab_text = tab_text + `<td colspan = "2" style="border: 2px solid #000;"  ></td>
                            <td style="border: 2px solid #000;"  ></td>
                            <td style="border: 2px solid #000;"  ></td>
                            <td style="border: 2px solid #000;"  ></td>
                            <td style="border: 2px solid #000;"  ></td>
                            <td style="border: 2px solid #000;"  ></td>
                            <td style="border: 2px solid #000;"  ></td>
                            <td style="border: 2px solid #000;"  ></td>`;
                        }
                        

                        if(Peligro.controls.length>0){
                    
                            let curPeligro = Peligro.controls[0];

                            tab_text = tab_text + `<td style="border: 2px solid #000;"  >${curPeligro.eliminacion_riesgo}</td>
                            <td style="border: 2px solid #000;"  >${curPeligro.situacion}</td>
                            <td style="border: 2px solid #000;"  >${curPeligro.control_ingenieria}</td>
                            <td colspan = "2" style="border: 2px solid #000;"  >${curPeligro.control_administrativo}</td>
                            <td style="border: 2px solid #000;"  >${curPeligro.epp}</td>
                            <td style="border: 2px solid #000;"  >${curPeligro.probabilidad}</td>
                            <td style="border: 2px solid #000;"  >${curPeligro.indice_severidad}</td>
                            <td style="border: 2px solid #000;"  >${curPeligro.indice_riesgo}</td>
                            <td style="border: 2px solid #000;"  >${curPeligro.catalogo_riesgo}</td>
                            <td style="border: 2px solid #000;"  >${curPeligro.significancia}</td>`;

                        }else{

                            tab_text = tab_text + `<td style="border: 2px solid #000;"  ></td>
                            <td style="border: 2px solid #000;"  ></td>
                            <td style="border: 2px solid #000;"  ></td>
                            <td colspan = "2" style="border: 2px solid #000;"  ></td>
                            <td style="border: 2px solid #000;"  ></td>
                            <td style="border: 2px solid #000;"  ></td>
                            <td style="border: 2px solid #000;"  ></td>
                            <td style="border: 2px solid #000;"  ></td>
                            <td style="border: 2px solid #000;"  ></td>
                            <td style="border: 2px solid #000;"  ></td>`;

                        }
                        

                    `</tr>
                    `;

                })
            })
        })


    tab_text = tab_text + `</table>`;

    tab_text = tab_text + `
        <table  cellpadding="0" cellspacing="0" id="sheet0" style="border-collapse: collapse;font-size:12px">
            <tr>
            </tr>
            <tr>
            </tr>
            <tr>
                <td>
                </td>
                <td colspan = "1" style="font-weight: bold;border-top: 2px solid black;border-left: 2px solid black;">Responsable de Matriz IPERC:</td>
                <td colspan = "4" style="font-weight: bold;border-top: 2px solid black;border-bottom: 2px dotted black;">${ipercSelected.DatosPrincipales.Nombre_Creador}</td>
                <td colspan = "1" style="font-weight: bold;border-top: 2px solid black;">Cargo:</td>
                <td colspan = "5" style="font-weight: bold;border-top: 2px solid black;border-bottom: 2px dotted black;"></td>
                <td colspan = "1" style="font-weight: bold;border-top: 2px solid black;">Firma:</td>
                <td colspan = "3" style="font-weight: bold;border-top: 2px solid black;border-bottom: 2px dotted black;border-right: 2px solid black;"></td>
            </tr>
            <tr>
                <td>
                </td>
                <td colspan = "15" style="font-weight: bold;border-right: 2px solid black;border-left: 2px solid black;">Participantes en la Identificación de Peligros Evaluación de Riesgos y Controles</td>
            </tr>
            <tr>
                <td>
                </td>
                <td colspan = "15" style="font-weight: bold;border-right: 2px solid black;border-left: 2px solid black;"></td>
            </tr>`;

            ipercSelected.DatosPrincipales.Responables.map(function(Responsable){

                tab_text = tab_text +`<tr>
                    <td>
                    </td>
                    <td colspan = "1" style="font-weight: bold;border-left: 2px solid black;">Nombre:</td>
                    <td colspan = "3" style="font-weight: bold;">${Responsable.Nombres}</td>
                    <td colspan = "1" style="font-weight: bold;">Cargo:</td>
                    <td colspan = "6" style="font-weight: bold;">${Responsable.Cargo}</td>
                    <td colspan = "1" style="font-weight: bold;">Firma:</td>
                    <td colspan = "3" style="font-weight: bold;border-right: 2px solid black;"></td>
                </tr>`;
            })

    tab_text = tab_text + ` 
        <tr>
            <td>
            </td>
            <td colspan = "15" style="font-weight: bold;border-right: 2px solid black;border-left: 2px solid black;border-bottom: 2px solid black"></td>
        </tr>
    </table>
    `;

    var countObj = 1;
    /*paObj[istAud].a.Objetivos.forEach(function(Item)
    {
        var rowObj='';
         rowObj=`<tr style="color: #fff;font-weight: bold;">
         <td bgcolor='#70AD47' colspan="59">Objetivo ${countObj}: ${Item.Objetivo_Name}</td>

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
           Act.Cronogramas.forEach(function(fre) {
            var rowsFre = '';
            var rowsFre1 = '';
            var rowsFre2 = '';
            var rowsFre3 = '';
            var rowsFre4 = '';

               if(fre.Fecha_S1_Ini != null){
                rowsFre1=` <td style="border: 1px solid #000;">
                <table>
                <tr bgcolor='#223962'><td></td></tr>
                <tr><td></td></tr>
                </table>
                </td>` 
               }else{
                rowsFre1=` <td style="border: 1px solid #000;">
               <table>
               <tr><td></td></tr>
               <tr><td></td></tr>
               </table>
               </td>`   
               }
               rowsFre=rowsFre+rowsFre1;
               if(fre.Fecha_S2_Ini != null){
                rowsFre2=` <td style="border: 1px solid #000;">
                <table>
                <tr bgcolor='#223962'><td></td></tr>
                <tr><td></td></tr>
                </table>
                </td>` 
               }else{
                rowsFre2=` <td style="border: 1px solid #000;">
               <table>
               <tr><td></td></tr>
               <tr><td></td></tr>
               </table>
               </td>`   
               }
               rowsFre=rowsFre+rowsFre2;

               if(fre.Fecha_S3_Ini != null){
                rowsFre3=` <td style="border: 1px solid #000;">
                <table>
                <tr bgcolor='#223962'><td></td></tr>
                <tr><td></td></tr>
                </table>
                </td>` 
               }else{
                rowsFre3=` <td style="border: 1px solid #000;">
               <table>
               <tr><td></td></tr>
               <tr><td></td></tr>
               </table>
               </td>`   
               }
               rowsFre=rowsFre+rowsFre3;

               if(fre.Fecha_S4_Ini != null){
                rowsFre4=` <td style="border: 1px solid #000;">
                <table>
                <tr bgcolor='#223962'><td></td></tr>
                <tr><td></td></tr>
                </table>
                </td>` 
               }else{
                rowsFre4=` <td style="border: 1px solid #000;">
               <table>
               <tr><td></td></tr>
               <tr><td></td></tr>
               </table>
               </td>`   
               }
               rowsFre=rowsFre+rowsFre4;




               rowsAct=rowsAct+rowsFre; 


               
           })


           rowsAct=rowsAct+ `</tr>`;

         rowObj=rowObj+rowsAct;     
       })
       var countSubObj = 1;
       Item.SubObjetivos.forEach(function(ItemS)
        {
            var rowSObj='';
            rowSObj=`<tr style="color: #fff;font-weight: bold;">
            <td bgcolor='#70AD47' colspan="59">${countObj}.${countSubObj}: ${ItemS.SubObjetivo_Name}</td>

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

            
            
            rowsActS=rowsActS+ `</tr>`;
            rowSObj=rowSObj+rowsActS;     
        })
        

        countSubObj++;
        rowObj=rowObj+rowSObj;
        })


       countObj++;
        tab_text=tab_text+rowObj;
    })*/
    var namedoc = "Matriz IPERC "+ipercSelected.DatosPrincipales.Codigo;
    var uri = 'data:application/vnd.ms-excel;base64,'
    ,
    template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
    , base64 = function (s) {
        return window.btoa(unescape(encodeURIComponent(s)))
    }
    , format = function (s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) {
            return c[p];
        })
    }
    var ctx = {worksheet: namedoc || 'Worksheet', table: tab_text}
    var a = document.createElement('a');
    a.href = uri + base64(format(template, ctx))
    a.download = namedoc+'.xls';
    //triggering the function
    a.click();


    /*var ua = window.navigator.userAgent;
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
        sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));  

    return (sa);*/
}