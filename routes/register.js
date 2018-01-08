var express = require('express');
var router = express.Router(); 



// login module 
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var bcrypt = require('bcrypt');
const saltRounds = 10;



// model
var User = require('../model/user.model');



router.post('/registerUser', function (req, res, next) {
  req.check('username', 'Login is required').notEmpty();
  req.check('email', 'Email is required').isEmail();
  req.check('password', 'Password is required').isLength({ min: 4 }).equals(req.body.confirmPassword);

  var errors = req.validationErrors();

  var newUser = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    role: 'patient',

    firstName: null,
    surname: null,
    city: null,
    country: null,
    phone: null,

    patientCards: [{
      name: 'Poradnia Chirurgi Ogólnej',
      registry: []
    }, {
      name: 'Poradnia Kardiologiczna',
      registry: []
    }, {
      name: 'Poradnia Medycyny Pracy',
      registry: []
    }]
  }
 
  if (errors) {
    res.render('index', {
      errors: errors, error_msg : 'Rejestracja nieudana.'
    });
  } else {
    bcrypt.hash(newUser.password, saltRounds, function (err, hash) {
      if (err) {
        console.log(err)
      } else {

        newUser.password = hash;
        var user = new User(newUser);
        user.save()
          .then(function (User) { 
            req.flash('success_msg', 'Jesteś zarejestrowany. Teraz możesz się zalogować.');
            res.redirect('/');
          })
      }
    });

  }
});


passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      console.log(user)
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }


      User.comparePassword(password, user.password, function (err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Invalid password' });
        }
      });
    });
  }));


passport.serializeUser(function (user, done) {
  done(null, user.id);
});


passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});


router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: 'Nieprawidłowy login lub hasło.' }), function (req, res) {
    req.flash('success_msg', 'Zostałeś zalogowany.');
    res.redirect('/');
  });


router.get('/user/logout', function (req, res) {
  req.logOut();
  req.flash('success_msg', 'Zostałeś wylogowany.');
  res.redirect('/');
})





module.exports = router;