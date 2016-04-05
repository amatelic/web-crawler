var CronJob = require('cron').CronJob;
var reddit = require('./reddit');
var fs = require('fs-extra');
var Log = require('log');

var log = new Log('info', fs.createWriteStream('./logs/download.log'));

var jobs = {
  startAll: function() {
    dailyJavascriptNews.start();
  },

  stopAll: function() {
    dailyJavascriptNews.stop();
  },
};

var dailyJavascriptNews = new CronJob({
  cronTime: '00 31 18 * * *',
  onTick: function() {
    reddit('javascript', _ => {
      log.info('finished dowloading reddit file');
    });
  },

  start: false,
});

module.exports = jobs;
