$(document).ready(function(){
    $('#buscadorSalud').keyup(function(){
        

       let parrafos = $('.parrafos');
       let buscando = $(this).val();
       let contenedorLista = '';

       for( let i = 0; i < parrafos.length; i++ ) {
           
            contenedorLista = $(parrafos[i]).html().toLowerCase();
           
            for(let x = 0; x < contenedorLista.length; x++ ){
                if( buscando.length == 0 || contenedorLista.indexOf( buscando ) > -1 ){
                    $(parrafos[i]).parents('.contenedorLista').show(); 
                }else{
                    $(parrafos[i]).parents('.contenedorLista, .iconos').hide();
                }
            }
        }
    });
});