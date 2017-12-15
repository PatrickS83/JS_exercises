const container = document.querySelector(".container");

// fetch chuck norris jokes
function fetchChuckJokes(amount = 1) {
  fetch(`http://api.icndb.com/jokes/random/${amount}/`)
    .then(response => response.json())
    .then(data => displayList(data.value))
    .catch(err => console.log("There was an error: " + err));
}

// expects array of JSON objects to create and display joke list
function displayList(jokes) {
  const ul = document.createElement("ul");
  jokes.forEach(joke => {
    const li = document.createElement("li");
    li.textContent = joke.joke;
    ul.appendChild(li);
  });
  container.appendChild(ul);
}

// handle button click
function handleClick() {
  const category = document.querySelector("select").value;
  const amountJokes = document.querySelector("#amountJokes").value;

  if (category === "chuckN") fetchChuckJokes(amountJokes);
}
