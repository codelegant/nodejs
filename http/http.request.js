/**
 * Copyright (C) 2015 Codelegant. All rights reserved
 * Datetime: 2015/11/19 13:58
 * Description: 可以用于向API服务器发送请求，并获取结果
 * Author: 赖传峰
 * Email: laichuanfeng@hotmail.com
 * Homepage: laichuanfeng.com
 */
var http        = require("http"),
    querystring = require("querystring");

var httpServer = http.createServer(function (request, response) {
    var options = {
        hostname: 'www.baidu.com',
        port    : 80,
        path    : '',
        method  : 'get',
        headers : {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    var req = http.request(options, function (res) {
        console.log("STATUS:" + res.statusCode);
        console.log("Headers:" + JSON.stringify(res.headers));
        res.setEncoding("utf8");
        res.on("data", function (chunk) {
            response.write("BODY:" + chunk);
            console.log("BODY:" + chunk);
        });
    });
    req.on("error", function (e) {
        console.log("Problem width request:" + e.message);
    });
    req.end();
}).listen(1010);