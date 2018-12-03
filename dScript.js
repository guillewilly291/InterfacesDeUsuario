(function($){$.fn.extend({
	leanModal:function(options){
    $(".inputDataRegistro").css({"background-color": "white"}).fadeIn(2000);
    $(".divFlexRegistro").css({"background-color": "white"}).fadeIn(2000);
		var defaults={top:100,overlay:0.5,closeButton:null};
		var overlay=$("<div id='lean_overlay'></div>");$("body").append(overlay);options=$.extend(defaults,options);
		return this.each(function(){
			var o=options;
			$(this).click(function(e){
				var modal_id=$(this).attr("href");
				$(".botonCerrar").click(function(){ //si le damos al botón de cerrar, el pop-up se cierra
					$(".inputDataRegistro").css({"background-color": "white"}).fadeIn(2000);
			    $(".divFlexRegistro").css({"background-color": "white"}).fadeIn(2000);
			    resetRegistro();
					close_modal(modal_id)
				});
					$("#guardar").click(function(){ //ahora hay que comprobar si el usuario ha introducido los datos bien, si es así,
            //se llamará a close_modal que cerrará el pop-up, si no, se remarcará en rojo lo que falta
						if(comprobar()){
							$(".inputDataRegistro").css({"background-color": "white"}).fadeIn(2000);
					    $(".divFlexRegistro").css({"background-color": "white"}).fadeIn(2000);
					    resetRegistro();
							close_modal(modal_id);
						}
					});
				var modal_height=$(modal_id).outerHeight();
				var modal_width=$(modal_id).outerWidth();
				$("#lean_overlay").css({"display":"block",opacity:0});
				$("#lean_overlay").fadeTo(200,o.overlay);
				$(modal_id).css({"display":"block","position":"fixed","opacity":0,"z-index":11000,"left":50+"%","margin-left":-(modal_width/2)+"px","top":o.top+"px"});
				$(modal_id).fadeTo(200,1);
				e.preventDefault()
			})
		})
		;function close_modal(modal_id){$("#lean_overlay").fadeOut(2000) //funcion para cerrar el popup
		;$(modal_id).css({"display":"none"})
	}}
})})
(jQuery);

function seleccionarHotel(idHotel){

	var id = idHotel.getAttribute('id');

	localStorage.setItem( "seleccionHotel", id);

	//var fechaIni = '12/12/2018';
	//var fechaFin = '15/12/2018';

	//localStorage.setItem('fechaIni', fechaIni); /*fecha en formato dd/mm/yyyy*/
	//localStorage.setItem('fechaFin', fechaFin); /*fecha en formato dd/mm/yyyy*/

	document.location.href = "seleccionHotel.html";
}

function cargaDatos(){
	
	userLogged2();
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

	var fecha1 = moment(fechaIni);
	var fecha2 = moment(fechaFin);

	var estancia = fecha2.diff(fecha1, 'days');
	var total = precioDia * estancia;

	return total;
}

function insertDates(){
	debugger;

	var fechaIni = document.getElementById("fecha1").value;
	var fechaFin = document.getElementById("fecha2").value;

	if(fechaFin == '' || fechaIni == ''){
		alert('Introduzca las fechas de reserva');
		return false;
	}

	localStorage.setItem('fechaIni', fechaIni); /*fecha en formato dd/mm/yyyy*/
	localStorage.setItem('fechaFin', fechaFin); /*fecha en formato dd/mm/yyyy*/
	return true;
 }

 function userLogged2(){
	var bool = localStorage.getItem("ZZZZ");
	debugger
	if(bool=="true"){
	  cambiarHeader2();
	}else{
	  return;
	}
  }

  function cambiarHeader2() {
	var primero= "AAAA";
	  debugger
	  conjunto = localStorage.getItem(localStorage.getItem(primero)).split(";");
	 
	  $("#nombreEnCabecera").text("Hola " + localStorage.getItem(localStorage.getItem(primero)).split(";")[5]);
	
	  if (conjunto[7] != "" && conjunto[7] != null) {
	   
		$("#imagenCabecera")[0].src = conjunto[6] + ";" + conjunto[7];
	  } else {
	   
		$("#imagenCabecera")[0].src = conjunto[6];
	  }
	  $("#guestHeader").hide();
	  $("#userHeader").show();
	  cerrar();
	  
  }

  function closeSesionTotal2() {//Cierra sesión de la cuenta y nos lleva a la página de inicio
	$("#userHeader").hide();
	$("#guestHeader").show();
	 localStorage.removeItem("ZZZZ");
	localStorage.setItem("ZZZZ", false);
	document.location.href="paginaPrincipalTest.html";
  }
  
  function goPerfil2(){
	document.location.href="ejercicio1.html";
  }
  
  function goBackGuest2(){
	document.location.href="paginaPrincipalTest.html";
  }
  
  function goBackLogged2(){
	localStorage.removeItem("ZZZZ");
	localStorage.setItem("ZZZZ",true);
  
	document.location.href="paginaPrincipalTest.html";
  
  }


 function realizarBusqueda(){
	userLogged2();
 	debugger;

 	if(document.getElementById('inputBuscar').value == ''){

 		document.getElementById('inputBuscar').value = localStorage.getItem('ciudad');

 	}

 	cargaFechasFiltro();

 	var busqueda = document.getElementById('inputBuscar').value.toLowerCase();

 	var arHoteles = document.getElementsByClassName(busqueda);

 	var vacio = true;

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
		var vacio =false;

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

 	if(vacio){
 			document.getElementsByClassName('tituloLista')[1].innerHTML = "Lo sentimos, no hay resultados...";
 		}else{
 			document.getElementsByClassName('tituloLista')[1].innerHTML = "Hemos encontrado los siguiente alojamientos para ti";
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
 	insertDates();

 	realizarBusqueda();
 }


 function resetEstrellas(){
 	debugger;
 	localStorage.setItem('estrellas', 0);

 	var arEstrellas = document.getElementsByName('rate');

 	for(var i = 0; i < arEstrellas.length; i++){
 		arEstrellas[i].checked = false;
 	}
 }


 function busquedaHotel(){
 	debugger;

 	resetEstrellas();

 	var busqueda = document.getElementById('inputBuscar').value.toLowerCase();
 	if(busqueda == ''){
 		alert('Introduzca un destino');
 		return;
 	}
 	localStorage.setItem('ciudad', busqueda);

 	if(!insertDates()) return;

 	document.location.href = "listaHoteles.html";
 }

 function cargaFechasFiltro(){

 	document.getElementById("fecha1").value = localStorage.getItem('fechaIni');
 	document.getElementById("fecha2").value = localStorage.getItem('fechaFin');

 }


 function checkRadioButton(e){
 	debugger;

 	var arButtons = document.getElementsByClassName('radioButton');

 	for(var i = 0; i < arButtons.length; i++){
 		arButtons[i].checked = false;
 	}

 	e.target.checked = true;

 }

 function cerrar(){
	document.getElementById('sesion').style.display='none';
	document.getElementById('registro').style.display='none';
	document.getElementById('lean_overlay').style.display='none';
	$("#lean_overlay").fadeOut(2000);
	vaciarForm();
  
  }

  function vaciarForm(){
	document.getElementById("userName").value="";
	document.getElementById("password").value="";
	document.getElementById("nameSurname").value="";
	document.getElementById("email").value="";
	document.getElementById("year").value="";
	document.getElementById("address").value="";
	document.getElementById("loginUser").value="";
	document.getElementById("loginPassword").value="";
  }


  function checkNamePassword() {
		  
	var userName = document.getElementById("userName").value;
	var password = document.getElementById("password").value; 
  
	
	
	if(userName.length==0 ){
	  $("#userName").addClass("errorBorder");
	  window.alert("Debe rellenarse el nombre de usuario");	
	  changeStepTo1();
	  
	}else if(localStorage.getItem(userName)!=null ){
	  
	  
	  $("#userName").addClass("errorBorder");
	  
	  window.alert("El usuario ya esta creado");
	  changeStepTo1();
  
	}else if(checkPassword (password)){
	  //SI la contraseña está mal, la funcion checkPassword se encarga de mostrar los mensajes, y al meterse aqui no dejará crear cookie.
	  changeStepTo1();
	}else{
	  $("#userName").removeClass("errorBorder");
	  $("#password").removeClass("errorBorder");
	  changeStepTo2();
	}
  
  }
  
  
  
  function cerrarWarning(){
	window.alert("Las condiciones generales deben aceptarse obligatoriamente, si desea salir pulse el botón Cerrar, pero perderá el registro de usuario");
  }

  function checkName(){
  
  var	nameSurname = document.getElementById("nameSurname").value;
  var	email = document.getElementById("email").value; 
  
  if(nameSurname.length==0){
	$("#nameSurname").addClass("errorBorder");
	window.alert("Se debe rellenar el campo de Nombre y Apellidos");
	changeStepTo2();
  }else if(!validateEmail(email)){
	$("#email").addClass("errorBorder");
	window.alert("Email incorrecto. Sugerencia: nombre@dominio.extensión");
	changeStepTo2();
  
  }else{
	changeStepTo3();
  }
  
	
  
  }
  
  function validateEmail(email) {
	  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
  }
  
  function checkDate(){
	
	var date= document.getElementById("year");
	date= new Date(date.value);
	var fechaActual= new Date()
	if(date.getTime()> fechaActual.getTime()){
	  window.alert("La fecha de nacimiento no puede situarse en el futuro.")
	}else{
	  createCookie();
	}
  }
  function changeStepTo2(){
  
	$("#firstNumber").removeClass("active");
	$("#secondNumber").addClass("active");
	$("#thirdNumber").removeClass("active");
  
	$(".firstStep").hide();
	$(".secondStep").show();
	$(".thirdStep").hide();
  
	$("#step1").hide();
	$("#step2").show();
	$("#step3").hide();
  }
  
  function changeStepTo3(){
  
	$("#firstNumber").removeClass("active");
	$("#secondNumber").removeClass("active");
	$("#thirdNumber").addClass("active");
  
	$(".firstStep").hide();
	$(".secondStep").hide();
	$(".thirdStep").show();
  
	$("#step1").hide();
	$("#step2").hide();
	$("#step3").show();
  }
  
  function changeStepTo1(){
  
	$("#firstNumber").addClass("active");
	$("#secondNumber").removeClass("active");
	$("#thirdNumber").removeClass("active");
  
	$(".firstStep").show();
	$(".secondStep").hide();
	$(".thirdStep").hide();
  
	$("#step2").hide();
	$("#step3").hide();
	$("#step1").show();
  }
  
  function checkCookieMail(name,email){
		  
	if(localStorage.getItem(name)==null){
	  return 0;
	}else{
	  
	  var conjunto = [8];	
	  conjunto = localStorage.getItem(name).split(";");
  
	  if(conjunto[2]==email){
		return 1; 
	  }else{
		return 0;
	  }
	}
	  
  }
  
  function checkCookie(){
	//Returnea un array de strings, que tendran de 0-5, las propiedas de las cookies
	debugger
	var user = document.getElementById("loginUser").value;
	var password = document.getElementById("loginPassword").value;
	var primero = "AAAA";
  
	if(localStorage.getItem(user)==null){
  
	  window.alert("No existe ningun usuario asociado a: " + user);
  
	}else{
	  var conjunto = [8];
	  
		conjunto = localStorage.getItem(user).split(";");
		
		if(conjunto[0]==password){
		  
		  localStorage.removeItem(primero);//Sirve para pasar el argumento del nombre al pasar de pagina web, almacenamos siempre en la posicion 0 de los localStorage( el que se pone siempre el primero de la fila del localStorage de la otra pagina web) para tener el identificador único que nos servira para saber que usuario de todos los guardados en la lista de localStorage se esta logeando.
		  localStorage.setItem(primero,user);
  
		  localStorage.removeItem("ZZZZ");
		  localStorage.setItem("ZZZZ", true);
		cambiarHeader2();
  
  
		}else{
		  window.alert("La contraseña no es correcta, intentelo de nuevo");
  
		}		
		//localStorage.removeItem(user); //Para probar borramos localStorage para no dejar residuos en el navegador
	}
  
	return 1;
  }

  function checkPassword(password){
	if(password.length==0){
	  $("#password").addClass("errorBorder");
	  window.alert("La contraseña debe rellenarse");		
	  return 1;
	}
  
	if(password.length>8){
	  $("#password").addClass("errorBorder");
	  window.alert("La contraseña debe contener maximo 8 caracteres");				
	  return 1;
	}
  
	for(var i=0; i<password.length;i++){
	  if( ((password.charCodeAt(i)<97 || password.charCodeAt(i)>122) && password.charCodeAt(i)!=164) && (password.charCodeAt(i)<48 || password.charCodeAt(i)>57) ){  //Caso en el que no esta entre [a,z],, sin contar ñ
		  $("#password").addClass("errorBorder");
		  window.alert("No se aceptan caracteres diferentes de: [a,z] , [0,9]");			
		  return 1;
	  }
	}
	return 0; //No hay problemas con la contraseña
  }
  
  
  
  function createCookie(){
	debugger;
	var userName= document.getElementById("userName").value;
	var password = document.getElementById("password").value;
	var	nameSurname = document.getElementById("nameSurname").value;
	var	email = document.getElementById("email").value;
	var	year = document.getElementById("year").value;
	var	address = document.getElementById("address").value;
	var imgPerfil = $("#file-preview")[0].src;
  
	if(!$("#checkbox").prop("checked")){
	  window.alert("Se deben aceptar las condiciones generales");
  
	}else{	
	  
	  if(checkCookieMail(userName,email)){ //Se encontraria donde tenemos el numero 444444
		
		window.alert("El correo especificado se encuentra ya vinculado a una cuenta de la página, elija otro porfavor");
		//Si existe el correo en una cuenta de la pagina
  
	  }else{
		var conjunto = password + ";" + nameSurname + ";" + email + ";" + year + ";" + address + ";" + userName +";" + imgPerfil;	
  
		localStorage.setItem(userName,conjunto);
		changeStepTo1();
		vaciarForm();
		cerrar();
		
	  }
  
  
	  cerrar();
	  
	}
  }
  