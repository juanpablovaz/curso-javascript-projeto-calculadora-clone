class CalcController {

    constructor() {

        this._audio = new Audio('click.mp3');
        this._audioonOff = false;

        this._lastOperator = '';
        this._lastNumber = '';

        this._operation = [];
        this._locale = 'pt-BR'
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
        this.initKeyBoard();
    }

    copyToClipBoard() {
        let input = document.createElement('input');


        input.value = this, this.displayCalc();

        document.body.appendChild(input);

        input.select();

        document.execCommand("Copy");

        input.remove();

    }

    pasteFromClipBoard() {

        document.addEventListener('paste', e => {

            let text = e.clipboardData.getData('text');


            if (isNaN(text)) {
                //String
                this.displayCalc = '0';

            } else {

                this.displayCalc = parseFloat(text);

            }
        
    })
}

initialize() {
    this.setDisplayDateTime(); //chama o método

    //O setinterval é um recurso faz com que "isso" execute em um determinado tempo

    setInterval(() => {
        this.setDisplayDateTime();   //chama o método
    }, 1000);

    this.setLastNumberToDisplay();

    //////////////////////////////////////////////////////////////////////////////////////////
    // O timeOut serve para apresentarmos algo em um determinado tempo. Nesse exemplo, eu consigo fazer com que a contagem de segundos pare após 10 segundos do seu inicio.

    // setTimeout(()=>{

    //     clearInterval(interval);

    // } , 10000)
    //////////////////////////////////////////////////////////////////////////////////////////


    this.pasteFromClipBoard();


    // duplo clique 

    document.querySelectorAll('.btn-ac').forEach (btn=>{
        
        btn.addEventListener('dblclick' , e=>{
            this.toggleAudio();
        })
    })
}

toggleAudio(){
    
    this._audioonOff = !this._audioonOff;

    // SEGUNDA FORMA
    // this._audioonOff = (this._audioonOff) ? false : true;

    //PRIMEIRA FORMA DE FAZER UM IF BOOLEANO
    // if (this._audioonOff){
    //     this._audioonOff = false;
    // }else {
    //     this._audioonOff = true
    // }

}

playAudio(){

    if (this._audioonOff){

        this._audio.currentTime = 0;
        this._audio.play();
    }else{

    }
}

initKeyBoard() {

    document.addEventListener('keyup', e => {

        this.playAudio();

        switch (e.key) {
            case 'Escape':
                this.clearAll();
                break;

            case 'Backspace':
                this.clearEntry();
                break;

            case '+':
            case '-':
            case '*':
            case '/':
            case '%':
                this.addOperation(e.key);
                break;
            case 'Enter':
            case '=':
                this.calc();

                break;

            case '.':
            case ',':
                this.addDot();
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(e.key));
                break;

            case 'c':
                if (e.ctrlkey) this.copyToClipBoard();
                break;
        }
    });

}


addEventListenerAll(element, events, fn) {

    events.split(' ').forEach(event => {
        element.addEventListener(event, fn, false);
    })

}

clearAll() {
    this._operation = [];
    this._lastNumber = '';
    this._lastOperator = '';

    this.setLastNumberToDisplay();

}
clearEntry() {
    this._operation.pop();

    this.setLastNumberToDisplay();
}

getLastOperation() {

    return this._operation[this._operation.length - 1];
}

setLastOperation(value) {

    this._operation[this._operation.length - 1] = value;

}

isOperator(value) {

    return (['+', '-', '%', '*', '/'].indexOf(value) > -1); //(['+', '-', '%', '*', '/'].indexOf 
    //Esse metodo busca o valor no metodo de array criado. Se achar ele tras o index que vai de 0 à 4. Se não encontrar, ele retorna -1
}


getResult() {
    try {
        
        return eval(this._operation.join(""));

    } catch (e) {
        setTimeout(() => {
            this.setError();
        }, 1);
        
    }

    
}

calc() {
    let last = '';

    this._lastOperator = this.getLastItem();

    if (this._operation.length < 3) {

        let firstItem = this._operation[0];
        this._operation = [firstItem, this._lastOperator, this._lastNumber,];
    }

    if (this._operation.length > 3) {

        last = this._operation.pop();
        this._lastNumber = this.getResult();

    } else if (this._operation.length == 3) {

        this._lastNumber = this.getLastItem(false);

    }

    let result = this.getResult();

    if (last == '%') {
        result /= 100

        this._operation = [result];
    } else {

        this._operation = [result];

        if (last) this._operation.push(last);
    }



    this.setLastNumberToDisplay();

}

pushOperation(value) {

    this._operation.push(value);

    if (this._operation.length > 3) {

        this.calc();
    }

}


getLastItem(isOperator = true) {

    let lastItem;

    for (let i = this._operation.length - 1; i >= 0; i--) {


        if (this.isOperator(this._operation[i]) == isOperator) {

            lastItem = this._operation[i];
            break;

        }

    }

    if (!lastItem) {
        lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
    }

    return lastItem;

}

setLastNumberToDisplay() {

    let lastNumber = this.getLastItem(false);

    if (!lastNumber) lastNumber = 0;

    this.displayCalc = lastNumber;

}


addOperation(value) {

    if (isNaN(this.getLastOperation())) {
        //String
        if (this.isOperator(value)) {
            //trocar o operador

            this.setLastOperation(value);

        } else {

            this.pushOperation(value);

            this.setLastNumberToDisplay();

        }


    } else {
        //number

        if (this.isOperator(value)) {

            this.pushOperation(value);

        } else {

            let newValue = this.getLastOperation().toString() + value.toString();
            this.setLastOperation(newValue);

            this.setLastNumberToDisplay();

        }


    }

}


setError() {
    this.displayCalc = "Error";
}

addDot() {

    let lastOperation = this.getLastOperation();

    if (typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;

    if (this.isOperator(lastOperation) || !lastOperation) {
        this.pushOperation('0.');
    } else {
        this.setLastOperation(lastOperation.toString() + '.');
    }
    this.setLastNumberToDisplay();
}

execBtn(value) {

    this.playAudio();

    switch (value) {
        case 'ac':
            this.clearAll();
            break;

        case 'ce':
            this.clearEntry();
            break;

        case 'soma':
            this.addOperation('+');
            break;

        case 'subtracao':
            this.addOperation('-');
            break;

        case 'multiplicacao':
            this.addOperation('*');
            break;

        case 'divisao':
            this.addOperation('/');
            break;

        case 'porcento':
            this.addOperation('%');
            break;

        case 'igual':
            this.calc();

            break;

        case 'ponto':
            this.addDot();
            break;

        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            this.addOperation(parseInt(value));
            break;

        default:
            this.setError();
            break;

    }
}



initButtonsEvents() {

    //querySelector - Retorna apenas um
    //querSelector - Retorna todos

    let buttons = document.querySelectorAll("#buttons > g, #parts > g");

    buttons.forEach((btn, index) => {

        this.addEventListenerAll(btn, "click drag", e => {

            let textBtn = btn.className.baseVal.replace("btn-", "");

            this.execBtn(textBtn);

        });

        this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
            btn.style.cursor = "pointer";
        })

    });

}

setDisplayDateTime() {
    this.displayDate = this._currentDate.toLocaleDateString(this._locale, {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
    this.displayTime = this._currentDate.toLocaleTimeString(this._locale);
}


    get displayCalc() {
    return this._displayCalcEl.innerHTML;
}

    set displayCalc(value) {

    if (value.toString().length > 10){
        this.setError();
        return false;
    }
    
    return this._displayCalcEl.innerHTML = value;
}

    get displayDate() {
    return this._dateEl.innerHTML;
}

    set displayDate(value) {
    return this._dateEl.innerHTML = value;
}

    get displayTime() {
    return this._timeEl.innerHTML;
}

    set displayTime(value) {
    return this._timeEl.innerHTML = value;
}

    get _currentDate() {
    return new Date();
}

    set _currentDate(value) {
    return this._currentDate = value;
}
}