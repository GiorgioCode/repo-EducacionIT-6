/**
 * ============================================
 * CALCULADORA BÁSICA
 * ============================================
 * Este script implementa una calculadora simple que permite:
 * - Ingresar números y operadores
 * - Realizar operaciones matemáticas básicas
 * - Mostrar resultados formateados
 * - Limpiar la pantalla
 * 
 * Nota: Esta implementación usa eval() para evaluar expresiones matemáticas,
 * lo cual puede tener implicaciones de seguridad en aplicaciones reales.
 */

// Referencia al elemento de la pantalla de la calculadora
const pantalla = document.getElementById("valor_pantalla");

/**
 * Añade un valor a la pantalla de la calculadora
 * @param {string|number} val - Valor a mostrar en la pantalla
 */
function mostrar(val) {
    pantalla.value += val;
}

/**
 * Evalúa la expresión matemática en la pantalla y muestra el resultado
 * 
 * Nota sobre el uso de eval():
 * Aunque eval() es conveniente para evaluar expresiones matemáticas,
 * puede ser peligroso si se usa con entradas no confiables, ya que
 * permite la ejecución de código JavaScript arbitrario.
 * 
 * En una aplicación de producción, considera usar una biblioteca de
 * análisis matemático o implementar un evaluador de expresiones seguro.
 * 
 * Referencia: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/eval
 */
function evaluar() {
    try {
        const expresion = pantalla.value;
        const resultado = eval(expresion); // ¡Cuidado con eval() en producción!
        
        // Formatear el resultado a un número con 1 decimal
        const valorFormateado = parseFloat(resultado).toFixed(1);
        
        // Mostrar el resultado en la pantalla
        pantalla.value = valorFormateado;
    } catch (error) {
        // En caso de error (por ejemplo, expresión inválida), mostrar 'Error'
        pantalla.value = "Error";
        console.error("Error al evaluar la expresión:", error);
    }
}

/**
 * Limpia el contenido de la pantalla de la calculadora
 */
function limpiarPantalla() {
    pantalla.value = "";
}
