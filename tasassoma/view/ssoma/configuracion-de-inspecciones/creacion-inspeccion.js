let QuiestionListArray = [];

function QuiestionList ( description, Id_question ){
    this.description = description;
    this.flag_confirm = '0';
    this.type_object_id = '1';
    this.questionitem_list = [];
    this.Id_question = Id_question
}

function Quiestionitem_List(description,type_object_id,rpta_multiple = 0,selection_type = 1){
    this.description = description;
    this.flag_active = 1;
    this.flag_delete = 1;
    this.flag_answer = 0;
    this.flag_evidency = 0;
    this.flag_temperature = 0;
    this.order_in_form = 0;
    this.type_object_id = type_object_id ;
    this.rpta_multiple = rpta_multiple;
    this.text = '';
    this.itemoption_list = [];
    this.selection_type = selection_type;
}

function itemoption_list(title,description,cantidad){
    this.title = title;
    this.description = description
    this.cantidad = cantidad
}
let cantidadQuiestionList = 0
function InitCreacionInspeccion(){
    cantidadQuiestionList = cantidadQuiestionList + 1
    QuiestionListArray = []
    preguntayrespuesta2 = 1
    let Id_question = `pregunta${cantidadQuiestionList}`
    QuiestionListArray.push(new QuiestionList('',Id_question));
    addQuestionHtml();
}

function addQuestionHtml(){
    let cantidad ;
    let item ;
    let primero=1;
    item = QuiestionListArray.length ;
    if(QuiestionListArray.length <= 9){
        cantidad = '0'+(QuiestionListArray.length)
    }
    else if(QuiestionListArray.length > 9){
        cantidad = (QuiestionListArray.length)
    }

    let cantidad2 = preguntaRespuestaCantidad + 1
    console.log(cantidad2)

    $('#lista-preguntas').append(`<div class="card mt-3 card-pregunta" onclick="activePregunta('pregunta${cantidadQuiestionList}')" id="pregunta${cantidadQuiestionList}">
                <div class="card-body p-0">
                    <div class="row m-0">
                        <div class="col-md-1 numeral-pregunta">
                            ${cantidad}
                        </div>
                        <div class="col-md-11 ">
                            <div class="px-5 py-4">
                                <input type="text" class="form-control title-pregunta" placeholder="Escribe una pregunta" id="titlePregunta${cantidadQuiestionList}" onkeyup="insedrtTitle(${cantidadQuiestionList})">
                            </div>
                            <div class="d-flex px-5 border-bottom ">
                                    <div class="d-flex mb-4 hidden" id="sino${cantidadQuiestionList}">
                                        <div class="content-sino mr-4">
                                            <div class="checklist"></div>
                                            <span class="mx-2 font-weight-bold">Si</span>
                                            <label class="btn-checklist m-0" id="btnchecksi${item}" onclick="activeSNexpand('si',${item})">
                                                <span class="icon-circule mr-1"></span>
                                                <span class="icon-circule mr-1"></span>
                                                <span class="icon-circule"></span>
                                            </label>
                                        </div>
                                        <div class="content-sino mr-4">
                                            <div class="checklist"></div>
                                            <span class="mx-2 font-weight-bold">No</span>
                                            <label class="btn-checklist m-0" id="btncheckno${item}" onclick="activeSNexpand('no',${item})">
                                                <span class="icon-circule mr-1"></span>
                                                <span class="icon-circule mr-1"></span>
                                                <span class="icon-circule"></span>
                                            </label>
                                        </div>
                                        <div class="content-sino mr-4">
                                            <div class="checklist"></div>
                                            <span class="mx-2 font-weight-bold">N.A.</span>
                                            <label class="btn-checklist m-0" id="btncheckna${item}" onclick="activeSNexpand('na',${item})">
                                                <span class="icon-circule mr-1"></span>
                                                <span class="icon-circule mr-1"></span>
                                                <span class="icon-circule"></span>
                                            </label>
                                        </div>
                                    </div>
                                   <div class="d-flex mb-4 ">
                                       <div class="content-sino mr-4 hidden" id="temperaturaCotent${cantidadQuiestionList}">
                                           <img src="./images/newsistema/iconos/atmospheric3.svg" alt="" class="icon-question">
                                           <span class="ml-3">Temperatura</span>
                                       </div>
                                       <div class="content-sino mr-4 hidden" id="ampliacionrespuesta${cantidadQuiestionList}">
                                           <img src="./images/newsistema/iconos/pen.svg" alt="" class="icon-question">
                                           <span class="ml-3">Ampliar respuesta</span>
                                       </div>
                                   </div>
                                    <div class="d-flex mb-4 hidden" id="listaEvidencias${cantidadQuiestionList}">
                                        <div class="d-flex">
                                            <div class="content-camara mr-3">
                                                <button class="btn-round-green btn mr-4 mb-3 flex align-items-center justify-content-center">
                                                    <img src="./images/newsistema/iconos/photo-camera-FFF.svg" alt="">
                                                    <strong class="mx-2">Evidencia</strong></button>
                                                <input type="text" class="input-app-circular" onkeyup="escribirCotnenidoEvidencia(${cantidadQuiestionList},1)" id="textEvidencia${cantidadQuiestionList}-1" placeholder="Escribir..."  style="width: 180px;">
                                            </div>
                                            <div style="cursor:pointer;" class="d-flex align-items-center" onclick="addEvidencia(${cantidadQuiestionList})">
                                                <img src="./images/newsistema/iconos/adicionar.svg" alt="">
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <div class="row m-0 px-5 border-bottom ">
                                <div class="col-md-5 py-4 hidden d-flex flex-wrap align-items-center" id="RptMultiple${cantidadQuiestionList}">
                                    <div class="d-flex align-items-center my-2">
                                        <i class="fas fa-code-branch icon-multiple" aria-hidden="true"></i>
                                        <div class="position-relative "  >
                                            <strong class="ml-3 mr-3" style="cursor:pointer;" onclick="selectOption(${cantidadQuiestionList},'selecr-rpt${cantidadQuiestionList}')"><span id="name-selec-rpt${cantidadQuiestionList}">Rpt. Múltiple</span> <i class="fas fa-angle-down"></i>  </strong>
                                            <ul class="select-Ul" id="selecr-rpt${cantidadQuiestionList}">
                                                <li class="active_li list${cantidadQuiestionList}" onclick="activeOption(${cantidadQuiestionList},'opcion1-rpt${cantidadQuiestionList}','name-selec-rpt${cantidadQuiestionList}')" id="opcion1-rpt${cantidadQuiestionList}">Rpt. Múltiple</li>
                                                <li class="list${cantidadQuiestionList}" onclick="activeOption(${cantidadQuiestionList},'opcion2-rpt${cantidadQuiestionList}','name-selec-rpt${cantidadQuiestionList}')" id="opcion2-rpt${cantidadQuiestionList}">Rpt. Única 2</li>
                                            </ul>
                                        </div>
                                        <div class="respuestas-content d-flex flex-wrap align-items-center" id="respuestas-content1">
                                            <div class="d-flex mr-4 align-items-center">
                                                <div class="respuest input-btn mr-3" contenteditable="" id="rptm${cantidadQuiestionList}-1" onkeyup="escribirCotnenidoRptaMultiple(${cantidadQuiestionList},1)"></div>
                                                <div class="addrptmultiple" onclick="addRptMultiple(${cantidadQuiestionList})"><img src="./images/newsistema/iconos/adicionar.svg" alt=""> </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-7 d-flex align-items-center hidden py-4" id="criticidadContent${cantidadQuiestionList}">
                                    <div class="d-flex flex-wrap align-items-center">
                                        <img src="./images/newsistema/iconos/informacion2.svg" alt=""style="width: 26px">
                                        <div class="position-relative">
                                            <strong class="ml-3 mr-3" style="width: 80px; cursor:pointer;"  onclick="selectOption(${cantidadQuiestionList},'select-criticidad${cantidadQuiestionList}')"><span id="name-select-criticidad">Criticidad 1 </span> <i class="fas fa-angle-down"></i></strong>
                                            <ul class="select-Ul" id="select-criticidad${cantidadQuiestionList}">
                                                <li class="active_li listCriticidad${cantidadQuiestionList}" onclick="activeOptionCriticidad(${cantidadQuiestionList},'opcion1-criti${cantidadQuiestionList}','name-select-criticidad',1)" id="opcion1-criti${cantidadQuiestionList}">Criticidad 1</li>
                                                <li class="listCriticidad${cantidadQuiestionList}" onclick="activeOptionCriticidad(${cantidadQuiestionList},'opcion2-criti${cantidadQuiestionList}','name-select-criticidad',2)" id="opcion2-criti${cantidadQuiestionList}">Criticidad Cálculo 2</li>
                                            </ul>
                                        </div>
                                        <div class="respuestas-content d-flex flex-wrap " id="respuestas-criticidad${cantidadQuiestionList}" style="width: calc(100% - 138px)">
                                            <div class="d-flex mr-2 align-items-center my-2" style="width: 150px;">
                                                <div class="checklist mr-2"></div>
                                                <input type="text" class="input-app-circular" id="inputCriticidad${cantidadQuiestionList}-1" style="width: 100px" onkeyup="contenidoCriticidad(${cantidadQuiestionList},1)">
                                            </div>
                                            <div class="d-flex mr-2 align-items-center my-2" style="width: 150px;">
                                                <div class="checklist mr-2"></div>
                                                <input type="text" class="input-app-circular" id="inputCriticidad${cantidadQuiestionList}-2" style="width: 100px" onkeyup="contenidoCriticidad(${cantidadQuiestionList},2)">
                                            </div>
                                            <div class="d-flex mr-2 align-items-center my-2" style="width: 150px;">
                                                <div class="checklist mr-2"></div>
                                                <input type="text" class="input-app-circular" id="inputCriticidad${cantidadQuiestionList}-3" style="width: 100px" onkeyup="contenidoCriticidad(${cantidadQuiestionList},3)">
                                            </div>
                                        </div>
                                        <div class="respuestas-content d-flex flex-wrap hidden w-100" id="respuestas-criticidad-type2-${cantidadQuiestionList}" style="width: calc(100% - 138px)">
                                            <div class="d-flex mr-2 align-items-center my-2" >
                                                <input type="text" class="input-app-circular mr-2" placeholder="Escribir...." id="inputCriticidad2${cantidadQuiestionList}-1" style="width: 280px" onkeyup="contenidoCriticidad(${cantidadQuiestionList},1,2)">
                                                <div class="cuadrado"></div>
                                                <input type="text" class="subpregunta mr-2 input-app-circular" placeholder="Escribir...." id="subpreguntaCriticidad2${cantidadQuiestionList}-1-1" style="width: 150px" onkeyup="subpreguntaCriticidad2(${cantidadQuiestionList},1,1)">
                                                <div class="cuadrado"></div>
                                                <input type="text" class="subpregunta mr-2 input-app-circular" placeholder="Escribir...." id="subpreguntaCriticidad2${cantidadQuiestionList}-1-2" style="width: 150px" onkeyup="subpreguntaCriticidad2(${cantidadQuiestionList},1,2)">
                                                <div class="cuadrado"></div>
                                                <input type="text" class="subpregunta mr-2 input-app-circular" placeholder="Escribir...." id="subpreguntaCriticidad2${cantidadQuiestionList}-1-3" style="width: 150px" onkeyup="subpreguntaCriticidad2(${cantidadQuiestionList},1,3)">
                                                <div class="addrptmultiple" onclick="addRptMultipleCriticidad(${cantidadQuiestionList})"><img src="./images/newsistema/iconos/adicionar.svg" alt=""> </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="row m-0 px-5">
                                <div class="col-md-5 hidden" id="adjuntarimagencontent${cantidadQuiestionList}">
                                    <div class="d-flex align-items-center py-4">
                                        <img src="./images/newsistema/iconos/subida.svg" alt="">
                                        <strong class="ml-3 mr-3">Imagen adjuntada</strong>
                                        <div class="respuestas-content d-flex flex-wrap" id="listaImagenAdjunta${cantidadQuiestionList}">
                                            <div class="d-flex mr-2" id="content_file_img_adjuntar${cantidadQuiestionList}-1">
                                                <input type="file" class="d-none" id="adjuntar${cantidadQuiestionList}-1" onchange="adjuntarImage(${cantidadQuiestionList},1)">
                                                <label for="adjuntar${cantidadQuiestionList}-1" class="btn btn-success btn-raised btn-round-green mr-3" id="text-imagen${item}-1">Adjuntar</label>
                                                <div class="addrptmultiple" onclick="addAdjuntarImagen(${cantidadQuiestionList})"><img src="./images/newsistema/iconos/adicionar.svg" alt=""> </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-7 hidden" id="preguntasRespuestasContent${cantidadQuiestionList}">
                                    <div class="d-flex align-items-center py-4 flex-wrap">
                                        <div class="position-relative" onclick="selectOption(1,'preguntas-respuestas-${cantidadQuiestionList}')">
                                            <img src="./images/newsistema/iconos/pregunta1.svg" alt=""  style="width: 26px;">
                                            <strong class="ml-3 mr-3" style="width: 150px;"> <span  id="listpregunrespname">Preguntas y respuestas 1 </span><i class="fas ml-1 fa-angle-down"></i></strong>
                                            <ul class="select-Ul" id="preguntas-respuestas-${cantidadQuiestionList}">
                                                <li class="active_li listpregunresp${cantidadQuiestionList}" onclick="activePreguntaRespyestaSelect(${cantidadQuiestionList},'opcion1-preguintaRespuesta${cantidadQuiestionList}','listpregunrespname',1)" id="opcion1-preguintaRespuesta${cantidadQuiestionList}">Preguntas y respuestas 1 </li>
                                                <li class="listpregunresp${cantidadQuiestionList}" onclick="activePreguntaRespyestaSelect(${cantidadQuiestionList},'opcion2-preguintaRespuesta${cantidadQuiestionList}','listpregunrespname',2)" id="opcion2-preguintaRespuesta${cantidadQuiestionList}">Preguntas y respuestas 2</li>
                                            </ul>
                                        </div>                                       
                                        <div class="respuestas-content d-flex flex-wrap hidden" id="listaPregunta2-${cantidadQuiestionList}" style="width: calc(100% - 230px);">
                                            <div class="d-flex flex-wrap">
                                                <input type="text" class="input-app-circular" style="width: 195px;" placeholder="Escribir subpregunta..." id="subpregunta${cantidadQuiestionList}-1" onkeyup="subpregunta(${cantidadQuiestionList},${primero})">
                                                <div class="addrptmultiple mx-3" onclick="addPreguntaRespuesta(${cantidadQuiestionList},1)"><img src="./images/newsistema/iconos/adicionar.svg" alt=""> </div>
                                                <div id="listadeRespuestas${cantidadQuiestionList}-1" class="d-flex flex-wrap">
                                                    <div class="d-flex mr-2">
                                                        <div style="width: 150px" class="mr-2">
                                                            <input type="text" placeholder="Respuesta" class="input-app-circular" id="respuesta${cantidadQuiestionList}-1_${cantidad2}" onkeyup="respuesta(${cantidadQuiestionList},1,${cantidad2})">
                                                        </div>
                                                        <div class="addrptmultiple" onclick="addRespuestas_PreResType1(${cantidadQuiestionList},1)"><img src="./images/newsistema/iconos/adicionar.svg" alt=""> </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="respuestas-content d-flex flex-wrap" id="listaPregunta${cantidadQuiestionList}" style="width: calc(100% - 230px);">
                                            <div class="d-flex flex-wrap w-100" id="contenedorpr${cantidadQuiestionList}-1">
                                                <input type="text" class="input-app-circular mr-2" style="width: 255px;" placeholder="Escribir subpregunta..." id="subPregunta${cantidadQuiestionList}-${cantidad2}" onkeyup="subpregunta(${cantidadQuiestionList},${cantidad2},2)">
                                                <div class="cuadrado"></div>
                                               <div class="addrptmultiple" onclick="addPreguntaRespuesta1(${cantidadQuiestionList})"><img src="./images/newsistema/iconos/adicionar.svg" alt=""> </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-pregunta-footer border-top">
                                <div class="px-5 py-3">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div class="d-flex align-items-center">
                                            <label class="d-flex align-items-center justify-content-center btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-fooder " id="btnyesno${cantidadQuiestionList}" onclick="activeSN(${cantidadQuiestionList})">
                                                SN
                                            </label>
                                            <label class="d-flex align-items-center justify-content-center btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-fooder" id="btnrptmultiple${cantidadQuiestionList}" onclick="activeRptMultiple(${cantidadQuiestionList})">
                                                <i class="fas fa-code-branch" aria-hidden="true"></i>
                                            </label>
                                            <label class="d-flex align-items-center justify-content-center btn bmd-btn-fab bmd-btn-fab-sm  mr-3  btn-fooder" id="btnexpandanswer${cantidadQuiestionList}" onclick="activeExpandanswer(${cantidadQuiestionList})">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 25 25">
                                                    <g fill="#fff" clip-path="url(#prefix__clip0)">
                                                        <path d="M7.923 15.508H4.94c-.54 0-.979.439-.979.979s.438.978.979.978h2.983c.54 0 .978-.438.978-.978s-.438-.978-.978-.978zM12.08 11.596H4.94c-.54 0-.978.438-.978.978s.438.978.978.978h7.14c.54 0 .979-.438.979-.978s-.438-.978-.978-.978zM12.08 7.683H4.94c-.54 0-.978.438-.978.978s.438.979.978.979H12.08c.54 0 .979-.438.979-.979 0-.54-.438-.978-.979-.978z"></path>
                                                        <path d="M13.107 1.52H3.913C1.755 1.52 0 3.275 0 5.433v14.183c0 1.045.407 2.028 1.146 2.767.74.739 1.722 1.146 2.767 1.146l9.195-.003c2.157 0 3.912-1.755 3.912-3.912V5.433c0-2.158-1.755-3.913-3.913-3.913zm1.956 3.913v14.18c0 1.08-.877 1.957-1.956 1.957l-9.194.002c-.523 0-1.014-.203-1.384-.573-.37-.37-.573-.86-.573-1.383V5.433c0-1.079.878-1.956 1.957-1.956h9.194c1.079 0 1.956.877 1.956 1.956zM24.018 15.703c.54 0 .978-.437.979-.977L25 4.406c0-1.618-1.316-2.935-2.934-2.935S19.13 2.788 19.13 4.405l-.008 15.275c0 .194.057.384.165.545l1.896 2.83c.179.268.478.43.8.435h.013c.317 0 .614-.154.798-.413l2.018-2.846c.312-.441.209-1.052-.232-1.364-.44-.313-1.051-.209-1.364.232l-1.197 1.689-.94-1.404.006-12.582h1.957l-.003 7.923c0 .54.438.978.978.978zm-2.93-10.857v-.44c0-.54.438-.978.978-.978s.978.438.978.977v.441h-1.957z"></path>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="prefix__clip0">
                                                            <path fill="#fff" d="M0 0H25V25H0z"></path>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </label>
                                            <label class="d-flex align-items-center justify-content-center btn bmd-btn-fab bmd-btn-fab-sm mr-3  btn-fooder" id="btntemperature${cantidadQuiestionList}" onclick="activeTemperature(${cantidadQuiestionList})">
                                                <i class="fas fa-thermometer-three-quarters" aria-hidden="true"></i>
                                            </label>
                                            <label class="d-flex align-items-center justify-content-center btn bmd-btn-fab bmd-btn-fab-sm btn-fooder mr-3" id="btnevidence${cantidadQuiestionList}" onclick="activeEvidence(${cantidadQuiestionList})">
                                                <i class="fas fa-camera" aria-hidden="true"></i></label>
                                            <label class="d-flex align-items-center justify-content-center btn bmd-btn-fab bmd-btn-fab-sm  mr-3  btn-fooder" id="btncriticidad${cantidadQuiestionList}" onclick="activeCriticidad(${cantidadQuiestionList})">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 26 26">
                                                    <path fill="#fff" d="M13 0C5.832 0 0 5.832 0 13s5.832 13 13 13 13-5.832 13-13S20.168 0 13 0zm0 23.636C7.135 23.636 2.364 18.865 2.364 13 2.364 7.135 7.135 2.364 13 2.364c5.865 0 10.636 4.771 10.636 10.636 0 5.865-4.771 10.636-10.636 10.636z"/>
                                                    <path fill="#fff" d="M13 5.516c-.869 0-1.576.707-1.576 1.576 0 .869.707 1.575 1.576 1.575.868 0 1.575-.706 1.575-1.575 0-.87-.707-1.576-1.575-1.576zM13 11.031c-.652 0-1.182.53-1.182 1.182v7.091c0 .653.53 1.182 1.182 1.182.653 0 1.182-.53 1.182-1.182v-7.09c0-.654-.53-1.183-1.182-1.183z"/>
                                                </svg>
                                            </label>
                                            <label class="d-flex align-items-center justify-content-center btn bmd-btn-fab bmd-btn-fab-sm  mr-3  btn-fooder" id="btnadjuntar${cantidadQuiestionList}" onclick="activeAdjuntar(${cantidadQuiestionList})">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <g fill="#676767" clip-path="url(#clip0)">
                                                        <path d="M19.983 8.074C18.875 3.66 14.396.977 9.98 2.086c-3.45.866-5.956 3.849-6.214 7.397-2.45.404-4.11 2.718-3.705 5.169.359 2.178 2.246 3.773 4.454 3.764h8.244v-1.498H4.515c-1.656 0-2.998-1.342-2.998-2.998 0-1.656 1.342-2.998 2.998-2.998.414 0 .75-.335.75-.75-.004-3.724 3.012-6.747 6.737-6.75 3.225-.004 6 2.276 6.625 5.44.061.315.318.557.637.599 1.854.254 3.236 1.838 3.237 3.71H24c-.002-2.423-1.662-4.529-4.017-5.097z"/>
                                                        <path d="M17.473 12.638l-2.997 2.998 1.056 1.056 1.724-1.716v7.187h1.499v-7.187l1.716 1.716 1.057-1.056-2.998-2.998c-.292-.29-.764-.29-1.057 0z"/>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0">
                                                            <path fill="#fff" d="M0 0H24V24H0z"/>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </label>
                                            <label class="d-flex align-items-center justify-content-center btn bmd-btn-fab bmd-btn-fab-sm  mr-3  btn-fooder" id="btnPreguntasRespuestas${cantidadQuiestionList}" onclick="activePreguntasRespuestas(${cantidadQuiestionList})">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 26 26">
                                                    <path fill="#fff" d="M9.166 13.762h1.524v1.523H9.166v-1.523zM11.451 7.617c0 .433-.176.832-.496 1.125l-1.789 1.637v1.86h1.524V11.05l1.294-1.184c.63-.577.99-1.396.99-2.249 0-1.68-1.366-3.047-3.046-3.047-1.68 0-3.047 1.367-3.047 3.047h1.523c0-.84.684-1.523 1.524-1.523s1.523.683 1.523 1.523z"/>
                                                    <path fill="#fff" d="M26 17.596c0-3.79-2.553-7.101-6.154-8.099C19.619 4.222 15.258 0 9.928 0 4.453 0 0 4.453 0 9.928c0 1.784.475 3.52 1.377 5.046l-1.34 4.845 4.845-1.34c1.401.829 2.983 1.296 4.615 1.366.998 3.601 4.309 6.155 8.099 6.155 1.512 0 2.983-.403 4.276-1.168l4.091 1.131-1.131-4.091C25.597 20.579 26 19.108 26 17.596zm-20.878-.764l-2.9.802.802-2.9-.183-.287c-.862-1.348-1.318-2.91-1.318-4.52 0-4.633 3.77-8.404 8.405-8.404 4.634 0 8.404 3.77 8.404 8.405 0 4.634-3.77 8.404-8.404 8.404-1.609 0-3.171-.456-4.52-1.317l-.286-.183zm18.657 6.947l-2.153-.596-.287.187c-1.114.724-2.409 1.107-3.743 1.107-2.979 0-5.596-1.926-6.524-4.688 4.562-.526 8.191-4.156 8.717-8.717 2.762.928 4.688 3.545 4.688 6.524 0 1.334-.383 2.629-1.107 3.743l-.187.287.596 2.152z"/>
                                                </svg>
                                            </label>
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <button class="btn bmd-btn-fab bmd-btn-fab-sm mr-3 btn-add btn-fooder" onclick="CreateQuestionInit()"><img src="./images/newsistema/iconos/group-3-copy-3.svg" alt="" class="w-43"></button>
                                            <button class="btn bmd-btn-fab bmd-btn-fab-sm btn-trash btn-fooder" onclick="DeleteQuestion(${cantidadQuiestionList})"><img src="./images/newsistema/iconos/interface-2.svg" alt="" class="w-43"></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`)
}

function addRespuestas_PreResType1(Id_pregunta,CamtidadPregunta){
    let index = 0;
    //preguntaRespuestaCantidad = 1;

    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+Id_pregunta){
            index = Index
        }
    })
    let cantidad = preguntaRespuestaCantidad + 1
    console.log(cantidad)
    preguntaRespuestaCantidad = cantidad

    QuiestionListArray[index].questionitem_list.forEach((subItems,subItemIndex) => {
        if(subItems.rpta_multiple == CamtidadPregunta){
            QuiestionListArray[index].questionitem_list[subItemIndex].itemoption_list.push(new itemoption_list('','',cantidad))
        }
    })
    console.log('listadeRespuestas'+Id_pregunta)
    $('#listadeRespuestas'+Id_pregunta+'-'+CamtidadPregunta).append(`<div class="d-flex mr-2">
                                                        <div style="width: 150px" class="mr-2">
                                                            <input type="text" placeholder="Respuesta" class="input-app-circular" id="respuesta${Id_pregunta}-${CamtidadPregunta}_${cantidad}" onkeyup="respuesta(${Id_pregunta},${CamtidadPregunta},${cantidad})"> </div>
                                                        <div class="addrptmultiple" onclick="addRespuestas_PreResType1(${Id_pregunta},${CamtidadPregunta})"><img src="./images/newsistema/iconos/adicionar.svg" alt=""> </div>
                                                         <div class="addrptmultiple ml-1" onclick="deleteRespuestas(${Id_pregunta},${CamtidadPregunta})"><img src="./images/newsistema/iconos/trash.svg" alt=""></div>
                                                    </div>`)
}

function TextoRespuesta(Id_pregunta,CamtidadPregunta,catidadRespuesta){
    let index = 0;
    //preguntaRespuestaCantidad = 1;

    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+Id_pregunta){
            index = Index
        }
    })

    let respuestaTexto = $('#respuestaTexto'+Id_pregunta+'-'+CamtidadPregunta)

    QuiestionListArray[index].questionitem_list.forEach((subItems,subItemIndex) => {
        if(subItems.rpta_multiple == Id_pregunta){
            QuiestionListArray[index].questionitem_list[subItemIndex].itemoption_list.forEach((Subrespuesta,IndexSubrespuesta)=>{
                if(Subrespuesta.cantidad == catidadRespuesta){
                    QuiestionListArray[index].questionitem_list[subItemIndex].itemoption_list[IndexSubrespuesta].title = respuestaTexto
                }
            })
        }
    })
}

let preguntayrespuesta2 = 1
function addPreguntaRespuesta1(idPregunta){
    let index = 0;

    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+idPregunta){
            index = Index
        }
    })
    preguntayrespuesta2 = preguntayrespuesta2 +1 ;
    QuiestionListArray[index].questionitem_list.push(new Quiestionitem_List('',8,preguntayrespuesta2))
    $('#listaPregunta'+idPregunta).append(` <div class="d-flex flex-wrap w-100 mt-3" id="contenedorpr${idPregunta}-${preguntayrespuesta2}">
                                                <input type="text" class="input-app-circular mr-2" style="width: 255px;" placeholder="Escribir subpregunta..." id="subPregunta${idPregunta}-${preguntayrespuesta2}" onkeyup="subpregunta(${idPregunta},${preguntayrespuesta2},2)">
                                                <div class="cuadrado"></div>
                                               <div class="addrptmultiple mr-2" onclick="addPreguntaRespuesta1(${idPregunta})"><img src="./images/newsistema/iconos/adicionar.svg" alt=""> </div>
                                               <div class="addrptmultiple" onclick="deletePreguntaRespuesta1(${idPregunta},${preguntayrespuesta2})"><img src="./images/newsistema/iconos/trash.svg" alt=""></div>
                                            </div>`)
}

function deletePreguntaRespuesta1(idPregunta,cantidadQuiestionList){
    let index = 0;

    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+idPregunta){
            index = Index
        }
    })

    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+idPregunta){
            QuiestionListArray[Index].questionitem_list.forEach((Item2,Item2Index) => {
                if(QuiestionListArray[Index].questionitem_list[Item2Index].type_object_id == 8 && QuiestionListArray[Index].questionitem_list[Item2Index].selection_type == 1 && QuiestionListArray[Index].questionitem_list[Item2Index].rpta_multiple == cantidadQuiestionList){
                    QuiestionListArray[index].questionitem_list.splice(Item2Index,1);
                    $('#contenedorpr'+idPregunta+'-'+cantidadQuiestionList).remove()
                }
            })
        }
    })
}

function selectOption(idPregunta, idDiv){
    console.log('creacion-inspeccion / func selectOption',idPregunta, idDiv)
  $(`#${idDiv}`).toggleClass('select-Ul__active')
}

let activeOption_multiple_selection_type = 1
function activeOption(idPregunta, idDiv,divtext){
    console.log('creacion-inspeccion / func activeOption')
    $(`.list${idPregunta}`).removeClass('active_li')
    $(`#${idDiv}`).addClass('active_li')
    let text = $(`#${idDiv}`).text();
    $(`#${divtext}`).text(text)
    QuiestionListArray.forEach((Item,Index) => {
        console.log('filtro 1')
        if(Item.Id_question == 'pregunta'+idPregunta){
            QuiestionListArray[Index].questionitem_list.forEach((Item2,Item2Index) => {
                //alert(QuiestionListArray[Index].questionitem_list[Item2Index].selection_type);
                if(QuiestionListArray[Index].questionitem_list[Item2Index].type_object_id == 2 && QuiestionListArray[Index].questionitem_list[Item2Index].selection_type == 1){
                    console.log('filtro 3')
                    QuiestionListArray[Index].questionitem_list[Item2Index].selection_type = 2
                    activeOption_multiple_selection_type = 2
                }else if(QuiestionListArray[Index].questionitem_list[Item2Index].type_object_id == 2 && QuiestionListArray[Index].questionitem_list[Item2Index].selection_type == 2){
                    QuiestionListArray[Index].questionitem_list[Item2Index].selection_type = 1
                    activeOption_multiple_selection_type = 1
                }
            })
        }
    })
    let idselect = divtext.replace("name-","");
    idselect = idselect.replace("selec","selecr");
    selectOption(idPregunta,idselect)
}

let pregunResptType2 = 1
function activePreguntaRespyestaSelect(idPregunta, idDiv,divtext,type){
    let index = 0;

    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+idPregunta){
            index = Index
        }
    })

    let encontreType2 = 0;
    $(`.listpregunresp${idPregunta}`).removeClass('active_li')
    $(`#${idDiv}`).addClass('active_li')
    let text = $(`#${idDiv}`).text();
    $(`#${divtext}`).text(text);
    if(type == 1){
        $('#listaPregunta'+idPregunta).removeClass('hidden');
        $('#listaPregunta2-'+idPregunta).addClass('hidden')

        QuiestionListArray.forEach((Item,Index) => {
            if(Item.Id_question == 'pregunta'+idPregunta){
                QuiestionListArray[Index].questionitem_list.forEach((Item2,Item2Index) => {
                    if(QuiestionListArray[Index].questionitem_list[Item2Index].type_object_id == 8 && QuiestionListArray[Index].questionitem_list[Item2Index].selection_type == 1){
                        QuiestionListArray[Index].questionitem_list[Item2Index].flag_delete = 1
                    }

                    if(QuiestionListArray[Index].questionitem_list[Item2Index].type_object_id == 8 && QuiestionListArray[Index].questionitem_list[Item2Index].selection_type == 2){
                        QuiestionListArray[Index].questionitem_list[Item2Index].flag_delete = 0
                    }
                })
            }
        })

    }else{
        $('#listaPregunta'+idPregunta).addClass('hidden');
        $('#listaPregunta2-'+idPregunta).removeClass('hidden')
        QuiestionListArray.forEach((Item,Index) => {
            if(Item.Id_question == 'pregunta'+idPregunta){
                QuiestionListArray[Index].questionitem_list.forEach((Item2,Item2Index) => {
                    if(QuiestionListArray[Index].questionitem_list[Item2Index].type_object_id == 8 && QuiestionListArray[Index].questionitem_list[Item2Index].selection_type == 1){
                        QuiestionListArray[Index].questionitem_list[Item2Index].flag_delete = 0
                    }

                    if(QuiestionListArray[Index].questionitem_list[Item2Index].type_object_id == 8 && QuiestionListArray[Index].questionitem_list[Item2Index].selection_type == 2){
                        encontreType2 = 1
                    }
                })
            }
        })

        if(encontreType2 == 1){
            QuiestionListArray.forEach((Item,Index) => {
                if(Item.Id_question == 'pregunta'+idPregunta){
                    QuiestionListArray[Index].questionitem_list.forEach((Item2,Item2Index) => {
                        if(QuiestionListArray[Index].questionitem_list[Item2Index].type_object_id == 8 && QuiestionListArray[Index].questionitem_list[Item2Index].selection_type == 2){
                            QuiestionListArray[Index].questionitem_list[Item2Index].flag_delete = 1
                        }
                    })
                }
            })
        }else{
                QuiestionListArray[index].questionitem_list.push(new Quiestionitem_List('',8,pregunResptType2,2))
            let cantidad = preguntaRespuestaCantidad + 1
            console.log(cantidad)
            preguntaRespuestaCantidad = cantidad
            QuiestionListArray.forEach((Item,Index) => {
                if(Item.Id_question == 'pregunta'+idPregunta){
                    QuiestionListArray[Index].questionitem_list.forEach((Item2,Item2Index) => {
                        if(QuiestionListArray[Index].questionitem_list[Item2Index].type_object_id == 8 && QuiestionListArray[Index].questionitem_list[Item2Index].selection_type == 2) {
                            QuiestionListArray[index].questionitem_list[Item2Index].itemoption_list.push(new itemoption_list('', '', cantidad))
                        }
                    })
                }
            })

        }
    }
    selectOption(idPregunta,'preguntas-respuestas'+idPregunta)

}

let criticidadType2 = 1
function activeOptionCriticidad(idPregunta, idDiv,divtext,type){

    let index = 0;

    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+idPregunta){
            index = Index
        }
    })


    let encontreType2 = 0;
    $(`.listCriticidad${idPregunta}`).removeClass('active_li')
    $(`#${idDiv}`).addClass('active_li')
    let text = $(`#${idDiv}`).text();
    $(`#${divtext}`).text(text);
    if(type == 1){
        $('#respuestas-criticidad'+idPregunta).removeClass('hidden');
        $('#respuestas-criticidad-type2-'+idPregunta).addClass('hidden')

        QuiestionListArray.forEach((Item,Index) => {
            if(Item.Id_question == 'pregunta'+idPregunta){
                QuiestionListArray[Index].questionitem_list.forEach((Item2,Item2Index) => {
                    if(QuiestionListArray[Index].questionitem_list[Item2Index].type_object_id == 6 && QuiestionListArray[Index].questionitem_list[Item2Index].selection_type == 1){
                        QuiestionListArray[Index].questionitem_list[Item2Index].flag_delete = 1
                    }

                    if(QuiestionListArray[Index].questionitem_list[Item2Index].type_object_id == 6 && QuiestionListArray[Index].questionitem_list[Item2Index].selection_type == 2){
                        QuiestionListArray[Index].questionitem_list[Item2Index].flag_delete = 0
                    }
                })
            }
        })

    }else{
        $('#respuestas-criticidad'+idPregunta).addClass('hidden');
        $('#respuestas-criticidad-type2-'+idPregunta).removeClass('hidden')
        QuiestionListArray.forEach((Item,Index) => {
            if(Item.Id_question == 'pregunta'+idPregunta){
                QuiestionListArray[Index].questionitem_list.forEach((Item2,Item2Index) => {
                    if(QuiestionListArray[Index].questionitem_list[Item2Index].type_object_id == 6 && QuiestionListArray[Index].questionitem_list[Item2Index].selection_type == 1){
                        QuiestionListArray[Index].questionitem_list[Item2Index].flag_delete = 0
                    }

                    if(QuiestionListArray[Index].questionitem_list[Item2Index].type_object_id == 6 && QuiestionListArray[Index].questionitem_list[Item2Index].selection_type == 2){
                        encontreType2 = 1
                    }
                })
            }
        })

        if(encontreType2 == 1){
            QuiestionListArray.forEach((Item,Index) => {
                if(Item.Id_question == 'pregunta'+idPregunta){
                    QuiestionListArray[Index].questionitem_list.forEach((Item2,Item2Index) => {
                        if(QuiestionListArray[Index].questionitem_list[Item2Index].type_object_id == 6 && QuiestionListArray[Index].questionitem_list[Item2Index].selection_type == 2){
                            QuiestionListArray[Index].questionitem_list[Item2Index].flag_delete = 1
                        }
                    })
                }
            })
        }else{
            var next = nextCriticalityTwo(index);
            QuiestionListArray[index].questionitem_list.push(new Quiestionitem_List('',6,next,2))
            QuiestionListArray.forEach((Item,Index) => {
                if(Item.Id_question == 'pregunta'+idPregunta){
                    QuiestionListArray[Index].questionitem_list.forEach((Item2,Item2Index) => {
                        if(QuiestionListArray[Index].questionitem_list[Item2Index].type_object_id == 6 && QuiestionListArray[Index].questionitem_list[Item2Index].selection_type == 2){
                            QuiestionListArray[index].questionitem_list[Item2Index].itemoption_list.push(new itemoption_list('','',1))
                            QuiestionListArray[index].questionitem_list[Item2Index].itemoption_list.push(new itemoption_list('','',2))
                            QuiestionListArray[index].questionitem_list[Item2Index].itemoption_list.push(new itemoption_list('','',3))
                        }
                    })
                }
            })

        }
    }
    selectOption(idPregunta,'select-criticidad'+idPregunta)

}

function nextCriticalityTwo(Index){
    var cant = 1;
    QuiestionListArray[Index].questionitem_list.forEach((Item,Indexitem) => {
        if(Item.type_object_id == 6 && Item.selection_type == 2){
            cant++;
        }
    })
    console.log('CANTIDAD NEXT CRITICALITY',cant)
    return cant;
}

function DeleteQuestion(id){

    if(QuiestionListArray.length > 1){
        QuiestionListArray.forEach((Item,Index) => {
            if(Item.Id_question == 'pregunta'+id){
                QuiestionListArray.splice(Index,1)
                $('#pregunta'+id).remove()
            }
        })
    }else{
        console.log('Como minimo debe tener 1 pregunta')
        $('#modal-delete-validate').addClass('modal_confirmacion__active')
    }

}

function cancelForm(){
    QuiestionListArray = [];
    handlerUrlhtml('contentGlobal','view/ssoma/configuracion-de-inspecciones/index.html','Configuracion de Inspecciones');
}

let CreateQuestionInit;
CreateQuestionInit = function CreateQuestionInit(){
    cantidadQuiestionList = cantidadQuiestionList + 1
    let Id_question = `pregunta${cantidadQuiestionList}`
    QuiestionListArray.push(new QuiestionList('',Id_question));
    addQuestionHtml();
}

let insedrtTitle;
insedrtTitle = function insedrtTitle( idPregunta ){
    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+idPregunta){
            let nombre = $(`#titlePregunta${idPregunta}`).val();
            QuiestionListArray[Index].description = nombre;
        }
    })

}
let activeSN;
activeSN = function activeSN(idPregunta){
    let index = 0;

    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+idPregunta){
            index = Index
        }
    })

    if(QuiestionListArray[index].questionitem_list.length == 0){
        QuiestionListArray[index].questionitem_list.push(new Quiestionitem_List('si',1))
        QuiestionListArray[index].questionitem_list.push(new Quiestionitem_List('no',1))
        QuiestionListArray[index].questionitem_list.push(new Quiestionitem_List('na',1))
        $("#btnyesno" + idPregunta).addClass("btn-footer-active");
        $('#sino'+idPregunta).removeClass('hidden')
    }
    else{
        let encontro = 0;
        QuiestionListArray[index].questionitem_list.forEach((Item,indexitem) => {
            if(Item.type_object_id == 1){
                encontro = 1
                QuiestionListArray[index].questionitem_list.splice(indexitem,3)
                $("#btnyesno" + idPregunta).removeClass("btn-footer-active");
                $('#sino'+idPregunta).addClass('hidden')
            }
        })

        if(encontro == 0){
            QuiestionListArray[index].questionitem_list.push(new Quiestionitem_List('si',1))
            QuiestionListArray[index].questionitem_list.push(new Quiestionitem_List('no',1))
            QuiestionListArray[index].questionitem_list.push(new Quiestionitem_List('na',1))
            $("#btnyesno" + idPregunta).addClass("btn-footer-active");
            $('#sino'+idPregunta).removeClass('hidden')
        }
    }
}

let activeSNexpand;
activeSNexpand = function activeSNexpand(type,idPregunta){
    let index = 0;

    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+idPregunta){
            index = Index
        }
    })

    if(type == 'si'){
        $('#btnchecksi'+idPregunta).toggleClass('btn-round-green')
        QuiestionListArray[index].questionitem_list.forEach((Item,indexitem) => {
            if(Item.description == 'si'){
                if(QuiestionListArray[index].questionitem_list[indexitem].flag_answer == 1){
                    QuiestionListArray[index].questionitem_list[indexitem].flag_answer = 0
                }else{
                    QuiestionListArray[index].questionitem_list[indexitem].flag_answer = 1
                }
            }
        })
    }else if(type == 'no'){
        $('#btncheckno'+idPregunta).toggleClass('btn-round-green')
        QuiestionListArray[index].questionitem_list.forEach((Item,indexitem) => {
            if(Item.description == 'no'){
                if(QuiestionListArray[index].questionitem_list[indexitem].flag_answer == 1){
                    QuiestionListArray[index].questionitem_list[indexitem].flag_answer = 0
                }else{
                    QuiestionListArray[index].questionitem_list[indexitem].flag_answer = 1
                }
            }
        })
    }else{
        $('#btncheckna'+idPregunta).toggleClass('btn-round-green')
        QuiestionListArray[index].questionitem_list.forEach((Item,indexitem) => {
            if(Item.description == 'na'){
                if(QuiestionListArray[index].questionitem_list[indexitem].flag_answer == 1){
                    QuiestionListArray[index].questionitem_list[indexitem].flag_answer = 0
                }else{
                    QuiestionListArray[index].questionitem_list[indexitem].flag_answer = 1
                }
            }
        })
    }
}

let activeTemperature;
activeTemperature = function activeTemperature(idPregunta){
    let index = 0;

    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+idPregunta){
            index = Index
        }
    })


    if(QuiestionListArray[index].questionitem_list.length == 0){
        QuiestionListArray[index].questionitem_list.push(new Quiestionitem_List('Temperatura',3))
        $("#btntemperature" + idPregunta).addClass("btn-footer-active");
        $('#temperaturaCotent'+idPregunta).removeClass('hidden')
    }
    else{
        let encontro = 0;
        QuiestionListArray[index].questionitem_list.forEach((Item,indexitem) => {
            if(Item.type_object_id == 3){
                encontro = 1
                QuiestionListArray[index].questionitem_list.splice(indexitem,1)
                $("#btntemperature" + idPregunta).removeClass("btn-footer-active");
                $('#temperaturaCotent'+idPregunta).addClass('hidden')
            }
        })

        if(encontro == 0){
            QuiestionListArray[index].questionitem_list.push(new Quiestionitem_List('Temperatura',3))
            $("#btntemperature" + idPregunta).addClass("btn-footer-active");
            $('#temperaturaCotent'+idPregunta).removeClass('hidden')
        }
    }
}

function activeExpandanswer(idPregunta){
    let index = 0;

    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+idPregunta){
            index = Index
        }
    })

    if(QuiestionListArray[index].questionitem_list.length == 0){
        QuiestionListArray[index].questionitem_list.push(new Quiestionitem_List('Ampliar respuesta',4))
        $("#btnexpandanswer" + idPregunta).addClass("btn-footer-active");
        $('#ampliacionrespuesta'+idPregunta).removeClass('hidden')
    }
    else{
        let encontro = 0;
        QuiestionListArray[index].questionitem_list.forEach((Item,indexitem) => {
            if(Item.type_object_id == 4){
                encontro = 1
                QuiestionListArray[index].questionitem_list.splice(indexitem,1)
                $("#btnexpandanswer" + idPregunta).removeClass("btn-footer-active");
                $('#ampliacionrespuesta'+idPregunta).addClass('hidden')
            }
        })

        if(encontro == 0){
            QuiestionListArray[index].questionitem_list.push(new Quiestionitem_List('Ampliar respuesta',4))
            $("#btnexpandanswer" + idPregunta).addClass("btn-footer-active");
            $('#ampliacionrespuesta'+idPregunta).removeClass('hidden')
        }
    }
}
let rptacantidad = 0;
function activeRptMultiple(idPregunta){
    console.log('activeRptMultiple: '+idPregunta);
    let index = 0;
    rptacantidad = 0;

    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+idPregunta){
            index = Index
        }
    })


    if(QuiestionListArray[index].questionitem_list.length == 0){
        QuiestionListArray[index].questionitem_list.push(new Quiestionitem_List('',2,1))
        $("#btnrptmultiple" + idPregunta).addClass("btn-footer-active");
        $('#RptMultiple'+idPregunta).removeClass('hidden');
        rptacantidad = rptacantidad + 1
    }
    else{
        let encontro = 0;
        QuiestionListArray[index].questionitem_list.forEach((Item,indexitem) => {
            if(Item.type_object_id == 2 && Item.flag_delete == 1){
                encontro = 1
                QuiestionListArray[index].questionitem_list[indexitem].flag_delete = 0
            }else if(Item.type_object_id == 2 && Item.flag_delete == 0){
                encontro = 2
                QuiestionListArray[index].questionitem_list[indexitem].flag_delete = 1
                rptacantidad = rptacantidad + 1
            }
        })

        if(encontro == 0){
            QuiestionListArray[index].questionitem_list.push(new Quiestionitem_List('',2, 1))
            $("#btnrptmultiple" + idPregunta).addClass("btn-footer-active");
            $('#RptMultiple'+idPregunta).removeClass('hidden');
            rptacantidad = rptacantidad + 1
        }else if(encontro == 1){
            $("#btnrptmultiple" + idPregunta).removeClass("btn-footer-active");
            $('#RptMultiple'+idPregunta).addClass('hidden')
            EvidenciaCantidad = 0
        }else if(encontro == 2){
            $("#btnrptmultiple" + idPregunta).addClass("btn-footer-active");
            $('#RptMultiple'+idPregunta).removeClass('hidden');
        }

    }

}

function escribirCotnenidoRptaMultiple(idPregunta,idRespuestaMultiple){
    let index = 0;

    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+idPregunta){
            index = Index
        }
    })

    let text = $(`#rptm${idPregunta}-${idRespuestaMultiple}`).text()
    QuiestionListArray[index].questionitem_list.forEach((Item,IndexItem) => {
        if(QuiestionListArray[index].questionitem_list[IndexItem].rpta_multiple == idRespuestaMultiple && QuiestionListArray[index].questionitem_list[IndexItem].type_object_id == 2){
            QuiestionListArray[index].questionitem_list[IndexItem].description = text
        }
    })
}

function addRptMultiple(idPregunta){
    let index = 0;

    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+idPregunta){
            index = Index
        }
    })

    let cantidad = rptacantidad + 1;
    rptacantidad = rptacantidad + 1;
    QuiestionListArray[index].questionitem_list.push(new Quiestionitem_List('',2,cantidad,activeOption_multiple_selection_type))
    $('#RptMultiple'+idPregunta).append(`<div class="d-flex mr-4 my-2" id="contentmultiple${idPregunta}-${cantidad}">
    <div class="respuest input-btn mr-3" contenteditable="" id="rptm${idPregunta}-${cantidad}" onkeyup="escribirCotnenidoRptaMultiple(${idPregunta},${cantidad})"></div> 
    <div class="addrptmultiple mr-2" onclick="addRptMultiple(${idPregunta})">
    <img src="./images/newsistema/iconos/adicionar.svg" alt=""> 
    </div>
    <div class="addrptmultiple" onclick="deleteRptMultiple(${idPregunta},${cantidad})">
    <img src="./images/newsistema/iconos/trash.svg" alt="">
    </div>
  </div>`)
}

function deleteRptMultiple(idPregunta,cantidad){
    let index = 0;

    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+idPregunta){
            index = Index
        }
    })

    let encontro = 0;
    QuiestionListArray[index].questionitem_list.forEach((Item,indexitem) => {
        if(Item.type_object_id == 2 && Item.rpta_multiple == cantidad){
            encontro = 1
            QuiestionListArray[index].questionitem_list.splice(indexitem,1)
            $("#contentmultiple"+idPregunta+'-' + cantidad).remove();
        }
    })

}

let EvidenciaCantidad = 0;
function activeEvidence(idPregunta){
    let index = 0;
    //EvidenciaCantidad = 0;

    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+idPregunta){
            index = Index
        }
    })

    if(QuiestionListArray[index].questionitem_list.length == 0){
        QuiestionListArray[index].questionitem_list.push(new Quiestionitem_List('Evidencia',5,1))
        $("#btnevidence" + idPregunta).addClass("btn-footer-active");
        $('#listaEvidencias'+idPregunta).removeClass('hidden')
        EvidenciaCantidad = EvidenciaCantidad + 1
    }
    else{
        let encontro = 0;
        QuiestionListArray[index].questionitem_list.forEach((Item,indexitem) => {
            if(Item.type_object_id == 5 && Item.flag_delete == 1){
                encontro = 1
                QuiestionListArray[index].questionitem_list[indexitem].flag_delete = 0
            }else if(Item.type_object_id == 5 && Item.flag_delete == 0){
                encontro = 2
                QuiestionListArray[index].questionitem_list[indexitem].flag_delete = 1
                EvidenciaCantidad = EvidenciaCantidad + 1
            }
        })

        if(encontro == 0){
            QuiestionListArray[index].questionitem_list.push(new Quiestionitem_List('Evidencia',5,1))
            $("#btnevidence" + idPregunta).addClass("btn-footer-active");
            $('#listaEvidencias'+idPregunta).removeClass('hidden')
            EvidenciaCantidad = EvidenciaCantidad + 1
        }else if(encontro == 1){
            $("#btnevidence" + idPregunta).removeClass("btn-footer-active");
            $('#listaEvidencias'+idPregunta).addClass('hidden')
            EvidenciaCantidad = 0
        }else if(encontro == 2){
            $("#btnevidence" + idPregunta).addClass("btn-footer-active");
            $('#listaEvidencias'+idPregunta).removeClass('hidden')
        }
    }
}


//----------------------------------------------------------@andy @jesus ------------------------------------------------------
function escribirCotnenidoEvidencia(idPregunta,nEvidencia){
    let index = 0;

    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+idPregunta){
            index = Index
        }
    })

    let text = $(`#textEvidencia${idPregunta}-${nEvidencia}`).val()
    console.log('xxxxxxxxxx',text,idPregunta,nEvidencia,'xxxxxxxxxx')
    console.log(QuiestionListArray[index].questionitem_list)
    QuiestionListArray[index].questionitem_list.forEach((Item,IndexItem) => {
        if(QuiestionListArray[index].questionitem_list[IndexItem].rpta_multiple == nEvidencia && QuiestionListArray[index].questionitem_list[IndexItem].type_object_id == 5){
            //QuiestionListArray[index].questionitem_list[IndexItem].description = text
             QuiestionListArray[index].questionitem_list[IndexItem].text = text
             QuiestionListArray[index].questionitem_list[IndexItem].rpta_multiple = nEvidencia;
        }
    })
}
//----------------------------------------------------------@andy @jesus ------------------------------------------------------




function addEvidencia(idPregunta){
    let index = 0;
    let ii = 0;//-------------------@andy
    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+idPregunta){
            index = Index
        }
    })



    let cantidad = EvidenciaCantidad + 1;
    rptacantidad = cantidad;
    QuiestionListArray[index].questionitem_list.push(new Quiestionitem_List('Evidencia',5,rptacantidad))
     ii = cantidad;

    $('#listaEvidencias'+idPregunta).append(`<div class="d-flex ml-3" id="evidenciaContent${idPregunta}-${ii}">
                                            <div class="content-camara mr-3">
                                                <button class="btn-round-green btn mr-4 mb-3 flex align-items-center justify-content-center">
                                                    <img src="./images/newsistema/iconos/photo-camera-FFF.svg" alt="">
                                                    <strong class="mx-2">Evidencia</strong></button>
                                                <input type="text" id = "textEvidencia${idPregunta}-${ii}" onkeyup="escribirCotnenidoEvidencia(${idPregunta},${ii})" class="input-app-circular" placeholder="Escribir..." style="width: 180px;">
                                            </div>
                                            <div style="cursor:pointer;" class="d-flex align-items-center mr-2" onclick="addEvidencia(${idPregunta})">
                                                <img src="./images/newsistema/iconos/adicionar.svg" alt="">
                                            </div>
                                            <div class="addrptmultiple" onclick="deleteEvidencia(${idPregunta},${ii})">
                                                <img src="./images/newsistema/iconos/trash.svg" alt="">
                                            </div>
                                        </div>`)

    EvidenciaCantidad++;
}

function deleteEvidencia(idPregunta,numeral){
    let index = 0;

    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+idPregunta){
            index = Index
        }
    })

    /*rptacantidad = rptacantidad - 1;
    QuiestionListArray[index].questionitem_list.forEach((Item,indexitem) => {
        if(Item.type_object_id == 5){
            if(Item.rpta_multiple == numeral){
                QuiestionListArray[index].questionitem_list.splice(indexitem,1);
                $('#evidenciaContent'+idPregunta+'-'+numeral).remove()
            }
        }
    })//*/
    let encontro = 0;
    QuiestionListArray[index].questionitem_list.forEach((Item,indexitem) => {
        if(Item.type_object_id == 5 && Item.rpta_multiple == numeral){
            encontro = 1
            QuiestionListArray[index].questionitem_list.splice(indexitem,1)
            $("#evidenciaContent"+idPregunta+'-' + numeral).remove();
        }
    })
}



/*


let index = 0;

    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+idPregunta){
            index = Index
        }
    })

    let encontro = 0;
    QuiestionListArray[index].questionitem_list.forEach((Item,indexitem) => {
        if(Item.type_object_id == 2 && Item.rpta_multiple == cantidad){
            encontro = 1
            QuiestionListArray[index].questionitem_list.splice(indexitem,1)
            $("#contentmultiple"+idPregunta+'-' + cantidad).remove();
        }
    })
*/







function activeCriticidad(idPregunta){
    let index = 0;

    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+idPregunta){
            index = Index
        }
    })

    if(QuiestionListArray[index].questionitem_list.length == 0){
        QuiestionListArray[index].questionitem_list.push(new Quiestionitem_List('',6,1))
        QuiestionListArray[index].questionitem_list.push(new Quiestionitem_List('',6,2))
        QuiestionListArray[index].questionitem_list.push(new Quiestionitem_List('',6,3))
        $('#criticidadContent'+idPregunta).removeClass('hidden');
        $('#btncriticidad'+idPregunta).addClass('btn-footer-active')
    }else{
        let encontro = 0;
        QuiestionListArray[index].questionitem_list.forEach((Item,indexitem) => {
            if(Item.type_object_id == 6 && Item.flag_delete == 1){
                encontro = 1
                QuiestionListArray[index].questionitem_list[indexitem].flag_delete = 0
            }else if(Item.type_object_id == 6 && Item.flag_delete == 0){
                encontro = 2
                QuiestionListArray[index].questionitem_list[indexitem].flag_delete = 1
            }
        })

        if(encontro == 0){
            QuiestionListArray[index].questionitem_list.push(new Quiestionitem_List('',6,1))
            QuiestionListArray[index].questionitem_list.push(new Quiestionitem_List('',6,2))
            QuiestionListArray[index].questionitem_list.push(new Quiestionitem_List('',6,3))
            $('#criticidadContent'+idPregunta).removeClass('hidden');
            $('#btncriticidad'+idPregunta).addClass('btn-footer-active')
        }else if(encontro == 1){
            $("#btncriticidad" + idPregunta).removeClass("btn-footer-active");
            $('#criticidadContent'+idPregunta).addClass('hidden')
            EvidenciaCantidad = 0
        }else if(encontro == 2){
            $("#btncriticidad" + idPregunta).addClass("btn-footer-active");
            $('#criticidadContent'+idPregunta).removeClass('hidden')
        }
    }

}

function contenidoCriticidad(idPregunta,numeral,type = 1){

    let index = 0;

    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+idPregunta){
            index = Index
        }
    })

    if(type == 1){
        let contenido = $('#inputCriticidad'+idPregunta+'-'+numeral).val()
        QuiestionListArray[index].questionitem_list.forEach((item,itemindex)=>{
            if(item.type_object_id == 6 && item.rpta_multiple == numeral && item.selection_type == 1){
                QuiestionListArray[index].questionitem_list[itemindex].description = contenido;
            }
        })
    }else{
        let contenido = $('#inputCriticidad2'+idPregunta+'-'+numeral).val()
        QuiestionListArray[index].questionitem_list.forEach((item,itemindex)=>{
            if(item.type_object_id == 6 && item.rpta_multiple == numeral && item.selection_type == 2){
                QuiestionListArray[index].questionitem_list[itemindex].description = contenido;
            }
        })
    }


}

function subpreguntaCriticidad2(idPregunta,numeral,numsub){
    let index = 0;

    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+idPregunta){
            index = Index
        }
    })

    let contenido = $('#subpreguntaCriticidad2'+idPregunta+'-'+numeral+'-'+numsub).val()
    console.log(contenido)
    QuiestionListArray[index].questionitem_list.forEach((item,itemindex)=>{
        if(item.type_object_id == 6 && item.rpta_multiple == numeral && item.selection_type == 2){
            let index_interno = numsub - 1;
            QuiestionListArray[index].questionitem_list[itemindex].itemoption_list[index_interno].title = contenido;
        }
    })
}

function addRptMultipleCriticidad(idPregunta){
    criticidadType2 = criticidadType2 + 1
    let index = 0;

    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+idPregunta){
            index = Index
        }
    })

    var next = nextCriticalityTwo(index);

    QuiestionListArray[index].questionitem_list.push(new Quiestionitem_List('',6,next,2))

    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+idPregunta){
            QuiestionListArray[Index].questionitem_list.forEach((Item2,Item2Index) => {
                if(QuiestionListArray[Index].questionitem_list[Item2Index].type_object_id == 6 && QuiestionListArray[Index].questionitem_list[Item2Index].selection_type == 2 && QuiestionListArray[Index].questionitem_list[Item2Index].rpta_multiple == next){
                    QuiestionListArray[index].questionitem_list[Item2Index].itemoption_list.push(new itemoption_list('','',1))
                    QuiestionListArray[index].questionitem_list[Item2Index].itemoption_list.push(new itemoption_list('','',2))
                    QuiestionListArray[index].questionitem_list[Item2Index].itemoption_list.push(new itemoption_list('','',3))
                }
            })
        }
    })

    $(`#respuestas-criticidad-type2-${idPregunta}`).append(`<div class="d-flex mr-2 align-items-center my-2" id="contentCriticidad${idPregunta}-${next}">
                                                <input type="text" class="input-app-circular mr-2" placeholder="Escribir...." id="inputCriticidad2${idPregunta}-${next}" style="width: 280px" onkeyup="contenidoCriticidad(${idPregunta},${next},2)">
                                                <div class="cuadrado"></div>
                                                <input type="text" class="subpregunta mr-2 input-app-circular" placeholder="Escribir...." id="subpreguntaCriticidad2${idPregunta}-${next}-1" style="width: 150px" onkeyup="subpreguntaCriticidad2(${idPregunta},${next},1)">
                                                <div class="cuadrado"></div>
                                                <input type="text" class="subpregunta mr-2 input-app-circular" placeholder="Escribir...." id="subpreguntaCriticidad2${idPregunta}-${next}-2" style="width: 150px" onkeyup="subpreguntaCriticidad2(${idPregunta},${next},2)">
                                                <div class="cuadrado"></div>
                                                <input type="text" class="subpregunta mr-2 input-app-circular" placeholder="Escribir...." id="subpreguntaCriticidad2${idPregunta}-${next}-3" style="width: 150px" onkeyup="subpreguntaCriticidad2(${idPregunta},${next},3)">
                                                <div class="addrptmultiple mr-2" onclick="addRptMultipleCriticidad(${idPregunta})"><img src="./images/newsistema/iconos/adicionar.svg" alt=""> </div>
                                                <div class="addrptmultiple" onclick="deleteRptMultipleCriticidad(${idPregunta},${next})"><img src="./images/newsistema/iconos/trash.svg" alt=""></div>
                                            </div>`)
}

function deleteRptMultipleCriticidad(idPregunta,ID_criticidadType2){
    let index = 0;

    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+idPregunta){
            index = Index
        }
    })
    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+idPregunta){
            QuiestionListArray[Index].questionitem_list.forEach((Item2,Item2Index) => {
                if(QuiestionListArray[Index].questionitem_list[Item2Index].type_object_id == 6 && QuiestionListArray[Index].questionitem_list[Item2Index].selection_type == 2 && QuiestionListArray[Index].questionitem_list[Item2Index].rpta_multiple == ID_criticidadType2){
                    QuiestionListArray[index].questionitem_list.splice(Item2Index,1);
                    $('#contentCriticidad'+idPregunta+'-'+ID_criticidadType2).remove()
                }
            })
        }
    })
}

let adjuntarCantidad = 1;
function activeAdjuntar(idPregunta){
    let index = 0;

    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+idPregunta){
            index = Index
        }
    })

    if(QuiestionListArray[index].questionitem_list.length == 0){
        QuiestionListArray[index].questionitem_list.push(new Quiestionitem_List('',7,1))
        $('#adjuntarimagencontent'+idPregunta).removeClass('hidden');
        $('#btnadjuntar'+idPregunta).addClass('btn-footer-active')
    }else{
        let encontro = 0;
        QuiestionListArray[index].questionitem_list.forEach((Item,indexitem) => {
            if(Item.type_object_id == 7 && Item.flag_delete == 1){
                encontro = 1
                QuiestionListArray[index].questionitem_list[indexitem].flag_delete = 0
            }else if(Item.type_object_id == 7 && Item.flag_delete == 0){
                encontro = 2
                QuiestionListArray[index].questionitem_list[indexitem].flag_delete = 1
            }
        })

        if(encontro == 0){
            QuiestionListArray[index].questionitem_list.push(new Quiestionitem_List('',7,1))
            $('#adjuntarimagencontent'+idPregunta).removeClass('hidden');
            $('#btnadjuntar'+idPregunta).addClass('btn-footer-active')
        }else if(encontro == 1){
            $("#btnadjuntar" + idPregunta).removeClass("btn-footer-active");
            $('#adjuntarimagencontent'+idPregunta).addClass('hidden')
            EvidenciaCantidad = 0
        }else if(encontro == 2){
            $("#btnadjuntar" + idPregunta).addClass("btn-footer-active");
            $('#adjuntarimagencontent'+idPregunta).removeClass('hidden')
        }

    }
}

function adjuntarImage(idPregunta,numeral){
    let idfile = `adjuntar${idPregunta}-${numeral}`;
    let index = 0;

    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+idPregunta){
            index = Index
        }
    })

    var filesSelected = document.getElementById(idfile).files;

    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];

        var fileReader = new FileReader();

        fileReader.onload = function(fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result; // <--- data: base64
            QuiestionListArray[index].questionitem_list.forEach((item,itenindex) => {
                if(item.type_object_id == 7 && item.rpta_multiple == numeral){
                    QuiestionListArray[index].questionitem_list[itenindex].text = srcData;
                    QuiestionListArray[index].questionitem_list[itenindex].description = filesSelected[0]['name']
                    $('#text-imagen'+idPregunta+'-'+numeral).text(filesSelected[0]['name']);
                }
            })
            console.log(srcData);
        }
        fileReader.readAsDataURL(fileToLoad);
    }
}

function addAdjuntarImagen(idPregunta){
    let index = 0;

    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+idPregunta){
            index = Index
        }
    })

    let cantidad = adjuntarCantidad + 1;
    adjuntarCantidad = cantidad
    QuiestionListArray[index].questionitem_list.push(new Quiestionitem_List('',7,cantidad))
    $('#listaImagenAdjunta'+idPregunta).append(`<div class="d-flex mr-2" id="content_file_img_adjuntar${idPregunta}-${cantidad}">
                                                <input type="file" class="d-none" id="adjuntar${idPregunta}-${cantidad}" onchange="adjuntarImage(${idPregunta},${cantidad})">
                                                <label for="adjuntar${idPregunta}-${cantidad}" class="btn btn-success btn-raised btn-round-green mr-3" id="text-imagen${idPregunta}-${cantidad}">Adjuntar</label>
                                                <div class="addrptmultiple MR-2" onclick="addAdjuntarImagen(${idPregunta})"><img src="./images/newsistema/iconos/adicionar.svg" alt=""> </div>
                                                <div class="addrptmultiple" onclick="deleteAdjuntarImagen(${idPregunta},${cantidad})">
                                                    <img src="./images/newsistema/iconos/trash.svg" alt="">
                                                </div>
                                            </div>`)
}

function deleteAdjuntarImagen(idPregunta,numeral){
    let index = 0;

    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+idPregunta){
            index = Index
        }
    })

    $('#content_file_img_adjuntar'+idPregunta+'-'+numeral).remove()
    QuiestionListArray[index].questionitem_list.forEach((item,itemindex)=>{
        if(item.type_object_id == 7 && item.rpta_multiple == numeral){
            QuiestionListArray[index].questionitem_list.splice(itemindex,1)
        }
    })
}

function activePreguntasRespuestas(idPregunta){
    let index = 0;

    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+idPregunta){
            index = Index
        }
    })

    if(QuiestionListArray[index].questionitem_list.length == 0){
        QuiestionListArray[index].questionitem_list.push(new Quiestionitem_List('',8,1))
        QuiestionListArray[index].questionitem_list[0].itemoption_list.push(new itemoption_list('respuesta 1','',1))
        $('#preguntasRespuestasContent'+idPregunta).removeClass('hidden');
        $('#btnPreguntasRespuestas'+idPregunta).addClass('btn-footer-active')
    }else{
        let encontro = 0;
        QuiestionListArray[index].questionitem_list.forEach((Item,indexitem) => {
            if(Item.type_object_id == 8 && Item.flag_delete == 1){
                encontro = 1
                QuiestionListArray[index].questionitem_list[indexitem].flag_delete = 0
            }else if(Item.type_object_id == 8 && Item.flag_delete == 0){
                encontro = 2
                QuiestionListArray[index].questionitem_list[indexitem].flag_delete = 1
            }
        })

        if(encontro == 0){
            QuiestionListArray[index].questionitem_list.push(new Quiestionitem_List('',8,1))
            $('#preguntasRespuestasContent'+idPregunta).removeClass('hidden');
            $('#btnPreguntasRespuestas'+idPregunta).addClass('btn-footer-active')
        }else if(encontro == 1){
            $("#btnPreguntasRespuestas" + idPregunta).removeClass("btn-footer-active");
            $('#preguntasRespuestasContent'+idPregunta).addClass('hidden')
            EvidenciaCantidad = 0
        }else if(encontro == 2){
            $("#btnPreguntasRespuestas" + idPregunta).addClass("btn-footer-active");
            $('#preguntasRespuestasContent'+idPregunta).removeClass('hidden')
        }

    }
}

function subpregunta(idPregunta,numeral,type = 1){
    let index = 0;

    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+idPregunta){
            index = Index
        }
    })
    let pregunta = ''
    if(type == 1){
        pregunta = $(`#subpregunta${idPregunta}-${numeral}`).val();
        QuiestionListArray[index].questionitem_list.forEach((Item,indexitem) => {
            if(Item.type_object_id == 8 && Item.rpta_multiple == numeral && Item.selection_type == 2){
                QuiestionListArray[index].questionitem_list[indexitem].description = pregunta
                QuiestionListArray[index].questionitem_list[indexitem].text = pregunta
            }
        })
    }else{
        pregunta = $(`#subPregunta${idPregunta}-${numeral}`).val();
        console.log(pregunta)
        QuiestionListArray[index].questionitem_list.forEach((Item,indexitem) => {
            if(Item.type_object_id == 8 && Item.rpta_multiple == numeral && Item.selection_type == 1){
                QuiestionListArray[index].questionitem_list[indexitem].description = pregunta
                QuiestionListArray[index].questionitem_list[indexitem].text = pregunta
            }
        })
    }


//console.error("Pregunta"+pregunta,idPregunta,numeral)

}

function respuesta(idPregunta,numeralsubpregunta,numeralRespuesta){
    let index = 0;

    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+idPregunta){
            index = Index
        }
    })

    let respuestacontent = $(`#respuesta${idPregunta}-${numeralsubpregunta}_${numeralRespuesta}`).val();
    console.log(respuestacontent)
    QuiestionListArray[index].questionitem_list.forEach((Item,indexitem) => {
        if(Item.type_object_id == 8 && Item.rpta_multiple == numeralsubpregunta && Item.selection_type == 2){
            console.log('paso 1')
            QuiestionListArray[index].questionitem_list[indexitem].itemoption_list.forEach((respuesta,respuestaindesx) => {
                if(respuesta.cantidad == numeralRespuesta){
                    QuiestionListArray[index].questionitem_list[indexitem].itemoption_list[respuestaindesx].title = respuestacontent;
                }
            })
        }else{
            console.log('idPregunta',idPregunta)
            console.log('idPregunta',numeralsubpregunta)
            console.log('idPregunta',numeralRespuesta)
        }
    })
}
let preguntaRespuestaCantidad = 0;
function addPreguntaRespuesta(idPregunta,cantidadPregunta){
    let index = 0;
    //preguntaRespuestaCantidad = 1;

    QuiestionListArray.forEach((Item,Index) => {
        if(Item.Id_question == 'pregunta'+idPregunta){
            index = Index
        }
    })

    let cantidad = preguntaRespuestaCantidad + 1
    console.log(cantidad)
    preguntaRespuestaCantidad = cantidad
    let prcantidad = cantidad - 1
    QuiestionListArray[index].questionitem_list.push(new Quiestionitem_List('',8,cantidad,2))

    QuiestionListArray[index].questionitem_list.forEach((subItems,subItemIndex) => {
        if(subItems.rpta_multiple == cantidad){
            QuiestionListArray[index].questionitem_list[subItemIndex].itemoption_list.push(new itemoption_list('','',cantidad))
        }
    })

    //QuiestionListArray[index].questionitem_list[prcantidad].itemoption_list.push(new itemoption_list('','',1))

    $('#listaPregunta2-'+idPregunta).append(`<div class="d-flex mt-2">
                                                <input type="text" class="input-app-circular" style="width: 195px;" placeholder="Escribir subpregunta..." id="subpregunta${idPregunta}-${cantidad}" onkeyup="subpregunta(${idPregunta},${cantidad})">
                                                <div class="addrptmultiple mx-3" onclick="addPreguntaRespuesta(${idPregunta})"><img src="./images/newsistema/iconos/adicionar.svg" alt=""> </div>
                                                <div id="listadeRespuestas${idPregunta}-${cantidad}" class="d-flex">
                                                    <div class="d-flex mr-2">
                                                        <div style="width: 150px" class="mr-2">
                                                            <input type="text" placeholder="Respuesta" class="input-app-circular" id="respuesta${idPregunta}-${cantidad}_${cantidad}" onkeyup="respuesta(${idPregunta},${cantidad},${cantidad})">
                                                        </div>
                                                        <div class="addrptmultiple" onclick="addRespuestas_PreResType1(${idPregunta},${cantidad})"><img src="./images/newsistema/iconos/adicionar.svg" alt=""> </div>
                                                       
                                                    </div>
                                                </div>
                                            </div>`)
}

// guardar el formulario con las preguntas
let flag_confirm = 0;
function endQuestion(){
    let title = $("#titleForm").val();
    let flag_enable_area = "0";
    let flag_enable_person = "0";

    flag_confirm = 0
    if(title == ''){

    }else{
        $('.title_formulario_save').text(title)
        $('#modal-confirmacion').addClass('modal_confirmacion__active')
    }

}

function finalizarQuestion(){
    let title = $("#titleForm").val();
    flag_confirm = 1
    if(title == ''){

    }else{
        $('.title_formulario_save').text(title)
        $('#modal-confirmacion_finalizar').addClass('modal_confirmacion__active')
    }
}

function saveFormulario(){
    let title = $("#titleForm").val();
    let flag_enable_area = "0";
    let flag_enable_person = "0";

    cerrarModal('modal-confirmacion')
    let storage = getStorage("usuario", "json");
    let data = {
        title: title,
        description: "",
        flag_confirm: flag_confirm,
        type_id: "0",
        flag_enable_area: flag_enable_area,
        flag_enable_person: flag_enable_person,
        created_by: storage.idhash,
        last_updated_by: storage.idhash,
        question_list: QuiestionListArray,
        system_id: 8
    };

    console.log(data)

    var url =
        "https://0p3r4ti0n5ecur3-prd-forms.azurewebsites.net/api/Post-Form?httpmethod=postSsoma&code=tbusGxCxP6l8bmUGYeo8gjmwdBHmxA5vECyVKaSi8HB7GdJDdZuslQ==";
    var headers = {
        apikey: constantes.apiKey,
    };
    $.ajax({
        method: "POST",
        url: url,
        headers: headers,
        crossDomain: true,
        data: JSON.stringify(data),
        dataType: "json",
    }).done(function (response) {
        console.log(response);
        cantidadQuiestionList = 0;
        QuiestionListArray = [];
        $('#modal-save').addClass('modal_confirmacion__active')
        //handlerUrlhtml('contentGlobal','view/ssoma/configuracion-de-inspecciones/index.html','externalAccessRequestList');
    });
}

function cerrarModal(id){
    $(`#${id}`).removeClass('modal_confirmacion__active')
}

