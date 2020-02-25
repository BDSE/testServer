class HistoryObserver {
    constructor() {
        this.history = [];
    }

    update(model){
        this.history.unshift(model.color);
        if(this.history.length > 5){
            this.history.pop();
        }
        console.log("Last five colors are: "+ this.history.join("*"));
    }
}

export default HistoryObserver;