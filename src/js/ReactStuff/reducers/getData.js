import $ from 'jquery';

import {
    REQUEST_DATA,
    RECEIVE_DATA,
    FINISH_RECEIVE_DATA,
    INVALID_DATA,
} from '../actions';

function getData(
    state = {
        isFetching: false
    }, action = {}
){
    switch (action.type) {
        case REQUEST_DATA:
            return $.extend({}, state, {
                clearDataAttribute: false,
                isFetching: true,
                invalidData: false
            });
        case RECEIVE_DATA:
            return $.extend({}, state, {
                clearDataAttribute: false,
                isFetching: false,
                invalidData: false,
                data: action.state.data,
                dataAttributeData: action.state.dataAttribute,
                lastUpdated: action.state.receivedAt
            });
        case FINISH_RECEIVE_DATA:
            return $.extend({}, state, {
                clearDataAttribute: false,
                isFetching: false,
                invalidData: false
            });
        case INVALID_DATA:
            return $.extend({}, state, {
                isFetching: false,
                invalidData: true
            });
        default:
            return state;
    }
}

export default getData;