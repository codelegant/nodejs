//--harmony-async-await
/*global phantom:false*/
const phantom = require('phantom');
const rq = require('request-promise');
const cheerio = require('cheerio');
const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36'
};

const maoyan = (() => ({
  getCityList() {
    let sitepage = undefined;
    let phInstance = undefined;

    phantom.create()
      .then(instance => {
        phInstance = instance;
        return instance.createPage();
      })
      .then(page => {
        sitepage = page;
        return page.open('http://maoyan.com/');
      })
      .then(status => {
        console.log(status);
        if (status !== 'success') throw Error(`StatusCode:${status}`);
        return sitepage.property('content');
      })
      .then(content => {
        const $ = cheerio.load(content);
        const $_CityList = $('.city-list').find('ul li');
        const cityList = {};
        for (const listIndex in $_CityList) {
          if (listIndex < $_CityList.length) {
            const $_List = $($_CityList[listIndex]);
            const key = $_List.find('span').text();
            cityList[key] = [];
            const $_AList = $_List.find('a');
            for (const aIndex in $_AList) {
              if (aIndex < $_AList.length) {
                const $_A = $($_AList[aIndex]);
                cityList[key].push({
                  regionName: $_A.text(),
                  cityCode: Number($_A.attr('data-ci'))
                });
              }
            }
          }
        }
        sitepage.close();
        phInstance.exit();
        console.log(cityList);
        return cityList;
      })
      .catch(error => {
        console.log(error);
        phInstance.exit();
      });
  },
  getHotMovieList() {
    rq.cookie('ci=150');
    rq({
      uri: 'http://maoyan.com/films',
      qs: {
        showType: 1
      },
      jar: true,
      
      headers,
      transform: body => cheerio.load(body)
    })
    .then($=>{
      console.log($('.movie-list').html());
    });
  }
}))();
maoyan.getHotMovieList();
module.exports = maoyan;