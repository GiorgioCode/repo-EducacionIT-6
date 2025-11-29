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
