/**
 * Copyright (C) 2015 Codelegant. All rights reserved
 * Datetime: 2015/11/19 19:16
 * Description:
 * Author: 赖传峰
 * Email: laichuanfeng@hotmail.com
 * Homepage: laichuanfeng.com
 */
var http = require("http");
var net = require("net");
var url = require("url");

var proxy = http.createServer(function (req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end("okay");
});
proxy.on("connect", function (req, cltSocket, head) {
    var srvUrl = url.parse("http://" + req.url);
    var srvSocket = net.connect(srvUrl.port, srvUrl.hostname, function () {
        cltSocket.write("HTTP/1.1 200 Connection Established\r\n"
            + "Proxy-agent:Node.js-Proxy\r\n"
            + "\r\n");
        srvSocket.write(head);
        srvSocket.pipe(cltSocket);
        cltSocket.pipe(srvSocket);
    });
});
proxy.listen(1010, "lai", function () {
    var options = {
        port    : 1010,
        hostname: "lai",
        method  : "CONNECT",
        path    : "www.baidu.com:443"
    };

    var req = http.request(options);
    req.end();
    req.on("connect", function (res, socket, head) {
        console.log("Got Connected!");
        socket.write('GET / HTTP/1.1\r\n' +
            'Host: www.google.com:80\r\n' +
            'Connection: close\r\n' +
            '\r\n');
        socket.on("data", function (chunk) {
            console.log(chunk.toString());
        });
    });

});
