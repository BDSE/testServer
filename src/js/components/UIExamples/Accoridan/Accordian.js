import React, { Component } from 'react';

class Accordion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accordions: [
                {
                    hdr: 'Section1 Test',
                    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut'
                },
                {
                    hdr: 'Section2',
                    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut'
                },
                {
                    hdr: 'Section3',
                    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut'
                }
            ]
        };
    }
    toggle(data, e){
        console.log(`Tab clicked: ${data}`);
        let target = e.target;
        target.classList.toggle("active");
        let panel = target.nextElementSibling;
        if (panel.style.maxHeight){
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    }
    render() {
        const tabs = this.state.accordions;
        return (
            <div id="accordion">
                {tabs.map(tab =>
                    <div>
                        <button className="accordion" onClick={this.toggle.bind(this, tab.hdr)}>{tab.hdr}</button>
                        <div className="panel">
                            <p>{tab.body}</p>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
export default Accordion;