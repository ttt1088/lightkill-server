var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

//create socket.io instance
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);
//socket.io end

//create mongodb conncetion
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lightkill');

var db = mongoose.connection;
db.on('error', console.error.bind(console, "mongodb connection error:"));
db.once('open', function (callback){
  console.log('mongodb connection success');
});
//mongodb end

//create my message handler
var reghandler = require('./handlers/reg')
var loginhandler = require('./handlers/login');
//handler end

io.on('connection', function (socket) {
  socket.emit('welcome', 'welcome to lightkill -- connect to server success');
  socket.on('my other event', function (data, fn) {
    //fn('callback');
    console.log(data);
  });
  socket.on('reg', function(data, fn){
    console.log({cmdid: 'reg', cmdbody: data});
    reghandler.reg(data);
  });
});

module.exports = app;