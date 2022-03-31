// 'use strict';

let lastSortingArray;
main();


function main() {
    addColumnSorting(document.getElementById("myTable"));
}


function getTableHeaders(table) {
    return table.getElementsByTagName('th');
}


function addColumnSorting(table) {
    let tableHeaders = getTableHeaders(table);
    let tableHeadersLength = tableHeaders.length;

    lastSortingArray = Array(tableHeadersLength).fill('NONE'); // fill array


    for (let tableHeaderIndex = 0; tableHeaderIndex < tableHeadersLength; tableHeaderIndex++) {
        // console.log(tableHeaderIndex, tableHeaders[tableHeaderIndex]); // debug print
        tableHeaders[tableHeaderIndex].addEventListener("click", () => {
            // let comparator = decideSortingAndGetComparator(tableHeaderIndex);
            let comparator = getSorter(tableHeaderIndex);
            let columnData = arrayValuesToIntOrKeepAsString(getTableColumnData(table, tableHeaderIndex));
            console.log(`[before sort] Index: ${tableHeaderIndex}, lastSortingArray[index]: ${lastSortingArray[tableHeaderIndex]}, Array: `, columnData);
            sortArray(columnData, comparator);
            setLastSorting(tableHeaderIndex);
            console.log(`[after sort] Index: ${tableHeaderIndex}, lastSortingArray[index]: ${lastSortingArray[tableHeaderIndex]}, Array: `, columnData);
            setTableColumnData(table, tableHeaderIndex, columnData);
        }, tableHeaderIndex)
    }

}


function setLastSorting(index) {
    lastSortingArray[index] = lastSortingArray[index] === 'ASC' ? 'DESC' : 'ASC';
}

function isArrayOfNumberStrings(array) {
    return array.filter(value => /^[+-]?\d+(\.\d+)?/.test(value)).length === array.length;
}

// /^[+-]?\d+(\.\d+)?/.test();
function arrayValuesToIntOrKeepAsString(array) {
    return isArrayOfNumberStrings(array) ? array.map(value => Number(value)) : array;
}

function getSorter(index) {
    return lastSortingArray[index] === 'ASC'
                ? (currentValueCompared, key) => currentValueCompared < key
                : (currentValueCompared, key) => currentValueCompared > key;
}

// assumes homogeneous columns
function decideSortingAndGetComparator(index) { // Does this violate SRP? IDEA: set the value for lastSortingArray[index], after running the sort function
    let comparator;
    if (lastSortingArray[index] === 'ASC') { // last = 'ASC' => now sort DESC
        lastSortingArray[index] = 'DESC';
        // comparator = function (currentValueCompared, key) { return currentValueCompared < key; };
        comparator = (currentValueCompared, key) => currentValueCompared < key;
    }
    else { // last = 'DESC' => now sort ASC
        lastSortingArray[index] = 'ASC';
        comparator = (currentValueCompared, key) => currentValueCompared > key;
    }
    return comparator;
}

function clickedTableHeader() {

}

function getTableWidth(table) {
    return getTableHeaders(table).length;
}

function isTableColumnIndexValid(table, columnIndex) {
    const tableWidth = getTableWidth(table);

    if (columnIndex >= tableWidth) {
        return `Given index: ${columnIndex} should be < the # of columns in the given table, i.e. less than ${tableWidth}` // string format
    }

    return true;
}

function getTableColumn(table, columnIndex) {
    { // check the columnIndex
        const isTableColumnIndexValidResult = isTableColumnIndexValid(table, columnIndex);
        if (isTableColumnIndexValidResult !== true) {
            console.log(isTableColumnIndexValidResult);
            return;
        }
    }

    // document.getElementById('myTable').getElementsByTagName('th')[2] = document.getElementById('myTable').getElementsByTagName('th')[1]
    // Array.from(document.getElementById('myTable').getElementsByTagName('tr')).slice(1).map(tr => tr.getElementsByTagName('td')[2]).forEach(td => td.innerText = '2')
    return Array.from(table.getElementsByTagName('tr')).slice(1).map(tr => tr.getElementsByTagName('td')[columnIndex]); // HTML Collection to Array

}

// returns an Array of all the tds of a column
function getTableColumnData(table, columnIndex) { // getTableColumnData(document.getElementById('myTable'), 1);
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
        console.log("[setTableColumnData()] Loop index: " + rowIndex);
        console.log("[setTableColumnData()] oldColumn[rowIndex] = ", oldColumn[rowIndex]);
        console.log("[setTableColumnData()] oldColumn[rowIndex].innerText = ", oldColumn[rowIndex].innerText);
        console.log("[setTableColumnData()] newColumnData[rowIndex] = ", newColumnData[rowIndex]);
        oldColumn[rowIndex].innerText = newColumnData[rowIndex];
    }
    console.log("[setTableColumnData()] finished");
}


function sortArray(array, comparator = (currentValue, key) => currentValue > key) { // sortArray([2, 1, 4, 2, 5], shouldSwap)
    // https://www.geeksforgeeks.org/insertion-sort/
    // let array = [2, 1, 4, 2, 5];
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
    console.log("[sortArray] Array: ", array);
}

// var a = [ 'x', 'y', 23 ];
// a.Test = 'foo';
// for (i=0; i<a.length; i++) {
//     console.log(a[i]);
// }  	// will print: x, y, 23
// for (var i in a) {
//     console.log(i);
// }	// will print: 0, 1, 2, test
// for (var i of a) {
//     console.log(i);
// } 	// will print: x, y, 23
// a.forEach(function(elem) { console.log(elem); });  // will print  x, y, 23
//
// plm = 2;
// eval('plm += 3');
//
// console.log(plm);


/* Some references
    - fill array https://stackoverflow.com/questions/35578478/array-prototype-fill-with-object-passes-reference-and-not-new-instance
    - HTML Collection to Array https://stackoverflow.com/questions/68304430/convert-htmlcollection-to-an-array-with-javascript
    - string format https://www.tutorialstonight.com/javascript-string-format.php
 */