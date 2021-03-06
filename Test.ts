const http = require('http');
const hostname = 'localhost';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var Todo = require("./wwwroot/todo.js"); 
var helpers = require("./wwwroot/helpers.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('wwwroot'));

const port = 3000;
const todoList = [];

// Creates random test data for todoList, pass a number of items to create
// helpers.createTestData(10, todoList);//

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

        todoList
            .filter((todo) => !todo.isComplete)
            .forEach((todo) => {

                let id = todo.getID(todoList);

                let html = `
                    <li class="imSpecific">
                        <strong>ID: ${id}</strong>
                        <ul>
                            {{replaceme}}
                        </ul>
                        <button id="${id}" class="completeMe">Mark Completed</button>
                        <br />
                        <br />
                    </li>
                `;
    
                let todoProperties = `
                    <li>
                        {{replaceme}}
                    </li>`;

                let itemHTML = ``;

                Object
                    .keys(todo)
                    .forEach(prop => {
                        itemHTML += todoProperties
                            .replace("{{replaceme}}", `${prop}  :  ${todo[prop]}`);
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
    static getTodo(res, id) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');

        // console.log(`ID Raw: ${id}`);
        // console.log(typeof id);
        // console.log(todoList[id]);

        let idNum = Number(id);

        //  Test to make sure id is valid
        if (isNaN(idNum) || !(typeof idNum === 'number') || typeof todoList[idNum] === 'undefined') {
            res.end(`<h1>${id} is not a ToDo item. Check /todo to see all todos.</h1>`)
            return
        }

        let todo = todoList[id];

        let todoTemplate = `
        <ul>
        <li>ID: ${todo.getID(todoList)}</li>
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

        let id = todoList.push(new Todo(body.title, body.dueDate));
        console.log(todoList);

        // this.getTodo(res, id - 1);

        // res.send(`<h1>Hey There</h1>`);
        // app.post('/todo', (req, res) => createTodo(res, req.body))
        res.redirect("/");
    }

    /**
     * Delete Todo Item
     */
    static deleteTodo(res, id) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');

        let idNum = Number(id);

        // Test to make sure id is valid
        if (isNaN(idNum) || !(typeof idNum === 'number') || typeof todoList[idNum] === 'undefined') {
            res.end(`<h1>${id} is not a ToDo item. Check /todo to see all todos.`)
        }
        else {
            // Mark Todo complete
            todoList[id].isComplete = true;

            // Display completed Todo
            this.getTodo(res, id);
        }
    }
}


// Route to display all todo's
app.get('/todo', (req, res) => TodoService.getAllTodos(res));
// Route to display a single, specific todo
app.get('/todo/:id', (req, res) => TodoService.getTodo(res, req.params.id))
// Route to create a new Todo item
app.post('/todo', (req, res) => TodoService.createTodo(res, req.body));
// Route to mark a todo item complete
app.delete('/todo/:id', (req, res) => TodoService.deleteTodo(res, req.params.id))

app.listen(port, () => console.log(`Example app listening on port ${port}!`));