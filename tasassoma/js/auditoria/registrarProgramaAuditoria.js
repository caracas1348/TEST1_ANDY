var oTableBlackList;
var searchAct=0;//valida que se haya hecho busqueda
var searchType=0;
var EditIdAgent=0;
var espPrograma = "";//variable global que almacena el nombre de la especialidad del programa
var idEspPrograma = 0;//variable global que almacena el id de la especialidad del programa
var NewProgram = 0;// variable que me a decir quien es el programa nuevo o ultimo programa creado
var nombreTempPrograma = "";  //variable global, para codigo de programa generado
var codeProgramaX = 0;

//var Codesx = new Array();
var aUbic = new Array();//------------------codigo estring de especialidades ---------------------
var aUbicx = new Array();

var aUbicx2 = [];



//alert("arrancando RegistrarAuditoria");
var vw_secury_agent = function(){
    var init = function()
    {
      getLocations();
      getEstadosPrograma();
      getExternalCompany();

     // bt_buscar_prog

      //alert("entrando funcion de arranque del modulo programa");

            $("#tx_fecha_ini").change(function(event)
            {
              let fd = $("#tx_fecha_ini").val()
              $("#tx_fecha_fin").val(fd)
            });

            $("#tx_fecha_fin").change(function(event)
            {
              if($("#tx_fecha_ini").val() == "")
              {

                let fd = $("#tx_fecha_fin").val()
                $("#tx_fecha_ini").val(fd)

              }

            });



         $("#tx_access_dni_list").keyup(function(event)
         {
          oTableBlackList.search($(this).val()).draw();
          if($(this).val()=="")//limpia filtro buscado
          oTableBlackList.search( '' ).columns().search( '' ).draw();
        });


        $("#sel_sede_filter").change(function(event)
        {

          console.log(oTableBlackList.search($("#sel_sede_filter  option:selected").text()!="Todas"?$("#sel_sede_filter  option:selected").text():'').draw().context[0].aiDisplay)
          console.log(oTableBlackList.search($("#sel_sede_filter  option:selected").text()!="Todas"?$("#sel_sede_filter  option:selected").text():'').draw().context[0].aoData)
          oTableBlackList.search($("#sel_sede_filter  option:selected").text()!="Todas"?$("#sel_sede_filter  option:selected").text():'').draw();

          if($(this).val()=="" || $("#sel_sede_filter  option:selected").text()=="Todas")//limpia filtro buscado
          oTableBlackList.search( '' ).columns().search( '' ).draw();
        });

        $("#text_estado_list").change(function(event) {

          oTableBlackList.search($("#text_estado_list  option:selected").text()!="Todos"?$("#text_estado_list  option:selected").text():'').draw();
          if($(this).val()=="" || $("#text_estado_list  option:selected").text()=="Todos")//limpia filtro buscado
          oTableBlackList.search( '' ).columns().search( '' ).draw();
        });

        $("#btnAddBlacklist").click(function(){
          $("#btnValida").show();
          $("#btnNValida").hide();
          $("#tx_access_dni").val('');
          $("#name").removeClass('text-success');
          $("#name").text('Nombre y Apellido');
          $("#name").removeClass('form-control');
          $("#name").attr("contenteditable",false);
          $("#name").unbind( "click" );
          $("#tx_reason").val('');
        })

        //alert("al final del arranque inicial");

        buscarSearch();
       /* $("#bt_buscar_prog").click(function(){

          buscarSearch();


          });*/
        var now = moment().format('01/01/YYYY');
          //$("#tx_fecha_ini").val(now);
          $("#tx_fecha_ini").datetimepicker({
            timepicker:false,
            format:'d/m/Y',
           // defaultDate: now,
            //maxDate:new Date()
          });
        var now = moment().format('DD/MM/YYYY');
        // $("#tx_fecha_fin").val(now);
        $("#tx_fecha_fin").datetimepicker({
            timepicker:false,
            format:'d/m/Y',
        //defaultDate: now,
        //maxDate:new Date()
        });

        console.warn("vtas_rolexternalrol -> ", getCookie( "vtas_rolexternalrol" + sessionStorage.tabVisitasa ))
        if( getCookie( "vtas_rolexternalrol" + sessionStorage.tabVisitasa ) == 'ROL_LIDERAUDITORIA'){

            // $("#NuevoPrograma").css('display', 'none');
            $("#NuevoPrograma").hide()
        }else{
            // $("#NuevoPrograma").css('display', 'block');
            $("#NuevoPrograma").show()
        }

    }



    var searchUser = function(val)
    {
      if (val.trim().length == 8) {
        searchType = 1;

      }else{
        searchType = 2;

      }

      $("#btnValida").show();
      $("#btnNValida").hide();
      var pass=0;
      var pos;
      globalBlackLists.map((item,i)=>{

        if((item.identity_document==val))
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

              vw_secury_agent.thumbsUp(globalBlackLists[pos].id,veto_status,globalBlackLists[pos].name,globalBlackLists[pos].name_external_company,globalBlackLists[pos].person_picture,globalBlackLists[pos].reason,globalBlackLists[pos].identity_document );
            }
          //registerCompanyExternal();
      });

      return;
      }
     	if (val.trim() == '') {
    		swal("Error!", "Ingrese un DOCUMENTO DE IDENTIDAD o RUC.", "error");
    	}else{
	    	var name = getCookie('vtas_fullname'+sessionStorage.tabVisitasa);
          if (searchType==1) {
            var url = apiurlsecurity+"/api/Get-Person-All?httpmethod=searchUserPerson&identity_document="+val+"&code="+GetPersonAll+"";
          }else{
            var url = apiurlsecurity+"/api/Get-ExternalCompany-All?httpmethod=object&ruc="+val+"&code="+GetExternalCompanyAll+"";
          }
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
              if (searchType == 1) {
                $("#name").text(data.firstname+' '+data.lastname);
              }else{
                $("#name").text(data.name);
              }

              $("#name_external_company").text(data.name_external_company?toCapitalize(data.name_external_company):'-');
              $("#img_user_black_list_02").attr("src","images/iconos/user.svg");
              if(data.person_picture)
                $("#img_user_black_list_02").attr("src",data.person_picture);

	        		$("#data-div").attr('hidden',false);
              $("#send-div").attr('hidden',false);
              $("#tx_reason").val("Ingrese una observación");
              //$("#name").text('Nombre y Apellido');
              $("#name").removeAttr("contenteditable");
              $("#name").removeClass('form-control  text-success  p-0');
              $("#name").unbind( "click" );
	        		//swal("Exito!", "Lista actualizada.", "success");
	        		//vw_secury_agent.reloadtableBlackList();
	        	}else{
              searchAct=0;
              //$("#tx_access_dni").val("");
              $("#btnValida").hide();
              $("#btnNValida").show();
              $("#name").text('');
              $("#name").removeClass('text-dark');
              $("#name").addClass('form-control text-success p-0');
              $("#name").attr("contenteditable",true);
              $("#name").text('Ingrese Nombre y apellido');
              $("#name").click(function(){
                $("#name").removeClass('text-success');
                $("#name").text('');
                $("#name").addClass('form-control text-dark  p-0');
              });
              //$("#name").focus();
	        		//swal("Error!", "No encontramos registros de ingreso a nuestras Sedes con este Documento de Identidad. Verificar datos!.", "error");
	        	}

	        });
      }

    }

    function getGarita(idLocation)
    {
       return
        $("#sel_garita").empty();
        $("#sel_garita").text("Cargando...");

        var url = apiurlaccessrequest+"/api/Get-Garita-All?httpmethod=objectlist&code="+GetGaritaAll+"&id_location="+idLocation;
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
          $("#sel_garita").append("<option value='0'>Seleccionar</option>");
          var jsonLocation=[];

          data.map(function(item)
          {
              $("#sel_garita").append(`<option value='${item.id}'>${item.name}</option>`);

            jsonLocation.push(item);

          });

          if(id_garita_golbal!=0)
            $('#sel_garita').val(id_garita_golbal);
        }).fail(function( jqXHR, textStatus, errorThrown ) {

            showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
            console.log(errorThrown)
            $("#sel_garita").hide();
       });;

    }










    var register = function()
    {

        seleccionEspecialidad();
        var val = 0;
        var Year = moment().format('YYYY');   //Year ='2021';//temp borrar si ya paso el 18-10-2020
        var Code = codeProgramaX + Year;



        // alert("espProgramaReg = "+espPrograma);// String
        // alert("idEspPrograma = "+idEspPrograma);//idcode int
        // alert("codeProgramaX = "+codeProgramaX);//string

        //vamos a validar si codigo de especialidad y año coincide con algún registro existente en la base de datos




                // alert("idEspPrograma = " + idEspPrograma);
              if (idEspPrograma == 0)
              {//------------------------------------------------------ campos vacios ----------------------------------------------------------
                cerrarModal('modal-save');
                //swal("Información", "Por favor completar los datos requeridos", "info");
                verModalErrorSp1("Crear Programa","Por favor completar los datos requeridos");

              }//------------------------------------------------------ campos vacios ----------------------------------------------------------
              else
              {//------------------------------------------------------ campos llenos seguimos ini ----------------------------------------------------------

                  var ii = 0;

                  //alert("existen en la lista = "+aUbicx2.length);
                  for (ii = 0; ii < aUbicx2.length; ii++)
                   {

                        //var ac = new String(aUbicx[ii]);
                        var ac = aUbicx2[ii].Code;// nuevo forma de comparar
                        var bc = new String(Code);
                            //bc = "'"+bc+"'";

                            //alert("xxx = "+ ac + "=="+ bc);
                            //alert("val = "+val)
                            // alert("xxx = "+ ac + "=="+ bc);
                            // console.log("COMPARANDO..............................................................................");
                            // console.log(aUbicx2)
                            // console.log("COMPARANDO..............................................................................");

                          if(ac == bc){ val = 1; }

                    }
                          //alert("val   = "+val)

                            if(val == 0)
                            {//------------------- el registro no existe en el sistema bd ------------------------

                                          var name = getCookie('vtas_fullname'+sessionStorage.tabVisitasa);
                                          var created_by = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
                                          var responsible = getCookie('vtas_id'+sessionStorage.tabVisitasa);

                                          //alert("vtas_id = "+getCookie('vtas_id'+sessionStorage.tabVisitasa));//vtas_id
                                          var d = new Date();
                                          var now = moment().format('YYYY-MM-DD');

                                                //******************   BD     *************************** */
                                                var tt = Math.floor(Math.random()*101);
                                                    Year = moment().format('YYYY'); //Year ='2021';//temp borrar si ya paso el 18-10-2020
                                                    Code = codeProgramaX + Year;
                                                var CodeEspecialidad = idEspPrograma;
                                                var DescriptionEspecialidad= espPrograma;
                                                var DescriptionStatus = 'Creado';
                                                var EspecialidadId = idEspPrograma-1; //Code + Year;
                                                var StatusId = 1;
                                                var Evaluador_name = null;//name;// es imposible deberia ser el mismo creador por ser el primer registro
                                                var Evaluador_code = null;//created_by;   // es imposible deberia ser el mismo creador por ser el primer registro
                                                var Created_By = created_by;
                                                var Last_Updated_By = created_by; //now;// la fecha de hoy


                                      var body ={
                                                  "Code":Code,
                                                  "EspecialidadId":idEspPrograma,
                                                  "CodeEspecialidad":CodeEspecialidad,
                                                  "DescriptionEspecialidad":DescriptionEspecialidad,
                                                  "DescriptionStatus":DescriptionStatus,
                                                  "StatusId":StatusId,
                                                  "Evaluador_name":Evaluador_name,
                                                  "Evaluador_code":Evaluador_code,
                                                  "Year":Year,
                                                  "Flag_Completada":0,
                                                  "Created_By":Created_By,
                                                  "Last_Updated_By":Last_Updated_By,
                                                  "Created_Date": now,
                                                  "Last_Updated_Date":now
                                                }
                                              //******************   BD     *************************** */

                                                //----------------------PARAMETROS PARA EL SERVICIO ingresar PROGRAMAS DE AUDITORIA-------------------------------
                                                  var apiurlaccessregistriesTemp = apiurlAuditoria+"";//apiurlaccessregistries
                                                  var servicioGp = "/api/Post-Programa_Auditoria-All?"//    "/api/Get-SecurityAgent-All?";
                                                  var apiKeyxGp = "r$3#23516ewew5"; //constantes.apiKey;
                                                  var metodoHttpGp = "objectlist";
                                                  var metodoAjaxGp =  "POST"; //"POST";
                                                  var GetSecurityAgentAllxx = "g38OQrxNikLSJIxsYIv03hTcmsYXfmMA7kanUqFykcdNNGAHwMGFQg==";
                                                  var patametrosGp = "code="+GetSecurityAgentAllxx;//"&code="+GetSecurityAgentAll;
                                                  //----------------------PARAMETROS PARA EL SERVICIO ingresar PROGRAMAS DE AUDITORIA-------------------------------

                                                  console.log(body);

                                                  // var url = apiurlaccessregistries+"/api/Get-SecurityAgent-All?httpmethod=objectlist&code="+GetSecurityAgentAll+"";
                                                  //var url = apiurlAuditoria+"/api/Post-Programa_Auditoria-All?code=g38OQrxNikLSJIxsYIv03hTcmsYXfmMA7kanUqFykcdNNGAHwMGFQg==&httpmethod=post";



                                                    if(EditIdAgent==0)//aca se registra nuevo
                                                    {
                                                          var url = apiurlAuditoria+"/api/Post-Programa_Auditoria-All?code=g38OQrxNikLSJIxsYIv03hTcmsYXfmMA7kanUqFykcdNNGAHwMGFQg==&httpmethod=post";  //Insertar
                                                          // servicioGp = "/api/Post-Programa_Auditoria-All?";//;
                                                    }
                                                    else{
                                                      //var url = apiurlaccessregistries+"/api/Post-SegurityAgent-All?httpmethod=put&code="+PostSegurityAgentAll+"&id="+EditIdAgent; //modificar
                                                        //alert("modificar registro");
                                                    }

                                                    var settings = {
                                                      "url": url,
                                                      "method": "POST",
                                                      "timeout": 0,
                                                      "crossDomain": true,
                                                      "data": JSON.stringify(body),
                                                      "headers": {
                                                        "apikey": "r$3#23516ewew5",
                                                        "Content-Type": "application/json"/*,
                                                        "Cookie": "ARRAffinity=1c7c284699ca6bef98fc17dbcd7e04e1431fa4dd45ab6d2bb105ddbb421edecc"*/
                                                       }//,
                                                      // "data": JSON.stringify(body),
                                                    };

                                                      $.ajax(settings).done(function (response)
                                                          {
                                                              let ddate = [];
                                                            console.log("##############################  RESPUESTA DESPUES DE GUARDAR ################## ");
                                                                  console.log(response); //alert("AAAAAAAAAAAAAAAAA = "+response.EspecialidadId)
                                                                  ddate = response.split(',');//TRYCKY es muy estraño pendiente parece la forma en que se retorn ala data del servicio
                                                                  let iddf =  ddate[0].split(':');
                                                                  let PId = $.trim(iddf[1]);
                                                                  console.log("**",PId,"**");
                                                            console.log("##############################  RESPUESTA DESPUES DE GUARDAR ################## ");
                                                                    PId = PId*1;
                                                                  //alert(PId)
                                                                          //*****************************************************************************************************************************************************AJAX_INI */
                                                                      var si = response.Id*1;//alert(si);
                                                                      //prompt(response.Id)
                                                                    if (response)
                                                                      {
                                                                          //alert("EEEIIIIIII = "+response.EspecialidadId)
                                                                              if(PId > 0)
                                                                                {
                                                                                    //   nombreTempPrograma = Code;
                                                                                    //   $('#CodNewProgramasx').text(nombreTempPrograma);
                                                                                    //   $('#modalExitoGuuardaProgramaAuditoria').modal('show');
                                                                                    //   vw_secury_agent.reloadtableBlackList();
                                                                                    // }
                                                                                    // else
                                                                                    // {
                                                                                    //   swal("Error!", "Este Programa ya se encuentra creado: ( "+Code+" )", "error");
                                                                                    //   return
                                                                                    // }

                                                                                      cerrarModal('modal-save');
                                                                                      nombreTempPrograma = Code;
                                                                                      $('#CodNewProgramasx').text(nombreTempPrograma);
                                                                                      $('#modalExitoGuuardaProgramaAuditoria').modal('show');
                                                                                      vw_secury_agent.reloadtableBlackList();

                                                                                          tt = "";
                                                                                          Year = "";
                                                                                          Code = "";
                                                                                          CodeEspecialidad = "";
                                                                                          DescriptionEspecialidad= "";
                                                                                          DescriptionStatus ="";
                                                                                          EspecialidadId = "";
                                                                                          StatusId ="";
                                                                                          Evaluador_name = "";
                                                                                          Evaluador_code = "";
                                                                                          Created_By = "";
                                                                                          Last_Updated_By = "";
                                                                                  }
                                                                          else
                                                                                  {
                                                                                    cerrarModal('modal-save');
                                                                                    //swal("Error!", "Este Programa ya se encuentra creado: ( "+Code+" )", "error","alert('aaaa')")
                                                                                    verModalErrorSp1("Crear Programa","Este Programa ya se encuentra creado :<b>( "+Code+" )</b>");//---verificacion en BD
                                                                                    //$('#modal-save').addClass('modal_confirmacion__active')

                                                                                    return 0
                                                                                  }

                                                                        }
                                                                    else
                                                                        {
                                                                            cerrarModal('modal-save');
                                                                            swal("Error!", "No se ha podido actualizar la lista.", "error");
                                                                         }

                                                                vw_secury_agent.cancelform();

                                                                    //********************************************************************************************************************************************************AJAX_END */

                                                          });

                            }//------------------- el registro no existe en el sistema bd ------------------------
                                else
                              {//------------------- LA COMPARATIVA SIN IR A BD -----------------------CON ARRAY
                                    cerrarModal('modal-save');

                                    //swal("Error!", "Este Programa ya se encuentra creado: ( "+Code+" )", "error");

                                    verModalErrorSp1("Crear Programa","Este Programa ya se encuentra creado: <b>( "+Code+" )</b>");//VERIFICACION EN ARRAY

                                    vw_secury_agent.cancelform();
                              }//------------------- LA COMPARATIVA SIN IR A BD -----------------------CON ARRAY




              }  //------------------------------------------------------ campos llenos seguimos fin ----------------------------------------------------------

    }











  var reloadtableBlackList = function(){
    if(oTableBlackList)
      oTableBlackList.ajax.reload();
    else
      tableBlackList();
  }
         var globalBlackLists=[];



//---------------------------------------------------------------------- FUNCION PARA LISTAR PROGRAMAS DE AUDITORIAS -------------------------



//---------------------------------------fin de la funcion listar programas



var 	tableBlackList = function()
{
//alert("AAAAAAAAAAAAAAAAAAAAAAAA-V-----------------");
  showLoading();
  var jj = 0;
  var lbx = "";
  var now = moment().format('YYYY-MM-DD');
       //alert("entrando a tableBlackList,,,,");
   //  //----------------------PARAMETROS PARA EL SERVICIO LISTAR PROGRAMAS DE AUDITORIA-------------------------------
   //  var apiurlaccessregistriesTemp = apiurlAuditoria+"";//apiurlaccessregistries
   //  var servicioGp = "/api/Get-Programa_Auditoria-All?"//    "/api/Get-SecurityAgent-All?";
   //  var apiKeyxGp = "r$3#23516ewew5"; //constantes.apiKey;
   //  var metodoHttpGp = "objectlist";
   //  var metodoAjaxGp =  "GET"; //"POST";
   //  var GetSecurityAgentAllxx = "X4XURduZbR20wwsOaEVVs4trLnrmd4mfO3KtqksohFm5bQQPqoO10g==";
   //  var patametrosGp = "&code="+GetSecurityAgentAllxx+"&Flag_Completada=0";//"&code="+GetSecurityAgentAll;
   //  //----------------------PARAMETROS PARA EL SERVICIO LISTAR PROGRAMAS DE AUDITORIA-------------------------------


   // // var NewProgram = 0;// variable que me a decir quien es el programa nuevo
   //      var url = apiurlaccessregistriesTemp+servicioGp+patametrosGp+"&httpmethod="+ metodoHttpGp;

      // var url = apiurlaccessregistries+"/api/Get-SecurityAgent-All?httpmethod=objectlist&code="+GetSecurityAgentAll+"";

   //----------------------PARAMETROS PARA EL SERVICIO LISTAR PROGRAMAS DE AUDITORIA-------------------------------
            var apiurlaccessregistriesTemp = apiurlAuditoria+"";//apiurlaccessregistries
            var servicioGp = "/api/Get-Programa_Auditoria-All?"//    "/api/Get-SecurityAgent-All?";
            var apiKeyxGp = "r$3#23516ewew5"; //constantes.apiKey;

            var metodoHttpGp = "&httpmethod=objectlist";//&Flag_Completada=0"; pendiente con estopara presentar cel listado

            var metodoAjaxGp =  "GET"; //"POST";
            var GetSecurityAgentAllxx = "code=X4XURduZbR20wwsOaEVVs4trLnrmd4mfO3KtqksohFm5bQQPqoO10g==";
            var patametrosGp = "&httpmethod=objectlist";
            //----------------------PARAMETROS PARA EL SERVICIO LISTAR PROGRAMAS DE AUDITORIA-------------------------------

            var url = apiurlaccessregistriesTemp+servicioGp+GetSecurityAgentAllxx+metodoHttpGp;




       console.log("url-listarPrograma = "+url);


        var headers ={
            "apikey":apiKeyxGp
        }


         $.ajax({
        method: "GET",
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function (response) {

      if (response.length > 0) $("#bodyTablaSinPrograma").css("display", "none");
            else $("#bodyTablaSinPrograma").css("display", "block");

      $("#cantidad-programa").html('<img src="images/iconos/copia-1.svg" class="copia-1"> '+response.length+' ');
      $('#body-tabla-list').html(" ");

        hideLoading();//font-size: 11.9px; letter-spacing: 0.10px; line-height: 1.64;
        $('#pagination-container-programa').pagination({
                dataSource: response,
                pageSize: 5,// requerido por Karen 18/05/21
                callback: function(data, pagination) {
                    var html = templatetableBlackList(data);
                    $('#body-tabla-list-programa').html(html);
                }
            })
    })


}
//---------------------------------------fin de la funcion listar programas

 // para el paginado....
    var templatetableBlackList = function(data){
        var html = '';
        let type = '';
        var jj = 0;
        var lbx = "";
        var now = moment().format('YYYY-MM-DD');
              //alert("Quien me llama");

              console.log("#################################################  LISTADO DE PROGRAMAS  #######################################")
              console.log("DATA",data)
              console.log("#################################################  LISTADO DE PROGRAMAS  #######################################")
              console.log("              ")
              console.log("              ")
              console.log("              ")
              console.log("              ")


         //Ini_______vamos a recorrer para ver cual es la última auditoría
         var MayorAud = 0;
         data.forEach((Item)=>{
             var iiaudd = parseInt(Item.Id);
             //alert(Item.StatusId+'=status, PlanId = '+Item.PlanId)
             if((Item.StatusId == 1))// StatusId Asignada , en atencion y en ejecucion quiere decir que tiene pla, n puede ser nueva
             {
                 //alert(Item.StatusId+'=status, PlanId = '+Item.PlanId)
                 if(iiaudd > MayorAud)
                 {
                     MayorAud = iiaudd;
                 }
             }
         })
         //Fin_______vamos a recorrer para ver cual cual es la última auditoría

        data.forEach((Item)=>{

          console.log(Item);

            //let fecha = moment(`${Item.last_updated_date}`).format("DD/MM/YYYY");
            var yeark       = moment(Item.FechaCreacion).format('YYYY');//dddd
            var month       = moment(Item.FechaCreacion).format('MM');//
            var day         = moment(Item.FechaCreacion).format('DD'); ;
            var startDate               = " "+day +"/"+ month +"/"+yeark;
            var datec=startDate;

            yeark       = moment(Item.Last_Updated_Date).format('YYYY');//dddd
            month       = moment(Item.Last_Updated_Date).format('MM');//
            day         = moment(Item.Last_Updated_Date).format('DD'); ;
            startDate               = " "+day +"/"+ month +"/"+yeark;
            var dater=startDate;

             var bcod = "'"+Item.Code+"'";


            aUbicx[jj] = bcod; jj++;

            if(Item.StatusId == 5){lbx = "Ver Auditorías";}else{lbx = "Ingresar Auditorías";}
            if(Item.type_id == 0){
                type = 'Programado';
            }
           // var cg = Item.Evaluador_name;
           //

           var btNew;   let iidPlan = parseInt(Item.Id);
           //alert(iidPlan);
           if((iidPlan == MayorAud)&&(iidPlan >0))
           {
              btNew = "";
              // btNew = "<div  class='check-blue text-center'>Nuevo</div>"; //btNew ="";//momentaneamente andy 14-05-2021
           }else{var btNew = "";}


           //console.log("estoy verificando listar programa Evaluador_name("+cg+")");
           html += `
            <div class="item-tabla p-2" style="z-index: 1;display:relative;">${btNew}
            <div class="row m-0 justify-content-between align-items-center">
                <div class="col-md-1" >${Item.Code}</div>
                <div class="col-md-2" >${Item.DescriptionEspecialidad}</div>
                <div class="col-md-1" >${datec}</div>
                <div class="col-md-1  text-center" >${Item.Cantidad_Correcciones}</div>
                <div class="col-md-1  " >${Item.Evaluador_name?Item.Evaluador_name:'    -----'}</div>
                <div class="col-md-2" >${dater}</div>
                <div class="col-md-1" >${Item.DescriptionStatus}</div>

                <div class="col-md-2 d-flex justify-content-end" >
                  <button class="btn btn-green-lime" style=" width: 7.563rem; height: 2.125rem; font-size: 0.75rem; color: #565933;"  onclick="vistaAuditorias(${Item.Id},${bcod},${Item.EspecialidadId});" >
                      ${lbx}
                  </button">

                </div>
            </div>
        </div>`





            //$('#body-tabla-list').append(
            // html += `
            //     <div class="item-tabla p-2">
            //         <div class="row m-0 justify-content-between align-items-center">
            //             <div class="col-md-2 text-center" style="font-size: 13px">${Item.Code}</div>
            //             <div class="col-md-2 text-center" style="font-size: 13px" >${Item.DescriptionUnidadNegocio}</div>
            //             <div class="col-md-1 text-center" style="font-size: 13px" >${Item.DescriptionSede}</div>

            //             <div class="col-md-6" >
            //                 <div class="row">
            //                     <div class="col-md-2 text-center" style="font-size: 13px" >${Item.Code_Normas}</div>
            //                     <div class="col-md-2 text-center" style="font-size: 13px" >${Item.DescriptionAuditoria}</div>
            //                     <div class="col-md-2 text-center" style="font-size: 13px" >${startDate}</div>
            //                     <div class="col-md-2 text-center" style="font-size: 13px" >${endDate}</div>
            //                     <div class="col-md-2 text-center" style="font-size: 13px" >${Item.DescriptionStatus}</div>
            //                     <div class="col-md-2 text-center ${colorLetra}"  style="font-size: 13px" >${Item.DescriptionStatusEvaluacion}</div>
            //                 </div>
            //             </div>

            //             <div class="col-md-1" >
            //                 <div class="row">
            //                     <div class="col-6 text-center" style="font-size: 15px">
            //                         <button class="btn-circleCA border-0" ${disabledBtnAuditor}
            //                             style="background-color: #b2b2b2 !important ; min-width: 2rem; height: 2rem;"
            //                             idProgramaAuditoria="${id_programa_auditoria}" idEspecialidad="${id_codigo_especialidad_programa}"
            //                             nombreProgramaAuditoria="${nombre_programa_auditoria}" Description="${Item.Description}"
            //                             onClick="vw_auditor_list.asignarauditor('${Item.Id}');" >
            //                             <img src="./images/iconos/usuario1.svg" class="ojo-1" style>
            //                         </button>
            //                     </div>

            //                     <div class="col-6 text-center" style="font-size: 15px">
            //                         <button type="button"
            //                             id="btnVerAuditoria_${Item.Id}"
            //                             idProgramaAuditoria="${id_programa_auditoria}" idEspecialidad="${id_codigo_especialidad_programa}"
            //                             nombreProgramaAuditoria="${nombre_programa_auditoria}"
            //                             Code="${Item.Code}" CodeUnidadNegocio="${Item.CodeUnidadNegocio}"
            //                             Description="${Item.Description}" StatusEvaluacionId="${Item.StatusEvaluacionId}" created_by="${Item.created_by}"
            //                             DescriptionUnidadNegocio="${Item.DescriptionUnidadNegocio}" DescriptionAuditoria="${Item.DescriptionAuditoria}" Code_Normas="${Item.Code_Normas}"
            //                             DescriptionSede="${Item.DescriptionSede}" SedeId="${Item.SedeId}" CodeSede="${Item.CodeSede}" Inicio="${startDate}" Fin="${endDate}"
            //                             Inicio2="${moment(Item.Inicio).format('L')}" Fin2="${moment(Item.Fin).format('L')}"
            //                             StatusId="${Item.StatusId}" DescriptionStatus="${Item.DescriptionStatus}"
            //                             TipoId="${Item.TipoId}" onClick="verAuditoria('${Item.Id}')" class="btn-circleCA border-0" style="background-color: #373e68">
            //                             <img src="./images/iconos/ojo_1.svg" class="ojo-1">
            //                         </button>
            //                     </div>
            //                 </div>
            //             </div>

            //         </div>
            //     </div>`
            //)

        });

html += '';//hideLoading();
        return html;

    }




var companyId;
var id_garita_golbal = 0;









var showDetail=function(pos)
{
  EditIdAgent=globalBlackLists[pos].id;
  console.log(globalBlackLists[pos])
  $('#modalShowpersonBlack').modal('show');
  $('#tipo_documentolistBlack').val(globalBlackLists[pos].type_document);
  $('#tx_nombre_ListaBlack').val(globalBlackLists[pos].name);
  $('#tx_company_ListaBlack').val(globalBlackLists[pos].name_company);
  $('#tx_phone_ListaBlack').val(globalBlackLists[pos].phone);
  $('#tx_access_dni').val(globalBlackLists[pos].identity_document);
  $('#sel_sede').val(globalBlackLists[pos].id_location).trigger("change");
  //$('#sel_garita').val(globalBlackLists[pos].id_garita);
  id_garita_golbal = globalBlackLists[pos].id_garita;
  companyId=globalBlackLists[pos].id_company;
}





var cancelform=function()
{
  EditIdAgent=0;
  id_garita_golbal = 0;
  $('#modalShowpersonBlack').modal('hide');
  $('#tipo_documentolistBlack').val("")
  $('#tx_nombre_ListaBlack').val("")
  $('#tx_company_ListaBlack').val("")
  $('#tx_phone_ListaBlack').val("")
  $('#tx_access_dni').val("")
  $('#sel_sede').val(0)
  companyId=null;
}























var deleted=function(id)
{
  //console.log(id)

  swal({
    title: "Inactivar",
    text: "¿Desea inactivar la persona seleccionada?",
    type: "info",
    showCancelButton: true,
    confirmButtonClass: " btn-green-lime btn-sm btn-rounded btn-raised",
    confirmButtonText: "Si",
    cancelButtonText: "No",
    closeOnConfirm: true,
    closeOnCancel: false,
    showLoaderOnConfirm: true
  },function(action)
  {
    if (action===false)
    {//
        swal.close();
        EditIdAgent=0;
      }
      else
      {//eliminar
        EditIdAgent=id;
        console.log("Ir a eliminar "+id);

        var url = apiurlaccessregistries+"/api/Post-SegurityAgent-All?httpmethod=delete&code="+PostSegurityAgentAll+"&id="+EditIdAgent;
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
          console.log(data);
          if (data)
          {
            swal({
              title: "Éxito",
              text: "Se ha inactivado el registro satisfactoriamente",
              type: "success",
              timer:2000,
              showCancelButton: false,
              confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
              confirmButtonText: "De acuerdo",
              closeOnConfirm: false
            });
            cancelform();
            vw_secury_agent.reloadtableBlackList();
          }else{
            swal("Error!", "No se ha podido actualizar la lista.", "error");
          }

        });

      }
    //registerCompanyExternal();
});

}
  var Listbinnacle = function(id,name,document){

    if(oTableRecent){
      oTableRecent.destroy();
    }

    $('.textName').text(name+' - '+document);
    var param={
      httpmethod:'exceededlist'
    }
    var url=apiurlblacklist+"/api/Get-Blacklist-Log?code="+getblacklistlogcode+"&httpmethod=objectlist&search_type=1&id_blacklist="+id;
    var headers={
      "apikey":"r$3#23516ewew5"
    }

    oTableRecent=$('#List_table_binnacle').DataTable({
      paging:false,
      ordering:false,
      info:false,
      order: [[ 0, "desc" ]],
      //searching : false,
      scrollY   :'50vh',
      scrollCollapse:true,
      ajax:{
        type:"POST",
        url:url,
        headers:headers,
        crossDomain:true,
        error:function(xhr,error,thrown) {
          console.log(xhr);
          console.log(xhr.status)
          var textError=thrown;
          var status=xhr.status+' - '+xhr.statusText;//500 error servidor

          showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.");
          return;
          hideLoading();
        },
        dataType:"json",
        dataSrc:function(req) {
          arrayGlobalServicesProg=req;
          var i=1;
          var data=[];
          req.map(function(item) {
            var colaboratorId = item.created_by;
            var user = "";
            if(item.last_updated_by!=null){
              colaboratorId = item.last_updated_by
            }

            if(colaboratorId!=null  || colaboratorId!=""){
              //buscamos el colaborador por el id
              var resp    = "";
              var filter  = colaboratorId;
              var param   = {filter:filter};
              var headers = {"Authorization":TOKEN_CLIENT,"apikey":"r$3#23516ewew5"}
              $.ajax({
              url: apiurlsecurity+"/api/Get-Collaborator?code="+GetCollaborator+"&httpmethod=object",
              //dataType: "json",
              method:"post",
              data : JSON.stringify(param),
              processData:false,
              crossDomain: true,
              async: false,
              headers : headers,
              success: function( data ) {
                  var array =[];

                  data =  JSON.parse(data);
                  resp = data;

                 console.log(data);

                  if(Array.isArray(data.value) )
                  {
                      user = data.value[0].displayName;
                  }
                  else{
                    user = colaboratorId;
                  }

                  console.log(colaboratorId,user)
              }
              });
            }




            /*
            Listbinnacle
            */
            $('.CantExceBlack').text(req.length);

            var estatus=0;
            if(i==1) {
              estatus=1;
            }

              var observacion='-';
              if(item.reason)
                observacion=item.reason;

              var accessTime  = moment(item.created_date).format('LT');
              var week        = moment(item.created_date).format('dddd');//dddd
              var month       = moment(item.created_date).format('MMMM');//
              var day         = moment(item.created_date).format('D'); ;
              var startDate               = week +" "+day +" de "+ month;
              var datec=startDate;

              var row = {
                Tobservacion:toCapitalize(observacion),
                User:user,
                TstartDate:startDate,
                Testatus:(!item.action_type)?'<span class="text-success">Inactivo</span>' :'<span class="text-danger">Activo</span>',
              }
              i++;
              data.push(row);
          });
          return data;
        }
      },
      columns: [
        {title:"Observación",data:"Tobservacion",width: "40%"},
        {title:"Fecha de Registro",data:"TstartDate",width: "25%"},
        {title:"Usuario",data:"User",width: "25%"},
        {title:"Estatus",data:"Testatus",width: "10%"},
      ],
    });
    $('#Listbinnacle').modal('show');
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
        var jsonExternalCompany=[];
        data.map(function(item){
          if(item.id!=167 && item.id!=166 && item.attribute4=="OIS")
            jsonExternalCompany.push(item);
        });

        var list=[];
        jsonExternalCompany.map(function(item){
          list.push({label:toCapitalize(item.name),value:toCapitalize(item.name),id:item.id})
      });
     // list.push({label:'Tasa',value:'Tasa',id:0})
        $("#tx_company_ListaBlack").autocomplete({

          source: list//listado para autocompletar
          ,
          //minLength: 3,//minimo de letras a buscar coincidencias
          select: function( event, ui )
          {
            //$("#sel_cod_company_"+leng).val(ui.item.id);
            //getCollaborator($("#add_covid_firtname_"+leng),leng);

            companyId=ui.item.id;
          }


      });

    });
}

//********************************************************************************************************* */



//********************************************************************************************************** */

var getEstadosPrograma= function()
  {

    // <option value="" disabled selected></option>
    // <option value="1">Creado</option>
    // <option value="2">En Revisión</option>
    // <option value="3">Observado</option>
    // <option value="4">Aprobado</option>




    //aqui vamos a cambiar por nuestro servicio....................  vamos a traer las especialidades
    $("#sel_estado").append("<option value='-1'>Cargando...</option>");

     var  apiurlaccessrequestx= apiurlAuditoria+"";
     var  methodx = "GET";//es GET
     var apiKeyx = "r$3#23516ewew5";
     var typeDatex = "json";
     var codex = "tzTo63fygC1rQtqr0mXxg7a9HQ/WFAPI3XaE/h/OBzhZHgIZTqj93Q==";
     var httpmethodx = "objectlist";
     var serviciox = "/api/Get-Especialidad-All?";

     var url = apiurlAuditoria+"/api/Get-Status_Programa_Auditoria-All?code=qOqHuW1VD50eWi6m3mZ2MjJPR7kjm7tdEhwdApDA2oEnWcS1hjofcg==&httpmethod=objectlist";
     var i =0;

    var headers ={
        "apikey":apiKeyx
    }
    $.ajax({
        method:methodx,
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: typeDatex,
    }).done(function( data)
    {

      var option = "";
      option+="<option value='0'>        </option>";

      var option1 = "";
      option1+="<option value='0'>Todas</option>";
      data.map(function(item){
         aUbic[i] = item.Code; /* alert("code"+aUbic[i]+"("+i+")");*/
          i++;

        option+="<option Code='"+item.Code+"'  value='"+item.Id+"'>"+item.Description+"</option>";// datos reales item.Id   item.Description
        option1+="<option Code='"+item.Code+"' value='"+item.Id+"'>"+item.Description+"</option>";
          // alert("Code = "+item.Code);
          // alert(" Especialidad = "+item.Description);
          // alert("idEspecialidad = "+item.Id);


      });
      $("#sel_estado").html(option);
      // $("#sel_sede_filter").html(option1);

    });
  }


  var getLocations= function()
  {

    //aqui vamos a cambiar por nuestro servicio....................  vamos a traer las especialidades
    $("#sel_sede").append("<option value='-1'>Cargando...</option>");
    $("#sel_sede_filter").append("<option value='-1'>Cargando...</option>");
     var  apiurlaccessrequestx= apiurlAuditoria+"";
     var  methodx = "GET";//es GET
     var apiKeyx = "r$3#23516ewew5";
     var typeDatex = "json";
     var codex = "tzTo63fygC1rQtqr0mXxg7a9HQ/WFAPI3XaE/h/OBzhZHgIZTqj93Q==";
     var httpmethodx = "objectlist";
     var serviciox = "/api/Get-Locations-All?";

       var url = apiurlAuditoria+"/api/Get-Especialidad-All?code=tzTo63fygC1rQtqr0mXxg7a9HQ/WFAPI3XaE/h/OBzhZHgIZTqj93Q==&httpmethod=objectlist";
       var i =0;
    var headers ={
        "apikey":apiKeyx
    }
    $.ajax({
        method:methodx,
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: typeDatex,
    }).done(function( data)
    {
      var option = "";
      option+="<option value='0'>                  </option>";

      var option1 = "";
      option1+="<option value='0'>Todas</option>";
      data.map(function(item){  aUbic[item.Id] = item.Code; /* alert("code"+aUbic[i]+"("+i+")");*/        i++;

        option+="<option code='"+item.Code+"'  value='"+item.Id+"-"+item.Code+"'>"+item.Description+"</option>";// datos reales item.Id   item.Description
        option1+="<option code='"+item.Code+"' value='"+item.Id+"-"+item.Code+"'>"+item.Description+"</option>";

      });
      $("#sel_sede").html(option);
      $("#sel_sede_filter").html(option1);

    });
}







var idEdit;
var statusEdit;
var nameEdit;
    var thumbsUp = function(id,status,name,company,img,reason,identity_document){

    	if (status==1) {
        $("#butEditBlack").text("Retirar de lista")
        var text = "El usuario será restituido.";
        $("#butEditBlack")[0].className="btn btn-green-lime btn-rounded btn-raised";

    	}else{
        $("#butEditBlack").text("Agregar a lista")
        $("#butEditBlack")[0].className="btn btn-danger btn-rounded btn-raised";
    		var text = "El usuario será dado de baja.";
      }
      $('#tx_reasonedit').text('');

      $('#nameedit').text(name);
      $('#modalShowpersonBlacke').modal('show');
      $('#dniedit').text(identity_document);
      $('#span_name_company').text("--");
      if(company!=null || company!="" || company!="null")
        $('#span_name_company').text(toCapitalize(company));
      if(img)
        $("#img_user_black_list").attr("src",img);
      nameEdit=name;
      statusEdit=status;
      idEdit=id;
    }

    var thumbsUpregister = function(){
      var inputValue=$('#tx_reasonedit').val();
      $('#modalShowpersonBlacke').modal('show');
      $('#nameedit').text(name);
      if(statusEdit==0){
        statusEdit=1;
      }
      else if(statusEdit==1){
        statusEdit=0;
      }

      if(inputValue=="")
      {
        swal({
          title: "Campos vacios",
          text: "No se ha ingresado observación.",
          timer: 4000,
          type: "error",
          showConfirmButton: true
          });
       // swal("Error", "No se ha ingresado observación", "error");
        $('#tx_reasonedit').focus();
        return;
      }

		    	var name = getCookie('vtas_fullname'+sessionStorage.tabVisitasa);
		    	var responsible = getCookie('vtas_id_hash'+sessionStorage.tabVisitasa);
		        var url = apiurlblacklist+"/api/Post-Blacklist-User?httpmethod=put&id="+idEdit+"&responsible="+responsible+"&reason="+inputValue+"&code="+postblacklistusercode+"";
		        var headers ={
		            "apikey":"r$3#23516ewew5"
		        }
		        var data = {
              "created_by": getCookie("vtas_id_hash"+sessionStorage.tabVisitasa)
              ,"last_updated_by":getCookie("vtas_id_hash"+sessionStorage.tabVisitasa)
		        	,"veto_status" : statusEdit
		        }

		        $.ajax({
		            method: "POST",
		            url:  url,
		            data: JSON.stringify(data),
		            headers:headers,
		            crossDomain: true,
		            dataType: "json",
		        }).done(function(data)
		        {
		        	if (data.id) {
		        		swal("Exito!", "Operación satisfactoria.", "success");
                vw_secury_agent.reloadtableBlackList();
                $('#modalShowpersonBlacke').modal('hide');
		        	}else{
		        		swal("Error!", "No se ha podido actualizar la lista.", "error");
		        	}

		        });

    }

    return{
        init:function(){
            //getLocations();
            init();//inicio del modulo
            //alert("yyyyyyyyyyyyyyyyyyyyyyy");
            //ultimoPrograma();
            tableBlackList();//listado de programas

        },
	    reloadtableBlackList:function(){
        $('#body-tabla-list').html("");
	      reloadtableBlackList();





	    },
	    thumbsUp:function(id,status,name,company,img,reason,identity_document){
	      thumbsUp(id,status,name,company,img,reason,identity_document);
	    },
	    register:function(){
	    	register();
      },
      showDetail:function(id){
	    	showDetail(id);
      },
      cancelform:function(){
	    	cancelform();
      },
      getGarita:function(idLocation){
	    	getGarita(idLocation);
      },
      deleted:function(id){
	    	deleted(id);
      },
      thumbsUpregister:function(){
	    	thumbsUpregister();
      },
      saveBlacklist:function(){
        saveBlacklist();
      },
      Listbinnacle:function(id,name,document){
        Listbinnacle(id,name,document);
      }

    }
}();

function seleccionEspecialidadChange(select){


   var values=$("#sel_sede").val().split('-');
   espPrograma = $("#sel_sede").find('option:selected').text();
   idEspPrograma = values[0];//idEspPrograma = $("#sel_sede").find('option:selected').index();
   codeProgramaX =values[1]//aUbic[idEspPrograma];

   console.log("1)espPrograma = "+espPrograma);
   console.log("2)idEspPrograma = "+idEspPrograma);
   console.log("3)codeProgramaX = "+ codeProgramaX);


  }

function seleccionEspecialidad(select){

 var values=$("#sel_sede").val().split('-');
 espPrograma = $("#sel_sede").find('option:selected').text();
 idEspPrograma = values[0];$("#sel_sede").find('option:selected').index();
 codeProgramaX =values[1]
//console.log();

}//*/



          function ultimoPrograma()
          {

            //----------------------PARAMETROS PARA EL SERVICIO LISTAR PROGRAMAS DE AUDITORIA-------------------------------
            var apiurlaccessregistriesTemp = apiurlAuditoria+"";//apiurlaccessregistries
            var servicioGp = "/api/Get-Programa_Auditoria-All?"//    "/api/Get-SecurityAgent-All?";
            var apiKeyxGp = "r$3#23516ewew5"; //constantes.apiKey;
            var metodoHttpGp = "objectlist";
            var metodoAjaxGp =  "GET"; //"POST";
            var GetSecurityAgentAllxx = "X4XURduZbR20wwsOaEVVs4trLnrmd4mfO3KtqksohFm5bQQPqoO10g==";
            var patametrosGp = "&code="+GetSecurityAgentAllxx;//"&code="+GetSecurityAgentAll;
            //----------------------PARAMETROS PARA EL SERVICIO LISTAR PROGRAMAS DE AUDITORIA-------------------------------


                var url = apiurlaccessregistriesTemp+servicioGp+patametrosGp+"&httpmethod="+ metodoHttpGp;
                // prompt("url",url);

                var headers ={
                    "apikey":apiKeyxGp
                }


              //----------------------------------------------------------- --------------------------------------------- --------------------------------------- -------------------
                  $.ajax({
                    method: metodoAjaxGp,
                    url:  url,
                    headers:headers,
                    crossDomain: true,
                    dataType: "json"
                  }).done(function(data)
                  {
                    //console.log(data);
                    data.map(function(item)
                    {
                      // alert("item.Id ("+item.Id +") > NewProgram("+NewProgram+") =="+item.Code);
                      if((item.Id > NewProgram)&&(item.StatusId == 1))
                      {
                        NewProgram = item.Id;
                      }

                    });

                    //alert(NewProgram);
                    vw_secury_agent.init();
                    //NewProgram = 0;

                  });


}

function verModalxx()
{
  $('#modalExitoGuuardaProgramaAuditoria').modal('show');
}

function buscarSearch()
{
 //alert("Esta funcionalidad esta programada, busca pero no filtra, SERVICIO BACKEND PENDIENTE");
 //capturas los parametros y vas a la base de datos

    //lo que este en blanco no va
    //igual a BlackList solo que el servicio cambia ahora envia datos


    var idPr = $("#tx_id_program").val();
    var feDsd = $("#tx_fecha_ini").val().split('/').reverse().join('-');
    var FeHst = $("#tx_fecha_fin").val().split('/').reverse().join('-');
    var cEdo = $("#sel_estado").find('option:selected').index();
    var sig = 0;
    var lbx = "";

        if((idPr== "")&&(feDsd=="")&&(FeHst=="")&&(cEdo == 0))
        {//----------------------entonces no hay nada de buscar para que voy al servidor --------------------
          //alert("En Blanco estdaoxxxx="+cEdo);
          //swal("Error!", "No existen parametros definidos para la Busqueda.", "error");
            sig = 1;
        }else{sig = 1;}

        if(sig == 1){
          //******************************** vamos entonces a armar el body para la consulta**********************************************/
          $('#body-tabla-list').html("");
          var jj = 0;

          var now = moment().format('YYYY-MM-DD');
              //alert("entrando a tableBlackList,,,,");
            //----------------------PARAMETROS PARA EL SERVICIO LISTAR PROGRAMAS DE AUDITORIA-------------------------------
            var apiurlaccessregistriesTemp = apiurlAuditoria+"";//apiurlaccessregistries
            var servicioGp = "/api/Get-Programa_Auditoria-All?"//    "/api/Get-SecurityAgent-All?";
            var apiKeyxGp = "r$3#23516ewew5"; //constantes.apiKey;
            var metodoHttpGp = "&httpmethod=objectlist";
            var metodoAjaxGp =  "GET"; //"POST";
            var GetSecurityAgentAllxx = "code=X4XURduZbR20wwsOaEVVs4trLnrmd4mfO3KtqksohFm5bQQPqoO10g==";
            var patametrosGp = "&httpmethod=objectlist";
            //----------------------PARAMETROS PARA EL SERVICIO LISTAR PROGRAMAS DE AUDITORIA-------------------------------

            var url = apiurlaccessregistriesTemp+servicioGp+GetSecurityAgentAllxx+metodoHttpGp;

              // var url = apiurlaccessregistries+"/api/Get-SecurityAgent-All?httpmethod=objectlist&code="+GetSecurityAgentAll+"";
            // var url=apiurlblacklist+"/api/Get-Blacklist-Log?code="+getblacklistlogcode+"&httpmethod=objectlist&search_type=1&id_blacklist="+id;
            //&Fecha_Desde=2020-09-26&Fecha_Hasta=2020-09-30

            //--------------------------------------------- ok vamos a construir la url ---------------------------------------

              if(idPr!= "")
              {
                url = url+"&vvcode="+idPr;
                console.log(url);
              }

              if(feDsd!= "")
              {
                url = url+"&Fecha_Desde="+feDsd; console.log(url);
              }

              if(FeHst!= "")
              {
                url = url+"&Fecha_Hasta="+FeHst; console.log(url);
              }

              if(cEdo!= "")
              {
                url = url+"&StatusId="+cEdo; console.log(url);
              }

                console.log("############################## ************* buscandooooo.........************##########################");
                console.log(url);



              showLoading();

                //prompt("code = ", url);


                var headers ={
                    "apikey":apiKeyxGp
                }

                console.warn("url -> " , url )
                $.ajax({
                method: "GET",
                url:  url,
                headers:headers,
                crossDomain: true,
                dataType: "json",
            }).done(function (response) {
                let type = '';
                // console.warn("response.length -> ", response.length)
                // console.table(response)
                // $('.body-tabla').addClass('hidden')
                // $('#cantidad').text(response.length)
                // aUbicx2 = response;//cargamos al array el listado nuevo

                // response.forEach((Item)=>{
                //   alert("aaaaaaaaaaaaaaaaaa");

                //     //let fecha = moment(`${Item.last_updated_date}`).format("DD/MM/YYYY");
                //     var yeark        = moment(Item.FechaCreacion).format('YYYY');//dddd
                //     var month       = moment(Item.FechaCreacion).format('MM');//
                //     var day         = moment(Item.FechaCreacion).format('DD'); ;
                //     var startDate               = " "+day +"/"+ month +"/"+yeark;
                //     var datec=startDate;

                //     alert(datec);



                //           yeark       = moment(Item.Last_Updated_Date).format('YYYY');//dddd
                //           month       = moment(Item.Last_Updated_Date).format('MM');//
                //           day         = moment(Item.Last_Updated_Date).format('DD'); ;
                //           startDate               = " "+day +"/"+ month +"/"+yeark;
                //     var dater=startDate;

                //     var bcod = "'"+Item.Code+"'";


                //     aUbicx[jj] = bcod; jj++;
                //     if(Item.StatusId == 5){lbx = "Ver Auditorías";}else{lbx = "Ingresar Auditorías";}

                //     if(Item.type_id == 0){
                //         type = 'Programado';
                //     }
                //     $('#body-tabla-list').append(`<div class="item-tabla p-2" style="z-index: 1;display:relative;"><div class="check-blue3 text-center">Nuevo</div>
                //     <div class="row m-0 justify-content-between align-items-center">
                //         <div class="col-md-1" >${Item.Code}</div>
                //         <div class="col-md-1" >${Item.DescriptionEspecialidad}</div>
                //         <div class="col-md-1" >${datec}</div>
                //         <div class="col-md-1  text-center" >${Item.Cantidad_Correcciones}</div>
                //         <div class="col-md-1  " >${Item.Evaluador_name?Item.Evaluador_name:'    -----'}</div>
                //         <div class="col-md-2" >${dater}</div>
                //         <div class="col-md-1" >${Item.DescriptionStatus}</div>

                //         <div class="col-md-2 d-flex justify-content-end" >
                //           <button class="btn btn-green-lime" style=" width: 7.563rem; height: 2.125rem; font-size: 0.75rem; color: #565933;"  onclick="vistaAuditorias(${Item.Id},${bcod},${Item.EspecialidadId});" >
                //               ${lbx}
                //           </button">

                //         </div>
                //     </div>
                // </div>`)

                // })

                if (response.length > 0) $("#bodyTablaSinPrograma").css("display", "none");
                else $("#bodyTablaSinPrograma").css("display", "block");

                  // alert(response.length)
                  $("#cantidad-programa").html('<img src="images/iconos/copia-1.svg" class="copia-1"> '+response.length+' ');
                  $('#body-tabla-list').html(" ");
                  // alert(response.length)

                    hideLoading();//font-size: 11.9px; letter-spacing: 0.10px; line-height: 1.64;
                    $('#pagination-container-programa').pagination({
                            dataSource: response,
                            pageSize: 5,
                            callback: function(data, pagination) {
                                var html = templatetableBlackList2(data);
                                $('#body-tabla-list-programa').html(html);
                            }
                        })











                //hideLoading();
            })//letter-spacing: 0.10px; line-height: 1.64;


        }//******************************** vamos entonces a armar el body para la consulta**********************************************/

//console.log(idPr);console.log(feDsd);console.log(FeHst);console.log(cEdo);



//limpiamos la tabla para presentar los resultados
//$('#body-tabla-list').html("");

}



function templatetableBlackList2(data){
  var html = '';
  let type = '';
  var jj = 0;
  var lbx = "";
  var now = moment().format('YYYY-MM-DD');
        //alert("Quien me llama");

        console.log("#################################################--  LISTADO DE PROGRAMAS  #######################################")
        console.log("DATA -> ",data)
        console.log("#################################################--  LISTADO DE PROGRAMAS  #######################################")


   //Ini_______vamos a recorrer para ver cual es la última auditoría
   var MayorAud = 0;
   data.forEach((Item)=>{
       var iiaudd = parseInt(Item.Id);
       //alert(Item.StatusId+'=status, PlanId = '+Item.PlanId)
       if((Item.StatusId == 1))// StatusId Asignada , en atencion y en ejecucion quiere decir que tiene pla, n puede ser nueva
       {
           //alert(Item.StatusId+'=status, PlanId = '+Item.PlanId)
           if(iiaudd > MayorAud)
           {
               MayorAud = iiaudd;
           }
       }
   })
   //Fin_______vamos a recorrer para ver cual cual es la última auditoría

  data.forEach((Item)=>{

    console.log(Item);

      //let fecha = moment(`${Item.last_updated_date}`).format("DD/MM/YYYY");
      var yeark       = moment(Item.FechaCreacion).format('YYYY');//dddd
      var month       = moment(Item.FechaCreacion).format('MM');//
      var day         = moment(Item.FechaCreacion).format('DD'); ;
      var startDate               = " "+day +"/"+ month +"/"+yeark;
      var datec=startDate;

      yeark       = moment(Item.Last_Updated_Date).format('YYYY');//dddd
      month       = moment(Item.Last_Updated_Date).format('MM');//
      day         = moment(Item.Last_Updated_Date).format('DD'); ;
      startDate               = " "+day +"/"+ month +"/"+yeark;
      var dater=startDate;

       var bcod = "'"+Item.Code+"'";


      aUbicx[jj] = bcod; jj++;

      if(Item.StatusId == 5){lbx = "Ver Auditorías";}else{lbx = "Ingresar Auditorías";}
      if(Item.type_id == 0){
          type = 'Programado';
      }
     // var cg = Item.Evaluador_name;
     //

     var btNew;   let iidPlan = parseInt(Item.Id);
     //alert(iidPlan);
     if((iidPlan == MayorAud)&&(iidPlan >0))
     {
         btNew = "<div  class='check-blue text-center'>Nuevo</div>"; //btNew ="";//momentaneamente
     }else{var btNew = "";}


     //console.log("estoy verificando listar programa Evaluador_name("+cg+")");
     html += `
      <div class="item-tabla p-2" style="z-index: 1;display:relative;">${btNew}
          <div class="row m-0 justify-content-between align-items-center">
              <div class="col-md-1" >${Item.Code}</div>
              <div class="col-md-2" >${Item.DescriptionEspecialidad}</div>
              <div class="col-md-1" >${datec}</div>
              <div class="col-md-1  text-center" >${Item.Cantidad_Correcciones}</div>
              <div class="col-md-1  " >${Item.Evaluador_name?Item.Evaluador_name:'    -----'}</div>
              <div class="col-md-2" >${dater}</div>
              <div class="col-md-1" >${Item.DescriptionStatus}</div>

              <div class="col-md-2 d-flex justify-content-end" >
                <button class="btn btn-green-lime" style=" width: 7.563rem; height: 2.125rem; font-size: 0.75rem; color: #565933;"  onclick="vistaAuditorias(${Item.Id},${bcod},${Item.EspecialidadId});" >
                    ${lbx}
                </button">

              </div>
          </div>
      </div>`





      //$('#body-tabla-list').append(
      // html += `
      //     <div class="item-tabla p-2">
      //         <div class="row m-0 justify-content-between align-items-center">
      //             <div class="col-md-2 text-center" style="font-size: 13px">${Item.Code}</div>
      //             <div class="col-md-2 text-center" style="font-size: 13px" >${Item.DescriptionUnidadNegocio}</div>
      //             <div class="col-md-1 text-center" style="font-size: 13px" >${Item.DescriptionSede}</div>

      //             <div class="col-md-6" >
      //                 <div class="row">
      //                     <div class="col-md-2 text-center" style="font-size: 13px" >${Item.Code_Normas}</div>
      //                     <div class="col-md-2 text-center" style="font-size: 13px" >${Item.DescriptionAuditoria}</div>
      //                     <div class="col-md-2 text-center" style="font-size: 13px" >${startDate}</div>
      //                     <div class="col-md-2 text-center" style="font-size: 13px" >${endDate}</div>
      //                     <div class="col-md-2 text-center" style="font-size: 13px" >${Item.DescriptionStatus}</div>
      //                     <div class="col-md-2 text-center ${colorLetra}"  style="font-size: 13px" >${Item.DescriptionStatusEvaluacion}</div>
      //                 </div>
      //             </div>

      //             <div class="col-md-1" >
      //                 <div class="row">
      //                     <div class="col-6 text-center" style="font-size: 15px">
      //                         <button class="btn-circleCA border-0" ${disabledBtnAuditor}
      //                             style="background-color: #b2b2b2 !important ; min-width: 2rem; height: 2rem;"
      //                             idProgramaAuditoria="${id_programa_auditoria}" idEspecialidad="${id_codigo_especialidad_programa}"
      //                             nombreProgramaAuditoria="${nombre_programa_auditoria}" Description="${Item.Description}"
      //                             onClick="vw_auditor_list.asignarauditor('${Item.Id}');" >
      //                             <img src="./images/iconos/usuario1.svg" class="ojo-1" style>
      //                         </button>
      //                     </div>

      //                     <div class="col-6 text-center" style="font-size: 15px">
      //                         <button type="button"
      //                             id="btnVerAuditoria_${Item.Id}"
      //                             idProgramaAuditoria="${id_programa_auditoria}" idEspecialidad="${id_codigo_especialidad_programa}"
      //                             nombreProgramaAuditoria="${nombre_programa_auditoria}"
      //                             Code="${Item.Code}" CodeUnidadNegocio="${Item.CodeUnidadNegocio}"
      //                             Description="${Item.Description}" StatusEvaluacionId="${Item.StatusEvaluacionId}" created_by="${Item.created_by}"
      //                             DescriptionUnidadNegocio="${Item.DescriptionUnidadNegocio}" DescriptionAuditoria="${Item.DescriptionAuditoria}" Code_Normas="${Item.Code_Normas}"
      //                             DescriptionSede="${Item.DescriptionSede}" SedeId="${Item.SedeId}" CodeSede="${Item.CodeSede}" Inicio="${startDate}" Fin="${endDate}"
      //                             Inicio2="${moment(Item.Inicio).format('L')}" Fin2="${moment(Item.Fin).format('L')}"
      //                             StatusId="${Item.StatusId}" DescriptionStatus="${Item.DescriptionStatus}"
      //                             TipoId="${Item.TipoId}" onClick="verAuditoria('${Item.Id}')" class="btn-circleCA border-0" style="background-color: #373e68">
      //                             <img src="./images/iconos/ojo_1.svg" class="ojo-1">
      //                         </button>
      //                     </div>
      //                 </div>
      //             </div>

      //         </div>
      //     </div>`
      //)

  });

  html += '';//hideLoading();
  return html;

}







function verModalErrorSp1(subTitulo, msg)
{

  //alert("error");
  $('#subTituloError').html(" ")
  $('#subTituloError').html('<b>'+subTitulo+'</b>'); //cerrarModal

  $('#mensajeError').html(" ")
  $('#mensajeError').html('<p>'+msg+'</p>'); //cerrarModal


  cerrarModal('modal-save');
  $('#modalExitoGuuardaProgramaAuditoria2').modal('show');



}


