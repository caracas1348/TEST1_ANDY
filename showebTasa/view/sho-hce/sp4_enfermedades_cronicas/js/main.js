function sp4EnferCronConfirmGuardarDatosTrab() {
  let nombres = $("#sp4EnferCron_dat_trab_nombre").val();
  let apellidos = $("#sp4EnferCron_dat_trab_apellido").val();
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
      Swal.fire({
        title: "Se guardó el registro con éxito",
        iconColor: "#8fbb02",
        iconHtml: '<img src="./images/sho/check.svg" width="28px">',
        showConfirmButton: false,
        padding: "3em 3em 6em 3em ",
      }).then(() => {
        cargarViewDatosGenerales();
      });
    }
  });
  SVGInject($(".inject-svg"));
}

  function desSp3ConfirmGuardarSAP() {
    Swal.fire({
      title: "Guardar registro",
      html: `
      <p>Está por vincular un DM de SAP con DM del sistema SHO</p>   
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
        Swal.fire({
          title: "Se terminó con éxito el registro",
          iconColor: "#8fbb02",
          iconHtml: '<img src="./images/sho/check.svg" width="28px">',
          showConfirmButton: false,
          padding: "3em 3em 6em 3em ",
        }).then(() => {
          cargarViewDatosGenerales();
        });
      }
    });
    SVGInject($(".inject-svg"));
}
