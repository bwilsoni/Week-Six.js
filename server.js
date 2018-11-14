const http = require('http');

const hostname = 'localhost';
const port = 3000;

let counter = 0;

console.log("thing/wow".split("/"))
const server = http.createServer((req, res) => {
    // counter++

    // console.log(counter, req.connection.localAddress)

    // console.log(req.url)
    // console.log(req.url.split("/"));

    console.log(req.url.split("/").join("\n"))

    if (req.url.split("/").includes("bryan")) {
        console.log("WOWOWOWOWO")
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    // console.log("Test: " + req.url.split("/"))
    res.end("Test: " + req.url.split("/").join("<br>"));

});



server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

