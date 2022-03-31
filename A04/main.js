let lastSorted = "NONE";
main();

function main() {
    assignHandlerToTableHeaders();
}

function assignHandlerToTableHeaders() { // TODO: add parameters table and handler
    // TODO: for every th assign the function clickedTableHeader(index)
}

function clickedTableHeader() {

}

function isTableColumnIndexValid(table, columnIndex) {
    const columnsCount = table.getElementsByTagName("th").length;

    if (columnIndex > columnsCount) {
        return "Given index: ${0} should be < the # of columns in the given table, i.e. less than ${1}".format(columnIndex, columnsCount); // string format
    }

    return true;
}

// returns an Array of all the tds of a column
function getTableColumn(table, columnIndex) { // getTableColumn(document.getElementById("myTable"), 1);
    { // check the columnIndex
        const isTableColumnIndexValidResult = isTableColumnIndexValid(table, columnIndex);
        if (isTableColumnIndexValidResult !== true) {
            console.log(isTableColumnIndexValidResult);
            return;
        }
    }

    // document.getElementById("myTable").getElementsByTagName("th")[2] = document.getElementById("myTable").getElementsByTagName("th")[1]
    // Array.from(document.getElementById("myTable").getElementsByTagName("tr")).slice(1).map(tr => tr.getElementsByTagName("td")[2]).forEach(td => td.innerText = "2")
    return Array.from(table.getElementsByTagName("tr")).slice(1).map(tr => tr.getElementsByTagName("td")[columnIndex]);
}

function setTableColumn() {

}

function shouldSwap(currentValueCompared, key) {
    return lastSorted === "ASC"
        ? currentValueCompared < key
        : currentValueCompared > key;
}


function sortArray(array, sorter) {
    // let array = [2, 1, 4, 2, 5];
    let length = array.length; // TODO array = document.getElements....

    console.log("lastSorted = " + lastSorted);

    for (let i = 1; i < length; i++) {
        let key, j;

        key = array[i];
        j = i - 1;

        while (j >= 0 && shouldSwap(array[j], key)) {
            array[j + 1] = array[j]
            j = j - 1;
        }
        array[j + 1] = key;
    }
    console.log(array);
}

// var a = [ 'x', 'y', 23 ];
// a.Test = "foo";
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
// eval("plm += 3");
//
// console.log(plm);


/* Some references
    - string format https://www.tutorialstonight.com/javascript-string-format.php
 */