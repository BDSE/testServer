class Model {
    constructor(){
        this.oberverList = [];
        this.number = 0;
        this.color = "red";
    }

    notify(){
        let observer;
        for(let i = 0; i < this.oberverList.length; i++){
            observer = this.oberverList[i];
            observer.update(this);
        }
    }

    increment(){
        let colors = ["orange", "blue", "cyan", "green", "red", "black", "yellow", "pink", "grey"];

        this.number++;

        this.color = colors[Math.floor(Math.random() * colors.length)];

        this.notify();
    }

    addObserver(o){
        this.oberverList.push(o);
    }
}

export default Model;
