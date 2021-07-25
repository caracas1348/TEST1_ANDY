select_covv = null;
unidad_de_negocio = null;
sedeModal = null;
areaInspeccion = null;
let editData = null;

function initprogramaInspeccion(){


}

function listInspeccionesProgramar(){
    let url = apiUrlssoma+`/api/Get-Inspection?code=mT6CeeQ41ShdqLdZ3amPjgnfwiyWx6HVkU3k7UoEIrvEw8wehPIdHw==&httpmethod=objectlist`
    let headers = {
        "apikey":constantes.apiKey,
    }
    console.warn("url -> ", url)
    $.ajax({
        method: "GET",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function (response) {
        console.warn("listInspeccionesProgramar -> ",response)
        $('#body-tabla-loader').addClass('d-none')
        $('#pagination-container').pagination({
            dataSource: response,
            pageSize: 8,
            callback: function(data, pagination) {
                var html = simpleTemplating(data);
                $('#body-tabla-list').html(html);
            }
        })
        $('.body-tabla').addClass('hidden')
        $('#cantidad').text(response.length)

    })
}

function simpleTemplating(data) {
    var html = '';

    console.log(data)
    // $.each(data, function(index, item){
    //     html += '<li>'+ item +'</li>';
    // });
    let FrequencyName = '- -';
    let StatusId = '- -'
    let TypeName = '- -'
    let unidadNegocio = '- -'
    let sede = '- -'
    let areainspeccionName = '- -'
    data.forEach((Item) => {
        let fecha = moment(`${Item.Last_Updated_Date}`).format("DD/MM/YYYY");
        if(Item.FrequencyName != null){
            FrequencyName = Item.FrequencyName;
        }

        if(Item.StatusId == 1){
            StatusId = 'Creada';
        }else if(Item.StatusId == 2){
            StatusId = 'Asignada';
        }else if(Item.StatusId == 3){
            StatusId = 'En Ejecución';
        }else if(Item.StatusId == 4){
            StatusId = 'Finalizada';
        }else if(Item.StatusId == 5){
            StatusId = 'Vencida';
        }else if(Item.StatusId == 6){
            StatusId = 'Reasignada';
        }

        if (Item.TypeName != null){
            TypeName = Item.TypeName
        }

        if (Item.UnitName != null){
            unidadNegocio = Item.UnitName
        }

        if (Item.LocationName != null){
            sede = Item.LocationName
        }

        if (Item.AreaName != null){
            areainspeccionName = Item.AreaName
        }

        html += `<div class="item-tabla p-2" style="font-size: 14px">
            <div class="row m-0 justify-content-between align-items-center">
                <div class="col-md-1">${Item.Code}</div>
                <div class="col-md-2">${Item.FormTitle}</div>
                <div class="col-md-1">${unidadNegocio}</div>
                <div class="col-md-1">${sede}</div>
                <div class="col-md-2">${areainspeccionName}</div>
                <div class="col-md-1">${TypeName}</div>
                <div class="col-md-1">${FrequencyName}</div>
                <div class="col-md-1">${StatusId}</div>
                <div class="col-1 text-center">
                    <button class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-add m-auto bmd-btn-fab-sm__xs" onclick="EditarInspeccionModal(${Item.Id},'Item.FormTitle')">
                        <img src="./images/newsistema/iconos/edit1.svg" alt="" class="w-50">
                    </button>
                </div>
                <div class="col-1 text-center">
                    <button class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-ojo m-auto bmd-btn-fab-sm__xs" onclick="asignarInspeccionModal(${Item.Id},'Item.FormTitle')">
                        <img src="./images/newsistema/iconos/ojo1.svg" alt="" class="w-50">
                    </button>
                </div>
            </div>
        </div>`;
    })
    html += '';
    return html;
}

function NoProgramado(){
    $('input:radio[name=frecuencia]').attr('disabled',true)
    document.getElementById("Diario").checked = false;
    document.getElementById("Semanal").checked = false;
    document.getElementById("Mensual").checked = false;
    document.getElementById("Trimestral").checked = false;
    document.getElementById("Semestral").checked = false;
    document.getElementById("Anual").checked = false;
    $('#listaFrecuencia').addClass('Disabled__frecuencia');
}

function Programado(){
    $('input:radio[name=frecuencia]').attr('disabled',false)
    $('#listaFrecuencia').removeClass('Disabled__frecuencia');
}

function asignarInspeccionModal(id,tituloForm){
    $('#titulo-modal-visualizar').text(tituloForm);
    $('#modal-visualizar').addClass('modal_confirmacion__active')

    let url = apiUrlssoma+`/api/Get-Inspection?code=mT6CeeQ41ShdqLdZ3amPjgnfwiyWx6HVkU3k7UoEIrvEw8wehPIdHw==&httpmethod=object&id=${id}`
    let headers = {
        "apikey":constantes.apiKey,
    }
    $.ajax({
        method: "GET",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function (response) {
        console.log(response)
        $('.id_inspeccion').text(response.Code);
        $('.area_inspeccion').text(response.AreaName);
        $('#nmbre_inspeccion').text(response.FormTitle);
        $('#tipo_asignacion').text(response.AssignTypeName);
        $('#tipo_inspeccion').text(response.TypeName);
        $('#frecuencia_ejecucion').text(response.FrequencyName);
        $('#idinspeccion').val(response.Id)
    })
}

function ProgramarInspeccionModal(){
    editData=null;
    clearModalData();
    $('#titlemodalsave').text('Se guardará la inspección programada.')
    $('#subtitlemodalsave').text('¿Desea confirmar el guardado de la inspección?')
    $('#modal-programar-inspeccion').addClass('modal_confirmacion__active')
}

function cerrarModal(id){
    $(`#${id}`).removeClass('modal_confirmacion__active')
}

function getInspecciones(){
    let url = `https://0p3r4ti0n5ecur3-prd-forms.azurewebsites.net/api/Get-Form?code=sXuJLNZw7GvtzAVQYMAfMHvPCSaMZWbzrv77Qa2zQksUwIbga52tSg==&httpmethod=objectlist&system_id=${constantes.sysCodeId}&flag_confirm=1`
    let headers = {
        "apikey":constantes.apiKey,
    }
    $.ajax({
        method: "GET",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function (response) {
       console.log(response)
        response.forEach((Item) => {
            $('#listInspecciones').append(`<li class="mdc-list-item" data-value="${Item.id}">
                                    <span class="mdc-list-item__ripple"></span>
                                    <span class="mdc-list-item__text text-left">${Item.title}</span>
                                </li>`)
        })
        select_covv = mdc.select.MDCSelect.attachTo(document.querySelector('.demo-menu'));
    })
}

function getlistUnidadNegocioInspector(){
    let url = apiurlAuditoria+`/api/Get-Unidad_Negocio-All?code=25Ewv7NJf5i1HTalqXRIrAfk7i1bXkRkB58utsEzQrWtP21B07BHtw==&httpmethod=objectlist`
    let headers = {
        "apikey":constantes.apiKey,
    }
    $.ajax({
        method: "GET",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function (response) {
        console.log(response)
        let nombre = ''
        response.forEach((Item) => {
            nombre = toCapitalize(Item.Code)
            $('#listUnidadNegocio').append(`<li class="mdc-list-item" data-value="${Item.Id}" onclick="">
                                    <span class="mdc-list-item__ripple"></span>
                                    <span class="mdc-list-item__text text-left">${toCapitalize(nombre)}</span>
                                </li>`)
        })
        unidad_de_negocio = mdc.select.MDCSelect.attachTo(document.querySelector('.unidad-de-negocio'));
        unidad_de_negocio.listen('MDCSelect:change', () => {
            //selectActivity2(cbo_actividad_2.value);
            getListSedeInspeccion(unidad_de_negocio.value)
            console.log(`changed unidad_de_negocio to ${unidad_de_negocio.value}`);
        });
    })
}

function getListSedeInspeccion(id){
    //let sedeModal = mdc.select.MDCSelect.attachTo(document.querySelector('.sede'));
    //sedeModal.value ='';
    let url = apiurlAuditoria+`/api/Get-Sede-All?code=0N470WSSjrIb6hhHAsgBHgS8wplALMbCB6KcP5FmsjFDvjQkcaaWbw==&httpmethod=objectlist&UnidadNegocioId=${id}`
    let headers = {
        "apikey":constantes.apiKey,
    }
    $.ajax({
        method: "GET",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function (response) {
        console.log(response)
        $('#listSede').html('');
        let nombre = ''
        response.forEach((Item) => {
            nombre = toCapitalize(Item.Code)
            $('#listSede').append(`<li class="mdc-list-item" data-value="${Item.Id}" onclick="seleccionarSede('${Item.CodeUnidadNegocio}')">
                                    <span class="mdc-list-item__ripple"></span>
                                    <span class="mdc-list-item__text text-left">${toCapitalize(nombre)}</span>
                                </li>`)
        })
        if(sedeModal==null){
            sedeModal = mdc.select.MDCSelect.attachTo(document.querySelector('.sede'));

        }else{
            sedeModal.destroy();
            sedeModal = mdc.select.MDCSelect.attachTo(document.querySelector('.sede'));
            sedeModal.value = '';
        }
        if(editData!=null){
            sedeModal.value = editData.SedeId.toString();
        }

    })
    getListAreaInspeccion(id)
}

function getListAreaInspeccion(id){
    //let areaInspeccion = mdc.select.MDCSelect.attachTo(document.querySelector('.areaInspeccion'));
    //areaInspeccion.value ='';
    let url = apiUrlssoma+`/api/Get-Area?code=/3LpNcn9xO9QHHicGYY8zI3X3e3VYfOgyNlanKBxNBs1jbgZBV0qFg==&httpmethod=objectlist&unidad_negocio_id=${id}`
    let headers = {
        "apikey":constantes.apiKey,
    }
    $.ajax({
        method: "GET",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function (response) {
        console.log(response)
        $('#listAreaInspeccion').html('');
        let nombre = ''
        response.forEach((Item) => {
            nombre = toCapitalize(Item.Description)
            $('#listAreaInspeccion').append(`<li class="mdc-list-item" data-value="${Item.Id}" >
                                    <span class="mdc-list-item__ripple"></span>
                                    <span class="mdc-list-item__text text-left">${nombre}</span>
                                </li>`)
        })

        if(areaInspeccion==null){
            areaInspeccion = mdc.select.MDCSelect.attachTo(document.querySelector('.areaInspeccion'));
        }else{
            areaInspeccion.destroy();
            areaInspeccion = mdc.select.MDCSelect.attachTo(document.querySelector('.areaInspeccion'));
            areaInspeccion.value = '';
        }
        if(editData!=null){
            areaInspeccion.value = editData.AreaId.toString();
        }
    })
}

function saveInspeccion(){
    /*let select_covv = mdc.select.MDCSelect.attachTo(document.querySelector('.demo-menu'));
    let unidad_de_negocio = mdc.select.MDCSelect.attachTo(document.querySelector('.unidad-de-negocio'));
    let sedeModal = mdc.select.MDCSelect.attachTo(document.querySelector('.sede'));
    let areaInspeccion = mdc.select.MDCSelect.attachTo(document.querySelector('.areaInspeccion'));*/

    if(select_covv.value != '' && unidad_de_negocio.value != '' && sedeModal.value != '' && areaInspeccion.value != ''){
        $('#modal-confirmacion').addClass('modal_confirmacion__active')
    }else{
        $('#modal-confirmacion__error').addClass('modal_confirmacion__active')
    }


    //$('#modal-programar-inspeccion').removeClass('modal_confirmacion__active')
}


function saveInspeccionConfirmar(){
    /*let select_covv = mdc.select.MDCSelect.attachTo(document.querySelector('.demo-menu'));
    let unidad_de_negocio = mdc.select.MDCSelect.attachTo(document.querySelector('.unidad-de-negocio'));
    let sedeModal = mdc.select.MDCSelect.attachTo(document.querySelector('.sede'));
    let areaInspeccion = mdc.select.MDCSelect.attachTo(document.querySelector('.areaInspeccion'));*/
    var httpmethod = "";
    let url = "";
    let status = 0;
    let code = "";
    if(editData!=null){
        url = apiUrlssoma+`/api/Post-Inspection?code=jKg6Aw0QHRBr2DbAVfg9hpJrLFsxqc3uGtrjOol8bT/SebTkMsMziA==&httpmethod=put&id=${editData.Id}`
        status= editData.StatusId;
        code = editData.Code;
    }else{
        url = apiUrlssoma+`/api/Post-Inspection?code=jKg6Aw0QHRBr2DbAVfg9hpJrLFsxqc3uGtrjOol8bT/SebTkMsMziA==&httpmethod=post`
        status=1;
        code = '';
    }

    let headers = {
        "apikey":constantes.apiKey,
    }
    let storage = getStorage("usuario", "json");
    let data = {
        code:code,
        form_id: select_covv.value,
        area_id: areaInspeccion.value,
        location_id: sedeModal.value,
        frequency_id: $('input:radio[name=frecuencia]:checked').val(),
        assignment_type_id: $('input:radio[name=asignacion]:checked').val(),
        type: $('input:radio[name=inspeccion]:checked').val(),
        status_id: status,
        year: date.getFullYear(),
        created_by: storage.idhash,
        last_updated_by: storage.idhash,
    };
    console.warn("url -> ", url)
    console.warn("data -> ", data)
    $.ajax({
        method: "POST",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
        data: JSON.stringify(data),
    }).done(function (response) {
        console.warn("response -> ",response)
        $('#modal-confirmacion').removeClass('modal_confirmacion__active')
        $('#modal-programar-inspeccion').removeClass('modal_confirmacion__active')
        $('#modal-save').addClass('modal_confirmacion__active')
        $('#codigo').text(response.Code);
    })//*/
}

function CerrarModalSaveInspeccion(){
    $('#modal-save').removeClass('modal_confirmacion__active')
    $('#body-tabla-list').html('')
    //listInspeccionesProgramar();
    buscarInspeccionFiltro()
}

// filtros

function filtroGetUnidadNegocio(){
    let url = apiurlAuditoria+`/api/Get-Unidad_Negocio-All?code=25Ewv7NJf5i1HTalqXRIrAfk7i1bXkRkB58utsEzQrWtP21B07BHtw==&httpmethod=objectlist`
    let headers = {
        "apikey":constantes.apiKey,
    }
    $.ajax({
        method: "GET",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function (response) {
        console.log(response)
        let nombre = ''
        $('#selectUnidadNegocioFiltro').html('');
        $('#selectUnidadNegocioFiltro').append(`<option value="" selected>Todos</option>`)
        response.forEach((item)=>{
            nombre = toCapitalize(item.Code)
            $('#selectUnidadNegocioFiltro').append(`<option value="${item.Id}">${toCapitalize(nombre)}</option>`)
        })
    })
}

function eventFiltroUN(){
    let selectUnidadNegocioFiltro = $('#selectUnidadNegocioFiltro').val();
    if(selectUnidadNegocioFiltro != ''){
        filtroGetListSede(selectUnidadNegocioFiltro)
        filtroGetListAreaInspeccion(selectUnidadNegocioFiltro)
    }else{
        $('#selecSedeFiltro').html('');
        $('#selecSedeFiltro').append(`<option value="" selected>Todos</option>`)
        $('#selectAreafiltro').html('');
        $('#selectAreafiltro').append(`<option value="" selected>Todos</option>`)
    }

}

function filtroGetListSede(id){
    let url = apiurlAuditoria+`/api/Get-Sede-All?code=0N470WSSjrIb6hhHAsgBHgS8wplALMbCB6KcP5FmsjFDvjQkcaaWbw==&httpmethod=objectlist&UnidadNegocioId=${id}`
    let headers = {
        "apikey":constantes.apiKey,
    }
    $.ajax({
        method: "GET",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function (response) {
        console.log(response)
        $('#selecSedeFiltro').html('');
        $('#selecSedeFiltro').append(`<option value="" selected>Todos</option>`)
        let nombre = ''
        response.forEach((Item) => {
            nombre = toCapitalize(Item.Code)
            $('#selecSedeFiltro').append(`<option value="${Item.Id}">${nombre}</option>`)
        })
    })
}

function filtroGetListAreaInspeccion(id){
    let url = apiUrlssoma+`/api/Get-Area?code=/3LpNcn9xO9QHHicGYY8zI3X3e3VYfOgyNlanKBxNBs1jbgZBV0qFg==&httpmethod=objectlist&unidad_negocio_id=${id}`
    let headers = {
        "apikey":constantes.apiKey,
    }
    $.ajax({
        method: "GET",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function (response) {
        console.log(response)
        $('#selectAreafiltro').html('');
        $('#selectAreafiltro').append(`<option value="" selected>Todos</option>`)
        let nombre = ''
        response.forEach((Item) => {
            nombre = toCapitalize(Item.Description)
            $('#selectAreafiltro').append(`<option value="${Item.Id}">${nombre}</option>`)
        })
    })
}

function buscarInspeccionFiltro(){
    let selectUnidadNegocioFiltro = $('#selectUnidadNegocioFiltro').val();
    let selecSedeFiltro = $('#selecSedeFiltro').val();
    let selectAreafiltro = $('#selectAreafiltro').val();
    let selectFrecuenciaFiltro = $('#selectFrecuenciaFiltro').val();
    let selecEstadoFiltro = $('#selecEstadoFiltro').val();

    let filtros = '';
    if(selectUnidadNegocioFiltro != "" ){
        filtros += '&unit_id='+selectUnidadNegocioFiltro
    }

    if(selecSedeFiltro != ""){
        filtros += '&location_id='+selecSedeFiltro
    }

    if(selectAreafiltro != ""){
        filtros += '&area_id='+selectAreafiltro
    }

    if(selectFrecuenciaFiltro != ""){
        filtros += '&frequency_id='+selectFrecuenciaFiltro
    }

    if(selecEstadoFiltro != ""){
        filtros += '&status_id='+selecEstadoFiltro
    }

    let url = apiUrlssoma+`/api/Get-Inspection?code=mT6CeeQ41ShdqLdZ3amPjgnfwiyWx6HVkU3k7UoEIrvEw8wehPIdHw==&httpmethod=objectlist${filtros}`
    let headers = {
        "apikey":constantes.apiKey,
    }
    console.warn("url -> ", url)
    $.ajax({
        method: "GET",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function (response) {

        console.warn("response -> ", response)
        $('#body-tabla-loader').addClass('d-none')
        $('#cantidad').text(response.length)
        $('#pagination-container').pagination({
            dataSource: response,
            pageSize: 8,
            callback: function(data, pagination) {
                var html = simpleTemplating(data);
                $('#body-tabla-list').html(html);
            }
        })
    })

}

function EditarInspeccionModal(id,tituloFormx){
    clearModalData();
    console.log("######################### andy ###################");
    console.log(id);
    console.log(tituloFormx);

    let url = apiUrlssoma+`/api/Get-Inspection?code=mT6CeeQ41ShdqLdZ3amPjgnfwiyWx6HVkU3k7UoEIrvEw8wehPIdHw==&httpmethod=object&id=${id}`
    let headers = {
        "apikey":constantes.apiKey,
    }
    $.ajax({
        method: "GET",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function (response) {
        editData = response;
        select_covv.value = response.FormularioId.toString();
        unidad_de_negocio.value = response.UnitId.toString();
        $("#editinspectionid").val(response.Id);
        if(response.TipoId==1){
            console.log('programada',response.TipoId)
            document.getElementById("Programada").checked = true;
            //$("#Programada").attr("checked",true);
            Programado();
        }else{
            console.log('no programada',response.TipoId)
            document.getElementById("No-Programada").checked = true;
            //$("#No-Programada").attr("checked",true);NoProgramado();
        }
        if(response.AsignacionTipoId==1){
            console.log("delegable")
            document.getElementById("Delegable").checked = true;
            //$("#Delegable").attr("checked",true);
        }else{
            console.log("No delegable")
            document.getElementById("No-Delegable").checked = true;
            // $("#No-Delegable").attr("checked",true);
        }

        if(response.FrecuenciaId==1){
            // $("#Diario").attr("checked",true);
            document.getElementById("Diario").checked = true;
        }else if(response.FrecuenciaId==2){
            // $("#Semanal").attr("checked",true);
            document.getElementById("Semanal").checked = true;
        }else if(response.FrecuenciaId==3){
            // $("#Mensual").attr("checked",true);
            document.getElementById("Mensual").checked = true;
        }else if(response.FrecuenciaId==4){
            // $("#Trimestral").attr("checked",true);
            document.getElementById("Trimestral").checked = true;
        }else if(response.FrecuenciaId==5){
            // $("#Semestral").attr("checked",true);
            document.getElementById("Semestral").checked = true;
        }else if(response.FrecuenciaId==6){
            // $("#Anual").attr("checked",true);
            document.getElementById("Anual").checked = true;
        }


    })
    $('#titlemodalsave').text('Se actualizará la inspección programada.')
    $('#subtitlemodalsave').text('¿Desea confirmar la actualización de la inspección?')
    $('#modal-programar-inspeccion').addClass('modal_confirmacion__active')
}
//----------------------@andy----------------------------------------

function clearModalData(){
    console.log('clear')
    $("#editinspectionid").val("0");
    select_covv.value = "";
    if(unidad_de_negocio!=null){unidad_de_negocio.value = "";}
    if(sedeModal!=null){sedeModal.value = "";}
    if(areaInspeccion!=null){areaInspeccion.value = "";}
    // $("#Programada").attr("checked",false);
    document.getElementById("Programada").checked = false;
    Programado();
    // $("#No-Programada").attr("checked",false);
    document.getElementById("No-Programada").checked = false;
    // $("#Delegable").attr("checked",false);
    // $("#No-Delegable").attr("checked",false);
    document.getElementById("Delegable").checked = false;
    document.getElementById("No-Delegable").checked = false;

    // $("#Diario").attr("checked",false);
    // $("#Semanal").attr("checked",false);
    // $("#Mensual").attr("checked",false);
    // $("#Trimestral").attr("checked",false);
    // $("#Semestral").attr("checked",false);
    // $("#Anual").attr("checked",false);
    document.getElementById("Diario").checked = false;
    document.getElementById("Semanal").checked = false;
    document.getElementById("Mensual").checked = false;
    document.getElementById("Trimestral").checked = false;
    document.getElementById("Semestral").checked = false;
    document.getElementById("Anual").checked = false;
}