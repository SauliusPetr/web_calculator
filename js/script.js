//add
function add(var_one, var_two) {
    return var_one + var_two;
}

//subtract
function subtract(var_one, var_two) {
    return var_one - var_two;
}

//multiply
function multiply(var_one, var_two) {
    return var_one * var_two;
}

//divide
function divide(var_one, var_two) {
    return var_one / var_two;
}

function operate(operator, var_one, var_two) {
    switch (operator) {
        case '+':
            return add(var_one, var_two);
        case '-':
            return subtract(var_one, var_two);
        case '*':
            return multiply(var_one, var_two);
        case '/':
            return divide(var_one, var_two);
        default:
            return "OOPS, something went wrong!";
            break;
    }
}

let formula = '';
function getFormula(){
    return formula;
}
function addToFormula(elem){
    formula +=elem;
    updateDisplay();
}
function setFormula(elem){
    formula = elem;
}

function updateDisplay(elem){
    if(elem == 'Clear') display.textContent = '';
    display.textContent = getFormula();
}

let display = document.querySelector('.display');

function clickedNumber() {
    let numberButtons = document.querySelectorAll('.number');
    numberButtons.forEach(numBtn => {
        numBtn.addEventListener('click', () => {
           addToFormula(numBtn.textContent); 
        });
    });
}

function clickedOperator() {
    let operatorCount = 0;
    let operatorButtons = document.querySelectorAll('.operator');
    operatorButtons.forEach(opBtn => {
        opBtn.addEventListener('click', () => {
            if(!getFormula(getFormula().length-1).includes('-','+','*','/') && opBtn.textContent != '=' && opBtn.textContent != 'Clear'){
                operatorCount=1;
                addToFormula(opBtn.textContent);
            }
            if(getFormula().length == 0  && opBtn.textContent != '=' && opBtn.textContent != 'Clear' ){
                operatorCount=2;
                addToFormula(opBtn);
            }
            if(getFormula(getFormula().length-1).includes('-','+','*','/')  && opBtn.textContent != '=' && opBtn.textContent != 'Clear' ){
                operatorCount+=1;
                addToFormula(` ${opBtn.textContent}`);
            }
            if(opBtn.textContent = 'Clear'){
                clearFormula();
            }
            if(opBtn.textContent = '='){
                calculate();
            }
        });
    });
}

function clearFormula(){
    updateDisplay('Clear');
    setFormula('');
}

function calculate(){
    let formulaString = getFormula();

}