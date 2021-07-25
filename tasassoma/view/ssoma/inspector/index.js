let date = new Date()   //ningun cambio

let inspectorName = "";
let inspectorLastName = "";

let UnitsArray = [];
let SedeArray = [];
let AreaArray = [];

function initInspector(){
    let register_type = mdc.select.MDCSelect.attachTo(document.querySelector('.register-type'));
    let unidad_inspector = mdc.select.MDCSelect.attachTo(document.querySelector('.unidad-inspector'));
    let sede_inspector = mdc.select.MDCSelect.attachTo(document.querySelector('.sede-inspector'));
    let area_inspector = mdc.select.MDCSelect.attachTo(document.querySelector('.area-inspector'));
    let dni_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.dni-inspector'));
    let name_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.name-inspector'));
    let lastname_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.lastname-inspector'));
    let rol_inspector = mdc.select.MDCSelect.attachTo(document.querySelector('.rol-inspector'));
    let search_name = mdc.textField.MDCTextField.attachTo(document.querySelector('.search-inspector'));
    let hash_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.hash-inspector'));
    let user_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.user-inspector'));
    let pass_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.pass-inspector'));
    let email_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.correo-inspector'));

    register_type.listen('MDCSelect:change',() => {
        console.log(register_type.value)
        if(register_type.value==1){
            name_inspector.value = "";
            lastname_inspector.value = "";
            hash_inspector.value = "";
            email_inspector.value = "";
            $("#lastname-content").hide();
            $("#search-content").show();
            $("#dni-content").hide();
            $("#user-content").hide();
            $("#pass-content").hide();
            //document.getElementById("lastname-content").style.display = "none !important";
        }else{
            name_inspector.value = "";
            lastname_inspector.value = "";
            hash_inspector.value = "";
            email_inspector.value = "";
            $("#lastname-content").show();
            $("#search-content").hide();
            $("#dni-content").show();
            $("#user-content").show();
            $("#pass-content").show();
        }
    });
}

function listInspectores(){
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
        $('#body-tabla-loader').addClass('d-none')
        $('#pagination-container').pagination({
            dataSource: response,
            pageSize: 8,
            callback: function(data, pagination) {
                var html = TemplateListInspectores(data);
                $('#body-tabla-list').html(html);
            }
        })
        $('.body-tabla').addClass('hidden')
        $('#cantidad').text(response.length)

    })
}

function TemplateListInspectores(data) {
    var html = '';
    console.log(data)
    // $.each(data, function(index, item){
    //     html += '<li>'+ item +'</li>';
    // });
    let AreaName = '- -';
    let UnitName = '- -'
    let SedeName = '- -'
    let RolName  = '- -'
    let PersonName = '- -'
    data.forEach((Item) => {

        console.log('*** lista::', Item);

        if(Item.AreaName != null){
            AreaName = toCapitalize(Item.AreaName) ;
        }
        if(Item.UnitName != null){
            UnitName = toCapitalize(Item.UnitName);
        }
        if(Item.SedeName != null){
            SedeName = toCapitalize(Item.SedeName);
        }
        if(Item.PersonName != null){
            PersonName = toCapitalize(Item.PersonName);
        }

        if(Item.Role == 39){
            RolName = 'Responsable de Programación'
        }else if(Item.Role == 43){
            RolName = 'Responsable de Inspección'
        }else if(Item.Role == 44){
            RolName = 'Inspector'
        }
        else if(Item.Role == 61){
            RolName = 'Reportante'
        }

        html += `<div class="item-tabla p-2" style="font-size: 13px">
            <div class="row m-0 justify-content-between align-items-center">
                <div class="col-md-2">${PersonName}</div>
                <div class="col-md-2">${RolName}</div>
                <div class="col-md-2">${UnitName}</div>
                 <div class="col-md-2">${SedeName}</div>
                <div class="col-md-2">${AreaName}</div>
                <div class="col-1 text-center">
                    <button class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-add m-auto bmd-btn-fab-sm__xs" onclick="EditarInspector(${Item.PersonType},'${Item.PersonName}',${Item.Role},${Item.AreaId},${Item.SedeId},${Item.UnitId},${Item.AreaResponsible},'${Item.UserName}','${Item.pName}','${Item.lName}',${Item.Id},'${Item.HashId}','${Item.IdentityDocument}','${Item.Job}','${Item.Email}')">
                        <img src="./images/newsistema/iconos/edit1.svg" alt="" class="w-50">
                    </button>
                </div>
                <div class="col-1 text-center">
                    <button class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-ojo m-auto bmd-btn-fab-sm__xs" onclick="visualizarInspector('${Item.HashId}')">
                        <img src="./images/newsistema/iconos/ojo1.svg" alt="" class="w-50">
                    </button>
                </div>
            </div>
        </div>`;
    })
    html += '';
    return html;
}

function cerrarAgregarInspector(){
    cerrarModal('modal-agregar-inspector')
    let register_type = mdc.select.MDCSelect.attachTo(document.querySelector('.register-type'));
    let unidad_inspector = mdc.select.MDCSelect.attachTo(document.querySelector('.unidad-inspector'));
    let sede_inspector = mdc.select.MDCSelect.attachTo(document.querySelector('.sede-inspector'));
    let area_inspector = mdc.select.MDCSelect.attachTo(document.querySelector('.area-inspector'));
    let dni_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.dni-inspector'));
    let name_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.name-inspector'));
    let lastname_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.lastname-inspector'));
    let rol_inspector = mdc.select.MDCSelect.attachTo(document.querySelector('.rol-inspector'));
    let search_name = mdc.textField.MDCTextField.attachTo(document.querySelector('.search-inspector'));
    let hash_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.hash-inspector'));
    let user_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.user-inspector'));
    let pass_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.pass-inspector'));
    let email_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.correo-inspector'));

    register_type.value = ''
    unidad_inspector.value = ''
    sede_inspector.value = ''
    area_inspector.value = ''
    dni_inspector.value = ''
    name_inspector.value = ''
    lastname_inspector.value = ''
    rol_inspector.value = ''
    search_name.value = ''
    hash_inspector.value = ''
    user_inspector.value = ''
    pass_inspector.value = ''
    dni_inspector.value = ''
    email_inspector.value = ''
    $('#listSede').html('');
    $("#idhidden").val('');
}

function visualizarInspector(idHash,Nombre){
    let url = apiUrlssoma+`/api/Get-Inspector?httpmethod=object&code=57N70WaHZQGjp8Wr/aXfyir5sz4KwDyCYdXKTWkE/e7YDa/sAZamzA==&hash_id=${idHash}`
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
        let AreaName = '- -';
        let UnitName = '- -'
        let SedeName = '- -'
        let RolName  = '- -'

        if(response.AreaName != null){
            AreaName = response.AreaName;
        }
        if(response.UnitName != null){
            UnitName = response.UnitName;
        }
        if(response.SedeName != null){
            SedeName = response.SedeName;
        }

        if(response.Role == 39){
            RolName = 'responsable de programacion'
        }else if(response.Role == 43){
            RolName = 'responsable de inspeccion'
        }else if(response.Role == 44){
            RolName = 'inspector '
        }
        else if(response.Role == 61){
            RolName = 'Reportante'
        }

        $('#modal-visualizar').addClass('modal_confirmacion__active');
        $('#nombreInspector').text(toCapitalize(response.PersonName));
        $('#rolInspector').text(toCapitalize(RolName))
        $('#areaInspector').text(toCapitalize(AreaName))
        $('#sedeInspector').text(toCapitalize(SedeName))
        $('#UnidadNegocioInspector').text(toCapitalize(UnitName))
    })
}

function AgregarInspector(){
    $('#modal-agregar-inspector').addClass('modal_confirmacion__active')
    $("#tx_job").val('')
    $("#tx_user").val('')
    $("#tx_pass").val('')
}

function getlistUnidadNegocio(){
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
        response.forEach((Item) => {
            $('#listUnidadNegocio').append(`<li class="mdc-list-item" data-value="${Item.Id}" onclick="getListSede(${Item.Id})">
                                    <span class="mdc-list-item__ripple"></span>
                                    <span class="mdc-list-item__text text-left">${Item.Code}</span>
                                </li>`)
        })
        UnitsArray = response;
    })
}

function getListSede(id,SedeId = 0,AreaId = 0){

    let sede_inspector = mdc.select.MDCSelect.attachTo(document.querySelector('.sede-inspector'));
    sede_inspector.value ='';
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
        $('#listSede .mdc-list-item').hide();
        response.forEach((Item) => {
            console.log('recorre item')
            $('#listSede').append(`<li class="mdc-list-item" data-value="${Item.Id}" >
                                    <span class="mdc-list-item__ripple"></span>
                                    <span class="mdc-list-item__text text-left">${Item.Code}</span>
                                </li>`)
        })

        SedeArray = response;

        if(SedeId>0){
            console.log('asignando',SedeArray)
            let object = SedeArray.filter(f=>f.Id == SedeId)[0];
            let index = SedeArray.indexOf(object);
            console.log(0)
            sede_inspector.selectedIndex = index;
             // $('#anclaSede').trigger( "click" );
             // $('#anclaSede').focus();

             // $('#lbSede').removeClass("mdc-floating-label");
             // $('#lbSede').addClass("mdc-floating-label mdc-floating-label--float-above");
             // //mdc-floating-label mdc-floating-label--float-above
        }

    })
    getListAreaInspector(id,AreaId)
}

function getListAreaInspector(id,AreaId = 0){
    let area_inspector = mdc.select.MDCSelect.attachTo(document.querySelector('.area-inspector'));
    area_inspector.value ='';
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
        response.forEach((Item) => {
            $('#listAreaInspeccion').append(`<li class="mdc-list-item" data-value="${Item.Id}" >
                                    <span class="mdc-list-item__ripple"></span>
                                    <span class="mdc-list-item__text text-left">${Item.Description}</span>
                                </li>`)
        })

        AreaArray = response;

        if(AreaId>0){
            console.log('asignando')
            let object = AreaArray.filter(f=>f.Id == AreaId)[0];
            let index = AreaArray.indexOf(object);

            area_inspector.selectedIndex = index;
             // $('#anclaArea').trigger( "click" );
             // $('#anclaArea').focus();
             //  $('#lbArea').removeClass("mdc-floating-label");
             // $('#lbArea').addClass("mdc-floating-label mdc-floating-label--float-above"); estoy aqui
        }
    })
}

function getCollaboratorPerson() {
    console.log('activa autocomplete pe');
    let dni_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.dni-inspector'));

    let name_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.name-inspector'));

    let search_name = mdc.textField.MDCTextField.attachTo(document.querySelector('.search-inspector'));

    let hash_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.hash-inspector'));

    let job_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.job-inspector'));

    let email_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.correo-inspector')); 

    $("#search_name").autocomplete({
        change: function (event, ui) {
            if (ui.item === null) {

            }
        },
        source: function( request, response ) {
            var filter = $("#search_name").val();
            ///console.log(filter);
            var param= {filter:filter};
            var headers = {"Authorization":constantes.tokenClient,"apiKey":"r$3#23516ewew5"}
            $.ajax({
            url: "https://s3cur17y7454-prd-access-security.azurewebsites.net/api/Get-Collaborator?code=RLDaPd/6ulmvJ9tL7fpLii9J/twr3nwXyJZTxs1g1Jxq8q7sc6WjzA==&httpmethod=objectlist",
            //dataType: "json",
            method:"post",
            data : JSON.stringify(param),
            processData:false,
            crossDomain: true,
            async: true,
            headers : headers,
            success: function( data ) {
                var array =[];
                data =  JSON.parse(data);
                data.value.forEach(item => {
                    var json ={}
                    json.name = toCapitalize(item.givenName +' '+ item.surname);
                    json.label = toCapitalize(item.displayName);
                    json.value = item.objectId;
                    json.id = item.objectId;
                    json.firstname = item.givenName;
                    json.lastname = item.surname;
                    json.identity_document = item.identity_document;
                    json.job = item.jobTitle;
                    json.email = item.userPrincipalName;
                    array.push(json);
                });
                //console.log(array);
                response(array);
            }
            });
        },
        minLength: 3,
        select: function( event, ui ) {
            event.preventDefault();
            search_name.value = '';
            name_inspector.value = ui.item.label;
            hash_inspector.value = ui.item.id;
            dni_inspector.value = ui.item.identity_document;
            job_inspector.value = ui.item.job;
            email_inspector.value = ui.item.email;
        },
        open: function() {
            $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
            $(".ui-autocomplete").css({'z-index':'10100'});
        },
        close: function() {
            $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
        },
        search: function () {
            $("#spinnerLoadColaborador").show();
        },
        response: function () {
            $("#spinnerLoadColaborador").hide();
        }
    });
}

function saveInspector()
{
    let datos = []
    let validar = false
    let register_type         = mdc.select.MDCSelect.attachTo(document.querySelector('.register-type'));
    let unidad_inspector      = mdc.select.MDCSelect.attachTo(document.querySelector('.unidad-inspector'));
    let sede_inspector        = mdc.select.MDCSelect.attachTo(document.querySelector('.sede-inspector'));
    let area_inspector        = mdc.select.MDCSelect.attachTo(document.querySelector('.area-inspector'));
    let dni_inspector         = mdc.textField.MDCTextField.attachTo(document.querySelector('.dni-inspector'));
    let name_inspector        = mdc.textField.MDCTextField.attachTo(document.querySelector('.name-inspector'));
    let lastname_inspector    = mdc.textField.MDCTextField.attachTo(document.querySelector('.lastname-inspector'));
    let rol_inspector         = mdc.select.MDCSelect.attachTo(document.querySelector('.rol-inspector'));
    let search_name           = mdc.textField.MDCTextField.attachTo(document.querySelector('.search-inspector'));
    let hash_inspector        = mdc.textField.MDCTextField.attachTo(document.querySelector('.hash-inspector'));
    let user_inspector        = mdc.textField.MDCTextField.attachTo(document.querySelector('.user-inspector'));
    let pass_inspector        = mdc.textField.MDCTextField.attachTo(document.querySelector('.pass-inspector'));
    let job_inspector         = mdc.textField.MDCTextField.attachTo(document.querySelector('.job-inspector'));
    let email_inspector       = mdc.textField.MDCTextField.attachTo(document.querySelector('.correo-inspector')); 

    datos.register_type      = register_type.value
    datos.unidad_inspector   = unidad_inspector.value
    datos.sede_inspector     = sede_inspector.value
    datos.area_inspector     = area_inspector.value
    datos.dni_inspector      = dni_inspector.value
    datos.name_inspector     = name_inspector.value
    datos.lastname_inspector = lastname_inspector.value
    datos.rol_inspector      = rol_inspector.value
    datos.search_name        = search_name.value
    datos.hash_inspector     = hash_inspector.value
    datos.user_inspector     = user_inspector.value
    datos.pass_inspector     = pass_inspector.value
    datos.job_inspector      = job_inspector.value
    datos.email      = email_inspector.value

    if(datos.register_type==1)
    {
        validar = (datos.dni_inspector!="" && datos.hash_inspector!="" && datos.job_inspector!="" && datos.name_inspector!="" && datos.unidad_inspector!=0 && datos.sede_inspector!=0 && datos.area_inspector!=0 && datos.rol_inspector!=0 )
            ? true
            : false
    }
    if(datos.register_type==2)
    {
        validar = (datos.dni_inspector!="" && datos.job_inspector!="" && datos.name_inspector!="" && datos.lastname_inspector!="" && datos.user_inspector!="" && datos.pass_inspector!="" && datos.unidad_inspector!=0 && datos.sede_inspector!=0 && datos.area_inspector!=0 && datos.rol_inspector!=0 )
            ? true
            : false
    }
    //console.warn("validar datos a enviar -> ",datos,validar)
    if(validar)
    {
        //console.warn("Agregar Inspector")
        //$('#modal-programar-inspeccion').removeClass('modal_confirmacion__active')
        $('#modal-confirmacion-inspector').addClass('modal_confirmacion__active')
        //modal-agregar-inspector
    }
    else
    {
        //alert("Completar los campos obligatorios (*)")
        let msj   = "Falta completar campos obligatorios (*):"
        let count = 0
        if(datos.register_type!=1&&datos.register_type!=2)
        {
            msj = (count==0) ? msj+" Tipo de Registro" : msj+", Tipo de Registro"
            count++
        }
        if(datos.dni_inspector=="")
        {
            msj = (count==0) ? msj+" Documento de Identidad" : msj+", Documento de Identidad"
            count++
        }
        if(datos.job_inspector=="")
        {
            msj = (count==0) ? msj+" Cargo" : msj+", Cargo"
            count++
        }
        if(datos.name_inspector=="")
        {
            msj = (count==0) ? msj+" Nombres" : msj+", Nombres"
            count++
        }
        if(datos.lastname_inspector=="" && datos.register_type==2)
        {
            msj = (count==0) ? msj+" Apellidos" : msj+", Apellidos"
            count++
        }
        if(datos.user_inspector=="" && datos.register_type==2)
        {
            msj = (count==0) ? msj+" Usuario" : msj+", Usuario"
            count++
        }
        if(datos.pass_inspector=="" && datos.register_type==2)
        {
            msj = (count==0) ? msj+" Contraseña" : msj+", Contraseña"
            count++
        }
        if(datos.unidad_inspector=="")
        {
            msj = (count==0) ? msj+" Unidad de Negocio" : msj+", Unidad de Negocio"
            count++
        }
        if(datos.sede_inspector=="")
        {
            msj = (count==0) ? msj+" Sede" : msj+", Sede"
            count++
        }
        if(datos.area_inspector=="")
        {
            msj = (count==0) ? msj+" Área" : msj+", Área"
            count++
        }
        if(datos.rol_inspector=="")
        {
            msj = (count==0) ? msj+" Rol" : msj+", Rol"
            count++
        }


        swal("Error!", msj, "error");
    }
}

function saveInspectorConfirmar(){

    let register_type = mdc.select.MDCSelect.attachTo(document.querySelector('.register-type'));
    let unidad_inspector = mdc.select.MDCSelect.attachTo(document.querySelector('.unidad-inspector'));
    let sede_inspector = mdc.select.MDCSelect.attachTo(document.querySelector('.sede-inspector'));
    let area_inspector = mdc.select.MDCSelect.attachTo(document.querySelector('.area-inspector'));
    let dni_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.dni-inspector'));
    let name_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.name-inspector'));
    let lastname_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.lastname-inspector'));
    let rol_inspector = mdc.select.MDCSelect.attachTo(document.querySelector('.rol-inspector'));
    let search_name = mdc.textField.MDCTextField.attachTo(document.querySelector('.search-inspector'));
    let hash_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.hash-inspector'));
    let user_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.user-inspector'));
    let pass_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.pass-inspector'));
    let job_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.job-inspector'));
    let email_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.correo-inspector')); 

    let url = "";

    if($("#idhidden").val()!=null&&$("#idhidden").val()!=""){
        url = apiUrlssoma+`/api/Post-Inspector?code=qt8UXeyrqguG0j2a0YFbbXpmInsRuM/Y2sceB7UwAXpVKJbwHh/sKA==&httpmethod=put&id=`+$("#idhidden").val();
    }else{
        url = apiUrlssoma+`/api/Post-Inspector?code=qt8UXeyrqguG0j2a0YFbbXpmInsRuM/Y2sceB7UwAXpVKJbwHh/sKA==&httpmethod=post`;
    }
    let headers = {
        "apikey":constantes.apiKey,
    }
    let storage = getStorage("usuario", "json");
    let area_responsible = 0
    if(document.getElementById('responsable-de-area').checked){
        area_responsible = 1
    }
    let data = {
        id: $("#idhidden").val(),
        idhash: hash_inspector.value,
        person_type: register_type.value,
        person_rol: rol_inspector.value,
        firstname: name_inspector.value,
        lastname: lastname_inspector.value,
        userResponsible: user_inspector.value,
        passResponsible: pass_inspector.value,
        area_id: area_inspector.value,
        sede_id: sede_inspector.value,
        created_by: storage.idhash,
        last_updated_by: storage.idhash,
        identity_document: dni_inspector.value,
        userAttribute2:1,
        area_responsible:area_responsible,
        job: job_inspector.value,
        email: email_inspector.value
    };
    console.log("data->",data);

    $.ajax({
        method: "POST",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
        data: JSON.stringify(data),
    }).done(function (response) {
        console.warn("response",response)
        if(response.error ==0){
            cerrarAgregarInspector()
            $('#modal-programar-inspector').removeClass('modal_confirmacion__active')
            $('#modal-save-inspector').addClass('modal_confirmacion__active')
            $('#modal-confirmacion-inspector').removeClass('modal_confirmacion__active')
            listInspectores();
        }else if(response.error == 1){
            $('#modal-confirmacion-inspector').removeClass('modal_confirmacion__active')
            $('#errMessage').html(response.message);
            $('#modal-confirmacion__error').addClass('modal_confirmacion__active')
        }

    })
}

function CerrarModalSaveInspector(){
    $('#modal-save-inspector').removeClass('modal_confirmacion__active')

}

function EditarInspector(PersonType,PersonName,Role,AreaId,SedeId,UnitId,AreaResponsible,UserName,pName,lName,Id,Hash,IdentityDocument,Job,Email){
    console.log("entro a editar")
    
   AgregarInspector();

    console.log(PersonType,PersonName,Role,AreaId,SedeId,UnitId,AreaResponsible,UserName,pName,lName,Id,Hash,IdentityDocument);
    let register_type = mdc.select.MDCSelect.attachTo(document.querySelector('.register-type'));
    let unidad_inspector = mdc.select.MDCSelect.attachTo(document.querySelector('.unidad-inspector'));
    let sede_inspector = mdc.select.MDCSelect.attachTo(document.querySelector('.sede-inspector'));
    let area_inspector = mdc.select.MDCSelect.attachTo(document.querySelector('.area-inspector'));
    let dni_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.dni-inspector'));
    let name_inspector;
    let lastname_inspector;

    
     name_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.name-inspector'));
    
    // if((pName == null)||(pName == 'null'))//andy
    // {
    //  name_inspector = PersonName;
    //  // alert('pnamexx ='+pName)
    // }


    
     lastname_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.lastname-inspector'));
    
    
// if((lName == null)||(lName == 'null'))//andy
//     {
//      lastname_inspector = PersonName;
//     //alert('lNameyy='+lName)
//     }


    //let lastname_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.lastname-inspector'));


    let rol_inspector = mdc.select.MDCSelect.attachTo(document.querySelector('.rol-inspector'));
    let search_name = mdc.textField.MDCTextField.attachTo(document.querySelector('.search-inspector'));
    let hash_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.hash-inspector'));
    let user_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.user-inspector'));
    let pass_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.pass-inspector'));
    let job_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.job-inspector'));

   


    let email_inspector = mdc.textField.MDCTextField.attachTo(document.querySelector('.correo-inspector')); 
    //console.clear();

    //console.log("1348:",email_inspector);

    //alert(Email);


//alert(PersonType);
    if(PersonType == 1){
        register_type.selectedIndex = 1;
        name_inspector.value = PersonName.toLowerCase();
    }else if(PersonType == 2){
        register_type.selectedIndex = 2;
        name_inspector.value = pName.toLowerCase();
        lastname_inspector.value = lName.toLowerCase();

         
    }

    if(Role == 39){
        rol_inspector.selectedIndex = 1;
    }else if(Role == 43){
        rol_inspector.selectedIndex = 2;
    }else if(Role == 44){
        rol_inspector.selectedIndex = 3;
    }

    if(AreaResponsible==1){
        $("#responsable-de-area").attr("checked",true);
    }else{
        $("#responsable-de-area").attr("checked",false);
    }

   
    //user_inspector.value = UserName;



   // alert(UserName);

      if((UserName == null)||(UserName == 'null'))//andy
    {
         user_inspector.value =" "
    }else{ user_inspector.value = UserName.toLowerCase();}


    if((Email == null)||(Email == 'null'))//andy
    {
         email_inspector.value =" "
    }else{ email_inspector.value = Email;}


    if(UnitId!=null){
        console.log('asignando')
        let object = UnitsArray.filter(f=>f.Id == UnitId)[0];
        let index = UnitsArray.indexOf(object);

        unidad_inspector.selectedIndex = index;

        getListSede(UnitId,SedeId,AreaId);


        sede_inspector.selectedIndex = SedeId;//ANDY 26-05-2021

        //$('#anclaSede').trigger( "click" );

        //alert('SedeId ='+SedeId);
    }

    if(IdentityDocument!="null"){dni_inspector.value=IdentityDocument;
    }else{dni_inspector.value='';}

    hash_inspector.value = Hash;

    //alert(Job);
    // if((Job!="null")&&(Job != 'null'))
    //     {job_inspector.value = Job;}
    // else{job_inspector.value='';}


//alert(Job);
    if((Job=="null")||(Job == null))
        {  job_inspector.value='xxxxx';  }
    else{  job_inspector.value = Job; }

    $("#idhidden").val(Id);

  

    var partes = PersonName.split(" ");
    var n = partes.length;
    var nombress ='';
    var appellidos = '';
    if(n ==2){nombress = partes[0].toLowerCase();  appellidos = partes[1].toLowerCase();}
    if(n >3){nombress = partes[0].toLowerCase()+' '+partes[1].toLowerCase();  appellidos = partes[2].toLowerCase()+' '+partes[3].toLowerCase();}



    if((pName == null)||(pName == 'null')){name_inspector.value = nombress.toLowerCase();}
    if((lName == null)||(lName == 'null')){lastname_inspector.value = appellidos.toLowerCase();}

    //$("#tx_name").val(PersonName)
    
}








function getTokenClient () {
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
        url: "https://s3cur17y7454-prd-access-security.azurewebsites.net/api/AuthClientCredentials?code=/op2e7jeHfWUM69VHN/WBlIWf98Xa43lXtVE1eShEBNKGkCiLALisg=="
    })
    .done(function( data, textStatus, jqXHR )
    {
        //TOKEN_CLIENT
        console.log(data.access_token);
        constantes.tokenClient = data.access_token;
        getCollaboratorPerson();
        //alert(TOKEN_CLIENT)
        //getCollaborator();
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
        console.log();
    });
}

function BuscarInspector(){
    let buscarInspector = $('#buscarInspector').val();

}

function filtrarInstores(){
    let buscarInspector = $('#buscarInspector').val();
    let selectUnidadNegocioFiltro = $('#selectUnidadNegocioFiltro').val();
    let selecSedeFiltro = $('#selecSedeFiltro').val();
    let selectAreafiltro = $('#selectAreafiltro').val();
    let selectRolfiltro = $('#selectRolfiltro').val();

    let filtros = ''

    if(buscarInspector != ''){
        filtros += '&person_name='+buscarInspector;
    }

    if(selectUnidadNegocioFiltro != ''){
        filtros += '&unit_id='+selectUnidadNegocioFiltro;
    }

    if(selecSedeFiltro != ''){
        filtros += '&sede_id='+selecSedeFiltro;
    }


    if(selectRolfiltro != ''){
        filtros += '&role='+selectRolfiltro;
    }

    if(selectAreafiltro != ''){
        filtros += '&area_id='+selectAreafiltro;
    }

    let url = apiUrlssoma+`/api/Get-Inspector?httpmethod=objectlist&code=57N70WaHZQGjp8Wr/aXfyir5sz4KwDyCYdXKTWkE/e7YDa/sAZamzA==${filtros}`
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
                var html = TemplateListInspectores(data);
                $('#body-tabla-list').html(html);
            }
        })

    })
}

function BuscarInspectorName(){
    let buscarInspector = $('#buscarInspector').val();
    let url = apiUrlssoma+`/api/Get-Inspector?httpmethod=objectlist&code=57N70WaHZQGjp8Wr/aXfyir5sz4KwDyCYdXKTWkE/e7YDa/sAZamzA==&person_name=${buscarInspector}`
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
        $('#pagination-container').pagination({
            dataSource: response,
            pageSize: 8,
            callback: function(data, pagination) {
                var html = TemplateListInspectores(data);
                $('#body-tabla-list').html(html);
            }
        })

    })
}

