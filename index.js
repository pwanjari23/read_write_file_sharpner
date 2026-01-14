const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.end(`<h1>Hello from Sharpener<h1>
            <h1>This is first page</h1>
            <h1>This is for checking nodemon working or not</h1>
            <h1>This for checking is project properly working on not</1>`);
  }
});

server.listen(3000, () => {
  console.log("Server is running");
});
