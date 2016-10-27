//--harmony-async-await
const rq = require('request-promise');
const cheerio = require('cheerio');
const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36'
};

const maoyan = (() => ({
  getCityList() {
    return rq({
      uri: 'http://maoyan.com/',
      method: 'GET',
      headers,
      transform: body => cheerio.load(body)
    })
    .then($=>{
        console.log($('.city-list').html());
    });
  }
}))();
maoyan.getCityList();
module.exports = maoyan;