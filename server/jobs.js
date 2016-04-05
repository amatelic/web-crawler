var fs = require('fs-extra');
var util = require('util');
var async = require('async');
var path = './links';
module.exports = {
  weeklyCleaning: function() {
    readAllByType(path, 'directory', (err, dir) => {
      fs.readdir(dir[0], (err, files) => {
        files = files.map(d => `${dir[0]}/${d}`);
        async.map(files, fs.readFile, (err, data) => {
          var file = data.join().toString();
          fs.writeFile(`${dir[0]}/test.txt`, file, () => console.log('file was saved'));
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
