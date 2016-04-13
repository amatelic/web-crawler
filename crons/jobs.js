var fs = require('fs-extra');
var util = require('util');
var async = require('async');
var path = './links';
var _ = require('underscore');
var archive  = './archive/';

module.exports = {
  weeklyCleaning: function() {
    var links = new Set();
    readAllByType(path, 'directory', (err, dir) => {
      fs.readdir(dir[0], (err, files) => {
        files = files.map(d => `${dir[0]}/${d}`);
        async.map(files, fs.readFile, (err, data) => {
          var links = data.toString().split('\r\n');
          var file = _.uniq(links);
          fs.outputFile(`${archive}/${Math.floor(Date.now() / 1000)}.txt`, file.join('\n'), function(err) {
            console.log('file was saved');
            async.map(files, fs.unlink, (err, data) => { console.log('Files were deleted'); });
          });
        });
      });
    });
  },
};

function readAllByType(path, type, callback) {
  var options = {
    file: 'isFile',
    directory: 'isDirectory',
  };
  var type = (typeof options[type] !== 'undefined')
      ? options[type] : options.file;

  fs.readdir(path, (err, files) => {
    if (err) console.error(err);
    files = files.map(d => `${path}/${d}`);
    async.waterfall([
      callback => async.map(files, fs.stat, callback),
      (data, callback) => callback(null, files.filter((d, i) => data[i][type]())),
      ],
      (err, result) => {
        if (err) callback(err);

        callback(null, result);
      }
    );
  });
}
