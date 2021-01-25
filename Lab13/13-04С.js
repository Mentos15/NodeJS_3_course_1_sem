const net = require("net");
const { setTimeout } = require("timers");

let HOST = "127.0.0.1";
let PORT = process.argv[2];

let X = Number(process.argv[3]);

let client = new net.Socket();
let buf = new Buffer.alloc(4);
let timer = null;
client.connect(PORT, HOST, () => {
    console.log("client connected");

    timer = setInterval(() => {client.write((buf.writeInt32LE(X, 0), buf));},1000);
    setTimeout(() => {
        clearInterval(timer); client.end();
    }, 20000);
});

client.on("data", data => {console.log(`${data}`);})

client.on("close", () => {console.log("client close")});

client.on("error", (e) => {console.log("client ERROR: ", e)});