const expressionArray = ['-', '+', '*', '/'];
const isNum = /[0-9]/g;

let allValues = {
    numberOne: '',
    operator: '',
    numberTwo: ''
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

function updateDisplay(elem) {
    let display = document.querySelector('.display');
    if (elem == 'Clear' || allValues['numberOne'] == '') {
        display.textContent = '0';
    }
    else {
        display.textContent = `${allValues['numberOne']}${allValues['operator']}${allValues['numberTwo']}`;
    }
}

function updateValues(numBtn) {
    if (numBtn.textContent.match(isNum)) {
        if (allValues['operator'] == '') {
            if (allValues['numberOne'] == '' || allValues['numberOne'] == '0') {
                updateDisplay('Clear');
                clearFormula();
            }
            allValues['numberOne'] += numBtn.textContent;
        } else {
            allValues['numberTwo'] += numBtn.textContent;
        }
        updateDisplay();
    }
}

function clickNumber() {
    let numberButtons = document.querySelectorAll('.numbers > button');
    numberButtons.forEach(numBtn => {
        numBtn.addEventListener('click', () => {
            updateValues(numBtn);
        });
    });
}

function pressNumber() {
    let numberButtons = document.querySelectorAll('.numbers > button');
    document.addEventListener('keydown', (pressedKey) => {
        numberButtons.forEach((numBtn) => {
            let codeArr = numBtn.dataset.key.split(" ");
            if (codeArr.includes(`${pressedKey.keyCode}`)) {
                updateValues(numBtn);
            }
        });
    });
}

function undoNumber() {
    document.addEventListener('keydown', (pressedKey) => {
        if (pressedKey.keyCode == 8 && allValues['operator'] == '') {
            allValues['numberOne'] = allValues['numberOne'].slice(0,-1);
        } else if (pressedKey.keyCode == 8 && allValues['operator'] != '') {
            allValues['numberTwo'] = allValues['numberTwo'].slice(0,-1);
        }
        updateDisplay(); 
    });
    let backBtn = document.querySelector('.operator.backspace');
    backBtn.addEventListener('click',()=>{
        if (allValues['operator'] == '') {
            allValues['numberOne'] = allValues['numberOne'].slice(0,-1);
        } else if (allValues['operator'] != '') {
            allValues['numberTwo'] = allValues['numberTwo'].slice(0,-1);
        }
        updateDisplay();  
    });  
    
}

function updateOperators(opBtn){
    if (expressionArray.includes(opBtn.textContent) && allValues['numberTwo'] == '' && allValues['numberOne'] != '') {
        allValues['operator'] = opBtn.textContent;
    }
    else if (expressionArray.includes(opBtn.textContent) && allValues['numberTwo'] != '' && allValues['numberOne'] != '') {
        calculate();
        allValues['operator'] = opBtn.textContent;
    }
    else if (opBtn.textContent == 'Clear') {
        clearFormula();
    } else if (opBtn.textContent == '=') {
        calculate();
    }
    updateDisplay();
}

function selectOperator() {
    let operatorButtons = document.querySelectorAll('.operator');
    operatorButtons.forEach(opBtn => {
        opBtn.addEventListener('click', () => {
            updateOperators(opBtn);
        })
    });
}

function pressOperator(){
    let operatorButtons = document.querySelectorAll('.operator');
    document.addEventListener('keydown',(pressedKey)=>{
        operatorButtons.forEach((opBtn)=>{
            if(opBtn.dataset.key == pressedKey.keyCode){
                updateOperators(opBtn);
            } 
        })
    });
}

function addDot(){
    let dot = '.';
    let operatorButtons = document.querySelectorAll('.operator.dot');
    operatorButtons.forEach(opBtn => {
        opBtn.addEventListener('click', () => {
            if(allValues['operator'] == ''){
                if(!allValues['numberOne'].includes(dot) && allValues['numberOne'].length >= 1){
                    allValues['numberOne']+=dot;
                }else if(allValues['numberOne'].slice(-1) == dot){
                    allValues['numberOne'] = allValues['numberOne'].slice(0,-1);
                }
            }else{
                if(!allValues['numberTwo'].includes(dot) && allValues['numberTwo'].length >= 1){
                    allValues['numberTwo']+=dot;
                }else if(allValues['numberTwo'].slice(-1) == dot){
                    allValues['numberTwo'] = allValues['numberTwo'].slice(0,-1);
                }
            }
            updateDisplay();
        })
    });
}

function calculate() {
    let answer = '0';
    if (allValues['numberTwo'] == '' && allValues['numberOne'] != '') {
        answer = allValues['numberOne'];
    } else if (allValues['numberTwo'] != '') {
        if (allValues['operator'] == '/' && allValues['numberOne'] == '0') {
            answer = 0;
        }
        else {
            answer = operate(allValues['operator'], allValues['numberOne'], allValues['numberTwo']).toFixed(1);
        }
    }
    clearFormula();
    allValues['numberOne'] += answer;
    updateDisplay();
}

function clearFormula() {
    updateDisplay('Clear');
    allValues = {
        numberOne: '',
        operator: '',
        numberTwo: ''
    };
}

clickNumber();
selectOperator();
pressNumber();
undoNumber();
pressOperator();
addDot();