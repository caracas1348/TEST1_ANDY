var jsonExternalCompany = [];
var jsonLocation=[];
var jsonPersonBlaclist = [];
var jsonPersonBlaclistName = [];
var oTableBlackList;
var oTableHistorytest;
var searchAct=0;//valida que se haya hecho busqueda
var lengList=1;
var lengListtemp=1;
var ActiveEnter=0;
var fecheTamg="";
var typeTamizajeOrign=0;
var lastattentiondate;
var imgSignatureglobal;
var imgSignatureglobalper;
var last_veto_statusg;
var typetablerrhh=1;


var fechanow = new Date();
var anonow = fechanow.getFullYear();


var vw_covid_rrhh = function(){
 
    var init = function()
    {
      typetablerrhh=1;
      moment.locale('es');
      ///cagamos todas las personas qiue están en la tabla blacklist_user
      getPersonBlackList();
     // getExternalCompany();
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

      $("#tx_date_starttemp_1").datetimepicker({
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

        $("#btShowTablerrhhtype1").removeClass("btn-white");
        $("#btShowTablerrhhtype1").attr("style","background-color: #05beee;color:#fff");
        $("#btShowTablerrhhtype2").attr("style","");
        $("#btShowTablerrhhtype2").addClass("btn-white");

        $("#btShowTablerrhhtype1").click(function(){
          $("#btShowTablerrhhtype1").removeClass("btn-white");
          $("#btShowTablerrhhtype1").attr("style","background-color: #05beee;color:#fff");
          $("#btShowTablerrhhtype2").attr("style","");
          $("#btShowTablerrhhtype2").addClass("btn-white");
          var option ='<option value="-1" selected="">Todos</option><option value="0">Pendientes</option> <option value="1">Enviados</option>';
          $("#sel_status").html(option);
        });
        
          $("#btShowTablerrhhtype2").click(function(){
          $("#btShowTablerrhhtype2").removeClass("btn-white");
          $("#btShowTablerrhhtype2").attr("style","background-color: #0eca98; color:#fff");
          $("#btShowTablerrhhtype1").attr("style","");
          $("#btShowTablerrhhtype1").addClass("btn-white");
          var option =` <option value="-1" selected="">Todos</option>
                        <option value="7">Alta Médica</option>
                        <option value="9">Fallecido</option>
                        <option value="2">Home office</option>                        
                        <option value="1">Pendiente convocatoria</option>
                        <option value="8">Pendiente por Alta Médica</option>
                        <option value="3">Reincorporó a labores</option>
                        <option value="5">Otros</option>
                        
                        ` ;
                        //<!--<option value="4">Fallecido </option>-->
          $("#sel_status").html(option);
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
        getCollaboratortemp($("#add_covid_firtnametemp_1"),1);
        $("#sel_company_1").change(function()
        {
          //$("#add_covid_dni_"+1).focus();
          getCollaborator($("#add_covid_firtname_1"),1); 
        });
        $("#sel_companytemp_1").change(function()
        {
          //$("#add_covid_dni_"+1).focus();
          getCollaboratortemp($("#add_covid_firtnametemp_1"),1); 
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
          }
          else{
            $("#col_observacion_vetado").hide();
            $("#tx_motivo_vetado").val("");
            $("#tx_chb_kit_covid").prop('checked', false);
            $("#div_chb_kit_covid").hide();
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
          }
          else{
            $("#col_observacion_vetado_history").hide();
            $("#tx_motivo_vetado_history").val("");
            $("#div_chb_kit_covid_history").hide();
            $("#txr_chb_kit_covid_history").prop('checked', false);
          }
        });

        $('#btn-group-habilitado-vetadotxr .btn').on('click', function(event) {     
          var val = $(this).find('input').val();
          //alert(val);      
          if(val==2){//vetado
            $("#col_observacion_vetadotxr").show();
            $("#div_chb_kit_covid_nop").show();
            $("#txr_chb_kit_covid_nop").prop('checked', false);
          }
          else{
            $("#col_observacion_vetadotxr").hide();
            $("#txr_motivo_vetado").val("");
            $("#div_chb_kit_covid_nop").hide();
            $("#txr_chb_kit_covid_nop").prop('checked', false);
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
          oTableBlackList.search('(SI)').draw(); 
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

      $("#tx_edad").datetimepicker({
        timepicker:false,
        format:'d/m/Y',
        maxDate:new Date()
      });

      $("#txr_tx_edad").datetimepicker({
        timepicker:false,
        format:'d/m/Y',
        maxDate:new Date()
      });

      
      $("#txr_edad_history").datetimepicker({
        timepicker:false,
        format:'d/m/Y',
        maxDate:new Date()
      });

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

      

      
    
      
        
        $("#add_covid_dni_1").blur(function(){
          var dni = $(this).val();

          if(dni.trim().length>0)
            checkOis(dni,1,$("#sel_type_contact_1").val());
            
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

      $("#bt_delete_row_covid_1").click(function()
      {
        var id  = 'row_covid_1';
        var obj = $("#"+id);
        removeRowCovid(obj);
        $("#cant_row_persona").html($("#list_participantes").find("div.bd-callout").length);
      });

      $("#bt_delete_row_covidtemp_1").click(function()
      {
        var id  = 'row_covidtemp_1';
        var obj = $("#"+id);
        removeRowCovid(obj);
        $("#cant_row_personatemp").html($("#list_participantestemp").find("div.bd-callout").length);
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
        console.log(val);
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


      
      ////------------------------------------------------------
      $('#chb_fiebre').click(function(){
        verificarConclusion();
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
      $('#chb_entorno_salud').click(function(){
        verificarConclusion();
      });       
      //----------------------------------------------------------      
      //----------------------------------------------------------
      //----------------------------------------------------------
      $('input:radio[name=rb_distrito]').click(function(){
        verificarConclusion();
      }); 

      
      
      //var tipoTrabajo         = $('#sel_tipo_trabajo').val();
      //----------------------------------------------------------
      //----------------------------------------------------------
      //factores de riesgos
      $('#chb_obesidad').click(function(){
        verificarConclusion();
      }); 
      $('#chb_enfermedad_pulmunar').click(function(){
        verificarConclusion();
      }); 
      $('#chb_diabete').click(function(){
        verificarConclusion();
      }); 
      $('#chb_impertension').click(function(){
        verificarConclusion();
      }); 
      $('#chb_mayor_60_ano').click(function(){
        verificarConclusion();
      }); 
      $('#chb_gestante').click(function(){
        verificarConclusion();
      });      
      $('#chb_adulto_mayor').click(function(){
        verificarConclusion();
      }); 
      $('#chb_nino').click(function(){
        verificarConclusion();
      }); 
      $('#chb_gestante_2').click(function(){
        verificarConclusion();
      }); 
      $('#chb_familiar_enfermedad_cronica').click(function(){
        verificarConclusion();
      });       
      //------------------------------------------------

      //------------------------------------------------
      $('#txr_chb_fiebre').click(function(){
        verificarConclusionNoProgramado();
      }); 
      $('#txr_chb_tos_seca').click(function(){
        verificarConclusionNoProgramado();
      });  
      $('#txr_chb_dificulta_respirar').click(function(){
        verificarConclusionNoProgramado();
      });  
      $('#txr_chb_dolor_garganta').click(function(){
        verificarConclusionNoProgramado();
      });  
      $('#txr_chb_congecion_nasal').click(function(){
        verificarConclusionNoProgramado();
      }); 
      $('#txr_chb_fatiga').click(function(){
        verificarConclusionNoProgramado();
      }); 
      $('#txr_chb_escalofrio').click(function(){
        verificarConclusionNoProgramado();
      });     
      $('#txr_chb_nauseas_vomito').click(function(){
        verificarConclusionNoProgramado();
      }); 
      $('#txr_chb_diarrea').click(function(){
        verificarConclusionNoProgramado();
      }); 
      $('#txr_chb_dolor_cabeza').click(function(){
        verificarConclusionNoProgramado();
      });
      $('#txr_chb_dolor_musculo').click(function(){
        verificarConclusionNoProgramado();
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
        verificarConclusionHistory();
      }); 
      $('#chbr_tos_seca_history').click(function(){
        verificarConclusionHistory();
      });
      $('#chbr_dificulta_respirar_history').click(function(){
        verificarConclusionHistory();
      });  
      $('#chbr_dolor_garganta_history').click(function(){
        verificarConclusionHistory();
      });  
      $('#chbr_congecion_nasal_history').click(function(){
        verificarConclusionHistory();
      }); 
      $('#chbr_fatiga_history').click(function(){
        verificarConclusionHistory();
      }); 
      $('#chbr_escalofrio_history').click(function(){
        verificarConclusionHistory();
      });     
      $('#chbr_nauseas_vomito_history').click(function(){
        verificarConclusionHistory();
      }); 
      $('#chbr_diarrea_history').click(function(){
        verificarConclusionHistory();
      }); 
      $('#chbr_dolor_cabeza_history').click(function(){
        verificarConclusionHistory();
      });
      $('#chbr_dolor_musculo_history').click(function(){
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

      $("#sel_estatus_alta").change(function(){
        if($(this).val()=="5")
          $("#div_otro_estatus").show();
        else{
          $("#div_otro_estatus").hide();
          $("#tx_otro_status_alta").val("");
        }
      });     
      
            
      $('#modalProcesarCarta').on('shown.bs.modal', function (e) {
        $("#tx_dete_process").val(moment().format("DD/MM/YYYY"));
        $("#tx_dete_process").datetimepicker({
          timepicker:false,
          format:'d/m/Y'
        });
        $("#btn_process_send_carta").click(function(){
          processSendCarta();
        });
      })
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
                           
    var thumbsUp = function(id,status,name,company_name,img,reason,id_area,id_company,id_location,name_area,name_location,nameperson,document,job,check_in,covid_test,is_collaborator,fecha,temperature_in,temperature_out,last_attention_date,ruc,last_veto_status,ch_evolucion,nacionalidad,ubigeo,direccion,email,sexo,fecha_nacimiento,tlf_celular,tlf_fijo,dato_familiar,tlf_contacto,biIdF00,type_document, id_status_alta_medica,start_date_altamedica,final_date_altamedica,name_status_alta_medica){
      //asignamos valores
      idEdit = id;
      //alert(id_status_alta_medica +" "+ start_date_altamedica +" "+ final_date_altamedica +" "+name_status_alta_medica);
      //var name_status_alta_medica = "";
      //alert(start_date_altamedica +" "+final_date_altamedica+" "+name_status_alta_medica);
      var date1 = "";
      var date2 = "";
      if(start_date_altamedica==null || start_date_altamedica=="null" || start_date_altamedica=="" || start_date_altamedica=="0001-01-01T00:00:00"){
        start_date_altamedica = "No aplica";
      }
      else{
        date1= moment(start_date_altamedica);
        start_date_altamedica = moment(start_date_altamedica).format("DD/MM/YYYY");
        
      }
      
      if(final_date_altamedica==null || final_date_altamedica=="null" || final_date_altamedica=="" || final_date_altamedica=="0001-01-01T00:00:00"){
        final_date_altamedica = "No aplica";
      } 
      else{
        date2 = moment(final_date_altamedica);
        final_date_altamedica = moment(final_date_altamedica).format("DD/MM/YYYY");
        
      }

      if(name_status_alta_medica==null || name_status_alta_medica=="null" || name_status_alta_medica==""){
        name_status_alta_medica ="Sin estatus";   
      }

      var diasVencidos="0";
      //alert(date1+" - "+date2);
      if(date2!="" && date1!=""){
        diasVencidos = date2.diff(date1, 'days');
      }

      $("#nombre_persona").text(name);
      $("#documento_persona").text(document);
      $("#hid_identity_document").val(document);
      $("#codsap_persona").html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Cargando...');
      
      $("#estatus_actual").text('');
      $("#sede_altamedica").text(name_location);
      $("#area_altamedica").text(name_area);      
      $("#fecha_inicio").text(start_date_altamedica);
      $("#fecha_fin").text(final_date_altamedica);
      $("#dias_vencidos").text(diasVencidos);     
      $("#estatus_actual").text(name_status_alta_medica);      
      $('#modalAcctionAltaMedica').modal('show');
      $("#sel_estatus_alta").val(id_status_alta_medica);
      
      $("#tx_fecha_inicio").datetimepicker({
        timepicker:false,
        format:'d/m/Y'
      });
      $("#tx_fecha_fin").datetimepicker({
        timepicker:false,
        format:'d/m/Y'
      });

      
      console.log(TOKEN_CLIENT);
      var param= {filter:document};
      var headers = {"Authorization":TOKEN_CLIENT,"apiKey":"r$3#23516ewew5"}
      $.ajax({
        url: apiurlsecurity+"/api/Get-Collaborator?code="+GetCollaborator+"&httpmethod=objectdni",
        dataType: "json",
        method:"post",
        data : JSON.stringify(param),
        processData:false,
        crossDomain: true,
        //async: true,
        headers : headers,
        success: function( data ) {
          $("#codsap_persona").html("");
          $("#codsap_persona").html(data.value[0].userSAPR3Id);
          $("#hid_codsap_persona").val(data.value[0].userSAPR3Id);
        }
      });
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
        console.log(data)   
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

  var selectLocation = function(obj,sede,filter,sat=false)
  {
    var option = "";
    //console.logobj  
    if(filter=="filter")
      option+="<option value='0'>Todos</option>";
    else
      option+="<option value='0'>Seleccione</option>";
  
    if(sat==false) {
      jsonLocation.map(function(item){
        if(item.flag_sede==true)
          option+="<option value='"+item.id+"-"+item.name+"'>"+item.name+"</option>";
      });
    }
    else if(sat==true){
      jsonLocation.map(function(item){
        if(item.id_location_sap>0)
          option+="<option value='"+item.id_location_sap+"'>"+item.name_location_sap+"</option>";
      });
    }
    
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
        title: "Ingreso Temporal",
        text: "¿Seguro que desea registrar este Ingreso Temporal?",
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

var 	getDocument = function()
{   
  
 
  var now = moment().format('YYYY-MM-DD');

               
 
 
  var dni          = $("#tx_finded").val(); 
  
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
  showLoading();
  var url         = apiurlblacklist+"/api/Get-Blacklist-User?httpmethod=objectlist&code="+getblacklistusercode+"&identity_document="+dni+"&list_type="+2;                
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
    
    if(data.length>0)
    {
        showData(data[0].id,data[0].veto_status,data[0].name,data[0].name_external_company,data[0].person_picture,data[0].reason,data[0].id_area,data[0].id_company,data[0].id_location,data[0].name_area,data[0].name_location,data[0].name,data[0].identity_document,data[0].job,data[0].check_in,data[0].covid_test,data[0].is_collaborator,null,data[0].temperature_in,data[0].temperature_out,data[0].last_attention_date,data[0].list_type)
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
var showTablerrhhtype=function(val)
{
  typetablerrhh=val;
  tableBlackList();

}
    var globalBlackLists=[];
    var tableBlackList = function(status=3)
    {   
     
var colm=[];
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
        var sede_sat = ActiveEnter==1?'0':$("#sel_sede_sap")[0]?$("#sel_sede_sap").val():0;
        var area    = ActiveEnter==1?'0':$("#sel_area")[0]?$("#sel_area").val():0;
        var desde   = ActiveEnter==1?'':$("#tx_date_init").val();
        var hasta   = ActiveEnter==1?'':$("#tx_date_end").val();                
        var search  =  ActiveEnter==0?'':"&search="+$("#tx_access_dni_list").val();//$("#tx_access_dni_list").val();
        //alert(typetablerrhh)
        var covid_test = 0;
        if(typetablerrhh==2)
          covid_test = 7;//se envia status indefinido si es reincorporacion

        var search_type = 1;
        if(flagModuleMedicoActive==0)
          var rol =getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa);
        else
          var rol='ROL_MEDICO';

        var now = moment().format('YYYY-MM-DD');
        var list_type = 2;//covid 19
        var url         = apiurlblacklist+"/api/Get-Blacklist-User?httpmethod=objectlistrrhh&code="+getblacklistusercode+"&list_type="+list_type+"&status="+estatus+"&type="+type+"&company="+company+"&sede="+sede+"&area="+area+"&date_init="+desde+"&date_end="+hasta+"&rol="+rol+search+"&search_type="+search_type+"&covid_test="+covid_test+"&sede_sat="+sede_sat;
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
                columns: [1,2,3,4,5,6,7,8,9]
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
                columns: [1,2,3,4,5,6,7,8,9]
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
                   
                    
                    var cont=0;
                    globalBlackLists=req;
                    var data =[];
                    var i = 1;
                   
                    req.map(function(item)
                    {
                      /* if(item.is_collaborator &&  item.last_veto_status==1 && (item.biIdF00 && item.biIdF00!=0)) //last_veto_status biIdF00
                      { */
                        cont++;

                     
                      
                        var accessTime  = moment(item.created_date).format('LT');
                        var week        = moment(item.created_date).format('ddd');//dddd
                        var month       = moment(item.created_date).format('MMMM');//
                        var day         = moment(item.created_date).format('D');
                        var startDate               = week +" "+day +" de "+ month;
                        var datec=startDate;
                        var dateTamizaje = getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_MEDICAREA" ||getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_MEDICO" || flagModuleMedicoActive==1?item.last_attention_date=='0001-01-01T00:00:00'?'':formatDateTime(item.last_attention_date,16,true,true):moment(item.last_attention_date).format('DD/MM/YYYY');

                        var dateSend = getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_MEDICAREA" ||getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_MEDICO" || flagModuleMedicoActive==1?item.date_send_card=='0001-01-01T00:00:00'?'':formatDateTime(item.date_send_card,16,true,true):moment(item.date_send_card).format('DD/MM/YYYY');
                        var area = item.name_area_sap?( item.name_area_sap?toCapitalize(item.name_area_sap):"No Asignado"):( item.name_area?toCapitalize(item.name_area):"No Asignado");
                        var companys=item.name_external_company?toCapitalize(item.name_external_company):'-';
                        var name="'"+toCapitalize(item.name)+"'";
                        var statusColor="";
                        

                        var action=""; 
                        var datAction='';
                        var hora = "";
                        var fecha ="";
                        var colorAction="";
                       

                        var functionedit=""
                        if(item.send_card==1) 
                        {
                            var img = "images/iconos/sendcarddisables.svg"; 
                        }
                        else
                        {
                            var img = "images/iconos/sendcard.svg";
                            functionedit=`onclick="vw_covid_rrhh.setSendCard('${item.id}')"` ;
                        }
                        var contagio="";
                        if(item.status_test_fast==1 || item.status_test_molecular==1)
                           contagio="Contagiado COVID";
                        else if(item.sintomatologia==2)
                           contagio="Sintomático";
                        else if(item.ch_sospechoso)
                          contagio="Sospechoso";
                          //item.id_status_alta_medica+',&quot;'+item.start_date_altamedica+'&quot;,&quot;'+item.final_date_altamedica+'&quot;,&quot;'+item.name_status_alta_medica+'&quot;

                         

                          if(item.start_date_altamedica)
                          {
                            var textStatus=item.name_status_alta_medica;
                            var statusColortamizaje ="statusPperProgtx";
                          }
                          else{
                              if(item.covid_test==8)
                              {
                                var textStatus="Pendiente por alta médica";
                                statusColor ="statusPperDatostx";
                          
                              }
                              if(item.covid_test==7)
                              {
                                var textStatus="Alta médica";
                                statusColor ="statusPperCoursetx";
                              }
                        }
  
                         
                        
                        //var status = item.name_status_alta_medica?item.name_status_alta_medica:(item.covid_test==7?'Habilitado Indefinido':'Pendiente por Alta Médica');

                        var dateInit = "";
                        var date1 = "";
                        var date2 = "";
                        if(item.start_date_altamedica!=null && item.start_date_altamedica!="" && item.start_date_altamedica!="0001-01-01T00:00:00"){
                          dateInit = moment(item.start_date_altamedica).format("DD/MM/YYYY");
                          date1   = moment(item.start_date_altamedica);
                        }                        
                        var dateEnd =   "";
                        if(item.final_date_altamedica!=null && item.final_date_altamedica!="" && item.final_date_altamedica!="0001-01-01T00:00:00"){
                          dateEnd = moment(item.final_date_altamedica).format("DD/MM/YYYY");
                          date2 = moment(item.final_date_altamedica);
                        }

                        
                        var diasVencidos="";
                        if(date2!="" && date1!=""){
                          diasVencidos = date2.diff(date1, 'days');
                        }
                        if(typetablerrhh==1){
                          var date    = new Date();
                          var dateBdd = moment(item.last_attention_date).add(-5,"hours").format('YYYY-MM-DD HH:mm:ss');                             
                          var time1   = moment(dateBdd,"YYYY-MM-DD HH:mm:ss");
                          var time2   = moment(date,"YYYY-MM-DD HH:mm:ss");
                          var ms      = time2.diff(time1);
                          diasVencidos =parseInt(moment.duration(ms).asDays());
                        }
                        if(typetablerrhh==2)//si es reincoporados
                        {

                          if((item.covid_test==7 || item.covid_test==8)&& !item.start_date_altamedica)
                          {
                            var date=new Date();
                            var dateBdd = moment(item.last_attention_date).add(-5,"hours").format('YYYY-MM-DD HH:mm:ss');                             
                            var time1   = moment(dateBdd,"YYYY-MM-DD HH:mm:ss");
                            var time2   = moment(date,"YYYY-MM-DD HH:mm:ss");
                            var ms      = time2.diff(time1);
                            diasVencidos =parseInt(moment.duration(ms).asDays());
                          }
                          else{

                            var date=new Date();
                            var dateBdd = moment(item.start_date_altamedica).add(-5,"hours").format('YYYY-MM-DD HH:mm:ss');                             
                            var time1   = moment(dateBdd,"YYYY-MM-DD HH:mm:ss");
                            var time2   = moment(date,"YYYY-MM-DD HH:mm:ss");
                            var ms      = time2.diff(time1);
                            diasVencidos =parseInt(moment.duration(ms).asDays());

                            var dateTamizaje = getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_MEDICAREA" ||getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_MEDICO" || flagModuleMedicoActive==1?item.start_date_altamedica=='0001-01-01T00:00:00'?'':formatDateTime(item.start_date_altamedica,16,true,true):moment(item.start_date_altamedica).format('DD/MM/YYYY');
                            
                          }
                          
                        }
                                                 
                        var buttomDetail= moduleExam?'<img height="24" src="images/iconos/newExam.svg">':'<i class="material-icons btdetail" style="cursor:pointer " >more_vert</i>' 
                        
                        if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_MEDICAREA" ||getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_MEDICO" || flagModuleMedicoActive==1)
                        {
                          //var namecol=item.covid_test==1 || item.covid_test==8 ?'<div style="cursor:pointer" class="hoverItem" onclick="vw_covid_list.thumbsUp('+item.id+','+item.last_veto_status+','+name+',&quot;'+item.name_external_company+'&quot;,&quot;'+img+'&quot;,&quot;'+item.reason+'&quot;,'+item.id_area+','+item.id_company+','+item.id_location+',&quot;'+item.name_area+'&quot;,&quot;'+item.name_location+'&quot;,&quot;'+toCapitalize(item.name)+'&quot;,&quot;'+item.identity_document+'&quot;,&quot;'+item.job+'&quot;,'+item.check_in+' ,'+item.covid_test+','+item.is_collaborator+',&quot;'+item.created_date+'&quot;,&quot;'+item.temperature_in+'&quot;,&quot;'+item.temperature_out+'&quot;,&quot;'+item.last_attention_date+'&quot;,&quot;'+item.ruc+'&quot;,&quot;'+item.last_veto_status+'&quot;,&quot;'+item.ch_evolucion+'&quot;,&quot;'+item.nacionalidad+'&quot;,&quot;'+item.ubigeo+'&quot;,&quot;'+item.direccion+'&quot;,&quot;'+item.email+'&quot;,&quot;'+item.sexo+'&quot;,&quot;'+item.fecha_nacimiento+'&quot;,&quot;'+item.tlf_celular+'&quot;,&quot;'+item.tlf_fijo+'&quot;,&quot;'+item.dato_familiar+'&quot;,&quot;'+item.tlf_contacto+'&quot;,'+item.biIdF00+',&quot;'+item.type_document+'&quot;);" >'+(toCapitalize(getCleanedString(item.name)))+'</div>' :'<div style="cursor:pointer" class="hoverItem" onclick="vw_covid_list.showHistory('+item.id+');" >'+(toCapitalize(getCleanedString(item.name)))+'</div>' ;
                          var namecol='<div style="cursor:pointer" class="hoverItem" onclick="vw_covid_list.thumbsUp('+item.id+','+item.last_veto_status+','+name+',&quot;'+item.name_external_company+'&quot;,&quot;'+img+'&quot;,&quot;'+item.reason+'&quot;,'+item.id_area+','+item.id_company+','+item.id_location+',&quot;'+item.name_area+'&quot;,&quot;'+item.name_location+'&quot;,&quot;'+toCapitalize(item.name)+'&quot;,&quot;'+item.identity_document+'&quot;,&quot;'+item.job+'&quot;,'+item.check_in+' ,'+item.covid_test+','+item.is_collaborator+',&quot;'+item.created_date+'&quot;,&quot;'+item.temperature_in+'&quot;,&quot;'+item.temperature_out+'&quot;,&quot;'+item.last_attention_date+'&quot;,&quot;'+item.ruc+'&quot;,&quot;'+item.last_veto_status+'&quot;,&quot;'+item.ch_evolucion+'&quot;,&quot;'+item.nacionalidad+'&quot;,&quot;'+item.ubigeo+'&quot;,&quot;'+item.direccion+'&quot;,&quot;'+item.email+'&quot;,&quot;'+item.sexo+'&quot;,&quot;'+item.fecha_nacimiento+'&quot;,&quot;'+item.tlf_celular+'&quot;,&quot;'+item.tlf_fijo+'&quot;,&quot;'+item.dato_familiar+'&quot;,&quot;'+item.tlf_contacto+'&quot;,'+item.biIdF00+',&quot;'+item.type_document+'&quot;);" >'+(toCapitalize(getCleanedString(item.name)))+'</div>';
                        }
                        else
                          var namecol='<div style="cursor:pointer" class="hoverItem" onclick="vw_covid_list.thumbsUp('+item.id+','+item.last_veto_status+','+name+',&quot;'+item.name_external_company+'&quot;,&quot;'+img+'&quot;,&quot;'+item.reason+'&quot;,'+item.id_area+','+item.id_company+','+item.id_location+',&quot;'+item.name_area+'&quot;,&quot;'+item.name_location+'&quot;,&quot;'+toCapitalize(item.name)+'&quot;,&quot;'+item.identity_document+'&quot;,&quot;'+item.job+'&quot;,'+item.check_in+' ,'+item.covid_test+','+item.is_collaborator+',&quot;'+item.created_date+'&quot;,&quot;'+item.temperature_in+'&quot;,&quot;'+item.temperature_out+'&quot;,&quot;'+item.last_attention_date+'&quot;,&quot;'+item.ruc+'&quot;,&quot;'+item.last_veto_status+'&quot;,&quot;'+item.ch_evolucion+'&quot;,&quot;'+item.nacionalidad+'&quot;,&quot;'+item.ubigeo+'&quot;,&quot;'+item.direccion+'&quot;,&quot;'+item.email+'&quot;,&quot;'+item.sexo+'&quot;,&quot;'+item.fecha_nacimiento+'&quot;,&quot;'+item.tlf_celular+'&quot;,&quot;'+item.tlf_fijo+'&quot;,&quot;'+item.dato_familiar+'&quot;,&quot;'+item.tlf_contacto+'&quot;,'+item.biIdF00+',&quot;'+item.type_document+'&quot;);" >'+(toCapitalize(getCleanedString(item.name)))+'</div>' ;
                      
                        var daysRest = item.days_rest;
                        if(daysRest==null || daysRest==0){
                          if(item.status_test_fast==1 || item.status_test_molecular==1) //contagiado, le damos 14 días
                            daysRest = 14;
                          else if(item.ch_sospechoso==true)//Sospechoso, le damos 7 días
                            daysRest = 7;
                          else
                            daysRest = 14;
                        }
                          var fechaReincor = moment(item.last_attention_date).add(daysRest,"days").format('DD/MM/YYYY');
                          var row = {
                            icon      : ""//` <img class="pl-2" src="${img}" height="18" style="cursor:pointer" ${functionedit}>` 
                            ,name     : namecol
                            ,dni		  : item.identity_document  //
                            ,fecha    : fecha
                            ,hora     : hora
                            ,Restriccion:item.dias_restriccion?item.dias_restriccion:''
                            ,Diagnostico		  : contagio  //
                            ,Estatus : '<div ><i class="fa fa-circle '+statusColor+'"></i><label style="margin-left:15px">'+textStatus+'</label></div>'
                            ,registro : getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_COVIDSEGURIDAD"? `<div class="${colorAction}">${action}</div> `:''
                            ,name_location     : toCapitalize(item.name_location)
                            ,name_location_sap     :item.name_location_sap?(toCapitalize(item.name_location_sap)):'No Asignada'
                            ,area     : toCapitalize(area)
                            ,date		  : dateTamizaje=='01/01/0001'?'':dateTamizaje//toCapitalize(datec)
                            ,dater		  : fechaReincor//toCapitalize(datec)
                            ,dateInit : dateInit
                            ,dateEnd : dateEnd
                            ,diasVencidos:diasVencidos
                            ,diasReposo : daysRest
                            ,date_send: dateSend=='01/01/0001'?'':dateSend//toCapitalize(datec) 
                            ,action_type           :item.send_card==1?'<div><i class="fa fa-circle text-success "></i><label style="margin-left:15px">Enviado</label></div>':'<div><i class="fa fa-circle text-danger "></i><label style="margin-left:15px">Pendiente</label></div>'                      
                            //,buttons  :!moduleExam?'<button type="button" class="btn " onclick="vw_covid_list.thumbsUp('+item.id+','+item.veto_status+','+name+',&quot;'+item.name_external_company+'&quot;,&quot;'+img+'&quot;,&quot;'+item.reason+'&quot;,'+item.id_area+','+item.id_company+','+item.id_location+',&quot;'+item.name_area+'&quot;,&quot;'+item.name_location+'&quot;,&quot;'+toCapitalize(item.name)+'&quot;,&quot;'+item.identity_document+'&quot;,&quot;'+item.job+'&quot;,'+item.check_in+','+item.covid_test+','+item.is_collaborator+',&quot;'+item.created_date+'&quot;,&quot;'+item.temperature_in+'&quot;,&quot;'+item.temperature_out+'&quot,&quot;'+item.last_attention_date+'&quot;,&quot;'+item.last_attention_date+'&quot;,&quot;'+item.ruc+'&quot;,&quot;'+item.nacionalidad+'&quot;,&quot;'+item.ubigeo+'&quot;,&quot;'+item.direccion+'&quot;,&quot;'+item.email+'&quot;,&quot;'+item.sexo+'&quot;,&quot;'+item.fecha_nacimiento+'&quot;,&quot;'+item.tlf_celular+'&quot;,&quot;'+item.tlf_fijo+'&quot;,&quot;'+item.dato_familiar+'&quot;,&quot;'+item.tlf_contacto+'&quot;,'+item.biIdF00+',&quot;'+item.type_document+'&quot;);">'+buttomDetail+'</button>': (item.covid_test==2)?'':'<button type="button" class="btn " onclick="vw_covid_list.thumbsUp('+item.id+','+item.veto_status+','+name+',&quot;'+item.name_external_company+'&quot;,&quot;'+img+'&quot;,&quot;'+item.reason+'&quot;,'+item.id_area+','+item.id_company+','+item.id_location+',&quot;'+item.name_area+'&quot;,&quot;'+item.name_location+'&quot;,&quot;'+toCapitalize(item.name)+'&quot;,&quot;'+item.identity_document+'&quot;,&quot;'+item.job+'&quot;, '+item.check_in+','+item.covid_test+','+item.is_collaborator+',&quot;'+item.created_date+'&quot;,&quot;'+item.temperature_in+'&quot;,&quot;'+item.temperature_out+'&quot;,&quot;'+item.last_attention_date+'&quot;,&quot;'+item.ruc+'&quot;,&quot;'+item.nacionalidad+'&quot;,&quot;'+item.ubigeo+'&quot;,&quot;'+item.direccion+'&quot;,&quot;'+item.email+'&quot;,&quot;'+item.sexo+'&quot;,&quot;'+item.fecha_nacimiento+'&quot;,&quot;'+item.tlf_celular+'&quot;,&quot;'+item.tlf_fijo+'&quot;,&quot;'+item.dato_familiar+'&quot;,&quot;'+item.tlf_contacto+'&quot;,'+item.biIdF00+',&quot;'+item.type_document+'&quot;);">'+buttomDetail+'</button>'
                            ,acction  :item.covid_test==8?'':'<button type="button" class="btn " onclick="vw_covid_rrhh.thumbsUp('+item.id+','+item.veto_status+','+name+',&quot;'+item.name_external_company+'&quot;,&quot;'+img+'&quot;,&quot;'+item.reason+'&quot;,'+item.id_area+','+item.id_company+','+item.id_location+',&quot;'+item.name_area+'&quot;,&quot;'+item.name_location+'&quot;,&quot;'+toCapitalize(item.name)+'&quot;,&quot;'+item.identity_document+'&quot;,&quot;'+item.job+'&quot;,'+item.check_in+','+item.covid_test+','+item.is_collaborator+',&quot;'+item.created_date+'&quot;,&quot;'+item.temperature_in+'&quot;,&quot;'+item.temperature_out+'&quot,&quot;'+item.last_attention_date+'&quot;,&quot;'+item.ruc+'&quot;,'+item.last_veto_status+','+item.ch_evolucion+',&quot;'+item.nacionalidad+'&quot;,&quot;'+item.ubigeo+'&quot;,&quot;'+item.direccion+'&quot;,&quot;'+item.email+'&quot;,&quot;'+item.sexo+'&quot;,&quot;'+item.fecha_nacimiento+'&quot;,&quot;'+item.tlf_celular+'&quot;,&quot;'+item.tlf_fijo+'&quot;,&quot;'+item.dato_familiar+'&quot;,&quot;'+item.tlf_contacto+'&quot;,'+item.biIdF00+',&quot;'+item.type_document+'&quot;,'+item.id_status_alta_medica+',&quot;'+item.start_date_altamedica+'&quot;,&quot;'+item.final_date_altamedica+'&quot;,&quot;'+item.name_status_alta_medica+'&quot;);">'+buttomDetail+'</button>' 
                            ,detail   :item.covid_test==2?'':'<div data-toggle="modal" data-target="#modalShowRequestDetails" ><i class="material-icons btdetail" style="cursor:pointer " >more_vert</i></div>'
                            ,history   :'<button class="btn " onclick="vw_covid_rrhh.showHistory('+item.id+',&quot;'+item.identity_document+'&quot;)"> <img height="24" src="images/iconos/reporthistory.svg"> </button>'
                        }

                        
                        i++;
                        data.push(row);
                      
                    });
                    $("#cantTotalCovid19").text(cont)
                    return data;
                } 
            },//nombre, apellido, dni, empresa, fecha de solicitud y estatus
            
            "dias_restriccion": 2,

              columns: 
                  [
        
                    { title:"Nombre y Apellido",data: "name",width: "16%",align:"left"   },
                    { title:"Documento",data: "dni",align:"left","orderable": false},
                    { title:"Sede de Diagnóstico",data: "name_location",align:"left" ,"orderable": false},
                    { title:"Unidad Operativa",data: "name_location_sap",align:"left" ,"orderable": false},
                    { title:"Área",data: "area",align:"left" ,"orderable": false},
                   // { title:typetablerrhh==1?"":"Días de Restricción",data: typetablerrhh==1?"":"Restriccion", width:  typetablerrhh==1?"1%":"10%" ,align:"center","orderable": false},
                    { title:typetablerrhh==1?"Diagnóstico":"Estatus",data: typetablerrhh==1?"Diagnostico":"Estatus", width:  typetablerrhh==1?"15%":"20%" ,align:"left"},
                    { title:typetablerrhh==2?'Fecha de inicio':"Fecha de Diagnóstico",data: "date",width:  "15%",align:"left" ,"orderable": false },
                    { title:typetablerrhh==1?'Fecha Notificada de Reincorporación':"",data: typetablerrhh==1?"dater":'', width:  typetablerrhh==1?"15%":"0",align:"left" ,"orderable": false },
                    { title:typetablerrhh==1?"":"Días Transcurridos",data: typetablerrhh==1?"":"diasVencidos", width:  typetablerrhh==1?"0":"20%",align:"left","orderable": false },
                    { title:typetablerrhh==1?"Días de Reposo":"",data: typetablerrhh==1?"diasReposo":"",align:"left","orderable": false, width: typetablerrhh==1?"10%":"0%"},
                    { title:typetablerrhh==1?"Estatus":"",data: typetablerrhh==1?"action_type":"",width:  typetablerrhh==1?"15%":"1%",align:"left","orderable": false},
                    { title:typetablerrhh==1?"Fecha de Envío":"",data: typetablerrhh==1?"date_send":"",width:  typetablerrhh==1?"15%":"1%",align:"left" ,"orderable": false },
                   /*  { title:typetablerrhh==1?"":"Historial",data: typetablerrhh==1?"":"historial",width: typetablerrhh==1?"0%":"5%",align:"left" ,"orderable": false }, */
                   { title:typetablerrhh==1?"":"Acciones" ,data: typetablerrhh==1?"icon":"acction", targets: 0,align:"center" ,"orderable": false ,width: "2%" },//Procesar Carta
                    { title:typetablerrhh==1?"":"Historial" ,data: typetablerrhh==1?"":"history", targets: 0,align:"center" ,"orderable": false ,width: typetablerrhh==1?"0%":"3%" },
                  ]
                
            
             
          ,
            initComplete: function(settings, json) {
            $('[data-toggle="tooltip"]').tooltip();  
            }
        });

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
    var idEdit;
    var statusEdit;
    var nameEdit;
    var area;
    var company;
    var location;
   
   

    var setSendCard = function(val)
    {
      $('#modalProcesarCarta').modal("show");
      $("#hid_id_process").val(val);
      console.log(val);
      //$("#exampleModalCenter").show();
     
      return;
      swal({
        title: "Procesar Carta",
        text: "¿Está seguro que desea marcar como carta Procesada?",        
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn-danger btn-sm",
        confirmButtonText: "Si",
        cancelButtonText: "No",
        closeOnConfirm: true
      },
      function(){    

        /*  var data = {
          responsible : getCookie('vtas_id'+sessionStorage.tabVisitasa);
        }  */
     
              $("#splashLoading").show();
                var url = apiurlblacklist+"/api/Post-Blacklist-User?code="+postblacklistusercode+"&httpmethod=sendcard&id="+val+"&responsible="+getCookie('vtas_id'+sessionStorage.tabVisitasa);                   
                var headers ={
                    "apikey":"r$3#23516ewew5"        
                }
                $.ajax({                    
                    method: "POST",
                    url:  url,
                    headers:headers,
                    //data : JSON.stringify(data),
                    crossDomain: true,
                    dataType: "json",
                }).done(function( data)
                {                
                                      
                        swal({
                          title: "Éxito",
                          text: "Carta Procesada con éxito",
                          type: "success",
                          timer:3000,
                          showCancelButton: false,
                          confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
                          confirmButtonText: "De acuerdo",
                          closeOnConfirm: false
                        });
                       
                        tableBlackList();
                        $("#splashLoading").hide();
      
                    
                }).fail( function( jqXHR, textStatus, errorThrown ) {
                  setTimeout(function(){
                    //$("#splashLoading").fadeOut();
                  },500);
                });
    
      
      });
      
    }

    var processSendCarta =  function(){
      var val   = $("#hid_id_process").val();
      var date  = $("#tx_dete_process").val();
      $('#modalProcesarCarta').modal("hide");
      $("#splashLoading").show();
      var url = apiurlblacklist+"/api/Post-Blacklist-User?code="+postblacklistusercode+"&httpmethod=sendcard&id="+val+"&responsible="+getCookie('vtas_id'+sessionStorage.tabVisitasa)+"&date="+date;                   
      var headers ={
          "apikey":"r$3#23516ewew5"        
      }
      $.ajax({                    
          method: "POST",
          url:  url,
          headers:headers,
          //data : JSON.stringify(data),
          crossDomain: true,
          dataType: "json",
      }).done(function( data)
      {                
                            
              swal({
                title: "Éxito",
                text: "Carta Procesada con éxito",
                type: "success",
                //timer:3000,
                showCancelButton: false,
                confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
                confirmButtonText: "De acuerdo",
                closeOnConfirm: false
              });
              
              tableBlackList();
              $("#splashLoading").hide();
             
          
      }).fail( function( jqXHR, textStatus, errorThrown ) {
        setTimeout(function(){
          //$("#splashLoading").fadeOut();
        },500);
      });
    }



    
    var saveCheckInCovid19 = function(id,enter,temp){ 
      //return;

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
     /*alert(id+"  -- "+enter+" --- "+$("#hid_action_type").val());
     if(!$("#hid_action_type").val())action=0;
     else action = 1;*/
     location=getCookie("vtas_sede"+sessionStorage.tabVisitasa);
     var param         = "&id="+id+"&enter="+enter+"&temperature="+temperature+"&location="+location+"&area="+area+"&action="+action+"&created_by="+created_by+"&identity_document="+identity_document;     
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
        //swal("Operación exitosa", "Proceso realizado con exito", "success");
        $("#modalNonAuthorized").modal("hide");
        swal.close();
          /*   setTimeout(function(){
              swal("Exito!", "Operación satisfactoria.", "success");
            },500) */
            if( $("#headerFormCovid")[0])
            $("#headerFormCovid").css({background:'#039be0'})

            if(!$("#hid_mobile_temp")[0])
            {
               tableBlackList();
            }
            else{

              $("#butRequesExam").hide();
              $("#temperatureUSer").show();
              handlerUrlhtml('contentGlobal','view/covidSecuryMobile.html');

            }
        $("#modalEditBlacklist").modal("hide");
      });  
    }

    var verificarConclusion = function(){
     
      //---------------------------------------------------
    //-------------------FORMATO NUEVO-------------------
      //alert("ssssssssss");     
      
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
      var conclusion1 = "";
      var conclusion2 = "";
      var encuestaFoo = 0;
      var chEvolucion = 0; 
      conclusion1 = "Caso no sospechoso";
      selectedFilterStatus(7);
     
      if(cant_sintomas>=2 && (rbContactoPersona.val()=='si' || rbFueraPais.val()=='si' || rbDiferenteDistrito.val()=='si')){
        //rbContactoPersona
        conclusion1 = "Caso Sospechoso";
        encuestaFoo = 1;

        selectedFilterStatus(8);
        
      } 
      /*
      if(cant_sintomas<2 && (rbContactoPersona.val()=='no' || rbFueraPais.val()=='no' || rbDiferenteDistrito.val()=='no')){
        //rbContactoPersona
        console.log("Coclusión 1 - Caso no Sospechoso");
        conclusion1 = "Caso no sospechoso";
        encuestaFoo = 0;
      } */

      //console.log((store_sintomas_total+store_factor_riesgo));
      if((store_sintomas_total+store_factor_riesgo) >=1 && (store_sintomas_total+store_factor_riesgo)<=8){
        conclusion2 ="Baja Posibilidad de evolución no favorable";
        chEvolucion = 0;
      }
      if((store_sintomas_total+store_factor_riesgo) >=9){
        conclusion2 ="Alta Posibilidad de evolución no favorable";
        chEvolucion=1;
        selectedFilterStatus(8);
      }

      $("#conlcusion1result").text(conclusion1?conclusion1:'Sin Resultado');//se coloca en resultado
      $("#conlcusion2result").text(conclusion2?conclusion2:'Sin Resultado');//se coloca en resultado

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
            "vcCompania": companyname,// "20431080002",
            "vcContrata": companyname,//"20431080002",
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
      var conclusion1 = "";
      var conclusion2 = "";
      var encuestaFoo = 0;
      var chEvolucion = 0; 
      conclusion1 = "Caso no sospechoso";
      selectedFilterStatus(9);
      console.log(cant_sintomas,rbContactoPersona.val(),rbFueraPais.val(),rbDiferenteDistrito.val());
      if(cant_sintomas>=2 && (rbContactoPersona.val()=='si' || rbFueraPais.val()=='si' || rbDiferenteDistrito.val()=='si')){
        //rbContactoPersona
        conclusion1 = "Caso Sospechoso";
        encuestaFoo = 1;
        selectedFilterStatus(10);
        
      } 
      /*
      if(cant_sintomas<2 && (rbContactoPersona.val()=='no' || rbFueraPais.val()=='no' || rbDiferenteDistrito.val()=='no')){
        //rbContactoPersona
        console.log("Coclusión 1 - Caso no Sospechoso");
        conclusion1 = "Caso no sospechoso";
        encuestaFoo = 0;
      } */

      //console.log((store_sintomas_total+store_factor_riesgo));
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
          "vcObservacion": tx_resultado          
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
          "vcObservacion": tx_resultado          
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
          "vcObservacion": tx_resultado//""
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
          "vcObservacion": tx_resultado//""
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
            "vcObservacion": tx_resultado          
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
            "vcObservacion": tx_resultado          
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
            "vcObservacion": tx_resultado          
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
            "vcObservacion": tx_resultado          
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
          "vcObservacion": tx_resultado//""
        }
        array_eventos_send.push("cod_anexo4_natclar");
      }
      else if(sel_statusmolec =="0"){
        evento4 = {
          "biIdHistoria": 0,
          "descripcionEvento": "4",//TEMPERATURA
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "5",//NEGATIVO MOLECULAR
          "vcSintomatologia": "2",
          "vcResultado": "NEGATIVO MOLECULAR",
          "vcObservacion": tx_resultado//""
        }
        array_eventos_send.push("cod_anexo4_natclar");
      }
      else if(sel_statusmolec =="2"){
        evento4 = {
          "biIdHistoria": 0,
          "descripcionEvento": "4",//TEMPERATURA
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "14",//PENDIENTE MOLECULAR
          "vcSintomatologia": "2",
          "vcResultado": "PENDIENTE MOLECULAR",
          "vcObservacion": tx_resultado//""
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
            
      var json = {
        "dtEnvio": fechaNow,
        "pacientes": 
        [
          {
            "tipoDocumento": "DNI",
            "dniPaciente": identityDocument,
            "dFechaNacimiento": $("#txr_tx_edad").val(),
            "vcSexo": sexo,//"M",
            "vcCompania": ruc_company,// "20431080002",
            "vcContrata": ruc_company,//"20431080002",
            "vcUnidad": sede,//"0062",
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
            "vcTipoTrabajo": tipoTrabajo,
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
      console.log(json);
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
      var conclusion1 = "";
      var conclusion2 = "";
      var encuestaFoo = 0;
      var chEvolucion = 0; 
      conclusion1 = "Caso no sospechoso";
      selectedFilterStatus(11);
      console.log(cant_sintomas,rbContactoPersona.val(),rbFueraPais.val(),rbDiferenteDistrito.val());
      if(cant_sintomas>=2 && (rbContactoPersona.val()=='si' || rbFueraPais.val()=='si' || rbDiferenteDistrito.val()=='si')){
        //rbContactoPersona
        conclusion1 = "Caso Sospechoso";
        encuestaFoo = 1;
        selectedFilterStatus(12);
        
      } 
      /*
      if(cant_sintomas<2 && (rbContactoPersona.val()=='no' || rbFueraPais.val()=='no' || rbDiferenteDistrito.val()=='no')){
        //rbContactoPersona
        console.log("Coclusión 1 - Caso no Sospechoso");
        conclusion1 = "Caso no sospechoso";
        encuestaFoo = 0;
      } */

      //console.log((store_sintomas_total+store_factor_riesgo));
      if((store_sintomas_total+store_factor_riesgo) >=1 && (store_sintomas_total+store_factor_riesgo)<=8){
        conclusion2 ="Baja Posibilidad de evolución no favorable";
        chEvolucion = 0;
      }
      if((store_sintomas_total+store_factor_riesgo) >=9){
        conclusion2 ="Alta Posibilidad de evolución no favorable";
        chEvolucion=1;
        selectedFilterStatus(12);
      }

      $("#conlcusion1result_history").text(conclusion1?conclusion1:'Sin Resultado');//se coloca en resultado
      $("#conlcusion2result_history").text(conclusion2?conclusion2:'Sin Resultado');//se coloca en resultado
    }

    var thumbsUpUpdate = function(){
    
      var identity_document = $("#hid_identity_document").val();
      var sap               = $("#hid_codsap_persona").val();
      var id_estatus_alta   = $("#sel_estatus_alta").val();
      var name_estatus_alta = $("#sel_estatus_alta option:selected").text();
      var fecha_inicio    = $("#tx_fecha_inicio").val();  //moment().format("DD/MM/YYYY");
      var fecha_fin       = moment().format("DD/MM/YYYY");//$("#tx_fecha_fin").val();
      var created_by      = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
      var last_updated_by = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
      var otroStatus      = $("#tx_otro_status_alta").val();
      var error           = 0;
      var message         = "";
      if(id_estatus_alta == '0'){
        error = 1;
        message = "Debes seleccionar el status";
      }
      else if(fecha_inicio.trim().length==0){
        error = 1;
        message = "Debes introducir la fecha inicio";
      }
      else if(fecha_fin.trim().length==0){
        error = 1;
        message = "Debes introducir la fecha final";
      }
      else if(otroStatus.trim().length==0 && id_estatus_alta=="5"){
        error = 1;
        message = "Debes introducir el estatus";
      }
      
      if(error == 1)
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
        title:"Actualización",
        text:"¿Seguro que desea actualizar los datos alta médica?",
        type:"info",
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
        },100);
        var url = apiurlblacklist+"/api/Post-Blacklist-User?code="+postblacklistusercode+"&httpmethod=postaltamedica&id="+idEdit;
        
        var body = { 
          "identity_document":identity_document,
          "sap":sap,
          "id_status_alta_medica":id_estatus_alta,     
          "other_status":otroStatus,           
          "name_status_alta_medica":name_estatus_alta,
          "start_date":fecha_inicio,
          "final_date":fecha_fin,
          "created_by":created_by,
          "last_updated_by": last_updated_by
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
                title: "Registro",
                text:'Operación satisfactoria.',
                type: "success",
                timer:3000,
                showCancelButton: false,
                confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
                confirmButtonText: "De acuerdo",
                closeOnConfirm: false
              });

             
            },500);
            tableBlackList();
            $("#modalAcctionAltaMedica").modal("hide");
          }
        });
      });
    }

    var thumbsUpregister = function(){    
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

      //-----------------------------------------------------------
      if(companyname.trim()=="0-tasa" || companyname.trim()=="tasa" || companyname.trim()=="Tasa" || companyname.trim()=="TASA")
      var is_collaborator = 1;
      else
      var is_collaborator = 0;

      console.log(location);
      console.log(id_area);
      console.log(company);

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
      var conclusion1 = "";
      var conclusion2 = "";
      var encuestaFoo = 0;
      var chEvolucion = 0;
      conclusion1     = "Caso no sospechoso";
      if(cant_sintomas>=2 && (rbContactoPersona.val()=='si' || rbFueraPais.val()=='si' || rbDiferenteDistrito.val()=='si')){
        //rbContactoPersona
        conclusion1 = "Caso Sospechoso";
        encuestaFoo = 1;
        
      } 
      /*if(cant_sintomas<2 && (rbContactoPersona.val()=='no' || rbFueraPais.val()=='no' || rbDiferenteDistrito.val()=='no')){
        //rbContactoPersona
        console.log("Coclusión 1 - Caso no Sospechoso");
        conclusion1 = "Caso no sospechoso";
        encuestaFoo = 0;
      } */
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
          "vcObservacion": tx_resultado          
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
          "vcObservacion": tx_resultado          
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
          "vcObservacion": tx_resultado//""
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
          "vcObservacion": tx_resultado//""
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
            "vcObservacion": tx_resultado          
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
            "vcObservacion": tx_resultado          
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
            "vcObservacion": tx_resultado          
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
            "vcObservacion": tx_resultado          
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
          "vcObservacion": tx_resultado//""
        }
        array_eventos_send.push("cod_anexo4_natclar");
      }
      else if(sel_statusmolec =="0"){
        evento4 = {
          "biIdHistoria": 0,
          "descripcionEvento": "4",//TEMPERATURA
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "5",//NEGATIVO MOLECULAR
          "vcSintomatologia": "2",
          "vcResultado": "NEGATIVO MOLECULAR",
          "vcObservacion": tx_resultado//""
        }
        array_eventos_send.push("cod_anexo4_natclar");
      }
      else if(sel_statusmolec =="2"){
        evento4 = {
          "biIdHistoria": 0,
          "descripcionEvento": "4",//TEMPERATURA
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "14",//PENDIENTE MOLECULAR
          "vcSintomatologia": "2",
          "vcResultado": "PENDIENTE MOLECULAR",
          "vcObservacion": tx_resultado//""
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
      var distritoVistadoText = $( "#sel_distrito option:selected" ).text();
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
            "vcUnidad": sede,//"0062",
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
            "vcTipoTrabajo": tipoTrabajo,
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
      console.log(json);
      //alert("sssss");
      //return;
      //console.log(conclusion1);    
      //console.log(conclusion2);
      //console.log(json);
      //console.log(JSON.stringify(json));

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
     else if(tipoTrabajo=="")
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
     else if(motivo=="0")
     {flag=1;    validatefield= "Debe ingresarle Motivo ";}
     else if(tx_temperatura.trim().length==0)
     {flag=1;    validatefield= "Debe ingresar la Temperatura";}
     else if(sexo=="0")
     {flag=1;    validatefield= "Debe Seleccionar el Sexo";}
     /*else if(fechaNacimiento.trim().length==0)
     {flag=1;    validatefield= "Debe ingresar la Fecha de Nacimiento";}*/
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
            "cb_kit_covid":kitCovid.is(":checked")
        }
      }
        var headers ={
            "apikey":"r$3#23516ewew5"        
        }
        console.log(body);
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

      }
      if($("#txr_company_name")[0])//form registro de persona existente
      {
          $("#txr_company_name").val("");
         // $("#selr_area").val(0);
          $("#selr_local").text(0);
          $("#txr_conlcusion1result").text("Resultado:...");
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
        
        //alert("stop");
        jsonLocation=[];
        data.map(function(item){
          jsonLocation.push(item);               
        });  
         
        selectLocation("#sel_sede",null,'filter');
        selectLocation("#sel_location_1");
        selectLocation("#sel_locationtemp_1");
        selectLocation("#sel_sede_sap",null,'filter',true);
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
        $("#add_covid_dni_1").val(DOCUMENTO);
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
                    <input type="text" maxlength="10" onkeyup="validaSoloNumeros(this.id)" class="form-control" id="add_covid_dni_${leng}" value="${DOCUMENTO?DOCUMENTO:''}">                                                   
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
                  if(dni.trim().length>0)
                    checkOis(dni,leng,$("#sel_type_contact_"+leng).val());
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

    var showHistory = function(id,identity_document){      
      idEdit            = id;
      //tb_test_covid_history
      if(oTableHistorytest){
        oTableHistorytest.clear().draw();
        oTableHistorytest.destroy();
      }
      //$("#divtb_test_covid_history").hide();
      $("#modalTableHistoryReincorporacion").modal("show");
      var id_blacklist_user = id;
      var httpmethod        = "objectlistaltamedicalog";
      var url               = apiurlblacklist+"/api/Get-Blacklist-User?code="+getblacklistusercode+"&httpmethod="+httpmethod+"&search_type=1&id_blacklist_user="+id_blacklist_user+"&identity_document="+identity_document;
      var headers ={
          "apikey":"r$3#23516ewew5"        
      } 
          
      oTableHistorytest = $('#tb_reincorporacion_history').DataTable({
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
              hideLoading();
              var data =[];
              var i = 0;
              console.log(req)
              //$("#tb_test_covid_history").fadeIn();
              req.map(function(item)
              {
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
                  //


                  var start_date = moment(item.start_date).format("DD/MM/YYYY");
                  var row = {
                      startdate : start_date
                      ,status :toCapitalize(item.name_status_alta_medica)
                      ,fecha           : toCapitalize(datec)//attention 
                      ,time		  : time  //
                      ,fechac           : toCapitalize(datecc)//attention 
                      ,timec		  : timec  //
                      ,antecedent		  : item.antecedent  //
                      ,ficha          : ficha
                      ,test_fast      : test_fast
                      ,test_molecular : test_molecular
                      ,temperature    : item.temperature
                      ,vetado         : vetado                      
                      ,doctor         : item.name_doctor
                      //,tamizaje       : `<button class="btn " onclick="vw_covid_list.showFichaTamizaje(${item.id},'${item.id_location}',${item.id_area},'${item.name_area}','${item.name_company}','${item.fullname}','${item.identity_document}','${item.job}','${item.temperature}','${escape(item.antecedent)}',${item.status_test_fast},'${item.status_test_molecular}','${item.status}','${escape(item.note)}',${item.veto_status},'${escape(item.attribute5)}',${item.id_blacklist_user},'${item.attention_date}',${item.id_reagent_type},${item.is_collaborator},${item.cb_fiebre},${item.cb_dificulta_respiratoria},${item.cb_tos_seca},${item.cb_dolor_garganta},${item.cb_congestion_nasal},${item.cb_fatiga},${item.cb_escalofrio},${item.cb_nauseas_vomito},${item.cb_diarrea},${item.cb_dolor_cabeza},${item.cb_dolor_musculo},'${item.fecha_inicio_sintoma}',${item.rb_concato_persona},${item.cb_entorno_famiiar},${item.cb_entorno_laborar},${item.cb_entorno_salud},'${item.pais_visitado}','${item.fecha_retorno}',${item.rb_direfente_distrito},'${item.distrito_visitado}',${item.cb_obesidad},${item.cb_enfemedad_pulmonar},${item.cb_diabete},${item.cb_impertension},${item.cb_mayo_60},${item.cb_nino},${item.cb_gestante},${item.cb_familiar_enfermedad},'${item.nro_personas}','${item.pregunta_1}','${item.pregunta_2}','${item.pregunta_3}','${item.pregunta_4}','${item.pregunta_5}','${item.pregunta_6}','${item.pregunta_7}',${item.ch_sospechoso},${item.id_embarcacion},'${item.name_embarcacion}',${item.id_tipo_trabajo},'${item.name_tipo_trabajo}',${item.motivo_tamizaje},${item.rb_pais_visitado},'${item.conclusion1}','${item.conclusion2}',${item.cb_adulto_mayor},${item.cb_gestante_2},${item.ch_evolucion},'${item.nacionalidad}','${item.actividad_economica}','${item.ubigeo}','${item.direccion}','${item.tlf_celular}','${item.tlf_fijo}','${item.dato_familiar}','${item.tlf_contacto}','${item.sexo}','${item.fecha_nacimiento}','${item.email}',${item.id_company},'${item.RUC}',${item.biIdF00}, ${item.cod_anexo1_natclar},${item.cod_anexo2_natclar},${item.cod_anexo3_natclar},${item.cod_anexo4_natclar},${item.cod_anexo5_natclar},${item.cod_paciente_natclar},${item.kit_covid})">  <img height="24" src="images/iconos/newExam.svg"> </button>`
                  }//item.covid_test==2?'':
                  i++;
                  data.push(row);
                  $("#textPAchist").text(toCapitalize(item.fullname));
              });
              $("#divtb_test_covid_history").fadeIn();
              return data;
            }
        },//nombre, apellido, dni, empresa, fecha de solicitud y estatus
        columns: [
          { title:"Fecha de Registro",data: "fechac",width: "15%",align:"left"   },
          { title:"Hora",data: "timec",width: "7%",align:"left","orderable": false},
          { title:"Fecha de Inicio",data: "startdate",width: "15%",align:"left"   },
          { title:"Estatus",data: "status",width: "7%",align:"left","orderable": false}
            
           /*
            { title:"Ficha",data: "ficha",width: "12%",align:"left" ,"orderable": false},
            { title:"Prueba rápida",data: "test_fast",width: "12%",align:"left" ,"orderable": false},
            { title:"Prueba molecular",data: "test_molecular",width: "12%",align:"left" ,"orderable": false},
            { title:"Estatus",data: "vetado",width: "17%",align:"left" ,"orderable": false},
            { title:"Doctor",data: "doctor",width: "17%",align:"left" ,"orderable": false},
            { title:"Tamizaje",data: "tamizaje",width: "8%",align:"left" ,"orderable": false}         */  
        ],
      });    
    }
    
    var showFichaTamizaje=function(id,location,id_area,name_area,company_name,fullname,identity_document,job,temperature,antecedent,status_test_fast,status_test_molecular,status,note,veto_status,obs_vetado,id_blacklist_user,attention_date,id_reagent_type,is_collaborator,cb_fiebre,cb_dificulta_respiratoria,cb_tos_seca,cb_dolor_garganta,cb_congestion_nasal,cb_fatiga,cb_escalofrio,cb_nauseas_vomito,cb_diarrea,cb_dolor_cabeza,cb_dolor_musculo,fecha_inicio_sintoma,rb_concato_persona,cb_entorno_famiiar,cb_entorno_laborar,cb_entorno_salud,pais_visitado,fecha_retorno,rb_direfente_distrito,distrito_visitado,cb_obesidad,cb_enfemedad_pulmonar,cb_diabete,cb_impertension,cb_mayo_60,cb_nino,cb_gestante,cb_familiar_enfermedad,nro_personas,pregunta_1,pregunta_2,pregunta_3,pregunta_4,pregunta_5,pregunta_6,pregunta_7,ch_sospechoso,id_embarcacion,name_embarcacion,id_tipo_trabajo,name_tipo_trabajo,motivo_tamizaje,rb_pais_visitado,conclusion1,conclusion2,cb_adulto_mayor,cb_gestante_2,ch_evolucion,nacionalidad,actividad_economica,ubigeo,direccion,tlf_celular,tlf_fijo,dato_familiar,tlf_contacto,sexo,fecha_nacimiento,email,id_company,ruc,biIdF00,cod_anexo1_natclar,cod_anexo2_natclar,cod_anexo3_natclar,cod_anexo4_natclar,cod_anexo5_natclar,cod_paciente_natclar,kit_covid)
    {    
      
      //alert(ruc);
      //console.log(biIdF00);
      //$("#txr_edad_history").val();
      $("#txr_fecha_inicio_sintomas_history").val();
      $("#txr_fecha_retorno_history").val();
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
      })

      $("#selr_statusmolec_history").change(function(){
        
        verifyStatus(3);

      })

      if(is_collaborator==1)
        $("#txr_empleador_history").val('colaborador')
      else
      $("#txr_empleador_history").val('contratista')
      //alert(id_area+" - "+name_area);
      var optionArea = '<option value="'+id_area+'">'+name_area+'</option>';
      //alert(optionArea);
      $("#hid_attention_date").val(attention_date);
      var now = moment(attention_date).format('DD/MM/YYYY');
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
      $('#txr_fecha_history').val(now);
      $("#selr_area_history").html(optionArea);
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
      $("#txr_direccion_res_history").val(direccion);
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

      if(nro_personas!=null){$("#txr_cant_persona_history").val(nro_personas);}

      if (conclusion1!=null && conclusion1!='null') {$("#conlcusion1result_history").text(conclusion1);}
      else{$("#conlcusion1result_history").text("Sin Observación");}

      if (conclusion2!=null && conclusion2!='null') {$("#conlcusion2result_history").text(conclusion2);}
      else{$("#conlcusion2result_history").text("Sin Observación");}
      
      console.log(conclusion1,conclusion2)
      
      //alert(veto_status);
      if(veto_status==0)
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
      else if(veto_status==7){
        statusmed = 88;
        $("#label_status_list_9_history").removeClass("active");
        $("#label_status_list_10_history").removeClass("active");
        $("#label_altamedica_88_historial").addClass("statusPperProg");
        $("#label_altamedica_88_historial").addClass("text-white");
        $("#label_altamedica_88_historial").addClass("active");
        $("#label_altamedica_88_historial").show();
        $("#col_observacion_vetado_history").hide();
        //$("#txr_motivo_vetado_history").val(unescape(obs_vetado));
        selectedFilterStatus(8888);//8        
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
    }

    var updateCovidTest = function(){
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

      console.log(attention_date);
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
      var cod_anexo1_natclar  = $("#hid_cod_anexo1_natclar").val();
      var cod_anexo2_natclar  = $("#hid_cod_anexo2_natclar").val();
      var cod_anexo3_natclar  = $("#hid_cod_anexo3_natclar").val();
      var cod_anexo4_natclar  = $("#hid_cod_anexo4_natclar").val();
      //------------------------------------------------------------

      var sel_reagent = $("#selr_reagent_history").val(); 
      //alert(sel_reagent);
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
      else if(tipoTrabajo=="")
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
      else if(motivo=="0")
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
        var conclusion1 = "";
        var conclusion2 = "";
        var encuestaFoo = 0;
        var chEvolucion = 0;
        conclusion1 = "Caso no sospechoso";
        encuestaFoo = 0;
        if(cant_sintomas>=2 && (rbContactoPersona.val()=='si' || rbFueraPais.val()=='si' || rbDiferenteDistrito.val()=='si')){
          //rbContactoPersona
          conclusion1 = "Caso Sospechoso";
          encuestaFoo = 1;
          
        } 
        /*if(cant_sintomas<2 && (rbContactoPersona.val()=='no' || rbFueraPais.val()=='no' || rbDiferenteDistrito.val()=='no')){
          //rbContactoPersona
          console.log("Coclusión 1 - Caso no Sospechoso");
          conclusion1 = "Caso no sospechoso";
          encuestaFoo = 0;
        } */
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
          "vcObservacion": tx_resultado          
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
          "vcObservacion": tx_resultado          
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
          "vcObservacion": tx_resultado//""
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
          "vcObservacion": tx_resultado//""
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
            "vcObservacion": tx_resultado          
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
            "vcObservacion": tx_resultado          
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
            "vcObservacion": tx_resultado          
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
            "vcObservacion": tx_resultado          
        }
        array_eventos_send.push("cod_anexo3_natclar");
      }

      if(sel_statusmolec =="1"){
        evento4 = {
          "biIdHistoria": cod_anexo4_natclar,
          "descripcionEvento": "4",//TEMPERATURA
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "4",//POSITIVO MOLECULAR
          "vcSintomatologia": "2",
          "vcResultado": "POSITIVO MOLECULAR",
          "vcObservacion": tx_resultado//""
        }
        array_eventos_send.push("cod_anexo4_natclar");
      }
      else if(sel_statusmolec =="0"){
        evento4 = {
          "biIdHistoria": cod_anexo4_natclar,
          "descripcionEvento": "4",//TEMPERATURA
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "5",//NEGATIVO MOLECULAR
          "vcSintomatologia": "2",
          "vcResultado": "NEGATIVO MOLECULAR",
          "vcObservacion": tx_resultado//""
        }
        array_eventos_send.push("cod_anexo4_natclar");
      }
      else if(sel_statusmolec =="2"){
        evento4 = {
          "biIdHistoria": cod_anexo4_natclar,
          "descripcionEvento": "4",//TEMPERATURA
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "14",//PENDIENTE MOLECULAR
          "vcSintomatologia": "2",
          "vcResultado": "PENDIENTE MOLECULAR",
          "vcObservacion": tx_resultado//""
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
              "vcCompania": ruc_company,// "20431080002",
              "vcContrata": ruc_company,//"20431080002",
              "vcUnidad": sede,//"0062",
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
              "vcTipoTrabajo": tipoTrabajo,
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

              if (data.id) 
              {
                swal.close();
                setTimeout(function(){
                  swal("Exito!", "Operación satisfactoria.", "success");
                },500)
              
                  vw_black_list.reloadtableBlackList(tableBlackList());

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

      console.log(attention_date);
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
      else if(tipoTrabajo=="")
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
        var conclusion1 = "";
        var conclusion2 = "";
        var encuestaFoo = 0;
        var chEvolucion = 0;
        conclusion1 = "Caso no sospechoso";
        encuestaFoo = 0;
        if(cant_sintomas>=2 && (rbContactoPersona.val()=='si' || rbFueraPais.val()=='si' || rbDiferenteDistrito.val()=='si')){
          //rbContactoPersona
          conclusion1 = "Caso Sospechoso";
          encuestaFoo = 1;
          
        } 
        /*if(cant_sintomas<2 && (rbContactoPersona.val()=='no' || rbFueraPais.val()=='no' || rbDiferenteDistrito.val()=='no')){
          //rbContactoPersona
          console.log("Coclusión 1 - Caso no Sospechoso");
          conclusion1 = "Caso no sospechoso";
          encuestaFoo = 0;
        } */
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
        
      var attention_date_natclar = $("#hid_attention_date").val();
      attention_date_natclar = moment(attention_date_natclar).format("YYYY-MM-DD hh:mm:ss");
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
          "vcObservacion": tx_resultado          
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
          "vcObservacion": tx_resultado          
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
          "vcObservacion": tx_resultado//""
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
          "vcObservacion": tx_resultado//""
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
            "vcObservacion": tx_resultado          
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
            "vcObservacion": tx_resultado          
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
            "vcObservacion": tx_resultado
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
            "vcObservacion": tx_resultado          
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
          "vcObservacion": tx_resultado//""
        }
        array_eventos_send.push("cod_anexo4_natclar");
      }
      else if(sel_statusmolec =="0"){
        evento4 = {
          "biIdHistoria": 0,//cod_anexo4_natclar,
          "descripcionEvento": "4",//TEMPERATURA
          "dtEvento": attention_date_natclar,//fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "5",//NEGATIVO MOLECULAR
          "vcSintomatologia": "2",
          "vcResultado": "NEGATIVO MOLECULAR",
          "vcObservacion": tx_resultado//""
        }
        array_eventos_send.push("cod_anexo4_natclar");
      }
      else if(sel_statusmolec =="2"){
        evento4 = {
          "biIdHistoria": 0,//cod_anexo4_natclar,
          "descripcionEvento": "4",//TEMPERATURA
          "dtEvento": attention_date_natclar,//fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "14",//PENDIENTE MOLECULAR
          "vcSintomatologia": "2",
          "vcResultado": "PENDIENTE MOLECULAR",
          "vcObservacion": tx_resultado//""
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
          "dtEnvio": attention_date_natclar,//fechaNow,
          "pacientes": 
          [
            {
              "tipoDocumento": "DNI",
              "dniPaciente": identityDocument,
              "dFechaNacimiento": $("#txr_edad_history").val(),
              "vcSexo": sexo,//"M",
              "vcCompania": ruc_company,// "20431080002",
              "vcContrata": ruc_company,//"20431080002",
              "vcUnidad": sede,//"0062",
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
              "vcTipoTrabajo": tipoTrabajo,
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
      $("#validationsIdOiidtemp_"+i).removeClass("text-danger");
      $("#validationsIdOiidtemp_"+i).addClass("text-white");
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
                  if(dni.trim().length>0)
                    checkOis(dni,1,$("#sel_type_contact_1").val());
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
                  if(dni.trim().length>0)
                    checkOis(dni,1,$("#sel_type_contact_1").val());
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
                  <td>
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
                    <small class="text-white"  id="validationsIdOiidtemp_1" style="font-size: 11px;">OIS Autorizado</small>                                                  
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
      var now = moment().format('DD/MM/YYYY');
      $("#txr_fecha").datetimepicker({
          defaultDate: now,
          timepicker:false,
          format:'d/m/Y',
          maxDate:now
      });
      $('#txr_fecha').val(now);
      //alert(now);
      $('#tx_date_tamizajenop').val(now);
    getLocationsR($("#selr_local"));
   // getAreasR();
    selectExternalCompanyNewExam($("#txr_company_name"),$("#txr_company_id"),$("#txr_nomape"),$("#txr_ocupacion"),$("#h_colaborator_id"),$("#txr_company_ruc"),0,0);
   /*  $("#selr_local").change(function(){
      getAreasR($(this).val());
    }) */

      $("#selr_statusrap").change(function(){
        if ($(this).val()==1) {$(".reagent").show()}else{$(".reagent").hide()}
        verifyStatus(2);
      })

      $("#selr_statusmolec").change(function(){
        verifyStatus(2);
      })
    }
    var registerBlacklistCovidTest = function()
    {      
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


      var hhmm = moment().add(0, 'hours').format('HH:mm:ss');
      attention_date=attention_date+' '+hhmm;
     
      attention_date = moment(attention_date,"DD/MM/YYYY HH:mm:ss").add(5, 'hours').format('YYYY-MM-DD HH:mm:ss');//moment(attention_date,'DD/MM/YYYY').format('MM/DD/YYYY');
      
      
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
      var conclusion1 = "";
      var conclusion2 = "";
      var encuestaFoo = 0;
      var chEvolucion = 0;
      conclusion1 = "Caso no sospechoso";
      encuestaFoo = 0;
      if(cant_sintomas>=2 && (rbContactoPersona.val()=='si' || rbFueraPais.val()=='si' || rbDiferenteDistrito.val()=='si'))
      {
        //rbContactoPersona
        conclusion1 = "Caso Sospechoso";
        encuestaFoo = 1;
        
      }
      /*if(cant_sintomas<2 && (rbContactoPersona.val()=='no' || rbFueraPais.val()=='no' || rbDiferenteDistrito.val()=='no')){
        //rbContactoPersona
        console.log("Coclusión 1 - Caso no Sospechoso");
        conclusion1 = "Caso no sospechoso";
        encuestaFoo = 0;
      } */
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
          "vcObservacion": tx_resultado          
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
          "vcObservacion": tx_resultado          
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
          "vcObservacion": tx_resultado//""
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
          "vcObservacion": tx_resultado//""
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
            "vcObservacion": tx_resultado          
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
            "vcObservacion": tx_resultado          
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
            "vcObservacion": tx_resultado          
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
            "vcObservacion": tx_resultado          
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
          "vcObservacion": tx_resultado//""
        }
        array_eventos_send.push("cod_anexo4_natclar");
      }
      else if(sel_statusmolec =="0"){
        evento4 = {
          "biIdHistoria": 0,
          "descripcionEvento": "4",//TEMPERATURA
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "5",//NEGATIVO MOLECULAR
          "vcSintomatologia": "2",
          "vcResultado": "NEGATIVO MOLECULAR",
          "vcObservacion": tx_resultado//""
        }
        array_eventos_send.push("cod_anexo4_natclar");
      }
      else if(sel_statusmolec =="2"){
        evento4 = {
          "biIdHistoria": 0,
          "descripcionEvento": "4",//TEMPERATURA
          "dtEvento": fechaNow,
          "vcMotivo": motivo,
          "vcOrigen": "VISI-TASA",
          "iIdEstadoPaciente": "14",//PENDIENTE MOLECULAR
          "vcSintomatologia": "2",
          "vcResultado": "PENDIENTE MOLECULAR",
          "vcObservacion": tx_resultado//""
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
            "vcCompania": ruc_company,// "20431080002",
            "vcContrata": ruc_company,//"20431080002",
            "vcUnidad": sede,//"0062",
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
            "vcTipoTrabajo": tipoTrabajo,
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
        else if(tipoTrabajo=="")
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
        else if(motivo=="0")
        {flag=1;    validatefield= "Debe ingresarle Motivo ";}
        else if(tx_temperatura.trim().length==0)
        {flag=1;    validatefield= "Debe ingresar la Temperatura";}
        else if(sexo=="0")
        {flag=1;    validatefield= "Debe Seleccionar el Sexo";}
        /*else if(fechaNacimiento.trim().length==0)
        {flag=1;    validatefield= "Debe ingresar la Fecha de Nacimiento";}*/
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
        title:"Registro Exámen",
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
          if (data.id) 
          {
            swal.close();
            setTimeout(function(){
              swal("Exito!", "Operación satisfactoria.", "success");
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
            $("#txr_docum").val(ui.item.dni);
            $("#txr_nomape").focus();
              $("#txr_nomape").val(ui.item.firstname);      
              ui.item.biIdF00 = ui.item.biIdF00!=null && ui.item.biIdF00!="null" && ui.item.biIdF00!=""?ui.item.biIdF00:0;
            $("#hid_biIdF00").val(ui.item.biIdF00);

           /* setTimeout(function(){
              
            },300);*/
            
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
        //console.log(data)
        if(data.veto_status==true || data.veto_status==1){
          if(data.list_type==1)
            vetado = 1;
          if(data.list_type==2)
            vetado = 2;
        }

      });      
      return vetado;
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
              $("#validationsIdOiid_"+leng).text(dni+", En Lista de Riesgo. ");
              $("#add_covid_firtname_"+leng).val(toCapitalize(dataRiesgo[0].name));
              $("#add_covid_dni_"+leng).val("");  
              $("#div_message_req").html('<i class="fa fa-circle text-danger" style="height: 30px important!;"></i><label style="margin-left:15px">No se puede realizar solicitudes de Tamizaje para estos usuarios. Motivo: En Lista De Riesgo</label>');            
              return;
            }
   //checking ois
   if(typepesron=="contratista")//solo para contratistas
   {         
      
            
      
      //var url         = apiurlsecurity+"/api/Get-OIS?code="+GetOIS+"&httpmethod=object&dni="+dni;  
      var url          = apiurlaccessregistries+"/api/Get-OIS?code="+GetOIS+"&httpmethod=object&dni="+dni.trim();            
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


    var verifiqueBlacklisOis = function(dni, name)
    { 
     
     dni=dni.trim() 
      var now=new Date();

      var nowdesde=`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} 00:00`;
      var nowhasta=`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} 23:59`;

      $("#span_notification").html('Validando... Espere');    
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

      $("#span_notification").text("");
      $("#headerFormCovid").css({background:'#039be0'})
     
      if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_COVIDSEGURIDAD" || getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_SEGURIDAD" || getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_GARITA" || getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)=="ROL_ALLTASA" ||  getCookie("vtas_type_usergroup"+sessionStorage.tabVisitasa)=="colaborador"  )//si es seguridad no se muestra solicitud de tamizaje
      {
        if(dni.trim().length==0)
        {
          $(".butEditBlack").show();
          notification = '<div><i class="fa fa-circle text-danger" style="height: 30px important!;"></i><label style="margin-left:15px">Complete y actualice el documento de identidad</label></div>';
          $("#span_notification").html(notification);
          $("#btnSolicitudTamizaje").hide();
          $("#headerFormCovid").css({background:'#f44336'});
          return;
        }
  
          $("#span_notification").text("");
          var check_in_out  = $("#hid_check_in_out").val();   
          var empresa       = $("#hid_name_company").val().toLowerCase(); 

            $("#btnValidateIn").hide();
            $("#span_notification").html("Validando.... Espere.");            
            //chek persona de riesgo
            var dataRiesgo = checkRiskList(dni);
            if(dataRiesgo.length>0)
            {
              notification = '<div><i class="fa fa-circle text-danger" style="height: 30px important!;"></i><label style="margin-left:15px">No se pueden solicitar Tamizajes para este Usuario. En Lista De Riesgo</label></div>';              
              $("#span_notification").html(notification);
              $("#btnValidateIn").hide();
              $("#headerFormCovid").css({background:'#f44336'});              
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
              $("#span_notification").html(notification);
              $("#btnValidateIn").hide();
              $("#headerFormCovid").css({background:'#f44336'});

              
              return;
            }
            else if(vetado==2)
            {
             
              notification = '<div><i class="fa fa-circle text-danger" style="height: 30px important!;"></i><label style="margin-left:15px">Usuario vetado</label></div>';
              $("#span_notification").html(notification);
              $("#btnValidateIn").hide();
              $("#headerFormCovid").css({background:'#f44336'})
              if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_COVIDSEGURIDAD")
              $("#btnSolicitudTamizaje").show();

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
                    $("#span_notification").html(notification);
                    $("#btnValidateIn").hide();
                    $("#headerFormCovid").css({background:'#f44336'})
                    
                    if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_COVIDSEGURIDAD")
                    $("#btnSolicitudTamizaje").show();

                  return;

              }
              
              if(empresa!="tasa")
              {

                if(dni=="")
                {

                  notification = '<div><i class="fa fa-circle text-danger" style="height: 30px important!;"></i><label style="margin-left:15px">Se debe actualizar el documento de identidad para validar con OIS.</label></div>';                
                  $("#span_notification").html(notification);
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
              if(data.error==1){
                notification = '<div><i class="fa fa-circle text-danger" style="height: 30px important!;"></i><label style="margin-left:15px">Error:'+data.statusCode+', '+data.messager+'</label></div>';                
                $("#span_notification").html(notification);
                $("#btnValidateIn").hide();
                $("#headerFormCovid").css({background:'#f44336'})                         
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
                            $("#span_notification").html(notification);
                            $("#headerFormCovid").css({background:'#ffc42c'});
                            $("#fechaReeustExamCol").show();
                            if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_ALLTASA" &&  getCookie("vtas_type_usergroup"+sessionStorage.tabVisitasa)!="colaborador" )   
                            {   
                              if(check_in_out==0)       
                            $("#btnValidateIn").show();
                          }
                            return;
                      } 


                      notification = '<div><i class="fa fa-circle text-success" style="height: 30px important!;"></i><label style="margin-left:15px">Acceso Autorizado.</label></div>';
                      $("#span_notification").html(notification);
                      $("#headerFormCovid").css({background:'#29c282'});
                      $("#fechaReeustExamCol").show();
                      if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_ALLTASA" &&  getCookie("vtas_type_usergroup"+sessionStorage.tabVisitasa)!="colaborador" )   
                      {   
                        if(check_in_out==0)       
                      $("#btnValidateIn").show();
                      }
                      return;
                    }


                    if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_ALLTASA" &&  getCookie("vtas_type_usergroup"+sessionStorage.tabVisitasa)!="colaborador" )  
                    {        
                      if(check_in_out==0)   
                      $("#btnValidateIn").show();
                    }
                    notification = '<div><i class="fa fa-circle statusPperCoursetx" style="height: 30px important!;"></i><label style="margin-left:15px">Acceso autorizado</label></div>';
                    $("#span_notification").html(notification);
                    if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_COVIDSEGURIDAD")
                    $("#btnSolicitudTamizaje").show();
                    $("#headerFormCovid").css({background:'#29c282'})
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
                    $("#span_notification").html(notification);
                    $("#btnValidateIn").hide();
                    $("#headerFormCovid").css({background:'#f44336'})
                    return;
                  }
                }
                else
                {
                  

                  if(dni!="001654671" && dni!="001654672" && dni!="001444147" && dni!="003353982" )//documentos de prueba visualsat
                  {
                    notification = '<div><i class="fa fa-circle text-danger" style="height: 30px important!;"></i><label style="margin-left:15px">No registrado en OIS</label></div>';                
                    $("#span_notification").html(notification);
                    $("#btnValidateIn").hide();
                    $("#headerFormCovid").css({background:'#f44336'})
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
                            $("#span_notification").html(notification);
                            $("#headerFormCovid").css({background:'#ffc42c'});
                            $("#fechaReeustExamCol").show();
                            if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_ALLTASA" &&  getCookie("vtas_type_usergroup"+sessionStorage.tabVisitasa)!="colaborador" )   
                            {   
                              if(check_in_out==0)       
                            $("#btnValidateIn").show();
                          }
                            return;
                      } 
                      
                      notification = '<div><i class="fa fa-circle text-success" style="height: 30px important!;"></i><label style="margin-left:15px">Acceso Autorizado.</label></div>';
                      //notification = '<div class="alert alert-danger" style="border-radius:10px" role="alert">Su empresa no presentó documentación completa en OIS.\nFalta:\n'+textError+'</div>';                           //
                      $("#span_notification").html(notification);
                      //$("#btnSolicitudTamizaje").show();
                      $("#headerFormCovid").css({background:'#29c282'});
                      $("#fechaReeustExamCol").show();
                      if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_ALLTASA" &&  getCookie("vtas_type_usergroup"+sessionStorage.tabVisitasa)!="colaborador" ) 
                      {   
                        if(check_in_out==0)         
                      $("#btnValidateIn").show();
                      }
                      return;
                    }


                  if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_ALLTASA" &&  getCookie("vtas_type_usergroup"+sessionStorage.tabVisitasa)!="colaborador" ) 
                  {
                    if(check_in_out==0)
                    $("#btnValidateIn").show();
                  }
                    notification = '<div><i class="fa fa-circle statusPperCoursetx" style="height: 30px important!;"></i><label style="margin-left:15px">Acceso autorizado</label></div>';
                    $("#span_notification").html(notification);
                    $("#headerFormCovid").css({background:'#29c282'})

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
                            $("#span_notification").html(notification);
                            $("#headerFormCovid").css({background:'#ffc42c'});
                            $("#fechaReeustExamCol").show();
                            if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_ALLTASA" &&  getCookie("vtas_type_usergroup"+sessionStorage.tabVisitasa)!="colaborador" )   
                            {   
                              if(check_in_out==0)       
                            $("#btnValidateIn").show();
                          }
                            return;
                      } 

                  if(check_in_out==0)
                    notification = '<div><i class="fa fa-circle text-success" style="height: 30px important!;"></i><label style="margin-left:15px">Acceso Autorizado.</label></div>';
                  else 
                    notification = '<div><i class="fa fa-circle text-success" style="height: 30px important!;"></i><label style="margin-left:15px">Salida Autorizada</label></div>';
                  //notification = '<div class="alert alert-danger" style="border-radius:10px" role="alert">Su empresa no presentó documentación completa en OIS.\nFalta:\n'+textError+'</div>';                           //
                  $("#span_notification").html(notification);
                  //$("#btnSolicitudTamizaje").show();
                  $("#headerFormCovid").css({background:'#29c282'});
                  $("#fechaReeustExamCol").show();
                  if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_ALLTASA" &&  getCookie("vtas_type_usergroup"+sessionStorage.tabVisitasa)!="colaborador" ) 
                  {
                    if(check_in_out==0)
                    $("#btnValidateIn").show();
                  }
                  return;
                }
                  console.log("OIS Autorizado");   
                  if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_ALLTASA" &&  getCookie("vtas_type_usergroup"+sessionStorage.tabVisitasa)!="colaborador" ) 
                  {      
                    if(check_in_out==0)         
                    $("#btnValidateIn").show();
                  }

                  notification = '<div><i class="fa fa-circle statusPperCoursetx" style="height: 30px important!;"></i><label style="margin-left:15px">Acceso autorizado</label></div>';
                  $("#span_notification").html(notification);
                  $("#headerFormCovid").css({background:'#29c282'})
              }
            }
         // }     
        
        //}
      }      
    }


    var checkOisSeguridad = function(dni,enter){  
     
    
      //CHECK LISTA NEGRA
      var vetado = checkBlackList(dni);
     dni=dni.trim();
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

      
      //var url         = apiurlsecurity+"/api/Get-OIS?code="+GetOIS+"&httpmethod=object&dni="+dni.trim();     
      var url          = apiurlaccessregistries+"/api/Get-OIS?code="+GetOIS+"&httpmethod=object&dni="+dni.trim();         
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
        if(data.error==1){
          swal("Error en OIS","Error:"+data.statusCode+" - "+data.messager,"error");         
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

      $("#modalAcctionAltaMedica").modal("hide")
      return;
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
        console.log(data);
      });      
      return riesgo;
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

    return{
        init:function(){
            //getAreas();
            
            init();
            tableBlackList();
        },
        initColaborador:function(){
          
            init();
            tableBlackList();
            //tableMyRequestTemp();
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
	    thumbsUp:function(id,status,name,company,img,reason,id_area,id_company,id_location,name_area,name_location,nameperson,document,job,check_in,covid_test,is_collaborator,fecha,temperature_in,temperature_out,last_attention_date,ruc,last_veto_status,ch_evolucion, nacionalidad,ubigeo,direccion,email,sexo,fecha_nacimiento,tlf_celular,tlf_fijo,dato_familiar,tlf_contacto,biIdF00,type_document,id_status_alta_medica,start_date_altamedica,final_date_altamedica,name_status_alta_medica){                                
	      thumbsUp(id,status,name,company,img,reason,id_area,id_company,id_location,name_area,name_location,nameperson,document,job,check_in,covid_test,is_collaborator,fecha,temperature_in,temperature_out,last_attention_date,ruc,last_veto_status,ch_evolucion,nacionalidad,ubigeo,direccion,email,sexo,fecha_nacimiento,tlf_celular,tlf_fijo,dato_familiar,tlf_contacto,biIdF00,type_document,id_status_alta_medica,start_date_altamedica,final_date_altamedica,name_status_alta_medica);
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
      showTablerrhhtype:function(val){
	    	showTablerrhhtype(val);
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
      setSendCard:function(id){
        setSendCard(id);

      },
      showFichaTamizaje:function(id,location,id_area, name_area,company_name,fullname,identity_document,job,temperature,antecedent,status_test_fast,status_test_molecular,status,note,veto_status,obj_vetado,id_blacklist_user,attention_date,id_reagent_type,is_collaborator,cb_fiebre,cb_dificulta_respiratoria,cb_tos_seca,cb_dolor_garganta,cb_congestion_nasal,cb_fatiga,cb_escalofrio,cb_nauseas_vomito,cb_diarrea,cb_dolor_cabeza,cb_dolor_musculo,fecha_inicio_sintoma,rb_concato_persona,cb_entorno_famiiar,cb_entorno_laborar,cb_entorno_salud,pais_visitado,fecha_retorno,rb_direfente_distrito,distrito_visitado,cb_obesidad,cb_enfemedad_pulmonar,cb_diabete,cb_impertension,cb_mayo_60,cb_nino,cb_gestante,cb_familiar_enfermedad,nro_personas,pregunta_1,pregunta_2,pregunta_3,pregunta_4,pregunta_5,pregunta_6,pregunta_7,ch_sospechoso,id_embarcacion,name_embarcacion,id_tipo_trabajo,name_tipo_trabajo,motivo_tamizaje,rb_pais_visitado,conclusion1,conclusion2,cb_adulto_mayor,cb_gestante_2,ch_evolucion,nacionalidad,actividad_economica,ubigeo,direccion,tlf_celular,tlf_fijo,dato_familiar,tlf_contacto,sexo,fecha_nacimiento,email,id_company,ruc,biIdF00,cod_anexo1_natclar,cod_anexo2_natclar,cod_anexo3_natclar,cod_anexo4_natclar,cod_anexo5_natclar,cod_paciente_natclar,kit_covid){
        showFichaTamizaje(id,location,id_area,name_area,company_name,fullname,identity_document,job,temperature,antecedent,status_test_fast,status_test_molecular,status,note,veto_status,obj_vetado,id_blacklist_user,attention_date,id_reagent_type,is_collaborator,cb_fiebre,cb_dificulta_respiratoria,cb_tos_seca,cb_dolor_garganta,cb_congestion_nasal,cb_fatiga,cb_escalofrio,cb_nauseas_vomito,cb_diarrea,cb_dolor_cabeza,cb_dolor_musculo,fecha_inicio_sintoma,rb_concato_persona,cb_entorno_famiiar,cb_entorno_laborar,cb_entorno_salud,pais_visitado,fecha_retorno,rb_direfente_distrito,distrito_visitado,cb_obesidad,cb_enfemedad_pulmonar,cb_diabete,cb_impertension,cb_mayo_60,cb_nino,cb_gestante,cb_familiar_enfermedad,nro_personas,pregunta_1,pregunta_2,pregunta_3,pregunta_4,pregunta_5,pregunta_6,pregunta_7,ch_sospechoso,id_embarcacion,name_embarcacion,id_tipo_trabajo,name_tipo_trabajo,motivo_tamizaje,rb_pais_visitado,conclusion1,conclusion2,cb_adulto_mayor,cb_gestante_2,ch_evolucion,nacionalidad,actividad_economica,ubigeo,direccion,tlf_celular,tlf_fijo,dato_familiar,tlf_contacto,sexo,fecha_nacimiento,email,id_company,ruc,biIdF00,cod_anexo1_natclar,cod_anexo2_natclar,cod_anexo3_natclar,cod_anexo4_natclar,cod_anexo5_natclar,cod_paciente_natclar,kit_covid);
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
      thumbsUpUpdate:function(){
        thumbsUpUpdate();
      },
      showHistory:function(id,identity_document){
        showHistory(id,identity_document);
      }
    }
  }();