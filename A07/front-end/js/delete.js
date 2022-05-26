$(function main() {
    checkLogIn();
    document.body.appendChild(getBackButton());
    document.body.appendChild(getResultDiv());
    // $("#divResult").replaceWith($(getResultDiv("adsadsa"))); // https://stackoverflow.com/questions/625936/how-can-i-convert-a-dom-element-to-a-jquery-element


    $("#buttonDelete").click(function () {
        console.log(`[log][delete.js][#buttonDelete.click()] start:`);
        // TODO: call controller
        $.post(
            "../../back-end/service/Controller.php",


        )
        .fail(showFailOutputWithMessage(`[log][delete.js][#buttonDelete.click()] POST failed:`));
    });
});