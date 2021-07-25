let accionPERICON = "guardar";
let listaPericon = [];
// Cargar Grid ajax
function fnCargarGridPERICON() {

    let pericon_peligro = mdc.textField.MDCTextField.attachTo(document.querySelector('.pericon_peligro'));
    let pericon_riesgo = mdc.textField.MDCTextField.attachTo(document.querySelector('.pericon_riesgo'));
    let pericon_consecuencia = mdc.textField.MDCTextField.attachTo(document.querySelector('.pericon_consecuencia'));
    let pericon_severidad = mdc.textField.MDCTextField.attachTo(document.querySelector('.pericon_severidad'));
    
    pericon_peligro.value=" ";
    pericon_riesgo.value=" ";
    pericon_consecuencia.value=" ";
    pericon_severidad.value=" ";
    
    console.log('fnCargarGridPERICON');
    $('#body-tabla-list').html('');
    $('#body-tabla-loader').removeClass('d-none');
    
    let profile = getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa);

    // '&TipoObservacion=1&FechaInicio=20201022&FechaFin=20201024'
    let headers;
    let url = `${apiUrlssoma}/api/Get-Pericon?code=lIH/2G37q/SBQ/8q0NdycE86fpO3YAlN7VgCzwvDAOrLpxtEpzRlSw==&httpmethod=objectlist`

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

        listaPericon = response;

        var html = fnTempleteGridPERICON(response);

        $('#body-tabla-list').html(html);
        


        $('#body-tabla-loader').addClass('d-none');

        if (response.length == 0)
        {
            $('#body-tabla-Vacio').removeClass('d-none');
        }
        else{
            $('#body-tabla-Vacio').addClass('d-none');
        }
        
    });

};

function fnTempleteGridPERICON(data) {
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

        if(Item.Active==0){

        }

        let editar = Item.Active==1 ? '' : 'disabled';

        let status = Item.Active==1 ? 'Habilitado':'Inhabilitado';
    
        let storage = getStorage("vtas_rolexternalrol", "text");


        $('#cantidad').removeClass('d-none');
        
        let profile = getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa);

            html += `<div class="item-tabla p-2" style="font-size: 15px; display:relative;">
                        <div class="row m-0 justify-content-between align-items-center">
                        
                            <div class="col-md-3  row">  
                                ${Item.Peligro}
                            </div>
                            <div class="col-md-3  row">  
                                ${Item.Riesgo}
                            </div>
                            
                            <div class="col-md-3  row">  
                                ${Item.Consecuencia}
                            </div>
                            
                            <div class="col-md-1  row">
                                ${Item.Severidad}
                            </div>

                            <div class="col-md-2  row">
                                <div class="col-md-8 text-center" style="    align-items: center;display: flex;">
                                    <strong id="statustext${Item.Id}">${status}</strong>
                                    <label class="switch">
                                        <input type="checkbox" ${Item.Active==1?'checked':''} id="sw_pericon_${Item.Id}" onchange="cambiarEstadoPericon(${Item.Id})">
                                        <span class="slider round"></span>
                                    </label>
                                </div>
                                <div class="col-md-4 text-center">
                                    <button ${editar} onclick="editarPericon(${Item.Id})" class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-add m-auto bmd-btn-fab-sm__xs" >
                                        <img src="./images/newsistema/iconos/edit1.svg" alt="" class="w-50">
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>`;

        

    })
    // <div class="col-md-4">
    //     <button ${ver} class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-ojo m-auto bmd-btn-fab-sm__xs" onclick="modalVisualizarInspeccionForm(${Item.id},'${Item.title}')">
    //         <img src="./images/newsistema/iconos/ojo1.svg" alt="" class="w-50">
    //     </button>
    // </div>
    html += '';
    return html;
}

function mostrarAvisoConfirmacion(){
    if(accionPERICON=="guardar"){
        $("#titleConfirm").text("Se realizará el registro PERICON")
    }else{
        $("#titleConfirm").text("Se realizará la actualización del PERICON")
    }
    
    $("#modalShowAlertConfirm").modal("show")
    
}

function cancelConfirmPERICON(){
    $("#modalShowAlertConfirm").modal("hide")
}

function cambiarEstadoPericon(IdPericon){

    console.log(IdPericon);

    var status = $("#sw_pericon_"+IdPericon).is(':checked');
    let active = 1;
    if(status){
        $("#statustext"+IdPericon).text("Habilitado");
        active = 1;
    }else{
        $("#statustext"+IdPericon).text("Inhabilitado");
        active = 0;
    }

    let actual = listaPericon.filter(pericon=>pericon.Id==IdPericon);
    
    var data = {};

    data = {
        IdPericon:IdPericon,
        Peligro:actual[0].Peligro,
        Riesgo:actual[0].Riesgo,
        Consecuencia:actual[0].Consecuencia,
        Severidad:actual[0].Severidad,
        Created_By:getCookie("vtas_id_hash" + sessionStorage.tabVisitasa),
        Updated_By:getCookie("vtas_id_hash" + sessionStorage.tabVisitasa),
        Active: active
    }

    var url =apiUrlssoma+"/api/Post-Pericon?code=B4Ew3UbAaVmlukMLajsJOgHiCEEscKF6l2HjvXDTpOq1dDxQQIEnKw==&httpmethod=post";
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

            $("#titleMessage").text("Cambio de estado exitoso")

            $("#modalShowAlertOk").modal("show");
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
        fnCargarGridPERICON();
    });

    console.log(status);
}

function editarPericon(IdPericon){
    console.log("editarpericon id: "+IdPericon);
    let actual = listaPericon.filter(pericon=>pericon.Id==IdPericon);

    accionPERICON = "editar";

    $("#PericonId").val(actual[0].Id)
    $("#txt_pericon_peligro").val(actual[0].Peligro)
    $("#txt_pericon_riesgo").val(actual[0].Riesgo)
    $("#txt_pericon_consecuencia").val(actual[0].Consecuencia)
    $("#txt_pericon_severidad").val(actual[0].Severidad)

    $("#btnGuardarPericonText").text("Actualizar");
    $("#btnCancelarEdicion").removeClass("d-none");

}

function cancelarEdicion(){
    accionPERICON = "guardar";

    $("#PericonId").val(0)
    $("#txt_pericon_peligro").val(' ')
    $("#txt_pericon_riesgo").val(' ')
    $("#txt_pericon_consecuencia").val(' ')
    $("#txt_pericon_severidad").val(' ')

    $("#btnGuardarPericonText").text("Agreagr nuevo");
    $("#btnCancelarEdicion").addClass("d-none");
}

function guardarPericon(){
    $("#preloader").show();

    var data = {};

    data = {
        IdPericon:$("#PericonId").val(),
        Peligro:$("#txt_pericon_peligro").val(),
        Riesgo:$("#txt_pericon_riesgo").val(),
        Consecuencia:$("#txt_pericon_consecuencia").val(),
        Severidad:$("#txt_pericon_severidad").val(),
        Created_By:getCookie("vtas_id_hash" + sessionStorage.tabVisitasa),
        Updated_By:getCookie("vtas_id_hash" + sessionStorage.tabVisitasa),
        Active:1
    }

    var url =apiUrlssoma+"/api/Post-Pericon?code=B4Ew3UbAaVmlukMLajsJOgHiCEEscKF6l2HjvXDTpOq1dDxQQIEnKw==&httpmethod=post";
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
            $("#modalShowAlertConfirm").removeClass("fade").modal("hide");
            if(accionPERICON=="guardar"){
                $("#titleMessage").text("Registro de PERICON exitoso")
            }else{
                $("#titleMessage").text("Actualización de PERICON exitosa")
            }
            $("#modalShowAlertOk").modal("show");
            console.log("correcto");

            $("#PericonId").val(0);
        
            $("#btnGuardarPericonText").text("Agregar nuevo");
            $("#btnCancelarEdicion").addClass("d-none");

            accionPERICON="guardar";

        }else{
            $("#preloader").fadeOut();

        }
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
        $("#preloader").fadeOut();

    })
    .always(function( jqXHR, textStatus, errorThrown ) {
        //fnCargarReportantes();
        fnCargarGridPERICON();
    });
}