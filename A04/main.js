let lastSorted


function sortTable(columnIndex) {
    if (typeof lastSorted === 'undefined') {
        console.log("lastSorted === undefined");
    }
    else if (lastSorted === "ASC") {
        console.log("lastSorted === ASC");
    }
    else if (lastSorted === "DESC") {
        console.log("lastSorted === DESC");
    }
    else {
        console.log("lastSorted has unknown value");
    }
}


var a = [ 'x', 'y', 23 ];
a.Test = "foo";
for (i=0; i<a.length; i++) {
    console.log(a[i]);
}  	// will print: x, y, 23
for (var i in a) {
    console.log(i);
}	// will print: 0, 1, 2, test
for (var i of a) {
    console.log(i);
} 	// will print: x, y, 23
a.forEach(function(elem) { console.log(elem); });  // will print  x, y, 23

plm = 2;
eval("plm += 3");

console.log(plm);