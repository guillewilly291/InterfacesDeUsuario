$(function($){
  // scripts de JQUERY que llaman a las funciones de los plugins, uno para pop-up y otro para carrusel
  $(".go").leanModal({ top : 200, overlay : 0.7, closeButton: ".modal_close" });
  $(".go2").leanModal({ top : 20, overlay : 0.7});
  $('#demo').RollingSlider({
    showArea:"#example",
    prev:"#jprev",
    next:"#jnext",
    moveSpeed:300,
    autoPlay:true
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
		;function close_modal(modal_id){$("#lean_overlay").fadeOut(200) //funcion para cerrar el popup
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

  var str="";
  var imageInput= document.getElementById('blah').getAttribute("src");//Obtenemos la imagen del usuario
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
  var data=localStorage.getItem("loggedIn");//Los datos se encuentran en el localStorage (loggedIn)
  data=data.split(";");

  var formulario1= document.getElementsByClassName('datoFormulario1');
  var formulario2= document.getElementsByClassName('datoFormulario2');
  //Actualizamos los datos de la página
  formulario2[0].innerHTML=data[2];
  formulario2[1].innerHTML=data[3];
  formulario1[0].innerHTML=data[5];
  formulario2[2].innerHTML=data[4];


  formulario1=document.getElementById('nombreUser');
  formulario1.innerHTML=data[2];
  formulario1=document.getElementsByClassName('parrafo');
  formulario1[0].innerHTML="Nombre: "+data[2];
  if(data[data.length-1]!="images/sinFoto.png"){//Modificación de la imagen de perfil (si el usuario la ha introducido)
    $('#usuario').attr('src', data[data.length-2]+";"+data[data.length-1]);
  }else{
    $('#usuario').attr('src', data[data.length-1]);
  }

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

//Carousel
