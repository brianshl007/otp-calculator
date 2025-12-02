console.log('Script loaded!');

//Adding basic math functions here
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;  // Remove the error throw here, we'll handle it elsewhere
}

//initializing variables to hold values and operator
let firstNumber = '';  // Changed from 'first'
let secondNumber = '';  // Changed from 'second'
let operator = '';
let displayValue = '0';
let shouldResetDisplay = false;

//Function to perform operation based on what type of math to calculate
function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            throw new Error("Invalid operator");
    }
}

// Function to round long decimals
function roundResult(number) {
  return Math.round(number * 100000) / 100000;
}

//Get the display element
const display = document.querySelector('.display');

//Function to update display value
function updateDisplay() {
    display.textContent = displayValue;
}

//Function to handle number inputs
function inputNumber(num) {
    if (displayValue === '0' || shouldResetDisplay) {
        displayValue = num;
        shouldResetDisplay = false;
    } else {
        displayValue += num;
    } 
    updateDisplay();
}

//Adding button capabilities to all the buttons
function inputOperator(op) {
  if (firstNumber === '') {
    // First number input is complete
    firstNumber = displayValue;
    operator = op;
    displayValue = '0';
  } else if (operator) {  // Removed the displayValue !== '0' check
    // There's already a first number and operator, so calculate the result
    secondNumber = displayValue;
    
    // Check for division by zero in chained operations
    if (operator === '/' && Number(secondNumber) === 0) {
      displayValue = 'Error: Div by 0';
      updateDisplay();
      firstNumber = '';
      secondNumber = '';
      operator = '';
      return;
    }
    
    const result = operate(operator, Number(firstNumber), Number(secondNumber));
    firstNumber = String(roundResult(result));
    operator = op;
    displayValue = firstNumber;
    updateDisplay();
    displayValue = '0';
  } else {
    // Just update the operator if user pressed multiple operators
    operator = op;
  }
}

//Function to calculate result with equals button
function calculate() {
  if (firstNumber !== '' && operator !== '') {  // Removed the displayValue !== '0' check
    secondNumber = displayValue;
    
    // Check for division by zero
    if (operator === '/' && Number(secondNumber) === 0) {
      displayValue = 'Error: Div by 0';
      updateDisplay();
      firstNumber = '';
      secondNumber = '';
      operator = '';
      return;
    }
    
    const result = operate(operator, Number(firstNumber), Number(secondNumber));
    displayValue = String(roundResult(result));
    updateDisplay();
    
    // Reset for next calculation
    firstNumber = '';
    secondNumber = '';
    operator = '';
    shouldResetDisplay = true;
  }
}

//Function to clear all values
function clear() {
    firstNumber = '';  // Changed from 'first'
    secondNumber = '';  // Changed from 'second'
    operator = '';
    displayValue = '0';
    updateDisplay();
}

// Add event listeners for NUMBER buttons (this was missing!)
const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Check if it's the decimal button
      if (button.textContent === '.') {
        inputDecimal();
      } else {
        inputNumber(button.textContent);
      }
    });
});

//Adding event listeners to operator, equals and clear buttons
const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        inputOperator(button.textContent);
    });
});

const equalsButton = document.querySelector('.equals');
equalsButton.addEventListener('click', () => {
    calculate();
});

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', () => {
    clear();
});

//Function to handle decimal point input
function inputDecimal() {
  if (shouldResetDisplay) {
    displayValue = '0.';
    shouldResetDisplay = false;
    updateDisplay();
  } else if (!displayValue.includes('.')) {
    displayValue += '.';
    updateDisplay();
  }
}

// Initialize display
updateDisplay();