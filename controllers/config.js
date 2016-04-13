var express = require('express');
var cronScheduler = require('../crons/cronJobs.js');
var router = express.Router();

router.get('/', function(req, res) {
  var jobs = cronScheduler.getJobsStatus();
  res.render('settings', {jobs});
});

module.exports = router;
