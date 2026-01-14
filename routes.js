const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  // HOME PAGE
  if (url === "/" && method === "GET") {
    let messages = "";

    // READ FILE USING STREAM
    if (fs.existsSync("message")) {
      const readStream = fs.createReadStream("message");

      readStream.on("data", (chunk) => {
        messages += chunk.toString();
      });

      readStream.on("end", () => {
        res.setHeader("Content-Type", "text/html");
        res.end(`
          <html>
            <body>
              <h2>Message</h2>

              <p>${messages}</p>

              <form action="/add-message" method="POST">
                <input type="text" name="message" required />
                <button type="submit">Add</button>
              </form>
            </body>
          </html>
        `);
      });
    } else {
      res.end(`
        <form action="/add-message" method="POST">
          <input type="text" name="message" required />
          <button type="submit">Add</button>
        </form>
      `);
    }
  }

  // ADD MESSAGE
  if (url === "/add-message" && method === "POST") {
    const body = [];

    // RECEIVE DATA AS BUFFER CHUNKS
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      // CONCAT BUFFERS
      const parsedBody = Buffer.concat(body).toString();
      const newMessage = parsedBody.split("=")[1];

      // WRITE ONLY NEW MESSAGE (OLD REMOVED)
      fs.writeFile("message", newMessage, () => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        res.end();
      });
    });
  }
};

const anathorFunction = () => {
  console.log("anathor function is running");
};

exports.handler = requestHandler;
exports.testFunction = anathorFunction;
