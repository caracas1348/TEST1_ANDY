var jsonExternalCompany = [];
var jsonLocation=[];
var jsonPersonBlaclist = [];
var jsonPersonBlaclistName = [];
var jsonHistoryTamizaje = [];
var oTableBlackList;
var oTableHistorytest;
var searchAct=0;//valida que se haya hecho busqueda
var lengList=1;
var lengListtemp=1;
var ActiveEnter=0;
var ActiveEnterTemp = 0;
var fecheTamg="";
var typeTamizajeOrign=0;
var lastattentiondate;
var imgSignatureglobal;
var imgSignatureglobalper;
var last_veto_statusg;
var statusEdit;
var list_typetemp;
var datecitetemp;
var idEdit;
var area;

var fechanow = new Date();
var anonow = fechanow.getFullYear();

//var HistoryIsShown = 0;
var vw_covid_list = function(){
 
    var init = function()
    {
      $(document).on('show.bs.modal', '.modal', function (event) {
        var zIndex = 1040 + (10 * $('.modal:visible').length);
        $(this).css('z-index', zIndex);
        setTimeout(function() {
            $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        }, 0);
      });

      $(document).on('hidden.bs.modal', '.modal', function () {
        $('.modal:visible').length && $(document.body).addClass('modal-open');
      });
      moment.locale('es');
      //cagamos todas las personas qiue están en la tabla blacklist_user
      getPersonBlackList();
      //getExternalCompany();
      //---------------------------------------
        $("#tx_access_dni").keypress(function(event) {
        	if(event.keyCode == 13){
            if($("#tx_access_dni").val()!="")
        		searchUser($("#tx_access_dni").val());
        	}
        });

        $("#tx_finded").keypress(function(event) {
         
        	if(event.keyCode == 13){
            getDocument(); 
        	}
        });

        $("#tx_date_start_1").datetimepicker({
          timepicker:false,
          format:'d/m/Y',
          minDate: 0
      });

      

    
   

        $("#tx_access_dni_list").keyup(function(event) {
          oTableBlackList.search($(this).val()).draw();
          //console.log($(this).val())
          if(event.which==13)
          {{
            ActiveEnter=1;
            tableBlackList();
          }}
          /*
          if($(this).val()=="")//limpia filtro buscado
            oTableBlackList.search('').columns().search( '' ).draw();
          */

        });

        $("#btn_buscar").click(function(){
          //alert("sss");
          tableBlackList();
        });

        

        

       /*  $("#sel_location_1").change(function(){
          var id    = $(this).attr("id");
          var array = id.split("_");
          id = array[2];
          var val = $(this).val();
          var value = val.split("-");
          getAreas(value[0],id);
          getAreas(val,id);
        }); */

        $("#responsableRequest").autocomplete({   
          change: function (event, ui) {
              if (ui.item === null) {
                  $("#responsableRequest").val("");
                  $(this).val("");
              }
          }, 
          source: function( request, response ) {
              var filter = $("#responsableRequest").val();
              ///console.log(filter);
              var param= {filter:filter};
              var headers = {"Authorization":TOKEN_CLIENT,"apiKey":"r$3#23516ewew5"}
              $.ajax({
              url: apiurlsecurity+"/api/Get-Collaborator?code="+GetCollaborator+"&httpmethod=objectlist",
              //dataType: "json",
              method:"post",
              data : JSON.stringify(param),
              processData:false,
              crossDomain: true,
              async: true,
              headers : headers,
              success: function( data ) {
                  var array =[];
                  data =  JSON.parse(data);
                  console.log(data);
                  data.value.forEach(item => {
                      var json ={}
                      json.label = item.displayName;
                      json.value = item.displayName;
                      json.mail = item.userPrincipalName;
                      json.id = item.objectId
                      array.push(json);
                  });
                  //console.log(array);
                  response(array);
              }
              });
          },
          minLength: 3,
          select: function( event, ui ) {
              $("#responsableRequestEmail").val(ui.item.mail);
              $("#responsableRequest").val(ui.item.value);
              $("#responsableRequestId").val(ui.item.id);
          },
         
        });

    

        $("#btnHabilitado").click(function(){
          $("#btnHabilitado").addClass('buttonActive');
          $("#btnVetado").removeClass('buttonActive ');
        });

        $("#btnVetado").click(function(){
          $("#btnVetado").addClass('buttonActive');
          $("#btnHabilitado").removeClass('buttonActive ');
        });

        getAreas(-1,1);
        getExternalCompany();
        getLocations();
        getMotivos();
        getDepartamentos();
        getPaises();

        $("#sel_departamento_res").change(function(){
          $("#sel_distrito_res").empty();
          getProvincias($(this).val(),$("#sel_provincia_res"));
        })
        $("#txr_sel_departamento_res").change(function(){
          $("#txr_sel_distrito_res").empty();
          getProvincias($(this).val(),$("#txr_sel_provincia_res"));
        })
        $("#selr_departamento_res_history").change(function(){
          $("#selr_distrito_res_history").empty();
          getProvincias($(this).val(),$("#selr_provincia_res_history"));
        })

        /*$("#txr_sel_departamento_res").change(function(){
          console.log($(this).val());
          getProvincias2($(this).val());
        });*/

        $("#sel_provincia_res").change(function(){
          getDistritos($("#sel_departamento_res").val(),$(this).val(),$("#sel_distrito_res"),$("#sel_distrito"));
        })
        $("#txr_sel_provincia_res").change(function(){
          getDistritos($("#txr_sel_departamento_res").val(),$(this).val(),$("#txr_sel_distrito_res"),$("#txr_sel_distrito"));
        })
        $("#selr_provincia_res_history").change(function(){
          getDistritos($("#selr_departamento_res_history").val(),$(this).val(),$("#selr_distrito_res_history"),$("#selr_distrito_history"));
        })


       

        getCollaborator($("#add_covid_firtname_1"),1); 
      
        $("#sel_company_1").change(function()
        {
          //$("#add_covid_dni_"+1).focus();
          getCollaborator($("#add_covid_firtname_1"),1); 
        });
       
       /*  $('#btn_group_status_bl .btn').on('click', function(event) {     
          var val = $(this).find('input').val();
          tableBlackList(val);      
        }); */

        $('#btn-group-habilitado-vetado .btn').on('click', function(event) {     
          var val = $(this).find('input').val();
          //alert(val);
          if(val==2){//vetado
            $("#col_observacion_vetado").show();
            $("#tx_chb_kit_covid").prop('checked', false);
            $("#div_chb_kit_covid").show();
            $("#div_day_reposo").show();
            $("#sel_day_reposo").val("7");
          }
          else{
            $("#col_observacion_vetado").hide();
            $("#tx_motivo_vetado").val("");
            $("#tx_chb_kit_covid").prop('checked', false);
            $("#div_chb_kit_covid").hide();
            $("#div_day_reposo").hide();
          }
        });

        $('#btn-group-habilitado-vetado-history .btn').on('click', function(event) {     
          var val = $(this).find('input').val();
          //alert(val);      
          if(val==2){//vetado
            $("#col_observacion_vetado_history").show();
            $("#tx_motivo_vetado_history").val("");
            $("#div_chb_kit_covid_history").show();
            $("#txr_chb_kit_covid_history").prop('checked', false);
            $("#div_day_reposo_history").show();
            $("#sel_day_reposo_history").val("7");
          }
          else{
            $("#col_observacion_vetado_history").hide();
            $("#tx_motivo_vetado_history").val("");
            $("#div_chb_kit_covid_history").hide();
            $("#txr_chb_kit_covid_history").prop('checked', false);
            $("#div_day_reposo_history").hide();
          }
        });

        $('#btn-group-habilitado-vetadotxr .btn').on('click', function(event) {     
          var val = $(this).find('input').val();
          //alert(val);      
          if(val==2){//vetado
            $("#col_observacion_vetadotxr").show();
            $("#div_chb_kit_covid_nop").show();
            $("#txr_chb_kit_covid_nop").prop('checked', false);
            $("#div_day_reposo_nop").show();
            $("#sel_day_reposo_nop").val("7");
          }
          else{
            $("#col_observacion_vetadotxr").hide();
            $("#txr_motivo_vetado").val("");
            $("#div_chb_kit_covid_nop").hide();
            $("#txr_chb_kit_covid_nop").prop('checked', false);
            $("#div_day_reposo_nop").hide();
          }
        });
        

        $('#label_status_list_4').on('click', function(event) {     
          oTableBlackList.search('Colaborador').draw(); 
        }); 
        $('#label_status_list_5').on('click', function(event) {     
          oTableBlackList.search('Contratista').draw(); 
        });
        $('#label_status_list_22').on('click', function(event) {     
          oTableBlackList.search('Vetado').draw(); 
        });
        $('#label_status_list_2').on('click', function(event) {     
          oTableBlackList.search('Habilitado').draw(); 
        });
        $('#label_status_list_1').on('click', function(event) {     
          oTableBlackList.search('Pendiente').draw(); 
        });
        $('#label_status_list_ingr').on('click', function(event) {     
          //oTableBlackList.search('(SI)').draw(); 
        });
        $('#label_status_list_3').on('click', function(event) {     
          var val = $(this).find('input').val();
          tableBlackList(val); 
        });

        var group = getCookie("vtas_type_usergroup"+sessionStorage.tabVisitasa); 
        if(group == "colaborador"){
          $("#btnValidateIn").hide();
        }
        
      $("#tx_feche_inicio").datetimepicker({
        timepicker:false,
        format:'d/m/Y',
        //minDate: 0
      });
      $("#tx_fecha_retorno").datetimepicker({
        timepicker:false,
        format:'d/m/Y',
        maxDate:new Date()
      });
      $("#txr_tx_fecha_retorno").datetimepicker({
        timepicker:false,
        format:'d/m/Y',
        maxDate:new Date()
      });
      
      $("#txr_fecha_retorno_history").datetimepicker({
        timepicker:false,
        format:'d/m/Y',
        maxDate:new Date()
      });

      $("#tx_fecha_inicio_sintomas").datetimepicker({
        timepicker:false,
        format:'d/m/Y',
        maxDate:new Date()
      });

      $("#txr_tx_fecha_inicio_sintomas").datetimepicker({
        timepicker:false,
        format:'d/m/Y',
        maxDate:new Date()
      });

      
      $("#txr_fecha_inicio_sintomas_history").datetimepicker({
        timepicker:false,
        format:'d/m/Y',
        maxDate:new Date()
      });
      $("#tx_edad" ).prop( "readonly", true );
      $("#tx_edad").datetimepicker({
        timepicker:false,
        format:'d/m/Y',
        maxDate:new Date()
      });
      $("#txr_tx_edad" ).prop( "readonly", true );
      $("#txr_tx_edad").datetimepicker({
        timepicker:false,
        format:'d/m/Y',
        maxDate:new Date()
      });
      $("#txr_edad_history" ).prop( "readonly", true );
      $("#txr_edad_history").datetimepicker({
        timepicker:false,
        format:'d/m/Y',
        maxDate:new Date()
      });

      $("#txr_fecha_tamizaje_history").prop('readonly', true);
      $("#txr_fecha_tamizaje_history").datetimepicker({
        timepicker:false,
        format:'d/m/Y',
        maxDate:new Date()
      });
      $("#tx_date_tamizaje").prop('readonly', true);
      $("#tx_date_tamizaje").datetimepicker({
        timepicker:false,
        format:'d/m/Y',
        yearEnd:anonow,
				yearStart:anonow,
        maxDate:0
      });
      $("#tx_date_tamizaje").change(function(){
        var now= moment().format("YYYYMMDD");
        var date=moment($(this).val(),'DD/MM/YYYY').format("YYYYMMDD");
        now =  parseInt(now);
        date = parseInt(date);
        //console.log(date,now);
        if(date>now){
          swal("Error!", "La fecha seleccionada no puede ser mayor que la fecha actual. Verifique", "error");
          $(this).val(moment().format("DD/MM/YYYY"));
        } 
        else if(date<20200101){//inicio de la pandemia 01/01/2020
          swal("Error!", "La fecha seleccionada no puede ser menor que 01/01/2020. Verifique", "error");
          $(this).val(moment().format("DD/MM/YYYY"));
        }
      });


      $("#txr_fecha_tamizaje_history").change(function(){
        var now= moment().format("YYYYMMDD");
        var date=moment($(this).val(),'DD/MM/YYYY').format("YYYYMMDD");
        now =  parseInt(now);
        date = parseInt(date);
        //console.log(date,now);
        if(date>now){
          swal("Error!", "La fecha seleccionada no puede ser mayor que la fecha actual. Verifique", "error");
          $(this).val(moment().format("DD/MM/YYYY"));
        } 
        else if(date<20200101){//inicio de la pandemia 01/01/2020
          swal("Error!", "La fecha seleccionada no puede ser menor que 01/01/2020. Verifique", "error");
          $(this).val(moment().format("DD/MM/YYYY"));
        }
      });

      $("#tx_date_tamizajenop").prop('readonly', true);
      $("#tx_date_tamizajenop").datetimepicker({
        timepicker:false,
        format:'d/m/Y',
        yearEnd:anonow,
				yearStart:anonow,
        maxDate:0
      });

      $("#tx_date_tamizajenop").change(function(){
        var now= moment().format("YYYYMMDD");
        var date=moment($(this).val(),'DD/MM/YYYY').format("YYYYMMDD");
        now =  parseInt(now);
        date = parseInt(date);
        //console.log(date,now);
        if(date>now){
          swal("Error!", "La fecha seleccionada no puede ser mayor que la fecha actual. Verifique", "error");
          $(this).val(moment().format("DD/MM/YYYY"));
        } 
        else if(date<20200101){//inicio de la pandemia 01/01/2020
          swal("Error!", "La fecha seleccionada no puede ser menor que 01/01/2020. Verifique", "error");
          $(this).val(moment().format("DD/MM/YYYY"));
        }
      })
      
      
     
      $("#tx_date_tamizajenop").val(moment().format("DD/MM/YYYY"));

      $("#tx_date_vetos").datetimepicker({
        timepicker:false,
        format:'d/m/Y',
        minDate: 0
      }); 
      
      /*var nowdate = moment().format("DD/MM/YYYY");
      $('#tx_date_init').val(nowdate);*/
      $('#tx_date_init').datetimepicker({       
        format:'d/m/Y',
        onShow:function( ct ){          
          this.setOptions({
          maxDate:moment($('#tx_date_end').val(),'DD/MM/YYYY').format("YYYY-MM-DD")?moment($('#tx_date_end').val(),'DD/MM/YYYY').format("YYYY-MM-DD"):false
         })
        },
        timepicker:false
       });

       
      // $('#tx_date_end').val(nowdate);
       $('#tx_date_end').datetimepicker({
        format:'d/m/Y',
        onShow:function( ct ){
          //console.log(moment($('#tx_date_init').val(),'DD/MM/YYYY').format("YYYY-MM-DD"), $('#tx_date_init').val());
          this.setOptions({
          minDate:moment($('#tx_date_init').val(),'DD/MM/YYYY').format("YYYY-MM-DD")?moment($('#tx_date_init').val(),'DD/MM/YYYY').format("YYYY-MM-DD"):false
         })
        },
        timepicker:false
       });

      
      
      $('#tx_date_vencimiento_init').val(moment().format("DD/MM/YYYY"));
      $('#tx_date_vencimiento_init').datetimepicker({       
        format:'d/m/Y',
        onShow:function( ct ){          
          this.setOptions({
          maxDate:moment($('#tx_date_vencimiento_end').val(),'DD/MM/YYYY').format("YYYY-MM-DD")?moment($('#tx_date_vencimiento_end').val(),'DD/MM/YYYY').format("YYYY-MM-DD"):false
         })
        },
        timepicker:false
      });
       
      $('#tx_date_vencimiento_end').val(moment().format("DD/MM/YYYY"));
      $('#tx_date_vencimiento_end').datetimepicker({
        format:'d/m/Y',
        onShow:function( ct ){
          //console.log(moment($('#tx_date_init').val(),'DD/MM/YYYY').format("YYYY-MM-DD"), $('#tx_date_init').val());
          this.setOptions({
            minDate:moment($('#tx_date_vencimiento_init').val(),'DD/MM/YYYY').format("YYYY-MM-DD")?moment($('#tx_date_vencimiento_init').val(),'DD/MM/YYYY').format("YYYY-MM-DD"):false
          })
        },
        timepicker:false
      });
       
       
      
    
     $("#txr_docum").blur(function(){
      $("#notificationVetoPErson_np").hide();
      var riesgo=covid_checkRiskList($("#txr_docum").val());
      if(riesgo.length>0)
      {
        console.log("En lista de riesgo");
        $("#modalViewBlackCovidTest").modal("hide");
        $("#modalRegisterCovidTestNewForm").modal("hide");
        $("#modalRegisterBlackCovidTest").modal("hide");

       /*  setTimeout(function(){
          $("#modalnotifRiesgo").modal('show');
        },500) */
       
      }
      var is_collaborator = $("#txr_tx_empleador").val();
      $("#hid_id_area_sap_nop").val("0");
      $("#hid_name_area_sap_nop").val("");
      $("#hid_id_location_sap_nop").val("0");
      $("#hid_name_location_sap_nop").val("");
      $("#hid_user_company_type_nop").val("");      
      if(is_collaborator=="colaborador"){
        var reqJson = getDataCollaboratorDni($(this).val());
       if(reqJson.value.length>0){   
         //alert(reqJson.value[0].userCompanyType);
        $("#hid_user_company_type_nop").val(reqJson.value[0].userCompanyType);
         if(reqJson.value[0].userCompanyType=="EMPLEADOS"){
          $("#hid_name_area_sap_nop").val(reqJson.value[0].department);          
          $("#hid_id_area_sap_nop").val(reqJson.value[0].userAreaFuncCode); 
         }
         else{
          $("#hid_name_area_sap_nop").val(reqJson.value[0].userUODescription);
          $("#hid_id_area_sap_nop").val(reqJson.value[0].userUOCode);
         }        
        //$("#hid_name_area_sap_nop").val("");
        $("#hid_id_location_sap_nop").val(reqJson.value[0].plantCode);
        $("#hid_name_location_sap_nop").val(reqJson.value[0].plantDescription);
       }
      } 
    });
        
        $("#add_covid_dni_1").blur(function(){
          var dni = $(this).val();

          if(dni.trim().length>0){
            if($("#sel_type_contact_1").val()=="colaborador")
              getCollaboratorDni(dni,1,"add_covid_firtname_1");

            checkOis(dni,1,$("#sel_type_contact_1").val());
          }
          
            
            
            //alert(vetado)
         // }
        });
      
       

      $("#sel_type_contact_1").change(function(){
        getCollaborator($("#add_covid_firtname_1"),1); 
        clearRow(1); 
        var value = $(this).val();
        $("#ruc_company_1")[0].disabled=false;
        $("#sel_company_1")[0].disabled=false;
        $("#sel_company_1")[0].className="form-control autocompletecollaborator";
        $("#ruc_company_1")[0].className="form-control autocompletecollaborator";
        if(value=='colaborador'){
          $("#ruc_company_1").val('20100971772');
          $("#sel_company_1").val('Tasa');
          $("#ruc_company_1")[0].disabled=true;
          $("#sel_company_1")[0].disabled=true;
          $("#sel_company_1")[0].className="form-control autocompletecollaborator bg-white";
          $("#ruc_company_1")[0].className="form-control autocompletecollaborator bg-white";
          
        }
      }); 

       

      $("#bt_delete_row_covid_1").click(function()
      {
        var id  = 'row_covid_1';
        var obj = $("#"+id);
        removeRowCovid(obj);
        $("#cant_row_persona").html($("#list_participantes").find("div.bd-callout").length);
      });

      

      $('#modalEditBlacklist').on('shown.bs.modal', function (e) {        
        var dni   = $("#tx_docum").val();
        var name  = $("#tx_nomape").val();
        verifiqueBlacklisOis(dni,name);
      });
      
      $("#sel_location_1").change(function(){
        var date = $("#tx_date_start_1").val();
        var sede = $(this).val();
        var objmessage = $("#small_message_1");
        getCupoDisponible(date,sede,objmessage);
      });

      $("#tx_date_start_1").change(function(){
        var date = $(this).val();
        var sede = $("#sel_location_1").val();
        var objmessage = $("#small_message_1");
        getCupoDisponible(date,sede,objmessage);
      });
       getReagentTypes();

      $("#div_contacto_persona").hide();
      $('input:radio[name=rb_contacto_persona]').click(function(){
        verificarConclusion();
        var val = $(this).val();

        if(val=='si')
          $("#div_contacto_persona").show();
        else{
          $("#div_contacto_persona").hide();
          $("#chb_entorno_familiar").prop("checked",false);
          $("#chb_entorno_laboral").prop("checked",false);
          $("#chb_entorno_salud").prop("checked",false);          
        }
      });

      $(".div_fuera_pais").hide();
      $('input:radio[name=rb_fuera_pais]').click(function(){
        verificarConclusion();
        var val = $(this).val();
        console.log(val);
        if(val=='si')
          $(".div_fuera_pais").show();
        else{
          $(".div_fuera_pais").hide();
          $("#tx_fecha_retorno").val("");
          $("#sel_pais_retorto").val("0").trigger("change");
          
        }
      });

      $(".div_distrito").hide();
      $('input:radio[name=rb_distrito]').click(function(){
        verificarConclusion();
        var val = $(this).val();
        if(val=='si')
          $(".div_distrito").show();
        else{
          $(".div_distrito").hide();
          $("#sel_distrito").val("0").trigger("change");
        }
      });

      $('#modalRegisterCovidTestNewForm').on('hidden.bs.modal', function (e) {
        // do something...
        $("#divfielExtensionReposo").hide();
        $("#sel_extension_reposo").val("0");
      });
      $('#modalRegisterBlackCovidTest').on('hidden.bs.modal', function (e) {
        // do something...
        $("#txr_divfielExtensionReposo").hide();
        $("#txr_sel_extension_reposo").val("0");
      });
      $('#modalViewBlackCovidTest').on('hidden.bs.modal', function (e) {
        // do something...
        $("#divfielExtensionReposoHistory").hide();
        $("#sel_extension_reposo_history").val("0");
      });
      
      ////------------------------------------------------------
      $('#chb_fiebre').click(function(){
        verificarConclusion();
        verificarFicha();
      }); 
      $('#chb_tos_seca').click(function(){
        verificarConclusion();
      });
      $('#chb_dificulta_respirar').click(function(){
        verificarConclusion();
      });  
      $('#chb_dolor_garganta').click(function(){
        verificarConclusion();
      });  
      $('#chb_congecion_nasal').click(function(){
        verificarConclusion();
      }); 
      $('#chb_fatiga').click(function(){
        verificarConclusion();
      }); 
      $('#chb_escalofrio').click(function(){
        verificarConclusion();
      });     
      $('#chb_nauseas_vomito').click(function(){
        verificarConclusion();
      }); 
      $('#chb_diarrea').click(function(){
        verificarConclusion();
      }); 
      $('#chb_dolor_cabeza').click(function(){
        verificarConclusion();
      });
      $('#chb_dolor_musculo').click(function(){
        verificarConclusion();
      }); 
      $('#chb_examen_fisico').click(function(){
        verificarConclusion();        
        if($(this).is(":checked")){
          $("#div_input_examen_fisico").show();
        }
        else
          $("#div_input_examen_fisico").hide();               
      }); 

      $('#chb_otros').click(function(){
        verificarConclusion();        
        if($(this).is(":checked")){
          $("#div_input_otros").show();
        }
        else
          $("#div_input_otros").hide();               
      }); 

      

      
      //----------------------------------------------------------
      $('input:radio[name=rb_contacto_persona]').click(function(){
        verificarConclusion();
      }); 
      
      $('#chb_entorno_familiar').click(function(){
        verificarConclusion();
      }); 
      $('#chb_entorno_laboral').click(function(){
        verificarConclusion();
      }); 
      $('#sel_covidotrosmotivos').click(function(){
        verificarConclusion();
      }); 
      $("#sel_covidotrosmotivos_history").change(function(){
        verificarConclusionHistory();
      }); 
      $("#sel_covidotrosmotivosnp").change(function(){
        verificarConclusionNoProgramado();
      });
      $('#chb_entorno_salud').click(function(){
        verificarConclusion();
      }); 

      $('input:radio[name=rb_distrito]').click(function(){
        verificarConclusion();
      }); 
      
      $("#selr_statusFic_history").change(function(){
        verificarConclusionHistory();
        var testFast = $("#selr_statusrap_history").val(); 
        var testMolecular = $("#selr_statusmolec_history").val(); 
        if($(this).val()=="1" || testFast =="1" || testMolecular=="1" ){          
          $("#divLugarContagioHistorial").show();
        }
        else{
          $("#divLugarContagioHistorial").hide();
        }
      });
      $("#selr_status").change(function(){
        verificarConclusionNoProgramado();

        var testFast = $("#selr_statusrap").val(); 
        var testMolecular = $("#selr_statusmolec").val(); 
        if($(this).val()=="1" || testFast =="1" || testMolecular=="1" ){          
          $("#divLugarContagioNp").show();
        }
        else{
          $("#divLugarContagioNp").hide();
        }

      });
      $("#sel_statusFic").change(function(){
        verificarConclusion();
        var testFast = $("#sel_statusrap").val(); 
        var testMolecular = $("#sel_statusmolec").val(); 
        if($(this).val()=="1" || testFast =="1" || testMolecular=="1" ){          
          $("#divLugarContagio").show();
        }
        else{
          $("#divLugarContagio").hide();
        }
      });
      $("#sel_extend_reposo").change(function(){
        verificarConclusion();
      });

      $("#tx_date_start_1").change(function(){
        var date = $(this).val();
        var sede = $("#sel_location_1").val();
        var objmessage = $("#small_message_1");
        getCupoDisponible(date,sede,objmessage);
      });

            
      //var tipoTrabajo         = $('#sel_tipo_trabajo').val();
      //----------------------------------------------------------
      //----------------------------------------------------------
      //factores de riesgos
      $('#chb_obesidad').click(function(){
        verificarConclusion();
        verificarFicha();
      }); 
      $('#chb_enfermedad_pulmunar').click(function(){
        verificarConclusion();
        verificarFicha();
      }); 
      $('#chb_diabete').click(function(){
        verificarConclusion();
        verificarFicha();
      }); 
      $('#chb_impertension').click(function(){
        verificarConclusion();
        verificarFicha();
      }); 
      $('#chb_mayor_60_ano').click(function(){
        verificarConclusion();
        verificarFicha();
      }); 
      $('#chb_gestante').click(function(){
        verificarConclusion();
        verificarFicha();
      });      
      $('#chb_adulto_mayor').click(function(){
        verificarConclusion();
        verificarFicha();
      }); 
      $('#chb_nino').click(function(){
        verificarConclusion();
        verificarFicha();
      }); 
      $('#chb_gestante_2').click(function(){
        verificarConclusion();
        verificarFicha();
      }); 
      $('#chb_familiar_enfermedad_cronica').click(function(){
        verificarConclusion();
        verificarFicha();
      });       
      //------------------------------------------------

      //------------------------------------------------
      $('#txr_chb_fiebre').click(function(){
        verificarFichaNoProgramado();
        verificarConclusionNoProgramado();        
      }); 
      $('#txr_chb_tos_seca').click(function(){        
        verificarFichaNoProgramado();
        verificarConclusionNoProgramado();
      });  
      $('#txr_chb_dificulta_respirar').click(function(){
        verificarFichaNoProgramado();
        verificarConclusionNoProgramado();
        
      });  
      $('#txr_chb_dolor_garganta').click(function(){
        verificarFichaNoProgramado();
        verificarConclusionNoProgramado();
        
      });  
      $('#txr_chb_congecion_nasal').click(function(){
        verificarFichaNoProgramado();
        verificarConclusionNoProgramado();
        
      }); 
      $('#txr_chb_fatiga').click(function(){
        verificarFichaNoProgramado();
        verificarConclusionNoProgramado();
        
      }); 
      $('#txr_chb_escalofrio').click(function(){
        verificarFichaNoProgramado();
        verificarConclusionNoProgramado();
        
      });     
      $('#txr_chb_nauseas_vomito').click(function(){
        verificarFichaNoProgramado();
        verificarConclusionNoProgramado();
        
      }); 
      $('#txr_chb_diarrea').click(function(){
        verificarFichaNoProgramado();
        verificarConclusionNoProgramado();
        
      }); 
      $('#txr_chb_dolor_cabeza').click(function(){
        verificarFichaNoProgramado();
        verificarConclusionNoProgramado();
        
      });
      $('#txr_chb_dolor_musculo').click(function(){
        verificarFichaNoProgramado();
        verificarConclusionNoProgramado();
        
      }); 

      $('#txr_chb_examen_fisico').click(function(){
        verificarFichaNoProgramado();        
        if($(this).is(":checked")){
          $("#txr_div_input_examen_fisico").show();
        }
        else
          $("#txr_div_input_examen_fisico").hide();               
      }); 

      $('#txr_chb_otros').click(function(){
        verificarFichaNoProgramado();        
        if($(this).is(":checked")){
          $("#txr_div_input_otros").show();
        }
        else
          $("#txr_div_input_otros").hide();               
      }); 

      //----------------------------------------------------------
      $('input:radio[name=txr_rb_contacto_persona]').click(function(){
        verificarConclusionNoProgramado();
      }); 
      $('#txr_chb_entorno_familiar').click(function(){
        verificarConclusionNoProgramado();
      }); 
      $('#txr_chb_entorno_laboral').click(function(){
        verificarConclusionNoProgramado();
      }); 
      $('#txr_chb_entorno_salud').click(function(){
        verificarConclusionNoProgramado();
      });       
    
      $('input:radio[name=txr_rb_distrito]').click(function(){
        verificarConclusionNoProgramado();
      });     
      //factores de riesgos
      $('#txr_chb_obesidad').click(function(){
        verificarConclusionNoProgramado();
      }); 
      $('#txr_chb_enfermedad_pulmunar').click(function(){
        verificarConclusionNoProgramado();
      }); 
      $('#txr_chb_diabete').click(function(){
        verificarConclusionNoProgramado();
      }); 
      $('#txr_chb_impertension').click(function(){
        verificarConclusionNoProgramado();
      }); 
      $('#txr_chb_mayor_60_ano').click(function(){
        verificarConclusionNoProgramado();
      }); 
      $('#txr_chb_gestante').click(function(){
        verificarConclusionNoProgramado();
      }); 
    
      $('#txr_chb_adulto_mayor').click(function(){
        verificarConclusionNoProgramado();
      }); 
      $('#txr_chb_nino').click(function(){
        verificarConclusionNoProgramado();
      }); 
      $('#txr_chb_gestante_2').click(function(){
        verificarConclusionNoProgramado();
      }); 
      $('#txr_chb_familiar_enfermedad_cronica').click(function(){
        verificarConclusionNoProgramado();
      }); 

      $("#div_contacto_persona_noprogramado").hide();
      $('input:radio[name=txr_rb_contacto_persona]').click(function(){
        verificarConclusionNoProgramado();
        var val = $(this).val();
        console.log(val);
        if(val=='si')
          $("#div_contacto_persona_noprogramado").show();
        else{
          $("#div_contacto_persona_noprogramado").hide();
          $("#chb_entorno_familiar").prop("checked",false);
          $("#chb_entorno_laboral").prop("checked",false);
          $("#chb_entorno_salud").prop("checked",false); 
        }
      });

      $(".txr_div_distrito").hide();
      $('input:radio[name=txr_rb_distrito]').click(function(){
        verificarConclusionNoProgramado();
        var val = $(this).val();
        if(val=='si')
          $(".txr_div_distrito").show();
        else{
          $(".txr_div_distrito").hide();
          $("#txr_sel_distrito").val("0").trigger("change");
        }
      });

      $(".txr_div_fuera_pais").hide();
      $('input:radio[name=txr_rb_fuera_pais]').click(function(){
        verificarConclusionNoProgramado();
        var val = $(this).val();
        console.log(val);
        if(val=='si')
          $(".txr_div_fuera_pais").show();
        else{
          $(".txr_div_fuera_pais").hide();
          $("#txr_tx_fecha_retorno").val("");
          $("#txr_sel_pais_retorto").val("0").trigger("change");          
        }
      });
      //-----------------------------------------------------------------------------------
                        //history
      //------------------------------------------------------------------------------------
      $("#div_contacto_persona_history").hide();
      $('input:radio[name=rb_contacto_persona_history]').click(function(){
        verificarConclusionHistory();
        var val = $(this).val();
        console.log(val);
        if(val=='si')
          $("#div_contacto_persona_history").show();
        else{
          $("#div_contacto_persona_history").hide();
          $("#chbr_entorno_familiar_history").prop("checked",false);
          $("#chbr_entorno_laboral_history").prop("checked",false);
          $("#chbr_entorno_salud_history").prop("checked",false);          
        }
      });

      $(".div_fuera_pais_history").hide();
      $('input:radio[name=rb_fuera_pais_history]').click(function(){
        verificarConclusionHistory();
        var val = $(this).val();
        console.log(val);
        if(val=='si')
          $(".div_fuera_pais_history").show();
        else{
          $(".div_fuera_pais_history").hide();
          $("#txr_fecha_retorno_history").val("");
          $("#selr_pais_retorto_history").val("0").trigger("change");
          
        }
      });

      $(".div_distrito_history").hide();
      $('input:radio[name=rb_distrito_history]').click(function(){
        verificarConclusionHistory();
        var val = $(this).val();
        if(val=='si')
          $(".div_distrito_history").show();
        else{
          $(".div_distrito_history").hide();
          $("#selr_distrito_history").val("0").trigger("change");
        }
      });


      
      ////------------------------------------------------------
      $('#chbr_fiebre_history').click(function(){ 
        verificarFichaHistory();      
        verificarConclusionHistory();
      }); 
      $('#chbr_tos_seca_history').click(function(){
        verificarFichaHistory();
        verificarConclusionHistory();
      });
      $('#chbr_dificulta_respirar_history').click(function(){
        verificarFichaHistory();
        verificarConclusionHistory();

      });  
      $('#chbr_dolor_garganta_history').click(function(){
        verificarFichaHistory();
        verificarConclusionHistory();
      });  
      $('#chbr_congecion_nasal_history').click(function(){
        verificarFichaHistory();
        verificarConclusionHistory();
      }); 
      $('#chbr_fatiga_history').click(function(){
        verificarFichaHistory();
        verificarConclusionHistory();
      }); 
      $('#chbr_escalofrio_history').click(function(){
        verificarFichaHistory();
        verificarConclusionHistory();
      });     
      $('#chbr_nauseas_vomito_history').click(function(){
        verificarFichaHistory();
        verificarConclusionHistory();
      }); 
      $('#chbr_diarrea_history').click(function(){
        verificarFichaHistory();
        verificarConclusionHistory();
      }); 
      $('#chbr_dolor_cabeza_history').click(function(){
        verificarFichaHistory();
        verificarConclusionHistory();
      });
      $('#chbr_dolor_musculo_history').click(function(){
        verificarFichaHistory();
        verificarConclusionHistory();
      }); 
      //----------------------------------------------------------
      $('input:radio[name=rb_contacto_persona_history]').click(function(){
        verificarConclusionHistory();
      }); 
      
      $('#chbr_entorno_familiar_history').click(function(){
        verificarConclusionHistory();
      }); 
      $('#chbr_entorno_laboral_history').click(function(){
        verificarConclusionHistory();
      }); 
      $('#chbr_entorno_salud_history').click(function(){
        verificarConclusionHistory();
      });      
      
      
      $('#chb_examen_fisico_history').click(function(){
        //alert("ddddd");
        verificarConclusionHistory();        
        if($(this).is(":checked")){
          $("#div_input_examen_fisico_historial").show();
        }
        else
          $("#div_input_examen_fisico_historial").hide();               
      }); 

      $('#chb_otros_history').click(function(){
        verificarConclusionHistory();        
        if($(this).is(":checked")){
          $("#div_input_otros_history").show();
        }
        else
          $("#div_input_otros_history").hide();               
      }); 
      //----------------------------------------------------------      
      //----------------------------------------------------------
      //----------------------------------------------------------
      $('input:radio[name=rb_distrito_history]').click(function(){
        verificarConclusionHistory();
      }); 


      
      
      //var tipoTrabajo         = $('#sel_tipo_trabajo').val();
      //----------------------------------------------------------
      //----------------------------------------------------------
      //factores de riesgos
      $('#chbr_obesidad_history').click(function(){
        verificarConclusionHistory();
      }); 
      $('#chbr_enfermedad_pulmunar_history').click(function(){
        verificarConclusionHistory();
      }); 
      $('#chbr_diabete_history').click(function(){
        verificarConclusionHistory();
      }); 
      $('#chbr_impertension_history').click(function(){
        verificarConclusionHistory();
      }); 
      $('#chbr_mayor_60_ano_history').click(function(){
        verificarConclusionHistory();
      }); 
      $('#chbr_gestante_history').click(function(){
        verificarConclusionHistory();
      });      
      $('#chbr_adulto_mayor_history').click(function(){
        verificarConclusionHistory();
      }); 
      $('#chbr_nino_history').click(function(){
        verificarConclusionHistory();
      }); 
      $('#chbr_gestante_2_history').click(function(){
        verificarConclusionHistory();
      }); 
      $('#chbr_familiar_enfermedad_cronica_history').click(function(){
        verificarConclusionHistory();
      });       
      //------------------------------------------------
      $('#modalRegisterCovidTestNewForm').on('shown.bs.modal', function () {
        $("#tx_date_tamizaje").val(moment().format("DD/MM/YYYY"));
       
      });
      $('#modalSelectDateAltaMedica').on('hidden.bs.modal', function () {
        var now = moment().format("DD/MM/YYYY");
        //$('#tx_date_init_pdf').val(now);
        //$('#tx_date_end_pdf').val(now);
      });

      $('#modalSelectDateAltaMedica').on('shown.bs.modal', function () {
        var now = moment().format("DD/MM/YYYY");
        $('#tx_date_init_pdf').val(now);
        $('#tx_date_end_pdf').val(now);
        $('#tx_date_init_pdf').datetimepicker({       
          format:'d/m/Y',
          onShow:function( ct ){
            setTimeout(function(){
              //$('.ui-datepicker').css('z-index', 99999999999999);
              $(this).dialog("widget").css({
                "position": "relative",
                "z-index": 99999999999999
              });
            }, 100);          
            this.setOptions({
            maxDate:moment($('#tx_date_end_pdf').val(),'DD/MM/YYYY').format("YYYY-MM-DD")?moment($('#tx_date_end_pdf').val(),'DD/MM/YYYY').format("YYYY-MM-DD"):false
           })
          },
          timepicker:false
         });
         // $('#tx_date_end').val(nowdate);
         $('#tx_date_end_pdf').datetimepicker({
          format:'d/m/Y',          
          onShow:function( ct ){          
            setTimeout(function(){              
              ///$('.ui-datepicker').css('z-index', 9999999999999999);
              $(this).dialog("widget").css({
                "position": "relative",
                "z-index": 99999999999999
            });
            }, 100);
            //console.log(moment($('#tx_date_init').val(),'DD/MM/YYYY').format("YYYY-MM-DD"), $('#tx_date_init').val());
            this.setOptions({
            minDate:moment($('#tx_date_init_pdf').val(),'DD/MM/YYYY').format("YYYY-MM-DD")?moment($('#tx_date_init_pdf').val(),'DD/MM/YYYY').format("YYYY-MM-DD"):false
           })
          },
          timepicker:false
         });         
      });

      
    }

    var initTemp = function(){  

      $("#tx_access_dni_list_temp").keyup(function(event) {
        oTableMyRequestTemp.search($(this).val()).draw();       
        if(event.which==13)
        {{
          ActiveEnterTemp=1;
          tableMyRequestTemp();
        }}       
      });

      getPersonBlackList();
      $("#tx_date_starttemp_1").datetimepicker({
        timepicker:false,
        format:'d/m/Y',
        minDate: 0
      });

      getCollaboratortemp($("#add_covid_firtnametemp_1"),1);
      $("#sel_companytemp_1").change(function()
        {
          //$("#add_covid_dni_"+1).focus();
          getCollaboratortemp($("#add_covid_firtnametemp_1"),1); 
        });

      $("#add_covid_dnitemp_1").blur(function(){
        
          var dni = $(this).val();
          if(dni.trim().length>0){
            if($("#sel_type_contacttemp_1").val()=="colaborador")
              getCollaboratorDni(dni,1,"add_covid_firtnametemp_1");
            checkOisTemp(dni,1,$("#sel_type_contacttemp_1").val());
          }
            
        });
      
      $("#sel_type_contacttemp_1").change(function(){
        getCollaboratortemp($("#add_covid_firtnametemp_1"),1); 
        clearRowtemp(1); 
        var value = $(this).val();
        $("#ruc_companytemp_1")[0].disabled=false;
        $("#sel_companytemp_1")[0].disabled=false;
        $("#sel_companytemp_1")[0].className="form-control autocompletecollaborator";
        $("#ruc_companytemp_1")[0].className="form-control autocompletecollaborator";
        if(value=='colaborador'){
          $("#ruc_companytemp_1").val('20100971772');
          $("#sel_companytemp_1").val('Tasa');
          $("#ruc_companytemp_1")[0].disabled=true;
          $("#sel_companytemp_1")[0].disabled=true;
          $("#sel_companytemp_1")[0].className="form-control autocompletecollaborator bg-white";
          $("#ruc_companytemp_1")[0].className="form-control autocompletecollaborator bg-white";
          
        }
      });

      $("#bt_delete_row_covidtemp_1").click(function()
      {
        var id  = 'row_covidtemp_1';
        var obj = $("#"+id);
        removeRowCovid(obj);
        $("#cant_row_personatemp").html($("#list_participantestemp").find("div.bd-callout").length);
      });

      $('#tx_date_end').datetimepicker({
        format:'d/m/Y',
        onShow:function( ct ){
          //console.log(moment($('#tx_date_init').val(),'DD/MM/YYYY').format("YYYY-MM-DD"), $('#tx_date_init').val());
          this.setOptions({
          minDate:moment($('#tx_date_init').val(),'DD/MM/YYYY').format("YYYY-MM-DD")?moment($('#tx_date_init').val(),'DD/MM/YYYY').format("YYYY-MM-DD"):false
         })
        },
        timepicker:false
       });

      $('#tx_date_init').datetimepicker({       
        format:'d/m/Y',
        onShow:function( ct ){          
          this.setOptions({
          maxDate:moment($('#tx_date_end').val(),'DD/MM/YYYY').format("YYYY-MM-DD")?moment($('#tx_date_end').val(),'DD/MM/YYYY').format("YYYY-MM-DD"):false
         })
        },
        timepicker:false
       });

       getAreas(-1,1);
       getExternalCompany();
       getLocations();


       $("#responsableRequest").autocomplete({   
        change: function (event, ui) {
            if (ui.item === null) {
                $("#responsableRequest").val("");
                $(this).val("");
            }
        }, 
        source: function( request, response ) {
            var filter = $("#responsableRequest").val();
            ///console.log(filter);
            var param= {filter:filter};
            var headers = {"Authorization":TOKEN_CLIENT,"apiKey":"r$3#23516ewew5"}
            $.ajax({
            url: apiurlsecurity+"/api/Get-Collaborator?code="+GetCollaborator+"&httpmethod=objectlist",
            //dataType: "json",
            method:"post",
            data : JSON.stringify(param),
            processData:false,
            crossDomain: true,
            async: true,
            headers : headers,
            success: function( data ) {
                var array =[];
                data =  JSON.parse(data);
                
                data.value.forEach(item => {
                    var json ={}
                    json.label = item.displayName;
                    json.value = item.displayName;
                    json.mail = item.userPrincipalName;
                    json.id = item.objectId
                    array.push(json);
                });
                //console.log(array);
                response(array);
            }
            });
        },
        minLength: 3,
        select: function( event, ui ) {
            $("#responsableRequestEmail").val(ui.item.mail);
            $("#responsableRequest").val(ui.item.value);
            $("#responsableRequestId").val(ui.item.id);
        },
       
      });
    }
    var getMotivos = function(){
      /*
      var url = apiurlaccessrequest+"/api/Get-Motivo?code="+GetMotivo+"&httpmethod=objectlist";              
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

          data.map(function(item){
              $("#sel_motivo").append("<option value='"+item.cod+"''>"+item.descripcion+"</option>");
          });

      });*/
    }
    
    var getSignature = function(id){
      showLoading();
      var url = apiurlblacklist+"/api/Get-Blacklist-User?httpmethod=getsignpicture&code="+getblacklistusercode+"&identity_document="+$("#tx_docum").val()             
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
         hideLoading();
         if(data.sign_picture)
         {
          $("#"+id).attr("src",data.sign_picture);
          imgSignatureglobal=new Image();
          imgSignatureglobal.src = data.sign_picture;
         }
         else{
          $("#"+id).attr("src","images/signvoid.png");
          imgSignatureglobal=new Image();
          imgSignatureglobal.src = "images/signvoid.png";
         }

      });
    }
    var getSignaturenp = function(id){
      showLoading();
      var url = apiurlblacklist+"/api/Get-Blacklist-User?httpmethod=getsignpicture&code="+getblacklistusercode+"&identity_document="+$("#txr_docum").val()             
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
         hideLoading();
         if(data.sign_picture)
         {
          $("#"+id).attr("src",data.sign_picture);
          imgSignatureglobal=new Image();
          imgSignatureglobal.src = data.sign_picture;
         }
         else{
          $("#"+id).attr("src","images/signvoid.png");
          imgSignatureglobal=new Image();
          imgSignatureglobal.src = "images/signvoid.png";
         }

      });
    }
    var getSignaturePerson = function(id){
      showLoading();
      var url = apiurlblacklist+"/api/Get-Blacklist-User?httpmethod=getsignpictureperson&code="+getblacklistusercode+"&person_id="+getCookie('vtas_person_id'+sessionStorage.tabVisitasa)             
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
          
         hideLoading();
         if(data.sign_picture)
         {
         // $("#"+id).attr("src",data.sign_picture);
          imgSignatureglobalper=new Image();
          imgSignatureglobalper.src = data.sign_picture;
         }
         else{
          //$("#"+id).attr("src","");
          imgSignatureglobalper=new Image();
          imgSignatureglobalper.src = "images/signvoid.png";
         }

      });
    }
    var getPaises = function(){
      var url = apiurlaccessrequest+"/api/Get-Ubigeo?code="+GetUbigeo+"&httpmethod=getPaises";              
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
          $("#sel_pais_retorto").append("<option value='0'>Seleccionar</option>");
          $("#txr_sel_pais_retorto").append("<option value='0'>Seleccionar</option>");
          $("#selr_pais_retorto_history").append("<option value='0'>Seleccionar</option>");
          data.map(function(item){
              $("#sel_pais_retorto").append("<option value='"+item.cod+"''>"+item.descripcion+"</option>");
              $("#txr_sel_pais_retorto").append("<option value='"+item.cod+"''>"+item.descripcion+"</option>");
              $("#selr_pais_retorto_history").append("<option value='"+item.cod+"''>"+item.descripcion+"</option>");
          });

      });
    }

    var getDepartamentos = function(){
      var url = apiurlaccessrequest+"/api/Get-Ubigeo?code="+GetUbigeo+"&httpmethod=getDepartamentos";              
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
          $("#sel_departamento_res").append("<option value='0'>Seleccionar</option>");
          $("#txr_sel_departamento_res").append("<option value='0'>Seleccionar</option>");
          $("#selr_departamento_res_history").append("<option value='0'>Seleccionar</option>");
          
          data.map(function(item){
              $("#sel_departamento_res").append("<option value='"+item.cod+"''>"+item.descripcion+"</option>");
              $("#txr_sel_departamento_res").append("<option value='"+item.cod+"''>"+item.descripcion+"</option>");
              $("#selr_departamento_res_history").append("<option value='"+item.cod+"''>"+item.descripcion+"</option>");
          });

      });
    }

    var getProvincias = function(cod_departamento,obj,val){
      obj.empty();
      
      var url = apiurlaccessrequest+"/api/Get-Ubigeo?code="+GetUbigeo+"&httpmethod=getProvincias&cod_departamento="+cod_departamento;              
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
          obj.append("<option value='0'>Seleccionar</option>");
          data.map(function(item){
              obj.append("<option value='"+item.cod+"''>"+item.descripcion+"</option>");
          });

          if (val!=null) {
            obj.val(val)
          }

      });
    }

    var getProvincias2 = function(cod_departamento){
      $("#txr_sel_provincia_res").empty();
      $("#txr_sel_distrito_res").empty();
      var url = apiurlaccessrequest+"/api/Get-Ubigeo?code="+GetUbigeo+"&httpmethod=getProvincias&cod_departamento="+cod_departamento;              
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
          $("#txr_sel_provincia_res").append("<option value='0'>Seleccionar</option>");
          data.map(function(item){
              $("#txr_sel_provincia_res").append("<option value='"+item.cod+"''>"+item.descripcion+"</option>");
          });

      });
    }

    var getDistritos = function(cod_departamento,cod_provincia,obj,obj2,val,val2){
      obj.empty();
      obj2.empty();

      var url = apiurlaccessrequest+"/api/Get-Ubigeo?code="+GetUbigeo+"&httpmethod=getDistritos&cod_departamento="+cod_departamento+"&cod_provincia="+cod_provincia;              
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
        $("#txr_sel_distrito_res").append("<option value='0'>Seleccionar</option>");
        $("#txr_sel_distrito").append("<option value='0'>Seleccionar</option>");
        $("#sel_distrito_res").append("<option value='0'>Seleccionar</option>");
        $("#sel_distrito").append("<option value='0'>Seleccionar</option>");
          data.map(function(item){
              obj.append("<option value='"+item.cod+"''>"+item.descripcion+"</option>");
              obj2.append("<option value='"+item.cod+"''>"+item.descripcion+"</option>");
          });

          if (val!=null) {
            obj.val(val)
          }
          if (val2!=null){
            obj2.val(val2)
          }

      });
    }
    var getDistritos2 = function(cod_departamento,cod_provincia){
      $("#txr_sel_distrito_res").empty();
      $("#txr_sel_distrito").empty();
      $("#sel_distrito_res").empty();
      $("#sel_distrito").empty();
      var url = apiurlaccessrequest+"/api/Get-Ubigeo?code="+GetUbigeo+"&httpmethod=getDistritos&cod_departamento="+cod_departamento+"&cod_provincia="+cod_provincia;              
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
          $("#txr_sel_distrito_res").append("<option value='0'>Seleccionar</option>");
          $("#txr_sel_distrito").append("<option value='0'>Seleccionar</option>");
          $("#sel_distrito_res").append("<option value='0'>Seleccionar</option>");
          $("#sel_distrito").append("<option value='0'>Seleccionar</option>");
          data.map(function(item){
              $("#txr_sel_distrito_res").append("<option value='"+item.cod+"''>"+item.descripcion+"</option>");
              $("#txr_sel_distrito").append("<option value='"+item.cod+"''>"+item.descripcion+"</option>");
              $("#sel_distrito_res").append("<option value='"+item.cod+"''>"+item.descripcion+"</option>");
              $("#sel_distrito").append("<option value='"+item.cod+"''>"+item.descripcion+"</option>");
          });
      });
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
          //jsonExternalCompany.push({name:"Tasa",id:0})
          //list.push({label:toCapitalize(item.name),value:toCapitalize(item.name),id:item.id})
          selectExternalCompany($("#sel_company_1"),1);
          selectExternalCompany($("#sel_company"),0,'filter');
          //auto completar
          autocompletarExternalCompany($("#ruc_company_1"),1);

          //cargar ara ingreso temporal
          selectExternalCompany($("#sel_companytemp_1"),1);
          selectExternalCompany($("#sel_companytemp"),0,'filter');
          //auto completar
          autocompletarExternalCompany($("#ruc_companytemp_1"),1);
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
  var getCollaboratortemp =  function(obj,i,istasa)
  {    
    //alert(i);
    var type_contact = $("#sel_type_contacttemp_"+i).val();
    if(type_contact=="colaborador")//if(company=="0-tasa" || company=="tasa" || company=="Tasa" || company=="TASA" )
    {      
      obj.autocomplete({
        change: function (event, ui) 
        {
            //console.log( $("#hid_collaborator_id_"+i).val())
            if (ui.item === null &&  $("#hid_collaboratortemp_id_"+i).length>20) 
            {
            
               /*  $("#hid_collaborator_id_"+i).val("");
                $(this).val("");
                $("#add_covid_lastname_"+i).val(""); */
            }
            else if(ui.item)
            {
             
              $("#add_covid_firtnametemp_"+i).val(ui.item.firstname).trigger("change");
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
            $("#add_covid_firtnameloadtemp_1").show();
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
              $("#add_covid_firtnameloadtemp_1").hide();
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
         
          $("#hid_collaboratortemp_id_"+i).val(ui.item.id);
          //$("#add_covid_dni_"+i).trigger("focusout");
          //console.log(ui.item.label)
          setTimeout(function(){
            $("#add_covid_firtnametemp_"+i).val(ui.item.firstname);
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
  var selectExternalCompany = function(obj,leng,filter)
  {
   
    if(filter=="filter")
    {
    var option = "";
    option+="<option value='0'>Todos</option>";  
    jsonExternalCompany.map(function(item){
        option+="<option value='"+item.name+"'>"+toCapitalize(item.name)+"</option>";
    });
   // option+="<option value='Tasa'>Tasa</option>";
    obj.html(option);
  }

    $(obj).change(function(){
     // $("#add_covid_dni_"+leng).focus();
      //$("#add_covid_lastname_"+leng).val("");
      getCollaborator($("#add_covid_firtname_"+leng),leng); 
    });

    //autocomplete new
    //se llena la lista para autocompletar
    var list=[];
    jsonExternalCompany.map(function(item){
      list.push({label:toCapitalize(item.name),value:toCapitalize(item.name),id:item.id})
  });
 // list.push({label:'Tasa',value:'Tasa',id:0})
    obj.autocomplete({
     
      source: list//listado para autocompletar
      ,
      //minLength: 3,//minimo de letras a buscar coincidencias
      select: function( event, ui ) 
      {
        //cuando se selecciona el valor
       // console.log(ui.item.id)
       
        $("#sel_cod_company_"+leng).val(ui.item.id);
        
        
        //if(ui.item.id==0 || ui.item.id=='Tasa' || ui.item.id=='tasa' || ui.item.id=='TASA')
        getCollaborator($("#add_covid_firtname_"+leng),leng);
       // setTimeout(function(){$("#add_covid_dni_"+leng).focus();},500)

      }

      
  });


  }
  var selectExternalCompanytemp = function(obj,leng,filter)
  {
   
    if(filter=="filter")
    {
    var option = "";
    option+="<option value='0'>Todos</option>";  
    jsonExternalCompany.map(function(item){
        option+="<option value='"+item.name+"'>"+toCapitalize(item.name)+"</option>";
    });
   // option+="<option value='Tasa'>Tasa</option>";
    obj.html(option);
  }

    $(obj).change(function(){
     // $("#add_covid_dni_"+leng).focus();
      //$("#add_covid_lastname_"+leng).val("");
      getCollaboratortemp($("#add_covid_firtnametemp_"+leng),leng); 
    });

    //autocomplete new
    //se llena la lista para autocompletar
    var list=[];
    jsonExternalCompany.map(function(item){
      list.push({label:toCapitalize(item.name),value:toCapitalize(item.name),id:item.id})
  });
 // list.push({label:'Tasa',value:'Tasa',id:0})
    obj.autocomplete({
     
      source: list//listado para autocompletar
      ,
      //minLength: 3,//minimo de letras a buscar coincidencias
      select: function( event, ui ) 
      {
        //cuando se selecciona el valor
       // console.log(ui.item.id)
       
        $("#sel_cod_companytemp_"+leng).val(ui.item.id);
        
        
        //if(ui.item.id==0 || ui.item.id=='Tasa' || ui.item.id=='tasa' || ui.item.id=='TASA')
        getCollaboratortemp($("#add_covid_firtnametemp_"+leng),leng);
       // setTimeout(function(){$("#add_covid_dni_"+leng).focus();},500)

      }

      
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
        if(item.flag_sede==true)
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
//se carga areas para igreso temporal
    var option ;
    var obj     = $("#sel_areatemp_"+pos);obj.empty();
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


  }
  var searchUser = function(val)
  {

    var pass=0;
    var pos;
    globalBlackLists.map((item,i)=>{
      if(item.identity_document==val)
      {
        // swal("Registro existente!", "Este documento de identidad ya ha sido ingresado a lista negra!.", "info");
        pass=1;
        pos=i;
      }
    })
    if(pass==1)
    {

      swal({
        title: "Registro existente!",
        text: "¿Desea ir al registro o realizar una nueva búsqueda?",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: " btn-green-lime btn-sm btn-rounded btn-raised",
        confirmButtonText: "Ir a registro",
        cancelButtonText: "Buscar de nuevo",                
        closeOnConfirm: true,
        closeOnCancel: false,
        showLoaderOnConfirm: true
      },function(action){
        if (action===false) {//register                   
            swal.close();
              $("#tx_access_dni").val("");
              $("#tx_access_dni").focus();
          } else {//register
            $("#modalShowpersonBlack").modal('hide')
            var veto_status = 0;
           
            if(globalBlackLists[pos].veto_status)
              veto_status = 1
           
            vw_black_list.thumbsUp(globalBlackLists[pos].id,veto_status,globalBlackLists[pos].name,globalBlackLists[pos].name_external_company,globalBlackLists[pos].person_picture,globalBlackLists[pos].reason,globalBlackLists[pos].reason,globalBlackLists[pos].reason ,globalBlackLists[pos].check_in,globalBlackLists[pos].covid_test,globalBlackLists[pos].is_collaborator,globalBlackLists[pos].created_date, globalBlackLists[pos].temperature_in,globalBlackLists[pos].temperature_out,globalBlackLists[pos].last_attention_date,globalBlackLists[pos].ruc);                    
          }
        //registerCompanyExternal();            
    });

      return;
    }

    if (val.trim() == '') {
      swal("Error!", "Ingrese un DOCUMENTO DE IDENTIDAD.", "error");
    }else{
      var name = getCookie('vtas_fullname'+sessionStorage.tabVisitasa);
        var url = apiurlsecurity+"/api/Get-Person-All?httpmethod=searchUserPerson&identity_document="+val+"&code="+GetPersonAll+"";                   
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
          
          if (data.id) 
          {
            searchAct=val;
            $("#name").text(data.firstname+' '+data.lastname);
            $("#name_external_company").text(data.name_external_company?toCapitalize(data.name_external_company):'-');
            $("#img_user_black_list_02").attr("src","images/iconos/user.svg");              
            if(data.person_picture)
              $("#img_user_black_list_02").attr("src",data.person_picture);              
            
            $("#data-div").attr('hidden',false);
            $("#send-div").attr('hidden',false);
            $("#tx_reason").val("Ingrese una observación");
            
            //swal("Exito!", "Lista actualizada.", "success");
            //vw_black_list.reloadtableBlackList();
          }else{
            searchAct=0;
            $("#tx_access_dni").val("");
            swal("Error!", "No encontramos registros de ingreso a nuestras Sedes con este Documento de Identidad. Verificar datos!.", "error");
          }

        });
    }
    
  }
   



  var selectedFilterStatusBl=function(val){
   
    $("#label_status_list_1")[0].className="btn  tabInactive";
    $("#label_status_list_2")[0].className="btn  tabInactive";
    $("#label_status_list_3")[0].className="btn  tabInactive";
    $("#label_status_list_4")[0].className="btn  tabInactive";
    $("#label_status_list_5")[0].className="btn  tabInactive";
    if(val==1)
      $("#label_status_list_1")[0].className="btn tabInactive  text-white";
    else if(val==2)
      $("#label_status_list_2")[0].className="btn tabInactive  text-white";
    else if(val==3)
      $("#label_status_list_3")[0].className="btn tabInactive  text-white";
    else if(val==4)
      $("#label_status_list_4")[0].className="btn tabInactive  text-white";
    else if(val==5)
      $("#label_status_list_5")[0].className="btn tabInactive  text-white";
    
    

     
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
        
          if(typecontact == 'colaborador' || ruc=='20100971772' || values[4].toLowerCase().trim() == "tasa" || values[4].toLowerCase().trim().includes("tasa") || values[5].toLowerCase().trim() == "tasa" || values[5].toLowerCase().trim().includes("tasa") )
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
          , 
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
            reloadtableBlackList();
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

  var reloadtableBlackList = function(){
    if(oTableBlackList)
      oTableBlackList.ajax.reload();
    else
      tableBlackList();
  }

  var checkDataOIS= function(dni){

    var ois = {};
if(dni)
{
    var url         = apiurlsecurity+"/api/Get-OIS?code="+GetOIS+"&httpmethod=object&dni="+dni.trim();  
    //var url          = apiurlaccessregistries+"/api/Get-OIS?code="+GetOIS+"&httpmethod=object&dni="+dni.trim();           
    var headers ={
        "apikey":"r$3#23516ewew5"        
    }
   
    $.ajax({                    
        method: "POST",
        url:  url,
        async:false,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function(data)
    {

      ois=data;
     

    });  
  }    
    return ois;
  }

var 	getDocument = function()
{   
  
 
  var now = moment().format('YYYY-MM-DD');

  var dni          = $("#tx_finded").val().trim(); 
  
  if(dni=="")
  {
    swal({
      title: "Campos vacios",
      text: "No se ingresó el documento",
      timer: 4000,
      type: "error",
      showConfirmButton: true
      });
    return;
  }

  vt_validateSecury(dni,'mobile');

  return
  showLoading();
  var url         = apiurlblacklist+"/api/Get-Blacklist-User?httpmethod=verifyblacklist&code="+getblacklistusercode+"&identity_document="+dni+"&list_type="+2;                
  var headers ={
    "apikey":constantes.apiKey
  }
  $.ajax({
      method: "POST",
      url:  url,
      headers:headers,
      crossDomain: true,
      dataType: "json",
  }).done(function(data)
  {
  
    if(data)
    {
        showData(data.id,data.vetado,data.fullname,data.name_company,data.picture,data.reason,data.id_area,data.id_company,data.id_location,data.area,data.name_location,data.fullname,data.identity_document,data.job,data.check_in,data.covid_test,data.is_collaborator,data.date_covid_test,data.temperature_in,data.temperature_out,data.attention_date,data.list_type)
    }
    else
    {
     

      swal({
        title: "Sin resultados",
        text:'No se encontraron datos con el documento: '+dni,
        type: "info",
        timer:3000,
        showCancelButton: false,
        confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
        confirmButtonText: "De acuerdo",
        closeOnConfirm: false
      });

      //$("#tx_finded").val("");
      $("#tx_finded").focus()
    }
    hideLoading();
  })
  .fail( function( jqXHR, textStatus, errorThrown ) {
    hideLoading();
    swal("Error!", "Se produjo un problema al momento de registrar", "error");
});


}

    var globalBlackLists=[];
    var tableBlackList = function(status=3)
    {   
           
      showLoading();
      
        if(oTableBlackList){
          oTableBlackList.clear().draw();
          oTableBlackList.destroy();
        }
        if(!status)    
          status = $('input:radio[name=chb_status_list]:checked').val();        
         
        
        var estatus = ActiveEnter==1?'0':$("#sel_status")[0]?$("#sel_status").val():0;
        var type    = ActiveEnter==1?'0':$("#sel_type")[0]?$("#sel_type").val():0;      
        var company = ActiveEnter==1?'0': $("#sel_company")[0]?$("#sel_company").val():0;        
        var array   = ActiveEnter==1?'0':$("#sel_sede")[0]?$("#sel_sede").val().split("-"):0;

        var sede    = ActiveEnter==1?'0':array[0]?array[0]:0;
        var area    = ActiveEnter==1?'0':$("#sel_area")[0]?$("#sel_area").val():0;
        var prueba   = ActiveEnter==1?'0':$("#sel_prueba").val()?$("#sel_prueba").val():0;
        var desde   = ActiveEnter==1?'':$("#tx_date_init").val();
        var hasta   = ActiveEnter==1?'':$("#tx_date_end").val();                
        var search  =  ActiveEnter==0?'':"&search="+$("#tx_access_dni_list").val();//$("#tx_access_dni_list").val();        
        var desdeVencimiento   = ActiveEnter==1?'':$("#tx_date_vencimiento_init").val();
        var hastaVencimiento   = ActiveEnter==1?'':$("#tx_date_vencimiento_end").val();
        var dateVencimiento = "";
        if(estatus=="3"){//Tamizaje vencido
          //dateVencimiento = "&date_init_vencido="+desdeVencimiento+"&date_end_vencido="+hastaVencimiento;
        }
      /*
       var estatus = $("#sel_status").val().trim().length==0?'0':$("#sel_status")[0]?$("#sel_status").val():0;
       var type    = $("#sel_type").val().trim().length==0?'0':$("#sel_type")[0]?$("#sel_type").val():0;      
       var company = $("#sel_company").val().trim().length==0?'0': $("#sel_company")[0]?$("#sel_company").val():0;        
       var array   = $("#sel_sede").val()==0?'0':$("#sel_sede")[0]?$("#sel_sede").val().split("-"):0;
       var sede    = array[0].trim().length==0?'0':array[0]?array[0]:0;
       var area    = $("#sel_area").val().trim().length==0?'0':$("#sel_area")[0]?$("#sel_area").val():0;
       var desde   = $("#tx_date_init").val().trim().length==0?'':$("#tx_date_init").val();
       var hasta   = $("#tx_date_end").val().trim().length==0?'':$("#tx_date_end").val();   
       var search  = $("#tx_access_dni_list").val().trim().length==0?"":"&search="+$("#tx_access_dni_list").val();
       */
        //var name = search;
        var search_type = 1;

        if(flagModuleMedicoActive==0)
          var rol =getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa);
        else
          var rol='ROL_MEDICO';
        //alert(rol);
       /*  if(initListCovid==0 && getCookie("vtas_sede") &&  getCookie("vtas_sede")!="")//l aprimera vez busca por la sede logueada
        {
          initListCovid=1;
          sede=getCookie("vtas_sede");
        } */
        //console.log(status);
        var now = moment().format('YYYY-MM-DD');
        var list_type = 2;//covid 19
        var url         = apiurlblacklist+"/api/Get-Blacklist-User?httpmethod=objectlist&code="+getblacklistusercode+"&list_type="+list_type+"&status="+estatus+"&type="+type+"&company="+company+"&sede="+sede+"&area="+area+"&prueba="+prueba+"&date_init="+desde+"&date_end="+hasta+"&rol="+rol+search+"&search_type="+search_type+dateVencimiento;
        var headers ={
            "apikey":constantes.apiKey
        }
        var showTitleColaborador = 0;
        var moduleExam=$("#modalRegisterCovidTestNewForm")[0];
        oTableBlackList = $('#tb_black_list').DataTable({
            dom: 'Bfrtip',
            buttons: [{
              extend: 'excelHtml5',
              className:'btn-success font-weight-bold ',              
              text: 'Exportar a Excel',
              //messageTop: 'Exportar a Excel',
              exportOptions: {
                columns: [1,2,3,4,5,6,7,8,9,10,11,12]
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
                columns: [1,2,3,4,5,6,7,8,9,10,11,12]
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
                                    <br><div style='color:#999'>1. Verifique los datos que escribió en el  buscador</div>
                                    <br><div style='color:#999'>2. Utilice documento de identidad, nombre y/o apellido </div>
                                    <br><div style='color:#999'>3. Presione la tecla ENTER para realizar su búsqueda</div>
                                    <br><div style='color:#999'>4. Si no encuentra ningún registro la persona debe solicitar a un Colaborador de TASA cita de Tamizaje</div>`,
                "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
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

                 /*  console.log(xhr);
                  console.log(xhr.status) */
                  var textError=thrown;
                  var status=xhr.status+' - '+xhr.statusText;//500 error servidor

                  
                  showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
                  return;


                  //console.log( xhr, error, thrown );
                  hideLoading();
              },
                dataSrc: function ( req ) 
                {
                  hideLoading();
                  ActiveEnter=0;
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

                      $("#badgelistcovidAlli").text(item.cant_covid.cantCheckIn) 
                      
                        var accessTime  = moment(item.created_date).format('LT');
                        var week        = moment(item.created_date).format('ddd');//dddd
                        var month       = moment(item.created_date).format('MMMM');//
                        var day         = moment(item.created_date).format('D');
                        var startDate               = week +" "+day +" de "+ month;
                        var datec=startDate;
                        var dateTamizaje = getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_MEDICAREA" || getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_MEDICO" || flagModuleMedicoActive==1?item.last_attention_date=='0001-01-01T00:00:00'?'':formatDateTime(item.last_attention_date,16,true,true):moment(item.last_attention_date).format('DD/MM/YYYY');
                        
                        var ExpireTamizaje='';
                        if(item.last_attention_date!='0001-01-01T00:00:00')
                        {
                          var dateBdd = moment(item.last_attention_date).add(18,"days").format('YYYY-MM-DD HH:mm:ss');                             
                          //var ExpireTamizaje   = moment(dateBdd,"YYYY-MM-DD HH:mm:ss");
                          ExpireTamizaje=formatDateTime(dateBdd,16,true,true)
                        }
                        
                        var area = item.name_area?toCapitalize(item.name_area):"No Asignado";
                        var companys=item.name_external_company?toCapitalize(item.name_external_company):'-';
                        var name="'"+toCapitalize(item.name)+"'";
                        var statusColor="";
                        
                        if(( item.covid_test==1) && item.last_veto_status==0)
                        {
                          var textStatus="Pendiente por Tamizaje";
                          statusColor ="statusPperDatostx";
                          cantCovid1++;
                        }
                        if(item.covid_test==8)
                        {
                          var textStatus="Pendiente por alta médica";
                          statusColor ="statusPperDatostx";  
                          cantCovid1++;                 
                        }
                        else
                        {
                          if(item.last_veto_status==1)
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
                          
                        }
                        if(item.is_collaborator)
                        {
                          cantCovid3++;
                        }
                        else{
                          cantCovid4++;
                        }

                        

                        //se calculas status tamizaje persona
                        var textStatustamizaje="";
                        var statusColortamizaje="";
                        if(item.covid_test==1 )
                        {
                           textStatustamizaje="Tamizaje Agendado";
                          statusColortamizaje ="text-success";

                          var textStatus="Pendiente por Tamizaje";
                          statusColor ="statusPperDatostx";

                          
                        }

                        if(item.covid_test==8)
                        {
                          var textStatus="Pendiente por alta médica";
                          statusColor ="statusPperDatostx";

                           textStatustamizaje="Pendiente por alta médica";
                          statusColortamizaje ="text-success";                          
                        }

                        if(item.covid_test==7)
                        {
                          var textStatus="Habilitado Indefinido";
                          statusColor ="statusPperCoursetx";

                          textStatustamizaje="Habilitado Indefinido";
                          statusColortamizaje ="text-success";
                          cantCovid2++;
                        }

                        if(item.covid_test==9)
                        {
                          var textStatus="Fallecido";
                          statusColor ="";

                          textStatustamizaje="Fallecido";
                          statusColortamizaje ="text-dark";
                          
                        }

                        if(item.covid_test==2)
                        {
                           textStatustamizaje="Tamizaje Realizado";
                          statusColortamizaje ="statusPperProgtx";
                        }
                        if(item.covid_test==3)
                        {
                           textStatustamizaje="Tamizaje Vencido";
                           statusColortamizaje ="text-danger";
                           var textStatus="Tamizaje Vencido";
                           statusColor ="text-danger";

                        }
                        if(item.covid_test==4)
                        {
                           textStatustamizaje="Pendiente por Aprobación";
                          statusColortamizaje ="statusPperDatostx";

                          
                        }
                        if(item.covid_test==5)
                        {
                           textStatustamizaje="Tamizaje cancelado";
                          statusColortamizaje ="text-muted";

                          var textStatus="Tamizaje cancelado";
                           statusColor ="text-muted";
                        }




                       // console.log(item.check_in,item.check_in_datetime,item.check_out_datetime)
                        var action=""; 
                        var datAction='';
                        var hora = "";
                        var fecha ="";
                        var colorAction="";
                        if(item.check_in==1 && (item.check_in_datetime && item.check_in_datetime!="0001-01-01T00:00:00"))
                        {
                          //action="Entró a <br>"+moment(item.check_in_datetime).format('h:mm a') ;var colorAction="text-success text-center "; 
                          action=getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_COVIDSEGURIDAD"?"Entrada":"";
                          colorAction="text-success text-center "; 
                          hora = getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_COVIDSEGURIDAD"?moment(item.check_in_datetime).format('H:mm'):"";
                          fecha = getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_COVIDSEGURIDAD"?moment(item.check_in_datetime).format('DD/MM/YYYY'):"";
                        }

                        if(item.check_in==0 && (item.check_out_datetime && item.check_out_datetime!="0001-01-01T00:00:00"))
                        {
                          //action="Salió a <br>"+moment(item.check_out_datetime).format('h:mm a'); var colorAction="text-danger text-center";

                          action=getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_COVIDSEGURIDAD"?"Salida":"";
                          colorAction="text-danger text-center"; 
                          hora =getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_COVIDSEGURIDAD"? moment(item.check_out_datetime).format('H:mm'):"";
                          fecha = getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_COVIDSEGURIDAD"?moment(item.check_out_datetime).format('DD/MM/YYYY'):"";
                        }


                        /*if(item.covid_test==3 )
                        {
                          //action="Salió a <br>"+moment(item.check_out_datetime).format('h:mm a'); var colorAction="text-danger text-center";

                          action=getCookie("vtas_rolexternalrol")=="ROL_COVIDSEGURIDAD"?"Vencida":"";
                          colorAction="text-muted text-center"; 
                          hora = "";//getCookie("vtas_rolexternalrol")=="ROL_COVIDSEGURIDAD"? moment(item.check_out_datetime).format('h:mm a'):"";
                          fecha = "";//getCookie("vtas_rolexternalrol")=="ROL_COVIDSEGURIDAD"?moment(item.check_out_datetime).format('DD/MM/YYYY'):"";
                        }*/

                     
                        var tooltipVetado = '';
                        if(item.attribute5)
                          tooltipVetado = 'data-toggle="tooltip" data-placement="top" title="'+item.attribute5+'"';

                          if(item.attribute1=='1')//tamizaje en sede
                            var img = "images/iconos/sedet.svg"; 
                          if(item.attribute1=='2')//tamizaje en telefonica
                            var img = "images/iconos/phonet.svg";
                          if(item.attribute1=='3')//tamizaje en app
                            var img = "images/iconos/appt.svg";
                          else
                          var img = "images/iconos/sedet.svg";
                          

                        var buttomDetail= moduleExam?'<img height="24" src="images/iconos/newExam.svg">':'<i class="material-icons btdetail" style="cursor:pointer " >more_vert</i>' 
                        
                        if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_MEDICAREA" || getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_MEDICO" || flagModuleMedicoActive==1){
                          var namecol='<div style="cursor:pointer" class="hoverItem" onclick="vw_covid_list.thumbsUp('+item.id+','+item.last_veto_status+','+name+',&quot;'+item.name_external_company+'&quot;,&quot;'+img+'&quot;,&quot;'+item.reason+'&quot;,'+item.id_area+','+item.id_company+','+item.id_location+',&quot;'+item.name_area+'&quot;,&quot;'+item.name_location+'&quot;,&quot;'+toCapitalize(item.name)+'&quot;,&quot;'+item.identity_document+'&quot;,&quot;'+item.job+'&quot;,'+item.check_in+' ,'+item.covid_test+','+item.is_collaborator+',&quot;'+item.created_date+'&quot;,&quot;'+item.temperature_in+'&quot;,&quot;'+item.temperature_out+'&quot;,&quot;'+item.last_attention_date+'&quot;,&quot;'+item.ruc+'&quot;,&quot;'+item.last_veto_status+'&quot;,&quot;'+item.ch_evolucion+'&quot;,&quot;'+item.nacionalidad+'&quot;,&quot;'+item.ubigeo+'&quot;,&quot;'+escape(item.direccion)+'&quot;,&quot;'+item.email+'&quot;,&quot;'+item.sexo+'&quot;,&quot;'+item.fecha_nacimiento+'&quot;,&quot;'+item.tlf_celular+'&quot;,&quot;'+item.tlf_fijo+'&quot;,&quot;'+item.dato_familiar+'&quot;,&quot;'+item.tlf_contacto+'&quot;,'+item.biIdF00+',&quot;'+item.type_document+'&quot;,&quot;'+item.list_type+'&quot;,&quot;'+item.is_natclar+'&quot;);" >'+(toCapitalize(getCleanedString(item.name)))+'</div>';
                        }
                        else
                          var namecol='<div style="cursor:pointer" class="hoverItem" onclick="vw_covid_list.thumbsUp('+item.id+','+item.last_veto_status+','+name+',&quot;'+item.name_external_company+'&quot;,&quot;'+img+'&quot;,&quot;'+item.reason+'&quot;,'+item.id_area+','+item.id_company+','+item.id_location+',&quot;'+item.name_area+'&quot;,&quot;'+item.name_location+'&quot;,&quot;'+toCapitalize(item.name)+'&quot;,&quot;'+item.identity_document+'&quot;,&quot;'+item.job+'&quot;,'+item.check_in+' ,'+item.covid_test+','+item.is_collaborator+',&quot;'+item.created_date+'&quot;,&quot;'+item.temperature_in+'&quot;,&quot;'+item.temperature_out+'&quot;,&quot;'+item.last_attention_date+'&quot;,&quot;'+item.ruc+'&quot;,&quot;'+item.last_veto_status+'&quot;,&quot;'+item.ch_evolucion+'&quot;,&quot;'+item.nacionalidad+'&quot;,&quot;'+item.ubigeo+'&quot;,&quot;'+escape(item.direccion)+'&quot;,&quot;'+item.email+'&quot;,&quot;'+item.sexo+'&quot;,&quot;'+item.fecha_nacimiento+'&quot;,&quot;'+item.tlf_celular+'&quot;,&quot;'+item.tlf_fijo+'&quot;,&quot;'+item.dato_familiar+'&quot;,&quot;'+item.tlf_contacto+'&quot;,'+item.biIdF00+',&quot;'+item.type_document+'&quot;,&quot;'+item.list_type+'&quot;,&quot;'+item.is_natclar+'&quot;);" >'+(toCapitalize(getCleanedString(item.name)))+'</div>' ;
                        
                          var row = {
                            icon      : ' <img class="pl-2" src="'+img+'" height="25">' 
                            ,name     : namecol
                            ,dni		  : item.identity_document  
                            ,fecha    : fecha
                            ,hora     : hora
                            ,registro : getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_COVIDSEGURIDAD"? `<div class="${colorAction}">${action}</div> `:''
                            ,colaborador     : item.is_collaborator?"Colaborador":"Contratista"
                            ,company	: toCapitalize(companys)
                            ,name_location     : toCapitalize(item.name_location)
                            ,area     : toCapitalize(area)
                            ,date		  : dateTamizaje=='01/01/0001'?'':dateTamizaje
                            ,expire		  : ExpireTamizaje
                            ,action_type           :( getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=='ROL_MED_AUDITOR'|| getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=='ROL_ALLTASA'||getCookie("vtas_type_usergroup"+sessionStorage.tabVisitasa)=='colaborador' )&&flagModuleMedicoActive==0?('<div '+tooltipVetado+'><i class="fa fa-circle '+statusColortamizaje+'"></i><label style="margin-left:15px">'+textStatustamizaje+'</label></div>'):(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_MEDICAREA" ||getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_MEDICO"||flagModuleMedicoActive==1? '<div '+tooltipVetado+'><i class="fa fa-circle '+statusColor+'"></i><label style="margin-left:15px">'+textStatus+'</label></div>' :'' )                          
                            ,buttons  :!moduleExam?'<button type="button" class="btn " onclick="vw_covid_list.thumbsUp('+item.id+','+item.last_veto_status+','+name+',&quot;'+item.name_external_company+'&quot;,&quot;'+img+'&quot;,&quot;'+item.reason+'&quot;,'+item.id_area+','+item.id_company+','+item.id_location+',&quot;'+item.name_area+'&quot;,&quot;'+item.name_location+'&quot;,&quot;'+toCapitalize(item.name)+'&quot;,&quot;'+item.identity_document+'&quot;,&quot;'+item.job+'&quot;,'+item.check_in+','+item.covid_test+','+item.is_collaborator+',&quot;'+item.created_date+'&quot;,&quot;'+item.temperature_in+'&quot;,&quot;'+item.temperature_out+'&quot,&quot;'+item.last_attention_date+'&quot;,&quot;'+item.ruc+'&quot;,&quot;'+item.last_veto_status+'&quot;,&quot;'+item.ch_evolucion+'&quot;,&quot;'+item.nacionalidad+'&quot;,&quot;'+item.ubigeo+'&quot;,&quot;'+item.direccion+'&quot;,&quot;'+item.email+'&quot;,&quot;'+item.sexo+'&quot;,&quot;'+item.fecha_nacimiento+'&quot;,&quot;'+item.tlf_celular+'&quot;,&quot;'+item.tlf_fijo+'&quot;,&quot;'+item.dato_familiar+'&quot;,&quot;'+item.tlf_contacto+'&quot;,'+item.biIdF00+',&quot;'+item.type_document+'&quot,&quot;'+item.list_type+'&quot;,&quot;'+item.is_natclar+'&quot;);">'+buttomDetail+'</button>': (item.covid_test==2)?'':'<button type="button" class="btn " onclick="vw_covid_list.thumbsUp('+item.id+','+item.last_veto_status+','+name+',&quot;'+item.name_external_company+'&quot;,&quot;'+img+'&quot;,&quot;'+item.reason+'&quot;,'+item.id_area+','+item.id_company+','+item.id_location+',&quot;'+item.name_area+'&quot;,&quot;'+item.name_location+'&quot;,&quot;'+toCapitalize(item.name)+'&quot;,&quot;'+item.identity_document+'&quot;,&quot;'+item.job+'&quot;, '+item.check_in+','+item.covid_test+','+item.is_collaborator+',&quot;'+item.created_date+'&quot;,&quot;'+item.temperature_in+'&quot;,&quot;'+item.temperature_out+'&quot;,&quot;'+item.last_attention_date+'&quot;,&quot;'+item.last_veto_status+'&quot;,&quot;'+item.ch_evolucion+'&quot;,&quot;'+item.ruc+'&quot;,&quot;'+item.nacionalidad+'&quot;,&quot;'+item.ubigeo+'&quot;,&quot;'+item.direccion+'&quot;,&quot;'+item.email+'&quot;,&quot;'+item.sexo+'&quot;,&quot;'+item.fecha_nacimiento+'&quot;,&quot;'+item.tlf_celular+'&quot;,&quot;'+item.tlf_fijo+'&quot;,&quot;'+item.dato_familiar+'&quot;,&quot;'+item.tlf_contacto+'&quot;,'+item.biIdF00+',&quot;'+item.type_document+'&quot,&quot;'+item.list_type+'&quot;);">'+buttomDetail+'</button>'
                            ,detail           :item.covid_test==2?'':'<div data-toggle="modal" data-target="#modalShowRequestDetails" ><i class="material-icons btdetail" style="cursor:pointer " >more_vert</i></div>'
                            ,buttonsHistory   :moduleExam?'<button class="btn " onclick="vw_covid_list.showHistory('+item.id+')"> <img height="24" src="images/iconos/reporthistory.svg"> </button>':''
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                        }
                        i++;
                        data.push(row);
                    });
                   
                    return data;
                } 
            },//nombre, apellido, dni, empresa, fecha de solicitud y estatus
            columns: [
                { title:"Origen" ,data: "icon", targets: 0,align:"center" ,"orderable": false ,width: "2%" },
                { title:"Nombre y Apellido",data: "name",width: "16%",align:"left"   },
                { title:"Documento",data: "dni",align:"left","orderable": false},
                { title:"Tipo",data: "colaborador",align:"left" ,"orderable": false},
                { title:"Empresa",data: "company",align:"left" ,"orderable": false},
                { title:"Sede",data: "name_location",align:"left" ,"orderable": false},
                { title:"Área",data: "area",align:"left" ,"orderable": false},
                { title:getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_COVIDSEGURIDAD"?"Fecha":"",data: "fecha",align:"left" ,"orderable": false },
                { title:getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_COVIDSEGURIDAD"?"Hora":"",data: "hora",align:"left" ,"orderable": false },
                { title:getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_COVIDSEGURIDAD"?"Registro":"",data: "registro",align:"left" ,"orderable": false },                
                { title:(( getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=='ROL_MED_AUDITOR'|| getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=='ROL_ALLTASA'||getCookie("vtas_type_usergroup"+sessionStorage.tabVisitasa)=='colaborador' )&&flagModuleMedicoActive==0)?'Estatus':(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_MEDICO"||getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_MEDICAREA" ||flagModuleMedicoActive==1?"Tamizaje Persona":""),data: getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_COVIDSEGURIDAD"?"action_type":"",width:"20%","orderable": false},
                { title:((getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=='ROL_MED_AUDITOR'|| getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_ALLTASA" || getCookie("vtas_type_usergroup"+sessionStorage.tabVisitasa)=='colaborador'))&& flagModuleMedicoActive==0?"Último Tamizaje":"",data:(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=='ROL_MED_AUDITOR'|| getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_ALLTASA" || getCookie("vtas_type_usergroup"+sessionStorage.tabVisitasa)=='colaborador')&& flagModuleMedicoActive==0?"date":'',"orderable": false},
                { title:"Vencimiento Tamizaje",data: "expire",align:"left" ,"orderable": false},
                { title:moduleExam?"Último Tamizaje":"Acciones",data:moduleExam?"date":"buttons","orderable": false},
               
                { title:moduleExam?"Historial":'',data: "buttonsHistory","orderable": false}                  
            ],  

            initComplete: function(settings, json) {
            
            //alert("culminó la carga");
            //$('[data-toggle="tooltip"]').tooltip();    
            $('[data-toggle="tooltip"]').tooltip();  
            }
        });
        //ROL_ALLTASA
       /*oTableBlackList.buttons().container()
        .appendTo( $('#example_wrapper11') ); */
        
        //.container().appendTo($('#buttons'));

       /*  oTableBlackList.buttons().container()
    .appendTo($('#buttons') ); */
    }
    function getCleanedString(cadena){
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
   var covid_checkRiskList = function(document){
   
      var document = document.trim();
      var url         = apiurlblacklist+"/api/Get-Risklist-User?code="+GetRisklistUsercode+"&httpmethod=verifyRiskList&identity_document="+document;              
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
    var nameEdit;
    
    var company;
    var location;
    ;
    var thumbsUp = function(id,status,name,company_name,img,reason,id_area,id_company,id_location,name_area,name_location,nameperson,document,job,check_in,covid_test,is_collaborator,fecha,temperature_in,temperature_out,last_attention_date,ruc,last_veto_status,ch_evolucion,nacionalidad,ubigeo,direccion,email,sexo,fecha_nacimiento,tlf_celular,tlf_fijo,dato_familiar,tlf_contacto,biIdF00,type_document,list_type,is_natclar){

     
      //console.log(id,status,name,company_name,img,reason,id_area,id_company,id_location,name_area,name_location,nameperson,document,job,check_in,covid_test,is_collaborator,fecha,temperature_in,temperature_out,last_attention_date,ruc,last_veto_status,ch_evolucion,nacionalidad,ubigeo,direccion,email,sexo,fecha_nacimiento,tlf_celular,tlf_fijo,dato_familiar,tlf_contacto,biIdF00,type_document,list_type)
      if(ubigeo!= "null" && ubigeo!=undefined){
        var dep   = ubigeo.slice(0, 2);
        var prov  = ubigeo.slice(2, 4);
        var dist  = ubigeo.slice(4, 6);
        
        $("#sel_departamento_res").val(dep);
        getProvincias(dep,$("#sel_provincia_res"),prov);
        getDistritos(dep,prov,$("#sel_distrito_res"),$("#sel_distrito"),dist,'0');
      }
      datecitetemp=fecha;
      nacionalidad      = (nacionalidad!="null")?nacionalidad:""; 
      direccion         = (direccion!="null")?direccion:"";
      email             = (email!="null")?email:"";
      tlf_celular       = (tlf_celular!="null")?tlf_celular:"";
      tlf_fijo          = (tlf_fijo!="null")?tlf_fijo:"";
      dato_familiar     = (dato_familiar!="null")?dato_familiar:"";
      tlf_contacto      = (tlf_contacto!="null")?tlf_contacto:"";
      fecha_nacimiento  = (fecha_nacimiento!="null")?moment(fecha_nacimiento).format("DD/MM/YYYY"):"";
      $("#tx_nacionalidad").val(nacionalidad);
      $("#tx_direccion_res").val(unescape(direccion));
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
      $("#btnValidateIn").hide();
      $("#headerFormCovid").css({background:'#039be0'});  
      $("#span_notification").html('Validando... Espere');
      $("#btnValidateIn").hide();
      $("#btnSolicitudTamizaje").hide(); 
    //--------------------------------------------------------
      var group = getCookie("vtas_type_usergroup"+sessionStorage.tabVisitasa); 
      //alert(group);
      $("#btnValidateOut").hide();

      
      $('#span_name_company').text("--");

      if(company!=null || company!="" || company!="null")
        $('#span_name_company').text(toCapitalize(company));
      if(img)
        $("#img_user_black_list").attr("src",img);
       
      nameEdit=name;
      statusEdit=status;
      list_typetemp=list_type;
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

      //se utiliza para de extension de reposo
      $("#hid_covid_test_ext").val(covid_test);
      $("#hid_last_veto_status_ext").val(last_veto_status);


      $("#tx_tempIN_lg").val(""); 
      $("#tx_temoOUT_lg").val("");
     
      $("#tx_tempIN_lg").val(temperature_in!='null'?temperature_in:""); 
      $("#tx_temoOUT_lg").val(temperature_out!='null'?temperature_out:"");
      
      $("#company").text(company_name!='null'?company_name:'No asignado');
      $("#area").text(name_area!='null'?name_area:'No asignado');
      $("#local").text(name_location!='null'?name_location:'No asignado');
      $("#tx_nomape").val(nameperson);
      $("#tx_docum").val(document!='null'?document:'');

      $("#sel_type_document_prog").val(type_document!='null' && type_document!="undefined" && type_document?type_document:'DNI');
      
      getSignature('signaturePac');//buscar firma
      getSignaturePerson('');//buscar firma getCookie('vtas_person_id'+sessionStorage.tabVisitasa)
      $("#tx_ocupacion").val(job!='null'?job:'');
     
      fecheTamg=fecha;
      fecha = moment(fecha).format("DD/MM/YYYY");
      $("#tx_date_tamizaje").val(fecha);


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
     
      $("#btnCancelTamizaje").hide();
      if(covid_test==1 || covid_test==4){
        if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_COVIDSEGURIDAD")
        $("#btnCancelTamizaje").show();
      }
      if((status==1 && covid_test ==2) || (status==0 && covid_test ==2) )
      {
        if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_COVIDSEGURIDAD")
        $("#btnCancelTamizaje").show();
      }
      else{
        $("#btnSolicitudTamizaje").hide();
        }

      if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_COVIDSEGURIDAD")//si es seguridad no se muestra solicitud de tamizaje
      {
        $("#btnSolicitudTamizaje").hide();
        $("#fechaReeustExamCol").hide();
        $("#btnNoAuthorizedeIn").hide();
        
      }
      else{
        
        $("#btnNoAuthorizedeIn").hide();
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
       
      var moduleExam=$("#modalRegisterCovidTestNewForm")[0];
      if (!moduleExam) {
        $('#modalEditBlacklist').modal('show');
      }else{
       // $('#modalRegisterCovidTest').modal('show');
       
       $('#modalRegisterCovidTestNewForm').modal('show');
       
      }
     
      $("#sel_statusrap").change(function(){
        
        if ($(this).val()==1) {$(".reagent").show()}else{$(".reagent").hide()}
        verifyStatus(1);


        var fichaCovid = $("#sel_statusFic").val(); 
        var testMolecular = $("#sel_statusmolec").val(); 
        if($(this).val()=="1" || fichaCovid =="1" || testMolecular=="1" ){          
          $("#divLugarContagio").show();
        }
        else{
          $("#divLugarContagio").hide();
        }
      })

      $("#sel_statusmolec").change(function(){
        verifyStatus(1);
        var fichaCovid = $("#sel_statusFic").val(); 
        var testFast = $("#sel_statusrap").val(); 
        if($(this).val()=="1" || fichaCovid =="1" || testFast=="1" ){          
          $("#divLugarContagio").show();
        }
        else{
          $("#divLugarContagio").hide();
        }
      })

      $("#hid_id_area_sap").val("0");
        $("#hid_name_area_sap").val("");
        $("#hid_id_location_sap").val("0");
        $("#hid_name_location_sap").val("");
        $("#tx_empleador").val('colaborador');
        $("#hid_user_company_type").val("");
      if(is_collaborator==1){
        //buscamos en el directorio de tasa
        var reqJson = getDataCollaboratorDni(document);
        //console.log(reqJson.value[0].plantCode,reqJson.value[0].plantDescription);
        if(reqJson.value.length>0){
          $("#hid_user_company_type").val(reqJson.value[0].userCompanyType);
          if(reqJson.value[0].userCompanyType=="EMPLEADOS"){
            $("#hid_name_area_sap").val(reqJson.value[0].department);          
            $("#hid_id_area_sap").val(reqJson.value[0].userAreaFuncCode); 
           }
           else{
            $("#hid_name_area_sap").val(reqJson.value[0].userUODescription);
            $("#hid_id_area_sap").val(reqJson.value[0].userUOCode);
          }
          $("#hid_id_location_sap").val(reqJson.value[0].plantCode);
          $("#hid_name_location_sap").val(reqJson.value[0].plantDescription);
          $("#tx_empleador").val('colaborador');
        }  
       
      }       
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
                    //console.log("Dias: "+diaspass);
              }

     
      $("#label_altamedica_88").show();
      //if(diaspass>=14)//si es vetado y es mas de 14 dias
      //{
        $("#divfieldreposo").hide();
        $("#sel_extend_reposo").val(0);
        if(last_veto_status==1 || ch_evolucion==true)
        {
          $("#label_altamedica_88").show();
          $("#divfieldreposo").hide();
        }
        if(is_natclar==1)//si se le dio alta en natclar
        {
          $("#divfieldreposo").show();
        }
      //}
      $("#notificationVetoPErson").hide();
      
      var riesgo=covid_checkRiskList(document);
      if(riesgo.length>0)
      {
        console.log("En lista de riesgo");
        $("#modalViewBlackCovidTest").modal("hide");
        $("#modalRegisterCovidTestNewForm").modal("hide");
        $("#modalRegisterBlackCovidTest").modal("hide");

       /*  setTimeout(function(){
          $("#modalnotifRiesgo").modal('show');
        },500) */
        
       
      }
      
    }

    
    var verifyStatus = function(n){
     
      if (n==1) {
        
        if($("#sel_statusrap").val()==1 || $("#sel_statusmolec").val()==1){
          selectedFilterStatus(8)
        }else{
          selectedFilterStatus(7)
        }
      }else if (n==2){
        if($("#selr_statusrap").val()==1 || $("#selr_statusmolec").val()==1){
          selectedFilterStatus(10)
        }else{
          selectedFilterStatus(9)
        }
      }else if (n==3){
        if($("#selr_statusrap_history").val()==1 || $("#selr_statusmolec_history").val()==1){
          selectedFilterStatus(12)
        }else{
          selectedFilterStatus(11)
        }
      }


    }

    var showData = function(id,status,name,company_name,img,reason,id_area,id_company,id_location,name_area,name_location,nameperson,document,job,check_in,covid_test,is_collaborator,fecha,tempin,tempout,attention_date,list_type){
      //

      var dataOIS=0;
      if(!is_collaborator)
      {

        dataOIS=checkDataOIS(document);
        
      }
      var textMessage="Ingreso Autorizado";
      var detallest="";
      datecitetemp=fecha;
      //datos personales---------------------------------
      $('#nameedit').text(name);  
     
      $('#span_name_company').text("--");

      if(company!=null || company!="" || company!="null")
        $('#span_name_company').text(toCapitalize(company));
      if(img)
        $("#img_user_black_list").attr("src",img);
      
      nameEdit=name;
      statusEdit=status;
      idEdit=id;
      area = id_area;
      company = id_company;
      location = id_location;
        
      
      $("#tx_tempIN").val(tempin);
      $("#tx_temoOUT").val(tempout);
      $("#hid_is_collaborator").val(is_collaborator);     
      $("#hid_id_area").val(id_area);
      $("#hid_id_location").val(id_location);  
      $("#hid_id_company").val(id_company); 
      $("#hid_name_company").val(company_name); 
      
      $("#company").text(company_name!='null'?company_name:'No asignado');
      $("#area").text(name_area!='null'?name_area:'No asignado');
      $("#local").text(name_location!='null'?name_location:'No asignado');
      $("#tx_nomape").val(nameperson);
      $("#tx_docum").val(document!='null'?document:'');
      $("#tx_ocupacion").val(job!='null'?job:'');
      fecha = moment(fecha).format("DD/MM/YYYY");
      $("#tx_date_tamizaje").val(fecha);
     
      //validacion de ingreso----------------------------------------------------------------------------------------------------------------------

      var match = "DNI";
      //var dataRiesgo = getObjectByValue(PERSONAL_RESTRINGIDO,match,document);
      var dataRiesgo = checkRiskList(document);
      var diaspass=11;//para dias limite para pasar
      if(attention_date)//se calcula tiempo de la ultima fecha de tamizaje------------------------------------------------------------------------
      {

            var date=new Date();
            var dateBdd = moment(attention_date).utc().format('YYYY-MM-DD HH:mm:ss');                             
            var time1   = moment(dateBdd,"YYYY-MM-DD HH:mm:ss");
            var time2   = moment(date,"YYYY-MM-DD HH:mm:ss");
            var ms      = time1.diff(time2);
            diaspass = Math.abs(moment.duration(ms).asDays());
            //var hours = moment.duration(ms).asHours();
            //console.log("Dias: "+diaspass);
      }
      var diascita=0;
     
              if(datecitetemp)
              {
                var date=new Date();
                var dateBdd = moment(datecitetemp).add(-5,"hours").format('YYYY-MM-DD HH:mm:ss');                             
                var time1   = moment(dateBdd,"YYYY-MM-DD HH:mm:ss");
                var time2   = moment(date,"YYYY-MM-DD HH:mm:ss");
                var ms      = time1.diff(time2);
                diascita = Math.abs(moment.duration(ms).asDays());
              }
              


     
      $("#btnValidateOut").hide();

      //validacion si estoy pendiente por aprobar pero no tengo tamizaje previo, no pasa---------------------------------------------------------------
      var name="";
      var flagt=0;
      
      if (status == 1)//vetados tanto en lista negra como por lista negra---------------------------------------------------------------------------------
        {
           if(list_type==1)//si esta en lista negra
           {
               textMessage="Acceso Denegado";
               detallest="Persona en Lista Negra"
           }
           else
           {
               textMessage="Acceso Denegado";
               detallest="Persona no habilitada por Tamizaje"
           }
           flagt=1;
          
        }
        else if(dataRiesgo.length>0)
        {
          flagt=1;
           textMessage="Acceso Denegado";
           detallest="Persona en Lista de Riesgo"
         
          name=dataRiesgo[0].name?toCapitalize(dataRiesgo[0].name):'';
        }
        else if(covid_test==3)//tamizaje vencido---------------------------------------------------------------------------------------------------------------
        {
          if(diaspass>10)
          {
            flagt=0;
             textMessage="Acceso Autorizado";
             detallest="Su Tamizaje ha vencido"
            
          }
        }
        else if(covid_test==5 && !attention_date)//tamizaje cancelado-------------------------------------------------------------------------------------------------
        {
          flagt=1;
           textMessage="Acceso Denegado";
           detallest="Debe solicitar Cita de Tamizaje para poder ingresar"
         
        }
        else if(covid_test==5 && attention_date)//tamizaje cancelado------------------------------------------------------------------------------------------------------
        {
          if(diaspass>10)
          {
            flagt=1;
             textMessage="Acceso Denegado";
             detallest="Debe solicitar Cita de Tamizaje para poder ingresar"
           
          }
        }
        else if(covid_test==4 && !attention_date)//tamizaje no aporbado sin tamizaje previo-------------------------------------------------------------------------------
        {
          flagt=1;
           textMessage="Acceso Denegado";
           detallest="Su Solicitud de Tamizaje no se ha Aprobado"
         
        }
        else if(covid_test==4 && attention_date)//tamizaje no aporbado con tamizaje previo--------------------------------------------------------------------------------
        {

          if(diaspass>10)
          {
            flagt=1;
             textMessage="Acceso Denegado";
             detallest="Debe solicitar Cita de Tamizaje para poder ingresar";
           
          }
        }
        else if(attention_date && covid_test!=1)//tamizaje no aporbado con tamizaje previo y que no este aprobado----------------------------------------------------------
        {

          if(diaspass>10)
          {
            flagt=0;
             textMessage="Ingreso Autorizado";
             detallest="Deberá pasar por tópico antes del ingreso a Planta. Retener fotocheck y devolver al finalizar Tamizaje.";
           
          }
        }

                              

       

              if(covid_test==1)//si se ha aprobado tamizaje pero no se realiza en 10 dias, no pasa
              {

                if(diaspass>10)
                {
                  flagt=0;
                   textMessage="Ingreso Autorizado";
                   detallest="Debe dirigirse al Tópico";
                  
                }

                if(diascita<4)//si su cita se le pidio y esta en rango de 1 a 3 dias
                {
                  flagt=0;
                 
                }

                
              }

        if (status == 1)
        {
          if(diaspass>daylimitVeto || covid_test==8)
          {
            flagt=0;
             textMessage="Acceso Autorizado";
             detallest="Pendiente por alta Médica";
          }

        }
        if(covid_test==7 || covid_test==88  )//ingreso indefinido------------------------------------------------------------------------
        {
         
            flagt=0;
             textMessage="Ingreso Autorizado";
             detallest="Habilitado indefinido"
            

            if (status == 1)//vetados tanto en lista negra como por lista negra-------------------------------------------
            {
               if(list_type==1)//si esta en lista negra
               {
                   textMessage="Acceso Denegado";
                   detallest="Persona en Lista Negra"
                  flagt=1;
               }
              
            }
            if(dataRiesgo.length>0)
            {
              flagt=1;
              var textMessage="Acceso Denegado";
              var detallest="Persona en Lista de Riesgo"
             
            }
         
        }
//validacion ois
if(dataOIS!=0)
{
        var resp = dataOIS;       
        if(resp.dni)
        {
         

          if(resp.enabled_status)///habilitado
          {
            console.log("OIS Autorizado");
          }
          
          else
          {//no habilitado

            var detallest="Falta OIS: ";
            if(!resp.sctr_status){detallest=detallest+" .SCTR"}
            //if(!resp.emo_status){detallest=detallest+" .EMO"}
            if(!resp.codanexo1_status){detallest=detallest+" .Anexo1"}
            if(!resp.codanexo2_status){detallest=detallest+" .Anexo2"}
            if(!resp.dj_status){detallest=detallest+" .DJ"}

            console.log("No autorizado OIS: "+detallest)
            flagt=1;
            textMessage="Acceso Denegado";
          }

          if(id==0 && resp.dni)
          {
            textMessage="Acceso Denegado";
            console.log("Esta en  OIS pero no tiene tamizaje"+detallest)
            flagt=1;
            var detallest="Esta persona no tiene Solicitud de Tamizaje";
          }
        }
        else
        {
          if(document!="001654671" && document!="001654672" && document!="001444147" && document!="003353989" )//documento sde prueba visualsat
          {
            textMessage="Acceso Denegado";
            console.log("No autorizado OIS");
            flagt=1
            var detallest=document+", No Registrado en OIS.";
          }
        }
      }



      if(dataRiesgo.length>0)//no pasa de ninguna manera si es de risgo
        {
          flagt=1;
           textMessage="Acceso Denegado";
           var detallest="Persona en Lista de Riesgo"
         
          name=dataRiesgo[0].name?toCapitalize(dataRiesgo[0].name):'';
        }
       
        if(flagt==1)//no se permite el ingreso
        {

          $("#status").html('<div ><i class="fa fa-circle text-danger"></i><label style="margin-left:5px">Acceso Denegado</label></div>')
          $("#statusdetails").html(`${detallest}`)
          return;
        }


        if(attention_date && (diaspass>10||covid_test==3) && covid_test!=7 )//se calcula tiempo de la ultima fecha de tamizaje------------------------------------------------------------------------
        {
          $("#status").html(`<div ><i class="fa fa-circle text-orange"></i><label style="margin-left:5px">${textMessage}</label></div>` )
          $("#statusdetails").html(`Deberá pasar por tópico antes del ingreso a Planta. Retener fotocheck y devolver al finalizar Tamizaje.`)
        }
        else
        {
         
          var now=new Date();
          var nowdesde=`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} 00:00`;
          var nowhasta=`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} 23:59`;

          var fe=fecha.split('/')
          //console.log(new Date(nowdesde),new Date(fe[2]+'-'+fe[1]+'-'+fe[0]+' 23:59'),new Date(nowhasta))
          if(covid_test==1 && check_in==0 && (new Date(fe[2]+'-'+fe[1]+'-'+fe[0]+' 10:59')>new Date(nowdesde)&&new Date(fe[2]+'-'+fe[1]+'-'+fe[0]+' 10:59')<=new Date(nowhasta)) )//validacion de dia de la cita
          {
            $("#status").html(`<div ><i class="fa fa-circle text-yellow"></i><label style="margin-left:5px">${textMessage}</label></div>` )
            $("#statusdetails").html(`Debe dirigirse al Tópico para el Alta Médica`)
          }
          else{

            $("#status").html(`<div ><i class="fa fa-circle text-success"></i><label style="margin-left:5px">${textMessage}</label></div>` )
            $("#statusdetails").html(`${detallest}`)
          }

        }


      if (check_in==1 || status ) 
      {
        $("#btnValidateIn").hide();
        $("#butEditBlack").show();
      }
      else
      {
        $("#btnValidateIn").show();
        
      }

      if(covid_test==1 && status)
      {
        
        statusColor ="statusPperDatostx";
        var textStatus="Pendiente";
        
      }
     
      else
      {
        if(status)
        {
          var textStatus="Vetado";
          statusColor ="text-danger";
        }
        else
        {
          var textStatus="Habilitado";
          statusColor ="statusPperCoursetx";
        }
        
      }

      if (check_in==0 || status ) 
      {
        $("#butEditBlack").hide();
        
      }
      


     





      if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_COVIDSEGURIDAD" || getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_SEGURIDAD" || getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_GARITA")//si es seguridad no se muestra solicitud de tamizaje
      {
        if(check_in==1)
        {
          $("#btnValidateOut").show();
        }
      }
    
      if(check_in==1)
      {
          $("#tx_temoOUTdiv").show();
          $("#tx_tempINdiv").hide();
      }
      else{
        $("#tx_temoOUTdiv").hide();
        $("#tx_tempINdiv").show();
      }
     
    
    
    
     
    }
    var checkRegister = 0;
    var confirmSaveCheckInCovid19 = function(enter){

      if(checkRegister==0)
      {
        checkRegister = 1;
        setTimeout(function(){checkRegister = 0},5000);
        var temp1 = $("#tx_tempIN").val();
        var temp2 = $("#tx_tempIN_lg").val();
        
        if((temp1>=constantes.temperatureMax || temp2>=constantes.temperatureMax) && enter==1){
          swal("Alerta","Persona con temperatura muy elevada. No puede ingresar","error");
        }
        else
        {
          var val =$("#tx_docum").val();
          var name_company = $("#hid_name_company").val();      
         /*  if(name_company.toLowerCase() != "tasa" &&  enter==1 && val!="001654671" && val!="001654672" && val!="001444147" && val!="003353982" )
          {
            //return;

            checkOisSeguridad(val,enter);
          }
          else */
            console.log("Verificando....")
            validatedni2(enter);
        }
      }
      
    }
    var confirmAuthorizedCovid19 = function(val)
    {

      if(val==0)//denegar acceso
      {  
     

      

      swal({
        title: "Negar Ingreso",
        text: "¿Está seguro que desea negar el ingreso?",        
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn-danger btn-sm",
        confirmButtonText: "Si",
        cancelButtonText: "No",
        closeOnConfirm: true
      },
      function(){    

        var data = {
         
          detalle: detalle
          ,fecha:fecha
          ,motivo:motivo
        }
     

                var option ="accessDenegate";
   
              $("#splashLoading").show();
                var url = apiurlblacklist+"/api/Post-Blacklist-User?code="+postblacklistusercode+"&httpmethod="+option+"&id="+idEdit;                   
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
                                      
                        swal({
                          title: "Acceso Negado",
                          text: data.message,
                          type: "success",
                          timer:3000,
                          showCancelButton: false,
                          confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
                          confirmButtonText: "De acuerdo",
                          closeOnConfirm: false
                        });
                       
                       
                       
                        $("#modalNonAuthorized").modal("hide");
                        tableBlackList();
                      
                    
                    setTimeout(function(){
                        $("#splashLoading").fadeOut();
                    },500);
                }).fail( function( jqXHR, textStatus, errorThrown ) {
                  setTimeout(function(){
                    $("#splashLoading").fadeOut();
                  },500);
                });
    
      
      });
      
    }
    else{//registrar ntrada
      /* var detalle=$("#tx_temperature").val();
      var flag=0;
      if(detalle==""){ flag=1;}
      

      if(flag==1)
      {
        swal({
          title: "Ingresar Datos",
          text:"No se han ingresado los campos requeridos",
          type: "error",
          showCancelButton: false,
          confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
          confirmButtonText: "De acuerdo",
          closeOnConfirm: false
        });
        return;
      }
      */
      
       saveCheckInCovid19($("#ideditseleted").val(),$("#enterselected").val()); 
    }
      
    }
var confirmNoauthorizedCovid19=function(enter,id)
{
  $("#modalEditBlacklist").modal('hide');
  $("#modalNonAuthorized").modal('show');

 $("#ideditseleted").val(id)
 $("#enterselected").val(enter)
  
 
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

    var validatedni2 = function (enter)
    {
      showLoading();
      saveCheckInCovid19(idEdit,enter); 
          
    }
    
    
    var saveCheckInCovid19 = function(id,enter,temp){ 
      //return; <input type="hidden" id="hid_is_collaborator_aforo" name="hid_is_collaborator_aforo" value="${flag_colaborator_aforo}">
      var is_collaborator       = $("#hid_is_collaborator_aforo").val();//
      console.log("Es colaborador: "+is_collaborator);
      showLoading();
      if(temp)
        var temperature=temp;
      else 
        var temperature=  $("#tx_temperature").val();

      if(enter==1 && $("#tx_tempIN")[0])//temperatura mobile
      {
        var temperature= "";
        if($("#tx_tempIN").val().trim().length>0)
          temperature = $("#tx_tempIN").val();
      }
      if(enter==1 && $("#tx_tempIN_lg")[0])//temperatura mobile
      {
        var temperature= "";        
        if($("#tx_tempIN_lg").val().trim().length>0)
          temperature = $("#tx_tempIN_lg").val();
      }

      if(enter==0 && $("#tx_temoOUT")[0])//temperatura mobile
      {
        var temperature=  "";
        if($("#tx_temoOUT").val().trim().length>0)
          temperature = $("#tx_temoOUT").val();        
      }

      if(enter==0 && $("#tx_temoOUT_lg")[0])//temperatura mobile
      {
        var temperature=  "";        
        if($("#tx_temoOUT_lg").val().trim().length>0)
          temperature = $("#tx_temoOUT_lg").val();
      }
      temperature=temperature?temperature:'0';  
     
     var identity_document  = $("#tx_docum").val();     
     var created_by         = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
     var action             = enter;

     location=getCookie("vtas_sede"+sessionStorage.tabVisitasa);
     var param         = "&id="+(id!=undefined?id:0)+"&enter="+enter+"&temperature="+temperature+"&location="+location+"&area="+(area!=undefined?area:0)+"&action="+action+"&created_by="+created_by+"&identity_document="+identity_document+"&is_collaborator="+is_collaborator;     
      var url = apiurlblacklist+"/api/Post-Blacklist-User?code="+postblacklistusercode+"&httpmethod=checkincovid"+param;
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
        hideLoading();     
        $("#modalNonAuthorized").modal("hide");
       
            if( $("#headerFormCovid")[0])
            $("#headerFormCovid").css({background:'#039be0'})


            swal({
              title:"Registro",
              text: "Operación Exitosa",
              type: "success",
              showCancelButton: false,
              timer:1000,
              confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
              confirmButtonText: "De acuerdo",
              closeOnConfirm: false
            });


            if(!$("#hid_mobile_temp")[0])
            {
               tableBlackList();
            }
            else{

              $("#butRequesExam").hide();
              $("#temperatureUSer").show();
              setTimeout(function(){
                handlerUrlhtml('contentGlobal','view/covidSecuryMobile.html');
              },1000)
              

            }
        $("#modalEditBlacklist").modal("hide");
      });  
    }

    var verificarConclusion = function(){
     
      //---------------------------------------------------
    //-------------------FORMATO NUEVO-------------------

      var fiebre              = $('#chb_fiebre'); 
      var tosSeca             = $('#chb_tos_seca');  
      var dificultadRespirar  = $('#chb_dificulta_respirar');  
      var dolorGarganta       = $('#chb_dolor_garganta');  
      var congestionNasal     = $('#chb_congecion_nasal');
      var fatiga              = $('#chb_fatiga');
      var escalofrio          = $('#chb_escalofrio');     
      var nauseas             = $('#chb_nauseas_vomito');
      var diarrea             = $('#chb_diarrea');
      var dolorCabeza         = $('#chb_dolor_cabeza'); 
      var dolorMusculo        = $('#chb_dolor_musculo'); 

      var examenFisico        = $('#chb_examen_fisico'); 
      var otros               = $('#chb_otros'); 


      var fechaSintomas       = $('#tx_fecha_inicio_sintomas').val(); 
      //----------------------------------------------------------
      var rbContactoPersona   = $('input:radio[name=rb_contacto_persona]:checked');
      var entornoFamiliar     = $('#chb_entorno_familiar');
      var entornoLaboral      = $('#chb_entorno_laboral');
      var entornoSalud        = $('#chb_entorno_salud');
      var arrayEntorno        = [];
      //----------------------------------------------------------
      //----------------------------------------------------------
      var rbFueraPais         = $('input:radio[name=rb_fuera_pais]:checked');
      var pais                = $("#sel_pais_retorto").val();
      var fechaRetorno        = $("#tx_fecha_retorno").val();
      //----------------------------------------------------------
      //----------------------------------------------------------
      var rbDiferenteDistrito = $('input:radio[name=rb_distrito]:checked');
      var distrito            = $('#sel_distrito').val();
      //var tipoTrabajo         = $('#sel_tipo_trabajo').val();
      //----------------------------------------------------------
      //----------------------------------------------------------
      //factores de riesgos
      var obesidad            = $('#chb_obesidad');
      var enfermedadPulmunar  = $('#chb_enfermedad_pulmunar');
      var diabete             = $('#chb_diabete');
      var impertension        = $('#chb_impertension');
      var mayor60ano          = $('#chb_mayor_60_ano');
      var gestante            = $('#chb_gestante');
      var arrayFactorRiesgo   = [];
      //----------------------------------------------------------
      //----------------------------------------------------------
      var adultoMayor         = $('#chb_adulto_mayor'); 
      var nonio               = $('#chb_nino'); 
      var chb_gestante_2      = $('#chb_gestante_2');
      var familiarEnfermedad  = $('#chb_familiar_enfermedad_cronica');
      var arrayMiemmbrosFamiliar = [];
      //-----------------------------------------------------------
      //-----------------------------------------------------------
      var cantPersona         = $('#tx_cant_persona').val();
      //-----------------------------------------------------------
      var store_sintomas_total  = 0;
      var cant_sintomas         = 0; 
      var store_factor_riesgo   = 0;
      //-----------------------------------------------------------
      //
      var arraySintomas = [];
      //-----------------------------------------------------------
      //sumamos los sintomas seleccionados   
      //console.log(fiebre.is(":checked"));
      if(fiebre.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(fiebre.data("score"));
        cant_sintomas++; 
        arraySintomas.push(fiebre.val());
       
      }
      if(dificultadRespirar.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(dificultadRespirar.data("score"));
        cant_sintomas++;
        arraySintomas.push(dificultadRespirar.val());
        
      }
      if(tosSeca.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(tosSeca.data("score"));
        cant_sintomas++;
        arraySintomas.push(tosSeca.val());
        
      }
      if(dolorGarganta.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(dolorGarganta.data("score"));
        cant_sintomas++;
        arraySintomas.push(dolorGarganta.val());
       
      }
      if(congestionNasal.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(congestionNasal.data("score"));
        cant_sintomas++;
        arraySintomas.push(congestionNasal.val());
        
      }
      if(fatiga.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(fatiga.data("score"));
        cant_sintomas++;
        arraySintomas.push(fatiga.val());
        
      }
      if(escalofrio.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(escalofrio.data("score"));
        cant_sintomas++;
        arraySintomas.push(escalofrio.val());
       
      }
      if(nauseas.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(nauseas.data("score"));
        cant_sintomas++;
        arraySintomas.push(nauseas.val());
       
      }
      if(diarrea.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(diarrea.data("score"));
        cant_sintomas++;
        arraySintomas.push(diarrea.val());
       
      }
      if(dolorCabeza.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(dolorCabeza.data("score"));
        cant_sintomas++;
        arraySintomas.push(dolorCabeza.val());        
      }
      if(dolorMusculo.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(dolorMusculo.data("score"));
        cant_sintomas++;
        arraySintomas.push(dolorMusculo.val());
       
      }
      if(examenFisico.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(examenFisico.data("score"));
        cant_sintomas++;
        arraySintomas.push(examenFisico.val());       
      }
      if(otros.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(otros.data("score"));
        cant_sintomas++;
        arraySintomas.push(otros.val());       
      }
      
      //-------------------------------------------------------
      //-------------------------------------------------------
      //sumamos factores de riegos
      //console.log(fiebre.data("score"), obesidad.data("score"));
      if(obesidad.is(":checked")) {
        store_factor_riesgo +=obesidad.data("score");
        arrayFactorRiesgo.push(obesidad.val());
      }
      if(enfermedadPulmunar.is(":checked")){
        store_factor_riesgo +=enfermedadPulmunar.data("score");
        arrayFactorRiesgo.push(enfermedadPulmunar.val());
      }
      if(diabete.is(":checked")){
        store_factor_riesgo +=diabete.data("score");
        arrayFactorRiesgo.push(diabete.val());
      }
      if(impertension.is(":checked")){
        store_factor_riesgo +=impertension.data("score");
        arrayFactorRiesgo.push(impertension.val());
      }
      if(mayor60ano.is(":checked")){
        store_factor_riesgo +=mayor60ano.data("score");
        arrayFactorRiesgo.push(mayor60ano.val());
      }
      if(gestante.is(":checked")){
        store_factor_riesgo +=gestante.data("score");
        arrayFactorRiesgo.push(gestante.val());
      }
      //----------------------------------------------------

      //----------------------------------------------------
      if(adultoMayor.is(":checked")){
        arrayMiemmbrosFamiliar.push(adultoMayor.val());
      }
      if(nonio.is(":checked")){
        arrayMiemmbrosFamiliar.push(nonio.val());
      }
      if(chb_gestante_2.is(":checked")){
        arrayMiemmbrosFamiliar.push(chb_gestante_2.val());
      }
      if(familiarEnfermedad.is(":checked")){
        arrayMiemmbrosFamiliar.push(familiarEnfermedad.val());
      }

      //----------------------------------------------------
      //coclusión 1
      var conclusion1 = "Caso no sospechoso";
      var conclusion2 = "Baja Posibilidad de evolución no favorable";
      var encuestaFoo = 0;
      var chEvolucion = 0; 
      conclusion1 = "Caso no sospechoso";
      selectedFilterStatus(7);

      
      $("#col_observacion_vetado").hide();
      if(($("#sel_covidotrosmotivos").val()!=0 && $("#sel_covidotrosmotivos").val()!=null)||(cant_sintomas>=1)||($("#sel_statusFic").val()==1||$("#sel_statusFic").val()==3))
      {

        conclusion1 = "Caso Sospechoso";
        encuestaFoo = 1;

        selectedFilterStatus(8);
        $("#col_observacion_vetado").show();

       
      }

      $("#sel_sintomalogia").val(1);
      if(cant_sintomas>=1)
      {
        $("#sel_sintomalogia").val(2);
      }
      
      

      if($("#sel_extend_reposo").val()>0)
      {
        selectedFilterStatus(8);
      }

      if((store_sintomas_total+store_factor_riesgo) >=1 && (store_sintomas_total+store_factor_riesgo)<=8){
        conclusion2 ="Baja Posibilidad de evolución no favorable";
        chEvolucion = 0;
      }
      if((store_sintomas_total+store_factor_riesgo) >=9){
        conclusion2 ="Alta Posibilidad de evolución no favorable";
        chEvolucion=1;
        selectedFilterStatus(8);
      }

      $("#conlcusion1result").text(conclusion1?conclusion1:'Caso no sospechoso');//se coloca en resultado
      $("#conlcusion2result").text(conclusion2?conclusion2:'Baja Posibilidad de evolución no favorable');//se coloca en resultado

/*
      var evento1 ={ }
      var evento2 ={ }
      var evento3 ={ }
      var evento4 ={ }     
      
      if(encuestaFoo==1){//caso sospechoso
        evento1 = {          
          "descripcionEvento": "1",
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "",
          "iIdEstadoPaciente": "1",//
          "vcSintomatologia": "2",
          "vcResultado": "",
          "vcObservacion": tx_resultado          
        }
      }

      else if(encuestaFoo==0){//caso sospechoso
        evento1 = {          
          "descripcionEvento": "1",
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "",
          "iIdEstadoPaciente": "10",//
          "vcSintomatologia": "2",
          "vcResultado": "",
          "vcObservacion": tx_resultado          
        }
      } 

      if(sel_reagent==4){///REACTIVO IGM/IGG
        evento3 = {          
            "descripcionEvento": "3",
            "dtEvento": fechaNow,
            "vcMotivo": motivo,
            "vcOrigen": "",
            "iIdEstadoPaciente": "8",//REACTIVO IGM/IGG
            "vcSintomatologia": "2",
            "vcResultado": "",
            "vcObservacion": tx_resultado          
        }
      }
      if(sel_reagent==1){//NO REACTIVO
        evento3 = {          
            "descripcionEvento": "3",
            "dtEvento": fechaNow,
            "vcMotivo": motivo,
            "vcOrigen": "",
            "iIdEstadoPaciente": "8",//NO REACTIVO
            "vcSintomatologia": "2",
            "vcResultado": "",
            "vcObservacion": tx_resultado          
        }
      }
      if(sel_reagent==2){//REACTIVO IGM
        evento3 = {          
            "descripcionEvento": "3",
            "dtEvento": fechaNow,
            "vcMotivo": motivo,
            "vcOrigen": "",
            "iIdEstadoPaciente": "12",//REACTIVO IGM
            "vcSintomatologia": "2",
            "vcResultado": "",
            "vcObservacion": tx_resultado          
        }
      }

      if(sel_reagent==3){//REACTIVO IGG
        evento3 = {          
            "descripcionEvento": "3",
            "dtEvento": fechaNow,
            "vcMotivo": motivo,
            "vcOrigen": "",
            "iIdEstadoPaciente": "13",//REACTIVO IGG
            "vcSintomatologia": "2",
            "vcResultado": "",
            "vcObservacion": tx_resultado          
        }
      }

      if(parseFloat(temperature)>=35 && parseFloat(temperature)<=36.7)//
      {
        evento2 = {
          "descripcionEvento": "2",//TEMPERATURA
          "dtEvento":fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "",
          "iIdEstadoPaciente": "6",//NORMAL TEMPERATURA
          "vcSintomatologia": "2",
          "vcResultado": temperature,
          "vcObservacion": tx_resultado//""
        }
      }
      if(parseFloat(temperature)>36.7){
        evento2 = {
          "descripcionEvento": "2",//TEMPERATURA
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "",
          "iIdEstadoPaciente": "7",//ANORMAL TEMPERATURA
          "vcSintomatologia": "2",
          "vcResultado": temperature,
          "vcObservacion": tx_resultado//""
        }
      }
      if(sel_statusmolec =="1"){
        evento4 = {
          "descripcionEvento": "4",//TEMPERATURA
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "",
          "iIdEstadoPaciente": "4",//POSITIVO MOLECULAR
          "vcSintomatologia": "2",
          "vcResultado": temperature,
          "vcObservacion": tx_resultado//""
        }
      }
      else if(sel_statusmolec =="0"){
        evento4 = {
          "descripcionEvento": "4",//TEMPERATURA
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "",
          "iIdEstadoPaciente": "5",//NEGATIVO MOLECULAR
          "vcSintomatologia": "2",
          "vcResultado": temperature,
          "vcObservacion": tx_resultado//""
        }
      }
      else if(sel_statusmolec =="2"){
        evento4 = {
          "descripcionEvento": "4",//TEMPERATURA
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "",
          "iIdEstadoPaciente": "14",//PENDIENTE MOLECULAR
          "vcSintomatologia": "2",
          "vcResultado": temperature,
          "vcObservacion": tx_resultado//""
        }
      }
      //----------------------------------------------------------------
      var stringArraySintomas = arraySintomas.toString();
          stringArraySintomas = stringArraySintomas.replace(/,/g,'|');///replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
      //----------------------------------------------------------------
      var distritoVistadoText = $( "#sel_distrito option:selected" ).text();
      //----------------------------------------------------------------
      var stringArrayFactorRiesgo = arrayMiemmbrosFamiliar.toString();
          stringArrayFactorRiesgo = stringArrayFactorRiesgo.replace(/,/g,'|');
      //----------------------------------------------------------------      
      var stringArrayEnfermedad   = arrayFactorRiesgo.toString();
          stringArrayEnfermedad   = stringArrayEnfermedad.replace(/,/g,'|');
      //----------------------------------------------------------------          
            
      var json = {
        "dtEnvio": fechaNow,
        "pacientes": 
        [
          {
            "tipoDocumento": "DNI",
            "dniPaciente": identityDocument,
            "dFechaNacimiento": $("#txr_tx_edad").val(),
            "vcSexo": sexo,//"M",
            "vcCompania": companyname,// "20100971772",
            "vcContrata": companyname,//"20100971772",
            "vcUnidad": sede,//"0062",
            "vcPuesto": tx_ocupacion,//"",
            "vcArea": area,//"",
            "apellidoPaterno": namePersona ,//"ARCOS",
            "apellidoMaterno": namePersona ,//"ROMUCHO",
            "nombres": namePersona, //"HENRY MANUEL",
            "nacionalidad":nacionalidad,//"",
            "vcUbigeo": departamento+provincia+distrito,//"010105",
            "vcDireccionActual": direccion,//"",
            "vcCorreo": email,///"",
            "vcCelular":celular,//"",
            "vcFijo": telefono,//"",           
            "vcNombreFamiliar": datoFamiliar,
            "vcCelularFamiliar": telefonoContacto,
            "vcFijoFamiliar": telefonoContacto,
            "vcTipoTrabajo": tipoTrabajo,
            "vcActividadEconomiac": actividadEconomica,
            "F00":
            [
              {
                "biIdF00": 0,
                "preguntaSintomas": stringArraySintomas,//"Fiebre|Dolor de Garganta",
                "FechaInicioSintomas": fechaSintomas,
                "EntornoContacto": rbContactoPersona.val(),
                "AlternativaEntornoContacto": "EntornoFamiliar",
                "ViajoFueraPais": rbFueraPais.val(),
                "QuePais": pais,
                "RetornoPais": fechaRetorno,
                "DesplazoDistritos": rbDiferenteDistrito.val(),
                "QueDistrito": distritoVistadoText,
                "Enfermedad": stringArrayEnfermedad,//arrayFactorRiesgo
                "OtrasEnfermedades": "",
                "grupoRiesgo": stringArrayFactorRiesgo,
                "NroPersonasDomicilio": cantPersona,
                "score": store_sintomas_total+store_factor_riesgo,
                "conclusion1": conclusion1,
                "conclusion2": conclusion2
              }
            ],
            "eventos": 
            [ evento1,
              evento2,
              evento3,
              evento4
            ]
          }
        ]
      }
      console.log(JSON.stringify(json));
      */

    }

    var verificarFicha = function(){
     
      //---------------------------------------------------
    //-------------------FORMATO NUEVO-------------------

      var fiebre              = $('#chb_fiebre'); 
      var tosSeca             = $('#chb_tos_seca');  
      var dificultadRespirar  = $('#chb_dificulta_respirar');  
      var dolorGarganta       = $('#chb_dolor_garganta');  
      var congestionNasal     = $('#chb_congecion_nasal');
      var fatiga              = $('#chb_fatiga');
      var escalofrio          = $('#chb_escalofrio');     
      var nauseas             = $('#chb_nauseas_vomito');
      var diarrea             = $('#chb_diarrea');
      var dolorCabeza         = $('#chb_dolor_cabeza'); 
      var dolorMusculo        = $('#chb_dolor_musculo');      
      
      //-----------------------------------------------------------
      //sumamos los sintomas seleccionados   
      //console.log(fiebre.is(":checked"));
      if(fiebre.is(":checked")){
        $("#sel_statusFic").val("1").trigger("change");       
      }
      else if(dificultadRespirar.is(":checked")){
        $("#sel_statusFic").val("1").trigger("change"); 
        
      }
      else if(tosSeca.is(":checked")){
        $("#sel_statusFic").val("1").trigger("change"); 
        
      }
      else if(dolorGarganta.is(":checked")){
        $("#sel_statusFic").val("1").trigger("change"); 
      }
      else if(congestionNasal.is(":checked")){
        
        $("#sel_statusFic").val("1").trigger("change"); 
      }
      else if(fatiga.is(":checked")){
        $("#sel_statusFic").val("1").trigger("change"); 
        
      }
      else if(escalofrio.is(":checked")){
        
        $("#sel_statusFic").val("1").trigger("change"); 
      }
      else if(nauseas.is(":checked")){
        
        $("#sel_statusFic").val("1").trigger("change"); 
      }
      else if(diarrea.is(":checked")){
        $("#sel_statusFic").val("1").trigger("change"); 
       
      }
      else if(dolorCabeza.is(":checked")){
        $("#sel_statusFic").val("1").trigger("change"); 
      }
      else if(dolorMusculo.is(":checked")){
        $("#sel_statusFic").val("1").trigger("change"); 
      }
      else{
        $("#sel_statusFic").val("2").trigger("change"); //No realizado
      }      
    }

    var verificarFichaNoProgramado = function(){
      //---------------------------------------------------
    //-------------------FORMATO NUEVO-------------------

      var fiebre              = $('#txr_chb_fiebre'); 
      var tosSeca             = $('#txr_chb_tos_seca');  
      var dificultadRespirar  = $('#txr_chb_dificulta_respirar');  
      var dolorGarganta       = $('#txr_chb_dolor_garganta');  
      var congestionNasal     = $('#txr_chb_congecion_nasal');
      var fatiga              = $('#txr_chb_fatiga');
      var escalofrio          = $('#txr_chb_escalofrio');     
      var nauseas             = $('#txr_chb_nauseas_vomito');
      var diarrea             = $('#txr_chb_diarrea');
      var dolorCabeza         = $('#txr_chb_dolor_cabeza'); 
      var dolorMusculo        = $('#txr_chb_dolor_musculo');       
      
      //-----------------------------------------------------------
      //sumamos los sintomas seleccionados   
      //console.log(fiebre.is(":checked"));
      if(fiebre.is(":checked")){
        $("#selr_status").val("1").trigger("change");       
      }
      else if(dificultadRespirar.is(":checked")){
        $("#selr_status").val("1").trigger("change"); 
        
      }
      else if(tosSeca.is(":checked")){
        $("#selr_status").val("1").trigger("change"); 
        
      }
      else if(dolorGarganta.is(":checked")){
        $("#selr_status").val("1").trigger("change"); 
      }
      else if(congestionNasal.is(":checked")){
        
        $("#selr_status").val("1").trigger("change"); 
      }
      else if(fatiga.is(":checked")){
        $("#selr_status").val("1").trigger("change"); 
        
      }
      else if(escalofrio.is(":checked")){
        
        $("#selr_status").val("1").trigger("change"); 
      }
      else if(nauseas.is(":checked")){
        
        $("#selr_status").val("1").trigger("change"); 
      }
      else if(diarrea.is(":checked")){
        $("#selr_status").val("1").trigger("change"); 
       
      }
      else if(dolorCabeza.is(":checked")){
        $("#selr_status").val("1").trigger("change"); 
      }
      else if(dolorMusculo.is(":checked")){
        $("#selr_status").val("1").trigger("change"); 
      }
      else{
        $("#selr_status").val("2").trigger("change"); //No realizado
      }      
    }

    var verificarFichaHistory = function(){
    // alert("sssss");
      //---------------------------------------------------
    //-------------------FORMATO NUEVO-------------------

      var fiebre              = $('#chbr_fiebre_history'); 
      var tosSeca             = $('#chbr_tos_seca_history');  
      var dificultadRespirar  = $('#chbr_dificulta_respirar_history');  
      var dolorGarganta       = $('#chbr_dolor_garganta_history');  
      var congestionNasal     = $('#chbr_congecion_nasal_history');
      var fatiga              = $('#chbr_fatiga_history');
      var escalofrio          = $('#chbr_escalofrio_history');
      var nauseas             = $('#chbr_nauseas_vomito_history');
      var diarrea             = $('#chbr_diarrea_history');
      var dolorCabeza         = $('#chbr_dolor_cabeza_history'); 
      var dolorMusculo        = $('#chbr_dolor_musculo_history');           
      //-----------------------------------------------------------
      //sumamos los sintomas seleccionados   
      //console.log(fiebre.is(":checked"));
      if(fiebre.is(":checked")){
        $("#selr_statusFic_history").val("1").trigger("change");       
      }
      else if(dificultadRespirar.is(":checked")){
        $("#selr_statusFic_history").val("1").trigger("change"); 
        
      }
      else if(tosSeca.is(":checked")){
        $("#selr_statusFic_history").val("1").trigger("change"); 
        
      }
      else if(dolorGarganta.is(":checked")){
        $("#selr_statusFic_history").val("1").trigger("change"); 
      }
      else if(congestionNasal.is(":checked")){        
        $("#selr_statusFic_history").val("1").trigger("change"); 
      }
      else if(fatiga.is(":checked")){
        $("#selr_statusFic_history").val("1").trigger("change");         
      }
      else if(escalofrio.is(":checked")){
        
        $("#selr_statusFic_history").val("1").trigger("change"); 
      }
      else if(nauseas.is(":checked")){
        
        $("#selr_statusFic_history").val("1").trigger("change"); 
      }
      else if(diarrea.is(":checked")){
        $("#selr_statusFic_history").val("1").trigger("change");        
      }
      else if(dolorCabeza.is(":checked")){
        $("#selr_statusFic_history").val("1").trigger("change"); 
      }
      else if(dolorMusculo.is(":checked")){
        $("#selr_statusFic_history").val("1").trigger("change"); 
      }
      else{
        $("#selr_statusFic_history").val("2").trigger("change"); //No realizado
      }      
    }


    var verificarConclusionNoProgramado = function(){
      //---------------------------------------------------
      //-------------------FORMATO NUEVO------------------- 
      var tx_ocupacion = $("#txr_ocupacion").val();
      var tx_temperatura = $("#txr_temperatura").val();
      var tx_antecedentes = $("#txr_antecedentes").val();
      var sel_status = $("#selr_status").val();
      var tx_resultado = $("#txr_resultado").val();
      var nameperson = $("#txr_nomape").val();
      var identity_document = $("#txr_docum").val();
      var vetoStatus = statusmed;
      var reason = $("#txr_motivo_vetado").val();
      var createdBy = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
      var id_area = $("#selr_area").val();
      var name_area = $("#selr_area  option:selected").text();
      var id_location = $("#selr_local").val();
      var name_location = $("#selr_local  option:selected").text();
      var name_company = $("#txr_company_name").val();
      var id_company = $("#txr_company_id").val();
      var ruc_company = $("#txr_company_ruc").val();
      var fecha = moment().format('D/MM/YYYY');
      var sel_statusrap = $("#selr_statusrap").val();
      var sel_statusmolec = $("#selr_statusmolec").val();
      var sel_reagent = $("#selr_reagent").val();
      var attention_date = $('#txr_fecha').val();
      var hhmm = moment().add(5, 'hours').format('HH:mm:ss');
      var now = moment(attention_date,"DD/MM/YYYY").format('YYYY-MM-DD');//moment(attention_date,'DD/MM/YYYY').format('MM/DD/YYYY');
      attention_date = now+" "+hhmm;
      //---------------------------------------------------
      //-------------------FORMATO NUEVO-------------------
      //alert("ssssssssss");     
      var namePersona         = nameperson;//$('#tx_name_per').val();       
      var arrayNamePerson     =  namePersona.split(" ");
      var apellidoPaterno     = "";
      var apellidoMaterno     = "";
      var fullName            = "";
      if(arrayNamePerson.length==2) {
        apellidoPaterno = arrayNamePerson[1];
        fullName        = arrayNamePerson[0];
      }
      else if(arrayNamePerson.length==3) {
        apellidoPaterno = arrayNamePerson[1];
        apellidoMaterno = arrayNamePerson[2];
        fullName        = arrayNamePerson[0];
      }
      else if(arrayNamePerson.length==4) {
        apellidoPaterno = arrayNamePerson[2];
        apellidoMaterno = arrayNamePerson[3];
        fullName        = arrayNamePerson[0]+" "+arrayNamePerson[1];
      }
      else if(arrayNamePerson.length==5) {
        apellidoPaterno = arrayNamePerson[3];
        apellidoMaterno = arrayNamePerson[4];
        fullName        = arrayNamePerson[0]+" "+arrayNamePerson[1]+" "+arrayNamePerson[2];
      }
      else if(arrayNamePerson.length==6) {
        apellidoPaterno = arrayNamePerson[4];
        apellidoMaterno = arrayNamePerson[5];
        fullName        = arrayNamePerson[0]+" "+arrayNamePerson[1]+" "+arrayNamePerson[2]+" "+arrayNamePerson[3];
      }
      
      var identityDocument    = identity_document;//$('#tx_identity_document').val(); 
      var sede                = location;//$('#sel_sede').val(); 
      var area                = $("#hid_id_area").val();
      var embarcacion         = $('#txr_sel_embarcacion').val(); 
      var name_embarcacion    = $('#txr_sel_embarcacion').text(); 
      var empleador           = $('#txr_tx_empleador').val(); 
      var puestoTrabajo       = $('#txr_tx_puesto_trabajo').val(); 
      var companyname         = $('#txr_company').text();
      var tipoTrabajo         = $('#txr_tx_job_type').val(); 
      var name_tipoTrabajo    = $('#txr_tx_job_type').text(); 
      var actividadEconomica  = $('#txr_tx_actividad_economica').val();
      var nacionalidad        = $('#txr_tx_nacionalidad').val();
      var departamento        = $('#txr_sel_departamento_res').val();
      var provincia           = $('#txr_sel_provincia_res').val();
      var distrito            = $('#txr_sel_distrito_res').val();
      var direccion           = $('#txr_tx_direccion_res').val();
      var email               = $('#txr_tx_email').val();
      var celular             = $('#txr_tx_celular').val();
      var telefono            = $('#txr_tx_telefono').val();
      var datoFamiliar        = $('#txr_tx_dato_familiar').val();
      var telefonoContacto    = $('#txr_tx_celular_contacto').val();
      var motivo              = $('#txr_sel_motivo').val();
      var temperature         = tx_temperatura;//$('#tx_temperature').val(); 
      var sexo                = $('#txr_tx_sexo').val(); 
      var fechaNacimiento    = $('#txr_tx_edad').val(); 
      //---------------------------------------------------------      

      var fiebre              = $('#txr_chb_fiebre'); 
      var tosSeca             = $('#txr_chb_tos_seca');  
      var dificultadRespirar  = $('#txr_chb_dificulta_respirar');  
      var dolorGarganta       = $('#txr_chb_dolor_garganta');  
      var congestionNasal     = $('#txr_chb_congecion_nasal');
      var fatiga              = $('#txr_chb_fatiga');
      var escalofrio          = $('#txr_chb_escalofrio');     
      var nauseas             = $('#txr_chb_nauseas_vomito');
      var diarrea             = $('#txr_chb_diarrea');
      var dolorCabeza         = $('#txr_chb_dolor_cabeza'); 
      var dolorMusculo        = $('#txr_chb_dolor_musculo'); 
      var fechaSintomas       = $('#txr_tx_fecha_inicio_sintomas').val(); 

      var examenFisico        = $('#txr_chb_dolor_musculo'); 
      var otros               = $("#txr_chb_otros");
      //----------------------------------------------------------
      var rbContactoPersona   = $('input:radio[name=txr_rb_contacto_persona]:checked');
      var entornoFamiliar     = $('#txr_chb_entorno_familiar');
      var entornoLaboral      = $('#txr_chb_entorno_laboral');
      var entornoSalud        = $('#txr_chb_entorno_salud');
      var arrayEntorno        = [];
      //----------------------------------------------------------
      //----------------------------------------------------------
      var rbFueraPais         = $('input:radio[name=txr_rb_fuera_pais]:checked');
      var pais                = $("#txr_sel_pais_retorto").val();
      var fechaRetorno        = $("#txr_tx_fecha_retorno").val();
      //----------------------------------------------------------
      //----------------------------------------------------------
      var rbDiferenteDistrito = $('input:radio[name=txr_rb_distrito]:checked');
      var distrito            = $('#txr_sel_distrito_res').val();
      //var tipoTrabajo         = $('#sel_tipo_trabajo').val();
      //----------------------------------------------------------
      //----------------------------------------------------------
      //factores de riesgos
      var obesidad            = $('#txr_chb_obesidad');
      var enfermedadPulmunar  = $('#txr_chb_enfermedad_pulmunar');
      var diabete             = $('#txr_chb_diabete');
      var impertension        = $('#txr_chb_impertension');
      var mayor60ano          = $('#txr_chb_mayor_60_ano');
      var gestante            = $('#txr_chb_gestante');
      var arrayFactorRiesgo   = [];
      //----------------------------------------------------------
      //----------------------------------------------------------
      var adultoMayor         = $('#txr_chb_adulto_mayor'); 
      var nonio               = $('#txr_chb_nino'); 
      var chb_gestante_2      = $('#txr_chb_gestante_2');
      var familiarEnfermedad  = $('#txr_chb_familiar_enfermedad_cronica');
      var arrayMiemmbrosFamiliar = [];
      //-----------------------------------------------------------
      //-----------------------------------------------------------
      var cantPersona         = $('#txr_tx_cant_persona').val();
      //-----------------------------------------------------------
      var store_sintomas_total  = 0;
      var cant_sintomas         = 0; 
      var store_factor_riesgo   = 0;
      //-----------------------------------------------------------
      var arraySintomas = [];
      //-----------------------------------------------------------
      //sumamos los sintomas seleccionados   
      //console.log(fiebre.is(":checked"));
     
      if(fiebre.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(fiebre.data("score"));
        cant_sintomas++; 
        arraySintomas.push(fiebre.val());
        console.log(parseInt(fiebre.data("score")),store_sintomas_total)
      }
      if(dificultadRespirar.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(dificultadRespirar.data("score"));
        cant_sintomas++;
        arraySintomas.push(dificultadRespirar.val());
        console.log(parseInt(dificultadRespirar.data("score")),store_sintomas_total)
      }
      if(tosSeca.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(tosSeca.data("score"));
        cant_sintomas++;
        arraySintomas.push(tosSeca.val());
        console.log(parseInt(tosSeca.data("score")),store_sintomas_total)
      }
      if(dolorGarganta.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(dolorGarganta.data("score"));
        cant_sintomas++;
        arraySintomas.push(dolorGarganta.val());
        console.log(parseInt(dolorGarganta.data("score")),store_sintomas_total)
      }
      if(congestionNasal.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(congestionNasal.data("score"));
        cant_sintomas++;
        arraySintomas.push(congestionNasal.val());
        console.log(parseInt(congestionNasal.data("score")),store_sintomas_total)
      }
      if(fatiga.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(fatiga.data("score"));
        cant_sintomas++;
        arraySintomas.push(fatiga.val());
        console.log(parseInt(fatiga.data("score")),store_sintomas_total)
      }
      if(escalofrio.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(escalofrio.data("score"));
        cant_sintomas++;
        arraySintomas.push(escalofrio.val());
        console.log(parseInt(escalofrio.data("score")),store_sintomas_total)
      }
      if(nauseas.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(nauseas.data("score"));
        cant_sintomas++;
        arraySintomas.push(nauseas.val());
        console.log(parseInt(nauseas.data("score")),store_sintomas_total)
      }
      if(diarrea.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(diarrea.data("score"));
        cant_sintomas++;
        arraySintomas.push(diarrea.val());
        console.log(parseInt(diarrea.data("score")),store_sintomas_total)
      }
      if(dolorCabeza.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(dolorCabeza.data("score"));
        cant_sintomas++;
        arraySintomas.push(dolorCabeza.val());
        console.log(parseInt(dolorCabeza.data("score")),store_sintomas_total)
      }
      if(dolorMusculo.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(dolorMusculo.data("score"));
        cant_sintomas++;
        arraySintomas.push(dolorMusculo.val());
        console.log(parseInt(dolorMusculo.data("score")),store_sintomas_total)
      }


      if(examenFisico.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(examenFisico.data("score"));
        cant_sintomas++;
        arraySintomas.push(examenFisico.val());       
      }
      if(otros.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(otros.data("score"));
        cant_sintomas++;
        arraySintomas.push(otros.val());       
      }

      //-------------------------------------------------------
      //-------------------------------------------------------
      //sumamos factores de riegos
      //console.log(fiebre.data("score"), obesidad.data("score"));
      if(obesidad.is(":checked")) {
        store_factor_riesgo +=obesidad.data("score");
        arrayFactorRiesgo.push(obesidad.val());
      }
      if(enfermedadPulmunar.is(":checked")){
        store_factor_riesgo +=enfermedadPulmunar.data("score");
        arrayFactorRiesgo.push(enfermedadPulmunar.val());
      }
      if(diabete.is(":checked")){
        store_factor_riesgo +=diabete.data("score");
        arrayFactorRiesgo.push(diabete.val());
      }
      if(impertension.is(":checked")){
        store_factor_riesgo +=impertension.data("score");
        arrayFactorRiesgo.push(impertension.val());
      }
      if(mayor60ano.is(":checked")){
        store_factor_riesgo +=mayor60ano.data("score");
        arrayFactorRiesgo.push(mayor60ano.val());
      }
      if(gestante.is(":checked")){
        store_factor_riesgo +=gestante.data("score");
        arrayFactorRiesgo.push(gestante.val());
      }
      //----------------------------------------------------
      //----------------------------------------------------
      if(adultoMayor.is(":checked")){
        arrayMiemmbrosFamiliar.push(adultoMayor.val());
      }
      if(nonio.is(":checked")){
        arrayMiemmbrosFamiliar.push(nonio.val());
      }
      if(chb_gestante_2.is(":checked")){
        arrayMiemmbrosFamiliar.push(chb_gestante_2.val());
      }
      if(familiarEnfermedad.is(":checked")){
        arrayMiemmbrosFamiliar.push(familiarEnfermedad.val());
      }

      //----------------------------------------------------
      //coclusión 1
      var conclusion1 = "Caso no sospechoso";
      var conclusion2 = "Baja Posibilidad de evolución no favorable";
      var encuestaFoo = 0;
      var chEvolucion = 0; 
      conclusion1 = "Caso no sospechoso";
      selectedFilterStatus(9);
      //console.log(cant_sintomas,rbContactoPersona.val(),rbFueraPais.val(),rbDiferenteDistrito.val());
      if(($("#sel_covidotrosmotivosnp").val()!=0 && $("#sel_covidotrosmotivosnp").val()!=null)||(cant_sintomas>=1 )||($("#selr_status").val()==1||$("#selr_status").val()==3)){
        //rbContactoPersona
        conclusion1 = "Caso Sospechoso";
        encuestaFoo = 1;
        selectedFilterStatus(10);

        
      } 

      $("#selr_sintomalogia").val(1);
      if(cant_sintomas>=1)
      {
        $("#selr_sintomalogia").val(2);
      }

      if((store_sintomas_total+store_factor_riesgo) >=1 && (store_sintomas_total+store_factor_riesgo)<=8){
        conclusion2 ="Baja Posibilidad de evolución no favorable";
        chEvolucion = 0;
      }
      if((store_sintomas_total+store_factor_riesgo) >=9 ){
        conclusion2 ="Alta Posibilidad de evolución no favorable";
        chEvolucion=1;
        selectedFilterStatus(10);
      }
      $("#txr_conlcusion1result").text(conclusion1);//se coloca en resultado
      $("#txr_conlcusion2result").text(conclusion2);//se coloca en resultado

      var fechaNow = moment().format("YYYY-MM-DD hh:mm:ss");
      var evento1 ={ }
      var evento2 ={ }
      var evento3 ={ }
      var evento4 ={ }     
      var array_eventos_send =[];
      var lugar_contagio     = "";
      if($("#sel_location_contagionp").val()!="0"){
        lugar_contagio = $("#sel_location_contagionp option:selected").text();
      }
      
      //$('#sel_motivo').val(); 
      if(encuestaFoo==1){//caso sospechoso
        evento1 = {
          "biIdHistoria": 0,         
          "descripcionEvento": "1",
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "1",//
          "vcSintomatologia": "2",
          "vcResultado": "CASO SOSPECHOSO",
          "vcObservacion": tx_resultado,
          "zonaContacto":lugar_contagio
        }
        array_eventos_send.push("cod_anexo1_natclar");
      }
      else if(encuestaFoo==0){//caso sospechoso
        evento1 = { 
          "biIdHistoria": 0,         
          "descripcionEvento": "1",
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "10",//
          "vcSintomatologia": "2",
          "vcResultado": "CASO NO SOSPECHOSO",
          "vcObservacion": tx_resultado,
          "zonaContacto":lugar_contagio          
        }
        array_eventos_send.push("cod_anexo1_natclar");
      }
      
      if(parseFloat(temperature)>=35 && parseFloat(temperature)<=36.7)//
      {
        evento2 = {
          "biIdHistoria": 0,
          "descripcionEvento": "2",//TEMPERATURA
          "dtEvento":fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "6",//NORMAL TEMPERATURA
          "vcSintomatologia": "2",
          "vcResultado": "NORMAL TEMPERATURA",
          "vcObservacion": tx_resultado,//""
          "zonaContacto":lugar_contagio
        }
        array_eventos_send.push("cod_anexo2_natclar");
      }
      if(parseFloat(temperature)>36.7){
        evento2 = {
          "biIdHistoria": 0,
          "descripcionEvento": "2",//TEMPERATURA
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "7",//ANORMAL TEMPERATURA
          "vcSintomatologia": "2",
          "vcResultado": "ANORMAL TEMPERATURA",
          "vcObservacion": tx_resultado,//""
          "zonaContacto":lugar_contagio
        }
        array_eventos_send.push("cod_anexo2_natclar");
      }

      if(sel_reagent=="4"){///REACTIVO IGM/IGG
        evento3 = {
            "biIdHistoria": 0,          
            "descripcionEvento": "3",
            "dtEvento": fechaNow,
            "vcMotivo": motivo,
            "vcOrigen": "VISI-TASA",
            "iIdEstadoPaciente": "8",//REACTIVO IGM/IGG
            "vcSintomatologia": "2",
            "vcResultado": "REACTIVO IGM/IGG",
            "vcObservacion": tx_resultado,
            "zonaContacto":lugar_contagio          
        }
        array_eventos_send.push("cod_anexo3_natclar");
      }
      else if(sel_reagent=="1"){//NO REACTIVO
        evento3 = { 
            "biIdHistoria": 0,         
            "descripcionEvento": "3",
            "dtEvento": fechaNow,
            "vcMotivo": motivo,
            "vcOrigen": "VISI-TASA",
            "iIdEstadoPaciente": "8",//NO REACTIVO
            "vcSintomatologia": "2",
            "vcResultado": "NO REACTIVO",
            "vcObservacion": tx_resultado,
            "zonaContacto":lugar_contagio          
        }
        array_eventos_send.push("cod_anexo3_natclar");
      }
      else if(sel_reagent=="2"){//REACTIVO IGM
        evento3 = {    
            "biIdHistoria": 0,      
            "descripcionEvento": "3",
            "dtEvento": fechaNow,
            "vcMotivo": motivo,
            "vcOrigen": "VISI-TASA",
            "iIdEstadoPaciente": "12",//REACTIVO IGM
            "vcSintomatologia": "2",
            "vcResultado": "REACTIVO IGM",
            "vcObservacion": tx_resultado,
            "zonaContacto":lugar_contagio          
        }
        array_eventos_send.push("cod_anexo3_natclar");
      }
      else if(sel_reagent=="3"){//REACTIVO IGG
        evento3 = {
            "biIdHistoria": 0,
            "descripcionEvento": "3",
            "dtEvento": fechaNow,
            "vcMotivo": motivo,
            "vcOrigen": "VISI-TASA",
            "iIdEstadoPaciente": "13",//REACTIVO IGG
            "vcSintomatologia": "2",
            "vcResultado": "REACTIVO IGG",
            "vcObservacion": tx_resultado,
            "zonaContacto":lugar_contagio          
        }
        array_eventos_send.push("cod_anexo3_natclar");
      }

      if(sel_statusmolec =="1"){
        evento4 = {
          "biIdHistoria": 0,
          "descripcionEvento": "4",//TEMPERATURA
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "4",//POSITIVO MOLECULAR
          "vcSintomatologia": "2",
          "vcResultado": "POSITIVO MOLECULAR",
          "vcObservacion": tx_resultado,//""
          "zonaContacto":lugar_contagio
        }
        array_eventos_send.push("cod_anexo4_natclar");
      }
      else if(sel_statusmolec =="0"){
        /*evento4 = {
          "biIdHistoria": 0,
          "descripcionEvento": "4",//TEMPERATURA
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "5",//NEGATIVO MOLECULAR
          "vcSintomatologia": "2",
          "vcResultado": "NEGATIVO MOLECULAR",
          "vcObservacion": tx_resultado,//""
          "zonaContacto":lugar_contagio
        }
        array_eventos_send.push("cod_anexo4_natclar");*/
      }
      else if(sel_statusmolec =="2"){
        /*evento4 = {
          "biIdHistoria": 0,
          "descripcionEvento": "4",//TEMPERATURA
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "14",//PENDIENTE MOLECULAR
          "vcSintomatologia": "2",
          "vcResultado": "PENDIENTE MOLECULAR",
          "vcObservacion": tx_resultado,//""
          "zonaContacto":lugar_contagio
        }
        array_eventos_send.push("cod_anexo4_natclar");*/
      }
      
      var eventos = [];
      if(JSON.stringify(evento1)!="{}")//vacío
        eventos.push(evento1);
      if(JSON.stringify(evento2)!="{}")//vacío
        eventos.push(evento2);
      if(JSON.stringify(evento3)!="{}")//vacío
        eventos.push(evento3);
      if(JSON.stringify(evento4)!="{}")//vacío
        eventos.push(evento4);
      //----------------------------------------------------------------
      var stringArraySintomas = arraySintomas.toString();
          stringArraySintomas = stringArraySintomas.replace(/,/g,'|');///replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
      //----------------------------------------------------------------      
      var distritoVistadoText = $( "#txr_sel_distrito option:selected" ).text();
      distritoVistadoText     = rbDiferenteDistrito.val()!="no"?distritoVistadoText:"";
      console.log(distritoVistadoText);
      //----------------------------------------------------------------
      var stringArrayFactorRiesgo = arrayMiemmbrosFamiliar.toString();
      console.log(arrayMiemmbrosFamiliar);
          stringArrayFactorRiesgo = stringArrayFactorRiesgo.replace(/,/g,'|');
      //----------------------------------------------------------------      
      var stringArrayEnfermedad   = arrayFactorRiesgo.toString();
          stringArrayEnfermedad   = stringArrayEnfermedad.replace(/,/g,'|');
      //----------------------------------------------------------------          
      //----------------------------------------------------------------         
      var stringArrayEntorno      = arrayEntorno.toString();
          stringArrayEntorno      = stringArrayEntorno.replace(/,/g,'|');
      //-----------------------------------------------------------------
      /*
      var json = {
        "dtEnvio": fechaNow,
        "pacientes": 
        [
          {
            "tipoDocumento": "DNI",
            "dniPaciente": identityDocument,
            "dFechaNacimiento": $("#txr_tx_edad").val(),
            "vcSexo": sexo,//"M",
            "vcCompania": "20100971772",//ruc_company,// "20100971772",
            "vcContrata": "20100971772",//ruc_company,//"20100971772",
            "vcUnidad": sede.toString(),//"0062",
            "vcPuesto": tx_ocupacion,//"",
            "vcArea": name_area,//"",
     
            "apellidoPaterno": apellidoPaterno ,//"ARCOS",
            "apellidoMaterno": apellidoMaterno ,//"ROMUCHO",
            "nombres": fullName, //"HENRY MANUEL",
            "nacionalidad":nacionalidad,//"",
            "vcUbigeo": departamento+provincia+distrito,//"010105",
            "vcDireccionActual": direccion,//"",
            "vcCorreo": email,///"",
            "vcCelular":celular,//"",
            "vcFijo": telefono,//"",           
            "vcNombreFamiliar": datoFamiliar,
            "vcCelularFamiliar": telefonoContacto,
            "vcFijoFamiliar": telefonoContacto,
            "vcTipoTrabajo": "Temporal",//tipoTrabajo,
            "vcActividadEconomiac": actividadEconomica,
            "F00":
            [
              {
                "biIdF00": 0,
                "preguntaSintomas": stringArraySintomas,//"Fiebre|Dolor de Garganta",
                "FechaInicioSintomas": fechaSintomas,
                "EntornoContacto": rbContactoPersona.val(),
                "AlternativaEntornoContacto": stringArrayEntorno, //aplicar este, faltó
                "ViajoFueraPais": rbFueraPais.val(),
                "QuePais": pais,
                "RetornoPais": fechaRetorno,
                "DesplazoDistritos": rbDiferenteDistrito.val(),
                "QueDistrito": distritoVistadoText,
                "Enfermedad": stringArrayEnfermedad,//arrayFactorRiesgo
                "OtrasEnfermedades": "",
                "grupoRiesgo": stringArrayFactorRiesgo,
                "NroPersonasDomicilio": cantPersona,
                "score": store_sintomas_total+store_factor_riesgo,
                "conclusion1": conclusion1,
                "conclusion2": conclusion2
              }
            ],
            "eventos":eventos
          }
        ]
      }

      console.log(JSON.stringify(json));
      console.log(json);*/
    }

    var verificarConclusionHistory = function(){
      console.log("Entro");
      //---------------------------------------------------
    //-------------------FORMATO NUEVO-------------------
      //alert("ssssssssss");     
      
      var fiebre              = $('#chbr_fiebre_history'); 
      var tosSeca             = $('#chbr_tos_seca_history');  
      var dificultadRespirar  = $('#chbr_dificulta_respirar_history');  
      var dolorGarganta       = $('#chbr_dolor_garganta_history');  
      var congestionNasal     = $('#chbr_congecion_nasal_history');
      var fatiga              = $('#chbr_fatiga_history');
      var escalofrio          = $('#chbr_escalofrio_history');     
      var nauseas             = $('#chbr_nauseas_vomito_history');
      var diarrea             = $('#chbr_diarrea_history');
      var dolorCabeza         = $('#chbr_dolor_cabeza_history'); 
      var dolorMusculo        = $('#chbr_dolor_musculo_history'); 

      var examenFisico        = $("#chb_examen_fisico_historial");
      var otros               = $("#chb_otros_historial");
      var fechaSintomas       = $('#txr_fecha_inicio_sintomas_history').val(); 
      //----------------------------------------------------------
      var rbContactoPersona   = $('input:radio[name=rb_contacto_persona_history]:checked');
      var entornoFamiliar     = $('#chbr_entorno_familiar_history');
      var entornoLaboral      = $('#chbr_entorno_laboral_history');
      var entornoSalud        = $('#chbr_entorno_salud_history');
      var arrayEntorno        = [];
      //----------------------------------------------------------
      //----------------------------------------------------------
      var rbFueraPais         = $('input:radio[name=rb_fuera_pais_history]:checked');
      var pais                = $("#selr_pais_retorto_history").val();
      var fechaRetorno        = $("#txr_fecha_retorno_history").val();
      //----------------------------------------------------------
      //----------------------------------------------------------
      var rbDiferenteDistrito = $('input:radio[name=rb_distrito_history]:checked');
      var distrito            = $('#selr_distrito_history').val();
      //var tipoTrabajo         = $('#sel_tipo_trabajo').val();
      //----------------------------------------------------------
      //----------------------------------------------------------
      //factores de riesgos
      var obesidad            = $('#chbr_obesidad_history');
      var enfermedadPulmunar  = $('#chbr_enfermedad_pulmunar_history');
      var diabete             = $('#chbr_diabete_history');
      var impertension        = $('#chbr_impertension_history');
      var mayor60ano          = $('#chbr_mayor_60_ano_history');
      var gestante            = $('#chbr_gestante_history');
      var arrayFactorRiesgo   = [];
      //----------------------------------------------------------
      //----------------------------------------------------------
      var adultoMayor         = $('#chbr_adulto_mayor_history'); 
      var nonio               = $('#chbr_nino_history'); 
      var chb_gestante_2      = $('#chbr_gestante_2_history');
      var familiarEnfermedad  = $('#chbr_familiar_enfermedad_cronica_history');
      var arrayMiemmbrosFamiliar = [];
      //-----------------------------------------------------------
      //-----------------------------------------------------------
      var cantPersona         = $('#txr_cant_persona_history').val();
      //-----------------------------------------------------------
      var store_sintomas_total  = 0;
      var cant_sintomas         = 0; 
      var store_factor_riesgo   = 0;
      //-----------------------------------------------------------
      //
      var arraySintomas = [];
      //-----------------------------------------------------------
      //sumamos los sintomas seleccionados   
      //console.log(fiebre.is(":checked"));
      if(fiebre.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(fiebre.data("score"));
        cant_sintomas++; 
        arraySintomas.push(fiebre.val());
        console.log(parseInt(fiebre.data("score")),store_sintomas_total)
      }
      if(dificultadRespirar.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(dificultadRespirar.data("score"));
        cant_sintomas++;
        arraySintomas.push(dificultadRespirar.val());
        console.log(parseInt(dificultadRespirar.data("score")),store_sintomas_total)
      }
      if(tosSeca.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(tosSeca.data("score"));
        cant_sintomas++;
        arraySintomas.push(tosSeca.val());
        console.log(parseInt(tosSeca.data("score")),store_sintomas_total)
      }
      if(dolorGarganta.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(dolorGarganta.data("score"));
        cant_sintomas++;
        arraySintomas.push(dolorGarganta.val());
        console.log(parseInt(dolorGarganta.data("score")),store_sintomas_total)
      }
      if(congestionNasal.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(congestionNasal.data("score"));
        cant_sintomas++;
        arraySintomas.push(congestionNasal.val());
        console.log(parseInt(congestionNasal.data("score")),store_sintomas_total)
      }
      if(fatiga.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(fatiga.data("score"));
        cant_sintomas++;
        arraySintomas.push(fatiga.val());
        console.log(parseInt(fatiga.data("score")),store_sintomas_total)
      }
      if(escalofrio.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(escalofrio.data("score"));
        cant_sintomas++;
        arraySintomas.push(escalofrio.val());
        console.log(parseInt(escalofrio.data("score")),store_sintomas_total)
      }
      if(nauseas.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(nauseas.data("score"));
        cant_sintomas++;
        arraySintomas.push(nauseas.val());
        console.log(parseInt(nauseas.data("score")),store_sintomas_total)
      }
      if(diarrea.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(diarrea.data("score"));
        cant_sintomas++;
        arraySintomas.push(diarrea.val());
        console.log(parseInt(diarrea.data("score")),store_sintomas_total)
      }
      if(dolorCabeza.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(dolorCabeza.data("score"));
        cant_sintomas++;
        arraySintomas.push(dolorCabeza.val());
        console.log(parseInt(dolorCabeza.data("score")),store_sintomas_total)
      }
      if(dolorMusculo.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(dolorMusculo.data("score"));
        cant_sintomas++;
        arraySintomas.push(dolorMusculo.val());
        console.log(parseInt(dolorMusculo.data("score")),store_sintomas_total)
      }

      if(examenFisico.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(examenFisico.data("score"));
        cant_sintomas++;
        arraySintomas.push(examenFisico.val());       
      }
      if(otros.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(otros.data("score"));
        cant_sintomas++;
        arraySintomas.push(otros.val());       
      }

      //-------------------------------------------------------
      //-------------------------------------------------------
      //sumamos factores de riegos
      //console.log(fiebre.data("score"), obesidad.data("score"));
      if(obesidad.is(":checked")) {
        store_factor_riesgo +=obesidad.data("score");
        arrayFactorRiesgo.push(obesidad.val());
      }
      if(enfermedadPulmunar.is(":checked")){
        store_factor_riesgo +=enfermedadPulmunar.data("score");
        arrayFactorRiesgo.push(enfermedadPulmunar.val());
      }
      if(diabete.is(":checked")){
        store_factor_riesgo +=diabete.data("score");
        arrayFactorRiesgo.push(diabete.val());
      }
      if(impertension.is(":checked")){
        store_factor_riesgo +=impertension.data("score");
        arrayFactorRiesgo.push(impertension.val());
      }
      if(mayor60ano.is(":checked")){
        store_factor_riesgo +=mayor60ano.data("score");
        arrayFactorRiesgo.push(mayor60ano.val());
      }
      if(gestante.is(":checked")){
        store_factor_riesgo +=gestante.data("score");
        arrayFactorRiesgo.push(gestante.val());
      }
      //----------------------------------------------------

      //----------------------------------------------------
      if(adultoMayor.is(":checked")){
        arrayMiemmbrosFamiliar.push(adultoMayor.val());
      }
      if(nonio.is(":checked")){
        arrayMiemmbrosFamiliar.push(nonio.val());
      }
      if(chb_gestante_2.is(":checked")){
        arrayMiemmbrosFamiliar.push(chb_gestante_2.val());
      }
      if(familiarEnfermedad.is(":checked")){
        arrayMiemmbrosFamiliar.push(familiarEnfermedad.val());
      }

      //----------------------------------------------------
      //coclusión 1
      var conclusion1 = "Caso no sospechoso";
      var conclusion2 = "Baja Posibilidad de evolución no favorable";
      var encuestaFoo = 0;
      var chEvolucion = 0; 
      conclusion1 = "Caso no sospechoso";
      selectedFilterStatus(11);
//console.log($("#sel_covidotrosmotivos_history").val(),cant_sintomas, rbContactoPersona.val(),rbFueraPais.val(),rbDiferenteDistrito.val(),$("#sel_sintomalogia_history").val(),rbContactoPersona.val(), $("#sel_sintomalogia_history").val())
      if(($("#sel_covidotrosmotivos_history").val()!=0 && $("#sel_covidotrosmotivos_history").val()!=null)||(cant_sintomas>=1 )||($("#selr_statusFic_history").val()==1||$("#selr_statusFic_history").val()==3)){
        //rbContactoPersona
        conclusion1 = "Caso Sospechoso";
        encuestaFoo = 1;
        selectedFilterStatus(12);
        console.log("sospechoso history")
        
      } 

      $("#sel_sintomalogia_history").val(1);
      if(cant_sintomas>=1)
      {
        $("#sel_sintomalogia_history").val(2);
      }

      if((store_sintomas_total+store_factor_riesgo) >=1 && (store_sintomas_total+store_factor_riesgo)<=8){
        conclusion2 ="Baja Posibilidad de evolución no favorable";
        chEvolucion = 0;
      }
      if((store_sintomas_total+store_factor_riesgo) >=9){
        conclusion2 ="Alta Posibilidad de evolución no favorable";
        chEvolucion=1;
        selectedFilterStatus(12);
      }

      $("#conlcusion1result_history").text(conclusion1?conclusion1:'Caso no sospechoso');//se coloca en resultado
      $("#conlcusion2result_history").text(conclusion2?conclusion2:'Baja Posibilidad de evolución no favorable');//se coloca en resultado
    }

    var thumbsUpregister = function(){    

      //verificamos la las cookies
      var cookie = getCookie("vtas_fullname"+sessionStorage.tabVisitasa);          
      if(cookie.trim().length==0){        
        swal({
          title: "Su sessión se ha vencido, Debe iniciar sesión.",
          text: validatefield,
          timer: 3000,
          type: "error",
          showConfirmButton: true
          });  
          setTimeout(function(){
            window.location.href='./'; 
          },3000);         
        return;
      }
       
      //fin

      location = location?location:3;//callao
      company  = company?company:0;//tasa
      var moduleExam=$("#modalRegisterCovidTestNewForm")[0];
      var tx_ocupacion = $("#tx_ocupacion").val();
      var tx_temperatura = $("#tx_temperatura").val();
      var tx_antecedentes = $("#tx_antecedentes").val();
      var sel_status = $("#sel_statusFic").val();
      var tx_resultado = $("#tx_resultado").val();
      var nameperson = $("#tx_nomape").val();
      var identity_document = $("#tx_docum").val();
      var vetoStatus = (statusmed != 88)?statusmed:0;
      var reason = $("#tx_motivo_vetado").val();
      var sel_statusrap =  $("#sel_statusrap").val();
      var sel_statusmolec = $("#sel_statusmolec").val();
      var sel_reagent = $("#sel_reagent").val(); 
      var fecha = $("#tx_date_tamizaje").val(); 
      var tx_tempIN = $("#tx_tempIN").val();
      var tx_tempOUT = $("#tx_temoOUT").val();
     
    //---------------------------------------------------
    //-------------------FORMATO NUEVO-------------------
      //alert("ssssssssss");     
      var namePersona         = nameperson;//$('#tx_name_per').val();
      var arrayNamePerson     =  namePersona.split(" ");
      var apellidoPaterno     = "";
      var apellidoMaterno     = "";
      var fullName            = "";
      if(arrayNamePerson.length==2) {
        apellidoPaterno = arrayNamePerson[1];
        fullName        = arrayNamePerson[0];
      }
      else if(arrayNamePerson.length==3) {
        apellidoPaterno = arrayNamePerson[1];
        apellidoMaterno = arrayNamePerson[2];
        fullName        = arrayNamePerson[0];
      }
      else if(arrayNamePerson.length==4) {
        apellidoPaterno = arrayNamePerson[2];
        apellidoMaterno = arrayNamePerson[3];
        fullName        = arrayNamePerson[0]+" "+arrayNamePerson[1];
      }
      else if(arrayNamePerson.length==5) {
        apellidoPaterno = arrayNamePerson[3];
        apellidoMaterno = arrayNamePerson[4];
        fullName        = arrayNamePerson[0]+" "+arrayNamePerson[1]+" "+arrayNamePerson[2];
      }
      else if(arrayNamePerson.length==6) {
        apellidoPaterno = arrayNamePerson[4];
        apellidoMaterno = arrayNamePerson[5];
        fullName        = arrayNamePerson[0]+" "+arrayNamePerson[1]+" "+arrayNamePerson[2]+" "+arrayNamePerson[3];
      }
      

       
      var identityDocument    = identity_document;//$('#tx_identity_document').val(); 
      var type_document       = $("#sel_type_document_prog").val();
      var sede                = location;//$('#sel_sede').val(); 
      var id_area             = $("#hid_id_area").val();
      var name_area           = $("#area").text();
      id_area                 = id_area?id_area:1;//operacion
      var embarcacion         = $('#sel_embarcacion').val(); 
      var name_embarcacion    = $('#sel_embarcacion').text(); 
      var empleador           = $('#tx_empleador').val(); 
      var puestoTrabajo       = $('#tx_puesto_trabajo').val(); 
      var companyname         = $('#company').text();
      var ruc_company         = $("#hid_ruc_company").val();
      var tipoTrabajo         = $('#tx_job_type').val(); 
      var name_tipoTrabajo    = $('#tx_job_type').text(); 
      var actividadEconomica  = $('#tx_actividad_economica').val();
      var nacionalidad        = $('#tx_nacionalidad').val();
      var departamento        = $('#sel_departamento_res').val();
      var provincia           = $('#sel_provincia_res').val();
      var distrito            = $('#sel_distrito_res').val();
      var direccion           = $('#tx_direccion_res').val();
      var email               = $('#tx_email').val();
      var celular             = $('#tx_celular').val();
      var telefono            = $('#tx_telefono').val();
      var datoFamiliar        = $('#tx_dato_familiar').val();
      var telefonoContacto    = $('#tx_celular_contacto').val();
      var motivo              = $('#sel_motivo').val();
      var temperature         = tx_temperatura;//$('#tx_temperature').val(); 
      var sexo                = $('#tx_sexo').val(); 
      var fechaNacimiento    = $('#tx_edad').val(); 
      //---------------------------------------------------------      
      var fiebre              = $('#chb_fiebre'); 
      var tosSeca             = $('#chb_tos_seca');  
      var dificultadRespirar  = $('#chb_dificulta_respirar');  
      var dolorGarganta       = $('#chb_dolor_garganta');  
      var congestionNasal     = $('#chb_congecion_nasal');
      var fatiga              = $('#chb_fatiga');
      var escalofrio          = $('#chb_escalofrio');     
      var nauseas             = $('#chb_nauseas_vomito');
      var diarrea             = $('#chb_diarrea');
      var dolorCabeza         = $('#chb_dolor_cabeza'); 
      var dolorMusculo        = $('#chb_dolor_musculo');       
      var examenFisico        = $('#chb_examen_fisico'); 
      var otros               = $('#chb_otros'); 

      var observacionExamenFisico = $('#tx_observacion_examen_fisico').val();
      var observacionOtros = $('#tx_observacion_otro').val();

      var fechaSintomas       = $('#tx_fecha_inicio_sintomas').val(); 
      //----------------------------------------------------------
      var rbContactoPersona   = $('input:radio[name=rb_contacto_persona]:checked');
      var entornoFamiliar     = $('#chb_entorno_familiar');
      var entornoLaboral      = $('#chb_entorno_laboral');
      var entornoSalud        = $('#chb_entorno_salud');
      var arrayEntorno        = [];
      //----------------------------------------------------------
      //----------------------------------------------------------
      var rbFueraPais         = $('input:radio[name=rb_fuera_pais]:checked');
      var pais                = $("#sel_pais_retorto").val();
      var name_pais           = pais!="0"?$("#sel_pais_retorto option:selected").text():""; 

      /*var distritoVistadoText = $( "#txr_sel_distrito option:selected" ).text();
      if(distritoVistadoText=="Seleccionar")distritoVistadoText="";*/

      var fechaRetorno        = $("#tx_fecha_retorno").val();
      //----------------------------------------------------------
      //----------------------------------------------------------
      var rbDiferenteDistrito = $('input:radio[name=rb_distrito]:checked');
      var distrito2            = $('#sel_distrito').val();
      //var tipoTrabajo         = $('#sel_tipo_trabajo').val();
      //----------------------------------------------------------
      //----------------------------------------------------------
      //factores de riesgos
      var obesidad            = $('#chb_obesidad');
      var enfermedadPulmunar  = $('#chb_enfermedad_pulmunar');
      var diabete             = $('#chb_diabete');
      var impertension        = $('#chb_impertension');
      var mayor60ano          = $('#chb_mayor_60_ano');
      var gestante            = $('#chb_gestante');
      var arrayFactorRiesgo   = [];
      //----------------------------------------------------------
      //----------------------------------------------------------
      var adultoMayor         = $('#chb_adulto_mayor'); 
      var nonio               = $('#chb_nino'); 
      var chb_gestante_2      = $('#chb_gestante_2');
      var familiarEnfermedad  = $('#chb_familiar_enfermedad_cronica');
      var arrayMiemmbrosFamiliar = [];
      //-----------------------------------------------------------
      //-----------------------------------------------------------
      var cantPersona         = $('#tx_cant_persona').val();
      var kitCovid            = $('#tx_chb_kit_covid');
      var daysRest            = $('#sel_day_reposo').val();
      var sintomatologia      = $("#sel_sintomalogia").val();
      //-----------------------------------------------------------
      //-----------------------------------------------------------
      var idAreaSap       = $("#hid_id_area_sap").val();
      var nameAreaSap     =  $("#hid_name_area_sap").val();
      var idLocationSap   = $("#hid_id_location_sap").val();
      var nameLocationSap = $("#hid_name_location_sap").val();      
      var userCompanyType = $("#hid_user_company_type").val();


      var extension_reposo = $("#sel_extension_reposo").val();
      //-----------------------------------------------------------
      var covidotrosmotivos = $("#sel_covidotrosmotivos").val();
      var locationcontagio = $("#sel_location_contagio").val();
      if(companyname.trim()=="0-tasa" || companyname.trim()=="tasa" || companyname.trim()=="Tasa" || companyname.trim()=="TASA" || companyname.toLowerCase().trim().includes("tasa"))
      var is_collaborator = 1;
      else
      var is_collaborator = 0;


      //return;

      var store_sintomas_total  = 0;
      var cant_sintomas         = 0; 
      var store_factor_riesgo   = 0;
      //-----------------------------------------------------------
      //
      var arraySintomas = [];
      //-----------------------------------------------------------
      //sumamos los sintomas seleccionados   
      //console.log(fiebre.is(":checked"));
      if(fiebre.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(fiebre.data("score"));
        cant_sintomas++; 
        arraySintomas.push(fiebre.val());
        console.log(parseInt(fiebre.data("score")),store_sintomas_total)
      }
      if(dificultadRespirar.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(dificultadRespirar.data("score"));
        cant_sintomas++;
        arraySintomas.push(dificultadRespirar.val());
        console.log(parseInt(dificultadRespirar.data("score")),store_sintomas_total)
      }
      if(tosSeca.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(tosSeca.data("score"));
        cant_sintomas++;
        arraySintomas.push(tosSeca.val());
        console.log(parseInt(tosSeca.data("score")),store_sintomas_total)
      }
      if(dolorGarganta.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(dolorGarganta.data("score"));
        cant_sintomas++;
        arraySintomas.push(dolorGarganta.val());
        console.log(parseInt(dolorGarganta.data("score")),store_sintomas_total)
      }
      if(congestionNasal.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(congestionNasal.data("score"));
        cant_sintomas++;
        arraySintomas.push(congestionNasal.val());
        console.log(parseInt(congestionNasal.data("score")),store_sintomas_total)
      }
      if(fatiga.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(fatiga.data("score"));
        cant_sintomas++;
        arraySintomas.push(fatiga.val());
        console.log(parseInt(fatiga.data("score")),store_sintomas_total)
      }
      if(escalofrio.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(escalofrio.data("score"));
        cant_sintomas++;
        arraySintomas.push(escalofrio.val());
        console.log(parseInt(escalofrio.data("score")),store_sintomas_total)
      }
      if(nauseas.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(nauseas.data("score"));
        cant_sintomas++;
        arraySintomas.push(nauseas.val());
        console.log(parseInt(nauseas.data("score")),store_sintomas_total)
      }
      if(diarrea.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(diarrea.data("score"));
        cant_sintomas++;
        arraySintomas.push(diarrea.val());
        console.log(parseInt(diarrea.data("score")),store_sintomas_total)
      }
      if(dolorCabeza.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(dolorCabeza.data("score"));
        cant_sintomas++;
        arraySintomas.push(dolorCabeza.val());
        console.log(parseInt(dolorCabeza.data("score")),store_sintomas_total)
      }
      if(dolorMusculo.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(dolorMusculo.data("score"));
        cant_sintomas++;
        arraySintomas.push(dolorMusculo.val());
        console.log(parseInt(dolorMusculo.data("score")),store_sintomas_total)
      }
      
      if(examenFisico.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(examenFisico.data("score"));
        cant_sintomas++;
        arraySintomas.push(examenFisico.val());       
      }
      if(otros.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(otros.data("score"));
        cant_sintomas++;
        arraySintomas.push(otros.val());       
      }

      //-------------------------------------------------------
      //-------------------------------------------------------
      //sumamos factores de riegos
      //console.log(fiebre.data("score"), obesidad.data("score"));
      if(obesidad.is(":checked")) {
        store_factor_riesgo +=obesidad.data("score");
        arrayFactorRiesgo.push(obesidad.val());
      }
      if(enfermedadPulmunar.is(":checked")){
        store_factor_riesgo +=enfermedadPulmunar.data("score");
        arrayFactorRiesgo.push(enfermedadPulmunar.val());
      }
      if(diabete.is(":checked")){
        store_factor_riesgo +=diabete.data("score");
        arrayFactorRiesgo.push(diabete.val());
      }
      if(impertension.is(":checked")){
        store_factor_riesgo +=impertension.data("score");
        arrayFactorRiesgo.push(impertension.val());
      }
      if(mayor60ano.is(":checked")){
        store_factor_riesgo +=mayor60ano.data("score");
        arrayFactorRiesgo.push(mayor60ano.val());
      }
      if(gestante.is(":checked")){
        store_factor_riesgo +=gestante.data("score");
        arrayFactorRiesgo.push(gestante.val());
      }
      //----------------------------------------------------

      //----------------------------------------------------
      if(adultoMayor.is(":checked")){
        arrayMiemmbrosFamiliar.push(adultoMayor.val());
      }
      if(nonio.is(":checked")){
        arrayMiemmbrosFamiliar.push(nonio.val());
      }
      if(chb_gestante_2.is(":checked")){
        arrayMiemmbrosFamiliar.push(chb_gestante_2.val());
      }
      if(familiarEnfermedad.is(":checked")){
        arrayMiemmbrosFamiliar.push(familiarEnfermedad.val());
      }

      //----------------------------------------------------
      //coclusión 1
      var conclusion1 = "Caso no sospechoso";
      var conclusion2 = "Baja Posibilidad de evolución no favorable";
      var encuestaFoo = 0;
      var chEvolucion = 0;
      conclusion1     = "Caso no sospechoso";
      if(($("#sel_covidotrosmotivos").val()!=0 && $("#sel_covidotrosmotivos").val()!=null)||(cant_sintomas>=1)||($("#sel_statusFic").val()==1||$("#sel_statusFic").val()==3)){
        //rbContactoPersona
        conclusion1 = "Caso Sospechoso";
        encuestaFoo = 1;
        
      } 

     

      $("#conlcusion1result").text(conclusion1?conclusion1:'Sin Resultado');//se coloca en resultado

      //console.log((store_sintomas_total+store_factor_riesgo));
      if((store_sintomas_total+store_factor_riesgo) >=1 && (store_sintomas_total+store_factor_riesgo)<=8){
        conclusion2 ="Baja Posibilidad de evolución no favorable";
        chEvolucion = 0;
      }
      if((store_sintomas_total+store_factor_riesgo) >=9){
        conclusion2 ="Alta Posibilidad de evolución no favorable";
        chEvolucion=1;
      }
      var fechaNow = moment().format("YYYY-MM-DD hh:mm:ss");
      //console.log(fechaNow);

      if(rbContactoPersona.val()=="si"){        
        if(entornoFamiliar.is(":checked"))
          arrayEntorno.push(entornoFamiliar.val());
        if(entornoLaboral.is(":checked"))
          arrayEntorno.push(entornoLaboral.val());
        if(entornoSalud.is(":checked"))
          arrayEntorno.push(entornoSalud.val());
      }
      if(rbContactoPersona.val()=="no"){ 
        arrayEntorno=[];
      }

      var lugar_contagio     = "";
      if($("#sel_location_contagio").val()!="0"){
        lugar_contagio = $("#sel_location_contagio option:selected").text();
      }
      
      var evento1 ={ }
      var evento2 ={ }
      var evento3 ={ }
      var evento4 ={ }
      var array_eventos_send =[];
      //$('#sel_motivo').val(); 
      if(encuestaFoo==1){//caso sospechoso
        evento1 = {
          "biIdHistoria": 0,         
          "descripcionEvento": "1",
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "1",//
          "vcSintomatologia": "2",
          "vcResultado": "CASO SOSPECHOSO",
          "vcObservacion": tx_resultado,
          "zonaContacto":lugar_contagio        
        }
        array_eventos_send.push("cod_anexo1_natclar");
      }
      else if(encuestaFoo==0){//caso sospechoso
        evento1 = { 
          "biIdHistoria": 0,         
          "descripcionEvento": "1",
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "10",//
          "vcSintomatologia": "2",
          "vcResultado": "CASO NO SOSPECHOSO",
          "vcObservacion": tx_resultado,
          "zonaContacto":lugar_contagio          
        }
        array_eventos_send.push("cod_anexo1_natclar");
      }
      
      if(parseFloat(temperature)>=35 && parseFloat(temperature)<=36.7)//
      {
        evento2 = {
          "biIdHistoria": 0,
          "descripcionEvento": "2",//TEMPERATURA
          "dtEvento":fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "6",//NORMAL TEMPERATURA
          "vcSintomatologia": "2",
          "vcResultado": "NORMAL TEMPERATURA",
          "vcObservacion": tx_resultado,//""
          "zonaContacto":lugar_contagio
        }
        array_eventos_send.push("cod_anexo2_natclar");
      }
      if(parseFloat(temperature)>36.7){
        evento2 = {
          "biIdHistoria": 0,
          "descripcionEvento": "2",//TEMPERATURA
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "7",//ANORMAL TEMPERATURA
          "vcSintomatologia": "2",
          "vcResultado": "ANORMAL TEMPERATURA",
          "vcObservacion": tx_resultado,//""
          "zonaContacto":lugar_contagio
        }
        array_eventos_send.push("cod_anexo2_natclar");
      }
      if(sel_reagent=="4"){///REACTIVO IGM/IGG
        evento3 = {
            "biIdHistoria": 0,          
            "descripcionEvento": "3",
            "dtEvento": fechaNow,
            "vcMotivo": motivo,
            "vcOrigen": "VISI-TASA",
            "iIdEstadoPaciente": "8",//REACTIVO IGM/IGG
            "vcSintomatologia": "2",
            "vcResultado": "REACTIVO IGM/IGG",
            "vcObservacion": tx_resultado,
            "zonaContacto":lugar_contagio          
        }
        array_eventos_send.push("cod_anexo3_natclar");
      }
      else if(sel_reagent=="1"){//NO REACTIVO
        evento3 = { 
            "biIdHistoria": 0,         
            "descripcionEvento": "3",
            "dtEvento": fechaNow,
            "vcMotivo": motivo,
            "vcOrigen": "VISI-TASA",
            "iIdEstadoPaciente": "8",//NO REACTIVO
            "vcSintomatologia": "2",
            "vcResultado": "NO REACTIVO",
            "vcObservacion": tx_resultado,
            "zonaContacto":lugar_contagio          
        }
        array_eventos_send.push("cod_anexo3_natclar");
      }
      else if(sel_reagent=="2"){//REACTIVO IGM
        evento3 = {    
            "biIdHistoria": 0,      
            "descripcionEvento": "3",
            "dtEvento": fechaNow,
            "vcMotivo": motivo,
            "vcOrigen": "VISI-TASA",
            "iIdEstadoPaciente": "12",//REACTIVO IGM
            "vcSintomatologia": "2",
            "vcResultado": "REACTIVO IGM",
            "vcObservacion": tx_resultado,
            "zonaContacto":lugar_contagio          
        }
        array_eventos_send.push("cod_anexo3_natclar");
      }
      else if(sel_reagent=="3"){//REACTIVO IGG
        evento3 = {
            "biIdHistoria": 0,
            "descripcionEvento": "3",
            "dtEvento": fechaNow,
            "vcMotivo": motivo,
            "vcOrigen": "VISI-TASA",
            "iIdEstadoPaciente": "13",//REACTIVO IGG
            "vcSintomatologia": "2",
            "vcResultado": "REACTIVO IGG",
            "vcObservacion": tx_resultado,
            "zonaContacto":lugar_contagio          
        }
        array_eventos_send.push("cod_anexo3_natclar");
      }
      if(sel_statusmolec =="1"){
        evento4 = {
          "biIdHistoria": 0,
          "descripcionEvento": "4",//TEMPERATURA
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "4",//POSITIVO MOLECULAR
          "vcSintomatologia": "2",
          "vcResultado": "POSITIVO MOLECULAR",
          "vcObservacion": tx_resultado,//""
          "zonaContacto":lugar_contagio
        }
        array_eventos_send.push("cod_anexo4_natclar");
      }
      else if(sel_statusmolec =="0"){
        /*evento4 = {
          "biIdHistoria": 0,
          "descripcionEvento": "4",//TEMPERATURA
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "5",//NEGATIVO MOLECULAR
          "vcSintomatologia": "2",
          "vcResultado": "NEGATIVO MOLECULAR",
          "vcObservacion": tx_resultado,//""
          "zonaContacto":lugar_contagio
        }
        array_eventos_send.push("cod_anexo4_natclar");*/
      }
      else if(sel_statusmolec =="2"){
        /*evento4 = {
          "biIdHistoria": 0,
          "descripcionEvento": "4",//TEMPERATURA
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "14",//PENDIENTE MOLECULAR
          "vcSintomatologia": "2",
          "vcResultado": "PENDIENTE MOLECULAR",
          "vcObservacion": tx_resultado,//""
          "zonaContacto":lugar_contagio
        }
        array_eventos_send.push("cod_anexo4_natclar");*/
      }
      var eventos = [];
      if(JSON.stringify(evento1)!="{}")//vacío
        eventos.push(evento1);
      if(JSON.stringify(evento2)!="{}")//vacío
        eventos.push(evento2);
      if(JSON.stringify(evento3)!="{}")//vacío
        eventos.push(evento3);
      if(JSON.stringify(evento4)!="{}")//vacío
        eventos.push(evento4);
      
      //----------------------------------------------------------------
      var stringArraySintomas = arraySintomas.toString();
          stringArraySintomas = stringArraySintomas.replace(/,/g,'|');///replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
      //----------------------------------------------------------------      
      var distritoVistadoText = $( "#sel_distrito option:selected" ).text();
      distritoVistadoText     = rbDiferenteDistrito.val()!="no"?distritoVistadoText:"";
      console.log(distritoVistadoText);
      //----------------------------------------------------------------
      var stringArrayFactorRiesgo = arrayMiemmbrosFamiliar.toString();

          stringArrayFactorRiesgo = stringArrayFactorRiesgo.replace(/,/g,'|');
      //----------------------------------------------------------------      
      var stringArrayEnfermedad   = arrayFactorRiesgo.toString();
          stringArrayEnfermedad   = stringArrayEnfermedad.replace(/,/g,'|');
      //----------------------------------------------------------------                 
      //----------------------------------------------------------------         
      var stringArrayEntorno      = arrayEntorno.toString();
          stringArrayEntorno      = stringArrayEntorno.replace(/,/g,'|');
      //-----------------------------------------------------------------
            
      var json = {
        "dtEnvio": fechaNow,
        "pacientes": 
        [
          {
            "tipoDocumento": type_document,
            "dniPaciente": identityDocument,
            "dFechaNacimiento": fechaNacimiento,//$("#txr_tx_edad").val(),
            "vcSexo": sexo,//"M",
            "vcCompania": "20100971772", //ruc_company,
            "vcContrata": "20100971772",//ruc_company,
            "vcUnidad": sede.toString(),//"0062",
            "vcPuesto": tx_ocupacion,//"",
            "vcArea": name_area,//"",
            "apellidoPaterno": apellidoPaterno ,//"ARCOS",
            "apellidoMaterno": apellidoMaterno ,//"ROMUCHO",
            "nombres": fullName, //"HENRY MANUEL",
            "nacionalidad":nacionalidad,//"",
            "vcUbigeo": departamento+provincia+distrito,//"010105",
            "vcDireccionActual": direccion,//"",
            "vcCorreo": email,///"",
            "vcCelular":celular,//"",
            "vcFijo": telefono,//"",           
            "vcNombreFamiliar": datoFamiliar,
            "vcCelularFamiliar": telefonoContacto,
            "vcFijoFamiliar": telefonoContacto,
            "vcTipoTrabajo": "Temporal",//tipoTrabajo,
            "vcActividadEconomiac": actividadEconomica,
            "F00":
            [
              {
                "biIdF00": 0,//$("#hid_biIdF00").val(),
                "preguntaSintomas": stringArraySintomas,//"Fiebre|Dolor de Garganta",
                "FechaInicioSintomas": fechaSintomas,
                "EntornoContacto": rbContactoPersona.val(),
                "AlternativaEntornoContacto": stringArrayEntorno,
                "ViajoFueraPais": rbFueraPais.val(),
                "QuePais": name_pais,
                "RetornoPais": fechaRetorno,
                "DesplazoDistritos": rbDiferenteDistrito.val(),
                "QueDistrito": distritoVistadoText,
                "Enfermedad": stringArrayEnfermedad,//arrayFactorRiesgo
                "OtrasEnfermedades": "",
                "grupoRiesgo": stringArrayFactorRiesgo,
                "NroPersonasDomicilio": cantPersona,
                "score": store_sintomas_total+store_factor_riesgo,
                "conclusion1": conclusion1,
                "conclusion2": conclusion2
              }
            ],
            "eventos":eventos
          }
        ]
      }

      console.log(JSON.stringify(json));
      //console.log(json);

    //---------------------------------------------------
     var flag=0;
     var validatefield="";
        
        
     /*if(empleador=="0")
     {flag=1;      validatefield= "Debe seleccionar el empleador";}*/
     /*else if(identity_document=="")
     {flag=1;     validatefield= "Debe ingresar "+"Documento de identidad";}*/
     /*else if(nameperson.trim().length==0)
     {flag=1;     validatefield= "Debe ingresar el Nombre y Apellido";} */         
     /*else if(location=="0" || location==null)
     {flag=1;       validatefield= "Debe seleccionar la Sede";}*/
     /*else if(area=="0")
     {flag=1;      validatefield= "Debe seleccionar el Área";}*/
     if(tx_ocupacion=="")
     {flag=1;    validatefield= "Debe ingresar el Puesto de Trabajo";}                       
     /*else if(companyname=="")
     {flag=1;    validatefield= "Debe ingresar "+"Empresa";}  */ 
     else if(tipoTrabajo=="0" || tipoTrabajo=="" || tipoTrabajo==null)
     {flag=1;    validatefield= "Debe ingresar el Tipo de Trabajo";}          
     else if(actividadEconomica=="")
     {flag=1;    validatefield= "Debe seleccionar la Actividad Económica";}
     else if(nacionalidad=="")
     {flag=1;    validatefield= "Debe ingresar la Nacionalidad";}        
     else if(departamento=="0")
     {flag=1;    validatefield= "Debe seleccionar el Departamento";}        
     else if(provincia=="0")
     {flag=1;    validatefield= "Debe seleccionar la Provincia";}
     else if(distrito=="0")
     {flag=1;    validatefield= "Debe seleccionar el Distrito";}
     else if(direccion.trim().length==0)
     {flag=1;    validatefield= "Debe ingresar la Dirección";}
     if((encuestaFoo==1 || sel_statusFic =="1" || sel_statusrap=="1" || sel_statusmolec=="1" || covidotrosmotivos=="1" || covidotrosmotivos=="2") && locationcontagio=="0"){
      flag=1;    validatefield= "Debe seleccionar el lugar de contagio";
     }
   
     

     else if(email.trim().length==0)
     {flag=1;    validatefield= "Debe ingresar el Email";}
     else if(celular.trim().length==0)
     {flag=1;    validatefield= "Debe ingresar el Número de Celular";}
     else if(datoFamiliar.trim().length==0)
     {flag=1;    validatefield= "Debe ingresar el Dato Familiar ";}
     else if(telefonoContacto.trim().length==0)
     {flag=1;    validatefield= "Debe ingresar el Número de celular del contacto ";}          
     else if(motivo=="0" || motivo=="" || motivo==null)
     {flag=1;    validatefield= "Debe ingresarle Motivo ";}
     else if(tx_temperatura.trim().length==0)
     {flag=1;    validatefield= "Debe ingresar la Temperatura";}
     else if(sexo=="0")
     {flag=1;    validatefield= "Debe Seleccionar el Sexo";}
     /*else if(fechaNacimiento.trim().length==0)
     {flag=1;    validatefield= "Debe ingresar la Fecha de Nacimiento";}*/
     else if(tx_resultado=="")
     {flag=1;     validatefield= "Debe ingresar "+"Observaciones";}

     else if(statusmed!=1 && $("#sel_extend_reposo").val()>0)
     {flag=1;    validatefield= "Ha seleccionado extender días de reposo, debe vetar a la persona";}


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
        title:moduleExam? "Registro de Tamizaje":"Editar Datos",
        text: "¿Seguro que desea registrar los datos ingresados?",
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
     
      if (!moduleExam) 
      {
        var url = apiurlblacklist+"/api/Post-Blacklist-User?code="+postblacklistusercode+"&httpmethod=putcovid&id="+idEdit;
        var body ={ 
          "job":tx_ocupacion,                
          "name":nameperson,
          "identity_document":identity_document,
          "list_type": 2,
          "last_updated_by": getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
          "fecha":fecha=="Invalid date"?'':fecha,
          "temperature_in":tx_tempIN,
          "temperature_out":tx_tempOUT
          //"name_doctor":getCookie("vtas_fullname")
        }
      }else
      {
        var url = apiurlaccessrequest+"/api/Post-CovidTestResult-all?code="+PostCovidTestResultall+"&httpmethod=post";
        //alert(sel_status);
        var body ={
          "id_blacklist_user":idEdit,
          "id_location":location,
          "id_area":id_area,
          "id_company":company?company:0,
          "temperature":tx_temperatura,  
          "job":tx_ocupacion,
          "antecedent":tx_antecedentes,
          "status":sel_status,
          "status_test_fast":sel_statusrap,
          "status_test_molecular":sel_statusmolec,
          "note":tx_resultado,
          "created_by": getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
          "last_updated_by": getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
          "name_doctor":toCapitalize(getCookie("vtas_fullname"+sessionStorage.tabVisitasa)),
          "vetoStatus": vetoStatus,
          "covid_test": (statusmed != 88)?"2":"7",
          "is_collaborator": is_collaborator,
          "responsible": responsible,
          "name_person":nameperson,
          //"identity_document":identity_document,
          "type_document":type_document,
          "list_type": 2,
          "attribute2":"1",
          "attribute5":reason,
          "fecha":fecha,//fecha
          "temperature_in":tx_tempIN,
          "temperature_out":tx_tempOUT,
          "id_reagent_type":sel_reagent,
           "cb_fiebre":fiebre.is(":checked"),
           "cb_dificulta_respiratoria":dificultadRespirar.is(":checked"),
            "cb_tos_seca":tosSeca.is(":checked"),
            "cb_dolor_garganta":dolorGarganta.is(":checked"),
            "cb_congestion_nasal":congestionNasal.is(":checked"),
            "cb_fatiga":fatiga.is(":checked"),
            "cb_escalofrio":escalofrio.is(":checked"),
            "cb_nauseas_vomito":nauseas.is(":checked"),
            "cb_diarrea":diarrea.is(":checked"),
            "cb_dolor_cabeza":dolorCabeza.is(":checked"),
            "cb_dolor_musculo":dolorMusculo.is(":checked"),
            "fecha_inicio_sintoma":fechaSintomas,            
            "rb_concato_persona":rbContactoPersona.val()=="si"?true:false,
            "cb_entorno_famiiar":entornoFamiliar.is(":checked"),
            "cb_entorno_laborar":entornoLaboral.is(":checked"),
            "cb_entorno_salud":entornoSalud.is(":checked"),
            "rb_pais_visitado":rbFueraPais.val()=="si"?true:false,//falta backend
            "pais_visitado":pais,
            "fecha_retorno":fechaRetorno,
            "rb_direfente_distrito":rbDiferenteDistrito.val()=="si"?true:false,
            "distrito_visitado":departamento+provincia+distrito2,
            "cb_obesidad":obesidad.is(":checked"),
            "cb_enfemedad_pulmonar":enfermedadPulmunar.is(":checked"),
            "cb_diabete":diabete.is(":checked"),
            "cb_impertension":impertension.is(":checked"),
            "cb_mayo_60":mayor60ano.is(":checked"),
            "cb_adulto_mayor":mayor60ano.is(":checked"),//falta backend
            "cb_nino":nonio.is(":checked"),
            "cb_gestante":gestante.is(":checked"),
            "cb_familiar_enfermedad":familiarEnfermedad.is(":checked"),
            "cb_gestante_2":chb_gestante_2.is(":checked"),////falta backend
            "nro_personas":cantPersona,
            "ch_sospechoso":encuestaFoo,
            "ch_evolucion":chEvolucion,
            "pregunta_1":"¿Qué síntomas presenta?",
            "pregunta_2":"¿En los últimos 14 días ha tenido contacto con personas con diagnóstico confirmados de coronavirus?",
            "pregunta_3":"¿Ha viajado fuera del país o zona del Perú con casos confimados de covid-19 en los últimos 14 días?",
            "pregunta_4":"¿En los últimos 14 días se desplazó a diferentes distritos distintos a su lugar de residencia?",
            "pregunta_5":"¿Usted padece o padeció de algunas de las siguientes enfermedades o condiciones?",
            "pregunta_6":"¿En la casa donde habita tiene los siguientes grupos de riesgo?",
            "pregunta_7":"¿Cuántas personas viven en el domicilio donde habita?",
            "id_embarcacion":embarcacion,
            "name_embarcacion":embarcacion,
            "id_tipo_trabajo":tipoTrabajo,
            "name_tipo_trabajo":tipoTrabajo,
            "motivo_tamizaje": motivo,
            "nacionalidad":nacionalidad,
            "actividad_economica":actividadEconomica,
            "ubigeo":departamento+provincia+distrito,
            "direccion":direccion,
            "tlf_celular":celular,
            "tlf_fijo":telefono,
            "conclusion1":conclusion1,
            "conclusion2":conclusion2,
            "dato_familiar":datoFamiliar,
            "tlf_contacto":telefonoContacto,
            "sexo":sexo,
            "fecha_nacimiento":fechaNacimiento,
            "email":email,
            "json_clinica":json,
            "envioJson":"yes",
            "eventos_send":array_eventos_send,
            "cb_kit_covid":kitCovid.is(":checked"),
            "sintomalogia":sintomatologia,
            "otro_motivo":covidotrosmotivos,
            "lugar_contagio":locationcontagio,
            "date_ini_alatmedica_pdf":$("#tx_date_init_pdf").val(),
            "date_end_alatmedica_pdf":$("#tx_date_end_pdf").val(),
            "extend_reposo":$("#sel_extend_reposo").val()?$("#sel_extend_reposo").val():0,
            "daysRest":daysRest,
            "idAreaSap":idAreaSap,
            "nameAreaSap":nameAreaSap,
            "idLocationSap":idLocationSap,
            "nameLocationSap":nameLocationSap,
            "userCompanyType":userCompanyType,
            "cb_examen_fisico":examenFisico.is(":checked"),
            "observacion_examen_fisico":observacionExamenFisico,
            "cb_otros": otros.is(":checked"),
            "observacion_otros":observacionOtros,
            "extension_reposo":extension_reposo           
        }
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
              swal({
                title: "Éxito",
                text: "Tamizaje Registrado con Éxito",
                type: "success",
                timer:2000,
                showCancelButton: false,
                confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
                confirmButtonText: "De acuerdo",
                closeOnConfirm: false
              });
            },500)
            

            
           
            if(!$("#hid_mobile_temp")[0])//para que no actualice listado
            tableBlackList();
            
            if($("#hid_mobile_temp")[0])
            handlerUrlhtml('contentGlobal','view/covidSecuryMobile.html');

            if (!moduleExam)
              $('#modalEditBlacklist').modal('hide');
            else
            {
              $('#modalRegisterCovidTestNewForm').modal('hide');
              $("#sel_status").val(0);
            }

           
            clearformCovid();
           
          }else{
            swal("Error!", "No se ha podido actualizar la lista.", "error");
          }

        }).fail(function( jqXHR, textStatus, errorThrown ) {
          
          showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
          console.log(errorThrown)
     });

    });
  
		    
          
    }
    var clearformCovid=function()
    {
      if($("#company")[0])//form registro de persona existente
      {
          $("#company").text("");
         
          $("#local").text("");
       
          $("#tx_temperatura").val("");
          $("#tx_antecedentes").val("");
          $("#sel_status").val(0);
          $("#tx_resultado").val("");
          if( $("#headerFormCovid")[0])
          $("#headerFormCovid").css({background:'#039be0'})
          $("#tx_ocupacion").val("");
          $("#tx_temperatura").val("");
          $("#tx_antecedentes").val("");
          $("#sel_statusFic").val(2);
          $("#tx_resultado").val("");
          $("#tx_nomape").val("");
          $("#tx_docum").val("");
          
          $("#tx_motivo_vetado").val("");
          $("#sel_statusrap").val(2);
          $("#sel_statusmolec").val(2);
          $("#sel_reagent").val(0); 
          $("#tx_date_tamizaje").val(""); 
          $("#tx_tempIN").val("");
          $("#tx_temoOUT").val("");
          $("#hid_id_area").val("");
          $('#sel_embarcacion').val(0); 
          $('#tx_empleador').val(0); 
          $('#tx_puesto_trabajo').val(""); 
          $('#company').text("");
          $('#tx_job_type').val('Visita'); 
          $('#tx_actividad_economica').val('Pesca');
          $('#tx_nacionalidad').val("");
          $('#sel_departamento_res').val();
          $('#sel_provincia_res').val(0);
          $('#sel_distrito_res').val(0);
          $('#tx_direccion_res').val(0);
          $('#tx_email').val("");
          $('#tx_celular').val("");
          $('#tx_telefono').val("");
          $('#tx_dato_familiar').val("");
          $('#tx_celular_contacto').val("");
          $('#sel_motivo').val(1);
          $('#tx_edad').val(""); 
    
          $('#chb_fiebre').prop('checked', false);; 
          $('#chb_tos_seca').prop('checked', false);;  
          $('#chb_dificulta_respirar').prop('checked', false);;  
          $('#chb_dolor_garganta').prop('checked', false);;  
          $('#chb_congecion_nasal').prop('checked', false);;
          $('#chb_fatiga').prop('checked', false);;
          $('#chb_escalofrio').prop('checked', false);;     
          $('#chb_nauseas_vomito').prop('checked', false);;
          $('#chb_diarrea').prop('checked', false);;
          $('#chb_dolor_cabeza').prop('checked', false);; 
          $('#chb_dolor_musculo').prop('checked', false);; 
          $('#tx_fecha_inicio_sintomas').prop('checked', false);; 

          $('#rb_no_1').prop('checked', true);;
          $('#chb_entorno_familiar').prop('checked', false);;
          $('#chb_entorno_laboral').prop('checked', false);;
          $('#chb_entorno_salud').prop('checked', false);;

          $('#rb_no_2').prop('checked', true);;
          $("#sel_pais").val();
          $("#tx_retorno_pais").val("0");
          $('#rb_no_3').prop('checked', true);;;
          $('#sel_distrito').val();

          $('#chb_obesidad').prop('checked', false);;
          $('#chb_enfermedad_pulmunar').prop('checked', false);;
          $('#chb_diabete').prop('checked', false);;
          $('#chb_impertension').prop('checked', false);;
          $('#chb_mayor_60_ano').prop('checked', false);;
          $('#chb_gestante').prop('checked', false);;

          $('#chb_adulto_mayor').prop('checked', false);; 
          $('#chb_nino').prop('checked', false);; 
          $('#chb_gestante_2').prop('checked', false);;
          $('#chb_familiar_enfermedad_cronica').prop('checked', false);;
          $('#tx_cant_persona').val("");


          $("#div_contacto_persona").hide();
              $("#chb_entorno_familiar").prop("checked",false);
              $("#chb_entorno_laboral").prop("checked",false);
              $("#chb_entorno_salud").prop("checked",false);          
         
    
          $(".div_fuera_pais").hide();
          
              $(".div_fuera_pais").hide();
              $("#tx_fecha_retorno").val("");
              $("#sel_pais_retorto").val("0").trigger("change");
           $(".div_distrito").hide();

           $("#sel_covidotrosmotivos").val(0)
           $("#sel_location_contagio").val(0)
           selectedFilterStatus(7);
           $("#conlcusion1result").text("Caso no Sospechoso");
           $("#conlcusion2result").text("Baja Posibilidad de evolución no favorable")
           $("#sel_sintomalogia").val(1)
           
      }
      if($("#txr_company_name")[0])//form registro de persona existente
      {
          $("#txr_company_name").val("");
         // $("#selr_area").val(0);
          $("#selr_local").text(0);
        
          $("#tx_temperatura").val("");
          $("#tx_antecedentes").val("");
          $("#selr_status").val(2);
          $("#tx_resultado").val("");
          if( $("#headerFormCovid")[0])
          $("#headerFormCovid").css({background:'#039be0'})
          $("#tx_ocupacion").val("");
          $("#tx_temperatura").val("");
          $("#tx_antecedentes").val("");
          $("#sel_statusFic").val(2);
          $("#txr_resultado").val("");
          $("#txr_nomape").val("");
          $("#txr_docum").val("");
          
          $("#tx_motivo_vetado").val("");
          $("#selr_statusrap").val(2);
          $("#selr_statusmolec").val(2);
          $("#sel_reagent").val(0); 
          $("#tx_date_tamizaje").val(""); 
          $("#tx_tempIN").val("");
          $("#tx_temoOUT").val("");
          $("#hid_id_area").val("");
          $('#txr_sel_embarcacion').val(0); 
          $('#txr_tx_empleador').val(0); 
          $('#txr_ocupacion').val(""); 
          $('#company').text("");
          $('#tx_job_type').val('Visita'); 
          $('#tx_actividad_economica').val('Pesca');
          $('#txr_tx_nacionalidad').val("");
          $('#txr_sel_departamento_res').val();
          $('#txr_sel_provincia_res').val(0);
          $('#txr_sel_distrito_res').val(0);
          $('#txr_tx_direccion_res').val(0);
          $('#txr_tx_email').val("");
          $('#txr_tx_celular').val("");
          $('#txr_tx_telefono').val("");
          $('#txr_tx_dato_familiar').val("");
          $('#txr_tx_celular_contacto').val("");
          $('#txr_sel_motivo').val(1);
          $('#txr_tx_edad').val(""); 
    
          $('#txr_chb_fiebre').prop('checked', false);; 
          $('#txr_chb_tos_seca').prop('checked', false);;  
          $('#txr_chb_dificulta_respirar').prop('checked', false);;  
          $('#txr_chb_dolor_garganta').prop('checked', false);;  
          $('#txr_chb_congecion_nasal').prop('checked', false);;
          $('#txr_chb_fatiga').prop('checked', false);;
          $('#txr_chb_escalofrio').prop('checked', false);;     
          $('#txr_chb_nauseas_vomito').prop('checked', false);;
          $('#txr_chb_diarrea').prop('checked', false);;
          $('#txr_chb_dolor_cabeza').prop('checked', false);; 
          $('#txr_chb_dolor_musculo').prop('checked', false);; 
          $('#txr_tx_fecha_inicio_sintomas').prop('checked', false);; 

          $('#txr_rb_no_1').prop('checked', true);;
          $('#chb_entorno_familiar').prop('checked', false);;
          $('#chb_entorno_laboral').prop('checked', false);;
          $('#chb_entorno_salud').prop('checked', false);;

          $('#txr_rb_no_2').prop('checked', true);;
          $("#sel_pais").val();
          $("#tx_retorno_pais").val("0");
          $('#txr_rb_no_3').prop('checked', true);;;
          $('#sel_distrito').val();

          $('#txr_chb_obesidad').prop('checked', false);;
          $('#txr_chb_enfermedad_pulmunar').prop('checked', false);;
          $('#txr_chb_diabete').prop('checked', false);;
          $('#txr_chb_impertension').prop('checked', false);;
          $('#txr_chb_mayor_60_ano').prop('checked', false);;
          $('#txr_chb_gestante').prop('checked', false);;

          $('#txr_chb_adulto_mayor').prop('checked', false);; 
          $('#txr_chb_nino').prop('checked', false);; 
          $('#txr_chb_gestante_2').prop('checked', false);;
          $('#txr_chb_familiar_enfermedad_cronica').prop('checked', false);;
          $('#txr_tx_cant_persona').val("");


          $("#div_contacto_persona").hide();
              $("#txr_chb_entorno_familiar").prop("checked",false);
              $("#txr_chb_entorno_laboral").prop("checked",false);
              $("#txr_chb_entorno_salud").prop("checked",false);          
         
    
          $(".div_fuera_pais").hide();
          
              $(".div_fuera_pais").hide();
              $("#txr_tx_fecha_retorno").val("");
              $("#txr_sel_pais_retorto").val("0").trigger("change");
           $(".div_distrito").hide();

           $("#sel_covidotrosmotivosnp").val(0)
           $("#sel_location_contagionp").val(0)
           selectedFilterStatus(9);
           
           $("#txr_conlcusion1result").text("Caso no Sospechoso");
           $("#txr_conlcusion2result").text("Baja Posibilidad de evolución no favorable")
           $("#selr_sintomalogia").val(1)

      }
      typeTamizajeOrign=0;//tipo de origen de tamizaje telf,sade, app


    }
 /*
    var thumbsUpregister = function(){
      
    

      var moduleExam=$("#modalRegisterCovidTestNewForm")[0];
      var tx_ocupacion = $("#tx_ocupacion").val();
      var tx_temperatura = $("#tx_temperatura").val();
      var tx_antecedentes = $("#tx_antecedentes").val();
      var sel_status = $("#sel_statusFic").val();
      var tx_resultado = $("#tx_resultado").val();
      var nameperson = $("#tx_nomape").val();
      var identity_document = $("#tx_docum").val();
      var vetoStatus = statusmed;
      var reason = $("#tx_motivo_vetado").val();
      var sel_statusrap =  $("#sel_statusrap").val();
      var sel_statusmolec = $("#sel_statusmolec").val();
      var sel_reagent = $("#sel_reagent").val(); 
      var fecha =  $("#tx_date_tamizaje").val(); 
      var tx_tempIN = $("#tx_tempIN").val();
      var tx_tempOUT = $("#tx_temoOUT").val();

    

     var flag=0;
     var validatefield="";
        
         if(tx_temperatura=="")
         {flag=1;     validatefield= "Debe ingresar "+"Temperatura";       }
         else if(tx_resultado=="")
         {flag=1;     validatefield= "Debe ingresar "+"Observaciones";       }


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
        title:moduleExam? "Registro de Tamizaje":"Editar Datos",
        text: "¿Seguro que desea registrar los datos ingresados?",
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
     
      if (!moduleExam) 
      {
        var url = apiurlblacklist+"/api/Post-Blacklist-User?code="+postblacklistusercode+"&httpmethod=putcovid&id="+idEdit;
        var body ={ 
          "job":tx_ocupacion,                
          "name":nameperson,
          "identity_document":identity_document,
          "list_type": 2,
          "last_updated_by": getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
          "fecha":fecha=="Invalid date"?'':fecha,
          "temperature_in":tx_tempIN,
          "temperature_out":tx_tempOUT
          //"name_doctor":getCookie("vtas_fullname")
        }
      }else
      {
        var url = apiurlaccessrequest+"/api/Post-CovidTestResult-all?code="+PostCovidTestResultall+"&httpmethod=post";                   
        //alert(sel_status);    
        var body ={
          "id_blacklist_user":idEdit,
          "id_location":location,
          "id_area":area,
          "id_company":company?company:0,
          "temperature":tx_temperatura,  
          "job":tx_ocupacion,
          "antecedent":tx_antecedentes,
          "status":sel_status,
          "status_test_fast":sel_statusrap,
          "status_test_molecular":sel_statusmolec,
          "note":tx_resultado,
          "created_by": getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
          "last_updated_by": getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
          "name_doctor":getCookie("vtas_fullname"+sessionStorage.tabVisitasa),
          "vetoStatus": vetoStatus,
          "responsible": responsible,
          "name_person":nameperson,
          "identity_document":identity_document,
          "list_type": 2,
          "attribute5":reason,
          "fecha":fecha,
          "temperature_in":tx_tempIN,
          "temperature_out":tx_tempOUT,
          "id_reagent_type":sel_reagent
        }
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
            },500)
           
            if(!$("#hid_mobile_temp")[0])//para que no actualice listado
              vw_black_list.reloadtableBlackList(tableBlackList());
            
            if($("#hid_mobile_temp")[0])
            handlerUrlhtml('contentGlobal','view/covidSecuryMobile.html');

            if (!moduleExam)
              $('#modalEditBlacklist').modal('hide');
            else
            {
              $('#modalRegisterCovidTestNewForm').modal('hide');
              $("#sel_status").val(0);
            }

            $("#company").text("");
            $("#area").text("");
            $("#local").text("");
            $("#tx_ocupacion").val();
            $("#tx_temperatura").val("36");
            $("#tx_antecedentes").val("");
            $("#sel_status").val(0);
            $("#tx_resultado").val("");
            if( $("#headerFormCovid")[0])
            $("#headerFormCovid").css({background:'#039be0'})
          }else{
            swal("Error!", "No se ha podido actualizar la lista.", "error");
          }

        }).fail(function( jqXHR, textStatus, errorThrown ) {
          
          
          console.log(errorThrown)
     });

    });
  
		    
          
    }*/

    var getReagentTypes= function(obj)
    { 
      var url = apiurlaccessrequest+"/api/Get-Reagent-Type?code="+GetReagentType+"&httpmethod=objectlist&search_type=1";                   
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
          $("#sel_reagent").append("<option value='0'>Seleccionar</option>"); 
          $("#selr_reagent").append("<option value='0'>Seleccionar</option>"); 
          $("#selr_reagent_history").append("<option value='0'>Seleccionar</option>");
        data.map(function(item){
          $("#sel_reagent").append("<option value="+item.id+">"+item.name+"</option>"); 
          $("#selr_reagent").append("<option value="+item.id+">"+item.name+"</option>"); 
          $("#selr_reagent_history").append("<option value="+item.id+">"+item.name+"</option>"); 
         
        });  

      });
    }

    var getObjectByValue = function (array, key, value) {
      return array.filter(function (object) {
          return object[key] === value;
      });
    }
    var getLocations= function()
    { 
      $("#sel_location").append("<option value='-1'>Cargando...</option>");
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
        selectLocation("#sel_locationtemp_1");
      });
  }

    var addContact = function(EMPRESA,NOMBRE,APELLIDO,DOCUMENTO,SEDE,AREA,OCUPACION,FECHA,COMPANYID,RUC,TYPECONTACT){ 
         
      var leng = $("#tb_tbody_covid_list").find("tr.row_covid").length;
      //alert(leng);
      //var type_contact = $("#sel_type_contact").val();
     
      if(EMPRESA && lengexcel==0)
      {
        
        $("#ruc_company_1").val(RUC);
        $("#sel_company_1").val(EMPRESA);
        $("#sel_cod_company_1").val(COMPANYID);
        
        
        
        
        $("#add_covid_firtname_1").val(NOMBRE+' '+APELLIDO);
        //$("#add_covid_lastname_1").val(APELLIDO);
        $("#add_covid_dni_1").val(DOCUMENTO?DOCUMENTO.trim():DOCUMENTO);
        var sede=SEDE;
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
          
        }


        $("#sel_location_1").val(sede);
        $("#sel_area_1").val(AREA);
        $("#tx_date_start_1").val(validateDateRequest(FECHA,1));
        getAreas('',leng,AREA)
        lengexcel++;

        //valida ois
       /*  if(TYPECONTACT=='contratista')
        { */
          $("#add_covid_dni_1").blur(function(){
            var dni = $(this).val();                  
            if(dni.trim().length>0)
            {
              if($("#sel_type_contact_1").val()=="colaborador")
                getCollaboratorDni(dni,1,'add_covid_firtname_1');
              
              checkOis(dni,1,TYPECONTACT);
            }
          });
          if(DOCUMENTO!=null)
          {
            var dni = $("#add_covid_dni_1").val();
            checkOis(dni,1,TYPECONTACT);
          }
       // }
      
        return;

      }

      
      leng++;
      lengList++;
      leng=lengList;
      $("#badgelistRequest").text(' ( '+leng+' )');
     // console.log(COMPANYID)
      /* <select name="sel_company_${leng}" class="form-control  external-company" id="sel_company_${leng}" required="" value="${EMPRESA?EMPRESA:''}">
                                  
                    </select>  */
                    //alert(TYPECONTACT);

      var nombre=(NOMBRE?toCapitalize(NOMBRE):'')+' '+(APELLIDO?toCapitalize(APELLIDO):'')
      var html = `<tr id="row_covid_${leng}" class="row_covid">
                  <td>
                    <div class="form-group bmd-form-group" style="padding-top:0!important">  
                      <img src="images/iconos/organizador.svg" class="mr-3 mt-2" height="24">
                    </div>
                  </td>                
                  <td>
                    <div class="form-group bmd-form-group" style="padding-top:0!important">
                      <select class="form-control" id="sel_type_contact_${leng}"  name="sel_type_contact_${leng}">
                        <option value="contratista">Contratista</option>
                        <option value="colaborador">Colaborador</option>
                      </select>
                      <small class="text-white"  id="" style="font-size: 11px;">Validations</small>                                                
                    </div>
                  </td>
                  <td>
                  <div class="form-group bmd-form-group" style="padding-top:0!important">                                  
                    <input type="text" maxlength="10" onkeyup="validaSoloNumeros(this.id)" class="form-control" id="add_covid_dni_${leng}" value="${DOCUMENTO?DOCUMENTO.trim():''}">                                                   
                    <small class="text-white"  id="validationsIdOiid_${leng}" style="font-size: 11px;">OIS Autorizado</small>
                    <div id="add_covid_dniload_1" class="loader" style="display:none"></div>  
                  </div>
                </td>
                  <td>
                    <div class="form-group bmd-form-group" style="padding-top:0!important">  
                      <input type="text" maxlength="25" class="form-control autocompletecollaborator" id="add_covid_firtname_${leng}" value="${nombre}">  
                      <small class="text-white">Validations</small>   
                      <input type="hidden" class="form-control" id="hid_collaborator_id_${leng}" name="hid_collaborator_id_${leng}">                       
                    </div>
                  </td>
                  <td>
                    <div class="form-group bmd-form-group" style="padding-top:0!important"> 
                    <input type="text" class="form-control" id="ruc_company_${leng}" maxlength="30" value="${RUC?RUC:''}"  onfocus="if (this.value!='') /*this.value='';$('#ruc_company_${leng}${leng}').val('');*/">                                                     
                    <small class="text-white">Validations</small>
                    </div>
                  </td>
                  <td>
                    <div class="form-group bmd-form-group" style="padding-top:0!important"> 
                    <input type="text" class="form-control autocompletecollaborator" id="sel_company_${leng}" maxlength="30" value="${EMPRESA?toCapitalize(EMPRESA):''}"  onfocus="if (this.value!='') /*this.value='';$('#sel_cod_company_${leng}').val(''); $('#sel_company_${leng}')[0].className='form-control'*/">                                                     
                    <small class="text-white">Validations</small>
                    </div>
                  </td>
                 
                 
                  <td>
                    <div class="form-group bmd-form-group" style="padding-top:0!important">
                      <select name="sel_location_${leng}" class="form-control validations_cupos" id="sel_location_${leng}"value="${SEDE?SEDE:''}">Seleccione</select>
                      <small class="text-white" id="small_message_${leng}" name="small_message_${leng}">Validations</small>   
                    </div>
                  </td>
                  <td>
                    <div class="form-group bmd-form-group" style="padding-top:0!important">
                      <select name="sel_area_${leng}" class="form-control" id="sel_area_${leng}" value="${AREA?AREA:''}">Seleccione</select>                                                   
                      <small class="text-white">Validations</small>   
                    </div>
                  </td>
                  <td>
                    <div class="form-group bmd-form-group" style="padding-top:0!important">                                  
                      <input type="text" maxlength="15"  class="form-control validations_cupos" autocomplete="off" id="tx_date_start_${leng}" value="${FECHA?validateDateRequest(FECHA,leng):''}">  
                      <input type="hidden" class="form-control " id="sel_cod_company_${leng}" name="sel_cod_company_${leng}" value="${!isNaN(COMPANYID)?COMPANYID+'':''}">                                                 
                      <small class="text-mute mutetexthelp">DD/MM/YYYY</small>   
                    </div>
                  </td>
                  
                  <td>
                  <div id="bt_delete_row_covid_${leng}" style="cursor: pointer;">
                      <img src="images/iconos/trash.svg" class="" >
                  </div>
                  </td>
                </tr>`;

                $("#tb_tbody_covid_list").append(html);
                $("#sel_type_contact_"+leng).val(TYPECONTACT);
               // console.log(isNaN(COMPANYID)  )
               /*  if(isNaN(COMPANYID))
                $('#sel_company_'+leng)[0].className='form-control text-danger'; */

                $("#bt_delete_row_covid_"+leng).click(function()
                {
                  var id  = 'row_covid_'+leng;
                  var obj = $("#"+id);
                  removeRowCovid(obj);
                  $("#cant_row_persona").html($("#list_participantes").find("div.bd-callout").length);
                });
                $("#sel_type_contact_"+leng).change(function(){
                  
                  clearRow(leng);   
                  getCollaborator($("#add_covid_firtname_"+leng),leng);                    
                  var value = $(this).val();
                  $("#ruc_company_"+leng)[0].disabled=false;
                    $("#sel_company_"+leng)[0].disabled=false;
                    $("#sel_company_"+leng)[0].className="form-control autocompletecollaborator";
                    $("#ruc_company_"+leng)[0].className="form-control autocompletecollaborator";

                  if(value=='colaborador')
                  {
                    $("#ruc_company_"+leng).val('20100971772');
                    $("#sel_company_"+leng).val('Tasa'); 
                    $("#ruc_company_"+leng)[0].disabled=true;
                    $("#sel_company_"+leng)[0].disabled=true;
                    $("#sel_company_"+leng)[0].className="form-control autocompletecollaborator bg-white";
                    $("#ruc_company_"+leng)[0].className="form-control autocompletecollaborator bg-white";

                  }
                });

                $("#add_covid_dni_"+leng).blur(function(){
                  var dni = $(this).val();                  
                  if(dni.trim().length>0){
                    checkOis(dni,leng,$("#sel_type_contact_"+leng).val());
                    if($("#sel_type_contact_"+leng).val()=="colaborador")
                      getCollaboratorDni(dni,leng,'add_covid_firtname_'+leng);
                  }
                    
                }); 
                if(DOCUMENTO!=null /* && $("#sel_type_contact_"+leng).val()=='contratista' */)
                {
                  var dni = $("#add_covid_dni_"+leng).val();
                  if(dni.trim().length>0)
                    checkOis(dni,leng,$("#sel_type_contact_"+leng).val());
                }
                
                
                autocompletarExternalCompany($("#ruc_company_"+leng),leng);
                $("#add_covid_dni_"+leng).autocomplete({          
                  change: function (event, ui) 
                  {
                    
                   
                    if (ui.item === null) 
                    {                      
                      
                    }
                    else if(ui.item)
                    {                     
                      $("#add_covid_firtname_"+leng).val(ui.item.firstname);
                    }
                  },
                  source: jsonPersonBlaclist,      
                  minLength: 1,
                  select: function( event, ui ) {
                    //$("#add_covid_dni_1").val(ui.item.label);
                    $("#add_covid_firtname_"+leng).val(ui.item.firstname);
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

                getAreas('',leng,AREA)
                selectExternalCompany($("#sel_company_"+leng),leng);
                selectLocation("#sel_location_"+leng,SEDE);
                //if($("#sel_type_contact_"+leng).val()=='colaborador'){
                getCollaborator($("#add_covid_firtname_"+leng),leng);
                //}
                
                $("#tx_date_start_"+leng).datetimepicker({
                  timepicker:false,
                  format:'d/m/Y',
                  minDate: 0
              });

            
              $("#sel_location_"+leng).change(function(){
                var date = $("#tx_date_start_"+leng).val();
                var sede = $(this).val();
                var objmessage = $("#small_message_"+leng);
                getCupoDisponible(date,sede,objmessage);
              });
        
              $("#tx_date_start_"+leng).change(function(){
                var date = $(this).val();
                var sede = $("#sel_location_"+leng).val();
                var objmessage = $("#small_message_"+leng);
                getCupoDisponible(date,sede,objmessage);
              });
              //alert("Aquí  "+$("#sel_company_11").val());
              //alert($("#sel_company_"+leng+""+leng).val());
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
          //$("#"+id).val("");
          if(datacol.value.length>0){
            $("#"+id).val(toCapitalize(datacol.value[0]['displayName']));  
          }     
        }
      });
    }

    var getDataCollaboratorDni = function(dni){
      // console.log("Buscando "+val+" en Directorio colaboradores......") 
      var param   = {filter:dni};
      var headers = {"Authorization":TOKEN_CLIENT,"apiKey":"r$3#23516ewew5"}
      var json    = {};
      $.ajax({
        url: apiurlsecurity+"/api/Get-Collaborator?code="+GetCollaborator+"&httpmethod=objectdni",
        //dataType: "json",
        method:"post",
        data : JSON.stringify(param),
        processData:false,
        crossDomain: true,
        async: false,
        headers : headers,
        success: function( datacolaborator ) 
        {
          json = JSON.parse(datacolaborator)
        }
      });
      return json;
    }
    


    var showHistory = function(id){
      //cargamos la imagen del pdf
      getSignaturenp();
      //---------------------------
      idEdit = id;
      //tb_test_covid_history
      if(oTableHistorytest){
        oTableHistorytest.clear().draw();
        oTableHistorytest.destroy();     
        //HistoryIsShown = 0;   
      }      
      $("#divtb_test_covid_history").hide();
      $("#modalTableHistory").modal("show");
      var id_blacklist_user = id;
      var httpmethod = "listhistory";
      var url = apiurlaccessrequest+"/api/Post-CovidTestResult-all?code="+PostCovidTestResultall+"&httpmethod="+httpmethod+"&id_blacklist_user="+id_blacklist_user;                   
      var headers ={
          "apikey":"r$3#23516ewew5"        
      }            
      oTableHistorytest = $('#tb_test_covid_history').DataTable({
        ordering  : false,
        info      : false,
        //pageLength: 100,
        paging:false,
        searching : false,
        scrollY   : '52vh',
        scrollCollapse: true,
        responsive: true,
        ajax      :{
            type: "POST",
            url:  url,
            headers:headers,
            crossDomain: true,
            dataType: "json",
            error: function (xhr, error, thrown) {
              console.log(xhr)
              var textError=thrown;
              var status=xhr.status;//500 error servidor              
              hideLoading();
          },
            dataSrc: function (req) 
            {
              jsonHistoryTamizaje = req;
              hideLoading();
              var data =[];
              var i = 0;
              
              req.map(function(item)
              {
                if(item.id_covid_test==null || item.id_covid_test==0){
                  var datar = JSON.stringify(item);
                 //fecha de atencion
                  var attention  = moment( formatDateTime(item.attention_date,17,true,true)).format('ll');
                  var week        = moment( formatDateTime(item.attention_date,17,true,true)).format('ddd');//dddd
                  var month       = moment( formatDateTime(item.attention_date,17,true,true)).format('MMMM');//
                  var day         = moment( formatDateTime(item.attention_date,17,true,true)).format('D'); ;
                  var time         =formatDateTime(item.attention_date,15,true,true);
                  
                  var startDate               =/*  week +" "+ */day +" de "+ month;
                  var datec=startDate;
                  var area = item.name_area?toCapitalize(item.name_area):"No Asignado";                    
                  var companys=item.name_external_company?toCapitalize(item.name_external_company):'-';
                  var name="'"+toCapitalize(item.name)+"'";
                  var statusColor="";
                  var ficha = "Negativo";
                  var test_fast = "Negativo";
                  var test_molecular = "Negativo";
                  var vetado       = '<div><i class="fa fa-circle statusPperCoursetx"></i><label style="margin-left:15px">Habilitado</label></div>';

                  //fecha de creacion
                  var weekc        = moment( formatDateTime(item.created_date,17,true,true)).format('ddd');//dddd
                  var monthc       = moment( formatDateTime(item.created_date,17,true,true)).format('MMMM');//
                  var daycc        = moment( formatDateTime(item.created_date,17,true,true)).format('D'); ;
                  var timec       =formatDateTime(item.created_date,15,true,true);
                  
                  var startDatec               = /* weekc +" "+ */daycc +" de "+ monthc;
                  var datecc=startDatec;
                  var pdf  = "";
                  if(item.status==1  ){
                    ficha = "Positivo";
                  }
                  if(item.status==2 ){
                    ficha = "No Realizado";
                  }
                  if(item.status== 3){
                    ficha = "Síntoma Respiratorio";
                  }
                    
                  if(item.status_test_fast==1){
                    test_fast = "Positivo";
                  }
                  if(item.status_test_fast==2){
                    test_fast = "No Realizado";
                  }
                    
                  if(item.status_test_molecular==1){
                    test_molecular  = "Positivo";
                  }
                  if(item.status_test_molecular==2){
                    test_molecular = "No Realizado";
                  }

                  if(item.veto_status==true || item.veto_status==1){
                    vetado       = '<div><i class="fa fa-circle text-danger"></i><label style="margin-left:15px">Vetado</label></div>';
                  }
                  if(item.covid_test==7){
                    vetado       = '<div><i class="fa fa-circle statusPperCoursetx"></i><label style="margin-left:15px">Habilitado Indefinido</label></div>';
                    pdf = `<button class="btn " onclick="vw_covid_list.downloadPdfAltaMedica('${item.identity_document}','${item.fullname}','${item.attention_date}','${item.date_end_alatmedica_pdf}','${item.date_ini_alatmedica_pdf}','${item.health_code_cmp}')">  <img height="24" src="images/iconos/iconpdf.svg"> </button>`;
                  
                    if(!item.date_ini_alatmedica_pdf)
                    pdf=''
                  }
                  //
                  if(item.attribute2==1)
                    var imgbut=`images/iconos/firstExam.svg`;
                  else
                    var imgbut=`images/iconos/newExam.svg`;
                  var plus = "";
                  req.map(function(item2)
                  {
                    if(item.id==item2.id_covid_test){
                      plus= `<i class="fa fa-plus details-control" id="${item.id}"></i>`;
                      
                    }
                  });

                  var natclar = "";
                  if(item.biIdF00>0){
                    natclar = `<i class="fa fa-check-circle text-success" style="font-size:20px"></i>`;
                  }
                  var row = {
                      id:item.id
                      ,fecha           : toCapitalize(datec)//attention 
                     // ,time		  : time  //
                      ,fechac           : toCapitalize(datecc)//attention 
                      ,timec		  : timec  //
                      ,antecedent		  : item.antecedent  //
                      ,ficha          : ficha
                      ,test_fast      : test_fast
                      ,test_molecular : test_molecular
                      ,temperature    : item.temperature
                      ,vetado         : vetado                      
                      ,doctor         : item.name_doctor
                      ,tamizaje       : `<button class="btn " onclick="vw_covid_list.showFichaTamizaje(${item.id},'${item.id_location}',${item.id_area},'${item.name_area}','${item.name_company}','${item.fullname}','${item.identity_document}','${item.job}','${item.temperature}','${escape(item.antecedent)}',${item.status_test_fast},'${item.status_test_molecular}','${item.status}','${escape(item.note)}',${item.veto_status},'${escape(item.attribute5)}',${item.id_blacklist_user},'${item.attention_date}',${item.id_reagent_type},${item.is_collaborator},${item.cb_fiebre},${item.cb_dificulta_respiratoria},${item.cb_tos_seca},${item.cb_dolor_garganta},${item.cb_congestion_nasal},${item.cb_fatiga},${item.cb_escalofrio},${item.cb_nauseas_vomito},${item.cb_diarrea},${item.cb_dolor_cabeza},${item.cb_dolor_musculo},'${item.fecha_inicio_sintoma}',${item.rb_concato_persona},${item.cb_entorno_famiiar},${item.cb_entorno_laborar},${item.cb_entorno_salud},'${item.pais_visitado}','${item.fecha_retorno}',${item.rb_direfente_distrito},'${item.distrito_visitado}',${item.cb_obesidad},${item.cb_enfemedad_pulmonar},${item.cb_diabete},${item.cb_impertension},${item.cb_mayo_60},${item.cb_nino},${item.cb_gestante},${item.cb_familiar_enfermedad},'${item.nro_personas}','${item.pregunta_1}','${item.pregunta_2}','${item.pregunta_3}','${item.pregunta_4}','${item.pregunta_5}','${item.pregunta_6}','${item.pregunta_7}',${item.ch_sospechoso},${item.id_embarcacion},'${item.name_embarcacion}',${item.id_tipo_trabajo},'${item.name_tipo_trabajo}',${item.motivo_tamizaje},${item.rb_pais_visitado},'${item.conclusion1}','${item.conclusion2}',${item.cb_adulto_mayor},${item.cb_gestante_2},${item.ch_evolucion},'${item.nacionalidad}','${item.actividad_economica}','${item.ubigeo}','${escape(item.direccion)}','${item.tlf_celular}','${item.tlf_fijo}','${item.dato_familiar}','${item.tlf_contacto}','${item.sexo}','${item.fecha_nacimiento}','${item.email}',${item.id_company},'${item.RUC}',${item.biIdF00}, ${item.cod_anexo1_natclar},${item.cod_anexo2_natclar},${item.cod_anexo3_natclar},${item.cod_anexo4_natclar},${item.cod_anexo5_natclar},${item.cod_paciente_natclar},${item.kit_covid},${item.sintomalogia}, ${item.otro_motivo},${item.lugar_contagio},${item.covid_test},${item.cb_examen_fisico},${item.cb_otros},'${item.observacion_examen_fisico}','${item.observacion_otros}',${item.extension_reposo})">  <img height="24" src="${imgbut}"> </button>`                      
                      ,pdf            : pdf
                      ,plus           :plus//`<i class="fa fa-plus details-control" id="${item.id}"></i>`
                      ,natclar        :natclar
                  }//item.covid_test==2?'':
                  i++;
                  data.push(row);
                  $("#textPAchist").text(toCapitalize(item.fullname)); 
                }
                 
              });
              $("#divtb_test_covid_history").fadeIn();
              return data;
            }
        },//nombre, apellido, dni, empresa, fecha de solicitud y estatus
        "initComplete": function(settings, json) {
          //$('#tb_test_covid_history tbody').unbind();
          //alert( 'DataTables has finished its initialisation.' );
          $('.details-control').click(function () {

            var thiss = $(this);
            var tr = thiss.closest('tr');
            var row = oTableHistorytest.row(tr);
            var HistoryIsShown = 0;     
            console.log(HistoryIsShown,row.child.isShown());
            // row.child.isShown() 
            if (HistoryIsShown==0 && row.child.isShown() ) {
                // This row is already open - close it
                row.child.hide();
                $(this).removeClass('fa-minus');
                $(this).addClass('fa-plus');
                HistoryIsShown = 1;
                
            }
            else {         
                // Open this row
                HistoryIsShown = 1;
                row.child( childrenHistory(row.data()) ).show();
                $(this).addClass('fa-minus');
                $(this).removeClass('fa-plus');
            }
          });
        },
        columns: [
            {title:"",data: "id", "visible": false},
            { title:"Fecha de Atención",data: "fecha",width: "15%",align:"left"   },
            //{ title:"Hora",data: "time",width: "7%",align:"left","orderable": false},
           // { title:"Fecha de Registro",data: "fechac",width: "15%",align:"left"   },
            { title:"Hora",data: "timec",width: "6%",align:"left","orderable": false},
            { title:"Ficha",data: "ficha",width: "12%",align:"left" ,"orderable": false},
            { title:"Prueba rápida",data: "test_fast",width: "12%",align:"left" ,"orderable": false},
            { title:"Prueba molecular",data: "test_molecular",width: "12%",align:"left" ,"orderable": false},
            { title:"Estatus",data: "vetado",width: "15%",align:"left" ,"orderable": false},
            { title:"Natclar",data: "natclar",width: "5%",align:"left" ,"orderable": false},
            { title:"Doctor",data: "doctor",width: "17%",align:"left" ,"orderable": false},
            { title:"Tamizaje",data: "tamizaje",width: "4%",align:"left" ,"orderable": false},
            { title:"PDF",data: "pdf",width: "4%",align:"left" ,"orderable": false} ,
            { title:"",data: "plus",width: "1%",align:"left" ,"orderable": false}//"className":'details-control',"orderable":false,"data":"", "defaultContent": ''
        ],
    });    
    $('#tb_test_covid_history tbody').unbind();
    $('#tb_test_covid_history tbody').on('click', 'td.details-control', function () {
      console.log($(this).attr("id"));
      var tr = $(this).closest('tr');
      var row = oTableHistorytest.row(tr);
      var HistoryIsShown = 0;     
      console.log(HistoryIsShown,row.child.isShown());
      // row.child.isShown() 
      if (HistoryIsShown==0 && row.child.isShown() ) {
          // This row is already open - close it
          row.child.hide();
          tr.removeClass('shown');
          HistoryIsShown = 1;
          
      }
      else {         
          // Open this row
          HistoryIsShown = 1;
          row.child( childrenHistory(row.data()) ).show();
          tr.addClass('shown');         
      }
      
  } );
    }

      var actionPlus = function(id){
        //alert(id);
        
        //console.log($(this).attr("id"));
        var tr = $('#tb_test_covid_history tbody td.details-control').closest('tr');
        var row = oTableHistorytest.row(tr);
        var HistoryIsShown = 0;     
        console.log(HistoryIsShown,row.child.isShown());
        // row.child.isShown() 
        if (HistoryIsShown==0 && row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
            HistoryIsShown = 1;
            
        }
        else {         
            // Open this row
            HistoryIsShown = 1;
            row.child( childrenHistory(row.data()) ).show();
            tr.addClass('shown');         
        }
      }
    var childrenHistory = function (d){      
      //console.log(d.id);
      /*console.log(jsonHistoryTamizaje);*/  
      var bandera = false;    
      var table = '<table class="table dataTable no-footer dtr-inline" style="width:"100%" >';
      var row = '';
      jsonHistoryTamizaje.map(function(item){
        //console.log(d.id+"=="+item.id_covid_test);
        if(d.id==item.id_covid_test){
          bandera = true;
          var attention   = moment( formatDateTime(item.attention_date,17,true,true)).format('ll');
          var week        = moment( formatDateTime(item.attention_date,17,true,true)).format('ddd');//dddd
          var month       = moment( formatDateTime(item.attention_date,17,true,true)).format('MMMM');//
          var day         = moment( formatDateTime(item.attention_date,17,true,true)).format('D'); ;
          var time         =formatDateTime(item.attention_date,15,true,true);          
          var startDate               =/*  week +" "+ */day +" de "+ month;
          var datec=startDate;
          var area = item.name_area?toCapitalize(item.name_area):"No Asignado";                    
          var companys=item.name_external_company?toCapitalize(item.name_external_company):'-';
          var name="'"+toCapitalize(item.name)+"'";
          var statusColor="";
          var ficha = "Negativo";
          var test_fast = "Negativo";
          var test_molecular = "Negativo";
          var vetado       = '<div><i class="fa fa-circle statusPperCoursetx"></i><label style="margin-left:15px">Habilitado</label></div>';
          //fecha de creacion
          var weekc        = moment( formatDateTime(item.created_date,17,true,true)).format('ddd');//dddd
          var monthc       = moment( formatDateTime(item.created_date,17,true,true)).format('MMMM');//
          var daycc        = moment( formatDateTime(item.created_date,17,true,true)).format('D'); ;
          var timec       =formatDateTime(item.created_date,15,true,true);
          
          var startDatec               = /* weekc +" "+ */daycc +" de "+ monthc;
          var datecc=startDatec;
          var pdf  = "";
          if(item.status==1  ){
            ficha = "Positivo";
          }
          if(item.status==2 ){
            ficha = "No Realizado";
          }
          if(item.status== 3){
            ficha = "Síntoma Respiratorio";
          }
            
          if(item.status_test_fast==1){
            test_fast = "Positivo";
          }
          if(item.status_test_fast==2){
            test_fast = "No Realizado";
          }
            
          if(item.status_test_molecular==1){
            test_molecular  = "Positivo";
          }
          if(item.status_test_molecular==2){
            test_molecular = "No Realizado";
          }

          if(item.veto_status==true || item.veto_status==1){
            vetado       = '<div><i class="fa fa-circle text-danger"></i><label style="margin-left:15px">Vetado</label></div>';
          }
          if(item.covid_test==7){
            vetado = '<div><i class="fa fa-circle statusPperCoursetx"></i><label style="margin-left:15px">Habilitado Indefinido</label></div>';
            pdf = `<button class="btn " onclick="vw_covid_list.downloadPdfAltaMedica('${item.identity_document}','${item.fullname}','${item.attention_date}','${item.date_end_alatmedica_pdf}','${item.date_ini_alatmedica_pdf}','${item.health_code_cmp}')">  <img height="24" src="images/iconos/iconpdf.svg"> </button>`;
          
            if(!item.date_ini_alatmedica_pdf)
            pdf='';
          }
          //
          if(item.attribute2==1)
            var imgbut=`images/iconos/firstExam.svg`;
          else
            var imgbut=`images/iconos/newExam.svg`;
            
            var natclar = "";
            if(item.biIdF00>0){
              natclar = `<i class="fa fa-check-circle text-success" style="font-size:20px"></i>`;
            }

          row += '<tr>'+
                    '<td width="14%">'+toCapitalize(datec)+'</td>'+
                    '<td width="6%">'+timec+'</td>'+
                    '<td width="11%">'+ficha+'</td>'+
                    '<td width="12%">'+test_fast+'</td>'+
                    '<td width="12%">'+test_molecular+'</td>'+
                    '<td width="15%">'+vetado+'</td>'+
                    '<td width="5%">'+natclar+'</td>'+
                    '<td width="17%">'+item.name_doctor+'</td>'+
                    '<td width="3%">'+`<button class="btn " onclick="vw_covid_list.showFichaTamizaje(${item.id},'${item.id_location}',${item.id_area},'${item.name_area}','${item.name_company}','${item.fullname}','${item.identity_document}','${item.job}','${item.temperature}','${escape(item.antecedent)}',${item.status_test_fast},'${item.status_test_molecular}','${item.status}','${escape(item.note)}',${item.veto_status},'${escape(item.attribute5)}',${item.id_blacklist_user},'${item.attention_date}',${item.id_reagent_type},${item.is_collaborator},${item.cb_fiebre},${item.cb_dificulta_respiratoria},${item.cb_tos_seca},${item.cb_dolor_garganta},${item.cb_congestion_nasal},${item.cb_fatiga},${item.cb_escalofrio},${item.cb_nauseas_vomito},${item.cb_diarrea},${item.cb_dolor_cabeza},${item.cb_dolor_musculo},'${item.fecha_inicio_sintoma}',${item.rb_concato_persona},${item.cb_entorno_famiiar},${item.cb_entorno_laborar},${item.cb_entorno_salud},'${item.pais_visitado}','${item.fecha_retorno}',${item.rb_direfente_distrito},'${item.distrito_visitado}',${item.cb_obesidad},${item.cb_enfemedad_pulmonar},${item.cb_diabete},${item.cb_impertension},${item.cb_mayo_60},${item.cb_nino},${item.cb_gestante},${item.cb_familiar_enfermedad},'${item.nro_personas}','${item.pregunta_1}','${item.pregunta_2}','${item.pregunta_3}','${item.pregunta_4}','${item.pregunta_5}','${item.pregunta_6}','${item.pregunta_7}',${item.ch_sospechoso},${item.id_embarcacion},'${item.name_embarcacion}',${item.id_tipo_trabajo},'${item.name_tipo_trabajo}',${item.motivo_tamizaje},${item.rb_pais_visitado},'${item.conclusion1}','${item.conclusion2}',${item.cb_adulto_mayor},${item.cb_gestante_2},${item.ch_evolucion},'${item.nacionalidad}','${item.actividad_economica}','${item.ubigeo}','${escape(item.direccion)}','${item.tlf_celular}','${item.tlf_fijo}','${item.dato_familiar}','${item.tlf_contacto}','${item.sexo}','${item.fecha_nacimiento}','${item.email}',${item.id_company},'${item.RUC}',${item.biIdF00}, ${item.cod_anexo1_natclar},${item.cod_anexo2_natclar},${item.cod_anexo3_natclar},${item.cod_anexo4_natclar},${item.cod_anexo5_natclar},${item.cod_paciente_natclar},${item.kit_covid},${item.sintomalogia}, ${item.otro_motivo},${item.lugar_contagio},${item.covid_test},${item.cb_examen_fisico},${item.cb_otros},'${item.observacion_examen_fisico}','${item.observacion_otros}',${item.extension_reposo})">  <img height="24" src="${imgbut}"> </button>`+'</td>'+
                    '<td width="3%">'+pdf+'</td>'+
                    '<td width="4%">&nbsp;</td>'+
                  '</tr>'; 
        }      
      });
      //console.log(bandera,row);
      if(bandera==false)
      {
        row = '<tr>'+
                '<td colspan="10" class="text-center">Sin duplicado</td>'+
              '</tr>';
          table += row;
          table +='</table>';
          return table;
      }
      
      table += row;
      table +='</table>';
      return table;          
  }
    
    var showFichaTamizaje=function(id,location,id_area,name_area,company_name,fullname,identity_document,job,temperature,antecedent,status_test_fast,status_test_molecular,status,note,veto_status,obs_vetado,id_blacklist_user,attention_date,id_reagent_type,is_collaborator,cb_fiebre,cb_dificulta_respiratoria,cb_tos_seca,cb_dolor_garganta,cb_congestion_nasal,cb_fatiga,cb_escalofrio,cb_nauseas_vomito,cb_diarrea,cb_dolor_cabeza,cb_dolor_musculo,fecha_inicio_sintoma,rb_concato_persona,cb_entorno_famiiar,cb_entorno_laborar,cb_entorno_salud,pais_visitado,fecha_retorno,rb_direfente_distrito,distrito_visitado,cb_obesidad,cb_enfemedad_pulmonar,cb_diabete,cb_impertension,cb_mayo_60,cb_nino,cb_gestante,cb_familiar_enfermedad,nro_personas,pregunta_1,pregunta_2,pregunta_3,pregunta_4,pregunta_5,pregunta_6,pregunta_7,ch_sospechoso,id_embarcacion,name_embarcacion,id_tipo_trabajo,name_tipo_trabajo,motivo_tamizaje,rb_pais_visitado,conclusion1,conclusion2,cb_adulto_mayor,cb_gestante_2,ch_evolucion,nacionalidad,actividad_economica,ubigeo,direccion,tlf_celular,tlf_fijo,dato_familiar,tlf_contacto,sexo,fecha_nacimiento,email,id_company,ruc,biIdF00,cod_anexo1_natclar,cod_anexo2_natclar,cod_anexo3_natclar,cod_anexo4_natclar,cod_anexo5_natclar,cod_paciente_natclar,kit_covid,sintomatologia,otro_motivo,lugar_contagio,covid_test,cb_examen_fisico,cb_otros,observacion_examen_fisico,observacion_otros,extension_reposo)
    {
     

      

      //$("#txr_fecha_inicio_sintomas_history").val();
      //$("#txr_fecha_retorno_history").val();
      //alert(ruc);
      $("#txr_company_history_ruc").val(ruc);

      //alert(unescape(obs_vetado));
      //console.log(obs_vetado);
      getLocationsR($("#selr_local_history"),location);
      selectExternalCompanyNewExam($("#txr_company_name_history"),$("#txr_company_id_history"),$("#txr_nomape_history"),$("#txr_ocupacion_history"),$("#h_colaborator_id_history"),$("#txr_company_history_ruc"),0,0);
      //alert("dddd");
      $("#modalViewBlackCovidTest").modal("show");

      $("#selr_statusrap_history").change(function(){        
        if ($(this).val()==1) {$(".reagentr_history").show()}else{$(".reagentr_history").hide()}
        verifyStatus(3);

        var fichaCovid = $("#selr_statusFic_history").val(); 
        var testMolecular = $("#selr_statusmolec_history").val(); 
        if($(this).val()=="1" || fichaCovid =="1" || testMolecular=="1" ){          
          $("#divLugarContagioHistorial").show();
        }
        else{
          $("#divLugarContagioHistorial").hide();
        }
        
      })

      $("#selr_statusmolec_history").change(function(){        
        verifyStatus(3);
        var fichaCovid = $("#selr_statusFic_history").val(); 
        var testFast = $("#selr_statusrap_history").val(); 
        if($(this).val()=="1" || testFast =="1" || fichaCovid=="1" ){          
          $("#divLugarContagioHistorial").show();
        }
        else{
          $("#divLugarContagioHistorial").hide();
        }
        
      })
//alert("ssdsds");
      if(is_collaborator==1){
        $("#txr_empleador_history").val('colaborador');
        var reqJson = getDataCollaboratorDni(identity_document);
        //console.log(reqJson,reqJson.value.length);
        $("#hid_id_area_sap_history").val("0");
        $("#hid_name_area_sap_history").val("");
        $("#hid_id_location_sap_history").val("0");
        $("#hid_name_location_sap_history").val("");      
        $("#hid_user_company_type_history").val(""); 
       // alert(reqJson.value[0].userCompanyType);
        if(reqJson.value.length>0){
          $("#hid_user_company_type_history").val(reqJson.value[0].userCompanyType); 
          if(reqJson.value[0].userCompanyType=="EMPLEADOS"){
            $("#hid_name_area_sap_history").val(reqJson.value[0].department);          
            $("#hid_id_area_sap_history").val(reqJson.value[0].userAreaFuncCode); 
           }
           else{
            $("#hid_name_area_sap_history").val(reqJson.value[0].userUODescription);
            $("#hid_id_area_sap_history").val(reqJson.value[0].userUOCode);
          }
          $("#hid_id_location_sap_history").val(reqJson.value[0].plantCode);
          $("#hid_name_location_sap_history").val(reqJson.value[0].plantDescription);
          
        }        
      }
        
      else
       $("#txr_empleador_history").val('contratista')
      //alert(id_area+" - "+name_area);
      //var optionArea = '<option value="'+id_area+'">'+name_area+'</option>';
      //alert(optionArea);
      $("#hid_attention_date").val(attention_date);
      var now = moment(attention_date).add(-5, 'hours').format('DD/MM/YYYY');
      $("#txr_fecha_tamizaje_history").val(now);
      $("#txr_fecha_history").datetimepicker({
          defaultDate: now,
          timepicker:false,
          format:'d/m/Y',
          maxDate:now
      });

      biIdF00 = biIdF00!=null && biIdF00!="null" && biIdF00!=""?biIdF00:0;
      nacionalidad  = nacionalidad!=null && nacionalidad!="null"?nacionalidad:"";
      direccion     = direccion!=null && direccion!="null"?direccion:"";
      tlf_celular   = tlf_celular!=null && tlf_celular!="null"?tlf_celular:"";
      tlf_fijo      = tlf_fijo!=null && tlf_fijo!="null"?tlf_fijo:"";
      dato_familiar = dato_familiar!=null && dato_familiar!="null"?dato_familiar:"";
      tlf_contacto  = tlf_contacto!=null && tlf_contacto!="null"?tlf_contacto:"";
      fecha_nacimiento = fecha_nacimiento!=null && fecha_nacimiento!="null"?fecha_nacimiento:"";
      email         = email!=null && email!="null"?email:"";

      kit_covid  = kit_covid!=null && kit_covid!="null"?kit_covid:0;

      $("#hid_biIdF00").val(biIdF00);      
      $('#txr_fecha_history').val(now);///No existe
      $("#selr_area_history").val(id_area);//optionArea
      $("#txr_company_name_history").val(company_name);
      $("#txr_company_id_history").val(id_company);
      $("#txr_nomape_history").val(fullname);
      $("#txr_docum_history").val(identity_document);
      $("#txr_ocupacion_history").val(job);
      $("#txr_temperatura_history").val(temperature);
      $("#txr_antecedentes_history").val(unescape(antecedent));
      $("#h_id").val(id_blacklist_user);
      $("#h_id_h").val(id);
      var textStatus = "NEGATIVO";
      if(status==1){
        textStatus = "POSITIVO";
      }
      if(status==2){
        textStatus = "NO REALIZADO";
      }
      if(status==3){
        textStatus = "SINTOMA RESPIRATORIO";
      }
     
      var optionFicha = '<option>'+textStatus+'</option>';            
      $("#selr_statusFic_history").val(status);
   
      var textStatusFast = "NEGATIVO";     
      if(status_test_fast==1){
        textStatusFast = "POSITIVO";
      }
      if(status_test_fast==2){
        textStatusFast = "NO REALIZADO";
      }
      var optionFast = '<option>'+textStatusFast+'</option>';            
      $("#selr_statusrap_history").val(status_test_fast).trigger('change');

      var textStatusFMolecular = "NEGATIVO";
      if(status_test_molecular==1){
        textStatusFMolecular = "POSITIVO";
      }
      if(status_test_molecular==2){
        textStatusFMolecular = "NO REALIZADO";
      }
      var optionMolecular = '<option>'+textStatusFMolecular+'</option>';            
      $("#selr_statusmolec_history").val(status_test_molecular).trigger('change');

      //console.log(note)
      note = note=='null' | note==null?'':note;
      $("#txr_resultado_history").val(unescape(note));
      //alert(veto_status);
      $("#selr_reagent_history").val(id_reagent_type);

  
      var dep = ubigeo.slice(0, 2);
      var prov = ubigeo.slice(2, 4);
      var dist = ubigeo.slice(4, 6);
      var depVis = distrito_visitado.slice(0, 2);
      var provVis = distrito_visitado.slice(2, 4);
      var distVis = distrito_visitado.slice(4, 6);
      $("#selr_departamento_res_history").val(dep)

      getProvincias(dep,$("#selr_provincia_res_history"),prov);
      getDistritos(dep,prov,$("#selr_distrito_res_history"),$("#selr_distrito_history"),dist,distVis);

      //$("#selr_provincia_res_history").val(prov).trigger('change')
      //$("#selr_distrito_res_history").val(dist)

      $("#txr_email_history").val(email);
      $("#txr_nacionalidad_history").val(nacionalidad);
      $("#txr_direccion_res_history").val(unescape(direccion));
      $("#txr_celular_history").val(tlf_celular);
      $("#txr_telefono_history").val(tlf_fijo);
      $("#txr_dato_familiar_history").val(dato_familiar);
      $("#txr_celular_contacto_history").val(tlf_contacto);
      $("#txr_sexo_history").val(sexo);
      if (fecha_nacimiento!=null && fecha_nacimiento!="null" && fecha_nacimiento!="0001-01-01T00:00:00") {
        fecha_nacimiento = moment(fecha_nacimiento).format('DD/MM/YYYY');
        $("#txr_edad_history").val(fecha_nacimiento);        
      }

      cod_anexo1_natclar = cod_anexo1_natclar!=null || cod_anexo1_natclar?cod_anexo1_natclar:0;
      cod_anexo2_natclar = cod_anexo2_natclar!=null || cod_anexo2_natclar?cod_anexo2_natclar:0;
      cod_anexo3_natclar = cod_anexo3_natclar!=null || cod_anexo3_natclar?cod_anexo3_natclar:0;
      cod_anexo4_natclar = cod_anexo4_natclar!=null || cod_anexo4_natclar?cod_anexo4_natclar:0;
      $("#hid_cod_anexo1_natclar").val(cod_anexo1_natclar);
      $("#hid_cod_anexo2_natclar").val(cod_anexo2_natclar);
      $("#hid_cod_anexo3_natclar").val(cod_anexo3_natclar);
      $("#hid_cod_anexo4_natclar").val(cod_anexo4_natclar);
      $("#hid_cod_anexo5_natclar").val(cod_anexo5_natclar);
      $("#hid_cod_paciente_natclar").val(cod_paciente_natclar);
       
      //se utiliza para de extension de reposo
      $("#hid_covid_test_ext").val(covid_test);
      $("#hid_last_veto_status_ext").val(veto_status);
      //,cod_anexo2_natclar,cod_anexo3_natclar,cod_anexo4_natclar,cod_anexo5_natclar
      //pregunta_1,pregunta_2,pregunta_3,pregunta_4,pregunta_5,pregunta_6,pregunta_7
      //ch_sospechoso,name_embarcacion,name_tipo_trabajo,conclusion2,,,ch_evolucion      
      $("#selr_embarcacion_history").val(name_embarcacion);
      $("#txr_job_type_history").val(name_tipo_trabajo);
      $("#selr_motivo_history").val(motivo_tamizaje);  

      $("#chbr_fiebre_history").prop( "checked", cb_fiebre );
      $("#chbr_dificulta_respirar_history").prop( "checked", cb_dificulta_respiratoria );
      $("#chbr_tos_seca_history").prop( "checked", cb_tos_seca );
      $("#chbr_dolor_garganta_history").prop( "checked", cb_dolor_garganta );
      $("#chbr_congecion_nasal_history").prop( "checked", cb_congestion_nasal );
      $("#chbr_fatiga_history").prop( "checked", cb_fatiga );
      $("#chbr_escalofrio_history").prop( "checked", cb_escalofrio );
      $("#chbr_nauseas_vomito_history").prop( "checked", cb_nauseas_vomito );
      $("#chbr_diarrea_history").prop( "checked", cb_diarrea );
      $("#chbr_dolor_cabeza_history").prop( "checked", cb_dolor_cabeza );
      $("#chbr_dolor_musculo_history").prop( "checked", cb_dolor_musculo );


      $("#chb_examen_fisico_history").prop( "checked", false );
      $("#chb_otros_history").prop( "checked", false);

      $("#chb_examen_fisico_history").prop( "checked", cb_examen_fisico );
      $("#chb_otros_history").prop( "checked", cb_otros);
     //div_input_examen_fisico_historial
      if(cb_examen_fisico){
        $("#div_input_examen_fisico_historial").show();
        $("#tx_observacion_examen_fisico_history").val(observacion_examen_fisico);
      }
      else{
        $("#div_input_examen_fisico_historial").hide();
        $("#tx_observacion_examen_fisico_history").val("");
      }
      if(cb_otros){
        $("#tx_observacion_otro_history").val(observacion_otros);
        $("#div_input_otros_history").show();
      }
      else{
        $("#tx_observacion_otro_history").val("");
        $("#div_input_otros_history").hide();
      }

      if (fecha_inicio_sintoma!=null && fecha_inicio_sintoma!="null") {
        //console.log(fecha_inicio_sintoma);
        fecha_inicio_sintoma = moment(fecha_inicio_sintoma).format('DD/MM/YYYY');
        $("#txr_fecha_inicio_sintomas_history").val(fecha_inicio_sintoma);        
      }

      if(rb_concato_persona==true){$("#rbr_si_1_history").prop( "checked", true );$("#div_contacto_persona_history").show()}else{$("#rbr_no_1_history").prop( "checked", true );$("#div_contacto_persona_history").hide()}
      $("#chbr_entorno_familiar_history").prop( "checked", cb_entorno_famiiar );
      $("#chbr_entorno_laboral_history").prop( "checked", cb_entorno_laborar );
      $("#chbr_entorno_salud_history").prop( "checked", cb_entorno_salud );


      if(rb_pais_visitado==true){$("#rbr_si_2_history").prop( "checked", true );$(".div_fuera_pais_history").show()}else{$("#rbr_no_2_history").prop( "checked", true );$(".div_fuera_pais_history").hide()}
      $("#selr_pais_retorto_history").val(pais_visitado);
      if (fecha_retorno!=null&&fecha_retorno!="null") {
        fecha_retorno = moment(fecha_retorno).format('DD/MM/YYYY');
        $("#txr_fecha_retorno_history").val(fecha_retorno);        
      }



      if(rb_direfente_distrito==true){$("#rbr_si_3_history").prop( "checked", true );$(".div_distrito_history").show()}else{$("#rbr_no_3_history").prop( "checked", true );$(".div_distrito_history").hide()}
      //$("#selr_distrito_history").val(distrito_visitado);

      $("#chbr_obesidad_history").prop( "checked", cb_obesidad );
      $("#chbr_enfermedad_pulmunar_history").prop( "checked", cb_enfemedad_pulmonar );
      $("#chbr_diabete_history").prop( "checked", cb_diabete );
      $("#chbr_impertension_history").prop( "checked", cb_impertension );
      $("#chbr_mayor_60_ano_history").prop( "checked", cb_mayo_60 );
      $("#chbr_gestante_history").prop( "checked", cb_gestante );

      $("#chbr_adulto_mayor_history").prop( "checked", cb_adulto_mayor );
      $("#chbr_nino_history").prop( "checked", cb_nino );
      $("#chbr_gestante_2_history").prop( "checked", cb_gestante_2 );
      $("#chbr_familiar_enfermedad_cronica_history").prop( "checked", cb_familiar_enfermedad );
      $("#sel_covidotrosmotivos_history").val(otro_motivo?otro_motivo:0);
      $("#sel_location_contagio_history").val(lugar_contagio);

      if(lugar_contagio)
        $("#divLugarContagio").show();
      

      if(nro_personas!=null){$("#txr_cant_persona_history").val(nro_personas);}


      if (conclusion1!=null && conclusion1!='null') {$("#conlcusion1result_history").text(conclusion1);}
      else{$("#conlcusion1result_history").text("Sin Observación");}

      if (conclusion2!=null && conclusion2!='null') {$("#conlcusion2result_history").text(conclusion2);}
      else{$("#conlcusion2result_history").text("Sin Observación");}
      
      $("#divfieldreposo_history").hide();
      if(veto_status==1)
      {
        $("#divfieldreposo_history").hide();//mientras
        $("#sel_extend_reposo_history").val(0);
        /*
        if(extend_reposo){
        }*/
          $("#sel_extension_reposo_history").val(extension_reposo);
          $("#divfielExtensionReposoHistory").show();        
      }
      
      
      if(veto_status==0 && covid_test!=7)
      {
        statusmed = 0;
        $("#label_status_list_9_history").addClass("active");
        $("#label_status_list_9_history").show();
        $("#label_status_list_10_history").removeClass("active");
        $("#label_status_list_10_history").removeClass("bg-danger");
        $("#label_status_list_10_history").removeClass("text-white");
        $("#col_observacion_vetado_history").hide();
        $("#txr_motivo_vetado_history").val("");
        selectedFilterStatus(11)
      }
      else if(covid_test==7){
        statusmed = 88;
        $("#label_status_list_9_history").removeClass("active");
        $("#label_status_list_9_history").removeClass("statusPperCourse");
        $("#label_status_list_9_history").removeClass("text-white");
        $("#label_status_list_10_history").removeClass("active");                        
        $("#label_altamedica_88_historial").addClass("statusPperProg");
        $("#label_altamedica_88_historial").addClass("text-white");
        $("#label_altamedica_88_historial").addClass("active");
        $("#label_altamedica_88_historial").show();
        $("#col_observacion_vetado_history").hide();
        //$("#txr_motivo_vetado_history").val(unescape(obs_vetado));
        //selectedFilterStatus(8888);//8
        //statusmed=88;
      }
      else
      {
        statusmed = 1;
        $("#label_status_list_9_history").removeClass("active");
        $("#label_status_list_10_history").addClass("bg-danger");
        $("#label_status_list_10_history").addClass("text-white");
        $("#label_status_list_10_history").addClass("active");
        $("#label_status_list_10_history").show();
        $("#col_observacion_vetado_history").show();
        $("#div_chb_kit_covid_history").show();   
        $("#txr_chb_kit_covid_history").prop("checked",false);
        if(kit_covid==1)
          $("#txr_chb_kit_covid_history").prop("checked",true);
        
        $("#txr_motivo_vetado_history").val(unescape(obs_vetado));
        selectedFilterStatus(12)
      }
      
      if(sintomatologia==2)
        $("#sel_sintomalogia_history").val(2);
        else
        $("#sel_sintomalogia_history").val(1);

        
        $("#notificationVetoPErson_history").hide();
        var riesgo=covid_checkRiskList(identity_document);
      if(riesgo.length>0)
      {
        console.log("En lista de riesgo");
        $("#modalViewBlackCovidTest").modal("hide");
        $("#modalRegisterCovidTestNewForm").modal("hide");
        $("#modalRegisterBlackCovidTest").modal("hide");

        /* setTimeout(function(){
          $("#modalnotifRiesgo").modal('show');
        },500) */
       
      }
      
    }

    var updateCovidTest = function(){
      //alert("ssssss"+idEdit+" "+id);
      //return;
      //verificamos la las cookies
      var cookie = getCookie("vtas_fullname"+sessionStorage.tabVisitasa);          
      if(cookie.trim().length==0){        
        swal({
          title: "Su sessión se ha vencido, Debe iniciar sesión.",
          text: validatefield,
          timer: 3000,
          type: "error",
          showConfirmButton: true
          });  
          setTimeout(function(){
            window.location.href='./'; 
          },3000);         
        return;
      }

      var location = $("#selr_local_history").val();
      var name_location = $("#selr_local_history  option:selected").text();
      var job = $("#txr_ocupacion_history").val();
      tx_ocupacion = job;
      var name = $("#txr_nomape_history").val();
      
      var company =  $("#txr_company_id_history").val();
      var name_company = $("#txr_company_name_history").val();
      
      var id          = $("#h_id").val();
      var id_history  = $("#h_id_h").val();
      //console.log(id,id_history);
      var reason = $("#txr_motivo_vetado_history").val();

      var attention_date = $("#txr_fecha_tamizaje_history").val();//txr_fecha_tamizaje_history
      //console.log(attention_date);      
      var hhmm = moment().add(5, 'hours').format('HH:mm:ss');
      var now = moment(attention_date,'DD/MM/YYYY').format('YYYY-MM-DD');
      
      if(attention_date != undefined)
        attention_date = now+" "+hhmm;

      //alert(attention_date);
      var status = $("#selr_statusFic_history").val();
      var status_test_fast = $("#selr_statusrap_history").val();
      var status_test_molecular = $("#selr_statusmolec_history").val();
      var temperature = $("#txr_temperatura_history").val();
      var area = $("#selr_area_history").val();
      var name_area = $("#selr_area_history option:selected" ).text();
      var antecedentes = $("#txr_antecedentes_history").val();
      var note = $("#txr_resultado_history").val();
      var responsible = getCookie('vtas_id'+sessionStorage.tabVisitasa);
      var identity_document = $("#txr_docum_history").val();
      var nameperson = $("#txr_nomape_history").val(); 
      var arrayNamePerson     =  nameperson.split(" ");
      var apellidoPaterno     = "";
      var apellidoMaterno     = "";
      var fullName            = "";
      if(arrayNamePerson.length==2) {
        apellidoPaterno = arrayNamePerson[1];
        fullName        = arrayNamePerson[0];
      }
      else if(arrayNamePerson.length==3) {
        apellidoPaterno = arrayNamePerson[1];
        apellidoMaterno = arrayNamePerson[2];
        fullName        = arrayNamePerson[0];
      }
      else if(arrayNamePerson.length==4) {
        apellidoPaterno = arrayNamePerson[2];
        apellidoMaterno = arrayNamePerson[3];
        fullName        = arrayNamePerson[0]+" "+arrayNamePerson[1];
      }
      else if(arrayNamePerson.length==5) {
        apellidoPaterno = arrayNamePerson[3];
        apellidoMaterno = arrayNamePerson[4];
        fullName        = arrayNamePerson[0]+" "+arrayNamePerson[1]+" "+arrayNamePerson[2];
      }
      else if(arrayNamePerson.length==6) {
        apellidoPaterno = arrayNamePerson[4];
        apellidoMaterno = arrayNamePerson[5];
        fullName        = arrayNamePerson[0]+" "+arrayNamePerson[1]+" "+arrayNamePerson[2]+" "+arrayNamePerson[3];
      }

      var reagent = $("#selr_reagent_history").val();
      var fecha = moment().format('DD/MM/YYYY');
      console.log(now);
      //attention_date = now;1

      if(name_company=="0-tasa" || name_company=="tasa" || name_company=="Tasa" || name_company=="TASA" || name_company.toLowerCase().trim() == "tasa" || name_company.toLowerCase().trim().includes("tasa"))
      var is_collaborator = 1;
      else
      var is_collaborator = 0;


      var namePersona         = nameperson;//$('#tx_name_per').val(); 
      var identityDocument    = identity_document;//$('#tx_identity_document').val(); 
      var sede                = location;//$('#sel_sede').val(); 
      //var area                = area;
      var embarcacion         = $('#selr_embarcacion_history').val(); 
      var name_embarcacion    = $('#selr_embarcacion_history').text(); 
      var empleador           = $('#txr_empleador_history').val(); 
      var puestoTrabajo       = $('#txr_ocupacion_history').val(); 
      var companyname         = $('#txr_company_name_history').val();
      var ruc_company         = $("#txr_company_history_ruc").val();
      var tipoTrabajo         = $('#txr_job_type_history').val(); 
      var name_tipoTrabajo    = $('#txr_job_type_history').text(); 
      var actividadEconomica  = $('#txr_actividad_economica_history').val();
      var nacionalidad        = $('#txr_nacionalidad_history').val();
      var departamento        = $('#selr_departamento_res_history').val();
      var provincia           = $('#selr_provincia_res_history').val();
      var distrito            = $('#selr_distrito_res_history').val();
      var direccion           = $('#txr_direccion_res_history').val();
      var email               = $('#txr_email_history').val();
      var celular             = $('#txr_celular_history').val();
      var telefono            = $('#txr_telefono_history').val();
      var datoFamiliar        = $('#txr_dato_familiar_history').val();
      var telefonoContacto    = $('#txr_celular_contacto_history').val();
      var motivo              = $('#selr_motivo_history').val();
      var temperature         = temperature;//$('#tx_temperature').val(); 
      var sexo                = $('#txr_sexo_history').val(); 
      var fechaNacimiento    = $('#txr_edad_history').val(); 
      //---------------------------------------------------------      
      var fiebre              = $('#chbr_fiebre_history'); 
      var tosSeca             = $('#chbr_tos_seca_history');  
      var dificultadRespirar  = $('#chbr_dificulta_respirar_history');  
      var dolorGarganta       = $('#chbr_dolor_garganta_history');  
      var congestionNasal     = $('#chbr_congecion_nasal_history');
      var fatiga              = $('#chbr_fatiga_history');
      var escalofrio          = $('#chbr_escalofrio_history');     
      var nauseas             = $('#chbr_nauseas_vomito_history');
      var diarrea             = $('#chbr_diarrea_history');
      var dolorCabeza         = $('#chbr_dolor_cabeza_history'); 
      var dolorMusculo        = $('#chbr_dolor_musculo_history'); 
      var examenFisico        = $('#chb_examen_fisico_history'); 
      var otros               = $('#chb_otros_history'); 
      var observacionExamenFisico = $('#tx_observacion_examen_fisico_history').val();
      var observacionOtros = $('#tx_observacion_otro_history').val();
      
      var fechaSintomas       = $('#txr_fecha_inicio_sintomas_history').val(); 
      //----------------------------------------------------------
      var rbContactoPersona   = $('input:radio[name=rb_contacto_persona_history]:checked');
      var entornoFamiliar     = $('#chbr_entorno_familiar_history');
      var entornoLaboral      = $('#chbr_entorno_laboral_history');
      var entornoSalud        = $('#chbr_entorno_salud_history');
      var arrayEntorno        = [];
      //----------------------------------------------------------
      //----------------------------------------------------------
      var rbFueraPais         = $('input:radio[name=rb_fuera_pais_history]:checked');
      var pais                = $("#selr_pais_retorto_history").val();
      var name_pais           = pais!="0"?$("#selr_pais_retorto_history option:selected").text():"";
      var fechaRetorno        = $("#txr_fecha_retorno_history").val();
      //----------------------------------------------------------
      //----------------------------------------------------------
      var rbDiferenteDistrito = $('input:radio[name=rb_distrito_history]:checked');
      var distrito2            = $('#selr_distrito_history').val();
      //var tipoTrabajo         = $('#sel_tipo_trabajo').val();
      //----------------------------------------------------------
      //----------------------------------------------------------
      //factores de riesgos
      var obesidad            = $('#chbr_obesidad_history');
      var enfermedadPulmunar  = $('#chbr_enfermedad_pulmunar_history');
      var diabete             = $('#chbr_diabete_history');
      var impertension        = $('#chbr_impertension_history');
      var mayor60ano          = $('#chbr_mayor_60_ano_history');
      var gestante            = $('#chbr_gestante_history');
      var arrayFactorRiesgo   = [];
      //----------------------------------------------------------
      //----------------------------------------------------------
      var adultoMayor         = $('#chbr_adulto_mayor_history'); 
      var nonio               = $('#chbr_nino_history'); 
      var chb_gestante_2      = $('#chbr_gestante_2_history');
      var familiarEnfermedad  = $('#chbr_familiar_enfermedad_cronica_history');
      var arrayMiemmbrosFamiliar = [];
      //-----------------------------------------------------------
      //-----------------------------------------------------------
      var cantPersona         = $('#txr_cant_persona_history').val();
      var daysRest            = $("#sel_day_reposo_history").val();
      var kitCovid            = $('#txr_chb_kit_covid_history');      
      //-----------------------------------------------------------

      //-----------------------------------------------------------
      var idAreaSap       = $("#hid_id_area_sap_history").val();
      var nameAreaSap     =  $("#hid_name_area_sap_history").val();
      var idLocationSap   = $("#hid_id_location_sap_history").val();
      var nameLocationSap = $("#hid_name_location_sap_history").val();
      var userCompanyType = $("#hid_user_company_type_history").val();
      //alert(userCompanyType);
      //----------------------------------------------------------- 
      var store_sintomas_total  = 0;
      var cant_sintomas         = 0; 
      var store_factor_riesgo   = 0;
      //-----------------------------------------------------------      
      var cod_anexo1_natclar  = $("#hid_cod_anexo1_natclar").val();
      var cod_anexo2_natclar  = $("#hid_cod_anexo2_natclar").val();
      var cod_anexo3_natclar  = $("#hid_cod_anexo3_natclar").val();
      var cod_anexo4_natclar  = $("#hid_cod_anexo4_natclar").val();
      //------------------------------------------------------------
      var sel_reagent   = $("#selr_reagent_history").val(); 
      var sintomalogia  =  $("#sel_sintomalogia_history").val(); 
      
      var covidotrosmotivos =  $("#sel_covidotrosmotivos_history").val(); 
      var locationcontagio =  $("#sel_location_contagio_history").val(); 

      var sel_statusFic  =  $("#selr_statusFic_history").val(); 
      var sel_statusrap =  $("#selr_statusrap_history").val();
      var sel_statusmolec = $("#selr_statusmolec_history").val();

      var extension_reposo   = $("#sel_extension_reposo_history").val();
      //alert(sel_reagent);
      var arraySintomas = [];

      var flag=0;
      var validatefield=""; 
      //---------------------------------------------------------------

      //-----------------------------------------------------------
        //sumamos los sintomas seleccionados   
        //console.log(fiebre.is(":checked"));
        if(fiebre.is(":checked")){
          store_sintomas_total =store_sintomas_total+parseInt(fiebre.data("score"));
          cant_sintomas++; 
          arraySintomas.push(fiebre.val());
          console.log(parseInt(fiebre.data("score")),store_sintomas_total)
        }
        if(dificultadRespirar.is(":checked")){
          store_sintomas_total =store_sintomas_total+parseInt(dificultadRespirar.data("score"));
          cant_sintomas++;
          arraySintomas.push(dificultadRespirar.val());
          console.log(parseInt(dificultadRespirar.data("score")),store_sintomas_total)
        }
        if(tosSeca.is(":checked")){
          store_sintomas_total =store_sintomas_total+parseInt(tosSeca.data("score"));
          cant_sintomas++;
          arraySintomas.push(tosSeca.val());
          console.log(parseInt(tosSeca.data("score")),store_sintomas_total)
        }
        if(dolorGarganta.is(":checked")){
          store_sintomas_total =store_sintomas_total+parseInt(dolorGarganta.data("score"));
          cant_sintomas++;
          arraySintomas.push(dolorGarganta.val());
          console.log(parseInt(dolorGarganta.data("score")),store_sintomas_total)
        }
        if(congestionNasal.is(":checked")){
          store_sintomas_total =store_sintomas_total+parseInt(congestionNasal.data("score"));
          cant_sintomas++;
          arraySintomas.push(congestionNasal.val());
          console.log(parseInt(congestionNasal.data("score")),store_sintomas_total)
        }
        if(fatiga.is(":checked")){
          store_sintomas_total =store_sintomas_total+parseInt(fatiga.data("score"));
          cant_sintomas++;
          arraySintomas.push(fatiga.val());
          console.log(parseInt(fatiga.data("score")),store_sintomas_total)
        }
        if(escalofrio.is(":checked")){
          store_sintomas_total =store_sintomas_total+parseInt(escalofrio.data("score"));
          cant_sintomas++;
          arraySintomas.push(escalofrio.val());
          console.log(parseInt(escalofrio.data("score")),store_sintomas_total)
        }
        if(nauseas.is(":checked")){
          store_sintomas_total =store_sintomas_total+parseInt(nauseas.data("score"));
          cant_sintomas++;
          arraySintomas.push(nauseas.val());
          console.log(parseInt(nauseas.data("score")),store_sintomas_total)
        }
        if(diarrea.is(":checked")){
          store_sintomas_total =store_sintomas_total+parseInt(diarrea.data("score"));
          cant_sintomas++;
          arraySintomas.push(diarrea.val());
          console.log(parseInt(diarrea.data("score")),store_sintomas_total)
        }
        if(dolorCabeza.is(":checked")){
          store_sintomas_total =store_sintomas_total+parseInt(dolorCabeza.data("score"));
          cant_sintomas++;
          arraySintomas.push(dolorCabeza.val());
          console.log(parseInt(dolorCabeza.data("score")),store_sintomas_total)
        }
        if(dolorMusculo.is(":checked")){
          store_sintomas_total =store_sintomas_total+parseInt(dolorMusculo.data("score"));
          cant_sintomas++;
          arraySintomas.push(dolorMusculo.val());
          console.log(parseInt(dolorMusculo.data("score")),store_sintomas_total)
        }

        if(examenFisico.is(":checked")){
          store_sintomas_total =store_sintomas_total+parseInt(examenFisico.data("score"));
          cant_sintomas++;
          arraySintomas.push(examenFisico.val());       
        }
        if(otros.is(":checked")){
          store_sintomas_total =store_sintomas_total+parseInt(otros.data("score"));
          cant_sintomas++;
          arraySintomas.push(otros.val());       
        }

        //-------------------------------------------------------
        //-------------------------------------------------------
        //sumamos factores de riegos
        //console.log(fiebre.data("score"), obesidad.data("score"));
        if(obesidad.is(":checked")) {
          store_factor_riesgo +=obesidad.data("score");
          arrayFactorRiesgo.push(obesidad.val());
        }
        if(enfermedadPulmunar.is(":checked")){
          store_factor_riesgo +=enfermedadPulmunar.data("score");
          arrayFactorRiesgo.push(enfermedadPulmunar.val());
        }
        if(diabete.is(":checked")){
          store_factor_riesgo +=diabete.data("score");
          arrayFactorRiesgo.push(diabete.val());
        }
        if(impertension.is(":checked")){
          store_factor_riesgo +=impertension.data("score");
          arrayFactorRiesgo.push(impertension.val());
        }
        if(mayor60ano.is(":checked")){
          store_factor_riesgo +=mayor60ano.data("score");
          arrayFactorRiesgo.push(mayor60ano.val());
        }
        if(gestante.is(":checked")){
          store_factor_riesgo +=gestante.data("score");
          arrayFactorRiesgo.push(gestante.val());
        }
        //----------------------------------------------------
        //----------------------------------------------------
        if(adultoMayor.is(":checked")){
          arrayMiemmbrosFamiliar.push(adultoMayor.val());
        }
        if(nonio.is(":checked")){
          arrayMiemmbrosFamiliar.push(nonio.val());
        }
        if(chb_gestante_2.is(":checked")){
          arrayMiemmbrosFamiliar.push(chb_gestante_2.val());
        }
        if(familiarEnfermedad.is(":checked")){
          arrayMiemmbrosFamiliar.push(familiarEnfermedad.val());
        }
        //----------------------------------------------------
        //coclusión 1
        var conclusion1 = "Caso no sospechoso";
        var conclusion2 = "Baja Posibilidad de evolución no favorable";
        var encuestaFoo = 0;
        var chEvolucion = 0;
        conclusion1 = "Caso no sospechoso";
        encuestaFoo = 0;
        if(($("#sel_covidotrosmotivos_history").val()!=0 && $("#sel_covidotrosmotivos_history").val()!=null)||(cant_sintomas>=1)||($("#selr_statusFic_history").val()==1||$("#selr_statusFic_history").val()==3)){
          //rbContactoPersona
          conclusion1 = "Caso Sospechoso";
          encuestaFoo = 1;          
        } 
      ///alert( tx_ocupacion+" - " +job);
       
      if(empleador=="0")
      {flag=1;      validatefield= "Debe seleccionar el empleador";}
      else if(identity_document=="")
      {flag=1;     validatefield= "Debe ingresar "+"Documento de identidad";}
      else if(nameperson.trim().length==0)
      {flag=1;     validatefield= "Debe ingresar el Nombre y Apellido";}          
      else if(location=="0" || location==null)
      {flag=1;       validatefield= "Debe seleccionar la Sede";}
      else if(area=="0")
      {flag=1;      validatefield= "Debe seleccionar el Área";}
      else if(tx_ocupacion=="")
      {flag=1;    validatefield= "Debe ingresar el Puesto de Trabajo";}                       
      else if(companyname=="")
      {flag=1;    validatefield= "Debe ingresar "+"Empresa";}   
      else if(tipoTrabajo=="0" || tipoTrabajo=="" || tipoTrabajo==null)
      {flag=1;    validatefield= "Debe ingresar el Tipo de Trabajo";}          
      else if(actividadEconomica=="")
      {flag=1;    validatefield= "Debe seleccionar la Actividad Económica";}
      else if(nacionalidad=="")
      {flag=1;    validatefield= "Debe ingresar la Nacionalidad";}        
      else if(departamento=="0")
      {flag=1;    validatefield= "Debe seleccionar el Departamento";}        
      else if(provincia=="0")
      {flag=1;    validatefield= "Debe seleccionar la Provincia";}
      else if(distrito=="0")
      {flag=1;    validatefield= "Debe seleccionar el Distrito";}
      else if(direccion.trim().length==0)
      {flag=1;    validatefield= "Debe ingresar la Dirección";}
      else if(email.trim().length==0)
      {flag=1;    validatefield= "Debe ingresar el Email";}
      else if(celular.trim().length==0)
      {flag=1;    validatefield= "Debe ingresar el Número de Celular";}
      else if(datoFamiliar.trim().length==0)
      {flag=1;    validatefield= "Debe ingresar el Dato Familiar ";}
      else if(telefonoContacto.trim().length==0)
      {flag=1;    validatefield= "Debe ingresar el Número de celular del contacto ";}          
      else if(motivo=="0" || motivo=="" || motivo==null)
      {flag=1;    validatefield= "Debe ingresarle Motivo ";}
      else if(temperature.trim().length==0)
      {flag=1;    validatefield= "Debe ingresar la Temperatura";}
      else if(sexo=="0")
      {flag=1;    validatefield= "Debe Seleccionar el Sexo";}

      if((encuestaFoo==1 || sel_statusFic =="1" || sel_statusrap=="1" || sel_statusmolec=="1" || covidotrosmotivos=="1" || covidotrosmotivos=="2") && locationcontagio=="0"){
        flag=1;    validatefield= "Debe seleccionar el lugar de contagio";
       }

      /*/else if(fechaNacimiento.trim().length==0)
      {flag=1;    validatefield= "Debe ingresar la Fecha de Nacimiento";}*/
      else if(note=="")
      {flag=1;     validatefield= "Debe ingresar "+"Observaciones";}
 
      var tx_resultado = note;

      if(flag==1)
      {
        swal({
          title: "Campos vacios",
          text: validatefield,
          timer: 4000,
          type: "error",
          showConfirmButton: true
          });
       // swal("Error", "No se ha ingresado observación", "error");
        $('#tx_resultado').focus();
        return;
      }

        

        $("#txr_conlcusion1result").text(conclusion1);//se coloca en resultado

        //console.log((store_sintomas_total+store_factor_riesgo));
        if((store_sintomas_total+store_factor_riesgo) >=1 && (store_sintomas_total+store_factor_riesgo)<=8){
          conclusion2 ="Baja Posibilidad de evolución no favorable";
          chEvolucion = 0;
        }
        if((store_sintomas_total+store_factor_riesgo) >=9){
          conclusion2 ="Alta Posibilidad de evolución no favorable";
          chEvolucion=1;
        }
        var fechaNow = moment().format("YYYY-MM-DD hh:mm:ss");
        //console.log(fechaNow);

        if(rbContactoPersona.val()=="si"){        
          if(entornoFamiliar.is(":checked"))
            arrayEntorno.push(entornoFamiliar.val());
          if(entornoLaboral.is(":checked"))
            arrayEntorno.push(entornoLaboral.val());
          if(entornoSalud.is(":checked"))
            arrayEntorno.push(entornoSalud.val());
        }
        if(rbContactoPersona.val()=="no"){ 
          arrayEntorno=[];
        }
              
        var lugar_contagio     = "";
        if($("#sel_location_contagio_history").val()!="0"){
          lugar_contagio = $("#sel_location_contagio_history option:selected").text();
        }

        var evento1 ={ }
        var evento2 ={ }
        var evento3 ={ }
        var evento4 ={ }     
        var array_eventos_send =[];
      //$('#sel_motivo').val(); 
      if(encuestaFoo==1){//caso sospechoso
        evento1 = {
          "biIdHistoria": cod_anexo1_natclar,         
          "descripcionEvento": "1",
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "1",//
          "vcSintomatologia": "2",
          "vcResultado": "CASO SOSPECHOSO",
          "vcObservacion": tx_resultado,
          "zonaContacto":lugar_contagio          
        }
        array_eventos_send.push("cod_anexo1_natclar");
      }
      else if(encuestaFoo==0){//caso sospechoso
        evento1 = { 
          "biIdHistoria": cod_anexo1_natclar,         
          "descripcionEvento": "1",
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "10",//
          "vcSintomatologia": "2",
          "vcResultado": "CASO NO SOSPECHOSO",
          "vcObservacion": tx_resultado,
          "zonaContacto":lugar_contagio          
        }
        array_eventos_send.push("cod_anexo1_natclar");
      }
      
      if(parseFloat(temperature)>=35 && parseFloat(temperature)<=36.7)//
      {
        evento2 = {
          "biIdHistoria": cod_anexo2_natclar,
          "descripcionEvento": "2",//TEMPERATURA
          "dtEvento":fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "6",//NORMAL TEMPERATURA
          "vcSintomatologia": "2",
          "vcResultado": "NORMAL TEMPERATURA",
          "vcObservacion": tx_resultado,//""
          "zonaContacto":lugar_contagio
        }
        array_eventos_send.push("cod_anexo2_natclar");
      }
      if(parseFloat(temperature)>36.7){
        evento2 = {
          "biIdHistoria": cod_anexo2_natclar,
          "descripcionEvento": "2",//TEMPERATURA
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "7",//ANORMAL TEMPERATURA
          "vcSintomatologia": "2",
          "vcResultado": "ANORMAL TEMPERATURA",
          "vcObservacion": tx_resultado,//""
          "zonaContacto":lugar_contagio
        }
        array_eventos_send.push("cod_anexo2_natclar");
      }

      if(sel_reagent=="4"){///REACTIVO IGM/IGG
        evento3 = {
            "biIdHistoria": cod_anexo3_natclar,          
            "descripcionEvento": "3",
            "dtEvento": fechaNow,
            "vcMotivo": motivo,
            "vcOrigen": "VISI-TASA",
            "iIdEstadoPaciente": "8",//REACTIVO IGM/IGG
            "vcSintomatologia": "2",
            "vcResultado": "REACTIVO IGM/IGG",
            "vcObservacion": tx_resultado,
            "zonaContacto":lugar_contagio          
        }
        array_eventos_send.push("cod_anexo3_natclar");
      }
      else if(sel_reagent=="1"){//NO REACTIVO
        evento3 = { 
            "biIdHistoria": cod_anexo3_natclar,         
            "descripcionEvento": "3",
            "dtEvento": fechaNow,
            "vcMotivo": motivo,
            "vcOrigen": "VISI-TASA",
            "iIdEstadoPaciente": "8",//NO REACTIVO
            "vcSintomatologia": "2",
            "vcResultado": "NO REACTIVO",
            "vcObservacion": tx_resultado,
            "zonaContacto":lugar_contagio          
        }
        array_eventos_send.push("cod_anexo3_natclar");
      }
      else if(sel_reagent=="2"){//REACTIVO IGM
        evento3 = {    
            "biIdHistoria": cod_anexo3_natclar,      
            "descripcionEvento": "3",
            "dtEvento": fechaNow,
            "vcMotivo": motivo,
            "vcOrigen": "VISI-TASA",
            "iIdEstadoPaciente": "12",//REACTIVO IGM
            "vcSintomatologia": "2",
            "vcResultado": "REACTIVO IGM",
            "vcObservacion": tx_resultado,
            "zonaContacto":lugar_contagio          
        }
        array_eventos_send.push("cod_anexo3_natclar");
      }
      else if(sel_reagent=="3"){//REACTIVO IGG
        evento3 = {
            "biIdHistoria": cod_anexo3_natclar,
            "descripcionEvento": "3",
            "dtEvento": fechaNow,
            "vcMotivo": motivo,
            "vcOrigen": "VISI-TASA",
            "iIdEstadoPaciente": "13",//REACTIVO IGG
            "vcSintomatologia": "2",
            "vcResultado": "REACTIVO IGG",
            "vcObservacion": tx_resultado,
            "zonaContacto":lugar_contagio          
        }
        array_eventos_send.push("cod_anexo3_natclar");
      }

      if(status_test_molecular =="1"){
        evento4 = {
          "biIdHistoria": cod_anexo4_natclar,
          "descripcionEvento": "4",//TEMPERATURA
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "4",//POSITIVO MOLECULAR
          "vcSintomatologia": "2",
          "vcResultado": "POSITIVO MOLECULAR",
          "vcObservacion": tx_resultado,//""
          "zonaContacto":lugar_contagio
        }
        array_eventos_send.push("cod_anexo4_natclar");
      }
      else if(status_test_molecular =="0"){
        evento4 = {
          "biIdHistoria": cod_anexo4_natclar,
          "descripcionEvento": "4",//TEMPERATURA
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "5",//NEGATIVO MOLECULAR
          "vcSintomatologia": "2",
          "vcResultado": "NEGATIVO MOLECULAR",
          "vcObservacion": tx_resultado,//""
          "zonaContacto":lugar_contagio
        }
        array_eventos_send.push("cod_anexo4_natclar");
      }
      else if(status_test_molecular =="2"){
        evento4 = {
          "biIdHistoria": cod_anexo4_natclar,
          "descripcionEvento": "4",//TEMPERATURA
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "14",//PENDIENTE MOLECULAR
          "vcSintomatologia": "2",
          "vcResultado": "PENDIENTE MOLECULAR",
          "vcObservacion": tx_resultado,//""
          "zonaContacto":lugar_contagio
        }
        array_eventos_send.push("cod_anexo4_natclar");
      }

        var eventos = [];
        if(JSON.stringify(evento1)!="{}")//vacío
          eventos.push(evento1);
        if(JSON.stringify(evento2)!="{}")//vacío
          eventos.push(evento2);
        if(JSON.stringify(evento3)!="{}")//vacío
          eventos.push(evento3);
        if(JSON.stringify(evento4)!="{}")//vacío
          eventos.push(evento4);

        
        //----------------------------------------------------------------
        var stringArraySintomas = arraySintomas.toString();
            stringArraySintomas = stringArraySintomas.replace(/,/g,'|');///replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
        //----------------------------------------------------------------      
        var distritoVistadoText = $( "#selr_distrito_history option:selected" ).text();
          distritoVistadoText   = rbDiferenteDistrito.val()!="no"?distritoVistadoText:"";;
        console.log(distritoVistadoText);
        //----------------------------------------------------------------
        var stringArrayFactorRiesgo = arrayMiemmbrosFamiliar.toString();
        console.log(arrayMiemmbrosFamiliar);
            stringArrayFactorRiesgo = stringArrayFactorRiesgo.replace(/,/g,'|');
        //----------------------------------------------------------------      
        var stringArrayEnfermedad   = arrayFactorRiesgo.toString();
            stringArrayEnfermedad   = stringArrayEnfermedad.replace(/,/g,'|');
        //----------------------------------------------------------------         
        var stringArrayEntorno      = arrayEntorno.toString();
            stringArrayEntorno      = stringArrayEntorno.replace(/,/g,'|');
        //-----------------------------------------------------------------
        //"veto_status": statusmed,
      

        var json = {
          "dtEnvio": fechaNow,
          "pacientes": 
          [
            {
              "tipoDocumento": "DNI",
              "dniPaciente": identityDocument,
              "dFechaNacimiento": $("#txr_edad_history").val(),
              "vcSexo": sexo,//"M",
              "vcCompania": "20100971772",//ruc_company,// "20100971772",
              "vcContrata": "20100971772",//ruc_company,//"20100971772",
              "vcUnidad": sede.toString(),//"0062",
              "vcPuesto": tx_ocupacion,//"",
              "vcArea": name_area,//"",
              "apellidoPaterno": apellidoPaterno ,//"ARCOS",
              "apellidoMaterno": apellidoMaterno ,//"ROMUCHO",
              "nombres": fullName, //"HENRY MANUEL",
              "nacionalidad":nacionalidad,//"",
              "vcUbigeo": departamento+provincia+distrito,//"010105",
              "vcDireccionActual": direccion,//"",
              "vcCorreo": email,///"",
              "vcCelular":celular,//"",
              "vcFijo": telefono,//"",           
              "vcNombreFamiliar": datoFamiliar,
              "vcCelularFamiliar": telefonoContacto,
              "vcFijoFamiliar": telefonoContacto,
              "vcTipoTrabajo": "Temporal",//tipoTrabajo,
              "vcActividadEconomiac": actividadEconomica,
              "F00":
              [
                {
                  "biIdF00": $("#hid_biIdF00").val(),
                  "preguntaSintomas": stringArraySintomas,//"Fiebre|Dolor de Garganta",
                  "FechaInicioSintomas": fechaSintomas,
                  "EntornoContacto": rbContactoPersona.val(),
                  "AlternativaEntornoContacto": stringArrayEntorno,
                  "ViajoFueraPais": rbFueraPais.val(),
                  "QuePais": name_pais,
                  "RetornoPais": fechaRetorno,
                  "DesplazoDistritos": rbDiferenteDistrito.val(),
                  "QueDistrito": distritoVistadoText,
                  "Enfermedad": stringArrayEnfermedad,//arrayFactorRiesgo
                  "OtrasEnfermedades": "",
                  "grupoRiesgo": stringArrayFactorRiesgo,
                  "NroPersonasDomicilio": cantPersona,
                  "score": store_sintomas_total+store_factor_riesgo,
                  "conclusion1": conclusion1,
                  "conclusion2": conclusion2
                }
              ],
              "eventos": eventos
            }
          ]
        }
        console.log(JSON.stringify(json));
        console.log(json);




          swal({
            title:"Editar Datos",
            text: "¿Seguro que desea actualizar los datos ingresados?",
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

            },100);                                 
        //<--antiguo-->
        //var url = apiurlaccessrequest+"/api/Post-CovidTestResult-all?code="+PostCovidTestResultall+"&httpmethod=post";
        var url = apiurlblacklist+"/api/Post-Blacklist-User?code="+postblacklistusercode+"&httpmethod=postblackcovid"; 
        var body ={
          "id_blacklist_user":idEdit,
          "id_covid_test":id_history,
          "id_location":location,
          "id_area":area,
          "id_company":company?company:0,
          "temperature":temperature,  
          "job":job,
          "antecedent":antecedentes,
          "status":status,
          "status_test_fast":status_test_fast,
          "status_test_molecular":status_test_molecular,
          "note":note,
          "created_by": getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
          "last_updated_by": getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
          "name_doctor": toCapitalize(getCookie("vtas_fullname"+sessionStorage.tabVisitasa)),                    
          "veto_status": (statusmed != 88)?statusmed:0,
          "responsible": responsible,
          "name_person":nameperson,
          "identity_document":identity_document,          
          "list_type": 2,
          "covid_test":(statusmed != 88)?"2":"7",
          "is_collaborator": is_collaborator,
          "attribute5":reason,
          "covid_attribute2":"0",
          "attention_date":attention_date,
          "attribute4":1,//editado
          "fecha":fecha,
          "id_reagent_type":reagent,
          "attribute2":"0",
          "cb_fiebre":fiebre.is(":checked"),
          "cb_dificulta_respiratoria":dificultadRespirar.is(":checked"),
          "cb_tos_seca":tosSeca.is(":checked"),
          "cb_dolor_garganta":dolorGarganta.is(":checked"),
          "cb_congestion_nasal":congestionNasal.is(":checked"),
          "cb_fatiga":fatiga.is(":checked"),
          "cb_escalofrio":escalofrio.is(":checked"),
          "cb_nauseas_vomito":nauseas.is(":checked"),
          "cb_diarrea":diarrea.is(":checked"),
          "cb_dolor_cabeza":dolorCabeza.is(":checked"),
          "cb_dolor_musculo":dolorMusculo.is(":checked"),
          "fecha_inicio_sintoma":fechaSintomas,            
          "rb_concato_persona":rbContactoPersona.val()=="si"?true:false,
          "cb_entorno_famiiar":entornoFamiliar.is(":checked"),
          "cb_entorno_laborar":entornoLaboral.is(":checked"),
          "cb_entorno_salud":entornoSalud.is(":checked"),
          "rb_pais_visitado":rbFueraPais.val()=="si"?true:false,//falta backend
          "pais_visitado":pais,
          "fecha_retorno":fechaRetorno,
          "rb_direfente_distrito":rbDiferenteDistrito.val()=="si"?true:false,
          "distrito_visitado":rbDiferenteDistrito.val()=="si"?departamento+provincia+distrito2:"",
          "cb_obesidad":obesidad.is(":checked"),
          "cb_enfemedad_pulmonar":enfermedadPulmunar.is(":checked"),
          "cb_diabete":diabete.is(":checked"),
          "cb_impertension":impertension.is(":checked"),
          "cb_mayo_60":mayor60ano.is(":checked"),
          "cb_adulto_mayor":mayor60ano.is(":checked"),//falta backend
          "cb_nino":nonio.is(":checked"),
          "cb_gestante":gestante.is(":checked"),
          "cb_familiar_enfermedad":familiarEnfermedad.is(":checked"),
          "cb_gestante_2":chb_gestante_2.is(":checked"),////falta backend
          "nro_personas":cantPersona,
          "ch_sospechoso":encuestaFoo,
          "ch_evolucion":chEvolucion,
          "pregunta_1":"¿Qué síntomas presenta?",
          "pregunta_2":"¿En los últimos 14 días ha tenido contacto con personas con diagnóstico confirmados de coronavirus?",
          "pregunta_3":"¿Ha viajado fuera del país o zona del Perú con casos confimados de covid-19 en los últimos 14 días?",
          "pregunta_4":"¿En los últimos 14 días se desplazó a diferentes distritos distintos a su lugar de residencia?",
          "pregunta_5":"¿Usted padece o padeció de algunas de las siguientes enfermedades o condiciones?",
          "pregunta_6":"¿En la casa donde habita tiene los siguientes grupos de riesgo?",
          "pregunta_7":"¿Cuántas personas viven en el domicilio donde habita?",
          "id_embarcacion":embarcacion,
          "name_embarcacion":embarcacion,
          "id_tipo_trabajo":tipoTrabajo,
          "name_tipo_trabajo":tipoTrabajo,
          "motivo_tamizaje": motivo,
          "nacionalidad":nacionalidad,
          "actividad_economica":actividadEconomica,
          "ubigeo":departamento+provincia+distrito,
          "direccion":direccion,
          "tlf_celular":celular,
          "tlf_fijo":telefono,
          "conclusion1":conclusion1,
          "conclusion2":conclusion2,
          "dato_familiar":datoFamiliar,
          "tlf_contacto":telefonoContacto,
          "sexo":sexo,
          "fecha_nacimiento":fechaNacimiento,
          "email":email,
          "json_clinica":json,
          "envioJson":"yes",
          "eventos_send":array_eventos_send,
          "cb_kit_covid":kitCovid.is(":checked"),
          "sintomalogia":sintomalogia,
          "otro_motivo":covidotrosmotivos,
          "lugar_contagio":locationcontagio,
          "date_ini_alatmedica_pdf":$("#tx_date_init_pdf").val(),
          "date_end_alatmedica_pdf":$("#tx_date_end_pdf").val(),
          "register_origin":"Edit",
          "extend_reposo":0,
          "daysRest":daysRest,
          "idAreaSap":idAreaSap,
          "nameAreaSap":nameAreaSap,
          "idLocationSap":idLocationSap,
          "nameLocationSap":nameLocationSap,
          "userCompanyType":userCompanyType,
          "cb_examen_fisico":examenFisico.is(":checked"),
          "observacion_examen_fisico":observacionExamenFisico,
          "cb_otros": otros.is(":checked"),
          "observacion_otros":observacionOtros,
          "extension_reposo":extension_reposo
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
                  swal({
                    title: "Éxito",
                    text: "Tamizaje Editado con Éxito",
                    type: "success",
                    timer:2000,
                    showCancelButton: false,
                    confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
                    confirmButtonText: "De acuerdo",
                    closeOnConfirm: false
                  });
                },500)
              
                  tableBlackList();

                  $('#modalViewBlackCovidTest').modal('hide');
                  $('#modalShowpersonBlacke').modal('hide');
                  $('#modalTableHistory').modal('hide');

              }else{
                swal("Error!", "No se ha podido actualizar la lista.", "error");
              }
            });
        });
    }


    var updateCovidTestNatClar = function(){
      //alert("ssssss"+idEdit+" "+id);
      //return;
      var location = $("#selr_local_history").val();
      var name_location = $("#selr_local_history  option:selected").text();
      var job = $("#txr_ocupacion_history").val();
      tx_ocupacion = job;
      var name = $("#txr_nomape_history").val();
      
      var company =  $("#txr_company_id_history").val();
      var name_company = $("#txr_company_name_history").val();
      
      var id = $("#h_id").val();
      var id_history = $("#h_id_h").val();
      var reason = $("#txr_motivo_vetado_history").val();



       
      var attention_date = $("#txr_fecha_history").val();
      //console.log(attention_date);      
      var hhmm = moment().add(5, 'hours').format('HH:mm:ss');
      var now = moment(attention_date,'DD/MM/YYYY').format('YYYY-MM-DD');
      
      if(attention_date != undefined)
        attention_date = now+" "+hhmm;

      var status = $("#selr_statusFic_history").val();
      var status_test_fast = $("#selr_statusrap_history").val();
      var status_test_molecular = $("#selr_statusmolec_history").val();
      var temperature = $("#txr_temperatura_history").val();
      var area = $("#selr_area_history").val();
      var name_area = $("#selr_area_history option:selected" ).text();
      var antecedentes = $("#txr_antecedentes_history").val();
      var note = $("#txr_resultado_history").val();
      var responsible = getCookie('vtas_id'+sessionStorage.tabVisitasa);
      var identity_document = $("#txr_docum_history").val();
      var nameperson = $("#txr_nomape_history").val(); 
      var arrayNamePerson     =  nameperson.split(" ");
      var apellidoPaterno     = "";
      var apellidoMaterno     = "";
      var fullName            = "";
      if(arrayNamePerson.length==2) {
        apellidoPaterno = arrayNamePerson[1];
        fullName        = arrayNamePerson[0];
      }
      else if(arrayNamePerson.length==3) {
        apellidoPaterno = arrayNamePerson[1];
        apellidoMaterno = arrayNamePerson[2];
        fullName        = arrayNamePerson[0];
      }
      else if(arrayNamePerson.length==4) {
        apellidoPaterno = arrayNamePerson[2];
        apellidoMaterno = arrayNamePerson[3];
        fullName        = arrayNamePerson[0]+" "+arrayNamePerson[1];
      }
      else if(arrayNamePerson.length==5) {
        apellidoPaterno = arrayNamePerson[3];
        apellidoMaterno = arrayNamePerson[4];
        fullName        = arrayNamePerson[0]+" "+arrayNamePerson[1]+" "+arrayNamePerson[2];
      }
      else if(arrayNamePerson.length==6) {
        apellidoPaterno = arrayNamePerson[4];
        apellidoMaterno = arrayNamePerson[5];
        fullName        = arrayNamePerson[0]+" "+arrayNamePerson[1]+" "+arrayNamePerson[2]+" "+arrayNamePerson[3];
      }

      var reagent = $("#selr_reagent_history").val();
      var fecha = moment().format('DD/MM/YYYY');
      console.log(now);
      //attention_date = now;1

      if(name_company=="0-tasa" || name_company=="tasa" || name_company=="Tasa" || name_company=="TASA" || name_company.toLowerCase().trim() == "tasa" || name_company.toLowerCase().trim().includes("tasa"))
      var is_collaborator = 1;
      else
      var is_collaborator = 0;


      var namePersona         = nameperson;//$('#tx_name_per').val(); 
      var identityDocument    = identity_document;//$('#tx_identity_document').val(); 
      var sede                = location;//$('#sel_sede').val(); 
      var area                = area;
      var embarcacion         = $('#selr_embarcacion_history').val(); 
      var name_embarcacion    = $('#selr_embarcacion_history').text(); 
      var empleador           = $('#txr_empleador_history').val(); 
      var puestoTrabajo       = $('#txr_ocupacion_history').val(); 
      var companyname         = $('#txr_company_name_history').val();
      var ruc_company         = "20100971772";//$("#txr_company_history_ruc").val();
      //alert(ruc_company);
      var tipoTrabajo         = $('#txr_job_type_history').val(); 
      var name_tipoTrabajo    = $('#txr_job_type_history').text(); 
      var actividadEconomica  = $('#txr_actividad_economica_history').val();
      var nacionalidad        = $('#txr_nacionalidad_history').val();
      var departamento        = $('#selr_departamento_res_history').val();
      var provincia           = $('#selr_provincia_res_history').val();
      var distrito            = $('#selr_distrito_res_history').val();
      var direccion           = $('#txr_direccion_res_history').val();
      var email               = $('#txr_email_history').val();
      var celular             = $('#txr_celular_history').val();
      var telefono            = $('#txr_telefono_history').val();
      var datoFamiliar        = $('#txr_dato_familiar_history').val();
      var telefonoContacto    = $('#txr_celular_contacto_history').val();
      var motivo              = $('#selr_motivo_history').val();
      var temperature         = temperature;//$('#tx_temperature').val(); 
      var sexo                = $('#txr_sexo_history').val(); 
      var fechaNacimiento    = $('#txr_edad_history').val(); 
      //---------------------------------------------------------      
      var fiebre              = $('#chbr_fiebre_history'); 
      var tosSeca             = $('#chbr_tos_seca_history');  
      var dificultadRespirar  = $('#chbr_dificulta_respirar_history');  
      var dolorGarganta       = $('#chbr_dolor_garganta_history');  
      var congestionNasal     = $('#chbr_congecion_nasal_history');
      var fatiga              = $('#chbr_fatiga_history');
      var escalofrio          = $('#chbr_escalofrio_history');     
      var nauseas             = $('#chbr_nauseas_vomito_history');
      var diarrea             = $('#chbr_diarrea_history');
      var dolorCabeza         = $('#chbr_dolor_cabeza_history'); 
      var dolorMusculo        = $('#chbr_dolor_musculo_history'); 
      var fechaSintomas       = $('#txr_fecha_inicio_sintomas_history').val(); 
      //----------------------------------------------------------
      var rbContactoPersona   = $('input:radio[name=rb_contacto_persona_history]:checked');
      var entornoFamiliar     = $('#chbr_entorno_familiar_history');
      var entornoLaboral      = $('#chbr_entorno_laboral_history');
      var entornoSalud        = $('#chbr_entorno_salud_history');
      var arrayEntorno        = [];
      //----------------------------------------------------------
      //----------------------------------------------------------
      var rbFueraPais         = $('input:radio[name=rb_fuera_pais_history]:checked');
      var pais                = $("#selr_pais_retorto_history").val();
      var name_pais           = pais!="0"?$("#selr_pais_retorto_history option:selected").text():"";
      var fechaRetorno        = $("#txr_fecha_retorno_history").val();
      //----------------------------------------------------------
      //----------------------------------------------------------
      var rbDiferenteDistrito = $('input:radio[name=rb_distrito_history]:checked');
      var distrito2            = $('#selr_distrito_history').val();
      //var tipoTrabajo         = $('#sel_tipo_trabajo').val();
      //----------------------------------------------------------
      //----------------------------------------------------------
      //factores de riesgos
      var obesidad            = $('#chbr_obesidad_history');
      var enfermedadPulmunar  = $('#chbr_enfermedad_pulmunar_history');
      var diabete             = $('#chbr_diabete_history');
      var impertension        = $('#chbr_impertension_history');
      var mayor60ano          = $('#chbr_mayor_60_ano_history');
      var gestante            = $('#chbr_gestante_history');
      var arrayFactorRiesgo   = [];
      //----------------------------------------------------------
      //----------------------------------------------------------
      var adultoMayor         = $('#chbr_adulto_mayor_history'); 
      var nonio               = $('#chbr_nino_history'); 
      var chb_gestante_2      = $('#chbr_gestante_2_history');
      var familiarEnfermedad  = $('#chbr_familiar_enfermedad_cronica_history');
      var arrayMiemmbrosFamiliar = [];
      //-----------------------------------------------------------
      //-----------------------------------------------------------
      var cantPersona         = $('#txr_cant_persona_history').val();
      var kitCovid            = $('#txr_chb_kit_covid_history');      
      //-----------------------------------------------------------
      var store_sintomas_total  = 0;
      var cant_sintomas         = 0; 
      var store_factor_riesgo   = 0;
      //-----------------------------------------------------------     
      var sel_reagent = $("#selr_reagent_history").val(); 
      //alert(sel_reagent);
      //----------------------------------------------------------- 
      var cod_anexo1_natclar  = $("#hid_cod_anexo1_natclar").val();
      var cod_anexo2_natclar  = $("#hid_cod_anexo2_natclar").val();
      var cod_anexo3_natclar  = $("#hid_cod_anexo3_natclar").val();
      var cod_anexo4_natclar  = $("#hid_cod_anexo4_natclar").val();
      //------------------------------------------------------------

      var arraySintomas = [];

      var flag=0;
      var validatefield=""; 
      
      ///alert( tx_ocupacion+" - " +job);
       
      if(empleador=="0")
      {flag=1;      validatefield= "Debe seleccionar el empleador";}
      else if(identity_document=="")
      {flag=1;     validatefield= "Debe ingresar "+"Documento de identidad";}
      else if(nameperson.trim().length==0)
      {flag=1;     validatefield= "Debe ingresar el Nombre y Apellido";}          
      else if(location=="0" || location==null)
      {flag=1;       validatefield= "Debe seleccionar la Sede";}
      /*else if(area=="0")
      {flag=1;      validatefield= "Debe seleccionar el Área";}*/
      else if(tx_ocupacion=="")
      {flag=1;    validatefield= "Debe ingresar el Puesto de Trabajo";}                       
      else if(companyname=="")
      {flag=1;    validatefield= "Debe ingresar "+"Empresa";}   
      else if(tipoTrabajo=="0" || tipoTrabajo=="" || tipoTrabajo==null)
      {flag=1;    validatefield= "Debe ingresar el Tipo de Trabajo";}          
      else if(actividadEconomica=="")
      {flag=1;    validatefield= "Debe seleccionar la Actividad Económica";}
      else if(nacionalidad=="")
      {flag=1;    validatefield= "Debe ingresar la Nacionalidad";}        
      else if(departamento=="0")
      {flag=1;    validatefield= "Debe seleccionar el Departamento";}        
      else if(provincia=="0")
      {flag=1;    validatefield= "Debe seleccionar la Provincia";}
      else if(distrito=="0")
      {flag=1;    validatefield= "Debe seleccionar el Distrito";}
      else if(direccion.trim().length==0)
      {flag=1;    validatefield= "Debe ingresar la Dirección";}
      else if(email.trim().length==0)
      {flag=1;    validatefield= "Debe ingresar el Email";}
      else if(celular.trim().length==0)
      {flag=1;    validatefield= "Debe ingresar el Número de Celular";}
      else if(datoFamiliar.trim().length==0)
      {flag=1;    validatefield= "Debe ingresar el Dato Familiar ";}
      else if(telefonoContacto.trim().length==0)
      {flag=1;    validatefield= "Debe ingresar el Número de celular del contacto ";}          
      else if(motivo=="0" || motivo=="" || motivo==null)
      {flag=1;    validatefield= "Debe ingresarle Motivo ";}
      else if(temperature.trim().length==0)
      {flag=1;    validatefield= "Debe ingresar la Temperatura";}
      else if(sexo=="0")
      {flag=1;    validatefield= "Debe Seleccionar el Sexo";}
      /*/else if(fechaNacimiento.trim().length==0)
      {flag=1;    validatefield= "Debe ingresar la Fecha de Nacimiento";}*/
      else if(note=="")
      {flag=1;     validatefield= "Debe ingresar "+"Observaciones";}
 
      var tx_resultado = note;

      if(flag==1)
      {
        swal({
          title: "Campos vacios",
          text: validatefield,
          timer: 4000,
          type: "error",
          showConfirmButton: true
          });
       // swal("Error", "No se ha ingresado observación", "error");
        $('#tx_resultado').focus();
        return;
      }

        //-----------------------------------------------------------
        //sumamos los sintomas seleccionados   
        //console.log(fiebre.is(":checked"));
        if(fiebre.is(":checked")){
          store_sintomas_total =store_sintomas_total+parseInt(fiebre.data("score"));
          cant_sintomas++; 
          arraySintomas.push(fiebre.val());
          console.log(parseInt(fiebre.data("score")),store_sintomas_total)
        }
        if(dificultadRespirar.is(":checked")){
          store_sintomas_total =store_sintomas_total+parseInt(dificultadRespirar.data("score"));
          cant_sintomas++;
          arraySintomas.push(dificultadRespirar.val());
          console.log(parseInt(dificultadRespirar.data("score")),store_sintomas_total)
        }
        if(tosSeca.is(":checked")){
          store_sintomas_total =store_sintomas_total+parseInt(tosSeca.data("score"));
          cant_sintomas++;
          arraySintomas.push(tosSeca.val());
          console.log(parseInt(tosSeca.data("score")),store_sintomas_total)
        }
        if(dolorGarganta.is(":checked")){
          store_sintomas_total =store_sintomas_total+parseInt(dolorGarganta.data("score"));
          cant_sintomas++;
          arraySintomas.push(dolorGarganta.val());
          console.log(parseInt(dolorGarganta.data("score")),store_sintomas_total)
        }
        if(congestionNasal.is(":checked")){
          store_sintomas_total =store_sintomas_total+parseInt(congestionNasal.data("score"));
          cant_sintomas++;
          arraySintomas.push(congestionNasal.val());
          console.log(parseInt(congestionNasal.data("score")),store_sintomas_total)
        }
        if(fatiga.is(":checked")){
          store_sintomas_total =store_sintomas_total+parseInt(fatiga.data("score"));
          cant_sintomas++;
          arraySintomas.push(fatiga.val());
          console.log(parseInt(fatiga.data("score")),store_sintomas_total)
        }
        if(escalofrio.is(":checked")){
          store_sintomas_total =store_sintomas_total+parseInt(escalofrio.data("score"));
          cant_sintomas++;
          arraySintomas.push(escalofrio.val());
          console.log(parseInt(escalofrio.data("score")),store_sintomas_total)
        }
        if(nauseas.is(":checked")){
          store_sintomas_total =store_sintomas_total+parseInt(nauseas.data("score"));
          cant_sintomas++;
          arraySintomas.push(nauseas.val());
          console.log(parseInt(nauseas.data("score")),store_sintomas_total)
        }
        if(diarrea.is(":checked")){
          store_sintomas_total =store_sintomas_total+parseInt(diarrea.data("score"));
          cant_sintomas++;
          arraySintomas.push(diarrea.val());
          console.log(parseInt(diarrea.data("score")),store_sintomas_total)
        }
        if(dolorCabeza.is(":checked")){
          store_sintomas_total =store_sintomas_total+parseInt(dolorCabeza.data("score"));
          cant_sintomas++;
          arraySintomas.push(dolorCabeza.val());
          console.log(parseInt(dolorCabeza.data("score")),store_sintomas_total)
        }
        if(dolorMusculo.is(":checked")){
          store_sintomas_total =store_sintomas_total+parseInt(dolorMusculo.data("score"));
          cant_sintomas++;
          arraySintomas.push(dolorMusculo.val());
          console.log(parseInt(dolorMusculo.data("score")),store_sintomas_total)
        }
        //-------------------------------------------------------
        //-------------------------------------------------------
        //sumamos factores de riegos
        //console.log(fiebre.data("score"), obesidad.data("score"));
        if(obesidad.is(":checked")) {
          store_factor_riesgo +=obesidad.data("score");
          arrayFactorRiesgo.push(obesidad.val());
        }
        if(enfermedadPulmunar.is(":checked")){
          store_factor_riesgo +=enfermedadPulmunar.data("score");
          arrayFactorRiesgo.push(enfermedadPulmunar.val());
        }
        if(diabete.is(":checked")){
          store_factor_riesgo +=diabete.data("score");
          arrayFactorRiesgo.push(diabete.val());
        }
        if(impertension.is(":checked")){
          store_factor_riesgo +=impertension.data("score");
          arrayFactorRiesgo.push(impertension.val());
        }
        if(mayor60ano.is(":checked")){
          store_factor_riesgo +=mayor60ano.data("score");
          arrayFactorRiesgo.push(mayor60ano.val());
        }
        if(gestante.is(":checked")){
          store_factor_riesgo +=gestante.data("score");
          arrayFactorRiesgo.push(gestante.val());
        }
        //----------------------------------------------------
        //----------------------------------------------------
        if(adultoMayor.is(":checked")){
          arrayMiemmbrosFamiliar.push(adultoMayor.val());
        }
        if(nonio.is(":checked")){
          arrayMiemmbrosFamiliar.push(nonio.val());
        }
        if(chb_gestante_2.is(":checked")){
          arrayMiemmbrosFamiliar.push(chb_gestante_2.val());
        }
        if(familiarEnfermedad.is(":checked")){
          arrayMiemmbrosFamiliar.push(familiarEnfermedad.val());
        }

        //----------------------------------------------------
        //coclusión 1
        var conclusion1 = "Caso no sospechoso";
        var conclusion2 = "Baja Posibilidad de evolución no favorable";
        var encuestaFoo = 0;
        var chEvolucion = 0;
        conclusion1 = "Caso no sospechoso";
        encuestaFoo = 0;
        if(($("#sel_covidotrosmotivos_history").val()!=0 && $("#sel_covidotrosmotivos_history").val()!=null)||(cant_sintomas>=1)||($("#selr_statusFic_history").val()==1||$("#selr_statusFic_history").val()==3)){
          //rbContactoPersona
          conclusion1 = "Caso Sospechoso";
          encuestaFoo = 1;
          
        } 

        $("#txr_conlcusion1result").text(conclusion1);//se coloca en resultado

        //console.log((store_sintomas_total+store_factor_riesgo));
        if((store_sintomas_total+store_factor_riesgo) >=1 && (store_sintomas_total+store_factor_riesgo)<=8){
          conclusion2 ="Baja Posibilidad de evolución no favorable";
          chEvolucion = 0;
        }
        if((store_sintomas_total+store_factor_riesgo) >=9){
          conclusion2 ="Alta Posibilidad de evolución no favorable";
          chEvolucion=1;
        }
        var fechaNow = moment().format("YYYY-MM-DD hh:mm:ss");
        //console.log(fechaNow);
        
        var attention_date_natclar = $("#txr_fecha_tamizaje_history").val();
      //console.log(attention_date);      
      var hhmm = moment().add(5, 'hours').format('HH:mm:ss');
      var now = moment(attention_date_natclar,'DD/MM/YYYY').format('YYYY-MM-DD');
      attention_date_natclar = now+" "+hhmm;
      if(attention_date_natclar != undefined)
      attention_date_natclar = now+" "+hhmm;

      
      //attention_date_natclar = moment(attention_date_natclar,'').format("YYYY-MM-DD hh:mm:ss");
      //attention_date_natclar = fechaNow;

        if(rbContactoPersona.val()=="si"){        
          if(entornoFamiliar.is(":checked"))
            arrayEntorno.push(entornoFamiliar.val());
          if(entornoLaboral.is(":checked"))
            arrayEntorno.push(entornoLaboral.val());
          if(entornoSalud.is(":checked"))
            arrayEntorno.push(entornoSalud.val());
        }
        if(rbContactoPersona.val()=="no"){ 
          arrayEntorno=[];
        }                
        var lugar_contagio     = "";
        if($("#sel_location_contagio_history").val()!="0"){
          lugar_contagio = $("#sel_location_contagio_history option:selected").text();
        }
        
        var evento1 ={ }
        var evento2 ={ }
        var evento3 ={ }
        var evento4 ={ }     
        var array_eventos_send =[];
      //$('#sel_motivo').val(); 
      if(encuestaFoo==1){//caso sospechoso
        evento1 = {
          "biIdHistoria": 0,//cod_anexo1_natclar,         
          "descripcionEvento": "1",
          "dtEvento": attention_date_natclar,//fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "1",//
          "vcSintomatologia": "2",
          "vcResultado": "CASO SOSPECHOSO",
          "vcObservacion": tx_resultado,
          "zonaContacto":lugar_contagio          
        }
        array_eventos_send.push("cod_anexo1_natclar");
      }
      else if(encuestaFoo==0){//caso sospechoso
        evento1 = { 
          "biIdHistoria": 0,//cod_anexo1_natclar,         
          "descripcionEvento": "1",
          "dtEvento": attention_date_natclar,//fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "10",//
          "vcSintomatologia": "2",
          "vcResultado": "CASO NO SOSPECHOSO",
          "vcObservacion": tx_resultado,
          "zonaContacto":lugar_contagio          
        }
        array_eventos_send.push("cod_anexo1_natclar");
      }
      
      if(parseFloat(temperature)>=35 && parseFloat(temperature)<=36.7)//
      {
        evento2 = {
          "biIdHistoria": 0,//cod_anexo2_natclar,
          "descripcionEvento": "2",//TEMPERATURA
          "dtEvento":attention_date_natclar,//fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "6",//NORMAL TEMPERATURA
          "vcSintomatologia": "2",
          "vcResultado": "NORMAL TEMPERATURA",
          "vcObservacion": tx_resultado,//""
          "zonaContacto":lugar_contagio 
        }
        array_eventos_send.push("cod_anexo2_natclar");
      }
      if(parseFloat(temperature)>36.7){
        evento2 = {
          "biIdHistoria": 0,//cod_anexo2_natclar,
          "descripcionEvento": "2",//TEMPERATURA
          "dtEvento": attention_date_natclar,//fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "7",//ANORMAL TEMPERATURA
          "vcSintomatologia": "2",
          "vcResultado": "ANORMAL TEMPERATURA",
          "vcObservacion": tx_resultado,//""
          "zonaContacto":lugar_contagio 
        }
        array_eventos_send.push("cod_anexo2_natclar");
      }

      if(sel_reagent=="4"){///REACTIVO IGM/IGG
        evento3 = {
            "biIdHistoria": 0,//cod_anexo3_natclar,          
            "descripcionEvento": "3",
            "dtEvento": attention_date_natclar,//fechaNow,
            "vcMotivo": motivo,
            "vcOrigen": "VISI-TASA",
            "iIdEstadoPaciente": "8",//REACTIVO IGM/IGG
            "vcSintomatologia": "2",
            "vcResultado": "REACTIVO IGM/IGG",
            "vcObservacion": tx_resultado,
            "zonaContacto":lugar_contagio                      
        }
        array_eventos_send.push("cod_anexo3_natclar");
      }
      else if(sel_reagent=="1"){//NO REACTIVO
        evento3 = { 
            "biIdHistoria": 0,//cod_anexo3_natclar,         
            "descripcionEvento": "3",
            "dtEvento": attention_date_natclar,//fechaNow,
            "vcMotivo": motivo,
            "vcOrigen": "VISI-TASA",
            "iIdEstadoPaciente": "8",//NO REACTIVO
            "vcSintomatologia": "2",
            "vcResultado": "NO REACTIVO",
            "vcObservacion": tx_resultado,
            "zonaContacto":lugar_contagio           
        }
        array_eventos_send.push("cod_anexo3_natclar");
      }
      else if(sel_reagent=="2"){//REACTIVO IGM
        evento3 = {    
            "biIdHistoria": 0,//cod_anexo3_natclar,      
            "descripcionEvento": "3",
            "dtEvento": attention_date_natclar,//fechaNow,
            "vcMotivo": motivo,
            "vcOrigen": "VISI-TASA",
            "iIdEstadoPaciente": "12",//REACTIVO IGM
            "vcSintomatologia": "2",
            "vcResultado": "REACTIVO IGM",
            "vcObservacion": tx_resultado,
            "zonaContacto":lugar_contagio 
        }
        array_eventos_send.push("cod_anexo3_natclar");
      }
      else if(sel_reagent=="3"){//REACTIVO IGG
        evento3 = {
            "biIdHistoria": 0,//cod_anexo3_natclar,
            "descripcionEvento": "3",
            "dtEvento": attention_date_natclar,//fechaNow,
            "vcMotivo": motivo,
            "vcOrigen": "VISI-TASA",
            "iIdEstadoPaciente": "13",//REACTIVO IGG
            "vcSintomatologia": "2",
            "vcResultado": "REACTIVO IGG",
            "vcObservacion": tx_resultado,
            "zonaContacto":lugar_contagio         
        }
        array_eventos_send.push("cod_anexo3_natclar");
      }

      if(sel_statusmolec =="1"){
        evento4 = {
          "biIdHistoria": 0,//cod_anexo4_natclar,
          "descripcionEvento": "4",//TEMPERATURA
          "dtEvento": attention_date_natclar,//fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "4",//POSITIVO MOLECULAR
          "vcSintomatologia": "2",
          "vcResultado": "POSITIVO MOLECULAR",
          "vcObservacion": tx_resultado,//""
          "zonaContacto":lugar_contagio
        }
        array_eventos_send.push("cod_anexo4_natclar");
      }
      else if(sel_statusmolec =="0"){
        /*evento4 = {
          "biIdHistoria": 0,//cod_anexo4_natclar,
          "descripcionEvento": "4",//TEMPERATURA
          "dtEvento": attention_date_natclar,//fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "5",//NEGATIVO MOLECULAR
          "vcSintomatologia": "2",
          "vcResultado": "NEGATIVO MOLECULAR",
          "vcObservacion": tx_resultado,//""
          "zonaContacto":lugar_contagio 
        }
        array_eventos_send.push("cod_anexo4_natclar");*/
      }
      else if(sel_statusmolec =="2"){
        /*evento4 = {
          "biIdHistoria": 0,//cod_anexo4_natclar,
          "descripcionEvento": "4",//TEMPERATURA
          "dtEvento": attention_date_natclar,//fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "14",//PENDIENTE MOLECULAR
          "vcSintomatologia": "2",
          "vcResultado": "PENDIENTE MOLECULAR",
          "vcObservacion": tx_resultado,//""
          "zonaContacto":lugar_contagio 
        }
        array_eventos_send.push("cod_anexo4_natclar");
        */
      }

        var eventos = [];
        if(JSON.stringify(evento1)!="{}")//vacío
          eventos.push(evento1);
        if(JSON.stringify(evento2)!="{}")//vacío
          eventos.push(evento2);
        if(JSON.stringify(evento3)!="{}")//vacío
          eventos.push(evento3);
        if(JSON.stringify(evento4)!="{}")//vacío
          eventos.push(evento4);

        
        //----------------------------------------------------------------
        var stringArraySintomas = arraySintomas.toString();
            stringArraySintomas = stringArraySintomas.replace(/,/g,'|');///replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
        //----------------------------------------------------------------      
        var distritoVistadoText = $( "#selr_distrito_history option:selected" ).text();
          distritoVistadoText   = rbDiferenteDistrito.val()!="no"?distritoVistadoText:"";;
        console.log(distritoVistadoText);
        //----------------------------------------------------------------
        var stringArrayFactorRiesgo = arrayMiemmbrosFamiliar.toString();
        console.log(arrayMiemmbrosFamiliar);
            stringArrayFactorRiesgo = stringArrayFactorRiesgo.replace(/,/g,'|');
        //----------------------------------------------------------------      
        var stringArrayEnfermedad   = arrayFactorRiesgo.toString();
            stringArrayEnfermedad   = stringArrayEnfermedad.replace(/,/g,'|');
        //----------------------------------------------------------------         
        var stringArrayEntorno      = arrayEntorno.toString();
            stringArrayEntorno      = stringArrayEntorno.replace(/,/g,'|');
        //-----------------------------------------------------------------
        //"veto_status": statusmed,
      

        var json = {
          "dtEnvio": attention_date_natclar,//fechaNow,
          "pacientes": 
          [
            {
              "tipoDocumento": "DNI",
              "dniPaciente": identityDocument,
              "dFechaNacimiento": $("#txr_edad_history").val(),
              "vcSexo": sexo,//"M",
              "vcCompania": "20100971772",//ruc_company,// "20100971772",
              "vcContrata": "20100971772",//"20100971772",
              "vcUnidad": sede.toString(),//"0062",
              "vcPuesto": tx_ocupacion,//"",
              "vcArea": name_area,//"",
              "apellidoPaterno": apellidoPaterno ,//"ARCOS",
              "apellidoMaterno": apellidoMaterno ,//"ROMUCHO",
              "nombres": fullName, //"HENRY MANUEL",
              "nacionalidad":nacionalidad,//"",
              "vcUbigeo": departamento+provincia+distrito,//"010105",
              "vcDireccionActual": direccion,//"",
              "vcCorreo": email,///"",
              "vcCelular":celular,//"",
              "vcFijo": telefono,//"",           
              "vcNombreFamiliar": datoFamiliar,
              "vcCelularFamiliar": telefonoContacto,
              "vcFijoFamiliar": telefonoContacto,
              "vcTipoTrabajo": "Temporal",//tipoTrabajo,
              "vcActividadEconomiac": actividadEconomica,
              "F00":
              [
                {
                  "biIdF00": 0,
                  "preguntaSintomas": stringArraySintomas,//"Fiebre|Dolor de Garganta",
                  "FechaInicioSintomas": fechaSintomas,
                  "EntornoContacto": rbContactoPersona.val(),
                  "AlternativaEntornoContacto": stringArrayEntorno,
                  "ViajoFueraPais": rbFueraPais.val(),
                  "QuePais": name_pais,
                  "RetornoPais": fechaRetorno,
                  "DesplazoDistritos": rbDiferenteDistrito.val(),
                  "QueDistrito": distritoVistadoText,
                  "Enfermedad": stringArrayEnfermedad,//arrayFactorRiesgo
                  "OtrasEnfermedades": "",
                  "grupoRiesgo": stringArrayFactorRiesgo,
                  "NroPersonasDomicilio": cantPersona,
                  "score": store_sintomas_total+store_factor_riesgo,
                  "conclusion1": conclusion1,
                  "conclusion2": conclusion2
                }
              ],
              "eventos": eventos
            }
          ]
        }
        console.log(JSON.stringify(json));
        console.log(json);




          swal({
            title:"Natclar",
            text: "¿Seguro que desea actualizar los datos ingresados?",
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

            },100);
        //<--antiguo-->
        //var url = apiurlaccessrequest+"/api/Post-CovidTestResult-all?code="+PostCovidTestResultall+"&httpmethod=post";
        var url = apiurlblacklist+"/api/Post-Blacklist-User?code="+postblacklistusercode+"&httpmethod=postblackcovidNatclar"; 
        var body ={
          "id_blacklist_user":idEdit,
          "id_location":location,
          "id_area":area,
          "id_company":company?company:0,
          "temperature":temperature,  
          "job":job,
          "antecedent":antecedentes,
          "status":status,
          "status_test_fast":status_test_fast,
          "status_test_molecular":status_test_molecular,
          "note":note,
          "created_by": getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
          "last_updated_by": getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
          "name_doctor": toCapitalize(getCookie("vtas_fullname"+sessionStorage.tabVisitasa)),                    
          "veto_status": (statusmed != 88)?statusmed:0,
          "responsible": responsible,
          "name_person":nameperson,
          "identity_document":identity_document,          
          "list_type": 2,
          "covid_test":(statusmed != 88)?"2":"7",
          "is_collaborator": is_collaborator,
          "attribute5":reason,
          "covid_attribute2":"0",
          "attention_date":attention_date,
          "attribute4":1,//editado
          "fecha":fecha,
          "id_reagent_type":reagent,
          "attribute2":"0",
          "cb_fiebre":fiebre.is(":checked"),
          "cb_dificulta_respiratoria":dificultadRespirar.is(":checked"),
          "cb_tos_seca":tosSeca.is(":checked"),
          "cb_dolor_garganta":dolorGarganta.is(":checked"),
          "cb_congestion_nasal":congestionNasal.is(":checked"),
          "cb_fatiga":fatiga.is(":checked"),
          "cb_escalofrio":escalofrio.is(":checked"),
          "cb_nauseas_vomito":nauseas.is(":checked"),
          "cb_diarrea":diarrea.is(":checked"),
          "cb_dolor_cabeza":dolorCabeza.is(":checked"),
          "cb_dolor_musculo":dolorMusculo.is(":checked"),
          "fecha_inicio_sintoma":fechaSintomas,            
          "rb_concato_persona":rbContactoPersona.val()=="si"?true:false,
          "cb_entorno_famiiar":entornoFamiliar.is(":checked"),
          "cb_entorno_laborar":entornoLaboral.is(":checked"),
          "cb_entorno_salud":entornoSalud.is(":checked"),
          "rb_pais_visitado":rbFueraPais.val()=="si"?true:false,//falta backend
          "pais_visitado":pais,
          "fecha_retorno":fechaRetorno,
          "rb_direfente_distrito":rbDiferenteDistrito.val()=="si"?true:false,
          "distrito_visitado":departamento+provincia+distrito2,
          "cb_obesidad":obesidad.is(":checked"),
          "cb_enfemedad_pulmonar":enfermedadPulmunar.is(":checked"),
          "cb_diabete":diabete.is(":checked"),
          "cb_impertension":impertension.is(":checked"),
          "cb_mayo_60":mayor60ano.is(":checked"),
          "cb_adulto_mayor":mayor60ano.is(":checked"),//falta backend
          "cb_nino":nonio.is(":checked"),
          "cb_gestante":gestante.is(":checked"),
          "cb_familiar_enfermedad":familiarEnfermedad.is(":checked"),
          "cb_gestante_2":chb_gestante_2.is(":checked"),////falta backend
          "nro_personas":cantPersona,
          "ch_sospechoso":encuestaFoo,
          "ch_evolucion":chEvolucion,
          "pregunta_1":"¿Qué síntomas presenta?",
          "pregunta_2":"¿En los últimos 14 días ha tenido contacto con personas con diagnóstico confirmados de coronavirus?",
          "pregunta_3":"¿Ha viajado fuera del país o zona del Perú con casos confimados de covid-19 en los últimos 14 días?",
          "pregunta_4":"¿En los últimos 14 días se desplazó a diferentes distritos distintos a su lugar de residencia?",
          "pregunta_5":"¿Usted padece o padeció de algunas de las siguientes enfermedades o condiciones?",
          "pregunta_6":"¿En la casa donde habita tiene los siguientes grupos de riesgo?",
          "pregunta_7":"¿Cuántas personas viven en el domicilio donde habita?",
          "id_embarcacion":embarcacion,
          "name_embarcacion":embarcacion,
          "id_tipo_trabajo":tipoTrabajo,
          "name_tipo_trabajo":tipoTrabajo,
          "motivo_tamizaje": motivo,
          "nacionalidad":nacionalidad,
          "actividad_economica":actividadEconomica,
          "ubigeo":departamento+provincia+distrito,
          "direccion":direccion,
          "tlf_celular":celular,
          "tlf_fijo":telefono,
          "conclusion1":conclusion1,
          "conclusion2":conclusion2,
          "dato_familiar":datoFamiliar,
          "tlf_contacto":telefonoContacto,
          "sexo":sexo,
          "fecha_nacimiento":fechaNacimiento,
          "email":email,
          "json_clinica":json,
          "envioJson":"yes",
          "eventos_send":array_eventos_send,
          "cb_kit_covid":kitCovid.is(":checked")
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
              if (data.id_blacklist_user) 
              {
                swal.close();
                setTimeout(function(){
                  swal("Exito!", "Operación satisfactoria. \n"+data.request_json_natclar, "success");
                },500)
                  //vw_black_list.reloadtableBlackList(tableBlackList());
                  $('#modalViewBlackCovidTest').modal('hide');
                  $('#modalShowpersonBlacke').modal('hide');
                  $('#modalTableHistory').modal('hide');
              }else{
                swal("Error!", "No se ha podido actualizar la lista.", "error");
              }
            });
        });
    }

        
    var removeRowCovid = function(obj){  
   
      obj.remove();
      var leng = $("#tb_tbody_covid_list").find("tr.row_covid").length;
      $("#badgelistRequest").text(" ( "+leng+" )");
    } 
    var refreshListCovid=function(){
      $("#sel_status").val(0);
      $("#sel_type").val(0);
      $("#sel_company").val(0);
      $("#sel_sede").val(0);
      $("#sel_area").val(0);
      tableBlackList();
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
    var clearRowtemp = function(i){
      $("#add_covid_dnitemp_"+i).val("");
      $("#add_covid_dniloadtemp_"+i).val("");
      $("#add_covid_firtnametemp_"+i).val("");
      $("#hid_collaboratortemp_id_"+i).val("");
      $("#ruc_companytemp_"+i).val("");
      $("#sel_companytemp_"+i).val("");
      $("#sel_locationtemp_"+i).val("");
      $("#sel_areatemp_"+i).val("");
      $("#tx_date_starttemp_"+i).val("");
      //$("#sel_company_11").val("");
      $("#validationsIdOiidTemp_"+i).removeClass("text-danger");
      $("#validationsIdOiidTemp_"+i).addClass("text-white");
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
                      <input type="text" maxlength="10"  class="form-control validations_cupos" autocomplete="off" id="tx_date_start_1" value="">
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
                    checkOis(dni,1,$("#sel_type_contact_1").val());
                    if($("#sel_type_contact_1").val()=="colaborador")
                      getCollaboratorDni(dni,1,"add_covid_firtname_1");
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
                    //alert(ui.item.firstname);
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
                      getCollaboratorDni(dni,1,"add_covid_firtname_1");
                    checkOis(dni,1,$("#sel_type_contact_1").val());
                  }
                });
              
        
              $("#sel_type_contact_1").change(function(){
                getCollaborator($("#add_covid_firtname_1"),1); 
                clearRow(1); 
                var value = $(this).val();
                $("#ruc_company_1")[0].disabled=false;
                $("#sel_company_1")[0].disabled=false;
                $("#sel_company_1")[0].className="form-control autocompletecollaborator";
                $("#ruc_company_1")[0].className="form-control autocompletecollaborator";
                if(value=='colaborador'){
                    $("#ruc_company_1").val('20100971772');
                    $("#sel_company_1").val('Tasa');
                    $("#ruc_company_1")[0].disabled=true;
                    $("#sel_company_1")[0].disabled=true; 
                    $("#sel_company_1")[0].className="form-control autocompletecollaborator bg-white";
                    $("#ruc_company_1")[0].className="form-control autocompletecollaborator bg-white";                   
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
    var cancelarFormtemp=function()
    {
      $("#tb_tbody_covid_listtemp").empty();
      $("#badgelistRequesttemp").text(" ( 1 )");
      lengListtemp=1;
      var html = `<tr id="row_covidtemp_1" class="row_covid">
                  <td>
                    <div class="form-group bmd-form-group" style="padding-top:0!important">  
                      <img src="images/iconos/organizador.svg" class="mr-3 mt-2" height="24">
                    </div>
                  </td>
                  <td style="">
                    <div class="form-group bmd-form-group" style="padding-top:0!important">
                      <select class="form-control" id="sel_type_contacttemp_1" name="sel_type_contacttemp_1">
                        <option value="contratista">Contratista</option>
                        <option value="colaborador">Colaborador</option>
                      </select>
                      <small class="text-white"  id="" style="font-size: 11px;">Validations</small>
                                                                        
                    </div>
                  </td>
                  <td>
                  <div class="form-group bmd-form-group" style="padding-top:0!important">                                  
                    <input type="text" class="form-control" id="add_covid_dnitemp_1" onkeyup="validaSoloNumeros(this.id)"  maxlength="11"> 
                    <small class="text-white"  id="validationsIdOiidTemp_1" style="font-size: 11px;">OIS Autorizado</small>                                                  
                  </div>
                </td>
                <td>
                  <div class="form-group bmd-form-group" style="padding-top:0!important">  
                    <input type="text" class="form-control autocompletecollaborator" id="add_covid_firtnametemp_1" maxlength="25" >  
                    <small class="text-white"   style="font-size: 11px;">OIS Autorizado</small>
                    <input type="hidden" class="form-control" id="hid_collaboratortemp_id_1" name="hid_collaboratortemp_id_1">                      
                  </div>
                </td>
                  <td>
                    <div class="form-group bmd-form-group" style="padding-top:0!important"> 
                    <input type="text" class="form-control" id="ruc_companytemp_1" maxlength="30" value=""  onfocus="if (this.value!='') /*this.value='';$('#ruc_companytemp_1').val('');*/">                                                     
                    <small class="text-white"   style="font-size: 11px;">OIS Autorizado</small>                       
                    </div>
                  </td>
                  <td>
                    <div class="form-group bmd-form-group" style="padding-top:0!important">                                                     
                    <input type="text" class="form-control autocompletecollaborator" id="sel_companytemp_1" maxlength="30" value="" onfocus="if (this.value!='') /*this.value='';$('#sel_cod_company_1').val(''); $('#sel_company_1')[0].className='form-control'*/">
                    <small class="text-white"   style="font-size: 11px;">Autorizado</small>                                             
                    </div>
                  </td>
                 
                 
                  <td>
                    <div class="form-group bmd-form-group" style="padding-top:0!important">
                      <select name="sel_locationtemp_1" class="form-control validations_cupos" id="sel_locationtemp_1">Seleccione</select>
                      <small class="text-white"   style="font-size: 11px;">Autorizado</small>
                    </div>
                  </td>
                  <td>
                    <div class="form-group bmd-form-group" style="padding-top:0!important">
                      <select name="sel_areatemp_1" class="form-control" id="sel_areatemp_1" >Seleccione</select>
                      <small class="text-white"   style="font-size: 11px;">Autorizado</small>                                                   
                    </div>
                  </td>
                  <td>
                    <div class="form-group bmd-form-group" style="padding-top:0!important">                                  
                      <input type="text" maxlength="10"  class="form-control validations_cupos" autocomplete="off" id="tx_date_starttemp_1" value="">
                      <small class="text-white mutetexthelp"   style="font-size: 11px;">DD/MM/YYYY</small> 
                      <input type="hidden" class="form-control" id="sel_cod_companytemp_1" name="sel_cod_companytemp_1">                                                    
                    </div>
                  </td>
                  <td>
                  <div id="bt_delete_row_covidtemp_1" style="cursor: pointer;">
                      <img src="images/iconos/trash.svg" class="" >
                  </div>
                  </td>
                </tr>`;

                $("#tb_tbody_covid_listtemp").append(html);
                
                $("#bt_delete_row_covidtemp_"+1).click(function()
                {
                  var id  = 'row_covidtemp_'+1;
                  var obj = $("#"+id);
                  removeRowCovid(obj);
                  $("#cant_row_personatemp").html($("#list_participantestemp").find("div.bd-callout").length);
                });
               
                $("#add_covid_dnitemp_1").blur(function(){
                  var dni = $(this).val();                  
                  if(dni.trim().length>0){
                    if($("#sel_type_contacttemp_1").val()=="colaborador")
                      getCollaboratorDni(dni,1,"add_covid_firtnametemp_1");

                    checkOisTemp(dni,1,$("#sel_type_contacttemp_1").val());
                  }
                    
                });
                
                $("#add_covid_dnitemp_1").autocomplete({          
                  change: function (event, ui) 
                  {
                   
                    if (ui.item === null) 
                    {                      
                      
                    }
                    else if(ui.item)
                    {                     
                      $("#add_covid_firtnametemp_1").val(ui.item.firstname);
                    }
                  },
                  source: jsonPersonBlaclist,      
                  minLength: 1,
                  select: function( event, ui ) {
                    //$("#add_covid_dni_1").val(ui.item.label);
                    //alert(ui.item.firstname);
                    $("#add_covid_firtnametemp_1").val(ui.item.firstname);
                    //$("#add_covid_lastname_"+leng).val(ui.item.lastname);
                  },
                  
                });
                getAreas('',1);
                selectExternalCompanytemp($("#sel_companytemp_1"),1);
                selectLocation("#sel_locationtemp_"+1);
                getCollaboratortemp($("#add_covid_firtnametemp_"+1),1);
                $("#tx_date_starttemp_1").datetimepicker({
                  timepicker:false,
                  format:'d/m/Y',
                  minDate: 0
                });
                
               
              
        
              $("#sel_type_contacttemp_1").change(function(){
                getCollaboratortemp($("#add_covid_firtnametemp_1"),1); 
                clearRowtemp(1); 
                var value = $(this).val();
                $("#ruc_companytemp_1")[0].disabled=false;
                $("#sel_company_1")[0].disabled=false;
                $("#sel_companytemp_1")[0].className="form-control autocompletecollaborator";
                $("#ruc_compantempy_1")[0].className="form-control autocompletecollaborator";
                if(value=='colaborador'){
                    $("#ruc_companytemp_1").val('20100971772');
                    $("#sel_companytemp_1").val('Tasa');
                    $("#ruc_companytemp_1")[0].disabled=true;
                    $("#sel_companytemp_1")[0].disabled=true; 
                    $("#sel_companytemp_1")[0].className="form-control autocompletecollaborator bg-white";
                    $("#ruc_companytemp_1")[0].className="form-control autocompletecollaborator bg-white";                   
                }
              }); 
              $("#div_message_req").html('');

             $("#responsableRequestEmail").val("");
             $("#responsableRequest").val("");
             $("#responsableRequestId").val("");
             
    }
    
  var getCollaboratorR =  function(obj,obj2,obj3,obj4,i,istasa)
  {

    var company = obj4.val(); 
    if(company=="0-tasa" || company=="tasa" || company=="Tasa" || company=="TASA" )
    {
     // console.log("on autocomplete")
      obj.autocomplete({
        change: function (event, ui) 
        {
            if (ui.item === null) {
                $("#hid_collaborator_id_"+i).val("");
                //$(this).val("");
               // $("#add_covid_lastname_"+i).val("");
            }
            else if(ui.item){
             
              obj.val(ui.item.firstname+" "+ ui.item.lastname).trigger("change");
              obj2.val(ui.item.ocupacion).trigger("change");

            }
            //document.getElementById("add_covid_lastname_"+i).focus();
             
        }, 
        
        source: function( request, response ) {
            var filter = obj.val();
            ///console.log(filter);
            var param= {filter:filter};
            var headers = {"Authorization":TOKEN_CLIENT,"apiKey":"r$3#23516ewew5"}
            $.ajax({
            url: apiurlsecurity+"/api/Get-Collaborator?code="+GetCollaborator+"&httpmethod=objectlist",
            //dataType: "json",
            method:"post",
            data : JSON.stringify(param),
            processData:false,
            crossDomain: true,
            async: true,
            headers : headers,
            success: function( data ) {
                var array =[];
                data =  JSON.parse(data);
                
                data.value.forEach(item => {
                    var json ={}
                    json.label      = item.displayName;
                    json.value      = item.givenName;
                    json.id         = item.objectId;
                    json.firstname  = item.givenName;
                    json.lastname   = item.surname;
                    json.ocupacion  = item.jobTitle;
                    array.push(json);
                });
                
                response(array);
            }
            });
        },
        minLength: 3,
        select: function( event, ui ) {
          //alert(i);
          obj3.val(ui.item.id);
          obj.trigger("focusout");
         
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

  var selectExternalCompanyNewExam = function(obj,obj2,obj3,obj4,obj5,objruc,leng,filter)
  {

    $(obj).change(function(){
      obj3.focus();
      //$("#add_covid_lastname_"+leng).val("");
      getCollaboratorR(obj3,obj4,obj5,obj); 
    });

    //autocomplete new
    //se llena la lista para autocompletar
    var list=[];
    //alert(" ");
    //console.log(jsonExternalCompany);
    jsonExternalCompany.map(function(item){
      list.push({label:item.name,value:item.name,id:item.id,ruc:item.ruc})
  });
  list.push({label:'Tasa',value:'Tasa',id:0})
    obj.autocomplete({
      change: function (event, ui) 
      {
       // $("#txr_company_id").val(0);
           
      }, 
      
      source: list//listado para autocompletar
      ,
      //minLength: 3,//minimo de letras a buscar coincidencias
      select: function( event, ui ) {
        //cuando se selecciona el valor

        obj2.val(ui.item.id);
        objruc.val(ui.item.ruc);
        setTimeout(function(){$("#add_covid_firtname_"+leng).trigger("focusout");},1000)
        
        //if(ui.item.id==0 || ui.item.id=='Tasa' || ui.item.id=='tasa' || ui.item.id=='TASA')
        getCollaborator($("#add_covid_firtname_"+leng),leng);
        

      }

      
  });


  }
    var getLocationsR= function(obj,id_location){ 
        obj.append("<option value='-1'>Cargando...</option>");
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
            var option = "<option value='0'>Seleccione</option>";         
            obj.empty();
            obj.append(option);
            data.map(function(item){
                option="<option value='"+item.id+"'>"+item.name+"</option>";
                obj.append(option);
            });

            obj.val(id_location);

        });
    }
  var getAreasR = function(location_id){
return
      $("#selr_area").html("");
      $("#selr_area").append("<option value='-1'>Cargando...</option>");
      var condition = "";
      if (location_id>0) {
        condition = "&id_location="+location_id;
      }
      var url = apiurlaccessrequest+"/api/Get-Area-All?httpmethod=objectlist"+condition+"&code="+GetAreaAll+"";                   
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
          var obj     = $("#selr_area");obj.empty();
          option="<option value='0'>Seleccione</option>";
          obj.append(option);
          data.map(function(item){
              option="<option value='"+item.id+"'>"+item.name+"</option>";
              obj.append(option);
          });

      });
  }
  var initRegisterBlacklistCovidTest = function(){

    clearformCovid();
    
      var now = moment().format('DD/MM/YYYY');
      $("#txr_fecha").datetimepicker({
          defaultDate: now,
          timepicker:false,
          format:'d/m/Y',
          maxDate:now
      });
      $('#txr_fecha').val(now);
      $('#tx_date_tamizajenop').val(now);
      getLocationsR($("#selr_local"));
      selectExternalCompanyNewExam($("#txr_company_name"),$("#txr_company_id"),$("#txr_nomape"),$("#txr_ocupacion"),$("#h_colaborator_id"),$("#txr_company_ruc"),0,0);

      $("#selr_statusrap").change(function(){
        if ($(this).val()==1) {$(".reagent").show()}else{$(".reagent").hide()}
        verifyStatus(2);

        var fichaCovid = $("#selr_status").val(); 
        var testMolecular = $("#selr_statusmolec").val(); 
        if($(this).val()=="1" || fichaCovid =="1" || testMolecular=="1" ){          
          $("#divLugarContagioNp").show();
        }
        else{
          $("#divLugarContagioNp").hide();
        }


      })

      $("#selr_statusmolec").change(function(){
        verifyStatus(2);

        var fichaCovid = $("#selr_status").val(); 
        var testFast = $("#selr_statusrap").val(); 
        if($(this).val()=="1" || fichaCovid =="1" || testFast=="1" ){          
          $("#divLugarContagioNp").show();
        }
        else{
          $("#divLugarContagioNp").hide();
        }
      })
    }
    var registerBlacklistCovidTest = function()
    {      
      
      //verificamos la las cookies
      var cookie = getCookie("vtas_fullname"+sessionStorage.tabVisitasa);          
      if(cookie.trim().length==0){        
        swal({
          title: "Su sessión se ha vencido, Debe iniciar sesión.",
          text: validatefield,
          timer: 3000,
          type: "error",
          showConfirmButton: true
          });  
          setTimeout(function(){
            window.location.href='./'; 
          },3000);         
        return;
      }

      var tx_ocupacion = $("#txr_ocupacion").val();
      var tx_temperatura = $("#txr_temperatura").val();
      var tx_antecedentes = $("#txr_antecedentes").val();
      var sel_status = $("#selr_status").val();
      var tx_resultado = $("#txr_resultado").val();
      var nameperson = $("#txr_nomape").val();      
      var identity_document = $("#txr_docum").val();
      var vetoStatus = (statusmed != 88)?statusmed:0;//statusmed;
      var reason = $("#txr_motivo_vetado").val();
      var createdBy = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
      var id_area = $("#selr_area").val();
      var name_area = $("#selr_area  option:selected").text();
      var id_location = $("#selr_local").val();
      var name_location = $("#selr_local  option:selected").text();
      var name_company = $("#txr_company_name").val();
      var id_company = $("#txr_company_id").val();
      var fecha = moment().format('D/MM/YYYY');
      var sel_statusrap = $("#selr_statusrap").val();
      var sel_statusmolec = $("#selr_statusmolec").val();
      var sel_reagent = $("#selr_reagent").val();
      var attention_date = $("#tx_date_tamizajenop").val();//$('#txr_fecha').val();
      var sel_statusFic  =  $("#selr_status").val(); 
      


      var hhmm = moment().add(0, 'hours').format('HH:mm:ss');
      attention_date=attention_date+' '+hhmm;
     
      attention_date = moment(attention_date,"DD/MM/YYYY HH:mm:ss").format('YYYY-MM-DD HH:mm:ss');//moment(attention_date,'DD/MM/YYYY').format('MM/DD/YYYY');
      
      
      //---------------------------------------------------
      //-------------------FORMATO NUEVO-------------------
      //alert("ssssssssss");     
      var namePersona         = nameperson;//$('#tx_name_per').val(); 
      var arrayNamePerson     =  namePersona.split(" ");
      var apellidoPaterno     = "";
      var apellidoMaterno     = "";
      var fullName            = "";
      if(arrayNamePerson.length==2) {
        apellidoPaterno = arrayNamePerson[1];
        fullName        = arrayNamePerson[0];
      }
      else if(arrayNamePerson.length==3) {
        apellidoPaterno = arrayNamePerson[1];
        apellidoMaterno = arrayNamePerson[2];
        fullName        = arrayNamePerson[0];
      }
      else if(arrayNamePerson.length==4) {
        apellidoPaterno = arrayNamePerson[2];
        apellidoMaterno = arrayNamePerson[3];
        fullName        = arrayNamePerson[0]+" "+arrayNamePerson[1];
      }
      else if(arrayNamePerson.length==5) {
        apellidoPaterno = arrayNamePerson[3];
        apellidoMaterno = arrayNamePerson[4];
        fullName        = arrayNamePerson[0]+" "+arrayNamePerson[1]+" "+arrayNamePerson[2];
      }
      else if(arrayNamePerson.length==6) {
        apellidoPaterno = arrayNamePerson[4];
        apellidoMaterno = arrayNamePerson[5];
        fullName        = arrayNamePerson[0]+" "+arrayNamePerson[1]+" "+arrayNamePerson[2]+" "+arrayNamePerson[3];
      }
      
      var identityDocument    = identity_document;//$('#tx_identity_document').val(); 
      var type_document       = $("#sel_type_document_noprog").val();
      var sede                = id_location;//$('#sel_sede').val(); 
      var area                = $("#hid_id_area").val();
      var embarcacion         = $('#txr_sel_embarcacion').val(); 
      var name_embarcacion    = $('#txr_sel_embarcacion').text(); 
      var empleador           = $('#txr_tx_empleador').val(); 
      var puestoTrabajo       = $('#txr_tx_puesto_trabajo').val(); 
      var companyname         = $('#txr_company').text();
      var ruc_company         = $("#txr_company_ruc").val();

      var tipoTrabajo         = $('#txr_tx_job_type').val(); 
      var name_tipoTrabajo    = $('#txr_tx_job_type').text(); 
      var actividadEconomica  = $('#txr_tx_actividad_economica').val();
      var nacionalidad        = $('#txr_tx_nacionalidad').val();
      var departamento        = $('#txr_sel_departamento_res').val();
      var provincia           = $('#txr_sel_provincia_res').val();
      var distrito            = $('#txr_sel_distrito_res').val();
      var direccion           = $('#txr_tx_direccion_res').val();
      var email               = $('#txr_tx_email').val();
      var celular             = $('#txr_tx_celular').val();
      var telefono            = $('#txr_tx_telefono').val();
      var datoFamiliar        = $('#txr_tx_dato_familiar').val();
      var telefonoContacto    = $('#txr_tx_celular_contacto').val();
      var motivo              = $('#txr_sel_motivo').val();
      var temperature         = tx_temperatura;//$('#tx_temperature').val(); 
      var sexo                = $('#txr_tx_sexo').val(); 
      var fechaNacimiento    = $('#txr_tx_edad').val(); 
      //---------------------------------------------------------      
      var fiebre              = $('#txr_chb_fiebre'); 
      var tosSeca             = $('#txr_chb_tos_seca');  
      var dificultadRespirar  = $('#txr_chb_dificulta_respirar');  
      var dolorGarganta       = $('#txr_chb_dolor_garganta');  
      var congestionNasal     = $('#txr_chb_congecion_nasal');
      var fatiga              = $('#txr_chb_fatiga');
      var escalofrio          = $('#txr_chb_escalofrio');     
      var nauseas             = $('#txr_chb_nauseas_vomito');
      var diarrea             = $('#txr_chb_diarrea');
      var dolorCabeza         = $('#txr_chb_dolor_cabeza'); 
      var dolorMusculo        = $('#txr_chb_dolor_musculo'); 
      var fechaSintomas       = $('#txr_tx_fecha_inicio_sintomas').val(); 
      var examenFisico        = $('#txr_chb_examen_fisico'); 
      var otros               = $('#txr_chb_otros'); 
      var observacionExamenFisico = $('#txr_tx_observacion_examen_fisico').val();
      var observacionOtros = $('#txr_tx_observacion_otro').val();
      //----------------------------------------------------------
      var rbContactoPersona   = $('input:radio[name=txr_rb_contacto_persona]:checked');
      var entornoFamiliar     = $('#txr_chb_entorno_familiar');
      var entornoLaboral      = $('#txr_chb_entorno_laboral');
      var entornoSalud        = $('#txr_chb_entorno_salud');
      var arrayEntorno        = [];
      //----------------------------------------------------------
      //----------------------------------------------------------
      var rbFueraPais         = $('input:radio[name=txr_rb_fuera_pais]:checked');
      var pais                = $("#txr_sel_pais_retorto").val();
      var namePais            = pais!="0"?$("#txr_sel_pais_retorto option:selected").text():"";
    
      var fechaRetorno        = $("#txr_tx_fecha_retorno").val();
      //----------------------------------------------------------
      //----------------------------------------------------------
      var rbDiferenteDistrito = $('input:radio[name=txr_rb_distrito]:checked');
      var distrito2            = $('#txr_sel_distrito').val();

      //var tipoTrabajo         = $('#sel_tipo_trabajo').val();
      //----------------------------------------------------------
      //----------------------------------------------------------
      //factores de riesgos
      var obesidad            = $('#txr_chb_obesidad');
      var enfermedadPulmunar  = $('#txr_chb_enfermedad_pulmunar');
      var diabete             = $('#txr_chb_diabete');
      var impertension        = $('#txr_chb_impertension');
      var mayor60ano          = $('#txr_chb_mayor_60_ano');
      var gestante            = $('#txr_chb_gestante');
      var arrayFactorRiesgo   = [];
      //----------------------------------------------------------
      //----------------------------------------------------------
      var adultoMayor         = $('#txr_chb_adulto_mayor'); 
      var nonio               = $('#txr_chb_nino'); 
      var chb_gestante_2      = $('#txr_chb_gestante_2');
      var familiarEnfermedad  = $('#txr_chb_familiar_enfermedad_cronica');
      var arrayMiemmbrosFamiliar = [];
      //-----------------------------------------------------------
      //-----------------------------------------------------------
      var cantPersona         = $('#txr_tx_cant_persona').val();
      var kitCovid            = $('#txr_chb_kit_covid_nop');
      var daysRest            = $('#sel_day_reposo_nop').val();
      //-----------------------------------------------------------

      //-----------------------------------------------------------
      var idAreaSap       = $("#hid_id_area_sap_nop").val();
      var nameAreaSap     =  $("#hid_name_area_sap_nop").val();
      var idLocationSap   = $("#hid_id_location_sap_nop").val();
      var nameLocationSap = $("#hid_name_location_sap_nop").val(); 
      
      var userCompanyType = $("#hid_user_company_type_nop").val();
      //alert(userCompanyType);
      //-----------------------------------------------------------

      var sintomatologia      = $('#selr_sintomalogia').val();

      var covidotrosmotivos =  $("#sel_covidotrosmotivosnp").val(); 
      var locationcontagio =  $("#sel_location_contagionp").val(); 

      var extension_reposo = $("#txr_sel_extension_reposo").val();

      var store_sintomas_total  = 0;
      var cant_sintomas         = 0; 
      var store_factor_riesgo   = 0;
      //-----------------------------------------------------------
      var arraySintomas = [];
      //-----------------------------------------------------------
      //sumamos los sintomas seleccionados   
      //console.log(fiebre.is(":checked"));
      if(fiebre.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(fiebre.data("score"));
        cant_sintomas++; 
        arraySintomas.push(fiebre.val());
        console.log(parseInt(fiebre.data("score")),store_sintomas_total)
      }
      if(dificultadRespirar.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(dificultadRespirar.data("score"));
        cant_sintomas++;
        arraySintomas.push(dificultadRespirar.val());
        console.log(parseInt(dificultadRespirar.data("score")),store_sintomas_total)
      }
      if(tosSeca.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(tosSeca.data("score"));
        cant_sintomas++;
        arraySintomas.push(tosSeca.val());
        console.log(parseInt(tosSeca.data("score")),store_sintomas_total)
      }
      if(dolorGarganta.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(dolorGarganta.data("score"));
        cant_sintomas++;
        arraySintomas.push(dolorGarganta.val());
        console.log(parseInt(dolorGarganta.data("score")),store_sintomas_total)
      }
      if(congestionNasal.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(congestionNasal.data("score"));
        cant_sintomas++;
        arraySintomas.push(congestionNasal.val());
        console.log(parseInt(congestionNasal.data("score")),store_sintomas_total)
      }
      if(fatiga.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(fatiga.data("score"));
        cant_sintomas++;
        arraySintomas.push(fatiga.val());
        console.log(parseInt(fatiga.data("score")),store_sintomas_total)
      }
      if(escalofrio.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(escalofrio.data("score"));
        cant_sintomas++;
        arraySintomas.push(escalofrio.val());
        console.log(parseInt(escalofrio.data("score")),store_sintomas_total)
      }
      if(nauseas.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(nauseas.data("score"));
        cant_sintomas++;
        arraySintomas.push(nauseas.val());
        console.log(parseInt(nauseas.data("score")),store_sintomas_total)
      }
      if(diarrea.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(diarrea.data("score"));
        cant_sintomas++;
        arraySintomas.push(diarrea.val());
        console.log(parseInt(diarrea.data("score")),store_sintomas_total)
      }
      if(dolorCabeza.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(dolorCabeza.data("score"));
        cant_sintomas++;
        arraySintomas.push(dolorCabeza.val());
        console.log(parseInt(dolorCabeza.data("score")),store_sintomas_total)
      }
      if(dolorMusculo.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(dolorMusculo.data("score"));
        cant_sintomas++;
        arraySintomas.push(dolorMusculo.val());
        console.log(parseInt(dolorMusculo.data("score")),store_sintomas_total)
      }

      if(examenFisico.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(examenFisico.data("score"));
        cant_sintomas++;
        arraySintomas.push(examenFisico.val());       
      }
      if(otros.is(":checked")){
        store_sintomas_total =store_sintomas_total+parseInt(otros.data("score"));
        cant_sintomas++;
        arraySintomas.push(otros.val());       
      }
    
      //-------------------------------------------------------
      //-------------------------------------------------------
      //sumamos factores de riegos
      //console.log(fiebre.data("score"), obesidad.data("score"));
      if(obesidad.is(":checked")) {
        store_factor_riesgo +=obesidad.data("score");
        arrayFactorRiesgo.push(obesidad.val());
      }
      if(enfermedadPulmunar.is(":checked")){
        store_factor_riesgo +=enfermedadPulmunar.data("score");
        arrayFactorRiesgo.push(enfermedadPulmunar.val());
      }
      if(diabete.is(":checked")){
        store_factor_riesgo +=diabete.data("score");
        arrayFactorRiesgo.push(diabete.val());
      }
      if(impertension.is(":checked")){
        store_factor_riesgo +=impertension.data("score");
        arrayFactorRiesgo.push(impertension.val());
      }
      if(mayor60ano.is(":checked")){
        store_factor_riesgo +=mayor60ano.data("score");
        arrayFactorRiesgo.push(mayor60ano.val());
      }
      if(gestante.is(":checked")){
        store_factor_riesgo +=gestante.data("score");
        arrayFactorRiesgo.push(gestante.val());
      }
      //----------------------------------------------------
      //----------------------------------------------------
      if(adultoMayor.is(":checked")){
        arrayMiemmbrosFamiliar.push(adultoMayor.val());
      }
      if(nonio.is(":checked")){
        arrayMiemmbrosFamiliar.push(nonio.val());
      }
      if(chb_gestante_2.is(":checked")){
        arrayMiemmbrosFamiliar.push(chb_gestante_2.val());
      }
      if(familiarEnfermedad.is(":checked")){
        arrayMiemmbrosFamiliar.push(familiarEnfermedad.val());
      }

      //----------------------------------------------------
      //coclusión 1
      var conclusion1 = "Caso no sospechoso";
      var conclusion2 = "Baja Posibilidad de evolución no favorable";
      var encuestaFoo = 0;
      var chEvolucion = 0;
      conclusion1 = "Caso no sospechoso";
      encuestaFoo = 0;
      if(($("#sel_covidotrosmotivosnp").val()!=0 && $("#sel_covidotrosmotivosnp").val()!=null)||(cant_sintomas>=1)||($("#selr_status").val()==1||$("#selr_status").val()==3))
      {
        //rbContactoPersona
        conclusion1 = "Caso Sospechoso";
        encuestaFoo = 1;
        
      }

      $("#txr_conlcusion1result").text(conclusion1);//se coloca en resultado

      //console.log((store_sintomas_total+store_factor_riesgo));
      if((store_sintomas_total+store_factor_riesgo) >=1 && (store_sintomas_total+store_factor_riesgo)<=8){
        conclusion2 ="Baja Posibilidad de evolución no favorable";
        chEvolucion = 0;
      }
      if((store_sintomas_total+store_factor_riesgo) >=9){
        conclusion2 ="Alta Posibilidad de evolución no favorable";
        chEvolucion=1;
      }
      var fechaNow = moment().format("YYYY-MM-DD hh:mm:ss");
      //console.log(fechaNow);
      if(rbContactoPersona.val()=="si"){
        if(entornoFamiliar.is(":checked"))
          arrayEntorno.push(entornoFamiliar.val());
        if(entornoLaboral.is(":checked"))
          arrayEntorno.push(entornoLaboral.val());
        if(entornoSalud.is(":checked"))
          arrayEntorno.push(entornoSalud.val());
      }

      if(rbContactoPersona.val()=="no"){ 
        arrayEntorno=[];
      }
      
      var lugar_contagio     = "";
      if($("#sel_location_contagionp").val()!="0"){
        lugar_contagio = $("#sel_location_contagionp option:selected").text();
      }

      var evento1 ={ }
      var evento2 ={ }
      var evento3 ={ }
      var evento4 ={ }     
      
      var array_eventos_send =[];
      //$('#sel_motivo').val(); 
      if(encuestaFoo==1){//caso sospechoso
        evento1 = {
          "biIdHistoria": 0,         
          "descripcionEvento": "1",
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "1",//
          "vcSintomatologia": "2",
          "vcResultado": "CASO SOSPECHOSO",
          "vcObservacion": tx_resultado,
          "zonaContacto":lugar_contagio
        }
        array_eventos_send.push("cod_anexo1_natclar");
      }
      else if(encuestaFoo==0){//caso sospechoso
        evento1 = { 
          "biIdHistoria": 0,         
          "descripcionEvento": "1",
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "10",//
          "vcSintomatologia": "2",
          "vcResultado": "CASO NO SOSPECHOSO",
          "vcObservacion": tx_resultado,
          "zonaContacto":lugar_contagio          
        }
        array_eventos_send.push("cod_anexo1_natclar");
      }
      
      if(parseFloat(temperature)>=35 && parseFloat(temperature)<=36.7)//
      {
        evento2 = {
          "biIdHistoria": 0,
          "descripcionEvento": "2",//TEMPERATURA
          "dtEvento":fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "6",//NORMAL TEMPERATURA
          "vcSintomatologia": "2",
          "vcResultado": "NORMAL TEMPERATURA",
          "vcObservacion": tx_resultado,//""
          "zonaContacto":lugar_contagio
        }
        array_eventos_send.push("cod_anexo2_natclar");
      }
      if(parseFloat(temperature)>36.7){
        evento2 = {
          "biIdHistoria": 0,
          "descripcionEvento": "2",//TEMPERATURA
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "7",//ANORMAL TEMPERATURA
          "vcSintomatologia": "2",
          "vcResultado": "ANORMAL TEMPERATURA",
          "vcObservacion": tx_resultado,//""
          "zonaContacto":lugar_contagio
        }
        array_eventos_send.push("cod_anexo2_natclar");
      }

      if(sel_reagent=="4"){///REACTIVO IGM/IGG
        evento3 = {
            "biIdHistoria": 0,          
            "descripcionEvento": "3",
            "dtEvento": fechaNow,
            "vcMotivo": motivo,
            "vcOrigen": "VISI-TASA",
            "iIdEstadoPaciente": "8",//REACTIVO IGM/IGG
            "vcSintomatologia": "2",
            "vcResultado": "REACTIVO IGM/IGG",
            "vcObservacion": tx_resultado,
            "zonaContacto":lugar_contagio          
        }
        array_eventos_send.push("cod_anexo3_natclar");
      }
      else if(sel_reagent=="1"){//NO REACTIVO
        evento3 = { 
            "biIdHistoria": 0,         
            "descripcionEvento": "3",
            "dtEvento": fechaNow,
            "vcMotivo": motivo,
            "vcOrigen": "VISI-TASA",
            "iIdEstadoPaciente": "8",//NO REACTIVO
            "vcSintomatologia": "2",
            "vcResultado": "NO REACTIVO",
            "vcObservacion": tx_resultado,
            "zonaContacto":lugar_contagio          
        }
        array_eventos_send.push("cod_anexo3_natclar");
      }
      else if(sel_reagent=="2"){//REACTIVO IGM
        evento3 = {    
            "biIdHistoria": 0,      
            "descripcionEvento": "3",
            "dtEvento": fechaNow,
            "vcMotivo": motivo,
            "vcOrigen": "VISI-TASA",
            "iIdEstadoPaciente": "12",//REACTIVO IGM
            "vcSintomatologia": "2",
            "vcResultado": "REACTIVO IGM",
            "vcObservacion": tx_resultado,
            "zonaContacto":lugar_contagio          
        }
        array_eventos_send.push("cod_anexo3_natclar");
      }
      else if(sel_reagent=="3"){//REACTIVO IGG
        evento3 = {
            "biIdHistoria": 0,
            "descripcionEvento": "3",
            "dtEvento": fechaNow,
            "vcMotivo": motivo,
            "vcOrigen": "VISI-TASA",
            "iIdEstadoPaciente": "13",//REACTIVO IGG
            "vcSintomatologia": "2",
            "vcResultado": "REACTIVO IGG",
            "vcObservacion": tx_resultado,
            "zonaContacto":lugar_contagio          
        }
        array_eventos_send.push("cod_anexo3_natclar");
      }

      if(sel_statusmolec =="1"){
        evento4 = {
          "biIdHistoria": 0,
          "descripcionEvento": "4",//TEMPERATURA
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "4",//POSITIVO MOLECULAR
          "vcSintomatologia": "2",
          "vcResultado": "POSITIVO MOLECULAR",
          "vcObservacion": tx_resultado,//""
          "zonaContacto":lugar_contagio
        }
        array_eventos_send.push("cod_anexo4_natclar");
      }
      else if(sel_statusmolec =="0"){
        /*evento4 = {
          "biIdHistoria": 0,
          "descripcionEvento": "4",//TEMPERATURA
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "5",//NEGATIVO MOLECULAR
          "vcSintomatologia": "2",
          "vcResultado": "NEGATIVO MOLECULAR",
          "vcObservacion": tx_resultado,//""
          "zonaContacto":lugar_contagio
        }
        array_eventos_send.push("cod_anexo4_natclar");*/
      }
      else if(sel_statusmolec =="2"){
        /*evento4 = {
          "biIdHistoria": 0,
          "descripcionEvento": "4",//TEMPERATURA
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "14",//PENDIENTE MOLECULAR
          "vcSintomatologia": "2",
          "vcResultado": "PENDIENTE MOLECULAR",
          "vcObservacion": tx_resultado,//""
          "zonaContacto":lugar_contagio
        }
        array_eventos_send.push("cod_anexo4_natclar");*/
      }
      
      var eventos = [];
      if(JSON.stringify(evento1)!="{}")//vacío
        eventos.push(evento1);
      if(JSON.stringify(evento2)!="{}")//vacío
        eventos.push(evento2);
      if(JSON.stringify(evento3)!="{}")//vacío
        eventos.push(evento3);
      if(JSON.stringify(evento4)!="{}")//vacío
        eventos.push(evento4);

      //----------------------------------------------------------------
      var stringArraySintomas = arraySintomas.toString();
          stringArraySintomas = stringArraySintomas.replace(/,/g,'|');///replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
      //----------------------------------------------------------------
      var distritoVistadoText = $("#txr_sel_distrito option:selected" ).text();
      distritoVistadoText = rbDiferenteDistrito.val()!="no"?distritoVistadoText:"";
      //----------------------------------------------------------------
      var stringArrayFactorRiesgo = arrayMiemmbrosFamiliar.toString();
          stringArrayFactorRiesgo = stringArrayFactorRiesgo.replace(/,/g,'|');
      //----------------------------------------------------------------      
      var stringArrayEnfermedad   = arrayFactorRiesgo.toString();
          stringArrayEnfermedad   = stringArrayEnfermedad.replace(/,/g,'|');
      //----------------------------------------------------------------                
      //----------------------------------------------------------------         
      var stringArrayEntorno      = arrayEntorno.toString();
          stringArrayEntorno      = stringArrayEntorno.replace(/,/g,'|');
      //-----------------------------------------------------------------
      var json = {
        "dtEnvio": fechaNow,
        "pacientes": 
        [
          {
            "tipoDocumento": type_document,
            "dniPaciente": identityDocument,
            "dFechaNacimiento": fechaNacimiento,
            "vcSexo": sexo,//"M",
            "vcCompania": "20100971772",//ruc_company,// "20100971772",
            "vcContrata": "20100971772",//ruc_company,//"20100971772",
            "vcUnidad": sede.toString(),//"0062",
            "vcPuesto": tx_ocupacion,//"",
            "vcArea": name_area,//"",
            "apellidoPaterno": apellidoPaterno ,//"ARCOS",
            "apellidoMaterno": apellidoMaterno ,//"ROMUCHO",
            "nombres": fullName, //"HENRY MANUEL",
            "nacionalidad":nacionalidad,//"",
            "vcUbigeo": departamento+provincia+distrito,//"010105",
            "vcDireccionActual": direccion,//"",
            "vcCorreo": email,///"",
            "vcCelular":celular,//"",
            "vcFijo": telefono,//"",           
            "vcNombreFamiliar": datoFamiliar,
            "vcCelularFamiliar": telefonoContacto,
            "vcFijoFamiliar": telefonoContacto,
            "vcTipoTrabajo": "Temporal",//tipoTrabajo,
            "vcActividadEconomiac": actividadEconomica,
            "F00":
            [
              {
                "biIdF00": 0,//$("#hid_biIdF00").val(),
                "preguntaSintomas": stringArraySintomas,//"Fiebre|Dolor de Garganta",
                "FechaInicioSintomas": fechaSintomas,
                "EntornoContacto": rbContactoPersona.val(),
                "AlternativaEntornoContacto": stringArrayEntorno,
                "ViajoFueraPais": rbFueraPais.val(),
                "QuePais": namePais,
                "RetornoPais": fechaRetorno,
                "DesplazoDistritos": rbDiferenteDistrito.val(),
                "QueDistrito": distritoVistadoText,
                "Enfermedad": stringArrayEnfermedad,//arrayFactorRiesgo
                "OtrasEnfermedades": "",
                "grupoRiesgo": stringArrayFactorRiesgo,
                "NroPersonasDomicilio": cantPersona,
                "score": store_sintomas_total+store_factor_riesgo,
                "conclusion1": conclusion1,
                "conclusion2": conclusion2
              }
            ],
            "eventos": eventos
          }
        ]
      }

      console.log(json);
      console.log(JSON.stringify(json));
      
      /*alert(sel_statusrap);
      return;*/

    

      if(name_company=="0-tasa" || name_company=="tasa" || name_company=="Tasa" || name_company=="TASA" || name_company.toLowerCase().trim() == "tasa" || name_company.toLowerCase().trim().includes("tasa")) 
          var is_collaborator = 1;
      else
          var is_collaborator = 0;
      //alert(vetoStatus +" - "+reason);
      var flag=0;
      var validatefield=""; 
        
       
        if(empleador=="0")
        {flag=1;      validatefield= "Debe seleccionar el empleador";}
        else if(identity_document=="")
        {flag=1;     validatefield= "Debe ingresar "+"Documento de identidad";}
        else if(nameperson.trim().length==0)
        {flag=1;     validatefield= "Debe ingresar el Nombre y Apellido";}          
        else if(id_location=="0" || id_location==null)
        {flag=1;       validatefield= "Debe seleccionar la Sede";}
        else if(id_area=="0")
        {flag=1;      validatefield= "Debe seleccionar el Área";}
        else if(tx_ocupacion=="")
        {flag=1;    validatefield= "Debe ingresar el Puesto de Trabajo";}                       
        else if(name_company=="")
        {flag=1;    validatefield= "Debe ingresar "+"Empresa";}   
        else if(tipoTrabajo=="0" || tipoTrabajo=="" || tipoTrabajo==null)
        {flag=1;    validatefield= "Debe ingresar el Tipo de Trabajo";}          
        else if(actividadEconomica=="")
        {flag=1;    validatefield= "Debe seleccionar la Actividad Económica";}
        else if(nacionalidad=="")
        {flag=1;    validatefield= "Debe ingresar la Nacionalidad";}        
        else if(departamento=="0")
        {flag=1;    validatefield= "Debe seleccionar el Departamento";}        
        else if(provincia=="0")
        {flag=1;    validatefield= "Debe seleccionar la Provincia";}
        else if(distrito=="0")
        {flag=1;    validatefield= "Debe seleccionar el Distrito";}
        else if(direccion.trim().length==0)
        {flag=1;    validatefield= "Debe ingresar la Dirección";}

        else if(email.trim().length==0)
        {flag=1;    validatefield= "Debe ingresar el Email";}
        else if(celular.trim().length==0)
        {flag=1;    validatefield= "Debe ingresar el Número de Celular";}
        else if(datoFamiliar.trim().length==0)
        {flag=1;    validatefield= "Debe ingresar el Dato Familiar ";}
        else if(telefonoContacto.trim().length==0)
        {flag=1;    validatefield= "Debe ingresar el Número de celular del contacto ";}          
        else if(motivo=="0" || motivo=="" || motivo==null)
        {flag=1;    validatefield= "Debe ingresarle Motivo ";}
        else if(tx_temperatura.trim().length==0)
        {flag=1;    validatefield= "Debe ingresar la Temperatura";}
        else if(sexo=="0")
        {flag=1;    validatefield= "Debe Seleccionar el Sexo";}
        /*else if(fechaNacimiento.trim().length==0)
        {flag=1;    validatefield= "Debe ingresar la Fecha de Nacimiento";}*/

        if((encuestaFoo==1 || sel_statusFic =="1" || sel_statusrap=="1" || sel_statusmolec=="1" || covidotrosmotivos=="1" || covidotrosmotivos=="2") && locationcontagio=="0"){
          flag=1;    validatefield= "Debe seleccionar el lugar de contagio";
        }
        else if(tx_resultado=="")
        {flag=1;     validatefield= "Debe ingresar "+"Observaciones";}


      if(flag==1)
      {
        swal({
          title: "Campos vacios",
          text: validatefield,
          timer: 4000,
          type: "error",
          showConfirmButton: true
          });
       // swal("Error", "No se ha ingresado observación", "error");
        $('#tx_resultado').focus();
        return;
      }
     
      swal({
        title:"Registro Tamizaje",
        text: "¿Seguro que desea registrar los datos ingresados?",
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

    },500)
       
        var name = getCookie('vtas_fullname'+sessionStorage.tabVisitasa);
        var responsible = getCookie('vtas_id'+sessionStorage.tabVisitasa);

        var url = apiurlblacklist+"/api/Post-Blacklist-User?code="+postblacklistusercode+"&httpmethod=postblackcovid";
        var body ={
          "id_user":0,
          "id_location":id_location,
          "name_location":name_location,
          "id_area":id_area,
          "name_area":name_area,
          "name_company":name_company,
          "id_company":id_company,
          "temperature":tx_temperatura,  
          "job":tx_ocupacion,                
          "antecedent":tx_antecedentes,
          "status":sel_status,
          "covid_test":(statusmed != 88)?"2":"7",//"covid_test":2,//(statusmed != 88)?"2":"7",
          "note":tx_resultado,
          "created_by": createdBy,
          "last_updated_by": createdBy,
          "veto_status": vetoStatus,
          "responsible": responsible,
          "name":nameperson,
          "type_document":type_document,
          "identity_document":identity_document,
          "attribute5":reason,
          "list_type": 2,
          "covid_attribute2":"1",
          "is_collaborator":is_collaborator,
          "fecha":fecha,
          "name_doctor":toCapitalize(name),
          "status_test_fast" : sel_statusrap,
          "status_test_molecular" : sel_statusmolec,
          "veto_fast" : sel_statusrap,
          "veto_molecular" : sel_statusmolec,
          "attention_date" : attention_date,
          "id_reagent_type" : sel_reagent,
          "attribute1":typeTamizajeOrign,
          "cb_fiebre":fiebre.is(":checked"),
          "cb_dificulta_respiratoria":dificultadRespirar.is(":checked"),
          "cb_tos_seca":tosSeca.is(":checked"),
          "cb_dolor_garganta":dolorGarganta.is(":checked"),
          "cb_congestion_nasal":congestionNasal.is(":checked"),
          "cb_fatiga":fatiga.is(":checked"),
          "cb_escalofrio":escalofrio.is(":checked"),
          "cb_nauseas_vomito":nauseas.is(":checked"),
          "cb_diarrea":diarrea.is(":checked"),
          "cb_dolor_cabeza":dolorCabeza.is(":checked"),
          "cb_dolor_musculo":dolorMusculo.is(":checked"),
          "fecha_inicio_sintoma":fechaSintomas,            
          "rb_concato_persona":rbContactoPersona.val()=="si"?true:false,
          "cb_entorno_famiiar":entornoFamiliar.is(":checked"),
          "cb_entorno_laborar":entornoLaboral.is(":checked"),
          "cb_entorno_salud":entornoSalud.is(":checked"),
          "rb_pais_visitado":rbFueraPais.val()=="si"?true:false,//falta backend
          "pais_visitado":pais,
          "fecha_retorno":fechaRetorno,
          "rb_direfente_distrito":rbDiferenteDistrito.val()=="si"?true:false,
          "distrito_visitado":departamento+provincia+distrito2,
          "cb_obesidad":obesidad.is(":checked"),
          "cb_enfemedad_pulmonar":enfermedadPulmunar.is(":checked"),
          "cb_diabete":diabete.is(":checked"),
          "cb_impertension":impertension.is(":checked"),
          "cb_mayo_60":mayor60ano.is(":checked"),
          "cb_adulto_mayor":mayor60ano.is(":checked"),//falta backend
          "cb_nino":nonio.is(":checked"),
          "cb_gestante":gestante.is(":checked"),
          "cb_familiar_enfermedad":familiarEnfermedad.is(":checked"),
          "cb_gestante_2":chb_gestante_2.is(":checked"),////falta backend
          "nro_personas":cantPersona,
          "ch_sospechoso":encuestaFoo,
          "ch_evolucion":chEvolucion,
          "pregunta_1":"¿Qué síntomas presenta?",
          "pregunta_2":"¿En los últimos 14 días ha tenido contacto con personas con diagnóstico confirmados de coronavirus?",
          "pregunta_3":"¿Ha viajado fuera del país o zona del Perú con casos confimados de covid-19 en los últimos 14 días?",
          "pregunta_4":"¿En los últimos 14 días se desplazó a diferentes distritos distintos a su lugar de residencia?",
          "pregunta_5":"¿Usted padece o padeció de algunas de las siguientes enfermedades o condiciones?",
          "pregunta_6":"¿En la casa donde habita tiene los siguientes grupos de riesgo?",
          "pregunta_7":"¿Cuántas personas viven en el domicilio donde habita?",
          "id_embarcacion":embarcacion,
          "name_embarcacion":embarcacion,
          "id_tipo_trabajo":tipoTrabajo,
          "name_tipo_trabajo":tipoTrabajo,
          "motivo_tamizaje": motivo,
          "nacionalidad":nacionalidad,
          "actividad_economica":actividadEconomica,
          "ubigeo":departamento+provincia+distrito,
          "direccion":direccion,
          "tlf_celular":celular,
          "tlf_fijo":telefono,
          "conclusion1":conclusion1,
          "conclusion2":conclusion2,
          "dato_familiar":datoFamiliar,
          "tlf_contacto":telefonoContacto,
          "sexo":sexo,
          "fecha_nacimiento":fechaNacimiento,
          "email":email,
          "json_clinica":json,
          "envioJson":"yes",
          "eventos_send":array_eventos_send,
          "cb_kit_covid":kitCovid.is(":checked"),
          "sintomatologia":sintomatologia,          
          "otro_motivo":covidotrosmotivos,
          "lugar_contagio":locationcontagio,
          "date_ini_alatmedica_pdf":$("#tx_date_init_pdf").val(),
          "date_end_alatmedica_pdf":$("#tx_date_end_pdf").val(),
          "register_origin":"No Programado",
          "daysRest":daysRest,
          "idAreaSap":idAreaSap,
          "nameAreaSap":nameAreaSap,
          "idLocationSap":idLocationSap,
          "nameLocationSap":nameLocationSap,
          "userCompanyType":userCompanyType,
          "cb_examen_fisico":examenFisico.is(":checked"),
          "observacion_examen_fisico":observacionExamenFisico,
          "cb_otros": otros.is(":checked"),
          "observacion_otros":observacionOtros,
          "extension_reposo":extension_reposo
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
              swal({
                title: "Éxito",
                text: "Tamizaje Registrado con Éxito",
                type: "success",
                timer:2000,
                showCancelButton: false,
                confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
                confirmButtonText: "De acuerdo",
                closeOnConfirm: false
              });
            },500)
           
           tableBlackList();

              $('#modalRegisterBlackCovidTest').modal('hide');


            $("#txr_company_name").val("");
            $("#selr_area").val(1);
            $("#selr_local").val(0);
            $("#txr_nomape").val("");
            $("#txr_docum").val("");
            $("#txr_ocupacion").val(""); 
            $("#txr_temperatura").val("");
            $("#txr_antecedentes").val("");
            $("#txr_resultado").val("");
            $("#selr_statusmolec").val(2);
            $("#selr_statusrap").val(2);
            $("#selr_status").val(2);
            $("#sel_reagent").val(0);
            typeTamizajeOrign=0;//tipo de origen de tamizaje telf,sade, app
            
          }else{
            swal("Error!", "No se ha podido actualizar la lista.", "error");
          }

        });

    });   
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
        jsonPersonBlaclistName=[];
        data.map(function(item){
          var json ={}
          json.label      = item.identity_document;
          json.value      = item.identity_document;
          json.id         = item.id;
          json.firstname  = item.name;
          json.id_company = item.id_company;
          json.biIdF00    = item.biIdF00;
          jsonPersonBlaclist.push(json);
          //-----------------------------
          //-----------------------------          
          var json2 ={}
          json2.label      = item.name;
          json2.value      = item.name;
          json2.id         = item.id;
          json2.firstname  = item.name;
          json2.id_company = item.id_company;
          json2.identity_document = item.identity_document;
          json2.biIdF00    = item.biIdF00;                     
          jsonPersonBlaclistName.push(json2);     
        });
       
        $("#add_covid_dni_1").autocomplete({          
          change: function (event, ui) 
          {
            // console.log( $("#hid_collaborator_id_"+i).val())
            if (ui.item === null) 
            {
                //$("#hid_collaborator_id_"+i).val("");
                //$(this).val("");
            }
            
          },
          source: jsonPersonBlaclist,      
         // minLength: 3,
          select: function( event, ui ) {
            //$("#add_covid_dni_1").val(ui.item.label);
            $("#txr_docum").val(ui.item.dni);
            $("#add_covid_firtname_1").focus();
              $("#add_covid_firtname_1").val(ui.item.firstname);      
           /* setTimeout(function(){
              
            },300);*/
            
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

        $("#add_covid_dnitemp_1").autocomplete({          
          change: function (event, ui) 
          {
            // console.log( $("#hid_collaborator_id_"+i).val())
            if (ui.item === null) 
            {
                //$("#hid_collaborator_id_"+i).val("");
                //$(this).val("");
            }
            
          },
          source: jsonPersonBlaclist,      
         // minLength: 3,
          select: function( event, ui ) {
            //$("#add_covid_dni_1").val(ui.item.label);
           
            $("#add_covid_firtnameemp_1").focus();
              $("#add_covid_firtnametemp_1").val(ui.item.firstname);      
           /* setTimeout(function(){
              
            },300);*/
            
          },
          
        });

        $("#txr_docum").autocomplete({          
          change: function (event, ui) 
          {
            // console.log( $("#hid_collaborator_id_"+i).val())
            if (ui.item === null) 
            {
                //console.log("aqui")
            }
            
          },
          source: jsonPersonBlaclist,      
         // minLength: 3,
          select: function( event, ui ) {
            //$("#add_covid_dni_1").val(ui.item.label);
            //$("#txr_docum").val(ui.item.dni);
            $("#txr_nomape").focus();
              $("#txr_nomape").val(ui.item.firstname);      
              ui.item.biIdF00 = ui.item.biIdF00!=null && ui.item.biIdF00!="null" && ui.item.biIdF00!=""?ui.item.biIdF00:0;
            $("#hid_biIdF00").val(ui.item.biIdF00);
            $("#notificationVetoPErson_np").hide();
            setTimeout(function(){
              var riesgo=covid_checkRiskList($("#txr_docum").val());
              if(riesgo.length>0)
              {
                console.log("En lista de riesgo");
                $("#modalViewBlackCovidTest").modal("hide");
                $("#modalRegisterCovidTestNewForm").modal("hide");
                $("#modalRegisterBlackCovidTest").modal("hide");
        
                /* setTimeout(function(){
                  $("#modalnotifRiesgo").modal('show');
                },500) */
              
              }
            },300);

           
            
          },
         
        });
        
        $("#txr_nomape").autocomplete({   
          change: function (event, ui) 
          {
            // console.log( $("#hid_collaborator_id_"+i).val())
            if (ui.item === null) 
            {
                //$("#hid_collaborator_id_"+i).val("");
                //$(this).val("");
                /*$("#add_covid_firtname_1").val("");
                $("#add_covid_lastname_1").val("");*/
            }
            
          },
          source: jsonPersonBlaclistName,      
         // minLength: 3,
          select: function( event, ui ) {
            $("#txr_docum").val(ui.item.identity_document);           
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
        
        $("#txr_nomape_history").autocomplete({   
          change: function (event, ui) 
          {
            // console.log( $("#hid_collaborator_id_"+i).val())
            if (ui.item === null) 
            {
              //$("#hid_collaborator_id_"+i).val("");
              // $(this).val("");
              /*$("#add_covid_firtname_1").val("");
              $("#add_covid_lastname_1").val("");*/
            }
          },
          source: jsonPersonBlaclistName,      
         // minLength: 3,
          select: function( event, ui ) {
            $("#txr_docum_history").val(ui.item.identity_document);           
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

        $("#tx_nomape").autocomplete({   
          change: function (event, ui) 
          {
            // console.log( $("#hid_collaborator_id_"+i).val())
            if (ui.item === null) 
            {
                //$("#hid_collaborator_id_"+i).val("");
                //$(this).val("");
                /*$("#add_covid_firtname_1").val("");
                $("#add_covid_lastname_1").val("");*/
            }
          },
          source: jsonPersonBlaclistName,      
         // minLength: 3,
          select: function( event, ui ) {
            $("#tx_docum").val(ui.item.identity_document);           
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

        $(".autocompleteblacklistname").autocomplete({   
          change: function (event, ui) 
          {
            // console.log( $("#hid_collaborator_id_"+i).val())
            if (ui.item === null) 
            {
                //$("#hid_collaborator_id_"+i).val("");
                //$(this).val("");
                /*$("#add_covid_firtname_1").val("");
                $("#add_covid_lastname_1").val("");*/
            }
          },
          source: jsonPersonBlaclistName,      
         // minLength: 3,
          select: function( event, ui ) {
            $("input[name='tx_docum']").val(ui.item.identity_document);           
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
          if(data.list_type==1)//en lista negra
            vetado = 1;
          if(data.list_type==2)//por tamizaje
          {
            
            vetado = 2;
          }
        }
        if(data.covid_test==7 && data.list_type==2)
        {
            vetado=7;//indefinido
        }
            

      });      
      return vetado;
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

    var checkBlackListName = function(name){
      //alert("checkBlackList"+' '+dni);
      var url         = apiurlblacklist+"/api/Get-Blacklist-User?code="+getblacklistusercode+"&httpmethod=object&name="+name+"&search_type=1";              
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
        if(data.veto_status==true || data.veto_status==1){
          if(data.list_type==1)
          vetado = 1;
        if(data.list_type==2)
          vetado = 2;
        }        
      });      
      return vetado;
    }

    var checkOis = function(dni,leng,typepesron)
    {     
      //alert("checkOis");
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
       
      }
      //cheking persona de riesgo

            ///var dataRiesgo = getObjectByValue(PERSONAL_RESTRINGIDO,"DNI",dni);
            var dataRiesgo = checkRiskList(dni);
            //console.log(dataRiesgo)
            if(dataRiesgo.length>0)
            {
              $("#validationsIdOiid_"+leng)[0].className="text-danger";
              $("#validationsIdOiid_"+leng).text(dni+", En Lista de Riesgo. ");
              $("#add_covid_firtname_"+leng).val(toCapitalize(dataRiesgo[0].name));
              //$("#add_covid_dni_"+leng).val(""); 
              /*setTimeout(function(){
                $("#add_covid_dni_"+leng).val("");
              },1000)  
              $("#div_message_req").html('<i class="fa fa-circle text-danger" style="height: 30px important!;"></i><label style="margin-left:15px">No se puede realizar solicitudes de Tamizaje para estos usuarios. Motivo: En Lista De Riesgo</label>');            
              return;*/
            }

      if(vetado==7)//cheking habilitado indefinido
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
      
            
      //alert("ssssss");
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
            if(data.nota==""){textError=textError+" .Nota Inducción"}

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

    var checkOisTemp = function(dni,leng,typepesron)
    {
      dni=dni.trim(); 
      $("#validationsIdOiidTemp_"+leng)[0].className="text-white";          
      //CHECK LISTA NEGRA
      var vetado = checkBlackList(dni);
      
      if(vetado==1)
      {
        $("#validationsIdOiidTemp_"+leng)[0].className="text-danger";
        $("#validationsIdOiidTemp_"+leng).text(dni+", Usuario en lista negra.");
        //$("#add_covid_firtname_"+leng).val('');
        $("#add_covid_dnitemp_"+leng).val("");   
        return;
      }
      if(vetado==2)
      {
        $("#validationsIdOiidTemp_"+leng)[0].className="text-warning";
        $("#validationsIdOiidTemp_"+leng).text("Usuario vetado. ");
        //$("#add_covid_firtname_"+leng).val('');
        //$("#add_covid_dni_"+leng).val("");   
        
      }
      //cheking persona de riesgo
      //var dataRiesgo = getObjectByValue(PERSONAL_RESTRINGIDO,"DNI",dni);
      var dataRiesgo = checkRiskList(dni);
      //console.log(dataRiesgo)
      if(dataRiesgo.length>0)
      {
        $("#validationsIdOiidTemp_"+leng)[0].className="text-danger";
        $("#validationsIdOiidTemp_"+leng).text(dni+", En Lista de Riesgo. ");
        $("#add_covid_firtnametemp_"+leng).val(toCapitalize(dataRiesgo[0].name));
        $("#add_covid_dnitemp_"+leng).val("");  
        $("#div_message_reqtemp").html('<i class="fa fa-circle text-danger" style="height: 30px important!;"></i><label style="margin-left:15px">No se puede realizar solicitudes de Tamizaje para estos usuarios. Motivo: En Lista De Riesgo</label>');            
        return;
      }

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
          $("#add_covid_firtnametemp_"+leng).val(toCapitalize(data.fullname));
          $("#ruc_companytemp_"+leng).val(data.company_ruc);
          $("#sel_companytemp_"+leng).val(toCapitalize(data.company_name));

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
            if(data.nota==""){textError=textError+" .Nota Inducción"}

            console.log("No autorizado OIS")
            $("#add_covid_dnitemp_"+leng).val("");
            $("#validationsIdOiidTemp_"+leng)[0].className="text-danger";
            $("#validationsIdOiidTemp_"+leng).text(dni+", "+textError);
            $("#add_covid_dnitemp_"+leng).focus();
          }
        }
        else{
          if(dni!="001654671" && dni!="001654672" && dni!="001444147" && dni!="003353982" )//documento sde prueba visualsat
          {
            console.log("No autorizado OIS");
            $("#add_covid_dnitemp_"+leng).val("");
            $("#validationsIdOiidTemp_"+leng)[0].className="text-danger";
            $("#validationsIdOiidTemp_"+leng).text(dni+", No Registrado en OIS.");
            $("#add_covid_dnitemp_"+leng).focus();
          }
        }
      });
    }
      return resp;
    }
    

    var verifiqueBlacklisOis = function(dni, name)
    { 
     
      dni=dni.trim()


      vt_validateSecury(dni,'collaborator');
      return
     
    }


    var checkOisSeguridad = function(dni,enter){  
     
    dni=dni.trim()
      //CHECK LISTA NEGRA
      var vetado = checkBlackList(dni);
      //alert(leng+"  -- "+vetado);
      if(vetado==1){
        $("#validationsIdOiid_"+leng)[0].className="text-danger";
        $("#validationsIdOiid_"+leng).text("Usuario en lista negra");
        //$("#add_covid_firtname_"+leng).val('');
        $("#add_covid_dni_"+leng).val("");   
        return;
      }

      if(vetado==2){
        $("#validationsIdOiid_"+leng)[0].className="text-danger";
        $("#validationsIdOiid_"+leng).text("Usuario vetado");
        //$("#add_covid_firtname_"+leng).val('');
        //$("#add_covid_dni_"+leng).val("");   
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
        /*if(data.enabled_status==false || data.enabled_status ===undefined){//si es vacío no existe
          swal("Acceso Denegado","Su empresa no presentó la Declaración Jurada COVID-19","error"); 
        }
        else{
          validatedni2(enter);
        }*/
        checkRegister = 0;
        if(data.error==1){         
          swal("Error en OIS","Error:"+data.statusCode+", "+data.messager,"error");         
          return;
        }

        if(data.dni)
        {
          if(data.enabled_status)///habilitado
          {
            console.log("OIS Autorizado");
            validatedni2(enter);
          }
          else
          {//no habilitado           
            var textError="OIS: ";
            if(!data.sctr_status){textError=textError+" .SCTR"}
            //if(!data.emo_status){textError=textError+" .EMO"}
            if(!data.codanexo1_status){textError=textError+" .Anexo1"}
            if(!data.codanexo2_status){textError=textError+" .Anexo2"}
            if(!data.dj_status){textError=textError+" .DJ"}
            if(data.nota==""){textError=textError+" .Nota Inducción"}

            swal("Acceso Denegado","Su empresa no presentó documentación completa en OIS.\nFalta:\n "+textError,"error"); 
          }
        }
        else{
          if(dni!="001654671" && dni!="001654672" && dni!="001444147" && dni!="003353982" )//documento sde prueba visualsat
          {
            swal("Acceso Denegado","No registrado en OIS","error"); 
          }
        }
      });
    }

    var autocompletarExternalCompany = function(obj,pos)
    {
      return;
      //jsonExternalCompany;
     
      //console.log(jsonExternalCompany);
      var jsonCompany = [];
      jsonExternalCompany.map(function(item){
        var json        = {}        
        json.label      = item.ruc;
        json.value      = item.ruc;
        json.id         = item.id;
        json.name       = item.name;
        json.ois        = item.attribute4;
        jsonCompany.push(json);
      });
      //console.log("json:"+JSON.stringify(jsonCompany));
      obj.autocomplete({          
        change: function (event, ui) 
        {        
          if (ui.item === null) //SI NO SELECCIONA
          {}
          else if(ui.item) //
          {
            //$("#add_covid_firtname_1").val(ui.item.firstname);
            //$("#add_covid_lastname_1").val(ui.item.lastname);
          }
        },
        source: jsonCompany,      
        minLength: 1,
        select: function( event, ui ) {
          //alert(ui.item.value);
          //$("#add_covid_firtname_1").val(ui.item.firstname);
          $("#sel_company_"+pos).val(ui.item.name);
          //checkOis(ui.item.value);
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
    }

         
    var getCupoDisponible = function(date, sede, objmessage){
      if(sede!="0" && date.trim().length>0){
        var arrayCupoDisponible = [];
        var j = 0;      
        $("#tb_tbody_covid_list tr").each(function(){
          var values = [];
          j++;
          var objmessage = $("#small_message_"+j);
          $(this).find('.validations_cupos').each(function(){                         
            var idinput = $(this).attr("id");
            var value   = $(this).val();
            values.push(value);
            console.log("value:"+value); 
          });
          sede = values[0];
          date = values[1];   
          console.log(sede,date);    
          if(sede!="0" && date!=""){          
            var arraySede = sede.split("-");
            var val   = arraySede[0];            
            var index = 0;
            var check = 0;
            arrayCupoDisponible.forEach(function(item){                    
              if(item.id_sede == val && item.date==date){
                arrayCupoDisponible[index].cant = arrayCupoDisponible[index].cant+1;
                check =1;            
              }
              index++;
            });
            if(check==0){//no existe 
              var json = {
                id_sede  :val,
                name_sede: arraySede[1],
                date: date,
                cant: 1,
                cupo : 0,
                disponible:0
              }
              arrayCupoDisponible.push(json);
            }
          }
        });            
        //console.log($("#tb_tbody_covid_list tr").length,j);
        if($("#tb_tbody_covid_list tr").length==j)
        {
          var table = $("#tb_cupos_disponibles tbody");
          table.empty();            
          //table.html("");
          arrayCupoDisponible.forEach(function(item){ 
            var k           = 0;        
            var sede        = item.id_sede;
            var arrayDate   = item.date.split("/");
            var datenew     = arrayDate[2]+'-'+arrayDate[1]+'-'+arrayDate[0];
            var url         = apiurlaccessrequest+"/api/Get-MedicalAvailability?code="+GetMedicalAvailability+"&httpmethod=availability&id_sede="+sede+"&date="+datenew;              
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
                item.cupo = data[0].available;
                item.disponible = data[0].available-item.cant;            
                var row = `<tr class="font-weight-light" style="font-size:12px">
                              <td>${item.name_sede}</td> 
                              <td>${item.date} </td>
                              <td>${item.cant}</td>
                              <td>${item.disponible}</td>
                            </tr>`;
                table.append(row);
            });
          });          
          console.log(arrayCupoDisponible);
        }
      }      
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
      var id          = idEdit;
      //alert("sssssss"+id);
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
        //alert("sssss");
        //console.log(data);
        tableBlackList();
        $('#modalEditBlacklist').modal('hide');

      });
    //alert("Preparando todo para aprobar");
    }

var closFormCovid =function(id)
{


  swal({
    title: "Advertencia",
    text: "Si cierra el formulario perderá toda la información registrada. Debe finalizar antes de cerrar.  ¿desea salir de igual forma?",
    type: "info",
    showCancelButton: true,
    confirmButtonClass: " btn-green-lime btn-sm btn-rounded btn-raised",
    confirmButtonText: "Si",
    cancelButtonText: "No",                
    closeOnConfirm: true,
    closeOnCancel: true,
    showLoaderOnConfirm: false
  },function(action)
  {
   
    if (action==false) 
    {
      $("#"+id).modal('show')
      
    }
    else{
      clearformCovid();
      $("#"+id).modal('hide')
    }
    
    
});

  
}   
var addContacttemp = function(){ 
         
  var leng = $("#tb_tbody_covid_list").find("tr.row_covid").length;


  
  leng++;
  lengListtemp++;
  leng=lengListtemp;
  $("#badgelistRequesttemp").text(' ( '+leng+' )');

  var nombre='';
  var html = `<tr id="row_covidtemp_${leng}" class="row_covid">
              <td>
                <div class="form-group bmd-form-group" style="padding-top:0!important">  
                  <img src="images/iconos/organizador.svg" class="mr-3 mt-2" height="24">
                </div>
              </td>                
              <td style="">
                <div class="form-group bmd-form-group" style="padding-top:0!important">
                  <select class="form-control" id="sel_type_contacttemp_${leng}"  name="sel_type_contacttemp_${leng}">
                    <option value="contratista">Contratista</option>
                    <option value="colaborador">Colaborador</option>
                  </select>
                  <small class="text-white"  id="" style="font-size: 11px;">Validations</small>                                                
                </div>
              </td>
              <td>
              <div class="form-group bmd-form-group" style="padding-top:0!important">                                  
                <input type="text" maxlength="10" onkeyup="validaSoloNumeros(this.id)" class="form-control" id="add_covid_dnitemp_${leng}" value="">                                                   
                <small class="text-white"  id="validationsIdOiidTemp_${leng}" style="font-size: 11px;">OIS Autorizado</small>
                <div id="add_covid_dniloadtemp_1" class="loader" style="display:none"></div>  
              </div>
            </td>
              <td>
                <div class="form-group bmd-form-group" style="padding-top:0!important">  
                  <input type="text" maxlength="25" class="form-control autocompletecollaborator" id="add_covid_firtnametemp_${leng}" value="">  
                  <small class="text-white">Validations</small>   
                  <input type="hidden" class="form-control" id="hid_collaboratortemp_id_${leng}" name="hid_collaboratortemp_id_${leng}">                       
                </div>
              </td>
              <td>
                <div class="form-group bmd-form-group" style="padding-top:0!important"> 
                <input type="text" class="form-control" id="ruc_companytemp_${leng}" maxlength="30" value=""  onfocus="if (this.value!='') /*this.value='';$('#ruc_companytemp_${leng}${leng}').val('');*/">                                                     
                <small class="text-white">Validations</small>
                </div>
              </td>
              <td>
                <div class="form-group bmd-form-group" style="padding-top:0!important"> 
                <input type="text" class="form-control autocompletecollaborator" id="sel_companytemp_${leng}" maxlength="30" value=""  onfocus="if (this.value!='') /*this.value='';$('#sel_cod_companytemp_${leng}').val(''); $('#sel_company_${leng}')[0].className='form-control'*/">                                                     
                <small class="text-white">Validations</small>
                </div>
              </td>
             
             
              <td>
                <div class="form-group bmd-form-group" style="padding-top:0!important">
                  <select name="sel_locationtemp_${leng}" class="form-control validations_cupos" id="sel_locationtemp_${leng}"value="">Seleccione</select>
                  <small class="text-white" id="small_messagetemp_${leng}" name="small_messagetemp_${leng}">Validations</small>   
                </div>
              </td>
              <td>
                <div class="form-group bmd-form-group" style="padding-top:0!important">
                  <select name="sel_areatemp_${leng}" class="form-control" id="sel_areatemp_${leng}" value="">Seleccione</select>                                                   
                  <small class="text-white">Validations</small>   
                </div>
              </td>
              <td>
                <div class="form-group bmd-form-group" style="padding-top:0!important">                                  
                  <input type="text" maxlength="15"  class="form-control validations_cupos" autocomplete="off" id="tx_date_starttemp_${leng}" value="">  
                  <input type="hidden" class="form-control " id="sel_cod_companytemp_${leng}" name="sel_cod_companytemp_${leng}" value="">                                                 
                  <small class="text-mute mutetexthelp">DD/MM/YYYY</small>   
                </div>
              </td>
              
              <td>
              <div id="bt_delete_row_covidtemp_${leng}" style="cursor: pointer;">
                  <img src="images/iconos/trash.svg" class="" >
              </div>
              </td>
            </tr>`;

            $("#tb_tbody_covid_listtemp").append(html);

            

            $("#bt_delete_row_covidtemp_"+leng).click(function()
            {
              var id  = 'row_covidtemp_'+leng;
              var obj = $("#"+id);
              removeRowCovid(obj);
              $("#cant_row_personatemp").html($("#list_participantestemp").find("div.bd-callout").length);
            });
            $("#sel_type_contacttemp_"+leng).change(function(){
              
              clearRowtemp(leng);   
              getCollaboratortemp($("#add_covid_firtnametemp_"+leng),leng);                    
              var value = $(this).val();
                $("#ruc_companytemp_"+leng)[0].disabled=false;
                $("#sel_companytemp_"+leng)[0].disabled=false;
                $("#sel_companytemp_"+leng)[0].className="form-control autocompletecollaborator";
                $("#ruc_companytemp_"+leng)[0].className="form-control autocompletecollaborator";

              if(value=='colaborador')
              {
                $("#ruc_companytemp_"+leng).val('20100971772');
                $("#sel_companytemp_"+leng).val('Tasa'); 
                $("#ruc_companytemp_"+leng)[0].disabled=true;
                $("#sel_companytemp_"+leng)[0].disabled=true;
                $("#sel_companytemp_"+leng)[0].className="form-control autocompletecollaborator bg-white";
                $("#ruc_companytemp_"+leng)[0].className="form-control autocompletecollaborator bg-white";

              }
            });

            
           
            
            
            autocompletarExternalCompany($("#ruc_companytemp_"+leng),leng);
            $("#add_covid_dnitemp_"+leng).autocomplete({          
              change: function (event, ui) 
              {
                
               
                if (ui.item === null) 
                {                      
                  
                }
                else if(ui.item)
                {                     
                  $("#add_covid_firtnametemp_"+leng).val(ui.item.firstname);
                }
              },
              source: jsonPersonBlaclist,      
              minLength: 1,
              select: function( event, ui ) {
                $("#add_covid_firtnametemp_"+leng).val(ui.item.firstname);
              },                                     
            });           
            getAreas('',leng,null)
            selectLocation("#sel_locationtemp_"+leng,null);
            selectExternalCompanytemp($("#sel_companytemp_"+leng),leng);
            getCollaboratortemp($("#add_covid_firtnametemp_"+leng),leng);
            //}
            $("#add_covid_dnitemp_"+leng).blur(function(){
              var dni = $(this).val();                  
              if(dni.trim().length>0){
                if($("#sel_type_contacttemp_"+leng).val()=="colaborador")
                  getCollaboratorDni(dni,leng,"add_covid_firtnametemp_"+leng);

                checkOisTemp(dni,leng,$("#sel_type_contacttemp_"+leng).val());
              }
                
            });
            $("#tx_date_starttemp_"+leng).datetimepicker({
              timepicker:false,
              format:'d/m/Y',
              minDate: 0
          });

        
    
         
}


  var oTableMyRequestTemp;
  var tableMyRequestTemp = function(){ 

    $("divListTemp").hide();
    
    showLoading();
    if(oTableMyRequestTemp){
      oTableMyRequestTemp.clear().draw();
      oTableMyRequestTemp.destroy();
    }
    if(!status)    
      status = $('input:radio[name=chb_status_list]:checked').val();        
     
    var responsible_user = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa)  
    var list_type = 2;
    //alert(ActiveEnterTemp+"  ssss ")
    var estatus = ActiveEnterTemp==1?'0':$("#sel_status")[0]?$("#sel_status").val():0;
    var type    = ActiveEnterTemp==1?'0':$("#sel_type")[0]?$("#sel_type").val():0;      
    var company = ActiveEnterTemp==1?'0': $("#sel_company")[0]?$("#sel_company").val():0;        
    var array   = ActiveEnterTemp==1?'0':$("#sel_sede")[0]?$("#sel_sede").val().split("-"):0;
    var sede    = ActiveEnterTemp==1?'0':array[0]?array[0]:0;
    var area    = ActiveEnterTemp==1?'0':$("#sel_area")[0]?$("#sel_area").val():0;
    var desde   = $("#tx_date_init").val();
    var hasta   = $("#tx_date_end").val();                
    var search  = ActiveEnterTemp==0?'':"&search="+$("#tx_access_dni_list_temp").val();//$("#tx_access_dni_list").val();
    var rol     = getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa);
    var search_type = 1;    
    var url     = apiurlaccessrequest+"/api/Post-AccessRequestTemp-All?code="+PostAccessRequestTempAll+"&httpmethod=objectlist&list_type="+list_type+"&status="+estatus+"&type="+type+"&company="+company+"&sede="+sede+"&area="+area+"&date_init="+desde+"&date_end="+hasta+"&rol="+rol+search+"&search_type="+search_type+"&responsible_user="+responsible_user;
    var headers ={
        "apikey":constantes.apiKey
      }
      oTableMyRequestTemp = $('#tb_covid_list_person_temp').DataTable({
          dom: 'Bfrtip',
          buttons: [{
            extend: 'excelHtml5',
            className:'btn-success font-weight-bold ',              
            text: 'Exportar a Excel',
            //messageTop: 'Exportar a Excel',
            exportOptions: {
              columns: [0,1,2,3,4,5]
            },
            title: 'Listado de Solicitudes',              
            customize: function(xlsx) {
            }
          },
          
          {
            extend: 'print',
            className:'btn-secondary font-weight-bold',              
            text: 'Imprimir',
            //messageTop: 'Exportar a Excel',
            exportOptions: {
              columns: [0,1,2,3,4,5]
            },
            title: 'Listado de Solicitudes',              
            customize: function(xlsx) {
            }
          }
          //'copyHtml5',
          //'excelHtml5',
          //'csvHtml5',
          //'pdfHtml5' 
        ],
          ordering  : false,
          info      : false,
          pageLength: 100,
          paging:true,
          searching : true,
          scrollY   : '45vh',
          scrollCollapse: true,
          responsive: true,
          language:{"sProcessing":"Procesando...",
              "sLengthMenu":     "Mostrar _MENU_ registros",
              "sZeroRecords":    `<div style=''>Presione la tecla ENTER para realizar su búsqueda</div>`,//Validar el documento de identidad. No se encontraron resultados. Sin solicitud de Tamizaje
              "sEmptyTable":     `No se encontraron solicitudes para el rango de fecha consultado`,
              "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
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

                var textError=thrown;
                var status=xhr.status+' - '+xhr.statusText;//500 error servidor

                showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
                return;


                //console.log( xhr, error, thrown );
                hideLoading();
            },
              dataSrc: function ( req ) 
              {
                $("divListTemp").fadeIn();
                hideLoading();
                  globalBlackLists=req;
                  var data =[];
                  var i = 1;
                  var length = req.length;
                  $("#badgelistPersonttemp").html(length);
                  req.map(function(item)
                  {                                            
                      var accessTime  = moment(item.entry_datetime).format('LT');
                      var week        = moment(item.entry_datetime).format('ddd');//dddd
                      var month       = moment(item.entry_datetime).format('MMMM');//
                      var day         = moment(item.entry_datetime).format('D');
                      var startDate   = week +" "+day +" de "+ month;
                      
                      var area = item.name_area?toCapitalize(item.name_area):"No Asignado";
                      //console.log(item.name_external_company,item.person_picture);
                      var companys=item.name_company?toCapitalize(item.name_company):'-';
                      var name="'"+toCapitalize(item.name)+"'";
                      var statusColor="";
                      var dateTamizaje = getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_MEDICO" || getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_MEDICAREA" ||flagModuleMedicoActive==1?item.last_attention_date=='0001-01-01T00:00:00'?'':formatDateTime(item.last_attention_date,16,true,true):moment(item.last_attention_date).format('DD/MM/YYYY');
                      if(( item.covid_test==1) && item.last_veto_status==0)
                      {
                        var textStatus="Pendiente por Tamizaje";
                        statusColor ="statusPperDatostx";
                        //cantCovid1++;
                      }
                      
                      var textStatustamizaje="";
                      var statusColortamizaje="";
                      if(item.covid_test==1 )
                      {
                          textStatustamizaje="Tamizaje Agendado";
                        statusColortamizaje ="text-success";

                        var textStatus="Pendiente por Tamizaje";
                        statusColor ="statusPperDatostx";

                        
                      }

                      if(item.covid_test==8)
                      {
                        var textStatus="Pendiente por alta médica";
                        statusColor ="statusPperDatostx";

                          textStatustamizaje="Pendiente por alta médica";
                        statusColortamizaje ="text-success";                          
                      }

                      if(item.covid_test==7)
                      {
                        var textStatus="Habilitado Indefinido";
                        statusColor ="statusPperCoursetx";

                        textStatustamizaje="Habilitado Indefinido";
                        statusColortamizaje ="text-success";
                        //cantCovid2++;
                      }

                      if(item.covid_test==2)
                      {
                          textStatustamizaje="Tamizaje Realizado";
                        statusColortamizaje ="statusPperProgtx";
                      }
                      if(item.covid_test==3)
                      {
                          textStatustamizaje="Tamizaje Vencido";
                          statusColortamizaje ="text-danger";
                          var textStatus="Tamizaje Vencido";
                          statusColor ="text-danger";

                      }
                      if(item.covid_test==4)
                      {
                          textStatustamizaje="Pendiente por Aprobación";
                        statusColortamizaje ="statusPperDatostx";

                        
                      }
                      if(item.covid_test==5)
                      {
                          textStatustamizaje="Tamizaje cancelado";
                        statusColortamizaje ="text-muted";

                        var textStatus="Tamizaje cancelado";
                          statusColor ="text-muted";
                      }
                      var tooltipVetado = '';
                      if(item.attribute5)
                        tooltipVetado = 'data-toggle="tooltip" data-placement="top" title="'+item.attribute5+'"';

                      
                      
                      var fecha = moment(item.entry_datetime).format('DD/MM/YYYY');

                      var row = {
                          name     : item.name
                          ,dni		 : item.identity_document  //
                          ,fecha    : fecha
                          //,colaborador     : item.is_collaborator?"Colaborador":"Contratista"
                          ,company	: toCapitalize(companys)
                          ,name_location     : toCapitalize(item.name_location)
                          ,area     : toCapitalize(area)
                          ,date		  : dateTamizaje=='01/01/0001'?'':dateTamizaje//toCapitalize(datec) 
                          ,action_type           :( getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=='ROL_ALLTASA'||getCookie("vtas_type_usergroup"+sessionStorage.tabVisitasa)=='colaborador' )&&flagModuleMedicoActive==0?('<div '+tooltipVetado+'><i class="fa fa-circle '+statusColortamizaje+'"></i><label style="margin-left:15px">'+textStatustamizaje+'</label></div>'):(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_MEDICAREA" ||getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_MEDICO"||flagModuleMedicoActive==1? '<div '+tooltipVetado+'><i class="fa fa-circle '+statusColor+'"></i><label style="margin-left:15px">'+textStatus+'</label></div>' :'' )                          
                          ,buttons  :item.status_request==0?'<button type="button" class="btn  text-danger" > <img src="images/iconos/cancelgray.svg" title="Ingreso Temporal Inhabilitado" ></button>':'<button type="button" class="btn  text-danger" onclick="vw_covid_list.cancelIngresoTemp('+item.id+',&quot;'+escape(item.name)+'&quot;)"> <img src="images/iconos/cancel.svg" title="Cancelar Ingreso Temporal" ></button>'
                          
                      }
                      i++;
                      data.push(row);
                  });
                  
                  return data;
              } 
          },//nombre, apellido, dni, empresa, fecha de solicitud y estatus
          columns: [
              { title:"Nombre y Apellido",data: "name",width: "16%",align:"left" ,"orderable": true   },
              { title:"Documento",data: "dni",align:"left","orderable": false},
              //{ title:"Tipo",data: "colaborador",align:"left" ,"orderable": false},
              { title:"Empresa",data: "company",align:"left" ,"orderable": false},
              { title:"Sede",data: "name_location",align:"left" ,"orderable": false},
              { title:"Área",data: "area",align:"left" ,"orderable": false},
              { title:"Fecha de Solicitud",data: "fecha",align:"left" ,"orderable": true},  
              { title:"Acción",data: "buttons",align:"left" ,"orderable": false}             
          ],  
          initComplete: function(settings, json) {
            ActiveEnterTemp = 0;
            $('[data-toggle="tooltip"]').tooltip();  
          }
      });
  }

  var cancelIngresoTemp = function(id, name){
    swal({
      title: "Cancelar ingreso temporal",
      text: "¿Seguro que desea cancelar la visita temporal de "+unescape(name)+"?",
      type: "info",
      showCancelButton: true,
      confirmButtonClass: "btn-danger btn-sm",
      confirmButtonText: "Si",
      cancelButtonText: "No",
      closeOnConfirm: true
    },
    function()
    {
      var url = apiurlaccessrequest+"/api/Post-AccessRequestTemp-All?code="+PostAccessRequestTempAll+"&httpmethod=cancel&id="+id;                   
      var headers ={
        "apikey":"r$3#23516ewew5"        
      }
      $.ajax({                    
          method: "POST",
          url:  url,
          //data : JSON.stringify(authorizedPersons),
          headers:headers,
          crossDomain: true,
          dataType: "json",
      }).done(function(data)
      {
        //console.log(data)
        if (data) 
        {
          //data.blacklist_id
          swal("Exito!", "Se ha cancelado satisfactoriamente", "success");
          tableMyRequestTemp();
        }else{
          swal("Error!", "No se ha podido actualizar la lista.", "error");
        }

      }).fail(function( jqXHR, textStatus, errorThrown ) {        
        showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
        console.log(errorThrown)
      });
    });
  }
var validatetemp = function()
  {    
     
      var arrayCheckCompanyOis = [];
      var authorizedPersons=[];
      var flag = 0;
      var validatefield="";
      var compamiesOid=[];

      $("#tb_tbody_covid_listtemp tr").each(function()
      { 
        leng++;
        var jsonCheckCompanyOis={};
        var partipante  = {}
        var values      = [];
        $(this).find('.form-control').each(function(){
          var value = $(this).val();
          values.push(value==""?-1:value);
        });

          var leng=$(this)[0].id.split('row_covidtemp_')[1];//se captura id de row, por si se ha borrado alguno intermedio
        //console.log(values) 
          if(values.length==10)
          {
            var typecontact   = values[0];
            var document      = values[1]
            var fullname      = values[2]; 
            var idColaborador = values[3];
            var ruc           = values[4];
            var name_company  = values[5];

            var companyArray  = values[2].split("-");
            var locationArray = values[6].split("-");
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
            var document      = values[1]
            var fullname      = values[2]; 
            var idColaborador =0;
            var ruc           =values[3];
            var name_company  = values[4];

            var companyArray  = values[4].split("-");
            var locationArray = values[5].split("-");
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
          else if(fullname.length<3)
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
        
          if(typecontact == 'colaborador' || ruc=='20100971772' || values[4].toLowerCase().trim() == "tasa" || values[4].toLowerCase().trim().includes("tasa") || values[5].toLowerCase().trim() == "tasa" || values[5].toLowerCase().trim().includes("tasa") )
          {
              var is_collaborator = 1;
              name_company='Tasa';
              ruc='20100971772';
              id_company=324;
          }
          else
              var is_collaborator = 0;
 
            //console.log(id_company,name_company,idColaborador,fullname,document,id_location,name_location,id_area,name_area,is_collaborator);

        /*   partipante ={
          id_user: 0
          ,name: toCapitalize(fullname)
          ,identity_document:document
          ,veto_status:0
          ,created_by: getCookie("vtas_id_hash"+sessionStorage.tabVisitasa)
          ,last_updated_by:getCookie("vtas_id_hash"+sessionStorage.tabVisitasa)
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
          ,name_company:toCapitalize(name_company)
          ,id_location:id_location
          ,name_location:name_location
          ,fecha:fecha
          ,responsableRequestEmail:$("#responsableRequestEmail").val()
          ,responsableRequest:$("#responsableRequest").val()
          ,responsableRequestId:$("#responsableRequestId").val()
          } */

          partipante={

                  "id_user":0,
                  "name":toCapitalize(fullname).trim(),
                  "type_document": "DNI",
                    created_by: getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
                    last_updated_by:getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
                    "identity_document":document.trim(),
                    "person_picture":"",
                    "last_record":1,
                    "is_collaborator":is_collaborator,
                    "status_request":1,
                    "id_area":id_area,
                    "name_area":name_area,
                    "id_location":id_location,
                    "name_location":name_location.trim(),
                    "id_company":id_company,
                    "name_company":toCapitalize(name_company).trim(),
                    "ruc": ruc,
                    "job":"Analista",
                    "responsible_user":$("#responsableRequestId").val(),
                    "responsible_name":$("#responsableRequest").val(),
                    "responsible_email":$("#responsableRequestEmail").val(),
                    "date_approves":fecha,
                    "entry_datetime":fecha,
                    "attribute1":"",
                    "attribute2":"",
                    "attribute3":"",
                    "attribute4":"",
                    "attribute5":""
                
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

    }
    else if(flag==1)
    {
      swal("No Registrado",validatefield, "error");
    }  
    else
    {
     

      if( $("#responsableRequest").val()=="")
      {
        swal("No Registrado","No se ha agregado el respondable", "error");
        return
      }
     
      swal({
        title: "Enviar Solicitud",
        text: "¿Seguro que desea enviar esta Solicitud de Tamizaje?",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn-danger btn-sm",
        confirmButtonText: "Si",
        cancelButtonText: "No",
        closeOnConfirm: true
      }
      ,
      function()
      {


        var url = apiurlaccessrequest+"/api/Post-AccessRequestTemp-All?code="+PostAccessRequestTempAll+"&httpmethod=post";
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
            tableMyRequestTemp();
            swal({
              title:"Solicitud",
              text: "Se ha realizado la solicitud satisfactoriamente",
              type: "success",
              showCancelButton: false,
              timer:2000,
              confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
              confirmButtonText: "De acuerdo",
              closeOnConfirm: false
            });

            $("#modalShowpersonAccessTemp").modal('hide')
            cancelarFormtemp();
            
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
  var valAltamedica = 0;
  var confirmGeneratePdfAltaMedica = function(val){    
    valAltamedica = val;
    $("#modalSelectDateAltaMedica").modal("show");  
    selectedFilterStatus(valAltamedica);
  }
  var generatePdfAltaMedica =function()
  {
    var id =$("#h_id_h").val();
    

    if(valAltamedica=="88")
    {
      exportPdfAlta();
    }
    if(valAltamedica=="888")
    {
      exportPdfAltaNop();
    }

    if(valAltamedica=="8888")
    {//si es historial, para los casos de programado y no programado, solo se gera el pdf
      exportPdfAltaHistorial();
      var date_init = $("#tx_date_init_pdf").val();
      var date_end  = $("#tx_date_end_pdf").val();
      var url       = apiurlaccessrequest+"/api/Post-CovidTestResult-all?code="+PostCovidTestResultall+"&httpmethod=putdatealatamedica&id="+id+"&date_init="+date_init+"&date_end="+date_end;
      $("#modalSelectDateAltaMedica").modal("hide");      
      var headers ={
        "apikey":"r$3#23516ewew5"        
      }
      $.ajax({                    
          method: "POST",
          url:  url,
          //data : JSON.stringify(authorizedPersons),
          headers:headers,
          crossDomain: true,
          dataType: "json",
      }).done(function(data){
        $("#modalSelectDateAltaMedica").modal("hide");  
      });
    }    
  }
  var closeModalTamizajeRiesgo=function()
  {
    $("#modalViewBlackCovidTest").modal("hide");
    $("#modalRegisterCovidTestNewForm").modal("hide");
    $("#modalRegisterBlackCovidTest").modal("hide");
    $("#modalnotifRiesgo").modal("hide");
    
  }
  
 
    return{
        init:function(){
            //getAreas();
            init();
            tableBlackList();
        },
        initColaborador:function(){          
            init();
            tableBlackList();
        },
        initTemp:function(){
          initTemp();
        },
        tableMyRequestTemp :function(){
          tableMyRequestTemp();
        },
        cancelIngresoTemp : function(id,name){
          cancelIngresoTemp(id,name);
        },
	    reloadtableBlackList:function(){
	      reloadtableBlackList();
      },
      addContacttemp:function(){
	      addContacttemp();
      },
      
      
      showData:function(id,status,name,company,img,reason,id_area,id_company,id_location,name_area,name_location,nameperson,document,job,check_in,covid_test,is_collaborator,fecha,temp1,temp2,attention_date,list_type){       
        showData(id,status,name,company,img,reason,id_area,id_company,id_location,name_area,name_location,nameperson,document,job,check_in,covid_test,is_collaborator,fecha,temp1,temp2,attention_date,list_type);
          },
	    thumbsUp:function(id,status,name,company,img,reason,id_area,id_company,id_location,name_area,name_location,nameperson,document,job,check_in,covid_test,is_collaborator,fecha,temperature_in,temperature_out,last_attention_date,ruc,last_veto_status,ch_evolucion, nacionalidad,ubigeo,direccion,email,sexo,fecha_nacimiento,tlf_celular,tlf_fijo,dato_familiar,tlf_contacto,biIdF00,type_document,list_type,is_natclar){
       //alert("Aquí "+ruc );
	      thumbsUp(id,status,name,company,img,reason,id_area,id_company,id_location,name_area,name_location,nameperson,document,job,check_in,covid_test,is_collaborator,fecha,temperature_in,temperature_out,last_attention_date,ruc,last_veto_status,ch_evolucion,nacionalidad,ubigeo,direccion,email,sexo,fecha_nacimiento,tlf_celular,tlf_fijo,dato_familiar,tlf_contacto,biIdF00,type_document,list_type,is_natclar);
	    },
	    validate:function(){
	    	validate();
      },
      validatetemp:function(){
	    	validatetemp();
      },
      refreshListCovid:function(){
	    	refreshListCovid();
      },
      thumbsUpregister:function(){
	    	thumbsUpregister();
      },
      addContact:function(EMPRESA,NOMBRE,APELLIDO,DOCUMENTO,SEDE,AREA,OCUPACION,FECHA,COMPANYID,RUC,TYPECONTACT){
        addContact(EMPRESA,NOMBRE,APELLIDO,DOCUMENTO,SEDE,AREA,OCUPACION,FECHA,COMPANYID,RUC,TYPECONTACT);
      },
      
      getDocument:function(){
	    	getDocument();
      },
      closFormCovid:function(id){
	    	closFormCovid(id);
      },
      cancelarForm:function(){
	    	cancelarForm();
      },
      cancelarFormtemp:function(){
	    	cancelarFormtemp();
      },
      selectedFilterStatusBl:function(){
        selectedFilterStatusBl();
      },
      confirmSaveCheckInCovid19:function(enter){
        confirmSaveCheckInCovid19(enter);
      },            
      confirmSolicitudTamizaje : function(){
        confirmSolicitudTamizaje();
      },
      confirmNoauthorizedCovid19 : function(enter,id){
        confirmNoauthorizedCovid19(enter,id);
      },
      confirmAuthorizedCovid19 : function(val){
        confirmAuthorizedCovid19(val);
      },
      
      initRegisterBlacklistCovidTest : function(){
        initRegisterBlacklistCovidTest();
      },
      registerBlacklistCovidTest : function(){
        registerBlacklistCovidTest();
      },
      showHistory:function(id){
        showHistory(id);

      },
      showFichaTamizaje:function(id,location,id_area, name_area,company_name,fullname,identity_document,job,temperature,antecedent,status_test_fast,status_test_molecular,status,note,veto_status,obj_vetado,id_blacklist_user,attention_date,id_reagent_type,is_collaborator,cb_fiebre,cb_dificulta_respiratoria,cb_tos_seca,cb_dolor_garganta,cb_congestion_nasal,cb_fatiga,cb_escalofrio,cb_nauseas_vomito,cb_diarrea,cb_dolor_cabeza,cb_dolor_musculo,fecha_inicio_sintoma,rb_concato_persona,cb_entorno_famiiar,cb_entorno_laborar,cb_entorno_salud,pais_visitado,fecha_retorno,rb_direfente_distrito,distrito_visitado,cb_obesidad,cb_enfemedad_pulmonar,cb_diabete,cb_impertension,cb_mayo_60,cb_nino,cb_gestante,cb_familiar_enfermedad,nro_personas,pregunta_1,pregunta_2,pregunta_3,pregunta_4,pregunta_5,pregunta_6,pregunta_7,ch_sospechoso,id_embarcacion,name_embarcacion,id_tipo_trabajo,name_tipo_trabajo,motivo_tamizaje,rb_pais_visitado,conclusion1,conclusion2,cb_adulto_mayor,cb_gestante_2,ch_evolucion,nacionalidad,actividad_economica,ubigeo,direccion,tlf_celular,tlf_fijo,dato_familiar,tlf_contacto,sexo,fecha_nacimiento,email,id_company,ruc,biIdF00,cod_anexo1_natclar,cod_anexo2_natclar,cod_anexo3_natclar,cod_anexo4_natclar,cod_anexo5_natclar,cod_paciente_natclar,kit_covid,sintomatologia, otro_motivo,lugar_contagio,covid_test, cb_examen_fisico,cb_otros,observacion_examen_fisico,observacion_otros,extension_reposo){
        showFichaTamizaje(id,location,id_area,name_area,company_name,fullname,identity_document,job,temperature,antecedent,status_test_fast,status_test_molecular,status,note,veto_status,obj_vetado,id_blacklist_user,attention_date,id_reagent_type,is_collaborator,cb_fiebre,cb_dificulta_respiratoria,cb_tos_seca,cb_dolor_garganta,cb_congestion_nasal,cb_fatiga,cb_escalofrio,cb_nauseas_vomito,cb_diarrea,cb_dolor_cabeza,cb_dolor_musculo,fecha_inicio_sintoma,rb_concato_persona,cb_entorno_famiiar,cb_entorno_laborar,cb_entorno_salud,pais_visitado,fecha_retorno,rb_direfente_distrito,distrito_visitado,cb_obesidad,cb_enfemedad_pulmonar,cb_diabete,cb_impertension,cb_mayo_60,cb_nino,cb_gestante,cb_familiar_enfermedad,nro_personas,pregunta_1,pregunta_2,pregunta_3,pregunta_4,pregunta_5,pregunta_6,pregunta_7,ch_sospechoso,id_embarcacion,name_embarcacion,id_tipo_trabajo,name_tipo_trabajo,motivo_tamizaje,rb_pais_visitado,conclusion1,conclusion2,cb_adulto_mayor,cb_gestante_2,ch_evolucion,nacionalidad,actividad_economica,ubigeo,direccion,tlf_celular,tlf_fijo,dato_familiar,tlf_contacto,sexo,fecha_nacimiento,email,id_company,ruc,biIdF00,cod_anexo1_natclar,cod_anexo2_natclar,cod_anexo3_natclar,cod_anexo4_natclar,cod_anexo5_natclar,cod_paciente_natclar,kit_covid,sintomatologia,otro_motivo,lugar_contagio,covid_test, cb_examen_fisico,cb_otros,observacion_examen_fisico,observacion_otros,extension_reposo);      
      },
      updateCovidTest: function(){
        updateCovidTest();
      },
      updateCovidTestNatClar:function(){
        updateCovidTestNatClar();
      },
      confirmCancelTamizaje:function(){
        confirmCancel();
      },
      registerBlacklistNew:function(){
        registerBlacklistNew();
      },
      getSignature:function(id){
        getSignature(id);
      },
      getSignaturenp:function(id){
        getSignaturenp(id);
      },
      downloadPdfAltaMedica:function(dni,neme,attention_date,date_end_alatmedica_pdf,date_ini_alatmedica_pdf,health_code_cmp){        
        exportPdfAltaBottonHistorial(dni,neme,attention_date,date_end_alatmedica_pdf,date_ini_alatmedica_pdf,health_code_cmp)
      },
      generatePdfAltaMedica:function(){
        generatePdfAltaMedica();
      },
      closeModalTamizajeRiesgo:function(){
        closeModalTamizajeRiesgo();
      },
      confirmGeneratePdfAltaMedica:function(val){
        confirmGeneratePdfAltaMedica(val);
      },
      actionPlus:function(id){
        actionPlus(id);
      }
    }
  }();




