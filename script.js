$(function($){
 
  // scripts de JQUERY que llaman a las funciones de los plugins, uno para pop-up y otro para carrusel
  $(".go").leanModal({ top : 500, overlay : 0.7, closeButton: ".modal_close" });
  $(".go2").leanModal({ top : 500, overlay : 0.7});
 
  $('#demo').RollingSlider({
    showArea:"#example",
    prev:"#jprev",
    next:"#jnext",
    moveSpeed:300,
    autoPlay:true
  });

  var input = document.getElementById("loginPassword");
		input.addEventListener("keyup", function(event) {
  			// Cancel the default action, if needed
  				event.preventDefault();
  			// Number 13 is the "Enter" key on the keyboard
  				if (event.keyCode === 13) {
    		//llamamos a la funcion del botón de Login
    				checkCookie();
  }

});
		var password=document.getElementById("password");
  		var userName=document.getElementById("userName");
  		userName.addEventListener("keyup", function(event){
  			event.preventDefault();
  			if(event.keyCode === 13){
  				 checkNamePassword();
  			}
  		});
  		password.addEventListener("keyup", function(event){
  			event.preventDefault();
  			if(event.keyCode === 13){
  				 checkNamePassword();
  			}
  		});
  		var nameSurname= document.getElementById("nameSurname");
  		var email  = document.getElementById("email");
  		nameSurname.addEventListener("keyup", function(event){
  			event.preventDefault();
  			if(event.keyCode === 13){
  				 checkName();
  			}
  		});
  		email.addEventListener("keyup", function(event){
  			event.preventDefault();
  			if(event.keyCode === 13){
  				 checkName();
  			}
  		});
});

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

function displayInf(){//función para esconder la secion de opiniones y mostrar información personal
	document.getElementById('section-inf').style.display = 'block';
	document.getElementById('section-opi').style.display = 'none';
}

function displayOpi(){//función para esconder la secion de información personal y mostrar opiniones
	document.getElementById('section-inf').style.display = 'none';
	document.getElementById('section-opi').style.display = 'block';
}

function addPreference(){//Añade una preferencia
	var lista = document.getElementById('listaPreferencias');
	var elementos = document.getElementsByClassName('filaPreferencia');//array de elementos (preferencias)
	var tamaño = elementos.length;//Número de preferencias actuales

	if(tamaño == 0 || elementos[tamaño-1].firstElementChild.innerHTML != '&nbsp;&nbsp;'){//Añadimos el codigo HTML de la preferencia
		lista.innerHTML += '<li class="filaPreferencia">'+
		'<h4 class="preferencia" onclick="editPreference(event)">  </h4>' +
		'<input class="botonEliminar" type="button" value="X" onclick="deletePreference(event)"></li>';
	}else{
		alert('Existe una preferencia vacia!!! Haga click en ella para editarla.');
	}
}

function editPreference(e){//Edita una preferencia
	var preferenciaTexto = e.target;//preferencia que vamos a editar

	if(preferenciaTexto.innerHTML == '&nbsp;&nbsp;'){//Si está vacia
		var texto = prompt("Introduzca el nombre de la preferencia (Este no puede ser vacío).");
		if(texto == ''){//No se ha introducido texto
			preferenciaTexto.innerHTML = '&nbsp;&nbsp;';
			editPreference(e);
		}else if(texto==null){//No se ha introducido texto
			preferenciaTexto.innerHTML = '&nbsp;&nbsp;';
			return;
		}else{//Modificamos el texto HTML de la preferencia
			preferenciaTexto.innerHTML = texto;
		}
	}
}

function deletePreference(e){//Eliminar preferencia
	var lista = document.getElementById('listaPreferencias');//Obtenemos el ul de preferencias
	var preferencia = e.target.parentElement;//Elemento a borrar
	lista.removeChild(preferencia);//Borramos del HTML la preferencia
}

function popUp(e){//Muestra un popUp
	var padre = e.target.parentElement;
	var listaElementos = padre.getElementsByClassName('displayNone');

	var textoCompleto="";

	for(var x=0; x<listaElementos.length; x++){//Concatena en un texto los datos a mostrar
		textoCompleto += listaElementos[x].innerHTML + "\n";
	}

	textoCompleto += "Opinión: "+padre.getElementsByClassName('parrafo')[0].innerHTML;

	//var img = padre.getElementsByTagName('img')[0].src="hotelPax.jpg";
	//alert(img);
	alert(textoCompleto);//Mostrar el popUp
}

function readURL(input) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('#blah').attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}

function comprobar(){//Verifica los datos del registro
  //Guardamos en un array los elementos que son obligatorios
  var obligatorio= document.getElementsByClassName('obligatorio');
  var obligatorio2= document.getElementsByClassName('obligatorio2');
  var bool=false;
  var general=false;
  var color=false;
  if(obligatorio.length != 0){
  for(var i=0;i<obligatorio.length;i++){//Recorremos cada dato obligatorio del formulario
  	bool=false;
    if(obligatorio[i].value == ""){//Un campo obligatorio es vacio
      bool=true;
      general=true;
    }else if(i == 3){//Se verifica la estructura del email
    	var str = obligatorio[i].value;
    	var arStr = str.split("@");//Separamos por @
    	bool = true;
      general=true;

    	if(arStr.length == 2){//Tiene solo un @
    		var arStr2 = arStr[1].split(".");//Separamos por .
    		if(arStr2.length == 2 && arStr2[1] != ""){//Tiene solo un .
    			bool = false;
          general=false;
    		}
    	}
    }else if(i == 6){//Campo check
      if(!obligatorio[i].checked){//El check de terminos y condiciones debe estar activo
        color=true;
        general=true;
      }
    }else if(i==4){//Campo fecha

      var fecha= obligatorio[i].value.split("-");
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();
      var str=""+yyyy.toString()+mm.toString()+dd.toString();
      var str2=""+fecha[0].toString()+fecha[1].toString()+fecha[2].toString();
      if(parseInt(str2)>parseInt(str)){//Validamos que la fecha introducida no sea mayor a la actual
        bool=true;
        general=true;
      }
    }else if(i==1){//Campo contraseña

      var contra=obligatorio[i].value;
      contra=contra.toUpperCase();//Pasamos todo a mayúsculas
      if(contra.length<=8){//Tamaño máximo 8
        for(var j=0;j<contra.length;j++){
          var value= contra.charAt(j);
          if((value>='A'&&value<='Z')||(value>='0'&&value<='9')){//Verificamos que solo contiene letras y números
            continue;
          }else{
            bool=true;
            general=true;
            break;
          }
        }
      }else{
        bool=true;
        general=true;
      }

    }
    //Si no se cumplen todos los campos obligatorios se alertará en rojo la casilla incorrecta
    if(bool){
    	obligatorio[i].style.backgroundColor= "#f78585";
    }
    if(color){
      obligatorio[i].parentElement.style.backgroundColor= "#f78585";
    }


}
    if(!general){//Sin errores
      añadirCuenta(obligatorio);//Añadimos la cuenta
      return true;
    }else{
      return false;
    }
}else{
    //Editar datos
    for(var i=0;i<obligatorio2.length;i++){
      bool=false;
      if(obligatorio2[i].value == ""){
        bool=true;
        general=true;
      }else if (i==1) {//Campo fecha
        var fecha= obligatorio2[i].value.split("-");
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var str=""+yyyy.toString()+mm.toString()+dd.toString();
        var str2=""+fecha[0].toString()+fecha[1].toString()+fecha[2].toString();
        if(parseInt(str2)>parseInt(str)){//Verificar fecha
          bool=true;
          general=true;
        }
      }
      if(bool){
      	obligatorio2[i].style.backgroundColor= "#f78585";//Marcar casillas incorrectas
      }
    }
    if(!general){//Editar cuenta
      editarCuenta(obligatorio2);
      return true;
    }else return false;
}
}

function resetRegistro(){//Borra los valores de un popUp de registro

  var obligatorio= document.getElementsByClassName('obligatorio');
  var obligatorio2=document.getElementsByClassName('obligatorio2');
if(obligatorio.length != 0){
  for(var i=0; i<obligatorio.length;i++){//Recorremos cada campo del formulario


    if(i==6){//Campo check
      obligatorio[i].checked=false;//Desmarcamos el check
    }else{
      obligatorio[i].value="";//Valor vacio
    }
  }



}else{
  $(".inputDataRegistro").css({"background-color": "white"}).fadeIn(2000);
  for(var i=0; i<obligatorio2.length;i++){
    obligatorio2[i].value="";
  }
}
var imageInput= document.getElementById('imgInp');
imageInput.value="";
$('#blah').attr('src', "images/sinFoto.png");
}


function añadirCuenta(obligatorio){//Función para aladir cuenta (localStorage)
  debugger;
  var str="";
  var imageInput= $("#file-preview")[0].src;//Obtenemos la imagen del usuario
  for(var i=0; i<obligatorio.length-1;i++){//Añadimos los valores del formulario
    str+=obligatorio[i].value+";";//Separamos cada campo con ;
  }
  str+=imageInput;//Añadimos al final la imagen
  if(localStorage.getItem(obligatorio[3].value)==null){//Comprobamos si existe el usuario
    localStorage.setItem(obligatorio[3].value,str); //identificamos a un usuario por su correo electrónico
    alert("Usuario Guardado");
  }else{
    alert("Usuario Existente, utilice otro correo electrónico");//El usuario ya existe
  }


}

function checkUser(){//Comprueba si existe una cookie de un usuario al iniciar sesión
  var input= document.getElementsByClassName('inputDataSesion');//Cuenta de inicio de sesión
  var storage=localStorage.getItem(input[0].value);
  var storage2=localStorage.getItem(input[2].value);
  //Obtenemos los datos almacenados del usuario
  if(storage != null){
  var data=storage.split(";");
  }
  if(storage2 != null){
  var data=storage2.split(";");
  }
  if((storage != null && data[1] == input[1].value) || (storage2 != null && data[1] == input[3].value)){//El usuario coincide

    document.location.href="ejercicio1.html";
    if(storage != null){
    localStorage.setItem("loggedIn",storage);
    }
    if(storage2 != null){
    localStorage.setItem("loggedIn",storage2);
    }
  }else{
    alert("El usuario o la contraseña no son correctos");//No existe el usuario introducido
  }
}

function changePage(){//Función para recuperar los datos del usuario que ha iniciado sesión
    var primero= "AAAA";
    debugger
    conjunto = localStorage.getItem(localStorage.getItem(primero)).split(";");
    var formulario1 = document.getElementsByClassName('datoFormulario1');
    var formulario2 = document.getElementsByClassName('datoFormulario2');
    //Actualizamos los datos de la página
    formulario2[0].innerHTML = conjunto[1];
    formulario2[1].innerHTML = conjunto[2];
    formulario1[0].innerHTML = conjunto[4];
    formulario2[2].innerHTML = conjunto[3];
    
    $("#nombreEnCabecera").text("Hola " + localStorage.getItem(localStorage.getItem(primero)).split(";")[5]);

    $("#nombreUser").text(conjunto[1]);
  
    if (conjunto[7] != "" && conjunto[7] != null) {
      $("#usuario")[0].src = conjunto[6] + ";" + conjunto[7];
      $("#imagenCabecera")[0].src = conjunto[6] + ";" + conjunto[7];
    } else {
      $("#usuario")[0].src = conjunto[6];
      $("#imagenCabecera")[0].src = conjunto[6];
    }
    $("#nombreUser").text(conjunto[1]);
    formulario1 = document.getElementsByClassName('parrafo');
    formulario1[0].innerHTML = "Nombre: " + conjunto[1];


}

function editarCuenta(data){//Modifica datos de la cuenta de usuario

  var formulario1= document.getElementsByClassName('datoFormulario1');
  var formulario2= document.getElementsByClassName('datoFormulario2');
  var anteriorDato=localStorage.getItem(formulario2[1].innerHTML);//obtenemos los datos anteriores del usuario a modificar
  anteriorDato=anteriorDato.split(";");
  //Reemplazamos valores
  formulario2[0].innerHTML=data[0].value;
  formulario1[0].innerHTML=data[2].value;
  formulario2[2].innerHTML=data[1].value;

  formulario1=document.getElementById('nombreUser');
  formulario1.innerHTML=data[0].value;
  formulario1=document.getElementsByClassName('parrafo');
  formulario1[0].innerHTML="Nombre: "+data[0].value;

  var imageInput= document.getElementById('blah').getAttribute("src");//Obtenemos la imagen de usuario
  $('#usuario').attr('src',imageInput);

 formulario1= document.getElementsByClassName('datoFormulario1');
    var str="";
    if(anteriorDato[anteriorDato.length-1]!="images/sinFoto.png"){//foto de usuario por defecto
    for(var i=0;i<anteriorDato.length-2;i++){

      if(i==2){ //nombre y apellidos
        str+=formulario2[0].innerHTML;
      }else if(i==4){//fecha de nacimiento
        str+=formulario2[2].innerHTML;
      }else if(i==5){//dirección
        str+=formulario1[0].innerHTML;
      }else{
        str+=anteriorDato[i];
      }
        str+=";";
    }
  }else{
    for(var i=0;i<anteriorDato.length-1;i++){

      if(i==2){ //nombre y apellidos
        str+=formulario2[0].innerHTML;
      }else if(i==4){//fecha de nacimiento
        str+=formulario2[2].innerHTML;
      }else if(i==5){//dirección
        str+=formulario1[0].innerHTML;
      }else{
        str+=anteriorDato[i];
      }
        str+=";";
    }
  }
    str+=imageInput;//añadimos la imagen
    localStorage.setItem(formulario2[1].innerHTML,str);//guardamos en el localStorage nuestros nuevos datos
    localStorage.setItem("loggedIn",str);
    alert("Datos guardados correctamente");

}

function closeSesion(){//Cierra sesión de la cuenta y nos lleva a la página de inicio
  document.location.href="paginaPrincipal.html";
}






//JQuery code
var next = function(){
  $('.ma5slider').ma5slider('goToNext');
}

var timer= window.setInterval(next,3000);

$('#carrusel').on('ma5.activeSlide', function (event, slide) {
      window.clearInterval(timer);
      
      timer=window.setInterval(next,3000);
 });

 $('#carrusel').on('ma5.activeSlide', function (event, slide) {
     
   $("#textFromCarrusel").text(textos[slide-1]);

 });
//Carousel
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
        
        document.location.href = "ejercicio1.html";
        


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

function buscar(){
  document.getElementById("fecha1").value;
  $("#fecha2").datepicker("option", "minDate", new Date(2007, 1 - 1, 1));

}
