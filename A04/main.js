let lastSorted = "NONE"


function shouldSwap(currentValueCompared, key) {
    return lastSorted === "ASC"
        ? currentValueCompared < key
        : currentValueCompared > key;
}


function sortTable(columnIndex) {
    let array = [2, 1, 4, 2, 5];
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