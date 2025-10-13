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
}
