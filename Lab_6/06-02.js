var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");
var send = require("./m06");
var sendmail = require("sendmail")({silent: true});


function GET_handler(req, res) {
    if (req.url == "/")  {
        res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});
        res.end(fs.readFileSync("send.html"));
    }
    else {
        OTHER_handler(req, res);
    }
}
function POST_handler(req, res) {
    if (req.url == "/")  {
        let result = "";
        req.on("data", data => {result += data;});
        req.on("end", () => {
            let parm = qs.parse(result);
            sendmail({
                from: parm.sender,
                to: parm.receiver,
                subject: "test message",
                text: parm.sms
            }, function (err, reply) {
                console.log(err && err.stack);
                console.dir(reply);
            });
            console.log(parm.sender + parm.receiver + parm.sms);
        });
        res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});
        res.end("nice");
    }
    else {
        OTHER_handler(req, res);
    }
}
function OTHER_handler(req, res) {
    res.writeHead(405, {"Content-Type" : "text/plain; charset=utf-8"});
    res.end("Неверный метод");
}
var http_handler = function(req, res) {
    switch (req.method) {
        case 'GET' : GET_handler(req, res); break;
        case 'POST' : POST_handler(req, res); break;
        default: OTHER_handler(req, res); break;
    }
};

var server = http.createServer();
 server.listen(5000, function(v) {console.log("server.listen(5000)")})
            .on("error", function(e) {console.log("server.listen(5000): error: ", e.code)})
            .on("request", http_handler);
