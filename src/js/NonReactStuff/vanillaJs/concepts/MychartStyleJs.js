var Main = {};

(function(){

    var modelId = 1; //Private property

    var Model = function $Mymodel$class(){

        this.instanceProperty = 2;

        this.ModelId = ++modelId;

        this.instanceProperty2 = this.prototypeProperty2;

    };

    var prototype = {

        ModelId : null,

        prototypeProperty: null,

        prototypeProperty2: 'amar',

        setPrototypeProperty: function(val){
            this.prototypeProperty = val;
        },

        getPrototypeProperty: function(){
            return this.prototypeProperty;
        }

    };

    Model.prototype = prototype;
    Model.staticProperty = function(){
        console.log("static method");
    }; //Public static method

    Main.Model = Model;

})();

var inst_1 = new Main.Model();

var inst_2 = new Main.Model();

console.log(inst_1);

console.log(inst_2);

inst_2.setPrototypeProperty(23224);

console.log(inst_1.prototypeProperty);

console.log(inst_2.prototypeProperty);
