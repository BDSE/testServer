class Model {
    constructor(){
        this.oberverList = [];
        this.currentNumber = 1;
        this.colors = ["coral", "steelblue", "teal", "black", "indianred", "dodgerblue", "lightslategrey", "deeppink", "mediumorchid", "midnightblue", "tomato", "yellowgreen", "gold"];
        this.colorHistory = ["indianred"];
    }

    notify(newColor){
        let observer;
        for(let i = 0; i < this.oberverList.length; i++){
            observer = this.oberverList[i];
            observer.update(this, newColor);
        }
    }

    init(){
        this.notify(true);
    }

    increment(){
        let colors = this.colors,
            color, newColor;

        if (this.currentNumber === this.colorHistory.length){
            color = colors[Math.floor(Math.random() * colors.length)];
            this.colorHistory.push(color);
            newColor = true;
        }

        this.currentNumber++;

        this.notify(newColor);
    }

    decrement(){
        if (this.currentNumber > 1){
            --this.currentNumber;
            this.notify();
        }
    }

    addObserver(o){
        this.oberverList.push(o);
    }
}

export default Model;
