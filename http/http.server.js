/**
 * Copyright (C) 2015 Codelegant. All rights reserved
 * Datetime: 2015/11/19 8:59
 * Description:
 * Author: 赖传峰
 * Email: laichuanfeng@hotmail.com
 * Homepage: laichuanfeng.com
 */
var http=require("http"),
    url=require("url");
var httpServer=http.createServer();//Instance of http.Server
httpServer.on("request",function(req,res){
    res.on("close",function(){
        console.log("close");
    });
    res.on("finish",function(){
        console.log("Request Finish");
    });
    var body="Programming nodejs";
    //res.setHeader("Content-Type","text/plain");
    res.writeHead(200,"You get my message",{
        "Content-Length":body.length,
        "Content-Type":"text/html"
    });
    res.end(body);
});
httpServer.on("close",function(){
   console.log("Server Closed");
});
httpServer.on("connect",function(req,socket,head){
    console.log("Server Connect");
    console.log(head);
});
httpServer.listen(1010,"lai",function(){
    console.log("Listen Port:1010");
});