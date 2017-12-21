const todoList = {
  todos: [],
  // Function to add ToDo Items as objects
  addTodo(todoText) {
    this.todos.push({
      todoText,
      completed: false
    });
  },
  // Function to change ToDo Items
  changeTodo(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  // Function to delete ToDo Items
  deleteTodo(position) {
    this.todos.splice(position, 1);
  },
  // Function to toggle completed Status
  toggleCompleted(position) {
    const todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  // Function to toggle completed status of ALL items
  toggleAll() {
    const totalTodos = this.todos.length;
    let completedTodos = 0;
    // Check and store if there are completed Items
    this.todos.forEach((todo) => {
      if (todo.completed === true) {
        completedTodos += 1;
      }
    });


    this.todos.forEach((todo) => {
      const todoItem = todo;
      // Toggle all to false if everything is true
      if (completedTodos === totalTodos) {
        todoItem.completed = false;
        // Otherwiske make everything true
      } else {
        todoItem.completed = true;
      }
    });
  }
};


// Object for everything UI-only related
const view = {
  displayTodos() {
    const todoUl = document.querySelector('ul');
    todoUl.innerHTML = '';
    // Create an li-element for every todo item
    todoList.todos.forEach((todo, position) => {
      let todoTextWithCompletion = '';
      const todoLi = document.createElement('li');

      if (todo.completed === true) {
        todoTextWithCompletion = `(x) ${todo.todoText}`;
      } else {
        todoTextWithCompletion = `() ${todo.todoText}`;
      }
      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todoUl.appendChild(todoLi);
      // the "this" is optional argument in forEach function and ensures that the
      // 'this' correctly points at the object "view"
    }, this);
  },
  createDeleteButton() {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setUpEventListeners() {
    const todosUl = document.querySelector('ul');
    todosUl.addEventListener('click', (event) => {
      const elementClicked = event.target;
      if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(Number(elementClicked.parentNode.id));
      }
    });
  }
};

// Object for button onclick events
const handlers = {
  // Add textfield value to todo list and clear textfield
  addTodo() {
    const addTodoInput = document.getElementById('addTodoInput');
    todoList.addTodo(addTodoInput.value);
    addTodoInput.value = '';
    view.displayTodos();
  },
  // Changes ToDo item at user specified position and clears inputfields
  changeTodo() {
    const changeTodoPosition = document.getElementById('changeTodoPosition');
    const changeTodoText = document.getElementById('changeTodoText');
    todoList.changeTodo(changeTodoPosition.valueAsNumber, changeTodoText.value);
    changeTodoPosition.value = '';
    changeTodoText.value = '';
    view.displayTodos();
  },
  // Delete ToDo Item at user specified location and clear inputfield
  deleteTodo(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  // Delete ToDo Item at user specified location and clear inputfield
  toggleCompleted() {
    const toggleCompletedPosition = document.getElementById('toggleCompletedPosition');
    todoList.toggleCompleted(toggleCompletedPosition.valueAsNumber);
    toggleCompletedPosition.value = '';
    view.displayTodos();
  },
  // ToggleAll completed on Buttonclick
  toggleAll() {
    todoList.toggleAll();
    view.displayTodos();
  }

};

// ------ code execution ------

view.setUpEventListeners();
