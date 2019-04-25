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

// Screen
const screen = document.getElementById('screen');
screen.innerText = '0';

// TODO
// const decimalBtn = document.getElementById('decimal');
// const plusminusBtn = document.getElementById('plusminus');

const calc = {
  memory: null,
  operator: null,
  clearScreen: false,
};

const clearAll = () => {
  screen.innerText = '0';
  calc.memory = null;
  calc.operator = null;
};

const clearMem = () => {
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

const plusListener = (event) => {
  calc.operator = event.target.innerText;

  const screenNum = parseInt(screen.innerText, 10);

  if (calc.memory === null) {
    calc.memory = screenNum;
  } else {
    // sum memory plus screen into screen
    const sum = calc.memory + screenNum;
    console.log(sum);
    calc.memory = sum;
    screen.innerText = sum;
  }
  calc.clearScreen = true;
};

const equalListener = () => {
  const screenNum = parseInt(screen.innerText, 10);

  if (calc.operator === '+') {
    screen.innerText = calc.memory + screenNum;
    calc.clearScreen = true;
    clearMem();
  }
};

// Add eventlistener to numbers
for (let i = 0; i < numberBtns.length; i += 1) {
  numberBtns[i].addEventListener('click', numberListener);
}

// Add eventlistener to plusBtn
plusBtn.addEventListener('click', plusListener);

// Add eventlistener to equalBtn
equalBtn.addEventListener('click', equalListener);

// Clear only last number entered
clearBtn.addEventListener('click', () => {
  screen.innerText = screen.innerText.slice(0, -1);
  if (screen.innerText === '') screen.innerText = '0';
});

// Clear everything
allClearBtn.addEventListener('click', clearAll);
