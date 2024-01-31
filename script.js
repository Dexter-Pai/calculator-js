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
            if (equalClicked) {
                decimalClicked = false;
                display.textContent = '';
                equalClicked = false;
            }
            if (!operatorClicked) {
                if (display.textContent == 0 && !decimalClicked) display.textContent = `${this.value}`;
                else display.textContent += `${this.value}`;
            } else {
                operatorClicked = false;
                display.textContent = '';
                display.textContent += `${this.value}`;
            }
        });
    }
}

// ----------------------------------------------------------
// Global Variables
// ----------------------------------------------------------
let display;
let equalBtn, changeSignBtn, clearAllBtn, undoBtn, decimalBtn;   
let currentOperator, userInput, total = null;
let operatorClicked = false;
let equalClicked = false;
let decimalClicked = false;

const buttons = [];

const operations = {
    add: {
        value: 'add', sign: '+',
    },
    subtract: {
        value: 'subtract', sign: '-',
    },
    multiply: {
        value: 'multiply', sign: 'x',
    },
    divide: {
        value: 'divide', sign: '÷',
    },
}

// ----------------------------------------------------------
// Adding DOM Elements
// ----------------------------------------------------------
const addDOM = (() => {

    //template function for making elements and asigning values
    function makeElement(idName = '', className = '', textContent = '', elementType = 'button', parentNode = document.body) {
        let element = document.createElement(elementType);
        parentNode.appendChild(element);
        element.textContent = textContent;
        element.setAttribute('class', className);
        element.setAttribute('id', idName);
        return element;
    }
    // ------------------------------------------------------

    // add display
    display = makeElement(undefined, 'display', undefined, 'div');
    display.style.height = '2rem';
    display.textContent = 0;

    // add clear all button
    clearAllBtn = makeElement('cBtn', 'btn', 'C');

    // add undo button
    undoBtn = makeElement('cEBtn', 'btn', 'CE');

    // add change sign button
    changeSignBtn = makeElement('sign', 'btn', '+/-');

    // add buttons 1 to 0
    for (let i = 1; i <= 10; i++) {
        let tmp;
        if (i == 10) tmp = new Button('btn0', 0);
        else tmp = new Button(`btn${i}`, i);
        tmp.initialize();
        tmp.addEvent();
        buttons.push(tmp);
    }

    // add decimal button
    decimalBtn = makeElement('decimalBtn', 'btn', '.');

    // add operation buttons
    for (const each in operations) {
        let entry = operations[each];
        let tmp;
        tmp = makeElement(entry.value, undefined, entry.sign);
        entry.node = tmp;
    };

    // add equal button
    equalBtn = makeElement('equalbtn', undefined, '=')

})();

// ----------------------------------------------------------
// Adding Event Handlers
// ----------------------------------------------------------
const addEvent = (() => {

    // operator buttons events
    for (let each in operations) {
        operations[each].node.addEventListener('click', () => {
            decimalClicked = false;
            if (total == null) {
                total = Number(display.textContent);
                currentOperator = operations[each].value;
                operatorClicked = true;

            } else {
                console.log(operations[each].value);
                if (currentOperator == null) currentOperator = operations[each].value;
                userInput = Number(display.textContent);
                if (!operatorClicked) calculate(userInput, currentOperator);
                currentOperator = operations[each].value;
                operatorClicked = true;
            }
            display.textContent = total;
        });
    }

    // clear-all button event
    clearAllBtn.addEventListener('click', () => {
        userInput = null;
        currentOperator = null;
        total = null;
        operatorClicked = false;
        decimalClicked = false;
        display.textContent = '0';
    })

    // undo button event
    undoBtn.addEventListener('click', () => {
        let text = display.textContent;
        if (text == 0);
        // features to implement
        // text. include . == false and text. length == 1, display '0'
        // (text. include ('.') and text . length == 2), remove '.'
        else (text / 10 <= 1 && text.length == 1) ? display.textContent = '0' : display.textContent = text.slice(0, text.length - 1);
    })

    // equal button event
    equalBtn.addEventListener('click', () => {
        decimalClicked == false;
        if (total === null) {
            total = Number(display.textContent);
        }
        userInput = Number(display.textContent);
        calculate(userInput, currentOperator);
        display.textContent = total;

        equalClicked = true;
        operatorClicked = false;
        if (!total.toString().includes('.'))
            decimalClicked = false;
        total = null;
        currentOperator = null;
        userInput = null;
    })

    // change sign button event
    changeSignBtn.addEventListener('click', () => {
        if (display.textContent[0] === '-') display.textContent = display.textContent.replace('-', '');
        else if (!(display.textContent === '0')) {
            let tmp = [...display.textContent];
            tmp.unshift('-');
            display.textContent = tmp.join('');
        } ;
    })

    // decimal button event
    decimalBtn.addEventListener('click', () => {
        if (!decimalClicked) {
            display.textContent += '.';
        decimalClicked = true;
    }
    })
})();

// calculation handlers
function calculate(num1, operation) {
    if (num1[num1.length - 1] == '.') num1.replace('.', '');
    switch (operation) {
        case(operations.add.value): 
        total += num1;
        total = Math.round(total * 1000) / 1000;
        break;
        case(operations.subtract.value): 
        total -= num1;
        total = Math.round(total * 1000) / 1000;
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
// Summing all numbers from any number of arguements
// ----------------------------------------------------------
// function sum() {
//     let total = null;
//     for (let i = 0; i < arguments.length; i++) {
//         total += arguments[i];
//     }
//     return total;
// }



// issues
// ----------------------------------------------------------
// 2/2 AT THE START IS BUGGING // solved
// infinity when divided by 2
// floating precision // solved
// after equal pressed, the next input doesn't reset, it add to the  // solved
// after +- is pressed, if you press equal, it disappear // solved
// if user input 0.1, 0. works fine, 1 is like a new number for some reason.
// 9. = 9 and then press . and it won't add point but point button is already clicked // solved
// 0.9 = 0.9 and then press . 0.9. // solved
// equal clicked on 0.9 and using CE will undo to 0. but totally resets when you input again


// todo
// ----------------------------------------------------------
// = functionality
// +/- functionality
// check ce functionality when floating points are added
// changing number of decimal points to calculate
// deleting each character in a float point