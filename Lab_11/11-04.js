const WebSocket = require('ws');

const wss = new WebSocket.Server({
    port: 4000,
    host: 'localhost'
});

let n = 0;

wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        let msg = JSON.parse(data)
        console.log('on message: ', msg);
        ws.send(JSON.stringify({ 
                                    server: n++,
                                    client: msg['client'],
                                    'timestamp': new Date().toISOString() 
                                })
                );
    });
});