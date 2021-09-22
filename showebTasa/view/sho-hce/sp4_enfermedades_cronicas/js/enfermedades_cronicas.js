
//--------------------------VARIABLES GLOBALES------------------------------//
var paObj_hc = [];


function onBtnDeleteRow(){

  Numero_Filas = $("#"+$(this).closest("table").attr('id')+" tbody tr").length;
  Numero_Filas--;

  if(Numero_Filas == 1 ){
    $("#"+$(this).closest("table").attr('id')+"-empty").removeClass('d-none');
  }

  $("#"+$(this).closest("table").attr('id')+"-count-row").text(Numero_Filas-1);
  $(this).closest("tr").remove();

}




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
    paObj_hc.Areas = response.Area;
    paObj_hc.Sedes = response.Sedes;
    paObj_hc.Gerencias = response.Gerencia;

    paObj_hc.Areas.forEach((e) => {
      let content = $('#sp4EnferCron_dat_trab_area');
      content.append(`
          <option value="${e.Id}">${e.Description}</option>
        `)

      /*if (idHC != 0) {
        content.append(`
          <option value="${e.Id}" ${(paObj_hc[idHC].a.AreaId_Empresa_H) == e.Id ? 'selected' : ''}>${e.Description}</option>
        `)
      } else {
        content.append(`
          <option value="${e.Id}">${e.Description}</option>
        `)
      }*/

    });

    paObj_hc.Sedes.forEach((e) => {
      let content = $('#sp4EnferCron_dat_trab_planta');
      content.append(`
          <option value="${e.Id}">${e.Description}</option>
        `)

      // console.log(e);
      /*if (idHC != 0) {
        content.append(`
        <option value="${e.Id}" ${(paObj_hc[idHC].a.PlantaId_Empresa_H) == e.Id ? 'selected' : ''}>${e.Description}</option>
      `)
      } else {
        content.append(`
          <option value="${e.Id}">${e.Description}</option>
        `)
      }*/
    });

    paObj_hc.Gerencias.forEach((e) => {
      let content = $('#sp4EnferCron_dat_trab_gerencia');
      content.append(`
          <option value="${e.Id}">${e.Description}</option>
        `)

      // console.log(e);

      /*if (idHC != 0) {
        content.append(`
        <option value="${e.Id}" ${(paObj_hc[idHC].a.GerenciaId_Empresa_H) == e.Id ? 'selected' : ''}>${e.Description}</option>
      `)
      } else {
        content.append(`
          <option value="${e.Id}">${e.Description}</option>
        `)
      }*/
    });
  }).fail((e) => {
    console.log(e);
  })
}