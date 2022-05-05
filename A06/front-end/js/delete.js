$(function main() {
    document.body.appendChild(getBackButton());

    $("#buttonDelete").click(function () {
        console.log("clicked buttonDelete");
        // TODO: call controller
    });

    document.body.appendChild(getResultDiv());
    // $("#divResult").replaceWith($(getResultDiv("adsadsa"))); // https://stackoverflow.com/questions/625936/how-can-i-convert-a-dom-element-to-a-jquery-element
});