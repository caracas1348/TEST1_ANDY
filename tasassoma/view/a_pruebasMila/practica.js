const contenido0 = document.getElementById("Contenido0");

let headerIdInputI0 = "";

const datos = [
	
	{
		"id": 1,
		"imagen": "./icono2.jpg",
		"titulo": "Historia Clínica Electrónica (HCE)" 
	},

	{
		"id": 2,
		"imagen": "./icono2.jpg",
		"titulo": "Registro Estadístico de EMO" 
	},
	
	{
		"id": 3,
		"imagen": "./icono2.jpg",
		"titulo": "Auditoría para centros médicos" 
	},

	{
		"id": 4,
		"imagen": "./icono2.jpg",
		"titulo": "Levantamiento de observaciones a centros médicos" 
	},
	
	{
		"id": 5,
		"imagen": "./icono2.jpg",
		"titulo": "Registro de Inspección de Instalaciones médicas" 
	},

	{
		"id": 6,
		"imagen": "./icono2.jpg",
		"titulo": "investigación de Efermedades Ocupacionales" 
	},
	
	{
		"id": 7,
		"imagen": "./icono2.jpg",
		"titulo": "Revisión de Menú Mensual" 
	},

	{
		"id": 8,
		"imagen": "./icono2.jpg",
		"titulo": "Registro de Efermedades Ocupacionales" 
	},
	
	{
		"id": 9,
		"imagen": "./icono2.jpg",
		"titulo": "Registro de Efermedades Crónicas" 
	},

	{
		"id": 10,
		"imagen": "./icono2.jpg",
		"titulo": "Registro de Exámenes Toxicologícos" 
	},
	
	{
		"id": 11,
		"imagen": "./icono2.jpg",
		"titulo": "Registro de Atenciones Médicas" 
	},

	{
		"id": 12,
		"imagen": "./icono2.jpg",
		"titulo": "Registro Estadístico de VMO " 
	},
	
	{
		"id": 13,
		"imagen": "./icono2.jpg",
		"titulo": "Accidentes de trabajo" 
	},

	{
		"id": 14,
		"imagen": "./icono2.jpg",
		"titulo": "Registro de trabajadores reubicados" 
	},
	
	{
		"id": 15,
		"imagen": "./icono2.jpg",
		"titulo": "Registro de Vacunas" 
	},

	{
		"id": 16,
		"imagen": "./icono2.jpg",
		"titulo": "Registro de Descansos Médicos" 
	}

];

const Modal0 = () => {

	/*div modalPadre1 */
	let modalPadre1 = document.createElement("div");
	modalPadre1.id = "modalIdPadre1"; 
	modalPadre1.className += " modalClassPadre1";

	/*div salidaModal */
	let salidaModal = document.createElement("div");
	salidaModal.textContent = "x";
	salidaModal.id = "salidaIdModal"; 
	salidaModal.className += " salidaClassModal";

	modalPadre1.appendChild(salidaModal); 

	/*div contenedorPadre*/
	let contenedorPadre1 = document.createElement("div"); 
	contenedorPadre1.id = "contenedorIdPadre1"; 
	contenedorPadre1.className += " contenedorClassPadre1";

	modalPadre1.appendChild(contenedorPadre1); 

	/*div contenedorHeader*/
	let contenedorHeader = document.createElement("div"); 
	contenedorHeader.id = "contenedorIdHeader"; 
	contenedorHeader.className += " contenedorClassHeader";

	/*div contenedorHeader > titulo*/
	let headerTitulo = document.createElement("div"); 
	headerTitulo.id = "headerIdTitulo"; 
	headerTitulo.className += " headerClassTitulo";


	/*div contenedorHeader > titulo > p*/
	let headerTituloP = document.createElement("p"); 
	headerTituloP.textContent = "Módulo de salud ocupacional";
	headerTituloP.id = "headerIdTituloP"; 
	headerTituloP.className += " headerClassTituloP";

	headerTitulo.appendChild(headerTituloP); 

	contenedorHeader.appendChild(headerTitulo);

	/*div contenedorHeader > input*/
	let headerInput = document.createElement("div"); 
	headerInput.id = "headerIdInput"; 
	headerInput.className += " headerClassInput";

	/*div contenedorHeader > input > ElInput*/
	let headerInputI = document.createElement("input"); 
	headerInputI.type = "text"; 
	headerInputI.id = "headerIdInputI"; 
	headerInputI.className += " headerClassInputI";

	headerInput.appendChild(headerInputI); 

	contenedorHeader.appendChild(headerInput); 


	contenedorPadre1.appendChild(contenedorHeader); 

	/*div contenedorBody*/
	let contenedorBody = document.createElement("div");
	contenedorBody.id = "contenedorIdBody"; 
	contenedorBody.className += " contenedorClassBody";

	contenedorPadre1.appendChild(contenedorBody); 

	/*pintando todo en el Html*/
	contenido0.appendChild(modalPadre1); 



	const salirModal = document.getElementById("salidaIdModal");
	headerIdInputI0 = document.getElementById("headerIdInputI");

	salirModal.addEventListener("click", limpiarModal);
	headerIdInputI0.addEventListener("keyup", pintaDatos);

	pintaDatos();
}

// 'Ballena azul'.includes('ballena');
const pintaDatos = () => {
	
	const contenedorIdBody0 = document.getElementById("contenedorIdBody");
	let contenDatos = '';
	let control = [];

	let busqueda = headerIdInputI0.value;
	let busquedaLimpia = busqueda.toLowerCase().replace(/[!¡¿?.,-_]/, '');
	busquedaLimpia = quitarAcentos(busquedaLimpia);



	datos.map(item => {

		let elTitulo = item.titulo;
		let elTituloLimpio = elTitulo.toLowerCase().replace(/[!¡¿?.,-_]/, '');
		elTituloLimpio = quitarAcentos(elTituloLimpio);

		if (elTituloLimpio.includes(busquedaLimpia)) {

			control.push(item.id);
		} 

	});

	if (control != "") {
		
		for(let contador of control) {

			datos.map(item => {
				let itemId = item.id;

				if (contador == itemId) {

					contenDatos += ` 
						<div id="${item.id}">
							<div>
								<img src="${item.imagen}" alt="imagen">
							</div>
							<div>
								<p>${item.titulo}</p>
							</div>
						</div>
					`;
				}
			
			});

		}

	} else {
		datos.map(item => {
			contenDatos += ` 
				<div id="${item.id}">
					<div>
						<img src="${item.imagen}" alt="imagen">
					</div>
					<div>
						<p>${item.titulo}</p>
					</div>
				</div>
			`;
		});

	}

	contenedorIdBody0.innerHTML = contenDatos;
}


const limpiarModal = () => {
	console.log("hola borrar")
	const modalIdPadre = document.getElementById("modalIdPadre1");
	if (modalIdPadre) {
		modalIdPadre.remove();
	} 
}

const quitarAcentos = (cadena) => {
	const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
	return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
}
