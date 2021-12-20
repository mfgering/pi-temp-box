const { json } = require('express');
var express = require('express');
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
  temp = json.temp;
  humidity = json.humidity;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(json))
});

module.exports = router;

function get_sensor_data() {
  const command = '/home/pi/projects/pi-temp-box/pi_temp/get_sensor.py';
  var temp = -1;
  var humidity = -1;
  const child = require('child_process');
  var data = child.execSync(command)
  let json_v = JSON.parse(data);
  return json_v;
}