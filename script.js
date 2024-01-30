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
        this.node.addEventListener('click', () => {
            if (!operatorClicked) {
                if (display.textContent == 0) display.textContent = `${this.value}`;
                else display.textContent += `${this.value}`;
            } else {
                operatorClicked = false;
                display.textContent = '';
                display.textContent += `${this.value}`;
            }
        });
    }
    // update() {console.log('updated')}
}
let a = '100'
a.slice(0, a.length -1)
console.log(a.slice(0, a.length -1))

// ----------------------------------------------------------
// Global Variables
// ----------------------------------------------------------
let display;
let equalBtn, changeSignBtn, clearAllBtn, undoBtn;   
let currentOperator, userInput, total = null;
let operatorClicked = false;
const buttons = [];

const operations = {
    add: {
        value: 'add', sign: '+',
    },
    subtract: {
        value: 'subtract', sign: '-',
    },
    multiply: {
        value: 'multiply', sign: '*',
    },
    divide: {
        value: 'divide', sign: '/',
    },
}

// ----------------------------------------------------------
// Adding DOM Elements
// ----------------------------------------------------------
const addDOM = (() => {
    // add display
    display = document.createElement('div');
    document.body.appendChild(display);
    display.style.height = '2rem';
    display.textContent = 0;

    // add clear all button
    clearAllBtn = document.createElement('button');
    document.body.appendChild(clearAllBtn);
    clearAllBtn.textContent = 'C';
    clearAllBtn.setAttribute('class', 'btn');
    clearAllBtn.setAttribute('id', 'cBtn');

    // add undo button
    undoBtn = document.createElement('button');
    document.body.appendChild(undoBtn);
    undoBtn.textContent = 'CE';
    undoBtn.setAttribute('class', 'btn');
    undoBtn.setAttribute('id', 'cEBtn');

    // add buttons
    for (let i = 1; i <= 10; i++) {
        let tmp;
        if (i == 10) tmp = new Button('btn0', 0);
        else tmp = new Button(`btn${i}`, i);
        tmp.initialize();
        tmp.addEvent();
        buttons.push(tmp);
    }

    // add operation buttons
    for (const each in operations) {
        let entry = operations[each];
        let tmp = document.createElement('button');
        document.body.appendChild(tmp);
        tmp.setAttribute('id', entry.value);
        tmp.setAttribute('class', 'btn');
        tmp.textContent = entry.sign;
        entry.node = tmp;
    };

    // add equal button
    equalBtn = document.createElement('button');
    document.body.appendChild(equalBtn);
    equalBtn.setAttribute('id', 'equalbtn');
    equalBtn.setAttribute('class', 'btn');
    equalBtn.textContent = '=';

})();

// ----------------------------------------------------------
// Adding Event Handlers
// ----------------------------------------------------------
const addEvent = (() => {

    // operator buttons events
    for (let each in operations) {
        operations[each].node.addEventListener('click', () => {
            if (total == null) {
                // total = Math.round((Number(display.textContent)) * 100) / 100;
                total = Number(display.textContent);
                currentOperator = operations[each].value;
                operatorClicked = true;

            } else {
                console.log(operations[each].value);
                if (currentOperator == null) currentOperator = operations[each].value;
                // userInput = Math.round((Number(display.textContent)) * 100) / 100;
                userInput = Number(display.textContent);
                if (!operatorClicked) calculate(userInput, currentOperator);
                currentOperator = operations[each].value;
                operatorClicked = true;
            }
            display.textContent = total;
        });
    }

    // clear-all button events
    clearAllBtn.addEventListener('click', () => {
        userInput = null;
        currentOperator = null;
        total = null;
        operatorClicked = false;
        display.textContent = '0';
    })

    // undo button events
    undoBtn.addEventListener('click', () => {
        let text = display.textContent;
        if (text == 0);
        else {

            // todo
            (text / 10 <= 1 && text.length == 1) ? display.textContent = '0' : display.textContent = text.slice(0, text.length - 1);
        }
    })
})();


// console.log(calculate(1,2,operations.add));
function calculate(num1, operation) {
    switch (operation) {
        case(operations.add.value): 
        total += num1;
        break;
        case(operations.subtract.value): 
        total -= num1;
        break;
        case(operations.multiply.value): 
        total *= num1;
        total = Math.round(total * 1000) / 1000;
        break;
        case(operations.divide.value): 
        total /= num1;
        total = Math.round(total * 1000) / 1000;
        break;
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



// bugs
// 2/2 AT THE START IS BUGGING // solved
// infinity when divided by 2
// floating precision // solved

// todo
// = functionality
// +/- functionality
// check ce functionality when floating points are added