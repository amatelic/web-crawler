var cheerio = require('cheerio');
var URL = require('url-parse');
var spawn = require('child_process').spawn;
var fs = require('fs');
var open = require('open');
//Todo implement searcing with regular expresion

module.exports = {
  getFromDisk: getFiles,
  writeToDisk: createFile,
};

function createFile(data, callback) {
  var $ = cheerio.load(data);
  var urls = Array.from($('a'))
                  .map(getUrlArray('https://www.reddit.com'))
                  .filter((obj) => obj !== undefined);

  var timestamps = Math.floor(Date.now() / 1000);
  fs.writeFile(`./links/reddit-${timestamps}.txt`, urls.join('\n'), writeFile);
  open(urls[0]);
  callback();
}

function getUrlArray(siteUrl) {
  return function(el) {
    if (/title may-blank/.exec(el.attribs.class)) {
      const url = URL(el.attribs.href);
      console.log(siteUrl + url.pathname);
      return (url.hostname) ? url.href : (siteUrl + url.pathname);
    }
  };
}

function getFiles(err, data, a) {
  if (err) throw Error('There were problems with loading the file.');
}

function writeFile(err) {
  if (err) return console.log(err);
  console.log('The file was saved!');
}
