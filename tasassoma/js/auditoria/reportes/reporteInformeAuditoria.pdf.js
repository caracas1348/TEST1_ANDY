/**
 *  invir plan de auditoria
 * @param {int} idAud
 */
function enviarPlanPDF2(idAud)
{
    //vamos a programarlo directo sin datos primeramente para diseñarlo
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
    doc.text(85, 160, 'Informe de Auditoría');
    doc.setTextColor(178,178,178);
    doc.text(96, 162, '________');
    doc.text(105, 172, ''+anio);



    doc.addPage();//...................................................      agregamos una pagina

    //------------------------------------------------------------------    encabezado documento    -------------------------------------------------
    doc.addImage(img_header, 'PNG', 0, 0, 210, 21)
    doc.addImage(img_logo_header, 'PNG', 6, 5, 23, 8)

    doc.setTextColor(255,255,255);
    doc.setFontSize(12)
    doc.setFontType('bolditalic')
    doc.text(140, 15, 'Informe de Auditoría Interna');
    doc.text(168, 17, '____________');


    doc.addImage(img_sup, 'PNG', 0, 22, 210, 128)
    doc.addImage(img_inf, 'PNG', 0, 186, 210, 110)
    //------------------------------------------------------------------    encabezado documento    -------------------------------------------------




    doc.setFontSize(10)
    doc.setFontType('bold')
    doc.setTextColor(0,0,0);
    doc.text(9, 34, 'Datos Principales');
    doc.setTextColor(200,200,200);
    //doc.text(44, 32, '___________________________________________________________________________');
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

    //------------------------------    Fecha Planificada      ---------------------------------
    var img_calendar_green = new Image();
    img_calendar_green.src = './images/img_calendar_green.png';

    doc.setFontType('normal')
    doc.addImage(img_calendar_green, 'PNG', 9, 48, 4, 4)
    doc.setTextColor(52,85,156);
    doc.text(15, 52, 'Fecha Planificada');
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255, 255, 255);
    doc.rect(9, 56, 41, 14);//(x1,y1,x2,y2)
    doc.setTextColor(0,0,0);
    doc.text(''+fec_plan_inicial,18, 64);

    //------------------------------    Fecha Planificada      ---------------------------------

    //------------------------------    Norma/Estándar(Criteriode Auditoría)      ---------------------------------
    var img_copia = new Image();
    img_copia.src = './images/img_copia.png';

    doc.setFontType('normal')
    doc.addImage(img_copia, 'PNG', 56, 48, 4, 4)
    doc.setTextColor(52,85,156);
    doc.text(61, 52, 'Norma/Estándar(Criterio de Auditoría)');
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255, 255, 255);
    doc.rect(56, 56, 70, 14);//(x1,y1,x2,y2)
    doc.setTextColor(0,0,0);
    var NORMAx=objAuditoria[idAud].Code_Normas;
    doc.text(''+NORMAx,65, 64);

    //------------------------------    Norma/Estándar(Criteriode Auditoría)a      ---------------------------------

    //------------------------------             Código Auditoría             ---------------------------------
    var img_copia = new Image();
    img_copia.src = './images/img_copia.png';

    doc.setFontType('normal')
    doc.addImage(img_calendar_green, 'PNG', 133, 48, 4, 4)
    doc.setTextColor(52,85,156);
    doc.text(139, 52, 'Código Auditoría');
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255, 255, 255);
    doc.rect(133, 56, 60, 14);//(x1,y1,x2,y2)
    doc.setTextColor(0,0,0);
    CODENORMA=objAuditoria[idAud].Code;
    doc.text(''+CODENORMA,139, 64);

    //------------------------------              Código Auditoría          ---------------------------------


    //------------------------------    UnidaddeNegocio      ---------------------------------


    doc.setFontType('normal')
    doc.addImage(img_copia, 'PNG', 9, 75, 4, 4)
    doc.setTextColor(52,85,156);
    doc.text(15, 78, 'Unidad de Negocio');
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255, 255, 255);
    doc.rect(9, 83, 41, 14);//(x1,y1,x2,y2)
    doc.setTextColor(0,0,0);
    doc.text(''+objAuditoria[idAud].DescriptionUnidadNegocio,18, 91,{maxWidth:26});//DescriptionUnidadNegocio

    //------------------------------    UnidaddeNegocio      ---------------------------------



    //------------------------------    Sede      ---------------------------------
    var img_copia = new Image();
    img_copia.src = './images/img_gps.png';

    doc.setFontType('normal')
    doc.addImage(img_copia, 'PNG', 56, 75, 4, 4)
    doc.setTextColor(52,85,156);
    doc.text(61, 78, 'Sede');
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255, 255, 255);
    doc.rect(56, 83, 50, 14); //(x1,y1,x2,y2)
    doc.setTextColor(0,0,0);
    //CODENORMA=objAuditoria[idAud].Code_Normas;
    Sede_L = objAuditoria[idAud].DescriptionSede;
    doc.text(''+Sede_L,65, 91);

    //------------------------------    Sede      ---------------------------------



    objAuditoria[idAud].AuditoresPDF.map(function(item)
    {

        if(item.Selected>0)
        {
            if(item.Tipo_Id == 1)
            {
                Responsable = toCapitalize(item.Name);
                // Name_AuditorL = Responsable;
                // Cargo_AuditorL = toCapitalize(item.Cargo);
            }
        }
    })

    //------------------------------    Auditor Lider      ---------------------------------
    var img_copia = new Image();
    img_copia.src = './images/img_user.png';

    doc.setFontType('normal')
    doc.addImage(img_copia, 'PNG',113, 75, 4, 4)
    doc.setTextColor(52,85,156);
    doc.text(120, 78, 'Auditor Líder');
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255, 255, 255);
    doc.rect(113, 83, 80, 14);//(x1,y1,x2,y2)
    doc.setTextColor(0,0,0);
    //CODENORMA=objAuditoria[idAud].Code_Normas;
    doc.text(''+Responsable,120, 91);

    //------------------------------   Auditor Lider      ---------------------------------








    //-------------------------   **   Equipo Auditor  ** ---------------------------------
    var img_group = new Image();
    img_group.src = './images/img_Group.png';
    doc.addImage(img_group, 'PNG', 9, 103, 4, 4)//img_Group
    doc.setTextColor(52,85,156);
    doc.setDrawColor(200,200,200);
    doc.setFillColor(255, 255, 255);

    objAuditoria[idAud].AuditoresPDF.map(function(item)
    {

        if(item.Selected>0)
        {
            if(item.Tipo_Id == 2)
            {
                doc.setFontSize(10)

                doc.setDrawColor(200,200,200);
                doc.setFillColor(255, 255, 255);
                console.log('#################################### rectangulos  ###################################')
                console.log('doc.rect(',xRecAuditor,',',yRecAuditor,', 43, 14)')
                console.log('#################################### rectangulos  ###################################')
                doc.rect(xRecAuditor, 110, 43, 14);
                doc.setTextColor(0,0,0);
                doc.text(toCapitalize(item.Name),xtxtAuditor, 116,{maxWidth:30});
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


    doc.setFontSize(10)
    auditor = auditor - 1;
    doc.setTextColor(52,85,156);

    //doc.text(15, 180, 'Auditor ('+auditor+')');
    doc.text(15, 107, 'Equipo Auditor ('+auditor+')');
    //-------------------------   **   Equipo Auditor  ** ---------------------------------






    //-------------------------   **   Resultado de la Auditoría  ** ---------------------------------img_calendar_check
    var img_calendar_checkx = new Image();
    img_calendar_checkx.src = './images/img_calendar_check.png';
    doc.text(15, 135, ' Resultado de la Auditoría ');
    doc.addImage(img_calendar_checkx, 'PNG', 9, 132, 4, 4)

    console.warn("objAuditoria[idAud] -> ",objAuditoria[idAud])
    console.warn("objAuditoria[idAud].Nota -> ",objAuditoria[idAud].Nota)

    let msj = (objAuditoria[idAud].Nota >= 95)
        ? 'Conforme con la norma. Pequeñas desviaciones, no se comprometen seguridad de los alimentos, la calidad del producto o implica en sanitización.'
        : (objAuditoria[idAud].Nota <= 94 && objAuditoria[idAud].Nota >= 86 )
            ? 'No conformidad Menor. Se observaron que algunas desviaciones a corto plazo puede comprometer la calidad del producto o implica un problema menor en sanitización. '
            : 'No conformidad Crítica. Desviaciones observadas con impacto directo sobre la seguridad alimentaria y la calidad del producto, requiere "atención inmediata" o implica un problema serio de sanitización. Solicitante o la desviación desde el punto de evaluación.'

    console.warn("msj -> ",msj)

    doc.text(14, 143, 'Nota: ' + objAuditoria[idAud].Nota + ' % ');
    if(objAuditoria[idAud].Nota >= 95)
        doc.setTextColor(88,194,93);
    else if (objAuditoria[idAud].Nota <= 94 && objAuditoria[idAud].Nota >= 86 )
        doc.setTextColor(255,188,17);
    else
        doc.setTextColor(255,103,103);

    doc.text(35, 143, '' + msj,{maxWidth:160} );


    var img_TH = new Image();
    img_TH.src = './images/totalHallazgos.png';
    doc.setTextColor(0,0,0); doc.setFontSize(10)

    var val = objAuditoria[idAud].NoConformidadCritica; if(val<=9) val = '0'+val;
    doc.addImage(img_TH, 'PNG', 12, 153, 30, 11)//
    doc.text(14, 160, 'NC Crítico:');doc.text(36, 160, val);

    var sepp = 6;

    val = objAuditoria[idAud].NoConformidadMayor; if(val<=9) val = '0'+val;
    doc.addImage(img_TH, 'PNG', 50, 153, 30, 11)
    doc.text(53, 160, 'NC Mayor:');doc.text(74, 160, val);// +2    +22X        Y32

    val = objAuditoria[idAud].NoConformidadMenor; if(val<= 9) val = '0'+val;  //alert(val)
    doc.addImage(img_TH, 'PNG', 90, 153, 30, 11)//NoConformidadMenor
    doc.text(93, 160, 'NC Menor:');  doc.text(114, 160, val);

    val = objAuditoria[idAud].Observaciones; if(val<=9) val = '0'+val;
    doc.addImage(img_TH, 'PNG', 129, 153, 30, 11)//Observaciones
    doc.text(132, 160, 'OBS:');doc.text(153, 160, val);

    val = objAuditoria[idAud].OportunidadMejora; if(val<=9) val = '0'+val;
    doc.addImage(img_TH, 'PNG', 168, 153, 30, 11)//OportunidadMejora
    doc.text(171, 160, 'OM:');doc.text(191, 160, val);

    //val = objAuditoria[idAud].Conformidad; if(val<=9) val = '0'+val;
    //doc.addImage(img_TH, 'PNG', 172, 140, 30, 11)//Conformidad
    //doc.text(174, 147, 'C:');doc.text(196, 147, val);




    //-------------------------   **   Resultado de la Auditoría  ** ---------------------------------



    //-------------------------   **   Resultado de la Auditoría  ** ---------------------------------
    doc.setTextColor(52,85,156);
    doc.text(15, 170, ' Descripción Sucinta de los Resultados ');
    doc.addImage(img_calendar_checkx, 'PNG', 9, 167, 4, 4)


    doc.setFontSize(9)
    doc.setTextColor(0,0,0);
    doc.text(15, 174, ' (Breve comentario del nivel de implementación del sistema de gestión, principales puntos fuertes y oportunidades)');

    doc.setDrawColor(200,200,200);
    doc.setFillColor(255, 255, 255);
    doc.rect(16, 177, 180, 105);
    doc.setFontSize(10)

    var result = objAuditoria[idAud].Resumen_Auditoria;
    doc.text(20, 187, result,{maxWidth:170});





    doc.addPage();
    //------------------------------------------------------------------    encabezado documento    -------------------------------------------------
    doc.addImage(img_header, 'PNG', 0, 0, 210, 21)
    doc.addImage(img_logo_header, 'PNG', 6, 5, 23, 8)

    doc.setTextColor(255,255,255);
    doc.setFontSize(12)
    doc.setFontType('bolditalic')
    doc.text(140, 15, 'Informe de Auditoría Interna');
    doc.text(168, 17, '____________');


    doc.addImage(img_sup, 'PNG', 0, 22, 210, 128)
    doc.addImage(img_inf, 'PNG', 0, 186, 210, 110)
    //------------------------------------------------------------------    encabezado documento    -------------------------------------------------

    doc.setFontSize(10)
    doc.setFontType('bold')
    doc.setTextColor(0,0,0);
    doc.text(9, 34, 'Datos Principales');
    doc.setTextColor(200,200,200);
    var img_menu = new Image();
    img_menu.src = './images/img_menu.png';

    doc.addImage(img_menu, 'PNG', 195, 30, 5, 5)



    // //----------------TABLA DINAMICA--------------   Descripción de los Hallazgos Identificados Durante el Proceso de Auditoría      ---------------------------------
var img_copia = new Image();
img_copia.src = './images/img_copia.png';
doc.setFontType('normal')
doc.addImage(img_copia, 'PNG', 9, 48, 4, 4)
doc.setTextColor(52,85,156);
doc.text(15, 52, 'Descripción de los Hallazgos Identificados Durante el Proceso de Auditoría');
doc.setDrawColor(200,200,200);

    var img_user_gray = new Image();
    img_user_gray.src = './images/img_user_gray.png';
    if(objAuditoria[idAud].Code_Normas.includes(',')){
        var normas = objAuditoria[idAud].Code_Normas.replace(',',' / ')
    }else{
        var normas = objAuditoria[idAud].Code_Normas;
    }


    CODENORMA=objAuditoria[idAud].Code_Normas;
    var yprocesstitle=42;
    var yprocessRec=45;
    var yprocesstxt=53;
    var yprocessimg=38;

    console.log('En el reporte',objAuditoria[idAud].Procesos)
    var i = 0;


    yprocessimg = yprocessimg + 23;
    yprocesstitle = yprocesstitle + 23;
    yprocessRec = yprocessRec + 23;
    yprocesstxt = yprocesstxt + 23;

    doc.setFontType('normal')
    doc.setTextColor(52,85,156);
    doc.text(10, 66, 'Norma');
    doc.text(30, 66, 'Tipo');
    doc.text(54, 66, 'Descripción de la No Conformidad');  //
    doc.text(130, 66, 'Punto de la Norma o Procedimiento incumplido');

    var grosor = 50;
    var itt = 0;
    var pxl = 0;
    objAuditoria[idAud].Procesos.map(function(item)
    {
        console.log('=============================(',yprocesstitle,')=============================================(',yprocesstitle,')');
        if(item.Selected>0)
        {


            item.Requisitos.map(function(dat)
            {

               if(dat.TipoHallazgoId != 7)
               {

               /* SECCION PARA NUEVA HOJA EN CASO DE SUPERAR LAS Y*/
           //-----------------------------------------------------------------------------------------------------------------------


           //-----------------------------------------------------------------------------------------------------

                   var nFilas = Math.floor(dat.Hallazgo.length/grosor);
                       nFilas = parseInt(nFilas)
                   if(nFilas == 0){nFilas = 1;}
                   pxl = nFilas*3;


                    doc.setTextColor(200,200,200);
                    doc.setFontSize(10)
                    yprocessimg = yprocessimg + 8;
                    yprocesstitle = yprocesstitle + 8 + itt;
                    yprocessRec = yprocessRec + 8;
                    yprocesstxt = yprocesstxt + 8;
                    doc.text(9, yprocesstitle, '.__________________________________________________________________________________________________');

                    doc.setTextColor(0,0,0);
                    doc.setFontSize(8)
                    yprocessimg = yprocessimg + 7;
                    yprocesstitle = yprocesstitle + 7;
                    yprocessRec = yprocessRec + 7;
                    yprocesstxt = yprocesstxt + 7;

                    doc.text(11, yprocesstitle, ''+NORMAx,{maxWidth:25});
                    doc.text(32, yprocesstitle, ''+dat.Code_Hallazgo,{maxWidth:25});
                    var as = toCapitalize(dat.Hallazgo);
                    doc.text(54, yprocesstitle-1, ''+as,{maxWidth:72, align:'justify'});
                    var bs = dat.Code+' '+toCapitalize(dat.Description);
                    doc.text(134, yprocesstitle, ''+bs,{maxWidth:54, align:'justify'});



                    console.log('**********************************************************(',yprocesstitle,')');
                    console.log('dat.Code_Hallazgo(',bs,')');//Code
                    console.log('er codigo(',dat.Code,')');
                    console.log('**********************************************************(',i,')');


                    if( yprocesstitle > 210)
                    {//--------------------------------------------------------------------------------------------------
                        //alert("aagregar primero hoja y reiniciar = "+yprocesstitle);
                        doc.addPage();
                        //------------------------------------------------------------------    encabezado documento    -------------------------------------------------
                        doc.addImage(img_header, 'PNG', 0, 0, 210, 21)
                        doc.addImage(img_logo_header, 'PNG', 6, 5, 23, 8)

                        doc.setTextColor(255,255,255);
                        doc.setFontSize(12)
                        doc.setFontType('bolditalic')
                        doc.text(140, 15, 'Informe de Auditoría Interna');
                        doc.text(168, 17, '____________');


                        doc.addImage(img_sup, 'PNG', 0, 22, 210, 128)
                        doc.addImage(img_inf, 'PNG', 0, 186, 210, 110)
                        //------------------------------------------------------------------    encabezado documento    -------------------------------------------------

                            doc.setFontSize(10)
                            doc.setFontType('bold')
                            doc.setTextColor(0,0,0);
                            doc.text(9, 34, 'Datos Principales');
                            doc.setTextColor(200,200,200);
                            //doc.text(44, 32, '___________________________________________________________________________');
                            var img_menu = new Image();
                            img_menu.src = './images/img_menu.png';

                            doc.addImage(img_menu, 'PNG', 195, 30, 5, 5)



                            //----------------TABLA DINAMICA--------------   Descripción de los Hallazgos Identificados Durante el Proceso de Auditoría      ---------------------------------
                            var img_copia = new Image();
                            img_copia.src = './images/img_copia.png';
                            doc.setFontType('normal')
                            doc.addImage(img_copia, 'PNG', 9, 48, 4, 4)
                            doc.setTextColor(52,85,156);
                            doc.text(15, 52, 'Descripción de los Hallazgos Identificados Durante el Proceso de Auditoría');
                            doc.setDrawColor(200,200,200);

                                var img_user_gray = new Image();
                                img_user_gray.src = './images/img_user_gray.png';
                                if(objAuditoria[idAud].Code_Normas.includes(','))
                                {
                                    var normas = objAuditoria[idAud].Code_Normas.replace(',',' / ')
                                }else{
                                    var normas = objAuditoria[idAud].Code_Normas;
                                }


                                CODENORMA=objAuditoria[idAud].Code_Normas;
                                 yprocesstitle=42;
                                 yprocessRec=45;
                                 yprocesstxt=53;
                                 yprocessimg=38;
                                 pxl = 16;

                                // console.log('En el reporte',objAuditoria[idAud].Procesos)
                                 i = 0;


                                //  yprocessimg = yprocessimg + 23;
                                //  yprocesstitle = yprocesstitle + 23;
                                //  yprocessRec = yprocessRec + 23;
                                //  yprocesstxt = yprocesstxt + 23;

                                doc.setFontType('normal')
                                doc.setTextColor(52,85,156);
                                doc.text(10, 66, 'Norma');
                                doc.text(30, 66, 'Tipo');
                                doc.text(54, 66, 'Descripción de la No Conformidad');  //
                                doc.text(130, 66, 'Punto de la Norma o Procedimiento incumplido');



                    }//-------------------------------------------******************-------------------------------------------------------
               }

                //grosor para el proxima iteracion
               itt = pxl;



                i++;
            })

        }
    })




    doc.addPage();

    doc.addImage(img_sup, 'PNG', 0, 0, 210, 128)
    doc.addImage(img_inf, 'PNG', 0, 186, 210, 110)
    doc.addImage(img_log, 'PNG', 49, 115, 110, 37)
    doc.addImage(img_letras, 'PNG', 0, 241, 210, 45)

    doc.setFontSize(8)
    doc.setTextColor(52,85,156);

    doc.text(90, 284, 'Copyright © '+anio+' TASA');
    doc.text(6, 290, 'Todos los derechos reservados. Política de Privacidad Jirón Carpaccio #250, Piso 11 - San Borja, Lima 41 - Perú. (51+1) 611-1400 | (51+1) 611-1401');
    //doc.save('hello_world.pdf');
    base64SP3 = doc.output('datauristring','filename.pdf') //aqui generamos el pdf e base 64 cpara enviarlo al servidor
    var x = base64SP3.split(',');



    var rawdata = doc.output();

    var len = rawdata.length,
        ab = new ArrayBuffer(len),
        u8 = new Uint8Array(ab);

        while(len--) u8[len] = rawdata.charCodeAt(len);

    var blob = new Blob([ab], { type : "application/pdf",});

    //saveAs(blob, 'InformeAuditoria.pdf');

    var iframe = document.getElementById('miIframeMuestraPdf');
    //iframe.srcdoc="aaa.pdf";
    //iframe.style.width = '60%';
    //iframe.style.height = '650px';
    iframe.src = URL.createObjectURL(blob);

    //$("#lbGenerarInforme").html("Generar Informe")

}



function contarCaracteresV1(str) {
    let letra = str[0].toLowerCase();
    let arreglo=[]
    str= str.split('');

    str.map(n => {
        if(n.toLowerCase() === letra){
            arreglo.push(n)
        }

    })


    return arreglo.length;
}

