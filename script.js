let x = 1;
let y = 2;

let btnArray = []
for (let i = 0; i < 10; i++) {
    btnArray[i] = document.querySelector(`#btn${i + 1}`);
    btnArray[i].addEventListener('click', (e) => console.log(`clicked btn ${e.target.textContent}`))
}
console.log(btnArray)

function main(arg) {

}

function operate(a, b, func) {
    return func(a, b);
}

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

function sum() {
    let total = null;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}

main();