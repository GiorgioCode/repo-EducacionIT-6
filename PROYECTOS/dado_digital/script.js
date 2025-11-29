// --- Elementos del DOM ---
// Obtenemos referencias a los elementos principales
const dice = document.getElementById('dice');
const diceFace = document.getElementById('diceFace');
const rollBtn = document.getElementById('rollBtn');
const clearBtn = document.getElementById('clearBtn');
const historyEl = document.getElementById('history');

// --- Variables del juego ---
// Array para almacenar todas las tiradas
let rollHistory = [];

// --- Eventos ---

// Evento para lanzar el dado
rollBtn.addEventListener('click', () => {
    // Llamamos a la función que lanza el dado
    rollDice();
});

// Evento para limpiar el historial
clearBtn.addEventListener('click', () => {
    // Limpiamos el array de historial
    rollHistory = [];
    // Actualizamos la visualización del historial
    updateHistoryDisplay();
});

// --- Funciones del juego ---

/**
 * Función principal que simula el lanzamiento del dado
 */
function rollDice() {
    // Generamos un número aleatorio entre 1 y 6
    const randomNumber = getRandomDiceNumber();

    // Agregamos animación al dado
    addRollingAnimation();

    // Esperamos que termine la animación antes de mostrar el resultado
    // La animación dura 500ms, así que esperamos ese tiempo
    setTimeout(() => {
        // Mostramos el número en el dado
        diceFace.textContent = randomNumber;

        // Agregamos el número al historial
        addToHistory(randomNumber);

        // Actualizamos la visualización del historial
        updateHistoryDisplay();
    }, 500);
}

/**
 * Genera un número aleatorio entre 1 y 6 (valores de un dado)
 * @returns {number} - Un número entre 1 y 6
 */
function getRandomDiceNumber() {
    // Math.random() genera un número entre 0 y 0.999...
    // Lo multiplicamos por 6 para obtener 0 a 5.999...
    // Math.floor() redondea hacia abajo para obtener 0, 1, 2, 3, 4 o 5
    // Sumamos 1 para obtener 1, 2, 3, 4, 5 o 6
    return Math.floor(Math.random() * 6) + 1;
}

/**
 * Agrega la clase de animación al dado
 */
function addRollingAnimation() {
    // Agregamos la clase 'rolling' que tiene la animación CSS
    dice.classList.add('rolling');

    // Removemos la clase después de que termine la animación
    // Esto permite que la animación se ejecute nuevamente en el próximo lanzamiento
    setTimeout(() => {
        dice.classList.remove('rolling');
    }, 500);
}

/**
 * Agrega un número al historial de tiradas
 * @param {number} number - El número que salió en el dado
 */
function addToHistory(number) {
    // Agregamos el número al inicio del array (las tiradas más recientes primero)
    rollHistory.unshift(number);

    // Limitamos el historial a las últimas 20 tiradas para no llenar demasiado la memoria
    if (rollHistory.length > 20) {
        // Si tenemos más de 20, eliminamos el último (el más antiguo)
        rollHistory.pop();
    }
}

/**
 * Actualiza la visualización del historial en el DOM
 */
function updateHistoryDisplay() {
    // Limpiamos el contenido actual del historial
    historyEl.innerHTML = '';

    // Si no hay tiradas, mostramos el mensaje vacío
    if (rollHistory.length === 0) {
        historyEl.innerHTML = '<span class="history-empty">Aún no has lanzado el dado</span>';
        return;
    }

    // Creamos un elemento para cada tirada en el historial
    rollHistory.forEach(number => {
        // Creamos un span para cada número
        const historyItem = document.createElement('span');
        historyItem.classList.add('history-item');
        historyItem.textContent = number;

        // Agregamos el elemento al contenedor del historial
        historyEl.appendChild(historyItem);
    });
}
