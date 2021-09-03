var oTableTamizajeList;
var jsonExternalCompany =[];
var jsonLocation        =[];
var quotes=0;
var jsonPersonBlaclist = [];
var sedeidglobtop=0;         
var quotestop=0;
var vw_collaborator_approver = function()
{

    var init = function()
    {        
      getExternalCompany();
      getLocations();
       $("#sel_status").val("4").trigger("change");
       
     /*   
       $("#tx_access_dni_list").keyup(function(event) {
        oTableBlackList.search($(this).val()).draw();
        if($(this).val()=="")//limpia filtro buscado 

        if(event.which==13)
        {{
          ActiveEnter=1;
          tableBlackList();
        }}
      }); */

        $("#tx_access_dni_list").keyup(function(event) {
          oTableTamizajeList.search($(this).val()).draw();          
                  
            
          if(event.which==13)
            {
              tableListTamizaje(1);
            }
        });

        $("#tx_date_tamizaje").datetimepicker({
          timepicker:false,
          format:'d/m/Y',
          minDate: 0
        });

        $("#tx_date_init").datetimepicker({
          timepicker:false,
          format:'d/m/Y',
          //minDate: 0
      });
      var nowdate = moment().format("DD/MM/YYYY");
      $('#tx_date_init').val(nowdate);
      
      $("#tx_date_end").datetimepicker({
          timepicker:false,
          format:'d/m/Y',
          minDate: 0
      });
      $('#tx_date_end').val(nowdate);
        /*
          $('#modalEditBlacklist').on('shown.bs.modal', function (e) {        
            var dni   = $("#tx_docum").val();
            var name  = $("#tx_nomape").val();
            verifiqueBlacklisOis(dni,name);
          });
        */
       $("#tx_date_tamizaje").change(function()
       {
        
        getCupoDisponible($("#tx_date_tamizaje").val(),sedeidglob);
       });
       $("#tx_date_end").change(function()
       {
        tableListTamizaje()
        getCupoDisponibletop();
       });
       
       tableListTamizaje();
      
       $("#add_covid_dni_1").blur(function(){
        var dni = $(this).val();
        if(dni.trim().length>0){
          if($("#sel_type_contact_1").val()=="colaborador")
            getCollaboratorDni(dni,1,'add_covid_firtname_1');
          checkOis(dni,1,$("#sel_type_contact_1").val());
        }
          
          
          //alert(vetado)
       // }
      });

      $("#add_covid_dni_1").autocomplete({          
        change: function (event, ui) 
        {
          if (ui.item === null) 
          {   
          }
          else if(ui.item)
          {                     
            $("#add_covid_firtname_1").val(ui.item.firstname);
          }
        },
        source: jsonPersonBlaclist,      
        minLength: 1,
        select: function( event, ui ) {
          //$("#add_covid_dni_1").val(ui.item.label);
          $("#add_covid_firtname_1").val(ui.item.firstname);
          //$("#add_covid_lastname_"+leng).val(ui.item.lastname);
        },
        open: function() {
            $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
        },
        close: function() {
            $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
        },
        search: function () {
            $("#spinnerLoadColaborador").show();
        },
        response: function () {
            $("#spinnerLoadColaborador").hide();         
        }
      });

      getAreas('',1);
      selectExternalCompany($("#sel_company_1"),1);
      selectLocation("#sel_location_"+1);
      getCollaborator($("#add_covid_firtname_"+1),1);
      getPersonBlackList();
      $("#tx_date_start_1").datetimepicker({
        timepicker:false,
        format:'d/m/Y',
        minDate: 0
      });
      
      $("#add_covid_dni_1").blur(function(){
        var dni = $(this).val();          
        if(dni.trim().length>0){
          if($("#sel_type_contact_1").val()=="colaborador")
            getCollaboratorDni(dni,1,'add_covid_firtname_1');
          checkOis(dni,1,$("#sel_type_contact_1").val());
        }
          
      });
    

    $("#sel_type_contact_1").change(function(){
      getCollaborator($("#add_covid_firtname_1"),1); 
      clearRow(1); 
      var value = $(this).val();
      if(value=='colaborador'){
          $("#ruc_company_1").val('20100971772');
          $("#sel_company_1").val('Tasa');                    
      }
    }); 

    $('#modalEditBlacklist').on('shown.bs.modal', function (e) {        
      var dni   = $("#tx_documCol").val();
      var name  = $("#tx_nomapeCol").val();
      //alert(dni+" "+name);
      verifiqueBlacklisOis(dni,name);
    });
  }

  var verifiqueBlacklisOis = function(dni, name)
    { 
     
      dni=dni.trim();
      var now=new Date();

      var nowdesde=`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} 00:00`;
      var nowhasta=`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} 23:59`;

      $("#span_notificationCol").html('Validando... Espere');    
      var id_location = $("#hid_id_location").val();
      var notification ="";
      var covid_test    = $("#hid_covid_test").val(); 
      
      //console.log(fecheTamg,new Date(fecheTamg.split('T')[0]+' 23:59'),new Date())

      var diaspass=11;//para dias limite para pasar
      //console.log(lastattentiondate,last_veto_statusg)
      if(lastattentiondate)//se calcula tiempo de la ultima fecha de tamizaje------------------------------------------------------------------------
      {

            var date=new Date();
            var dateBdd = moment(lastattentiondate).add(-5,"hours").format('YYYY-MM-DD HH:mm:ss');                             
            var time1   = moment(dateBdd,"YYYY-MM-DD HH:mm:ss");
            var time2   = moment(date,"YYYY-MM-DD HH:mm:ss");
            var ms      = time1.diff(time2);
            diaspass = Math.abs(moment.duration(ms).asDays());
            //var hours = moment.duration(ms).asHours();
            console.log("Dias: "+diaspass);
      }
      //lastattentiondate,var last_veto_status;
      $("#span_notificationCol").text("");
      $("#headerFormCovidCol").css({background:'#039be0'})
     
      if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_TASAAPROVETAMIZAJE" ||  getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_COVIDSEGURIDAD" || getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_SEGURIDAD" || getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_GARITA" || getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_ALLTASA" ||  getCookie("vtas_type_usergroup"+sessionStorage.tabVisitasa)=="colaborador"  )//si es seguridad no se muestra solicitud de tamizaje
      {
        if(dni.trim().length==0)
        {
          $(".butEditBlackCol").show();
          notification = '<div><i class="fa fa-circle text-danger" style="height: 30px important!;"></i><label style="margin-left:15px">Complete y actualice el documento de identidad</label></div>';
          $("#span_notificationCol").html(notification);
          $("#btnSolicitudTamizajeCol").hide();
          $("#headerFormCovidCol").css({background:'#f44336'});
          return;
        }
  
          $("#span_notificationCol").text("");
          var check_in_out  = $("#hid_check_in_out").val();   
          var empresa       = $("#hid_name_company").val().toLowerCase(); 

            $("#btnValidateInCol").hide();
            $("#span_notificationCol").html("Validando.... Espere.");            
            //chek persona de riesgo
            var dataRiesgo = checkRiskList(dni);
            if(dataRiesgo.length>0)
            {
              notification = '<div><i class="fa fa-circle text-danger" style="height: 30px important!;"></i><label style="margin-left:15px">No se pueden solicitar Tamizajes para este Usuario. En Lista De Riesgo</label></div>';              
              $("#span_notificationCol").html(notification);
              $("#btnValidateInCol").hide();
              $("#headerFormCovidCol").css({background:'#f44336'});              
              return;
            }
            //CHECK LISTA NEGRA
            if(dni.trim().length>0)
              var vetado = checkBlackList(dni);
            else
              var vetado = checkBlackListName(name);
            if(vetado==1)
            {
              //notification = '<div class="alert alert-danger" style="border-radius:10px" role="alert">Usuario en lista negra</div>';
              notification = '<div><i class="fa fa-circle text-danger" style="height: 30px important!;"></i><label style="margin-left:15px">Usuario en lista negra</label></div>';
              ///
              $("#span_notificationCol").html(notification);
              $("#btnValidateInCol").hide();
              $("#headerFormCovidCol").css({background:'#f44336'});              
              return;
            }
            else if(vetado==2)
            {
             
              notification = '<div><i class="fa fa-circle text-danger" style="height: 30px important!;"></i><label style="margin-left:15px">Usuario vetado</label></div>';
              $("#span_notificationCol").html(notification);
              $("#btnValidateInCol").hide();
              $("#headerFormCovidCol").css({background:'#f44336'})
              if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_COVIDSEGURIDAD")
              $("#btnSolicitudTamizajeCol").show();

              return;

            }
            else
            {
              var flagt=0;
             if(covid_test==3)//tamizaje vencido------------------------------------------------------------------------
              {
                if(diaspass>10)
                {
                  flagt=1;
                  var textMessage="Acceso Denegado";
                  var detallest="Su Tamizaje ha vencido"
                  
                }
              }
              else if(covid_test==5 && !lastattentiondate)//tamizaje cancelado------------------------------------------------------------------------
              {
                flagt=1;
                var textMessage="Acceso Denegado";
                var detallest="Debe solicitar Cita de Tamizaje para poder ingresar"
                
              }
              else if(covid_test==5 && lastattentiondate)//tamizaje cancelado------------------------------------------------------------------------
              {
                if(diaspass>10)
                {
                  flagt=1;
                  var textMessage="Acceso Denegado";
                  var detallest="Debe solicitar Cita de Tamizaje para poder ingresar"
                  
                }
              }
              else if(covid_test==4 && !lastattentiondate)//tamizaje no aporbado sin tamizaje previo-------------------------
              {
                flagt=1;
                var textMessage="Acceso Denegado";
                var detallest="Su Solicitud de Tamizaje no se ha Aprobado"
                
              }
              else if(covid_test==4 && lastattentiondate)//tamizaje no aporbado con tamizaje previo-------------------------
              {

                if(diaspass>10)
                {
                  flagt=1;
                  var textMessage="Acceso Denegado";
                  var detallest="Debe solicitar Cita de Tamizaje para poder ingresar";
                  
                }
              }
              else if(lastattentiondate && covid_test!=1)//tamizaje no aporbado con tamizaje previo y que no este aprobado-------------------------
              {

                if(diaspass>10)
                {
                  flagt=1;
                  var textMessage="Acceso Denegado";
                  var detallest="Debe solicitar Cita de Tamizaje para poder ingresar";
                  
                }
              }

              if(flagt==1)
              {

                    notification = '<div><i class="fa fa-circle text-danger" style="height: 30px important!;"></i><label style="margin-left:15px">Acceso Denegado. '+detallest+'</label></div>';
                    $("#span_notificationCol").html(notification);
                    $("#btnValidateInCol").hide();
                    $("#headerFormCovidCol").css({background:'#f44336'})
                    
                    if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_COVIDSEGURIDAD")
                    $("#btnSolicitudTamizajeCol").show();

                  return;

              }
              
              if(empresa!="tasa")
              {

                if(dni=="")
                {

                  notification = '<div><i class="fa fa-circle text-danger" style="height: 30px important!;"></i><label style="margin-left:15px">Se debe actualizar el documento de identidad para validar con OIS.</label></div>';                
                  $("#span_notificationCol").html(notification);
                  return;

                }

                var url         = apiurlsecurity+"/api/Get-OIS?code="+GetOIS+"&httpmethod=object&dni="+dni.trim();    
                //var url          = apiurlaccessregistries+"/api/Get-OIS?code="+GetOIS+"&httpmethod=object&dni="+dni.trim();          
              var headers ={
                "apikey":"r$3#23516ewew5"        
              }
              $.ajax({                    
                  method: "POST",
                  url:  url,
                  headers:headers,
                  crossDomain: true,
                  dataType: "json",
              }).done(function(data){        
              // console.log(data.enabled_status);
                if(data.error){                  
                  notification = '<div><i class="fa fa-circle text-danger" style="height: 30px important!;"></i><label style="margin-left:15px"> Error:'+data.statusCode+', '+data.messager+'</label></div>';                
                  $("#span_notificationCol").html(notification);
                  $("#btnValidateInCol").hide();
                  $("#headerFormCovidCol").css({background:'#f44336'});
                  return;
                }                                       
                if(data.dni)
                {
                  if(data.enabled_status)///habilitado
                  {   

                    if(covid_test==1)
                    {
                      /* if(new Date(fecheTamg.split('T')[0]+' 23:59')>new Date(nowhasta) )//validacion de dia de la cita
                      {
                        notification = '<div><i class="fa fa-circle text-danger" style="height: 30px important!;"></i><label style="margin-left:15px">Acceso Denegado.  El Día de su cita es: '+  moment(fecheTamg).format("DD/MM/YYYY")+'</label></div>';
                        $("#span_notification").html(notification);
                        $("#headerFormCovid").css({background:'#f44336'});
                        $("#fechaReeustExamCol").show();
                        return;
                      } */
                      //si es su fecha de tamizaje
                      if(new Date(fecheTamg.split('T')[0]+' 23:59')>new Date(nowdesde)&&new Date(fecheTamg.split('T')[0]+' 23:59')<=new Date(nowhasta) )//validacion de dia de la cita
                      {
                            notification = '<div><i class="fa fa-circle text-success" style="height: 30px important!;"></i><label style="margin-left:15px">Acceso Autorizado.  El usuario debe dirigirse al área medica a realizar Tamizaje</label></div>';
                            $("#span_notificationCol").html(notification);
                            $("#headerFormCovidCol").css({background:'#ffc42c'});
                            $("#fechaReeustExamCol").show();
                            if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_TASAAPROVETAMIZAJE" &&  getCookie("vtas_type_usergroup"+sessionStorage.tabVisitasa)!="colaborador" )   
                            {   
                              if(check_in_out==0)       
                              $("#btnValidateInCol").show();
                            }
                            return;
                      } 


                      notification = '<div><i class="fa fa-circle text-success" style="height: 30px important!;"></i><label style="margin-left:15px">Acceso Autorizado.</label></div>';
                      $("#span_notificationCol").html(notification);
                      $("#headerFormCovidCol").css({background:'#29c282'});
                      $("#fechaReeustExamCol").show();
                      if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_TASAAPROVETAMIZAJE" &&  getCookie("vtas_type_usergroup"+sessionStorage.tabVisitasa)!="colaborador" )   
                      {   
                        if(check_in_out==0)       
                      $("#btnValidateInCol").show();
                      }
                      return;
                    }


                    if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_TASAAPROVETAMIZAJE" &&  getCookie("vtas_type_usergroup"+sessionStorage.tabVisitasa)!="colaborador" )  
                    {        
                      if(check_in_out==0)   
                      $("#btnValidateInCol").show();
                    }
                    notification = '<div><i class="fa fa-circle statusPperCoursetx" style="height: 30px important!;"></i><label style="margin-left:15px">Acceso autorizado</label></div>';
                    $("#span_notificationCol").html(notification);
                    if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_COVIDSEGURIDAD")
                    $("#btnSolicitudTamizajeCol").show();
                    $("#headerFormCovidCol").css({background:'#29c282'})
                  }
                  else
                  {//no habilitado          
                    var textError=" ";
                    if(!data.sctr_status){textError=textError+" .SCTR"}
                    if(!data.codanexo1_status){textError=textError+" .Anexo1"}
                    if(!data.codanexo2_status){textError=textError+" .Anexo2"}
                    if(!data.dj_status){textError=textError+" .DJ"}
                    notification = '<div><i class="fa fa-circle text-danger" style="height: 30px important!;"></i><label style="margin-left:15px">Su empresa no presentó documentación completa en OIS.\nFalta:\n'+textError+'</label></div>';
                    //notification = '<div class="alert alert-danger" style="border-radius:10px" role="alert">Su empresa no presentó documentación completa en OIS.\nFalta:\n'+textError+'</div>';                           //
                    $("#span_notificationCol").html(notification);
                    $("#btnValidateInCol").hide();
                    $("#headerFormCovidCol").css({background:'#f44336'})
                    return;
                  }
                }
                else
                {
                  

                  if(dni!="001654671" && dni!="001654672" && dni!="001444147" && dni!="003353982" )//documentos de prueba visualsat
                  {
                    notification = '<div><i class="fa fa-circle text-danger" style="height: 30px important!;"></i><label style="margin-left:15px">No registrado en OIS</label></div>';                
                    $("#span_notificationCol").html(notification);
                    $("#btnValidateInCol").hide();
                    $("#headerFormCovidCol").css({background:'#f44336'})
                    return;
                  }


                  if(covid_test==1)
                    {
                      /* if(new Date(fecheTamg.split('T')[0]+' 23:59')>new Date(nowhasta))//validacion de dia de la cita
                      {
                        notification = '<div><i class="fa fa-circle text-danger" style="height: 30px important!;"></i><label style="margin-left:15px">Acceso Denegado.  El Día de su cita es: '+  moment(fecheTamg).format("DD/MM/YYYY")+'</label></div>';
                        $("#span_notification").html(notification);
                        $("#headerFormCovid").css({background:'#f44336'});
                        $("#fechaReeustExamCol").show();
                        return;

                      } */

                      if(new Date(fecheTamg.split('T')[0]+' 23:59')>new Date(nowdesde)&&new Date(fecheTamg.split('T')[0]+' 23:59')<=new Date(nowhasta) )//validacion de dia de la cita
                      {
                            notification = '<div><i class="fa fa-circle text-success" style="height: 30px important!;"></i><label style="margin-left:15px">Acceso Autorizado.  El usuario debe dirigirse al área medica a realizar Tamizaje</label></div>';
                            $("#span_notificationCol").html(notification);
                            $("#headerFormCovidCol").css({background:'#ffc42c'});
                            $("#fechaReeustExamCol").show();
                            if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_TASAAPROVETAMIZAJE" &&  getCookie("vtas_type_usergroup"+sessionStorage.tabVisitasa)!="colaborador" )   
                            {   
                              if(check_in_out==0)       
                            $("#btnValidateInCol").show();
                          }
                            return;
                      } 
                      
                      notification = '<div><i class="fa fa-circle text-success" style="height: 30px important!;"></i><label style="margin-left:15px">Acceso Autorizado.</label></div>';
                      //notification = '<div class="alert alert-danger" style="border-radius:10px" role="alert">Su empresa no presentó documentación completa en OIS.\nFalta:\n'+textError+'</div>';                           //
                      $("#span_notificationCol").html(notification);
                      //$("#btnSolicitudTamizaje").show();
                      $("#headerFormCovidCol").css({background:'#29c282'});
                      $("#fechaReeustExamCol").show();
                      if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_TASAAPROVETAMIZAJE" &&  getCookie("vtas_type_usergroup"+sessionStorage.tabVisitasa)!="colaborador" ) 
                      {   
                        if(check_in_out==0)         
                      $("#btnValidateInCol").show();
                      }
                      return;
                    }


                  if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_TASAAPROVETAMIZAJE" &&  getCookie("vtas_type_usergroup"+sessionStorage.tabVisitasa)!="colaborador" ) 
                  {
                    if(check_in_out==0)
                    $("#btnValidateInCol").show();
                  }
                    notification = '<div><i class="fa fa-circle statusPperCoursetx" style="height: 30px important!;"></i><label style="margin-left:15px">Acceso autorizado</label></div>';
                    $("#span_notificationCol").html(notification);
                    $("#headerFormCovidCol").css({background:'#29c282'})

                }
              });
              }
              
              else
              {
                
                if(covid_test==1)
                {

                 /*  if(new Date(fecheTamg.split('T')[0]+' 23:59')>new Date(nowhasta))//validacion de dia de la cita
                      {
                        notification = '<div><i class="fa fa-circle text-danger" style="height: 30px important!;"></i><label style="margin-left:15px">Acceso Denegado.  El Día de su cita es: '+  moment(fecheTamg).format("DD/MM/YYYY")+'</label></div>';
                        $("#span_notification").html(notification);
                        $("#headerFormCovid").css({background:'#f44336'});
                        $("#fechaReeustExamCol").show();
                        return;
                      } */

                      if(new Date(fecheTamg.split('T')[0]+' 23:59')>new Date(nowdesde)&&new Date(fecheTamg.split('T')[0]+' 23:59')<=new Date(nowhasta) )//validacion de dia de la cita
                      {
                            if(check_in_out==0)
                            notification = '<div><i class="fa fa-circle text-success" style="height: 30px important!;"></i><label style="margin-left:15px">Acceso Autorizado.  El usuario debe dirigirse al área medica a realizar Tamizaje</label></div>';
                          else 
                            notification = '<div><i class="fa fa-circle text-success" style="height: 30px important!;"></i><label style="margin-left:15px">Salida Autorizada</label></div>';
                            $("#span_notificationCol").html(notification);
                            $("#headerFormCovidCol").css({background:'#ffc42c'});
                            $("#fechaReeustExamCol").show();
                            if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_TASAAPROVETAMIZAJE" &&  getCookie("vtas_type_usergroup"+sessionStorage.tabVisitasa)!="colaborador" )   
                            {   
                              if(check_in_out==0)       
                            $("#btnValidateInCol").show();
                          }
                            return;
                      } 

                  if(check_in_out==0)
                    notification = '<div><i class="fa fa-circle text-success" style="height: 30px important!;"></i><label style="margin-left:15px">Acceso Autorizado.</label></div>';
                  else 
                    notification = '<div><i class="fa fa-circle text-success" style="height: 30px important!;"></i><label style="margin-left:15px">Salida Autorizada</label></div>';
                  //notification = '<div class="alert alert-danger" style="border-radius:10px" role="alert">Su empresa no presentó documentación completa en OIS.\nFalta:\n'+textError+'</div>';                           //
                  $("#span_notificationCol").html(notification);
                  //$("#btnSolicitudTamizaje").show();
                  $("#headerFormCovidCol").css({background:'#29c282'});
                  $("#fechaReeustExamCol").show();
                  /*if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_TASAAPROVETAMIZAJE") 
                  {
                    if(check_in_out==0)
                    $("#btnValidateIn").show();
                  }*/
                  return;
                }
                  console.log("OIS Autorizado");   
                 /* if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_TASAAPROVETAMIZAJE" &&  getCookie("vtas_type_usergroup"+sessionStorage.tabVisitasa)!="colaborador" ) 
                  {      
                    if(check_in_out==0)         
                    $("#btnValidateIn").show();
                  }*/

                  notification = '<div><i class="fa fa-circle statusPperCoursetx" style="height: 30px important!;"></i><label style="margin-left:15px">Acceso autorizado</label></div>';
                  $("#span_notificationCol").html(notification);
                  $("#headerFormCovidCol").css({background:'#29c282'})
              }
            }
         // }     
        
        //}
      }      
    }

  var clearRow = function(i){
    $("#add_covid_dni_"+i).val("");
    $("#add_covid_dniload_"+i).val("");
    $("#add_covid_firtname_"+i).val("");
    $("#hid_collaborator_id_"+i).val("");
    $("#ruc_company_"+i).val("");
    $("#sel_company_"+i).val("");
    $("#sel_location_"+i).val("");
    $("#sel_area_"+i).val("");
    $("#tx_date_start_"+i).val("");
    //$("#sel_company_11").val("");
    $("#validationsIdOiid_"+i).removeClass("text-danger");
    $("#validationsIdOiid_"+i).addClass("text-white");
  }

  var cancelarForm=function()
    {
      $("#tb_tbody_covid_list").empty();
      $("#badgelistRequest").text(" ( 1 )");
      lengList=1;
      var html = `<tr id="row_covid_1" class="row_covid">
                  <td>
                    <div class="form-group bmd-form-group" style="padding-top:0!important">  
                      <img src="images/iconos/organizador.svg" class="mr-3 mt-2" height="24">
                    </div>
                  </td>
                  <td>
                    <div class="form-group bmd-form-group" style="padding-top:0!important">
                      <select class="form-control" id="sel_type_contact_1" name="sel_type_contact_1">
                        <option value="contratista">Contratista</option>
                        <option value="colaborador">Colaborador</option>
                      </select>
                      <small class="text-white"  id="" style="font-size: 11px;">Validations</small>
                                                                        
                    </div>
                  </td>
                  <td>
                  <div class="form-group bmd-form-group" style="padding-top:0!important">                                  
                    <input type="text" class="form-control" id="add_covid_dni_1" onkeyup="validaSoloNumeros(this.id)"  maxlength="11"> 
                    <small class="text-white"  id="validationsIdOiid_1" style="font-size: 11px;">OIS Autorizado</small>                                                  
                  </div>
                </td>
                <td>
                  <div class="form-group bmd-form-group" style="padding-top:0!important">  
                    <input type="text" class="form-control autocompletecollaborator" id="add_covid_firtname_1" maxlength="25" >  
                    <small class="text-white"   style="font-size: 11px;">OIS Autorizado</small>
                    <input type="hidden" class="form-control" id="hid_collaborator_id_1" name="hid_collaborator_id_1">                      
                  </div>
                </td>
                  <td>
                    <div class="form-group bmd-form-group" style="padding-top:0!important"> 
                    <input type="text" class="form-control" id="ruc_company_1" maxlength="30" value=""  onfocus="if (this.value!='') /*this.value='';$('#ruc_company_1').val('');*/">                                                     
                    <small class="text-white"   style="font-size: 11px;">OIS Autorizado</small>                       
                    </div>
                  </td>
                  <td>
                    <div class="form-group bmd-form-group" style="padding-top:0!important">                                                     
                    <input type="text" class="form-control autocompletecollaborator" id="sel_company_1" maxlength="30" value="" onfocus="if (this.value!='') /*this.value='';$('#sel_cod_company_1').val(''); $('#sel_company_1')[0].className='form-control'*/">
                    <small class="text-white"   style="font-size: 11px;">OIS Autorizado</small>                                             
                    </div>
                  </td>
                 
                 
                  <td>
                    <div class="form-group bmd-form-group" style="padding-top:0!important">
                      <select name="sel_location_1" class="form-control validations_cupos" id="sel_location_1">Seleccione</select>
                      <small class="text-white"   style="font-size: 11px;">OIS Autorizado</small>
                    </div>
                  </td>
                  <td>
                    <div class="form-group bmd-form-group" style="padding-top:0!important">
                      <select name="sel_area_1" class="form-control" id="sel_area_1" >Seleccione</select>
                      <small class="text-white"   style="font-size: 11px;">OIS Autorizado</small>                                                   
                    </div>
                  </td>
                  <td>
                    <div class="form-group bmd-form-group" style="padding-top:0!important">                                  
                      <input type="text" maxlength="10"  class="form-control validations_cupos" id="tx_date_start_1" value="">
                      <small class="text-white mutetexthelp"   style="font-size: 11px;">DD/MM/YYYY</small> 
                      <input type="hidden" class="form-control" id="sel_cod_company_1" name="sel_cod_company_1">                                                    
                    </div>
                  </td>
                  <td>
                  <div id="bt_delete_row_covid_1" style="cursor: pointer;">
                      <img src="images/iconos/trash.svg" class="" >
                  </div>
                  </td>
                </tr>`;

                $("#tb_tbody_covid_list").append(html);
                
                $("#bt_delete_row_covid_"+1).click(function()
                {
                  var id  = 'row_covid_'+1;
                  var obj = $("#"+id);
                  removeRowCovid(obj);
                  $("#cant_row_persona").html($("#list_participantes").find("div.bd-callout").length);
                });
                
               
                $("#add_covid_dni_"+1).blur(function(){
                  var dni = $(this).val();                  
                  if(dni.trim().length>0){
                    if($("#sel_type_contact_1").val()=="colaborador")
                      getCollaboratorDni(dni,1,'add_covid_firtname_1');
                    checkOis(dni,1,$("#sel_type_contact_1").val());
                  }
                    
                });
                
                $("#add_covid_dni_1").autocomplete({          
                  change: function (event, ui) 
                  {
                   
                    if (ui.item === null) 
                    {                      
                      
                    }
                    else if(ui.item)
                    {                     
                      $("#add_covid_firtname_1").val(ui.item.firstname);
                    }
                  },
                  source: jsonPersonBlaclist,      
                  minLength: 1,
                  select: function( event, ui ) {
                    //$("#add_covid_dni_1").val(ui.item.label);
                    $("#add_covid_firtname_1").val(ui.item.firstname);
                    //$("#add_covid_lastname_"+leng).val(ui.item.lastname);
                  },
                  open: function() {
                      $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
                  },
                  close: function() {
                      $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
                  },
                  search: function () {
                      $("#spinnerLoadColaborador").show();
                  },
                  response: function () {
                      $("#spinnerLoadColaborador").hide();         
                  }
                });
                getAreas('',1);
                selectExternalCompany($("#sel_company_1"),1);
                selectLocation("#sel_location_"+1);
                getCollaborator($("#add_covid_firtname_"+1),1);
                $("#tx_date_start_1").datetimepicker({
                  timepicker:false,
                  format:'d/m/Y',
                  minDate: 0
                });
                
                $("#add_covid_dni_1").blur(function(){
                  var dni = $(this).val();          
                  if(dni.trim().length>0){
                    if($("#sel_type_contact_1").val()=="colaborador")
                      getCollaboratorDni(dni,1,'add_covid_firtname_1');
                    checkOis(dni,1,$("#sel_type_contact_1").val());
                  }
                    
                });
              
        
              $("#sel_type_contact_1").change(function(){
                getCollaborator($("#add_covid_firtname_1"),1); 
                clearRow(1); 
                var value = $(this).val();
                if(value=='colaborador'){
                    $("#ruc_company_1").val('20100971772');
                    $("#sel_company_1").val('Tasa');                    
                }
              }); 
              $("#div_message_req").html('');
              /*$("#add_covid_dni_1").blur(function(){
                var dni = $(this).val();
                //alert(dni.trim().length);
                if(dni.trim().length>0 && $("#sel_type_contact_1").val()=='contratista')
                  checkOis(dni,1);
              });*/
    }

  var getPersonBlackList = function()
    {      
      $("#add_covid_dniload_1").show();
      var httpmethod  = "objectlistmin";
      var url         = apiurlblacklist+"/api/Get-Blacklist-User?code="+getblacklistusercode+"&httpmethod="+httpmethod;              
      var headers ={
          "apikey":"r$3#23516ewew5"        
      }
      $.ajax({                    
          method: "POST",
          url:  url,
          headers:headers,
          crossDomain: true,
          dataType: "json",
      }).done(function(data)
      {      
        $("#add_covid_dniload_1").hide();  
        jsonPersonBlaclist=[];
        data.map(function(item){
          var json ={}
         
        
          json.label      = item.identity_document;
          json.value      = item.identity_document;
          json.id         = item.id;
          json.firstname  = item.name;;
          json.id_company = item.id_company;
          jsonPersonBlaclist.push(json);               
        });
       
        $("#add_covid_dni_1").autocomplete({          
          change: function (event, ui) 
          {
            // console.log( $("#hid_collaborator_id_"+i).val())
            if (ui.item === null) 
            {
                //$("#hid_collaborator_id_"+i).val("");
                /*$(this).val("");
                $("#add_covid_firtname_1").val("");
                $("#add_covid_lastname_1").val("");*/
            }
            else if(ui.item)
            {

              $("#add_covid_firtname_1").val(ui.item.firstname);
             
            }
          },
          source: jsonPersonBlaclist,      
         // minLength: 3,
          select: function( event, ui ) {
            //$("#add_covid_dni_1").val(ui.item.label);
            $("#add_covid_firtname_1").val(ui.item.firstname);
            setTimeout(function(){
              $("#add_covid_firtname_1").focus();
            },300);
            
          },
          open: function() {
              $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
          },
          close: function() {
              $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
          },
          search: function () {
              $("#spinnerLoadColaborador").show();
          },
          response: function () {
              $("#spinnerLoadColaborador").hide();         
          }
        });
      });
    }

  var getCollaborator =  function(obj,i,istasa)
  {    
    //alert(i);
    var type_contact = $("#sel_type_contact_"+i).val();
    if(type_contact=="colaborador")//if(company=="0-tasa" || company=="tasa" || company=="Tasa" || company=="TASA" )
    {      
      obj.autocomplete({
        change: function (event, ui) 
        {
            //console.log( $("#hid_collaborator_id_"+i).val())
            if (ui.item === null &&  $("#hid_collaborator_id_"+i).length>20) 
            {
            
               /*  $("#hid_collaborator_id_"+i).val("");
                $(this).val("");
                $("#add_covid_lastname_"+i).val(""); */
            }
            else if(ui.item)
            {
             
              $("#add_covid_firtname_"+i).val(ui.item.firstname).trigger("change");
              //$("#add_covid_lastname_"+i).val(ui.item.lastname).trigger("change");
              //$("#add_covid_lastname_"+i).focus();
              //document.getElementById("add_covid_lastname_"+i).focus();
             // document.getElementById("add_covid_lastname_"+i).focus();
            }
            //document.getElementById("add_covid_lastname_"+i).focus();
             
        }, 
        
        source: function( request, response ) 
        {
            var filter = obj.val();
            ///console.log(filter);
            var param= {filter:filter};
            var headers = {"Authorization":TOKEN_CLIENT,"apiKey":"r$3#23516ewew5"}
            $("#add_covid_firtnameload_1").show();
            $.ajax({
            url: apiurlsecurity+"/api/Get-Collaborator?code="+GetCollaborator+"&httpmethod=objectlist",
            //dataType: "json",
            method:"post",
            data : JSON.stringify(param),
            processData:false,
            crossDomain: true,
            async: true,
            headers : headers,
            success: function( data ) 
            {
              $("#add_covid_firtnameload_1").hide();
                var array =[];
                data =  JSON.parse(data);
                
                data.value.forEach(item => 
                {
                    var json ={}
                    json.label      = item.displayName;
                    json.value      = item.givenName;
                    json.id         = item.objectId;
                    json.firstname  = item.displayName;//item.givenName+' '+item.surname;
                    array.push(json);
                });
                
                response(array);
            }
            });
        },
        minLength: 3,
        select: function( event, ui ) 
        {
         
          $("#hid_collaborator_id_"+i).val(ui.item.id);
          //$("#add_covid_dni_"+i).trigger("focusout");
          //console.log(ui.item.label)
          setTimeout(function(){
            $("#add_covid_firtname_"+i).val(ui.item.firstname);
          },300);


          

        },
        open: function() {
            $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
        },
        close: function() {
            $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
            
        },
        search: function () {
            $("#spinnerLoadColaborador").show();
        },
        response: function () {
            $("#spinnerLoadColaborador").hide();
           // document.getElementById("add_covid_lastname_"+i).focus();           
        }
    });
    //$(obj).on();
    }
    else{
        //console.log("off autocomplete")
        obj.autocomplete({source: []});
         
    }    
  }
    var checkOis = function(dni,leng,typepesron)
    {    
      dni=dni.trim();  
      $("#validationsIdOiid_"+leng)[0].className="text-white";
      //CHECK LISTA NEGRA
      var vetado = checkBlackList(dni);
      if(vetado==1)
      {
        $("#validationsIdOiid_"+leng)[0].className="text-danger";
        $("#validationsIdOiid_"+leng).text(dni+", Usuario en lista negra.");
        //$("#add_covid_firtname_"+leng).val('');
        $("#add_covid_dni_"+leng).val("");  
        
        setTimeout(function(){
          $("#add_covid_dni_"+leng).val("");
        },1000) 

        return;
      }
      
      if(vetado==2)
      {
        $("#validationsIdOiid_"+leng)[0].className="text-warning";
        $("#validationsIdOiid_"+leng).text("Usuario vetado. ");
        //$("#add_covid_firtname_"+leng).val('');
        //$("#add_covid_dni_"+leng).val("");
        return;
      }
      //cheking persona de riesgo

            var dataRiesgo = checkRiskList(dni);
            //console.log(dataRiesgo)
            if(dataRiesgo.length>0)
            {
              $("#validationsIdOiid_"+leng)[0].className="text-danger";
              $("#validationsIdOiid_"+leng).text(dni+", En Lista de Riesgo.");
              $("#add_covid_firtname_"+leng).val(toCapitalize(dataRiesgo[0].name));
              /*$("#add_covid_dni_"+leng).val(""); 
              
              setTimeout(function(){
                $("#add_covid_dni_"+leng).val("");
              },1000) 

              $("#div_message_req").html('<i class="fa fa-circle text-danger" style="height: 30px important!;"></i><label style="margin-left:15px">No se puede realizar solicitudes de Tamizaje para estos usuarios. Motivo: En Lista De Riesgo</label>');            
              return;*/
            }

      if(vetado==7)//checking habilitado indefinido
      {
        $("#validationsIdOiid_"+leng)[0].className="text-success";
        $("#validationsIdOiid_"+leng).text(dni+", Habilitado indefinido.");
        //$("#add_covid_firtname_"+leng).val('');
        $("#add_covid_dni_"+leng).val("");  
        
        setTimeout(function(){
          $("#add_covid_dni_"+leng).val("");
        },1000) 

        return;
      }

   //checking ois
   if(typepesron=="contratista")//solo para contratistas
   {         
      
            
      
      var url         = apiurlsecurity+"/api/Get-OIS?code="+GetOIS+"&httpmethod=object&dni="+dni.trim();  
      //var url          = apiurlaccessregistries+"/api/Get-OIS?code="+GetOIS+"&httpmethod=object&dni="+dni.trim();            
      var headers ={
          "apikey":"r$3#23516ewew5"        
      }
      var resp ;
      $.ajax({                    
          method: "POST",
          url:  url,
          async:false,
          headers:headers,
          crossDomain: true,
          dataType: "json",
      }).done(function(data)
      {        
        resp = data;     
        if(data.error==1){
          $("#add_covid_dni_"+leng).val("");
          $("#validationsIdOiid_"+leng)[0].className="text-danger";
          $("#validationsIdOiid_"+leng).text("Error:"+data.statusCode+", "+data.messager);          
          return;
        }
        if(data.dni)
        {
          $("#add_covid_firtname_"+leng).val(toCapitalize(data.fullname));
          $("#ruc_company_"+leng).val(data.company_ruc);
          $("#sel_company_"+leng).val(toCapitalize(data.company_name));

          if(data.enabled_status)///habilitado
          {
            console.log("OIS Autorizado");
          }
          else
          {//no habilitado

            var textError="OIS: ";
            if(!data.sctr_status){textError=textError+" .SCTR"}
            //if(!data.emo_status){textError=textError+" .EMO"}
            if(!data.codanexo1_status){textError=textError+" .Anexo1"}
            if(!data.codanexo2_status){textError=textError+" .Anexo2"}
            if(!data.dj_status){textError=textError+" .DJ"}

            console.log("No autorizado OIS")
            $("#add_covid_dni_"+leng).val("");
            $("#validationsIdOiid_"+leng)[0].className="text-danger";
            $("#validationsIdOiid_"+leng).text(dni+", "+textError);
            $("#add_covid_dni_"+leng).focus();
          }
        }
        else{
          if(dni!="001654671" && dni!="001654672" && dni!="001444147" && dni!="003353982" )//documento sde prueba visualsat
          {
            console.log("No autorizado OIS");
            $("#add_covid_dni_"+leng).val("");
            $("#validationsIdOiid_"+leng)[0].className="text-danger";
            $("#validationsIdOiid_"+leng).text(dni+", No Registrado en OIS.");
            $("#add_covid_dni_"+leng).focus();
          }
        }
        /*if(data.enabled_status==false || data.enabled_status ===undefined){//si es vacío no existe
          swal("Error","Su empresa no presentó la Declaración Jurada COVID-19","error");  
        }*/
      });
      
    }
      return resp;
    }

    var getObjectByValue = function (array, key, value) {
      return array.filter(function (object) {
          return object[key] === value;
      });
    }

    var checkBlackList = function(dni){
      //alert("checkBlackList"+' '+dni);
      var url         = apiurlblacklist+"/api/Get-Blacklist-User?code="+getblacklistusercode+"&httpmethod=object&identity_document="+dni;              
      var headers ={
          "apikey":"r$3#23516ewew5"        
      }
      var resp ;
      var vetado = 0;
      $.ajax({                    
          method: "POST",
          url:  url,
          async:false,
          headers:headers,
          crossDomain: true,
          dataType: "json",
      }).done(function(data)
      {
        if(data.veto_status==true || data.veto_status==1)
        {
          if(data.list_type==1)
            vetado = 1;
          if(data.list_type==2)
            vetado = 2;
        }
        if(data.covid_test==7 && data.list_type==2)
        {
            vetado=7;//indefinido
        }
      });      
      return vetado;
    }

    var tableListTamizaje = function(enter = 0)
    {

      var date1   = $("#tx_date_init").val().split("/");
      date1     = date1[2]+'-'+date1[1]+'-'+date1[0]+' 00:00';
      var date2   = $("#tx_date_end").val().split("/");
      date2     = date2[2]+'-'+date2[1]+'-'+date2[0]+' 23:59';
      var array   = $("#sel_sede")[0]?$("#sel_sede").val().split("-"):0;
        var location    = array[0]?array[0]:0;

      //Contadores de tamizaje
      var url=apiurlaccessrequest+"/api/Get-CovidTestResult-All?code="+GetCovidTestResultAll+"&httpmethod=countStatus&location="+location+"&created_date_ini="+date1+"&created_date_end="+date2;                   
      var headers ={
          "apikey":"r$3#23516ewew5"        
      }
      $.ajax({                    
          method: "POST",
          url:  url,
          headers:headers,
          crossDomain: true,
          dataType: "json",
      }).done(function(data)
      {
        if (data) {
         
          $('#tamizaje_agend').text(data.agendado);
          $('#tamizaje_ven').text(data.vencido);
          
        }else{
          swal("Error!", "No se ha podido actualizar el contador de tamizaje.", "error");
        }

      });


        showLoading();
      
        if(oTableTamizajeList)
        {
            oTableTamizajeList.clear().draw();
            oTableTamizajeList.destroy();
        }
        if(!status)    
          status = $('input:radio[name=chb_status_list]:checked').val();        
         

        var estatus = $("#sel_status")[0]?$("#sel_status").val():0;
        var type    = $("#sel_type")[0]?$("#sel_type").val():0;      
        var company =  $("#sel_company")[0]?$("#sel_company").val():0;        
        var array   = $("#sel_sede")[0]?$("#sel_sede").val().split("-"):0;
        var sede    = array[0]?array[0]:0;
        var area    = $("#sel_area")[0]?$("#sel_area").val():0;
        var desde = $("#tx_date_init").val();
        var hasta =$("#tx_date_init").val() //$("#tx_date_end").val();
        //ESTATUS DE TAMIZAJE: 1. Pendiente por Aprobación 2. Aprobado para Tamizaje 3. Tamizaje Realizado 4. Tamizaje Vencido        
       /*  if(initListCovid==0 && getCookie("vtas_sede") &&  getCookie("vtas_sede")!="")//l aprimera vez busca por la sede logueada
        {
          initListCovid=1;
          sede=getCookie("vtas_sede");
        } */
        //console.log(status);
        var search = "";
       
        if(enter == 1){
          estatus = "0";
          company = "0";
          sede    = "0";
          area    = "0";
          desde   = "";
          hasta   = "";
          search  = "&search="+$("#tx_access_dni_list").val();
        }
        var search_type = 1;
        var now = moment().format('YYYY-MM-DD');
        var list_type = 2;//covid 19
        var url         = apiurlblacklist+"/api/Get-Blacklist-User?httpmethod=objectlistapprovader&code="+getblacklistusercode+"&list_type="+list_type+"&status="+estatus+"&type="+type+"&company="+company+"&sede="+sede+"&area="+area+"&date_init="+desde+"&date_end="+hasta+search+"&search_type="+search_type;
        var headers ={
            "apikey":constantes.apiKey
        }
        var showTitleColaborador = 0;
      
        var moduleExam=$("#modalRegisterCovidTest")[0];
        oTableTamizajeList = $('#tb_tamizaje_list').DataTable({
            dom: 'Bfrtip',
            buttons: [{
              extend: 'excelHtml5',
              className:'btn-success font-weight-bold ',              
              text: 'Exportar a Excel',
              //messageTop: 'Exportar a Excel',
              exportOptions: {
                columns: [0,1,2,3,4,5,6,7,8,9,10]
              },
              title: 'Listado de personas',              
              customize: function(xlsx) {
              }
            },
            
            {
              extend: 'print',
              className:'btn-secondary font-weight-bold ',              
              text: 'Imprimir',
              //messageTop: 'Exportar a Excel',
              exportOptions: {
                columns: [0,1,2,3,4,5,6,7,8,9,10]
              },
              title: 'Listado de personas',              
              customize: function(xlsx) {
              }
            }
           //'copyHtml5',
           //'excelHtml5',
           //'csvHtml5',
           //'pdfHtml5' 
          ],
            ordering  : true,
            info      : false,
            pageLength: 100,
            paging:true,
            searching : true,
            scrollY   : '52vh',
            scrollCollapse: true,
            responsive: true,
            language:{"sProcessing":     "Procesando...",
                "sLengthMenu":     "Mostrar _MENU_ registros",
                "sZeroRecords":    `<div style=''>Presione la tecla ENTER para realizar su búsqueda</div>`,//Validar el documento de identidad. No se encontraron resultados. Sin solicitud de Tamizaje
                "sEmptyTable":     `No se Encontraron Registros<br><br>
                                   `,
                "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
                "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix":    "",
                "sSearch":         "Buscar:",
                "sUrl":            "",
                "sInfoThousands":  ",",
                "sLoadingRecords": "Cargando...",
                "oPaginate": {
                    "sFirst":    "Primero",
                    "sLast":     "Último",
                    "sNext":     "Siguiente",
                    "sPrevious": "Anterior"
                },
                "oAria": {
                    "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                },
                "buttons": {
                    "copy": "Copiar",
                    "colvis": "Visibilidad"
                }},
               
            ajax      :{
                type: "POST",
                url:  url,
                headers:headers,
                crossDomain: true,
                dataType: "json",
                error: function (xhr, error, thrown) {

                  console.log(xhr);
                  console.log(xhr.status)
                  var textError=thrown;
                  var status=xhr.status+' - '+xhr.statusText;//500 error servidor

                  showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.");
                  return;
                  
                  //console.log( xhr, error, thrown );
                  hideLoading();
              },
                dataSrc: function ( req ) 
                {
                  hideLoading();
                    $("#cantTotalCovid19").text(req.length)                    
                    globalBlackLists=req;
                    var data =[];
                    var i = 1;
                    var cantCovid1=0;
                    var cantCovid2=0;
                    var cantCovid3=0;
                    var cantCovid4=0;
                    var cantCovid5=0;
                    req.map(function(item)
                    {
                     /*  $("#badgelistcovid1").text(item.cant_covid.cantPendientes)
                      $("#badgelistcovid2").text(item.cant_covid.cantHabilitados)
                      $("#badgelistcovid3").text(item.cant_covid.cantColaboradores)
                      $("#badgelistcovid4").text(item.cant_covid.cantContratistas)
                      $("#badgelistcovid5").text(item.cant_covid.cantVetados)*/
                      $("#badgelistcovidAlli").text(item.cant_covid.cantCheckIn) 
                      
                        var accessTime  = moment(item.created_date).format('LT');
                        var week        = moment(item.created_date).format('ddd');//dddd
                        var month       = moment(item.created_date).format('MMMM');//
                        var day         = moment(item.created_date).format('D');
                        var startDate               = week +" "+day +" de "+ month;
                        var datec=startDate;
                        var lastAttentionDate =  "-";
                        var dateTamizaje = moment(item.created_date).format('DD/MM/YYYY'); 
                        if(item.last_attention_date!=null && item.last_attention_date !="0001-01-01T00:00:00"){
                          lastAttentionDate = moment(item.last_attention_date).format('DD/MM/YYYY');
                        }    
                                      
                        var dateSolicitud = "-";
                        if(item.date_solicitud_tamizaje!=null && item.date_solicitud_tamizaje !="0001-01-01T00:00:00"){
                          dateSolicitud = moment(item.date_solicitud_tamizaje).format('DD/MM/YYYY');
                        }
                        var area = item.name_area?toCapitalize(item.name_area):"No Asignado";
                        //console.log(item.name_external_company,item.person_picture);
                        var companys=item.name_external_company?toCapitalize(item.name_external_company):'-';
                        var name="'"+toCapitalize(item.name)+"'";
                        var statusColor="";
                        var textStatus="";
                        /* 
                          1-> Pendiente por Aprobación
                          2-> Aprobado para Tamizaje
                          3-> Tamizaje Realizado
                          4-> Tamizaje Vencido
                        */
                       var showBottonApprover =  false;
                       var showCheckApprover = false;
                        if(item.covid_test==4)//cambiar 
                        {
                          textStatus      = "Pendiente por Aprobación";
                          statusColor     = "statusPperDatostx";
                          cantCovid1++;
                          showBottonApprover =  true;
                          showCheckApprover = true;
                        }
                        else if(item.covid_test==2)
                        {
                          textStatus      ="Tamizaje Realizado";
                          statusColor     ="statusPperProgtx";
                          cantCovid1++;
                          showBottonApprover =true;
                        }
                        else if(item.covid_test==3)
                        {
                          textStatus      ="Tamizaje Vencido";
                          statusColor     ="text-danger";
                          cantCovid1++;
                          showBottonApprover =true;
                        }
                        if(item.covid_test==7)
                        {
                          var textStatus="Habilitado Indefinido";
                          statusColor ="statusPperCoursetx";

                          textStatustamizaje="Habilitado Indefinido";
                          statusColortamizaje ="text-success";
                          cantCovid2++;
                        }
                        else if(item.covid_test==1)
                        {
                          textStatus      ="Tamizaje Agendado";
                          statusColor     ="text-success";
                          cantCovid1++;
                          showBottonApprover =true;
                        }
                        if(item.covid_test==5)
                        {
                          var textStatus="Tamizaje cancelado";
                          statusColor ="text-muted";
                          showBottonApprover = true;
                          cantCovid1++;
                        }
                       
                       /* else
                        {
                          if(item.veto_status==1)
                          {
                            var textStatus="Vetado";
                            statusColor ="text-danger";
                            cantCovid5++;
                          }
                          else
                          {
                            var textStatus="Habilitado";
                            statusColor ="statusPperCoursetx";
                            cantCovid2++;
                          }
                          
                        }*/
                        if(item.is_collaborator)
                        {
                          cantCovid3++;
                        }
                        else{
                          cantCovid4++;
                        }

                       // console.log(item.check_in,item.check_in_datetime,item.check_out_datetime)
                        var action=""; 
                        var datAction='';
                        var hora = "";
                        var fecha = "<span id='date_"+item.id+"'>"+lastAttentionDate+"</span>";//"";
                        var colorAction="";  
                        var tooltipVetado = '';
                        if(item.attribute5)
                          tooltipVetado = 'data-toggle="tooltip" data-placement="top" title="'+item.attribute5+'"';
                        var img = item.person_picture?item.person_picture:"images/iconos/user.svg"; 
                        var buttomDetail= moduleExam?'<img height="24" src="images/iconos/newExam.svg">':'<i class="material-icons btdetail" style="cursor:pointer " >more_vert</i>' 
                        
                      
                          var namecol='<div style="cursor:pointer" class="hoverItem" onclick="vw_collaborator_approver.thumbsUp2('+item.id+','+item.veto_status+','+name+',&quot;'+item.name_external_company+'&quot;,&quot;'+img+'&quot;,&quot;'+item.reason+'&quot;,'+item.id_area+','+item.id_company+','+item.id_location+',&quot;'+item.name_area+'&quot;,&quot;'+item.name_location+'&quot;,&quot;'+toCapitalize(item.name)+'&quot;,&quot;'+item.identity_document+'&quot;,&quot;'+item.job+'&quot;,'+item.check_in+','+item.covid_test+','+item.is_collaborator+',&quot;'+item.created_date+'&quot;,&quot;'+item.temperature_in+'&quot;,&quot;'+item.temperature_out+'&quot;);"" >'+(toCapitalize(getCleanedString(item.name)))+'</div>'                         
                          var row = {
                            
                            name     : namecol
                            ,dni		  : item.identity_document  //
                            ,fecha    : fecha
                            ,tamizajepara:dateTamizaje
                            ,hora     : hora
                            ,check    : showCheckApprover?"<input type='checkbox' id='check_"+item.id+"'  class='check_tamizaje_pendiente' value='"+item.id+"-"+dateTamizaje+"-"+item.id_location+"'>":""
                            ,registro : getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_COVIDSEGURIDAD"? `<div class="${colorAction}">${action}</div> `:''
                           // ,dateingreso		  :getCookie("vtas_rolexternalrol")=="ROL_COVIDSEGURIDAD"? `<div class="">${datAction}</div> `:''
                           // ,ingreso	:getCookie("vtas_rolexternalrol")=="ROL_COVIDSEGURIDAD"? `<div class="${colorAction}">${action}</div> `:''
                            ,colaborador     : item.is_collaborator?"Colaborador":"Contratista"
                            ,solicitado:item.name_solicitud_tamizaje?toCapitalize(item.name_solicitud_tamizaje):"-"
                            ,fecha_solicitud :dateSolicitud
                            ,company	: toCapitalize(companys)
                            ,name_location     : toCapitalize(item.name_location)
                            ,area     : toCapitalize(area)
                            ,date		  : dateTamizaje//toCapitalize(datec) 
                            ,action_type :'<div '+tooltipVetado+'><i class="fa fa-circle '+statusColor+'"></i><label style="margin-left:15px">'+textStatus+'</label></div>'                        
                            ,buttons  :showBottonApprover?'<button type="button" class="btn " onclick="vw_collaborator_approver.thumbsUp('+item.id+','+item.veto_status+','+name+',&quot;'+item.name_external_company+'&quot;,&quot;'+img+'&quot;,&quot;'+item.reason+'&quot;,'+item.id_area+','+item.id_company+','+item.id_location+',&quot;'+item.name_area+'&quot;,&quot;'+item.name_location+'&quot;,&quot;'+toCapitalize(item.name)+'&quot;,&quot;'+item.identity_document+'&quot;,&quot;'+item.job+'&quot;,'+item.check_in+','+item.covid_test+','+item.is_collaborator+',&quot;'+item.created_date+'&quot;,&quot;'+item.temperature_in+'&quot;,&quot;'+item.temperature_out+'&quot;);">'+buttomDetail+'</button>': ''
                            ,detail           :item.covid_test==2?'':'<div data-toggle="modal" data-target="#modalShowRequestDetails" ><i class="material-icons btdetail" style="cursor:pointer " >more_vert</i></div>'
                            ,buttonsHistory   :moduleExam?'<button class="btn " onclick="vw_covid_list.showHistory('+item.id+')"> <img height="24" src="images/iconos/reporthistory.svg"> </button>':''
                        }//item.covid_test==2?'':
                        i++;
                        data.push(row);
                    });
                   
                    return data;
                } 
            },//nombre, apellido, dni, empresa, fecha de solicitud y estatus
            columns: [
               
                               
                { title:"Nombre y Apellido",data: "name",align:"left"   },
                { title:"Documento",data: "dni",align:"left","orderable": false},
                { title:"Tipo",data: "colaborador",align:"left" ,"orderable": false},
                { title:"Empresa",data: "company",align:"left" ,"orderable": false},
                { title:"Sede",data: "name_location",align:"left" ,"orderable": false},
                { title:"Área",data: "area",align:"left" ,"orderable": false},  
                { title:"Solicitante",data: "solicitado",align:"left","orderable": false },
                { title:"Fecha Solicitud",data: "fecha_solicitud",align:"left","orderable": false },
                { title:"Estado Tamizaje",data: "action_type",align:"left" ,"orderable": false },
                { title:"Último Tamizaje",data: "fecha",align:"left" ,"orderable": false }, 
                { title:"Cita de Tamizaje",data: "tamizajepara",align:"left" ,"orderable": false ,width: "5%"}, 
                { title:"<div class='row'><input type='checkbox' id='check_global' class='' value=''></div>",data:"check",width: "5%" ,targets: 0,"orderable": false,align:"left"},               
                { title:"Reagendar",data:"buttons",width: "1%" ,"orderable": false}                
            ],  

            initComplete: function(settings, json) {
              //alert("culminó la carga");
              //$('[data-toggle="tooltip"]').tooltip();    
              $('[data-toggle="tooltip"]').tooltip();  
              $('#check_global').click(function(){
                $('.check_tamizaje_pendiente').prop('checked', this.checked);               
              });
            }
        });
    }
    var getCleanedString = function(cadena){
        // Definimos los caracteres que queremos eliminar
        var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.";
     
        // Los eliminamos todos
        for (var i = 0; i < specialChars.length; i++) {
            cadena= cadena.replace(new RegExp("\\" + specialChars[i], 'gi'), '');
        }   
     
        // Lo queremos devolver limpio en minusculas
        cadena = cadena.toLowerCase();
     
        // Quitamos espacios y los sustituimos por _ porque nos gusta mas asi
        cadena = cadena.replace(/ /g," ");
     
        // Quitamos acentos y "ñ". Fijate en que va sin comillas el primer parametro
        cadena = cadena.replace(/á/gi,"a");
        cadena = cadena.replace(/é/gi,"e");
        cadena = cadena.replace(/í/gi,"i");
        cadena = cadena.replace(/ó/gi,"o");
        cadena = cadena.replace(/ú/gi,"u");
        //cadena = cadena.replace(/ñ/gi,"n");
        return cadena;
     }

    var idEdit;
    var statusEdit;
    var nameEdit;
    var area;
    var company;
    var location;
    var thumbsUp = function(id,status,name,company_name,img,reason,id_area,id_company,id_location,name_area,name_location,nameperson,document,job,check_in,covid_test,is_collaborator,fecha,temperature_in,temperature_out){
      //

    $("#btnApproverTamizaje").hide();
    $("#btnCancelTamizaje").hide();
     
      var group = getCookie("vtas_type_usergroup"+sessionStorage.tabVisitasa); 
      //alert(group);
      $("#btnValidateOut").hide();

      
      $('#span_name_company').text("--");

      if(company!=null || company!="" || company!="null")
        $('#span_name_company').text(toCapitalize(company));
      if(img)
        $("#img_user_black_list").attr("src",img);
      
      nameEdit    = name;
      statusEdit  = status;
      idEdit      = id;
      area        = id_area;
      company     = id_company;
      location    = id_location;
      
      $("#hid_is_collaborator").val(is_collaborator);     
      $("#hid_id_area").val(id_area);
      $("#hid_id_location").val(id_location);  
      $("#hid_id_company").val(id_company); 
      //alert(company_name);
      $("#hid_name_company").val(company_name);
      $("#hid_covid_test").val('');
      $("#hid_covid_test").val(covid_test);
      $("#tx_tempIN_lg").val(""); 
      $("#tx_temoOUT_lg").val("");
      $("#tx_tempIN_lg").val(temperature_in!='null'?temperature_in:""); 
      $("#tx_temoOUT_lg").val(temperature_out!='null'?temperature_out:"");
      
      $("#company").text(company_name!='null'?company_name:'No asignado');
      $("#area").text(name_area!='null'?name_area:'No asignado');
      $("#local").text(name_location!='null'?name_location:'No asignado');
      $("#tx_nomape").val(nameperson);
      $("#tx_docum").val(document!='null'?document:'');
      //alert(job);
      $("#tx_ocupacion").val(job!='null'?job:'');
      fecha = moment(fecha).format("DD/MM/YYYY");
      $("#tx_date_tamizaje").val(fecha);
      $("#hid_check_in_out").val(check_in);
    
      
      $('#tx_reasonedit').text(reason);
      $('#nameedit').text(name);          
      $('#modalEditBlacklistAprove').modal('show');  
      
      getCupoDisponible( $("#tx_date_tamizaje").val(),location)

      $("#btnApproverTamizaje").text("Aprobar");
      if(covid_test==4)
      {
        $("#btnApproverTamizaje").show();
        $("#btnCancelTamizaje").hide();
        $("#btnSolicitudTamizaje").hide();
      }
      if(covid_test==1)
      {
        $("#btnApproverTamizaje").show();
        $("#btnApproverTamizaje").text("Actualizar");
        $("#btnCancelTamizaje").show();
        $("#btnSolicitudTamizaje").hide();
      }
       if(covid_test==2 || covid_test==3 || covid_test==5)
      {
        $("#btnApproverTamizaje").hide();
        $("#btnCancelTamizaje").hide();
        $("#btnSolicitudTamizaje").show();
        
      }
      /*if(covid_test==4)
      {
        $("#btnApproverTamizaje").hide();
        $("#btnCancelTamizaje").hide();
        $("#btnSolicitudTamizaje").hide();
      } */
    }

    var thumbsUp2 = function(id,status,name,company_name,img,reason,id_area,id_company,id_location,name_area,name_location,nameperson,document,job,check_in,covid_test,is_collaborator,fecha,temperature_in,temperature_out,last_attention_date,ruc,last_veto_status,ch_evolucion,nacionalidad,ubigeo,direccion,email,sexo,fecha_nacimiento,tlf_celular,tlf_fijo,dato_familiar,tlf_contacto,biIdF00,type_document){
     // alert(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa));
      //return;
      //console.log(id,status,name,company_name,img,reason,id_area,id_company,id_location,name_area,name_location,nameperson,document,job,check_in,covid_test,is_collaborator,fecha,temperature_in,temperature_out,last_attention_date,ruc,last_veto_status,ch_evolucion,nacionalidad,ubigeo,direccion,email,sexo,fecha_nacimiento,tlf_celular,tlf_fijo,dato_familiar,tlf_contacto)
      if(ubigeo!= "null" && ubigeo!=undefined){
        var dep   = ubigeo.slice(0, 2);
        var prov  = ubigeo.slice(2, 4);
        var dist  = ubigeo.slice(4, 6);
        console.log(dep+' '+prov+' '+dist);
        $("#sel_departamento_res").val(dep);
        getProvincias(dep,$("#sel_provincia_res"),prov);
        getDistritos(dep,prov,$("#sel_distrito_res"),$("#sel_distrito_res"),dist,dist);
      }

      nacionalidad      = (nacionalidad!="null")?nacionalidad:""; 
      direccion         = (direccion!="null")?direccion:"";
      email             = (email!="null")?email:"";
      tlf_celular       = (tlf_celular!="null")?tlf_celular:"";
      tlf_fijo          = (tlf_fijo!="null")?tlf_fijo:"";
      dato_familiar     = (dato_familiar!="null")?dato_familiar:"";
      tlf_contacto      = (tlf_contacto!="null")?tlf_contacto:"";
      fecha_nacimiento  = (fecha_nacimiento!="null")?moment(fecha_nacimiento).format("DD/MM/YYYY"):"";
      $("#tx_nacionalidad").val(nacionalidad);
      $("#tx_direccion_res").val(direccion);
      $("#tx_email").val(email);
      $("#tx_celular").val(tlf_celular);
      $("#tx_telefono").val(tlf_fijo);
      $("#tx_dato_familiar").val(dato_familiar);
      $("#tx_celular_contacto").val(tlf_contacto);
      $("#tx_sexo").val(sexo);
      $("#tx_edad").val(fecha_nacimiento); 
      //se limpia la respuesta de validacion    
      //console.log(last_attention_date);
      $("#hid_ruc_company").val(ruc);
      $("#btnValidateInCol").hide();
      $("#headerFormCovidCol").css({background:'#039be0'});  
      $("#span_notificationCol").html('Validando... Espere');
      $("#btnValidateInCol").hide();
      $("#btnSolicitudTamizajeCol").hide(); 
      $("#btnValidateOutCol").hide();
    //--------------------------------------------------------
      var group = getCookie("vtas_type_usergroup"+sessionStorage.tabVisitasa); 
      //alert(group);
      $('#span_name_company').text("--");
      
       
      nameEdit=name;
      statusEdit=status;
      idEdit=id;
      area = id_area;
      company = id_company;
      location = id_location;
      lastattentiondate=last_attention_date;
      biIdF00 = biIdF00!=null && biIdF00!="null" && biIdF00!=""?biIdF00:0;
      $("#hid_biIdF00").val(biIdF00);
      $("#hid_is_collaborator").val(is_collaborator);     
      $("#hid_id_area").val(id_area);
      $("#hid_id_area").val();
      $("#hid_id_location").val(id_location);  
      $("#hid_id_company").val(id_company); 
      $("#hid_name_company").val(company_name);
      $("#hid_covid_test").val('');
      $("#hid_covid_test").val(covid_test);
      $("#tx_tempIN_lg").val(""); 
      $("#tx_temoOUT_lg").val("");
     
      $("#tx_tempIN_lg").val(temperature_in!='null'?temperature_in:""); 
      $("#tx_temoOUT_lg").val(temperature_out!='null'?temperature_out:"");
      
      $("#companyCol").text(company_name!='null'?company_name:'No asignado');//--
      $("#areaCol").text(name_area!='null'?name_area:'No asignado');//--
      $("#localCol").text(name_location!='null'?name_location:'No asignado');//--
      $("#tx_nomapeCol").val(nameperson);
      $("#tx_documCol").val(document!='null'?document:'');
      $("#tx_ocupacionCol").val(job!='null'?job:'');
      $("#sel_type_document_prog").val(type_document!='null' && type_document!="undefined" && type_document?type_document:'DNI');               
      fecheTamg=fecha;
      fecha = moment(fecha).format("DD/MM/YYYY");
      $("#tx_date_tamizajeCol").val(fecha);


      $("#hid_check_in_out").val(check_in);
      
      if (check_in==1 || (status==1 && (covid_test!=1 || covid_test!=0 || covid_test!=null  )) || group=="colaborador" || covid_test!=3) 
      {
        $("#btnValidateIn").hide();
        
      }
      else
      {
        $("#btnValidateIn").show();
        
      }

      if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_COVIDSEGURIDAD")//si es seguridad no se muestra solicitud de tamizaje
      {
        if(check_in==1)
        {
          $("#btnValidateOut").show();
        }
      }
     
      $("#btnCancelTamizajeCol").hide();
      if(covid_test==1 || covid_test==4){
        if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_COVIDSEGURIDAD")
        $("#btnCancelTamizajeCol").show();
      }
      if((status==1 && covid_test ==2) || (status==0 && covid_test ==2) )
      {
        if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_COVIDSEGURIDAD")
        $("#btnCancelTamizajeCol").show();
      }
      else{
        $("#btnSolicitudTamizajeCol").hide();
        }

      if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_TASAAPROVETAMIZAJE")//si es seguridad no se muestra solicitud de tamizaje
      {
        $("#btnSolicitudTamizajeCol").hide();
        $("#fechaReeustExamCol").hide();
        $("#btnNoAuthorizedeInCol").hide();        
      }
      else{
        
        $("#btnNoAuthorizedeInCol").hide();
      }
     
    ///console.log()
     /*  if(getCookie("vtas_rolexternalrol")=="ROL_COVIDSEGURIDAD" || getCookie("vtas_rolexternalrol")=="ROL_SEGURIDAD")//si es seguridad no se muestra solicitud de tamizaje
      {
        if(id_location!= getCookie("vtas_sede"))//si no esta en  su misma garira no autoriza a otros
        $("#btnValidateIn").hide();
      } */

      
      if (status==1) 
      {
        $("#butEditBlack").text("Finalizar")
        var text = "El usuario será restituido.";
        $("#butEditBlack")[0].className="btn btn-green-lime btn-rounded btn-raised";
        
      }
      else
      {
        $("#butEditBlack").text("Finalizar")
        $("#butEditBlack")[0].className="btn btn-info btn-rounded btn-raised";
    		var text = "El usuario será dado de baja.";
      }

      $('#tx_reasonedit').text(reason);
      $('#nameedit').text(name);  
       
      //var moduleExam=$("#modalRegisterCovidTestNewForm")[0];
      $('#modalEditBlacklist').modal('show');
     /*if (!moduleExam) {
        $('#modalEditBlacklist').modal('show');
      }else{
       // $('#modalRegisterCovidTest').modal('show');
       
       $('#modalRegisterCovidTestNewForm').modal('show');
       
      }*/
     
      $("#sel_statusrap").change(function(){
        
        if ($(this).val()==1) {$(".reagent").show()}else{$(".reagent").hide()}
        verifyStatus(1);
      })

      $("#sel_statusmolec").change(function(){
        
        verifyStatus(1);

      })

      if(is_collaborator==1)
        $("#tx_empleador").val('colaborador')
      else
      $("#tx_empleador").val('contratista')

     
      var diaspass=0;//para dias limite para pasar
              if(last_attention_date)//se calcula tiempo de la ultima fecha de tamizaje------------------------------------------------------------------------
              {

                    var date=new Date();
                    var dateBdd = moment(last_attention_date).add(-5,"hours").format('YYYY-MM-DD HH:mm:ss');                             
                    var time1   = moment(dateBdd,"YYYY-MM-DD HH:mm:ss");
                    var time2   = moment(date,"YYYY-MM-DD HH:mm:ss");
                    var ms      = time1.diff(time2);
                    diaspass = Math.abs(moment.duration(ms).asDays());
                    //var hours = moment.duration(ms).asHours();
                    console.log("Dias: "+diaspass);
              }

     
      $("#label_altamedica_88").show();
      //if(diaspass>=14)//si es vetado y es mas de 14 dias
      //{
        if(last_veto_status==1 || ch_evolucion==true)
        {
          $("#label_altamedica_88").show();
        }
      //}               
    }
    


    
    var confirmApprove = function(){

      var date        = $("#tx_date_tamizaje").val();

      if($("#tx_date_tamizaje").val()=="")
      {
        swal({
          title: "Campos vacios",
          text: 'Debe ingresar la Fecha de Tamizaje',
          timer: 4000,
          type: "error",
          showConfirmButton: true
          });
          return
      }
      if(quotes<=0)
      {
        swal({
          title: "Sin cupos Disponibles",
          text: 'Debe seleccionar otra Fecha de Tamizaje',
          timer: 4000,
          type: "error",
          showConfirmButton: true
          });
          return
      }

      
      
     
      swal({
        title: "Tamizaje Programado",
        text: "¿Está seguro de aprobar el tamizaje para la fecha "+date+"?",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: " btn-green-lime btn-sm btn-rounded btn-raised",
        confirmButtonText: "Si",
        cancelButtonText: "no",                
        closeOnConfirm: true,
        closeOnCancel: true,
        showLoaderOnConfirm: true
      },function(action){
        if(action==true){
          approveTamizaje();
        }
      });
    }
    var approveTamizaje = function()
    {
        var date        = $("#tx_date_tamizaje").val();
        var id          = idEdit;
        var sede        = location;
        //alert("approveTamizaje - "+date+" - "+id+" - "+sede);
        //return;
        var last_updated_by = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);//getCookie("vtas_id_hash");
        var httpmethod  = "approvertamizaje";
        var arrayDate   = date.split("/");
        var datenew     = arrayDate[2]+'-'+arrayDate[1]+'-'+arrayDate[0];
      
        var url         = apiurlaccessrequest+"/api/Get-MedicalAvailability?code="+GetMedicalAvailability+"&httpmethod="+httpmethod+"&id_sede="+sede+"&date="+datenew+"&id="+id+"&last_updated_by="+last_updated_by;
        var headers ={
          "apikey":"r$3#23516ewew5"        
        }
        $.ajax({
            method: "POST",
            url:  url,
            //data: JSON.stringify(body),
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function(data){
          //console.log(data);
          tableListTamizaje();
          $('#modalEditBlacklistAprove').modal('hide')
          getCupoDisponibletop();

        });
      //alert("Preparando todo para aprobar");
    }
    var confirmCancel = function(){
      swal({
        title: "Cancelar Tamizaje!",
        text: "¿Estás seguro de cancelar el tamizaje?",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: " btn-green-lime btn-sm btn-rounded btn-raised",
        confirmButtonText: "Si",
        cancelButtonText: "no",                
        closeOnConfirm: true,
        closeOnCancel: true,
        showLoaderOnConfirm: true
      },function(action){
        if(action==true){
          cancelTamizaje();
        }
      });
    }
    var cancelTamizaje = function(){
      //alert(idEdit);
      //return;
      var id          = idEdit;
      //alert(id);
      //return;
      var last_updated_by = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);//getCookie("vtas_id_hash");
      var httpmethod  = "canceltamizaje";
      var url         = apiurlblacklist+"/api/Post-Blacklist-User?code="+postblacklistusercode+"&httpmethod="+httpmethod+"&last_updated_by="+last_updated_by+"&id="+id;
      
      var headers = {
        "apikey":"r$3#23516ewew5"        
      }
      $.ajax({
          method: "POST",
          url:  url,
          //data: JSON.stringify(body),
          headers:headers,
          crossDomain: true,
          dataType: "json",
      }).done(function(data){
        //console.log(data);
        tableListTamizaje();
        //$('#modalEditBlacklistAprove').modal('hide')
        $('#modalEditBlacklist').modal('hide');

      });
    //alert("Preparando todo para aprobar");
  }
  var thumbsUpregisterApprover = function(){
   //alert(idEdit);
   //return;
    var tx_ocupacion      = $("#tx_ocupacion").val();    
    var nameperson        = $("#tx_nomape").val();
    var identity_document = $("#tx_docum").val();    
    var fecha             =  $("#tx_date_tamizaje").val(); 
    var flag              = 0;
    var message           = "";
    var validatefield     = "";      
    console.log(tx_ocupacion,nameperson,identity_document,fecha);
    if(nameperson.trim().length==0){
      flag = 1;
      message = "Debes introducir el nombre";
    }
    else if(identity_document.trim().length==0){
      flag = 1;
      message = "Debes introducir el documento de identidad ";
    }
    if(tx_ocupacion.trim().length==0){
      flag = 1;
      message = "Debes introducir la ocupación ";
    }
    
    else if(fecha.trim().length==0){
      flag = 1;
      message ="Debes introducir la fecha";
    }
    if(flag==1)
    {
      swal({
        title: "Campos vacios",
        text: message,
        timer: 4000,
        type: "error",
        showConfirmButton: true
        });
      return;
    }
    swal({
      title: "Editar Datos",
      text: "¿Seguro que desea editar los datos ingresados?",
      type: "info",
      showCancelButton: true,
      confirmButtonClass: "btn-danger btn-sm",
      confirmButtonText: "Si",
      cancelButtonText: "No",
      closeOnConfirm: true
    },
    function(){
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
      //var responsible = getCookie('vtas_id'+sessionStorage.tabVisitasa);
         
      var url = apiurlblacklist+"/api/Post-Blacklist-User?code="+postblacklistusercode+"&httpmethod=putcovid&id="+idEdit;
      var body ={ 
        "job":tx_ocupacion,                
        "name":nameperson,
        "identity_document":identity_document,
        "list_type": 2,
        "last_updated_by": getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
        "fecha":fecha=="Invalid date"?'':fecha
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
        if (data.id) 
        {
          swal.close();
          setTimeout(function(){
            swal("Exito!", "Operación satisfactoria.", "success");
          },500);
          tableListTamizaje();
          $("#modalEditBlacklistAprove").modal("hide");
        }
      });
    });
  }

  var thumbsReasignarTamizajeApprover = function(){
    var nameperson        = $("#tx_nomape").val();
     var fecha             =  $("#tx_date_tamizaje").val(); 
     var flag              = 0;
     var message           = "";
     var validatefield     = "";      
     if(fecha.trim().length==0){
       flag = 1;
       message ="Debes introducir la fecha";
     }
     if(flag==1)
     {
       swal({
         title: "Campos vacios",
         text: message,
         timer: 4000,
         type: "error",
         showConfirmButton: true
         });
       return;
     }
     swal({
       title: "Reagendar",
       text: "¿Seguro que desea reagendar el tamizaje a la fecha "+$("#tx_date_tamizaje").val()+"?",
       type: "info",
       showCancelButton: true,
       confirmButtonClass: "btn-danger btn-sm",
       confirmButtonText: "Si",
       cancelButtonText: "No",
       closeOnConfirm: true
     },
     function(){
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
       //var responsible = getCookie('vtas_id'+sessionStorage.tabVisitasa);          
       var url = apiurlblacklist+"/api/Post-Blacklist-User?code="+postblacklistusercode+"&httpmethod=putcovid&id="+idEdit;
       var body ={          
         "list_type": 2,         
         "fecha":fecha=="Invalid date"?'':fecha,
         "last_updated_by": getCookie("vtas_id_hash"+sessionStorage.tabVisitasa)
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
         if (data.id) 
         {
           swal.close();
           setTimeout(function(){
             swal("Exito!", "Se agendó correctamente a \n"+nameperson, "success");
           },500);
           tableListTamizaje();
           console.log(":"+idEdit+"-"+fecha+"-"+location);
           $("#check_"+idEdit).val(idEdit+"-"+fecha+"-"+location);
           $("#date_"+idEdit).text(fecha);
           
           $("#modalEditBlacklistAprove").modal("hide");
         }
       });
     });
   }
  var sedeidglob='';
  var getCupoDisponible = function(date, sede, objmessage)
  {
//console.log(date, sede)
sedeidglob   =sede;       
      //console.log($("#tb_tbody_covid_list tr").length,j);
     
        //var table = $("#tb_cupos_disponibles tbody");
        var obj = $("#tb_cupos_disponibles");
        obj.empty();
          var k           = 0;        
          var sede        = sede;
          var arrayDate   = date.split("/");
          var datenew     = arrayDate[2]+'-'+arrayDate[1]+'-'+arrayDate[0];
          var url         = apiurlaccessrequest+"/api/Get-MedicalAvailability?code="+GetMedicalAvailability+"&httpmethod=availability&id_sede="+sede+"&date="+datenew+"&date_end="+datenew;
          var headers ={
            "apikey":"r$3#23516ewew5"        
          }
          $.ajax({
              method: "POST",
              url:  url,
              //data: JSON.stringify(body),
              headers:headers,
              crossDomain: true,
              dataType: "json",
          }).done(function(data)
          {
                      
              /*var row = `<tr class="font-weight-light h4" style="font-size:16px">
                            <td>${$("#local").text()}</td>
                            <td>Cupos Disponibles</td>
                            <td>${data[0].available}</td>
                         </tr>`;*/
              obj.html(data[0].available);
              quotes=data[0].available;

          });
        
      
  }
  var getCupoDisponibletop = function()
  {        
          $("#tb_cupos_disponiblestop").text(0)  
          sedeidglobtop   =$("#sel_sede").val();       
          var k           = 0;        
          var sede        = sedeidglobtop.split('-')[0];
          var arrayDate   = $("#tx_date_init").val().split("/");
          var datenew     = arrayDate[2]+'-'+arrayDate[1]+'-'+arrayDate[0];

          var arrayDate2   = $("#tx_date_end").val().split("/");
          var datenew2     = arrayDate2[2]+'-'+arrayDate2[1]+'-'+arrayDate2[0];
          var url         = apiurlaccessrequest+"/api/Get-MedicalAvailability?code="+GetMedicalAvailability+"&httpmethod=availability&id_sede="+sede+"&date="+datenew+"&date_end="+datenew2;              
          var headers ={
            "apikey":"r$3#23516ewew5"        
          }
          $.ajax({
              method: "POST",
              url:  url,
              //data: JSON.stringify(body),
              headers:headers,
              crossDomain: true,
              dataType: "json",
          }).done(function(data)
          {
             $("#tb_cupos_disponiblestop").text(data[0].available)         
             quotestop=data[0].available;

          });
        
      
  }

  var selectExternalCompany = function(obj)
  {
    var option = "";
    option+="<option value='0'>Todos</option>";  
    jsonExternalCompany.map(function(item){
        option+="<option value='"+item.name+"'>"+toCapitalize(item.name)+"</option>";
    });
    obj.html(option);
  }
  var getExternalCompany = function(){    
    
    var url = apiurlsecurity+"/api/Get-ExternalCompany-All?code="+GetExternalCompanyAll+"&httpmethod=objectlist&attribute5=";              
    var headers ={
        "apikey":"r$3#23516ewew5"        
    }
    $.ajax({                    
        method: "POST",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function(data)
    {       
        jsonExternalCompany=[];
        data.map(function(item){
          if(item.id!=167 && item.id!=166 && item.attribute4=="OIS")
            jsonExternalCompany.push(item);               
        });
        selectExternalCompany($("#sel_company"));
    });
  }
  var getLocations= function()
  { 
    //$("#sel_location").append("<option value='-1'>Cargando...</option>");
    var url = apiurlaccessrequest+"/api/Get-Locations-All?httpmethod=objectlist&code="+GetLocationsAll+"";                   
    var headers ={
        "apikey":"r$3#23516ewew5"        
    }
    $.ajax({                    
        method: "POST",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function( data)
    {
      jsonLocation=[];
      data.map(function(item){
        jsonLocation.push(item);               
      });         
      selectLocation("#sel_sede",null,'filter'); 
      
      selectLocation("#sel_location_1");     
    });
  }

  var selectLocation = function(obj,sede,filter)
  {
    var option = "";    
    console.logobj  
      if(filter=="filter")
        option+="<option value='0'>Todos</option>";
      else
        option+="<option value='0'>Seleccione</option>";
    jsonLocation.map(function(item){
        option+="<option value='"+item.id+"-"+item.name+"'>"+item.name+"</option>";
    });
    $(obj).html(option);
    if(sede)
    {
      if(sede!="")
      sede=sede.trim();
      sede=toCapitalize(sede);
      if(sede=="Callao"){sede="3-Callao"}
      else if(sede=="Samanco"){sede="5-Samanco"}
      else if(sede=="Malabrigo"){sede="4-Malabrigo"}
      else if(sede=="Chimbote"){sede="6-Chimbote"}
      else if(sede=="Astillero"){sede="7-Astillero"}
      else if(sede=="San Borja"){sede="1-San Borja"}
      else if(sede=="Supe"){sede="8-Supe"}
      else if(sede=="Vegueta"){sede="9-Vegueta"}
      else if(sede=="Pisco Norte"){sede="10-Pisco Norte"}
      else if(sede=="Pisco Sur"){sede="11-Pisco Sur"}
      else if(sede=="Atico"){sede="12-Atico"}
      else if(sede=="Matarani"){sede="13-Matarani"}
      else
      sede=0;
      
      $(obj+" option[value='"+ sede +"']").attr("selected",true);
      //$(obj+" option:contains("+sede+" )").attr('selected', true);
    //
    }
   // 
  }

  var getCollaboratorDni = function(dni,leng,id){
      // console.log("Buscando "+val+" en Directorio colaboradores......") 
    var param   = {filter:dni};
    var headers = {"Authorization":TOKEN_CLIENT,"apiKey":"r$3#23516ewew5"}    
    $.ajax({
      url: apiurlsecurity+"/api/Get-Collaborator?code="+GetCollaborator+"&httpmethod=objectdni",
      //dataType: "json",
      method:"post",
      data : JSON.stringify(param),
      processData:false,
      crossDomain: true,
      async: true,
      headers : headers,
      success: function( datacolaborator ) 
      {        
        //$("#"+id).val();
        datacol=JSON.parse(datacolaborator);
        //console.log(datacol);
        //console.log(datacol.value[0]['displayName']);
        $("#"+id).val("");
        if(datacol.value.length>0)
          $("#"+id).val(toCapitalize(datacol.value[0]['displayName']));
      }
    });
  }

  var getAreas = function(val, pos,area)
  {


    var option ;
    var obj     = $("#sel_area_"+pos);obj.empty();
    option="<option value='1-Operaciones'>Operaciones</option>";
    obj.append(option);
    option="<option value='3-Pesca'>Pesca</option>";
    obj.append(option);

    if(area)
    {
    if(area=="Operaciones")
      obj.val('1-Operaciones')
    else
      obj.val('3-Pesca')
    }

    

    
     /*  $("#sel_area_"+pos).html("");
      $("#sel_area_"+pos).append("<option value='-1'>Cargando...</option>");
      var url = apiurlaccessrequest+"/api/Get-Area-All?httpmethod=objectlist&id_location="+val+"&code="+GetAreaAll+"";                   
      var headers ={
        "apikey":"r$3#23516ewew5"
      }
      $.ajax({                    
          method: "POST",
          url:  url,
          headers:headers,
          crossDomain: true,
          dataType: "json",
      }).done(function( data)
      {
          var option ;
          var obj     = $("#sel_area_"+pos);obj.empty();
          option="<option value='0'>Seleccione</option>";
          obj.append(option);
          data.map(function(item){
              option="<option value='"+item.id+"-"+item.name+"'>"+item.name+"</option>";
              obj.append(option);
          });
      }); */
  }
  var confirmSolicitudTamizaje = function()
  {
    var date    = $("#tx_date_tamizaje").val();
    var error   = false;
    var message = "";
    if(date.trim().length==0){
      error   = true;
      message = "Debes seleccionar la fecha de tamizaje";
    }
    if(error){
      swal("Error", message, "error");
    }
    if(error==false){
      swal({
        title: "Confirmación",
        text: "¿Quiere solicitar una nueva Prueba de Tamizaje?",        
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn-danger btn-sm",
        confirmButtonText: "Si",
        cancelButtonText: "No",
        closeOnConfirm: true
      },
      function(){        
        processSolicitudTamizaje();
        //swal("Operación exitosa", "Proceso realizado con exito", "success");
      });
    }      
  }

  var processSolicitudTamizaje =  function()
  {
    var option  = "puttamizaje";     
    var fullname    = $("#tx_nomape").val();
    var document = $("#tx_docum").val();
    var job     = $("#tx_ocupacion").val();
    var date    = $("#tx_date_tamizaje").val();
    var is_collaborator = $("#hid_is_collaborator").val();
    var id_area =  $("#hid_id_area").val();
    var id_location =  $("#hid_id_location").val();
    var id_company = $("#hid_id_company").val();
    var ocupation = $("#tx_ocupacion").val();
    
    
    var id = idEdit;

    var data = {
      //id_user: idEdit
      name: toCapitalize(fullname)
      ,identity_document:document
      ,ocupation:ocupation
      ,veto_status:0      
      ,last_updated_by:getCookie("vtas_id_hash"+sessionStorage.tabVisitasa)
      ,attribute1:""
      ,attribute2:""
      ,attribute3:""
      ,attribute4:""
      ,attribute5:""    
      ,list_type :2
      ,job:job
      ,is_collaborator:is_collaborator
      ,covid_test:4//4-> pendiente 1-> aprobado , 2->realizada, 3-> vencido
      ,id_area:id_area
      //,name_area:name_area
      ,id_company:id_company
      //,name_company:toCapitalize(name_company)
      ,id_location:id_location
      //,name_location:name_location
      ,fecha:date
    }
    var url     = apiurlblacklist+"/api/Post-Blacklist-User?code="+postblacklistusercode+"&httpmethod="+option+"&id="+id;
    var headers ={
      "apikey":"r$3#23516ewew5"        
    }
    $.ajax({                    
        method: "POST",
        url:  url,
        headers:headers,
        data : JSON.stringify(data),
        crossDomain: true,
        dataType: "json",
    }).done(function( data)
    {                
      swal("Operación exitosa", "Proceso realizado con exito", "success");
      tableListTamizaje();
      $('#modalEditBlacklistAprove').modal('hide')
    });
  }
  var validate = function()
  {     
      var arrayCheckCompanyOis = [];
      var authorizedPersons=[];
      var flag = 0;
      var validatefield="";
      var compamiesOid=[];

      $("#tb_tbody_covid_list tr").each(function()
      { 
        leng++;
        var jsonCheckCompanyOis={};
        var partipante  = {}
        var values      = [];
        $(this).find('.form-control').each(function(){
          var value = $(this).val();
          values.push(value==""?-1:value);
        });

          var leng=$(this)[0].id.split('row_covid_')[1];//se captura id de row, por si se ha borrado alguno intermedio
          
          if(values.length==10)
          {
            var typecontact   = values[0];
            var document      = values[1]!=-1?values[1].trim():-1
            var fullname      = values[2]; 
            var idColaborador = values[3];
            var ruc           = values[4];
            var name_company  = values[5];

            var companyArray  = values[2]!=-1?values[2].split("-"):-1;
            var locationArray = values[6]?values[6].split("-"):0;
            var id_location   = locationArray[0];
            var name_location = locationArray[1];

            var areaArray     = values[7].split("-");
            var id_area       = areaArray[0];
            var name_area     = areaArray[1];
            var fecha         = values[8]
            var id_company    = values[9];

          }
          else{
            var typecontact   = values[0];
            var document      = values[1]!=-1?values[1].trim():-1
            var fullname      = values[2]; 
            var idColaborador =0;
            var ruc           =values[3];
            var name_company  = values[4];

            var companyArray  = values[4]!=-1?values[4].split("-"):-1;
            var locationArray = values[5]?values[5].split("-"):0;
            var id_location   = locationArray[0];
            var name_location = locationArray[1];

            var areaArray     = values[6].split("-");
            var id_area       = areaArray[0];
            var name_area     = areaArray[1];
            var fecha         = values[7]
            var id_company    = values[8];

          }
          
          //validacion ois
          if(document==-1)
          {flag=1;     validatefield= "Debe ingresar "+"Documento de identidad";       }
          else if(fullname.length<3 || fullname==-1)
          {flag=1;       validatefield= "Debe ingresar "+"Nombres y apellidos";     }
          else if(ruc==-1)
          {flag=1;    validatefield= "Debe ingresar "+" RUC de Empresa";       }
          else if(name_company=="" || name_company==-1)
          {flag=1;    validatefield= "Debe ingresar "+"Empresa";       }
          else if(!name_location)
          {flag=1;      validatefield= "Debe ingresar "+"Sede";      }
          else if(name_area=="")
          {flag=1;     validatefield= "Debe ingresar "+"Área";       }
          else if(fecha==-1)
          {flag=1;     validatefield= "Debe ingresar "+"Fecha";       }

          if(flag==1)
          {
            swal("No Registrado",validatefield, "error");
            return;
          } 

         /*  if(typecontact != 'colaborador' && values[4].toLowerCase() != "tasa" && values[1]!="001654671" && values[1]!="001654672" && values[1]!="001444147" && values[1]!="003353982" )
          {
            //consultamos ois de la empresa  
            showLoading();         
            var req= checkOis(values[1],leng);
            if(req.enabled_status==false || req.enabled_status ===undefined){
              jsonCheckCompanyOis.name = values[1];
              jsonCheckCompanyOis.ruc = values[0];
              arrayCheckCompanyOis.push(jsonCheckCompanyOis);            
            }          
          } */

          //console.log(values)
         
          /*else if(id_company=="-1")
          {flag=1;     validatefield="Verificar o Eliminar las Empresas que no tengan Declaración Jurada COVID-19" ; compamiesOid.push(name_company) }
          */
         if(typecontact == 'colaborador' || ruc=='20100971772' || values[4].toLowerCase().trim() == "tasa" ||  values[4].toLowerCase().trim().includes("tasa") || values[5].toLowerCase().trim() == "tasa" || values[5].toLowerCase().trim().includes("tasa"))
         {
          var is_collaborator = 1;
          name_company='Tasa';
          ruc='20100971772';
          id_company=324;
         }
          else
          var is_collaborator = 0;
 
            //console.log(id_company,name_company,idColaborador,fullname,document,id_location,name_location,id_area,name_area,is_collaborator);

          partipante ={
          id_user: 0
          ,name: toCapitalize(fullname).trim()
          ,identity_document:document.trim()
          ,veto_status:0
          ,created_by: getCookie("vtas_id_hash"+sessionStorage.tabVisitasa)
          ,last_updated_by:getCookie("vtas_id_hash"+sessionStorage.tabVisitasa)
          ,user_solicitud_tamizaje : getCookie("vtas_id_hash"+sessionStorage.tabVisitasa)
          ,name_solicitud_tamizaje : getCookie("vtas_fullname"+sessionStorage.tabVisitasa)
          ,veto_fast:0
          ,veto_molecular :0 
          ,attribute1:""
          ,attribute2:""
          ,attribute3:""
          ,attribute4:""
          ,attribute5:""    
          ,list_type :2
          ,is_collaborator:is_collaborator
          ,covid_test:4 //4-> pendiente 1-> aprobado , 2->realizada, 3-> vencido
          ,id_area:id_area
          ,ruc:ruc
          ,name_area:name_area
          ,id_company:id_company
          ,name_company:toCapitalize(name_company).trim()
          ,id_location:id_location
          ,name_location:name_location
          ,fecha:fecha
          }
          authorizedPersons.push(partipante);
      });
     // console.log(arrayCheckCompanyOis);
     hideLoading();
    if(arrayCheckCompanyOis.length>0)
    {
      var leng = arrayCheckCompanyOis.length;
      var message ="";
      var companys = "";
      /* arrayCheckCompanyOis.map(function(item){
        companys += "<p>"+item.name +"</p>";
      });
      if(leng ==1)
        message +=companys+" no presentó la Declaración Jurada COVID-19";
      else if(leng >1)
      {
        message ="Las siguientes empresas no presentaron la Declaración Jurada COVID-19 ";
        message +=companys;
      }  */   
      message ="Esta empresa no presentó la Declaración Jurada COVID-19";  
      swal({
        title: "Validación OIS", 
        html:true,
        text: message,//"Testno  sporocilo za objekt <b>teste</b>",  
        //confirmButtonText: "deacuerdo", 
        //allowOutsideClick: "true",
        type:"error" 
      });
      //swal("Error",message,"error"); 
    }
    else if(flag==1)
    {
      swal("No Registrado",validatefield, "error");
    }  
    else
    {
      //return
      swal({
        title: "Enviar Solicitud",
        text: "¿Seguro que desea enviar esta Solicitud de Tamizaje?",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn-danger btn-sm",
        confirmButtonText: "Si",
        cancelButtonText: "No",
        closeOnConfirm: true
      },
      function()
      {
        var url = apiurlblacklist+"/api/Post-Blacklist-User?httpmethod=postcovid&code="+postblacklistusercode+"";                   
        var headers ={
            "apikey":"r$3#23516ewew5"        
        }
        $.ajax({                    
            method: "POST",
            url:  url,
            data : JSON.stringify(authorizedPersons),
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function(data)
        {
          //console.log(data)
          if (data) 
          {
            //data.blacklist_id
            swal("Exito!", "Se ha realizado el ingreso satisfactoriamente", "success");
            $("#modalShowpersonBlack").modal('hide')
            //reloadtableBlackList();
            tableListTamizaje();
            cancelarForm();            
          }else{
            swal("Error!", "No se ha podido actualizar la lista.", "error");
          }
        }).fail(function( jqXHR, textStatus, errorThrown ) {          
          showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
          console.log(errorThrown)
     });
    });             
    }
  }
  var confirmApproveMasive = function()
  {    

    if($("#sel_sede").val()==0){
      swal("Error","Debe seleccionar una Sede para poder agendar un Tamizaje","error"); 
      return;
    }
    if(quotestop<=0){
      swal("Error","No hay cupos disponibles para el día y sede seleccionado","error"); 
      return;
    }

    

    var datas = [];
    var i     = 0;    
    var error = 0;
    $("#tb_tamizaje_list tr").each(function()
    {      
      var json      = {};
      $(this).find('.check_tamizaje_pendiente:checked').each(function(){        
        var value = $(this).val();
        var array = value.split("-");
        var arrayDate   = array[1].split("/");
        var datenew     = arrayDate[2]+'-'+arrayDate[1]+'-'+arrayDate[0];
        if(array[2]==null || array[2]=="" || array[2]=="null"){
          error = 1;
        }
        json = {
          id:array[0],
          date:datenew,
          id_location:array[2]
        }
        datas.push(json);
      });
      i++;
    });
    if(datas.length==0){
      swal("Error","Debes seleccionar por lo menos una persona para aprobar el tamizaje","error"); 
    }
    else if(error){
      swal("Error","Existe personas sin sede asignadas.","error"); 
    }
    else{
      registerTamizajemasive(datas);
    }
   
  }
  var registerTamizajemasive = function(datas){
    var leng = datas.length;
    //console.log(datas);
    swal({
      title: "Aprobar tamizaje",
      text: "¿Seguro que deseas aprobar los "+ leng +"  Tamizaje(s)?",
      type: "info",
      showCancelButton: true,
      confirmButtonClass: "btn-danger btn-sm",
      confirmButtonText: "Si",
      cancelButtonText: "No",
      closeOnConfirm: true
    },
    function()
    {
      var httpmethod  = "approvertamizajemasive";
      var url         = apiurlaccessrequest+"/api/Get-MedicalAvailability?code="+GetMedicalAvailability+"&httpmethod="+httpmethod+"&";
      var headers ={
          "apikey":"r$3#23516ewew5"        
      }
      $.ajax({
          method: "POST",
          url:  url,
          data : JSON.stringify(datas),
          headers:headers,
          crossDomain: true,
          dataType: "json",
      }).done(function(data)
      {
       
        if(data.error) 
        {
          //data.blacklist_id
          swal("Exito!", "Se ha realizado el ingreso satisfactoriamente", "success");          
          tableListTamizaje(); 
          getCupoDisponibletop();       
        }else{
          swal("Error!", "No se ha podido actualizar la lista.", "error");
        }
      }).fail(function( jqXHR, textStatus, errorThrown ) {          
        showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
       
      });
    }); 
  }
  var confirmSolicitudTamizaje = function()
    {
      var date    = $("#tx_date_tamizajeCol").val();
      var error   = false;
      var message = "";
      if(date.trim().length==0){
        error   = true;
        message = "Debes seleccionar la fecha de tamizaje";
      }
      if(error){
        swal("Error", message, "error");
      }
      if(error==false){
        swal({
          title: "Confirmación",
          text: "¿Quiere solicitar una nueva Prueba de Tamizaje?",        
          type: "info",
          showCancelButton: true,
          confirmButtonClass: "btn-danger btn-sm",
          confirmButtonText: "Si",
          cancelButtonText: "No",
          closeOnConfirm: true
        },
        function(){        
          processSolicitudTamizaje();
          //swal("Operación exitosa", "Proceso realizado con exito", "success");
        });
      }      
    }

    var checkRiskList = function(dni){
      //alert(dni);
      var url         = apiurlblacklist+"/api/Get-Risklist-User?code="+GetRisklistUsercode+"&httpmethod=verifyRiskList&identity_document="+dni;              
      var headers ={
          "apikey":"r$3#23516ewew5"        
      }
      var resp ;
      var riesgo = [];
      $.ajax({                    
          method: "POST",
          url:  url,
          async:false,
          headers:headers,
          crossDomain: true,
          dataType: "json",
      }).done(function(data)
      {
        //1-> está activo en lista de riesgo
        //2-> está inactivo en lista de riesgo
        //null-> no está registtrado en la lista de riesgo
        if(data.status==1){
          riesgo.push({
            status:1,
            name:data.name
          });
        }
        
      });      
      return riesgo;
    }

    var processSolicitudTamizaje =  function()
    {
      var option  = "puttamizaje";     
      var fullname    = $("#tx_nomapeCol").val();
      var document = $("#tx_documCol").val();
      var job     = $("#tx_ocupacionCol").val();
      var date    = $("#tx_date_tamizajeCol").val();
      var is_collaborator = $("#hid_is_collaborator").val();
      var id_area =  $("#hid_id_area").val();
      var id_location =  $("#hid_id_location").val();
      var id_company = $("#hid_id_company").val();
      var ocupation = $("#tx_ocupacion").val();
      var id = idEdit;
      var data = {
        //id_user: idEdit
        name: toCapitalize(fullname)
        ,identity_document:document
        ,ocupation:ocupation
        ,veto_status:0      
        ,last_updated_by:getCookie("vtas_id_hash"+sessionStorage.tabVisitasa)
        ,attribute1:""
        ,attribute2:""
        ,attribute3:""
        ,attribute4:""
        ,attribute5:""    
        ,list_type :2
        ,job:job
        ,is_collaborator:is_collaborator
        ,covid_test:4 //4-> pendiente 1-> aprobado , 2->realizada, 3-> vencido
        ,id_area:id_area
        //,name_area:name_area
        ,id_company:id_company
        //,name_company:toCapitalize(name_company)
        ,id_location:id_location
        //,name_location:name_location
        ,fecha:date
      }
      var url     = apiurlblacklist+"/api/Post-Blacklist-User?code="+postblacklistusercode+"&httpmethod="+option+"&id="+id;
      var headers ={
        "apikey":"r$3#23516ewew5"        
      }
      $.ajax({                    
          method: "POST",
          url:  url,
          headers:headers,
          data : JSON.stringify(data),
          crossDomain: true,
          dataType: "json",
      }).done(function( data)
      {                
        swal("Operación exitosa", "Proceso realizado con exito", "success");
        tableBlackList();
        $("#modalEditBlacklist").modal("hide");
      });


    }
  return{
      init:function(){
          init();
      },
      thumbsUp:function(id,status,name,company,img,reason,id_area,id_company,id_location,name_area,name_location,nameperson,document,job,check_in,covid_test,is_collaborator,fecha,temperature_in,temperature_out){       
        thumbsUp(id,status,name,company,img,reason,id_area,id_company,id_location,name_area,name_location,nameperson,document,job,check_in,covid_test,is_collaborator,fecha,temperature_in,temperature_out);
      },
      thumbsUp2:function(id,status,name,company,img,reason,id_area,id_company,id_location,name_area,name_location,nameperson,document,job,check_in,covid_test,is_collaborator,fecha,temperature_in,temperature_out){       
        thumbsUp2(id,status,name,company,img,reason,id_area,id_company,id_location,name_area,name_location,nameperson,document,job,check_in,covid_test,is_collaborator,fecha,temperature_in,temperature_out);
      },
      thumbsUpregisterApprover :function(){
        thumbsUpregisterApprover();
      },
      confirmApprove:function(){
        confirmApprove();
      },
      tableListTamizaje:function(){
        tableListTamizaje();
      },
      cancelarForm:function(){
	    	cancelarForm();
      },
      confirmCancelTamizaje:function(){
        confirmCancel();
      },
      validate:function(){
        validate();
      }
      ,confirmSolicitudTamizaje : function(){
        confirmSolicitudTamizaje();
      }
      ,
      confirmSolicitudTamizaje:function(){
        confirmSolicitudTamizaje();
      }
      ,
      processSolicitudTamizaje:function(){
        processSolicitudTamizaje();
      },
      confirmCancel:function(){
        confirmCancel();
      },
      confirmApproveMasive:function(){
        confirmApproveMasive();
      },
      thumbsReasignarTamizajeApprover:function(){
        thumbsReasignarTamizajeApprover();
      },
      getCupoDisponibletop:function(){
        getCupoDisponibletop();
      }
      
     
  }
}();