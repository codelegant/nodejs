var http=require('http'),
	console=require("better-console");
http.createServer(function(request,response){
	response.writeHead(200,{'Content-Type':'text/html'});
	response.end('Hello World\n');
}).listen(8124);
console.info('Server Runing');