
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


/* Promise
Class
Service Class
JSOn objects
mark things as done
 */

const http = require('http');

const hostname = 'localhost';
const port = 3000;

const notes = [];

const server = http.createServer(function (req, res) {

    if (req.url.endsWith(".ico")) {
        res.end();
        return;
    }

    notes.push(decodeURI(req.url.replace("/", "")));

    let html = `
    <h1>Notes</h1>
    <ul>
      {{replaceme}}
    </ul>
  `;

    let noteItems = "";

    notes.forEach((note) => {
        noteItems += + "<li>" + note + "</li>"
    });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(html.replace("{{replaceme}}", noteItems));
});

server.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});


const express = require('express');
const app = express();
const port = 3000

/*
{
    "title": "etst",
    "dueDate": "12/25/18",
    "isComplete": false
}
*/

/**
 * Get All Todo Items
 */
function getAllTodos(res) {
    res.send("Done");
}

app.get('/todo', (req, res) => getAllTodos(res));

/**
 * Get Single Todo Item
 */
function getSingleTodos(res, id) {
    res.send("Done");
}

app.get('/todo/:id', (req, res) => getSingleTodos(res, req.params.id))

/**
 * Create Todo Item
 */
function createTodo(res, todo) {
    console.log(todo);
    res.send("Done");
}

app.post('/todo', (req, res) => createTodo(res, req.body))

/**
 * Delete Todo Item
 */
function deleteTodo(res, id) {
    res.send("Done");
}

app.delete('/todo/:id', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`));