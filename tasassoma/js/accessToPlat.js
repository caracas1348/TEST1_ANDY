var jsonExternalCompany = [];
var jsonLocation=[];
var jsonPersonBlaclist = [];
var oTableBlackList;
var oTableHistorytest;
var searchAct=0;//valida que se haya hecho busqueda
var lengList=1;
var vw_access_plat = function(){
 
    var init = function()
    {
      moment.locale('es');
      ///cagamos todas las personas qiue están en la tabla blacklist_user
      getPersonBlackList();
     // getExternalCompany();
      //---------------------------------------
       /* $("#tx_access_dni").keypress(function(event) {
        	if(event.keyCode == 13){
            if($("#tx_access_dni").val()!="")
        		searchUser($("#tx_access_dni").val());
        	}
        });*/

        /* $("#tx_date_start_1").datetimepicker({
          timepicker:false,
          format:'d/m/Y',
          minDate: 0
        });*/

        $("#tx_access_dni_list").keyup(function(event) {
          oTableBlackList.search($(this).val()).draw();
          //console.log($(this).val())
          if($(this).val()=="")//limpia filtro buscado
          oTableBlackList.search( '' ).columns().search( '' ).draw();
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

        /*$("#btnHabilitado").click(function(){
          $("#btnHabilitado").addClass('buttonActive');
          $("#btnVetado").removeClass('buttonActive ');
        });*/
        /*
        $("#btnVetado").click(function(){
          $("#btnVetado").addClass('buttonActive');
          $("#btnHabilitado").removeClass('buttonActive ');
        });
        */
        getAreas(-1,1);
        getExternalCompany();
        getLocations();
        
        //getCollaborator($("#add_covid_firtname_1"),1); 
        
        

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

        //var group = getCookie("vtas_type_usergroup"); 
        
        var nowdate = moment().format("DD/MM/YYYY");
      $('#tx_date_init').val(nowdate);
     
        $('#tx_date_init').datetimepicker({       
            format:'d/m/Y',
            onShow:function( ct ){          
                this.setOptions({
                    maxDate:moment($('#tx_date_end').val(),'DD/MM/YYYY').format("YYYY-MM-DD")?moment($('#tx_date_end').val(),'DD/MM/YYYY').format("YYYY-MM-DD"):false
                })
            },
            timepicker:false
        });
        $('#tx_date_end').val(nowdate);
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
          jsonExternalCompany.push({name:"Tasa",id:0})
          //list.push({label:toCapitalize(item.name),value:toCapitalize(item.name),id:item.id})
          selectExternalCompany($("#sel_company_1"),1);
          selectExternalCompany($("#sel_company"),0,'filter');
          //auto completar
          autocompletarExternalCompany($("#ruc_company_1"),1);
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

  var selectExternalCompany = function(obj,leng,filter)
  {
   
    if(filter=="filter")
    {
    var option = "";
    option+="<option value='0'>Todos</option>";  
    jsonExternalCompany.map(function(item){
        option+="<option value='"+item.name+"'>"+item.name+"</option>";
    });
    option+="<option value='Tasa'>Tasa</option>";
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
        $("#sel_company_"+leng+''+leng).val(ui.item.id);
        
        
        //if(ui.item.id==0 || ui.item.id=='Tasa' || ui.item.id=='tasa' || ui.item.id=='TASA')
        getCollaborator($("#add_covid_firtname_"+leng),leng);
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
        option+="<option value='0'>Selecione</option>";
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
           
            vw_black_list.thumbsUp(globalBlackLists[pos].id,veto_status,globalBlackLists[pos].name,globalBlackLists[pos].name_external_company,globalBlackLists[pos].person_picture,globalBlackLists[pos].reason,globalBlackLists[pos].reason,globalBlackLists[pos].reason ,globalBlackLists[pos].check_in,globalBlackLists[pos].covid_test,globalBlackLists[pos].is_collaborator,globalBlackLists[pos].created_date);                    
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
      var leng = 0;
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

          if(typecontact != 'colaborador' && values[4].toLowerCase() != "tasa" && values[1]!="001654671" && values[1]!="001654672" && values[1]!="001444147" && values[1]!="003353982" )
          {
            //consultamos ois de la empresa          
            var req= checkOis(values[1],leng);
            if(req.enabled_status==false || req.enabled_status ===undefined){
              jsonCheckCompanyOis.name = values[1];
              jsonCheckCompanyOis.ruc = values[0];
              arrayCheckCompanyOis.push(jsonCheckCompanyOis);            
            }          
          }

          //console.log(values)
         
          /*else if(id_company=="-1")
          {flag=1;     validatefield="Verificar o Eliminar las Empresas que no tengan Declaración Jurada COVID-19" ; compamiesOid.push(name_company) }
          */
          if(typecontact == 'colaborador')
          var is_collaborator = 1;
          else
          var is_collaborator = 0;
 
            //console.log(id_company,name_company,idColaborador,fullname,document,id_location,name_location,id_area,name_area,is_collaborator);

          partipante ={
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
          ,covid_test:1//1-> pendiente, 2->realizada
          ,id_area:id_area
          ,ruc:ruc
          ,name_area:name_area
          ,id_company:id_company
          ,name_company:toCapitalize(name_company)
          ,id_location:id_location
          ,name_location:name_location
          ,fecha:fecha
          }
          authorizedPersons.push(partipante);
      });
     // console.log(arrayCheckCompanyOis);
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
      },function(){
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
         

        var estatus = $("#sel_status")[0]?$("#sel_status").val():0;
        var type    = $("#sel_type")[0]?$("#sel_type").val():0;      
        var company =  $("#sel_company")[0]?$("#sel_company").val():0;        
        var array   = $("#sel_sede")[0]?$("#sel_sede").val().split("-"):0;
        var sede    = array[0]?array[0]:0;
        var area    = $("#sel_area")[0]?$("#sel_area").val():0;
        var desde   = $("#tx_date_init").val();
        var hasta   = $("#tx_date_end").val();
        
       /*  if(initListCovid==0 && getCookie("vtas_sede") &&  getCookie("vtas_sede")!="")//l aprimera vez busca por la sede logueada
        {
          initListCovid=1;
          sede=getCookie("vtas_sede");
        } */
        
        var now     = moment().format('YYYY-MM-DD');
        var list_type = 2;//covid 19
        var url         = apiurlblacklist+"/api/Get-Blacklist-User?httpmethod=objectlistaccess&code="+getblacklistusercode+"&list_type="+list_type+"&status="+estatus+"&type="+type+"&company="+company+"&sede="+sede+"&area="+area+"&date_init="+desde+"&date_end="+hasta;
        var headers ={
            "apikey":constantes.apiKey
        }
        var moduleExam=$("#modalRegisterCovidTest")[0];
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
                "sZeroRecords":    "No se encontraron resultados",
                "sEmptyTable":     "Sin resultados",
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
                  showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.");
          
                  return;
                  hideLoading();
              },
                dataSrc: function ( req ) 
                {
                    hideLoading();
                    $("#cantTotalCovid19").text(req.length);                    
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
                        //fecha de entrada 
                        var week        = moment(item.check_in_datetime).format('dddd');//dddd
                        var month       = moment(item.check_in_datetime).format('MMMM');//
                        var day         = moment(item.check_in_datetime).format('D'); ;
                        var startDateInit = week +" "+day +" de "+ month;
                        var dateInt       = startDateInit;
                        //---------------------------------------------------------

                        //fecha de salida 
                        var week        = moment(item.check_out_datetime).format('dddd');//dddd
                        var month       = moment(item.check_out_datetime).format('MMMM');//
                        var day         = moment(item.check_out_datetime).format('D'); ;
                        var startDateOut = week +" "+day +" de "+ month;
                        var dateOut       = startDateOut;

                        var dateOut=item.check_out_datetime=="0001-01-01T00:00:00"?'-':startDateOut;

                        
                        //---------------------------------------------------------
                        //hora de entada
                        var timeIn = moment(item.check_in_datetime).format('LT');
                        //-----------------------------------------------------------
                        //hora de entada
                        var timeOut = item.check_out_datetime=="0001-01-01T00:00:00"?'-':moment(item.check_out_datetime).format('LT');
                        //-----------------------------------------------------------
                        //temperatura entrada 
                        var tempIn = item.temperature_in;
                        ///----------------------------------------------------------
                        //temperatura salida
                        var tempOut = item.temperature_out; 
                        ///----------------------------------------------------------
                        var ingreso = item.check_in==0?'(NO)':'(SI)';

                        if(new Date(item.check_in_datetime)>new Date(item.check_out_datetime))
                        {
                          var dateOut="-";
                          var timeOut='-';
                        }
                        

                        var area = item.name_area?toCapitalize(item.name_area):"No Asignado";
                        //console.log(item.name_external_company,item.person_picture);
                        var companys=item.name_external_company?toCapitalize(item.name_external_company):'-';
                        var name="'"+toCapitalize(item.name)+"'";
                        var statusColor="";                        
                        if(item.covid_test==1 && item.veto_status==0)
                        {
                          var textStatus="Pendiente";
                          statusColor ="statusPperDatostx";
                          cantCovid1++;
                        }
                       
                        else
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
                          
                        }
                        if(item.is_collaborator)
                        {
                          cantCovid3++;
                        }
                        else{
                          cantCovid4++;
                        }
                        
                         //console.log(moduleExam)
                        var tooltipVetado = '';
                        if(item.attribute5)
                          tooltipVetado = 'data-toggle="tooltip" data-placement="top" title="'+item.attribute5+'"';
                        var img = item.person_picture?item.person_picture:"images/iconos/user.svg"; 
                        var buttomDetail= moduleExam?'<img height="24" src="images/iconos/newExam.svg">':'<i class="material-icons btdetail" style="cursor:pointer " >more_vert</i>'                      
                        
                        var row = {
                            icon            : '<div  class="card border-0 h-0  m-0 bg-muted p-0"  style="cursor:pointer;box-shadow:0 0px 0px 0 rgba(0, 0, 0, 0.0), 0 0px 0px 0px rgba(0, 0, 0, 0), 0 0px 0px 0 rgba(0, 0, 0, 0)!important;"><div class="row"><div class="col-md-1 mt-0"> <img class="rounded-circle" src="'+img+'" height="56"></div> <div class="col-md-11 ">   <div class="card-body p-0 "><span class="card-title h4 text-uppercase hoverItem"></span> </div> </div></div> </div>' //
                            ,name           : item.covid_test==1?'<div style="cursor:pointer" class="hoverItem" onclick="vw_covid_list.thumbsUp('+item.id+','+item.veto_status+','+name+',&quot;'+item.name_external_company+'&quot;,&quot;'+img+'&quot;,&quot;'+item.reason+'&quot;,'+item.id_area+','+item.id_company+','+item.id_location+',&quot;'+item.name_area+'&quot;,&quot;'+item.name_location+'&quot;,&quot;'+toCapitalize(item.name)+'&quot;,&quot;'+item.identity_document+'&quot;,&quot;'+item.job+'&quot;,'+item.check_in+' ,'+item.covid_test+','+item.is_collaborator+',&quot;'+item.created_date+'&quot;);" >'+(toCapitalize(getCleanedString(item.name)))+'</div>' :'<div style="cursor:pointer" class="hoverItem" onclick="vw_covid_list.showHistory('+item.id+');" >'+(toCapitalize(getCleanedString(item.name)))+'</div>' 
                            ,dni		        : item.identity_document  //
                            ,date_init	    : toCapitalize(dateInt) 
                            ,time_init      : timeIn
                            ,date_end	      : toCapitalize(dateOut) 
                            ,time_end       : timeOut
                            ,in_out         : ingreso
                            ,temp_in        : '<input onfocus="this.className=&quot;inputTempList text-dark&quot;" onBlur="vw_access_plat.save_temperature('+i+','+item.id+')" class="inputTempList" type="number" id="tx_temperature_in_'+i+'" size="4" step="0.1" maxlength="5" name="tx_temperature_in_'+i+'" value="'+tempIn+'" style=" text-align: right;">'//
                            ,temp_end		    : '<input onfocus="this.className=&quot;inputTempList text-dark&quot;" onBlur="vw_access_plat.save_temperature('+i+','+item.id+')" class="inputTempList" type="number" id="tx_temperature_out_'+i+'" size="4" step="0.1" maxlength="5" name="tx_temperature_out_'+i+'" value="'+tempOut+'" style=" text-align: right;">'//tempIn                            
                            ,buttons        : '<button type="button" class="btn btn-info" id="btn_save_temp_'+i+'" onclick="vw_access_plat.save_temperature('+i+','+item.id+')"><i class="fa fa-save"></i></button>'
                        }//item.covid_test==2?'':
                        i++;
                        data.push(row);
                    });                   
                    return data;
                } 
            },//nombre, apellido, dni, empresa, fecha de solicitud y estatus
            columns: [
                { title:"" ,data: "icon",width: "2%", targets: 0,align:"left" ,"orderable": false },
                { title:"Nombre y Apellido",data: "name",width: "20%",align:"left"   },
                { title:"DNI",data: "dni",width: "8%",align:"left","orderable": false},
                { title:"Fecha de entrada",data: "date_init",width: "13%",align:"left" ,"orderable": false},
                { title:"Hora de entrada",data: "time_init",width: "10%",align:"left" ,"orderable": false},
                { title:"Fecha de salida",data: "date_end",width: "13%",align:"left" ,"orderable": false},
                { title:"Hora de salida",data: "time_end",width: "10%",align:"left" ,"orderable": false},                
                //{ title:"Ingreso",data: "in_out",width: "5%",align:"left" ,"orderable": true},
                { title:"Temp. Entrada",data: "temp_in",width: "10%",align:"left" ,"orderable": false },
                { title:'Temp. Salida',data: "temp_end",width: "10%",align:"center" ,"orderable": false },
                { title:"Acción",data: "buttons",width: "4%" ,"orderable": false},
                //{ title:moduleExam?"Tamizaje":"Editar",data: "buttons",width: "7%" ,"orderable": false},
                //{ title:moduleExam?"Historial":'',data: "buttonsHistory",width: "7%" ,"orderable": false}                  
            ],  

            initComplete: function(settings, json) {
            //alert("culminó la carga");
            //$('[data-toggle="tooltip"]').tooltip();    
            $('[data-toggle="tooltip"]').tooltip();  
            }
        });
        
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
    var idEdit;
    var statusEdit;
    var nameEdit;
    var area;
    var company;
    var location;
    var thumbsUp = function(id,status,name,company_name,img,reason,id_area,id_company,id_location,name_area,name_location,nameperson,document,job,check_in,covid_test,is_collaborator,fecha){
      //
      
      var group = getCookie("vtas_type_usergroup"+sessionStorage.tabVisitasa); 
      //alert(group);
      $("#btnValidateOut").hide();
      if (check_in==1 || (status==1 && (covid_test!=1 || covid_test!=0 || covid_test!=null  )) || group=="colaborador") 
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
      
     
      if((status==1 && covid_test ==2) || (status==0 && covid_test ==2) )
      {
        $("#btnSolicitudTamizaje").show();
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
        $("#btnValidateIn").hide();
        $("#btnNoAuthorizedeIn").hide();
      }

    	if (status==1) {
        $("#butEditBlack").text("Retirar de lista")
        var text = "El usuario será restituido.";
        $("#butEditBlack")[0].className="btn btn-green-lime btn-rounded btn-raised";
        
    	}else{
        $("#butEditBlack").text("Enviar")
        $("#butEditBlack")[0].className="btn btn-danger btn-rounded btn-raised";
    		var text = "El usuario será dado de baja.";
      }
      $('#tx_reasonedit').text(reason);
      $('#nameedit').text(name);      
      var moduleExam=$("#modalRegisterCovidTest")[0];
      if (!moduleExam) {
        $('#modalEditBlacklist').modal('show');
      }else{
        $('#modalRegisterCovidTest').modal('show');
      }
      
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

      $("#hid_is_collaborator").val(is_collaborator);     
      $("#hid_id_area").val(id_area);
      $("#hid_id_location").val(id_location);  
      $("#hid_id_company").val(id_company); 
      //alert(company_name);
      $("#hid_name_company").val(company_name); 
      
      $("#company").text(company_name!='null'?company_name:'No asignado');
      $("#area").text(name_area!='null'?name_area:'No asignado');
      $("#local").text(name_location!='null'?name_location:'No asignado');
      $("#tx_nomape").val(nameperson);
      $("#tx_docum").val(document!='null'?document:'');
      //alert(job);
      $("#tx_ocupacion").val(job!='null'?job:'');
      fecha = moment(fecha).format("DD/MM/YYYY");
      $("#tx_date_tamizaje").val(fecha);
     
    }

    var confirmSaveCheckInCovid19 = function(enter){
      /*swal({
        title: "Confirmación",
        text: "¿Estás seguros de validar el ingreso?",        
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn-danger btn-sm",
        confirmButtonText: "Si",
        cancelButtonText: "No",
        closeOnConfirm: true
      },
      function(){    
        //aqui va
        //        
        validatedni2();
        //swal("Operación exitosa", "Proceso realizado con exito", "success");
      });*/
      
      var val =$("#tx_docum").val();
      var name_company = $("#hid_name_company").val();      
      if(name_company.toLowerCase() != "tasa" &&  enter==1 && val!="001654671" && val!="001654672" && val!="001444147" && val!="003353982" )
      {
        //return;
        checkOisSeguridad(val,enter);
      }
      else
        validatedni2(enter);
     
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
        ,covid_test:1//1-> pendiente, 2->realizada
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
      var dni = $("#tx_docum").val();
      var fullname = $("#tx_nomape").val();
      var option ="verifyblacklistDni";
      if(dni.trim().length==0)
        option ="verifyblacklistName";
     
      var identity_document = dni;
      var name = fullname;
      var url = apiurlblacklist+"/api/Get-Blacklist-User?code="+getblacklistusercode+"&httpmethod="+option+"&identity_document="+identity_document+"&name="+name;                   
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
                  
          if (data.vetado == 1 && enter==1) 
          {
              swal("Acceso Denegado", data.message, "error");
          }
          else
          {
            //buscamos persona de alto riesgo
            var match = "DNI";
            var dataRiesgo = checkRiskList(identity_document);
            
            if(dataRiesgo.length>0 && enter==1)
            {
              swal("Acceso Denegado","Usuario en Grupo de Riesgo", "error");
            }
            
            else if(data.vetado == 0 && data.error==false && data.check_covid== true && enter==1)
            {     
              if(enter==1){var textin="Ingreso Permitido"} 
              if(enter==0){var textin="Salida Registrada"}               
              swal({
                title: textin,
                text: data.message,
                type: "success",
                showCancelButton: false,
                confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
                confirmButtonText: "De acuerdo",
                closeOnConfirm: false
              },
              function()
              {
                saveCheckInCovid19(idEdit,enter);                   
              });
              //confirmNoauthorizedCovid19(enter,idEdit)//donde se solicita temperatura
            }
            else if(enter==0)
            {

              var flag=0;
              var validatefield="";
                 
                  if($("#tx_temoOUT").val()=="")
                  {flag=1;     validatefield= "Debe ingresar "+"Temperatura de salida";       }
                  
         
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

              $("#modalEditBlacklist").modal("hide");
              if(enter==1){var textin="Ingreso Permitido"} 
              if(enter==0){var textin="Registrar Salida"}               
              swal({
                title: 'Salida',
                text: "Salida Autorizada",
                type: "success",
                showCancelButton: false,
                confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
                animation: "slide-from-top",
                closeOnConfirm: false
              },
              function()
              {
                saveCheckInCovid19(idEdit,enter); 

              });

            }
          }
          setTimeout(function(){
            hideLoading(); 
          },500);
      }).fail( function( jqXHR, textStatus, errorThrown ) {
        setTimeout(function(){
          hideLoading(); 
        },500);
      });
    }
    
    
    var saveCheckInCovid19 = function(id,enter,temp){ 
      //return;   

      if(temp)
        var temperature=temp;
      else
        var temperature=  $("#tx_temperature").val();
     
      var url = apiurlblacklist+"/api/Post-Blacklist-User?code="+postblacklistusercode+"&httpmethod=checkincovid&id="+id+"&enter="+enter+"&temperature="+temperature;                   
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
        //swal("Operación exitosa", "Proceso realizado con exito", "success");
        $("#modalNonAuthorized").modal("hide");
        swal.close();
            setTimeout(function(){
              swal("Exito!", "Operación satisfactoria.", "success");
            },500)
        tableBlackList();
        $("#modalEditBlacklist").modal("hide");
      });  
    }

    var thumbsUpregister = function(){
      //alert("thumbsUpregister ");
      var moduleExam=$("#modalRegisterCovidTest")[0];
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
      var fecha =  $("#tx_date_tamizaje").val(); 
      //alert(vetoStatus +" - "+reason);
     // return;
    

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
        title:moduleExam? "Registro Exámen":"Editar Datos",
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
       
      //var name = getCookie('vtas_fullname');
      var responsible = getCookie('vtas_id'+sessionStorage.tabVisitasa);

      if (!moduleExam) {
        var url = apiurlblacklist+"/api/Post-Blacklist-User?code="+postblacklistusercode+"&httpmethod=putcovid&id="+idEdit;
        var body ={ 
          "job":tx_ocupacion,                
          "name":nameperson,
          "identity_document":identity_document,
          "list_type": 2,
          "last_updated_by": getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
          "fecha":fecha
          //"name_doctor":getCookie("vtas_fullname")
        }
      }else{
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
          "fecha":fecha
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
           
            vw_black_list.reloadtableBlackList(tableBlackList());
            if (!moduleExam)
              $('#modalEditBlacklist').modal('hide');
            else
            {
              $('#modalRegisterCovidTest').modal('hide');
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
          }else{
            swal("Error!", "No se ha podido actualizar la lista.", "error");
          }

        });

    });
  
		    
          
    }

    var save_temperature =  function(pos,id){
      var temp_int    = $("#tx_temperature_in_"+pos).val();
      var temp_out    = $("#tx_temperature_out_"+pos).val();  
      
      if(temp_int!="" || temp_out!="")
      {
      var updated_by  = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
      //alert(id,updated_by);
      var option      = "savetemperature";
      var url = apiurlblacklist+"/api/Post-Blacklist-User?code="+postblacklistusercode+"&httpmethod="+option+"&temp_in="+temp_int+"&temp_out="+temp_out+"&id="+id+"&last_updated_by="+updated_by;                   
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
        if(data.id>1)
        {
          if($("#tx_temperature_in_"+pos)[0])
          {
            if($("#tx_temperature_in_"+pos).val()!="")
              $("#tx_temperature_in_"+pos)[0].className="inputTempList text-success";
          }

          if($("#tx_temperature_out_"+pos)[0])
          {
            if($("#tx_temperature_out_"+pos).val()!="")
              $("#tx_temperature_out_"+pos)[0].className="inputTempList text-success";
          }

         /*  setTimeout(function(){
            swal("Exito!", "Operación satisfactoria.", "success");
          },500); */
        }

        else{
          setTimeout(function(){
            swal("warnig!", "Se ha producido un problema. Vuelva a intentar", "warnig");
          },500);
        }
        
      });
    }

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
      });
  }

    var addContact = function(EMPRESA,NOMBRE,APELLIDO,DOCUMENTO,SEDE,AREA,OCUPACION,FECHA,COMPANYID,RUC,TYPECONTACT){ 
         
      var leng = $("#tb_tbody_covid_list").find("tr.row_covid").length;
      //alert(leng);
      //var type_contact = $("#sel_type_contact").val();
      if(EMPRESA && lengexcel==0)
      {
       // console.log(COMPANYID)
        $("#ruc_company_1").val(RUC);
        $("#sel_company_1").val(EMPRESA);
        $("#sel_company_11").val(COMPANYID);
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
        $("#tx_date_start_1").val(FECHA);
        getAreas('',leng,AREA)
        lengexcel++;

        
        if(TYPECONTACT=='contratista'){
          $("#add_covid_dni_1").blur(function(){
            var dni = $(this).val();                  
            if(dni.trim().length>0)
              checkOis(dni,1);
          });
          if(DOCUMENTO!=null)
          {
            var dni = $("#add_covid_dni_1").val();
            checkOis(dni,1);
          }
        }
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
                    <input type="text" class="form-control" id="ruc_company_${leng}" maxlength="30" value="${RUC?RUC:''}"  onfocus="if (this.value!='') this.value='';$('#ruc_company_${leng}${leng}').val('');">                                                     
                    <small class="text-white">Validations</small>
                    </div>
                  </td>
                  <td>
                    <div class="form-group bmd-form-group" style="padding-top:0!important"> 
                    <input type="text" class="form-control autocompletecollaborator" id="sel_company_${leng}" maxlength="30" value="${EMPRESA?toCapitalize(EMPRESA):''}"  onfocus="if (this.value!='') this.value='';$('#sel_company_${leng}${leng}').val(''); $('#sel_company_${leng}')[0].className='form-control'">                                                     
                    <small class="text-white">Validations</small>
                    </div>
                  </td>
                 
                 
                  <td>
                    <div class="form-group bmd-form-group" style="padding-top:0!important">
                      <select name="sel_location_${leng}" class="form-control" id="sel_location_${leng}"value="${SEDE?SEDE:''}">Seleccione</select>
                      <small class="text-white">Validations</small>   
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
                      <input type="text" maxlength="15"  class="form-control" id="tx_date_start_${leng}" value="${FECHA?FECHA:''}">  
                      <input type="hidden" class="form-control" id="sel_company_${leng}${leng}" name="sel_company_${leng}${leng}" value="${!isNaN(COMPANYID)?COMPANYID+'':''}">                                                 
                      <small class="text-white">Validations</small>   
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
                  if(value=='colaborador'){
                    $("#ruc_company_"+leng).val('20100971772');
                    $("#sel_company_"+leng).val('Tasa');                    
                  }
                });

                $("#add_covid_dni_"+leng).blur(function(){
                  var dni = $(this).val();                  
                  if(dni.trim().length>0 && $("#sel_type_contact_"+leng).val()=='contratista')
                    checkOis(dni,leng);
                }); 
                if(DOCUMENTO!=null && $("#sel_type_contact_"+leng).val()=='contratista')
                {
                  var dni = $("#add_covid_dni_"+leng).val();
                  checkOis(dni,leng);
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
    }

    var showHistory = function(id){
      //tb_test_covid_history
      if(oTableHistorytest){
        oTableHistorytest.clear().draw();
        oTableHistorytest.destroy();
      }
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
              hideLoading();
              var data =[];
              var i = 0;
              req.map(function(item)
              {
                 var datar = JSON.stringify(item);
                
                  
                  var attention  = moment(item.attention_date).format('ll');
                  var week        = moment(item.attention_date).format('dddd');//dddd
                  var month       = moment(item.attention_date).format('MMMM');//
                  var day         = moment(item.attention_date).format('D'); ;
                  var startDate               = week +" "+day +" de "+ month;
                  var datec=startDate;
                  var area = item.name_area?toCapitalize(item.name_area):"No Asignado";                    
                  var companys=item.name_external_company?toCapitalize(item.name_external_company):'-';
                  var name="'"+toCapitalize(item.name)+"'";
                  var statusColor="";
                  var ficha = "Negativo";
                  var test_fast = "Negativo";
                  var test_molecular = "Negativo";
                  var vetado       = '<div><i class="fa fa-circle statusPperCoursetx"></i><label style="margin-left:15px">Habilitado</label></div>';

                  
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
                  var row = {
                      fecha           : toCapitalize(datec)//attention 
                      ,antecedent		  : item.antecedent  //
                      ,ficha          : ficha
                      ,test_fast      : test_fast
                      ,test_molecular : test_molecular
                      ,temperature    : item.temperature
                      ,vetado         : vetado                      
                      ,doctor         : item.name_doctor
                      ,tamizaje       :'  <button class="btn " onclick="vw_covid_list.showFichaTamizaje('+item.id+',&quot;'+item.name_location+'&quot;,&quot;'+item.name_area+'&quot;,&quot;'+item.name_company+'&quot;,&quot;'+item.fullname+'&quot;,&quot;'+item.identity_document+'&quot;,&quot;'+item.job+'&quot;,&quot;'+item.temperature+',&quot;,&quot;'+item.antecedent+'&quot;,'+item.status_test_fast+','+item.status_test_molecular+','+item.status+',&quot;'+item.note+'&quot;,'+item.veto_status+',&quot;'+escape(item.attribute5)+'&quot;)"> <img height="24" src="images/iconos/newExam.svg"> </button>'
                  }//item.covid_test==2?'':
                  i++;
                  data.push(row);
              });
              return data;
            }
        },//nombre, apellido, dni, empresa, fecha de solicitud y estatus
        columns: [
            { title:"Fecha de Atención",data: "fecha",width: "20%",align:"left"   },
            //{ title:"Antecedente",data: "antecedent",width: "10%",align:"left","orderable": false},
            { title:"Ficha",data: "ficha",width: "15%",align:"left" ,"orderable": false},
            { title:"Prueba rápida",data: "test_fast",width: "15%",align:"left" ,"orderable": false},
            { title:"Prueba molecular",data: "test_molecular",width: "15%",align:"left" ,"orderable": false},
            { title:"Estatus",data: "vetado",width: "15%",align:"left" ,"orderable": false},
            { title:"Doctor",data: "doctor",width: "20%",align:"left" ,"orderable": false},
            { title:"Tamizaje",data: "tamizaje",width: "8%",align:"left" ,"orderable": false}            
        ],
    });
    }
    var showFichaTamizaje=function(id,location,name_area,company_name,fullname,identity_document,job,temperature,antecedent,status_test_fast,status_test_molecular,status,note,veto_status,obs_vetado)
    {
      //alert("dddd");
      $("#modalViewBlackCovidTest").modal("show");
      var optionLocal = '<option>'+location+'</option>';
      $("#selr_local_history").html(optionLocal);
      var optionArea = '<option>'+name_area+'</option>';
      $("#selr_area_history").html(optionArea);
      $("#txr_company_name_history").val(company_name);

      $("#txr_nomape_history").val(fullname);
      $("#txr_docum_history").val(identity_document);

      $("#txr_ocupacion_history").val(job);

      $("#txr_temperatura_history").val(temperature);
      $("#txr_antecedentes_history").val(antecedent);

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
      $("#selr_status_history").html(optionFicha);
   
      var textStatusFast = "NEGATIVO";     
      if(status_test_fast==1){
        textStatusFast = "POSITIVO";
      }
      if(status_test_fast==2){
        textStatusFast = "NO REALIZADO";
      }
      var optionFast = '<option>'+textStatusFast+'</option>';            
      $("#selr_statusrap_history").html(optionFast);

      var textStatusFMolecular = "NEGATIVO";
      if(status_test_molecular==1){
        textStatusFMolecular = "POSITIVO";
      }
      if(status_test_molecular==2){
        textStatusFMolecular = "NO REALIZADO";
      }
      var optionMolecular = '<option>'+textStatusFMolecular+'</option>';            
      $("#selr_statusmolec_history").html(optionMolecular);


      $("#txr_resultado_history").val(note);

      //alert(veto_status);
      if(veto_status==0){
        $("#label_status_list_9_history").addClass("active");
        $("#label_status_list_9_history").show();
        $("#label_status_list_10_history").hide();
        $("#col_observacion_vetado_history").hide();
        $("#txr_motivo_vetado_history").val("");
      }
      else{
        $("#label_status_list_9_history").hide();
        $("#label_status_list_10_history").addClass("active");
        $("#label_status_list_10_history").show();
        $("#col_observacion_vetado_history").show();
        $("#txr_motivo_vetado_history").val(obs_vetado);
      }
    }

    var removeRowCovid = function(obj){  
   console.log(obj)
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
                    <input type="text" class="form-control" id="ruc_company_1" maxlength="30" value=""  onfocus="if (this.value!='') this.value='';$('#ruc_company_1').val('');">                                                     
                    <small class="text-white"   style="font-size: 11px;">OIS Autorizado</small>                       
                    </div>
                  </td>
                  <td>
                    <div class="form-group bmd-form-group" style="padding-top:0!important">                                                     
                    <input type="text" class="form-control autocompletecollaborator" id="sel_company_1" maxlength="30" value="" onfocus="if (this.value!='') this.value='';$('#sel_company_11').val(''); $('#sel_company_1')[0].className='form-control'">
                    <small class="text-white"   style="font-size: 11px;">OIS Autorizado</small>                                             
                    </div>
                  </td>
                 
                 
                  <td>
                    <div class="form-group bmd-form-group" style="padding-top:0!important">
                      <select name="sel_location_1" class="form-control" id="sel_location_1">Seleccione</select>
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
                      <input type="text" maxlength="10"  class="form-control" id="tx_date_start_1" value="">
                      <small class="text-white"   style="font-size: 11px;">OIS Autorizado</small> 
                      <input type="hidden" class="form-control" id="sel_company_11" name="sel_company_11">                                                    
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
                  if(dni.trim().length>0 && $("#sel_type_contact_1").val()=='contratista')
                    checkOis(dni,1);
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
                  if(dni.trim().length>0  && $("#sel_type_contact_1").val()=='contratista')
                    checkOis(dni,1);
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
                /*$("#add_covid_dni_1").blur(function(){
                  var dni = $(this).val();
                  //alert(dni.trim().length);
                  if(dni.trim().length>0 && $("#sel_type_contact_1").val()=='contratista')
                    checkOis(dni,1);
                });*/
    }
   

  var selectExternalCompanyNewExam = function(obj,leng,filter)
  {

    $(obj).change(function(){
      $("#txr_nomape").focus();
      //$("#add_covid_lastname_"+leng).val("");
      getCollaboratorR($("#txr_nomape")); 
    });

    //autocomplete new
    //se llena la lista para autocompletar
    var list=[];
    jsonExternalCompany.map(function(item){
      list.push({label:item.name,value:item.name,id:item.id})
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
        $("#txr_company_id").val(ui.item.id);
        setTimeout(function(){$("#add_covid_firtname_"+leng).trigger("focusout");},1000)
        
        //if(ui.item.id==0 || ui.item.id=='Tasa' || ui.item.id=='tasa' || ui.item.id=='TASA')
        getCollaborator($("#add_covid_firtname_"+leng),leng);
        

      }

      
  });


  }
    var getLocationsR= function(id_location){ 
        $("#selr_local").append("<option value='-1'>Cargando...</option>");
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
            var obj     = $("#selr_local");            
            obj.empty();
            obj.append(option);
            data.map(function(item){
                option="<option value='"+item.id+"'>"+item.name+"</option>";
                obj.append(option);
            });

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
    getLocationsR();
   // getAreasR();
    selectExternalCompanyNewExam($("#txr_company_name"),0,0);
   /*  $("#selr_local").change(function(){
      getAreasR($(this).val());
    }) */

  }
    var registerBlacklistCovidTest = function()
    {

      //alert("registerBlacklistCovidTest ");
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
      var fecha = moment().format('D/MM/YYYY');
      var sel_statusrap = $("#selr_statusrap").val();
      var sel_statusmolec = $("#selr_statusmolec").val();
      /*alert(sel_statusrap);
      return;*/
      if(name_company=="0-tasa" || name_company=="tasa" || name_company=="Tasa" || name_company=="TASA")
      var is_collaborator = 1;
      else
      var is_collaborator = 0;
      //alert(vetoStatus +" - "+reason);
     
      var flag=0;
      var validatefield="";
          if(id_location==0)
          {flag=1;      validatefield= "Debe ingresar "+"Sede";      }
          else if(name_company=="")
          {flag=1;    validatefield= "Debe ingresar "+"Empresa";       }
          else if(nameperson.length<8)
          {flag=1;       validatefield= "Debe ingresar "+"Nombres y apellidos";     }
          else if(identity_document=="")
          {flag=1;     validatefield= "Debe ingresar "+"Documento de identidad";       }
          else if(tx_temperatura=="")
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
          "covid_test":2,
          "note":tx_resultado,
          "created_by": createdBy,
          "last_updated_by": createdBy,
          "veto_status": vetoStatus,
          "responsible": responsible,
          "name":nameperson,
          "identity_document":identity_document,
          "attribute5":reason,
          "list_type": 2,
          "is_collaborator":is_collaborator,
          "fecha":fecha,
          "name_doctor":name,
          "status_test_fast" : sel_statusrap,
          "status_test_molecular" : sel_statusmolec,
          "veto_fast" : sel_statusrap,
          "veto_molecular" : sel_statusmolec
        }
       // console.log(body);
        
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

    var checkOis = function(dni,leng)
    { 
      dni=ndi.trim()
      $("#validationsIdOiid_"+leng)[0].className="text-white";
      //cheking persona de riesgo

        var dataRiesgo = checkRiskList(identity_document);
            //console.log(dataRiesgo)
            if(dataRiesgo.length>0)
            {
              $("#validationsIdOiid_"+leng)[0].className="text-danger";
              $("#validationsIdOiid_"+leng).text("Persona de riesgo")
              $("#add_covid_firtname_"+leng).val(toCapitalize(dataRiesgo[0].name));
              $("#add_covid_dni_"+leng).val("");              
              return;
            }
      //checking ois
            
      
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
      }).done(function(data){        
        //console.log(data.enabled_status);  
        resp = data;
        if(data.error==1){
          $("#add_covid_dni_"+leng).val("");
          $("#validationsIdOiid_"+leng)[0].className="text-danger";
          $("#validationsIdOiid_"+leng).text("Error:"+data.statusCode+", "+data.messager);
          //$("#add_covid_dni_"+leng).focus();
          return;
        }

        if(data.dni)
        {
          $("#add_covid_firtname_"+leng).val(toCapitalize(data.fullname));
          $("#ruc_company_"+leng).val(data.company_ruc);
          $("#sel_company_"+leng).val(toCapitalize(data.company_name));

          if(data.enabled_status)///habilitado
          {
            console.log("OIS Autorizado")
          }
          else
          {//no habilitado

            console.log("No autorizado OIS")
            $("#add_covid_dni_"+leng).val("");
            $("#validationsIdOiid_"+leng)[0].className="text-danger";
            $("#validationsIdOiid_"+leng).text("OIS No autorizado.")
            $("#add_covid_dni_"+leng).focus()

          }
        }
        else{
          if(dni!="001654671" && dni!="001654672" && dni!="001444147" && dni!="003353982" )//documento sde prueba visualsat
          {
            console.log("No autorizado OIS")
            $("#add_covid_dni_"+leng).val("");
            $("#validationsIdOiid_"+leng)[0].className="text-danger";
            $("#validationsIdOiid_"+leng).text("OIS No autorizado.")
            $("#add_covid_dni_"+leng).focus()
          }
        }


        /*if(data.enabled_status==false || data.enabled_status ===undefined){//si es vacío no existe
          swal("Error","Su empresa no presentó la Declaración Jurada COVID-19","error");  
        }*/
        
      });
      return resp;
    }

    var checkOisSeguridad = function(dni,enter){  
      //alert("checkOis");
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
        console.log(data.enabled_status);    
        if(data.error==1){
          swal("Error en OIS","Error:"+data.statusCode+" - "+data.messager,"error");         
          return;
        }

        if(data.enabled_status==false || data.enabled_status ===undefined){//si es vacío no existe
          swal("Acceso Denegado","Su empresa no presentó la Declaración Jurada COVID-19","error"); 
        }
        else{
          validatedni2(enter);
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
	    reloadtableBlackList:function(){
	      reloadtableBlackList();
	    },
	    thumbsUp:function(id,status,name,company,img,reason,id_area,id_company,id_location,name_area,name_location,nameperson,document,job,check_in,covid_test,is_collaborator,fecha){       
    //683,false,'Abalos Chavez Milton',&quot;Timages/icon,0,0,0,&            quot;null&quot;,&quot;CHIMBOTE     &quot;,&quot;Abalos Chavez Milton&quot;,&quot;null&quot;,&quot;null&quot;,1);   
	      thumbsUp(id,status,name,company,img,reason,id_area,id_company,id_location,name_area,name_location,nameperson,document,job,check_in,covid_test,is_collaborator,fecha);
	    },
	    validate:function(){
	    	validate();
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
      cancelarForm:function(){
	    	cancelarForm();
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
      showFichaTamizaje:function(id,location,name_area,company_name,fullname,identity_document,job,temperature,antecedent,status_test_fast,status_test_molecular,status,note,veto_status,obj_vetado){
        showFichaTamizaje(id,location,name_area,company_name,fullname,identity_document,job,temperature,antecedent,status_test_fast,status_test_molecular,status,note,veto_status,obj_vetado);

      },
      save_temperature:function(i,id){
        save_temperature(i,id);
      }
    }
}();