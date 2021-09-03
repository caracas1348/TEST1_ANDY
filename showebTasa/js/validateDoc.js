var messageSecury='';
var Expired=15;//dias en que vencen los tamizajes y puede ingresar
var ExpiredDay=18;//dia final en que vencen los tamizajes y puede ingresar
var ExpiredDayNo=19;//dias en que vencen los tamizajes y ya no puede ingresar

var vt_validateSecury =function(document,type,search,typeRequest,objInputDocument,positionformVisit)//type: origen, security, mobile, colaborator
{
$("#textRetenerfot").text("");
$("#tx_message_autoriza").val("");
 messageSecury='';
 if(search!='vehicle')
 { 
  console.log("Validando person.....")
  if(type=='security')
  {
  $("#textNotificationAccess").text("Buscando... Por favor Espere...");//texto en  barra
  $("#barNotificationAccess")[0].className="card-header  "+colreMessage;//estilo de barra
  $("#showAccessDataCard").empty();
  $("#showAccessDataCard").html(`
 
                          <!--texto detalle de ingreso--------------------------------------------------------------->
                          <div class="row p-2" >
                          <div class="col-md-12" style="text-align:center!important;"><span class=""  style="border-bottom: 0px!important;">Validando...</span></div>
                          </div>
                         
                          <div class="row">
                              <!--imagen de persona--------------------------------------------------------------->
                              <div class="col-md-12 pb-0" style="text-align: center!important;">
                                  <img id="img_visitante" src="images/iconos/usersecu.svg" alt="" class="rounded-circle img-fluid" style="height: 16vh; width: 16vh;">
                                      <br>
                                      
                              </div>
                              <!--datos base-------------------------------------------------------------------->
                              <div class="col-md-12" style="text-align: center!important;margin-top: 2;"><h5 id="span_name_visitante" translate="no">Nombre...</h5></div>
                              <div class="col-md-12" style="text-align: center!important;"><h6 class="text-muted " id="span_number_document" >Documento: ...</h6></div>
                  
                              <!--Datos consultados--------------------------------------------------------------->
                              <div class="col-12" style="text-align: center!important;"><hr>
                                  <div class="row">
                                      <div class="col-6 text-left pl-4">Empresa:</div>
                                      <div class="col-6">...</div>
                                  </div>
                              </div>

                              <div class="col-12" style="text-align: center!important;"><hr>
                                  <div class="row">
                                  <div class="col-6 text-left pl-4">Último Tamizaje realizado:</div>
                                  <div class="col-6">...</div>
                                  </div>
                              </div>

                              <div class="col-12" style="text-align: center!important;"><hr>
                                  <div class="row">
                                  <div class="col-6 text-left pl-4">Persona que autoriza:</div>
                                  <div class="col-6" id="span_name_organizer">...</div>
                                  </div>
                              </div>

                              <div class="col-12" style="text-align: center!important;"><hr>
                                  <div class="row">
                                  <div class="col-6 text-left pl-4" id="span_departament">Área</div>
                                  <div class="col-6">...</div>
                                  </div>
                              </div>

                              <div class="col-12" style="text-align: center!important;"><hr>
                                  <div class="row">
                                      <div class="col-6 text-left pl-4" >Temperatura</div>
                                      <div class="col-6">...</div>
                                  </div>
                              </div>
                          </div>   

                              <div class="text-center" id="footer_action">
                                  <!--hidden input---------------------------------------------------------------------->
                                  <input type="hidden" id="hid_location" name="hid_location" value="0">
                                  <input type="hidden" id="hid_id_blacklist" name="hid_id_blacklist" value="">
                                  <input type="hidden" id="hid_area_name" name="hid_area_name" value="">
                                  <input type="hidden" id="hid_action_type" name="hid_action_type" value="}">
                                  <input type="hidden" id="hid_identity_document" name="hid_identity_document" value="">
                                  <input type="hidden" id="hid_is_collaborator_aforo" name="hid_is_collaborator_aforo" value="">
                                  <!--Area de botones-------------------------------------------------------------------->
                              </div>`
                           );
  }
  var flag_riesgo_date=0;//para identificar persona de riesgo que tiene cita
   var visitasa={};
   var flag_riesgo=0;
   var flag_ois=0;
   var flag_tamizaje=0;
   var flag_tamizaje_veto=0;
   var flag_temporal=1;
   var flag_blacklist=0;
   var accessvalidation='';
   var message=''
   var OIS={};
   var flag_colaborator;
   var flag_colaborator_aforo;
   var colorBar='';
   var now=new Date();
   var nowdesde=`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} 00:00`;
   var nowhasta=`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} 23:59`;
   var textErrorOIS='';
   var colreMessage="";
   var circleColor="";
   var barHeaderCola="";
   var flag_access=3;
   var flag_collaborator_inactive=0;
   var message='';
   var titleMessage=''
   var textBotton=""
   var flag_void=0;
   $("#sendIngresoExcepcional").off();
   $("#btnAutorizar").off();
  //----------------------------------------------------------------------------------------------------------------
  var secury=vt_checkSecurity(document);
  //visitasa= vt_checkDataVisitasa(document,1); //descomentar
  visitasa = secury.accessrequest;

  if(Object.keys(visitasa).length !=0)//si se encuentra visita agendada
  {
      if(visitasa.is_temporal==1)//la visita es temporal
      flag_temporal=0;
  }
  
  if(secury)
  {
  //----------------------------------------------------------------------------------------------------------------
   var blacklist=secury.blacklist;
   flag_blacklist=blacklist.vetado;
   //se busca lista negra
   //----------------------------------------------------------------------------------------------------------------
   //se busca si esta en lista de riesgo activo
   var riesgo=secury.risklist;
   
   if(riesgo.status==1)//valida si persona esta en lista de riesgo
   {
        flag_riesgo=1;
   }
   //----------------------------------------------------------------------------------------------------------------
   //se busca su status en tamizaje
   var tamizaje=secury.tamizaje;
   //----------------------------------------------------------------------------------------------------------------
   //se verifica si es colaborador
   var colaborator= secury.collaborator;
   if(colaborator.value && colaborator.value.length>0)
   {
        console.log("Colaborador Identificado");
        flag_colaborator=1;
        flag_colaborator_aforo = 1;
        if(colaborator.value[0].userEndDate)
        {

          if(new Date(colaborator.value[0].userEndDate)<now)//si el colaborador ya no trabaja en tasa
          {
            flag_collaborator_inactive=1;
            flag_colaborator=0;//ya no pertenece a tasa
            flag_colaborator_aforo = 0;
            OIS=JSON.parse(secury.ois);
          }
        }

        console.log(flag_collaborator_inactive,flag_colaborator)
   }
    else{//si no es colaborador se valida que este habilitado en OIS
      OIS=JSON.parse(secury.ois);
      flag_colaborator=0;
      //APLICA SOLO PARA AFORO
      flag_colaborator_aforo=0;
      if(tamizaje.id!=0){ //VERIFICAMOS QUE ESTÉS EN BLACLIST LIST 2 
        if(tamizaje.is_collaborator == true || tamizaje.name_company.toLowerCase().trim() == "tasa" ||  tamizaje.name_company.toLowerCase().trim().includes("tasa")){//verificamos en blacklist si es colaborador
          flag_colaborator_aforo=1;
        }
        else{//si no es colaborador se valida que este habilitado en OIS
          flag_colaborator_aforo=0;
        }
      } //FIN SOLO APLICA PARA AFORO
    }
   //validaciones tamizajes
   if(tamizaje.id!=0)
   {
   flag_access=tamizaje.check_in;//evento de entrada y salida 0 va entrando, 1 va saliendo


              if(tamizaje.is_collaborator && flag_colaborator==0 && flag_collaborator_inactive==0)//se valida si es colaborador por tamizaje
              {
                /* flag_colaborator=1;
                console.log("Colaborador Identificado Por Tamizaje"); */
              }

              if(tamizaje.id_location_temp==getCookie("vtas_sede"+sessionStorage.tabVisitasa)  && tamizaje.status_request==1 && (new Date(tamizaje.entry_datetime.split('T')[0]+' 23:59')>new Date(nowdesde)&&new Date(tamizaje.entry_datetime.split('T')[0]+' 23:59')<=new Date(nowhasta)) )//validacion de dia de la cita)
              {
                    console.log("Ingresando como Temporal");
                    flag_temporal=0;

              }
              var ExpireTamizaje='';//fecha de vencimiento de tamizaje
              var diaspass=19;//para dias limite para pasar
              if(tamizaje.attention_date)//se calcula tiempo de la ultima fecha de tamizaje
              {

                    var date=new Date();
                    var dateBdd = moment(tamizaje.attention_date).add(-5,"hours").format('YYYY-MM-DD HH:mm:ss');                             
                    var time1   = moment(dateBdd,"YYYY-MM-DD HH:mm:ss");
                    var time2   = moment(date,"YYYY-MM-DD HH:mm:ss");
                    var ms      = time2.diff(time1);
                    diaspass =moment.duration(ms).asDays();
                    
                    if(diaspass<0)
                    {
                      diaspass=0;
                    }

                   
                      var dateBdd = moment(tamizaje.attention_date).add(ExpiredDay,"days").format('YYYY-MM-DD HH:mm:ss');                             
                      ExpireTamizaje=formatDateTime(dateBdd,16,true,true)
                    

                   console.log("Dias Transcurridos: "+diaspass) 
              }
             
              var diascita=0;
              if(tamizaje.date_covid_test)
              {
                var date=new Date();
                var dateBdd = moment(tamizaje.date_covid_test).add(-5,"hours").format('YYYY-MM-DD HH:mm:ss');                             
                var time1   = moment(dateBdd,"YYYY-MM-DD HH:mm:ss");
                var time2   = moment(date,"YYYY-MM-DD HH:mm:ss");
                var ms      = time1.diff(time2);
                diascita = Math.abs(moment.duration(ms).asDays());
              }
              
              //validacion si estoy pendiente por aprobar pero no tengo tamizaje previo, no pasa
              var name="";
                if (tamizaje.vetado == 1)//vetados tanto en lista negra como por lista negra
                {
                   if(tamizaje.list_type==1)//si esta en lista negra
                   {
                     flag_blacklist=1;
                     
                   }
                   else
                   {
                     
                      flag_tamizaje=1;
                      flag_tamizaje_veto=1;
                   }
                   
                  // name=tamizaje.fullname!=undefined?toCapitalize(tamizaje.fullname):'--';
                }         
                else if(tamizaje.covid_test==3)//tamizaje vencido
                {
                  if(diaspass>ExpiredDay)//puede ingresar
                  {
                    
                    name=tamizaje.fullname!=undefined?toCapitalize(tamizaje.fullname):'--';
                    flag_tamizaje=3;
                  }

                  if(diaspass>ExpiredDayNo)//no puede ingresar
                  {
                    
                    name=tamizaje.fullname!=undefined?toCapitalize(tamizaje.fullname):'--';
                    flag_tamizaje=33;
                  }
                }
                else if(tamizaje.covid_test==5 && !tamizaje.attention_date)//tamizaje cancelado
                {
                  flag_tamizaje=5;
                  name=tamizaje.fullname!=undefined?toCapitalize(tamizaje.fullname):'--';
                }
                else if(tamizaje.covid_test==5 && tamizaje.attention_date)//tamizaje cancelado
                {
                  if(diaspass>ExpiredDay)
                  {
                    flag_tamizaje=5;
                    name=tamizaje.fullname!=undefined?toCapitalize(tamizaje.fullname):'--';
                  }
                }
                else if(tamizaje.covid_test==4 && !tamizaje.attention_date)//tamizaje no aporbado sin tamizaje previo
                {
                  flag_tamizaje=4;
                  name=tamizaje.fullname!=undefined?toCapitalize(tamizaje.fullname):'--';
                }
                
                else if(tamizaje.covid_test==4 && tamizaje.attention_date)//tamizaje no aporbado con tamizaje previo
                {

                  if(diaspass>ExpiredDay)
                  {
                    flag_tamizaje=4;
                    name=tamizaje.fullname!=undefined?toCapitalize(tamizaje.fullname):'--';
                  }
                }
                else if(tamizaje.attention_date && tamizaje.covid_test!=1)//tamizaje no aporbado con tamizaje previo y que no este aprobado
                {

                  if(diaspass>ExpiredDay)
                  {
                    flag_tamizaje=0;
                    name=tamizaje.fullname!=undefined?toCapitalize(tamizaje.fullname):'--';
                  }
                }

                if(tamizaje.covid_test==1)//si se ha aprobado tamizaje pero no se realiza en 10 dias, no pasa
                {
                  if(diaspass>ExpiredDay)
                  {
                    flag_tamizaje=3;
                    name=tamizaje.fullname!=undefined?toCapitalize(tamizaje.fullname):'--';
                  }

                  if(tamizaje.attention_date && diascita<4)//si su cita se le pidio y esta en rango de 1 a 3 dias
                  {
                    flag_tamizaje=0;
                  }

                  if(!tamizaje.attention_date)//si no ha tenido tamizaje previo debe pasar el dia de su cita, si no se debe solicitar otro
                  {
                    flag_tamizaje=1;
                  }
                }

                //se valida vetado con mas de 14 dias
                if (tamizaje.vetado == 1)
                {
                  if(diaspass>daylimitVeto || tamizaje.covid_test==8)
                  {
                    flag_tamizaje=8;
                  }

                }

               
                //se verifica si su cita es del dia actual
                if(tamizaje.list_type==2)//solo si es de lista 2, tamizajes
                {
                    if(tamizaje.covid_test==1 && tamizaje.check_in==0 && (new Date(tamizaje.date_covid_test.split('T')[0]+' 23:59')>new Date(nowdesde)&&new Date(tamizaje.date_covid_test.split('T')[0]+' 23:59')<=new Date(nowhasta)) )//validacion de dia de la cita
                    {
                    
                        var colreMessage="bg-yellow";
                        circleColor="text-yellow";
                        barHeaderCola="#ffeb3b";
                        flag_tamizaje=11
                        flag_riesgo_date=1;
                    }

                     //se verifica vencimiento de tamizaje y que su cita no sea del dia(15-17)
                     if(tamizaje.attention_date && (diaspass>Expired || (tamizaje.covid_test==3 && diaspass>Expired)) && tamizaje.covid_test!=8 && flag_tamizaje!=11  )
                     {
                             var colreMessage="bg-yelow";
                             circleColor="text-orange";
                             barHeaderCola="#ff9800";
                             flag_tamizaje=333;
                     }
                    //se verifica vencimiento de tamizaje y si puede àsar y que su cita no sea del dia (18)
                    if(tamizaje.attention_date && (diaspass>ExpiredDay || tamizaje.covid_test==3)&&(tamizaje.covid_test!=8)&& flag_tamizaje!=11)
                    {
                      if(flag_colaborator==1)//solo pasa el dia 18 si es colaborador
                      {
                        flag_tamizaje=3;
                      }
                      else{//solo le avisa al contratist su vencimiento
                        flag_tamizaje=333;
                      }
                            var colreMessage="bg-orange";
                            circleColor="text-orange";
                            barHeaderCola="#ff9800";
                           
                    }
                    //se verifica vencimiento de tamizaje y que su cita no sea del dia (19)
                    if(tamizaje.attention_date && (diaspass>ExpiredDayNo || (tamizaje.covid_test==3 && diaspass>ExpiredDayNo)) && tamizaje.covid_test!=8 && flag_tamizaje!=11  )
                    {
                            var colreMessage="bg-orange";
                            circleColor="text-orange";
                            barHeaderCola="#ff9800";
                            flag_tamizaje=33;
                    }

                   

                    
                }

                if(tamizaje.covid_test==7 || tamizaje.covid_test==88  )//ingreso indefinido
                {
                 
                    flag_tamizaje=7;
                    name=tamizaje.fullname!=undefined?toCapitalize(tamizaje.fullname):'--';

                    if (tamizaje.vetado == 1)//vetados tanto en lista negra como por lista negra
                    {
                       if(tamizaje.list_type==1)//si esta en lista negra
                       {
                          flag_blacklist=0;
                       }
                      
                    }
                    if(riesgo.status==1)
                    {
                      flag_riesgo=1;
                    }
                 
                }

                if(tamizaje.covid_test==9)//tamizaje no aporbado sin tamizaje previo
                {
                  flag_tamizaje=9;
                  name=tamizaje.fullname!=undefined?toCapitalize(tamizaje.fullname):'--';
                }
            }
            else//no se le ha solicitado tamizaje
            {
                console.log("No registrado en tamizaje");
                flag_tamizaje=1;
                //visitasa= vt_checkDataVisitasa(document,1)

                if(!visitasa.access)
                {
                    console.log("Sin visita agendada");
                }
                else
                {
                    console.log("Visita agendada");

                    if(visitasa.action_type)
                    {
                      flag_access=1;
                    }
                    else{
                      flag_access=0;
                    }

                    
                }
            }
    
   //----------------------------------------------------------------------------------------------------------------
   //se valida datos de ois
   if(flag_colaborator==0)//si no es colaborador
   {
     //console.log(OIS);
        if(OIS.error==1){//para validar si ois está caido
          console.log("Muerto OIS");
          flag_ois=1;          
          textErrorOIS=" Error en OIS: "+OIS.statusCode+" - "+OIS.messager;
         // return;
        }
        else if(OIS.dni)//se verifica validacion ois
        {

            if(OIS.enabled_status)///habilitado
            {
              console.log("OIS Autorizado");
            }
            else
            {//no habilitado

              textErrorOIS=" OIS no Autorizado: ";
              if(!OIS.sctr_status){textErrorOIS=textErrorOIS+" .SCTR"}
              //if(!OIS.emo_status){textErrorOIS=textErrorOIS+" .EMO"}
              if(!OIS.codanexo1_status){textErrorOIS=textErrorOIS+" .Anexo1"}
              if(!OIS.codanexo2_status){textErrorOIS=textErrorOIS+" .Anexo2"}
              if(!OIS.dj_status){textErrorOIS=textErrorOIS+" .DJ"}
              //if(!OIS.emo_status){textErrorOIS=textErrorOIS+" .EMO"}
              if(OIS.nota==""){textErrorOIS=textErrorOIS+" .Nota Inducción"}

              

              console.log("No autorizado OIS: "+textErrorOIS)
              flag_ois=1;
            
            }

            if(tamizaje.id==0 && OIS.dni)
            {
            console.log("Esta en OIS pero no tiene tamizaje"+textErrorOIS)
            flag_ois=1;
             textErrorOIS=" Esta persona no tiene Solicitud de Tamizaje";
            }
        }
        else
        {
            if(document!="001654671" && document!="001654672" && document!="001444147" && document!="003353989" )//documento sde prueba visualsat
            {
            console.log("No autorizado OIS");
            flag_ois=1;
            var textErrorOIS=" No Registrado en OIS.";
            }
        }
    }
//----------------------------------------------------------------------------------------------------------------
//LEYENDAS++++++++++++++++++++++++++++++++++++++++++++++++++++++
//TAMIZAJES*****************************************************
//0: habilitado para tamizaje  -pasa
//1: no habilitado para tamizaje -no pasa
//3: tamizaje vencido- pasa con condiciones
//4: cita sin aprobar- no pasa
//7: habilitado indefinido - pasa
//8: pendiete por alta -pasa
//5: tamizaje cancelado - no pasa
//11: cita  hoy -  pasa
//LISTA DE RIESGO***********************************************
//0: inactivo en lista- pasa
//1: Activo en lista -no pasa
//OIS***********************************************************
//0: autorizado -pasa
//1: no auotrizado - no pasa
console.log(flag_riesgo,flag_riesgo_date)
//se permite entrada siepre a transpotista y proveedores, gubernamental (cod:4 y cod:3 y cod 5)
if(flag_access==0 || (flag_access==0 && flag_colaborator==1))
{
 
        if(((flag_tamizaje==0 || flag_tamizaje==3 ||flag_tamizaje==333|| flag_tamizaje==11 || flag_tamizaje==7 || flag_tamizaje==8) &&  ((flag_ois==0 && flag_colaborator==0 )|| (flag_colaborator==1&&flag_collaborator_inactive==0)) &&  (tamizaje.list_type==2) && (flag_riesgo==0) && (flag_blacklist==0))||(flag_tamizaje==3&&flag_riesgo==0&& flag_blacklist==0)||(flag_temporal==0 && tamizaje.list_type==0&&flag_riesgo==0&& flag_blacklist==0)||(visitasa.id_request_type==5)||(visitasa.id_request_type==4)||(visitasa.id_request_type==3)||(visitasa.id_request_type==1)||(flag_riesgo_date==1 && flag_riesgo==1))
        {
            accessvalidation=1;
            textBotton="Registrar Ingreso";
            titleMessage='Ingreso Autorizado';
            colreMessage='text-white bg-success';
            circleColor="text-success";
            barHeaderCola="#4caf50";
            if(flag_tamizaje==7)
            {
                message='Habilitado Indefinido';
            }
            if(flag_tamizaje==0)
            {
                message='Habilitado';
            }
            
            if(flag_tamizaje==8)
            {
                message='Debe dirigirse al Tópico para el Alta Médica<br>Solicitar Declaración Jurada';
                colreMessage='text-dark bg-yellow';
            }
            if(flag_tamizaje==11)
            {
                message='Debe dirigirse al área médica a realizar Tamizaje';
                colreMessage='text-dark bg-yellow';
                circleColor="text-yellow";
                barHeaderCola="#ffeb3b";

                if(!tamizaje.attention_date)//si no ha tenido taizaje pero si tiene cita reciente
                {
                  message='Sin Tamizaje Previo. Debe dirigirse al área médica a realizar Tamizaje';
                }
            }
            if(flag_tamizaje==333)
            {
            
                message='Su Tamizaje Vence el '+ExpireTamizaje+', Solicite su Programación. '+textErrorOIS;
                if(flag_riesgo==1)
                message=message+' Persona en Lista de Riesgo.'
                colreMessage='text-dark bg-yellow';
                circleColor="text-yellow";
                barHeaderCola="#ffeb3b";
            }
            if(flag_tamizaje==3 || (flag_riesgo==1 && flag_riesgo_date==1))
            {
            
                message='Deberá pasar por tópico antes del ingreso a Planta. Retener fotocheck y devolver al finalizar Tamizaje. '+textErrorOIS;
                if(flag_riesgo==1)
                message=message+' Persona en Lista de Riesgo.'
                colreMessage='text-dark bg-orange';
                circleColor="text-orange";
                barHeaderCola="#ff9800";
            }
            if(flag_temporal==0)
            {
            
                message='Ingreso Temporal, No puede permanecer más de dos horas en la Sede. <br>'+textErrorOIS;
                if(flag_riesgo==1)
                message=message+' Persona en Lista de Riesgo.'
                if(flag_blacklist==1)
                message=message+' Persona debe contactar a su jefe directo o GH.'
                if(flag_tamizaje==1)
                message=message+' Persona no Habilitada Por Tamizaje';

                colreMessage='text-dark bg-orange';
                circleColor="text-orange";
                barHeaderCola="#ff9800";
                
            }
            if(visitasa.access)
            {
            
                message=message+' <br>Motivo de Ingreso Programado: '+visitasa.reason;
               
                
            }

            
        }
        else if(flag_tamizaje==1 ||  flag_tamizaje==33 || flag_tamizaje==4 || flag_tamizaje==5 ||  flag_ois==1 || flag_riesgo==1 || flag_blacklist==1 || flag_collaborator_inactive==1 || flag_temporal==1)
        {
            accessvalidation=0;
            textBotton="Ingreso Excepcional"
            titleMessage='Ingreso Denegado';
            colreMessage='text-white bg-danger';
            circleColor="text-danger";
            barHeaderCola="#f44336";

            if(flag_riesgo==1)
            { 
                message=textBotton+'- '+message+' Persona en Lista de Riesgo';
            }
            if(flag_blacklist==1)
            {
                message=textBotton+'- '+message+' Persona debe contactar a su jefe directo o GH';
            }
            if(flag_tamizaje==4)
            {
                message=textBotton+'- '+message+' Tamizaje no ha sido Aprobado';
            }
            if(flag_tamizaje==33)
            {
              message=textBotton+'- '+message+' Tamizaje vencido. <br>Último tamizaje fue hace más de '+ExpiredDay+' días.';
            }
            if(flag_tamizaje==1)
            {
                
                if(!tamizaje.attention_date)//si no ha tenido taizaje pero si tiene cita reciente
                {
                  message=textBotton+'- '+message+'Sin Tamizaje Previo. Persona no Habilitada Por Tamizaje';
                }
                else{

                  message=textBotton+'- '+message+' Persona no Habilitada Por Tamizaje';

                }
            }
            if(flag_tamizaje==5)
            {
                message=textBotton+'- '+message+' Tamizaje ha sido Cancelado';
            }
            
            if(flag_ois==1)
            {
                message=textBotton+'- '+message+textErrorOIS;
            }
            if(flag_collaborator_inactive==1)
            {
                message='Personal Cesado';
            }
            
            

        }
}
else if(flag_access==1 || (flag_access==1 && flag_colaborator==1))
{//persona saliendo


  colreMessage='text-white bg-success';
  circleColor="text-success";
  barHeaderCola="#4caf50";

  titleMessage='Salida';
  message='';
  textBotton="Registrar Salida";
  
  if(tamizaje.access_type=="Excepcional")
  {
    colreMessage='text-white bg-danger';
    circleColor="text-danger";
    barHeaderCola="#f44336";
    //exceptional_responsible_name
    message="Acceso a Sede como Ingreso Excepcional<br>"+tamizaje.exceptional_observation;
   // message="Acceso a Sede como Ingreso Excepcional";
  }

   

}
else
{

  titleMessage='Ingreso Denegado';
  colreMessage='text-white bg-danger';
  circleColor="text-danger";
  barHeaderCola="#f44336";
  //message='';
  textBotton="";
  var buttonAccess="";

  if(flag_tamizaje==1 || flag_tamizaje==4 || flag_tamizaje==5 ||  flag_ois==1 || flag_riesgo==1 || flag_blacklist==1 || flag_collaborator_inactive==1 || flag_temporal==1)
        {
            
           
            colreMessage='text-white bg-danger';
            circleColor="text-danger";
            barHeaderCola="#f44336";

            if(!visitasa.access)
            { 
                message=message+' Persona No tiene Ingreso Agendado.';
            }
            if(flag_riesgo==1)
            { 
                message=message+' Persona en Lista de Riesgo.';
            }
            if(flag_blacklist==1)
            {
                message=message+' Persona debe contactar a su jefe directo o GH.';
            }
            if(flag_tamizaje==4)
            {
                message=message+' Tamizaje no ha sido Aprobado.';
            }
            if(flag_tamizaje==1)
            {
                message=message+' Persona no tiene solicitud de Tamizaje.';
            }
            if(flag_tamizaje==5)
            {
                message=message+' Tamizaje ha sido Cancelado.';
            }
            /*SE HABILITÓ PARA MOSTRAR EL EMENSAJE DE ERROR EN OIS Y SE LE AGREGÓ OIS.error==1*/
            /*if(flag_ois==1 && OIS.error==1)
            {
                message=message+textErrorOIS;
            } */
            if(flag_collaborator_inactive==1)
            {
                message='Personal Cesado.';
            }
            
            

        }

}

if(flag_tamizaje==9)//fallecido
{
  titleMessage='Fallecido';
  colreMessage='text-white bg-dark';
  circleColor="text-dark";
  barHeaderCola="#333";

  message='';
}

//se capturan datos de persona de cualquier origen
  var name="";
  var document="";
  var company="";
  var last_attention="";
  var organizer="";
  var area="";
  if(colaborator.value && colaborator.value.length>0 && flag_collaborator_inactive==0)//si se localiza en colaboradorº
  {
      if(colaborator.value[0].givenName!="" && colaborator.value[0].surname!="")
        var name=toCapitalize(colaborator.value[0].givenName+' '+colaborator.value[0].surname);
      else
        var name=toCapitalize(colaborator.value[0].displayName);
      var document=colaborator.value[0].identity_document;
      var company='Tasa';
      var last_attention=tamizaje.attention_date!=undefined?formatDateTime(tamizaje.attention_date,2,true):'--';
      var organizer=tamizaje.collaborator!=undefined?tamizaje.collaborator:'--';
      var area=(tamizaje.area)?tamizaje.area:"--";
      var job=(colaborator.value[0].jobTitle)?colaborator.value[0].jobTitle:"--";
      var locations=(tamizaje.name_location)?tamizaje.name_location:"--";
      var temperature=(tamizaje.temperature)?tamizaje.temperature:"--";
      console.log("Datos por colaborador");
  }
  else if(tamizaje.id!=0)//si se localiza en tamizajes
  {
      var name=toCapitalize(tamizaje.fullname);
      var document=tamizaje.identity_document;
      var company=toCapitalize(tamizaje.name_company);
      var last_attention=tamizaje.attention_date!=undefined?formatDateTime(tamizaje.attention_date,2,true):'--';
      var organizer=tamizaje.collaborator!=undefined?tamizaje.collaborator:'--';
      var area=(tamizaje.area)?tamizaje.area:"--";
      var job=(tamizaje.job)?tamizaje.job:"--";
      var locations=(tamizaje.name_location)?tamizaje.name_location:"--";
      var temperature=(tamizaje.temperature)?tamizaje.temperature:"--";

      $("#hid_id_area").val(tamizaje.id_area);
      idEdit=tamizaje.id;
      $("#hid_id_location").val(tamizaje.id_location);  
      $("#hid_id_company").val(tamizaje.id_company); 
      console.log("Datos por tamizaje");
      
  }
  else if(blacklist.id!=0)//si se localiza en lista negra
  {
      var name=toCapitalize(blacklist.fullname);
      var document=blacklist.identity_document;
      var company=toCapitalize(blacklist.name_company);
      var last_attention=blacklist.attention_date!=undefined?formatDateTime(blacklist.attention_date,2,true):'--';
      var organizer=blacklist.collaborator!=undefined?blacklist.collaborator:'--';
      var area=(blacklist.area)?blacklist.area:"--";
      var job=(tamizaje.job)?tamizaje.job:"--";
      var locations=(tamizaje.name_location)?tamizaje.name_location:"--";
      var temperature=(tamizaje.temperature)?tamizaje.temperature:"--";
      console.log("Datos por blacklist");
  }
  else if(flag_colaborator==0&& OIS.dni)//si es contratista
  {
    if(OIS.dni)//se verifica validacion ois
    {
        var name=toCapitalize(OIS.fullname);
        var document=OIS.dni;
        var company=toCapitalize(OIS.company_name);
        var last_attention='';
        var organizer="Tasa";
        var area="Tasa";
        var job=(OIS.job)?OIS.job:"--";
        var locations=(tamizaje.name_location)?tamizaje.name_location:"--";
        var temperature=(tamizaje.temperature)?tamizaje.temperature:"--";
        
    }
    console.log("Datos por ois");
  }
  else if(visitasa.request_id)//si es contratista
  {
    
        var name=toCapitalize(visitasa.fullname);
        var document=visitasa.identity_document;
        var company=toCapitalize(visitasa.name_company);
        var last_attention='';
        var organizer=visitasa.collaborator;
        var area=visitasa.area;
        var job=(visitasa.job)?visitasa.job:"--";
        var locations=(tamizaje.location)?tamizaje.location:"--";
        var temperature=(tamizaje.temperature)?tamizaje.temperature:"--";
        console.log("Datos por visitasa");
  }
  else if(riesgo.id!=0)//si se localiza en lista negra
  {
      var name=toCapitalize(riesgo.name);
      var document=$("#tx_access_dni").val();
      var company=toCapitalize(blacklist.name_company);
      var last_attention=blacklist.attention_date!=undefined?formatDateTime(blacklist.attention_date,2,true):'--';
      var organizer=blacklist.collaborator!=undefined?blacklist.collaborator:'--';
      var area=(blacklist.area)?blacklist.area:"--";
      var job=(tamizaje.job)?tamizaje.job:"--";
      var locations=(tamizaje.name_location)?tamizaje.name_location:"--";
      var temperature=(tamizaje.temperature)?tamizaje.temperature:"--";
      console.log("Datos por risklist");
  }

  if(OIS.dni && tamizaje.id==0 && Object.keys(visitasa).length === 0)
  {
   
        var name=toCapitalize(OIS.fullname);
        var document=OIS.dni;
        var company=toCapitalize(OIS.company_name);
        var last_attention='';
        var organizer="Tasa";
        var area="Tasa";
        var job=(OIS.job)?OIS.job:"--";
        var locations=(tamizaje.name_location)?tamizaje.name_location:"--";
        var temperature=(tamizaje.temperature)?tamizaje.temperature:"--";
        message=message+' Persona no Habilitada Por Tamizaje';
        console.log("Datos por ois");
    
  }
  if(visitasa.request_id)//
  {
        var organizer=visitasa.collaborator;
        console.log("Colaborador-organizador por visitasa");
  }
  
hideLoading();
messageSecury=message;
if(type=='security')
{
  var ImageButtons ='';
  ImageButtons =`
      <input type="file" id="photo" accept="image/*" hidden>
      <input type="text" id="base64" hidden>
      <button type="button" id="btnShowCamera"  class="btn btn-green-lime btn-raised btn-rounded " style="padding: 0rem 1rem!important; text-transform:lowercase!important; height: 24px; top:-25px" title="Tomar Foto"   onclick="">
          <img  src="images/iconos/capture.svg" class="rounded-circle img-fluid" style="height:25px; width: 15px;">
      </button>
      <button type="button" id="btnInputFile"   class="btn btn-info btn-raised btn-rounded " style="padding: 0rem 1rem!important; text-transform:lowercase!important;height: 24px; top:-25px" title="Buscar en disco"   onclick="">
          <img  src="images/iconos/file.svg" class="rounded-circle img-fluid" style="height:25px; width: 15px;">
      </button>
      <button type="button" id="btnUpdateImage" class="btn btn-green-lime btn-raised btn-rounded " style="padding: 0rem 1rem!important; text-transform:lowercase!important;height: 24px;display:none; top:-25px" title="Guardar"   onclick="">
          <img  src="images/iconos/save.svg" class="rounded-circle img-fluid" style="height:25px; width: 15px;"
      ></button>
    `;


if(flag_access==0)//si va entrando
{
      if(flag_temporal==0)
      {
        var buttonAccess=`
            <button type="button" id="btnAutorizar"  class="btn btn-green-lime btn-raised btn-rounded mt-2"  style="padding: 0rem 1rem!important; text-transform:capitalize!important;  height: 30px;" >Ingreso Temporal</button>` ;
            if(tamizaje.responsible_name)
            var organizer=tamizaje.responsible_name;

            if(visitasa.access)
            buttonAccess=buttonAccess+`<br><button type="button" id="btnAccessDEtail"  class="btn btn-primary  btn-raised btn-rounded mt-2"  style="padding: 0rem 1rem!important; background:#49a0fd; text-transform:capitalize!important;  height: 30px;" >Detalles De Ingreso Agendado</button>` ;
      }
     
      else{
          if(accessvalidation==1)//ingreso autorizado
          {
            var buttonAccess=` <button type="button" id="btnTools" class="btn btn-primary btn-raised btn-rounded mt-2" style="padding: 0rem 1rem!important; text-transform:lowercase!important;  height: 30px;" onclick="$('#modalToolList').modal()"><span style="text-transform: capitalize;">Herramientas</button>
            <button type="button" id="btnAutorizar"  class="btn btn-green-lime btn-raised btn-rounded mt-2"  style="padding: 0rem 1rem!important; text-transform:capitalize!important;  height: 30px;" >${textBotton}</button>` ;
            if(visitasa.access)
            buttonAccess=buttonAccess+`<br><button type="button" id="btnAccessDEtail"  class="btn btn-primary  btn-raised btn-rounded mt-2"  style="padding: 0rem 1rem!important; background:#49a0fd; text-transform:capitalize!important;  height: 30px;" >Detalles De Ingreso Agendado</button>` ;
          }
          else{//ingreso denegado
            var buttonAccess=`
            <button type="button" id="btnAutorizar"  class="btn btn-green-lime btn-raised btn-rounded mt-2"  style="padding: 0rem 1rem!important; text-transform:capitalize!important;  height: 30px;" >${textBotton}</button>` ;

          }
     }
}
else if(flag_access==1)//si va slaiendo
{
  ImageButtons ='';;
  var buttonAccess=` 
                  <button type="button" id="btnAutorizar"  class="btn btn-green-lime btn-raised btn-rounded mt-2"  style="padding: 0rem 1rem!important; text-transform:capitalize!important;  height: 30px;" >${textBotton}</button>` ;
}
else//no  esta registrado en ningun lado localmente
{
  flag_void=1;//marca expcionale sin registrso locales
  if(tamizaje.check_in==0)
  {

    console.log("sin boton entrando");
    textBotton="Ingreso Excepcional";
    flag_access=0;
    var buttonAccess=`
            <button type="button" id="btnAutorizar"  class="btn btn-green-lime btn-raised btn-rounded mt-2"  style="padding: 0rem 1rem!important; text-transform:capitalize!important;  height: 30px;" >${textBotton}</button>` ;
  }
  else{
    console.log("sin boton entrando");
   
    flag_access=1;
    ImageButtons ='';;
    var textBotton="Registrar Salida";
  var buttonAccess=` 
                  <button type="button" id="btnAutorizar"  class="btn btn-green-lime btn-raised btn-rounded mt-2"  style="padding: 0rem 1rem!important; text-transform:capitalize!important;  height: 30px;" >${textBotton}</button>` ;
  }
}

if(flag_tamizaje==9)//fallecido
{
  ImageButtons ='';
  var buttonAccess='';
}

 
    var img ="images/iconos/usersecu.svg";
        if(secury.picture)
        {
          img = secury.picture;
        }
    $("#textNotificationAccess").text(titleMessage);//texto en  barra
    $("#barNotificationAccess")[0].className="card-header  "+colreMessage;//estilo de barra
    $("#showAccessDataCard").empty();
    $("#showAccessDataCard").html(`
   
                            <!--texto detalle de ingreso--------------------------------------------------------------->
                            <div class="row p-1" >
                            <div class="col-md-12" style="text-align:center!important;"><span class="h6"  style="border-bottom: 0px!important;">${message}</span></div>
                            </div>
                           
                            <div class="row p-0">
                                <!--imagen de persona--------------------------------------------------------------->
                                <div class="col-md-12 p-0 " style="text-align: center!important;">
                                    <img id="img_visitante" src="${img}" alt="" class="rounded-circle img-fluid" style="height: 15vh; width: 15vh;">
                                        <br>
                                        ${ImageButtons}
                                </div>
                                <!--datos base-------------------------------------------------------------------->
                                <div class="col-md-12" style="text-align: center!important;margin-top: 1;"><h4 id="span_name_visitante" translate="no">${name?name:''}</h4></div>
                                <div class="col-md-12" style="text-align: center!important;"><h6 class="text-muted " id="span_number_document" >Documento: ${document?document:$('#tx_access_dni').val()}</h6></div>
                    
                                <!--Datos consultados--------------------------------------------------------------->
                                <div class="col-12 py-0" style="text-align: center!important;"><hr>
                                    <div class="row">
                                        <div class="col-6 text-left pl-4">Empresa:</div>
                                        <div class="col-6">${company?company:''}</div>
                                    </div>
                                </div>

                                <div class="col-12 py-0" style="text-align: center!important;"><hr>
                                    <div class="row">
                                    <div class="col-6 text-left pl-4">Último Tamizaje realizado:</div>
                                    <div class="col-6">${last_attention}</div>
                                    </div>
                                </div>

                                <div class="col-12 py-0" style="text-align: center!important;"><hr>
                                    <div class="row">
                                    <div class="col-6 text-left pl-4">Persona que autoriza:</div>
                                    <div class="col-6" id="span_name_organizer">${organizer}</div>
                                    </div>
                                </div>

                                <div class="col-12 py-0" style="text-align: center!important;"><hr>
                                    <div class="row">
                                    <div class="col-6 text-left pl-4" id="span_departament">Área</div>
                                    <div class="col-6">${area}</div>
                                    </div>
                                </div>

                                <div class="col-12 py-0" style="text-align: center!important;"><hr>
                                    <div class="row">
                                        <div class="col-6 text-left pl-4" >Temperatura</div>
                                        <div class="col-6"><input style="border:1px solid #999; padding:5px; border-radius:10px; width:80px"  step="0.1"  type="number" min="32" max="43"  maxlength="4" onkeyup="validarMoneda(this.id)" id="span_temperatures" ></div>
                                    </div>
                                </div>

                                <div class="col-12 py-0" style="text-align: center!important;"><hr>
                                <div class="row">
                                
                                <div class="col-12 text-center text-muted">${toCapitalize(moment().format('dddd D [de] MMMM, HH:mm'))}</div>
                                </div>
                            </div>
                            </div>   

                                <div class="text-center" id="footer_action">
                                    <!--hidden input---------------------------------------------------------------------->
                                    <input type="hidden" id="hid_location" name="hid_location" value="${tamizaje.id_location}">
                                    <input type="hidden" id="hid_id_blacklist" name="hid_id_blacklist" value="${tamizaje.id}">
                                    <input type="hidden" id="hid_area_name" name="hid_area_name" value="${tamizaje.area}">
                                    <input type="hidden" id="hid_action_type" name="hid_action_type" value="${tamizaje.action_type}">
                                    <input type="hidden" id="hid_identity_document" name="hid_identity_document" value="${document?document:$('#tx_access_dni').val()}">
                                    <input type="hidden" id="hid_name_person" name="hid_name_person" value="${name?name:''}">

                                    
                                    <input type="hidden" id="hid_is_collaborator_aforo" name="hid_is_collaborator_aforo" value="${flag_colaborator_aforo}">
                                    <!--Area de botones-------------------------------------------------------------------->
                                    ${buttonAccess}
                                </div>`
                             );
                             if(flag_access==0)//solo se muestra si va entrando para capturar imagen
                             vw_access_event.initInputPhoto(tamizaje.id,1,document,tamizaje.list_type);

                             if(flag_access==0)//si va entrando
                             {
                              
                               if(tamizaje.id!=0)//si tiene tamizaje registrado
                               {
                                
                                    if(flag_temporal==0)
                                    {
                                      console.log("temporal validando")
                                      $("#btnAutorizar").click(function()
                                      {
                                        var check_in = flag_access==0?1:0;
                                        vw_access_event.saveCheckInCovid19Seg(tamizaje.id,check_in,'Temporal');
                                      });
                                      //se agrega evento a boton de detalle de visita
                                      if(visitasa.request_id)
                                      {
                                        $("#btnAccessDEtail").click(function()
                                        {
                                          
                                          $("#modal_show_request_details_footerv").empty();
                                          vw_access_request.viewVisita(visitasa.request_id)
                                          $("#modalShowRequestDetails").modal('show');
                                        });
                                      }

                                    }
                                    else
                                    {
                                      if(accessvalidation==1)//ingreso autorizado-----------------------
                                      {
                                        if(flag_tamizaje==3 || flag_tamizaje==33)//si pasa como vencido
                                        {
                                            $("#btnAutorizar").click(function()
                                            {
                                              var check_in = flag_access==0?1:0;
                                              vw_access_event.saveCheckInCovid19Seg(tamizaje.id,check_in,'Vencido');
                                            });
                                        }
                                        else
                                        {
                                            $("#btnAutorizar").click(function()
                                            {
                                              var check_in = flag_access==0?1:0;
                                              vw_access_event.saveCheckInCovid19Seg(tamizaje.id,check_in);
                                            });
                                        }
                                        //se agrega evento a boton de detalle de visita
                                        if(visitasa.request_id)
                                        {
                                          $("#btnAccessDEtail").click(function()
                                          {
                                            
                                            $("#modal_show_request_details_footerv").empty();
                                            vw_access_request.viewVisita(visitasa.request_id)
                                            $("#modalShowRequestDetails").modal('show');
                                          });
                                        }

                                      }
                                      else
                                      {//ingreso denegado, excepcional-------------------------------
                                        $("#sendIngresoExcepcional").click(function(){//se da evento al boton del modal para responsable excepcional
                                          var check_in = flag_access==0?1:0;
                                          vw_access_event.saveCheckInCovid19Seg(tamizaje.id,check_in,'Excepcional');
                                        });
                                        if(flag_tamizaje==3 || flag_tamizaje==33)
                                        {  
                                            $("#btnAutorizar").click(function()
                                            {
                                              var check_in = flag_access==0?1:0;
                                              if(check_in==1)//se muestra modoal , solo si va entrando
                                              {
                                                $("#modalIngresoExcepcional").modal("show");
                                               
                                                  $("#textRetenerfot").text("Retener Fotocheck / Debe Pasar Tamizaje, Dirigirlo al Tópico Covid")
                                                
                                                }
                                              else 
                                              {
                                                  vw_access_event.saveCheckInCovid19Seg(tamizaje.id,check_in,'Vencido');
                                              }
                                            });
                                        }
                                        else
                                        {
                                          $("#btnAutorizar").click(function()
                                          {
                                            var check_in = flag_access==0?1:0;
                                            if(check_in==1)//se muestra modoal , solo si va entrando
                                              $("#modalIngresoExcepcional").modal("show");
                                            else 
                                            {
                                              vw_access_event.saveCheckInCovid19Seg(tamizaje.id,check_in);
                                            }
                                          });
                                        }
                                      }
                                    }
                                  }
                                  else
                                  {
                                      $("#btnAutorizar").click(function()
                                      {
                                       if(flag_temporal==0)
                                        vw_access_event.processAccess(1,'Temporal')
                                       else if(flag_void==1){
                                         //alert("entró aquí");
                                        //vw_access_event.saveCheckInCovid19Seg(0,1,'Excepcional');// vw_access_event.processAccess(1,'Excepcional')                                        
                                          var check_in = flag_access==0?1:0;
                                          if(check_in==1)//se muestra modoal , solo si va entrando
                                          {
                                            $("#modalIngresoExcepcional").modal("show");
                                            $("#sendIngresoExcepcional").click(function(){//se da evento al boton del modal para responsable excepcional
                                              var check_in = flag_access==0?1:0;
                                              vw_access_event.saveCheckInCovid19Seg(tamizaje.id,check_in,'Excepcional');
                                            });
                                          }                                            
                                          else 
                                          {
                                            vw_access_event.saveCheckInCovid19Seg(tamizaje.id,check_in);
                                          }
                                        
                                       }
                                       
                                       else
                                        vw_access_event.processAccess(1)
                                      });

                                      $("#btnAccessDEtail").click(function()
                                      {
                                        
                                        $("#modal_show_request_details_footerv").empty();
                                        vw_access_request.viewVisita(visitasa.request_id)
                                        $("#modalShowRequestDetails").modal('show');
                                      });

                                      
                                  }
                              }
                              else if(flag_access==1)//si va slaiendo
                              {
                                if(tamizaje.id!=0)//si tiene tamizaje registrado
                                {
                                    $("#btnAutorizar").click(function()
                                      {
                                      var check_in = flag_access==0?1:0;
                                      if(tamizaje.access_type=="Excepcional")
                                        vw_access_event.saveCheckInCovid19Seg(tamizaje.id,check_in,'Excepcional');
                                      else  if(tamizaje.access_type=="Temporal")
                                        vw_access_event.saveCheckInCovid19Seg(tamizaje.id,check_in,'Temporal');
                                      else  if(flag_tamizaje==3 || flag_tamizaje==33)
                                        vw_access_event.saveCheckInCovid19Seg(tamizaje.id,check_in,'Vencido');
                                      else
                                        vw_access_event.saveCheckInCovid19Seg(tamizaje.id,check_in);
                                      });
                                }
                                else{//si viene por visita agendada
                                  $("#btnAutorizar").click(function()
                                  {
                                    if(flag_temporal==0)
                                    vw_access_event.processAccess(0,'Temporal')
                                    else if(flag_void==1)
                                    vw_access_event.saveCheckInCovid19Seg(0,0,'Excepcional');//vw_access_event.processAccess(0,'Excepcional')
                                   else
                                    vw_access_event.processAccess(0)
                                   
                                  });
                                }


                              }
                            
                             
                                

}
else if(type=='mobile')
{

  $("#headerFormCovid").css({background:barHeaderCola})
  $("#status").html(` <div ><label style="margin-left:5px">${titleMessage}</label></div> ` )
  $("#statusdetails").html(`${message}`)

  $("#btnValidateOut").hide();
  $("#btnValidateIn").hide();

  $("#company").text(toCapitalize(company));
  $("#area").text(area);
  $("#local").text(locations?locations:'');
  $("#tx_nomape").val(toCapitalize(name));
  $("#tx_docum").val(document!='null'?document:'');
  $("#tx_ocupacion").val(job?job:'');

  $("#hid_is_collaborator").val(flag_colaborator);     
  $("#hid_is_collaborator_aforo").val(flag_colaborator_aforo); 

  $("#hid_name_company").val(company);
  if(flag_access==0)
  {
    $("#tx_tempIN").val(temperature);
    $("#tx_temoOUTdiv").hide();
    $("#tx_tempINdiv").show();
    if(accessvalidation==1)
    $("#btnValidateIn").show();    
  }
  else if(flag_access==1)
  {
    $("#tx_temoOUT").val(temperature);
    $("#tx_temoOUTdiv").show();
    $("#tx_tempINdiv").hide();
    $("#btnValidateOut").show();
  }


  else{
    
  }
  
  
}
else if(type=='collaborator')
{
  $("#headerFormCovid").css({background:barHeaderCola})
  $("#btnSolicitudTamizaje").hide();
  if(flag_access==0)
    var  notification =  `<div><i class="fa fa-circle  ${circleColor}" style="height: 30px important!;"></i><label style="margin-left:15px">${titleMessage}, ${message}</label></div> `;
  else
    var  notification =  `<div><i class="fa fa-circle  ${circleColor}" style="height: 30px important!;"></i><label style="margin-left:15px">Persona Ingresó, ${message}</label></div> `;
  $("#span_notification").html(notification);

  if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_COVIDSEGURIDAD")
  $("#btnSolicitudTamizaje").show();


  $("#btnCancelTamizaje").hide();
  if(tamizaje.covid_test==1 || tamizaje.covid_test==4){
    if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_COVIDSEGURIDAD")
    $("#btnCancelTamizaje").show();
  }
  if((flag_tamizaje==1 && tamizaje.covid_test ==2) || (flag_tamizaje==0 && tamizaje.covid_test ==2) )
  {
    if(getCookie("vtas_rolexternalrol"+sessionStorage.tabVisitasa)!="ROL_COVIDSEGURIDAD")
    $("#btnCancelTamizaje").show();
  }
  else{
    $("#btnSolicitudTamizaje").hide();
    }
}
else if(type=='visita')//se valida las paersonas que se agendan a una visita-----------------------------------------------------------------------------------------------
{
  //typeRequest,objInputDocument
    console.log("Tipo  Visita: ",typeRequest,message)
    console.log("Validando Registro de persona en visita");
    message='';
    var notifi=0;
    if(tamizaje.id!=0)
      $("#add_covid_test_"+positionformVisit).val(tamizaje.covid_test)
    else
      $("#add_covid_test_"+positionformVisit).val("")
    if(typeRequest==1)
    {
        //debe llevar tamizaje que se consulte por ois
        console.log("Visita");
        if(flag_riesgo==1 || flag_blacklist==1 )
        {
  
            colreMessage='text-white bg-danger';
            circleColor="text-danger";
            barHeaderCola="#f44336";
  
            if(flag_riesgo==1)
            { 
                message=message+' Persona en Lista de Riesgo.';
            }
            if(flag_blacklist==1)
            {
                message=message+' Persona en Lista de Negra.';
            }
            
            notifi=1
        }
    }
    if(typeRequest==2)
    {
      //su tamizaje se debe solicitar por visitasa
      console.log("Contratista");
      if(flag_tamizaje==1 || flag_tamizaje==4 || flag_tamizaje==5 ||  flag_ois==1 || flag_riesgo==1 || flag_blacklist==1 )
      {

          colreMessage='text-white bg-danger';
          circleColor="text-danger";
          barHeaderCola="#f44336";

          if(flag_riesgo==1)
          { 
              message=message+' Persona en Lista de Riesgo.';
          }
          if(flag_blacklist==1)
          {
              message=message+' Persona en Lista de Negra.';
          }
          if(flag_tamizaje==4)
          {
              message=message+' Tamizaje no ha sido Aprobado.';
          }
          if(flag_tamizaje==1)
          {
              message=message+' Persona no tiene solicitud de Tamizaje.';
          }
          if(flag_tamizaje==5)
          {
              message=message+' Tamizaje ha sido Cancelado.';
          }
          
          if(flag_ois==1)
          {
              message=message+textErrorOIS;
          }
          notifi=1
      }
      

    }
    if(typeRequest==3)
    {
      //no requieren tamizaje por que van por poco tiempo
      console.log("Proveedor");
      if(flag_riesgo==1 || flag_blacklist==1 )
      {

          colreMessage='text-white bg-danger';
          circleColor="text-danger";
          barHeaderCola="#f44336";

          if(flag_riesgo==1)
          { 
              message=message+' Persona en Lista de Riesgo.';
          }
          if(flag_blacklist==1)
          {
              message=message+' Persona en Lista de Negra.';
          }
          
          notifi=1
      }
    }
    if(typeRequest==4)
    {
      //no requieren tamizaje por que van por poco tiempo
      console.log("Transportista");
      if(flag_riesgo==1 || flag_blacklist==1 )
      {

          colreMessage='text-white bg-danger';
          circleColor="text-danger";
          barHeaderCola="#f44336";

          if(flag_riesgo==1)
          { 
              message=message+' Persona en Lista de Riesgo.';
          }
          if(flag_blacklist==1)
          {
              message=message+' Persona en Lista de Negra.';
          }
          
          notifi=1
      }
    }
    if(typeRequest==7)
    {
      //su tamizaje se debe solicitar por visitasa
      console.log("Cliente");

      if(flag_tamizaje==1 || flag_tamizaje==4 || flag_tamizaje==5 ||  flag_riesgo==1 || flag_blacklist==1 )
      {
          
         
          colreMessage='text-white bg-danger';
          circleColor="text-danger";
          barHeaderCola="#f44336";

          if(flag_riesgo==1)
          { 
              message=message+' Persona en Lista de Riesgo.';
          }
          if(flag_blacklist==1)
          {
              message=message+' Persona en Lista de Negra.';
          }
          if(flag_tamizaje==4)
          {
              message=message+' Tamizaje no ha sido Aprobado.';
          }
          if(flag_tamizaje==1)
          {
              message=message+' Persona no tiene solicitud de Tamizaje.';
          }
          if(flag_tamizaje==5)
          {
              message=message+' Tamizaje ha sido Cancelado.';
          }
          notifi=1
         
      }
    }

    if(notifi==1)
    {
      swal({
        title: "Documento: "+document,
        text: message,
        type: "error",
        timer:5000,
        showCancelButton: false,
        confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
        confirmButtonText: "De acuerdo",
        closeOnConfirm: false
      });
      objInputDocument.val("");
    }

}

}
else
{
  showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.");
}
}
else//se valida el ingreso de vehiculos--------------------------------------------------------------------------------------------------------------------------------
{
  //b9i735    
  console.log("Validando vehicle.....")
  var img ="images/iconos/vehiclesecu.svg";
  if(type=='security')
  {
  
  $("#textNotificationAccess").text("Buscando Vehículo... Por favor Espere...");//texto en  barra
  $("#barNotificationAccess")[0].className="card-header  "+colreMessage;//estilo de barra
  $("#showAccessDataCard").empty();
  $("#showAccessDataCard").html(`
 
                          <!--texto detalle de ingreso--------------------------------------------------------------->
                          <div class="row p-2" >
                          <div class="col-md-12" style="text-align:center!important;"><span class=""  style="border-bottom: 0px!important;">Validando...</span></div>
                          </div>
                         
                          <div class="row">
                              <!--imagen de persona--------------------------------------------------------------->
                              <div class="col-md-12 pb-0" style="text-align: center!important;">
                                  <img id="img_visitante" src="images/iconos/vehiclesecu.svg" alt="" class="rounded-circle img-fluid" style="height: 16vh; width: 16vh;">
                                      <br>
                                      
                              </div>
                              <!--datos base-------------------------------------------------------------------->
                              <div class="col-md-12" style="text-align: center!important;margin-top: 2;"><h5 id="span_name_visitante" translate="no">Nombre...</h5></div>
                              <div class="col-md-12" style="text-align: center!important;"><h6 class="text-muted " id="span_number_document" >Documento: ...</h6></div>
                  
                              <!--Datos consultados--------------------------------------------------------------->
                              <div class="col-12" style="text-align: center!important;"><hr>
                                  <div class="row">
                                      <div class="col-6 text-left pl-4">Empresa:</div>
                                      <div class="col-6">...</div>
                                  </div>
                              </div>

                              <div class="col-12" style="text-align: center!important;"><hr>
                                  <div class="row">
                                  <div class="col-6 text-left pl-4">Último Tamizaje realizado:</div>
                                  <div class="col-6">...</div>
                                  </div>
                              </div>

                              <div class="col-12" style="text-align: center!important;"><hr>
                                  <div class="row">
                                  <div class="col-6 text-left pl-4">Persona que autoriza:</div>
                                  <div class="col-6" id="span_name_organizer">...</div>
                                  </div>
                              </div>

                              <div class="col-12" style="text-align: center!important;"><hr>
                                  <div class="row">
                                  <div class="col-6 text-left pl-4" id="span_departament">Área</div>
                                  <div class="col-6">...</div>
                                  </div>
                              </div>

                              <div class="col-12" style="text-align: center!important;"><hr>
                                  <div class="row">
                                      <div class="col-6 text-left pl-4" >Temperatura</div>
                                      <div class="col-6">...</div>
                                  </div>
                              </div>
                          </div>   

                              <div class="text-center" id="footer_action">
                                  <!--hidden input---------------------------------------------------------------------->
                                  <input type="hidden" id="hid_location" name="hid_location" value="0">
                                  <input type="hidden" id="hid_id_blacklist" name="hid_id_blacklist" value="">
                                  <input type="hidden" id="hid_area_name" name="hid_area_name" value="">
                                  <input type="hidden" id="hid_action_type" name="hid_action_type" value="}">
                                  <input type="hidden" id="hid_identity_document" name="hid_identity_document" value="">
                                  <input type="hidden" id="hid_is_collaborator" name="hid_is_collaborator" value="">
                                  <!--Area de botones-------------------------------------------------------------------->
                              </div>`
                           );
  }

      var name = getCookie('vtas_fullname'+sessionStorage.tabVisitasa);
      var created_by = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);

      var buttonAccess="";
      
      var url = apiurlaccessregistries+"/api/Get-AccessEvent-All?httpmethod=searchVehicleConfirm&dni="+document+"&id_location=2&created_by="+created_by+"&code="+Getaccesseventallcode+"";                   
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
        
        $("#dataReqAccessVehicule").val(""); 
        plateglobal=document;
        hideLoading();
        var textBotton = '<span style="text-transform: uppercase;">C</span>amión cisterna';
        if (data.id_vehicle)//vehiculo autorizado 
        {
          if(data.action_type==0)
          {
            var titleMessage="Ingreso Autorizado";

            buttonAccess=`
           <button type="button" id="btnAutorizarVehiculoParticular" class="btn btn-green-lime btn-raised btn-rounded mt-2" style="padding: 0rem 1rem!important; text-transform:lowercase!important;  height: 30px;" onclick="vw_access_event.validateAccessVehicle()"><span style="text-transform: capitalize;">Registrar Ingreso</button>
           <button type="button" id="btnAutorizarVehiculoParticular" class="btn btn-primary btn-rounded btn-raised mt-2" style="padding: 0rem 1rem!important; text-transform:lowercase!important;  height: 30px;" onclick="vw_access_event.confirmVisitaAccessVehicle()"><span style="text-transform: capitalize;">Registrar Detalles</button>
              
                                          `;
          }
          else
          {
            var titleMessage="Salida Autorizada";

            buttonAccess=`
           <button type="button" id="btnAutorizarVehiculoParticular" class="btn btn-green-lime btn-raised btn-rounded mt-2" style="padding: 0rem 1rem!important; text-transform:lowercase!important;  height: 30px;" onclick="vw_access_event.validateAccessVehicle()"><span style="text-transform: capitalize;">Registrar Salida</button>
 
                                          `;
          }

          var colreMessage="bg-success";

          $("#dataReqAccessVehicule").val(JSON.stringify(data)); 
          $("#showAccessDataCard").empty();
          //<button type="button" id="btnAutorizar" class="btn  btn-raised btn-rounded mt-2"  style="padding: 0rem 1rem!important; text-transform:lowercase!important;  height: 30px;"  onclick="vw_access_event.confirmVisitaAccessVehicleCisterna()"  >${textBotton}</button>
          
           
        }
        else
        {

          
         
         
          if(Object.keys(data).length === 0)
          {
            data="";
            plateglobal=document;
            $("#dataReqAccessVehicule").val("");
          }
          else{
            $("#dataReqAccessVehicule").val(JSON.stringify(data)); 
            $("#showAccessDataCard").empty();
          }
          
          if(data.action_type==0 || data=="")
          {
            
            var colreMessage="bg-danger";
            var titleMessage="Ingreso Denegado";
            buttonAccess=`
            <button type="button" id="btnAutorizarVehiculoParticular" class="btn btn-danger btn-raised btn-rounded mt-2" style="padding: 0rem 1rem!important; text-transform:lowercase!important;  height: 30px;" onclick="vw_access_event.validateAccessVehicle('Excepcional')"><span style="text-transform: capitalize;">Ingreso Excepcional</button>
   
            `;
          }
          else
          {
            
            var colreMessage="bg-danger";
            var titleMessage="Salida";
            buttonAccess=`
            <button type="button" id="btnAutorizarVehiculoParticular" class="btn btn-danger btn-raised btn-rounded mt-2" style="padding: 0rem 1rem!important; text-transform:lowercase!important;  height: 30px;" onclick="vw_access_event.validateAccessVehicle('Excepcional')"><span style="text-transform: capitalize;">Registrar Salida</button>
   
            `;
          }
        }


        if(type=='security')
        {
          
          $("#textNotificationAccess").text(titleMessage);//texto en  barra
          $("#barNotificationAccess")[0].className="card-header text-white "+colreMessage;//estilo de barra
          $("#showAccessDataCard").empty();
          $("#showAccessDataCard").html(`
         
                                  <!--texto detalle de ingreso--------------------------------------------------------------->
                                  <div class="row p-1" >
                                  <div class="col-md-12" style="text-align:center!important;"><span class="h6"  style="border-bottom: 0px!important;"></span></div>
                                  </div>
                                 
                                  <div class="row p-0">
                                      <!--imagen de persona--------------------------------------------------------------->
                                      <div class="col-md-12 p-0 " style="text-align: center!important;">
                                          <img id="img_visitante" src="${img}" alt="" class="rounded-circle img-fluid" style="height: 15vh; width: 15vh;">
                                              <br>
                                              <input type="hidden" id="hid_is_collaborator" name="hid_is_collaborator" value=""> 
                                      </div>
                                      <!--datos base-------------------------------------------------------------------->
                                     
                                      <div class="col-md-12" style="text-align: center!important;"><h6 class="text-muted " id="span_number_document" >Placa: ${data.license_plate?data.license_plate:$('#tx_access_dni').val()}</h6></div>
                          
                                      <!--Datos consultados--------------------------------------------------------------->
                                      <div class="col-12" style="text-align: center!important;"><hr>
                                          <div class="row">
                                              <div class="col-6 text-left pl-4">Conductor:</div>
                                              <div class="col-6">${data.driver_name?data.driver_name:'--'}</div>
                                          </div>
                                      </div>
                                      
      
                                      <div class="col-12" style="text-align: center!important;"><hr>
                                          <div class="row">
                                          <div class="col-6 text-left pl-4">Brevete:</div>
                                          <div class="col-6">${data.driver_license_number?data.driver_license_number:'--'} (${data.driver_license_category?data.driver_license_category:'--'})</div>
                                          </div>
                                      </div>
                                      <div class="col-12" style="text-align: center!important;"><hr>
                                      <div class="row">
                                          <div class="col-6 text-left pl-4">Empresa:</div>
                                          <div class="col-6">${company?company:'--'}</div>
                                      </div>
                                      </div>
                                      <div class="col-12" style="text-align: center!important;"><hr>
                                          <div class="row">
                                          <div class="col-6 text-left pl-4">Persona que autoriza:</div>
                                          <div class="col-6" id="span_name_organizer">${data.data_supervisor_contact?data.data_supervisor_contact:'--'}</div>
                                          </div>
                                      </div>
      
                                      <div class="col-12" style="text-align: center!important;"><hr>
                                          <div class="row">
                                          <div class="col-6 text-left pl-4" id="span_departament">Área</div>
                                          <div class="col-6">${data.name_area?data.name_area:'--'}</div>
                                          </div>
                                      </div>
      
                                  </div>   
      
                                      <div class="text-center" id="footer_action">
                                         
                                          ${buttonAccess}

                                          
                                      </div>`
                                   );


        }
        if('mobile')
        {

        }

    });
}
}
var vt_checkSecurity = function(document){
  showLoading();
    var document = document.trim();
    var param= {filter:''};
    //var url= apiurlsecurity+"/api/Get-CheckPersonConditions-All?code="+GetCheckPersonConditionsAll+"&httpmethod=checkpersonconditions&identity_document="+document;              
    var url= apiurlaccessregistries+"/api/Get-CheckPersonConditions-All?code="+GetCheckPersonConditionsAll+"&httpmethod=checkpersonconditions&identity_document="+document;              
    var headers ={"Authorization":TOKEN_CLIENT,"apiKey":"r$3#23516ewew5"}
    var secury = [];
    $.ajax({                    
        method: "POST",
        url:  url,
        async:false,
        data : JSON.stringify(param),
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function(data)
    {
      secury=data;

    });      
    return secury;
  }
var vt_checkCollaborator = function(document){
  showLoading();
    var document = document.trim();
    var param= {filter:document};
    var url= apiurlsecurity+"/api/Get-Collaborator?code="+GetCollaborator+"&httpmethod=objectdni";              
    var headers ={"Authorization":TOKEN_CLIENT,"apiKey":"r$3#23516ewew5"}
    var colaborator = [];
    $.ajax({                    
        method: "POST",
        url:  url,
        async:false,
        data : JSON.stringify(param),
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function(data)
    {
        colaborator=data;

    });      
    return colaborator;
  }
  var vt_checkTamizajes = function(document){
    showLoading();
    var identity_document = document.trim();
    
    var url = apiurlblacklist+"/api/Get-Blacklist-User?code="+getblacklistusercode+"&httpmethod=verifyblacklist&identity_document="+identity_document;                   
    var headers ={
        "apikey":"r$3#23516ewew5"        
    }
    var resp ;
    var tamizaje = [];
    $.ajax({                    
        method: "POST",
        url:  url,
        async:false,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function(data)
    {
        tamizaje=data;
     
    });      
    return tamizaje;
  }
  var vt_checkBlackList = function(document){
    showLoading();
   
    var identity_document = document.trim();
    
    var url = apiurlblacklist+"/api/Get-Blacklist-User?code="+getblacklistusercode+"&httpmethod=verifyblacklistListType1&identity_document="+identity_document;                   
    var headers ={
        "apikey":"r$3#23516ewew5"        
    }
    var resp ;
    var blacklist = [];
    $.ajax({                    
        method: "POST",
        url:  url,
        async:false,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function(data)
    {
      blacklist=data;
     
    });      
    return blacklist;
  }
var vt_checkRiskList = function(document){
  showLoading();
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

  var vt_checkDataOIS= function(document){
    showLoading();
    var document = document.trim();

    var url         = apiurlsecurity+"/api/Get-OIS?code="+GetOIS+"&httpmethod=object&dni="+document.trim();             
    var headers ={
        "apikey":"r$3#23516ewew5"        
    }
    var ois ={};
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
    return ois;
  }

  var vt_checkDataVisitasa= function(document,search){
    showLoading();
    var httpmethod = 'searchUserConfirm';
    if(search==0)
      httpmethod = 'searchVehicleConfirm';
  
    var name = getCookie('vtas_fullname'+sessionStorage.tabVisitasa);
    var created_by = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
    var document = document.trim();

    var url = apiurlaccessregistries+"/api/Get-AccessEvent-All?httpmethod="+httpmethod+"&dni="+document+"&id_location=2&created_by="+created_by+"&code="+Getaccesseventallcode+"";                   
    var headers ={
        "apikey":"r$3#23516ewew5"        
    }
    var visitasa ={};
    $.ajax({                    
        method: "POST",
        url:  url,
        async:false,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function(data)
    {

        visitasa=data;

        /*  if(!data.access)
    { */
      

    });      
    return visitasa;
  }

