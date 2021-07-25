arrInspectors = [];
arrForms = [];
function listInspecciones(){
    console.log('lista inspecciones asignar inspeccion')
    let storage = getStorage("datosUserInspector", "json");
    let url = apiUrlssoma+`/api/Get-Inspection?code=mT6CeeQ41ShdqLdZ3amPjgnfwiyWx6HVkU3k7UoEIrvEw8wehPIdHw==&httpmethod=objectlist&location_id=${storage.SedeId}`
    let headers = {
        "apikey":constantes.apiKey,
    }
    $.ajax({
        method: "GET",
        url: url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function (response) {
        console.log(response)
        setArrays(response)
        $('#body-tabla-loader').addClass('d-none')
        $('.body-tabla').addClass('hidden')
        $('#cantidad').text(response.length)
        $('#body-tabla-list').html('')
        $('#pagination-container').pagination({
            dataSource: response,
            pageSize: 8,
            callback: function(data, pagination) {
                var html = themeInspeccionIndividual(data);
                $('#body-tabla-list').html(html);
            }
        })

       /*     if(Item.InspectorName != null){
                InspectorName = Item.InspectorName
            }

            $('#body-tabla-list').append(`<div class="item-tabla p-2" style="font-size: 14px">
                    <div class="row m-0 justify-content-between align-items-center">
                        <div class="col-md-1">${Item.Code}</div>
                        <div class="col-md-2">${FormTitle}</div>
                        <div class="col-md-1">${InspectorName}</div>
                        <div class="col-md-2">${Item.AreaName}</div>
                        <div class="col-md-2">${TypeName}</div>
                        <div class="col-md-1">${FrequencyName}</div>
                        <div class="col-md-1">${StatusId}</div>
                        <div class="col-md-1">0</div>
                        <div class="col-1 text-center" id="content-btn-options-${Item.Id}">

                        </div>
                    </div>
                </div>`)

            if(Item.StatusId == 5){
                $('#content-btn-options-'+Item.Id).append(`<button class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-ojo m-auto bmd-btn-fab-sm__xs" onclick="asignarInspeccionModalVencimiento(${Item.Id},${Item.StatusId},'${FormTitle}','${InspectorName}')">
                                <img src="./images/newsistema/iconos/ojo1.svg" alt="" class="w-50">
                            </button>`)
            }else if(Item.StatusId == 1){
                $('#content-btn-options-'+Item.Id).append(`<button class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-ojo m-auto bmd-btn-fab-sm__xs" onclick="asignarInspeccionModal(${Item.Id},'${FormTitle}')">
                                <img src="./images/newsistema/iconos/ojo1.svg" alt="" class="w-50">
                            </button>`)
            }else{
                $('#content-btn-options-'+Item.Id).append(`
                            <button class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-add m-auto bmd-btn-fab-sm__xs" onclick="editarAsignarInspeccionModal(${Item.Id},'${FormTitle}')">
                                <img src="./images/newsistema/iconos/edit1.svg" alt="" class="w-50">
                            </button>
                            <button class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-ojo m-auto bmd-btn-fab-sm__xs" onclick="asignarInspeccionModalVisualizar(${Item.Id},${Item.StatusId},'${FormTitle}','${InspectorName}')">
                                <img src="./images/newsistema/iconos/ojo1.svg" alt="" class="w-50">
                            </button>`)

            }*/


        /*})*/
    })
}

function filtroGetInspectciones(){
    let url = apiUrlssoma+`/api/Get-Inspection?code=mT6CeeQ41ShdqLdZ3amPjgnfwiyWx6HVkU3k7UoEIrvEw8wehPIdHw==&httpmethod=objectlist`
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
        $('#selectInspeccionfiltro').html('');
        $('#selectInspeccionfiltro').append(`<option value=""  >Todos</option>`)
        let nombre = ''
        response.forEach((Item) => {
            nombre = toCapitalize(Item.PersonName)
            $('#selectInspeccionfiltro').append(`<option value="${Item.FormTitle}">${Item.FormTitle}</option>`)
        })
    })
}

function editarAsignarInspeccionModal(id,tituloForm){
    $('#event-asign').val(2);
    $('#titulo-modal-visualizar').text(tituloForm);
    clearModalAsignacionInspector()
    $('#modal-visualizar-lista-responsable').addClass('modal_confirmacion__active')

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

function getInfoInspector(){
    let storage = getStorage("usuario", "json");
    let url = apiUrlssoma+`/api/Get-Inspector?httpmethod=object&code=57N70WaHZQGjp8Wr/aXfyir5sz4KwDyCYdXKTWkE/e7YDa/sAZamzA==&hash_id=${storage.idhash}`
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
        $('.logoCompany').text('Inspección - '+response.UnitCode+' - '+response.SedeName)
        setStorage('datosUserInspector',response,'json');
        listInspecciones();
        filtroGetListAreaInspeccion(response.UnitId)
    })

}
getInfoInspector();

function buscarInspeccionAsignacionIndividual(){
    let selectAreafiltro = $('#selectAreafiltro').val();
    let selectFrecuenciafiltro = $('#selectFrecuenciafiltro').val();
    let selectInspeccionfiltro = $('#selectInspeccionfiltro').val();
    let selecInspectoresFiltro = $('#selecInspectoresFiltro').val();

    let filtros = '';

    if(selectAreafiltro != ''){
        filtros += '&area_id='+selectAreafiltro
    }

    if(selectFrecuenciafiltro != ''){
        filtros += '&frequency_id='+selectFrecuenciafiltro
    }

    if(selectInspeccionfiltro != ''){
        filtros += '&form_id='+selectInspeccionfiltro
    }

    if(selecInspectoresFiltro != ''){
        filtros += '&inspector_id_hash='+selecInspectoresFiltro
    }

    let storage = getStorage("datosUserInspector", "json");

    let url = apiUrlssoma+`/api/Get-Inspection?code=mT6CeeQ41ShdqLdZ3amPjgnfwiyWx6HVkU3k7UoEIrvEw8wehPIdHw==&httpmethod=objectlist&location_id=${storage.SedeId}${filtros}`
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
        $('#cantidad').text(response.length)
        $('#pagination-container').pagination({
            dataSource: response,
            pageSize: 8,
            callback: function(data, pagination) {
                var html = themeInspeccionIndividual(data);
                $('#body-tabla-list').html(html);
            }
        })
    })

}

function setArrays(data){
    arrInspectors=[];
    arrForms=[];
    data.forEach((Item) => {
        if(arrInspectors.length==0){
            arrInspectors.push({hash:Item.InspectorIdHash,name:Item.InspectorName});
        }else{
            let exist = arrInspectors.filter(ins => ins.hash == Item.InspectorIdHash);

            if(exist.length==0){
                arrInspectors.push({hash:Item.InspectorIdHash,name:Item.InspectorName});
            }
        }
        if(arrForms.length==0){
            arrForms.push({id:Item.FormularioId,name:Item.FormTitle});
        }else{
            let exist = arrForms.filter(form => form.id == Item.FormularioId);

            if(exist.length==0){
                arrForms.push({id:Item.FormularioId,name:Item.FormTitle});
            }
        }
    })

    setSelectInspector()
    setSelectForm()
}

function setSelectInspector(){
    $("#selecInspectoresFiltro").empty();
    $("#selecInspectoresFiltro").append("<option value='' selected=''>Todos</option>");
    arrInspectors.forEach((Item) => {
        if(Item.name!=null&&Item.name!=""&&Item.name!=" "){
            $("#selecInspectoresFiltro").append("<option value='"+Item.hash+"'>"+Item.name+"</option>")
        }
    })

}
function setSelectForm(){
    $("#selectInspeccionfiltro").empty();
    $("#selectInspeccionfiltro").append("<option value='0' selected=''>Todos</option>");
    arrForms.forEach((Item) => {
        if(Item.name!=null&&Item.name!=""&&Item.name!=" "){
            $("#selectInspeccionfiltro").append("<option value='"+Item.id+"'>"+Item.name+"</option>")
        }
    })

}

function themeInspeccionIndividual(data) {
    var html = '';

    console.log(data)
    // $.each(data, function(index, item){
    //     html += '<li>'+ item +'</li>';
    // });
    data.forEach((Item) => {

        let FrequencyName = '- -';
        let StatusId = '- -'
        let TypeName = '- -'
        let unidadNegocio = '- -'
        let sede = '- -'
        let areainspeccion = '- -'
        let FormTitle = '- -'
        let InspectorName = '- -'
        let type5 = '';
        let type1 = ''
        let type3 = ''
        let frecuenciaCantidad = 0
        let colorType2 = ''

        if(Item.FormTitle != null){
            FormTitle = Item.FormTitle
        }

        if(Item.InspectorName != null){
            InspectorName =  toCapitalize(Item.InspectorName)
        }

        if(Item.FrequencyName != null){
            FrequencyName = toCapitalize(Item.FrequencyName)
        }

        if(Item.StatusId == 1){
            StatusId = 'Creada';
            type5 = 'd-none';
            type1 = 'd-none'
            type3 = ''
            type2 = 'disabled'
            colorType2 = `style="background: #a3a3a3 !important;cursor: no-drop;"`
        }else if(Item.StatusId == 2){
            StatusId = 'Asignada';
            type5 = 'd-none';
            type1 = ''
            type3 = 'd-none'
            type2 = ''
            colorType2 = ''
        }else if(Item.StatusId == 3){
            StatusId = 'En Ejecución';
            type5 = 'd-none';
            type1 = ''
            type3 = 'd-none'
            type2 = ''
            colorType2 = ''
        }else if(Item.StatusId == 4){
            StatusId = 'Finalizada';
            type5 = 'd-none';
            type1 = ''
            type3 = 'd-none'
            type2 = ''
            colorType2 = ''
        }else if(Item.StatusId == 5){
            StatusId = 'Vencida';
            type5 = '';
            type1 = 'd-none'
            type3 = 'd-none'
            type2 = 'disabled'
            colorType2 = `style="background: #a3a3a3 !important;cursor: no-drop;"`
        }else if(Item.StatusId == 6){
            StatusId = 'Reasignada';
            type5 = 'd-none';
            type1 = ''
            type3 = 'd-none'
            type2 = ''
            colorType2 = ''
        }

        if (Item.TypeName != null){
            TypeName = toCapitalize(Item.TypeName)
        }

        if (Item.UnitName != null){
            unidadNegocio = Item.UnitName
        }

        if (Item.LocationName != null){
            sede = Item.LocationName
        }

        if (Item.AreaName != null){
            areainspeccion = toCapitalize(Item.AreaName)
        }

        if(Item.FrecuenciaId == 1){
            frecuenciaCantidad = 312
        }else if(Item.FrecuenciaId == 2){
            frecuenciaCantidad = 48
        }else if(Item.FrecuenciaId == 3){
            frecuenciaCantidad = 12
        }else if(Item.FrecuenciaId == 4){
            frecuenciaCantidad = 4
        }else if(Item.FrecuenciaId == 5){
            frecuenciaCantidad = 2
        }else if(Item.FrecuenciaId == 6){
            frecuenciaCantidad = 1
        }


        html += `<div class="item-tabla p-2" style="font-size: 14px">
                    <div class="row m-0 justify-content-between align-items-center">
                        <div class="col-md-1">${Item.Code}</div>
                        <div class="col-md-2">${FormTitle}</div>
                        <div class="col-md-1">${InspectorName}</div>
                        <div class="col-md-2">${areainspeccion}</div>
                        <div class="col-md-1">${TypeName}</div>
                        <div class="col-md-1">${FrequencyName}</div>
                        <div class="col-md-1">${StatusId}</div>
                        <div class="col-md-1 text-center">${Item.Responces} / ${frecuenciaCantidad}</div>
                        <div class="col-1 text-center" id="content-btn-options-${Item.Id}">
                            <button class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-add m-auto bmd-btn-fab-sm__xs " ${colorType2} ${type2} onclick="editarAsignarInspeccionModal(${Item.Id},'${FormTitle}')">
                                <img src="./images/newsistema/iconos/edit1.svg" alt="" class="w-50">
                            </button>
                        </div>
                        <div class="col-1 text-center" id="content-btn-options-${Item.Id}">
                            <button class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-ojo m-auto bmd-btn-fab-sm__xs ${type5}" onclick="asignarInspeccionModalVencimiento(${Item.Id},${Item.StatusId},'${FormTitle}','${InspectorName}')">
                                <img src="./images/newsistema/iconos/ojo1.svg" alt="" class="w-50">
                            </button>
                            <button class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-ojo m-auto bmd-btn-fab-sm__xs ${type3}" onclick="asignarInspeccionModal(${Item.Id},'${FormTitle}')">
                                <img src="./images/newsistema/iconos/ojo1.svg" alt="" class="w-50">
                            </button>
                            <button class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-ojo m-auto bmd-btn-fab-sm__xs ${type1}" onclick="asignarInspeccionModalVisualizar(${Item.Id},${Item.StatusId},'${FormTitle}','${InspectorName}')">
                                <img src="./images/newsistema/iconos/ojo1.svg" alt="" class="w-50">
                            </button>
                        </div>
                    </div>
                </div>`;
    })
    html += '';
    return html;
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

function cerrarModal(id){
    $(`#${id}`).removeClass('modal_confirmacion__active')
}

function modalListaUsuarios(){
    $('#event-asign').val(1);
    cerrarModal('modal-visualizar')

    clearModalAsignacionInspector()

    $('#modal-visualizar-lista-responsable').addClass('modal_confirmacion__active')
}

/**
 * [clearModalAsignacionInspector LIMPIAR DATOS DE INSPECTOR]
 * @return {[type]} [description]
 */
function clearModalAsignacionInspector()
{
    // LIMPIAR
    $("#cantidadAsignados").html('00')
    // LIMPIAR IMPUT PARA BUSCAR INSPECTOR
    $("#searchInspector").val('')
    // LIMPIAR LISTA DE INSPECTORES
    $("#contenedor-lista-inspectores").html('')
}

function buscarInspector(){
    let buscador_inspectores = $('.buscador-inspectores').val()
    if(buscador_inspectores.length > 0){
        let url = apiUrlssoma+`/api/Get-Inspector?httpmethod=objectlist&code=57N70WaHZQGjp8Wr/aXfyir5sz4KwDyCYdXKTWkE/e7YDa/sAZamzA==&person_name=${buscador_inspectores}`
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
            $('#contenedor-lista-inspectores').html('')
            response.forEach((Item) => {
                $('#contenedor-lista-inspectores').append(`<div class="inspector-item mb-2" id="Item${Item.Id}" onclick="selectItemListInspectores(${Item.Id},'${Item.PersonName}','${Item.HashId}','${Item.Email}')">${Item.PersonName} <div class="checkicon"><i class="fas fa-check"></i></div> </div>`)
            })
        })
    }else{
        $('#contenedor-lista-inspectores').html('')
    }

}

function selectItemListInspectores(id,nombre,HashId,Email){
    $('#cantidadAsignados').text('01')
    $('.inspector-item').removeClass('inspector-item__active');
    $('#Item'+id).addClass('inspector-item__active');
    $('.buscador-inspectores').val(nombre)
    $('#idInspectorBusqueda').val(HashId)
    $("#EmailBusqueda").val(Email)
}

function activeModalConfirmacion(){
    let event_asign = $('#event-asign').val();
    if(event_asign == 1){
        let idInspectorBusqueda = $('#idInspectorBusqueda').val()
        if(idInspectorBusqueda == ''){

        }else{
            $('#modal-confirmacion').addClass('modal_confirmacion__active')
            cerrarModal('modal-visualizar-lista-responsable')
        }
    }else{
        let idInspectorBusqueda = $('#idInspectorBusqueda').val()
        let storage = getStorage("usuario", "json");
        let data = {
            inspector_id_hash: idInspectorBusqueda,
            status_id: "6",
            created_by: storage.idhash,
            last_updated_by: storage.idhash,
        }
        let idinspeccion = $('#idinspeccion').val()
        let url = apiUrlssoma+`/api/Post-Inspection?code=jKg6Aw0QHRBr2DbAVfg9hpJrLFsxqc3uGtrjOol8bT/SebTkMsMziA==&httpmethod=put&id=${idinspeccion}`
        let headers = {
            "apikey":constantes.apiKey,
        }
        $.ajax({
            method: "post",
            url:  url,
            headers:headers,
            crossDomain: true,
            dataType: "json",
            data: JSON.stringify(data),
        }).done(function (response) {
            console.log(response)
            cerrarModal('modal-visualizar-lista-responsable')
            $('#modal-save_edit').addClass('modal_confirmacion__active')
        })
    }
}


function saveAsignacionInspector(){
    let idInspectorBusqueda = $('#idInspectorBusqueda').val()
    let EmailBusqueda = $("#EmailBusqueda").val()
    let storage = getStorage("usuario", "json");
    let data = {
        inspector_id_hash: idInspectorBusqueda,
        email: EmailBusqueda,
        status_id: "2",
        created_by: storage.idhash,
        last_updated_by: storage.idhash,
    }
    let idinspeccion = $('#idinspeccion').val()
    let url = apiUrlssoma+`/api/Post-Inspection?code=jKg6Aw0QHRBr2DbAVfg9hpJrLFsxqc3uGtrjOol8bT/SebTkMsMziA==&httpmethod=put&id=${idinspeccion}`
    let headers = {
        "apikey":constantes.apiKey,
    }
    $.ajax({
        method: "post",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
        data: JSON.stringify(data),
    }).done(function (response) {
        console.log(response)
        cerrarModal('modal-confirmacion')
        $('#modal-save').addClass('modal_confirmacion__active')
    })

}

function CerrarModalSaveInspeccion(){
    cerrarModal('modal-save')
    listInspecciones()
}

function asignarInspeccionModalVisualizar(id,StatusId,tituloForm,inspector){
    $('#modal-editar').addClass('modal_confirmacion__active')
    $('#titulo-modal-visualizar').text(tituloForm);
    $('#inspector-name').text(inspector)
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
        $('.id_inspeccion2').text(response.Code);
        $('.area_inspeccion2').text(response.AreaName);
        $('#nmbre_inspeccion2').text(response.FormTitle);
        $('#tipo_asignacion2').text(response.AssignTypeName);
        $('#tipo_inspeccion2').text(response.TypeName);
        $('#frecuencia_ejecucion2').text(response.FrequencyName);
        $('#idinspeccion2').val(response.Id)
    })
}

function asignarInspeccionModalVencimiento(id,StatusId,tituloForm,inspector){
    $('#modal-editar2').addClass('modal_confirmacion__active')
    $('.titulo-modal-visualizar').text(tituloForm);
    $('#inspector-name3').text(inspector)
    $('#idInspeccion-habilitarModal').val(id)
    $('#motivo-habilitar-text').val('')
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
        $('.id_inspeccion3').text(response.Code);
        $('.area_inspeccion3').text(response.AreaName);
        $('#nmbre_inspeccion3').text(response.FormTitle);
        $('#tipo_asignacion3').text(response.AssignTypeName);
        $('#tipo_inspeccion3').text(response.TypeName);
        $('#frecuencia_ejecucion3').text(response.FrequencyName);
        $('#idinspeccion3').val(response.Id)
    })
}

function habilitarModal(){
    $('#modal-editar2').removeClass('modal_confirmacion__active')
    $('#modal-habilitar').addClass('modal_confirmacion__active');
}

function habilitarbtnsave(){



    let cantidad = $('#motivo-habilitar-text').val();

    if(cantidad.length <= 140 )
        {
            //lbMotivoVenc
             $('#lbMotivoVenc').html(cantidad.length+" / 140");
        }


    if(cantidad.length > 0){
        $('#btnsavehabilitar').attr('disabled',false)
        $('#btnsavehabilitar').removeClass('btn-disabled')
    }else{
        $('#btnsavehabilitar').attr('disabled',true)
        $('#btnsavehabilitar').addClass('btn-disabled')
    }
}

function mostrarModalSaveHabilitar(){
    $('#modal-habilitar').removeClass('modal_confirmacion__active');
    $('#modal-confirmacion2').addClass('modal_confirmacion__active');
}

function habilitarSave(){
    let motivo = $('#motivo-habilitar-text').val();
    let id = $('#idInspeccion-habilitarModal').val();
    let url = apiUrlssoma+`/api/Post-Inspection?code=jKg6Aw0QHRBr2DbAVfg9hpJrLFsxqc3uGtrjOol8bT/SebTkMsMziA==&httpmethod=put&id=${id}`
    let headers = {
        "apikey":constantes.apiKey,
    }
    let storage = getStorage("usuario", "json");
    let data ={
        status_id: 0,
        created_by: storage.idhash,
        last_updated_by: storage.idhash,
        motive: motivo
    }
    $.ajax({
        method: "post",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
        data: JSON.stringify(data),
    }).done(function (response) {
        console.log(response)
        cerrarModal('modal-confirmacion2');
        $('#modal-save2').addClass('modal_confirmacion__active')
    })
}

function CerrarModalSaveInspeccionReasignado(){
    let event_asign = $('#event-asign').val();
    //alert("event_asign "+event_asign)
    if(event_asign == 2){
        cerrarModal('modal-save_edit');
        cerrarModal('modal-save2');
    }else{
        cerrarModal('modal-save_edit');
        cerrarModal('modal-save2');
    }
    listInspecciones();
}