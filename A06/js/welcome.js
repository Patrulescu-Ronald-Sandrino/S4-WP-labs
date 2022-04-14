$(function main() {
    console.log("[log][welcome.js/main()] start")
    const buttonProceed = $("#buttonProceed");


    buttonProceed.click(function () {
        console.log("clicked", buttonProceed);
        console.log("value:", $("#textUsername").val()); // TODO send the username
        // TODO: change to main
        $.getJSON("service");
    });
});