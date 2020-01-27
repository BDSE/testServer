
const Node = (function () {
    var Node = function (data) {
        return new MyNode(data);
    };
    var MyNode = function(data){
        this.data = data;
    };

    MyNode.prototype = {
        getData: function () {
            return this.data && this.data.text ? this.data.text : this.data;
        },
        setData: function (data) {
            this.data = data;
        },
        getNextNode: function () {
            return this.nextNode;
        },
        setNextNode: function (node) {
            this.nextNode = node;
        },
        hasNext: function () {
            return !!(this.nextNode);
        }
    };

    MyNode.prototype.constructor = MyNode;

    return Node;
}());

export default Node;