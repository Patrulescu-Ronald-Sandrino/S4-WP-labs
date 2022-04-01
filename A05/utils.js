'use strict';


function intToUpperLetter(value) {
    return String.fromCharCode('A'.charCodeAt(0) + value % ('Z'.charCodeAt(0) - 'A'.charCodeAt(0) + 1));
}



function generateArray(length, mapFunction = (element, index) => index + 1) {
    if (length <= 0) return [];

    // return Array(length).fill(0).map(mapFunction);
    return Array.from({ length: length}, mapFunction); // source: https://stackoverflow.com/a/39232049
}

function doNTimes(N, functionToExecute = (i) => { console.log(i); }) {
    for (let i = 0; i < N; i++) {
        functionToExecute(i);
    }
}