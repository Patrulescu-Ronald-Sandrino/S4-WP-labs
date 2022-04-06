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