var fs = require('fs');

/**
* Metalsmith plugin to read json data from directory and make it available as metadata.json
*
* @param {Object} opts
* @return {Function}
*/

function plugin(opts){
  var obj = {};
  var dir = opts.dir;
  var stats =  fs.lstatSync(dir);

  if (stats.isDirectory()) {
    fs.readdir(dir, function(err, files) {
      files.forEach(function (file) {
        if (file.indexOf('.json') !== -1) {
          var path = dir + file;
          var basename = file.slice(0, -5);

          fs.readFile(path, 'utf8', function (err, data) {
            if (err) { throw err; }
              obj[basename] = JSON.parse(data);
          });
        }
      });
    });
  }

  return function(files, metalsmith, done){
    var metadata = metalsmith.metadata();
    metadata.json = obj;
    done();
  };

}

/**
* Expose `plugin`.
*/

module.exports = plugin;
