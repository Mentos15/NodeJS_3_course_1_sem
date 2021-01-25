const net = require("net");

let HOST = "0.0.0.0";
let PORT1 = 40000;
let PORT2 = 50000;

let id = 0;
let connections = new Map();
let timer = null;

let h = (n) => {return sock => {
    console.log(`Connected ${n}`);

    sock.id = ++id;
    connections.set(sock.id);

    sock.on("data", data => {
        for(let [key, value] of connections) {
            if(sock.id == key) {
                sock.write(Buffer.from(`ECHO: ${data.readInt32LE()}`).toString("ascii"));
            }
        }
    });
    sock.on("close", e => {
        console.log(`connection close ${n}`);
    });
}}  

net.createServer(h(PORT1)).listen(PORT1, HOST).on("listening", () => {console.log(`listening ${PORT1}`);}).on("error", e => {console.log("error: ", e);});
net.createServer(h(PORT2)).listen(PORT2, HOST).on("listening", () => {console.log(`listening ${PORT2}`);}).on("error", e => {console.log("error: ", e);});

// let server = net.createServer();
// server.on("connection", sock => {
//     console.log("connected");

//     sock.id = ++id;
//     connections.set(sock.id, sum);

//     sock.on("data", data => {
//         for(let [key, value] of connections) {
//             if(sock.id == key) {
//                 value += data.readInt32LE();
//                 connections.set(key, value);
//             }
//         }
//     });

//     let buf = Buffer.alloc(4);
//     timer = setInterval(() => {
//         for(let [key, value] of connections) {
//             if(sock.id == key) {
//                 buf.writeInt32LE(value, 0); sock.write(buf);
//             }
//         }    
//     }, 5000);

//     sock.on("close", close => {
//         console.log("connection closed");
//         clearInterval(timer);
//         connections.delete(sock.id);
//     });

//     sock.on("error", error => {console.log("ERROR: ", error);  connections.delete(sock.id);});
// });

// server.on("listening", () => {console.log("listening");});
// server.on("error", error => {console.log("ERROR: ", error);});
// server.listen(PORT, HOST);