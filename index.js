const { fork } = require("child_process");

console.log("Running main.js");
console.log("Forking a new subprocess....");

const numberOfChilds = 4
const work = Array.from(Array(100).keys())


for (let index = 1; index <= numberOfChilds; index++) {

    const child = fork("child.js");

    child.send({ childId: index, data: work.splice(0, 10) })

    console.log("main process is still running...");

    child.on('message', function (message) {
        console.log("message from child: ", JSON.stringify(message));
        child.send({ childId: index, data: work.splice(0, 10) })
    })

    child.on("close", function (code) {
        console.log("child process exited with code " + code);
    });

}

