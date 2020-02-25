import React from 'react';
import { render } from 'react-dom';

import ConfigureStore from './ConfigureStore';

import Root from './root';

//import SASS
import './scss/main_react.scss';

//const createStoreWithMiddleware = applyMiddleware()(createStore);
let store = ConfigureStore();

render(
    <Root store={ store } />,
    document.querySelector('#ReactContainer')
);
