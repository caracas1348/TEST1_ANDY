// alert("en crearAuditorias.js")
//var id_programa_auditoria;
//var nombre_programa_auditoria;
//var id_codigo_especialidad_programa;
//-------------------------------new
var Flag_Completada           = '';   // flag_completada del programa de auditoria
var StatusIdPA                = '';   // StatusId del programa de auditoria
var id_auditoria;
var codeAuditoria;
var sel_new_normas            =[];
var normas                    =[];
var normasText                =[];
var normasCode                =[];
var unidad_auditoria;
var sede;
var sedeText;
var sedeDescription;
var tipo_auditoria;
var date_start;
var date_end;
var auditor                   =[];
var cant                      =0;
var jsonUnidadesOrganizativas =[];
var jsonSedes                 =[];
var jsonNormas                =[];
var jsonTipoAuditoria         =[];
var oTableAuditorias;
var cont_auditorias           =0;
var datosTabla;
var UnidadNegocio;
var idUnidadNegocioFiltro;
var idUnidadNegocioNewAuditoria;
var StatusId;
var DescriptionStatus;
var auditoriaModificacionLog  =[];
var auditoriaObservacionesLog =[];
var auditoriaObservacion      ="";
var auditoriaHistorial        =[];
var hayAuditoriasCorregidas   = 0;
var hayAuditoriasObservadas   = 0;
var hayAuditoriasAprobadas    = 0;
var hayAuditoriasSinEvaluzacion = 0;
var EstatusEvaluacionId         = 0;
var CantidadCorrecciones = 0;
var PAGE_SEL = 1; //indica la pagina del paginador desde donde se invoca el llamado


var vw_evaluar_auditorias_list = function(){

    /**
     * [getDataProgramaAuditoria obtenemos los datos del programa de auditoria]
     * @return {[type]} [description]
     */
    var getDataProgramaAuditoria = function(){
        var settings = {
            "url": apiurlAuditoria+"/api/Get-Programa_Auditoria-All?code=X4XURduZbR20wwsOaEVVs4trLnrmd4mfO3KtqksohFm5bQQPqoO10g==&httpmethod=objectlist&Id="+id_programa_auditoria,
            "method": "GET",
            "timeout": 0,
            "crossDomain": true,
            "dataType": "json",
            "headers": {
                "apiKey": "r$3#23516ewew5",
                "Content-Type": "application/json",
                "Cookie": "ARRAffinity=a5d70da53a79873e99939890b4a077f907b6a8d8fb6a065c0333227042886e3b"
            },
            "data": JSON.stringify({}),
        };

        $.ajax(settings).done(function (response) {
            //RECORREMOS LA RESPUESTA
            console.warn("response ",response)
            console.warn("response[0].Flag_Completada ",response[0].Flag_Completada)
            console.warn("response[0].StatusId ",response[0].StatusId)
            response.forEach((Item) => {
                EVFlag_Completada = Item.Flag_Completada
                EVStatusIdPA      = Item.StatusId
                DescriptionEspecialidad  = Item.DescriptionEspecialidad
                CantidadCorrecciones  = Item.Cantidad_Correcciones
                IdPAEV = Item.Id
            }) //*/
        })
        .always(function( jqXHR, textStatus, errorThrown ) {
            console.warn("Flag_Completada ",EVFlag_Completada)
            console.warn("StatusIdPA ",EVStatusIdPA)
            console.warn("CantidadCorrecciones ",CantidadCorrecciones)
            console.warn("IdPAEV ",IdPAEV)

        });

    }
    /**
     * [getAuditoriaModificacionLog OBTENEMOS EL HISTORIAL DE MODIFICACIONES DE LAS AUDITORIAS]
     * @return {[type]} [description]
     */
    var getAuditoriaModificacionLog = function(){
        auditoriaModificacionLog  = [];
        console.log("auditoriaModificacionLog",auditoriaModificacionLog)
        var settings = {
            "url": apiurlAuditoria+"/api/Get-Auditoria_Modificacion_Log-All?code=7jsdVKH8Qz4bKFXpaOWQQFWtwxL4ijawwH6TL7edDHnqd0YsvfdW7g==&httpmethod=objectlist",
            "method": "GET",
            "timeout": 0,
            "crossDomain": true,
            "dataType": "json",
            "headers": {
                "apikey": "r$3#23516ewew5",
                "Content-Type": "application/json",
                "TipoModificacionId": "0",
                //"Cookie": "ARRAffinity=cbcbb28fd2b5571d2e51eda0a038519f40946633598d1de8dd8a535c13a84dea"
            },
        };

        // HACEMOS LA SOLICUTID DE LOS DATOS AL SERVIDOR
        $.ajax(settings).done(function (response) {
            //RECORREMOS LA RESPUESTA
            response.forEach((Item) => {
                // LLENAMOS EL ARRAY CON TODAS LAS MODIFICACIONES DE AUDITORIAS
                auditoriaModificacionLog.push(Item)
            })

        });

    }

    /**
     * [getObservacionesAuditorias obtener las observaciones registradas en el sistema]
     * @return {[type]} [description]
     */
    var getObservacionesAuditorias = function() {
        auditoriaObservacionesLog = [];

        var settings = {
            "url": apiurlAuditoria+"/api/Get-Observacion_Auditoria-All?code=USTkprfiPea9NXKlJtaJEA43TdAWtgLspeX0sE0di0DoEOfFE4f07A==&httpmethod=objectlist",
            "method": "GET",
            "timeout": 0,
            "crossDomain": true,
            "dataType": "json",
            "headers": {
                "apikey": "r$3#23516ewew5",
                "Content-Type": "application/json",
            },
        };

        $.ajax(settings).done(function (response) {

            //RECORREMOS LA RESPUESTA
            response.forEach((Item) => {
                // LLENAMOS EL ARRAY CON TODAS LAS MODIFICACIONES DE AUDITORIAS
                auditoriaObservacionesLog.push(Item)
            })

        });
    }

    // defimir los inputs text como datetime pero no esta funcionando
    /*var definirInputsDate = function(){
        console.log("definar inpus con datetimepicker")
        $("#tx_filter_date_init").datetimepicker({
            timepicker:false,
            format:'d/m/Y',
            //minDate: 0
        });
        var nowdate = moment().format("DD/MM/YYYY");
        console.log("nowdate",nowdate)
        $('#tx_filter_date_init').val(nowdate);
        console.log("tx_filter_date_init",$("#tx_filter_date_init").val())

        $("#tx_filter_date_end").datetimepicker({
            timepicker:false,
            format:'d/m/Y',
            minDate: 0
        });
        $('#tx_filter_date_end').val(nowdate);
    }//*/

    // INICIALIZAMOS EL SELECT DE ESTADOS DE LA AUDITORIA
    var cargarSelectStatusAuditoria = function(){
        var servicio = '/api/GetStatus_Auditoria?code=';
        var getStatusAuditoria = "QunwZ0j56jljksBrF3QtFYnaou6l7bF8zolp0ZvfXKQEQ5NwPGhHHQ==";
        var metodoHttp = "objectlist";
        var metodoAjax =  "GET";
        var url = apiurlAuditoria+servicio+getStatusAuditoria+"&httpmethod="+metodoHttp;  //Todas las normas
        //var url = apiurlAuditoria+servicio+GetNormasAll+"&EspecialidadId="+id_codigo_especialidad_programa+"&httpmethod="+metodoHttp;
        var headers ={
            "apikey":constantes.apiKey
        }

        var settings = {
            "url": apiurlAuditoria+"/api/Get-Status_Auditoria-All?code=066JGAvFAHugXr5JRHMQpKd408bUgy31F0c3FJ5dPraS2fxhgVrSzQ==&httpmethod=objectlist",
            "method": "GET",
            "timeout": 0,
            "crossDomain": true,
            "dataType": "json",
            "headers": {
                "apikey": "r$3#23516ewew5"
            },
        };

        $.ajax(settings).done(function (response) {

            $("#sel_estado_evaluacion").html(`<option disabled selected value=''>Selecione</option>`);
            response.map(function(item)
            {
                $("#sel_estado_evaluacion").append(`<option value='${item.Id}'>${item.Description}</option>`);
            });
        });

    }//*/

    // INICIALIZAMOS LOS SELECT DE LAS NORMAS
    /*var cargarSelectsNormas = function(){

        //var apiKeyx = "r$3#23516ewew5";
        var servicio = '/api/Get-Norma-All?code=';
        //var getNormaAll = "QunwZ0j56jljksBrF3QtFYnaou6l7bF8zolp0ZvfXKQEQ5NwPGhHHQ==";
        var metodoHttp = "objectlist";
        var metodoAjax =  "GET";
        //var url = apiurlAuditoria+servicio+GetNormasAll+"&httpmethod="+metodoHttp;  //Todas las normas
        var url = apiurlAuditoria+servicio+GetNormasAll+"&EspecialidadId="+id_codigo_especialidad_programa+"&httpmethod="+metodoHttp;
        var headers ={
            "apikey":constantes.apiKey
        }

        $.ajax({
            method: metodoAjax,
            url:  url,
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function( data)
        {

          jsonNormas=[];
          data.map(function(item)
          {
                $("#sel_new_normas").append(`<option code='${item.Code}' value='${item.Code}'>${item.Code}</option>`);
                //$("#sel_new_normas").append(`<option code='${item.Code}' value='${item.Id}'>${item.Description}</option>`);
                //$("#sel_new_normas").append(`<option value='${item.Code}'>${item.Code}</option>`);
                jsonNormas.push(item);
          });


        }).fail(function( jqXHR, textStatus, errorThrown ) {
            //showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
            //console.log(errorThrown)
            $("#sel_new_normas").hide();
        });
    }//*/

    // INICIALIZAMOS LOS SELECT DE LAS NORMAS
    var cargarSelectTipoAuditoria = function(){
        //console.log("cargaremos los selects de las NORMAS")
        //var apiKeyx = "r$3#23516ewew5";
        var servicio = '/api/Get-Tipo_Auditoria-All?code=';
        //var getNormaAll = "QunwZ0j56jljksBrF3QtFYnaou6l7bF8zolp0ZvfXKQEQ5NwPGhHHQ==";
        var metodoHttp = "objectlist";
        var metodoAjax =  "GET";
        var url = apiurlAuditoria+servicio+GetTipoAuditoriaAll+"&httpmethod="+metodoHttp;
        var headers ={
            "apikey":constantes.apiKey
        }

        $.ajax({
            method: metodoAjax,
            url:  url,
            headers:headers,
            crossDomain: true,
            dataType: "json",
        })
        .done(function( data)
        {
          //$("#sel_new_tipo_auditoria").append("<option value='' disabled selected>Seleccionar</option>");
          jsonTipoAuditoria=[];
          data.map(function(item)
          {
                $("#sel_new_tipo_auditoria").append(`<option Code='${item.Code}' value='${item.Id}'>${item.Description}</option>`);
                //$("#sel_new_tipo_auditoria").append(`<option value='${item.Code}'>${item.Code}</option>`);
                jsonTipoAuditoria.push(item);
          });
          console.log("jsonTipoAuditoria",jsonTipoAuditoria)

        }).fail(function( jqXHR, textStatus, errorThrown ) {
            //showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
            //console.log(errorThrown)
            $("#sel_new_tipo_auditoria").hide();
        });
    }

    /**
     * [cargarSelectsUnidadesOrganizativas CARGAR SELECTS DE LAS UNIDADES DE NEGOCIO
     * DEL FILTRO Y DE LA MODAL NUEVA AUDITORIA]
     * @return {[type]} [description]
     */
    var cargarSelectsUnidadesOrganizativas = function(){
        //console.log("cargaremos los selects de unidades organizativas")

        var servicio = '/api/Get-Unidad_Negocio-All?code=';
        var metodoHttp = "objectlist";
        var metodoAjax =  "GET";
        var url = apiurlAuditoria+servicio+GetUnidadesOrganizativasAll+"&httpmethod="+metodoHttp;
        var headers ={
            "apikey":constantes.apiKey
        }
        //console.log("constantes.apiKey: "+constantes.apiKey, "apiKeyx",apiKeyx)
        $.ajax({
            method: metodoAjax,
            url:  url,
            headers:headers,
            crossDomain: true,
            dataType: "json",
        })
        .done(function( data)
        {
            $("#sel_unidad_organizativa_evaluacion").html("<option value='' selected>Todas</option>");

            jsonUnidadesOrganizativas=[];
            data.map(function(item)
            {
                $("#sel_unidad_organizativa_evaluacion").append(`<option description='${item.Description}' value='${item.Id}'>${item.Code}</option>`);
                jsonUnidadesOrganizativas.push(item);
            });
            //console.log("json",jsonUnidadesOrganizativas)

        }).fail(function( jqXHR, textStatus, errorThrown ) {
            //showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
            //console.log(errorThrown)
            $("#sel_unidad_organizativa_evaluacion").hide();
        });
    }

/**
     * [getSedesAll obtener todas las sedes ]
     * @return {[type]} [description]
     */
    var getSedesAll = function (){
        jsonSedes = []

        var settings = {
            "url": apiurlAuditoria+"/api/Get-Sede-All?code=0N470WSSjrIb6hhHAsgBHgS8wplALMbCB6KcP5FmsjFDvjQkcaaWbw==&httpmethod=objectlist",
            "method": "GET",
            "timeout": 0,
            "crossDomain": true,
            "dataType": "json",
            "headers": {
                "apikey": "r$3#23516ewew5",
                "Content-Type": "application/json",
                //"Cookie": "ARRAffinity=cbcbb28fd2b5571d2e51eda0a038519f40946633598d1de8dd8a535c13a84dea"
            },
        };

        // HACEMOS LA SOLICUTID DE LOS DATOS AL SERVIDOR
        $.ajax(settings).done(function (response) {
            $("#sel_sede_evaluacion").html("<option value='0'  selected>Seleccionar</option>")
            //RECORREMOS LA RESPUESTA
            response.forEach((Item) => {
                // llenamos el select del filtro correspondiente a las sedes
                $("#sel_sede_evaluacion").append(`<option description='${Item.Description}' value='${Item.Id}'>${Item.Code}</option>`);
                // LLENAMOS EL ARRAY CON TODAS LAS MODIFICACIONES DE AUDITORIAS
                jsonSedes.push(Item)
            })

        })
        .always(function( jqXHR, textStatus, errorThrown ) {
            //console.log("jsonSedes",jsonSedes)
        });

    }

    /**
     * [cargarSelectSedesFilter cargar el select de las sedes con el array jsonSedes]
     * @return {[type]} [description]
     */
    var cargarSelectSedesFilter = function (selectId){
        //console.log("entroooooooooo")
        var idUnidadNegocioFiltro = ""

        idUnidadNegocioFiltro = document.getElementById('sel_unidad_organizativa_evaluacion').value;

        // limpiar select unidad organizativa
        $("#"+selectId).html("<option value='0'  selected>Seleccionar</option>")
        for(i in jsonSedes){
            //console.log("i: "+i, jsonSedes[i].Code)

            if(idUnidadNegocioFiltro==0){
                $("#"+selectId).append(`<option description='`+jsonSedes[i].Description+`' value='`+jsonSedes[i].Id+`'>`+jsonSedes[i].Code+`</option>`);
            }
            else {
                if(idUnidadNegocioFiltro==jsonSedes[i].UnidadNegocioId){
                    $("#"+selectId).append(`<option description='`+jsonSedes[i].Description+`' value='`+jsonSedes[i].Id+`'>`+jsonSedes[i].Code+`</option>`);
                }
            }

        }
        //*/

    }

    var validarFechas = function(){
        var fechaDesde = ""
        var fechaHasta = ""
        var parts      = ""


        parts = $("#tx_date_init").val().split("/");
        fechaDesde = new Date(parts[2], parts[1] - 1, parts[0]);
        parts = $("#tx_date_end").val().split("/");
        fechaHasta = new Date(parts[2], parts[1] - 1, parts[0]);

        if(fechaDesde >= fechaHasta){
            $("#tx_date_end").val($("#tx_date_init").val())
        }

    }


    // CARGAR LA TABLA CON EL ESTILO DE DIVS
    var tablaDivsAuditorias = function(){
        showLoading();
        //var now  = moment().format('YYYY-MM-DD');
        var UnidadNegocioId = $("#sel_unidad_organizativa_evaluacion").val()
        var Inicio          = $("#tx_date_init").val().split('/').reverse().join('-')
        var Fin             = $("#tx_date_end").val().split('/').reverse().join('-')
        var SedeId          = $("#sel_sede_evaluacion").val()
        var StatusId        = $("#sel_estado_evaluacion").val()
        var filtro          = "";
        console.log("UnidadNegocioId ",UnidadNegocioId, "Inicio ",Inicio, "Fin ",Fin, "SedeId ",SedeId, "StatusId ",StatusId)
        if(UnidadNegocioId>0)
            filtro+= "&UnidadNegocioId="+UnidadNegocioId
        if(SedeId>0)
            filtro+= "&SedeId="+SedeId
        if(StatusId>0)
            filtro+= "&StatusId="+StatusId
        if(Inicio!="")
            filtro+= "&Fecha_Desde="+Inicio
        if(Fin!="")
            filtro+= "&Fecha_Hasta="+Fin//*/
        console.warn("filtro",filtro)
        //----------------------PARAMETROS PARA EL SERVICIO LISTAR AUDITORIAS DE UN PROGRAMA POR SU ID-------------------------------
        var servicio        = '/api/Get-Auditoria-All?code=';
        var metodoHttp      = "objectlist";
        var metodoAjax      =  "GET";
        var getAuditoriaAll ="H4VLj4KN6GZdCduqoToDVkDdP56Fz4t10niae2jucl8sXGaKz6bFuQ==";
        var url             = apiurlAuditoria+servicio+getAuditoriaAll+"&ProgramaAuditoriaId="+id_programa_auditoria+"&httpmethod="+metodoHttp+filtro;
        var metodoAjaxGp    =  "GET"; //"POST";
        var headers         ={
            "apikey":constantes.apiKey
        }

        $.ajax({
            method: metodoAjaxGp,
            url:  url,
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function (response) {

            if (response.length > 0) $('.body-tabla').addClass('hidden')

            $('#cantidad').text(response.length)
            $('#body-tabla-list').html("")


            $('#pagination-container').pagination({
                dataSource: response,
                pageSize: 5,
                callback: function(data, pagination) {
                    var html = templateListEvaluacionAuditorias(data);
                    $('#body-tabla-list').html(html);
                }
            })//*/
            hideLoading();

        })
        .always(function( jqXHR, textStatus, errorThrown ) {

            hideLoading();
            $('#pagination-container').pagination('go', PAGE_SEL)
        });

    }

    // para el paginado....
    var templateListEvaluacionAuditorias = function(data){
        var html = '';
        console.log("data ",data)

        data.forEach((Item)=>{

            var colorLetra  = "";
            var startDate   = moment(Item.Inicio).format('DD/MM/YYYY');//dddd
            var endDate     = moment(Item.Fin).format('DD/MM/YYYY');//dddd
            var year        = moment(Item.Inicio).format('YYYY');//dddd
            var month       = moment(Item.Inicio).format('MM');//
            var day         = moment(Item.Inicio).format('DD'); ;
            var startDate2  = year +"-"+ month +"-"+ day;
            year            = moment(Item.Fin).format('YYYY');//dddd
            month           = moment(Item.Fin).format('MM');//
            day             = moment(Item.Fin).format('DD');
            var endDate2     = year +"-"+ month +"-"+ day;

            // EVALUAMOS EL ESTADO DE LA EVALUACIONES PARA ASIGNAR LA CLASE CORRESPONDIENTE
            if(Item.StatusEvaluacionId==0) {
                Item.DescriptionStatusEvaluacion = '---'
                hayAuditoriasSinEvaluzacion++ // observadas
            }
            if(Item.StatusEvaluacionId==1){
                hayAuditoriasObservadas++ // observadas
                colorLetra = "textoObservadaCA"
            }
            if(Item.StatusEvaluacionId==2) {
                hayAuditoriasCorregidas++ // corregidas
                colorLetra = "textoCorregidaCA"
            }
            if(Item.StatusEvaluacionId==3){
                hayAuditoriasAprobadas++ // Aprobadas
                colorLetra = "textoAprobadaCA"
            }

            var  iconAprob=`<img src="./images/iconos/aprobarvoid.svg" class="ojo-1">`;
            var  iconObs=`<img src="./images/iconos/iconObs.svg" class="ojo-1">`;
            var event1=`onClick="vw_evaluar_auditorias_list.aprobarAuditoriaEvaluacion('${Item.Id}');"`;
            var event2=`onClick="vw_evaluar_auditorias_list.observarAuditoriaEvaluacion('${Item.Id}','${Item.Observacion}','${CantidadCorrecciones}','${Item.StatusEvaluacionId}')"`;
            var btnObs=""
            if(Item.StatusEvaluacionId==3 )
            {
                iconAprob=`<img src="./images/iconos/aprobarbien.svg" class="ojo-1">`
                iconObs=`<img src="./images/iconos/aprobarvoid.svg" class="ojo-1">`
                event1="";
                event2="";
            }
            if(Item.StatusEvaluacionId==1 )
            {
                iconAprob=`<img src="./images/iconos/aprobarvoid.svg" class="ojo-1">`
                iconObs=`<img src="./images/iconos/iconObs.svg" class="ojo-1">`
                //event1="";
                //event2="";
            }
            if(CantidadCorrecciones>=2)
            {
                btnObs="disabled"
                console.log("Entro a cantidad de correciones")

            }else{
                console.log("NO entro a cantidad de correciones")
            }

            //$('#body-tabla-list').append(
                //no deberia llegar auditoría en estado nuevo aqui <div class="check-blue text-center">Nuevo</div>
            html += `
                <div class="item-tabla p-2" style="z-index: 1;display:relative;">
                    <div class="row m-0 justify-content-between align-items-center" style="font-size: 14px !important">
                        <div class="col-md-2 text-center" >${Item.Code}</div>
                        <div class="col-md-1 text-center" >${Item.DescriptionUnidadNegocio}</div>
                        <div class="col-md-1 text-center" >${Item.DescriptionSede}</div>
                        <div class="col-md-1 text-center" >${Item.Code_Normas}</div>
                        <div class="col-md-1 text-center" >${Item.DescriptionAuditoria}</div>
                        <div class="col-md-1 text-center" >${startDate}</div>
                        <div class="col-md-1 text-center" >${endDate}</div>
                        <div class="col-md-1 text-center" >${Item.DescriptionStatus}</div>
                        <div class="col-md-1 text-center ${colorLetra}" >${Item.DescriptionStatusEvaluacion}</div>

                        <div class="col-md-2" >
                            <div class="row">
                                <div class="col-6 text-center" style="font-size: 15px">
                                    <button class="btn-circle border-0 "
                                        src="./images/iconos/aprobarvoid.svg" ${event1}
                                        class="ojo-1">
                                        ${iconAprob} </button">
                                </div>

                                <div class="col-6 text-center" style="font-size: 15px">
                                    <button class="btn-circle border-0 "  ${btnObs}
                                        src="./images/iconos/aprobarvoid.svg" ${event2}
                                        class="ojo-1">
                                        ${iconObs} </button">

                                </div>
                            </div>
                        </div>

                    </div>
                </div>`
        })

        html += '';
        return html;

    }


    var idProgramaAud;
    var observarAuditoriaEvaluacion=function (id,obs,CantidadCorreccion,StatusEvaluacionId){

        idProgramaAud       = id;
        EstatusEvaluacionId = StatusEvaluacionId;
        console.warn("EstatusEvaluacionId: ",EstatusEvaluacionId)
        if(CantidadCorreccion<=2){
            $("#text_observacion").val(obs!='null'?obs:'')
            $('#modal-confim').addClass('modal_confirmacion__active')
        }else{
            swal("Error!!!","Este programa ya alcanzo el máximo de correciones permitidas dos (02)","error")
        }
            //$("#modal-confim").modal('show');
    }

    var confirmarEvaluacionAuditoria=function(){
        //alert("confirmar evaluacion")
        $("#nombre-programa").html(nombre_programa_auditoria)
    }

    var finalizeEvaluacion=function (){

        var body={
            "Id":id_programa_auditoria,
            "Flag_Completada":0,
            "Flag_Evaluador":1,
            "CantidadCorrecciones": CantidadCorrecciones,
            "Evaluador_name": getCookie("vtas_fullname"+sessionStorage.tabVisitasa),
            "Evaluador_code":getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
            "Last_Updated_By":getCookie("vtas_id_hash"+sessionStorage.tabVisitasa)
        }

              var url = apiurlAuditoria+"/api/Post-Programa_Auditoria-All?code=g38OQrxNikLSJIxsYIv03hTcmsYXfmMA7kanUqFykcdNNGAHwMGFQg==&httpmethod=finalize";

                var settings = {
                "url": url,
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "apikey": "r$3#23516ewew5",
                    "Content-Type": "application/json",
                    "Cookie": "ARRAffinity=1c7c284699ca6bef98fc17dbcd7e04e1431fa4dd45ab6d2bb105ddbb421edecc"
                },
                "data": JSON.stringify(body),
                };

                $.ajax(settings).done(function (response) {

                        console.warn("res",response)
                        var res = JSON.parse(response);
                        if (res.status)
                        {

                           $('#modal-exito-evaluacion').addClass('modal_confirmacion__active');
                            /*swal.close();
                            setTimeout(function(){
                              swal({
                                title: "Se finalizó con éxito la evaluación",
                                text: "Puedes retornar a tu bandeja de auditorías",
                                type: "success",
                                timer:2000,
                                showCancelButton: false,
                                confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
                                confirmButtonText: "De Acuerdo",
                                closeOnConfirm: false
                              });
                            },500)

                            setTimeout(function(){

                                handlerUrlhtml('contentGlobal','view/auditoria/evaluacionProgramaAuditoria.html','Evaluar Programa de Auditoría');

                              },2000)
                            //*/

                        }
                        else
                        {
                        //cerrarModal('modal-save');
                        swal("Error!", res.message, "error");
                        }

                });

    }

    var direccionarAlListado = function(){
        handlerUrlhtml('contentGlobal','view/auditoria/evaluacionProgramaAuditoria.html','Evaluar Programa de Auditoría');
    }

    var saveObservarAuditoriaEvaluacion=function (){

        if($("#text_observacion").val()=="")
        {
            return;
        }

        var body={
            "AuditoriaId":idProgramaAud,
            "Active":1,
            "Observacion":$("#text_observacion").val(),
            "Created_By":getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
            "Last_Updated_By":getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
        }

        // desabilitamos el boton al hacer clic
        //$('#btn-save-observar').prop('disabled', true);
        showLoading();

        if(EstatusEvaluacionId==1){
            console.warn("Actualizar la ultima observacion realizada.")
            var url = apiurlAuditoria+"/api/Post-Observacion_Auditoria-All?code=PnWLiDon3Yjf6raNH4JP/N2P7J7uXIEvJ1ZL3tU3ljDfVOEoHswwEQ==&httpmethod=put&AuditoriaId="+idProgramaAud;
        }else{
            console.warn("Registrar una nueva observacion.")
            var url = apiurlAuditoria+"/api/Post-Observacion_Auditoria-All?code=PnWLiDon3Yjf6raNH4JP/N2P7J7uXIEvJ1ZL3tU3ljDfVOEoHswwEQ==&httpmethod=post";
        }


        var settings = {
            "url": url,
            "method": "POST",
            "timeout": 0,
            "headers": {
                "apikey": "r$3#23516ewew5",
                "Content-Type": "application/json",
                "Cookie": "ARRAffinity=1c7c284699ca6bef98fc17dbcd7e04e1431fa4dd45ab6d2bb105ddbb421edecc"
            },
            "data": JSON.stringify(body),
        };

        console.log("body: ",body)
        console.log("url: ",url)
        console.log("EstatusEvaluacionId: ",EstatusEvaluacionId)
        $.ajax(settings).done(function (response) {
            hideLoading();

            if (response)
            {
                PAGE_SEL = $('#pagination-container').pagination('getSelectedPageNum');
                //$('#pagination-container').pagination('go', PAGE_SEL)

                tablaDivsAuditorias();
                $("#text_observacion").val("");
                $('#modal-confim').removeClass('modal_confirmacion__active');
                swal.close();
                setTimeout(function(){
                  swal({
                    title: "Se Observó la auditoría",
                    text: "Puedes retornar a tu bandeja de auditoías",
                    type: "success",
                    timer:2000,
                    showCancelButton: false,
                    confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
                    confirmButtonText: "De acuerdo",
                    closeOnConfirm: false
                  });
                },500)
            }
            else
            {
                //cerrarModal('modal-save');
                swal("Error!", "No se ha podido actualizar la lista.", "error");
            }

        }).always(function( jqXHR, textStatus, errorThrown ) {
            // habilitamos el boton al hacer clic
            //$('#btn-save-observar').prop('disabled', false);
            hideLoading();
        }); //*/
    }

    var aprobarAuditoriaEvaluacion=function (id){


        swal({
            title:"Aprobar",
            text: "¿Seguro que desea aprobar la auditoría?",
            type: "info",
            showCancelButton: true,
            confirmButtonClass: "btn-danger btn-sm",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            closeOnConfirm: true
          },
          function()

          {
            /* swal.close();
            setTimeout(function()
            {
              swal({
                  title: "Procesando...",
                  text: "Por favor espere.",
                  //timer: 3000,
                  type: "info",
                  showConfirmButton: false
                  });

            },100);  */

              var url = apiurlAuditoria+"/api/Post-Auditoria-All?code=l/Ucgq69Kj8Yur7Se2RlCYtWga8XKfd8TuLSma8pYoGnsP/GqJO81g==&httpmethod=put";
               // servicioGp = "/api/Post-Programa_Auditoria-All?";//;

               var body={
                "Id":id,
                "Created_By":getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
                "Last_Updated_By":getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
                "StatusEvaluacionId":"3",
                "ProgramaAuditoriaId": IdPAEV
            }
                var settings = {
                "url": url,
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "apikey": "r$3#23516ewew5",
                    "Content-Type": "application/json",
                    "Cookie": "ARRAffinity=1c7c284699ca6bef98fc17dbcd7e04e1431fa4dd45ab6d2bb105ddbb421edecc"
                },
                "data": JSON.stringify(body),
                };

                $.ajax(settings).done(function (response) {


                        if (response)
                        {

                            PAGE_SEL = $('#pagination-container').pagination('getSelectedPageNum');
                            //$('#pagination-container').pagination('go', PAGE_SEL)

                            tablaDivsAuditorias();

                            swal.close();
                            setTimeout(function(){
                              swal({
                                title: "Éxito",
                                text: "Auditoría Aprobada",
                                type: "success",
                                timer:2000,
                                showCancelButton: false,
                                confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
                                confirmButtonText: "De acuerdo",
                                closeOnConfirm: false
                              });
                            },500)


                        }
                        else
                        {
                        //cerrarModal('modal-save');
                        swal("Error!", "No se ha podido actualizar la lista.", "error");
                        }

                });
            });


    }

    /// CARGAR TABLA CON DATOS DE LA DB DE LA TABLA AUDITORIA
    //var globalBlackLists=[];
    /*var dataTableAuditorias = function(){
        var now  = moment().format('YYYY-MM-DD');
        //----------------------PARAMETROS PARA EL SERVICIO LISTAR AUDITORIAS DE UN PROGRAMA POR SU ID-------------------------------
        var servicio        = '/api/Get-Auditoria-All?code=';
        var metodoHttp      = "objectlist";
        var metodoAjax      =  "GET";
        var getAuditoriaAll ="H4VLj4KN6GZdCduqoToDVkDdP56Fz4t10niae2jucl8sXGaKz6bFuQ==";
        var url             = apiurlAuditoria+servicio+getAuditoriaAll+"&ProgramaAuditoriaId="+id_programa_auditoria+"&httpmethod="+metodoHttp;
        var metodoAjaxGp    =  "GET"; //"POST";
        var headers         ={
            "apikey":constantes.apiKey
        }

        //----------------------PARAMETROS PARA EL SERVICIO LISTAR AUDITORIAS DE UN PROGRAMA POR SU ID-------------------------------
        oTableAuditorias = $('#tb_black_list').DataTable({
            ordering  : true,
            info      : false,
            paging:true,
            pageLength: 5,
            //order: [[5,'ASC']],
            searching : true,
            scrollY   : '43vh',
            scrollCollapse: false,
            responsive: true,
            ajax  :{
                type: "GET",
                url:  url,
                headers:headers,
                crossDomain: true,
                dataType: "json",

                error: function (xhr, error, thrown) {

                    var textError=thrown;
                    var status=xhr.status+' - '+xhr.statusText;//500 error servidor
                    console.log("error")
                    console.log(textError)
                    showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
                    return;
                },
                dataSrc: function ( req )
                {
                    globalBlackLists =req;
                    var data         =[];
                    datosTabla       =[];
                    var total        = 0;
                    var e            =1;
                    var r            =1;
                    req.map(function(item,i){
                        console.log("item",item);
                        var startDate = moment(item.Inicio).format('DD/MM/YYYY');//dddd
                        var endDate   = moment(item.Fin).format('DD/MM/YYYY');//dddd
                        var year        = moment(item.Inicio).format('YYYY');//dddd
                        var month       = moment(item.Inicio).format('MM');//
                        var day         = moment(item.Inicio).format('DD'); ;
                        var startDate2   = year +"-"+ month +"-"+ day;
                        console.log("startDate2",startDate2)
                        year            = moment(item.Fin).format('YYYY');//dddd
                        month           = moment(item.Fin).format('MM');//
                        day             = moment(item.Fin).format('DD');
                        var endDate2     = year +"-"+ month +"-"+ day;

                        if(item.Code_Normas!==null){
                            var normas = item.Code_Normas.split("/")
                            console.log("normas",normas)
                            console.log("Code_Normas",item.Code_Normas)
                        }

                        var row = {
                            Id                      : item.Id//
                            ,Code                      : '<span class="">'+ item.Code +'</span> ' //
                            ,DescriptionUnidadNegocio : '<span class="">'+toCapitalize(item.DescriptionUnidadNegocio) +'</span> '
                            ,DescriptionSede          : '<span class="">'+toCapitalize(item.DescriptionSede) +'</span>' //
                            ,CodeNormas  : '<span class="">'+toCapitalize(item.Code_Normas) +'</span>' //
                            ,DescriptionAuditoria       : '<span class="">'+toCapitalize(item.DescriptionAuditoria) +'</span> ' //
                            ,Inicio  : '<span class="">'+startDate+'</span> ' //
                            ,Fin  : '<span class="">'+endDate +'</span> ' //
                            //,DescriptionStatus      : (item.Evaluacion == 1)?'<span class="text-success">Activo</span>' :'<span class="text-danger">Inactivo</span>'
                            ,DescriptionStatus      : '<span class="">'+item.DescriptionStatus+'</span>'
                            ,evaluacion  : '<span class="">'+item.DescriptionStatusEvaluacion+'</span> ' //
                            ,edit  :'<button type="button" class="btn-circle border-0" style="background-color: #b2b2b2 !important ; min-width: 2.5rem; height: 2.5rem; "><img height="24" style="cursor:pointer " src="./images/iconos/usuario-1.svg" onClick="vw_auditor_list.asignarauditor('+item.Id+');" class="ojo-1"></button>'
                            ,ver  : '<button type="button" id="btnVerAuditoria_'+item.Id+'" Code="'+item.Code+'"" CodeUnidadNegocio="'+item.CodeUnidadNegocio
                                +'" Description="'+item.Description+'" StatusEvaluacionId="'+item.StatusEvaluacionId+'" created_by="'+item.created_by
                                +'" DescriptionUnidadNegocio="'+item.DescriptionUnidadNegocio+'" DescriptionAuditoria="'+item.DescriptionAuditoria+'" Code_Normas="'+item.Code_Normas
                                +'" DescriptionSede="'+item.DescriptionSede+'" SedeId="'+item.SedeId+'" CodeSede="'+item.CodeSede +'" Inicio="'+startDate+'" Fin="'+endDate+'"'
                                +' Inicio2="'+startDate2+'" Fin2="'+endDate2+'"'
                                +' StatusId="'+item.StatusId+'" DescriptionStatus="'+item.DescriptionStatus+'"'
                                +' TipoId="'+item.TipoId+'" onClick="verAuditoria('+item.Id+')" class="btn-circle border-0" style="background-color: #373e68"> <img src="./images/iconos/ojo_1.svg" class="ojo-1"></button>'
                        }

                        console.log("item",item);
                        data.push(row);
                        auditor.push(row);
                        total++;
                        cont_auditorias++;
                    });
                    console.log("data",data)
                    //console.log("auditor",auditor)
                    $("#cant_auditorias").html('<img src="images/iconos/copia-1.svg" class="copia-1"> '+cont_auditorias+' ');
                    return data;
                }
            },
            columns: [

                { title:"Id ",data: "Id",width: "10%" ,align:"center" ,"orderable": true, visible:false},
                { title:"Id Audotoria",data: "Code",width: "10%" ,align:"center" ,"orderable": true},
                { title:"Unidad de Negocio",data: "DescriptionUnidadNegocio",width: "15%" ,align:"left" ,"orderable": true},
                { title:"Sede",data: "DescriptionSede",width: "8%" ,align:"left" ,"orderable": false},
                { title:"Norma",data: "CodeNormas",width: "8%",align:"left" ,"orderable": true},
                { title:"Tipo de Autitoria",data: "DescriptionAuditoria",width: "15%",align:"left" ,"orderable": true},
                { title:"Fecha Inicio",data: "Inicio",width: "10%",align:"left" ,"orderable": true},
                { title:"Fecha Fin",data: "Fin",width: "10%",align:"left" ,"orderable": true},
                { title:"Estado",data: "DescriptionStatus",width: "1%" ,"orderable": false},
                { title:"Evaluacion",data: "evaluacion" ,width: "7%", "orderable": false},
                { title:"Asignar",data: "edit",width: "5%" ,"orderable": false},
                { title:"Ver",data: "ver",width: "5%" ,"orderable": false},
            ],

            initComplete: function(settings, json) {

            }

        });

    }//*/

    /**
     * // RECARGAR DATATABLE AUDITORIAS CON AJAX
     * @return {[type]} [description]
     */
    /*var reloadtableBlackList = function(){
        if(oTableAuditorias)
          oTableAuditorias.ajax.reload();
        else
          tableBlackList();
    }//*/

    return{

        init:function(){
            // OBTENER LA INFORMACION DEL PROGRAMA DE AUDITORIA
            getDataProgramaAuditoria();
            // CARGAR SELECT UNIDADES DE NEGOCIO FILTRO
            cargarSelectsUnidadesOrganizativas();
            // CARGAR SELECT ESTATUS AUDITORIA FILTRO
            cargarSelectStatusAuditoria();
            // CARGAR SELECT NORMAS MODAL NEW AUDITORIA
            //cargarSelectsNormas();
            // CARGAR SELECT TIPOAUDITORIA MODAL NEW AUDITORIA
            //cargarSelectTipoAuditoria();
            // CARGAR LISTADO DE AUDITORIAS
            //dataTableAuditorias(); // con datos de la DB tabla auditoria
            tablaDivsAuditorias(); // con datos de la DB tabla auditoria
            // CARGAR ARRAY auditoriaModificacionLog CON LAS MADIFICACIONES
            // DE LAS AUDITORIAS REGISTRADAS EN EL SISTEMA
            getAuditoriaModificacionLog();
            // traemos las observaciones de las auditorias
            getObservacionesAuditorias();
            // traemos todas las sedes
            getSedesAll();

            var now = moment().format('01/01/YYYY');
            //$("#tx_date_init").val(now);
            $("#tx_date_init").datetimepicker({
              timepicker:false,
              format:'d/m/Y',
              defaultDate: now,
              //maxDate:new Date()
            });
            var end = '31/12/'+moment().format('YYYY');
            //$("#tx_date_end").val(end);
            $("#tx_date_end").datetimepicker({
              timepicker:false,
              format:'d/m/Y',
              defaultDate: end,
              //maxDate:new Date()
            });
        },
        // RRECARGAR EL LISTADO DEL DATATABLE
        /*reloadtableBlackList:function(){
          reloadtableBlackList();
        },//*/
        // LLENAR EL ARRAY CON TODAS LAS MODIFICAIONES REGISTRADAS
        getAuditoriaModificacionLog:function(){
            getAuditoriaModificacionLog();
        },
        // volver a pintar la tabla
        tablaDivsAuditorias:function(){
            tablaDivsAuditorias();
        },
        aprobarAuditoriaEvaluacion:function(id){
            aprobarAuditoriaEvaluacion(id);
        },
        observarAuditoriaEvaluacion:function(id,obs,CantidadCorreccion,StatusEvaluacionId){
            observarAuditoriaEvaluacion(id,obs,CantidadCorreccion,StatusEvaluacionId);
        },
        saveObservarAuditoriaEvaluacion:function(id){
            saveObservarAuditoriaEvaluacion(id);
        },
        confirmarEvaluacionAuditoria:function(){
            confirmarEvaluacionAuditoria();
        },
        finalizeEvaluacion:function(){
            finalizeEvaluacion();
        },
        direccionarAlListado:function(){
            direccionarAlListado();
        },
        cargarSelectSedesFilter:function(selectId){
            cargarSelectSedesFilter(selectId);
        },
        validarFechas:function(){
            validarFechas()
        },




    }
}();

