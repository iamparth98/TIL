class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

/*
 * constructor, size, head, tail, isEmpty, addLast, addFirst, removeLast,
 * removeFirst, remove Element, indexOf, elementAt, addAt, removeAt, findMiddle, clean, get,
 * rotateListRight, reverse
 */
class Linkedlist {
  constructor(listOfValues) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    if (listOfValues instanceof Array) {
      for (const value of listOfValues) {
        this.addLast(value);
      }
    }
  }

  size() {
    return this.length;
  }
  headNode() {
    return this.headNode?.value ?? null;
  }
  tailNode() {
    return this.tailNode?.value ?? null;
  }
  isEmpty() {
    return this.length === 0;
  }

  addLast(value) {
    if (this.headNode === null) {
      this.addFirst(value);
    }
    const newNode = new Node(value);
    this.tailNode.next = newNode;
    this.tailNode = newNode;
    this.length++;

    return this.size();
  }
  addFirst(value) {
    const newNode = new Node(value);
    if (this.headNode === null) {
      this.tailNode = newNode;
    }
    newNode.next = this.headNode;
    this.headNode = newNode;
    this.length++;
    return this.size();
  }
}
