class ConsoleLogObserver {
    constructor() {
    }

    update(model){
        console.log("Model updated, new number: "+model.number+", new color: "+model.color);
    }
}

export default ConsoleLogObserver;