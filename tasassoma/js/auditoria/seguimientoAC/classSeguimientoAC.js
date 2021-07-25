const MAXIMO_PESO_ARCHIVOS = 10000000 // 10 MB

function seguimientos()
{
    seguimientos.prototype.constructor = function ( data )
    {
        this.HallazgoId                        = data.HallazgoId
        this.CodeHallazgo                      = data.CodeHallazgo
        this.TipoHallazgo                      = data.TipoHallazgo
        this.Norma                             = data.Norma
        this.Sede                              = data.Sede
        this.FechaProximoVencimiento           = data.FechaProximoVencimiento
        this.FechaProximoVencimientoModificada = data.FechaProximoVencimientoModificada
        this.StatusPAC                         = data.StatusPAC
        this.TipoHallazgoId                    = data.TipoHallazgoId
        this.NormaId                           = data.NormaId
        this.SedeId                            = data.SedeId
        this.SEStatusPACId                     = data.SEStatusPACId
        this.Hallazgo                          = data.Hallazgo
        this.Problema                          = data.Problema
        this.StatusPACCode                     = data.StatusPACCode
        this.Acciones                          = data.Acciones
    }

    seguimientos.prototype.GetId = function ()
    {
        console.warn( "Id: ", this.HallazgoId )
    }

    seguimientos.prototype.GetCodeHallazgo = function ()
    {
        return this.CodeHallazgo
    }

    seguimientos.prototype.GetTipoHallazgo = function ()
    {
        return this.TipoHallazgo
    }

    seguimientos.prototype.GetNorma = function ()
    {
        return this.Norma
    }

    seguimientos.prototype.GetSede = function ()
    {
        return this.Sede
    }

    seguimientos.prototype.GetHallazgo = function ()
    {
        return this.Hallazgo
    }

    seguimientos.prototype.GetProblema = function ()
    {
        return this.Problema
    }

    /**
     * [getAccionById buscar una accion por su Id en un Plan de Accion]
     * @param  {[int]} Id   [Id de la accion en el array]
     * @return {[object]}   [objeto con los datos de la accion]
     */
    seguimientos.prototype.getAccionById = function ( Id )
    {
        let data = []
        let Acciones = this.Acciones

        Acciones.forEach( function ( item )
        {
            if ( item.Id === Id )
            {
                data = item
            }
        } )

        return data
    }
}

function classEvaluarEvidencia()
{
    this.Created_By             = getCookie( "vtas_id_hash" + sessionStorage.tabVisitasa )
    this.SEEvidenciasAdjuntosId = 0
    this.HAPlanAccionesId       = 0
    this.SEStatusEvidenciasId   = 0
    this.Id                     = 0
    this.DescriptionObservacion = ""
    this.TipoEvaluacion         = 1 // 1 local, 2 corporativa


    // console.log(getCookie("vtas_fullname"+sessionStorage.tabVisitasa));//cargo
    // console.log(getCookie("vtas_internal_useruser"+sessionStorage.tabVisitasa));//correo
    // console.log(getCookie("vtas_id_hash"+sessionStorage.tabVisitasa));

}

var classReprogramarEvidencia = function ()
{
    this.Id               = 0
    this.HAPlanAccionesId = 0
    this.Motivo           = ""
    this.FechaNueva       = ""
    this.FechaAnterior    = ""
    this.Adjunto          = ""
    this.Name             = ""
    this.Created_By       = getCookie( "vtas_id_hash" + sessionStorage.tabVisitasa )
}

var classEliminarReprogramacion = function ()
{
    this.Id         = 0
    this.Created_By = getCookie( "vtas_id_hash" + sessionStorage.tabVisitasa )
}