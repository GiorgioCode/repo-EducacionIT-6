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
