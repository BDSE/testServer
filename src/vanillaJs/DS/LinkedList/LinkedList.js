//Linked list
const LinkedList = (function () {

    var CreateLinkedList = function (headNode) {
        return new LinkedList(headNode);
    };

    var LinkedList = function (headNode) {
        this.headNode = headNode;
        this.lastNode = headNode;
    };

    LinkedList.prototype = {
        addNode: function (node) {
            this.lastNode.setNextNode(node);
            this.lastNode = node;
        },
        getLastNode: function(){
            return this.lastNode;
        },
        len: function () {
            var len = 0,
                currentNode = this.headNode;
            while(currentNode){
                len++;
                currentNode = currentNode.getNextNode();
            }
            return len;
        },
        tostring: function () {
            var currentNode = this.headNode,
                resultStr = '{';
            while(currentNode){
                resultStr = resultStr + currentNode.getData() + (this.getLastNode() !== currentNode ? ' ==> ' : '');
                currentNode = currentNode.getNextNode();
            }
            resultStr += '}';
            return resultStr;
        }
    };

    return CreateLinkedList;
}());

export default LinkedList;
