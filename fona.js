var Device = require('zetta-device');
var util = require('util');

var Fona = module.exports = function() {
  Device.call(this);
  this._serialDevice = arguments[0];

  this.imei = null;
};
util.inherits(Fona, Device);

Fona.prototype.init = function(config) {

  config
  .name('Adafruit Fona')
  .type('fona')
  .state('waiting')
  .when('waiting', { allow: ['get-imei']})
  .map('get-imei', this.getIMEI);

};

Fona.prototype.getIMEI = function(cb) {
  this.log('getIMEI');  

  var self = this;
  
  var tasks = [
  {    
    before: function() {self.state = 'getting-imei'},
    command: 'AT+GSN',
    regexp: /^$/
  },
  {
    regexp: /^(\d{15})$/,
    onMatch: function(match) {
      self.imei = match[1];
    }
  },
  {
    regexp: /^$/
  },
  {
    regexp: /OK/,
    onMatch: function() {
      self.state = 'waiting';
      cb();
    }
  }];

  this._serialDevice.enqueue(tasks, null, function() {});
};
