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

function getFiles(err, data, a) {
  if (err) throw Error('There were problems with loading the file.');
}

function createFile(err, data) {
  if (err) throw Error('There were problems with loading the file.');
  var information = [];
  var $ = cheerio.load(data);
  // https://www.reddit.com
  $('a').each((i, el) => {
    if (/title may-blank/.exec(el.attribs.class)) {
      var url = URL(el.attribs.href);
      if (url.hostname) {
        information.push(url.href);
      } else {
        information.push('https://www.reddit.com' + url.pathname);
      }

      // if (/(javascript|js)/.exec($(el).text().toLowerCase())) {
      //   information.push(`${$(el).text()} - ${el.attribs.href}`);
      // }
      console.log(Math.floor(Date.now() / 1000));
    }
  });
  console.log(information);
  var timestamps = Math.floor(Date.now() / 1000);
  // fs.writeFile(`./links/reddit-${timestamps}.txt`, information.join('\n'), writeFile);
  // open(information[0]);
}

function writeFile(err) {
  if (err) return console.log(err);
  console.log('The file was saved!');
}

function readRedits(name) {
  fs.readFile(name, 'utf8', function(err, body) {
    var arr = body.split('\n');
    arr.forEach((data, i) => {
      if (i % 2 !== 0) {
        // console.log(data, i);
        if (/(http|s)/.exec(data)) {
          // open(data);
        }
      }

    });
  });
}
