var crawler = require('./crawler');
var fs = require('fs-extra');
var cheerio = require('cheerio');
var URL = require('url-parse');

function reddit(params, callback) {
  var params = params || '';
  var url = 'https://www.reddit.com/r/' + params;
  var dir = (params) ? '-' + params : '';
  var path = `./links/reddit${dir}/reddit-${Math.floor(Date.now() / 1000)}.txt`;
  crawler(url)
    .then((html) => {
      return Promise.all(
        Array.from(html.find('a'))
          .filter(filterbyClass('title may-blank'))
          .map(updateRelativeUrls(url)));
    }).then((body) => {
      writeToDisk(path, body.join('\r\n'), callback);
    });
}

function filterbyClass(expresion) {
  return (el) => {
    return cheerio(el).hasClass('title may-blank');
  };
};

function updateRelativeUrls(siteUrl) {
  return function(el) {
    const url = URL(el.attribs.href);
    var newUrl = siteUrl + url.href.slice(2);
    return (url.hostname) ? url.href : newUrl;

  };
};

function writeToDisk(path, body, callback) {
  fs.outputFile(path, body, callback);
}

module.exports = reddit;
