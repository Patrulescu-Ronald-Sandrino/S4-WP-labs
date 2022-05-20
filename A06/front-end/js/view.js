const apiUrl = "../../back-end/service/Controller.php";
const PAGE_SIZE = 4;

const getTableBody = () => $("#logTableBody")[0];

$(function main() {
    checkLogIn();
    document.body.appendChild(getBackButton());
    addLogLevelsToSelect();

    // TODO: previous page click
    // TODO: next page click
    // TODO: show all click
    // TODO: show mine click

    // TODO: remove on delete key + confirmation dialog

    callBackOnGetLogReports(data => console.log(data));
});

function addLogLevelsToSelect() {
    $.getJSON(
        apiUrl,
        {action: 'getLogLevels'},
        function (data) {
            // console.log("getJSON(getLogLevels) data =", data);
            const selectLevel = $("#selectLogLevel");
            // console.log("getJSON(getLogLevels) selectLevel =", selectLevel);

            data.forEach(logLevel => {
                selectLevel.append(`<option value="${logLevel}">${logLevel}</option>`);
            });
        });
}


function callBackOnGetLogReports(callback) {
    $.getJSON(apiUrl,
        {action: 'getAll'},
        callback);
}