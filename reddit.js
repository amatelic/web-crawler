// https://www.reddit.com/r/javascript/
// var app = require('./server/server');
var crawl = require('./server/crawler');
var express = require('express');
var fs = require('fs');
const PORT = 4000;
var app = express();

app.set('view engine', 'jade'); //setting jade template
app.use(express.static('public'));
app.get('/', function(req, res) {
  fs.readFile('./links/reddit-1458349729.txt', 'utf8', (err, data) => {
    if (err) throw Error('There were problems with loading the file');
    var links = data.split('\n');
    var main = links.splice(-4);
    console.log(main);
    res.render('index', {main, links});
  });
});

app.listen(PORT, function() {
  console.log(`Crawler app is running on port ${PORT}!`);
});

var START_URL = 'https://www.reddit.com/r/javascript/';
// crawl(START_URL);
