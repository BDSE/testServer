class ElementObserver {
    constructor(element) {
        this.element = document.getElementById(element);
    }

    update(model){
        this.element.innerHTML = model.number;
        this.element.style.backgroundColor = model.color;
    }
}

export default ElementObserver;