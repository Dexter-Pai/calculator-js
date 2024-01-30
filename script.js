// ----------------------------------------------------------
// Global Variables
// ----------------------------------------------------------
let x = 1;
let y = 2;
let str = '';
console.log(typeof(str));

let display;
const buttons = [];
const operations = {
    add: 'add',
    subtract: 'subtract',
    multiply: 'multiply',
    divide: 'divide',
}
// ----------------------------------------------------------
// Constructor
// ----------------------------------------------------------
class Button {
    constructor (name, value) {
        this.name = name;
        this.value = value;
        this.node;
    }
    initialize() {
        this.node = document.createElement('button');
        document.body.appendChild(this.node);
        this.node.setAttribute('id', `${this.name}`);
        this.node.setAttribute('class', `btn`);
        this.node.textContent = `${this.value}`;
    }
    addEvent() {
        this.node.addEventListener('click', () => console.log(`button ${this.value} clicked`));
    }
    update() {console.log('updated')}
}

// ----------------------------------------------------------
// Adding DOM Elements
// ----------------------------------------------------------
const addingDOM = (() => {
    // add display
    (() => {
        display = document.createElement('textarea');
        document.body.appendChild(display);
    })();

    // add buttons
    (() => {
        for (let i = 1; i <= 10; i++) {
            let tmp;
            if (i == 10) tmp = new Button('btn0', 0);
            else tmp = new Button(`btn${i}`, i);
            tmp.initialize();
            tmp.addEvent();
            buttons.push(tmp);
        }
        console.table(buttons);
    })();
})();


// console.log(calculate(1,2,operations.add));
function calculate(num1, num2, operation) {
    switch (operation) {
        case(operations.add): return num1 + num2;
        case(operations.subtract): return num1 - num2;
        case(operations.multiply): return num1 * num2;
        case(operations.divide): return num1 / num2;
    }
}


// ----------------------------------------------------------
// Summing all numbers
// ----------------------------------------------------------
// function sum() {
//     let total = null;
//     for (let i = 0; i < arguments.length; i++) {
//         total += arguments[i];
//     }
//     return total;
// }