var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

function crawler(url) {
  console.log('Start downloading');
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        console.log('Finished loading');
        resolve(cheerio(body), cheerio);
      } else {
        reject(error);
      }
    });
  });
}

module.exports = crawler;
