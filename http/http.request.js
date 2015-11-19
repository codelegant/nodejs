/**
 * Copyright (C) 2015 Codelegant. All rights reserved
 * Datetime: 2015/11/19 13:58
 * Description:
 * Author: 赖传峰
 * Email: laichuanfeng@hotmail.com
 * Homepage: laichuanfeng.com
 */
var http        = require("http"),
    querystring = require("querystring");

var httpServer = http.createServer(function (request,response) {


    var postData = querystring.stringify({
        'msg': 's?ie=UTF-8&wd=helloworld'
    });

    var options = {
        hostname: 'www.baidu.com',
        port    : 80,
        path    : '',
        method  : 'POST',
        headers : {
            'Content-Type'  : 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    };
    var req = http.request(options, function (res) {
        console.log("STATUS:" + res.statusCode);
        console.log("Headers:" + JSON.stringify(res.headers));
        res.setEncoding("utf8");
        res.on("data", function (chunk) {
            response.write("BODY:" + chunk);
        });
    });
    req.on("error", function (e) {
        console.log("Problem width request:" + e.message);
    });
    req.write(postData);
    req.end();
}).listen(1010);