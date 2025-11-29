# Guía: Reloj Digital (HTML, CSS y JS)

En este proyecto crearemos un reloj digital moderno que muestra la hora y la fecha en tiempo real. Además, aprenderemos a implementar un "Modo Oscuro" que el usuario puede activar.

## Estructura de Archivos
Crearemos una carpeta llamada `reloj_digital` con los siguientes 3 archivos:
1.  `index.html`: La estructura del reloj.
2.  `style.css`: El diseño moderno y los temas (claro/oscuro).
3.  `script.js`: La lógica para actualizar la hora cada segundo.

---

## Paso 1: Estructura HTML (`index.html`)

El HTML es muy simple: un contenedor principal, un botón para cambiar el tema, y dos elementos de texto para la hora y la fecha.

Crea el archivo `index.html` y pega el siguiente código:

```html
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reloj Digital</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <div class="clock-container">
        <!-- Interruptor de Tema -->
        <button id="themeToggle" class="theme-btn" title="Cambiar tema">🌙</button>

        <!-- Hora -->
        <div class="time" id="time">00:00:00</div>

        <!-- Fecha -->
        <div class="date" id="date">Cargando fecha...</div>
    </div>

    <script src="script.js"></script>
</body>

</html>
```

---

## Paso 2: Estilos CSS (`style.css`)

Aquí usaremos **Variables CSS** (`:root`) para manejar los colores. Esto hace que crear un "Modo Oscuro" sea muy fácil, simplemente cambiando los valores de las variables.

Crea el archivo `style.css` y pega el siguiente código:

```css
/* Reset básico */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

/* Variables de colores (Tema Claro por defecto) */
:root {
    --bg-color: #e0e7ff;
    --card-bg: #ffffff;
    --text-primary: #1e293b;
    --text-secondary: #64748b;
    --accent-color: #4f46e5;
    --shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

/* Tema Oscuro (se activa cuando el body tiene la clase 'dark-mode') */
body.dark-mode {
    --bg-color: #0f172a;
    --card-bg: #1e293b;
    --text-primary: #f1f5f9;
    --text-secondary: #94a3b8;
    --accent-color: #818cf8;
    --shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* Cuerpo centrado */
body {
    font-family: 'Segoe UI', system-ui, sans-serif;
    background-color: var(--bg-color);
    color: var(--text-primary);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    transition: background-color 0.3s, color 0.3s;
}

/* Tarjeta del reloj */
.clock-container {
    background-color: var(--card-bg);
    padding: 40px 60px;
    border-radius: 20px;
    box-shadow: var(--shadow);
    text-align: center;
    position: relative;
    min-width: 350px;
    transition: background-color 0.3s, box-shadow 0.3s;
}

/* Hora grande */
.time {
    font-size: 64px;
    font-weight: bold;
    color: var(--text-primary);
    letter-spacing: 2px;
    margin-bottom: 10px;
    font-variant-numeric: tabular-nums; /* Evita que los números salten */
}

/* Fecha */
.date {
    font-size: 18px;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 1px;
}

/* Botón de tema */
.theme-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    transition: transform 0.2s;
}

.theme-btn:hover {
    transform: scale(1.1);
    background-color: rgba(0,0,0,0.05);
}

body.dark-mode .theme-btn:hover {
    background-color: rgba(255,255,255,0.1);
}
```

---

## Paso 3: Lógica JavaScript (`script.js`)

Usaremos el objeto `Date` para obtener la hora actual y `setInterval` para actualizarla cada segundo (1000 milisegundos).

Crea el archivo `script.js` y pega el siguiente código:

```javascript
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

    // Agregamos un cero al inicio si es menor a 10 (ej: 9 -> 09)
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
```

---

## ¡Listo!
Abre el archivo `index.html` en tu navegador. Verás la hora actual y podrás cambiar entre modo claro y oscuro haciendo clic en el icono de la esquina.
