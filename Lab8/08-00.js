var http = require("http");
const { removeListener } = require("process");
var url = require("url");
var fs = require("fs");
var qs = require("querystring");
var parseString = require("xml2js").parseString;
var xmlbuilder = require("xmlbuilder");
const { resolveNaptr } = require("dns");
var mp = require("multiparty");

let headers = (r) => {
    let rc = "";
    for(key in r.headers) rc += key + ": " + r.headers[key] + "\n";
    return rc;
}

var studentscalc = (obj) => {
    let rc = "<result>parse error</result>";
    try {
        let sum = 0;
        let concat = "";
        let xmldoc = xmlbuilder.create("response").att("request", obj.request.$.id);
        obj.request.x.map((e, i) => {
            sum += Number(e.$.value);
        });
        obj.request.m.map((e, i) => {
            concat += String(e.$.value);
        });
        xmldoc.ele("sum", {element: "x", result: sum});
        xmldoc.ele("concat", {element: "m", result: concat});

        rc = xmldoc.toString({pretty: true});
    }
    catch(e){console.log(e);}
    return rc;
}

var localIP = null;
var localPORT = null;
var remoteIP = null;
var remotePORT = null;

function GET_handler(req, res) {
    if(String(req.url).includes("resp-status")) {
        let result = url.parse(req.url, true).query;
        if(!isNaN(Number(result.code)) && result.mess != null) {
            res.statusCode = Number(result.code);
            res.statusMessage = result.mess;
            res.end(res.statusCode + " " + res.statusMessage);
        }
        else {
            res.writeHead(400, {"Content-Type" : "text/plain; charset=utf-8"});
            res.end(`параметры заданы неверно`);
        }
    }
    else if (req.url == "/index.html") {
        res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});
        res.end(fs.readFileSync("index.html"))
    }
    else if (req.url == "/files" || req.url == "/files/") {
        fs.readdir("./static", (err, files) => {
            res.setHeader("X-static-files-count", files.length);
            res.writeHead(200, {"Content-Type" : "text/plain; charset=utf-8"});
            res.end(`${files.length}`);
        });
    }
    else if (url.parse(req.url, true).pathname.split("/")[1] == "files") {
        let result = url.parse(req.url, true).pathname.split("/");
        fs.access(`./static/${result[2]}`, fs.constants.R_OK, err => {
            if(err) {
                res.writeHead(405, {"Content-Type" : "text/plain; charset=utf-8"});
                res.end(`файл ${result[2]} не найден`);
            }
            else {
                res.writeHead(200, {"Content-Type" : "application/txt; charset=utf-8"});
                fs.createReadStream(`./static/${result[2]}`).pipe(res);
            }
        });
    }
    else if (req.url == "/upload") {
        res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});
        res.end(fs.readFileSync("form.html"))
    }
    else if(req.url == "/connection") {
        res.writeHead(200, {"Content-Type" : "text/plain; charset=utf-8"});
        res.end(`${server.keepAliveTimeout}`);
    }
    else if (String(req.url).includes("set")) {
        let result = url.parse(req.url, true).query;
        if (!isNaN(result.set)) {
            server.keepAliveTimeout = Number(result.set);
            res.writeHead(200, {"Content-Type" : "text/plain; charset=utf-8"});
            res.end(`new keepAliveTimeout = ${server.keepAliveTimeout}`);
        }
        else {
            res.writeHead(400, {"Content-Type" : "text/plain; charset=utf-8"});
            res.end(`параметр set не число`);
        }
    }
    else if (req.url == "/headers") {
        res.setHeader("X-author", "POIT, BSTU, ermakovich");
        res.writeHead(200, {"Content-Type" : "text/plain; charset=utf-8"});
        res.end(headers(req));
    }
    else if (String(req.url).includes("parameter") && String(req.url).includes("&")) {
        let result = url.parse(req.url, true).query;
        if(!isNaN(Number(result.x)) && !isNaN(Number(result.y))) {
            let sum = Number(result.x) + Number(result.y);
            let sub = Number(result.x) - Number(result.y);
            let mult = Number(result.x) * Number(result.y);
            let div = Number(result.x) / Number(result.y);
            res.writeHead(200, {"Content-Type" : "text/plain; charset=utf-8"});
            res.end(`Сумма: ${sum}\nРазность: ${sub}\nУмножение: ${mult}\nДеление: ${div}`);
        }
        else {
            res.writeHead(400, {"Content-Type" : "text/plain; charset=utf-8"});
            res.end(`параметры заданы неверно`);
        }
    }
    else if (String(req.url).includes("parameter")) {
        let result = decodeURI(url.parse(req.url, true).pathname).split("/");
        if(!isNaN(Number(result[2])) && !isNaN(Number(result[3]))) {
            let sum = Number(result[2]) + Number(result[3]);
            let sub = Number(result[2]) - Number(result[3]);
            let mult = Number(result[2]) * Number(result[3]);
            let div = Number(result[2]) / Number(result[3]);
            res.writeHead(200, {"Content-Type" : "text/plain; charset=utf-8"});
            res.end(`Сумма: ${sum}\nРазность: ${sub}\nУмножение: ${mult}\nДеление: ${div}`);
        }
        else {
            res.writeHead(400, {"Content-Type" : "text/plain; charset=utf-8"});
            res.end(`параметры заданы неверно`);
        }
    }
    else if (req.url == "/close") {
        setTimeout(() => {process.exit();},3000);
        res.writeHead(200, {"Content-Type" : "text/plain; charset=utf-8"});
        res.end("сервер закроется через 3 секунды");
    }
    else if (req.url == "/socket") {
        res.writeHead(200, {"Content-Type" : "text/plain; charset=utf-8"});
        res.end(`${res.socket.localPort} ${res.socket.localAddress}\n${res.socket.remotePort} ${res.socket.remoteAddress}`);
    }
    else if (req.url = "/req-data") {
        let result = "";
        req.on("data", data => { result += data;});
        req.on("end",() => {
            res.writeHead(200, {"Content-Type" : "text/plain; charset=utf-8"});
            res.end(`${result}`);
        });
    }
    else OTHER_handler(req, res);
}

function POST_handler(req, res) {
    if(req.url == "/formparameter") {
        let obj = "";
        req.on("data", data => {obj += data;});
        req.on("end", () => {
            let result = qs.parse(obj);
            res.writeHead(200, {"Content-Type" : "text/plain; charset=utf-8"});
            res.write(`${result.text}\n${result.number}\n${result.date}\n${result.checkbox}\n`);
            res.end(`${result.radio}\n${result.textarea}\n${result.send}`);
        });
    }
    else if(req.url == "/json") {
        let obj = "";
        req.on("data", data => {obj += data;});
        req.on("end", () => {
            let result = JSON.parse(obj);
            let comment = "Ответ";
            let sum = result.x + result.y;
            let concat = `${result.s}: ${result.o.surname}, ${result.o.name}`;
            let length = result.m.length;
            res.writeHead(200, {"Content-Type" : "text/json; charset=utf-8"});
            res.end(JSON.stringify(
                {
                    "__comment": comment,
                    "x_plus_y": sum,
                    "Concatination_s_o": concat,
                    "Length_m": length
                }
            ));
        });
    }
    // {
    //     "__comment": "Запрос",
    //     "x": 1,
    //     "y": 2,
    //     "s": "Сообщение",
    //     "m": ["a", "b", "c", "d"],
    //     "o": {"surname": "Иванов", "name": "Иван"}
    // }
    else if (req.url == "/xml") {
        let xmltxt = "";
        req.on("data", data => {xmltxt += data;});
        req.on("end", () => {
            parseString(xmltxt, (err, result) => {
                if(err) res.end("bad xml");
                else {
                    res.writeHead(200, {"Content-Type" : "text/xml; charset=utf-8"});
                    res.end(studentscalc(result));
                }
            });
        });
    }
    // <request id = "28">
    //     <x value = "1"/>
    //     <x value = "2"/>
    //     <m value = "a"/>
    //     <m value = "b"/>
    //     <m value = "c"/>
    // </request>
    else if (req.url == "/upload") {
        let form = new mp.Form({uploadDir: "./static"});
        form.on("field", (name, value) => {
            
        });
        form.on("file", (name, file) => {           
        });
        form.on("error", (err) => {
            res.writeHead(200, {"Content-Type" : "text/plain; charset=utf-8"});
            res.end(`${err}`);
        });
        form.on("close", () => {
            res.writeHead(200, {"Content-Type" : "text/plain; charset=utf-8"});
            res.end("Файл получен");
        });
        form.parse(req);
    }
    else OTHER_handler(req, res);
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
 server.listen(3000, function(v) {console.log("server.listen(3000)")})
            .on("error", function(e) {console.log("server.listen(3000): error: ", e.code)})
            .on("request", http_handler);

server.on("connection", socket => {
    localIP = socket.localAddress;
    localPORT = socket.localPort;
    remoteIP = socket.remoteAddress;
    remotePORT = socket.remotePort;
});