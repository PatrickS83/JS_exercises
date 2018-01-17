const calcButtons = document.querySelectorAll('[data-value]');
const calcDisplay = document.querySelector('.calc_display');
const calcHistory = document.querySelector('.history');

// calculator object handles the logic
const calculator = {
  values: [],
  // add numbers or operators to values array
  addValue(value) {
    this.values.push(value);
  },
  solveEquation() {
    // convert array to string equation
    const joinedValues = this.values.join('');
    const result = eval(joinedValues);
    ui.displayHistory(joinedValues, result);
    // display result in calculator display
    ui.displayResult(result);
    // replace values in calculator array with the equation result
    this.values = [result];
  },
  // clear display and array
  resetCalc() {
    this.values = [];
    ui.displayResult('');
  },
  // delete last value in array and display it
  delLastVal() {
    this.values.pop();
    ui.displayResult(this.values.join(''));
  }
};

// ui object handles the user interface
const ui = {
  // if concat is true, numbers will be concatinated
  displayResult(result = '', concat) {
    if (concat) calcDisplay.innerHTML += result;
    else calcDisplay.innerHTML = result;
  },
  // displays past calcutalor equations next to calculator
  displayHistory(equation, result) {
    const historyDiv = document.querySelector('.history');
    const historySpan = document.createElement('span');
    if (calculator.values.length === 1) historySpan.innerHTML = `${equation}`;
    else if (equation) historySpan.innerHTML = `${equation} = ${result}`;
    historyDiv.insertBefore(historySpan, historyDiv.firstChild);
  },
  // deletes items from calculator history after doubleclick
  deleteHistoryItem(item) {
    item.remove();
  }
};

// controller object handles events and buttons
const controller = {
  // set up event listener for calculator buttons
  setupEventListeners() {
    calcButtons.forEach(button => button.addEventListener('click', this.handleBtnClick));
    calcHistory.addEventListener('dblclick', this.handleHistoryClick);
  },

  // handles the clickevent on calculator buttons
  handleBtnClick() {
    // only one operator is allowed between numbers
    if (Number.isNaN(Number(calculator.values[calculator.values.length - 1])) // FIXME: 5 * -2 should work, but doesn't
      && this.dataset.operator
      && calculator.values.length > 0) {
      console.log('Please enter only one operator at a time');
    } else {
      // push all values into array that are not the "=" character
      if (this.dataset.value !== '=' && this.dataset.value !== 'back') calculator.addValue(this.dataset.value);
      ui.displayResult(this.dataset.value, true);
      if (this.dataset.value === '=') calculator.solveEquation();
      if (this.dataset.value === 'C') calculator.resetCalc();
      if (this.dataset.value === 'back') calculator.delLastVal();
    }
  },
  // event listener for calculator history
  handleHistoryClick(e) {
    const elementClicked = e.target;
    if (elementClicked.tagName === 'SPAN') ui.deleteHistoryItem(elementClicked);
  }
};

// ############ executed code ##############
controller.setupEventListeners();
