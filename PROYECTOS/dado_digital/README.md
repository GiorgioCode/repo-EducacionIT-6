# Guía: Dado Digital (HTML, CSS y JS)

En este proyecto construiremos un dado digital que simula el lanzamiento de un dado de 6 caras. Aprenderás a generar números aleatorios, aplicar animaciones CSS, usar setTimeout para crear delays, y mantener un historial de resultados.

## Estructura de Archivos
Crearemos una carpeta llamada `dado_digital` con los siguientes 3 archivos:
1.  `index.html`: La interfaz con el dado y el historial.
2.  `style.css`: El diseño con animación de rotación.
3.  `script.js`: La lógica de números aleatorios y gestión del historial.

---

## Paso 1: Estructura HTML (`index.html`)

El HTML incluye un contenedor visual para el dado, un área para mostrar el historial de tiradas, y botones para lanzar y limpiar.

Crea el archivo `index.html` y pega el siguiente código:

```html
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dado Digital</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <div class="card">
        <h1>🎲 Dado Digital</h1>

        <!-- Contenedor del dado -->
        <div class="dice-container">
            <div class="dice" id="dice">
                <div class="dice-face" id="diceFace">1</div>
            </div>
        </div>

        <!-- Historial de tiradas -->
        <div class="history-container">
            <h3>Historial de tiradas:</h3>
            <div class="history" id="history">
                <span class="history-empty">Aún no has lanzado el dado</span>
            </div>
        </div>

        <!-- Botones -->
        <button class="btn btn-large" id="rollBtn">🎲 Lanzar Dado</button>
        <button class="btn btn-clear" id="clearBtn">Limpiar Historial</button>
    </div>

    <script src="script.js"></script>
</body>

</html>
```

**Explicación:**
- **Dado visual**: Un div blanco con el número centrado.
- **Historial**: Un contenedor que mostrará todas las tiradas anteriores.
- **Botones**: Uno para lanzar y otro para limpiar el historial.

---

## Paso 2: Estilos CSS (`style.css`)

Incluimos una animación de rotación para simular el movimiento del dado al ser lanzado.

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

/* Contenedor del dado */
.dice-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
}

.dice {
    width: 120px;
    height: 120px;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
}

.dice-face {
    font-size: 60px;
    font-weight: bold;
    color: #23235b;
}

/* Animación de rotación para cuando se lanza el dado */
.dice.rolling {
    animation: roll 0.5s ease-out;
}

@keyframes roll {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

/* Historial */
.history-container {
    margin-bottom: 20px;
}

h3 {
    font-size: 16px;
    margin-bottom: 10px;
    color: #aaa;
}

.history {
    background-color: rgba(0, 0, 0, 0.4);
    padding: 15px;
    min-height: 60px;
    max-height: 100px;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.history-empty {
    color: #888;
    font-style: italic;
}

.history-item {
    background-color: #3b3b98;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 18px;
    font-weight: bold;
}

/* Botones */
.btn {
    border: none;
    background-color: #3b3b98;
    color: #fff;
    font-size: 16px;
    padding: 12px 20px;
    cursor: pointer;
    width: 100%;
    margin-top: 10px;
}

.btn:hover {
    background-color: #2b2b88;
}

.btn-large {
    font-size: 18px;
    font-weight: bold;
}

.btn-clear {
    background-color: #555;
}

.btn-clear:hover {
    background-color: #444;
}
```

---

## Paso 3: Lógica JavaScript (`script.js`)

Usaremos `setTimeout` para sincronizar la animación con el cambio de número, y arrays para mantener el historial de tiradas.

Crea el archivo `script.js` y pega el siguiente código:

```javascript
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
```

**Conceptos Clave:**
- **Math.random() con Math.floor()**: Para generar números enteros aleatorios.
- **setTimeout()**: Permite esperar un tiempo antes de ejecutar código (usado para sincronizar con la animación).
- **classList.add() y .remove()**: Para agregar/quitar clases CSS dinámicamente.
- **Array.unshift()**: Agrega elementos al inicio del array.
- **Array.pop()**: Elimina el último elemento del array.
- **document.createElement()**: Crea elementos HTML dinámicamente.

---

## ¡Listo!
Abre el archivo `index.html` en tu navegador. Haz clic en "Lanzar Dado" para ver la animación y el resultado. Todas tus tiradas se guardarán en el historial.
