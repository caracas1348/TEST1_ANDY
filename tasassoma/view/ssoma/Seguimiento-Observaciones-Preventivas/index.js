//let FormArray_op = [];
let IdInspeccionEdit_op = "";
let TitleInspeccionEdit_op = "";
let fechaInicio = '';
let fechaFin = '';
let Checklist_op = [];
let Grupo_op = [];
let Subgrupo_op = [];
let observacionSelected = {};
//let accion = "";
let areas = [];
let zonas = [];
let base64_trainning="";
let base64_trainning2="";
let adjuntoBD = {};
let ArchivosBD = [];
let MayorObs = 0;
let dataAll = [];
let Criticidad = [];
let id_location_sap_selected = 0;
var Codigo_Reportante_Temp = "" // reportante activo cuando hacemos click en buscar



// Cargar Filtros
function fnCargarFiltros() {
    fnCargarReportantes();

    fnLlenarCombosFiltros('Selec-TipoObservacion-Filtro', '/api/Get-Tipo-Observacion?code=7lkZkvN9Q3JdTbNhUrbtk4wfOpZ9JQQTLqKtTgcqSd48wyTlns8mug==&httpmethod=objectlist');

    fnLlenarCombosFiltros('Selec-Sede-Filtro', '/api/Get-Sede?code=d0eEG9qHF01JbC9oaU0iajLG4DPLmVRDxO0E42JEuTsiwd7klp0tkw==&httpmethod=objectlist');

    fnLlenarCombosFiltros('Selec-Embarcacion-Filtro', '/api/Get-Embarcacion?code=aUy0KagXZ3EaaNkPH8kHoZgeibTvhykOFvVqMp9OSmRFnBtGGlmY4Q==&httpmethod=objectlist');

    initObservacion();
}

function fnCargarReportantes()
{
    $('#Selec-Reportante-Filtro').html('');
    $('#Selec-Reportante-Filtro').append(`<option value="" selected>Todos</option>`)

    let Selec_TipoObservacion_Filtro = $('#Selec-TipoObservacion-Filtro').val();
    let Selec_Sede_Filtro = $('#Selec-Sede-Filtro').val();
    let Selec_Embarcacion_Filtro = $('#Selec-Embarcacion-Filtro').val();
    let Fechas_Inicio = $('#txt_date_start').val();
    let Fechas_Fin = $('#txt_date_end').val();
    let Selec_Reportante_Filtro = $('#Selec-Reportante-Filtro').val();

    Codigo_Reportante_Temp = localStorage.getItem("Codigo_Reportante_Temp");
    //console.log("---- Codigo_Reportante_Temp ",Codigo_Reportante_Temp)

    //// añadir filtros
    let filtros = '';
    filtros += `&TipoObservacion=${Selec_TipoObservacion_Filtro}`
    filtros += `&Sede=${Selec_Sede_Filtro}`
    filtros += `&Embarcacion=${Selec_Embarcacion_Filtro}`
    filtros += `&Estado=0`
    filtros += `&Reportante=${Codigo_Reportante_Temp}`

    if(Fechas_Inicio === undefined){
        Fechas_Inicio="";
    }
    if(Fechas_Inicio!=""){
        let fInicio = Fechas_Inicio.split('/');
        filtros += `&FechaInicio=${fInicio[2]}/${fInicio[1]}/${fInicio[0]}`
    }
    else{
        var today = new Date();
        // filtros += `&FechaInicio=${today.getFullYear()}${(today.getMonth()+1)}${today.getDate()}`;
        filtros += `&FechaInicio=`;
    }
    if(Fechas_Fin === undefined){
        Fechas_Fin="";
    }
    if(Fechas_Fin!=""){
        // let FechaFin = moment(Fechas_Fin).format('DD/MM/YYYY').split('/');
        let fFin = Fechas_Fin.split('/');
        filtros += `&FechaFin=${fFin[2]}/${fFin[1]}/${fFin[0]}`;
    }
    else{
        var today = new Date();
        // filtros += `&FechaFin=${today.getFullYear()}${(today.getMonth()+1)}${today.getDate()}`;
        filtros += `&FechaFin=`;
    }

    let apiKeyx = "r$3#23516ewew5";
    let metodoAjax =  "GET";
    let url2 = apiUrlssoma+"/api/Get-Reportante?code=8zqFXo16PvhLBx7wa3R9yGPlvaOPeGjIfgPzaR7qEaVEYu8ysPkbcQ==&httpmethod=objectlist"+filtros;

    console.log("url2 ",url2)
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
            if(Codigo_Reportante_Temp === item.Id)
            {
                report.append(`<option value="${item.Id}" selected>${item.Description}</option>`);
            }
            else
            {
                report.append(`<option value="${item.Id}">${item.Description}</option>`);
            }
        });
    })  .fail(function( jqXHR, textStatus, errorThrown) {

    })
        .always(function(data , textStatus, jqXHR ) {
            // alert( "complete" );
        });


}//*/

function fnLlenarCombosFiltros(combo, url) {
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
}

function alertfinalizarObservacion(){

    $("#modal-mantenimiento-observacion").removeClass("fade").modal("hide");
    $("#modalShowAlertConfirm").modal("show").addClass("fade");
    $("#titleConfirm").html('Se finalizará la observación preventiva');

    accion = "finalizar";
}

function finalizarObservacion(){
    let Id = $('#formObservacionId').val();
    let Codigo = $('#formCodigo').val();

   // alert(Id);
   var data = {};
   data['Estado'] = 1;
   data['Updated_By']=getCookie("vtas_id_hash" + sessionStorage.tabVisitasa);

    let url = apiUrlssoma+`/api/Post-Seguimiento-Observacion-Status?code=F27k2V5SiEFWDEXYIM/KgxjNfE5HE9ttXavYgEKDV5Hh6shK8c/iLQ==&httpmethod=put&Id=${Id}`
    let headers = {
        "apikey":constantes.apiKey,
    }
    $.ajax({
        method: "post",
        url:  url,
        data: JSON.stringify(data),
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function (response) {

        $('#btnValida').prop("disabled", false);
        $('#body-tabla-list').html('');
        fnCargarGrid();
                $("#modalShowAlertConfirm").removeClass("fade").modal("hide");
        // Falta validar el status = false

        $('#codeObservacion').html('');
        $('#codeObservacion').append('<h2><b>'+Codigo+'</b></h2>')

        $("#titleMessage").html("Se finalizó la observación preventiva con éxito");
        $("#modalShowAlertOk").modal("show");
         $("#preloader").fadeOut();

        // $('#modal-confirmacion-delete-mensaje').addClass('modal_confirmacion__active')
    })//*/
}


function buscarAreas(sede, unidadNegocio, area)
{
    $('#ul-Area').html('');
    $('#ul-Area').append(`<li class="mdc-list-item mdc-list-item--selected" data-value="0" aria-selected="true" ">
                        <span class="mdc-list-item__ripple"></span>
                    </li>`);

    areas.map(function(Item){
        if (Item.UnidadNegocioId === unidadNegocio)
        {
            //description = toCapitalize(Item.Description)
            description = Item.Description
            $(`#ul-Area`).append(`<li class="mdc-list-item" data-value="${Item.Id}" tabindex="-1"">
                                    <span class="mdc-list-item__ripple"></span>
                                    <span class="mdc-list-item__text">${description}</span>
                                </li>`);
        }
    });

    let cbo_area = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-area'));
    cbo_area.value = area.toString();
}

function buscarZonas(unidadNegocio, unidadNegocioSub, zona)
{
    $('#ul-Zona').html('');
    $('#ul-Zona').append(`<li class="mdc-list-item mdc-list-item--selected" data-value="0" aria-selected="true" >
                            <span class="mdc-list-item__ripple"></span>
                        </li>`);

    zonas.map(function(Item){
        if (Item.UnidadNegocioId === unidadNegocio && Item.UnidadNegocioSubId === unidadNegocioSub)
        {
            //description = toCapitalize(Item.Description)
            description = Item.Description
            $(`#ul-Zona`).append(`<li class="mdc-list-item" data-value="${Item.Id}" tabindex="-1"">
                                    <span class="mdc-list-item__ripple"></span>
                                    <span class="mdc-list-item__text">${description}</span>
                                </li>`);
        }
    });

    // cbo_area.value = response.DatosPrincipales.Area_Id.toString();

    // cbo_zona.value = response.DatosPrincipales.Zona_Id.toString();
    let cbo_zona = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-zona'));
    cbo_zona.value = zona.toString();
}


// Cargar Grid ajax
function fnCargarGrid()
{

    // LIMPIAR ARRAY DE CrITICIDAD
    Criticidad = []
    // LIMPIAR SELECT DE REPORTANTES
    //$('#Selec-Reportante-Filtro').html('');
    //$('#Selec-Reportante-Filtro').append(`<option value="" selected>Todos</option>`)

    $('#body-tabla-list').html('');
    $('#body-tabla-loader').removeClass('d-none');

    let Selec_TipoObservacion_Filtro = $('#Selec-TipoObservacion-Filtro').val();
    let Selec_Sede_Filtro            = $('#Selec-Sede-Filtro').val();
    let Selec_Embarcacion_Filtro     = $('#Selec-Embarcacion-Filtro').val();
    let Fechas_Inicio                = $('#txt_date_start').val();
    let Fechas_Fin                   = $('#txt_date_end').val();
    let Selec_Criticidad_Filtro      = $('#Selec-Criticidad-Filtro').val();
    // let Rango_Fechas_Filtro = $('input[name="Rango-Fechas-Filtro"]').val();
    let Selec_Reportante_Filtro = $('#Selec-Reportante-Filtro').val();

    // Store
    $('#Codigo_Reportante_Temp').val(Selec_Reportante_Filtro);
    localStorage.setItem("Codigo_Reportante_Temp", $('#Codigo_Reportante_Temp').val());

    let filtros = '';
    filtros += `&TipoObservacion=${Selec_TipoObservacion_Filtro}`
    filtros += `&Sede=${Selec_Sede_Filtro}`
    filtros += `&Embarcacion=${Selec_Embarcacion_Filtro}`
    filtros += `&Estado=0`
    filtros += `&Reportante=${Selec_Reportante_Filtro}`
    filtros += `&Criticidad=${Selec_Criticidad_Filtro}`

    if(Fechas_Inicio === undefined){
        Fechas_Inicio="";
    }
    if(Fechas_Inicio!=""){
        let fInicio = Fechas_Inicio.split('/');
        filtros += `&FechaInicio=${fInicio[2]}/${fInicio[1]}/${fInicio[0]}`
    }
    else{
        var today = new Date();
        // filtros += `&FechaInicio=${today.getFullYear()}${(today.getMonth()+1)}${today.getDate()}`;
        filtros += `&FechaInicio=`;
    }
    if(Fechas_Fin === undefined){
        Fechas_Fin="";
    }
    if(Fechas_Fin!=""){
        // let FechaFin = moment(Fechas_Fin).format('DD/MM/YYYY').split('/');
        let fFin = Fechas_Fin.split('/');
        filtros += `&FechaFin=${fFin[2]}/${fFin[1]}/${fFin[0]}`;
    }
    else{
        var today = new Date();
        // filtros += `&FechaFin=${today.getFullYear()}${(today.getMonth()+1)}${today.getDate()}`;
        filtros += `&FechaFin=`;
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

    //// VALIRAR EL ROL PARA OCULTAR O MOSTRAR LAS DIFERENTES OPCIONES
    ///ROL_REPORTANTE || ROL_REPORTANTELIDER
    let rol = getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)

    if (rol === 'ROL_REPORTANTE')
    {
        //console.warn("AGREGAR ID HASH DEL USUARIO A LA CONSULTA " + getCookie("vtas_id_hash" + sessionStorage.tabVisitasa))
        filtros += `&Reportante=`+getCookie("vtas_id_hash" + sessionStorage.tabVisitasa)
    }

    // '&TipoObservacion=1&FechaInicio=20201022&FechaFin=20201024'
    let headers;
    let url = `${apiUrlssoma}/api/Get-Seguimiento-Observacion?code=/bZQ2JICH4yRjEcKhyhZDqIiRhYabDPTMb4wRcZxem5ojqEl8SxGaw==&httpmethod=objectlist${filtros}`
    console.warn("url -> ",url)
    headers = {
        "apikey":constantes.apiKey,
    }

    findChecklist();

    $.ajax({
        method: "GET",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function (response) {

        dataAll = response.Data;
        Criticidad = response.Criticidad


        console.warn("dataAll -> ",dataAll)
        // console.warn("Criticidad -> ",Criticidad)

        $('#Selec-Criticidad-Filtro').html('');
        $('#Selec-Criticidad-Filtro').append(`<option value="0" selected>Todos</option>`);
        // console.warn(Selec_Criticidad_Filtro)
        Criticidad.forEach((Item) =>
        {
            description = toCapitalize(Item.Description);

            // console.warn(Item.Id)
            // console.warn( parseInt(Selec_Criticidad_Filtro) === Item.Id)
            // PARA DEJAR SELECCIONADA LA CRITICIDAD
            if ( parseInt(Selec_Criticidad_Filtro) === Item.Id)
            {
                $('#Selec-Criticidad-Filtro').append(`<option value="${Item.Id}" selected>${description}</option>`);
            }
            else
            {
                $('#Selec-Criticidad-Filtro').append(`<option value="${Item.Id}">${description}</option>`);
            }
        });


        $('#ul-Criticidad').html('');
        $('#ul-Criticidad').append(`<li class="mdc-list-item mdc-list-item--selected" data-value="0" aria-selected="true">
                                <span class="mdc-list-item__ripple"></span>
                                <span class="mdc-list-item__text">Seleccionar</span>
                            </li>`);

        Criticidad.forEach((Item) => {
            description = toCapitalize(Item.Description)
            $('#ul-Criticidad').append(`<li class="mdc-list-item" data-value="${Item.Id}" tabindex="-1" >
                                    <span class="mdc-list-item__ripple"></span>
                                    <span class="mdc-list-item__text">${description}</span>
                                </li>`);
        });

        //let cbo_criticidad = mdc.textField.MDCTextField.attachTo(document.querySelector('.cbo-criticidad'));


        dataAll.forEach((Item)=>{
            var idObs = parseInt(Item.Id);
            if(idObs > MayorObs)
            {
                MayorObs = idObs;
            }
        });

        $('#pagination-container').pagination({
            dataSource: dataAll,
            pageSize: 8,
            callback: function(data, pagination) {
                var html = fnTempleteGrid(data);
                $('#body-tabla-list').html(html);
            }
        });

        //$('#cantidad').text(response.Total)
        $('#cantidad').text(response.Data.length)

        if (response.Total == 0)
        {
            let storage = getStorage("vtas_rolexternalrol", "text");

            if(storage == 'ROL_REPORTANTE') {
                $('#cantidad').removeClass('d-none');
                $('#tbReportante').removeClass('d-none');
                $('#tbReportanteLider').addClass('d-none');
            }
            else if(storage == 'ROL_REPORTANTELIDER') {
                $('#cantidad').removeClass('d-none');
                $('#tbReportante').addClass('d-none');
                $('#tbReportanteLider').removeClass('d-none');
            }
            else
            {
                $('#cantidad').addClass('d-none');
                $('#tbReportante').addClass('d-none');
            }
        }


        $('#body-tabla-loader').addClass('d-none');

        if (dataAll.length == 0)
        {
            $('#body-tabla-Vacio').removeClass('d-none');
        }
        else{
            $('#body-tabla-Vacio').addClass('d-none');
        }

    })
    .always(function( jqXHR, textStatus, errorThrown )
    {
        console.warn("jqXHR",jqXHR)


    });

};

/**
 * [fnDownloadExcelSP2 PARA DESCARGAR EL EXCEL DEL LISTADO DE OP MOSTRADAS]
 * @return {[type]} [description]
 */
var fnDownloadExcelSP2 = function()
{
    //console.warn("dataAll",dataAll)
    let excel = `
        <table border="1" style="color: #000;">
            <thead>
                <tr>
                    <th bgcolor="#B2B2B2">MES</th>
                    <th bgcolor="#B2B2B2">FECHA</th>
                    <th bgcolor="#B2B2B2">HORA DE REGISTRO</th>
                    <th bgcolor="#B2B2B2">ID OBSERVACIÓN</th>
                    <th bgcolor="#B2B2B2">TIPO DE OBSERVACIÓN PREVENTIVA</th>
                    <th bgcolor="#B2B2B2">COMPORTAMIENTO</th>
                    <th bgcolor="#B2B2B2">REPORTADO</th>
                    <th bgcolor="#B2B2B2">REPORTANTE</th>
                    <th bgcolor="#B2B2B2">SEDE/EMBARCACIÓN</th>
                    <th bgcolor="#B2B2B2">ZONA/EQUIPO</th>
                    <th bgcolor="#B2B2B2">DESCRIPCI&Oacute;N</th>
                    <th bgcolor="#B2B2B2">ÁREA RESPONSABLE DE LA CORRECCI&Oacute;N</th>
                    <th bgcolor="#B2B2B2">¿A que se debe este comportamiento?</th>
                    <th bgcolor="#B2B2B2">¿Se ajust&oacute; o se acomod&oacute; el EPP?</th>
                    <th bgcolor="#B2B2B2">Procedimiento que incumple</th>
                    <th bgcolor="#B2B2B2">¿El ambiente de trabajo esta en buenas condiciones? ¿Qu&eacute; observ&oacute;?</th>
                    <th bgcolor="#B2B2B2">Acciones Correctivas a implementar</th>
                </tr>
            <thead>
            <tbody id="ListadoDeOP">
    `
    // ARRAY CON LOS MESES DE AÑO
    let meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
    // OBTENEMOS LA FECHA ACTUAL
    let now = new Date()
    // OBTENERMOS EL MES
    let mes = now.getMonth()

    // RECORREMOS EL ARRAY CON LOS CHECKLIST
    dataAll.forEach(function(Item)
    {
        // OBTENEMOS LOS DATOS DEL CHEKLIST
        let observado       = ""
        let comportamiento  = ""
        let proteccion      = ""
        let procedimiento   = ""
        let condiciones     = ""
        let acciones        = ""
        let descripcion     = ""
        // CONTADORES DE OPCIONES SELECCIONADAS
        let opc3 = 0
        let opc4 = 0
        let opc5 = 0
        let opc6 = 0

        Item.Checklist.forEach(function(data)
        {
            // 01. Comportamiento inseguro observado
            if(data.Grupo_Id===1)
            {
                if(data.Grupo_Id === data.Grupo_Observacion)
                {
                    observado = data.Opcion_Des
                }
            }

            // 02. ¿A que se debe éste comportamiento inseguro?
            if(data.Grupo_Id===2)
            {
                if(data.Grupo_Id === data.Grupo_Observacion)
                {
                    comportamiento = (data.Opcion_Observacion===14) ? data.Respuesta_Observacion : data.Opcion_Des
                }
            }
            // 03. Equipo de protección personal observado
            if(data.Grupo_Id===3)
            {
                if(data.Grupo_Id === data.Grupo_Observacion)
                {
                    let opcion = ""
                    let otros  = ""
                    // console.warn("Item.Codigo -> ",Item.Codigo, "opc3 ->",opc3)
                    // console.warn("data.Grupo_Id -> ",data.Grupo_Id," Opcion_Id -> ",data.Opcion_Id,"data.Opcion_Des -> ",data.Opcion_Des, "Respuesta_Observacion -> ",data.Respuesta_Observacion)

                    opcion = data.Opcion_Des
                    otros  = data.Respuesta_Observacion
                    opcion = ( data.Opcion_Id === 30 ) ? otros : opcion

                    if( (data.Opcion_Id !== 30 && data.Opcion_Id !== 60) || ( data.Opcion_Id === 30 && data.Respuesta_Observacion !== "" ) )
                    {
                        proteccion = (opc3==0) ? opcion : proteccion+", "+opcion
                        opc3++
                    }

                    // PARA LA DESCRIPCION
                    descripcion = (data.Opcion_Id === 60) ? otros : descripcion
                }
            }

            // 04. Procedimiento que se incumple
            if(data.Grupo_Id===4 && data.Grupo_Id === data.Grupo_Observacion)
            {
                let opcion = ""
                let otros  = ""

                opcion = data.Opcion_Des
                otros  = data.Respuesta_Observacion
                opcion = ( data.Opcion_Id === 40 ) ? otros : opcion

                if( (data.Opcion_Id !== 40 && data.Opcion_Id !== 61) || ( data.Opcion_Id === 40 && data.Respuesta_Observacion !== "" ) )
                {
                    procedimiento = (opc4==0) ? opcion : procedimiento+", "+opcion
                    opc4++
                }

                // PARA LA DESCRIPCION
                descripcion = (data.Opcion_Id === 61) ? otros : descripcion
            }

            // 05. ¿El ambiente de trabajo está en buenas condiciones? ¿Qué observó?
            if(data.Grupo_Id===5 && data.Grupo_Id === data.Grupo_Observacion)
            {
                let opcion = ""
                let otros  = ""

                opcion = data.Opcion_Des
                otros  = data.Respuesta_Observacion
                opcion = ( data.Opcion_Id === 55 ) ? otros : opcion


                if( (data.Opcion_Id !== 55 && data.Opcion_Id !== 62) || ( data.Opcion_Id === 55 && data.Respuesta_Observacion !== "" ) )
                {
                    condiciones = (opc5==0) ? opcion : condiciones+", "+opcion
                    opc5++
                }

                // PARA LA DESCRIPCION
                descripcion = (data.Opcion_Id === 62) ? otros : descripcion
            }

            // 06. Acciones correctivas a implementar
            if( (data.Grupo_Id === 6 && data.Grupo_Id === data.Grupo_Observacion && data.Tipo_Observacion_Id === data.Grupo_Padre_Opcion)  )
            {
                let opcion = ""
                let otros  = ""

                // console.warn("Item.Codigo -> ",Item.Codigo, "opc6 ->",opc6)
                // console.warn("data.Grupo_Id -> ",data.Grupo_Id," Opcion_Id -> ",data.Opcion_Id,"data.Opcion_Des -> ",data.Opcion_Des, "Respuesta_Observacion -> ",data.Respuesta_Observacion)
                // console.warn("data.Tipo_Observacion_Id -> ",data.Tipo_Observacion_Id)

                opcion = data.Opcion_Des
                otros  = data.Respuesta_Observacion
                opcion = ( data.Opcion_Id === 59 ) ? otros : opcion

                if( (data.Opcion_Id !== 59) || ( data.Opcion_Id === 59 && data.Respuesta_Observacion !== "" ) )
                {
                    acciones = (opc6==0) ? opcion : acciones+", "+opcion
                    opc6++
                }
            }



        })

        // agregamos una fila
        excel += `
            <tr bgcolor="#fff">
                <td text-aling="center">${meses[mes]}</td>
                <td text-aling="center">${Item.Fecha_Creacion}</td>
                <td text-aling="center">${Item.Hora_Operacion}</td>
                <td text-aling="center">${Item.Codigo}</td>
                <td text-aling="center">${Item.Tipo_Observacion_Des}</td>
                <td text-aling="center">${observado}</td>
                <td text-aling="center">${Item.Nombres_Reportado}</td>
                <td text-aling="center">${Item.Nombres_Reportante}</td>
                <td text-aling="center">${Item.Sede_Des}${Item.Embarcacion_Des}</td>
                <td text-aling="center">${Item.Zona_Des}</td>
                <td text-aling="center">${descripcion}</td>
                <td text-aling="center">${Item.Area_Des}</td>
                <td text-aling="center">${comportamiento}</td>
                <td text-aling="center">${proteccion}</td>
                <td text-aling="center">${procedimiento}</td>
                <td text-aling="center">${condiciones}</td>
                <td text-aling="center">${acciones}</td>
            </tr>
        `
    })

    excel += `</tbody></table>`
    console.warn("excel->",excel)
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
    {
        txtArea1.document.open("txt/html","replace");
        txtArea1.document.write(excel);
        txtArea1.document.close();
        txtArea1.focus();
        sa=txtArea1.document.execCommand("SaveAs",true,"Say Thanks to Sumit.xls");
    }
    else                 //other browser not tested on IE 11
    {
        var link = document.getElementById('ListadoExcelOP');

        link.href='data:application/vnd.ms-excel;base64,' + window.btoa(excel);
        link.download='Listado SALVA OP';
        link.click();
        //sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(excel));
    }

    //return (sa);

}

// Dibujar plantilla html del grid
function fnTempleteGrid(data) {
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
        let eliminar = Item.Eliminar ? '' : 'disabled';

        var btNew = "";
        let idObs = parseInt(Item.Id);
        if( idObs == MayorObs && idObs > 0)
        {
            btNew = "<div  class='check-blue text-center'>Nuevo</div>"
        }
        else
        {
            btNew = "";
        }


        let storage = getStorage("vtas_rolexternalrol", "text");


        if(storage == 'ROL_REPORTANTE')
        {
            $('#tbReportante').removeClass('d-none');
            $('#tbReportanteLider').addClass('d-none');
            $('#cantidad').removeClass('d-none');


            html += `<div class="item-tabla p-2" style="font-size: 15px; display:relative;">
                    ${btNew}
                    <div class="row m-0 justify-content-between align-items-center">

                        <div class="col-md-4 text-center row">
                            <div class="col-md-6 lbFormsoma">${Item.Codigo}</div>
                            <div class="col-md-6 lbFormsoma">${toCapitalize(Item.Tipo_Observacion_Des)}</div>
                        </div>
                        <div class="col-md-2 text-center row">
                            <div class="col-md-6 lbFormsoma">${ Item.Sede_Id==0 ? '-' : Item.Sede_Des }</div>
                            <div class="col-md-6 lbFormsoma">${Item.Embarcacion_Id==0 ? '-' : Item.Embarcacion_Des }</div>
                        </div>

                        <div class="col-md-2 text-center row">
                            <div class="col-md-8 lbFormsoma">${toCapitalize(Item.Area_Des)}</div>
                            <div class="col-md-4 lbFormsoma">${Item.Fecha_Creacion}</div>
                        </div>

                        <div class="col-md-4 text-center row">
                            <div class="col-md-4 lbFormsoma">${toCapitalize(Item.Estado_Des)}</div>
                            <div class="col-md-6 lbFormsoma">
                                <img src="./images/newsistema/iconos/${Item.Image}" alt="" class="w-10">
                                ${toCapitalize(Item.Criticidad)}
                            </div>
                            <div class="col-md-2 lbFormsoma">
                                <button ${ver} onclick="onOpenModalObservacion(${Item.Id}, 'Ver', true)" class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-ojo m-auto bmd-btn-fab-sm__xs">
                                    <img src="./images/newsistema/iconos/ojo1.svg" alt="" class="w-50">
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`;

        }
        else if(storage == 'ROL_REPORTANTELIDER')
        {
            $('#tbReportante').addClass('d-none');
            $('#tbReportanteLider').removeClass('d-none');
            $('#cantidad').removeClass('d-none');

            html += `<div class="item-tabla p-2" style="font-size: 15px; display:relative;">
                    ${btNew}
                    <div class="row m-0 justify-content-between align-items-center">

                        <div class="col-md-3 text-center row">
                            <div class="col-md-6 lbFormsoma">${Item.Codigo}</div>
                            <div class="col-md-6 lbFormsoma">${toCapitalize(Item.Tipo_Observacion_Des)}</div>
                        </div>
                        <div class="col-md-2 text-center row">
                            <div class="col-md-6 lbFormsoma">${ Item.Sede_Id==0 ? '-' : Item.Sede_Des }</div>
                            <div class="col-md-6 lbFormsoma">${Item.Embarcacion_Id==0 ? '-' : Item.Embarcacion_Des }</div>
                        </div>

                        <div class="col-md-2 text-center row">
                            <div class="col-md-8 lbFormsoma">${toCapitalize(Item.Area_Des)}</div>
                            <div class="col-md-4 lbFormsoma">${Item.Fecha_Creacion}</div>
                        </div>

                        <div class="col-md-2 text-center row">
                            <div class="col-md-5 lbFormsoma">${toCapitalize(Item.Estado_Des)}</div>
                            <div class="col-md-7 lbFormsoma">${toCapitalize(Item.Nombres_Reportante)}</div>
                        </div>

                        <div class="col-md-1 text-center row">
                            <div class="col-md-12 lbFormsoma">
                                <img src="./images/newsistema/iconos/${Item.Image}" alt="" class="w-10">
                                ${toCapitalize(Item.Criticidad)}
                            </div>
                        </div>

                        <div class="col-md-2 text-center row">
                            <div class="col-md-4">
                                <button ${editar} onclick="onOpenModalObservacion(${Item.Id}, 'Editar', false)" class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-add m-auto bmd-btn-fab-sm__xs" >
                                    <img src="./images/newsistema/iconos/edit1.svg" alt="" class="w-50">
                                </button>
                            </div>
                            <div class="col-md-4">
                                <button ${ver} onclick="onOpenModalObservacion(${Item.Id}, 'Ver', true)" class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-ojo m-auto bmd-btn-fab-sm__xs">
                                    <img src="./images/newsistema/iconos/ojo1.svg" alt="" class="w-50">
                                </button>
                            </div>
                            <div class="col-md-4">
                                <button ${eliminar} class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-trash2 m-auto bmd-btn-fab-sm__xs" onclick="modalDeleteObservacionForm(${Item.Id}, '${Item.Codigo}', '${Item.Codigo_Reportante}')">
                                    <img src="./images/newsistema/iconos/trash2.svg" alt="" class="w-50">
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`;
        }
        else
        {
            $('#cantidad').addClass('d-none');
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

function evSelectSedeFiltroChange() {
    $('#Selec-Embarcacion-Filtro').val(0)
    $('#Selec-Embarcacion-Filtro').prop('disabled', $('#Selec-Sede-Filtro').val() != 0);
}

function evSelectEmbarcacionFiltroChange() {
    $('#Selec-Sede-Filtro').val(0)
    $('#Selec-Sede-Filtro').prop('disabled', $('#Selec-Embarcacion-Filtro').val() != 0);
}


//function onOpenModalObservacion(PersonType,PersonName,Role,AreaId,SedeId,UnitId,AreaResponsible,UserName,pName,lName,Id,Hash,IdentityDocument,Job){
function onOpenModalObservacion(Id, title, readOnly){

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

    //if(title==='Ver'){
        $("#btn-cancelar2").css('background-color', '#254373');
        $("#btn-cancelar2").css('border', 'solid #254373');
        $("#btn_create_auditor").css('background-color', '#61b4f9');
        $("#btn_create_auditor").css('border', 'solid #61b4f9');
    /*}
    else{
    }//*/

    $("#titleConfirm").html("Se modificará la observación preventiva");

    $("#bodyCrear").addClass("d-none");
    $("#bodyActualizar").removeClass("d-none");

    $("#titleMessage").html("Se guardó la modificación con éxito");



    $('#btn-fin').attr('disabled',false);

    if(title=='Ver')
    {
        // bloquear input fecha de operacion
        $('#txt_fecha_operacion').attr('disabled',true);
        // bloquear input hora de operacion
        $('#tx_name').attr('disabled',true);

        $('.fecha-operacion').css('background-color','#c3c3c3');
        $('.hora-operacion').css('background-color','#c3c3c3');
        // $('.cbo-criticidad').addClass('mdc-select--disabled')
        // $('.cbo-criticidad').css('background-color','#c3c3c3');
    }
    else
    {
        // bloquear input fecha de operacion
        $('#txt_fecha_operacion').attr('disabled',false);
        // bloquear input hora de operacion
        $('#tx_name').attr('disabled',false);
        $('.fecha-operacion').css('background-color','#fff');
        $('.hora-operacion').css('background-color','#fff');
        //$('.cbo-criticidad').removeClass('mdc-select--disabled')
        $('.cbo-criticidad').removeClass('mdc-select--disabled').css('background-color','#fff');
    }



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
    var url =apiUrlssoma+"/api/Get-Seguimiento-Observacion?code=/bZQ2JICH4yRjEcKhyhZDqIiRhYabDPTMb4wRcZxem5ojqEl8SxGaw==&httpmethod=object&Id="+Id;
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
        observacionSelected = response;
        console.warn("RESPONSE",response)
        $('#txtHeadModalMantenimiento').html(title + " SALVA - Observación Preventiva - " + response.DatosPrincipales.Codigo);
        $('input[name=Tipo_Observacion]').attr('disabled','disabled');
        $('input[name=Nombres_Reportante]').attr('disabled','disabled');
        $('input[name=Nombres_Reportado]').attr('disabled','disabled');
        $('input[name=Tipo_Observacion][value="'+response.DatosPrincipales.Tipo_Observacion_Id+'"]').prop("checked", true);
        $('#formObservacionId').val(Id);
        $('#formCodigo').val(response.DatosPrincipales.Codigo);
        var fechaActual = moment(response.DatosPrincipales.Fecha_Operacion).format('DD/MM/YYYY');
        moment.locale('en');
        var horaActual = moment(response.DatosPrincipales.Hora_Operacion).format('HH:mm');

        //    let codigo_reportante = mdc.textField.MDCTextField.attachTo(document.querySelector('.codigo-reportante'));
            let reportante = mdc.textField.MDCTextField.attachTo(document.querySelector('.reportante'));
            //let codigo_reportado = mdc.textField.MDCTextField.attachTo(document.querySelector('.codigo-reportado'));
            let reportado = mdc.textField.MDCTextField.attachTo(document.querySelector('.reportado'));
            let fecha_operacion = mdc.textField.MDCTextField.attachTo(document.querySelector('.fecha-operacion'));
            let hora_operacion = mdc.textField.MDCTextField.attachTo(document.querySelector('.hora-operacion'));


            // let cbo_criticidad = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-criticidad'));
            let cbo_sede = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-sede'));
            let cbo_embarcacion = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-embarcacion'));
            let cbo_area = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-area'));
            let cbo_zona = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-zona'));
          //  $('.codigo-reportante').css('background-color','#c3c3c3');
          $('.reportante').css('background-color','#c3c3c3');
          //   $('.codigo-reportado').css('background-color','#c3c3c3');
            $('.reportado').css('background-color','#c3c3c3');
            //$('.fecha-operacion').css('background-color','#c3c3c3');
            //$('.hora-operacion').css('background-color','#c3c3c3');
            $('.cbo-sede').css('background-color','#c3c3c3');
            $('.cbo-embarcacion').css('background-color','#c3c3c3');
            $('.cbo-area').css('background-color','#c3c3c3');
            $('.cbo-zona').css('background-color','#c3c3c3');

            fecha_operacion.value = fechaActual;
            //cbo_criticidad.value  = response.DatosPrincipales.Criticidad_Id.toString();
            cbo_sede.value        = response.DatosPrincipales.Sede_Id.toString();
            cbo_embarcacion.value = response.DatosPrincipales.Embarcacion_Id.toString();

            if (response.DatosPrincipales.Sede_Id == 0)
            {
                buscarZonas(response.DatosPrincipales.Embarcacion_UnidadNegocioId, response.DatosPrincipales.Embarcacion_UnidadNegocioSubId, response.DatosPrincipales.Zona_Id);
            }
            else
            {
                buscarAreas(response.DatosPrincipales.Sede_Id, response.DatosPrincipales.Sede_UnidadNegocioId, response.DatosPrincipales.Area_Id);
                buscarZonas(response.DatosPrincipales.Sede_UnidadNegocioId, 0, response.DatosPrincipales.Area_Id);
            }


           // codigo_reportante.value = response.DatosPrincipales.Codigo_Reportante;
            reportante.value = response.DatosPrincipales.Nombres_Reportante;
           // codigo_reportado.value = response.DatosPrincipales.Codigo_Reportado;
            reportado.value = response.DatosPrincipales.Nombres_Reportado;

            $('#Codigo_Reportante').val(response.DatosPrincipales.Codigo_Reportante);
            $('#Codigo_Reportado').val(response.DatosPrincipales.Codigo_Reportado);


            var hora_op=response.DatosPrincipales.Hora_Operacion.split(':');
            HH = hora_op[0];
            MM=hora_op[1];
            // SS=hora_op[2]
            // if(hora_op[0]>12){
            //     HH = hora_op[0]-12;
            //     TT="PM";
            // }else if(hora_op[0]==0){
            //     HH = 12;
            //     TT="AM";
            // }else if(hora_op[0]==12){
            //     HH = hora_op[0];
            //     TT="PM";
            // }else{
            //     HH = hora_op[0];
            //     TT="AM";
            // }
            // hora_operacion.value = HH+':'+MM+':'+SS+' '+TT;
            hora_operacion.value = HH+':'+MM;

            $('.mdc-select__ripple').css('background-color','#c3c3c3');

            if(title!=='Ver')
                $('.mdc-select__ripple_Criticidad').css('background-color','#fff');

            //$('.cbo-criticidad').addClass('mdc-select--disabled')
            $('.cbo-sede').addClass('mdc-select--disabled')
            $('.cbo-embarcacion').addClass('mdc-select--disabled')
            $('.cbo-area').addClass('mdc-select--disabled')
            $('.cbo-zona').addClass('mdc-select--disabled')
            $('input[name=Nombres_Reportado]').addClass('mdc-select--disabled')

            $('.mdc-select__selected-text').addClass('mdc-select--outlined')

            adjuntoBD  = response.Adjunto;
            ArchivosBD = response.Archivos;

            if(response.Archivos.length > 0)
            {
                base64_trainning  = response.Archivos[0].Adjunto
            }
            if(response.Archivos.length > 1)
            {
                base64_trainning2 = response.Archivos[1].Adjunto
            }

            //console.warn(base64_trainning, base64_trainning2)

            combo_box_1(readOnly);
            selcomportamiento();
            showsSelectOption(response.Checklist, readOnly)

            if(title=='Ver')
            {
                $('.cbo-criticidad').addClass('mdc-select--disabled')
                $('.cbo-criticidad').css('background-color','#c3c3c3');
            }
            else
            {
                $('.mdc-select__ripple_Criticidad').css('background-color','#fff');
            }

            let cbo_criticidad = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-criticidad'));
            cbo_criticidad.value  = response.DatosPrincipales.Criticidad_Id.toString();
    })
    .always(function( jqXHR, textStatus, errorThrown )
    {
        $('#modal-mantenimiento-observacion').modal('show');
    })

}


function showsSelectOption(option, readOnly)
{
    // debugger
    for (i in option){
        if(option[i].Grupo_Observacion== 1 && option[i].Subgrupo_Observacion==0)
        {
            $('input[name="grupo_'+option[i].Grupo_Observacion+'_'+option[i].Subgrupo_Observacion+'"][value="'+option[i].Opcion_Observacion+'"]').prop("checked", true);
            selcomportamiento()
        }else{

            if(option[i].Opcion_Tipo_Des != "" || option[i].Opcion_Tipo_Des !=null)
            {
                switch (option[i].Opcion_Tipo_Des)
                {

                    case "TextArea":
                        $('#textareagrupo_'+option[i].Grupo_Observacion+'_'+option[i].Subgrupo_Observacion+'_'+option[i].Opcion_Observacion+'').val(option[i].Respuesta_Observacion);
                        onkeyup_Comentario('textareagrupo_'+option[i].Grupo_Observacion+'_'+option[i].Subgrupo_Observacion+'_'+option[i].Opcion_Observacion+'');

                        if(readOnly)
                        {
                            $('#textareagrupo_'+option[i].Grupo_Observacion+'_'+option[i].Subgrupo_Observacion+'_'+option[i].Opcion_Observacion+'').attr('disabled','disabled');
                        }

                        break;

                    case "TextBox":
                        $('input[name="textgrupo_'+option[i].Grupo_Observacion+'_'+option[i].Subgrupo_Observacion+'_'+option[i].Opcion_Observacion+'"]').val(option[i].Respuesta_Observacion);

                        if(readOnly)
                        {
                            $('input[name="textgrupo_'+option[i].Grupo_Observacion+'_'+option[i].Subgrupo_Observacion+'_'+option[i].Opcion_Observacion+'"]').attr('disabled','disabled');
                        }
                        break;

                }
            }

            $('input[name="grupo_'+option[i].Grupo_Observacion+'_'+option[i].Subgrupo_Observacion+'"][value="'+option[i].Opcion_Observacion+'"]').prop("checked", true);

            if(readOnly)
            {
                $('input[name="grupo_'+option[i].Grupo_Observacion+'_'+option[i].Subgrupo_Observacion+'"]').attr('disabled','disabled')
            }



        }

    }
}



function fnAbrirModalMantenimiento(){
    // $('#modal-mantenimiento-observacion').addClass('modal_confirmacion__active');
    base64_trainning="";
    base64_trainning2="";
    $("#btn-cancelar2").css('background-color', '#61b4f9');
    $("#btn-cancelar2").css('border', 'solid #61b4f9');
    $('#btn_create_auditor').removeClass('d-none');
    $("#btn_create_auditor").css('background-color', '#254373');
    $("#btn_create_auditor").css('border', 'solid #254373');
    $('#btn-pdf').addClass('d-none');
    $('#btn-fin').addClass('d-none');

    // desbloquear input fecha de operacion
    $('#txt_fecha_operacion').attr('disabled',false);
    // desbloquear input hora de operacion
    $('#tx_name').attr('disabled',false);

    $('#textoBotonGuardar').html('Finalizar');

    $('#formObservacionId').val('');
    $('.cbo-criticidad').removeClass('mdc-select--disabled')
    $('.cbo-sede').removeClass('mdc-select--disabled')
    $('.cbo-embarcacion').removeClass('mdc-select--disabled')
    $('.cbo-area').removeClass('mdc-select--disabled')
    $('.cbo-zona').removeClass('mdc-select--disabled')
    $('input[name=Nombres_Reportado]').removeClass('mdc-select--disabled')

    $('.mdc-select__selected-text').removeClass('mdc-select--outlined')
    $('#txtHeadModalMantenimiento').html("Nueva SALVA - Observación Preventiva");
   // $('.codigo-reportante').css('background-color','#fff');
    $('.reportante').css('background-color','#fff');
    //$('.codigo-reportado').css('background-color','#fff');
    $('.reportado').css('background-color','#fff');
    $('.fecha-operacion').css('background-color','#fff');
    $('.hora-operacion').css('background-color','#fff');
    $('.cbo-citricicdad').css('background-color','#fff');
    $('.cbo-sede').css('background-color','#fff');
    $('.cbo-embarcacion').css('background-color','#fff');
    $('.cbo-area').css('background-color','#fff');
    $('.cbo-zona').css('background-color','#fff');
    $('input[name=Tipo_Observacion]').attr('disabled',false);
    $('input[name=Nombres_Reportante]').attr('disabled',false);
    $('input[name=Nombres_Reportado]').attr('disabled',false);
    $('#btn-fin').attr('disabled','disabled');

    var navListItems = $('div.setup-panel div a button'); // tab nav items
    navListItems.removeClass('btn-primary-check').addClass('btn-default');
    $('#btn_step1').addClass('btn-primary-check');

       var allWells = $('.setup-content'); // content div
        step1 = $('#step-1');
    allWells.hide(); // hide all contents by defauld
    step1.show();

    $("#titleConfirm").html("Se finalizará la observación preventiva");
    $("#bodyCrear").removeClass("d-none");
    $("#bodyActualizar").addClass("d-none");
    $("#titleMessage").html("Se finalizó la observación preventiva con éxito");

    $('#Name_1').attr('readonly', false);
    $('#formAjax').trigger("reset");
    $('#tbody_skill').html('');
    $('#tbody_trainning').html('');
    $("#switch_estatus").prop("checked", true);
    $('.textarea_noActivo').hide();
    $('#modal-mantenimiento-observacion').modal('show');
    vw_principal.init();
    $('#Create_By').val(getCookie("vtas_id_hash"+sessionStorage.tabVisitasa))
    getPerson1($("#Nombres_Reportante"));
    getPerson2($("#Nombres_Reportado"));


    var fecha                = new Date() - 1;
    var fechaActual          = moment(fecha).format('DD/MM/YYYY');
    moment.locale('en');
    var horaActual           = moment().format('HH:mm');
    // let codigo_reportante = mdc.textField.MDCTextField.attachTo(document.querySelector('.codigo-reportante'));
    let reportante           = mdc.textField.MDCTextField.attachTo(document.querySelector('.reportante'));
    //let codigo_reportado   = mdc.textField.MDCTextField.attachTo(document.querySelector('.codigo-reportado'));
    let reportado            = mdc.textField.MDCTextField.attachTo(document.querySelector('.reportado'));
    let fecha_operacion      = mdc.textField.MDCTextField.attachTo(document.querySelector('.fecha-operacion'));
    let hora_operacion       = mdc.textField.MDCTextField.attachTo(document.querySelector('.hora-operacion'));
    let cbo_sede             = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-sede'));
    // let cbo_criticidad       = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-criticidad'));
    let cbo_embarcacion      = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-embarcacion'));
    let cbo_area             = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-area'));
    let cbo_zona             = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-zona'));

    // cbo_criticidad.selectedIndex = '';
    // cbo_criticidad.value = '0';
    cbo_sede.selectedIndex = '';
    cbo_sede.value = '0';
    cbo_embarcacion.selectedIndex = '';
    cbo_embarcacion.value = '0';
    cbo_area.selectedIndex = '';
    cbo_area.value = '0';
    cbo_zona.selectedIndex ='';
    cbo_zona.value = '0';

    //codigo_reportante.value = '';
    reportante.value = getCookie("vtas_fullname"+sessionStorage.tabVisitasa);
    //codigo_reportado.value = '';
    reportado.value = '';
    $('#ul-Area').html('');

    $('#Codigo_Reportante').val(getCookie("vtas_id_hash"+sessionStorage.tabVisitasa));
    $('#Nombres_Reportante').val(getCookie("vtas_fullname"+sessionStorage.tabVisitasa));
    $('#Codigo_Reportado').val('');
    $('#Nombres_Reportado').val('');

    // VALIDAR EL ROL PARA PERMITIR CAMBIAR EL REPORTANTE O NO...
    let rol = getStorage("vtas_rolexternalrol", "text");

    if(rol !== 'ROL_REPORTANTELIDER')
    {
        $("#Nombres_Reportante").addClass('mdc-select--disabled')
    }
    else
    {
        $("#Nombres_Reportante").removeClass('mdc-select--disabled')
    }

    fecha_operacion.value = fechaActual;
    hora_operacion.value = horaActual;

    $('.mdc-select__ripple').css('background-color','#fff');

}

function getPerson1(obj) {
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
            //https://550m44ud1tmg7454-inspection-dev.azurewebsites.net/api/Get-CollaboratorAndExternalUser-All?code=qoypM84MVLhQAwmvItCslfymV43cZX5XMhzXiBaU12eyMgI/KqaE0Q==

            $("#add_firtnameload_1").show();
            $.ajax({
                url: apiUrlssoma+"/api/Get-CollaboratorAndExternalUser-All?code="+CollaboratorAndExternalUser+"&httpmethod=objectlist",
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
                        array.push(json);
                    });
                    console.warn("array -> ",array)
                    response(array);
                }
            });
        },
        minLength: 3,
        select: function( event, ui )
        {

            $("#Codigo_Reportante").val(ui.item.id);
            $("#hid_Name_id_1").val(ui.item.id);


            setTimeout(function(){
                $("#Nombres_Reportante").val(toCapitalize(ui.item.firstname));
                $("#Codigo_Reportante").val(ui.item.id);

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


function getPerson2(obj) {
    obj.autocomplete({
        change: function (event, ui)
        {
            if (ui.item === null &&  $("#hid_Name_id_2").length>20)
            {

                /*  $("#hid_collaborator_id_"+i).val("");
                 $(this).val("");
                 $("#add_covid_lastname_"+i).val(""); */
            }
            else if(ui.item)
            {

                $("#Nombres_Reportado").val(toCapitalize(ui.item.firstname)).trigger("change");
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
            $("#add_firtnameload_2").show();
            $.ajax({
                //url: apiurlsecurity+"/api/Get-Collaborator?code="+GetCollaborator+"&httpmethod=objectlist",
                url: apiUrlssoma+"/api/Get-CollaboratorAndExternalUser-All?code="+CollaboratorAndExternalUser+"&httpmethod=objectlist",
                //dataType: "json",
                method:"post",
                data : JSON.stringify(param),
                processData:false,
                crossDomain: true,
                async: true,
                headers : headers,
                success: function( data )
                {
                    $("#add_firtnameload_2").hide();
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
                        array.push(json);
                    });

                    response(array);
                }
            });
        },
        minLength: 3,
        select: function( event, ui )
        {

            $("#hid_Name_id_2").val(ui.item.id);
            $("#Codigo_Reportado").val(ui.item.id);


            setTimeout(function(){
                $("#Nombres_Reportado").val(toCapitalize(ui.item.firstname));

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
function fnCerrarModalMantenimiento(){
    $('#modal-mantenimiento-observacion').modal('hide');
        $('#formAjax')[0].reset();
        $('#contenido-detalle_2').html('');
        $('#contenido-detalle_3').html('');

    // let register_type = mdc.select.MDCSelect.attachTo(document.querySelector('.register-type'));
    // let unidad_inspector = mdc.select.MDCSelect.attachTo(document.querySelector('.unidad-inspector'));
    // let sede_inspector = mdc.select.MDCSelect.attachTo(document.querySelector('.sede-inspector'));
    // let area_inspector = mdc.select.MDCSelect.attachTo(document.querySelector('.area-inspector'));
    // let dni_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.dni-inspector'));
    // let name_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.name-inspector'));
    // let lastname_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.lastname-inspector'));
    // let rol_inspector = mdc.select.MDCSelect.attachTo(document.querySelector('.rol-inspector'));
    // let search_name = mdc.textField.MDCTextField.attachTo(document.querySelector('.search-inspector'));
    // let hash_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.hash-inspector'));
    // let user_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.user-inspector'));
    // let pass_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.pass-inspector'));
    // register_type.value = ''
    // unidad_inspector.value = ''
    // sede_inspector.value = ''
    // area_inspector.value = ''
    // dni_inspector.value = ''
    // name_inspector.value = ''
    // lastname_inspector.value = ''
    // rol_inspector.value = ''
    // search_name.value = ''
    // hash_inspector.value = ''
    // user_inspector.value = ''
    // pass_inspector.value = ''
    // dni_inspector.value = ''
    // $('#listSede').html('');
    // $("#idhidden").val('');
}

// var cancelformAuditor=function()
// {
//     $('#formAjax')[0].reset();
//     $('#modalShowAuditor2').modal('hide');
//     $('#modalShowAuditor').modal('hide');
//     $('#sel_type_rol').val("");
//     $('#tx_name_auditor').val("");
//     $('#sel_EspecialidadId').val("");
//     $('#tbody_trainning').html('')
//     $('#tbody_skill').html('')
// }

function modalDeleteObservacionForm(Id, Codigo, Reportante){
    $('#ObservacionId').val(Id);
    $('#Codigo_Reportante_Selected').val(Reportante);

    $('#mensajeEliminar').html(`Está por eliminar esta observación preventiva ${Codigo}`);

    $('#modal-confirmacion-delete').addClass('modal_confirmacion__active')
}

function deleteObservacionForm(){
    let Id = $('#ObservacionId').val();
    let Codigo_Reportante = $('#Codigo_Reportante_Selected').val();

    let url = `${apiUrlssoma}/api/Post-Seguimiento-Observacion?code=N0SffbOHJ3Z25Fy7mbYaCPR4Hogo0QBhVw4eXMuMu5ILs/yDTff7BQ==&httpmethod=delete&Id=${Id}&Codigo_Reportante=${Codigo_Reportante}`

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
        $('#body-tabla-list').html('')
        fnCargarReportantes();
        fnCargarGrid();
        cerrarModal('modal-confirmacion-delete')
        // Falta validar el status = false
        $('#modal-confirmacion-delete-mensaje').addClass('modal_confirmacion__active')
    })
}

function initObservacion()
{


    //// VALIRAR EL ROL PARA OCULTAR O MOSTRAR LAS DIFERENTES OPCIONES
    ///ROL_REPORTANTE || ROL_REPORTANTELIDER
    let rol = getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)

    if (rol === 'ROL_REPORTANTE')
    {
        $(".HiddenReportante").addClass('d-none')
    }
    else
    {
        $(".HiddenReportante").removeClass('d-none')
    }


    let cbo_sede = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-sede'));
    // let cbo_criticidad = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-criticidad'));
    let cbo_embarcacion = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-embarcacion'));
    let cbo_area = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-area'));
    let cbo_zona = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-zona'));
    let fecha_operacion = mdc.textField.MDCTextField.attachTo(document.querySelector('.fecha-operacion'));
    let hora_operacion = mdc.textField.MDCTextField.attachTo(document.querySelector('.hora-operacion'));
   // let codigo_reportante = mdc.textField.MDCTextField.attachTo(document.querySelector('.codigo-reportante'));
    let reportante = mdc.textField.MDCTextField.attachTo(document.querySelector('.reportante'));
    //let codigo_reportado = mdc.textField.MDCTextField.attachTo(document.querySelector('.codigo-reportado'));
    let reportado = mdc.textField.MDCTextField.attachTo(document.querySelector('.reportado'));


    $('#ul-Sede').html('');
    $('#ul-Sede').append(`<li class="mdc-list-item mdc-list-item--selected" data-value="0" aria-selected="true" onclick="fnValidaSede( 0, 0, 0 )">
                            <span class="mdc-list-item__ripple"></span>
                            <span class="mdc-list-item__text">Seleccionar</span>
                        </li>`);

    $.ajax({
        method: "GET",
        url: `${apiUrlssoma}/api/Get-Sede?code=d0eEG9qHF01JbC9oaU0iajLG4DPLmVRDxO0E42JEuTsiwd7klp0tkw==&httpmethod=objectlist`,
        headers:{ "apikey":constantes.apiKey },
        crossDomain: true,
        dataType: "json",
    }).done(function (response) {
        response.forEach((Item) => {
            description = toCapitalize(Item.Description)
            $('#ul-Sede').append(`<li class="mdc-list-item" data-value="${Item.Id}" tabindex="-1" onclick="fnValidaSede(${Item.Id}, ${Item.UnidadNegocioId}, ${Item.id_location_sap})">
                                    <span class="mdc-list-item__ripple"></span>
                                    <span class="mdc-list-item__text">${description}</span>
                                </li>`);
        });
    });

    $('#ul-Embarcacion').html('');
    $('#ul-Embarcacion').append(`<li class="mdc-list-item mdc-list-item--selected" data-value="0" aria-selected="true" onclick="fnValidaEmbarcacion(0, 0, 0, 0)">
                                    <span class="mdc-list-item__ripple"></span>
                                    <span class="mdc-list-item__text">Seleccionar</span>
                                </li>`);
    $.ajax({
        method: "GET",
        url: `${apiUrlssoma}/api/Get-Embarcacion?code=aUy0KagXZ3EaaNkPH8kHoZgeibTvhykOFvVqMp9OSmRFnBtGGlmY4Q==&httpmethod=objectlist`,
        headers:{ "apikey":constantes.apiKey },
        crossDomain: true,
        dataType: "json",
    }).done(function (response) {
        response.forEach((Item) => {
            description = toCapitalize(Item.Description)
            $(`#ul-Embarcacion`).append(`<li class="mdc-list-item" data-value="${Item.Id}" tabindex="-1" onclick="fnValidaEmbarcacion(${Item.Id}, ${Item.UnidadNegocioId}, ${Item.UnidadNegocioSubId}, ${Item.id_location_sap})">
                                    <span class="mdc-list-item__ripple"></span>
                                    <span class="mdc-list-item__text">${description}</span>
                                </li>`);
        });
    });


    $.ajax({
        method: "GET",
        url: `${apiUrlssoma}/api/Get-Areas?code=SR3X7laZvxfBL52ZbTaMyNV3c/vp8ZFpJkX1FTjM0h0vawaRYkSfDQ==&httpmethod=objectlist`,
        headers:{ "apikey":constantes.apiKey },
        crossDomain: true,
        dataType: "json",
    }).done(function (response) {
        areas = response;
    });

    $.ajax({
        method: "GET",
        url: `${apiUrlssoma}/api/Get-Zona?code=fW82AFPfWk7rS/1VC88axaRv4OT2SznmF5y9DDQ8twA3gjLB5hRgZA==&httpmethod=objectlist`,
        headers:{ "apikey":constantes.apiKey },
        crossDomain: true,
        dataType: "json",
    }).done(function (response) {
        zonas = response;
    });

}


function fnValidaSede(sede, unidadNegocio, id_location_sap) {
    if (sede != 0)
    {
        let cbo_embarcacion = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-embarcacion'));
        cbo_embarcacion.value = '0'

        id_location_sap_selected = id_location_sap;
        // $('.cbo-area').css('background-color','#ffffff');
        // $('.cbo-area__ripple').css('background-color','#ffffff');
        $('.cbo-area').removeClass('mdc-select--disabled')

        //alert("bloquear select de embarcaciones")
        $('.cbo-embarcacion').addClass('mdc-select--disabled')
    }
    else{
        id_location_sap_selected = 0;

        //alert("desbloquear select de embarcaciones")
        $('.cbo-embarcacion').removeClass('mdc-select--disabled')
    }

    buscarAreas(sede, unidadNegocio, '0');
    buscarZonas(unidadNegocio, 0, '0');

}

function fnValidaEmbarcacion(embarcacion, unidadNegocio, unidadNegocioSub, id_location_sap) {
    if (embarcacion != 0)
    {
        let cbo_sede = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-sede'));
        cbo_sede.value = '0'

        let cbo_area = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-area'));
        cbo_area.value = '0'

        id_location_sap_selected = id_location_sap;
        // $('.cbo-area').css('background-color','#c3c3c3');
        // $('.cbo-area__ripple').css('background-color','#c3c3c3');
        $('.cbo-area').addClass('mdc-select--disabled')

        $('.cbo-sede').addClass('mdc-select--disabled')
    }
    else{
        id_location_sap_selected = 0;
        $('.cbo-sede').removeClass('mdc-select--disabled')
    }

    buscarZonas(unidadNegocio, unidadNegocioSub, '0');
}
// fin: 30/10/2020





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

function findChecklist()
{
    var type ="";
    var typeAnt ="";

    let url = apiUrlssoma+`/api/Get-Checklist?code=qqYOIX7GbuDzLSAfq6qK/TuO0E5JtCRsWamufCMiM92J5bjoGFPwqQ==&httpmethod=objectlist`
    let headers = {
        "apikey":constantes.apiKey,
        }


    $.ajax({
        method: "get",
        url: url,
        headers: headers,
        crossDomain: true,
        dataType: "json",
    }).done(function (response){

        Checklist_op = response.Checklist;
        Grupo_op = response.Grupo;
        Subgrupo_op = response.Subgrupo;

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

let CrearInspeccion_op;
CrearInspeccion_op = function CrearInspeccion_op(){
    handlerUrlhtml('contentGlobal','view/ssoma/configuracion-de-inspecciones/creacion-inspeccion.html','Creación de Inspección');
}

let activePregunta_op;
activePregunta_op = function activePregunta_op(idPregunta){
    $(`#${idPregunta}`).addClass('card-pregunta__active')
}

//############################### @andy ##############################################
let EditInspeccion_op;
EditInspeccion_op = function EditInspeccion_op(idV, titlex){
    IdInspeccionEdit_op = idV;
    TitleInspeccionEdit_op = titlex;
    handlerUrlhtml('contentGlobal','view/ssoma/configuracion-de-inspecciones/edit-inspeccion.html','Editar Inspección '+titlex);

}

function combo_box_1(readOnly) {

    var type="";
    var typeAnt="";
    var sel1= $('input:radio[name=Tipo_Observacion]:checked').val();
    var name_sg="";
    $('#contenido-detalle_2').html('');
    $('#contenido-detalle_3').html('');

        console.warn("Grupo_op -> ",Grupo_op)
        console.warn("Checklist_op -> ",Checklist_op)

        Grupo_op.map(function(group)
        {

            if(sel1==1)
            {
                if(group.Grupo_Padre==0 && group.Grupo_Tipo_Id==sel1)
                {
                    $('#contenido-detalle_2').append('<div class="card-body3 fontITCA">'+
                        '<div class="row p-0">'+
                        ' <div>'+
                                '<p class="Rol-en-Auditora Title-Ssoma"><span style="color:#34559c;" class="fontITCA">0'+group.Grupo_Id+'.</span> <span class="fontITCA">'+group.Grupo_Des+'</span> <span class="fontITCA obligatorio"> (*) </span> </p>'+
                            '</div>'+
                        '</div>'+
                        '</div>'+
                        '<div class="card-body2">'+
                        ' <div id="cont-detalle-body_'+group.Grupo_Id+'" class="row p-0 fontITCA">'+
                        '</div>'+
                        '</div>'
                    );

                    if(sel1==1)
                    {
                        $('#contenido-detalle_3').append('<div id="img_step2" class="card-body3">'+
                            '<div class="row p-0" style="justify-content: center; color: #a6a6a6">'+
                                '<img src="images/img_help.png" alt="">'+
                            '</div>'+
                            '<div class="row col-12" style="justify-content: center; color: #a6a6a6; margin-top: 15px;">'+
                                '<p class="fontITCA">Seleccione una de los compartamientos para</p>'+
                            '</div>'+
                            '<div class="row col-12" style="justify-content: center; color: #a6a6a6; margin-top: -15px;">'+
                                '<p class="fontITCA"> ver las siguientes preguntas</p>'+
                            '</div>'+
                        '</div>'
                        );


                        var funct = "onChange='selcomportamiento();'";
                    }
                    else
                    {
                        var funct = "";
                    }


                    Checklist_op.map(function(item)
                    {
                        if(item.Tipo_Observacion_Id==sel1)
                        {
                            if(item.Grupo_Id==group.Grupo_Id)
                            {

                                if(item.Opcion_Tipo_Des!="")
                                {
                                    var option = item.Opcion_Tipo_Des;
                                }
                                else
                                {
                                    var option = item.Grupo_Tipo_Des;
                                }

                                typeAnt=type;

                                switch (option) 
                                {
                                    case "Radiobutton":
                                        type= "radio";
                                        break;
                                    case "Checkbox":
                                        type= "checkbox";
                                        break;
                                    case "TextArea":
                                        type= "textarea";
                                        break;
                                    case "TextBox":
                                        type= "text";
                                        break;
                                }


                                if(item.Subgrupo_Id > 0)
                                {
                                    if(item.Subgrupo_Icono!=name_sg)
                                    {
                                        name_sg = item.Subgrupo_Icono;
                                        $('#cont-detalle-body_'+group.Grupo_Id).append(
                                            '<div style="width: 95%;margin-left: 7px;" class="row p-0">'+
                                            ' <div>'+
                                                    '<p class="Rol-en-Auditora Title-Ssoma"><img src="./images/img_'+name_sg+'_so.svg" class="menu-1-1 fontITCA>'+item.Subgrupo_Des+' <span class="fontITCA obligatorio"> (*) </span> </p>'+
                                                '</div>'+
                                            '</div>' );


                                    }

                                }


                                            if(type=="textarea"){
                                                $('#cont-detalle-body_'+group.Grupo_Id).append(
                                                    '<p style="width: 95%; justify-content: center;">'+

                                                        '<textarea class="form-control" rows="3" maxlength="500" onkeyup="onkeyup_Comentario(\'textareagrupo_'+item.Grupo_Id+'_'+item.Subgrupo_Id+'_'+item.Opcion_Id+'\')" name="textareagrupo_'+item.Grupo_Id+'_'+item.Subgrupo_Id+'_'+item.Opcion_Id+'" id="textareagrupo_'+item.Grupo_Id+'_'+item.Subgrupo_Id+'_'+item.Opcion_Id+'" style=" border: solid 1px #c8c8c8;" ></textarea>'+


                                                        '<small id="textareaCount" class="form-text text-muted" style="text-align: right"><span id="spanCantidad">0</span>/500</small>'+


                                                    ' </p>' );

                                                    if(readOnly)
                                                    {
                                                        $("#textareagrupo_"+item.Grupo_Id+'_'+item.Subgrupo_Id+'_'+item.Opcion_Id).attr('disabled','disabled');
                                                    }

                                            }else if(type=="text"){
                                                $('#cont-detalle-body_'+group.Grupo_Id).append(
                                                    '<p class="space_p">'+
                                                       ' <label class="custom-radio-checkbox">'+
                                                           ' <input class="custom-radio-checkbox__input" type="'+typeAnt+'" name="grupo_'+item.Grupo_Id+'_'+item.Subgrupo_Id+'" value="'+item.Opcion_Id+'" >'+
                                                            '<span class="custom-radio-checkbox__show custom-radio-checkbox__show--radio"></span>'+
                                                            '<span class="custom-radio-checkbox__text">'+item.Opcion_Des+'</span>'+
                                                            '<input type="text" maxlength="50" name="textgrupo_'+item.Grupo_Id+'_'+item.Subgrupo_Id+'_'+item.Opcion_Id+'" style="margin-left: 5px;border-radius: 1rem ;box-shadow: 0 0 0 1px grey;">'+
                                                        '</label>'+
                                                   ' </p>' );


                                                   if(readOnly)
                                                   {
                                                       $('input[name="grupo_'+item.Grupo_Id+'_'+item.Subgrupo_Id+'"]').attr('disabled','disabled');
                                                       $('input[name="textgrupo_'+item.Grupo_Id+'_'+item.Subgrupo_Id+'_'+item.Opcion_Id+'"]').attr('disabled','disabled');
                                                   }

                                            }else{
                                                $('#cont-detalle-body_'+group.Grupo_Id).append(
                                                    '<p class="space_p">'+
                                                       ' <label class="custom-radio-checkbox">'+
                                                           ' <input class="custom-radio-checkbox__input"  type="'+type+'" name="grupo_'+item.Grupo_Id+'_'+item.Subgrupo_Id+'" value="'+item.Opcion_Id+'" '+funct+'>'+
                                                            '<span class="custom-radio-checkbox__show custom-radio-checkbox__show--radio"></span>'+
                                                            '<span class="custom-radio-checkbox__text">'+item.Opcion_Des+'</span>'+
                                                        '</label>'+
                                                   ' </p>' );

                                                   if(readOnly)
                                                   {
                                                       $('input[name="grupo_'+item.Grupo_Id+'_'+item.Subgrupo_Id+'"]').attr('disabled','disabled');
                                                   }
                                            }




                            }
                        }
                        // console.warn(item)
                        // if(item.Opcion_Id===61)
                        // {
                        //      alert("aqui agregar criticidad")
                        //      $('#cont-detalle-body_'+group.Grupo_Id).append(selectCriticidad)

                        //      llenarSelectCriticidad()

                        // }
                    })
                }
            }
            else
            {

                if(group.Grupo_Padre==0 && group.Grupo_Tipo_Id==sel1)
                {
                    var divAdjunto  = '';
                    var divAdjuntoB = '';
                    if (group.Ind_Adjunto)
                    {
                        if (readOnly)
                        {
                            if (adjuntoBD != null)
                            {

                                divAdjunto = `<div class="col-md-3" style="text-align: right" class="row p-0">
                                                <a download="ARCHIVO.png" id="descargarArchivo" style="color: #d2d97b;" href="data:image/png;base64,${adjuntoBD.Adjunto}">
                                                    Descargar archivo
                                                <p id="arc_t"></p></a>
                                            </div>`;
                            }

                            // console.error("ArchivosBD -> ",ArchivosBD)
                            // console.error("ArchivosBD.length -> ",ArchivosBD.length)

                            if (ArchivosBD.length > 0)
                            {


                                for(i in ArchivosBD)
                                {
                                    // console.warn("ArchivosBD[i] -> " , ArchivosBD[i])

                                    divAdjuntoB += `
                                        <div class="col-12 px-0" style="text-align: left" class="row p-0">
                                            <div class="form-group">
                                                <label for="file_trainning2">Archivo ${(parseInt(i)+1)}</label>
                                                <a download="ARCHIVO${(parseInt(i)+1)}.png" class="ml-5 btn" id="archivo${(parseInt(i)+1)}" name="archivo${(parseInt(i)+1)}" style="background-color: #bed138;" href="data:image/png;base64,${ArchivosBD[i].Adjunto}">Descargar</a>
                                            </div>
                                        </div>
                                    `

                                }
                            }


                        }
                        else{
                            if (adjuntoBD != null)
                            {
                                if ($('#formObservacionId').val() == '')
                                {
                                    divAdjunto = `<div class="col-md-3" style="text-align: right" class="row p-0">

                                                    <input type="file" id="file_trainning" onChange="seleccionarArchivo()" style="display:none"/>
                                                    <a href="#" style="color: #d2d97b;" onClick="buscarArchivo();" id="btn_file_trainning" name="btn_file_trainning">
                                                        <img src="./images/iconos/attach_1.svg" >  Adjuntar archivo
                                                    <p id="arc_t"></p></a>
                                                </div>`;

                                    divAdjuntoB = `
                                        <div class="col-12 px-0 mt-3" style="text-align: left" class="row p-0">
                                            <!--input type="file" id="file_trainning1" onChange="seleccionarArchivoB(1)" style="display:none"/>
                                            <a href="#" onClick="buscarArchivoB(1);" id="btn_file_trainning1" name="btn_file_trainning1">
                                                Archivo 1
                                            <p id="arc_t1"></p></a-->
                                            <div class="form-group">
                                                <label for="file_trainning1">Archivo 1</label>
                                                <a class="ml-5 btn" id="archivo1" name="archivo1" style="background-color: #bed138;" onClick="buscarArchivoB(1);">Cargar</a>
                                                <input type="file" class="form-control-file" id="file_trainning1" onChange="seleccionarArchivoB(1)" style="display:none" >
                                            </div>
                                        </div>

                                        <div class="col-12 px-0" style="text-align: left" class="row p-0">
                                            <div class="form-group">
                                                <label for="file_trainning2">Archivo 2</label>
                                                <a class="ml-5 btn" id="archivo2" name="archivo2" style="background-color: #bed138;" onClick="buscarArchivoB(2);">Cargar</a>
                                                <input type="file" class="form-control-file" id="file_trainning2" onChange="seleccionarArchivoB(2)" style="display:none" >
                                            </div>
                                        </div>
                                    `;

                                }
                                else{
                                    divAdjunto = `<div class="col-md-3" style="text-align: right" class="row p-0">

                                                    <input type="file" id="file_trainning" onChange="seleccionarArchivo()" style="display:none"/>
                                                    <a href="#" style="color: #d2d97b;" onClick="buscarArchivo();" id="btn_file_trainning" name="btn_file_trainning">
                                                        <img src="./images/iconos/attach_1.svg" >  Adjuntar archivo
                                                    <p id="arc_t"></p></a>

                                                    <a download="ARCHIVO.png" id="descargarArchivo" style="color: #d2d97b;" href="data:image/png;base64,${adjuntoBD.Adjunto}">
                                                        Descargar archivo
                                                    <p id="arc_t"></p></a>
                                                </div>`;

                                    divAdjuntoB = `
                                        <div class="col-12 px-0 mt-3" style="text-align: left" class="row p-0">
                                            <!--input type="file" id="file_trainning1" onChange="seleccionarArchivoB(1)" style="display:none"/>
                                            <a href="#" onClick="buscarArchivoB(1);" id="btn_file_trainning1" name="btn_file_trainning1">
                                                Archivo 1
                                            <p id="arc_t1"></p></a-->
                                            <div class="form-group">
                                                <label for="file_trainning1">Archivo 1</label>
                                                <a class="ml-5 btn" id="archivo1" name="archivo1" style="background-color: #bed138;" onClick="buscarArchivoB(1);">Cargar</a>
                                                <input type="file" class="form-control-file" id="file_trainning1" onChange="seleccionarArchivoB(1)" style="display:none" >
                                            </div>
                                        </div>

                                        <div class="col-12 px-0" style="text-align: left" class="row p-0">
                                            <div class="form-group">
                                                <label for="file_trainning2">Archivo 2</label>
                                                <a class="ml-5 btn" id="archivo2" name="archivo2" style="background-color: #bed138;" onClick="buscarArchivoB(2);">Cargar</a>
                                                <input type="file" class="form-control-file" id="file_trainning2" onChange="seleccionarArchivoB(2)" style="display:none" >
                                            </div>
                                        </div>
                                    `;

                                }

                            }
                            else{
                                divAdjunto = `<div class="col-md-3" style="text-align: right" class="row p-0">

                                                <input type="file" id="file_trainning" onChange="seleccionarArchivo()" style="display:none"/>
                                                <a href="#" style="color: #d2d97b;" onClick="buscarArchivo();" id="btn_file_trainning" name="btn_file_trainning">
                                                    <img src="./images/iconos/attach_1.svg" >  Adjuntar archivo
                                                <p id="arc_t"></p></a>
                                            </div>`;
                            }
                        }
                    }


                    $('#contenido-detalle_2').append('<div class="card-body3">'+
                            '<div class="row p-0">'+
                                ' <div class="col-md-12">'+
                                    '<p class="Rol-en-Auditora Title-Ssoma"><span style="color:#34559c;">0'+group.Grupo_Id+'.</span> <span class="fontITCA">'+group.Grupo_Des+' </span> <span class="fontITCA obligatorio"> (*) </span> </p>'+
                                '</div>'+
                               // divAdjunto +
                            '</div>'+
                            '</div>'+
                            '<div class="card-body2">'+
                                ' <div id="cont-detalle-body_'+group.Grupo_Id+'" class="row p-0">'+
                                '</div>' +
                            ' </div>');

                            if(sel1==1){
                                $('#contenido-detalle_3').append('<div id="img_step2" class="card-body3">'+
                                '<div class="row p-0" style="justify-content: center; color: #a6a6a6">'+
                                     '<img src="images/img_help.png" alt="">'+
                             '</div>'+
                             '<div class="row col-12" style="justify-content: center; color: #a6a6a6; margin-top: 15px;">'+
                                     '<p class="fontITCA">Seleccione una de los compartamientos para</p>'+
                             '</div>'+
                             '<div class="row col-12" style="justify-content: center; color: #a6a6a6; margin-top: -15px;">'+
                             '<p class="fontITCA"> ver las siguientes preguntas</p>'+
                             '</div>'+
                             '</div>');


                                var funct = "onChange='selcomportamiento();'";
                            }else{
                                var funct = "";
                            }


                    Checklist_op.map(function(item)
                    {
                        if(item.Tipo_Observacion_Id==sel1)
                        {
                            if(item.Grupo_Id==group.Grupo_Id)
                            {
                                if(item.Opcion_Tipo_Des!="")
                                {
                                    var option = item.Opcion_Tipo_Des;
                                }
                                else
                                {
                                    var option = item.Grupo_Tipo_Des;
                                }

                                typeAnt=type;
                                switch (option)
                                {
                                    case "Radiobutton":
                                        type= "radio";
                                        break;
                                    case "Checkbox":
                                        type= "checkbox";
                                        break;
                                    case "TextArea":
                                        type= "textarea";
                                        break;
                                    case "TextBox":
                                        type= "text";
                                        break;
                                }


                                if(item.Subgrupo_Id > 0)
                                {
                                    if(item.Subgrupo_Icono!=name_sg)
                                    {
                                        name_sg = item.Subgrupo_Icono;
                                        $('#cont-detalle-body_'+group.Grupo_Id).append(
                                            '<div style="width: 95%;margin-left: 7px;" class="row p-0">'+
                                            ' <div>'+
                                                    '<p class="Rol-en-Auditora Title-Ssoma"><img src="./images/img_'+name_sg+'_so.svg" class="menu-1-1">'+item.Subgrupo_Des+' <span class="fontITCA obligatorio"> (*) </span></p>'+
                                                '</div>'+
                                            '</div>' );

                                    }

                                }


                                if(type=="textarea")
                                {
                                    $('#cont-detalle-body_'+group.Grupo_Id).append(
                                        '<p style="width: 95%; justify-content: center;">'+

                                           '<textarea class="form-control" rows="3" maxlength="500" onkeyup="onkeyup_Comentario(\'textareagrupo_'+item.Grupo_Id +'_'+item.Subgrupo_Id+'_'+item.Opcion_Id+'\')" name="textareagrupo_'+item.Grupo_Id +'_'+item.Subgrupo_Id+'_'+item.Opcion_Id+'" id="textareagrupo_'+item.Grupo_Id +'_'+item.Subgrupo_Id+'_'+item.Opcion_Id+'" style=" border: solid 1px #c8c8c8;" ></textarea>'+


                                           '<small id="textareaCount" class="form-text text-muted" style="text-align: right"><span id="spanCantidad">0</span>/500</small>'+
                                           ' </p>' );


                                       if(readOnly)
                                       {
                                           $('input[name="textareagrupo_'+item.Grupo_Id +'_'+item.Subgrupo_Id+'_'+item.Opcion_Id+'"]').attr('disabled','disabled');
                                       }

                                }
                                else if(type=="text")
                                {
                                    $('#cont-detalle-body_'+group.Grupo_Id).append(
                                        '<p class="space_p">'+
                                           ' <label class="custom-radio-checkbox">'+
                                               ' <input class="custom-radio-checkbox__input"  type="'+typeAnt+'" name="grupo_'+item.Grupo_Id +'_'+item.Subgrupo_Id+'" value="'+item.Opcion_Id+'" >'+
                                                '<span class="custom-radio-checkbox__show custom-radio-checkbox__show--radio"></span>'+
                                                '<span class="custom-radio-checkbox__text">'+item.Opcion_Des+'</span>'+
                                                '<input type="text" maxlength="50" name="textgrupo_'+item.Grupo_Id +'_'+item.Subgrupo_Id+'_'+item.Opcion_Id+'" style="margin-left: 5px;border-radius: 1rem ;box-shadow: 0 0 0 1px grey;">'+
                                            '</label>'+
                                       ' </p>' );


                                    if(readOnly)
                                    {
                                        $('input[name="grupo_'+item.Grupo_Id +'_'+item.Subgrupo_Id+'"]').attr('disabled','disabled');
                                        $('input[name="textgrupo_'+item.Grupo_Id +'_'+item.Subgrupo_Id+'_'+item.Opcion_Id+'"]').attr('disabled','disabled');
                                    }

                                }
                                else
                                {
                                    $('#cont-detalle-body_'+group.Grupo_Id).append(
                                    '<p class="space_p">'+
                                        ' <label class="custom-radio-checkbox">'+
                                            ' <input class="custom-radio-checkbox__input"  type="'+type+'" name="grupo_'+item.Grupo_Id +'_'+item.Subgrupo_Id+'" value="'+item.Opcion_Id+'" '+funct+'>'+
                                            '<span class="custom-radio-checkbox__show custom-radio-checkbox__show--radio"></span>'+
                                            '<span class="custom-radio-checkbox__text">'+item.Opcion_Des+'</span>'+
                                        '</label>'+
                                    ' </p>' );

                                    if(readOnly)
                                    {
                                        $('input[name="grupo_'+item.Grupo_Id +'_'+item.Subgrupo_Id+'"]').attr('disabled','disabled');
                                    }
                                }

                                if(item.Opcion_Id===55)
                                {
                                    $('#cont-detalle-body_'+group.Grupo_Id).append(`
                                        ${divAdjuntoB}
                                    `)
                                }

                                if(item.Opcion_Id===62)
                                {
                                    // alert("aqui agregar criticidad")
                                    $('#cont-detalle-body_'+group.Grupo_Id).append(selectCriticidad)

                                    llenarSelectCriticidad()

                                }

                            }
                        }
                    })
                }
            }

        })



    }
    //<span class="obligatorio"> (*) </span>
    var selectCriticidad = `
        <div class="col-12 px-2">
            <p class="Rol-en-Auditora Title-Ssoma">Criticidad</p>
        </div>
        <div class="col-4 px-2 mb-4">
           <! CRITICIDAD START>
           <div class="mdc-select mdc-select--filled demo-width-class cbo-criticidad w-100 text-left">
                <div class="mdc-select__anchor">
                    <span class="mdc-select__ripple mdc-select__ripple_Criticidad"></span>
                    <span class="mdc-select__selected-text"></span>
                    <span class="mdc-select__dropdown-icon">
                      <svg
                              class="mdc-select__dropdown-icon-graphic"
                              viewBox="7 10 10 5">
                        <polygon
                                class="mdc-select__dropdown-icon-inactive"
                                stroke="none"
                                fill-rule="evenodd"
                                points="7 10 12 15 17 10">
                        </polygon>
                        <polygon
                                class="mdc-select__dropdown-icon-active"
                                stroke="none"
                                fill-rule="evenodd"
                                points="7 15 12 10 17 15">
                        </polygon>
                      </svg>
                    </span>
                    <span class="mdc-floating-label lbFormsoma mdc-floating-label--float-above">Criticidad</span>
                    <span class="mdc-line-ripple"></span>
                </div>

                <div class="mdc-select__menu demo-width-class mdc-menu mdc-menu-surface w-100">
                    <ul class="mdc-list" id="ul-Criticidad">

                    </ul>
                </div>
            </div>
           <! CRITICIDAD END>
        </div>
    `

    var llenarSelectCriticidad = function()
    {
        $('#ul-Criticidad').html('');
        $('#ul-Criticidad').append(`<li class="mdc-list-item mdc-list-item--selected" data-value="0" aria-selected="true">
                                <span class="mdc-list-item__ripple"></span>
                                <span class="mdc-list-item__text">Seleccionar</span>
                            </li>`);

        Criticidad.forEach((Item) => {
            description = toCapitalize(Item.Description)
            $('#ul-Criticidad').append(`<li class="mdc-list-item" data-value="${Item.Id}" tabindex="-1" >
                                    <span class="mdc-list-item__ripple"></span>
                                    <span class="mdc-list-item__text">${description}</span>
                                </li>`);
        });

        let cbo_criticidad           = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-criticidad'));
        cbo_criticidad.selectedIndex = '';
        cbo_criticidad.value         = '0';

    }


    onkeyup_Comentario = function (id) {
        if ($('#' + id).val() === undefined)
            return false;
        var cantidad = $('#' + id).val().length;
        document.getElementById('spanCantidad').innerHTML = cantidad;

        // if (cantidad <= 500)
        // {
        //     document.getElementById('spanCantidad').innerHTML = cantidad;
        // }
        // else
        // {
        //     var texto = $('#' + id).val();
        //     $('#' + id).val(texto.substring(0, 500));
        // }
    }

   function selcomportamiento()
    {
        var name_sg="";
        var type="";
        var typeAnt="";
        var sel1= $('input:radio[name=grupo_1_0]:checked').val();
        $('#contenido-detalle_3').html('');


        Grupo_op.map(function(group)
        {
            if(group.Grupo_Padre_Opcion==sel1){

                $('#contenido-detalle_3').append(
                '<div class="card-body3">'+
                    '<div class="row p-0">'+
                        ' <div>'+
                            '<p class="Rol-en-Auditora Title-Ssoma"><span class="fontITCA" style="color:#34559c;">0' + group.Grupo_Id + 
                            '</span> ' +group.Grupo_Des+' <span class="fontITCA obligatorio"> (*) </span> </p>' +
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="card-body2">'+
                    '<div id="cont-detalle-body_'+group.Grupo_Id+'" class="row p-0">'+
                    '</div>'+
                '</div>');

                Checklist_op.map(function(item)
                {
                    if(item.Grupo_Padre_Opcion==sel1)
                    {
                        if(item.Grupo_Id==group.Grupo_Id)
                        {

                            if(item.Opcion_Tipo_Des!=""){
                                var option = item.Opcion_Tipo_Des;
                            }else{
                                var option = item.Grupo_Tipo_Des;
                            }
                            typeAnt=type;
                            switch (option) {
                                            case "Radiobutton":
                                                type= "radio";
                                                break;
                                            case "Checkbox":
                                                type= "checkbox";
                                                break;
                                            case "TextArea":
                                                type= "textarea";
                                                break;
                                            case "TextBox":
                                                type= "text";
                                                break;

                                        }


                                        if(item.Subgrupo_Id > 0){
                                            if(item.Subgrupo_Icono!=name_sg){
                                                name_sg = item.Subgrupo_Icono;
                                                let clases = ''
                                                clases = (item.Subgrupo_Icono=='edit') ? 'Rol-en-Auditora Title-Ssoma' : ''
                                                $('#cont-detalle-body_'+group.Grupo_Id).append(
                                                    '<div style="width: 95%;margin-left: 7px;" class="row p-0">'+
                                                    ' <div>'+
                                                            '<p class="'+clases+'"><img src="./images/img_'+name_sg+'_so.svg" class="menu-1-1 ">'+item.Subgrupo_Des+' <span class="fontITCA obligatorio"> (*) </span> </p>'+
                                                            
                                                        '</div>'+
                                                    '</div>' );


                                            }

                                        }


                                        if(type=="textarea")
                                        {
                                            $('#cont-detalle-body_'+group.Grupo_Id).append(
                                                '<p style="width: 95%; justify-content: center;">'+

                                                   '<textarea class="form-control" rows="3" maxlength="500" onkeyup="onkeyup_Comentario(\'textareagrupo_'+item.Grupo_Id +'_'+item.Subgrupo_Id+'_'+item.Opcion_Id+'\')" name="textareagrupo_'+item.Grupo_Id +'_'+item.Subgrupo_Id+'_'+item.Opcion_Id+'" id="textareagrupo_'+item.Grupo_Id +'_'+item.Subgrupo_Id+'_'+item.Opcion_Id+'" style=" border: solid 1px #c8c8c8;" ></textarea>'+


                                                   '<small id="textareaCount" class="form-text text-muted" style="text-align: right"><span id="spanCantidad">0</span>/500</small>'+


                                                   ' </p>'
                                            );
                                            //console.warn(item)
                                            if( item.Opcion_Id===60 || item.Opcion_Id===61)
                                            {
                                                  //alert("aqui agregar criticidad")
                                                  $('#cont-detalle-body_'+group.Grupo_Id).append(selectCriticidad)

                                                  llenarSelectCriticidad()

                                            }

                                        }else if(type=="text"){
                                            $('#cont-detalle-body_'+group.Grupo_Id).append(
                                                '<p class="space_p">'+
                                                   ' <label class="custom-radio-checkbox">'+
                                                       ' <input class="custom-radio-checkbox__input"  type="'+typeAnt+'" name="grupo_'+item.Grupo_Id +'_'+item.Subgrupo_Id+'" value="'+item.Opcion_Id+'" >'+
                                                        '<span class="custom-radio-checkbox__show custom-radio-checkbox__show--radio"></span>'+
                                                        '<span class="custom-radio-checkbox__text">'+item.Opcion_Des+'</span>'+
                                                        '<input type="text" maxlength="50" name="textgrupo_'+item.Grupo_Id +'_'+item.Subgrupo_Id+'_'+item.Opcion_Id+'" style="margin-left: 5px;border-radius: 1rem ;box-shadow: 0 0 0 1px grey;">'+
                                                    '</label>'+
                                               ' </p>' );
                                        }else{
                                            $('#cont-detalle-body_'+group.Grupo_Id).append(
                                                '<p class="space_p">'+
                                                   ' <label class="custom-radio-checkbox">'+
                                                       ' <input class="custom-radio-checkbox__input"  type="'+type+'" name="grupo_'+item.Grupo_Id +'_'+item.Subgrupo_Id+'" value="'+item.Opcion_Id+'" >'+
                                                        '<span class="custom-radio-checkbox__show custom-radio-checkbox__show--radio"></span>'+
                                                        '<span class="custom-radio-checkbox__text">'+item.Opcion_Des+'</span>'+
                                                    '</label>'+
                                               ' </p>' );

                                        }




                        }
                    }
                })
            }
        })

    }

function guardarObservacion()
{
    //let criticidad = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-criticidad'));
    let embarcacion = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-embarcacion'));
    let sede = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-sede'));
    let zona = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-zona'));
    let area = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-area'));
    let tipoObservacion = $('input:radio[name=Tipo_Observacion]:checked').val();
    let codigoReportante = $('#Codigo_Reportante').val();
    let codigoReportado = $('#Codigo_Reportado').val();
    let nombresReportado = $('#Nombres_Reportado').val();

    if (tipoObservacion === undefined)
    {
        swal("Error","No seleccionó tipo de observación","error")
        return false;
    }

    /*if ( criticidad.value.toString() === '0' )
    {
        swal("Error","No seleccionó tipo de criticidad","error")
        return false;
    }//*/

    if (sede.value.toString() === '0' && embarcacion.value.toString() === '0')
    {
        swal("Error","Debe seleccionar sede o embarcación","error")
        return false;
    }


    if (sede.value.toString() !== '0')
    {
        if (area.value.toString() === '0')
        {
            swal("Error","Debe seleccionar área","error")
            return false;
        }
        if (zona.value.toString() === '0')
        {
            swal("Error","Debe seleccionar zona","error")
            return false;
        }
    }
    if (embarcacion.value.toString() !== '0')
    {
        if (zona.value.toString() === '0')
        {
            swal("Error","Debe seleccionar zona","error")
            return false;
        }
    }
    if (codigoReportante === '')
    {
        let nombresReportante = $('#Nombres_Reportante').val();

        if (nombresReportante === '')
        {
            swal("Error","Debe seleccionar reportante","error")
        }
        else
        {
            swal("Error","Debe seleccionar un reportante del listado","error")
        }

        return false;
    }
    if (nombresReportado !== '')
    {
        if (codigoReportado === '')
        {
            swal("Error","Debe seleccionar un reportado del listado","error")
            return false;
        }
    }//*/


    let result = false

    result = fnValidarCheckListOP()

    console.warn("result ->",result)

    if(result)
    {
        $("#modal-mantenimiento-observacion").removeClass("fade").modal("hide");
        $("#modalShowAlertConfirm").modal("show").addClass("fade");
        accion = "guardar";
    }

}

/**
 * [fnValidarCheckListOP validar que las opciones del checklist esten todas con valores]
 * @return {[type]} [description]
 */
var fnValidarCheckListOP = function () {
    // body...
    let result = true

    let tipoObservacion = $('input:radio[name=Tipo_Observacion]:checked').val();
    var sel1= $('input:radio[name=grupo_1_0]:checked').val();
    //console.warn("tipoObservacion -> ",tipoObservacion)
    //console.warn("sel1 -> ",sel1)

    var formdata    = $('#formAjax').serializeArray();
    var data        = {};
    var CheckList   = []

    //console.warn("formdata -> ",formdata)


    $(formdata).each(function(index, obj){
        var check =obj.name.split('_');

            switch (check[0]) {
                case 'textareagrupo':
                    if(obj.value!="")
                    {
                        CheckList.push({
                            "Grupo": check[1],
                            "Subgrupo": check[2],
                            "Opcion": check[3],
                            "Respuesta": obj.value
                        })
                    }
                    break;
                case 'textgrupo':
                    if(obj.value!=""){
                        CheckList.push({
                        "Grupo": check[1],
                        "Subgrupo": check[2],
                        "Opcion": check[3],
                        "Respuesta": obj.value
                    })
                    }

                    break;
                case 'grupo':
                    CheckList.push({
                        "Grupo": check[1],
                        "Subgrupo": check[2],
                        "Opcion": obj.value,
                        "Respuesta": ""
                    })
                    break;
                default:
                    // if(id==""){
                    // data[obj.name] = obj.value;
                    // }
                    //result = false
                    console.warn("default")
                break;
            }
    });

    //console.warn("CheckList -> ",CheckList)//*/

    // contadores para items
    let item2       = 0
    let item31      = 0
    let item32      = 0
    let item4       = 0
    let item5       = 0
    let item6       = 0

    // valor para otros en ¿A que se debe éste comportamiento inseguro?
    let resp2       = ""
    let opc2        = 0

    // valor para otros en Equipo de protección personal observado -> ¿Cuál EPP?
    let resp3       = ""
    let opc3        = 0
    // valor para Descripción de la observación en 03. Equipo de protección personal observado
    let descripcion = ""

    // valor para otros en 04. Procedimiento que se incumple
    let resp4       = ""
    let opc4        = 0
    // valor para Descripción de la observación en 04. Procedimiento que se incumple
    let descripcion4 = ""

    // valor para otros en 04. Procedimiento que se incumple
    let resp5       = ""
    let opc5        = 0
    // valor para Descripción de la observación en 04. Procedimiento que se incumple
    let descripcion5 = ""

    // valor para otros en 06. Acciones correctivas a implementar
    let resp6       = ""
    let opc6        = 0

    console.warn("CheckList -> ",CheckList)
    CheckList.forEach(function(Item)
    {
        //console.warn("Item->",Item)
        if(Item.Grupo==2)
        {
            item2++
            if(Item.Opcion==14)
            {
                opc2  = 14
                resp2 = Item.Respuesta
            }
        }
        if(Item.Grupo==3)
        {
            //console.warn("Item -> ",Item)
            if( parseInt(Item.Subgrupo) === 1 )
                item31++
            else if( parseInt(Item.Subgrupo) === 2 )
                item32++


            if(Item.Opcion == 60)
            {
                descripcion = Item.Respuesta
            }
            if(Item.Opcion == 30)
            {
                opc3  = 30
                resp3 = Item.Respuesta
            }

        }
        if(Item.Grupo==4)
        {
            item4++
            if(Item.Opcion == 61)
            {
                descripcion4 = Item.Respuesta
            }
            if(Item.Opcion == 40)
            {
                opc4  = 40
                resp4 = Item.Respuesta
            }

        }
        if(Item.Grupo==5)
        {
            item5++
            if(Item.Opcion == 62)
            {
                descripcion5 = Item.Respuesta
            }
            if(Item.Opcion == 55)
            {
                opc5  = 55
                resp5 = Item.Respuesta
            }

        }
        if(Item.Grupo==6)
        {
            item6++
            if(Item.Opcion == 59)
            {
                opc6  = 59
                resp6 = Item.Respuesta
            }
        }

    })

    // validar que se seleccione el tipo de observacion
    if(tipoObservacion==1)
    {
        //console.warn("validar tipo Observacion 1")
        //validar tipo de comportamiento
        if(sel1==1||sel1==2)
        {
            //console.warn("sel1 -> ",sel1)


            //console.warn("item2 ",item2,"item3 ",item3,"item6 ",item6)
            if(item2==0)
            {
                swal("Error","Faltan datos en: 02. ¿A que se debe éste comportamiento inseguro?","error")
                return false
            }
            if(resp2==""&&opc2==14)
            {
                swal("Error","Debe especificar otros en: 02. ¿A que se debe éste comportamiento inseguro?","error")
                return false
            }

            if(sel1==1)
            {
                // if(item3<2)
                // {
                //     swal("Error","Faltan datos en: 03. Equipo de protección personal observado","error")
                //     return false
                // }
                console.warn("item31 -> ",item31,", item32 -> ",item32)
                if(item31 === 0)
                {
                    swal("Error","Faltan datos en: 03. Equipo de protección personal observado - Respecto al observado","error")
                    return false
                }
                if(item32 === 0)
                {
                    swal("Error","Faltan datos en: 03. Equipo de protección personal observado - ¿Cuál EPP?","error")
                    return false
                }
                if(resp3==""&&opc3==30)
                {
                    swal("Error","Debe especificar Otros en: 03. ¿Cuál EPP?","error")
                    return false
                }
                if(descripcion=="")
                {
                    swal("Error","Faltan datos en: 03. Debe ingresar la descripción de la observación","error")
                    return false
                }
            }

            if(sel1==2)
            {
                if(item4==0)
                {
                    swal("Error","Faltan datos en: 04. Procedimiento que se incumple","error")
                    return false
                }
                if(resp4==""&&opc4==40)
                {
                    swal("Error","Debe especificar Otros en: 04. Procedimiento que se incumple","error")
                    return false
                }
                if(descripcion4=="")
                {
                    swal("Error","Faltan datos en: 04. Debe ingresar la descripción de la observación","error")
                    return false
                }
            }

            if(item6==0)
            {
                swal("Error","Faltan datos en: 06. Acciones correctivas a implementar","error")
                return false
            }
            if(resp6==""&&opc6==59)
            {
                swal("Error","Debe especificar Otros en: 06. Acciones correctivas a implementar","error")
                return false
            }

        }
        else
        {
            //console.warn("no ha seleccionado sel1")
            swal("Error","Faltan Datos en: 01. Comportamiento inseguro observado","error")
            result = false
        }
    }
    else if (tipoObservacion==2)
    {
        //console.warn("validar tipo Observacion 2")
        if(item5==0)
        {
            swal("Error","Faltan datos en: 05. ¿El ambiente de trabajo está en buenas condiciones? ¿Qué observó?","error")
            return false
        }
        if(resp5==""&&opc5==55)
        {
            swal("Error","Debe especificar Otros en: 05. ¿El ambiente de trabajo está en buenas condiciones? ¿Qué observó?","error")
            return false
        }
        if(descripcion5=="")
        {
            swal("Error","Faltan datos en: 05. Debe ingresar la descripción de la observación","error")
            return false
        }

        if(item6==0)
        {
            swal("Error","Faltan datos en: 06. Acciones correctivas a implementar","error")
            return false
        }
        if(resp6==""&&opc6==59)
        {
            swal("Error","Debe especificar Otros en: 06. Acciones correctivas a implementar","error")
            return false
        }

    }
    else
    {
        //console.warn("no ha seleccionado tipo Observacion")
        result = false
    }

    return result;
}

function cancelObservacionConfirm()
{
    $("#modalShowAlertConfirm").removeClass("fade").modal("hide");
    $("#modal-mantenimiento-observacion").modal("show").addClass("fade");
    $('#modalShowAlertConfirm').modal('hide');
    //  $('.codigo-reportante').css('background-color','#fff');
    $('.reportante').css('background-color','#fff');
    // $('.codigo-reportado').css('background-color','#fff');
    $('.reportado').css('background-color','#fff');
    $('.fecha-operacion').css('background-color','#fff');
    $('.hora-operacion').css('background-color','#fff');
    $('.cbo-sede').css('background-color','#fff');
    $('.cbo-embarcacion').css('background-color','#fff');
    $('.cbo-area').css('background-color','#fff');
    $('.cbo-zona').css('background-color','#fff');

}

function aceptarConfirm(){
    $('#btnValida').prop("disabled", true);
    if (accion == "guardar")
        enviarObservacion();
    else
        finalizarObservacion();
}


function enviarObservacion(){
    $('#codeObservacion').html('');
    $("#preloader").show();
    var formdata = $('#formAjax').serializeArray();
    var data = {};
    var CheckList = []

    $(formdata).each(function(index, obj){
        var check =obj.name.split('_');

            switch (check[0]) {
                case 'textareagrupo':
                    if(obj.value!="")
                    {
                        CheckList.push({
                            "Grupo": check[1],
                            "Subgrupo": check[2],
                            "Opcion": check[3],
                            "Respuesta": obj.value
                        })
                    }
                    break;
                case 'textgrupo':
                    if(obj.value!=""){
                        CheckList.push({
                        "Grupo": check[1],
                        "Subgrupo": check[2],
                        "Opcion": check[3],
                        "Respuesta": obj.value
                    })
                    }

                    break;
                case 'grupo':
                    CheckList.push({
                        "Grupo": check[1],
                        "Subgrupo": check[2],
                        "Opcion": obj.value,
                        "Respuesta": ""
                    })
                    break;
                default:
                    if(id==""){
                    data[obj.name] = obj.value;
                    }
                break;
            }
    });


    var id = $('#formObservacionId').val();
    var code  = $('#formCodigo').val();
    data['CheckList']=CheckList;




    if(id!="")
    {

        let hora_operacion = mdc.textField.MDCTextField.attachTo(document.querySelector('.hora-operacion'));
        let fecha_operacion = mdc.textField.MDCTextField.attachTo(document.querySelector('.fecha-operacion'));
        //let fechaOperacion = moment(fecha_operacion).format('YYYY-MM-DD')
        let fechaOperacion = $("#txt_fecha_operacion").val()
        //let FO = moment(fechaOperacion).format('YYYY-MM-DD')
        let FO = date1_DD_MM_AAAA_to_AAAA_MM_DD_T_HH_MM_S(fechaOperacion)

        var url = apiUrlssoma+"/api/Post-Seguimiento-Observacion?code=N0SffbOHJ3Z25Fy7mbYaCPR4Hogo0QBhVw4eXMuMu5ILs/yDTff7BQ==&httpmethod=put&Id="+id;

        data['Updated_By']=getCookie("vtas_id_hash" + sessionStorage.tabVisitasa);
        data['Adjunto'] = base64_trainning;
        data['Id']=parseInt(id);
        data['Hora_Operacion'] = hora_operacion.value;
        //data['Fecha_Operacion'] = fecha_operacion.value;
        data['Fecha_Operacion'] = FO;
        let embarcacion = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-embarcacion'));
        data['Embarcacion'] = parseInt(embarcacion.value);
        let criticidad = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-criticidad'));
        data['Criticidad'] = parseInt(criticidad.value);
        let sede = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-sede'));
        data['Sede'] = parseInt(sede.value);
        let zona = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-zona'));
        data['Zona'] = parseInt(zona.value);
        let area = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-area'));
        data['Area'] = (area.value == '' ? "0" : area.value);
        data['Area'] = parseInt(data['Area']);
        data['Nombres_Reportante'] = $('#Nombres_Reportante').val();
        data['Codigo_Reportante']  = $('#Codigo_Reportante').val();
        data['Nombres_Reportado']  = $('#Nombres_Reportado').val();
        data['Codigo_Reportado']   = $('#Codigo_Reportado').val();
        data['Tipo_Observacion']   = parseInt($('input:radio[name=Tipo_Observacion]:checked').val());
        data['Estado']=1;

        let adjuntos     = []
        adjuntos[0]      = base64_trainning;
        adjuntos[1]      = base64_trainning2;
        data['Archivos'] = adjuntos;

    }else{
            data['Estado']=1;
        data['Created_By']=getCookie("vtas_id_hash" + sessionStorage.tabVisitasa);
        let embarcacion = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-embarcacion'));
        data['Embarcacion'] = embarcacion.value;
        let criticidad = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-criticidad'));
        data['Criticidad'] = criticidad.value;
        let sede = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-sede'));
        data['Sede'] = sede.value;
        let zona = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-zona'));
        data['Zona'] = zona.value;
        let area = mdc.select.MDCSelect.attachTo(document.querySelector('.cbo-area'));
        data['Area'] = (area.value == '' ? "0" : area.value);


        let hora_operacion = mdc.textField.MDCTextField.attachTo(document.querySelector('.hora-operacion'));
        let fecha_operacion = mdc.textField.MDCTextField.attachTo(document.querySelector('.fecha-operacion'));
        //let fechaOperacion = moment(fecha_operacion).format('YYYY-MM-DD')
        let fechaOperacion = $("#txt_fecha_operacion").val()
        //let FO = moment(fechaOperacion).format('YYYY-MM-DD')
        let FO = date1_DD_MM_AAAA_to_AAAA_MM_DD_T_HH_MM_S(fechaOperacion)

        var url = apiUrlssoma+"/api/Post-Seguimiento-Observacion?code=N0SffbOHJ3Z25Fy7mbYaCPR4Hogo0QBhVw4eXMuMu5ILs/yDTff7BQ==&httpmethod=postPrueba";
        data['Nombres_Reportante'] = $('#Nombres_Reportante').val();
        data['Codigo_Reportante'] = $('#Codigo_Reportante').val();
        data['Nombres_Reportado'] = $('#Nombres_Reportado').val();
        data['Codigo_Reportado'] = $('#Codigo_Reportado').val();
        data['Hora_Operacion'] = hora_operacion.value;
        //data['Fecha_Operacion'] = fecha_operacion.value;
        data['Fecha_Operacion'] = FO;
        data['Tipo_Observacion'] = $('input:radio[name=Tipo_Observacion]:checked').val();
        data['Adjunto']  = base64_trainning;
        let adjuntos     = []
        adjuntos[0]      = base64_trainning;
        adjuntos[1]      = base64_trainning2;
        data['Archivos'] = adjuntos;
    }
    console.warn("data -> ",data)

    // console.info("data 22",data,id,url)
    var prevData = data;
    // console.warn("prevData",prevData)
    var headers ={
        "apikey":constantes.apiKey
    }

    // INICIO - OBTENER CORREOS RESPONSABLES SSOMA
    var correos = '';
    headers = {"Authorization":TOKEN_CLIENT,"apiKey": constantes.apiKey}
    $.ajax({
        method: "GET",
        url: "https://0p3r4ti0n5ecur3-prd-checklist.azurewebsites.net/api/Get-Person-All?code=u6Jkjyje0akIMOzWsQr4SakcmmvMK8lrKewweb324hkLGOwvkSNn1A==&httpmethod=usergrouplist&user_group_id=61,62",
        headers:headers,
        crossDomain: true,
        dataType: "json",
    })
    .done(function(_response)
    {
       // console.log('Paso Nro 1');
       // console.log(_response);


        let i       = 0
        if (_response.length != 0)
        {
            _response.forEach(item =>
            {
                if(i==0)
                    correos = item.attribute3
                else
                    correos += item.attribute3 + ', '

                i++
            });
        }
       // console.log('Paso Nro 2');
       // console.warn("correos responsables SSOMA ",correos);
    })
    .always(function( jqXHR, textStatus, errorThrown )
    {
        console.warn( jqXHR, textStatus, errorThrown )
        console.warn( data )
        console.warn( "url -> ", url )


       // console.warn("always correos",correos)
        correos = "millanqjesus@gmail.com"
        // INICIO ENVIAR A GUARDAR
        data["Correos"] = correos
        data["Pdf"]     = ""
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
            // ocultamos Modal
            $('#modalShowAlertConfirm').modal('hide');
            if(data.Id){
                $('#codeObservacion').append('<h2><b>'+data.Codigo+'</b></h2>')
            }else{
                $('#codeObservacion').append('<h2><b>'+code+'</b></h2>')
            }

            $("#modalShowAlertOk").modal("show");
            $("#preloader").fadeOut();
           // console.table(data)
            $('#btnValida').prop("disabled", false);

            if(data.Id>0 || data.status== true)
            {
                if(data.Id != undefined){ id = data.Id }
            }
            // habilitamos el boton de confirmar
            $('#btnValida').prop("disabled", false);

            // INICIO CONSULTAR OP
            url =apiUrlssoma+"/api/Get-Seguimiento-Observacion?code=/bZQ2JICH4yRjEcKhyhZDqIiRhYabDPTMb4wRcZxem5ojqEl8SxGaw==&httpmethod=object&Id="+id;
           // console.warn("URLSSOMA get ",url)
            $.ajax({
                method: "GET",
                url:  url,
                headers:headers,
                crossDomain: true,
                dataType: "json",
            })
            .done(function( response)
            {
                observacionSelected = response;

                // console.warn("response",response)
                //cuando es modificacion
                if(id!="")
                {
                    //alert("Modificar")
                    prevData.Codigo           = response.DatosPrincipales.Codigo
                    prevData.Tipo_Observacion = response.DatosPrincipales.Tipo_Observacion_Id
                    prevData.Sede             = response.DatosPrincipales.Sede_Id
                    prevData.Embarcacion      = response.DatosPrincipales.Embarcacion_Id
                    prevData.Area             = response.DatosPrincipales.Area_Id
                    prevData.Zona             = response.DatosPrincipales.Zona_Id
                    prevData.Id               = response.DatosPrincipales.Id;
                    prevData.Updated_By       = getCookie("vtas_id_hash" + sessionStorage.tabVisitasa);
                }
                else // cuando es nuevo
                {
                    //alert("Insertar")

                }
                // console.warn("prevData",prevData)

                // INICIO - CREAR DE PDF
                pdfMake.createPdf(fnGenerarPdf()).getBase64(function (result) {

                    $('#btnValida').prop("disabled", false);

                    url = apiUrlssoma+"/api/Post-Seguimiento-Observacion?code=N0SffbOHJ3Z25Fy7mbYaCPR4Hogo0QBhVw4eXMuMu5ILs/yDTff7BQ==&httpmethod=postInformePdf";
                    data.Updated_By = '';
                    data.Pdf     = result;
                    data.Correos = correos;

                    // console.log('Paso Nro 3');
                    //console.log(JSON.stringify(data));
                    //console.log(JSON.stringify(prevData));
                    //prevData.Updated_By = '';
                    prevData.Pdf        = result;
                    //prevData.Correos    = correos;
                    // console.warn("************* CON PDF prevData",prevData)
                    // console.table(prevData);


                    $.ajax({
                        method: "POST",
                        url: url,
                        data: JSON.stringify(prevData),
                        headers: headers,
                        crossDomain: true,
                        dataType: "json",
                    })
                    .done(function( resultado)
                    {
                        // console.log('Paso Nro 4');
                        // console.log(resultado);
                    })
                    .fail(function( jqXHR, textStatus, errorThrown ) {
                        //$("#preloader").fadeOut();
                    });

                });
                // FIN - CREAR DE PDF

            })
            // FINAL  CONSULTAR OP

        })
        .always(function( jqXHR, textStatus, errorThrown )
        {
            fnCargarReportantes();
            fnCargarGrid();

        })//*/

        // FINAL  ENVIAR A GUARDAR


    })
    // FIN - OBTENER CORREOS RESPONSABLES SSOMA
}







    var data = {
        AMBITO: null,
        ANIO_EMISION: null,
        CACN_CODENT: "5339",
        CACN_CODIGO: "253392020002",
        CACN_TIPACC: "0209",
        CACN_TIPACC_RA: "",
        CACN_TIPENT: "0302",
        CACN_TMONEXA: "3301",
        CACN_TMONMO: "3301",
        CENT_CODIGO: "5339",
        CENT_CODIGO_DISTRITO: "02",
        CENT_CODIGO_PROVINCIA: "01",
        CENT_CODIGO_REGION: "10",
        CIAC_CODIGO: "001202025339",
        CIAC_CODIGO_FORMATO: "001-2020-2-5339",
        CMOV_OBSERVACION: "",
        CMOV_USR_INS_NOMBRE: null,
        CORD_CODIGO: null,
        CRES_ANIO: null,
        CRES_CODIGO: "2020CPO533900002",
        CRES_CODIGO_FORMATO: "2020-CPO-5339-00002",
        CRES_CODIGO_PROYECTO: " ",
        CRES_DESTACADO: null,
        CRES_DIA: null,
        CRES_DIAS_TRANSCURRIDOS: null,
        CRES_ENLACEPUBLICACION: null,
        CRES_ENTIDADAUDITADA: "GOBIERNO REGIONAL HUÁNUCO",
        CRES_ENTIDADEMITEINFORME: "GOBIERNO REGIONAL HUÁNUCO",
        CRES_ESTADO: "0102",
        CRES_ESTADO_DES: "EVALUACIÓN OCI",
        CRES_FECHA_COMUNICACION: "20/10/2020",
        CRES_FECHA_EMISION_INFORME: "18/02/2020",
        CRES_FECHA_FIN: null,
        CRES_FECHA_INICIO: null,
        CRES_FECHA_PUBLICA: null,
        CRES_FLG_ELI: null,
        CRES_IND_COVID: false,
        CRES_IND_OMISIONPUBLICACION: false,
        CRES_IND_RECONSTRUCCION: false,
        CRES_INFORMESUBIDO: "1",
        CRES_MES: null,
        CRES_NOMBREINFORME: "PRUEBA INFORME",
        CRES_OBJETIVOAUDITORIA: "AUDITORIA DE HECHOS ESPECIFICOS",
        CRES_OFICIOSUBIDO: "1",
        CRES_RUTAPUBLICACION_INF: null,
        CRES_RUTAPUBLICACION_RES: null,
        CRES_STATUS: "0",
        CRES_TIPOSERVICIO: "0901",
        CRES_TIPO_OMISIONPUBLICACION: "",
        CRES_USR_INS: null,
        CSOA_CODIGO: "",
        CSOA_NOMBRE: "",
        DEPARTAMENTO_DES: "HUANUCO",
        DISTRITO_DES: "AMARILIS",
        DRES_FECHA: "15/10/2020",
        DRES_FECHA_COMUNICACION: "0001-01-01T00:00:00",
        DRES_FECHA_EMISION_INFORME: "0001-01-01T00:00:00",
        DRES_FECHA_ENVIO: null,
        ENTIDAD_AUDITADA_DES: "GOBIERNO REGIONAL HUÁNUCO",
        FECHA_DESTACADO: null,
        FECHA_OBSERVACION: null,
        HORA_DESTACADO: null,
        IND_COVID: null,
        IND_RECONSTRUCCION: null,
        LRES_MOTIVO: "",
        LRES_OBSERVACIONES: "1 - sumilla",
        LRES_RECOMENDACIONES: "1 - resumen de recomendaciones",
        LST_FUNCIONARIOS: (3) [
            {
                CFCO_ADM: false,
                CFCO_ADMEN: false,
                CFCO_ADMPAS: true,
                CFCO_CIV: false,
                CFCO_FLG_ELI: "N",
                CFCO_PEN: false,
                CFCO_USR_UPD: null,
                CFIN_APEMAT: "VEGA",
                CFIN_APEPAT: "MEDRANO",
                CFIN_DOCIDE: "10504983",
                CFIN_NOMBRE: "REYNA",
                CFIN_TIPDOC: "0801",
                CRES_CODIGO: "2020CPO533900002",
                CRES_STATUS: "1",
                NFCO_CODIGO: 18,
            },
            {
                CFCO_ADM: false,
                CFCO_ADMEN: false,
                CFCO_ADMPAS: true,
                CFCO_CIV: false,
                CFCO_FLG_ELI: "N",
                CFCO_PEN: false,
                CFCO_USR_UPD: null,
                CFIN_APEMAT: "MORY",
                CFIN_APEPAT: "RAZA",
                CFIN_DOCIDE: "40214513",
                CFIN_NOMBRE: "KARINA ALICIA",
                CFIN_TIPDOC: "0801",
                CRES_CODIGO: "2020CPO533900002",
                CRES_STATUS: "1",
                NFCO_CODIGO: 19
            }
        ],
        LST_MOVIMIENTOS: (2) [
            {
                CMOV_ESTADO: "0102",
                CMOV_OBSERVACION: "",
                ESTADO_DES: "EVALUACIÓN OCI",
                IND_OBSERVACION: null,
                MOV_FECHA: "25/10/2020",
                MOV_HORA: "23:08:03",
                NMOV_CODIGO: 88,
                USUARIO_COD: "U62106",
                USUARIO_NOMBRES: "RAVICHAHUA CACERES, PAULO CESAR"
            },
            {
                CMOV_ESTADO: "0101",
                CMOV_OBSERVACION: "",
                ESTADO_DES: "REGISTRADO",
                IND_OBSERVACION: null,
                MOV_FECHA: "15/10/2020",
                MOV_HORA: "23:43:36",
                NMOV_CODIGO: 75,
                USUARIO_COD: "U62106",
                USUARIO_NOMBRES: "RAVICHAHUA CACERES, PAULO CESAR"
            }
        ],
        LST_WORKFLOW: null,
        MODALIDAD: null,
        MONTOAUD_MONEDA_DES: "S/",
        MONTOEXA_MONEDA_DES: "S/",
        NACN_MONAUD: 100000,
        NACN_MONAUD_FORMATO: "100,000.00",
        NACN_MONTOEXA: 0,
        NACN_MONTOEXA_FORMATO: "0.00",
        NRES_ORDEN_DESTACADO: 0,
        NUMINFORME_FORMATO: null,
        OCI: null,
        OCI_CGR: null,
        PDF: null,
        PERIODO: "2020",
        PROVINCIA_DES: "HUANUCO",
        REGION: null,
        REGISTRO: null,
        RESPONSABILIDAD: null,
        SECTOR: "GOBIERNOS REGIONALES",
        SELEC: null,
        TIPOARCHIVO: null,
        TIPOCONTRATO: null,
        TIPOCONTRATO_CODIGO: "",
        TIPOORGANO: null,
        TIPOPROCED: null,
        TIPOPROCED_CODIGO: "",
        TIPOSERVICIO_DES: "SERVICIO CONTROL POSTERIOR",
        TIPO_AUDITORIA_COD: null,
        TIPO_AUDITORIA_DES: "SERVICIO DE CONTROL ESPECÍFICO A HECHOS CON PRESUNTA IRREGULARIDAD",
        TIPO_INFORME: null,
        TIPO_ORG_AUDIT_COD: null,
        TIPO_ORG_AUDIT_DES: null,
        TIPO_SERVICIO_COD: null,
        TIPO_SERVICIO_DES: null,
        TOTAL_SITUACIONES: 0,
        TOTAL_SITUACIONES_FORMATO: "0",
        UO: null,
        cambioCampo: null,
        funcionario: null
    }



function fnAbrirModalPdf(){
    fnCerrarModalMantenimiento();

    pdfMake.createPdf(fnGenerarPdf()).getDataUrl(function (result) {
        $('#pdfView').attr('src', result);
    });

    $('#modal-pdf').modal('show');
}


function fnCerrarModalPdf(){
    $('#modal-pdf').modal('hide');
}


function onDescargarPdf(){
    // pdfMake.createPdf(fnGenerarPdf()).getBase64(function (result) {
    //     $scope.modelo.pdf = result;

    // });
    $("#btn-cancelar").css("background-color","#61b4f9")

    pdfMake.createPdf(fnGenerarPdf()).download("Observacion_Preventiva");
}





function fnGenerarPdf () {

    writeRotatedText = function(text) {
        var ctx, canvas = document.createElement('canvas');
        // I am using predefined dimensions so either make this part of the arguments or change at will
        canvas.width = 36;
        canvas.height = 270;
        ctx = canvas.getContext('2d');
        ctx.font = '36pt Arial';
        ctx.save();
        ctx.translate(36,270);
        ctx.rotate(-0.5*Math.PI);
        ctx.fillStyle = '#000';
        ctx.fillText(text , 0, 0);
        ctx.restore();
        return canvas.toDataURL();
      };


     Grupo_op.sort(function (a, b) {
        if (a.Grupo_Id > b.Grupo_Id) {
          return 1;
        }
        if (a.Grupo_Id < b.Grupo_Id) {
          return -1;
        }
        return 0;
      });

    //  const distinctGrupos = [...new Set(Grupo_op.map(x => x.Grupo_Id + '|' + x.Grupo_Des))];
    const grupos = [...new Set(Grupo_op.map(x => x.Grupo_Des))];



    var respuestas = [];
    observacionSelected.Checklist.map(function(obs)
    {
        if (obs.Grupo_Observacion != 0)
        {
            respuestas.push(obs);
        }
    });

    // console.warn(observacionSelected.DatosPrincipales.Criticidad)

    // console.warn(observacionSelected)

     moment.locale('en');

     var Fecha_Operacion = moment(observacionSelected.DatosPrincipales.Fecha_Operacion).format('DD/MM/YYYY');
    var Hora_Operacion = observacionSelected.DatosPrincipales.Hora_Operacion;
    var Sede = observacionSelected.DatosPrincipales.Sede_Des === null ? '' : observacionSelected.DatosPrincipales.Sede_Des;
    var Embarcacion = observacionSelected.DatosPrincipales.Embarcacion_Des === null ? '' : observacionSelected.DatosPrincipales.Embarcacion_Des;
    var Area = observacionSelected.DatosPrincipales.Area_Des;
    var Zona = observacionSelected.DatosPrincipales.Zona_Des;
    var Nombres_Reportante = toCapitalize(observacionSelected.DatosPrincipales.Nombres_Reportante);
    var Nombres_Reportado = toCapitalize(observacionSelected.DatosPrincipales.Nombres_Reportado) === null ? '' : toCapitalize(observacionSelected.DatosPrincipales.Nombres_Reportado);
    var Tipo_Observacion_Id = observacionSelected.DatosPrincipales.Tipo_Observacion_Id;
    var Codigo = observacionSelected.DatosPrincipales.Codigo;

    var Adjunto  = [];
    var Adjunto2 = [];

    let Criticidad = observacionSelected.DatosPrincipales.Criticidad

    // console.warn("observacionSelected -> ",observacionSelected)

    // if (observacionSelected.Adjunto != null)
    // {
    //     Adjunto.push({
    //         image : 'data:image/png;base64,' + observacionSelected.Adjunto.Adjunto,
    //         fit: [300, 300],
    //         alignment: 'center'
    //     });
    // }
    // else
    // {
    //     Adjunto.push({});
    // }

    if( observacionSelected.Archivos.length > 0)
    {
        // for(i in observacionSelected.Archivos)
        // {
            // console.warn("observacionSelected.Archivos[0] -> ", observacionSelected.Archivos[0] )
            Adjunto.push({
                image : 'data:image/png;base64,' + observacionSelected.Archivos[0].Adjunto,
                fit: [300, 300],
                alignment: 'left'
            });
        // }

        if( observacionSelected.Archivos.length > 1)
        {
            // console.warn("observacionSelected.Archivos[1] -> ", observacionSelected.Archivos[1] )
            Adjunto2.push({
                image : 'data:image/png;base64,' + observacionSelected.Archivos[1].Adjunto,
                fit: [300, 300],
                alignment: 'left'
            });
        }
        else
        {
            Adjunto2.push({
                image : 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAEAAAAAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAEGAbgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD99KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAorm/i/8ACTQfjv8ADTWPCHia2urvQdeg+z3kVtf3FhM6ZDfJPbvHNGwIBDRurDHWukoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/2Q==',
                fit: [300, 300],
                alignment: 'left'
            });
        }

    }
    else
    {
        Adjunto.push({
                image : 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAEAAAAAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAEGAbgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD99KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAorm/i/8ACTQfjv8ADTWPCHia2urvQdeg+z3kVtf3FhM6ZDfJPbvHNGwIBDRurDHWukoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/2Q==',
                fit: [300, 300],
                alignment: 'left'
            });
        Adjunto2.push({
                image : 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAEAAAAAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAEGAbgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD99KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAorm/i/8ACTQfjv8ADTWPCHia2urvQdeg+z3kVtf3FhM6ZDfJPbvHNGwIBDRurDHWukoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/2Q==',
                fit: [300, 300],
                alignment: 'left'
            });

        // console.warn("observacionSelected.Archivos.length vacio -> ", observacionSelected.Archivos.length )
    }

    // console.warn("Adjunto -> ",Adjunto)
    // console.warn("Adjunto2 -> ",Adjunto2)

    console.warn("observacionSelected => ",observacionSelected)

    var arrBody = [];

    // PLANTILLA CUANDO ES UNA CONDICION SUB ESTANDAR
    if(observacionSelected.DatosPrincipales.Tipo_Observacion_Id === 2)
    {
        arrBody = [
            [
                {
                    style: 'headerDoc',
                    table: {
                        headerRows: 1,
                        widths: [120, '*', 120],
                        body: [
                            [
                                {
                                    image : 'logo2',
                                       //'logopdf.png',
                                    fit: [70, 70],
                                    alignment: 'left'
                                },
                            { text: 'OBSERVACIÓN PREVENTIVA - SALVA', style: 'textWhite', alignment: 'center', margin: [0, 5, 0, 0] },
                            { text: '' }
                            // {image: writeRotatedText('I am rotated'), fit:[7,53], alignment: 'center'}
                            ]
                        ]
                    },
                    layout: 'noBorders',
                    colSpan: 4
                }, '', '', ''
            ],
            // [{ text: '', style: 'tableHeader', colSpan: 2 }, '', { text: 'Área', style: 'tableHeader', colSpan: 2 }, ''],

            [
                {
                    table: {
                        headerRows: 1,
                        widths: [30, '*', 30, '*', 30, '*', 60, '*'],
                        body: [
                            [
                            { text: 'Fecha: ', style: 'textBold' },
                            { text: Fecha_Operacion },
                            { text: 'Hora: ', style: 'textBold' },
                            { text: Hora_Operacion, alignment: 'left' },
                            { text: 'Sede: ', style: 'textBold' },
                            { text: Sede, alignment: 'left' },
                            { text: 'Embarcación: ', style: 'textBold' },
                            { text: Embarcacion, alignment: 'left' },
                            // {image: writeRotatedText('I am rotated'), fit:[7,53], alignment: 'center'}
                            ]
                        ]
                    },
                    layout: 'noBorders',
                    colSpan: 4
                }, '', '', ''
            ],

            [
                {
                    table: {
                        headerRows: 1,
                        widths: [60, 170, 160, 120],
                        body: [
                            [
                            { text: 'Zona/Equipo:', style: 'textBold', alignment: 'left' },
                            { text: Zona },
                            { text: 'Área Responsable de la Corrección:', style: 'textBold', alignment: 'left' },
                            { text: Area },
                            // {image: writeRotatedText('I am rotated'), fit:[7,53], alignment: 'center'}
                            ]
                        ]
                    },
                    layout: 'noBorders',
                    colSpan: 4
                }, '', '', ''
            ],

            [
                {
                    table: {
                        headerRows: 1,
                        widths: [60, 170, 160, 120],
                        body: [
                            [
                            { text: 'Reportante:', style: 'textBold', alignment: 'left' },
                            { text: Nombres_Reportante },
                            { text: 'Nivel de Criticidad:', style: 'textBold', alignment: 'left' },
                            { text: Criticidad },
                            // {image: writeRotatedText('I am rotated'), fit:[7,53], alignment: 'center'}
                            ]
                        ]
                    },
                    layout: 'noBorders',
                    colSpan: 4
                }, '', '', ''
            ],

            [
                {
                    table: {
                        headerRows: 1,
                        widths: [120, '*'],
                        body: [
                            [
                            { text: 'Reportado (opcional):', style: 'textBold', alignment: 'left' },
                            { text: Nombres_Reportado }
                            // {image: writeRotatedText('I am rotated'), fit:[7,53], alignment: 'center'}
                            ]
                        ]
                    },
                    layout: 'noBorders',
                    colSpan: 4
                }, '', '', ''
            ],

            [
                {
                    table: {
                        widths: ['*'],
                        dontBreakRows: false,
                        body: [
                            [
                                { text: 'Marcar con "X" según corresponda', style: 'textBold', alignment: 'left' }
                            ],
                            [
                                {
                                    table: {
                                        heights: [8],
                                        widths: [50, 20, '*', 50, 20, '*', 50],
                                        body: [
                                            [
                                                { text: '' },
                                                {
                                                    table: {
                                                        heights: [8],
                                                        body: [
                                                            [
                                                                { text: 'X' , style: Tipo_Observacion_Id === 1 ? 'textBold' : 'textWhite', alignment: 'center' }
                                                            ]
                                                        ]
                                                    }
                                                },
                                                { text: 'Comportamiento inseguro', style: 'textGreen', alignment: 'left', margin: [0, 3, 0, 0] },
                                                { text: '' },
                                                {
                                                    table: {
                                                        heights: [8],
                                                        body: [
                                                            [
                                                                { text: 'X', style: Tipo_Observacion_Id === 2 ? 'textBold' : 'textWhite', alignment: 'center' }
                                                            ]
                                                        ]
                                                    }
                                                },
                                                { text: 'Condición sub-estándar', style: 'textCeleste', alignment: 'left', margin: [0, 3, 0, 0] },
                                                { text: '' }
                                            ]
                                        ]
                                    },
                                    layout: 'noBorders',
                                }
                            ],

                            // // Inicio grupo 1
                            // // Comportamiento inseguro observado
                            // [
                            //     {
                            //         table: {
                            //             headerRows: 1,
                            //             widths: ['*'],
                            //             body: [
                            //                 [
                            //                 { text: '1. ' + grupos[0], style: 'textGreen', alignment: 'left' }
                            //                 ]
                            //             ]
                            //         }
                            //     }
                            // ],
                            // [
                            //     {
                            //         table: {
                            //             heights: [8],
                            //             widths: [10, 20, '*', 30, 20, '*', 10],
                            //             body: [
                            //                 [
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(1, 'No utiliza correctamente sus EPP', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: 'No utiliza correctamente sus EPP', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(1, 'No cumple un procedimiento estándar', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: 'No cumple un procedimiento estándar', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' }
                            //                 ]
                            //             ]
                            //         },
                            //         layout: 'noBorders',
                            //     }
                            // ],
                            // // Fin grupo 1


                            // // Inicio grupo 2
                            // // ¿A qué se debe este comportamiento inseguro?
                            // [
                            //     {
                            //         table: {
                            //             headerRows: 1,
                            //             widths: ['*'],
                            //             body: [
                            //                 [
                            //                 { text: '2. ' + grupos[1], style: 'textGreen', alignment: 'left' }
                            //                 ]
                            //             ]
                            //         }
                            //     }
                            // ],
                            // [
                            //     {
                            //         table: {
                            //             heights: [8],
                            //             widths: [10, 20, '*', 30, 20, '*', 10],
                            //             body: [
                            //                 [
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(2, 'Prisa', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: 'Prisa', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(2, 'Falta de conocimiento', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: 'Falta de conocimiento', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' }
                            //                 ],
                            //                 [
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(2, 'Fatiga', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: 'Fatiga', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(2, 'Falta de experiencia', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: 'Falta de experiencia', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' }
                            //                 ],
                            //                 [
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(2, 'Frustración', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: 'Frustración', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(2, 'Falta inducción/entrenamiento', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: 'Falta inducción/entrenamiento', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' }
                            //                 ],
                            //                 [
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(2, 'Exceso de confianza', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: 'Exceso de confianza', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(2, 'Trabajo poco frecuente', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: 'Trabajo poco frecuente', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' }
                            //                 ],
                            //                 [
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(2, 'Distracción/olvido', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: 'Distracción/olvido', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(2, 'Falta de supervisor', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: 'Falta de supervisor', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' }
                            //                 ],
                            //                 [
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(2, 'Trabajo rutinario', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: 'Trabajo rutinario', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(2, 'Otros', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: 'Otros: ' + fnComentarioOtros(2, 'Otros', respuestas), alignment: 'left', margin: [0, 3, 0, 0], colspan: 2 },
                            //                     ''
                            //                 ]
                            //             ]
                            //         },
                            //         layout: 'noBorders',
                            //     }
                            // ],
                            // // Fin grupo 2


                            // // Inicio grupo 3
                            // // Equipos de protección personal observado
                            // [
                            //     {
                            //         table: {
                            //             headerRows: 1,
                            //             widths: ['*'],
                            //             body: [
                            //                 [
                            //                 { text: '3. ' + grupos[2], style: 'textGreen', alignment: 'left' }
                            //                 ]
                            //             ]
                            //         }
                            //     }
                            // ],
                            // [
                            //     {
                            //         table: {
                            //             heights: [8],
                            //             widths: [10, 20, '*', 30, 20, '*', 10],
                            //             body: [
                            //                 [
                            //                     { text: 'Respecto al observado', colSpan: 3, alignment: 'center' },
                            //                     '', '',
                            //                     { text: '' },
                            //                     { text: '¿Cuál EPP?', colSpan: 3, alignment: 'center' },
                            //                     '', ''
                            //                 ],

                            //                 [
                            //                     { text: '', colSpan: 7, alignment: 'center' },
                            //                     '', '',
                            //                     '', '',
                            //                     '', ''
                            //                 ],




                            //                 [
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(3, '¿Se ajustó o se acomodó el EPP?', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: '¿Se ajustó o se acomodó el EPP?', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(3, 'Casco de seguridad', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: 'Casco de seguridad', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' }
                            //                 ],
                            //                 [
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(3, '¿Le falta usar algún EPP?', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: '¿Le falta usar algún EPP?', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(3, 'Barbiquejo', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: 'Barbiquejo', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' }
                            //                 ],
                            //                 [
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(3, '¿El EPP está en mal estado?', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: '¿El EPP está en mal estado?', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(3, 'Lentes de seguridad', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: 'Lentes de seguridad', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' }
                            //                 ],
                            //                 [
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(3, '¿El EPP es incorrecto para el trabajo?', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: '¿El EPP es incorrecto para el trabajo?', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(3, 'Careta facial', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: 'Careta facial', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' }
                            //                 ],
                            //                 [
                            //                     { text: '' },
                            //                     { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(3, 'Respirador', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: 'Respirador', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' }
                            //                 ],
                            //                 [
                            //                     { text: '' },
                            //                     { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(3, 'Tapones u orejeras', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: 'Tapones u orejeras', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' }
                            //                 ],
                            //                 [
                            //                     { text: '' },
                            //                     { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(3, 'Guantes de seguridad', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: 'Guantes de seguridad', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' }
                            //                 ],
                            //                 [
                            //                     { text: '' },
                            //                     { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(3, 'Ropa de trabajo', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: 'Ropa de trabajo', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' }
                            //                 ],
                            //                 [
                            //                     { text: '' },
                            //                     { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(3, 'Arnés de seguridad', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: 'Arnés de seguridad', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' }
                            //                 ],
                            //                 [
                            //                     { text: '' },
                            //                     { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(3, 'Zapatos de seguridad', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: 'Zapatos de seguridad', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' }
                            //                 ],
                            //                 [
                            //                     { text: '' },
                            //                     { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(3, 'Otros', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: 'Otros: ' + fnComentarioOtros(3, 'Otros', respuestas), alignment: 'left', margin: [0, 3, 0, 0], colspan: 2 },
                            //                     ''
                            //                 ]
                            //             ]
                            //         },
                            //         layout: 'noBorders',
                            //     }
                            // ],
                            // // Fin grupo 3


                            // // Inicio grupo 4
                            // // Procedimiento que se incumple
                            // [
                            //     {
                            //         table: {
                            //             widths: ['*'],
                            //             body: [
                            //                 [
                            //                 { text: '4. ' + grupos[3], style: 'textGreen', alignment: 'left' }
                            //                 ]
                            //             ]
                            //         }
                            //     }
                            // ],
                            // [
                            //     {
                            //         table: {
                            //             heights: [8],
                            //             widths: [10, 20, '*', 30, 20, '*', 10],
                            //             body: [
                            //                 [
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(4, 'Trabajo en caliente', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: 'Trabajo en caliente', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(4, 'Izamiento de cargas', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: 'Izamiento de cargas', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' }
                            //                 ],
                            //                 [
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(4, 'Trabajo en altura', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: 'Trabajo en altura', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(4, 'Excavaciones y zanjas', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         },
                            //                         pageBreak: 'after'
                            //                     },
                            //                     { text: 'Excavaciones y zanjas', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' }
                            //                 ],
                            //                 [
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(4, 'Bloqueo de energías peligrosas', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: 'Bloqueo de energías peligrosas', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(4, 'Ingreso a instalaciones industriales', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: 'Ingreso a instalaciones industriales', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' }
                            //                 ],
                            //                 [
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(4, 'Espacios confinados', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: 'Espacios confinados', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(4, 'Procedimientos operacionales', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: 'Procedimientos operacionales', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' }
                            //                 ],
                            //                 [
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(4, 'Trabajos con MATPEL', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: 'Trabajos con MATPEL', alignment: 'left', margin: [0, 3, 0, 0] },
                            //                     { text: '' },
                            //                     {
                            //                         table: {
                            //                             heights: [8],
                            //                             body: [
                            //                                 [
                            //                                     { text: 'X', style: fnSelected(4, 'Otros', respuestas), alignment: 'center' }
                            //                                 ]
                            //                             ]
                            //                         }
                            //                     },
                            //                     { text: 'Otros: ' + fnComentarioOtros(4, 'Otros', respuestas), alignment: 'left', margin: [0, 3, 0, 0], colspan: 2 },
                            //                     ''
                            //                 ]
                            //             ]
                            //         },
                            //         layout: 'noBorders'
                            //         // pageOrientation: 'portrait',
                            //     }
                            // ],
                            // // Fin grupo 4


                            // [
                            //     { text: '', style: 'textBold', alignment: 'left', pageBreak: 'after' }
                            // ],


                            // Inicio grupo 5
                            // ¿El ambiente de trabajo está en buenas condiciones? ¿Qué observó?
                            [
                                {
                                    table: {
                                        widths: ['*'],
                                        body: [
                                            [
                                            { text: '1. ' + grupos[4], style: 'textCeleste', alignment: 'left' }
                                            ]
                                        ]
                                    }
                                }
                            ],
                            [
                                {
                                    table: {
                                        heights: [8],
                                        widths: [10, 20, '*', 30, 20, '*', 10],
                                        body: [
                                            [
                                                { text: '' },
                                                {
                                                    table: {
                                                        heights: [8],
                                                        body: [
                                                            [
                                                                { text: 'X', style: fnSelected(5, 'Falta de orden', respuestas), alignment: 'center' }
                                                            ]
                                                        ]
                                                    }
                                                },
                                                { text: 'Falta de orden', alignment: 'left', margin: [0, 3, 0, 0] },
                                                { text: '' },
                                                {
                                                    table: {
                                                        heights: [8],
                                                        body: [
                                                            [
                                                                { text: 'X', style: fnSelected(5, 'Procedimientos operaciones', respuestas), alignment: 'center' }
                                                            ]
                                                        ]
                                                    }
                                                },
                                                { text: 'Procedimientos operaciones', alignment: 'left', margin: [0, 3, 0, 0] },
                                                { text: '' }
                                            ],
                                            [
                                                { text: '' },
                                                {
                                                    table: {
                                                        heights: [8],
                                                        body: [
                                                            [
                                                                { text: 'X', style: fnSelected(5, 'Falta de limpieza', respuestas), alignment: 'center' }
                                                            ]
                                                        ]
                                                    }
                                                },
                                                { text: 'Falta de limpieza', alignment: 'left', margin: [0, 3, 0, 0] },
                                                { text: '' },
                                                {
                                                    table: {
                                                        heights: [8],
                                                        body: [
                                                            [
                                                                { text: 'X', style: fnSelected(5, 'Falta de señalización', respuestas), alignment: 'center' }
                                                            ]
                                                        ]
                                                    }
                                                },
                                                { text: 'Falta de señalización', alignment: 'left', margin: [0, 3, 0, 0] },
                                                { text: '' }
                                            ],
                                            [
                                                { text: '' },
                                                {
                                                    table: {
                                                        heights: [8],
                                                        body: [
                                                            [
                                                                { text: 'X', style: fnSelected(5, 'Herramienta/equipo en mal estado', respuestas), alignment: 'center' }
                                                            ]
                                                        ]
                                                    }
                                                },
                                                { text: 'Herramienta/equipo en mal estado', alignment: 'left', margin: [0, 3, 0, 0] },
                                                { text: '' },
                                                {
                                                    table: {
                                                        heights: [8],
                                                        body: [
                                                            [
                                                                { text: 'X', style: fnSelected(5, 'Sustancias no identificadas', respuestas), alignment: 'center' }
                                                            ]
                                                        ]
                                                    }
                                                },
                                                { text: 'Sustancias no identificadas', alignment: 'left', margin: [0, 3, 0, 0] },
                                                { text: '' }
                                            ],
                                            [
                                                { text: '' },
                                                {
                                                    table: {
                                                        heights: [8],
                                                        body: [
                                                            [
                                                                { text: 'X', style: fnSelected(5, 'Falta de guardas de seguridad', respuestas), alignment: 'center' }
                                                            ]
                                                        ]
                                                    }
                                                },
                                                { text: 'Falta de guardas de seguridad', alignment: 'left', margin: [0, 3, 0, 0] },
                                                { text: '' },
                                                {
                                                    table: {
                                                        heights: [8],
                                                        body: [
                                                            [
                                                                { text: 'X', style: fnSelected(5, 'Sustancias químicas sin la hoja de seguridad', respuestas), alignment: 'center' }
                                                            ]
                                                        ]
                                                    }
                                                },
                                                { text: 'Sustancias químicas sin la hoja de seguridad', alignment: 'left', margin: [0, 3, 0, 0] },
                                                { text: '' }
                                            ],
                                            [
                                                { text: '' },
                                                {
                                                    table: {
                                                        heights: [8],
                                                        body: [
                                                            [
                                                                { text: 'X', style: fnSelected(5, 'Herramientas hechizas', respuestas), alignment: 'center' }
                                                            ]
                                                        ]
                                                    }
                                                },
                                                { text: 'Herramientas hechizas', alignment: 'left', margin: [0, 3, 0, 0] },
                                                { text: '' },
                                                {
                                                    table: {
                                                        heights: [8],
                                                        body: [
                                                            [
                                                                { text: 'X', style: fnSelected(5, 'Mala segregación de RR.SS.', respuestas), alignment: 'center' }
                                                            ]
                                                        ]
                                                    }
                                                },
                                                { text: 'Mala segregación de RR.SS.', alignment: 'left', margin: [0, 3, 0, 0] },
                                                { text: '' }
                                            ],
                                            [
                                                { text: '' },
                                                {
                                                    table: {
                                                        heights: [8],
                                                        body: [
                                                            [
                                                                { text: 'X', style: fnSelected(5, 'Superficie inestable para trabajar', respuestas), alignment: 'center' }
                                                            ]
                                                        ]
                                                    }
                                                },
                                                { text: 'Superficie inestable para trabajar', alignment: 'left', margin: [0, 3, 0, 0] },
                                                { text: '' },
                                                {
                                                    table: {
                                                        heights: [8],
                                                        body: [
                                                            [
                                                                { text: 'X', style: fnSelected(5, 'Derrames de afluentes de proceso', respuestas), alignment: 'center' }
                                                            ]
                                                        ]
                                                    }
                                                },
                                                { text: 'Derrames de afluentes de proceso', alignment: 'left', margin: [0, 3, 0, 0] },
                                                { text: '' }
                                            ],
                                            [
                                                { text: '' },
                                                {
                                                    table: {
                                                        heights: [8],
                                                        body: [
                                                            [
                                                                { text: 'X', style: fnSelected(5, 'Conexiones mecánicas o eléctricas en mal estado', respuestas), alignment: 'center' }
                                                            ]
                                                        ]
                                                    }
                                                },
                                                { text: 'Conexiones mecánicas o eléctricas en mal estado', alignment: 'left', margin: [0, 3, 0, 0] },
                                                { text: '' },
                                                {
                                                    table: {
                                                        heights: [8],
                                                        body: [
                                                            [
                                                                { text: 'X', style: fnSelected(5, 'Emisiones con material particulado', respuestas), alignment: 'center' }
                                                            ]
                                                        ]
                                                    }
                                                },
                                                { text: 'Emisiones con material particulado', alignment: 'left', margin: [0, 3, 0, 0] },
                                                { text: '' }
                                            ],
                                            [
                                                { text: '' },
                                                { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                                                { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                                                { text: '' },
                                                {
                                                    table: {
                                                        heights: [8],
                                                        body: [
                                                            [
                                                                { text: 'X', style: fnSelected(5, 'Otros', respuestas), alignment: 'center' }
                                                            ]
                                                        ]
                                                    }
                                                },
                                                { text: 'Otros: ' + fnComentarioOtros(5, 'Otros', respuestas), alignment: 'left', margin: [0, 3, 0, 0], colspan: 2 },
                                                ''
                                            ]
                                        ]
                                    },
                                    layout: 'noBorders',
                                }
                            ],
                            // Fin grupo 5
                            //
                            [
                                {
                                    table: {
                                        headerRows: 1,
                                        heights: [50],
                                        widths: [300, '*'],
                                        body: [
                                            [
                                                // {
                                                //     image : 'logo2',
                                                //     fit: [70, 70],
                                                //     alignment: 'left'
                                                // },
                                            { text: 'Evidencia 1', alignment: 'center', margin: [0, 5, 0, 0] },
                                            { text: 'Evidencia 2', alignment: 'center', margin: [0, 5, 0, 0] },
                                            // {image: writeRotatedText('I am rotated'), fit:[7,53], alignment: 'center'}
                                            ]
                                        ]
                                    },
                                    layout: 'noBorders',
                                }
                            ],
                            [
                                {
                                    table: {
                                        headerRows: 1,
                                        widths: [300, '*'],
                                        body: [
                                            [
                                                {
                                                    image : 'adjunto1',
                                                    fit: [200, 200],
                                                    alignment: 'center'
                                                },

                                                    {
                                                        image : 'adjunto2',
                                                        fit: [200, 200],
                                                        alignment: 'center'
                                                    },
                                                //{ text: 'Evidencia 2', alignment: 'center', margin: [0, 5, 0, 0] },
                                                // {image: writeRotatedText('I am rotated'), fit:[7,53], alignment: 'center'}
                                            ]
                                        ]
                                    },
                                    layout: 'noBorders',
                                }
                            ],
                            // Adjunto,
                            // Adjunto2,

                            [
                                {
                                    table: {
                                        heights: [100],
                                        widths: ['*'],
                                        body: [
                                            [
                                                {
                                                    text: [
                                                        { text: 'Descripción de la observación\n', style: 'textBold', alignment: 'left' },
                                                        { text: fnDescripcionObservacion(respuestas) }
                                                    ]
                                                }
                                            ]
                                        ]
                                    }
                                }
                            ],

                            // Inicio grupo 6
                            // Acciones correctivas a implementar
                            [
                                {
                                    table: {
                                        headerRows: 1,
                                        widths: ['*'],
                                        body: [
                                            [
                                            { text: '2. ' + grupos[5], style: 'headerAC', alignment: 'left' } //textCeleste textBold textGreen
                                            ]
                                        ]
                                    }
                                }
                            ],
                            [
                                {
                                    table: {
                                        heights: [8],
                                        widths: [10, 20, '*', 30, 20, '*', 10],
                                        body: [
                                            [
                                                { text: '' },
                                                {
                                                    table: {
                                                        heights: [8],
                                                        body: [
                                                            [
                                                                { text: 'X', style: fnSelected(6, 'Suspensión de tarea', respuestas), alignment: 'center' }
                                                            ]
                                                        ]
                                                    }
                                                },
                                                { text: 'Suspensión de tarea', alignment: 'left', margin: [0, 3, 0, 0] },
                                                { text: '' },
                                                { text: '' },
                                                { text: '' },
                                                { text: '' }
                                            ],
                                            [
                                                { text: '' },
                                                {
                                                    table: {
                                                        heights: [8],
                                                        body: [
                                                            [
                                                                { text: 'X', style: fnSelected(6, 'Corrección de la observación', respuestas), alignment: 'center' }
                                                            ]
                                                        ]
                                                    }
                                                },
                                                { text: 'Corrección de la observación', alignment: 'left', margin: [0, 3, 0, 0] },
                                                { text: '' },
                                                { text: '' },
                                                { text: '' },
                                                { text: '' }
                                            ],
                                            [
                                                { text: '' },
                                                {
                                                    table: {
                                                        heights: [8],
                                                        body: [
                                                            [
                                                                { text: 'X', style: fnSelected(6, 'Comunicación al jefe inmediato', respuestas), alignment: 'center' }
                                                            ]
                                                        ]
                                                    }
                                                },
                                                { text: 'Comunicación al jefe inmediato', alignment: 'left', margin: [0, 3, 0, 0] },
                                                { text: '' },
                                                { text: '' },
                                                { text: '' },
                                                { text: '' }
                                            ],
                                            [
                                                { text: '' },
                                                {
                                                    table: {
                                                        heights: [8],
                                                        body: [
                                                            [
                                                                { text: 'X', style: fnSelected(6, 'Otros', respuestas), alignment: 'center' }
                                                            ]
                                                        ]
                                                    }
                                                },
                                                { text: 'Otros: ' + fnComentarioOtros(6, 'Otros', respuestas), alignment: 'left', margin: [0, 3, 0, 0], colspan: 5 },
                                                '', '', '', ''
                                            ]
                                        ]
                                    },
                                    layout: 'noBorders',
                                }
                            ],
                            // Fin grupo 6


                        ]
                    },
                    layout: 'noBorders',
                    colSpan: 4
                }, '', '', ''
            ],


            [
                {
                    table: {
                        headerRows: 1,
                        widths: ['*', '*'],
                        body: [
                            [
                            { text: 'CÓDIGO: ' + Codigo, style: 'textBold', alignment: 'left' },
                            { text: 'Área de la Corrección: ' + Area, style: 'textBold', alignment: 'right' },
                            // {image: writeRotatedText('I am rotated'), fit:[7,53], alignment: 'center'}
                            ]
                        ]
                    },
                    layout: 'noBorders',
                    colSpan: 4
                }, '', '', ''
            ]


        ];
    }
    // PLANTILLAS CUANDO ES UN COMPORTAMIENTO INSEGURO
    else
    {
        //textBold textWhite
        let opc = fnSelected(1, 'No utiliza correctamente sus EPP', respuestas)
        console.warn("opc ",opc)
        // CUANDO ES POR LA OPCION "No utiliza correctamente sus EPP"
        if(opc === 'textBold')
        {
            console.warn("en if(opc === 'textBold')")

            arrBody = [
                [
                    {
                        style: 'headerDoc',
                        table: {
                            headerRows: 1,
                            widths: [120, '*', 120],
                            body: [
                                [
                                    {
                                        image : 'logo2',
                                           //'logopdf.png',
                                        fit: [70, 70],
                                        alignment: 'left'
                                    },
                                { text: 'OBSERVACIÓN PREVENTIVA - SALVA', style: 'textWhite', alignment: 'center', margin: [0, 5, 0, 0] },
                                { text: '' }
                                // {image: writeRotatedText('I am rotated'), fit:[7,53], alignment: 'center'}
                                ]
                            ]
                        },
                        layout: 'noBorders',
                        colSpan: 4
                    }, '', '', ''
                ],
                // [{ text: '', style: 'tableHeader', colSpan: 2 }, '', { text: 'Área', style: 'tableHeader', colSpan: 2 }, ''],

                [
                    {
                        table: {
                            headerRows: 1,
                            widths: [30, '*', 30, '*', 30, '*', 60, '*'],
                            body: [
                                [
                                { text: 'Fecha: ', style: 'textBold' },
                                { text: Fecha_Operacion },
                                { text: 'Hora: ', style: 'textBold' },
                                { text: Hora_Operacion, alignment: 'left' },
                                { text: 'Sede: ', style: 'textBold' },
                                { text: Sede, alignment: 'left' },
                                { text: 'Embarcación: ', style: 'textBold' },
                                { text: Embarcacion, alignment: 'left' },
                                // {image: writeRotatedText('I am rotated'), fit:[7,53], alignment: 'center'}
                                ]
                            ]
                        },
                        layout: 'noBorders',
                        colSpan: 4
                    }, '', '', ''
                ],

                [
                    {
                        table: {
                            headerRows: 1,
                            widths: [60, 170, 160, 120],
                            body: [
                                [
                                { text: 'Zona/Equipo:', style: 'textBold', alignment: 'left' },
                                { text: Zona },
                                { text: 'Área Responsable de la Corrección:', style: 'textBold', alignment: 'left' },
                                { text: Area },
                                // {image: writeRotatedText('I am rotated'), fit:[7,53], alignment: 'center'}
                                ]
                            ]
                        },
                        layout: 'noBorders',
                        colSpan: 4
                    }, '', '', ''
                ],

                [
                    {
                        table: {
                            headerRows: 1,
                            widths: [60, 170, 160, 120],
                            body: [
                                [
                                { text: 'Reportante:', style: 'textBold', alignment: 'left' },
                                { text: Nombres_Reportante },
                                { text: 'Nivel de Criticidad:', style: 'textBold', alignment: 'left' },
                                { text: Criticidad },
                                // {image: writeRotatedText('I am rotated'), fit:[7,53], alignment: 'center'}
                                ]
                            ]
                        },
                        layout: 'noBorders',
                        colSpan: 4
                    }, '', '', ''
                ],

                [
                    {
                        table: {
                            headerRows: 1,
                            widths: [120, '*'],
                            body: [
                                [
                                { text: 'Reportado (opcional):', style: 'textBold', alignment: 'left' },
                                { text: Nombres_Reportado }
                                // {image: writeRotatedText('I am rotated'), fit:[7,53], alignment: 'center'}
                                ]
                            ]
                        },
                        layout: 'noBorders',
                        colSpan: 4
                    }, '', '', ''
                ],

                [
                    {
                        table: {
                            widths: ['*'],
                            dontBreakRows: false,
                            body: [
                                [
                                    { text: 'Marcar con "X" según corresponda', style: 'textBold', alignment: 'left' }
                                ],
                                [
                                    {
                                        table: {
                                            heights: [8],
                                            widths: [50, 20, '*', 50, 20, '*', 50],
                                            body: [
                                                [
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X' , style: Tipo_Observacion_Id === 1 ? 'textBold' : 'textWhite', alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Comportamiento inseguro', style: 'textGreen', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: Tipo_Observacion_Id === 2 ? 'textBold' : 'textWhite', alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Condición sub-estándar', style: 'textCeleste', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' }
                                                ]
                                            ]
                                        },
                                        layout: 'noBorders',
                                    }
                                ],

                                // Inicio grupo 1
                                // Comportamiento inseguro observado
                                [
                                    {
                                        table: {
                                            headerRows: 1,
                                            widths: ['*'],
                                            body: [
                                                [
                                                { text: '1. ' + grupos[0], style: 'textGreen', alignment: 'left' }
                                                ]
                                            ]
                                        }
                                    }
                                ],
                                [
                                    {
                                        table: {
                                            heights: [8],
                                            widths: [10, 20, '*', 30, 20, '*', 10],
                                            body: [
                                                [
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(1, 'No utiliza correctamente sus EPP', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'No utiliza correctamente sus EPP', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(1, 'No cumple un procedimiento estándar', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'No cumple un procedimiento estándar', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' }
                                                ]
                                            ]
                                        },
                                        layout: 'noBorders',
                                    }
                                ],
                                // Fin grupo 1


                                // Inicio grupo 2
                                // ¿A qué se debe este comportamiento inseguro?
                                [
                                    {
                                        table: {
                                            headerRows: 1,
                                            widths: ['*'],
                                            body: [
                                                [
                                                { text: '2. ' + grupos[1], style: 'textGreen', alignment: 'left' }
                                                ]
                                            ]
                                        }
                                    }
                                ],
                                [
                                    {
                                        table: {
                                            heights: [8],
                                            widths: [10, 20, '*', 30, 20, '*', 10],
                                            body: [
                                                [
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(2, 'Prisa', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Prisa', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(2, 'Falta de conocimiento', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Falta de conocimiento', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' }
                                                ],
                                                [
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(2, 'Fatiga', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Fatiga', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(2, 'Falta de experiencia', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Falta de experiencia', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' }
                                                ],
                                                [
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(2, 'Frustración', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Frustración', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(2, 'Falta inducción/entrenamiento', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Falta inducción/entrenamiento', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' }
                                                ],
                                                [
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(2, 'Exceso de confianza', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Exceso de confianza', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(2, 'Trabajo poco frecuente', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Trabajo poco frecuente', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' }
                                                ],
                                                [
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(2, 'Distracción/olvido', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Distracción/olvido', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(2, 'Falta de supervisor', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Falta de supervisor', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' }
                                                ],
                                                [
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(2, 'Trabajo rutinario', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Trabajo rutinario', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(2, 'Otros', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Otros: ' + fnComentarioOtros(2, 'Otros', respuestas), alignment: 'left', margin: [0, 3, 0, 0], colspan: 2 },
                                                    ''
                                                ]
                                            ]
                                        },
                                        layout: 'noBorders',
                                    }
                                ],
                                // Fin grupo 2


                                // Inicio grupo 3
                                // Equipos de protección personal observado
                                [
                                    {
                                        table: {
                                            headerRows: 1,
                                            widths: ['*'],
                                            body: [
                                                [
                                                { text: '3. ' + grupos[2], style: 'textGreen', alignment: 'left' }
                                                ]
                                            ]
                                        }
                                    }
                                ],
                                [
                                    {
                                        table: {
                                            heights: [8],
                                            widths: [10, 20, '*', 30, 20, '*', 10],
                                            body: [
                                                [
                                                    { text: 'Respecto al observado', colSpan: 3, alignment: 'center' },
                                                    '', '',
                                                    { text: '' },
                                                    { text: '¿Cuál EPP?', colSpan: 3, alignment: 'center' },
                                                    '', ''
                                                ],

                                                [
                                                    { text: '', colSpan: 7, alignment: 'center' },
                                                    '', '',
                                                    '', '',
                                                    '', ''
                                                ],




                                                [
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(3, '¿Se ajustó o se acomodó el EPP?', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: '¿Se ajustó o se acomodó el EPP?', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(3, 'Casco de seguridad', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Casco de seguridad', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' }
                                                ],
                                                [
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(3, '¿Le falta usar algún EPP?', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: '¿Le falta usar algún EPP?', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(3, 'Barbiquejo', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Barbiquejo', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' }
                                                ],
                                                [
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(3, '¿El EPP está en mal estado?', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: '¿El EPP está en mal estado?', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(3, 'Lentes de seguridad', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Lentes de seguridad', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' }
                                                ],
                                                [
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(3, '¿El EPP es incorrecto para el trabajo?', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: '¿El EPP es incorrecto para el trabajo?', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(3, 'Careta facial', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Careta facial', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' }
                                                ],
                                                [
                                                    { text: '' },
                                                    { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(3, 'Respirador', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Respirador', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' }
                                                ],
                                                [
                                                    { text: '' },
                                                    { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(3, 'Tapones u orejeras', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Tapones u orejeras', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' }
                                                ],
                                                [
                                                    { text: '' },
                                                    { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(3, 'Guantes de seguridad', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Guantes de seguridad', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' }
                                                ],
                                                [
                                                    { text: '' },
                                                    { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(3, 'Ropa de trabajo', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Ropa de trabajo', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' }
                                                ],
                                                [
                                                    { text: '' },
                                                    { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(3, 'Arnés de seguridad', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Arnés de seguridad', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' }
                                                ],
                                                [
                                                    { text: '' },
                                                    { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(3, 'Zapatos de seguridad', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Zapatos de seguridad', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' }
                                                ],
                                                [
                                                    { text: '' },
                                                    { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(3, 'Otros', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Otros: ' + fnComentarioOtros(3, 'Otros', respuestas), alignment: 'left', margin: [0, 3, 0, 0], colspan: 2 },
                                                    ''
                                                ]
                                            ]
                                        },
                                        layout: 'noBorders',
                                    }
                                ],
                                // Fin grupo 3


                                // // Inicio grupo 4
                                // // Procedimiento que se incumple
                                // [
                                //     {
                                //         table: {
                                //             widths: ['*'],
                                //             body: [
                                //                 [
                                //                 { text: '4. ' + grupos[3], style: 'textGreen', alignment: 'left' }
                                //                 ]
                                //             ]
                                //         }
                                //     }
                                // ],
                                // [
                                //     {
                                //         table: {
                                //             heights: [8],
                                //             widths: [10, 20, '*', 30, 20, '*', 10],
                                //             body: [
                                //                 [
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(4, 'Trabajo en caliente', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Trabajo en caliente', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(4, 'Izamiento de cargas', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Izamiento de cargas', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' }
                                //                 ],
                                //                 [
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(4, 'Trabajo en altura', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Trabajo en altura', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(4, 'Excavaciones y zanjas', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         },
                                //                         pageBreak: 'after'
                                //                     },
                                //                     { text: 'Excavaciones y zanjas', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' }
                                //                 ],
                                //                 [
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(4, 'Bloqueo de energías peligrosas', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Bloqueo de energías peligrosas', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(4, 'Ingreso a instalaciones industriales', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Ingreso a instalaciones industriales', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' }
                                //                 ],
                                //                 [
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(4, 'Espacios confinados', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Espacios confinados', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(4, 'Procedimientos operacionales', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Procedimientos operacionales', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' }
                                //                 ],
                                //                 [
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(4, 'Trabajos con MATPEL', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Trabajos con MATPEL', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(4, 'Otros', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Otros: ' + fnComentarioOtros(4, 'Otros', respuestas), alignment: 'left', margin: [0, 3, 0, 0], colspan: 2 },
                                //                     ''
                                //                 ]
                                //             ]
                                //         },
                                //         layout: 'noBorders'
                                //         // pageOrientation: 'portrait',
                                //     }
                                // ],
                                // // Fin grupo 4


                                // [
                                //     { text: '', style: 'textBold', alignment: 'left', pageBreak: 'after' }
                                // ],


                                // // Inicio grupo 5
                                // // ¿El ambiente de trabajo está en buenas condiciones? ¿Qué observó?
                                // [
                                //     {
                                //         table: {
                                //             widths: ['*'],
                                //             body: [
                                //                 [
                                //                 { text: '1. ' + grupos[4], style: 'textCeleste', alignment: 'left' }
                                //                 ]
                                //             ]
                                //         }
                                //     }
                                // ],
                                // [
                                //     {
                                //         table: {
                                //             heights: [8],
                                //             widths: [10, 20, '*', 30, 20, '*', 10],
                                //             body: [
                                //                 [
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(5, 'Falta de orden', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Falta de orden', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(5, 'Procedimientos operaciones', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Procedimientos operaciones', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' }
                                //                 ],
                                //                 [
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(5, 'Falta de limpieza', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Falta de limpieza', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(5, 'Falta de señalización', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Falta de señalización', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' }
                                //                 ],
                                //                 [
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(5, 'Herramienta/equipo en mal estado', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Herramienta/equipo en mal estado', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(5, 'Sustancias no identificadas', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Sustancias no identificadas', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' }
                                //                 ],
                                //                 [
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(5, 'Falta de guardas de seguridad', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Falta de guardas de seguridad', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(5, 'Sustancias químicas sin la hoja de seguridad', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Sustancias químicas sin la hoja de seguridad', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' }
                                //                 ],
                                //                 [
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(5, 'Herramientas hechizas', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Herramientas hechizas', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(5, 'Mala segregación de RR.SS.', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Mala segregación de RR.SS.', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' }
                                //                 ],
                                //                 [
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(5, 'Superficie inestable para trabajar', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Superficie inestable para trabajar', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(5, 'Derrames de afluentes de proceso', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Derrames de afluentes de proceso', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' }
                                //                 ],
                                //                 [
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(5, 'Conexiones mecánicas o eléctricas en mal estado', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Conexiones mecánicas o eléctricas en mal estado', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(5, 'Emisiones con material particulado', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Emisiones con material particulado', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' }
                                //                 ],
                                //                 [
                                //                     { text: '' },
                                //                     { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(5, 'Otros', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Otros: ' + fnComentarioOtros(5, 'Otros', respuestas), alignment: 'left', margin: [0, 3, 0, 0], colspan: 2 },
                                //                     ''
                                //                 ]
                                //             ]
                                //         },
                                //         layout: 'noBorders',
                                //     }
                                // ],
                                // // Fin grupo 5

                                // EVIDENCIAS
                                // [
                                //     {
                                //         table: {
                                //             headerRows: 1,
                                //             widths: [300, '*'],
                                //             body: [
                                //                 [
                                //                     // {
                                //                     //     image : 'logo2',
                                //                     //     fit: [70, 70],
                                //                     //     alignment: 'left'
                                //                     // },
                                //                 { text: 'Evidencia 1', alignment: 'center', margin: [0, 5, 0, 0] },
                                //                 { text: 'Evidencia 2', alignment: 'center', margin: [0, 5, 0, 0] },
                                //                 // {image: writeRotatedText('I am rotated'), fit:[7,53], alignment: 'center'}
                                //                 ]
                                //             ]
                                //         },
                                //         layout: 'noBorders',
                                //     }
                                // ],
                                // [
                                //     {
                                //         table: {
                                //             headerRows: 1,
                                //             widths: [300, '*'],
                                //             body: [
                                //                 [
                                //                     {
                                //                         image : 'adjunto1',
                                //                         fit: [200, 200],
                                //                         alignment: 'center'
                                //                     },

                                //                         {
                                //                             image : 'adjunto2',
                                //                             fit: [200, 200],
                                //                             alignment: 'center'
                                //                         },
                                //                     //{ text: 'Evidencia 2', alignment: 'center', margin: [0, 5, 0, 0] },
                                //                     // {image: writeRotatedText('I am rotated'), fit:[7,53], alignment: 'center'}
                                //                 ]
                                //             ]
                                //         },
                                //         layout: 'noBorders',
                                //     }
                                // ],
                                // // Adjunto,
                                // // Adjunto2,

                                [
                                    {
                                        table: {
                                            heights: [60],
                                            widths: ['*'],
                                            body: [
                                                [
                                                    {
                                                        text: [
                                                            { text: 'Descripción de la observación\n', style: 'textBold', alignment: 'left' },
                                                            { text: fnDescripcionObservacion(respuestas) }
                                                        ]
                                                    }
                                                ]
                                            ]
                                        },
                                        pageBreak: 'after'
                                    }
                                ],

                                // Inicio grupo 6
                                // Acciones correctivas a implementar
                                [
                                    {
                                        table: {
                                            headerRows: 1,
                                            widths: ['*'],
                                            body: [
                                                [
                                                { text: '4. ' + grupos[5], style: 'headerAC', alignment: 'left' } //textCeleste textBold textGreen
                                                ]
                                            ]
                                        }
                                    }
                                ],
                                [
                                    {
                                        table: {
                                            heights: [8],
                                            widths: [10, 20, '*', 30, 20, '*', 10],
                                            body: [
                                                [
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(6, 'Suspensión de tarea', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Suspensión de tarea', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    { text: '' },
                                                    { text: '' },
                                                    { text: '' }
                                                ],
                                                [
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(6, 'Corrección de la observación', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Corrección de la observación', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    { text: '' },
                                                    { text: '' },
                                                    { text: '' }
                                                ],
                                                [
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(6, 'Comunicación al jefe inmediato', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Comunicación al jefe inmediato', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    { text: '' },
                                                    { text: '' },
                                                    { text: '' }
                                                ],
                                                [
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(6, 'Otros', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Otros: ' + fnComentarioOtros(6, 'Otros', respuestas), alignment: 'left', margin: [0, 3, 0, 0], colspan: 5 },
                                                    '', '', '', ''
                                                ]
                                            ]
                                        },
                                        layout: 'noBorders',
                                    }
                                ],
                                // Fin grupo 6


                            ]
                        },
                        layout: 'noBorders',
                        colSpan: 4
                    }, '', '', ''
                ],


                [
                    {
                        table: {
                            headerRows: 1,
                            widths: ['*', '*'],
                            body: [
                                [
                                { text: 'CÓDIGO: ' + Codigo, style: 'textBold', alignment: 'left' },
                                { text: 'Área de la Corrección: ' + Area, style: 'textBold', alignment: 'right' },
                                // {image: writeRotatedText('I am rotated'), fit:[7,53], alignment: 'center'}
                                ]
                            ]
                        },
                        layout: 'noBorders',
                        colSpan: 4
                    }, '', '', ''
                ]

            ];
        }
        // CUANDO ES POR LA OPCION "No cumple un procedimiento estándar"
        else
        {
            console.warn("en else de if(opc === 'textBold')")
            arrBody = [
                [
                    {
                        style: 'headerDoc',
                        table: {
                            headerRows: 1,
                            widths: [120, '*', 120],
                            body: [
                                [
                                    {
                                        image : 'logo2',
                                           //'logopdf.png',
                                        fit: [70, 70],
                                        alignment: 'left'
                                    },
                                { text: 'OBSERVACIÓN PREVENTIVA - SALVA', style: 'textWhite', alignment: 'center', margin: [0, 5, 0, 0] },
                                { text: '' }
                                // {image: writeRotatedText('I am rotated'), fit:[7,53], alignment: 'center'}
                                ]
                            ]
                        },
                        layout: 'noBorders',
                        colSpan: 4
                    }, '', '', ''
                ],
                // [{ text: '', style: 'tableHeader', colSpan: 2 }, '', { text: 'Área', style: 'tableHeader', colSpan: 2 }, ''],

                [
                    {
                        table: {
                            headerRows: 1,
                            widths: [30, '*', 30, '*', 30, '*', 60, '*'],
                            body: [
                                [
                                { text: 'Fecha: ', style: 'textBold' },
                                { text: Fecha_Operacion },
                                { text: 'Hora: ', style: 'textBold' },
                                { text: Hora_Operacion, alignment: 'left' },
                                { text: 'Sede: ', style: 'textBold' },
                                { text: Sede, alignment: 'left' },
                                { text: 'Embarcación: ', style: 'textBold' },
                                { text: Embarcacion, alignment: 'left' },
                                // {image: writeRotatedText('I am rotated'), fit:[7,53], alignment: 'center'}
                                ]
                            ]
                        },
                        layout: 'noBorders',
                        colSpan: 4
                    }, '', '', ''
                ],

                [
                    {
                        table: {
                            headerRows: 1,
                            widths: [60, 170, 160, 120],
                            body: [
                                [
                                { text: 'Zona/Equipo:', style: 'textBold', alignment: 'left' },
                                { text: Zona },
                                { text: 'Área Responsable de la Corrección:', style: 'textBold', alignment: 'left' },
                                { text: Area },
                                // {image: writeRotatedText('I am rotated'), fit:[7,53], alignment: 'center'}
                                ]
                            ]
                        },
                        layout: 'noBorders',
                        colSpan: 4
                    }, '', '', ''
                ],

                [
                    {
                        table: {
                            headerRows: 1,
                            widths: [60, 170, 160, 120],
                            body: [
                                [
                                { text: 'Reportante:', style: 'textBold', alignment: 'left' },
                                { text: Nombres_Reportante },
                                { text: 'Nivel de Criticidad:', style: 'textBold', alignment: 'left' },
                                { text: Criticidad },
                                // {image: writeRotatedText('I am rotated'), fit:[7,53], alignment: 'center'}
                                ]
                            ]
                        },
                        layout: 'noBorders',
                        colSpan: 4
                    }, '', '', ''
                ],

                [
                    {
                        table: {
                            headerRows: 1,
                            widths: [120, '*'],
                            body: [
                                [
                                { text: 'Reportado (opcional):', style: 'textBold', alignment: 'left' },
                                { text: Nombres_Reportado }
                                // {image: writeRotatedText('I am rotated'), fit:[7,53], alignment: 'center'}
                                ]
                            ]
                        },
                        layout: 'noBorders',
                        colSpan: 4
                    }, '', '', ''
                ],

                [
                    {
                        table: {
                            widths: ['*'],
                            dontBreakRows: false,
                            body: [
                                [
                                    { text: 'Marcar con "X" según corresponda', style: 'textBold', alignment: 'left' }
                                ],
                                [
                                    {
                                        table: {
                                            heights: [8],
                                            widths: [50, 20, '*', 50, 20, '*', 50],
                                            body: [
                                                [
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X' , style: Tipo_Observacion_Id === 1 ? 'textBold' : 'textWhite', alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Comportamiento inseguro', style: 'textGreen', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: Tipo_Observacion_Id === 2 ? 'textBold' : 'textWhite', alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Condición sub-estándar', style: 'textCeleste', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' }
                                                ]
                                            ]
                                        },
                                        layout: 'noBorders',
                                    }
                                ],

                                // Inicio grupo 1
                                // Comportamiento inseguro observado
                                [
                                    {
                                        table: {
                                            headerRows: 1,
                                            widths: ['*'],
                                            body: [
                                                [
                                                { text: '1. ' + grupos[0], style: 'textGreen', alignment: 'left' }
                                                ]
                                            ]
                                        }
                                    }
                                ],
                                [
                                    {
                                        table: {
                                            heights: [8],
                                            widths: [10, 20, '*', 30, 20, '*', 10],
                                            body: [
                                                [
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(1, 'No utiliza correctamente sus EPP', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'No utiliza correctamente sus EPP', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(1, 'No cumple un procedimiento estándar', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'No cumple un procedimiento estándar', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' }
                                                ]
                                            ]
                                        },
                                        layout: 'noBorders',
                                    }
                                ],
                                // Fin grupo 1


                                // Inicio grupo 2
                                // ¿A qué se debe este comportamiento inseguro?
                                [
                                    {
                                        table: {
                                            headerRows: 1,
                                            widths: ['*'],
                                            body: [
                                                [
                                                { text: '2. ' + grupos[1], style: 'textGreen', alignment: 'left' }
                                                ]
                                            ]
                                        }
                                    }
                                ],
                                [
                                    {
                                        table: {
                                            heights: [8],
                                            widths: [10, 20, '*', 30, 20, '*', 10],
                                            body: [
                                                [
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(2, 'Prisa', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Prisa', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(2, 'Falta de conocimiento', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Falta de conocimiento', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' }
                                                ],
                                                [
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(2, 'Fatiga', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Fatiga', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(2, 'Falta de experiencia', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Falta de experiencia', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' }
                                                ],
                                                [
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(2, 'Frustración', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Frustración', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(2, 'Falta inducción/entrenamiento', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Falta inducción/entrenamiento', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' }
                                                ],
                                                [
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(2, 'Exceso de confianza', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Exceso de confianza', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(2, 'Trabajo poco frecuente', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Trabajo poco frecuente', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' }
                                                ],
                                                [
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(2, 'Distracción/olvido', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Distracción/olvido', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(2, 'Falta de supervisor', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Falta de supervisor', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' }
                                                ],
                                                [
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(2, 'Trabajo rutinario', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Trabajo rutinario', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(2, 'Otros', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Otros: ' + fnComentarioOtros(2, 'Otros', respuestas), alignment: 'left', margin: [0, 3, 0, 0], colspan: 2 },
                                                    ''
                                                ]
                                            ]
                                        },
                                        layout: 'noBorders',
                                    }
                                ],
                                // Fin grupo 2


                                // // Inicio grupo 3
                                // // Equipos de protección personal observado
                                // [
                                //     {
                                //         table: {
                                //             headerRows: 1,
                                //             widths: ['*'],
                                //             body: [
                                //                 [
                                //                 { text: '3. ' + grupos[2], style: 'textGreen', alignment: 'left' }
                                //                 ]
                                //             ]
                                //         }
                                //     }
                                // ],
                                // [
                                //     {
                                //         table: {
                                //             heights: [8],
                                //             widths: [10, 20, '*', 30, 20, '*', 10],
                                //             body: [
                                //                 [
                                //                     { text: 'Respecto al observado', colSpan: 3, alignment: 'center' },
                                //                     '', '',
                                //                     { text: '' },
                                //                     { text: '¿Cuál EPP?', colSpan: 3, alignment: 'center' },
                                //                     '', ''
                                //                 ],

                                //                 [
                                //                     { text: '', colSpan: 7, alignment: 'center' },
                                //                     '', '',
                                //                     '', '',
                                //                     '', ''
                                //                 ],




                                //                 [
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(3, '¿Se ajustó o se acomodó el EPP?', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: '¿Se ajustó o se acomodó el EPP?', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(3, 'Casco de seguridad', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Casco de seguridad', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' }
                                //                 ],
                                //                 [
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(3, '¿Le falta usar algún EPP?', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: '¿Le falta usar algún EPP?', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(3, 'Barbiquejo', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Barbiquejo', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' }
                                //                 ],
                                //                 [
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(3, '¿El EPP está en mal estado?', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: '¿El EPP está en mal estado?', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(3, 'Lentes de seguridad', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Lentes de seguridad', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' }
                                //                 ],
                                //                 [
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(3, '¿El EPP es incorrecto para el trabajo?', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: '¿El EPP es incorrecto para el trabajo?', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(3, 'Careta facial', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Careta facial', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' }
                                //                 ],
                                //                 [
                                //                     { text: '' },
                                //                     { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(3, 'Respirador', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Respirador', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' }
                                //                 ],
                                //                 [
                                //                     { text: '' },
                                //                     { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(3, 'Tapones u orejeras', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Tapones u orejeras', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' }
                                //                 ],
                                //                 [
                                //                     { text: '' },
                                //                     { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(3, 'Guantes de seguridad', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Guantes de seguridad', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' }
                                //                 ],
                                //                 [
                                //                     { text: '' },
                                //                     { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(3, 'Ropa de trabajo', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Ropa de trabajo', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' }
                                //                 ],
                                //                 [
                                //                     { text: '' },
                                //                     { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(3, 'Arnés de seguridad', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Arnés de seguridad', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' }
                                //                 ],
                                //                 [
                                //                     { text: '' },
                                //                     { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(3, 'Zapatos de seguridad', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Zapatos de seguridad', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' }
                                //                 ],
                                //                 [
                                //                     { text: '' },
                                //                     { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(3, 'Otros', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Otros: ' + fnComentarioOtros(3, 'Otros', respuestas), alignment: 'left', margin: [0, 3, 0, 0], colspan: 2 },
                                //                     ''
                                //                 ]
                                //             ]
                                //         },
                                //         layout: 'noBorders',
                                //     }
                                // ],
                                // // Fin grupo 3


                                // Inicio grupo 4
                                // Procedimiento que se incumple
                                [
                                    {
                                        table: {
                                            widths: ['*'],
                                            body: [
                                                [
                                                { text: '3. ' + grupos[3], style: 'textGreen', alignment: 'left' }
                                                ]
                                            ]
                                        }
                                    }
                                ],
                                [
                                    {
                                        table: {
                                            heights: [8],
                                            widths: [10, 20, '*', 30, 20, '*', 10],
                                            body: [
                                                [
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(4, 'Trabajo en caliente', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Trabajo en caliente', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(4, 'Izamiento de cargas', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Izamiento de cargas', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' }
                                                ],
                                                [
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(4, 'Trabajo en altura', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Trabajo en altura', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(4, 'Excavaciones y zanjas', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        },
                                                        //pageBreak: 'after'
                                                    },
                                                    { text: 'Excavaciones y zanjas', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' }
                                                ],
                                                [
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(4, 'Bloqueo de energías peligrosas', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Bloqueo de energías peligrosas', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(4, 'Ingreso a instalaciones industriales', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Ingreso a instalaciones industriales', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' }
                                                ],
                                                [
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(4, 'Espacios confinados', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Espacios confinados', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(4, 'Procedimientos operacionales', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Procedimientos operacionales', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' }
                                                ],
                                                [
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(4, 'Trabajos con MATPEL', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Trabajos con MATPEL', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(4, 'Otros', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Otros: ' + fnComentarioOtros(4, 'Otros', respuestas), alignment: 'left', margin: [0, 3, 0, 0], colspan: 2 },
                                                    ''
                                                ]
                                            ]
                                        },
                                        layout: 'noBorders'
                                        // pageOrientation: 'portrait',
                                    }
                                ],
                                // Fin grupo 4


                                // [
                                //     { text: '', style: 'textBold', alignment: 'left', pageBreak: 'after' }
                                // ],


                                // // Inicio grupo 5
                                // // ¿El ambiente de trabajo está en buenas condiciones? ¿Qué observó?
                                // [
                                //     {
                                //         table: {
                                //             widths: ['*'],
                                //             body: [
                                //                 [
                                //                 { text: '1. ' + grupos[4], style: 'textCeleste', alignment: 'left' }
                                //                 ]
                                //             ]
                                //         }
                                //     }
                                // ],
                                // [
                                //     {
                                //         table: {
                                //             heights: [8],
                                //             widths: [10, 20, '*', 30, 20, '*', 10],
                                //             body: [
                                //                 [
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(5, 'Falta de orden', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Falta de orden', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(5, 'Procedimientos operaciones', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Procedimientos operaciones', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' }
                                //                 ],
                                //                 [
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(5, 'Falta de limpieza', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Falta de limpieza', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(5, 'Falta de señalización', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Falta de señalización', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' }
                                //                 ],
                                //                 [
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(5, 'Herramienta/equipo en mal estado', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Herramienta/equipo en mal estado', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(5, 'Sustancias no identificadas', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Sustancias no identificadas', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' }
                                //                 ],
                                //                 [
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(5, 'Falta de guardas de seguridad', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Falta de guardas de seguridad', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(5, 'Sustancias químicas sin la hoja de seguridad', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Sustancias químicas sin la hoja de seguridad', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' }
                                //                 ],
                                //                 [
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(5, 'Herramientas hechizas', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Herramientas hechizas', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(5, 'Mala segregación de RR.SS.', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Mala segregación de RR.SS.', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' }
                                //                 ],
                                //                 [
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(5, 'Superficie inestable para trabajar', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Superficie inestable para trabajar', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(5, 'Derrames de afluentes de proceso', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Derrames de afluentes de proceso', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' }
                                //                 ],
                                //                 [
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(5, 'Conexiones mecánicas o eléctricas en mal estado', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Conexiones mecánicas o eléctricas en mal estado', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(5, 'Emisiones con material particulado', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Emisiones con material particulado', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' }
                                //                 ],
                                //                 [
                                //                     { text: '' },
                                //                     { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '', alignment: 'left', margin: [0, 3, 0, 0] },
                                //                     { text: '' },
                                //                     {
                                //                         table: {
                                //                             heights: [8],
                                //                             body: [
                                //                                 [
                                //                                     { text: 'X', style: fnSelected(5, 'Otros', respuestas), alignment: 'center' }
                                //                                 ]
                                //                             ]
                                //                         }
                                //                     },
                                //                     { text: 'Otros: ' + fnComentarioOtros(5, 'Otros', respuestas), alignment: 'left', margin: [0, 3, 0, 0], colspan: 2 },
                                //                     ''
                                //                 ]
                                //             ]
                                //         },
                                //         layout: 'noBorders',
                                //     }
                                // ],
                                // // Fin grupo 5

                                // EVIDENCIAS
                                // [
                                //     {
                                //         table: {
                                //             headerRows: 1,
                                //             widths: [300, '*'],
                                //             body: [
                                //                 [
                                //                     // {
                                //                     //     image : 'logo2',
                                //                     //     fit: [70, 70],
                                //                     //     alignment: 'left'
                                //                     // },
                                //                 { text: 'Evidencia 1', alignment: 'center', margin: [0, 5, 0, 0] },
                                //                 { text: 'Evidencia 2', alignment: 'center', margin: [0, 5, 0, 0] },
                                //                 // {image: writeRotatedText('I am rotated'), fit:[7,53], alignment: 'center'}
                                //                 ]
                                //             ]
                                //         },
                                //         layout: 'noBorders',
                                //     }
                                // ],
                                // [
                                //     {
                                //         table: {
                                //             headerRows: 1,
                                //             widths: [300, '*'],
                                //             body: [
                                //                 [
                                //                     {
                                //                         image : 'adjunto1',
                                //                         fit: [200, 200],
                                //                         alignment: 'center'
                                //                     },

                                //                         {
                                //                             image : 'adjunto2',
                                //                             fit: [200, 200],
                                //                             alignment: 'center'
                                //                         },
                                //                     //{ text: 'Evidencia 2', alignment: 'center', margin: [0, 5, 0, 0] },
                                //                     // {image: writeRotatedText('I am rotated'), fit:[7,53], alignment: 'center'}
                                //                 ]
                                //             ]
                                //         },
                                //         layout: 'noBorders',
                                //     }
                                // ],
                                // // Adjunto,
                                // // Adjunto2,

                                [
                                    {
                                        table: {
                                            heights: [50],
                                            widths: ['*'],
                                            body: [
                                                [
                                                    {
                                                        text: [
                                                            { text: 'Descripción de la observación\n', style: 'textBold', alignment: 'left' },
                                                            { text: fnDescripcionObservacion(respuestas) }
                                                        ]
                                                    }
                                                ]
                                            ]
                                        }
                                    }
                                ],

                                // Inicio grupo 6
                                // Acciones correctivas a implementar
                                [
                                    {
                                        table: {
                                            headerRows: 1,
                                            widths: ['*'],
                                            body: [
                                                [
                                                { text: '4. ' + grupos[5], style: 'headerAC', alignment: 'left' } //textCeleste textBold textGreen
                                                ]
                                            ]
                                        }
                                    }
                                ],
                                [
                                    {
                                        table: {
                                            heights: [8],
                                            widths: [10, 20, '*', 30, 20, '*', 10],
                                            body: [
                                                [
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(6, 'Suspensión de tarea', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Suspensión de tarea', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    { text: '' },
                                                    { text: '' },
                                                    { text: '' }
                                                ],
                                                [
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(6, 'Corrección de la observación', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Corrección de la observación', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    { text: '' },
                                                    { text: '' },
                                                    { text: '' }
                                                ],
                                                [
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(6, 'Comunicación al jefe inmediato', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Comunicación al jefe inmediato', alignment: 'left', margin: [0, 3, 0, 0] },
                                                    { text: '' },
                                                    { text: '' },
                                                    { text: '' },
                                                    { text: '' }
                                                ],
                                                [
                                                    { text: '' },
                                                    {
                                                        table: {
                                                            heights: [8],
                                                            body: [
                                                                [
                                                                    { text: 'X', style: fnSelected(6, 'Otros', respuestas), alignment: 'center' }
                                                                ]
                                                            ]
                                                        }
                                                    },
                                                    { text: 'Otros: ' + fnComentarioOtros(6, 'Otros', respuestas), alignment: 'left', margin: [0, 3, 0, 0], colspan: 5 },
                                                    '', '', '', ''
                                                ]
                                            ]
                                        },
                                        layout: 'noBorders',
                                    }
                                ],
                                // Fin grupo 6


                            ]
                        },
                        layout: 'noBorders',
                        colSpan: 4
                    }, '', '', ''
                ],


                [
                    {
                        table: {
                            headerRows: 1,
                            widths: ['*', '*'],
                            body: [
                                [
                                { text: 'CÓDIGO: ' + Codigo, style: 'textBold', alignment: 'left' },
                                { text: 'Área de la Corrección: ' + Area, style: 'textBold', alignment: 'right' },
                                // {image: writeRotatedText('I am rotated'), fit:[7,53], alignment: 'center'}
                                ]
                            ]
                        },
                        layout: 'noBorders',
                        colSpan: 4
                    }, '', '', ''
                ]

            ];
        }
    }




    var docDefinition = {
        content: [
            {
                style: 'tablePrincipal',
                table: {
                    widths: [120, '*', '*', '*'],
                    heights: [15, 15, 15, 15, 15, 15],
                    body: arrBody
                }
            }
        ],

        images : {
            adjunto1 : Adjunto[0].image,
            adjunto2 : Adjunto2[0].image,
            logo : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAABoCAYAAABLw827AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAACH0SURBVHgB7Z1bkBTndcdP98xw3RULGCywBbNyJMqQFIsARZVyzFDlJykVQSIsO6mUltIlsf0gcKK8MuQtUVKgqsiKBSpWD6nYRg6LK9aTK4ySSkWxuIwSIRtJ1g7YBhkkWMQuCzsz3Tn/r7+e7Z3t2/R0z/Qu36+qdy49OzM7O/3vc853LkQpwTTNAm95UigUirQDseJthLc+UigUirTDYnWNtxOkUCgUaYfF6phpcYQUCoUizbBQ7TGn2EcKhUKRVhB4r9bGzIuXf6xES6FQpBsE3KFS//d+0fzNJyds0XqCYkYG+AdIoVAo2oGF5AwsrP/530Fz7CYWDUUgPjZx4efawVuRFArFrEOn9PHGXT3rqVYfp5+PPE+3J68gzeFEHDla/BwH+ALbQVIoFLOONApWefHCPGUziyBW9DMWrVr9ZluiJV1ApEvs4W2/pmmjpFAoZh1pFKwSfixb8qC4cXOiQiO/HsLVPFmi1VJiKQL5fHGGRQ+XQyxWQ6RQKGYlqRMsFpQKX4wuYbfQ5srVEv3yo6O4muftWMinsl3AE59cf6uvVvu0wtf3k0KhmLWk0cIC5aVLtk67A4J16crruFoISix1uoCwznrYxVww/+5XpRgqFIpZSloF641sZjEtWrh22p0Qn3F2EZlBrxwtpwv4zgf7Cc8zf96KCotVkRQKxawmrYJVwo8lPRtm7JArh7habBYt2wXEyuLb554Tj7vn7l3YpVxBhWIOoFEKkYH1a9fHztLZD2ZqDVtMtHHd82IlkRnk7Q3e4CYWOF5Fv7jwIlYWafP6F/HYMltXm0ihUMx6UmlhybSDip3e0AwsJ1haEuRUneGtgDjXOSsNQlhWEDZmLykUijlBWl1CIONY/a47P2Xra+TXr+JqH/K0PrjwHXslkYVqpe0Kllj8SqRQKOYEWUovZd6eWM6rhRAnNy5d+TH/NHn/u3YwXnDP3Y/ZV1XsSqGYQ6RZsEr4cZcjH8sNmerQYBG7kSuXFcTvK+tKoZhbpNYlZLGBhTXqFcfy4ov9z9lXlXWlUMwx0hzDAhCtRplOELCsZKC9rKwrhWLukXbBehs/lgS4hTYy0A5eIIVCMedIu2CV8KO5TMcNh3VVUQXOCsXcZFYIlluZTjMO60rFrhSKOUqqBctOIMV1tzIdm7t4n7SuQIkUCsWcJNWCJWsF87gOK8uLlcu22VeHVEcGhWLukto8LPRe54sirqM+0M5ibwZZ7TLvCrxKCtr8x4d36Lr2KM0S3jr65G6KyNZdLw8QZZ712m+aVDn52pOpCRM8tOOlfDWTGzB1rU83jbx1r76EyLhuP8bQ9Arvq9Rq2XJ5eHfquuNueeyVfZpmGRLu1F946+gzZUqAVAqWbIWMzguibhDFzF44storKpXBQtPMAdMqCp8tRBYsg/RnNTIHPR+gEQ3seOnV8vA3KtQFBnYc6dNzxo4M0TaTzB01oj5NvC0T/yj5KJOcfQh0uS+bq7MgH66YGpUN0zhuVHPD3Rawga+9lKe6WTR9HmMaOsR3DyVAWl3Chiv4zgdFUczshSO2lcpUBjVOLDkgBnyY7wh6XDabHaQOg/e25auv7GPRGWEBOmJaotpSe29g4jgwaYdO+hF+rmubd71yhAU4T10iWwv+LDWdnsDfTwmQOsHiA3yQpHUAN1D2vnLFkcoAhillyBhcgRSJAMuFwoiApj2b1AHkxtbHDz8LoSJrnFysrwtrMpvLjbAYHuiGcLEXE2ZOaF82W0vEwmrbJZS9q/K8wZLA9Y1yV15uflR4s1cCz8tL0ZQPwye84lY2y6bys0ppC7bLAbBF3raTIhHYcgk7ZBcH0CAlPN4N7lK2njtiGh04SZnmnlwut4NjeDuTihc1s+WxQwUz+Ji24JMEyRh0nLQkWFKcCrxhWS5PlkjlKTp5rx0/m+p35QqC7Q7BSlWwXYrVkLzZkS/TnYYVS2lBGDSxCJGYYOH95Oq5E2Z7x0NLWK+ln9ny+KG9J7//dKJiLF6PrasWOn72QeBOvvZ0iWLEV7CkQMHshkAVqOmfcePmJI2N3aZz56/S2PgkXbxyQ1zifjDGlzfGJxuPX7WiR1z2LppHPYvn0eoVveK+Xr5+f35543HowODnCoKmcp0SpYQmsap0YwaiwVarJvPX2gQxIk+XxoznNSKRqedce/qzzzSMmI/LnkISBxDohlhNw9AOsGhRkqKFv1Gruy7k4PuNk3Jhxh5Nw/+oRDEyQ7DkEAdboAr2/Zcu36BT735E71U+oUsfj9G5ylVxX1zs++aX6Q8K9wmhuij6XPmzYir3KjXuoC1W127WaOki8dGWqAucfk18cdv+8vIBXpRfuhlopFVOHn2yn7qEjulJbjsM8wV+zwVyEVrT1CBkJYqZjJE7EEas+DGjOmnDddN4m99/OVurVd5sWr1E2kMtm80bmp7XTKPAf8s2LYwQQrQeO1ROQpCBXp9XsFYzmzAhVuZx+Zk3U0DsMM6VTXFUyZUsmMyDJD8ciFHp5AU6/e4lOvXOpYbVlASrVvYIsQKXr5YCrSskkTpWBzHSa7Db9YO2WN24VaeLo1VbsN4gRew8sOuVQV51y7vtwwG7+bFDx92Cw3L1qhjnAYT3olk5g54IS9SgvfV6pnQq4LWlgFXkzaHGa5C5L0i4+G/mFcQjm5JIfcjw67unMphv1LK1YY7dHXDbK4PvRYoJ3eH2FchxVrp4ZUxcrvpMD93fv1y4bUlR2GrVCUKoIFhBLJteDJ3n7Qj/HSNyhbHj8OsiwDh0q2rQ27+6SSt6c/auEilixzPYblqft6npJY9fjX31Cgey1z5YVPzl2Hvq6FP9p374VOQcqtNHnxzCc/Bz+SbAwspLYnUuINheKn/vGxXP8EDMK7RZGWMp2ndIl3Bg84ZV23jD9caLwR2EkJ0+e4ne47jVKb6Mg68//Nvi8pPrPw20roDdhVTE0DhGJmNjebKEC1+g/Z2yuOTrFSFWJ8+P0wRfLlucwa6KKhOKH79gu2la7YiMqj6s5+pH3B4jLa8ixYCfpScwaPfJHz49TDHB1mORxYO83HSBJRAH47Sy/ILtDRfUoON8JnGrOOjTc1UYREMUAzPysJAtzttB3nbytpTvwogsTJ4Z5sD4KKyhbw8+RP+072F66wdPikvcxv1w7VoFrqAdjG9ud+yF7Q6+8dPz9Iff+j7t/85/8O+O2bvzNGVxJZq0aYtVzWBHni0riNXSRRnK6uLfe5wUsZOp5jwtCE0zhTjIg7Xk9hhYCrAYKAZ80yrYGoJVRTED0TIN3yTpvkymXqCYkMm5g647zanP2P7s3dBJD5t+Ekhg4ihaFXsIWAn72QpjC2kDPf/cV+hH//g4/fPf7RABdAhYGDdym3QHw8SuwOKF/Y1k0VPvWhbev5XeF8L1F/tfp/fPf2I/NM/bGYy1l6U+sWKLFa6f/fUEIXYFVvfNtx+SukTWuYCuk1eN5Oi0gLNpep8w/CyU1vA8IdZq2cRW7DgWViRrdc6VOOtIZXKuB1Ofsfzsvd5TIb6TRIs4BGw7bzAlkBgJxcfSpkhPgNUEAfv3I38mLDAImjNtwQYWWaEhWOHi03f1fLFxvdklxe0/eW642eIa5O2EdHVjQU6YLuL6ud/costj1ca+lb0i2K7qGhMARd1esRSTV9+ct1kwhsjnAGo3rjIgiq49Uj7Y8kiy5k88t2l6WlmoWaSY0K34rCu1Wm36SdnvPVkrtO2/H2oT6ULukdOVscyNQtaSvR8WGFxGWF4/evFxYX3hPrFvvXUJy8prlFcztjsIQXKI0jRsi+vQ0TP2XXmyRKvtMyssNpKFnb/4+DZduHq7sW/1knm2O1giRfx4W1dIZ5hmUeGgNn2srHaD01lT8xE8M/HVYV6ZG/LZ3fd7f3R4LbWJEGXN04osNxeU+72nuOoLY60lRJAZwW5YX3wT7iPEC1no4myDWBWsL1hdEK9ndj0gfu96SLECmKIDzlU+CXzsy0dPC+F6b+qxRf4Sn4jiImI1lTco4CBuQ6w+vHJr2mNW9zVWB1OVeT8XEImLHrEUrFC5xYs0v0BvgvWFpq+YxYPvyhxTzRhLqU0ypHtaVwYZL7i9J/I+WceyQptY8TNWH6V4DcrY105qEi872B7WHUQ5TiN+FXKFElbYn/71sNPaKpBlbeUpJPKxeAJxtnETq975GTv3SrmDCWAlLnrh/nkHxFViDU474RjSEuoMZa8d9Tq1veCk+xTuG9V6yXWHj1Wrae3H1jrWrYHf7LBDvGB5iQ+7Vh8P7Q72SOsKvH/+KrUCrC0Il3Qj82SJVuA/VYrVCfk7rmIF1ixvBNv3kyJ2/PKdNNPwtmh94iqa+zJ8KGqa6RejKlAnMNgA4NVIg7Td2Pj69my12o/t9L8+M0RtYKVseOVemce9+ov5xQ75+QbaDb53pYEfLC8pFgMYMx8W5yCK90aCXcJm4Br+efHH9N3iI7Du8mSJ1m6IqdvjZaD+GMngqpdYLczpHL9SyaJJ4Ze4KNxBn3IUrNZlc3UvsYteX1jNVShXJ/f3ZOaTqlt0It3gRFaj/VI2DPJOYUDskBdHXvU8GbRZX9jNfliiDU2U+NV7lauRS4UsF/EYld5CNxshRMdkWc00ZPb6CQoQK3DvigX2VdVTPgFMnx5MJhm+Fq1fTpb4/YirV9ZKnbdLZpXJdK/RXjuI5FwPKxEniNNH/a03v5wsanOFtpuCVcCP8YnzoX9hAcewwI3x29QO6CDx3PM/EauJkiHTUQ8mVxMP2rf9xKrJulIDXGPGL9gOPGMpDvwSLdtbvfKO18AizOVyJ5CKQbMMz04YguD4LCxLvwWBdoLvXREsZ+zo5sRI6N+zXcK4CrGRr+UQLSSYFniDC1i07/QTK+CwrpDe4XnGVUTDP9juHUtxgqJj8gm+y+Z+LSOTQz1jWRAtFsRjW3YdnlXC5Rds16ke6qSsmaZ3XNFq7heJbllYefwYn6j49mt3ggx3GySbIi3C7vDQDg7RwlkWLmDji/XOxQlfsWqyrlSwPQH8EhdNI1y9qMjJMrxTTUK2/XV9Xr+gvoMChGvrrsMj6MkeV9Z3Evgl5zLlsN1NAzL9+6IKeLcES1hYYUpxbDKZRdNuIyUCSagQLrcs+laAaDlytQi1gShkvnTd35LbeE/jPZVUKkP8+CUueuVeeeEXV2ln9UoemKEOYmFxYRiFpp1gq+valq8ePvbAY4f2WKPKUgK7yF673HKvvAiKHUZdoe2WYImAOyyssCyePqrezukSwmXXL0YpvrZBHaKdOY+6QDTh8wNZ7ci9kijrKgH8EhfDxFKcyBU779+JWF+IA7OWqe6M0H21T0zD0bQDJtocQ8DYdUTTRIhnJ4dm2Mh4oaflEyZeOA3/djiR6gu7JVjin4EcrLA4Jz/bOV1klQIJ4YJ7+N19j9DXHt5AUUAgHikPiI8hAfQLK+Z7Phau4L1T+4eUdZUMfrGUenWy9ZOEX0F0G6tXyPCuZ6rbI4iWE2teAoSTLTCM9IKAddIC84sXmqQNtTrbEYNgyS/GF2GFtqsxrFZcQsc4r8YHIEuBBslKRK3A2vrLwYeEmxjF2oKF9TfsHoJ7P7OAli52T1NDoB2iJVHWVQL4Jy7OrGMLQ0BBdFurVxAtNNkLaP3SKgXbAutE/Ctycq4HgbHDCCu0XRWssAF34BCsSvM+2awPxddCPCBcaHXz9K5N1Cqln56n771u5YZtWLWQcvr01mVwBZ2BdpV3lQz+iYtGJFGQcRXveFMbq1c2HFfbwy5iv7NXVBw441+2eMWZ5xWUnBs1CTYgJ6vlFdquDlK9PXmZIuB6hpS1i0Wy3MQK7kNxdRRr6x+G3hRBeOH6rZxyDZtcwQolPOfuTsUvcRG0HEtx4h9X6YvDgoG1dfK1p7ZrZGwy/Zb3I2KLlxyoui+OeJfpu1IaPeQRInbYUn1hxwVL9pBvmVwmnOhINxGiJc7CIij/tztbjm3t/85/iss1S+c3XMP7757mCu7uxgivOwG/xMUosRQnAQXRcTb3I6QAnHrt6UFYXFatXwJlW6ZZzOXqZ9qJcwUl50aKFzoJiB22cpLohoUVSbAcaQ2VMI9Hjy6yOqOKzqeIbX37iYcoLLCwUDAN4Bqu++wCWtkzldGuAu3J4RdsjxJLmYF/7lQh7iA3LC4MkoDVVatmlqJIWcS6YhIwWFxipZGtLYqAb3KuaEYY/QQBgmKHpId3xbvqEiaJLFye9kF8/ZENLbmIiGUhEA+ras2yaa5gkRSJ4BdsbyeW4iSofbFh6IOUEIij4W9ArAsCdvLoUxoEzDDNvRAH0+/ADoKtrSii5RdsN7T2TxBBzRSR3hHWre1Kt4YoOILuvsh2MGhh3FgyRU7VxKQpGuzBRUT6w189/5NpyaJuINUBSaVoOCjBl2m7cgWTg4/eR733UQWCRm1jiOfyEsYk5hf64YjzCCGVLhJvHN/RWuxrBdF6/ND1sFOgA0Z4IRduSRyfuabRNYw18iLs/MJZI1gOPKulZYeFIkm3E6O3zn001XP9xq35tI7jUHayKYLr9oqgF2gUiM1u68w8y6+DjoNltUIYL3Icul9uToFXDwsUA6b/bnv1qiuLKg4BK+IzgcsmSpTCipehcSD+peEwrpzfCC+xnz8DPejTCkPQU1grtMWAR3XeJXQe5M3lNlGRRcvoCIovWB9Ka35x5Ta9+eHYtAERF67xfSNjQsgA4lphUh8OvdboVgohxJkABdIjcpQY2tPsSXqk2J1AtpYdpLSgxTd5ph0c8a9NLaw69vEK4pGgB8kRXi0nbyZEqBXarsaw7HYxUZFChYJlbEIwLt+oCqH68ONbVDVmyjrKblAnaIsWUh+CRAsWFlzDf2FrDNcd3SLyZP3D4YJipNg12TO+KN9bx8srZjNRi5ATopC2ImXnqmOIrPrAzH05wis939EQK7TdcgkrvOXDxqWakXEq/HGD9n2IU8GqCqoBBBNySvOWtYtpAQfUIVqrV/QKUfLC6ujQaEUjCq5Xc/D+vrXLrOvsZvKlVV5hbfvke0WiIjbbjSyTYgZBsZSuYK1elShlwOpiMdqUzdUbJ2o3gtxa30Gw3UGs0Pp1hOiWYIlgZkQLC1+ihhK3IlROIFr/ze4hRAtFzHarGj/RcoKAPTZkxjuxheyB9avofohZ//KB3kXz8KUaxH4WMDvbGgJWIkvE7vggflAspSuYlpXSqeB7K+A98XvbzqI1Ql5WkiZOnK6CJZJz6x3qPd8Csr4wdYL1Nm8DES0s8c+JKlROanWzYWlFES033ISMBQvCJQRs1crePr4s8O0C3++0wkpkiVjlTrPCZLB90PMBVnZ6iRIAB4hPq5O+5tUrCFguV80bhp43da1PN4082ypLeBWszzDM40mMp/cCosWW6QterpRG+kav3/VPzuXvoGnupqTQtMacBJd9GL920Osk0VULa7FjCk5YEIPCtOV2hMqJLVoP9feIfKs4RKsZxLzs1UaARFZYYs9w7Ow+vpQWGLhO7eThzFKsxEX3ZSQ5ZKJICcEHRzmr1+EaeR5A5BAsuFkm6QdY5JCCIdbrxdgJazf+fx0TLIDhpVkP8cEwDK/fQ3Ku18Id+uSfeu2ZEiWEn8hSwAptt4LuwoKAhZUNuVJoF0pDqOISK4Di5oHPL3KW3AjRilI47QfSIvCcyOk6/uLj4pLdxhKLFbLx+zE5G7WQd2IGvV/iYjt1bGEI6ihATatXhqZ7nlA0vfUBve0ih5e2dJIL6ITRXq1mCIISd/1WaLtlYTVcnkUL+0PNJazXx4W4ZfX4Ih0Qqc3sDjrECiUb23gbsKdSOwawtgQsqM3r76ZtW9cKdxBuIVlfLJyB4foNq9hVcLA9llKcAKyOAj7lIY7RVAbVy7rneV7bRl0A2fFaC6t9vsH2GEpxghCu7K7DJfIuwfIcv9ZxwZIrfI3cD3QS/bSFUV+5TDyCtWbZPPrCigW2AEI40CrmoExFEKsvEC2U5jgGVXjCsSn+lNfQA2xJwZqSAgUqvKEsYVjVH87EL9geNHMwLnBg8AGEk6jXilsBrVzEgewzj5CkNXayA+/ZSStiFRRsj6MUJwyopWS3uuC5X9MhqqXm+xMXLJlQWSCrLTIu8879PSHjWLcmL0sXsj3Bggu4/nMLnYXMFd522oFuWD38nreTNZo+j4JpzEFsLuNBHArW02ZeDdz24FqnQIESTVlRKo3BAytxsb7Da78WbsBDPKDWTdN8UgREUmsx0DrocCqEFCAvwZrx3RPJud6H0GjQzMG4wCQjjh3CUHB97xwfRH3h3ubge2wxLFgmECfeBnk7IBMor5F14COxcpDsxn2GKTawdMnWUM9vdyddkIv+ltF870v39TrFCu7ZpmZRka4aRKsCYfr7574yo2AaQoY+8oh3sVjZDfcRj1rKv79dxqOUWPkQlLhYq9U6FsAOEVd5tpGIaZVmuWPSjk4mnAaMQZtRxqb5DqXVOrrCGRQ7dOsA29LRD3fOIUp7pDChNAW5ILY4oSQAL1QgR00fMtCxuocVuRPnPqXyL60gOnq1L5o+YMKVugy65yLEsJYuyojUhQ2rFzpdQPSz2ukVR5IlRBCtUTGh5xtfnrb/1LuX7KuwAvqlSB1UcanwdDuW4iRoygs5umPW/Lto4stzoFNDJHw7LTSNlA8Y4dWReOG01wv+HGfEFbMyplQgK9gM+mjqrNfXtPkCYUI5zI2JOt24bYjkzNHxmnuJzO2pOMDyJQ/SzYAJ0Ldkd9JWXEIIFeJUGCrhAAJTDCMsEC3+fDCh54S9ymcH4e0UBWaJEqnWSUssZRrI99K0gud+a/XqYPnoM+WAoPFAJmfAq0gul4lBKxl5/LoyY7VPJ8/Vt07FC53I2GGJvD/HGTHBrLQkhvgPh9rBRMcfVUB+Ety2q+N1IUQTNWPGs01MGuIxVX6sXZsXFjw/0hMgJnf1rA98fN3R/x1uod/reQhViazAeolaAI830auI3VoE4U+/+5EQKwTjL125QatW9BZI0TL+49BxsOU65p7YyAPIM65CztWrAHFDC2N+roFatbozCUtR9L0yzaLX/ubOrIHJuQb5dQVNDit2WPDc71ihBfrU/aIn+hDcJL65lC2Z3SwMJfSQQh/zNUvn0YKsxlZTnS6OTooNgoNEzlbFygZuIljSsyEwH2vcYYG5rRTCVcRoru3r7mL3r8cpViWyelhtj7pKB1ePZMtlxK3sAPupsx/hIq+KnFvHr6uodbB1qRwmINBvj6YSoqUFJokO5HK5Ew/senmQYgKu5uavHj7mJ1agua2xf6wLBkHVP4aXEIHdSJuKuF1jWA7xQgynn7fdvQsyZVgtW9b00Jd+q1fEg1b2ZiPFlGwuXp9q/bJiWcH3sc6BFb3zrbe9QHQCnSfiUwUWKozmcuRp4cvUllA5kS2XS4hnPS1ztBxxrAFShCYocbHTsRQnQcF352iq2mRmd1DXBPydOulHMOkGwhV10g1eE1YVagc1M6AlDFt/zVadb3Juh+OFTkIE36eNXwtMa7BdRrLcxjxf7lmY0x9duGReHqtuAJbWhauTDYspLE63cBmvFl668rrPY8dFtjsssVV982jd3QvdkkhLZKUTJBX8hvV55uuPbMi/cfK8M441QCms6k8rfsH2bsRSnIRIamzUF+KxW3e9vNMkHXl7vla2LVw6n2TF85taGY0gOfA8mq3VKm86BOMhFrV6LtNXp8yAbtJGVnD+ftULIfvolU82lTIFJed2JV7oIETibqO+sKVVQjmRZo+cSgPrC39oBYLTMz/cUyG+tHRxhnoX6MJCcrqFd/X4T7aZlKkNy/j1HGJVImse4XZHOkEi7oR8XoiWcA3tOBZR+qre00rQCK+kS3FC4T8KbNrqFVqhGGTspdYosAjtYWvtGOYM1jCua9dh095wG0MlWNiP4HEU8vsFsUfMbMb9AX3Gki7FCSJwFBifDPRcVViVkZOa4GbJqcsV3L42UQ/8nS98Zr6IL8GtfKi/l36fXct1n13Y2L88ICdrbGLEvlohawXGmfNUog4gc6v2wjXE6LDSWyK2tpEUoQgKtrc9UioGAkeBNdUXItmS3Zqd1N3C9XK9Wt3e7NoFjfBqd2xabPiPAmOhEpnv7SWOymBzAUH3a+P+BcmYlowR736sWLbNN/g+PlFpXJcxtq58QWQQfhirhhcvj+EuFXgPie5vLZRTcfCAoCz7pm4DaCtTy1Q3hegEGjsoc6lVM9vdPrugYDsZZndWB5sIE3zHSaLd0pwCflwNECsO2HOQviFEOIPigHce4Lh+BkmkCL57xbImJz+2r+ap++zuXTxvYPXKnry8XaAOtxZJGsMqqq247jTNCrUIvnByPbni+pQRR9AnAZJDM+TrSuWbm/vJzgn9/HcWZY1knhLE7lt16ofeMT9MIfISUQ7ej3ayf5cf+Bw3P3YIKQ6eBeSoPWyrMI+tCgjPs2//6qZnwL2pI8J+OU7e7bmG+OIJlOCcevdbrs+FWsLN61+0b+b5ufyzTRMGfdtvjE+eQBzr/vzyF+RKokJB9rQbFox9sQsXr+ohUN6pur800a5gIe17oHTuU9ds9rBiJZ+rQFaXBPr5yPN09fpbro978HeGbLcRZTVdPzvYos1bSaaBKBTTQJ/yuqkVdNIeNTUaaKW7QgOTeFWRsKo4fLKLq6jdJrJgyRSHEaQloD6wGeRn/e69PaHEyvGcEKzC9bGzdPYD99jrwLrn7drDvTKW1FVk7ArC3cfvZykpFAHAlcxmawOGpuc5ANWnuwgY3HH2gUYzVC9Xq7lKGvvKd4N2YlgiWdLLFdx4T6OL5wthxEqClb8RpDis5FjW5aulGQ+AmEnBylMKkO1o8L7RnWJtt91URfoJUWit8KCdVUJRSHnlxsyA+7rPNur4Xm0lriOTVEXg9Z67d7k+xrFSmJpUAplSgfetXEKFIkHaEawBURTdVEeIXKs1y+bj6qsyT6tViryNIsDuJlqOmsK0lcMUSZXoKBSJEkmwZPxqoDmdAXV9MteqHFGs7GxyEcBateLhGXlZ4xMj9kCKvjTlPsn3PafSGhSKtBHVwirgx8VPp+JX6OIps9aRCd6WaySD6SXkZX3e1cpqZLynyqLRVM92hSJRogrWNlG4LC0sBNc3fE6IVYWsmr44VjREfdbqFY/MqDG8mV63UKFQJEhkC8ueDWjnWmV1q6VwXOUysmZPuIb3rfnmNNcwjYF3hUKRPC0LlpyCk7/Mq4OOxNAKWWJVoRiR6RBlBOCdruH1qbFgysJSKO4golhYQiTQk32jNTG5QgmIlQNRBe90DVG+I6fo5EmhUNwxRBGsR8dYrNbyimDvgkyFkhUrOzdrhmsorSysFAaP3FEoFHcmmDV4c7JuYrSX38SOBF4XU5nN0RvvmP91Zpf54a+OmJJBUigUimbkTEJwTcayOvnasKbO4MUvXPqBefLsN23B6no9oUKhSCFyeGrHxcrx+nlp2Znvn3/RvHX7sikLphUKhWI6cspzV1fmpJV3rVobM8duCu26RgqFQtEMi8MOSgHonWVORwXeFQpFekGw3SFYg6RQKBRpxiFaKvCuUCjSjxStM6RQKBSzgbTE1hQKRbL8P6aib+ZZ6a6pAAAAAElFTkSuQmCC",
            logo2: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPYAAABeCAYAAAAQXelLAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAADXBJREFUeF7tnduvFVcdx/1n/AfqUxMfmpg2fbEmjb6c+kJSjWLURJM2xMuL5UENJsVQiwkcqlIBi61tuDTgSUAuCgQVyGk59IJKoVwUOK1A4sO4v5tZuM7vfOc3a2bW7Jm1/H2Sb2Dvs/fsy6zPus7M/sTm/Q8XFoslr5jYFkuGMbEtlgxjYlssGcbEtlgyjIltsWSYxmK/8aevFWcv7iyW71wuDMOIx43lpeL8pT3F9kNPUveaJFjs+YOPFWcu7ijfgmEYfQLX5g8+Sl0MSZDYkBq1iWEYswPOtZU7SGxrqQ1jGOAec7IutWKjv28YxnC8fmItdVNLrdgYzBuGMRyYrGZuaqkV28bWhjEsWIGSXtalVmzDMIaHuanFxDaMBGBuajGxDSMBmJtaTGzDSADmppbkxb5776Ni8cLh8pZh5AlzU0sWLfb2V9cVl68ulbcMIz+kl3XJQuxjp3YWGzZ/vrh5+0p5j2HkBXNTSxZiv/f308X3fvzpYtO2NdOuuWHkBnNTSzaTZ+t/+vhU7t371pf3cCD++5OKwDBSgrmpJRuxfzsRGmIjC0e3lveuBF11jMdv3rIuu5EWzE0t2Yj957N7H4iNHDu1q/zLfS5fuzAdh5+ePM4wUoO5qSUbsdHF9sVG3Ew5JF+/8fFpq24YKSK9rEs2YoMNm7+wQmy00HsXNj64bV1wI1WYm1qyEnvvwvMrxPazcHRL+SjDSA/mppasxHbLXjJoya21NlKGuaklK7ExznbLXn6stTZSh7mpJSuxwZYdX18hNSbNrLU2Uoe5qSU7sf31bMRmwo0cYG5qyUpsHJjiS42k0lpfuvLP4pOf+fZM8sjcc+Wr6uzef3LVc5/61gvlX+Ow/PHdyeucKJ750Y7iiS9vmL4391oPPfGd6X14zY0vvVn88S/vlM+Kx6UP/7Xi87n08VpdYG5qyUZsHIAipUa3PBXGKLYvmZ8YhR5CP/PDX0/lZa9RFbwnVDixYJUX8tXvz5ePGAfMTS3ZiI01ayl2SkeZjU1syMuei3Qt9AeOnGsstAw+A1rbrlRVXp/63HeL5Y/ulI8aHuamltGJjZr8H5MdhoKFoJvm4u5bfOeD8tH3YV1wJKUzvcYmNlpT/zkPTQq6f7ttod/9Jm8h2wSfQ5aFJsjK65Gn1q+4je7/WGBuahlUbAgMYZ/b9Nq0FaiqPaty4MjZ6YkdTOqXX11Xvko/XF++W1xbvlfemj3yu3p2MkaNxe2JtP62Mc7FPvLva1Poq8azaL3XT7aPsgBRUS5cIN/87sPFFyfjbPZcfA9tKxlZeeEz+bfRao8F5qaWQcRGqzz/yv2d1bZL5lodOQvu0nc3fN2uYU/97FNsOe58diKAbN3aFHpWcUPoUDEXL1yi24CgTUHlJXshQN6Hzz0GmJtaRtEVRy2N1hc7uapmlkGXrqq1RjAbju32sWN+ceTdYsO+xfLWMPQp9mcnLbS/7QNHz1ERmny3smJAtk1a4qZgyMLkbtpqy8oL5Q7InknsVYC2MDe1jHbyDAUBXaMq0bGD0SozqV/Ytma6DdfVQkGINZP6ysm/FXM/+0Nx6O2r5T3D0JfYqAz97SL4rgEKuX9/k0Ivu7l4/22JUUnIz+Kez7Y9hkk05qaW0Yrtgy8WLTS6hOi6ry1nZdlMOLL3989P/y5bHhSmtzpMtjipn95yvPj3vf+U9w5DX2LLcadryQAr9KHf51cm+8x/HnpnXZCf35WJENhY31VeQPZMxjCJxtzUkoTYEuyEK2Td2uWtpcOrJoD8oLvVtBZ2UiMvLpwv7x2OvsSW20WF6tO20MsWsqvYssuM9x2KrLwwOejDJtGGbrWZm1qSFBvgxA4mNXLl6hJtXfygIISug+4788EDqZEhZ8MdfYjNDtbwWzLQttCjt+U/r+vYFeN+fGa8H8yaY44mlLrKizUKbeYDYsLc1JKs2PJkDxec9AGws+XOkUGhRAWggbH0nCf1GFpr0IfYslWFjBLMTPuPQUIKvawQkLrvvg9CKi8gv4uuFVFXmJtakhWbSY24w0jlmE6LrLEdfvfbZQytNYgtNht3VonXptCzHhQ+Q6xJzVBCKi/AGoYhKiIHc1NLkmLj8sFMasSdzYWumSz8WqTcTOqxtNYgtthy3IntV9G20EupXJzgMQ4R1WCVF7r0DLa813VeoAvMTS1Jio3f6mJSI/KiChA2VHBXOJnUyFhaaxBbbLk9rRC3LfTo8tbtC0xkoZJBxRxb9KYTbvLxQ06iMTe1JCm2NnF2+tye8lH/AwVK7iQW7DgUplPv31gl9e6J7GMiptiQyN8WwsadPm0LfYjcfvBYiB6jRV/1nVV0wx1s+BC6ChAb5qaWJMWuOowU0X7lI6RQ4e8ooL888u4Dqb/xq9mOA0NYVUg7iC3nI/y16yq6FHrsBzlLHhp059uMy9tUXoAdCzEEzE0tSYq9/bV1VGok5Od72AytH7RGOAAFQj+99fiouuCOWGKzcWfVZKJEvge02k1wgsvthATPabIE1abyAmOZzWduaklS7KqlLuTm7cvlo3TqJtew8xY/uFXs+2v7I9X6JJbYcvmniZwxCz2eh3E6xthym1rQgtd10btUXmxNO2QVIDbMTS3/t2IDrWuO+8dMLLFXbadm3OnTV6HHUAiio+KoOlfADz6DNr6XlRfSZBKMzeY3eX4MmJtashtj111cAa3wD353pvjmpJt9fdLFRuHEueByxyGhY8YhiCE25PG3ESuxCz0qYLSwmuRahSK/qxiZddlgbmrJTuwqMGZ+cWFpxUw35L544+Pp31m3Et1SFH6cPz42Yogt165jpc9Cr028sWFAX5VX6CpALJibWpIUW1vukkBorEt/aevxFVK74Eytk+/dmD6Wye2CsR9adjwG4/Mul+SJQVex2bgzVmZR6Nm+YmvpfVVeCK7dNiuYm1qSFFv+ZK4fR53QMu78ak1uFnQBITyuCDPL1r2r2Gzcic/eJmwo4y9JuUsc4dJH+J5ClplCkGNffCc+rPLCc9hnCAnb1qxgbmpJUmztlE1MnmEcHSq0Cy515M6xZjuxLjhPHGNAHG4Zq+BqdBVbPj90+YeBz+tvC/ELvfxb1WGcTZGHtsoZfVZ5dTkfX1YkCOv+9wFzU0uSYrPfwnaB2OzIMS0YezupHXVdOCcyKoFZ7VyfLmKzcWfo8k8VWqGX7zXWMdfoAfjbRXzkwSXyvOumsINcYn2WOpibWpIUG1QteeFcbLTYc0RgGRx8oq1Ty4IBkbEjUWBnvdwh6SI2q7S69jK0Qi8PDmmyVq4hW2x8Jw52iaeulRc7Rn5Wk2jMTS1JiY3lqUNvfzj9f9VvYePqKdeW71KR/WDJq+6IMhR2J1CTS+/MgrZis8LZZO26Cq3Qs7PBYly4QPYS/H3UR+UF2DkHs7gIA3NTyyjFRrcYy1CQGBNguCKoP2ZGi1z1W9g4CQTPd4+VgdB4fiiu2xqrlYlFW7HZuDPWmJcVegxVqqTvsrLAPoffIsvvJ1bFzIYxXbv4ITA3tQwmNuSDYLiU77rfnJ4el43MERllIDvQfgvbrwjQ5W4qtI8rsF0mXmLTVmzZymE7sdAKPZuQhNxtWjv2E0H+56iTvitDTKIxN7WMpsV2kofIDUkB6467Cy2gsvjJ/sVpqy8nxtqA8fYsulyhtBGbLf/E6Ib7VBV6tNryPbvgfshYd8w3tsO2j/ji9ll5ATa0wGv2CXNTyyi74vLigS5oeZ34Vd1xd03x2KBQjWmc3UZsNu6M3QvRCr0/Z1EVtPB4PH5W1wX3ab8Yg96AYxaVFxtaIH1OojE3tYxSbLTIc0JqCM0muza9tGaF2O5ihn3gF6ChaSO2fE7slgzUFfoQuZtE7hNWefXRTa6aT+gL5qaW0YnNJr6qpAbs8NImZ3g1AYV26ENJHTjaC8tvLmgpNVC4/ccjsSbNJHgv2mvhe2RiNAkqByYsWmf/dfE99QH7Pvt6LcDc1DI6seXBJeh+uxM1GDhYRU6iYcnLGD9ovTE2hhRMXhY8NuZEWCowN7WMTmx5BtbhgN/Ikq32sVM7y78YKYFWEAe6oMVHtxbB/93P6w59UNCQMDe1jE5snErppA69gKBstd3MuGHkAnNTy6jExkx3U6kdx07teiA2fqzPMHKCuallVGJjHRtS4982+MeP111JxTBSgrmpZVRi46ASnD7ZFn9dG/83jFxgbmoZjdjXl+9Ol7W6HiXmjkZzh5YaRg4wN7WMRmyMr2NdvxsHrbgf5zOMHGBuahlVVzwWN29dKTb83CbQjHxgbmrJUmyAMbaNs41cYG5qyVZsw8gJ5qYWE9swEoC5qcXENowEYG5qMbENIwGYm1pMbMNIAOamFhPbMBKAuamlVuzlO/1ctMAwjDCuLy9RN7XUin3mYtjVLw3D6Ifzl/ZQN7XUiv36ibXl5g3DGIKXDz1J3dRSKzZirbZhDMPZizupk3UJEnv+4KPFjUk/3zCM2QHnth18jDpZlyCxEchtLbdhzAa01G2lRoLFdkF/H4N5a8ENIy5YgYLQb5xYS91rksZiWyyW8cfEtlgyjIltsWQYE9tiyTAmtsWSYUxsiyW7PFz8Fzg8w3edQOB+AAAAAElFTkSuQmCC"
        },

        styles: {
            headerDoc: {
                bold: true,
                fontSize: 10,
                color: 'black',
                fillColor: '#99b839'
            },
            headerAC: {
                bold: true,
                fontSize: 10,
                color: 'black',
                fillColor: '#99b839'
            },
            textBold: {
                bold: true,
                fontSize: 10,
                color: 'black'
            },
            textWhite: {
                bold: true,
                fontSize: 10,
                color: 'white'
            },
            textCeleste: {
                bold: true,
                fontSize: 10,
                color: '#61b4f9'
            },
            textGreen: {
                bold: true,
                fontSize: 10,
                color: '#99b839'
            },


            header: {
                fontSize: 12,
                decoration: 'underline',
                decorationStyle: 'solid',
                decorationColor: 'black',
                bold: true,
                alignment: 'center',
                margin: [0, 15, 0, 10]
            },
            subheader: {
                fontSize: 11,
                bold: true,
                margin: [0, 10, 0, 5]
            },
            tablePrincipal: {
                fontSize: 10,
                margin: [0, 0, 0, 0]
            },
            tableHeader: {
                bold: true,
                fontSize: 10,
                color: 'black'
            },
            tableHeaderFunc: {
                bold: true,
                fontSize: 10,
                color: 'black',
                decoration: 'underline',
                decorationStyle: 'solid',
                decorationColor: 'black'
            },
            superMargin: {
                alignment: 'center',
                fontSize: 10,
                margin: [0, 50, 0, 0]
            }





        }
    };
    return docDefinition;
}



function fnSelected(grupo, opcion, respuestas)
{

    // console.warn(grupo, opcion, respuestas)
    var selected = false
    respuestas.map(function(item)
    {
        if (item.Grupo_Id == grupo && item.Opcion_Des == opcion && item.Opcion_Observacion != 0)
        {
            selected = true;
        }
    });

    return selected ? 'textBold' : 'textWhite';
}

function fnComentarioOtros(grupo, opcion, respuestas)
{
    console.warn(grupo, opcion, respuestas)
    var texto = ''
    respuestas.map(function(item)
    {
        if (item.Grupo_Id == grupo && item.Opcion_Des == opcion && item.Opcion_Observacion != 0 && item.Respuesta_Observacion!='')
            texto = item.Respuesta_Observacion;
    });

    return texto;
}

function fnDescripcionObservacion(respuestas)
{
    var grupo = 5;
    var subgrupo = 'Descripción de la observación';
    var texto = ''

    respuestas.map(function(item)
    {
        if (item.Grupo_Id == grupo && item.Subgrupo_Des == subgrupo && item.Subgrupo_Observacion != 0)
            texto = item.Respuesta_Observacion;
    });

    if (texto == '')
    {
        grupo = 4;
        respuestas.map(function(item)
        {
            if (item.Grupo_Id == grupo && item.Subgrupo_Des == subgrupo && item.Subgrupo_Observacion != 0)
                texto = item.Respuesta_Observacion;
        });
    }

    if (texto == '')
    {
        grupo = 3;
        respuestas.map(function(item)
        {
            if (item.Grupo_Id == grupo && item.Subgrupo_Des == subgrupo && item.Subgrupo_Observacion != 0)
                texto = item.Respuesta_Observacion;
        });
    }

    return texto;
}






buscarArchivo = function (){
    $('#file_trainning').trigger('click');
}

buscarArchivoB = function (opc){
    $('#file_trainning'+opc).trigger('click');
}

let seleccionarArchivoB = function (opc)
{
    var fileInput = document.getElementById('file_trainning'+opc);
    var filePath = fileInput.value;
    var allowedExtensions = /(.jpeg)$/i;

    if(!allowedExtensions.exec(filePath)){
        allowedExtensions = /(.jpg)$/i;

        if(!allowedExtensions.exec(filePath)){
            allowedExtensions = /(.png)$/i;

            if(!allowedExtensions.exec(filePath)){
                //alert('Por favor cargue solo archivos .jpeg, .jpg o .png');
                swal("Error","Por favor cargue solo archivos .jpeg, .jpg o .png","error")
                return false
                fileInput.value = '';
                return false;
            }
        }
    }
    var esc= escape(filePath)
    var name = esc.split("%5C");

    var file_trainning = document.getElementById("file_trainning"+opc).files[0];
    if(file_trainning)
    {
        toBase64(file_trainning).then(
            data => {

                if(opc===1)
                    base64_trainning  = getResult(data);
                else
                    base64_trainning2 = getResult(data);

            }
        );
    }

    $('#archivo'+opc).html(name[2]);

}


seleccionarArchivo = function (){
    var fileInput = document.getElementById('file_trainning');
    var filePath = fileInput.value;
    var allowedExtensions = /(.jpeg)$/i;

    if(!allowedExtensions.exec(filePath)){
        allowedExtensions = /(.jpg)$/i;

        if(!allowedExtensions.exec(filePath)){
            allowedExtensions = /(.png)$/i;

            if(!allowedExtensions.exec(filePath)){
                alert('Por favor cargue solo archivos .jpeg, .jpg o .png');
                fileInput.value = '';
                return false;
            }
        }
    }
    var esc= escape(filePath)
    var name = esc.split("%5C");




    var file_trainning = document.getElementById("file_trainning").files[0];
    if(file_trainning)
    {
        toBase64(file_trainning).then(
            data => {
                base64_trainning = getResult(data);
            }
        );
    }

    $('#arc_t').html(name[2]);
}



const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

var getResult = function(data) { var result= data.split(','); return result[1]; }


function openNewTab(ref){
    if (ref!="" || ref != null || ref != undefined)
    {
      //  window.open("data:application/octet-stream;charset=utf-16le;base64," + ref, "_blank","toolbar=1, scrollbars=1, resizable=1, width=" + 1015 + ", height=" + 800);

        let imgWindow = window.open("")
        imgWindow.document.write("<iframe width='100%' height='100%' src='data:application/octet-stream;base64, " + encodeURI(ref) + "'></iframe>")
    }
    else{
        swal("Error","Este Registro no contiene de archivos","error")
    }

}
