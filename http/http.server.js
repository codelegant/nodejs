/**
 * Copyright (C) 2015 Codelegant. All rights reserved
 * Datetime: 2015/11/19 8:59
 * Description:
 * Author: 赖传峰
 * Email: laichuanfeng@hotmail.com
 * Homepage: laichuanfeng.com
 */
var http = require("http"),
    url = require("url");
var httpServer = http.createServer();//Instance of http.Server
httpServer.listen(1010);
httpServer.on("listening", function () {
    console.log("监听端口:1010");
});
httpServer.on("request", function (req, res) {
    res.on("close", function () {
        console.log("服务器关闭");
    });
    res.on("finish", function () {
        console.log("请求完成");
    });
    var body = "我在学习Nodejs";
    //res.setHeader("Content-Type","text/plain");
    res.writeHead(200, body, {
        "Content-Type": "text/html"
    });
    res.end(body);
});
httpServer.on("close", function () {
    console.log("服务器关闭");
});
httpServer.on("connection", function (socket) {
    console.log("有Nodejs客户端通过'connection'方法连接");
});
httpServer.on("connect", function (req, socket, head) {
    console.log("有Nodejs客户端通过'connect'方法连接");
});
httpServer.on("upgrade", function () {
    console.log("有Nodejs客户端通过'upgrade'方法连接");
});
