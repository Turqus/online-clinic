var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

// module to login system
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStategy = require('passport-local').Strategy;
var expressValidator = require('express-validator');

var index = require('./routes/index');
var user = require('./routes/user');
var register = require('./routes/register');


var calendarPage = require('./routes/calendar');

var User = require('./model/user.model');
var Calendar = require('./model/calendar.model');

var app = express();


mongoose.connect('mongodb://localhost/Clinic', function (error) {
  if (error) {
    console.log('blad w polaczeniu')
  } else {
    console.log('connected');
    //=========================CONNNNNNECTTTTTTEEEEEEDDDDDDDDDDDDDDDD======================//


    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
    app.use(bodyParser.json());


    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    // uncomment after placing your favicon in /public
    // app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));


    app.use(session({
      secret: 'dadasdasdaxsax',
      resave: true,
      saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    // Express Validator
    app.use(expressValidator({
      errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
          , root = namespace.shift()
          , formParam = root;

        while (namespace.length) {
          formParam += '[' + namespace.shift() + ']';
        }
        return {
          param: formParam,
          msg: msg,
          value: value
        };
      }
    }));

    // Connect Flash
    app.use(flash());

    // Global Vars
    app.use(function (req, res, next) {
      res.locals.success_msg = req.flash('success_msg');
      res.locals.error_msg = req.flash('error_msg');
      res.locals.error = req.flash('error');
      res.locals.user = req.user || null;
      next();
    });


    app.use('/', index);
    app.use('/', register);
    app.use('/user', user);
    app.use('/calendar', calendarPage);

    function calendarAuthenticated(req, res, next) {
      if (req.isAuthenticated()) { 
        return next();
      } else {
        res.json('Proszę o zalogowanie się do konta.')
      }
    }

        function userAuthenticated(req, res, next) {
      if (req.isAuthenticated()) { 
        return next();
      } else {
        res.redirect('/login');
      }
    }


    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // error handler
    app.use(function (err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });

    //=========================CONNNNNNECTTTTTTEEEEEEDDDDDDDDDDDDDDDD======================//
  }
});


module.exports = app;
