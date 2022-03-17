var nconf = require('nconf');
nconf.overrides({
})
nconf.argv();
nconf.file({
  file: './config.json',
  logicalSeparator: '.'
});
nconf.env()
nconf.defaults({
  "httpPort": 3001,
  "dhtPin": 4,
  "pirPin": 11,
  "mock": false,
  "pollMillis": 2000,
  "enableDHT": true,
  "enablePIR": true
})
enable_pir = nconf.get('enablePIR');
enable_dht = nconf.get('enableDHT');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var configRouter = require('./routes/config');
if(enable_dht) {
  var sensorRouter = require('./routes/sensor');
}
if(enable_pir) {
  var pirRouter = require('./routes/pir');
}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/config', configRouter);
if(enable_dht) {
  app.use('/sensor', sensorRouter);
}
if(enable_pir) {
  app.use('/pir', pirRouter);
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
