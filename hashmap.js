import { doublyLinkedList } from "./doublylinkedlist.js";

function HashMap(capacity) {
  const LOADFACTOR = 0.75;
  let buckets = [];
  let entries = 0;

  populateBuckets(capacity);
  function populateBuckets(capacity) {
    for (let i = 0; i < capacity; i++) {
      const newList = doublyLinkedList();
      buckets.push(newList);
    }
  }

  const hash = (key) => {
    let hashCode = 0;

    let primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  };

  const set = (key, value) => {
    if (entries > LOADFACTOR * capacity) {
      // increaseBuckets();
      console.log("INCREASE BUCKETS");
    }

    let hashCode = hash(key);

    let index = buckets[hashCode].find(key);
    if (index === null) {
      entries++;
      buckets[hashCode].append(key, value);
    } else {
      buckets[hashCode].replaceAt(key, value, index);
    }
  };

  const get = (key) => {
    let hashCode = hash(key);

    let node = buckets[hashCode].find(key);
    if (node !== null) {
      return buckets[hashCode].at(node);
    }

    return null;
  };

  const length = () => {
    return entries;
  };

  return {
    buckets,
    set,
    get,
    length,
  };
}

let test = HashMap(16);
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

// console.log(test.length());
// console.log(test.get("apple"));
// console.log(test.get("banana"));
// console.log(test.get("carrot"));
// console.log(test.get("dog"));
// console.log(test.get("elephant"));
// console.log(test.get("frog"));
// console.log(test.get("grape"));
// console.log(test.get("hat"));
// console.log(test.get("ice cream"));
// console.log(test.get("jacket"));
// console.log(test.get("kite"));
console.log(test.get("lion"));
test.set("lion", "UNCOLER");
console.log(test.get("lion"));
