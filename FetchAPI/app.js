const container = document.querySelector("container");

function fetchJokes(amount = 1) {
  fetch(`http://api.icndb.com/jokes/random/${amount}/`)
    .then(response => response.json())
    .then(data => createList(data.value))
    .catch(err => console.log("There was an error: " + err));
}

function createList(jokes) {
  const ul = document.createElement("ul");
  const li = document.createElement("li");
  li.textContent = "";
  ul.appendChild(li);
}
