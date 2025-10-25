// =============================================
// ============  TIPOS DE DATOS  ==============
// =============================================

// Números (Number)
const number = 0;  // Entero
const number1 = 23232;  // Entero grande
const number2 = 34.5;  // Decimal

// Cadenas de texto (String)
const name = "pepe";  // Usando comillas dobles
const username = "oso23";  // Puede contener números
const stringNumber = "34";  // Número como texto

// Booleanos (Boolean)
const isActive = true;  // Verdadero
const hasPermission = false;  // Falso

// Indefinido (Undefined)
let indefinida;  // Variable declarada pero sin valor asignado
// Nota: No es común declarar explícitamente undefined

// Objetos (Object)
const person = {
    nombre: "carlos",
    edad: 35,
    activo: true
};

// Arrays (Arreglos)
const numbers = [2, 3, 4, 4, 5, 65, 6];
const mixedArray = [2, 3, 5, stringNumber, person, "texto dentro de un array"];

console.log("Array mixto:", mixedArray);
console.log("Número:", number1);

// =============================================
// ===========  CONVENCIONES  ==================
// =============================================

// En JavaScript moderno, seguimos estas convenciones:
// - camelCase: para variables y funciones (ej: miVariable, calcularTotal)
// - PascalCase: para clases y componentes (ej: MiClase, ComponentePrincipal)
// - UPPER_CASE: para constantes (ej: PI = 3.1416, API_KEY)
// - kebab-case: para nombres de archivos y rutas (ej: mi-archivo.js)
// - snake_case: menos común en JS, se usa en algunos contextos específicos

// =============================================
// ===========  OPERADORES  ====================
// =============================================

// 1. OPERADOR DE ASIGNACIÓN
let uno = 1;
let dos = 2;

// 2. OPERADORES DE CADENA (CONCATENACIÓN)
const nombre = "Jorge";
const apellido = "Paez";
const espacio = " ";

// Concatenación básica
const nombreCompleto1 = nombre + apellido;  // "JorgePaez"

// Template literals (ES6+)
const nombreCompleto2 = `${nombre} ${apellido}`;  // "Jorge Paez"

// Concatenación tradicional con espacio
const nombreCompleto3 = nombre + " " + apellido;  // "Jorge Paez"

// 3. OPERADORES ARITMÉTICOS
const suma = uno + dos;           // 3
const resta = dos - uno;          // 1
const multiplicacion = uno * dos; // 2
const division = uno / dos;       // 0.5
const resto = 5 % 2;              // 1 (módulo: resto de la división)
const potencia = 2 ** 3;          // 8 (2 elevado a la 3)

console.log(`Suma: ${suma}`);
console.log(`Resta: ${resta}`);
console.log(`Multiplicación: ${multiplicacion}`);
console.log(`División: ${division}`);
console.log(`Resto de 5/2: ${resto}`);
console.log(`2 elevado a 3: ${potencia}`);

// 4. OPERADORES DE INCREMENTO Y DECREMENTO
let contador = 0;

// Incremento (aumenta en 1)
contador++;     // post-incremento: devuelve el valor y luego incrementa
++contador;     // pre-incremento: incrementa y luego devuelve el valor

// Decremento (disminuye en 1)
contador--;     // post-decremento
--contador;     // pre-decremento

// Ejemplo práctico
let numero = 5;
console.log(numero++);  // Muestra 5, luego incrementa a 6
console.log(++numero);  // Incrementa a 7, luego muestra 7

//  OPERADORES INCREMENTACION Y DECREMENTACION  //
var numero_muestra = 35
var numero_muestra2 = 25

// =============================================
// =========  OPERADORES DE COMPARACIÓN  =======
// =============================================

const cuarenta = 40;
const treinta = 30;

// Igualdad estricta (===) - Compara valor y tipo
console.log(40 === 40);     // true
console.log(40 === '40');   // false (diferente tipo)

// Desigualdad estricta (!==)
console.log(40 !== 30);     // true
console.log(40 !== '40');   // true (diferente tipo)

// Mayor que (>)
console.log(cuarenta > treinta);   // true
console.log(treinta > cuarenta);   // false

// Menor que (<)
console.log(cuarenta < treinta);   // false
console.log(treinta < cuarenta);   // true

// Mayor o igual que (>=)
console.log(cuarenta >= treinta);  // true
console.log(treinta >= cuarenta);  // false
console.log(treinta >= 30);        // true

// Menor o igual que (<=)
console.log(cuarenta <= treinta);  // false
console.log(treinta <= cuarenta);  // true
console.log(treinta <= 30);        // true

// Igualdad débil (==) - No recomendado por conversión de tipos
console.log(40 == '40');    // true (conversión implícita)
console.log(0 == false);    // true (conversión implícita)

// Desigualdad débil (!=) - Tampoco recomendado
console.log(40 != '40');    // false (conversión implícita)

// =============================================
// =========  OPERADORES LÓGICOS  ==============
// =============================================

// AND lógico (&&) - Devuelve true si ambos operandos son true
console.log(true && true);     // true
console.log(true && false);    // false

// OR lógico (||) - Devuelve true si al menos un operando es true
console.log(true || false);    // true
console.log(false || false);   // false

// NOT lógico (!) - Invierte el valor de verdad
console.log(!true);            // false
console.log(!false);           // true

// Operador nullish coalescing (??) - Devuelve el valor de la derecha si el de la izquierda es null o undefined
const valorPorDefecto = "valor predeterminado";
const valorNulo = null;
console.log(valorNulo ?? valorPorDefecto);  // "valor predeterminado"

// Operador de encadenamiento opcional (?.) - Permite acceder a propiedades anidadas de forma segura
const usuario = {
    nombre: "Carlos",
    direccion: {
        calle: "Av. Principal"
    }
};

console.log(usuario.direccion?.calle);      // "Av. Principal"
console.log(usuario.contacto?.telefono);    // undefined (no hay error)
// =============================================
// =========  EJEMPLOS ADICIONALES  ============
// =============================================

// 1. Ejemplos de comparación de desigualdad
const esDiferente1 = cuarenta !== cuarenta;  // false (son iguales)
const esDiferente2 = cuarenta !== treinta;   // true (son diferentes)

// 2. Operadores lógicos con variables
const x = 7;
const y = 4;

// Operador AND (&&) - Ambas condiciones deben ser verdaderas
console.log("AND lógico:");
console.log(x < 10 && y > 1);   // true (ambas condiciones son verdaderas)
console.log(x < 10 && y < 1);   // false (solo una condición es verdadera)

// Operador OR (||) - Al menos una condición debe ser verdadera
console.log("\nOR lógico:");
console.log(x === 5 || y === 5);  // false (ninguna es verdadera)
console.log(x === 7 || y === 0);  // true (primera condición es verdadera)
console.log(x === 0 || y === 4);  // true (segunda condición es verdadera)
console.log(x === 7 || y === 4);  // true (ambas son verdaderas)

// Operador NOT (!) - Invierte el valor de verdad
console.log("\nNOT lógico:");
const esVerdadero = true;
console.log(!esVerdadero);  // false
console.log(!!esVerdadero); // true (doble negación)

// =============================================
// =========  ENTRADA Y SALIDA DE DATOS  =======
// =============================================

// 1. Entrada de datos con prompt()
// Nota: prompt() detiene la ejecución hasta que el usuario responda
const mensajeUsuario = prompt("Por favor, ingrese un mensaje:", "Mensaje predeterminado");

// 2. Salida de datos
// Usando alert() - Muestra un cuadro de diálogo
alert("¡Bienvenido al curso de JavaScript!");

// Mostrando el mensaje ingresado por el usuario
alert(`Usted ingresó: ${mensajeUsuario}`);

// 3. Salida por consola
// console.log() - Para mensajes de registro normales
console.log("Mensaje normal:", mensajeUsuario);

// console.error() - Para mensajes de error
console.error("Esto es un mensaje de error:", mensajeUsuario);

// console.info() - Para mensajes informativos
console.info("Información:", mensajeUsuario);

// 4. Otros métodos de salida
// document.write() - Escribe directamente en el documento HTML
// Nota: No recomendado para producción, solo para ejemplos
document.write("<p>Mensaje desde document.write: " + mensajeUsuario + "</p>");

// =============================================
// =========  BUENAS PRÁCTICAS  ================
// =============================================

/*
 * 1. Usa const por defecto, y let solo cuando necesites reasignar valores.
 * 2. Evita usar var, ya que tiene un alcance de función que puede causar bugs.
 * 3. Usa nombres descriptivos para las variables.
 * 4. Comenta tu código de manera clara y concisa.
 * 5. Sigue las convenciones de nomenclatura de JavaScript (camelCase).
 * 6. Usa comparaciones estrictas (=== y !==) en lugar de las débiles (== y !=).
 * 7. Utiliza template literals para cadenas que incluyan variables.
 */

// Ejemplo de código siguiendo buenas prácticas
function calcularArea(ancho, alto) {
    // Validación de parámetros
    if (typeof ancho !== 'number' || typeof alto !== 'number' || ancho <= 0 || alto <= 0) {
        console.error('Los parámetros deben ser números positivos');
        return null;
    }
    
    // Cálculo y retorno del área
    const area = ancho * alto;
    console.log(`El área es: ${area}`);
    return area;
}

// Llamada a la función
const areaCalculada = calcularArea(10, 5);
console.log('Área calculada:', areaCalculada);