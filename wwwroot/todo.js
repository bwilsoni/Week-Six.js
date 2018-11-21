class Todo {

    constructor(title, dueDate) {
        // this.id;
        this.title = title;
        this.dueDate = dueDate;
        this.isComplete = false;
    }

    getID(todoList) {
        return todoList.indexOf(this);
    }

    get generateHTML() {
        // <li>ID: ${this.id}</li>
        let todoTemplate = `
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