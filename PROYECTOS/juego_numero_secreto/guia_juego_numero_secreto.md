# Guía: Juego del Número Secreto (HTML, CSS y JS)

Esta guía te ayudará a crear un juego donde el usuario debe adivinar un número secreto. Aprenderás a usar JavaScript para generar números aleatorios, manejar eventos y modificar el DOM.

## Estructura de Archivos
Crearemos una carpeta llamada `juego_numero_secreto` con los siguientes 3 archivos:
1.  `index.html`: La estructura del juego.
2.  `style.css`: El diseño visual.
3.  `script.js`: La lógica del juego.

---

## Paso 1: Estructura HTML (`index.html`)

El HTML contiene el título, el input para ingresar el número, los botones y las áreas para mensajes y el historial.

Crea el archivo `index.html` y pega el siguiente código:

```html
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Juego del Número Secreto</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <div class="card">
        <h1>Adivina el Número</h1>
        <p class="description">Estoy pensando un número entre <strong>1 y 100</strong>.</p>

        <!-- Controles -->
        <div class="controls">
            <input type="number" id="guessInput" placeholder="?" min="1" max="100">
            <button id="guessBtn" class="btn-primary">Probar</button>
            <button id="newBtn" class="btn-secondary">Nuevo</button>
        </div>

        <!-- Mensaje de feedback -->
        <div id="message" class="message"></div>

        <!-- Historial -->
        <div class="history-container">
            <strong>Tus intentos:</strong>
            <ul id="historyList" class="history-list">
                <!-- Aquí se agregarán los números intentados -->
            </ul>
        </div>

        <div class="footer">
            Pista: Te diré si es más alto o más bajo.
        </div>
    </div>

    <script src="script.js"></script>
</body>

</html>
```

---

## Paso 2: Estilos CSS (`style.css`)

El CSS le dará un aspecto limpio y amigable al juego, con colores para indicar si acertaste o fallaste.

Crea el archivo `style.css` y pega el siguiente código:

```css
/* Reset básico */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

/* Cuerpo: centrado y fondo suave */
body {
    font-family: system-ui, sans-serif;
    background-color: #f3f4f6;
    /* Gris muy claro */
    color: #1f2937;
    /* Gris oscuro */
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
}

/* Tarjeta del juego */
.card {
    background-color: white;
    width: 100%;
    max-width: 450px;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    text-align: center;
    /* Todo centrado */
}

/* Título */
h1 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #111827;
}

/* Texto descriptivo */
.description {
    color: #6b7280;
    margin-bottom: 20px;
    font-size: 16px;
}

/* Controles: input y botones */
.controls {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-bottom: 20px;
}

input[type="number"] {
    padding: 12px;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    width: 120px;
    font-size: 18px;
    text-align: center;
    outline: none;
    transition: border-color 0.2s;
}

input[type="number"]:focus {
    border-color: #10b981;
    /* Verde al enfocar */
}

/* Botones */
button {
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: opacity 0.2s;
}

.btn-primary {
    background-color: #10b981;
    /* Verde esmeralda */
    color: white;
}

.btn-primary:hover {
    opacity: 0.9;
}

.btn-secondary {
    background-color: transparent;
    border: 2px solid #e5e7eb;
    color: #4b5563;
}

.btn-secondary:hover {
    background-color: #f9fafb;
    border-color: #d1d5db;
}

/* Mensaje de resultado */
.message {
    font-size: 18px;
    font-weight: bold;
    min-height: 30px;
    /* Para que no salte el contenido */
    margin-bottom: 20px;
    color: #374151;
}

/* Historial de intentos */
.history-container {
    text-align: left;
    background-color: #f9fafb;
    padding: 15px;
    border-radius: 8px;
    font-size: 14px;
    color: #4b5563;
}

.history-list {
    list-style: none;
    /* Sin puntos */
    margin-top: 8px;
    display: flex;
    flex-wrap: wrap;
    /* Si hay muchos, bajan de línea */
    gap: 8px;
}

.history-item {
    background-color: #e5e7eb;
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: 500;
}

/* Pie de página */
.footer {
    margin-top: 20px;
    font-size: 12px;
    color: #9ca3af;
}
```

---

## Paso 3: Lógica JavaScript (`script.js`)

El JavaScript genera el número secreto, compara el intento del usuario y actualiza la interfaz.

Crea el archivo `script.js` y pega el siguiente código:

```javascript
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
```

---

## ¡Listo!
Abre el archivo `index.html` en tu navegador y juega a adivinar el número.
