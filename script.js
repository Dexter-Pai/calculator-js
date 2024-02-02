// ----------------------------------------------------------
// Constructor
// ----------------------------------------------------------
class Button {
    constructor (name, value, rowNoToAppend) {
        this.name = name;
        this.value = value;
        this.node;
        this.rowNoToAppend = rowNoToAppend;
    }
    initialize() {
        this.node = document.createElement('button');
        document.querySelector(`.row${this.rowNoToAppend}`).appendChild(this.node);
        this.node.setAttribute('class', `btn`);
        this.node.setAttribute('id', `${this.name}`);
        this.node.textContent = `${this.value}`;
    }
    addEvent() {
        this.node.addEventListener('click', () => {
            if (percentClicked) {
                percentClicked = false;
                operatorClicked = true;
                currentOperator = 'multiply';
                total = getDisplayText('number');
            }

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

// changing this value will change the decimal of the result (default 3: will calculate up to 0.001th place)
let decimalsInResult = 3; // maximum 15 (or it will truncate)
// if you want to just calculate in Int values, just put 0 in it. :)

let equalBtn, changeSignBtn, clearAllBtn, undoBtn, decimalBtn, percentBtn;   
let currentOperator, userInput, total = null;
let operatorClicked = false;
let equalClicked = false;
let decimalClicked = false;
let percentClicked = false;

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

const calculator = document.querySelector('.calculator');

// ----------------------------------------------------------
// Adding DOM Elements
// ----------------------------------------------------------
const addDOM = (() => {

    //template function for making elements and asigning values
    function makeElement(parentNode = calculator, idName = '', className = 'btn', 
    textContent = '', elementType = 'button') {
        let element = document.createElement(elementType);
        document.querySelector(`.${parentNode}`).appendChild(element);
        element.textContent = textContent;
        element.setAttribute('class', className);
        element.setAttribute('id', idName);
        return element;
    }
    // ------------------------------------------------------

    // add display
    display = makeElement('displayArea', undefined, 'display', undefined, 'div');
    display.style.height = '2rem';
    display.textContent = 0;

    // add clear all button
    clearAllBtn = makeElement('row1', 'cBtn', 'btn', 'C');

    // add undo button
    undoBtn = makeElement('row2', 'cEBtn', 'btn', 'CE');

    // add percent button
    percentBtn = makeElement('row3', 'percent', 'btn', '%');

    // add buttons 1 to 9
    for (let i = 9; i >= 1; i--) {
        let tmp;
        if (i == 1 || i == 4 || i == 7) tmp = new Button(`btn${i}`, i, 1);
        else if (i == 2 || i == 5 || i == 8) tmp = new Button(`btn${i}`, i, 2);
        else if (i == 3 || i == 6 || i == 9) tmp = new Button(`btn${i}`, i, 3);
        tmp.initialize();
        tmp.addEvent();
        buttons.push(tmp);
    }

    // add button 0
    let tmp = new Button('btn0', 0, 2);
    tmp.initialize();
    tmp.addEvent();
    buttons.push(tmp);

    // add change sign button
    changeSignBtn = makeElement('row1', 'sign', 'btn', '+/-');

    // add decimal button
    decimalBtn = makeElement('row3', 'decimalBtn', 'btn', '.');

    // add operation buttons
    for (const each in operations) {
        let entry = operations[each];
        let tmp;
        tmp = makeElement('row4', entry.value, undefined, entry.sign);
        entry.node = tmp;
    };

    // add equal button
    equalBtn = makeElement('row4', 'equalbtn', undefined, '=')

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
            if (percentClicked) {
                percentClicked = false;
            }

            if (total == null) {
                total = Number(text);
                currentOperator = operations[each].value;
                operatorClicked = true;
            } else {
                console.log(operations[each].value);
                if (currentOperator == null) currentOperator = operations[each].value;
                userInput = Number(text);
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
            total = Number(text);
        }
        userInput = Number(text);
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

// ----------------------------------------------------------
// Calculation Central, Beware of Changes :3
// ----------------------------------------------------------

// determining decimal for calculation
decimalsInResult = (() => {
    let value = 1;
    for(let i = 0; i < decimalsInResult; i++) {
        value *= 10;
    }
    return value;
})();


// main calculation handlers
function calculate(num1, operation) {
    if (num1[num1.length - 1] == '.') num1.replace('.', '');
    switch (operation) {
        case(operations.add.value): 
        total += num1;
        total = Math.round(total * decimalsInResult) / decimalsInResult;
        break;
        case(operations.subtract.value): 
        total -= num1;
        total = Math.round(total * decimalsInResult) / decimalsInResult;
        break;
        case(operations.multiply.value): 
        total *= num1;
        total = Math.round(total * decimalsInResult) / decimalsInResult;
        break;
        case(operations.divide.value): 
        total /= num1;
        total = Math.round(total * decimalsInResult) / decimalsInResult;
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
    return Math.round((Number(string) / 100)* decimalsInResult) / decimalsInResult;
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
// infinity when divided by 2 // solved
// floating precision // solved
// after equal pressed, the next input doesn't reset, it add to the  // solved
// after +- is pressed, if you press equal, it disappear // solved
// if user input 0.1, 0. works fine, 1 is like a new number for some reason. // solved
// 9. = 9 and then press . and it won't add point but point button is already clicked // solved
// 0.9 = 0.9 and then press . 0.9. // solved
// equal clicked on 0.9 and using CE will undo to 0. but totally resets when you input again // solved
// 0.0 = 0, . and then if you add 9, the 0. disappears // solved
// 0.09 + and when you click . , 0.09. // solved
// 3.009 + 0.001 = NaN; // solved // major bug :(
// deleting each character 0.03 CE => 0.0 and you cannot CE anymore

// todo
// ----------------------------------------------------------
// = functionality
// +/- functionality
// check ce functionality when floating points are added
// changing number of decimal points to calculate
// deleting each character in a float point