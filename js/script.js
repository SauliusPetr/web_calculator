const expressionArray = ['-', '+', '*', '/'];
const isNum = /[0-9]/g;
let allValues = {
    numberOne : '',
    operator : '',
    numberTwo : ''
};

function add(var_one, var_two) {
    return var_one + var_two;
}

function subtract(var_one, var_two) {
    return var_one - var_two;
}

function multiply(var_one, var_two) {
    return var_one * var_two;
}

function divide(var_one, var_two) {
    return var_one / var_two;
}

function operate(operator, var_one, var_two) {
    switch (operator) {
        case '+':
            return add(parseFloat(var_one), parseFloat(var_two));
        case '-':
            return subtract(parseFloat(var_one), parseFloat(var_two));
        case '*':
            return multiply(parseFloat(var_one), parseFloat(var_two));
        case '/':
            return divide(parseFloat(var_one), parseFloat(var_two));
        default:
            return "OOPS, something went wrong! ";
            break;
    }
}

let display = document.querySelector('.display');
function updateDisplay(elem) {
    if (elem == 'Clear') {
        display.textContent = '';
    }
    else {
        display.textContent = `${allValues.numberOne}${allValues.operator}${allValues.numberTwo}`;
    }
}

function selectNumber(){
    let numberButtons = document.querySelectorAll('.number');
    numberButtons.forEach(numBtn => {
        numBtn.addEventListener('click', () => {
            if(numBtn.textContent.match(isNum)){
                if(allValues.operator == ''){
                    if(allValues['numberOne']==''){
                        updateDisplay('Clear');
                    }
                    allValues['numberOne'] += numBtn.textContent;
                }else{
                    allValues['numberTwo'] += numBtn.textContent;
                }
                updateDisplay();
            }
        })
    });
}
  
function selectOperator(){
    let operatorButtons = document.querySelectorAll('.operator');
    operatorButtons.forEach(opBtn => {
        opBtn.addEventListener('click', () => {
            if (expressionArray.includes(opBtn.textContent) && allValues['numberTwo']=='' && allValues['numberOne']!='')  {
                allValues['operator'] = opBtn.textContent;
                updateDisplay();
            }
            else if(expressionArray.includes(opBtn.textContent) && allValues['numberTwo']!='' && allValues['numberOne']!=''){
                calculate();
                allValues['operator'] = opBtn.textContent;
                updateDisplay();
            }
            else if(opBtn.textContent == 'Clear'){
                clearFormula();
            }else if(opBtn.textContent == '='){
                calculate();
            }
        })
    });
}
function calculate(){
    let answer = 0;
    if(allValues['numbeTwo'] == '' && allValues['numberOne'] != ''){
        answer = allValues['numberOne'];
    }else if(allValues['numbeTwo'] != ''){
        answer = operate(allValues.operator,allValues.numberOne,allValues.numberTwo);
    }
    clearFormula();
    allValues['numberOne'] += answer.toFixed(3);
    updateDisplay();
}

function clearFormula() {
    updateDisplay('Clear');
    allValues = {
        numberOne : '',
        operator : '',
        numberTwo : ''
    };
}
selectNumber();
selectOperator();