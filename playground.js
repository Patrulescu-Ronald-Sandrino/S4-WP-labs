main()


function main() {
    // fillArray();
    doNTimes(2, (i) => {console.log(i)})
}

function fillArray() {
    console.log(Array(2).fill(2));
    console.log(Array(6).fill('NONE'));
}

function doNTimes(N, functionToExecute) {
// function doNTimes(N, functionToExecute = (i) => { console.log(i); }) {
    for (let i = 0; i < N; i++) {
        // functionToExecute(i = 0);
        const dup = i;
        functionToExecute(dup);
        functionToExecute();
        // console.log(i);
    }
}