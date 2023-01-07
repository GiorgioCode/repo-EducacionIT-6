//STRING TEMPLATE

const productos = [{ id: 1,  nombre: "Arroz", precio: 125 },
                  {  id: 2,  nombre: "Fideo", precio: 70 },
                  {  id: 3,  nombre: "Pan"  , precio: 50},
                  {  id: 4,  nombre: "Flan" , precio: 100}];

for (const item of productos) {
    let contenedor = document.createElement("div");
    //Definimos el innerHTML del elemento con una plantilla de texto
    contenedor.innerHTML = `<h3> ID: ${item.id}</h3>
                            <p>  Producto: ${item.nombre}</p>
                            <b> $ ${item.precio}</b>`;
    document.body.appendChild(contenedor);
}



//FUNCION SIMPLE Y LLAMADO

function solicitarNombre(){
    let nombreIngresado   = prompt("Ingresar nombre")
    alert("El nombre ingresado es " + nombreIngresado)
} 
//solicitarNombre();


//PARAMETROS

function conParametros(parametro1, parametro2) {
    console.log(parametro1 + " " + parametro2);
}

conParametros("Hola", "Alumnos"); // -> “Hola Alumnos”
conParametros("Cursando", "JS"); // -> “Cursando JS”

//EJEMPLO SUMAR Y MOSTRAR

//Función que suma dos números y retorna el resultado
function sumar(primerNumero, segundoNumero) {
    return primerNumero + segundoNumero
}

//Función que muestra resultado por consola
function mostrar(mensaje) {
    console.log(mensaje)
}
//Llamamos a sumar pasandola como parametro de mostrar
mostrar(sumar(6,3)); //9

//ASIGNAR EL RETORNO DE UNA FUNCION A UNA VARIABLE

function sumar(primerNumero, segundoNumero) {
    return primerNumero + segundoNumero;
}

let suma = sumar(5, 8);

console.log(suma)  // ⇒ 13
console.log(sumar(5,8))  // ⇒ 13

//CALCULADORA

function calculadora(primerNumero, operacion, segundoNumero) {
    switch (operacion) {
        case "+":
            return primerNumero + segundoNumero;
            break;
        case "-":
            return primerNumero - segundoNumero;
            break;
        case "*":
            return primerNumero * segundoNumero;
            break;
        case "/":
            return primerNumero / segundoNumero;
            break;
        default:
            return 0;
            break;
    }
}

console.log(calculadora(10, "*", 5 )); //50
console.log(calculadora(5, "*", 1 )); //5
console.log(calculadora(6, "-", 2 )); //4

//VOLVER A LA PRESENTACION
//VARIABLES GLOBALES Y LOCALES

var resulta = 0
function sumando(primerNumero, segundoNumero) {
    resulta = primerNumero + segundoNumero;
}
sumando(5,6);
//Se puede acceder a la variable resultado porque es global
console.log(resulta);

function multiplico(primerNumero, segundoNumero) {
    var multiplicacion = primerNumero * segundoNumero;
}
//No se puede acceder a la variable resultado fuera del bloque
//console.log(multiplicacion);


//OTRO EJEMPLO
var nombre = "John Doe" // variable global

function saludar() {
    var nombre = "Juan Perez" // variable local
    console.log(nombre)
}
//Accede a nombre global
console.log(nombre)   // → “John Doe”

//Accede a nombre local
saludar() // → “Juan Perez”

//OTRO MAS APLICANDO DIFERENCIACION POR SCOPE

function sumadora(num1, num2) {
    let resultado = num1 + num2
    return resultado
}

function restadora(num1, num2) {
    let resultado = num1 - num2
    return resultado
}

console.log(sumadora(4,5))
console.log(restadora(6,3))

//VOLVER A LA PRESENTACION

//FUNCIONES ANONIMAS Y FUNCIONES FLECHA

//Generalmente, las funciones anónimas se asignan a variables declaradas como constantes
const Sumando  = function (a, b) { return a + b }
const Restando = function (a, b) { return a - b }
console.log( Sumando(15,20) )
console.log( Restando(15,5) )

var SUMANDO  = (a, b) => { return a + b }
//Si es una función de una sola línea con retorno podemos evitar escribir el cuerpo.
var RESTANDO = (a, b) =>  a - b ;
console.log( SUMANDO(15,20) )
console.log( RESTANDO(20,5) )

//EJEMPLO CALCULAR PRECIO SUMANDO IVA Y DESCONTANDO UN 10%

const SUMAR  = (a,b) => a + b
const RESTAR = (a,b) => a - b
//Si una función es una sola línea con retorno y un parámetro puede evitar escribir los ()
const iva   = x => x * 0.21
var precioProducto  = +prompt("ingrese el valor a calcular")
var descuento = precioProducto * 0.10
//Calculo el precioProducto + IVA - descuento
var nuevoPrecio = RESTAR(SUMAR(precioProducto, iva(precioProducto)), descuento) 
console.log(nuevoPrecio)

