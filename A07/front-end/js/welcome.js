$(function main() {
    console.log(`[log][welcome.js][main()] start`)

    $("#buttonProceed").click(function () {
        console.log(`[log][welcome.js][#buttonProceed.click()] start`,);
        const username = $("#textUsername").val();

        if (username === "") {
            alert("Username must not be null");
            return;
        }

        console.log(`[log][welcome.js][#buttonProceed.click()] sending username: ${username}`);
        $.post(
            "../../back-end/service/session.php",
            {action: 'login', data: username},
            function (data) {
                console.log(`[log][welcome.js][#buttonProceed.click()] received: ${data}`)
                location.href = "../ui/main.html";
            })
        .fail(function (a, b, c) {
            console.log(`[log][welcome.js][#buttonProceed.click()] sending username failed`);
            console.log('a = ', a);
            console.log('b = ', b);
            console.log('c = ', c);

            alert("Log in failed");
        });
    });
});