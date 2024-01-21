const MATH_ERROR = 'Math Error';

let calculator = {
    result: 0,
    value: 0,
    operator: '=',
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
