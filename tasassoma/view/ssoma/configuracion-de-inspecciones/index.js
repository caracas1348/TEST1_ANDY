let FormArray = [];
let IdInspeccionEdit = "";
let TitleInspeccionEdit = "";

function getListForm() {
    let url;
    let headers;
    url = `https://0p3r4ti0n5ecur3-prd-forms.azurewebsites.net/api/Get-Form?code=sXuJLNZw7GvtzAVQYMAfMHvPCSaMZWbzrv77Qa2zQksUwIbga52tSg==&httpmethod=objectlistSsoma&system_id=${constantes.sysCodeId}`
    headers = {
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
        $('#pagination-container').pagination({
            dataSource: response,
            pageSize: 8,
            callback: function(data, pagination) {
                var html = TempleteListInspecciones(data);
                $('#body-tabla-list').html(html);
            }
        })
        $('.body-tabla').addClass('hidden')
        $('#cantidad').text(response.length)
        $('#body-tabla-loader').addClass('d-none')
    })
};

function buscarInspeccion(){
    let buscarInspeccion = $('#buscarInspeccion').val();
    let url = `https://0p3r4ti0n5ecur3-prd-forms.azurewebsites.net/api/Get-Form?httpmethod=objectlistSsoma&system_id=8&code=sXuJLNZw7GvtzAVQYMAfMHvPCSaMZWbzrv77Qa2zQksUwIbga52tSg==&title=${buscarInspeccion}`
    let headers = {
        "apikey":constantes.apiKey,
    }
    $.ajax({
        method: "post",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function (response){
        console.log(response)
        $('.body-tabla-list').html('')
        $('#cantidad').text(response.length)
        $('#pagination-container').pagination({
            dataSource: response,
            pageSize: 8,
            callback: function(data, pagination) {
                var html = TempleteListInspecciones(data);
                $('#body-tabla-list').html(html);
            }
        })
    })
}

function SelectItemInspeccion(id, nombre){
    $('#id-inspeccion-select').val(id)
    $('#buscarInspeccion').val(nombre)
    $('.content-list-inspeccion').html('')
}

function filtrarInspecciones(){
    console.log('holaaaa')
    let fechaInicio = $('#fechaInicio').val();
    let fechafin = $('#fechaFin').val();
    let buscarInspeccion = $('#buscarInspeccion').val();

    let consulta = ''
    if(buscarInspeccion != ''){
        consulta += '&title='+buscarInspeccion
    }

    let arrayFin
    let arrayInicio

    if(fechaInicio != ''){
        arrayInicio = fechaInicio.split('/')
        fechaInicio = arrayInicio[2]+'-'+arrayInicio[1]+'-'+arrayInicio[0]
        consulta += '&created_date='+fechaInicio
    }

    if(fechafin != ''){

        arrayFin = fechafin.split('/')
        fechafin = arrayFin[2]+'-'+arrayFin[1]+'-'+arrayFin[0]
        consulta += '&created_date_end='+fechafin
    }

    let url = `https://0p3r4ti0n5ecur3-prd-forms.azurewebsites.net/api/Get-Form?httpmethod=objectlistSsoma&system_id=8&code=sXuJLNZw7GvtzAVQYMAfMHvPCSaMZWbzrv77Qa2zQksUwIbga52tSg==${consulta}`
    let headers = {
        "apikey":constantes.apiKey,
    }

    $.ajax({
        method: "post",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function (response){
        $('#cantidad').text(response.length)
        $('#pagination-container').pagination({
            dataSource: response,
            pageSize: 8,
            callback: function(data, pagination) {
                var html = TempleteListInspecciones(data);
                $('#body-tabla-list').html(html);
            }
        })
    })

}

function TempleteListInspecciones(data) {
    var html = '';
    let type = '- -';
    let estado = ''
    let colorLetra = ''
    let btnEditar = ''
    let style = ''
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

        html += `<div class="item-tabla p-2" style="font-size: 15px">
            <div class="row m-0 justify-content-between align-items-center">
                <div class="col-md-3">${Item.title}</div>
                <div class="col-md-4">${fecha=='01/01/0001'?'-':fecha}</div>
                <div class="col-md-2  ${colorLetra}">${estado}</div>
                <div class="col-1 text-center">
                    <button ${btnEditar} ${style} onclick="EditInspeccion(${Item.id},'${Item.title}')" class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-add m-auto bmd-btn-fab-sm__xs" >
                        <img src="./images/newsistema/iconos/edit1.svg" alt="" class="w-50">
                    </button>
                </div>
                <div class="col-1 text-center">
                    <button class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-ojo m-auto bmd-btn-fab-sm__xs" onclick="modalVisualizarInspeccionForm(${Item.id},'${Item.title}')">
                        <img src="./images/newsistema/iconos/ojo1.svg" alt="" class="w-50">
                    </button>
                </div>
                <div class="col-1 text-center">
                    <button class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-trash2 m-auto bmd-btn-fab-sm__xs" onclick="modalDeleteInspeccionForm(${Item.id})">
                        <img src="./images/newsistema/iconos/trash2.svg" alt="" class="w-50">
                    </button>
                </div>
            </div>
        </div>`;
    })
    html += '';
    return html;
}

function modalVisualizarInspeccionForm(idForm,titleForm){
    $('#modal-observacion').addClass('modal_confirmacion__active')
    $('.title_modal_header').text(titleForm)

    let url = `https://0p3r4ti0n5ecur3-prd-forms.azurewebsites.net/api/Get-Form?httpmethod=objectSsoma&id=${idForm}&code=sXuJLNZw7GvtzAVQYMAfMHvPCSaMZWbzrv77Qa2zQksUwIbga52tSg==`
    let headers = {
        "apikey":constantes.apiKey,
    }
    $.ajax({
        method: "get",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function (response){
        console.log(response)
        let cantidadPR = 1
        $('#contenido-detalle').html('')
        response.question_list.forEach((item,index) => {
            let cantidad = index + 1
            if(index < 9) {
                cantidad = '0'+cantidad
            }
            $('#contenido-detalle').append(`<div class="d-flex border-bottom py-2">
                    <div class="col-1" style="color: #34559c;font-weight: bold">${cantidad}</div>
                    <div class="col-11">
                        <div class="title text-left" style="font-size: 14px">
                            ${item.description}
                        </div>
                        <div class="respuest" id="respuesta-${cantidad}">
                            
                        </div>
                    </div>
                </div>`)

            item.question_types.forEach((items) => {
                if(items.question_item_list.length > 0){
                    if(items.type_object_id == 1){
                        $('#respuesta-'+cantidad).html(`<div class="d-flex  ">
                                    <div class="d-flex my-3 flex-wrap" id="sino1">
                                        <div class="content-sino w-100 justify-content-start">
                                            <div class="checklist" style="    border: solid 3px #d2d97b;"></div>
                                            <span class="mx-2 font-weight-bold">Si</span>
                                            <label class="btn-checklist m-0" id="btnchecksi1" >
                                                <span class="icon-circule mr-1"></span>
                                                <span class="icon-circule mr-1"></span>
                                                <span class="icon-circule"></span>
                                            </label>
                                        </div>
                                        <div class="content-sino w-100 mt-2 justify-content-start">
                                            <div class="checklist" style="    border: solid 3px #d2d97b;"></div>
                                            <span class="mx-2 font-weight-bold">No</span>
                                            <label class="btn-checklist m-0" id="btncheckno1" >
                                                <span class="icon-circule mr-1"></span>
                                                <span class="icon-circule mr-1"></span>
                                                <span class="icon-circule"></span>
                                            </label>
                                        </div>
                                        <div class="content-sino w-100 mt-2 justify-content-start">
                                            <div class="checklist" style="    border: solid 3px #d2d97b;"></div>
                                            <span class="mx-2 font-weight-bold">N.A.</span>
                                            <label class="btn-checklist m-0" id="btncheckna1" >
                                                <span class="icon-circule mr-1"></span>
                                                <span class="icon-circule mr-1"></span>
                                                <span class="icon-circule"></span>
                                            </label>
                                        </div>
                                    </div>
                            </div>`)
                    }

                    if(items.type_object_id == 2){
                        items.question_item_list.forEach((item_list)=>{
                            $('#respuesta-'+cantidad).append(`<div class="border p-2 my-2" style="    border-radius: 20px;">${item_list.description}</div>`)
                        })
                    }

                    if(items.type_object_id == 3){
                        $('#respuesta-'+cantidad).html(`<div class="d-flex my-3 ">
                                       <div class="content-sino mr-4" id="temperaturaCotent1">
                                           <img src="./images/newsistema/iconos/atmospheric3.svg" alt="" class="icon-question" style="filter: grayscale(0);">
                                           <span class="ml-3">Temperatura</span>
                                       </div>
                                   </div>`)
                    }

                    if(items.type_object_id == 4){
                        $('#respuesta-'+cantidad).html(`<div class="d-flex my-3 ">
                                       <div class="content-sino mr-4" id="ampliacionrespuesta1">
                                           <img src="./images/newsistema/iconos/pen.svg" alt="" class="icon-question" style="filter: grayscale(0);">
                                           <span class="ml-3">Ampliar respuesta</span>
                                       </div>
                                   </div>`)
                    }


                    if(items.type_object_id == 5){
                        items.question_item_list.forEach((item_list)=>{

                            $('#respuesta-'+cantidad).append(`<div class="content-camara my-3 ml-4">
                                                <button class="btn-round-green btn mr-4 mb-3 flex align-items-center justify-content-center">
                                                    <img src="./images/newsistema/iconos/photo-camera-FFF.svg" alt="">
                                                    <strong class="mx-2">Evidencia</strong></button>
                                                    <div class="border w-100 p-2 my-2" style="border-radius: 20px;">${item_list.description} </div>
                                              
                                            </div>`)
                        })

                    }

                    if(items.type_object_id == 6){
                        items.question_item_list.forEach((item_list)=>{
                            if(item_list.selection_type == 1){
                                $('#respuesta-'+cantidad).append(`<div class="d-flex w-100 align-items-center my-2">
                                                <div class="checklist mr-2"></div>
                                                <div class="border w-75 p-2 my-2" style="border-radius: 20px;">${item_list.description}</div>
                                            </div>`)
                            }else{
                                $('#respuesta-'+cantidad).append(`<div>
                                        <div class=" border title text-left my-3 px-3 py-2" style="font-size: 14px;border-radius: 20px ">
                                            ${item_list.description}
                                        </div>
                                        <div id="content-respuesta-criticidad2-${cantidad}"></div>
                                    </div>`);

                                item_list.item_option_list.forEach((rpta2) => {
                                    $('#content-respuesta-criticidad2-'+cantidad).append(`<div class="d-flex align-items-center">
                                    <div class="cuadrado"></div>
                                    <div class="border w-75 p-2 my-2" style="border-radius: 20px;">${rpta2.title}</div>
                                    </div>`)
                                })
                            }

                        })

                    }

                    if(items.type_object_id == 7 && items.question_item_list[0].text != ''){
                        items.question_item_list.forEach((item_list)=>{

                            $('#respuesta-'+cantidad).append(`<div class="d-flex w-100 align-items-center my-2">
                                              <img src="${item_list.text}" alt="" class="img-fluid">
                                            </div>`)
                        })

                    }

                    if(items.type_object_id == 8){
                        items.question_item_list.forEach((item_list)=>{
                            if(item_list.selection_type == 1){
                                $('#respuesta-'+cantidad).append(`<div class="d-flex w-100 align-items-center my-2">
                                                <div class="border w-100 p-2 my-2" style="border-radius: 20px;">${item_list.description}</div>
                                            </div>`)
                            }else{
                                $('#respuesta-'+cantidad).append(`<div>
                                        <div class=" border title text-left my-3 px-3 py-2" style="font-size: 14px;border-radius: 20px ">
                                            ${item_list.description}
                                        </div>
                                        <div id="content-respuesta-pr2-${cantidadPR}"></div>
                                    </div>`);

                                item_list.item_option_list.forEach((rpta2) => {
                                    $('#content-respuesta-pr2-'+cantidadPR).append(`<div class="d-flex align-items-center">
                                    <div class="cuadrado"></div>
                                    <div class="border w-75 p-2 my-2" style="border-radius: 20px;">${rpta2.title}</div>
                                    </div>`)
                                })
                            }

                            cantidadPR = cantidadPR + 1

                        })

                    }
                }
            })

        })
    })

}


function editInspeccionForm(idForm,titleForm){
    $('#modal-observacion').addClass('modal_confirmacion__active')
    $('.title_modal_header').text(titleForm)

    let url = `https://0p3r4ti0n5ecur3-prd-forms.azurewebsites.net/api/Get-Form?httpmethod=objectSsoma&id=${idForm}&code=sXuJLNZw7GvtzAVQYMAfMHvPCSaMZWbzrv77Qa2zQksUwIbga52tSg==`
    let headers = {
        "apikey":constantes.apiKey,
    }
    $.ajax({
        method: "get",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function (response){
        console.log("################################################## andy-jesus #######################################")
        console.log(response)
        $('#contenido-detalle').html('')
        response.question_list.forEach((item,index) => {
            let cantidad = index + 1
            if(index < 9) {
                cantidad = '0'+cantidad
            }
            $('#contenido-detalle').append(`<div class="d-flex border-bottom py-2">
                    <div class="col-1" style="color: #34559c;font-weight: bold">${cantidad}</div>
                    <div class="col-11">
                        <div class="title text-left" style="font-size: 14px">
                            ${item.description}
                        </div>
                        <div class="respuest" id="respuesta-${cantidad}">
                            
                        </div>
                    </div>
                </div>`)

            item.question_types.forEach((items) => {

                if(items.question_item_list.length > 0){
                    // if(items.type_object_id == 1){
                    //     $('#respuesta-'+cantidad).html(`<div class="d-flex  ">
                    //                 <div class="d-flex my-3 flex-wrap" id="sino1">
                    //                     <div class="content-sino w-100 justify-content-start">
                    //                         <div class="checklist" style="    border: solid 3px #d2d97b;"></div>
                    //                         <span class="mx-2 font-weight-bold">Si</span>
                    //                         <label class="btn-checklist m-0" id="btnchecksi1" >
                    //                             <span class="icon-circule mr-1"></span>
                    //                             <span class="icon-circule mr-1"></span>
                    //                             <span class="icon-circule"></span>
                    //                         </label>
                    //                     </div>
                    //                     <div class="content-sino w-100 mt-2 justify-content-start">
                    //                         <div class="checklist" style="    border: solid 3px #d2d97b;"></div>
                    //                         <span class="mx-2 font-weight-bold">No</span>
                    //                         <label class="btn-checklist m-0" id="btncheckno1" >
                    //                             <span class="icon-circule mr-1"></span>
                    //                             <span class="icon-circule mr-1"></span>
                    //                             <span class="icon-circule"></span>
                    //                         </label>
                    //                     </div>
                    //                     <div class="content-sino w-100 mt-2 justify-content-start">
                    //                         <div class="checklist" style="    border: solid 3px #d2d97b;"></div>
                    //                         <span class="mx-2 font-weight-bold">N.A.</span>
                    //                         <label class="btn-checklist m-0" id="btncheckna1" >
                    //                             <span class="icon-circule mr-1"></span>
                    //                             <span class="icon-circule mr-1"></span>
                    //                             <span class="icon-circule"></span>
                    //                         </label>
                    //                     </div>
                    //                 </div>
                    //         </div>`)
                    // }

                    // if(items.type_object_id == 2){
                    //     items.question_item_list.forEach((item_list)=>{
                    //         $('#respuesta-'+cantidad).append(`<div class="border p-2 my-2" style="    border-radius: 20px;">${item_list.description}</div>`)
                    //     })
                    // }

                    // if(items.type_object_id == 3){
                    //     $('#respuesta-'+cantidad).html(`<div class="d-flex my-3 ">
                    //                    <div class="content-sino mr-4" id="temperaturaCotent1">
                    //                        <img src="./images/newsistema/iconos/atmospheric3.svg" alt="" class="icon-question" style="filter: grayscale(0);">
                    //                        <span class="ml-3">Temperatura</span>
                    //                    </div>
                    //                </div>`)
                    // }

                    // if(items.type_object_id == 4){
                    //     $('#respuesta-'+cantidad).html(`<div class="d-flex my-3 ">
                    //                    <div class="content-sino mr-4" id="ampliacionrespuesta1">
                    //                        <img src="./images/newsistema/iconos/pen.svg" alt="" class="icon-question" style="filter: grayscale(0);">
                    //                        <span class="ml-3">Ampliar respuesta</span>
                    //                    </div>
                    //                </div>`)
                    // }


                    // if(items.type_object_id == 5){
                    //     items.question_item_list.forEach((item_list)=>{

                    //         $('#respuesta-'+cantidad).append(`<div class="content-camara my-3 ml-4">
                    //                             <button class="btn-round-green btn mr-4 mb-3 flex align-items-center justify-content-center">
                    //                                 <img src="./images/newsistema/iconos/photo-camera-FFF.svg" alt="">
                    //                                 <strong class="mx-2">Evidencia</strong></button>
                    //                             <input type="text" class="input-app-circular" id="textEvidencia1-1" placeholder="Escribir..." style="width: 180px;">
                    //                         </div>`)
                    //     })

                    // }

                    // if(items.type_object_id == 6){
                    //     items.question_item_list.forEach((item_list)=>{
                    //         if(item_list.selection_type == 1){
                    //             $('#respuesta-'+cantidad).append(`<div class="d-flex w-100 align-items-center my-2">
                    //                             <div class="checklist mr-2"></div>
                    //                             <div class="border w-75 p-2 my-2" style="border-radius: 20px;">${item_list.description}</div>
                    //                         </div>`)
                    //         }else{
                    //             $('#respuesta-'+cantidad).append(`<div>
                    //                     <div class=" border title text-left my-3 px-3 py-2" style="font-size: 14px;border-radius: 20px ">
                    //                         ${item_list.description}
                    //                     </div>
                    //                     <div id="content-respuesta-criticidad2-${cantidad}"></div>
                    //                 </div>`);

                    //             item_list.item_option_list.forEach((rpta2) => {
                    //                 $('#content-respuesta-criticidad2-'+cantidad).append(`<div class="d-flex align-items-center">
                    //                 <div class="cuadrado"></div>
                    //                 <div class="border w-75 p-2 my-2" style="border-radius: 20px;">${rpta2.description}</div>
                    //                 </div>`)
                    //             })
                    //         }

                    //     })

                    // }

                    // if(items.type_object_id == 7 && items.text != ''){
                    //     $('#respuesta-'+cantidad).append(`<div class="d-flex w-100 align-items-center my-2">
                    //                           <img src="${items.text}" alt="" class="img-fluid">
                    //                         </div>`)
                    // }

                    // if(items.type_object_id == 8){
                    //     items.question_item_list.forEach((item_list)=>{
                    //         if(item_list.selection_type == 1){
                    //             $('#respuesta-'+cantidad).append(`<div class="d-flex w-100 align-items-center my-2">
                    //                             <div class="border w-100 p-2 my-2" style="border-radius: 20px;">${item_list.description}</div>
                    //                         </div>`)
                    //         }else{
                    //             $('#respuesta-'+cantidad).append(`<div>
                    //                     <div class=" border title text-left my-3 px-3 py-2" style="font-size: 14px;border-radius: 20px ">
                    //                         ${item_list.description}
                    //                     </div>
                    //                     <div id="content-respuesta-pr2-${cantidad}"></div>
                    //                 </div>`);

                    //             item_list.item_option_list.forEach((rpta2) => {
                    //                 $('#content-respuesta-pr2-'+cantidad).append(`<div class="d-flex align-items-center">
                    //                 <div class="cuadrado"></div>
                    //                 <div class="border w-75 p-2 my-2" style="border-radius: 20px;">${rpta2.description}</div>
                    //                 </div>`)
                    //             })
                    //         }

                    //     })

                    // }
                }
            })

        })
    })

}



function modalDeleteInspeccionForm(IdInspeccion){
    $('#idInspeccionForm').val(IdInspeccion);
    $('#modal-confirmacion-delete').addClass('modal_confirmacion__active')
}

function deleteInspeccionFormulario(){
    let idInspeccion = $('#idInspeccionForm').val();
    let url = `https://0p3r4ti0n5ecur3-prd-forms.azurewebsites.net/api/Post-Form?httpmethod=delete&code=tbusGxCxP6l8bmUGYeo8gjmwdBHmxA5vECyVKaSi8HB7GdJDdZuslQ==&id=${idInspeccion}`
    let headers = {
        "apikey":constantes.apiKey,
    }
    $.ajax({
        method: "post",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function (response) {
        console.log(response)
        $('#body-tabla-list').html('')
        getListForm();
        cerrarModal('modal-confirmacion-delete')
        $('#modal-confirmacion-delete-mensaje').addClass('modal_confirmacion__active')
    })
}

let CrearInspeccion;
CrearInspeccion = function CrearInspeccion(){
    handlerUrlhtml('contentGlobal','view/ssoma/configuracion-de-inspecciones/creacion-inspeccion.html','Creación de Inspección');
}

let activePregunta;
activePregunta = function activePregunta(idPregunta){
    $(`#${idPregunta}`).addClass('card-pregunta__active')
}

//############################### @andy ##############################################
let EditInspeccion;
EditInspeccion = function EditInspeccion(idV, titlex){
    console.log('############################### @andy ############################'+idV+"--------"+titlex);
    IdInspeccionEdit = idV;
    TitleInspeccionEdit = titlex;
    handlerUrlhtml('contentGlobal','view/ssoma/configuracion-de-inspecciones/edit-inspeccion.html','Editar Inspección '+titlex);

}

