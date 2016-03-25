var request = require('request');
var reddit = require('./save');
var fs = require('fs');

function  crawl(url, callback) {
  console.log('Visiting page ' + url);
  request(url, function(err, response, body) {
    if (err) {
      callback(err);
    }
    console.log('Status code: ' + response.statusCode);
    if (response.statusCode === 200) {
      reddit.writeToDisk(body, callback);
    }
  });
}


module.exports = crawl;
