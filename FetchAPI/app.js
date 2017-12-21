const container = document.querySelector('.container');

// expects array of JSON objects to create and display joke list
function displayList(jokes) {
  const ul = document.createElement('ul');
  jokes.forEach((joke) => {
    const li = document.createElement('li');
    li.innerHTML = joke.joke;
    ul.appendChild(li);
  });
  container.appendChild(ul);
}

// fetch chuck norris jokes
function fetchChuckJokes(amount = 1) {
  fetch(`http://api.icndb.com/jokes/random/${amount}/`)
    .then(response => response.json())
    .then(data => displayList(data.value))
    .catch(err => console.log(`There was an error: ${err}`));
}

// handle button click
function handleClick() {
  const category = document.querySelector('select').value;
  const amountJokes = document.querySelector('#amountJokes').value;

  if (category === 'chuckN') fetchChuckJokes(amountJokes);
}
