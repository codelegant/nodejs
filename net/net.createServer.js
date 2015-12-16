var net = require("net");
var path = require("path");
var events = require('events');
/**
 * 相当于调用net.Server类创建一个实例
 * */
var server = new net.Server();
//var server=net.createServer();
var myEvent=new events.EventEmitter();
var eventListener=events.EventEmitter.listenerCount(server,"listen");
server.listen(1010, "lai");
server.on("connection", function (socket) {
	console.log("有客户端连接过来了");
	socket.on("end", function () {
		console.log("连接断开");
	});
	socket.write("你好，这是返回信息。\r\n");
})
server.on("listening", function () {
	console.log("服务器启动");
	console.log(server.address());
});
server.on("error", function (e) {
	if (e.code === "EADDRINUSE") {
		console.log("地址被占用，重试中...");
		setTimeout(function () {
			server.close();
			server.listen(path.join('\\\\?\\pipe', process.cwd(), 'myctl'));
		}, 1000);
	}
});
console.log(eventListener);