var todoList = {
  todos: [],
  //Function to add ToDo Items as objects
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  //Function to change ToDo Items
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  //Function to delete ToDo Items
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  //Function to toggle completed Status
  toggleCompleted: function(position) {
    let todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  //Function to toggle completed status of ALL items
  toggleAll: function() {
    let totalTodos = this.todos.length;
    let completedTodos = 0;
    // Check and store if there are completed Items
    for (let i = 0; i < totalTodos; i++) {
      if (this.todos[i].completed === true) {
        completedTodos++;
      }
    }
    // Toggle all to false if everything is true
    if (completedTodos === totalTodos) {
      for (let i = 0; i < totalTodos; i++) {
        this.todos[i].completed = false;
      }
    }
    // Otherwiske make everything true
    else {
      for (let i = 0; i < totalTodos; i++) {
        this.todos[i].completed = true;
      }
    }
  }
};

// Object for button onclick events
let handlers = {
  //Add textfield value to todo list and clear textfield
  addTodo: function() {
    let addTodoInput = document.getElementById('addTodoInput');
    todoList.addTodo(addTodoInput.value);
    addTodoInput.value = "";
    view.displayTodos();
  },
  //Changes ToDo item at user specified position and clears inputfields
  changeTodo: function() {
    let changeTodoPosition = document.getElementById('changeTodoPosition');
    let changeTodoText = document.getElementById('changeTodoText');
    todoList.changeTodo(changeTodoPosition.valueAsNumber, changeTodoText.value);
    changeTodoPosition.value = "";
    changeTodoText.value = "";
    view.displayTodos();
  },
  //Delete ToDo Item at user specified location and clear inputfield
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  //Delete ToDo Item at user specified location and clear inputfield
  toggleCompleted : function() {
    let toggleCompletedPosition = document.getElementById('toggleCompletedPosition');
    todoList.toggleCompleted(toggleCompletedPosition.valueAsNumber);
    toggleCompletedPosition.value = "";
    view.displayTodos();
  },
  //ToggleAll completed on Buttonclick
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }

}

//Object for everything UI-only related
let view = {
  displayTodos: function() {
    let todoUl = document.querySelector('ul');
    todoUl.innerHTML = "";
    //Create an li-element for every todo item
    for (let i = 0; i < todoList.todos.length; i++) {
      let todoTextWithCompletion = "";
      let todoLi = document.createElement('li');

      if (todoList.todos[i].completed === true) {
        todoTextWithCompletion = "(x) " + todoList.todos[i].todoText
      }
      else {
        todoTextWithCompletion = "() " + todoList.todos[i].todoText
      }
      todoLi.id = i;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todoUl.appendChild(todoLi);
    }
  },
  createDeleteButton: function() {
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteButton";
    return deleteButton;
  },
  setUpEventListeners: function() {
    let todosUl = document.querySelector('ul');
    todosUl.addEventListener("click", function(event) {
      let elementClicked = event.target;
      if (elementClicked.className === "deleteButton") {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

view.setUpEventListeners();