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
                display.textContent += `${this.value}`;
            } else {
                operatorClicked = false;
                display.textContent = '';
                display.textContent += `${this.value}`;
            }
        });
    }
    update() {console.log('updated')}
}

// ----------------------------------------------------------
// Global Variables
// ----------------------------------------------------------
let display;
let equalBtn;   
let currentOperator, valueOne, valueTwo;
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
    display = document.createElement('textarea');
    document.body.appendChild(display);


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
        console.log(entry);
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
    for (each in operations) {
        operations[each].node.addEventListener('click', () => {
            console.log('clicked');
            currentOperator = operations[each].value;
            operatorClicked = true;
            valueOne = Number(display.textContent);
        });
    }
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