# Guía: Lista de Tareas Minimalista (HTML, CSS y JS)

Esta guía te ayudará a crear una aplicación de lista de tareas donde podrás agregar, marcar como completadas y eliminar tareas. Usaremos `localStorage` para que las tareas no se borren al recargar la página.

## Estructura de Archivos
Crearemos una carpeta llamada `lista_tareas_minimalista` con los siguientes 3 archivos:
1.  `index.html`: La estructura de la lista.
2.  `style.css`: El diseño visual.
3.  `script.js`: La lógica de la aplicación.

---

## Paso 1: Estructura HTML (`index.html`)

El HTML define el formulario para agregar tareas, la lista donde se mostrarán y el pie de página con acciones.

Crea el archivo `index.html` y pega el siguiente código:

```html
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Tareas</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <div class="app-container">
        <h1>Mis Tareas</h1>

        <!-- Formulario -->
        <form id="form" class="input-group">
            <input type="text" id="taskInput" placeholder="¿Qué tienes que hacer hoy?" autocomplete="off">
            <button type="submit" class="add-btn">Agregar</button>
        </form>

        <!-- Lista de tareas -->
        <ul id="tasksList">
            <!-- Aquí se insertarán las tareas con JS -->
        </ul>

        <!-- Mensaje cuando no hay tareas -->
        <div id="emptyMessage" class="empty-message">
            No hay tareas pendientes. ¡Agrega una!
        </div>

        <!-- Pie de página -->
        <div class="footer">
            <span id="count">0 pendientes</span>

            <div class="footer-actions">
                <button id="clearCompleted" class="text-btn">Borrar completadas</button>
                <button id="clearAll" class="text-btn">Borrar todo</button>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>

</html>
```

---

## Paso 2: Estilos CSS (`style.css`)

El CSS le dará un aspecto limpio y moderno a nuestra lista.

Crea el archivo `style.css` y pega el siguiente código:

```css
/* Reset básico */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

/* Cuerpo centrado */
body {
    font-family: system-ui, sans-serif;
    background-color: #f8fafc;
    /* Fondo muy claro */
    color: #334155;
    /* Texto gris oscuro */
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
}

/* Contenedor principal (App) */
.app-container {
    background-color: white;
    width: 100%;
    max-width: 500px;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

/* Título */
h1 {
    font-size: 22px;
    text-align: center;
    margin-bottom: 20px;
    color: #1e293b;
}

/* Formulario para agregar tarea */
.input-group {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

input[type="text"] {
    flex: 1;
    /* Ocupa todo el espacio disponible */
    padding: 12px;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.2s;
}

input[type="text"]:focus {
    border-color: #3b82f6;
    /* Azul al enfocar */
}

button.add-btn {
    background-color: #3b82f6;
    color: white;
    border: none;
    padding: 0 20px;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s;
}

button.add-btn:hover {
    background-color: #2563eb;
}

/* Lista de tareas */
ul {
    list-style: none;
    /* Sin puntos */
    margin-bottom: 20px;
    max-height: 300px;
    overflow-y: auto;
    /* Scroll si hay muchas tareas */
}

/* Item de tarea individual */
.task-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #f1f5f9;
    gap: 10px;
}

.task-item:last-child {
    border-bottom: none;
}

/* Checkbox */
input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
}

/* Texto de la tarea */
.task-text {
    flex: 1;
    font-size: 16px;
    cursor: pointer;
    /* Indica que se puede editar */
}

/* Tarea completada */
.completed .task-text {
    text-decoration: line-through;
    color: #94a3b8;
}

/* Contenedor de botones de acción */
.action-buttons {
    display: flex;
    gap: 5px;
}

/* Estilos comunes para botones de acción */
.edit-btn,
.delete-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;
    border-radius: 4px;
    font-size: 16px;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Botón Editar */
.edit-btn {
    color: #3b82f6;
    /* Azul */
}

.edit-btn:hover {
    background-color: #eff6ff;
}

/* Botón Eliminar */
.delete-btn {
    color: #ef4444;
    /* Rojo */
}

.delete-btn:hover {
    background-color: #fee2e2;
}

/* Pie de página con contadores y acciones */
.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #64748b;
    border-top: 1px solid #f1f5f9;
    padding-top: 15px;
}

.footer-actions {
    display: flex;
    gap: 10px;
}

.text-btn {
    background: none;
    border: none;
    color: #64748b;
    cursor: pointer;
    font-size: 13px;
}

.text-btn:hover {
    color: #334155;
    text-decoration: underline;
}

/* Mensaje vacío */
.empty-message {
    text-align: center;
    color: #94a3b8;
    padding: 20px;
    font-style: italic;
}
```

---

## Paso 3: Lógica JavaScript (`script.js`)

El JavaScript maneja la lista de tareas, las guarda en el navegador y permite editarlas o borrarlas.

Crea el archivo `script.js` y pega el siguiente código:

```javascript
// --- Variables y Constantes ---
const CLAVE_LOCALSTORAGE = 'mis_tareas_v1';
let tareas = []; // Aquí guardaremos todas las tareas

// --- Selectores del HTML ---
const formulario = document.getElementById('form');
const inputTarea = document.getElementById('taskInput');
const listaTareas = document.getElementById('tasksList');
const contadorTareas = document.getElementById('count');
const btnLimpiarCompletadas = document.getElementById('clearCompleted');
const btnLimpiarTodo = document.getElementById('clearAll');
const mensajeVacio = document.getElementById('emptyMessage');

// --- Funciones Principales ---

// 1. Cargar tareas guardadas al iniciar
function cargarTareas() {
    const tareasGuardadas = localStorage.getItem(CLAVE_LOCALSTORAGE);
    if (tareasGuardadas) {
        // Convertimos el texto JSON de vuelta a un array de objetos
        tareas = JSON.parse(tareasGuardadas);
    } else {
        tareas = [];
    }
    renderizarLista();
}

// 2. Guardar tareas en el navegador
function guardarTareas() {
    // Convertimos el array de objetos a texto JSON
    localStorage.setItem(CLAVE_LOCALSTORAGE, JSON.stringify(tareas));
}

// 3. Mostrar (renderizar) la lista en pantalla
function renderizarLista() {
    // Limpiamos la lista actual
    listaTareas.innerHTML = '';

    // Mostramos u ocultamos el mensaje de "No hay tareas"
    if (tareas.length === 0) {
        mensajeVacio.style.display = 'block';
    } else {
        mensajeVacio.style.display = 'none';
    }

    // Recorremos cada tarea y creamos su HTML
    tareas.forEach((tarea) => {
        // Creamos el elemento <li>
        const item = document.createElement('li');
        item.className = 'task-item';
        if (tarea.completada) {
            item.classList.add('completed');
        }

        // Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarea.completada;
        // Al cambiar el checkbox, alternamos el estado
        checkbox.addEventListener('change', () => alternarEstadoTarea(tarea.id));

        // Texto
        const texto = document.createElement('span');
        texto.className = 'task-text';
        texto.textContent = tarea.texto;
        // (Opcional) Al hacer clic en el texto también podríamos editar, 
        // pero ahora usaremos el botón específico.

        // Contenedor de botones (para agrupar Editar y Eliminar)
        const btnContainer = document.createElement('div');
        btnContainer.className = 'action-buttons';

        // Botón Editar
        const btnEditar = document.createElement('button');
        btnEditar.className = 'edit-btn';
        btnEditar.textContent = '✎'; // Lápiz
        btnEditar.title = 'Editar';
        btnEditar.addEventListener('click', () => editarTarea(tarea.id));

        // Botón Eliminar
        const btnEliminar = document.createElement('button');
        btnEliminar.className = 'delete-btn';
        btnEliminar.textContent = '✕'; // X simple
        btnEliminar.title = 'Eliminar';
        btnEliminar.addEventListener('click', () => eliminarTarea(tarea.id));

        // Agregamos botones al contenedor
        btnContainer.appendChild(btnEditar);
        btnContainer.appendChild(btnEliminar);

        // Agregamos todo al <li>
        item.appendChild(checkbox);
        item.appendChild(texto);
        item.appendChild(btnContainer);

        // Agregamos el <li> a la lista <ul>
        listaTareas.appendChild(item);
    });

    actualizarContador();
}

// 4. Agregar una nueva tarea
function agregarTarea(evento) {
    evento.preventDefault(); // Evita que se recargue la página

    const texto = inputTarea.value.trim(); // Quitamos espacios al inicio y final

    if (texto === '') return; // Si está vacío, no hacemos nada

    // Creamos el objeto tarea
    const nuevaTarea = {
        id: Date.now(), // Usamos la fecha actual como ID único
        texto: texto,
        completada: false
    };

    tareas.push(nuevaTarea); // Agregamos al array
    guardarTareas(); // Guardamos
    renderizarLista(); // Actualizamos pantalla

    inputTarea.value = ''; // Limpiamos el input
    inputTarea.focus(); // Volvemos a enfocar
}

// 5. Marcar como completada / pendiente
function alternarEstadoTarea(id) {
    // Buscamos la tarea por su ID
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.completada = !tarea.completada; // Invertimos el valor (true -> false, false -> true)
        guardarTareas();
        renderizarLista();
    }
}

// 6. Eliminar una tarea específica
function eliminarTarea(id) {
    // Filtramos: nos quedamos con todas MENOS la que tiene ese ID
    tareas = tareas.filter(t => t.id !== id);
    guardarTareas();
    renderizarLista();
}

// 7. Editar una tarea
function editarTarea(id) {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        const nuevoTexto = prompt("Editar tarea:", tarea.texto);
        if (nuevoTexto !== null && nuevoTexto.trim() !== '') {
            tarea.texto = nuevoTexto.trim();
            guardarTareas();
            renderizarLista();
        }
    }
}

// 8. Actualizar el contador de pendientes
function actualizarContador() {
    const pendientes = tareas.filter(t => !t.completada).length;
    contadorTareas.textContent = `${pendientes} pendientes`;
}

// --- Eventos ---

// Al cargar la página
cargarTareas();

// Al enviar el formulario (Enter o botón Agregar)
formulario.addEventListener('submit', agregarTarea);

// Botón Limpiar Completadas
btnLimpiarCompletadas.addEventListener('click', () => {
    tareas = tareas.filter(t => !t.completada); // Solo guardamos las NO completadas
    guardarTareas();
    renderizarLista();
});

// Botón Limpiar Todo
btnLimpiarTodo.addEventListener('click', () => {
    if (confirm("¿Seguro que quieres borrar TODAS las tareas?")) {
        tareas = [];
        guardarTareas();
        renderizarLista();
    }
});
```

---

## ¡Listo!
Abre el archivo `index.html` en tu navegador y empieza a organizar tus tareas.
