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
        display.textContent = `${allValues['numberOne']}
        ${allValues['operator']}
        ${allValues['numberTwo']}`;
    }
}

function updateNumber(numBtn) {
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
    let numberButtons = document.querySelectorAll('.number');
    numberButtons.forEach(numBtn => {
        numBtn.addEventListener('mousedown', () => {
            updateNumber(numBtn);
        });
    });
}

function pressNumber() {
    let numberButtons = document.querySelectorAll('.number');
    document.addEventListener('keydown', (pressedKey) => {
        numberButtons.forEach((numBtn) => {
            let codeArr = numBtn.dataset.key.split(" ");
            if (codeArr.includes(`${pressedKey.keyCode}`)) {
                updateNumber(numBtn);
            }
        });
    });
}

function undoNumber() {
    document.addEventListener('keydown', (pressedKey) => {
        if (pressedKey.keyCode == 8 && allValues['operator'] == '') {
            allValues['numberOne'] = allValues['numberOne'].slice(0, -1);
        } else if (pressedKey.keyCode == 8 && allValues['operator'] != '') {
            allValues['numberTwo'] = allValues['numberTwo'].slice(0, -1);
        }
        updateDisplay();
    });
    let backBtn = document.querySelector('.operator.backspace');
    backBtn.addEventListener('click', () => {
        if (allValues['operator'] == '') {
            allValues['numberOne'] = allValues['numberOne'].slice(0, -1);
        } else if (allValues['operator'] != '') {
            allValues['numberTwo'] = allValues['numberTwo'].slice(0, -1);
        }
        updateDisplay();
    });

}

function updateOperators(opBtn) {
    if (expressionArray.includes(opBtn.textContent) &&
        allValues['numberTwo'] == '' && allValues['numberOne'] != '') {
        allValues['operator'] = opBtn.textContent;
    }
    else if (expressionArray.includes(opBtn.textContent) &&
        allValues['numberTwo'] != '' && allValues['numberOne'] != '') {
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

function clickOperator() {
    let operatorButtons = document.querySelectorAll('.operator');
    operatorButtons.forEach(opBtn => {
        opBtn.addEventListener('mousedown', () => {
            updateOperators(opBtn);
        })
    });
}

function pressOperator() {
    let operatorButtons = document.querySelectorAll('.operator');
    document.addEventListener('keydown', (pressedKey) => {
        operatorButtons.forEach((opBtn) => {
            if (opBtn.dataset.key == pressedKey.keyCode) {
                updateOperators(opBtn);
            }
        })
    });
}

function updateDot() {
    let dot = '.';
    if (allValues['operator'] == '') {
        if (!allValues['numberOne'].includes(dot) &&
            allValues['numberOne'].length >= 1) {
            allValues['numberOne'] += dot;
        } else if (allValues['numberOne'].slice(-1) == dot) {
            allValues['numberOne'] = allValues['numberOne'].slice(0, -1);
        }
    } else {
        if (!allValues['numberTwo'].includes(dot) &&
            allValues['numberTwo'].length >= 1) {
            allValues['numberTwo'] += dot;
        } else if (allValues['numberTwo'].slice(-1) == dot) {
            allValues['numberTwo'] = allValues['numberTwo'].slice(0, -1);
        }
    }
    updateDisplay();
}

function clickDot() {
    let operatorButtons = document.querySelector('.operator.dot');
    operatorButtons.addEventListener('mousedown', () => {
        updateDot();
    });
}

function pressDot() {
    let operatorButtons = document.querySelector('.operator.dot');
    document.addEventListener('keydown', (pressedKey) => {
        if (operatorButtons.dataset.key == pressedKey.keyCode) {
            updateDot();
        }
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
            answer = operate(allValues['operator'],
                allValues['numberOne'],
                allValues['numberTwo']).toFixed(1);
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

function addBtnStyle() {
    let buttons = document.querySelectorAll('button');
    buttons.forEach((btn) => {
        btn.addEventListener('mousedown', () => {
            btn.classList.add('clicked');
        });
        document.addEventListener('mouseup', () => {
            btn.classList.remove('clicked');
        });

        let codeArr = btn.dataset.key.split(" ");
        document.addEventListener('keyup', (pressedKey) => {
            if (codeArr.includes(`${pressedKey.keyCode}`)) {
                btn.classList.remove('clicked');
            }
        });
        document.addEventListener('keydown', (pressedKey) => {
            if (codeArr.includes(`${pressedKey.keyCode}`)) {
                btn.classList.add('clicked');
            }
        });
    });
}

clickNumber();
pressNumber();
clickOperator();
pressOperator();
undoNumber();
pressDot();
clickDot();
addBtnStyle();