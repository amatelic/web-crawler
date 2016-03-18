var request = require('request');
var reddit = require('./save');
var fs = require('fs');
function  crawl(url) {
  console.log('Visiting page ' + url);
  request(url, getRequest);
}

function getRequest(error, response, body) {
  console.log('Status code: ' + response.statusCode);
  if (response.statusCode === 200) {
    reddit.writeToDisk(error, body);
  }
}

module.exports = crawl;
