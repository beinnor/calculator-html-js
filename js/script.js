const DISPLAY_MAX_NUM = 9999999999;
const DISPLAY_MAX_NUM_LENGTH = DISPLAY_MAX_NUM.toString().length - 1;

const calculator = {
  displayValue: '0',
  firstNumber: null,
  waitingForSecondNumber: false,
  operator: null,
};

function clearSideDisplay() {
  const sideDisplay = document.querySelector('.displaySide');
  sideDisplay.value = '';
}

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstNumber = null;
  calculator.waitingForSecondNumber = false;
  calculator.operator = null;
  clearSideDisplay();
}

function resetDisplay() {
  if (calculator.operator !== '=') {
    calculator.displayValue = '0';
    calculator.operator = null;
    clearSideDisplay();
  }
}

function resetMemory() {
  calculator.displayValue = '0';
  calculator.firstNumber = null;
  calculator.waitingForSecondNumber = false;
  calculator.operator = null;
}

function validateNumberSize(num) {
  if (num < DISPLAY_MAX_NUM && num > -DISPLAY_MAX_NUM) {
    return true;
  }

  return false;
}

function validateNumberLength(num) {
  if (num.length <= DISPLAY_MAX_NUM_LENGTH) {
    return true;
  }

  return false;
}

function fixNumberLength(num) {
  const digitsBeforeDecimal = parseInt(num, 10).toString().length;
  const roomLeftForDigits = DISPLAY_MAX_NUM_LENGTH - digitsBeforeDecimal - 1;

  const newNum = +parseFloat(num).toFixed(roomLeftForDigits);

  return newNum;
}

function updateSideDisplay() {
  const sideDisplay = document.querySelector('.displaySide');

  if (calculator.operator === '/') {
    sideDisplay.value = '÷';
  } else if (calculator.operator === '*') {
    sideDisplay.value = '×';
  } else if (calculator.operator === '+') {
    sideDisplay.value = '+';
  } else if (calculator.operator === '-') {
    sideDisplay.value = '-';
  } else if (calculator.operator === '=') {
    sideDisplay.value = '=';
  } else {
    sideDisplay.value = ' ';
  }
}

function updateMainDisplay() {
  const display = document.querySelector('.displayMain');
  const { displayValue } = calculator;

  if (validateNumberSize(displayValue)) {
    if (validateNumberLength(displayValue)) {
      display.value = displayValue;
    } else {
      display.value = fixNumberLength(displayValue);
    }
  } else {
    display.value = 'ERROR';
    resetMemory();
  }
}

function inputDigit(digit) {
  const { displayValue, waitingForSecondNumber: waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand) {
    calculator.displayValue = digit;
    calculator.waitingForSecondNumber = false;
  } else if (displayValue.length < DISPLAY_MAX_NUM_LENGTH) {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }

  clearSideDisplay();
}

function inputDecimal(dot) {
  const { waitingForSecondNumber } = calculator;
  const { displayValue } = calculator;

  if (waitingForSecondNumber === true) return;

  if (!displayValue.includes(dot) && displayValue.length < DISPLAY_MAX_NUM_LENGTH) {
    calculator.displayValue += dot;
  }
}

function calculate(firstNumber, secondNumber, operator) {
  switch (operator) {
    case '/':
      return firstNumber / secondNumber;
    case '*':
      return firstNumber * secondNumber;
    case '+':
      return firstNumber + secondNumber;
    case '-':
      return firstNumber - secondNumber;
    case '=':
      return secondNumber;
    default:
      return false;
  }
}

function handleOperator(nextOperator) {
  const { firstNumber, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (nextOperator === 'root') {
    const result = Math.sqrt(inputValue).toString();
    calculator.displayValue = result;
    calculator.operator = null;
    calculator.firstNumber = result;
    calculator.waitingForSecondNumber = false;
    return;
  }


  if (operator && calculator.waitingForSecondNumber) {
    calculator.operator = nextOperator;
    return;
  }

  if (firstNumber === null) {
    calculator.firstNumber = inputValue;
  } else if (operator) {
    const result = calculate(firstNumber, inputValue, operator);

    calculator.displayValue = String(result);
    calculator.firstNumber = result;
  }

  calculator.waitingForSecondNumber = true;
  calculator.operator = nextOperator;
}

updateMainDisplay();

const keys = document.querySelector('.keys');
keys.addEventListener('click', (event) => {
  const { target } = event;
  if (!target.matches('button')) {
    return;
  }

  if (target.classList.contains('operator')) {
    handleOperator(target.value);
    updateMainDisplay();
    updateSideDisplay();
    return;
  }

  if (target.classList.contains('decimal')) {
    inputDecimal(target.value);
    updateMainDisplay();
    return;
  }

  if (target.classList.contains('allClear')) {
    resetCalculator();
    updateMainDisplay();
    return;
  }

  if (target.classList.contains('clear')) {
    resetDisplay();
    updateMainDisplay();
    return;
  }

  if (target.classList.contains('plusMinus')) {
    if (calculator.displayValue[0] === '-' && calculator.displayValue !== '0') {
      calculator.displayValue = calculator.displayValue.slice(1);
    } else if (calculator.displayValue !== '0') {
      calculator.displayValue = `-${calculator.displayValue}`;
    }
    updateMainDisplay();
    return;
  }

  inputDigit(target.value);
  updateMainDisplay();
});
