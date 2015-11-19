/**
 * Copyright (C) 2015 Codelegant. All rights reserved
 * Datetime: 2015/11/19 14:22
 * Description:
 * Author: 赖传峰
 * Email: laichuanfeng@hotmail.com
 * Homepage: laichuanfeng.com
 */
var http=require("http");
http.get("http://www.google.com/index.html",function(res){
    console.log("Got response: "+res.statusCode);
}).on("error",function(e){
    console.log("Got error: "+ e.message)
});