const sql = require("mssql");
var http = require("http");
const fs = require("fs");

let config = { user: "aaa", password: "aaa", server: "DESKTOP-FU09168", database:"EVS",
options: { enableArithAbort: true }, pool: {max: 10, min: 0} };

var http_handler = function(req, res) {
    const pool = new sql.ConnectionPool(config, err => {
        if (err) console.log("Ошибка соединения с БД:", err.code);
        else {
            
            if (req.method == "GET") {
                if (req.url == "/") {
                    res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});
                    res.end(fs.readFileSync("14-03.html"));
                }
                else if (req.url == "/api/faculty" ) {
                    pool.request().query("select * from FACULTY", (err, result) => {
                        if (err) console.log("processing_result error:", err);
                        else {
                            res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                            res.end(JSON.stringify(result.recordset));
                        }
                    });
                }
                else if (req.url == "/api/pulpit" ) {
                    pool.request().query("select * from PULPIT", (err, result) => {
                        if (err) console.log("processing_result error:", err);
                        else {
                            res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                            res.end(JSON.stringify(result.recordset));
                        }
                    });
                }
                else if (req.url == "/api/subject" ) {
                    pool.request().query("select * from SUBJECT", (err, result) => {
                        if (err) console.log("processing_result error:", err);
                        else {
                            res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                            res.end(JSON.stringify(result.recordset));
                        }
                    });
                }
                else if (req.url == "/api/auditorium_type" ) {
                    pool.request().query("select * from AUDITORIUM_TYPE", (err, result) => {
                        if (err) console.log("processing_result error:", err);
                        else {
                            res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                            res.end(JSON.stringify(result.recordset));
                        }
                    });
                }
                else if (req.url == "/api/auditorium") {
                    pool.request().query("select * from AUDITORIUM", (err, result) => {
                        if (err) console.log("processing_result error:", err);
                        else {
                            res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                            res.end(JSON.stringify(result.recordset));
                        }
                    });
                }
                else {
                    res.writeHead(200, {"Content-Type" : "text/plain; charset=utf-8"});
                    res.end("Неверный метод");
                }
            }
            else if (req.method == "POST") {
                if (req.url == "/api/faculty") {
                    let result = "";
                    req.on("data", data => { result += data; });
                    req.on("end", () => {
                        let obj = JSON.parse(result);
                        pool.request().input('f', sql.NChar, obj.FACULTY)
                            .input('fn', sql.NChar, obj.FACULTY_NAME)
                            .query(`insert FACULTY(FACULTY, FACULTY_NAME) values(@f, @fn)`, (err, result) => {
                            if (err) {
                                res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                res.end(`{"message" : "${err}"}`);
                            }
                            else {
                                res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                res.end(JSON.stringify(obj));
                            }
                        });
                    });
                }
                else if (req.url == "/api/pulpit") {
                    let result = "";
                    req.on("data", data => { result += data; });
                    req.on("end", () => {
                        let obj = JSON.parse(result);
                        pool.request().input('p', sql.NChar, obj.PULPIT)
                            .input('pn', sql.NChar, obj.PULPIT_NAME)
                            .input('f', sql.NChar, obj.FACULTY)
                            .query(`insert PULPIT(PULPIT, PULPIT_NAME, FACULTY) values(@p, @pn, @f)`, (err, result) => {
                            if (err) {
                                res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                res.end(`{"message" : "${err}"}`);
                            }
                            else {
                                res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                res.end(JSON.stringify(obj));
                            }
                        });
                    });
                }
                else if ( req.url == "/api/subject") {
                    let result = "";
                    req.on("data", data => { result += data; });
                    req.on("end", () => {
                        let obj = JSON.parse(result);
                        pool.request().input('s', sql.NChar, obj.SUBJECT)
                            .input('sn', sql.NChar, obj.SUBJECT_NAME)
                            .input('p', sql.NChar, obj.PULPIT)
                            .query(`insert SUBJECT(SUBJECT, SUBJECT_NAME, PULPIT) values(@s, @sn, @p)`, (err, result) => {
                            if (err) {
                                res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                res.end(`{"message" : "${err}"}`);
                            }
                            else {
                                res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                res.end(JSON.stringify(obj));
                            }
                        });
                    });
                }
                else if ( req.url == "/api/auditorium_type") {
                    let result = "";
                    req.on("data", data => { result += data; });
                    req.on("end", () => {
                        let obj = JSON.parse(result);
                        pool.request().input('a', sql.NChar, obj.AUDITORIUM_TYPE)
                            .input('an', sql.NChar, obj.AUDITORIUM_TYPENAME)
                            .query(`insert AUDITORIUM_TYPE(AUDITORIUM_TYPE, AUDITORIUM_TYPENAME) values(@a, @an)`, (err, result) => {
                            if (err) {
                                res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                res.end(`{"message" : "${err}"}`);
                            }
                            else {
                                res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                res.end(JSON.stringify(obj));
                            }
                        });
                    });
                }
                else if ( req.url == "/api/auditorium") {
                    let result = "";
                    req.on("data", data => { result += data; });
                    req.on("end", () => {
                        let obj = JSON.parse(result);
                        pool.request().input('a', sql.NChar, obj.AUDITORIUM)
                            .input('at', sql.NChar, obj.AUDITORIUM_TYPE)
                            .input('ac', sql.Int, obj.AUDITORIUM_CAPACITY)
                            .input('an', sql.NChar, obj.AUDITORIUM_NAME)
                            .query(`insert AUDITORIUM(AUDITORIUM, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY, AUDITORIUM_NAME) values(@a, @at, @ac, @an)`, (err, result) => {
                           if (err) {
                                res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                res.end(`{"message" : "${err}"}`);
                            }
                            else {
                                res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                res.end(JSON.stringify(obj));
                            }
                        });
                    });
                }
                else {
                    res.writeHead(200, {"Content-Type" : "text/plain; charset=utf-8"});
                    res.end("Неверный метод");
                }
            }
            else if (req.method == "PUT") {
                if (req.url == "/api/faculty" ) {
                    let result = "";
                    req.on("data", data => { result += data; });
                    req.on("end", () => {
                        let obj = JSON.parse(result);
                        pool.request().input('f', sql.NChar, obj.FACULTY).query("select * from FACULTY where FACULTY = @f", (err, result) => {
                            if (err) {
                                res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                res.end(`{"message" : "${err}"}`);
                            }
                            else {
                                if (result.recordset == "") {
                                    res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                    res.end(`{"message" : "Нечего добавлять"}`);
                                }
                                else {
                                    res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                    res.end(JSON.stringify(result.recordset));
                                    pool.request().input('f', sql.NChar, obj.FACULTY).input('fn', sql.NChar, obj.FACULTY_NAME).query("update FACULTY set FACULTY_NAME = @fn where FACULTY = @f", (err, result) => {
                                        if (err) {
                                            res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                            res.end(`{"message" : "${err}"}`);
                                        }
                                    });
                                }
                            }
                        });
                    });
                }
                else if (req.url == "/api/pulpit" ) {
                    let result = "";
                    req.on("data", data => { result += data; });
                    req.on("end", () => {
                        let obj = JSON.parse(result);
                        pool.request().input('p', sql.NChar, obj.PULPIT)
                            .query("select * from PULPIT where PULPIT = @p", (err, result) => {
                            if (err) {
                                res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                res.end(`{"message" : "${err}"}`);
                            }
                            else {
                                if (result.recordset == "") {
                                    res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                    res.end(`{"message" : "Нечего добавлять"}`);
                                }
                                else {
                                    res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                    res.end(JSON.stringify(result.recordset));
                                    pool.request().input('f', sql.NChar, obj.FACULTY)
                                        .input('pn', sql.NChar, obj.PULPIT_NAME)
                                        .input('p', sql.NChar, obj.PULPIT)
                                        .query("update PULPIT set PULPIT_NAME = @pn, FACULTY = @f where PULPIT = @p", (err, result) => {
                                        if (err) {
                                            res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                            res.end(`{"message" : "${err}"}`);
                                        }
                                    });
                                }
                            }
                        });
                    });
                }
                else if (req.url == "/api/subject" ) {
                    let result = "";
                    req.on("data", data => { result += data; });
                    req.on("end", () => {
                        let obj = JSON.parse(result);
                        pool.request().input('s', sql.NChar, obj.SUBJECT)
                            .query("select * from SUBJECT where SUBJECT = @s", (err, result) => {
                            if (err) {
                                res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                res.end(`{"message" : "${err}"}`);
                            }
                            else {
                                if (result.recordset == "") {
                                    res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                    res.end(`{"message" : "Нечего добавлять"}`);
                                }
                                else {
                                    res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                    res.end(JSON.stringify(result.recordset));
                                    pool.request().input('s', sql.NChar, obj.SUBJECT)
                                        .input('sn', sql.NChar, obj.SUBJECT_NAME)
                                        .input('p', sql.NChar, obj.PULPIT)
                                        .query("update SUBJECT set SUBJECT_NAME = @sn, PULPIT = @p where SUBJECT = @s", (err, result) => {
                                        if (err) {
                                            res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                            res.end(`{"message" : "${err}"}`);
                                        }
                                    });
                                }
                            }
                        });
                    });
                }
                else if (req.url == "/api/auditorium_type" ) {
                    let result = "";
                    req.on("data", data => { result += data; });
                    req.on("end", () => {
                        let obj = JSON.parse(result);
                        pool.request().input('at', sql.NChar, obj.AUDITORIUM_TYPE)
                            .query("select * from AUDITORIUM_TYPE where AUDITORIUM_TYPE = @at", (err, result) => {
                            if (err) {
                                res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                res.end(`{"message" : "${err}"}`);
                            }
                            else {
                                if (result.recordset == "") {
                                    res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                    res.end(`{"message" : "Нечего добавлять"}`);
                                }
                                else {
                                    res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                    res.end(JSON.stringify(result.recordset));
                                    pool.request().input('at', sql.NChar, obj.AUDITORIUM_TYPE)
                                        .input('an', sql.NChar, obj.AUDITORIUM_TYPENAME)
                                        .query("update AUDITORIUM_TYPE set AUDITORIUM_TYPENAME = @an where AUDITORIUM_TYPE = @at", (err, result) => {
                                        if (err) {
                                            res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                            res.end(`{"message" : "${err}"}`);
                                        }
                                    });
                                }
                            }
                        });
                    });
                }
                else if (req.url == "/api/auditorium") {
                    let result = "";
                    req.on("data", data => { result += data; });
                    req.on("end", () => {
                        let obj = JSON.parse(result);
                        pool.request().input('a', sql.NChar, obj.AUDITORIUM)
                            .query("select * from AUDITORIUM where AUDITORIUM = @a", (err, result) => {
                            if (err) {
                                res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                res.end(`{"message" : "${err}"}`);
                            }
                            else {
                                if (result.recordset == "") {
                                    res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                    res.end(`{"message" : "Нечего добавлять"}`);
                                }
                                else {
                                    res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                    res.end(JSON.stringify(result.recordset));
                                    pool.request().input('a', sql.NChar, obj.AUDITORIUM)
                                        .input('at', sql.NChar, obj.AUDITORIUM_TYPE)
                                        .input('ac', sql.NChar, obj.AUDITORIUM_CAPACITY)
                                        .input('an', sql.NChar, obj.AUDITORIUM_NAME)
                                        .query("update AUDITORIUM set AUDITORIUM_TYPE = @at, AUDITORIUM_CAPACITY = @ac, AUDITORIUM_NAME = @an where AUDITORIUM = @a", (err, result) => {
                                        if (err) {
                                            res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                            res.end(`{"message" : "${err}"}`);
                                        }
                                    });
                                }
                            }
                        });
                    });
                }
                else {
                    res.writeHead(200, {"Content-Type" : "text/plain; charset=utf-8"});
                    res.end("Неверный метод");
                }
            }
            else if (req.method == "DELETE") {
                if (req.url.includes("/api/faculty/") && !req.url.substr(15).includes("/")) {
                    let key = req.url.substr(15);
                    pool.request().input('f', sql.NChar, key).query("select * from FACULTY where FACULTY = @f", (err, result) => {
                        if (err) {
                            res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                            res.end(`{"message" : "${err}"}`);
                        }
                        else {
                            if (result.recordset == "") {
                                res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                res.end(`{"message" : "Нечего удалять"}`);
                            }
                            else {
                                res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                res.end(JSON.stringify(result.recordset));
                                pool.request().input('f', sql.NChar, key).query("delete from FACULTY where FACULTY = @f", (err, result) => {
                                    if (err) {
                                        res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                        res.end(`{"message" : "${err}"}`);
                                    }
                                });
                            }
                        }
                    });
                }
                else if (req.url.includes("/api/pulpit/") && !req.url.substr(13).includes("/")) {
                    let key = req.url.substr(13);
                    pool.request().input('f', sql.NChar, key).query("select * from PULPIT where PULPIT = @f", (err, result) => {
                        if (err) {
                            res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                            res.end(`{"message" : "${err}"}`);
                        }
                        else {
                            if (result.recordset == "") {
                                res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                res.end(`{"message" : "Нечего удалять"}`);
                            }
                            else {
                                res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                res.end(JSON.stringify(result.recordset));
                                pool.request().input('f', sql.NChar, key).query("delete from PULPIT where PULPIT = @f", (err, result) => {
                                    if (err) {
                                        res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                        res.end(`{"message" : "${err}"}`);
                                    }
                                });
                            }
                        }
                    });
                }
                else if (req.url.includes("/api/subject/") && !req.url.substr(14).includes("/")) {
                    let key = req.url.substr(14);
                    pool.request().input('f', sql.NChar, key).query("select * from SUBJECT where SUBJECT = @f", (err, result) => {
                        if (err) {
                            res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                            res.end(`{"message" : "${err}"}`);
                        }
                        else {
                            if (result.recordset == "") {
                                res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                res.end(`{"message" : "Нечего удалять"}`);
                            }
                            else {
                                res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                res.end(JSON.stringify(result.recordset));
                                pool.request().input('f', sql.NChar, key).query("delete from SUBJECT where SUBJECT = @f", (err, result) => {
                                    if (err) {
                                        res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                        res.end(`{"message" : "${err}"}`);
                                    }
                                });
                            }
                        }
                    });
                }
                else if (req.url.includes("/api/auditorium_type/") && !req.url.substr(22).includes("/")) {
                    let key = req.url.substr(22);
                    pool.request().input('f', sql.NChar, key).query("select * from AUDITORIUM_TYPE where AUDITORIUM_TYPE = @f", (err, result) => {
                        if (err) {
                            console.log(err);
                            res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                            res.end(`{"message" : "${err}"}`);
                        }
                        else {
                            if (result.recordset == "") {
                                res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                res.end(`{"message" : "Нечего удалять"}`);
                            }
                            else {
                                res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                res.end(JSON.stringify(result.recordset));
                                pool.request().input('f', sql.NChar, key).query("delete from AUDITORIUM_TYPE where AUDITORIUM_TYPE = @f", (err, result) => {
                                    if (err) {
                                        res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                        res.end(`{"message" : "${err}"}`);
                                    }
                                });
                            }
                        }
                    });
                }
                else if (req.url.includes("/api/auditorium/") && !req.url.substr(17).includes("/")) {
                    let key = req.url.substr(17);
                    pool.request().input('f', sql.NChar, key).query("select * from AUDITORIUM where AUDITORIUM = @f", (err, result) => {
                        if (err) {
                            console.log(err);
                            res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                            res.end(`{"message" : "${err}"}`);
                        }
                        else {
                            if (result.recordset == "") {
                                res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                res.end(`{"message" : "Нечего удалять"}`);
                            }
                            else {
                                res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                res.end(JSON.stringify(result.recordset));
                                pool.request().input('f', sql.NChar, key).query("delete from AUDITORIUM where AUDITORIUM = @f", (err, result) => {
                                    if (err) {
                                        res.writeHead(200, {"Content-Type" : "application/json; charset=utf-8"});
                                        res.end(`{"message" : "${err}"}`);
                                    }
                                });
                            }
                        }
                    });
                }
                else {
                    res.writeHead(200, {"Content-Type" : "text/plain; charset=utf-8"});
                    res.end("Неверный метод");
                }
            }
            else {
                res.writeHead(200, {"Content-Type" : "text/plain; charset=utf-8"});
                res.end("Неверный метод");
            }
        }
    });
};

var server = http.createServer();
 server.listen(3000, function(v) {console.log("server.listen(3000)")})
            .on("error", function(e) {console.log("server.listen(3000): error: ", e.code)})
            .on("request", http_handler);