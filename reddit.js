var reddit = require('./server/reddit');
var bodyParser = require('body-parser');
var express = require('express');
var jobs = require('./server/cronJobs');
var j = require('./server/jobs.js');
const PORT = 4000;
var app = express();

app.use(bodyParser.json());
app.set('view engine', 'jade');
app.use(express.static('public'));

app.use('/', require('./controllers/index.js'));

app.listen(PORT, function() {
  console.log(`Crawler app is running on port ${PORT}!`);
});

// jobs.startAll();
// j.weeklyCleaning();
