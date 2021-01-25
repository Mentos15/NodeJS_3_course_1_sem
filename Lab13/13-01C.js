const net = require("net");

let HOST = "127.0.0.1";
let PORT = 40000;

let client = new net.Socket();
client.connect(PORT, HOST, () => {
    console.log("client connected");

    client.write("hello");

    client.on("data", data => {console.log(data.toString()); client.destroy();})

    client.on("close", () => {console.log("client close")});

    client.on("error", () => {console.log("client ERROR")});
});