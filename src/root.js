import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import App from './js/ReactStuff/AppIndex';

class Root extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={ this.props.store }>
                <App/>
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root;