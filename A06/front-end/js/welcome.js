$(function main() {
    console.log("[log][welcome.js/main()] start")
    const buttonProceed = $("#buttonProceed");


    buttonProceed.click(function () {
        const username = $("#textUsername").val();
        console.log("clicked", buttonProceed);

        // TODO send/store/save the username
        console.log("username:", username);
        const result = $.post("../../back-end/service/session.php",
            {action: 'start', username: username},
            function (data) {
                console.log(`[log] buttonProceed clicked: set username to ${data}`);
                location.href = "../ui/main.html";
            }
            );
        result.fail(function (a, b,c ) {
            console.log("post failed:", a, b, c);
            alert("Failed to send username to backend");
        });


    });
});