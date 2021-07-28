function cargarDatos() {
  console.log("Cargas de Datos..");

  // para selecionar los datos del imput ( sin utilizar porque no realiza un filtrado )
  // let $gerencia = $("#sel_filter_gerencia").val();

  let url = `${apiUrlssoma}/api/Get-Incidente-AccidenteWeb?code=GY7/yooa3Zl5sKu7zgakDbaCn4uvOKXjfwe/JkbSuIwDPOs/baiZFQ==&httpmethod=objectlist`;

  let headers = {
    apikey: constantes.apiKey,
  };

  let req = {
    url: url,
    method: "GET",
    timeout: 0,
    crossDomain: true,
    dataType: "json",
    headers: headers,
  };

  $.ajax(req).done((resp) => {
    console.log("data:", resp);

    //Gerencia
    let $sel_gerencia = $("#sel_filter_gerencia");

    $sel_gerencia.css("font-size", "13px");
    $sel_gerencia.html("<option selected value='0'></option>");

    resp.Gerencias.map((item) => {
      $sel_gerencia.append(
        `<option value='${item.Id}' title='${item.RucEmpresa}' style='font-weight: bold;'>${item.Empresa}</option>`
      );
    });

    //Planta
    let $sel_planta = $("#sel_filter_planta");

    $sel_planta.css("font-size", "13px");
    $sel_planta.html("<option selected value='0'></option>");

    resp.Gerencias.map((item) => {
      $sel_planta.append(
        `<option value='${item.Id}' style='font-weight: bold;'>${item.Empresa}</option>`
      );
    });

    //Área
    let $sel_area = $("#sel_filter_area");

    $sel_area.css("font-size", "13px");
    $sel_area.html("<option selected value='0'></option>");

    resp.Areas.map((item) => {
      $sel_area.append(
        `<option value='${item.Id}' style='font-weight: bold;'>${item.Area}</option>`
      );
    });

    //Resultado
    let $sel_resultado = $("#sel_filter_resultado");

    $sel_resultado.css("font-size", "13px");
    $sel_resultado.html("<option selected value='0'></option>");

    resp.Potencial_Incidentes.map((item) => {
      $sel_resultado.append(
        `<option value='${item.Id}' style='font-weight: bold;'>${item.Potencial}</option>`
      );
    });

    $("#cant_adm_plan_anual").text(`${resp.PlanAnual.length} Registros`);

    if (resp.PlanAnual.length > 0) {
      $("#body-no-resultado").css("display", "none");

      $("#pagination-container").pagination({
        dataSource: resp.PlanAnual,
        pageSize: 4,
        callback: (data, pagination) => {
          let html = cargarTabla(data);
          $("#body-tabla-list").html(html);
        },
      });
    } else {
      $("#body-tabla-list").html(" ");
      $("#body-no-resultado").css("display", "block");
      hideLoading();
    }
  });
}

function cargarTabla(data) {
  $("#body-tabla-list").children("div").remove();

  data.forEach((item) => {
    $("#body-tabla-list").append(`
    <div class="item-tabla p-2" style="z-index: 1;display:relative; ">
        <div class="row m-0 justify-content-between align-items-center tbody_trainning">
            <div class="col-12 text-center" style="font-size: 15px; padding: 4px !important; ">
                <div class="row">
                    <table width = "100%" border="0">
                      <tr>
                        <td width="14%" align="center">
                          <div id="c1TabGeny" class="text-left lbCabezaTabla1" style='margin-left: 17px; '>
                            ${item.Fecha}
                          </div>
                        </td>
                        <td width="10%" align="center">
                          <div id="c1TabGeny" class="text-left lbCabezaTabla1">
                            ${item.NombreEmpresa}
                          </div>
                        </td>
                        <td width="10%" align="center">
                          <div id="c1TabGeny" class="text-left lbCabezaTabla1">
                            ${item.Zona}
                          </div>
                        </td>
                        <td width="10%" align="center">
                          <div id="c1TabGeny" class="text-left lbCabezaTabla1">
                            ${item.Sede}
                          </div>
                        </td>
                        <td width="11%" align="center">
                          <div id="c1TabGeny" class="text-left lbCabezaTabla1">
                            ${item.Zona}
                          </div>
                        </td>
                        <td width="11%" align="center">
                          <div id="c1TabGeny" class="text-left lbCabezaTabla1">
                            ${item.Fecha}
                          </div>
                        </td>
                        <td width="11%" align="center">
                          <div id="c1TabGeny" class="text-left lbCabezaTabla1">
                            ${item.Zona}
                          </div>
                        </td>
                        <td width="11%" align="center">
                          <div id="c1TabGeny" class="text-left lbCabezaTabla1">
                            ${item.Sede}
                          </div>
                        </td>
                        <td width="11%" align="center">
                          <div id="c1TabGeny" class="text-left lbCabezaTabla1">
                            ${item.Estado_Incidente}
                          </div>
                        </td>
                        <td width="1%" align="center">
                          <img src="./images/iconos/menu_responsive.svg" style="width: 14px; cursor: pointer"></img>
                        </td>
                      </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
    `);
  });
}
