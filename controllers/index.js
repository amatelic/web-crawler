var express = require('express');
var router = express.Router();
var table = require('../data/urls.json');
var crawl = require('../server/crawler');
var fs = require('fs');
router.get('/', function(req, res) {

  fs.readdir('./links', function(err, files) {
    var urls = files.map(createLinks);

    fs.readFile(`./links/${files[files.length - 1]}`, 'utf8', (err, data) => {
      if (err) throw Error('There were problems with loading the file');
      var links = data.split('\n');
      var main = links.filter((link) => {
        return link.indexOf('reddit') === -1;
      }).splice(-4);
      res.render('index', {main, links, urls});
    });
  });
});

router.get('/:id', function(req, res) {
  fs.readdir('./links', function(err, files) {
    var urls = files.map(createLinks);
    fs.readFile(`./links/reddit-${req.originalUrl.slice(1)}.txt`, 'utf8', (err, data) => {
      if (err) throw Error('There were problems with loading the file');
      var links = data.split('\n');
      var main = links.filter((link) => {
        return link.indexOf('reddit') === -1; //replace with regular expresion
      }).splice(-4);
      res.render('index', {main, links, urls});
    });
  });
});

router.post('/download', function(req, res) {
  var site = req.body.url;
  if (table[site]) {
    crawl(table[site]);
    res.send('Downlonading');
  } else {
    res.send('The url is not correct');
  }
});

router.get('/download', function(req, res) {
  res.render('download', {urls: table});
});

function createLinks(e, index) {
  return {name: `reddit-${index}`, url: e.slice(7, -4)};
}

module.exports = router;
