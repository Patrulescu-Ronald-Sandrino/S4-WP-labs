$(function main() {
    console.log(`[log][main.js][main()] start`);

    $("#buttonCreateLogReport").click(function () {
        console.log(`[log][main.js][main()] #buttonCreateLogReport.click()`);
        location.href = "../ui/add.html";
    });
    $("#buttonDeleteLogReport").click(function () {
        console.log(`[log][main.js][main()] #buttonDeleteLogReport.click()`);
        location.href = "../ui/delete.html";
    });
    $("#buttonViewLogReports").click(function () {
        console.log(`[log][main.js][main()] #buttonViewLogReports.click()`);
        location.href = "../ui/view.html";
    });

    $("#buttonLogOut").click(function () {
        console.log(`[log][main.js][main()] #buttonLogOut.click()`);

        $.post(
            "../../back-end/service/session.php",
            {action: 'logout'},
            function (data) {
                console.log(`[log][main.js][#buttonLogOut.click()] POST logout result: `, data);
                location.href = "../ui/goodbye.html";
            }
        )
        .fail(function (a, b, c) {
            console.log(`[log][main.js][#buttonLogOut.click()] POST logout failed:`);
            console.log('a = ', a);
            console.log('b = ', b);
            console.log('c = ', c);
        });
    });

    checkLogIn();
});