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
    // display result in calculator display
    ui.displayResult(result);
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
  }
};

// set up event listener for calculator buttons
function setupEventListeners() {
  calcButtons.forEach(button => button.addEventListener('click', handleClick));
}

function handleClick() {
  if (Number.isNaN(Number(calculator.values[calculator.values.length - 1])) && this.dataset.operator && calculator.values.length > 0) {
    console.log('ONLY ONE OPERATOR!!!!!!!!!!!');
  } else {
    if (this.dataset.value !== '=') calculator.addValue(this.dataset.value);
    ui.displayResult(this.dataset.value, true);
    // on "=" press the equation is solved
    if (this.dataset.value === '=') calculator.solveEquation();
    if (this.dataset.value === 'C') calculator.resetCalc();
  }
}

// ############ executed code ##############
setupEventListeners();
