//--------------------------VARIABLES GLOBALES------------------------------//


var paObj_am = [];










function cargarAreasSedesGerencia() {
  
  let url = `https://550m44ud1tmg7454-inspection-dev.azurewebsites.net/api/a_get_lista_sedes_areas_gerencia?code=5sz/nIVDXtW7t97kzgfOyzuN4yYq6FEfuJoZSlk3DzGQ9AMLu7k6WQ==&IdSede=0&IdArea=0&IdGerencia=0`;

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

  $.ajax(settings).done((response) => {
    paObj_ec.Areas = response.Area;
    paObj_ec.Sedes = response.Sedes;
    paObj_ec.Gerencias = response.Gerencia;

    paObj_ec.Areas.forEach((e) => {
      let content = $('#sp4EnferCron_busq_reg_area');
      content.append(`
          <option value="${e.Id}">${e.Description}</option>
        `)
    });

    paObj_ec.Sedes.forEach((e) => {
      let content = $('#sp4EnferCron_busq_reg_unidad');
      content.append(`
          <option value="${e.Id}">${e.Description}</option>
        `)
    });

    paObj_ec.Gerencias.forEach((e) => {
      let content = $('#sp4EnferCron_busq_reg_gerencia');
      content.append(`
          <option value="${e.Id}">${e.Description}</option>
        `)
    });
  }).fail((e) => {
    console.log(e);
  })
}


function amSp3MostrarSistemaAfectado(selector) {
  let data = paObj_am.SistemaAfectado;
  let content = $('#'+selector);

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

function amSp3MostrarSeccionAfectada(selector) {
  let data = paObj_am.SeccionAfectada;
  let content = $('#'+selector);

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


//Funcion para ingresar solo número
$(".numero").keydown(function(event){

  if((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode !==190  && event.keyCode !==110 && event.keyCode !==8 && event.keyCode !==9  ){
    return false;
  }

});

// Funcion imc
//Funcion para el calculo de Índice de masa corporal
function imc(idPeso, IdTalla, IdIMC)
{

   var p = $('#'+idPeso).val();
   var t = $('#'+IdTalla).val();

   var div = t*t;
   var imc = p/div;

   $('#'+IdIMC).val(imc);

}

function calcularEdad(fecha) {
    
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;

}


function cargarPlucksDiagnosticosCIE10Descanso() {

  let url = `https://5h0-dev-salud.azurewebsites.net/api/hce_Get_034_sistema_afectado?code=qxkQ9ZXSLatmcpaCr044BU0xgBGcMRX899c8sjilL/dCTIgHf4HyVg==`;

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
    paObj_am.SistemaAfectado = response.SistemaAfectado;
    amSp3MostrarSistemaAfectado("sp4EnferCron_det_des_diagCIE10_sisa");
  });

}

function cargarPlucksDiagnosticosCIE10Descanso2() {

  let url2 = `https://5h0-dev-salud.azurewebsites.net/api/hce_Get_035_seccion_afectada?code=7waSycbZnJkX12509pMvTJINkreJkBBQCrsMZNYeY6R5AayCauB5nQ==`;

  let headers2 = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings2 = {
    "url": url2,
    "method": "get",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers2
  };

  return $.ajax(settings2).done((response) => {
    console.log(response);
    paObj_am.SeccionAfectada = response.SeccionAfectada;
    amSp3MostrarSeccionAfectada("sp4EnferCron_det_des_diagCIE10_seca");
  });

}

function cargarPlucksDiagnosticosCIE10Interconsulta() {


 let url = `https://5h0-dev-salud.azurewebsites.net/api/hce_Get_034_sistema_afectado?code=qxkQ9ZXSLatmcpaCr044BU0xgBGcMRX899c8sjilL/dCTIgHf4HyVg==`;

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
    amSp3MostrarSistemaAfectado("sp4EnferCron_intercon_diagCIE10_sisa");
  });

}

function cargarPlucksDiagnosticosCIE10Interconsulta2() {


  let url2 = `https://5h0-dev-salud.azurewebsites.net/api/hce_Get_035_seccion_afectada?code=7waSycbZnJkX12509pMvTJINkreJkBBQCrsMZNYeY6R5AayCauB5nQ==`;

  let headers2 = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings2 = {
    "url": url2,
    "method": "get",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers2
  };

  return $.ajax(settings2).done((response) => {
    // console.log(response);
    paObj_am.SeccionAfectada = response.SeccionAfectada;
    amSp3MostrarSeccionAfectada("sp4EnferCron_intercon_diagCIE10_seca");
  });

}

function cargarPlucksDiagnosticosCIE10Transferencia() {



  let url = `https://5h0-dev-salud.azurewebsites.net/api/hce_Get_034_sistema_afectado?code=qxkQ9ZXSLatmcpaCr044BU0xgBGcMRX899c8sjilL/dCTIgHf4HyVg==`;

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
    amSp3MostrarSistemaAfectado("sp4EnferCron_transf_diagCIE10_sisa");
  });



}

function cargarPlucksDiagnosticosCIE10Transferencia2() {


  let url2 = `https://5h0-dev-salud.azurewebsites.net/api/hce_Get_035_seccion_afectada?code=7waSycbZnJkX12509pMvTJINkreJkBBQCrsMZNYeY6R5AayCauB5nQ==`;

  let headers2 = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings2 = {
    "url": url2,
    "method": "get",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers2
  };

  return $.ajax(settings2).done((response) => {
    // console.log(response);
    paObj_am.SeccionAfectada = response.SeccionAfectada;
    amSp3MostrarSeccionAfectada("sp4EnferCron_transf_diagCIE10_seca");
  });



}

function cargarPlucksDiagnosticosCIE10TransferenciaRespuesta() {


  let url = `https://5h0-dev-salud.azurewebsites.net/api/hce_Get_034_sistema_afectado?code=qxkQ9ZXSLatmcpaCr044BU0xgBGcMRX899c8sjilL/dCTIgHf4HyVg==`;

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
    amSp3MostrarSistemaAfectado("sp4EnferCron_transf_diagCIE10_sisa2");
  });

  


}

function cargarPlucksDiagnosticosCIE10TransferenciaRespuesta() {



  let url2 = `https://5h0-dev-salud.azurewebsites.net/api/hce_Get_035_seccion_afectada?code=7waSycbZnJkX12509pMvTJINkreJkBBQCrsMZNYeY6R5AayCauB5nQ==`;

  let headers2 = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings2 = {
    "url": url2,
    "method": "get",
    "timeout": 0,
    "crossDomain": true,
    "dataType": 'json',
    "headers": headers2
  };

  return $.ajax(settings2).done((response) => {
    // console.log(response);
    paObj_am.SeccionAfectada = response.SeccionAfectada;
    amSp3MostrarSeccionAfectada("sp4EnferCron_transf_diagCIE10_seca2");
  });


}


function cargarDatosEnfermedadCronica() {
  
  var varJson= {   
    "enfermedad_cronica": "Enfermedad Crónica 1",
    "fecha_registro": "2020/11/20",
    "DescansoEC": [
      {
        "fecha_inicio": "10/02/2021",
        "fecha_fin": "20/02/2021",
        "dias": "23",
        "dias_acumulados": "30",
        "dias_restantes": "15"
      },
      {
        "fecha_inicio": "15/02/2021",
        "fecha_fin": "25/02/2021",
        "dias": "13",
        "dias_acumulados": "10",
        "dias_restantes": "25"
      }        
    ],
    "TransferenciaEC": [
      {
        "codigo_transferencia": "COD0001",
        "fecha_emision": "Establecimiento 1",
        "especialidad": "Especialidad 10",
        "recepcion_puestos": "Si",
        "aptitud": "Apto"
      }      
    ],
    "InterconsultaEC": [
      {
        "codigo_interconsulta": "COD0002",
        "fecha_emision": "10/02/2021  ",
        "especialidad": "Especialidad 1",
        "recepcion_puestos": "No",
        "aptitud": "Apto"
      }      
    ],
    "ComentarioEC": [     
    ]
  };

  $('#sp4EnferCron_enfercro_nombre_enfermedad').val(varJson.enfermedad_cronica);
  $('#sp4EnferCron_enfercro_fecha_reg').val(new Date(varJson.fecha_registro).toLocaleDateString('en-GB').split('T')[0]);

  $("#table_sp4EnferCron_des_med2 tbody").find(".table-row").remove();
  $('#table_sp4EnferCron_des_med2-count-row').text(Object.keys(varJson.DescansoEC).length);


  if(Object.keys(varJson.DescansoEC).length > 0){

    $.each(varJson.DescansoEC, function(index,accountObj){

      html_tbody = "<tr class='table-row'>";
      html_tbody += "<td>";
      html_tbody += accountObj.fecha_inicio;
      html_tbody += "</td>";
      html_tbody += "<td>";
      html_tbody += accountObj.fecha_fin;
      html_tbody += "</td>";
      html_tbody += "<td>";
      html_tbody += accountObj.dias;
      html_tbody += "</td>";
      html_tbody += "<td>";
      html_tbody += accountObj.dias_acumulados;
      html_tbody += "</td>";
      html_tbody += "<td>";
      html_tbody += accountObj.dias_restantes;
      html_tbody += "</td>";
      html_tbody += "<td>";
      html_tbody += "<a class='dropdown-item'>";
      html_tbody += "<img src='./images/sho/eyeIcon.svg' alt='' fill='#01719d'>";
      html_tbody += "</a>";                    
      html_tbody += "</td>";
      html_tbody += "</tr>";

      $("#table_sp4EnferCron_des_med2 tbody").append(html_tbody);

    });

    $("#table_sp4EnferCron_des_med2 tbody .table-empty").addClass('d-none');
  
  } 

  $("#table_sp4EnferCron_trans2 tbody").find(".table-row").remove();
  $('#table_sp4EnferCron_trans2-count-row').text(Object.keys(varJson.TransferenciaEC).length);

  if(Object.keys(varJson.TransferenciaEC).length > 0){

    $.each(varJson.TransferenciaEC, function(index,accountObj){

      html_tbody = "<tr class='table-row'>";
      html_tbody += "<td>";
      html_tbody += accountObj.codigo_transferencia;
      html_tbody += "</td>";
      html_tbody += "<td>";
      html_tbody += accountObj.fecha_emision;
      html_tbody += "</td>";
      html_tbody += "<td>";
      html_tbody += accountObj.especialidad;
      html_tbody += "</td>";
      html_tbody += "<td>";
      html_tbody += accountObj.recepcion_puestos;
      html_tbody += "</td>";
      html_tbody += "<td width='500px'>";
      html_tbody += accountObj.aptitud;
      html_tbody += "</td>";
      html_tbody += "<td>";
      html_tbody += "<a class='dropdown-item'>";
      html_tbody += "<img src='./images/sho/eyeIcon.svg' alt='' fill='#01719d'>";
      html_tbody += "</a>";                    
      html_tbody += "</td>";
      html_tbody += "</tr>";

      $("#table_sp4EnferCron_trans2 tbody").append(html_tbody);

    }); 

    $("#table_sp4EnferCron_trans2 tbody .table-empty").addClass('d-none');

  }

  $("#table_sp4EnferCron_intercon2 tbody").find(".table-row").remove();
  $('#table_sp4EnferCron_intercon2-count-row').text(Object.keys(varJson.InterconsultaEC).length);

  if(Object.keys(varJson.InterconsultaEC).length > 0){

    $.each(varJson.InterconsultaEC, function(index,accountObj){

      html_tbody = "<tr class='table-row'>";
      html_tbody += "<td>";
      html_tbody += accountObj.codigo_interconsulta;
      html_tbody += "</td>";
      html_tbody += "<td>";
      html_tbody += accountObj.fecha_emision;
      html_tbody += "</td>";
      html_tbody += "<td>";
      html_tbody += accountObj.especialidad;
      html_tbody += "</td>";
      html_tbody += "<td>";
      html_tbody += accountObj.recepcion_puestos;
      html_tbody += "</td>";
      html_tbody += "<td width='500px'>";
      html_tbody += accountObj.aptitud;
      html_tbody += "</td>";
      html_tbody += "<td>";
      html_tbody += "<a class='dropdown-item'>";
      html_tbody += "<img src='./images/sho/eyeIcon.svg' alt='' fill='#01719d'>";
      html_tbody += "</a>";                    
      html_tbody += "</td>";
      html_tbody += "</tr>";

      $("#table_sp4EnferCron_intercon2 tbody").append(html_tbody);

    });

    $("#table_sp4EnferCron_intercon2 tbody .table-empty").addClass('d-none');

  } 

  $("#table_sp4EnferCron_comentario2 tbody").find(".table-row").remove();
  $('#table_sp4EnferCron_comentario2-count-row').text(Object.keys(varJson.ComentarioEC).length);

  if(Object.keys(varJson.ComentarioEC).length > 0){

    $.each(varJson.ComentarioEC, function(index,accountObj){

      html_tbody = "<tr class='table-row'>";
      html_tbody += "<td>";
      html_tbody += accountObj.fecha_registro;
      html_tbody += "</td>";
      html_tbody += "<td width='900px'>";
      html_tbody += accountObj.comentario;
      html_tbody += "</td>";
      html_tbody += "</tr>";

      $("#table_sp4EnferCron_comentario2 tbody").append(html_tbody);

    }); 

    $("#table_sp4EnferCron_comentario2 tbody .table-empty").addClass('d-none');

  } 

}




function cargarDatosGeneralesTra(id) {
  idHC = id;
  showLoading();
  //cargarAreasSedesGerencia();
  //handlerUrlhtml('contentGlobal', 'view/sho-hce/enfermedades_cronicas/indexEC.html', 'Enfermedades Crónicas');
  let url = `https://5h0-dev-salud.azurewebsites.net/api/hce_Get_003_historia_clinica_datos_generales?code=EGqLSsRdXVPm7TSRIZ6/MGieka3md/u1gwzEwWcGhOjMZqDNK1jjRw==`;

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
    "data": { "IdHC": id }
  };

  $.ajax(settings).done((response) => {
    console.log(" datos generalessssssssss", response);
    /*if (response.HistoriaExamenAuxiliar.length > 0) {
      dgSp3AtencionesMedicas(response.HistoriaAtencionMedica);
      paObj_ec[idHC].HistoriaExamenAuxiliar = response.HistoriaExamenAuxiliar;
      dgSp3ExamenAuxiliar(response.HistoriaExamenAuxiliar, response.HistoriaTipoExamen);
    }*/

    /*if (response.HistoriaClin[0].FotoPacienteBase64) {
      $("#img_file_perfil").attr("src", response.HistoriaClin[0].FotoPacienteBase64);
    } else {
      $("#img_file_perfil").attr("src", 'images/sho/profile.png')
    }*/

    setTimeout(() => {
      //cargarTiposExamen(response.HistoriaTipoExamen);
      cargarDatosTrabajador(response.HistoriaClin[0]);
      //dgSp3SignosVitales(response.HistoriaSignosVitales[0]);
      //dgSp3AdjuntoEvidencia(response.HistoriaAdjuntoEvidencia);

      // console.log(response.HistoriaAdjuntoEvidencia[0]);
      hideLoading();
    }, 1200);

  });
}

function cargarDatosTrabajador(obj) {
  /*paObj_ec.Sedes.forEach((e) => {
    if (e.Id == obj.PlantaId_Empresa_H) {
      $('#dat_dg_planta_trabajador').text(e.Description);
    }
  });
  paObj_ec.Areas.forEach((e) => {
    if (e.Id == obj.AreaId_Empresa_H) {
      $('#dat_dg_area_trabajador').text(e.Description);
    }
  });
  paObj_ec.Gerencias.forEach((e) => {
    if (e.Id == obj.GerenciaId_Empresa_H) {
      $('#dat_dg_gerencia_trabajador').text(e.Description);
    }
  });*/

//console.log(obj);

  $('#nombre-trabajador').text(obj.Nombres_Trabajador_H+" "+obj.Apellidos_Trabajador_H);

  $('#sp4EnferCron_dat_trab_nro').val(obj.NroDocumento_Trabajador_H);
  $('#sp4EnferCron_dat_trab_nombre').val(obj.Nombres_Trabajador_H);
  $('#sp4EnferCron_dat_trab_apellido').val(obj.Apellidos_Trabajador_H);
  $('#sp4EnferCron_dat_trab_edad').val(obj.Edad_Trabajador_H);
  //$('#sp4EnferCron_dat_trab_edad').val(calcularEdad(obj.FechaIngresoTasa_H));
  $('#sp4EnferCron_dat_trab_fecha_reg').val(new Date(obj.FechaRegistro_Trabajador_H).toLocaleDateString('en-GB').split('T')[0]);
  $('#sp4EnferCron_dat_trab_fi_tasa').val(new Date(obj.FechaIngresoTasa_H).toLocaleDateString('en-GB').split('T')[0]);
  
  if(obj.FechaRetiroTasa_H === undefined){
    $('#sp4EnferCron_dat_trab_fr_tasa').val('Sin fecha de registro');
  }
  else
  {
    $('#sp4EnferCron_dat_trab_fr_tasa').val(new Date(obj.FechaRetiroTasa_H).toLocaleDateString('en-GB').split('T')[0]);
  }
  

  $('#sp4EnferCron_dat_trab_gerencia').val(obj.GerenciaId_Empresa_H);
  $('#sp4EnferCron_dat_trab_planta').val(obj.PlantaId_Empresa_H);
  $('#sp4EnferCron_dat_trab_area').val(obj.AreaId_Empresa_H);

  $("#sp4EnferCron_dat_trab_gerencia_des").val(obj.GerenciaId_Empresa_H);
  $("#sp4EnferCron_dat_trab_planta_des").val(obj.PlantaId_Empresa_H);
  $("#sp4EnferCron_dat_trab_area_des").val(obj.AreaId_Empresa_H);
  $("#sp4EnferCron_dat_trab_ptrab_des").val(obj.PuestoTrabajo_Empresa_H);
  

 /*alert("actu");
    $('#sp4EnferCron_dat_trab_fecha_reg').datepicker();
    $('#sp4EnferCron_dat_trab_fecha_reg').datepicker('setDate', new Date(obj.FechaRegistro_Trabajador_H));*/


  /*$('#dat_dg_edad_trabajador').text(obj.Edad_Trabajador_H);
  $('#dat_dg_nombres').text(obj.Nombres_Trabajador_H);
  $('#dat_dg_apellidos').text(obj.Apellidos_Trabajador_H);
  $('#dat_dg_sexo_trabajador').text((obj.Sexo_Trabajador_H == 1) ? 'Masculino' : 'Femenino');
  $('#dat_dg_puesto_trabajador').text(obj.PuestoTrabajo_Empresa_H);*/
}


function ecSp4VerDetalleDescanso(IdDescanso){

  idDetalle = IdDescanso;

  handlerUrlhtml('contentGlobal', 'view/sho-hce/enfermedades_cronicas/verDescanso.html', 'Detalle del descanso médico');

}

function ecSp4VerDetalleInterconsulta(IdInterconsulta){

  idDetalle = IdInterconsulta;


  handlerUrlhtml('contentGlobal', 'view/sho-hce/enfermedades_cronicas/verInterconsulta.html', 'Detalle de la interconsulta ');
}

function ecSp4VerDetalleTransferencia(IdTransferencia){

  idDetalle = IdTransferencia;

handlerUrlhtml('contentGlobal', 'view/sho-hce/enfermedades_cronicas/verTransferencia.html', 'Detalle de la transferencia ');

}

//--------------------------FUNCIONES PARA NAVEGACIÓN------------------------------//

// Funcion showGestionDescanso
//Redirecciona a la vista Gestionar Descanso
function showGestionDescanso() { 

  //Aca se captura el nombre de la enfermedad crónica por la cual se gestionara un descanso médico
  campoControl = $('#sp4EnferCron_enfercro_nombre_enfermedad').val();

	handlerUrlhtml('contentGlobal', 'view/sho-hce/enfermedades_cronicas/gestionDescanso.html', 'Registrar Descansos Médicos');

}

// Funcion showGestionInterconsulta
//Redirecciona a la vista Gestionar Interconsulta
function showGestionInterconsulta() { 

  //Aca se captura el nombre de la enfermedad crónica por la cual se gestionara un descanso médico
  campoControl = $('#sp4EnferCron_enfercro_nombre_enfermedad').val();

	handlerUrlhtml('contentGlobal', 'view/sho-hce/enfermedades_cronicas/gestionInterconsulta.html', 'Registrar Interconsulta');
	//cargarAreasSedesGerencia();
	//hcSp3GuardarHistoriaClinica();
} 

// Funcion showGestionTransferencia
//Redirecciona a la vista Gestionar Transferencia
function showGestionTransferencia() { 

  //Aca se captura el nombre de la enfermedad crónica por la cual se gestionara un descanso médico
  campoControl = $('#sp4EnferCron_enfercro_nombre_enfermedad').val();

	handlerUrlhtml('contentGlobal', 'view/sho-hce/enfermedades_cronicas/gestionTransferencia.html', 'Registrar Transferencia');

} 

// Funcion showIndexEC
//Redirecciona a la vista Principal de Enfermedades Crónicas
function showIndexEC() { 

	handlerUrlhtml('contentGlobal', 'view/sho-hce/enfermedades_cronicas/indexEC.html', 'Registro de Enfermedades Crónicas');

} 

// Funcion showGestionEC
//Redirecciona a la vista Gestionar Enfermedades Crónicas
function showGestionEC() {

	handlerUrlhtml('contentGlobal', 'view/sho-hce/enfermedades_cronicas/gestionEnfermedadCronica.html', 'Registrar Enfermedades Crónicas');

} 

//--------------------------FUNCION VALIDAR FORMULARIO------------------------------//

function validationForm(class_selector) {
  let error = [];
  let inputs = $('input.'+class_selector);
  let selects = $('select.'+class_selector);

  inputs.each((e) => {
  	if (!inputs.eq(e).val()) {
    	inputs.eq(e).addClass('is-invalid');
    	inputs.eq(e).parent().find('.invalid-feedback').remove();
    	inputs.eq(e).parent().append(`<div class="invalid-feedback">Requerido!</div>`)
    	error.push(inputs.eq(e).val())
    }
    if (inputs.eq(e).val()) {
    	inputs.eq(e).removeClass('is-invalid');
    }
  })

  selects.each((e) => {
    if (!selects.eq(e).val()) {
    	selects.eq(e).addClass('is-invalid');
    	selects.eq(e).parent().find('.invalid-feedback').remove();
    	selects.eq(e).parent().append(`<div class="invalid-feedback">Requerido!</div>`)
    	error.push(selects.eq(e).val())
	}
    if (selects.eq(e).val()) {
    	selects.eq(e).removeClass('is-invalid');
    }
  })

  return error;
}

//--------------------------FUNCION BORRAR REGISTRO TABLA------------------------------//

function onBtnDeleteRow(){

  Numero_Filas = $("#"+$(this).closest("table").attr('id')+" tbody tr").length;
  Numero_Filas--;

  if(Numero_Filas == 1 ){
    	
    $(this).closest("table").find('.table-empty').removeClass('d-none');
  }

  $("#"+$(this).closest("table").attr('id')+"-count-row").text(Numero_Filas);
  $(this).closest("tr").remove();
  
}

//--------------------------FUNCION CARGAR FECHA HOY (FORMATO PARA GUARDAR EN BD)------------------------------//

function cargarFechaHoy() {

  var fecha = new Date(); //Fecha actual
  var mes = fecha.getMonth()+1; //obteniendo mes
  var dia = fecha.getDate(); //obteniendo dia
  var ano = fecha.getFullYear(); //obteniendo año
  
  if(dia<10){
    dia='0'+dia; //agrega cero si el menor de 10
  }
  
  if(mes<10){
    mes='0'+mes //agrega cero si el menor de 10
  }

  return (ano+"-"+mes+"-"+dia);

}

//--------------------------FUNCION CARGAR FECHA HOY (FORMATO PARA GUARDAR EN BD)------------------------------//

function cargarFechaFormato(Fecha) {

  var mes = Fecha.substring(3,5); //obteniendo mes
  var dia = Fecha.substring(0,2); //obteniendo dia
  var ano = Fecha.substring(6,10); //obteniendo año

  if(parseInt(dia)<10){
    dia='0'+dia; //agrega cero si el menor de 10
  }
  
  if(parseInt(mes)<10){
    mes='0'+mes //agrega cero si el menor de 10
  }

  return (ano+"-"+mes+"-"+dia);

}

//--------------------------FUNCION CARGAR ESPECIALIDADES------------------------------//

function ecSp4cargarEspecialidades() {
  
  let url = apiUrlsho+`/api/hce_Get_005_interconsulta?code=5apeYFqxMjc7U4gRbZFs/mBepNwlDkPcUymNTlP7kzOsv5AN3DYecg==`;

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
  };

  return $.ajax(settings).done((response) => {
    pluck_ec['Especialidades'] = response.IntercExpecialidad;
  });
}

//--------------------------FUNCION CARGAR SISTEMA AFECTADO------------------------------//

function ecSp4cargarSistemaAfectado() {


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

    pluck_ec['SistemaAfectado'] = response.SistemaAfectado;

  });

}

//--------------------------FUNCION CARGAR SECCION AFECTADA------------------------------//

function ecSp4cargarSeccionAfectada() {


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

    pluck_ec['SeccionAfectada'] = response.SeccionAfectada;

  });

}

//--------------------------FUNCION CARGAR GRUPOS SANGUINEOS------------------------------//

function ecSp4CargarGruposSanguineoEnfermedadesCronicas() {
  
  //Se especifican los parametros para la consulta
  let url =  apiUrlsho+`/api/hce_Get_022_grupo_sanguineo?code=IhNvDEFrj7QvaNdVB0u1lg32UwyNstFuM75/VlxeAMn2HMJ2SZ9E7g==`;

  let headers = {
    "apikey": constantes.apiKey,
    "Content-Type": "application/json"
  }

  let settings = {
    "url": url,
    "method": "get",
    "dataType": 'json',
    "headers": headers,
  };

  //Se consulta mediante el metodo Ajax
  return $.ajax(settings).done((response) => {

    pluck_ec["GrupoSanguineo"] = response.GrupoSanguineo;

  });

}

//--------------------------FUNCION CARGAR SEDES AREAS GERENCIAS------------------------------//

function ecSp4CargaSedesAreasGerenciasEnfermedadesCronicas() {

  //Se especifican los parametros para la consulta
  var url = apiUrlssoma + "/api/a_get_lista_sedes_areas_gerencia?code=5sz/nIVDXtW7t97kzgfOyzuN4yYq6FEfuJoZSlk3DzGQ9AMLu7k6WQ==&IdSede=0&IdArea=0&IdGerencia=0"
  
  var headers = {
    "apikey": constantes.apiKey
  }

  var settings = {
    "url": url,
    "method": "GET",
    "timeout": 0,
    "crossDomain": true,
    "dataType": "json",
    "headers": headers,
  };

  //Se consulta mediante el metodo Ajax
  return $.ajax(settings).done(function (response) {

    pluck_ec["Areas"] = response.Area;
    pluck_ec["Gerencias"] = response.Gerencia;
    pluck_ec["Sedes"] = response.Sedes;

  });

}

//--------------------------FUNCION CARGAR TIPOS DE CONTINGENCIAS------------------------------//

function ecSp4cargarTiposContingencia() {
  
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
    "headers": headers,
  };

  return $.ajax(settings).done((response) => {
    pluck_ec["TiposContingencia"] = response.TipoContingencia;
  });
}

//--------------------------FUNCION CARGAR ESTABLECIMIENTOS DE EMISION------------------------------//

function ecSp4cargarEstablecimientosEmision() {
  
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
    "headers": headers,
  };

  return $.ajax(settings).done((response) => {
    pluck_ec["EstablecimientosEmision"] = response.EstableceEmisionDescanso;
  });
}

//--------------------------FUNCION CRUD PARA COMENTARIOS DE ENFERMEDADES CRONICAS------------------------------//

function amSp4CRUDComentarioEnfermedadCronica(CodAccion, IdComentario) {
  
  let data = {};
  let TituloModal = '';
  let NumeroFilas = 0;

  /* 

  Los codigos de accion seran:
    0 Para inicializar
    1 Para eliminar

  */

  if( CodAccion == 0){

    if (validationForm('check-comentario').length > 0) {
      return;
    }

  }
  
  data.Id1 = IdComentario; //si es cero se crea el registro  diferente se modifica el registro
  data.EnfermedadCronicaId = idTemporalEC;
  data.CreadoPor = "JG";
  data.Comentario = $('#sp4EnferCron_comentario_com').val()
  data.HistoriaClinicaId = idHC; 
  data.accion = CodAccion; //0 crear registro, 1 eliminarlo logicamente

  let url = apiUrlsho+`/api/hce_enfermedad_cronica_post_comentario?code=mmhtfeuXjUdG9BZpDoDK9F4AOVXY/0wsQkGBSOr2fp6IMJ9xvl1NBA==&httpmethod=post`;

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

    $("#table_sp4EnferCron_comentario tbody").find(".table-empty").remove();

    NumeroFilas = $("#table_sp4EnferCron_comentario tbody tr").length;

    if( CodAccion == 0 ){

      TituloModal = 'Comentario anexado con éxito';

      html_tbody = "<tr>";
      html_tbody += "<td>"+$('#sp4EnferCron_comentario_com').val()+"</td>";
      html_tbody += "<td width='700px'>"+new Date().toLocaleDateString('en-GB').split('T')[0]+"</td>";
      html_tbody += "<td>";
      html_tbody += "<a class='dropdown-item btn-delete' onclick='amSp4CRUDComentarioEnfermedadCronica(1, "+response.Id+");'>";
      html_tbody += "<img src='./images/sho/delete.svg' alt='' fill='#ff3636'>";
      html_tbody += "</a>";
      html_tbody += "</td>";
      html_tbody += "</tr>";

      $("#table_sp4EnferCron_comentario tbody").append(html_tbody);
      $("#table_sp4EnferCron_comentario-count-row").text(NumeroFilas+1);
      $('.check-comentario').val('');

    }
    else{

      TituloModal = 'Comentario eliminado con éxito';

      if( NumeroFilas == 0 ){

        html_tbody =
        "<tr class='table-empty'>"+            
          "<td colspan='3' class='text-center text-uppercase'>"+
            "No hay informacion registrada"+
          "</td>"+
        "</tr> ";

        $("#table_sp4EnferCron_comentario tbody").append(html_tbody);

      }

    }

    Swal.fire({
      title: TituloModal,
      iconColor: "#8fbb02",
      iconHtml: '<img src="./images/sho/check.svg" width="28px">',
      showConfirmButton: false,
      padding: "3em 3em 6em 3em ",
      timer: 1500,
    });

  });

}

//--------------------------FUNCION CRUD PARA ENFERMEDADES CRONICAS------------------------------//

function amSp4CRUDEnfermedadCronica(CodAccion) {
  
  let data = {};
  let EjecutarModal = false;
  let TituloModal = '';
  let Fecha = '';

  /* 

  Los codigos de accion seran:
    0 Para inicializar
    1 Para confirmar o modificar
    2 Para eliminar

  */

  if(CodAccion == 0){

    data.Id1 = 0; //si es cero se crea el registro  diferente se modifica el registro
    data.NombreEnfermedad = "";
    data.CreadoFecha = "";
    data.IdHC = idHC;
    data.Estado = 0;
    data.CreadoPor = "SHO";
    data.ModificadoPor = "SHO";
    data.accion = CodAccion; //0 crear registro, 1 modificarlo, 2 eliminarlo logicamente
    data.FechaModificacion = "";

  }
  else{    

    if( ingresoControl ){

      Fecha = paObj_ec["EnfermedadesCronica"].CreadoFecha;

    }
    else{

      Fecha = $('#sp4EnferCron_enfercro_fecha_reg').val();     

    }
    

    data.Id1 = idTemporalEC; //si es cero se crea el registro  diferente se modifica el registro
    data.NombreEnfermedad = $('#sp4EnferCron_enfercro_nombre_enfermedad').val();
    data.CreadoFecha = Fecha;
    data.IdHC = idHC;
    data.Estado = 1;
    data.CreadoPor = "SHO";
    data.ModificadoPor = "SHO";
    data.accion = CodAccion; //0 crear registro, 1 modificarlo, 2 eliminarlo logicamente
    data.FechaModificacion = Fecha;

  }
  
  let url = apiUrlsho+`/api/hce_enfermedad_cronica_post?code=RYkQ68yUfbG3TsAv9E3Hh8hguSoa6A5nDA7s9DhyZGs60mCm05omkA==&httpmethod=post`;

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

    idTemporalEC = response.Id;
    paObj_ECTemporal[idTemporalEC] = response;

    console.log("Objeto Temporal EC: "+JSON.stringify(paObj_ECTemporal[idTemporalEC]));

    if( CodAccion == 1 ){

      EjecutarModal = true;
      TituloModal = 'Enfermedad Crónica anexada con éxito';

    }

    if( CodAccion == 2 ){

      EjecutarModal = true;
      TituloModal = 'Enfermedad Crónica eliminada con éxito';

    }

    if( EjecutarModal ){

      Swal.fire({
        title: TituloModal,
        iconColor: "#8fbb02",
        iconHtml: '<img src="./images/sho/check.svg" width="28px">',
        showConfirmButton: false,
        padding: "3em 3em 6em 3em ",
        timer: 1500,
      }).then(() => {

        handlerUrlhtml('contentGlobal', 'view/sho-hce/historia_clinica/datosGenerales.html', 'Historia Clínica');

      });     

    }    

  });

}

//--------------------------FUNCION CRUD PARA DESCANSO MEDICO ENFERMEDADES CRONICAS------------------------------//

function amSp4GuardarEditarDescansoMedicoEnfermedadCronica(CodAccion) {
  
  let data = {};
  let EjecutarModal = false;
  let TituloModal = '';

  /* 

  Los codigos de accion seran:
    0 Para inicializar
    1 Para confirmar o modificar

  */

  if( CodAccion == 0 ){

    data.IdHC = idHC;
    data.IdDescM = 0; //si es cero se crea el registro  diferente se modifica el registro
    data.A_DniTrabajador = "";
    data.A_NombreTrabjador = "";
    data.A_ApellidosTrabajador = "";
    data.A_Empresa = "";
    data.A_Origen = 5;
    data.A_IdAtencionMedica = 0;
    data.A_Gerencia = 0; 
    data.A_Planta = 0;
    data.A_Area = 0;
    data.A_PuestoTrabajo = "";
    data.B_PersonalSolicitud = "";
    data.B_PersonalIdHash = "";
    data.B_TipoContingencia = 0;
    data.B_DescansoPorEnfermedad = 0;
    data.B_CantidadDias = 0; 
    data.B_DiasAcumulados = 0; 
    data.B_FechaIni = "2001-01-01"; 
    data.B_FechaFin = "2001-01-01";
    data.B_HuboAltaMedica = 0;
    data.B_EstableceDescanso = 0;
    data.B_Particular = "";
    data.B_CMP = "";
    data.EnfermedadCronicaId = idTemporalEC;

  }
  else{

    if (validationForm('submit').length > 0) {
      return;
    }

    data.IdHC = idHC;
    data.IdDescM = idTemporalDescanso //si es cero se crea el registro  diferente se modifica el registro
    data.A_DniTrabajador = paObj_ec[idHC].NroDocumento_Trabajador_H;
    data.A_NombreTrabjador = paObj_ec[idHC].Nombres_Trabajador_H;
    data.A_ApellidosTrabajador = paObj_ec[idHC].Apellidos_Trabajador_H;
    data.A_Empresa = "---";
    data.A_Origen = 5;
    data.A_IdAtencionMedica = 0;
    data.A_Gerencia = paObj_ec[idHC].GerenciaId_Empresa_H; 
    data.A_Planta = paObj_ec[idHC].PlantaId_Empresa_H;
    data.A_Area = paObj_ec[idHC].AreaId_Empresa_H;
    data.A_PuestoTrabajo = paObj_ec[idHC].PuestoTrabajo_Empresa_H;
    data.B_PersonalSolicitud = $("#dat_personal_salud").val();
    data.B_PersonalIdHash = "";
    data.B_TipoContingencia = $("#dat_tipo_contingencia option:selected").val();
    data.B_DescansoPorEnfermedad = $("#dat_descanso_enfermedad option:selected").val();
    data.B_CantidadDias = $("#dat_cantidad_dias").val();
    data.B_DiasAcumulados = $("#dat_dias_acumulados").val(); 
    data.B_FechaIni = $("#dat_fecha_inicio").val(); 
    data.B_FechaFin = cargarFechaFormato($("#dat_fecha_fin").val()); 
    data.B_HuboAltaMedica = $("#dat_alta_medica option:selected").val();
    data.B_EstableceDescanso = $("#dat_establecimiento option:selected").val();
    data.B_Particular = $("#dat_particular").val(); 
    data.B_CMP = $("#dat_cmp").val(); 
    data.EnfermedadCronicaId = idTemporalEC;

  }

  let url = apiUrlsho+`/api/hce_Post_023_descanso_medico?code=ZMMXyYQzh2QaROc92eMe55BMlkkckJVD9r9mxqTmHFpCUXm75EvSsQ==&httpmethod=post`;

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
    
    idTemporalDescanso = response.Id;
    paObj_DescansoECTemporal[idTemporalDescanso] = response;

    console.log("Objeto Temporal Descanso EC: "+JSON.stringify(paObj_DescansoECTemporal[idTemporalDescanso]));

    if( CodAccion == 1 ){

      EjecutarModal = true;
      TituloModal = 'Descanso médico anexado con éxito';

    }

    if( EjecutarModal ){

      Swal.fire({
        title: TituloModal,
        iconColor: "#8fbb02",
        iconHtml: '<img src="./images/sho/check.svg" width="28px">',
        showConfirmButton: false,
        padding: "3em 3em 6em 3em ",
        timer: 1500,
      }).then(() => {

        handlerUrlhtml('contentGlobal', 'view/sho-hce/enfermedades_cronicas/gestionEnfermedadCronica.html', 'Registrar Enfermedades Crónicas');

      });

    }

  });
  
}



//--------------------------FUNCION CONFIRMACION PARA CRUD DE INTERCONSULTA DE ENFERMEDADES CRONICAS------------------------------//

function amSp4GuardarEditarInterconsultaEnfermedadCronica(CodAccion) {

  let data = {};
  let EjecutarModal = false;
  let TituloModal = '';

  /* 

  Los codigos de accion seran:
    0 Para inicializar
    1 Para confirmar o modificar

  */

  if( CodAccion == 0 ){

    data.IdInter = 0; //si es cero se crea el registro  diferente se modifica el registro
    data.IdHC = idHC;
    data.A_Empresa = "";
    data.A_InterEspecialidad = 0;
    data.A_InterMotivo = "";
    data.A_SeSolicita = "";
    data.A_Otros = "";
    data.A_MedicoCargo = "";
    data.A_IdHashMedico = "";
    data.A_CMP = "";
    data.B_RecibioRespuesta = 0;
    data.B_InstitucionSalud = "";
    data.B_FechaRespuesta = "2000-01-01";
    data.B_HallazgoEval = "";
    data.B_ExamenesAuxiliarers = "";
    data.Tratamiento = "";
    data.C_Recomendaciones = "";
    data.C_RequiereControles = 0;
    data.C_ActitupParaLaboral = 0;
    data.C_FechaProximoControl = "2000-01-01";
    data.C_MedicoEvaluador = "";
    data.C_IdHashMedico = "";
    data.C_CMP = "";
    data.C_RNE = "";
    data.C_Otros = "";
    data.CodigoOrigen = "";
    data.IdOrigen = idTemporalEC; // aqui debe ir el Id la historia clinica, atencion medica,  o de  la enfermedad cronica
    data.IdTipoOrigen = 4; // si es enfremedada cronica es 4
    data.EnfermedadCronicaId = idTemporalEC;

  }
  else
  {

    if (validationForm('submit').length > 0) {
      return;
    }

    data.IdInter = idTemporalInterconsulta; //si es cero se crea el registro  diferente se modifica el registro
    data.IdHC = idHC;
    data.A_Empresa = $('#dat_empresa').val() ;
    data.A_InterEspecialidad = $("#dat_especialidad option:selected").val();
    data.A_InterMotivo = $('#dat_motivo').val();
    data.A_SeSolicita = $('#dat_se_solicita').val();
    data.A_Otros = $('#dat_otros').val();
    data.A_MedicoCargo = $('#dat_medico_cargo').val();
    data.A_IdHashMedico = "";
    data.A_CMP = $('#dat_cmp').val();
    data.B_RecibioRespuesta = $("input[name='dat_recibio_respuesta']:checked").val();
    data.B_InstitucionSalud = $('#dat_institucion_salud').val();
    data.B_FechaRespuesta = $('#dat_fecha_respuesta').val();
    data.B_HallazgoEval = $('#dat_hallazgo').val();
    data.B_ExamenesAuxiliarers = $('#dat_examenes_auxiliares').val();
    data.Tratamiento = $('#dat_tratamiento').val();
    data.C_Recomendaciones = $('#dat_recomendaciones').val();
    data.C_RequiereControles = $("input[name='dat_requiere_control_posterior']:checked").val();
    data.C_ActitupParaLaboral = $("input[name='dat_aptitud']:checked").val();
    data.C_FechaProximoControl = $('#dat_fecha_proximo_control').val();
    data.C_MedicoEvaluador = $('#dat_medico_evaluador').val();
    data.C_IdHashMedico = "";
    data.C_CMP = $('#dat_cmp_recomendaciones').val();
    data.C_RNE = $('#dat_rne').val();
    data.C_Otros = $('#dat_otros_recomendaciones').val();
    data.CodigoOrigen = "EC-"+idTemporalEC;
    data.IdOrigen = idTemporalEC; // aqui debe ir el Id la historia clinica, atencion medica,  o de  la enfermedad cronica
    data.IdTipoOrigen = 4; // si es enfremedada cronica es 4
    data.EnfermedadCronicaId = idTemporalEC;

  }
  
  let url = apiUrlsho+`/api/hce_Post_008_interconsulta?code=p6WGKSBcccNRnMdgJ5xr5uWwAn/FAYyhahe4DRpyNTTZevUnTfPL0w==&httpmethod=post`;

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
    
    idTemporalInterconsulta = response.Id;
    paObj_InterconsultaECTemporal[idTemporalInterconsulta] = response;

    if( CodAccion == 1 ){

      EjecutarModal = true;
      TituloModal = 'Interconsulta anexada con éxito';

    }

    if( EjecutarModal ){

      Swal.fire({
        title: TituloModal,
        iconColor: "#8fbb02",
        iconHtml: '<img src="./images/sho/check.svg" width="28px">',
        showConfirmButton: false,
        padding: "3em 3em 6em 3em ",
        timer: 1500,
      }).then(() => {

        handlerUrlhtml('contentGlobal', 'view/sho-hce/enfermedades_cronicas/gestionEnfermedadCronica.html', 'Registrar Enfermedades Crónicas');

      });     

    }

  });
  
}

//--------------------------FUNCION CONFIRMACION PARA CRUD DE TRANSFERENCIA DE ENFERMEDADES CRONICAS------------------------------//

function amSp4GuardarEditarTransferenciaEnfermedadCronica(CodAccion) {
  
  let data = {};
  let EjecutarModal = false;
  let TituloModal = '';  

  /* 

  Los codigos de accion seran:
    0 Para inicializar
    1 Para eliminar

  */

  if( CodAccion == 0 ){
    
    data.IdHC = idHC;
    data.IdHashUser = "";
    data.IdTransf = 0; //si es cero se crea el registro  diferente se modifica el registro
    data.A_Empresa = "";
    data.A_DireccionTrabajador = "";
    data.A_Telefono = "";
    data.A_Anamnesis = "";
    data.B_Tratamiento = "";
    data.B_MotivoTrasferencia = "";
    data.B_HoraAtencionDSO = "16:21"; 
    data.B_HoraEvaluacion = "16:21";
    data.C_Tratamiento = "";
    data.C_RecibidoPor = "";
    data.C_IdHashRecibido = "";
    data.C_Lugar = "";
    data.C_Fecha = "2000-01-01";
    data.CodigoOrigen = "";
    data.IdOrigen = idTemporalEC; // aqui debe ir el Id la historia clinica, atencion medica,  o de  la enfermedad cronica
    data.IdTipoOrigen = 4; // si es enfremedada cronica es 4
    data.IdSV = 0; //si es cero se crea el registro  diferente se modifica el registro
    data.PresionArterial_SV = 0;
    data.FrecuenciaCardiaca_SV = 0;
    data.FrecuenciaRespiratoria_SV = 0;
    data.Temperatura_SV = 0;
    data.PesoKg_SV = 0;
    data.Talla_SV = 0; 
    data.Saturacion_SV = 0;
    data.IndiceMasaCorporal_SV = 0; 
    data.PerimetroAbdominal_SV = 0;
    data.EnfermedadCronicaId = idTemporalEC;

  }
  else{

    if (validationForm('submit').length > 0) {
      return;
    }

    data.IdHC = idHC;
    data.IdHashUser = "";
    data.IdTransf = idTemporalTransferencia; //si es cero se crea el registro  diferente se modifica el registro
    data.A_Empresa = $("#sp4EnferCron_transf_empresa").val();
    data.A_DireccionTrabajador = $("#sp4EnferCron_transf_dir").val();
    data.A_Telefono = $("#sp4EnferCron_transf_tlf").val();
    data.A_Anamnesis = $("#sp4EnferCron_transf_anamnesis").val();
    data.B_Tratamiento = $("#sp4EnferCron_transf_diagCIE10_trat").val();
    data.B_MotivoTrasferencia = $("#sp4EnferCron_transf_diagCIE10_motivo").val();
    //data.B_HoraAtencionDSO = $("#sp4EnferCron_transf_diagCIE10_hora_dso").val(); 
    //data.B_HoraEvaluacion = $("#sp4EnferCron_transf_diagCIE10_hora_eval").val();
    data.B_HoraAtencionDSO = "16:21";
    data.B_HoraEvaluacion = "16:21";
    data.C_Tratamiento = $("#sp4EnferCron_transf_diagCIE10_trat2").val();
    data.C_RecibidoPor = $("#sp4EnferCron_transf_diagCIE10_recibido2").val();
    data.C_IdHashRecibido = "";
    data.C_Lugar = $("#sp4EnferCron_transf_diagCIE10_luga_des2").val();
    data.C_Fecha = $("#sp4EnferCron_transf_diagCIE10_fecha2").val();
    data.CodigoOrigen = "TR-"+idTemporalTransferencia;
    data.IdOrigen = idTemporalEC; // aqui debe ir el Id la historia clinica, atencion medica,  o de  la enfermedad cronica
    data.IdTipoOrigen = 4; // si es enfremedada cronica es 4
    data.IdSV = 0; //si es cero se crea el registro  diferente se modifica el registro
    data.PresionArterial_SV = $("#dat_hc_presion_arterial_sv").val();
    data.FrecuenciaCardiaca_SV = $("#dat_hc_frecuencia_cardiaca_sv").val();
    data.FrecuenciaRespiratoria_SV = $("#dat_hc_frecuencia_respiratoria_sv").val();
    data.Temperatura_SV = $("#dat_hc_temperatura_sv").val();
    data.PesoKg_SV = $("#dat_hc_peso_sv").val();
    data.Talla_SV = $("#dat_hc_talla_sv").val(); 
    data.Saturacion_SV = $("#dat_hc_saturacion_sv").val();
    data.IndiceMasaCorporal_SV = $("#dat_hc_masa_corporal_sv").val(); 
    data.PerimetroAbdominal_SV = $("#dat_hc_perimetro_abdominal_sv").val();
    data.EnfermedadCronicaId = idTemporalEC;

  }

  let url = apiUrlsho+`/api/hce_Post_017_transferencias?code=x69HnqaaZgWZQTcc61KfkEokA8TYLE6bRUfIxQIwrhOkrrFiYcDVbQ==&httpmethod=post`;

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

    idTemporalTransferencia = response.Id;
    paObj_TransferenciaECTemporal[idTemporalTransferencia] = response;

    console.log("Objeto Temporal Transferencia EC: "+JSON.stringify(paObj_TransferenciaECTemporal[idTemporalTransferencia]));

    if( CodAccion == 1 ){

      EjecutarModal = true;
      TituloModal = 'Transferencia anexada con éxito';

    }

    if( EjecutarModal ){

      Swal.fire({
        title: TituloModal,
        iconColor: "#8fbb02",
        iconHtml: '<img src="./images/sho/check.svg" width="28px">',
        showConfirmButton: false,
        padding: "3em 3em 6em 3em ",
        timer: 1500,
      }).then(() => {

        handlerUrlhtml('contentGlobal', 'view/sho-hce/enfermedades_cronicas/gestionEnfermedadCronica.html', 'Registrar Enfermedades Crónicas');

      });

    }
    
  });
  
}

//--------------------------FUNCION CONFIRMACION PARA CRUD DE ENFERMEDADES CRONICAS------------------------------//

function amSp4ConfirmarCRUDEnfermedadCronica(CodAccion) {

  if( CodAccion != 0 ){

    if (validationForm('submit').length > 0) {
      
      return;

    }

  }

  let nombres = paObj_ec[idHC].Nombres_Trabajador_H;
  let apellidos = paObj_ec[idHC].Apellidos_Trabajador_H;

  Swal.fire({
    title: "Guardar Enfermedad crónica",
    html: `
    <p>Está por guardar la enfermedad crónica de</p>
    <p>${nombres} ${apellidos}</p>
    <p class="mt-5">¿Desea confirmar la acción?</p>`,
    icon: "info",
    showCancelButton: true,
    reverseButtons: true,
    cancelButtonColor: "#ff3636",
    confirmButtonColor: "#8fbb02",
    confirmButtonText: `Confirmar <img class="inject-svg" src="./images/sho/confirm.svg" alt="" fill="#fff" width="18px">`,
    cancelButtonText: `Cancelar <img class="inject-svg" src="./images/sho/cancelar.svg" alt="" fill="#fff" width="18px">`,
  }).then((result) => {

    if (result.isConfirmed) {
        
      amSp4CRUDEnfermedadCronica(CodAccion); 

    }

  });

}
//--------------------------FUNCION CONFIRMACION PARA CRUD INTERCONSULTAS DE ENFERMEDADES CRONICAS------------------------------//

function amSp4ConfirmarCRUDInterconsultaEC(CodAccion) {

  if( CodAccion != 0 ){

    if (validationForm('submit').length > 0) {
      
      return;

    }

  }

  let nombres = paObj_ec[idHC].Nombres_Trabajador_H;
  let apellidos = paObj_ec[idHC].Apellidos_Trabajador_H;

  Swal.fire({
    title: "Guardar Enfermedad crónica",
    html: `
    <p>Está por guardar la interconsulta de</p>
    <p>${nombres} ${apellidos}</p>
    <p class="mt-5">¿Desea confirmar la acción?</p>`,
    icon: "info",
    showCancelButton: true,
    reverseButtons: true,
    cancelButtonColor: "#ff3636",
    confirmButtonColor: "#8fbb02",
    confirmButtonText: `Confirmar <img class="inject-svg" src="./images/sho/confirm.svg" alt="" fill="#fff" width="18px">`,
    cancelButtonText: `Cancelar <img class="inject-svg" src="./images/sho/cancelar.svg" alt="" fill="#fff" width="18px">`,
  }).then((result) => {

    if (result.isConfirmed) {
        
      amSp4GuardarEditarInterconsultaEnfermedadCronica(CodAccion); 

    }

  });
    
  SVGInject($(".inject-svg"));

}

//--------------------------FUNCION CONFIRMACION PARA CRUD TRANSFERENCIAS DE ENFERMEDADES CRONICAS------------------------------//

function amSp4ConfirmarCRUDTransferenciaEC(CodAccion) {

  if( CodAccion != 0 ){

    if (validationForm('submit').length > 0) {
      
      return;

    }

  }

  let nombres = paObj_ec[idHC].Nombres_Trabajador_H;
  let apellidos = paObj_ec[idHC].Apellidos_Trabajador_H;

  Swal.fire({
    title: "Guardar Enfermedad crónica",
    html: `
    <p>Está por guardar la transferencia de</p>
    <p>${nombres} ${apellidos}</p>
    <p class="mt-5">¿Desea confirmar la acción?</p>`,
    icon: "info",
    showCancelButton: true,
    reverseButtons: true,
    cancelButtonColor: "#ff3636",
    confirmButtonColor: "#8fbb02",
    confirmButtonText: `Confirmar <img class="inject-svg" src="./images/sho/confirm.svg" alt="" fill="#fff" width="18px">`,
    cancelButtonText: `Cancelar <img class="inject-svg" src="./images/sho/cancelar.svg" alt="" fill="#fff" width="18px">`,
  }).then((result) => {

    if (result.isConfirmed) {
        
      amSp4GuardarEditarTransferenciaEnfermedadCronica(CodAccion); 

    }

  });
    
  SVGInject($(".inject-svg"));

}

//--------------------------FUNCION CONFIRMACION PARA CRUD DESCANSOS MÉDICOS DE ENFERMEDADES CRONICAS------------------------------//

function amSp4ConfirmarCRUDDescansoMedicoEC(CodAccion) {

  if( CodAccion != 0 ){

    if (validationForm('submit').length > 0) {
      
      return;

    }

  }

  let nombres = paObj_ec[idHC].Nombres_Trabajador_H;
  let apellidos = paObj_ec[idHC].Apellidos_Trabajador_H;

  Swal.fire({
    title: "Guardar Enfermedad crónica",
    html: `
    <p>Está por guardar el descando médico de</p>
    <p>${nombres} ${apellidos}</p>
    <p class="mt-5">¿Desea confirmar la acción?</p>`,
    icon: "info",
    showCancelButton: true,
    reverseButtons: true,
    cancelButtonColor: "#ff3636",
    confirmButtonColor: "#8fbb02",
    confirmButtonText: `Confirmar <img class="inject-svg" src="./images/sho/confirm.svg" alt="" fill="#fff" width="18px">`,
    cancelButtonText: `Cancelar <img class="inject-svg" src="./images/sho/cancelar.svg" alt="" fill="#fff" width="18px">`,
  }).then((result) => {

    if (result.isConfirmed) {
        
      amSp4GuardarEditarDescansoMedicoEnfermedadCronica(CodAccion); 

    }

  });
    
  SVGInject($(".inject-svg"));

}

//--------------------------FUNCION CRUD PARA ELIMINAR INTERCONSULTA ENFERMEDADES CRONICAS------------------------------//

function amSp4CRUDEliminarInterconsultaEnfermedadCronica(IdHistoria, IdInterconsulta) {
  
  let data = {};
  let TituloModal = '';
  let NumeroFilas = 0;

  data.IdHC = IdHistoria; //si es cero se crea el registro  diferente se modifica el registro
  data.IdInter = IdInterconsulta;

  let url = apiUrlsho+`/api/hce_Post_013_interconsulta_eliminado?code=AbsqQr6LDOrGPX91k2y3YDcQfkEH2pdBgaQj55pNbod4L8jYYkCOLg==&httpmethod=post`;

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

    $("#table_sp4EnferCron_intercon tbody").find(".table-empty").remove();

    NumeroFilas = $("#table_sp4EnferCron_intercon tbody tr").length;

    TituloModal = 'Interconsulta eliminada con éxito';

    if( NumeroFilas == 0 ){

      html_tbody =
      "<tr class='table-empty'>"+            
        "<td colspan='6' class='text-center text-uppercase'>"+
          "No hay informacion registrada"+
        "</td>"+
      "</tr> ";

      $("#table_sp4EnferCron_intercon tbody").append(html_tbody);

    }

    Swal.fire({
      title: TituloModal,
      iconColor: "#8fbb02",
      iconHtml: '<img src="./images/sho/check.svg" width="28px">',
      showConfirmButton: false,
      padding: "3em 3em 6em 3em ",
      timer: 1500,
    });

  });

}

//--------------------------FUNCION CRUD PARA ELIMINAR TRANSFERENCIA ENFERMEDADES CRONICAS------------------------------//

function amSp4CRUDEliminarTransferenciaEnfermedadCronica(IdHistoria, IdTransferencia) {
  
  let data = {};
  let TituloModal = '';
  let NumeroFilas = 0;
  
  data.IdHC = IdHistoria; //si es cero se crea el registro  diferente se modifica el registro
  data.IdTransf = IdTransferencia;

  let url = apiUrlsho+`/api/hce_Post_022_transferencias_eliminado?code=esni77EOqjKGGAhgSs2Rs5QABYhvILXpjvRvRSWkbTv/ddZV8qmaYw==&httpmethod=post`;

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

    $("#table_sp4EnferCron_transferencia tbody").find(".table-empty").remove();

    NumeroFilas = $("#table_sp4EnferCron_transferencia tbody tr").length;

    TituloModal = 'Transferencia eliminada con éxito';

    if( NumeroFilas == 0 ){

      html_tbody =
      "<tr class='table-empty'>"+            
        "<td colspan='6' class='text-center text-uppercase'>"+
          "No hay informacion registrada"+
        "</td>"+
      "</tr> ";

      $("#table_sp4EnferCron_transferencia tbody").append(html_tbody);

    }

    Swal.fire({
      title: TituloModal,
      iconColor: "#8fbb02",
      iconHtml: '<img src="./images/sho/check.svg" width="28px">',
      showConfirmButton: false,
      padding: "3em 3em 6em 3em ",
      timer: 1500,
    });

  });

}

//--------------------------FUNCION CRUD PARA ELIMINAR DESCANSO MÉDICO ENFERMEDADES CRONICAS------------------------------//

function amSp4CRUDEliminarDescansoMedicoEnfermedadCronica(IdHistoria, IdDescansoMedico) {
  
  let data = {};
  let TituloModal = '';
  let NumeroFilas = 0;
  
  data.IdHC = IdHistoria; //si es cero se crea el registro  diferente se modifica el registro
  data.IdDescM = IdDescansoMedico;

  let url = apiUrlsho+`/api/hce_Post_030_descanso_medico_eliminadoLogico?code=SJylajP1NKUiZTWmwwJe6BLaBixuD/xsbaFSHQ07P9ksOYkfFxxkTw==&httpmethod=post`;

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

    $("#table_sp4EnferCron_des_med tbody").find(".table-empty").remove();

    NumeroFilas = $("#table_sp4EnferCron_des_med tbody tr").length;

    TituloModal = 'Descanso Médico eliminado con éxito';

    if( NumeroFilas == 0 ){

      html_tbody =
      "<tr class='table-empty'>"+            
        "<td colspan='6' class='text-center text-uppercase'>"+
          "No hay informacion registrada"+
        "</td>"+
      "</tr> ";

      $("#table_sp4EnferCron_des_med tbody").append(html_tbody);

    }

    Swal.fire({
      title: TituloModal,
      iconColor: "#8fbb02",
      iconHtml: '<img src="./images/sho/check.svg" width="28px">',
      showConfirmButton: false,
      padding: "3em 3em 6em 3em ",
      timer: 1500,
    });

  });

}

