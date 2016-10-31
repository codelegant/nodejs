//--harmony-async-await
const restify = require('restify');
const taobao = require('./taobao');
const maoyan = require('./maoyan');
const gewara = require('./gewara');
const _mergeWith = require('lodash.mergewith');
const _isArray = require('lodash.isarray');
const _unionWith = require('lodash.unionwith');
const _unset = require('lodash.unset');

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

server.get('/gewara/movies', async(req, res)=> {
  res.json(await gewara.getHotMovieList());
});

server.get('/cities', async(req, res)=> {
  const cityLists = await Promise.all([taobao.getCityList(), maoyan.getCityList()]).then(cityLists=>cityLists);
  const _arrUnion = (taobao, maoyan)=>_unionWith(taobao, maoyan, (src, target)=> {
    if (src.regionName === target.regionName) {
      _unset(target, 'id');
      _unset(target, 'parentId');
      _unset(target, 'pinYin');
      return target.cityCode = {taobao: target.cityCode, maoyan: src.cityCode, gewara: target.cityCode};
    }
  });
  const _objMerge = _mergeWith(cityLists[0], cityLists[1],
    (target, src)=> {
      if (_isArray(target) && _isArray(src)) {
        return _arrUnion(target, src);
      }
    }
  );
  res.json(_objMerge);
});

server.get('/movies', async(req, res)=> {
  res.json(await Promise.all([taobao.getHotMovieList(), maoyan.getHotMovieList(), gewara.getHotMovieList()]).then(movieLists=>movieLists));
});


server.listen(8080, ()=> {
  console.log('%s listening at %s', server.name, server.url);
});