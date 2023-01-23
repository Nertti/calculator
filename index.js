const calculator = {
    display: document.querySelector("#display"),
    keys: document.querySelector("#keys"),
    currentOperand: '',
    previousOperand: '',
    operator: '',
    colors: ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'brown', 'gray', 'black', 'white', 'silver', 'gold', 'maroon', 'navy', 'olive', 'teal', 'fuchsia', 'aquamarine', 'turquoise'],
    colorIndex: 0,
    changeColor() {
        const description = document.querySelector('.calculator-description');
        description.style.color = this.colors[this.colorIndex];
        this.colorIndex = (this.colorIndex + 1) % this.colors.length;
    },
    updateDisplay() {
        if (isNaN(this.currentOperand)) {
            this.display.style.color = 'red';
            this.display.value = 'Error';
        } else {
            this.display.style.color = '#9370db';
            this.display.value = this.currentOperand;
        }
    },
    updateEquals() {
        if (isNaN(this.currentOperand)) {
            this.display.style.color = 'red';
            this.display.value = 'Error';
        } else {
            this.display.style.color = '#333';
            this.display.value = this.currentOperand;
        }
    },
    addDecimal() {
        if (!this.currentOperand.includes('.')) {
            this.currentOperand += '.';
            this.updateDisplay();
        }
    },
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        this.updateDisplay();
    },
    inputNumber(number) {
        this.currentOperand = this.currentOperand + number;
        this.updateDisplay();
    },
    inputOperator(operator) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operator = operator;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    },
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operator) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operator = undefined;
        this.previousOperand = '';
        this.updateEquals();
    },
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operator = '';
        this.updateDisplay();
    },
    square() {
        this.currentOperand = Math.pow(this.currentOperand, 2).toString();
        this.updateDisplay();
    },
    squareRoot() {
        this.currentOperand = Math.sqrt(this.currentOperand).toString();
        this.updateDisplay();
    },
};

calculator.keys.addEventListener("click", event => {
    if (event.target.matches("button")) {
        calculator.changeColor();
        const key = event.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        if (!action) {
            if (isNaN(keyContent)) {
                calculator.inputOperator(keyContent);
            } else {
                calculator.inputNumber(keyContent);
            }
        }
        if (action === 'clear') {
            calculator.clear();
        }
        if (action === 'calculate') {
            calculator.compute();
        }
        if (action === 'square') {
            calculator.square();
        }
        if (action === 'squareRoot') {
            calculator.squareRoot();
        }
        if (action === 'delete') {
            calculator.delete();
        }
        if (action === 'addDecimal') {
            calculator.addDecimal();
        }
    }
});