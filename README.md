##Zetta FONA serial device driver

###Install

```
$> npm install zetta-fona-serial-driver
```

###Usage

```
var zetta = require('zetta');
var Fona = require('zetta-fona-serial-driver');

zetta()
  .use(Fona)
  .listen(1337)
```

### Hardware

* any platform

###Transitions

#####get-imei()
###Design

