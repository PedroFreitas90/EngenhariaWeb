var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var rabbitMQ = require('./RabbitMQ')

var crosswalkRouter = require('./routes/crosswalks');
var distanceRouter = require('./routes/distance');
var vehicleRouter = require('./routes/vehicle');
var pedestrianRouter = require('./routes/pedestrian');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/Crosswalk', crosswalkRouter);
app.use('/distance', distanceRouter);
app.use('/Vehicle', vehicleRouter);
app.use('/Pedestrian', pedestrianRouter);

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

process.on('SIGINT',(code)=>{
  rabbitMQ.beforeExit()
  process.exit()
})

module.exports = app;
