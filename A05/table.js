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


// TODO: mind the "td,th"; maybe provide another parameter for allowing/adding ths too
function getTableColumn(tableAsQueryString, index, includeHeader= false, includeFooter = true) {
    return $(tableAsQueryString + " > tbody > tr" + (includeHeader ? ",thead > tr" : "") + (includeFooter ? ",tfoot > tr" : "")).map((_, tr) => $(tr).find("th,td")[index]) // works; source: https://stackoverflow.com/questions/24300762/jquery-throws-an-error-that-element-find-is-not-a-function
}


function getTableColumnData(tableAsQueryString, columnIndex, includeHeader = false, includeFooter = true) {
    return $(getTableColumn(tableAsQueryString, columnIndex, includeHeader, includeFooter)).map((_, cell) => cell.innerText);
}


function getTableCellData(tableAsQueryString, rowIndex, columnIndex) {
    return $(tableAsQueryString + " th,td")[rowIndex * getTableWidth(tableAsQueryString) + columnIndex];
}

// function setTableColumnData(tableAsQueryString, columnIndex, newData, includeHeader = false, includeFooter = true) {
//
//
//     // TODO if (includeFooter) => @swap-last-row-and-footer
// }
//


function generateTableRows(numberOfRows, numberOfColumns, firstValue = 1, random = false) {
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
            const value = random ? truncateFloatToInt(generateRandomNumber(firstValue, numberOfRows)) : rowIndex + firstValue;
            // rowData += "<td>" + generateArrayMapFunctionsArray[i % generateArrayMapFunctionsArrayLength](null, rowIndex + firstValue) + "</td>";
            rowData += "<td>" + generateArrayMapFunctionsArray[i % generateArrayMapFunctionsArrayLength](null, value) + "</td>";
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


function addTableSortingToTableColumns(tableAsQueryString, columnsIndicesArray, includeFooter = true) {
    let tableHeaders = getTableHeaders(tableAsQueryString); // assumes: headers are in the first row (index 0)
    let tableHeadersLength = tableHeaders.length;

    let lastSortingArray = generateArray(tableHeadersLength, () => 'NONE');

    for (const columnIndex of columnsIndicesArray.filter(index => index >= 0 && index < tableHeadersLength)) {
        // if (columnIndex < 0 || columnIndex >= tableHeadersLength) { continue; } // skip invalid indices

        tableHeaders[columnIndex].addEventListener('click', () => {
            // get the correct comparator for the current column, based on it's last sorting and the column's content
            const columnData = getTableColumnData(tableAsQueryString, columnIndex, true, true);
            // TODO: add a randomizer
            // TODO: What happens if I swap a Strings column with a Numbers column?
            const comparator = getComparatorBasedOnLastSortingArray(lastSortingArray, columnIndex, columnData);

            // TODO #1.2: sort rows indices by comparing column data
            const rowIndices = generateArray(getTableHeight(tableAsQueryString) - 1, (_, index) => index + 1);
            sortArray(rowIndices, comparator);
            swapLastSortingBasedOnLastSortingArray(lastSortingArray, columnIndex);
            // TODO #1.3: swap rows' content (see WhatsApp)
            // setTableColumnData(tableAsQueryString, columnIndex, columnData, false, true);
            console.log("clicked header ", columnIndex);
        });

    }
}

function getComparatorBasedOnLastSortingArray(lastSortingArray, columnIndex, columnData) {
    // v1
    // const toNumberOrReturnUnchanged = (value, shouldBeNumber) => { return shouldBeNumber ? Number(value) : value; };

    // v2
    // const ascendingSortingComparator = compareAsNumbers
    //     ? (currentValueCompared, key) => Number(currentValueCompared) > Number(key)
    //     : (currentValueCompared, key) => currentValueCompared > key;
    // const descendingSortingComparator = compareAsNumbers
    //     ? (currentValueCompared, key) => Number(currentValueCompared) < Number(key)
    //     : (currentValueCompared, key) => currentValueCompared < key;
    //
    // // v3
    // const cast1 = (value) => compareAsNumbers ? Number(value) : value;
    //
    // // v4 - perform the checking  once
    // const cast2 = compareAsNumbers ? (_) => Number(_) : (_) => _;

    // v5 - refactored to include tableAsQueryString
    // const getTableDataAtRow = (rowIndex) => getTableCellData(tableAsQueryString, rowIndex, columnIndex);


    // decide the type of column data (string vs number)

    if (log) console.log("[log][getComparatorBasedOnLastSortingArray()] columnIndex: ", columnIndex);
    if (log) console.log("[log][getComparatorBasedOnLastSortingArray()] columnData.slice(1): ", Array.from(columnData.slice(1)));
    const isColumnOfNumbers = doesStringsArrayLookLikeNumbersArray(columnData.slice(1)); // slice in order to exclude the column's header
    if (log) console.log("[log][getComparatorBasedOnLastSortingArray()] isColumnOfNumbers: ", isColumnOfNumbers.toString());
    const toActualColumnDataDataType = isColumnOfNumbers ? (_) => Number(_) : (_) => _;

    const getColumnCellDataAtRow = (rowIndex) => toActualColumnDataDataType(columnData[rowIndex]);


    return lastSortingArray[columnIndex] === 'ASC'
        ? (currentValueCompared, key) => getColumnCellDataAtRow(currentValueCompared) < getColumnCellDataAtRow(key)
        : (currentValueCompared, key) => getColumnCellDataAtRow(currentValueCompared) > getColumnCellDataAtRow(key);
}

function swapLastSortingBasedOnLastSortingArray(lastSortingArray, columnIndex) {
    lastSortingArray[columnIndex] = lastSortingArray[columnIndex] === 'ASC' ? 'DESC' : 'ASC';
}