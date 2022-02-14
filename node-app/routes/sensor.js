var nconf = require('nconf')
const { json } = require('express');
var express = require('express');
var router = express.Router();
var sensor = require("node-dht-sensor").promises;

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
  temp = json.temp;
  humidity = json.humidity;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(json))
});

module.exports = router;

MOCK = nconf.get('mock');

function get_sensor_data() {
  var json_v = {};
  if (MOCK) {
    json_v = {'temp': 73.5, 'humidity': 88.2};
  } else {
    var data = sensor.readSync(22, nconf.get('dhtPin'));
    json_v.temp = data.temperature*1.8+32;
    json_v.humidity = data.humidity;
  }
  return json_v;
}