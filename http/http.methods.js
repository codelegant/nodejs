var http=require("http");
http.STATUS_CODES[200]="Good";//�Զ�����Ӧ�ı�
var httpServer=http.createServer();
httpServer.on("request",function(req,res){
    console.log("get Resquest");
}).listen(8888);