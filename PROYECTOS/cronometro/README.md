# Guía: Cronómetro (HTML, CSS y JS)

En este proyecto construiremos un cronómetro funcional con la capacidad de iniciar, pausar, reiniciar y registrar vueltas. Aprenderás a usar `setInterval`, trabajar con timestamps, formatear tiempo y manipular el estado de botones.

## Estructura de Archivos
Crearemos una carpeta llamada `cronometro` con los siguientes 3 archivos:
1.  `index.html`: La interfaz con display del tiempo y botones.
2.  `style.css`: El diseño con botones de colores distintivos.
3.  `script.js`: La lógica de medición de tiempo y registro de vueltas.

---

## Paso 1: Estructura HTML (`index.html`)

El HTML incluye un display grande para el tiempo, cuatro botones de control (iniciar, pausar, reiniciar, vuelta) y un área para mostrar las vueltas registradas.

Crea el archivo `index.html` y pega el siguiente código:

```html
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cronómetro</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <div class="card">
        <h1>⏱️ Cronómetro</h1>

        <!-- Display del tiempo -->
        <div class="timer-display" id="timerDisplay">00:00:00</div>

        <!-- Botones de control -->
        <div class="controls">
            <button class="btn btn-start" id="startBtn">Iniciar</button>
            <button class="btn btn-pause" id="pauseBtn" disabled>Pausar</button>
            <button class="btn btn-reset" id="resetBtn">Reiniciar</button>
            <button class="btn btn-lap" id="lapBtn" disabled>Vuelta</button>
        </div>

        <!-- Lista de vueltas -->
        <div class="laps-container">
            <h3>Vueltas:</h3>
            <div class="laps" id="lapsList">
                <span class="laps-empty">No hay vueltas registradas</span>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>

</html>
```

**Explicación:**
- **timer-display**: Muestra el tiempo en formato HH:MM:SS.CC (con centésimas).
- **Botones**: Cada botón tiene un propósito específico (start, pause, reset, lap).
- **disabled**: Algunos botones comienzan deshabilitados según el estado inicial.

---

## Paso 2: Estilos CSS (`style.css`)

Usamos colores distintivos para cada botón (verde para iniciar, amarillo para pausar, rojo para reiniciar).

Crea el archivo `style.css` y pega el siguiente código:

```css
/* Reset básico */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    background-color: #3b3b98;
    color: #fff;
    font-family: 'Segoe UI', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 10px;
}

.card {
    background-color: #23235b;
    box-shadow: 0px 2px 10px rgba(255, 255, 255, 0.2);
    padding: 30px;
    width: 400px;
    max-width: 100%;
}

h1 {
    text-align: center;
    margin-bottom: 30px;
}

/* Display del cronómetro */
.timer-display {
    background-color: rgba(0, 0, 0, 0.4);
    font-size: 48px;
    font-weight: bold;
    text-align: center;
    padding: 30px;
    margin-bottom: 20px;
    font-family: 'Courier New', monospace;
    letter-spacing: 3px;
}

/* Controles */
.controls {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 20px;
}

.btn {
    border: none;
    color: #fff;
    font-size: 16px;
    padding: 12px 20px;
    cursor: pointer;
}

.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.btn-start {
    background-color: #28a745;
}

.btn-start:hover:not(:disabled) {
    background-color: #218838;
}

.btn-pause {
    background-color: #ffc107;
    color: #000;
}

.btn-pause:hover:not(:disabled) {
    background-color: #e0a800;
}

.btn-reset {
    background-color: #dc3545;
}

.btn-reset:hover {
    background-color: #c82333;
}

.btn-lap {
    background-color: #3b3b98;
}

.btn-lap:hover:not(:disabled) {
    background-color: #2b2b88;
}

/* Vueltas */
.laps-container {
    margin-top: 10px;
}

h3 {
    font-size: 16px;
    margin-bottom: 10px;
    color: #aaa;
}

.laps {
    background-color: rgba(0, 0, 0, 0.4);
    padding: 15px;
    min-height: 60px;
    max-height: 150px;
    overflow-y: auto;
}

.laps-empty {
    color: #888;
    font-style: italic;
}

.lap-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.lap-item:last-child {
    border-bottom: none;
}

.lap-number {
    color: #aaa;
}

.lap-time {
    font-family: 'Courier New', monospace;
    font-weight: bold;
}
```

---

## Paso 3: Lógica JavaScript (`script.js`)

Usaremos `setInterval` para actualizar el cronómetro cada 10ms y `Date.now()` para obtener timestamps precisos.

Crea el archivo `script.js` y pega el siguiente código:

```javascript
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
```

**Conceptos Clave:**
- **setInterval()**: Ejecuta una función repetidamente cada X milisegundos.
- **clearInterval()**: Detiene un intervalo previamente iniciado.
- **Date.now()**: Obtiene el timestamp actual en milisegundos.
- **Cálculos de tiempo**: Conversión de milisegundos a horas/minutos/segundos.
- **Formateo con pad()**: Agrega ceros a la izquierda para formato consistente.
- **Estado de botones**: Habilitar/deshabilitar según el contexto.

---

## ¡Listo!
Abre el archivo `index.html` en tu navegador. Inicia el cronómetro, registra vueltas y observa cómo se actualiza en tiempo real.
