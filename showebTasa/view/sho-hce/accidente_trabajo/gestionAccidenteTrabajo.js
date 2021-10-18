$(document).ready(()=>{
	$('.tabs-item').click((e)=>{
		const id = $(e.currentTarget).attr('id')
		atSp4SelectTab(id)
	})
})

function atSp4SelectTab(id){
	$('.tab-section').hide()
	$(`#section-${id}`).show()
	$('.tabs-item').removeClass('active')
	$(`#${id}`).addClass('active')
}

// Navegación 
function atSp4NuevoAccidenteTrabajo(){
  actualPageSystemSoma = "view/sho-hce/accidente_trabajo/nuevoAccidenteTrabajo.html";
	handlerUrlhtml('contentGlobal', actualPageSystemSoma , 'Nuevo accidente de trabajo');
}

function atSp4NuevoDescansoMedico(){
  actualPageSystemSoma = "view/sho-hce/accidente_trabajo/nuevoDescansoMedico.html";
  handlerUrlhtml('contentGlobal', actualPageSystemSoma , 'Registrar descanso médico');
}

function atSp4NuevoSeguimiento(){
  actualPageSystemSoma = "view/sho-hce/accidente_trabajo/nuevoSeguimiento.html";
  handlerUrlhtml('contentGlobal', actualPageSystemSoma , 'Registra seguimiento');
}

function atSp4NuevaTransferencia(){
  actualPageSystemSoma = "view/sho-hce/accidente_trabajo/nuevaTransferencia.html";
  handlerUrlhtml('contentGlobal', actualPageSystemSoma , 'Registrar tranferencia');
}

function atSp4NuevaAltaEspecialista(){
  actualPageSystemSoma = "view/sho-hce/accidente_trabajo/nuevaAltaEspecialista.html";
  handlerUrlhtml('contentGlobal', actualPageSystemSoma , 'Creación de alta');
}

function atSp4NuevoInforme(){
  actualPageSystemSoma = "view/sho-hce/accidente_trabajo/nuevoInformeMedico.html";
  handlerUrlhtml('contentGlobal', actualPageSystemSoma ,'Registrar informes médicos');
}

function atSp4NuevoExamenAuxiliar(){
  actualPageSystemSoma = "view/sho-hce/accidente_trabajo/nuevoExamenAuxiliar.html";
  handlerUrlhtml('contentGlobal', actualPageSystemSoma ,'Registrar exámenes auxiliares');
}

function atSp4NuevaEvaluacion(){
  actualPageSystemSoma = "view/sho-hce/accidente_trabajo/nuevaEvaluacionMedica.html";
  handlerUrlhtml('contentGlobal', actualPageSystemSoma ,'Registrar evaluación médica');
}

function atSp4SeguimientoAccidenteTrabajo(){
  actualPageSystemSoma = "view/sho-hce/accidente_trabajo/seguimientoAccidenteTrabajo.html";
  handlerUrlhtml('contentGlobal', actualPageSystemSoma ,'Seguimientos de accidentes de trabajo');
}

// Gestión accidente de trabajo

function _init_atSp4NuevoAccidenteTrabajo() {
  //Cargar datos
  atSp4CargarInputsDatosTrabajor()
}

function atSp4CargarDatosTrabajador(){  

  //Datos generales
  let obj = paObj_hc[idHC].a;
  console.log(obj)
  
  sedeAreaGerencia.Sedes.forEach((e) => {
    if (e.Id == obj.PlantaId_Empresa_H) {
      $('#dat_at_planta_trabajador').text(e.Description);
    }
  });

  sedeAreaGerencia.Area.forEach((e) => {
    if (e.Id == obj.AreaId_Empresa_H) {
      $('#dat_at_area_trabajador').text(e.Description);
    }
  });

  sedeAreaGerencia.Gerencia.forEach((e) => {
    if (e.Id == obj.GerenciaId_Empresa_H) {
      $('#dat_at_gerencia_trabajador').text(e.Description);
    }
  });

  $('#dat_at_dni_trabajador').text(obj.NroDocumento_Trabajador_H);
  $('span[name=dat_at_nombres]').text(obj.Nombres_Trabajador_H+" "+obj.Apellidos_Trabajador_H);
  $('#dat_at_edad_trabajador').text(obj.Edad_Trabajador_H);
  $('#dat_at_sexo_trabajador').text(obj.Sexo_Trabajador_H == 1 ? 'Masculino' : 'Femenino');
  $('#dat_at_puesto_trabajador').text(obj.PuestoTrabajo_Empresa_H);

  if(obj.FotoPerfil.length){
    $("img[name=img_file_perfil]").attr("src", obj.FotoPerfil[0].FotoPacienteBase64);
  }else{
      $("img[name=img_file_perfil]").attr("src", 'images/sho/profile.png')
  }
}

function atSp4CargarInputsDatosTrabajor() {
  let obj = paObj_hc[idHC].a;

  $('#dat_at_dni_trabajador').val(obj.NroDocumento_Trabajador_H);
  $('#dat_at_nombres_trabajador').val(obj.Nombres_Trabajador_H);
  $('#dat_at_apellidos_trabajador').val(obj.Apellidos_Trabajador_H);
  $('#dat_at_edad_trabajador').val(obj.Edad_Trabajador_H);
  $('#dat_at_fecha_ingreso').val(obj.A_FechaIngresoTasa.split('T')[0]);
  $('#dat_am_fecha_trabajador').val('2021-03-21'); //dato faltante
  $('#dat_at_fecha_retiro').val('2021-03-21'); //dato faltante

  sedeAreaGerencia.Gerencia.forEach((e) => {
    if (e.Id == obj.GerenciaId_Empresa_H) {
      $('#dat_at_gerencia_trabajador').append(`
        <option value="${e.Id}" selected>${e.Description}</option>
      `)
    }
  })

  sedeAreaGerencia.Sedes.forEach((e) => {
    if (e.Id == obj.PlantaId_Empresa_H) {
      $('#dat_at_planta_trabajador').append(`
        <option value="${e.Id}" selected>${e.Description}</option>
      `)
    }
  })

  sedeAreaGerencia.Area.forEach((e) => {
    if (e.Id == obj.AreaId_Empresa_H) {
      $('#dat_at_area_trabajador').append(`
        <option value="${e.Id}" selected>${e.Description}</option>
      `)
    }
  })

  $('#dat_at_puesto_trabajo_trabajador').val(obj.PuestoTrabajo_Empresa_H);

}

function atSp4ConfirmGuardarAccidenteTrabajo() {
  /*if (Sp3ValidarDatos('input_am_datos_trabajador').length > 0) {
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
  }*/

  let nombres = $("#dat_at_nombres_trabajador").val();
  let apellidos = $("#dat_at_apellidos_trabajador").val();
  
  Swal.fire({
    title: "Guardar accidente de trabajo.",
    html: `
       <p>Está por guardar el accidente de trabajo de</p>
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
      //await amSp3GuardarAtencionesMedicas(idAM);
    }
  });
}

function atsp4ShowModal(option) {
    $('#modalAccidenteTrabajo').modal()
    let title = null
    let page = null
    switch(option){
        case 'nuevo-descanso':
            title = "Registrar descanso médico"
            page = "view/sho-hce/accidente_trabajo/nuevoDescansoMedico.html"
        break;
        case 'nuevo-seguimiento':
            title = "Registrar seguimiento"
            page = "view/sho-hce/accidente_trabajo/nuevoSeguimiento.html"
        break;
        case 'nueva-transferencia':
            title = "Registrar tranferencia"
            page = "view/sho-hce/accidente_trabajo/nuevaTransferencia.html"
        break;
        case 'nueva-alta-especialidad':
            title = "Creación de alta"
            page = "view/sho-hce/accidente_trabajo/nuevaAltaEspecialista.html"
        break;
        case 'nuevo-informe':
            title = "Nuevo informe"
            page = "view/sho-hce/accidente_trabajo/nuevoInformeMedico.html"
        break;
        case 'nuevo-examen-auxiliar':
            title = "Registrar exámenes auxiliares"
            page = "view/sho-hce/accidente_trabajo/nuevoExamenAuxiliar.html"
        break;
        case 'nueva-evaluacion':
            title = "Registrar evaluación médica"
            page = "view/sho-hce/atenciones_medicas/nuevaAtencionMedica.html"
        break;
    }

    if( title && page){
      $('#titleModalAccidenteTrabajo').text(title)
      $('#bodymodalAccidenteTrabajo').load(page)
    }else{
      $('#titleModalAccidenteTrabajo').text('')
      $('#bodymodalAccidenteTrabajo').html('')
    }
}



