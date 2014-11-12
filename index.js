var util = require('util');
var Scout = require('zetta-scout');
var Fona = require('./fona');

var FonaScout = module.exports = function() {
  Scout.call(this);
};
util.inherits(FonaScout, Scout);

FonaScout.prototype.init = function(next) {
  var FonaQuery = this.server.where({type: 'fona'});
  var queries = [
    this.server.where({ type: 'serial' }),
    this.server.where({ type: 'fona-phone' }),
    this.server.where({ type: 'fona-sms' }),
    this.server.where({ type: 'fona-fm-radio' }),
    this.server.where({ type: 'fona-network' }),
    this.server.where({ type: 'fona-power' }),
    this.server.where({ type: 'fona-sim' })
  ];

  
  var self = this;

  this.server.observe(queries, function(serial, phone, sms, fmRadio, network, power, sim) {
    self.server.find(FonaQuery, function(err, results) {
      if (results[0]) {
        self.provision(results[0], Fona, serial, phone, sms, fmRadio, network, power, sim);
      } else {
        self.discover(Fona, serial, phone, sms, fmRadio, network, power, sim);
      }
      next();
    });
  });
}
