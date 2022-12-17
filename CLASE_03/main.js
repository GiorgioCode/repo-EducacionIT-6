console.log("############################################### ")
console.log("##############  Interaccion con HTML   ######## ")
console.log("############################################### ")

//getElementById
var titulo = document.getElementById("titulo")
titulo.className = "fondo_azul letra_grande_blanca"

//getElementsByClassName
var fruta = document.getElementsByClassName("fruta")
console.log(fruta)
fruta[0].className = "estilo_fruta"

//getElementsByTagName
var item_lista = document.getElementsByTagName("li")
item_lista[3].className = "estilo_fruta"

//querySelectorAll
var items_lista = document.querySelectorAll(".fruta")
items_lista.innerText = "estilo_fruta"
console.log(items_lista)

//innerText
var titulo_principal = document.getElementById("titulo_principal")
titulo_principal.innerText = "Hola EducacionIT!"

//value
document.getElementById("nombre").value = "pepe"

// Crear nodo de tipo Elemento, etiqueta p
var parrafo = document.createElement("p");
// Insertar HTML interno
parrafo.innerHTML = "<h2>¡Hola Estudiantes de JavaScript!</h2>"; 
// Añadir el nodo Element como hijo de body
document.body.append(parrafo);

//****************CLASE DATE ************** */
//EJEMPLO CREACION DE OBJETO DATE

var fecha = new Date();
var dia = fecha.getDay();
var fecha_completa = fecha.getDate() + "/" + fecha.getMonth() + "/" + fecha.getFullYear();
console.log(fecha_completa);

// EJEMPLO CON ELSE IF

var hora = new Date().getHours();
if (hora <= 13) {
    document.getElementById("mensaje1").innerHTML = "Buenos dias!";
} else if (hora > 13 && hora <=20) {
    document.getElementById("mensaje1").innerHTML = "Buenas tardes!";
} else if (hora > 20 && hora <=23) {
    document.getElementById("mensaje1").innerHTML = "Buenas tardes!";
}

// EJEMPLO CON SWITCH y CLASE DATE
var mensaje2 = document.getElementById("mensaje2")
switch (dia) {
    case 0:
        mensaje2.innerText = "que buen domingo para hacer un asado"
        break;
    case 1:
        mensaje2.innerText = "Hoy es LUNES! hoy tenemos clase de JavaScript!"
        break;
    case 2:
        mensaje2.innerText = "que buen MARTES para estudiar JavaScript"
        break;
    case 3:
        mensaje2.innerText = "Hoy es MIERCOLES! hoy tenemos clase de JavaScript!"
        break;
    case 4:
        mensaje2.innerText = "que buen JUEVES para estudiar JavaScript"
        break;
    case 5:
        mensaje2.innerText = "que buen VIERNES para finalizar la semana"
        break;
    case 6:
        mensaje2.innerText = "Hoy es SABADO! estamos en fin de semana"
        break;
    default:
        break;
}
