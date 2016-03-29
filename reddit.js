var CronJob = require('cron').CronJob;
var reddit = require('./server/reddit');
var bodyParser = require('body-parser');
var express = require('express');
var reddit = require('./server/reddit');
const PORT = 4000;
var app = express();

app.use(bodyParser.json());
app.set('view engine', 'jade');
app.use(express.static('public'));

app.use('/', require('./controllers/index.js'));

app.listen(PORT, function() {
  console.log(`Crawler app is running on port ${PORT}!`);
});

var dailyJavascriptNews = new CronJob('00 00 12 * * 1-5', function() { //21.12 from monday to friday
  reddit('javascript', () => { console.log('working'); });
}, true);
