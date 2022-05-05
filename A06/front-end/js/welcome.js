$(function main() {
    console.log("[log][welcome.js/main()] start")
    const buttonProceed = $("#buttonProceed");


    buttonProceed.click(function () {
        console.log("clicked", buttonProceed);

        // TODO send/store/save the username
        console.log("value:", $("#textUsername").val());
        // $.getJSON("service");

        location.href = "../ui/main.html";
    });
});