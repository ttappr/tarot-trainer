"use strict";

/*
    wsample("abcd", [10, 20, 0, 80], 3);
    sample-other.js:57 d,r,r,u,u
    sample-other.js:57 d,l,l,u,u
    sample-other.js:57 d,l,r,u,u
    (3) ["d", "a", "b"]
 */
/*
        sampling.js:37 d,l,r,r,u,u,u,u,u
        sampling.js:37 d,l,r,r,u,u,u,u,u,u,u,u
        sampling.js:37 d,l,r,r,u,u,u,u,u,u,u,u,u
        sampling.js:37 d,l,l,r,r,u,u,u,u,u,u,u
        sampling.js:37 d,l,l,r
 */
/*
    sample-other.js:72 d,l,l,r,r,u,u,u,u
    sample-other.js:72 d,l,l,l,r,u,u,u,u
    sample-other.js:72 d,l,r,r,r,u,u,u,u
    sample-other.js:72 d,l,l,l,r,u,u,u,u
    sample-other.js:72 d,l,l,r,r,u,u,u,u
 */

var pop = [31, 47, 87, 79, 13, 24, 39, 54, 6, 94, 43, 74, 50, 97, 19, 46, 99, 23, 57, 75, 1, 33, 42, 81, 90, 78, 7, 58, 51, 45, 9, 91, 20, 21, 89, 49, 41, 98, 28, 72, 64, 66, 48, 69, 3, 92, 0, 11, 73, 59, 67, 77, 53, 16, 71, 14, 52, 4, 17, 70, 76, 8, 95, 18, 32, 12, 86, 29, 83, 37, 44, 80, 22, 35, 88, 25, 68, 10, 40, 30, 82, 84, 2, 56, 85, 5, 65, 26, 93, 38, 62, 27, 34, 55, 60, 96, 36, 15, 63, 61];
var wts = [1, 1, 1, 10, 11, 11, 11, 12, 14, 15, 16, 16, 17, 17, 18, 18, 19, 2, 2, 2, 20, 20, 20, 22, 22, 23, 25, 26, 27, 28, 28, 28, 29, 3, 3, 31, 32, 32, 38, 38, 39, 39, 4, 41, 43, 46, 47, 47, 47, 48, 48, 48, 55, 58, 61, 62, 63, 65, 68, 68, 68, 68, 7, 71, 71, 73, 73, 74, 74, 75, 77, 77, 78, 78, 8, 80, 85, 86, 86, 87, 87, 87, 88, 88, 88, 90, 90, 91, 92, 93, 93, 95, 95, 95, 95, 95, 96, 97, 98, 99];

function count(arr, val) {
    return arr.reduce((a, v) => (v == val ? a + 1 : a), 0);
} 

function wsample(population, weights, k) {

    let size = 1;

    // Set size to the lowest power of 2 greater than length.
    while (size < weights.length) {
        size = size << 1;
    }
    // w is an array with 'size' empty slots, followed by weights, 0 termed.
    let w = [...new Array(size), ...weights, 0];

    // Create a heap containing the cumulative weight values.
    for (let index = size - 1; index >= 1; index--) {
        let leftChild = index << 1;
        let rightChild = leftChild + 1;
        w[index] = (w[leftChild] || 0) + (w[rightChild] || 0);
    }
    let ops = [];
    let tot = []; 

    // Return the selected population member. Perform a recursive heap search 
    // to find it, then update the cumulative weights as the stack is popped.
    function retrieve(r, index) {
        if (index >= size) {
            w[index] = 0;
            ops.push('d');
            return population[index - size];
        }
        let leftChild = index << 1;
        let rightChild = leftChild + 1;

        // In case an undefined array element is accessed, encase in 'try'.
        try {
            if (r <= w[leftChild]) {
                ops.push('l');
                return retrieve(r, leftChild);
            }
            else {
                ops.push('r');
                return retrieve(r - w[leftChild], rightChild);
            }
        }
        finally {
            // Update the heap to subtract the chosen element's weight from
            // the other cumulative weights.
            w[index] = w[leftChild] + w[rightChild];
            ops.push('u');
        }
    };

    let root = 1;
    let result = [];

    for (let i = 0; i < k; i++) {
        result.push(retrieve(Math.random() * w[root], root));
        tot = tot.concat(ops);
        console.info(ops.sort().join());
        ops = [];
    }

    // Ops key: d=return, l=traverse left, r=traverse right, u=update.

    console.info(`tot.d  : ${count(tot, 'd')}`);
    console.info(`tot.lr : ${count(tot, 'r') + count(tot, 'l')}`);
    console.info(`tot.u  : ${count(tot, 'u')}`);

    return result;
}