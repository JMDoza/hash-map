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

    const hashCode = hash(key);

    let index = buckets[hashCode].find(key);
    if (index === null) {
      entries++;
      buckets[hashCode].append(key, value);
    } else {
      buckets[hashCode].replaceAt(key, value, index);
    }
  };

  const get = (key) => {
    const hashCode = hash(key);

    let index = buckets[hashCode].find(key);
    if (index !== null) {
      return buckets[hashCode].at(index);
    }

    return null;
  };

  const has = (key) => {
    const hashCode = hash(key);
    return buckets[hashCode].contains(key);
  };

  const remove = (key) => {
    const hashCode = hash(key);
    const index = buckets[hashCode].find(key);
    if (index !== null) {
      entries--;
      buckets[hashCode].removeAt(index);
      return true;
    }
    return false;
  };

  const length = () => {
    return entries;
  };

  return {
    buckets,
    set,
    get,
    has,
    remove,
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

console.log(test.has("lion"));
console.log(test.remove("lion"));
console.log(test.has("lion"));
console.log(test.get("lion"));
