var otableBlackListE;
var searchAct=0;//valida que se haya hecho busqueda
var searchType=0;
var EditIdAgent=0;
// var espPrograma = "";//variable global que almacena el nombre de la especialidad del programa
// var idEspPrograma = 0;//variable global que almacena el id de la especialidad del programa
// var NewProgram = 0;// variable que me a decir quien es el programa nuevo o ultimo programa creado
// nombreTempPrograma = "";  //variable global, para codigo de programa generado
// //var Codesx = new Array();



//alert("arrancando RegistrarAuditoria");
var vw_secury_agentE = function(){
    var init = function()
    {
      getLocationsE();
      //getExternalCompany();
      getEstadosProgramaE();
       
      //alert("entrando funcion de arranque del modulo evaluar programa");

         $("#tx_access_dni_list").keyup(function(event) 
         {
          otableBlackListE.search($(this).val()).draw();
          if($(this).val()=="")//limpia filtro buscado
          otableBlackListE.search( '' ).columns().search( '' ).draw();
        });

        
        $("#sel_sede_filter").change(function(event) 
        {
         
          console.log(otableBlackListE.search($("#sel_sede_filter  option:selected").text()!="Todas"?$("#sel_sede_filter  option:selected").text():'').draw().context[0].aiDisplay)
          console.log(otableBlackListE.search($("#sel_sede_filter  option:selected").text()!="Todas"?$("#sel_sede_filter  option:selected").text():'').draw().context[0].aoData)
          otableBlackListE.search($("#sel_sede_filter  option:selected").text()!="Todas"?$("#sel_sede_filter  option:selected").text():'').draw();
          
          if($(this).val()=="" || $("#sel_sede_filter  option:selected").text()=="Todas")//limpia filtro buscado
          otableBlackListE.search( '' ).columns().search( '' ).draw();
        });

        $("#text_estado_list").change(function(event) {
          
          otableBlackListE.search($("#text_estado_list  option:selected").text()!="Todos"?$("#text_estado_list  option:selected").text():'').draw();
          if($(this).val()=="" || $("#text_estado_list  option:selected").text()=="Todos")//limpia filtro buscado
          otableBlackListE.search( '' ).columns().search( '' ).draw();
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
            
        $("#bt_buscar_prog").click(function(){

          buscarSearchE();

          
          });
       // alert("al final del arranque inicial");
        tableBlackListE();


        var now = moment().format('01/01/YYYY');
          //$("#tx_fecha_ini").val(now);
          $("#tx_fecha_ini").datetimepicker({
            timepicker:false,
            format:'d/m/Y',
           // defaultDate: now,
           // maxDate:new Date()
          });
          var now = moment().format('DD/MM/YYYY');
         // $("#tx_fecha_fin").val(now);
          $("#tx_fecha_fin").datetimepicker({
            timepicker:false,
            format:'d/m/Y',
            //defaultDate: now,
           // maxDate:new Date()
          });
    }

  

   

  var reloadtableBlackListE = function(){
    if(otableBlackListE)
      otableBlackListE.ajax.reload();
    else
      getLocationsE();
  }
         var globalBlackLists=[];



//---------------------------------------------------------------------- FUNCION PARA LISTAR PROGRAMAS DE AUDITORIAS -------------------------
    

  
//---------------------------------------fin de la funcion listar programas

  

var 	tableBlackListE = function()
{   

  showLoading();
  var jj = 0;

  var now = moment().format('YYYY-MM-DD');
       //alert("entrando a tableBlackListE,,,,"); 
    //----------------------PARAMETROS PARA EL SERVICIO LISTAR PROGRAMAS DE AUDITORIA-------------------------------
    var apiurlaccessregistriesTemp = apiurlAuditoria+"";//apiurlaccessregistries
    var servicioGp = "/api/Get-Programa_Auditoria-All?"//    "/api/Get-SecurityAgent-All?";
    var apiKeyxGp = "r$3#23516ewew5"; //constantes.apiKey;
    var metodoHttpGp = "objectlist";
    var metodoAjaxGp =  "GET"; //"POST";
    var GetSecurityAgentAllxx = "X4XURduZbR20wwsOaEVVs4trLnrmd4mfO3KtqksohFm5bQQPqoO10g==";
    var patametrosGp = "&code="+GetSecurityAgentAllxx+"&Flag_Completada=1";//"&code="+GetSecurityAgentAll;
    //----------------------PARAMETROS PARA EL SERVICIO LISTAR PROGRAMAS DE AUDITORIA-------------------------------

        
   // var NewProgram = 0;// variable que me a decir quien es el programa nuevo
        var url = apiurlaccessregistriesTemp+servicioGp+patametrosGp+"&httpmethod="+ metodoHttpGp; 
        
      // var url = apiurlaccessregistries+"/api/Get-SecurityAgent-All?httpmethod=objectlist&code="+GetSecurityAgentAll+"";                
      //$('#body-tabla-listE').html("");              
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
   
        if (response.length > 0) $("#bodyTablaSinProgramaE").css("display", "none");
        else $("#bodyTablaSinProgramaE").css("display", "block");

  //$("#cantidad-programa").html('<img src="images/iconos/copia-1.svg" class="copia-1"> '+response.length+' ');
  $("#cantidad").html(response.length);
  $('#body-tabla-list').html(" ");
        
          hideLoading();//font-size: 11.9px; letter-spacing: 0.10px; line-height: 1.64; 
          $('#pagination-container-programaE').pagination({
                  dataSource: response,
                  pageSize: 5,
                  callback: function(data, pagination) {
                      var html = templatetableBlackList4(data);
                      $('#body-tabla-list-programaE').html(html);
                  }
              })
    
    })

     //style=" width: 121px; height: 34px; font-size: 11.9px; letter-spacing: 0.10px; line-height: 1.64; color: #565933;"

     
}
//---------------------------------------fin de la funcion listar programas 


 // para el paginado....
 var templatetableBlackList4 = function(data){
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

      if(Item.StatusId == 5){lbx = "Ver Auditorías";}else{lbx = "Evaluar";}
      if(Item.type_id == 0){
          type = 'Programado';
      }
     // var cg = Item.Evaluador_name;
     //

     var btNew;   let iidPlan = parseInt(Item.Id);
     //alert(iidPlan);
     if((iidPlan == MayorAud)&&(iidPlan >0))
     {
        // btNew = "<div  class='check-blue text-center'>Nuevo</div>"; //btNew ="";//comentado, aqui ya no hay nada nuevo solo se debe evaluar
     }else{var btNew = "";}
 
     
     //console.log("estoy verificando listar programa Evaluador_name("+cg+")");
     html += `
      <div class="item-tabla p-2" style="z-index: 1;display:relative;">
      <div class="row m-0 justify-content-between align-items-center">
          <div class="col-md-1" >${Item.Code}</div>
          <div class="col-md-2" >${Item.DescriptionEspecialidad}</div>
          <div class="col-md-1" >${datec}</div>
          <div class="col-md-1  text-center" >${Item.Cantidad_Correcciones}</div>
          <div class="col-md-1  " >${Item.Evaluador_name?Item.Evaluador_name:'    -----'}</div>
          <div class="col-md-2" >${dater}</div>
          <div class="col-md-1" >${Item.DescriptionStatus}</div>

          <div class="col-md-2 d-flex justify-content-end" >
            <button class="btn btn-green-lime" style=" width: 7.563rem; height: 2.125rem; font-size: 0.75rem; color: #565933;"  onclick="vistaEvaluarAuditorias(${Item.Id},${bcod},${Item.EspecialidadId});" > 
                ${lbx}
            </button">

          </div>
      </div>
  </div>`

      
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
            vw_secury_agentE.reloadgetLocationsE();
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




  var getLocationsE= function()
  { 

    // //aqui vamos a cambiar por nuestro servicio....................  vamos a traer las especialidades
    // $("#sel_sede").append("<option value='-1'>Cargando...</option>");
    // $("#sel_sede_filter").append("<option value='-1'>Cargando...</option>");
    //  var  apiurlaccessrequestx= apiurlAuditoria+"";
    //  var  methodx = "GET";//es GET
    //  var apiKeyx = "r$3#23516ewew5";
    //  var typeDatex = "json";
    //  var codex = "tzTo63fygC1rQtqr0mXxg7a9HQ/WFAPI3XaE/h/OBzhZHgIZTqj93Q==";
    //  var httpmethodx = "objectlist";
    //  var serviciox = "/api/Get-Locations-All?";

     
    
    //    //var url = apiurlaccessrequest+"/api/Get-Locations-All?httpmethod=objectlist&code="+getLocationsEAll+"";       
    //    //var url = apiurlaccessrequestx+"/api/Get-Locations-All?httpmethod=objectlist&code="+getLocationsEAll+"";   
    //    //var url = apiurlaccessrequestx+serviciox+"code="+codex+"&httpmethod="+httpmethodx;
    //    //prompt("apiurlaccessrequest",url);
    //    //apiKeyx = constantes.apiKey;
    //    var url = apiurlAuditoria+"/api/Get-Especialidad-All?code=tzTo63fygC1rQtqr0mXxg7a9HQ/WFAPI3XaE/h/OBzhZHgIZTqj93Q==&httpmethod=objectlist";
    //    var i =0;
    // var headers ={
    //     "apikey":apiKeyx        
    // }
    // $.ajax({                    
    //     method:methodx,
    //     url:  url,
    //     headers:headers,
    //     crossDomain: true,
    //     dataType: typeDatex,
    // }).done(function( data)
    // {
    //   // var nCodexx new Array();
    //   //     nCodex[0] = data[0][0];
        
     
    //   aUbic[i] = data[0][0]; 
                                                      


    //   var option = "";
    //   option+="<option value='0'>Seleccione</option>";

    //   var option1 = "";
    //   option1+="<option value='0'>Todas</option>";
    //   data.map(function(item){  aUbic[i] = item.Code; /* alert("code"+aUbic[i]+"("+i+")");*/        i++;

    //     option+="<option Code='"+item.Code+"'  value='"+item.Id+"'>"+item.Description+"</option>";// datos reales item.Id   item.Description
    //     option1+="<option Code='"+item.Code+"' value='"+item.Id+"'>"+item.Description+"</option>";
    //       // alert("Code = "+item.Code);
    //       // alert(" Especialidad = "+item.Description);
    //       // alert("idEspecialidad = "+item.Id);

                    
    //   });  
    //   $("#sel_sede").html(option);
    //   $("#sel_sede_filter").html(option1);
      
    // });
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
                vw_secury_agentE.reloadgetLocationsE();
                $('#modalShowpersonBlacke').modal('hide');
		        	}else{
		        		swal("Error!", "No se ha podido actualizar la lista.", "error");
		        	}

		        });
          
    }

    return{
        init:function(){
            //getLocationsE();
            init();//inicio del modulo
            //alert("yyyyyyyyyyyyyyyyyyyyyyy");
            //ultimoProgramaE();
            getLocationsE();//listado de programas
            
        },
	    reloadtableBlackListE:function(){
        $('#body-tabla-listE').html("");
	      reloadgetLocationsE();





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



function seleccionEspecialidadE(select){
// //alert($("#sel_sede").find('option:selected').index());
//  espPrograma = $("#sel_sede").find('option:selected').text();
//  idEspPrograma = $("#sel_sede").find('option:selected').index();
//  CodePrograma = aUbic[idEspPrograma-1];


// // alert("espPrograma = "+espPrograma);
// // alert("idEspPrograma = "+idEspPrograma);
// // alert("CodePrograma = "+CodePrograma);

}//*/



function ultimoProgramaE()
{

   //----------------------PARAMETROS PARA EL SERVICIO LISTAR PROGRAMAS DE AUDITORIA-------------------------------
   var apiurlaccessregistriesTemp = apiurlAuditoria+"";//apiurlaccessregistries
   var servicioGp = "/api/Get-Programa_Auditoria-All?"//    "/api/Get-SecurityAgent-All?";
   var apiKeyxGp = "r$3#23516ewew5"; //constantes.apiKey;
   var metodoHttpGp = "objectlist";
   var metodoAjaxGp =  "GET"; //"POST";
   var GetSecurityAgentAllxx = "X4XURduZbR20wwsOaEVVs4trLnrmd4mfO3KtqksohFm5bQQPqoO10g==";
   var patametrosGp = "&code="+GetSecurityAgentAllxx;//"&code="+GetSecurityAgentAll;Flag_Completada
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
           vw_secury_agentE.init();
           //NewProgram = 0;

        });





}



function buscarSearchE()
{ 

  console.log("##################################### REPARANDO FILTRO EN EVALUACION PROGRAMA #################################");
  var idPr = $("#tx_id_program").val();
  var feDsd = $("#tx_fecha_ini").val().split('/').reverse().join('-');
  var FeHst = $("#tx_fecha_fin").val().split('/').reverse().join('-');
  var cEdo = $("#sel_estadoE").find('option:selected').index();
  var sig = 0;

      if((idPr== "")&&(feDsd=="")&&(FeHst=="")&&(cEdo == 0))
      {//----------------------entonces no hay nada de buscar para que voy al servidor --------------------
        //alert("En Blanco estdaoxxxx="+cEdo);
        //swal("Error!", "No existen parametros definidos para la Busqueda.", "error");
          sig = 1;
      }else{sig = 1;}

      if(sig == 1){
        //******************************** vamos entonces a armar el body para la consulta**********************************************/
        $('#body-tabla-listE').html("");
        var jj = 0;

        var now = moment().format('YYYY-MM-DD');
            //alert("entrando a tableBlackList,,,,"); 
          //----------------------PARAMETROS PARA EL SERVICIO LISTAR PROGRAMAS DE AUDITORIA-------------------------------
          var apiurlaccessregistriesTemp = apiurlAuditoria+"";//apiurlaccessregistries
          var servicioGp = "/api/Get-Programa_Auditoria-All?"//    "/api/Get-SecurityAgent-All?";
          var apiKeyxGp = "r$3#23516ewew5"; //constantes.apiKey;
          var metodoHttpGp = "&httpmethod=objectlist&Flag_Completada=1";
          //var metodoHttpGp = "&httpmethod=objectlist&Flag_Completada=0";//&Flag_Completada=0"; pendiente con estopara presentar cel listado
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


                console.log(url);



            showLoading();

              //prompt("code = ", url);


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
           
                if (response.length > 0) $("#bodyTablaSinProgramaE").css("display", "none");
                else $("#bodyTablaSinProgramaE").css("display", "block");
          
          $("#cantidad").html(response.length);
          $('#body-tabla-list').html(" ");
                
                  hideLoading();//font-size: 11.9px; letter-spacing: 0.10px; line-height: 1.64; 
                  $('#pagination-container-programaE').pagination({
                          dataSource: response,
                          pageSize: 5,
                          callback: function(data, pagination) {
                              var html = templatetableBlackList5(data);
                              $('#body-tabla-list-programaE').html(html);
                          }
                      })
            
            })
          //     $.ajax({
          //     method: "GET",
          //     url:  url,
          //     headers:headers,
          //     crossDomain: true,
          //     dataType: "json",
          // }).done(function (response) {
          //     let type = '';
          //     console.log(response)
          //     $('.body-tabla').addClass('hidden')
          //     $('#cantidad').text(response.length)
          //     // response.forEach((Item)=>{

        //           //let fecha = moment(`${Item.last_updated_date}`).format("DD/MM/YYYY");
        //           var yeark        = moment(Item.FechaCreacion).format('YYYY');//dddd
        //           var month       = moment(Item.FechaCreacion).format('MM');//
        //           var day         = moment(Item.FechaCreacion).format('DD'); ;
        //           var startDate               = " "+day +"/"+ month +"/"+yeark;
        //           var datec=startDate;

        //                 yeark       = moment(Item.Last_Updated_Date).format('YYYY');//dddd
        //                 month       = moment(Item.Last_Updated_Date).format('MM');//
        //                 day         = moment(Item.Last_Updated_Date).format('DD'); ;
        //                 startDate               = " "+day +"/"+ month +"/"+yeark;
        //           var dater=startDate;

        //           var bcod = "'"+Item.Code+"'";
          

        //           aUbicx[jj] = bcod; jj++;

        //           if(Item.type_id == 0){
        //               type = 'Programado';
        //           }
        //           $('#body-tabla-listE').append(`<div class="item-tabla p-2" style="z-index: 1;display:relative;"><div class="check-blue2 text-center">Nuevo</div>
        //     <div class="row m-0 justify-content-between align-items-center">
        //         <div class="col-md-1" >${Item.Code}</div>
        //         <div class="col-md-1" >${Item.DescriptionEspecialidad}</div>
        //         <div class="col-md-1" >${datec}</div>
        //         <div class="col-md-1  text-center" >${Item.Cantidad_Correcciones}</div>
                
        //         <div class="col-md-1 text-center" >${Item.CantidadAuditorias}</div>
        //         <div class="col-md-1" >${Item.DescriptionStatus}</div>

        //         <div class="col-md-1" >
        //           <button class="btn btn-green-lime" style="font-size: 11.9px; letter-spacing: 0.10px; line-height: 1.64; color: #565933;"  onclick="vistaEvaluarAuditorias(${Item.Id},${bcod},${Item.EspecialidadId});" > 
        //               Evaluar
        //           </button">

        //         </div>
        //     </div>
        // </div>`)

              //})
              //hideLoading();
          //})//letter-spacing: 0.10px; line-height: 1.64;


      }//******************************** vamos entonces a armar el body para la consulta**********************************************/

}

var getEstadosProgramaE= function()
  { 
    
    // <option value="" disabled selected></option>
    // <option value="1">Creado</option>
    // <option value="2">En Revisión</option>
    // <option value="3">Observado</option>
    // <option value="4">Aprobado</option>




    //aqui vamos a cambiar por nuestro servicio....................  vamos a traer las especialidades
    $("#sel_estadoE").append("<option value='-1'>Cargando...</option>");
    
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
      option+="<option value='0'>             </option>";

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
      $("#sel_estadoE").html(option);
      // $("#sel_sede_filter").html(option1);
      
    });
  }



function templatetableBlackList5(data){
    var html = '';
    let type = '';
    var jj = 0;
    var lbx = "";
    var now = moment().format('YYYY-MM-DD');
         // alert("Quien me llama");
  
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
  
        if(Item.StatusId == 5){lbx = "Ver Auditorías";}else{lbx = "Evaluar";}
        if(Item.type_id == 0){
            type = 'Programado';
        }
       // var cg = Item.Evaluador_name;
       //
  
       var btNew;   let iidPlan = parseInt(Item.Id);
       //alert(iidPlan);
       if((iidPlan == MayorAud)&&(iidPlan >0))
       {
           //btNew = "<div  class='check-blue text-center'>Nuevo</div>"; //btNew ="";//comentado aqui no deberia 
       }else{var btNew = "";}
   
       
       //console.log("estoy verificando listar programa Evaluador_name("+cg+")");
       html += `
        <div class="item-tabla p-2" style="z-index: 1;display:relative;">
        <div class="row m-0 justify-content-between align-items-center">
            <div class="col-md-1" >${Item.Code}</div>
            <div class="col-md-2" >${Item.DescriptionEspecialidad}</div>
            <div class="col-md-1" >${datec}</div>
            <div class="col-md-1  text-center" >${Item.Cantidad_Correcciones}</div>
            <div class="col-md-1  " >${Item.Evaluador_name?Item.Evaluador_name:'    -----'}</div>
            <div class="col-md-2" >${dater}</div>
            <div class="col-md-1" >${Item.DescriptionStatus}</div>
  
            <div class="col-md-2 d-flex justify-content-end" >
              <button class="btn btn-green-lime" style=" width: 7.563rem; height: 2.125rem; font-size: 0.75rem; color: #565933;"  onclick="vistaEvaluarAuditorias(${Item.Id},${bcod},${Item.EspecialidadId});" > 
                  ${lbx}
              </button">
  
            </div>
        </div>
    </div>`
  
        
    });
  
  html += '';//hideLoading();
    return html;
  
  }