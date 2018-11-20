/* Promise
Class
Service Class
JSON objects
mark things as done
Typescript

Example Object
{
    "id: 1234,
    "title": "etst",
    "dueDate": "12/25/18",
    "isComplete": false
}
*/

const http = require('http');

const hostname = 'localhost';
const express = require('express');
const app = express();
const port = 3000

const todoList = [];

class Todo {
    title: string;
    dueDate: string;
    isComplete: boolean;
    id: number;
    constructor(title, dueDate) {
        this.id;
        this.title = title;
        this.dueDate = dueDate;
        this.isComplete = false;
    }

    getID() {
        return todoList.indexOf(this);
    }
};

// Test Data to send to browser
todoList.push(new Todo("Test1", "Today"));
todoList.push(new Todo("Test2", "Tommorrow"));
todoList.push(new Todo("Test3", "Friday"));


// console.log("Test Data in todoList", todoList);
// console.log(`ID: ${todoList[2].getID()}`)

class TodoService {
    /**
     * Get All Todo Items
     */
    static getAllTodos(res) {

        let orderedList = `
        <ol>
        {{replaceme}}
        </ol>
        `

        let todoHTML = '';

        todoList.forEach((todo) => {
            let html = `
            <li>ID: ${todo.getID()}</li>
            <ul>{{replaceme}}
            </ul>
            `;

            let todoProperties = `
            <li>{{replaceme}}</li>`;

            let itemHTML = ``;
            Object.keys(todo).forEach(prop => {
                itemHTML += todoProperties.replace("{{replaceme}}", `${prop}  :  ${todo[prop]}`);
            })
            todoHTML += html.replace("{{replaceme}}", itemHTML);
        });

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        // let endHTML = orderedList.replace("{{replaceme}}", todoHTML);
        // let endHTML = `<h1>ToDo</h1> ${orderedList.replace("{{replaceme}}", todoHTML)}`;
        // console.log(endHTML);
        res.end(`<h1>ToDo</h1> ${orderedList.replace("{{replaceme}}", todoHTML)}`);
    };


    /**
     * Get Single Todo Item
     */
    getSingleTodos(res, id) {
        res.send("Done");
        // app.get('/todo/:id', (req, res) => getSingleTodos(res, req.params.id))
    }


    /**
     * Create Todo Item
     */
    createTodo(res, todo) {
        console.log(todo);
        res.send("Done");
        // app.post('/todo', (req, res) => createTodo(res, req.body))
    }


    /**
     * Delete Todo Item
     */
    deleteTodo(res, id) {
        res.send("Done");
        app.delete('/todo/:id', (req, res) => res.send('Hello World!'))
    }


}

let thing = new TodoService();
// thing.getAllTodos

app.get('/todo', (req, res) => TodoService.getAllTodos((res)));
// app.get('/todo', )
app.listen(port, () => console.log(`Example app listening on port ${port}!`));