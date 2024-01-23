const MATH_ERROR = 'Math Error';

const numbers = document.querySelectorAll('.keys .number');
const operands = document.querySelectorAll('.keys .operand');
const display = document.querySelector('#display');

const calculator = {}
initializeCalculator();

numbers.forEach(key => {
    key.addEventListener('click', (event) => {
        if (calculator.value.toString().includes('.')) {
            calculator.value = calculator.value.toString() + event.target.textContent;
        } else {
            calculator.value = +(calculator.value.toString() + event.target.textContent);
        }
        updateDisplay(calculator.value);
    });
})

const operandObject = {
    'equal' : equalKey,
    'clear' : clearKey,
    'math' : mathKey,
    'dot' : dotKey,
    'sign' : signKey,
}

operands.forEach(key => {
    key.addEventListener('click', (event) => {
        operandObject[event.target.classList[1]]();
    });
})

function equalKey() {
    doOperation();
    calculator.operator = '';
}

function clearKey() {
    if (event.target.textContent === 'DEL') {
        calculator.value = 0;
        updateDisplay(calculator.value);
    } else {
        initializeCalculator();
    }
}

function mathKey() {
    if (calculator.operator.length === 0) {
        calculator.operator = event.target.textContent;
        calculator.result = calculator.value;
        calculator.value = 0;
    } else {
        doOperation();
        calculator.operator = event.target.textContent;
    }
}

function dotKey() {
    if (!calculator.value.toString().includes('.')) {
        calculator.value = calculator.value.toString() + '.';
        updateDisplay(+calculator.value);
    }
}

function signKey() {
    calculator.value *= -1;
    updateDisplay(calculator.value);
}

function updateDisplay(value) {
    display.textContent = `${value}`;
}

/** Math Logic Section */
function initializeCalculator () {
    calculator.result = 0;
    calculator.value = 0;
    calculator.operator = '';
    updateDisplay(calculator.value);
}

function doOperation() {
    if (calculator.operator !== '') {
        calculator.result = operate(calculator.result, calculator.value, calculator.operator);
    } else {
        calculator.result = calculator.value;
    }
    calculator.value = 0;
    updateDisplay(calculator.result);
}

const functionObject = {
    '+' : (a, b) => a+b,
    '-' : (a, b) => a-b,
    '*' : (a, b) => a*b,
    '/' : (a, b) => {
        if(b === 0) {
            return MATH_ERROR;
        }
        return a/b;
    }
};

function operate(a, b, operation) {
    let resultFunction = functionObject[operation];
    if(resultFunction) {
        return resultFunction(+a,+b);
    }
}
