var http=require("http");
http.STATUS_CODES[200]="Good";//自定义响应文本
var httpServer=http.createServer();
httpServer.on("request",function(req,res){
    console.log("get Resquest");
}).listen(8888);