class Calculator{
    constructor(previousOperandTextElement, currrentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currrentOperandTextElement = currrentOperandTextElement;
        this.clear()
    }
    clear(){
        this.currrentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    delete(){
        this.currrentOperand = this.currrentOperand.toString().slice(0,-1)
    }
    appendNumber(number){
        if(number == '.' && this.currrentOperand.includes('.'))return
        this.currrentOperand = this.currrentOperand.toString() +
        number.toString()
    }
    chooseOperation(operation){
        if(this.currrentOperand==='')return
        if(this.previousOperand!==''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand=this.currrentOperand
        this.currrentOperand=''
    }
    compute(){
        let computation
        let prev = parseFloat(this.previousOperand)
        let cur = parseFloat(this.currrentOperand)
        if(isNaN(prev)||isNaN(cur))return
        switch(this.operation){
            case '+':
                 computation = prev+cur
                 break
            case '-':
                 computation = prev-cur
                 break
            case '*':
                 computation = prev*cur
                 break
            case '/':
                    computation = prev/cur
                    break
            default:
                return
        }
        this.currrentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    getDisplayNumber(number){
        const srtingNumber = number.toString()
        const integerDigits = parseFloat(srtingNumber.split('.')[0])
        const decimalDigits = srtingNumber.split('.')[1] 
        let integerDisplay 
        if(isNaN(integerDigits)){
        integerDisplay = ''    
        }else{
            integerDisplay = integerDigits.toLocaleString('en',{maximumFractionDigits: 0})
        }
        if(decimalDigits!=null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }
    }
    updateDisplay(){
        this.currrentOperandTextElement.innerText =
        this.getDisplayNumber(this.currrentOperand) 
        if(this.operation!=null){
            this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else{
            this.previousOperandTextElement.innerText = ''
        }
    }
}
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-allclear]');
const previousOperandTextElement = document.querySelector('[data-previous_operand]');
const currrentOperandTextElement = document.querySelector('[data-current_operand]');

const calculator = new Calculator(previousOperandTextElement, currrentOperandTextElement)

numberButtons.forEach(button=>{
    button.addEventListener('click',()=> {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
    })
})
operationButtons.forEach(button=>{
    button.addEventListener('click',()=> {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
    })
})
equalsButton.addEventListener('click',button=>{
    calculator.compute()
    calculator.updateDisplay()
})
allClearButton.addEventListener('click',button=>{
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click',button=>{
    calculator.delete()
    calculator.updateDisplay()
})