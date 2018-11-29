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
// const todoList = [];

let todoList = {};

// Creates random test data for todoList, pass a number of items to create
// helpers.createTestData(10, todoList);//

class TodoService {
    /* 
     * Generate unique ID for each Todo item in todoList
     NOT WORKING NOT RETURNING A NUM. OBJS SHOWING UP WITH ID: undefined
     */
    static setID(todoList) {
        return Object.keys(todoList).length + 1;
    }

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

        // Loop through entire container object and console log each obj
        for (const id in todoList) {
            if (todoList.hasOwnProperty(id)) {
                todoHTML += todoList[id].generateHTML
            };
        };

        res.end(`<h1>ToDo</h1> ${orderedList.replace("{{replaceme}}", todoHTML)}`);
    };

    /**
     * Get Single Todo Item
     * Possible error handling for checking index out of range of todoList
     */
    static getTodo(res, id) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');

        // Check for object matching id key in todoList
        if (!(id in todoList)) {
            console.log(`ToDo ${id} doesn't exist`);
            res.end(`<h1>${id} does not exist in ToDo List</h1>`);
            return;
        }
        else {
            console.log(`Generating Single TODO page with ID: ${id}`)
            res.end(`<h1>Single ToDo - ID: ${id}</h1> ${todoList[id].generateHTML}`);
        }
    }

    /**
     * Create Todo Item
     */
    static createTodo(res, body, todoList) {
        // Object container imp.
        todoList[TodoService.setID(todoList)] = new Todo(body.title, body.dueDate);
        res.redirect("/");
    }

    /**
     * Delete Todo Item
     */
    static deleteTodo(res, id) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');

        // If ToDo doesn't exist display error message
        if (!(id in todoList)) {
            console.log(`${id} does not exist as a todo.`)
            res.end(`<h1>${id} is not a ToDo item. Check /todo to see all todos.`)
        }
        // Mark ToDo item as completed
        else {
            todoList[id].isComplete = true;
            res.redirect("/");
        }
    }
}

// Route to display all todo's
app.get('/todo', (req, res) => TodoService.getAllTodos(res));
// Route to display a single, specific todo
app.get('/todo/:id', (req, res) => TodoService.getTodo(res, req.params.id))
// Route to create a new Todo item
app.post('/todo', (req, res) => TodoService.createTodo(res, req.body, todoList));
// Route to mark a todo item complete
app.delete('/todo/:id', (req, res) => TodoService.deleteTodo(res, req.params.id))

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
