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
    if (b === 0) {
        throw new Error("Division by zero is not allowed.");
    }
    return a / b;
}

//initializing variables to hold values and operator
let first = '';
let second = '';
let operator = '';
let displayValue = '0';


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

//Get the display element
const display = document.querySelector('.display');

//Function to update display value
function updateDisplay() {
    display.textContent = displayValue;
}

//Function to handle number inputs
function inputNumber(num) {
    if (displayValue === '0') {
        displayValue = num;
    } else {
        displayValue += num;
    } updateDisplay();
}

//Adding button capabilities to all the buttons
const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        inputNumber(button.textContent);
    });
});

//Function to handle operator inputs
function inputOperator(op) {
    if (first === '') {
        first = displayValue;
        operator = op;
        displayValue = '0';
    }   else if (operator && displayValue !== '0') {
        second = displayValue;
        first = String(operate(operator, parseFloat(first), parseFloat(second)));
        operator = op;
        displayValue = first;
        updateDisplay();
        displayValue = '0';
    }   else {
        operator = op;
    } 
}

//Function to calculate result with equals button
function calculate() {
    if (first !== '' && operator !== '' && displayValue !== '0') {
        second = displayValue;
        const result = operate(operator, parseFloat(first), parseFloat(second));
        displayValue = String(result);
        updateDisplay();
        first = '';
        second = '';
        operator = '';  
    }
}

//Function to clear all values
function clear() {
    first = '';
    second = '';
    operator = '';
    displayValue = '0';
    updateDisplay();
}

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