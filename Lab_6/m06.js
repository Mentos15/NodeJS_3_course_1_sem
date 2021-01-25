var sendmail = require("sendmail")({silent: true});
const mail = "wamet47722@finxmail.net";

var send = function(message) {
    sendmail({
        from: mail,
        to: mail,
        subject: "test message №2",
        text: message
    }, function (err, reply) {
        console.log(err && err.stack);
        console.dir(reply);
    });
}


module.exports = send;