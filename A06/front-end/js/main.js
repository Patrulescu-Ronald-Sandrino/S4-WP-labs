$(function main() {
    console.log("[log][main.js/main()] start");

    $("#buttonCreateLogReport").click(function () {
        console.log("clicked buttonCreateLogReport");
        location.href = "../ui/add.html";
    });
    $("#buttonDeleteLogReport").click(function () {
        console.log("clicked buttonDeleteLogReport");
        location.href = "../ui/delete.html";
    });
    $("#buttonViewLogReports").click(function () {
        console.log("clicked buttonViewLogReports");
        location.href = "../ui/view.html";
    });
});