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

    $("#buttonLogOut").click(function () {
        console.log("clicked buttonLogOut");
        location.href = "../ui/welcome.html";
        // TODO: ajax call for destroying the session
        const result = $.post()
    })

    const getUsernameResult = $.get(
        "../../back-end/service/session.php",
        {action: 'getUsername'},
        function (username) {
            console.log(`[log][main.js] username set to ${username}`)
        }
    );
    getUsernameResult.fail(function (a, b, c) {
        console.log(`[log][main.js] getUsername failed`)
        console.log(a)
        console.log(b)
        console.log(c)
    });
});