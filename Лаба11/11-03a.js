const { WSASYSCALLFAILURE } = require('constants');
const WebSocket = require('ws');

const wss = new WebSocket('ws://localhost:4000');

const duplex = WebSocket.createWebSocketStream(wss, { encoding: 'utf8'});

duplex.pipe(process.stdout);

wss.on('pong', (data) => {
    console.log('on pong: ', data.toString());
});

setInterval(() => {
    console.log(`server: ping`);
    wss.ping('client: ping');
}, 5000);