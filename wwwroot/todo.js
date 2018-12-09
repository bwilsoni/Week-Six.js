class Todo {
    constructor(title, dueDate) {
        this.title = title;
        this.dueDate = dueDate;
        this.isComplete = false;
    }

    generateHTML(todo) {
        let todoTemplate = `
        <strong>todo: ${todo}  <button todo="${todo}" class="completeMe">Mark Completed</button></strong>
        <ul>
        {{replaceme}}
        </ul>`;

        let todoProperties = `
        <li>{{replaceme}}</li>`;

        let html = ``;

        Object.keys(this).forEach(prop => {
            html += todoProperties.replace("{{replaceme}}", `${prop}  :  ${this[prop]}`);
        });

        html = `${todoTemplate.replace("{{replaceme}}", html)}`
        return html;
    }
}

class TodoList {
    constructor() {
        this.items = {};
    }

    generateHTML() {
        let orderedList = `
        <ol>
        {{replaceme}}
        </ol>
        `

        let todoHTML = '';

        // Loop through entire container object
        for (const todo in this.items) {
            if (this.items.hasOwnProperty(todo)) {
                todoHTML += this.items[todo].generateHTML(todo)
            };
        };
    }
}


if (typeof (module) !== "undefined") {
    module.exports = Todo;
    module.exports = TodoList;
}