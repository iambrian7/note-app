var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var mongoose = require('mongoose');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var index = require('./routes/index');
// var index = require('./routes/index');

// var users = require('./routes/users');
var note = require('./routes/note');
// var main = require('./routes/main');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//mongoose.connect('mongodb://localhost:27017/testapp');
//mongoose.connect('mongodb://iambrian:bkcbkc07@ds031108.mlab.com:31108/aalinks');
//mongoose.connect('mongodb://username:password@host:port/database')
// const mongooseUrl = 'mongodb://iambrian:bkcbkc07@ds031108.mlab.com:31108/aalinks'
const mongooseUrl = 'mongodb+srv://bkc:bkcbkc07@aalinks.ksits.mongodb.net/aalinks?retryWrites=true&w=majority';
mongoose.Promise = global.Promise;

// Connecting to the database
// module.exports.connect = function() {
// 	mongoose.connect('mongodb://localhost:27017/'+database);
// 	var db = mongoose.connection;
// 	db.on("error", console.error.bind(console, "connection error"));
// 	db.once("open", function(callback){
// 	  console.log(`Connection to ${database} Succeeded`);
// 	});
// 	return db;
// }

// mongoose.connect(mongooseUrl,{ useMongoClient: true })
mongoose.connect(mongooseUrl)
//mongoose.openUri(mongooseUrl)
.then(() => {
    console.log("Successfully connected to the database: " + mongooseUrl);    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});



app.use('/note', note);

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

module.exports = app;
