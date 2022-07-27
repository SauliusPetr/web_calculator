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