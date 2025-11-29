# Guía: Generador de Códigos QR (HTML, CSS y JS)

En este proyecto construiremos un generador de códigos QR que convierte texto o URLs en códigos escaneables. Aprenderás a integrar librerías externas, trabajar con canvas, y descargar imágenes generadas dinámicamente.

## Estructura de Archivos
Crearemos una carpeta llamada `generador_qr` con los siguientes 3 archivos:
1.  `index.html`: La interfaz con entrada de texto y área de visualización.
2.  `style.css`: El diseño con fondo blanco para el código QR.
3.  `script.js`: La lógica de generación y descarga de códigos QR.

---

## Paso 1: Estructura HTML (`index.html`)

El HTML incluye un textarea para ingresar texto, un selector de tamaño, botones para generar y descargar, y un contenedor para mostrar el código QR.

**Importante:** Este proyecto usa la librería externa `QRCode.js` que se incluye desde un CDN.

Crea el archivo `index.html` y pega el siguiente código:

```html
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generador de Códigos QR</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <div class="card">
        <h1>📱 Generador de Códigos QR</h1>

        <!-- Área de entrada -->
        <div class="input-container">
            <label for="textInput">Ingresa texto o URL:</label>
            <textarea id="textInput" placeholder="https://ejemplo.com o cualquier texto..." rows="4"></textarea>
        </div>

        <!-- Opciones de tamaño -->
        <div class="size-container">
            <label for="sizeSelect">Tamaño del código QR:</label>
            <select id="sizeSelect">
                <option value="128">Pequeño (128x128)</option>
                <option value="256" selected>Mediano (256x256)</option>
                <option value="512">Grande (512x512)</option>
            </select>
        </div>

        <!-- Botón para generar -->
        <button class="btn btn-generate" id="generateBtn">Generar Código QR</button>

        <!-- Área del código QR -->
        <div class="qr-container" id="qrContainer">
            <div class="qr-placeholder">El código QR aparecerá aquí</div>
        </div>

        <!-- Botón para descargar -->
        <button class="btn btn-download" id="downloadBtn" style="display: none;">Descargar Código QR</button>
    </div>

    <!-- Librería QRCode.js desde CDN -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
    <script src="script.js"></script>
</body>

</html>
```

**Explicación:**
- **CDN de QRCode.js**: Incluimos la librería externa que hace todo el trabajo pesado de generar códigos QR.
- **textarea**: Permite entrada de múltiples líneas.
- **select**: Opciones de tamaño predefinidas (128, 256, 512 píxeles).

---

## Paso 2: Estilos CSS (`style.css`)

El contenedor del código QR tiene fondo blanco para que el código sea visible claramente.

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

/* Área de entrada */
.input-container {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    color: #aaa;
}

textarea {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: none;
    background-color: rgba(0, 0, 0, 0.4);
    color: #fff;
    resize: vertical;
    font-family: 'Segoe UI', sans-serif;
}

textarea:focus {
    outline: 2px solid #3b3b98;
}

/* Selector de tamaño */
.size-container {
    margin-bottom: 20px;
}

select {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: none;
    background-color: rgba(0, 0, 0, 0.4);
    color: #fff;
    cursor: pointer;
}

select:focus {
    outline: 2px solid #3b3b98;
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

.btn-generate {
    background-color: #28a745;
}

.btn-generate:hover {
    background-color: #218838;
}

.btn-download {
    background-color: #007bff;
}

.btn-download:hover {
    background-color: #0056b3;
}

/* Contenedor del QR */
.qr-container {
    background-color: #fff;
    padding: 20px;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
}

.qr-placeholder {
    color: #888;
    font-style: italic;
    text-align: center;
}

/* El código QR se genera dentro de este contenedor */
#qrContainer canvas,
#qrContainer img {
    display: block;
    margin: 0 auto;
}
```

---

## Paso 3: Lógica JavaScript (`script.js`)

Usaremos la librería QRCode.js para generar el código QR y la API Canvas para descargarlo como imagen.

Crea el archivo `script.js` y pega el siguiente código:

```javascript
// --- Elementos del DOM ---
// Obtenemos referencias a todos los elementos de la interfaz
const textInput = document.getElementById('textInput');
const sizeSelect = document.getElementById('sizeSelect');
const generateBtn = document.getElementById('generateBtn');
const qrContainer = document.getElementById('qrContainer');
const downloadBtn = document.getElementById('downloadBtn');

// --- Variable para almacenar el objeto QRCode ---
// La mantenemos en el ámbito global para poder regenerarlo
let qrCode = null;

// --- Eventos ---

// Generar código QR al hacer clic en el botón
generateBtn.addEventListener('click', () => {
    generateQRCode();
});

// También generar al presionar Enter en el textarea
textInput.addEventListener('keypress', (e) => {
    // Enter sin Shift genera el código
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault(); // Evita el salto de línea
        generateQRCode();
    }
});

// Descargar código QR
downloadBtn.addEventListener('click', () => {
    downloadQRCode();
});

// --- Funciones principales ---

/**
 * Genera el código QR basado en el texto ingresado
 */
function generateQRCode() {
    // Obtenemos el texto del textarea
    const text = textInput.value.trim();
    
    // Validamos que no esté vacío
    if (text === '') {
        alert('Por favor, ingresa un texto o URL');
        return;
    }
    
    // Obtenemos el tamaño seleccionado
    const size = parseInt(sizeSelect.value);
    
    // Limpiamos el contenedor (removemos QR anterior si existe)
    qrContainer.innerHTML = '';
    
    // Creamos un nuevo código QR usando la librería QRCode.js
    // La librería crea automáticamente un <canvas> o <img> dentro del contenedor
    qrCode = new QRCode(qrContainer, {
        text: text,           // El texto a codificar
        width: size,          // Ancho del código QR
        height: size,         // Alto del código QR
        colorDark: '#000000', // Color de los módulos (cuadrados negros)
        colorLight: '#ffffff',// Color del fondo (blanco)
        correctLevel: QRCode.CorrectLevel.H // Nivel de corrección de errores (H = alto)
    });
    
    // Mostramos el botón de descarga
    downloadBtn.style.display = 'block';
    
    console.log('Código QR generado exitosamente');
}

/**
 * Descarga el código QR como imagen PNG
 */
function downloadQRCode() {
    // Buscamos el canvas generado por la librería QRCode.js
    const canvas = qrContainer.querySelector('canvas');
    
    // Si no existe el canvas, mostramos un error
    if (!canvas) {
        alert('Primero debes generar un código QR');
        return;
    }
    
    // Convertimos el canvas a una URL de datos (data URL) en formato PNG
    // toDataURL() toma el contenido del canvas y lo convierte a base64
    const imageUrl = canvas.toDataURL('image/png');
    
    // Creamos un elemento <a> (enlace) temporal para simular la descarga
    const downloadLink = document.createElement('a');
    
    // Establecemos la URL de la imagen como href del enlace
    downloadLink.href = imageUrl;
    
    // Definimos el nombre del archivo a descargar
    downloadLink.download = 'codigo-qr.png';
    
    // Agregamos el enlace al documento (necesario para Firefox)
    document.body.appendChild(downloadLink);
    
    // Simulamos un clic en el enlace para iniciar la descarga
    downloadLink.click();
    
    // Removemos el enlace temporal del documento
    document.body.removeChild(downloadLink);
    
    console.log('Código QR descargado');
}

// --- Explicación de conceptos clave ---

/*
 * LIBRERÍA QRCODE.JS:
 * - Es una librería JavaScript que genera códigos QR
 * - Se incluye desde un CDN (Content Delivery Network) en el HTML
 * - Crea automáticamente un elemento <canvas> o <img> con el código QR
 * 
 * NIVELES DE CORRECCIÓN DE ERRORES (correctLevel):
 * - L (Low): ~7% de corrección
 * - M (Medium): ~15% de corrección
 * - Q (Quartile): ~25% de corrección
 * - H (High): ~30% de corrección
 * Un nivel más alto permite que el QR funcione aunque esté parcialmente dañado
 * 
 * CANVAS TO DATA URL:
 * - canvas.toDataURL() convierte el contenido del canvas a una imagen en formato base64
 * - Esta imagen se puede descargar o mostrar directamente
 * 
 * DESCARGA MEDIANTE ENLACE TEMPORAL:
 * - Creamos un <a> con href apuntando a la imagen
 * - Usamos el atributo 'download' para forzar la descarga en lugar de abrir
 * - Simulamos un clic programático para iniciar la descarga
 */
```

**Conceptos Clave:**
- **Librerías externas (CDN)**: Uso de código de terceros sin instalación.
- **QRCode.js**: Librería especializada en generar códigos QR.
- **Canvas API**: Permite dibujar gráficos y exportarlos como imágenes.
- **toDataURL()**: Convierte un canvas a imagen base64.
- **Descarga programática**: Simular clics para descargar archivos.

---

## ¡Listo!
Abre el archivo `index.html` en tu navegador. Escribe una URL o texto, selecciona el tamaño y genera tu código QR. Puedes descargarlo como imagen PNG.
