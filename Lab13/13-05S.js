const udp = require("dgram");
const PORT = 3000;

let server = udp.createSocket("udp4");

server.on("error", err => {console.log("Error server"); server.close();});

server.on("message", (msg, info) => {
    server.send(`ECHO: ${msg}`, info.port, info.address, err => {
        if(err){server.close();}
        else {console.log("Клиенту отправлено сообщение");}
    });
});

server.on("listening", () => {
    console.log("listening");
});

server.on("close", () => {console.log("Сервер закрыт")});

server.bind(PORT);