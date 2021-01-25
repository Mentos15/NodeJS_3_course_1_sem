const rpcWSS = require('rpc-websockets').Server

let server = new rpcWSS({
    port: 4000,
    host: 'localhost'
});

server.setAuth((l) => {
    console.log((l.login === 'dnm' && l.password === '123'));
    return (l.login === 'dnm' && l.password === '123');
});

function fib(n) {
    let a = 1;
    let b = 1;
    for (let i = 3; i <= n; i++) {
      let c = a + b;
      a = b;
      b = c;
    }
    return b;
}

function factorial(n) {
    return n ? n * factorial(n - 1) : 1;
}

server.register('square', (params) => {
    if (params.size == 2){
        return params[0] * params[1]
    } else {
        return 2 * 3,14 * Math.pow(params[0], 2);
    }
}).public();

server.register('sum', (params) => {
    let sum = 0;
    for (let i = 0; i < params.length; i++){
        sum += params[i];
    }
    return sum;
}).public();

server.register('mul', (params) => {
    let mul = 1;
    for (let i = 0; i < params.length; i++){
        mul *= params[i];
    }
    return mul;
}).public();

server.register('fib', (params) => {
    return fib(params[0]);
}).protected();

server.register('fact', (params) => {
    return factorial(params[0]);
}).protected();