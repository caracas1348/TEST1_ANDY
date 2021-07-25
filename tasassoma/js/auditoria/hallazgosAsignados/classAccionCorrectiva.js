function classAccionCorretiva()
{
    this.Id                        = 0,
    this.HallazgoId                = 0,
    this.HACeroPerdidasId          = 0,
    this.UltimoNivel               = 0,
    this.AreaId                    = 0,
    this.Flag_Definido             = 0,
    this.Flag_Completado           = 0,
    this.CeroPerdidasDescription   = "",
    this.Que                       = "",
    this.Donde                     = "",
    this.Cuando                    = "",
    this.Como                      = "",
    this.Cual                      = "",
    this.Problema                  = "",
    this.Requisito                 = "",
    this.Created_By                = "",
    this.IntegrantesAnalisis       = [],
    this.PlanAccion                = [],
    this.AnalisisProblema          = [],
    this.AnalisisMedidasCeroFallas = [],
    this.EnvioACR                  = [],

    classAccionCorretiva.prototype.cargarAccionCorrectiva = function (data)
    {
    	//console.log("***data***",data)
        this.Id                      = data.AccionCorrectiva.Id
        this.HallazgoId              = data.Id
        this.HACeroPerdidasId        = data.AccionCorrectiva.HACeroPerdidasId
        this.CeroPerdidasDescription = data.AccionCorrectiva.CeroPerdidasDescription
        this.AreaId                  = data.AccionCorrectiva.AreaId
        this.Que                     = data.AccionCorrectiva.Que
        this.Donde                   = data.AccionCorrectiva.Donde
        this.Cuando                  = data.AccionCorrectiva.Cuando
        this.Como                    = data.AccionCorrectiva.Como
        this.Cual                    = data.AccionCorrectiva.Cual
        this.Problema                = data.AccionCorrectiva.Problema
        this.Requisito               = data.Requisito
        this.Flag_Definido           = data.AccionCorrectiva.Flag_Definido
        this.Flag_Completado         = data.AccionCorrectiva.Flag_Completado

        //// LEEMOS LOS INTEGRANTES DEL ANALISIS
        if(data.AccionCorrectiva.IntegrantesAnalisis != null)
        {
            var array =[];
            data.AccionCorrectiva.IntegrantesAnalisis.forEach( function(itemIA)
            {
                var json = {}
                //var json = []
                json.Id                   = itemIA.Id
                json.HAAccionCorrectivaId = itemIA.HAAccionCorrectivaId
                json.Name                 = itemIA.Name
                json.UserHash             = itemIA.UserHash
                json.Email                = itemIA.Email
                json.Cargo                = itemIA.Cargo
                json.Deleted              = 0
                array.push(JSON.stringify(json))
                //array.push(json)
            })
            this.IntegrantesAnalisis = array
        }

        ////  LEEMOS LOS 5 PORQUE
        if(data.AccionCorrectiva.AnalisisProblema != null)
        {
            var array = [];
            // start 1er porque
            data.AccionCorrectiva.AnalisisProblema.forEach( function(itemAP)
            {
                if(itemAP.Nivel==1)
                {
                    var AP = new classAnalisisProblema()
                    AP.cargarDataAnalisisProblema(itemAP)
                    //console.log("ENTRO----",AP)
                    // start 2do porque
                    var array2 = [];
                    data.AccionCorrectiva.AnalisisProblema.forEach( function(itemAP2)
                    {
                        if(itemAP2.Nivel==2 && itemAP2.HAAnalisisProblemasId==AP.Id)
                        {
                            var AP2 = new classAnalisisProblema()
                            AP2.cargarDataAnalisisProblema(itemAP2)
                            //console.log("ENTRO2----",AP2)
                            // start 3er porque
                            var array3 = []
                            data.AccionCorrectiva.AnalisisProblema.forEach( function(itemAP3)
                            {
                                if(itemAP3.Nivel==3 && itemAP3.HAAnalisisProblemasId==AP2.Id)
                                {
                                    var AP3 = new classAnalisisProblema()
                                    AP3.cargarDataAnalisisProblema(itemAP3)
                                    //console.log("ENTRO3----",AP3)
                                    // start 4to porque
                                    var array4 = []
                                    data.AccionCorrectiva.AnalisisProblema.forEach( function(itemAP4)
                                    {
                                        if(itemAP4.Nivel==4 && itemAP4.HAAnalisisProblemasId==AP3.Id)
                                        {
                                            var AP4 = new classAnalisisProblema()
                                            AP4.cargarDataAnalisisProblema(itemAP4)
                                            //console.log("ENTRO4----",AP4)
                                            // start 5to porque
                                            var array5 = []
                                            data.AccionCorrectiva.AnalisisProblema.forEach( function(itemAP5)
                                            {
                                                if(itemAP5.Nivel==5 && itemAP5.HAAnalisisProblemasId==AP4.Id)
                                                {
                                                    var AP5 = new classAnalisisProblema()
                                                    AP5.cargarDataAnalisisProblema(itemAP5)
                                                    //console.log("ENTRO5----",AP5)
                                                    array5.push(AP5)
                                                }
                                                AP4.AnalisisProblema = array5
                                            })
                                            // end 5to porque
                                            // */
                                            array4.push(AP4)
                                        }
                                        AP3.AnalisisProblema = array4
                                    })
                                    // end 4to porque
                                    //*/
                                    //AP3.AnalisisProblema = AP4
                                    array3.push(AP3)
                                }
                                AP2.AnalisisProblema = array3
                            })
                            // end 3er porque
                            // */
                            array2.push(AP2)
                        }
                        AP.AnalisisProblema = array2
                    })
                    // end 2do porque
                    //*/
                    array.push(AP)
                }
                //array.push(JSON.stringify(AP))
            })
            this.AnalisisProblema = array
            // end 1er porque
            //console.log("this.AnalisisProblema en 5 porque",this.AnalisisProblema)
        }

        //// LEEMOS LOS ANALISISMEDIDASCEROFALLAS
        if(data.AccionCorrectiva.AnalisisMedidasCeroFallas != null)
        {
            var array = [];
            data.AccionCorrectiva.AnalisisMedidasCeroFallas.forEach( function(item)
            {
                var json = new classAnalisisMedidasCeroFallas()
                json.Id                    = item.Id
                json.HAMedidasCeroFallasId = item.HAMedidasCeroFallasId
                json.HAAnalisisProblemasId = item.HAAnalisisProblemasId
                json.HAAccionCorrectivaId  = item.HAAccionCorrectivaId
                json.Deleted               = 0
                array.push(json)
            })

            this.AnalisisMedidasCeroFallas = array
        }

        //// LEEMOS LOS ANALISISMEDIDASCEROFALLAS
        if(data.AccionCorrectiva.PlanAccion != null)
        {
            let array = [];
            data.AccionCorrectiva.PlanAccion.forEach( function(item)
            {
                let json = new classPlanAccion()
                json.Id                    = item.Id
                json.HAAnalisisProblemaId  = item.HAAnalisisProblemaId
                json.HAPlazoAccionId       = item.HAPlazoAccionId
                json.HAAccionCorrectivaId  = item.HAAccionCorrectivaId
                json.HATipoAccionId        = item.HATipoAccionId
                json.HAStatusAccionId      = item.HAStatusAccionId
                json.Fecha                 = item.Fecha
                json.Fecha2                = item.Fecha2
                json.Responsable           = item.Responsable
                json.UserHash              = item.UserHash
                json.Correo                = item.Correo
                json.Cargo                 = item.Cargo
                json.Accion                = item.Accion
                json.Deleted               = 0
                array.push(json)
            })

            this.PlanAccion = array

            //console.warn("this.PlanAccion",this.PlanAccion)
        }

        //// LEEMOS LOS ENVIO ACR
        if(data.AccionCorrectiva.EnvioACR != null)
        {
            let array = [];
            data.AccionCorrectiva.EnvioACR.forEach( function(item)
            {
                let json = new classEnvioACR()
                json.Id                   = item.Id
                json.HAAccionCorrectivaId = item.HAAccionCorrectivaId
                json.Name                 = item.Name
                json.UserHash             = item.UserHash
                json.Correo               = item.Correo
                json.Cargo                = item.Cargo
                json.Deleted              = item.Deleted
                array.push(json)
            })

            this.EnvioACR = array
        }


    };

    /**
     * [fnSp4BuscarCausas obtener las causas]
     * @return {[type]} [description]
     */
    classAccionCorretiva.prototype.fnSp4BuscarCausas = function(ver)
    {

        //alert("en fnSp4BuscarCausas")
        console.warn("this.AnalisisProblema",this.AnalisisProblema)
        var array = [];
        var countCausaItem = 1
        let count1 = 0
        let count2 = 0
        let count3 = 0
        let count4 = 0
        let count5 = 0
        // start 1er porque
        this.AnalisisProblema.forEach( function(item1)
        {
            // primer nivel start
            if(item1.AnalisisProblema.length==0)
            {
                item1.Ultimo    = 1
                item1.CausaItem = (item1.Id==0) ? countCausaItem++ : 0

                //// buscamos las medidas
                var Medidas                     = []
                Medidas                         = fnSp4BuscarMedidas(item1.Id)
                item1.AnalisisMedidasCeroFallas = Medidas

                //// buscamos los planes de accion ya en bd
                let PlanAccion   = []
                PlanAccion       = fnSp4BuscarPlanAccion(item1.Id)
                item1.PlanAccion = PlanAccion

                //console.warn("objAC.PlanAccion*************",objAC.PlanAccion)
                //console.warn("item1*************",item1)
                //console.warn("Buscar Causas 2",item1)

                fnSp4PintarCausas(item1,count1,count2,count3,count4,count5,ver)
            }
            else
            {

                //alert("en else")
                //console.warn("item1",item1)
                item1.Ultimo                    = 0
                item1.CausaItem                 = 0
                item1.AnalisisMedidasCeroFallas = []
                item1.PlanAccion                = []
                // segundo nivel start
                item1.AnalisisProblema.forEach( function(item2)
                {
                    if(item2.AnalisisProblema.length==0)
                    {
                        item2.Ultimo    = 1
                        item2.CausaItem = (item2.Id==0) ? countCausaItem++ : 0
                        //console.warn("2.pintar en listado de Causas ",item2.Pregunta)
                        //// buscamos las medidas
                        let Medidas2                     = []
                        Medidas2                         = fnSp4BuscarMedidas(item2.Id)
                        item2.AnalisisMedidasCeroFallas = Medidas2
                        //console.log("item2.AnalisisMedidasCeroFallas ",item2.AnalisisMedidasCeroFallas)
                        //// buscamos los planes de accion ya en bd
                        let PlanAccion2   = []
                        PlanAccion2       = fnSp4BuscarPlanAccion(item2.Id)
                        item2.PlanAccion  = PlanAccion2

                        // PINTAR LAS CAUSAS ENCONTRADAS
                        fnSp4PintarCausas(item2,count1,count2,count3,count4,count5,ver)
                    }
                    else
                    {
                        item2.Ultimo                    = 0
                        item2.CausaItem                 = 0
                        item2.AnalisisMedidasCeroFallas = []
                        item2.PlanAccion                = []
                        // 3er nivel start
                        item2.AnalisisProblema.forEach( function(item3)
                        {
                            if(item3.AnalisisProblema.length==0)
                            {
                                item3.Ultimo    = 1
                                item3.CausaItem = (item3.Id==0) ? countCausaItem++ : 0

                                //// buscamos las medidas
                                let Medidas3                     = []
                                Medidas3                         = fnSp4BuscarMedidas(item3.Id)
                                item3.AnalisisMedidasCeroFallas = Medidas3

                                //// buscamos los planes de accion ya en bd
                                let PlanAccion3   = []
                                PlanAccion3       = fnSp4BuscarPlanAccion(item3.Id)
                                item3.PlanAccion  = PlanAccion3

                                // PINTAR LAS CAUSAS ENCONTRADAS
                                fnSp4PintarCausas(item3,count1,count2,count3,count4,count5,ver)
                            }
                            else
                            {
                                item3.Ultimo                    = 0
                                item3.CausaItem                 = 0
                                item3.AnalisisMedidasCeroFallas = []
                                item3.PlanAccion                = []
                                // 4TO nivel start
                                item3.AnalisisProblema.forEach( function(item4)
                                {
                                    if(item4.AnalisisProblema.length==0)
                                    {
                                        item4.Ultimo    = 1
                                        item4.CausaItem = (item4.Id==0) ? countCausaItem++ : 0
                                        //// buscamos las medidas
                                        let Medidas4                     = []
                                        Medidas4                         = fnSp4BuscarMedidas(item4.Id)
                                        item4.AnalisisMedidasCeroFallas = Medidas4

                                        //// buscamos los planes de accion ya en bd
                                        let PlanAccion4   = []
                                        PlanAccion4       = fnSp4BuscarPlanAccion(item4.Id)
                                        item4.PlanAccion  = PlanAccion4

                                        // PINTAR LAS CAUSAS ENCONTRADAS
                                        fnSp4PintarCausas(item4,count1,count2,count3,count4,count5,ver)
                                    }
                                    else
                                    {
                                        item4.Ultimo                    = 0
                                        item4.CausaItem                 = 0
                                        item4.AnalisisMedidasCeroFallas = []
                                        item4.PlanAccion                = []
                                        // 5TO nivel start
                                        item4.AnalisisProblema.forEach( function(item5)
                                        {
                                            item5.Ultimo    = 1
                                            item5.CausaItem = (item5.Id==0) ? countCausaItem++ : 0

                                            //// buscamos las medidas
                                            let Medidas5                     = []
                                            Medidas5                         = fnSp4BuscarMedidas(item5.Id)
                                            item5.AnalisisMedidasCeroFallas = Medidas5

                                            //// buscamos los planes de accion ya en bd
                                            let PlanAccion5   = []
                                            PlanAccion5       = fnSp4BuscarPlanAccion(item5.Id)
                                            item5.PlanAccion  = PlanAccion5

                                            // PINTAR LAS CAUSAS ENCONTRADAS
                                            fnSp4PintarCausas(item5,count1,count2,count3,count4,count5,ver)

                                            count5++
                                            //alert("count5 "+count5)
                                        })
                                        // 5TO nivel end
                                    }
                                    count4++
                                    count5=0;
                                    //alert("count4 "+count4)

                                })
                                // 4TO nivel end
                            }
                            count3++
                            count4=count5=0;
                            //alert("count3 "+count3)

                        })
                        // 3er nivel end
                    }
                    count2++
                    //alert("count2 "+count2)
                    count3=count4=count5=0;
                })
                // segundo nivel end
            }
            count1++
            //alert("count1 "+count1)
            //count2=count3=count4=count5=0;
        })
        // primer nivel end
        //console.warn("this.AnalisisProblema ",this.AnalisisProblema)
    }
    /**
     * [fnSp4PintarAnalisisProblema pintaremos los 5 porque]
     * @return {[type]} []
     */
    /*classAccionCorretiva.prototype.fnSp4PintarAnalisisProblema = function() {
        // body...
        // console.warn("Id ",this.Id)
        // console.warn("AnalisisProblema ",this.AnalisisProblema)
        // console.warn("AnalisisProblema.length ",this.AnalisisProblema.length)
        // padding
        let pd         = "mx-1"
        // boton agregar 1 porque
        let btnAgregar = ""
        // limpiar tabla
        $("#body5PorQue").html('')
        // limpiar td que contienen los 5 PorQue
        for (var i = 0; i < 5; i++)
        {
            $("#body5PorQue").append(`
                <tr class="mt-2" id="tr${i}"></tr>
            `)

            for (var j = 0; j < 5; j++)
            {
                // padding
                pd    = "mx-1"
                if(j==0) pd  = "mr-1"
                if(j==4) pd  = "ml-1"
                // boton agregar 1er porque
                btnAgregar = '<button class="grid-drop__btn" disabled readonly>...</button>'
                if(i==0&&j==0) btnAgregar = `<button class="grid-drop__btn" id="newPorQueHA" onmouseup="fnSp4Agregar1erPorQue(0)">+ Agregar Nuevo</button>`

                //let btnAgregar = ()
                $(`#tr${i}`).append(`
                    <td width="20%" id="td${i}_${j}">
                    </td>
                `)
            }
        }

    };//*/

}

//.............................................. start fnSp4BuscarMedidas ...........................................
var fnSp4BuscarMedidas = function(Id)
{
    let array = []
    objAC.AnalisisMedidasCeroFallas.forEach( function(AMCF)
    {
        if (AMCF.HAAnalisisProblemasId==Id)
        {
            array.push(AMCF.HAMedidasCeroFallasId)
        }
    })//*/
    return array
}
//.............................................. end fnSp4BuscarMedidas ...........................................

//.............................................. start fnSp4BuscarPlanAccion ...........................................
var fnSp4BuscarPlanAccion = function(Id)
{

    let indice = 0
    let array = []
    objAC.PlanAccion.forEach( function(PlanAccion)
    {
        if((PlanAccion.HAAnalisisProblemaId==Id) )
        {
            let json = new classPlanAccion()
            json.Id                    = PlanAccion.Id
            json.HAAnalisisProblemaId  = PlanAccion.HAAnalisisProblemaId
            json.HAPlazoAccionId       = PlanAccion.HAPlazoAccionId
            json.HAAccionCorrectivaId  = PlanAccion.HAAccionCorrectivaId
            json.HATipoAccionId        = PlanAccion.HATipoAccionId
            json.HAStatusAccionId      = PlanAccion.HAStatusAccionId
            json.Fecha                 = PlanAccion.Fecha
            json.Fecha2                = PlanAccion.Fecha2//fnSp4FormatFechaBD(PlanAccion.Fecha2)//PlanAccion.Fecha2
            json.Responsable           = PlanAccion.Responsable
            json.UserHash              = PlanAccion.UserHash
            json.Correo                = PlanAccion.Correo
            json.Cargo                 = PlanAccion.Cargo
            json.Accion                = PlanAccion.Accion
            json.indice                = indice
            indice++
            array.push(json)

            //console.warn("Encontrado PlanAccion para el item1.Id",item1.Id)
        }
    })//*/

    return array
}
//.............................................. end fnSp4BuscarPlanAccion ...........................................

//.............................................. CLASE classEnvioACR() ...........................................
function classEnvioACR()
{
    this.Id                   = 0,
    this.HAAccionCorrectivaId = 0,
    this.Name                 = "",
    this.UserHash             = "",
    this.Correo               = "",
    this.Cargo                = "",
    this.Created_By           = "",
    this.Deleted              = 0
}
//.............................................. CLASE classEnvioACR() ...........................................

//.............................................. CLASE classAreas ...........................................
function classAreas()
{
    this.dataAreas = [];

    classAreas.prototype.cargarDataAreas = function (data)
    {
        this.dataAreas = data;
    }
}
//.............................................. CLASE classAreas ...........................................

//.............................................. CLASE classAnalisisMedidasCeroFallas ...........................................
function classAnalisisMedidasCeroFallas()
{
    this.Id                    = 0,
    this.HAMedidasCeroFallasId = 0,
    this.HAAnalisisProblemasId = 0,
    this.HAAccionCorrectivaId  = 0,
    this.Deleted               = 0
}
//.............................................. CLASE classAnalisisMedidasCeroFallas ...........................................

//.............................................. CLASE classAnalisisProblema ...........................................
function classAnalisisProblema()
{
    this.Id                        = 0,
    this.HAAccionCorrectivaId      = 0,
    this.HAAnalisisProblemasId     = 0,
    this.Nivel                     = 0,
    this.Deleted                   = 0,
    this.HAColoresAnalisisId       = 0,
    this.Pregunta                  = "",
    this.Respuesta                 = "",
    this.Code                      = "",
    this.AnalisisProblema          = [],
    this.Ultimo                    = 0,
    this.CausaItem                 = 0,
    this.AnalisisMedidasCeroFallas = []
    this.PlanAccion                = []

    classAnalisisProblema.prototype.cargarDataAnalisisProblema = function (data)
    {
        this.Id                    = data.Id,
        this.HAAccionCorrectivaId  = data.HAAccionCorrectivaId,
        this.HAAnalisisProblemasId = data.HAAnalisisProblemasId,
        this.Nivel                 = data.Nivel,
        this.Deleted               = 0,
        this.HAColoresAnalisisId   = data.HAColoresAnalisisId,
        this.Pregunta              = data.Pregunta,
        this.Respuesta             = data.Respuesta,
        this.Code                  = data.Code
    }
}
//.............................................. CLASE classAnalisisProblema ...........................................

//.............................................. CLASE classPlanAccion() ...........................................
function classPlanAccion()
{
    this.Id                    = 0,
    this.HAAnalisisProblemaId  = 0,
    this.HAPlazoAccionId       = 1,
    this.HATipoAccionId        = 1,
    this.HAStatusAccionId      = 1,
    this.HAAccionCorrectivaId  = 0,
    this.Fecha                 = "",
    this.Fecha2                = "",
    this.Responsable           = "",
    this.UserHash              = "",
    this.Correo                = "",
    this.Cargo                 = "",
    this.Accion                = "",
    this.Item                  = "",
    this.indice                = 0

}
//.............................................. CLASE classPlanAccion() ...........................................


//.............................................. newPlanAccion(Nivel,count1,count2,count3,count4,count5) ...........................................
var newPlanAccion = function(Nivel,count1,count2,count3,count4,count5,Item)
{
    console.warn("newPlanAccion",Nivel,count1,count2,count3,count4,count5)
    //console.warn("objAC.AnalisisProblema[count1].CausaItem",objAC.AnalisisProblema[count1].CausaItem)
    let array = []
    let json  = new classPlanAccion()
    switch(Nivel)
    {
        case 1:
            json.Id                   = 0
            json.HAAnalisisProblemaId = objAC.AnalisisProblema[count1].Id
            json.HAAccionCorrectivaId = objAC.Id
            json.indice               = objAC.AnalisisProblema[count1].PlanAccion.length
            json.Item                 = objAC.AnalisisProblema[count1].Item
            objAC.AnalisisProblema[count1].PlanAccion.push(json)
            // console.log("objAC.AnalisisProblema[count1]",objAC.AnalisisProblema[count1])
            break;
        case 2:
            json.Id                   = 0
            json.HAAnalisisProblemaId = objAC.AnalisisProblema[count1].AnalisisProblema[count2].Id
            json.HAAccionCorrectivaId = objAC.Id
            json.indice               = objAC.AnalisisProblema[count1].AnalisisProblema[count2].PlanAccion.length
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].PlanAccion.push(json)
            // console.log("objAC.AnalisisProblema[count1].AnalisisProblema[count2]",objAC.AnalisisProblema[count1].AnalisisProblema[count2])
            break;
        case 3:
            json.Id                   = 0
            console.warn("aaaaaaaaaaaaaaa",objAC)
            json.HAAnalisisProblemaId = objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].Id
            json.HAAccionCorrectivaId = objAC.Id
            json.indice               = objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].PlanAccion.length
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].PlanAccion.push(json)
            // console.log("objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3]",objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3])
            break;
        case 4:
            json.Id                   = 0
            json.HAAnalisisProblemaId = objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].Id
            json.HAAccionCorrectivaId = objAC.Id
            json.indice               = objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].PlanAccion.length
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].PlanAccion.push(json)
            // console.log("objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4]",objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4])
            break;
        case 5:
            json.Id                   = 0
            json.HAAnalisisProblemaId = objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].AnalisisProblema[count5].Id
            json.HAAccionCorrectivaId = objAC.Id
            json.indice               = objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].AnalisisProblema[count5].PlanAccion.length
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].AnalisisProblema[count5].PlanAccion.push(json)
            // console.log("objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].AnalisisProblema[count5]",objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].AnalisisProblema[count5])
            break;

        default:
            console.error("otro nivel en newPlanAccion")
            break;
    }
    // console.log("newPlanAccion objAC",objAC)
    return json.indice
}
//.............................................. newPlanAccion(Nivel,count1,count2,count3,count4,count5) ...........................................

//.............................................. fnSp4UpdatedPlanAccionResponsable(Nivel,count1,count2,count3,count4,count5) ...........................................
var fnSp4UpdatedPlanAccionResponsable = function(Responsable,UserHash,Correo,Cargo,indice,Nivel,count1,count2,count3,count4,count5)
{
    //console.log("fnSp4UpdatedPlanAccionResponsable ---> ",Responsable,UserHash,Correo,Cargo,indice,Nivel,count1,count2,count3,count4,count5)
    switch(Nivel)
    {
        case 1:
            objAC.AnalisisProblema[count1].PlanAccion[indice].Responsable = Responsable
            objAC.AnalisisProblema[count1].PlanAccion[indice].UserHash    = UserHash
            objAC.AnalisisProblema[count1].PlanAccion[indice].Correo      = Correo
            objAC.AnalisisProblema[count1].PlanAccion[indice].Cargo       = Cargo
            break;
        case 2:
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].PlanAccion[indice].Responsable = Responsable
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].PlanAccion[indice].UserHash    = UserHash
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].PlanAccion[indice].Correo      = Correo
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].PlanAccion[indice].Cargo       = Cargo
            break;
        case 3:
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].PlanAccion[indice].Responsable = Responsable
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].PlanAccion[indice].UserHash    = UserHash
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].PlanAccion[indice].Correo      = Correo
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].PlanAccion[indice].Cargo       = Cargo
            break;
        case 4:
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].PlanAccion[indice].Responsable = Responsable
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].PlanAccion[indice].UserHash    = UserHash
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].PlanAccion[indice].Correo      = Correo
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].PlanAccion[indice].Cargo       = Cargo
            break;
        case 5:
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].AnalisisProblema[count5].PlanAccion[indice].Responsable = Responsable
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].AnalisisProblema[count5].PlanAccion[indice].UserHash    = UserHash
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].AnalisisProblema[count5].PlanAccion[indice].Correo      = Correo
            objAC.AnalisisProblema[count1].AnalisisProblema[count2].AnalisisProblema[count3].AnalisisProblema[count4].AnalisisProblema[count5].PlanAccion[indice].Cargo       = Cargo
            break;

        default:
            console.error("otro nivel en fnSp4UpdatedPlanAccionResponsable")
            break;

    }
    // console.log("2. fnSp4UpdatedPlanAccionResponsable ---> ",Responsable,UserHash,Correo,Cargo,indice,Nivel,count1,count2,count3,count4,count5)
    // console.log("2. objAC ---> ",objAC)
}
//........................ fnSp4UpdatedPlanAccionResponsable(Nivel,count1,count2,count3,count4,count5) .....................................

//.............................................. fnSp4ObtenerIndice(Nivel,count1,count2,count3,count4,count5) ...........................................
var fnSp4ObtenerIndice = function (Nivel,count1,count2,count3,count4,count5)  //borrar no usando
{
    let indice = 0;
    switch(Nivel)
    {
        case 1:
            indice = objAC.AnalisisProblema[count1].PlanAccion.length
            break;
    }

    // console.log("objAC.AnalisisProblema[count1].PlanAccion ",objAC.AnalisisProblema[count1].PlanAccion)
    // console.log("objAC.AnalisisProblema[count1].PlanAccion.length ",objAC.AnalisisProblema[count1].PlanAccion.length)
    // console.log("indice ",indice)

    return indice
}
//.............................................. fnSp4ObtenerIndice(Nivel,count1,count2,count3,count4,count5) ...........................................

//.............................................. CLASE classColoresAnalisis() ...........................................
function classColoresAnalisis()
{
    this.dataColoresAnalisis = [];

    classColoresAnalisis.prototype.cargarDataColoresAnalisis = function (data)
    {
        this.dataColoresAnalisis   = data;
    }
}
//.............................................. CLASE classColoresAnalisis() ...........................................

//.............................................. CLASE classPlazoAccion() ...........................................
function classPlazoAccion()
{
    this.dataPlazoAccion = [];

    classPlazoAccion.prototype.cargardataPlazoAccion = function (data)
    {
        this.dataPlazoAccion   = data;
    }
}
//.............................................. CLASE classPlazoAccion() ...........................................

//.............................................. CLASE classTipoAccion() ...........................................
function classTipoAccion()
{
    this.dataTipoAccion = [];

    classTipoAccion.prototype.cargardataTipoAccion = function (data)
    {
        this.dataTipoAccion   = data;
    }
}
//.............................................. CLASE classTipoAccion() ...........................................

//.............................................. CLASE classStatusAccion() ...........................................
function classStatusAccion()
{
    this.dataStatusAccion = [];

    classStatusAccion.prototype.cargardataStatusAccion = function (data)
    {
        this.dataStatusAccion   = data;
    }
}
//.............................................. CLASE classStatusAccion() ...........................................