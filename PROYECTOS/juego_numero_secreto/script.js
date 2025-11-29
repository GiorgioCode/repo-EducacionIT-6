// --- Variables de Estado ---
let numeroSecreto; // Aquí guardaremos el número a adivinar
let intentos = []; // Aquí guardaremos los números que el usuario ya probó

// --- Selectores ---
const inputIntento = document.getElementById('guessInput');
const btnProbar = document.getElementById('guessBtn');
const btnNuevo = document.getElementById('newBtn');
const mensajeEl = document.getElementById('message');
const listaHistorial = document.getElementById('historyList');

// --- Funciones ---

// Función para iniciar o reiniciar el juego
function iniciarJuego() {
    // 1. Generar número aleatorio entre 1 y 100
    // Math.random() da un decimal entre 0 y 0.999...
    // Lo multiplicamos por 100 y redondeamos hacia abajo (floor) -> 0 a 99
    // Sumamos 1 -> 1 a 100
    numeroSecreto = Math.floor(Math.random() * 100) + 1;

    // 2. Reiniciar variables
    intentos = [];

    // 3. Limpiar la interfaz
    listaHistorial.innerHTML = ''; // Borra la lista visual
    mensajeEl.textContent = '¡Comenzá a adivinar!';
    mensajeEl.style.color = '#374151'; // Color normal
    inputIntento.value = '';
    inputIntento.disabled = false;
    btnProbar.disabled = false;

    // Enfocar el input para escribir rápido
    inputIntento.focus();

    console.log("Número secreto (shhh):", numeroSecreto);
}

// Función principal: Probar un número
function probarIntento() {
    // Convertimos el texto del input a número entero
    const numeroUsuario = parseInt(inputIntento.value);

    // Validaciones
    if (isNaN(numeroUsuario)) {
        mensajeEl.textContent = "Por favor, ingresá un número.";
        return;
    }
    if (numeroUsuario < 1 || numeroUsuario > 100) {
        mensajeEl.textContent = "El número debe estar entre 1 y 100.";
        return;
    }

    // Guardamos el intento
    intentos.push(numeroUsuario);
    actualizarHistorial();

    // Comparamos
    if (numeroUsuario === numeroSecreto) {
        // GANÓ
        mensajeEl.textContent = `¡Correcto! Lo adivinaste en ${intentos.length} intentos.`;
        mensajeEl.style.color = '#10b981'; // Verde éxito
        terminarJuego();
    } else if (numeroUsuario < numeroSecreto) {
        // Es más bajo
        mensajeEl.textContent = "El número secreto es MÁS ALTO ↑";
        mensajeEl.style.color = '#3b82f6'; // Azul informativo
    } else {
        // Es más alto
        mensajeEl.textContent = "El número secreto es MÁS BAJO ↓";
        mensajeEl.style.color = '#ef4444'; // Rojo advertencia
    }

    // Limpiamos el input para el siguiente intento
    inputIntento.value = '';
    inputIntento.focus();
}

// Función para mostrar los intentos en pantalla
function actualizarHistorial() {
    // Creamos un elemento de lista (li) para el último intento
    const ultimoIntento = intentos[intentos.length - 1];
    const item = document.createElement('li');
    item.className = 'history-item';
    item.textContent = ultimoIntento;

    // Lo agregamos a la lista
    listaHistorial.appendChild(item);
}

// Función para deshabilitar controles al ganar
function terminarJuego() {
    inputIntento.disabled = true;
    btnProbar.disabled = true;
}

// --- Eventos ---

// Al cargar la página, iniciamos el juego
iniciarJuego();

// Botón Probar
btnProbar.addEventListener('click', probarIntento);

// Botón Nuevo Juego
btnNuevo.addEventListener('click', iniciarJuego);

// Permitir usar la tecla ENTER en el input
inputIntento.addEventListener('keydown', (evento) => {
    if (evento.key === 'Enter') {
        probarIntento();
    }
});
