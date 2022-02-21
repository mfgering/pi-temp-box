var nconf = require('nconf')
const { json } = require('express');
var express = require('express');
var gpio = require('gpio');
var router = express.Router();

/* GET json sensor page. */
router.get('/', function(req, res, next) {
  let json = get_sensor_data();
  temp = json.temp;
  humidity = json.humidity;
  res.render('sensor', { title: 'Sensor', temp: temp, humidity: humidity });
});

/* GET json sensor page. */
router.get('/json', function(req, res, next) {
  let json = get_sensor_data();
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(json))
});

module.exports = router;

MOCK = nconf.get('mock');

function get_sensor_data() {
  var json_v = {};
  if (MOCK) {
    json_v = {'state': true};
  } else {
    pin = gpio.export(nconf.get('pirPin'), {
      direction: gpio.DIRECTION.IN,
      ready: function() {
        var v = pin.value;
        json_v.state = v;
      }  
    })
  }
  return json_v;
}