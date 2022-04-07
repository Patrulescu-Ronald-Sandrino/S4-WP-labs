'use strict';


function intToUpperLetter(value) {
    return String.fromCharCode('A'.charCodeAt(0) + value % ('Z'.charCodeAt(0) - 'A'.charCodeAt(0) + 1));
}



function generateArray(length, mapFunction = (element, index) => index + 1) {
    if (length <= 0) return [];

    // return Array(length).fill(0).map(mapFunction);
    return Array.from({ length: length}, mapFunction); // source: https://stackoverflow.com/a/39232049
}

/// Returns true if every string in the array looks like a number (int or float)
function doesStringsArrayLookLikeNumbersArray(array) {
    return array.filter(value => /^[+-]?\d+(\.\d+)?/.test(value)).length === array.length; // inspired from: https://stackoverflow.com/questions/5630123/javascript-string-integer-comparisons
}

/// Turns an array of strings into an array of numbers, if all strings in the array look like a number <br>
/// Otherwise returns the initial array
function toNumbersArrayOrReturnUnchanged(array) {
    return doesStringsArrayLookLikeNumbersArray(array) ? array.map(value => Number(value)) : array;
}


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
    if (log) console.log("[log][sortArray()] comparator: ", comparator.toString());
    if (log) console.log("[log][sortArray()] array: ", array);
}