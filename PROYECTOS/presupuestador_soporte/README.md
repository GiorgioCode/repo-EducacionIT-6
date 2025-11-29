# Guía: Presupuestador de Soporte Técnico (HTML, CSS y JS)

En este proyecto crearemos una herramienta para calcular presupuestos de servicios técnicos. Aprenderás a trabajar con formularios, checkboxes, cálculos en tiempo real y a generar un resumen dinámico.

## Estructura de Archivos
Crearemos una carpeta llamada `presupuestador_soporte` con los siguientes 3 archivos:
1.  `index.html`: El formulario de presupuesto.
2.  `style.css`: El diseño profesional.
3.  `script.js`: La lógica de cálculo y generación de resumen.

---

## Paso 1: Estructura HTML (`index.html`)

El HTML contiene un formulario con checkboxes para los servicios (organizados por categorías), un input para horas extra y una lista para el resumen.

Crea el archivo `index.html` y pega el siguiente código:

```html
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Presupuestador de Soporte</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <div class="container">
        <header>
            <h1>💻 Soporte Técnico</h1>
            <p>Calcula el costo estimado de tu reparación o mantenimiento.</p>
        </header>

        <form id="budgetForm">
            <!-- Sección de Servicios -->
            <div class="section">
                <h2>🛠️ Software y Sistema</h2>
                <div class="checkbox-group">
                    <label class="checkbox-item">
                        <input type="checkbox" name="service" value="15000" data-label="Limpieza de Virus/Malware">
                        <span class="checkmark"></span>
                        <span class="label-text">Limpieza de Virus/Malware ($15.000)</span>
                    </label>

                    <label class="checkbox-item">
                        <input type="checkbox" name="service" value="25000" data-label="Formateo e Instalación SO + Drivers">
                        <span class="checkmark"></span>
                        <span class="label-text">Formateo e Instalación SO + Drivers ($25.000)</span>
                    </label>

                    <label class="checkbox-item">
                        <input type="checkbox" name="service" value="12000" data-label="Optimización de Sistema Lento">
                        <span class="checkmark"></span>
                        <span class="label-text">Optimización de Sistema Lento ($12.000)</span>
                    </label>

                    <label class="checkbox-item">
                        <input type="checkbox" name="service" value="10000" data-label="Instalación de Pack de Programas">
                        <span class="checkmark"></span>
                        <span class="label-text">Instalación de Pack de Programas ($10.000)</span>
                    </label>

                    <label class="checkbox-item">
                        <input type="checkbox" name="service" value="30000" data-label="Recuperación de Datos (Software)">
                        <span class="checkmark"></span>
                        <span class="label-text">Recuperación de Datos (Software) ($30.000)</span>
                    </label>
                </div>
            </div>

            <div class="section">
                <h2>🔧 Hardware y Mantenimiento</h2>
                <div class="checkbox-group">
                    <label class="checkbox-item">
                        <input type="checkbox" name="service" value="20000" data-label="Limpieza Física Completa (PC/Notebook)">
                        <span class="checkmark"></span>
                        <span class="label-text">Limpieza Física Completa ($20.000)</span>
                    </label>

                    <label class="checkbox-item">
                        <input type="checkbox" name="service" value="15000" data-label="Cambio de Pasta Térmica">
                        <span class="checkmark"></span>
                        <span class="label-text">Cambio de Pasta Térmica ($15.000)</span>
                    </label>

                    <label class="checkbox-item">
                        <input type="checkbox" name="service" value="15000" data-label="Instalación de Disco SSD (Mano de obra)">
                        <span class="checkmark"></span>
                        <span class="label-text">Instalación de Disco SSD (Mano de obra) ($15.000)</span>
                    </label>

                    <label class="checkbox-item">
                        <input type="checkbox" name="service" value="10000" data-label="Ampliación de Memoria RAM (Mano de obra)">
                        <span class="checkmark"></span>
                        <span class="label-text">Ampliación de Memoria RAM (Mano de obra) ($10.000)</span>
                    </label>

                    <label class="checkbox-item">
                        <input type="checkbox" name="service" value="25000" data-label="Cambio de Pantalla Notebook (Mano de obra)">
                        <span class="checkmark"></span>
                        <span class="label-text">Cambio de Pantalla Notebook (Mano de obra) ($25.000)</span>
                    </label>
                </div>
            </div>

            <div class="section">
                <h2>🌐 Redes y Otros</h2>
                <div class="checkbox-group">
                    <label class="checkbox-item">
                        <input type="checkbox" name="service" value="15000" data-label="Configuración de Router/WiFi">
                        <span class="checkmark"></span>
                        <span class="label-text">Configuración de Router/WiFi ($15.000)</span>
                    </label>

                    <label class="checkbox-item">
                        <input type="checkbox" name="service" value="12000" data-label="Configuración de Impresora en Red">
                        <span class="checkmark"></span>
                        <span class="label-text">Configuración de Impresora en Red ($12.000)</span>
                    </label>

                    <label class="checkbox-item">
                        <input type="checkbox" name="service" value="15000" data-label="Backup de Información (hasta 100GB)">
                        <span class="checkmark"></span>
                        <span class="label-text">Backup de Información (hasta 100GB) ($15.000)</span>
                    </label>
                </div>
            </div>

            <!-- Sección de Extras -->
            <div class="section">
                <h2>Extras</h2>
                <div class="input-group">
                    <label for="hours">Horas adicionales de mano de obra ($10.000/h):</label>
                    <input type="number" id="hours" min="0" value="0">
                </div>
                <div class="checkbox-group">
                    <label class="checkbox-item">
                        <input type="checkbox" id="urgent" value="1.2"> <!-- 20% extra -->
                        <span class="checkmark"></span>
                        <span class="label-text">Servicio de Urgencia (+20%)</span>
                    </label>
                </div>
            </div>

            <!-- Resumen -->
            <div class="summary">
                <h3>Resumen del Presupuesto</h3>
                <ul id="summaryList">
                    <li>Ningún servicio seleccionado.</li>
                </ul>
                <div class="total-row">
                    <span>Total Estimado:</span>
                    <span id="totalPrice">$0</span>
                </div>
            </div>

            <div class="actions">
                <button type="button" id="printBtn" class="btn-secondary">Imprimir</button>
                <button type="button" id="whatsappBtn" class="btn-primary">Enviar por WhatsApp</button>
            </div>
        </form>
    </div>

    <script src="script.js"></script>
</body>

</html>
```

---

## Paso 2: Estilos CSS (`style.css`)

El CSS le dará un aspecto limpio y profesional, similar a una factura o presupuesto digital. Personalizaremos los checkboxes para que se vean mejor.

Crea el archivo `style.css` y pega el siguiente código:

```css
/* Reset básico */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Segoe UI', system-ui, sans-serif;
    background-color: #f0f2f5;
    color: #1c1e21;
    display: flex;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
}

.container {
    background-color: white;
    width: 100%;
    max-width: 600px;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    height: fit-content;
}

header {
    text-align: center;
    margin-bottom: 30px;
    border-bottom: 2px solid #e4e6eb;
    padding-bottom: 20px;
}

h1 {
    color: #1877f2;
    margin-bottom: 5px;
}

h2 {
    font-size: 18px;
    margin-bottom: 15px;
    color: #4b4f56;
}

.section {
    margin-bottom: 25px;
}

/* Checkboxes personalizados */
.checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.checkbox-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    padding: 10px;
    border-radius: 8px;
    transition: background-color 0.2s;
}

.checkbox-item:hover {
    background-color: #f0f2f5;
}

.checkbox-item input {
    display: none; /* Ocultamos el checkbox nativo */
}

.checkmark {
    width: 20px;
    height: 20px;
    border: 2px solid #ccd0d5;
    border-radius: 4px;
    margin-right: 12px;
    position: relative;
    transition: all 0.2s;
}

/* Cuando está marcado */
.checkbox-item input:checked + .checkmark {
    background-color: #1877f2;
    border-color: #1877f2;
}

/* El tick del checkbox */
.checkmark::after {
    content: "";
    position: absolute;
    display: none;
    left: 6px;
    top: 2px;
    width: 4px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}

.checkbox-item input:checked + .checkmark::after {
    display: block;
}

.label-text {
    font-size: 16px;
}

/* Inputs numéricos */
.input-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
}

.input-group input {
    width: 80px;
    padding: 8px;
    border: 1px solid #ccd0d5;
    border-radius: 6px;
    font-size: 16px;
}

/* Resumen */
.summary {
    background-color: #f7f8fa;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #e4e6eb;
}

.summary h3 {
    margin-bottom: 10px;
    font-size: 16px;
    color: #606770;
}

.summary ul {
    list-style: none;
    margin-bottom: 15px;
    padding-left: 0;
    font-size: 14px;
    color: #4b4f56;
}

.summary li {
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
}

.total-row {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    font-weight: bold;
    color: #1c1e21;
    border-top: 1px solid #ccd0d5;
    padding-top: 10px;
}

/* Botones */
.actions {
    display: flex;
    gap: 10px;
    margin-top: 25px;
}

button {
    flex: 1;
    padding: 12px;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s;
}

.btn-primary {
    background-color: #25d366; /* Color WhatsApp */
    color: white;
}

.btn-primary:hover {
    background-color: #128c7e;
}

.btn-secondary {
    background-color: #e4e6eb;
    color: #4b4f56;
}

.btn-secondary:hover {
    background-color: #d8dadf;
}
```

---

## Paso 3: Lógica JavaScript (`script.js`)

El JavaScript escuchará los cambios en el formulario, sumará los precios de los servicios seleccionados y actualizará el total en tiempo real. También incluye una función para enviar el presupuesto por WhatsApp.

Crea el archivo `script.js` y pega el siguiente código:

```javascript
// --- Selectores ---
const form = document.getElementById('budgetForm');
const serviceCheckboxes = document.querySelectorAll('input[name="service"]');
const hoursInput = document.getElementById('hours');
const urgentCheckbox = document.getElementById('urgent');
const summaryList = document.getElementById('summaryList');
const totalPriceEl = document.getElementById('totalPrice');
const whatsappBtn = document.getElementById('whatsappBtn');
const printBtn = document.getElementById('printBtn');

// --- Constantes ---
const PRICE_PER_HOUR = 10000;

// --- Funciones ---

function calculateBudget() {
    let total = 0;
    let summaryHTML = '';

    // 1. Sumar servicios seleccionados
    serviceCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const price = parseInt(checkbox.value);
            const label = checkbox.getAttribute('data-label');
            
            total += price;
            summaryHTML += `<li><span>${label}</span> <span>$${price}</span></li>`;
        }
    });

    // 2. Sumar horas adicionales
    const hours = parseInt(hoursInput.value) || 0;
    if (hours > 0) {
        const hoursCost = hours * PRICE_PER_HOUR;
        total += hoursCost;
        summaryHTML += `<li><span>${hours} Horas extra</span> <span>$${hoursCost}</span></li>`;
    }

    // 3. Aplicar urgencia (si está marcado)
    if (urgentCheckbox.checked) {
        const surcharge = total * 0.20; // 20% extra
        total += surcharge;
        summaryHTML += `<li style="color: #e74c3c;"><span>Urgencia (+20%)</span> <span>$${surcharge.toFixed(0)}</span></li>`;
    }

    // 4. Actualizar HTML
    if (summaryHTML === '') {
        summaryList.innerHTML = '<li>Ningún servicio seleccionado.</li>';
    } else {
        summaryList.innerHTML = summaryHTML;
    }

    totalPriceEl.textContent = '$' + total.toFixed(0);
}

function sendToWhatsApp() {
    const total = totalPriceEl.textContent;
    
    // Obtener fecha actual
    const today = new Date();
    const fechaPresupuesto = today.toLocaleDateString('es-AR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // Calcular fecha de vencimiento (20 días desde hoy)
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 20);
    const fechaVencimiento = expirationDate.toLocaleDateString('es-AR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    let message = `Hola! muchas gracias por confiar en nuestro servicio!! le enviamos el presupuesto de fecha ${fechaPresupuesto}, con vigencia de 20 dias desde hoy (hasta el ${fechaVencimiento}):\n\n`;

    // Recorremos los items del resumen para armar el mensaje
    const items = summaryList.querySelectorAll('li');
    items.forEach(item => {
        const text = item.innerText.replace('\n', ': '); // Formato "Servicio: $Precio"
        message += `- ${text}\n`;
    });

    message += `\n*Total Estimado: ${total}*`;

    // Codificamos el mensaje para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Abrimos WhatsApp (usamos un número de ejemplo o dejamos vacío para que el usuario elija)
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
}

// --- Eventos ---

// Escuchamos cambios en cualquier parte del formulario para recalcular en tiempo real
form.addEventListener('change', calculateBudget);
// También escuchamos el input de horas mientras se escribe
hoursInput.addEventListener('input', calculateBudget);

whatsappBtn.addEventListener('click', sendToWhatsApp);

printBtn.addEventListener('click', () => {
    window.print();
});

// Calcular al inicio por si hay valores por defecto
calculateBudget();
```

---

## ¡Listo!
Abre el archivo `index.html` en tu navegador. Selecciona los servicios y verás cómo se actualiza el presupuesto automáticamente.
