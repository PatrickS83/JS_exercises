const calcButtons = document.querySelectorAll('[data-value');
const calcDisplay = document.querySelector('.calc_display');

// calculator object handles the logic
const calculator = {
  values: [],
  // add numbers or operators to values array
  addValue(value) {
    calculator.values.push(value);
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
};

// ui object handles the user interface
const ui = {
  // if concat is true, numbers will be concatinated
  displayResult(result = '', concat) {
    if (concat) calcDisplay.innerHTML += result;
    else calcDisplay.innerHTML = result;
  },
  displayHistory(equation, result) {
    const historyDiv = document.querySelector('.history');
    const historySpan = document.createElement('span');
    historySpan.innerHTML = `${equation} = ${result}`;
    historyDiv.appendChild(historySpan);
  }
};

// controller object handles events and buttons
const controller = {
  // set up event listener for calculator buttons
  setupEventListeners() {
    calcButtons.forEach(button => button.addEventListener('click', this.handleClick));
  },

  // handles the clickevent on calculator buttons
  handleClick() {
    // only one operator is allowed between numbers
    if (Number.isNaN(Number(calculator.values[calculator.values.length - 1])) // FIXME: 5 * -2 should work, but doesn't
      && this.dataset.operator
      && calculator.values.length > 0) {
      console.log('Please enter only one operator at a time');
    } else {
      // push all values into array that are not the "=" character
      if (this.dataset.value !== '=') calculator.addValue(this.dataset.value);
      ui.displayResult(this.dataset.value, true);
      if (this.dataset.value === '=') calculator.solveEquation();
      if (this.dataset.value === 'C') calculator.resetCalc();
    }
  }
};

// ############ executed code ##############
controller.setupEventListeners();
