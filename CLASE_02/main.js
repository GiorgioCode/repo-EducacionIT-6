
// EJEMPLO CON IF 
var edad = parseInt(prompt("por favor, digite su edad"))
if (edad >= 0 && edad < 18) {
    alert("disculpe, solo se permite el ingreso a mayores de 18 años")
} else {
    alert("que disfrutes navegando por nuestro sitio!")
}

// EL PROBLEMA DEL ELSE

alert("le informaremos cuanto le falta contar para llegar a 10")
var numero = prompt("ingrese un numero menor a 10")
if ( numero <= 10) {
    var calculo = 10 - numero
    alert("le falta contar "+calculo+"numeros mas para llegar a 10")
} else {
    alert("debe elegir un numero menor a 10 para poder asistirlo")
} // en este caso, si se introducen numeros negativos que cumplirian la condicion, rompen el programa

// EJEMPLO CON SWITCH
var entrada = prompt("Ingresar un nombre");
//Repetimos hasta que se ingresa "ESC"
while(entrada != "ESC" ){
   switch (entrada) {
       case "ANA":
            alert("HOLA ANA");
            break;
        case "JUAN":
            alert("HOLA JUAN");
            break;
       default:
           alert("¿QUIÉN SOS?")
           break;
   }
   entrada = prompt("Ingresar un nombre");
}



//FOR

// Solicitamos un valor al usuario
var ingresarNumero = parseInt(prompt("Ingresar Numero"));
// En cada repetición, calculamos el número ingresado x el número de repetición (i)
for (let indice = 1; indice <= 10; indice++) {
    var resultado = ingresarNumero * indice ;
    console.log(ingresarNumero +" X "+ indice +" = "+ resultado);
}


// WHILE

var entrada = prompt("Ingresar un nombre");
//Repetimos hasta que se ingresa "ESC"
while(entrada != "ESC" ){
   switch (entrada) {
       case "ANA":
            alert("HOLA ANA");
            break;
        case "JUAN":
            alert("HOLA JUAN");
            break;
       default:
           alert("¿QUIÉN SOS?")
           break;
   }
   entrada = prompt("Ingresar un nombre");
}

// DO WHILE

var repetir = false; //se define afuera para no redefinir en cada iteracion
do{
alert("Este mensaje aparecerá hasta que usted no quiera.");
repetir = confirm("desea ver de nuevo el mensaje?")
}while(repetir)

// FIZZBUZZ
// Escribir un programa que muestre en pantalla los números del 1 al 100, 
// sustituyendo los múltiplos de 3 por la palabra “fizz”, los múltiplos de 5 
// por “buzz” y los múltiplos de ambos, es decir, los múltiplos de 3 y 5
// por la palabra “fizzbuzz”.

var terminos = prompt("cuantos terminos de sucecion desea calcular?");
var ciclos = parseInt(terminos);
var mostrar = 0;

for (let i = 1; i <= ciclos; i++) {
    if (i % 3 == 0 && i % 5 == 0) {
        mostrar = "FizzBuzz";
    } else if (i % 3 == 0) {
        mostrar = "Fizz";
    } else if (i % 5 == 0) {
        mostrar = "Buzz";
    } else {
        mostrar = i;
    }
    document.getElementById("fizzbuzz").innerHTML += mostrar+", "
}