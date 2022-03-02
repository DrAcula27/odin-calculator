//global variables
let currentNum = "";
let previousNum = "";
let operator = "";

//cache DOM variables
const currentDisplayNumber = document.querySelector(".currentNumber");
const previousDisplayNumber = document.querySelector(".previousNumber");
const clear = document.querySelector(".clear");
const sign = document.querySelector(".sign");
const percent = document.querySelector(".percent");
const undo = document.querySelector(".undo");
const decimal = document.querySelector(".decimal");
const equal = document.querySelector(".equal");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

//calculator functions
clear.addEventListener("click", clearCalculator);

function clearCalculator() {
    currentNum = "";
    previousNum = "";
    operator = "";
    currentDisplayNumber.textContent = "0";
    previousDisplayNumber.textContent = "";
}

//TODO - sign
sign.addEventListener("click", () => {
    toggleSign();
});

function toggleSign() {

}

//TODO - percent

undo.addEventListener("click", () => {
    handleDelete();
});

function handleDelete() {
    if (currentNum !== "") {
        currentNum = currentNum.slice(0, -1);
        currentDisplayNumber.textContent = currentNum;
    if (currentNum === "") {
        currentDisplayNumber.textContent = "0";
    }
    }
    if (currentNum === "" && previousNum !== "" && operator === "") {
        previousNum = previousNum.slice(0, -1);
        currentDisplayNumber.textContent = previousNum;
    }
}

decimal.addEventListener("click", () => {
    addDecimal();
});

function addDecimal() {
    if (!currentNum.includes(".")) {
        currentNum += ".";
        currentDisplayNumber.textContent = currentNum;
    }
}

equal.addEventListener("click", () => {
    if (currentNum != "" && previousNum != "") {
        compute();
    }
});

numbers.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        handleNumber(e.target.textContent);
    });
});

function handleNumber(number) {
    if (previousNum !== "" && currentNum !== "" && operator === "") {
        previousNum = "";
        currentDisplayNumber.textContent = currentNum;
    }
    if (currentNum.length <= 11) {
        currentNum += number;
        currentDisplayNumber.textContent = currentNum;
    }
}

operators.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        handleOperator(e.target.textContent);
    });
});

function handleOperator(op) {
    if (previousNum === "") {
        previousNum = currentNum;
        operatorCheck(op);
    } else if (currentNum === "") {
        operatorCheck(op);
    } else {
        compute();
        operator = op;
        currentDisplayNumber.textContent = "0";
        previousDisplayNumber.textContent = previousNum + " " + operator;
    }
}

//background calculator functions
function operatorCheck(text) {
    operator = text;
    previousDisplayNumber.textContent = previousNum + " " + operator;
    currentDisplayNumber.textContent = "0";
    currentNum = "";
}

function compute() {
    previousNum = Number(previousNum);
    currentNum = Number(currentNum);

    if (operator === "+") {
        previousNum += currentNum;
    } else if (operator === "-") {
        previousNum -= currentNum;
    } else if (operator === "*") {
        previousNum *= currentNum;
    } else if (operator === "/") {
        if (currentNum <= 0) {
            previousNum = ">:(";
            displayResults();
            return;
        }
    previousNum /= currentNum;
    }
    previousNum = roundNumber(previousNum);
    previousNum = previousNum.toString();
    displayResults();
}

function roundNumber(num) {
    return Math.round(num * 1000000000) / 1000000000;
}

function displayResults() {
    if (previousNum.length <= 11) {
        currentDisplayNumber.textContent = previousNum;
    } else {
        currentDisplayNumber.textContent = previousNum.slice(0, 11) + "...";
    }
        previousDisplayNumber.textContent = "";
        operator = "";
        currentNum = "";
}

//keyboard support
window.addEventListener("keydown", handleKeyPress);

function handleKeyPress(e) {
    e.preventDefault();
    if (e.key >= 0 && e.key <= 9) {
        handleNumber(e.key);
    }
    if (e.key === "Enter" || (e.key === "=" && currentNum != "" && previousNum != "")) {
        compute();
    }
    if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*") {
        handleOperator(e.key);
    }
    if (e.key === ".") {
        addDecimal();
    }
    if (e.key === "Backspace") {
        handleDelete();
    }
    if (e.key === "Escape") {
        clearCalculator();
    }
}
