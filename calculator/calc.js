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
    // convert array to string equation and remove "=" at the end
    const joinedValues = this.values.join('').slice(0, -1);
    // display result in calculator display
    const result = eval(joinedValues);
    ui.displayResult(result);
    this.values = [result];
  },
  resetCalc() {
    this.values = [];
    ui.displayResult('');
  }

};

// ui object handles the user interface
const ui = {
  displayResult(result, concat) {
    if (concat) calcDisplay.innerHTML += result;
    else calcDisplay.innerHTML = result;
  }
};

// set up event listener for calculator buttons
function setupEventListeners() {
  calcButtons.forEach(button => button.addEventListener('click', handleClick));
}

function handleClick() {
  calculator.addValue(this.dataset.value);
  ui.displayResult(this.dataset.value, true);
  // on "=" press the equation is solved
  if (this.dataset.value === '=') calculator.solveEquation();
  if (this.dataset.value === 'C') calculator.resetCalc();
}

// ############ executed code ##############
setupEventListeners();
