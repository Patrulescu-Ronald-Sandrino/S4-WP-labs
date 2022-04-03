'use strict';
let tableAsQueryString = "#myTable";
let log = true;


$(function main() {
    if (log) console.log("[log][main()] started...");

    const tableAsQueryString = "#myTable";

    // 1. insert values into the table
    const tableRows = generateTableRows(9, 4,  1);
    addRowsToTable(tableAsQueryString,  tableRows.slice(0, -1),"tbody");
    addRowsToTable(tableAsQueryString,  tableRows.slice(-1),"tfoot");
    // addRowsToTable(tableAsQueryString,  ["<tr><td>Footer 1</td><td>Footer 2</td><td>Footer 3</td><td>Footer 4</td></tr>"],"tfoot");

    // TODO 2. implement sorting by clicking on headers
    addSortingToTableColumns(tableAsQueryString, generateArray(getTableWidth(tableAsQueryString), (_, index) => index + 1));
    // TODO 3. implement swapping by click on footers
    //  addSwappingToTable(...)

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