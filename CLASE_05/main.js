//ARREGLOS
// Declaraciòn de array vacío
var arrayA = [];
// Declaracion de array con nùmeros
var arrayB = [1,2];
// Declaracion de array con strings
var arrayC = ["C1","C2","C3"];
// Declaracion de array con booleanos
var arrayD = [true,false,true,false];
// Declaracion de array mixto
var arrayE = [1,false,"C4"];


//ACCESO A DATOS DEL ARRAY

var  numeros = [1,2,3,4,5];
console.log( numeros[0] ) // 1; 
console.log( numeros[3] ) // 4; 
var resultado  = numeros[1] + numeros[2] 
console.log( resultado  ) // 5;


//RECORRIDO DE UN ARRAY

const numeros = ["perro","gato", "vaca", "cebra", "oso"];
for (let index = 0; index < 5; index++) {
    console.log(numeros[index]);
}

const numeros = ["perro","gato", "vaca", "cebra", "oso"];
for (let index = 0;index < numeros.length; index++) {
    console.log(numeros[index]);
}


//MATRICES

var elementosSolar = [
    ["luna", "saturno", "marte"],
    ["pluton", "sol", "tierra"],
    ["jupiter", "urano", "venus"],
];

console.log(elementosSolar[0][1]); //saturno
console.log(elementosSolar[0][2]); //marte
console.log(elementosSolar[2][2]); //venus
console.log(elementosSolar[1][1]); //sol


//EJEMPLO RECORRER MATRIZ CON BUCLE FOR

var personas = [
    ["Ana", "Sanchez", "Dentista", 18, "Futbol"],
    ["Juan", "Rodriguez", "Mecanico", 23, "Hockey"],
    ["Mario", "Gimenez", "Bailarin", 38, "Rugby"],
    ["Jeronimo", "Peralta", "Medico", 45, "Remo"],
    ["Maria", "Olmos", "Periodista", 33, "Ala Delta"],
];

for (var i = 0; i < personas.length; i++) {
    console.log(
        "Hola! mi nombre es " +
            personas[i][0] +
            " " +
            personas[i][1] +
            ", tengo " +
            personas[i][3] +
            " años, soy " +
            personas[i][2] +
            " y me gusta practicar " +
            personas[i][4]
    );
}

//ARRAYS

//  Crear un codigo que reciba un arreglo de strings y genere:
//  Un nuevo arreglo que contenga aquellos strings que tengan solamente 3 letras.
//
//  Ejemplo: si recibe:
// arrayPrueba = ["auto", "moto", "aro", "ojo", "camion"];
//  Debe generar un nuevo array que contenga:
// nuevoArray = ["aro","ojo"]


var nuevoArray = []; // inicializa un arreglo vacio
var arrayPrueba = ["auto", "moto", "aro", "ojo", "camion"];

for (let i = 0; i < arrayPrueba.length; i++) {
    if (arrayPrueba[i].length === 3) {
      // verifica si cumple la condicion
      nuevoArray.push(arrayPrueba[i]); // agregar elementos al arreglo global
    }
}

console.log(arrayPrueba); //muestra array de prueba en consola
console.log(nuevoArray); // muestra el resultado del nuevo array generado


//******************METODOS DE ARRAY******************* 




//Metodos de Array - La Carrera

//Declara un array que vamos a llamar “clasificaciones” con los siguientes valores:
//Ana, Oswaldo, Raúl, Celia, María, Antonio
let clasificacion = ["Ana", "Oswaldo", "Raúl", "Celia", "María", "Antonio "];
//(vamos a suponer que es el orden de clasificación de un concurso, en un momento dado)

//Imprimr en consola la clasificación actual
console.log("Resultado de clasificacion inicial: ");
function mostrarClasificacion() {
  for (let i = 0; i < clasificacion.length; i++) {
    console.log(`El puesto ${i + 1} es de ${clasificacion[i]}`);
  }
}
mostrarClasificacion();
//El concurso continua, y se modifica la posicion inicial. Debemos cambiar en el array para reflejar estos cambios:
//Celia adelanta a Raúl
clasificacion[2] = "Celia";
clasificacion[3] = "Raúl";
//Antonio es descalificado y se elimina del concurso
clasificacion.pop();
//Detrás de Ana y antes de Oswaldo se clasifican dos nuevos concursantes: Roberto y Amaya, en ese orden
clasificacion.splice(1, 0, "Roberto", "Amaya");
//Hay una nueva participante que pasa a encabezar la clasificación: Marta
clasificacion.unshift("Marta");
//Imprime la clasificación actualizada y comprueba que se ha hecho correctamente
console.log("Resultado de clasificacion actualizada: ");
mostrarClasificacion();
//para ver las tablas de clasificaciones iniciales y final, abrir la consola del navegador.


//CONDICIONAL FIESTA

var integrantesFiesta = []
var nuevoIntegrante = ""
var verificacion = false
while(verificacion === false) {
    nuevoIntegrante = prompt("ingrese su nombre")
    integrantesFiesta.push(nuevoIntegrante)

    if(integrantesFiesta.includes("pepe")) {
        verificacion = true
        alert("ya tenemos a un pepe, comencemos la fiesta!")
        break
    } else {
        alert("tenemos a "+integrantesFiesta.length+" integrantes pero no tenemos a un pepe")
    }

}

//FOR OF y FOR CON ARRAY DE OBJETOS
var productos = [{ id: 1, nombre: "Arroz", precio:200 },
                  { id: 2,  nombre: "Fideo", precio:500 },
                  { id: 3,  nombre: "Pan", precio:300 }];

for(var i = 0;i<productos.length;i++){
    console.log("El precio del "+productos[i].nombre+" es de "+productos[i].precio+" dolares");
}

for (var producto of productos) {
    console.log("El precio del "+producto.nombre+" es de "+producto.precio+" pesos");
}

//************************************************EVENTOS

//mostrar coordenadas
function funcionCoordenadas(e) {
    x = e.clientX;
    y = e.clientY;
    coor = "Coordenadas: (" + x + "," + y + ")";
    document.getElementById("textoCoordenadas").innerHTML = coor
}

function limpiarCoordenadas() {
    document.getElementById("textoCoordenadas").innerHTML = "";
}

//ESCUCHAR EVENTO EN BOTON
let boton = document.getElementById("btnPrincipal")
boton.addEventListener("click", respuestaClick)
function respuestaClick(){
  alert("Alguien ha clickeado el boton =)");
}

//INPUT DE TEXTO

let miFormulario      = document.getElementById("formulario");
miFormulario.addEventListener("submit", validarFormulario);

function validarFormulario(e){
    //Cancelamos el comportamiento del evento
    e.preventDefault();
    //Obtenemos el elemento desde el cual se disparó el evento
    let formulario = e.target
    //Obtengo el valor del primero hijo <input type="text"> con formulario.children[0].value
    //Obtengo el valor del segundo hijo <input type="number"> con formulario.children[1].value
    alert("FORMULARIO ENVIADO. El nombre es "+formulario.children[0].value+" y la edad es "+formulario.children[1].value)
}


