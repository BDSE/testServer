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
        let currentIndex = 0;

        for (let i = 0; i < steps.length; i++) {
            if (steps[i].isCurrent) {
                currentIndex = i;
            }
        }

        return (
            <div className="progress-steps container">
                <ul>
                    {steps.map((step, index) => {
                            return (<li className={"step icon " + (index < currentIndex ? 'past' : index === currentIndex ? 'current' : 'future')}
                                style={{width: `${this.state.stepWidth}%`}}>{step.text}</li>);
                        }
                    )}
                    <div className="clear"></div>
                </ul>
            </div>
        );
    }
}

export default ProgressSteps;