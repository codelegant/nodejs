const request = require('request');
const cheerio = require('cheerio');
const URL = require('url-parse');
const fs=require('fs');

const START_URL = 'http://laichuanfeng.com/';
const SEARCHT_WORD = 'ES6';
const MAX_PAGES_TO_VISIT = 10;

const pagesVisited = new Set();
const pagesToVisit = [];
const url = new URL(START_URL);
const baseUrl = `${url.protocol}//${url.hostname}`;

const searchForWord = ($, word) => {
  const bodyText = $('html>body').text();
  return bodyText.toLowerCase().indexOf(word.toLowerCase()) !== -1;
};

const collectInernalLinks = $ => {


  const absoluteLinks = $('a[href^="http"]');
  console.log(`Found ${absoluteLinks.length} absolute links`);
  // console.log(absoluteLinks);
  absoluteLinks.each(function () {
    pagesToVisit.push($(this).attr('href'));
  });

};

const visitPage = (url, callBack) => {
  pagesVisited.add(url);
  console.log(`Visiting page ${url}`);

  request(url, (err, res, body) => {
    if (!res) {
      console.log(`${url} no response`);
      return callBack();
    }
    console.log(`Status code: ${res.statusCode}`);
    if (res.statusCode !== 200) return callBack();
    const $ = cheerio.load(body);
    const isWordFound = searchForWord($, SEARCHT_WORD);
    if (isWordFound) {
      console.log(`Word ${SEARCHT_WORD} found at page ${url}`);
    } else {
      collectInernalLinks($);
      callBack();
    }
  });
};

const crawl = () => {
  if (pagesVisited.size >= MAX_PAGES_TO_VISIT) return console.log('Reached max limit of number of pages to visit.');

  const nextPage = pagesToVisit.pop();
  if (pagesVisited.has(nextPage)) {
    crawl();
  } else {
    visitPage(nextPage, crawl);
  }
};

pagesToVisit.push(START_URL);
crawl();
