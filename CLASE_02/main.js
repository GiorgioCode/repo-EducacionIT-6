// ============================================
// EJEMPLO CON IF-ELSE - VALIDACIÓN DE EDAD
// ============================================
// Este ejemplo muestra cómo usar condicionales para controlar el flujo del programa
// basado en la edad ingresada por el usuario.
const edad = parseInt(prompt("Por favor, digite su edad"));
if (edad >= 0 && edad < 18) {
    alert("Disculpe, solo se permite el ingreso a mayores de 18 años");
} else {
    alert("¡Que disfrutes navegando en nuestro sitio!");
}

// ============================================
// EL PROBLEMA DEL ELSE - VALIDACIÓN DE NÚMERO
// ============================================
// Este ejemplo ilustra un problema común con las condiciones: la validación incompleta
// de entradas puede llevar a resultados inesperados, como aceptar números negativos.
alert("Le informaremos cuánto le falta contar para llegar a 10");
const numero = prompt("Ingrese un número menor a 10");
if (numero <= 10) {
    const calculo = 10 - numero;
    alert(`Le falta contar ${calculo} números más para llegar a 10`);
} else {
    alert("Debe elegir un número menor a 10 para poder asistirlo");
} // Nota: Este código acepta números negativos, lo cual puede no ser el comportamiento deseado

// ============================================
// EJEMPLO CON SWITCH - MENÚ INTERACTIVO
// ============================================
// Muestra cómo usar switch para manejar múltiples casos de manera más limpia que múltiples if-else
let entrada = prompt("Ingresar un nombre (escriba 'ESC' para salir)");
// El bucle se ejecuta hasta que el usuario ingrese "ESC"
while (entrada !== "ESC") {
    switch (entrada) {
        case "ANA":
            alert("HOLA ANA");
            break;
        case "JUAN":
            alert("HOLA JUAN");
            break;
        default:
            alert("¿QUIÉN SOS?");
            break;
    }
    entrada = prompt("Ingresar un nombre (escriba 'ESC' para salir)");
}

// ============================================
// BUCLE FOR - TABLA DE MULTIPLICAR
// ============================================
// Muestra cómo usar un bucle for para generar una tabla de multiplicar
// El usuario ingresa un número y se muestra su tabla de multiplicar del 1 al 10
const numeroIngresado = parseInt(prompt("Ingrese un número para ver su tabla de multiplicar"));
// El bucle for es ideal cuando sabemos exactamente cuántas veces necesitamos iterar
for (let indice = 1; indice <= 10; indice++) {
    const resultado = numeroIngresado * indice;
    console.log(`${numeroIngresado} X ${indice} = ${resultado}`);
}

// ============================================
// BUCLE WHILE - MENÚ INTERACTIVO 2
// ============================================
// Similar al ejemplo anterior pero usando while en lugar de do-while
// Útil cuando el número de iteraciones no es conocido de antemano
let nombre = prompt("Ingresar un nombre (escriba 'ESC' para salir)");
while (nombre !== "ESC") {
    switch (nombre) {
        case "ANA":
            alert("HOLA ANA");
            break;
        case "JUAN":
            alert("HOLA JUAN");
            break;
        default:
            alert("¿QUIÉN SOS?");
            break;
    }
    nombre = prompt("Ingresar un nombre (escriba 'ESC' para salir)");
}

// ============================================
// BUCLE DO-WHILE - CONFIRMACIÓN
// ============================================
// El bucle do-while garantiza que el código se ejecute al menos una vez
// antes de verificar la condición de continuación
let repetir = false;
do {
    alert("Este mensaje aparecerá hasta que usted no quiera.");
    repetir = confirm("¿Desea ver de nuevo el mensaje?");
} while (repetir);

// ============================================
// EJERCICIO FIZZBUZZ
// ============================================
// Un clásico ejercicio de programación que combina:
// - Bucles (para iterar a través de números)
// - Condicionales (para verificar múltiplos)
// - Operador módulo % (para encontrar divisores)
//
// Reglas:
// - Para números divisibles por 3 → "Fizz"
// - Para números divisibles por 5 → "Buzz"
// - Para números divisibles por ambos (15) → "FizzBuzz"
// - Para otros números → el número mismo

const terminos = prompt("¿Cuántos términos de la secuencia FizzBuzz desea calcular?");
const ciclos = parseInt(terminos);

for (let i = 1; i <= ciclos; i++) {
    let resultado = i; // Valor por defecto
    
    if (i % 15 === 0) {  // Múltiplo de 3 y 5 (mínimo común múltiplo)
        resultado = "FizzBuzz";
    } else if (i % 3 === 0) {
        resultado = "Fizz";
    } else if (i % 5 === 0) {
        resultado = "Buzz";
    }
    
    // Agregar el resultado al elemento HTML con id "fizzbuzz"
    document.getElementById("fizzbuzz").innerHTML += `${resultado}, `;
}