class Todo {

    constructor(title, dueDate) {
        this.id;
        this.title = title;
        this.dueDate = dueDate;
        this.isComplete = false;
    }

    getID (todoList) {
        return todoList.indexOf(this);
    }
}

if (typeof(module) !== "undefined") {
    module.exports = Todo;
}