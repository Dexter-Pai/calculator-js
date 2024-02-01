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
            if (!percentClicked) {
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
            }
        });
    }
}

// ----------------------------------------------------------
// Global Variables
// ----------------------------------------------------------
let display;
let equalBtn, changeSignBtn, clearAllBtn, undoBtn, decimalBtn, percentBtn;   
let currentOperator, userInput, total = null;
let operatorClicked = false;
let equalClicked = false;
let decimalClicked = false;
let percentClicked = false;

const buttons = [];

const operations = {
    // percent: {
    //     value: 'percent', sign: '%',
    // },
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
    function makeElement(idName = '', className = 'btn', textContent = '', elementType = 'button', parentNode = document.body) {
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

    // add percent button
    percentBtn = makeElement('percent', 'btn', '%');

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
            percentClicked = false;

            let text = getDisplayText();
            if (text.includes('%'));

            if (total == null) {
                total = text;
                currentOperator = operations[each].value;
                operatorClicked = true;

            } else {
                console.log(operations[each].value);
                if (currentOperator == null) currentOperator = operations[each].value;
                userInput = text;
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
        let text = getDisplayText();

        // handling percent sign
        if (display.textContent.charCodeAt(text.length - 1) == 37){
            percentClicked = false;
            display.textContent = display.textContent.replace('%', '');
        }
        else{
            if (text == 0);
            else if (text / 10 <= 1 && text.length == 1) {
                display.textContent = '0';
                operatorClicked = false;
                equalClicked = false;
            } else {
                display.textContent = text.slice(0, text.length - 1);
                operatorClicked = false;
                equalClicked = false;
            } 
        }
    })

    // equal button event
    equalBtn.addEventListener('click', () => {
        decimalClicked = false;
        percentClicked = false;

        let text = getDisplayText();

        if (total === null) {
            total = text;
        }
        userInput = text;
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
        if (operatorClicked) ;
        else {
            if (!decimalClicked) {
                display.textContent += '.';
            decimalClicked = true;
        }
        equalClicked = false;
        }
    })

    // percent button event
    percentBtn.addEventListener('click', () => {
        if (!percentClicked) display.textContent += '%';
        percentClicked = true;

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

// function for getting display text
function getDisplayText(format = 'string') {
    let text = display.textContent;
    if (text.includes('%')) text = convertPercentToNumber(text);
    if (format == 'string')  return String(text);
    if (format == 'number') return text;
}

// convert percent to decimal number
function convertPercentToNumber(string) {
    string = string.replace('%','');    
    return Math.round((Number(string) / 100)* 1000) / 1000;
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
// if user input 0.1, 0. works fine, 1 is like a new number for some reason. // solved
// 9. = 9 and then press . and it won't add point but point button is already clicked // solved
// 0.9 = 0.9 and then press . 0.9. // solved
// equal clicked on 0.9 and using CE will undo to 0. but totally resets when you input again // solved
// 0.0 = 0, . and then if you add 9, the 0. disappears // solved
// 0.09 + and when you click . , 0.09. // solved
// deleting each character 0.03 CE => 0.0 and you cannot CE anymore

// todo
// ----------------------------------------------------------
// = functionality
// +/- functionality
// check ce functionality when floating points are added
// changing number of decimal points to calculate
// deleting each character in a float point