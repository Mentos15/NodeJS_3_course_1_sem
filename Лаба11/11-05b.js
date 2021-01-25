const async = require('async');
const rpcWSC = WebSocket = require('rpc-websockets').Client;

let ws = new rpcWSC('ws://localhost:4000');
let h = (x=ws) => async.parallel({
    sq1: (cb) =>{ 
                    ws.call('square', [3])
                        .catch((e) => cb(e, null))
                        .then((r) => cb(null,r));
                },
    sq2: (cb) =>{ 
                    ws.call('square', [5, 4])
                        .catch((e) => cb(e, null))
                        .then((r) => cb(null,r));
                },
    sum1: (cb) =>{ 
                    ws.call('sum', [2])
                        .catch((e) => cb(e, null))
                        .then((r) => cb(null,r));
                },
    sum2: (cb) =>{ 
                    ws.call('sum', [2,4,6,8,10])
                        .catch((e) => cb(e, null))
                        .then((r) => cb(null,r));
                },
    mul1: (cb) =>{ 
                    ws.call('mul', [3])
                        .catch((e) => cb(e, null))
                        .then((r) => cb(null,r));
                },
    mul2: (cb) =>{ 
                    ws.call('mul', [3, 5, 7, 9, 11, 13])
                        .catch((e) => cb(e, null))
                        .then((r) => cb(null,r));
                },
    fib1: (cb) =>{
                    ws.login({login: 'dnm', password: '123'})
                        .then(() => {
                            ws.call('fib', [1])
                                .catch((e) => cb(e, null))
                                .then((r) => cb(null,r));
                            })
                },
    fib2: (cb) =>{
                    ws.login({login: 'dnm', password: '123'})
                        .then(() => {
                            ws.call('fib', [2])
                                .catch((e) => cb(e, null))
                                .then((r) => cb(null,r));
                            })
                },
    fib3: (cb) =>{
                    ws.login({login: 'dnm', password: '123'})
                        .then(() => {
                            ws.call('fib', [7])
                                .catch((e) => cb(e, null))
                                .then((r) => cb(null,r));
                            })
                },
    fact1: (cb) =>{
                    ws.login({login: 'dnm', password: '123'})
                        .then(() => {
                            ws.call('fact', [0])
                                .catch((e) => cb(e, null))
                                .then((r) => cb(null,r));
                            })
                },
    fact2: (cb) =>{
                    ws.login({login: 'dnm', password: '123'})
                        .then(() => {
                            ws.call('fact', [5])
                                .catch((e) => cb(e, null))
                                .then((r) => cb(null,r));
                            })
                },
    fact3: (cb) =>{
                    ws.login({login: 'dnm', password: '123'})
                        .then(() => {
                            ws.call('fact', [10])
                                .catch((e) => cb(e, null))
                                .then((r) => cb(null,r));
                            })
                },
}, (e,r) => {
    if(e) console.log('e = ', e);
    else console.log('r = ', r);
    ws.close();
});

ws.on('open', h);