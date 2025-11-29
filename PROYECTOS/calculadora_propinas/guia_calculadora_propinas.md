# Guía: Calculadora de Propinas (HTML, CSS y JS)

Esta guía te ayudará a crear una calculadora de propinas moderna y funcional desde cero. Aprenderás a separar tu código en tres archivos: estructura (HTML), estilo (CSS) y lógica (JavaScript).

## Estructura de Archivos
Crearemos una carpeta llamada `calculadora_propinas` con los siguientes 3 archivos:
1.  `index.html`: La estructura de la página.
2.  `style.css`: Los estilos y colores.
3.  `script.js`: La lógica para calcular.

---

## Paso 1: Estructura HTML (`index.html`)

El HTML define los elementos de nuestra calculadora: inputs para los números, botones y un lugar para mostrar los resultados.

Crea el archivo `index.html` y pega el siguiente código:

```html
<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Calculadora de Propinas</title>
  <!-- Vinculamos el archivo CSS externo -->
  <link rel="stylesheet" href="style.css">
</head>

<body>

  <div class="card">
    <h1>Calculadora de Propinas</h1>

    <!-- Inputs -->
    <div class="input-group">
      <input type="number" id="amount" placeholder="Monto de la cuenta ($)" min="0" step="0.01">
    </div>

    <div class="input-group">
      <input type="number" id="tipPercent" placeholder="Propina %" min="0">
      <input type="number" id="people" placeholder="Personas" value="1" min="1">
    </div>

    <!-- Botones rápidos -->
    <div class="quick-tips">
      <button class="btn-tip" data-tip="10">10%</button>
      <button class="btn-tip" data-tip="15">15%</button>
      <button class="btn-tip" data-tip="20">20%</button>
      <button class="btn-tip" data-tip="25">25%</button>
    </div>

    <!-- Resultados -->
    <div class="results">
      <div class="result-row">
        <span>Propina Total:</span>
        <span id="tipTotal">-</span>
      </div>
      <div class="result-row">
        <span>Por Persona:</span>
        <span id="perPerson">-</span>
      </div>
      <div class="result-row">
        <span>Total Factura:</span>
        <span id="totalBill">-</span>
      </div>
    </div>

    <!-- Acciones -->
    <div class="actions">
      <button id="calculate" class="btn-primary">Calcular</button>
      <button id="reset" class="btn-secondary">Resetear</button>
    </div>

    <p class="footer-note">Ingresa el monto y selecciona la propina.</p>
  </div>

  <!-- Vinculamos el archivo JS externo -->
  <script src="script.js"></script>
</body>

</html>
```

---

## Paso 2: Estilos CSS (`style.css`)

El CSS hará que nuestra calculadora se vea moderna, centrada y con colores agradables.

Crea el archivo `style.css` y pega el siguiente código:

```css
/* Reset básico: elimina márgenes y rellenos por defecto */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Estilos generales del cuerpo */
body {
  font-family: system-ui, sans-serif; /* Fuente del sistema, moderna y limpia */
  background-color: #f0f4f8; /* Color de fondo suave */
  color: #333; /* Color de texto oscuro para buen contraste */
  display: flex;
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  min-height: 100vh; /* Altura mínima de toda la pantalla */
  padding: 20px;
}

/* Tarjeta principal */
.card {
  background-color: white;
  width: 100%;
  max-width: 400px; /* Ancho máximo para que no se vea muy ancha en pantallas grandes */
  padding: 24px;
  border-radius: 16px; /* Bordes redondeados */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Sombra suave */
}

/* Título */
h1 {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  color: #2c3e50;
}

/* Filas de inputs */
.input-group {
  margin-bottom: 16px;
  display: flex;
  gap: 10px; /* Espacio entre elementos */
}

/* Estilos de los inputs */
input[type="number"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  outline: none; /* Quita el borde azul al seleccionar */
  transition: border-color 0.3s;
}

input[type="number"]:focus {
  border-color: #3b82f6; /* Color azul al escribir */
}

/* Botones de porcentaje rápido */
.quick-tips {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  gap: 8px;
}

.btn-tip {
  flex: 1; /* Ocupan el mismo ancho */
  padding: 8px;
  background-color: #e2e8f0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  color: #475569;
  transition: background-color 0.2s;
}

.btn-tip:hover {
  background-color: #cbd5e1;
}

/* Sección de resultados */
.results {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
}

.result-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 16px;
}

.result-row:last-child {
  margin-bottom: 0;
  font-weight: bold;
  font-size: 18px;
  color: #3b82f6;
}

/* Botones de acción */
.actions {
  display: flex;
  gap: 10px;
}

.btn-primary {
  flex: 2; /* El botón calcular es más grande */
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #2563eb;
}

.btn-secondary {
  flex: 1;
  background-color: transparent;
  border: 1px solid #cbd5e1;
  color: #475569;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-secondary:hover {
  background-color: #f1f5f9;
}

/* Nota al pie */
.footer-note {
  text-align: center;
  font-size: 12px;
  color: #94a3b8;
  margin-top: 16px;
}
```

---

## Paso 3: Lógica JavaScript (`script.js`)

El JavaScript se encarga de leer los valores, hacer las matemáticas y mostrar el resultado.

Crea el archivo `script.js` y pega el siguiente código:

```javascript
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
```

---

## ¡Listo!
Abre el archivo `index.html` en tu navegador y prueba tu calculadora.
