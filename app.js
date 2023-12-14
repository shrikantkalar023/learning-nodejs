const http = require("node:http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello World");
    res.end();
  }

  if (req.url === "/api/courses") {
    res.write(JSON.stringify([1, 2, 3]));
    res.write(JSON.stringify({ a: 1, b: 2 }));
    res.end();
  }
});

server.listen(3000); //this is an event emitter

console.log("Listening on port 3000...");
