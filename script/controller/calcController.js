class CalcController {

    constructor() {

        this._operation = [];
        this._locale = 'pt-BR'
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._displayCalc;
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
    }

    initialize() {
        this.setDisplayDateTime(); //chama o método

        //O setinterval é um recurso faz com que "isso" execute em um determinado tempo

        setInterval(() => {
            this.setDisplayDateTime();   //chama o método
        }, 1000);

        //////////////////////////////////////////////////////////////////////////////////////////
        // O timeOut serve para apresentarmos algo em um determinado tempo. Nesse exemplo, eu consigo fazer com que a contagem de segundos pare após 10 segundos do seu inicio.

        // setTimeout(()=>{

        //     clearInterval(interval);

        // } , 10000)
        //////////////////////////////////////////////////////////////////////////////////////////

    }


    addEventListenerAll(element, events, fn) {

        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        })

    }

    clearAll() {
        this._operation = [];

    }
    clearEntry() {
        this._operation.pop();
    }

    getLastOperation() {
        return this._operation[this._operation.length - 1];
    }

    isOperator(value) {
        return (['+', '-', '%', '*', '/'].indexOf(value) > -1); //Esse metodo busca o valor no metodo. Se achar ele tras o index
    }

    addOperation(value) {

        console.log(this.getLastOperation())

        if (isNaN(this.getLastOperation())) {
            //String

            if (this.isOperator(value)) {
                //trocar o operador
                return this._operation[this._operation.length - 1] = value;


            } else {
                //outra coisa
                console.log(value)
            }


        } else {
            //number
            // Se o usuario digitar um numero e digitar outro, eu quero concatenar eles
            let newValue = this.getLastOperation() + value.toString();
            this._operation.push(newValue);

        }



        console.log(this._operation)
    }


    setError() {
        this.displayCalc = "Error"
    }

    execBtn(value) {
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

                break;

            case 'ponto':
                this.addOperation('.');
                break;

            case '0':
            case '1':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value))
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

            this.addEventListenerAll(btn, 'click drag mouseover', e => {

                let execBtn = btn.className.baseVal.replace("btn-", " ");

                this.execBtn(execBtn);

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