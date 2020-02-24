import React, { Component } from 'react';

import IndexComponentUIExamples from "./UIExamples/IndexComponentUIExamples";
import IndexComponentConceptsUsingUi from "./ConceptsUsingUI/IndexComponentConceptsUsingUi";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="main">
                <div className="hdr">Main App Component</div>
                {/* <IndexComponentUIExamples /> */}
                {/* <IndexComponentConceptsUsingUi /> */}
            </div>
        );
    }
}