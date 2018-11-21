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
var todoList = [];
// Creates random test data for todoList, pass a number of items to create
// helpers.createTestData(10, todoList);//
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
        todoList
            .filter(function (todo) { return !todo.isComplete; })
            .forEach(function (todo) {
            var id = todo.getID(todoList);
            var html = "\n                    <li class=\"imSpecific\">\n                        <strong>ID: " + id + "</strong>\n                        <ul>\n                            {{replaceme}}\n                        </ul>\n                        <button id=\"" + id + "\" class=\"completeMe\">Mark Completed</button>\n                        <br />\n                        <br />\n                    </li>\n                ";
            var todoProperties = "\n                    <li>\n                        {{replaceme}}\n                    </li>";
            var itemHTML = "";
            Object
                .keys(todo)
                .forEach(function (prop) {
                itemHTML += todoProperties
                    .replace("{{replaceme}}", prop + "  :  " + todo[prop]);
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
    TodoService.getTodo = function (res, id) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        // console.log(`ID Raw: ${id}`);
        // console.log(typeof id);
        // console.log(todoList[id]);
        var idNum = Number(id);
        //  Test to make sure id is valid
        if (isNaN(idNum) || !(typeof idNum === 'number') || typeof todoList[idNum] === 'undefined') {
            res.end("<h1>" + id + " is not a ToDo item. Check /todo to see all todos.</h1>");
            return;
        }
        var todo = todoList[id];
        var todoTemplate = "\n        <ul>\n        <li>ID: " + todo.getID(todoList) + "</li>\n        {{replaceme}}\n        </ul>";
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
        var id = todoList.push(new Todo(body.title, body.dueDate));
        console.log(todoList);
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
app.post('/todo', function (req, res) { return TodoService.createTodo(res, req.body); });
// Route to mark a todo item complete
app["delete"]('/todo/:id', function (req, res) { return TodoService.deleteTodo(res, req.params.id); });
app.listen(port, function () { return console.log("Example app listening on port " + port + "!"); });
