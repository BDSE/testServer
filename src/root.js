import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import IndexComponent from './js/components/IndexComponent';

const Root = (store) => {
    return (
        <Provider store={store}>
            <IndexComponent/>
        </Provider>
    );
};

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root;