const async = require('async');
const rpcWSC = WebSocket = require('rpc-websockets').Client;

let ws = new rpcWSC('ws://localhost:4000');
let h = () => async.waterfall([
    (cb) => {
        ws.call('square', [3])
            .catch((e) => cb(e, null))
            .then((r) => cb(null, r))
    },
    (r1, cb) => {
        ws.call('square', [5,4])
            .catch((e) => cb(e, null))
            .then((r) => cb(null, r1, r))
    },
    (r1, r2, cb) => {
        ws.call('mul', [3, 5, 7, 9, 11, 13])
        .catch((e) => cb(e, null))
        .then((r) => cb(null,r1, r2, r));
    },
    (r1, r2, r3, cb) => {
        ws.call('sum', [r1, r2, r3])
                        .catch((e) => cb(e, null))
                        .then((r) => cb(null,r));
    },
    (p, cb) => {
        ws.login({login: 'evs', password: '123'})
                        .then(() => {
                            ws.call('fib', [7])
                                .catch((e) => cb(e, null))
                                .then((r) => cb(null,p, r));
                            })
    },
    (r1, r2, cb) => {
        ws.call('sum', [r1, r2])
                        .catch((e) => cb(e, null))
                        .then((r) => cb(null,r));
    },
    (p, cb) => {
        ws.call('mul', [2, 4, 6])
                        .catch((e) => cb(e, null))
                        .then((r) => cb(null,p, r));
    },
    (r1, r2, cb) => {
        ws.call('mul', [r1, r2])
                        .catch((e) => cb(e, null))
                        .then((r) => cb(null,r));
    },
], (e,r) => {
    if(e) console.log('e = ', e);
    else console.log('r = ', r);
    ws.close();
});

ws.on('open', h);