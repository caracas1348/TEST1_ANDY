const datos = [
    { id: 1, titulo: 'Historia Clínica Electrónica (HCE)', imagen: '../images/seguimientoAuditoriaOn.svg' },
    { id: 2, titulo: 'Registro Estadístico de EMO', imagen: '../images/seguimientoAuditoriaOn.svg' },
    { id: 3, titulo: 'Auditoría para centros médicos', imagen: '../images/seguimientoAuditoriaOn.svg' },
    { id: 4, titulo: 'Levantamiento de observaciones a centros médicos', imagen: '../images/seguimientoAuditoriaOn.svg' },
    { id: 5, titulo: 'Registro de Inspección de Instalaciones', imagen: '../images/seguimientoAuditoriaOn.svg' },
    { id: 6, titulo: 'Investigación de Enfermedades Ocupacionales', imagen: '../images/seguimientoAuditoriaOn.svg' },
    { id: 7, titulo: 'Revisión de Menú Mensual', imagen: '../images/seguimientoAuditoriaOn.svg' },
    { id: 8, titulo: 'Registro de Enfermedades Ocupacionales', imagen: '../images/seguimientoAuditoriaOn.svg' },
    { id: 9, titulo: 'Registro de Enfermedades Crónicas', imagen: '../images/seguimientoAuditoriaOn.svg' },
    { id: 10, titulo: 'Registro de Exámenes Toxicológicos', imagen: '../images/seguimientoAuditoriaOn.svg' },
    { id: 11, titulo: 'Registro de Atenciones Médicas', imagen: '../images/seguimientoAuditoriaOn.svg' },
    { id: 12, titulo: 'Registro Estadístico de VMO', imagen: '../images/seguimientoAuditoriaOn.svg' },
    { id: 13, titulo: 'Accidentes de Trabajo', imagen: '../images/seguimientoAuditoriaOn.svg' },
    { id: 14, titulo: 'Registro de Trabajadores Reubicados', imagen: '../images/seguimientoAuditoriaOn.svg' },
    { id: 15, titulo: 'Registro de Vacunas', imagen: '../images/seguimientoAuditoriaOn.svg' },
    { id: 16, titulo: 'Registro de Descansos Médicos', imagen: '../images/seguimientoAuditoriaOn.svg' },
    { id: 17, titulo: 'Registro de Trabajadores Discapacitados', imagen: '../images/seguimientoAuditoriaOn.svg' },
    { id: 18, titulo: 'Registro de Mujeres en Edad Fértil y Gestantes', imagen: '../images/seguimientoAuditoriaOn.svg' },
    { id: 19, titulo: 'IPERC', imagen: '../images/seguimientoAuditoriaOn.svg' },
    { id: 20, titulo: 'Notificaciones', imagen: '../images/seguimientoAuditoriaOn.svg' },
    { id: 21, titulo: 'Reportes', imagen: '../images/seguimientoAuditoriaOn.svg' },
    { id: 22, titulo: 'Programa Anual de Salud e Higiene Ocupacional', imagen: '../images/seguimientoAuditoriaOn.svg' },
    { id: 23, titulo: 'Kardex de Medicamentos', imagen: '../images/seguimientoAuditoriaOn.svg' },
    { id: 24, titulo: 'Programa de Promoción de Salud', imagen: '../images/seguimientoAuditoriaOn.svg' },
    { id: 25, titulo: 'Registro de Interconsultas', imagen: '../images/seguimientoAuditoriaOn.svg' }
];

const busqueda = document.getElementById('buscadorSalud');
const resultBusqueda = document.getElementById('contenedorMedico');

const filtrarDatos = () => {
    // console.log(busqueda.value.toLowerCase());
    resultBusqueda.innerHTML = '';

    const textUsuario = busqueda.value.toLowerCase();
    datos.map((dato) => {
        let titulo = dato.titulo.toLowerCase();

        if(titulo == '') {
            resultBusqueda +=`
            <div class="" id=${dato.id}>
                <div class="" >
                    <div class="contenedor-imagen">
                        <img class="iconos" src=${dato.imagen} alt="icono1">
                    </div>

                    <div class="contenedor-texto">
                        <p class="parrafos">${dato.titulo}</p>
                    </div>
                </div>
            </div>`
        }

        if(titulo.indexOf(textUsuario) !== -1) {
            resultBusqueda.innerHTML +=`

                <div class="" id=${dato.id}>
                    <div class="">
                        <div class="contenedor-imagen">
                            <img class="iconos" src=${dato.imagen} alt="icono1">
                        </div>

                        <div class="contenedor-texto">
                            <p class="parrafos">${dato.titulo}</p>
                        </div>
                    </div>
                </div>
            `
        }
    })
}
busqueda.addEventListener('keyup', filtrarDatos);
filtrarDatos();