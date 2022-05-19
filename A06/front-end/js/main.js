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

        // const username = "dummy";
        // $.post(
        //     "../../back-end/service/session.php",
        //     {action: 'login', data: username},
        //     function (data) {
        //         console.log(`[log][welcome.js][#buttonProceed.click()] received: ${data}`)
        //         // location.href = "../ui/main.html";
        //     })
        //     .fail(function (a, b, c) {
        //         console.log(`[log][welcome.js][#buttonProceed.click()] sending username failed`);
        //         console.log('a = ', a);
        //         console.log('b = ', b);
        //         console.log('c = ', c);
        //
        //         alert("Log in failed");
        //     });

        // $.post(
        //     "../../back-end/service/session.php",
        //     {action: 'test', data: 'dummy'},
        //     function (data) {
        //         console.log(`[log][welcome.js][#buttonLogOut.click()] POST test result: `, data);
        //     })
        //     .fail(function (a, b, c) {
        //         console.log(`[log][welcome.js][#buttonLogOut.click()] POST test failed:`);
        //         console.log('a = ', a);
        //         console.log('b = ', b);
        //         console.log('c = ', c);
        //     });

        $.post(
            "../../back-end/service/session.php",
            {action: 'logout'},
            function (data) {
                console.log(`[log][welcome.js][#buttonLogOut.click()] POST logout result: `, data);
                location.href = "../ui/welcome.html";
            }
        )
        .fail(function (a, b, c) {
            console.log(`[log][welcome.js][#buttonLogOut.click()] POST logout failed:`);
            console.log('a = ', a);
            console.log('b = ', b);
            console.log('c = ', c);
        });
    })


    // const getUsernameResult = $.get(
    //     "../../back-end/service/session.php",
    //     {action: 'getUsername'},
    //     function (username) {
    //         console.log(`[log][main.js] username set to ${username}`)
    //     }
    // );
    // getUsernameResult.fail(function (a, b, c) {
    //     console.log(`[log][main.js] getUsername failed`)
    //     console.log(a)
    //     console.log(b)
    //     console.log(c)
    // });
});