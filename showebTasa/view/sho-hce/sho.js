// variables para ssoma
let select_covv       = null;
let unidad_de_negocio = null;
let sedeModal         = null;
let areaInspeccion    = null;
let arrInspectors     = [];
let arrForms          = [];
// variables para ssoma


//let openModalMenu;
var openModalMenu;

var localeStor = getStorage("vtas_rolexternalrol", "text");
if( localeStor == 'ROL_RESPONSABLEPROGSSOMA') {
    $('#observacionesPReventivas').addClass('d-none')
}

openModalMenu = function openModalMenu(name, titulo = '') {
    $('.modal-menu').addClass('modal-menu__active')
    //console.log(name)
    rolesSsoma(name);
    $('#tituloSubMenu').html(titulo)

    //alert('name'+name)
    //alert('titulo'+titulo)
};

//let closeModalMenu;

closeModalMenu = function closeModalMenu(){
    $('.modal-menu').removeClass('modal-menu__active')
}

var ConfiguracionDeInspecciones;
ConfiguracionDeInspecciones = function (){
    closeModalMenu();
    handlerUrlhtml('contentGlobal','view/ssoma/configuracion-de-inspecciones/index.html','Crear Inspección');
}

var ProgramarInspeccion;
ProgramarInspeccion = function (){
    closeModalMenu();
    handlerUrlhtml('contentGlobal','view/ssoma/programar-inspeccion/index.html','Programar Inspecciones');
}

var ConfiguracionDeInspeccionesInterno;
ConfiguracionDeInspeccionesInterno = function (){
    closeModalMenu();
    handlerUrlhtml('contentGlobal','view/ssoma/programar-inspeccion/inspeccion.html','Programar Inspecciones');
}

var Inspectores;
Inspectores = function (){
    handlerUrlhtml('contentGlobal','view/ssoma/inspector/index.html','externalAccessRequestList');
}

var SeguimientoObservacionesPreventivas;
SeguimientoObservacionesPreventivas = function (){
    closeModalMenu();
    handlerUrlhtml('contentGlobal','view/ssoma/Seguimiento-Observaciones-Preventivas/index.html','Seguimiento de Observaciones Preventivas');
}


let GestorIPERC;
GestorIPERC = function (){
    handlerUrlhtml('contentGlobal','view/ssoma/IPERC/index.html','Gestión de IPERC');
}
let GestorPERICON;
GestorPERICON = function (){
    handlerUrlhtml('contentGlobal','view/ssoma/PERICON/index.html','Administración de PERICON');
}

function rolesSsoma(opcionMenu){

    let storage = getStorage("vtas_rolexternalrol", "text");
     //alert("storage"+storage)
     if(storage==null){
        storage = getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa);
     }
    // Optimizar con datos del usuario logueado desde el back
    if( storage == 'ROL_RESPONSABLEINSPSSOMA'){


        $('#Inspectores').removeClass('d-none')
        $('#asignarInspeccion').removeClass('d-none')
        $('#seguimientoInspecciones').removeClass('d-none')

        $('#CrearInspeccion').removeClass('d-none')
        $('#programarInspeccion').removeClass('d-none')
        $('#observacionesPReventivas').addClass('d-none')
        //handlerUrlhtml('contentGlobal','view/ssoma/programar-inspeccion/menu.html','externalAccessRequestList');
    }
    else if( storage == 'ROL_RESPONSABLEPROGSSOMA') {
        $('#observacionesPReventivas').addClass('d-none')

        switch (opcionMenu) {
            case 'Inspecciones':
                $('#CrearInspeccion').removeClass('d-none')
                $('#programarInspeccion').removeClass('d-none')
                $('#Inspectores').removeClass('d-none')
                $('#seguimientoInspecciones').removeClass('d-none')


                // $('#observacionesPReventivas').addClass('d-none')
                //handlerUrlhtml('contentGlobal','view/ssoma/programar-inspeccion/menu.html','externalAccessRequestList');
                $('#Inspectores').removeClass('d-none')
                // $('#CrearInspeccion').removeClass('d-none')
                $('#asignarInspeccion').removeClass('d-none')
                // $('#programarInspeccion').removeClass('d-none')
                $('#seguimientoInspecciones').removeClass('d-none')
                $('#IndicadoresInspecciones').removeClass('d-none')

                $('#asignarInspeccion').removeClass('d-none')
                $('#SeguimientoObservacionesPreventivas').addClass('d-none')
                $('#IndicadoresObservacionesPreventivas').addClass('d-none')
                $('#observacionesPReventivas').addClass('d-none')
                break;
            case 'ObservacionesPreventivas':
                $('#Inspectores').addClass('d-none')
                $('#CrearInspeccion').addClass('d-none')
                $('#asignarInspeccion').addClass('d-none')
                $('#programarInspeccion').addClass('d-none')
                $('#seguimientoInspecciones').addClass('d-none')

                $('#SeguimientoObservacionesPreventivas').removeClass('d-none')
                $('#observacionesPReventivas').addClass('d-none')
                break;
        }
    }
    else if( storage == 'ROL_REPORTANTE' || storage == 'ROL_REPORTANTELIDER') {
//console.log(storage)
        switch (opcionMenu) {
            case 'Inspecciones':
                $('#CrearInspeccion').removeClass('d-none')
                $('#programarInspeccion').removeClass('d-none')
                $('#Inspectores').removeClass('d-none')
                $('#seguimientoInspecciones').removeClass('d-none')


                // $('#observacionesPReventivas').addClass('d-none')
                //handlerUrlhtml('contentGlobal','view/ssoma/programar-inspeccion/menu.html','externalAccessRequestList');
                $('#Inspectores').removeClass('d-none')
                // $('#CrearInspeccion').removeClass('d-none')
                $('#asignarInspeccion').removeClass('d-none')
                // $('#programarInspeccion').removeClass('d-none')
                $('#seguimientoInspecciones').removeClass('d-none')

                $('#asignarInspeccion').addClass('d-none')
                $('#SeguimientoObservacionesPreventivas').addClass('d-none')
                $('#IndicadoresObservacionesPreventivas').addClass('d-none')
                break;
            case 'ObservacionesPreventivas':
                $('#Inspectores').addClass('d-none')
                $('#CrearInspeccion').addClass('d-none')
                $('#asignarInspeccion').addClass('d-none')
                $('#programarInspeccion').addClass('d-none')
                $('#seguimientoInspecciones').addClass('d-none')
                $('#IndicadoresInspecciones').addClass('d-none')

                $('#SeguimientoObservacionesPreventivas').removeClass('d-none')
                $('#IndicadoresObservacionesPreventivas').removeClass('d-none')
                break;
        }
    }
}


var SeguimientoDeInspeccion
SeguimientoDeInspeccion = function SeguimientoDeInspeccion(){
    closeModalMenu();
    handlerUrlhtml('contentGlobal','view/ssoma/seguimiento-de-inspeccion/index.html','Seguimiento de Inspección');
}






