var net = require("net");
var path = require("path");
/**
 * 相当于调用net.Socket类创建一个实例
 * */
// var client = net.createConnection({ 
// 	path: path.join('\\\\?\\pipe', process.cwd(), 'myctl') 
// 	});
var client=net.createConnection({
	port:1010
});
client.on("connect", function () {
	console.log(client.address());
	console.log(client.localAddress);
	console.log("成功连接到服务器");
	client.write("world\r\n");
});
client.on("data", function (data) {
	console.log(data.toString());
	client.end();
});
client.on("end", function () {
	console.log("从服务器断开");
});
