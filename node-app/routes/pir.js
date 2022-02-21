var nconf = require('nconf')
const { json } = require('express');
var express = require('express');
var gpio = require('rpi-gpio');
var router = express.Router();

/* GET json pir page. */
router.get('/', function(req, res, next) {
  let json = get_sensor_data();
  if(json.detected == null) {
    d = 'no value';
  } else if(json.detected == true) {
    d = 'detected';
  } else if(json.detected == false) {
    d = 'not detected';
  }
  res.render('pir', { title: 'PIR', detected: d });
});

/* GET json pir page. */
router.get('/json', function(req, res, next) {
  let json = get_sensor_data();
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(json))
});

module.exports = router;

MOCK = nconf.get('mock');

pin_pir = nconf.get('pirPin');
poll_millis = nconf.get('pollMillis');

var last_pir_value = null;

setup_gpio();

function setup_gpio() {
  gpio.setMode(gpio.MODE_RPI);
  gpio.setup(pin_pir, gpio.DIR_IN, gpio.EDGE_NONE, (err) => {
    if(err) throw err;
  });
};

function get_sensor_data() {
  json_v = {'detected': last_pir_value};
  return json_v;
}

function delayed() {
  console.log("delayed");
  gpio.read(pin_pir, function(err, value) {
    if (err) throw err;
    last_pir_value = value;
  });
  setTimeout(delayed, poll_millis);
}
setTimeout(delayed, poll_millis);