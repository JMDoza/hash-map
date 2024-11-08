import { doublyLinkedList } from "./doublylinkedlist.js";

function HashMap(capacity) {
  const LOADFACTOR = 0.75;
  let buckets = [];
  let numOfEntries = 0;

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
    if (numOfEntries >= LOADFACTOR * capacity) {
      increaseBuckets();
    }

    const hashCode = hash(key);

    let index = buckets[hashCode].find(key);
    if (index === null) {
      numOfEntries++;
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
      numOfEntries--;
      buckets[hashCode].removeAt(index);
      return true;
    }
    return false;
  };

  const length = () => {
    return numOfEntries;
  };

  const clear = () => {
    numOfEntries = 0;
    buckets = [];
    populateBuckets(capacity);
  };

  const keys = () => {
    let keyArray = [];
    for (let i = 0; i < capacity; i++) {
      const list = buckets[i];
      const listKeys = list.getKeys();
      if (listKeys.length > 0) {
        for (const key of listKeys) {
          keyArray.push(key);
        }
      }
    }
    return keyArray;
  };

  const values = () => {
    let valueArray = [];
    for (let i = 0; i < capacity; i++) {
      const list = buckets[i];
      const listValues = list.getValues();
      if (listValues.length > 0) {
        for (const key of listValues) {
          valueArray.push(key);
        }
      }
    }
    return valueArray;
  };

  const entries = () => {
    let entriesArray = [];
    for (let i = 0; i < capacity; i++) {
      const list = buckets[i];
      const listEntries = list.getEntries();
      if (listEntries.length > 0) {
        // for (const key of listEntries) {
        //   entriesArray.push(key);
        // }
        entriesArray.push(listEntries);
      }
    }
    return entriesArray;
  };

  const increaseBuckets = () => {
    const hashMapData = entries();
    capacity *= 2;
    clear();

    hashMapData.forEach((bucket) => {
      bucket.forEach((entry) => {
        set(entry[0], entry[1]);
      });
    });
  };

  return {
    buckets,
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
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
console.log(test.length());

test.set("modasdon", "silver");
