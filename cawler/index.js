//--harmony-async-await
const restify = require('restify');
const taobao = require('./taobao');
const maoyan = require('./maoyan');

const server = restify.createServer();
server.get('/taobao/cities', async(req, res)=> {
  res.json(await taobao.getCityList());
});

server.get('/taobao/movies', async(req, res)=> {
  res.json(await taobao.getHotMovieList());
});

server.get('/maoyan/cities', async(req, res)=> {
  res.json(await maoyan.getCityList());
});


server.get('/maoyan/movies', async(req, res)=> {
  res.json(await maoyan.getHotMovieList());
});


server.listen(8080, ()=> {
  console.log('%s listening at %s', server.name, server.url);
});