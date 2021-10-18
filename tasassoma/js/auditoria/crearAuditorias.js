 //alert("en crearAuditorias.js")
var id_programa_auditoria;
var nombre_programa_auditoria;
var id_codigo_especialidad_programa;
//-------------------------------new
var Flag_Completada           = '';   // flag_completada del programa de auditoria
var StatusIdPA                = '';   // StatusId del programa de auditoria
var id_auditoria;
var primeraCarga = 1;
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
var countNormas = 0;   /////contar las normas selecionadas
var cambiosFechas = 0 /// contas cuantos cambios de fechas lleva la auditoria
var Evaluador_code = 0  ///Evaluador_code codigo de la persona que evalua el programa
var DescriptionEspecialidad = ""  ///Descripcion de la especialidad
var CantidadCorrecciones = 0  ///Cantidad Correcciones del programa de auditoria
var TotalAuditorias = 0; //Cantidad Total de Auditorias
var MayorAud = 0; ///saber la auditoria mas nueva



var vw_auditorias_list = function()
{

    let arrayAuditorias = []

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
                //"Cookie": "ARRAffinity=a5d70da53a79873e99939890b4a077f907b6a8d8fb6a065c0333227042886e3b"
            },
            "data": JSON.stringify({}),
        };

        $.ajax(settings).done(function (response) {
            //RECORREMOS LA RESPUESTA
            // console.warn("programa auditoria response ",response)
            // console.warn("response[0].Flag_Completada ",response[0].Flag_Completada)
            // console.warn("response[0].StatusId ",response[0].StatusId)
            response.forEach((Item) => {
                Flag_Completada = Item.Flag_Completada
                StatusIdPA      = Item.StatusId
                Evaluador_code  = Item.Evaluador_code
                DescriptionEspecialidad  = Item.DescriptionEspecialidad
                CantidadCorrecciones  = Item.Cantidad_Correcciones
            }) //*/
            // console.warn("Flag_Completada ",Flag_Completada)
            // console.warn("StatusIdPA ",StatusIdPA)
            if(StatusIdPA!=1){
                $("#new_auditoria").attr("disabled", true);
                $("#new_auditoria").css("visibility", 'hidden');
                //$("#divBtnNewAuditoria").css("display", "none");
            }
            if( StatusIdPA==5){
                //$("#buscarAuditoriasx").attr("disabled", true);//andy 14-05-21
                 $("#buscarAuditoriasx").css("visibility", 'hidden');
                //$("#divBtnBuscarAuditoriasx").css("display", "none");

            }
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
            $("#sel_filter_sede").html("<option value='0'  selected>           </option>")
            //RECORREMOS LA RESPUESTA
            response.forEach((Item) => {
                // llenamos el select del filtro correspondiente a las sedes
                $("#sel_filter_sede").append(`<option description='${Item.Description}' value='${Item.Id}'>${Item.Code}</option>`);
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

        var idUnidadNegocioFiltro = ""
        if(selectId=="sel_filter_sede"){
            idUnidadNegocioFiltro = document.getElementById('sel_filter_unidad_organizativa').value;
        }
        if(selectId=="sel_new_sede"){
            idUnidadNegocioFiltro = document.getElementById('sel_new_unidad_organizativa').value;
        }
        if(selectId=="sel_sede"){
            idUnidadNegocioFiltro = document.getElementById('sel_unidad_organizativa').value;
        }

        // limpiar select unidad organizativa
        $("#"+selectId).html("<option value='0'  selected>      </option>")
        for(i in jsonSedes){
            //console.log("i: "+i, jsonSedes[i].Code)

            if(idUnidadNegocioFiltro==0){
                $("#"+selectId).append(`<option description='`+jsonSedes[i].Description+`' value='`+jsonSedes[i].Id+`'>`+jsonSedes[i].Code+`</option>`);
            }
            else {
                if(idUnidadNegocioFiltro==jsonSedes[i].UnidadNegocioId){
                    if(idUnidadNegocioFiltro==1 || idUnidadNegocioFiltro==3 || idUnidadNegocioFiltro==4 || idUnidadNegocioFiltro==6){
                        $("#"+selectId).append(`<option selected description='`+jsonSedes[i].Description+`' value='`+jsonSedes[i].Id+`'>`+jsonSedes[i].Code+`</option>`);
                       sedeDescription = jsonSedes[i].Description;
                       //alert("sedeDescription"+sedeDescription)
                    }

                    else
                        $("#"+selectId).append(`<option description='`+jsonSedes[i].Description+`' value='`+jsonSedes[i].Id+`'>`+jsonSedes[i].Code+`</option>`);
                }
            }

        }
        //*/

    }

    /**
     * [validarNormas bloquear o desloquear normas dependiendo de la unidad de negocio]
     * @param  {[type]} UnidadNegocio [UnidadNegocioId seleccionado]
     * @return {[type]}               [description]
     */
    var validarNormas = function(UnidadNegocio)
    {
        $("#sel_new_normas").val('')
        $("#divCountNormas").html('0')
        // console.warn("UnidadNegocio -> ",UnidadNegocio.value)
        // console.warn("sel_new_normas -> ",$("#sel_new_normas").val())
        // DESACTIVO TODAS LAS NORMAS
        $("#sel_new_normas option[value='14001']").attr('disabled', 'disabled')
        $("#sel_new_normas option[value='45001']").attr('disabled', 'disabled')
        $("#sel_new_normas option[value='BASC']").attr('disabled', 'disabled')
        $("#sel_new_normas option[value='GMPB2']").attr('disabled', 'disabled')
        $("#sel_new_normas option[value='GMPB3']").attr('disabled', 'disabled')
        $("#sel_new_normas option[value='IFFO']").attr('disabled', 'disabled')
        $("#sel_new_normas option[value='9001']").attr('disabled', 'disabled')
        $("#sel_new_normas option[value='RBC']").attr('disabled', 'disabled')
        $("#sel_new_normas option[value='HACCP']").attr('disabled', 'disabled')
        $("#sel_new_normas option[value='SANE']").attr('disabled', 'disabled')
        $("#sel_new_normas option[value='17025']").attr('disabled', 'disabled')
        // validar normas por unidad de negocio
        if( UnidadNegocio.value == 1)
        {
            $("#sel_new_normas option[value='RBC']").removeAttr('disabled')
            $("#sel_new_normas option[value='HACCP']").removeAttr('disabled')
            $("#sel_new_normas option[value='SANE']").removeAttr('disabled')
        }
        if( UnidadNegocio.value == 2)
        {
            $("#sel_new_normas option[value='14001']").removeAttr('disabled')
            $("#sel_new_normas option[value='45001']").removeAttr('disabled')
            $("#sel_new_normas option[value='BASC']").removeAttr('disabled')
            $("#sel_new_normas option[value='HACCP']").removeAttr('disabled')
            $("#sel_new_normas option[value='IFFO']").removeAttr('disabled')
            $("#sel_new_normas option[value='GMPB2']").removeAttr('disabled')
            $("#sel_new_normas option[value='17025']").removeAttr('disabled')
            $("#sel_new_normas option[value='SANE']").removeAttr('disabled')
        }
        if( UnidadNegocio.value == 3)
        {
            $("#sel_new_normas option[value='BASC']").removeAttr('disabled')
            $("#sel_new_normas option[value='14001']").removeAttr('disabled')
            $("#sel_new_normas option[value='45001']").removeAttr('disabled')
            $("#sel_new_normas option[value='9001']").removeAttr('disabled')
        }
        if( UnidadNegocio.value == 4)
        {
            $("#sel_new_normas option[value='BASC']").removeAttr('disabled')
            $("#sel_new_normas option[value='HACCP']").removeAttr('disabled')
            $("#sel_new_normas option[value='17025']").removeAttr('disabled')
            $("#sel_new_normas option[value='SANE']").removeAttr('disabled')
        }
        if( UnidadNegocio.value == 5)
        {
            //$("#sel_new_normas option[value='BASC']").removeAttr('disabled')
        }
        if( UnidadNegocio.value == 6)
        {
            $("#sel_new_normas option[value='14001']").removeAttr('disabled')
            $("#sel_new_normas option[value='45001']").removeAttr('disabled')
            $("#sel_new_normas option[value='BASC']").removeAttr('disabled')
        }
        if( UnidadNegocio.value == 7)
        {
            $("#sel_new_normas option[value='GMPB3']").removeAttr('disabled')
        }

        // // validar que norma SANE NO ESTE DISPONIBLE para Astillero (3) ni Oficina Principal (6)
        // if( UnidadNegocio.value == 3 || UnidadNegocio.value == 6)
        // {
        //     $("#sel_new_normas option[value='SANE']").attr('disabled', 'disabled')
        // }
        // else
        // {
        //     $("#sel_new_normas option[value='SANE']").removeAttr('disabled')
        // }

        // // Validar que norma 17025 ESTE DISPONIBLE para CHI (2) y OMEGA (4)
        // if( UnidadNegocio.value != 2 && UnidadNegocio.value != 4 )
        // {
        //     $("#sel_new_normas option[value='17025']").attr('disabled', 'disabled')
        // }
        // else
        // {
        //     $("#sel_new_normas option[value='17025']").removeAttr('disabled')
        // }


    }

    /**
     * [getObservacionesAuditorias obtener las observaciones registradas en el sistema]
     * @return {[type]} [description]
     */
    var getObservacionesAuditorias = function() {
        auditoriaObservacionesLog = [];
        console.log("auditoriaObservacionesLog ",auditoriaObservacionesLog)
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
    var definirInputsDate = function(){
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
    }

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

            $("#sel_filter_estado").html("<option selected value=''>          </option>");
            response.map(function(item)
            {
                $("#sel_filter_estado").append(`<option value='${item.Id}'>${item.Description}</option>`);
            });
        });

    }//*/

    // INICIALIZAMOS LOS SELECT DE LAS NORMAS
    var cargarSelectsNormas = function(){
        // console.log("id_codigo_especialidad_programa " + id_codigo_especialidad_programa)
        // console.log("id_programa_auditoria " + id_programa_auditoria)
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
                $("#sel_new_normas").append(`<option disabled='disabled' code='${item.Code}' value='${item.Code}'>${item.Code}</option>`);
                //$("#sel_new_normas").append(`<option code='${item.Code}' value='${item.Id}'>${item.Description}</option>`);
                //$("#sel_new_normas").append(`<option value='${item.Code}'>${item.Code}</option>`);
                jsonNormas.push(item);
          });


        }).fail(function( jqXHR, textStatus, errorThrown ) {
            //showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
            //console.log(errorThrown)
            //$("#sel_new_normas").hide();
        });
    }
    /**
     * [finalizeEvaluacion pasar flag_completada a 1 del programa de auditoria]
     * @return {[type]} [description]
     */
    var finalizeEvaluacion=function ()
    {

        // console.log("cagate")

        swal({
            title:"Esta por finalizar la creación de programa",
            text: "¿Desea finalizar la creación del programa?",
            type: "info",
            showCancelButton: true,
            confirmButtonClass: "btn-danger btn-sm",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cerrar",
            closeOnConfirm: true
        },function(){

            var body={
                "Id":id_programa_auditoria,
                "Flag_Completada":1,
                "Flag_Evaluador":0,
                "Created_By":getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
                "Last_Updated_By":getCookie("vtas_id_hash"+sessionStorage.tabVisitasa)
            }

            var url = apiurlAuditoria+"/api/Post-Programa_Auditoria-All?code=g38OQrxNikLSJIxsYIv03hTcmsYXfmMA7kanUqFykcdNNGAHwMGFQg==&httpmethod=finalize&Id="+id_programa_auditoria;

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

            $.ajax(settings).done(function (response)
            {
                console.warn("res",response)
                console.warn("res",response.status)

                var res = JSON.parse(response);

                console.log("res2",res)
                console.log("res2",res.status)

                if (res.status)
                {

                    swal.close();
                    setTimeout(function(){
                        swal({
                            title: "Se finalizó con éxito la creación del programa.",
                            text: "Puedes retornar a tu bandeja de auditorías",
                            type: "success",
                            //timer:2000,
                            showCancelButton: false,
                            confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
                            confirmButtonText: "De acuerdo",
                            closeOnConfirm: true
                        });
                    },500)

                    setTimeout(function(){
                        handlerUrlhtml('contentGlobal','view/auditoria/registrarProgramaAuditoria.dev.html','Programa de Auditoría');
                    },2000)

                }
                else
                {
                    swal("Error!", res.message, "error");
                }

            });//*/
            //************************************************************AJAX_END */

        });
    }

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
            //$("#sel_new_tipo_auditoria").append("<option value='' disabled selected>                </option>");
            jsonTipoAuditoria=[];
            // console.log("id_codigo_especialidad_programa "+id_codigo_especialidad_programa)
            data.map(function(item)
            {
                // console.log("item.Id "+item.Id)
                if(  item.Id==3 ){
                    if(id_codigo_especialidad_programa==3){
                        //console.log("cargamos el select")
                        //alert("cargamos en el select legal en ssoma")
                        $("#sel_new_tipo_auditoria").append(`<option Code='${item.Code}' value='${item.Id}'>${item.Description}</option>`);
                        jsonTipoAuditoria.push(item);
                    }
                }else{

                    $("#sel_new_tipo_auditoria").append(`<option Code='${item.Code}' value='${item.Id}'>${item.Description}</option>`);
                    jsonTipoAuditoria.push(item);
                }
                //$("#sel_new_tipo_auditoria").append(`<option value='${item.Code}'>${item.Code}</option>`);
            });


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

            $("#sel_filter_unidad_organizativa").html("<option value='0' selected>    </option>");
            $("#sel_new_unidad_organizativa").html("<option value='0' disabled selected>    </option>");
            $("#sel_unidad_organizativa").html("<option value='0' disabled selected>    </option>");


            jsonUnidadesOrganizativas=[];
            data.map(function(item)
            {
                $("#sel_filter_unidad_organizativa").append(`<option description='${item.Description}' value='${item.Id}'>${item.Code}</option>`);
                $("#sel_new_unidad_organizativa").append(`<option description='${item.Description}' value='${item.Id}'>${item.Code}</option>`);
                $("#sel_unidad_organizativa").append(`<option description='${item.Description}' value='${item.Code}'>${item.Code}</option>`);
                jsonUnidadesOrganizativas.push(item);
            });
            //console.log("json",jsonUnidadesOrganizativas)

        }).fail(function( jqXHR, textStatus, errorThrown ) {
            //showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
            //console.log(errorThrown)
            $("#sel_filter_unidad_organizativa").hide();
            $("#sel_new_unidad_organizativa").hide();
        });
    }

    /**
     * [filtroTablaDivsAuditorias cargar listado de auditorias ]
     * @return {[type]} [description]
     */
    var filtroTablaDivsAuditorias = function(){
        // console.log("listar auditorias")

        showLoading();

        var UnidadNegocioId = $("#sel_filter_unidad_organizativa").val()
        //var Inicio          = formatearFechaDB($("#txt_date_start_evaluacion").val())
        //var Fin             = formatearFechaDB($("#txt_date_end_evaluacion").val())
        var Inicio          = $("#txt_date_start_evaluacion").val().split('/').reverse().join('-')
        var Fin             = $("#txt_date_end_evaluacion").val().split('/').reverse().join('-')
        var SedeId          = $("#sel_filter_sede").val()
        var StatusId        = $("#sel_filter_estado").val()
        var filtro          = "";
        //console.log(UnidadNegocioId, Inicio, Fin, SedeId, StatusId)

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

        if(primeraCarga == 1) {
            auditor = []
        }

        cont_auditorias = 0;

        var now  = moment().format('YYYY-MM-DD');
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
            arrayAuditorias = response
            // console.warn("response ",response )

            if (response.length > 0) $("#bodyTablaSinAuditorias").css("display", "none");
            else $("#bodyTablaSinAuditorias").css("display", "block");

            //$('#body-tabla-list').html("")
            TotalAuditorias=response.length
            $("#cant_auditorias").html('<img src="images/iconos/copia-1.svg" class="copia-1" onclick="vw_auditorias_list.downloadExcel()" style="cursor: pointer" title="Descargar Listado en Excel"> '+response.length+' ');
            MayorAud = 0;
            response.forEach((Item)=>{
                var iiaudd = parseInt(Item.Id);
                // console.warn("MayorAud -> ",MayorAud)
                // console.warn("iiaudd -> ",iiaudd)
                //alert(Item.StatusId+'=status, PlanId = '+Item.PlanId)
                //if((Item.StatusId == 1))// StatusId Asignada , en atencion y en ejecucion quiere decir que tiene pla, n puede ser nueva
                //{
                    //alert(Item.StatusId+'=status, PlanId = '+Item.PlanId)
                    // vemos cual es la ultima creada y si el programa se encuentra en creado todavia...
                    if(iiaudd > MayorAud && StatusIdPA == 1)
                    {
                        MayorAud = iiaudd;
                    }
                //}
            })
            // console.warn("2. MayorAud -> ",MayorAud)

            //templateListAuditorias(response)
            $('#body-tabla-list').html(" ");



           // $('#pagination-container').pagination('go', 8)

            $('#pagination-container').pagination({
                dataSource: response,
                pageSize: 30,//solicitdo por karen el 18-05-2021
                callback: function(data, pagination) {
                    var html = templateListAuditorias(data);
                    $('#body-tabla-list').html(html);
                }
            })//*/

            //let p = 2

        })
        .always(function( jqXHR, textStatus, errorThrown ) {

            //if(primeraCarga == 1) alert("primera carga 3")
            primeraCarga = 2;
            //console.table(arrayAuditorias)

            // console.warn("vtas_rolexternalrol -> ", getCookie( "vtas_rolexternalrol" + sessionStorage.tabVisitasa ))
            if( getCookie( "vtas_rolexternalrol" + sessionStorage.tabVisitasa ) == 'ROL_LIDERAUDITORIA')
            {
                $("#new_auditoria").hide()
                $("#buscarAuditoriasx").hide()
            }
            else
            {
                $("#new_auditoria").show()
                $("#buscarAuditoriasx").show()
            }

            hideLoading();
        });

    }

    // para el paginado....
    var templateListAuditorias = function(data){
        var html = '';
        // console.log("data ",data)


//         var container = $('#pagination-container');
// c           container.pagination('getTotalPage');
        //Ini_______vamos a recorrer para ver cual es la última auditoría
        //var MayorAud = 0;

        // var MayorAud = 0;
        // data.forEach((Item)=>{
        //     var iiaudd = parseInt(Item.Id);
        //     //alert(Item.StatusId+'=status, PlanId = '+Item.PlanId)
        //     if((Item.StatusId == 1))// StatusId Asignada , en atencion y en ejecucion quiere decir que tiene pla, n puede ser nueva
        //     {
        //         //alert(Item.StatusId+'=status, PlanId = '+Item.PlanId)
        //         if(iiaudd > MayorAud)
        //         {
        //             MayorAud = iiaudd;
        //         }
        //     }
        // })
        //Fin_______vamos a recorrer para ver cual cual es la última auditoría




   //alert(MayorAud)



        data.forEach((Item)=>{

            if(primeraCarga==1){
                auditor.push(Item);
            }

            cont_auditorias++;
                        //alert('AAAAAAAAA = '+cont_auditorias);
            var colorLetra  = "";
            var disabledBtnAuditor   = 'disabled';
            var styleBtnAuditor = "background-color: #b2b2b2; !important";

            var disabledBtnModificar = 0;
            var startDate   = moment(Item.Inicio).format('DD/MM/YYYY');//dddd

            var endDate     = moment(Item.Fin).format('DD/MM/YYYY');//dddd
            var year        = moment(Item.Inicio).format('YYYY');//dddd
            var month       = moment(Item.Inicio).format('MM');//
            var day         = moment(Item.Inicio).format('DD'); ;
            var ddate = year +"-"+ month +""+ day;
            var startDate2   = year +"/"+ month +"/"+ day;
            year            = moment(Item.Fin).format('YYYY');//dddd
            month           = moment(Item.Fin).format('MM');//
            day             = moment(Item.Fin).format('DD');
            var endDate2     = year +"/"+ month +"/"+ day;//*/
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
                disabledBtnModificar  = 1;
            }
            if(Item.StatusEvaluacionId==3){
                hayAuditoriasAprobadas++ // corregidas
                colorLetra = "textoAprobadaCA"
                disabledBtnAuditor = ''

                disabledBtnModificar  = 1;
            }


            //vamos a validar la fecha actual a ver del listado cuales auditorias aprobadas se les puede asignar el equipo auditor
            //regla: un mes antes de la fecha de inicio de la auditoria hasta el dia fial se habilita el botón de asignar equipo auditor
               //tomamos fecha de inicio   ${startDate}
               //tomamos la fecha fin   ${endDate}


            let year0            = moment(Item.Inicio).format('YYYY');//dddd
            let month0           = moment(Item.Inicio).format('MM');//
            let day0            = moment(Item.Inicio).format('DD');
            var fecha = new Date(year0, month0-1, day0-1);




                var dias = 30; // Número de días a agregar
                fecha.setDate(fecha.getDate() - dias);
                //console.info(fecha)


            let year1            = moment(Item.Inicio).format('YYYY');//dddd
            let month1           = moment(Item.Inicio).format('MM');//
            let day1             = moment(Item.Inicio).format('DD');
            var f1 = new Date(year1, month1, day1);

            let year2            = moment(fecha).format('YYYY');//dddd
            let month2           = moment(fecha).format('MM');//
            let day2             = moment(fecha).format('DD');
            var f2 = new Date(year2, month2-1, day2);

            var hoy =  new Date();
             // console.log("//----------------------- sumando fechas --------------------------");
                // //console.info("fecha BD = ",startDate, "resultado =",fecha)
                // console.info(" (FechaInicioAud - 1mes) = ",f2, "Hoy =",hoy)
                // console.log("//----------------------- sumando fechas --------------------------");

                //cargaProcesosCargo(cont_auditoriasp, 0,'btn-basic');
                var btNew;   let iidPlan = parseInt(Item.Id);
                //alert(iidPlan);
                if((iidPlan == MayorAud)&&(iidPlan >0))
                {
                    //btNew = "<div  class='check-blue text-center'>Nuevo</div>"; //btNew ="";//momentaneamente
                    btNew ="";
                }else{var btNew = "";}

                if( hoy > f2 )
                {
                    if(Item.StatusEvaluacionId==3){
                        styleBtnAuditor = "background-color: #58c25d; !important";
                    }
                    //background-color: #b2b2b2 !important
                    // alert("hoy ("+hoy+")  >  f1("+f2+")");
                    //aqui colocamos el texto donde va el boton

                   html += `
                   <div class="item-tabla p-2" style="z-index: 1;display:relative;">${btNew}
                       <div class="row m-0 justify-content-between align-items-center">
                           <div class="col-md-2 text-center" style="font-size: 13px">${Item.Code}</div>
                           <div class="col-md-2 text-center" style="font-size: 13px" >${Item.DescriptionUnidadNegocio}</div>
                           <div class="col-md-1 text-center" style="font-size: 13px" >${Item.DescriptionSede}</div>

                           <div class="col-md-6" >
                               <div class="row">
                                   <div class="col-md-2 text-center" style="font-size: 13px" >${Item.Code_Normas}</div>
                                   <div class="col-md-2 text-center" style="font-size: 13px" >${Item.DescriptionAuditoria}</div>
                                   <div class="col-md-2 text-center" style="font-size: 13px" >${startDate}</div>
                                   <div class="col-md-2 text-center" style="font-size: 13px" >${endDate}</div>
                                   <div class="col-md-2 text-center" style="font-size: 13px" >${Item.DescriptionStatus}</div>
                                   <div class="col-md-2 text-center ${colorLetra}"  style="font-size: 13px" >${Item.DescriptionStatusEvaluacion}</div>
                               </div>
                           </div>

                           <div class="col-md-1" >
                               <div class="row">
                                   <div class="col-6 text-center" style="font-size: 15px">
                                       <button class="btn-circleCA border-0" ${disabledBtnAuditor}
                                           style="${styleBtnAuditor} ; min-width: 2rem; height: 2rem;"
                                           idProgramaAuditoria="${id_programa_auditoria}" idEspecialidad="${id_codigo_especialidad_programa}"
                                           nombreProgramaAuditoria="${nombre_programa_auditoria}" Description="${Item.Description}"
                                           onClick="vw_auditor_list.asignarauditor('${Item.Id}');" >
                                           <img src="./images/iconos/usuario1.svg" class="ojo-1">
                                       </button>
                                   </div>

                                   <div class="col-6 text-center" style="font-size: 15px">
                                       <button type="button"
                                           id="btnVerAuditoria_${Item.Id}"
                                           idProgramaAuditoria="${id_programa_auditoria}" idEspecialidad="${id_codigo_especialidad_programa}"
                                           nombreProgramaAuditoria="${nombre_programa_auditoria}"
                                           Code="${Item.Code}" CodeUnidadNegocio="${Item.CodeUnidadNegocio}"
                                           Description="${Item.Description}" StatusEvaluacionId="${Item.StatusEvaluacionId}" created_by="${Item.created_by}"
                                           DescriptionUnidadNegocio="${Item.DescriptionUnidadNegocio}" DescriptionAuditoria="${Item.DescriptionAuditoria}" Code_Normas="${Item.Code_Normas}"
                                           DescriptionSede="${Item.DescriptionSede}" SedeId="${Item.SedeId}" CodeSede="${Item.CodeSede}" Inicio="${startDate}" Fin="${endDate}"
                                           Inicio2="${moment(Item.Inicio).format('DD/MM/YYYY')}" Fin2="${moment(Item.Fin).format('DD/MM/YYYY')}"
                                           StatusId="${Item.StatusId}" DescriptionStatus="${Item.DescriptionStatus}"
                                           TipoId="${Item.TipoId}" onClick="verAuditoria('${Item.Id}')" class="btn-circleCA border-0" style="background-color: #373e68">
                                           <img src="./images/iconos/ojo_1.svg" class="ojo-1">
                                       </button>
                                   </div>
                               </div>
                           </div>

                       </div>
                   </div>`


                }
                else
                {

                    html += `
                    <div class="item-tabla p-2" style="z-index: 1;display:relative;">${btNew}
                        <div class="row m-0 justify-content-between align-items-center">
                            <div class="col-md-2 text-center" style="font-size: 13px">${Item.Code}</div>
                            <div class="col-md-2 text-center" style="font-size: 13px" >${Item.DescriptionUnidadNegocio}</div>
                            <div class="col-md-1 text-center" style="font-size: 13px" >${Item.DescriptionSede}</div>

                            <div class="col-md-6" >
                                <div class="row">
                                    <div class="col-md-2 text-center" style="font-size: 13px" >${Item.Code_Normas}</div>
                                    <div class="col-md-2 text-center" style="font-size: 13px" >${Item.DescriptionAuditoria}</div>
                                    <div class="col-md-2 text-center" style="font-size: 13px" >${startDate}</div>
                                    <div class="col-md-2 text-center" style="font-size: 13px" >${endDate}</div>
                                    <div class="col-md-2 text-center" style="font-size: 13px" >${Item.DescriptionStatus}</div>
                                    <div class="col-md-2 text-center ${colorLetra}"  style="font-size: 13px" >${Item.DescriptionStatusEvaluacion}</div>
                                </div>
                            </div>

                            <div class="col-md-1" >
                                <div class="row">
                                    <div class="col-6 text-center" style="font-size: 15px">
                                        <button class="btn-circleCA border-0" ${disabledBtnAuditor}
                                            style="${styleBtnAuditor}; min-width: 2rem; height: 2rem;"
                                            idProgramaAuditoria="${id_programa_auditoria}" idEspecialidad="${id_codigo_especialidad_programa}"
                                            nombreProgramaAuditoria="${nombre_programa_auditoria}" Description="${Item.Description}"
                                             >
                                            <img src="./images/iconos/usuario1.svg" class="ojo-1">
                                        </button>
                                    </div>

                                    <div class="col-6 text-center" style="font-size: 15px">
                                        <button type="button"
                                            id="btnVerAuditoria_${Item.Id}"
                                            idProgramaAuditoria="${id_programa_auditoria}" idEspecialidad="${id_codigo_especialidad_programa}"
                                            nombreProgramaAuditoria="${nombre_programa_auditoria}"
                                            Code="${Item.Code}" CodeUnidadNegocio="${Item.CodeUnidadNegocio}"
                                            Description="${Item.Description}" StatusEvaluacionId="${Item.StatusEvaluacionId}" created_by="${Item.created_by}"
                                            DescriptionUnidadNegocio="${Item.DescriptionUnidadNegocio}" DescriptionAuditoria="${Item.DescriptionAuditoria}" Code_Normas="${Item.Code_Normas}"
                                            DescriptionSede="${Item.DescriptionSede}" SedeId="${Item.SedeId}" CodeSede="${Item.CodeSede}" Inicio="${startDate}" Fin="${endDate}"
                                            Inicio2="${moment(Item.Inicio).format('DD/MM/YYYY')}" Fin2="${moment(Item.Fin).format('DD/MM/YYYY')}"
                                            StatusId="${Item.StatusId}" DescriptionStatus="${Item.DescriptionStatus}"
                                            TipoId="${Item.TipoId}" onClick="verAuditoria('${Item.Id}')" class="btn-circleCA border-0" style="background-color: #373e68">
                                            <img src="./images/iconos/ojo_1.svg" class="ojo-1">
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>`

                }

        })

        html += '';
        return html;

    }

    var validarFechas = function(int){
        var fechaDesde = ""
        var fechaHasta = ""
        var parts      = ""

        if(int == 3)  // fechas del filtro
        {
            parts = $("#txt_date_start_evaluacion").val().split("/");
            fechaDesde = new Date(parts[2], parts[1] - 1, parts[0]);
            parts = $("#txt_date_end_evaluacion").val().split("/");
            fechaHasta = new Date(parts[2], parts[1] - 1, parts[0]);

            if(fechaDesde >= fechaHasta){
                $("#txt_date_end_evaluacion").val($("#txt_date_start_evaluacion").val())
            }
        }

        if(int == 2)  // modal modificar-correguir auditoria
        {
            parts = $("#tx_date_start_auditoria").val().split("/");
            fechaDesde = new Date(parts[2], parts[1] - 1, parts[0]);
            parts = $("#tx_date_end_auditoria").val().split("/");
            fechaHasta = new Date(parts[2], parts[1] - 1, parts[0]);

            if(fechaDesde >= fechaHasta){
                $("#tx_date_end_auditoria").val($("#tx_date_start_auditoria").val())
            }
        }

        if(int == 1)  // modal newAuditoria
        {
            parts = $("#tx_date_start_new_auditoria").val().split("/");
            fechaDesde = new Date(parts[2], parts[1] - 1, parts[0]);
            parts = $("#tx_date_end_new_auditoria").val().split("/");
            fechaHasta = new Date(parts[2], parts[1] - 1, parts[0]);

            if(fechaDesde >= fechaHasta){
                $("#tx_date_end_new_auditoria").val($("#tx_date_start_new_auditoria").val())
            }
        }
    }

    /**
     * [downloadExcel descargaremos un excel con el listado de auditores]
     * @return {[type]} [description]
     */
    var downloadExcel = function()
    {
        // console.table(arrayAuditorres)
        let excel = `
            <table border="1" style="color: #000;">
                <thead>
                    <tr>
                        <th bgcolor="#B2B2B2">PROGRAMA AUDITORÍA</th>
                        <th bgcolor="#B2B2B2">ID AUDITORÍA</th>
                        <th bgcolor="#B2B2B2">UNIDAD NEGOCIO</th>
                        <th bgcolor="#B2B2B2">SEDE</th>
                        <th bgcolor="#B2B2B2">NORMA</th>
                        <th bgcolor="#B2B2B2">TIPO AUDITORÍA</th>
                        <th bgcolor="#B2B2B2">FECHA INICIO</th>
                        <th bgcolor="#B2B2B2">FECHA FIN</th>
                        <th bgcolor="#B2B2B2">ESTADO</th>
                        <th bgcolor="#B2B2B2">EVALUACION</th>
                    </tr>
                <thead>
                <tbody id="ListadoDeAuditorias">
        `

        // RECORREMOS EL ARRAY CON LOS CHECKLIST
        arrayAuditorias.forEach(function(Item)
        {

            let startDate   = moment(Item.Inicio).format('DD/MM/YYYY');//dddd
            let endDate     = moment(Item.Fin).format('DD/MM/YYYY');//dddd

            let day   = moment(Item.Inicio).format('DD');//dddd
            let month = moment(Item.Inicio).format('MM');//dddd
            let year  = moment(Item.Inicio).format('YYYY');//dddd
            console.warn("day ",day," month ",month, "year ",year)
            //day       = (day<10) ? day+"/"   : day+"/"
            //month     = (month<10) ? month+"/"  : month+"/"
            startDate = day+"/"+month+"/"+year

            day   = moment(Item.Fin).format('DD');//dddd
            month = moment(Item.Fin).format('MM');//dddd
            year  = moment(Item.Fin).format('YYYY');//dddd

            //day       = (day<10) ? day+"/"   : day+"/"
            //month     = (month<10) ? month+"/"  : month+"/"
            endDate = day+"/"+month+"/"+year
            console.warn("startDate ",startDate," endDate ",endDate)
            // agregamos una fila
            excel += `
                <tr bgcolor="#fff">
                    <td text-aling="center">${Item.Description}</td>
                    <td text-aling="center">${Item.Code}</td>
                    <td text-aling="center">${Item.DescriptionUnidadNegocio}</td>
                    <td text-aling="center">${Item.DescriptionSede}</td>
                    <td text-aling="center">${Item.Code_Normas}</td>
                    <td text-aling="center">${Item.DescriptionAuditoria}</td>
                    <td text-aling="center">${startDate}</td>
                    <td text-aling="center">${endDate}</td>
                    <td text-aling="center">${Item.DescriptionStatus}</td>
                    <td text-aling="center">${Item.DescriptionStatusEvaluacion}</td>
                </tr>
            `
        })

        excel += `</tbody></table>`
        //console.warn("excel->",excel)

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
            var link = document.getElementById('ListadoDeAuditorias');
            link.href='data:application/vnd.ms-excel;base64,' + window.btoa(excel);
            link.download='Listado De Auditorias';
            link.click();
            //sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(excel));
        }

    }

    return{

        init:function(){

            showLoading();

            // OBTENER LA INFORMACION DEL PROGRAMA DE AUDITORIA
            getDataProgramaAuditoria();
            // CARGAR SELECT UNIDADES DE NEGOCIO FILTRO
            cargarSelectsUnidadesOrganizativas();
            // CARGAR SELECT ESTATUS AUDITORIA FILTRO
            cargarSelectStatusAuditoria();
            // CARGAR SELECT NORMAS MODAL NEW AUDITORIA
            cargarSelectsNormas();
            // CARGAR SELECT TIPOAUDITORIA MODAL NEW AUDITORIA
            cargarSelectTipoAuditoria();
            // CARGAR LISTADO DE AUDITORIAS
            //dataTableAuditorias(); // con datos de la DB tabla auditoria
            //tablaDivsAuditorias(); // con datos de la DB tabla auditoria
            filtroTablaDivsAuditorias();
            // CARGAR ARRAY auditoriaModificacionLog CON LAS MADIFICACIONES
            // DE LAS AUDITORIAS REGISTRADAS EN EL SISTEMA
            getAuditoriaModificacionLog();
            // traemos las observaciones de las auditorias
            getObservacionesAuditorias();
            // traemos todas las sedes
            getSedesAll();

            var now = '01/01/'+moment().format('YYYY');
            var end = '31/12/'+moment().format('YYYY');
            //$("#txt_date_start_evaluacion").val(now);
            $("#txt_date_start_evaluacion").datetimepicker({
                timepicker:false,
                format:'d/m/Y',
                defaultDate: now,
                minDate: new Date(moment(now).format('YYYY-MM-DD'))
                //maxDate:new Date()
            });
            //$("#txt_date_end_evaluacion").val(end);
            $("#txt_date_end_evaluacion").datetimepicker({
                timepicker:false,
                format:'d/m/Y',
                defaultDate: end,
                //minDate: new Date(moment(now).format('YYYY-MM-DD')),
                //maxDate: new Date(moment(end).format('YYYY-MM-DD'))
            });//*/

            // var now = moment().add(50, 'days').format('DD/MM/YYYY');
            var now = moment().add(1, 'days').format('DD/MM/YYYY');
            var end = '31/12/'+moment().format('YYYY');
            $("#tx_date_start_new_auditoria").val(now);
            $("#tx_date_start_new_auditoria").datetimepicker({
                timepicker:false,
                format:'d/m/Y',
                //defaultDate: now,
                // minDate: new Date(moment().add(50, 'days').format('YYYY-MM-DD'))
                minDate: new Date(moment().add(1, 'days').format('YYYY-MM-DD'))

            });
            // var now = moment().add(50, 'days').format('DD/MM/YYYY');
            var now = moment().add(1, 'days').format('DD/MM/YYYY');
            $("#tx_date_end_new_auditoria").val(now);
            $("#tx_date_end_new_auditoria").datetimepicker({
                timepicker:false,
                format:'d/m/Y',
                //defaultDate: now,
                // minDate: new Date(moment().add(50, 'days').format('YYYY-MM-DD')),
                minDate: new Date(moment().add(1, 'days').format('YYYY-MM-DD')),
                yearRange: "2019:2020"
                //maxDate: "+5M +10D"
            });

            hideLoading();

        },
        // RRECARGAR EL LISTADO DEL DATATABLE
        reloadtableBlackList:function(){
          reloadtableBlackList();
        },
        // LLENAR EL ARRAY CON TODAS LAS MODIFICAIONES REGISTRADAS
        getAuditoriaModificacionLog:function(){
            getAuditoriaModificacionLog();
        },
        // volver a pintar la tabla
        tablaDivsAuditorias:function(){
            tablaDivsAuditorias();
        },
        finalizeEvaluacion:function(){
            finalizeEvaluacion();
        },
        filtroTablaDivsAuditorias:function(){
            filtroTablaDivsAuditorias();
        },
        validarFechas:function(int){
            validarFechas(int)
        },
        cargarSelectSedesFilter:function(selectId){
            cargarSelectSedesFilter(selectId)
        },
        validarNormas:function(select){
            validarNormas(select)
        },
        downloadExcel : function () {
            downloadExcel();
        },


    }
}();

/**
 * [selectUnidadOrganizativaFilter obtener UnidadNegocioId del select
 * en la modal nueva auditoria para llenar el select de sedes]
 * @return {[type]} [description]
 */
function selectUnidadOrganizativaFilter()
{
    // console.log("cambio")

    idUnidadNegocioFiltro = document.getElementById('sel_filter_unidad_organizativa').value;

    var select = 'sel_filter_sede'

    if(idUnidadNegocioFiltro>0)
        getSelectSedePorIdUnidadNegocio(idUnidadNegocioFiltro, select)
    else
        $("#"+select).html("<option value='0'  selected>       </option>")
}

/**
 * [selectUnidadOrganizativaNewAuditoria obtener UnidadNegocioId del select
 * en la modal nueva auditoria para llenar el select de sedes]
 * @return {[type]} [description]
 */
function selectUnidadOrganizativaNewAuditoria()
{
    idUnidadNegocioNewAuditoria = document.getElementById('sel_new_unidad_organizativa').value;
    var select = 'sel_new_sede'
    getSelectSedePorIdUnidadNegocio(idUnidadNegocioNewAuditoria, select)
}

/**
 * [selectUnidadOrganizativaModificarAuditoria obtener UnidadNegocioId del select
 * en la modal modificar auditoria para llenar el select de sedes de la misma modal]
 * @return {[type]} [description]
 */
function selectUnidadOrganizativaModificarAuditoria()
{
    idUnidadNegocio = document.getElementById('sel_unidad_organizativa').value;
    var select      = 'sel_sede'
    getSelectSedePorIdUnidadNegocio(idUnidadNegocio, select)
    // console.log("idUnidadNegocio",idUnidadNegocio)
    // console.log("sede",sede)
}

/**
 * [getSelectSedePorIdUnidadNegocio cargar los datos de los select sedes]
 * @param  {[int]} idUnidadNegocio [id de la unidad de negocio]
 * @param  {[string]} select          [id del select a cargar]
 * @return {[type]}                 [description]
 */
function getSelectSedePorIdUnidadNegocio(idUnidadNegocio, select)
{
    // console.log("idUnidadNegocio "+idUnidadNegocio, "select "+select)
    if(idUnidadNegocioFiltro==0){
        $("#"+select).html("<option value='0'  selected>           </option>")
        return false;
    }


    var servicio = '/api/Get-Sede-All?code=';
    var getSedeAllAuditoria = "0N470WSSjrIb6hhHAsgBHgS8wplALMbCB6KcP5FmsjFDvjQkcaaWbw==";
    var metodoHttp = "objectlist";
    var metodoAjax =  "GET";
    var url = apiurlAuditoria+servicio+GetSedesAll+"&UnidadNegocioId="+idUnidadNegocio+"&httpmethod="+metodoHttp;
    //var url = apiurlAuditoria+servicio+getSedeAllAuditoria+"&UnidadNegocioId="+idUnidadNegocio+"&httpmethod="+metodoHttp;
    var headers ={
        "apikey":constantes.apiKey
    }
    $("#"+select).html("<option value='' selected disabled>Buscando...</option>")
    //jsonSedes = [];
        $.ajax({
            method: metodoAjax,
            url:  url,
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function( data)
        {
            $("#"+select).html("<option value='0'  selected>              </option>")
            //$("#"+select).append("")
            data.map(function(item)
            {
                if(sede==item.Id){
                    $("#"+select).append(`<option selected description='${item.Description}' value='${item.Id}'>${item.Code}</option>`);
                }
                else{
                    $("#"+select).append(`<option description='${item.Description}' value='${item.Id}'>${item.Code}</option>`);
                }
            });

        }).fail(function( jqXHR, textStatus, errorThrown ) {
            swal("Error","No se pudieron cargar las sedes, por favor verifique su conexion a internet y vuelva a intentarlo","error")
            //showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
            //console.log(errorThrown)
            //$("#"+select).hide();
        });
}

// AL SELECIONAR UNA NORMA EN MODAL CREAR AUDITORIA
/**
 * [selectNewNormas guardamos las opciones selecionas en un array llamado
 * sel_new_normas para luego usarlo al momento de guardar la auditoria
 * en la funcion setRegistrarAuditoriaDB]
 * @param  {[select]} select [el select con el id sel_new_normas en la modal nueva auditoria]
 * @return {[type]}        [description]
 */
function selectNewNormas(select)
{
    /*if($("#sel_new_normas option:selected").length >= 2){
        showNotification("Puedes selecionar un máximo de 2 Normas.")
    }
    else{
        $("#sel_new_normas option:selected").each(function() {
            sel_new_normas = $("#sel_new_normas").val();
            normasCode = $('option:selected', select).attr('Code');
    console.log("sel_new_normas",sel_new_normas)
    console.log("normasCode",normasCode)
    console.log("length",$("#sel_new_normas option:selected").length)
        });
    }//*/
    /*$("#sel_new_normas option:selected").each(function() {
        sel_new_normas = $("#sel_new_normas").val();
        normasCode      = $('option:selected', select).attr('Code');
    });
    console.log("sel_new_normas",sel_new_normas)
    console.log("normasCode",normasCode)
    //*/
}

// AL SELECIONAR UNA SEDE EN MODAL CREAR AUDITORIA
function selectNewSedes(select)
{
    var i           = 0
    $("#sel_new_sede option:selected").each(function() {
        sel_new_sede    = $("#sel_new_sede").val();
        sede            = $("#sel_new_sede").val();
        sedeText        = $("#sel_new_sede option:selected").text();
        sedeDescription = $('option:selected', select).attr('description');
        //sedeText2 = $('option:selected', select).attr('description');
        //console.log("sede",sede)
        //console.log("sedeText",sedeText)
        //console.log("sedeDescription",sedeDescription)

    });
}

// AL SELECIONAR UNA NORMA EN LA MODAL MODIFICAR CORREGUIR AUDITORIA
/**
 * [selectNormas guardamos las opciones selecionas en un array llamado
 * sel_normas para luego usarlo al momento de modificar-corregir la
 * auditoria en la funcion confirmarCambiosAuditoria]
 * @param  {[type]} select [description]
 * @return {[type]}        [description]
 */
function selectNormas(select)
{

    /*$("#sel_normas option:selected").each(function() {
        sel_normas = $("#sel_normas").val();
        normasCode = $('option:selected', select).attr('Code');
    });

    console.log("sel_normas",sel_normas)
    console.log("normasCode",normasCode)//*/
}

// AL SELECIONAR UNA SEDE EN LA MODAL MODIFICAR O CORREGUIR AUDITORIA
function selectSedes(select)
{
    var i           = 0
    $("#sel_sede option:selected").each(function() {
        sel_sede        = $("#sel_sede").val();
        sede            = $("#sel_sede").val();
        sedeText        = $("#sel_sede option:selected").text();
        sedeDescription = $('option:selected', select).attr('description');
        //console.log("sedeDescription",sedeDescription)

    });
}

// AL HACER CLICK EN EL BOTON + NUEVA AUDITORIA
function modalNewAuditoria()
{
    //limpiamos los filtros
    $("#txt_date_start_evaluacion").val('')
    $("#txt_date_end_evaluacion").val('')
    //limpiamos los filtros.
    $("#sel_filter_unidad_organizativa").val("Seleccionar");
    document.getElementById("sel_filter_sede").value = '0';
    document.getElementById("sel_filter_estado").value = '0';
    //listamos todas las auditorias
    vw_auditorias_list.filtroTablaDivsAuditorias();
    //limpiamos la variable global de la norma selecionada
    sel_new_normas=[];
    //LEVANTAMOS LA MODAL PARA REGISTRAR UNA NUEVA AUDITORIA //&nbsp;&nbsp;&nbsp;&nbsp;
    $("#tituloModalNewAuditoria").html("<b>&nbsp;&nbsp;Registro de auditoría en Programa "+nombre_programa_auditoria+"</b>")
    // limpiar select unidad organizativa
    $("#sel_new_unidad_organizativa").html(`<option value="" selected disabled>             </option>`);
    for(i in jsonUnidadesOrganizativas){
        // console.log("i: "+i, jsonUnidadesOrganizativas[i].Code)
        //$("#sel_new_unidad_organizativa").html(`<option value="" selected disabled >                </option>`);
        $("#sel_new_unidad_organizativa").append('<option description="'+jsonUnidadesOrganizativas[i].Description+'" value="'+jsonUnidadesOrganizativas[i].Id+'">'+jsonUnidadesOrganizativas[i].Code+'</option>');

    }
    // limpiar select sedes
    $("#sel_new_sede").html(`<option value="" selected disabled >                </option>`);
    /*for(i in jsonSedes){
       $("#sel_new_sede").append(`<option description='`+jsonSedes[i].Description+`' value='`+jsonSedes[i].Id+`'>`+jsonSedes[i].Code+`</option>`);
    }//*/

    // limpiar select normas
    $("#sel_new_normas").html('');
    $("#divCountNormas").html('0');
    for(i in jsonNormas){
        // console.log("i: "+i, jsonNormas[i].Code)
        $("#sel_new_normas").append('<option code="'+jsonNormas[i].Code+'" value="'+jsonNormas[i].Code+'" disabled="disabled">'+jsonNormas[i].Code+'</option>');

    }
    // limpiar tipo de auditoria
    $("#sel_new_tipo_auditoria").html('<option value="0" selected disabled >                </option>');
    for(i in jsonTipoAuditoria){
        // console.log("i: "+i, jsonTipoAuditoria[i].Code)
        $("#sel_new_tipo_auditoria").append('<option code="'+jsonTipoAuditoria[i].Code+'" value="'+jsonTipoAuditoria[i].Id+'">'+jsonTipoAuditoria[i].Description+'</option>');

    }

    // mostrar modal
    $('#newAuditoriaModal').modal('show')

}

// AL HACER CLICK EN EL BOTON FINALIZAR AUDITORIA
/**
 * [finalizarAuditoria
 * si Flag_Completada = 0 la actualizamos a 1 en la tabla programaAuditoria]
 * si Flag_completada = 1 y todas las auditorias tienen estado de evaluacion = corregida el
 * status del PA pasa a Corregido
 *
 * @return {[type]} [description]
 */
function finalizarAuditoria()
{
    //
    // console.log("finalizar auditoria")
    // console.log("Flag_Completada ",Flag_Completada)
    if(Flag_Completada==0){
        Flag_Completada = 1
        // console.log("cambiamos Flag_Completada a 1 en P.A.", Flag_Completada)
        ////// EJECUTAMOS EL SERVICIO FINALIZAR PROGRAMA PARA QUE CAMBIE Flag_Completada = 1
    }else if(Flag_Completada==1){
        // console.log("Flag_Completada es 1 ", Flag_Completada)
        // console.log("hayAuditoriasObservadas ",hayAuditoriasObservadas)
        // console.log("hayAuditoriasCorregidas ",hayAuditoriasCorregidas)
        // console.log("hayAuditoriasAprobadas ",hayAuditoriasAprobadas)
        // console.log("hayAuditoriasSinEvaluzacion ",hayAuditoriasSinEvaluzacion)

    }
    //showNotification("En espera del servicio....!!!")
}

/// AL HACER CLICK EN EL BOTON VER AUDITORIA
/**
 * [verAuditoria LEVANDAR LA MODAL PARA VER LOS DATOS UNA AUDITORIA]
 * @param  {[INR]} id [Id DE LA AUDITORIA A CONSULTAR]
 * @return {[type]}    [description]
 */
function verAuditoria(id)
{
    id_auditoria = id
    // console.log("id_auditoria " + id_auditoria)
    var ver = document.getElementById("btnVerAuditoria_"+id);
    codeAuditoria = ver.getAttribute("Code")
    EstatusEvaluacionId = ver.getAttribute("StatusEvaluacionId")
    // console.log("ver EstatusEvaluacionId ",EstatusEvaluacionId)
    //console.log("unidad organizativa",jsonUnidadesOrganizativas[auditor[id][1]])
    $("#idAuditoria").val(id)
    $('#verModalAuditoria').modal('show');
    // TITULO MODAL VER AUDITORIA
    //$("#tituloModalVerAuditoria").html("<b>Auditoria - "+auditor[id][0]+"</b>")
    $("#tituloModalVerAuditoria").html("<b>Auditoría - "+ver.getAttribute("Code")+"</b>")
    // UNIDAD ORGANIZATIVA
    //$("#divTextoUnidadOrganizativa").html(""+auditor[id][1]+"")
    $("#divTextoUnidadOrganizativa").html(ver.getAttribute("DescriptionUnidadNegocio"))//*/
    // TIPO DE AUDITORIA
    //$("#divTextoTipoAuditoria").html(""+auditor[id][4]+"")
    $("#divTextoTipoAuditoria").html(ver.getAttribute("DescriptionAuditoria"))
    // SEDE DONDE SE REALIZARA LA AUDITORIA
    //$("#divTextoSede").html(""+auditor[id][2]+"")
    $("#divTextoSede").html(ver.getAttribute("DescriptionSede"))
    $("#divTextoSede").html(ver.getAttribute("DescriptionSede"))
    // FECHA INICIO DE LA AUDITORIA
    //$("#divFechaInicioCA").html("<span><b>"+auditor[id][5]+"</b></span>")
    $("#divFechaInicioCA").html(ver.getAttribute("Inicio"))
    // FECHA FIN DE LA AUDITORIA
    //$("#divFechaFinCA").html("<span><b>"+auditor[id][6]+"</b></span>")
    $("#divFechaFinCA").html(ver.getAttribute("Fin"))
    //MOSTRAR NORMAS SELECCIONADAS
    let normas = ver.getAttribute("Code_Normas")
    let nor = normas.split(',')

    if(nor.length===2){
        $("#divNorma1CA").html('<div class="norma-ver-auditoriaCA pl-3 pt-2 mr-3">'+nor[0]+'</div>')
        $("#divNorma2CA").html('<div class="norma-ver-auditoriaCA pl-3 pt-2 mr-3">'+nor[1]+'</div>')
    }else{
        $("#divNorma1CA").html('<div class="norma-ver-auditoriaCA pl-3 pt-2 mr-3">'+nor[0]+'</div>')
        $("#divNorma2CA").html('')
    }



    /**
     * [tieneHistorial BANDERA PARA SABER SI LA AUDITORIA TIENE MODIFICACIONES O NO ]
     * @type {Boolean}
     */
    let tieneHistorial = false
    cambiosFechas  = 0;
    auditoriaHistorial = []
    auditoriaModificacionLog.forEach((Item) => {
        if(Item.AuditoriaId==id_auditoria){
            tieneHistorial = true;
            if(Item.TipoModificacionId==1){
                cambiosFechas++
            }

            // LLEMANOS EL ARRAY CON LAS MODIFICACIONES DE LA AUDITORIA CONSULTADA
            auditoriaHistorial.push(Item)
        }

    })
    // console.warn("cambios de fechas"+cambiosFechas)
    // OCULTAMOS O MOSTRAMOS EL LINK DE HISTORIAL DE CAMBIOS
    if(tieneHistorial){
        // MOSTRAMOS EL LINK PARA VER EL HISTORIAL DE CAMBIOS
        $("#divHistorialCambios").css("display", "block");
    }
    else{
        // OCULTAMOS EL LINK PARA VER EL HISTORIAL DE CAMBIOS
        $("#divHistorialCambios").css("display", "none");
    }


    //console.log("StatusId ",ver.getAttribute("StatusId"))
    //console.log("StatusEvaluacionId ",ver.getAttribute("StatusEvaluacionId"))
    /**
     * [verificamos si el estatusEvaluacion es 1 (observada)]
     */
    if(ver.getAttribute("StatusEvaluacionId")==1){
        $("#divObservaciones").css("display", "block");
        //$("#observacionText").css("display", "block");
        auditoriaObservacion = ""
        var id = 0
        auditoriaObservacionesLog.forEach((Item) => {
            if(Item.AuditoriaId==id_auditoria){
                if(Item.AuditoriaId==id_auditoria && Item.Active==1){
                    id = Item.id
                    auditoriaObservacion = Item.Observacion

                }
            }
        })
        //console.warn(" auditoriaObservacion",auditoriaObservacion)
        //$("#divDetalleObservacion").html("<span>"+auditoriaObservacion+"</span>")
        $("textarea#observacionText").text(auditoriaObservacion)

    }else $("#divObservaciones").css("display", "none");

    /**
     * verificamos el si el StatusId > 4 ||
     * tiene dos o mas cambios de fechas
     * para bloquedar el boton modificar
     * de la modal ver auditoria
     */
    if(ver.getAttribute("StatusId") >= 5){
        //console.log("bloquear boton modficar")
        $("#bt_modificar_auditoria").attr("disabled",true)
    }else $("#bt_modificar_auditoria").attr("disabled",false)

    if( getCookie( "vtas_rolexternalrol" + sessionStorage.tabVisitasa ) == 'ROL_LIDERAUDITORIA')
    {
        //$("#bt_modificar_auditoria").hide()
        $("#bt_modificar_auditoria").attr("disabled",true)
    }
    else
    {
        $("#bt_modificar_auditoria").attr("disabled",false)
    }

}

/**
 * [verHistorialAuditoriaId levantamos la modal del historial de una auditoría
 * consultamos a la DB dicho historial y lo mostramos en la modal]
 * @return {[type]} [description]
 */
function verHistorialAuditoriaId()
{
    // console.log("historial "+id_auditoria);
    // TITULO MODAL HISTORIAL AUDITORIA
    $("#divTituloHistorialAuditoria").html("<b>Ver historial de la Auditoría - "+codeAuditoria+"</b>")
    // LEVANTAMOS MODAL HISTORIAL DE AUDITORIAS
    $('#historialAuditoriaModal').modal('show')
    // lIMPIAMOS EL DIV DONDE VA EL HISTORIAL
    $("#divDetalleHistorialAuditoria").html("")

    auditoriaHistorial.forEach((Item) => {
        // console.log("Item.DescripcionTipoModificacion "+Item.DescripcionTipoModificacion);
        $("#divDetalleHistorialAuditoria").append(
            '<div class="row mx-2 mt-2 row-table-modal align-items-center" style="height: 10vh;">'+
                '<div class="col-3">'+Item.DescripcionTipoModificacion+'</div>'+
                '<div class="col-3">'+moment(Item.Create_Date).format('DD/MM/YYYY')+'</div>'+
                '<div class="col-3">'+Item.Data_inicial+'</div>'+
                '<div class="col-3">'+Item.Data_Final+'</div>'+
            '</div>'
        )
    })

}



/**
 * AL HACER CLICK EN BOTON DE CREAR EN LA MODAL NUEVA AUDITORIA
 * [guardarAuditoria VALIDAMOS QUE ESTEN TODOS LOS DATOS SOLICITADOS]
 * @return {[type]} [description]
 */
function guardarAuditoria()
{


    //console.log($("#sel_new_unidad_organizativa").val())
    //console.log($("#sel_new_unidad_organizativa option:selected").text())
    var result            = false;
    unidad_auditoria      = document.getElementById('sel_new_unidad_organizativa').value;
    unidad_auditoria_text = $("#sel_new_unidad_organizativa option:selected").text()
    sede                  = document.getElementById('sel_new_sede').value;
    sede_text             = $("#sel_new_sede option:selected").text()
    tipo_auditoria        = document.getElementById('sel_new_tipo_auditoria').value;
    date_start            = document.getElementById('tx_date_start_new_auditoria').value;
    date_end              = document.getElementById('tx_date_end_new_auditoria').value;


    if(sel_new_normas.length==2)
        normasText = sel_new_normas[0]+','+sel_new_normas[1]
    else
        normasText = sel_new_normas[0]

    // console.log("auditor",auditor)

    ///  vemos si hay en la misma sede
    let totalAuditorias = 0
    let normaIgual      = false

   //alert("csa "+TotalAuditorias)

    if( unidad_auditoria != 0 && sede != 0 && tipo_auditoria != 0 && sel_new_normas.length>0)
       result = true

    if(result)
    {
        var msj = "" ///mensaje de error en swal
        // AQUI RECORRO LAS AUDITORIAS REGISTRADAS
        /*for (i in auditor)
        {
            let rango = false
            //VALIDO SI LA FECHA ESTE EN EL RANGO DE FECHAS DE OTRA AUDITORIA
            rango = validarDentroRangoDeFechas(auditor[i].Inicio, auditor[i].Fin, date_start)

            // SI ES LA MISMA SEDE Y ESTA EN EL RANGO DE FECHAS
            // CONTAMOS LAS NORMAS REGISTRADAS
            if(auditor[i].SedeId==sede && rango)
            {
                // alert("contar normas de esta auditoria")
                // console.log("auditor[i]",auditor[i])
                normas = auditor[i].Code_Normas.split(',')
                totalAuditorias += normas.length
                msj = "la auditoria "+auditor[i].Code+" de la sede "+auditor[i].DescriptionSede+" (Especialidad "+DescriptionEspecialidad+")"
                //alert("total auditorias " + totalAuditorias)
                //aqui recorro las normas que tiene la auditoria registrada
                for(j in normas)
                {
                    for(h in sel_new_normas)
                    {
                        if(normas[j]==sel_new_normas[h])
                        {
                            normaIgual = true
                            // console.log("normas["+j+"]" ,normas[j])
                            //console.log("programa ")
                            msj = "La auditoría "+auditor[i].Code+" de la sede "+auditor[i].DescriptionSede+
                                 " (Especialidad "+DescriptionEspecialidad+") ya tiene esta norma programada para ser auditada"
                        }
                    }
                }
            }
        }*/

        var fallo = 0;
        /*if(normaIgual)
        {

            //verModalError("Error", msj)
            swal("Error", msj, "error")

            //return
            fallo = 1
        }
        else
        {
            if(totalAuditorias>=2)
            {
                //swal("Error", "Ya hay registradas dos normas en esta fecha para esta sede.", "error")
                swal("Error", "Existen dos ( 2 ) normas programadas en "+msj+" en estas fechas", "error")
                //return
                fallo = 1
            }
            else
            {
                totalAuditorias += sel_new_normas.length
                if(totalAuditorias > 2){
                    swal("Error", "Exite una ( 1 ) norma programada en "+msj+" en esta fechas, No puede auditar mas de dos normas en un mismo día.", "error")
                    //return
                    fallo = 1
                }
            }
        }*/


        if(fallo==0){
            $('#modalConfirmarIngresarAuditoria').modal('show').addClass("fade");
            $('#newAuditoriaModal').removeClass("fade").modal('hide');
        }
    }
    else
    {
        swal("Error","Por favor complete todos los campos del formulario","error")
    }

}

/**
 * AL HACER CLICK EN EL BOTON MODIFICAR EN LA MODAL VER AUDITORIA
 * [modalModificarAuditoria description]
 * @return {[type]} [description]
 */
function modalModificarAuditoria()
{

    // Bloqueamos select unidad organizativa
    $("#sel_unidad_organizativa").attr("disabled",true);
    // Bloqueamos select sede
    $("#sel_sede").attr("disabled",true);

    var ver = document.getElementById("btnVerAuditoria_"+id_auditoria);

    // TITULO DE MODAL
    $("#titleModificarAuditoria").html("<b>Auditoría - "+ver.getAttribute('Code')+"</b>")

    //valor selecionado de la sede
    sede = ver.getAttribute('sedeid')

    // LLENAMOS EL SELECT DE UNIDADES ORGANIZATIVAS
    $("#sel_unidad_organizativa").html("<option value='' disabled>                </option>");
    $("#sel_sede").html("<option value='' disabled>                </option>");
    for (i in jsonUnidadesOrganizativas){
        /*if(jsonUnidadesOrganizativas[i].Description==ver.getAttribute("CodeUnidadNegocio"))
            console.warn("selecionar este "+jsonUnidadesOrganizativas[i].Description+" == "+ver.getAttribute("CodeUnidadNegocio"))//*/
        if(ver.getAttribute("CodeUnidadNegocio")===jsonUnidadesOrganizativas[i]['Description']){
            $("#sel_unidad_organizativa").append(`<option selected description='${jsonUnidadesOrganizativas[i].Description}' value='${jsonUnidadesOrganizativas[i].Id}'>${jsonUnidadesOrganizativas[i].Code}</option>`);
            // console.warn("Selecionar este1",jsonUnidadesOrganizativas[i]['Description'])
            // console.warn("SedeId ",sede)
            // console.warn("Sedes ",jsonSedes)
            //getSelectSedePorIdUnidadNegocio(jsonUnidadesOrganizativas[i].Id,'sel_sede')
            for(j in jsonSedes){

                if(ver.getAttribute("sedeid")==jsonSedes[j].Id){
                    $("#sel_sede").append(`<option description='`+jsonSedes[j].Description+`' value='`+jsonSedes[j].Id+`'>`+jsonSedes[j].Code+`</option>`);
                }
            }
        }else
            $("#sel_unidad_organizativa").append(`<option value='${jsonUnidadesOrganizativas[i].Id}'>${jsonUnidadesOrganizativas[i].Code}</option>`);
    }

    // LLENAMOS EL SELECT DE TIPO DE AUDITORIA
    $("#sel_tipo_auditoria").html("<option value='' disabled>                </option>")
    for (i in jsonTipoAuditoria){
        if(jsonTipoAuditoria[i].Id == ver.getAttribute("TipoId")){
            $("#sel_tipo_auditoria").append("<option selected Code='"+jsonTipoAuditoria[i].Code+"' value='"+jsonTipoAuditoria[i].Id+"'>"+jsonTipoAuditoria[i].Description+"</option>");
        }
        else
        {
            $("#sel_tipo_auditoria").append("<option Code='"+jsonTipoAuditoria[i].Code+"' value='"+jsonTipoAuditoria[i].Id+"'>"+jsonTipoAuditoria[i].Description+"</option>");
        }
    }

    // INICIALIZAMOS LA FECHA INICIO DE AUDITORIA
    //$("#tx_date_start_auditoria").val(ver.getAttribute("Inicio2"))
    // INICIALIZAMOS LA FECHA FIN DE AUDITORIA
    // $("#tx_date_end_auditoria").val(ver.getAttribute("Fin2"))
    //$("#tx_date_end_auditoria").val(moment().format())
    //var now = moment().add(50, 'days').format('DD/MM/YYYY');
    var now = ver.getAttribute("Inicio2");
    var end = ver.getAttribute("Fin2");

    $("#tx_date_start_auditoria_ver").val(now);
    $("#tx_date_end_auditoria_ver").val(end);

    $("#tx_date_start_auditoria").css("display","block");
    $("#tx_date_end_auditoria").css("display","block");
    $("#tx_date_start_auditoria_ver").css("display","block");
    $("#tx_date_end_auditoria_ver").css("display","block");

    $("#tx_date_start_auditoria").val(now);
    $("#tx_date_start_auditoria").datetimepicker({
      timepicker:false,
      format:'d/m/Y',
      //defaultDate: now,
      minDate: new Date(moment().add(50, 'days').format('YYYY-MM-DD'))
    });
    $("#tx_date_end_auditoria").val(end);
    $("#tx_date_end_auditoria").datetimepicker({
      timepicker:false,
      format:'d/m/Y',
      //defaultDate: now,
      minDate: new Date(moment().add(50, 'days').format('YYYY-MM-DD'))
    });

    if(cambiosFechas>=2){
        //$("#tx_date_end_auditoria").attr("disabled", true);
        //$("#tx_date_start_auditoria").attr("disabled", true);
        $("#tx_date_start_auditoria").css("display","none");
        $("#tx_date_end_auditoria").css("display","none");
        $("#divMaxCambiosDate").css("display", "block");
    }else{
        //$("#tx_date_end_auditoria").attr("disabled", false);
        //$("#tx_date_start_auditoria").attr("disabled", false);
        $("#tx_date_start_auditoria_ver").css("display","none");
        $("#tx_date_end_auditoria_ver").css("display","none");
        $("#divMaxCambiosDate").css("display", "none");
    }

    /*console.log("end ",end)
    console.log("now ",now)
    console.log('val(ver.getAttribute("Inicio2") ',ver.getAttribute("Inicio2"))
    //console.log('val(ver.getAttribute("Fin2") ',val(ver.getAttribute("Fin2")))//*/

    let normas = ver.getAttribute("Code_Normas")
    let nor = normas.split(',')
    $("#divCountNormasModificar").html(nor.length)
    // console.log("normas ",normas)
    // console.log("nor ",nor)
    // console.log("nor.length ",nor.length)
    // console.log("nor[0]",nor[0])
    // console.log("nor[1]",nor[1])
    if(nor.length===2){
        $("#divNorma1CA").html('<div class="norma-ver-auditoriaCA pl-3 pt-2 mr-3">'+nor[0]+'</div>')
        $("#divNorma2CA").html('<div class="norma-ver-auditoriaCA pl-3 pt-2 mr-3">'+nor[1]+'</div>')
    }else{
        $("#divNorma1CA").html('<div class="norma-ver-auditoriaCA pl-3 pt-2 mr-3">'+nor[0]+'</div>')
        $("#divNorma2CA").html('')
    }
    $("#sel_normas").html("");
    for (i in jsonNormas){
        //if(ver.getAttribute("Norma1")===jsonNormas[i]['Code'] || ver.getAttribute("Norma2")===jsonNormas[i]['Code']){
        if(nor.length===2){

            if(nor[0]===jsonNormas[i]['Code'] || nor[1]===jsonNormas[i]['Code']){
                //$("#sel_normas").append(`<option disabled selected value='${jsonNormas[i].Id}'>${jsonNormas[i].Code}</option>`);
                $("#sel_normas").append(`<option disabled selected Code='${jsonNormas[i].Code}' value='${jsonNormas[i].Code}'>${jsonNormas[i].Code}</option>`);
                //console.warn("Selecionar este",jsonNormas[i]['Code'])
            }else
                //$("#sel_normas").append(`<option value='${jsonNormas[i].Id}'>${jsonNormas[i].Code}</option>`);
                $("#sel_normas").append(`<option disabled Code='${jsonNormas[i].Code}' value='${jsonNormas[i].Code}'>${jsonNormas[i].Code}</option>`);
        }
        else
        {
            if(nor[0]===jsonNormas[i]['Code']){
                //$("#sel_normas").append(`<option selected value='${jsonNormas[i].Id}'>${jsonNormas[i].Code}</option>`);
                $("#sel_normas").append(`<option disabled selected Code='${jsonNormas[i].Code}' value='${jsonNormas[i].Code}'>${jsonNormas[i].Code}</option>`);
                //console.warn("Selecionar este",jsonNormas[i]['Code'])
            }else
                //$("#sel_normas").append(`<option value='${jsonNormas[i].Id}'>${jsonNormas[i].Code}</option>`);
                $("#sel_normas").append(`<option disabled Code='${jsonNormas[i].Code}' value='${jsonNormas[i].Code}'>${jsonNormas[i].Code}</option>`);
        }
    }//*/

    // MOSTRAMOS EL DETALLE DE LAS OBSERVACION
    //alert(ver.getAttribute("StatusEvaluacionId"))
    $("#divDetalleObservacion2").html("");
    if(ver.getAttribute("StatusEvaluacionId")==1){
        $("#divDetalleObservacion2").html("<span style='color: #ff5050;'>"+auditoriaObservacion+"</span>")
    }

    // cerramos modal ver
    $('#bt_cerrar_ver_auditoria').trigger('click');
    // levantamos modal modificar
    $('#modificarAuditoriaModal').modal('show')

}

// AL HACER CLICK EN EL BOTON MODIFICAR DE LA MODAL MODIFICAR AUDITORIA
function modificarAuditoria()
{
    var id = $("#idAuditoria").val()
    console.log("id",id_auditoria)
    sel_normas = "";
    $("#sel_normas option:selected").each(function() {
        sel_normas = $("#sel_normas").val();
    });

    // VALIDAMOS EL FORMUALARIO
    var res = validarAuditoria()
    //console.log("res",res)

    if(result)
    {
        // ABRIMOS MODAL CONFIRMAR CAMBIOS EN AUDITORIA
        $('#modalConfirmarCambiosAuditoria').modal('show')
        // CERRAMOS MODAL MODIFICAR AUDITORIA
        $('#modificarAuditoriaModal').modal('hide');
    }
    else{ swal("Error","Ingrese todos los datos","error") }

}//*/

// AL HACER CLICK EN EL BOTON CONFIRMAR EN LA MODAL DE
// CONFIRMAR MODIFICACIONES CORRECIONES DE LA AUDITORIA
function confirmarCambiosAuditoria()
{

    // CERRAMOS MODAL CONFIRMAR CAMBIOS AUDITORIA...
    $('#modalConfirmarCambiosAuditoria').modal('hide');
    showLoading()

    unidadNegocio     = document.getElementById('sel_unidad_organizativa').value;
    unidadNegocioText = $("#sel_unidad_organizativa option:selected").text()
    sede              = document.getElementById('sel_sede').value;
    sedeText          = $("#sel_sede option:selected").text()
    tipoAuditoria     = document.getElementById('sel_tipo_auditoria').value;
    tipoAuditoriaText = $("#sel_tipo_auditoria option:selected").text()
    fechaInicio       = document.getElementById('tx_date_start_auditoria').value;
    fechaFin          = document.getElementById('tx_date_end_auditoria').value;
    var ver = document.getElementById("btnVerAuditoria_"+id_auditoria);
    Code              = ver.getAttribute("Code")
    Description         = ver.getAttribute("Description")
    StatusEvaluacionId  = ver.getAttribute("StatusEvaluacionId")
    Created_by          = ver.getAttribute("Created_by")

    normasText = ver.getAttribute("Code_Normas")
    console.log("normasText",normasText)
    console.log("Code",Code)

    //si es 1 (observada)
    if(EstatusEvaluacionId==1)
        EstatusEvaluacionId = 2 // lapasamos a correguida

    console.log("!*!*!*! EstatusEvaluacionId ",EstatusEvaluacionId)
    StatusId          = ver.getAttribute("StatusId")
    DescriptionStatus = ver.getAttribute("DescriptionStatus")
    //alert("StatusEvaluacionId " +StatusEvaluacionId)

    // console.log("fechaInicio1 ",fechaInicio)
    // console.log("fechaFin2 ",fechaFin)
    // console.log(ver.getAttribute("Inicio2"))
    // console.log(ver.getAttribute("Fin2"))
    // console.log("fechaInicio ",fechaInicio)
    // console.log("fechaFin ",fechaFin)
    //return false;

    if( (fechaInicio!=ver.getAttribute("Inicio2") || fechaFin != ver.getAttribute("Fin2")) && (StatusEvaluacionId==3) )
    {
        //alert("Cambiar estatus a reprogramada "+StatusEvaluacionId)

        DescriptionStatus = "Reprogramada";
        StatusId          = 3;
    }

    fechaInicio = formatearFechaDB(fechaInicio)
    fechaFin    = formatearFechaDB(fechaFin)

    var Last_Updated_By   = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
    var Last_Updated_Date = moment().format();

    var servicio = "/api/Post-Auditoria-All?code="
    var postAuditoriaAll = "l/Ucgq69Kj8Yur7Se2RlCYtWga8XKfd8TuLSma8pYoGnsP/GqJO81g=="
    console.log(JSON.stringify({"Id":id_auditoria,"Code":Code,"SedeId":sede,"TipoId":tipoAuditoria,"StatusId":StatusId,"Inicio":fechaInicio,
            "Fin":fechaFin,"Code_Normas":normasText,"Last_Updated_By":Last_Updated_By,"Last_Updated_Date":Last_Updated_Date,"ProgramaAuditoriaId":id_programa_auditoria,"StatusEvaluacionId":StatusEvaluacionId}))
    var settings = {
        "url": apiurlAuditoria+"/api/Post-Auditoria-All?code=l/Ucgq69Kj8Yur7Se2RlCYtWga8XKfd8TuLSma8pYoGnsP/GqJO81g==&httpmethod=put&Id="+id_auditoria,
        "method": "POST",
        "timeout": 0,
        "crossDomain": true,
        "dataType": "json",
        "headers": {
            "apikey": "r$3#23516ewew5",
            "Content-Type": "application/json",
            //"Cookie": "ARRAffinity=a83b483df408e977188ac9dc47b9c62843a9cf2b4d80808e3feaaaabec8efe1d"
        },


        "data": JSON.stringify({"Id":id_auditoria,"Code":Code,"Description":Description,"SedeId":sede,"TipoId":tipoAuditoria,"StatusId":StatusId,"Inicio":fechaInicio,
            "Fin":fechaFin,"Code_Normas":normasText,"Created_By":Created_by,"Last_Updated_By":Last_Updated_By,"Last_Updated_Date":Last_Updated_Date,
            "ProgramaAuditoriaId":id_programa_auditoria,"StatusEvaluacionId":StatusEvaluacionId}),
    };

    //console.log("despues de return")
    $.ajax(settings).done(function (response) {
        console.log(response);


        if(response.Id==0)
        {
            swal({
                title: "Error",
                text: response.Description,
                type: "error",
                //timer:3000,
                showCancelButton: false,
                confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
                confirmButtonText: "De acuerdo",
                closeOnConfirm: false
              });
            // CERRAMOS MODAL CONFIRMAR INGRESO AUDITORIA
            $('#modalConfirmarCambiosAuditoria').modal('hide')
            // ABRIMOS MODAL DE REGISTRO DE AUDITORIA
            $('#modificarAuditoriaModal').modal('show');
            return
        }

        // ABRIMOS MODAL EXITO EN REGISTRO DE AUDITORIA...
        $('#modalExitoCambiosAuditoria').modal('show');
        // RECARGAR EL DATATABLE DE AUDITORIAS...
        //vw_auditorias_list.reloadtableBlackList()
        // Volvemos a listar la tabla con los divs
         //vw_auditorias_list.tablaDivsAuditorias()
         vw_auditorias_list.filtroTablaDivsAuditorias()

         //vw_auditorias_list.init()
        // RECARGAR EL ARRAY QUE CONTINE LAS MODIFICAIONES DE LAS AUDITORIAS...
        vw_auditorias_list.getAuditoriaModificacionLog()

    })
    .fail(function( jqXHR, textStatus, errorThrown )
    {

        //showNotification("Por favor Verifique los datos ingresados, su conexión a internet y vuelva a intentarlo.")
        swal("Error", "Por favor Verifique los datos ingresados, su conexión a internet y vuelva a intentarlo.","error")
        console.log(errorThrown)
    })
    .always(function( jqXHR, textStatus, errorThrown )
    {
        console.warn("jqXHR -> ",jqXHR)
        hideLoading()
    });//*/

}

// PRUEBA
var mensajeAlerta = function(){
   //alert("Asignar equipo")
}

// VALIDAMOS QUE ESTEN TODOS LOS DATOS
// ESTA FUNCION LA LLAMO EN LA function modificarAuditoria()
var validarAuditoria = function(){

    result                = false;
    // ALMACENAMOS LOS DATOS EN ESTAS VARIABLES
    unidad_auditoria      = document.getElementById('sel_unidad_organizativa').value;
    unidad_auditoria_text = $("#sel_unidad_organizativa option:selected").text()
    sede                  = document.getElementById('sel_sede').value;
    sede_text             = $("#sel_sede option:selected").text()
    tipo_auditoria        = document.getElementById('sel_tipo_auditoria').value;
    date_start            = document.getElementById('tx_date_start_auditoria').value;
    date_end              = document.getElementById('tx_date_end_auditoria').value;

    let v1 = false // verificamos que la fecha de inicio sea mayor a la fecha actual
    let v2 = false // verificamos que la fecha final sea mayor a la fecha actual
    let v3 = false // verificamos que la fecha de inicio sea menos a la fecha final

    //v1 = validarFechaMenorActual(date_start)
    //v2 = validarFechaMenorActual(date_end)

    /*if(date_start < date_end){
        v3 = true
    }
    if(!(v1 && v2)){
        swal("Error!", "Por favor Verifique las fechas, estas no pueden ser menor o igual a la fecha actual.", "error")
        //showNotification("Por favor Verifique las fechas, estas no pueden ser menor o igual a la fecha actual.")
        return false;
    }
    if(!v3){
        swal("Error!", "Por favor Verifique las fechas, La fecha inicio no puede ser antes de la final fin", "error")
        //showNotification("Por favor Verifique las fechas, La fecha inicio no puede ser antes de la final fin")
        return false;
    }//*/


    //Verificamos que esten selecionados todos los datos necesarios
    if( unidad_auditoria != 0 && sede     != 0 && tipo_auditoria    != 0 &&
        date_start       != 0 && date_end != 0 ) //&& sel_normas.length >  0
       result = true
   //console.log("result",result)
   // RETORNAMOS LOS DATOS A LA FUNCION modificarAuditoria
   return result

}

/**
 * AL HACER CLICK EN GUARDAR AUDITORIA EN LA MODAL DE CONFIRMAR NUEVA AUDITORIA
 * [setRegistrarAuditoriaDB Guardar una nueva auditoria en la DB]
 */
function setRegistrarAuditoriaDB()
{
    showLoading()

    // CERRAMOS MODAL CONFIRMAR INGRESO AUDITORIA
    $('#modalConfirmarIngresarAuditoria').removeClass("fade").modal('hide')

    //console.log("cont_auditorias "+cont_auditorias)
    unidadNegocio     = document.getElementById('sel_new_unidad_organizativa').value;
    unidadNegocioText = $("#sel_new_unidad_organizativa option:selected").text()
    sede              = document.getElementById('sel_new_sede').value;
    sedeText          = $("#sel_new_sede option:selected").text()
    tipoAuditoria     = document.getElementById('sel_new_tipo_auditoria').value;
    tipoAuditoriaText = $("#sel_new_tipo_auditoria option:selected").text()
    fechaInicio       = document.getElementById('tx_date_start_new_auditoria').value;
    fechaFin          = document.getElementById('tx_date_end_new_auditoria').value;

    fechaInicio = formatearFechaDB(fechaInicio)
    fechaFin    = formatearFechaDB(fechaFin)


    if(sel_new_normas.length==2)
        normasText = sel_new_normas[0]+','+sel_new_normas[1]
    else
        normasText = sel_new_normas[0]


        console.log("normasText",normasText)

    //normasText = normasCode
    //normasText = sel_new_normas[0]

    codeAuditoria = crearCodeAuditoria(sel_new_normas[0], sedeDescription)
    var created_by = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);

    console.log("normasText", normasText)
    console.log("sedeText", sedeText)
    console.log("codeAuditoria", codeAuditoria)
    console.log("created_by", created_by)//*/


    $("#idNewAuditoriaModalExito").html(codeAuditoria)
    var body ={ //  ****************  parametros a base de datos AUDITORIA*****************
          //Id:1, // id de la auditoria
          Description: nombre_programa_auditoria
          ,Code: codeAuditoria
          ,SedeId: sede
          ,CodeSede: sedeDescription
          ,DescriptionSede: sedeText
          ,TipoId: tipoAuditoria
          ,DescriptionAuditoria: tipoAuditoriaText
          ,UnidadNegocioId: unidadNegocio
          ,DescriptionUnidadNegocio: unidadNegocioText
          ,StatusId: 1
          ,DescriptionStatus: 'Creada'
          ,Inicio: fechaInicio
          ,Fin: fechaFin
          ,Code_Normas: normasText
          ,Created_By: created_by
          ,Created_Date: moment().format()
          ,Last_Updated_By: created_by
          ,ProgramaAuditoriaId: id_programa_auditoria
          ,StatusEvaluacionId: 0
          //,DescriptionStatusEvaluacion: '---'
    }

    var metodoAjax = "POST";
    var servicio   = "/api/Post-Auditoria-All?code=";
    var clave      = "l/Ucgq69Kj8Yur7Se2RlCYtWga8XKfd8TuLSma8pYoGnsP/GqJO81g==";
    var url = apiurlAuditoria+servicio+clave+"&httpmethod=post";
    var headers ={
        "apikey":constantes.apiKey,
        "Content-Type": "application/json",

    }
    $.ajax({
        method: "POST",
        url:  url,
        data: JSON.stringify(body),
        headers:headers,
        crossDomain: true,
        dataType: "json",
    })
    .done(function(data)
    {
        console.log("data", data)
        if(data.Id == '-1')
        {
            swal({
                title: "Error",
                text: 'No se pudo registrar la auditoria, Verifique las fechas y la norma(s).',//data.Description, //'No se pudo registrar la auditoria, Verifique las fechas y la norma(s).',
                type: "info",
                //timer:3000,
                showCancelButton: false,
                confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
                confirmButtonText: "De acuerdo",
                closeOnConfirm: true
              });

            // ABRIMOS MODAL DE REGISTRO DE AUDITORIA
            $('#newAuditoriaModal').modal('show').addClass("fade");

        }
        else
        {
            // CERRAMOS MODAL CONFIRMAR INGRESO AUDITORIA
            $('#modalConfirmarIngresarAuditoria').removeClass("fade").modal('hide')
            // ABRIMOS MODAL EXITO EN REGISTRO DE AUDITORIA
            $('#modalExitoIngresarAuditoria').modal('show').addClass("fade");
            //vw_auditorias_list.tablaDivsAuditorias();
            primeraCarga=1;
            vw_auditorias_list.filtroTablaDivsAuditorias();
            //$("#formNewAuditoria").reset()
        }

    })
    .fail(function( jqXHR, textStatus, errorThrown )
    {
        swal({
            title: "Error",
            text:'No se pudo registrar la auditoria, Por favor Verifique su conexión a internet y vuelva a intentarlo.',
            type: "error",
            timer:3000,
            showCancelButton: false,
            confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
            confirmButtonText: "De acuerdo",
            closeOnConfirm: false
        });

    })
    .always(function( jqXHR, textStatus, errorThrown )
    {
        console.table(jqXHR)
        hideLoading()
    });//*/

}

/**
 * [crearCodeAuditoria creamos el codigo de identificacion de la auditoria]
 * @return {[string]} [Code auditoria]
 */
function crearCodeAuditoria(norma, sede)
{
    cant = TotalAuditorias+1;
   //alert("TotalAuditorias"+TotalAuditorias)
   //alert("cant"+cant)
    if(cant>0 && cant<10){
        //cant++
        cant = '000'+cant
    }
    if(cant>9&&cant<100){
        //cant++
        cant = '00'+cant
    }
    if(cant>99&&cant<1000){
        //cant++
        cant = '0'+cant
    }
    if(cant>999){
        //cant++
        cant = ''+cant
    }
    if(cant==0){
        cant='0001'
    }
    var year = moment().format("YY");
    code = ''+norma+sedeDescription+cant+year;

    return code
}

/**
 * [formatearFecha formateamos una fecha de DD-MM-YYYY
 * a YYYY/MM/DD
 * @param  {[date]} fecha [en DD/MM/YYYY]
 * @return {[date]}       [en YYYY-MM-DD]
 */
var formatearFechaDB = function(fecha){
    console.log("fechaR",fecha)
    //descomponer la fecha en año, mes y dia (p[2] año, p[1] mes, p[0] dia)
    var p = fecha.split("/")
    fecha = p[2]+"-"+p[1]+"-"+p[0]
    return fecha
}

/**
 * [validarFechaMenorActual validamos que la fecha introducida no sea menor a la fecha actual]
 * @param  {[date]} date [fecha introducida]
 * @return {[boolean]}      [true si es mayor, false si es menor]
 */
var validarFechaMenorActual = function(date){
      var x=new Date();
      var fecha = date.split("/");
      x.setFullYear(fecha[2],fecha[1]-1,fecha[0]);
      var today = new Date();

      if (x <= today)
        return false;
      else
        return true;
}

/**
 * [ver si una fecha esta dentro de un rago de fechas]
 * @param  {[type]} fi [fecha de inicio obtenida de la base de datos]
 * @param  {[type]} ff [fecha finas obtenida de la base de datos]
 * @param  {[type]} fc [fecha a consultar obtenida del imput text datepickert]
 * @return {[type]}    [description]
 */
var validarDentroRangoDeFechas = function(fi, ff, fc){

    let result = false
    let parts           = fc.split("/");
    //let fechaConsulta   = new Date(parts[2], parts[1] - 1, parts[0]);
    let fechaConsulta   = parts[2]+parts[1]-1+parts[0];

    let year        = moment(fi).format('YYYY');//dddd
    let month       = moment(fi).format('MM');//
    let day         = moment(fi).format('DD'); ;
    //let fechaInicio = new Date(year, month-1, day);
    let fechaInicio = year+month-1+day;

    year         = moment(ff).format('YYYY');//dddd
    month        = moment(ff).format('MM');//
    day          = moment(ff).format('DD'); ;
    //let fechaFin = new Date(year, month-1, day);
    let fechaFin = year+month-1+day;

    if(fechaInicio<=fechaConsulta && fechaConsulta<=fechaFin){
        result = true
    }

    return result
}