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
