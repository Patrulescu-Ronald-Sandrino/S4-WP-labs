const apiUrl = "../../back-end/service/Controller.php";
const PAGE_SIZE = 4;

let currentPage = 0;
let lastPage = 0;
let showingMode;


$(function main() {
    checkLogIn();
    document.body.appendChild(getBackButton());
    addLogLevelsToSelect();

    $("#tablePreviousPage").click(() => {
        if (currentPage > 0) {
            currentPage--;
            insertLogsByShowingMode();
        }
    });

    $("#tableNextPage").click(() => {
        if (currentPage < lastPage) {
            currentPage++;
            insertLogsByShowingMode();
        }
    });

    $("#tableShowAll").click(() => {
       showingMode = 'all';
       insertLogsByShowingMode();
    });

    $("#tableShowMine").click(() => {
       showingMode = 'mine';
       insertLogsByShowingMode();
    });

    let $selectLogLevel = $("#selectLogLevel");
    $selectLogLevel.change(() => {
        console.log(`select Log Level changed ${$selectLogLevel.val()}`)
        showingMode = 'byLevel';
        insertLogsByShowingMode();
    });

    // TODO: remove on delete key + confirmation dialog

    callBackOnGetLogReports(data => {
        console.log(data);
        console.log(data[0]);
        console.log(data[0]['id']);
    });

    showingMode = 'all';
    insertLogsByShowingMode();
});

function insertLogsByShowingMode() {
    callBackOnGetLogReports((allLogs) => {
        const currentTableBody = $('#logTableBody')[0];
        const newTableBody = document.createElement('tbody');
        newTableBody.id = currentTableBody.id;

        console.log(`[log][view.js][insertLogsByShowingMode()] allLogs = `, allLogs);
        let newLogs;
        switch (showingMode) {
            case 'all': newLogs = allLogs; break;
            case 'mine': {
                const username = getUsernameSynchronously();
                newLogs = filterLogs(allLogs, log => log['username'] = username);
                break;
            }
            case 'byLevel': newLogs = filterLogs(allLogs, log => log['level'] = $("#selectLogLevel").val()); break;
            default: console.log('[log][view.js][insertLogsByShowingMode()] not a valid showingMode'); return;
        }
        console.log(`[log][view.js][insertLogsByShowingMode()] newLogs = `, newLogs);
        insertLogsInTableBody(newTableBody, newLogs);
        currentTableBody.replaceWith(newTableBody);
    });
}

function insertLogsInTableBody(newTableBody, newLogs) {
    console.log(`[log][view.js][insertData()] newLogs = `, newLogs);
    const numberOfLogs = newLogs.length;
    const numberOfPages = Math.ceil(numberOfLogs / PAGE_SIZE);
    lastPage = numberOfPages - 1;
    console.log(`[log][view.js][insertData()] numberOfLogs = `, numberOfLogs, `numberOfPages = `, numberOfPages);
    // TODO
    for (let log of newLogs) {
        let newRow = newTableBody.insertRow();

    }
    for (const [index, log] of newLogs.entries()) { // https://stackoverflow.com/questions/10179815/get-loop-counter-index-using-for-of-syntax-in-javascript
        // TODO: only for the current page
    }

}

const getTableBody = () => $("#logTableBody")[0];


function filterLogs(logs, predicate) {
    return logs.filter(predicate);
}

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