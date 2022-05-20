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

    // callBackOnGetLogReports(data => {
    //     console.log(data);
    //     console.log(data[0]);
    //     console.log(data[0]['id']);
    // });

    showingMode = 'all';
    insertLogsByShowingMode();
});

function insertLogsByShowingMode() {
    callBackOnGetLogReports((allLogs) => {
        const currentTableBody = getTableBody();
        const newTableBody = document.createElement('tbody');
        newTableBody.id = currentTableBody.id;

        console.log(`[log][view.js][insertLogsByShowingMode()] allLogs = `, allLogs);
        let newLogs;
        switch (showingMode) {
            case 'all': newLogs = allLogs; break;
            case 'mine': {
                const username = getUsernameSynchronously();
                newLogs = filterLogs(allLogs, log => log['username'] === username);
                break;
            }
            case 'byLevel': newLogs = filterLogs(allLogs, log => log['level'] === $("#selectLogLevel").val()); break;
            default: console.log('[log][view.js][insertLogsByShowingMode()] not a valid showingMode'); return;
        }
        console.log(`[log][view.js][insertLogsByShowingMode()] newLogs = `, newLogs);
        insertLogsInTableBody(newTableBody, newLogs);
        currentTableBody.replaceWith(newTableBody);
    });
}

function insertLogsInTableBody(newTableBody, newLogs) {
    const numberOfLogs = newLogs.length;
    const numberOfPages = Math.ceil(numberOfLogs / PAGE_SIZE);
    lastPage = numberOfPages - 1;
    console.log(`[log][view.js][insertData()] numberOfLogs = `, numberOfLogs, `numberOfPages = `, numberOfPages, 'currentPage (0-indexing) = ', currentPage);
    const username = getUsernameSynchronously();

    const startIndex = currentPage * PAGE_SIZE;
    const endIndexExclusive = startIndex + PAGE_SIZE;
    // console.log(newLogs.slice(startIndex, endIndexExclusive));
    for (const [index, log] of newLogs.slice(startIndex, endIndexExclusive).entries()) { // https://stackoverflow.com/questions/10179815/get-loop-counter-index-using-for-of-syntax-in-javascript
        // console.log(index, log);
        let newRow = newTableBody.insertRow();
        let newColumn = newRow.insertCell();
        newColumn.appendChild(document.createTextNode((startIndex + index + 1)));

        Object.values(log).slice(1).forEach(value => {
            let newColumn = newRow.insertCell();
            newColumn.appendChild(document.createTextNode(value.toString()));
        });

        // a new node, on click, callback with parameter log['id']
        if (log['username'] === username) {
            // let deleteButton = $(document.createElement('button'));
            let deleteButton = document.createElement('button');
            deleteButton.innerText = "Delete";
            deleteButton.onclick = () => {
                let id = log['id'];
                $.getJSON(apiUrl,
                    {action: "remove", id: id}, () => {
                    insertLogsByShowingMode();
                });
            };

            // deleteButton.onclick = () => {
            //     let id = log['id'];
            //     $.getJSON(apiUrl,
            //         {action: "remove", id: id},
            //         () => {
            //             insertLogsByShowingMode();
            // };
            let newColumn = newRow.insertCell();
            newColumn.appendChild(deleteButton);
        }

        newTableBody.append(newRow);
        // Object.values(log).forEach(x => console.log(x));
    }

    $('#tableNextPage').prop('disabled', currentPage === lastPage);
    $('#tablePreviousPage').prop('disabled', currentPage === 0);
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
            // $('#selectLogLevel option').last().attr('selected', true);
            // console.log($('#selectLogLevel option:selected'));
            // console.log($('#selectLogLevel option').removeAttr('selected'));
        });
}


function callBackOnGetLogReports(callback) {
    $.getJSON(apiUrl,
        {action: 'getAll'},
        callback);
}