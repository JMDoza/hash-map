function doublyLinkedList() {
  let listSize = 0;
  let head = null;
  let tail = null;

  const listNode = (key, value) => {
    return {
      key,
      value,
      nextNode: null,
      prevNode: null,
    };
  };

  const append = (key, value) => {
    let newNode = listNode(key, value);
    listSize++;

    if (head === null) {
      head = newNode;
    }

    if (tail !== null) {
      newNode.prevNode = tail;
      tail.nextNode = newNode;
    }

    tail = newNode;
  };

  const prepend = (key, value) => {
    let newNode = listNode(key, value);
    listSize++;

    if (tail === null) {
      tail = newNode;
    }

    if (head !== null) {
      newNode.nextNode = head;
      head.prevNode = newNode;
    }

    head = newNode;
  };

  const size = () => {
    return listSize;
  };

  const getHead = () => {
    return head;
  };

  const getTail = () => {
    return tail;
  };

  const at = (index) => {
    if (validIndex()) {
      console.log("Index out of bounds");
      return null;
    }

    let pointer = 0;
    let current = null;

    if (index < listSize / 2) {
      current = head;
      while (pointer < index) {
        current = current.nextNode;
        pointer++;
      }
    } else {
      pointer = listSize - 1;
      current = tail;
      while (pointer > index) {
        current = current.prevNode;
        pointer--;
      }
    }

    return current;
  };

  const pop = () => {
    const temp = tail;
    tail = temp.prevNode;
    tail.nextNode = null;
    temp.prevNode = null;
    listSize--;

    return temp;
  };

  const dequeue = () => {
    const temp = head;
    head = temp.nextNode;
    head.prevNode = null;
    temp.nextNode = null;
    listSize--;

    return temp;
  };

  const insertAt = (key, value, index) => {
    if (validIndex()) {
      console.log("Index out of bounds");
      return;
    }

    if (index <= 0) {
      prepend(key, value);
      return;
    } else if (index > size() - 1) {
      append(key, value);
      return;
    }

    listSize++;
    const current = at(index);
    newNode = listNode(key, value);

    prevNode = current.prevNode;
    newNode.nextNode = current;
    newNode.prevNode = prevNode;
    current.prevNode = newNode;
    prevNode.nextNode = newNode;
  };

  const removeAt = (index) => {
    if (validIndex()) {
      console.log("Index out of bounds");
      return;
    }

    if (index <= 0) {
      dequeue();
      return;
    } else if (index >= size() - 1) {
      pop();
      return;
    }

    listSize--;

    const current = at(index);

    prevNode = current.prevNode;
    nextNode = current.nextNode;
    prevNode.nextNode = nextNode;
    nextNode.prevNode = prevNode;
    current.nextNode = null;
    current.prevNode = null;
  };

  const replaceAt = (key, value, index) => {
    if (validIndex()) {
      console.log("Index out of bounds");
      return;
    }
    console.log(toString("head"));

    removeAt(index);
    console.log(toString("head"));

    insertAt(key, value, index);
    console.log(toString("head"));
  };

  const contains = (key) => {
    let current = head;
    while (current !== null) {
      if (current.key == key) {
        return true;
      }
      current = current.nextNode;
    }

    return false;
  };

  const find = (key) => {
    let pointer = 0;
    let current = head;
    while (current !== null) {
      if (current.key == key) {
        return pointer;
      }
      current = current.nextNode;
      pointer++;
    }

    return null;
  };

  const toString = (from) => {
    let string = "";
    let current = null;
    if (from === "head") {
      current = head;
      while (current != null) {
        string += `(${current.key}, ${current.value}) -> `;
        current = current.nextNode;
      }
    } else if (from === "tail") {
      current = tail;
      while (current != null) {
        string += `(${current.key}, ${current.value}) -> `;
        current = current.prevNode;
      }
    } else {
      return "Invalid Direction!";
    }
    return string + `${current ? current.value : null}`;
  };

  const getKeys = () => {
    let keyArray = [];
    let current = head;
    while (current !== null) {
      current = current.nextNode;
      keyArray.push(current.key);
    }
    return keyArray;
  };

  const validIndex = (index) => {
    return size() === 0 || index < 0 || index > size();
  };

  return {
    append,
    prepend,
    size,
    getHead,
    getTail,
    at,
    pop,
    dequeue,
    insertAt,
    removeAt,
    replaceAt,
    contains,
    find,
    toString,
    getKeys,
  };
}

export { doublyLinkedList };

// const list = new doublyLinkedList();

// list.append("0", "dog");
// list.append("1", "cat");
// list.append("2", "parrot");
// list.append("3", "hamster");
// list.append("4", "snake");
// list.append("5", "turtle");

// console.log(list.toString("head"));

// console.log(list.at(6));
