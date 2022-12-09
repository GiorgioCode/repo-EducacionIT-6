console.log("############################################### ")
console.log("#################  VARIABLES  ################# ")
console.log("############################################### ")

var number = 0
var number1 = 23232
var number2 = 34.5

var string = "pepe"
var string1 = "oso23"
var string3 = "34"

var bool = true
var bool2 = false

var indefinida = undefined

var object = {nombre:"carlos",edad:35}

var array = [2,3,4,4,5,65,6]
var array2 = [2,3,5,string3, object, "texto dentro de un array"]

console.log(array2)
console.log(number1)

//convenciones:
// camelCase estoEsUnEjemplo
// PascalCase EstoEsUnEjemplo
// kebab-case esto-es-un-ejemplo
// snake_case esto_es_un_ejemplo

console.log("############################################### ")
console.log("#################  OPERADORES  ################ ")
console.log("############################################### ")

//OPERADOR DE ASIGNACION
var uno = 1
var dos = 2

//OPERADOR DE CONCATENACION
var nombre = "Jorge"
var apellido = "Paez"
var espacio = " "

var nombre_completo = nombre+apellido //nombre_completo = JorgePaez
var nombre_completo2 = nombre+" "+apellido //nombre_completo = Jorge Paez
var nombre_completo3 = nombre+espacio+apellido //nombre_completo = Jorge Paez

//OPERADORES ARITMETICOS
suma = uno + dos // suma = 3
resta = dos - uno //resta = 1
multiplicacion = uno * dos //multiplicacion = 2
division = uno / dos //division = 0.5
resto = 5%2 // resto = 1

//  OPERADORES INCREMENTACION Y DECREMENTACION  //
var numero_muestra = 35
var numero_muestra2 = 25
//INCREMENTACION
numero_muestra++ //numero_muestra = 36
//es lo mismo que escribir numero_muestra = numero_muestra + 1

//DECREMENTACION
numero_muestra2-- //numero_muestra = 24
//es lo mismo que escribir numero_muestra = numero_muestra - 1

//  OPERADORES INCREMENTACION Y DECREMENTACION  //
var numero_muestra = 35
var numero_muestra2 = 25

//OPERADORES DE COMPARACION
var cuarenta = 40
var treinta = 30
//MAYOR QUE
var mayorque = 0
mayorque = cuarenta > treinta //mayorque = true
mayorque = treinta > cuarenta //mayorque = false
//MENOR QUE
menorque = 0
menorque = cuarenta < treinta //menorque = false
menorque = treinta < cuarenta //menorque = true
//MAYOR O IGUAL QUE
mayorigual = 0
mayorigual = cuarenta >= treinta //mayorigual = true
mayorigual = treinta >= cuarenta //mayorigual = false
mayorigual = treinta >= treinta //mayorigual = true

//MENOR O IGUAL QUE
var menorigual = 0
menorigual = cuarenta <= treinta //menorigual = false
menorigual = treinta <= cuarenta //menorigual = true
menorigual = treinta <= treinta //menorigual = true

//IGUAL QUE
var igualque = 0
igualque = cuarenta == cuarenta //igualque = true
igualque = cuarenta == treinta //igualque = false

//DISTINTO que
var distintoque = 0
distintoque = cuarenta != cuarenta // distintoque = false
distintoque = cuarenta != treinta // distintoque = true

console.log("############################################### ")
console.log("#################  OPERADORES LÓGICOS  ######## ")
console.log("############################################### ")

//ASIGNAMOS VARIABLES X E Y
var x = 7;
var y = 4;

//OPERADOR AND &&

(x < 10 && y > 1); // true 
(x < 10 && y < 1); // false

//OPERADOR AND ||

(x == 5 || y == 5); // false 
(x == 7 || y == 0); // true
(x == 0 || y == 4); // true
(x == 7 || y == 4); // true

//OPERADOR NEGACIÓN

var verdadero = true
!verdadero //false

console.log("############################################### ")
console.log("#################  ENTRADA DATOS  ############# ")
console.log("############################################### ")

mensaje = prompt("inserte mensaje", "ingrese una linea de texto")

console.log("############################################### ")
console.log("#################  SALIDA DATOS  ############## ")
console.log("############################################### ")
alert("texto de prueba")
alert(mensaje)

console.log(mensaje)
console.error(mensaje)
console.info(mensaje)