var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");
var send = require("./m06");


function GET_handler(req, res) {
    if (req.url == "/")  {
        res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});
        send("some text message");
        res.end("message is sent");
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
        default: OTHER_handler(req, res); break;
    }
};

var server = http.createServer();
 server.listen(5000, function(v) {console.log("server.listen(5000)")})
            .on("error", function(e) {console.log("server.listen(5000): error: ", e.code)})
            .on("request", http_handler);