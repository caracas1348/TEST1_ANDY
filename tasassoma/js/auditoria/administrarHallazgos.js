
var objHallazgo = new Array();
var arrayHallazgos = [];
var istAud = "1";//contiene el datos delñ auditor que actualmente se esta editando o trabajando
var AnalisisCausa = 1;
var accionH = 0; // 0 - nuevo hallazgo, 1-modificar hallazgo
var istHall = 0;
var htmlFuenteNuevo =  '';//sp4
var htmlFuenteEdit = '';//sp4
var guardarEnviar = 0;//sp4 te indica en 0 que no se guarda y envia, 1 si se envia y guarda
  //clases
 //.............................................. CLASE classHallazgo ...........................................
function classHallazgo()
{

    this.dataHallazgo = [];
    //    AnalisisCausa: 1
    //    CodeHallazgo: null
    //    Code_Hallazgo: null
    //    Correlativo: 51
    //    EjecucionDate: "0001-01-01T00:00:00"
    //    FechaEjecucion: "01/12/2020"
    //    FechaRegistro: "01/12/2020"
    //    Fuente: "Auditoria Legal"
    //    FuenteId: 3
    //    Hallazgo: "Descripcion del Hallazgo"
    //    Id: 93
    //    Norma: "ISO 45001: 2018"
    //    NormaId: 2
    //    ReportanteId: 0
    //    ReportanteName: "Carlos Marcos"
    //    ResponsableId: 0
    //    ResponsableName: "Andy Vasquez"
    //    Sede: "JAYANCA"
    //    SedeId: 0
    //    StatusAccionCorrectiva: "Pendiente"
    //    StatusAccionCorrectivaId: 1
    //    StatusHallazgo: "Pendiente"
    //    StatusHallazgoId: 1
    //    TipoHallazgo: "No Conformidad Critica"
    //    TipoHallazgoId: 4
    //    UnidadNegocio: "Flota"
    //    UnidadNegocioId: 0


       classHallazgo.prototype.cargarDataServicio = function (data)
        {

            this.dataHallazgo = data;
            //console.log("==*== this.dataHallazgo[",this.dataHallazgo.Code_Evaluacion,"] = ",this.dataHallazgo);
        }
        // classHallazgo.prototype.ver = function ()
        // {
        //     //console.log("==*== this.dataHallazgo[",this.dataHallazgo.Code_Evaluacion,"] = ",this.dataHallazgo);
        // }
}
//.............................................. CLASE classHallazgo ...........................................




function _init_fnSp3AdministrarHallazgosEstadoInicial()
{//------------------------------------- ini   fnSp3AdministrarHallazgosEstadoInicial() -------------------------------------
    //showLoading();
    console.log("Arrancamos............................");
    //responsive
     fnSp3ResponsiveAdmHallazgos();
     fnSp3CargarFuncionesAdmHallazgosDinamicasDOM();
     fnSp3CargaFiltroEstadoInicialAdmHallazgo();



    //hideLoading();

}//------------------------------------- fini   fnSp3AdministrarHallazgosEstadoInicial() -------------------------------------


function fnSp3CargaFiltroEstadoInicialAdmHallazgo()
{//------------------------------------- ini   fnSp3CargaFiltroEstadoInicialAdmHallazgo() -------------------------------------
    //console.clear()
    htmlFuenteNuevo = "";
    showLoading();
    guardarEnviar = 0;
    $("#sp3BtFiltroAdmHall").html("Buscando.....")
    $("#sp3BtFiltroAdmHall").attr("disabled",true);


     var fuente =  $('#sel_filter_fuente').val();    if(fuente == null){fuente = 0;}
     var tipoh =  $('#sel_filter_tipo_hallazgos').val();     if(tipoh == null){tipoh = 0;}
     var normah =  $('#sel_filter_normaad').val();    if(normah == null){normah = 0;}
     var seddeah =  $('#sel_filter_seddeah').val();   if(seddeah == null){seddeah = 0;}
     var estadoah =  $('#sel_filter_estadoah').val();  if(estadoah == null){estadoah = 0;}
     var f1,f2,f11,f22;

    f11 = $('#sp3_txt_fecha_desdeAh').val();
    f22 = $('#sp3_txt_fecha_hastaAh').val();
    if($('#sp3_txt_fecha_desdeAh').val() != ""){f1 =  date1_DD_MM_AAAA_to_AAAA_MM_DD_T_HH_MM_S(f11)}
    else{ f1 = "";}
    if($('#sp3_txt_fecha_hastaAh').val() != ""){ f2 =  date1_DD_MM_AAAA_to_AAAA_MM_DD_T_HH_MM_S(f22)}
    else{ f2 = "";}

    let ReportanteUserHash = ""

    if( getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa) !== "ROL_COORDINADORAUDITORIA")
    {
        ReportanteUserHash = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa)
    }


    // https://550m44ud1tmg7454-audit-dev.azurewebsites.net/api/Get-Evaluacion_Auditores-All?code=EUnorEI6paUzxOdpVKKAGDjhb4p4wEZ3R6NTWKDoOdVrk0Y0S/ZOkg==&httpmethod=objectlist&RolId=&StatusEvaluacionId=&FechaInicio=&FechaFin=&Auditor=&Nota=52
    var url = apiurlAuditoria+ "/api/Get-Hallazgos-All?code=NKBvao47qcJIg6Qjy/X1fUQLgxp2GarodbvWKcbQcPKbj7g4BhGUxQ==&httpmethod=objectlist&FuenteId="+fuente+"&TipoHallazgoId="+tipoh+"&NormaId="+normah+"&SedeId="+seddeah+"&StatusId="+estadoah+"&FechaInicio="+f1+"&FechaFin="+f2+"&ReportanteUserHash="+ReportanteUserHash;
    console.log("112 URL",url )
    console.log("USUARIO(",ReportanteUserHash,")" )

    var headers ={
            "apikey":constantes.apiKey
        }

        var settings = {
            "url": url,
            "method": "GET",
            "timeout": 0,
            "crossDomain": true,
            "dataType": "json",
            "headers": headers,
        };

        $.ajax(settings).done(function (response)
        {
            ///// START LLENO MI OBJETO DE HALLAZGOS ASIGNADOS
            /// PARA REUTIZAR LA FUNCIONALIDAD YA REALIZADA EN hallazgosAsignados.js
            /// para mostrar la modal del ACR
            objHallazgoAsignado = []
            response.Hallazgos.map(function(Item)
            {
                objHallazgoAsignado[Item.Id] = new classHallazgo()
                objHallazgoAsignado[Item.Id].cargarDataServicio(Item)
            })
            // CREAMOS EL OBJETO DE LAS AREAS
            objAreas = new classAreas()
            objAreas.cargarDataAreas(response.Areas)
            // CREAMOS EL OBJETO DE PLAZO ACCION
            objPlazoAccion = new classPlazoAccion()
            objPlazoAccion.cargardataPlazoAccion(response.PlazoAccion)

            // CREAMOS EL OBJETO DE TIPO ACCION
            objTipoAccion = new classTipoAccion()
            objTipoAccion.cargardataTipoAccion(response.TipoAccion)

            // CREAMOS EL OBJETO DE STATUS ACCION
            objStatusAccion = new classStatusAccion()
            objStatusAccion.cargardataStatusAccion(response.StatusAccion)
            ///// END LLENO MI OBJETO DE HALLAZGOS ASIGNADOS
            console.log("**todos**",response);

            $("#"+'sel_filter_fuente').html(" "); $("#"+'sel_filter_fuente').css('font-size','13px');
            $("#"+'sel_filter_fuente').html("<option selected value='0'>          </option>");
            $("#"+'sel_fuente_hhalazgo').html("<option selected value='0'>          </option>");
            $("#"+'sel_fuente_hhalazgo').html("<option selected value='0'>          </option>");
            response.Fuentes.map(function(item)
            {

                $("#"+'sel_filter_fuente').append(`<option value='${item.Id}' title='${item.Fuente}' style='font-weight: bold;'>${item.Fuente}</option>`);

               htmlFuenteEdit = htmlFuenteEdit + `<option value='${item.Id}' title='${item.Fuente}' style='font-weight: bold;'>${item.Fuente}</option>`

                if(item.Id > 4 || item.Id === 1 || item.Id === 2)
                {

                    $("#"+'sel_fuente_hhalazgo').append(`<option value='${item.Id}' title='${item.Fuente}' style='font-weight: bold;'>${item.Fuente}</option>`);
                    htmlFuenteNuevo = htmlFuenteNuevo+`<option value='${item.Id}' title='${item.Fuente}' style='font-weight: bold;'>${item.Fuente}</option>`;
                }

            });

            $("#"+'sel_filter_tipo_hallazgos').html(" "); $("#"+'sel_filter_tipo_hallazgos').css('font-size','13px');//sel_ttipo_hh
            $("#"+'sel_filter_tipo_hallazgos').html("<option selected value='0'>          </option>");
            $("#"+'sel_ttipo_hh').html("<option selected value='0'>          </option>");
            response.TipoHallazgos.map(function(item)
            {
                $("#"+'sel_filter_tipo_hallazgos').append(`<option value='${item.Id}'  title='${item.TipoHallazgo}' style='font-weight: bold;'>${item.TipoHallazgo}</option>`);
                $("#"+'sel_ttipo_hh').append(`<option value='${item.Id}'  title='${item.TipoHallazgo}' style='font-weight: bold;'>${item.TipoHallazgo}</option>`);

            });

            $("#"+'sel_filter_normaad').html(" "); $("#"+'sel_filter_normaad').css('font-size','13px');
            $("#"+'sel_filter_normaad').html("<option selected value='0'>          </option>");//sel_normaxx
            $("#"+'sel_normaxx').html("<option selected value='0'>          </option>");
            response.Normas.map(function(item)
            {
                $("#"+'sel_filter_normaad').append(`<option value='${item.Id}'  title='${item.Norma}' style='font-weight: bold;'>${item.Norma}</option>`);
                $("#"+'sel_normaxx').append(`<option value='${item.Id}'  title='${item.Norma}' style='font-weight: bold;'>${item.Norma}</option>`);

            });


            //UnidadNegocio
            $("#"+'sel_uniddad_neg').html(" "); $("#"+'sel_filter_seddeah').css('font-size','13px');
            $("#"+'sel_uniddad_neg').html("<option selected value='0'>          </option>");
            response.UnidadNegocio.map(function(item)
            {
                $("#"+'sel_uniddad_neg').append(`<option value='${item.Id}'  title='${item.UnidadNegocioDescription}' style='font-weight: bold;'>${item.UnidadNegocioDescription}</option>`);

            });


            $("#"+'sel_filter_seddeah').html(" "); $("#"+'sel_filter_seddeah').css('font-size','13px');
            $("#"+'sel_filter_seddeah').html("<option selected value='0'>          </option>");
            $("#"+'sel_seddek').html("<option selected value='0'>          </option>");
            response.Sedes.map(function(item)
            {
                $("#"+'sel_filter_seddeah').append(`<option value='${item.Id}'  title='${item.Sede}' style='font-weight: bold;'>${item.Sede}</option>`);
                $("#"+'sel_seddek').append(`<option value='${item.Id}'  title='${item.Sede}' style='font-weight: bold;'>${item.Sede}</option>`);

            });

            $("#"+'sel_filter_estadoah').html(" "); $("#"+'sel_filter_estadoah').css('font-size','13px');//sel_seddek
            $("#"+'sel_filter_estadoah').html("<option selected value='0'>          </option>");

            response.StatusHallazgos.map(function(item)
            {
                $("#"+'sel_filter_estadoah').append(`<option value='${item.Id}'  title='${item.Description}' style='font-weight: bold;'>${item.Description}</option>`);

            });


            //sel_fuente_hhalazgo


            $("#cant_adm_hallazgos").html('<b> '+ response.Hallazgos.length+'</b> ');

            var t = 1;
            if(response.Hallazgos.length > 0)
            {
                $('#body-tabla-list-EvalAud').html(" ");
                $('#bodyTablaSinAuditorias').css('display','none');
                //t++;

                $('#pagination-container-EvalAud').pagination({
                    dataSource: response.Hallazgos,
                    pageSize: 10,
                    callback: function(data, pagination) {
                        var html = fnSp3ListarTablaGeneralH(data);
                        $('#body-tabla-list-EvalAud').html(html);

                        $("#sp3BtFiltroAdmHall").html("Buscar")
                        $("#sp3BtFiltroAdmHall").attr("disabled",false);

                        //debemos colocar los campos con su valores de busqueda si existen
                          $('#sel_filter_fuente').val(fuente);
                          $('#sel_filter_tipo_hallazgos').val(tipoh);
                          $('#sel_filter_normaad').val(normah);
                          $('#sel_filter_seddeah').val(seddeah);
                          $('#sel_filter_estadoah').val(estadoah);
                          $('#sp3_txt_fecha_desdeAh').val(f11) // f1 =  date1_DD_MM_AAAA_to_AAAA_MM_DD_T_HH_MM_S($('#sp3_txt_fecha_desdeAh').val())}
                          $('#sp3_txt_fecha_hastaAh').val(f22) // f2 =  date1_DD_MM_AAAA_to_AAAA_MM_DD_T_HH_MM_S($('#sp3_txt_fecha_hastaAh').val())}



                    }
                })
            }
            else
            {
                $('#body-tabla-list-EvalAud').html(" ");
                $('#bodyTablaSinAuditorias').css('display','block');
                $("#sp3BtFiltroAdmHall").html("Buscar")
                $("#sp3BtFiltroAdmHall").attr("disabled",false);

                 //debemos colocar los campos con su valores de busqueda si existen
                          $('#sel_filter_fuente').val(fuente);
                          $('#sel_filter_tipo_hallazgos').val(tipoh);
                          $('#sel_filter_normaad').val(normah);
                          $('#sel_filter_seddeah').val(seddeah);
                          $('#sel_filter_estadoah').val(estadoah);
                          $('#sp3_txt_fecha_desdeAh').val(f11) // f1 =  date1_DD_MM_AAAA_to_AAAA_MM_DD_T_HH_MM_S($('#sp3_txt_fecha_desdeAh').val())}
                          $('#sp3_txt_fecha_hastaAh').val(f22) // f2 =  date1_DD_MM_AAAA_to_AAAA_MM_DD_T_HH_MM_S($('#sp3_txt_fecha_hastaAh').val())}



                hideLoading();
            }




        });



}//------------------------------------- fin   fnSp3CargaFiltroEstadoInicialAdmHallazgo() -------------------------------------


function fnSp3ListarTablaGeneralH(data)
{
    var html = '';
    var o = 0;
    var primeraCargap =1;

    //console.log("SP3_DATA -->> ",data)


    //aqui vamos a crear un objeto plan para cada auditoria
    data.forEach((Item)=>
    {

        objHallazgo[Item.Id] = new classHallazgo();
        objHallazgo[Item.Id].cargarDataServicio(Item);
        //console.log("SP3_HALL -->> ",data)
        if(primeraCargap==1)
        {
            var habplan           = 'background-color: #b2b2b2;';//#ff6767
            var habver            = 'background-color: #b2b2b2;';//34559c
            var habEnviar         = 'background-color: #b2b2b2;';//05beee
            var disabled          = '';
            var disabledSusp      = '';
            var disabledver       = 'disabled readonly';
            var disabledEnviar    = 'disabled readonly';
            var classdis          = 'background-color: #ff6767';
            var ver               = false;
            var verModal          = "";
            var tittle            = "";
            var habEvaluar        = 'background-color: #b2b2b2 !important;';
            var disabledEvaluar   = 'disabled readonly';
            var habHistorial      = 'background-color: #b2b2b2 !important;';
            var disabledHistorial = 'disabled readonly';

            var verModal1 = '';

            if ( Item.StatusAccionCorrectivaId == 1) //PENDIENTE
            {
                //disabled     = 'disabled readonly';
                //habplan      = 'background-color:#ff6767 !important;';
                disabledver    = '';
                //habEnviar      = 'background-color: #05beee; !important';
                verModal1      = 'onclick="fnSp4EnviarACR('+Item.Id+')"';
                //habEnviar    = 'background-color: #05beee; !important';
                tittle         = "Enviar la Acción Correctiva del Hallazgo - "+Item.Code_Hallazgo;

            }
            if ( Item.StatusAccionCorrectivaId == 2) //NO APLICA
            {

            }
            if ( Item.StatusAccionCorrectivaId == 3) //EN ATENCION
            {

            }
            if ( Item.StatusAccionCorrectivaId == 4) //APROBADO
            {

            }
            if ( Item.StatusAccionCorrectivaId == 5 || Item.StatusAccionCorrectivaId == 6) //POR EVALUAR
            {
                disabledEvaluar = ''
                habEvaluar      = "background-color:#d2d97b;"
            }

            if(Item.AccionCorrectiva.EvaluarACR!=null)
            {
                // habilitamos el boton de modal del historial de evaluaciones....
                if(Item.AccionCorrectiva.EvaluarACR.length>0)
                {
                    disabledHistorial = ''
                    habHistorial      = "background-color:#58c25d;"
                }
            }
            console.log("Item-------",Item)
            // cuando el Hallazgo esta vencido
            if(Item.StatusHallazgoId == 4)
            {
                habEnviar       = 'background-color: #05beee; !important';//05beee
                disabledEnviar  = '';
            }

            var btNew  ='';


                html += `

                <div class="item-tabla p-2" style="z-index: 1;display:relative;">${btNew}
                    <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                        <div class="col-12 text-center" style="font-size: 14px; padding: 4px !important; ">
                            <div class="row">
                                <table width = "100%" border="0">
                                <tr >
                                    <td width = "7%" align="center"><div id="c1TabGeny" class="text-center lbCabezaTabla1 mx-0 px-0"  >${Item.Code_Hallazgo}</div></td>
                                    <td width = "7%" align="center"><div id="c2TabGeny" class="text-center lbCabezaTabla1 mx-0 px-0"  >${toCapitalize(Item.Fuente)}</div></td>
                                    <td width = "7%" align="center"><div id="c3TabGeny" class="text-center lbCabezaTabla1 mx-0 px-0"  >${toCapitalize(Item.TipoHallazgo)}</div></td>
                                    <td width = "7%" align="center"><div id="c4TabGeny" class="text-center lbCabezaTabla1 mx-0 px-0"  >${toCapitalize(Item.Norma)}</div></td>
                                    <td width = "9%" align="center"><div id="c5TabGeny" class="text-center lbCabezaTabla1 mx-0 px-0"  >${toCapitalize(Item.Sede)}</div></td>

                                    <td width = "9%" align="center"><div id="c6TabGeny" class="text-center lbCabezaTabla1 mx-0 px-0"  >${toCapitalize(Item.ResponsableName)}</div></td>
                                    <td width = "9%" align="center"><div id="c7TabGeny" class="text-center lbCabezaTabla1 mx-0 px-0"  >${toCapitalize(Item.ReportanteName)}</div></td>
                                    <td width = "7%" align="center"><div id="c8TabGeny" class="text-center lbCabezaTabla1 mx-0 px-0"  >${Item.FechaEjecucion}</div></td>
                                    <td width = "8%" align="center"><div id="c9TabGeny" class="text-center lbCabezaTabla1 mx-0 px-0"  >${Item.FechaRegistro}</div></td>
                                    <td width = "7%" align="center"><div id="c10TabGeny" class="text-center lbCabezaTabla1 mx-0 px-0" style="font-weight: bold; color:${Item.StatusHallazgoCode}"; >${Item.StatusHallazgo}</div></td>

                                    <td width = "7%" align="center"><div id="c11TabGeny" class="text-center lbCabezaTabla1 mx-0 px-0" style="font-weight: bold; color:${Item.StatusAccionCorrectivaCode}"; >${Item.StatusAccionCorrectiva}</div></td>
                                    <td width = "4%" align="center"><div id="c12TabGeny" class="text-center lbCabezaTabla1 mx-0 px-0"  >
                                            <button type='button' title='Editar del Hallazgo' onclick="fnSp3ModalMostrarHallazgoEditar(${Item.Id})"   class='btn-circle btn_read border-0' style='background-color:#34559c !important;' id='btn_verHallago${Item.Id}'>
                                                <img src='./images/iconos/ojo_1.svg' class='ojo-1'  >
                                            </button>
                                    </div></td>
                                    <td width = "4%" align="center"><div id="c13TabGeny" class="text-center lbCabezaTabla1 mx-0 px-0"  >
                                            <button type='button' onmouseup='fnSp4ModalEnviarHallazgoVencido(${Item.Id})' class='btn-circle btn_read border-0' ${disabledEnviar} style='${habEnviar}; cursor:pointer !important;' id='btn_sendAcr' title ="Enviar Hallazgo"  >
                                                    <img src='./images/iconos/Frame6.svg'  title ='Enviar Hallazgo - ${Item.Id}' style = 'cursor:pointer !important;'>
                                            </button>
                                    </div></td>
                                    <td width = "4%" align="center"><div id="c14TabGeny" class="text-center lbCabezaTabla1 mx-0 px-0"  >
                                                <button type='button' ${disabledEvaluar} onclick="fnVerModalEvaluarACR(${Item.Id})" class='btn-circle btn_read border-0' style='${habEvaluar} cursor:pointer !important;' id='btn_EvaluarAcr' title ='${tittle}'  >
                                                        <img src='./images/iconos/search 1.png'  title ='${tittle}' style = 'cursor:pointer !important;'>
                                                </button>
                                    </div></td>
                                    <td width = "4%" align="center"><div id="c15TabGeny" class="text-center lbCabezaTabla1 mx-0 px-0"  >

                                                <button type='button' ${disabledHistorial} onclick="fnVerModalHistorialEvaluacionACR(${Item.Id})" class='btn-circle btn_read border-0' style='${habHistorial} cursor:pointer !important;' id='btn_HistorialAcr' title ='${tittle}'  >
                                                        <img src='./images/iconos/tabs_5.png'  title ='${tittle}' style = 'cursor:pointer !important;'>
                                                </button>

                                    </div></td>

                                </tr>
                            </table>


                            </div>
                        </div>
                    </div>
                </div>


                    `;



        }
    })
    hideLoading();
    //console.log(html);

return html;

}
//------------------------------------- fin   fnSp3ListarTablaGeneralH() -------------------------------------




let accionBtCancelarVerAcr = ''

function fnSp3VentanaMostrarHallazgo()
{//----------------------------------------- ini fnSp3VentanaMostrarHallazgo  ---------------------------------
    //alert('aaaaaaaaaaaa')
    //actualizar token
    accionH = 0;
    vw_principal.init();
    $("#Sp3VentanaHallazgoEditView").modal("show").addClass("fade");
    $("#lbTitleVerPdfxx").html("<p> Nuevo Hallazgo </p>");

    $("#btCancelarVerAcr").html("Cancelar");
    accionBtCancelarVerAcr = 'Cancelar'
    $("#"+'sel_fuente_hhalazgo').html("");
    $("#"+'sel_fuente_hhalazgo').html("<option selected value='0'>          </option>");
    $("#"+'sel_fuente_hhalazgo').append(htmlFuenteNuevo);


    $("#sel_fuente_hhalazgo").val(0);
    $("#sel_ttipo_hh").val(0);
    $("#sel_normaxx").val(0);
    $("#sel_uniddad_neg").val(0);
    $("#sel_seddek").val(0);
    fnSp3onchangeNecAnalisis('si')
    $("#ResponsableName").val('');
    $("#ReportanteName").val(getCookie("vtas_fullname"+sessionStorage.tabVisitasa));
    $("#ReportanteUserHash").val(getCookie("vtas_id_hash"+sessionStorage.tabVisitasa));
    $("#ReportanteCorreo").val(getCookie("vtas_internal_useruser"+sessionStorage.tabVisitasa));
    $("#ReportanteCargo").val(getCookie("vtas_job"+sessionStorage.tabVisitasa));
    $("#txt_objetivo_plan2").val('');


    getPersonResponsable($("#ResponsableName"),1);
    getPersonReportante($("#ReportanteName"),1);
    $('#btGuardarModificar').html("<b>Guardar</b>");


    fnSp3onchangeColor('divf1'); fnSp3onchangeColor('divf2');
    fnSp3onchangeColor('divf3'); fnSp3onchangeColor('divf4');
    fnSp3onchangeColor('divf5'); fnSp3onchangeColor('divf6');
    fnSp3onchangeColor('divf7'); fnSp3onchangeColor('divf8');

    document.getElementById('divf1').style.setProperty('background', '#FFFFFF', 'important');
    document.getElementById('sel_fuente_hhalazgo').style.setProperty('background', '#FFFFFF', 'important');
    $('#sel_fuente_hhalazgo').prop('disabled', false);
    //$('#sel_fuente_hhalazgo').prop('disabled', false); //$('#sel_fuente_hhalazgo').prop('disabled', false); esto es para activar

    document.getElementById('divf2').style.setProperty('background', '#FFFFFF', 'important');
    document.getElementById('sel_ttipo_hh').style.setProperty('background', '#FFFFFF', 'important');
    $('#sel_ttipo_hh').prop('disabled', false);

    document.getElementById('divf3').style.setProperty('background', '#FFFFFF', 'important');
    document.getElementById('sel_normaxx').style.setProperty('background', '#FFFFFF', 'important');
    $('#sel_normaxx').prop('disabled', false);

    document.getElementById('divf4').style.setProperty('background', '#FFFFFF', 'important');
    document.getElementById('sel_uniddad_neg').style.setProperty('background', '#FFFFFF', 'important');
    $('#sel_uniddad_neg').prop('disabled', false);

    document.getElementById('divf5').style.setProperty('background', '#FFFFFF', 'important');
    document.getElementById('sel_seddek').style.setProperty('background', '#FFFFFF', 'important');
    $('#sel_seddek').prop('disabled', false);

    document.getElementById('divf6').style.setProperty('background', '#FFFFFF', 'important');
    document.getElementById('ResponsableName').style.setProperty('background', '#FFFFFF', 'important');
    $('#ResponsableName').prop('disabled', false);

    document.getElementById('divf7').style.setProperty('background', '#FFFFFF', 'important');
    document.getElementById('ReportanteName').style.setProperty('background', '#FFFFFF', 'important');
    $('#ReportanteName').prop('disabled', false);

    document.getElementById('divf8').style.setProperty('background', '#FFFFFF', 'important');
    document.getElementById('txt_objetivo_plan2').style.setProperty('background', '#FFFFFF', 'important');
    $('#txt_objetivo_plan2').prop('disabled', false);

}//----------------------------------------- ini fnSp3VentanaMostrarHallazgo  ---------------------------------



function fnConfirmarGuardarModal()
{
    console.warn("accionH -> ",accionH)
    if(accionH == 0)
    {
        //alert('aqui voy a ver si cargo los datoss');
        var campoVacio = 0;
        if($("#sel_fuente_hhalazgo").val() == 0){document.getElementById('divf1').style.setProperty('border-color', '#ff5a5a', 'important'); campoVacio = 1;   }
        if($("#sel_ttipo_hh").val() == 0){document.getElementById('divf2').style.setProperty('border-color', '#ff5a5a', 'important'); campoVacio = 1;   }
        if($("#sel_normaxx").val() == 0){document.getElementById('divf3').style.setProperty('border-color', '#ff5a5a', 'important'); campoVacio = 1;   }
        if($("#sel_uniddad_neg").val() == 0){document.getElementById('divf4').style.setProperty('border-color', '#ff5a5a', 'important'); campoVacio = 1;   }
        if($("#sel_seddek").val() == 0){document.getElementById('divf5').style.setProperty('border-color', '#ff5a5a', 'important'); campoVacio = 1;   }
        //AnalisisCausa
        if($("#ResponsableName").val() == 0){  document.getElementById('divf6').style.setProperty('border-color', '#ff5a5a', 'important'); campoVacio = 1;   }
        if($("#ResponsableCorreo").val() == 0){ document.getElementById('divf6').style.setProperty('border-color', '#ff5a5a', 'important'); campoVacio = 1;   }
        if($("#ReportanteName").val() == 0){document.getElementById('divf7').style.setProperty('border-color', '#ff5a5a', 'important'); campoVacio = 1;   }
        if($("#ReportanteCorreo").val() == 0){document.getElementById('divf7').style.setProperty('border-color', '#ff5a5a', 'important'); campoVacio = 1;   }
        if($("#txt_objetivo_plan2").val() == 0){document.getElementById('divf8').style.setProperty('border-color', '#ff5a5a', 'important'); campoVacio = 1;   }

        if(campoVacio == 0)
        {
            $('#msg_part1_azul').html("<b> Est&aacute; por guardar el hallazgo</b>")
            $("#Sp3VentanaHallazgoEditView").modal("hide").removeClass("fade");
            $("#modalConfirmHallazgo").modal("show").addClass("fade")

        }
        else
        {
            verModalError("Por favor Revise","Existen Campos Vacios o Incompletos")
        }
    }
    else
    {

        if(accionH == 1)
        {
            if($('#btGuardarModificar').html() == "<b>Modificar</b>")
            {
                fnSp3DesbloqueForm();
                $("#btGuardarModificar").html("<b>Guardar</b>")
                $("#btGuardarModificar").attr("disabled",false);
            }
            else
            {
                //verModalError('ahora si a modificar pues','aaaa');
                var campoVacio2 = 0;
                if($("#sel_ttipo_hh").val() == 0){document.getElementById('divf2').style.setProperty('border-color', '#ff5a5a', 'important'); campoVacio2 = 1;   }
                if($("#txt_objetivo_plan2").val() == 0){document.getElementById('divf8').style.setProperty('border-color', '#ff5a5a', 'important'); campoVacio2 = 1;   }
                //if($("#ResponsableName").val() == 0)


                if( ($("#ResponsableUserHash").val() == '') || ($("#ResponsableUserHash").val().length < 3) || ($("#ResponsableName").val() == 0) )
                {
                    //alert('es aqui el error name');
                    campoVacio2 = 1;
                    document.getElementById('divf6').style.setProperty('border-color', '#ff5a5a', 'important');
                    $("#ResponsableCorreo").val('')
                    $("#ResponsableCargo").val('')
                    $("#ResponsableUserHash").val('')
                }

                console.warn("ResponsableName "+$("#ResponsableName").val()+", ResponsableCorreo "+$("#ResponsableCorreo").val()+", ResponsableCargo "+$("#ResponsableCargo").val()+", ResponsableUserHash "+$("#ResponsableUserHash").val())

                if(campoVacio2 == 0)
                {
                    if(guardarEnviar == 0){$('#msg_part1_azul').html("<b>Se guardar&aacute;n los cambios realizados</b>")}
                    else if(guardarEnviar == 1){$('#msg_part1_azul').html("<b>Se guardar&aacute; y enviar&aacute; el hallazgo modificado</b>")}

                    $("#Sp3VentanaHallazgoEditView").modal("hide").removeClass("fade");
                    $("#modalConfirmHallazgo").modal("show").addClass("fade")
                }
                else
                {
                    verModalError("Por favor Revise","Existen Campos Vacios o Incompletos")
                }
            }
        }
    }

}

//------------------------------------- ini   fnSp3ModalMostrarHallazgoEditar() -------------------------------------

function fnSp3onchangeColor(IdDivf)
{
    document.getElementById(IdDivf).style.setProperty('border-color', '#DEE2E6', 'important');
}




function fnSp3ModalVerPlanAnual(idPlan)
{//------------------------------------- ini   fnSp3ModalVerPlanAnual() -------------------------------------

    $("#Sp3VentanaHallazgoEditView").modal("show").addClass("fade");
    $("#lbTitleVerPlanAnual").html("<p>  Datos del Plan Anual   </p>");

    //alert('aaaaaaaaaaaaaa');

}//------------------------------------- ini   fnSp3ModalVerPlanAnual() -------------------------------------












function fnSp3ModalMostrarHallazgoEditar(idHallazgo)
{
    fnSp3VentanaMostrarHallazgo()
    accionBtCancelarVerAcr = 'Ver'
    istHall = idHallazgo;
    accionH = 1;
    $('#btGuardarModificar').html("<b>Modificar</b>");

    //CARGO
    //CORREO
    console.log(getCookie("vtas_fullname"+sessionStorage.tabVisitasa));//cargo
    console.log(getCookie("vtas_internal_useruser"+sessionStorage.tabVisitasa));//correo
    //useruser



    // console.log("***********************************************************************************************************************************");
    // console.log(getCookie("vtas_internal_useruser"+sessionStorage.tabVisitasa))
    // // console.log(getCookie("vtas_id"+sessionStorage.tabVisitasa));
    // // console.log(getCookie("vtas_type_user"+sessionStorage.tabVisitasa));

    // // console.log(getCookie("vtas_id_hash"+sessionStorage.tabVisitasa));
    // // console.log(getCookie("vtas_person_id"+sessionStorage.tabVisitasa));
    // // console.log(getCookie("vtas_fullname"+sessionStorage.tabVisitasa));
    // // console.log(getCookie("vtas_external_company_id"+sessionStorage.tabVisitasa));
    // // console.log(getCookie("vtas_external_user"+sessionStorage.tabVisitasa));
    // // console.log(getCookie("vtas_perfil"+sessionStorage.tabVisitasa));
    // // console.log(getCookie("vtas_internal_useruser"+sessionStorage.tabVisitasa));
    // // console.log(getCookie("vtas_health_code_cmp"+sessionStorage.tabVisitasa));



   //cargamos el combo para editar el hallazgo
       $("#"+'sel_fuente_hhalazgo').html("<option selected value='0'>          </option>");
       $("#"+'sel_fuente_hhalazgo').append(htmlFuenteEdit);


    // alert(idHallazgo);
   // $("#Sp3VentanaHallazgoEditView").modal("show").addClass("fade")
    $("#lbTitleVerPdfxx").html(" ");
    $("#lbTitleVerPdfxx").html("<p> Ver Hallazgo - "+ objHallazgo[idHallazgo].dataHallazgo.Code_Hallazgo +" </p>");

    $("#btCancelarVerAcr").html(" Ver ACR ");
    $("#btCancelarVerAcr").attr("disabled",false);
    $("#btCancelarVerAcr").css("cursor",'pointer');

    console.log("editar", objHallazgo[idHallazgo].dataHallazgo)
    console.log("ACR", objHallazgo[idHallazgo].dataHallazgo.AccionCorrectiva.Id)
    if (objHallazgo[idHallazgo].dataHallazgo.AccionCorrectiva.Id==0){
        $("#btCancelarVerAcr").attr("disabled",true);
        $("#btCancelarVerAcr").css("cursor",'');
    }

    if (objHallazgo[idHallazgo].dataHallazgo.StatusAccionCorrectivaId>2)
    {
        //alert("desbloquear boton ver acr")
        $("#btCancelarVerAcr").css("disabled",false)
        $("#btCancelarVerAcr").css("background-color","#fff")
    }
    else
    {
        //alert("bloquear boton ver acr")
        $("#btCancelarVerAcr").css("disabled",true)
        $("#btCancelarVerAcr").css("background-color","#b2b2b2")
    }



  //vamos a ver si el responsable fue definido para el hallazgo atyraves del HASH
  //alert(objHallazgo[idHallazgo].dataHallazgo.ResponsableUserHash);


    //alert((objHallazgo[idHallazgo].dataHallazgo.FuenteId));
    $("#sel_fuente_hhalazgo").val(objHallazgo[idHallazgo].dataHallazgo.FuenteId);
    $("#sel_ttipo_hh").val(objHallazgo[idHallazgo].dataHallazgo.TipoHallazgoId);
    $("#sel_normaxx").val(objHallazgo[idHallazgo].dataHallazgo.NormaId);
    $("#sel_uniddad_neg").val(objHallazgo[idHallazgo].dataHallazgo.UnidadNegocioId);
    $("#sel_seddek").val(objHallazgo[idHallazgo].dataHallazgo.SedeId);
    if(objHallazgo[idHallazgo].dataHallazgo.AnalisisCausa == 0){fnSp3onchangeNecAnalisis('no')}
    else{if(objHallazgo[idHallazgo].dataHallazgo.AnalisisCausa == 1){fnSp3onchangeNecAnalisis('si')}}

    $("#ResponsableName").val(objHallazgo[idHallazgo].dataHallazgo.ResponsableName);
    $("#ResponsableCorreo").val(objHallazgo[idHallazgo].dataHallazgo.ResponsableCorreo)
    $("#ResponsableUserHash").val(objHallazgo[idHallazgo].dataHallazgo.ResponsableUserHash)


                        //console.log("SP4",objHallazgo[idHallazgo].dataHallazgo)

    // alert("720 nombre:"+objHallazgo[idHallazgo].dataHallazgo.ReportanteName);
    // alert("correo:"+objHallazgo[idHallazgo].dataHallazgo.ReportanteCorreo)
    // alert("hash:"+objHallazgo[idHallazgo].dataHallazgo.ReportanteUserHash)

    $("#ReportanteName").val(objHallazgo[idHallazgo].dataHallazgo.ReportanteName);
    $("#ReportanteCorreo").val(objHallazgo[idHallazgo].dataHallazgo.ReportanteCorreo)
    $("#ReportanteUserHash").val(objHallazgo[idHallazgo].dataHallazgo.ReportanteUserHash)


    $("#txt_objetivo_plan2").val(objHallazgo[idHallazgo].dataHallazgo.Hallazgo);

    fnSp3onchangeColor('divf1'); fnSp3onchangeColor('divf2');
    fnSp3onchangeColor('divf3'); fnSp3onchangeColor('divf4');
    fnSp3onchangeColor('divf5'); fnSp3onchangeColor('divf6');
    fnSp3onchangeColor('divf7'); fnSp3onchangeColor('divf8');

    document.getElementById('divf1').style.setProperty('background', '#EFEFEF', 'important');
    document.getElementById('sel_fuente_hhalazgo').style.setProperty('background', '#EFEFEF', 'important');
    $('#sel_fuente_hhalazgo').prop('disabled', 'disabled');
    //$('#sel_fuente_hhalazgo').prop('disabled', false); //$('#sel_fuente_hhalazgo').prop('disabled', false); esto es para activar

    document.getElementById('divf2').style.setProperty('background', '#EFEFEF', 'important');
    document.getElementById('sel_ttipo_hh').style.setProperty('background', '#EFEFEF', 'important');
    $('#sel_ttipo_hh').prop('disabled', 'disabled');

    document.getElementById('divf3').style.setProperty('background', '#EFEFEF', 'important');
    document.getElementById('sel_normaxx').style.setProperty('background', '#EFEFEF', 'important');
    $('#sel_normaxx').prop('disabled', 'disabled');

    document.getElementById('divf4').style.setProperty('background', '#EFEFEF', 'important');
    document.getElementById('sel_uniddad_neg').style.setProperty('background', '#EFEFEF', 'important');
    $('#sel_uniddad_neg').prop('disabled', 'disabled');

    document.getElementById('divf5').style.setProperty('background', '#EFEFEF', 'important');
    document.getElementById('sel_seddek').style.setProperty('background', '#EFEFEF', 'important');
    $('#sel_seddek').prop('disabled', 'disabled');

    document.getElementById('divf6').style.setProperty('background', '#EFEFEF', 'important');
    document.getElementById('ResponsableName').style.setProperty('background', '#EFEFEF', 'important');
    $('#ResponsableName').prop('disabled', 'disabled');

    document.getElementById('divf7').style.setProperty('background', '#EFEFEF', 'important');
    document.getElementById('ReportanteName').style.setProperty('background', '#EFEFEF', 'important');
    $('#ReportanteName').prop('disabled', 'disabled');

    document.getElementById('divf8').style.setProperty('background', '#EFEFEF', 'important');
    document.getElementById('txt_objetivo_plan2').style.setProperty('background', '#EFEFEF', 'important');
    $('#txt_objetivo_plan2').prop('disabled', 'disabled');

    fnSp4PintarExcel()
}
//------------------------------------- fin   fnSp3ModalMostrarHallazgoEditar() -------------------------------------


function fnSp3DesbloqueForm()
{

    document.getElementById('divf2').style.setProperty('background', '#FFFFFF', 'important');
    document.getElementById('sel_ttipo_hh').style.setProperty('background', '#FFFFFF', 'important');
    $('#sel_ttipo_hh').prop('disabled', false);

    console.warn("objHallazgo[istHall].dataHallazgo -> ",objHallazgo[istHall].dataHallazgo.FuenteId)

    // DESBLOQUEAR SOLO CUANDO SEA Fiscalización, Simulacro, Reclamo del Cliente o Inspeccion Interna
    if( objHallazgo[istHall].dataHallazgo.FuenteId >= 5 && objHallazgo[istHall].dataHallazgo.FuenteId <= 8)
    {
        // desbloquear select Norma
        document.getElementById('divf3').style.setProperty('background', '#FFFFFF', 'important');
        document.getElementById('sel_normaxx').style.setProperty('background', '#FFFFFF', 'important');
        $('#sel_normaxx').prop('disabled', false);

        // desbloquear select Unidad Negocio
        document.getElementById('divf4').style.setProperty('background', '#FFFFFF', 'important');
        document.getElementById('sel_uniddad_neg').style.setProperty('background', '#FFFFFF', 'important');
        $('#sel_uniddad_neg').prop('disabled', false);

        // desbloquear select Sede
        document.getElementById('divf5').style.setProperty('background', '#FFFFFF', 'important');
        document.getElementById('sel_seddek').style.setProperty('background', '#FFFFFF', 'important');
        $('#sel_seddek').prop('disabled', false);
    }

    document.getElementById('divf8').style.setProperty('background', '#FFFFFF', 'important');
    document.getElementById('txt_objetivo_plan2').style.setProperty('background', '#FFFFFF', 'important');
    $('#txt_objetivo_plan2').prop('disabled', false);

    document.getElementById('divf6').style.setProperty('background', '#FFFFFF', 'important');
    document.getElementById('ResponsableName').style.setProperty('background', '#FFFFFF', 'important');
    $('#ResponsableName').prop('disabled', false);

    //if no existe responsable por el hash habilitaremos o no el campo modificado
    if(($("#ResponsableUserHash").val() == '')||($("#ResponsableUserHash").val().length < 25))
    {
        //document.getElementById('divf6').style.setProperty('background', '#FFFFFF', 'important');
        //document.getElementById('ResponsableName').style.setProperty('background', '#FFFFFF', 'important');
        //$('#ResponsableName').prop('disabled', false);
        guardarEnviar = 1;
        //alert('activado')
    }
    else
    {
        guardarEnviar = 0;
    }


}



//------------------------------------- ini   fnSp3GuardarHallazgoInsertUpdate() -------------------------------------
function fnSp3GuardarHallazgoInsertUpdate()
{

    //console.log("Guardando..........................");


    showLoading();

    $("#btGuardarModificar2").html("<b>Guardando..</b>")
    $("#btGuardarModificar2").attr("disabled",true);

    if(accionH == 0)
    {
        //---------------------------------------INSERTAR HALLAZGO EN LA BASE DE DATOS ------------------------------------
        guardarEnviar = 1
        var body = {
            "FuenteId":             $("#sel_fuente_hhalazgo").val(),
            "TipoHallazgoId":       $("#sel_ttipo_hh").val(),
            "NormaId":              $("#sel_normaxx").val(),
            "UnidadNegocioId":      $("#sel_uniddad_neg").val(),
            "SedeId":               $("#sel_seddek").val(),
            "AnalisisCausa":        AnalisisCausa,
            "ResponsableName":      $("#ResponsableName").val(),
            "ResponsableCorreo":    $("#ResponsableCorreo").val(),
            "ResponsableCargo":     $("#ResponsableCargo").val(),
            "ResponsableUserHash":  $("#ResponsableUserHash").val(),
            "ReportanteName":       $("#ReportanteName").val(),
            "ReportanteCorreo":     $("#ReportanteCorreo").val(),
            "ReportanteCargo":      $("#ReportanteCargo").val(),
            "ReportanteUserHash":   $("#ReportanteUserHash").val(),
            "Hallazgo":             $('#txt_objetivo_plan2').val(),
            "Created_By":           getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
            "Usuario":              getCookie("vtas_fullname"+sessionStorage.tabVisitasa),
            "Cargo":                getCookie("vtas_job"+sessionStorage.tabVisitasa),
            "Correo":               getCookie("vtas_internal_useruser"+sessionStorage.tabVisitasa),
            "EnviarCorreo":         guardarEnviar
            }




            console.log('enviando:', body)

            var url = apiurlAuditoria+"/api/Post-Hallazgos-All?code=CVNpmUeJgbarMkxynabne1CGLBm0gXH9mrEV6a2vuc2BvQgc4hDvbg==&httpmethod=post";
            var headers ={
               "apikey":constantes.apiKey,
               "Content-Type": "application/json",
            }

            $.ajax({
                method: 'POST',
                url:  url,
                headers:headers,
                data: JSON.stringify(body),
                crossDomain: true,
                dataType: "json",
            }).done(function (data) {

                console.log(data);
                if(data.Id > 0)
                {
                     hideLoading();
                     $("#modalConfirmHallazgo").modal("hide").removeClass("fade")
                     $("#modalConfirmHallazgoGuardarOk").modal("show").addClass("fade")


                    //alert(guardarEnviar);
                    if(guardarEnviar == 0){$('#msg_part1_verde').html("<b> Se guard&oacute; con &eacute;xito el hallazgo</b>")}
                    else if(guardarEnviar == 1){ $('#msg_part1_verde').html("<b> Se realiz&oacute; la acci&oacute;n con &eacute;xito el hallazgo</b>"); guardarEnviar = 0;}

                     $('#cod_halla_gen').html(' <b> '+ data.Code_Hallazgo+' </b>')
                     fnSp3CargaFiltroEstadoInicialAdmHallazgo();

                     $("#btGuardarModificar2").html("<b>Guardar</b>")
                     $("#btGuardarModificar2").attr("disabled",false);

                }

                //fnEnviarInformeAuditoriaOk()

            })
            .fail(function( jqXHR, textStatus, errorThrown ) {

                verModalError('Al Guardar el Hallazgo', 'Intente Nuevamente');
                $("#btGuardarModificar2").html("<b>Guardar</b>")
                $("#btGuardarModificar2").attr("disabled",false);
            })
            .always(function( jqXHR, textStatus, errorThrown ) {

            });//*/
        //---------------------------------------INSERTAR HALLAZGO EN LA BASE DE DATOS ------------------------------------
    }
    else
    {

                if(accionH == 1)
                {

                     //alert('ahora si a modificar hallazgo');
                    if($("#ResponsableUserHash").val()=="")
                    {
                        guardarEnviar = 0;
                    }else{
                        guardarEnviar = 1;
                    }

                    //---------------------------------------MODIFICAR HALLAZGO EN LA BASE DE DATOS ------------------------------------
                     var body = {

                        "Id": istHall,
                        "TipoHallazgoId":       $("#sel_ttipo_hh").val(),
                        "NormaId":              $("#sel_normaxx").val(),
                        "UnidadNegocioId":      $("#sel_uniddad_neg").val(),
                        "SedeId":               $("#sel_seddek").val(),
                        "AnalisisCausa":        AnalisisCausa,
                        "Hallazgo":             $('#txt_objetivo_plan2').val(),
                        "Last_Updated_By":      getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
                        "ResponsableName":      $("#ResponsableName").val(),
                        "ResponsableCorreo":    $("#ResponsableCorreo").val(),
                        "ResponsableCargo":     $("#ResponsableCargo").val(),
                        "ResponsableUserHash":  $("#ResponsableUserHash").val(),
                        "Usuario":              getCookie("vtas_fullname"+sessionStorage.tabVisitasa),
                        "Cargo":                getCookie("vtas_job"+sessionStorage.tabVisitasa),
                        "Correo":               getCookie("vtas_internal_useruser"+sessionStorage.tabVisitasa),
                        "EnviarCorreo":         guardarEnviar
                        }



                        console.log('enviando a modificar:', body)

                        var url = apiurlAuditoria+"/api/Post-Hallazgos-All?code=CVNpmUeJgbarMkxynabne1CGLBm0gXH9mrEV6a2vuc2BvQgc4hDvbg==&httpmethod=put";
                        var headers ={
                        "apikey":constantes.apiKey,
                        "Content-Type": "application/json",
                        }

                        $.ajax({
                            method: 'POST',
                            url:  url,
                            headers:headers,
                            data: JSON.stringify(body),
                            crossDomain: true,
                            dataType: "json",
                        }).done(function (data) {

                            console.log('despues modificar',data);
                            if(data.Id > 0)
                            {
                                $("#modalConfirmHallazgo").modal("hide").removeClass("fade")
                                $("#modalConfirmHallazgoGuardarOk").modal("show").addClass("fade")

                                if(guardarEnviar == 0){$('#msg_part1_verde').html("<b> Se guard&oacute; con &eacute;xito el hallazgo</b>")}
                                else if(guardarEnviar == 1){ $('#msg_part1_verde').html("<b> Se realiz&oacute; la acci&oacute;n con &eacute;xito</b>"); guardarEnviar = 0;}


                                //$('#msg_part1_verde').html("<b> Se guardar&oacute;n con &eacute;xito los cambios en el hallazgo </b>")//Se guardarón con éxito los cambios en el hallazgo
                                $('#cod_halla_gen').html(' ')
                                fnSp3CargaFiltroEstadoInicialAdmHallazgo();

                                $("#btGuardarModificar2").html("<b>Guardar</b>")
                                $("#btGuardarModificar2").attr("disabled",false);

                            }

                            //fnEnviarInformeAuditoriaOk()

                        })
                        .fail(function( jqXHR, textStatus, errorThrown ) {

                            verModalError('Al Modificar el Hallazgo', 'Intente Nuevamente');
                            $("#btGuardarModificar2").html("<b>Guardar</b>")
                            $("#btGuardarModificar2").attr("disabled",false);
                        })
                        .always(function( jqXHR, textStatus, errorThrown ) {
                            hideLoading();
                        });//*/
                    //---------------------------------------MODIFICAR HALLAZGO EN LA BASE DE DATOS ------------------------------------
                }
    }


    //$("#modalConfirmHallazgo").modal("hide").removeClass("fade")
    //$("#modalConfirmHallazgoGuardarOk").modal("show").addClass("fade")

}
//------------------------------------- ini   fnSp3GuardarHallazgoInsertUpdate() -------------------------------------




function  fnSp3CargarFuncionesAdmHallazgosDinamicasDOM()
{//------------------------------------- ini    fnSp3CargarFuncionesAdmHallazgosDinamicasDOM() -------------------------------------

    //*.......................................... */
    $("#sp3_txt_fecha_desdeAh").datetimepicker({
        timepicker:false,
        format:'d/m/Y'});
    //*.......................................... */

    //*.......................................... */
    $("#sp3_txt_fecha_hastaAh").datetimepicker({
        timepicker:false,
        format:'d/m/Y'});
    //*.......................................... */



}//------------------------------------- fini    fnSp3CargarFuncionesAdmHallazgosDinamicasDOM() -------------------------------------




function fnSp3ResponsiveAdmHallazgos()
{//------------------------------------- ini   fnSp3ResponsiveAdmHallazgos() -------------------------------------
    //console.log("fnSp3ResponsiveAdmHallazgos............................");
  var f1 = '11px';
  var f2 = '12px';
  var f3 = '14px';



    for(var i = 1; i<13; i++)
    {
      var id = 'c'+i+'TabGeny';//c1TabGeny
      id1 = id;
      id = "#"+id;


      if (screen.width < 1024)
      {
          //if(i == 12)$(id).html('Susp.');
          $(id).css('font-size',f1)
      }
      else
          {
           if (screen.width <= 1280)
             {
              //if(i == 12)$(id).html('Suspender');
              $(id).css('font-size',f2)
             }
            else
             {

               $(id).css('font-size',f3)
               //console.log("$(",id1,").css('font-size',",f1,")");
               //document.getElementById(id1).style.setProperty( 'font-size',f1, 'important' );


             }
          }
    }


}//------------------------------------- fini   fnSp3ResponsiveAdmHallazgos() -------------------------------------


var getPersonResponsable = function (obj,i) {
    obj.autocomplete({
        change: function (event, ui)
        {
           // alert('entra');
           //alert('Hola');
           //console.log('buscando.............',ui);


            //console.log( $("#hid_collaborator_id_"+i).val())
            if (ui.item === null &&  $("#hid_Name_id_1"+i).length>20)
            {

                 $("#hid_collaborator_id_"+i).val("");
                 $(this).val("");
                 $("#add_covid_lastname_"+i).val("");
            }
            else if(ui.item)
            {

                $("#ResponsableName").val(ui.item.firstname).trigger("change");
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
                          document.getElementById('loadResp').style.visibility = 'visible';
            console.log("---[",filter);
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
                    document.getElementById('loadResp').style.visibility = 'hidden';
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
                        json.correo     = item.userPrincipalName;
                        array.push(json);
                    });
                    response(array);

                }
            });
        },
        minLength: 3,
        select: function( event, ui )
        { //alert(ui.item.id)
            $("#ResponsableUserHash").val(ui.item.id);
            $("#ResponsableCargo").val(ui.item.cargo);
            $("#ResponsableCorreo").val(ui.item.correo);

            if(guardarEnviar == 1)
            {
                $('#btGuardarModificar').html("<b>Guardar Enviar</b>");
            }
            else
            {
                $('#btGuardarModificar').html("<b>Guardar</b>");
            }
            //$("#ResponsableUserHash").val(ui.item.correo);

            //$("#add_covid_dni_"+i).trigger("focusout");
            //console.log(ui.item.label)
            setTimeout(function(){
                // alert(ui.item.firstname)
                // alert(ui.item.cargo)//correo
                // alert(ui.item.correo)
                $("#ResponsableName").val(ui.item.firstname);
                //alert($("#ResponsableCorreo").val())


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

var getPersonReportante = function (obj,i) {
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

                $("#ReportanteName").val(ui.item.firstname).trigger("change");
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
               document.getElementById('loadRepo').style.visibility = 'visible';
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
                    document.getElementById('loadRepo').style.visibility = 'hidden';
                    $("#add_firtnameload_1").hide();
                    var array =[];
                    data =  JSON.parse(data);
                    //console.log("tony",data);

                    data.value.forEach(item =>
                    {
                        var json ={}
                        json.label      = item.displayName;
                        json.value      = item.givenName;
                        json.id         = item.objectId;
                        json.cargo      = item.jobTitle;
                        json.firstname  = item.displayName;//item.givenName+' '+item.surname;
                        json.correo     = item.userPrincipalName;
                        array.push(json);
                    });
                    response(array);

                }
            });
        },
        minLength: 3,
        select: function( event, ui )
        { //alert(ui.item.id)
            $("#ReportanteUserHash").val(ui.item.id);
            $("#ReportanteCargo").val(ui.item.cargo);
            $("#ReportanteCorreo").val(ui.item.correo);
            //$("#ReportanteUserHash").val(ui.item.correo);

            //$("#add_covid_dni_"+i).trigger("focusout");
            //console.log(ui.item.label)
            setTimeout(function(){
                // alert(ui.item.firstname)
                // alert(ui.item.cargo)//correo
                // alert(ui.item.correo)
                $("#ReportanteName").val(ui.item.firstname);
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





function cambiaTipoH()
{
        if($("#sel_ttipo_hh").val() == 8)// o sea oportunidad de mejora
            {
               $('#lbNoAC').css('color','black').css('font-weight','bold');   //color:black   font-weight: bold
            }
        else
        {
            fnSp3onchangeNecAnalisis('si')
            $('#lbNoAC').css('color','#DBDBEA').css('font-weight','normal');
        }

}


function fnSp3onchangeNecAnalisis(si_no)
{//------------------------------------- ini   fnSp3onchangeNecAnalisis() -------------------------------------


    if(si_no == 'si')//si
    {
        $('#rbtn_si').attr('src','./images/iconos/aprobarbien.svg');
        $('#rbtn_no').attr('src','./images/iconos/aprobarvoid.svg');
        AnalisisCausa = 1;
    }
    else//no
    {
        if(si_no == 'no')//si
        {
            if($("#sel_ttipo_hh").val() == 8)// o sea oportunidad de mejora
            {
                $('#rbtn_no').attr('src','./images/iconos/aprobarbien.svg');
                $('#rbtn_si').attr('src','./images/iconos/aprobarvoid.svg');
                AnalisisCausa = 0;
            }
        }
    }

}//------------------------------------- fini   fnSp3onchangeNecAnalisis() -------------------------------------


function fnSp3CargaSedeDinamico(div)
{//--------------------------------- ini fnSp3CargaSedeDinamico -------------------------------------------------

    showLoading();

    fnSp3onchangeColor('divf4')


    $("#"+'sel_seddek').html("<option selected value='0'>Cargando.....</option>");



     var unnidN =  $('#sel_uniddad_neg').val();   // if(unnidN == null){fuente = 0;}



    // https://550m44ud1tmg7454-audit-dev.azurewebsites.net/api/Get-Evaluacion_Auditores-All?code=EUnorEI6paUzxOdpVKKAGDjhb4p4wEZ3R6NTWKDoOdVrk0Y0S/ZOkg==&httpmethod=objectlist&RolId=&StatusEvaluacionId=&FechaInicio=&FechaFin=&Auditor=&Nota=52
    var url = apiurlAuditoria+ "/api/Get-Sede-All?code=0N470WSSjrIb6hhHAsgBHgS8wplALMbCB6KcP5FmsjFDvjQkcaaWbw==&httpmethod=objectlist&UnidadNegocioId="+unnidN;
    console.log("URL",url )

    var headers ={
                   "apikey":constantes.apiKey
                 }

        var settings = {
            "url": url,
            "method": "GET",
            "timeout": 0,
            "crossDomain": true,
            "dataType": "json",
            "headers": headers,
        };

        $.ajax(settings).done(function (response) {



            if(response.length > 0)
            {
                $("#"+'sel_seddek').html("<option selected value='0'>          </option>");
                for(var i = 0; i< response.length; i++)
                {
                    console.log("**todos*****----------*******",response[i]);
                    $("#"+'sel_seddek').append(`<option value='${response[i].Id}'  title='${response[i].Code}' style='font-weight: bold;'>${response[i].Code}</option>`);

                }

               hideLoading();
            }
            hideLoading();


        })




}//--------------------------------- fini fnSp3CargaSedeDinamico -------------------------------------------------





//*********************************************-----------------------------  SPRINT 4 IV  -----------------------------********************************************** */


//---------------------------------------------------------------- fnSp4EnviarACR ----------------------------------------------ini
function fnSp4EnviarACR(idHallazgo)
{
    console.log('fnSp4EnviarACR = ', idHallazgo);
}
//---------------------------------------------------------------- fnSp4EnviarACR ----------------------------------------------fin




//---------------------------------------------------------------- fnSp4BtCerrarEnviarACR ----------------------------------------------ini
function fnSp4BtCerrarEnviarACR()
{

    if($('#btCancelarVerAcr').html() == "Cancelar")
    {
        $('#Sp3VentanaHallazgoEditView').modal('hide').removeClass('fade');
    }
    else
    {
       // alert('Ver ACR')
    }
}
//---------------------------------------------------------------- fnSp4BtCerrarEnviarACR ----------------------------------------------fin

//------------------------------------------------------ fnSp4BtnVerACR ---------------------------------------------- start
var fnSp4BtnVerACR = function()
{

    if(accionBtCancelarVerAcr === 'Cancelar')
    {
        $('#Sp3VentanaHallazgoEditView').modal('hide').removeClass('fade');
    }
    else
    {
        fnVerModalEvaluarACR(istHall)
        $('#btnEvaluarACR').css('display','none')//fnVerModalEvaluarACR
        $("#btnEvaluarACR").attr('disabled',true)
        $("#btnExportarACR").css("display","block")
        $('#cerrarAA').css('display','none')
        $('#cerrarBB').css('display','block')
        $('#Sp3VentanaHallazgoEditView').modal('hide').removeClass('fade');
    }
}
//------------------------------------------------------ fnSp4BtnVerACR ---------------------------------------------- end


//------------------------------------------------------ fnVerModalEvaluarACR ---------------------------------------------- start
function fnVerModalEvaluarACR(Id)
{
    istHall = Id
    console.warn("Evaluar ",objHallazgo[Id])
    console.warn("$('#btnEvaluarACR').css('display')",$('#btnEvaluarACR').css('display'))
    /*if($('#btnEvaluarACR').css('display')==="none")
    {
        $('#btnEvaluarACR').css('display','block')
        $("#btnEvaluarACR").attr('disabled',false)
        $('#cerrarAA').css('display','block')
        $('#cerrarBB').css('display','none')
    }//*/
    $("#cerrarAA").css("display","block")
    $("#cerrarBB").css("display","none")
    $("#btnEvaluarACR").css("display","block")
    $("#btnEvaluarACR").attr('disabled',false)
    $("#cerrarBB").css("display","none")
    $("#btnExportarACR").css("display","none")
    //$("#btnFinalizarACR").css('display','block')
    // Usamos la funcion definida en hallazgosAsignados.js
    // para Ver la modal del ACR
    let ver = "disabled"
    $("#ver").val(ver)
    fnSp4VerModalCrearACR(Id,ver)
    // bloqueamos los inputs
    $("#selectAreasHA").attr("disabled",true);
    $("#queHA").attr("disabled",true);
    $("#dondeHA").attr("disabled",true);
    $("#cuandoHA").attr("disabled",true);
    $("#comoHA").attr("disabled",true);
    $("#cualHA").attr("disabled",true);
    $("#problemaHA").attr("disabled",true);
    fnSp4PintarPlanAccion(ver)

}
//-------------------------------------------------------- fnVerModalEvaluarACR ---------------------------------------------- end

//-------------------------------------------------------- fnSp4EvaluarACR ---------------------------------------------- start
function fnSp4EvaluarACR()
{
    // ocultamos modal
    $('#modalVerACR').modal('hide').removeClass('fade');
    // colocamos titulo a la modal
    $("#tituloModalEvularACR").html(`Evaluar ACR - ${objHallazgo[istHall].dataHallazgo.Code_Hallazgo}`)
    // console.warn("Historial ",objHallazgo[istHall],istHall)
    // console.warn("Historial ",objHallazgo[istHall].dataHallazgo.AccionCorrectiva.EvaluarACR)
    // console.warn("StatusACR ",objHallazgo[istHall].dataHallazgo.AccionCorrectiva.EvaluarACR[12].StatusAccionCorrectivaId)
    // recorremos el historial de evaluaciones y buscamos el activo (Active==1)
    objHallazgo[istHall].dataHallazgo.AccionCorrectiva.EvaluarACR.forEach(function(Item)
    {
        if(Item.Active==1)
        {
            console.warn("Item",Item)
            $("#idEvaluacion").val(Item.Id)
            //fnSp4ValorEvaluarACR(Item.StatusAccionCorrectivaId)
            $("#StatusACR").val(Item.StatusAccionCorrectivaId)
            if(Item.StatusAccionCorrectivaId==4){
                $("#aprobarACR").click()
                $("#ObsercacionACRSp4").attr('disabled',true)
            }else{
                $("#observarACR").click()
                $("#ObsercacionACRSp4").val(Item.Observacion)
                $("#ObsercacionACRSp4").attr('disabled',false)
            }//*/
        }
    })
    // mostramos modal
    $('#modalEvaluarACR').modal('show').addClass('fade')
}
//-------------------------------------------------------- fnSp4EvaluarACR ---------------------------------------------- end

//-------------------------------------------------------- START fnSp4PreguntarGuardarEvaluarACR ----------------------------------------------
var FlagAccionACR = 1
// FlagAccion = 1 (Guardar)
// FlagAccion = 2 (Finalizar y Enviar)
var fnSp4PreguntarGuardarEvaluarACR = function(FlagAccion)
{
    let resultado = false
    let valor       = 0
    let observacion = ""
    valor       = $("#StatusACR").val()
    observacion = $("#ObsercacionACRSp4").val()
    console.warn("ValorACR ",valor)
    console.warn("ObservacionACR ",observacion)
    // si es observacion y no tiene testo OR no ha seleccionado opcion
    if( (valor==7 && observacion.length < 10) || valor == 0)
    {
        alert("observador debes introducir texto ",observacion.length)
    }
    else
    {
        FlagAccionACR = FlagAccion
        // ocultamos modal
        $('#modalEvaluarACR').modal('hide').removeClass('fade');
        // mostramos modal
        $('#modalConfirmarEvaluarACRSp4').modal('show').addClass('fade')
    }

}
//-------------------------------------------------------- END fnSp4PreguntarGuardarEvaluarACR ----------------------------------------------


//-------------------------------------------------------- START fnSp4ValorEvaluarACR() ----------------------------------------------
var fnSp4ValorEvaluarACR = function(valor)
{
    $("#StatusACR").val(valor)
    if(valor==4)
    {
        $("#ObsercacionACRSp4").val('')
        $("#ObsercacionACRSp4").attr('disabled',true)
    }else
        $("#ObsercacionACRSp4").attr('disabled',false)
}
//-------------------------------------------------------- END fnSp4ValorEvaluarACR() ----------------------------------------------


//-------------------------------------------------------- START fnSp4ConfirmarEvaluarACR() ----------------------------------------------
var fnSp4ConfirmarEvaluarACR = function()
{
    console.log("enviar a guardar evaluacion")
    // OCULTAR MODAL CONFIRMAR GUARDAR EVALUACION
    $('#modalConfirmarEvaluarACRSp4').modal('hide').removeClass('fade')

    // CONSTRUIMOS DATA A ENVIAR A GUARDAR
    var body =
    {
        "Id":                       $('#idEvaluacion').val(),
        "HAAccionCorrectivaId":     objHallazgo[istHall].dataHallazgo.AccionCorrectiva.Id,
        "HallazgoId":               objHallazgo[istHall].dataHallazgo.Id,
        "Active":                   1,
        "Observacion":              $('#ObsercacionACRSp4').val(),
        "EvaluadorName":            getCookie("vtas_fullname"+sessionStorage.tabVisitasa),
        "EvaluadorCorreo":          getCookie("vtas_internal_useruser"+sessionStorage.tabVisitasa),
        "EvaluadorCargo":           getCookie("vtas_job"+sessionStorage.tabVisitasa),
        "EvaluadorUserHash":        getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
        "Created_By":               getCookie("vtas_fullname"+sessionStorage.tabVisitasa),
        "FlagAccionACR":            parseInt(FlagAccionACR),
        "StatusAccionCorrectivaId": parseInt($('#StatusACR').val())
    }//*/
    console.warn('body ',body)

    // Parametros del servicio
    //var url     = apiurlAuditoria+"/api/Post-Accion_Correctiva-All?code=QSe534M8BaW1nGRPt9bpR70b8tlRvr23agq21eNK7vSODc1gFnpZuQ==&httpmethod=EvaluarACR";
    var url     = apiurlAuditoria+"/api/Post-Accion_Correctiva-All?code="+PostAccionCorrectivaAll+"&httpmethod=EvaluarACR";
    var headers ={
       "apikey": constantes.apiKey,
       "Content-Type": "application/json",
    }

    $.ajax({
        method: 'POST',
        url:  url,
        headers:headers,
        data: JSON.stringify(body),
        crossDomain: true,
        dataType: "json",
    })
    .done(function (data) {
        console.log("data:",data)
        Id = data.Id
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
        console.warn("fail se ha producido un error...")
    })
    .always(function( jqXHR, textStatus, errorThrown ) {
        console.warn("always ya termino...")
        if(Id>0)
        {
            // MOSTRAR MODAL EXITO GUARDAR EVALUACION
            $('#modalExitoEvaluarACRSp4').modal('show').addClass('fade')
            //INICIALIZAMOS EL LISTADO
            fnSp3CargaFiltroEstadoInicialAdmHallazgo()
            //initHallazgosAsignados() //cambiar funcion
        }
        else
        {
            alert("algun error....")
            //$("#subTituloErrorSp4HA").html(`Ocurrio Un Error!!!`)
            //$("#mensajeErrorSp4HA").html(`No Fue Posible Realizar La Modificación.`)
            //$('#modalSp4MsgErrorHA').modal('show').addClass('fade')

        }
    })//*/
}
//-------------------------------------------------------- END fnSp4ConfirmarEvaluarACR() ----------------------------------------------


//-------------------------------------------------------- START fnVerModalHistorialEvaluacionACR() ----------------------------------------------
function fnVerModalHistorialEvaluacionACR(Id)
{
    istHall = Id

    console.warn("objHallazgo[Id] ",objHallazgo[Id],objHallazgo[Id].dataHallazgo.Code_Hallazgo)
    console.warn("Historial ",objHallazgo[Id].dataHallazgo.AccionCorrectiva.EvaluarACR)

    // colocamos titulo a la modal
    $("#tituloModalEvaluacionesACR").html('Ver Historial de Evaluación - '+objHallazgo[Id].dataHallazgo.Code_Hallazgo)

    // listamos las evaluaciones
    let indice = 0
    $("#ListadoHistorialEvaluacionesACR").html('')
    objHallazgo[Id].dataHallazgo.AccionCorrectiva.EvaluarACR.forEach((Item) =>
    {
        console.log("Item."+Item);
        $("#ListadoHistorialEvaluacionesACR").append(
            '<div class="row mx-2 mt-2 row-table-modal align-items-center" style="height: 10vh;">'+
                '<div class="col-2">'+objHallazgo[Id].dataHallazgo.FechaEjecucion+'</div>'+
                '<div class="col-3 p-0">'+objHallazgo[Id].dataHallazgo.ResponsableName+'</div>'+
                '<div class="col-2">'+Item.FechaEvaluacion+'</div>'+
                '<div class="col-3">'+Item.EvaluadorName+'</div>'+
                '<div class="col-2" onmouseup="fnSp4VerDetalleEvaluacion('+Item.Id+','+indice+')"> <a href="#" style="text-decoration: underline !important;">Ver Observación</a> </div>'+
            '</div>'
        )
        indice++
    })

    // mostramos modal
    $('#modalEvaluacionesACR').modal('show').addClass('fade')

}
//-------------------------------------------------------- END fnVerModalHistorialEvaluacionACR() ----------------------------------------------


//-------------------------------------------------------- start fnSp4VerDetalleEvaluacion() ----------------------------------------------
var fnSp4VerDetalleEvaluacion = function(Id,indice)
{
    console.warn("objHallazgo[istHall] ",objHallazgo[istHall],objHallazgo[istHall].dataHallazgo.AccionCorrectiva.EvaluarACR)
    console.log(Id,indice)
    console.warn("objHallazgo[istHall].EvaluarACR ",objHallazgo[istHall],objHallazgo[istHall].dataHallazgo.AccionCorrectiva.EvaluarACR[indice])
    let evaluacion = []
    evaluacion = objHallazgo[istHall].dataHallazgo.AccionCorrectiva.EvaluarACR[indice]
    console.log("evaluacion",evaluacion)
    //let evaluacion = objHallazgo[istHall],objHallazgo[istHall].dataHallazgo.AccionCorrectiva.EvaluarACR[indice]
    // ocultamos modal
    $('#modalEvaluacionesACR').modal('hide').removeClass('fade');


    $("#idEvaluacion").val(evaluacion.Id)
    //fnSp4ValorEvaluarACR(evaluacion.StatusAccionCorrectivaId)
    $("#StatusACR").val(evaluacion.StatusAccionCorrectivaId)
    if(evaluacion.StatusAccionCorrectivaId==4){
        $("#aprobarACR").click()
    }else{
        $("#observarACR").click()
        $("#ObsercacionACRSp4").val(evaluacion.Observacion)
    }//*/

    //ocultamos el div de cerrarA y los botones
    $('#cerrarA').css('display','none')
    $("#aprobarACR").attr('disabled',true)
    $("#observarACR").attr('disabled',true)
    $("#ObsercacionACRSp4").attr('disabled',true)
    $('#btGuardarEvaluarACR').css('display','none')
    $('#btnFinalizarEvaluarACR').css('display','none')
    //mostramos el div de cerrarB
    $('#cerrarB').css('display','block')

    // mostramos modal
    $('#modalEvaluarACR').modal('show').addClass('fade')
}
//-------------------------------------------------------- END fnSp4VerDetalleEvaluacion() ----------------------------------------------


//-------------------------------------------------------- START fnSp4ModalEnviarHallazgoVencido() ----------------------------------------------
var fnSp4ModalEnviarHallazgoVencido = function(Id)
{
    istHall = Id

    // MOSTRAR MODAL CONFIRMAR ENVIO
    $('#modalConfirmarEnviarVencidoSp4').modal('show').addClass('fade')

    console.log("levantar modal de confirmacion ",objHallazgo[istHall].dataHallazgo.Id)

}
//-------------------------------------------------------- END fnSp4ModalEnviarHallazgoVencido() ----------------------------------------------


//-------------------------------------------------------- END fnSp4ConfirmarEnvioVencido() ----------------------------------------------
var fnSp4ConfirmarEnvioVencido = function()
{
    // OCULTAR MODAL CONFIRMAR GUARDAR EVALUACION
    $('#modalConfirmarEnviarVencidoSp4').modal('hide').removeClass('fade')

    var body =
    {
        "Id": objHallazgo[istHall].dataHallazgo.Id
    }
    //https://550m44ud1tmg7454-audit-dev.azurewebsites.net/api/Post-Hallazgos-All?code=CVNpmUeJgbarMkxynabne1CGLBm0gXH9mrEV6a2vuc2BvQgc4hDvbg==&httpmethod=EnviarHallazgoVencido
    var url     = apiurlAuditoria+"/api/Post-Hallazgos-All?code="+PostHallazgosAll+"&httpmethod=EnviarHallazgoVencido";
    var headers ={
       "apikey": constantes.apiKey,
       "Content-Type": "application/json",
    }

    console.log(url,body)
    $.ajax({
        method: 'POST',
        url:  url,
        headers:headers,
        data: JSON.stringify(body),
        crossDomain: true,
        dataType: "json",
    })
    .done(function (data) {
        console.log("data:",data)
        Id = data.Id
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
        alert("fail se ha producido un error...")
    })
    .always(function( jqXHR, textStatus, errorThrown ) {
        console.warn("always ya termino...")
        if(Id>0)
        {
            // MOSTRAR MODAL EXITO GUARDAR EVALUACION
            $('#modalExitoEnvioVencidoSp4').modal('show').addClass('fade')
            //INICIALIZAMOS EL LISTADO
            //fnSp3CargaFiltroEstadoInicialAdmHallazgo()
        }
        else
        {
            alert("algun error....")
            //$("#subTituloErrorSp4HA").html(`Ocurrio Un Error!!!`)
            //$("#mensajeErrorSp4HA").html(`No Fue Posible Realizar La Modificación.`)
            //$('#modalSp4MsgErrorHA').modal('show').addClass('fade')

        }
    })//*/
}
//-------------------------------------------------------- END fnSp4ConfirmarEnvioVencido() ----------------------------------------------

//-------------------------------------------------------- START fnSp4ExportarACR() ----------------------------------------------
var fnSp4ExportarACR = function()
{
    //doit('xlsx');


    let ACR = document.getElementById('data-table2');
    //ACR = ExcelACR

    console.warn("ACR -> ",ACR)

    // var ua = window.navigator.userAgent;
    // var msie = ua.indexOf("MSIE ");

    // if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
    // {
    //     txtArea1.document.open("txt/html","replace");
    //     txtArea1.document.write(excel);
    //     txtArea1.document.close();
    //     txtArea1.focus();
    //     sa=txtArea1.document.execCommand("SaveAs",true,"Say Thanks to Sumit.xls");
    // }
    // else                 //other browser not tested on IE 11
    // {
    //     var link = document.getElementById('ExcelACR');
    //     link.href='data:application/vnd.ms-excel;base64,' + window.btoa(ACR);
    //     link.download=`ACR-${objHallazgo[istHall].dataHallazgo.Code_Hallazgo}`;
    //     link.click();
    //     //sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(excel));
    // }

    let nombre  = `ACR-${objHallazgo[istHall].dataHallazgo.Code_Hallazgo}.xls`
    let uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
    , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }

    let table = document.getElementById("data-table2")
    let ctx = { worksheet: nombre|| 'Worksheet', table: table.innerHTML }

    let enlaceTmp = document.getElementById('ExcelACR');//document.createElement('a');
    enlaceTmp.href =  uri + base64(format(template, ctx));
    enlaceTmp.download = `ACR-${objHallazgo[istHall].dataHallazgo.Code_Hallazgo}.xls`
    enlaceTmp.click();
}
//-------------------------------------------------------- END fnSp4ExportarACR() ----------------------------------------------

//-------------------------------------------------------- END fnSp4PintarExcel() ----------------------------------------------
 function doit(type, fn, dl)
{
    var elt = document.getElementById('data-table2');
    var wb = XLSX.utils.table_to_book(elt, {sheet:`ACR - ${objHallazgo[istHall].dataHallazgo.Code_Hallazgo}`});

    return dl ?
        XLSX.write(wb, {bookType:type, bookSST:true, type: 'base64'}) :
        XLSX.writeFile(wb, fn || (`ACR-${objHallazgo[istHall].dataHallazgo.Code_Hallazgo}.` + (type || 'xlsx')));
}

function tableau(pid, iid, fmt, ofile)
{

            if(typeof Downloadify !== 'undefined') Downloadify.create(pid,{
            swf: 'downloadify.swf',
            downloadImage: 'download.png',
            width: 100,
            height: 30,
            filename: ofile, data: function() { return doit(fmt, ofile, true); },
            transparent: false,
            append: false,
            dataType: 'base64',
            onComplete: function(){ alert('Your File Has Been Saved!'); },
            onCancel: function(){ alert('You have cancelled the saving of this file.'); },
            onError: function(){ alert('You must put something in the File Contents or there will be nothing to save!'); }
    }); else document.getElementById(pid).innerHTML = "";


}

var fnSp4PintarExcel = function()
{
    //objAC = []
    //objAC = objHallazgo[istHall].dataHallazgo.AccionCorrectiva
    objAC = new classAccionCorretiva()
    objAC.cargarAccionCorrectiva(objHallazgo[istHall].dataHallazgo)

    console.warn("/****/ objAC -> ",objAC)

    console.warn("objHallazgo[istHall].dataHallazgo",objHallazgo[istHall].dataHallazgo)
    console.warn("objAC.HACeroPerdidasId",objAC.HACeroPerdidasId)


    ////vemos que cero perdida id tiene
    let cp1 =""
    let cp2 =""
    let cp3 =""
    let cp4 =""

    switch(objAC.HACeroPerdidasId)
    {
        case 1:
            cp1 = 'x'
        break;
        case 2:
            cp2 = 'x'
        break;
        case 3:
            cp3 = 'x'
        break;
        default:
            cp4 = objAC.CeroPerdidasDescription
        break;
    }

    // obtemos el nombre del area
    let areaName = ''
    objAreas.dataAreas.forEach(function(Item)
    {
        if(Item.Id = objAC.AreaId)
            areaName = Item.Description
    })

    let i = 0;
    let Integrantes = ''
    // Integrantes Analisis
    objAC.IntegrantesAnalisis.forEach(function(Item)
    {
        var a = JSON.parse(Item)
        Integrantes = (i==0) ? a.Name : Integrantes+`, ${a.Name}`
        i++
    })
    console.warn("Integrantes -> ",Integrantes)
    $("#container").html(``)
    // Comienzo la etiqueta table
    $("#container").append(`
        <table id="data-table2" border="1">
            <tbody id="tbodyE" border="1">

            <tr  >
                <td bgcolor="#34559c" style="text-align: center; color: white; font-size: 15px;"  t="s" colspan="10" id="data-table-A1" v="ACR - ${objHallazgo[istHall].dataHallazgo.Code_Hallazgo}"><span contenteditable="true">ACR - ${objHallazgo[istHall].dataHallazgo.Code_Hallazgo}</span></td>
            </tr>
            <tr>
                <td bgcolor="#34559c" style="text-align: center; color: white; font-size: 15px;" t="s" colspan="10" id="" v="AN&Aacute;LISIS CAUSA RA&Iacute;Z"><span contenteditable="true">AN&Aacute;LISIS CAUSA RA&Iacute;Z</span></td>
            </tr>
            <tr>
                <td bgcolor="#34559c" style="text-align: center; color: white; font-size: 15px;" t="s" colspan="10" id="" v="Informaci&oacute;n"><span contenteditable="true">Informaci&oacute;n</span></td>
            </tr>
            <tr>
                <td t="s" colspan="6" id="" v='Tema: ${objHallazgo[istHall].dataHallazgo.Hallazgo}'><span contenteditable="true">Tema: ${objHallazgo[istHall].dataHallazgo.Hallazgo}</span></td>
                <td t="s" colspan="4" id="" v="Cero P&eacute;rdidas"><span contenteditable="true">Cero P&eacute;rdidas</span></td>
            </tr>
            <tr>
                <td t="s" colspan="3" id="" v="Equipo/M&aacute;quina: "><span contenteditable="true">Equipo/M&aacute;quina:</span></td>
                <td t="s" colspan="3" id="" v="C&oacute;digo SAP Equipo/M&aacute;quina: "><span contenteditable="true">C&oacute;digo SAP Equipo/M&aacute;quina:</span></td>
                <td t="s" colspan="2" id="" v="1. Cero Defectos: ${cp1}"><span contenteditable="true">1. Cero Defectos: ${cp1}</span></td>
                <td t="s" colspan="2" id="" v="3. Cero Aver&iacute;as: ${cp3}"><span contenteditable="true">3. Cero Aver&iacute;as: ${cp3}</span></td>
            </tr>
            <tr>
                <td t="s" colspan="3" id="" v="---"><span contenteditable="true"></span></td>
                <td t="s" colspan="3" id="" v="---"><span contenteditable="true"></span></td>
                <td t="s" colspan="2" id="" v="2. Cero Accidentes: ${cp2}"><span contenteditable="true">2. Cero Accidentes: ${cp2}</span></td>
                <td t="s" colspan="2" id="" v="4. Otra Perdida: ${cp4}"><span contenteditable="true">4. Otra Perdida: ${cp4}</span></td>
            </tr>
            <tr>
                <td t="s" colspan="6" id="" v="Zona:"><span contenteditable="true">Zona:</span></td>
                <td t="s" colspan="2" id="" v="Nombre Persona que Repara"><span contenteditable="true">Nombre Persona que Repara</span></td>
                <td t="s" colspan="2" id="" v="&Aacute;rea"><span contenteditable="true">&Aacute;rea</span></td>
            </tr>
            <tr>
                <td t="s" colspan="6" id="" v="---"><span contenteditable="true">---</span></td>
                <td t="s" colspan="2" id="" v="---"><span contenteditable="true">---</span></td>
                <td t="s" colspan="2" id="" v="---"><span contenteditable="true">---</span></td>
            </tr>
            <tr>
                <td t="s" colspan="6" rowspan="2" id="" v="Integrantes An&aacute;lisis"><span contenteditable="true">Integrantes An&aacute;lisis:</span></td>
                <td t="s" colspan="1" id="" v="Inicio Aver&iacute;a"><span contenteditable="true">Inicio Aver&iacute;a</span></td>
                <td t="s" colspan="1" id="" v="Hora"><span contenteditable="true">Hora</span></td>
                <td t="s" colspan="1" id="" v="Fin Aver&iacute;a"><span contenteditable="true">Fin Aver&iacute;a</span></td>
                <td t="s" colspan="1" id="" v="Hora"><span contenteditable="true">Hora</span></td>
            </tr>
            <tr>
                <td t="s" colspan="1" id="" v="${objHallazgo[istHall].dataHallazgo.FechaRegistro}"><span contenteditable="true">2020-02-02</span></td>
                <td t="s" colspan="1" id="" v="${objHallazgo[istHall].dataHallazgo.Hora}"><span contenteditable="true">8:30</span></td>
                <td t="s" colspan="1" id="" v="---"><span contenteditable="true">2020-02-15</span></td>
                <td t="s" colspan="1" id="" v="---"><span contenteditable="true">15:30</span></td>
            </tr>
            <tr>
                <td t="s" colspan="6" rowspan="2" id="" v="Marcos Gonzalez, Tony Gonzalez y Andy Vasquez"><span contenteditable="true">${Integrantes}</span></td>
                <td t="s" colspan="2" id="}" v="Nombre Persona que Reporta"><span contenteditable="true">Nombre Persona que Reporta</span></td>
                <td t="s" colspan="2" id="" v="&Aacute;rea"><span contenteditable="true">&Aacute;rea</span></td>
            </tr>
            <tr>
                <td t="s" colspan="2" id="" v="${objHallazgo[istHall].dataHallazgo.ReportanteName}"><span contenteditable="true">Orly Vila</span></td>
                <td t="s" colspan="2" id="" v="${areaName}"><span contenteditable="true">${areaName}</span></td>
            </tr>
            <tr>
                <td t="s" colspan="6" id="" v="Fecha Inicio An&aacute;lisis"><span contenteditable="true">Fecha Inicio An&aacute;lisis</span></td>
                <td t="s" colspan="2" id="" v="N&uacute;mero de Aviso"><span contenteditable="true">N&uacute;mero de Aviso</span></td>
                <td t="s" colspan="2" id="" v="N&uacute;mero de Orden"><span contenteditable="true">N&uacute;mero de Orden</span></td>
            </tr>
            <tr>
                <td t="s" colspan="6" id="" v="${objHallazgo[istHall].dataHallazgo.AccionCorrectiva.FechaInicioAnalisis}"><span contenteditable="true">${objHallazgo[istHall].dataHallazgo.AccionCorrectiva.FechaInicioAnalisis}</span></td>
                <td t="s" colspan="2" id="" v="---"><span contenteditable="true">---</span></td>
                <td t="s" colspan="2" id="" v="---"><span contenteditable="true">---</span></td>
            </tr>
            <tr>
                <td bgcolor="#34559c" style="text-align:center; color: white; font-size: 15px;" t="s" colspan="10" id="" v="4W + 1H - Definición del Problema"><span contenteditable="true">4W + 1H - Definición del Problema</span></td>
            </tr>
            <tr>
                <td t="s" colspan="3" id="" v="¿Qu&eacute;?"><span contenteditable="true">¿Qué? ¿Qué hace evidente el problema? ¿En qué se manifiesta el inconveniente?</span></td>
                <td t="s" colspan="7" id="" v="${objAC.Que}"><span contenteditable="true">${objAC.Que}</span></td>
            </tr>
            <tr>
                <td t="s" colspan="3" id="" v="D&oacute;nde?"><span contenteditable="true">¿D&oacute;nde?</span></td>
                <td t="s" colspan="7" id="" v="${objAC.Donde}"><span contenteditable="true">${objAC.Donde}</span></td>
            </tr>
            <tr>
                <td t="s" colspan="3" id="" v="Cu&aacute;ndo?"><span contenteditable="true">¿Cu&aacute;ndo?</span></td>
                <td t="s" colspan="7" id="" v="${objAC.Cuando}"><span contenteditable="true">${objAC.Cuando}</span></td>
            </tr>
            <tr>
                <td t="s" colspan="3" id="" v="C&oacute;mo?"><span contenteditable="true">¿C&oacute;mo?</span></td>
                <td t="s" colspan="7" id="" v="${objAC.Como}"><span contenteditable="true">${objAC.Como}</span></td>
            </tr>
            <tr>
                <td t="s" colspan="3" id="" v="Cu&aacute;l?"><span contenteditable="true">¿Cu&aacute;l?</span></td>
                <td t="s" colspan="7" id="" v="${objAC.Cual}"><span contenteditable="true">${objAC.Cual}</span></td>
            </tr>
            <tr>
                <td t="s" colspan="10" id="" v="Descripción del problema: ${objAC.Problema}"><span contenteditable="true">Descripci&oacute;n del problema: ${objAC.Problema}</span></td>
            </tr>

            <tr>
                <td bgcolor="#34559c" style="text-align:center; color: white; font-size: 15px;" t="s" colspan="10" id="" v="An&aacute;lisis del Problema (5 Por qu&eacute;)"><span contenteditable="true">An&aacute;lisis del Problema (5 Por qu&eacute;)</span></td>
            </tr>
            <tr>
                <td t="s" colspan="2" id="" v="1er. PorQue"><span contenteditable="true"><b>1er. Por Qu&eacute;</b></span></td>
                <td t="s" colspan="2" id="" v="2do. PorQue"><span contenteditable="true"><b>2do. Por Qu&eacute;</b></span></td>
                <td t="s" colspan="2" id="" v="3er. PorQue"><span contenteditable="true"><b>3er. Por Qu&eacute;</b></span></td>
                <td t="s" colspan="2" id="" v="4to. PorQue"><span contenteditable="true"><b>4to. Por Qu&eacute;</b></span></td>
                <td t="s" colspan="2" id="" v="5to. PorQue"><span contenteditable="true"><b>5to. Por Qu&eacute;</b></span></td>
            </tr>

    `)

    //// agregar 5 porque
    //console.warn(objAC.AnalisisProblema.length)
    //console.warn("objAC.AnalisisProblema",objAC.AnalisisProblema)
    let rowspan = []
    let row1 = []
    let row2 = []
    let row3 = []
    let row4 = []
    let row5 = []
    // let i1 = 0
    // let i2 = 0
    // let i3 = 0
    // let i4 = 0
    // let i5 = 0
    let pq1 = []
    let pq2 = []
    let pq3 = []
    let pq4 = []
    let pq5 = []

    //console.warn("objAC.AnalisisProblema.length ",objAC.AnalisisProblema.length)
    for (var i1 = 0; i1 < objAC.AnalisisProblema.length; i1++)
    {
        fnAgregarPorQueEnTabla(1,i1,0,0,0,0)

        for (var i2 = 0; i2 < objAC.AnalisisProblema[i1].AnalisisProblema.length; i2++)
        {
            fnAgregarPorQueEnTabla(2,i1,i2,0,0,0)

            for (var i3 = 0; i3 < objAC.AnalisisProblema[i1].AnalisisProblema[i2].AnalisisProblema.length; i3++)
            {
                fnAgregarPorQueEnTabla(3,i1,i2,i3,0,0)

                for (var i4 = 0; i4 < objAC.AnalisisProblema[i1].AnalisisProblema[i2].AnalisisProblema[i3].AnalisisProblema.length; i4++)
                {
                    fnAgregarPorQueEnTabla(4,i1,i2,i3,i4,0)

                    for (var i5 = 0; i5 < objAC.AnalisisProblema[i1].AnalisisProblema[i2].AnalisisProblema[i3].AnalisisProblema[i4].AnalisisProblema.length; i5++)
                    {
                        fnAgregarPorQueEnTabla(5,i1,i2,i3,i4,i5)
                    }
                }
            }
        }
    }


    //// Agregar Causas
    fnAgregarCausasEnTabla(objAC)


    //// Agregar Acciones
    fnAgregarAccionesEnTabla(objAC)

    // $("#tbodyE").append(`
    //     <tr>
    //         <td t="s" colspan="10" id="" v="Plan de Acci&oacute;n"><span contenteditable="true">Plan de Acci&oacute;n</span></td>
    //     </tr>
    // `)

    // Finalizo la etiqueta table
    $("#container").append(`
            </tbody>
        </table>
    `)


    /* initial table */
    var aoa = [
        ["This",   "is",     "a",    "Test"],
        ["வணக்கம்", "สวัสดี", "你好", "가지마"],
        [1,        2,        3,      4],
        ["Click",  "to",     "edit", "cells"]
    ];
    var ws = XLSX.utils.aoa_to_sheet(aoa);
    var html_string = XLSX.utils.sheet_to_html(ws, { id: "data-table", editable: true });
    //document.getElementById("container2").innerHTML = html_string;//*/

    //doit('xlsx');


    tableau('biff8btn', 'xportbiff8', 'biff8', 'SheetJSTableExport.xls');
    tableau('odsbtn',   'xportods',   'ods',   'SheetJSTableExport.ods');
    tableau('fodsbtn',  'xportfods',  'fods',  'SheetJSTableExport.fods');
    tableau('xlmlbtn',  'xportxlml',  'xlml',  'SheetJSTableExport.xml');
    tableau('xlsbbtn',  'xportxlsb',  'xlsb',  'SheetJSTableExport.xlsb');
    tableau('xlsxbtn',  'xportxlsx',  'xlsx',  'SheetJSTableExport.xlsx');

    var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-36810333-1']);
      _gaq.push(['_setDomainName', 'sheetjs.com']);
      _gaq.push(['_setAllowLinker', true]);
      _gaq.push(['_trackPageview']);

      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();
}
//-------------------------------------------------------- END fnSp4PintarExcel() ----------------------------------------------
var rs1 = 0
var rs2 = 0
var rs3 = 0
var rs4 = 0
var rs5 = 0

/**
 * [fnAgregarPorQueEnTabla description]
 * @param  {[int]} indice [porque a agregar ]
 * @param  {[int]} i1     [posicion en el array del 1er porque]
 * @param  {[int]} i2     [posicion en el array del 2do porque]
 * @param  {[int]} i3     [posicion en el array del 3er porque]
 * @param  {[int]} i4     [posicion en el array del 4to porque]
 * @param  {[int]} i5     [posicion en el array del 5to porque]
 * @return {[type]}        [description]
 */
var fnAgregarPorQueEnTabla = function(indice, i1, i2, i3, i4, i5)
{
    let a1 = 0
    let a2 = 0
    let a3 = 0
    let a4 = 0
    let a5 = 0
    console.warn("indice, i1, i2, i3, i4, i5 -> ",indice, i1, i2, i3, i4, i5)
    switch(indice)
    {
        // AGREGRAR UN 1ER PORQUE.
        case 1:
            $("#tbodyE").append(`
                <tr><td style="vertical-align: middle;" rowspan="1" colspan="2" nivel="1" id="1pq_${i1}" t="s" v="${objAC.AnalisisProblema[i1].Pregunta} ${objAC.AnalisisProblema[i1].Respuesta}">
                    <b>${objAC.AnalisisProblema[i1].Pregunta}</b> - ${objAC.AnalisisProblema[i1].Respuesta}
                </td></tr>
            `)

            break;

        // AGREGRAR UN 2DO PORQUE.
        case 2:
            // console.log("case 2 - 2pq_"+i1+i2)
            // obtenemos el valor del rowspan de los antecesores
            a1 = parseInt($(`#1pq_${i1}`).attr("rowspan"))

            // agregamos la fila con el 2do porque
            $("#tbodyE").append(`
                <tr><td style="vertical-align: middle;" rowspan="1" colspan="2" nivel="2" id="2pq_${i1}${i2}" t="s" v="${objAC.AnalisisProblema[i1].AnalisisProblema[i2].Pregunta} ${objAC.AnalisisProblema[i1].AnalisisProblema[i2].Respuesta}">
                    <b>${objAC.AnalisisProblema[i1].AnalisisProblema[i2].Pregunta}</b> - ${objAC.AnalisisProblema[i1].AnalisisProblema[i2].Respuesta}
                </td></tr>
            `)

            // modificamoes el rowspan de los antecesores
            document.getElementById(`1pq_${i1}`).rowSpan = a1+1;

            break;

        // AGREGRAR UN 3ER PORQUE.
        case 3:
            // console.log("case 3 - 3pq_"+i1+i2+i3)
            // obtenemos el valor del rowspan de los antecesores
            a1 = parseInt($(`#1pq_${i1}`).attr("rowspan"))
            a2 = parseInt($(`#2pq_${i1}${i2}`).attr("rowspan"))

            // agregamos la fila con el 3er porque
            $("#tbodyE").append(`
                <tr><td style="vertical-align: middle;" rowspan="1" colspan="2" nivel="3" id="3pq_${i1}${i2}${i3}" t="s" v="${objAC.AnalisisProblema[i1].AnalisisProblema[i2].AnalisisProblema[i3].Pregunta} ${objAC.AnalisisProblema[i1].AnalisisProblema[i2].AnalisisProblema[i3].Respuesta}">
                    <b>${objAC.AnalisisProblema[i1].AnalisisProblema[i2].AnalisisProblema[i3].Pregunta}</b> - ${objAC.AnalisisProblema[i1].AnalisisProblema[i2].AnalisisProblema[i3].Respuesta}
                </td></tr>
            `)

            // modificamoes el rowspan de los antecesores
            document.getElementById(`1pq_${i1}`).rowSpan      = a1+1;
            document.getElementById(`2pq_${i1}${i2}`).rowSpan = a2+1;

            break;

        // AGREGRAR UN 4TO PORQUE.
        case 4:
            // console.log("case 4 - 4pq_"+i1+i2+i3+i4)
            // obtenemos el valor del rowspan de los antecesores
            a1 = parseInt($(`#1pq_${i1}`).attr("rowspan"))
            a2 = parseInt($(`#2pq_${i1}${i2}`).attr("rowspan"))
            a3 = parseInt($(`#3pq_${i1}${i2}${i3}`).attr("rowspan"))

            // agregamos la fila con el 4to porque
            $("#tbodyE").append(`
                <tr><td style="vertical-align: middle;" rowspan="1" colspan="2" nivel="4" id="4pq_${i1}${i2}${i3}${i4}" t="s" v="${objAC.AnalisisProblema[i1].AnalisisProblema[i2].AnalisisProblema[i3].AnalisisProblema[i4].Pregunta} ${objAC.AnalisisProblema[i1].AnalisisProblema[i2].AnalisisProblema[i3].AnalisisProblema[i4].Respuesta}">
                    <b>${objAC.AnalisisProblema[i1].AnalisisProblema[i2].AnalisisProblema[i3].AnalisisProblema[i4].Pregunta}</b> - ${objAC.AnalisisProblema[i1].AnalisisProblema[i2].AnalisisProblema[i3].AnalisisProblema[i4].Respuesta}
                </td></tr>
            `)

            // modificamoes el rowspan de los antecesores
            document.getElementById(`1pq_${i1}`).rowSpan           = a1+1;
            document.getElementById(`2pq_${i1}${i2}`).rowSpan      = a2+1;
            document.getElementById(`3pq_${i1}${i2}${i3}`).rowSpan = a3+1;

            break;

        // AGREGRAR UN 5TO PORQUE.
        case 5:
            // console.log("case 5 - 5pq_"+i1+i2+i3+i4+i5)
            // obtenemos el valor del rowspan de los antecesores
            a1 = parseInt($(`#1pq_${i1}`).attr("rowspan"))
            a2 = parseInt($(`#2pq_${i1}${i2}`).attr("rowspan"))
            a3 = parseInt($(`#3pq_${i1}${i2}${i3}`).attr("rowspan"))
            a4 = parseInt($(`#4pq_${i1}${i2}${i3}${i4}`).attr("rowspan"))

            // agregamos la fila con el 3er porque
            $("#tbodyE").append(`
                <tr><td style="vertical-align: middle;" rowspan="1" colspan="2" nivel="5" id="5pq_${i1}${i2}${i3}${i4}${i5}" t="s" v="${objAC.AnalisisProblema[i1].AnalisisProblema[i2].AnalisisProblema[i3].AnalisisProblema[i4].AnalisisProblema[i5].Pregunta} ${objAC.AnalisisProblema[i1].AnalisisProblema[i2].AnalisisProblema[i3].AnalisisProblema[i4].AnalisisProblema[i5].Respuesta}">
                    <b>${objAC.AnalisisProblema[i1].AnalisisProblema[i2].AnalisisProblema[i3].AnalisisProblema[i4].AnalisisProblema[i5].Pregunta}</b> - ${objAC.AnalisisProblema[i1].AnalisisProblema[i2].AnalisisProblema[i3].AnalisisProblema[i4].AnalisisProblema[i5].Respuesta}
                </td></tr>
            `)

            // modificamoes el rowspan de los antecesores
            document.getElementById(`1pq_${i1}`).rowSpan                = a1+1;
            document.getElementById(`2pq_${i1}${i2}`).rowSpan           = a2+1;
            document.getElementById(`3pq_${i1}${i2}${i3}`).rowSpan      = a3+1;
            document.getElementById(`4pq_${i1}${i2}${i3}${i4}`).rowSpan = a4+1;

            break;
    }
}

/**
 * [fnAgregarCausasEnTabla añadimos las 5 medidas cero fallas para las causas a la tabla html]
 * @param  {[object]} obj [objeto con los datos de la Accion Correctiva]
 * @return {[type]}     [description]
 */
var fnAgregarCausasEnTabla = function(obj)
{
    // console.warn("en fnAgregarCausasEnTabla: obj -> ",obj)
    // console.warn("en fnAgregarCausasEnTabla: objHallazgo[istHall].dataHallazgo.AccionCorrectiva.AnalisisProblema -> ",objHallazgo[istHall].dataHallazgo.AccionCorrectiva.AnalisisProblema)

    //variables a usar
    let causa = "", opc1 = "-", opc2 = "-", opc3 = "-", opc4 = "-", opc5 = "-", agregarFila = false

    // agregamos la fila de los titulos
    // <tr><td t="s" colspan="10" v="---- SEPARACIÓN ----"> ---- SEPARACIÓN ---- </td></tr>
    $("#tbodyE").append(`
        <tr>
            <td bgcolor="#34559c" style="text-align:center; color: white; font-size: 15px; vertical-align: middle;" t="s" colspan="5" rowspan="2" id="" v="Causas"><span contenteditable="true">Causas</span></td>
            <td bgcolor="#34559c" style="text-align:center; color: white; font-size: 15px;" t="s" colspan="5" id="" v="5 Medidas para cero fallas"><span contenteditable="true">5 Medidas para cero fallas</span></td>
        </tr>
        <tr>
            <td bgcolor="#34559c" style="text-align:center; color: white; font-size: 15px;" t="s" colspan="1" id="" v="Establecer Condiciones B&aacute;sicas"><span contenteditable="true">Establecer Condiciones B&aacute;sicas</span></td>
            <td bgcolor="#34559c" style="text-align:center; color: white; font-size: 15px;" t="s" colspan="1" id="" v="Restauraci&oacute;n de Deterioro"><span contenteditable="true">Restauraci&oacute;n de Deterioro</span></td>
            <td bgcolor="#34559c" style="text-align:center; color: white; font-size: 15px;" t="s" colspan="1" id="" v="Operaci&oacute;n Correcta"><span contenteditable="true">Operaci&oacute;n Correcta</span></td>
            <td bgcolor="#34559c" style="text-align:center; color: white; font-size: 15px;" t="s" colspan="1" id="" v="Mejora Puntos de Dise&ntilde;o"><span contenteditable="true">Mejora Puntos de Dise&ntilde;o</span></td>
            <td bgcolor="#34559c" style="text-align:center; color: white; font-size: 15px;" t="s" colspan="1" id="" v="Entrenamiento"><span contenteditable="true">Entrenamiento</span></td>
        </tr>
    `)

    // obtenemos la causa
    //console.warn("objHallazgo[istHall].dataHallazgo.AccionCorrectiva.AnalisisProblema -> ",objHallazgo[istHall].dataHallazgo.AccionCorrectiva.AnalisisProblema)
    if(objHallazgo[istHall].dataHallazgo.AccionCorrectiva.AnalisisProblema != null)
    {
        objHallazgo[istHall].dataHallazgo.AccionCorrectiva.AnalisisProblema.forEach(function(item)
        {
            // no pintaremos la fila
            causa = item.Respuesta
            // recorremos las causas guardadas
            obj.AnalisisMedidasCeroFallas.forEach(function(item2)
            {
                if(item.Id === item2.HAAnalisisProblemasId )
                {
                    // pintaremos la fila
                    agregarFila = true
                    // marcamos las medidas cero fallas
                    switch(item2.HAMedidasCeroFallasId)
                    {
                        case 1:
                            opc1 = "X"
                        break;
                        case 2:
                            opc2 = "X"
                        break;
                        case 3:
                            opc3 = "X"
                        break;
                        case 4:
                            opc4 = "X"
                        break;
                        case 5:
                            opc5 = "X"
                        break;
                    }
                    // console.info("causa ",causa)
                    // console.info("item.Id ",item.Id, " item2.HAAnalisisProblemasId ",item2.HAAnalisisProblemasId )
                }
            })

            if(agregarFila)
            {
                // console.info("opc -> ",opc1,opc2,opc3,opc4,opc5)

                // agregamos las medidas cero fallas registradas
                $("#tbodyE").append(`
                    <tr>
                        <td style="text-align: left;" t="s" colspan="5" id="" v="${causa}"><span contenteditable="true">${causa}</span></td>
                        <td style="text-align: center;" t="s" colspan="1" id="" v="${opc1}"><span contenteditable="true">${opc1}</span></td>
                        <td style="text-align: center;" t="s" colspan="1" id="" v="${opc2}"><span contenteditable="true">${opc2}</span></td>
                        <td style="text-align: center;" t="s" colspan="1" id="" v="${opc3}"><span contenteditable="true">${opc3}</span></td>
                        <td style="text-align: center;" t="s" colspan="1" id="" v="${opc4}"><span contenteditable="true">${opc4}</span></td>
                        <td style="text-align: center;" t="s" colspan="1" id="" v="${opc5}"><span contenteditable="true">${opc5}</span></td>
                    </tr>
                `)
            }

            // reinicializamos las variables para el nuevo ciclo
            causa = "", opc1 = "-", opc2 = "-", opc3 = "-", opc4 = "-", opc5 = "-", agregarFila = false

        })
    }
}


var fnAgregarAccionesEnTabla = function(obj)
{
    // console.warn("en fnAgregarCausasEnTabla: obj -> ",obj)
    // console.warn("en fnAgregarCausasEnTabla: objHallazgo[istHall].dataHallazgo -> ",objHallazgo[istHall].dataHallazgo)

    // contador de causas
    let count       = 1
    let plazoAccion = "", tipoAccion = "", statusAccion = ""

    $("#tbodyE").append(`
        <tr>
            <td bgcolor="#34559c" style="text-align:center; color: white; font-size: 15px;" t="s" colspan="10" id="" v="Plan de Acci&oacute;n"><span contenteditable="true">Plan de Acci&oacute;n</span></td>
        </tr>
        <tr>
            <td style="text-align: center;" t="s" colspan="1" id="" v="# de Causas"><span contenteditable="true"><b># de Causas</b></span></td>
            <td style="text-align: center;" t="s" colspan="4" id="" v="Acci&oacute;n"><span contenteditable="true"><b>Acci&oacute;n</b></span></td>
            <td style="text-align: center;" t="s" colspan="1" id="" v="Plazo Acci&oacute;n"><span contenteditable="true"><b>Plazo Acci&oacute;n<b></span></td>
            <td style="text-align: center;" t="s" colspan="1" id="" v="Tipo de Acci&oacute;n"><span contenteditable="true"><b>Tipo de Acci&oacute;n<b></span></td>
            <td style="text-align: center;" t="s" colspan="1" id="" v="Responsable"><span contenteditable="true"><b>Responsable<b></span></td>
            <td style="text-align: center;" t="s" colspan="1" id="" v="Fecha"><span contenteditable="true"><b>Fecha<b></span></td>
            <td style="text-align: center;" t="s" colspan="1" id="" v="Estado Acci&oacute;n"><span contenteditable="true"><b>Estado Acci&oacute;n<b></span></td>
        </tr>
    `)

    obj.PlanAccion.forEach(function(item)
    {
        // console.info("item ",item)
        // definir texto para el plazo de la accion
        if(item.HAPlazoAccionId==1) plazoAccion = "Corto"
        if(item.HAPlazoAccionId==2) plazoAccion = "Mediano"
        if(item.HAPlazoAccionId==3) plazoAccion = "Largo"
        // definir texto para el tipo de accion
        if(item.HATipoAccionId==1) tipoAccion = "Correcci&oacute;n"
        if(item.HATipoAccionId==2) tipoAccion = "Correctiva"
        if(item.HATipoAccionId==3) tipoAccion = "Preventiva"
        if(item.HATipoAccionId==4) tipoAccion = "Mejoramiento"
        // definir texto para el tipo de accion
        if(item.HAStatusAccionId==1) statusAccion = ""
        if(item.HAStatusAccionId==2) statusAccion = "Pendiente"
        if(item.HAStatusAccionId==3) statusAccion = "Finalizado"
        if(item.HAStatusAccionId==4) statusAccion = "Traspasado"
        if(item.HAStatusAccionId==5) statusAccion = "No Viable"
        if(item.HAStatusAccionId==6) statusAccion = "En Ejecuci&oacute;n"
        if(item.HAStatusAccionId==7) statusAccion = "En Evaluaci&oacute;n"
        if(item.HAStatusAccionId==8) statusAccion = "Observado"

        $("#tbodyE").append(`
            <tr>
                <td style="text-align: left;" t="s" colspan="1" id="" v="${count}"><span contenteditable="true">${count}</span></td>
                <td t="s" colspan="4" id="" v="${item.Accion}"><span contenteditable="true">${item.Accion}</span></td>
                <td t="s" colspan="1" id="" v="${plazoAccion}"><span contenteditable="true">${plazoAccion}</span></td>
                <td t="s" colspan="1" id="" v="${tipoAccion}"><span contenteditable="true">${tipoAccion}</span></td>
                <td t="s" colspan="1" id="" v="${toCapitalize(item.Responsable)}"><span contenteditable="true">${toCapitalize(item.Responsable)}</span></td>
                <td t="s" colspan="1" id="" v="${item.Fecha}"><span contenteditable="true">${item.Fecha}</span></td>
                <td t="s" colspan="1" id="" v="${statusAccion}"><span contenteditable="true">${statusAccion}</span></td>
            </tr>
        `)

        // aumentamos el contador de las acciones
        count++
        // inicializamos las variables para el próximo ciclo
        plazoAccion = "", tipoAccion = "", statusAccion = ""
    })
}

////////// EJEMPLO SHEETJS exportar table

//*********************************************-----------------------------  SPRINT 4 IV  -----------------------------********************************************** */
/**
 * [downloadExcelHallazgos DESCARGAR LISTADO DE HALLAZGOS EN EXCEL]
 * @return {[type]} [description]
 */
let downloadExcelHallazgos = function()
{

    // console.table("objHallazgo -> ",objHallazgo)
    // console.table("objHallazgoAsignado -> ",objHallazgoAsignado)
    arrayHallazgos = objHallazgoAsignado.reverse()
    // console.table("arrayHallazgos -> ",arrayHallazgos)


    let excel = `
        <table border="1" style="color: #000;">
            <thead>
                <tr>
                    <th bgcolor="#B2B2B2">ID HALLAZGO</th>
                    <th bgcolor="#B2B2B2">FUENTE</th>
                    <th bgcolor="#B2B2B2">TIPO HALLAZGO</th>
                    <th bgcolor="#B2B2B2">NORMA</th>
                    <th bgcolor="#B2B2B2">SEDE</th>
                    <th bgcolor="#B2B2B2">RESPONSABLE</th>
                    <th bgcolor="#B2B2B2">REPORTANTE</th>
                    <th bgcolor="#B2B2B2">FECHA EJECUCIÓN</th>
                    <th bgcolor="#B2B2B2">FECHA REGISTRO</th>
                    <th bgcolor="#B2B2B2">ESTADO</th>
                    <th bgcolor="#B2B2B2">ESTADO ACR</th>
                </tr>
            <thead>
            <tbody id="ListadoDeAuditorias">

    `

    arrayHallazgos.forEach(function(Item)
    {
        // console.warn("Item.dataHallazgo.Code_Hallazgo -> ",Item.dataHallazgo.Code_Hallazgo)
        excel += `
            <tr bgcolor="#fff">
                <td text-aling="center">${Item.dataHallazgo.Code_Hallazgo}</td>
                <td text-aling="center">${Item.dataHallazgo.Fuente}</td>
                <td text-aling="center">${Item.dataHallazgo.TipoHallazgo}</td>
                <td text-aling="center">${Item.dataHallazgo.Norma}</td>
                <td text-aling="center">${Item.dataHallazgo.Sede}</td>
                <td text-aling="center">${Item.dataHallazgo.ResponsableName}</td>
                <td text-aling="center">${Item.dataHallazgo.ReportanteName}</td>
                <td text-aling="center">${Item.dataHallazgo.FechaEjecucion}</td>
                <td text-aling="center">${Item.dataHallazgo.FechaRegistro}</td>
                <td text-aling="center">${Item.dataHallazgo.StatusHallazgo}</td>
                <td text-aling="center">${Item.dataHallazgo.StatusAccionCorrectiva}</td>
            </tr>
        `
    });

    excel += `</tbody></table>`

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
        var link = document.getElementById('ExcelHallazgos');
        link.href='data:application/vnd.ms-excel;base64,' + window.btoa(excel);
        link.download='Listado De Hallazgos';
        link.click();
        //sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(excel));
    }
}