const net = require("net");

let HOST = "0.0.0.0";
let PORT = 40000;

let sum = 0;

let server = net.createServer();
server.on("connection", sock => {
    console.log("connected");

    sock.on("data", data => {
        sum += data.readInt32LE();
    });

    let buf = Buffer.alloc(4);
    let x = setInterval(() => {
        buf.writeInt32LE(sum); sock.write(buf);
    }, 5000);

    sock.on("close", close => {console.log("connection closed");
            clearInterval(x);});

    sock.on("error", error => {console.log("ERROR: ", error);});
});

server.on("listening", () => {console.log("listening");});
server.on("error", error => {console.log("ERROR: ", error);});
server.listen(PORT, HOST);