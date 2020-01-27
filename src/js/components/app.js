import React, {Component} from 'react';
import Accordion from "./UIExamples/Accoridan/Accordian";
import ProgressSteps from "./UIExamples/ProgressSteps/ProgressSteps";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progressSteps: [
                {
                    text: 'Step1',
                    isCurrent: false
                },
                {
                    text: 'Step2',
                    isCurrent: true
                },
                {
                    text: 'Step3',
                    isCurrent: false,
                    highestStep: true
                },
                {
                    text: 'Step4',
                    isCurrent: false
                },
                {
                    text: 'Step5',
                    isCurrent: false
                }
            ]
        };
    }

    render() {
        return (
            <div className="main">
                <div className="hdr">Main App Component</div>
                {/*<Accordion/>*/}
                <ProgressSteps steps={this.state.progressSteps}/>
            </div>
        );
    }
}