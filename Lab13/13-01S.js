const net = require("net");

let HOST = "0.0.0.0";
let PORT = 40000;

net.createServer(sock => {
    console.log("connected");
    sock.on("data", data => {
        console.log("Сервер получил: " + data);
        sock.write("ECHO: " + data);
    });

    sock.on("close", data => {
        console.log("connection closed");
    });
}).listen(PORT, HOST);