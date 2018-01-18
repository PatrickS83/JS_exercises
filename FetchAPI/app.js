const container = document.querySelector('.container');
const fetchBtn = document.querySelector('.fetchBtn');
const apiSelect = document.querySelector('.api_select');
const labelAmount = document.querySelector('#labelAmount');
const inputAmount = document.querySelector('#amountJokes');

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
  fetchNumFact(number = 1) {
    fetch(`http://numbersapi.com/${number}/`)
      .then(response => response.text())
      .then(data => ui.displayList([data]))
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
    // display final list in browserwindow
    container.appendChild(ul);
  },
  // expects the clicked API selector and changes the UI accordingly
  changeDescription(selectedAPI) {
    let placeHold;
    if (selectedAPI === 'chuckN') placeHold = 'Jokes';
    else if (selectedAPI === 'ronSwan') placeHold = 'Quotes';
    // block if only one word has to change
    if (placeHold) {
      labelAmount.innerHTML = `How many ${placeHold}?`;
      fetchBtn.innerHTML = `Fetch ${placeHold}`;
      inputAmount.setAttribute('placeholder', `Amount of ${placeHold}`);

      // block if more than one word has to be changed
    } else if (selectedAPI === 'numFact') {
      labelAmount.innerHTML = 'Fact about which number?';
      fetchBtn.innerHTML = 'Fetch fact';
      inputAmount.setAttribute('placeholder', 'Fact about which number?');
    }
  }
};

const controller = {
  // setup Eventlistener
  setUpEventListeners() {
    fetchBtn.addEventListener('click', this.handleBtnClick);
    apiSelect.addEventListener('click', this.handleSelectClick);
  },
  // handle button click
  handleBtnClick() {
    const category = document.querySelector('select').value;
    const amountJokes = document.querySelector('#amountJokes').value;
    if (category === 'chuckN') jokeFetcher.fetchChuckJokes(amountJokes);
    if (category === 'ronSwan') jokeFetcher.fetchRonQuotes(amountJokes);
    if (category === 'numFact') jokeFetcher.fetchNumFact(amountJokes);
  },
  // handle clicks on the API selector
  handleSelectClick(e) {
    const elementClicked = e.target;
    ui.changeDescription(elementClicked.value);
  }
};

// ######## executed code ##################
controller.setUpEventListeners();
