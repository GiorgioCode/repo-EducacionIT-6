    // Obtener los elementos de formulario y lista de tareas
    const todoForm = document.querySelector('#todo-form');
    const todoList = document.querySelector('#todo-list');
    
    // Cargar las tareas existentes desde localStorage
    let todoItems = JSON.parse(localStorage.getItem('todos')) || [];
    
    // Función para renderizar la lista de tareas
    function renderTodoList() {
      // Limpiar la lista existente para volver a renderizar
      todoList.innerHTML = '';
      // Iterar sobre cada tarea y agregarla a la lista
      todoItems.forEach((todo, index) => {
        // Crear un elemento de lista y agregar el texto de la tarea
        const li = document.createElement('li');
        li.textContent = todo;
        
        // Crear un botón de eliminación y agregar un controlador de eventos
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.addEventListener('click', () => {
          // Eliminar la tarea correspondiente del array de tareas
          todoItems.splice(index, 1);
          //////////////////////
          //El método .splice() es un método integrado en JavaScript que permite agregar 
          // o eliminar elementos de un array. En este caso, estamos utilizando .splice()
          //  para eliminar una tarea en particular del array todoItems.

          //Los parámetros de .splice() son:
          
          //index: el índice del elemento que se va a eliminar del array.
          //1: el número de elementos que se van a eliminar a partir del índice especificado.
          //  En este caso, solo estamos eliminando un elemento, es decir, la tarea 
          // correspondiente al índice especificado.
          //Por lo tanto, en la línea de código todoItems.splice(index, 1), 
          //estamos eliminando la tarea que se encuentra en el índice index del array todoItems.
          
          //Es importante destacar que al eliminar una tarea del array todoItems 
          // mediante .splice(), también debemos actualizar el almacenamiento local 
          // con localStorage.setItem('todos', JSON.stringify(todoItems)); 
          // para asegurarnos de que las tareas eliminadas no se vuelvan a cargar 
          // la próxima vez que se cargue la página o se recargue la aplicación.
            //////////////////
          // Guardar las tareas actualizadas en localStorage
          localStorage.setItem('todos', JSON.stringify(todoItems));
          // Volver a renderizar la lista de tareas
          renderTodoList();
        });
        
        // Agregar el botón de eliminación al elemento de lista
        li.appendChild(deleteButton);
        // Agregar el elemento de lista a la lista de tareas
        todoList.appendChild(li);
      });
    }
    
    // Controlar el evento de envío del formulario para agregar nuevas tareas
    todoForm.addEventListener('submit', event => {
      event.preventDefault();
      const todoInput = document.querySelector('#todo-input');
      const todoText = todoInput.value.trim(); // aplicamos metodo trim para eliminar espacios al principio y al final
      if (todoText.length > 0) {
        // Agregar la nueva tarea al array de tareas
        todoItems.push(todoText);
        // Guardar las tareas actualizadas en localStorage
        localStorage.setItem('todos', JSON.stringify(todoItems));
        // Limpiar el campo de entrada de tarea
        todoInput.value = '';
        // Volver a renderizar la lista de tareas
        renderTodoList();
      }
    });
    
    // Renderizar la lista de tareas inicialmente
    renderTodoList();

