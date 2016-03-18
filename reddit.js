// https://www.reddit.com/r/javascript/
// var app = require('./server/server');
var crawl = require('./server/crawler');
var express = require('express');
var fs = require('fs');
const PORT = 4000;
var app = express();

app.set('view engine', 'jade'); //setting jade template
app.get('/', function(req, res) {
  fs.readFile('./links/reddit-1458178573.txt', 'utf8', (err, links) => {
    if (err) throw Error('There were problems with loading the file');
    res.render('index', { links: links.split('\n').slice(0, 3)});
  });
});

app.listen(PORT, function() {
  console.log('Crawler app is running on port 3000!');
});

var START_URL = 'https://www.reddit.com/r/javascript/';
// crawl(START_URL);
