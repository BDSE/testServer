import React, { Component } from 'react';

import Model from "./ModelClass";
import $ from "jquery";

class OberservablesPattern extends Component {
    constructor(props) {
       super(props);
    }
    componentDidMount(){
        const model = new Model;
        const {number, color} = model;
        const box = $("#box");
        box.html(number);
        box.css({'background-color': color});
    }
    changeBoxValues(){

    }
    increment(){

    }
    render() {
        return (
            <div id="observablesPttern">
               <div id="box" className="box"></div>
               <hr></hr>
               <button > Increment</button>
            </div>
        );
    }
}
export default OberservablesPattern;
