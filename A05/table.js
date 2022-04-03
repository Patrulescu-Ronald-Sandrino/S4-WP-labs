'use strict';


function getTableHeight(tableAsQueryString) { // MAYBE: not necessarily that useful, since getTableRows exists
    return $(tableAsQueryString + " tr").length;
}


// assumes: the width = the number of table headers in thead
function getTableWidth(tableAsQueryString) { // MAYBE: not necessarily that useful, since getTableHeaders exists
    return $(tableAsQueryString + " thead th").length;
}


// MAYBE: not necessarily that useful, since getTableRows(tableAsQueryString, true, false) can be used
function getTableHeaders(tableAsQueryString) {
    return $(tableAsQueryString + " th");
}


function getTableRows(tableAsQueryString, includeHeader = false, includeFooter = true) {
    return $(tableAsQueryString + " > tbody > tr" + (includeHeader ? ",thead > tr" : "") + (includeFooter ? ",tfoot > tr" : ""));
}


// // TODO: mind the "td,th"; maybe provide another parameter for allowing/adding ths too
// function getTableColumn(tableAsQueryString, index, includeHeader= false, includeFooter = true) {
//     // return Array.from($(tableAsQueryString + getTableDirectChildrenQueryString(includeFooter)) + " tr");
//     // TODO
//     // TODO replace getTableDirectChildrenQueryString(includeFooter) with filter or find or something like that
//     return $(tableAsQueryString + getTableDirectChildrenQueryString(includeFooter) + " tr").slice(!includeHeader).map(tr => tr.find("td,th").eq(index)).toArray();
// }


// function getTableColumnData(tableAsQueryString, columnIndex, includeHeader= false, includeFooter = true) {
//     return getTableColumn(tableAsQueryString, columnIndex, includeHeader, includeFooter);
// }


// function setTableColumnData(tableAsQueryString, columnIndex, newData, includeHeader = false, includeFooter = true) {
//
//
//     // TODO if (includeFooter) => @swap-last-row-and-footer
// }
//


function generateTableRows(numberOfRows, numberOfColumns, firstValue = 1) {
    if (!Number.isInteger(numberOfRows) || !Number.isInteger(numberOfColumns)) { return []; }
    if (numberOfRows < 1 || numberOfColumns < 1) { return []; }

    let result = [];
    const generateArrayMapFunctionsArray = [
        (_, index) => index,
        (_, index) => Number(index + "." + index),
        (_, index) => intToUpperLetter(index - 1),
        (_, index) => intToUpperLetter(index - 1).toLowerCase()
    ];
    const generateArrayMapFunctionsArrayLength = generateArrayMapFunctionsArray.length;


    doNTimes(numberOfRows, (rowIndex) => {
        let rowData = "";
        doNTimes(numberOfColumns, (i) => {
            rowData += "<td>" + generateArrayMapFunctionsArray[i % generateArrayMapFunctionsArrayLength]("", rowIndex + firstValue) + "</td>";
        })

        result.push(`<tr>${rowData}</tr>`)
    });

    return result;
}


function addRowsToTable(tableAsQueryString, rows, tablePart = "tbody") {
    if (["tbody", "tfoot"].find(value => value === tablePart) === undefined) { return; }

    doNTimes(rows.length, (i) => {
        $(tableAsQueryString + " " + tablePart).append(rows[i]);
    })
}


function addSortingToTableColumns(tableAsQueryString, columnsIndicesArray, includeFooter = true) {
    let tableHeaders = getTableHeaders(tableAsQueryString); // assumes: headers are in the first row (index 0)
    let tableHeadersLength = tableHeaders.length;

    let lastSortingArray = generateArray(tableHeadersLength, () => 'NONE');

    for (const columnIndex of columnsIndicesArray.filter(index => index >= 0 && index < tableHeadersLength)) {
        // if (columnIndex < 0 || columnIndex >= tableHeadersLength) { continue; } // skip invalid indices

        tableHeaders[columnIndex].addEventListener('click', () => {
            let comparator = getComparatorBasedOnLastSortingArray(lastSortingArray, columnIndex);
            let columnData = arrayValuesToIntOrKeepAsString(getTableColumnData(tableAsQueryString, columnIndex));

            sortArray(columnData, comparator);
            setLastSortingBasedOnLastSortingArray(lastSortingArray, columnIndex);

            setTableColumnData(tableAsQueryString, columnIndex, columnData, false, true);
        })

    }
}

function getComparatorBasedOnLastSortingArray(lastSortingArray, index) {
    return lastSortingArray[index] === 'ASC'
        ? (currentValueCompared, key) => currentValueCompared < key
        : (currentValueCompared, key) => currentValueCompared > key;
}

function setLastSortingBasedOnLastSortingArray(lastSortingArray, index) {
    lastSortingArray[index] = lastSortingArray[index] === 'ASC' ? 'DESC' : 'ASC';
}