const calcButtons = document.querySelectorAll('[data-value');
const calcDisplay = document.querySelector('.calc_display');
const input1 = '';
const input2 = '';

function setupEventListeners() {
  calcButtons.forEach(button => button.addEventListener('click', handleClick));
}

function handleClick() {
  calcDisplay.innerHTML = this.dataset.value;
}


// executed code

setupEventListeners();
