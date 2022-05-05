function displayAddResult(message) {
    console.log("displayAddResult() message = ", message);
    $("#divResult").replaceWith($(getResultDiv(message))); // https://stackoverflow.com/questions/625936/how-can-i-convert-a-dom-element-to-a-jquery-element

}

$(function main() {
    const apiUrl = "../../back-end/service/Controller.php";
    document.body.appendChild(getBackButton()); // https://www.hongkiat.com/blog/jquery-insert-element-part1/

    // add options in select
    $.getJSON(
        apiUrl,
        {action: 'getLogLevels'},
        function (data) {
            // console.log("getJSON(getLogLevels) data =", data);
            const selectLevel = $("#selectLevel");
            // console.log("getJSON(getLogLevels) selectLevel =", selectLevel);

            selectLevel.append(`<option value="">None</option>`);
            data.forEach(logLevel => {
                selectLevel.append(`<option value="${logLevel}">${logLevel}</option>`);
            });
        });

    // https://www.codexpedia.com/javascript/submitting-html-form-without-reload-the-page/
    $(document).on('submit', '#formAdd', function () {
        const level = $("#selectLevel").find(":selected").text();
        const message = $("#addTextArea").get(0).value;

        console.log(`buttonAdd clicked with username: ${"TODO"} level: ${level} message: ${message}`);

        $.getJSON(apiUrl,
            {action: "add", username: "HARD-CODED USERNAME", level: level, message: message},
            displayAddResult);

        return false;
    });

    // $("#buttonAdd").click(() => {
    //     const level = $("#selectLevel").find(":selected").text();
    //     const message = $("#addTextArea").get(0).value;
    //
    //     console.log(`buttonAdd clicked with username: ${"TODO"} level: ${level} message: ${message}`);
    //
    //     $.getJSON(apiUrl,
    //         {action: "add", username: "HARD-CODED USERNAME", level: level, message: message},
    //         displayAddResult);
    //
    //     /// TODO: use this, if $.getJSON() doesn't work
    //     // let result = $.ajax({
    //     //     url: "../../back-end/service/Controller.php",
    //     //     // contentType: 'application/json',
    //     //     action: 'add',
    //     //     dataType: "json",
    //     //     async: true,
    //     //     data: {action: "add", username: "HARD-CODED USERNAME", level: "", message: ""},
    //     //     // success: function (data) {
    //     //     //     data = JSON.parse(data)
    //     //     //     console.log("data=" + data);
    //     //     //     alert(data);
    //     //     // }
    //     // });
    //     // result.done(function (data) {
    //     //     console.log("result.done(): data =", data) // works
    //     //     alert(data);}
    //     // );
    //     // result.fail(function (a, b, c) {
    //     //     console.log(a)
    //     //     console.log(a.responseText);
    //     //     console.log(b)
    //     //     console.log(c)
    //     // })
    //     // console.log(result)
    //
    //
    //     // $.getJSON("../../back-end/service/Controller.php",
    //     //     {action: "add", username: "HARD-CODED USERNAME", level: "", message: ""},
    //     //     function (result) {
    //     //         console.log("result =", result);
    //     //         console.log("result.scalar =", result["scalar"]);
    //     //     }
    //     //    );
    // });

    document.body.appendChild(getResultDiv());
});