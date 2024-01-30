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
let equalBtn, changeSignBtn, clearBtn, allClearBtn;   
let currentOperator, userInput
let total;
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

    // add clear button
    



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
    for (let each in operations) {
        operations[each].node.addEventListener('click', () => {
            if (total == undefined) {
                // total = Math.round((Number(display.textContent)) * 100) / 100;
                total = Number(display.textContent);
                currentOperator = operations[each].value;
                operatorClicked = true;

            } else {
                console.log(operations[each].value);
                if (currentOperator == undefined) currentOperator = operations[each].value;
                // userInput = Math.round((Number(display.textContent)) * 100) / 100;
                userInput = Number(display.textContent);
                if (!operatorClicked) calculate(userInput, currentOperator);
                currentOperator = operations[each].value;
                operatorClicked = true;
            }
            display.textContent = total;
        });
    }
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