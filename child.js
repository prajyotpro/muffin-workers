// child.js content
process.on("message", async function (message) {
    console.log(`Message from main.js: ${JSON.stringify(message)}`);
    try {
        await doSomething();
    } catch (error) {
        console.log("error: ", JSON.stringify(error))
    }

    process.send("completed: " + message.childId);

    if (!message.data.length) {
        console.log("exiting process: " + message.childId);
        process.exit();
    }
});



function doSomething() {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            return resolve("2 sec done")
        }, 2000);
    })
}