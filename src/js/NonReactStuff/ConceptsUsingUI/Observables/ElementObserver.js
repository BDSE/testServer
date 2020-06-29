class ElementObserver {
    constructor() {
        this.element = document.getElementById("observablesPatternElement");
        this.descElement = this.element.nextElementSibling;
    }

    update(model) {
        let currentNumber = model.currentNumber;
        let color = model.colorHistory[model.currentNumber - 1];

        this.element.innerHTML = currentNumber;
        this.element.style.backgroundColor = color;
        this.descElement.innerHTML = "Color: " + color + ", Highest index reached: " + model.colorHistory.length;
    }
}

export default ElementObserver;