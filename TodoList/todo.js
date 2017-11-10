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
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });
    this.todos.forEach(function(todo) {
      // Toggle all to false if everything is true
      if (completedTodos === totalTodos) {
        todo.completed = false;
      }
      // Otherwiske make everything true
      else {
        todo.completed = true;
      }
    });
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
    todoList.todos.forEach(function(todo, position) {
      let todoTextWithCompletion = "";
      let todoLi = document.createElement('li');

      if (todo.completed === true) {
        todoTextWithCompletion = "(x) " + todo.todoText
      }
      else {
        todoTextWithCompletion = "() " + todo.todoText
      }
      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todoUl.appendChild(todoLi);
    }, this); // the 'this' is the second argument in forEach function and ensures that the 'this' correctly points at the object "view"
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