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

var httpClient=http.request({
    hostname:"lai",
    port:1010
});
// httpClient.on("response",function(host,prot,socketPath){
//     console.log("使用'response'连接nodejs服务器");
// });
httpClient.on("connect",function(){
    console.log("使用'connect'连接nodejs服务器");
});
httpClient.on("socket",function(){
    console.log("使用'socket'连接nodejs服务器");
});
httpClient.on("abort",function(){
    console.log("连接被终止");
});
httpClient.on("upgrade",function(){
    console.log("upgrade连接");
});
httpClient.on("error",function(){
    console.log("与nodejs服务器连接出错");
});
