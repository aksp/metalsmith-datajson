var fs = require('fs');

/**
* Metalsmith plugin to read json data from directory and make it available as metadata.json
*
* @param {Object} opts
* @return {Function}
*/

function plugin(opts){
  const result = {};
  const dirs = opts.dirs;

  for (const [name, dir] of Object.entries(dirs)) {
    const resultArr = [];
    result[name] = resultArr;
    const stats = fs.lstatSync(dir);
    if (stats.isDirectory()) {
      fs.readdir(dir, function(err, files) {
        files.sort().forEach(function (file) {
          if (file.indexOf('.json') !== -1) {
            const path = dir + file;
            const basename = file.slice(0, -5);

            fs.readFile(path, 'utf8', function (err, data) {
              if (err) { throw err; }
              resultArr.push(JSON.parse(data));
            });
          }
        });
      });
    }
  }

  return function(files, metalsmith, done){
    const metadata = metalsmith.metadata();
    metadata.json = result;
    done();
  };

}

/**
* Expose `plugin`.
*/

module.exports = plugin;
