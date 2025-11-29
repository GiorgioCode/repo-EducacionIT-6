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
