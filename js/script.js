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

const clearAllListener = () => {
  screen.innerText = '0';
  calc.memory = null;
  calc.operator = null;
};

const clearScreenListener = () => {
  screen.innerText = '0';
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

  const screenNum = parseFloat(screen.innerText);

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

const minusListener = (event) => {
  calc.operator = event.target.innerText;

  const screenNum = parseFloat(screen.innerText);

  if (calc.memory === null) {
    calc.memory = screenNum;
  } else {
    // sum memory minus screen into screen
    const sum = calc.memory - screenNum;
    console.log(sum);
    calc.memory = sum;
    screen.innerText = sum;
  }
  calc.clearScreen = true;
};

const multiplyListener = (event) => {
  calc.operator = event.target.innerText;

  const screenNum = parseFloat(screen.innerText);

  if (calc.memory === null) {
    calc.memory = screenNum;
  } else {
    // sum memory times screen into screen
    const sum = calc.memory * screenNum;
    console.log(sum);
    calc.memory = sum;
    screen.innerText = sum;
  }
  calc.clearScreen = true;
};

const divideListener = (event) => {
  calc.operator = event.target.innerText;

  const screenNum = parseFloat(screen.innerText);

  if (calc.memory === null) {
    calc.memory = screenNum;
  } else {
    // sum memory times screen into screen
    const sum = calc.memory / screenNum;
    console.log(sum);
    calc.memory = sum;
    screen.innerText = sum;
  }
  calc.clearScreen = true;
};


const equalListener = () => {
  const screenNum = parseFloat(screen.innerText);

  if (calc.operator === '+') {
    screen.innerText = calc.memory + screenNum;
    calc.clearScreen = true;
    clearMem();
  }

  if (calc.operator === '-') {
    screen.innerText = calc.memory - screenNum;
    calc.clearScreen = true;
    clearMem();
  }

  if (calc.operator === '\xD7') {
    screen.innerText = calc.memory * screenNum;
    calc.clearScreen = true;
    clearMem();
  }

  if (calc.operator === '\xF7') {
    screen.innerText = calc.memory / screenNum;
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

// EventListeners
for (let i = 0; i < numberBtns.length; i += 1) {
  numberBtns[i].addEventListener('click', numberListener);
}
plusBtn.addEventListener('click', plusListener);
minusBtn.addEventListener('click', minusListener);
multiplyBtn.addEventListener('click', multiplyListener);
divideBtn.addEventListener('click', divideListener);
equalBtn.addEventListener('click', equalListener);
plusMinusBtn.addEventListener('click', plusMinusListener);
clearBtn.addEventListener('click', clearScreenListener);
allClearBtn.addEventListener('click', clearAllListener);
decimalBtn.addEventListener('click', decimalBtnListener);
