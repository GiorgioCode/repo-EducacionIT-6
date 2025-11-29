# Guía: Generador de Contraseñas (HTML, CSS y JS)

En este proyecto construiremos una herramienta útil para generar contraseñas seguras y aleatorias. Aprenderás a manipular cadenas de texto (strings), generar números aleatorios y copiar texto al portapapeles.

## Estructura de Archivos
Crearemos una carpeta llamada `generador_contrasenas` con los siguientes 3 archivos:
1.  `index.html`: La interfaz de usuario.
2.  `style.css`: El diseño tipo tarjeta.
3.  `script.js`: La lógica de generación aleatoria.

---

## Paso 1: Estructura HTML (`index.html`)

El HTML incluye un área para mostrar la contraseña, botones para copiar y generar, y opciones de configuración (longitud, mayúsculas, etc.).

Crea el archivo `index.html` y pega el siguiente código:

```html
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generador de Contraseñas</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <div class="card">
        <h1>Generador de Contraseñas</h1>

        <!-- Pantalla de la contraseña -->
        <div class="result-container">
            <span id="result">Haga clic en Generar</span>
            <button class="btn" id="clipboardBtn" title="Copiar al portapapeles">📋</button>
        </div>

        <!-- Opciones -->
        <div class="settings">
            <div class="setting">
                <label>Longitud de contraseña</label>
                <input type="number" id="length" min="4" max="20" value="12">
            </div>
            <div class="setting">
                <label>Incluir Mayúsculas</label>
                <input type="checkbox" id="uppercase" checked>
            </div>
            <div class="setting">
                <label>Incluir Minúsculas</label>
                <input type="checkbox" id="lowercase" checked>
            </div>
            <div class="setting">
                <label>Incluir Números</label>
                <input type="checkbox" id="numbers" checked>
            </div>
            <div class="setting">
                <label>Incluir Símbolos</label>
                <input type="checkbox" id="symbols" checked>
            </div>
        </div>

        <button class="btn btn-large" id="generateBtn">Generar Contraseña</button>
    </div>

    <script src="script.js"></script>
</body>

</html>
```

---

## Paso 2: Estilos CSS (`style.css`)

Usaremos un diseño oscuro con colores azules y morados para darle un aspecto "cyber" o tecnológico.

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
    height: 100vh;
    padding: 10px;
}

.card {
    background-color: #23235b;
    box-shadow: 0px 2px 10px rgba(255, 255, 255, 0.2);
    padding: 20px;
    width: 350px;
    max-width: 100%;
}

h1 {
    text-align: center;
    margin: 10px 0 20px;
}

/* Contenedor del resultado */
.result-container {
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    font-size: 18px;
    letter-spacing: 1px;
    padding: 12px 10px;
    height: 50px;
    width: 100%;
    margin-bottom: 20px;
}

.result-container #result {
    word-wrap: break-word;
    max-width: calc(100% - 40px);
}

.result-container .btn {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 40px;
    height: 40px;
    font-size: 20px;
}

/* Botones */
.btn {
    border: none;
    background-color: #3b3b98;
    color: #fff;
    font-size: 16px;
    padding: 8px 12px;
    cursor: pointer;
}

.btn-large {
    display: block;
    width: 100%;
    margin-top: 20px;
}

.btn:hover {
    background-color: #2b2b88;
}

/* Ajustes de configuración */
.setting {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px 0;
}

input[type="number"] {
    width: 50px;
    padding: 5px;
    font-size: 16px;
}

input[type="checkbox"] {
    transform: scale(1.5); /* Hace los checkboxes más grandes */
    cursor: pointer;
}
```

---

## Paso 3: Lógica JavaScript (`script.js`)

Usaremos los códigos ASCII (`String.fromCharCode`) para obtener letras y números aleatorios sin tener que escribir arrays gigantes manualmente.

Crea el archivo `script.js` y pega el siguiente código:

```javascript
// --- Elementos del DOM ---
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateBtn = document.getElementById('generateBtn');
const clipboardBtn = document.getElementById('clipboardBtn');

// --- Funciones de generación de caracteres ---

// String.fromCharCode convierte un código ASCII a letra
// 97-122 son letras minúsculas (a-z)
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

// 65-90 son letras mayúsculas (A-Z)
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

// 48-57 son números (0-9)
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

// Símbolos comunes
function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// Objeto para mapear funciones
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// --- Eventos ---

// Generar contraseña
generateBtn.addEventListener('click', () => {
    // El + convierte string a número
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

// Copiar al portapapeles
clipboardBtn.addEventListener('click', () => {
    const password = resultEl.innerText;

    if (!password || password === 'Haga clic en Generar') {
        return;
    }

    // Usamos la API moderna del portapapeles
    navigator.clipboard.writeText(password).then(() => {
        alert('Contraseña copiada al portapapeles!');
    });
});

// --- Función Principal ---

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    
    // Filtramos los tipos que están marcados como true
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
        item => Object.values(item)[0]
    );

    // Si no hay nada seleccionado, devolvemos vacío
    if (typesCount === 0) {
        return '';
    }

    // Creamos un bucle
    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }

    // Cortamos al largo deseado (por si el bucle se pasó)
    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}
```

---

## ¡Listo!
Abre el archivo `index.html` en tu navegador. Selecciona tus opciones y genera contraseñas seguras al instante.
