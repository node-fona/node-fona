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
    this.server.where({ type: 'fona-fm-radio' })
  ];

  
  var self = this;

  this.server.observe(queries, function(serial, phone, sms, fmRadio) {
    self.server.find(FonaQuery, function(err, results) {
      if (results[0]) {
        self.provision(results[0], Fona, serial, phone, sms, fmRadio);
      } else {
        self.discover(Fona, serial, phone, sms, fmRadio);
      }
      next();
    });
  });
}
