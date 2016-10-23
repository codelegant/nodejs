const rq = require('request-promise');
const cheerio = require('cheerio');
const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36'
};


/**
 * 获取城市列表
 */
const timeStampStr = Date.now().toString();
let addressList = [];
rq({
  uri: 'http://dianying.taobao.com/cityAction.json',
  method: 'GET',
  qs: {
    _ksTS: `${timeStampStr}_20`,
    jsoncallback: `jsonp20`,
    action: 'cityAction',
    n_s: 'new',
    event_submit_doGetAllRegion: true
  },
  headers
})
  .then(res => {
    const resJson = JSON.parse(res.replace(/jsonp\d{2,3}\((.+)\);$/, '$1'));
    for (const key in resJson.returnValue) {
      if (!resJson.returnValue.hasOwnProperty(key)) continue;
      addressList = addressList.concat(resJson.returnValue[key]);
    }
  })
  .catch(err => console.log(err));


/**
 * 获取热映电影列表
 */
rq({
  uri: 'http://dianying.taobao.com/showList.htm',
  method: 'GET',
  qs: {
    n_s: 'new',
    city: 440300
  },
  headers,
  transform:body=>cheerio.load(body)
})
  .then($=>{
    console.log($('.tab-movie-list').html());
  })
  .catch(err => console.log(err));