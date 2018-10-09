import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';

import Root from './root';


//import test.js
import './js/Test.js';
//import SASS
import './scss/main.scss';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Root store ={createStoreWithMiddleware}/>
  , document.querySelector('.container'));
