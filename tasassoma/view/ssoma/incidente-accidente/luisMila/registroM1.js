 // let opctionLista9 = document.getElementById("opctionLista9");
 // let opctionLista10 = document.getElementById("opctionLista10".value);

// alert("en el js");

 // const limpirFecha = () => {
// alert("en el js");

 // 	opctionLista9.innerHTML ="2000-2-2";
 // 	opctionLista10.innerHTML ="2000-2-2";
 // }

 // limpirFecha();


 function ajax_post(){
	alert('hola1')

	/* Cree algunas variables que necesitamos enviar a nuestro archivo PHP */
	// var fn = document.getElementById("first_name").value;
	// var ln = document.getElementById("last_name").value;

	/* Cree nuestro objeto XMLHttpRequest */
	var ajax = new XMLHttpRequest();

	// var envioDeDatos = "firstname="+fn+
					   // "&lastname="+ln;

	var url = "https://550m44ud1tmg7454-inspection-dev.azurewebsites.net/api/A-test-p-Get?code=6R5MopPpNzgPaL7ijGdLwMso0K8pisR874/o/r6CKfjGDCNCDG77Zg==&httpmethod=objectlist";

	ajax.open("GET", url, true);

    /* Establecer información de encabezado de tipo de contenido para enviar 
    variables codificadas de URL en la solicitud */
    // ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.setRequestHeader("apiKey", "r$3#23516ewew5");

    /* Acceda al evento onreadystatechange para el objeto XMLHttpRequest */
    ajax.onreadystatechange = function() {

    	if(this.readyState == 4 && this.status == 200) {

    		movidas2(this);

    	}
    	else {
    		console.log(this.status)
    	}

    }

    ajax.send(""); /* Realmente ejecuta la solicitud */
    
    /* Envíe los datos a PHP ahora ... y espere la respuesta para actualizar el estado div */
    // document.getElementById("status0").innerHTML = "Procesando...";
}



function movidas2(resp){

	var cont = resp.responseText;

	console.log(resp);
	console.log(".......................1");
	console.log(cont);
	// document.getElementById("status0").innerHTML=cont;

}

// ajax_post();