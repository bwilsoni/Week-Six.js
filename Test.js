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
var http = require('http');
var hostname = 'localhost';
var express = require('express');
var app = express();
var port = 3000;
var todoList = [];
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
todoList.push(new Todo("Test1", "Today"));
todoList.push(new Todo("Test2", "Tommorrow"));
todoList.push(new Todo("Test3", "Friday"));
// console.log("Test Data in todoList", todoList);
// console.log(`ID: ${todoList[2].getID()}`)
var TodoService = /** @class */ (function () {
    function TodoService() {
    }
    /**
     * Get All Todo Items
     */
    TodoService.getAllTodos = function (res) {
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
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        // let endHTML = orderedList.replace("{{replaceme}}", todoHTML);
        // let endHTML = `<h1>ToDo</h1> ${orderedList.replace("{{replaceme}}", todoHTML)}`;
        // console.log(endHTML);
        res.end("<h1>ToDo</h1> " + orderedList.replace("{{replaceme}}", todoHTML));
    };
    ;
    /**
     * Get Single Todo Item
     */
    TodoService.prototype.getSingleTodos = function (res, id) {
        res.send("Done");
        // app.get('/todo/:id', (req, res) => getSingleTodos(res, req.params.id))
    };
    /**
     * Create Todo Item
     */
    TodoService.prototype.createTodo = function (res, todo) {
        console.log(todo);
        res.send("Done");
        // app.post('/todo', (req, res) => createTodo(res, req.body))
    };
    /**
     * Delete Todo Item
     */
    TodoService.prototype.deleteTodo = function (res, id) {
        res.send("Done");
        app["delete"]('/todo/:id', function (req, res) { return res.send('Hello World!'); });
    };
    return TodoService;
}());
var thing = new TodoService();
// thing.getAllTodos
app.get('/todo', function (req, res) { return TodoService.getAllTodos((res)); });
// app.get('/todo', )
app.listen(port, function () { return console.log("Example app listening on port " + port + "!"); });
