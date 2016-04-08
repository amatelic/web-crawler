var express = require('express');
var router = express.Router();
var table = require('../data/urls.json');
var rules = require('../data/rules.json');
var reddit = require('../server/reddit');
var fs = require('fs-extra');
var path = require('path');
var mainDirectory = './links/reddit-javascript';

router.get('/', function(req, res) {
  fs.readdir(mainDirectory, function(err, files) {
    if (err) throw new Error(err);
    var urls = files.reduce(getAllFiles, []);
    console.log(files);

    if (files.length === 0) {
      res.render('empty');
      return;
    }

    getLinks(`${mainDirectory}/${files[urls.length - 1]}`, (err, first4Links, links) => {
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
  fs.readdir(mainDirectory, function(err, files) {
    if (err) throw new Error(err);
    var urls = files.reduce(getAllFiles, []);
    getLinks(`${mainDirectory}/reddit-${req.originalUrl.slice(6)}.txt`, (err, first4Links, links) => {
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
    });

    callback(null, main, links);
  });
}

module.exports = router;
