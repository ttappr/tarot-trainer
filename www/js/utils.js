'use strict';

/**
 * Returns the text from a file.
 * @param {string} src The URL of the file to read.
 * @returns {string} The text read in from the file.
 */
async function loadText(src) {
    let rsp = await fetch(src);

    if (rsp.status != 200) {
        throw new Error(`loadText() failed to fetch text content ` +
                        `from "${src}"; response status ${rsp.status}.`);
    }
    return await rsp.text();
}

/**
 * Returns persistent data stored by key.
 * @param {string} key The key of the data to retrieve.
 * @returns {Object} The deserialized object that was stored at the key.
 */
function getPData(key) {
    return JSON.parse(window.localStorage.getItem(key));
}

/**
 * Serializes an object to persistent storage that can be indexed by the key.
 * @param {string} key The key of the object to store.
 * @param {Object} obj The object to serialize to persistent storage.
 */
function setPData(key, obj) {
    window.localStorage.setItem(key, JSON.stringify(obj));
}

/**
 * Deletes the serialized object associated with the key from persistent 
 * storage.
 * @param {string} key The key of the object to delete.
 */
function delPData(key) {
    window.localStorage.removeItem(key);
}

/**
 * Clears persistent storage.
 */
function clearPData() {
    window.localStorage.clear();
}

/**
 * Produces an array of cummulative values from the array of numbers passed 
 * in.
 * @param {number[]} numbers An array of numbers to accumulate.
 * @returns {number[]} An array of accumulated values.
 */
function accumulate(numbers) {
    let accum = [];
    let total = 0;
    for (let n of numbers) {
        total = total + n;
        accum.push(total);
    }
    return accum;
}

/**
 * Randomly chooses one element from the population using the list of 
 * weights to determine the probability each item will be selected.
 * @param {Object[]} pop An array of objects (population) to choose from.
 * @param {number[]} wts An array containing each weight for each object.
 * @returns {Object} The selected member in the population.
 */
function wchoice(pop, wts) {
    let acm = accumulate(wts);
    let rnd = Math.random() * acm[acm.length - 1];
    let idx = acm.findIndex(elm => elm >= rnd);
    return pop[idx];
}