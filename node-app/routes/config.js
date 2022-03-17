var nconf = require('nconf')
const { json } = require('express');
var express = require('express');
var router = express.Router();

var express = require('express');
var router = express.Router();

/* GET config form */
router.get('/', function(req, res, next) {
  res.render('config_form', {nconf: nconf});
  //res.sendStatus(200);
});

router.post('/', function(req, res, next) {
  var pin = parseInt(req.body['dht-22-pin']);
  nconf.set('dhtPin', pin);
  is_mock = req.body['mock'] == 'on' ? true : false;
  nconf.set('mock', is_mock);
  var port = parseInt(req.body['http-port']);
  nconf.set('httpPort', port);
  var pir_pin = parseInt(req.body['pir-pin']);
  nconf.set('pirPin', pir_pin);
  var millis = parseInt(req.body['poll-millis']);
  nconf.set('pollMillis', millis);
  nconf.save();
  res.send("Saved");
});

module.exports = router;
