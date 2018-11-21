if (typeof (require) !== "undefined") {
    Todo = require("./todo.js");
};

function createTestData(howMany, todoList) {
    for (let index = 0; index < howMany; index++) {
        todoList.push(new Todo(`${makeid()}`, `${howMany} day's from now`))
    }
}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 15; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

if (typeof (module) !== "undefined") {
    module.exports = {
        makeid: makeid,
        createTestData: createTestData
    }
}