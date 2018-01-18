const container = document.querySelector('.container');
const fetchBtn = document.querySelector('.fetchBtn');

const jokeFetcher = {
  // fetch chuck norris jokes
  fetchChuckJokes(amount = 1) {
    fetch(`http://api.icndb.com/jokes/random/${amount}/`)
      .then(response => response.json())
      .then((data) => {
        // convert array of json objects to array of jokes as strings
        const jokeArr = data.value.map(joke => joke.joke);
        ui.displayList(jokeArr);
      })
      .catch(err => console.log(`There was an error: ${err}`));
  },
  // fetch ron swanson quotes
  fetchRonQuotes(amount = 1) {
    fetch(`http://ron-swanson-quotes.herokuapp.com/v2/quotes/${amount}/`)
      .then(response => response.json())
      .then(data => ui.displayList(data))
      .catch(err => console.log(`There was an error: ${err}`));
  },
};

const ui = {
  // expects array of strings to create and displays joke list
  displayList(jokes) {
    // clear list if there is already a list
    if (document.querySelector('ul')) document.querySelector('ul').remove();
    // create list to display jokes
    const ul = document.createElement('ul');
    // create a new list item for each joke and append to list
    jokes.forEach((joke) => {
      const li = document.createElement('li');
      li.innerHTML = joke;
      ul.appendChild(li);
    });
    container.appendChild(ul);
  }
};

const controller = {
  // setup Eventlistener
  setUpEventListeners() {
    fetchBtn.addEventListener('click', this.handleBtnClick);
  },
  // handle button click
  handleBtnClick() {
    const category = document.querySelector('select').value;
    const amountJokes = document.querySelector('#amountJokes').value;
    if (category === 'chuckN') jokeFetcher.fetchChuckJokes(amountJokes);
    if (category === 'ronSwan') jokeFetcher.fetchRonQuotes(amountJokes);
  }
};

// ######## executed code ##################
controller.setUpEventListeners();
