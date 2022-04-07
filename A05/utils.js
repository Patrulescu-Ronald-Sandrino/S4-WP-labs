'use strict';


function intToUpperLetter(value) {
    return String.fromCharCode('A'.charCodeAt(0) + value % ('Z'.charCodeAt(0) - 'A'.charCodeAt(0) + 1));
}



function generateArray(length, mapFunction = (element, index) => index + 1) {
    if (length <= 0) return [];

    // return Array(length).fill(0).map(mapFunction);
    return Array.from({ length: length}, mapFunction); // source: https://stackoverflow.com/a/39232049
}


function doesStringLookLikeNumber(value) {
    return /^[+-]?\d+(\.\d+)?$/.test(value);
}

function doesStringLookLikeInt(value) {
    return /^[+-]?\d+$/.test(value);
}

/// Returns true if every string in the array looks like a number (int or float)
function doesStringsArrayLookLikeNumbersArray(array) {
    // return array.filter(value => /^[+-]?\d+(\.\d+)?/.test(value)).length === array.length; // inspired from: https://stackoverflow.com/questions/5630123/javascript-string-integer-comparisons
    return array.filter(value => doesStringLookLikeNumber(value)).length === array.length; // inspired from: https://stackoverflow.com/questions/5630123/javascript-string-integer-comparisons
}

/// Turns an array of strings into an array of numbers, if all strings in the array look like a number <br>
/// Otherwise returns the initial array
function toNumbersArrayOrReturnUnchanged(array) {
    return doesStringsArrayLookLikeNumbersArray(array) ? array.map(value => Number(value)) : array;
}


// for-loop wrapper, indexing starts from 0
function doNTimes(N, functionToExecute = (i) => { console.log(i); }) {
    for (let i = 0; i < N; i++) {
        functionToExecute(i);
    }
}

// generates a random real number in the interval [min, max) <br>
// source: user1606185's answer on https://grabthiscode.com/javascript/generate-random-number-jquery
function generateRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

// sources: https://www.delftstack.com/howto/javascript/javascript-float-to-int/
// explanation: https://stackoverflow.com/questions/7487977/using-bitwise-or-0-to-floor-a-number
function truncateFloatToInt(floatValue) {
    return floatValue | 0;
}

function sortArray(array, comparator = (currentValue, key) => currentValue > key) { // example: sortArray([2, 1, 4, 2, 5])
    // source: https://www.geeksforgeeks.org/insertion-sort/
    let length = array.length;

    for (let i = 1; i < length; i++) {
        let key, j;

        key = array[i];
        j = i - 1;

        while (j >= 0 && comparator(array[j], key)) {
            array[j + 1] = array[j]
            j = j - 1;
        }
        array[j + 1] = key;
    }
    if (enableLogging) console.log("[log][sortArray()] comparator: ", comparator.toString());
    if (enableLogging) console.log("[log][sortArray()] array: ", array);
}

// const getCallerLambda = () => (new Error()).stack.split("\n")[2].split("/")[0]; // remove later
const getCallerLambda = () => (new Error()).stack.split("\n")[2].split("@")[0];


// wrapper for console.log() <br>
// log(<message>) prints: [log][<caller name>()] <message> <br>
// log("start") prints: [log][<caller name>()] STARTED -----------------------.... <br>
// log("end") prints: [log][<caller name>()] ENDED -----------------------.... <br>
function log(...message) {
    if (enableLogging) {
        if (message[0] === "start") {
            console.log(`[log][${getCallerLambda()}()] STARTED ` + generateArray(125, () => "-").reduce((prev, current) => prev + current));
        }
        else if (message[0] === "end") {
            // console.log(`[log][${caller}()] ENDED ` + generateArray(125, () => "-").reduce((prev, current) => prev + current)); // remove later
            console.log(`[log][${getCallerLambda()}()] ENDED ` + generateArray(125, () => "-").reduce((prev, current) => prev + current));
            console.log();
        }
        else {
            // console.log("[log]", message.reduce((previousValue, currentValue) => previousValue.toString() + currentValue.toString(), ""));
            // console.log(`[log][${caller}()]`, message.reduce((previousValue, currentValue) => previousValue.toString() + currentValue.toString(), ""));
            console.log(`[log][${getCallerLambda()}()]`, message.reduce((previousValue, currentValue) => previousValue.toString() + currentValue.toString(), ""));
        }
    }
}