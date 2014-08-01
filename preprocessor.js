var traceur = require('traceur');

module.exports = {
  process: function(contents) {
    console.info('transpiling to ES5...');
    var result = traceur.compile(contents, {
         modules: 'commonjs'
    });
    return result.js;
  }
};
