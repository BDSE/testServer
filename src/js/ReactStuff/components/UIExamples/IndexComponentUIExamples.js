import React, { Component } from 'react';
import Accordion from "./Accoridan/Accordian";
import ProgressSteps from "./ProgressSteps/ProgressSteps";


class IndexComponentUIExamples extends Component {
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
            <div>
                <div className="section">
                    <div className="section-hdr">Accordian</div>
                    <Accordion />
                </div>
                <div className="section">
                    <div className="section-hdr">Subway Steps</div>
                    <ProgressSteps steps={this.state.progressSteps} />
                </div>
            </div>
        );
    }
}

export default IndexComponentUIExamples;