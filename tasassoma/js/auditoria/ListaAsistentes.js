var Aud = []; // LISTA DE AUDITORIAS
var asistentes2 = [];
var rowCount2 = 0;

var vw_listado_asistentes = function(){


    // LISTADO ASITENTES
     var filtroTablaDivsAsistentes = function(){
        console.log("listar asistentes")

        showLoading();

        var SedeId = $("#sel_filter_sedep").val()
        //var Inicio          = formatearFechaDBp($("#txt_date_start_evaluacion").val())
        //var Fin             = formatearFechaDBp($("#txt_date_end_evaluacion").val())
        let UserIdHash      = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
        var Inicio          = $("#txt_date_start_evaluacion").val().split('/').reverse().join('-')
        var Fin             = $("#txt_date_end_evaluacion").val().split('/').reverse().join('-')
        var Norma_x2        = $("#sel_filter_normap").val()

        if(Norma_x2==null) Norma_x2 = 0;

        var filtro          = "";
        //console.warn("UserIdHash -> "+UserIdHash)
        filtro += "&UserIdHash="+UserIdHash
        
        if(SedeId>0)
            filtro+= "&SedeId="+SedeId
        if(Norma_x2!=0)
            filtro+= "&Norma="+Norma_x2
        if(Inicio!="")
            filtro+= "&Created_Date="+Inicio
        if(Fin!="")
            filtro+= "&Created_Date_End="+Fin//*/




        var metodoAjaxGp = "GET";
        var url          =  apiurlAuditoria+"/api/Get-Lista-Asistencia-All?code=xpPpAaANhw8DaLfb1vcVmXy4PbBSF2XvA6FwQDXMiGLdBUi9C44xgw==&httpmethod=objectlist"+filtro;
        var headers      = {"apikey":constantes.apiKey}

        $.ajax({
            method: metodoAjaxGp,
            url:  url,
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function (response) {

            console.log('entra',response);

            if (response.length > 0) $("#bodyTablaSinListado").css("display", "none");
            else $("#bodyTablaSinListado").css("display", "block");

            $("#cant_asistentes").html('<img src="images/iconos/copia-1.svg" class="copia-1"> '+response.length+' ');

            $('#pagination-container-asist').pagination({
                dataSource: response,
                pageSize: 5,
                callback: function(data, pagination) {
                    var html = templateListAsistentes(data);
                    $('#body-tabla-list-asistentes').html(html);
                }
            })
            //$('#bodyTablaSinListado').addClass('hidden')
            // $('#cant_asistentes').text(response.length)
            
        })

      .always(function( jqXHR, textStatus, errorThrown ) {

            hideLoading();
        });

        
    }

    // para el paginado....

    var templateListAsistentes = function(data){//alert("ESTAMOS POR AQUI");
        var html = '';

        // variables

        data.forEach((Item)=>{

            var Created_Date  = moment(Item.Created_Date).format('DD/MM/YYYY'); 
            // VALIDACIONES DE BOTONES Y MODAL
            var cierre      = 3;
            var apertura    = 2;
            var ver         = 1;

                html += `
                    <div class="item-tabla p-2" style="z-index: 1;display:relative;">
                    <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                    <div class="col-2 text-left">${Item.Code}</div>
                    <div class="col-2 text-left">${Item.SedeDescription}</div>
                    <div class="col-2 text-left">${Item.CodeNormas}</div>
                    <div class="col-2 text-left">${Created_Date}</div>
                    <div class="col-1 text-left"></div>
                    <div class="col-1 text-right">
                                <button type='button'  class='btn-circle btn-register border-0' style='background-color:#58c25d' onclick='vw_listado_asistentes.aperturaAsist(${Item.Id},${Item.AuditoriaID},${apertura})'>
                                    <img src="./images/iconos/usuario1.svg" alt="" class="edit-1" >
                                </button>
                    </div>
                    <div class="col-1 text-right">
                                <button type='button' id='susp'  class='btn-circle btn_read border-0 ' id='btn_suspender'  style='background-color: #b2b2b2;' onclick='vw_listado_asistentes.aperturaAsist(${Item.Id},${Item.AuditoriaID},${cierre})'>
                                    <img src='./images/iconos/reloj-de-pared1.svg' class='ojo-1'>
                                </button>

                    </div>
                    <div class="col-1 text-right">
                                <button type='button'   class='btn-circle btn_read border-0'id='btn_read' style='background-color:#373e68'  onclick='vw_listado_asistentes.aperturaAsist(${Item.Id},${Item.AuditoriaID},${ver})'>
                                    <img src='./images/iconos/ojo_1.svg' class='ojo-1'>
                                </button>

                    </div>
    
                        </div>
                    </div>
                </div>
                    </div>`;
                //)//onclick="ventanaPlanAuditoria(${Item.Id},3)"   
        
        })

        html += '';//hideLoading();


        
        return html;

    }

    // MODAL ASISTENTE
    var AgregarLista = function(Id,val){
        $('#metodo').html('');
        $("#tbody_trainning").empty();
       // $('#add-trainning').show(); 
        $('#contadorrow').html('0'); 
        //$("#guardarAsistentes").attr("disabled", false)

        $('#contadorrow').html('00');
        $('#txt_fechaApertura').val('');
        $('#txt_fechaCierre').val('');

        $('#add-trainning').hide();  
        
    

        vw_principal.init();



        // ABRIR MODAL
        $('#modal-listado-asistente').addClass('modal_confirmacion__active');
        $('#guardarAsistentes').show();
        $('#guardarAsistentesA').hide();
        $('#sel_audit').empty().html("<option value='0' selected>Cargando...</option>");
         var filtro          = "&ListaAsistencia=1";
        let IdAuditorLider  = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
        var servicio        = '/api/Get-Auditoria-Lider-All?code=';
        var metodoHttp      = "objectlist";// object   --- esto para los datos de una auditoria solo pasar esto por url IdAuditoria = varJs
        var metodoAjax      =  "GET";
        var getAuditoriaAll ="UAIRBeY2QaKbBgPA4aEGXzAYjgDu4T4WvBa04WvkGpB1RazLa3462w==";
        var url             = apiurlAuditoria+servicio+getAuditoriaAll+"&Id="+IdAuditorLider+"&TipoAuditor=1"+"&httpmethod="+metodoHttp+filtro;
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
            $('#sel_audit').empty().html("<option value='0' selected>Seleccione</option>");
            response.map(function(Item){
                $("#sel_audit").append(`<option class='sel_opt' value='${Item.Id}'>${Item.Code}/${Item.DescriptionSede}/${Item.DescriptionUnidadNegocio}/${Item.Code_Normas}/${Item.DescriptionAuditoria}</option>`).prop('disabled',false);
                Aud[Item.Id] = Item;
            });
        })

        $("#sel_audit").change(function(){
            var opt   = $('#sel_audit').val();
            var Item  = Aud[opt];

            if (opt != 0) {
                var txt_fechaApertura  = moment(Item.Inicio).format('DD/MM/YYYY'); 
                var txt_fechaCierre  = moment(Item.Fin).format('DD/MM/YYYY'); 
                $("#txt_fechaApertura").val(txt_fechaApertura);
                $("#txt_fechaCierre").val(txt_fechaCierre);
            }else{
                $("#txt_fechaApertura").val('');
                $("#txt_fechaCierre").val('');
            }
        });
        $('.eliminar').css('display','block');
       // $('#tbody_trainning .item-tabla').empty();

    }

    /**
     * [aperturaAsist LEVANTAMOS LA MODAL CON LOS DATOS DE LA LISTA DE ASISTENCIA...]
     * @param  {[type]} Id    [description]
     * @param  {[type]} IdAud [description]
     * @param  {[type]} ver   [description]
     * @return {[type]}       [description]
     */
    var aperturaAsist = function(Id,IdAud,ver)
    {    

        $('#metodo').html('- Apertura');
        $('#guardarAsistentes').hide();

        let checked = ''
        

        if (ver == 1) {
            $('#metodo').html('- Ver');
            $('#guardarAsistentesA').prop("disabled","disabled");
            ver = 'disabled';
            verC = 'disabled';
        }else if (ver == 2) {
            $('#metodo').html('- Apertura');
            $('#guardarAsistentesA').prop("disabled",false);
            ver = '';
            verC = 'disabled';
            var validacion = 'AP';
        }else if (ver == 3) {
            $('#metodo').html('- Cierre');
            $('#guardarAsistentesA').prop("disabled",false);
            ver  = 'disabled';
            verC = '';
            var validacion = 'CI';
        }

        $("#sel_audit").html(`<option value='0'>Cargando...</option>`);

         var filtro          = "";
        let IdAuditorLider  = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
        var servicio        = '/api/Get-Auditoria-Lider-All?code=';
        var metodoHttp      = "objectlist";// object   --- esto para los datos de una auditoria solo pasar esto por url IdAuditoria = varJs
        var metodoAjax      =  "GET";
        var getAuditoriaAll ="UAIRBeY2QaKbBgPA4aEGXzAYjgDu4T4WvBa04WvkGpB1RazLa3462w==";
        var url             = apiurlAuditoria+servicio+getAuditoriaAll+"&Id="+IdAuditorLider+"&TipoAuditor=1"+"&httpmethod="+metodoHttp+filtro;
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
            response.map(function(Item){
                Aud[Item.Id] = Item;
            });
            var Item = Aud[IdAud];
            var txt_fechaApertura  = moment(Item.Inicio).format('DD/MM/YYYY'); 
            var txt_fechaCierre  = moment(Item.Fin).format('DD/MM/YYYY'); 
            $("#txt_fechaApertura").val(txt_fechaApertura);
            $("#txt_fechaCierre").val(txt_fechaCierre);
            $('#add-trainning').hide();
            $("#sel_audit").append(`<option class='sel_opt' selected value='${Item.Id}'>${Item.Code}/${Item.DescriptionSede}/${Item.DescriptionUnidadNegocio}/${Item.Code_Normas}/${Item.DescriptionAuditoria} </option>`).prop('disabled',true);
            
        })

        var i = 0;
        var load = $("#tbody_trainning").html('Cargando...');
        var url             = apiurlAuditoria+"/api/Get-Lista-Asistencia-All?code=xpPpAaANhw8DaLfb1vcVmXy4PbBSF2XvA6FwQDXMiGLdBUi9C44xgw==&httpmethod=object&Id="+Id;
        var headers         ={
            "apikey":constantes.apiKey
        }

        $.ajax({
            method: 'GET',
            url:  url,
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function (data) {

            load.html('');
                
                data.Asistentes.map(function(item){
                    console.log("nombres: ", item);
                    var hora_apertura = ""
                    var hora_cierre   = ""
                    var checked       = ""
                    var checked_C       = ""

                    if (item.Hora_Asistencia_Apertura != null) {
                        hora_apertura = "id='hora_asist"+i+"' value='"+item.Hora_Asistencia_Apertura+"'";
                        //$('#hora_cierre'+i).val('');
                        checked       = "checked"
                    }

                    if (item.Hora_Asistencia_Cierre != null){
                        hora_cierre = "id='hora_cierre"+i+"' value='"+item.Hora_Asistencia_Cierre+"'";
                        //$('#hora_asist'+i).val('');
                        checked_C       = "checked"
                    }

                    if (validacion == 'AP') {

                            /*if (item.Hora_Asistencia_Apertura != null) {
                               hora_apertura = "id='hora_asist"+i+"' value='"+item.Hora_Asistencia_Apertura+"'";
                               $('#hora_cierre'+i).val('');
                                checked       = "checked"
                            }else{
                                hora_apertura = '';
                                hora_cierre   = '';
                                checked       = '';
                            }*/
                        $("#tbody_trainning").append("<div class='item-tabla p-2 px-2' style='font-size: 13px;background-color:#ffffff;border: solid 1px #cbcbcb;'</div>"+
                            "                         <div class='row m-0 justify-content-between  tbody_trainning'>"+
                            "                         <div class='col-2 form-control2 text-left' >"+
                            "                           <label for='Name_"+i+"'></label>"+
                            "                           <input type='hidden' value='"+validacion+"' class='valicacion_"+i+"'>"+
                            "                           <input type='hidden' id='idLista"+i+"' value='"+item.ListaAsistenciaID+"' ></label>"+
                            "                           <input type='hidden' name='idAuditor_' value='"+item.Id+"' id='Id"+i+"'>"+
                            "                           <input type='hidden' value='"+item.Created_Date+"' id='fecha_asist"+i+"'>"+
                            "                           <input type='text' readonly  id='Name_"+i+"' "+ver+" value='"+item.Nombres+"' class='form-control form-control2 bg-white autocompletecollaborator' style='margin-top:0px !important;padding-top:0px !important;' >"+
                            "                           <div class='loader' id='add_firtnameload_1"+i+"' style='display:none'></div>"+
                            "                           <input type='hidden' class='form-control' id='hid_Name_id_"+i+"' name='hid_Name_id_"+i+"'></div>"+
                            "                         <div class='col-2 text-left'><input type='text' readonly id='Cargo_"+i+"'  value='"+item.Cargo+"' name='cargo' readonly class='form-control form-control2 bg-white autocompletecollaborator'>" +
                            "                           <input type='hidden' class='form-control' id='hid_Cargo_"+i+"' name='hid_Cargo_"+i+"'></div>"+
                            
                            `                         <div class='col-2'><label class='custom-radio-checkbox'><input type='checkbox' class='custom-radio-checkbox__input' value="${i}" id='check_list${i}' ${checked} ${ver} onclick="vw_listado_asistentes.check_list(this.id,'hora_asist${i}')">`+
                            "                           <span class='custom-radio-checkbox__show custom-radio-checkbox__show--radio'></span></label></div>"+
                            "                         <div class='col-1 text-left'><input type='time' step='2' id='hora_asist"+i+"' "+hora_apertura+" "+ver+" name='hora_asist"+i+"' class='form-control form-control2 bg-white'></div>" +


                            "                         <div class='col-2'><label class='custom-radio-checkbox'><input type='checkbox'  class='custom-radio-checkbox__input' value='"+i+"' id='check_listC"+i+"' "+checked_C+" "+verC+" onclick='vw_listado_asistentes.check_list(this.value)'>"+
                            "                           <span class='custom-radio-checkbox__show custom-radio-checkbox__show--radio'></span></label></div>"+
                            "                         <div class='col-1 text-left'><input type='time' step='2' id='hora_cierre"+i+"' "+hora_cierre+" "+verC+" name='hora_cierre"+i+"' class='form-control form-control2 bg-white'></div>" +


                            "                         </div></div></div>"
                        );

                        i++;  
                    }else if (validacion == 'CI') {
                        $("#tbody_trainning").append("<div class='item-tabla p-2 px-2' style='font-size: 13px;background-color:#ffffff;border: solid 1px #cbcbcb;'</div>"+
                            "                         <div class='row m-0 justify-content-between  tbody_trainning'>"+
                            "                         <div class='col-2 form-control2 text-left' >"+
                            "                           <label for='Name_"+i+"'></label>"+
                            "                           <input type='hidden' value='"+validacion+"' class='valicacion_"+i+"'>"+
                            "                           <input type='hidden' id='idLista"+i+"' value='"+item.ListaAsistenciaID+"' ></label>"+
                            "                           <input type='hidden' name='idAuditor_' value='"+item.Id+"' id='Id"+i+"'>"+
                            "                           <input type='hidden' value='"+item.Created_Date+"' id='fecha_asist"+i+"'>"+
                            "                           <input type='text' readonly  id='Name_"+i+"' "+ver+" value='"+item.Nombres+"' class='form-control form-control2 bg-white autocompletecollaborator' style='margin-top:0px !important;padding-top:0px !important;' >"+
                            "                           <div class='loader' id='add_firtnameload_1"+i+"' style='display:none'></div>"+
                            "                           <input type='hidden' class='form-control' id='hid_Name_id_"+i+"' name='hid_Name_id_"+i+"'></div>"+
                            "                         <div class='col-2 text-left'><input type='text' readonly id='Cargo_"+i+"'  value='"+item.Cargo+"' name='cargo' readonly class='form-control form-control2 bg-white autocompletecollaborator'>" +
                            "                           <input type='hidden' class='form-control' id='hid_Cargo_"+i+"' name='hid_Cargo_"+i+"'></div>"+
                            
                            `                         <div class='col-2'><label class='custom-radio-checkbox'><input type='checkbox' class='custom-radio-checkbox__input' value="${i}" id='check_list${i}' ${checked} ${ver} onclick="vw_listado_asistentes.check_list(this.id,'hora_asist${i}')">`+
                            "                           <span class='custom-radio-checkbox__show custom-radio-checkbox__show--radio'></span></label></div>"+
                            "                         <div class='col-1 text-left'><input type='time' step='2' id='hora_asist"+i+"' "+hora_apertura+" "+ver+" name='hora_asist"+i+"' class='form-control form-control2 bg-white'></div>" +

                            `                         <div class='col-2'><label class='custom-radio-checkbox'><input type='checkbox' class='custom-radio-checkbox__input' value="${i}" id='check_listC${i}' ${checked_C} ${verC} onclick="vw_listado_asistentes.check_list(this.id,'hora_cierre${i}')">`+
                            "                           <span class='custom-radio-checkbox__show custom-radio-checkbox__show--radio'></span></label></div>"+
                            "                         <div class='col-1 text-left'><input type='time' step='2' id='hora_cierre"+i+"' "+hora_cierre+" "+verC+" name='hora_cierre"+i+"' class='form-control form-control2 bg-white'></div>" +

                            "                         </div></div></div>"
                        );
                        i++;  
                    }
                    else 
                    {
                        $("#tbody_trainning").append("<div class='item-tabla p-2 px-2' style='font-size: 13px;background-color:#ffffff;border: solid 1px #cbcbcb;'</div>"+
                            "                         <div class='row m-0 justify-content-between  tbody_trainning'>"+
                            "                         <div class='col-2 form-control2 text-left' >"+
                            "                           <label for='Name_"+i+"'></label>"+
                            "                           <input type='hidden' value='"+validacion+"' class='valicacion_"+i+"'>"+
                            "                           <input type='hidden' id='idLista"+i+"' value='"+item.ListaAsistenciaID+"' ></label>"+
                            "                           <input type='hidden' name='idAuditor_' value='"+item.Id+"' id='Id"+i+"'>"+
                            "                           <input type='hidden' value='"+item.Created_Date+"' id='fecha_asist"+i+"'>"+
                            "                           <input type='text' readonly  id='Name_"+i+"' "+ver+" value='"+item.Nombres+"' class='form-control form-control2 bg-white autocompletecollaborator' style='margin-top:0px !important;padding-top:0px !important;' >"+
                            "                           <div class='loader' id='add_firtnameload_1"+i+"' style='display:none'></div>"+
                            "                           <input type='hidden' class='form-control' id='hid_Name_id_"+i+"' name='hid_Name_id_"+i+"'></div>"+
                            "                         <div class='col-2 text-left'><input type='text' readonly id='Cargo_"+i+"'  value='"+item.Cargo+"' name='cargo' readonly class='form-control form-control2 bg-white autocompletecollaborator'>" +
                            "                           <input type='hidden' class='form-control' id='hid_Cargo_"+i+"' name='hid_Cargo_"+i+"'></div>"+
                            
                            `                         <div class='col-2'><label class='custom-radio-checkbox'><input type='checkbox' class='custom-radio-checkbox__input' value="${i}" id='check_list${i}' ${checked} ${ver} onclick="vw_listado_asistentes.check_list(this.id,'hora_asist${i}')">`+
                            "                           <span class='custom-radio-checkbox__show custom-radio-checkbox__show--radio'></span></label></div>"+
                            "                         <div class='col-1 text-left'><input type='time' step='2' id='hora_asist"+i+"' "+hora_apertura+" "+ver+" name='hora_asist"+i+"' class='form-control form-control2 bg-white'></div>" +

                            `                         <div class='col-2'><label class='custom-radio-checkbox'><input type='checkbox' class='custom-radio-checkbox__input' value="${i}" id='check_listC${i}' ${checked_C} ${verC} onclick="vw_listado_asistentes.check_list(this.id,'hora_cierre${i}')">`+
                            "                           <span class='custom-radio-checkbox__show custom-radio-checkbox__show--radio'></span></label></div>"+
                            "                         <div class='col-1 text-left'><input type='time' step='2' id='hora_cierre"+i+"' "+hora_cierre+" "+verC+" name='hora_cierre"+i+"' class='form-control form-control2 bg-white'></div>" +

                            "                         </div></div></div>"
                        );
                        i++;
                    }


                    hideLoading();               

               
                })

        }).always(function( jqXHR, textStatus, errorThrown ) {
            var total = "";
            if(i<10) total = "0"+i
            else total = i
            //$('#rowcount').val(rowCount);
            $('#contadorrow').html(total);
            $('#guardarAsistentesA').show();
            // ABRIR MODAL
            $('#modal-listado-asistente').addClass('modal_confirmacion__active');
            $('.eliminar').css('display','none');
        });


        
    }



     var check_list = function(id,value){

        // console.warn(id)
        // console.warn(value)
        // console.warn($("#"+id).is(':checked'))
        
        //$("#check_list"+id).css('background-color','#d2d97b !important');
        // if ($("#check_list"+value).is(':checked')) {
        if ( $("#"+id).is(':checked') ) {
            // $('#hora_asist'+value).val(moment().format('HH:mm:ss'));
            // $('#hora_cierre'+value).val(moment().format('HH:mm:ss'));
            $(`#${value}`).val(moment().format('HH:mm:ss'));

        }else{
            // $('#hora_asist'+value).val('');
            // $('#hora_cierre'+value).val('');
            $(`#${value}`).val('');
        }
        
    }

    var guardarAsistentesA = function(){
        var asistentesA = [];
        var rowCount = $('#tbody_trainning .item-tabla').length;

        showLoading();
        // variables
       for (var i = 0; i < rowCount; i++) {

        var validacion = $('.valicacion_'+i).val();

            if ($("#check_list"+i).is(':checked')) {


                if (validacion == 'AP') {
                    var hora_apertura   = $('#hora_asist'+i).val();
                    var fecha_apertura  = $('#fecha_asist'+i).val();
                    fecha_apertura      = moment(fecha_apertura).format('YYYY-MM-DD');
                    var Id              = $('#Id'+i).val();
                    var IdLista         = $('#idLista'+i).val();
                    asistentesA.push({
                        "Id":                           Id,
                        "Flag_Asistencia":              '1',
                        "Hora_Asistencia_Apertura":     hora_apertura,
                        "Fecha_Asistencia_Apertura":    fecha_apertura
                    });

                }else if(validacion == 'CI')
                {
                    var hora_cierre   = $('#hora_cierre'+i).val();
                    var fecha_cierre  = $('#fecha_cierre'+i).val();
                    fecha_cierre      = moment(fecha_cierre).format('YYYY-MM-DD');
                    var Id              = $('#Id'+i).val();
                    var IdLista         = $('#idLista'+i).val();
                    asistentesA.push({
                        "Id":                           Id,
                        "Flag_Asistencia":              '1',
                        "Hora_Asistencia_Cierre":     hora_cierre,
                        "Fecha_Asistencia_Cierre":    fecha_cierre
                    });

                }
            }
                

        }   

        console.log(asistentesA);
        let Created_By  = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
        var idAuditoria = $('#sel_audit').val();
        var item = Aud[idAuditoria];

        var url = apiurlAuditoria+"/api/Post-Lista-Asistencia-All?code=aWEffc30oxwrufXbJDi6nB5eMcvtdV3mDu9InLECYlVxnaHyGCxXEw==&httpmethod=put&Id="+IdLista;
        // GUARDAR
        var headers ={
            "apikey":constantes.apiKey,
            "Content-Type": "application/json",
        }

        var body = {
            "Last_Updated_By":  Created_By,
            "asistentes":   asistentesA
        }
        console.log("body: ",body);
        //console.log(body);
        $.ajax({
            method: 'POST',
            url:  url,
            headers:headers,
            data: JSON.stringify(body),
            crossDomain: true,
            dataType: "json",
        }).done(function (data) {
            hideLoading();
            $('#modalGuardarAsistentesA').modal('hide');
            $('#modalConfirmGuardarAsistentesA').modal('show').addClass('fade');
            $('#txt_lista').html(item.Code);
            console.log('Guardo: ',data);
        })//*/
        /*.fail(function( jqXHR, textStatus, errorThrown ) {
            swal({
                title: "Error",
                text:'Error al guardar la nueva lista!',
                type: "error",
                timer:3000,
                showCancelButton: false,
                confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
                confirmButtonText: "De acuerdo",
                closeOnConfirm: false
            });
        });//*/


    }

    var buscarNormasListaAsit = function (sede){
        $("#sel_filter_normap").html('');
        $("#sel_filter_normap").append(`<option descripcion="" value='0'></option>`);

        var filtro = "";
        if(sede>0)
        {
             filtro = "&SedeId="+sede;
        }
        var servicio = '/api/Get-Norma-All?code=';
        var metodoHttp = "objectlist";
        var metodoAjax =  "GET";
        var url = apiurlAuditoria+servicio+GetNormasAll+"&httpmethod="+metodoHttp+''+filtro;
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
            console.log("+++++++++++++++++++++++++++++++++++++  cargar las normas ++++++++++++++++++++++++++++++++++++++++++++++++++");
              
            console.log("normas",data);
                
            console.log("+++++++++++++++++++++++++++++++++++++  cargar las normas ++++++++++++++++++++++++++++++++++++++++++++++++++");
            data.map(function(item)
            {
                $("#sel_filter_normap").append(`<option descripcion="${item.Description}"  value='${item.Code}'>${item.Description}</option>`);
              
            });

        }).fail(function( jqXHR, textStatus, errorThrown ) {
            //console.log("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
            //console.log(errorThrown)
            $("#sel_new_normas").hide();
        });
    }

    var CargarAudit = function(){

        var filtro          = "";
        let IdAuditorLider  = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
        var servicio        = '/api/Get-Auditoria-Lider-All?code=';
        var metodoHttp      = "objectlist";// object   --- esto para los datos de una auditoria solo pasar esto por url IdAuditoria = varJs
        var metodoAjax      =  "GET";
        var getAuditoriaAll ="UAIRBeY2QaKbBgPA4aEGXzAYjgDu4T4WvBa04WvkGpB1RazLa3462w==";
        var url             = apiurlAuditoria+servicio+getAuditoriaAll+"&Id="+IdAuditorLider+"&TipoAuditor=1"+"&httpmethod="+metodoHttp+filtro;
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
            response.map(function(Item){
                $("#sel_audit").append(`<option class='sel_opt' value='${Item.Id}'>${Item.Code}/${Item.DescriptionSede}/${Item.DescriptionUnidadNegocio}/${Item.Code_Normas}/${Item.DescriptionAuditoria}</option>`).prop('disabled',false);
                Aud[Item.Id] = Item;
            });
        })
    }


    // GUARDAR ASISTENTES
   // GUARDAR ASISTENTES
   var guardarAsistentes = function()
   {
    showLoading();
    $('#btn-guardar-asistentes').prop('disabled', true)
      
      /* var asistentes = [];
       var rowCountg = $('#tbody_trainning .item-tabla').length;
       console.log("Numero -----",rowCountg)
       // variables
      for (var i = 0; i < rowCountg; i++) {

           var Nombres = $('#Name_'+i).val();
           var Cargo = $('#Cargo_'+i).val();
           var UserIdHash = $('#hid_Name_id_'+i).val();
           asistentes.push({
               "UserIdHash":       UserIdHash,
               "Nombres":          Nombres,
               "Cargo":            Cargo,
           });

       }*/

       let Created_By  = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
       var idAuditoria = $('#sel_audit').val();
       var item = Aud[idAuditoria];

       var url = apiurlAuditoria+"/api/Post-Lista-Asistencia-All?code=aWEffc30oxwrufXbJDi6nB5eMcvtdV3mDu9InLECYlVxnaHyGCxXEw==&httpmethod=post";
       // GUARDAR
       var headers ={
           "apikey":constantes.apiKey,
           "Content-Type": "application/json",
       }

       var body = {
           "AuditoriaID":  idAuditoria,
           "Code":         item.Code,
           "Created_By":   Created_By,
           "asistentes":   asistentes2
       }
       console.log("Bodyyyyy ---",body);
       
       $.ajax({
           method: 'POST',
           url:  url,
           headers:headers,
           data: JSON.stringify(body),
           crossDomain: true,
           dataType: "json",
       }).done(function (data) {
           $('#modalGuardarAsistentes').modal('hide');
           hideLoading();
           $('#guardarAsistentes').prop('disabled',false);
           $('#modalConfirmGuardarAsistentes').modal('show').addClass('fade');
           $('#txt_lista').html(data.Code);
           
           console.log(data);
       })
       .fail(function( jqXHR, textStatus, errorThrown ) {
           swal({
               title: "Error",
               text:'Error al mofificarl la nueva lista!',
               type: "error",
               timer:3000,
               showCancelButton: false,
               confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
               confirmButtonText: "De acuerdo",
               closeOnConfirm: false
           });
       });
       

   }



var getPerson = function (obj,i) {
        obj.autocomplete({
            change: function (event, ui)
            {
               // alert('entra');
                //alert('Hola');
                console.log( $("#hid_collaborator_id_"+i).val())
                if (ui.item === null &&  $("#hid_Name_id_1"+i).length>20)
                {

                     $("#hid_collaborator_id_"+i).val("");
                     $(this).val("");
                     $("#add_covid_lastname_"+i).val(""); 
                }
                else if(ui.item)
                {

                    $("#Name_"+i).val(ui.item.firstname).trigger("change");
                    $("#add_covid_lastname_"+i).val(ui.item.lastname).trigger("change");
                    // $("#add_covid_lastname_"+i).focus();
                    // document.getElementById("add_covid_lastname_"+i).focus();
                    //  document.getElementById("add_covid_lastname_"+i).focus();
                }

            },

            source: function( request, response )
            {
                var urlx = apiurlsecurity+"/api/Get-Collaborator?code="+GetCollaborator+"&httpmethod=objectlist";
                //console.log("tony",urlx);
                var filter = obj.val();
                ///console.log(filter);
                var param= {filter:filter};
                var headers = {"Authorization":TOKEN_CLIENT,"apiKey":"r$3#23516ewew5"}
                $("#add_firtnameload_1").show();
                $.ajax({
                    url: apiurlsecurity+"/api/Get-Collaborator?code="+GetCollaborator+"&httpmethod=objectlist",
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
                        console.log("tony",data);

                        data.value.forEach(item =>
                        {
                            var json ={}
                            json.label      = item.displayName;
                            json.value      = item.givenName;
                            json.id         = item.objectId;
                            json.cargo      = item.jobTitle;
                            json.firstname  = item.displayName;//item.givenName+' '+item.surname;
                            array.push(json);
                        });
                        response(array);

                    }
                });
            },
            minLength: 3,
            select: function( event, ui )
            { //alert(ui.item.id)
                $("#hid_Name_id_"+i).val(ui.item.id);
                $("#Cargo_"+i).val(ui.item.cargo);
                $("#hid_Cargo_"+i).val(ui.item.cargo);

                //$("#add_covid_dni_"+i).trigger("focusout");
                //console.log(ui.item.label)
                setTimeout(function(){
                    // alert(ui.item.firstname)
                    // alert(ui.item.cargo)//correo
                    // alert(ui.item.correo)
                    
                    $("#Name_"+i).val(ui.item.firstname);
                    //$("#Cargo_"+i).val(ui.item.jobTitle);
                    //$("#txt_correo_"+i).val(ui.item.userPrincipalName);
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

    function selectUnidadOrganizativaFiltep()
{
    console.log("cambio")
    
    idUnidadNegocioFiltrop = document.getElementById('sel_filter_unidad_organizativa').value;
    
    var select = 'sel_filter_sedep'

    if(idUnidadNegocioFiltrop>0)
        getSelectSedePorIdUnidadNegociop(idUnidadNegocioFiltrop, select)
    else
        $("#"+select).html("<option value='0'  selected>       </option>")
}

 var cargarSelectSedesFilter = function (selectId){
        
        var idUnidadNegocioFiltrop = ""
        if(selectId=="sel_filter_sedep"){
            idUnidadNegocioFiltrop = document.getElementById('sel_filter_unidad_organizativa').value;
        }
        if(selectId=="sel_new_sede"){
            idUnidadNegocioFiltrop = document.getElementById('sel_new_unidad_organizativa').value;
        }
        if(selectId=="sel_sede"){
            idUnidadNegocioFiltrop = document.getElementById('sel_unidad_organizativa').value;
        }
        
        // limpiar select unidad organizativa
        $("#"+selectId).html("<option value='0'  selected>      </option>")
        for(i in jsonSedesp){
            //console.log("i: "+i, jsonSedesp[i].Code)
            
            if(idUnidadNegocioFiltrop==0){
                $("#"+selectId).append(`<option description='`+jsonSedesp[i].Description+`' value='`+jsonSedesp[i].Id+`'>`+jsonSedesp[i].Code+`</option>`);
            }
            else {
                if(idUnidadNegocioFiltrop==jsonSedesp[i].UnidadNegocioId){
                    if(idUnidadNegocioFiltrop==1 || idUnidadNegocioFiltrop==3 || idUnidadNegocioFiltrop==4 || idUnidadNegocioFiltrop==6)
                        $("#"+selectId).append(`<option selected description='`+jsonSedesp[i].Description+`' value='`+jsonSedesp[i].Id+`'>`+jsonSedesp[i].Code+`</option>`);
                    else
                        $("#"+selectId).append(`<option description='`+jsonSedesp[i].Description+`' value='`+jsonSedesp[i].Id+`'>`+jsonSedesp[i].Code+`</option>`);
                }
            }

        }
        //*/

    }

    var cargarSelectsUnidadesOrganizativas = function(){
        $("#sel_filter_unidad_organizativa").html("<option value='' selected> Cargando....   </option>");
        $("#sel_new_unidad_organizativa").html("<option value='' disabled selected>     </option>");
        $("#sel_unidad_organizativa").html("<option value='' disabled selected>  ..  </option>");


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
           
        $("#sel_filter_unidad_organizativa").html("<option value='' selected>   </option>");
        $("#sel_new_unidad_organizativa").html("<option value='' disabled selected>     </option>");
        $("#sel_unidad_organizativa").html("<option value='' disabled selected>  ..  </option>");
            jsonUnidadesOrganizativasp=[];
            data.map(function(item)
            {
                $("#sel_filter_unidad_organizativa").append(`<option description='${item.Description}' value='${item.Id}'>${item.Code}</option>`);
                $("#sel_new_unidad_organizativa").append(`<option description='${item.Description}' value='${item.Id}'>${item.Code}</option>`);
                $("#sel_unidad_organizativa").append(`<option description='${item.Description}' value='${item.Code}'>${item.Code}</option>`);
                jsonUnidadesOrganizativasp.push(item); 
            });

            
            //console.log("json",jsonUnidadesOrganizativasp)  

        }).fail(function( jqXHR, textStatus, errorThrown ) {      
            //showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
            //console.log(errorThrown)
            $("#sel_filter_unidad_organizativa").hide(); 
            $("#sel_new_unidad_organizativa").hide(); 
        });
    }


    var getSedesAll = function (){
        $("#sel_filter_sedep").html("<option value='0'  selected> Cargando .... </option>")
        jsonSedesp = []

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
            $("#sel_filter_sedep").html("<option value='0'  selected>           </option>")
            //RECORREMOS LA RESPUESTA
            response.forEach((Item) => {
                // llenamos el select del filtro correspondiente a las sedes
                $("#sel_filter_sedep").append(`<option description='${Item.Description}' value='${Item.Id}'>${Item.Code}</option>`);
                // LLENAMOS EL ARRAY CON TODAS LAS MODIFICACIONES DE AUDITORIAS
                jsonSedesp.push(Item)
            })            

        })
        .always(function( jqXHR, textStatus, errorThrown ) {
            //console.log("jsonSedesp",jsonSedesp)
        });

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





    return{
        init:function(){
            filtroTablaDivsAsistentes();
            getSedesAll();
            buscarNormasListaAsit(0);
            cargarSelectsUnidadesOrganizativas();

            $('#guardarAsistentesA').click(function(){
                $('#modal-listado-asistente').removeClass('modal_confirmacion__active');
                $('#modalGuardarAsistentesA').modal('show').addClass('fade');
               
            });
    
                     // CERRAR MODAL DE GUARDADO EXITOSO
             $('#btn-guardar-asistentesA').click(function(){
                $('#modalGuardarAsistentesA').modal('hide').removeClass('fade');
                $('#modalConfirmGuardarAsistentesA').modal('show').addClass('fade');
                 guardarAsistentesA();
            });
            // CANBCELAR ENVIO DE GUARDADO
            $('#btn-cancelar-asistentesA').click(function(){
                $('#modalGuardarAsistentesA').modal('hide');
                $('#modal-listado-asistenteA').addClass('modal_confirmacion__active');
            });
    
                    // CERRAR MODAL DE GUARDADO EXITOSO
             $('#btn-confirm-asistentesA').click(function(){
                $('#modalConfirmGuardarAsistentesA').modal('hide');
                vw_listado_asistentes.filtroTablaDivsAsistentes();
            });

           /* $('#guardarAsistentes').click(function(){
                $('#modal-listado-asistente').removeClass('modal_confirmacion__active');
                $('#modalGuardarAsistentes').modal('show').addClass('fade');
            });*/
    
                   // CERRAR MODAL DE GUARDADO EXITOSO
             $('#btn-guardar-asistentes').one("click", function(){
                $('#modalGuardarAsistentes').modal('hide').removeClass('fade');
                //$('#modalConfirmGuardarAsistentes').modal('show').addClass('fade');
                 guardarAsistentes();
            });

            $('#guardarAsistentes').click(function(){

                // $('#tbody_trainning .item-tabla2').length;
               // alert(rowCountg);
               if($('#tbody_trainning .item-tabla').length>0){
                var rowCountg = rowCount2;
               // alert(rowCountg);
                asistentes2 = [];
                    vacios = false;
                    for (var i = 1; i <= rowCountg; i++) {
        
                    if($('#hid_Name_id_'+i).val() != "" && $('#hid_Name_id_'+i).val() != undefined ) //|| $('#hid_Name_id_'+i).val() == null || $('#hid_Name_id_'+i).val() == undefined
                    { 
        
                        
        
                       var Nombres = $('#Name_'+i).val();
                        var Cargo = $('#Cargo_'+i).val();
                        var UserIdHash = $('#hid_Name_id_'+i).val();
                        asistentes2.push({
                            "UserIdHash":       UserIdHash,
                            "Nombres":          Nombres,
                            "Cargo":            Cargo,
                        });
                       // console.log(Object.values(asistentes2));*/
                    }
                    else if ($('#hid_Name_id_'+i).val() == ""){
                        //console.log("uno vacio")
                        vacios = true;
                    }
            
                    }
        
                    if(vacios)
                {
                    verModalError('Asistentes', 'Tienes campos vacios, Debes Ingresar todos los destinatarios.');
                 //   alert('campos vacios')
                }else{
                    /////levantar modal para confirmar el envio de informe
                    $('#modal-listado-asistente').removeClass('modal_confirmacion__active');
                   $('#modalGuardarAsistentes').modal('show').addClass('fade');
                }
                }else{
                    verModalError('Asistentes', 'Debes agregar un ( 1 ) asistente como mínimo');
                // alert("Seleccionar al menos 1")
                }
                
            });
    
             // CANBCELAR ENVIO DE GUARDADO
            $('#btn-cancelar-asistentes').click(function(){
                $('#modalGuardarAsistentes').modal('hide');
                $('#modal-listado-asistente').addClass('modal_confirmacion__active');
            });
    
            // CERRAR MODAL DE GUARDADO EXITOSO
             $('#btn-confirm-asistentes').click(function(){
                $('#modalConfirmGuardarAsistentes').modal('hide');
                vw_listado_asistentes.filtroTablaDivsAsistentes();
            });

            $('#sel_audit').change(function(){
                if( $('#sel_audit').val() == 0)
                {
                    $('#add-trainning').hide();
                    $('#tbody_trainning').parents('.item-tabla').remove();
                $('#tbody_trainning').empty();
                rowCount2;
                var total = $('#tbody_trainning .item-tabla').length;
                //total--;
                if(total<10) total = "0"+total
                else total = total
                $('#contadorrow').html(total);
                
                }else{
    
                    $('#add-trainning').show();
                }
            });
                
          //  var rowCount2 = 0; mio
    
            $('#add-trainning').click(function (){
                    rowCount2++;// = $('#tbody_trainning .item-tabla2').length; mio

                    $("#tbody_trainning").append("<div class='item-tabla p-2 px-2' style='font-size: 13px;background-color:#ffffff;border: solid 1px #cbcbcb;'</div>"+
                        "                         <div class='row m-0 justify-content-between  tbody_trainning'>"+
                        "                         <div class='col-2 form-control2 text-left' >"+
                        "                           <label for='Name_"+rowCount2+"'></label>"+
                        "                           <input type='hidden' id='contadorrow' value='"+rowCount2+"' ></label>"+
                        "                           <input type='hidden' name='idAuditor_' id='idAuditor_'>"+
                        "                           <input type='hidden' name='Create_By'>"+
                        "                           <input type='text' value='' id='Name_"+rowCount2+"' name='Name' class='form-control form-control2 bg-white autocompletecollaborator validate'>"+
                        "                           <div class='loader' id='add_firtnameload_1"+rowCount2+"' style='display:none'></div>"+
                        "                           <input type='hidden' class='form-control' id='hid_Name_id_"+rowCount2+"' name='hid_Name_id_"+rowCount2+"'></div>"+
                        "                         <div class='col-2 text-left'><input type='text' id='Cargo_"+rowCount2+"' name='cargo' readonly class='form-control form-control2 bg-white autocompletecollaborator'>" +
                        "                           <input type='hidden' class='form-control' id='hid_Cargo_"+rowCount2+"'  name='hid_Cargo_"+rowCount2+"'></div>"+
                        

                        "                         <div class='col-2'><label class='custom-radio-checkbox'><input type='checkbox'  class='custom-radio-checkbox__input' value='"+rowCount2+"' id='check_list"+rowCount2+"' disabled "+
                        "                           <span class='custom-radio-checkbox__show custom-radio-checkbox__show--radio'></span></label></div>"+
                        "                         <div class='col-1 text-left'><input type='time' step='2' disabled readonly id='hora_asist' name='hora_asist' class='form-control form-control2 bg-white newtime' ></div>" +

                        
                        "                         <div class='col-2'><label class='custom-radio-checkbox'><input type='checkbox'  class='custom-radio-checkbox__input' value='"+rowCount2+"' id='check_listC"+rowCount2+"' disabled "+
                        "                           <span class='custom-radio-checkbox__show custom-radio-checkbox__show--radio'></span></label></div>"+
                        "                         <div class='col-1 text-left'><input type='time' step='2' disabled readonly id='hora_asistC' name='hora_asistC' class='form-control form-control2 bg-white newtime' ></div>" +


                        "                         <div class='col-2 '><button type='button' _Id='' class='delete btn-circle btn-register border-0 ojo-1' style='background-color: #ff6767'>"+
                        "                            <img src='./images/iconos/Pathcan.svg' class='edit-1'></button>" +
                        "                         </div></div></div>"
                    );
    
                        var total = $('#tbody_trainning .item-tabla').length;
                       if(total<10) total = "0"+total
                       else total = total
                       $('#contadorrow').html(total);
    
                        getPerson($("#Name_"+rowCount2),rowCount2);
    
                        //rowCount2++;
                        /*var total = "";mio
                        if(rowCount2<10) total = "0"+rowCount2
                        else total = rowCount2
                        $('#contadorrow').html(total);*/
    
                });
    
            $('#tbody_trainning').on('click', '.delete', function() {
    
                $(this).parents('.item-tabla').remove();
                // $('#contadorrow').html($('#tbody_trainningInformePdf .item-tabla').length);
                rowCount2;
                var total = $('#tbody_trainning .item-tabla').length;
                //total--;
                if(total<10) total = "0"+total
                else total = total
                $('#contadorrow').html(total);
    
               /* $(this).parents('.item-tabla2').remove();mio
                rowCount2--;
                var total = "";
                if(rowCount2<10) total = "0"+rowCount2
                else total = rowCount2
                $('#contadorrow').html(total);*/
    
            });

            $("#txt_date_start_evaluacion").datetimepicker({
                timepicker:false,
                format:'d/m/Y',
            });
            $("#txt_date_end_evaluacion").datetimepicker({
                timepicker:false,
                format:'d/m/Y',
            });

            $("#tx_date_end_new_auditoria").datetimepicker({
                timepicker:false,
                format:'d/m/Y',
            });


        },filtroTablaDivsAsistentes:function (){
            filtroTablaDivsAsistentes();
        },AgregarLista:function(Id,val){
            AgregarLista(Id,val);
        },buscarFecha:function(idAudit){
            buscarFecha(idAudit);
        },getPerson: function (obj,i) {
            getPerson(obj,i)
        },aperturaAsist: function(Id,IdAud,ver){
            aperturaAsist(Id,IdAud,ver);
        },check_list: function(id,value){
            check_list(id,value);
        },guardarAsistentesA: function(){
            guardarAsistentesA();
        },cargarSelectSedesFilter:function(selectId){
            cargarSelectSedesFilter(selectId)
        },validarFechas:function(int){
            validarFechas(int)
        },filtroTablaDivsAuditoriasp:function(){
            filtroTablaDivsAuditoriasp();
        },buscarNormasListaAsit:function(sede){
            buscarNormasListaAsit(sede);
        }
        

    }




   

}();// fin listado asistentes

