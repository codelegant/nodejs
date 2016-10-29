const rq = require('request-promise');
const cherrio = require('cheerio');
const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36'
};

const gewara = (()=>({
  getCityList(){
    return rq({
      uri: 'http://www.gewara.com/ajax/common/loadHeadCity.xhtml',
      method: 'GET',
      transform: body=>cherrio.load(body),
      header
    })
      .then(($)=> {

      })
  },
  getHotMovieList(){

  }
}))();

module.exports = gewara;
