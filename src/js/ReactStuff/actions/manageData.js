import ApiCalls from "../services/ApiCalls";
//import Caching from "../services/Caching";

export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const FINISH_RECEIVE_DATA = 'FINISH_RECEIVE_DATA';
export const INVALID_DATA = 'INVALID_DATA';

function requestData (state){
    return {
        type: REQUEST_DATA,
        state
    };
}

function receiveData(state, response){
    state.data = response;
    state.receivedAt = Date.now();

    return {
        type: RECEIVE_DATA,
        state
    };
}

function finishReceiveData (state){
    return {
        type: FINISH_RECEIVE_DATA,
        state
    };
}

function invalidData (state){
    return {
        type: INVALID_DATA,
        state
    };
}

function getData (state, params){
    return dispatch => {
        if(state && state.dataAttribute && state.dataAttribute.length) {
            dispatch(requestData(state));

            let promises = [],
                dataAttributes = [],
                responses = {},
                hasError = false,
                key = "";

            state.dataAttribute.map((dataAttribute, index) => {
                if (typeof ApiCalls[dataAttribute] === 'function') {
                    // let param = params && params.length > index ? params[index] : {};
                    // key = param && param.key ? param[param.key] : false;
                    // promises.push(ApiCalls[dataAttribute](param).then(response => {
                    //     if (response && !response.error) {
                    //         if(key){
                    //             responses[dataAttribute] = {
                    //                 [key]: response
                    //             };
                    //             responses.dataParams = param;
                    //         }else {
                    //             responses[dataAttribute] = response;
                    //         }
                    //
                    //         dataAttributes.push(dataAttribute);
                    //         Caching.setData(dataAttribute, key, response);
                    //     } else {
                    //         hasError = true;
                    //         dispatch(invalidData(state));
                    //     }
                    // }));
                } else {
                    return Promise.resolve(state);
                }
            });

            return Promise.all(promises).then(function(){
                if(!hasError && Object.keys(responses).length){
                    responses.dataAttribute = dataAttributes;
                    dispatch(receiveData(state, responses));
                }
            });
        }else{
            return Promise.resolve(state);
        }
    };
}

function shouldFetchData (state, params, dispatch) {
   return ['data_a', 'data_b'];
}

export function fetchDataIfNeeded (state, params){
    return (dispatch) => {
        let dataAttributes = shouldFetchData(state, params, dispatch);
        if(dataAttributes && dataAttributes.length){
            return dispatch(getData({
                dataAttribute: dataAttributes
            }, params));
        }else{
            dispatch(finishReceiveData(state));
            return Promise.resolve(state);
        }
    };
}

export function forceFetchData (state, params){
    return (dispatch) => {
        return dispatch(getData(state, params));
    };
}