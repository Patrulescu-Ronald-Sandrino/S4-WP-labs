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


function getTableRows(tableAsQueryString, includeHeader = false, includeFooter = true) { // getTableRows(tableAsQueryString, true, true)
    return $(tableAsQueryString
        + " > tbody > tr"
        + (includeHeader ? ",thead > tr" : "")
        + (includeFooter ? ",tfoot > tr" : "")
    );
}


// TODO: mind the "td,th"; maybe provide another parameter for allowing/adding ths too
function getTableColumn(tableAsQueryString, index, includeHeader = false, includeFooter = true) {
    //// v1
    // return $(tableAsQueryString
    //     + " > tbody > tr"
    //     + (includeHeader ? ",thead > tr" : "")
    //     + (includeFooter ? ",tfoot > tr" : ""))
    //// end-of-v1
    // v2
    return getTableRows(tableAsQueryString, includeHeader, includeFooter)
    // end-of-v2
        .map((_, tr) => $(tr).find("th,td")[index]) // works; source: https://stackoverflow.com/questions/24300762/jquery-throws-an-error-that-element-find-is-not-a-function

    // IDEA: wrap in Array.from() (check it's usage before)
}


function getTableColumnData(tableAsQueryString, columnIndex, includeHeader = false, includeFooter = true) {
    // return $(getTableColumn(tableAsQueryString, columnIndex, includeHeader, includeFooter)).map((_, cell) => cell.innerText);
    return Array.from($(getTableColumn(tableAsQueryString, columnIndex, includeHeader, includeFooter)).map((_, cell) => cell.innerText));
}


function getTableCellData(tableAsQueryString, rowIndex, columnIndex) {
    return $(tableAsQueryString + " th,td")[rowIndex * getTableWidth(tableAsQueryString) + columnIndex];
}

/// Returns an array of <br>
/// arrays of <br>
/// row contents.
function getTableData(tableAsQueryString) {
    // return getTableRows(tableAsQueryString, 1, 1).map((_, tr) => $(tr).find("th,td").map((_, cell) => cell.innerText)); // v1
    return Array.from(getTableRows(tableAsQueryString, 1, 1).map((_, tr) => $(tr).find("th,td").map((_, cell) => cell.innerText))).map(value => Array.from(value));
}


function setTableColumnData(tableAsQueryString, columnIndex, newData, includeHeader = false, includeFooter = true) {
    const column = Array.from(getTableColumn(tableAsQueryString, columnIndex, includeHeader, includeFooter));

    doNTimes(column.length, (rowIndex) => {
       column[rowIndex].innerText = newData[rowIndex];
    });
}


function getTableRow(tableAsQueryString, rowIndex) {
    return getTableRows(tableAsQueryString, true, true)[rowIndex];
}

function setTableRowData(tableAsQueryString, rowIndex, rowData) {
    const rowCells = getTableRow(tableAsQueryString, rowIndex).cells;
    doNTimes(rowCells.length, (columnIndex) => {
        rowCells[columnIndex].innerText = rowData[columnIndex];
    });
}


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

/**
 *
 * @param tableAsQueryString
 * @param columnsIndicesArray an array of the indices of the columns that will have sorting
 * @param includeFooter
 */
function addTableSortingToTableColumns(tableAsQueryString, columnsIndicesArray, includeFooter = true) {
    let tableHeaders = getTableHeaders(tableAsQueryString); // assumes: headers are in the first row (index 0)
    let tableHeadersLength = tableHeaders.length;

    let lastSortingArray = generateArray(tableHeadersLength, () => 'NONE');

    for (const columnIndex of columnsIndicesArray.filter(index => index >= 0 && index < tableHeadersLength)) {
        // if (columnIndex < 0 || columnIndex >= tableHeadersLength) { continue; } // skip invalid indices

        tableHeaders[columnIndex].addEventListener('click', () => {
            if (enableLogging) console.log("[log][addTableSortingToTableColumns()] addEventListener() started...");
            if (enableLogging) console.log("[log][addTableSortingToTableColumns()] clicked header ", columnIndex);
            // log("clicked header ", columnIndex);

            // get the correct comparator for the current column, based on it's last sorting and the column's content
            const columnData = getTableColumnData(tableAsQueryString, columnIndex, true, true);
            // TODO: What happens if I swap a Strings column with a Numbers column?
            const comparator = getComparatorBasedOnLastSortingArray(lastSortingArray, columnIndex, columnData);

            const rowIndices = generateArray(getTableHeight(tableAsQueryString) - 1, (_, index) => index + 1);
            sortArray(rowIndices, comparator);
            swapLastSortingBasedOnLastSortingArray(lastSortingArray, columnIndex);
            const indicesOfSortedRows = [0].concat(rowIndices); // include the header row, so the indexing in the following will be easier; source: https://stackoverflow.com/questions/62717815/concatenate-two-arrays

            const tableData = getTableData(tableAsQueryString) // tableData= [['Column 1', 'Column 2', 'Column 3', 'Column 4'], [7, 1.1, 'd', 'P], ..., [5, 8.8, 'x', 'Z']]

            for (let rowIndex = 1; rowIndex < getTableHeight(tableAsQueryString); rowIndex++) {
                if (enableLogging) console.log("[log][addTableSortingToTableColumns()] rowIndex =", rowIndex, " indicesOfSortedRows[row] =", indicesOfSortedRows[rowIndex], " tableData[indicesOfSortedRows[rowIndex]] =", tableData[indicesOfSortedRows[rowIndex]]);
                setTableRowData(tableAsQueryString, rowIndex, tableData[indicesOfSortedRows[rowIndex]]);
            }
            if (enableLogging) {
                console.log("[log][addTableSortingToTableColumns()] addEventListener() ended...");
                console.log();
            }
        });

    }
}

function getComparatorBasedOnLastSortingArray(lastSortingArray, columnIndex, columnData) {

    if (enableLogging) console.log("[log][getComparatorBasedOnLastSortingArray()] columnIndex: ", columnIndex);
    // if (enableLogging) console.log("[log][getComparatorBasedOnLastSortingArray()] Array.from(columnData.slice(1)): ", Array.from(columnData.slice(1)));
    if (enableLogging) console.log("[log][getComparatorBasedOnLastSortingArray()] columnData.slice(1): ", columnData.slice(1));
    // const isColumnOfNumbers = doesStringsArrayLookLikeNumbersArray(columnData.slice(1)); // slice in order to exclude the column's header // bad version, cuz slice() returns an object
    const isColumnOfNumbers = doesStringsArrayLookLikeNumbersArray(Array.from(columnData.slice(1))); // slice in order to exclude the column's header
    if (enableLogging) console.log("[log][getComparatorBasedOnLastSortingArray()] isColumnOfNumbers: ", isColumnOfNumbers.toString());
    const toActualColumnDataDataType = isColumnOfNumbers ? (_) => Number(_) : (_) => _;

    const getColumnCellDataAtRow = (rowIndex) => toActualColumnDataDataType(columnData[rowIndex]);


    return lastSortingArray[columnIndex] === 'ASC'
        ? (currentValueCompared, key) => getColumnCellDataAtRow(currentValueCompared) < getColumnCellDataAtRow(key)
        : (currentValueCompared, key) => getColumnCellDataAtRow(currentValueCompared) > getColumnCellDataAtRow(key);
}

function swapLastSortingBasedOnLastSortingArray(lastSortingArray, columnIndex) {
    lastSortingArray[columnIndex] = lastSortingArray[columnIndex] === 'ASC' ? 'DESC' : 'ASC';
}


function addTableColumnsSwappingOnClickedFooter(tableAsQueryString, swapperFunction) {
    const lastTableRowCells = getTableRow(tableAsQueryString, getTableHeight(tableAsQueryString) - 1).cells;
    const lastTableRowLength = lastTableRowCells.length;

    doNTimes(lastTableRowLength, (columnIndex) => {
        lastTableRowCells[columnIndex].addEventListener('click', () => {
            const otherColumnIndex = swapperFunction(columnIndex);
            if (enableLogging) console.log("[log][addTableColumnsSwappingOnClickedFooter()] clicked footer of column ", columnIndex, " should be swapped with column ", otherColumnIndex);
            
            const columnData = getTableColumnData(tableAsQueryString, columnIndex, true, true);
            if (enableLogging) console.log("[log][addTableColumnsSwappingOnClickedFooter()] columnIndex: ", columnIndex, " columnData: ", columnData);
            const otherColumnData = getTableColumnData(tableAsQueryString, otherColumnIndex, true, true);
            if (enableLogging) console.log("[log][addTableColumnsSwappingOnClickedFooter()] otherColumnIndex: ", otherColumnIndex, " otherColumnData: ", otherColumnData);

            setTableColumnData(tableAsQueryString, columnIndex, otherColumnData, true, true); // TODO
            setTableColumnData(tableAsQueryString, otherColumnIndex, columnData, true, true); // TODO
        });
    });
}