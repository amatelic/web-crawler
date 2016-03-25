var express = require('express');
var router = express.Router();
var table = require('../data/urls.json');
var rules = require('../data/rules.json');
var crawl = require('../server/crawler');
var fs = require('fs');

router.get('/', function(req, res) {
  fs.readdir('./links', function(err, files) {
    if (err) throw new Error(err);
    var urls = files.map(createLinks);
    getLinks(`./links/${files[files.length - 1]}`, (err, first4Links, links) => {
      if (err) throw new Error(err);
      res.render('index', {first4Links, links, urls});
    });
  });
});

router.get('/download', function(req, res) {
  res.render('download', {urls: table});
});

router.post('/download', function(req, res) {
  var site = req.body.url;
  if (table[site]) {
    var query = req.body.query || table[site].default;
    var url = table[site].path + query;
    crawl(url, function(err) {
      if (err) res.json('error');

      res.json('success');
    });
  } else {
    res.json('The url is not correct');
  }
});

router.get('/:id', function(req, res) {
  fs.readdir('./links', function(err, files) {
    if (err) throw new Error(err);
    var urls = files.map(createLinks);
    getLinks(`./links/reddit-${req.originalUrl.slice(1)}.txt`, (err, first4Links, links) => {
      if (err) throw new Error(err);
      res.render('index', {first4Links, links, urls});
    });
  });
});

function createLinks(e, index) {
  return {name: `reddit-${index}`, url: e.slice(7, -4)};
}

function getLinks(path, callback) {
  fs.readFile(path, 'utf8', (err, file) => {
    if (err) callback(err);

    var links = file.split('\n');
    var main = links.filter((link) => {
      return link.match(rules.blockedSites) === null;
    }).splice(-4);

    callback(null, main, links);
  });
}

module.exports = router;
