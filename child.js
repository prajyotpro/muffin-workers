// child.js content
const runTime = [1000, 2000, 3000, 4000, 5000, 6000]

process.on("message", async function (message) {
    console.log(`Message from main.js: ${JSON.stringify(message)}`);
    try {
        const res = await doSomething();
        process.send("completed: " + message.childId + " in: " + res + " sec");
    } catch (error) {
        console.log("error: ", JSON.stringify(error))
    }

    if (!message.data.length) {
        console.log("exiting process: " + message.childId);
        process.exit();
    }
});



function doSomething() {
    const res = runTime[Math.floor(Math.random() * 5)]
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            return resolve(res)
        }, res);
    })
}