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
