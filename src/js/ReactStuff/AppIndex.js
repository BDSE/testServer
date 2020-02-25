import React, { Component } from 'react';

import IndexComponentUIExamples from "./components/UIExamples/IndexComponentUIExamples";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="container-hdr">UI-Examples Components</div>
                    <IndexComponentUIExamples />
                </div>
            </div>
        );
    }
}