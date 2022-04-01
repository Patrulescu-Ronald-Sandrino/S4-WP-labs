'use strict';



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