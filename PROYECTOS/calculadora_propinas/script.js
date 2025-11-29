// --- Selectores: Obtenemos los elementos del HTML ---
const amountInput = document.getElementById('amount');
const tipInput = document.getElementById('tipPercent');
const peopleInput = document.getElementById('people');
const calculateBtn = document.getElementById('calculate');
const resetBtn = document.getElementById('reset');

// Elementos donde mostraremos los resultados
const tipTotalEl = document.getElementById('tipTotal');
const perPersonEl = document.getElementById('perPerson');
const totalBillEl = document.getElementById('totalBill');

// Botones de porcentaje rápido
const quickTipButtons = document.querySelectorAll('.btn-tip');

// --- Funciones ---

// Función para calcular la propina
function calculate() {
  // 1. Obtener valores de los inputs
  // parseFloat convierte texto a número decimal
  // Number() también sirve, pero parseFloat es explícito para decimales
  const amount = parseFloat(amountInput.value);
  const tipPercent = parseFloat(tipInput.value);
  const people = parseInt(peopleInput.value);

  // 2. Validar que los datos sean correctos
  // isNaN verifica si "No es un Número" (Not a Number)
  if (isNaN(amount) || amount <= 0) {
    alert("Por favor, ingresa un monto válido.");
    return; // Detenemos la función
  }
  if (isNaN(tipPercent) || tipPercent < 0) {
    alert("Por favor, ingresa un porcentaje válido.");
    return;
  }
  if (isNaN(people) || people <= 0) {
    alert("Debe haber al menos 1 persona.");
    return;
  }

  // 3. Realizar los cálculos matemáticos
  const totalTip = amount * (tipPercent / 100); // Propina total
  const totalBill = amount + totalTip;          // Total a pagar
  const perPerson = totalBill / people;         // Cuánto paga cada uno

  // 4. Mostrar los resultados en el HTML
  // toFixed(2) asegura que siempre haya 2 decimales (ej: 10.50)
  tipTotalEl.textContent = '$' + totalTip.toFixed(2);
  totalBillEl.textContent = '$' + totalBill.toFixed(2);
  perPersonEl.textContent = '$' + perPerson.toFixed(2);
}

// Función para reiniciar todo
function reset() {
  amountInput.value = '';
  tipInput.value = '';
  peopleInput.value = '1'; // Por defecto 1 persona
  
  tipTotalEl.textContent = '-';
  totalBillEl.textContent = '-';
  perPersonEl.textContent = '-';
}

// --- Eventos: Qué pasa cuando el usuario interactúa ---

// Cuando hacen clic en "Calcular"
calculateBtn.addEventListener('click', calculate);

// Cuando hacen clic en "Resetear"
resetBtn.addEventListener('click', reset);

// Cuando hacen clic en los botones de porcentaje rápido (10%, 15%, etc.)
quickTipButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Obtenemos el valor del atributo data-tip del botón
    const tipValue = button.getAttribute('data-tip');
    // Lo ponemos en el input de porcentaje
    tipInput.value = tipValue;
  });
});
