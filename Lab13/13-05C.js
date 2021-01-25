const udp = require("dgram");
const client = udp.createSocket("udp4");
const PORT = 3000;

client.on("message", (msg, info) => {
    console.log(msg.toString());
});

let data =  Buffer.from("Client HELLO");
setInterval(() => {client.send(data, PORT, "localhost", err => {
    if(err) client.close();
    else console.log("Сообщение отправлено серверу");
});}, 1000);