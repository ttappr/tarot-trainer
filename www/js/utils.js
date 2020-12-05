
async function loadText(src) {
    let rsp = await fetch(src);

    if (rsp.status != 200) {
        throw new Error(`loadText() failed to fetch text content ` +
                        `from "${src}"; response status ${rsp.status}.`);
    }
    return await rsp.text();
}

function getPData(key) {
    return JSON.parse(window.localStorage.getItem(key));
}

function setPData(key, obj) {
    window.localStorage.setItem(key, JSON.stringify(obj));
}

function delPData(key) {
    window.localStorage.removeItem(key);
}

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
        total += n;
        accum.push(total);
    }
    return accum;
}

/**
 * Randomly chooses one element from the population using the list of 
 * weights to determine the probability each item will be selected.
 * @param {Object[]} pop An array of objects (population) to choose from.
 * @param {number[]} wts An array containing each weight for each object.
 */
function wchoice(pop, wts) {
    let acm = accumulate(wts);
    let rnd = Math.random() * acm[acm.length - 1];
    let idx = acm.findIndex(elm => elm >= rnd);
    return pop[idx];
}