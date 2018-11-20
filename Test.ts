import { read } from "fs";

/* Promise
Class
Service Class
JSON objects
mark things as done
Typescript
*/

const http = require('http');
const hostname = 'localhost';
const express = require('express');
var bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000
const todoList = [];

/*  Class: Todo
    Properties: id, title, dueDate, isComplete

Example Object
{
    "id: 1234,
    "title": "etst",
    "dueDate": "12/25/18",
    "isComplete": false
}
*/

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
// todoList.push(new Todo("Test1", "Today"));
// todoList.push(new Todo("Test2", "Tommorrow"));
// todoList.push(new Todo("Test3", "Friday"));

function createTestData(howMany: number) {
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

// Creates random test data for todoList, pass a number of items to create
createTestData(10);

// console.log("Test Data in todoList", todoList);
// console.log(`ID: ${todoList[2].getID()}`)

class TodoService {
    /**
     * Get All Todo Items
     */
    static getAllTodos(res) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');

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
            });
            todoHTML += html.replace("{{replaceme}}", itemHTML);
        });


        // let endHTML = orderedList.replace("{{replaceme}}", todoHTML);
        // let endHTML = `<h1>ToDo</h1> ${orderedList.replace("{{replaceme}}", todoHTML)}`;
        // console.log(endHTML);
        res.end(`<h1>ToDo</h1> ${orderedList.replace("{{replaceme}}", todoHTML)}`);
    };

    /**
     * Get Single Todo Item
     * Possible error handling for checking index out of range of todoList
     */
    static getSingleTodos(res, id) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');

        // console.log(`ID Raw: ${id}`);
        // console.log(typeof id);
        // console.log(todoList[id]);

        let idNum = Number(id);

        //  Test to make sure id is valid
        if (isNaN(idNum) || !(typeof idNum === 'number') || typeof todoList[idNum] === 'undefined') {
            res.end(`<h1>${id} is not a ToDo item. Check /todo to see all todos.`)
        }

        let todo = todoList[id];

        let todoTemplate = `
        <ul>
        <li>ID: ${todo.getID()}</li>
        {{replaceme}}
        </ul>`;

        let todoProperties = `
        <li>{{replaceme}}</li>`;

        let html = ``;

        Object.keys(todo).forEach(prop => {
            html += todoProperties.replace("{{replaceme}}", `${prop}  :  ${todo[prop]}`);
        });

        // console.log(`<h1>Single ToDo</h1> ${todoTemplate.replace("{{replaceme}}", html)}`)
        res.end(`<h1>Single ToDo</h1> ${todoTemplate.replace("{{replaceme}}", html)}`);
    }

    /**
     * Create Todo Item
     */
    static createTodo(res, body) {
        console.log(typeof body)
        console.log(body);

        console.log(typeof body.title);

        todoList.push(new Todo(body.title, body.dueDate));
        console.log(todoList);
        res.send(`<h1>Hey There</h1>`);
        // app.post('/todo', (req, res) => createTodo(res, req.body))
    }

    /**
     * Delete Todo Item
     */
    static deleteTodo(res, id) {
        res.send("Done");
        app.delete('/todo/:id', (req, res) => res.send('Hello World!'))
    }
}


// Route to display all todo's
app.get('/todo', (req, res) => TodoService.getAllTodos((res)));
// Route to display a single, specific todo
app.get('/todo/:id', (req, res) => TodoService.getSingleTodos(res, req.params.id))
// Route to create a new Todo item
app.post('/todo', (req, res) => TodoService.createTodo(res, req.body));
// Route to mark a todo item complete
app.delete('');

app.listen(port, () => console.log(`Example app listening on port ${port}!`));