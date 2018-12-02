var fechaIni = '12/12/2018';
var fechaFin = '15/12/2018';
localStorage.setItem("fechaIni",fechaIni);
localStorage.setItem("fechaFin", fechaFin);


function seleccionarHotel(idHotel){

	var id = idHotel.getAttribute('id');

	localStorage.setItem( "seleccionHotel", id);

	var fechaIni = '12/12/2018';
	var fechaFin = '15/12/2018';

	localStorage.setItem('fechaIni', fechaIni); /*fecha en formato dd/mm/yyyy*/
	localStorage.setItem('fechaFin', fechaFin); /*fecha en formato dd/mm/yyyy*/

	document.location.href = "seleccionHotel.html";
}

function cargaDatos(){

	var idHotel = localStorage.getItem("seleccionHotel");

	var dataHotel = document.getElementById(idHotel).getElementsByTagName('p');

	/*nombre*/
	document.getElementById('dNombreHotel').innerHTML = dataHotel[0].innerHTML;

	/*estrellas*/
	var imgEstrellas = document.getElementById('fotoEstrellas');

	var srcEstrellas = 'estrellas/' + dataHotel[5].innerHTML + '-5.png';

	imgEstrellas.setAttribute('src', srcEstrellas);

	/*descripcion del hotel*/

	document.getElementById('descripcionHotel').innerHTML = dataHotel[3].innerHTML + '<br>Dirección: ' + dataHotel[1].innerHTML
	 + '<br>Contacto: ' + dataHotel[2].innerHTML;

	/*foto del hotel*/
	var imgHotel = document.getElementById('fotosHotel2');

	var srcImg = dataHotel[6].innerHTML;

	imgHotel.setAttribute('src', srcImg);

	/*Precio del hotel*/

	document.getElementById('precioReserva').innerHTML = precioReserva(dataHotel[4].innerHTML) + '€';

	/*Fechas*/
	document.getElementById('fechasHotel').innerHTML = "Fecha llegada: " + localStorage.getItem('fechaIni') + '<br>' +
														"Fecha fin: " + localStorage.getItem('fechaFin');

}

function precioReserva(precioDia){

	var fechaIni = localStorage.getItem("fechaIni");
	var fechaFin = localStorage.getItem("fechaFin");

	var arFechaIni = fechaIni.split('/');
	var arFechaFin = fechaFin.split('/');

	fechaIni = new Date(arFechaIni[1]+'/'+arFechaIni[0]+'/'+arFechaIni[2]);
	fechaFin = new Date(arFechaFin[1]+'/'+arFechaFin[0]+'/'+arFechaFin[2]);

	var estancia = fechaFin.getDate() - fechaIni.getDate();
	var total = precioDia * estancia;

	return total;
}

function insertDates(){

	var fechaIni = document.getElementById("fechaInicio").value;
	var fechaFin = document.getElementById("fechaFin").value;

	localStorage.setItem('fechaIni', fechaIni); /*fecha en formato dd/mm/yyyy*/
	localStorage.setItem('fechaFin', fechaFin); /*fecha en formato dd/mm/yyyy*/
 }


 function realizarBusqueda(){

 	var busqueda = document.getElementById('inputBuscar').value.toLowerCase();

 	var arHoteles = document.getElementsByClassName(busqueda);

 	if(arHoteles.length == 0){
 		document.getElementsByClassName('tituloLista')[1].innerHTML = "Lo sentimos, no hay resultados...";
 	}else{
 		document.getElementsByClassName('tituloLista')[1].innerHTML = "Hemos encontrado los siguiente alojamientos para ti";
 	}

 	var divLista = document.getElementById('listaHoteles');
 	divLista.innerHTML = null;

 	var rating = localStorage.getItem('estrellas');

 	for(i = 0; i<arHoteles.length; i++){

 		var idHotel = arHoteles[i].getAttribute('id');
 		var dataHotel = document.getElementById(idHotel).getElementsByTagName('p');

 		if(dataHotel[5].innerHTML != rating && rating != 0){/*Validar estrellas*/
 			continue;
 		}

		var srcImg = dataHotel[6].innerHTML;
		var srcEstrellas = 'estrellas/' + dataHotel[5].innerHTML + '-5.png';
		var nombre = dataHotel[0].innerHTML;
		var direccion = dataHotel[1].innerHTML;
		var precio = precioReserva(dataHotel[4].innerHTML) + '€';

 		divLista.innerHTML += 
 		'<div class="hotelBlock">' +
 			'<img class="fotoListaHotel" src="'+srcImg+'" alt="hotel_pax"/>'+
 			'<div class="divInfoListaHotel">'+
 				'<h4 class="dNombreListaHotel"> '+nombre+' </h4>'+
 				'<img class="fotoListaEstrellas" src="'+srcEstrellas+'" alt="estrellas"/>'+
 				'<p id="descripcionHotel" class="parrafoInfo"> '+direccion+' </p>'+
 			'</div>'+
 			'<div class="divReservaListaHotel">'+
 				'<h5 class="precioListaReserva"> '+precio+' </h5>'+
 				'<a class="btnLista" onclick="seleccionarHotel('+idHotel+')"> Ver más </a>'+
 			'</div>'+
 		'</div>';
 	}
 }


 function filtroEstrellas(){

 	var arEstrellas = document.getElementsByName('rate');
 	var estrellas = 0;

 	for(var i = 0; i < arEstrellas.length; i++){
 		if(arEstrellas[i].checked == true){
 			estrellas = 5-i;
 			break;
 		}
 	}

 	localStorage.setItem('estrellas', estrellas);

 }

 function aplicarFiltros(){

 	debugger;


 	filtroEstrellas();

 	realizarBusqueda();
 }

 function resetEstrellas(){
 	localStorage.setItem( "estrellas", 0);
 }