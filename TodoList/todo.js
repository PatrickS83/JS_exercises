var todoList = {
  todos: [],
  // Function to display ToDo Items Text and completed status
  displayTodos: function() {
    if (this.todos.length === 0) {
      console.log('Your todo list is empty :/');
    }
    else {
      console.log('Stuff to do:');
      for (let i = 0; i < this.todos.length; i++) {
        if (this.todos[i].completed === true) {
          console.log('(x)', this.todos[i].todoText);
        }
        else {
          console.log('()', this.todos[i].todoText);
        }
      }
    }
  },
  //Function to add ToDo Items as objects
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
    this.displayTodos();
  },
  //Function to change ToDo Items
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
    this.displayTodos();
  },
  //Function to delete ToDo Items
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
    this.displayTodos();
  },
  //Function to toggle completed Status
  toggleCompleted: function(position) {
    let todo = this.todos[position];
    todo.completed = !todo.completed;
    this.displayTodos();
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
    this.displayTodos();
  }
};

// Object for button onclick events
let handlers = {
  // Display ToDos on Buttonclick
  displayTodos: function() {
    todoList.displayTodos();
  },
  //Add textfield value to todo list and clear textfield
  addTodo: function() {
    let addTodoInput = document.getElementById('addTodoInput');
    todoList.addTodo(addTodoInput.value);
    addTodoInput.value = "";
  },
  //Changes ToDo item at user specified position and clears inputfields
  changeTodo: function() {
    let changeTodoPosition = document.getElementById('changeTodoPosition');
    let changeTodoText = document.getElementById('changeTodoText');
    todoList.changeTodo(changeTodoPosition.valueAsNumber, changeTodoText.value);
    changeTodoPosition.value = "";
    changeTodoText.value = "";
  },
  //Delete ToDo Item at user specified location and clear inputfield
  deleteTodo: function() {
    let deleteTodoPosition = document.getElementById('deleteTodoPosition');
    todoList.deleteTodo(deleteTodoPosition.valueAsNumber);
    deleteTodoPosition.value = "";
  },
  //Delete ToDo Item at user specified location and clear inputfield
  toggleCompleted : function() {
    let toggleCompletedPosition = document.getElementById('toggleCompletedPosition');
    todoList.toggleCompleted(toggleCompletedPosition.valueAsNumber);
    toggleCompletedPosition.value = "";
  },
  //ToggleAll completed on Buttonclick
  toggleAll: function() {
    todoList.toggleAll();
  }

}