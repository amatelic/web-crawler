// var app = require('./server/server');
var crawl = require('./server/crawler');
var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');
const PORT = 4000;
var app = express();
app.use(bodyParser());
app.set('view engine', 'jade'); //setting jade template
app.use(express.static('public'));
var table = {
  reddit: 'https://www.reddit.com/r/javascript/'
};

app.get('/', function(req, res) {
  fs.readFile('./links/reddit-1458349729.txt', 'utf8', (err, data) => {
    if (err) throw Error('There were problems with loading the file');
    var links = data.split('\n');
    var main = links.splice(-4);
    res.render('index', {main, links});
  });
});

app.post('/download', function(req, res) {
  var site = req.body.url;
  if (table[site]) {
    crawl(table[site]);
    res.send('Downlonading');
  } else {
    res.send('The url is not correct');
  }
});

app.get('/download', function(req, res) {
  res.render('download', {urls: table});
});

app.listen(PORT, function() {
  console.log(`Crawler app is running on port ${PORT}!`);
});
