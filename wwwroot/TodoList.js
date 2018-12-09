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
        for (const todoID in this.items) {
            if (this.items.hasOwnProperty(todoID)) {
                todoHTML += this.items[todoID].generateHTML(todoID)
            };
        };

        todoHTML = orderedList.replace("{{replaceme}}", todoHTML)
        return todoHTML;
    }
}

if (typeof (module) !== "undefined") {
    module.exports = TodoList;
}