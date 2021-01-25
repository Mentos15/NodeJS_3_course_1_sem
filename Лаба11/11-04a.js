const WebSocket = require('ws');

let x = process.argv[2];

const ws = new WebSocket('ws://localhost:4000');

ws.on('open', () => {
    ws.on('message', data => {
        console.log('on message: ', JSON.stringify(data));
    });
    setInterval(() => {
        ws.send(JSON.stringify({ 
                                client: x, 
                                'timestamp': new Date().toISOString()
                            })
                );
    }, 5000);
});