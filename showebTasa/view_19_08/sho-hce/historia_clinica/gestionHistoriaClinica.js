/****************************************************************************************
 * VISUAL SAT - [2021]
 * PROYECTO : SIGTASA
 * ESQUEMA : SSOMA
 * SPRINT  : 3
 * MODULO : HISTORIA CLINICA
 * OPERADORES_________________________________________________________________________
 * | # | PROGRAMADOR     |  |      FECHA   |  |   HORA   |           CORREO           |
 * | 1 | Carlos Rivas    |  |  014/09/2021 |  | 07:28:50 |       crivascyt@gmail.com  |
 * | 2 | Andy Vàsquez    |  |   18/08/2021 |  | 17:16:00 |     caracas1348@gmail.com  |
 * |___|_________________|__|______________|__|__________|____________________________|
 *
 * DESCRIPCION: ARCHIVO FRONT DE FUNCIONALIDAD EN CLIENTE DE LAS OPCIONES DE LOS INCIDENTES Y
 * EN EL FRONT END ACCIDENTES- (LISTADO, FILTRADO, VER)
 *
 * ARCHIVOS DE SERVICIOS   _________________________________________
 * | # |     MODULO             |  |         NOMBRE                 |
 * | 1 |   SALUD OCUPACIONAL    |  |     Get-                       |
 * |________________________________________________________________|
 *
 * VERSION: 0.1 Beta
 *******************************************************************************************/


function PlanAnual()
{

  this.a = [];

  PlanAnual.prototype.cargarData = function (data)
  {
    this.a = data;
    // // this.a.II;
    // this.a.II_BD = 0;//estado inicial, se puede ir al servidor a buscar la informacion.
  }

}


function _init_fnSp3SaludOcupacionalEstadoInicial()
{//------------------------------------- ini   _init_fnSp3SaludOcupacionalEstadoInicial() -------------------------------------
  console.clear();
  //showLoading();
  console.log("Arrancamos............................ _init_fnSp3SaludOcupacionalEstadoInicial");


  fnSp3CargaFiltroEstadoInicialSaludOcupacional();



}//------------------------------------- fini   _init_fnSp3SaludOcupacionalEstadoInicial() -------------------------------------









function   fnSp3CargaFiltroEstadoInicialSaludOcupacional()
{//------------------------------------- ini   fnSp3CargaFiltroEstadoInicialSaludOcupacional() -------------------------------------
        showLoading();

        var url = apiUrlssoma+"/api/Get-Incidente-AccidenteWeb?code=GY7/yooa3Zl5sKu7zgakDbaCn4uvOKXjfwe/JkbSuIwDPOs/baiZFQ==&httpmethod=objectlist&IdTipoEvento="+programa+"&IdEmpresa="+gerencia+"&IdSede="+sedepa+"&FechaInicio="+f1+"&FechaFin="+f2+"&IdEmbarcacion="+estadopa

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


        
        $.ajax(settings).done(function (response)
        {
            console.log("**todos**",response);

            if(response.PlanAnual.length > 0)
            {

            }
            else
            {

              hideLoading();
            }

        });

}//------------------------------------- fin   fnSp3CargaFiltroEstadoInicialSaludOcupacional() -------------------------------------




























/*
var dataHC = [{
    id: "1",
    codigo: "COD0001",
    nombres: "Carlos Eduardo",
    apellidos: "Rivas Montano",
    areas: "Mantenimiento",
    sede: "Callao",
    teléfono: "977863442",
    medica: "Puesto 1",
    diagnostico: "Diagnóstico 1",
    aptitud: "Apto",
    emo: "20/10/2021",
    vmo: "20/12/2021",
  },
  {
    id: "2",
    codigo: "COD0001",
    nombre: "Carlos Eduardo",
    apellidos: "Rivas Montano",
    areas: "Mantenimiento",
    sede: "Callao",
    teléfono: "977863442",
    medica: "Puesto 1",
    diagnostico: "Diagnóstico 1",
    aptitud: "Apto",
    emo: "20/10/2021",
    vmo: "20/12/2021",
  },
  {
    id: "3",
    codigo: "COD0001",
    nombre: "Carlos Eduardo",
    apellidos: "Rivas Montano",
    areas: "Mantenimiento",
    sede: "Callao",
    teléfono: "977863442",
    medica: "Puesto 1",
    diagnostico: "Diagnóstico 1",
    aptitud: "Apto",
    emo: "20/10/2021",
    vmo: "20/12/2021",
  },
];

var dataAlergias = [{
  id: "1",
  nombre: "Alergia 1",
  fecha: "12/02/2021"
}]

var dataOcupacional = [{
    id: "1",
    fecha_inicio: "20/10/2021",
    empresa: "Empresa 1",
    actividad: "Actividad 1",
    area: "Area 1",
    ocupacion: "Ocupacion 1",
    peligro: "Peligro 1",
    epp: "EPP 1"
  },
  {
    id: "2",
    fecha_inicio: "20/10/2021",
    empresa: "Empresa 2",
    actividad: "Actividad 2",
    area: "Area 1",
    ocupacion: "Ocupacion 2",
    peligro: "Peligro 2",
    epp: "EPP 2"
  },

]

$(function() {
  // Dropdown toggle
  $(".btn-drop").click(function() {
    $(this).find(".btn-drop-content").slideToggle();
  });

  $(document).click(function(e) {
    var target = e.target;
    if (!$(target).is(".btn-drop") && !$(target).parents().is(".btn-drop")) {
      $(".btn-drop-content").slideUp();
    }
  });

  $(".hc-more-info").click((e) => {
    const id = e.currentTarget.dataset.rowid;

    const position = $(".hc-more-info")
      .eq(id - 1)
      .position();
    $(".hc-info-content").css("left", `${position.left}px`);
    $(".hc-info-content").css("top", `${position.top}px`);

    $(".hc-info-content").slideToggle();
  });

  $(".oc-more-info").click((e) => {
    const id = e.currentTarget.dataset.rowid;

    const position = $(".oc-more-info")
      .eq(id - 1)
      .position();
    $(".oc-info-content").css("left", `${position.left}px`);
    $(".oc-info-content").css("top", `${position.top}px`);

    $(".oc-info-content").slideToggle();
  });

  $(document).click(function(e) {
    var target = e.target;
    if (!$(target).is(".hc-more-info") && !$(target).parents().is(".hc-more-info")) {
      $(".hc-info-content").slideUp();
    }
    if (!$(target).is(".oc-more-info") && !$(target).parents().is(".oc-more-info")) {
      $(".oc-info-content").slideUp();
    }
  });
});

$("#cant_hist_cli").text(`${dataHC.length} registros`);
$("#cant_ant_ocu").text(`${dataOcupacional.length} registros`);

function renderHC(alldata) {
  const body = $("#HC-table tbody");
  alldata.forEach((data) => {
    body.append(`
    <tr>
      <td>${data.codigo}</td>
      <td>${data.nombres}</td>
      <td>${data.apellidos}</td>
      <td>${data.areas}</td>
      <td>${data.sede}</td>
      <td>${data.teléfono}</td>
      <td>${data.medica}</td>
      <td>${data.diagnostico}</td>
      <td>${data.aptitud}</td>
      <td>${data.emo}</td>
      <td>${data.vmo}</td>
      <td>
        <div class="more-info hc-more-info" data-rowid="${data.id}">
          <img src="images/iconos/menu_responsive.svg" alt="" />
        </div>
      </td>
    </tr>
    `);
  });
}

function renderAlergias(alldata) {
  const body = $("#sho_3_hc_alergias_items");
  alldata.forEach((data) => {
    body.append(`
      <div class="col-md-9 d-flex">
        <div>
          <b>Nombre de la alergia: </b>
          <span>${data.nombre}</span>
        </div>
        <div class="ml-3">
          <b>Creación</b>
          <span>${data.fecha}</span>
        </div>
      </div>
      <div class="col-md-3 d-flex justify-content-end">
        <button type="button" class="btn btn-link shadow-none">
          <img class="inject-svg" src="./images/sho/edit.svg" alt="" fill="#4AAC8F" width="16px">
        </button>
        <button type="button" class="btn btn-link shadow-none">
          <img class="inject-svg" src="./images/sho/delete.svg" alt="" fill="#ff3636" width="16px">
        </button>
      </div>`);
  });

  if (alldata.length < 10) {
    $("#cant_ant_alerg_header").text(`0${alldata.length}`)
  } else {
    $("#cant_ant_alerg_header").text(`${alldata.length}`)
  }

}

function renderOcupacional(alldata) {
  const body = $("#OC-table tbody");
  alldata.forEach((data) => {
    body.append(`
    <tr>
      <td>${data.fecha_inicio}</td>
      <td>${data.empresa}</td>
      <td>${data.actividad}</td>
      <td>${data.area}</td>
      <td>${data.ocupacion}</td>
      <td>${data.peligro}</td>
      <td>${data.epp}</td>
      <td>
        <div class="more-info oc-more-info" data-rowid="${data.id}">
          <img src="images/iconos/menu_responsive.svg" alt="" />
        </div>
      </td>
    </tr>
    `);
  });

  if (alldata.length < 10) {
    $("#cant_ant_ocu_header").text(`0${alldata.length}`)
  } else {
    $("#cant_ant_ocu_header").text(`${alldata.length}`)
  }
}

function saveHC() {
  let nombres = $('#nombres').val();
  let apellidos = $('#apellidos').val();
  Swal.fire({
    title: 'Guardar nueva H.C.',
    html: `
    <p>Está por guardar la historia clínica de</p>
    <p>${nombres} ${apellidos}</p>
    <p class="mt-5">¿Desea confirmar la acción?</p>`,
    icon: 'info',
    showCancelButton: true,
    reverseButtons: true,
    cancelButtonColor: '#ff3636',
    confirmButtonColor: '#8fbb02',
    confirmButtonText: `Confirmar <img class="inject-svg" src="./images/sho/confirm.svg" alt="" fill="#fff" width="18px">`,
    cancelButtonText: `Cancelar <img class="inject-svg" src="./images/sho/cancelar.svg" alt="" fill="#fff" width="18px">`
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Se terminó con éxito el registro",
        iconColor: "#8fbb02",
        iconHtml: '<img src="./images/sho/check.svg" width="28px">',
        showConfirmButton: false,
        padding: "3em 3em 6em 3em "
      })
    }

  })
  SVGInject($(".inject-svg"));
}

function showNuevaHC() {
  $('#splashLoading').show();
  renderAlergias(dataAlergias);
  renderOcupacional(dataOcupacional);
  setTimeout(() => {
    $('#HC_registros').hide();
    $('#HC_registrar').show();
    $('#splashLoading').hide();
  }, 2000)
  $('#regresar').show();
  $('#logoCompany').hide();
  $('#textTilteModule').show();
  $('#textTilteModule').text('Registrar nueva H.C.');
}

renderHC(dataHC);
SVGInject($(".inject-svg"));

// objetos del DOM
const $btnToggle = $("#toggle-btn");
const $sidebar = $("#sidebar");
var $tituloMenu = $("#sidebar .titulo").text();
var $labelNav = $(".label-nav span").text();

// Acortando el titulo del menu
var $tituloMenuCorto = $tituloMenu
  .split(" ")
  .map((e) => e[0])
  .join("");

setMenu();

// Escuchando el evento del click del toggle
$btnToggle.on("click", function() {
  $sidebar.toggleClass("active");
  $("#toggle-btn svg").toggleClass("active");
  $("#page-content-sidebar").toggleClass("active");
  setMenu(); // Seteando el contenido del menu
});

// set menu
function setMenu() {
  if (!$sidebar.attr("class")) {
    $("#sidebar .titulo").text($tituloMenuCorto);
    $(".item-list span").css("display", "none");
  } else {
    $("#sidebar .titulo").text($tituloMenu);
    $(".item-list span").css("display", "flex");
  }
}
*/
