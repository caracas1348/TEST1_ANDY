function sendToServer() 
{
    var canvas = document.getElementById('canvassign');
    var dataimage = canvas.toDataURL('image/png');
    


    //---------------------------------------------------
     var flag=0;
     var validatefield="";
     if(dataimage=="")
     {flag=1;    validatefield= "Debe ingresar una firma";} 
     
     if($("#checktypepac1").is(":checked"))
     {
        var type=1
        if($("#tx_finded").val()=="")
        {flag=1;    validatefield= "Debe realizar una búsqueda por documento";} 
     }
     else
     {
        var type=2
     }


     if(flag==1)
     {
       swal({
         title: "Campos vacios",
         text: validatefield,
         timer: 4000,
         type: "error",
         showConfirmButton: true
         });
       return;
     }
    
      swal({
        title:"Registro",
        text: "¿Seguro que desea registrar la firma?",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn-danger btn-sm",
        confirmButtonText: "Si",
        cancelButtonText: "No",
        closeOnConfirm: true
    },
    function()
    {
    swal.close();
    setTimeout(function()
    {
        swal({
            title: "Procesando...",
            text: "Por favor espere.",
            //timer: 3000,
            type: "info",
            showConfirmButton: false
            });

    },100)
       
      //var name = getCookie('vtas_fullname');
      var responsible = getCookie('vtas_id'+sessionStorage.tabVisitasa);
        var url = apiurlblacklist+"/api/Post-Blacklist-User?code="+postblacklistusercode+"&httpmethod=addsignpicture";
        //alert(sel_status);    
        var body ={
            "identity_document":$("#tx_finded").val(),
            "responsible":getCookie('vtas_person_id'+sessionStorage.tabVisitasa),
            "type_update":type,//1: paciente,2: medico
            "sign_picture":dataimage,  
        }
      
        var headers ={
            "apikey":"r$3#23516ewew5"        
        }
       
        $.ajax({
            method: "POST",
            url:  url,
            data: JSON.stringify(body),
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function(data)
        {
          if (data==1) 
          {
            swal.close();
            swal({
                title: "Exito",
                text: "Firma registrada satisfactoriamente",
                type: "success",
                timer:2000,
                showCancelButton: false,
                confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
                confirmButtonText: "De acuerdo",
                closeOnConfirm: false
              });
           
            handlerUrlhtml('contentGlobal','view/covidMedicoMobile.html');

           
          }else{
            swal("Error!", "No se ha podido registrar la firma.", "error");
          }

        }).fail(function( jqXHR, textStatus, errorThrown ) {
          
          showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
          console.log(errorThrown)
     });

    });
  

}