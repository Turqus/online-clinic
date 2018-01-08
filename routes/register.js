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

  req.check('username', 'Login jest wymagany.').notEmpty();
  req.check('password', 'Hasło jest wymagane.').notEmpty();
  req.check('email', 'Email jest wymagany.').notEmpty();
  req.check('firstName', 'Imię jest wymagane.').notEmpty();
  req.check('surname', 'Nazwisko jest wymagane.').notEmpty();
  req.check('city', 'Miasto jest wymagane.').notEmpty();
  req.check('country', 'Państwo jest wymagane.').notEmpty();
  req.check('phone', 'Numer jest wymagany.').notEmpty();


  req.check('username', 'Login jest za krótki.').isLength({ min: 3 });
  req.check('email', 'Email jest za krótki.').isLength({ min: 3 });
  req.check('firstName', 'Imię jest za krótkie.').isLength({ min: 3 });
  req.check('surname', 'Nazwisko jest za krótkie.').isLength({ min: 3 });
  req.check('city', 'Miasto jest za krótkie.').isLength({ min: 3 });
  req.check('country', 'Państwo jest za krótkie.').isLength({ min: 3 });
  req.check('phone', 'Numer jest za krótki.').isLength({ min: 3 });


  req.check('username', 'Login jest za długie.').isLength({ max: 50 });
  req.check('email', 'Email jest za długie.').isLength({ max: 50 });
  req.check('firstName', 'Imię jest za długie.').isLength({ max: 50 });
  req.check('surname', 'Nazwisko jest za długie.').isLength({ max: 50 });
  req.check('city', 'Miasto jest za długie.').isLength({ max: 50 });
  req.check('country', 'Państwo jest za długie.').isLength({ max: 50 });
  req.check('phone', 'Numer jest za długie.').isLength({ max: 50 });


  req.check('email', 'Niepoprawny adres e-mail').isEmail();

  req.check('password', 'Hasło nie pasuje do siebie.').equals(req.body.confirmPassword);

  req.check('password', 'Za krótkie hasło.').isLength({ min: 6 });
  req.check('password', 'Za długie hasło.').isLength({ max: 50 });

  req.check('confirmPassword', 'Powtórz hasło.').notEmpty();
  req.check('confirmPassword', 'Za krótkie hasło.').isLength({ min: 6 });
  req.check('confirmPassword', 'Za długie hasło.').isLength({ max: 50 });



  var errors = req.validationErrors(true);

  var newUser = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    role: 'patient',

    firstName: req.body.firstName,
    surname: req.body.surname,
    city: req.body.city,
    country: req.body.country,
    phone: req.body.phone,

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
    res.render('register', {
      errors: errors, error_msg: 'Rejestracja nieudana.', title: 'Rejestracja'
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
            res.render('register', {
               errors: null , success_msg: 'Jesteś zarejestrowany. Teraz możesz się zalogować.', title: 'Rejestracja'
            });
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