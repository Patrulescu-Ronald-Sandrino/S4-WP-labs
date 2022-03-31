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

function addRowsToTable(tableAsQueryString, numberOfRows, includeFooter = true) {
    if (log) console.log($(tableAsQueryString + " tr"));
    const numberOfColumns = getTableWidth(tableAsQueryString);
    const absoluteIndexOfFirstRowToBeAdded = getTableHeight(tableAsQueryString, true, true);
    const generateArrayMapFunctionsArray = [(_, index) => index + 1,
            (_, index) => Number(index + "." + index),
            (_, index) => intToUpperLetter(index),
            (_, index) => intToUpperLetter(index).toLowerCase()
    ];
    const generateArrayMapFunctionsArrayLength = generateArrayMapFunctionsArray.length;

    // TODO: insert the empty trs into the table
    doNTimes(numberOfRows, () => {
        $(tableAsQueryString + getTableDirectChildrenQueryString(includeFooter) + "")
    });



    for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        const newColumnData = generateArray(numberOfRows, generateArrayMapFunctionsArray[columnIndex % generateArrayMapFunctionsArrayLength]);
        setTableColumnData(tableAsQueryString, columnIndex, newColumnData, false, true);
    }
}

function intToUpperLetter(value) {
    return String.fromCharCode('A'.charCodeAt(0) + value % ('Z'.charCodeAt(0) - 'A'.charCodeAt(0) + 1));
}

function setTableColumnData(tableAsQueryString, columnIndex, newData, includeHeader = false, includeFooter = true) {


    // TODO if (includeFooter) => @swap-last-row-and-footer
}

// note: this can be easily extended by adding a second parameter - 'includeHeader'
function getTableDirectChildrenQueryString(includeFooter = true) {
    // TODO: IDEA: use filter() and not()
    return " tbody" + includeFooter ? ",tfoot" : "";
}

// TODO: mind the "td,th"; maybe provide another parameter for allowing/adding ths too
function getTableColumn(tableAsQueryString, index, includeHeader= false, includeFooter = true) {
    // return Array.from($(tableAsQueryString + getTableDirectChildrenQueryString(includeFooter)) + " tr");
    // TODO
    // TODO replace getTableDirectChildrenQueryString(includeFooter) with filter or find or something like that
    return $(tableAsQueryString + getTableDirectChildrenQueryString(includeFooter) + " tr").slice(!includeFooter).map(tr => tr.find("td,th").eq(index)).toArray();
}

// assumes: the width = the number of table headers
function getTableWidth(tableAsQueryString) {
    return $(tableAsQueryString + " th").length;
}

function getTableRows(tableAsQueryString, includeFooter = true) {
    return $(tableAsQueryString + getTableDirectChildrenQueryString(includeFooter) + " tr");
}

function getTableHeight(tableAsQueryString, includeHeader = true, includeFooter = true) { // MAYBE: not necessarily that useful, since getTableRows exists
    // return $(tableAsQueryString + " *.table-body-and-footer tr").length;
    return $(tableAsQueryString + getTableDirectChildrenQueryString(includeFooter) + " tr").length;
}

function generateArray(length, mapFunction = (element, index) => index + 1) {
    if (length <= 0) return [];

    // return Array(length).fill(0).map(mapFunction);
    return Array.from({ length: length}, mapFunction); // https://stackoverflow.com/a/39232049
}

function doNTimes(N, functionToExecute = (i) => { console.log(i); }) {
    for (let i = 0; i < N; i++) {
        functionToExecute(i);
    }
}

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