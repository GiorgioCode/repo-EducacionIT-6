// --- Selectores ---
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const themeBtn = document.getElementById('themeToggle');
const body = document.body;

// --- Funciones ---

// Función para actualizar el reloj
function updateClock() {
    const now = new Date(); // Obtenemos la fecha y hora actual

    // 1. Obtener horas, minutos y segundos
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Agregamos un cero al inicio si es menor a 10 (ej: 09:05:01)
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // Actualizamos el HTML de la hora
    timeEl.textContent = `${hours}:${minutes}:${seconds}`;

    // 2. Obtener la fecha formateada
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('es-ES', options);

    // Actualizamos el HTML de la fecha
    dateEl.textContent = dateString;
}

// --- Eventos ---

// Cambiar tema (Oscuro / Claro)
themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    // Cambiamos el icono según el modo
    if (body.classList.contains('dark-mode')) {
        themeBtn.textContent = '☀️'; // Sol para volver a claro
    } else {
        themeBtn.textContent = '🌙'; // Luna para ir a oscuro
    }
});

// --- Inicialización ---

// Ejecutamos una vez al inicio para no esperar 1 segundo
updateClock();

// Configuramos el intervalo para que se actualice cada 1000ms (1 segundo)
setInterval(updateClock, 1000);
