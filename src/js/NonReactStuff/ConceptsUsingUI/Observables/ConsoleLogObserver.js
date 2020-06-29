class ConsoleLogObserver {
    constructor() {
    }

    update(model) {
        console.log("Model updated, current number: " + model.currentNumber + ", current color: " + model.colorHistory[model.currentNumber - 1]);
    }
}

export default ConsoleLogObserver;