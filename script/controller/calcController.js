class CalcController {

    constructor() {

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


    addEventListenerAll(element, events, fn){

        events.split(' ').forEach(event =>{
            element.addEventListener(event, fn, false );
        })

    }



    initButtonsEvents() {

        //querySelector - Retorna apenas um
        //querSelector - Retorna todos

        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index) =>{

            this.addEventListenerAll(btn, 'click drag mouseover' , e =>{

                console.log(btn.className.baseVal.replace("btn-"," "));

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