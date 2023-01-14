var pantalla = document.getElementById("valor_pantalla")

function mostrar(val) {
    pantalla.value += val
}

//La función eval() evalúa un código JavaScript representado como una cadena de caracteres (string),
// sin referenciar a un objeto en particular.
//REFERENCIA: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/eval
//

function evaluar() {
    var x = pantalla.value
    var y = eval(x)
    var valor_para_mostrar = parseFloat(y)
    pantalla.value = valor_para_mostrar.toFixed(1)
}

function limpiar_pantalla() {
    pantalla.value = ""
}

