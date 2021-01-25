const WebSocket = require('ws');

const wss = new WebSocket.Server({
    port: 4000,
    host: 'localhost'
});

let k = 0;

wss.on('connection', (ws) => {
    ws.on('pong', (data) => {
        console.log('on pong: ', data.toString());
    });
    setInterval(() => {
        ws.send(`11-03 server ${k++}`)
    }, 15000)
    setInterval(() => {
        console.log('server: ping');
        ws.ping(`server: ping`);
        console.log(wss.clients.size);
    }, 5000)
})