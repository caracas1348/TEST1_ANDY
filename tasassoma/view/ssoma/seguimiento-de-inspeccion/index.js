


function filtroGetInspectores(){
    let url = apiUrlssoma+`/api/Get-Inspector?httpmethod=objectlist&code=57N70WaHZQGjp8Wr/aXfyir5sz4KwDyCYdXKTWkE/e7YDa/sAZamzA==`
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
        $('#selecInspectoresFiltro').html('');
        $('#selecInspectoresFiltro').append(`<option value=""  >Todos</option>`)
        let nombre = ''
        response.forEach((Item) => {
            nombre = toCapitalize(Item.PersonName)
            $('#selecInspectoresFiltro').append(`<option value="${Item.HashId}">${nombre}</option>`)
        })
    })
}

function getSeguimientoInspeccionList(){
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
        $('#body-tabla-loader').addClass('d-none')
        $('#pagination-container').pagination({
            dataSource: response,
            pageSize: 7,
            callback: function(data, pagination) {
                var html = thempleteSeguimientoInspeccion(data);
                $('#body-tabla-list').html(html);
            }
        })
        $('.body-tabla').addClass('hidden')
        $('#cantidad').text(response.length)

    })
}

function buscarSeguimientoInspeccionFiltro(){
    let selectUnidadNegocioFiltro = $('#selectUnidadNegocioFiltro').val();
    let selecSedeFiltro = $('#selecSedeFiltro').val();
    let selectAreafiltro = $('#selectAreafiltro').val();
    let selecEstadoFiltro = $('#selecEstadoFiltro').val();
    let selecInspectoresFiltro = $('#selecInspectoresFiltro').val();
    let inspectionNameFiltro = $('#inspectionNameFiltro').val();

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

    if(selecEstadoFiltro != ""){
        filtros += '&status_id='+selecEstadoFiltro
    }

    if(inspectionNameFiltro != ""){
        filtros += '&inspection_name='+inspectionNameFiltro
    }

    if(selecInspectoresFiltro != ""){
        filtros += '&inspector_id_hash='+selecInspectoresFiltro
    }

    let url = apiUrlssoma+`/api/Get-Inspection?code=mT6CeeQ41ShdqLdZ3amPjgnfwiyWx6HVkU3k7UoEIrvEw8wehPIdHw==&httpmethod=objectlist${filtros}`
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
                var html = thempleteSeguimientoInspeccion(data);
                $('#body-tabla-list').html(html);
            }
        })
    })
}

function thempleteSeguimientoInspeccion(data) {
    var html = '';

    console.log(data)

    data.forEach((Item) => {
        let FrequencyName = '- -';
        let StatusId = '- -'
        let TypeName = '- -'
        let unidadNegocio = '- -'
        let sede = '- -'
        let areainspeccion = '- -'
        let InspectorName = '- -'
        let dnone = '- -'
        let noEjecucion = '';
        let frecuenciaCantidad = 0

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
            StatusId = 'Incompleta';
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
            sede = toCapitalize(Item.LocationName) 
        }

        if (Item.AreaName != null){
            areainspeccion = toCapitalize(Item.AreaName)
        }

        if(Item.InspectorName != null){
            InspectorName = toCapitalize(Item.InspectorName)
        }

        if(Item.Responces == 0){
            dnone = 'd-none'
        }

        /*if(Item.FrecuenciaId == 1){
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
        }*/
        frecuenciaCantidad = Item.ExecutionsNumber;


        noEjecucion = Item.Responces+' / '+frecuenciaCantidad;

        if(Item.FormularioId == 358 || Item.FormularioId == 359 ){
            dnone = ''
            noEjecucion = '1 / 1';
        }

        html += `<div class="item-tabla p-2" style="font-size: 14px">
            <div class="row m-0 justify-content-between align-items-center">
                <div class="col-md-1">${Item.Code}</div>
                <div class="col-md-2">${Item.FormTitle}</div>
                <div class="col-md-1">${InspectorName}</div>
                <div class="col-md-1">${unidadNegocio}</div>
                <div class="col-md-1">${sede}</div>
                <div class="col-md-1">${areainspeccion}</div>
                <div class="col-md-1">${TypeName}</div>
                <div class="col-md-1">${FrequencyName}</div>
                <div class="col-md-1">${StatusId}</div>
                <div class="col-1 text-center">${noEjecucion}</div>
                <div class="col-1 text-center">
                    <button class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-ojo m-auto bmd-btn-fab-sm__xs ${dnone}" onclick="listarRespuestasInspeccion(${Item.Id},'${Item.FormTitle}','${Item.Code}',${Item.ExecutionsNumber},${Item.FormularioId}, '${Item.InspectorName}')">
                        <img src="./images/newsistema/iconos/ojo1.svg" alt="" class="w-50">
                    </button>
                </div>
            </div>
        </div>`;
    })
    html += '';
    return html;
}

function listarRespuestasInspeccion(Idform,Titulo,codigo,ExecutionsNumber,FormularioId, InspectorName){
    $('#modal-ver-respuesta').addClass('modal_confirmacion__active')
    $('#codigo-consultado').text(Titulo);
    $('#title-consultado').text(codigo);

    //alert('EL INSPECTOR ES = '+InspectorName);
    let url = apiUrlssoma+`/api/Get-Response?code=u4szwywl2GLlOJfyw8dwzo5anTX1ZPVbwXqsWlA/uYIAV/JwvtYZCw==&httpmethod=objectlist&inspection_id=${Idform}`
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
        $('#body-tabla-loader2').addClass('d-none')
        $('#pagination-container2').pagination({
            dataSource: response,
            pageSize: 4,
            callback: function(data, pagination) {
                 $('#body-tabla-list2').html("Cargando....");
                var html = thempleteSeguimientoInspeccionRegistros(data,ExecutionsNumber,FormularioId,Titulo,codigo, InspectorName);
                $('#body-tabla-list2').html(html);
            }
        })
        $('.body-tabla').addClass('hidden')
    })

}

function thempleteSeguimientoInspeccionRegistros(data,ExecutionsNumber,FormularioId,Titulo,codigo, InspectorName) {
    var html = '';
    let FrecuenciaId_num = ExecutionsNumber;
    /*if(FrecuenciaId == 1){
        FrecuenciaId_num = 312
    }else if(FrecuenciaId == 2){
        FrecuenciaId_num = 48
    }else if (FrecuenciaId == 3){
        FrecuenciaId_num = 12
    }else if(FrecuenciaId == 4){
        FrecuenciaId_num = 4
    }else if(FrecuenciaId == 5){
        FrecuenciaId_num = 2
    }else if (FrecuenciaId == 6){
        FrecuenciaId_num = 1
    }*/

    console.log(data)
    data.forEach((Item , Index) => {
        let cantidad = Item.Posicion;
        let fecha = moment(`${Item.Last_Updated_Date}`).format("DD/MM/YYYY");
        let hora = moment(`${Item.Last_Updated_Date}`).format("HH:MM:SS");
        let unidadNegocio = '- -'
        let sede = '- -'
        let areainspeccion = '- -'
        let areaResponsable ="";
        let person = '- -'
        let func = "";
        let funcver = "";

        if (cantidad <= 9){
            cantidad = '0'+cantidad
        }
        if(Item.NameAreaResponsible!="" && Item.NameAreaResponsible!=null)
        areaResponsable=Item.NameAreaResponsible;

        if (Item.UnitName != null){
            unidadNegocio = Item.UnitName
        }

        if(Item.PersonName != null){
            person = Item.PersonName

            if(InspectorName != Item.PersonName){
               person = InspectorName;
            }

        }

        if (Item.SedeName != null){
            sede = Item.SedeName
        }

        if (Item.AreaName != null){
            areainspeccion = Item.AreaName
        }

        if(Item.FormularioId == 358){
            func = "PDFInopinadas("+Item.Id+","+Item.InspectionId+")"
            funcVer = `verRespuestaInspeccion(${Item.Id},${FormularioId},'${Titulo}','${codigo}')`
        } else if(Item.FormularioId == 359){
            func = "PDFIas("+Item.Id+","+Item.InspectionId+")"
            funcVer = `verRespuestaIAS(${Item.Id},${FormularioId},'${Titulo}','${codigo}')`
        }else{
            func = `PDFRespuestasInspeccion(${Item.Id},${FormularioId},'${fecha}','${hora}','${person}','${unidadNegocio}','${sede}','${areainspeccion}','${areaResponsable}','${Item.InspectionCode}')`
            funcVer = `verRespuestaInspeccion(${Item.Id},${FormularioId},'${Titulo}','${codigo}')`
        }

        html += `<div class="item-tabla p-2" style="font-size: 14px">
            <div class="row m-0 justify-content-between align-items-center">
                <div class="col-md-2">${cantidad} / ${Item.FormularioId == 358?'01':FrecuenciaId_num}</div>
                <div class="col-md-2">${fecha}</div>
                <div class="col-md-1">${person}</div>
                <div class="col-md-2">${unidadNegocio}</div>
                <div class="col-md-2">${sede}</div>
                <div class="col-md-1">${areainspeccion}</div>
                <div class="col-1 text-center">
                    <button class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-trash2 m-auto bmd-btn-fab-sm__xs" value="${Item.Id}" onclick="${func}">
                        <span><i class="fas fa-download" style="font-size: 14px;color: #fff;"></i></span>
                    </button>
                </div>
                <div class="col-1 text-center">
                    <button class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-add m-auto bmd-btn-fab-sm__xs" onclick="${funcVer}">
                        <img src="./images/newsistema/iconos/ojo1.svg" alt="" class="w-50">
                    </button>
                </div>
            </div>
        </div>`;
    })
    html += '';
    return html;
}

function verRespuestaInspeccion(idResponse,IdFormulario,title,Code){
    $('#modal-ver-respuesta').removeClass('modal_confirmacion__active')
    $('#modal-observacion').addClass('modal_confirmacion__active')
    $('#title_modal_response').text(title)
    let url = `https://0p3r4ti0n5ecur3-prd-forms.azurewebsites.net/api/Get-Form?httpmethod=objectSsoma&id=${IdFormulario}&code=sXuJLNZw7GvtzAVQYMAfMHvPCSaMZWbzrv77Qa2zQksUwIbga52tSg==&response_id=${idResponse}&ambiente=${ambiente}`
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
        let cantidad_subitem = 0
        $('#contenido-detalle__response').html('')
        response.question_list.forEach((preguntas,index) => {

            let cantidad = index + 1
            if(cantidad < 10){
                cantidad = '0'+cantidad
            }
            $('#contenido-detalle__response').append(`<div class="d-flex border-bottom py-2">
                    <div class="col-1" style="color: #34559c;font-weight: bold">${cantidad}</div>
                    <div class="col-11">
                        <div class="title text-left" style="font-size: 14px">
                            ${preguntas.description}
                        </div>
                        <div class="respuest pt-3" id="respuesta-${cantidad}">
                        
                        </div>
                    </div>
                </div>`)

            preguntas.question_types.forEach((subItems,subItemsIndex) => {
                cantidad_subitem = cantidad_subitem + 1

                if(subItems.type_object_id == 1 && subItems.question_item_list.length > 0){
                    $('#respuesta-'+cantidad).append(`<div class="border-bottom" id="subItem${cantidad_subitem}"></div>`)
                    $('#subItem'+cantidad_subitem).append(`<div class="d-flex  ">
                                    <div class="d-flex my-3 flex-wrap" id="sino1">
                                        <div class="content-sino w-100 justify-content-start">
                                            <div class="checklist" id="checklistsi${cantidad_subitem}"></div>
                                            <span class="mx-2 font-weight-bold">Si</span>
                                            <div class="border d-none p-2 my-2" id="rptasi${cantidad_subitem}" style="border-radius: 20px;min-height: 30px;width: 74%;"></div>
                                        </div>
                                        <div class="content-sino w-100 mt-2 justify-content-start">
                                            <div class="checklist" id="checklistno${cantidad_subitem}"></div>
                                            <span class="mx-2 font-weight-bold" >No</span>
                                            <div class="border d-none p-2 my-2" id="rptano${cantidad_subitem}" style="border-radius: 20px;min-height: 30px;width: 74%;"></div>
                                        </div>
                                        <div class="content-sino w-100 mt-2 justify-content-start">
                                            <div class="checklist" id="checklistna${cantidad_subitem}"></div>
                                            <span class="mx-2 font-weight-bold">N.A.</span>
                                            <div class="border d-none p-2 my-2" id="rptana${cantidad_subitem}" style="border-radius: 20px;min-height: 30px;width: 74%;"></div>
                                        </div>
                                    </div>
                            </div>`)
                    subItems.question_item_list.forEach((question_item_list_response) => {
                        if(question_item_list_response.description == 'si'){
                            if(question_item_list_response.flag_answer){
                                $('#rptasi'+cantidad_subitem).removeClass('d-none')
                                $('#rptasi'+cantidad_subitem).text(question_item_list_response.add)
                            }
                            if(question_item_list_response.resp){
                                $('#checklistsi'+cantidad_subitem).css('border','solid 3px #d2d97b')
                                $('#checklistsi'+cantidad_subitem).css('background-color','#d2d97b')
                            }
                        }else if(question_item_list_response.description == 'no'){
                            if(question_item_list_response.flag_answer){
                                $('#rptano'+cantidad_subitem).removeClass('d-none')
                                $('#rptano'+cantidad_subitem).text(question_item_list_response.add)
                            }
                            if(question_item_list_response.resp){
                                $('#checklistno'+cantidad_subitem).css('border','solid 3px #d2d97b')
                                $('#checklistno'+cantidad_subitem).css('background-color','#d2d97b')
                            }
                        }else if(question_item_list_response.description == 'na'){
                            if(question_item_list_response.flag_answer){
                                $('#rptana'+cantidad_subitem).removeClass('d-none')
                                $('#rptana'+cantidad_subitem).text(question_item_list_response.add)
                            }
                            if(question_item_list_response.resp){
                                $('#checklistna'+cantidad_subitem).css('border','solid 3px #d2d97b')
                                $('#checklistna'+cantidad_subitem).css('background-color','#d2d97b')
                            }
                        }
                    })
                }else if(subItems.type_object_id == 2 && subItems.question_item_list.length > 0){
                    $('#respuesta-'+cantidad).append(`<div class="border-bottom" id="subItem${cantidad_subitem}"></div>`)
                    $('#subItem'+cantidad_subitem).append(`<div class="content-sino py-3 justify-content-start mr-4" id="ampliacionrespuesta2">
                                          <i class="fas fa-code-branch icon-multiple" aria-hidden="true"></i>
                                           <span class="ml-3">Rpt. Múltiple</span>
                                       </div>`)
                    subItems.question_item_list.forEach((question_item_list_response) => {
                        if(question_item_list_response.resp){
                            $('#subItem'+cantidad_subitem).append(`<div class="border bg-green-lime  w-100 p-2 my-2" style="border-radius: 20px;">${question_item_list_response.description}</div>`)
                        }else{
                            $('#subItem'+cantidad_subitem).append(`<div class="border w-100 p-2 my-2" style="border-radius: 20px;">${question_item_list_response.description}</div>`)
                        }

                    })
                }else if(subItems.type_object_id == 3 && subItems.question_item_list.length > 0){
                    $('#respuesta-'+cantidad).append(`<div class="border-bottom" id="subItem${cantidad_subitem}"></div>`)
                    $('#subItem'+cantidad_subitem).append(`<div class="content-sino py-3 justify-content-start mr-4" id="ampliacionrespuesta2">
                                           <img src="./images/newsistema/iconos/atmospheric3.svg" alt="">
                                           <span class="ml-3">Temperatura</span>
                                       </div>`)
                    subItems.question_item_list.forEach((question_item_list_response) => {
                        if(question_item_list_response.resp){
                            $('#subItem'+cantidad_subitem).append(`<div class="border bg-green-lime  w-100 p-2 my-2" style="border-radius: 20px;">${question_item_list_response.add}</div>`)
                        }else{
                            $('#subItem'+cantidad_subitem).append(`<div class="border w-100 p-2 my-2" style="border-radius: 20px;">- -</div>`)
                        }

                    })

                }else if(subItems.type_object_id == 4 && subItems.question_item_list.length > 0){
                    $('#respuesta-'+cantidad).append(`<div class="border-bottom" id="subItem${cantidad_subitem}"></div>`)
                    $('#subItem'+cantidad_subitem).append(`<div class="content-sino py-3 justify-content-start mr-4" id="ampliacionrespuesta2">
                                           <img src="./images/newsistema/iconos/pen.svg" alt="">
                                           <span class="ml-3">Ampliar respuesta</span>
                                       </div>`)
                    subItems.question_item_list.forEach((question_item_list_response) => {
                        if(question_item_list_response.resp){
                            $('#subItem'+cantidad_subitem).append(`<div class="border bg-green-lime  w-100 p-2 my-2" style="border-radius: 20px;">${question_item_list_response.add}</div>`)
                        }else{
                            $('#subItem'+cantidad_subitem).append(`<div class="border w-100 p-2 my-2" style="border-radius: 20px;">- -</div>`)
                        }

                    })
                }else if(subItems.type_object_id == 5 && subItems.question_item_list.length > 0){
                    $('#respuesta-'+cantidad).append(`<div class="border-bottom" id="subItem${cantidad_subitem}"></div>`)
                    $('#subItem'+cantidad_subitem).append(`<div class="content-sino py-3 justify-content-start mr-4" id="ampliacionrespuesta2">
                                           <i class="fas fa-camera" aria-hidden="true"></i>
                                           <span class="ml-3">Evidencia</span>
                                       </div>`)
                    subItems.question_item_list.forEach((question_item_list_response) => {
                        $('#subItem'+cantidad_subitem).append(`<div class="content-camara m-auto">
                                                <button class="btn-round-green w-100 btn mr-4 mb-3 flex align-items-center justify-content-center">
                                                    <img src="./images/newsistema/iconos/photo-camera-FFF.svg" alt="">
                                                    <strong class="mx-2">Evidencia</strong></button>
                                                <div class="border w-100 p-2 my-2" style="border-radius: 20px; height: 44px">${question_item_list_response.text}</div>
                                            </div>`)
                        if(question_item_list_response.resp){
                            $('#subItem'+cantidad_subitem).append(`<img src="${question_item_list_response.add}" class="img-fluid">`)
                        }
                    })
                }else if(subItems.type_object_id == 6 && subItems.question_item_list.length > 0){
                    $('#respuesta-'+cantidad).append(`<div class="border-bottom" id="subItem${cantidad_subitem}"></div>`)
                    $('#subItem'+cantidad_subitem).append(`<div class="content-sino py-3 justify-content-start mr-4" id="ampliacionrespuesta2">
                                           <img src="./images/newsistema/iconos/informacion2.svg" alt="">
                                           <span class="ml-3">Criticidad</span>
                                       </div>`)
                    subItems.question_item_list.forEach((question_item_list_response) => {
                        if(question_item_list_response.resp){
                            $('#subItem'+cantidad_subitem).append(`<div class="border bg-green-lime  w-100 p-2 my-2" style="border-radius: 20px;">${question_item_list_response.description}</div>`)
                        }else{
                            $('#subItem'+cantidad_subitem).append(`<div class="border w-100 p-2 my-2" style="border-radius: 20px;">${question_item_list_response.description}</div>`)
                        }
                    })
                }else if(subItems.type_object_id == 7 && subItems.question_item_list.length > 0){
                    $('#respuesta-'+cantidad).append(`<div class="border-bottom" id="subItem${cantidad_subitem}"></div>`)
                    $('#subItem'+cantidad_subitem).append(`<div class="content-sino py-3 justify-content-start mr-4" id="ampliacionrespuesta2">
                                           <img src="./images/newsistema/iconos/subida.svg" alt="">
                                           <span class="ml-3">Imagen adjuntada</span>
                                       </div>`)
                    subItems.question_item_list.forEach((question_item_list_response) => {
                        $('#subItem'+cantidad_subitem).append(`<img src="${question_item_list_response.text}" class="img-fluid">`)
                    })
                }else if(subItems.type_object_id == 8 && subItems.question_item_list.length > 0){
                    $('#respuesta-'+cantidad).append(`<div class="border-bottom" id="subItem${cantidad_subitem}"></div>`)
                    $('#subItem'+cantidad_subitem).append(`<div class="content-sino py-3 justify-content-start mr-4" id="ampliacionrespuesta2">
                                           <img src="./images/newsistema/iconos/pregunta1.svg" alt="">
                                           <span class="ml-3">Preguntas y respuestas</span>
                                       </div>`)
                    subItems.question_item_list.forEach((question_item_list_response) => {
                        // if(question_item_list_response.selection_type == 1){
                        //     $('#subItem'+cantidad_subitem).append(`<div >${question_item_list_response.text}</div>
                        //             <div class="border w-100 p-2 my-2" style="border-radius: 20px;">${question_item_list_response.add}</div>`)
                        // }

                        if(question_item_list_response.item_option_list.length > 0 ){
                            question_item_list_response.item_option_list.forEach((item_option_list) => {
                            $('#subItem'+cantidad_subitem).append(`<div >${question_item_list_response.text}</div>
                            <div >${item_option_list.title}</div>
                                    <div class="border w-100 p-2 my-2" style="border-radius: 20px;">${item_option_list.add == null ? "--" : item_option_list.add}</div>`)
                            
                            })
                        }else{

                            $('#subItem'+cantidad_subitem).append(`<div >${question_item_list_response.text}</div>
                                    <div class="border w-100 p-2 my-2" style="border-radius: 20px;">${question_item_list_response.add == null ? "--" : question_item_list_response.add}</div>`)
                   
                    }
                    })
                }

            })
        })
    })
}

function PDFRespuestasInspeccion222(Idform,IdFormulario){


    let url = `https://0p3r4ti0n5ecur3-prd-forms.azurewebsites.net/api/Get-Form?httpmethod=objectSsoma&id=${IdFormulario}&code=sXuJLNZw7GvtzAVQYMAfMHvPCSaMZWbzrv77Qa2zQksUwIbga52tSg==&response_id=${Idform}`
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
        var img = new Image();
        img.src = './images/logopdf.png';
        var doc = new jsPDF();
        doc.autoTable.previous.finalY=0;
        doc.addImage(img, 'PNG', 15, 10, 30, 20)
        doc.setFontSize(8)
        doc.setFontSize(16)
        doc.text(80, 45, 'Detalle de Inspección') 
      
        doc.setFontSize(10)
        doc.setFontType('normal')

        response.question_list.map(function(item)
        {
            var colStyle = {};
            var col =0;
            var body = [];
            var pre_body = [];
           //console.log(item)

           item.question_types.map(function(resp)
           {
               if(resp.type_object_id==1 && resp.question_item_list.length>0){
                col =3;
                    body.push(['SI','NO','N/A'],);
                    resp.question_item_list.map(function(data)
                    {
                        if( data.description == 'si' && data.resp == "true"){
                            body.push(['X','',''],);
                        }else if(data.description == 'no'  && data.resp == "true"){
                            body.push(['','X',''],);
                        }else if( data.description == 'na'  && data.resp == "true"){
                            body.push(['','','X'],);

                        }
                    })
                   
               }
               if(resp.type_object_id==2 && resp.question_item_list.length>0){
                   col =3;
                resp.question_item_list.map(function(data){
                   if(data.resp == "true"){
                    pre_body.push(['( X ) '+data.description,],)
                   }else{
                    pre_body.push(['(   ) '+data.description,],)

                   }
                })
               }
               if(resp.type_object_id==3 && resp.question_item_list.length>0){
                resp.question_item_list.map(function(data){

                   colStyle = { 
                   0: { fillColor: [192, 192, 192], textColor: 0, fontStyle: 'bold' , cellWidth: 95},
                
                }
                   col = 2;
                   body.push([data.description, data.add])
               })
            }
            if(resp.type_object_id==4 && resp.question_item_list.length>0){
                resp.question_item_list.map(function(data){

                   colStyle = { 
                   0: { fillColor: [192, 192, 192], textColor: 0, fontStyle: 'bold' , cellWidth: 95},
                
                }
                   col = 2;
                   body.push([data.description, data.add])
               })
            }

            if(resp.type_object_id==5 && resp.question_item_list.length>0){
                resp.question_item_list.map(function(data){

                   colStyle = { 
                   0: { fillColor: [192, 192, 192], textColor: 0, fontStyle: 'bold' , cellWidth: 95, height : 70},
                
                }
                   col = 2;
                   body.push([data.description])
               })
            }   
            if(resp.type_object_id==6 && resp.question_item_list.length>0){
                resp.question_item_list.map(function(data){

                          col = 4;
                          

                   if(data.item_option_list!=null){
                    pre_body.push([data.description])
                    data.item_option_list.map(function(rec){
                        pre_body.push([rec.title +'  '+rec.add],)

                    })

                   }else{
                    if(data.resp == "true"){
                        pre_body.push(['( X ) '+data.description])
                       }else{
                        pre_body.push(['(   ) '+data.description])
    
                       }
                   }
               })
            }


            if(resp.type_object_id==8 && resp.question_item_list.length>0){
                resp.question_item_list.map(function(data){

                    col = 3;
                    

             if(data.item_option_list!=null){
              pre_body.push([data.description])
              data.item_option_list.map(function(rec){
                  pre_body.push([rec.title +'  '+rec.add],)

              })

             }else{
              if(data.resp == "true"){
                  pre_body.push(['( X ) '+data.description])
                 }else{
                  pre_body.push(['(   ) '+data.description])

                 }
             }
         })

            } 
           })
var start = 0;
           if(doc.autoTable.previous.finalY < 1 || doc.autoTable.previous.finalY == "" || doc.autoTable.previous.finalY == null){
            start = 40;
           }else{
            start = doc.autoTable.previous.finalY;
            if(start>240){
                doc.addPage();
                start = 20;
            }
           }
           if(body.length<1){
               body.push(pre_body);
           }



           doc.autoTable({
            head: [[{
                content: item.description,
                colSpan: col,
                styles: { halign: 'left' },
              }]],
            body: body
            ,      
             theme: 'grid',
             columnStyles : colStyle,
             styles: {fontSize: 8, rowPageBreak: 'auto'},     
             startY: start+10,
             
          })
          
        });

        var pageCount = doc.internal.getNumberOfPages();
        for(i = 0; i < pageCount; i++) { 
        doc.setPage(i); 
        doc.setFontSize(10);
        doc.text(190,10, doc.internal.getCurrentPageInfo().pageNumber + "/" + pageCount);
        }
          doc.save('table.pdf')
        

    })

}


function PDFRespuestasInspeccion(Idform,IdFormulario,fecha,hora,person,unidadNegocio,sede,areainspeccion,areaResponsable,InspectionCode){

console.log(Idform,IdFormulario,fecha,hora,person,unidadNegocio,sede,areainspeccion,areaResponsable,InspectionCode)
    let url = `https://0p3r4ti0n5ecur3-prd-forms.azurewebsites.net/api/Get-Form?httpmethod=objectSsoma&id=${IdFormulario}&code=sXuJLNZw7GvtzAVQYMAfMHvPCSaMZWbzrv77Qa2zQksUwIbga52tSg==&response_id=${Idform}&ambiente=${ambiente}`
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
        var anio = (new Date).getFullYear();

        var doc = new jsPDF();
        var img_sup = new Image();
        img_sup.src = './images/img_superior_pdf.png';
    
        var img_log = new Image();
        img_log.src = './images/Logo_tasa_pdf.png';
    
        var img_inf = new Image();
        img_inf.src = './images/img_inferior_pdf.png';
    
        var img_header = new Image();
        img_header.src = './images/img_header.png';
    
        var img_logo_header = new Image();
        img_logo_header.src = './images/img_logo_header.png';
    
        var img_letras = new Image();
        img_letras.src = './images/img_letras.png';
    
    
        doc.addImage(img_sup, 'PNG', 0, 0, 210, 128)
        doc.addImage(img_inf, 'PNG', 0, 186, 210, 110)
        doc.addImage(img_log, 'PNG', 49, 115, 110, 37)
        doc.setFontType('bold')
        doc.setTextColor(52,85,156); 
        doc.text(108, 160, 'Inspecciones',{align: 'center'});
        doc.text(108, 167,''+response.title,{align: 'center'});
        doc.setTextColor(178,178,178); 
       //doc.text(76, 161, '___________');
        doc.text(108, 176, ''+anio,{align: 'center'});
    
    
    
        doc.addPage();
        doc.addImage(img_header, 'PNG', 0, 0, 210, 21)
        doc.addImage(img_logo_header, 'PNG', 6, 5, 23, 8)
    
        doc.addImage(img_sup, 'PNG', 0, 22, 210, 128)
        doc.addImage(img_inf, 'PNG', 0, 186, 210, 110)
    
        doc.setFontSize(10)
        doc.setFontType('bold')
        doc.setTextColor(0,0,0); 
        doc.text(9, 34, 'Datos Principales');
        doc.setTextColor(200,200,200); 
        doc.text(40, 34, '___________________________________________________________________________');
        var img_menu = new Image();
        img_menu.src = './images/img_menu.png';

       
    
        doc.addImage(img_menu, 'PNG', 195, 30, 5, 5)
        doc.setFontSize(8)
        doc.setFontType('normal')

         var img_copia = new Image();
        img_copia.src = './images/copia_ins.png';
        doc.setTextColor(52,85,156); 
        doc.text(13, 45, 'Inspección');
        doc.addImage(img_copia, 'PNG', 9, 43, 2, 2)

        doc.setTextColor(87); 
        doc.setDrawColor(200);
        doc.setFillColor(255);
        doc.rect(9, 46, 90, 7, 'DF');
        doc.text(''+response.title,50, 50,{align:'center',maxWidth:90});

        var img_user_ = new Image();
        img_user_.src = './images/user_insp.png';
        doc.setTextColor(52,85,156); 
        doc.text(109, 45, 'Responsable del Área');
        doc.addImage(img_user_, 'PNG', 105, 43, 2, 2)
        doc.setTextColor(87); 
        doc.setDrawColor(200);
        doc.setFillColor(255);
        doc.rect(105, 46, 90, 7, 'DF');
        doc.text(''+toCapitalize(areaResponsable),150, 50,{align:'center',maxWidth:90});

        var img_file_ = new Image();
        img_file_.src = './images/file_insp.png';
        doc.setTextColor(52,85,156); 
        doc.text(13, 59 , 'ID Formato');
        doc.addImage(img_file_, 'PNG', 9, 57, 2, 2)
        doc.setTextColor(87); 
        doc.setDrawColor(200);
        doc.setFillColor(255);
        doc.rect(9, 60, 90, 7, 'DF');
        doc.text(''+InspectionCode,50, 64,{align:'center',maxWidth:90});

        var img_file_ = new Image();
        img_file_.src = './images/gps_insp.png';
        doc.setTextColor(52,85,156); 
        doc.text(109, 59 , 'Sede /U.O');
        doc.addImage(img_file_, 'PNG', 105, 57, 2, 2)
        doc.setTextColor(87); 
        doc.setDrawColor(200);
        doc.setFillColor(255);
        doc.rect(105, 60, 90, 7, 'DF');
        doc.text(''+toCapitalize(sede),150, 64,{align:'center',maxWidth:90});

        
        var img_file_ = new Image();
        img_file_.src = './images/gps_insp.png';
        doc.setTextColor(52,85,156); 
        doc.text(13, 73 , 'Dirección de la Unidad Operativa');
        doc.addImage(img_file_, 'PNG', 9, 71, 2, 2)
        doc.setTextColor(87); 
        doc.setDrawColor(200);
        doc.setFillColor(255);
        doc.rect(9, 74, 90, 7, 'DF');
        doc.text(''+unidadNegocio,50, 78,{align:'center',maxWidth:90});
        
        var img_file_ = new Image();
        img_file_.src = './images/gps_insp.png';
        doc.setTextColor(52,85,156); 
        doc.text(109, 73 , 'Área');
        doc.addImage(img_file_, 'PNG', 105, 71, 2, 2)
        doc.setTextColor(87); 
        doc.setDrawColor(200);
        doc.setFillColor(255);
        doc.rect(105, 74, 90, 7, 'DF');
        doc.text(''+areainspeccion,150, 78,{align:'center',maxWidth:90});

        var img_user_ = new Image();
        img_user_.src = './images/user_insp.png';
        doc.setTextColor(52,85,156); 
        doc.text(13, 87 , 'Nombre del Inspector');
        doc.addImage(img_user_, 'PNG', 9, 85, 2, 2)
        doc.setTextColor(87); 
        doc.setDrawColor(200);
        doc.setFillColor(255);
        doc.rect(9, 88, 90, 7, 'DF');
        doc.text(''+toCapitalize(person),50, 92,{align:'center',maxWidth:90});
       
        var img_user_ = new Image();
        img_user_.src = './images/user_insp.png';
        doc.setTextColor(52,85,156); 
        doc.text(109, 87 , 'Área');
        doc.addImage(img_user_, 'PNG', 105, 85, 2, 2)
        doc.setTextColor(87); 
        doc.setDrawColor(200);
        doc.setFillColor(255);
        doc.rect(105, 88, 90, 7, 'DF');
        doc.text(''+toCapitalize(areaResponsable),150, 92,{align:'center',maxWidth:90});

        var img_calendario_ = new Image();
        img_calendario_.src = './images/calendario_insp.png';
        doc.setTextColor(52,85,156); 
        doc.text(13, 101 , 'Fecha de Inspección');
        doc.addImage(img_calendario_, 'PNG', 9, 99, 2, 2)
        doc.setTextColor(87); 
        doc.setDrawColor(200);
        doc.setFillColor(255);
        doc.rect(9, 102, 90, 7, 'DF');
        doc.text(''+fecha,50, 106,{align:'center',maxWidth:90});
        
        var img_calendar_ = new Image();
        img_calendar_.src = './images/calendar_insp.png';
        doc.setTextColor(52,85,156); 
        doc.text(109, 101 , 'Hora de Inspección');
        doc.addImage(img_calendar_, 'PNG', 105, 99, 2, 2)
        doc.setTextColor(87); 
        doc.setDrawColor(200);
        doc.setFillColor(255);
        doc.rect(105, 102, 90, 7, 'DF');
        doc.text(''+hora,150, 106,{align:'center',maxWidth:90});


        doc.setFontSize(10)
        doc.setFontType('bold')
        doc.setTextColor(0,0,0); 
        doc.text(9, 120, 'Checklist');
        doc.setTextColor(200,200,200); 
        doc.text(27, 120, '__________________________________________________________________________________');
        var img_vector = new Image();
        img_vector.src = './images/Vector_insp.png';
    
        doc.addImage(img_vector, 'PNG', 195, 116, 5, 4)
        doc.setTextColor(52,85,156); 
        doc.setFontType('normal')

        var numQuestions = 1;
        var cero='0';
        var posYChecklist =126;
        response.question_list.map(function(item)
        {
            if(posYChecklist > 240){
                doc.addPage();
                doc.addImage(img_header, 'PNG', 0, 0, 210, 21)
                doc.addImage(img_logo_header, 'PNG', 6, 5, 23, 8)

                doc.addImage(img_sup, 'PNG', 0, 22, 210, 128)
                doc.addImage(img_inf, 'PNG', 0, 186, 210, 110)
              posYChecklist = 32;
                doc.setFontSize(10)
                doc.setFontType('bold')
                doc.setTextColor(0,0,0); 
                doc.text(9, 30, 'Checklist');
                doc.setTextColor(200,200,200); 
                doc.text(27, 30, '__________________________________________________________________________________');
                var img_menu = new Image();
                img_menu.src = './images/img_menu.png';
            
                doc.addImage(img_menu, 'PNG', 195, 26, 5, 5)
                posYChecklist=posYChecklist+5;
            }
            doc.setTextColor(52,85,156); 
            if(numQuestions<10){
                doc.text(9, posYChecklist,cero+''+numQuestions+'.  '+item.description);
            }else{
                doc.text(9, posYChecklist,numQuestions+'.  '+item.description);

            }

            numQuestions++;
            posYChecklist=posYChecklist+5;

   

            item.question_types.map(function(resp)
           {
               var posX = 12;

            doc.setFontSize(10)
            doc.setFontType('normal')
            doc.setTextColor(0,0,0); 
               if(resp.type_object_id===1 && resp.question_item_list.length>0){
                if(posYChecklist > 240){
                    doc.addPage();
                    doc.addImage(img_header, 'PNG', 0, 0, 210, 21)
                    doc.addImage(img_logo_header, 'PNG', 6, 5, 23, 8)

                    doc.addImage(img_sup, 'PNG', 0, 22, 210, 128)
                    doc.addImage(img_inf, 'PNG', 0, 186, 210, 110)
                  posYChecklist = 32;
                    doc.setFontSize(10)
                    doc.setFontType('bold')
                    doc.setTextColor(0,0,0); 
                    doc.text(9, 30, 'Checklist');
                    doc.setTextColor(200,200,200); 
                    doc.text(27, 30, '__________________________________________________________________________________');
                    var img_menu = new Image();
                    img_menu.src = './images/img_menu.png';
                
                    doc.addImage(img_menu, 'PNG', 195, 26, 5, 5)
                }


                    resp.question_item_list.map(function(data)
                    {
                        if( data.description == 'si' && data.resp == "true"){
                          
                            doc.setDrawColor(200)
                            doc.setFillColor(210, 217, 123)
                            doc.roundedRect(posX, posYChecklist, 15, 7, 3, 3, 'FD')
                            doc.setTextColor(0,0,0); 
                            doc.text(''+data.description,(posX+5), (posYChecklist+5));
    
                            posX = posX+ 20;

                        }else if(data.description == 'no'  && data.resp == "true"){
                           
                            doc.setDrawColor(200)
                            doc.setFillColor(210, 217, 123)
                            doc.roundedRect(posX, posYChecklist, 15, 7, 3, 3, 'FD')
                            doc.setTextColor(0,0,0); 
                            doc.text(''+data.description,(posX+5), (posYChecklist+5));
    
                            posX = posX+ 20;

                        }else if( data.description == 'na'  && data.resp == "true"){
                            doc.setDrawColor(200)
                            doc.setFillColor(210, 217, 123)
                            doc.roundedRect(posX, posYChecklist, 15, 7, 3, 3, 'FD')
                            doc.setTextColor(0,0,0); 
                            doc.text(''+data.description,(posX+5), (posYChecklist+5));
    
                            posX = posX+ 20;

                        }else{
                            doc.setDrawColor(200)
                            doc.setFillColor(255, 255, 255)
                            doc.roundedRect(posX, posYChecklist, 15, 7, 3, 3, 'FD')
                            doc.setTextColor(0,0,0); 
                            doc.text(''+data.description,(posX+5), (posYChecklist+5));
    
                            posX = posX+ 20;
                        }


                        if( data.add === "" ){
                            //
                        }else{
                            if( data.add === null ){
                                //
                            }else{
                            var checklength = 0;
                            checklength =data.add.length / 3;
                            if(checklength<1){
                                checklength=1;
                            }
                            var lengthRounded =0;
                            var espaceRound = 0;
        
                            for (let a = 0; a < checklength; a++) {
                                lengthRounded=lengthRounded+5;                  
                            }
                            espaceRound=  lengthRounded+15;
                            doc.setDrawColor(200)
                            doc.setFillColor(255, 255, 255)
                            doc.roundedRect(posX, posYChecklist, (lengthRounded+10), 7, 3, 3, 'FD')
                            doc.setTextColor(64,66,38); 
                            doc.text(''+data.add,(posX+5), (posYChecklist+5));
    
                            posX = posX+espaceRound;
                        }
                    }
                    })
                               posYChecklist=posYChecklist+15;

               }
              
               if(resp.type_object_id==2 && resp.question_item_list.length>0){
                if(posYChecklist > 240){
                    doc.addPage();
                    doc.addImage(img_header, 'PNG', 0, 0, 210, 21)
                    doc.addImage(img_logo_header, 'PNG', 6, 5, 23, 8)

                    doc.addImage(img_sup, 'PNG', 0, 22, 210, 128)
                    doc.addImage(img_inf, 'PNG', 0, 186, 210, 110)
                  posYChecklist = 32;
                    doc.setFontSize(10)
                    doc.setFontType('bold')
                    doc.setTextColor(0,0,0); 
                    doc.text(9, 30, 'Checklist');
                    doc.setTextColor(200,200,200); 
                    doc.text(27, 30, '__________________________________________________________________________________');
                    var img_menu = new Image();
                    img_menu.src = './images/img_menu.png';
                
                    doc.addImage(img_menu, 'PNG', 195, 26, 5, 5)

                }
                posYChecklist=posYChecklist+5;
                var checklength = 0;
                   doc.setTextColor(81); 
                   doc.setFontType('normal')
                   doc.text(16, posYChecklist, 'Respuestas múltiples');
                   var img_git = new Image();
                   img_git.src = './images/img_git.png';
            
                doc.addImage(img_git, 'PNG', 12, (posYChecklist-3), 3, 3)
                doc.setTextColor(81); 
                doc.setFontType('normal')
                posYChecklist=posYChecklist+5;

                
                resp.question_item_list.map(function(data){
                    checklength =data.description.length / 3;
                    if(checklength<1){
                        checklength=1;
                    }
                    var lengthRounded =0;
                    var espaceRound = 0;

                    for (let a = 0; a < checklength; a++) {
                        lengthRounded=lengthRounded+5;                  
                    }
                    espaceRound= lengthRounded+15;

                   if(posX > 175)
                    { 
                            posX=12;
                            posYChecklist=posYChecklist+10;    
                        
                    }else if(posX > 160)
                    { 
                        if(lengthRounded > 15)
                        {
                            posX=12;
                            posYChecklist=posYChecklist+10;    
                        }
                    }


                    
                   if(data.resp == "true"){
                    doc.setDrawColor(200)
                    doc.setFillColor(210, 217, 123)
                    doc.roundedRect(posX, posYChecklist, (lengthRounded+10), 7, 3, 3, 'FD')
                    doc.setTextColor(0,0,0); 
                    doc.text(''+data.description,(posX+5), (posYChecklist+5));

                    posX = posX+espaceRound;
                   }else{
                    doc.setDrawColor(200)
                    doc.setFillColor(255, 255, 255)
                    doc.roundedRect(posX, posYChecklist, (lengthRounded+10), 7, 3, 3, 'FD')
                    doc.setTextColor(0,0,0); 
                    doc.text(''+data.description,(posX+5), (posYChecklist+5));

                    posX = posX+espaceRound;

                   }
                })
                posYChecklist=posYChecklist+10;

               }
                if(resp.type_object_id==3 && resp.question_item_list.length>0){
                    if(posYChecklist > 240){
                        doc.addPage();
                        doc.addImage(img_header, 'PNG', 0, 0, 210, 21)
                        doc.addImage(img_logo_header, 'PNG', 6, 5, 23, 8)
    
                        doc.addImage(img_sup, 'PNG', 0, 22, 210, 128)
                        doc.addImage(img_inf, 'PNG', 0, 186, 210, 110)
                      posYChecklist = 32;
                        doc.setFontSize(10)
                        doc.setFontType('bold')
                        doc.setTextColor(0,0,0); 
                        doc.text(9, 30, 'Checklist');
                        doc.setTextColor(200,200,200); 
                        doc.text(27, 30, '__________________________________________________________________________________');
                        var img_menu = new Image();
                        img_menu.src = './images/img_menu.png';
                    
                        doc.addImage(img_menu, 'PNG', 195, 26, 5, 5)
                    }
                resp.question_item_list.map(function(data){
                    posYChecklist= posYChecklist+4;
                    doc.setDrawColor(200)
                    doc.setFillColor(255, 255, 255)
                    posYChecklist=posYChecklist+5;
                    var checklength = 0;
                       doc.setTextColor(81); 
                       var img_temp = new Image();
                       img_temp.src = './images/img_temp.png';
                
                    doc.addImage(img_temp, 'PNG', 12, (posYChecklist+1), 2, 5)
                    doc.setTextColor(81); 
                    doc.setFontType('normal')
                    posYChecklist=posYChecklist+5;
                    doc.setFontType('normal')

                    doc.text(''+data.description,16, posYChecklist);
                     posYChecklist= posYChecklist+5;

                    doc.setDrawColor(200)
                    doc.setFillColor(255, 255, 255)
                    doc.roundedRect(posX, posYChecklist, 30, 7, 3, 3, 'FD')
                    doc.setTextColor(0,0,0); 
                    posYChecklist= posYChecklist+5;

                    doc.text(''+data.add,(posX+12), posYChecklist);
                      posYChecklist=posYChecklist+10;




               })
            }
           if(resp.type_object_id==4 && resp.question_item_list.length>0){


            posX=12;
                resp.question_item_list.map(function(data){
                    if(data.add != "" && data.add != null){
                        if(posYChecklist > 240){
                            doc.addPage();
                            doc.addImage(img_header, 'PNG', 0, 0, 210, 21)
                            doc.addImage(img_logo_header, 'PNG', 6, 5, 23, 8)
            
                            doc.addImage(img_sup, 'PNG', 0, 22, 210, 128)
                            doc.addImage(img_inf, 'PNG', 0, 186, 210, 110)
                          posYChecklist = 32;
                            doc.setFontSize(10)
                            doc.setFontType('bold')
                            doc.setTextColor(0,0,0); 
                            doc.text(9, 30, 'Checklist');
                            doc.setTextColor(200,200,200); 
                            doc.text(27, 30, '__________________________________________________________________________________');
                            var img_menu = new Image();
                            img_menu.src = './images/img_menu.png';
                        
                            doc.addImage(img_menu, 'PNG', 195, 26, 5, 5)
                        }

                    var checklength = 0;
                    doc.setTextColor(81); 
                    doc.setFontType('normal')
                    doc.text(16, posYChecklist, 'Respuesta ampliada');
                    var img_pen = new Image();
                    img_pen.src = './images/img_pen.png';
             
                    doc.addImage(img_pen, 'PNG', 12, (posYChecklist-3), 3, 3)
                    checklength =data.add.length / 3;
                    if(checklength<1){
                        checklength=1;
                    }
                    var lengthRounded =0;

                    for (let a = 0; a < checklength; a++) {
                        lengthRounded=lengthRounded+5;                  
                    }
                    posYChecklist=posYChecklist+5;

                    doc.setDrawColor(200)
                    doc.setFillColor(255, 255, 255)
                    doc.roundedRect(posX, posYChecklist, (lengthRounded+10), 7, 3, 3, 'FD')
                    doc.setTextColor(0,0,0); 
                    doc.text(''+data.add,(posX+5), (posYChecklist+5));

                   posYChecklist=posYChecklist+17;
                }
               })
            }

            if(resp.type_object_id==5 && resp.question_item_list.length>0){
                if(posYChecklist > 240){
                    doc.addPage();
                    doc.addImage(img_header, 'PNG', 0, 0, 210, 21)
                    doc.addImage(img_logo_header, 'PNG', 6, 5, 23, 8)

                    doc.addImage(img_sup, 'PNG', 0, 22, 210, 128)
                    doc.addImage(img_inf, 'PNG', 0, 186, 210, 110)
                  posYChecklist = 32;
                    doc.setFontSize(10)
                    doc.setFontType('bold')
                    doc.setTextColor(0,0,0); 
                    doc.text(9, 30, 'Checklist');
                    doc.setTextColor(200,200,200); 
                    doc.text(27, 30, '__________________________________________________________________________________');
                    var img_menu = new Image();
                    img_menu.src = './images/img_menu.png';
                
                    doc.addImage(img_menu, 'PNG', 195, 26, 5, 5)
                }
                posX=12;
                resp.question_item_list.map(function(data){
                    doc.setTextColor(81); 
                    doc.setFontType('normal')
                    doc.text(16, posYChecklist, 'Evidencia');
                    var img_camera = new Image();
                    img_camera.src = './images/img_camera.png';
             
                 doc.addImage(img_camera, 'PNG', 12, (posYChecklist-3), 3, 3)
                 doc.setTextColor(81); 
                 doc.setFontType('normal')
                 posYChecklist=posYChecklist+5;
                    if(data.add!=null){
                        doc.addImage(data.add, 'JPEG', posX, (posYChecklist+1), 70, 35)
                    }
                    posYChecklist=posYChecklist+47;
                    posX=posX+80;

               })
            }   
           if(resp.type_object_id==7 && resp.question_item_list.length>0){
                resp.question_item_list.map(function(data){
                    console.log(data);

                          //col = 4;
                          

                //    if(data.item_option_list!=null){
                //     pre_body.push([data.description])
                //     data.item_option_list.map(function(rec){
                //         pre_body.push([rec.title +'  '+rec.add],)

                //     })

                //    }else{
                //     if(data.resp == "true"){
                //         pre_body.push(['( X ) '+data.description])
                //        }else{
                //         pre_body.push(['(   ) '+data.description])
    
                //        }
                //    }
               })
            }
            if(resp.type_object_id==6 && resp.question_item_list.length>0){
                if(posYChecklist > 240){
                    doc.addPage();
                    doc.addImage(img_header, 'PNG', 0, 0, 210, 21)
                    doc.addImage(img_logo_header, 'PNG', 6, 5, 23, 8)
    
                    doc.addImage(img_sup, 'PNG', 0, 22, 210, 128)
                    doc.addImage(img_inf, 'PNG', 0, 186, 210, 110)
                  posYChecklist = 32;
                    doc.setFontSize(10)
                    doc.setFontType('bold')
                    doc.setTextColor(0,0,0); 
                    doc.text(9, 30, 'Checklist');
                    doc.setTextColor(200,200,200); 
                    doc.text(27, 30, '__________________________________________________________________________________');
                    var img_menu = new Image();
                    img_menu.src = './images/img_menu.png';
                
                    doc.addImage(img_menu, 'PNG', 195, 26, 5, 5)
                }
                posX=12;
                    var checklength = 0;
                    doc.setTextColor(81); 
                    doc.setFontType('normal')
                    doc.text(16, posYChecklist, 'Criticidad');
                    var img_pen = new Image();
                    img_pen.src = './images/img_info.png';
             
                    doc.addImage(img_pen, 'PNG', 12, (posYChecklist-3), 3, 3)
                    posYChecklist=posYChecklist+5;

                resp.question_item_list.map(function(data){

                    checklength =data.description.length / 3;
                    if(checklength<1){
                        checklength=1;
                    }
                    var lengthRounded =0;
                    var espaceRound = 0;

                    for (let a = 0; a < checklength; a++) {
                        lengthRounded=lengthRounded+5;                  
                    }
                    espaceRound= lengthRounded+15;

                    

                    if( data.resp == "true"){
                        doc.setDrawColor(200)
                        doc.setFillColor(210, 217, 123)
                        doc.roundedRect(posX, posYChecklist, (lengthRounded+10), 7, 3, 3, 'FD')
                        doc.setTextColor(0,0,0); 
                        doc.text(''+data.description,(posX+5), (posYChecklist+5));
                      //  posX = posX+ 20;

                    }else{
                        doc.setDrawColor(200)
                        doc.setFillColor(255, 255, 255)
                        doc.roundedRect(posX, posYChecklist, (lengthRounded+10), 7, 3, 3, 'FD')
                        doc.setTextColor(0,0,0); 
                        doc.text(''+data.description,(posX+5), (posYChecklist+5));
                    //posX = posX+ 20;
                    }
                    posX = posX+espaceRound;
                })
                posYChecklist=posYChecklist+17;

            }

 
            if(resp.type_object_id==8 && resp.question_item_list.length>0){
                if(posYChecklist > 240){
                    doc.addPage();
                    doc.addImage(img_header, 'PNG', 0, 0, 210, 21)
                    doc.addImage(img_logo_header, 'PNG', 6, 5, 23, 8)
    
                    doc.addImage(img_sup, 'PNG', 0, 22, 210, 128)
                    doc.addImage(img_inf, 'PNG', 0, 186, 210, 110)
                  posYChecklist = 32;
                    doc.setFontSize(10)
                    doc.setFontType('bold')
                    doc.setTextColor(0,0,0); 
                    doc.text(9, 30, 'Checklist');
                    doc.setTextColor(200,200,200); 
                    doc.text(27, 30, '__________________________________________________________________________________');
                    var img_menu = new Image();
                    img_menu.src = './images/img_menu.png';
                
                    doc.addImage(img_menu, 'PNG', 195, 26, 5, 5)
                }
               

                resp.question_item_list.map(function(data){
                    console.log(data);

                    

             if(data.item_option_list.length > 0){
                posX=12;
                var checklength = 0;
                doc.setTextColor(81); 
                doc.setFontType('normal')
                doc.text(16, posYChecklist, 'Preguntas y respuestas 2');
                var img_questions = new Image();
                img_questions.src = './images/img_questions.png';
         
                doc.addImage(img_questions, 'PNG', 12, (posYChecklist-3), 3, 3)

                posYChecklist=posYChecklist+5;


                doc.setTextColor(52,85,156); 
                doc.text((posX+3), posYChecklist,''+data.description);    
                 

              data.item_option_list.map(function(rec){
                  checklength =rec.add.length / 3;
                  if(checklength<1){
                      checklength=1;
                  }
                  var lengthRounded =0;
                  var espaceRound = 0;
  
                  for (let a = 0; a < checklength; a++) {
                      lengthRounded=lengthRounded+5;                  
                  }
                  espaceRound= lengthRounded+15;

                  doc.setDrawColor(200)
                  doc.setFillColor(255)
                  doc.roundedRect((posX+5), (posYChecklist+5), (lengthRounded+10), 7, 3, 3, 'FD')
                  doc.setTextColor(0,0,0); 
                  doc.text(''+rec.add,(posX+ 10), (posYChecklist+10));  

              })

             }else{

              if(data.resp == "true"){
                posX=12;
                var checklength = 0;
                doc.setTextColor(81); 
                doc.setFontType('normal')
                doc.text(16, posYChecklist, 'Preguntas y respuestas');
                var img_questions = new Image();
                img_questions.src = './images/img_questions.png';
         
                doc.addImage(img_questions, 'PNG', 12, (posYChecklist-3), 3, 3)
                posYChecklist=posYChecklist+5;
                checklength =data.add.length / 3;
                if(checklength<1){
                    checklength=1;
                }
                var lengthRounded =0;
                var espaceRound = 0;

                for (let a = 0; a < checklength; a++) {
                    lengthRounded=lengthRounded+5;                  
                }
                espaceRound= lengthRounded+15;

                doc.setTextColor(52,85,156); 
                doc.text((posX+3), posYChecklist,''+data.description);    
                doc.setDrawColor(200)
                doc.setFillColor(255)
                doc.roundedRect((posX+5), (posYChecklist+5), (lengthRounded+10), 7, 3, 3, 'FD')
                doc.setTextColor(0,0,0); 
                doc.text(''+data.add,(posX+10), (posYChecklist+10));             
            
            }
             }
             posYChecklist=posYChecklist+17;
         })
            } 
            
           })
 
           posYChecklist=posYChecklist+25;

        });

        doc.addPage();

        doc.addImage(img_sup, 'PNG', 0, 0, 210, 128)
        doc.addImage(img_inf, 'PNG', 0, 186, 210, 110)
        doc.addImage(img_log, 'PNG', 49, 115, 110, 37)
        doc.addImage(img_letras, 'PNG', 0, 241, 210, 45)
    
        doc.setFontSize(8)
        doc.setTextColor(52,85,156); 
    
        doc.text(90, 284, 'Copyright © '+anio+' TASA');
        doc.text(6, 290, 'Todos los derechos reservados. Política de Privacidad Jirón Carpaccio #250, Piso 11 - San Borja, Lima 41 - Perú. (51+1) 611-1400 | (51+1) 611-1401');
    
        var pageCount1 = doc.internal.getNumberOfPages();
        var pageCount = doc.internal.getNumberOfPages();
        pageCount=pageCount-2;
        if(pageCount<10){
            pageCount='0'+pageCount;
        }
        for(i = 2; i < pageCount1; i++) { 
            console.log(i)
        doc.setPage(i); 
        doc.setFontSize(10);
        var num_page=doc.internal.getCurrentPageInfo().pageNumber-1;
        if(num_page<10){
            doc.text(185,275, 'Página '+cero+''+num_page + "/" + pageCount);
        }else{
            doc.text(185,275, 'Página '+num_page + "/" + pageCount);

        }
        }
        doc.save('Inspecion.pdf')
        

    })

}

function PDFInopinadas (Id,Idform){

        let url = apiUrlssoma+`/api/Get-Response?code=u4szwywl2GLlOJfyw8dwzo5anTX1ZPVbwXqsWlA/uYIAV/JwvtYZCw==&httpmethod=objectIO&inspection_id=${Idform}&Id=${Id}`
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
            response.forEach((Item , Index) => {
                var date = Item.Created_Date.split('T')
            var img = new Image();
            img.src = './images/logopdf.png';
            var doc = new jsPDF();
            doc.autoTable.previous.finalY=0;
            doc.addImage(img, 'PNG', 27, 10, 15, 10)
            doc.setFontSize(6)
            doc.text("TECNOLOGICA DE ALIMENTOS S.A",16,25)
            doc.text("RUC 20100971772",24,29)
            doc.text("SECTOR PESCA",25,33)
        
            doc.setFontSize(12)
            doc.text(60, 25, 'INSPECCIÓN INOPINADA DE SSOMA') 
            doc.setFontSize(6)
            doc.setDrawColor(0)
            doc.setFillColor(192, 192, 192);
            doc.rect(144, 16, 25, 7, 'DF');
            doc.text('N° de Registro',145, 20);
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.rect(169, 16, 25, 7);
            doc.text(''+Item.InspectionCode+'',170, 20);
            doc.setDrawColor(0);
            doc.setFillColor(192, 192, 192);
            doc.rect(144, 26, 25, 7, 'DF');
            doc.text('Unidad Operativa',145, 30);
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.rect(169, 26, 25, 7);
            if(Item.UnitName.length>20){
                doc.setFontSize(5)
            }
            doc.text(''+toCapitalize(Item.UnitName)+'',170, 30);
            doc.setFontSize(6)
            doc.setDrawColor(0);
            doc.setFillColor(192, 192, 192);
            doc.rect(144, 32, 25, 7, 'DF');
            doc.text('E/P',145, 36);
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.rect(169, 32, 25, 7, 'DF');
            doc.text(''+toCapitalize(Item.Ep)+'',170, 36);
         
        
            doc.setDrawColor(0);
            doc.setFillColor(192, 192, 192);
            doc.rect(9, 46, 60, 7, 'DF');
            doc.text('Dirección de la Unidad Operativa',10, 50);
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.rect(69, 46, 75, 7, 'DF');
            var sedename = "-";
            if(Item.DireccionUnicaSedePlanta!=null&&Item.DireccionUnicaSedePlanta!='null'){
                sedename=Item.DireccionUnicaSedePlanta;
            }
            doc.text(''+toCapitalize(sedename)+'',70, 50); 
            doc.setDrawColor(0);
            doc.setFillColor(192, 192, 192);
            doc.rect(144, 46, 25, 7, 'DF');
            doc.text('N° de Trabajadores',145, 50);
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.rect(169, 46, 25, 7, 'DF');
            doc.text(''+Item.WorkerNum,170, 50);
        
           
                
            doc.setDrawColor(0);
            doc.setFillColor(192, 192, 192);
            doc.rect(9, 54, 44, 7, 'DF');
            doc.text('Área Inspeccionada',10, 58);
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.rect(50, 54, 40, 7, 'DF');
            doc.text(''+toCapitalize(Item.AreaName)+'',51, 58);
        
            doc.setDrawColor(0);
            doc.setFillColor(192, 192, 192);
            doc.rect(119, 54, 50, 7, 'DF');
            doc.text('Responsable del Área Inspeccionada',120, 58);
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.rect(169, 54, 25, 7, 'DF');
            var NameAreaResponsible = Item.NameAreaResponsible?Item.NameAreaResponsible:'-';
            doc.text(''+NameAreaResponsible, 170, 57, {align:'justify',maxWidth:18});

            doc.setDrawColor(0);
            doc.setFillColor(192, 192, 192);
            doc.rect(9, 62, 44, 7, 'DF');
            doc.text('Responsable de la Inspección',10, 66);
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.rect(50, 62, 40, 7, 'DF');
            doc.text(''+toCapitalize(Item.PersonName)+'',51, 66);
        var hour = date[1].split(':');
            doc.setDrawColor(0);
            doc.setFillColor(192, 192, 192);
            doc.rect(119, 62, 50, 7, 'DF');
            doc.text('Fecha y Hora de la Inspección',120, 66);
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.rect(169, 62, 25, 7, 'DF');
            doc.text(''+date[0]+' '+hour[0]+':'+hour[1],170, 66);
        
            doc.text('Inspección Planeada',10, 74);
            if(Item.TypeName == "Programada"){
                doc.setDrawColor(0)
                doc.setFillColor(0, 128, 0)
                doc.rect(40, 71, 4, 4,'F');
                doc.setDrawColor(0)
                doc.rect(83, 71, 4, 4);
            }else{
                doc.setDrawColor(0)
                doc.rect(40, 71, 4, 4);
                doc.setDrawColor(0);
                doc.setFillColor(0, 128, 0)
                doc.rect(83, 71, 4, 4,'F');
            }
            //doc.rect(40, 71, 4, 4);
        
            doc.text('Inspección No Planeada',50, 74);
            //doc.rect(83, 71, 4, 4);
        
            doc.text('Otros Detallar',120, 74);
            doc.text('_______________________',145, 74);
         
        
            doc.setDrawColor(0);
            doc.setFillColor(192, 192, 192);
            doc.rect(9, 78, 44, 7, 'DF');
            doc.text('Objetivo de la Inspección',10, 82);
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.rect(50, 78, 142, 7, 'DF');
            doc.text(''+Item.Reason,51, 82);
           
            //CABECERA DETALLE
            doc.setFontSize(10)
            doc.setDrawColor(0);
            doc.setFillColor(192, 192, 192);
            doc.rect(9, 88, 186, 14, 'DF');
            doc.text('RESULTADO DE LA INSPECCION',74, 92);
            doc.setFontSize(8)
            doc.text('Observaciones encontradas - Resumen Fotográfico',70, 100);
            doc.setFontSize(6)
    
            //SUB
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.rect(9, 102, 81, 4, 'DF');
            doc.text('FOTOGRAFÍA ANTES',40, 105);
    
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.rect(90, 102, 24, 4, 'DF');
            doc.text('CRITICIDAD',98, 105);
    
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.rect(114, 102, 81, 4, 'DF');
            doc.text('FOTOGRAFÍA DESPUÉS',135, 105);
            
            //verificamos el tamaño de los textos
            var altoAdicional = 0;
            if(Item.response_question_list[0].response_item_list[0].Justify.length>230){
                //agrandamos el cuadro
                altoAdicional = 12;
            }else if(Item.response_question_list[3].response_item_list[0].Justify.length>230){
                //agrandamos el cuadro
                altoAdicional = 12;
            }

            //SUB SUB :V
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.rect(9, 106, 81, 12+altoAdicional, 'DF');
            doc.setTextColor(0,22,195); 
            doc.text('Descripción de la observación:',11, 109);
            doc.setTextColor(8,8,8);
            //doc.text(''+Item.response_question_list[0].response_item_list[0].Justify,11,111)
            doc.text(''+Item.response_question_list[0].response_item_list[0].Justify, 11, 111, {align:'justify',maxWidth:77}); 
            

            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.rect(90, 106, 8, 12+altoAdicional, 'DF');
            doc.text('A',93, 112);
    
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.rect(98, 106, 8, 12+altoAdicional, 'DF');
            doc.text('B',101, 112);
    
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.rect(106, 106, 8, 12+altoAdicional, 'DF');
            doc.text('C',109, 112);
    
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.rect(114, 106, 81, 12+altoAdicional, 'DF');
            doc.setTextColor(0,22,195); 
            doc.text('Acción correctiva:',116, 109);
            doc.setTextColor(8,8,8);
            doc.text(''+Item.response_question_list[3].response_item_list[0].Justify, 116, 111, {align:'justify',maxWidth:77}); 
            //doc.text(''+Item.response_question_list[3].response_item_list[0].Justify,116,111)
    
            //IMAGENES Y ESO
            
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.rect(9, 118+altoAdicional, 81, 48, 'DF');
            //pinto fotografia antes
            var img_antes = new Image();
            img_antes.src = Item.response_question_list[1].response_item_list[0].Justify;
            img_antes.onload = function () {
                doc.addImage(img_antes, 'PNG', 10, 119+altoAdicional, 79, 46)
            }
    
            //recuadros de criticidad
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.rect(90, 118+altoAdicional, 8, 48, 'DF');
    
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.rect(98, 118+altoAdicional, 8, 48, 'DF');
    
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.rect(106, 118+altoAdicional, 8, 48, 'DF');
    
            //pinto criticidad
            var textCriticidad = Item.response_question_list[2].response_item_list[0].ItemDescription;
            if(textCriticidad=="Bajo"){
                doc.text('X',108, 142+altoAdicional);
            }else if(textCriticidad=="Medio"){
                doc.text('X',102, 142+altoAdicional);
            }else if(textCriticidad=="Alto"){
                doc.text('X',94, 142+altoAdicional);
            }
    
    
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.rect(114, 118+altoAdicional, 81, 48, 'DF');
            //pinto fotografia despues
            var img_despues = new Image();
            img_despues.src = Item.response_question_list[4].response_item_list[0].Justify;
            img_despues.onload = function () {
                doc.addImage(img_despues, 'PNG', 115, 119+altoAdicional, 79, 46)
            }
    
            //PITAMOS LO DEMAS
    
            doc.setFontSize(6)
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.rect(9, 166+altoAdicional, 186, 14, 'DF');
            doc.text('A. El acto o condición observada son críticas o incumplen requisitos legales, por tanto, requieren ser mencionados en el Comité de SST.',10, 170+altoAdicional);
            doc.text('B. El acto o condición observada son relevantes o importantes.',10, 174+altoAdicional);
            doc.text('C. El acto o condición observada son leves.',10, 178+altoAdicional);
    
            doc.setFontSize(6)
            doc.setDrawColor(0);
            doc.setFillColor(192, 192, 192);
            doc.rect(9, 184+altoAdicional, 70, 14, 'DF');
            doc.text('Descripción de la causa de las Observaciones (completado por el Jefe de Area responsable)',10, 188+altoAdicional,{maxWidth : 60});
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.rect(79, 184+altoAdicional, 116, 14, 'DF');
            doc.text('  ',81, 188+altoAdicional);
            
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.rect(9, 208+altoAdicional, 186, 21, 'DF');    
            doc.setFontType('bold');
            doc.text('Responsable del Registro:',10, 212+altoAdicional);
            doc.setFontType('normal');
            doc.text('Nombre completo: ',10, 216+altoAdicional);
            doc.text(Item.PersonName,30, 216+altoAdicional);
            doc.text('Cargo : ',10, 220+altoAdicional);
            doc.text(Item.PersonJob,20, 220+altoAdicional);
            doc.text('Firma : ',90, 220+altoAdicional);
        
            if(Item.InspectorSign){
                doc.addImage(Item.InspectorSign, 'PNG', 100, 220+altoAdicional, 30, 7)
            }
            
        
            doc.setFontSize(6)
            doc.setDrawColor(0);
            doc.setFillColor(192, 192+altoAdicional, 192);
            doc.rect(9, 239+altoAdicional, 186, 28, 'DF');
            doc.text('Durante la Inspeccion se verificó :',10, 243+altoAdicional);
            doc.rect(10, 244+altoAdicional, 4, 4);
            doc.text('Acta de Comité de SST e informes',15, 247+altoAdicional);
            doc.rect(10, 248+altoAdicional, 4, 4);
            doc.text('Informes de accidentes ocurridos en la planta',15, 251+altoAdicional);
            doc.rect(10, 252+altoAdicional, 4, 4);
            doc.text('Actos subestandares de los trabajadores',15, 255+altoAdicional);
            doc.rect(10, 256+altoAdicional, 4, 4);
            doc.text('Condiciones Subestandares del area de trabajo',15, 259+altoAdicional);
            doc.rect(10, 260+altoAdicional, 4, 4);
            doc.text('Inspeccion de Equipos de Emergencia de la planta (Ejemplo: Extintores,  botiquines, ducha lavaojos, etc.)',15, 263+altoAdicional);
        
        
            doc.rect(80, 244+altoAdicional, 4, 4);
            doc.text('Incumplimiento a estandares de Alto Riesgo.',85, 247+altoAdicional);
            doc.rect(80, 248+altoAdicional, 4, 4);
            doc.text('Posicion de las personas (Ej. En la linea de fuego)',85, 251+altoAdicional);
            doc.rect(80, 252+altoAdicional, 4, 4);
            doc.text('Revisión de Uso y mantenimiento de EPP ',85, 255+altoAdicional);
            doc.rect(80, 256+altoAdicional, 4, 4);
            doc.text('Registros Obligatorio de Gestion (AST/PTS)',85, 259+altoAdicional);
            doc.setFontSize(8)
        
        
            var pageCount = doc.internal.getNumberOfPages();
            for(i = 0; i < pageCount; i++) { 
            doc.setPage(i); 
            doc.setFontSize(10);
            doc.text(190,10, doc.internal.getCurrentPageInfo().pageNumber + "/" + pageCount);
            }
              
              setTimeout(function(){ 
                doc.save('Inopinadas.pdf')
             }, 3000);
        });
        })
        }

    function PDFIas (Id,Idform){
    let url = apiUrlssoma+`/api/Get-Response?code=u4szwywl2GLlOJfyw8dwzo5anTX1ZPVbwXqsWlA/uYIAV/JwvtYZCw==&httpmethod=objectIAS&inspection_id=${Idform}&Id=${Id}`
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

        var date = response.Created_Date.split('T')
        var hour = date[1].split(':');

        var img = new Image();
        img.src = './images/logopdf.png';
        var doc = new jsPDF();
        doc.autoTable.previous.finalY=0;
        doc.addImage(img, 'PNG', 27, 10, 15, 10)
        doc.setFontSize(16)
        doc.text(65, 20, 'INDICE DE ACTOS SEGUROS - IAS') 
       
        doc.setFontSize(8)
        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255);
        doc.rect(9, 28, 35, 7, 'DF');
        doc.text('U.O.:',26, 33);
        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255);
        doc.rect(35, 28, 35, 7, 'DF');
        doc.text(''+response.UnitName,37, 33);


        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255);
        doc.rect(70, 28, 20, 7, 'DF');
        doc.text('Fecha:',78, 33);
        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255);
        doc.rect(90, 28, 20, 7, 'DF');
        doc.text(''+date[0],92, 33);

        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255);
        doc.rect(110, 28, 20, 7, 'DF');
        doc.text('Hora:',120, 33);
        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255);
        doc.rect(130, 28, 30, 7, 'DF');
        doc.text(''+hour[0]+':'+hour[1],132, 33);

        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255);
        doc.rect(160, 28, 40, 7, 'DF');
        doc.text(''+response.InspectionCode, 170,33)


        doc.setFontSize(8)
        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255);
        doc.rect(9, 35, 35, 7, 'DF');
        doc.text('Elaborado por:',16, 39);
        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255);
        doc.rect(35, 35, 35, 7, 'DF');
        doc.text(''+response.PersonName,39, 39);

        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255);
        doc.rect(70, 35, 60, 7, 'DF');
        doc.setFillColor(38, 169, 255);
        doc.text('Actos Inseguros Observados',80, 39);

        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255);
        doc.rect(130, 35, 30, 21, 'DF');
        doc.setFillColor(255, 255, 255);
        doc.text('Desviaciones',132, 46);

        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255);
        doc.rect(160, 35, 40, 21, 'DF');
        doc.setFillColor(255, 255, 255);
        doc.text('Observaciones (si considera necesario coloque algun comentario)',180, 43,{maxWidth: 40, align: 'center'});
        
        doc.setFontSize(12)
        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255);
        doc.rect(9, 42, 61, 14, 'DF');
        doc.text('Causas de las Lesiones',16, 50);

        doc.setFontSize(8)
        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255);
        doc.rect(70, 42, 60, 7, 'DF');
        doc.text('Causas de las Lesiones',82, 47);

        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255);
        doc.rect(70, 49, 20, 7, 'DF');
        doc.text('0,33',77, 54);

        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255);
        doc.rect(90, 49, 20, 7, 'DF');
        doc.text('1',99, 54);

        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255);
        doc.rect(110, 49, 20, 7, 'DF');
        doc.text('3',119, 54);

        var inicioRenglon = 56;
        var totalDesvFirst = 0;
        var totalDesvSecond = 0;
        var totalDesvThird = 0;
        var totalDesvAll = 0;

        //EMPIEZO A RECORRER PREGUNTA 1

        response.dataAsk.map(function(ask,indexask){
            if(indexask==6){
                doc.addPage();
                inicioRenglon = 28;
            }

            doc.setFontSize(10)
            doc.setDrawColor(0)
            doc.setFillColor(255, 255, 255);
            doc.rect(9, inicioRenglon, 151, 5, 'DF');
            doc.text(''+ask.QuestionDescription,11, inicioRenglon+4);
    
            inicioRenglon = inicioRenglon + 5;
    
                ask.items.map(function(item){
                    //RECORRO ITEM
                    doc.setFontSize(8)
                    doc.setDrawColor(0)
                    doc.setFillColor(255, 255, 255);
                    doc.rect(9, inicioRenglon, 61, 5, 'DF');
                    doc.text(''+item.title,11, inicioRenglon+4);
    
                    doc.setFontSize(8)
                    doc.setDrawColor(0)
                    doc.setFillColor(255, 255, 255);
                    doc.rect(70, inicioRenglon, 20, 5, 'DF');
                    doc.text(''+item.firstPoint*1,80, inicioRenglon+4);
    
                    doc.setFontSize(8)
                    doc.setDrawColor(0)
                    doc.setFillColor(255, 255, 255);
                    doc.rect(90, inicioRenglon, 20, 5, 'DF');
                    doc.text(''+item.secondPoint*1,100, inicioRenglon+4);
    
                    doc.setFontSize(8)
                    doc.setDrawColor(0)
                    doc.setFillColor(255, 255, 255);
                    doc.rect(110, inicioRenglon, 20, 5, 'DF');
                    doc.text(''+item.thirdPoint*1,120, inicioRenglon+4);
    
                    var desviacion = item.firstPoint*1 + item.secondPoint*1 + item.thirdPoint*1;
                    doc.setFontSize(8)
                    doc.setDrawColor(0)
                    doc.setFillColor(255, 255, 255);
                    doc.rect(130, inicioRenglon, 30, 5, 'DF');
                    doc.text(''+desviacion,145, inicioRenglon+4);

                    doc.setFontSize(8)
                    doc.setDrawColor(0)
                    doc.setFillColor(255, 255, 255);
                    doc.rect(160, inicioRenglon, 40, 5, 'DF');
                    doc.text(''+item.observation,162, inicioRenglon+4);
                    
                    totalDesvFirst = totalDesvFirst + item.firstPoint*1;
                    totalDesvSecond = totalDesvSecond + item.secondPoint*1;
                    totalDesvThird = totalDesvThird + item.thirdPoint*1;
                    totalDesvAll = totalDesvAll + desviacion;

                    inicioRenglon = inicioRenglon + 5;
                    //TERMINO RECORRER ITEM
                })
        })

        //AGREGO CUADRO DE RESULTADOS
        //TOTAL DESVIACIOENS
        doc.setFontSize(8)
        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255);
        doc.rect(40, inicioRenglon, 31, 5, 'DF');
        doc.text('Total Desviaciones',42, inicioRenglon+4);

        doc.setFontSize(8)
        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255);
        doc.rect(70, inicioRenglon, 20, 5, 'DF');
        doc.text(''+totalDesvFirst,80, inicioRenglon+4);

        doc.setFontSize(8)
        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255);
        doc.rect(90, inicioRenglon, 20, 5, 'DF');
        doc.text(''+totalDesvSecond,100, inicioRenglon+4);

        doc.setFontSize(8)
        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255);
        doc.rect(110, inicioRenglon, 20, 5, 'DF');
        doc.text(''+totalDesvThird,120, inicioRenglon+4);

        doc.setFontSize(8)
        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255);
        doc.rect(130, inicioRenglon, 30, 5, 'DF');
        doc.text(''+totalDesvAll, 145,  inicioRenglon+4);

        inicioRenglon = inicioRenglon + 5;

        var totalFirst = totalDesvFirst*0.33;
        var totalSecond = totalDesvSecond*1;
        var totalThird = totalDesvThird*3;
        var totalAll = totalFirst+totalSecond+totalThird;

        //TOTALES
        doc.setFontSize(8)
        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255);
        doc.rect(40, inicioRenglon, 31, 5, 'DF');
        doc.text('Totales',42, inicioRenglon+4);

        doc.setFontSize(8)
        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255);
        doc.rect(70, inicioRenglon, 20, 5, 'DF');
        doc.text(''+totalFirst,80, inicioRenglon+4);

        doc.setFontSize(8)
        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255);
        doc.rect(90, inicioRenglon, 20, 5, 'DF');
        doc.text(''+totalSecond,100, inicioRenglon+4);

        doc.setFontSize(8)
        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255);
        doc.rect(110, inicioRenglon, 20, 5, 'DF');
        doc.text(''+totalThird,120, inicioRenglon+4);

        doc.setFontSize(8)
        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255);
        doc.rect(130, inicioRenglon, 30, 5, 'DF');
        doc.text(''+totalAll,145, inicioRenglon+4);

        doc.setFontSize(8)
        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255);
        //doc.rect(185, inicioRenglon, 5, 5, 'DF');
        doc.text('S=',186, inicioRenglon+4);
        
        doc.setFontSize(8)
        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255);
        doc.rect(190, inicioRenglon, 10, 5, 'DF');
        doc.text(''+totalAll,191, inicioRenglon+4);

        inicioRenglon = inicioRenglon + 5;

        //PERSONAS
        doc.setFontSize(8)
        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255);
        doc.rect(40, inicioRenglon, 150, 5, 'DF');
        doc.text('Personas observadas durante el recorrido de auditoria',42, inicioRenglon+4);

        doc.setFontSize(8)
        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255);
        doc.rect(190, inicioRenglon, 10, 5, 'DF');
        doc.text(''+response.WorkerNum*1,191, inicioRenglon+4);

        inicioRenglon = inicioRenglon + 5;

        //OPERACION

        var indice = totalAll/(response.WorkerNum*1)
        doc.setFontSize(8)
        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255);
        doc.rect(40, inicioRenglon, 150, 5, 'DF');
        doc.text('|A|=(Totales / Personas Observadas) * (100%)',42, inicioRenglon+4);

        doc.setFontSize(8)
        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255);
        doc.rect(190, inicioRenglon, 10, 5, 'DF');
        var indiceR = roundx(indice, 2);
        doc.text(''+indiceR,191, inicioRenglon+4);

        inicioRenglon = inicioRenglon + 5;

        //IAS
        var indicefinal = 1-indice;
        doc.setFontSize(8)
        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255);
        doc.rect(40, inicioRenglon, 150, 5, 'DF');
        doc.text('(IAS) Indice de Actos Seguros  = 100 - |A|',42, inicioRenglon+4);//redonder 2 decimles

        var ne = roundx(indicefinal, 2);
        //console.clear();
        console.log("LA NUEVA EXPRESION ES = ", ne)

        doc.setFontSize(8)
        doc.setDrawColor(0)
        doc.setFillColor(255, 255, 255);
        doc.rect(190, inicioRenglon, 10, 5, 'DF');
        //doc.text(''+indicefinal,191, inicioRenglon+4);
        doc.text(''+ne+'%',191, inicioRenglon+4);//andy 26-05-2021 ajuste redondeo 2 decimales

        inicioRenglon = inicioRenglon + 5;

        var pageCount = doc.internal.getNumberOfPages();
        for(i = 0; i < pageCount; i++) { 
        doc.setPage(i); 
        doc.setFontSize(10);
        doc.text(190,10, doc.internal.getCurrentPageInfo().pageNumber + "/" + pageCount);
        }
          //doc.save('ias.pdf')//cambiado por karen 18-05-2021 andy

          doc.save('Reporte_IAS.pdf') //nuevo nombre
    })

    }




    function roundx(num, decimales = 2) 
{
    var signo = (num >= 0 ? 1 : -1);
    num = num * signo;
    if (decimales === 0) //con 0 decimales
        return signo * Math.round(num);
    // round(x * 10 ^ decimales)
    num = num.toString().split('e');
    num = Math.round(+(num[0] + 'e' + (num[1] ? (+num[1] + decimales) : decimales)));
    // x * 10 ^ (-decimales)
    num = num.toString().split('e');
    return signo * (num[0] + 'e' + (num[1] ? (+num[1] - decimales) : -decimales));
}


    function verRespuestaIAS(idResponse,IdFormulario,title,Code){
        $('#modal-ver-respuesta').removeClass('modal_confirmacion__active')
        $('#modal-observacion').addClass('modal_confirmacion__active')
        $('#title_modal_response').text(title)
        let url = `https://0p3r4ti0n5ecur3-prd-forms.azurewebsites.net/api/Get-Form?httpmethod=objectSsoma&id=${IdFormulario}&code=sXuJLNZw7GvtzAVQYMAfMHvPCSaMZWbzrv77Qa2zQksUwIbga52tSg==&response_id=${idResponse}&ambiente=${ambiente}`
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
            let cantidad_subitem = 0
            $('#contenido-detalle__response').html('')
            response.question_list.forEach((preguntas,index) => {
    
                let cantidad = index + 1
                if(cantidad < 10){
                    cantidad = '0'+cantidad
                }
                $('#contenido-detalle__response').append(`<div class="d-flex border-bottom py-2" style="flex-wrap:wrap">
                        <div class="col-md-1" style="color: #34559c;font-weight: bold">${cantidad}</div>
                        <div class="col-md-11">
                            <div class="title text-left" style="font-size: 14px">
                                ${preguntas.description}
                            </div>
                        </div>
                        <div class="col-md-12 respuest pt-3" id="respuesta-${cantidad}">
                            
                        </div>
                    </div>`)
    
                preguntas.question_types.forEach((subItems,subItemsIndex) => {
                    cantidad_subitem = cantidad_subitem + 1
    
                    if(subItems.type_object_id == 6 && subItems.question_item_list.length > 0){
                        $('#respuesta-'+cantidad).append(`<div class="border-bottom" id="subItem${cantidad_subitem}"></div>`)
                        
                        var indexType4 = 0;
                        subItems.question_item_list.forEach((question_item_list_response,item_list_index) => {
                            console.log(item_list_index)
                            if(question_item_list_response.selection_type==2&&question_item_list_response.type_object_id==6){

                                var div = `<div class="content-sino py-3 justify-content-start mr-0" id="ampliacionrespuesta2">
                                    <div class="col-md-7" style="font-size: 12px;text-align: left;">${question_item_list_response.description}</div>
                                    <div class="col-md-5" style="flex-wrap: wrap;display: flex;justify-content: space-around;">`;
                                        
                                    question_item_list_response.item_option_list.forEach((option) => {
                                        div += `<div class="col-md-3" style="height: 30px;border: solid 1px;display: flex;align-items: center;">${option.add}</div>`
                                    });

                                    div += `<div class="col-md-4 pt-1" style="font-size: 12px;">0.33</div>
                                        <div class="col-md-4 pt-1" style="font-size: 12px;">1</div>
                                        <div class="col-md-4 pt-1" style="font-size: 12px;">3</div>
                                    </div>
                                </div>`;
                                div+=`<div class="content-sino py-3 justify-content-start mr-0" style="display:flex;flex-wrap:wrap" id="ampliacionrespuesta2">
                                        <div class="col-md-12" style="font-size: 12px;text-align: left;font-weight: bold;">Observaciones</div>
                                        <div class="col-md-12" style="font-size: 12px;text-align: left;height: 74px;border: solid 1px #dee2e6;border-radius: 10px;">
                                        ${preguntas.question_types[3].question_item_list[indexType4].add}
                                        </div>
                                    </div>`;
                                div+=`<div class="content-sino py-3 justify-content-start mr-0 border-bottom" style="display:flex;flex-wrap:wrap;" id="ampliacionrespuesta2">
                                        <div class="col-md-1"><img style="width: 18px;" src="./images/newsistema/iconos/informacion2.svg" alt=""></div>
                                        <div class="col-md-11" style="font-size: 12px;text-align: left;font-weight: bold;">Criticidad</div>
                                        <div class="col-md-4 pt-1 content-sino w-100 justify-content-start">
                                            <div class="checklist" id="checklistsi9" style="border: 3px solid ${(subItems.question_item_list[item_list_index+1].resp=="true")?"rgb(210, 217, 123)":"rgb(198, 198, 198)"};"></div>
                                            <span class="mx-2" style="font-size: 12px;">Alto</span>
                                            <div class="border d-none p-2 my-2" id="rptasi9" style="border-radius: 20px;min-height: 30px;width: 74%;"></div>
                                        </div>
                                        <div class="col-md-4 pt-1 content-sino w-100 justify-content-start">
                                            <div class="checklist" id="checklistsi9" style="border: 3px solid ${(subItems.question_item_list[item_list_index+2].resp=="true")?"rgb(210, 217, 123)":"rgb(198, 198, 198)"};"></div>
                                            <span class="mx-2" style="font-size: 12px;">Medio</span>
                                            <div class="border d-none p-2 my-2" id="rptasi9" style="border-radius: 20px;min-height: 30px;width: 74%;"></div>
                                        </div>
                                        <div class="col-md-4 pt-1 content-sino w-100 justify-content-start">
                                            <div class="checklist" id="checklistsi9" style="border: 3px solid ${(subItems.question_item_list[item_list_index+3].resp=="true")?"rgb(210, 217, 123)":"rgb(198, 198, 198)"};"></div>
                                            <span class="mx-2" style="font-size: 12px;">Bajo</span>
                                            <div class="border d-none p-2 my-2" id="rptasi9" style="border-radius: 20px;min-height: 30px;width: 74%;"></div>
                                        </div>
                                </div>`;
                                $('#subItem'+cantidad_subitem).append(div)
                                indexType4++;
                            }
                            

                        })
                    }
    
                })
            })
        })
    }