function interSp3ValidarDatos(idClass) {
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