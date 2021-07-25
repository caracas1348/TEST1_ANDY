
//");
//############################################# CLASES DEL MODULO PLAN DE AUDITORIA ######################################
             //AuditorPlan( Code, CodeSede, CodeTipoAuditoria, Code_Normas, Description, DescriptionAuditoria, DescriptionSede, DescriptionUnidadNegocio, Fin, Id, Inicio, UnidadNegocioId)


            // if (screen.width < 1024)
            //         accionResoluciónPequeña();//alert("Pequeña")
            // else
            // if (screen.width < 1280)
            //         accionResoluciónMediana();//alert("Mediana")
            // else
            //         accionResoluciónGrande()//lert("Grande")


             //.............................................. CLASE cAuditoria ...........................................
             function cAuditoria()
             {

                    this.Alcance;
                    this.Auditores= [];
                    this.AuditoresPDF= [];
                    this.Code;
                    this.CodeUnidadNegocio;
                    this.Code_Normas;
                    this.Description;
                    this.DescriptionAuditoria;
                    this.DescriptionSede;
                    this.DescriptionStatus;
                    this.DescriptionUnidadNegocio;
                    this.Description_Motivo;
                    this.Detalle;
                    this.EspecialidadId;
                    this.Fecha_Creacion_Plan;
                    this.Fin;
                    this.Fin_Plan;
                    this.Flag_Finalizado_Plan;
                    this.Id;
                    this.Id_Normas;
                    this.Id_Procesos;
                    this.Inicio;
                    this.Inicio_Plan;
                    this.PlanId;
                    this.Procesos
                    this.Programacion_Plan = []
                    this.Resumen_Auditoria;
                    this.SedeId;
                    this.StatusId;
                    this.UnidadNegocioId;

                    //sprint3
                    this.NoConformidadCritica;
                    this.NoConformidadMayor;
                    this.NoConformidadMenor;
                    this.Observaciones;
                    this.OportunidadMejora;
                    this.Conformidad;





             }
             cAuditoria.prototype.cargarBD2 = function (data){

                        // this.CodeSede = data.CodeSede
                        // this.CodeTipoAuditoria =  data.CodeTipoAuditoria
                        // this.Code_Normas=  data.Code_Normas
                        // this.Description=  data.Description
                        // this.DescriptionAuditoria=  data.DescriptionAuditoria
                        // this.DescriptionSede=  data.DescriptionSede
                        // this.DescriptionUnidadNegocio=  data.DescriptionUnidadNegocio
                        // this.Fin=  data.Fin
                        // this.Id=  data.Id
                        // this.Inicio=  data.Inicio
                        // this.UnidadNegocioId=  data.UnidadNegocioId
                        // this.BDtarea = 0
                        // this.Auditores = data.Auditores
                        // this.htmlOptionAuditor = ""

                    }


                    cAuditoria.prototype.cargarBDAud = function(data){

                                this.Alcance= data.Alcance
                                //this.Auditores= [data.Id] = new cAuditores();
                                this.AuditoresPDF = data.Auditores;
                                this.Code= data.Code
                                this.CodeUnidadNegocio= data.CodeUnidadNegocio
                                this.Code_Normas= data.Code_Normas
                                this.Description= data.Description
                                this.DescriptionAuditoria= data.DescriptionAuditoria
                                this.DescriptionSede= data.DescriptionSede
                                this.DescriptionStatus= data.DescriptionStatus
                                this.DescriptionUnidadNegocio= data.DescriptionUnidadNegocio
                                this.Description_Motivo= data.Description_Motivo
                                this.Detalle= data.Detalle
                                this.EspecialidadId= data.EspecialidadId
                                this.Fecha_Creacion_Plan= data.Fecha_Creacion_Plan
                                this.Fin= data.Fin
                                this.Fin_Plan= data.Fin_Plan
                                this.Flag_Finalizado_Plan= data.Flag_Finalizado_Plan
                                this.Nota= data.Nota
                                this.Id= data.Id
                                this.Id_Normas= data.Id_Normas
                                this.Id_Procesos= data.Id_Procesos
                                this.Inicio= data.Inicio
                                this.Inicio_Plan= data.Inicio_Plan
                                this.PlanId= data.PlanId
                                this.Procesos = data.Procesos;
                                //this.Programacion_Plan = []
                                this.Resumen_Auditoria= data.Resumen_Auditoria
                                this.SedeId= data.SedeId
                                this.StatusId= data.StatusId
                                this.UnidadNegocioId= data.UnidadNegocioId

                                //sprint3
                                this.NoConformidadCritica = data.NoConformidadCritica
                                this.NoConformidadMayor   = data.NoConformidadMayor
                                this.NoConformidadMenor   = data.NoConformidadMenor
                                this.Observaciones        = data.Observaciones
                                this.OportunidadMejora    = data.OportunidadMejora
                                this.Conformidad          = data.Conformidad

                             }
               //---------------------------------------------- CLASE cAuditoria -------------------------------------------


              //---------------------------------------------- CLASE ListadoAuditoria -------------------------------------------
                function cAuditores()
                {
                    this.Id = []
                    this.Name = []
                    this.Selected = []
                    this.Tipo_Des = []
                    this.Tipo_Id = []
                    this.nAud = 0; //numero de auditores pestaña datos principales
                    this.nObs = 0; //numero de observadores pestaña datos principales
                    this.html2 = "";//html de auditores
                    this.html3 = "";//html de auditores
                    this.htmlA = "";//html de auditores
                    this.htmlO = "";//html de observadores


                }
                   cAuditores.prototype.cargarBDGente = function(data)
                    {
                        //alert();
                        var i = 0;
                        var html3 = " ";
                        var nAud = 0; //numero de auditores pestaña datos principales
                        var nObs = 0; //numero de observadores pestaña datos principales
                        var html2 = "";//html de auditores
                        var htmlA = "";//html de auditores
                        var htmlO = "";//html de observadores
                        data.forEach((Item)=>
                        {
                            var ccp = 0;//aqui deberia de recibir el auditor seleccionado del requisito



                            switch (Item.Tipo_Des)
                           {

                                case 'Auditor Lider':
                                    if (Item.Selected!=0)
                                    {
                                        //alert("Entrandoooooooooooo Lider = "+Item.Name);
                                        //selectAuditores[t] = data.Auditores[i];
                                        //alert("Auditor Lider ("+ Item.Id[i]+") ==  AuditorBD("+ccp+")");
                                        if(Item.Id == ccp)
                                         {
                                               //alert("("+i+")("+ Id5_ +")AuditorLider AAUDITOR ("+ Item.Id[i]+") ==  AuditorBD("+ccp+")")
                                            html3 +=  `
                                            <option value="${ Item.Id}" selected>${Item.Name}(Lider)</option>`
                                         }
                                         else
                                         {
                                            html3 +=  `
                                            <option value="${ Item.Id}" >${Item.Name}(Lider)</option>`
                                         }
                                         html2 +=  `
                                            <option value="${ Item.Id}" >${Item.Name}(Lider)</option>`

                                            this.Id[i] = Item.Id
                                            this.Name[i] = Item.Name
                                            this.Selected[i] = Item.Selected
                                            this.Tipo_Des[i] = Item.Tipo_Des
                                            this.Tipo_Id[i] = Item.Tipo_Id
                                            i++;


                                    }
                                    break;
                                   case 'Auditor':
                                    if (Item.Selected!=0)
                                    {
                                        //alert("Auditorrrr Simple = "+Item.Name);
                                        //aqui cargamos el como visual
                                           htmlA += `
                                           <div class="caja-list-int"><p>${Item.Name}</p></div>`
                                           if(Item.Id == ccp)
                                           {

                                            html3 +=  `
                                            <option value="${ Item.Id}" selected>${Item.Name}-${ccp}</option>`
                                           }
                                           else
                                           {
                                            html3 +=  `
                                            <option value="${ Item.Id}" >${Item.Name}2</option>`
                                           }
                                           html2 +=  `
                                           <option value="${ Item.Id}" >${Item.Name}2</option>`

                                            this.Id[i] = Item.Id
                                            this.Name[i] = Item.Name
                                            this.Selected[i] = Item.Selected
                                            this.Tipo_Des[i] = Item.Tipo_Des
                                            this.Tipo_Id[i] = Item.Tipo_Id

                                            nAud++;
                                            i++;

                                    }
                                    break;
                                case 'Observador':
                                    if (Item.Selected!=0){
                                        //aqui cargamos el como visual
                                        htmlO += `
                                           <div class="caja-list-int"><p>${Item.Name}</p></div>`

                                           //selectAuditores[t] = data.Auditores[i];t++;
                                           nObs++;
                                    }
                                    break;
                            }

                        })


                        this.nAud = nAud; //numero de auditores pestaña datos principales
                        this.nObs = nObs; //numero de observadores pestaña datos principales
                        this.html3 = html3; //listado de auditores para los reqisitos
                        this.html2 = html2;//html de auditores
                        this.htmlA = htmlA;//html de auditores
                        this.htmlO = htmlO;//html de observadores

                     }

//***************************************************************************************************************************** */
                      //[............................................. CLASE cPlanAuditoria .........................................]
                       /*Class*/ function cPlanAuditoria()
                                 {
                                     //alert("creando la instancia de cPlanAuditoria");
                                    this.PlanId = 0;//cuando es nuevo su valor por defecto es cero //no json
                                    this.BDtarea = 0;//[0-crear, 1-modificar, 2-eliminar]  /no json
                                    this.AuditoriaId
                                    this.Detalle
                                    this.Alcance
                                    this.Inicio
                                    this.Fin

                                    this.Hora_Inicio_Real
                                    this.Hora_Fin_Real

                                    this.Created_By
                                    this.Data_Inicial
                                    this.Data_Final
                                    this.Motivo
                                    this.Last_Updated_By
                                    this.Flag_Finalizado
                                    this.Resumen_Auditoria
                                    this.Programacion = []

                                 }
                                   //Public
                                          /*public function*/ cPlanAuditoria.prototype.leerPlanSendDB = function ()
                                            {
                                                //ahora te voy a validar para ver si es un insert o un update

                                                //alert("funcion leerPlanSendDB de la clase cPlanAuditoria");
                                                //this.PlanId
                                                this.AuditoriaId = istAud;    //alert(this.AuditoriaId)
                                                this.Detalle = $("#txt_objetivo_plan").val();
                                                this.Alcance = $("#txt_alcance_plan").val(); //alert("d="+this.Detalle+", a="+this.Alcance)
                                                this.Inicio = date1_DD_MM_AAAA_to_AAAA_MM_DD_T_HH_MM_S($("#txt_fechaInicioEj").val())
                                                this.Fin =  date1_DD_MM_AAAA_to_AAAA_MM_DD_T_HH_MM_S($("#txt_fechaFinEj").val())
                                                this.Created_By = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
                                                this.Data_Inicial = "del "+this.Inicio+" al "+this.Fin;
                                                this.Data_Final = "del "+this.Inicio+" al "+this.Fin;
                                                this.Motivo = "Carga inicial del Plan";
                                                this.Last_Updated_By = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
                                                this.Flag_Finalizado = 0;
                                                this.Resumen_Auditoria =  $("#resumen-auditoria").val(); //height: 312px;
                                                this.Programacion = []




                                                var ji =0;
                                                //var nK =  objResultados.length;
                                                var nK = objAuditoria[istAud].Procesos.length;
                                                //console.clear()
                                                //console.log("Estoyyyyyyyyyyyyyyyyyyyyyyyyyy (",nK,")guardando",objResultados);
                                                var hh = 0;
                                                    for(ji =0; ji<nK; ji++)
                                                    {
                                                        console.log("*********[",ji,"]****LISTA DE OBJETOS",objAuditoria[istAud].Procesos[ji]);

                                                        console.log("*********[",ji,"]****LISTA DE OBJETOS",objAuditoria[istAud].Procesos[ji].Selected);

                                                      //alert(this.BDtarea)
                                                        if(this.BDtarea == 0)
                                                        {//-------------------------- creando nuevos registros -------------------------
                                                            if(objAuditoria[istAud].Procesos[ji].Selected == 1)
                                                            {
                                                                var m = objAuditoria[istAud].Procesos[ji].Requisitos.length;
                                                                for(u =0; u<m; u++)
                                                                {
                                                                      this.Programacion[hh] = [] //limpiamos el objeto
                                                                      this.Programacion[hh] = new cProgramacion();
                                                                      this.Programacion[hh].readPlanSendDB(objAuditoria[istAud].Procesos[ji].Requisitos[u],u);

                                                                     //alert(hh)
                                                                     console.log("************REQUISITO  INSERTAR [",ji,"] = ",objAuditoria[istAud].Procesos[ji].Requisitos[u]);
                                                                     hh++;
                                                                }
                                                            }
                                                        }//-------------------------- creando nuevos registros -------------------------
                                                        else
                                                        {//-------------------------- modificando el plan de auditoria ------------------
                                                            if(objAuditoria[istAud].Procesos[ji].Selected > 0)
                                                            {
                                                                var m = objAuditoria[istAud].Procesos[ji].Requisitos.length;
                                                                for(u =0; u<m; u++)
                                                                {
                                                                      this.Programacion[hh] = [] //limpiamos el objeto
                                                                      this.Programacion[hh] = new cProgramacion();
                                                                      this.Programacion[hh].readPlanSendDB(objAuditoria[istAud].Procesos[ji].Requisitos[u],u);

                                                                     //alert(hh)
                                                                     console.log("************REQUISITOS  MODIFICAR [",ji,"] = ",objAuditoria[istAud].Procesos[ji].Requisitos[u]);
                                                                     hh++;
                                                                }
                                                            }
                                                        }//-------------------------- modificando el plan de auditoria ------------------








                                                    }



                                            }//----------/*public function*/ cPlanAuditoria.prototype.leerPlanSendDB = function ()


                                             /*public function*/ cPlanAuditoria.prototype.cargarPlanDB = function (DATA)
                                             {

                                                this.BDtarea = 1;insertarModificar = 1;
                                                this.AuditoriaId = DATA.Id
                                                this.Detalle = DATA.Detalle
                                                this.Alcance = DATA.Alcance
                                                this.Inicio = DATA.Inicio_Plan
                                                this.Fin = DATA.Fin_Plan //date1_DD_MM_AAAA_to_AAAA_MM_DD_T_HH_MM_S($("#txt_fechaFin").val())
                                                this.Resumen_Auditoria = DATA.Resumen_Auditoria
                                                        var ji =0;
                                                        var n = DATA.Programacion_Plan.length;
                                                        for(ji =0; ji<n; ji++)
                                                        {

                                                            if(this.Programacion[ji]){this.Programacion[ji] = []}//limpiamos el objeto
                                                            this.Programacion[ji] = new cProgramacion();
                                                            this.Programacion[ji].BDtarea = 1;
                                                            this.Programacion[ji].AuditorId = DATA.Programacion_Plan[ji].AuditorId;
                                                            this.Programacion[ji].Inicio = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(DATA.Programacion_Plan[ji].Inicio)




                                                            //this.Hora_Inicio_Real = DATA.Programacion_Plan[ji].Hora_Inicio_Real;
                                                            //this.Hora_Fin_Real    = DATA.Programacion_Plan[ji].Hora_Fin_Real;

                                                            console.log('------------------*************---------------------andy');
                                                            console.log(DATA.Programacion_Plan[ji].Hora_Inicio_Real);
                                                            console.log('-------------------************--------------------andy');

                                                            this.Programacion[ji].Hora_Inicio = DATA.Programacion_Plan[ji].Hora_Inicio
                                                            this.Programacion[ji].Hora_Fin = DATA.Programacion_Plan[ji].Hora_Fin


                                                            this.Programacion[ji].TipoHallazgoId = DATA.Programacion_Plan[ji].TipoHallazgoId
                                                            this.Programacion[ji].Hallazgo = DATA.Programacion_Plan[ji].Hallazgo

                                                            //alert(this.Programacion[ji].AuditorId)

                                                            //document.getElementById("")
                                                        }

                                             }//---------END........public function*/ cPlanAuditoria.prototype.buscarPlanDB = function (IdAudd)



                            //[............................................. CLASE cPlanAuditoria .........................................]
                                       //[............................................. CLASE cPlanAuditoria .........................................]
                                            function cProgramacion()
                                            {
                                                //alert("aqui esty construyendo el objeto de la clase programacion");
                                                this.UnidadNegocioProcesoId=0;//cuando es nuevo su valor por defecto es cero //no json
                                                this.AuditorId = 0;
                                                this.Inicio = "2000-01-01"
                                                this.Hora_Inicio = "00:00:00"
                                                this.Hora_Fin = "00:00:00"
                                                this.TipoHallazgoId = 0
                                                this.Hallazgo = " "
                                                this.Created_By = " "
                                                this.Created_Date = "2000-01-01"
                                                this.Last_Updated_By = " "
                                                this.Last_Updated_Date= "2000-01-01"
                                                this.BDtarea = 0;
                                                //this.html3 = ""


                                            }
                                                //Public
                                                        /*public function*/ cProgramacion.prototype.readPlanSendDB = function (req,i)
                                                            {//-------------------------------------------------------------------##############
                                                               //console.log("### req ###",req);

                                                               //alert("AHORA LLAMO A LA FUNCION DE LA CLASE PROGRAMA QUE CARGA N REQUISITOS CON SUS AUDITORES Y FECHA Y hora");

                                                                var idl =  req.UnidadNegocioProcesoId;
                                                                var pId = req.ProcesoId
                                                                var now = moment().format('YYYY-MM-DD');

                                                                //-------------------------- construimos el listado de nombres ----------------------
                                                                var px = pId
                                                                var id1 = "txt-proceso_"+px+"_"+i  //proceso
                                                                var id2 =  "txt-capitulo_"+px+"_"+i
                                                                var id3 =  "txt-requisitos_"+px+"_"+i
                                                                var id4 =  "sel-auditores_"+px+"_"+idl


                                                                var id5 =  "txt_date_prog_"+px+"_"+idl
                                                                var id6 =  "txt-hora-inicio_"+px+"_"+idl
                                                                var id7 =  "txt-hora-fin_"+px+"_"+idl

                                                                var id16 =  "real_txt-hora-inicio_"+px+"_"+idl
                                                                var id17 =  "real_txt-hora-fin_"+px+"_"+idl


                                                                //resultados
                                                                var id8 =  "sel-tipo_"+px+"_"+idl
                                                                var id9 =  "btn-hallazgo_"+px+"_"+idl
                                                                var id10 =  "txt_hden_hallazgo_"+px+"_"+idl
                                                                 //-------------------------- construimos el listado de nombres ----------------------


                                                                // console.log("############____________##############_______jiren_____################___________##################");
                                                                // console.log("id_read a crear:"+id1);
                                                                // console.log("id_read a crear:"+id2);
                                                                // console.log("id_read a crear:"+id3);
                                                                // console.log("id_read a crear:"+id4);
                                                                // console.log("id_read a crear:"+id5);
                                                                // console.log("id_read a crear:"+id6);
                                                                // console.log("id_read a crear:"+id6);
                                                                // console.log("id_read a crear:"+id7);
                                                                // console.log("id_read a crear:"+id8);
                                                                // console.log("id_read a crear:"+id9);
                                                                // console.log("id_read a crear:"+id10);
                                                                 console.log("############____________##############_____jiren_______################___________##################");


                                                                this.UnidadNegocioProcesoId= req.UnidadNegocioProcesoId;
                                                                console.log("UnidadNegocioProcesoId = ",this.UnidadNegocioProcesoId)

                                                                this.AuditorId = $("#sel-auditores_"+pId+"_"+idl).val()
                                                                console.log("AuditorId = ",this.AuditorId)


                                                                this.Inicio =  date1_DD_MM_AAAA_to_AAAA_MM_DD_T_HH_MM_S($("#txt_date_prog_"+pId+"_"+idl).val())
                                                                console.log("Inicio = ",this.Inicio)

                                                                //alert("txt-hora-inicio_"+pId+"_"+idl)


                                                                this.Hora_Inicio = document.getElementById("txt-hora-inicio_"+pId+"_"+idl).value+":00";
                                                                console.log("Hora_Inicio = ",this.Hora_Inicio)

                                                                this.Hora_Fin = document.getElementById("txt-hora-fin_"+pId+"_"+idl).value+":00";
                                                                console.log("Hora_Fin = ",this.Hora_Fin)

                                                                if(document.getElementById("real_txt-hora-inicio_"+pId+"_"+idl).value){
                                                                var acc = document.getElementById("real_txt-hora-inicio_"+pId+"_"+idl).value;
                                                                if((!acc)||(acc == null)||(acc == 'null'))
                                                                   {this.Hora_Inicio_Real = null;}
                                                                else{this.Hora_Inicio_Real = document.getElementById("real_txt-hora-inicio_"+pId+"_"+idl).value+":00";}
                                                                console.log("Hora_Inicio_Real = ",this.Hora_Inicio_Real)}



                                                                if(document.getElementById("real_txt-hora-fin_"+pId+"_"+idl).value){
                                                                var acc2 = document.getElementById("real_txt-hora-fin_"+pId+"_"+idl).value;
                                                                if((!acc2)||(acc2 == null)||(acc2 == 'null'))
                                                                 {this.Hora_Fin_Real = null;}
                                                                else{this.Hora_Fin_Real = document.getElementById("real_txt-hora-fin_"+pId+"_"+idl).value+":00";}
                                                                console.log("Hora_Fin_Real* = ",this.Hora_Fin_Real)}


                                                                 //prompt('valor', acc2)


                                                                this.TipoHallazgoId = parseInt(document.getElementById("sel-tipo_"+pId+"_"+idl).value);
                                                                console.log("dato 5",this.TipoHallazgoId)

                                                                this.Hallazgo = document.getElementById("txt_hden_hallazgo_"+pId+"_"+idl).value;
                                                                console.log("TipoHallazgoId = ",this.Hallazgo)

                                                                this.Created_By =  getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
                                                                console.log("Created_By = ",this.Created_By)

                                                                this.Created_Date = now
                                                                console.log("Created_Date = ",this.Created_Date)

                                                                this.Last_Updated_By =  getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
                                                                console.log("Last_Updated_By = ",this.Last_Updated_By)

                                                                this.Last_Updated_Date = now
                                                                console.log("Last_Updated_Date = ",this.Last_Updated_Date)



                                                            }//-------------------------------------------------------------------#############


                                            //[............................................. CLASE cPlanAuditoria .........................................]


















//############################################# CLASES DEL MODULO PLAN DE AUDITORIA ######################################






























var Inix //= $('#txt_fechaInicioEj').val()
var Finx //= $('#txt_fechaFinEj').val()

//Data Pickers en español
jQuery.datetimepicker.setLocale('es');

//objetos de plan de auditoria

var objAuditoria  = [] ;//new AuditorPlan();  //objAuditorPlan[0] = new AuditorPlan();
//objAuditorPlan.cargarBD('entrando al modulo de Plan de Auditoria');


var objcPlanAuditoria = []// new cPlanAuditoria();//objeto de la clase  cPlanAuditoria, donde se almacenaran los para guardar y modificar en BD


var oPaud = [] //= new cPlanAuditoria();//objeto de la clase  cPlanAuditoria, donde se almacenaran los para guardar y modificar en BD


var normSel; // norma seleccionada en la programacion
var lisBt1 = [];
var lisBt2 = [];
var listReq = [];

var bloqueVentaPlanDg = 0;//te indica si se puede desplegar o no la #f2f2f2, siemprre y cuando se hayan cargado los datos necesarios  c= no  , 1 = si
var bloqueVentaPlanProg = 0;//te indica si se puede desplegar o no la ventana, siemprre y cuando se hayan cargado los datos necesarios  c= no  , 1 = si
var istAud = "";//n de auditoria que se esta planificando en el momento
var idHiddenHallazgo = "";//global que contiene el id del campo oculto del hallazgo que se esta editando
var ivv = new Array(); //global que contiene el array UnidadNegocioProcesoId que se editando
var pivv = []
var Anormas = [];
var hhtmk = "";

var objAuditoriaNorma1  = [] ;
var objAuditoriaNorma2  = [] ;
var objResultados  = [] ;



var insertarModificar = 0;//  variable que indica laccion en base de datos en relación a los datos del plan  [0 - INSERTAR]    [1 - MODIFICAR]

var tabProgramacion = 0;// indica si se han cargado los datos de el tab de programacionde la auditoria seleccionada   [0 - NO CARGADO]    [1 - CARGADOSSS]
var il = 0; //indice del narray de la auditoria que acualmente se esta planificando
var nNormas = 0; //indica el indice de array de o hasta 1 de normas qie posee la auditoria en edicion o plan valores [0 ó 1]
var nameProcesoUso = [];// de llegarse a sociar a mas de un proceso, debe permitir un array
var selectAuditores = [];//aqui vamos a cargar todo los auditores disponibles para evaluar los requisitos, auditores normales y lideres
var htmlTipoHallazgo = "";//html para los tipos de aauditorias
var editPlanFinalizado = 0; //[0] es que no se esta editando un plan finalizado [1] es que si se está actualizando un plan


var selectProcesos= 0;//aqui si el select de proceso va al servidor para esa auditoria no volver a air
var id_auditoriap;
var nombre_programa_auditoriap;
var id_codigo_especialidad_programap;
var nnormas = [];
//-------------------------------new
var Flag_Completadap           = '';   // flag_completada del programa de auditoria
var StatusIdPAp                = '';   // StatusId del programa de auditoria
var id_auditoriap;
var primeraCargap = 1;
var codeAuditoriap;
var sel_new_normasp            =[];
var normasp                    =[];
var normasTextp                =[];
var normasCodep                =[];
var unidad_auditoriap;
var sede;
var sedeTextp;
var sedeDescriptionp;
var tipo_auditoriap;
var date_start;
var date_end;


var auditor                   =[];


var cant                      =0;
var jsonUnidadesOrganizativasp =[];
var jsonSedesp                 =[];
var jsonNormasp                =[];
var jsonTipoAuditoriap         =[];
var jsonTipoHallazgo           =[];
var oTableAuditoriasp;
var cont_auditoriasp           =0;
var datosTablap;
var UnidadNegocio;
var idUnidadNegocioFiltrop;
var idUnidadNegocioNewAuditoriap;
var StatusId;
var DescriptionStatusp;
var auditoriaModificacionLogp  =[];
var auditoriaObservacionpesLogp =[];
var auditoriaObservacionp      ="";
var auditoriaHistorialp        =[];
var hayAuditoriasCorregidasp   = 0;
var hayAuditoriasObservadasp   = 0;
var hayAuditoriasAprobadasp    = 0;
var hayAuditoriasSinEvaluzacionp = 0;
var EstatusEvaluacionIdp         = 0;
var countNormasp = 0;   /////contar las normas selecionadas
var cambiosFechasp = 0 /// contas cuantos cambios de fechas lleva la auditoria
var Evaluador_codep = 0  ///Evaluador_codep codigo de la persona que evalua el programa
var DescriptionEspecialidadp = ""  ///Descripcion de la especialidad

var base64SP3 ="";
var base64SP3_BD ="";
var Cargo_AuditorL ="";
var Name_AuditorL ="";
var Sede_L ="";
var FECHA_I ="";
var FECHA_F ="";
var CODENORMA="";
var TIPOAUDITORIA_L="";

var ilo = 0;//variable global contadora de archivos
var LIMITE_ADJ = 10;
var InformeAdj = [];
var getResult = function(data) { var result= data.split(','); return result[1]; }
const toBase64SP3 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

//////////////jesus
var rowCount2_Pdf = 0;
var rowCount = 0;
var rowEnviarPlan =0;
//////////////jesus






var vw_auditorias_list_plan = function(){ //vw_auditorias_list_plan.reiniciarValiblesGlobales();


    /**
     * [getDataProgramaAuditoria obtenemos los datos del programa de auditoria]
     * @return {[type]} [description]
     */
    var getDataProgramaAuditoria = function(){

        // var settings = {
        //     "url": apiurlAuditoria+"/api/Get-Programa_Auditoria-All?code=X4XURduZbR20wwsOaEVVs4trLnrmd4mfO3KtqksohFm5bQQPqoO10g==&httpmethod=objectlist&Id="+id_auditoriap,
        //     "method": "GET",
        //     "timeout": 0,
        //     "crossDomain": true,
        //     "dataType": "json",
        //     "headers": {
        //         "apiKey": "r$3#23516ewew5",
        //         "Content-Type": "application/json",
        //         //"Cookie": "ARRAffinity=a5d70da53a79873e99939890b4a077f907b6a8d8fb6a065c0333227042886e3b"
        //     },
        //     "data": JSON.stringify({}),
        // };

        // $.ajax(settings).done(function (response) {
        //     //RECORREMOS LA RESPUESTA
        //     console.warn("programa auditoria response ",response)
        //     console.warn("response[0].Flag_Completadap ",response[0].Flag_Completadap)
        //     console.warn("response[0].StatusId ",response[0].StatusId)
        //     response.forEach((Item) => {
        //         Flag_Completadap = Item.Flag_Completadap
        //         StatusIdPAp      = Item.StatusId
        //         Evaluador_codep  = Item.Evaluador_codep
        //         DescriptionEspecialidadp  = Item.DescriptionEspecialidadp
        //     }) //*/
        //     console.warn("Flag_Completadap ",Flag_Completadap)
        //     console.warn("StatusIdPAp ",StatusIdPAp)
        //     if(StatusIdPAp!=1)
        //         //$("#new_auditoria").attr("disabled", true);
        //         $("#new_auditoria").css("display", "block");
        //     else
        //         $("#new_auditoria").css("display", "none");
        //         //$("#new_auditoria").attr("disabled", false);//*/
        // });

    }
    /**
     * [getAuditoriaModificacionLog OBTENEMOS EL HISTORIAL DE MODIFICACIONES DE LAS AUDITORIAS]
     * @return {[type]} [description]
     */
    var getAuditoriaModificacionLog = function(){
        auditoriaModificacionLogp  = [];
        console.log("auditoriaModificacionLogp",auditoriaModificacionLogp)
        var settings = {
            "url": apiurlAuditoria+"/api/Get-Auditoria_Modificacion_Log-All?code=7jsdVKH8Qz4bKFXpaOWQQFWtwxL4ijawwH6TL7edDHnqd0YsvfdW7g==&httpmethod=objectlist",
            "method": "GET",
            "timeout": 0,
            "crossDomain": true,
            "dataType": "json",
            "headers": {
                "apikey": "r$3#23516ewew5",
                "Content-Type": "application/json",
                "TipoModificacionId": "0",
                //"Cookie": "ARRAffinity=cbcbb28fd2b5571d2e51eda0a038519f40946633598d1de8dd8a535c13a84dea"
            },
        };

        // HACEMOS LA SOLICUTID DE LOS DATOS AL SERVIDOR
        $.ajax(settings).done(function (response) {
            //RECORREMOS LA RESPUESTA
            response.forEach((Item) => {
                // LLENAMOS EL ARRAY CON TODAS LAS MODIFICACIONES DE AUDITORIAS
                auditoriaModificacionLogp.push(Item)
            })

        });

    }

    /**
     * [getSedesAll obtener todas las sedes ]
     * @return {[type]} [description]
     */
    var getSedesAll = function (){
        $("#sel_filter_sedep").html("<option value='0'  selected> Cargando .... </option>")
        jsonSedesp = []

        var settings = {
            "url": apiurlAuditoria+"/api/Get-Sede-All?code=0N470WSSjrIb6hhHAsgBHgS8wplALMbCB6KcP5FmsjFDvjQkcaaWbw==&httpmethod=objectlist",
            "method": "GET",
            "timeout": 0,
            "crossDomain": true,
            "dataType": "json",
            "headers": {
                "apikey": "r$3#23516ewew5",
                "Content-Type": "application/json",
                //"Cookie": "ARRAffinity=cbcbb28fd2b5571d2e51eda0a038519f40946633598d1de8dd8a535c13a84dea"
            },
        };

        // HACEMOS LA SOLICUTID DE LOS DATOS AL SERVIDOR
        $.ajax(settings).done(function (response) {
            $("#sel_filter_sedep").html("<option value='0'  selected>           </option>")
            //RECORREMOS LA RESPUESTA
            response.forEach((Item) => {
                // llenamos el select del filtro correspondiente a las sedes
                $("#sel_filter_sedep").append(`<option description='${Item.Description}' value='${Item.Id}'>${Item.Code}</option>`);
                // LLENAMOS EL ARRAY CON TODAS LAS MODIFICACIONES DE AUDITORIAS
                jsonSedesp.push(Item)
            })

        })
        .always(function( jqXHR, textStatus, errorThrown ) {
            //console.log("jsonSedesp",jsonSedesp)
        });

    }

    /**
     * [cargarSelectSedesFilter cargar el select de las sedes con el array jsonSedesp]
     * @return {[type]} [description]
     */
    var cargarSelectSedesFilter = function (selectId){
        //lert("recibe "+selectId)
        var idUnidadNegocioFiltrop = ""
        if(selectId=="sel_filter_sedep"){
            idUnidadNegocioFiltrop = document.getElementById('sel_filter_unidad_organizativa').value;
        }
        if(selectId=="sel_new_sede"){
            idUnidadNegocioFiltrop = document.getElementById('sel_new_unidad_organizativa').value;
        }
        if(selectId=="sel_sede"){
            idUnidadNegocioFiltrop = document.getElementById('sel_unidad_organizativa').value;
        }
        console.log("js ",jsonSedesp)
        // limpiar select unidad organizativa
        $("#"+selectId).html("<option value='0'  selected>      </option>")
        for(i in jsonSedesp){
            //console.log("i: "+i, jsonSedesp[i].Code)

            if(idUnidadNegocioFiltrop==0){
                $("#"+selectId).append(`<option description='`+jsonSedesp[i].Description+`' value='`+jsonSedesp[i].Id+`'>`+jsonSedesp[i].Code+`</option>`);
            }
            else {
                if(idUnidadNegocioFiltrop==jsonSedesp[i].UnidadNegocioId){
                    if(idUnidadNegocioFiltrop==1 || idUnidadNegocioFiltrop==3 || idUnidadNegocioFiltrop==4 || idUnidadNegocioFiltrop==6)
                        $("#"+selectId).append(`<option selected description='`+jsonSedesp[i].Description+`' value='`+jsonSedesp[i].Id+`'>`+jsonSedesp[i].Code+`</option>`);
                    else
                        $("#"+selectId).append(`<option description='`+jsonSedesp[i].Description+`' value='`+jsonSedesp[i].Id+`'>`+jsonSedesp[i].Code+`</option>`);
                }
            }

        }
        //*/

    }

    /**
     * [getObservacionesAuditorias obtener las observaciones registradas en el sistema]
     * @return {[type]} [description]
     */
    var getObservacionesAuditorias = function() {
        auditoriaObservacionpesLogp = [];
        console.log("auditoriaObservacionpesLogp ",auditoriaObservacionpesLogp)
        var settings = {
            "url": apiurlAuditoria+"/api/Get-Observacion_Auditoria-All?code=USTkprfiPea9NXKlJtaJEA43TdAWtgLspeX0sE0di0DoEOfFE4f07A==&httpmethod=objectlist",
            "method": "GET",
            "timeout": 0,
            "crossDomain": true,
            "dataType": "json",
            "headers": {
                "apikey": "r$3#23516ewew5",
                "Content-Type": "application/json",
            },
        };

        $.ajax(settings).done(function (response) {

            //RECORREMOS LA RESPUESTA
            response.forEach((Item) => {
                // LLENAMOS EL ARRAY CON TODAS LAS MODIFICACIONES DE AUDITORIAS
                auditoriaObservacionpesLogp.push(Item)
            })

        });
    }

    // defimir los inputs text como datetime pero no esta funcionando
    var definirInputsDate = function(){
        console.log("definar inpus con datetimepicker")
        $("#tx_filter_date_init").datetimepicker({
            timepicker:false,
            format:'d/m/Y',
            //minDate: 0
        });
        var nowdate = moment().format("DD/MM/YYYY");
        console.log("nowdate",nowdate)
        $('#tx_filter_date_init').val(nowdate);
        console.log("tx_filter_date_init",$("#tx_filter_date_init").val())

        $("#tx_filter_date_end").datetimepicker({
            timepicker:false,
            format:'d/m/Y',
            minDate: 0
        });
        $('#tx_filter_date_end').val(nowdate);
    }

    // INICIALIZAMOS EL SELECT DE ESTADOS DE LA AUDITORIA
    var cargarSelectStatusAuditoria = function(){
        $("#sel_filter_estado").html("<option selected value=''>  Cargando ...  </option>");

        var servicio = '/api/GetStatus_Auditoria?code=';
        var getStatusAuditoria = "QunwZ0j56jljksBrF3QtFYnaou6l7bF8zolp0ZvfXKQEQ5NwPGhHHQ==";
        var metodoHttp = "objectlist";
        var metodoAjax =  "GET";
        var url = apiurlAuditoria+servicio+getStatusAuditoria+"&httpmethod="+metodoHttp;  //Todas las normas
        //var url = apiurlAuditoria+servicio+GetNormasAll+"&EspecialidadId="+id_codigo_especialidad_programap+"&httpmethod="+metodoHttp;
        var headers ={
            "apikey":constantes.apiKey
        }

        var settings = {
            "url": apiurlAuditoria+"/api/Get-Status_Auditoria-All?code=066JGAvFAHugXr5JRHMQpKd408bUgy31F0c3FJ5dPraS2fxhgVrSzQ==&httpmethod=objectlist",
            "method": "GET",
            "timeout": 0,
            "crossDomain": true,
            "dataType": "json",
            "headers": {
                "apikey": "r$3#23516ewew5"
            },
        };

        $.ajax(settings).done(function (response) {

            $("#sel_filter_estado").html("<option selected value=''>          </option>");
            response.map(function(item)
            {
                $("#sel_filter_estado").append(`<option value='${item.Id}'>${item.Description}</option>`);
            });
        });

    }//*/

    // INICIALIZAMOS LOS SELECT DE LAS NORMAS
    var cargarSelectsNormas = function(){
        console.log("id_codigo_especialidad_programap " + id_codigo_especialidad_programap)
        console.log("id_auditoriap " + id_auditoriap)
        //var apiKeyx = "r$3#23516ewew5";
        var servicio = '/api/Get-Norma-All?code=';
        //var getNormaAll = "QunwZ0j56jljksBrF3QtFYnaou6l7bF8zolp0ZvfXKQEQ5NwPGhHHQ==";
        var metodoHttp = "objectlist";
        var metodoAjax =  "GET";
        //var url = apiurlAuditoria+servicio+GetNormasAll+"&httpmethod="+metodoHttp;  //Todas las normas
        var url = apiurlAuditoria+servicio+GetNormasAll+"&EspecialidadId="+id_codigo_especialidad_programap+"&httpmethod="+metodoHttp;
        var headers ={
            "apikey":constantes.apiKey
        }

        $.ajax({
            method: metodoAjax,
            url:  url,
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function( data)
        {

          jsonNormasp=[];
          data.map(function(item)
          {
                $("#sel_new_normasp").append(`<option code='${item.Code}' value='${item.Code}'>${item.Code}</option>`);
                //$("#sel_new_normasp").append(`<option code='${item.Code}' value='${item.Id}'>${item.Description}</option>`);
                //$("#sel_new_normasp").append(`<option value='${item.Code}'>${item.Code}</option>`);
                jsonNormasp.push(item);
          });


        }).fail(function( jqXHR, textStatus, errorThrown ) {
            //showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
            //console.log(errorThrown)
            $("#sel_new_normasp").hide();
        });
    }
    /**
     * [finalizeEvaluacion pasar flag_completada a 1 del programa de auditoria]
     * @return {[type]} [description]
     */
    var finalizeEvaluacion=function (){


        swal({
            title:"Esta por finalizar la evaluación de programa",
            text: "¿Desea finalizar la evaluacion del programa?",
            type: "info",
            showCancelButton: true,
            confirmButtonClass: "btn-danger btn-sm",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cerrar",
            closeOnConfirm: true
        },function(){

            var body={
                "Id":id_programa_auditoriap,
                "Flag_Completadap":1,
                "Flag_Evaluador":0,
                "Created_By":getCookie("vtas_id_hash"+sessionStorage.tabVisitasa),
                "Last_Updated_By":getCookie("vtas_id_hash"+sessionStorage.tabVisitasa)
            }

            var url = apiurlAuditoria+"/api/Post-Programa_Auditoria-All?code=g38OQrxNikLSJIxsYIv03hTcmsYXfmMA7kanUqFykcdNNGAHwMGFQg==&httpmethod=finalize&Id="+id_programa_auditoriap;

            var settings = {
            "url": url,
            "method": "POST",
            "timeout": 0,
            "headers": {
                "apikey": "r$3#23516ewew5",
                "Content-Type": "application/json",
                "Cookie": "ARRAffinity=1c7c284699ca6bef98fc17dbcd7e04e1431fa4dd45ab6d2bb105ddbb421edecc"
            },
            "data": JSON.stringify(body),
            };

            $.ajax(settings).done(function (response)
            {

                if (response)
                {

                    swal.close();
                    setTimeout(function(){
                        swal({
                            title: "Se finalizó con éxito.",
                            text: "Puedes retornar a tu bandeja de auditorías",
                            type: "success",
                            //timer:2000,
                            showCancelButton: false,
                            confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
                            confirmButtonText: "De acuerdo",
                            closeOnConfirm: true
                        });
                    },500)

                    setTimeout(function(){
                        handlerUrlhtml('contentGlobal','view/auditoria/registrarProgramaAuditoria.dev.html','Programa de Auditoría');
                    },2000)

                }
                else
                {
                    swal("Error!", "No se ha podido actualizar la lista.", "error");
                }

            });//*/
            //************************************************************AJAX_END */

        });
    }




//####################################################### CARGA INICIAL ######################################cargaInicialFormPlanAuditoria-ini##############
/**
 * [cargaInicialFormPlanAuditoria cargamos la data del plan de auditoria]
 * @return {[type]} [description]
 */
var cargaInicialFormPlanAuditoria = function()
{
    // CONTADOR DE CARACTERES TEXT AREA FECHA
    var max_chars = 200;
    $('#max').html(max_chars);
    $('.textarea-fecha').keyup(function()
    {
        var chars = $(this).val().length;
        var diff = chars + 0;
        $('#contador').html(diff);
    });

    // CONTADOR DE CARACTERES TEXT AREA SUSPENDER
    var max_chars = 200;
    $('#max').html(max_chars);
    $('#txt_susp').keyup(function()
    {
        var chars = $(this).val().length;
        var diff = chars + 0;
        $('#contador2').html(diff);
    });

    //
    $('#btn_step3').click(function ()
    {

        //$("#btn-basic").trigger("click");

        console.log("norma222222222 "+bandera+"-",objAuditoriaNorma2)
        console.log("norma111111111 "+bandera+"-",objAuditoriaNorma1)

        //$('#btn_step1').addClass('btn-primary-check');//   $('#btn_step1').addClass('btn-primary-check');//$("#btn_step1").attr("href", "#step-1");
        if(objAuditoria[istAud].Flag_Finalizado_Plan == 1)
        {
            $('#btn_step1').addClass('btn-primary-check');
            $("#btn_step1").attr("href", "#step-1");
            document.getElementById("listadoResultado").style.visibility = "visible";

        }
        else
        {
            if(objAuditoria[istAud].Flag_Finalizado_Plan == 0)
            {//alert("aaaaaaaaaaaaaaaaaa");
                document.getElementById("listadoResultado").style.visibility = "hidden";
            }
        }

    })

    $("#date_plan_historial_end").change(function ()
    {
        validaNewFechaFin('date_plan_historial_init', 'date_plan_historial_end');
    })

    $("#date_plan_historial_init").change(function ()
    {
        validaNewFechaIniFinVs_Hoy('date_plan_historial_init', 'date_plan_historial_end');
    })



    $('#btn-basic').click(function ()
    {
        $('#btn-17002').removeClass('active2')
        $('#btn-basic').addClass('active2');
        $("#divContListaProgramacion2").css("display","none")
        $("#divContListaProgramacion").css("display","block")
        // DROPDOWN
        $("#dropdown1").css("display","block")
        $("#dropdown2").css("display","none")

        bandera=1;
        //alert(normSel);
        //asigno a un temporal lo que posee el boton
        // $("#divContListaProgramacion").html(" ")
        if(lisBt2[normSel])
        {
            lisBt2[normSel] = lisBt1[normSel];
            //cambiaProcesoPlan(istAud)
        }

    });

    $('#btn-17002').click(function ()
    {
        $('#btn-basic').removeClass('active2');
        $('#btn-17002').addClass('active2');
        $("#divContListaProgramacion").css("display","none")
        $("#divContListaProgramacion2").css("display","block")
        // DROPDOWN
        $("#dropdown1").css("display","none")
        $("#dropdown2").css("display","block")
        //alert(lisBt1[normSel]);
        //alert(normSel);
        bandera=2;
        //asigno a un temporal lo que posee el boton
        //cambiaProcesoPlan(istAud)
        //$("#divContListaProgramacion").html(" ")
        if(lisBt2[normSel])
        {
            lisBt2[normSel] = lisBt1[normSel];

        }
    });


    $("#date_plan_historial_init").datetimepicker(
    {
        timepicker:false,
        format:'d/m/Y',
        // defaultDate: ini,
        // minDate: new Date(moment(now).format('YYYY-MM-DD')),
        // maxDate: new Date(moment(end).format('YYYY-MM-DD'))
    });//*/

    $("#date_plan_historial_end").datetimepicker({
        timepicker:false,
        format:'d/m/Y',
        // defaultDate: fin,
        // minDate: new Date(moment(now).format('YYYY-MM-DD')),
        // maxDate: new Date(moment(end).format('YYYY-MM-DD'))
    });//*/

    $(".txt_date_prog").datetimepicker({
        timepicker:false,
        format:'d/m/Y',
        //minDate: new Date(moment(now).format('YYYY-MM-DD')),
        //maxDate: new Date(moment(end).format('YYYY-MM-DD'))
    });//*/

    $(".verga").scrollTop(100);



    $('#CambiarFecha').click(function ()
    {
        $("#date_plan_historial_end").val(date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(objAuditoria[istAud].Fin))
        $("#date_plan_historial_init").val(date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(objAuditoria[istAud].Inicio))


        $("#newPlanAuditoriaModal").removeClass("fade").modal("hide");
        $("#modalShowAlertConfirm").modal("show").addClass("fade");

    });

    $('#btn-modificar-fecha').click(function ()
    {

        if($("#txt_motivo_cambioFec").val() == "")
        {
            //alert("aaaaaaaaaaaaaaaaaaaa = "+$("#txt_motivo_cambioFec").val())

            $("#txt_motivo_cambioFec").attr('placeholder','Error! Debe Ingresar el motivo del Cambio')
            $("#txt_motivo_cambioFec").css('border-color','red')
        }
        else
        {

            $("#txt_motivo_cambioFec").attr('placeholder','Escribir....')
            $("#txt_motivo_cambioFec").css('border-color','grey')
            $("#contador").html('0');

            $("#modalShowAlertConfirm").removeClass("fade").modal("hide");
            $('#modalShowAlertConfirmFecha').modal('show').addClass('fade');

        }
    });

    $('#btn-cancelar-confirmar-fecha').click(function ()
    {
        $("#modalShowAlertConfirmFecha").removeClass("fade").modal("hide");
        $("#modalShowAlertConfirm").modal("show").addClass("fade");
        $('#date_plan_historial_end').val('');
        $('#date_plan_historial_init').val('');
        $('#valid-fecha').css('display','none');
        $('#txt_motivo_cambioFec').val('');
        $("#contador").html('0');
    });

    $('#btn-confirmar-fecha-end').click(function ()
    {
        $("#modalShowAlertConfirmFechaOk").removeClass("fade").modal("hide");
        $("#newPlanAuditoriaModal").removeClass("fade").modal("hide");
        $('#date_plan_historial_end').val('');
        $('#date_plan_historial_init').val('');
        $('#valid-fecha').css('display','none');
        $('#txt_motivo_cambioFec').val('');
        $("#contador").html('0');
    });

    $('#btn-cancelar-fecha').click(function ()
    {
        $("#txt_motivo_cambioFec").attr('placeholder','Escribir....')
        $("#txt_motivo_cambioFec").css('border-color','grey')
        $("#modalShowAlertConfirm").removeClass("fade").modal("hide");
        //$("#splashLoading").show();
        $("#newPlanAuditoriaModal").modal("show").addClass("fade");
        $('#date_plan_historial_end').val('');
        $('#date_plan_historial_init').val('');
        $('#valid-fecha').css('display','none');
        $('#txt_motivo_cambioFec').val('');
        $("#contador").html('0');
    });

    $('#btn-finalizar').click(function ()
    {
        $("#newPlanAuditoriaModal").modal("hide").removeClass("fade");
    });

    $('#CancelConfirm').click(function () {
        $('#modalShowAlertConfirm2').modal('hide').addClass("fade");
        $("#newPlanAuditoriaModal").modal("show").addClass("fade");
    });

    $('#btn-historial-auditor').click(function () {
        fnVerHistorialEjecucionPlanAuditoria(1);
    });

    $('#btn-close-historial-lider').click(function () {
        $("#modalHistorialAuditorLider").removeClass("fade").modal("hide");
        //$("#splashLoading").show();
        $("#newPlanAuditoriaModal").modal("show").addClass("fade");
    });

    // GUARDAR PLAN
    $('#btn-guardar-plan').click(function ()
    {

        if(objAuditoria[istAud].Flag_Finalizado_Plan == 1)
        {//me trasforme en el boton Guardar Cambios o sea
             if($("#lbBtnGuardar").html()=="Modificar")//el boton dice Modificar, debemos desbloquearlo
             {
                var navListItems = $('div.setup-panel div a button'); // tab nav items
                navListItems.removeClass('btn-primary-check').addClass('btn-default');
                $('#btn_step1').addClass('btn-primary-check');//   $('#btn_step1').addClass('btn-primary-check');//$("#btn_step1").attr("href", "#step-1");

                var allWells = $('.setup-content'); // content div
                step1 = $('#step-1');
                allWells.hide(); // hide all contents by defauld
                step1.show();
                fnMostrarVentanaModificarFinalizadoEstadoDesbloqueado();
                console.log('es Aquí 1')
                $("#btn-guardar-hallazgo").removeClass('d-none')
                $("#textarea-hallazgo").removeAttr('disabled')
             }
             else
             {//procedemos a modificar los datos
                fnGuardarPlanAuditoria()
                console.log('es Aquí 2')
             }
        }
        else
        {
            //funcion para insertar y modificar
            //alert("funcion para insertar y modificar")
            fnGuardarPlanAuditoria()
            console.log('es Aquí 3')
        }

    });

    $('#btn-cancelar-guardar-plan').click(function () {
        $("#modalShowAlertConfirmPlan").removeClass("fade").modal("hide");
        //$("#splashLoading").show();
        $("#newPlanAuditoriaModal").modal("show").addClass("fade");
    });


        // FINALIZAR
        $('#btn-finalizar-plan').click(function () {

            if(($("#lbBtCerrar").html() == "Cerrar")||($("#lbBtCerrar").html() == "Cancelar"))
            {
                $("#newPlanAuditoriaModal").removeClass("fade").modal("hide");
            }
            else
            {
                //$("#lbBtCerrar").html("Finalizando...")
                //$("#lbBtCerrar").attr("disabled",true);
                fnFinalizarPlanAuditoria();
            }




        });
        // MODAL CONFIRMAR GUARDADO PLAN
        $('#btn-confirmar-guardar-plan').click(function () {
            //aqui cambio el label del boton y lo bloqueo hasta que responda el servicio
            $("#btn-confirmar-guardar-plan").html("<b>Guardando...</b>")
            $("#btn-confirmar-guardar-plan").addClass("btn_confirmar_modal bg-green-lime-modal confirm btn-confirmar-guardar-plan btn-blue");
            $("#btn-confirmar-guardar-plan").attr("disabled",true);

            fnGuardarPlanAuditoria2();
        });
        // CONFIRMAR MODAL FINALIZAR PLAN
        $('#btn-confirmar-guardar-plan-fin').click(function () {
            $("#btn-confirmar-guardar-plan-fin").html("<b>Finalizando...</b>")
            $("#btn-confirmar-guardar-plan-fin").addClass("btn_confirmar_modal bg-green-lime-modal confirm btn-confirmar-guardar-plan btn-blue")
            $("#btn-confirmar-guardar-plan-fin").attr("disabled",true);

            fnFinalizarPlanAuditoria2();
        });
        // CERRAR MODAL FINALIZAR PLAN
        $('#btn-cancelar-guardar-plan-fin').click(function () {
            $("#modalShowAlertConfirmPlanFin").removeClass("fade").modal("hide");
            //$("#splashLoading").show();
            $("#newPlanAuditoriaModal").modal("show").addClass("fade");
        });
        // MODAL PLAN ADUTORIA GUARDADA
        $('#btn-confirmar-plan-end').click(function () {
            $("#modalShowAlertConfirmPlanOk").removeClass("fade").modal("hide");
            //$("#splashLoading").show();
        });
        $('#btn-confirmar-plan-finalizar').click(function () {
            $("#modalShowAlertConfirmPlanFinalizarOk").removeClass("fade").modal("hide");
            //$("#splashLoading").show();
        });

        // VER HALLAZGO
        $('#btn-hallazgo').click(function () {
            $("#newPlanAuditoriaModal").removeClass("fade").modal("hide");
            //$("#splashLoading").show();
            $("#modalHallazgo").modal("show").addClass("fade");
        });
        // guardar HALLAZGO
        $('#btn-guardar-hallazgo').click(function () {
            $("#modalHallazgo").removeClass("fade").modal("hide");
            //$("#splashLoading").show();
            //$("#modalShowAlertConfirmHallazgo").modal("show").addClass("fade");
        });
        // guardar HALLAZGO confirmar
        $('#btn-confirmar-guardar-hallazgo').click(function () {
            $("#modalShowAlertConfirmHallazgo").removeClass("fade").modal("hide");
            //$("#splashLoading").show();
            $("#modalShowAlertConfirmHallazgoOk").modal("show").addClass("fade");
        });
        // CANCELAR HALLAZGO
        $('#btn-cancelar-guardar-hallazgo').click(function () {
            $("#modalShowAlertConfirmHallazgo").removeClass("fade").modal("hide");
            //$("#splashLoading").show();
            $("#modalHallazgo").modal("show").addClass("fade");
        });
        // REGRESAR HALLAZGO A FORMULARIO
        $('#btn-close-hallazgo').click(function () {
            $("#modalHallazgo").removeClass("fade").modal("hide");
            //$("#splashLoading").show();
            $("#newPlanAuditoriaModal").modal("show").addClass("fade");
        });
        // TERMINAR HALLAZGO GUARDADO
        $('#btn-confirmar-hallazgo-end').click(function () {
            //$("#splashLoading").show();
            $("#modalShowAlertConfirmHallazgoOk").modal("hide").removeClass("fade");
        });

        // error
        /*
        $('#btn-confirmar-guardar-plan').click(function () {
            $(".error1").show();
            $(".error2").hide();
        });*/

        //validacion del boton guardar hallazgo
        $('#textarea-hallazgo').keyup(function(){
            if($(this).val() != ''){
               $("#btn-guardar-hallazgo").attr('disabled', false).addClass('btn-guardar-hallazgo-act');

            }else{
                $("#btn-guardar-hallazgo").attr('disabled', true).removeClass('btn-guardar-hallazgo-act');
            }

        });

        //validacion del boton guardar hallazgo
        $('#txt_susp').keyup(function(){
            if($(this).val() != ''){
               $("#btn-suspender-plan").attr('disabled', false).addClass('disabled3-active');

            }else{
                $("#btn-suspender-plan").attr('disabled', true).removeClass('disabled3-active');
            }

        });

        //validacion del boton modificar fecha
        $('.textarea-fecha').keyup(function(){
            if($(this).val() != ''){
               $("#btn-modificar-fecha").attr('disabled', false).addClass('btn-modificar-fecha-hab').removeClass('btn-modificar-fecha');

            }else{
                $("#btn-modificar-fecha").attr('disabled', true).removeClass('btn-modificar-fecha-hab').addClass('btn-modificar-fecha');
            }

        });

        // ENVIAR

        $('#btn_send').click(function () {
            //$("#splashLoading").show();
            $("#modalEnviar").modal("show").addClass("fade");


        });
        // GUARDAR ENVIO
        $('#btn-guardar-plan-enviar').click(function () {

            var vacios = false;
            if($('#tbody_trainning .item-tabla').length>0){
                for (var i = 0; i <= rowEnviarPlan; i++)
                {
                    if ($('#hid_NamePlan_id_'+i).val() == ""){
                        //console.log("uno vacio")
                        vacios = true;
                    }
                }
                if(vacios)
                {
                    verModalError('Enviar Plan de Auditoría', 'Tienes campos vacios, Debes Ingresar todos los destinatarios.');
                }
                else
                {
                    //levantar modal
                    $("#modalEnviar").modal("hide").removeClass("fade");
                    //$("#splashLoading").show();
                    $("#modalShowAlertConfirmEnviar").modal("show").addClass("fade");
                }
            }
            else
            {
                verModalError('Enviar Plan de Auditoría', 'Debes agregar un ( 1 ) destinatario como mínimo');
            }
        });
        // CANCELAR GUARDADO ENVIO
         $('#btn-cancelar-guardar-enviar').click(function () {
            $("#modalEnviar").modal("hide").addClass("fade");
        });

         // CANCELAR GUARDADO ENVIO
         $('#btn-cancelar-confirmar-guardar-enviar').click(function () {
            $("#modalShowAlertConfirmEnviar").modal("hide").removeClass("fade");
            $("#modalEnviar").modal("show").addClass("fade");
        });

        //confirmar enviar plan de auditoria
        $('#btn-confirmar-guardar-enviar').click(function () {
            // $("#modalShowAlertConfirmEnviar").modal("hide").removeClass("fade");
             //$("#splashLoading").show();
             $("#btn-confirmar-guardar-enviar").html("<b>Enviando....</b>")
             $("#btn-confirmar-guardar-enviar").addClass("btn_confirmar_modal bg-green-lime-modal confirm btn-confirmar-guardar-plan btn-blue")
             //$("#btn-confirmar-guardar-enviar").attr("disabled",false);

             $('#btn-confirmar-guardar-enviar').attr("disabled",true);
             confirmarguardarenviar ();
            // $("#modalShowAlertConfirmEnviarOk").modal("show").addClass("fade");
        });

         // finalizar
         $('#btn-confirmar-enviar-end').click(function () {
            $("#modalShowAlertConfirmEnviarOk").modal("hide").removeClass("fade");
            vw_auditorias_list_plan.filtroTablaDivsAuditoriasp();

        });

         // CANCELAR SUSPENDER PLAN
        $('#btn-cancelar-susp-plan').click(function () {
            $("#modalSuspenderPlan").modal("hide");
        });
        // CANCELAR SUSPENDER PLAN
        $('#btn-suspender-plan').click(function () {
            $("#modalSuspenderPlan").removeClass("fade").modal("hide");
            $("#modalConfirmSuspenderPlan").addClass("fade").modal("show");
        });
        // CANCELAR SUSPENDER PLAN
        $('#btn-cancelar-confirm-suspender').click(function () {
            $("#modalConfirmSuspenderPlan").removeClass("fade").modal("hide");
        });
        // CANCELAR CONFIRM SUSPENDER PLAN
        $('#btn-cancelar-confirm-suspender').click(function () {
            $("#modalConfirmSuspenderPlan").removeClass("fade").modal("hide");
            $("#modalSuspenderPlan").addClass("fade").modal("show");
        });
        // CONFIRM SUSPENDER PLAN

         // CONFIRM SUSPENDER PLAN
        $('#btn-confirmar-suspender-ok').click(function () {
            $("#modalConfirmSuspenderPlanOk").removeClass("fade").modal("hide");
            templateListAuditorias();
        });


        // FUNCION PARA AGREGAR NUEVAS LISTAS EN ENVIAR
        $('#add-trainning').click(function (){
            $('#variable').html('');
            rowEnviarPlan++;


                $("#tbody_trainning").append("<div class='item-tabla p-2 px-2' style='font-size: 13px; background-color:white !important;border: solid 1px #cbcbcb !important;'>"+
                    "                         <div class='row m-0 justify-content-between align-items-center tbody_trainning'>"+
                    "                         <div class='col-3 text-left form-group p-0'>"+
                    "                           <label for='Name_"+rowEnviarPlan+"'></label>"+
                    "                           <input type='hidden' id='contadorrow' value='"+rowEnviarPlan+"'></label>"+
                    "                           <input type='hidden' name='idAuditor_' id='idAuditor_'>"+
                    "                           <input type='hidden' name='Create_By'>"+
                    "                           <input type='text' value='' id='NamePlan_"+rowEnviarPlan+"' name='Name' class='form-control form-control2 bg-white fechasA autocompletecollaborator'>"+
                    "                           <div class='loader' id='add_firtnameload_1"+rowEnviarPlan+"' style='display:none'></div>"+
                    "                           <input type='hidden' class='form-control' id='hid_NamePlan_id_"+rowEnviarPlan+"' name='hid_Name_id_"+rowEnviarPlan+"'></div>"+
                    "                         <div class='col-3 text-left form-group p-0'>"+
                    "                           <input type='text' id='CargoPlan_"+rowEnviarPlan+"' name='cargo' aria-describedby='sizing-addon2' class='form-control form-control2 fechasA bg-white' readonly>"+
                    "                           <input type='hidden' class='form-control' id='hid_Cargo_"+rowEnviarPlan+"'  name='hid_Cargo_"+rowEnviarPlan+"'></div>"+
                    "                         <div class='col-3 text-left form-group p-0'>"+
                    "                           <input type='text' id='CorreoPlan_"+rowEnviarPlan+"' name='txt_correo_"+rowEnviarPlan+"' value='' class='form-control form-control2 bg-white'></div>"+
                    "                         <div class='col-2 text-right'>" +
                    "                            <button type='button' _Id='' class='delete btn-circle btn-register border-0' style='background-color: #ff6767'>"+
                    "                            <img src='./images/iconos/Pathcan.svg' class='edit-1'></button>" +
                    "                         </div></div></div>"
                    );


                    getPersonPlan($("#NamePlan_"+rowEnviarPlan),rowEnviarPlan);
                    rowCount = $('#tbody_trainning .item-tabla').length;
                    var total = "";
                    if(rowCount<10) total = "0"+rowCount
                    else total = rowCount

                    $('#rowcount').val(rowCount);
                    $('#variable').html(total);

                    //alert("entro"+rowCount)

        });
        // eliminar row
        $('#tbody_trainning').on('click', '.delete', function() {
            $(this).parents('.item-tabla').remove();
            //alert("eliminar"+rowCount)
            rowCount--;
            var total = "";
            if(rowCount<10) total = "0"+rowCount
            else total = rowCount
            $('#rowcount').val(rowCount);
            $('#variable').html(total);

        });//*/




        $('#btn-Adj').click(function () {
            $('#modalAdj').modal('show').addClass('fade');
        });

        $('#btn-close-Adj').click(function () {
            $('#modalAdj').modal('hide');
            sp3FngeneraInformeAuditoria()
            //$("#Sp3VentanaPdfPreview").modal("show").addClass("fade");




        });
        //---------------------------- @anochecasa-------------------------------
        $('#btn_file_trainningSp3').click(function(){
            $('#file_trainningSp3').trigger('click');

        });

        //BOTON PARA LA BUSQUEDA DE ARCHIVOS STEP-2 CAPACITACIONES

        //VALIDAR LA EXTENSION DEL ARCHIVO STEP-2 CAPACITACIONES
        $('#file_trainningSp3').on('change',function () {

        sp3FnAdjuntarDocumentoInformeAuditoria();

        // var fileInput = document.getElementById('file_trainningSp3');
        // var filePath = fileInput.value;
        // //var allowedExtensions = /(.pdf)$/i;

        // var extAdj = sp3FnvalidaExtensionAdjunto(filePath);
        // alert('es un archivos '+extAdj);

        // var esc= escape(filePath)
        // var name = esc.split("%5C");

        // $('#arc_t').html(name[2]);
        // console.log("###################### ADJUNTAR COSAS #######################");
        // console.log("vas adjuntar a :", name[2]);
        // console.log("###################### ADJUNTAR COSAS #######################");
         })
        // //VALIDAR LA EXTENSION DEL ARCHIVO STEP-2 CAPACITACIONES

        //---------------------------- @anochecasa-------------------------------












        //Chequea switch_estatus para mostrar el estado del toggle como Activo
        $("#switch_estatus").prop("checked", true);
        $('.textarea_noActivo').hide();
        //Chequea switch_estatus para mostrar el estado del toggle como Activo

        //Cambio de los Step del formulario y color de los botones #1
        var navListItems = $('div.setup-panel div a button'), // tab nav items
            allWells = $('.setup-content'), // content div
            allNextBtn = $('.nextBtn'), // next button
            step1 = $('#step-1');
        allWells.hide(); // hide all contents by defauld
        step1.show();

        $('#btn_step1').addClass('btn-primary-check');//$("#btn_step1").attr("href", "#step-1");

        navListItems.click(function (e) {
            e.preventDefault();
            var $target = $($(this).attr('href')),
                $item = $(this);

            if (!$item.hasClass('disabled')) {
                navListItems.removeClass('btn-primary-check').addClass('btn-default');
                $item.addClass('btn-primary-check');
                allWells.hide();
                $target.show();
                // $target.find('input:eq(0)').focus();
            }
        });
        // next button
        allNextBtn.click(function(){
            var curStep = $(this).closest(".setup-content"),
                curStepBtn = curStep.attr("id"),
                nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children(" "),
                isValid = true;
            // Validation
            $(".form-group").removeClass("has-error");

            // move to next step if valid
            if (isValid)
                nextStepWizard.removeAttr('disabled').trigger('click');
        });





//CERRAR MSJ DE CONFIRMACION "LOS DATOS GUARDADOS EXITOSAMENTE"
        $('#btnSalida').click(function () {
            cont_auditor=cont_auditor+1;
            $("#cant_auditor").html("<b>"+cont_auditor+"</b>");

            $("#modalShowAlertOk").removeClass("fade").modal("hide");


        });
        //CERRAR MSJ DE CONFIRMACION "LOS DATOS GUARDADOS EXITOSAMENTE"




    }//);



    //VALIDADOR DE FECHAS CAPACITACIONES
    $('#txt_date_end').on('change', function () {
        var dateStart = $('#txt_date_start').val();
        var dateEnd = $('#txt_date_end').val();
        console.log(dateStart,dateEnd)
        if (process_Date(dateStart) > process_Date(dateEnd)) {
            swal("La fecha de inicio no puede ser mayor a la fecha fin")
            $('#txt_date_end').val('')
        }
    })

    $('#txt_date_start').on('change', function () {
        var dateStart = $('#txt_date_start').val();
        var dateEnd = $('#txt_date_end').val();
        if (dateEnd!=""){
            if (process_Date(dateStart) > process_Date(dateEnd)) {
                swal("La fecha de inicio no puede ser mayor a la fecha fin")
                $('#txt_date_end').val('')
            }
        }

    })
    //VALIDADOR DE FECHAS CAPACITACIONES

    //VALIDADOR DE FECHAS EXPERIENCIAS
    $('#txt_date_end_skill').on('change', function () {
        var dateStartSkill = $('#txt_date_start_skill').val();
        var dateEndSkillnew = $('#txt_date_end_skill').val();

        if (process_Date(dateStartSkill) > process_Date(dateEndSkillnew)) {
            swal("La fecha de inicio no puede ser mayor a la fecha fin")
            $('#txt_date_end_skill').val('')
        }
    })

    $('#txt_date_start_skill').on('change', function () {
        var dateStartSkill = $('#txt_date_start_skill').val();
        var dateEndSkillnew = $('#txt_date_end_skill').val();
        if (dateEndSkillnew!="") {

            if (process_Date(dateStartSkill) > process_Date(dateEndSkillnew)) {
                swal("La fecha de inicio no puede ser mayor a la fecha fin")
                $('#txt_date_end_skill').val('')
            }
        }
    })
    //VALIDADOR DE FECHAS EXPERIENCIAS
    function process_Date(date){
        var parts = date.split("/");
        return new Date(parts[2], parts[1] - 1, parts[0]);
    }

//######################################################### CARGA INICIAL  #########################cargaInicialFormPlanAuditoria-fin########################









    // INICIALIZAMOS LOS SELECT DE LAS NORMAS
    var cargarSelectTipoAuditoria = function(){
        //console.log("cargaremos los selects de las NORMAS")
        //var apiKeyx = "r$3#23516ewew5";
        var servicio = '/api/Get-Tipo_Auditoria-All?code=';
        //var getNormaAll = "QunwZ0j56jljksBrF3QtFYnaou6l7bF8zolp0ZvfXKQEQ5NwPGhHHQ==";
        var metodoHttp = "objectlist";
        var metodoAjax =  "GET";
        var url = apiurlAuditoria+servicio+GetTipoAuditoriaAll+"&httpmethod="+metodoHttp;
        var headers ={
            "apikey":constantes.apiKey
        }

        $.ajax({
            method: metodoAjax,
            url:  url,
            headers:headers,
            crossDomain: true,
            dataType: "json",
        })
        .done(function( data)
        {
            //$("#sel_new_tipo_auditoriap").append("<option value='' disabled selected>                </option>");
            jsonTipoAuditoriap=[];
            console.log("id_codigo_especialidad_programap "+id_codigo_especialidad_programap)
            data.map(function(item)
            {
                console.log("item.Id "+item.Id)
                if(  item.Id==3 ){
                    if(id_codigo_especialidad_programap==3){
                        //console.log("cargamos el select")
                        //alert("cargamos en el select legal en ssoma")
                        $("#sel_new_tipo_auditoriap").append(`<option Code='${item.Code}' value='${item.Id}'>${item.Description}</option>`);
                        jsonTipoAuditoriap.push(item);
                    }
                }else{

                    $("#sel_new_tipo_auditoriap").append(`<option Code='${item.Code}' value='${item.Id}'>${item.Description}</option>`);
                    jsonTipoAuditoriap.push(item);
                }
                //$("#sel_new_tipo_auditoriap").append(`<option value='${item.Code}'>${item.Code}</option>`);
            });


        }).fail(function( jqXHR, textStatus, errorThrown ) {
            //showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
            //console.log(errorThrown)
            $("#sel_new_tipo_auditoriap").hide();
        });
    }

    /**
     * [cargarSelectsUnidadesOrganizativas CARGAR SELECTS DE LAS UNIDADES DE NEGOCIO
     * DEL FILTRO Y DE LA MODAL NUEVA AUDITORIA]
     * @return {[type]} [description]
     */
    var cargarSelectsUnidadesOrganizativas = function(){
        $("#sel_filter_unidad_organizativa").html("<option value='' selected> Cargando....   </option>");
        $("#sel_new_unidad_organizativa").html("<option value='' disabled selected>     </option>");
        $("#sel_unidad_organizativa").html("<option value='' disabled selected>  ..  </option>");


        var servicio = '/api/Get-Unidad_Negocio-All?code=';
        var metodoHttp = "objectlist";
        var metodoAjax =  "GET";
        var url = apiurlAuditoria+servicio+GetUnidadesOrganizativasAll+"&httpmethod="+metodoHttp;
        var headers ={
            "apikey":constantes.apiKey
        }
        //console.log("constantes.apiKey: "+constantes.apiKey, "apiKeyx",apiKeyx)
        $.ajax({
            method: metodoAjax,
            url:  url,
            headers:headers,
            crossDomain: true,
            dataType: "json",
        })
        .done(function( data)
        {

        $("#sel_filter_unidad_organizativa").html("<option value='' selected>   </option>");
        $("#sel_new_unidad_organizativa").html("<option value='' disabled selected>     </option>");
        $("#sel_unidad_organizativa").html("<option value='' disabled selected>  ..  </option>");
            jsonUnidadesOrganizativasp=[];
            data.map(function(item)
            {
                $("#sel_filter_unidad_organizativa").append(`<option description='${item.Description}' value='${item.Id}'>${item.Code}</option>`);
                $("#sel_new_unidad_organizativa").append(`<option description='${item.Description}' value='${item.Id}'>${item.Code}</option>`);
                $("#sel_unidad_organizativa").append(`<option description='${item.Description}' value='${item.Code}'>${item.Code}</option>`);
                jsonUnidadesOrganizativasp.push(item);
            });


            //console.log("json",jsonUnidadesOrganizativasp)

        }).fail(function( jqXHR, textStatus, errorThrown ) {
            //showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
            //console.log(errorThrown)
            $("#sel_filter_unidad_organizativa").hide();
            $("#sel_new_unidad_organizativa").hide();
        });
    }

    /**
     * [filtroTablaDivsAuditoriasp cargar listado de auditorias ]
     * @return {[type]} [description]
     */
    var filtroTablaDivsAuditoriasp = function(){
        console.log("listar auditorias")
        //alert("filtrodivs")
        showLoading();
        //----------------------------------------------------limpiando --------------------------------------------------
        //    console.error(objAuditoria)

        //    console.error(objAuditoria)
           //alert();

        //---------------------------------------------------limpiando ---------------------------------------------------

       //vamos a ajustar y bloquear el boton miestras hace el trabajo
                  $("#buscarAuditorias").html("Buscando...")
                  $("#buscarAuditorias").attr("disabled",true);


        var UnidadNegocioId = $("#sel_filter_unidad_organizativa").val()
        //var Inicio          = formatearFechaDBp($("#txt_date_start_evaluacion").val())
        //var Fin             = formatearFechaDBp($("#txt_date_end_evaluacion").val())
        var Inicio          = $("#txt_date_start_evaluacion").val().split('/').reverse().join('-')
        var Fin             = $("#txt_date_end_evaluacion").val().split('/').reverse().join('-')
        var SedeId          = $("#sel_filter_sedep").val()
        var StatusId        = $("#sel_filter_estado").val()
        var filtro          = "";
        // console.log(UnidadNegocioId, Inicio, Fin, SedeId, StatusId)

        if(UnidadNegocioId>0)
            filtro+= "&UnidadNegocioId="+UnidadNegocioId
        if(SedeId>0)
            filtro+= "&SedeId="+SedeId
        if(StatusId>0)
            filtro+= "&StatusId="+StatusId
        if(Inicio!="")
            filtro+= "&Inicio="+Inicio
        if(Fin!="")
            filtro+= "&Fin="+Fin//*/

        if(primeraCargap == 1) {
            auditor = []
        }
        // console.log("filtro", filtro)
        cont_auditoriasp = 0;
        let IdAuditorLider  = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
        var now  = moment().format('YYYY-MM-DD');
        //----------------------PARAMETROS PARA EL SERVICIO LISTAR AUDITORIAS DE UN PROGRAMA POR SU ID-------------------------------
        var servicio        = '/api/Get-Auditoria-Lider-All?code=';
        var metodoHttp      = "objectlist";// object   --- esto para los datos de una auditoria solo pasar esto por url IdAuditoria = varJs
        var metodoAjax      =  "GET";
        var getAuditoriaAll ="UAIRBeY2QaKbBgPA4aEGXzAYjgDu4T4WvBa04WvkGpB1RazLa3462w==";
        var url             = apiurlAuditoria+servicio+getAuditoriaAll+"&Id="+IdAuditorLider+"&TipoAuditor=1"+"&httpmethod="+metodoHttp+filtro;
        var metodoAjaxGp    =  "GET"; //"POST";
        var headers         ={
            "apikey":constantes.apiKey
        }
        // console.log("url", url)


// console.log("############...................................#############");
// console.log(url);

// console.log("############...................................#############");


        $.ajax({
            method: metodoAjaxGp,
            url:  url,
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function (response) {
            console.warn("response ",response )

            if (response.length > 0) $("#bodyTablaSinAuditorias").css("display", "none");
            else $("#bodyTablaSinAuditorias").css("display", "block");

            //$('#body-tabla-list').html("")
            $("#cant_auditorias").html('<img src="images/iconos/copia-1.svg" class="copia-1"> '+response.length+' ');

            //templateListAuditorias(response)
            $('#body-tabla-list-plan').html(" ");



            $('#pagination-container-plan').pagination({
                dataSource: response,
                pageSize: 10,
                callback: function(data, pagination) {
                    ////alert('sssssssssssssssssssssssssssssssssssssssssss');
                    var html = templateListAuditorias(data);
                    $('#body-tabla-list-plan').html(html);

                    $("#buscarAuditorias").html("Buscar")
                    $("#buscarAuditorias").attr("disabled",false);
                }
            })
             //console.log("QUE PADA CON EL PAGINADO",html,'))))))))))))))' );


            //let p = 2

        })
        .always(function( jqXHR, textStatus, errorThrown ) {

            /// para bloquear el boton finalizar
            if(hayAuditoriasObservadasp>0){
                //$("#buscarAuditoriasx").attr("disabled", false);
            }else {
                //$("#buscarAuditoriasx").attr("disabled", false);
            }
            //if(primeraCargap == 1) alert("primera carga 3")
            primeraCargap = 2;
            // console.log("auditor",auditor)

            hideLoading();
        });

    }

    // para el paginado....



    var templateListAuditorias = function(data){


        var html = '';
        var o = 0;




          //Ini_______vamos a recorrer para ver cual es el último plan
          var MayorPlan = 0;
          data.forEach((Item)=>{
              var iidPlan = parseInt(Item.PlanId);
              //alert(Item.StatusId+'=status, PlanId = '+Item.PlanId)
              if((Item.StatusId == 4)&&(Item.PlanId >0))// StatusId Asignada , en atencion y en ejecucion quiere decir que tiene pla, n puede ser nueva
              {
                  //alert(Item.StatusId+'=status, PlanId = '+Item.PlanId)
                  if(iidPlan > MayorPlan)
                  {
                      MayorPlan = iidPlan;
                  }
              }
          })
          //Fin_______vamos a recorrer para ver cual es el último plan




             // alert("acccciiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
        // console.log("dataikkkk ",data)

        //console.clear();

        //aqui vamos a crear un objeto plan para cada auditoria


        data.forEach((Item)=>{
           //oPaud[Item.Id].PlanId


            // if(oPaud[Item.Id])alert("SI TIENE PLAN = "+oPaud[Item.Id].PlanId);

                //alert("termino = "+Item.Id);

               // alert('primera carga = '+primeraCargap);

                if(primeraCargap==1){   //llenado de Array
                    auditor.push(Item);
                    objAuditoria[Item.Id] = new cAuditoria();
                    objAuditoria[Item.Id].cargarBDAud(Item);

                        objAuditoria[Item.Id].Auditores = new cAuditores();
                        objAuditoria[Item.Id].Auditores.cargarBDGente(Item.Auditores);
                        //alert(objAuditoria[Item.Id].Auditores.htmlA);

                    //objAuditoria[Item.Id].Procesos = new cProcesos(Item.Procesos);// crear clase y activar
                    //objAuditoria[Item.Id].Programacion_Plan = new cProgramacion(Item.Programacion_Plan);


                    objcPlanAuditoria[Item.Id] = new cPlanAuditoria();
                    buscarPlanesDeAuditorias(Item.Id);

                    //console.log("(",objAuditoria[o],")")
                }

                if(primeraCargap==2){   //llenado de Array
                    auditor.push(Item);
                    objAuditoria[Item.Id] = new cAuditoria();
                    objAuditoria[Item.Id].cargarBDAud(Item);

                        objAuditoria[Item.Id].Auditores = new cAuditores();
                        objAuditoria[Item.Id].Auditores.cargarBDGente(Item.Auditores);
                        //alert(objAuditoria[Item.Id].Auditores.htmlA);

                    //objAuditoria[Item.Id].Procesos = new cProcesos(Item.Procesos);// crear clase y activar
                    //objAuditoria[Item.Id].Programacion_Plan = new cProgramacion(Item.Programacion_Plan);


                    objcPlanAuditoria[Item.Id] = new cPlanAuditoria();
                    buscarPlanesDeAuditorias(Item.Id);

                    //console.log("(",objAuditoria[o],")")
                }

                objAuditoria[Item.Id].AdjuntosInforme = Item.AdjuntosInforme
                // console.warn("adjuntos ->",Item.AdjuntosInforme)
                // console.warn("adjuntos ->",objAuditoria[Item.Id])


               //alert("CREAMOS EL OBJETO DE LA AUDITORIA ["+ Item.Id +"]");
                cont_auditoriasp++;
                // console.log("################  VAMOS A BUSCAR A LOS AUDITORES DE [",Item.Id,"] ############################ ")

                //console.log("(",Item.Id,Item.SedeId,Item.EspecialidadId,o,")")

                    //alert('antes'+Item.Id)
                    // console.log("objAuditoria",objAuditoria[Item.Id])
                    //cargarAuditoresPlanI()
                    cargarAuditoresPlanI(Item.Id,Item.SedeId,Item.EspecialidadId);

                // console.log("################  VAMOS A BUSCAR A LOS AUDITORES DE [___________] ############################ ")

                o++;
                var colorLetra  = "";
                var disabledBtnAuditor   = 'disabled';
                var disabledBtnModificar = 0;
                var startDate   = moment(Item.Inicio).format('DD/MM/YYYY');//dddd
                var endDate     = moment(Item.Fin).format('DD/MM/YYYY');//dddd
                var year        = moment(Item.Inicio).format('YYYY');//dddd
                var month       = moment(Item.Inicio).format('MM');//
                var day         = moment(Item.Inicio).format('DD'); ;
                var startDate2   = year +"/"+ month +"/"+ day;
                year            = moment(Item.Fin).format('YYYY');//dddd
                month           = moment(Item.Fin).format('MM');//
                day             = moment(Item.Fin).format('DD');
                var endDate2     = year +"/"+ month +"/"+ day;//*/
                // EVALUAMOS EL ESTADO DE LA EVALUACIONES PARA ASIGNAR LA CLASE CORRESPONDIENTE
                if(Item.StatusEvaluacionId==0) {
                    Item.DescriptionStatuspEvaluacion = '---'
                    hayAuditoriasSinEvaluzacionp++ // observadas
                }
                if(Item.StatusEvaluacionId==1){
                    hayAuditoriasObservadasp++ // observadas
                    colorLetra = "textoObservadaCA"
                }
                if(Item.StatusEvaluacionId==2) {
                    hayAuditoriasCorregidasp++ // corregidas
                    colorLetra = "textoCorregidaCA"
                    disabledBtnModificar  = 1;
                }
                if(Item.StatusEvaluacionId==3){
                    hayAuditoriasAprobadasp++ // corregidas
                    colorLetra = "textoAprobadaCA"
                    disabledBtnAuditor = ''
                    disabledBtnModificar  = 1;
                }
                var habplan         = 'background-color: #58c25d;';
                var habver          = 'background-color: #b2b2b2;';
                var habEnviar       = 'background-color: #b2b2b2;';
                var disabled        = '';
                var disabledSusp    = '';
                var disabledver     = 'disabled readonly';
                var disabledEnviar  = 'disabled readonly';
                var classdis        = 'background-color: #ff6767';
                var ver             = false;
                var verModal        = "";

                if ( Item.Flag_Finalizado_Plan == 1) {
                    disabled        = 'disabled readonly';
                    habplan         = 'background-color:#b2b2b2 !important;';
                    disabledver     = '';
                    habver          = 'background-color: #34559c; !important';
                    verModal        = 'onclick="ventanaPlanAuditoria('+Item.Id+',3)"';
                    disabledEnviar  = '';
                    habEnviar       = 'background-color: #05beee; !important';
                }

                if (Item.StatusId == 7 ) {
                    disabledSusp    = 'disabled readonly';
                    classdis        = 'background-color:#b2b2b2 !important;';
                    disabled        = 'disabled readonly';
                    habplan         = 'background-color:#b2b2b2 !important;';
                    disabledver     = '';
                    habver          = 'background-color: #34559c; !important';
                    ver             =  true;
                    verModal        = 'onclick="ventanaSuspenderPlan('+Item.Id+','+ver+',\''+Item.Description_Motivo+'\')"';
                    disabledEnviar  = 'disabled readonly';
                    habEnviar       = 'background-color: #b2b2b2;';

                }

                if (Item.StatusId == 8 ) {//auditoria en estado ejecutada, aqui aparece el boton del sprint3
                    let dd = "Auditoria Ejecutada, lista para Generar Informe"
                   //alert("estamos aqui");
                    disabledSusp    = 'disabled readonly';
                    classdis        = 'background-color:#b2b2b2 !important;';
                    disabled        = 'disabled readonly';
                    habplan         = 'background-color:#b2b2b2 !important;';
                    disabledver     = '';
                    habver          = 'background-color: #34559c; !important';
                    ver             =  true;
                    verModal        = 'onclick=" ventanaPlanAuditoria('+Item.Id+',8)"';//'onclick="ventanaPlanAuditoria('+Item.Id+') "';
                    disabledEnviar  = 'disabled readonly';
                    habEnviar       = 'background-color: #b2b2b2;';

                }

                if (Item.StatusId == 9 ) {
                    disabledSusp    = 'disabled readonly';
                    classdis        = 'background-color:#b2b2b2 !important;';
                    disabled        = 'disabled readonly';
                    habplan         = 'background-color:#b2b2b2 !important;';
                    disabledver     = '';
                    habver          = 'background-color: #34559c; !important';
                    ver             =  true;
                    verModal        = 'onclick=" ventanaPlanAuditoria('+Item.Id+',9)"';//'onclick="ventanaPlanAuditoria('+Item.Id+') "';
                    disabledEnviar  = 'disabled readonly';
                    habEnviar       = 'background-color: #b2b2b2;';
                }



                //cargaProcesosCargo(cont_auditoriasp, 0,'btn-basic');
                var btNew;   let iidPlan = parseInt(Item.PlanId);
                //alert(iidPlan);
                if((iidPlan == MayorPlan)&&(iidPlan >0))
                {
                   // btNew = "<div  class='check-blue text-center'>Nuevo</div>"; //btNew ="";//momentaneamente suspendido por jaqueline
                      var btNew = " ";
                }else{var btNew = " ";}

                html += `
                    <div class="item-tabla p-2" style="z-index: 1;display:relative;">${btNew}
                    <div class="row m-0 justify-content-between align-items-center tbody_trainning">
                    <div class="col-2 text-left fontZiseDinamico">${Item.Code}</div>
                    <div class="col-2 text-left fontZiseDinamico">${Item.DescriptionUnidadNegocio}</div>
                    <div class="col-1 text-left fontZiseDinamico">${Item.DescriptionSede}</div>
                    <div class="col-1 text-left fontZiseDinamico">${Item.Code_Normas}</div>
                    <div class="col-1 text-left fontZiseDinamico">${Item.DescriptionAuditoria}</div>
                    <div class="col-1 text-left fontZiseDinamico">${startDate}</div>
                    <div class="col-1 text-left fontZiseDinamico">${endDate}</div>
                    <div class="col-1 text-left fontZiseDinamico">${Item.DescriptionStatus}</div>
                    <div class="col-2 text-left fontZiseDinamico">
                        <div class="row">
                            <div class="col-3" text-left>
                                <button type='button' onclick="ventanaPlanAuditoria(${Item.Id})" ${disabled} class='btn-circle btn-register border-0' style=' ${habplan}'>
                                    <img src="./images/iconos/escritura4.svg" alt="" class="edit-1" >
                                </button>
                            </div>
                            <div class="col-3 text-left">
                                <button type='button' ${verModal} ${disabledver}  class='btn-circle btn_read border-0' style='${habver}' id='btn_read'>
                                    <img src='./images/iconos/ojo_1.svg' class='ojo-1'>
                                </button>
                            </div>
                            <div class="col-3 text-left">
                                <button type='button' onclick="ventanaEnviarPlan(${Item.Id},${Item.PlanId},${Item.numListado})" class='btn-circle btn_read border-0'  ${disabledEnviar} style='${habEnviar}' id='btn_send' >

                                    <img src='./images/iconos/Frame6.svg' class='ojo-1'>
                                </button>
                            </div>
                            <div class="col-3 text-left">
                                <button type='button' id='susp' onclick="ventanaSuspenderPlan(${Item.Id},${ver},'${Item.Description_Motivo}')"  ${disabledSusp}  class='btn-circle btn_read border-0 ' style=' ${classdis}' id='btn_suspender'  >
                                    <img src='./images/iconos/on-off-button.svg' class='ojo-1'>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
                    </div>`
                //)//onclick="ventanaPlanAuditoria(${Item.Id},3)"

        })

        html += '';//hideLoading();

        //console.error("objAuditoria ==> ",objAuditoria )

        return html;

    }

function buscarPlanesDeAuditorias(audId)
{//--------------------------------------------INI -----------------buscarPlanesDeAuditorias(pata)-
 //--------------------PARAMETROS PARA EL SERVICIO LISTAR AUDITORIAS DE UN PROGRAMA POR SU ID-------------------------------
        let IdAuditoria = audId;
        url =  apiurlAuditoria+"/api/Get-Auditoria-Lider-All?code=UAIRBeY2QaKbBgPA4aEGXzAYjgDu4T4WvBa04WvkGpB1RazLa3462w==&IdAuditoria="+IdAuditoria+"&httpmethod=object"
        var headers         ={
            "apikey":constantes.apiKey
        }

        $.ajax({
            method: 'GET',
            url:  url,
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function (p) {

            console.log("############..............buscarPlanesDeAuditorias(",audId,").....................#############");
            console.log(p);
            console.log("############..............buscarPlanesDeAuditorias(",audId,").....................#############");

            if(p.Id == 0)
            {
                  //alert(Item.Id+" = no tiene plan")
                  //return 0
                }
            else
            {

                objcPlanAuditoria[audId].PlanId = p.PlanId;
                //LLAMAMOS A LA FUNCION QUE CARGA EL OBJETO
                //alert("AUDITORIA["+audId+"] = "+objcPlanAuditoria[audId].PlanId);
                objcPlanAuditoria[audId].cargarPlanDB(p);
            }
           // console.log("############..............buscarPlanesDeAuditorias(",Item.Id,").....................#############");console.log(p);console.log("############..............buscarPlanesDeAuditorias(",Item.Id,").....................#############");
        })

         // vamos al servicios
         //return 1;

  //return 0;//1 si tiene plan     0 no tiene plan
}//--------------------------------------------FIN -----------------buscarPlanesDeAuditorias(pata)




    /// CARGAR TABLA CON DATOS DE LA DB DE LA TABLA AUDITORIA
    //var globalBlackLists=[];
    /*var dataTableAuditorias = function(){
        var now  = moment().format('YYYY-MM-DD');
        //----------------------PARAMETROS PARA EL SERVICIO LISTAR AUDITORIAS DE UN PROGRAMA POR SU ID-------------------------------
        var servicio        = '/api/Get-Auditoria-All?code=';
        var metodoHttp      = "objectlist";
        var metodoAjax      =  "GET";
        var getAuditoriaAll ="H4VLj4KN6GZdCduqoToDVkDdP56Fz4t10niae2jucl8sXGaKz6bFuQ==";
        var url             = apiurlAuditoria+servicio+getAuditoriaAll+"&ProgramaAuditoriaId="+id_auditoriap+"&httpmethod="+metodoHttp;
        var metodoAjaxGp    =  "GET"; //"POST";
        var headers         ={
            "apikey":constantes.apiKey
        }

        //----------------------PARAMETROS PARA EL SERVICIO LISTAR AUDITORIAS DE UN PROGRAMA POR SU ID-------------------------------
        oTableAuditoriasp = $('#tb_black_list').DataTable({
            ordering  : true,
            info      : false,
            paging:true,
            pageLength: 5,
            //order: [[5,'ASC']],
            searching : true,
            scrollY   : '43vh',
            scrollCollapse: false,
            responsive: true,
            ajax  :{
                type: "GET",
                url:  url,
                headers:headers,
                crossDomain: true,
                dataType: "json",

                error: function (xhr, error, thrown) {

                    var textError=thrown;
                    var status=xhr.status+' - '+xhr.statusText;//500 error servidor
                    console.log("error")
                    console.log(textError)
                    showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
                    return;
                },
                dataSrc: function ( req )
                {
                    globalBlackLists =req;
                    var data         =[];
                    datosTablap       =[];
                    var total        = 0;
                    var e            =1;
                    var r            =1;
                    req.map(function(item,i){
                        console.log("item",item);
                        var startDate = moment(item.Inicio).format('DD/MM/YYYY');//dddd
                        var endDate   = moment(item.Fin).format('DD/MM/YYYY');//dddd
                        var year        = moment(item.Inicio).format('YYYY');//dddd
                        var month       = moment(item.Inicio).format('MM');//
                        var day         = moment(item.Inicio).format('DD'); ;
                        var startDate2   = year +"-"+ month +"-"+ day;
                        console.log("startDate2",startDate2)
                        year            = moment(item.Fin).format('YYYY');//dddd
                        month           = moment(item.Fin).format('MM');//
                        day             = moment(item.Fin).format('DD');
                        var endDate2     = year +"-"+ month +"-"+ day;//*/

                        /*if(item.Code_Normas!==null){
                            var normas = item.Code_Normas.split("/")
                            console.log("normas",normas)
                            console.log("Code_Normas",item.Code_Normas)
                        }

                        var row = {
                            Id                      : item.Id//
                            ,Code                      : '<span class="">'+ item.Code +'</span> ' //
                            ,DescriptionUnidadNegocio : '<span class="">'+toCapitalize(item.DescriptionUnidadNegocio) +'</span> '
                            ,DescriptionSede          : '<span class="">'+toCapitalize(item.DescriptionSede) +'</span>' //
                            ,CodeNormas  : '<span class="">'+toCapitalize(item.Code_Normas) +'</span>' //
                            ,DescriptionAuditoria       : '<span class="">'+toCapitalize(item.DescriptionAuditoria) +'</span> ' //
                            ,Inicio  : '<span class="">'+startDate+'</span> ' //
                            ,Fin  : '<span class="">'+endDate +'</span> ' //
                            //,DescriptionStatusp      : (item.Evaluacion == 1)?'<span class="text-success">Activo</span>' :'<span class="text-danger">Inactivo</span>'
                            ,DescriptionStatusp      : '<span class="">'+item.DescriptionStatusp+'</span>'
                            ,evaluacion  : '<span class="">'+item.DescriptionStatuspEvaluacion+'</span> ' //
                            ,edit  :'<button type="button" class="btn-circle border-0" style="background-color: #b2b2b2 !important ; min-width: 2.5rem; height: 2.5rem; "><img height="24" style="cursor:pointer " src="./images/iconos/usuario-1.svg" onClick="vw_auditor_list.asignarauditor('+item.Id+');" class="ojo-1"></button>'
                            ,ver  : '<button type="button" id="btnVerAuditoria_'+item.Id+'" Code="'+item.Code+'"" CodeUnidadNegocio="'+item.CodeUnidadNegocio
                                +'" Description="'+item.Description+'" StatusEvaluacionId="'+item.StatusEvaluacionId+'" created_by="'+item.created_by
                                +'" DescriptionUnidadNegocio="'+item.DescriptionUnidadNegocio+'" DescriptionAuditoria="'+item.DescriptionAuditoria+'" Code_Normas="'+item.Code_Normas
                                +'" DescriptionSede="'+item.DescriptionSede+'" SedeId="'+item.SedeId+'" CodeSede="'+item.CodeSede +'" Inicio="'+startDate+'" Fin="'+endDate+'"'
                                +' Inicio2="'+startDate2+'" Fin2="'+endDate2+'"'
                                +' StatusId="'+item.StatusId+'" DescriptionStatusp="'+item.DescriptionStatusp+'"'
                                +' TipoId="'+item.TipoId+'" onClick="verAuditoriap('+item.Id+')" class="btn-circle border-0" style="background-color: #373e68"> <img src="./images/iconos/ojo_1.svg" class="ojo-1"></button>'
                        }

                        console.log("item",item);
                        data.push(row);
                        auditor.push(row);
                        total++;
                        cont_auditoriasp++;
                    });
                    console.log("data",data)
                    //console.log("auditor",auditor)
                    $("#cant_auditorias").html('<img src="images/iconos/copia-1.svg" class="copia-1"> '+cont_auditoriasp+' ');
                    return data;
                }
            },
            columns: [

                { title:"Id ",data: "Id",width: "10%" ,align:"center" ,"orderable": true, visible:false},
                { title:"Id Audotoria",data: "Code",width: "10%" ,align:"center" ,"orderable": true},
                { title:"Unidad de Negocio",data: "DescriptionUnidadNegocio",width: "15%" ,align:"left" ,"orderable": true},
                { title:"Sede",data: "DescriptionSede",width: "8%" ,align:"left" ,"orderable": false},
                { title:"Norma",data: "CodeNormas",width: "8%",align:"left" ,"orderable": true},
                { title:"Tipo de Autitoria",data: "DescriptionAuditoria",width: "15%",align:"left" ,"orderable": true},
                { title:"Fecha Inicio",data: "Inicio",width: "10%",align:"left" ,"orderable": true},
                { title:"Fecha Fin",data: "Fin",width: "10%",align:"left" ,"orderable": true},
                { title:"Estado",data: "DescriptionStatusp",width: "1%" ,"orderable": false},
                { title:"Evaluacion",data: "evaluacion" ,width: "7%", "orderable": false},
                { title:"Asignar",data: "edit",width: "5%" ,"orderable": false},
                { title:"Ver",data: "ver",width: "5%" ,"orderable": false},
            ],

            initComplete: function(settings, json) {

            }

        });

    }//*/
    /**
     * // RECARGAR DATATABLE AUDITORIAS CON AJAX
     * @return {[type]} [description]
     */
    /*var reloadtableBlackList = function(){
        if(oTableAuditoriasp)
          oTableAuditoriasp.ajax.reload();
        else
          tableBlackList();
    }//*/

    var validarFechasP = function(int){
        var fechaDesde = ""
        var fechaHasta = ""
        var parts      = ""

        if(int == 3)  // fechas del filtro
        {
            parts = $("#txt_date_start_evaluacion").val().split("/");
            fechaDesde = new Date(parts[2], parts[1] - 1, parts[0]);
            parts = $("#txt_date_end_evaluacion").val().split("/");
            fechaHasta = new Date(parts[2], parts[1] - 1, parts[0]);

            if(fechaDesde >= fechaHasta){
                $("#txt_date_end_evaluacion").val($("#txt_date_start_evaluacion").val())
            }
        }

        if(int == 2)  // modal modificar-correguir auditoria
        {
            parts = $("#tx_date_start_auditoria").val().split("/");
            fechaDesde = new Date(parts[2], parts[1] - 1, parts[0]);
            parts = $("#tx_date_end_auditoria").val().split("/");
            fechaHasta = new Date(parts[2], parts[1] - 1, parts[0]);

            if(fechaDesde >= fechaHasta){
                $("#tx_date_end_auditoria").val($("#tx_date_start_auditoria").val())
            }
        }

        if(int == 1)  // modal newAuditoria
        {
            parts = $("#tx_date_start_new_auditoria").val().split("/");
            fechaDesde = new Date(parts[2], parts[1] - 1, parts[0]);
            parts = $("#tx_date_end_new_auditoria").val().split("/");
            fechaHasta = new Date(parts[2], parts[1] - 1, parts[0]);

            if(fechaDesde >= fechaHasta){
                $("#tx_date_end_new_auditoria").val($("#tx_date_start_new_auditoria").val())
            }
        }
    }

    return{

        init:function(){
            showLoading();//9
           responsiveAud();//8
        //    alert('iuuuuuuuuuuuuuuuuuuuuu');
            // CARGAR SELECT NORMAS MODAL NEW AUDITORIA
           buscarTiposHallazgos()//solo generar el string e insertar al select //7
            /*
            id_auditoriap = 96;
            id_codigo_especialidad_programap = 'CALIDAD2020';//jesus pasalo
            nombre_programa_auditoriap = 5;*/


            // OBTENER LA INFORMACION DEL PROGRAMA DE AUDITORIA
                    getDataProgramaAuditoria();// ***6
            // CARGAR SELECT UNIDADES DE NEGOCIO FILTRO
                     cargarSelectsUnidadesOrganizativas();//5
            // CARGAR SELECT ESTATUS AUDITORIA FILTRO
                    cargarSelectStatusAuditoria();//4


                        //cargarSelectsNormas();  *****
            // CARGAR SELECT TIPOAUDITORIA MODAL NEW AUDITORIA
                       // cargarSelectTipoAuditoria();
            // CARGAR LISTADO DE AUDITORIAS
            //dataTableAuditorias(); // con datos de la DB tabla auditoria
            //tablaDivsAuditorias(); // con datos de la DB tabla auditoria
                         filtroTablaDivsAuditoriasp();//3             aqui es donde viene todo
            // CARGAR ARRAY auditoriaModificacionLogp CON LAS MADIFICACIONES
            // DE LAS AUDITORIAS REGISTRADAS EN EL SISTEMA
            //getAuditoriaModificacionLog();
            // traemos las observaciones de las auditorias
            //getObservacionesAuditorias();
            // traemos todas las sedes
            getSedesAll();//2

             //############# funciones de carga inicial para la modal de  plan ######################### init();
               cargaInicialFormPlanAuditoria();//1
              //############# funciones de carga inicial para la modal de  plan #########################  init();

            var now = '01/01/'+moment().format('YYYY');
            var end = '31/12/'+moment().format('YYYY');
            //$("#txt_date_start_evaluacion").val(now);

            //jQuery.datetimepicker.setLocale('es');

            $("#txt_date_start_evaluacion").datetimepicker({
                timepicker:false,
                format:'d/m/Y'
            });





//////////////////// JESUS ///////////////
            //var rowCount2_Pdf = 0;
            $('#add-trainningInformePdf').click(function (){
                //pintar contador
                //rowCount2_Pdf = $('#tbody_trainningInformePdf .item-tabla').length;
                rowCount2_Pdf++;
                //agregar fila
                $("#tbody_trainningInformePdf").append(
                "<div class='item-tabla px-3' style='font-size: 13px;background-color:#ffffff;border: solid 1px #cbcbcb;'>"+
                "                         <div class='row m-0 justify-content-between  tbody_trainningInformePdf'>"+
                "                         <div class='col-4 form-control2 text-left' >"+
                //"                           <label for='Name_"+rowCount2_Pdf+"'></label>"+
                "                           <input type='hidden' id='contadorrow' value='"+rowCount2_Pdf+"' ></label>"+
                "                           <input type='hidden' name='idAuditor_' id='idAuditor_'>"+
                "                           <input type='hidden' name='Create_By'>"+
                "                           <input type='text' value='' id='Name_"+rowCount2_Pdf+"' name='Name' class='form-control form-control2 bg-white autocompletecollaborator'>"+
                "                           <div class='loader' id='add_firtnameload_1"+rowCount2_Pdf+"' style='display:none'></div>"+
                "                           <input type='hidden' class='form-control' id='hid_Name_id_"+rowCount2_Pdf+"' name='hid_Name_id_"+rowCount2_Pdf+"'></div>"+
                "                         <div class='col-3 text-left'><input type='text' id='Cargo_"+rowCount2_Pdf+"' name='cargo' readonly class='form-control form-control2 bg-white autocompletecollaborator'>" +
                "                           <input type='hidden' class='form-control' id='hid_Cargo_"+rowCount2_Pdf+"'  name='hid_Cargo_"+rowCount2_Pdf+"'></div>"+
                "                         <div class='col-4 text-left'>"+
                "                           <input type='text' id='Correo_"+rowCount2_Pdf+"' name='correo' readonly class='form-control form-control2 bg-white autocompletecollaborator'>"+
                "                           <input type='hidden' class='form-control' id='hid_Correo_"+rowCount2_Pdf+"'  name='hid_Correo_"+rowCount2_Pdf+"'>"+
                "                         </div>"+
                "                         <div class='col-1'>"+
                "                           <button type='button' _Id='' class='delete btn-circle btn-register border-0 ojo-1' style='background-color: #ff6767'>"+
                "                               <img src='./images/iconos/Pathcan.svg' class='edit-1'>"+
                "                           </button>" +
                "                         </div></div></div>"
                );

                var total = $('#tbody_trainningInformePdf .item-tabla').length;
                if(total<10) total = "0"+total
                else total = total
                $('#variableInformePdf').html(total);

                getPersonPDF($("#Name_"+rowCount2_Pdf),rowCount2_Pdf);

            });

            $('#tbody_trainningInformePdf').on('click', '.delete', function() {

                $(this).parents('.item-tabla').remove();
                // $('#contadorrow').html($('#tbody_trainningInformePdf .item-tabla').length);
                rowCount2_Pdf;
                var total = $('#tbody_trainningInformePdf .item-tabla').length;
                //total--;
                if(total<10) total = "0"+total
                else total = total
                $('#variableInformePdf').html(total);

            });

            //////////////////// JESUS ///////////////








            //$("#txt_date_end_evaluacion").val(end);
            $("#txt_date_end_evaluacion").datetimepicker({
                timepicker:false,
                format:'d/m/Y',
                defaultDate: end,
                //minDate: new Date(moment(now).format('YYYY-MM-DD')),
                //maxDate: new Date(moment(end).format('YYYY-MM-DD'))
            });//*/

            var now = moment().add(50, 'days').format('DD/MM/YYYY');
            var end = '31/12/'+moment().format('YYYY');
            $("#tx_date_start_new_auditoria").val(now);
            $("#tx_date_start_new_auditoria").datetimepicker({
                timepicker:false,
                format:'d/m/Y',
                //defaultDate: now,
                minDate: new Date(moment().add(50, 'days').format('YYYY-MM-DD'))

            });
            var now = moment().add(50, 'days').format('DD/MM/YYYY');
            $("#tx_date_end_new_auditoria").val(now);
            $("#tx_date_end_new_auditoria").datetimepicker({
                timepicker:false,
                format:'d/m/Y',
                //defaultDate: now,
                minDate: new Date(moment().add(50, 'days').format('YYYY-MM-DD')),
                yearRange: "2019:2020"
                //maxDate: "+5M +10D"
            });

            hideLoading();

        },
        // RRECARGAR EL LISTADO DEL DATATABLE
        reloadtableBlackList:function(){
          reloadtableBlackList();
        },
        // LLENAR EL ARRAY CON TODAS LAS MODIFICAIONES REGISTRADAS
        getAuditoriaModificacionLog:function(){
            getAuditoriaModificacionLog();
        },
        // volver a pintar la tabla
        tablaDivsAuditorias:function(){
            tablaDivsAuditorias();
        },
        finalizeEvaluacion:function(){
            finalizeEvaluacion();
        },
        filtroTablaDivsAuditoriasp:function(){
            filtroTablaDivsAuditoriasp();
        },
        validarFechasP:function(int){
            validarFechasP(int)
        },
        cargarSelectSedesFilter:function(selectId){
            cargarSelectSedesFilter(selectId)
        },
        getPersonPDF: function (obj,i) {
            getPersonPDF(obj,i)
        },


    }
}();

/**
 * [selectUnidadOrganizativaFiltep obtener UnidadNegocioId del select
 * en la modal nueva auditoria para llenar el select de sedes]
 * @return {[type]} [description]
 */
function selectUnidadOrganizativaFiltep()
{
    console.log("cambio")

    idUnidadNegocioFiltrop = document.getElementById('sel_filter_unidad_organizativa').value;

    var select = 'sel_filter_sedep'

    if(idUnidadNegocioFiltrop>0)
        getSelectSedePorIdUnidadNegociop(idUnidadNegocioFiltrop, select)
    else
        $("#"+select).html("<option value='0'  selected>       </option>")
}

/**
 * [selectUnidadOrganizativaNewAuditoriap obtener UnidadNegocioId del select
 * en la modal nueva auditoria para llenar el select de sedes]
 * @return {[type]} [description]
 */
function selectUnidadOrganizativaNewAuditoriap()
{
    idUnidadNegocioNewAuditoriap = document.getElementById('sel_new_unidad_organizativa').value;
    var select = 'sel_new_sede'
    getSelectSedePorIdUnidadNegociop(idUnidadNegocioNewAuditoriap, select)
}

/**
 * [selectUnidadOrganizativaModificarAuditoriap obtener UnidadNegocioId del select
 * en la modal modificar auditoria para llenar el select de sedes de la misma modal]
 * @return {[type]} [description]
 */
function selectUnidadOrganizativaModificarAuditoriap()
{
    idUnidadNegocio = document.getElementById('sel_unidad_organizativa').value;
    var select      = 'sel_sede'
    getSelectSedePorIdUnidadNegociop(idUnidadNegocio, select)
    console.log("idUnidadNegocio",idUnidadNegocio)
    console.log("sede",sede)
}

/**
 * [getSelectSedePorIdUnidadNegociop cargar los datos de los select sedes]
 * @param  {[int]} idUnidadNegocio [id de la unidad de negocio]
 * @param  {[string]} select          [id del select a cargar]
 * @return {[type]}                 [description]
 */
function getSelectSedePorIdUnidadNegociop(idUnidadNegocio, select)
{
    console.log("idUnidadNegocio "+idUnidadNegocio, "select "+select)
    if(idUnidadNegocioFiltrop==0){
        $("#"+select).html("<option value='0'  selected>           </option>")
        return false;
    }


    var servicio = '/api/Get-Sede-All?code=';
    var getSedeAllAuditoria = "0N470WSSjrIb6hhHAsgBHgS8wplALMbCB6KcP5FmsjFDvjQkcaaWbw==";
    var metodoHttp = "objectlist";
    var metodoAjax =  "GET";
    var url = apiurlAuditoria+servicio+GetSedesAll+"&UnidadNegocioId="+idUnidadNegocio+"&httpmethod="+metodoHttp;
    //var url = apiurlAuditoria+servicio+getSedeAllAuditoria+"&UnidadNegocioId="+idUnidadNegocio+"&httpmethod="+metodoHttp;
    var headers ={
        "apikey":constantes.apiKey
    }
    $("#"+select).html("<option value='' selected disabled>Buscando...</option>")
    //jsonSedesp = [];
        $.ajax({
            method: metodoAjax,
            url:  url,
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function( data)
        {
            $("#"+select).html("<option value='0'  selected>              </option>")
            //$("#"+select).append("")
            data.map(function(item)
            {
                if(sede==item.Id){
                    $("#"+select).append(`<option selected description='${item.Description}' value='${item.Id}'>${item.Code}</option>`);
                }
                else{
                    $("#"+select).append(`<option description='${item.Description}' value='${item.Id}'>${item.Code}</option>`);
                }
            });

        }).fail(function( jqXHR, textStatus, errorThrown ) {
            swal("Error","No se pudieron cargar las sedes, por favor verifique su conexion a internet y vuelva a intentarlo","error")
            //showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
            //console.log(errorThrown)
            //$("#"+select).hide();
        });
}

// AL SELECIONAR UNA NORMA EN MODAL CREAR AUDITORIA
/**
 * [selectNewNormasp guardamos las opciones selecionas en un array llamado
 * sel_new_normasp para luego usarlo al momento de guardar la auditoria
 * en la funcion setRegistrarAuditoriaDBp]
 * @param  {[select]} select [el select con el id sel_new_normasp en la modal nueva auditoria]
 * @return {[type]}        [description]
 */
function selectNewNormasp(select)
{
    /*if($("#sel_new_normasp option:selected").length >= 2){
        showNotification("Puedes selecionar un máximo de 2 Normas.")
    }
    else{
        $("#sel_new_normasp option:selected").each(function() {
            sel_new_normasp = $("#sel_new_normasp").val();
            normasCodep = $('option:selected', select).attr('Code');
    console.log("sel_new_normasp",sel_new_normasp)
    console.log("normasCodep",normasCodep)
    console.log("length",$("#sel_new_normasp option:selected").length)
        });
    }//*/
    /*$("#sel_new_normasp option:selected").each(function() {
        sel_new_normasp = $("#sel_new_normasp").val();
        normasCodep      = $('option:selected', select).attr('Code');
    });
    console.log("sel_new_normasp",sel_new_normasp)
    console.log("normasCodep",normasCodep)
    //*/
}

// AL SELECIONAR UNA SEDE EN MODAL CREAR AUDITORIA
function selectNewSedesp(select)
{
    var i           = 0
    $("#sel_new_sede option:selected").each(function() {
        sel_new_sede    = $("#sel_new_sede").val();
        sede            = $("#sel_new_sede").val();
        sedeTextp        = $("#sel_new_sede option:selected").text();
        sedeDescriptionp = $('option:selected', select).attr('description');
        //console.log("sede",sede)
        //console.log("sedeTextp",sedeTextp)
        //console.log("sedeDescriptionp",sedeDescriptionp)

    });
}

// AL SELECIONAR UNA NORMA EN LA MODAL MODIFICAR CORREGUIR AUDITORIA
/**
 * [selectNormasp guardamos las opciones selecionas en un array llamado
 * sel_normas para luego usarlo al momento de modificar-corregir la
 * auditoria en la funcion confirmarCambiosAuditoriap]
 * @param  {[type]} select [description]
 * @return {[type]}        [description]
 */
function selectNormasp(select)
{

    /*$("#sel_normas option:selected").each(function() {
        sel_normas = $("#sel_normas").val();
        normasCodep = $('option:selected', select).attr('Code');
    });

    console.log("sel_normas",sel_normas)
    console.log("normasCodep",normasCodep)//*/
}

// AL SELECIONAR UNA SEDE EN LA MODAL MODIFICAR O CORREGUIR AUDITORIA
function selectSedesp(select)
{
    var i           = 0
    $("#sel_sede option:selected").each(function() {
        sel_sede        = $("#sel_sede").val();
        sede            = $("#sel_sede").val();
        sedeTextp        = $("#sel_sede option:selected").text();
        sedeDescriptionp = $('option:selected', select).attr('description');
        //console.log("sedeDescriptionp",sedeDescriptionp)

    });
}

// AL HACER CLICK EN EL BOTON + NUEVA AUDITORIA
function modalNewAuditoriap()
{
    //LEVANTAMOS LA MODAL PARA REGISTRAR UNA NUEVA AUDITORIA //&nbsp;&nbsp;&nbsp;&nbsp;
    $("#tituloModalNewAuditoria").html("<b>&nbsp;&nbsp;Registro de auditoría en Programa "+nombre_programa_auditoriap+"</b>")
    // limpiar select unidad organizativa
    $("#sel_new_unidad_organizativa").html(`<option value="" selected disabled>             </option>`);
    for(i in jsonUnidadesOrganizativasp){
        console.log("i: "+i, jsonUnidadesOrganizativasp[i].Code)
        //$("#sel_new_unidad_organizativa").html(`<option value="" selected disabled >                </option>`);
        $("#sel_new_unidad_organizativa").append('<option description="'+jsonUnidadesOrganizativasp[i].Description+'" value="'+jsonUnidadesOrganizativasp[i].Id+'">'+jsonUnidadesOrganizativasp[i].Code+'</option>');

    }
    // limpiar select sedes
    $("#sel_new_sede").html(`<option value="" selected disabled >                </option>`);
    /*for(i in jsonSedesp){
       $("#sel_new_sede").append(`<option description='`+jsonSedesp[i].Description+`' value='`+jsonSedesp[i].Id+`'>`+jsonSedesp[i].Code+`</option>`);
    }//*/

    // limpiar select normas
    $("#sel_new_normasp").html('');
    $("#divCountNormas").html('0');
    for(i in jsonNormasp){
        console.log("i: "+i, jsonNormasp[i].Code)
        $("#sel_new_normasp").append('<option code="'+jsonNormasp[i].Code+'" value="'+jsonNormasp[i].Code+'">'+jsonNormasp[i].Code+'</option>');

    }
    // limpiar tipo de auditoria
    $("#sel_new_tipo_auditoriap").html('<option value="" selected disabled >                </option>');
    for(i in jsonTipoAuditoriap){
        console.log("i: "+i, jsonTipoAuditoriap[i].Code)
        $("#sel_new_tipo_auditoriap").append('<option code="'+jsonTipoAuditoriap[i].Code+'" value="'+jsonTipoAuditoriap[i].Id+'">'+jsonTipoAuditoriap[i].Description+'</option>');

    }

}

// AL HACER CLICK EN EL BOTON FINALIZAR AUDITORIA
/**
 * [finalizarAuditoriap
 * si Flag_Completadap = 0 la actualizamos a 1 en la tabla programaAuditoria]
 * si Flag_completada = 1 y todas las auditorias tienen estado de evaluacion = corregida el
 * status del PA pasa a Corregido
 *
 * @return {[type]} [description]
 */
function finalizarAuditoriap()
{
    //
    console.log("finalizar auditoria")
    console.log("Flag_Completadap ",Flag_Completadap)
    if(Flag_Completadap==0){
        Flag_Completadap = 1
        console.log("cambiamos Flag_Completadap a 1 en P.A.", Flag_Completadap)
        ////// EJECUTAMOS EL SERVICIO FINALIZAR PROGRAMA PARA QUE CAMBIE Flag_Completadap = 1
    }else if(Flag_Completadap==1){
        console.log("Flag_Completadap es 1 ", Flag_Completadap)
        console.log("hayAuditoriasObservadasp ",hayAuditoriasObservadasp)
        console.log("hayAuditoriasCorregidasp ",hayAuditoriasCorregidasp)
        console.log("hayAuditoriasAprobadasp ",hayAuditoriasAprobadasp)
        console.log("hayAuditoriasSinEvaluzacionp ",hayAuditoriasSinEvaluzacionp)

    }
    //showNotification("En espera del servicio....!!!")
}

/// AL HACER CLICK EN EL BOTON VER AUDITORIA
/**
 * [verAuditoriap LEVANDAR LA MODAL PARA VER LOS DATOS UNA AUDITORIA]
 * @param  {[INR]} id [Id DE LA AUDITORIA A CONSULTAR]
 * @return {[type]}    [description]
 */
function verAuditoriap(id)
{
    id_auditoriap = id
    console.log("id_auditoriap " + id_auditoriap)
    var ver = document.getElementById("btnVerAuditoria_"+id);
    codeAuditoriap = ver.getAttribute("Code")
    EstatusEvaluacionIdp = ver.getAttribute("StatusEvaluacionId")
    console.log("ver EstatusEvaluacionIdp ",EstatusEvaluacionIdp)
    //console.log("unidad organizativa",jsonUnidadesOrganizativasp[auditor[id][1]])
    $("#idAuditoria").val(id)
    $('#verModalAuditoria').modal('show');
    // TITULO MODAL VER AUDITORIA
    //$("#tituloModalVerAuditoria").html("<b>Auditoria - "+auditor[id][0]+"</b>")
    $("#tituloModalVerAuditoria").html("<b>Auditoría - "+ver.getAttribute("Code")+"</b>")
    // UNIDAD ORGANIZATIVA
    //$("#divTextoUnidadOrganizativa").html(""+auditor[id][1]+"")
    $("#divTextoUnidadOrganizativa").html(ver.getAttribute("DescriptionUnidadNegocio"))//*/
    // TIPO DE AUDITORIA
    //$("#divTextoTipoAuditoria").html(""+auditor[id][4]+"")
    $("#divTextoTipoAuditoria").html(ver.getAttribute("DescriptionAuditoria"))
    // SEDE DONDE SE REALIZARA LA AUDITORIA
    //$("#divTextoSede").html(""+auditor[id][2]+"")
    $("#divTextoSede").html(ver.getAttribute("DescriptionSede"))
    $("#divTextoSede").html(ver.getAttribute("DescriptionSede"))
    // FECHA INICIO DE LA AUDITORIA
    //$("#divFechaInicioCA").html("<span><b>"+auditor[id][5]+"</b></span>")
    $("#divFechaInicioCA").html(ver.getAttribute("Inicio"))
    // FECHA FIN DE LA AUDITORIA
    //$("#divFechaFinCA").html("<span><b>"+auditor[id][6]+"</b></span>")
    $("#divFechaFinCA").html(ver.getAttribute("Fin"))
    //MOSTRAR NORMAS SELECCIONADAS
    let normasp = ver.getAttribute("Code_Normas")
    let nor = normasp.split(',')

    if(nor.length===2){
        $("#divNorma1CA").html('<div class="norma-ver-auditoriaCA pl-3 pt-2 mr-3">'+nor[0]+'</div>')
        $("#divNorma2CA").html('<div class="norma-ver-auditoriaCA pl-3 pt-2 mr-3">'+nor[1]+'</div>')
    }else{
        $("#divNorma1CA").html('<div class="norma-ver-auditoriaCA pl-3 pt-2 mr-3">'+nor[0]+'</div>')
        $("#divNorma2CA").html('')
    }



    /**
     * [tieneHistorial BANDERA PARA SABER SI LA AUDITORIA TIENE MODIFICACIONES O NO ]
     * @type {Boolean}
     */
    let tieneHistorial = false
    cambiosFechasp  = 0;
    auditoriaHistorialp = []
    auditoriaModificacionLogp.forEach((Item) => {
        if(Item.AuditoriaId==id_auditoriap){
            tieneHistorial = true;
            if(Item.TipoModificacionId==1){
                cambiosFechasp++
            }

            // LLEMANOS EL ARRAY CON LAS MODIFICACIONES DE LA AUDITORIA CONSULTADA
            auditoriaHistorialp.push(Item)
        }

    })
    console.warn("cambios de fechas"+cambiosFechasp)
    // OCULTAMOS O MOSTRAMOS EL LINK DE HISTORIAL DE CAMBIOS
    if(tieneHistorial){
        // MOSTRAMOS EL LINK PARA VER EL HISTORIAL DE CAMBIOS
        $("#divHistorialCambios").css("display", "block");
    }
    else{
        // OCULTAMOS EL LINK PARA VER EL HISTORIAL DE CAMBIOS
        $("#divHistorialCambios").css("display", "none");
    }


    //console.log("StatusId ",ver.getAttribute("StatusId"))
    //console.log("StatusEvaluacionId ",ver.getAttribute("StatusEvaluacionId"))
    /**
     * [verificamos si el estatusEvaluacion es 1 (observada)]
     */
    if(ver.getAttribute("StatusEvaluacionId")==1){
        $("#divObservaciones").css("display", "block");
        auditoriaObservacionp = ""
        var id = 0
        auditoriaObservacionpesLogp.forEach((Item) => {
            if(Item.AuditoriaId==id_auditoriap){
                if(Item.Id>id){
                    id = Item.id
                    auditoriaObservacionp = Item.Observacion
                }
            }
        })
        //console.warn(" auditoriaObservacionp",auditoriaObservacionp)
        $("#divDetalleObservacion").html("<span>"+auditoriaObservacionp+"</span>")

    }else $("#divObservaciones").css("display", "none");

    /**
     * verificamos el si el StatusId > 4 ||
     * tiene dos o mas cambios de fechas
     * para bloquedar el boton modificar
     * de la modal ver auditoria
     */
    if(ver.getAttribute("StatusId") >= 5){
        //console.log("bloquear boton modficar")
        $("#bt_modificar_auditoria").attr("disabled",true)
    }else $("#bt_modificar_auditoria").attr("disabled",false)

}

/**
 * [verHistorialAuditoriaIdp levantamos la modal del historial de una auditoría
 * consultamos a la DB dicho historial y lo mostramos en la modal]
 * @return {[type]} [description]
 */
function verHistorialAuditoriaIdp()
{
    console.log("historial "+id_auditoriap);
    // TITULO MODAL HISTORIAL AUDITORIA
    $("#divTituloHistorialAuditoria").html("<b>Ver historial de la Auditoría - "+codeAuditoriap+"</b>")
    // LEVANTAMOS MODAL HISTORIAL DE AUDITORIAS
    $('#historialAuditoriaModal').modal('show')
    // lIMPIAMOS EL DIV DONDE VA EL HISTORIAL
    $("#divDetalleHistorialAuditoria").html("")

    auditoriaHistorialp.forEach((Item) => {
        console.log("Item.DescripcionTipoModificacion "+Item.DescripcionTipoModificacion);
        $("#divDetalleHistorialAuditoria").append(
            '<div class="row mx-2 mt-2 row-table-modal align-items-center" style="height: 10vh;">'+
                '<div class="col-3">'+Item.DescripcionTipoModificacion+'</div>'+
                '<div class="col-3">'+moment(Item.Create_Date).format('DD/MM/YYYY')+'</div>'+
                '<div class="col-3">'+Item.Data_inicial+'</div>'+
                '<div class="col-3">'+Item.Data_Final+'</div>'+
            '</div>'
        )
    })

}



/**
 * AL HACER CLICK EN BOTON DE CREAR EN LA MODAL NUEVA AUDITORIA
 * [guardarAuditoriap VALIDAMOS QUE ESTEN TODOS LOS DATOS SOLICITADOS]
 * @return {[type]} [description]
 */
function guardarAuditoriap()
{

    //console.log($("#sel_new_unidad_organizativa").val())
    //console.log($("#sel_new_unidad_organizativa option:selected").text())
    var result            = false;
    unidad_auditoriap      = document.getElementById('sel_new_unidad_organizativa').value;
    unidad_auditoriap_text = $("#sel_new_unidad_organizativa option:selected").text()
    sede                  = document.getElementById('sel_new_sede').value;
    sede_text             = $("#sel_new_sede option:selected").text()
    tipo_auditoriap        = document.getElementById('sel_new_tipo_auditoriap').value;
    date_start            = document.getElementById('tx_date_start_new_auditoria').value;
    date_end              = document.getElementById('tx_date_end_new_auditoria').value;

    // let v1 = false // verificamos que la fecha de inicio sea mayor a la fecha actual
    // let v2 = false // verificamos que la fecha final sea mayor a la fecha actual
    // let v3 = false // verificamos que la fecha de inicio sea menos a la fecha final

    // v1 = validarFechaMenorActualp(date_start)
    // v2 = validarFechaMenorActualp(date_end)

    // if(date_start < date_end){
    //     v3 = true
    // }
    // if(!(v1 && v2)){
    //     swal("Error","Por favor Verifique las fechas, estas no pueden ser menor o igual a la fecha actual.","error")
    //     return
    // }
    // if(!v3){
    //     swal("Error","Por favor Verifique las fechas, La fecha Inicio si debe ser antes o menor a la Fecha Final.","error")
    //     return
    // }
    //result = true //forzando para que ingrese a guardar

    // VERIFICAMOS QUE SE HAYAN SELECIONADOS TODOS LOS DATOS
    //if( unidad_auditoriap != 0 && sede     != 0 && tipo_auditoriap!=0 &&
    //   date_start       != 0 && date_end != 0 && sel_new_normasp.length > 0 &&
    //   v1 && v2 && v3)

    //console.log("################### vamos a validar si por sede no existen mas de dos normas auditorias (xdia) por fecha");

    // console.log("sede ",sede)
    // console.log("sel_new_normasp ",sel_new_normasp)
    // console.log("sel_new_normasp ",sel_new_normasp.length)
    // console.log("date_start ",date_start)
    // console.log("date_end ",date_end)

    if(sel_new_normasp.length==2)
        normasTextp = sel_new_normasp[0]+','+sel_new_normasp[1]
    else
        normasTextp = sel_new_normasp[0]

    console.log("auditor",auditor)

    ///  vemos si hay en la misma sede
    let totalAuditorias = 0
    let normaIgual      = false

    if( unidad_auditoriap != 0 && sede != 0 && tipo_auditoriap != 0)
       result = true

    if(result)
    {
        var msj = "" ///mensaje de error en swal
        // AQUI RECORRO LAS AUDITORIAS REGISTRADAS
        for (i in auditor)
        {
            let rango = false
            //VALIDO SI LA FECHA ESTE EN EL RANGO DE FECHAS DE OTRA AUDITORIA
            rango = validarDentroRangoDeFechas(auditor[i].Inicio, auditor[i].Fin, date_start)

            // SI ES LA MISMA SEDE Y ESTA EN EL RANGO DE FECHAS
            // CONTAMOS LAS NORMAS REGISTRADAS


            if(auditor[i].SedeId==sede && rango)
            {
                //alert("contar normas de esta auditoria")
                console.log("auditor[i]",auditor[i])
                normasp = auditor[i].Code_Normas.split(',')
                totalAuditorias += normasp.length
                msj = "la auditoria "+auditor[i].Code+" de la sede "+auditor[i].DescriptionSede+" (Especialidad "+DescriptionEspecialidadp+")"
                //alert("total auditorias " + totalAuditorias)
                //aqui recorro las normasp que tiene la auditoria registrada
                for(j in normasp)
                {
                    for(h in sel_new_normasp)
                    {
                        if(normasp[j]==sel_new_normasp[h])
                        {
                            normaIgual = true
                            console.log("normasp["+j+"]" ,normasp[j])
                            //console.log("programa ")
                            msj = "La auditoría "+auditor[i].Code+" de la sede "+auditor[i].DescriptionSede+
                                 " (Especialidad "+DescriptionEspecialidadp+") ya tiene esta norma programada para ser auditada"
                        }
                    }
                }
            }
        }

        var fallo = 0;
        if(normaIgual)
        {
            swal("Error", msj, "error")
            //return
            fallo = 1
        }
        else
        {
            if(totalAuditorias>=2)
            {
                //swal("Error", "Ya hay registradas dos normas en esta fecha para esta sede.", "error")
                swal("Error", "Existen dos ( 2 ) normas programadas en "+msj+" en estas fechas", "error")
                //return
                fallo = 1
            }
            else
            {
                totalAuditorias += sel_new_normasp.length
                if(totalAuditorias > 2){
                    swal("Error", "Exite una ( 1 ) norma programada en "+msj+" en esta fechas, No puede auditar mas de dos normas en un mismo día.", "error")
                    //return
                    fallo = 1
                }
            }
        }

        //sede = SSOMA
        //normas = []//todas las normas que estan cargadas en el listado de auditorias
        //if(SI EXISTE UNA AUDITORIA PARA ESTAS NORMAS(norm1, norm2) en este rango(aditoria.fecha_ini, fecha_fin) )
        //idAuditoria cache no se ha creado
        //misNormas(2) Array
        //miFecha_ini
        //miFecha_fin
        //voy contra el listado que muestro en pantalla
        //fon de uno hasta n auditorias con estado != aprobada estado != creada estado = reprogramada
        // return
        if(fallo==0){
            $('#modalConfirmarIngresarAuditoria').modal('show').addClass("fade");
            $('#newAuditoriaModal').removeClass("fade").modal('hide');
        }
    }
    else
    {
        swal("Error","Por favor ingrese todos los datos","error")
    }

}

/**
 * AL HACER CLICK EN EL BOTON MODIFICAR EN LA MODAL VER AUDITORIA
 * [modalModificarAuditoriap description]
 * @return {[type]} [description]
 */
function modalModificarAuditoriap()
{
    $('#bt_cerrar_ver_auditoria').trigger('click');
    $('#modificarAuditoriapModal').modal('show')

    var ver = document.getElementById("btnVerAuditoria_"+id_auditoriap);

    // TITULO DE MODAL
    $("#titleModificarAuditoria").html("<b>Auditoria - "+ver.getAttribute('Code')+"</b>")
    //valor selecionado de la sede
    sede = ver.getAttribute('sedeid')

    // LLENAMOS EL SELECT DE UNIDADES ORGANIZATIVAS
    $("#sel_unidad_organizativa").html("<option value='' disabled>                </option>");
    for (i in jsonUnidadesOrganizativasp){
        /*if(jsonUnidadesOrganizativasp[i].Description==ver.getAttribute("CodeUnidadNegocio"))
            console.warn("selecionar este "+jsonUnidadesOrganizativasp[i].Description+" == "+ver.getAttribute("CodeUnidadNegocio"))//*/
        if(ver.getAttribute("CodeUnidadNegocio")===jsonUnidadesOrganizativasp[i]['Description']){
            $("#sel_unidad_organizativa").append(`<option selected description='${jsonUnidadesOrganizativasp[i].Description}' value='${jsonUnidadesOrganizativasp[i].Id}'>${jsonUnidadesOrganizativasp[i].Code}</option>`);
            //console.warn("Selecionar este1",jsonUnidadesOrganizativasp[i]['Description'])
            //getSelectSedePorIdUnidadNegociop(jsonUnidadesOrganizativasp[i].Id,'sel_sede')
            for(i in jsonSedesp){
                if(ver.getAttribute("CodeUnidadNegocio")==jsonSedesp[i].CodeUnidadNegocio){
                    $("#sel_sede").append(`<option description='`+jsonSedesp[i].Description+`' value='`+jsonSedesp[i].Id+`'>`+jsonSedesp[i].Code+`</option>`);
                }
            }
        }else
            $("#sel_unidad_organizativa").append(`<option value='${jsonUnidadesOrganizativasp[i].Id}'>${jsonUnidadesOrganizativasp[i].Code}</option>`);
    }

    // LLENAMOS EL SELECT DE TIPO DE AUDITORIA
    $("#sel_tipo_auditoriap").html("<option value='' disabled>                </option>")
    for (i in jsonTipoAuditoriap){
        if(jsonTipoAuditoriap[i].Id == ver.getAttribute("TipoId")){
            $("#sel_tipo_auditoriap").append("<option selected Code='"+jsonTipoAuditoriap[i].Code+"' value='"+jsonTipoAuditoriap[i].Id+"'>"+jsonTipoAuditoriap[i].Description+"</option>");
        }
        else
        {
            $("#sel_tipo_auditoriap").append("<option Code='"+jsonTipoAuditoriap[i].Code+"' value='"+jsonTipoAuditoriap[i].Id+"'>"+jsonTipoAuditoriap[i].Description+"</option>");
        }
    }

    // INICIALIZAMOS LA FECHA INICIO DE AUDITORIA
    //$("#tx_date_start_auditoria").val(ver.getAttribute("Inicio2"))
    // INICIALIZAMOS LA FECHA FIN DE AUDITORIA
   // $("#tx_date_end_auditoria").val(ver.getAttribute("Fin2"))
    //$("#tx_date_end_auditoria").val(moment().format())
    var now = moment().add(50, 'days').format('DD/MM/YYYY');
    var now = ver.getAttribute("Inicio2");
    var end = ver.getAttribute("Fin2");

    $("#tx_date_start_auditoria").val(now);
    $("#tx_date_start_auditoria").datetimepicker({
      timepicker:false,
      format:'d/m/Y',
      //defaultDate: now,
      minDate: new Date(moment().add(50, 'days').format('YYYY-MM-DD'))
    });
    $("#tx_date_end_auditoria").val(end);
    $("#tx_date_end_auditoria").datetimepicker({
      timepicker:false,
      format:'d/m/Y',
      //defaultDate: now,
      minDate: new Date(moment().add(50, 'days').format('YYYY-MM-DD'))
    });
    if(cambiosFechasp>=2){
        $("#tx_date_end_auditoria").attr("disabled", true);
        $("#tx_date_start_auditoria").attr("disabled", true);
        $("#divMaxCambiosDate").css("display", "block");
    }else{
        $("#tx_date_end_auditoria").attr("disabled", false);
        $("#tx_date_start_auditoria").attr("disabled", false);
        $("#divMaxCambiosDate").css("display", "none");
    }

    /*console.log("end ",end)
    console.log("now ",now)
    console.log('val(ver.getAttribute("Inicio2") ',ver.getAttribute("Inicio2"))
    //console.log('val(ver.getAttribute("Fin2") ',val(ver.getAttribute("Fin2")))//*/

    let normas = ver.getAttribute("Code_Normas")
    let nor = normas.split(',')
    $("#divCountNormasModificar").html(nor.length)
    // console.log("normas ",normas)
    // console.log("nor ",nor)
    // console.log("nor.length ",nor.length)
    // console.log("nor[0]",nor[0])
    // console.log("nor[1]",nor[1])
    if(nor.length===2){
        $("#divNorma1CA").html('<div class="norma-ver-auditoriaCA pl-3 pt-2 mr-3">'+nor[0]+'</div>')
        $("#divNorma2CA").html('<div class="norma-ver-auditoriaCA pl-3 pt-2 mr-3">'+nor[1]+'</div>')
    }else{
        $("#divNorma1CA").html('<div class="norma-ver-auditoriaCA pl-3 pt-2 mr-3">'+nor[0]+'</div>')
        $("#divNorma2CA").html('')
    }
    $("#sel_normas").html("");
    for (i in jsonNormasp){
        //if(ver.getAttribute("Norma1")===jsonNormasp[i]['Code'] || ver.getAttribute("Norma2")===jsonNormasp[i]['Code']){
        if(nor.length===2){

            if(nor[0]===jsonNormasp[i]['Code'] || nor[1]===jsonNormasp[i]['Code']){
                //$("#sel_normas").append(`<option disabled selected value='${jsonNormasp[i].Id}'>${jsonNormasp[i].Code}</option>`);
                $("#sel_normas").append(`<option disabled selected Code='${jsonNormasp[i].Code}' value='${jsonNormasp[i].Code}'>${jsonNormasp[i].Code}</option>`);
                //console.warn("Selecionar este",jsonNormasp[i]['Code'])
            }else
                //$("#sel_normas").append(`<option value='${jsonNormasp[i].Id}'>${jsonNormasp[i].Code}</option>`);
                $("#sel_normas").append(`<option disabled Code='${jsonNormasp[i].Code}' value='${jsonNormasp[i].Code}'>${jsonNormasp[i].Code}</option>`);
        }
        else
        {
            if(nor[0]===jsonNormasp[i]['Code']){
                //$("#sel_normas").append(`<option selected value='${jsonNormasp[i].Id}'>${jsonNormasp[i].Code}</option>`);
                $("#sel_normas").append(`<option disabled selected Code='${jsonNormasp[i].Code}' value='${jsonNormasp[i].Code}'>${jsonNormasp[i].Code}</option>`);
                //console.warn("Selecionar este",jsonNormasp[i]['Code'])
            }else
                //$("#sel_normas").append(`<option value='${jsonNormasp[i].Id}'>${jsonNormasp[i].Code}</option>`);
                $("#sel_normas").append(`<option disabled Code='${jsonNormasp[i].Code}' value='${jsonNormasp[i].Code}'>${jsonNormasp[i].Code}</option>`);
        }
    }//*/

    // MOSTRAMOS EL DETALLE DE LAS OBSERVACION
    $("#divDetalleObservacion2").html("<span style='color: #ff5050;'>"+auditoriaObservacionp+"</span>")

}

// AL HACER CLICK EN EL BOTON MODIFICAR DE LA MODAL MODIFICAR AUDITORIA
function modificarAuditoriap()
{
    var id = $("#idAuditoria").val()
    console.log("id",id_auditoriap)
    sel_normas = "";
    $("#sel_normas option:selected").each(function() {
        sel_normas = $("#sel_normas").val();
    });

    // VALIDAMOS EL FORMUALARIO
    var res = validarAuditoriap()
    //console.log("res",res)

    if(result)
    {
        // ABRIMOS MODAL CONFIRMAR CAMBIOS EN AUDITORIA
        $('#modalConfirmarCambiosAuditoria').modal('show')
        // CERRAMOS MODAL MODIFICAR AUDITORIA
        $('#modificarAuditoriapModal').modal('hide');
    }
    else{ swal("Error","Ingrese todos los datos","error") }

}//*/

// AL HACER CLICK EN EL BOTON CONFIRMAR EN LA MODAL DE
// CONFIRMAR MODIFICACIONES CORRECIONES DE LA AUDITORIA
function confirmarCambiosAuditoriap(){

    unidadNegocio     = document.getElementById('sel_unidad_organizativa').value;
    unidadNegocioText = $("#sel_unidad_organizativa option:selected").text()
    sede              = document.getElementById('sel_sede').value;
    sedeTextp          = $("#sel_sede option:selected").text()
    tipoAuditoria     = document.getElementById('sel_tipo_auditoriap').value;
    tipoAuditoriaText = $("#sel_tipo_auditoriap option:selected").text()
    fechaInicio       = document.getElementById('tx_date_start_auditoria').value;
    fechaFin          = document.getElementById('tx_date_end_auditoria').value;
    var ver = document.getElementById("btnVerAuditoria_"+id_auditoriap);
    Code              = ver.getAttribute("Code")
    Description         = ver.getAttribute("Description")
    StatusEvaluacionId  = ver.getAttribute("StatusEvaluacionId")
    Created_by          = ver.getAttribute("Created_by")

    normasTextp = ver.getAttribute("Code_Normas")
    console.log("normasTextp",normasTextp)
    console.log("Code",Code)

    //si es 1 (observada)
    if(EstatusEvaluacionIdp==1)
        EstatusEvaluacionIdp = 2 // lapasamos a correguida

    console.log("!*!*!*! EstatusEvaluacionIdp ",EstatusEvaluacionIdp)
    StatusId          = ver.getAttribute("StatusId")
    DescriptionStatusp = ver.getAttribute("DescriptionStatusp")

    // console.log("fechaInicio1 ",fechaInicio)
    // console.log("fechaFin2 ",fechaFin)
    // console.log(ver.getAttribute("Inicio2"))
    // console.log(ver.getAttribute("Fin2"))
    // console.log("fechaInicio ",fechaInicio)
    // console.log("fechaFin ",fechaFin)
    //return false;
    if(fechaInicio!=ver.getAttribute("Inicio2") || fechaFin != ver.getAttribute("Fin2")){

        DescriptionStatusp = "Reprogramada";
        StatusId          = 3;
    }

    fechaInicio = formatearFechaDBp(fechaInicio)
    fechaFin    = formatearFechaDBp(fechaFin)

    var Last_Updated_By   = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
    var Last_Updated_Date = moment().format();

    var servicio = "/api/Post-Auditoria-All?code="
    var postAuditoriaAll = "l/Ucgq69Kj8Yur7Se2RlCYtWga8XKfd8TuLSma8pYoGnsP/GqJO81g=="
 console.log(JSON.stringify({"Id":id_auditoriap,"Code":Code,"SedeId":sede,"TipoId":tipoAuditoria,"StatusId":StatusId,"Inicio":fechaInicio,
            "Fin":fechaFin,"Code_Normas":normasTextp,"Last_Updated_By":Last_Updated_By,"Last_Updated_Date":Last_Updated_Date,"ProgramaAuditoriaId":id_programa_auditoriap}))
    var settings = {
        "url": apiurlAuditoria+"/api/Post-Auditoria-All?code=l/Ucgq69Kj8Yur7Se2RlCYtWga8XKfd8TuLSma8pYoGnsP/GqJO81g==&httpmethod=put&Id="+id_auditoriap,
        "method": "POST",
        "timeout": 0,
        "crossDomain": true,
        "dataType": "json",
        "headers": {
            "apikey": "r$3#23516ewew5",
            "Content-Type": "application/json",
            //"Cookie": "ARRAffinity=a83b483df408e977188ac9dc47b9c62843a9cf2b4d80808e3feaaaabec8efe1d"
        },


        "data": JSON.stringify({"Id":id_auditoriap,"Code":Code,"Description":Description,"SedeId":sede,"TipoId":tipoAuditoria,"StatusId":StatusId,"Inicio":fechaInicio,
            "Fin":fechaFin,"Code_Normas":normasTextp,"Created_By":Created_by,"Last_Updated_By":Last_Updated_By,"Last_Updated_Date":Last_Updated_Date,
            "ProgramaAuditoriaId":id_programa_auditoriap,"StatusEvaluacionId":StatusEvaluacionId}),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);


        if(response.Code<0)
        {
            swal({
                title: "Error",
                text: response.Description,
                type: "error",
                timer:3000,
                showCancelButton: false,
                confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
                confirmButtonText: "De acuerdo",
                closeOnConfirm: false
              });
            // CERRAMOS MODAL CONFIRMAR INGRESO AUDITORIA
            $('#modalConfirmarCambiosAuditoria').modal('hide')
            // ABRIMOS MODAL DE REGISTRO DE AUDITORIA
            $('#modificarAuditoriapModal').modal('show');
            return
        }

        // CERRAMOS MODAL CONFIRMAR CAMBIOS AUDITORIA...
        $('#modalConfirmarCambiosAuditoria').modal('hide');
        // ABRIMOS MODAL EXITO EN REGISTRO DE AUDITORIA...
        $('#modalExitoCambiosAuditoria').modal('show');
        // RECARGAR EL DATATABLE DE AUDITORIAS...
        //vw_auditorias_list_plan.reloadtableBlackList()
        // Volvemos a listar la tabla con los divs
         //vw_auditorias_list_plan.tablaDivsAuditorias()
         vw_auditorias_list_plan.filtroTablaDivsAuditoriasp()

         //vw_auditorias_list_plan.init()
        // RECARGAR EL ARRAY QUE CONTINE LAS MODIFICAIONES DE LAS AUDITORIAS...
        vw_auditorias_list_plan.getAuditoriaModificacionLog()

    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
        //showNotification("Por favor Verifique los datos ingresados, su conexión a internet y vuelva a intentarlo.")
        swal("Error", "Por favor Verifique los datos ingresados, su conexión a internet y vuelva a intentarlo.","error")
        console.log(errorThrown)
    });//*/

}

// PRUEBA
var mensajeAlerta = function(){
   // alert("Asignar equipo")
}

// VALIDAMOS QUE ESTEN TODOS LOS DATOS
// ESTA FUNCION LA LLAMO EN LA function modificarAuditoriap()
var validarAuditoriap = function(){

    result                = false;
    // ALMACENAMOS LOS DATOS EN ESTAS VARIABLES
    unidad_auditoriap      = document.getElementById('sel_unidad_organizativa').value;
    unidad_auditoriap_text = $("#sel_unidad_organizativa option:selected").text()
    sede                  = document.getElementById('sel_sede').value;
    sede_text             = $("#sel_sede option:selected").text()
    tipo_auditoriap        = document.getElementById('sel_tipo_auditoriap').value;
    date_start            = document.getElementById('tx_date_start_auditoria').value;
    date_end              = document.getElementById('tx_date_end_auditoria').value;

    let v1 = false // verificamos que la fecha de inicio sea mayor a la fecha actual
    let v2 = false // verificamos que la fecha final sea mayor a la fecha actual
    let v3 = false // verificamos que la fecha de inicio sea menos a la fecha final

    //v1 = validarFechaMenorActualp(date_start)
    //v2 = validarFechaMenorActualp(date_end)

    /*if(date_start < date_end){
        v3 = true
    }
    if(!(v1 && v2)){
        swal("Error!", "Por favor Verifique las fechas, estas no pueden ser menor o igual a la fecha actual.", "error")
        //showNotification("Por favor Verifique las fechas, estas no pueden ser menor o igual a la fecha actual.")
        return false;
    }
    if(!v3){
        swal("Error!", "Por favor Verifique las fechas, La fecha inicio no puede ser antes de la final fin", "error")
        //showNotification("Por favor Verifique las fechas, La fecha inicio no puede ser antes de la final fin")
        return false;
    }//*/


    //Verificamos que esten selecionados todos los datos necesarios
    if( unidad_auditoriap != 0 && sede     != 0 && tipo_auditoriap    != 0 &&
        date_start       != 0 && date_end != 0 ) //&& sel_normas.length >  0
       result = true
   //console.log("result",result)
   // RETORNAMOS LOS DATOS A LA FUNCION modificarAuditoriap
   return result

}

/**
 * AL HACER CLICK EN GUARDAR AUDITORIA EN LA MODAL DE CONFIRMAR NUEVA AUDITORIA
 * [setRegistrarAuditoriaDBp Guardar una nueva auditoria en la DB]
 */
function setRegistrarAuditoriaDBp()
{
    //alert("registrar auditoria en la db")
    //console.log("cont_auditoriasp "+cont_auditoriasp)
    unidadNegocio     = document.getElementById('sel_new_unidad_organizativa').value;
    unidadNegocioText = $("#sel_new_unidad_organizativa option:selected").text()
    sede              = document.getElementById('sel_new_sede').value;
    sedeTextp          = $("#sel_new_sede option:selected").text()
    tipoAuditoria     = document.getElementById('sel_new_tipo_auditoriap').value;
    tipoAuditoriaText = $("#sel_new_tipo_auditoriap option:selected").text()
    fechaInicio       = document.getElementById('tx_date_start_new_auditoria').value;
    fechaFin          = document.getElementById('tx_date_end_new_auditoria').value;

    fechaInicio = formatearFechaDBp(fechaInicio)
    fechaFin    = formatearFechaDBp(fechaFin)


    if(sel_new_normasp.length==2)
        normasTextp = sel_new_normasp[0]+','+sel_new_normasp[1]
    else
        normasTextp = sel_new_normasp[0]

    //normasTextp = normasCodep
    //normasTextp = sel_new_normasp[0]

    codeAuditoriap = crearCodeAuditoriap(sel_new_normasp[0], sedeTextp)
    var created_by = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);

    /*console.log("normasTextp", normasTextp)
    console.log("codeAuditoriap", codeAuditoriap)
    console.log("created_by", created_by)//*/


    $("#idNewAuditoriaModalExito").html(codeAuditoriap)
    var body ={ //  ****************  parametros a base de datos AUDITORIA*****************
          //Id:1, // id de la auditoria
          Description: nombre_programa_auditoriap
          ,Code: codeAuditoriap
          ,SedeId: sede
          ,CodeSede: sedeDescriptionp
          ,DescriptionSede: sedeTextp
          ,TipoId: tipoAuditoria
          ,DescriptionAuditoria: tipoAuditoriaText
          ,UnidadNegocioId: unidadNegocio
          ,DescriptionUnidadNegocio: unidadNegocioText
          ,StatusId: 1
          ,DescriptionStatusp: 'Creada'
          ,Inicio: fechaInicio
          ,Fin: fechaFin
          ,Code_Normas: normasTextp
          ,Created_By: created_by
          ,Created_Date: moment().format()
          ,Last_Updated_By: created_by
          ,ProgramaAuditoriaId: id_programa_auditoriap
          ,StatusEvaluacionId: 0
          //,DescriptionStatuspEvaluacion: '---'
    }

    var metodoAjax = "POST";
    var servicio   = "/api/Post-Auditoria-All?code=";
    var clave      = "l/Ucgq69Kj8Yur7Se2RlCYtWga8XKfd8TuLSma8pYoGnsP/GqJO81g==";
    var url = apiurlAuditoria+servicio+clave+"&httpmethod=post";
    var headers ={
        "apikey":constantes.apiKey,
        "Content-Type": "application/json",

    }
    $.ajax({
        method: "POST",
        url:  url,
        data: JSON.stringify(body),
        headers:headers,
        crossDomain: true,
        dataType: "json",
    })
    .done(function(data)
    {
        console.log("data", data)
        if(data.Id == '-1')
        {
            swal({
                title: "Error",
                text: data.Description, //'No se pudo registrar la auditoria, Verifique las fechas y la norma(s).',
                type: "info",
                //timer:3000,
                showCancelButton: false,
                confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
                confirmButtonText: "De acuerdo",
                closeOnConfirm: true
              });
            // CERRAMOS MODAL CONFIRMAR INGRESO AUDITORIA
            $('#modalConfirmarIngresarAuditoria').removeClass("fade").modal('hide')
            // ABRIMOS MODAL DE REGISTRO DE AUDITORIA
            $('#newAuditoriaModal').modal('show').addClass("fade");

        }
        else
        {
            // CERRAMOS MODAL CONFIRMAR INGRESO AUDITORIA
            $('#modalConfirmarIngresarAuditoria').removeClass("fade").modal('hide')
            // ABRIMOS MODAL EXITO EN REGISTRO DE AUDITORIA
            $('#modalExitoIngresarAuditoria').modal('show').addClass("fade");
            //vw_auditorias_list_plan.tablaDivsAuditorias();
            primeraCargap=1;
            vw_auditorias_list_plan.filtroTablaDivsAuditorias();
            //$("#formNewAuditoria").reset()
        }

    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
        swal({
            title: "Error",
            text:'No se pudo registrar la auditoria, Por favor Verifique su conexión a internet y vuelva a intentarlo.',
            type: "error",
            timer:3000,
            showCancelButton: false,
            confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
            confirmButtonText: "De acuerdo",
            closeOnConfirm: false
        });

    });//*/

}

/**
 * [crearCodeAuditoriap creamos el codigo de identificacion de la auditoria]
 * @return {[string]} [Code auditoria]
 */
function crearCodeAuditoriap(norma, sede)
{
    cant = cont_auditoriasp;
    if(cant>0 && cant<10){
        cant++
        cant = '000'+cant
    }
    if(cant>9&&cant<100){
        cant++
        cant = '00'+cant
    }
    if(cant>99&&cant<1000){
        cant++
        cant = '0'+cant
    }
    if(cant>999){
        cant++
        cant = ''+cant
    }
    if(cant==0){
        cant='0001'
    }
    var year = moment().format("YY");
    code = ''+norma+sedeDescriptionp+cant+year;

    return code
}

/**
 * [formatearFecha formateamos una fecha de DD-MM-YYYY
 * a YYYY/MM/DD
 * @param  {[date]} fecha [en DD/MM/YYYY]
 * @return {[date]}       [en YYYY-MM-DD]
 */
var formatearFechaDBp = function(fecha){
    console.log("fechaR",fecha)
    //descomponer la fecha en año, mes y dia (p[2] año, p[1] mes, p[0] dia)
    var p = fecha.split("/")
    fecha = p[2]+"-"+p[1]+"-"+p[0]
    return fecha
}

var formatearFechaVista = function(fecha){
    var p = fecha.split("-")
    fecha = p[2]+"/"+p[1]+"/"+p[0]
    return fecha
}

/**
 * [validarFechaMenorActualp validamos que la fecha introducida no sea menor a la fecha actual]
 * @param  {[date]} date [fecha introducida]
 * @return {[boolean]}      [true si es mayor, false si es menor]
 */
var validarFechaMenorActualp = function(date){
      var x=new Date();
      var fecha = date.split("/");
      x.setFullYear(fecha[2],fecha[1]-1,fecha[0]);
      var today = new Date();

      if (x <= today)
        return false;
      else
        return true;
}

/**
 * [ver si una fecha esta dentro de un rago de fechas]
 * @param  {[type]} fi [fecha de inicio obtenida de la base de datos]
 * @param  {[type]} ff [fecha finas obtenida de la base de datos]
 * @param  {[type]} fc [fecha a consultar obtenida del imput text datepickert]
 * @return {[type]}    [description]
 */
var validarDentroRangoDeFechas = function(fi, ff, fc){

    let result = false
    let parts           = fc.split("/");
    //let fechaConsulta   = new Date(parts[2], parts[1] - 1, parts[0]);
    let fechaConsulta   = parts[2]+parts[1]-1+parts[0];

    let year        = moment(fi).format('YYYY');//dddd
    let month       = moment(fi).format('MM');//
    let day         = moment(fi).format('DD'); ;
    //let fechaInicio = new Date(year, month-1, day);
    let fechaInicio = year+month-1+day;

    year         = moment(ff).format('YYYY');//dddd
    month        = moment(ff).format('MM');//
    day          = moment(ff).format('DD'); ;
    //let fechaFin = new Date(year, month-1, day);
    let fechaFin = year+month-1+day;

    if(fechaInicio<=fechaConsulta && fechaConsulta<=fechaFin){
        result = true
    }

    return result
}

/**
 * [filtroTablaHistFec description]
 * @param  {[type]} idAudxx [description]
 * @return {[type]}         [description]
 */
var filtroTablaHistFec = function(idAudxx)
{
    //alert(objcPlanAuditoria[idAudxx].PlanId);
    var idp = objcPlanAuditoria[idAudxx].PlanId;
    //showLoading();

    //OBTENGO ID AUDITORIA Y ID PLAN
    idAuditoria = $('#idAuditoria').val();

    var url         =  apiurlAuditoria+"/api/Get-Plan_Auditoria_Log-All?code=D64Wsaxe6Wxm0muSEKyAoUggY7Jv0oru2nyub4JHzji7fJsCYDhgrg==&httpmethod=objectlist&PlanAuditoriaId="+idp;
    var headers     =
    {
        "apikey":constantes.apiKey
    }

    $.ajax({
        method: 'GET',
        url:  url,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function (response) {

        var html = '';
        $('#divDetalleHistorialFecha').html(" ");

        response.forEach((Item)=>
        {
            var now = moment(Item.Created_Date).format('DD/MM/YYYY HH:ss');
            html+=`
                <div class="row mx-2 mt-2 mb-2 row-table-modal align-items-center">
                    <div class="col-3 text-left">${now}</div>
                    <div class="col-3 text-left">${Item.Data_Inicial}</div>
                    <div class="col-3 text-left">${Item.Data_Final}</div>
                    <div class="col-3 text-left"><textarea class='txtAreaLista'  readonly>${Item.Motivo}</textarea></div>
                </div>`
        })

        // pinta el html
        //var html = templateListAuditorias(response);
        $('#divDetalleHistorialFecha').html(html);

    })

}

// bloqueamos o desbloquemos el boton finalizar
var fnVerificarProgramacion = function(idAud)
{
    if(objcPlanAuditoria[idAud].Programacion.length > 0)
    {
        //desbloqueamos el boton finalizar
        $("#btn-finalizar-plan").attr("disabled", false);
        $("#btn-finalizar-plan").css("background-color", "#34559c");
        $("#lbBtCerrar").css("background-color","#34559c") //
    }
    else
    {
        //bloqueamos el boton finalizar
        $("#btn-finalizar-plan").attr("disabled", true);
        $("#btn-finalizar-plan").css("background-color", "#858585");
        $("#lbBtCerrar").css("background-color","#858585") //
    }
}

/**
 * [ventanaPlanAuditoria mostrar los datos para el plan de una auditoria]
 * @param  {[type]} idAud [Id del la auditoria]
 * @param  {[type]} imv   [description]
 * @return {[type]}       [description]
 */
function ventanaPlanAuditoria(idAud,imv)
{
    //----------------------recibe el id ------------------------
    slProcess = " ";
    slProcess2 = " ";

    $("#dropdown1").css('display', 'block')
    $("#dropdown2").css('display', 'none')

    istAud           = idAud;
    var navListItems = $('div.setup-panel div a button'); // tab nav items
    navListItems.removeClass('btn-primary-check').addClass('btn-default');
    $('#btn_step1').addClass('btn-primary-check');//   $('#btn_step1').addClass('btn-primary-check');//$("#btn_step1").attr("href", "#step-1");

    var allWells = $('.setup-content'); // content div
    step1        = $('#step-1');
    allWells.hide(); // hide all contents by defauld
    step1.show();


    //observamos si podemos desplegar la ventana
    if(bloqueVentaPlanDg == 1)
    {
        //1) ---------------------------- limpiamos el formulario-----------------------------
        LimpiarVentanaPlanAuditoria();


        if(objAuditoria[istAud].Flag_Finalizado_Plan == 0)
        {
            //mejor vamos a bloquear el boton  alert("bloqueado (btn_step3)");
            $("#btn_step3").attr("disabled", true);
        }
        else
        {
            $("#btn_step3").attr("disabled", false);
        }

        $('#sel_procesoPlan').change(function (idAud)
        {
           cambiaProcesoPlan(idAud)
        });


        cargaProcesosCargoNuevo(idAud, nNormas)


        var xc = objAuditoria[idAud].Code_Normas.split(",");
        var xc1 = objAuditoria[idAud].Id_Normas.split(",");
        //alert("la norma "+xc[0]+"="+xc1[0])//norma 1
        //alert("la norma "+xc[1]+"="+xc1[1])//norma 1

        Anormas[parseInt(+xc1[0])] = xc[0];
        Anormas[parseInt(+xc1[1])] = xc[1];


        // console.warn("objAuditoria[idAud].Id_Normas.length -> ",objAuditoria[idAud].Id_Normas.length)
        // console.warn("xc1.length -> ",xc1.length)
        //if(objAuditoria[idAud].Id_Normas.length == 1)
        if(xc1.length == 1)
        {
            $("#btn-basic").addClass("btn-prog active2");
            $("#btn-basic").css("visibility", "visible");


            $("#btn-17002").removeClass("btn-prog active2");
            $("#btn-17002").css("visibility", "hidden");
        }
        else
        {


            $("#btn-basic").addClass("btn-prog active2");
            $("#btn-basic").css("visibility", "visible");


            $("#btn-17002").removeClass("btn-prog active2");
            $("#btn-17002").css("visibility", "visible");

        }

        // console.log("################################ventanaPlanAuditoria(",idAud,")################################## ");

        // console.log(objAuditoria[idAud]);
        // console.log("################################____________________(",idAud,")################################## ");

        filtroTablaHistFec(idAud)//llamado tt



        if(objcPlanAuditoria[idAud].BDtarea =='0')
        {
            //vamos a ------------------------------------------------------------------------------- insertar------------ini
            $("#txtHeadModalRegisterAuditor").html('Plan de Auditoría '+objAuditoria[idAud].Code)// titulo de la ventana

            $("#txt_sede_plan").val(objAuditoria[idAud].DescriptionSede);
            $("#txt_fechaInicio").val(date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(objAuditoria[idAud].Inicio))
           // alert("FE = "+objAuditoria[idAud].Fin)
            $("#txt_fechaFin").val(date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(objAuditoria[idAud].Fin));
           // alert("FE = "+objAuditoria[idAud].Inicio)
            $("#txt_fechaInicioEj").val(date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(objAuditoria[idAud].Inicio))
            $("#txt_fechaFinEj").val(date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(objAuditoria[idAud].Fin))

            //es nuevo le colocamos la fecha actual
            if(objAuditoria[idAud].PlanId == 0)
            {
                var now = moment().format('DD/MM/YYYY'); $("#txt_fechaIniPlan").val(now)}

                $("#CambiarFecha").attr("disabled", true);//desactivo el boton
                $("#btn-historial-auditor").attr("disabled", true);//desactivo el boton ver historial de ejecucion
                // y se le coloca a la fecha de ejecucion los datos de la fecha de inicio y fin de la auditoria
                $("#txt_fechaInicioEj").val($("#txt_fechaInicio").val())
                $("#txt_fechaFinEj").val($("#txt_fechaFin").val())

                //ahora vamos a buscar el equipo auditor
                cargarAuditoresPlanNew(idAud);

                //ahora vamos a buscar la Programación
                cargarDataTabProgramacionPlan(idAud)

            }
            else
            {
                //vamos a ------------------------------------------------------------------------------- modificar------------ini

                // console.log("##################______________####################______UPDATE_____________#####################______________________###################");
                // console.log("objAuditoria", objAuditoria[idAud])
                // console.log("##################______________####################______UPDATE___________#####################______________________###################");

                // document.getElementById("listadoResultado").style.visibility = "visible";//aqui no se muestran los resultados
                // document.getElementById("contieneResumenAud").style.visibility = "visible";

                //alert("es un registro ya guardado");
                $("#txtHeadModalRegisterAuditor").html('Plan de Auditoría '+objAuditoria[idAud].Code)// titulo de la ventana
                $("#txt_sede_plan").val(objAuditoria[idAud].DescriptionSede);
                $("#txt_fechaInicio").val(date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(objAuditoria[idAud].Inicio_Plan))
                $("#txt_fechaFin").val(date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(objAuditoria[idAud].Fin_Plan));
                $("#txt_fechaInicioEj").val(date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(objAuditoria[idAud].Inicio))
                $("#txt_fechaFinEj").val(date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(objAuditoria[idAud].Fin))
                $("#txt_fechaIniPlan").val(date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(objcPlanAuditoria[idAud].Fecha_Creacion_Plan))

                //if( $("#txt_objetivo_plan").attr('readonly', true);)

                $("#txt_objetivo_plan").val(objcPlanAuditoria[idAud].Detalle);
                $("#txt_alcance_plan").val(objcPlanAuditoria[idAud].Alcance);

                cargarAuditoresPlanNew(idAud);
                //$("#CambiarFecha").disabled = false;
                $("#CambiarFecha").attr("disabled", false);//activo el boton modificar fecha plan
                $("#btn-historial-auditor").attr("disabled", false);//activo el boton ver historial de ejecucion

                //objAuditoria[Item.Id].Auditores.html2;
                $("#resumen-auditoria").val(objcPlanAuditoria[idAud].Resumen_Auditoria); //this.Resumen_Auditoria =


                if(objcPlanAuditoria[idAud])
                {
                     //alert('si tiene programacion cargada, puede finalizar');
                     $("#btn-finalizar-plan").css("visibility", "visible");
                     //$("#btn-finalizar-plan").css("visibility", "hidden");
                    dibujarRacimosProgramacionResultados();
                }
                else
                {
                    //alert('no tiene programacion cargada aun, no puede finlizar');
                     $("#btn-finalizar-plan").css("visibility", "hidden");
                }

            }

            // $('#newPlanAuditoriaModal').modal('show').addClass('fade');
            //verModalError("Ver Plan de Auditoria","Los datos del Programa estan Incompletos <b>( "+objAuditoria[idAud].Code+" )</b>");
    }
    else
    {
        //-----------------------------------------NO SE PUEDE MOSTRAR ESTA CARGANDO AUN INFORMACIÓN --------------------
        swal("info", "Espere un momento e intente nuevamente, estamos cargando los datos necesarios.", "error")
    }



    //desactivo solo puede ver style="visibility: hidden;"
    if((imv == 3)&&(parseInt(objAuditoria[idAud].Flag_Finalizado_Plan)) == 1)
    {

        fnMostrarVentanaModificarFinalizadoEstadoBloqueado(3)
        $("#txt_objetivo_plan").val(objcPlanAuditoria[idAud].Detalle);
        $("#txt_alcance_plan").val(objcPlanAuditoria[idAud].Alcance);
        $("#btnGenerarInforme").css("visibility", "hidden");

        $("#resumen-auditoria").css('height','312px');
        $("#btn-guardar-plan").css("visibility", "visible");

    }
    else
    {
        //activo todo en la ventana
        if((imv == 8)&&(parseInt(objAuditoria[idAud].Flag_Finalizado_Plan)) == 1)
        {
            //$("#tituloVisorPdf").html('Ver Informe de Auditoría '+objAuditoria[idAud].Code);
            //alert('Ejecutada y permite edicion + boton ');
            $("#lbTitleVerPdfx").html('Ver Informe de Auditoría '+objAuditoria[idAud].Code);
            fnMostrarVentanaModificarFinalizadoEstadoBloqueado(8);

            $("#btnGenerarInforme").css("visibility", "visible");
            $("#btn-guardar-plan").css("visibility", "visible");
            $("#txt_objetivo_plan").val(objcPlanAuditoria[idAud].Detalle);
            $("#txt_alcance_plan").val(objcPlanAuditoria[idAud].Alcance);
            $("#lbGenerarInforme").html("Generar Informe");

            $('#btnMuestraVentanaAdj').css('visibility', 'visible');
            $('#btnEnviarInforme').css('visibility', 'visible');

            fnSp3ActivaInterfazInformeAuditoria(idAud)

        }
        else
        {
            if((imv == 9)&&(parseInt(objAuditoria[idAud].Flag_Finalizado_Plan)) == 1)
            {
                $("#lbTitleVerPdfx").html('Ver Informe de Auditoría '+objAuditoria[idAud].Code);
                fnMostrarVentanaModificarFinalizadoEstadoBloqueado(8);
                //$('#divOcultaContListaResultados').css("visibility","hidden")//para que pueda ver los hallazgos

                $("#btnGenerarInforme").css("visibility", "visible");
                //$("#btnGenerarInforme").html("MostrarInforme");

                $("#btn-guardar-plan").css("visibility", "hidden");

                $("#txt_objetivo_plan").val(objcPlanAuditoria[idAud].Detalle);
                $("#txt_alcance_plan").val(objcPlanAuditoria[idAud].Alcance);

                fnSp3ActivaInterfazInformeAuditoria(idAud)

                $('#btnMuestraVentanaAdj').css('visibility', 'hidden');
                $('#btnEnviarInforme').css('visibility', 'hidden');

                $("#lbGenerarInforme").html("Ver Informe");
            }
            else
            {
                $("#CambiarFecha").css("visibility", "visible");
                $("#btn-guardar-plan").css("visibility", "visible");
                $("#btn-finalizar-plan").css("visibility", "visible");
                // fnMostrarVentanaModificarFinalizadoEstadoDesbloqueado()
                $("#btnGenerarInforme").css("visibility", "hidden");
                //alert('quien');
            }

        }

    }

    $('#lista_procesos_1').trigger('click')
    $('#lista_procesos_2').trigger('click')

    //cargo mis variables globales de fecha de inicio y fin
    Inix = $('#txt_fechaInicioEj').val()
    Finx = $('#txt_fechaFinEj').val()


    // verificamos si tiene programacion
    fnVerificarProgramacion(idAud)

    $("#contieneNotaAud").show()

    //alert(objAuditoria[idAud].Nota + ' - ' + indice + ' - ' + semaforo[indice])
    let msj = ObtenerSemaforizacionPlanAuditoria (objAuditoria[idAud].Nota)
    // alert(msj + ' - ' + objAuditoria[idAud].Nota)
    // SI NOTA VIENE CON -1 ES PORQUE NO SE LE A GUARDADO VALOR.
    if( objAuditoria[idAud].Nota === -1 )
    {
        msj = ""
    }

    if( objAuditoria[idAud].StatusId === 9 )
    {
        $("#labelNotaAud").hide()
        $("#notaAud").hide()
        $("#labelPorcNotaAud").hide()
        $("#semaforoInputNotaAud").hide()
        $("#semaforoNotaAud").show()
        $("#semaforoNotaAud").html(`<span class="mr-3">Nota: ${objAuditoria[idAud].Nota} %</span> ${msj} `)
    }
    else
    {
        $("#semaforoNotaAud").hide()
        $("#notaAud").show()
        $("#labelPorcNotaAud").show()
        if(objAuditoria[idAud].Nota >= 0){
            $("#notaAud").show().val(objAuditoria[idAud].Nota)
        }
        $("#labelNotaAud").show()
        $("#semaforoInputNotaAud").html(` ${msj} `).show()
    }

    // MOSTRAMOS MODAL
    $('#newPlanAuditoriaModal').modal('show').addClass('fade');


}


let ObtenerSemaforizacionPlanAuditoria = function(Nota)
{
    let semaforo = [
        '<span style="color: #58c25d">Conforme con la norma<span>'
        ,'<span style="color: #ffbc11">No conformidad Menor</span>'
        ,'<span style="color: #ff6767">No conformidad Crítica</span>'
    ]

    let indice = 0

    //indice = (objAuditoria[idAud].Nota >= 95)
    indice = (Nota >= 95)
        ? 0
        : (Nota <= 94 && Nota >= 86 )
            ? 1
            : 2

    return semaforo[indice]

}





/**
 * [fnMostrarVentanaModificarFinalizadoEstadoBloqueado description]
 * @param  {[type]} esttus [description]
 * @return {[type]}        [description]
 */
function fnMostrarVentanaModificarFinalizadoEstadoBloqueado(esttus)
{
    //--------------------------------------------------------- ini -----------------------------------------------------------
    //ini_#######################   formulario general de ver Auditoria   ###############//#endregion
    //modificar el titulo de la Ventana
    $("#txtHeadModalRegisterAuditor").html('Ver Plan de Auditoría '+objAuditoria[istAud].Code)

    //boton modificar -- pendiente del evento
    $("#lbBtnGuardar").html("Modificar"); //Guardar

    //boton cerrar-- antiguo finalizar
    $("#lbBtCerrar").html("Cerrar");  //$("#lbBtnGuardar").html("Finalizar")
    $("#lbBtCerrar").css("background-color","transparent") //


    //#######################  pestaña Datos Principales #############################
    //objetivo
    $("#txt_objetivo_plan").css("background-color", "#efefef");
    $("#txt_objetivo_plan").attr('readonly', true);
    $("#div_txt_objetivo_plan").css("background-color", "#efefef");

    //alcance
    $("#txt_alcance_plan").css("background-color", "#efefef");
    $("#txt_alcance_plan").attr('readonly', true);
    $("#div_txt_alcance_plan").css("background-color", "#efefef")

    //lugar esta inhabilitado por defecto
    //fecha esta inhabilitado por defecto
    //ejecucion  esta inhabilitado por defecto
    //elaboracion  esta inhabilitado por defecto

    //boton cambio fechas
    $("#CambiarFecha").disabled = true;
    $("#CambiarFecha").css("visibility", "visible")
    //lo llevamos a su estado Natural
    $("#CambiarFecha").removeClass("bg-green-lime-modal");
    $("#CambiarFecha").removeClass("btn_confirmar_modal");
    $("#CambiarFecha").addClass("btn_cerrar_modal");
    $("#CambiarFecha").css("color","#565933")//
    $("#CambiarFecha").css("background","#efefef")
    $("#CambiarFecha").attr("disabled", true);//desactivo el boton

    //boton ver histrorial
    $("#btn-historial-auditor").removeAttr("disabled");
    $("#btn-finalizar-plan").css("background-color","transparent")
    $("#btn-historial-auditor").css("color","#ffffff")//
    $("#btn-historial-auditor").css("background","#34559c").css('font-weight','normal')
    $("#btn-historial-auditor").attr("disabled", true);//desactivo el boton

    //#######################  pestaña Datos Principales #############################_end
    //ini_###################  pestaña Programación #################################
    // alert('er estatus es = '+esttus)

   if(esttus == 3)
   {

        $('#Norma1').attr("disabled", true);
        //select procesos2
        $('#Norma2').attr("disabled", true);

        //requisitos proceso1-for
        //$('#divOcultaContListaProgramacion').css("visibility","visible")
        sp3FndivOcultaContListaProgramacion('hidden');
        //alert("ssssssssssssssssssssxxxxxxxxxxxxxxxxxx");
    }
    else
    {
        if(esttus == 8)
        {

            $('#Norma1').attr("disabled", true);
            //select procesos2
            $('#Norma2').attr("disabled", true);

            //requisitos proceso1-for
            //$('#divOcultaContListaProgramacion').css("visibility","visible")//estado natural
            sp3FndivOcultaContListaProgramacion('hidden');

            //alert("ssssssssssssssssssssxxxxxxxxxxxxxxxxxx888");

        }
        else
        {
            if(esttus == 9)
            {
                // alert('------------------------------------------');
                $('#Norma1').attr("disabled", true);
                //select procesos2
                $('#Norma2').attr("disabled", true);
                $("#divNormax").addClass('ocultaDivSp3');
                $("#tablaBuscador").removeClass('ocultaDivSp3');//para mostrar
                //sp3FndivOcultaContListaProgramacion('hidden');
                //alert("ssssssssssssssssssssxxxxxxxxxxxxxxxxxx888");

            }
        }
    }

    // //#######################  pestaña Programación #############################_end
    //ini_###################  pestaña Resultados #################################
    document.getElementById("listadoResultado").style.visibility = "visible"; //falta
    $('#divOcultaContListaResultados').css("visibility","visible")//visibleResult
    sp3FndivOcultaContListaProgramacion('hideResult');//o sea bloquear los botones
    $("#resumen-auditoria").attr('readonly', true);
    //#######################  pestaña Resultados #############################_end

}
//--------------------------------------------------------- fin -----------------------------------------------------------






function fnMostrarVentanaModificarFinalizadoEstadoDesbloqueado()
{
    //--------------------------------------------------------- ini -----------------------------------------------------------
    //ini_#######################   formulario general de ver Auditoria   ###############//#endregion

    //modificar el titulo de la Ventana
    //$("#txtHeadModalRegisterAuditor").html('Ver Plan de Auditoría '+objAuditoria[istAud].Code)
    // alert('quien me llama');
    //boton modificar -- pendiente del evento
         $("#btn-guardar-plan").css("width","126px");
         $("#lbBtnGuardar").css("width","126px");

         $("#btn-guardar-plan").css("background","#FFFFFF");
         $("#lbBtnGuardar").css("background","#FFFFFF");

         $("#lbBtnGuardar").html("Guardar Cambios");

         $("#lbBtnGuardar").css("background","#d2d97b");//.css("background","#FFFFFF");
         $("#btn-guardar-plan").css("background","#d2d97b");






                 //boton cerrar-- antiguo finalizar
                $("#lbBtCerrar").html("Cancelar");  //$("#lbBtnGuardar").html("Finalizar")
                $("#lbBtCerrar").css("background-color","transparent") //


      //#######################  pestaña Datos Principales #############################

          //objetivo
          $("#txt_objetivo_plan").css("background-color", "#ffffff");
          $("#txt_objetivo_plan").attr('readonly', false);
          $("#div_txt_objetivo_plan").css("background-color", "#ffffff");



          //alcance
          $("#txt_alcance_plan").css("background-color", "#ffffff");
          $("#txt_alcance_plan").attr('readonly', false);
          $("#div_txt_alcance_plan").css("background-color", "#ffffff")

          //lugar esta inhabilitado por defecto
          //fecha esta inhabilitado por defecto
          //ejecucion  esta inhabilitado por defecto
          //elaboracion  esta inhabilitado por defecto


          //boton cambio fechas
          //$("#CambiarFecha").disabled = false;
          $("#CambiarFecha").css("visibility", "visible")



          if(objAuditoria[istAud].StatusId == 8)
             {
                $("#txt_objetivo_plan").css("background-color", "#efefef");
                $("#txt_objetivo_plan").attr('readonly', true);
                $("#div_txt_objetivo_plan").css("background-color", "#efefef");


                //alcance
                $("#txt_alcance_plan").css("background-color", "#efefef");
                $("#txt_alcance_plan").attr('readonly', true);
                $("#div_txt_alcance_plan").css("background-color", "#efefef")
                $("#CambiarFecha").css("visibility", "hidden")
             }




                //lo llevamos a su estado Natural
                if(objAuditoria[istAud].StatusId!=6){


                    $("#CambiarFecha").removeClass("bg-green-lime-modal"); //addClass
                    $("#CambiarFecha").removeClass("btn_confirmar_modal");//addClass
                    $("#CambiarFecha").addClass("btn_cerrar_modal"); //removeClass
                    $("#CambiarFecha").css("color","#565933")//
                    $("#CambiarFecha").css("background","#c5cf55")
                    $("#CambiarFecha").attr("disabled", false);//desactivo el boton
                   // alert('aaaaaaaaaaaaaaaaa en ejecucion');
                }
          //boton ver histrorial
                $("#btn-historial-auditor").removeAttr("disabled");
                //$("#btn-finalizar-plan").css("background-color","#34559c")
                $("#btn-historial-auditor").css("color","#ffffff")//
                $("#btn-historial-auditor").css("background","#34559c").css('font-weight','normal')
                $("#btn-historial-auditor").attr("disabled", false);//desactivo el boton

      //#######################  pestaña Datos Principales #############################_end


         //tablaBuscador



    //ini_###################  pestaña Programación #################################

    if(objAuditoria[istAud].StatusId != 8)
    {
        //alert('objAuditoria[istAud].StatusId != 8')
        console.log('aqui si se puede editar el plan de auditoría y los hallazgos');
        //$('#Norma1').attr("disabled", false);
        //select procesos2
            //$('#Norma2').attr("disabled", false);

        //requisitos proceso1-for
        //$('#divOcultaContListaProgramacion').css("visibility","hidden")
        sp3FndivOcultaContListaProgramacion('visible');

        //vamos a bloquear los campos de auditor y fecha de los requisitos de los procesos seleccioandos
        fnBloquearRequisitosPlanFinalizado();
        //fbDesbloquearPlanFinalizado()

        $("#divNormax").addClass('ocultaDivSp3');//oculto las normas y muestro el buscador
        $("#tablaBuscador").removeClass('ocultaDivSp3');//para mostrar

    }
    else
    {
        console.log('aqui NO se puede editar el plan de auditoría, SI los hallazgos');
    }



    //#######################  pestaña Programación #############################_end

    console.warn("objAuditoria[istAud].StatusId => ",objAuditoria[istAud].StatusId)
    if(objAuditoria[istAud].StatusId !== 9) //|| objAuditoria[istAud].StatusId == 9
    {
        // alert("es 8")
        $("#notaAud").removeAttr('disabled')
    }



     //ini_###################  pestaña Resultados #################################
       document.getElementById("listadoResultado").style.visibility = "hidden"; //falta
       $('#divOcultaContListaResultados').css("visibility","hidden")//
       sp3FndivOcultaContListaProgramacion('visibleResult');//o sea vamos a permitir la edicion
       $("#resumen-auditoria").attr('readonly', false);
     //#######################  pestaña Resultados #############################_end



}//--------------------------------------------------------- fin -----------------------------------------------------------





function fnBloquearRequisitosPlanFinalizado()
{
    //console.clear();
    //alert("Estamos aqui")
    var t = objAuditoria[istAud].Procesos.length;
    for(var ji =0; ji<t; ji++)
    {
        if(objAuditoria[istAud].Procesos[ji].Selected > 0)
        {
            console.log("ji="+ji, objAuditoria[istAud].Procesos[ji])

            var m = objAuditoria[istAud].Procesos[ji].Requisitos.length;
            for(u =0; u<m; u++)
            {
                var req = objAuditoria[istAud].Procesos[ji].Requisitos[u];
                var i = u;
                var idl =  req.UnidadNegocioProcesoId;
                var pId = req.ProcesoId
                var now = moment().format('YYYY-MM-DD');

                var px = pId
                var id1 = "txt-proceso_"+px+"_"+i  //proceso
                var id2 =  "txt-capitulo_"+px+"_"+i
                var id3 =  "txt-requisitos_"+px+"_"+i
                var id4 =  "sel-auditores_"+px+"_"+idl
                var id5 =  "txt_date_prog_"+px+"_"+idl
                var id6 =  "txt-hora-inicio_"+px+"_"+idl
                var id7 =  "txt-hora-fin_"+px+"_"+idl
                //resultados
                var id8 =  "sel-tipo_"+px+"_"+idl
                var id9 =  "btn-hallazgo_"+px+"_"+idl
                var id10 =  "txt_hden_hallazgo_"+px+"_"+idl

                $("#"+id1).attr('disabled',true)
                $("#"+id2).attr('disabled',true)
                $("#"+id3).attr('disabled',true)
                $("#"+id4).attr('disabled',true)

                $("#"+id5).attr('disabled',true)
                $("#"+id5).css('pointer-events','none')//.css('background-color','red')
                $("#"+'imgCal_'+id5).css('visibility','hidden')



                $("#Norma1").attr('disabled',true)
                $("#Norma2").attr('disabled',true)


            }
        }
    }

}

function fnDesBloquearRequisitosPlanFinalizado()
{
    //console.clear();
   // alert("Estamos aqui")
    var t = objAuditoria[istAud].Procesos.length;
    for(var ji =0; ji<t; ji++)
    {
        if(objAuditoria[istAud].Procesos[ji].Selected > 0)
        {
            console.log("ji="+ji, objAuditoria[istAud].Procesos[ji])

            var m = objAuditoria[istAud].Procesos[ji].Requisitos.length;
            for(u =0; u<m; u++)
            {
                var req = objAuditoria[istAud].Procesos[ji].Requisitos[u];
                var i = u;
                var idl =  req.UnidadNegocioProcesoId;
                var pId = req.ProcesoId
                var now = moment().format('YYYY-MM-DD');

                var px = pId
                var id1 = "txt-proceso_"+px+"_"+i  //proceso
                var id2 =  "txt-capitulo_"+px+"_"+i
                var id3 =  "txt-requisitos_"+px+"_"+i
                var id4 =  "sel-auditores_"+px+"_"+idl
                var id5 =  "txt_date_prog_"+px+"_"+idl
                var id6 =  "txt-hora-inicio_"+px+"_"+idl
                var id7 =  "txt-hora-fin_"+px+"_"+idl
                //resultados
                var id8 =  "sel-tipo_"+px+"_"+idl
                var id9 =  "btn-hallazgo_"+px+"_"+idl
                var id10 =  "txt_hden_hallazgo_"+px+"_"+idl

                $("#"+id1).attr('disabled',false)
                $("#"+id2).attr('disabled',false)
                $("#"+id3).attr('disabled',false)
                $("#"+id4).attr('disabled',false)
                $("#"+id5).attr('disabled',false)
                $("#"+id6).attr('disabled',false)
                $("#"+id7).attr('disabled',false)
                $("#Norma1").attr('disabled',false)
                $("#Norma2").attr('disabled',false)


            }
        }
    }

}



















/**
 * [dibujarRacimosProgramacionResultados pintar los racimos para la programacion del plan]
 * @return {[type]} [description]
 */
function dibujarRacimosProgramacionResultados()
{
    //alert("en dibujar todo")

    var normas = objAuditoria[istAud].Code_Normas.split(",")
    var idN    = objAuditoria[istAud].Id_Normas.split(",")

    console.log("id normas",idN)

    $("#btn-basic").html(normas[0]);
    $("#btn-17002").html(normas[1]);

    var data = objAuditoria[istAud].Procesos;
    var n    = data.length;

    //$('#btn-17002').trigger('click');
    //$("#proceso1_"+data[i].Id).trigger('click');
    for(i=0; i<n; i++)
    {

        // console.log("i: "+i)

        if(data[i].Selected == 1 &&  data[i].NormaId == parseInt(idN[0]) )
        {
            // console.log("selecetd",data[i])
            var divReq = fn_cargaRequisitosProcesoMillan(data[i],data[i].Id)
            var divRes = fn_cargaRequisitosProcesoMillanRes(data[i],data[i].Id)
            // $("#proceso1_"+data[i].Id).attr('checked');
            //$("#proceso1_"+data[i].Id).trigger('click');
            let idd = "proceso1_"+data[i].Id;
            document.getElementById(idd).checked = true;

            $("#racimo_"+data[i].NormaId+"_"+data[i].Id).append(divReq)
            $("#racimoRes_"+data[i].NormaId+"_"+data[i].Id).append(divRes)

            for(j in data[i].Requisitos)
            {

                let idd = "sel-auditores_"+data[i].Requisitos[j].ProcesoId+"_"+data[i].Requisitos[j].UnidadNegocioProcesoId;
                //document.getElementById(idd).selected = true;
                //$("#"+idd+" option[value='"+data[i].Requisitos[j].AuditorId+"']").attr("selected", true);
                document.getElementById(idd).value = data[i].Requisitos[j].AuditorId;

                //cargamos los auditores las fechas de inicio de verificación de los requisitos
                let idd1 = "txt_date_prog_"+data[i].Requisitos[j].ProcesoId+"_"+data[i].Requisitos[j].UnidadNegocioProcesoId;
                document.getElementById(idd1).value = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(data[i].Requisitos[j].Inicio);

                //cargamos  la hora inicio
                let idd2 = "txt-hora-inicio_"+data[i].Requisitos[j].ProcesoId+"_"+data[i].Requisitos[j].UnidadNegocioProcesoId;
                document.getElementById(idd2).value = data[i].Requisitos[j].Hora_Inicio;

                // cargamos  de fin
                let idd3= "txt-hora-fin_"+data[i].Requisitos[j].ProcesoId+"_"+data[i].Requisitos[j].UnidadNegocioProcesoId;
                document.getElementById(idd3).value = data[i].Requisitos[j].Hora_Fin;

                // cargamos  de inicio
                let idd4= "sel-tipo_"+data[i].Requisitos[j].ProcesoId+"_"+data[i].Requisitos[j].UnidadNegocioProcesoId;
                document.getElementById(idd4).value = parseInt(data[i].Requisitos[j].TipoHallazgoId);

                //alert(data[i].Requisitos[j].Code_Hallazgo);
                //CARGAMOS EL HALLAZGO

                let idd5= "txt_hden_hallazgo_"+data[i].Requisitos[j].ProcesoId+"_"+data[i].Requisitos[j].UnidadNegocioProcesoId;
                document.getElementById(idd5).value = data[i].Requisitos[j].Hallazgo;

            }//sel-auditores_6_122
        }
        else if(data[i].Selected == 1 &&  data[i].NormaId == parseInt(idN[1]) )
        {
            //console.log("selecetd2 ",data[i])
            var divReq = fn_cargaRequisitosProcesoMillan(data[i],data[i].Id)
            var divRes = fn_cargaRequisitosProcesoMillanRes(data[i],data[i].Id)
            //$("#proceso1_"+data[i].Id).trigger('click');

            let idd = "proceso2_"+data[i].Id;
            document.getElementById(idd).checked = true;

            $("#racimo_"+data[i].NormaId+"_"+data[i].Id).append(divReq)
            $("#racimoRes_"+data[i].NormaId+"_"+data[i].Id).append(divRes)
            //$("#proceso2_"+data[i].Id).trigger('click');
            for(j in data[i].Requisitos)
            {
                let idd = "sel-auditores_"+data[i].Requisitos[j].ProcesoId+"_"+data[i].Requisitos[j].UnidadNegocioProcesoId;
                //document.getElementById(idd).selected = true;
                //$("#"+idd+" option[value='"+data[i].Requisitos[j].AuditorId+"']").attr("selected", true);
                document.getElementById(idd).value = data[i].Requisitos[j].AuditorId;
                //cargamos los auditores las fechas de inicio de verificación de los requisitos
                let idd1x = "txt_date_prog_"+data[i].Requisitos[j].ProcesoId+"_"+data[i].Requisitos[j].UnidadNegocioProcesoId;
                document.getElementById(idd1x).value = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(data[i].Requisitos[j].Inicio);

                //cargamos  la hora inicio
                let idd2x = "txt-hora-inicio_"+data[i].Requisitos[j].ProcesoId+"_"+data[i].Requisitos[j].UnidadNegocioProcesoId;
                document.getElementById(idd2x).value = data[i].Requisitos[j].Hora_Inicio;

                // cargamos  de fin
                let idd3x= "txt-hora-fin_"+data[i].Requisitos[j].ProcesoId+"_"+data[i].Requisitos[j].UnidadNegocioProcesoId;
                document.getElementById(idd3x).value = data[i].Requisitos[j].Hora_Fin;

                // cargamos  de inicio
                let idd4x= "sel-tipo_"+data[i].Requisitos[j].ProcesoId+"_"+data[i].Requisitos[j].UnidadNegocioProcesoId;

                if(data[i].Requisitos[j].TipoHallazgoId == null)
                {
                    document.getElementById(idd4x).value=0;
                }
                else
                {
                    document.getElementById(idd4x).value = parseInt(data[i].Requisitos[j].TipoHallazgoId);
                }

                // alert(document.getElementById(idd4x).value);
                //alert(data[i].Requisitos[j].Code_Hallazgo);
                //CARGAMOS EL HALLAZGO

                let idd5x= "txt_hden_hallazgo_"+data[i].Requisitos[j].ProcesoId+"_"+data[i].Requisitos[j].UnidadNegocioProcesoId;
                document.getElementById(idd5x).value = data[i].Requisitos[j].Hallazgo;


            }
        }//*/

    }
    //console.error("selected",data[i].Selected)
}



/**
 * [LimpiarVentanaPlanAuditoria reiniciar datos de la modal del plan de auditoria]
 */
function LimpiarVentanaPlanAuditoria()
{
    //Guardar
    $("#lbBtnGuardar").html("Guardar");

    $('#Norma1').attr("disabled", false);
    $('#Norma2').attr("disabled", false);

    //$("#lbBtnGuardar").html("Finalizar")
    $("#lbBtCerrar").html("Finalizar");

    $("#lbBtCerrar").css("background-color","#34559C") //
    $("#btn-finalizar-plan").css("background-color","#34559C")

    //$("#lbBtnGuardar").html("Finalizar")
    $("#lbBtCerrar").html("Finalizar");

    $("#lbBtCerrar").css("background-color","#34559C") //
    $("#btn-finalizar-plan").css("background-color","#34559C")

    //$("#CambiarFecha").css("background-color","#efefef")
    //$("#CambiarFecha").css("color","#565933")
    //limpia titulo de la ventana
    $("#txtHeadModalRegisterAuditor").html('Plan de Auditoría');
    //limpiamos los objetivos y alcance del plan
    $("#txt_objetivo_plan").html('');
    $("#txt_alcance_plan").html('');
    //limpiamos el alcance
    $("#txt_sede_plan").val("");          $("#txt_sede_plan").attr('readonly', true);
    $("#txt_fechaInicio").val("");        $("#txt_fechaInicio").attr('readonly', true);
    $("#txt_fechaFin").val("");           $("#txt_fechaFin").attr('readonly', true);
    $("#txt_fechaIniPlan").val("");       $("#txt_sede_plan").attr('readonly', true);

    $("#listAuditorPrincipal").html('');
    $("#listObservadorPrincipal").html('');
    $("#divContListaProgramacion").html('');
    $("#divContListaProgramacion2").html('');
    $("#divContListaResultado").html('');
    $("#btn_step1").attr("href", "#step-1");
    //$("#btn-basic").addClass("btn-prog active2");
    //$("#btn-17002").addClass("btn-formAuditor btn-prog");
    $('#btn-17002').removeClass('active2');
    $('#btn-basic').addClass('active2');


    $("#txt_objetivo_plan").css("background-color", "#ffffff");
    $("#txt_objetivo_plan").attr('readonly', false);
    $("#div_txt_objetivo_plan").css("background-color", "#ffffff");

    $("#txt_alcance_plan").css("background-color", "#ffffff");
    $("#txt_alcance_plan").attr('readonly', false);
    $("#div_txt_alcance_plan").css("background-color", "#ffffff")

    $("#txt_objetivo_plan").val(' ');
    $("#txt_alcance_plan").val(' ');

    //-------------------------SPRINT3-----------------------
    document.getElementById('divContenedorContadorHallazgosInforme').style.display = 'none';
    document.getElementById('contieneResumenAud').style.height = '350px';//
    document.getElementById('divContieneAdjuntos').style.height = '300px';
    $("#divContieneAdjuntos").html(" ");
    ilo = 0;

    $("#divNormax").removeClass('ocultaDivSp3');//oculto las normas y muestro el buscador
    $("#tablaBuscador").addClass('ocultaDivSp3');//para mostrar
    $("#sel_filter_normaadx").html('');
    $("#sel_filter_proceso").html('');
    $("#sp3_txt_auditor_filtro").val(' ');

    $("#btn-guardar-hallazgo").addClass('d-none')
    $("#textarea-hallazgo").attr('disabled', 'disabled');

    $("#notaAud").attr('disabled', 'disabled')

}

 var getPersonPDF = function (obj,i) {
        obj.autocomplete({
            change: function (event, ui)
            {
               // alert('entra');
                //alert('Hola');
                console.log( $("#hid_collaborator_id_"+i).val())
                if (ui.item === null &&  $("#hid_Name_id_1"+i).length>20)
                {

                     $("#hid_collaborator_id_"+i).val("");
                     $(this).val("");
                     $("#add_covid_lastname_"+i).val("");
                }
                else if(ui.item)
                {

                    $("#Name_"+i).val(ui.item.firstname).trigger("change");
                    $("#add_covid_lastname_"+i).val(ui.item.lastname).trigger("change");
                    // $("#add_covid_lastname_"+i).focus();
                    // document.getElementById("add_covid_lastname_"+i).focus();
                    //  document.getElementById("add_covid_lastname_"+i).focus();
                }

            },

            source: function( request, response )
            {
                var urlx = apiurlsecurity+"/api/Get-Collaborator?code="+GetCollaborator+"&httpmethod=objectlist";
                //console.log("tony",urlx);
                var filter = obj.val();
                ///console.log(filter);
                var param= {filter:filter};
                var headers = {"Authorization":TOKEN_CLIENT,"apiKey":"r$3#23516ewew5"}
                $("#add_firtnameload_1").show();
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
                        $("#add_firtnameload_1").hide();
                        var array =[];
                        data =  JSON.parse(data);
                        //console.log("tony",data);

                        data.value.forEach(item =>
                        {
                            var json ={}
                            json.label      = item.displayName;
                            json.value      = item.givenName;
                            json.id         = item.objectId;
                            json.cargo      = item.jobTitle;
                            json.firstname  = item.displayName;//item.givenName+' '+item.surname;
                            json.correo     = item.userPrincipalName;
                            array.push(json);
                        });
                        response(array);

                    }
                });
            },
            minLength: 3,
            select: function( event, ui )
            { //alert(ui.item.id)
                $("#hid_Name_id_"+i).val(ui.item.id);
                $("#Cargo_"+i).val(ui.item.cargo);
                $("#hid_Cargo_"+i).val(ui.item.cargo);
                $("#Correo_"+i).val(ui.item.correo);
                $("#hid_Correo_"+i).val(ui.item.correo);

                //$("#add_covid_dni_"+i).trigger("focusout");
                //console.log(ui.item.label)
                setTimeout(function(){
                    // alert(ui.item.firstname)
                    // alert(ui.item.cargo)//correo
                    // alert(ui.item.correo)

                    $("#Name_"+i).val(ui.item.firstname);
                    //$("#Cargo_"+i).val(ui.item.jobTitle);
                    //$("#txt_correo_"+i).val(ui.item.userPrincipalName);
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
    }

    var getPersonPlan = function (obj,i) {
        obj.autocomplete({
            change: function (event, ui)
            {
               // alert('entra');
                //alert('Hola');
                console.log( $("#hid_collaborator_id_"+i).val())
                if (ui.item === null &&  $("#hid_Name_id_1"+i).length>20)
                {

                     $("#hid_collaborator_id_"+i).val("");
                     $(this).val("");
                     $("#add_covid_lastname_"+i).val("");
                }
                else if(ui.item)
                {

                    $("#NamePlan_"+i).val(ui.item.firstname).trigger("change");
                    $("#add_covid_lastname_"+i).val(ui.item.lastname).trigger("change");
                    // $("#add_covid_lastname_"+i).focus();
                    // document.getElementById("add_covid_lastname_"+i).focus();
                    //  document.getElementById("add_covid_lastname_"+i).focus();
                }

            },

            source: function( request, response )
            {
                var urlx = apiurlsecurity+"/api/Get-Collaborator?code="+GetCollaborator+"&httpmethod=objectlist";
                //console.log("tony",urlx);
                var filter = obj.val();
                ///console.log(filter);
                var param= {filter:filter};
                var headers = {"Authorization":TOKEN_CLIENT,"apiKey":"r$3#23516ewew5"}
                $("#add_firtnameload_1").show();
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
                        $("#add_firtnameload_1").hide();
                        var array =[];
                        data =  JSON.parse(data);
                        //console.log("tony",data);

                        data.value.forEach(item =>
                        {
                            var json ={}
                            json.label      = item.displayName;
                            json.value      = item.givenName;
                            json.id         = item.objectId;
                            json.cargo      = item.jobTitle;
                            json.firstname  = item.displayName;//item.givenName+' '+item.surname;
                            json.correo     = item.userPrincipalName;
                            array.push(json);
                        });
                        response(array);

                    }
                });
            },
            minLength: 3,
            select: function( event, ui )
            { //alert(ui.item.id)
                $("#hid_NamePlan_id_"+i).val(ui.item.id);
                $("#CargoPlan_"+i).val(ui.item.cargo);
                $("#hid_Cargo_"+i).val(ui.item.cargo);
                $("#CorreoPlan_"+i).val(ui.item.correo);
                $("#hid_Correo_"+i).val(ui.item.correo);

                //$("#add_covid_dni_"+i).trigger("focusout");
                //console.log(ui.item.label)
                setTimeout(function(){
                    // alert(ui.item.firstname)
                    // alert(ui.item.cargo)//correo
                    // alert(ui.item.correo)

                    $("#NamePlan_"+i).val(toCapitalize(ui.item.firstname));
                    //$("#Cargo_"+i).val(ui.item.jobTitle);
                    //$("#txt_correo_"+i).val(ui.item.userPrincipalName);
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
    }

function ventanaEnviarPlan(idAud,idPlan,numListado){


   // alert('here');
    //enviarPlanPDF(istAud)




    $("#tbody_trainning").html('');
    $('#idPlan').val(idPlan);
    $("#plan-auditoriaModalEnviar").html(objAuditoria[idAud].Code);
    vw_principal.init();
    if(numListado>0){
        var i = 0;
        var apiKeyx = "r$3#23516ewew5";
        var servicio = '/api/Get-Lista_Envio-All?code=/tXqtxILOwK4/jC0SYBAFaOFChIVn4aOshoJIiL9G7ApLKCUC5RQqA==';
        var metodoHttp = "objectlist";
        var metodoAjax =  "GET";
        var url2 = apiurlAuditoria+servicio+"&httpmethod="+metodoHttp+"&PlanAuditoriaId="+idPlan;
        var headers ={
            "apikey":apiKeyx
        }

        $.ajax({
            method: metodoAjax,
            url:  url2,
            headers:headers,
            crossDomain: true,
            dataType: "json",
        }).done(function( data)
        { console.log(data)

            data.map(function(item){

                $("#tbody_trainning").append("<div class='item-tabla p-2 px-2' style='font-size: 13px; background-color:white !important;border: solid 1px #cbcbcb !important;'>"+
                "                         <div class='row m-0 justify-content-between align-items-center tbody_trainning'>"+
                "                         <div class='col-3 text-left form-group'>"+
                "                           <label for='Name_"+i+"'></label>"+
                "                           <input type='hidden' id='contadorrow' value='"+i+"'></label>"+
                "                           <input type='hidden' name='idAuditor_' id='idAuditor_'>"+
                "                           <input type='hidden' name='Create_By'>"+
                "                           <input type='text' id='NamePlan_"+i+"' name='Name' value='"+item.Persona_Name+"' class='form-control form-control2 bg-white fechasA autocompletecollaborator'>"+
                "                           <div class='loader' id='add_firtnameload_1"+i+"' style='display:none'></div>"+
                "                           <input type='hidden' class='form-control' id='hid_NamePlan_id_"+i+"' value='"+item.UserIdHash+"' name='hid_NamePlan_id_"+i+"'></div>"+
                "                         <div class='col-3 text-left form-group'>"+
                "                           <input type='text' id='CargoPlan_"+i+"' name='cargo' value='"+item.Persona_Cargo+"' aria-describedby='sizing-addon2' class='form-control form-control2 fechasA bg-white' readonly>"+
                "                           <input type='hidden' class='form-control' id='hid_Cargo_"+i+"' value='"+item.Persona_Cargo+"' name='hid_Cargo_"+i+"'></div>"+
                "                         <div class='col-3 text-left form-group'>"+
                "                           <input type='text' id='CorreoPlan_"+i+"'  name='txt_correo_"+i+"' value='"+item.Persona_Correo+"' class='form-control form-control2 bg-white'></div>"+
                "                         <div class='col-3 text-right'>" +
                "                            <button type='button' _Id='"+item.Id+"' class='delete btn-circle btn-register border-0' style='background-color: #ff6767'>"+
                "                            <img src='./images/iconos/Pathcan.svg' class='edit-1'></button>" +
                "                         </div></div></div>"
                );
               i= i +1;
            }) ////


        }).always(function( jqXHR, textStatus, errorThrown ) {
            var total = "";
            if(i<10) total = "0"+i
            else total = i
            //$('#rowcount').val(rowCount);
            $('#variable').html(total);
            rowEnviarPlan = i;
        });

    }

        enviarPlanPDF(idAud);


     $('#modalEnviar').modal('show').addClass('fade');
}


// confirmar GUARDADO ENVIO plan auditoria
function confirmarguardarenviar ()
{
    var datos = [];
    var personas  = [];
    var idPlan= $('#idPlan').val();

    var Create_By= getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
    var rowCount = $('#tbody_trainning .item-tabla').length;
    rowCount = rowEnviarPlan;


    for (var i = 0; i <= rowEnviarPlan; i++)
    {
        console.log("i: ",i," hid: ",$('#hid_NamePlan_id_'+i).val())
        if($('#hid_NamePlan_id_'+i).val() != "" && $('#hid_NamePlan_id_'+i).val() != undefined ) //|| $('#hid_Name_id_'+i).val() == null || $('#hid_Name_id_'+i).val() == undefined
        {
            var name = $('#NamePlan_'+i).val();
            var cargo = $('#CargoPlan_'+i).val();
            var correo = $('#CorreoPlan_'+i).val();
            var id = $('#hid_NamePlan_id_'+i).val();

            personas.push({
                'Created_By':             Create_By,
                'UserIdHash':              id,
                'Persona_Name':           name,
                'Persona_Cargo':          cargo,
                'Persona_Correo':         correo,
                'PlanAuditoriaId':        idPlan

            });
        }

    }

    datos.push({
        "Pdf": "Prueba Archivo PDF en base64 para el envio del correoXXX",
        "PlanPdf": base64SP3,
        "CodeNormas":CODENORMA,
        "CargoAuditorLider": Cargo_AuditorL,
        "NombreAuditorLider": Name_AuditorL,
        "TipoAuditoria": TIPOAUDITORIA_L,
        "SedeAuditoria": Sede_L,
        "FechaInicioE": FECHA_I,
        "FechaFinE": FECHA_F,
        "CorreoAuditorLider": getCookie("vtas_internal_useruser"+sessionStorage.tabVisitasa),
        "Personas": personas
    })
    console.log("----------------------- ******DB******* -----------------",datos)
    fnEnviarPlan(idPlan,name,cargo,correo,id,datos);

}



function fnEnviarPlan(idPlan,name,cargo,correo,id,datos)
{
    //alert('aaaaaaaaaaa');
    //console.log(JSON.stringify(datos[0]));
    //console.log("LO QUE VA AL SERVIDOR",JSON.stringify(datos[0]));



    var created_by              = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
    // var lo= [
    //     datos[1]
    // ]
    showLoading();
    // alert(Object.values(datos));

    var url =  apiurlAuditoria+'/api/Post-Lista_Envio-All?code=27NBV2iB2M130igerkn/Qha8zbtPaKCDIMDbSLyk/sgzFzIoncY3wQ==&httpmethod=post'
                              //api/Post-Lista_Envio-All?code=27NBV2iB2M130igerkn/Qha8zbtPaKCDIMDbSLyk/sgzFzIoncY3wQ==&httpmethod=post
    var headers ={
        "apikey":constantes.apiKey,
        "Content-Type": "application/json",
    }
    $.ajax({
        method: "POST",
        url:  url,
        data: (JSON.stringify(datos[0])),
        headers:headers,
        crossDomain: true,
        dataType: "json",
    })
    .done(function(data)
    {
        console.log(data)
        $("#btn-confirmar-guardar-enviar").html("<b>Confirmar</b>")
        $("#btn-confirmar-guardar-enviar").addClass("btn_confirmar_modal bg-green-lime-modal confirm btn-confirmar-guardar-plan btn-blue")
        //$("#btn-confirmar-guardar-enviar").attr("disabled",false);

        $("#modalShowAlertConfirmEnviar").modal("hide").removeClass("fade");
        $("#modalShowAlertConfirmEnviarOk").modal("show").addClass("fade");
        reiniciarValiblesGlobales();
        vw_auditorias_list_plan.filtroTablaDivsAuditoriasp();
        $('#btn-confirmar-guardar-enviar').attr("disabled",false);
        hideLoading();

    })
    .fail(function( jqXHR, textStatus, errorThrown ) {

        verModalError('Enviar Plan de Auditoría', 'Falló el registro, Recargue la página e intenete de nuevo!');

        $('#btn-confirmar-guardar-enviar').attr("disabled",false);
        $("#btn-confirmar-guardar-enviar").html("<b>Confirmar</b>")
        $("#btn-confirmar-guardar-enviar").addClass("btn_confirmar_modal bg-green-lime-modal confirm btn-confirmar-guardar-plan btn-blue")
        hideLoading();

    });
}





function ventanaSuspenderPlan(idAud,val,Description_Motivo){
    //----------------------recibe el id ------------------------
    // 1) ---------------------------- limpiamos el formulario-----------------------------
   // LimpiarVentanaPlanAuditoria();

   //ESTO SE PUEDE DAR EN CUALQUIER MOMENTO Y EN CUALQUIER ESTADO INICIAL ( Asignada, En Atención, Por Ejecutar, Ejecución y Ejecutada.)


     $('#modalSuspenderPlan').modal('show').addClass('fade');


    // ENTRA EN EL CONDICIONAL SI SE HACE EL LLAMADO EN "VER"
    if (val == true) {
        $("#txt_susp").prop('disabled', true).css('background-color','#efefef').val(Description_Motivo);
        //$('#txt_susp').val(Description_Motivo);
        $(".hide-btn").hide();
        $("#btn-cancelar-susp-plan").html('De Acuerdo').addClass('col-12');
        $(".titulo-suspendida").html('Auditoría Suspendida - '+objAuditoria[idAud].Code);
        $("#red-head").addClass('header-suspendido');

    }
    // ENTRA EN EL CONDICIONAL SI SE HACE EL LLAMADO EN "SUSPENDER"
    else if(val == false){
        $("#txt_susp").prop('disabled', false).css('background-color','white').val('');
        $(".hide-btn").show();
        $("#btn-cancelar-susp-plan").html('Cancelar');
        $(".titulo-suspendida").html('Suspender Auditoría - '+objAuditoria[idAud].Code);
        $("#red-head").removeClass('header-suspendido');

        $('#btn-confirmar-guardar-susp').click(function () {
            //$("#modalConfirmSuspenderPlan").removeClass("fade").modal("hide");
            //$("#modalConfirmSuspenderPlanOk").addClass("fade").modal("show");

            $("#btn-confirmar-guardar-susp").html("<b>Suspendiendo....</b>")
            $("#btn-confirmar-guardar-susp").addClass("btn_confirmar_modal bg-green-lime-modal confirm btn-confirmar-guardar-plan btn-blue")
            $("#btn-confirmar-guardar-susp").attr("disabled",true);


            var txt_susp = $.trim($("#txt_susp").val());
            fnGuardarSuspPlanAuditoria(idAud,txt_susp);
        });


    }


}

function ventanaVerPlan(idAud){
    //----------------------recibe el id ------------------------
    // 1) ---------------------------- limpiamos el formulario-----------------------------
   // LimpiarVentanaPlanAuditoria();

    $('#modalVerPlan').modal('show').addClass('fade');
    $("#id_audit_tittle").html(idAud)// titulo de la ventana

    // veo la auditoria suspendida (disabled)
    $('#txt_susp').attr('disabled', true);

}


function sp3FnVentanaResumen()
{//-----  ini   --------------------------------------      sp3FnVentanaResumen()    ----------------------------------


    if(($("#lbBtnGuardar").html()=="Guardar Cambios")||($("#lbBtnGuardar").html()=="Guardar"))//el boton dice Modificar, debemos desbloquearlo
       {
        $("#divTituloHistorialAuditoriaxResumen").html('Resumen de la Auditoría   -  '+objAuditoria[istAud].Code)
            $("#modalHallazgoResumen").modal("show").addClass("fade");
            $("#textarea-hallazgoResumen").val("");
            var ress = $("#resumen-auditoria").val();
            $("#textarea-hallazgoResumen").val(ress);
            document.getElementById('textarea-hallazgoResumen').focus()
       }


}//-----  ini   --------------------------------------      sp3FnVentanaResumen()    ----------------------------------


function cargaCambioResumen()
{//-----  ini   --------------------------------------      cargaCambioResumen()    ----------------------------------

    var ress = $("#textarea-hallazgoResumen").val();
    $("#resumen-auditoria").val(ress);

}//-----  ini   --------------------------------------      cargaCambioResumen()    ----------------------------------










function date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(fechaBD)
{

    var startDate   = moment(fechaBD).format('DD/MM/YYYY');//dddd
    var year        = moment(fechaBD).format('YYYY');//dddd
    var month       = moment(fechaBD).format('MM');//
    var day         = moment(fechaBD).format('DD');
    //var startDate2   = year +"/"+ month +"/"+ day;
    var startDate2   = day+"/"+month+"/"+year

    return startDate2;
}

/**
 * [cargarAuditoresPlanNew cargar listado de auditores]
 * @param  {[type]} Idcx [description]
 * @return {[type]}      [description]
 */
function cargarAuditoresPlanNew(Idcx)
{
    //---------------------------------------------------------------ini---cargarAuditoresPlanNew---------------------------------------------------------

    var nAud  = objAuditoria[Idcx].Auditores.nAud; //numero de auditores pestaña datos principales
    var nObs  = objAuditoria[Idcx].Auditores.nObs; //numero de observadores pestaña datos principales
    var htmlA = objAuditoria[Idcx].Auditores.htmlA;//html de auditores
    var htmlO = objAuditoria[Idcx].Auditores.htmlO;//html de observadores

    $("#nAudx").html('');
    if(nAud<9){$("#nAudx").html('0'+nAud)} else{ $("#nAudx").html(nAud)}

    $("#nObsx").html('');
    if(nAud<9){$("#nObsx").html('0'+nObs)} else{ $("#nObsx").html(nObs)}

    $("#listAuditorPrincipal").html('');
    $("#listObservadorPrincipal").html('');

    $("#listAuditorPrincipal").html(htmlA);
    $("#listObservadorPrincipal").html(htmlO);

}
//---------------------------------------------------------------fin---cargarAuditoresPlanNew---------------------------------------------------------



//******************************************logica obsoelta************************************************************* */
function cargarAuditoresPlan(Id, SedeId, EspecialidadId,ik)
{

  //alert("IdAuditoria = "+Id+",  dSede, "+SedeId+",  EspecialidadId = "+EspecialidadId);
//colocamos una bandera para saber si ya esta cargada en el array o con .leng

// var hayAuditor = 0;


// if((auditor[ik].cargaAuditores)&&(auditor[ik].cargaAuditores.length == 0))
// {//------------------------------------------------------------si es 0 al servicio----------------------------------------------
//     //alert("si es 0 al servicio");
//     var t = 0;//contarlos auditores del array
//     var nAud = 0;
//     var nObs = 0;

//     var htmlA = "";
//     var htmlO = "";
//     var html2 = "";

//     var apiKeyx = "r$3#23516ewew5";
//     var servicio = '/api/Get-Auditoria-Auditor-All?code=';
//     var metodoHttp = "objectlist";

//     var metodoAjax =  "GET";
//     var url2 = apiurlAuditoria+servicio+GetAudiitoriaAuditor+"&httpmethod="+metodoHttp+"&Id="+Id+"&SedeId="+SedeId+"&EspecialidadId="+EspecialidadId;
//     console.log(url2)
//     var headers ={
//         "apikey":apiKeyx
//     }

//     $.ajax({
//         method: metodoAjax,
//         url:  url2,
//         headers:headers,
//         crossDomain: true,
//         dataType: "json",
//     }).done(function( data)
//     {
//         console.log(data)
//         auditor[ik].cargaAuditores = data.Auditores;
//        for (i in data.Auditores){
//            data.Auditores[i].Tipo_Des

//             switch (data.Auditores[i].Tipo_Des) {
//                 case 'Auditor Lider':
//                     if (data.Auditores[i].Selected!=0)
//                     {
//                         selectAuditores[t] = data.Auditores[i];
//                         html2 +=  `
//                         <option value="${data.Auditores[i].Id}" >${data.Auditores[i].Name}(Lider)</option>`

//                         t++;
//                     }
//                     break;
//                    case 'Auditor':
//                     if (data.Auditores[i].Selected!=0)
//                     {
//                            //aqui cargamos el como visual
//                            htmlA += `
//                            <div class="caja-list-int"><p>${data.Auditores[i].Name}</p></div>`


//                            selectAuditores[t] = data.Auditores[i];

//                            html2 +=  `
//                            <option value="${data.Auditores[i].Id}" >${data.Auditores[i].Name}</option>`

//                            t++; nAud++;

//                     }
//                     break;
//                 case 'Observador':
//                     if (data.Auditores[i].Selected!=0){
//                         //aqui cargamos el como visual
//                         htmlO += `
//                            <div class="caja-list-int"><p>${data.Auditores[i].Name}</p></div>`
//                            //selectAuditores[t] = data.Auditores[i];t++;
//                            nObs++;
//                     }
//                     break;
//             }

//         }
//         selectAuditores[il].htmlOption = html2;
//         //alert(selectAuditores[il].htmlOption);
//         console.log("***** [",selectAuditores[il].htmlOption,"] ******");


//         $("#nAudx").html('');
//         if(nAud<9){$("#nAudx").html('0'+nAud)} else{ $("#nAudx").html(nAud)}

//         $("#nObsx").html('');
//         if(nAud<9){$("#nObsx").html('0'+nObs)} else{ $("#nObsx").html(nObs)}

//         $("#listAuditorPrincipal").html('');
//         $("#listObservadorPrincipal").html('');

//          $("#listAuditorPrincipal").html(htmlA);
//          $("#listObservadorPrincipal").html(htmlO);



//         // $("#divCountAuditor").html(cont_Au)
//         // $("#divCountAuditorLider").html(cont_Al)
//         // $("#divCountObservador").html(cont_Ob)

//     })  .fail(function( jqXHR, textStatus, errorThrown) {

//         console.log( jqXHR, textStatus, errorThrown)
//     })
//         .always(function(data , textStatus, jqXHR ) {
//             // alert( "complete" );
//         });
// }//------------------------------------------------------------si es 0 al servicio----------------------------------------------
// else
// {//----------------------------------------------------------si no es cergo al array--------------------------------------------
//     //alert("si no es cergo al array");
//     $("#listAuditorPrincipal").html('');
//     for (i in auditor[ik].cargaAuditores){
//         auditor[ik].cargaAuditores[i].Tipo_Des

//         if(!htmlA){htmlA = "";}if(!htmlO){htmlO = "";}
//         switch (auditor[ik].cargaAuditores[i].Tipo_Des) {
//             case 'Auditor Lider':
//                 if (auditor[ik].cargaAuditores[i].Selected!=0)
//                 {

//                 }
//                 break;
//                case 'Auditor':
//                 if ((auditor[ik].cargaAuditores[i].Selected!=0)&&(auditor[ik].cargaAuditores[i].Name))
//                 {
//                     console.log("Auditor(",ik,")(",i,") = "+auditor[ik].cargaAuditores[i].Name)
//                        //aqui cargamos el como visual
//                        htmlA += `
//                        <div class="caja-list-int"><p>${auditor[ik].cargaAuditores[i].Name}</p></div>`



//                 }
//                 break;
//             case 'Observador':
//                 if ((auditor[ik].cargaAuditores[i].Selected!=0)&&(auditor[ik].cargaAuditores[i].Name)){
//                     console.log("Observador(",ik,")(",i,") = "+auditor[ik].cargaAuditores[i].Name)
//                     //aqui cargamos el como visual
//                     htmlO += `
//                        <div class="caja-list-int"><p>${auditor[ik].cargaAuditores[i].Name}</p></div>`
//                 }
//                 break;
//         }


//      }


//      $("#listAuditorPrincipal").html('');
//      $("#listObservadorPrincipal").html('');

//       $("#listAuditorPrincipal").html(htmlA);
//       $("#listObservadorPrincipal").html(htmlO);

//       htmlO = "";
//       htmlA = "";


}//----------------------------------------------------------si no es cergo al array--------------------------------------------

//Ahora procedemos a cargar la informacion del tab de programacionde auditoria
//cargarDataTabProgramacionPlan(ik);//accion = 0[insertar]|| 1[modificar], i = posicion el el array de datos auditor,


//Ahora procedemos a cargar la informacion del tab de Resultado de la auditoria
//cargarDataTabResultadoPlan(ik);//accion = 0[insertar]|| 1[modificar], i = posicion el el array de datos auditor,







//------------------------------------------------------------cargarAuditoresPlanI_ini-------------------------------------------------------------------------

function cargarAuditoresPlanI(Id5_, SedeId, EspecialidadId)
{
    //alert("IdAuditoria = "+Id5_+"")
   //alert("IdAuditoria = "+Id5_+",   dSede, "+SedeId+",  EspecialidadId = "+EspecialidadId);

      var nAud = 0;
      var nObs = 0;

      var htmlA = "";
      var htmlO = "";
      var html2 = "";
      var html3 = "";

    var apiKeyx = "r$3#23516ewew5";
    var servicio = '/api/Get-Auditoria-Auditor-All?code=';
    var metodoHttp = "objectlist";

    var metodoAjax =  "GET";
    var url2 = apiurlAuditoria+servicio+GetAudiitoriaAuditor+"&httpmethod="+metodoHttp+"&Id="+Id5_+"&SedeId="+SedeId+"&EspecialidadId="+EspecialidadId;
    console.log(url2)
    var headers ={
        "apikey":apiKeyx
    }

    $.ajax({
        method: metodoAjax,
        url:  url2,
        headers:headers,
        crossDomain: true,
        dataType: "json",
    }).done(function( data)
    {
        //console.log(data)
        //auditor[ik].cargaAuditores = data.Auditores;


           console.log("####[",Id5_,"][ - ]######################### CARGANDO AUDITORES DE LA AUDITORIA (",Id5_,") ###_INI_######################");
                objAuditoria[Id5_].cargarBD2(data);
                console.log(objAuditoria[Id5_]);
           console.log("############################################ CARGANDO AUDITORES DE LA AUDITORIA (",Id5_,") ###_FIN_#####################");


       for (i in data.Auditores){
           data.Auditores[i].Tipo_Des

         //objAuditorPlan[0] = new AuditorPlan();
         console.log("<<<<<<<<<<<<<<<<<",objAuditoria[Id5_].Auditores[i],">>>>>>>>>>>>>>>");
            var asx = objcPlanAuditoria[Id5_].Programacion[i];
            var ccp;
            if(asx)
            {console.log("::::::::::::::::::",asx.AuditorId,":(",i,"):::::::::::::::");
                 ccp = asx.AuditorId;
            }




            switch (data.Auditores[i].Tipo_Des) {
                case 'Auditor Lider':
                    if (data.Auditores[i].Selected!=0)
                    {
                        //selectAuditores[t] = data.Auditores[i];
                        //alert("Auditor Lider ("+data.Auditores[i].Id+") ==  AuditorBD("+ccp+")");
                        if(data.Auditores[i].Id == ccp)
                         {
                               //alert("("+i+")("+ Id5_ +")AuditorLider AAUDITOR ("+data.Auditores[i].Id+") ==  AuditorBD("+ccp+")")
                            html3 +=  `
                            <option value="${data.Auditores[i].Id}" selected>${data.Auditores[i].Name}(Lider)</option>`
                         }
                         else
                         {
                            html3 +=  `
                            <option value="${data.Auditores[i].Id}" >${data.Auditores[i].Name}(Lider)</option>`
                         }
                         html2 +=  `
                            <option value="${data.Auditores[i].Id}" >${data.Auditores[i].Name}(Lider)</option>`



                    }
                    break;
                   case 'Auditor':
                    if (data.Auditores[i].Selected!=0)
                    {
                           //aqui cargamos el como visual
                           htmlA += `
                           <div class="caja-list-int"><p>${data.Auditores[i].Name}</p></div>`


                           //selectAuditores[t] = data.Auditores[i];



                           if(data.Auditores[i].Id == ccp)
                           {
                            //alert("("+i+")("+ Id5_ +")Auditor AAUDITOR ("+data.Auditores[i].Id+") ==  AuditorBD("+ccp+")")
                            html3 +=  `
                            <option value="${data.Auditores[i].Id}" selected>${data.Auditores[i].Name}-${ccp}1</option>`
                           }
                           else
                           {
                            html3 +=  `
                            <option value="${data.Auditores[i].Id}" >${data.Auditores[i].Name}</option>`
                           }
                           html2 +=  `
                           <option value="${data.Auditores[i].Id}" >${data.Auditores[i].Name}</option>`


                            nAud++;

                    }
                    break;
                case 'Observador':
                    if (data.Auditores[i].Selected!=0){
                        //aqui cargamos el como visual
                        htmlO += `
                           <div class="caja-list-int"><p>${data.Auditores[i].Name}</p></div>`

                           //selectAuditores[t] = data.Auditores[i];t++;
                           nObs++;
                    }
                    break;
            }
           // objcPlanAuditoria[Id5_].Programacion[i].html3 = html3
        }
        //console.log("obj",objcPlanAuditoria[Id5_].Programacion[i].html3);
        //prompt("HTML",html2)
         objAuditoria[Id5_].htmlOptionAuditor = html2    //CARGAMOS EL ARRAY EL HTML DE AUDITORES
         bloqueVentaPlanDg = 1;
         console.log("####[",Id5_,"]######################################## CARGANDO AUDITORES DE LA AUDITORIA (",Id5_,") ###_INI_######################");
         console.log(objAuditoria[Id5_]);
         console.log("###_______________######################################## CARGANDO AUDITORES DE LA AUDITORIA (",Id5_,") ###_FIN_#####################");

        console.log("      ");
        console.log("      ");
        console.log("      ");
        console.log("      ");
        console.log("      ");


        // if(selectAuditores[il]){
        //     selectAuditores[il].htmlOption = html2;
        //     //console.log("Equipo Auditor(",Id,") = [",selectAuditores[il].htmlOption,"] ******");
        // }else{console.log("la Auditoria (",Id,"), NO TIENE AUDITORES ASIGNADOS ");}



    })  .fail(function( jqXHR, textStatus, errorThrown) {

        console.log( jqXHR, textStatus, errorThrown)
    })
        .always(function(data , textStatus, jqXHR ) {
            // alert( "complete" );
        });
}//-----------------------------------------------------------cargarAuditoresPlanI   fim----------------------------------------------





function FormatFechaBD(fecha){
    var p = fecha.split("/");
    fecha = p[2]+"-"+p[1]+"-"+p[0];
    return fecha;
}


//----------------------------------------------------------fnCambiarFechaEjecucionPlanAuditoria--------------------------------ini------------
function fnCambiarFechaEjecucionPlanAuditoria(idAud)
{
    //variables
    var created_by = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
    var dateInit   = $('#date_plan_historial_init').val();
    var dateEnd    = $('#date_plan_historial_end').val();
    var motivoFec  = $('#txt_motivo_cambioFec').val();
    var dateInitA  = $('#txt_fechaInicioEj').val();
    var dateEndA   = $('#txt_fechaFinEj').val();

    var Data_Inicial = 'Del '+dateInitA+' al '+dateEndA;
    var Data_Final   = 'Del '+dateInit+' al '+dateEnd;

    var dateInit  = FormatFechaBD(dateInit);
    var dateEnd   = FormatFechaBD(dateEnd);
    var idPLan    = objcPlanAuditoria[idAud].PlanId;
    var SedeId    = objAuditoria[idAud].SedeId;

    var body={
        Id:                 idPLan,
        AuditoriaId:        idAud,
        Inicio:             dateInit,
        Fin:                dateEnd,
        Created_By:         created_by,
        Data_Inicial:       Data_Inicial,
        Data_Final:         Data_Final,
        Motivo:             motivoFec,
        Last_Updated_By:    created_by,
        Flag_Completado:    0
    }
   console.log("++++++++++++++++++++++++++++++++++++++++++ corrector Andy  de pruebas del sprint 2   +++++++++++++++++++++++++++++++++++++")
   var dd = new Date();
   console.log(dd)
   console.log(body)
   console.log("++++++++++++++++++++++++++++++++++++++++++ corrector Andy  de pruebas del sprint 2   +++++++++++++++++++++++++++++++++++++")
//alert("quien me llama");
    var url =  apiurlAuditoria+'/api/Post-Plan_Auditoria-All?code=pac7W1TYax/86yT1BJStOIXUuZ0xQ8ETYPEe0bQUjd3R7nSY6grahg==&httpmethod=putlog&Id='+idPLan+'&SedeId='+SedeId;
    var headers ={
        "apikey":constantes.apiKey,
        "Content-Type": "application/json",
    }
    $.ajax({
        method: "POST",
        url:  url,
        data: JSON.stringify(body),
        headers:headers,
        crossDomain: true,
        dataType: "json",
    })
    .done(function(data)
    {
        //alert(data.Id)
        if (data.Id > 0) {
            console.log("if data.Id",data.Id)

            //SI FUE POSITIVO EL DEBE PROCEDER A CAMBIAR LAS FECHAS DE LA PROGRAMACIÓN EN LA BASE DE DATOS
            var inni   = $('#date_plan_historial_init').val();
            var finn    = $('#date_plan_historial_end').val();
              //verificarCambioSiCambioAfectaProgramacion(inni, finn);

            $("#modalShowAlertConfirmFecha").removeClass("fade").modal("hide");
            $("#modalShowAlertConfirmFechaOk").addClass("fade").modal("show");
            $('#valid-fecha').css('display','none');
            $('#date_plan_historial_end').val('');
            $('#date_plan_historial_init').val('');
            $('#txt_motivo_cambioFec').val('');
            $("#contador").html('0');
            //alert('Opc 1');
            primeraCargap=1;
            vw_auditorias_list_plan.filtroTablaDivsAuditoriasp();
            //listadoAuditoriaLider();
            $("#btn-confirmar-fecha").html("<b>Confirmar</b>")
            $("#btn-confirmar-fecha").addClass("btn_confirmar_modal bg-green-lime-modal confirm btn-confirmar-guardar-plan btn-blue")
            $("#btn-confirmar-fecha").attr("disabled",false);


        }
        else if (data.Id == 0) {


            //console.log("elseif data.Id",data.Id)
            $("#modalShowAlertConfirmFecha").removeClass("fade").modal("hide");
            $("#modalShowAlertConfirm").addClass("fade").modal("show");
            $('#valid-fecha').css('display','block').html(data.Description);
            $("#btn-confirmar-fecha").html("<b>Confirmar</b>")
            $("#btn-confirmar-fecha").addClass("btn_confirmar_modal bg-green-lime-modal confirm btn-confirmar-guardar-plan btn-blue")
            $("#btn-confirmar-fecha").attr("disabled",false);

            //verModalError("Reprogramar Auditoría", "Error al Cambiar las Fechas!");
            //alert('Opc 2');
        }
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
        // swal({
        //     title: "Error",
        //     text:'Error al guardar el cambio de fecha!',
        //     type: "error",
        //     timer:3000,
        //     showCancelButton: false,
        //     confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
        //     confirmButtonText: "De acuerdo",
        //     closeOnConfirm: false
        // });

        verModalError("Reprogramar Auditoría", "Error al guardar el cambio de fecha!");

        $("#btn-confirmar-fecha").html("<b>Confirmar</b>")
        $("#btn-confirmar-fecha").addClass("btn_confirmar_modal bg-green-lime-modal confirm btn-confirmar-guardar-plan btn-blue")
        $("#btn-confirmar-fecha").attr("disabled",false);

    });//*/


}
//----------------------------------------------------------fnCambiarFechaEjecucionPlanAuditoria--------------------------------fin------------




//----------------------------------------------------------fnVerHistorialEjecucionPlanAuditoria--------------------------------ini------------
function  fnVerHistorialEjecucionPlanAuditoria(op)
{
    //verificamos si podemos apretar o no el boton
    if(op == 1)// 1 modificar
    {
        $("#newPlanAuditoriaModal").removeClass("fade").modal("hide");
        $("#modalHistorialAuditorLider").modal("show").addClass("fade");
    }
    else // 0 crear
    {
        swal("Error!", "No puede Visualizar, el Historial de Reprogramaciones  si no ha Guardado ó Finalizado el Plan de Auditoría .", "error")
    }



}
//----------------------------------------------------------fnVerHistorialEjecucionPlanAuditoria--------------------------------fin------------

//Class Auditoria{
    //+ Id;                                  // SI DB****
    //+ Sede;                               // no DB
    //+ FechaInicio;                       // no DB
    //+ FechaFin;                         // no DB
    //+ AuditorLider = HashSession;      // no DB
    //+ Auditores = new Auditor[]       // no DB
    //+ Observadores = new Auditor[]   // no DB

//Class PlanAuditoria extend Auditoria{
    //+ IdPlan;
    //+ OjetivoAuditoria;
    //+ ResumenAuditoria;//------------------ojo se carga en el tab-resultado
    //+ AlcanceAuditoria;
    //+ FechaEjecucionIni;
    //+ FechaEjecucionFin;
    //+ FechaCreacionPlan;
    //+ Requisitos = new Requisito[]
    //+ HistorialCambios = new Reprogramaciones[];

//}

//Class Requisito extend PlanAuditoria{
    //+ CargoResponsable;
    //+ IdProceso;
    //+ IdNorma;// ojo si tiene dos normas y c/u tiene 10 requisitos, entonces almacenara 20 registros (10-norma1, 10-norma2)
    //+ idRequisito;
    //+ NameRequisito;
    //+ IdAuditor;
    //+ NameAuditor;
    //+ TipoAuditor;
    //+ FechaAudRequisito;
    //+ HoraInicio;
    //+ HoraFin;
    //-----ahora los datos de su resiultado --- por requisito
    //+ Hallazgo;
    //+ TipoHallazgo;

//}

//----------------------------------------------------------cargarDataTabProgramacionPlan--------------------------------ini------------
/**
 * [cargarDataTabProgramacionPlan cargar informacion del plan de la auditoria]
 * @param  {[type]} Id4_ [description]
 * @return {[type]}      [description]
 */
function cargarDataTabProgramacionPlan(Id4_)
{
    // alert(objAuditoria[Id4_].PlanId);
    //insertarModificar; ojo con esto sabemos si vamos a crear un nuevo o a modificarlo
    //es un plan nuevo
    if(objAuditoria[Id4_].PlanId == 0)
    {

        //1) .. Primeramente vamos a dterminar si es una o dos normas
        var res = objAuditoria[Id4_].Code_Normas.split(",");
        var res1 = objAuditoria[Id4_].Id_Normas.split(",");
        //alert("norma = "+res1[0]); alert(res1[1]);//Id_Normas
        //$("#CambiarFecha").
        //$("#CambiarFecha").css("visibility", "hidden");
        //$("#CambiarFecha").attr("readonly","readonly");
        $("#CambiarFecha").attr("disabled","disabled");
        $("#btn-historial-auditor").attr("disabled","disabled");



        if(res.length == 1)//si algun en lugar de ser 2 normas son n.... realizar un for.....
        {
            //para 1 norma
            nNormas = 0;
            //cargamos los nombres a bt2 y ocultamos bt1
            //btn-basic//bt1      //btn-17002 //bt2
            //   $("#btn-17002").html(res[1]);
            //   $("#btn-17002").addClass("btn-prog active2");
            //   $("#btn-basic").css("visibility", "hidden");
            //2) .. Mostrar el listado o unico de Procesos y el cargo asociado comop responsable y  con el NormaId   y UnidadNegocioId
            cargaProcesosCargo(Id4_, res1[0],'btn-basic');

            //$('#btn-basic').click(function () {cargaProcesosCargo(Id4_, res1[0],'btn-basic'); });
        }
        else if(res.length == 2)
        {
            //para 2dos normas
            nNormas = 1;
            //cargamos los nombres a bt1 y  bt2
            //alert("SON DOS ENTRAMOS AQUI");
            // $("#btn-basic").css("visibility", "visible");
            // $("#btn-17002").css("visibility", "visible")

            // $("#btn-basic").html(res[0]);
            // $("#btn-17002").html(res[1]);

            // $("#btn-basic").addClass("btn-prog active2");
            // $("#btn-17002").addClass("btn-formAuditor btn-prog");

            cargaProcesosCargo(Id4_, res1[0],'btn-basic');
            //cargaProcesosCargo(Id4_, res1[1],'btn-17002');

            $('#btn-basic').click(function () {cargaProcesosCargo(Id4_, res1[0],'btn-basic'); });
            $('#btn-17002').click(function () {cargaProcesosCargo(Id4_, res1[1],'btn-17002'); });

            //3) .. Cargar todos los requisitos y dentro de este Array
            //en su foreach armar las filas (PROCESO--CAPITULOS--REQUISITOS--AUDITORES[]--FECHA(DE HOY A ....)--HORA-INI  --- HORA-FIN
            //TODO ESTE CICLO SE REPITE CON EL CLICK, SOBRE LA NORMA + PROCESO...... OJO...SEPARAR EN UN METODO
            //cargaRequisitosProcesoPlan(jj, 1)

        }

    }
    else
    {
        //vamos a mostrar los datos que se van a modificar
        //alert("modificar plaaaannnnnnnnnnnnnnnnnnnnn");
        //1) .. Con la informacion de base de datos, vamos a ejecutar paso a paso lo que se hace al crear uno nuevo
        //2) .. seguidamentre le cargamos los valores almacenados en data base
        //3) .. y al igual que ssoma, cargamos el array y borramos el plan inicial y los volvemos a insertar
        //ojoo, se puede cambiar todo exepto el codigo del plan
        var res = objAuditoria[Id4_].Code_Normas.split(",");
        var res1 = objAuditoria[Id4_].Id_Normas.split(",");
        $("#CambiarFecha").attr("disabled",false);
        $("#btn-historial-auditor").attr("disabled",false);


        //alert("norma = "+res[0]); alert(res[1]);
        //si algun en lugar de ser 2 normas son n.... realizar un for.....
        if(res.length == 1)
        {
            //para 1 norma
            nNormas = 0;
            //cargamos los nombres a bt2 y ocultamos bt1
            //btn-basic//bt1      //btn-17002 //bt2
            // $("#btn-17002").html(res[0]);
            // $("#btn-17002").addClass("btn-prog active2");
            // $("#btn-basic").css("visibility", "hidden");
            //alert("llegamos aqui - linea 3490");
            //2) .. Mostrar el listado o unico de Procesos y el cargo asociado comop responsable y  con el NormaId   y UnidadNegocioId
            cargaProcesosCargo(Id4_, res1[0],'btn-basic');///ojo en este onchage explota
            //$('#btn-basic').click(function () {cargaProcesosCargo(Id4_, res1[0],'btn-basic'); });

            //3) .. Cargar todos los requisitos y dentro de este Array
            //en su foreach armar las filas (PROCESO--CAPITULOS--REQUISITOS--AUDITORES[]--FECHA(DE HOY A ....)--HORA-INI  --- HORA-FIN
            //TODO ESTE CICLO SE REPITE CON EL CLICK, SOBRE LA NORMA + PROCESO...... OJO...SEPARAR EN UN METODO
            // cargaRequisitosProcesoPlan(jj, 0)
        }
        else if(res.length == 2)
        {
            //para 2dos normas
            nNormas = 1;
            //cargamos los nombres a bt1 y  bt2
            // $("#btn-basic").css("visibility", "visible");
            // $("#btn-17002").css("visibility", "visible");
            // $("#btn-basic").html(res[0]);
            // $("#btn-17002").html(res[1]);
            // $("#btn-basic").addClass("btn-prog active2");
            // $("#btn-17002").addClass("btn-formAuditor btn-prog");

            cargaProcesosCargo(Id4_, res1[0],'btn-basic');
            $('#btn-basic').click(function () {cargaProcesosCargo(Id4_, res1[0],'btn-basic'); });
            $('#btn-17002').click(function () {cargaProcesosCargo(Id4_, res1[1],'btn-17002'); });
            //cargaProcesosCargo(Id4_, res1[1],'btn-17002');


            //3) .. Cargar todos los requisitos y dentro de este Array
            //en su foreach armar las filas (PROCESO--CAPITULOS--REQUISITOS--AUDITORES[]--FECHA(DE HOY A ....)--HORA-INI  --- HORA-FIN
            //TODO ESTE CICLO SE REPITE CON EL CLICK, SOBRE LA NORMA + PROCESO...... OJO...SEPARAR EN UN METODO
            //cargaRequisitosProcesoPlan(jj, 1)

        }

    }

}
//----------------------------------------------------------cargarDataTabProgramacionPlan--------------------------------fin------------



//----------------------------------------------------------cargarDataTabResultadoPlan--------------------------------ini------------
function cargarDataTabResultadoPlan(jj)
{

      //insertarModificar; ojo con esto sabemos si vamos a crear un nuevo o a modificarlo
      if(auditor[jj].PlanId == 0) //es un plan nuevo
      {
         //1) .. Primeramente dependiendo de el proceso, norma y requisito vamos a cargarel listado inicial

         //2) .. a los requisitos dentro de este Array se le agrega la opcion
              //en su foreach armar las filas (PROCESO--CAPITULOS--REQUISITOS--AUDITORES[]--FECHA(DE HOY A ....)--HORA-INI  --- HORA-FIN

              //TODO ESTE CICLO SE REPITE CON EL CLICK, SOBRE LA NORMA + PROCESO...... OJO...SEPARAR EN UN METODO


      }
      else
      {//vamos a mostrar los datos que se van a modificar
           //1) .. Con la informacion de base de datos, vamos a ejecutar paso a paso lo que se hace al crear uno nuevo
           //2) .. seguidamentre le cargamos los valores almacenados en data base
           //3) .. y al igual que ssoma, cargamos el array y borramos el plan inicial y los volvemos a insertar
              //ojoo, se puede cambiar todo exepto el codigo del plan

      }



}
//----------------------------------------------------------cargarDataTabResultadoPlan--------------------------------fin------------




function  cargaRequisitosProcesoPlanXX(IdAuud, nNormas)
{
    //alert("aja  "+IdAuud+" norma "+nNormas)
}

function  cargaRequisitosProcesoPlan(IdAuud, nNormas)//res[1],'btn-17002'
{//----------------------------------------------------------cargaProcesosCargo--------------------------------ini------------
 //alert(IdAuud+"--************-----------------------------------------------");
    $("#divContListaProgramacion").html('Cargando...'); $("#divContListaResultado").html('Cargando...');
    //showLoading();

    ///ok vamos al servicio....
    let htmlReq = "";
    let JsReq = "";
    let htmlRes = "";
    let iv = 0;

                        //let normax = $("#btn-17002").html();
                        //var res = auditor[jj].Id_Normas.split(",");
                        let idUnidadNegociox = 2;// auditor[jj].UnidadNegocioId; //forzado hasta que le cargen a la bd
                        let NormaIdx = 3;//res[nNormas]; //forzado hasta que le cargen a la bd
                        let ProcesoId = document.getElementById('sel_procesoPlan').value;//res[nNormas]; //forzado hasta que le cargen a la bd

                        // var servicio = '/api/Get-Procesos-All?code=';
                        // var getSedeAllAuditoria = "tEAp2tNAKmv7vI/cojury2FgxRalWR60atxCqa7hReHfM42lxTrasA==";
                        // var metodoHttp = "objectlist";
                        // var metodoAjax =  "GET";
                        // var url = apiurlAuditoria+servicio+getSedeAllAuditoria+"&UnidadNegocioId="+idUnidadNegociox+"&NormaId="+NormaIdx+"&httpmethod="+metodoHttp;
                        // //var url = apiurlAuditoria+servicio+getSedeAllAuditoria+"&UnidadNegocioId="+idUnidadNegocio+"&httpmethod="+metodoHttp;

                        var servicio        = '/api/Get-Requisitos-All?code=';
                        var metodoHttp      = "objectlist";// object   --- esto para los datos de una auditoria solo pasar esto por url IdAuditoria = varJs
                        var metodoAjax      =  "GET";
                        var getRequisitosAll ="2CGU9CgCzDIQbm15eiygeamwd6qph2IJcF0cArLQTO3JvPgDNjk90A==";
                        var url = apiurlAuditoria+servicio+getRequisitosAll+"&unidadNegocioId="+idUnidadNegociox+"&normaId="+NormaIdx+"&httpmethod="+metodoHttp;



                        var url = https=apiurlAuditoria+"/api/Get-Requisitos-All?code=2CGU9CgCzDIQbm15eiygeamwd6qph2IJcF0cArLQTO3JvPgDNjk90A==&httpmethod=objectlist&UnidadNegocioId=2&NormaId=3&ProcesoId="+ProcesoId;


                    var headers ={
                        "apikey":constantes.apiKey
                    }
                     //alert(istAud+" anteS de ajaxSSSSSSSSSS")

                        $.ajax({
                            method: metodoAjax,
                            url:  url,
                            headers:headers,
                            crossDomain: true,
                            dataType: "json",
                        }).done(function( data)
                        { //**************************************************************************************************************** */

                           //alert("dentrooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo ajax");


                           if(objAuditoria[istAud]){

                            objAuditoria[istAud].Requisitos = data;

                            console.log("rVVECTOR = ",objAuditoria[istAud]);
                                       }


                           if(data.length >0)//si esta coincidiendo y existen procesos para este combinacion de unidad negocio + norma+ proceso
                           {
                              console.log("############...................cargaRequisitosProcesoPlan................#############");
                              console.log(url);
                              console.log("requisitos = ",data);
                              console.log("############................cargaRequisitosProcesoPlan...................#############");
                              console.log("           ");
                              console.log("           ");
                              console.log("           ");
                              console.log("           ");
                              console.log("           ");
                              //divContListaProgramacion //aqui vamos a escupir el html

                               //2)  recorro y contruyo la tabla con proceso, capitulo(data.Title+data.Code),  requisito(data.code+data.Description), listaAuditor(incluyeLider), txtFecha, horaActual, HoraActual +1
                               let proceso = nameProcesoUso[0];

                               //let capitulo =
                               var Inicio_Plan = $('#txt_fechaInicioEj').val()//tomamos la fecha de inicio seleccionada para inicializar
                               //var Inix = $('#txt_fechaInicioEj').val()
                               //var Finx = $('#txt_fechaFinEj').val()
                               //alert(istAud +"despuesssssssssss de ajaxxxxxxxxxxxxxxxxxxxxxxxxx")
                                   pivv = data;

                                   data.map(function(item)
                                   {//.................................................recorre ...........

                                       console.log(item.Description);
                                           let capitulo ='Capitulo '+ item.ProcesoId;
                                           let requisito = item.Code+': '+item.Description; requisito = toCapitalize(requisito);
                                           let RequisitoId = item.Id;
                                           let reqId = item.Id;
                                           var listaAuditor;

                                              console.log("***(",iv,")***************************   DATOS DE MI VECTOR n[",IdAuud,"]   ************************************");
                                                                          console.log("VECTOR GENERAL(",objAuditoria[istAud],")");
                                              console.log("***________********************   DATOS DE MI VECTOR   ************************************");
                                              //alert(objAuditoria[Id].Auditores.length);

                                              //alert("Buscando los requisitos   de la ausitoria("+Id+")");



                                            if(objAuditoria[istAud])
                                              {
                                                if(objAuditoria[istAud].Auditores)// &&(objAuditoria[Id].Auditores.length >= 0)
                                                    {
                                                    listaAuditor = objAuditoria[istAud].htmlOptionAuditor;
                                                    }else{listaAuditor = "<option value = '' > No Hay equipo Asignado</option>";}
                                              }




                                           //funcion que arma el html pendiente.......####OJO
                                           let fechaReq =  Inicio_Plan; //alert(fechaReq);//fecha  inicio de la programacion de esta auditoria
                                           let HoraInip = "07:00:00"; //document.getElementById("myTime").value = "22:53:05";
                                           let HoraFinp = "08:00:00";




                                           let id1 = "txt-proceso_"+iv  //proceso
                                           let id2 =  "txt-capitulo_"+iv
                                           let id3 =  "txt-requisitos_"+iv
                                           let id4 =  "sel-auditores_"+item.UnidadNegocioProcesoId
                                           let id5 =  "txt_date_prog_"+item.UnidadNegocioProcesoId
                                           let id6 =  "txt-hora-inicio_"+item.UnidadNegocioProcesoId
                                           let id7 =  "txt-hora-fin_"+item.UnidadNegocioProcesoId


                                           //resultados
                                           let id8 =  "sel-tipo_"+item.UnidadNegocioProcesoId
                                           let id9 =  "btn-hallazgo_"+item.UnidadNegocioProcesoId
                                           let id10 =  "txt_hden_hallazgo_"+item.UnidadNegocioProcesoId
                                           ivv[iv] = item.UnidadNegocioProcesoId;

                                           //pivv = pivv+"-"+pivv;

                                           //alert("iv = "+iv);
                                           if(objcPlanAuditoria[istAud])
                                           if(objcPlanAuditoria[istAud].BDtarea == 1)
                                                {
                                                   // alert("1427 cargamos los datos de los requisitos y los resultados de los hallazgos");
                                                   //vamos a cargar los datos de los requisitos
                                                   var vid5  =   objcPlanAuditoria[istAud].Programacion[iv].Inicio
                                                   var vid6  =   objcPlanAuditoria[istAud].Programacion[iv].Hora_Inicio
                                                   var vid7  =   objcPlanAuditoria[istAud].Programacion[iv].Hora_Fin
                                                   var vid10 =   objcPlanAuditoria[istAud].Programacion[iv].Hallazgo

                                                   //alert(item.UnidadNegocioProcesoId);
                                                //    this.UnidadNegocioProcesoId= idl;
                                                //alert("fecha("+iv+") = "+vid5);

                                                //    this.AuditorId = $("#sel-auditores_"+idl).val()
                                                //    this.Inicio =  date1_DD_MM_AAAA_to_AAAA_MM_DD_T_HH_MM_S($("#txt_date_prog_"+idl).val())
                                                //    this.Hora_Inicio = document.getElementById("txt-hora-inicio_"+idl).value;
                                                //    this.Hora_Fin = document.getElementById("txt-hora-fin_"+idl).value;
                                                //    this.TipoHallazgoId = document.getElementById("sel-tipo_"+idl).value;

                                                //    this.Hallazgo = document.getElementById("txt_hden_hallazgo_"+idl).value;
                                                //    this.Created_By =  getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
                                                //    this.Created_Date = now
                                                //    this.Last_Updated_By =  getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
                                                //    this.Last_Updated_Date = now







                                                }

                                           htmlReq += `
                                           <div class="item-tabla list-border-none" style="font-size: 13px;" >
                                                   <div class="row m-0 justify-content-between align-items-left tbody_trainning" >

                                                   <div class="col-3 text-left">
                                                       <div class="list-border ">
                                                           <input type="text" name="${id1}" id="${id1}" class="date-small" value="${proceso}">
                                                       </div>
                                                   </div>

                                                   <div class="col-1 text-left">
                                                       <div class="list-border ">
                                                           <input type="text" name="${id2}" id=""${id2}" class="date-small" value="${capitulo}">
                                                       </div>
                                                   </div>

                                                   <div class="col-3 text-left">
                                                       <div class="list-border">
                                                           <input type="text" name="${id3}" id="${id3}" class="date-small" value="${requisito}">
                                                       </div>
                                                   </div>

                                                   <div class="col-2 text-right">
                                                       <div class="list-border">
                                                           <span class="input-group-addon float-left text-left sel-med " id="sizing-addon2"><img src="./images/iconos/magnifying-glass6.svg"></span>
                                                           <select type="text" name="${id4}" id="${id4}" class="date-small sel-md unicon" onchange="validaAuditorPlan('${id4}', 80, 10,3, 2, 471)" >
                                                           ${listaAuditor}
                                                           </select>
                                                       </div>
                                                   </div>

                                                   <div class="col-1 text-left">
                                                            <div class="list-border " >
                                                                <input value = "${vid5}"  onchange="validaFechaProg('${id5}') "  type="text" name="${id5}" id="${id5}" onchange="validaFechaReqPlan('${id5}', 80, 10,3, 2, 471)" class="txt_date_prog date-small" maxlength="10">
                                                                <span class="input-group-addon float-right text-right" id="sizing-addon2"><img src="./images/iconos/calendario-3.svg" title="Limpiar Fechax" style = "cursor: pointer;"  onclick="$('#${id5}').val('');" ></span>
                                                            </div>
                                                   </div>

                                                   <div class="col-1 text-right">
                                                       <div class="list-border text-right arreglo">
                                                           <input  type="time" class="clockr"  name="${id6}" id="${id6}" value="${vid6}" onchange="validaHoraPlan('${id6}', 80, 10,3, 2, 471)" class="time date-small" maxlength="10">

                                                       </div>
                                                   </div>

                                                   <div class="col-1 text-right">
                                                       <div class="list-border arreglo">
                                                           <input  type="time" name="${id7}" id="${id7}" value="${vid7}"  onchange="validaHoraPlan('${id7}', 80, 10,3, 2, 471)" class="time date-small" maxlength="10">
                                                       </div>
                                                   </div>

                                               </div>
                                           </div>



                                           `

                                           JsReq += `
                                           <script> $("#${id5}").datetimepicker({timepicker:false, format:'d/m/Y'}); </script>

                                           `

                                       //,minDate:'${Inix}',maxDate:'${Finx}'
                                          //ahora debemos cargar dinamicamente tambien los parametros de los resultados

                                          htmlRes += `
                                          <div class="item-tabla list-border-none" style="font-size: 13px;" >
                                          <div class="row m-0 justify-content-between align-items-left tbody_trainning" >

                                              <div class="col-4 text-left" style = " ">
                                                  <div class="list-border ">
                                                      <input type="text" name="txt-proceso-2" id="txt-proceso-2" class="date-small" value="${proceso}">
                                                  </div>
                                              </div>

                                              <div class="col-4 text-left">
                                                  <div class="list-border ">
                                                      <input type="text" name="txt-requisitos-2" id="txt-requisitos-2" class="date-small" value="${requisito}">
                                                  </div>
                                              </div>

                                              <div class="col-1 text-center">
                                                  <div class="list-border ver text-center">
                                                      <input type="button" name="${id9}" id= "${id9}" class="date-small ver text-center" onclick="cargarHallazgo('${id10}',${RequisitoId})" value="Ver">
                                                      <input id="${id10}" name="${id10}" type="hidden" style = "display: block;" value="${vid10}" >
                                                  </div>
                                              </div>

                                              <div class="col-2 text-left">
                                                  <div class="list-border" style="width: 100% !important;">
                                                      <select type="text" name="${id8}" id="${id8}" class="date-small sel-md unicon" style="font-size: 10px; !important">
                                                      ${htmlTipoHallazgo}
                                                     </select>
                                                  </div>
                                              </div>

                                              <div class="col-1 text-left">
                                                  <div class="list-border">
                                                      <input type="text" name="txt-norma" id="txt-norma" class="date-small" value="${normax}">
                                                  </div>
                                              </div>

                                          </div>
                                      </div>

                                      `

                                   iv++;

                                   })


                                   //imprimimos el html

                                   //$("#divContListaProgramacion").html('');
                                   $("#divContListaProgramacion").html(htmlReq);


                                   $("#scriptDataPicker").html('');
                                   $("#scriptDataPicker").html(JsReq);



                                   $("#divContListaResultado").html('');
                                   $("#divContListaResultado").html(htmlRes);
                                   //$("#txt-hora-fin_0").focus();
                                   //showLoading();
                                   //hideLoading();


                                   bloqueVentaPlanProg = 1


                           }
                           else
                           {

                              console.log("############................EL OBJETO NO TRAE NADA SEGUN ................#############");
                              console.log(data);
                              console.log("############................EL OBJETO NO TRAE NADA SEGUN ..................#############");
                              //$("#divContListaProgramacion").html('');
                              ("#divContListaResultado").html('');

                              hideLoading();
                              swal("Error","No existen Requisitos definidos para esta norma y unidad de negocio ","error")
                              bloqueVentaPlanProg = 1;
                           }


                         //**************************************************************************************************************** */
                        }).fail(function( jqXHR, textStatus, errorThrown ) {
                            swal("Error","No se pudieron cargar los Requisitos, por favor verifique su conexion a internet y vuelva a intentarlo","error")
                            $("#divContListaProgramacion").html('No hay resultados'); $("#divContListaResultado").html('No hay resultados');

                        // });

                            }).always(function( jqXHR, textStatus, errorThrown ) {

                                //alert("TERRRRRRRRRRRRRRRRRRRR M IIIIIIIIIIIIIIIIIIIIII B       NEEEEEEEEEEEEEEEEEEEEEE CARGAR REQUISITOOOOOOOOOOOOOO");

                            });




                     //alert('5832');


}//----------------------------------------------------------cargaProcesosCargo--------------------------------fin------------


//----------------------------------------------------------cambiaProcesoPlan--------------------------------ini------------
function cargarRequisitosNew()
{

    dat = lisBt1[normSel].split(",")
    var nb = normSel+"_";
    for (var i = 0; i <dat.length-1 ; i++)
    {
         var a = parseInt(dat[i]);
            //estaenlaListaReq(a);
            sal = validaTempAtrray(a)
            if(sal == 1)
            {
                //console.log('**SELECCIONADO(',normSel,') = ',a)
                //fn_cargaRequisitosProceso (normSel, a);
            }
    }

    //luego que recorro verifico todo los existe para esta norma
    //los que existen los dejo igual  (A)
    //los nuevos los agrego (B)
    //los que existen y no estan en la lista los borro (C)
    var n = objAuditoria[istAud].Procesos.length;
    var pp = objAuditoria[istAud].Procesos;
    objAuditoriaNorma1 = [];
    for(var i = 0; i<n; i++)
    {
       if((normSel == pp[i].NormaId)&&(validaTempAtrray(pp[i].Id) == 1))
        {

          //console.log("hay que poner selected este señor Proceso("+pp[i].NormaId+")("+pp[i].Id+")__________tiene selected = "+pp[i].Selected)
          pp[i].Selected = 1;
          console.log("Ya se puso el Proceso("+pp[i].NormaId+")("+pp[i].Id+")__________tiene selected = "+pp[i].Selected)
          objAuditoriaNorma1[objAuditoriaNorma1.length] = pp[i].Id;
        }else{
            if(pp[i].Selected == 1)
            {
                console.log("** NO DDBERIAMOS Deseleccionar "+pp[i].Id)
                objAuditoriaNorma1[objAuditoriaNorma1.length] = pp[i].Id;//test........
            }

                pp[i].Selected = 0;
                console.log("Deseleccionamos "+pp[i].Id)


        }
    }

   // objAuditoriaNorma1[normSel] = objAuditoria[istAud];
    console.log("EL ARRAY ESTA QUEDANDO ASI (",normSel,") = ", objAuditoriaNorma1)
    //fnRequisitosObj();
    //console.log("EL ARRAY ESTA QUEDANDO ASI (",objAuditoria[istAud].Procesos,")")
}


function fnRequisitosObj()
{//************************************************************************************** */
    var n = objAuditoria[istAud].Procesos.length;
    var pp = objAuditoria[istAud].Procesos;
    //console.clear();
    var htnl = "";
    console.log("requisitos##############requisitos###############requisitos#################");

    if(bandera==1)
        objAuditoriaNorma1 = []
    if(bandera==2)
        objAuditoriaNorma2 = []

    for(var i = 0; i<n; i++)
    {
        if(pp[i].Selected == 1)//los que existen los dejo igual  (A)
        {//-------------------------------------------------------------------**********************
            console.log("** proceso a graficar requisitos(",pp[i].Id,")");
            console.log(" (",pp[i].Requisitos,")");
            //los nuevos los agrego (B)
            htnl += fn_cargaRequisitosProceso(pp[i]);
            for(item in pp[i])
            {
                console.log("")
            }
        //    var n = pp[i].Requisitos.length;
        //    for(var j = 0; j<n; j++)
        //     {
        //         console.log("REQUISITO (",j,") = ",pp[i].Requisitos[j])
        //     }

        }//-------------------------------------------------------------------**************************
        else {//fn_ver_siEliminas(pp[i].Id)
        if(pp[i].Selected == 0)
        {//los que existen y no estan en la lista los borro (C)
            console.log("** proceso a NOO graficar o ELIMINAR requisitos(",pp[i].Id,")");
            //alert("pp.id eliminar "+pp[i].Id)

        }}//---------------------------------------------------------------******************************
    }

    if(bandera==1)
       {//alert("entro bandera 1");
        //$("#divContListaProgramacion2").css("display","none");
        //$("#divContListaProgramacion").css("display","block");
        //$("#divContListaProgramacion").html()
        //$("#divContListaProgramacion").html(htnl)//div de norma 1
       }
    if(bandera==2)
    {
        //alert("entro bandera 2");
        //$("#divContListaProgramacion").css("display","none")
        //$("#divContListaProgramacion2").css("display","block")
        //$("#divContListaProgramacion2").html()
       // $("#divContListaProgramacion2").html(htnl)//div de norma 1
    }


    // $("#divContListaProgramacion2").html()
    // $("#divContListaProgramacion2").html(htnl)//div de norma 2

    return htnl
    console.log("requisitos##############requisitos###############requisitos#################");
}//************************************************************************************** */


function fn_cargaResultadosProceso(P)
{//---------
    var htmlRes = "";
    var n = P.Requisitos.length;
    var px = P.Id
    for(var i = 0; i<n; i++)
    {
       //resultados
       var id5 =  "txt-proceso-"+px+"_"+P.Requisitos[i].UnidadNegocioProcesoId
       var id6 =  "txt-requisitos-"+px+"_"+P.Requisitos[i].UnidadNegocioProcesoId
       var id7 =  "txt-norma"+px+"_"+P.Requisitos[i].UnidadNegocioProcesoId

       var id8 =  "sel-tipo_"+px+"_"+P.Requisitos[i].UnidadNegocioProcesoId
       var id9 =  "btn-hallazgo_"+px+"_"+P.Requisitos[i].UnidadNegocioProcesoId
       var id10 =  "txt_hden_hallazgo_"+px+"_"+P.Requisitos[i].UnidadNegocioProcesoId
       //ivv[iv] = item.UnidadNegocioProcesoId;

                    // var vid5  =   P.Requisitos[i].Inicio
                    // var vid6  =   P.Requisitos[i].Hora_Inicio
                    // var vid7  =   P.Requisitos[i].Hora_Fin
                    var vid10 =   P.Requisitos[i].Hallazgo;if(vid10 == null) {vid10 = " "}
                    var vid11 =   Anormas[parseInt(P.Requisitos[i].NormaId)]


       htmlRes += `
             <div class="item-tabla list-border-none" style="font-size: 13px;" >
             <div class="row m-0 justify-content-between align-items-left tbody_trainning" >

                 <div class="col-4 text-left">
                     <div class="list-border ">
                         <input type="text" name="${id5}" id="${id5}" class="date-small" value="${P.Description}">
                     </div>
                 </div>

                 <div class="col-4 text-left">
                     <div class="list-border ">
                         <input type="text" name="${id6}" id="${id6}" class="date-small" value="${P.Requisitos[i].Description}">
                     </div>
                 </div>

                 <div class="col-1 text-center">
                     <div class="list-border ver text-center">
                         <input type="button" name="${id9}" id= "${id9}" class="date-small ver text-center" onclick="cargarHallazgo('${id10}',${P.Requisitos[i].Id})" value="Ver">
                         <input id="${id10}" name="${id10}" type="hidden" style = "display: block;" value="${vid10}" >
                     </div>
                 </div>

                 <div class="col-2 text-left">
                     <div class="list-border" style="width: 100% !important;">
                         <select type="text" name="${id8}" id="${id8}" class="date-small sel-md unicon" style="">
                         ${htmlTipoHallazgo}
                        </select>
                     </div>
                 </div>

                 <div class="col-1 text-left">
                     <div class="list-border">
                         <input type="text" name="${id7}" id="${id7}" class="date-small" value="${vid11}">
                     </div>
                 </div>

             </div>
         </div>

         <script>  $("#${id8}").val('${P.Requisitos[i].TipoHallazgoId}') </script>

         <script>  $("#${id8}").val(0) </script>


         `





        }


     $("#divContListaResultado").append(htmlRes);
console.error(JsReq);
}

var bandera = 1;
function fn_cargaRequisitosProceso(P)//fn_cargaResultadosProceso
{//---------


   //alert(P);
    normSel
    if(bandera==1)
    {
        //objAuditoriaNorma1 = []
        objAuditoriaNorma1.push(P)
        console.log("norma111111111 "+bandera+"-",objAuditoriaNorma1)
    }
    else if(bandera==2)
    {
        objAuditoriaNorma2.push(P)
        console.log("norma222222222 "+bandera+"-",objAuditoriaNorma2)
    }
    var n = P.Requisitos.length;
    if(objAuditoria[istAud].Auditores)// &&(objAuditoria[Id].Auditores.length >= 0)
    {
    listaAuditor = objAuditoria[istAud].htmlOptionAuditor;
    }else{listaAuditor = "<option value = '' > No Hay equipo Asignado</option>";}
    var htmlReq = ""
    var JsReq = ""
    var px = P.Id
    var htmlRes = ""
    //$("#divContListaProgramacion").html('');
    for(var i = 0; i<n; i++)
    {
        // AuditorId: 0
        // CapituloId: 4
        // Code: "4.1"
        // Code_Hallazgo: null
        // Description: "COMPRENSIÓN DE LA EMPRESA Y DE SU CONTEXTO"
        // Description_Hallazgo: null
        // Hallazgo: null
        // Hora_Fin: null
        // Hora_Fin_Real: null
        // Hora_Inicio: null
        // Hora_Inicio_Real: null
        // Id: 2
        // Inicio: "0001-01-01T00:00:00"
        // NormaId: 3
        // ProcesoId: 1
        // TipoHallazgoId: 0
        // Title: "Capitulo"
        // UnidadNegocioProcesoId: 102

        var fechaReq =  document.getElementById("txt_fechaInicioEj").value; //alert(fechaReq);//fecha  inicio de la programacion de esta auditoria
        //var Inix = $('#txt_fechaInicioEj').val()
        //var Finx = $('#txt_fechaFinEj').val()
        var HoraInip = "07:00"; //document.getElementById("myTime").value = "22:53:05";
        var HoraFinp = "08:00";


        var id1 = "txt-proceso_"+px+"_"+i  //proceso
        var id2 =  "txt-capitulo_"+px+"_"+i
        var id3 =  "txt-requisitos_"+px+"_"+i
        var id4 =  "sel-auditores_"+px+"_"+P.Requisitos[i].UnidadNegocioProcesoId
        var id5 =  "txt_date_prog_"+px+"_"+P.Requisitos[i].UnidadNegocioProcesoId
        var id6 =  "txt-hora-inicio_"+px+"_"+P.Requisitos[i].UnidadNegocioProcesoId
        var id7 =  "txt-hora-fin_"+px+"_"+P.Requisitos[i].UnidadNegocioProcesoId


        //resultados
        var id8 =  "sel-tipo_"+px+"_"+P.Requisitos[i].UnidadNegocioProcesoId
        var id9 =  "btn-hallazgo_"+px+"_"+P.Requisitos[i].UnidadNegocioProcesoId
        var id10 =  "txt_hden_hallazgo_"+px+"_"+P.Requisitos[i].UnidadNegocioProcesoId
        //ivv[iv] = item.UnidadNegocioProcesoId;

        //pivv = pivv+"-"+pivv;

        //alert("iv = "+iv);
        if(objcPlanAuditoria[istAud])
        if(objcPlanAuditoria[istAud].PlanId > 0)
             {
                // alert("1427 cargamos los datos de los requisitos y los resultados de los hallazgos");
                //vamos a cargar los datos de los requisitos
                var vid5  =   P.Requisitos[i].Inicio
                var vid6  =   P.Requisitos[i].Hora_Inicio
                var vid7  =   P.Requisitos[i].Hora_Fin
                //var vid10 =   objP.Requisitos[i].Programacion[iv].Hallazgo
             }
             if(!vid5)vid5 = "";
             if(!vid6)vid6 = HoraInip;
             if(!vid7)vid7 = HoraFinp;
             //var pp = objAuditoria[istAud].Procesos;
             htmlReq += `
             <div class="item-tabla list-border-none" style="font-size: 13px;" >
                     <div class="row m-0 justify-content-between align-items-left tbody_trainning" >

                     <div class="col-3 text-left">
                         <div class="list-border ">
                             <input type="text" name="${id1}" id="${id1}" class="date-small" value="${P.Description}">
                         </div>
                     </div>

                     <div class="col-1 text-left">
                         <div class="list-border ">
                             <input type="text" name="${id2}" id="${id2}" class="date-small" value="Capitulo ${P.Requisitos[i].CapituloId}">
                         </div>
                     </div>

                     <div class="col-3 text-left">
                         <div class="list-border">
                             <input type="text" name="${id3}" id="${id3}" class="date-small" value="${P.Requisitos[i].Description}">
                         </div>
                     </div>

                     <div class="col-2 text-right">
                         <div class="list-border">
                             <span class="input-group-addon float-left text-left sel-med " id="sizing-addon2"><img src="./images/iconos/magnifying-glass6.svg"></span>
                             <select type="text" name="${id4}" id="${id4}" class="date-small sel-md unicon" onchange="validaAuditorPlan('${id4}', 80, 10,3, 2, 471)" >
                             ${listaAuditor}
                             </select>
                         </div>
                     </div>

                     <div class="col-1 text-left">
                         <div class="list-border " >
                         <input value = "${fechaReq}" onchange="validaFechaProg('${id5}') " type="text" name="${id5}" id="${id5}" onchange="validaFechaReqPlan('${id5}', 80, 10,3, 2, 471)" class="txt_date_prog date-small" maxlength="10">
                         <span class="input-group-addon float-right text-right" id="sizing-addon2"><img src="./images/iconos/calendario-3.svg" title="Limpiar Fecha" style = "cursor: pointer;"  onclick="$('#${id5}').val('');" ></span>
                         </div>
                     </div>

                     <div class="col-1 text-right">
                         <div class="list-border text-right arreglo">
                             <input   type="time" name="${id6}" id="${id6}" value="${vid6}" onchange="validaHoraPlan('${id6}', 80, 10,3, 2, 471)" class="time date-small" maxlength="10">

                         </div>
                     </div>

                     <div class="col-1 text-right">
                         <div class="list-border arreglo">
                             <input  type="time" name="${id7}" id="${id7}" value="${vid7}"  onchange="validaHoraPlan('${id7}', 80, 10,3, 2, 471)" class="time date-small" maxlength="10">
                         </div>
                     </div>

                 </div>
             </div>



             <script> $("#${id5}").datetimepicker({timepicker:false, format:'d/m/Y'}); </script>
             `

             JsReq += `
             <script> $("#${id5}").datetimepicker({timepicker:false, format:'d/m/Y'}); </script>

              `

//<script> $("#${id5}").datetimepicker({timepicker:false, format:'d/m/Y',minDate:'${fechaReq}'}); </script>

        //      htmlRes += `
        //      <div class="item-tabla list-border-none" style="font-size: 13px;" >
        //      <div class="row m-0 justify-content-between align-items-left tbody_trainning" >

        //          <div class="col-4 text-left">
        //              <div class="list-border ">
        //                  <input type="text" name="txt-proceso-2" id="txt-proceso-2" class="date-small" value="${proceso}">
        //              </div>
        //          </div>

        //          <div class="col-4 text-left">
        //              <div class="list-border ">
        //                  <input type="text" name="txt-requisitos-2" id="txt-requisitos-2" class="date-small" value="${requisito}">
        //              </div>
        //          </div>

        //          <div class="col-1 text-center">
        //              <div class="list-border ver text-center">
        //                  <input type="button" name="${id9}" id= "${id9}" class="date-small ver text-center" onclick="cargarHallazgo('${id10}',${RequisitoId})" value="Ver">
        //                  <input id="${id10}" name="${id10}" type="hidden" style = "display: block;" value="${vid10}" >
        //              </div>
        //          </div>

        //          <div class="col-2 text-left">
        //              <div class="list-border" style="width: 100% !important;">
        //                  <select type="text" name="${id8}" id="${id8}" class="date-small sel-md unicon" style="">
        //                  ${htmlTipoHallazgo}
        //                 </select>
        //              </div>
        //          </div>

        //          <div class="col-1 text-left">
        //              <div class="list-border">
        //                  <input type="text" name="txt-norma" id="txt-norma" class="date-small" value="${normax}">
        //              </div>
        //          </div>

        //      </div>
        //  </div>

        //  `






    }

    //$("#divContListaProgramacion").html('');
    //$("#divContListaProgramacion").html(htmlReq);
    //$("#divContListaProgramacion").append(htmlReq)


   // $("#scriptDataPicker").html('');
   // $("#scriptDataPicker").html(JsReq);



//     $("#divContListaResultado").html('');
//     $("#divContListaResultado").html(htmlRes);
//fn_cargaResultadosProceso(P);
//alert('6254');
return htmlReq;

}//-------------


function fn_cargaRequisitosProcesovv ()
{//------------------------------------------------------------------------------------INICIO CARGA REQUISITOS

   //alert("vamos a recorrer el array general para ver los requisitos de este proceso");
    //vamos a recorrer el array general para ver los requisitos de este proceso
    data.map(function(item)
    {//.................................................recorre ...........

        console.log(item.Description);
            let capitulo ='Capitulo '+ item.ProcesoId;
            let requisito = item.Code+': '+item.Description;
            let RequisitoId = item.Id;
            let reqId = item.Id;
            var listaAuditor;

               console.log("***(",iv,")***************************   DATOS DE MI VECTOR n[",IdAuud,"]   ************************************");
                                           console.log("VECTOR GENERAL(",objAuditoria[istAud],")");
               console.log("***________********************   DATOS DE MI VECTOR   ************************************");
               //alert(objAuditoria[Id].Auditores.length);

               //alert("Buscando los requisitos   de la ausitoria("+Id+")");



             if(objAuditoria[istAud])
               {
                 if(objAuditoria[istAud].Auditores)// &&(objAuditoria[Id].Auditores.length >= 0)
                     {
                     listaAuditor = objAuditoria[istAud].htmlOptionAuditor;
                     }else{listaAuditor = "<option value = '' > No Hay equipo Asignado</option>";}
               }




            //funcion que arma el html pendiente.......####OJO
            let fechaReq =  Inicio_Plan; //alert(fechaReq);//fecha  inicio de la programacion de esta auditoria

            let HoraInip = "07:00:00"; //document.getElementById("myTime").value = "22:53:05";
            let HoraFinp = "08:00:00";




            let id1 = "txt-proceso_"+iv  //proceso
            let id2 =  "txt-capitulo_"+iv
            let id3 =  "txt-requisitos_"+iv
            let id4 =  "sel-auditores_"+item.UnidadNegocioProcesoId
            let id5 =  "txt_date_prog_"+item.UnidadNegocioProcesoId
            let id6 =  "txt-hora-inicio_"+item.UnidadNegocioProcesoId
            let id7 =  "txt-hora-fin_"+item.UnidadNegocioProcesoId


            //resultados
            let id8 =  "sel-tipo_"+item.UnidadNegocioProcesoId
            let id9 =  "btn-hallazgo_"+item.UnidadNegocioProcesoId
            let id10 =  "txt_hden_hallazgo_"+item.UnidadNegocioProcesoId
            ivv[iv] = item.UnidadNegocioProcesoId;

            //pivv = pivv+"-"+pivv;

            //alert("iv = "+iv);
            if(objcPlanAuditoria[istAud])
            if(objcPlanAuditoria[istAud].BDtarea == 1)
                 {
                    // alert("1427 cargamos los datos de los requisitos y los resultados de los hallazgos");
                    //vamos a cargar los datos de los requisitos
                    var vid5  =   objcPlanAuditoria[istAud].Programacion[iv].Inicio
                    var vid6  =   objcPlanAuditoria[istAud].Programacion[iv].Hora_Inicio
                    var vid7  =   objcPlanAuditoria[istAud].Programacion[iv].Hora_Fin
                    var vid10 =   objcPlanAuditoria[istAud].Programacion[iv].Hallazgo

                    //alert(item.UnidadNegocioProcesoId);
                 //    this.UnidadNegocioProcesoId= idl;
                 //alert("fecha("+iv+") = "+vid5);

                 //    this.AuditorId = $("#sel-auditores_"+idl).val()
                 //    this.Inicio =  date1_DD_MM_AAAA_to_AAAA_MM_DD_T_HH_MM_S($("#txt_date_prog_"+idl).val())
                 //    this.Hora_Inicio = document.getElementById("txt-hora-inicio_"+idl).value;
                 //    this.Hora_Fin = document.getElementById("txt-hora-fin_"+idl).value;
                 //    this.TipoHallazgoId = document.getElementById("sel-tipo_"+idl).value;

                 //    this.Hallazgo = document.getElementById("txt_hden_hallazgo_"+idl).value;
                 //    this.Created_By =  getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
                 //    this.Created_Date = now
                 //    this.Last_Updated_By =  getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
                 //    this.Last_Updated_Date = now







                 }

            htmlReq += `
            <div class="item-tabla list-border-none" style="font-size: 13px;" >
                    <div class="row m-0 justify-content-between align-items-left tbody_trainning" >

                    <div class="col-3 text-left">
                        <div class="list-border ">
                            <input type="text" name="${id1}" id="${id1}" class="date-small" value="${proceso}">
                        </div>
                    </div>

                    <div class="col-1 text-left">
                        <div class="list-border ">
                            <input type="text" name="${id2}" id=""${id2}" class="date-small" value="${capitulo}">
                        </div>
                    </div>

                    <div class="col-3 text-left">
                        <div class="list-border">
                            <input type="text" name="${id3}" id="${id3}" class="date-small" value="${requisito}">
                        </div>
                    </div>

                    <div class="col-2 text-right">
                        <div class="list-border">
                            <span class="input-group-addon float-left text-left sel-med " id="sizing-addon2"><img src="./images/iconos/magnifying-glass6.svg"></span>
                            <select type="text" name="${id4}" id="${id4}" class="date-small sel-md unicon" onchange="validaAuditorPlan('${id4}', 80, 10,3, 2, 471)" >
                            ${listaAuditor}
                            </select>
                        </div>
                    </div>

                    <div class="col-1 text-left">
                        <div class="list-border " >
                        <input value = "${vid5}"  onchange="validaFechaProg('${id5}') "  type="text" name="${id5}" id="${id5}" onchange="validaFechaReqPlan('${id5}', 80, 10,3, 2, 471)" class="txt_date_prog date-small" maxlength="10">
                        <span class="input-group-addon float-right text-right" id="sizing-addon2"><img src="./images/iconos/calendario-3.svg" title="Limpiar Fecha" style = "cursor: pointer;"  onclick="$('#${id5}').val('');" ></span>
                        </div>
                    </div>

                    <div class="col-1 text-right">
                        <div class="list-border text-right arreglo">
                            <input  type="time" name="${id6}" id="${id6}" value="${vid6}" onchange="validaHoraPlan('${id6}', 80, 10,3, 2, 471)" class="time date-small" maxlength="10">

                        </div>
                    </div>

                    <div class="col-1 text-right">
                        <div class="list-border arreglo">
                            <input  type="time" name="${id7}" id="${id7}" value="${vid7}"  onchange="validaHoraPlan('${id7}', 80, 10,3, 2, 471)" class="time date-small" maxlength="10">
                        </div>
                    </div>

                </div>
            </div>



            `

            JsReq += `
            <script> $("#${id5}").datetimepicker({timepicker:false, format:'d/m/Y'}); </script>

            `


           //ahora debemos cargar dinamicamente tambien los parametros de los resultados

           htmlRes += `
           <div class="item-tabla list-border-none" style="font-size: 13px;" >
           <div class="row m-0 justify-content-between align-items-left tbody_trainning" >

               <div class="col-4 text-left">
                   <div class="list-border ">
                       <input type="text" name="txt-proceso-2" id="txt-proceso-2" class="date-small" value="${proceso}">
                   </div>
               </div>

               <div class="col-4 text-left">
                   <div class="list-border ">
                       <input type="text" name="txt-requisitos-2" id="txt-requisitos-2" class="date-small" value="${requisito}">
                   </div>
               </div>

               <div class="col-1 text-center">
                   <div class="list-border ver text-center">
                       <input type="button" name="${id9}" id= "${id9}" class="date-small ver text-center" onclick="cargarHallazgo('${id10}',${RequisitoId},${P.Requisitos[i].Id},${indice}+${P.Requisitos[i].Description})" value="Ver">
                       <input id="${id10}" name="${id10}" type="hidden" style = "display: block;" value="${vid10}" >
                   </div>
               </div>

               <div class="col-2 text-left">
                   <div class="list-border" style="width: 100% !important;">
                       <select type="text" name="${id8}" id="${id8}" class="date-small sel-md unicon" style="">
                       ${htmlTipoHallazgo}
                      </select>
                   </div>
               </div>

               <div class="col-1 text-left">
                   <div class="list-border">
                       <input type="text" name="txt-norma" id="txt-norma" class="date-small" value="${normax}">
                   </div>
               </div>

           </div>
       </div>

       `

    iv++;

    })


    //imprimimos el html

    //$("#divContListaProgramacion").html('');
    $("#divContListaProgramacion").html(htmlReq);
   //alert('6472');

    $("#scriptDataPicker").html('');
    $("#scriptDataPicker").html(JsReq);



    //$("#divContListaResultado").html('');
    $("#divContListaResultado").html(htmlRes);
    //$("#txt-hora-fin_0").focus();
    //showLoading();
    //hideLoading();


    bloqueVentaPlanProg = 1

    console.error(JsReq);


}//---------------------------------------------------FIN DE CARGA REQUISITOS------------------------








//$('#btn-17002').removeClass('active2')
//$('#btn-basic').addClass('active2');







var slProcess = `<option selected value='0'>         </option>`;
var slProcess2 = `<option selected value='0'>         </option>`;


/**
 * [cargaProcesosCargoNuevo cargar los procesos de las normas de la auditoria]
 * @param  {[type]} idAuditoria [Id de la Auditoria]
 * @param  {[type]} nNormas     [cantidad de normas]
 * @return {[type]}             [description]
 */
function  cargaProcesosCargoNuevo(idAuditoria, nNormas)
{
    //console.clear();
    let A = idAuditoria;
    //alert("cargaProcesosCargoNuevo("+idAuditoria+", nNormas "+nNormas+")");

    var data = objAuditoria[idAuditoria].Procesos;
    var normas = objAuditoria[idAuditoria].Id_Normas.split(",");
    var NombreNormas = objAuditoria[idAuditoria].Code_Normas.split(",");
    colorMnu = '#05BEEE';//'#34559C';
    colorTxt = 'red';

    colorMnu2 = '#ffffff';
    colorTxt2 = 'color';

    // var n = normas.split(',')
    // console.log('NombreNormas: ',NombreNormas)

    if (normas.length == 1)
    {
        //console.log('Entro en 1')
        $('#lista_procesos_1').html('');

        for(i=0; data.length > i ;i++)
        {
            // $('#Norma1').html("Cargar procesos de la norma "+NombreNormas[0]);
            // $('#lista_procesos_1').append(' <li role="presentation" class="checkbox"><a role="menuitem"  href="#" style="text-decoration: none; color: #000;">'+
            //     ' <input type="checkbox" id="proceso1_'+data[i].Id+'" onclick="verificarCheck(this,'+data[i].Id+','+normas[0]+')" name="proceso1_'+data[i].Id+'" value="proceso1_'+data[i].Id+'" description="Administrador" class="checkbox2">'+
            //     data[i].Description+'</a></li>');
            if (data[i].NormaId == normas[0])
            {
                //console.log('Cargar select 1');
                if(data[i].Cargo)
                {
                    var cc = data[i].Cargo.trim();
                    cc = '.      - ['+cc+']';
                }

                $('#Norma1').html("Cargar procesos de la norma "+NombreNormas[0]);
                //alert("Cargando procesos de la norma1 ("+ A+")")
                $('#lista_procesos_1').append(' <li role="presentation" id="pli_'+data[i].Id+'"  class="checkbox"><a role="menuitem"  href="#" style="text-decoration: none; color: #000;">'+
                   ' <input type="checkbox" id="proceso1_'+data[i].Id+'" onclick="verificarCheck(this,'+data[i].Id+','+normas[0]+')" name="proceso1_'+data[i].Id+'" value="proceso1_'+data[i].Id+'" description="Administrador" idProceso="" class="checkbox2"> '+

                data[i].Description+ '    '+cc+'</a></li>');

                var divRacimoA = crearRacimo(data[i].Id,normas[0])
                var divRacimoAR = crearRacimoResultados(data[i].Id,normas[0])


                $("#divContListaProgramacion").append(divRacimoA)
                $("#divContListaResultado").append(divRacimoAR)

                let idm = "pli_"+data[i].Id;
                $("#"+idm).mouseover(function()
                {
                    document.getElementById(idm).style.backgroundColor = colorMnu;
                    document.getElementById(idm).style.color = colorTxt;
                });


                $("#"+idm).mouseout(function()
                {
                    document.getElementById(idm).style.backgroundColor = colorMnu2;
                    document.getElementById(idm).style.color = colorTxt2;
                });

            }
        }

        $("#btn-basic").html(NombreNormas[0]);
        $("#btn-basic").addClass("btn-prog active2");
        $("#btn-basic").css("visibility", "visible");
        $("#btn-17002").css("visibility", "hidden")
     }
     else if(normas.length == 2)
     {
        //alert("estamos entrando aqui,hay 2 una norma")

        // console.log('Entro en 2')
        $('#lista_procesos_1').html('');
        $('#lista_procesos_2').html('');

        $("#btn-basic").html(NombreNormas[0]);
        $("#btn-basic").addClass("btn-prog active2");
        $("#btn-basic").css("visibility", "visible");

        $("#btn-17002").html(NombreNormas[1]);
        $("#btn-17002").removeClass("btn-prog active2");
        $("#btn-17002").css("visibility", "visibility");

        for(i=0; data.length > i ;i++)
        {

            //alert("Cual es la 2-Norma", data[i].NormaId );

            if (data[i].NormaId == normas[0])
            {
                if(data[i].Cargo)
                {
                    var cc = data[i].Cargo.trim();
                    cc = '.      - ['+cc+']';
                }
                $('#Norma1').html("Cargar procesos de la norma "+NombreNormas[0]);
                $('#lista_procesos_1').append(' <li role="presentation" id="pli_'+data[i].Id+'" class="checkbox"><a role="menuitem"  href="#" style="text-decoration: none; color: #000;">'+
                    ' <input type="checkbox" id="proceso1_'+data[i].Id+'" onclick="verificarCheck(this,'+data[i].Id+','+normas[0]+')" name="proceso1_'+data[i].Id+'" value="proceso1_'+data[i].Id+'" description="Administrador" idProceso="" class="checkbox2"> '+
                    data[i].Description+ '    '+cc+'</a></li>');


                var divRacimoA = crearRacimo(data[i].Id,normas[0])
                var divRacimoAR = crearRacimoResultados(data[i].Id,normas[0])

                //$("#divContListaProgramacion").html()
                //console.warn("divsA ",divRacimoA);
                $("#divContListaProgramacion").append(divRacimoA)
                $("#divContListaResultado").append(divRacimoAR)

                let idm = "pli_"+data[i].Id;
                $("#"+idm).mouseover(function()
                {
                    document.getElementById(idm).style.backgroundColor = colorMnu;
                    document.getElementById(idm).style.color = colorTxt;
                });


                $("#"+idm).mouseout(function()
                {
                    document.getElementById(idm).style.backgroundColor = colorMnu2;
                    document.getElementById(idm).style.color = colorTxt2;
                });

            }
            else
            {
                if (data[i].NormaId == normas[1])
                {

                    if(data[i].Cargo)
                    {
                        var cc = data[i].Cargo.trim();
                        cc = '.      - ['+cc+']';
                    }
                    //console.log('Cargar select 2');
                    $('#Norma2').html("Cargar procesos de la norma "+NombreNormas[1]);
                    $('#lista_procesos_2').append(' <li role="presentation" id="pli2_'+data[i].Id+'" class="checkbox"><a role="menuitem"  href="#" style="text-decoration: none; color: #000;">'+
                        ' <input type="checkbox" id="proceso2_'+data[i].Id+'" onclick="verificarCheck(this,'+data[i].Id+','+normas[1]+')" name="proceso2_'+data[i].Id+'" value="proceso2_'+data[i].Id+'" description="Administrador" class="checkbox2"> '+
                        data[i].Description+ '    '+cc+'</a></li>');


                    var divRacimo = crearRacimo(data[i].Id,normas[1])
                    var divRacimoR = crearRacimoResultados(data[i].Id,normas[1])
                    //console.warn("divs ",divRacimo);
                    //$("#divContListaProgramacion2").html()
                    $("#divContListaProgramacion2").append(divRacimo)
                    $("#divContListaResultado").append(divRacimoR)

                    let idm = "pli2_"+data[i].Id;
                    $("#"+idm).mouseover(function()
                    {
                        document.getElementById(idm).style.backgroundColor = colorMnu;
                        document.getElementById(idm).style.color = colorTxt;
                    });


                    $("#"+idm).mouseout(function()
                    {
                        document.getElementById(idm).style.backgroundColor = colorMnu2;
                        document.getElementById(idm).style.color = colorTxt2;
                    });
                }
            }

        }
     }


}

function crearRacimo(idRacimo,idNorma)
{
    var div = "<div id='racimo_"+idNorma+"_"+idRacimo+"'> "

    div += "</div>"

    return div;
}

function crearRacimoResultados(idRacimo,idNorma)
{
    var div = "<div id='racimoRes_"+idNorma+"_"+idRacimo+"'> "

    div += "</div>"

    return div;
}


function verificarCheck(check, idProceso, idNorma)
{
    //var select =check.attr('checked');
    var divReq = "";
    var divRes = "";

    let selected = false;
    //alert("entro aqui");
    //console.clear();
    //console.error(idProceso, idNorma)
    if( $('#'+check.value).is(':checked')){
        //console.log(" seleccionado "+check.value)
        //console.log(check)
        //alert("Chequeado")
        var n = objAuditoria[istAud].Procesos.length;
        for(var j= 0; j<n; j++)
        {
            if(objAuditoria[istAud].Procesos[j].Id == idProceso && objAuditoria[istAud].Procesos[j].NormaId==idNorma){
                //alert("entro en el")
                divReq = fn_cargaRequisitosProcesoMillan(objAuditoria[istAud].Procesos[j],idProceso)
                divRes = fn_cargaRequisitosProcesoMillanRes(objAuditoria[istAud].Procesos[j],idProceso)
                objAuditoria[istAud].Procesos[j].Selected = 1
                i=n
            }
            //verificamos cuandos procesos hay seleccionados
            if(objAuditoria[istAud].Procesos[j].Selected==1)
                selected++;
        }
        //console.log("divReq",divReq)
        $("#racimo_"+idNorma+"_"+idProceso).append(divReq)
        $("#racimoRes_"+idNorma+"_"+idProceso).append(divRes)

    }
    else
    {
        var n = objAuditoria[istAud].Procesos.length;
        for(var j= 0; j<n; j++)
        {
            if(objAuditoria[istAud].Procesos[j].Id == idProceso && objAuditoria[istAud].Procesos[j].NormaId==idNorma){
                //divReq = fn_cargaRequisitosProcesoMillan(objAuditoria[istAud].Procesos[j],idProceso)
                //divRes = fn_cargaRequisitosProcesoMillanRes(objAuditoria[istAud].Procesos[j],idProceso)
                objAuditoria[istAud].Procesos[j].Selected = 0
                //alert(objAuditoria[istAud].Procesos[j].Selected)
                i=n
            }
            //verificamos cuandos procesos hay seleccionados
            if(objAuditoria[istAud].Procesos[j].Selected==1)
                selected++;
        }
        //console.log("no seleccionado "+check.value)
        //$("#racimo_3_6").html('')
        $("#racimo_"+idNorma+"_"+idProceso).html('')
        $("#racimoRes_"+idNorma+"_"+idProceso).html('')
    }//*/
    //console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&/", objAuditoria[istAud])
    //console.warn("selected: "+selected)
    //console.warn("objAuditoria[istAud]: ",objAuditoria[istAud])

    selected = fnCheckProcesosSelected()

    if(selected) // habilitamos el boton finalizar
    {
        $("#btn-finalizar-plan").attr("disabled", false);
        $("#btn-finalizar-plan").css("background-color", "#34559c");
        $("#lbBtCerrar").css("background-color","#34559c") //
    }
    else // desabilitamos el boton finalizar
    {
        $("#btn-finalizar-plan").attr("disabled", true);
        $("#btn-finalizar-plan").css("background-color", "#858585");
        $("#lbBtCerrar").css("background-color","#858585")
    }

}

var fnCheckProcesosSelected = function()
{
    let selected  = 0;
    let selected2 = 0;
    let result    = false;
    let normasId  = [];
    normasId = objAuditoria[istAud].Id_Normas.split(",")
    //console.log(normasId)
    //console.log(normasId.length)

    var n = objAuditoria[istAud].Procesos.length;
    for(var j= 0; j<n; j++)
    {
        if(objAuditoria[istAud].Procesos[j].Selected == 1 && objAuditoria[istAud].Procesos[j].NormaId==normasId[0]){
            selected++;
        }

        if(normasId.length>1)
            if(objAuditoria[istAud].Procesos[j].Selected == 1 && objAuditoria[istAud].Procesos[j].NormaId==normasId[1]){
                selected2++;
            }
    }

    if( normasId.length == 1 && selected > 0) // cuando es una norma
    {
        result = true
    }
    if( normasId.length == 2 && selected > 0 && selected2 > 0) // cuando son dos normas
    {
        result = true
    }

    return result;
}



function  cargaProcesosCargo(Id6_, nNormas, idBtn)//res[1],'btn-17002'
{//----------------------------------------------------------cargaProcesosCargo--------------------------------ini------------

    //alert("me llaman cuando cambie.............sel_procesoPlan");

    var data = objAuditoria[Id6_].Procesos;
    var select = 'sel_procesoPlan';
    nNormas = parseInt(nNormas)
    normSel = nNormas;
    $("#"+idBtn).addClass("btn-prog active2");
    var cargos = "";

   //  objAuditoriaNorma1[objAuditoriaNorma1.length] = pp[i].Id;
   objAuditoriaNorma1 = []
    var normaN =  $("#"+idBtn).html();
    $("#sel_procesoPlan" ).html("");
    $("#sel_procesoPlan" ).html("<option value='0' description=' ' disabled > [  Seleccione los Procesos para Norma ("+normaN+")  ]</option>")
    data.forEach((Item)=>{
        objAuditoriaNorma1[objAuditoriaNorma1.length] = Item.Id;
        if(Item.NormaId == nNormas)
        {
            var sal = validaTempAtrray(Item.Id)
          //  alert("Procesos para Norma ("+normaN+") = "+Item.Description);
          //objAuditoriaNorma1[normSel] = objAuditoria[istAud];
            if(sal == 1){

                    //console.log('description'+Item.Cargo+' value='+Item.Id)
                    cargos = cargos+Item.Cargo+", ";
                    $("#sel_procesoPlan" ).append(`<option  description='${Item.Cargo}' value='${Item.Id}' onclick="validarProcesos(this.value)"  selected>${Item.Description}</option>`);
                   // document.getElementById('sel_procesoPlan').value = parseInt(Item.Id);
                }
            else
                {
                   //console.log('NO SELECCIONADOS description'+Item.Cargo+' value='+Item.Id)
                    $("#sel_procesoPlan" ).append(`<option  description='${Item.Cargo}' value='${Item.Id}' onclick="validarProcesos(this.value)" >${Item.Description}</option>`);
                }

        }
        // else
        // {

        // }

    })
//console.log("cargaProcesosCargo ",objAuditoriaNorma1,")")

        document.getElementById('txt-administrador').value = cargos;

      //hay que cargar o verificar si ya estan cargados los requisitos en html
      //limpiamos todo

      //cargamos nuevamente la lista
      //cargarRequisitosNew();
      //if(lisBt1[normSel]){cargarRequisitosNew();}



}//----------------------------------------------------------cargaProcesosCargo--------------------------------fin------------




function validarProcesos(idProceso)
{
    //alert(idProceso)
    var fg= getMultipleSelectedValue('sel_procesoPlan').split(",")
        fg.pop();
    console.warn("lisBt1[normSel]",fg,"leng = ",fg.length)

    for(var i = 0; i< fg.length; i++)
    {
           console.log("fg",fg[i])
            if(!document.getElementById("racimo_"+fg[i]))
            {
                console.log("entroooo(",i)
                var div = "<div id='racimo_"+fg[i]+"'> "
                var divRes = "<div id='racimoRes_"+fg[i]+"'> "
                var n = objAuditoria[istAud].Procesos.length;
                for(var j= 0; j<n; j++)
                {
                    if(objAuditoria[istAud].Procesos[j].Id == fg[i]){
                        div += fn_cargaRequisitosProcesoMillan(objAuditoria[istAud].Procesos[j],fg[i])
                        divRes += fn_cargaRequisitosProcesoMillanRes(objAuditoria[istAud].Procesos[j],fg[i])
                       // console.warn("objAuditoria[istAud].Procesos[i]",objAuditoria[istAud].Procesos[i])
                        i=n
                    }
                }

                div += "</div>"
                //console.log("edivvo(",div)
                  // alert(document.getElementById('btn-basic').className);

                if(document.getElementById('btn-17002').className == "btn-formAuditor btn-prog active2")//amarillo
                {
                    $("#divContListaProgramacion2").append(div)

                    //graficar resultados
                      //$("#divContListaResultado").append(divRes);

                }else{//naranja

                    $("#divContListaProgramacion").append(div)
                      //graficar resultados

                }

            }

    }


    //----------------------ahora vamos con los  que no estan seleccionado


    var fg1= getMultipleSelectedValueBizarro('sel_procesoPlan').split(",")
        fg1.pop(fg1)


         for(var i = 0; i< fg1.length-1; i++)
              {
                //alert("entro a a borrar"+document.getElementById("racimo_"+fg1[i]));
                        if(document.getElementById("racimo_"+fg1[i]))
                        {
                        $("#racimo_"+fg1[i]).remove()
                        }
                        else
                        {
                            console.log("entro a qqqq"+document.getElementById("racimo_"+fg1[i]));
                        }
             }


    console.warn("no seleccionados",fg1)

    // if( document.getElementById("racimo_"+idProceso)){
    //         $("#racimo_"+idProceso).remove()
    //      //1) si selecciono y existe  lo remuevo
    //      }

    // if( document.getElementById("racimo_"+idProceso)){
    //     $("#racimo_"+idProceso).remove()
    //     //1) si selecciono y existe  lo remuevo
    // }
    // else{//2) si selecciono y NO existe, entonces lo creamos

    //     var P = objAuditoria[istAud].Procesos
    //     console.error("idProceso",idProceso)
    //     var div = "<div id='racimo_"+idProceso+"'> "

    //     //div += fn_cargaRequisitosProcesoMillan(P,idProceso)
    //     //var pp = objAuditoria[istAud].Procesos;
    //     var n = objAuditoria[istAud].Procesos.length;
    //     for(var i = 0; i<n; i++)
    //     {
    //         if(objAuditoria[istAud].Procesos[i].Id == idProceso){
    //             div += fn_cargaRequisitosProcesoMillan(objAuditoria[istAud].Procesos[i],idProceso)
    //             console.warn("objAuditoria[istAud].Procesos[i]",objAuditoria[istAud].Procesos[i])
    //             i=n
    //         }
    //     }
    //     console.warn("salio del for")
    //     div += "</div>"

    //     //$("#divContListaProgramacion").html('');
    //     $("#divContListaProgramacion").append(div)
    // }

}


var normat = 0;
function fn_cargaRequisitosProcesoMillan(P,idProceso, txt_o_label)//fn_cargaResultadosProceso
{//---------

//alert("fn_cargaRequisitosProcesoMillan");




    console.log("fn_P",P)
    console.log("fn_idProceso",idProceso)
    normSel

    //alert(bandera);

    if(bandera==1)
    {
        objAuditoriaNorma1.push(P)
        console.log("norma111111111**** "+bandera+"-",objAuditoriaNorma1)
        if(normat != parseInt(P.NormaId)){
            //alert('hay un cambio de norma de ('+normat+', A ='+parseInt(P.NormaId));
            if(normat == 0)/// es norma 1
            {
                slProcess = slProcess + `<option value='${P.NormaId}-${P.Id}-${P.Cargo}'  title='${P.Description}' style='font-weight: bold;'>${P.Description}</option>`;
                normat = parseInt(P.NormaId);
            }
            else
            {
                slProcess2 = slProcess2 +  `<option value='${P.NormaId}-${P.Id}-${P.Cargo}'  title='${P.Description}' style='font-weight: bold;'>${P.Description}</option>`;
            }

        }



    }
    else if(bandera==2)
    {
        objAuditoriaNorma2.push(P)
        console.log("norma222222222 "+bandera+"-",objAuditoriaNorma2)
        // slProcess2 = slProcess2 + `<option value='1-${P.NormaId}'  title='${P.Description}' style='font-weight: bold;'>${P.Description}</option>`;
        slProcess2 = slProcess2 +  `<option value='${P.NormaId}-${P.Id}-${P.Cargo}'  title='${P.Description}' style='font-weight: bold;'>${P.Description}</option>`;
    }
    var n = P.Requisitos.length;
    //alert("n "+n)
    if(objAuditoria[istAud].Auditores)// &&(objAuditoria[Id].Auditores.length >= 0)
    {
        listaAuditor = objAuditoria[istAud].htmlOptionAuditor;
    }else{listaAuditor = "<option value = '' > No Hay equipo Asignado</option>";}
    var htmlReq = ""
    var JsReq = ""
    var px = P.Id
    var htmlRes = ""
    //$("#divContListaProgramacion").html('');
    for(var i = 0; i<n; i++)
    {
        // AuditorId: 0
        // CapituloId: 4
        // Code: "4.1"
        // Code_Hallazgo: null
        // Description: "COMPRENSIÓN DE LA EMPRESA Y DE SU CONTEXTO"
        // Description_Hallazgo: null
        // Hallazgo: null
        // Hora_Fin: null
        // Hora_Fin_Real: null
        // Hora_Inicio: null
        // Hora_Inicio_Real: null
        // Id: 2
        // Inicio: "0001-01-01T00:00:00"
        // NormaId: 3
        // ProcesoId: 1
        // TipoHallazgoId: 0
        // Title: "Capitulo"
        // UnidadNegocioProcesoId: 102

        var fechaReq =  document.getElementById("txt_fechaInicioEj").value; //alert(fechaReq);//fecha  inicio de la programacion de esta auditoria
        var HoraInip = "07:00"; //document.getElementById("myTime").value = "22:53:05";
        var HoraFinp = "08:00";

        var indice = P.Requisitos[i].Code + ":"

        var id1 = "txt-proceso_"+px+"_"+i  //proceso
        var id2 =  "txt-capitulo_"+px+"_"+i
        var id3 =  "txt-requisitos_"+px+"_"+i
        var id4 =  "sel-auditores_"+px+"_"+P.Requisitos[i].UnidadNegocioProcesoId


        var id5 =  "txt_date_prog_"+px+"_"+P.Requisitos[i].UnidadNegocioProcesoId


        var id6 =  "txt-hora-inicio_"+px+"_"+P.Requisitos[i].UnidadNegocioProcesoId
        var id7 =  "txt-hora-fin_"+px+"_"+P.Requisitos[i].UnidadNegocioProcesoId



        var vid16 =  P.Requisitos[i].Hora_Inicio_Real
        var vid17 =  P.Requisitos[i].Hora_Fin_Real


        //resultados
        var id8 =  "sel-tipo_"+px+"_"+P.Requisitos[i].UnidadNegocioProcesoId
        var id9 =  "btn-hallazgo_"+px+"_"+P.Requisitos[i].UnidadNegocioProcesoId
        var id10 =  "txt_hden_hallazgo_"+px+"_"+P.Requisitos[i].UnidadNegocioProcesoId
        //ivv[iv] = item.UnidadNegocioProcesoId;

        //pivv = pivv+"-"+pivv;
        console.log("############____________##############_______jiren_____################___________##################");
                console.log("elemento a crear:"+id1);
                console.log("elemento a crear:"+id2);
                console.log("elemento a crear:"+id3);
                console.log("elemento a crear:"+id4);
                console.log("elemento a crear:"+id5);
                console.log("elemento a crear:"+id6);
                console.log("elemento a crear:"+id7);
                console.log("elemento a crear:real_"+id6);
                console.log("elemento a crear:real_"+id7);
                console.log("elemento a crear:"+id8);
                console.log("elemento a crear:"+id9);
                console.log("elemento a crear:"+id10);
        console.log("############____________##############_____jiren_______################___________##################");









        //-------------- vamos a validar si esta finalizado y si ya esta atendido el requerimiento de ser asi lo inahibilitamnos





        //alert("iv = "+iv);
        if(objcPlanAuditoria[istAud])
        if(objcPlanAuditoria[istAud].PlanId > 0)
             {
                // alert("1427 cargamos los datos de los requisitos y los resultados de los hallazgos");
                //vamos a cargar los datos de los requisitos
                var vid5  =   P.Requisitos[i].Inicio
                var vid6  =   P.Requisitos[i].Hora_Inicio
                var vid7  =   P.Requisitos[i].Hora_Fin
                //var vid10 =   objP.Requisitos[i].Programacion[iv].Hallazgo
                if(objAuditoria[istAud].Flag_Finalizado_Plan == 1)
                  { ////vamos a validar si esta finalizado y si ya esta atendido el requerimiento


                    // console.log( 'P.Requisitos[,',i,'].Hora_Inicio_Real : ',P.Requisitos[i].Hora_Inicio_Real)
                    // console.log( 'P.Requisitos[,',i,'].Hora_Fin_Real : ',P.Requisitos[i].Hora_Fin_Real)
                    var tyu  = P.Requisitos[i].Hora_Inicio_Real;
                    var tyu2 = P.Requisitos[i].Hora_Fin_Real;
                    var desxx = "";



                    if(tyu != null)
                    {

                        desxx = "style='pointer-events: none;' readonly";

                    }
                    else
                    {
                        desxx = "style='pointer-events: auto;' ";
                    }


                    //console.log("######################################################################################")
                  }
             }
             if(!vid5)vid5 = "";
             if(!vid6)vid6 = HoraInip;
             if(!vid7)vid7 = HoraFinp;
             //var pp = objAuditoria[istAud].Procesos;

            //  $("#"+id1).attr('disabled',false)
            //  $("#"+id2).attr('disabled',false)
            //  $("#"+id3).attr('disabled',false)
            //  $("#"+id4).attr('disabled',false)
            var reqw = toCapitalize(P.Requisitos[i].Description);

             htmlReq += `
             <div class="item-tabla list-border-none" style="font-size: 13px;" >
                     <div class="row m-0 justify-content-between align-items-left tbody_trainning" >

                     <div class="col-3 text-left"  style="  padding: 0px 8px 0px 0px !important;" >
                         <div class="list-border ">
                             <input style = 'width:100% !important; ' type="text" title = "${P.Description}        Responsable [${P.Cargo}]"  alt = "${P.Description}         Responsable [${P.Cargo}]"  name="${id1}" id="${id1}" class="date-small" value="${P.Description}      [${P.Cargo}]" disabled>
                         </div>
                     </div>

                     <div class="col-1 text-left"  style="  padding: 0px 8px 0px 0px !important;" >
                         <div class="list-border ">
                             <input type="text" name="${id2}" id="${id2}" class="date-small" value="Capitulo ${P.Requisitos[i].CapituloId}" disabled>
                         </div>
                     </div>

                     <div class="col-3 text-left"  style="  padding: 0px 8px 0px 0px !important;" >
                         <div class="list-border">
                             <input  style = ' width:100% !important; ' type="text" name="${id3}" id="${id3}" class="date-small" value="${indice}  ${reqw}" disabled>
                         </div>
                     </div>

                     <div class="col-2 text-right"  style="  padding: 0px 8px 0px 0px !important;" >
                         <div class="list-border">
                             <span class="input-group-addon float-left text-left sel-med " id="sizing-addon2"><img src="./images/iconos/magnifying-glass6.svg"></span>
                             <select type="text" name="${id4}" id="${id4}" class="date-small sel-md unicon" >
                             ${listaAuditor}
                             </select>
                         </div>
                     </div>

                     <div class="col-1 text-left"  style="  padding: 0px 8px 0px 0px !important;" >
                            <div class="list-border " >
                            <input style = "" value = "${fechaReq}" onchange="validaFechaProg('${id5}') " type="text" name="${id5}" id="${id5}" class="txt_date_prog date-small" maxlength="10">
                            <span class="input-group-addon float-right text-right" id="imgCal_${id5}"><img src="./images/iconos/calendario-3.svg" title="Limpiar Fechasss-imgCal${id5}" style = "cursor: pointer;"  onclick="$('#${id5}').val('');" ></span>
                            </div>
                     </div>

                     <div class="col-1 text-right"  style="  padding: 0px 8px 0px 0px !important;" >
                         <div class="list-border text-right arreglo">
                             <input   type="time" name="${id6}" id="${id6}" value="${vid6}" class="time date-small" maxlength="10" ${desxx}>
                             <input type="hidden" name="real_${id6}" id="real_${id6}" value="${vid16}">
                         </div>
                     </div>

                     <div class="col-1 text-right"  style="  padding: 0px 8px 0px 0px !important;" >
                         <div class="list-border arreglo">
                             <input  type="time" name="${id7}" id="${id7}" value="${vid7}" class="time date-small" maxlength="10" ${desxx}>
                             <input type="hidden" name="real_${id7}" id="real_${id7}" value="${vid17}">
                         </div>
                     </div>

                 </div>
             </div>


             <script> $("#${id5}").datetimepicker({timepicker:false, format:'d/m/Y'}); </script>
             `

             JsReq += `
             <script> $("#${id5}").datetimepicker({timepicker:false, format:'d/m/Y'}); </script>

              `
   // <div name="${id5+'_lb'}" id="${id5+'_lb'}" > ${fechaReq}</div>//por si acaso label de la fecha
    }
    //alert('7091');
  // console.log("htmlReq", htmlReq)
return htmlReq;
console.error(JsReq);
}//-------------

function validaFechaProg(idt)
{



     console.log("############################################### VALIDANDO FECHASxx ############################################");

       var fecha1 = $("#"+idt).val();
       var fecha2 = Inix;
       var fecha3 = Finx;


    //    let year1            = moment(fecha1).format('YYYY');//dddd
    //    let month1           = moment(fecha1).format('MM');//
    //    let day1             = moment(fecha1).format('DD');
    //      var f1 = new Date(year1, month1-1, day1);

    var f1 = moment(fecha1,"YYYY-MM-DD");
    var f2 = moment(fecha2,"YYYY-MM-DD");
    var f3 = moment(fecha3,"YYYY-MM-DD");



   // if (momentA > momentB) return 1;


         console.log("new fecha1 = ",f1)
         console.log("new fecha2 = ",f2)
         console.log("new fecha3 = ",f3)

         if((f1 >= f2)&&(f1 <=f3))
         {
             console.log("VALOR PERMITIDO DENTRO DEL RANGO");
         }
         else
         {
            console.log("ERROR! NO PERMITIDO");
            verModalError("Programación de Fecha","<b>Valor fuera del Rango de Ejecución de la Auditoría</b>")
            $("#"+idt).val(fecha2)
         }

      // console.log("(fechaProgramacion =",fecha1," )      vs      (Fecha de Inicio Ejecución = ",fecha2," )")
       //console.log("(fechaProgramacion =",fecha1," )      vs      (Fecha Fin Ejecución = ",fecha3," )")


       //fecha1  debe ser menora >= fecha2

       //fecha 1 debe ser <= fecha fecha3

     console.log("############################################### VALIDANDO FECHASendxx ############################################");

}

function compare_dates(fecha, fecha2)
{
  var xMonth=fecha.substring(3, 5);
  var xDay=fecha.substring(0, 2);
  var xYear=fecha.substring(6,10);
  var yMonth=fecha2.substring(3, 5);
  var yDay=fecha2.substring(0, 2);
  var yYear=fecha2.substring(6,10);
  if (xYear> yYear)
  {
      return(true)
  }
  else
  {
    if (xYear == yYear)
    {
      if (xMonth> yMonth)
      {
          return(true)
      }
      else
      {
        if (xMonth == yMonth)
        {
          if (xDay> yDay)
            return(true);
          else
            return(false);
        }
        else
          return(false);
      }
    }
    else
      return(false);
  }
}

function validaNewFechaFin(idt1, idt2)
{
    //idt1          la fecha inicio

     //idt2         la fecha fin

     //la fecha de fin no puede ser inferior a la de inicio


     console.log("############################################### VALIDANDO FECHAS finyy ############################################");

       var fecha1 = $("#"+idt1).val();
       var fecha2 = $("#"+idt2).val();
       //var fecha3 = Finx;

    //    var part = fecha1.split('/');
    //    let year1            = moment(fecha1).format('YYYY');//dddd
    //    let month1           = moment(fecha1).format('MM');//
    //    let day1             = moment(fecha1).format('DD');
       var f1 = fecha1
       var f2 = fecha2;

    // var f1 = moment(fecha1,"YYYY-MM-DD");
    // var f2 = moment(fecha2,"YYYY-MM-DD");

    // var f1 = new Date(fecha1,"YYYY-MM-DD");
    // var f2 = new Date(fecha2,"YYYY-MM-DD");

    if (compare_dates(fecha1, fecha2)){
        //alert("fecha1 es mayor a fecha2");
           f1 = 1; f2 = 0
      }else{
        //alert("fecha1 es menor a fecha2");
        f1 = 0; f2 = 1
      }

   // if (momentA > momentB) return 1;


         console.log("new fecha1 = ",f1)
         console.log("new fecha2 = ",f2)

         if(f2 >= f1)
         {
             console.log("VALOR PERMITIDO DENTRO DEL RANGO");
         }
         else
         {
            console.log("ERROR! NO PERMITIDO");
            verModalError("Reprogramación de Auditoría","<b>La Fecha final, no puede ser menor a la de inicio, por favor revise.</b>")

            $("#"+idt2).val(fecha1)
         }

      // console.log("(fechaProgramacion =",fecha1," )      vs      (Fecha de Inicio Ejecución = ",fecha2," )")
       //console.log("(fechaProgramacion =",fecha1," )      vs      (Fecha Fin Ejecución = ",fecha3," )")


       //fecha1  debe ser menora >= fecha2

       //fecha 1 debe ser <= fecha fecha3

     console.log("############################################### VALIDANDO FECHAS fin yyy end ############################################");

}



function validaNewFechaIniFinVs_Hoy(idt1, idt2)
{

     console.log("############################################### VALIDANDO FECHAS ############################################");

       var fecha1 = $("#"+idt1).val();
       var fecha11 = $("#"+idt2).val();
       var fecha2  = moment().format('DD/MM/YYYY');
       //alert(fecha2)
    var f1 = moment(fecha1,"YYYY-MM-DD");
    var f11 = moment(fecha11,"YYYY-MM-DD");
    var f2 = moment(fecha2,"YYYY-MM-DD");

         console.log("new fecha1 = ",f1)
         console.log("new fecha2 = ",f2)

         if (compare_dates(fecha1, fecha2)){
            console.log("fecha1 es mayor a fecha2");
               f1 = 1; f2 = 0
          }else{
            console.log("fecha1 es menor a fecha2");
            f1 = 0; f2 = 1
          }


         if(f1 >= f2)
         {
             console.log("VALOR PERMITIDO DENTRO DEL RANGO validaNewFechaIniFinVs_Hoy");
         }
         else
         {
            //console.log("ERROR! NO PERMITIDO");
            verModalError("Reprogramación de Auditoría","<b>La Fecha inicio, no puede ser menor a la fecha actual, por favor revise.</b>")

            $("#"+idt1).val(fecha2)
         }



         console.log("new fecha1 = ",fecha1)
         console.log("new fecha2 = ",fecha11)

         if (compare_dates(fecha1, fecha11)){
            //alert("fecha1 es mayor a fecha2");
               f1 = 1; f11 = 0
          }else{
            //alert("fecha1 es menor a fecha2");
            f1 = 0; f11 = 1
          }

         if(f1 > f11)
         {
            verModalError("Reprogramación de Auditoría","<b>La Fecha inicio, no puede ser mayor a la fecha final, por favor revise.</b>")
            $("#"+idt1).val(fecha2)
         }




     console.log("############################################### VALIDANDO FECHAS ############################################");

}


function fn_cargaRequisitosProcesoMillanRes(P,idProceso)//fn_cargaResultadosProceso
{//---------
    normSel
    if(bandera==1)
    {
        //objAuditoriaNorma1 = []
        objAuditoriaNorma1.push(P)
        console.log("norma111111111 "+bandera+"-",objAuditoriaNorma1)
    }
    else if(bandera==2)
    {
        objAuditoriaNorma2.push(P)
        console.log("norma222222222 "+bandera+"-",objAuditoriaNorma2)
    }
    var n = P.Requisitos.length;
    if(objAuditoria[istAud].Auditores)// &&(objAuditoria[Id].Auditores.length >= 0)
    {
        listaAuditor = objAuditoria[istAud].htmlOptionAuditor;
    }else{listaAuditor = "<option value = '' > No Hay equipo Asignado</option>";}
    var htmlReq = ""
    var JsReq = ""
    var px = P.Id
    var htmlRes = ""
    //$("#divContListaProgramacion").html('');
    for(var i = 0; i<n; i++)
    {
        // AuditorId: 0
        // CapituloId: 4
        // Code: "4.1"
        // Code_Hallazgo: null
        // Description: "COMPRENSIÓN DE LA EMPRESA Y DE SU CONTEXTO"
        // Description_Hallazgo: null
        // Hallazgo: null
        // Hora_Fin: null
        // Hora_Fin_Real: null
        // Hora_Inicio: null
        // Hora_Inicio_Real: null
        // Id: 2
        // Inicio: "0001-01-01T00:00:00"
        // NormaId: 3
        // ProcesoId: 1
        // TipoHallazgoId: 0
        // Title: "Capitulo"
        // UnidadNegocioProcesoId: 102

        var fechaReq =  document.getElementById("txt_fechaInicioEj").value; //alert(fechaReq);//fecha  inicio de la programacion de esta auditoria
        var HoraInip = "07:00"; //document.getElementById("myTime").value = "22:53:05";
        var HoraFinp = "08:00";

        var indice = P.Requisitos[i].Code + ":"

        // var id1 = "txt-proceso_"+px+"_"+i  //proceso
        // var id2 =  "txt-capitulo_"+px+"_"+i
        // var id3 =  "txt-requisitos_"+px+"_"+i
        // var id4 =  "sel-auditores_"+px+"_"+P.Requisitos[i].UnidadNegocioProcesoId
        // var id5 =  "txt_date_prog_"+px+"_"+P.Requisitos[i].UnidadNegocioProcesoId
        // var id6 =  "txt-hora-inicio_"+px+"_"+P.Requisitos[i].UnidadNegocioProcesoId
        // var id7 =  "txt-hora-fin_"+px+"_"+P.Requisitos[i].UnidadNegocioProcesoId


        // //resultados
        // var id8 =  "sel-tipo_"+px+"_"+P.Requisitos[i].UnidadNegocioProcesoId
        // var id9 =  "btn-hallazgo_"+px+"_"+P.Requisitos[i].UnidadNegocioProcesoId
        // var id10 =  "txt_hden_hallazgo_"+px+"_"+P.Requisitos[i].UnidadNegocioProcesoId
        // //ivv[iv] = item.UnidadNegocioProcesoId;

        //pivv = pivv+"-"+pivv;

        //alert("iv = "+iv);


          //resultados
       var id5 =  "txt-proceso-"+px+"_"+P.Requisitos[i].UnidadNegocioProcesoId
       var id6 =  "txt-requisitos-"+px+"_"+P.Requisitos[i].UnidadNegocioProcesoId
       var id7 =  "txt-norma"+px+"_"+P.Requisitos[i].UnidadNegocioProcesoId

       var id8 =  "sel-tipo_"+px+"_"+P.Requisitos[i].UnidadNegocioProcesoId
       var id9 =  "btn-hallazgo_"+px+"_"+P.Requisitos[i].UnidadNegocioProcesoId
       var id10 =  "txt_hden_hallazgo_"+px+"_"+P.Requisitos[i].UnidadNegocioProcesoId
       //ivv[iv] = item.UnidadNegocioProcesoId;

                    var vid5  =   P.Requisitos[i].Inicio
                    var vid6  =   P.Requisitos[i].Hora_Inicio
                    var vid7  =   P.Requisitos[i].Hora_Fin
                    var vid10 =   P.Requisitos[i].Hallazgo;if(vid10 == null) {vid10 = "  "}
                    var vid11 =   Anormas[parseInt(P.Requisitos[i].NormaId)]


        if(objcPlanAuditoria[istAud])
        if(objcPlanAuditoria[istAud].PlanId > 0)
             {
                // alert("1427 cargamos los datos de los requisitos y los resultados de los hallazgos");
                //vamos a cargar los datos de los requisitos
                // var vid5  =   P.Requisitos[i].Inicio
                // var vid6  =   P.Requisitos[i].Hora_Inicio
                // var vid7  =   P.Requisitos[i].Hora_Fin
                //var vid10 =   objP.Requisitos[i].Programacion[iv].Hallazgo
             }
            //  if(!vid5)vid5 = "";
            //  if(!vid6)vid6 = HoraInip;
            //  if(!vid7)vid7 = HoraFinp;
             //var pp = objAuditoria[istAud].Procesos;
             var reqw = toCapitalize(P.Requisitos[i].Description);

             htmlRes += `
             <div class="item-tabla list-border-none" style="font-size: 13px;" >
             <div class="row m-0 justify-content-between align-items-left tbody_trainning" >

                 <div class="col-4 text-left" style="  padding: 0px 8px 0px 0px !important;" >
                     <div class="list-border ">
                         <input style = 'width:100%;' type="text" readonly  title = "${P.Description}"  alt = "${P.Description}"   name="${id5}" id="${id5}" class="date-small" value="${P.Description}">
                     </div>
                 </div>

                 <div class="col-4 text-left" style="  padding: 0px 8px 0px 0px !important;">
                     <div class="list-border ">
                         <input type="text" style = 'width:100%; ' readonly title = "${indice} ${reqw}"  alt = "${indice} ${reqw}"  name="${id6}" id="${id6}"  class="date-small" value="${indice}  ${reqw}">
                     </div>
                 </div>

                 <div class="col-1 text-center" style="  padding: 0px 8px 0px 0px !important;">
                     <div class="list-border ver text-center">
                         <input type="button" name="${id9}" id= "${id9}" title = "Resumen de Hallazgo: ${vid10}" class="date-small ver text-center" onclick="cargarHallazgo('${id10}', '${P.Requisitos[i].Id}', '${indice} ${P.Requisitos[i].Description}')" value="Ver">
                         <input id="${id10}" name="${id10}" type="hidden" style = "display: block;" value="${vid10}" >
                     </div>
                 </div>

                 <div class="col-2 text-left" style="  padding: 0px 8px 0px 0px !important;">
                     <div class="list-border" style="width: 100% !important;">
                         <select type="text" name="${id8}" id="${id8}" class="date-small sel-md unicon" style="">
                         ${htmlTipoHallazgo}
                        </select>
                     </div>
                 </div>

                 <div class="col-1 text-left" style="  padding: 0px 8px 0px 0px !important;">
                     <div class="list-border">
                         <input type="text" alt="${vid11}" title="${vid11}"  name="${id7}" id="${id7}" class="date-small" value="${vid11}">
                     </div>
                 </div>

             </div>
         </div>

         <script>  $("#${id8}").val('${P.Requisitos[i].TipoHallazgoId}') </script>

         <script>  $("#${id8}").val(0) </script>
             `



    }


return htmlRes;
console.error(JsReq);

}//-------------





function pintarRequisitosNew()
{

    dat = lisBt1[normSel].split(",")
    var nb = normSel+"_";
    for (var i = 0; i <dat.length-1 ; i++)
    {
         var a = parseInt(dat[i]);
            //estaenlaListaReq(a);
            sal = validaTempAtrray(a)
            if(sal == 1)
            {
                //console.log('**SELECCIONADO(',normSel,') = ',a)
                //fn_cargaRequisitosProceso (normSel, a);
            }
    }

    //luego que recorro verifico todo los existe para esta norma
    //los que existen los dejo igual  (A)
    //los nuevos los agrego (B)
    //los que existen y no estan en la lista los borro (C)
    var n = objAuditoria[istAud].Procesos.length;
    var pp = objAuditoria[istAud].Procesos;
    objAuditoriaNorma1 = [];
    for(var i = 0; i<n; i++)
    {
       if((normSel == pp[i].NormaId)&&(validaTempAtrray(pp[i].Id) == 1))
        {

          //console.log("hay que poner selected este señor Proceso("+pp[i].NormaId+")("+pp[i].Id+")__________tiene selected = "+pp[i].Selected)
          pp[i].Selected = 1;
          console.log("Ya se puso el Proceso("+pp[i].NormaId+")("+pp[i].Id+")__________tiene selected = "+pp[i].Selected)
          objAuditoriaNorma1[objAuditoriaNorma1.length] = pp[i].Id;
        }else{
            if(pp[i].Selected == 1)
            {
                console.log("** NO DDBERIAMOS Deseleccionar "+pp[i].Id)
                objAuditoriaNorma1[objAuditoriaNorma1.length] = pp[i].Id;//test........
            }

                pp[i].Selected = 0;
                console.log("Deseleccionamos "+pp[i].Id)


        }
    }

   // objAuditoriaNorma1[normSel] = objAuditoria[istAud];
    console.log("EL ARRAY ESTA QUEDANDO ASI (",normSel,") = ", objAuditoriaNorma1)
    return fnRequisitosObj();
    //console.log("EL ARRAY ESTA QUEDANDO ASI (",objAuditoria[istAud].Procesos,")")
}



function getMultipleSelectedValue(id,lb)
{
  var x=document.getElementById(id);
  var sedeD ="";
  var sedeD2 ="";
  for (var i = 0; i < x.options.length; i++) {
     if(x.options[i].selected ==true){
          //alert(x.options[i].value);
          let selectx = document.getElementById(id);
          sedeD = sedeD+$('option:selected', selectx).attr('description')+", ";
          sedeD2 = sedeD2+x.options[i].value+",";
          //lisBt1[normSel] = lisBt1[normSel]+x.options[i].value+"-"
          //validaTempAtrray(x.options[i].value)
      }
  }

  return sedeD2;
}

function getMultipleSelectedValueBizarro(id,lb)
{
  var x=document.getElementById(id);
  var sedeD ="";
  var sedeD2 ="";
  for (var i = 0; i < x.options.length; i++) {
     if(x.options[i].selected ==false){
          //alert(x.options[i].value);
          let selectx = document.getElementById(id);
          sedeD = sedeD+$('option:selected', selectx).attr('description')+", ";
          sedeD2 = sedeD2+x.options[i].value+",";
          //lisBt1[normSel] = lisBt1[normSel]+x.options[i].value+"-"
          //validaTempAtrray(x.options[i].value)
      }
  }

  return sedeD2;
}


function validaTempAtrray(val)
{
  if(lisBt1[normSel])
  {
    dat = lisBt1[normSel].split(",")

   // alert("val("+val+") == Mi Array");
   for (var i = 0; i <dat.length ; i++)
   {
        var a = parseInt(dat[i]);
        if(val == a)
        {
            return 1;
        }
   }
  }


}


function cambiaProcesoPlan()
{  // norma seleccionada normSel

    //alert("ESTA CAMBIANDO LOS PROCESOS");
    idProcesoX = document.getElementById('sel_procesoPlan').value;
    selectx = document.getElementById('sel_procesoPlan');
    sedeD = $('option:selected', selectx).attr('description');

   //alert("a buscar los requisitos de("+sedeD);
    nameProcesoUso[0] = $('option:selected', selectx).text();//colocamos el cargo asociado a el proceso
    let idProceso = $('option:selected', selectx).val();


    lisBt1[normSel] = getMultipleSelectedValue('sel_procesoPlan');
    console.warn("lisBt1[normSel]",lisBt1[normSel])
    //document.getElementById('txt-administrador').value =  lisBt1[normSel]
    //getMultipleSelectedValue('sel_procesoPlan');
    document.getElementById('txt-administrador').value = sedeD

    //tengo que ver mis procesos del array boton1 y del array boton2

    //cargarRequisitosNew();



}
//----------------------------------------------------------cambiaProcesoPlan--------------------------------fin------------


function cargaProgramacionBD()
{
//     var prog = objcPlanAuditoria[istAud];
//     console.log("objAuditoria",objAuditoria[istAud].Procesos);

//    var n = objAuditoria[istAud].Procesos.length;

//     for(ji =0; ji<n; ji++)
//     {


//     //
//     prog.Programacion[ji].UnidadNegocioProcesoId //": 23,
//     prog.Programacion[ji].AuditorId //": 80,
//     prog.Programacion[ji].Inicio //": "2020-11-10",
//     prog.Programacion[ji].Hora_Inicio //": "09:00:00",
//     prog.Programacion[ji].Hora_Fin//": "10:30:00",
//     prog.Programacion[ji].TipoHallazgoId//":1,
//     prog.Programacion[ji].Hallazgo//":"Hallazgo 123",
//     prog.Programacion[ji].Created_By//": "JM",
//     prog.Programacion[ji].Created_Date//": "2020-10-15",
//     prog.Programacion[ji].Last_Updated_By//": "JM",
//     prog.Programacion[ji].Last_Updated_Date//": "2020-10-15"

     //}
}


function fnGuardarPlanAuditoria2()
{//--------------------------------------------confirma que nos va a guardar fnGuardarPlanAuditoria2 ini------------------------------------------

  //$("#splashLoading").show();



  //objcPlanAuditoria[istAud].Programacion = new

  //alert(objcPlanAuditoria[istAud].BDtarea);

      //console.log("UPDATE",objcPlanAuditoria[istAud])
      if(objcPlanAuditoria[istAud].BDtarea == 0)
      {//-----------------------------------------insertar
        //cargaProgramacionBD()

        var data = {
            AuditoriaId: objcPlanAuditoria[istAud].AuditoriaId,
            Detalle:objcPlanAuditoria[istAud].Detalle,
            Alcance:objcPlanAuditoria[istAud].Alcance,
            Inicio :  objcPlanAuditoria[istAud].Inicio,
            Fin : objcPlanAuditoria[istAud].Fin,
            Created_By :objcPlanAuditoria[istAud].Created_By,
            Data_Inicial :objcPlanAuditoria[istAud].Data_Inicial,
            Data_Final :objcPlanAuditoria[istAud].Data_Final,
            Motivo :  objcPlanAuditoria[istAud].Motivo,
            Last_Updated_By : objcPlanAuditoria[istAud].Last_Updated_By,
            Flag_Finalizado : 0,
            Resumen_Auditoria : objcPlanAuditoria[istAud].Resumen_Auditoria,
            Programacion : objcPlanAuditoria[istAud].Programacion
        };




        var url =  apiurlAuditoria+"/api/Post-Plan_Auditoria-All?code=pac7W1TYax/86yT1BJStOIXUuZ0xQ8ETYPEe0bQUjd3R7nSY6grahg==&httpmethod=post";

                    var headers = {
                        apikey: constantes.apiKey,
                        //"Content-Type": "application/json"
                    };
                    $.ajax({
                        method: "POST",
                        timeout: 0,//pendiente no estaba
                        url: url,
                        headers: headers,
                        crossDomain: true,
                        data: JSON.stringify(data),
                        dataType: "json",
                    }).done(function (response) {
                        //console.clear();
                        console.log("Respuesta de insertar = ",response);
                        if((response)&&(response.Id > 0))// $("#splashLoading").show();
                            {
                                $("#btn-confirmar-guardar-plan").html("<b>Guardar</b>")
                                $("#btn-confirmar-guardar-plan").addClass("btn_confirmar_modal bg-green-lime-modal confirm btn-confirmar-guardar-plan btn-blue");
                                $("#btn-confirmar-guardar-plan").attr("disabled",false);


                                $("#modalShowAlertConfirmPlan").removeClass("fade").modal("hide");
                                $("#modalShowAlertConfirmPlanOk").modal("show").addClass("fade");

                                reiniciarValiblesGlobales();
                                vw_auditorias_list_plan.filtroTablaDivsAuditoriasp();
                            }
                        else
                            {
                                $("#btn-confirmar-guardar-plan").html("<b>Guardar</b>")
                                $("#btn-confirmar-guardar-plan").addClass("btn_confirmar_modal bg-green-lime-modal confirm btn-confirmar-guardar-plan btn-blue");
                                $("#btn-confirmar-guardar-plan").attr("disabled",false);
                                //reiniciarValiblesGlobales();
                                //vw_auditorias_list_plan.filtroTablaDivsAuditoriasp();
                                $("#modalShowAlertConfirmPlan").removeClass("fade").modal("hide");
                                verModalError("Crear Plan de Auditoría","<b>Ocurrió un problema al crear el Plan de Auditoría.</b>")
                                //$("#modalShowAlertConfirmPlanOk").modal("show").addClass("fade");//mensajje de error
                            }

                    });

      }
      else
      {
        if(objcPlanAuditoria[istAud].BDtarea == 1)
            {//--------------------------------------/modificar
                //alert(objcPlanAuditoria[istAud].PlanId);
                var data = {
                    Id: objcPlanAuditoria[istAud].PlanId,//pendiente si no es PlanId
                    AuditoriaId: istAud, //objcPlanAuditoria[istAud].AuditoriaId,
                    Detalle:objcPlanAuditoria[istAud].Detalle,
                    Alcance:objcPlanAuditoria[istAud].Alcance,
                    Inicio :  objcPlanAuditoria[istAud].Inicio,
                    Fin : objcPlanAuditoria[istAud].Fin,
                    Created_By :objcPlanAuditoria[istAud].Created_By,
                    Data_Inicial :objcPlanAuditoria[istAud].Data_Inicial,
                    Data_Final :objcPlanAuditoria[istAud].Data_Final,
                    Motivo :  objcPlanAuditoria[istAud].Motivo,
                    Last_Updated_By : objcPlanAuditoria[istAud].Last_Updated_By,
                    Flag_Finalizado : 0,
                    Resumen_Auditoria : objcPlanAuditoria[istAud].Resumen_Auditoria,
                    Programacion : objcPlanAuditoria[istAud].Programacion,
                    Nota: objcPlanAuditoria[istAud].Nota
                };
                    console.log("data => ",data);
                    var Iddv = objcPlanAuditoria[istAud].PlanId;
                    var url =
                    apiurlAuditoria+ "/api/Post-Plan_Auditoria-All?code=pac7W1TYax/86yT1BJStOIXUuZ0xQ8ETYPEe0bQUjd3R7nSY6grahg==&httpmethod=put&Id="+Iddv;

                    var headers = {
                        apikey: constantes.apiKey,
                        //"Content-Type": "application/json"
                    };
                    console.log("url => ",url);
                    $.ajax({
                        method: "POST",
                        timeout: 0,//pendiente no estaba
                        url: url,
                        headers: headers,
                        crossDomain: true,
                        data: JSON.stringify(data),
                        dataType: "json",
                    }).done(function (response) {
                        //console.clear();
                        console.log("Respuesta de MODIFICAR = ",response);
                        if((response)&&(response.Id > 0))// $("#splashLoading").show();
                            {
                                $("#btn-confirmar-guardar-plan").html("<b>Guardar</b>")
                                $("#btn-confirmar-guardar-plan").addClass("btn_confirmar_modal bg-green-lime-modal confirm btn-confirmar-guardar-plan btn-blue");
                                $("#btn-confirmar-guardar-plan").attr("disabled",false);

                                $("#modalShowAlertConfirmPlan").removeClass("fade").modal("hide");
                                $("#modalShowAlertConfirmPlanOk").modal("show").addClass("fade");

                                reiniciarValiblesGlobales();
                                vw_auditorias_list_plan.filtroTablaDivsAuditoriasp();
                            }
                        else
                            {
                                $("#btn-confirmar-guardar-plan").html("<b>Guardar</b>")
                                $("#btn-confirmar-guardar-plan").addClass("btn_confirmar_modal bg-green-lime-modal confirm btn-confirmar-guardar-plan btn-blue");
                                $("#btn-confirmar-guardar-plan").attr("disabled",false);
                                $("#modalShowAlertConfirmPlan").removeClass("fade").modal("hide");
                                verModalError("Guardar Plan de Auditoría","<b>Ocurrió un problema al guardar el Plan de Auditoría.</b>")
                                //$("#modalShowAlertConfirmPlanOk").modal("show").addClass("fade");//mensajje de error
                            }

                    });//*/

            }
      }


}//--------------------------------------------confirma que nos va a guardar --fnGuardarPlanAuditoria2--fin--------------------------------------

let updateNotaAud = function (nota)
{
    if( parseInt(nota.value) > 100 )
    {
        nota.value = 100;
        $("#notaAud").val(nota.value)
    }

    let msj = ObtenerSemaforizacionPlanAuditoria ( parseInt(nota.value) )

    $("#semaforoInputNotaAud").html(`${msj}`)
    // console.error(nota.value)
    objcPlanAuditoria[istAud].Nota = parseInt(nota.value)
    // console.error(objcPlanAuditoria[istAud])
}


// GUARDAR SUSPENSION DE AUDITORIA
function fnGuardarSuspPlanAuditoria(idAud,txt_susp){
    //$("#modalConfirmSuspenderPlan").removeClass("fade").modal("hide");
    //$("#modalConfirmSuspenderPlanOk").addClass("fade").modal("show");
    var created_by = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
    var body={
        Id:          idAud,
        Motivo:      txt_susp,
        Created_By:  created_by
    }

    var url =  apiurlAuditoria+'/api/Post-Auditoria-All?code=l/Ucgq69Kj8Yur7Se2RlCYtWga8XKfd8TuLSma8pYoGnsP/GqJO81g==&httpmethod=suspender';
    var headers ={
        "apikey":constantes.apiKey,
        "Content-Type": "application/json",
    }
    $.ajax({
        method: "POST",
        url:  url,
        data: JSON.stringify(body),
        headers:headers,
        crossDomain: true,
        dataType: "json",
    })
    .done(function(data)
    {
        if (data == 1) {


            $("#btn-confirmar-guardar-susp").html("<b>Confirmar</b>")
            $("#btn-confirmar-guardar-susp").addClass("btn_confirmar_modal bg-green-lime-modal confirm btn-confirmar-guardar-plan btn-blue")
            $("#btn-confirmar-guardar-susp").attr("disabled",false);

            $("#modalConfirmSuspenderPlan").removeClass("fade").modal("hide");
            $("#modalConfirmSuspenderPlanOk").addClass("fade").modal("show");

                reiniciarValiblesGlobales();
                vw_auditorias_list_plan.filtroTablaDivsAuditoriasp();

        }
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
           $("#btn-confirmar-guardar-susp").html("<b>Confirmar</b>")
            $("#btn-confirmar-guardar-susp").addClass("btn_confirmar_modal bg-green-lime-modal confirm btn-confirmar-guardar-plan btn-blue")
            $("#btn-confirmar-guardar-susp").attr("disabled",false);
            verModalError("Suspender Auditoría","<b>Ocurrió un problema al suspender la Auditoría.</b>")
        // swal({
        //     title: "Error",
        //     text:'Error al suspender la auditoria!',
        //     type: "error",
        //     timer:3000,
        //     showCancelButton: false,
        //     confirmButtonClass: "btn-green-lime btn-rounded btn-raised btn-sm",
        //     confirmButtonText: "De acuerdo",
        //     closeOnConfirm: false
        // });

    });//*/

}



//----------------------------------------------------------fnGuardarPlanAuditoria--------------------------------ini------------
function  fnGuardarPlanAuditoria()
{


        //verificamos los datos del formulario objcPlanAuditoria
        objcPlanAuditoria[istAud].leerPlanSendDB();//objcPlanAuditoria[istAud].leerPlanSendDB();

        console.log("***************************** objcPlanAuditoria (", objcPlanAuditoria[istAud],") ***********************************");

        //alert(objcPlanAuditoria[istAud].Flag_Finalizado_Plan);

        if(objAuditoria[istAud].Flag_Finalizado_Plan == 1)
        {

            $("#msgGuardar11x").html(" <b>Se modificar&aacute; el Plan de auditor&iacute;a</b>")
            $("#msgGuardar22x").html("<b>¿ Desea confirmar la modificaci&oacute;n?</b>")
            //document.getElementById('msgGuardar11x').style.setProperty( 'font-size', '18px', 'important' );
            //document.getElementById('msgGuardar22x').style.setProperty( 'font-size', '15px', 'important' );

        }
        else
        {

            $("#msgGuardar11x").html(" <b>Se Guardar&aacute; el Plan de auditor&iacute;a</b>")
            $("#msgGuardar22x").html("<b> Puedes regresar a la bandeja de entrada</b>")
            //document.getElementById('msgGuardar22x').style.setProperty( 'font-size', '15px', 'important' );

        }




        $("#newPlanAuditoriaModal").removeClass("fade").modal("hide");
        $("#modalShowAlertConfirmPlan").modal("show").addClass("fade");
        //swal("Error!", "[ Guardar Plan ] Fallo la Conexion con la Base de Datos.  Intente Nuevamente, (INSERT, SQL-ERROR).", "error")



}
//----------------------------------------------------------fnGuardarPlanAuditoria--------------------------------fin------------


//----------------------------------------------------------fnGuardarPlanAuditoria--------------------------------ini------------
function  fnFinalizarPlanAuditoria()
{
    $("#newPlanAuditoriaModal").removeClass("fade").modal("hide");
    $("#modalShowAlertConfirmPlanFin").modal("show").addClass("fade");
     //verificamos los datos del formulario objcPlanAuditoria
     //objcPlanAuditoria[istAud].leerPlanSendDB();
     objcPlanAuditoria[istAud].leerPlanSendDB();//objcPlanAuditoria[istAud].leerPlanSendDB();

     //console.log("***************************** objcPlanAuditoria (", objcPlanAuditoria,") ***********************************");
//tonytony



}
//----------------------------------------------------------fnGuardarPlanAuditoria--------------------------------fin------------

//----------------------------------------------------------fnGuardarPlanAuditoria--------------------------------ini------------
function  fnFinalizarPlanAuditoria2()
{
    $("#modalShowAlertConfirmPlanFin").removeClass("fade").modal("hide");
    //$("#splashLoading").show();
    if(objcPlanAuditoria[istAud].BDtarea == 1)
    {//--------------------------------------/modificar
        //alert(objcPlanAuditoria[istAud].PlanId);
        var data = {
            Id: objcPlanAuditoria[istAud].PlanId,//pendiente si no es PlanId
            AuditoriaId: istAud, //objcPlanAuditoria[istAud].AuditoriaId,
            Detalle:objcPlanAuditoria[istAud].Detalle,
            Alcance:objcPlanAuditoria[istAud].Alcance,
            //Inicio :  objcPlanAuditoria[istAud].Inicio,
            //Fin : objcPlanAuditoria[istAud].Fin,
            //Created_By :objcPlanAuditoria[istAud].Created_By,
            //Data_Inicial :objcPlanAuditoria[istAud].Data_Inicial,
            //Data_Final :objcPlanAuditoria[istAud].Data_Final,
            //Motivo :  objcPlanAuditoria[istAud].Motivo,
            Last_Updated_By : objcPlanAuditoria[istAud].Last_Updated_By,
            Flag_Finalizado : 1,
            Resumen_Auditoria : objcPlanAuditoria[istAud].Resumen_Auditoria,
            Programacion : objcPlanAuditoria[istAud].Programacion
        };
            console.log("Respuesta= ",data);
           var Iddv = objcPlanAuditoria[istAud].PlanId;
           var url =
           apiurlAuditoria+"/api/Post-Plan_Auditoria-All?code=pac7W1TYax/86yT1BJStOIXUuZ0xQ8ETYPEe0bQUjd3R7nSY6grahg==&httpmethod=put&Id="+Iddv;

            var headers = {
                apikey: constantes.apiKey,
                //"Content-Type": "application/json"
            };
            $.ajax({
                method: "POST",
                timeout: 0,//pendiente no estaba
                url: url,
                headers: headers,
                crossDomain: true,
                data: JSON.stringify(data),
                dataType: "json",
            }).done(function (response) {
                //console.clear();
                console.log("Respuesta de MODIFICAR = ",response);
                if((response)&&(response.Id > 0))// $("#splashLoading").show();
                    {
                        $("#btn-confirmar-guardar-plan-fin").html("<b>Confirmar</b>")
                        $("#btn-confirmar-guardar-plan-fin").addClass("btn_confirmar_modal bg-green-lime-modal confirm btn-confirmar-guardar-plan btn-blue")
                        $("#btn-confirmar-guardar-plan-fin").attr("disabled",false);

                        $("#modalShowAlertConfirmPlanFin").removeClass("fade").modal("hide");//modalShowAlertConfirmPlanFin
                        $("#modalShowAlertConfirmPlanOk").modal("show").addClass("fade");
                        reiniciarValiblesGlobales();
                        vw_auditorias_list_plan.filtroTablaDivsAuditoriasp();
                    }
                else
                    {
                        $("#btn-confirmar-guardar-plan-fin").html("<b>Confirmar</b>")
                        $("#btn-confirmar-guardar-plan-fin").addClass("btn_confirmar_modal bg-green-lime-modal confirm btn-confirmar-guardar-plan btn-blue")
                        $("#btn-confirmar-guardar-plan-fin").attr("disabled",false);

                        $("#modalShowAlertConfirmPlanFin").removeClass("fade").modal("hide");
                        //$("#modalShowAlertConfirmPlanOk").modal("show").addClass("fade");//mensajje de error
                        verModalError("Finalizar Plan de Auditoría","<b>Ocurrió un problema al Finalizar el Plan de Auditoría.</b>")
                    }

            });

    }




    //$("#modalShowAlertConfirmPlanFinalizarOk").modal("show").addClass("fade");//todo fino


}
//--


//----------------------------------------------------------validaAuditorPlan--------------------------------fin------------
function validaAuditorPlan(idHtml, idAuditor, idRequisito,idNorma, idProceso, idAuditoria)
{
//funcion que se dispara en el evento onchage al asignar auditor para verificar un requisito
  console.log("validaAuditorPlan(",idAuditor)


}
 //----------------------------------------------------------validaAuditorPlan--------------------------------fin------------



//----------------------------------------------------------validaHoraPlan--------------------------------fin------------
function validaHoraPlan(idHtml,idAuditor, idRequisito,idNorma, idProceso, idAuditoria)
{
//funcion que se dispara en el evento onchage al asignar auditor para verificar un requisito
  console.log("validaAuditorPlan(",idAuditor)


}
 //----------------------------------------------------------validaHoraPlan--------------------------------fin------------


 //----------------------------------------------------------validaFechaReqPlan--------------------------------fin------------
function validaFechaReqPlan(idHtml,idAuditor, idRequisito,idNorma, idProceso, idAuditoria)
{
//funcion que se dispara en el evento onchage al asignar auditor para verificar un requisito
  console.log("validaAuditorPlan(",idAuditor)


}
 //----------------------------------------------------------validaFechaReqPlan--------------------------------fin------------

 function cargarHallazgo(hddId, xRequisitoId, titleRequisito)
 { //----------------------------------------------------------cargarHallazgo--------------------------------fin------------
    idHiddenHallazgo = hddId;
    $("#textarea-hallazgo").val("");
    $("#modalHallazgo").modal("show").addClass("fade");
    let hall = $("#"+hddId).val()
    //alert(hall);
    $("#textarea-hallazgo").val(hall);


    let textoo = "<b> Hallazgo - "+ titleRequisito +" </b>";//

   $("#divTituloHistorialAuditoriax").html(textoo);
   //$("#divTituloHistorialAuditoriax").val("<b>"+titleRequisito+"</b>");



    // $("#txt_fechaIniPlan").val("");
    // $("#listAuditorPrincipal").html('');

 } //----------------------------------------------------------cargarHallazgo--------------------------------fin------------

function cargaCambioHallazgo()
{

    $("#"+idHiddenHallazgo).val($("#textarea-hallazgo").val())

}












function buscarTiposHallazgos()
{//----------------------------------------------------------buscarTiposHallazgos--------------------------------fin------------


     //console.log("cargaremos los selects de las NORMAS")
     //var apiKeyx = "r$3#23516ewew5";
     var servicio = '/api/Get-Tipo_Hallazgos-All?code=';        //'/api/Get-Tipo_Auditoria-All?code=';
     //var getNormaAll = "QunwZ0j56jljksBrF3QtFYnaou6l7bF8zolp0ZvfXKQEQ5NwPGhHHQ==";
     var metodoHttp = "objectlist";
     var metodoAjax =  "GET";
     //var url = apiurlAuditoria+servicio+GetTipoAuditoriaAll+"&httpmethod="+metodoHttp;
     var url = apiurlAuditoria+"/api/Get-Tipo_Hallazgos-All?code=25N7v0Mdg58fgZCD7e1INz19kNyKivJLgq3Fo5mCz6PL34jg/5UbwA==&httpmethod=objectlist"
     var headers ={
         "apikey":constantes.apiKey
     }

     $.ajax({
         method: metodoAjax,
         url:  url,
         headers:headers,
         crossDomain: true,
         dataType: "json",
     })
     .done(function(data)
     {
         //$("#sel_new_tipo_auditoriap").append("<option value='' disabled selected>                </option>");
         jsonTipoHallazgo=[];

        //  console.log("#######################   buscarTiposHallazgos()     #######################")
        //   console.log(data)
        //  console.log("#######################   buscarTiposHallazgos()     #######################")

         console.log("id_codigo_especialidad_programap "+id_codigo_especialidad_programap)

         htmlTipoHallazgo=`<option Code='Ninguno' value = '0'> Seleccione </option>`;


         data.map(function(item)
         {


            htmlTipoHallazgo +=`<option Code='${item.Code}' value='${item.Id}'>${item.Description}</option>`;

           // console.log(item.Description,"---------------------------------------------xxx = ",item.Id,"htmlTipoHallazgo = ",htmlTipoHallazgo)


            //  console.log("item.Id "+item.Id)
            //  if(  item.Id==3 ){
            //      if(id_codigo_especialidad_programap==3){
            //          //console.log("cargamos el select")
            //          //alert("cargamos en el select legal en ssoma")
            //          $("#sel_new_tipo_auditoriap").append(`<option Code='${item.Code}' value='${item.Id}'>${item.Description}</option>`);
            //          jsonTipoHallazgo.push(item);
            //      }
            //  }else{

            //      $("#sel_new_tipo_auditoriap").append(`<option Code='${item.Code}' value='${item.Id}'>${item.Description}</option>`);
            //      jsonTipoHallazgo.push(item);
            //  }
            //  //$("#sel_new_tipo_auditoriap").append(`<option value='${item.Code}'>${item.Code}</option>`);




         });


     }).fail(function( jqXHR, textStatus, errorThrown ) {
         //showNotification("Por favor Verifique su conexión a internet y vuelva a intentarlo.")
         //console.log(errorThrown)
         $("#sel_new_tipo_auditoriap").hide();
     });



        //  console.log("#######################   buscarTiposHallazgos()     #######################")
        //  console.log(htmlTipoHallazgo)
        //  console.log("#######################   buscarTiposHallazgos()     #######################")
 }//----------------------------------------------------------buscarTiposHallazgos--------------------------------fin------------





 function verModalError(subTitulo, msg)
 {

   //alert("error");
   $('#subTituloError').html(" ")
   $('#subTituloError').html('<b>'+subTitulo+'</b>'); //cerrarModal

   $('#mensajeError').html(" ")
   $('#mensajeError').html('<p>'+msg+'</p>'); //cerrarModal


   cerrarModal('modal-save');
   $('#modalMsgError').css('z-index','9999999');
   $('#modalMsgError').modal('show').addClass('fade');



 }

function verModalError2(subTitulo, msg)
 {

   //alert("error");
   $('#subTituloError2').html(" ")
   $('#subTituloError2').html('<b>'+subTitulo+'</b>'); //cerrarModal

   $('#mensajeError2').html(" ")
   $('#mensajeError2').html('<p>'+msg+'</p>'); //cerrarModal


   cerrarModal('modal-save');
   $('#modalMsgError2').css('z-index','9999999');
   $('#modalMsgError2').modal('show').addClass('fade');



 }




function date1_DD_MM_AAAA_to_AAAA_MM_DD_T_HH_MM_S(fechaBD)
{
  //////prompt("fecha",fechaBD )
   if(fechaBD)
   {
    var startDate   = fechaBD.split("/")
    var year        = startDate[2]
    var month       =  startDate[1]
    var day         =  startDate[0]
    var startDate2   = year +"-"+ month +"-"+ day;
    //var startDate2   = year+pt+month+pt+day
   // prompt(fechaBD+"ahora es =",startDate2 )

    return startDate2;
   }else{ return "0001-01-01"}
}



















function formatDate(date)
{

    var fecha = date.split('T');

    var sep = fecha[0].split('-');

    return sep[2]+'/'+sep[1]+'/'+sep[0];
}
function sortByProperty(property){
    return function(a,b){
        if(a[property] > b[property])
            return 1;
        else if(a[property] < b[property])
            return -1;

        return 0;
    }
}

function openNewTab(ref)
{
    if (ref!="" || ref != null || ref != undefined){
      //  window.open("data:application/octet-stream;charset=utf-16le;base64," + ref, "_blank","toolbar=1, scrollbars=1, resizable=1, width=" + 1015 + ", height=" + 800);
        var x = ref.split(',');
        console.log(x[1])
        let pdfWindow = window.open("")
        pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(ref) + "'></iframe>")
    }else{
        swal("Error","Este Registro no contiene de archivos","error")
    }

}




function reiniciarValiblesGlobales()
{
    LimpiarVentanaPlanAuditoria();
    //Data Pickers en español
    jQuery.datetimepicker.setLocale('es');

     base64SP3 ="";
     base64SP3_BD = '';
     Cargo_AuditorL ="";
     Name_AuditorL ="";
     Sede_L ="";
     FECHA_I ="";
     FECHA_F ="";
     CODENORMA="";
     TIPOAUDITORIA_L="";
    //alert("reiniciamos el moduloito")
    objAuditoria  = [] ;//new AuditorPlan();  //objAuditorPlan[0] = new AuditorPlan();
    //objAuditorPlan.cargarBD('entrando al modulo de Plan de Auditoria');
    objcPlanAuditoria = []// new cPlanAuditoria();//objeto de la clase  cPlanAuditoria, donde se almacenaran los para guardar y modificar en BD
    oPaud = [] //= new cPlanAuditoria();//objeto de la clase  cPlanAuditoria, donde se almacenaran los para guardar y modificar en BD
    banderaBtMod = 0;//en estado guardar 0,     estado mofificar 1   estado desbloquear boton 2
    banderaBtCerrar = 0;//en estado guardar 0,     estado mofificar 1   estado desbloquear boton 2

    normSel; // norma seleccionada en la programacion
    lisBt1 = [];
    lisBt2 = [];
    listReq = [];

    bloqueVentaPlanDg = 0;//te indica si se puede desplegar o no la ventana, siemprre y cuando se hayan cargado los datos necesarios  c= no  , 1 = si
    bloqueVentaPlanProg = 0;//te indica si se puede desplegar o no la ventana, siemprre y cuando se hayan cargado los datos necesarios  c= no  , 1 = si
    istAud = "";//n de auditoria que se esta planificando en el momento
    idHiddenHallazgo = "";//global que contiene el id del campo oculto del hallazgo que se esta editando
    ivv = new Array(); //global que contiene el array UnidadNegocioProcesoId que se editando
    pivv = []
    Anormas = [];
    hhtmk = "";

    objAuditoriaNorma1  = [] ;
    objAuditoriaNorma2  = [] ;
    objResultados  = [] ;



    insertarModificar = 0;//       able que indica laccion en base de datos en relación a los datos del plan  [0 - INSERTAR]    [1 - MODIFICAR]

    tabProgramacion = 0;// indica si se han cargado los datos de el tab de programacionde la auditoria seleccionada   [0 - NO CARGADO]    [1 - CARGADOSSS]
    il = 0; //indice del narray de la auditoria que acualmente se esta planificando
    nNormas = 0; //indica el indice de array de o hasta 1 de normas qie posee la auditoria en edicion o plan valores [0 ó 1]
    nameProcesoUso = [];// de llegarse a sociar a mas de un proceso, debe permitir un array
    selectAuditores = [];//aqui vamos a cargar todo los auditores disponibles para evaluar los requisitos, auditores normales y lideres
    //htmlTipoHallazgo = "";//html para los tipos de aauditorias


    selectProcesos= 0;//aqui si el select de proceso va al servidor para esa auditoria no volver a air
    id_auditoriap;
    nombre_programa_auditoriap;
    id_codigo_especialidad_programap;
    nnormas = [];
//-------------------------------new
    Flag_Completadap           = '';   // flag_completada del programa de auditoria
    StatusIdPAp                = '';   // StatusId del programa de auditoria
    id_auditoriap;
    primeraCargap = 1;
    codeAuditoriap;
    sel_new_normasp            =[];
    normasp                    =[];
    normasTextp                =[];
    normasCodep                =[];
    unidad_auditoriap;
    sede;
    sedeTextp;
    sedeDescriptionp;
    tipo_auditoriap;
    date_start;
    date_end;


    auditor                   =[];


    cant                      =0;
    //jsonUnidadesOrganizativasp =[];
    //jsonSedesp                 =[];
    //jsonNormasp                =[];
    //jsonTipoAuditoriap         =[];
    //jsonTipoHallazgo           =[];
    oTableAuditoriasp;
    cont_auditoriasp           =0;
    datosTablap;
    UnidadNegocio;
    idUnidadNegocioFiltrop;
    idUnidadNegocioNewAuditoriap;
    StatusId;
    DescriptionStatusp;
    auditoriaModificacionLogp  =[];
    auditoriaObservacionpesLogp =[];
    auditoriaObservacionp      ="";
    auditoriaHistorialp        =[];
    hayAuditoriasCorregidasp   = 0;
    hayAuditoriasObservadasp   = 0;
    hayAuditoriasAprobadasp    = 0;
    hayAuditoriasSinEvaluzacionp = 0;
    EstatusEvaluacionIdp         = 0;
    countNormasp = 0;   /////contar las normas selecionadas
    cambiosFechasp = 0 /// contas cuantos cambios de fechas lleva la auditoria
    Evaluador_codep = 0  ///Evaluador_codep codigo de la persona que evalua el programa
    DescriptionEspecialidadp = ""  ///Descripcion de la especialidad


//Sprin3------------------------------------------------------------------------
     personas = [];
     rowCountgPdf = 0;//$('#tbody_trainningInformePdf .item-tabla').length;
     vacios = false;
     NombreAuditorLider = "";
     CargoAuditorLider = "";

     ilo = 0;//variable global contadora de archivos
     LIMITE_ADJ = 10;
     InformeAdj = [];

}



function responsiveAud()
{



  for(var i = 1; i<13; i++)
  {
    var id = 'c'+i+'TabGen';
    id = "#"+id;

    if (screen.width < 1024)
    {
        //if(i == 12)$(id).html('Susp.');
        $(id).css('font-size','10px')
    }
    else
        {
         if (screen.width <= 1280)
           {
            if(i == 12)$(id).html('Suspender');
            $(id).css('font-size','12px')
           }
          else
           {

             $(id).css('font-size','15px')



           }
        }
  }


}





function validarFechaMenorActual(date){
    var x=new Date();
    var fecha = date.split("/");
    x.setFullYear(fecha[2],fecha[1]-1,fecha[0]);
    var today = new Date();

    if (x >= today)
      return false;
    else
      return true;
}


function validaFecha1_Mayor_Fecha2(f1,f2)
{

    // let year0            = moment(Item.Inicio).format('YYYY');//dddd
    // let month0           = moment(Item.Inicio).format('MM');//
    // let day0            = moment(Item.Inicio).format('DD');
    // var fecha = new Date(year0, month0-1, day0-1);




    //     var dias = 30; // Número de días a agregar
    //     fecha.setDate(fecha.getDate() - dias);
    //     //console.info(fecha)


    // let year1            = moment(Item.Inicio).format('YYYY');//dddd
    // let month1           = moment(Item.Inicio).format('MM');//
    // let day1             = moment(Item.Inicio).format('DD');
    // var f1 = new Date(year1, month1, day1);

    // let year2            = moment(fecha).format('YYYY');//dddd
    // let month2           = moment(fecha).format('MM');//
    // let day2             = moment(fecha).format('DD');
    // var f2 = new Date(year2, month2-1, day2);

    // var hoy =  new Date();

    //     if( hoy > f2 )
    //     {

}




function btAceptaConfirmarCambioFecha()
{//******************************************************************************************************************************** */

        //alert('me llamaste chamo');
        console.log('me apretaste 1348');
        document.getElementById('btn-confirmar-fecha').disabled = true;

        $("#btn-confirmar-fecha").attr("disabled",true);
        $("#btn-confirmar-fecha").html("<b>Actualizando....</b>")
        $("#btn-confirmar-fecha").addClass("btn_confirmar_modal bg-green-lime-modal confirm btn-confirmar-guardar-plan btn-blue")
        fnCambiarFechaEjecucionPlanAuditoria(istAud);


}//******************************************************************************************************************************** */

function verificarCambioSiCambioAfectaProgramacion(aio,bio)
{//******************************************************************************************************************************** */

   // alert('entreeeeee')
    var NewFechaIni = aio;
    var NewFechaFin = bio;

    NewFechaIni = moment(NewFechaIni,"YYYY-MM-DD");
    NewFechaFin = moment(NewFechaFin,"YYYY-MM-DD");

    //var f1 = moment(fecha1,"YYYY-MM-DD");
    //var f2 = moment(fecha2,"YYYY-MM-DD");
    //var f3 = moment(fecha3,"YYYY-MM-DD");

         //if((f1 >= f2)&&(f1 <=f3))


    var normas = objAuditoria[istAud].Code_Normas.split(",")
    var idN    = objAuditoria[istAud].Id_Normas.split(",")

    console.log("id normas",idN)

    $("#btn-basic").html(normas[0]);
    $("#btn-17002").html(normas[1]);

    var data = objAuditoria[istAud].Procesos;
    var n    = data.length;

    for(i=0; i<n; i++)
    {
        console.log("i: "+i)


            if(data[i].Selected == 1 &&  data[i].NormaId == parseInt(idN[0]) )
            {


                for(j in data[i].Requisitos){


                    //cargamos los auditores las fechas de inicio de verificación de los requisitos
                    let idd1 = "txt_date_prog_"+data[i].Requisitos[j].ProcesoId+"_"+data[i].Requisitos[j].UnidadNegocioProcesoId;
                    var fechaProgramada = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(data[i].Requisitos[j].Inicio);
                    fechaProgramada = moment(fechaProgramada,"YYYY-MM-DD");

                    if(fechaProgramada < NewFechaIni)
                    {
                           //alert("cambiar la fecha por que es menor");
                            fechaProgramada = NewFechaIni   //pero con el txt
                    }
                    else
                    {
                        if(fechaProgramada > NewFechaFin)
                        {
                               //alert("cambiar la fecha por que es mayor a la final");
                                fechaProgramada = NewFechaFin   //pero con el txt
                        }
                    }






                }//sel-auditores_6_122
            }
            else if(data[i].Selected == 1 &&  data[i].NormaId == parseInt(idN[1]) )
            {

                for(j in data[i].Requisitos){


                     //cargamos los auditores las fechas de inicio de verificación de los requisitos
                     let idd1 = "txt_date_prog_"+data[i].Requisitos[j].ProcesoId+"_"+data[i].Requisitos[j].UnidadNegocioProcesoId;
                     var fechaProgramada = date_AAAA_MM_DD_T_HH_MM_S_to_DD_MM_AAAA(data[i].Requisitos[j].Inicio);
                     fechaProgramada = moment(fechaProgramada,"YYYY-MM-DD");

                     if(fechaProgramada < NewFechaIni)
                     {
                            //alert("cambiar la fecha por que es menor");
                             fechaProgramada = NewFechaIni   //pero con el txt
                     }
                     else
                     {
                         if(fechaProgramada > NewFechaFin)
                         {
                                //alert("cambiar la fecha por que es mayor a la final");
                                 fechaProgramada = NewFechaFin   //pero con el txt
                         }
                     }


                }
            }//*/

    }


}//******************************************************************************************************************************** */
































//***********************************             //15-11-2020 inicio sprint3              ************************************ */

//   $('#btn-Adj').click(function () {
//             $('#modalAdj').modal('show').addClass('fade');
//         });

//         $('#btn-close-Adj').click(function () {
//             $('#modalAdj').modal('hide');
//             $("#Sp3VentanaPdfPreview").modal("show").addClass("fade");
//         });


//15-11-2020 inicio sprint3
function sp3FngeneraInformeAuditoria()
{//**************************************  sp3FngeneraInformeAuditoria    ini    ********************************************* */
    // contador para la cantidad de adjunto de esa auditoria.
    ilo = 0
    console.log("####################################   GENERANDO EL INFORME DE AUDITORIA   #######################################")
    $("#Sp3VentanaPdfPreview").modal("show").addClass("fade");
    //$('#Sp3VentanaPdfPreview').modal({backdrop: 'static', keyboard: false})

    if(objAuditoria[istAud].AdjuntosInforme.length > 0)
    {
        let cant = objAuditoria[istAud].AdjuntosInforme.length
        cant = (cant >= 10 ) ? cant : "0"+cant
        $("#lbMuestraVentanaAdj").html(`Ver Archivos (${cant})`)
    }
    else
    {
        $("#lbMuestraVentanaAdj").html(`Adjuntar Documentos`)
    }

    $("#newPlanAuditoriaModal").modal("hide").removeClass("fade");

    enviarPlanPDF2(istAud);

}//**************************************  sp3FngeneraInformeAuditoria    fin    ********************************************* */


function planPDF()
{

    enviarPlanPDF(istAud);

}






/**
 * [fnSp3ActivaInterfazInformeAuditoria description]
 * @param  {[type]} IdA [description]
 * @return {[type]}     [description]
 */
function fnSp3ActivaInterfazInformeAuditoria(IdA)
{
    //**************************************  fnSp3ActivaInterfazInformeAuditoria    ini    ********************************************* */
    document.getElementById('divContenedorContadorHallazgosInforme').style.display = 'block';
    document.getElementById('contieneResumenAud').style.height = '210px';
    document.getElementById('resumen-auditoria').style.height = '172px';
    //$('divContenedorContadorHallazgosInforme').css('display','block');


    if(objAuditoria[istAud].NoConformidadCritica < 10)
    {
        var numi = '0'+objAuditoria[istAud].NoConformidadCritica;

        if(objAuditoria[istAud].NoConformidadCritica == 0)
        {
            $('#lb_hall1').css('background-color','#EFEFEF').css('color','#c1c1c1')
            $('#sel_hall1').css('background-color','#EFEFEF').css('color','#c1c1c1')
            $('#btSel_hall1').css('background-color','#EFEFEF').css('border-color','#EFEFEF')
        }
        else
        {
            $('#lb_hall1').css('background-color','#C5CF55').css('color','#3A3E16')
            $('#sel_hall1').css('background-color','#C5CF55').css('color','#3A3E16')
            $('#btSel_hall1').css('background-color','#C5CF55').css('border-color','#C5CF55')
        }
    }
    else
    {
        var numi = '';
    }

    $('#lb_hall1').html(" ");  $('#lb_hall1').html("<b>:"+ numi +"</b> ");

    //---------------------------------------------------------------------------------------------------

    if(objAuditoria[istAud].NoConformidadMayor < 10)
    {
        var numi = '0'+objAuditoria[istAud].NoConformidadMayor;

        if(objAuditoria[istAud].NoConformidadMayor == 0)
        {
            $('#lb_hall2').css('background-color','#EFEFEF').css('color','#c1c1c1')
            $('#sel_hall2').css('background-color','#EFEFEF').css('color','#c1c1c1')
            $('#btSel_hall2').css('background-color','#EFEFEF').css('border-color','#EFEFEF')
        }
        else
        {
            $('#lb_hall2').css('background-color','#C5CF55').css('color','#3A3E16')
            $('#sel_hall2').css('background-color','#C5CF55').css('color','#3A3E16')
            $('#btSel_hall2').css('background-color','#C5CF55').css('border-color','#C5CF55')
        }
    }
    else
    {
        var numi = '';
    }

    $('#lb_hall2').html(" ");  $('#lb_hall2').html("<b>:"+ numi +"</b> ");

    //---------------------------------------------------------------------------------------------------

    if(objAuditoria[istAud].NoConformidadMenor < 10)
    {
        var numi = '0'+objAuditoria[istAud].NoConformidadMenor;

        if(objAuditoria[istAud].NoConformidadMenor == 0)
        {
            $('#lb_hall3').css('background-color','#EFEFEF').css('color','#c1c1c1')
            $('#sel_hall3').css('background-color','#EFEFEF').css('color','#c1c1c1')
            $('#btSel_hall3').css('background-color','#EFEFEF').css('border-color','#EFEFEF')
        }
        else
        {
            $('#lb_hall3').css('background-color','#C5CF55').css('color','#3A3E16')
            $('#sel_hall3').css('background-color','#C5CF55').css('color','#3A3E16')
            $('#btSel_hall3').css('background-color','#C5CF55').css('border-color','#C5CF55')
        }
    }
    else
    {
        var numi = '';
    }

    $('#lb_hall3').html(" ");  $('#lb_hall3').html("<b>:"+ numi +"</b> ");

    //---------------------------------------------------------------------------------------------------
    if(objAuditoria[istAud].Observaciones < 10)
    {
        var numi = '0'+objAuditoria[istAud].Observaciones;

        if(objAuditoria[istAud].Observaciones == 0)
        {
            $('#lb_hall4').css('background-color','#EFEFEF').css('color','#c1c1c1')
            $('#sel_hall4').css('background-color','#EFEFEF').css('color','#c1c1c1')
            $('#btSel_hall4').css('background-color','#EFEFEF').css('border-color','#EFEFEF')
        }
        else
        {
            $('#lb_hall4').css('background-color','#C5CF55').css('color','#3A3E16')
            $('#sel_hall4').css('background-color','#C5CF55').css('color','#3A3E16')
            $('#btSel_hall4').css('background-color','#C5CF55').css('border-color','#C5CF55')
        }
    }
    else
    {
        var numi = '';
    }

    $('#lb_hall4').html(" ");  $('#lb_hall4').html("<b>:"+ numi +"</b> ");
   //---------------------------------------------------------------------------------------------------

    if(objAuditoria[istAud].OportunidadMejora < 10)
    {
        var numi = '0'+objAuditoria[istAud].OportunidadMejora;

        if(objAuditoria[istAud].OportunidadMejora == 0)
        {
            $('#lb_hall5').css('background-color','#EFEFEF').css('color','#c1c1c1')
            $('#sel_hall5').css('background-color','#EFEFEF').css('color','#c1c1c1')
            $('#btSel_hall5').css('background-color','#EFEFEF').css('border-color','#EFEFEF')
        }
        else
        {
            $('#lb_hall5').css('background-color','#C5CF55').css('color','#3A3E16')
            $('#sel_hall5').css('background-color','#C5CF55').css('color','#3A3E16')
            $('#btSel_hall5').css('background-color','#C5CF55').css('border-color','#C5CF55')
        }
    }
    else
    {
        var numi = '';
    }

    $('#lb_hall5').html(" ");  $('#lb_hall5').html("<b>:"+ numi +"</b> ");

    if(objAuditoria[istAud].Conformidad < 10)
    {
        var numi = '0'+objAuditoria[istAud].Conformidad;

        if(objAuditoria[istAud].Conformidad == 0)
        {
            $('#lb_hall6').css('background-color','#EFEFEF').css('color','#c1c1c1')
            $('#sel_hall6').css('background-color','#EFEFEF').css('color','#c1c1c1')
            $('#btSel_hall6').css('background-color','#EFEFEF').css('border-color','#EFEFEF')
        }
        else
        {
            $('#lb_hall6').css('background-color','#C5CF55').css('color','#3A3E16')
            $('#sel_hall6').css('background-color','#C5CF55').css('color','#3A3E16')
            $('#btSel_hall6').css('background-color','#C5CF55').css('border-color','#C5CF55')
        }
    }
    else
    {
        //alert('entre aqui');
        var numi = objAuditoria[istAud].Conformidad;
    }

    $('#lb_hall6').html(" ");  $('#lb_hall6').html("<b>:"+ numi +"</b> ");

}
//**************************************  fnSp3ActivaInterfazInformeAuditoria    fin    ********************************************* */


function Sp3fnMostrarVentanaListaEnvioPDF()
{//**********************  Sp3fnMostrarVentanaListaEnvioPDF    ini    *************************************** */

console.log("####################################  ENVIAR INFORME -VENTANA AUDITORIA (",istAud,")   #######################################")
    $("#modalEnviarInformePdf").modal("show").addClass("fade");
    $("#Sp3VentanaPdfPreview").modal("hide").removeClass("fade");

    //////////jesus/////////////////
    //Actualizar Token de seguridad
    vw_principal.init();

    $("#variableInformePdf").html("00")
    $("#plan-auditoriaInformePdf").html(objAuditoria[istAud].Code)

    rowCount2_Pdf = 0;
    $("#tbody_trainningInformePdf").html('');

    //////////jesus/////////////////

}//**********************  Sp3fnMostrarVentanaListaEnvioPDF    fini    *************************************** */

//////////jesus///////////////// OBTENER DATA PARA ENVIAR EL INFORME DE AUDITORIA
var personas = [];
var rowCountgPdf = 0;//$('#tbody_trainningInformePdf .item-tabla').length;
var vacios = false;
var NombreAuditorLider = "";
var CargoAuditorLider = "";
function Sp3fnMostrarVentanaAprobarEnvioInformePDF()
{

    if($('#tbody_trainningInformePdf .item-tabla').length>0){
        //alert("click levantar modal para enviar informe "+rowCount2_Pdf)
        //$('#guardarAsistentes').prop('disabled',true);
        personas = [];
        rowCountgPdf = rowCount2_Pdf;//$('#tbody_trainningInformePdf .item-tabla').length;
        vacios = false;
        NombreAuditorLider = "";
        CargoAuditorLider = "";
        //console.log("Numero -----",rowCountgPdf)
        // variables
        for (var i = 1; i <= rowCountgPdf; i++) {

            if($('#hid_Name_id_'+i).val() != "" && $('#hid_Name_id_'+i).val() != undefined ) //|| $('#hid_Name_id_'+i).val() == null || $('#hid_Name_id_'+i).val() == undefined
            {
                var Nombres     = $('#Name_'+i).val();
                var Cargo       = $('#Cargo_'+i).val();
                var UserIdHash  = $('#hid_Name_id_'+i).val();
                var Correo      = $('#Correo_'+i).val();
                personas.push({
                   "UserIdHash":  UserIdHash,
                   "Name":        Nombres,
                   "Cargo":       Cargo,
                   "Correo":      Correo,
                });
            }else if ($('#hid_Name_id_'+i).val() == ""){
                //console.log("uno vacio")
                vacios = true;
            }

        }

        if(vacios)
        {
            verModalError('Enviar Informe de Auditoría', 'Tienes campos vacios, Debes Ingresar todos los destinatarios.');
        }else{
            /////levantar modal para confirmar el envio de informe
            $("#modalConfirmarEnviarInformeAuditoria").modal("show").addClass("fade");
            $("#modalEnviarInformePdf").modal("hide").removeClass("fade");
            for (item in objAuditoria[istAud].AuditoresPDF) {
                if(objAuditoria[istAud].AuditoresPDF[item].Selected>0 && objAuditoria[istAud].AuditoresPDF[item].Tipo_Id==1)
                {
                    NombreAuditorLider = objAuditoria[istAud].AuditoresPDF[item].Name;
                    CargoAuditorLider = objAuditoria[istAud].AuditoresPDF[item].Cargo;
                }
            }
            //console.log("Auditor lider ",NombreAuditorLider,CargoAuditorLider)
        }
    }else{
        verModalError('Enviar Informe de Auditoría', 'Debes agregar un ( 1 ) destinatario como mínimo');
    }
}

// MODAL PARA CONFIRMAR EL ENVIO DEL INFORME DE AUDITORIA
function confirmSendInformeAuditoria()
{
    // BLOQUEAR BOTONES Y CAMBIAR EL LABEL
    $("#btn_enviar_informe_auditoria").html("<b>Enviando...</b>")
    $("#btn_enviar_informe_auditoria").addClass("btn_confirmar_modal bg-green-lime-modal confirm btn-confirmar-guardar-plan btn-blue");
    $("#btn_enviar_informe_auditoria").attr("disabled",true);
    $("#btn_cancelar_informe_auditoria").attr("disabled",true);

    fnEnviarInformeAuditoria();
}//*/

// CONSUMIR SERVICIO PARA EL ENVIO DEL INFORME DE AUDITORIA
function fnEnviarInformeAuditoria()
{
    showLoading()
    $("#modalConfirmarEnviarInformeAuditoria").modal("hide").removeClass("fade");
    let Created_By  = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
    let AuditoriaId = istAud;
    var body = {
        "AuditoriaId":  AuditoriaId,
        "InformePdf":   base64SP3,
        "Created_By":   Created_By,
        "NombreAuditorLider": NombreAuditorLider,
        "CargoAuditorLider": CargoAuditorLider,
        "CorreoAuditorLider": getCookie("vtas_internal_useruser"+sessionStorage.tabVisitasa),
        "Personas": personas,

    }
    console.log("Body---",body);
    //https://550m44ud1tmg7454-audit-dev.azurewebsites.net/api/Post-Informe_Auditoria-All?code=nYeLJsvtWIYAXJhGOnC7lAXYrqmuxDKLJKl2zBLNJHNbrzxptaLmrQ==&httpmethod=post
    var url = apiurlAuditoria+"/api/Post-Informe_Auditoria-All?code=nYeLJsvtWIYAXJhGOnC7lAXYrqmuxDKLJKl2zBLNJHNbrzxptaLmrQ==&httpmethod=post";
    // GUARDAR
    var headers ={
       "apikey":constantes.apiKey,
       "Content-Type": "application/json",
    }

    $.ajax({
        method: 'POST',
        url:  url,
        headers:headers,
        data: JSON.stringify(body),
        crossDomain: true,
        dataType: "json",
    }).done(function (data) {

        console.log(data);
        fnEnviarInformeAuditoriaOk()

    })
    .fail(function( jqXHR, textStatus, errorThrown ) {

        verModalError('Al intentar enviar el Informe de Auditoría', 'Consulte con los administradores del sistema');
    })
    .always(function( jqXHR, textStatus, errorThrown ) {
        //desbloquear botones
        $("#btn_enviar_informe_auditoria").html("<b>Confirmar</b>")
        //$("#btn_enviar_informe_auditoria").addClass("btn_confirmar_modal bg-green-lime-modal confirm btn-confirmar-guardar-plan btn-blue");
        $("#btn_enviar_informe_auditoria").attr("disabled",false);
        $("#btn_cancelar_informe_auditoria").attr("disabled",false);
        hideLoading()
    });

}

// MOSTRAR MODAL EXITO EN ENVIO DE INFORME DE AUDITORIA - OCULTAR MODAL CONFIRMAR ENVIO DE INFORME DE AUDITORIA
function fnEnviarInformeAuditoriaOk()
{
    reiniciarValiblesGlobales();
    vw_auditorias_list_plan.filtroTablaDivsAuditoriasp();
    $("#modalEnviarInformeAuditoriaOk").modal("show").addClass("fade");

}
//////////jesus/////////////////



function sp3FnMuestraInformeAuditoriaPdf()
{//**********************  sp3FnMuestraInformeAuditoriaPdf    ini    *************************************** */

    console.log("#######################  MUESTRA VENTANA DE ADJUNTAR PARA LA AUDITORIAxxx (",istAud,")   ##########################")
    //$('#modalAdj').modal('show').addClass('fade');

    $("#modalAdj").modal("show").addClass("fade");
    $("#Sp3VentanaPdfPreview").modal("hide").removeClass("fade");

    console.warn("istAud", istAud, objAuditoria[istAud])
    // limpiamos el listado de adjuntos
    $('#divContieneAdjuntos').html('')
    if(objAuditoria[istAud].AdjuntosInforme.length > 0)
    {
        let cant = objAuditoria[istAud].AdjuntosInforme.length
        cant = (cant >= 10 ) ? cant : "0"+cant
        $("#lbMuestraVentanaAdj").html(`Ver Archivos (${cant})`)
        sp3CargarListadoAdjuntosInforme()
    }

}//**********************  sp3FnMuestraInformeAuditoriaPdf    dini    *************************************** */

/**
 * [sp3CargarListadoAdjuntosInforme listar los archivos adjutnos del informe de la auditoria]
 * @return {[type]} [description]
 */
var sp3CargarListadoAdjuntosInforme = function ()
{
    // body...
    // let adjuntos= `
    //     <table width="100%" border='0' id="adjInforme${ilo}">
    //         <tr>
    //             <td width='10%'>
    //                 <img src='./images/iconos/${extAdj}.png' title = "${filenamme}" class='png' style="cursor: pointer; width:22px; height: 22px;" >
    //             </td>

    //             <td width='82%'>
    //                 <div style=" padding: 10px 10px;" style="font-size: 15px;" class="item-text text-left" title = "${filenamme}">
    //                     <input title = "${filenamme}" id='nameAdjInforme${ilo}' style=" cursor: pointer;  font-size: 14px; background-color:#fff; color:#c3c3c3; border:0px; background-color:#fff;  width: 200px;" type="text" value="${filenamme}">
    //                 </div>
    //         </td>

    //         <td width='3%'>
    //                 <img src='./images/iconos/loadingAdj.gif' id='loadingAdj${ilo}' title = "Por Favor Espere, Adjuntando ....... ${filenamme}" class='png' style="cursor: pointer; width:18px; height: 18px;" >
    //             </td>

    //         <td width='5%'>
    //         <input  type="hidden" value="" id="delAdjInforme${ilo}" >
    //                 <div>
    //                     <button onclick="sp3FnBorrraAdjInforme('adjInforme${ilo}',${ilo},'${filenamme}')" type='button' id="btDelAdj${ilo}"
    //                         class='delete btn-circle border-0' title = "Eliminar (${filenamme})"
    //                         style='cursor: pointer; width: 25px; height: 25px; background-color:#C3C3C3; /*background-color: #ff6767;*/'>
    //                         <img src='./images/iconos/Pathcan.svg' style=' width: 16px; height: 16px;' >
    //                     </button>
    //                 </div>


    //         </td>
    //         </tr>
    //     </table>
    // `

    //let ilo = 0

    objAuditoria[istAud].AdjuntosInforme.forEach(function (item)
    {
        console.warn("item -> ",item)
        var ext = item.AdjuntoName.split('.')
        console.warn("ext -> ",ext)
        let adjunto = `
            <table width="100%" border='0' id="adjInforme${ilo}">
                <tr>
                    <td width='10%'>
                        <img src='./images/iconos/.${ext[1]}.png' title = "${item.AdjuntoName}" class='png' style="cursor: pointer; width:22px; height: 22px;" >
                    </td>
                    <td width='82%'>
                        <div style=" padding: 10px 10px;" style="font-size: 15px;" class="item-text text-left" title = "${item.AdjuntoName}">
                            <input title = "${item.AdjuntoName}" id='nameAdjInforme${ilo}' style="cursor: pointer; font-size: 14px; color: rgb(0, 0, 0); border: 0px; background-color: rgb(255, 255, 255); width: 200px;" type="text" value="${item.AdjuntoName}">
                        </div>
                    </td>
                    <td width='3%'>
                        <img src='./images/iconos/loadingAdj.gif' id='loadingAdj${ilo}' title = "Por Favor Espere, Adjuntando ....... ${item.AdjuntoName}" class='png' style="cursor: pointer; width:18px; height: 18px; display: none;" >
                    </td>
                    <td width='5%'>
                        <input  type="hidden" value="${item.Id}" id="delAdjInforme${ilo}" >
                        <div>
                            <button onclick="sp3FnBorrraAdjInforme('adjInforme${ilo}',${ilo},'${item.AdjuntoName}')" type='button' id="btDelAdj${ilo}"
                                class='delete btn-circle border-0' title = "Eliminar (${item.AdjuntoName})"
                                style='cursor: pointer; width: 25px; height: 25px; /*background-color:#C3C3C3;*/ background-color: #ff6767;'>
                                <img src='./images/iconos/Pathcan.svg' style=' width: 16px; height: 16px;' >
                            </button>
                        </div>

                    </td>
                </tr>
            </table>
        `

        $('#divContieneAdjuntos').append(adjunto);
        ilo++
    })

}


function openNewTab2(ref)
{
    if (ref!="" || ref != null || ref != undefined){
      //  window.open("data:application/octet-stream;charset=utf-16le;base64," + ref, "_blank","toolbar=1, scrollbars=1, resizable=1, width=" + 1015 + ", height=" + 800);
        var x = ref.split(',');
        console.log(ref)
      // let pdfWindow = document.getElementById('divPreviewPdf');
        //$('#divPreviewPdf').html("<embed src='data:application/pdf;base64," + x[1] + " ' width='100%' type='application/pdf'>")
        // <embed src='data:application/pdf;base64,' + encodeURI(ref) + '  ' width='100%' type='application/pdf'>
      // pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(x[1]) + "'></iframe>")

      let pdfWindow = window.open("")
      pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(x[1]) + "'></iframe>")



    }else{
        swal("Error","Este Registro no contiene de archivos","error")
        verModalError("Mostrar Plan PDF ", 'Este contenido no se puede Mostrar')
    }

}


//---------------------------- @anochecasa de la noche para la mañana ---------------------------
// $('#btn_file_trainningSp3').click(function(){
//     $('#file_trainningSp3').trigger('click');

// });


function sp3FnvalidaExtensionAdjunto(filePath)
{//--------------------------ini--     sp3FnvalidaExtensionAdjunto    ------------------------

           //........pdf
           var allowedExtensions = /(.pdf)$/i;
            if(allowedExtensions.exec(filePath)){
                return '.pdf';
            }//........pdf

            //........word-doc
            var allowedExtensions = /(.doc)$/i;
            if(allowedExtensions.exec(filePath)){
                return '.doc';
            } //........word-doc

            //........word-docx
            var allowedExtensions = /(.docx)$/i;
            if(allowedExtensions.exec(filePath)){
                return '.docx';
            } //........word-doc

            //........word-xls
            var allowedExtensions = /(.xls)$/i;
            if(allowedExtensions.exec(filePath)){
                return '.xls';
            } //........word-doc

             //........word-ods
             var allowedExtensions = /(.ods)$/i;
             if(allowedExtensions.exec(filePath)){
                 return '.ods';
             } //........word-ods

            //........word-xlsx
            var allowedExtensions = /(.xlsx)$/i;
            if(allowedExtensions.exec(filePath)){
                return '.xlsx';
            } //........word-doc

             //........ppt
             var allowedExtensions = /(.ppt)$/i;
             if(allowedExtensions.exec(filePath)){
                 return '.ppt';
             } //........ppt

             //........word-ppt
             var allowedExtensions = /(.pptx)$/i;
             if(allowedExtensions.exec(filePath)){
                 return '.pptx';
             } //........word-pptx

             //........word-pps
             var allowedExtensions = /(.pps)$/i;
             if(allowedExtensions.exec(filePath)){
                 return '.pps';
             } //........word-pps

              //........word-ppsx
              var allowedExtensions = /(.ppsx)$/i;
              if(allowedExtensions.exec(filePath)){
                  return '.ppsx';
              } //........word-ppsx



            //........word-odp
            var allowedExtensions = /(.odp)$/i;
            if(allowedExtensions.exec(filePath)){
                return '.odp';
            } //........word-odp

            //........word-odt
            var allowedExtensions = /(.odt)$/i;
            if(allowedExtensions.exec(filePath)){
                return '.odt';
            } //........word-odt

            //........word-jpg
            var allowedExtensions = /(.jpg)$/i;
            if(allowedExtensions.exec(filePath)){
                return '.jpg';
            } //........word-jpg

            //........word-jpeg
            var allowedExtensions = /(.jpeg)$/i;
            if(allowedExtensions.exec(filePath)){
                return '.jpeg';
            } //........word-jpg

            //........word-png
            var allowedExtensions = /(.png)$/i;
            if(allowedExtensions.exec(filePath)){
                return '.png';
            } //........word-png

            //........word-gif
            var allowedExtensions = /(.gif)$/i;
            if(allowedExtensions.exec(filePath)){
                return '.gif';
            } //........word-gif

            //........word-tiff
            var allowedExtensions = /(.tiff)$/i;
            if(allowedExtensions.exec(filePath)){
                return '.tiff';
            } //........word-tiff

            //........word-svg
            var allowedExtensions = /(.svg)$/i;
            if(allowedExtensions.exec(filePath)){
                return '.svg';
            } //........word-svg

            //........word-rtf
            var allowedExtensions = /(.rtf)$/i;
            if(allowedExtensions.exec(filePath)){
                return '.rtf';
            } //........word-svg

            //........word-html
            var allowedExtensions = /(.html)$/i;
            if(allowedExtensions.exec(filePath)){
                return '.html';
            } //........word-html

            //........word-xml
            var allowedExtensions = /(.xml)$/i;
            if(allowedExtensions.exec(filePath)){
                return '.xml';
            } //........word-xml

            //........base datos-odb
            var allowedExtensions = /(.odb)$/i;
            if(allowedExtensions.exec(filePath)){
                return '.odb';
            } //........word-html

            //........base datos-zip
            var allowedExtensions = /(.zip)$/i;
            if(allowedExtensions.exec(filePath)){
                return '.zip';
            } //........word-zip

             //........base datos-rar
             var allowedExtensions = /(.rar)$/i;
             if(allowedExtensions.exec(filePath)){
                 return '.rar';
             } //........word-rar

              //........base datos-mp3
              var allowedExtensions = /(.mp3)$/i;
              if(allowedExtensions.exec(filePath)){
                  return '.mp3';
              } //........word-mp3

              //........base datos-ogg
              var allowedExtensions = /(.ogg)$/i;
              if(allowedExtensions.exec(filePath)){
                  return '.ogg';
              } //........word-mp3


              //........base datos-mp4
              var allowedExtensions = /(.mp4)$/i;
              if(allowedExtensions.exec(filePath)){
                  return '.mp4';
              } //........word-mp3

              //........base datos-mpeg
              var allowedExtensions = /(.mpeg)$/i;
              if(allowedExtensions.exec(filePath)){
                  return '.mpeg';
              } //........word-mpeg

              //........base datos-mkv
              var allowedExtensions = /(.mkv)$/i;
              if(allowedExtensions.exec(filePath)){
                  return '.mkv';
              } //........word-mkv



             return '.desconocido';












}//--------------------------ini--     sp3FnvalidaExtensionAdjunto    ------------------------


function sp3FnAdjuntarDocumentoInformeAuditoria()
{//--------------------------ini--     sp3FnAdjuntarDocumentoInformeAuditoria    ------------------------

    var fileInput = document.getElementById('file_trainningSp3');
    var filePath = fileInput.value;

    var extAdj = sp3FnvalidaExtensionAdjunto(filePath);
   // alert('es un archivos '+extAdj);

    var esc= escape(filePath)
    var name = esc.split("%5C");
    var filenamme = name[2];

    //filenamme = sp3EliminarDiacriticosEs(filenamme)

    for (let i = 0; i < 20  ;i++) {
        filenamme = filenamme.replace("%20", "")
    }

    // $('#arc_t').html(name[2]);//para colocar el nombre el aboton pero no hace falta
    // console.log("###################### ADJUNTAR COSAS #######################");
    // console.log("vas adjuntar a :", name[2]);
    // console.log("###################### ADJUNTAR COSAS #######################");



    if(InformeAdj[filenamme] != filenamme)
    {

        if(ilo < LIMITE_ADJ)
        {
        var htmlTa= `

                    <table width="100%" border='0' id="adjInforme${ilo}">
                    <tr>
                        <td width='10%'>
                            <img src='./images/iconos/${extAdj}.png' title = "${filenamme}" class='png' style="cursor: pointer; width:22px; height: 22px;" >
                        </td>

                        <td width='82%'>
                            <div style=" padding: 10px 10px;" style="font-size: 15px;" class="item-text text-left" title = "${filenamme}">
                                <input title = "${filenamme}" id='nameAdjInforme${ilo}' style=" cursor: pointer;  font-size: 14px; background-color:#fff; color:#c3c3c3; border:0px; background-color:#fff;  width: 200px;" type="text" value="${filenamme}">
                            </div>
                    </td>

                    <td width='3%'>
                            <img src='./images/iconos/loadingAdj.gif' id='loadingAdj${ilo}' title = "Por Favor Espere, Adjuntando ....... ${filenamme}" class='png' style="cursor: pointer; width:18px; height: 18px;" >
                        </td>

                    <td width='5%'>
                    <input  type="hidden" value="" id="delAdjInforme${ilo}" >
                            <div>
                                <button onclick="sp3FnBorrraAdjInforme('adjInforme${ilo}',${ilo},'${filenamme}')" type='button' id="btDelAdj${ilo}"
                                    class='delete btn-circle border-0' title = "Eliminar (${filenamme})"
                                    style='cursor: pointer; width: 25px; height: 25px; background-color:#C3C3C3; /*background-color: #ff6767;*/'>
                                    <img src='./images/iconos/Pathcan.svg' style=' width: 16px; height: 16px;' >
                                </button>
                            </div>


                    </td>
                    </tr>
                </table>
                `

                InformeAdj[filenamme] = filenamme;

        $('#divContieneAdjuntos').append(htmlTa);
        var lkj = "";
        ilo++;  if(ilo<9) lkj = '0';

        lkj = lkj+ilo;
        $('#lbTitleModalAdj').html("<h5> ("+lkj+") Archivos Adjuntos</h5>");

        $('#lbMuestraVentanaAdj').html("Ver Archivos ("+lkj+")");



       //-------------------ajustamos los metodo para el envio del formulario ---------------------------------
       var file_trainningSP3 = document.getElementById("file_trainningSp3").files[0];
       var base64SP3_trainning="";
                  //console.log("###################### SU BASE 64 ES #######################");
                  //console.log("FILEX :",  toBase64SP3(file_trainningSP3));
       if(file_trainningSP3)
                {
                    toBase64SP3(file_trainningSP3).then(
                        data => {
                            base64SP3_trainning =   getResult(data);
                            //console.log("FILE :", base64SP3_trainning);
                            sp3FnGuardarAdjunto(ilo-1,filenamme,extAdj,base64SP3_trainning,data);

                                }                );
                }


                //console.log("###################### SU BASE 64 ES #######################");
       //-------------------ajustamos los metodo para el envio del formulario ---------------------------------



        }
        else
        {

        verModalError('Adjuntos del Informe', 'Usted supero el limite Máximo de Adjuntos para un Informe');
        }

    }
    else
    {
        verModalError('Adjuntos del Informe', 'Este archivo ya se encuenta adjunto ('+filenamme+')');
    }

    //VALIDAR LA EXTENSION DEL ARCHIVO STEP-2 CAPACITACIONES

    // console.log("***********************      adjuntos xx      **********************");
    // console.log(InformeAdj);
    // console.log("***********************      adjuntos  xx     **********************");



}//--------------------------fini--     sp3FnAdjuntarDocumentoInformeAuditoria    ------------------------





function sp3FnBorrraAdjInforme(idElement,numT,filenamex)
{
    //--------------------------ini--     sp3FnBorrraAdjInforme    ------------------------
    $('#loadingAdj'+numT).css('visibility','visible')
    //console.log("###################    sp3FnBorrraAdjInforme   ################### ");


    var IdBD = $('#delAdjInforme'+numT).val();
    //alert("BORRAMOS EN BASE DE DATOS A ="+IdBD);
    //vamos verificarCambioSiCambioAfectaProgramacion, si esta adjuntando no puede eliminar si esta eliminando

    //if(IdBD == ''){alert('el archivo se esta adjuntando....');}//si mandan a borrar mientras se adjunta

     /****************************************************************** */
     var body = {
        "Id":  IdBD,
        "AuditoriaId": istAud,
        "Opc": 0
    }


    var url = apiurlAuditoria+"/api/Post-Informe_Auditoria-All?code=nYeLJsvtWIYAXJhGOnC7lAXYrqmuxDKLJKl2zBLNJHNbrzxptaLmrQ==&httpmethod=deleteAdjunto";
    // ELIMINAR
    var headers ={
       "apikey":constantes.apiKey,
       "Content-Type": "application/json",
    }

    $.ajax({
        method: 'POST',
        url:  url,
        headers:headers,
        data: JSON.stringify(body),
        crossDomain: true,
        dataType: "json",
    }).done(function (data) {


       // fnEnviarInformeAuditoriaOk()
       if(parseInt(data) > 0)
       {

            var lkj = "";
            ilo--;
            if(ilo< 9) {lkj = '0';}
            if(ilo == 0)
            {
                lkj = ''; $('#lbMuestraVentanaAdj').html("Adjuntar Documento");
            }
            else
            {
                lkj = lkj+ilo;
                $('#lbMuestraVentanaAdj').html("Ver Archivos ("+lkj+")");
                $('#lbTitleModalAdj').html("<h5> ("+lkj+") Archivos Adjuntos</h5>");
            }

            //lkj = lkj+ilo;


            InformeAdj[filenamex] = null;

            $('#loadingAdj'+idElement).css('visibility','hidden')
            $('#'+idElement).remove();

            let count = 0;
            objAuditoria[istAud].AdjuntosInforme.forEach(function(Item){
                if(parseInt(Item.Id) === parseInt(IdBD))
                {
                    objAuditoria[istAud].AdjuntosInforme.splice(count, 1);
                }
                count++
            })



       }

    })
    .fail(function( jqXHR, textStatus, errorThrown ) {

        verModalError('Eliminar Adjunto', 'Ocurrió un problema al Borrar el archivo adjunto');
    })
    .always(function( jqXHR, textStatus, errorThrown ) {
        // //desbloquear botones
        // $("#btn_enviar_informe_auditoria").html("<b>Confirmar</b>")
        // //$("#btn_enviar_informe_auditoria").addClass("btn_confirmar_modal bg-green-lime-modal confirm btn-confirmar-guardar-plan btn-blue");
        // $("#btn_enviar_informe_auditoria").attr("disabled",false);
        // $("#btn_cancelar_informe_auditoria").attr("disabled",false);
    });

     /******************************************************************* */




}//--------------------------fini--     sp3FnBorrraAdjInforme    ------------------------




function sp3FnGuardarAdjunto(numAdjunto,filenamme,extAdj,base64SP3Adjj,dataxc)
{
    //base64SP3_BD = dataxc;
    let Created_By  = getCookie("vtas_id_hash"+sessionStorage.tabVisitasa);
    let AuditoriaId = istAud;

    var body = {
        "AuditoriaId":  AuditoriaId,
        "Created_By":   Created_By,
        "AdjuntoName": filenamme,
        "Adjunto": dataxc

    }
    //console.log(" sp3FnGuardarAdjunto Body---",body);



    var url = apiurlAuditoria+"/api/Post-Informe_Auditoria-All?code=nYeLJsvtWIYAXJhGOnC7lAXYrqmuxDKLJKl2zBLNJHNbrzxptaLmrQ==&httpmethod=postAdjuntar";
    // GUARDAR
    var headers ={
       "apikey":constantes.apiKey,
       "Content-Type": "application/json",
    }

    $.ajax({
        method: 'POST',
        url:  url,
        headers:headers,
        data: JSON.stringify(body),
        crossDomain: true,
        dataType: "json",
    }).done(function (data) {


       // fnEnviarInformeAuditoriaOk()
       if(parseInt(data) > 0)
       {
            let adjunto         = []
            adjunto.Id          = data
            adjunto.AdjuntoName = filenamme
            adjunto.AuditoriaId = AuditoriaId
            objAuditoria[istAud].AdjuntosInforme.push(adjunto)

            console.warn("ADJUNTOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOxxxxx ",data,objAuditoria[istAud]);
            $('#nameAdjInforme'+numAdjunto).css('color','#000000')
            $('#btDelAdj'+numAdjunto).css('background-color','#ff6767')
            $('#loadingAdj'+numAdjunto).css('visibility','hidden')
            $('#delAdjInforme'+numAdjunto).val(parseInt(data));

       }

    })
    .fail(function( jqXHR, textStatus, errorThrown ) {

        verModalError('Al intentar enviar el Informe de Auditoría', 'Consulte con los administradores del sistema');
    })
    .always(function( jqXHR, textStatus, errorThrown ) {
        // //desbloquear botones
        // $("#btn_enviar_informe_auditoria").html("<b>Confirmar</b>")
        // //$("#btn_enviar_informe_auditoria").addClass("btn_confirmar_modal bg-green-lime-modal confirm btn-confirmar-guardar-plan btn-blue");
        // $("#btn_enviar_informe_auditoria").attr("disabled",false);
        // $("#btn_cancelar_informe_auditoria").attr("disabled",false);
    });

}


function sp3FndivOcultaContListaProgramacion(opcion)
{
     //alert('que vamnos a hacer'+opcion);

     $('#divOcultaContListaProgramacion').css('visibility','hidden');//estado inicial
        if(opcion == 'hidden')
        {//------------------------------------------------------------------------------------------------------

            var t = objAuditoria[istAud].Procesos.length;
            for(var ji =0; ji<t; ji++)
            {
                if(objAuditoria[istAud].Procesos[ji].Selected > 0)
                {

                    var m = objAuditoria[istAud].Procesos[ji].Requisitos.length;
                    for(u =0; u<m; u++)
                    {
                        var req = objAuditoria[istAud].Procesos[ji].Requisitos[u];
                        var i = u;
                        var idl =  req.UnidadNegocioProcesoId;
                        var pId = req.ProcesoId
                        var now = moment().format('YYYY-MM-DD');

                        var px = pId
                        var id1 = "txt-proceso_"+px+"_"+i  //proceso
                        var id2 =  "txt-capitulo_"+px+"_"+i
                        var id3 =  "txt-requisitos_"+px+"_"+i
                        var id4 =  "sel-auditores_"+px+"_"+idl
                        var id5 =  "txt_date_prog_"+px+"_"+idl
                        var id6 =  "txt-hora-inicio_"+px+"_"+idl
                        var id7 =  "txt-hora-fin_"+px+"_"+idl
                        //resultados
                        var id8 =  "sel-tipo_"+px+"_"+idl
                        var id9 =  "btn-hallazgo_"+px+"_"+idl
                        var id10 =  "txt_hden_hallazgo_"+px+"_"+idl

                        $("#"+id1).attr('disabled',true)
                        $("#"+id2).attr('disabled',true)
                        $("#"+id3).attr('disabled',true)
                        $("#"+id4).attr('disabled',true)

                        $("#"+id5).attr('disabled',true)
                        $("#"+id5).css('pointer-events','none')//.css('background-color','red')    //imgCal_
                        $("#"+'imgCal_'+id5).css('visibility','hidden')

                        $("#"+id6).attr('disabled',true)
                        $("#"+id6).css('pointer-events','none')

                        $("#"+id7).attr('disabled',true)
                        $("#"+id7).css('pointer-events','none')



                        $("#Norma1").attr('disabled',true)
                        $("#Norma2").attr('disabled',true)


                    }
                }
            }
        }//------------------------------------------------------------------------------------------------------
        else
        {//-------------------------------------------------------------------------------------------------------
            if(opcion == 'visible')
            {//------------------------------------------------------------------------------------------------------

                var t = objAuditoria[istAud].Procesos.length;
                for(var ji =0; ji<t; ji++)
                {
                    if(objAuditoria[istAud].Procesos[ji].Selected > 0)
                    {

                        var m = objAuditoria[istAud].Procesos[ji].Requisitos.length;
                        for(u =0; u<m; u++)
                        {
                            var req = objAuditoria[istAud].Procesos[ji].Requisitos[u];
                            var i = u;
                            var idl =  req.UnidadNegocioProcesoId;
                            var pId = req.ProcesoId
                            var now = moment().format('YYYY-MM-DD');

                            var px = pId
                            var id1 = "txt-proceso_"+px+"_"+i  //proceso
                            var id2 =  "txt-capitulo_"+px+"_"+i
                            var id3 =  "txt-requisitos_"+px+"_"+i
                            var id4 =  "sel-auditores_"+px+"_"+idl
                            var id5 =  "txt_date_prog_"+px+"_"+idl
                            var id6 =  "txt-hora-inicio_"+px+"_"+idl
                            var id7 =  "txt-hora-fin_"+px+"_"+idl
                            //resultados
                            var id8 =  "sel-tipo_"+px+"_"+idl
                            var id9 =  "btn-hallazgo_"+px+"_"+idl
                            var id10 =  "txt_hden_hallazgo_"+px+"_"+idl

                            $("#"+id1).attr('disabled',false)
                            $("#"+id2).attr('disabled',false)
                            $("#"+id3).attr('disabled',false)
                            $("#"+id4).attr('disabled',false)

                            $("#"+id5).attr('disabled',false)
                            $("#"+id5).css('pointer-events','auto')//.css('background-color','red')    //imgCal_
                            $("#"+'imgCal_'+id5).css('visibility','visible')

                            $("#"+id6).attr('disabled',false)
                            $("#"+id6).css('pointer-events','auto')

                            $("#"+id7).attr('disabled',false)
                            $("#"+id7).css('pointer-events','auto')



                            // $("#Norma1").attr('disabled',false)
                            // $("#Norma2").attr('disabled',false)


                        }
                    }
                }
           }//-------------------------------------------------------------------------------------------------------
           else
           {
               if(opcion == 'hideResult')//hiddenResult// o sea vamos a ocultar o bloquear las cosas
                {
                         console.log('pvamos a bloquear las opciones')

                         //--------------------estado inicial del buscador, activarlo desde ventana --------- inactivo
                            //$("#divNormax").addClass('ocultaDivSp3');//para ocultar
                            //$("#divNormax").removeClass('ocultaDivSp3'); //para mostrar

                        //--------------------estado inicial del buscador, activarlo desde ventana --------- inactivo


                        //------------- estado de camnio a oculto de las opciones de busqueda para el filtro de requisitos -----------//
                             // $("#tablaBuscador").addClass('ocultaDivSp3');//para ocultar
                             //$("#tablaBuscador").removeClass('ocultaDivSp3');//para mostrar
                             //cargamos los select del filtro
                             $("#"+'sel_filter_normaadx').html("<option selected value='0'>         </option>");
                             //
                              var xc = objAuditoria[istAud].Code_Normas.split(",");
                              var xc1 = objAuditoria[istAud].Id_Normas.split(",");
                              var nork1 = Anormas[parseInt(+xc1[0])]
                              var nork2 = Anormas[parseInt(+xc1[1])]

                              //alert("NORMA1 = "+nork1+"      NORMA1 ="+nork2)
                                if(nork1){//norma1
                                 $("#"+'sel_filter_normaadx').append(`<option value='1-${xc1[0]}'  title='${nork1}' style='font-weight: bold;'>${nork1}</option>`);
                                }

                                 if(nork2){
                                 $("#"+'sel_filter_normaadx').append(`<option value='2-${xc1[1]}'  title='${nork2}' style='font-weight: bold;'>${nork2}</option>`);
                                }



                        //------------- estado de camnio a oculto de las opciones de busqueda para el filtro de requisitos -----------//





                                        // $("#Norma1").attr('disabled',true)
                                        // $("#Norma2").attr('disabled',true)



                        $('#divOcultaContListaResultados').css("visibility","hidden")//visibleResult
                            var t = objAuditoria[istAud].Procesos.length;
                            for(var ji =0; ji<t; ji++)
                            {
                                if(objAuditoria[istAud].Procesos[ji].Selected > 0)
                                {

                                    var m = objAuditoria[istAud].Procesos[ji].Requisitos.length;
                                    for(u =0; u<m; u++)
                                    {
                                        var req = objAuditoria[istAud].Procesos[ji].Requisitos[u];
                                        var i = u;
                                        var idl =  req.UnidadNegocioProcesoId;
                                        var pId = req.ProcesoId

                                        var px = pId
                                        var id8 =  "sel-tipo_"+px+"_"+idl
                                        var id9 =  "btn-hallazgo_"+px+"_"+idl
                                        var id10 =  "txt_hden_hallazgo_"+px+"_"+idl


                                        $("#"+id8).attr('disabled',true)
                                        $("#"+id8).css('pointer-events','none');

                                        //$("#"+id9).attr('disabled',true)
                                        //$("#btn-guardar-hallazgo").attr('display', 'none');

                                        // $("#Norma1").attr('disabled',true)
                                        // $("#Norma2").attr('disabled',true)


                                    }
                                }
                            }

                }
                //------------------------------------------------------------------------------------------------
                else
                {

                    if(opcion == 'visibleResult')//hiddenResult// o sea vamos a ocultar o bloquear las cosas
                    {
                              //alert('vamos a DESbloquear las opciones')

                            $('#divOcultaContListaResultados').css("visibility","hidden")//visibleResult
                                var t = objAuditoria[istAud].Procesos.length;
                                for(var ji =0; ji<t; ji++)
                                {
                                    if(objAuditoria[istAud].Procesos[ji].Selected > 0)
                                    {

                                        var m = objAuditoria[istAud].Procesos[ji].Requisitos.length;
                                        for(u =0; u<m; u++)
                                        {
                                            var req = objAuditoria[istAud].Procesos[ji].Requisitos[u];
                                            var i = u;
                                            var idl =  req.UnidadNegocioProcesoId;
                                            var pId = req.ProcesoId

                                            var px = pId
                                            var id8 =  "sel-tipo_"+px+"_"+idl
                                            var id9 =  "btn-hallazgo_"+px+"_"+idl
                                            var id10 =  "txt_hden_hallazgo_"+px+"_"+idl


                                            $("#"+id8).attr('disabled',false)
                                            $("#"+id8).css('pointer-events','auto');

                                            $("#"+id9).attr('disabled',false)


                                            // $("#Norma1").attr('disabled',false)
                                            // $("#Norma2").attr('disabled',false)


                                        }
                                    }
                                }

                    }

                }
                //--------------------------------------------------------------------------------------------

            }


  }
}



function fnSp3FMontaProcesoFiltro(obj)
{
    $("#"+'sel_filter_proceso').html(" ");

    var nuun = obj.value.split("-");
    $('#sp3_txt_auditor_filtro').val(' ')
     //

     var xc = objAuditoria[istAud].Code_Normas.split(",");
     var xc1 = objAuditoria[istAud].Id_Normas.split(",");
     var nork1 = Anormas[parseInt(+xc1[0])]
     var nork2 = Anormas[parseInt(+xc1[1])]


     //alert(" =OOOOO = "+nuun[0])

     if(parseInt(nuun[0]) == 1)
     {
         //vamos a vargar el combo de procesos para la norma 1
         //alert("la ***norma1 = "+nork1+" norma2 ="+nork2)
         $('#btn-basic').trigger('click');
         $("#"+'sel_filter_proceso').html("<option selected value='0'>         </option>"+slProcess);


     }
     else
     {
         if(parseInt(nuun[0]) == 2)
            {
                //alert("la norma1 = "+nork1+" ****norma2 ="+nork2)
                //vamos a cargar el combo de procesos para la norma 2
                $('#btn-17002').trigger('click');
                  $("#"+'sel_filter_proceso').html("<option selected value='0'>         </option>"+slProcess2);

            }
     }

     //slProcess = " ";
     //slProcess2 = " ";
}

function fnSp3CambiaProcesoFiltro(obj)
{

        var normProcResp = obj.value.split("-");
        //  alert("NormaId = "+normProcResp[0]);
        //  alert("Proceso = "+normProcResp[1]);
        //  alert("Responsable ="+normProcResp[2]);
        $('#sp3_txt_auditor_filtro').val(normProcResp[2])//tienes que ver que norma esta cargada

}


function fnSp3CargaFiltroVerPlan()
{
    var normaId    = $('#sel_filter_normaadx').val()//norma


        normaId =  normaId.split("-");
    var normaId =  normaId[1];
    //alert("linea 10414 ="+normaId)

     if(!normaId)
             {normaId=0;}


    var ProcesoId  = $('#sel_filter_proceso').val()

    var proceso;


    var normProcResp = $('#sel_filter_proceso').val();
    if(normProcResp == null)
        {

            proceso=0;
        }
    else
        {
            if(normProcResp)
            {
                 normProcResp = normProcResp.split("-");
                 proceso = normProcResp[1];
                 if(!proceso){proceso = 0;}
            }
           else
            {proceso=0;}

        }
   var Resppsable = $('#sp3_txt_auditor_filtro').val()//responsable


        // alert("NormaId = "+normaId);
        // alert("Proceso = "+proceso);
        // alert("Responsable ="+Resppsable);

        var ido = 'racimo_'+normaId+'_'+proceso;

        //alert(ido);
        $('#'+ido).addClass('ocultaDivSp3');

        //cada vez que busca limpio los racimos

        //los que coinciden se muestran

        //1 vacio se muestran todos
        //2norma y lo otro vacio  muestra todo
        //3 norma + Proceso, se muestra solo ese racimo
        //4 solo responsable, metodo de busqueda donde el patron coincide con Cargo

       fnFiltroProgramacion(normaId,proceso,Resppsable);
}


function fnFiltroProgramacion(normaId,proceso,Resppsable)
{
    showLoading();

//vamos a recorrer segun la norma los procesos seleccionados
  //dependiendo de :
   //1 vacio se muestran todos
        //2norma y lo otro vacio  muestra todo
        //3 norma + Proceso, se muestra solo ese racimo
        //4 solo responsable, metodo de busqueda donde el patron coincide con Cargo

        //  alert("*NormaId = "+normaId);
        //  alert("*Proceso = "+proceso);
        //  alert("*Responsable ="+Resppsable);

         var expr = 'nada';

         normaId = parseInt(normaId);

         if(normaId == 0 && proceso == 0 && Resppsable.length == 0)//1
                      {expr = 'todosVacios';}

         if(normaId > 0 )//2
                      {expr = 'normaSiOtrosNo';}

        if(normaId > 0 && proceso >0 ) //3
                      {expr = 'normaProceso';}
        if(normaId == 0 && proceso == 0 && Resppsable.length > 0)//1
                     {expr = 'soloResponsable';}

        //alert('---------------'+expr)
         //alert('-----**----------'+Resppsable.length)


         //TE FALTA ANDY   NORMA+RESPONSABLE

        switch (expr) {
                case 'todosVacios':
                //------------------------------------------------------------------todosVacios---------------------------
                          filtroTodosVacios();
                //------------------------------------------------------------------todosVacios---------------------------
                break;

                case 'normaSiOtrosNo':
                //------------------------------------------------------------------normaSiOtrosNo---------------------------
                     filtroTodosVacios();//pendiente aqui hay que estar si hay dos normas para cambiar de div
                //------------------------------------------------------------------normaSiOtrosNo---------------------------
                break;

                  case 'normaProceso':
                //------------------------------------------------------------------normaProceso---------------------------

                    filtroCoincideProceso(normaId, proceso)
                //------------------------------------------------------------------normaProceso---------------------------
                break;

                  case 'soloResponsable':
                //------------------------------------------------------------------soloResponsable---------------------------

                    filtroSoloResponsable()

                //------------------------------------------------------------------soloResponsable---------------------------
                break;
            default:
                filtroTodosVacios();
            }





}





function filtroTodosVacios()
{
  //alert('llegue aqui');
    var normas = objAuditoria[istAud].Code_Normas.split(",")
    var idN    = objAuditoria[istAud].Id_Normas.split(",")


    var data = objAuditoria[istAud].Procesos;
    var n    = data.length;

    for(i=0; i<n; i++)
    {

            if(data[i].Selected == 1 &&  data[i].NormaId == parseInt(idN[0]) )//NORMA1
            {

                //$("#racimo_"+data[i].NormaId+"_"+data[i].Id).append(divReq)
                $("#racimo_"+data[i].NormaId+"_"+data[i].Id).addClass('ocultaDivSp3');//mostrar
                $("#racimo_"+data[i].NormaId+"_"+data[i].Id).removeClass('ocultaDivSp3');

            }
            else if(data[i].Selected == 1 &&  data[i].NormaId == parseInt(idN[1]) )//NORMA2
            {

                //$("#racimo_"+data[i].NormaId+"_"+data[i].Id).append(divReq)
                 $("#racimo_"+data[i].NormaId+"_"+data[i].Id).addClass('ocultaDivSp3');//mostrar
                 $("#racimo_"+data[i].NormaId+"_"+data[i].Id).removeClass('ocultaDivSp3');
            }

    }
hideLoading();

}

function filtroCoincideProceso(normaIdx, procesox)
{
  //alert('llegue aqui');
    var normas = objAuditoria[istAud].Code_Normas.split(",")
    var idN    = objAuditoria[istAud].Id_Normas.split(",")


    var data = objAuditoria[istAud].Procesos;
    var n    = data.length;

    for(i=0; i<n; i++)
    {



            if(data[i].Selected == 1 &&  data[i].NormaId == parseInt(idN[0]) )//NORMA1
            {
                console.log("("+i+") comparando normaObjeto("+data[i].NormaId+") la norma pasada normaIdx1 ("+parseInt(idN[0])+")-")
                // alert("data[i].Selected ="+data[i].Selected+" && data[i].NormaId["+data[i].NormaId+"] == "+parseInt(idN[0]))
                // alert("data[i].Selected ="+data[i].Selected+" && data[i].NormaId["+data[i].NormaId+"] == "+parseInt(idN[1]))

                if(( data[i].NormaId == normaIdx)&&( data[i].Id == procesox))
                { console.log('------------------- estamos en norma1 if('+i+')----------------'+normaIdx+','+procesox)
                    $("#racimo_"+data[i].NormaId+"_"+data[i].Id).removeClass('ocultaDivSp3');
                }
                else
                {  console.log('------------------- estamos en norma1 else('+i+')----------------'+normaIdx+','+procesox)
                    $("#racimo_"+data[i].NormaId+"_"+data[i].Id).addClass('ocultaDivSp3');
                }

            }
            else if(data[i].Selected == 1 &&  data[i].NormaId == parseInt(idN[1]) )//NORMA2
            {
                console.log("("+i+") comparando normaObjeto("+data[i].NormaId+") la norma pasada normaIdx2 ("+parseInt(idN[1])+")-")
                // alert("data[i].Selected ="+data[i].Selected+" && data[i].NormaId["+data[i].NormaId+"] == "+parseInt(idN[0]))
                // alert("data[i].Selected ="+data[i].Selected+" && data[i].NormaId["+data[i].NormaId+"] == "+parseInt(idN[1]))
                if(( data[i].NormaId == normaIdx)&&( data[i].Id == procesox))
                { console.log('------------------- estamos en norma2 if('+i+')----------------'+normaIdx+','+procesox)
                    $("#racimo_"+data[i].NormaId+"_"+data[i].Id).removeClass('ocultaDivSp3');
                }
                else
                { console.log('------------------- estamos en norma2 else('+i+')----------------'+normaIdx+','+procesox)
                    $("#racimo_"+data[i].NormaId+"_"+data[i].Id).addClass('ocultaDivSp3');
                }
            }

    }
hideLoading();

}



function filtroSoloResponsable()
{

 //alert('llegue aqui');
    var normas = objAuditoria[istAud].Code_Normas.split(",")
    var idN    = objAuditoria[istAud].Id_Normas.split(",")


    var data = objAuditoria[istAud].Procesos;
    var n    = data.length;

    for(i=0; i<n; i++)
    {

            if(data[i].Selected == 1 &&  data[i].NormaId == parseInt(idN[0]) )//NORMA1
            {
               //alert('me llaman');
                var patron = $('#sp3_txt_auditor_filtro').val()
                var result = data[i].Cargo.split(patron);

                if(result.length > 1)//coincide por ende se muestra
                {
                    $("#racimo_"+data[i].NormaId+"_"+data[i].Id).removeClass('ocultaDivSp3');
                }
                else
                {// si no se oculta
                     $("#racimo_"+data[i].NormaId+"_"+data[i].Id).addClass('ocultaDivSp3');
                }



            }
            else if(data[i].Selected == 1 &&  data[i].NormaId == parseInt(idN[1]) )//NORMA2
            {
                //alert('me llaman2 = '+$('#sp3_txt_auditor_filtro').attr('class'));
              var patron = $('#sp3_txt_auditor_filtro').val()
                var result = data[i].Cargo.split(patron);

                if(result.length > 1)//coincide por ende se muestra
                {
                    $("#racimo_"+data[i].NormaId+"_"+data[i].Id).removeClass('ocultaDivSp3');
                }
                else
                {// si no se oculta
                     $("#racimo_"+data[i].NormaId+"_"+data[i].Id).addClass('ocultaDivSp3');
                }
            }

    }
hideLoading();





}





















