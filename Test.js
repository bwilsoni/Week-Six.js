var http = require('http');
var hostname = 'localhost';
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Todo = require("./wwwroot/todo.js");
var helpers = require("./wwwroot/helpers.js");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('wwwroot'));
var port = 3000;
// const todoList = [];
var todoList = {};
// Creates random test data for todoList, pass a number of items to create
// helpers.createTestData(10, todoList);//
var TodoService = /** @class */ (function () {
    function TodoService() {
    }
    /*
     * Generate unique ID for each Todo item in todoList
     NOT WORKING NOT RETURNING A NUM. OBJS SHOWING UP WITH ID: undefined
     */
    TodoService.setID = function (todoList) {
        console.log("ID: " + (Object.keys(todoList).length + 1));
        return Object.keys(todoList).length + 1;
    };
    /**
     * Get All Todo Items
     */
    TodoService.getAllTodos = function (res) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        // Loop through entire container object and console log each obj
        for (var id in todoList) {
            if (todoList.hasOwnProperty(id)) {
                console.log(todoList[id]);
            }
        }
        var orderedList = "\n        <ol>\n        {{replaceme}}\n        </ol>\n        ";
        var todoHTML = '';
        // todoList
        // .filter((todo) => !todo.isComplete)
        // .forEach((todo) => {
        // let id = todo.getID(todoList);
        // let html = `
        // <li class="imSpecific">
        // <strong>ID: ${id}</strong>
        // <ul>
        // {{replaceme}}
        // </ul>
        // <button id="${id}" class="completeMe">Mark Completed</button>
        // <br />
        // <br />
        // </li>
        // `;
        // let todoProperties = `
        // <li>
        //     // {{replaceme}}
        //     // </li>`;
        // let itemHTML = ``;
        // Object
        // .keys(todo)
        // .forEach(prop => {
        // itemHTML += todoProperties
        // .replace("{{replaceme}}", `${prop}  :  ${todo[prop]}`);
        // });
        // todoHTML += html.replace("{{replaceme}}", itemHTML);
        // });
        // let endHTML = orderedList.replace("{{replaceme}}", todoHTML);
        // let endHTML = `<h1>ToDo</h1> ${orderedList.replace("{{replaceme}}", todoHTML)}`;
        // console.log(endHTML);
        res.end("<h1>ToDo</h1> " + orderedList.replace("{{replaceme}}", todoHTML));
    };
    ;
    /**
     * Get Single Todo Item
     * Possible error handling for checking index out of range of todoList
     */
    TodoService.getTodo = function (res, id) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        // console.log(`ID Raw: ${id}`);
        // console.log(typeof id);
        // console.log(todoList[id]);
        // Check for object matching id key in todoList
        if (!(id in todoList)) {
            console.log("Shit's not in here");
            res.end("<h1>" + id + " does not exist in ToDo List</h1>");
            return;
        }
        else {
            console.log("Generating Single TODO page with ID: " + id);
            console.log(todoList);
            console.log(todoList[id]);
            res.end("<h1>Single ToDo - ID: " + id + "</h1> " + todoList[id].generateHTML);
        }
        // let idNum = Number(id);
        //  Test to make sure id is valid
        // if (isNaN(idNum) || !(typeof idNum === 'number') || typeof todoList[idNum] === 'undefined') {
        //     res.end(`<h1>${id} is not a ToDo item. Check /todo to see all todos.</h1>`)
        //     return
        // }
        // let todo = todoList[id];
        // let todoTemplate = `
        // <ul>
        // <li>ID: ${todo.getID(todoList)}</li>
        // {{replaceme}}
        // </ul>`;
        // let todoProperties = `
        // <li>{{replaceme}}</li>`;
        // let html = ``;
        // Object.keys(todo).forEach(prop => {
        //     html += todoProperties.replace("{{replaceme}}", `${prop}  :  ${todo[prop]}`);
        // });
        // console.log(`<h1>Single ToDo</h1> ${todoTemplate.replace("{{replaceme}}", html)}`)
        // res.end(`<h1>Single ToDo</h1> ${todoTemplate.replace("{{replaceme}}", html)}`);
    };
    /**
     * Create Todo Item
     */
    TodoService.createTodo = function (res, body, todoList) {
        // console.log(typeof body)
        // console.log(body);
        // console.log(typeof body.title);
        // Array Implementation
        // let id = todoList.push(new Todo(body.title, body.dueDate));
        // Object container imp.
        todoList[TodoService.setID(todoList)] = new Todo(body.title, body.dueDate);
        // console.log(todoList);
        // this.getTodo(res, id - 1);
        // res.send(`<h1>Hey There</h1>`);
        // app.post('/todo', (req, res) => createTodo(res, req.body))
        res.redirect("/");
    };
    /**
     * Delete Todo Item
     */
    TodoService.deleteTodo = function (res, id) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        var idNum = Number(id);
        // Test to make sure id is valid
        if (isNaN(idNum) || !(typeof idNum === 'number') || typeof todoList[idNum] === 'undefined') {
            res.end("<h1>" + id + " is not a ToDo item. Check /todo to see all todos.");
        }
        else {
            // Mark Todo complete
            todoList[id].isComplete = true;
            // Display completed Todo
            this.getTodo(res, id);
        }
    };
    return TodoService;
}());
// Route to display all todo's
app.get('/todo', function (req, res) { return TodoService.getAllTodos(res); });
// Route to display a single, specific todo
app.get('/todo/:id', function (req, res) { return TodoService.getTodo(res, req.params.id); });
// Route to create a new Todo item
app.post('/todo', function (req, res) { return TodoService.createTodo(res, req.body, todoList); });
// Route to mark a todo item complete
app["delete"]('/todo/:id', function (req, res) { return TodoService.deleteTodo(res, req.params.id); });
app.listen(port, function () { return console.log("Example app listening on port " + port + "!"); });
