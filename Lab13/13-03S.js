const net = require("net");

let HOST = "0.0.0.0";
let PORT = 40000;

let sum = 0;
let id = 0;
let connections = new Map();
let timer = null;

let server = net.createServer();
server.on("connection", sock => {
    console.log("connected");

    sock.id = ++id;
    connections.set(sock.id, sum);

    sock.on("data", data => {
        for(let [key, value] of connections) {
            if(sock.id == key) {
                value += data.readInt32LE();
                connections.set(key, value);
            }
        }
    });

    let buf = Buffer.alloc(4);
    timer = setInterval(() => {
        for(let [key, value] of connections) {
            if(sock.id == key) {
                buf.writeInt32LE(value, 0); sock.write(buf);
            }
        }    
    }, 5000);

    sock.on("close", close => {
        console.log("connection closed");
        clearInterval(timer);
        connections.delete(sock.id);
    });

    sock.on("error", error => {console.log("ERROR: ", error);  connections.delete(sock.id);});
});

server.on("listening", () => {console.log("listening");});
server.on("error", error => {console.log("ERROR: ", error);});
server.listen(PORT, HOST);