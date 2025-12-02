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
let displayValue = '';


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
