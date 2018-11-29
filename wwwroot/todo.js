class Todo {

    constructor(title, dueDate) {
        this.title = title;
        this.dueDate = dueDate;
        this.isComplete = false;
    }

    generateHTML(id) {
        let todoTemplate = `
        <strong>ID: ${id}  <button id="${id}" class="completeMe">Mark Completed</button></strong>
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




if (typeof (module) !== "undefined") {
    module.exports = Todo;
}