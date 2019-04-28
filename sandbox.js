// Sandbox for testing ideas

class Calculator {
  constructor() {
    this.display = ''; // string
    this.memory = null; // integer
    this.operator = null; // string
    this.clearDisplay = false;
  }

  updateDisplay() {
    if (this.clearDisplay) {
      this.display = null;
    }
  }

  enterNum(num) {
    this.updateDisplay();
    if (this.display.length <= 7) {
      this.display += num;
    }
  }

  add() {
    if (this.memory === null) {
      this.memory = parseInt(this.display, 10);
      this.clearDisplay = true;
    } else {
      const result = this.memory + parseInt(this.display, 10);
      this.display = result;
      this.clearDisplay = true;
    }
  }
}


const calc = new Calculator();

calc.enterNum(1);
calc.add();
calc.enterNum(1);
calc.add();

console.log(`Display: ${calc.display}`);
console.log(`Mem: ${calc.mem}`);
