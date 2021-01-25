const WebSocket = require("ws");
const ws = new WebSocket("ws:/localhost:4000/broadcast");

var parm = process.argv[2];

ws.on("open", () => {
    console.log("socket.open");
    ws.on("message", (e) => {
        console.log(`Полученное сообщение: ${e}`);
    });
    setInterval(() => {
        ws.send(`client ${parm}`);
    }, 2000);
});