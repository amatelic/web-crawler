var CronJob = require('cron').CronJob;
var fs = require('fs-extra');
var Log = require('log');

var log = new Log('info', fs.createWriteStream('./logs/download.log'));

var CronJob = require('cron').CronJob;

var options = {
  cronTime: '* * * * * *',
  start: false,
  onTick: null,
};

var jobCommander = (function() {
  var commands = {};

  function addCommand(name, option, callback) {

    if (Object.keys(arguments).length < 3) {
      callback = option;
      option = options;
      option.onTick = callback;
    } else {
      var option = Object.assign({}, options, option);
      option.onTick = callback;
    }

    if (typeof callback !== 'function') {
      throw new Error('You haven\' specify the callback');
    }

    if (commands[name]) {
      throw new Error('Command already exsists');
    }

    var job = new CronJob(option);

    commands[name] = {
      status: false,
      command: job,
    };

  }

  function status(name) {
    if (!commands[name]) {
      throw new Error('Command dosen\'t exsist.');
    }

    return commands[name].status;
  }

  function runAll() {
    Object.keys(commands).forEach((command) => {
      commands[command].command.start();
      commands[command].status = true;
    });
  }

  function getJobsStatus() {
    return Object.keys(commands).map((command) => {
      return {
        name: command,
        status: commands[command].status,
      };
    });
  }

  function run(name) {
    if (!commands[name]) {
      throw new Error('Command dosen\'t exsist.');
    }

    commands[name].command.start();
    commands[name].status = true;
  }

  function stop(name) {
    if (!commands[name]) {
      throw new Error('Command dosen\'t exsist.');
    }

    commands[name].command.stop();
    commands[name].status = false;
  }

  return {
    run,
    runAll,
    stop,
    status,
    addCommand,
    getJobsStatus,
  };
})();

module.exports = jobCommander;
