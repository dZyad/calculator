const MATH_ERROR = 'Math Error';

const calculator = {}

function initializeCalculator () {
    calculator.result = 0;
    calculator.value = 0;
    calculator.operator = '=';
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
        return resultFunction(a,b);
    }
}
