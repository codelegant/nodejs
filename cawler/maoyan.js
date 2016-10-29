//--harmony-async-await
const phantom = require('phantom');
const req = require('request');
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
    const j = rq.jar();
    const uri = 'http://maoyan.com/films';
    const cookie = rq.cookie('ci=30');//设置城市 cookie ，深圳
    j.setCookie(cookie, uri);
    const getOnePageList = (offset = 0)=> {
      return rq({
        uri,
        jar: j,
        headers,
        qs: {showType: 1, offset}
      })
        .then(htmlString=> htmlString);
    };
    let movieList = [];
    (async()=> {
      let offset = 0;
      let $ = cheerio.load(await getOnePageList());
      let $_MovieList = $('.movie-list');
      do {
        const $_DdList = $_MovieList.find('dd');
        for (const ddIndex in $_DdList) {
          if (ddIndex < $_DdList.length) {
            const $_Dd = $($_DdList[ddIndex]);
            const id = $_Dd.find('.movie-item a').data('val').replace(/{[a-z]+:(\d+)}/gi, '$1');
            movieList.push({
              link: `http://www.meituan.com/dianying/${id}?#content`, //影片首页，同时也是购票链接
              img: $_Dd.find('.movie-poster img').eq(1).data('src'), //缩略图
              name: $_Dd.find('.movie-item-title').attr('title'), //名称,
              infoList: '' //介绍信息，导演，主演等
            });
          }
        }
        $ = cheerio.load(await getOnePageList(offset += 30));
        $_MovieList = $('.movie-list');
      } while ($_MovieList.length);
    })();
    return movieList;
  }
}))();
console.log(maoyan.getHotMovieList());
module.exports = maoyan;