var todos = ['todo1', 'todo2', 'todo3'];

// Function to display ToDo Items
function displayTodos() {
  console.log('Things to do:', todos);
}

//Function to add ToDo Items
function addTodo(todo) {
  todos.push(todo);
  displayTodos();
}

//Function to change ToDo Items
function changeTodo(position, newValue) {
  todos[position] = newValue;
  displayTodos();
}

//Function to delete ToDo Items
function deleteTodo(position) {
  todos.splice(position, 1);
  displayTodos();
}