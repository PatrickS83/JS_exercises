var todoList = {
  todos: ['todo 1', 'todo 2', 'todo 3'],
  // Function to display ToDo Items
  displayTodos: function() {
    console.log('Stuff to do', this.todos);
  },
  //Function to add ToDo Items
  addTodo: function(todo) {
    this.todos.push(todo);
    this.displayTodos();
  },
  //Function to change ToDo Items
  changeTodo: function(position, newValue) {
    this.todos(position) = newValue;
    this.displayTodos();
  },
  //Function to delete ToDo Items
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
    this.displayTodos();
  }
};