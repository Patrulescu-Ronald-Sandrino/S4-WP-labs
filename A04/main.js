// 'use strict';

// let lastSortingArray;
let log = false;


main();


function main() {
    addColumnSorting(document.getElementById("myTable"));
}


function addColumnSorting(table) {
    let tableHeaders = getTableHeaders(table);
    let tableHeadersLength = tableHeaders.length;

    let lastSortingArray = Array(tableHeadersLength).fill('NONE'); // fill array


    for (let tableHeaderIndex = 0; tableHeaderIndex < tableHeadersLength; tableHeaderIndex++) {
        if (log) console.log(tableHeaderIndex, tableHeaders[tableHeaderIndex]); // debug print
        tableHeaders[tableHeaderIndex].addEventListener("click", () => {
            let comparator = getSorter(lastSortingArray, tableHeaderIndex);
            let columnData = arrayValuesToIntOrKeepAsString(getTableColumnData(table, tableHeaderIndex));
            if (log) console.log(`[before sort] Index: ${tableHeaderIndex}, lastSortingArray[index]: ${lastSortingArray[tableHeaderIndex]}, Array: `, columnData);
            sortArray(columnData, comparator);
            setLastSorting(lastSortingArray, tableHeaderIndex);
            if (log) console.log(`[after sort] Index: ${tableHeaderIndex}, lastSortingArray[index]: ${lastSortingArray[tableHeaderIndex]}, Array: `, columnData);
            setTableColumnData(table, tableHeaderIndex, columnData);
        }); // TODO what happens if I don't send the index as capture?
        // }, tableHeaderIndex); // TODO what happens if I don't send the index as capture?
    }

}


function getTableHeaders(table) {
    return table.getElementsByTagName('th');
}


function setLastSorting(lastSortingArray, index) {
    lastSortingArray[index] = lastSortingArray[index] === 'ASC' ? 'DESC' : 'ASC';
}

function isArrayOfNumberStrings(array) {
    return array.filter(value => /^[+-]?\d+(\.\d+)?/.test(value)).length === array.length; // inspired from: https://stackoverflow.com/questions/5630123/javascript-string-integer-comparisons
}


function arrayValuesToIntOrKeepAsString(array) {
    return isArrayOfNumberStrings(array) ? array.map(value => Number(value)) : array;
}


function getSorter(lastSortingArray, index) {
    return lastSortingArray[index] === 'ASC'
                ? (currentValueCompared, key) => currentValueCompared < key
                : (currentValueCompared, key) => currentValueCompared > key;
}


function isTableColumnIndexValid(table, columnIndex) {
    const tableWidth = getTableWidth(table);

    if (columnIndex >= tableWidth) {
        return `Given index: ${columnIndex} should be < the # of columns in the given table, i.e. less than ${tableWidth}` // string format
    }

    return true;
}


function getTableWidth(table) {
    return getTableHeaders(table).length;
}


function getTableColumn(table, columnIndex) {
    { // check the columnIndex
        const isTableColumnIndexValidResult = isTableColumnIndexValid(table, columnIndex);
        if (isTableColumnIndexValidResult !== true) {
            console.log(isTableColumnIndexValidResult);
            return;
        }
    }

    return Array.from(table.getElementsByTagName('tr')).slice(1).map(tr => tr.getElementsByTagName('td')[columnIndex]); // HTML Collection to Array
}

// returns an Array of all the tds of a column
function getTableColumnData(table, columnIndex) { // example: getTableColumnData(document.getElementById('myTable'), 1);
   return getTableColumn(table, columnIndex).map(td => td.innerText);
}

function setTableColumnData(table, columnIndex, newColumnData) {
    { // check the columnIndex
        const isTableColumnIndexValidResult = isTableColumnIndexValid(table, columnIndex);
        if (isTableColumnIndexValidResult !== true) {
            console.log(isTableColumnIndexValidResult);
            return;
        }
    }
    let oldColumn = getTableColumn(table, columnIndex);
    for (let rowIndex = 0; rowIndex < oldColumn.length; rowIndex++) {
        if (log) console.log("[setTableColumnData()] Loop index: " + rowIndex);
        if (log) console.log("[setTableColumnData()] oldColumn[rowIndex] = ", oldColumn[rowIndex]);
        if (log) console.log("[setTableColumnData()] oldColumn[rowIndex].innerText = ", oldColumn[rowIndex].innerText);
        if (log) console.log("[setTableColumnData()] newColumnData[rowIndex] = ", newColumnData[rowIndex]);
        oldColumn[rowIndex].innerText = newColumnData[rowIndex];
    }
    if (log) console.log("[setTableColumnData()] finished");
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
    if (log) console.log("[log][sortArray()] Array: ", array);
}


/*
TODO: IDEAs
    1. make 'lastSortingArray' not global
        - variant 1: make it a property of the table

 */

/* Some references
    - fill array https://stackoverflow.com/questions/35578478/array-prototype-fill-with-object-passes-reference-and-not-new-instance
    - HTML Collection to Array https://stackoverflow.com/questions/68304430/convert-htmlcollection-to-an-array-with-javascript
    - string format https://www.tutorialstonight.com/javascript-string-format.php
 */