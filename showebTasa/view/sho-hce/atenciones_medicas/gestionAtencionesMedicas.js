/****************************************************************************************
* VISUAL SAT - [2021]
* PROYECTO : SIGTASA
* ESQUEMA : SSOMA
* SPRINT : 3
* MODULO : ATENCIONES MEDICAS
* OPERADORES_____________________________________________________________
* | # | PROGRAMADOR  | |    FECHA   | |   HORA   | CORREO                |
* | 1 | Carlos Rivas | | 10/09/2021 | | 10:42:00 | crivascyt@gmail.com   |
* |___|______________|_|____________|_|__________|_______________________|
*
* DESCRIPCION: ARCHIVO FRONT DE FUNCIONALIDAD EN CLIENTE DE LAS OPCIONES DE:
* - CREAR Y EDITAR LAS ATENCIONES MEDICAS
* - CREACION DE INTERCONSULTAS
* - CREACION DE TRANSFERENCIAS

*******************************************************************************************/
//###########################################################################################################


function AtencionesMedicas() {
  this.a = [];
  AtencionesMedicas.prototype.cargarData = function (data) {
    console.log(data);
    this.a = data;
  }
}

var paObj_am = [];
// var idAM = 1;
var accionIntTrans = 1;
var anexo = 0;

async function _init_amSp3AtencionesMedicas() {
  showLoading();
  amSp3DatosHistoriaTrabajadorClinica();
  await amSp3CargarMotivosAtencion();
  await amSp3CargarTipoEvaluacion();
  await amSp3CargarTiposDiagnostico();
  await amSp3CargarSistemaAfectado();
  await amSp3CargarSeccionAfectada();
  await amSp3CargarTiposContingencia();
  await amSp3CargarEmisionDescanso();
  await amSp3CargarCobertura();
  await amSp3CargarAptitud();
  await amSp3CargarTiposExamen();
  await amSp3CargarMedicamentos();
  await amSp3CargarTiposMedicamentos();
  hideLoading();

  if (idAM == 0) {
    await amSp3GuardarAtencionesMedicas();
    paObj_am[idAM] = new AtencionesMedicas();
    paObj_am[idAM].cargarData(paObj_hc[idHC].a);
    ID_ORIGEN = idAM;
    accionNuevaAtencion = 1;
  } else {
    accionNuevaAtencion = 0;
    paObj_am[idAM] = new AtencionesMedicas();
    paObj_am[idAM].cargarData(paObj_hc[idHC].a);
    amSp3CargarVerAtencion();
    amSp3CargarIncidencia();
    amSp3CargarOtros();
    amSp3CargarDiagnosticos();
    amSp3CargarAdjuntoDescanso();
    amSp3CargarMedicamentoInsumos();
    amSp3CargarAdjuntos();
    amSp3CargarExamenAuxiliar();
    await amSp3CargarAtencionAnexada();
    amSp3MostrarAtencionesAnexadas();
  }
}

// ANEXAR ATENCION
function amSp3ConfimAnexarAtencion() {
  Swal.fire({
    title: "Anexar atención médica",
    html: `
    <p>Se anexará la información pasada del</p>
    <p>paciente a esta atención médica</p>
    <div class="row mx-5 mt-5">
      <div class="col-12">
        <div class="input-box-secondary">
          <span>Fecha de atención</span>
          <input type="date" id="dat_am_fecha_anexar" class="input_am_anexar">
        </div>
      </div>
      <div class="col-12">
        <div class="input-box-secondary">
          <span>Código de atención</span>
          <input type="text" id="dat_am_codigo_anexar" class="input_am_anexar">
        </div>
      </div>
      <div class="col-12">
        <button type="button" class="btn btn-success btn-block btn-lg" onclick="amSp3CargarAtencionesBusqueda()"> 
          <div class="spinner-border spinner-border-sm" id="am_spin_anexar" role="status" style="display: none;">
            <span class="sr-only">Loading...</span>
          </div>
          Buscar atención 
          <img src="./images/sho/search2.svg">          
        </button>
      </div>
      <div id="result_am_anexar" style="display: none; width: 100%">
        <div class="col-12 mt-4">
          <div class="d-flex align-items-center">
            <div id="cant_planes">
              <img src="images/sho/copia-1.svg" style="width: 20px" />
            </div>
            <span class="cantidad ml-3" id="cant_am_anexar" style="font-size: 15px">0 registros</span>
          </div>
        </div>
        <div id="content_am_anexar">          
        </div>
      </div>      
    </div>
    <p class="mt-3">¿Desea confirmar la acción?</p>`,
    icon: "info",
    showCancelButton: true,
    reverseButtons: true,
    cancelButtonColor: "#ff3636",
    confirmButtonColor: "#8fbb02",
    confirmButtonText: `Confirmar <img src="./images/sho/confirm.svg">`,
    cancelButtonText: `Cancelar <img src="./images/sho/cancelar.svg">`,
  }).then(async (result) => {
    if (result.isConfirmed) {
      let data = paObj_am[idAM].Atencion.AnexarAtencionMedica[0];
      await amSp3GuardarAtencionesMedicasAnexadas(data);
      await amSp3CargarAtencionAnexada();
      amSp3MostrarAtencionesAnexadas();
    }
  });
}

function amSp3ConfimDesanexarAtencion() {
  let data = paObj_am[idAM].Atencion.AnexarAtencionMedica[0];
  Swal.fire({
    title: "Eliminar atención anexada",
    html: `
    <p>Se eliminará la atención anexada con el código</p>
    <p>${data.CodigoAtencion}</p>
    <p class="mt-3">¿Desea confirmar la acción?</p>`,
    icon: "info",
    showCancelButton: true,
    reverseButtons: true,
    cancelButtonColor: "#ff3636",
    confirmButtonColor: "#8fbb02",
    confirmButtonText: `Confirmar <img src="./images/sho/confirm.svg">`,
    cancelButtonText: `Cancelar <img src="./images/sho/cancelar.svg">`,
  }).then(async (result) => {
    if (result.isConfirmed) {
      await amSp3EliminarAtencionAnexada(data.Id);
      await amSp3CargarAtencionAnexada();
      amSp3MostrarAtencionesAnexadas();
    }
  });
}

function amSp3EliminarAtencionAnexada(id) {
  let data = {};
  data.IdAtencionMedica = idAM;
  data.IdAnexAtenc = id;

  let url = apiUrlsho+`/api/hce_Post_036_anexar_atencion_medica_eliminadoLogico?code=UV/87sVHCTKEoirjagwCNaWrRe/7vZivN47/0ezwTauuZ/2rRlTcag==&httpmethod=post`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "post",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers,
    "data": JSON.stringify(data)
  };

  return $.ajax(settings).done((response) => {
    $('.dat_am_atencion_anexada').hide();
    $('#text_am_anexar_atencion').hide();
    $('.input_am_consulta').removeAttr('disabled');
    $('#btn_am_anexar_atencion').show();
    $('#btn_am_desanexar_atencion').hide();
    $('#table_content_am_descanso').html('');
    $('#am_descansos_anexados').hide();
    $('#am_diagnosticos_anexados').hide();

    Swal.fire({
      title: "Atención desanexada con éxito",
      iconColor: "#8fbb02",
      iconHtml: '<img src="./images/sho/check.svg" width="28px">',
      showConfirmButton: false,
      padding: "3em 3em 6em 3em ",
      timer: 1500,
    })
  })
}

function amSp3CargarAtencionesBusqueda() {
  if (Sp3ValidarDatos('input_am_anexar').length > 1) {
    return;
  }

  $('#am_spin_anexar').show();

  let data = {};
  data.IdHistoriaClinica = idHC;
  data.CodigoAtencionMedica = $('#dat_am_codigo_anexar').val();
  data.FechaAtencion = $('#dat_am_fecha_anexar').val();

  let url = apiUrlsho+`/api/hce_Get_045_anexar_atencion_medica_busqueda?code=76T/DbcMV7JDKdAgyZ2FVR2YYbRCl7G/eAgFBtpUhDz8CSf3Ty5F0w==`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "get",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers,
    "data": data
  };

  return $.ajax(settings).done((response) => {
    amSp3MostrarAtencionesBusqueda(response.AtencionMedica);
  })
}

function amSp3MostrarAtencionesBusqueda(data) {
  $('#am_spin_anexar').hide();
  let result = $('#result_am_anexar');
  let content = $('#content_am_anexar');

  $('.input_am_anexar').removeClass('is-invalid');

  content.html('');
  result.hide();
  if (data.length > 0) {
    $('#cant_am_anexar').parent().parent().show();
    $('#cant_am_anexar').text(`${data.length} Registros`)
    result.show();
    data.slice(data.length - 2)

    data.forEach((e) => {
      content.append(`
        <div class="col-12 mt-3">
          <div class="input-box-secondary result_anexo" id="item_am_result_anexar_${e.IdAM}">
            <span>Atención: ${e.CodigoAtencionMedica}</span>
            <input type="text" readonly value="${date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(e.FechaAtencion)}" style="cursor: pointer" onclick="amSp3AgregarAnexada(${e.IdAM})">
          </div>
        </div>
      `)
    })
  } else {
    $('#cant_am_anexar').parent().parent().hide();
    result.show();
    content.append(`
      <div class="col-12 mt-3">
        <div class="alert alert-danger mt-4" role="alert">
          No Existen registros
          <span>
            <img src="./images/sho/advertencia.svg" alt="" width="18px">
          </span>
        </div>
      </div>
    `)
  }
}

function amSp3CargarAtencionAnexada() {
  let url = apiUrlsho+`/api/hce_Get_025_anexar_atencion_medica?code=SA7Ytav9aIcnxWC93xNimtwe4nKy8tLr2V19OXAoENFt7RwaS5BCww==`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "get",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers,
    "data": { "IdAtencionMedica": idAM }
  };

  return $.ajax(settings).done((response) => {
    // console.log(response);
    paObj_am[idAM].Atencion.AnexarAtencionMedica = response.AnexarAtencionMedica;
    let data = response.AnexarAtencionMedica[0];
    if (data) {
      $('.dat_am_atencion_anexada').show();
      $('#text_am_anexar_atencion').show();
      $('#btn_am_anexar_atencion').hide();
      $('#btn_am_desanexar_atencion').show();
      $('.input_am_consulta').attr('disabled', true);
      $('#dat_am_codigo_consulta').val(data.CodigoAtencion);
      $('#dat_am_fecha_consulta').val(data.AnexoFechaAtencionMedica.split('T')[0]);
    } else {
      amSp3MostrarAnexarAtencion();
    }
  })
}

async function amSp3MostrarAtencionesAnexadas() {
  let data = paObj_am[idAM].Atencion.AnexarAtencionMedica;

  if (data.length > 0) {
    await amSp3CargarDescansosAnexados(data[0].IdAnexoAtencionMedica);
    amSp3CargarDiagnosticosAnexados(data[0].IdAnexoAtencionMedica);
  }
}

function amSp3GuardarAtencionesMedicasAnexadas(alldata) {
  let data = {};
  data.IdAtencionMedica = idAM;
  data.IdAnexoAtencionMedica = alldata.IdAM;
  data.CodigoAtencion = alldata.CodigoAtencionMedica;
  data.AnexoFechaAtencionMedica = alldata.FechaAtencion;

  let url = apiUrlsho+`/api/hce_Post_035_anexar_atencion_medica?code=tYD4ZZ0aFLd6NOnlb7k9f0wehUO5VkVFWNVzJ2ZvQva4GNaylLGJzQ==&httpmethod=post`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "post",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers,
    "data": JSON.stringify(data)
  };

  return $.ajax(settings).done((response) => {
    Swal.fire({
      title: "Atención anexada con éxito",
      iconColor: "#8fbb02",
      iconHtml: '<img src="./images/sho/check.svg" width="28px">',
      showConfirmButton: false,
      padding: "3em 3em 6em 3em ",
      timer: 1500,
    })
  })
}

function amSp3CargarDescansosAnexados(IdAM) {
  $('#am_spin_descanso').show();
  let url = apiUrlsho+`/api/hce_Get_052_atencion_medica_descansoMedico?code=AjVMhhvEt4EGa8yGaqByyhAa0PY3P9SuJpDGdX8ISK7BkNJCBYKCng==`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "get",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers,
    "data": { "IdAtencionMedica": IdAM }
  };

  return $.ajax(settings).done((response) => {
    // console.log(response);
    amSp3MostrarDescansoAnexados(response.DescansoMedico);
  })
}

function amSp3MostrarDescansoAnexados(alldata) {
  $('#am_spin_descanso').hide();
  let table = $('#table_am_descanso');
  let content = $('#table_content_am_descanso');
  let info = $('#info_table_content_am_descanso');
  let cantidad = $('#dat_am_cantidad_descanso');
  let diasAcumulados = $('#dat_am_cantidad_dias_acumulados_descanso');

  content.html('');
  info.html('');


  if (alldata.length > 0) {
    $('#am_descansos_anexados').show();
    cantidad.parent().parent().show();
    cantidad.text(`${alldata.length} Registros`);

    let cantidadAcumulados = 0;

    alldata.forEach((e) => {
      cantidadAcumulados += e.B_DiasAcumulados;
    })

    diasAcumulados.text(`${cantidadAcumulados} días acumulados`)

    $('#am_pagination_descansos').pagination({
      dataSource: alldata,
      pageSize: 4,
      callback: (data, pagination) => {
        content.html('');
        data.forEach((e) => {
          content.append(`
            <tr>
              <td><span>${e.B_CantidadDias}</span></td>
              <td><span>${e.B_DiasAcumulados}</span></td>
              <td><span>${date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(e.B_FechaIni)}</span></td>
              <td><span>${date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(e.B_FechaFin)}</span></td>
              <td><span>${(e.B_HuboAltaMedica == 1) ? 'Si' : 'No'}</span></td>
              <td><span>${e.DescripcionEstabDescanso}</span></td>
              <td><span>${e.B_Particular}</span></td>
              <td>
                <div class="dropdown float-right dropleft">
                  <div class="more-info" id="item_am_descansos" data-toggle="dropdown">
                    <img src="images/iconos/menu_responsive.svg" alt="" />
                  </div>
                  <div class="dropdown-menu" aria-labelledby="item_am_descansos">
                    <ul>
                      <li onclick="alert('ver descanso ${e.Id}')">
                        <img src="./images/sho/eyeIcon.svg" />
                        <span>Ver descanso médico</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          `)
        })
      }
    })
  } else {
    cantidad.parent().parent().hide();
    info.html(`
      <div class="alert alert-danger mt-4" role="alert">
        No Existen registros
        <span>
          <img src="./images/sho/advertencia.svg" alt="" width="18px">
        </span>
      </div>
    `)
  }
}

function amSp3AgregarAnexada(id) {
  let data = paObj_am[idAM].Atencion.AnexarAtencionMedica = [];
  $(`.result_anexo`).removeClass('active');
  $(`#item_am_result_anexar_${id}`).addClass('active');

  paObj_am[idAM].a.AtencionMedica.forEach((e) => {
    if (id == e.IdAM) {
      data.push(e);
    }
  })

}

// DATOS DEL TRABAJADOR
function amSp3DatosHistoriaTrabajadorClinica() {
  let datos = paObj_hc[idHC].a;
  $('#dat_am_dni_trabajador').val(datos.NroDocumento_Trabajador_H);
  $('#dat_am_nombres_trabajador').val(datos.Nombres_Trabajador_H);
  $('#dat_am_apellidos_trabajador').val(datos.Apellidos_Trabajador_H);
  $('#dat_am_fecha_trabajador').val('1994-08-12'); //dato faltante en actualizacion de datos
  $('#dat_am_edad_trabajador').val(datos.Edad_Trabajador_H);
  $('#dat_am_fecha_ingreso').val(datos.A_FechaIngresoTasa.split('T')[0]);
  $('#dat_am_fecha_retiro').val('2021-03-21'); //dato faltante

  gruposSanguineos.forEach((e) => {
    if (e.Id == datos.A_GrupoSanguineo) {
      $('#dat_am_grupo_sanguineo').append(`
        <option value="${e.Id}" selected>${e.Descripcion}</option>
      `)
    }
    // else { //agregado para hacer el guardado datos modificados
    //   $('#dat_am_grupo_sanguineo').append(`
    //     <option value="1" selected>O Positivo</option>
    //   `)
    // }
  })

  sedeAreaGerencia.Gerencia.forEach((e) => {
    if (e.Id == datos.GerenciaId_Empresa_H) {
      $('#dat_am_gerencia_trabajador').append(`
        <option value="${e.Id}" selected>${e.Description}</option>
      `)
    }
  })

  sedeAreaGerencia.Sedes.forEach((e) => {
    if (e.Id == datos.PlantaId_Empresa_H) {
      $('#dat_am_planta_trabajador').append(`
        <option value="${e.Id}" selected>${e.Description}</option>
      `)
    }
  })

  sedeAreaGerencia.Area.forEach((e) => {
    if (e.Id == datos.AreaId_Empresa_H) {
      $('#dat_am_area_trabajador').append(`
        <option value="${e.Id}" selected>${e.Description}</option>
      `)
    }
  })

  $('#dat_am_puesto_trabajo_trabajador').val(datos.PuestoTrabajo_Empresa_H);

  // signos vitales
  // $('#dat_am_presion_arterial_sv').val(datos.PresionArterial_SV);
  // $('#dat_am_frecuencia_cardiaca_sv').val(datos.FrecuenciaCardiaca_SV);
  // $('#dat_am_frecuencia_respiratoria_sv').val(datos.FrecuenciaRespiratoria_SV);
  // $('#dat_am_temperatura_sv').val(datos.Temperatura_SV);
  // $('#dat_am_peso_sv').val(datos.PesoKg_SV);
  // $('#dat_am_talla_sv').val(datos.Talla_SV);
  // $('#dat_am_saturacion_sv').val(datos.Saturacion_SV);
  // $('#dat_am_masa_corporal_sv').val(datos.IndiceMasaCorporal_SV);
  // $('#dat_am_perimetro_abdominal_sv').val(datos.PerimetroAbdominal_SV);

  // detalle del descanso
  let datosUsuario = JSON.parse(localStorage.usuario);
  $('#dat_am_personal_descanso').val(datosUsuario.fullusername); //datos extraido de la tabla datos del usuario
}

function amSp3VerDatosCompletoTrabajador() {
  let datos = paObj_hc[idHC].a;
  Swal.fire({
    title: "Datos del trabajador",
    html: `
      <div class="text-left">
        <div class="row my-3">
          <div class="col-12">
            <span class="float-left" style="font-size: 20px; font-weight: 600; color: #254373">Datos Principales</span>
          </div>
        </div>
        <div class="row my-3" style="font-size: 15px">
          <div class="col-4">
            <span style="color: #254373"><b>Documento: </b></span>
            <span>${datos.NroDocumento_Trabajador_H}</span>
          </div>
          <div class="col-4">
            <span style="color: #254373"><b>Nombres: </b></span>
            <span>${datos.Nombres_Trabajador_H}</span>
          </div>
          <div class="col-4">
            <span style="color: #254373"><b>Apellidos: </b></span>
            <span>${datos.Apellidos_Trabajador_H}</span>
          </div>
        </div>
        <div class="row my-3" style="font-size: 15px">
          <div class="col-4">
            <span style="color: #254373"><b>C.Colaborador: </b></span>
            <span>${datos.CodigoColaborador_Trabajador_H}</span>
          </div>
          <div class="col-4">
            <span style="color: #254373"><b>Telefono: </b></span>
            <span>${datos.Telefono_Trabajador_H}</span>
          </div>
          <div class="col-4">
            <span style="color: #254373"><b>Sexo: </b></span>
            <span>${(datos.Sexo_Trabajador_H == 1) ? 'Masculino' : 'Femenino'}</span>
          </div>
        </div>
        <div class="row my-3" style="font-size: 15px">
          <div class="col-12">
            <span style="color: #254373"><b>Dirección: </b></span>
            <span>${datos.Direccion_Trabajador_H}</span>
          </div>
        </div>
        <div class="row my-3" style="font-size: 15px">
          <div class="col-4">
            <span style="color: #254373"><b>F.Nacimiento: </b></span>
            <span>${datos.fecha_nacimiento}</span>
          </div>
          <div class="col-4">
            <span style="color: #254373"><b>Edad: </b></span>
            <span>${datos.Edad_Trabajador_H}</span>
          </div>
        </div>
        <hr class="my-4">
        <div class="row my-3">
          <div class="col-12">
            <span class="float-left" style="font-size: 20px; font-weight: 600; color: #254373">Datos de la empresa</span>
          </div>
        </div>
        <div class="row my-3" style="font-size: 15px">
          <div class="col-4">
            <span style="color: #254373"><b>Sede: </b></span>
            <span>${$('#dat_am_planta_trabajador').text()}</span>
          </div>
          <div class="col-4">
            <span style="color: #254373"><b>Área: </b></span>
            <span>${$('#dat_am_area_trabajador').text()}</span>
          </div>
          <div class="col-4">
            <span style="color: #254373"><b>Cargo: </b></span>
            <span>${datos.CargoJefe_Empresa_H}</span>
          </div>
        </div>
        <div class="row my-3" style="font-size: 15px">
          <div class="col-4">
            <span style="color: #254373"><b>Jefe inmediato: </b></span>
            <span>${datos.JefeInmediato_Empresa_H}</span>
          </div>
          <div class="col-4">
            <span style="color: #254373"><b>Celular: </b></span>
            <span>${datos.Celular_Empresa_H}</span>
          </div>
          <div class="col-4">
            <span style="color: #254373"><b>Telefono: </b></span>
            <span>${datos.Telefono_Empresa_H}</span>
          </div>
        </div>
      </div>            
    `,
    iconHtml: '<img src="./images/sho/perfil.svg">',
    width: 800,
    showCancelButton: true,
    showConfirmButton: false,
    cancelButtonColor: "#ff3636",
    cancelButtonText: `Cancelar <img src="./images/sho/cancelar.svg">`,
  })
  $('.swal2-cancel').css('width', '200px');
  $('.swal2-html-container').css('overflow', 'visible');
}

// INSIDENCIA
function amSp3RelacionOcupacionalIncidencia() {
  let check = $('input:radio[name=relacion_ocupacional_am]:checked').val();
  if (check == 1) {
    $('#am_incidencia_content').show();
    $('#am_incidencia_content').css('opacity', 1);
  } else {
    $('#am_incidencia_content').hide();
    $('#am_incidencia_content').css('opacity', 0);
  }
}

function amSp3CargarIncidencia() {
  $('#am_spin_incidencia').show();
  let url = apiUrlsho+`/api/hce_Get_024_atencion_medica_incidencia_riesgoSO?code=b2efQXsEqdygDNLDjMG39jVg4yuKjEefuYUrWuQ/fkv3Mu473vQBNw==`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "get",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers,
    "data": { "IdAtencionMedica": idAM }
  };

  return $.ajax(settings).done((response) => {
    paObj_am[idAM].a.AtencMedIncidenciaRiesgo = response.AtencMedIncidenciaRiesgo;
    amSp3MostrarIncidencia();
  })
}

function amSp3MostrarIncidencia() {
  $('#am_spin_incidencia').hide();
  let table = $('#table_am_incidencia');
  let content = $('#table_content_am_incidencia');
  let info = $('#info_table_content_am_incidencia');
  let data = paObj_am[idAM].a;

  content.html('');
  $('#dat_am_cantidad_incidencia').text(`${data.AtencMedIncidenciaRiesgo.length} Registros`);

  if (data.AtencMedIncidenciaRiesgo.length > 0) {
    data.AtencMedIncidenciaRiesgo.forEach((e) => {

      let botones = '';

      if (tipoVerAtencion == 1) {
        botones = `
          <!-- colocar display none al spiner -->
          <button type="button" class="btn btn-link shadow-none float-right" style="display: none" id="spin_am_eliminar_incidencia_${e.Id}">
            <div class="spinner-border text-danger spinner-border-sm" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </button>
          <button type="button" id="btn_am_eliminar_incidencia_${e.Id}" class="btn btn-link shadow-none float-right" onclick="amSp3EliminarIncidencia(${e.Id})">
            <img src="./images/sho/delete.svg" alt="">
          </button>
        `
      }
      content.append(`
      <tr>
        <td>
          <span>${date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(e.CreadoFecha)}</span>
        </td>
        <td>
          <span>${e.ComentarioIncidencia}</span>
        </td>
        <td>
          ${botones}
        </td>
      </tr>
    `)
    })
    info.html(`      
      <div class="alert alert-danger mt-4" role="alerta">
        Incidencia registrada
        <span>
          <img src="./images/sho/advertencia.svg" alt="" width="18px">
        </span>
      </div>      
    `)

    $('#btn_am_incidencia_registrar').attr('disabled', true);
    $('#dat_am_comentario_incidencia').attr('disabled', true);
  } else {
    $('#btn_am_incidencia_registrar').removeAttr('disabled');
    $('#dat_am_comentario_incidencia').removeAttr('disabled');
    info.html(`
      <div class="alert alert-danger mt-4" role="alert">
        No hay incidencia registrada
        <span>
          <img src="./images/sho/advertencia.svg" alt="" width="18px">
        </span>
      </div>
    `)
  }
}

function amSp3GuardarIncidencia() {
  if (Sp3ValidarDatos('input_am_incidencia').length > 0) {
    return;
  }

  let data = {};
  data.IdAtencionMedica = idAM;
  data.ComentarioIncidencia = $('#dat_am_comentario_incidencia').val();

  let url = apiUrlsho+`/api/hce_Post_033_atencion_medica_incidencia_riesgoSO?code=H7tNXrn5OMEaFH6kfJ2aLUPmmpLOdt8uy6OYGZrggqlsbzGg4pfGFw==&httpmethod=post`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "post",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers,
    "data": JSON.stringify(data)
  };

  return $.ajax(settings).done((response) => {
    $('#dat_am_comentario_incidencia').val('');
    amSp3CargarIncidencia();
  })

}

function amSp3EliminarIncidencia(id) {
  $(`#spin_am_eliminar_incidencia_${id}`).show();
  $(`#btn_am_eliminar_incidencia_${id}`).hide();

  let data = {};
  data.IdAtencionMedica = idAM;
  data.IdIncidRiesgoSO = id;

  let url = apiUrlsho+`/api/hce_Post_034_atencion_medica_incidencia_riesgoSO_eliminadoLogico?code=YobyHvwbTKgUGyBKwA1XijYGgE0koAs4RM9YkrtSFq6INYQ8Od8afQ==&httpmethod=post`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "post",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers,
    "data": JSON.stringify(data)
  };

  return $.ajax(settings).done((response) => {
    amSp3CargarIncidencia();
  })
}

// DATOS DE CONSULTA

function amSp3CargarMotivosAtencion() {
  let url = apiUrlsho+`/api/hce_Get_033_motivo_atencion?code=fygOdQb397upJyZ4t98BGpLbGy3GftGc50RLnRkdcvBts03XlqdKXA==`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "get",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers
  };

  return $.ajax(settings).done((response) => {
    console.log(response);
    paObj_am.MotivoAtencion = response.MotivoAtencion;
    amSp3MostrarMotivosAtencion();
  })
}

function amSp3MostrarMotivosAtencion() {
  let data = paObj_am.MotivoAtencion;
  let content = $('#dat_am_motivo_consulta');

  content.html('');
  content.append(`
    <option value=""></option>
  `)
  data.forEach((e) => {
    content.append(`
      <option value="${e.Id}">${e.Descripcion}</option>
    `)
  })
}

function amSp3MostrarAnexarAtencion() {
  let id = $('#dat_am_motivo_consulta').val();

  if (id >= 8 && id <= 12) {
    $('#btn_am_anexar_atencion').show();
  } else {
    $('#btn_am_anexar_atencion').hide();
  }
}

// OTROS
function amSp3CargarTipoEvaluacion() {
  let url = apiUrlsho+`/api/hce_Get_038_tipo_evaluacion?code=pUx9Oqqpa38aZUsMFjCWKtWdHRye9xt09iP96l1I8cr74brX02Wdow==`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "get",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers
  };

  return $.ajax(settings).done((response) => {
    // console.log(response);
    paObj_am.TipoEvaluacion = response.TipoEvaluacion;
    amSp3MostrarTipoEvaluacion();
  })
}

function amSp3MostrarTipoEvaluacion() {
  let data = paObj_am.TipoEvaluacion;
  let content = $('#dat_am_tipo_evaluacion_otros');

  content.html('');
  content.append(`
    <option value=""></option>
  `)
  data.forEach((e) => {
    content.append(`
      <option value="${e.Id}">${e.Descripcion}</option>
    `)
  })
}

function amSp3CargarOtros() {
  $('#am_spin_otros').show();
  let url = apiUrlsho+`/api/hce_Get_026_atencion_medica_otros_tipo_evaluacion?code=BXjq3i14mwwa/QMg/UWlABPLObnOyqdG/nTe0P9DuyZiYDM3opk9KQ==`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "get",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers,
    "data": { "IdAtencionMedica": idAM }
  };

  return $.ajax(settings).done((response) => {
    // console.log(response);
    paObj_am[idAM].a.AtencMedOtrosTipoEvaluacion = response.AtencMedOtrosTipoEvaluacion;
    amSp3MostrarOtros();
  })
}

function amSp3MostrarOtros() {
  $('#am_spin_otros').hide();
  let table = $('#table_am_otros');
  let content = $('#table_content_am_otros');
  let info = $('#info_table_content_am_otros');
  let data = paObj_am[idAM].a;
  let cantidad = $('#dat_am_cantidad_otros');

  content.html('');
  info.html('');


  if (data.AtencMedOtrosTipoEvaluacion.length > 0) {
    cantidad.parent().parent().show();
    cantidad.text(`${data.AtencMedOtrosTipoEvaluacion.length} Registros`);
    data.AtencMedOtrosTipoEvaluacion.forEach((e) => {
      let tipoEvaluacion = '';
      paObj_am.TipoEvaluacion.forEach((i) => {
        if (i.Id == e.IdTipoEvaluacion) {
          tipoEvaluacion = i.Descripcion;
        }
      })

      let botones = '';

      if (tipoVerAtencion == 1) {
        botones = `
          <!-- colocar display none al spiner -->
          <button type="button" class="btn btn-link shadow-none float-right" style="display: none" id="spin_am_eliminar_otros_${e.Id}">
            <div class="spinner-border text-danger spinner-border-sm" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </button>
          <button type="button" id="btn_am_eliminar_otros_${e.Id}" class="btn btn-link shadow-none float-right" onclick="amSp3EliminarOtros(${e.Id})">
            <img src="./images/sho/delete.svg" alt="">
          </button>
        `
      }

      content.append(`
      <tr>
        <td>
          <span>${tipoEvaluacion}</span>
        </td>
        <td>
          <span>${e.Detalle}</span>
        </td>
        <td>
          ${botones}
        </td>
      </tr>
    `)
    })
  } else {
    cantidad.parent().parent().hide();
    info.html(`
      <div class="alert alert-danger mt-4" role="alert">
        No Existen registros
        <span>
          <img src="./images/sho/advertencia.svg" alt="" width="18px">
        </span>
      </div>
    `)
  }
}

function amSp3GuardarOtros() {
  if (Sp3ValidarDatos('input_am_otros').length > 0) {
    return;
  }

  let data = {};
  data.IdAtencionMedica = idAM;
  data.IdTipoEvaluacion = $('#dat_am_tipo_evaluacion_otros').val();
  data.Detalle = $('#dat_am_datalle_otros').val();

  let url = apiUrlsho+`/api/hce_Post_037_atencion_medica_otros_tipo_evaluacion?code=8V9Oq19aOJAnVeXx0tVqI1YjHalR49vNMdLkVogR6BrkY6vgd8lmcw==&httpmethod=post`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "post",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers,
    "data": JSON.stringify(data)
  };

  return $.ajax(settings).done((response) => {
    $('#dat_am_tipo_evaluacion_otros').val('');
    $('#dat_am_datalle_otros').val('');
    amSp3CargarOtros();
  })

}

function amSp3EliminarOtros(id) {
  $(`#spin_am_eliminar_otros_${id}`).show();
  $(`#btn_am_eliminar_otros_${id}`).hide();

  let data = {};
  data.IdAtencionMedica = idAM;
  data.IdOtroTipEval = id;

  let url = apiUrlsho+`/api/hce_Post_038_atencion_medica_otros_tipo_evaluacion_eliminadoLogico?code=cA01s3anhDCg4tufbN7B6r397lzkqFGo0bg3SglknWbTxZbBOy5JQw==&httpmethod=post`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "post",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers,
    "data": JSON.stringify(data)
  };

  return $.ajax(settings).done((response) => {
    amSp3CargarOtros();
  })
}

// DIAGNOSTICOS

function amSp3CargarTiposDiagnostico() {
  // servicio solo trae 100 primero;

  let url = apiUrlsho+`/api/hce_Get_021_CIE10_busqueda?code=Kr7q88AoJqtcFZLAx3w8cS7kZ8ezNaxCr/YUbbfUMvEQH1zUvDsxjg==&IdCIE10=1&Descripcion`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "get",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers
  };

  return $.ajax(settings).done((response) => {
    // console.log(response);
    paObj_am.TiposDiagnosticos = response.CEI10;
    amSp3MostrarTiposDiagnostico();
  })
}

function amSp3MostrarTiposDiagnostico() {
  let data = paObj_am.TiposDiagnosticos;
  let content = $('#dat_am_cie_diagnostico');

  content.html('');
  content.append(`
    <option value=""></option>
  `)
  data.forEach((e) => {
    content.append(`
      <option value="${e.Id}">${e.Descripcion}</option>
    `)
  })
}

function amSp3CargarSistemaAfectado() {
  let url = apiUrlsho+`/api/hce_Get_034_sistema_afectado?code=qxkQ9ZXSLatmcpaCr044BU0xgBGcMRX899c8sjilL/dCTIgHf4HyVg==`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "get",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers
  };

  return $.ajax(settings).done((response) => {
    // console.log(response);
    paObj_am.SistemaAfectado = response.SistemaAfectado;
    amSp3MostrarSistemaAfectado();
  })
}

function amSp3MostrarSistemaAfectado() {
  let data = paObj_am.SistemaAfectado;
  let content = $('#dat_am_sistema_diagnostico');

  content.html('');
  // content.append(`
  //   <option value=""></option>
  // `)
  data.forEach((e) => {
    content.append(`
      <option value="${e.Id}">${e.Descripcion}</option>
    `)
  })

  content.val(15);
}

function amSp3CargarSeccionAfectada() {
  let url = apiUrlsho+`/api/hce_Get_035_seccion_afectada?code=7waSycbZnJkX12509pMvTJINkreJkBBQCrsMZNYeY6R5AayCauB5nQ==`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "get",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers
  };

  return $.ajax(settings).done((response) => {
    // console.log(response);
    paObj_am.SeccionAfectada = response.SeccionAfectada;
    amSp3MostrarSeccionAfectada();
  })
}

function amSp3MostrarSeccionAfectada() {
  let data = paObj_am.SeccionAfectada;
  let content = $('#dat_am_seccion_diagnostico');

  content.html('');
  // content.append(`
  //   <option value=""></option>
  // `)
  data.forEach((e) => {
    content.append(`
      <option value="${e.Id}">${e.Descripcion}</option>
    `)
  })

  content.val(11);
}

function amSp3CargarDiagnosticos() {
  $('#int_spin_diagnostico').show();
  let url = apiUrlsho+`/api/hce_Get_027_atencion_medica_diagnosticoCIE10?code=DiTn5Z7e40Jl4dqkka2ZZJQAKt8PVyB7qM2ygVB5G6HaARQG5Jx0dw==`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "get",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers,
    "data": { "IdAtencionMedica": idAM }
  };

  return $.ajax(settings).done((response) => {
    // console.log(response);
    paObj_am[idAM].a.DiagnosticoCIE = response.DiagnosticoCIE;
    amSp3MostrarDiagnostico();
  })
}

function amSp3CargarDiagnosticosAnexados(IdAM) {
  $('#am_spin_diagnosticos_anexados').show();
  let url = apiUrlsho+`/api/hce_Get_027_atencion_medica_diagnosticoCIE10?code=DiTn5Z7e40Jl4dqkka2ZZJQAKt8PVyB7qM2ygVB5G6HaARQG5Jx0dw==`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "get",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers,
    "data": { "IdAtencionMedica": IdAM }
  };

  return $.ajax(settings).done((response) => {
    // console.log(response);
    paObj_am[idAM].a.DiagnosticoCIE_Anexados = response.DiagnosticoCIE;
    amSp3MostrarDiagnosticosAnexados();
  })
}


var diag_AM = '';

function amSp3MostrarDiagnostico() {

   diag_AM = '';
  $('#int_spin_diagnostico').hide();
  let table = $('#table_am_diagnostico');
  let content = $('#table_content_am_diagnostico');
  let info = $('#info_table_content_am_diagnostico');
  let data = paObj_am[idAM].a;

  content.html('');
  info.html('');
  $('#dat_am_cantidad_diagnostico').text(`${data.DiagnosticoCIE.length} Registros`);

    


  if (data.DiagnosticoCIE.length > 0) {
     data.DiagnosticoCIE.forEach((e) => {
      let tipoDiagnostico = '';
      let especialidad = '';
      let sistema = '';
      let seccion = '';
      
         tipoDiagnostico = e.Code_D;
         especialidad = e.Especilidades;
         sistema = e.SistemaAfectado_D
         seccion = e.SeccionAfectada_D
      console.log('estamos aqui  ,e.CIE10 = ',e.CIE10)

     // paObj_am.TiposDiagnosticos.forEach((i) => {

        


        //alert('aaaaaaaaaa estamos aqui 1262 id = '+i.Id);
        //alert('aaaaaaaaaa estamos aqui 1262 id = '+e.CIE10);

      //   if (i.Id == e.CIE10) {
      //     tipoDiagnostico = i.Code;
      //     especialidad = i.Especilidades;
      //   }
      // })

      // paObj_am.SistemaAfectado.forEach((i) => {
      //   if (i.Id == e.SistemaAfectado) {
      //     sistema = i.Descripcion;
      //   }
      // })

      // paObj_am.SeccionAfectada.forEach((i) => {
      //   if (i.Id == e.SeccionAfectada) {
      //     seccion = i.Descripcion;
      //   }
      // })

      let botones = '';

     

    

      if (tipoVerAtencion == 1) {
        botones = `
          <div class="dropdown float-right dropleft">
            <div class="more-info" id="item_am_diagnostico_1" data-toggle="dropdown">
              <img src="images/iconos/menu_responsive.svg" alt="" />
            </div>
            <div class="dropdown-menu" aria-labelledby="item_am_diagnostico_1">
              <ul>
                <li onclick="amSp3EliminarDiagnostico(${e.Id})">
                  <img src="./images/sho/delete.svg" alt="">
                  <span>Eliminar</span>
                </li>
              </ul>
            </div>
          </div>
        `
      }


  diag_AM = diag_AM+' '+e.Diagnostico//+' '+tipoDiagnostico+', ';


      content.append(`
      <tr>
        <td>${e.Diagnostico}</td>
        <td>${tipoDiagnostico}</td>
        <td>${date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(e.CreadoFecha)}</td>
        <td>${especialidad}</td>
        <td>${sistema}</td>
        <td>${seccion}</td>
        <td>
          ${botones}
        </td>
      </tr>
    `)
    })
  } else {
    info.html(`
      <div class="alert alert-danger mt-4" role="alert">
        No Existen registros
        <span>
          <img src="./images/sho/advertencia.svg" alt="" width="18px">
        </span>
      </div>
    `)
  }
}

function amSp3MostrarDiagnosticosAnexados() {
  $('#am_spin_diagnosticos_anexados').hide();
  let table = $('#table_am_diagnosticos_anexados');
  let content = $('#table_content_am_diagnosticos_anexados');
  let info = $('#info_table_content_am_diagnosticos_anexados');
  let data = paObj_am[idAM].a;

  content.html('');
  info.html('');
  $('#dat_am_cantidad_diagnosticos_anexados').text(`${data.DiagnosticoCIE_Anexados.length} Registros`);

  if (data.DiagnosticoCIE_Anexados.length > 0) {
    $('#am_diagnosticos_anexados').show();
    data.DiagnosticoCIE_Anexados.forEach((e) => {
      let tipoDiagnostico = '';
      let especialidad = '';
      let sistema = '';
      let seccion = '';
           

         tipoDiagnostico = e.Code_D;
         especialidad = e.Especilidades;
         sistema = e.SistemaAfectado_D;
         seccion = e.SeccionAfectada_D;



      // paObj_am.TiposDiagnosticos.forEach((i) => {
      //   if (i.Id == e.CIE10) {
      //     tipoDiagnostico = i.Descripcion;
      //     especialidad = i.Especilidades;
      //   }
      // })

      // paObj_am.SistemaAfectado.forEach((i) => {
      //   if (i.Id == e.SistemaAfectado) {
      //     sistema = i.Descripcion;
      //   }
      // })

      // paObj_am.SeccionAfectada.forEach((i) => {
      //   if (i.Id == e.SeccionAfectada) {
      //     seccion = i.Descripcion;
      //   }
      // })



      content.append(`
      <tr>
        <td>${e.Diagnostico}</td>
        <td>${tipoDiagnostico}</td>
        <td>${date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(e.CreadoFecha)}</td>
        <td>${especialidad}</td>
        <td>${sistema}</td>
        <td>${seccion}</td>
        <td>
          <div class="dropdown float-right dropleft">
            <div class="more-info" id="item_am_diagnostico_1" data-toggle="dropdown">
              <img src="images/iconos/menu_responsive.svg" alt="" />
            </div>
            <div class="dropdown-menu" aria-labelledby="item_am_diagnostico_1">
              <ul>
                <li onclick="amSp3GuardarDiagnostico(1, ${e.Id})">
                  <img src="./images/sho/anterior.svg" alt="">
                  <span>Validar diagnostico anterior</span>
                </li>
              </ul>
            </div>
          </div>
        </td>
      </tr>
    `)
    })
  } else {
    info.html(`
      <div class="alert alert-danger mt-4" role="alert">
        No Existen registros
        <span>
          <img src="./images/sho/advertencia.svg" alt="" width="18px">
        </span>
      </div>
    `)
  }
}

function amSp3GuardarDiagnostico(anexado, id) {

  //alert('soyyyyyyyyyyyyyyyyyyy = '+anexado);
 // alert('soyyyyyyyyyyyyyyyyyyy = '+id);
  let data = {};
  data.IdAtencionMedica = idAM;
  data.IdHashUser = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);

  if (anexado == 1) {
    paObj_am[idAM].a.DiagnosticoCIE_Anexados.forEach((e) => {
      if (e.Id == id) {

        //alert('yo entre fue aqui perro')
        data.Diagnostico = e.Diagnostico;
        data.CIE10 = e.CIE10;
        data.SistemaAfectado = e.SistemaAfectado;
        data.SeccionAfectada = e.SeccionAfectada;
      }
    })
  } else {

    if (Sp3ValidarDatos('input_am_diagnostico').length > 0) {
      return;
    }

    data.Diagnostico = $('#dat_am_diagnostico_diagnostico').val();
    //data.CIE10 = $('#dat_am_cie_diagnostico').val();
    data.CIE10 = $('#dat_am_cie_diagnostico1').val();
    data.SistemaAfectado = $('#dat_am_sistema_diagnostico').val();
    data.SeccionAfectada = $('#dat_am_seccion_diagnostico').val();
  }

   console.log('linea 1423..................', data)

  let url = apiUrlsho+`/api/hce_Post_039_atencion_medica_diagnosticoCIE10?code=5OUIN8LUMVwYEwaAjL1gCHOrCnnef/OhwhfEOygTNVZt98OUw/Tpiw==&httpmethod=post`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "post",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers,
    "data": JSON.stringify(data)
  };

  return $.ajax(settings).done((response) => {
    $('#dat_am_diagnostico_diagnostico').val('');
    $('#dat_am_cie_diagnostico2').val('');//dat_am_cie_diagnostico1
    $('#dat_am_sistema_diagnostico').val(15);
    $('#dat_am_seccion_diagnostico').val(11);


    amSp3CargarDiagnosticos();

    //--------------------------------------------VAMOS A CARGAR LOS CIE10 para el descanso medico -------------------------------------
      //alert('aqui vamos a guardar')

      let a =  data.Diagnostico;//$('#dat_des_diagnostico_v').val();
      let b =  data.CIE10; //$('#dat_am_cie_diagnostico1').val(); // let b = $('#dat_des_cie10_v').val();
      
      let c = data.SistemaAfectado; //$('#dat_des_sis_afectado_v').val();
      let d =  data.SeccionAfectada; //$('#dat_des_sec_afectada_v').val();


     let body =  {
        "IdDescansoMedico":id_DM,
        "TransferenciaId2":0,

        "Diagnostico":a,
        "CIE10":b,
        "IdHashUser":getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
        "SistemaAfectado":c,
        "SeccionAfectada":d
    }

               var url = apiUrlsho+"/api/hce_Post_024_descanso_medico_diagnosticoCIE10?code=aN5mlWKDseFSRycTtVpr2bh6tWq4qzDff0qeQvcPmPImyOvd9PcxGA==&httpmethod=post";

               console.log('urlr:', url)

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
               }).done(function (data)
               {

                   console.log('despues crear lista cie10',data);
                   if(data.Id > 0)
                   { console.log('se asocio el cie10 al descanso medico = '+data.Id ); }

               })
               .fail(function( jqXHR, textStatus, errorThrown ) {

                   ///verModalError('Al Cargar la', 'Intente Nuevamente');
                    Swal.fire({
                                      icon: 'error',
                                      title: 'Error',
                                      text: 'Error al al cargar, intente nuevamente',
                                      footer: '<a href="">Why do I have this issue?</a>'
                                    })
                 
               })
               .always(function( jqXHR, textStatus, errorThrown ) {

               });



    //--------------------------------------------VAMOS A CARGAR LOS CIE10 para el descanso medico -------------------------------------


  })
}

function amSp3EliminarDiagnostico(id) {
  let data = {};
  data.IdAtencionMedica = idAM;
  data.IdDiagnosticoCIE10 = id;

  let url = apiUrlsho+`/api/hce_Post_040_atencion_medica_diagnosticoCIE10_eliminadoLogico?code=cUZXz6ALuhgHoBagqJ6sXGytVe0KNfqrja95aT1Uy60yX9LgLHqfcw==&httpmethod=post`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "post",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers,
    "data": JSON.stringify(data)
  };

  return $.ajax(settings).done((response) => {
    amSp3CargarDiagnosticos();
  })
}

// DETALLE DEL DESCANSO
function amSp3MostrarParticular() {
  let id = $('#dat_am_establecimineto_descanso').val();
  if (id == 4) {
    $('#dat_am_particular_descanso').removeAttr('disabled');
  } else {
    $('#dat_am_particular_descanso').attr('disabled', true);
  }
}

function amSp3CalcularDiasAcumulados() {
  let cantidadDias = Number($('#dat_am_cantidad_dias_descanso').val()) + 1;
  let fechaInicio = $('#dat_am_fecha_inicio_descanso').val();

  if (cantidadDias && fechaInicio) {
    let fecha = new Date(fechaInicio);
    fecha.setDate(fecha.getDate() + cantidadDias);
    
    let fechaResult = new Date(fecha);
    let mess = (fechaResult.getMonth()+1)
    let fechaFin = `${fechaResult.getFullYear()}-${("0" + mess).slice(-2)}-${("0" + fechaResult.getDate()).slice(-2)}`;

    $('#dat_am_fecha_fin_descanso').val(fechaFin);
    $('#dat_am_dias_acumulados_descanso').val(cantidadDias);
    // console.log(fechaFin)
  }
}

function amSp3CargarTiposContingencia() {
  let url = apiUrlsho+`/api/hce_Get_036_tipo_contingencia?code=qxzLdYMhlxbAmteTiNVtSqqs0VqD1l/53yjs2wAuLJU0PnvfEHFaZA==`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "get",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers
  };

  return $.ajax(settings).done((response) => {
    // console.log(response);
    paObj_am.TipoContingencia = response.TipoContingencia;
    amSp3MostrarTiposContingencia();
  })
}

function amSp3MostrarTiposContingencia() {
  let data = paObj_am.TipoContingencia;
  let content = $('#dat_am_contingencia_descanso');

  content.html('');
  content.append(`
    <option value=""></option>
  `)
  data.forEach((e) => {
    content.append(`
      <option value="${e.Id}">${e.Descripcion}</option>
    `)
  })
}

function amSp3CargarEmisionDescanso() {
  let url = apiUrlsho+`/api/hce_Get_037_establece_emision_descanso?code=4kCBKuJhd1xTQrt0jLk0S8gm1GPB6I9kh9XsoMulVbs9vD9iF/Fu8Q==`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "get",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers
  };

  return $.ajax(settings).done((response) => {
    // console.log(response);
    paObj_am.EstableceEmisionDescanso = response.EstableceEmisionDescanso;
    amSp3MostrarEmisionDescanso();
  })
}

function amSp3MostrarEmisionDescanso() {
  let data = paObj_am.EstableceEmisionDescanso;
  let content = $('#dat_am_establecimineto_descanso');

  content.html('');
  content.append(`
    <option value=""></option>
  `)
  data.forEach((e) => {
    content.append(`
      <option value="${e.Id}">${e.Descripcion}</option>
    `)
  })
}

function amSp3AdjuntoDescanso(element) {
  $('#am_spin_guardar_adjunto_descanso').show();
  var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = function () {
    let data = {};
    data.IdAtencionMedica = idAM;
    data.NombreArchivo = element.files[0].name;
    data.ArchivoBase64 = reader.result;
    data.IdHashUser = "IdHashUser";
    amSp3GuardarAdjuntoDescanso(data);
  }
  reader.readAsDataURL(file);
}

function amSp3CargarAdjuntoDescanso() {
  let url = apiUrlsho+`/api/hce_Get_028_atencion_medica_adjunto_detalle?code=w9aSa6coNxkKaKj8Bi7G8L90MNDaTlniZvpivEdTpj4nc5osYzHTyQ==`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "get",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers,
    "data": { "IdAtencionMedica": idAM }
  };

  return $.ajax(settings).done((response) => {
    paObj_am[idAM].a.AtencMedAdjuntoDetalle = response.AtencMedAdjuntoDetalle;
    amSp3MostrarAdjuntoDescanso();
  })
}

function amSp3GuardarAdjuntoDescanso(data) {
  // console.log(data)
  $('#am_spin_adjunto_descanso').show();
  let url = apiUrlsho+`/api/hce_Post_041_atencion_medica_adjuto_detalle?code=s2I7wSOqg0RFgh7vWK5o9UTcjZqb3SEa1xJcmJTUs3r2lb18g5LPzQ==&httpmethod=post`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "post",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers,
    "data": JSON.stringify(data)
  };

  return $.ajax(settings).done((response) => {
    console.log('cargo el adjunto', response)
    $('#am_spin_guardar_adjunto_descanso').hide();
    amSp3CargarAdjuntoDescanso();

//alert('vamos a guardar el adjunto del descanso ='+id_DM);
     //---------------------------aqui debemos registrar el adjunto del descando medico----------------------------------
                        let data2 = {};
                        data2.IdDescansoMedico = id_DM;//id_DM
                        data2.IdDescMedAdj = 0;
                        data2.NombreArchivo =  data.NombreArchivo;
                        data2.IdHashUser = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
                        data2.ArchivoBase64 = data.ArchivoBase64;
                        
                         console.log("Enviamos............", data2);

                        let url = apiUrlsho+`/api/hce_Post_026_descanso_medico_adjunto?code=Yw42GGECBezciqikQakRh/yqFSMnMO7lehs6hIf80A2XzlspDWtkew==&httpmethod=post`;

                        let headers = {
                          "apikey": constantes.apiKey,
                          "Content-Type": "application/json"
                        }

                        let settings = {
                          "url": url,
                          "method": "post",
                          "dataType": 'json',
                          "headers": headers,
                          "data": JSON.stringify(data2)
                        };

                        $.ajax(settings).done(async (response) => {
                          console.log("Se guardaria el adjunto............", response);
                        })
     //---------------------------aqui debemos registrar el adjunto del descando medico----------------------------------






    
  })
}












function amSp3EliminarAdjuntoDescanso(id) {
  $(`#spin_am_eliminar_adjunto_descanso_${id}`).show();
  $(`#btn_am_eliminar_adjunto_descanso_${id}`).hide();
  let data = {};
  data.IdAtencionMedica = idAM;
  data.IdAtencMedAdjDet = id;
  data.IdHashUser = "IdHashUser";

  let url = apiUrlsho+`/api/hce_Post_042_atencion_medica_adjuto_detalle_eliminadoLogico?code=jB/vZUxqqetHZaOuXA6QMVEhuNIfQyuWIubnkavi20SZH3XaBAcsRQ==&httpmethod=post`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "post",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers,
    "data": JSON.stringify(data)
  };

  return $.ajax(settings).done((response) => {
    amSp3CargarAdjuntoDescanso();
  })
}

function amSp3MostrarAdjuntoDescanso() {
  $('#am_spin_adjunto_descanso').hide();
  let table = $('#table_am_adjunto_descanso');
  let content = $('#content_am_adjunto_descanso');
  let info = $('#info_table_content_am_adjunto_descanso');
  let data = paObj_am[idAM].a;

  content.html('');
  info.html('');
  $('#dat_am_cantidad_adjunto_descanso').text(`${data.AtencMedAdjuntoDetalle.length} Registros`);

  if (data.AtencMedAdjuntoDetalle.length > 0) {
    table.show();
    data.AtencMedAdjuntoDetalle.forEach((e) => {

      let botones = `
        <a href="${e.ArchivoBase64}" download="${e.NombreArchivo}" class="btn btn-link shadow-none float-right" >
          <img src="./images/sho/eyeIcon.svg" />
        </a>
      `

      if (tipoVerAtencion == 1) {
        botones = `
          <!-- colocar display none al spiner -->
          <button type="button" class="btn btn-link shadow-none float-right" style="display: none" id="spin_am_eliminar_adjunto_descanso_${e.Id}">
            <div class="spinner-border text-danger spinner-border-sm" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </button>
          <button type="button" id="btn_am_eliminar_adjunto_descanso_${e.Id}" class="btn btn-link shadow-none float-right" onclick="amSp3EliminarAdjuntoDescanso(${e.Id})">
            <img src="./images/sho/delete.svg" alt="">
          </button>
          <a href="${e.ArchivoBase64}" download="${e.NombreArchivo}" class="btn btn-link shadow-none float-right" >
            <img src="./images/sho/download.svg" />
          </a>
        `
      }

      content.append(`
      <tr>
        <td>
          <span>${e.NombreArchivo}</span>
        </td>
        <td>
          <span>${date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(e.CreadoFecha)}</span>
        </td>
        <td>
          ${botones}
        </td>
      </tr>
    `)
    })
  } else {
    table.hide();
    info.html(`
      <div class="alert alert-danger mt-4" role="alert">
        No Existen registros
        <span>
          <img src="./images/sho/advertencia.svg" alt="" width="18px">
        </span>
      </div>
    `)
  }
}


// MEDICAMENTOS

function amSp3CargarCobertura() {
  let url = apiUrlsho+`/api/hce_Get_041_cobertura?code=nCPcu2p6Ry2MWB7AgLLBpAtv6qjn2wUsFz0YePhzHfKLPmru6l4f1Q==`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "get",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers
  };

  return $.ajax(settings).done((response) => {
    paObj_am.Cobertura = response.Cobertura;
    amSp3MostrarCobertura();
  })
}

function amSp3MostrarCobertura() {
  let data = paObj_am.Cobertura;
  let content = $('#dat_am_cobertura_medicamento');

  content.html('');
  content.append(`
    <option value=""></option>
  `)
  data.forEach((e) => {
    content.append(`
      <option value="${e.Id}">${e.Descripcion}</option>
    `)
  })
}

function amSp3MostrarEmitirReceta() {
  let check = $('input:radio[name=emitir_receta_am]:checked').val();
  if (check == 1) {
    $('#btn_am_receta_medicamento').show();
  } else {
    $('#btn_am_receta_medicamento').hide();
  }
}

function amSp3MostrarDosisDSO() {
  let id = $('#dat_am_cobertura_medicamento').val();
  if (id == 2) {
    $('#dat_am_buscar_dosis_administrada_medicamento').removeAttr('disabled');
  } else {
    $('#dat_am_buscar_dosis_administrada_medicamento').attr('disabled', true);
  }
}

function amSp3CargarMedicamentoInsumos() {
  let url = apiUrlsho+`/api/hce_Get_030_atencion_medica_medicamento_insumos?code=LJpCSagmrdZ5GvdtEzrfUZzl8/D3E50f821OsOS9l1I1YQKl7tDYHQ==`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "get",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers,
    "data": { "IdAtencionMedica": idAM }
  };

  return $.ajax(settings).done((response) => {
    paObj_am[idAM].a.AtencMedMedicamentoInsumos = response.AtencMedMedicamentoInsumos;
    amSp3MostrarMedicamentoInsumos();
  })
}



var recetaMed = '';
function amSp3MostrarMedicamentoInsumos() {

  recetaMed = '';

  $('#am_spin_medicamentos').hide();
  let table = $('#table_am_medicamentos');
  let content = $('#content_am_medicamentos');
  let info = $('#info_table_content_am_medicamentos');
  let data = paObj_am[idAM].a;
  let cantidad = $('#dat_am_cantidad_medicamentos');



  content.html('');
  info.html('');

  if (data.AtencMedMedicamentoInsumos.length > 0) {
    cantidad.parent().parent().show();
    cantidad.text(`${data.AtencMedMedicamentoInsumos.length} Registros`);
    table.show();
    data.AtencMedMedicamentoInsumos.forEach((e) => {
      let cobertura = '';
      let medicamento = '';
      let presentacion = '';

      //Calcular tiempo de uso
      let fecha = new Date();
      let fechaActual = moment(fecha);
      let fechaHasta = moment(e.TiempoUso);
      let fechaCalculada = fechaHasta.diff(fechaActual, 'months');
      let tiempoUso = '';

      if (fechaCalculada == 0) {
        tiempoUso = `${fechaHasta.diff(fechaActual, 'days')} Dias`;
      } else {
        tiempoUso = `${fechaCalculada} Meses`;
      }

      paObj_am.Cobertura.forEach((i) => {
        if (i.Id == e.Cobertura) {
          cobertura = i.Descripcion;
        }
      })

      paObj_am.MedicamentoInsumo.forEach((i) => {
        if (i.Id == e.Medicamento) {
          medicamento = i.Descripcion;
        }
      })

      paObj_am.TipoPresentacion.forEach((i) => {
        if (i.Id == e.Presentacion) {
          presentacion = i.Descripcion;
        }
      })

      let botones = '';

      if (tipoVerAtencion == 1) {
        botones = `
          <!-- colocar display none al spiner -->
          <button type="button" class="btn btn-link shadow-none float-right" style="display: none" id="spin_am_eliminar_medicamento_${e.Id}">
            <div class="spinner-border text-danger spinner-border-sm" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </button>
          <button type="button" id="btn_am_eliminar_medicamento_${e.Id}" class="btn btn-link shadow-none float-right" onclick="amSp3EliminarMedicamentoInsumos(${e.Id})">
            <img src="./images/sho/delete.svg" alt="">
          </button>
        `
      }




      recetaMed = recetaMed + ' '+medicamento+' '+e.DosisRequerida+' '+e.DosisAdministradaDSO+' '+e.Frecuencia+' '+tiempoUso+',  ';


      content.append(`
      <tr>
        <td>
          <span>${cobertura}</span>
        </td>
        <td>
          <span style="white-space: nowrap;">${medicamento}</span>
        </td>
        <td>
          <span>${presentacion}</span>
        </td>
        <td>
          <span>${e.DosisRequerida}</span>
        </td>
        <td>
          <span>${(e.DosisAdministradaDSO) ? e.DosisAdministradaDSO : '- - - -'}</span>
        </td>
        <td>
          <span>${e.Frecuencia}</span>
        </td>
        <td>
          <span>${tiempoUso}</span>
        </td>
        <td>
          <span>${(e.RequiereEmitirReceta == 1) ? 'Si' : 'No'}</span>
        </td>
        <td>
          ${botones}
        </td>
      </tr>
    `)
    })
  } else {
    cantidad.parent().parent().hide();
    table.hide();
    info.html(`
      <div class="alert alert-danger mt-4" role="alert">
        No Existen registros
        <span>
          <img src="./images/sho/advertencia.svg" alt="" width="18px">
        </span>
      </div>
    `)
  }
}

function amSp3GuardarMedicamentoInsumos(id) {
  if (Sp3ValidarDatos('input_am_medicamentos').length > 0) {
    return;
  }

  $('#am_spin_medicamentos').show();

  let data = {};
  data.IdAtencionMedica = idAM;
  data.Cobertura = $('#dat_am_cobertura_medicamento').val();
  data.Medicamento = $('#dat_am_buscar_medicamento').val();
  data.Presentacion = $('#dat_am_presentacion_medicamento').val();
  data.DosisRequerida = $('#dat_am_dosis_requerida_medicamento').val();
  data.DosisAdministradaDSO = ($('#dat_am_buscar_dosis_administrada_medicamento').val()) ? $('#dat_am_buscar_dosis_administrada_medicamento').val() : 'sin dosis';
  data.Frecuencia = $('#dat_am_frecuencia_medicamento').val();
  data.TiempoUso = $('#dat_am_tiempo_uso_medicamento').val();
  data.RequiereEmitirReceta = $('input:radio[name=emitir_receta_am]:checked').val();
  data.IdHashUser = "IdHashUser";

  let url = apiUrlsho+`/api/hce_Post_045_atencion_medica_medicamento_insumos?code=GZhaFpSr9jYLxZqwpp/XnHOlqc1H1ZirVVDeDTfyAvByGkxPdarviQ==&httpmethod=post`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "post",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers,
    "data": JSON.stringify(data)
  };

  return $.ajax(settings).done((response) => {
    $('.input_am_medicamentos').val('')
    amSp3CargarMedicamentoInsumos();
  })
}

function amSp3EliminarMedicamentoInsumos(id) {
  $(`#spin_am_eliminar_medicamento_${id}`).show();
  $(`#btn_am_eliminar_medicamento_${id}`).hide();

  let data = {};
  data.IdAtencionMedica = idAM;
  data.IdMedicInsumos = id;

  let url = apiUrlsho+`/api/hce_Post_046_atencion_medica_medicamento_insumos_eliminadoLogico?code=rXlxJWHx9YIuYGzkLYMQ65NYaLgamqF3YcLTvM2cyyqxfYpO6oMaCA==&httpmethod=post`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "post",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers,
    "data": JSON.stringify(data)
  };

  return $.ajax(settings).done((response) => {
    amSp3CargarMedicamentoInsumos();
  })
}

function amSp3CargarMedicamentos() {
  let url = apiUrlsho+`/api/hce_Get_049_medicamento_insumo?code=WhNpIi6MY78giDNVav/4bDlHJDh73JPg5QzlXIvI4Q1XNKbmpxbvFA==&Descripcion=`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "get",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers
  };

  return $.ajax(settings).done((response) => {
    paObj_am.MedicamentoInsumo = response.MedicamentoInsumo;
    amSp3MostrarMedicamentos();
  })
}

function amSp3CargarTiposMedicamentos() {
  let url = apiUrlsho+`/api/hce_Get_050_tipo_presentacion?code=R1rrERS/OnrYkRb4yYelMsKqeLl5JEhCZvrubpVV8SedDiXtF5uvtA==`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "get",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers
  };

  return $.ajax(settings).done((response) => {
    paObj_am.TipoPresentacion = response.TipoPresentacion;
  })
}

function amSp3MostrarMedicamentos() {
  let data = paObj_am.MedicamentoInsumo;
  let content = $('#dat_am_buscar_medicamento');

  content.html('');
  content.append(`
    <option value=""></option>
  `)
  data.forEach((e) => {
    content.append(`
      <option value="${e.Id}">${e.Descripcion}</option>
    `)
  })
}

function amSp3BuscarPresentacion() {
  let id = $('#dat_am_buscar_medicamento').val();

  let url = apiUrlsho+`/api/hce_Get_051_medicamento_presentacion?code=rQLd0e2U1sRntipTG4t2fH8/knnILRcWnT0QXwkLPgAXgnPr97Xk8Q==`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "get",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers,
    "data": { "IdMedicamento": id }
  };

  return $.ajax(settings).done((response) => {
    let data = response;
    let content = $('#dat_am_presentacion_medicamento');
    content.html('');
    data.MedicamentoPresentacion.forEach((e) => {
      content.append(`
        <option value="${e.Id}">${e.Descripcion}</option>
      `)
    })
  })
}


// CONCLUSION

function amSp3CargarAptitud() {
  let url = apiUrlsho+`/api/hce_Get_040_aptitud?code=naSFtYAO8RHbK08dOfi93Vja7Cc9iCHjz6o7ldn9EW0dzFu3aU3jZg==`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "get",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers
  };

  return $.ajax(settings).done((response) => {
    paObj_am.Aptitud = response.Aptitud;
    amSp3MostrarAptitud();
  })
}

function amSp3MostrarAptitud() {
  let data = paObj_am.Aptitud;
  let content = $('#dat_am_aptitud_conclusiones');

  content.html('');
  content.append(`
    <option value=""></option>
  `)
  data.forEach((e) => {
    content.append(`
      <option value="${e.Id}">${e.Descripcion}</option>
    `)
  })
}


// SUBIR ARCHIVOS

function amSp3CargarAdjuntos() {
  let url = apiUrlsho+`/api/hce_Get_029_atencion_medica_adjunto?code=Z2PowgNzfBApTToBIbJCEVpmpAaTYTOC7fTK5Qv8HFBNOfVfruyRMQ==`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "get",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers,
    "data": { "IdAtencionMedica": idAM }
  };

  return $.ajax(settings).done((response) => {
    paObj_am[idAM].a.AtencMedAdjunto = response.AtencMedAdjunto;
    amSp3MostrarAdjuntos();
  })
}

function amSp3MostrarAdjuntos() {
  $('#am_spin_adjunto').hide();
  let table = $('#table_am_adjunto');
  let content = $('#content_am_adjunto');
  let info = $('#info_table_content_am_adjunto');
  let data = paObj_am[idAM].a;

  content.html('');
  info.html('');
  $('#dat_am_cantidad_adjunto').text(`${data.AtencMedAdjunto.length} Registros`);

  if (data.AtencMedAdjunto.length > 0) {
    table.show();
    data.AtencMedAdjunto.forEach((e) => {
      let botones = `
        <a href="${e.ArchivoBase64}" download="${e.NombreArchivo}" class="btn btn-link shadow-none float-right" >
          <img src="./images/sho/eyeIcon.svg" />
        </a>
      `;

      if (tipoVerAtencion == 1) {
        botones = `
          <button type="button" class="btn btn-link shadow-none float-right" style="display: none" id="spin_am_eliminar_adjunto_${e.Id}">
            <div class="spinner-border text-danger spinner-border-sm" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </button>
          <button type="button" id="btn_am_eliminar_adjunto_${e.Id}" class="btn btn-link shadow-none float-right" onclick="amSp3EliminarAdjunto(${e.Id})">
            <img src="./images/sho/delete.svg" alt="">
          </button>
          <a href="${e.ArchivoBase64}" download="${e.NombreArchivo}" class="btn btn-link shadow-none float-right" >
            <img src="./images/sho/download.svg" />
          </a> 
        `
      }

      content.append(`
      <tr>
        <td>
          <span>${e.NombreArchivo}</span>
        </td>
        <td>
          <span>${date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(e.CreadoFecha)}</span>
        </td>
        <td>
          ${botones}           
        </td>
      </tr>
    `)
    })
  } else {
    table.hide();
    info.html(`
      <div class="alert alert-danger mt-4" role="alert">
        No Existen registros
        <span>
          <img src="./images/sho/advertencia.svg" alt="" width="18px">
        </span>
      </div>
    `)
  }
}

function amSp3Adjunto(element) {
  $('#am_spin_guardar_adjunto').show();
  var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = function () {
    let data = {};
    data.IdAtencionMedica = idAM;
    data.NombreArchivo = element.files[0].name;
    data.ArchivoBase64 = reader.result;
    data.IdHashUser = "IdHashUser";
    amSp3GuardarAdjunto(data);
  }
  reader.readAsDataURL(file);
}

function amSp3GuardarAdjunto(data) {
  $('#am_spin_adjunto').show();
  let url = apiUrlsho+`/api/hce_Post_043_atencion_medica_adjuto?code=O8cudz6KwOYtieG9UapbdY2enQrXoCGsZfH/A36Rs2sqRRT4glzyFA==&httpmethod=post`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "post",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers,
    "data": JSON.stringify(data)
  };

  return $.ajax(settings).done((response) => {
    $('#am_spin_guardar_adjunto').hide();
    amSp3CargarAdjuntos();
  })
}

function amSp3EliminarAdjunto(id) {
  $(`#spin_am_eliminar_adjunto_${id}`).show();
  $(`#btn_am_eliminar_adjunto_${id}`).hide();
  let data = {};
  data.IdAtencionMedica = idAM;
  data.IdAtencMedAdj = id;
  data.IdHashUser = "IdHashUser";

  let url = apiUrlsho+`/api/hce_Post_044_atencion_medica_adjuto_eliminadoLogico?code=3XivF7TC3vMwhKS932kEqK6b4hEPK/F0xmOQZpms5fa8sDFaobUX6Q==&httpmethod=post`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "post",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers,
    "data": JSON.stringify(data)
  };

  return $.ajax(settings).done((response) => {
    amSp3CargarAdjuntos();
  })
}


// INTERCONSULTAS - TRANSFERENCIAS

function amSp3ValidarAccionInterconsulta() {
  $('#btn_am_interconsulta_transferencia').attr('onclick', "callNewIntercTransferencia_AT();");

}

function amSp3ValidarAccionTransferencia() {
  $('#btn_am_interconsulta_transferencia').attr('onclick', "callNewIntercTransferencia_AT();");
}

// function amSp3CargarInterconsultas(){
//   let url = `https://5h0-dev-salud.azurewebsites.net/api/hce_Get_029_atencion_medica_adjunto?code=Z2PowgNzfBApTToBIbJCEVpmpAaTYTOC7fTK5Qv8HFBNOfVfruyRMQ==`;

//   let headers = {
//     "apikey": constantes.apiKey,
//     "Content-Type": "application/json"
//   }

//   let settings = {
//     "url": url,
//     "method": "get",
//     "timeout": 0,
//     "crossDomain": true,
//     "dataType": 'json',
//     "headers": headers,
//     "data": { "IdAtencionMedica": idAM }
//   };

//   return $.ajax(settings).done((response) => {
//     paObj_am[idAM].a.AtencMedAdjunto = response.AtencMedAdjunto;
//     amSp3MostrarAdjuntos();
//   })
// }


// EXAMEN AUXILIAR
function amSp3CargarTiposExamen() {
  let url = apiUrlsho+`/api/hce_Get_039_tipo_examen?code=fyAYixF97aLnaHqhcOdCMbvgb0SH7Qlz2EYrfCrk1uZxhmTPmZuKjg==`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "get",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers
  };

  return $.ajax(settings).done((response) => {
    paObj_am.TipoExamen = response.TipoExamen;
    amSp3MostrarTiposExamen();
  })
}

function amSp3MostrarTiposExamen() {
  let data = paObj_am.TipoExamen;
  let content = $('#dat_am_tipo_examen');

  content.html('');
  content.append(`
    <option value=""></option>
  `)
  data.forEach((e) => {
    content.append(`
      <option value="${e.Id}">${e.Descripcion}</option>
    `)
  })
}

function amSp3CargarExamenAuxiliar() {
  let url = apiUrlsho+`/api/hce_Get_031_atencion_medica_examen_auxiliar?code=D73jWTcNB763dlTjpQzwobB8QMIXE0980Gi4FfAaxDDnx34PrGoIpw==`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "get",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers,
    "data": { "IdAtencionMedica": idAM }
  };

  return $.ajax(settings).done((response) => {
    paObj_am[idAM].a.Examen_Auxiliar = response.Examen_Auxiliar;
    amSp3MostrarExamenAuxiliar();
  })
}

function amSp3MostrarExamenAuxiliar() {
  $('#am_spin_examen_auxiliar').hide();
  let table = $('#table_am_examen_auxiliar');
  let content = $('#content_am_examen_auxiliar');
  let info = $('#info_table_content_am_examen_auxiliar');
  let cantidad = $('#dat_am_cantidad_examen_auxiliar');
  let data = paObj_am[idAM].a;

  content.html('');
  info.html('');

  if (data.Examen_Auxiliar.length > 0) {
    table.show();
    cantidad.parent().parent().show();
    cantidad.text(`${data.Examen_Auxiliar.length} Registros`);
    data.Examen_Auxiliar.forEach((e) => {
      let tip_examen = '';
      paObj_am.TipoExamen.forEach((i) => {
        if (i.Id == e.TipoExamenId) {
          tip_examen = i.Descripcion;
        }
      })

      let botones = '';

      if (tipoVerAtencion == 1) {
        botones = `
          <li onclick="amSp3EditarExamenAuxiliar(${e.Id})" id="btn_am_examen_editar">
            <img src="./images/sho/edit.svg" fill="#5daf57" />
            <span>Editar</span>
          </li>
          <li onclick="amSp3EliminarExamenAuxiliar(${e.Id})">
            <img src="./images/sho/delete.svg"/>
            <span>Eliminar</span>
          </li>
          <li id="btn_examen_adjuntar">
            <label for="am_file_upload_examen_${e.Id}" style="display: contents; cursor: pointer">
              <img src="./images/sho/upload2.svg" fill="#8fbb02"/>
              <span>${(!e.ArchivoBase64) ? 'Adjuntar documento' : 'Actualizar documento'}</span>
            </label>          
            <input type="file" id="am_file_upload_examen_${e.Id}" accept="application/pdf, .pdf, .doc, docx, .odf" onchange="amSp3CargarAdjuntoExamen(this,${e.Id})" style="display: none">
          </li>
        `
      }

      content.append(`
      <tr class="item_ant_oc item_ant_3" data-idexamen="${e.Id}">
        <td><span>${date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(e.FechaExamenes)}</span></td>
        <td><span>${tip_examen}</span></td>
        <td><span>${date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(e.CreadoFecha)}</span></td>
        <td><span>${e.Conclusion}</span></td>
        <td><span>${e.NombreArchivo}</span></td>
        <td>
          <div class="dropdown float-right dropleft">
            <div class="more-info" id="item_am_diagnostico_1" data-toggle="dropdown" style="${(tipoVerAtencion != 1) ? 'display: none' : ''}">
              <img src="images/iconos/menu_responsive.svg" alt="" />
            </div>
            <div class="dropdown-menu" aria-labelledby="item_am_diagnostico_1">
              <ul>
                ${botones}
                <li id="btn_examen_descargar" ${(!e.ArchivoBase64) ? 'style="display:none"' : ''}>                    
                  <a href="${e.ArchivoBase64}" download="${e.NombreArchivo}" style="text-decoration:none; text-decoration: none;color: #000; display: contents;">
                    <img src="./images/sho/download.svg" />
                    <span>Descargar documento</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>          
        </td>
      </tr>
    `)
    })
  } else {
    table.hide();
    cantidad.parent().parent().hide();
    info.html(`
      <div class="alert alert-danger mt-4" role="alert">
        No Existen registros
        <span>
          <img src="./images/sho/advertencia.svg" alt="" width="18px">
        </span>
      </div>
    `)
  }
}

function amSp3EditarExamenAuxiliar(id) {
  let obj = paObj_am[idAM].a.Examen_Auxiliar;
  $('#btn_am_examen_agregar').hide();
  $('#btn_am_examen_guardar').remove();
  $('#btn_am_examen_agregar').parent().append(`
    <button class="btn btn-success btn-block btn-lg float-right" id="btn_am_examen_guardar" style="width:200px;" onclick="amSp3GuardarExamenAuxiliar(${id})"> 
      <div class="spinner-border spinner-border-sm" id="am_spin_guardar_examen" role="status" style="display: none;">
        <span class="sr-only">Loading...</span>
      </div>
      Guardar
      <img class="inject-svg" src="./images/sho/confirm.svg" alt="" fill="#fff" width="18px">
    </button>
  `)
  obj.forEach((e) => {
    if (e.Id == id) {
      $('#dat_am_conclusion_examen').val(e.Conclusion);
      $('#dat_am_fecha_examen').val(e.FechaExamenes.split('T')[0]);
      $('#dat_am_tipo_examen').val(e.TipoExamenId);
    }
  })
}

function amSp3GuardarExamenAuxiliar(idEA, adjunto) {
  // console.log(adjunto, idEA);

  $('#am_spin_guardar_examen').show();

  let data = {}

  data.IdAtencionMedica = idAM;
  data.IdEA = idEA;
  data.IdHashUser = "UsuarioIdlogeado";

  if (idEA == 0) {
    if (Sp3ValidarDatos('input_am_examen').length > 0) {
      return
    }
    data.NombreArchivo = "";
    data.ArchivoBase64 = "";
    data.Conclusion = $('#dat_am_conclusion_examen').val();
    data.FechaExamenes = $('#dat_am_fecha_examen').val();
    data.IdTipEA = $('#dat_am_tipo_examen').val();
  }

  if (idEA > 0 && !adjunto) {
    if (Sp3ValidarDatos('input_am_examen').length > 0) {
      return
    }
    paObj_am[idAM].a.Examen_Auxiliar.forEach((e) => {
      if (e.Id == idEA) {
        data.NombreArchivo = e.NombreArchivo;
        data.ArchivoBase64 = e.ArchivoBase64;
      }
    })
    data.Conclusion = $('#dat_am_conclusion_examen').val();
    data.FechaExamenes = $('#dat_am_fecha_examen').val();
    data.IdTipEA = $('#dat_am_tipo_examen').val();
  }

  if (idEA > 0 && adjunto) {
    paObj_am[idAM].a.Examen_Auxiliar.forEach((e) => {
      if (e.Id == idEA) {
        data.Conclusion = e.Conclusion;
        data.FechaExamenes = e.FechaExamenes;
        data.IdTipEA = e.TipoExamenId;
      }
    })
    data.NombreArchivo = adjunto.NombreArchivo;
    data.ArchivoBase64 = adjunto.ArchivoBase64;
  }

  let url = apiUrlsho+`/api/hce_Post_047_atencion_medica_examen_auxiliar?code=xUfxxYodz3a8035xz6ralVUBDVb56y6bOvyDOy/RcDMD3C3nVHqE1g==&httpmethod=post`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "post",
    "dataType": 'json',
    "headers": headers,
    "data": JSON.stringify(data)
  };

  $.ajax(settings).done((response) => {
    // console.log("response", response);
    $('#am_spin_examen_auxiliar').show();
    $('#am_spin_guardar_examen').hide();
    $('#btn_am_examen_agregar').show();
    $('#btn_am_examen_guardar').remove();
    amSp3CargarExamenAuxiliar();
    $('#dat_am_fecha_examen').val('');
    $('#dat_am_tipo_examen').val('');
    $('#dat_am_conclusion_examen').val('');
  })
}

function amSp3CargarAdjuntoExamen(element, id) {
  console.log(id);
  $('#hc_spin_examen').show();
  var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = function () {
    // $("#file_upload").attr("data-file64", reader.result);
    let data = {};
    data.NombreArchivo = element.files[0].name;
    data.ArchivoBase64 = reader.result;
    amSp3GuardarExamenAuxiliar(id, data);
  }
  reader.readAsDataURL(file);
}


function amSp3EliminarExamenAuxiliar(idEA) {
  $('#am_spin_examen_auxiliar').show();
  let data = {}

  data.IdAtencionMedica = idAM;
  data.IdEA = idEA;
  data.IdHashUser = "UsuarioIdlogeado";

  // console.log(data);

  let url = apiUrlsho+`/api/hce_Post_048_atencion_medica_examen_auxiliar_eliminadoLogico?code=is7sTky3TqFDRE/QLmpaaqzlvSdUs//BBIGkX4tlacOzxrnxnEPpqw==&httpmethod=post`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "post",
    "dataType": 'json',
    "headers": headers,
    "data": JSON.stringify(data)
  };

  $.ajax(settings).done((response) => {
    // console.log("response", response);
    amSp3CargarExamenAuxiliar();
  })
}

// ATENCIONES MEDICAS

function amSp3GuardarAtencionesMedicas(id) {

console.log('es aqui que me llamas 2692')
  let data = {};

  if (id) {
    data.IdAM = id;
    data.IdSV = idSV;
  } else {
    data.idAM = 0;
    data.idSV = 0;
  }

  data.IdHC = idHC;
  data.IdHashUser = getCookie("vtas_id_hash" + sessionStorage.tabVisitasa),


    data.B_IncidenciaRiesgoSO = $('input:radio[name=relacion_ocupacional_am]:checked').val();

  data.C_MotivoConsulta = ($('#dat_am_motivo_consulta').val()) ? $('#dat_am_motivo_consulta').val() : 0;
  data.C_Anamnesis = ($('#dat_am_anamnesis_consulta').val()) ? $('#dat_am_anamnesis_consulta').val() : 'vacio';
  data.D_EstadoConciencia = ($('#dat_am_conciencia_examen').val()) ? $('#dat_am_conciencia_examen').val() : 'vacio';
  data.D_EstadoNutricion = ($('#dat_am_nutricion_examen').val()) ? $('#dat_am_nutricion_examen').val() : 0;
  data.D_EstadoGeneral = ($('#dat_am_general_examen').val()) ? $('#dat_am_general_examen').val() : 0;
  data.D_EstadoHidratacion = ($('#dat_am_hidratacion_examen').val()) ? $('#dat_am_hidratacion_examen').val() : 0;
  data.D_Orofaringe = ($('#dat_am_orofaringe_examen').val()) ? $('#dat_am_orofaringe_examen').val() : 'vacio';
  data.D_ToraxPulmones = ($('#dat_am_torax_pulmones_examen').val()) ? $('#dat_am_torax_pulmones_examen').val() : 'vacio';
  data.D_CardioVascular = ($('#dat_am_vascular_examen').val()) ? $('#dat_am_vascular_examen').val() : 'vacio';
  data.D_SOMA = ($('#dat_am_soma_examen').val()) ? $('#dat_am_soma_examen').val() : 'vacio';

  data.E_PersonalDeSalud = ($('#dat_am_personal_descanso').val()) ? $('#dat_am_personal_descanso').val() : 'vacio';
  data.E_tipoContingencia = ($('#dat_am_contingencia_descanso').val()) ? $('#dat_am_contingencia_descanso').val() : 0;
  data.E_DescansoPorEnfermedad = ($('#dat_am_enfermedad_descanso').val()) ? $('#dat_am_enfermedad_descanso').val() : 0;
  data.E_CMP = ($('#dat_am_cmp_descanso').val()) ? $('#dat_am_cmp_descanso').val() : 'vacio';
  data.E_CantidadDeDias = ($('#dat_am_cantidad_dias_descanso').val()) ? $('#dat_am_cantidad_dias_descanso').val() : 0;
  data.E_DiasAcumulados = ($('#dat_am_dias_acumulados_descanso').val()) ? $('#dat_am_dias_acumulados_descanso').val() : 0;
  data.E_FechaInicio = ($('#dat_am_fecha_inicio_descanso').val()) ? $('#dat_am_fecha_inicio_descanso').val() : '2000-01-01';
  data.E_FechaFin = ($('#dat_am_fecha_fin_descanso').val()) ? $('#dat_am_fecha_fin_descanso').val() : '2000-01-01';
  data.E_HuboAltaMedica = ($('#dat_am_alta_medica_descanso').val()) ? $('#dat_am_alta_medica_descanso').val() : 0;
  data.E_EstablecimientoEmisionDescanso = ($('#dat_am_establecimineto_descanso').val()) ? $('#dat_am_establecimineto_descanso').val() : 0;
  data.E_particular = ($('#dat_am_particular_descanso').val()) ? $('#dat_am_particular_descanso').val() : 'vacio';

  data.F_Tratamiento = ($('#dat_am_escribir_tratamiento').val()) ? $('#dat_am_escribir_tratamiento').val() : 'vacio';

  data.G_Origen = ($('#dat_am_origen_conclusiones').val()) ? $('#dat_am_origen_conclusiones').val() : 'vacio';
  data.G_Aptitud = ($('#dat_am_aptitud_conclusiones').val()) ? $('#dat_am_aptitud_conclusiones').val() : 0;
  data.G_FechaInicioRestrinccion = ($('#dat_am_fecha_inicio_conclusiones').val()) ? $('#dat_am_fecha_inicio_conclusiones').val() : '2000-01-01';
  data.G_FechaFinRestriccion = ($('#dat_am_fecha_fin_conclusiones').val()) ? $('#dat_am_fecha_fin_conclusiones').val() : '2000-01-01';
  data.G_TipoRestriccion = ($('#dat_am_tipo_restricciones_conclusiones').val()) ? $('#dat_am_tipo_restricciones_conclusiones').val() : 'vacio';
  data.G_PersonalDeSalud = ($('#dat_am_personal_salud_conclusiones').val()) ? $('#dat_am_personal_salud_conclusiones').val() : 'vacio';
  data.G_FechaRevaluacionDSO = ($('#dat_am_fecha_reevaluacion_conclusiones').val()) ? $('#dat_am_fecha_reevaluacion_conclusiones').val() : '2000-01-01';
  data.G_Observaciones = ($('#dat_am_Observaciones_conclusiones').val()) ? $('#dat_am_Observaciones_conclusiones').val() : 'vacio';

  data.GeneroInterconsulta = 1;
  data.GeneroTransferencia = 1;

  data.PresionArterial_SV = $('#dat_am_presion_arterial_sv').val();
  data.FrecuenciaCardiaca_SV = $('#dat_am_frecuencia_cardiaca_sv').val();
  data.FrecuenciaRespiratoria_SV = $('#dat_am_frecuencia_respiratoria_sv').val();
  data.Temperatura_SV = $('#dat_am_temperatura_sv').val();
  data.PesoKg_SV = $('#dat_am_peso_sv').val();
  data.Talla_SV = $('#dat_am_talla_sv').val();
  data.Saturacion_SV = $('#dat_am_saturacion_sv').val();
  data.IndiceMasaCorporal_SV = $('#dat_am_masa_corporal_sv').val();
  data.PerimetroAbdominal_SV = $('#dat_am_perimetro_abdominal_sv').val();


  let url = apiUrlsho+`/api/hce_Post_032_atencion_medica?code=t6BcH/WsaG553f1vhDT0Qf61UDzgwujSmL1gLE9suag1fAXWizQaiQ==&httpmethod=post`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "post",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers,
    "data": JSON.stringify(data)
  };

  return $.ajax(settings).done(async (response) => {
    console.log(response);
    hideLoading();
    if (idAM != 0) {
       //-------------------------------------  aqui debemos guardar el descanso medico ------------------------------------------
                fnSp3ModificarNuevaDescansoMedico_AM();
       //-------------------------------------  aqui debemos guardar el descanso medico ------------------------------------------
      Swal.fire({
        title: "Se terminó con éxito el registro",
        iconColor: "#8fbb02",
        iconHtml: '<img src="./images/sho/check.svg" width="28px">',
        showConfirmButton: false,
        padding: "3em 3em 6em 3em ",
        timer: 1500,
      }).then(() => {
        cargarDatosGenerales(idHC);
      })
    }
    idAM = response.Id;
    idSV = response.IdSV;
    ID_ORIGEN = idAM;

    //alert("gestionAtencionMedica 2408 ID_ORIGEN = "+ID_ORIGEN);
    _init_fnSp3SaludOcupacionalEstadoInicial_inter_HC2();
     
      //alert("gestionAtencionMedica 2408 ID_DESCANSO = "+id_DM);
     if(id_DM == 0)
     {
        fnSp3CrearNuevo_DM_en_Blanco_AM();
     }
     ////aqui creamos un nuevo descanso medico


  }).fail((e) => {
    console.log(e);
  })
}

function amSp3ConfimGuardarAtencion() {
  if (Sp3ValidarDatos('input_am_datos_trabajador').length > 0) {
    return;
  }

  if (Sp3ValidarDatos('input_am_consulta').length > 0) {
    return;
  }

  if (Sp3ValidarDatos('input_am_examen_fisico').length > 0) {
    return;
  }

  if (Sp3ValidarDatos('input_am_descanso').length > 0) {
    return;
  }

  if (Sp3ValidarDatos('input_am_conclusiones').length > 0) {
    return;
  }

  let nombres = $("#dat_am_nombres_trabajador").val();
  let apellidos = $("#dat_am_apellidos_trabajador").val();
  Swal.fire({
    title: "Guardar atención médica.",
    html: `
       <p>Está por guardar la atención médica de</p>
       <p>${nombres} ${apellidos}</p>
       <p class="mt-5">¿Desea confirmar la acción?</p>`,
    icon: "info",
    showCancelButton: true,
    reverseButtons: true,
    cancelButtonColor: "#ff3636",
    confirmButtonColor: "#8fbb02",
    confirmButtonText: `Confirmar <img src="./images/sho/confirm.svg">`,
    cancelButtonText: `Cancelar <img src="./images/sho/cancelar.svg">`,
  }).then(async (result) => {
    if (result.isConfirmed) {
      await amSp3GuardarAtencionesMedicas(idAM);
    }
  });
}

function amSp3CancelarAtencion() {
  let nombres = $("#dat_am_nombres_trabajador").val();
  let apellidos = $("#dat_am_apellidos_trabajador").val();
  Swal.fire({
    title: "Cancelar atención médica.",
    html: `
       <p>Está por cancelar la atención médica de</p>
       <p>${nombres} ${apellidos}</p>
       <p class="mt-5">¿Desea confirmar la acción?</p>`,
    icon: "info",
    showCancelButton: true,
    reverseButtons: true,
    cancelButtonColor: "#ff3636",
    confirmButtonColor: "#8fbb02",
    confirmButtonText: `Confirmar <img src="./images/sho/confirm.svg">`,
    cancelButtonText: `Cancelar <img src="./images/sho/cancelar.svg">`,
  }).then((result) => {
    if (result.isConfirmed) {
      cargarDatosGenerales(idHC);
    }
  });
}

function amSp3CargarVerAtencion() {
  let url = apiUrlsho+`/api/hce_Get_023_atencion_medica?code=scTtyIt0T0KLzUdeDYPBRyMXavt7tP9YRKgGYUiF9Sw70z7U15Ss6g==`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "get",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers,
    "data": {
      "IdHistoriaClinica": idHC,
      "IdAtencionMedica": idAM
    }
  };

  return $.ajax(settings).done(async (response) => {
    paObj_am[idAM].Atencion = response;
    amSp3MostrarVerAtencion();
  }).fail((e) => {
    console.log(e);
  })

}

function amSp3MostrarVerAtencion() {
  let datos = paObj_am[idAM].Atencion;
  let atencion = datos.AtencionMedica[0];
  let signos = datos.SignosVitales[0];

  if (atencion.B_IncidenciaRiesgoSO == 1) {
    $('#dat_am_relacion_ocupacional_si').attr('checked', true);
  }

  $('#dat_am_fecha_trabajador').val(atencion.A_FechaNacimiento.split('T')[0]);
  $('#dat_am_motivo_consulta').val(atencion.C_MotivoConsulta);
  $('#dat_am_anamnesis_consulta').val(atencion.C_Anamnesis);
  $('#dat_am_presion_arterial_sv').val(atencion.C_Anamnesis);

  $('#dat_am_presion_arterial_sv').val(signos.PresionArterial_SV);
  $('#dat_am_frecuencia_cardiaca_sv').val(signos.FrecuenciaCardiaca_SV);
  $('#dat_am_frecuencia_respiratoria_sv').val(signos.FrecuenciaRespiratoria_SV);
  $('#dat_am_temperatura_sv').val(signos.Temperatura_SV);
  $('#dat_am_peso_sv').val(signos.PesoKg_SV);
  $('#dat_am_talla_sv').val(signos.Talla_SV);
  $('#dat_am_saturacion_sv').val(signos.Saturacion_SV);
  $('#dat_am_masa_corporal_sv').val(signos.IndiceMasaCorporal_SV);
  $('#dat_am_perimetro_abdominal_sv').val(signos.PerimetroAbdominal_SV);

  $('#dat_am_conciencia_examen').val(atencion.D_EstadoConciencia);
  $('#dat_am_nutricion_examen').val(atencion.D_EstadoNutricion);
  $('#dat_am_general_examen').val(atencion.D_EstadoGeneral);
  $('#dat_am_hidratacion_examen').val(atencion.D_EstadoHidratacion);
  $('#dat_am_orofaringe_examen').val(atencion.D_Orofaringe);
  $('#dat_am_torax_pulmones_examen').val(atencion.D_ToraxPulmones);
  $('#dat_am_vascular_examen').val(atencion.D_CardioVascular);
  $('#dat_am_soma_examen').val(atencion.D_SOMA);

  $('#dat_am_personal_descanso').val(atencion.E_PersonalDeSalud);
  $('#dat_am_contingencia_descanso').val(atencion.E_tipoContingencia);
  $('#dat_am_enfermedad_descanso').val(atencion.E_DescansoPorEnfermedad);
  $('#dat_am_cmp_descanso').val(atencion.E_CMP);
  $('#dat_am_cantidad_dias_descanso').val(atencion.E_CantidadDeDias);
  $('#dat_am_dias_acumulados_descanso').val(atencion.E_DiasAcumulados);
  $('#dat_am_fecha_inicio_descanso').val(atencion.E_FechaInicio.split('T')[0]);
  $('#dat_am_fecha_fin_descanso').val(atencion.E_FechaFin.split('T')[0]);
  $('#dat_am_alta_medica_descanso').val(atencion.E_HuboAltaMedica);
  $('#dat_am_establecimineto_descanso').val(atencion.E_EstablecimientoEmisionDescanso);
  $('#dat_am_particular_descanso').val(atencion.E_particular);

  $('#dat_am_escribir_tratamiento').val(atencion.F_Tratamiento);

  $('#dat_am_origen_conclusiones').val(atencion.G_Origen);
  $('#dat_am_aptitud_conclusiones').val(atencion.G_Aptitud);
  $('#dat_am_fecha_inicio_conclusiones').val(atencion.G_FechaInicioRestrinccion.split('T')[0]);
  $('#dat_am_fecha_fin_conclusiones').val(atencion.G_FechaFinRestriccion.split('T')[0]);
  $('#dat_am_tipo_restricciones_conclusiones').val(atencion.G_TipoRestriccion);
  $('#dat_am_personal_salud_conclusiones').val(atencion.G_PersonalDeSalud);
  $('#dat_am_fecha_reevaluacion_conclusiones').val(atencion.G_FechaRevaluacionDSO.split('T')[0]);
  $('#dat_am_Observaciones_conclusiones').val(atencion.G_Observaciones);
}

function amSp3ImprimirReceta() {
  //alert('es conmigo');
  let doc = new jsPDF('A4');
  let planta = $('#dat_am_planta_trabajador option:selected').text();
  //let planta = "CALLAO";
  let nombres = paObj_hc[idHC].a.Nombres_Trabajador_H;
  let apellidos = paObj_hc[idHC].a.Apellidos_Trabajador_H;

  let img_logo = new Image();
  img_logo.src = 'images/sho/tasa_logo.png';
  doc.addImage(img_logo, 'png', 20, 20, 20, 20)

  let img_firma = new Image();
  img_firma.src = 'images/sho/tasa_firma.png';
  doc.addImage(img_firma, 'png', 130, 240, 60, 35)

  doc.setLineWidth(0.5);
  doc.rect(15, 15, 180, 265)

  doc.setFontSize(14);
  doc.setFontType('bold');
  doc.text("DEPARTAMENTO DE SALUD OCUPACIONAL", 105, 25, "center");
  doc.text("PLANTA TASA CALLAO", 105, 32, "center");

  doc.setFontSize(12);
  doc.text("RECETA MÉDICA", 105, 50, "center");
  doc.line(123, 51, 88, 51);

  doc.setFontType('normal');
  doc.text("Nombres y Apellidos: ", 30, 65);
  doc.text(`${nombres} ${apellidos}`, 32, 75);

  doc.text("Dx:", 30, 100);
  doc.text("Diagnostico:", 30, 110);
  doc.text(diag_AM, 30, 120);
  

  doc.text("Rp. Lista de medicamentos:", 30, 140);//recetaMed
  doc.text(recetaMed, 30, 150, {align: 'left', maxWidth:150});

  // doc.setLineDash([1.1]);
  // doc.line(72, 65, 180, 65);

  // doc.setLineDash([1.1]);
  // doc.line(30, 75, 180, 75);
  doc.save(`Receta_${nombres}_${apellidos}.pdf`);
}

function Sp3ValidarDatos(idClass) {
  //idClass el nombre de la clase de desea validar ejemplo: Sp3ValidarDatos('input_am_datos_trabajador');
  let error = [];
  let inputs = $(`.${idClass}`);

  inputs.each((e) => {
    if (!inputs.eq(e).val()) {
      inputs.eq(e).addClass('is-invalid');
      error.push(inputs.eq(e).val())
    }
    if (inputs.eq(e).val()) {
      inputs.eq(e).removeClass('is-invalid');
    }
  })

  if (error.length > 0) {
    inputs.focus();
  }
  // console.log(error);
  return error;
}



//------------------------------ andy -------------------------------------------------------

function limpiarNuevaAtencionMedica()
{//---------------------------------------------------------------------------------------


  //alert();
    //cargarDatosGenerales(idHC);
    // actualPageSystemSoma = "view/sho-hce/atenciones_medicas/nuevaAtencionMedica.html";
    // backPageSystemSoma = "view/sho-hce/historia_clinica/datosGenerales.html";
    // backTitle = "Historia clínica";

  handlerUrlhtml('contentGlobal', 'view/sho-hce/atenciones_medicas/nuevaAtencionMedica.html', 'Nueva atención médica');
  $("#regresar").show();
  $("#logoCompany1 b").text('Nueva atención médica');

}//---------------------------------------------------------------------------------------




function desSp3ImprimirDescanso_NATM() {  

  //alert('entrando desde 7026');
  if (Sp3ValidarDatos('input_am_descanso').length > 0) {
    return;
  }

  let doc = new jsPDF('carta');
  let medico = $('#dat_am_personal_descanso').val();
  let cmp = $('#dat_am_cmp_descanso').val();
  // let nombres_a = "José Manuel";
  // let apellidos_a = "Cedeño";
  let nombres_b = $('#dat_am_nombres_trabajador').val();
  let apellidos_b = $('#dat_am_apellidos_trabajador').val();
  let dni = $('#dat_am_dni_trabajador').val();
  let cargo = $('#dat_am_puesto_trabajo_trabajador').val();
  let area_trabajo =  $('#dat_am_area_trabajador option:selected').text().toUpperCase(); 
  let diagnostico = diag_AM;
  let indica = $('#dat_am_cantidad_dias_descanso').val();


   moment.locale('es');
  let fecha_inicio = $('#dat_am_fecha_inicio_descanso').val();
  let dia_a = moment(fecha_inicio).format('DD');
  let mes_a = moment(fecha_inicio).format('MM');
  let ano_a = moment(fecha_inicio).format('YYYY');

  let fecha_fin = $('#dat_am_fecha_fin_descanso').val();
  let dia_b = moment(fecha_fin).format('DD');
  let mes_b = moment(fecha_fin).format('MM');
  let ano_b = moment(fecha_fin).format('YYYY');

  let fecha_actual = moment();
  let dia_c_text = moment(fecha_actual).format('dddd');
  let dia_c = moment(fecha_actual).format('DD');
  let mes_c_text = moment(fecha_actual).format('MMMM');
  let ano_c = moment(fecha_actual).format('YYYY');

  let planta = $('#dat_am_planta_trabajador option:selected').text().toUpperCase(); 

  // sedeAreaGerencia.Sedes.forEach((e) => {
  //   let valor = $('#dat_am_planta_trabajador').text();
  //   if (e.Id = valor) {
  //     planta = e.Description;
  //   }
  // })

  let img_logo = new Image(); //imagen logo
  img_logo.src = 'images/sho/tasa_logo.png';
  doc.addImage(img_logo, 'png', 28, 12, 18, 18)

  doc.setFontSize(10);
  doc.text(`COMPLEJO ${planta}`, 105, 25, "center");
  doc.line(28, 32, 180, 32);

  doc.text(`CERTIFICADO MÉDICO`, 105, 45, "center");

  doc.setFontSize(10);
  doc.text("El que suscribe, Médico Cirujano:", 28, 58);
  // doc.text(`${nombres_a} ${apellidos_a}`, 81, 58);
  doc.text(medico, 81, 58);
  doc.line(81, 59, 180, 59);

  doc.text("CMP N°:", 28, 64);
  doc.text(cmp, 43, 64);
  doc.line(42, 65, 94, 65);

  doc.text("CERTIFICA QUE:", 28, 73);

  doc.text("El Trabajador:", 28, 79);
  doc.text(`${nombres_b} ${apellidos_b}`, 52, 79);
  doc.line(51, 80, 122, 80);

  doc.text("DNI:", 125, 79);
  doc.text(dni, 134, 79);
  doc.line(133, 80, 180, 80);


  doc.text("Cargo:", 28, 85);
  doc.text(cargo, 41, 85);
  doc.line(40, 86, 90, 86);

  doc.text("Área de Trabajo:", 93, 85);
  doc.text(area_trabajo, 121, 85);
  doc.line(120, 86, 180, 86);

  doc.text("Diagnostico (CIE 10):", 28, 91);
  doc.text(diagnostico, 63, 91);
  doc.line(62, 92, 180, 92);
  doc.line(28, 97, 180, 97);

  doc.text("Por lo cual se le Indica", 28, 104);
  doc.text(indica, 65, 104);
  doc.line(64, 105, 76, 105);
  doc.text("días de descanso medico.", 78, 104);

  doc.text("Del", 28, 110);
  doc.text(dia_a, 35, 110);
  doc.line(34, 111, 42, 111);
  doc.line(42, 110, 43, 107);

  doc.line(43, 111, 51, 111);
  doc.text(mes_a, 44, 110);
  doc.line(51, 110, 52, 107);

  doc.text(ano_a, 53, 110);


  doc.text("al", 62, 110);

  doc.line(65, 111, 73, 111);
  doc.text(dia_b, 66, 110);
  doc.line(73, 110, 74, 107);

  doc.line(74, 111, 82, 111);
  doc.text(mes_b, 75, 110);
  doc.line(82, 110, 83, 107);

  doc.text(ano_b, 84, 110);


  doc.line(112, 122, 135, 122);
  doc.text(dia_c_text, 113, 121);
  doc.text(",", 136, 121);

  doc.line(137, 122, 146, 122);
  doc.text(dia_c, 138, 121);
  doc.text("de", 147, 121);

  doc.line(151, 122, 171, 122);
  doc.text(mes_c_text, 152, 121);
  doc.text(ano_c, 172, 121);


  doc.text("Firma y Sello del Médico", 105, 170, "center");
  doc.line(80, 165, 130, 165);
  doc.output('dataurlnewwindow');
  // doc.save(`Descanso_${nombres_a}_${apellidos_a}`);
}



function fnSp3CrearNuevo_DM_en_Blanco_AM()
  {//------------------------------------------------------------------------------------------------------------
  
    //alert('entrando al descanso medico');
      var hoy = new Date();
      var mes = hoy.getMonth() + 1;
      var dia = hoy.getDate();
      if (mes < 10) { mes = '0' + mes; }
      if (dia < 10) { dia = '0' + dia; }

      var f1 = hoy.getFullYear() + '-' + mes + '-' + dia;
      
      
    



           var body = 

         {
                "IdHC": idHC, //Id Historia clinica
                "IdDescM": 0,
                "A_DniTrabajador":  $('#dat_am_dni_trabajador').val(),
                "A_NombreTrabjador": $('#dat_am_nombres_trabajador').val(),
                "A_ApellidosTrabajador":  $('#dat_am_apellidos_trabajador').val(),
                "A_Empresa": '', //$('#dat_des_empresa_v').val(),
                "A_Origen": 1,//1,//POR SER DE UNA ATENCION MEDICA
                "A_IdAtencionMedica": idAM,//preguntar como se vincula???
                
                "A_Gerencia": parseInt($('#dat_am_gerencia_trabajador').val()),
                "A_Planta":  parseInt($('#dat_am_planta_trabajador').val()),
                "A_Area":  parseInt($('#dat_am_area_trabajador').val()),
                "A_PuestoTrabajo":  $('#dat_am_puesto_trabajo_trabajador').val(),
                "B_PersonalSolicitud": $('#dat_am_personal_descanso').val(),//VER NO SE
                "B_PersonalIdHash": "",
                "B_TipoContingencia":0,// parseInt($('#dat_am_contingencia_descanso').val()),
                "B_DescansoPorEnfermedad":  parseInt($('#dat_am_enfermedad_descanso').val()),
              
                "B_CMP": $('#dat_am_cmp_descanso').val(),
                "B_CantidadDias":0,// parseInt($('#dat_am_cantidad_dias_descanso').val()),
                "B_DiasAcumulados":0, // parseInt($('#dat_am_dias_acumulados_descanso').val()),
                "B_FechaIni":f1,//dat_am_fecha_inicio_descanso

                "B_FechaFin":f1,//dat_am_fecha_fin_descanso
                "B_HuboAltaMedica": parseInt($('#dat_am_alta_medica_descanso').val()),
                "B_EstableceDescanso":0, // parseInt($('#dat_am_establecimineto_descanso').val()),
                "B_Particular": $('#dat_am_particular_descanso').val()
        }

       
        var url = apiUrlsho+"/api/hce_Post_023_descanso_medico?code=ZMMXyYQzh2QaROc92eMe55BMlkkckJVD9r9mxqTmHFpCUXm75EvSsQ==&httpmethod=post";

        console.log('urlr:', url)
        console.log('body new descanso:', body)

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
               }).done(function (data)
               {

                   console.log('después crear',data);
                   if(data.Id > 0)
                   {
                      //isNow = 0;
                       console.log('1348 se registro correctamente y vacio ekl descanso medico = '+data.Id );
                       hideLoading();
                        paObj_DM_SAP[data.Id] = new DescansoMedico();
                        paObj_DM_SAP[data.Id].cargarData(data);
                       
                       //istAud2 //histria clinica
                       id_DM = data.Id;
                      
                      

                   }

               })
               .fail(function( jqXHR, textStatus, errorThrown ) {

                   //alert('Al Crear el registro de Descanso Médicos'+ 'Intente Nuevamente');

                    Swal.fire({
                              imageUrl: "images/sho/advertencia.svg",
                              imageWidth: 48,
                              imageHeight: 48,
                              title: "Error!, Al crear el nuevo registro de Descanso Médicos Intente Nuevamente",
                              showConfirmButton: true
                            })


                       //handlerUrlhtml('contentGlobal', 'view/sho-hce/historia_clinica/gestionHistoriaClinica.html', 'Historia clínica electrónica');
     
               })
               .always(function( jqXHR, textStatus, errorThrown ) {

               });


  }//--------------------------------------------------------------------------------------------------------------







function fnSp3ModificarNuevaDescansoMedico_AM()
{//-------------------------------------------------------------------------------------------------------------------------
        
        // if(isNow == 1)
        // {
        //   istAudT = istAud;
        // }

         if(newD == 1)
         {
             
         }

     //alert("la trasnferencia es la = "+istAud+" y los signos vitales Id = "+IdSV);
         showLoading();

         var f1g =  $('#dat_am_fecha_inicio_descanso').val();
         var pru = f1g.split('/');
         var f1g = pru[2]+'-'+pru[1]+'-'+pru[0];
         let jpru = f1g.split('undefined-undefined-');f1g = jpru[1];

         var f2g =  $('#dat_am_fecha_fin_descanso').val();
         var prux = f2g.split('/');
         var f2g = prux[2]+'-'+prux[1]+'-'+prux[0];
         let jpru2 = f2g.split('undefined-undefined-');f2g = jpru2[1];
    
        var body = {
                    "IdHC": idHC, //Id Historia clinica
                    "IdDescM": id_DM,
                    "A_DniTrabajador":  $('#dat_am_dni_trabajador').val(),
                    "A_NombreTrabjador": $('#dat_am_nombres_trabajador').val(),
                    "A_ApellidosTrabajador":  $('#dat_am_apellidos_trabajador').val(),
                    "A_Empresa": '', //$('#dat_des_empresa_v').val(),
                    "A_Origen": $('#dat_des_origen_v').val(),//1,//POR SER DE UNA ATENCION MEDICA
                    "A_IdAtencionMedica": idAM,//preguntar como se vincula???
                    
                    "A_Gerencia": $('#dat_am_gerencia_trabajador').val(),
                    "A_Planta":  $('#dat_am_planta_trabajador').val(),
                    "A_Area":  $('#dat_am_area_trabajador').val(),
                    "A_PuestoTrabajo":  $('#dat_am_puesto_trabajo_trabajador').val(),
                    "B_PersonalSolicitud": $('#dat_am_personal_descanso').val(),//VER NO SE
                    "B_PersonalIdHash": "",
                    "B_TipoContingencia": $('#dat_am_contingencia_descanso').val(),
                    "B_DescansoPorEnfermedad":  $('#dat_am_enfermedad_descanso').val(),
                  
                    "B_CMP": $('#dat_am_cmp_descanso').val(),
                    "B_CantidadDias": $('#dat_am_cantidad_dias_descanso').val(),
                    "B_DiasAcumulados": $('#dat_am_dias_acumulados_descanso').val(),
                    "B_FechaIni":f1g,//dat_am_fecha_inicio_descanso

                    "B_FechaFin":f2g,//dat_am_fecha_fin_descanso
                    "B_HuboAltaMedica": $('#dat_am_alta_medica_descanso').val(),
                    "B_EstableceDescanso": $('#dat_am_establecimineto_descanso').val(),
                    "B_Particular": $('#dat_am_particular_descanso').val()
                    }

            var url = apiUrlsho+"/api/hce_Post_023_descanso_medico?code=ZMMXyYQzh2QaROc92eMe55BMlkkckJVD9r9mxqTmHFpCUXm75EvSsQ==&httpmethod=post";

            console.log('urlr:', url)
            console.log('body new descanso:', body)

            console.log('urlr:', url)

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
                   }).done(function (data)
                   {

                       console.log('despues crear',data);
                       if(data.Id > 0)
                       {
                           console.log('SE GUARDO BIEN EL DESCANSO = '+data.Id );
                      
                        }
                        else 
                        {
                            Swal.fire({
                                      icon: 'error',
                                      title: 'Descanso Medico',
                                      text: 'Error al crear el registro de la Descanso Medico',
                                      footer: '<a href="">Why do I have this issue?</a>'
                                    })
                        }

                   })
                   .fail(function( jqXHR, textStatus, errorThrown ) {

                     
                          Swal.fire({
                                      icon: 'error',
                                      title: 'Descanso Medico',
                                      text: 'Error al crear el registro de la Descanso Medico',
                                      footer: '<a href="">Why do I have this issue?</a>'
                                    })
                   })
                   .always(function( jqXHR, textStatus, errorThrown ) {

                   });




}//-------------------------------------------------------------------------------------------------------------------------

