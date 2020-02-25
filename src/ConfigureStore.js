import {createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './js/ReactStuff/reducers';


const loggerMiddleware = createLogger();

export default function ConfigureStore(preloadedState) {
    return createStore(
        rootReducer,
        preloadedState,
        composeWithDevTools(
            applyMiddleware(
                thunkMiddleware,
                loggerMiddleware
            )
        )
    );
}