// 'use strict';

let log = true;


function addEntriesToTable(table, numberOfRows) {

}

$(function main() {
    console.log("[log][main()] started...");
    /*
    TODO:
        1. generate table columns
        2. sort whole table based on clicked headers (in same manner as the previous)
        3. interchange columns
     */
    addEntriesToTable($("#myTable"), 10);

    $("body").add()
})




function generateArray(length, mapFunction = (element, index) => index + 1) {
    if (length <= 0) return [];

    return Array(length).fill(0).map(mapFunction);
}

/*
TODO IDEAs:
    1. for A04: add 'use strict';

 */

/* Refs & others
    - generate array; inspired from https://stackoverflow.com/questions/3751520/how-to-generate-sequence-of-numbers-chars-in-javascript
    - libraries (2x Shift and search for this word) https://stackoverflow.com/questions/29097611/webstorm-there-is-no-locally-stored-library
 */