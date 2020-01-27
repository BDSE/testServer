import React, {Component} from 'react';

class ProgressSteps extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stepWidth: 100 / this.props.steps.length,
            currentIndex: 0
        };
    }

    render() {
        const steps = this.props.steps;
        let highestIndex = 0;

        for (let i = 0; i < steps.length; i++) {
            if (steps[i].highestStep) {
                highestIndex = i;
            }
        }

        return (
            <div className="progress-steps container">
                <ul>
                    {steps.map((step, index) => {
                            return (
                                <li className={"step " + (index <= highestIndex ? 'visited ' : 'future ') + (step.isCurrent ? 'current' : '')} style={{width: `${this.state.stepWidth}%`}}>
                                    <div className="icon-div icon">

                                    </div>
                                    <div className="txt">{step.text}</div>
                                </li>
                            );
                        }
                    )}
                    <div className="clear"></div>
                </ul>
            </div>
        );
    }
}

export default ProgressSteps;