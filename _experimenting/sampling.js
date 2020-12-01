
/*
    sample-other.js:88 d,l,l,l,l,l,l,r,u,u,u,u,u,u,u
    sample-other.js:88 d,l,l,l,l,r,r,r,u,u,u,u,u,u,u
    sample-other.js:88 d,l,l,l,r,r,r,r,u,u,u,u,u,u,u
    sample-other.js:88 d,l,l,l,l,r,r,r,u,u,u,u,u,u,u
    sample-other.js:88 d,l,l,l,l,l,r,r,u,u,u,u,u,u,u
    sample-other.js:94 tot.d  : 5
    sample-other.js:95 tot.lr : 35
    sample-other.js:96 tot.u  : 35
 */
/*
    sampling.js:56 d,d,l,l,l,l,r,r,r,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u
    sampling.js:56 d,d,l,l,l,r,r,r,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u
    sampling.js:56 d,d,l,l,l,l,l,r,r,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u
    sampling.js:56 d,d,l,l,l,l,r,r,r,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u
    sampling.js:56 d,d,l,l,l,l,r,r,r
    sampling.js:60 tot.d  : 10
    sampling.js:61 tot.lr : 34
    sampling.js:62 tot.u  : 101
 */

/*
    Ideas:
        *   Do the regular sample with replacement to select a member.
            *   Subtract its weight from total weight.
            *   Store its position and weight in another structure.
                *   Maybe a heap with its key a function of its weight and 
                    position (?).
        *   Generate random number * updatedTotal.
            *   If it lays to the right of known gaps, adjust it's value
                by a function of the total weights of the gaps.
                *   If any additional gaps are brought into the scope, continue
                    adjusting its value until it lands on something.
 */

var ops = [];
var pop = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
var wts = [47, 20, 88, 43, 65, 90, 14, 25, 68, 28, 86, 47, 73, 11, 62, 97, 58, 68, 71, 18, 29, 3, 78, 2, 11, 80, 91, 95, 38, 74, 87, 1, 71, 20, 95, 78, 96, 75, 93, 11, 86, 32, 20, 16, 77, 28, 18, 1, 4, 31, 17, 27, 63, 55, 12, 95, 88, 2, 26, 48, 95, 99, 93, 98, 39, 90, 39, 48, 85, 41, 68, 61, 38, 47, 16, 2, 68, 48, 23, 10, 77, 22, 87, 74, 87, 88, 73, 1, 8, 3, 22, 28, 46, 92, 15, 7, 95, 17, 32, 19];

function count(arr, val) {
    return arr.reduce((a, v) => (v == val ? a + 1 : a), 0);
} 

/**
 * Produces a weighted sample from `population` of size `k` without replacement.
 * 
 * @param {Object[]} population The population to select from.
 * @param {number[]} weights    The weighted values of the population.
 * @param {number}   k          The size of the sample to return.
 * @returns {[number[], Object[]]} An array of two arrays. The first holds the
 *                                 indices of the members in the sample, and
 *                                 the second holds the sample members.
 */
function wsample(population, weights, k) {
    let sample  = [];
    let indices = [];
    let index   = 0;
    let choice  = null;
    let acmwts  = accumulate(weights);

    let tot = [];

    for (let i=0; i < k; i++) {
        [index, choice] = wchoice(population, acmwts, true);

        sample.push(choice);
        indices.push(index);

        // Eliminate the current member @ index from future selections by 
        // essentially setting its weight to 0 and recalculating the accumulated
        // weights.
        if (i < k - 1) {
            let ndecr = weights[index];
            for (; index < acmwts.length; index++) {
                ops.push('u');
                acmwts[index] -= ndecr;
            }
        }
        console.info(ops.sort().join());
        tot = tot.concat(ops);
        ops = [];
    }
    console.info(`tot.d  : ${count(tot, 'd')}`);
    console.info(`tot.lr : ${count(tot, 'r') + count(tot, 'l')}`);
    console.info(`tot.u  : ${count(tot, 'u')}`);

    return [indices, sample];
}

/**
 * Randomly selects a member of `population` weighting the probability each 
 * will be selected using `weights`. `accumulated` indicats whether `weights` 
 * is pre-accumlated, in which case it will skip its accumulation step.
 * 
 * @param {Object[]} population    The population to select from.
 * @param {number[]} weights       The weights of the population.
 * @param {boolean}  [accumulated] true if weights are pre-accumulated.
 *                                 Treated as false if not provided.
 * @returns {[number, Object]} An array with the selected member's index and 
 *                             the member itself.
 */
function wchoice(population, weights, accumulated) {
    let acm = (accumulated) ? weights : accumulate(weights);
    let rnd = Math.random() * acm[acm.length - 1];

    // a native bisect_left() function here would have been more efficient.
    // let idx = acm.findIndex((elm) => rnd <= elm);

    let idx = bisect_left(acm, rnd);

    ops.push('d');
    return [idx, population[idx]];
}

/**
 * Generates an array of accumulated values for `numbers`.
 * e.g.: [1, 5, 2, 1, 5] --> [1, 6, 8, 9, 14]
 * 
 * @param {number[]} numbers      The numbers to accumulate.
 * @returns An new array of accumulated values, or `cumulative` updated.
 */
function accumulate(numbers) {
    let accm  = [];
    let total = 0;
    for (let n of numbers) {
        total += n;
        accm.push(total)
    }
    return accm;
}

function _eliminate_selectee(cumulative, offset) {
    let ndecr = cumulative[offset] - cumulative[offset - 1];
    for (; offset < cumulative.length; offset++) {
        cumulative[offset] -= ndecr;
    }
}
/**
 * Finds the left insertion point for `target` in array `arr`.
 * 
 * @param {number[]} arr  A sorted ascending array.
 * @param {number} target The target value.
 * @returns {number} The index to insert `target` in that preserves the 
 *                   order of `arr`.
 */
function bisect_left(arr, target) {
    let n = arr.length;
    let l = 0;
    let r = n - 1;
    while (l <= r) {
        let m = Math.floor((l + r) / 2);
        if (arr[m] < target) {
            ops.push('l');
            l = m + 1;
        } else if (arr[m] >= target) {
            ops.push('r');
            r = m - 1;
        } 
    }
    ops.push('d');
    return l;
}

/*
Serial code for win2k sp4:

    SP4: DDTPV-TXMX7-BBGJ9-WGY8K-B9GHM
*/

function zip(...iterables) {
    return [...iterables[0]].map((_, c)    => iterables
                            .map(iterables => iterables[c]));
}

function wrsample(population, weights, k) {
    let h     = [];
    let plen  = population.length;
    let i     = 0;
    for ( ; i < k; i++) {
        let r = Math.pow(Math.random(), 1 / weights[i]);
        heapq.heappush(h, [r, p]);
    }
    let x = Math.log(Math.random()) / Math.log(h[0][0]);
    for ( ; i < plen; i++) {
        w  = weights[i];
        x -= w;
        if (x <= 0) {
            let t = Math.pow(h[0][0], w);
            let r = Math.pow(Math.random() * (1 - t) + 1, 1 / w);
            heapq.heappop(h);
            heapq.heappush(h, [r, p]);
            x = Math.log(Math.random()) / Math.log(h[0][0]);
        }    
    }
    return h;
}


/*
Here are some steps for a basic weighted sample function:

- Take the array of weights and produce an array of cumulative values.
- e.g.: [1, 5, 2, 1, 5] --> [1, 6, 8, 9, 14]
- Generate a random number between 0 and 14.
- Find its left insertion point in the accumulated weight list.
- This will be the index of the random winner in the population.
- Eliminate the winner from future rounds of selection.
- Repeat process K times to produce a sample array.

A solution that deviates from this is welcome. The above is just the best approach I know about for this particular type of sampling.

Decomposing the work into its parts, I think it would be good to first have a good weighted choice function that picks a single population member.

    function wchoice(pop, wts) {
        // input  : pop=[1, 2, 3, 4], wts=[20, 15, 80, 2] 
        // output : 3 (most likely), 4 (least likely)
    }

Generating a sample *with replacement* is just a matter of calling `wchoice()` `k` number of times. But, to choose `k` members from the population *without replacement* is more involved. 

    function wsample(pop, wts, k) {
        // input  : pop=[1, 2, 3, 4], wts=[3, 2, 1, 4], k=2
        // output : [4, 1] (most likely), [3, 2] (least likely)
    }

**`k` must be `<=` the number of non-zero items in `weights`.**
*/
