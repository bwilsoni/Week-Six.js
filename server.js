var http = require('http');
var hostname = 'localhost';
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;
var Todo = require("./wwwroot/todo.js");
var TodoList = require("./wwwroot/TodoList.js");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('wwwroot'));
var todoList = new TodoList();
var TodoService = /** @class */ (function () {
    function TodoService() {
    }
    /**
     * Get All Todo Items
     */
    TodoService.getAllTodos = function (res) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        var html = todoList.generateHTML();
        res.end("<h1>ToDo</h1> " + html);
    };
    ;
    /**
     * Get Single Todo Item
     * Possible error handling for checking index out of range of todoList
     */
    TodoService.getTodo = function (res, id) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        if (todoList.items.hasOwnProperty(id)) {
            console.log("Generating Single TODO page with ID: " + id);
            res.end("<h1>Single ToDo - ID: " + id + "</h1> " + todoList.items[id].generateHTML(id));
        }
        else {
            console.log("ToDo " + id + " doesn't exist");
            res.end("<h1>" + id + " does not exist in ToDo List</h1>");
        }
    };
    /**
     * Create Todo Item
     */
    TodoService.createTodo = function (res, body, todoList) {
        var id = Object.keys(todoList.items).length + 1;
        todoList.items[id] = new Todo(body.title, body.dueDate);
        res.redirect("/");
    };
    /**
     * Delete Todo Item
     */
    TodoService.deleteTodo = function (res, id) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        // If ToDo doesn't exist display error message
        if (todoList.items.hasOwnProperty(id)) {
            console.log("Marking " + id + " completed");
            todoList.items[id].isComplete = true;
            res.redirect("/");
        }
        else {
            console.log(id + " does not exist as a todo.");
            res.end("<h1>" + id + " is not a ToDo item. Check /todo to see all todos.");
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
