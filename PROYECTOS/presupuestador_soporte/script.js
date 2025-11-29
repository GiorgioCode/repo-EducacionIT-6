// SELECTORES DE ELEMENTOS AL DOM
const form = document.getElementById("budgetForm");
const serviceCheckboxes = document.querySelectorAll('input[name="service"]');
const hoursInput = document.getElementById("hours");
const urgentCheckbox = document.getElementById("urgent");
const summaryList = document.getElementById("summaryList");
const totalPriceEl = document.getElementById("totalPrice");
const whatsappBtn = document.getElementById("whatsappBtn");
const printBtn = document.getElementById("printBtn");

//CONSTANTE

const PRICE_PER_HOUR = 10000;

//FUNCIONES
function calculateBudget() {
    let total = 0; //tipo numerico
    let summaryHTML = "";

    serviceCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            const price = parseInt(checkbox.value); //para evitar concatenar al sumar
            const label = checkbox.getAttribute("data-label");

            total += price; // lo mismo que decir total = total + price
            summaryHTML += `<li><span>${label}</span> <span>$ ${price}</span></li>`;
        }
    });
    //sumar horas adicionales
    const hours = parseInt(hoursInput.value) || 0;
    if (hours > 0) {
        const hoursCost = hours * PRICE_PER_HOUR;
        total += hoursCost;
        summaryHTML += `<li><mark>${hours} horas extra</mark> <mark>$ ${hoursCost}</mark></li>`;
    }

    //aplicar recargo por urgencia
    if (urgentCheckbox.checked) {
        const multiplier = +urgentCheckbox.value; //capturo el value del checkbox de recargo
        const surcharge = total * 0.2; //recargo para mostrar en el HTML
        total *= multiplier; //total = total * multiplier
        summaryHTML += `<li><mark>20% Recargo por urgencia</mark> <mark>$ ${surcharge}</mark></li>`;
    }

    //ACTUALIZAR HTML
    if (summaryHTML === "") {
        summaryList.innerHTML = "<li>No hay servicios seleccionados</li>";
    } else {
        summaryList.innerHTML = summaryHTML;
    }
    totalPriceEl.textContent = "$ " + total.toFixed(0);
}

function sendToWhatsApp() {
    const total = totalPriceEl.textContent;
    const today = new Date();
    const fechaPresupuesto = today.toLocaleDateString("es-AR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const valid = 20; //dias de presupuesto valido
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + valid);

    const fechaVencimiento = expirationDate.toLocaleDateString("es-AR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    let message = `Hola!! muchas gracias por confiar en nuestro servicio!! \n Le enviamos el presupuesto de fecha ${fechaPresupuesto}, con vigencia de 20 dias desde hoy (hasta el ${fechaVencimiento}): \n\n`;
    const items = summaryList.querySelectorAll("li");
    items.forEach((item) => {
        const text = item.innerText.replace("\n", ": ");
        message += `- ${text}\n`;
    });
    message += `\n *Total estimado: ${total}*`;
    message += `\n Vinculo de pago: http://link.mercadopago.com.ar/nnnn`;

    const encodedMessage = encodeURIComponent(message);

    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
    console.log(message);
}

//EVENTOS
form.addEventListener("change", calculateBudget);
hoursInput.addEventListener("input", calculateBudget);

whatsappBtn.addEventListener("click", sendToWhatsApp);
printBtn.addEventListener("click", () => {
    window.print();
});

calculateBudget();
