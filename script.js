
const screenValue = document.querySelector(".screen-value");
const screenMemory = document.querySelector('.screen-memory')

const buttons = document.querySelectorAll(".btn");
let currentInput = "";
let operator = "";
let previousInput = "";
let result

document.addEventListener("keydown", handleKeyPress);

buttons.forEach(button => {
    button.onclick = () => {
        const buttonValue = button.getAttribute("value");

        if (button.classList.contains("number") || buttonValue === ".") {
            handleNumber(buttonValue);
        } else if (button.classList.contains("operator") && buttonValue) {
            handleOperator(buttonValue);
        } else if (buttonValue === "=") {
            handleEqual();
        } else if (buttonValue === "all-clear") {
            clearDisplay();
        }
    };
});

function handleKeyPress(event) {
    const key = event.key;
    if (isFinite(key) || key === ".") {
        handleNumber(key);
    } else if (key === "+" || key === "-" || key === "*" || key === "/" || key === "%") {
        handleOperator(key);
    } else if (key === "Enter") {
        handleEqual();
    } else if (key === "Backspace") {
        deleteOne();
    } else if (key === "Escape") {
        clearDisplay();
    } else if (key === "^") {
        handleOperator("pow");
    }
}


function handleNumber(num) {
    if (num === "." && currentInput.includes(".")) return;
    currentInput += num;
    screenValue.value = currentInput;
    updateMemory();
}

function handleOperator(op) {
    if (currentInput === "") return;
    if (op === "negative") {
        negativeOperation()
    } else if (op === "pow") {
        squareOperation();
    } else {
        if (previousInput !== "") {
            handleEqual();
        }
        operator = op;
        previousInput = currentInput;
        currentInput = "";
        updateMemory();
    }
}

function squareOperation() {
    const num = parseFloat(currentInput);
    if (!isNaN(num)) {
        result = Math.pow(num, 2);
        screenMemory.value = `${num}²`;
        currentInput = result.toString();
        screenValue.value = currentInput;
        operator = "";
    }
}

function negativeOperation() {
    if (currentInput !== "") {
        currentInput = (parseFloat(currentInput) * -1).toString();
        screenValue.value = currentInput;
        updateMemory();
    }
}

function handleEqual() {
    if (currentInput === "" && operator !== "pow" || previousInput === "") return;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operator) {
        case "+":
            result = prev + current;
            break;
        case "-":
            result = prev - current;
            break;
        case "*":
            result = prev * current;
            break;
        case "/":
            result = prev / current;
            break;
        case "%":
            result = (prev - current) / (prev) * 100;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = "";
    previousInput = "";
    screenValue.value = currentInput;
    screenMemory.value = "";
}

function clearDisplay() {
    currentInput = "";
    previousInput = "";
    operator = "";
    screenValue.value = "";
    screenMemory.value = ""
}

function deleteOne() {
    const remove = document.getElementById('delete-one');
    remove.addEventListener("click", () => {
        if (currentInput.length > 0) {
            currentInput = currentInput.slice(0, -1);
            screenValue.value = currentInput;
            updateMemory();
        }
    });
}

function updateMemory() {
    if (operator === "pow") {
        screenMemory.value = `${previousInput}²`;
    } else if (operator === "negative") {
        screenMemory.value = `-${currentInput}`;
    } else {
        screenMemory.value = `${previousInput} ${operator} ${currentInput}`;
    }
}

deleteOne();
