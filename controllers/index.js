var express = require('express');
var router = express.Router();
var table = require('../data/urls.json');
var rules = require('../data/rules.json');
var reddit = require('../server/reddit');
var fs = require('fs-extra');
var path = require('path');

router.get('/', function(req, res) {
  fs.readdir('./links', function(err, files) {
    if (err) throw new Error(err);
    var urls = files.reduce(getAllFiles, []);
    getLinks(`./links/${files[urls.length - 1]}`, (err, first4Links, links) => {
      if (err) throw new Error(err);
      res.render('index', {first4Links, links, urls});
    });
  });
});

router.get('/download', function(req, res) {
  console.log(table);
  res.render('download', {urls: table});
});

router.post('/download', function(req, res) {
  var site = req.body.url;
  if (table[site]) {
    var query = req.body.query || table[site].default;
    reddit(query, function(error, data) {
      if (error) {
        res.json('There was a problem');
      }

      res.json('The filew was downloaded!');
    });
  } else {
    res.json('The url is not correct');
  }
});

router.get('/data/:id', function(req, res) {
  fs.readdir('./links', function(err, files) {
    if (err) throw new Error(err);
    var urls = files.reduce(getAllFiles, []);
    getLinks(`./links/reddit-${req.originalUrl.slice(6)}.txt`, (err, first4Links, links) => {
      if (err) throw new Error(err);
      res.render('index', {first4Links, links, urls});
    });
  });
});

function getAllFiles(collection, files, index) {
  if (path.extname(files) === '.txt') {
    collection.push({name: `reddit-${index}`, url: files.slice(7, -4)});
  }

  return collection;
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
