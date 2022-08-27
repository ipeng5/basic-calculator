const numBtns = document.querySelectorAll(".num-button");
const opBtns = document.querySelectorAll(".op-button");
const equalBtn = document.querySelector(".equal-button");
const acBtn = document.querySelector(".ac-button");
const delBtn = document.querySelector(".del-button");
let upScreen = document.querySelector("#upper-screen")
let currScreen = document.querySelector("#current-screen")
let num1;
let num2;
let currResult = "";
let upResult = "";
let opSign;

// appendNum(num) - when click a number, it adds to the current screen
numBtns.forEach(numBtn => {
    numBtn.addEventListener("click", appendNum);
})
function appendNum(e) {
    if (e.target.textContent === "." && currResult.includes(".")) return;
    currResult += e.target.textContent;
    updateDisplay()
}

// decide operations
opBtns.forEach(opBtn => {
    opBtn.addEventListener("click", chooseOp);
})
function chooseOp(e) {
    if (currResult === "") return;
    if (upResult !== "") {
        compute();
    }
    upResult = currResult;
    currScreen.textContent = "";
    currResult = "";
    opSign = e.target.value;
    updateDisplay()
}

// compute the result
equalBtn.addEventListener("click", compute);
function compute() {
    let computation;
    const prev = parseFloat(upResult);
    const curr = parseFloat(currResult);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (opSign) {
        case "+":
            computation = parseFloat(upResult) + parseFloat(currResult);
            break;
        case "-":
            computation = parseFloat(upResult) - parseFloat(currResult);
            break;
        case "*":
            computation = parseFloat(upResult) * parseFloat(currResult);
            break;
        case "÷":
            computation = parseFloat(upResult) / parseFloat(currResult);
            break;
        default: return;
    }
    currResult = computation;
    opSign = undefined;
    upResult = ""
    updateDisplay();
}

// clear all
acBtn.addEventListener("click", clearAll);
function clearAll() {
    currResult = "";
    upResult = "";
    opSign = undefined;
    updateDisplay();
}

// delete last digit
delBtn.addEventListener("click", deleteLast);
function deleteLast() {
    currResult = currResult.slice(0, -1);
    updateDisplay();
}

// update display


function updateDisplay() {
    if (opSign != null) {
        upScreen.textContent = `${upResult}${opSign}`
    }
    else {
        upScreen.textContent = upResult;
    }
    currScreen.textContent = currResult;
}