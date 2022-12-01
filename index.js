const http = require("http");
const WebSocketServer = require("websocket").server;
let connection = null;

const httpServer = http.createServer((req, res) => {
  console.log("working!!");
});

const webSocket = new WebSocketServer({
  httpServer: httpServer,
});

webSocket.on("request", (request) => {
  connection = request.accept(null, request.origin);
  connection.on("open", (e) => console.log("connection opened "));
  connection.on("close", (e) => console.log("connection closed "));
  connection.on("message", (message) =>
    console.log(`Received message ${message.utf8Data}`)
  );
  sendRandomEvery5Sec();
});

httpServer.listen(8080, () => {
  console.log(`server is listening on port: 8080!`);
});

function sendRandomEvery5Sec() {
  connection.send(`Message: ${Math.random()}`);
  setTimeout(sendRandomEvery5Sec, 5000);
}
