import Node from './Node.js';
import LinkedList from './LinkedList.js';

const headerNode = Node({text:'firstNode'});
let myLinkedList1 = LinkedList(headerNode); //create the linked list

//add some nodes
for(var i =0; i <= 5; i++){
    myLinkedList1.addNode(Node({text: 'node_'+i}));
}

console.log(myLinkedList1.tostring());
console.log(myLinkedList1.len());

myLinkedList1.reverse();

console.log("reversed...",myLinkedList1.tostring());

myLinkedList1.reverse();

console.log("reversed...2",myLinkedList1.tostring());
myLinkedList1.reverse();

console.log("reversed...3",myLinkedList1.tostring());
