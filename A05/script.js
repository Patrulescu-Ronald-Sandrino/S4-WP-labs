'use strict';
let tableAsQueryString = "#myTable";
let log = true;


$(function main() {
    if (log) console.log("[log][main()] started...");
    /*
    TODO:
        1. generate table columns
        2. sort whole table based on clicked headers (in same manner as the previous)
        3. interchange columns
     */
    addRowsToTable("#myTable", 9);

    $("body").add()
    if (log) console.log("[log][main()] ended...");
})



/*
TODO IDEAs:
    1.

 */

/* Decisions
    1. is 'tfoot' considered part of the table content? should it be sorted/interchanged too?

 */


/* Refs & others
    - generate array; inspired from https://stackoverflow.com/questions/3751520/how-to-generate-sequence-of-numbers-chars-in-javascript
    - intToUpperLetter(value); inspired from https://stackoverflow.com/questions/3751520/how-to-generate-sequence-of-numbers-chars-in-javascript
    - libraries (2x Shift and search for this word) https://stackoverflow.com/questions/29097611/webstorm-there-is-no-locally-stored-library
 */