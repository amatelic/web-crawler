var cronScheduler = require('./cronJobs.js');
var reddit = require('../server/reddit');
var fs = require('fs-extra');
var Log = require('log');
var log = new Log('debug', fs.createWriteStream('./logs/download.log'));
cronScheduler.addCommand('dailyReddit', {cronTime: '00 40 22 * * *'}, function() {
  reddit('javascript', _ => log.info('finished dowloading reddit file'));
});

cronScheduler.runAll();
module.exports = {
  start() {
    console.log('All crons have started');
  },
};
