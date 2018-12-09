const http = require('http');

const hostname = 'localhost';
const port = 3000;

const notes = [];

// console.log("thing/wow".split("/"))
const server = http.createServer((req, res) => {


    notes.push(decodeURI(req.url.replace("/", "")));

    let html = `
    <h1>Notes</h1>
    <ul>
    {{replaceme}}
    </ul>
   `;

    let item = `
    <li>{{replaceme}}</li>
    `;

    let noteItems = "";

    notes.forEach((note) => {
        noteItems += item.replace("{{replaceme}}", note);
    });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    console.log()
    res.end(html.replace("{{replaceme}}", noteItems));

});



server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

