var crawler = require('./crawler');
var fs = require('fs-extra');
var cheerio = require('cheerio');
var URL = require('url-parse');
var exec = require('child_process').exec;


function reddit(params, callback) {
  var params = params || '';
  var url = 'https://www.reddit.com/r/' + params;
  var dir = (params) ? '-' + params : '';
  var path = `./links/reddit${dir}/reddit-${Math.floor(Date.now() / 1000)}.txt`;
  console.log(`Downloading from site ${url}`);
  crawler(url)
    .then((html) => {
      return Promise.all(
        Array.from(html.find('a'))
          .filter(filterbyClass('title may-blank'))
          .map(updateRelativeUrls(url)));
    }).then((body) => {
      var images = body.filter((url) =>  url.search('reddit') === -1)
        .forEach((url, index) => {
          const ls = exec('casperjs ./server/downlaodImages.js --url="' + url + '" --name="' + index + '"', function(err, stdout, stderr) {
            err && console.log(err);
            stderr && console.log(stderr.toString());
            stdout && console.log(stdout.toString());
          });
        });
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
