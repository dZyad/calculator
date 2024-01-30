const MATH_ERROR = 'Math Error';

const numbers = document.querySelectorAll('.keys .number');
const operands = document.querySelectorAll('.keys .operand');
const display = document.querySelector('#display');

const calculator = {}
initializeCalculator();

numbers.forEach(key => {
    key.addEventListener('click', (event) => {
        if (isNewOrEqual()) {
            calculator.result = 0;
        }
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
    if (!isNewOrEqual()) {
        doOperation();º
        calculator.operator = event.target.textContent;
    } else if (calculator.operator !== '') {
        calculator.value = calculator.result;
        doOperation();
    }
    calculator.operator = '=';
}

function clearKey() {
    if (event.target.textContent === 'DEL') {
        calculator.value = 0;
        updateDisplay(calculator.value);
    } else {
        initializeCalculator();
    }
}

function isNewOrEqual() {
    return calculator.operator === '' || calculator.operator === '=';
}

function mathKey() {
    if (isNewOrEqual()) {
        calculator.operator = event.target.textContent;
        calculator.result === 0 ? calculator.result = calculator.value : calculator.result;
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
    if(calculator.value === 0) {
        calculator.result *= -1;
        updateDisplay(calculator.result);    
    } else {
        calculator.value *= -1;
        updateDisplay(calculator.value);
    }
}

function updateDisplay(value) {
    if (value == MATH_ERROR) {
        initializeCalculator()
    }
    
    let displayValue;
    if (Math.abs(value) >= 1e9 || (Math.abs(value) > 0 && Math.abs(value) < 1e-9)) {
        displayValue = value.toExponential(6);
    } else {
        displayValue = value.toString();
        if (displayValue.length > 9) {
            displayValue = displayValue.slice(0, 10);
        }
    }
    display.textContent = displayValue;
}

/** Math Logic Section */
function initializeCalculator () {
    calculator.result = 0;
    calculator.value = 0;
    calculator.operator = '';
    updateDisplay(calculator.value);
}

function doOperation() {
    if (calculator.operator !== '' && calculator.operator !== '=') {
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
