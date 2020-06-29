class HistoryObserver {
    constructor() {
        this.historyLastFive = [];
    }

    update(model, newColor) {
        if (newColor) {
            this.historyLastFive.unshift(model.colorHistory[model.currentNumber - 1]);
        }
        if (this.historyLastFive.length > 5) {
            this.historyLastFive.pop();
        }
        console.log("Last five colors are: " + this.historyLastFive.join("|"));
        console.log("All history : " + model.colorHistory.join("|"));
    }
}

export default HistoryObserver;