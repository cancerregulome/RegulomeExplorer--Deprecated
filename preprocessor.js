var traceur = require('traceur');
module.exports = {
  process: function(src, path) {
    var result = traceur.compile(src);
    return result;
  }
};
