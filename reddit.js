#!/usr/bin/env casperjs
var reddit = require('./server/reddit');
var bodyParser = require('body-parser');
var express = require('express');
var reddit = require('./server/reddit');
var cron = require('./crons/all');
const PORT = 4000;
var app = express();

app.use(bodyParser.json());
app.set('view engine', 'jade');
app.use(express.static('public'));

app.use('/', require('./controllers/index.js'));
app.use('/settings', require('./controllers/config.js'));

app.listen(PORT, function() {
  console.log(`Crawler app is running on port ${PORT}!`);
});

cron.start();
