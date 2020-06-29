import $ from 'jquery';

import Model from './ModelClass';
import ElementObserver from './ElementObserver';
import ConsoleLogObserver from './ConsoleLogObserver';
import HistoryObserver from "./HistoryObserver";

let model = new Model();
let elementObserver = new ElementObserver();
let consoleObserver = new ConsoleLogObserver();
let historyObserver = new HistoryObserver();

model.addObserver(elementObserver);
model.addObserver(consoleObserver);
model.addObserver(historyObserver);

model.init();

const increaseButton = document.getElementById('increaseObservablesCounterButton');
const decreaseButton = document.getElementById('descreaseObservablesCounterButton');
const autoCounterButton = document.getElementById('autoCounterButton');

let increment = model.increment.bind(model);
let decrement = model.decrement.bind(model);

increaseButton.addEventListener('click', increment);
decreaseButton.addEventListener('click', decrement);

let intervalId;
const intervalFunction = function (interval) {
    intervalId = setTimeout(function () {
        $(increaseButton).trigger('click');
        intervalFunction(10000);
    }, interval);
};

autoCounterButton.addEventListener('click', function () {
    if (autoCounterButton.innerHTML === 'Start Auto'){
        intervalFunction(3000);
        autoCounterButton.innerHTML = 'Cancel Auto';
    }else{
        clearTimeout(intervalId);
        autoCounterButton.innerHTML = 'Start Auto';
    }
});