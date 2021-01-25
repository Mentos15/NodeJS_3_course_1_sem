const rpcWSS = require('rpc-websockets').Server;

const wss = new rpcWSS({
    port: 4000,
    host: 'localhost'
});

wss.event('A');
wss.event('B');
wss.event('C');
    process.stdin.setEncoding('utf-8');
    process.stdin.on('readable', () => {
        let chunk = null;
        while ((chunk = process.stdin.read()) != null){
            let elem = chunk.trim();
            switch(elem){
                case 'A':
                    wss.emit('A', 'EVENT A');
                    break;
                case 'B':
                    wss.emit('B', 'EVENT B');
                    break;
                case 'C':
                    wss.emit('C', 'EVENT C');
                    break;
            }
        }
});