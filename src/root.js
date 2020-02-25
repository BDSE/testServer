import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import IndexComponent from './js/ReactStuff/components/IndexComponent';

class Root extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={ this.props.store }>
                <IndexComponent/>
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root;