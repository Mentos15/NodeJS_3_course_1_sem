const rpcWSS = require('rpc-websockets').Server;

let server = new rpcWSS({
    port: 4000,
    host: 'localhost'
});

server.register('A', () => {
    console.log('notification A')
}).public();

server.register('B', () => {
    console.log('notification B')
}).public();

server.register('C', () => {
    console.log('notification C')
}).public();