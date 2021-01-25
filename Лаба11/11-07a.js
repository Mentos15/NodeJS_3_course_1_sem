const rpcWSC = WebSocket = require('rpc-websockets').Client;

let ws = new rpcWSC('ws://localhost:4000');

ws.on('open', () => {
    process.stdin.setEncoding('utf-8');
    process.stdin.on('readable', () => {
        let chunk = null;
        while ((chunk = process.stdin.read()) != null){
            let elem = chunk.trim();
            switch(elem){
                case 'A':
                    ws.notify('A');
                    break;
                case 'B':
                    ws.notify('B');
                    break;
                case 'C':
                    ws.notify('C');
                    break;
            }
        }
    })
})