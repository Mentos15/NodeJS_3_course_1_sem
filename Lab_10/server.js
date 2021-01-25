const WebSocket = require("ws");

const httpserver = require("http").createServer((req, res) => {
    if(req.method == "GET" && req.url == "/start") {
        res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});
        res.end(require("fs").readFileSync("index.html"));
    }
});
httpserver.listen(3000);
console.log("listen 3000");

var k = 0;
var n = 0;

const wss = new WebSocket.Server({port: 4000, host: "localhost", path: "/wsserver"});
wss.on("connection", ws => {
    console.log("Connected");
    ws.on("message", message => {
        n = String(message).substr(13)
        console.log("Полученное сообщение: " + message);
    });
    setInterval(() => {ws.send(`10-01-server: ${n}->${++k}`)}, 5000);
});
wss.on("error", e => {console.log("error wsServer", e)});