
/**
 *  invir plan de auditoria
 * @param {int} idAud 
 */
function enviarPlanPDF(idAud)
{
    var auditor = 1;
    var xRecAuditor= 9;
    var xtxtAuditor= 12;
    var yRecAuditor= 183;
    var ytxtAuditor= 191;
    var Observador = 1; 
    var xRecObservador= 9;
    var xtxtObservador= 12;
    var yRecObservador= 0;
    var ytxtObservador= 0;
    var ytituloObservador = 0;
    var resto = 0;
    var Responsable="";
    var anio = (new Date).getFullYear();


    var fec_plan_inicial = formatDate(objAuditoria[idAud].Inicio_Plan);
    var fec_plan_fin = formatDate(objAuditoria[idAud].Fin_Plan);


    var fec_ejec_inicial = formatDate(objAuditoria[idAud].Inicio);
    var fec_ejec_fin = formatDate(objAuditoria[idAud].Fin);

    var fec_create_plan = formatDate(objAuditoria[idAud].Fecha_Creacion_Plan)
    

    var doc = new jsPDF();
    var img_sup = new Image();
    img_sup.src = './images/img_superior_pdf.png';

    var img_log = new Image();
    img_log.src = './images/Logo_tasa_pdf.png';

    var img_inf = new Image();
    img_inf.src = './images/img_inferior_pdf.png';

    var img_header = new Image();
    img_header.src = './images/img_header.png';

    var img_logo_header = new Image();
    img_logo_header.src = './images/img_logo_header.png';

    var img_letras = new Image();
    img_letras.src = './images/img_letras.png';


    doc.addImage(img_sup, 'PNG', 0, 0, 210, 128)
    doc.addImage(img_inf, 'PNG', 0, 186, 210, 110)
    doc.addImage(img_log, 'PNG', 49, 115, 110, 37)
    doc.setFontType('bold')
    doc.setTextColor(52,85,156); 
    doc.text(85, 160, 'Plan de Auditorías');
    doc.setTextColor(178,178,178); 
    doc.text(96, 162, '________');
    doc.text(105, 172, ''+anio);



    doc.addPage();
    doc.addImage(img_header, 'PNG', 0, 0, 210, 21)
    doc.addImage(img_logo_header, 'PNG', 6, 5, 23, 8)

    doc.addImage(img_sup, 'PNG', 0, 22, 210, 128)
    doc.addImage(img_inf, 'PNG', 0, 186, 210, 110)

    doc.setFontSize(10)
    doc.setFontType('bold')
    doc.setTextColor(0,0,0); 
    doc.text(9, 34, 'Datos Principales');
    doc.setTextColor(200,200,200); 
    doc.text(44, 32, '___________________________________________________________________________');
    var img_menu = new Image();
    img_menu.src = './images/img_menu.png';

    doc.addImage(img_menu, 'PNG', 195, 30, 5, 5)


    var img_gps = new Image();
    img_gps.src = './images/img_gps.png';

    var img_calendar_gray = new Image();
    img_calendar_gray.src = './images/img_calendar_gray.png';

    var img_goal = new Image();
    img_goal.src = './images/img_goal.png';

    var img_calendar_check = new Image();
    img_calendar_check.src = './images/img_calendar_check.png';

    var img_calendar_blue = new Image();
    img_calendar_blue.src = './images/img_calendar_blue.png';


    var img_calendar_green = new Image();
    img_calendar_green.src = './images/img_calendar_green.png';

    doc.setFontType('normal')
    doc.addImage(img_gps, 'PNG', 9, 48, 4, 4)
    doc.setTextColor(52,85,156); 
    doc.text(15, 52, 'Lugar/Sede de Auditoría');
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255, 255, 255);
    doc.rect(9, 56, 91, 14);
    doc.setTextColor(0,0,0); 
    doc.text(''+objAuditoria[idAud].DescriptionSede,42, 65);
    Sede_L = objAuditoria[idAud].DescriptionSede;
    TIPOAUDITORIA_L = objAuditoria[idAud].DescriptionAuditoria;
    doc.addImage(img_goal, 'PNG', 9, 73, 4, 4)
    doc.setTextColor(52,85,156); 


    var altod = Math.round(objAuditoria[idAud].Detalle.length /100);
    var altod1 = Math.round(objAuditoria[idAud].Alcance.length /100);
    
    if(altod1 > altod){altod = altod1;}

    altod = altod*7;
    //alert(altod);

    doc.text(15, 77, 'Objetivo');
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255, 255, 255);
    doc.rect(9, 80, 91, 21+altod);//21
    doc.setTextColor(0,0,0); 
    var objj = objAuditoria[idAud].Detalle+"          ";
    doc.text(objj,13, 87,{maxWidth:83, align:'justify'});







    doc.addImage(img_calendar_gray, 'PNG', 109, 48, 4, 4)
    doc.setTextColor(52,85,156); 
    doc.text(115, 52, 'Fecha de Elaboración');
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255, 255, 255);
    doc.rect(109, 56, 91, 14);
    doc.setTextColor(0,0,0); 
    doc.text('Inicio: '+fec_create_plan,142, 65);




    doc.addImage(img_calendar_check, 'PNG', 109, 73, 4, 4)
    doc.setTextColor(52,85,156); 
    doc.text(115, 77, 'Alcance de la Auditoría');
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255, 255, 255);
    doc.rect(109, 80, 93, 21+altod);
    doc.setTextColor(0,0,0); 
    var alcc = objAuditoria[idAud].Alcance+"          ";
    doc.text(alcc,112, 87, {maxWidth:83, align:'justify'});



    
//AQUI
    doc.addImage(img_calendar_green, 'PNG', 9, 104+altod, 4, 4)
    doc.setTextColor(52,85,156); 
    doc.text(15, 108+altod, 'Fecha Planificada');
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255, 255, 255);
     doc.rect(9, 110+altod, 43, 14);
    doc.setTextColor(0,0,0); 
    doc.text('Inicio: '+fec_plan_inicial,16, 119+altod);

     doc.rect(57, 110+altod, 43, 14);
     doc.setTextColor(0,0,0); 
     doc.text('Fin: '+fec_plan_fin,64, 119+altod);



    doc.addImage(img_calendar_blue, 'PNG', 109, 104+altod, 4, 4)
    doc.setTextColor(52,85,156); 
    doc.text(115, 108+altod, 'Fecha de Ejecución');
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255, 255, 255);
    doc.rect(109, 110+altod, 43, 14);
    doc.setTextColor(0,0,0); 
    doc.text('Inicio: '+fec_ejec_inicial,116, 119+altod);
    FECHA_I = fec_ejec_inicial;
    doc.rect(157, 110+altod, 43, 14);
    doc.setTextColor(0,0,0); 
    doc.text('Fin: '+fec_ejec_fin,164, 119+altod);
    FECHA_F=fec_ejec_fin;



    doc.setFontSize(10)
    doc.setFontType('bold')
    doc.setTextColor(0,0,0); 
    doc.text(9, 139+altod, 'Auditores');
    doc.setTextColor(200,200,200); 
    doc.text(29, 137+altod, '__________________________________________________________________________________');
    var img_user = new Image();
    img_user.src = './images/img_user.png';


    doc.addImage(img_user, 'PNG', 195, 135+altod, 5, 5)
    doc.setFontSize(10)
    doc.setFontType('normal')
    doc.addImage(img_user, 'PNG', 9, 148+altod, 4, 4)
    doc.setTextColor(52,85,156); 
    doc.text(15, 152+altod, 'Auditor Lider');

    var img_Group = new Image();
    img_Group.src = './images/img_Group.png';
    doc.addImage(img_Group, 'PNG', 9, 176+altod, 4, 4)
    doc.setTextColor(52,85,156); 
    //doc.text(15, 180, 'Auditor');
    doc.setFontSize(10)
    objAuditoria[idAud].AuditoresPDF.sort(sortByProperty('Tipo_Id'));

    objAuditoria[idAud].AuditoresPDF.map(function(item)
    {

        if(item.Selected>0)
        {
            if(item.Tipo_Id == 1)
            {  
                
                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(9, 155+altod, 58, 14);
                doc.setTextColor(0,0,0); 
                doc.text(toCapitalize(item.Name),16, 163+altod,{maxWidth:38});
                Responsable = toCapitalize(item.Name);
                Name_AuditorL = Responsable;
                Cargo_AuditorL = toCapitalize(item.Cargo);
            }
        }
    })
    objAuditoria[idAud].AuditoresPDF.map(function(item)
    {

        if(item.Selected>0)
        {
            if(item.Tipo_Id == 2)
            {  
                doc.setFontSize(10)

                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(xRecAuditor, yRecAuditor+altod, 43, 14);
                doc.setTextColor(0,0,0); 
                doc.text(toCapitalize(item.Name),xtxtAuditor, ytxtAuditor+altod,{maxWidth:30});
                auditor = auditor + 1;
                resto = auditor % 4;   
                if ( resto == 0 ){
                    xRecAuditor= 9;
                    xtxtAuditor= 12;    
                    yRecAuditor = yRecAuditor + 16; 
                    ytxtAuditor = ytxtAuditor +16;         
                }else{
                    xRecAuditor = xRecAuditor + 48; 
                    xtxtAuditor = xtxtAuditor + 48;
                }

            }
        }
    })

    var obsone = 14;//codigo andy 12 enero **************
    objAuditoria[idAud].AuditoresPDF.map(function(item)
    {

        if(item.Selected>0)
        {
            if(item.Tipo_Id == 3)
            {  
                if(Observador==1)
                {

                    ytituloObservador = yRecAuditor + 38;
                    var posimg = ytituloObservador - 4;
                    var img_ojo = new Image();
                    img_ojo.src = './images/img_ojo.png';
                               //if(auditor == 2){obsone = 14};//codigo andy 12 enero **************
                    doc.addImage(img_ojo, 'PNG', 9, posimg-17+altod+obsone, 4, 4)
                    doc.setFontSize(10)
                    doc.setTextColor(52,85,156); 

                    yRecObservador = ytituloObservador + 3;
                    ytxtObservador = yRecObservador + 8;
                }
                doc.setFontSize(10)

                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                doc.rect(xRecObservador, yRecObservador-17+altod+obsone, 43, 14);//codigo andy 12 enero **************
                doc.setTextColor(0,0,0); 
                doc.text(toCapitalize(item.Name),xtxtObservador, ytxtObservador-17+altod+obsone,{maxWidth:30});
                Observador = Observador + 1;
                resto = Observador % 4; 

                if ( resto == 0 ){
                    xRecObservador= 9;
                    xtxtObservador= 11; 
                    yRecObservador = yRecObservador + 16; 
                    ytxtObservador = ytxtObservador +16;    
                }else{
                    xRecObservador = xRecObservador + 48; 
                    xtxtObservador = xtxtObservador + 48;

                }

            }


        }
    })
    doc.setFontSize(10)
    auditor = auditor - 1;
    doc.setTextColor(52,85,156); 

    doc.text(15, 180+altod, 'Auditor ('+auditor+')');
    Observador = Observador - 1;
    doc.text(15, ytituloObservador-17+altod+obsone, 'Observadores ('+Observador+') ');//codigo andy 12 enero **************


    doc.addPage();
    doc.addImage(img_header, 'PNG', 0, 0, 210, 21)
    doc.addImage(img_logo_header, 'PNG', 6, 5, 23, 8)

    doc.addImage(img_sup, 'PNG', 0, 22, 210, 128)
    doc.addImage(img_inf, 'PNG', 0, 186, 210, 110)
    doc.setFontSize(10)
    doc.setFontType('bold')
    doc.setTextColor(0,0,0); 
    doc.text(9, 34, 'Programación');
    doc.setTextColor(200,200,200); 
    doc.text(36, 32, '_____________________________________________________________________________');
    var img_calendar_program = new Image();
    img_calendar_program.src = './images/img_calendar_program.png';

    doc.addImage(img_calendar_program, 'PNG', 195, 30, 5, 5)

    var img_copia = new Image();
    img_copia.src = './images/img_copia.png';

    var img_user_gray = new Image();
    img_user_gray.src = './images/img_user_gray.png';
    if(objAuditoria[idAud].Code_Normas.includes(',')){
        var normas = objAuditoria[idAud].Code_Normas.replace(',',' / ')
    }else{
        var normas = objAuditoria[idAud].Code_Normas;
    }

    doc.setFontType('normal')
    doc.addImage(img_copia, 'PNG', 9, 48, 4, 4)
    doc.setTextColor(52,85,156); 
    doc.text(15, 52, 'Norma a Auditar');
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255, 255, 255);
    doc.rect(9, 56, 45, 14);
    doc.setTextColor(0,0,0); 
    doc.text(''+normas,23, 65);
    CODENORMA=objAuditoria[idAud].Code_Normas;
    var yprocesstitle=77;
    var yprocessRec=80;
    var yprocesstxt=88;
    var yprocessimg=73;

    console.log(objAuditoria[idAud].Procesos)

    objAuditoria[idAud].Procesos.map(function(item)
    {
        if(item.Selected>0)
        {
            if(yprocesstitle>245)
            {
                doc.addPage();


                doc.addImage(img_header, 'PNG', 0, 0, 210, 21)
                doc.addImage(img_logo_header, 'PNG', 6, 5, 23, 8)

                doc.addImage(img_sup, 'PNG', 0, 22, 210, 128)
                doc.addImage(img_inf, 'PNG', 0, 186, 210, 110)
                yprocesstitle=47;
                yprocessRec=50;
                yprocesstxt=58;
                yprocessimg=43;
            }

            doc.addImage(img_copia, 'PNG', 9, yprocessimg, 4, 4)
            doc.setTextColor(52,85,156);
            doc.setFontSize(10);
            doc.text(15, yprocesstitle, 'Proceso');
            doc.setDrawColor(200,200,200);
            doc.setFillColor(255, 255, 255);
            doc.rect(9, yprocessRec, 111, 14);
            doc.setTextColor(0,0,0); 
            doc.setFontSize(8)
            doc.text(''+item.Description,13, yprocesstxt,{maxWidth:100});

            doc.addImage(img_user_gray, 'PNG',122, yprocessimg, 4, 4)
            doc.setTextColor(52,85,156); 
            doc.setFontSize(10)
            doc.text(127, yprocesstitle, 'Responsable del proceso');
            doc.setDrawColor(200,200,200);
            doc.setFillColor(255, 255, 255);
            doc.rect(122, yprocessRec, 78, 14);
            doc.setTextColor(0,0,0); 
            doc.setFontSize(8)
            doc.text(''+item.Cargo,125, yprocesstxt,{maxWidth:72});
        
            yprocessimg = yprocessimg + 23;
            yprocesstitle = yprocesstitle + 23;
            yprocessRec = yprocessRec + 23;
            yprocesstxt = yprocesstxt + 23;

            doc.setTextColor(52,85,156); 
            doc.setFontSize(10)
            doc.text(9, yprocesstitle, 'Capítulo',{maxWidth:20});
            doc.text(32, yprocesstitle, 'Requisitos',{maxWidth:60});
            doc.text(103, yprocesstitle, 'Auditores',{maxWidth:25});
            doc.text(130, yprocesstitle, 'Fecha');
            doc.text(150, yprocesstitle, 'Hora Inicio');
            doc.text(170, yprocesstitle, 'Hora Fin');

            item.Requisitos.map(function(dat)
            {
                doc.setTextColor(200,200,200); 
                doc.setFontSize(10)
                yprocessimg = yprocessimg + 5;
                yprocesstitle = yprocesstitle + 5;
                yprocessRec = yprocessRec + 5;
                yprocesstxt = yprocesstxt + 5;
                doc.text(9, yprocesstitle, '___________________________________________________________________________________________________');

                doc.setTextColor(0,0,0); 
                doc.setFontSize(8)
                yprocessimg = yprocessimg + 7;
                yprocesstitle = yprocesstitle + 7;
                yprocessRec = yprocessRec + 7;
                yprocesstxt = yprocesstxt + 7;
                var capp = dat.Title+ ': ' +toCapitalize(dat.CapituloId)
                var codd = dat.Code+ ': ' +toCapitalize(dat.Description)

                doc.text(9, yprocesstitle, ''+capp,{maxWidth:25});
                doc.text(32, yprocesstitle, ''+codd,{maxWidth:70});
                doc.text(103, yprocesstitle, ''+toCapitalize(dat.Auditor),{maxWidth:25});
                var fec_proceso = formatDate(dat.Inicio)

                doc.text(130, yprocesstitle, ''+fec_proceso);
                doc.setTextColor(0,154,7); 
                doc.text(160, yprocesstitle, ''+dat.Hora_Inicio);
                doc.setTextColor(255,33,33); 
                doc.text(178, yprocesstitle, ''+dat.Hora_Fin);

                if(yprocesstitle>245)
                {
                    doc.addPage();


                    doc.addImage(img_header, 'PNG', 0, 0, 210, 21)
                    doc.addImage(img_logo_header, 'PNG', 6, 5, 23, 8)

                    doc.addImage(img_sup, 'PNG', 0, 22, 210, 128)
                    doc.addImage(img_inf, 'PNG', 0, 186, 210, 110)
                    yprocesstitle=47;
                    yprocessRec=50;
                    yprocesstxt=58;
                    yprocessimg=43;

                    doc.addImage(img_copia, 'PNG', 9, yprocessimg, 4, 4)
                    doc.setTextColor(52,85,156);
                    doc.setFontSize(10);
                    doc.text(15, yprocesstitle, 'Proceso');
                    doc.setDrawColor(200,200,200);
                    doc.setFillColor(255, 255, 255);
                    doc.rect(9, yprocessRec, 111, 14);
                    doc.setTextColor(0,0,0); 
                    doc.setFontSize(8)
                    doc.text(''+item.Description,13, yprocesstxt,{maxWidth:100});

                    doc.addImage(img_user_gray, 'PNG',122, yprocessimg, 4, 4)
                    doc.setTextColor(52,85,156); 
                    doc.setFontSize(10)
                    doc.text(127, yprocesstitle, 'Responsable del proceso');
                    doc.setDrawColor(200,200,200);
                    doc.setFillColor(255, 255, 255);
                    doc.rect(122, yprocessRec, 78, 14);
                    doc.setTextColor(0,0,0); 
                    doc.setFontSize(8)
                    doc.text(''+item.Cargo,125, yprocesstxt,{maxWidth:72});
   
                    yprocessimg = yprocessimg + 23;
                    yprocesstitle = yprocesstitle + 23;
                    yprocessRec = yprocessRec + 23;
                    yprocesstxt = yprocesstxt + 23;

                    doc.setTextColor(52,85,156); 
                    doc.setFontSize(10)
                    doc.text(9, yprocesstitle, 'Capítulo');
                    doc.text(32, yprocesstitle, 'Requisitos',{maxWidth:60});
                    doc.text(93, yprocesstitle, 'Auditores');
                    doc.text(120, yprocesstitle, 'Fecha');
                    doc.text(150, yprocesstitle, 'Hora Inicio');
                    doc.text(175, yprocesstitle, 'Hora Fin');

                }
            })
            doc.setTextColor(200,200,200); 
                doc.setFontSize(10)
            doc.text(9, yprocesstitle+5, '___________________________________________________________________________________________________');

            yprocessimg = yprocessimg + 30;
            yprocesstitle = yprocesstitle + 30;
            yprocessRec = yprocessRec + 30;
            yprocesstxt = yprocesstxt + 30;
        }
    })


    doc.addImage(img_copia, 'PNG', 9, yprocessimg, 4, 4)
    doc.setTextColor(52,85,156);
    doc.setFontSize(10);
    doc.text(15, yprocesstitle, 'Responsable del Plan');
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255, 255, 255);
    doc.rect(9, yprocessRec, 60, 14);
    doc.setTextColor(0,0,0); 
    doc.setFontSize(8)
    doc.text(''+Responsable,13, yprocesstxt,{maxWidth:100});

    doc.addPage();

    doc.addImage(img_sup, 'PNG', 0, 0, 210, 128)
    doc.addImage(img_inf, 'PNG', 0, 186, 210, 110)
    doc.addImage(img_log, 'PNG', 49, 115, 110, 37)
    doc.addImage(img_letras, 'PNG', 0, 241, 210, 45)

    doc.setFontSize(8)
    doc.setTextColor(52,85,156); 

    doc.text(90, 284, 'Copyright © '+anio+' TASA');
    doc.text(6, 290, 'Todos los derechos reservados. Política de Privacidad Jirón Carpaccio #250, Piso 11 - San Borja, Lima 41 - Perú. (51+1) 611-1400 | (51+1) 611-1401');

    base64SP3 = doc.output('datauristring') //aqui generamos el pdf e base 64 cpara enviarlo al servidor

   //console.log(base64SP3)
   //doc.save('PlanAuditoria'+objAuditoria[idAud].Detalle)
    //openNewTab(base64SP3)

    var rawdata = doc.output();

    var len = rawdata.length,
        ab = new ArrayBuffer(len),
        u8 = new Uint8Array(ab);

        while(len--) u8[len] = rawdata.charCodeAt(len);

    var blob = new Blob([ab], { type : "application/pdf" });

    //saveAs(blob, 'InformeAuditoria.pdf');
    //alert('termino');
}