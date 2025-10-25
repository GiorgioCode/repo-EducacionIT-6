/**
 * ============================================
 * INTERACCIÓN CON EL DOM Y MANEJO DE FECHAS
 * ============================================
 * Este archivo muestra ejemplos de manipulación del DOM y uso del objeto Date
 * para crear interfaces dinámicas basadas en fechas y horas.
 */

// ============================================
// MÉTODOS DE SELECCIÓN DEL DOM
// ============================================

// 1. getElementById - Selecciona un elemento por su ID
const titulo = document.getElementById("titulo");
titulo.className = "fondo_azul letra_grande_blanca";

// 2. getElementsByClassName - Selecciona múltiples elementos por clase
// Retorna una HTMLCollection (similar a un array)
const frutas = document.getElementsByClassName("fruta");
console.log('Elementos con clase "fruta":', frutas);
if (frutas.length > 0) {
    frutas[0].className = "estilo_fruta";
}

// 3. getElementsByTagName - Selecciona elementos por etiqueta
const itemsLista = document.getElementsByTagName("li");
if (itemsLista.length > 3) {
    itemsLista[3].className = "estilo_fruta";
}

// 4. querySelectorAll - Versátil selector CSS que devuelve NodeList
const elementosFruta = document.querySelectorAll(".fruta");
console.log('Elementos seleccionados con querySelectorAll:', elementosFruta);

// ============================================
// MANIPULACIÓN DE CONTENIDO
// ============================================

// Modificar texto de un elemento
const tituloPrincipal = document.getElementById("titulo_principal");
tituloPrincipal.innerText = "¡Hola EducaciónIT!";

// Modificar valor de un campo de formulario
document.getElementById("nombre").value = "pepe";

// Crear y añadir un nuevo elemento al DOM
const parrafo = document.createElement("p");
parrafo.innerHTML = "<h2>¡Hola Estudiantes de JavaScript!</h2>";
document.body.append(parrafo);

// ============================================
// MANEJO DE FECHAS CON EL OBJETO DATE
// ============================================

// Crear una nueva instancia de Date
const fechaActual = new Date();
const diaSemana = fechaActual.getDay(); // 0 (domingo) a 6 (sábado)
const diaMes = fechaActual.getDate();    // Día del mes (1-31)
const mes = fechaActual.getMonth() + 1;  // Mes (0-11) → sumamos 1 para 1-12
const anio = fechaActual.getFullYear();  // Año en 4 dígitos

// Formatear fecha como dd/mm/aaaa
const fechaFormateada = `${diaMes}/${mes}/${anio}`;
console.log('Fecha actual:', fechaFormateada);

// ============================================
// EJEMPLO CON CONDICIONALES Y HORAS
// ============================================

const horaActual = new Date().getHours(); // Hora actual (0-23)
const mensaje1 = document.getElementById("mensaje1");

if (horaActual <= 13) {
    mensaje1.innerHTML = "¡Buenos días!";
} else if (horaActual > 13 && horaActual <= 20) {
    mensaje1.innerHTML = "¡Buenas tardes!";
} else {
    mensaje1.innerHTML = "¡Buenas noches!";
}

// ============================================
// EJEMPLO CON SWITCH Y DÍAS DE LA SEMANA
// ============================================

const mensaje2 = document.getElementById("mensaje2");

switch (diaSemana) {
    case 0: // Domingo
        mensaje2.innerText = "¡Qué buen domingo para hacer un asado!";
        break;
    case 1: // Lunes
        mensaje2.innerText = "¡Hoy es LUNES! ¡Tenemos clase de JavaScript!";
        break;
    case 2: // Martes
        mensaje2.innerText = "¡Qué buen MARTES para estudiar JavaScript!";
        break;
    case 3: // Miércoles
        mensaje2.innerText = "¡Hoy es MIÉRCOLES! ¡Clase de JavaScript!";
        break;
    case 4: // Jueves
        mensaje2.innerText = "¡Qué buen JUEVES para seguir aprendiendo JavaScript!";
        break;
    case 5: // Viernes
        mensaje2.innerText = "¡Qué buen VIERNES para finalizar la semana con código!";
        break;
    case 6: // Sábado
        mensaje2.innerText = "¡Hoy es SÁBADO! Disfruta tu fin de semana.";
        break;
    default:
        mensaje2.innerText = "¡Bienvenido a la clase de JavaScript!";
}
