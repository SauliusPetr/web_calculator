const expressionArray = ['-', '+', '*', '/'];
const isNum = /[0-9]/g;
let displayValue = {
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
        display.textContent += elem;
    }
}

function selectNumber(){
    let numberButtons = document.querySelectorAll('.number');
    numberButtons.forEach(numBtn => {
        numBtn.addEventListener('click', () => {
            if(numBtn.textContent.match(isNum)){
                if(displayValue.operator == ''){
                    if(displayValue['numberOne']==''){
                        updateDisplay('Clear');
                    }
                    displayValue['numberOne'] += numBtn.textContent;
                }else{
                    displayValue['numberTwo'] += numBtn.textContent;
                }
                updateDisplay(numBtn.textContent);
            }
        })
    });
}
  
function selectOperator(){
    let operatorButtons = document.querySelectorAll('.operator');
    operatorButtons.forEach(opBtn => {
        opBtn.addEventListener('click', () => {
            if (expressionArray.includes(opBtn.textContent) && displayValue['numberTwo']=='' && displayValue['numberOne']!='')  {
                displayValue['operator'] = opBtn.textContent;
                updateDisplay(opBtn.textContent);
            }else if (expressionArray.includes(opBtn.textContent) && displayValue['numberTwo']=='' && displayValue['numberOne']!='')  {
                displayValue['operator'] = opBtn.textContent;
                updateDisplay(opBtn.textContent);
            }
            else if(expressionArray.includes(opBtn.textContent) && displayValue['numberTwo']!='' && displayValue['numberOne']!=''){
                calculate();
                displayValue['operator'] = opBtn.textContent;
                updateDisplay(opBtn.textContent);
            }
            else if(opBtn.textContent == 'Clear'){
                clearFormula();
            }else if(opBtn.textContent == '='){
                calculate();
            }
        })
    });
}
function updateOperator(newOper){
    display.textContent[display.textContent.length-1] ='';
    display.textContent+=newOper;
}
function calculate(){
    let answer = 0;
    if(displayValue['numbeTwo'] == '' && displayValue['numberOne'] != ''){
        answer = displayValue['numberOne'];
    }else if(displayValue['numbeTwo'] != ''){
        answer = operate(displayValue.operator,displayValue.numberOne,displayValue.numberTwo);
    }else{
        updateDisplay('Enter number...');
    }
    clearFormula();
    displayValue['numberOne'] +=answer;
    updateDisplay(answer);
}

function clearFormula() {
    updateDisplay('Clear');
    displayValue = {
        numberOne : '',
        operator : '',
        numberTwo : ''
    };
}
selectNumber();
selectOperator();