

function getBackButton() {
    let button = document.createElement("button");
    button.innerText = "Back";
    button.id = "buttonBack";
    button.addEventListener('click', () => {
        location.href = "../ui/main.html"; // https://stackoverflow.com/questions/503093/how-do-i-redirect-to-another-webpage
    });
    return button;
}