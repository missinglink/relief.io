var path = require('path');

if (process.argv.length < 3) {
  console.error('Usage: node app.js "path/to/config"');
  process.exit(1);
}

var config = require(path.resolve(process.argv[2]));

for (var key in config) {
  if (typeof config[key] !== 'string') {
    continue;
  }

  var match = config[key].match(/<-env\.(.+)/i);
  if (match != null) {
    config[key] = process.env[match[1]];
  }
}

module.exports = config;