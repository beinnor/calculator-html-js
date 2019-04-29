// Numbers
const numberBtns = document.getElementsByClassName('number');

// Operators
const plusBtn = document.getElementById('plus');
const minusBtn = document.getElementById('minus');
const multiplyBtn = document.getElementById('multiply');
const divideBtn = document.getElementById('divide');

// Equal
const equalBtn = document.getElementById('equal');

// Clear
const allClearBtn = document.getElementById('allClear');
const clearBtn = document.getElementById('clear');

// Misc buttons
const plusMinusBtn = document.getElementById('plusminus');
const decimalBtn = document.getElementById('decimal');

// Screen
const screen = document.getElementById('screen');
screen.innerText = '0';

const calc = {
  memory: null,
  operator: null,
  clearScreen: false,
};

// Helpers
const maxNumValidator = (num) => {
  if (num > 99999999 || num < -99999999) {
    return false;
  }
  return true;
};

const clearMem = () => {
  calc.memory = null;
  calc.operator = null;
};

const updateScreen = (value) => {
  let valNumber = null;
  if (typeof value === 'number') {
    valNumber = value;
  } else if (typeof value === 'string') {
    valNumber = parseFloat(value);
  }

  if (maxNumValidator(valNumber)) {
    screen.innerText = parseFloat(valNumber);
  } else {
    screen.innerText = 'ERR';
    clearMem();
  }
};

const updateMemory = (value) => {
  let valNumber = null;
  if (typeof value === 'number') {
    valNumber = value;
  } else if (typeof value === 'string') {
    valNumber = parseFloat(value);
  }

  if (maxNumValidator(valNumber)) {
    calc.memory = valNumber;
  } else {
    screen.innerText = 'ERR';
    clearMem();
  }
};

const calculate = (event) => {
  const operator = event.target.innerText;
  calc.operator = operator;
  const screenNum = parseFloat(screen.innerText);

  if (calc.memory === null) {
    updateMemory(screenNum);
  } else {
    let sum;
    switch (operator) {
      case '+':
        sum = calc.memory + screenNum;
        break;
      case '-':
        sum = calc.memory - screenNum;
        break;
      case '\xF7':
        sum = calc.memory / screenNum;
        break;
      case '\xD7':
        sum = calc.memory * screenNum;
        break;
      default:
        throw new Error('Error in calculate function!');
    }

    updateMemory(sum);
    updateScreen(sum);
  }
  calc.clearScreen = true;
};

// EventListeners
const allClearListener = () => {
  screen.innerText = '0';
  calc.memory = null;
  calc.operator = null;
};

const clearListener = () => {
  screen.innerText = calc.memory;
  calc.memory = null;
  calc.operator = null;
};

const numberListener = (event) => {
  if (calc.clearScreen) {
    screen.innerText = '';
    calc.clearScreen = false;
  }

  if (screen.innerText === '0') {
    screen.innerText = '';
  }

  if (screen.innerText.length <= 7) {
    screen.innerText += event.target.innerText;
  }
};

const equalListener = () => {
  const screenNum = parseFloat(screen.innerText);

  if (calc.operator === '+') {
    updateScreen(calc.memory + screenNum);
    calc.clearScreen = true;
    clearMem();
  }

  if (calc.operator === '-') {
    updateScreen(calc.memory - screenNum);
    calc.clearScreen = true;
    clearMem();
  }

  if (calc.operator === '\xD7') {
    updateScreen(calc.memory * screenNum);
    calc.clearScreen = true;
    clearMem();
  }

  if (calc.operator === '\xF7') {
    updateScreen(calc.memory / screenNum);
    calc.clearScreen = true;
    clearMem();
  }
};

const decimalBtnListener = () => {
  if (calc.clearScreen) {
    screen.innerText = '0';
    calc.clearScreen = false;
  }

  if (screen.innerText.length <= 7) {
    screen.innerText += '.';
  }
};

const plusMinusListener = () => {
  const screenString = screen.innerText;
  if (screenString[0] === '-' && screenString !== '0') {
    screen.innerText = screenString.slice(1);
  } else if (screenString !== '0') {
    screen.innerText = `-${screenString}`;
  }
};

// Add EventListeners
for (let i = 0; i < numberBtns.length; i += 1) {
  numberBtns[i].addEventListener('click', numberListener);
}
plusBtn.addEventListener('click', calculate);
minusBtn.addEventListener('click', calculate);
multiplyBtn.addEventListener('click', calculate);
divideBtn.addEventListener('click', calculate);
equalBtn.addEventListener('click', equalListener);
plusMinusBtn.addEventListener('click', plusMinusListener);
clearBtn.addEventListener('click', clearListener);
allClearBtn.addEventListener('click', allClearListener);
decimalBtn.addEventListener('click', decimalBtnListener);
