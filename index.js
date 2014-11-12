var Scout = require('zetta-scout');
var util = require('util');
var Fona = require('./fona');

var FonaScout = module.exports = function() {
  Scout.call(this);
};
util.inherits(FonaScout, Scout);

FonaScout.prototype.init = function(next) {
  var FonaQuery = this.server.where({type: 'fona'});
  var serialDeviceQuery = this.server.where({ type: 'serial' });
  
  var self = this;

  this.server.observe(serialDeviceQuery, function(serialDevice) {
    self.server.find(FonaQuery, function(err, results) {
      if (results[0]) {
        self.provision(results[0], Fona, serialDevice);
      } else {
        self.discover(Fona, serialDevice);
      }
      next();
    });
  });
}
