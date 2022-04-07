'use strict';
let tableAsQueryString = "#myTable";
let enableLogging = true;



$(function main() {
    if (enableLogging) console.log("[log][main()] started...");

    const tableAsQueryString = "#myTable";

    // 1. insert values into the table
    const tableRows = generateTableRows(9, 4, 1, true);
    addRowsToTable(tableAsQueryString,  tableRows.slice(0, -1),"tbody");
    addRowsToTable(tableAsQueryString,  tableRows.slice(-1),"tfoot");
    // addRowsToTable(tableAsQueryString,  ["<tr><td>Footer 1</td><td>Footer 2</td><td>Footer 3</td><td>Footer 4</td></tr>"],"tfoot");

    // 2. sort table by column of clicked header
    const columnsIndices = generateArray(getTableWidth(tableAsQueryString), (_, index) => index);
    addTableSortingToTableColumns(tableAsQueryString, columnsIndices);
    // 3. implement swapping by click on footers
     addTableColumnsSwappingOnClickedFooter(tableAsQueryString, (footerIndex) => (footerIndex + 1) % (getTableWidth(tableAsQueryString)));

    if (enableLogging) console.log("[log][main()] ended...");
});





/*
TODO
    1. do a commit where you remove all lines commented with "remove later"
    2. replace "if (enableLogging) console.log("[log][<function name>()] <message>");" with "log(<message>);"

 */

/* Decisions
    1. is 'tfoot' considered part of the table content? should it be sorted/interchanged too?

 */


/* Refs & others
    - generate array; inspired from https://stackoverflow.com/questions/3751520/how-to-generate-sequence-of-numbers-chars-in-javascript
    - intToUpperLetter(value); inspired from https://stackoverflow.com/questions/3751520/how-to-generate-sequence-of-numbers-chars-in-javascript
    - libraries (2x Shift and search for this word) https://stackoverflow.com/questions/29097611/webstorm-there-is-no-locally-stored-library
 */