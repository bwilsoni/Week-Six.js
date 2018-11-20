"use strict";
exports.__esModule = true;
/* Promise
Class
Service Class
JSON objects
mark things as done
Typescript
*/
var http = require('http');
var hostname = 'localhost';
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var port = 3000;
var todoList = [];
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
var Todo = /** @class */ (function () {
    function Todo(title, dueDate) {
        this.id;
        this.title = title;
        this.dueDate = dueDate;
        this.isComplete = false;
    }
    Todo.prototype.getID = function () {
        return todoList.indexOf(this);
    };
    return Todo;
}());
;
// Test Data to send to browser
// todoList.push(new Todo("Test1", "Today"));
// todoList.push(new Todo("Test2", "Tommorrow"));
// todoList.push(new Todo("Test3", "Friday"));
function createTestData(howMany) {
    for (var index = 0; index < howMany; index++) {
        todoList.push(new Todo("" + makeid(), howMany + " day's from now"));
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
var TodoService = /** @class */ (function () {
    function TodoService() {
    }
    /**
     * Get All Todo Items
     */
    TodoService.getAllTodos = function (res) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        var orderedList = "\n        <ol>\n        {{replaceme}}\n        </ol>\n        ";
        var todoHTML = '';
        todoList.forEach(function (todo) {
            var html = "\n            <li>ID: " + todo.getID() + "</li>\n            <ul>{{replaceme}}\n            </ul>\n            ";
            var todoProperties = "\n            <li>{{replaceme}}</li>";
            var itemHTML = "";
            Object.keys(todo).forEach(function (prop) {
                itemHTML += todoProperties.replace("{{replaceme}}", prop + "  :  " + todo[prop]);
            });
            todoHTML += html.replace("{{replaceme}}", itemHTML);
        });
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
    TodoService.getSingleTodos = function (res, id) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        // console.log(`ID Raw: ${id}`);
        // console.log(typeof id);
        // console.log(todoList[id]);
        var idNum = Number(id);
        //  Test to make sure id is valid
        if (isNaN(idNum) || !(typeof idNum === 'number') || typeof todoList[idNum] === 'undefined') {
            res.end("<h1>" + id + " is not a ToDo item. Check /todo to see all todos.");
        }
        var todo = todoList[id];
        var todoTemplate = "\n        <ul>\n        <li>ID: " + todo.getID() + "</li>\n        {{replaceme}}\n        </ul>";
        var todoProperties = "\n        <li>{{replaceme}}</li>";
        var html = "";
        Object.keys(todo).forEach(function (prop) {
            html += todoProperties.replace("{{replaceme}}", prop + "  :  " + todo[prop]);
        });
        // console.log(`<h1>Single ToDo</h1> ${todoTemplate.replace("{{replaceme}}", html)}`)
        res.end("<h1>Single ToDo</h1> " + todoTemplate.replace("{{replaceme}}", html));
    };
    /**
     * Create Todo Item
     */
    TodoService.createTodo = function (res, body) {
        console.log(typeof body);
        console.log(body);
        console.log(typeof body.title);
        todoList.push(new Todo(body.title, body.dueDate));
        console.log(todoList);
        res.send("<h1>Hey There</h1>");
        // app.post('/todo', (req, res) => createTodo(res, req.body))
    };
    /**
     * Delete Todo Item
     */
    TodoService.deleteTodo = function (res, id) {
        res.send("Done");
        app["delete"]('/todo/:id', function (req, res) { return res.send('Hello World!'); });
    };
    return TodoService;
}());
// Route to display all todo's
app.get('/todo', function (req, res) { return TodoService.getAllTodos((res)); });
// Route to display a single, specific todo
app.get('/todo/:id', function (req, res) { return TodoService.getSingleTodos(res, req.params.id); });
// Route to create a new Todo item
app.post('/todo', function (req, res) { return TodoService.createTodo(res, req.body); });
// Route to mark a todo item complete
app["delete"]('');
app.listen(port, function () { return console.log("Example app listening on port " + port + "!"); });
