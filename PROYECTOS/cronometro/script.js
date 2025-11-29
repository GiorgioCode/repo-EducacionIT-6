// --- Elementos del DOM ---
// Obtenemos referencias a todos los elementos de la interfaz
const timerDisplay = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

// --- Variables del cronómetro ---
// Variable para almacenar el identificador del intervalo (para poder detenerlo)
let intervalId = null;
// Tiempo transcurrido en milisegundos
let elapsedTime = 0;
// Momento en que se inició el cronómetro (timestamp)
let startTime = 0;
// Estado del cronómetro (corriendo o pausado)
let isRunning = false;
// Contador de vueltas
let lapCounter = 0;

// --- Eventos ---

// Iniciar cronómetro
startBtn.addEventListener('click', () => {
    start();
});

// Pausar cronómetro
pauseBtn.addEventListener('click', () => {
    pause();
});

// Reiniciar cronómetro
resetBtn.addEventListener('click', () => {
    reset();
});

// Registrar vuelta
lapBtn.addEventListener('click', () => {
    recordLap();
});

// --- Funciones del cronómetro ---

/**
 * Inicia el cronómetro
 */
function start() {
    // Si ya está corriendo, no hacer nada
    if (isRunning) return;

    // Marcamos el cronómetro como activo
    isRunning = true;

    // Guardamos el momento actual menos el tiempo ya transcurrido
    // Esto permite continuar desde donde se pausó
    startTime = Date.now() - elapsedTime;

    // Iniciamos un intervalo que se ejecuta cada 10 milisegundos
    // Esto actualiza el cronómetro de forma suave
    intervalId = setInterval(updateTimer, 10);

    // Actualizamos el estado de los botones
    updateButtonStates(true);
}

/**
 * Pausa el cronómetro
 */
function pause() {
    // Si no está corriendo, no hacer nada
    if (!isRunning) return;

    // Marcamos el cronómetro como inactivo
    isRunning = false;

    // Detenemos el intervalo
    clearInterval(intervalId);

    // Actualizamos el estado de los botones
    updateButtonStates(false);
}

/**
 * Reinicia el cronómetro a cero
 */
function reset() {
    // Pausamos el cronómetro si está corriendo
    pause();

    // Reseteamos todas las variables a su estado inicial
    elapsedTime = 0;
    lapCounter = 0;

    // Actualizamos el display
    timerDisplay.textContent = '00:00:00';

    // Limpiamos la lista de vueltas
    lapsList.innerHTML = '<span class="laps-empty">No hay vueltas registradas</span>';

    // Actualizamos el estado de los botones
    updateButtonStates(false);
}

/**
 * Actualiza el tiempo mostrado en el cronómetro
 */
function updateTimer() {
    // Calculamos el tiempo transcurrido
    // Date.now() nos da el momento actual en milisegundos
    elapsedTime = Date.now() - startTime;

    // Convertimos milisegundos a horas, minutos, segundos y centésimas
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = Math.floor((elapsedTime % 1000) / 10);

    // Formateamos con ceros a la izquierda
    const formattedTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(centiseconds)}`;

    // Actualizamos el display
    timerDisplay.textContent = formattedTime;
}

/**
 * Agrega ceros a la izquierda para que siempre tenga 2 dígitos
 * @param {number} num - Número a formatear
 * @returns {string} - Número formateado con 2 dígitos
 */
function pad(num) {
    // Si el número es menor a 10, agregamos un 0 adelante
    return num < 10 ? '0' + num : num.toString();
}

/**
 * Registra una vuelta con el tiempo actual
 */
function recordLap() {
    // Solo permitimos registrar vueltas si el cronómetro está corriendo
    if (!isRunning) return;

    // Incrementamos el contador de vueltas
    lapCounter++;

    // Si es la primera vuelta, limpiamos el mensaje vacío
    if (lapCounter === 1) {
        lapsList.innerHTML = '';
    }

    // Obtenemos el tiempo actual
    const currentTime = timerDisplay.textContent;

    // Creamos un elemento para la vuelta
    const lapItem = document.createElement('div');
    lapItem.classList.add('lap-item');

    // Contenido de la vuelta
    lapItem.innerHTML = `
        <span class="lap-number">Vuelta ${lapCounter}</span>
        <span class="lap-time">${currentTime}</span>
    `;

    // Agregamos la vuelta al inicio de la lista (las más recientes arriba)
    lapsList.insertBefore(lapItem, lapsList.firstChild);
}

/**
 * Actualiza el estado habilitado/deshabilitado de los botones
 * @param {boolean} running - Si el cronómetro está corriendo
 */
function updateButtonStates(running) {
    if (running) {
        // Si está corriendo: deshabilitar Start, habilitar Pause y Lap
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        lapBtn.disabled = false;
    } else {
        // Si está pausado: habilitar Start, deshabilitar Pause y Lap
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        lapBtn.disabled = true;
    }
}
