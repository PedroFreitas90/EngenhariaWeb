var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var RabbitMQ = require('./rabbitMQ')

var indexRouter = require('./routes/crosswalks');

var app = express();
RabbitMQ.rabbitMQ();

var mongoose = require('mongoose');

/****************************
 * MONGO CONNECTION
 ****************************/
const DATABASE_NAME = 'Crosswalks';

mongoose.connect('mongodb://mongo:27017/' + DATABASE_NAME, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Connected to Mongo at [${DATABASE_NAME}] database...`))
  .catch((erro) => console.log(`Mongo: Error connecting to [${DATABASE_NAME}]: ${erro}`))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/crosswalks', indexRouter);


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
  RabbitMQ.beforeExit()
  process.exit()
})


module.exports = app;
