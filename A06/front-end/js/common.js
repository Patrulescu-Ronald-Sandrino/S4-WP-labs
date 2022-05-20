

// TODO: on window.close => onunload (sau beforeunload)

function getBackButton() {
    let button = document.createElement("button");
    button.innerText = "Back";
    button.id = "buttonBack";
    button.addEventListener('click', () => {
        location.href = "../ui/main.html"; // https://stackoverflow.com/questions/503093/how-do-i-redirect-to-another-webpage
    });
    return button;
}

function getResultDiv(message = "") {
    let div = document.createElement("div");
    div.innerText = "Result: " + message;
    div.id = "divResult";
    return div;
}

function showFailOutputWithMessage(message) {
    return function (a, b, c) {
        console.log(message);
        console.log('a = ', a);
        console.log('b = ', b);
        console.log('c = ', c);
    };
}

function getUsernameWithCallback(callback) {
    $.get(
        "../../back-end/service/session.php",
        {action: 'getUsername'},
        callback
    )
    .fail(showFailOutputWithMessage(`[log][getUsername()] failed to get username:`));
}


function getUsername() {
    let username = "";
    $.get(
        "../../back-end/service/session.php",
        {action: 'getUsername'},
        function (data) {
            username = data;
            console.log(`[getUsername()] username is ${data}`)
            return username;
        }
    )
    .fail(function (a, b, c) {
        console.log(`[log][getUsername()] failed to get username:`);
        console.log('a = ', a);
        console.log('b = ', b);
        console.log('c = ', c);
        return username;
    });
    return username;
}

function getUsernameSynchronously() { // TODO: replace with callbacks. BUT HOW?
    $.ajaxSetup({async:false});
    const username = getUsername();
    $.ajaxSetup({async:true});
    return username;
}


function checkLogIn() {
    const username = getUsernameSynchronously();
    if (username === "") {
        console.log(`[log][checkLogIn()] username not set; redirecting to welcome page`);
        location.href = "../ui/welcome.html";
    } else {
        console.log(`[log][checkLogIn()] username: ${username}`);
    }
}