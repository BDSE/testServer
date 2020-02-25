import Model from './ModelClass';
import ElementObserver from './ElementObserver';
import ConsoleLogObserver from './ConsoleLogObserver';
import HistoryObserver from "./HistoryObserver";

let model = new Model();
let elementObserver = new ElementObserver('observablesPatternElement');
let consoleObserver = new ConsoleLogObserver();
let historyObserver = new HistoryObserver();

model.addObserver(elementObserver);
model.addObserver(consoleObserver);
model.addObserver(historyObserver);

const increaseButton = document.getElementById('increaseObservablesCounterButton');

let increment = model.increment.bind(model);

increaseButton.addEventListener('click', increment);