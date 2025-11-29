# Guía: Piedra, Papel o Tijera (HTML, CSS y JS)

En este proyecto construiremos el clásico juego de Piedra, Papel o Tijera contra la computadora. Aprenderás a generar elecciones aleatorias, comparar valores, llevar un marcador y actualizar el DOM de forma dinámica.

## Estructura de Archivos
Crearemos una carpeta llamada `piedra_papel_tijera` con los siguientes 3 archivos:
1.  `index.html`: La interfaz del juego.
2.  `style.css`: El diseño con botones grandes y marcador.
3.  `script.js`: La lógica del juego y determinación del ganador.

---

## Paso 1: Estructura HTML (`index.html`)

El HTML incluye tres botones grandes con emojis para las elecciones, un área para mostrar el resultado, y un marcador que lleva la cuenta de victorias, derrotas y empates.

Crea el archivo `index.html` y pega el siguiente código:

```html
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Piedra, Papel o Tijera</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <div class="card">
        <h1>🎮 Piedra, Papel o Tijera</h1>

        <!-- Área de selección -->
        <div class="choices">
            <button class="choice-btn" data-choice="piedra">✊</button>
            <button class="choice-btn" data-choice="papel">✋</button>
            <button class="choice-btn" data-choice="tijera">✌️</button>
        </div>

        <!-- Resultado del juego -->
        <div class="result-container">
            <div class="result-text" id="resultText">¡Elige tu jugada!</div>
            <div class="choices-made" id="choicesMade"></div>
        </div>

        <!-- Marcador -->
        <div class="scoreboard">
            <div class="score-item">
                <span class="score-label">Jugador</span>
                <span class="score-value" id="playerScore">0</span>
            </div>
            <div class="score-item">
                <span class="score-label">Empates</span>
                <span class="score-value" id="tieScore">0</span>
            </div>
            <div class="score-item">
                <span class="score-label">Computadora</span>
                <span class="score-value" id="computerScore">0</span>
            </div>
        </div>

        <!-- Botón de reinicio -->
        <button class="btn btn-reset" id="resetBtn">Reiniciar Marcador</button>
    </div>

    <script src="script.js"></script>
</body>

</html>
```

**Explicación:**
- **Botones de elección**: Cada botón tiene un `data-choice` que indica qué opción representa.
- **Contenedor de resultado**: Muestra quién ganó y qué eligió cada jugador.
- **Marcador**: Tres columnas para jugador, empates y computadora.

---

## Paso 2: Estilos CSS (`style.css`)

Mantenemos la estética simple con colores oscuros y botones grandes e interactivos.

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
    width: 450px;
    max-width: 100%;
}

h1 {
    text-align: center;
    margin-bottom: 30px;
}

/* Botones de elección */
.choices {
    display: flex;
    justify-content: space-around;
    gap: 15px;
    margin-bottom: 30px;
}

.choice-btn {
    background-color: #3b3b98;
    border: none;
    color: #fff;
    font-size: 60px;
    width: 100px;
    height: 100px;
    cursor: pointer;
    transition: transform 0.1s;
}

.choice-btn:hover {
    background-color: #2b2b88;
    transform: scale(1.1);
}

.choice-btn:active {
    transform: scale(0.95);
}

/* Contenedor de resultado */
.result-container {
    background-color: rgba(0, 0, 0, 0.4);
    padding: 20px;
    margin-bottom: 20px;
    text-align: center;
    min-height: 100px;
}

.result-text {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}

.choices-made {
    font-size: 16px;
    color: #aaa;
}

/* Marcador */
.scoreboard {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
}

.score-item {
    text-align: center;
}

.score-label {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
    color: #aaa;
}

.score-value {
    display: block;
    font-size: 32px;
    font-weight: bold;
}

/* Botón de reinicio */
.btn {
    border: none;
    background-color: #3b3b98;
    color: #fff;
    font-size: 16px;
    padding: 12px 20px;
    cursor: pointer;
    width: 100%;
}

.btn:hover {
    background-color: #2b2b88;
}

.btn-reset {
    margin-top: 10px;
}
```

---

## Paso 3: Lógica JavaScript (`script.js`)

Implementaremos la lógica para generar elecciones aleatorias de la computadora, comparar resultados y actualizar el marcador.

Crea el archivo `script.js` y pega el siguiente código:

```javascript
// --- Elementos del DOM ---
// Obtenemos referencias a todos los botones de elección (piedra, papel, tijera)
const choiceBtns = document.querySelectorAll('.choice-btn');
// Elemento donde mostraremos el resultado (ganaste, perdiste, empate)
const resultText = document.getElementById('resultText');
// Elemento donde mostraremos qué eligió cada jugador
const choicesMade = document.getElementById('choicesMade');
// Elementos del marcador (puntajes)
const playerScoreEl = document.getElementById('playerScore');
const computerScoreEl = document.getElementById('computerScore');
const tieScoreEl = document.getElementById('tieScore');
// Botón para reiniciar el marcador
const resetBtn = document.getElementById('resetBtn');

// --- Variables del juego ---
// Objeto para almacenar los puntajes
let scores = {
    player: 0,
    computer: 0,
    tie: 0
};

// Array con las opciones posibles del juego
const choices = ['piedra', 'papel', 'tijera'];

// Emojis para mostrar las elecciones de forma visual
const choiceEmojis = {
    piedra: '✊',
    papel: '✋',
    tijera: '✌️'
};

// --- Eventos ---
// Agregamos un evento click a cada botón de elección
choiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Obtenemos la elección del jugador desde el atributo data-choice
        const playerChoice = btn.getAttribute('data-choice');
        // Llamamos a la función principal del juego
        playGame(playerChoice);
    });
});

// Evento para reiniciar el marcador
resetBtn.addEventListener('click', () => {
    // Reiniciamos todos los puntajes a 0
    scores.player = 0;
    scores.computer = 0;
    scores.tie = 0;
    // Actualizamos la visualización del marcador
    updateScoreboard();
    // Reseteamos el mensaje de resultado
    resultText.textContent = '¡Marcador reiniciado! Elige tu jugada.';
    choicesMade.textContent = '';
});

// --- Funciones del juego ---

/**
 * Función principal que ejecuta una ronda del juego
 * @param {string} playerChoice - La elección del jugador (piedra, papel o tijera)
 */
function playGame(playerChoice) {
    // La computadora elige aleatoriamente
    const computerChoice = getComputerChoice();
    
    // Determinamos quién ganó
    const winner = getWinner(playerChoice, computerChoice);
    
    // Actualizamos el marcador según el resultado
    updateScore(winner);
    
    // Mostramos el resultado en pantalla
    displayResult(winner, playerChoice, computerChoice);
}

/**
 * Genera una elección aleatoria para la computadora
 * @returns {string} - Una de las tres opciones: piedra, papel o tijera
 */
function getComputerChoice() {
    // Generamos un índice aleatorio entre 0 y 2
    const randomIndex = Math.floor(Math.random() * choices.length);
    // Retornamos la elección correspondiente
    return choices[randomIndex];
}

/**
 * Determina quién ganó la ronda
 * @param {string} player - Elección del jugador
 * @param {string} computer - Elección de la computadora
 * @returns {string} - 'player', 'computer' o 'tie'
 */
function getWinner(player, computer) {
    // Si ambos eligieron lo mismo, es empate
    if (player === computer) {
        return 'tie';
    }
    
    // Definimos las reglas del juego (qué le gana a qué)
    const winConditions = {
        piedra: 'tijera',    // Piedra vence a tijera
        papel: 'piedra',     // Papel vence a piedra
        tijera: 'papel'      // Tijera vence a papel
    };
    
    // Si la elección del jugador vence a la de la computadora, gana el jugador
    if (winConditions[player] === computer) {
        return 'player';
    }
    
    // En cualquier otro caso, gana la computadora
    return 'computer';
}

/**
 * Actualiza el marcador según el ganador
 * @param {string} winner - Quién ganó la ronda
 */
function updateScore(winner) {
    // Incrementamos el contador correspondiente
    if (winner === 'player') {
        scores.player++;
    } else if (winner === 'computer') {
        scores.computer++;
    } else {
        scores.tie++;
    }
    
    // Actualizamos la visualización del marcador
    updateScoreboard();
}

/**
 * Actualiza los elementos del DOM que muestran el marcador
 */
function updateScoreboard() {
    playerScoreEl.textContent = scores.player;
    computerScoreEl.textContent = scores.computer;
    tieScoreEl.textContent = scores.tie;
}

/**
 * Muestra el resultado de la ronda en pantalla
 * @param {string} winner - Quién ganó
 * @param {string} playerChoice - Elección del jugador
 * @param {string} computerChoice - Elección de la computadora
 */
function displayResult(winner, playerChoice, computerChoice) {
    // Mensajes según el resultado
    let message = '';
    
    if (winner === 'player') {
        message = '🎉 ¡Ganaste!';
    } else if (winner === 'computer') {
        message = '😞 Perdiste';
    } else {
        message = '🤝 Empate';
    }
    
    // Actualizamos el texto del resultado
    resultText.textContent = message;
    
    // Mostramos qué eligió cada uno usando emojis
    choicesMade.textContent = `Tú: ${choiceEmojis[playerChoice]} vs Computadora: ${choiceEmojis[computerChoice]}`;
}
```

**Conceptos Clave:**
- **Math.random()**: Genera números aleatorios para la elección de la computadora.
- **Condicionales**: Determinamos el ganador comparando las elecciones.
- **Objeto de mapeo**: `winConditions` define qué le gana a qué.
- **Actualización del DOM**: Modificamos textos e incrementamos contadores.

---

## ¡Listo!
Abre el archivo `index.html` en tu navegador. Haz clic en uno de los tres botones para jugar contra la computadora. El marcador llevará la cuenta de todas las partidas.
