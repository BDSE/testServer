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
        getHeader: function(){
          return this.headNode;
        },
        reverse: function () {
            var prev1, prev2, curentNode = this.headNode;
            while(curentNode){
                if(prev1 && prev2){
                    prev1.setNextNode(prev2);
                }else if(prev1){
                    this.lastNode = prev1;
                    prev1.setNextNode(null);
                }

                if(!curentNode.getNextNode()){
                    //last node
                    curentNode.setNextNode(prev1);
                    this.headNode = curentNode;
                    curentNode = null; //terminate the loop
                }else{
                    prev2 = prev1;
                    prev1 = curentNode;
                    curentNode = curentNode.getNextNode();
                }
            }
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
