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
        case 'add':
            return add(var_one, var_two);
        case 'sybtract':
            return subtract(var_one, var_two);
        case 'multiply':
            return multiply(var_one, var_two);
        case 'divide':
            return divide(var_one, var_two);
        default:
            return "OOPS, something went wrong!";
            break;
    }
}

//function 