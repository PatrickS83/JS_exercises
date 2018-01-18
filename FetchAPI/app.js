const container = document.querySelector('.container');
const fetchBtn = document.querySelector('.fetchBtn');

const jokeFetcher = {
  // fetch chuck norris jokes
  fetchChuckJokes(amount = 1) {
    fetch(`http://api.icndb.com/jokes/random/${amount}/`)
      .then(response => response.json())
      .then(data => ui.displayList(data.value))
      .catch(err => console.log(`There was an error: ${err}`));
  }
};

const ui = {
  // expects array of JSON objects to create and display joke list
  displayList(jokes) {
    const ul = document.createElement('ul');
    jokes.forEach((joke) => {
      const li = document.createElement('li');
      li.innerHTML = joke.joke;
      ul.appendChild(li);
    });
    container.appendChild(ul);
  }
};

const controller = {
  // setup Eventlistener
  setUpEventListeners() {
    fetchBtn.addEventListener('click', this.handleClick);
  },
  // handle button click
  handleClick() {
    const category = document.querySelector('select').value;
    const amountJokes = document.querySelector('#amountJokes').value;
    if (category === 'chuckN') jokeFetcher.fetchChuckJokes(amountJokes);
  }
};

// ######## executed code ##################
controller.setUpEventListeners();
